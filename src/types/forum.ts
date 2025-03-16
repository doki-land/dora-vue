export interface ForumGroup {
    id: number
    name: string
    description: string
    forums: Forum[]
}

export interface Forum {
    id: number
    name: string
    description: string
    logo: string
    posts: Post[]
    displayMode: 'latest' | 'hot'
}

export interface Post {
    id: number
    title: string
    content: string
    author: string
    createTime: string
    viewCount: number
    replyCount: number
    lastReplyTime: string
}