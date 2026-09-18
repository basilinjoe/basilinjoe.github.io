import { MDXRemote } from "next-mdx-remote/rsc"
import rehypeHighlight from "rehype-highlight"
import remarkGfm from "remark-gfm"
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
  // Plain <img> on purpose: `output: "export"` disables next/image
  // optimization, and MDX authors supply the alt text in the markdown.
  img: (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
    // biome-ignore lint/performance/noImgElement: `output: "export"` disables
    // next/image optimization, so a plain <img> is the correct element here.
    <img {...props} alt={props.alt ?? ""} loading="lazy" />
  ),
  // Tables get their own scroll container so a wide table never makes the page
  // body scroll horizontally (DESIGN.md §7). remark-gfm emits a bare <table>,
  // so the wrapper has to be added here rather than in CSS.
  table: (props: React.TableHTMLAttributes<HTMLTableElement>) => (
    <div className="markdown-table-scroll overflow-x-auto">
      <table {...props} />
    </div>
  ),
}

export function BlogPostContent({ post }: BlogPostContentProps) {
  return (
    <div className="mt-8">
      {/* Excerpt / dek — big serif italic pull */}
      <p className="border-l-4 border-accent-hot pl-5 font-serif text-xl italic leading-snug text-muted-foreground md:text-2xl">
        {post.excerpt}
      </p>

      <div className="markdown mt-10">
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
      </div>
    </div>
  )
}
