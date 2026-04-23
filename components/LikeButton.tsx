'use client'

import { useState, useEffect } from 'react'

interface LikeButtonProps {
  storySlug: string
  initialLikes?: number
}

export default function LikeButton({ storySlug, initialLikes = 0 }: LikeButtonProps) {
  const [likes, setLikes] = useState(initialLikes)
  const [isLiked, setIsLiked] = useState(false)

  useEffect(() => {
    // 从 localStorage 读取点赞状态
    const liked = localStorage.getItem(`liked_${storySlug}`) === 'true'
    setIsLiked(liked)
  }, [storySlug])

  const handleLike = () => {
    const newLiked = !isLiked
    setIsLiked(newLiked)
    setLikes(prev => newLiked ? prev + 1 : prev - 1)
    localStorage.setItem(`liked_${storySlug}`, String(newLiked))
    
    // 这里可以发送 API 请求保存点赞数
    // fetch(`/api/like/${storySlug}`, { method: 'POST', body: JSON.stringify({ liked: newLiked }) })
  }

  return (
    <button
      onClick={handleLike}
      className={`like-button ${isLiked ? 'like-button-active' : ''}`}
      aria-label="点赞"
    >
      <svg className="w-4 h-4" fill={isLiked ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
      <span>{likes}</span>
    </button>
  )
}