import type { Section } from '@/types/forum'

// 模拟论坛数据
export const sections: Section[] = [
  {
    id: 1,
    name: '技术讨论',
    description: '各类技术相关讨论',
    categories: [
      {
        id: 1,
        name: '前端开发',
        description: '前端技术交流与分享',
        logo: '/images/frontend.svg',
        displayMode: 'latest',
        posts: [
          {
            id: 1,
            title: 'Vue3 + TypeScript 开发实践',
            content: '分享Vue3和TypeScript的最佳实践...',
            author: '张三',
            createTime: '2024-01-15 10:00:00',
            viewCount: 100,
            replyCount: 20,
            lastReplyTime: '2024-01-15 15:30:00'
          }
        ]
      },
      {
        id: 2,
        name: '后端开发',
        description: '后端技术交流与分享',
        logo: '/images/backend.svg',
        displayMode: 'hot',
        posts: [
          {
            id: 2,
            title: 'Spring Boot 3.0新特性解析',
            content: '详细介绍Spring Boot 3.0的新功能...',
            author: '李四',
            createTime: '2024-01-14 14:00:00',
            viewCount: 150,
            replyCount: 30,
            lastReplyTime: '2024-01-15 16:00:00'
          }
        ]
      }
    ]
  },
  {
    id: 2,
    name: '综合讨论',
    description: '日常交流与分享',
    categories: [
      {
        id: 3,
        name: '生活分享',
        description: '分享生活点滴',
        logo: '/images/life.svg',
        displayMode: 'latest',
        posts: [
          {
            id: 3,
            title: '程序员的日常生活',
            content: '分享作为程序员的日常...',
            author: '王五',
            createTime: '2024-01-15 09:00:00',
            viewCount: 80,
            replyCount: 15,
            lastReplyTime: '2024-01-15 14:00:00'
          }
        ]
      }
    ]
  }
]