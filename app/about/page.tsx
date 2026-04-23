export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-8">
        <h1 className="text-3xl font-bold mb-6 text-center">关于故事小馆</h1>
        
        <div className="prose dark:prose-invert max-w-none">
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
            欢迎来到故事小馆！
          </p>
          
          <h2 className="text-xl font-semibold mt-6 mb-3">我们的故事</h2>
          <p>
            故事小馆成立于 2024 年，是一个专注于收集和分享甜蜜短篇故事的温暖小站。
            我们相信每一个故事都值得被讲述，每一份情感都值得被珍藏。
          </p>
          
          <h2 className="text-xl font-semibold mt-6 mb-3">我们的使命</h2>
          <p>
            在这个快节奏的时代，我们希望为你提供一个温暖的角落，
            让你可以在忙碌之余，读一读甜蜜的故事，感受生活中的小确幸。
          </p>
          
          <h2 className="text-xl font-semibold mt-6 mb-3">联系我们</h2>
          <p>
            如果你有精彩的故事想要分享，或者有任何建议，欢迎通过以下方式联系我们：
          </p>
          <ul>
            <li>邮箱：story@example.com</li>
            <li>GitHub：github.com/your-repo</li>
          </ul>
        </div>
      </div>
    </div>
  )
}