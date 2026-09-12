import Link from "next/link"
import { notFound } from "next/navigation"
import { Metadata } from "next"
import { getAllTags, getPostsByTag, getTagBySlug } from "@/lib/blog"
import { tagToSlug } from "@/lib/tags"
import { siteConfig } from "@/config/site"
import { BreadcrumbJsonLd } from "@/components/json-ld"

export async function generateStaticParams() {
  return getAllTags().map((tag) => ({ tag: tagToSlug(tag) }))
}

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const { tag: slug } = await params
  const tag = getTagBySlug(slug)

  if (!tag) return { title: "Tag Not Found" }

  const url = `${siteConfig.url}/blog/tag/${slug}`
  const title = `Posts tagged "${tag}"`
  const description = `Articles about ${tag} by ${siteConfig.name}`

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, type: "website", url },
    twitter: { card: "summary", title, description },
  }
}

export default async function TagPage({ params }: any) {
  const { tag: slug } = await params
  const tag = getTagBySlug(slug)

  if (!tag) notFound()

  const posts = getPostsByTag(tag)

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: siteConfig.url },
          { name: "Blog", url: `${siteConfig.url}/blog` },
          { name: tag, url: `${siteConfig.url}/blog/tag/${slug}` },
        ]}
      />

      <div className="container max-w-screen-2xl">
        <section className="border-b-2 border-foreground py-16 md:py-24">
          <nav className="mb-4 font-mono text-micro font-bold uppercase tracking-widest">
            <Link
              href="/blog"
              className="text-muted-foreground transition-colors hover:text-accent-hot"
            >
              ← All posts
            </Link>
          </nav>

          <div className="flex items-baseline gap-4">
            <span className="column-numeral">§</span>
            <span className="font-mono text-micro font-semibold uppercase tracking-widest text-accent-hot">
              Filed under · Tag archive
            </span>
          </div>

          <h1 className="mt-4 font-serif text-6xl leading-[0.95] tracking-tightest md:text-8xl lg:text-9xl">
            {tag}
            <span className="text-accent-hot">.</span>
          </h1>

          <p className="mt-4 font-mono text-micro font-bold uppercase tracking-widest text-muted-foreground">
            {String(posts.length).padStart(2, "0")}{" "}
            {posts.length === 1 ? "post" : "posts"}
          </p>
        </section>

        <section className="py-12 md:py-16">
          <ol className="divide-y-2 divide-foreground/15 border-y-2 border-foreground">
            {posts.map((post, i) => (
              <li key={post.id} className="group">
                <Link
                  href={`/blog/${post.id}`}
                  className="grid grid-cols-12 items-baseline gap-4 px-2 py-6 transition-colors hover:bg-accent-lime/20"
                >
                  <span className="col-span-2 font-mono text-xs font-bold uppercase tracking-widest text-muted-foreground md:col-span-1">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <div className="col-span-10 md:col-span-8">
                    <h2 className="font-serif text-2xl leading-tight transition-colors group-hover:text-accent-hot md:text-3xl">
                      {post.title}
                    </h2>
                    <p className="mt-2 max-w-2xl text-sm text-muted-foreground md:text-base">
                      {post.excerpt}
                    </p>
                    {post.tags && post.tags.length > 1 && (
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {post.tags
                          .filter((t) => t !== tag)
                          .slice(0, 4)
                          .map((t) => (
                            <span key={t} className="sticker">
                              {t}
                            </span>
                          ))}
                      </div>
                    )}
                  </div>

                  <div className="col-span-12 flex flex-wrap items-center gap-3 font-mono text-micro uppercase tracking-widest text-muted-foreground md:col-span-3 md:justify-end">
                    <time dateTime={post.date}>
                      {new Date(post.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                      })}
                    </time>
                    <span aria-hidden>·</span>
                    <span>{post.readingTime}</span>
                  </div>
                </Link>
              </li>
            ))}
          </ol>
        </section>
      </div>
    </>
  )
}
