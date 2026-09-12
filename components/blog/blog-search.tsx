"use client"

import { useState, useCallback, useEffect } from "react"
import { Search, X } from "lucide-react"
import { motion } from "framer-motion"
import { fadeInUp } from "@/lib/animations"
import { cn } from "@/lib/utils"

interface BlogSearchProps {
  onSearch: (query: string) => void
  placeholder?: string
  className?: string
}

/**
 * Brutalist search input — thick foreground border, offset shadow, mono
 * placeholder text, hot-orange focus ring. Debounced 300ms.
 */
export function BlogSearch({
  onSearch,
  placeholder = "Search title, content, tags…",
  className,
}: BlogSearchProps) {
  const [query, setQuery] = useState("")

  useEffect(() => {
    const timer = setTimeout(() => onSearch(query), 300)
    return () => clearTimeout(timer)
  }, [query, onSearch])

  const handleClear = useCallback(() => {
    setQuery("")
    onSearch("")
  }, [onSearch])

  return (
    <motion.div variants={fadeInUp} className={className}>
      <label
        htmlFor="blog-search"
        className="mb-2 block font-mono text-micro font-bold uppercase tracking-widest text-muted-foreground"
      >
        Search the archive
      </label>
      <div className="relative flex items-center border-2 border-foreground bg-background transition-shadow focus-within:shadow-brutal-sm">
        <span className="pl-3 text-foreground">
          <Search className="h-4 w-4" />
        </span>
        <input
          id="blog-search"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          aria-label="Search blog posts"
          className={cn(
            "flex-1 bg-transparent px-2 py-2.5 font-mono text-sm placeholder:text-muted-foreground focus:outline-none"
          )}
        />
        {query && (
          <button
            type="button"
            onClick={handleClear}
            aria-label="Clear search"
            className="mr-1 border-2 border-foreground bg-background px-2 py-1 text-foreground hover:bg-accent-hot hover:text-accent-hot-foreground"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </div>
    </motion.div>
  )
}
