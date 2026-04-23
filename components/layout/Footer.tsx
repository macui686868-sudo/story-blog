import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-2xl">📖</span>
              <span className="text-lg font-bold bg-gradient-to-r from-red-600 to-pink-500 bg-clip-text text-transparent">
                故事小馆
              </span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              一个收集甜蜜短篇故事的温暖小站，愿每个故事都能给你带来片刻治愈。
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">快速链接</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-gray-600 dark:text-gray-400 hover:text-red-600 transition-colors">
                  首页
                </Link>
              </li>
              <li>
                <Link href="/archive" className="text-gray-600 dark:text-gray-400 hover:text-red-600 transition-colors">
                  故事归档
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-gray-600 dark:text-gray-400 hover:text-red-600 transition-colors">
                  分类浏览
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">热门分类</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/categories/甜宠" className="text-gray-600 dark:text-gray-400 hover:text-red-600 transition-colors">
                  🍬 甜宠
                </Link>
              </li>
              <li>
                <Link href="/categories/暧昧" className="text-gray-600 dark:text-gray-400 hover:text-red-600 transition-colors">
                  💕 暧昧
                </Link>
              </li>
              <li>
                <Link href="/categories/青梅竹马" className="text-gray-600 dark:text-gray-400 hover:text-red-600 transition-colors">
                  👫 青梅竹马
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">关于本站</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-gray-600 dark:text-gray-400 hover:text-red-600 transition-colors">
                  关于我们
                </Link>
              </li>
              <li>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-red-600 transition-colors">
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-800 mt-8 pt-8 text-center text-sm text-gray-500">
          <p>© {currentYear} 故事小馆. 保留所有权利。</p>
          <p className="mt-1">用 ❤️ 和 Next.js 构建</p>
        </div>
      </div>
    </footer>
  )
}