'use client'

import Link from 'next/link'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { useState } from 'react'

const navigation = [
  { name: '首页', href: '/' },
  { name: '归档', href: '/archive' },
  { name: '分类', href: '/categories' },
  { name: '标签', href: '/tags' },
  { name: '关于', href: '/about' },
]

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-800">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl">📖</span>
            <span className="font-bold text-xl bg-gradient-to-r from-primary-600 to-secondary-500 bg-clip-text text-transparent">
              故事小馆
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-neutral-600 hover:text-primary-600 dark:text-neutral-400 dark:hover:text-primary-400 transition-colors"
              >
                {item.name}
              </Link>
            ))}
            <ThemeToggle />
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-neutral-200 dark:border-neutral-800">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="block py-2 text-neutral-600 hover:text-primary-600 dark:text-neutral-400 dark:hover:text-primary-400"
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-2">
              <ThemeToggle />
            </div>
          </div>
        )}
      </div>
    </header>
  )
}