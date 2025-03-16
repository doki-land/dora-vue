import { Section } from '@/types/forum'
import { posts } from './posts'

export const sections: Section[] = [
  {
    id: 1,
    name: '前端开发',
    description: '前端相关技术讨论',
    categories: [
      {
        id: 1,
        name: 'vue',
        description: 'Vue.js相关讨论',
        logo: '/images/frontend.svg',
        displayMode: 'latest',
        posts: posts.filter(post => post.id <= 2)
      }
    ]
  },
  {
    id: 2,
    name: '后端开发',
    description: '后端相关技术讨论',
    categories: [
      {
        id: 3,
        name: 'java',
        description: 'Java相关讨论',
        logo: '/images/backend.svg',
        displayMode: 'latest',
        posts: posts.filter(post => post.id === 4)
      }
    ]
  }
]