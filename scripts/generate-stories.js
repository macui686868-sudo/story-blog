const fs = require('fs')
const path = require('path')
const matter = require('gray-matter')

// 目录路径
const storiesDir = path.join(process.cwd(), 'content/stories')
const outputDir = path.join(process.cwd(), 'lib')
const outputFile = path.join(outputDir, 'generated-stories.ts')

// 确保输出目录存在
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true })
}

// 读取所有 MDX 文件
const files = fs.readdirSync(storiesDir).filter(f => f.endsWith('.mdx'))

if (files.length === 0) {
  console.warn('⚠️ 没有找到 MDX 文件，请先在 content/stories/ 目录下创建故事文件')
  // 创建一个空的 stories 数组
  const emptyOutput = `// 自动生成，请勿手动修改
// 请在 content/stories/ 目录下添加 .mdx 文件

export interface Story {
  _id: string
  slug: string
  title: string
  excerpt: string
  date: string
  category: string
  tags: string[]
  content: string
}

export const allStories: Story[] = []
`
  fs.writeFileSync(outputFile, emptyOutput)
  console.log('📁 已创建空的 generated-stories.ts')
  return
}

// 解析每个 MDX 文件
const stories = files.map(file => {
  const filePath = path.join(storiesDir, file)
  const fileContent = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(fileContent)
  
  return {
    _id: file,
    slug: file.replace(/\.mdx$/, ''),
    title: data.title || '无标题',
    excerpt: data.excerpt || '',
    date: data.date || new Date().toISOString().split('T')[0],
    category: data.category || '未分类',
    tags: data.tags || [],
    coverImage: data.coverImage || '',
    content: content.trim()
  }
})

// 生成 TypeScript 文件
const output = `// 自动生成，请勿手动修改
// 生成时间: ${new Date().toLocaleString()}
// 故事数量: ${stories.length}

export interface Story {
  _id: string
  slug: string
  title: string
  excerpt: string
  date: string
  category: string
  tags: string[]
  content: string
}

export const allStories: Story[] = ${JSON.stringify(stories, null, 2)}
`

fs.writeFileSync(outputFile, output)
console.log(`✅ 成功生成 ${stories.length} 个故事到 lib/generated-stories.ts`)