import { Story } from 'contentlayer/generated'

interface StoryMetaProps {
  story: Story
}

export function StoryMeta({ story }: StoryMetaProps) {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  // 获取文章正文内容（body 可能是 code 或 raw 格式）
  const getContent = () => {
    // Contentlayer 的 body 对象通常有 code 或 raw 属性
    if (story.body && typeof story.body === 'object') {
      // 尝试获取 raw 文本
      if ('raw' in story.body && story.body.raw) {
        return story.body.raw as string
      }
      // 尝试获取 code
      if ('code' in story.body && story.body.code) {
        return story.body.code as string
      }
    }
    return ''
  }

  const content = getContent()
  
  // 计算字数（按空白字符分割）
  const wordCount = content ? content.split(/\s+/g).filter(Boolean).length : 0
  
  // 计算阅读时间（按平均每分钟 200 字计算）
  const readingTime = wordCount > 0 ? Math.ceil(wordCount / 200) : 1

  return (
    <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-600 dark:text-neutral-400">
      <div className="flex items-center gap-2">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <span>{formatDate(story.date)}</span>
      </div>
      <div className="flex items-center gap-2">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>{readingTime} 分钟阅读</span>
      </div>
      <div className="flex items-center gap-2">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
        <span>{wordCount} 字</span>
      </div>
    </div>
  )
}