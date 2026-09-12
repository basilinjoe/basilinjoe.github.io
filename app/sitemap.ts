import { MetadataRoute } from 'next'
import { getAllPosts, getAllTags } from '@/lib/blog'
import { tagToSlug } from '@/lib/tags'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const allPosts = getAllPosts();
  const mostRecentPostDate = allPosts.length > 0 ? new Date(allPosts[0].date) : new Date();

  const blogPosts = allPosts.map(post => ({
    url: `https://basilinjoe.github.io/blog/${post.id}`,
    lastModified: new Date(post.modified || post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const tagPages = getAllTags().map(tag => ({
    url: `https://basilinjoe.github.io/blog/tag/${tagToSlug(tag)}`,
    lastModified: mostRecentPostDate,
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  }));

  return [
    {
      url: 'https://basilinjoe.github.io',
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 1,
    },
    {
      url: 'https://basilinjoe.github.io/about',
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: 'https://basilinjoe.github.io/blog',
      lastModified: mostRecentPostDate,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: 'https://basilinjoe.github.io/projects',
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: 'https://basilinjoe.github.io/contact',
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.5,
    },
    ...blogPosts,
    ...tagPages,
  ]
}