'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'

export default function Navbar() {
  const pathname = usePathname()
  const [isDark, setIsDark] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    const isDarkMode = localStorage.getItem('theme') === 'dark' ||
      (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)
    setIsDark(isDarkMode)
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    }
  }, [])

  const toggleTheme = () => {
    const newDark = !isDark
    setIsDark(newDark)
    if (newDark) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`
      setIsSearchOpen(false)
    }
  }

  const links = [
    { href: '/', label: '首页' },
    { href: '/archive', label: '归档' },
    { href: '/categories', label: '分类' },
    { href: '/about', label: '关于' },
  ]

  return (
    <nav className="navbar">
      <div className="container-custom">
        <div className="flex items-center justify-between h-14 md:h-16">
          {/* Logo */}
          <Link href="/" className="text-base md:text-lg font-medium tracking-wide hover:text-gray-500 transition-colors">
            故事小馆
          </Link>
          
          {/* 桌面端导航 */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`nav-link ${pathname === link.href ? 'text-gray-800 dark:text-gray-200' : ''}`}
              >
                {link.label}
              </Link>
            ))}
            
            <button onClick={() => setIsSearchOpen(!isSearchOpen)} className="nav-link">
              搜索
            </button>
            
            <button onClick={toggleTheme} className="nav-link">
              {isDark ? '亮色' : '暗色'}
            </button>
          </div>
          
          {/* 移动端菜单按钮 */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-500 dark:text-gray-400"
            aria-label="菜单"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
        
        {/* 移动端菜单 */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100 dark:border-gray-800">
            <div className="flex flex-col gap-3">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`nav-link text-base ${pathname === link.href ? 'text-gray-800 dark:text-gray-200' : ''}`}
                >
                  {link.label}
                </Link>
              ))}
              <button
                onClick={() => {
                  setIsSearchOpen(!isSearchOpen)
                  setIsMenuOpen(false)
                }}
                className="nav-link text-base text-left"
              >
                搜索
              </button>
              <button onClick={toggleTheme} className="nav-link text-base text-left">
                {isDark ? '亮色模式' : '暗色模式'}
              </button>
            </div>
          </div>
        )}
        
        {/* 搜索框 */}
        {isSearchOpen && (
          <div className="py-4 border-t border-gray-100 dark:border-gray-800">
            <form onSubmit={handleSearch}>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="搜索故事..."
                className="search-input"
                autoFocus
              />
            </form>
          </div>
        )}
      </div>
    </nav>
  )
}