"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { fadeInUp, staggerContainer } from "@/lib/animations"
import { BlogPost } from "@/lib/blog"
import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"

interface BlogListProps {
  allPosts: BlogPost[];
  allTags: string[];
}

export default function BlogList({ allPosts, allTags }: BlogListProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Client-side state to manage pagination and filtering
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTag, setSelectedTag] = useState<string | undefined>(undefined);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>(allPosts);
  const [paginatedPosts, setPaginatedPosts] = useState<BlogPost[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  
  const postsPerPage = 6;
  
  // Initialize from URL params on load and when URL changes
  useEffect(() => {
    const page = searchParams.get('page') ? Number(searchParams.get('page')) : 1;
    const tag = searchParams.get('tag') || undefined;
    
    setCurrentPage(page);
    setSelectedTag(tag);
  }, [searchParams]);
  
  // Filter posts when selectedTag changes
  useEffect(() => {
    const filtered = selectedTag 
      ? allPosts.filter(post => post.tags && post.tags.includes(selectedTag))
      : allPosts;
      
    setFilteredPosts(filtered);
    
    // Recalculate pagination
    const total = Math.ceil(filtered.length / postsPerPage);
    setTotalPages(total);
    
    // Adjust currentPage if it's now out of bounds
    if (currentPage > total) {
      setCurrentPage(1);
    }
  }, [selectedTag, allPosts, currentPage]);
  
  // Update paginated posts when filteredPosts or currentPage changes
  useEffect(() => {
    const startIndex = (currentPage - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;
    setPaginatedPosts(filteredPosts.slice(startIndex, endIndex));
  }, [filteredPosts, currentPage, postsPerPage]);
  
  // Handle tag selection
  const handleTagClick = (tag: string) => {
    let params = new URLSearchParams(searchParams.toString());
    
    if (selectedTag === tag) {
      params.delete('tag');
      setSelectedTag(undefined);
    } else {
      params.set('tag', tag);
      setSelectedTag(tag);
    }
    
    params.delete('page'); // Reset to first page when changing tags
    setCurrentPage(1);
    
    // Update URL without page reload
    router.push(`/blog?${params.toString()}`, { scroll: false });
  };
  
  // Handle pagination
  const handlePageChange = (page: number) => {
    if (page === currentPage) return;
    
    let params = new URLSearchParams(searchParams.toString());
    params.set('page', page.toString());
    setCurrentPage(page);
    
    // Update URL without page reload
    router.push(`/blog?${params.toString()}`, { scroll: false });
  };
  
  return (
    <motion.section 
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
      className="container grid items-center gap-6 pb-8 pt-6 md:py-10"
    >
      <motion.div 
        variants={fadeInUp}
        className="flex max-w-[980px] flex-col items-start gap-2"
      >
        <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-4xl">
          Blog
        </h1>
        <p className="text-lg text-muted-foreground">
          Thoughts, ideas, and experiences.
        </p>
      </motion.div>
      
      {/* Tags filter */}
      {allTags.length > 0 && (
        <motion.div variants={fadeInUp} className="flex flex-wrap gap-2 mb-4">
          {allTags.map(tag => (
            <Badge 
              key={tag}
              variant={selectedTag === tag ? "default" : "outline"}
              className="cursor-pointer hover:bg-accent"
              onClick={() => handleTagClick(tag)}
            >
              {tag}
            </Badge>
          ))}
          {selectedTag && (
            <Badge 
              variant="secondary"
              className="cursor-pointer ml-2"
              onClick={() => handleTagClick(selectedTag)}
            >
              Clear filter ×
            </Badge>
          )}
        </motion.div>
      )}
      
      {/* Blog posts grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {paginatedPosts.length > 0 ? (
          paginatedPosts.map((post, index) => (
            <motion.article
              key={post.id}
              variants={fadeInUp}
              transition={{ delay: index * 0.1 }}
              className="group relative rounded-lg border p-6 hover:shadow-md transition-all"
            >
              <h2 className="text-2xl font-bold mb-2">
                <Link
                  href={`/blog/${post.id}`}
                  className="text-foreground hover:underline"
                >
                  {post.title}
                </Link>
              </h2>
              <div className="flex items-center text-sm text-muted-foreground gap-2">
                <time>
                  {new Date(post.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
                <span>•</span>
                <span>{post.readingTime}</span>
              </div>
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {post.tags.map(tag => (
                    <Badge 
                      key={tag} 
                      variant="secondary" 
                      className="text-xs"
                      onClick={(e) => {
                        e.preventDefault();
                        handleTagClick(tag);
                      }}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
              <p className="mt-4 text-muted-foreground">{post.excerpt}</p>
              <div className="mt-4">
                <Link
                  href={`/blog/${post.id}`}
                  className={buttonVariants({ variant: "outline" })}
                >
                  Read more
                </Link>
              </div>
            </motion.article>
          ))
        ) : (
          <div className="col-span-full text-center py-10">
            <p className="text-muted-foreground">No posts found. {selectedTag && "Try a different tag."}</p>
          </div>
        )}
      </div>
      
      {/* Pagination */}
      {totalPages > 1 && (
        <motion.div 
          variants={fadeInUp} 
          className="flex justify-center items-center gap-2 mt-8"
        >
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={buttonVariants({ variant: "outline", size: "sm" }) + 
              (currentPage === 1 ? " opacity-50 cursor-not-allowed" : "")}
          >
            Previous
          </button>
          
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => handlePageChange(i + 1)}
              className={buttonVariants({ 
                variant: currentPage === i + 1 ? "default" : "outline", 
                size: "sm"
              })}
            >
              {i + 1}
            </button>
          ))}
          
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={buttonVariants({ variant: "outline", size: "sm" }) + 
              (currentPage === totalPages ? " opacity-50 cursor-not-allowed" : "")}
          >
            Next
          </button>
        </motion.div>
      )}
    </motion.section>
  )
}