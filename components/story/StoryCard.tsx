import Link from 'next/link'
import Image from 'next/image'
import type { Story } from 'contentlayer/generated'

interface StoryCardProps {
  story: Story
  variant?: 'default' | 'featured'
}

export function StoryCard({ story, variant = 'default' }: StoryCardProps) {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  if (variant === 'featured') {
    return (
      <Link href={`/stories/${story.slug}`} className="group block">
        <article className="card overflow-hidden">
          <div className="md:flex">
       {/* 暂时禁用封面图
{story.coverImage && (
  <div className="md:w-1/3 relative h-48 md:h-auto">
    <Image
      src={story.coverImage}
      alt={story.title}
      fill
      className="object-cover"
    />
  </div>
)}
*/}
            <div className="p-6 md:w-2/3">
              <div className="flex items-center gap-2 mb-3">
                <span className="tag">{story.category}</span>
                <span className="text-sm text-neutral-500">{formatDate(story.date)}</span>
               {/* 暂时禁用阅读时间
<span className="text-sm text-neutral-500">📖 {Math.ceil(story.readingTime)}分钟</span>
*/}
              </div>
              <h3 className="text-2xl font-semibold mb-2 group-hover:text-primary-600 transition-colors line-clamp-2">
                {story.title}
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400 line-clamp-3">
                {story.excerpt}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {story.tags.slice(0, 3).map((tag) => (
                  <span key={tag} className="tag text-xs">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </article>
      </Link>
    )
  }

  return (
    <Link href={`/stories/${story.slug}`} className="group block h-full">
      <article className="card p-5 h-full flex flex-col">
        {story.coverImage && (
          <div className="relative h-40 mb-4 rounded-md overflow-hidden">
            <Image
              src={story.coverImage}
              alt={story.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          <span className="tag">{story.category}</span>
          <span className="text-xs text-neutral-500">{formatDate(story.date)}</span>
        </div>
        <h3 className="text-lg font-semibold mb-2 group-hover:text-primary-600 transition-colors line-clamp-2">
          {story.title}
        </h3>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-3 flex-grow">
          {story.excerpt}
        </p>
        <div className="mt-4 flex items-center justify-between">
          <div className="flex gap-2">
            {story.tags.slice(0, 2).map((tag) => (
              <span key={tag} className="tag text-xs">
                #{tag}
              </span>
            ))}
          </div>
          <span className="text-xs text-neutral-400">❤️ {story.likes || 0}</span>
        </div>
      </article>
    </Link>
  )
}