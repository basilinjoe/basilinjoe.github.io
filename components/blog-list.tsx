"use client"

import { motion } from "framer-motion"
import { staggerContainer } from "@/lib/animations"
import { BlogPost } from "@/lib/blog"
import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import BlogHeader from "@/components/blog/blog-header"
import TagFilter from "@/components/blog/tag-filter"
import BlogPostsGrid from "@/components/blog/blog-posts-grid"
import PaginationControls from "@/components/blog/pagination-controls"

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
  
  // Handle tag click (for child components)
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
  
  return (
    <div className="relative overflow-hidden">
      {/* Colorful background elements */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-primary/5 rounded-full filter blur-3xl opacity-40 -z-10"></div>
      <div className="absolute bottom-40 right-10 w-80 h-80 bg-blue-500/5 rounded-full filter blur-3xl opacity-40 -z-10"></div>
      
      <motion.section 
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="container grid items-center gap-8 pb-12 pt-8 md:py-10"
      >
        <BlogHeader />
        
        <TagFilter 
          allTags={allTags}
          selectedTag={selectedTag}
        />
        
        <BlogPostsGrid 
          posts={paginatedPosts}
          onTagClick={handleTagClick}
          selectedTag={selectedTag}
        />
        
        <PaginationControls 
          currentPage={currentPage}
          totalPages={totalPages}
        />
        
        {/* Decorative elements */}
        <div className="absolute top-40 right-10 w-16 h-16 border border-primary/10 rounded-full animate-pulse-slow opacity-30 hidden md:block"></div>
        <div className="absolute bottom-60 left-10 w-10 h-10 border border-primary/10 rounded-full animate-float opacity-30 hidden md:block"></div>
      </motion.section>
    </div>  );
}