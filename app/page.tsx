import { allStories } from 'contentlayer/generated'
import Link from 'next/link'

export default function Home() {
  const stories = allStories || []
  
  // 按日期倒序排列（最新的在前）
  const sortedStories = [...stories].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  )
  
  return (
    <div className="container-custom py-6 md:py-10">
      <div className="hero-section">
        <div className="hero-badge">短篇故事集</div>
        <h1 className="hero-title">故事小馆</h1>
        <p className="hero-subtitle">一个收集甜蜜短篇故事的温暖小站</p>
      </div>
      
      <section>
        <div className="section-header">
          <span className="section-title">精选故事</span>
          <div className="section-line"></div>
        </div>
        <div>
          {sortedStories.map((story) => (
            <article key={story._id} className="story-card">
              <Link href={`/stories/${story.slug}`}>
                <h2 className="story-title">{story.title}</h2>
              </Link>
              <div className="story-meta">
                <time>{story.date}</time>
                <span>·</span>
                <span>{story.category}</span>
                <span>·</span>
                <span>{Math.ceil((story.body.raw || '').split(/\s+/g).length / 200)} 分钟阅读</span>
              </div>
              <p className="story-excerpt">{story.excerpt}</p>
              <Link href={`/stories/${story.slug}`} className="read-more">
                阅读全文 →
              </Link>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}