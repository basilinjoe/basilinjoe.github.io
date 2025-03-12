import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

const postsDirectory = path.join(process.cwd(), 'content/blog')

export interface BlogPost {
  id: string
  title: string
  date: string
  excerpt: string
  content: string
  tags: string[]
  readingTime: string
  coverImage?: string
}

export function getAllPosts(): BlogPost[] {
  try {
    if (!fs.existsSync(postsDirectory)) {
      return [];
    }
    
    const fileNames = fs.readdirSync(postsDirectory);
    if (!fileNames.length) {
      return [];
    }

    const allPostsData = fileNames
      .filter(fileName => fileName.endsWith('.md'))
      .map((fileName) => {
        try {
          const id = fileName.replace(/\.md$/, '');
          const fullPath = path.join(postsDirectory, fileName);
          const fileContents = fs.readFileSync(fullPath, 'utf8');
          const { data, content } = matter(fileContents);

          // Calculate reading time (average reading speed: 200 words per minute)
          const wordCount = content.split(/\s+/).length;
          const readingTimeMinutes = Math.ceil(wordCount / 200);
          const readingTime = readingTimeMinutes === 1 
            ? '1 min read' 
            : `${readingTimeMinutes} mins read`;

          return {
            id,
            content,
            title: data.title || 'Untitled',
            date: data.date || new Date().toISOString(),
            excerpt: data.excerpt || '',
            tags: data.tags || [],
            readingTime,
            coverImage: data.coverImage || undefined
          } as BlogPost;
        } catch (error) {
          console.error(`Error processing blog post ${fileName}:`, error);
          return null;
        }
      })
      .filter((post): post is BlogPost => post !== null);

    return allPostsData.sort((a, b) => {
      if (a.date < b.date) {
        return 1;
      } else {
        return -1;
      }
    });
  } catch (error) {
    console.error('Error getting all posts:', error);
    return [];
  }
}

export async function getPostById(id: string): Promise<BlogPost | null> {
  try {
    const fullPath = path.join(postsDirectory, `${id}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)
    
    // Calculate reading time (average reading speed: 200 words per minute)
    const wordCount = content.split(/\s+/).length;
    const readingTimeMinutes = Math.ceil(wordCount / 200);
    const readingTime = readingTimeMinutes === 1 
      ? '1 min read' 
      : `${readingTimeMinutes} mins read`;
    
    return {
      id,
      content,
      title: data.title || 'Untitled',
      date: data.date || new Date().toISOString(),
      excerpt: data.excerpt || '',
      tags: data.tags || [],
      readingTime,
      coverImage: data.coverImage || undefined
    }
  } catch (error) {
    console.error(`Error getting post by id ${id}:`, error);
    return null
  }
}

/**
 * Get all unique tags from all blog posts
 */
export function getAllTags(): string[] {
  const posts = getAllPosts();
  const tagsSet = new Set<string>();
  
  posts.forEach(post => {
    if (post.tags && Array.isArray(post.tags)) {
      post.tags.forEach(tag => tagsSet.add(tag));
    }
  });
  
  return Array.from(tagsSet).sort();
}

/**
 * Get all posts that have a specific tag
 */
export function getPostsByTag(tag: string): BlogPost[] {
  const posts = getAllPosts();
  return posts.filter(post => 
    post.tags && Array.isArray(post.tags) && post.tags.includes(tag)
  );
}