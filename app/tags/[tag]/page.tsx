import { allStories } from 'contentlayer/generated'
import { notFound } from 'next/navigation'
import { StoryCard } from '@/components/story/StoryCard'
import Link from 'next/link'
import type { Metadata } from 'next'

interface PageProps {
  params: {
    tag: string
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const decodedTag = decodeURIComponent(params.tag)
  return {
    title: `#${decodedTag} - 标签故事`,
    description: `带有标签「${decodedTag}」的言情短篇故事合集。`,
  }
}

export default function TagPage({ params }: PageProps) {
  const tagName = decodeURIComponent(params.tag)
  const stories = allStories.filter(s => s.tags.includes(tagName))
  
  if (stories.length === 0) {
    notFound()
  }

  return (
    <div className="container-custom py-8">
      <div className="mb-6">
        <Link href="/tags" className="text-neutral-500 hover:text-primary-600 text-sm">
          ← 返回所有标签
        </Link>
      </div>
      
      <h1 className="text-3xl font-bold mb-2">#{tagName}</h1>
      <p className="text-neutral-500 mb-8">共 {stories.length} 个故事</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stories.map((story) => (
          <StoryCard key={story._id} story={story} />
        ))}
      </div>
    </div>
  )
}