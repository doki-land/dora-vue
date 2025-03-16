<template>
  <div class="category-detail">
    <div class="category-detail__container">
      <!-- 左侧边栏 -->
      <div class="category-detail__sidebar">
        <!-- 同Section下的Categories列表 -->
        <div class="sidebar-section">
          <h3 class="sidebar-title">{{ currentSection?.name }}</h3>
          <ul class="categories-list">
            <li 
              v-for="cat in currentSection?.categories" 
              :key="cat.id"
              :class="{'active': cat.name === categoryName}"
            >
              <router-link :to="`/c/${cat.name}`" class="category-link">
                <img :src="cat.logo" :alt="cat.name" class="category-icon" />
                <span>{{ cat.name }}</span>
              </router-link>
            </li>
          </ul>
        </div>

        <!-- 标签过滤区 -->
        <div class="sidebar-section">
          <h3 class="sidebar-title">{{ $t('category.tags') }}</h3>
          <div class="tags-container">
            <div 
              v-for="tag in availableTags" 
              :key="tag"
              :class="['tag', {'active': selectedTags.includes(tag)}]"
              @click="toggleTag(tag)"
            >
              {{ tag }}
            </div>
          </div>
        </div>

        <!-- 排序选项 -->
        <div class="sidebar-section">
          <h3 class="sidebar-title">{{ $t('category.sort') }}</h3>
          <div class="sort-options">
            <div 
              :class="['sort-option', {'active': sortBy === 'latest'}]"
              @click="sortBy = 'latest'"
            >
              {{ $t('category.sort_latest') }}
            </div>
            <div 
              :class="['sort-option', {'active': sortBy === 'hot'}]"
              @click="sortBy = 'hot'"
            >
              {{ $t('category.sort_hot') }}
            </div>
            <div 
              :class="['sort-option', {'active': sortBy === 'views'}]"
              @click="sortBy = 'views'"
            >
              {{ $t('category.sort_views') }}
            </div>
          </div>
        </div>

        <!-- 过滤选项 -->
        <div class="sidebar-section">
          <h3 class="sidebar-title">{{ $t('category.filters') }}</h3>
          <div class="filter-options">
            <label class="filter-option">
              <input type="checkbox" v-model="filters.onlyWithReplies" />
              {{ $t('category.filter_with_replies') }}
            </label>
            <label class="filter-option">
              <input type="checkbox" v-model="filters.onlyNew" />
              {{ $t('category.filter_new') }}
            </label>
          </div>
        </div>
      </div>

      <!-- 右侧内容区 -->
      <div class="category-detail__content">
        <div class="category-header">
          <div class="category-info">
            <img :src="currentCategory?.logo" :alt="currentCategory?.name" class="category-logo" />
            <div>
              <h1 class="category-name">{{ currentCategory?.name }}</h1>
              <p class="category-description">{{ currentCategory?.description }}</p>
            </div>
          </div>
          <div class="category-stats">
            <div class="stat-item">
              <span class="label">{{ $t('category.posts') }}</span>
              <span class="value">{{ filteredPosts.length }}</span>
            </div>
          </div>
        </div>

        <!-- 帖子列表 -->
        <div class="posts-container">
          <div 
            v-for="post in filteredPosts" 
            :key="post.id"
            class="post-item"
            @click="goToPost(post.id)"
          >
            <div class="post-title">{{ post.title }}</div>
            <div class="post-meta">
              <span class="post-author">{{ post.author }}</span>
              <span class="post-time">{{ post.createTime }}</span>
              <span class="post-views">{{ $t('category.views') }}: {{ post.viewCount }}</span>
              <span class="post-replies">{{ $t('category.replies') }}: {{ post.replyCount }}</span>
            </div>
          </div>
          <div v-if="filteredPosts.length === 0" class="no-posts">
            {{ $t('category.no_posts') }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Section, Category, Post } from '@/types/forum'
import {useFluent} from "fluent-vue";

const { $t } = useFluent()
const route = useRoute()
const router = useRouter()
const categoryName = computed(() => route.params.name as string)

// 模拟数据 - 实际项目中应该从API获取
const sections = ref<Section[]>([
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
        posts: [
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
            lastReplyTime: '2023-05-18'
          }
        ]
      },
      {
        id: 2,
        name: 'react',
        description: 'React相关讨论',
        logo: '/images/frontend.svg',
        displayMode: 'hot',
        posts: [
          {
            id: 3,
            title: 'React Hooks最佳实践',
            content: '内容...',
            author: '王五',
            createTime: '2023-05-12',
            viewCount: 150,
            replyCount: 20,
            lastReplyTime: '2023-05-19'
          }
        ]
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
        posts: [
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
      }
    ]
  }
])

// 当前分类所属的Section
const currentSection = computed(() => {
  return sections.value.find(section => 
    section.categories.some(cat => cat.name === categoryName.value)
  )
})

// 当前分类
const currentCategory = computed(() => {
  if (!currentSection.value) return null
  return currentSection.value.categories.find(cat => cat.name === categoryName.value)
})

// 标签相关
const availableTags = ref(['问题', '讨论', '分享', '教程', '求助'])
const selectedTags = ref<string[]>([])

const toggleTag = (tag: string) => {
  if (selectedTags.value.includes(tag)) {
    selectedTags.value = selectedTags.value.filter(t => t !== tag)
  } else {
    selectedTags.value.push(tag)
  }
}

// 排序和过滤
const sortBy = ref<'latest' | 'hot' | 'views'>('latest')
const filters = ref({
  onlyWithReplies: false,
  onlyNew: false
})

// 过滤后的帖子列表
const filteredPosts = computed(() => {
  if (!currentCategory.value) return []
  
  let posts = [...currentCategory.value.posts]
  
  // 应用过滤器
  if (filters.value.onlyWithReplies) {
    posts = posts.filter(post => post.replyCount > 0)
  }
  
  if (filters.value.onlyNew) {
    const now = new Date()
    const threeDaysAgo = new Date(now.setDate(now.getDate() - 3))
    posts = posts.filter(post => new Date(post.createTime) >= threeDaysAgo)
  }
  
  // 应用排序
  if (sortBy.value === 'latest') {
    posts.sort((a, b) => new Date(b.createTime).getTime() - new Date(a.createTime).getTime())
  } else if (sortBy.value === 'hot') {
    posts.sort((a, b) => b.replyCount - a.replyCount)
  } else if (sortBy.value === 'views') {
    posts.sort((a, b) => b.viewCount - a.viewCount)
  }
  
  return posts
})

// 跳转到帖子详情
const goToPost = (postId: number) => {
  router.push(`/post/${postId}`)
}

// 监听路由变化，确保在分类切换时更新数据
onMounted(() => {
  // 在实际项目中，这里可能需要根据categoryName从API获取数据
  console.log(`Loading category: ${categoryName.value}`)
})
</script>

<style lang="scss" scoped>
.category-detail {
  padding: 2rem;
  
  &__container {
    display: flex;
    gap: 2rem;
  }
  
  &__sidebar {
    flex: 0 0 250px;
  }
  
  &__content {
    flex: 1;
  }
}

.sidebar-section {
  background-color: #fff;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  
  .sidebar-title {
    font-size: 1.1rem;
    font-weight: bold;
    margin-bottom: 1rem;
    color: var(--primary-color, #4fc08d);
    border-bottom: 1px solid #eee;
    padding-bottom: 0.5rem;
  }
}

.categories-list {
  list-style: none;
  padding: 0;
  margin: 0;
  
  li {
    margin-bottom: 0.5rem;
    padding: 0.5rem;
    border-radius: 4px;
    
    &.active {
      background-color: rgba(79, 192, 141, 0.1);
      font-weight: bold;
    }
  }
  
  .category-link {
    display: flex;
    align-items: center;
    text-decoration: none;
    color: #333;
    
    &:hover {
      color: var(--primary-color, #4fc08d);
    }
    
    .category-icon {
      width: 20px;
      height: 20px;
      margin-right: 0.5rem;
    }
  }
}

.tags-container {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  
  .tag {
    padding: 0.3rem 0.8rem;
    background-color: #f0f0f0;
    border-radius: 16px;
    font-size: 0.9rem;
    cursor: pointer;
    transition: all 0.2s;
    
    &:hover {
      background-color: #e0e0e0;
    }
    
    &.active {
      background-color: var(--primary-color, #4fc08d);
      color: white;
    }
  }
}

.sort-options, .filter-options {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  
  .sort-option {
    padding: 0.5rem;
    cursor: pointer;
    border-radius: 4px;
    
    &:hover {
      background-color: #f0f0f0;
    }
    
    &.active {
      background-color: rgba(79, 192, 141, 0.1);
      font-weight: bold;
    }
  }
  
  .filter-option {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
    
    input[type="checkbox"] {
      accent-color: var(--primary-color, #4fc08d);
    }
  }
}

.category-header {
  background-color: #fff;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  .category-info {
    display: flex;
    align-items: center;
    gap: 1rem;
    
    .category-logo {
      width: 60px;
      height: 60px;
      object-fit: contain;
    }
    
    .category-name {
      font-size: 1.8rem;
      font-weight: bold;
      margin-bottom: 0.5rem;
      color: #333;
    }
    
    .category-description {
      color: #666;
      font-size: 0.9rem;
      margin: 0;
    }
  }
  
  .category-stats {
    .stat-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      
      .label {
        font-size: 0.9rem;
        color: #666;
      }
      
      .value {
        font-size: 1.5rem;
        font-weight: bold;
        color: var(--primary-color, #4fc08d);
      }
    }
  }
}

.posts-container {
  background-color: #fff;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  
  .post-item {
    padding: 1rem;
    border-bottom: 1px solid #eee;
    cursor: pointer;
    transition: background-color 0.2s;
    
    &:last-child {
      border-bottom: none;
    }
    
    &:hover {
      background-color: #f9f9f9;
    }
    
    .post-title {
      font-size: 1.1rem;
      font-weight: bold;
      margin-bottom: 0.5rem;
      color: #333;
    }
    
    .post-meta {
      display: flex;
      gap: 1rem;
      font-size: 0.9rem;
      color: #666;
      
      .post-author {
        font-weight: bold;
      }
    }
  }
  
  .no-posts {
    text-align: center;
    padding: 2rem;
    color: #999;
  }
}
</style>