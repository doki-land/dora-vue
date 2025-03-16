<template>
  <div class="category-detail">
    <div class="category-detail__container">
      <CategorySide
        ref="categorySide"
      />

      <!-- 右侧内容区 -->
      <div class="category-detail__content">
        <!-- 分类头部信息 -->
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
          <!-- 帖子列表头部 -->
          <div class="posts-header">
            <div class="posts-header-left">{{ $t('category.topic') }}</div>
            <div class="posts-header-right">
              <div class="header-item">{{ $t('category.replies') }}</div>
              <div class="header-item">{{ $t('category.views') }}</div>
              <div class="header-item">{{ $t('category.activity') }}</div>
            </div>
          </div>
          
          <!-- 帖子列表内容 -->
          <div 
            v-for="post in filteredPosts" 
            :key="post.id"
            class="post-item"
            @click="goToPost(post.id)"
          >
            <div class="post-main">
              <div class="post-title">{{ post.title }}</div>
              <div class="post-meta">
                <span class="post-author">{{ post.author }}</span>
                <span class="post-time">{{ post.createTime }}</span>
              </div>
            </div>
            <div class="post-stats">
              <div class="stat-count">{{ post.replyCount }}</div>
              <div class="stat-count">{{ post.viewCount }}</div>
              <div class="stat-date">{{ formatDate(post.lastReplyTime) }}</div>
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
import {ref, computed, onMounted} from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useFluent } from "fluent-vue"
import CategorySide from '@/components/CategorySide.vue'
import { sections } from '@/mock/categories'
import {Section} from "@/types/forum.ts";

const { $t } = useFluent()
const route = useRoute()
const router = useRouter()
const categoryName = computed(() => route.params.name as string)
const categorySide = ref<InstanceType<typeof CategorySide>>()

// 格式化日期显示
const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  const now = new Date()
  const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24))
  
  if (diffDays < 1) {
    return '今天'
  } else if (diffDays < 30) {
    return `${diffDays}d`
  } else if (diffDays < 365) {
    const months = Math.floor(diffDays / 30)
    return `${months}m`
  } else {
    return date.toLocaleDateString()
  }
}

const ThisSections = ref<Section[]>(sections)

// 当前分类所属的Section
const currentSection = computed(() => {
  return ThisSections.value.find(section =>
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
  padding: 1.5rem;
  background-color: #f5f7fa;
  min-height: calc(100vh - 60px);
  
  &__container {
    display: flex;
    gap: 1.5rem;
    max-width: 1200px;
    margin: 0 auto;
  }
  
  &__sidebar {
    flex: 0 0 220px;
  }
  
  &__content {
    flex: 1;
  }
}

.sidebar-section {
  background-color: #fff;
  border-radius: 4px;
  padding: 1rem;
  margin-bottom: 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  
  .sidebar-title {
    font-size: 0.9rem;
    font-weight: 600;
    margin-bottom: 0.8rem;
    color: $primary-color;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
}

.categories-section {
  .sidebar-title {
    color: #333;
    border-bottom: 1px solid #eee;
    padding-bottom: 0.5rem;
    margin-bottom: 1rem;
  }
}

.categories-list {
  list-style: none;
  padding: 0;
  margin: 0;
  
  li {
    margin-bottom: 0.3rem;
    padding: 0.4rem 0.5rem;
    border-radius: 3px;
    
    &.active {
      background-color: rgba(24, 144, 255, 0.1);
      font-weight: 500;
    }
  }
  
  .category-link {
    display: flex;
    align-items: center;
    text-decoration: none;
    color: #333;
    font-size: 0.9rem;
    
    &:hover {
      color: $primary-color;
    }
    
    .category-icon {
      width: 16px;
      height: 16px;
      margin-right: 0.5rem;
    }
  }
}

.tags-container {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  
  .tag {
    padding: 0.25rem 0.6rem;
    background-color: #f0f0f0;
    border-radius: 3px;
    font-size: 0.8rem;
    cursor: pointer;
    transition: all 0.2s;
    
    &:hover {
      background-color: #e0e0e0;
    }
    
    &.active {
      background-color: $primary-color;
      color: white;
    }
  }
}

.sort-options, .filter-options {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  
  .sort-option {
    padding: 0.4rem 0.5rem;
    cursor: pointer;
    border-radius: 3px;
    font-size: 0.85rem;
    
    &:hover {
      background-color: #f5f5f5;
    }
    
    &.active {
      background-color: rgba(24, 144, 255, 0.1);
      font-weight: 500;
      color: $primary-color;
    }
  }
  
  .filter-option {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
    font-size: 0.85rem;
    padding: 0.3rem 0;
    
    input[type="checkbox"] {
      accent-color: $primary-color;
    }
  }
}

.category-header {
  background-color: #fff;
  border-radius: 4px;
  padding: 1.2rem;
  margin-bottom: 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  .category-info {
    display: flex;
    align-items: center;
    gap: 1rem;
    
    .category-logo {
      width: 48px;
      height: 48px;
      object-fit: contain;
    }
    
    .category-name {
      font-size: 1.5rem;
      font-weight: 600;
      margin-bottom: 0.3rem;
      color: #333;
    }
    
    .category-description {
      color: #666;
      font-size: 0.85rem;
      margin: 0;
    }
  }
  
  .category-stats {
    .stat-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      
      .label {
        font-size: 0.8rem;
        color: #666;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }
      
      .value {
        font-size: 1.3rem;
        font-weight: 600;
        color: $primary-color;
      }
    }
  }
}

.posts-container {
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  
  .posts-header {
    display: flex;
    justify-content: space-between;
    padding: 0.8rem 1.2rem;
    background-color: #f5f7fa;
    border-bottom: 1px solid #e8e8e8;
    font-size: 0.85rem;
    font-weight: 600;
    color: #666;
    
    .posts-header-left {
      flex: 1;
    }
    
    .posts-header-right {
      display: flex;
      gap: 2rem;
      
      .header-item {
        width: 80px;
        text-align: center;
      }
    }
  }
  
  .post-item {
    display: flex;
    justify-content: space-between;
    padding: 1rem 1.2rem;
    border-bottom: 1px solid #e8e8e8;
    cursor: pointer;
    transition: background-color 0.2s;
    
    &:last-child {
      border-bottom: none;
    }
    
    &:hover {
      background-color: #f9f9f9;
    }
    
    .post-main {
      flex: 1;
      
      .post-title {
        font-size: 1rem;
        font-weight: 500;
        margin-bottom: 0.4rem;
        color: $primary-color;
      }
      
      .post-meta {
        display: flex;
        gap: 1rem;
        font-size: 0.8rem;
        color: #999;
        
        .post-author {
          font-weight: 500;
        }
      }
    }
    
    .post-stats {
      display: flex;
      gap: 2rem;
      align-items: center;
      
      .stat-count {
        width: 80px;
        text-align: center;
        font-size: 0.9rem;
        color: #666;
      }
      
      .stat-date {
        width: 80px;
        text-align: center;
        font-size: 0.85rem;
        color: $primary-color;
      }
    }
  }
  
  .no-posts {
    text-align: center;
    padding: 2rem;
    color: #999;
    font-size: 0.9rem;
  }
}
</style>