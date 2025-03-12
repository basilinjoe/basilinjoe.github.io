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
        className="flex max-w-[980px] flex-col items-start gap-2 px-4 sm:px-6 md:px-0"
      >
        <h1 className="text-2xl sm:text-3xl font-bold leading-tight tracking-tighter md:text-4xl">
          Blog
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground">
          Thoughts, ideas, and experiences.
        </p>
      </motion.div>
      
      {/* Tags filter */}
      {allTags.length > 0 && (
        <motion.div variants={fadeInUp} className="flex flex-wrap gap-2 mb-4 px-4 sm:px-6 md:px-0 overflow-x-auto">
          <div className="flex flex-wrap gap-2 max-w-full">
            {allTags.map(tag => (
              <Badge 
                key={tag}
                variant={selectedTag === tag ? "default" : "outline"}
                className="cursor-pointer hover:bg-accent text-xs sm:text-sm whitespace-nowrap"
                onClick={() => handleTagClick(tag)}
              >
                {tag}
              </Badge>
            ))}
            {selectedTag && (
              <Badge 
                variant="secondary"
                className="cursor-pointer ml-2 text-xs sm:text-sm whitespace-nowrap"
                onClick={() => handleTagClick(selectedTag)}
              >
                Clear filter ×
              </Badge>
            )}
          </div>
        </motion.div>
      )}
      
      {/* Blog posts grid */}
      <div className="grid gap-4 sm:gap-6 px-4 sm:px-6 md:px-0 sm:grid-cols-2 lg:grid-cols-3">
        {paginatedPosts.length > 0 ? (
          paginatedPosts.map((post, index) => (
            <motion.article
              key={post.id}
              variants={fadeInUp}
              transition={{ delay: index * 0.1 }}
              className="group relative rounded-lg border p-4 sm:p-5 md:p-6 hover:shadow-md transition-all flex flex-col"
            >
              <h2 className="text-xl sm:text-2xl font-bold mb-2">
                <Link
                  href={`/blog/${post.id}`}
                  className="text-foreground hover:underline line-clamp-2"
                >
                  {post.title}
                </Link>
              </h2>
              <div className="flex flex-wrap items-center text-xs sm:text-sm text-muted-foreground gap-2">
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
                <div className="flex flex-wrap gap-1 mt-2 overflow-hidden">
                  {post.tags.slice(0, 3).map(tag => (
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
                  {post.tags.length > 3 && (
                    <Badge variant="outline" className="text-xs">+{post.tags.length - 3}</Badge>
                  )}
                </div>
              )}
              <p className="mt-3 text-xs sm:text-sm text-muted-foreground line-clamp-3">{post.excerpt}</p>
              <div className="mt-auto pt-4">
                <Link
                  href={`/blog/${post.id}`}
                  className={buttonVariants({ variant: "outline", size: "sm" })}
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
          className="flex justify-center items-center flex-wrap gap-2 mt-8 px-4 sm:px-6 md:px-0"
        >
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={buttonVariants({ variant: "outline", size: "sm" }) + 
              (currentPage === 1 ? " opacity-50 cursor-not-allowed" : "")}
            aria-label="Previous page"
          >
            <span className="sm:hidden">←</span>
            <span className="hidden sm:inline">Previous</span>
          </button>
          
          {/* For mobile, show limited pagination numbers */}
          <div className="flex gap-1 sm:gap-2">
            {[...Array(totalPages)].map((_, i) => {
              // On mobile, show only current page and direct neighbors
              const showOnMobile = 
                i + 1 === currentPage || 
                i + 1 === currentPage - 1 || 
                i + 1 === currentPage + 1 ||
                i + 1 === 1 || 
                i + 1 === totalPages;
                
              return (
                <button
                  key={i}
                  onClick={() => handlePageChange(i + 1)}
                  className={`${buttonVariants({ 
                    variant: currentPage === i + 1 ? "default" : "outline", 
                    size: "sm"
                  })} ${!showOnMobile ? 'hidden sm:inline-flex' : ''}`}
                  aria-label={`Page ${i + 1}`}
                  aria-current={currentPage === i + 1 ? "page" : undefined}
                >
                  {i + 1}
                </button>
              );
            })}
          </div>
          
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={buttonVariants({ variant: "outline", size: "sm" }) + 
              (currentPage === totalPages ? " opacity-50 cursor-not-allowed" : "")}
            aria-label="Next page"
          >
            <span className="sm:hidden">→</span>
            <span className="hidden sm:inline">Next</span>
          </button>
        </motion.div>
      )}
    </motion.section>
  )
}