import { allStories } from '@/lib/generated-stories'
import Link from 'next/link'

export default function TagsPage() {
  // 统计每个标签的使用次数
  const tagCounts = allStories.reduce((acc, story) => {
    story.tags?.forEach(tag => {
      acc[tag] = (acc[tag] || 0) + 1
    })
    return acc
  }, {} as Record<string, number>)
  
  const tags = Object.entries(tagCounts).sort((a, b) => b[1] - a[1])
  
  return (
    <div className="container-custom py-12">
      <div className="section-header">
        <span className="section-title">所有标签</span>
        <div className="section-line"></div>
      </div>
      
      <div className="flex flex-wrap gap-3 mt-6">
        {tags.map(([tag, count]) => (
          <Link
            key={tag}
            href={`/tags/${encodeURIComponent(tag)}`}
            className="tag"
          >
            #{tag} <span className="text-xs">({count})</span>
          </Link>
        ))}
      </div>
    </div>
  )
}