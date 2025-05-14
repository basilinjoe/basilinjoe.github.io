"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { fadeInUp } from "@/lib/animations"

interface TagFilterProps {
  allTags: string[];
  selectedTag?: string;
}

export default function TagFilter({ allTags, selectedTag }: TagFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Handle tag selection
  const handleTagClick = (tag: string) => {
    let params = new URLSearchParams(searchParams.toString());
    
    if (selectedTag === tag) {
      params.delete('tag');
    } else {
      params.set('tag', tag);
    }
    
    params.delete('page'); // Reset to first page when changing tags
    
    // Update URL without page reload
    router.push(`/blog?${params.toString()}`, { scroll: false });
  };

  // If no tags, don't render the component
  if (allTags.length === 0) {
    return null;
  }

  return (
    <motion.div variants={fadeInUp} className="flex flex-wrap gap-2 mb-6 px-4 sm:px-6 md:px-0 overflow-x-auto">
      <div className="flex flex-wrap gap-2 max-w-full">
        {allTags.map(tag => (
          <Badge 
            key={tag}
            variant={selectedTag === tag ? "featured" : "skill"}
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
  );
}
