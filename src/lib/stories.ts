import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

// 定义 Story 类型
export interface Story {
  _id: string
  slug: string
  title: string
  excerpt: string
  date: string
  category: string
  tags: string[]
  featured: boolean
  author?: string 
  content: string
  body: {
    code: content
    raw: content
  }
}

const storiesDirectory = path.join(process.cwd(), 'content/stories')

export function getAllStories(): Story[] {
  if (!fs.existsSync(storiesDirectory)) {
    return []
  }
  
  const fileNames = fs.readdirSync(storiesDirectory)
  
  const stories: Story[] = fileNames
    .filter(fileName => fileName.endsWith('.mdx'))
    .map(fileName => {
      const fullPath = path.join(storiesDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data, content } = matter(fileContents)
      
      return {
        _id: fileName,
        slug: fileName.replace(/\.mdx$/, ''),
        title: data.title || '无标题',
        excerpt: data.excerpt || '',
        date: data.date ? new Date(data.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
        category: data.category || '未分类',
        tags: data.tags || [],
        featured: data.featured || false,
        author: data.author || '',
        content: content,
        body: { code: content, raw: content },
      }
    })
  
  return stories
}

export function getStoryBySlug(slug: string): Story | undefined {
  const stories = getAllStories()
  return stories.find(story => story.slug === slug)
}