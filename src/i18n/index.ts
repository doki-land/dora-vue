import { createI18n } from 'vue-i18n'

const messages = {
  en: {
    common: {
      home: 'Home',
      forum: 'Forum',
      post: 'Post',
      search: 'Search',
      login: 'Login',
      register: 'Register',
      settings: 'Settings',
      logout: 'Logout'
    },
    forum: {
      title: 'Forum Title',
      description: 'Forum Description',
      posts: 'Posts',
      members: 'Members',
      createPost: 'Create Post',
      latestPosts: 'Latest Posts',
      hotTopics: 'Hot Topics'
    }
  },
  zh: {
    common: {
      home: '首页',
      forum: '论坛',
      post: '帖子',
      search: '搜索',
      login: '登录',
      register: '注册',
      settings: '设置',
      logout: '退出'
    },
    forum: {
      title: '论坛标题',
      description: '论坛描述',
      posts: '帖子',
      members: '成员',
      createPost: '发帖',
      latestPosts: '最新帖子',
      hotTopics: '热门话题'
    }
  }
}

export default createI18n({
  legacy: false,
  locale: 'zh',
  fallbackLocale: 'en',
  messages
})