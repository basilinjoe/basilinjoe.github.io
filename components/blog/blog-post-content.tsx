"use client"

import ReactMarkdown from "react-markdown"
import rehypeRaw from "rehype-raw"
import remarkGfm from 'remark-gfm'
import remarkImages from 'remark-images'
import { MarkdownContent } from "@/components/markdown-content"
import { BlogPost } from "@/lib/blog"

interface BlogPostContentProps {
  post: BlogPost
}

export function BlogPostContent({ post }: BlogPostContentProps) {
  return (
    <div className="prose prose-lg dark:prose-invert max-w-none mt-8">
      <div className="bg-gradient-to-br from-background to-muted/20 p-6 rounded-lg border border-border/40 mb-8">
        <p className="text-lg text-muted-foreground">{post.excerpt}</p>
      </div>
      
      <MarkdownContent className="mt-8">
        <ReactMarkdown 
          rehypePlugins={[rehypeRaw]}
          remarkPlugins={[remarkGfm, remarkImages]}
        >
          {post.content}
        </ReactMarkdown>
      </MarkdownContent>
    </div>
  )
}
