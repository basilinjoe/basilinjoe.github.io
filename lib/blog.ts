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

          return {
            id,
            content,
            title: data.title || 'Untitled',
            date: data.date || new Date().toISOString(),
            excerpt: data.excerpt || ''
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
    
    return {
      id,
      content,
      ...(data as { title: string; date: string; excerpt: string })
    }
  } catch (error) {
    return null
  }
}