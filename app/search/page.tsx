'use client'

import { allStories } from '@/lib/generated-stories'
import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [results, setResults] = useState<any[]>([])
  const stories = allStories

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const q = params.get('q') || ''
    setSearchQuery(q)
    
    if (q) {
      const filtered = stories.filter(story =>
        story.title.includes(q) ||
        story.excerpt.includes(q) ||
        story.content.includes(q) ||
        story.tags?.some(tag => tag.includes(q))
      )
      setResults(filtered)
    }
  }, [stories])

  // ... 其余代码不变
}