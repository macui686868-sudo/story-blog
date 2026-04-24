import { allStories } from '@/lib/generated-stories'
import { notFound } from 'next/navigation'
import Link from 'next/link'

interface PageProps {
  params: {
    tag: string
  }
}

export default function TagPage({ params }: PageProps) {
  const tagName = decodeURIComponent(params.tag)
  const stories = allStories.filter(s => s.tags?.includes(tagName))
  
  if (stories.length === 0) {
    notFound()
  }
  
  return (
    <div className="container-custom py-12">
      <div className="section-header">
        <span className="section-title">标签: {tagName}</span>
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