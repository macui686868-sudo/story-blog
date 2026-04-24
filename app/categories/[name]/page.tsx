import { allStories } from 'contentlayer/generated'
import { notFound } from 'next/navigation'
import { StoryCard } from '@/components/story/StoryCard'
import Link from 'next/link'
import type { Metadata } from 'next'

interface PageProps {
  params: {
    name: string
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const decodedName = decodeURIComponent(params.name)
  return {
    title: `${decodedName} - 故事分类`,
    description: `精选${decodedName}类言情短篇故事，甜宠暧昧一网打尽。`,
  }
}

export default function CategoryPage({ params }: PageProps) {
  const categoryName = decodeURIComponent(params.name)
  const stories = allStories.filter(s => s.category === categoryName)
  
  if (stories.length === 0) {
    notFound()
  }

  return (
    <div className="container-custom py-8">
      <div className="mb-6">
        <Link href="/categories" className="text-neutral-500 hover:text-primary-600 text-sm">
          ← 返回所有分类
        </Link>
      </div>
      
      <h1 className="text-3xl font-bold mb-2">{categoryName}</h1>
      <p className="text-neutral-500 mb-8">共 {stories.length} 个故事</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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