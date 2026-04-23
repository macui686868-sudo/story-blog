declare module 'contentlayer/generated' {
  export interface Story {
    _id: string
    title: string
    date: string
    slug: string
    category: string
    tags?: string[]
    excerpt?: string
    featured?: boolean
    body: {
      code: string
      raw: string
    }
  }
  
  export const allStories: Story[]
}