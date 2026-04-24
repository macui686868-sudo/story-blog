'use client'

interface ShareButtonsProps {
  title: string
  url?: string
}

export function ShareButtons({ title, url }: ShareButtonsProps) {
  const shareUrl = url || (typeof window !== 'undefined' ? window.location.href : '')

  const handleShare = (platform: string) => {
    let shareLink = ''
    
    switch (platform) {
      case 'twitter':
        shareLink = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(shareUrl)}`
        break
      case 'weibo':
        shareLink = `http://service.weibo.com/share/share.php?title=${encodeURIComponent(title)}&url=${encodeURIComponent(shareUrl)}`
        break
      case 'wechat':
        alert('请点击右上角"..."选择"分享到朋友圈"')
        return
      default:
        return
    }
    
    window.open(shareLink, '_blank', 'width=600,height=400')
  }

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-neutral-500">分享：</span>
      <button
        onClick={() => handleShare('twitter')}
        className="p-2 rounded-full bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 transition"
        aria-label="分享到 Twitter"
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      </button>
      <button
        onClick={() => handleShare('weibo')}
        className="p-2 rounded-full bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 transition"
        aria-label="分享到微博"
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.5 12c0-4.7-3.8-8.5-8.5-8.5S3.5 7.3 3.5 12s3.8 8.5 8.5 8.5 8.5-3.8 8.5-8.5zM12 17.5c-3 0-5.5-2.5-5.5-5.5S9 6.5 12 6.5s5.5 2.5 5.5 5.5-2.5 5.5-5.5 5.5z" />
        </svg>
      </button>
      <button
        onClick={() => handleShare('wechat')}
        className="p-2 rounded-full bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 transition"
        aria-label="分享到微信"
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M16.5 10.5c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-7 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm10.5-2c0-3.3-3.6-6-8-6s-8 2.7-8 6 3.6 6 8 6c.6 0 1.2-.1 1.8-.2.2.3.4.5.7.8.5.4 1.1.7 1.8.9.1-.1.2-.2.3-.3.8-.6 1.4-1.3 1.8-2.1.5.1 1 .2 1.6.2 4.4 0 8-2.7 8-6 0-2.1-1.4-3.9-3.5-5.1z" />
        </svg>
      </button>
    </div>
  )
}