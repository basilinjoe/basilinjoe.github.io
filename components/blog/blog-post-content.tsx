import { MDXRemote } from "next-mdx-remote/rsc"
import rehypeHighlight from "rehype-highlight"
import remarkGfm from "remark-gfm"
import { MarkdownContent } from "@/components/markdown-content"
import { BlogPost } from "@/lib/blog"
import "highlight.js/styles/github-dark.css"

interface BlogPostContentProps {
  post: BlogPost
}

// External links get target="_blank"; images inherit brutalist border via
// the .markdown img rule in globals.css.
const mdxComponents = {
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
    const isExternal = props.href?.startsWith("http")
    return (
      <a
        {...props}
        target={isExternal ? "_blank" : props.target}
        rel={isExternal ? "noopener noreferrer" : props.rel}
      />
    )
  },
  img: (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <img {...props} loading="lazy" />
  ),
}

export function BlogPostContent({ post }: BlogPostContentProps) {
  return (
    <div className="mt-8">
      {/* Excerpt / dek — big serif italic pull */}
      <p className="border-l-4 border-accent-hot pl-5 font-serif text-xl italic leading-snug text-muted-foreground md:text-2xl">
        {post.excerpt}
      </p>

      <MarkdownContent className="mt-10">
        <MDXRemote
          source={post.content}
          components={mdxComponents}
          options={{
            mdxOptions: {
              remarkPlugins: [remarkGfm],
              rehypePlugins: [
                [rehypeHighlight, { detect: true, ignoreMissing: true }],
              ],
            },
          }}
        />
      </MarkdownContent>
    </div>
  )
}
