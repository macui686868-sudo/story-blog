'use client'

import { useState, useEffect } from 'react'

interface Comment {
  id: string
  author: string
  content: string
  date: string
}

interface CommentSectionProps {
  storySlug: string
}

export default function CommentSection({ storySlug }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>([])
  const [author, setAuthor] = useState('')
  const [content, setContent] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  // 加载评论
  useEffect(() => {
    const saved = localStorage.getItem(`comments_${storySlug}`)
    if (saved) {
      setComments(JSON.parse(saved))
    }
    setIsLoading(false)
  }, [storySlug])

  // 保存评论
  const saveComments = (newComments: Comment[]) => {
    setComments(newComments)
    localStorage.setItem(`comments_${storySlug}`, JSON.stringify(newComments))
  }

  // 提交评论
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!author.trim() || !content.trim()) return

    const newComment: Comment = {
      id: Date.now().toString(),
      author: author.trim(),
      content: content.trim(),
      date: new Date().toISOString().split('T')[0],
    }

    saveComments([newComment, ...comments])
    setContent('')
  }

  // 删除评论
  const deleteComment = (id: string) => {
    saveComments(comments.filter(c => c.id !== id))
  }

  if (isLoading) {
    return <div className="text-center py-8 text-gray-400">加载评论中...</div>
  }

  return (
    <div className="comment-section">
      <h3 className="text-lg font-serif mb-6 flex items-center gap-2">
        <span>💬</span>
        <span>评论 · {comments.length}</span>
      </h3>
      
      {/* 评论表单 */}
      <form onSubmit={handleSubmit} className="mb-8 space-y-4">
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="昵称"
          className="comment-input"
          maxLength={50}
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="写下你的想法..."
          rows={3}
          className="comment-input resize-none"
        />
        <button
          type="submit"
          className="px-4 py-2 text-sm text-white bg-[#8b7355] dark:bg-gray-700 rounded-full hover:bg-[#7a6548] dark:hover:bg-gray-600 transition-colors"
        >
          发表评论
        </button>
      </form>
      
      {/* 评论列表 */}
      <div className="space-y-0">
        {comments.length === 0 ? (
          <p className="text-center text-gray-400 py-8">暂无评论，成为第一个评论的人吧~</p>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="comment">
              <div className="flex gap-3">
                <div className="comment-avatar">
                  {comment.author[0].toUpperCase()}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="font-medium text-sm">{comment.author}</span>
                    <span className="text-xs text-gray-400">{comment.date}</span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                    {comment.content}
                  </p>
                  <button
                    onClick={() => deleteComment(comment.id)}
                    className="text-xs text-gray-400 hover:text-red-500 mt-2 transition-colors"
                  >
                    删除
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}