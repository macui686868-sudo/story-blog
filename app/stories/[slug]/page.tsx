import { allStories } from 'contentlayer/generated'
import { notFound } from 'next/navigation'
import { useMDXComponent } from 'next-contentlayer2/client'
import Link from 'next/link'

export default function StoryPage({ params }: { params: { slug: string } }) {
  const stories = allStories || []
  const story = stories.find((s) => s.slug === params.slug)
  
  if (!story) {
    notFound()
  }
  
  const MDXContent = useMDXComponent(story.body.code)
  
  return (
    <article className="container-custom py-12">
      <Link href="/" className="read-more mb-8 inline-block">
        ← 返回首页
      </Link>
      
      <h1 className="text-3xl md:text-4xl font-serif mb-4 tracking-tight">
        {story.title}
      </h1>
      
      <div className="story-meta pb-6 border-b border-gray-100 dark:border-gray-800 mb-8">
        <time>{story.date}</time>
        <span>·</span>
        <span>{story.category}</span>
        <span>·</span>
        <span>{Math.ceil((story.body.raw || '').split(/\s+/g).length / 200)} 分钟阅读</span>
      </div>
      
      <div className="prose-custom">
        <MDXContent />
      </div>
    </article>
  )
}