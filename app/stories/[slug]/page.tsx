import { notFound } from 'next/navigation'
import Link from 'next/link'
import { allStories } from '@/lib/generated-stories'
import { marked } from 'marked'

export default async function StoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const story = allStories.find(s => s.slug === slug)
  
  if (!story) {
    notFound()
  }
  
  // 配置 marked
  marked.setOptions({
    breaks: true,
    gfm: true,
  })
  
  const htmlContent = await marked.parse(story.content)
  
  return (
    <article className="container-custom py-12">
      <Link href="/" className="text-gray-400 hover:text-gray-600 text-sm mb-8 inline-block">
        ← 返回首页
      </Link>
      
      <h1 className="text-3xl md:text-4xl font-serif mb-4 tracking-tight">
        {story.title}
      </h1>
      
      <div className="text-sm text-gray-400 pb-6 border-b border-gray-100 dark:border-gray-800 mb-8">
        <time>{story.date}</time>
        <span className="mx-2">·</span>
        <span>{story.category}</span>
        <span className="mx-2">·</span>
        <span>{Math.ceil(story.content.split(/\s+/g).length / 200)} 分钟阅读</span>
      </div>
      
      <div 
        className="prose prose-gray dark:prose-invert max-w-none
                   prose-headings:font-serif prose-headings:mt-8 prose-headings:mb-4
                   prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl
                   prose-p:leading-relaxed prose-p:mb-4
                   prose-strong:text-gray-800 dark:prose-strong:text-gray-200"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
    </article>
  )
}