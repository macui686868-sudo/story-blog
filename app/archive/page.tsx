import { getAllStories } from '@/src/lib/stories'
import Link from 'next/link'

export default function ArchivePage() {
  const stories = getAllStories()
  
  // 按年份分组
  const groupedByYear: { [year: string]: typeof stories } = {}
  stories.forEach(story => {
    const year = story.date.split('-')[0]
    if (!groupedByYear[year]) {
      groupedByYear[year] = []
    }
    groupedByYear[year].push(story)
  })
  
  // 年份倒序
  const years = Object.keys(groupedByYear).sort().reverse()
  
  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-serif mb-8">📅 归档</h1>
      
      {years.length === 0 ? (
        <p className="text-gray-500">暂无故事</p>
      ) : (
        years.map(year => (
          <div key={year} className="mb-8">
            <h2 className="text-xl font-serif mb-4 text-gray-600">{year}年</h2>
            <ul className="space-y-2">
              {groupedByYear[year].map(story => (
                <li key={story._id}>
                  <Link 
                    href={`/stories/${story.slug}`}
                    className="flex items-baseline gap-4 hover:text-gray-500 transition-colors"
                  >
                    <span className="text-sm text-gray-400 w-16">
                      {story.date.slice(5)}
                    </span>
                    <span className="flex-1">{story.title}</span>
                    <span className="text-sm text-gray-400 hidden sm:inline">
                      {story.category}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  )
}