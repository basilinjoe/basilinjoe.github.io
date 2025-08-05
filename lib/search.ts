import { BlogPost } from "@/lib/blog"

export function searchBlogPosts(posts: BlogPost[], query: string): BlogPost[] {
  if (!query.trim()) {
    return posts
  }

  const searchTerms = query.toLowerCase().split(" ").filter(Boolean)

  return posts.filter((post) => {
    const searchableContent = [
      post.title,
      post.excerpt,
      post.content,
      ...(post.tags || [])
    ].join(" ").toLowerCase()

    // Check if all search terms are found in the content
    return searchTerms.every(term => searchableContent.includes(term))
  }).sort((a, b) => {
    // Prioritize title matches
    const aTitle = a.title.toLowerCase()
    const bTitle = b.title.toLowerCase()
    
    const aTitleMatch = searchTerms.some(term => aTitle.includes(term))
    const bTitleMatch = searchTerms.some(term => bTitle.includes(term))
    
    if (aTitleMatch && !bTitleMatch) return -1
    if (!aTitleMatch && bTitleMatch) return 1
    
    // Then sort by date
    return new Date(b.date).getTime() - new Date(a.date).getTime()
  })
}

export function highlightSearchTerms(text: string, query: string): string {
  if (!query.trim()) return text

  const searchTerms = query.toLowerCase().split(" ").filter(Boolean)
  let highlightedText = text

  searchTerms.forEach(term => {
    const regex = new RegExp(`(${term})`, "gi")
    highlightedText = highlightedText.replace(regex, '<mark class="bg-primary/20 px-0.5 rounded">$1</mark>')
  })

  return highlightedText
}