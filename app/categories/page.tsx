import { allStories } from '@/lib/generated-stories'
import Link from 'next/link'

export default function CategoriesPage() {
  const stories = allStories || []
  
  const categories = stories.reduce((acc, story) => {
    if (story.category && !acc[story.category]) {
      acc[story.category] = []
    }
    if (story.category) {
      acc[story.category].push(story)
    }
    return acc
  }, {} as Record<string, typeof stories>)
  
  const categoryIcons: Record<string, string> = {
    '甜宠': '🍬',
    '暧昧': '💕',
    '青梅竹马': '👫',
    '破镜重圆': '🔄',
    '都市': '🌆',
    '校园': '🏫',
    '古风': '🏯',
  }

  return (
    <div className="container-custom py-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">📂 全部分类</h1>
      
      {Object.keys(categories).length > 0 ? (
        <div className="grid gap-6">
          {Object.entries(categories).map(([category, categoryStories]) => (
            <Link
              key={category}
              href={`/categories/${encodeURIComponent(category)}`}
              className="group block p-6 rounded-lg bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 hover:border-primary-300 dark:hover:border-primary-700 transition-all"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{categoryIcons[category] || '📖'}</span>
                  <div>
                    <h2 className="text-xl font-semibold group-hover:text-primary-600 transition-colors">
                      {category}
                    </h2>
                    <p className="text-sm text-neutral-500">{categoryStories.length} 个故事</p>
                  </div>
                </div>
                <svg className="w-5 h-5 text-neutral-400 group-hover:text-primary-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-center text-neutral-500 py-12">暂无分类数据</p>
      )}
    </div>
  )
}