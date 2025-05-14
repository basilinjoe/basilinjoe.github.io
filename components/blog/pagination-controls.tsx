"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { buttonVariants } from "@/components/ui/button"
import { motion } from "framer-motion"
import { fadeInUp } from "@/lib/animations"

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
}

export default function PaginationControls({ currentPage, totalPages }: PaginationControlsProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // No need to render pagination if there's only one page
  if (totalPages <= 1) {
    return null;
  }

  // Handle pagination
  const handlePageChange = (page: number) => {
    if (page === currentPage) return;
    
    let params = new URLSearchParams(searchParams.toString());
    params.set('page', page.toString());
    
    // Update URL without page reload
    router.push(`/blog?${params.toString()}`, { scroll: false });
  };

  return (
    <motion.div 
      variants={fadeInUp} 
      className="flex justify-center items-center flex-wrap gap-2 mt-10 px-4 sm:px-6 md:px-0"
    >
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`${buttonVariants({ 
          variant: "outline", 
          size: "sm",
          className: "border-primary/30 hover:bg-primary/10 hover:text-primary"
        })} ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
        aria-label="Previous page"
      >
        <span className="sm:hidden">←</span>
        <span className="hidden sm:inline">Previous</span>
      </button>
      
      {/* For mobile, show limited pagination numbers */}
      <div className="flex gap-1.5 sm:gap-2">
        {[...Array(totalPages)].map((_, i) => {
          // On mobile, show only current page and direct neighbors
          const showOnMobile = 
            i + 1 === currentPage || 
            i + 1 === currentPage - 1 || 
            i + 1 === currentPage + 1 ||
            i + 1 === 1 || 
            i + 1 === totalPages;
          
          const isCurrentPage = currentPage === i + 1;
            
          return (
            <button
              key={i}
              onClick={() => handlePageChange(i + 1)}
              className={`${buttonVariants({ 
                variant: isCurrentPage ? "default" : "outline", 
                size: "sm",
                className: isCurrentPage 
                  ? "bg-primary text-primary-foreground hover:bg-primary/90" 
                  : "border-primary/30 hover:bg-primary/10 hover:text-primary"
              })} ${!showOnMobile ? 'hidden sm:inline-flex' : ''}`}
              aria-label={`Page ${i + 1}`}
              aria-current={isCurrentPage ? "page" : undefined}
            >
              {i + 1}
            </button>
          );
        })}
      </div>
      
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`${buttonVariants({ 
          variant: "outline", 
          size: "sm",
          className: "border-primary/30 hover:bg-primary/10 hover:text-primary"
        })} ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""}`}
        aria-label="Next page"
      >
        <span className="sm:hidden">→</span>
        <span className="hidden sm:inline">Next</span>
      </button>
    </motion.div>
  );
}
