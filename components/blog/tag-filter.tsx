"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { fadeInUp } from "@/lib/animations"
import { cn } from "@/lib/utils"

interface TagFilterProps {
  allTags: string[]
  selectedTag?: string
}

export default function TagFilter({ allTags, selectedTag }: TagFilterProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleTagClick = (tag: string | null) => {
    const params = new URLSearchParams(searchParams.toString())
    if (!tag || selectedTag === tag) {
      params.delete("tag")
    } else {
      params.set("tag", tag)
    }
    params.delete("page")
    router.push(`/blog?${params.toString()}`, { scroll: false })
  }

  if (allTags.length === 0) return null
  const chips = ["All", ...allTags]

  return (
    <motion.div variants={fadeInUp}>
      <p className="mb-3 font-mono text-micro font-bold uppercase tracking-widest text-muted-foreground">
        Filter by tag
      </p>
      <div className="scrollbar-hide flex gap-2 overflow-x-auto pb-1">
        {chips.map((chip) => {
          const isAll = chip === "All"
          const isActive = isAll ? !selectedTag : selectedTag === chip
          return (
            <button
              key={chip}
              onClick={() => handleTagClick(isAll ? null : chip)}
              className={cn(
                "shrink-0 border-2 border-foreground px-3 py-1 font-mono text-micro font-bold uppercase tracking-widest transition-all",
                isActive
                  ? "bg-foreground text-background shadow-brutal-sm"
                  : "bg-background text-foreground hover:-translate-x-[2px] hover:-translate-y-[2px] hover:bg-accent-lime hover:text-accent-lime-foreground hover:shadow-brutal-sm"
              )}
            >
              {chip}
            </button>
          )
        })}
      </div>
    </motion.div>
  )
}
