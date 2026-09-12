import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { tagToSlug } from '@/lib/tags'

const postsDirectory = path.join(process.cwd(), 'content/blog')

export interface BlogPost {
  id: string
  title: string
  date: string
  modified?: string
  excerpt: string
  content: string
  tags: string[]
  readingTime: string
  coverImage?: string
  draft?: boolean
}

function readPost(fileName: string): BlogPost {
  const id = fileName.replace(/\.(md|mdx)$/, '')
  const fullPath = path.join(postsDirectory, fileName)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  const wordCount = content.split(/\s+/).filter(Boolean).length
  const readingTimeMinutes = Math.max(1, Math.ceil(wordCount / 200))
  const readingTime = readingTimeMinutes === 1 ? '1 min read' : `${readingTimeMinutes} mins read`

  return {
    id,
    content,
    title: data.title || 'Untitled',
    date: data.date || new Date().toISOString(),
    modified: data.modified || undefined,
    excerpt: data.excerpt || '',
    tags: data.tags || [],
    readingTime,
    coverImage: data.coverImage || undefined,
    draft: data.draft === true,
  }
}

// Drafts are excluded from production builds. Set INCLUDE_DRAFTS=true to preview them locally.
const includeDrafts = process.env.INCLUDE_DRAFTS === 'true'

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(postsDirectory)) return []

  return fs
    .readdirSync(postsDirectory)
    .filter((fileName) => /\.(md|mdx)$/.test(fileName))
    .map(readPost)
    .filter((post) => includeDrafts || !post.draft)
    .sort((a, b) => (a.date < b.date ? 1 : -1))
}

export async function getPostById(id: string): Promise<BlogPost | null> {
  const mdxPath = path.join(postsDirectory, `${id}.mdx`)
  const mdPath = path.join(postsDirectory, `${id}.md`)
  const fileName = fs.existsSync(mdxPath) ? `${id}.mdx` : fs.existsSync(mdPath) ? `${id}.md` : null
  if (!fileName) return null
  const post = readPost(fileName)
  if (post.draft && !includeDrafts) return null
  return post
}

export function getAllTags(): string[] {
  const tagsSet = new Set<string>()
  for (const post of getAllPosts()) {
    for (const tag of post.tags ?? []) tagsSet.add(tag)
  }
  return Array.from(tagsSet).sort()
}

export function getPostsByTag(tag: string): BlogPost[] {
  return getAllPosts().filter((post) => post.tags?.includes(tag))
}

export function getTagBySlug(slug: string): string | null {
  return getAllTags().find((tag) => tagToSlug(tag) === slug) ?? null
}
