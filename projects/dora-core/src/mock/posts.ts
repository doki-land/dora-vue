import { Post } from '@/types/forum'

export const posts: Post[] = [
  {
    id: 1,
    title: 'Vue 3 Composition API使用心得',
    content: '内容...',
    author: '张三',
    createTime: '2023-05-15',
    viewCount: 120,
    replyCount: 15,
    lastReplyTime: '2023-05-20'
  },
  {
    id: 2,
    title: 'Vue Router 4新特性介绍',
    content: '内容...',
    author: '李四',
    createTime: '2023-05-10',
    viewCount: 85,
    replyCount: 8,
    lastReplyTime: '2023-05-19'
  },
  {
    id: 4,
    title: 'Spring Boot 3新特性',
    content: '内容...',
    author: '赵六',
    createTime: '2023-05-14',
    viewCount: 110,
    replyCount: 12,
    lastReplyTime: '2023-05-21'
  }
]