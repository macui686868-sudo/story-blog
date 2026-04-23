import { allStories } from 'contentlayer/generated'
import Link from 'next/link'

export default function TagsPage() {
  // 统计每个标签的使用次数
  const tagCounts = allStories.reduce((acc, story) => {
    story.tags.forEach(tag => {
      acc[tag] = (acc[tag] || 0) + 1
    })
    return acc
  }, {} as Record<string, number>)
  
  const tags = Object.entries(tagCounts).sort((a, b) => b[1] - a[1])

  return (
    <div className="container-custom py-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">🏷️ 全部标签</h1>
      
      <div className="flex flex-wrap gap-3">
        {tags.map(([tag, count]) => (
          <Link
            key={tag}
            href={`/tags/${encodeURIComponent(tag)}`}
            className="group px-4 py-2 rounded-full bg-neutral-100 dark:bg-neutral-800 hover:bg-primary-100 dark:hover:bg-primary-900/50 transition-all"
          >
            <span className="text-neutral-700 dark:text-neutral-300 group-hover:text-primary-700 dark:group-hover:text-primary-300">
              #{tag}
            </span>
            <span className="ml-1 text-xs text-neutral-400">{count}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}