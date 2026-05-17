import { ImageResponse } from "next/og"
import { getAllPosts, getPostById } from "@/lib/blog"

export const dynamic = "force-static"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({ slug: post.id }))
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPostById(slug)
  const title = post?.title ?? "Blog Post"
  const excerpt = post?.excerpt ?? ""
  const tags = (post?.tags ?? []).slice(0, 3)

  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #0f172a 0%, #1e3a5f 60%, #0f172a 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "80px",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {/* Accent line */}
        <div style={{ width: 64, height: 6, background: "#3b82f6", borderRadius: 3, marginBottom: 32, display: "flex" }} />

        {/* Tags */}
        {tags.length > 0 && (
          <div style={{ display: "flex", gap: 8, marginBottom: 24 }}>
            {tags.map((tag) => (
              <div
                key={tag}
                style={{
                  background: "rgba(59,130,246,0.2)",
                  border: "1px solid rgba(59,130,246,0.4)",
                  color: "#93c5fd",
                  fontSize: 16,
                  fontWeight: 600,
                  padding: "4px 14px",
                  borderRadius: 999,
                  display: "flex",
                }}
              >
                {tag}
              </div>
            ))}
          </div>
        )}

        {/* Title */}
        <div
          style={{
            fontSize: title.length > 50 ? 44 : 52,
            fontWeight: 800,
            color: "#f8fafc",
            lineHeight: 1.15,
            maxWidth: 900,
            marginBottom: 28,
            display: "flex",
          }}
        >
          {title}
        </div>

        {/* Excerpt */}
        {excerpt && (
          <div
            style={{
              fontSize: 22,
              color: "#94a3b8",
              maxWidth: 800,
              lineHeight: 1.5,
              marginBottom: 40,
              display: "flex",
            }}
          >
            {excerpt.length > 120 ? excerpt.slice(0, 120) + "…" : excerpt}
          </div>
        )}

        {/* Author */}
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: "auto" }}>
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: "50%",
              background: "#3b82f6",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 20,
              fontWeight: 800,
              color: "#fff",
            }}
          >
            BJ
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 20, fontWeight: 700, color: "#f8fafc", display: "flex" }}>Basilin Joe</div>
            <div style={{ fontSize: 16, color: "#64748b", display: "flex" }}>basilinjoe.github.io</div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
