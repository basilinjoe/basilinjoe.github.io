import { getAllPosts } from "@/lib/blog"
import { siteConfig } from "@/config/site"
import { resolveAssetUrl } from "@/lib/utils"

export const dynamic = "force-static"

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;")
}

export async function GET() {
  const posts = getAllPosts()
  const buildDate = new Date().toUTCString()
  const feedUrl = `${siteConfig.url}/feed.xml`

  const items = posts
    .map((post) => {
      const url = `${siteConfig.url}/blog/${post.id}`
      const pubDate = new Date(post.date).toUTCString()
      const categories = (post.tags ?? [])
        .map((tag) => `      <category>${escapeXml(tag)}</category>`)
        .join("\n")
      const image = post.coverImage
        ? `      <enclosure url="${escapeXml(resolveAssetUrl(post.coverImage))}" type="image/webp" />`
        : ""

      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${pubDate}</pubDate>
      <description>${escapeXml(post.excerpt)}</description>
      <author>${escapeXml(siteConfig.email)} (${escapeXml(siteConfig.name)})</author>
${categories}
${image}
    </item>`
    })
    .join("\n")

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(siteConfig.openGraph.siteName)}</title>
    <link>${siteConfig.url}</link>
    <description>${escapeXml(siteConfig.description)}</description>
    <language>en-us</language>
    <lastBuildDate>${buildDate}</lastBuildDate>
    <atom:link href="${feedUrl}" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  })
}
