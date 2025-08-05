"use client"

import { useState, useCallback, useEffect } from "react"
import { Search, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { fadeInUp } from "@/lib/animations"
import { cn } from "@/lib/utils"

interface BlogSearchProps {
  onSearch: (query: string) => void
  placeholder?: string
  className?: string
}

export function BlogSearch({ 
  onSearch, 
  placeholder = "Search posts by title, content, or tags...",
  className 
}: BlogSearchProps) {
  const [query, setQuery] = useState("")
  const [isFocused, setIsFocused] = useState(false)

  // Debounce search to avoid too many updates
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(query)
    }, 300)

    return () => clearTimeout(timer)
  }, [query, onSearch])

  const handleClear = useCallback(() => {
    setQuery("")
    onSearch("")
  }, [onSearch])

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
  }, [])

  return (
    <motion.div 
      variants={fadeInUp}
      className={cn("relative", className)}
    >
      <div className={cn(
        "relative transition-all duration-200",
        isFocused && "scale-[1.02]"
      )}>
        <Search className={cn(
          "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transition-colors",
          isFocused ? "text-primary" : "text-muted-foreground"
        )} />
        <Input
          type="search"
          placeholder={placeholder}
          value={query}
          onChange={handleInputChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={cn(
            "pl-9 pr-9 h-10",
            "transition-all duration-200",
            "focus:ring-2 focus:ring-primary/20",
            isFocused && "shadow-md"
          )}
          aria-label="Search blog posts"
        />
        <AnimatePresence>
          {query && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute right-1 top-1/2 -translate-y-1/2"
            >
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handleClear}
                className="h-8 w-8 p-0"
                aria-label="Clear search"
              >
                <X className="h-4 w-4" />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      <AnimatePresence>
        {query && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute left-0 right-0 mt-1 text-sm text-muted-foreground"
          >
            Searching for "{query}"
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}