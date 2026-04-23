'use client'

interface ShareButtonsProps {
  title: string
  url: string
}

export function ShareButtons({ title, url }: ShareButtonsProps) {
  const encodedUrl = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
    weibo: `http://service.weibo.com/share/share.php?title=${encodedTitle}&url=${encodedUrl}`,
    copy: '#',
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url)
      alert('链接已复制到剪贴板！')
    } catch (err) {
      console.error('复制失败:', err)
    }
  }

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-neutral-500">分享到：</span>
      <a
        href={shareLinks.twitter}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 rounded-full bg-neutral-100 dark:bg-neutral-800 hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-colors"
        aria-label="分享到 Twitter"
      >
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 0021.102-11.474c0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
        </svg>
      </a>
      <button
        onClick={copyToClipboard}
        className="p-2 rounded-full bg-neutral-100 dark:bg-neutral-800 hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-colors"
        aria-label="复制链接"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
        </svg>
      </button>
    </div>
  )
}