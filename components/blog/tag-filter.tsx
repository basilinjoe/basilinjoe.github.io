"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { fadeInUp } from "@/lib/animations"
import { cn } from "@/lib/utils"

interface TagFilterProps {
  allTags: string[];
  selectedTag?: string;
}

export default function TagFilter({ allTags, selectedTag }: TagFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleTagClick = (tag: string | null) => {
    const params = new URLSearchParams(searchParams.toString());

    if (!tag || selectedTag === tag) {
      params.delete('tag');
    } else {
      params.set('tag', tag);
    }

    params.delete('page');
    router.push(`/blog?${params.toString()}`, { scroll: false });
  };

  if (allTags.length === 0) return null;

  const chips = ['All', ...allTags];

  return (
    <motion.div variants={fadeInUp} className="px-4 sm:px-6 md:px-0 mb-2">
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
        {chips.map((chip) => {
          const isAll = chip === 'All';
          const isActive = isAll ? !selectedTag : selectedTag === chip;

          return (
            <button
              key={chip}
              onClick={() => handleTagClick(isAll ? null : chip)}
              className={cn(
                "flex-shrink-0 px-3.5 py-1.5 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap",
                isActive
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
              )}
            >
              {chip}
            </button>
          );
        })}
      </div>
    </motion.div>
  );
}
