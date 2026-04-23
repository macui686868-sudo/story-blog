import { getStoryBySlug, getAllStories } from '@/src/lib/stories'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { MDXRemote } from 'next-mdx-remote/rsc'
import LikeButton from '@/components/LikeButton'
import CommentSection from '@/components/CommentSection'

export async function generateStaticParams() {
  const stories = getAllStories()
  return stories.map((story) => ({ slug: story.slug }))
}

// 关键修改：将组件改为 async，并 await params
export default async function StoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params   // 先 await 再解构
  const story = getStoryBySlug(slug)
  
  if (!story) {
    notFound()
  }
  
  return (
    <article className="container-custom py-12">
      <Link href="/" className="read-more mb-8 inline-block">
        ← 返回首页
      </Link>
      
      <h1 className="text-4xl md:text-5xl font-serif mb-4 tracking-tight">
        {story.title}
      </h1>
      
      <div className="story-meta pb-6 border-b border-[#e8e2d8] dark:border-gray-800 mb-8">
        <time>{story.date}</time>
        <span>·</span>
        <span>{story.category}</span>
        <span>·</span>
        <span>{Math.ceil(story.content.split(/\s+/g).length / 200)} 分钟阅读</span>
      </div>
      
      <div className="flex justify-center mb-8">
        <LikeButton storySlug={slug} initialLikes={128} />
      </div>
      
      <div className="prose-custom">
        <MDXRemote source={story.content} />
      </div>
      
      <div className="mt-12 pt-8 border-t border-[#e8e2d8] dark:border-gray-800 text-center">
        <LikeButton storySlug={slug} initialLikes={128} />
      </div>
      
      <CommentSection storySlug={slug} />
    </article>
  )
}