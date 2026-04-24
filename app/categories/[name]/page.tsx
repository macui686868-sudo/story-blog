import { allStories } from '@/lib/generated-stories'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'

interface PageProps {
  params: {
    name: string
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const categoryName = decodeURIComponent(params.name)
  return {
    title: `${categoryName} - 分类 | 故事小馆`,
    description: `浏览${categoryName}分类下的所有故事`,
  }
}

export default function CategoryPage({ params }: PageProps) {
  const categoryName = decodeURIComponent(params.name)
  const stories = allStories.filter(s => s.category === categoryName)
  
  if (stories.length === 0) {
    notFound()
  }
  
  return (
    <div className="container-custom py-12">
      <div className="section-header">
        <span className="section-title">分类: {categoryName}</span>
        <div className="section-line"></div>
      </div>
      
      <div>
        {stories.map((story) => (
          <article key={story._id} className="story-card">
            <Link href={`/stories/${story.slug}`}>
              <h2 className="story-title">{story.title}</h2>
            </Link>
            <div className="story-meta">
              <time>{story.date}</time>
              <span>·</span>
              <span>{story.category}</span>
              <span>·</span>
              <span>{Math.ceil((story.content || '').split(/\s+/g).length / 200)} 分钟阅读</span>
            </div>
            <p className="story-excerpt">{story.excerpt}</p>
            <Link href={`/stories/${story.slug}`} className="read-more">
              阅读全文 →
            </Link>
          </article>
        ))}
      </div>
    </div>
  )
}