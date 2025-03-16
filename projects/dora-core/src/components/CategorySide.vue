<template>
  <div class="category-detail__sidebar">
    <!-- 分类列表 -->
    <div class="sidebar-section categories-section">
      <h3 class="sidebar-title">{{ $t('category.categories') }}</h3>
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
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useFluent } from 'fluent-vue'
import { sections } from '@/mock/categories'

const { $t } = useFluent()
const route = useRoute()
const categoryName = computed(() => route.params.name as string)

// 当前分类所属的Section
const currentSection = computed(() => {
  return sections.find(section => 
    section.categories.some(cat => cat.name === categoryName.value)
  )
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
const sortBy = ref('latest')
const filters = ref({
  onlyWithReplies: false,
  onlyNew: false
})

defineExpose({
  selectedTags,
  sortBy,
  filters
})
</script>

<style lang="scss" scoped>
.category-detail__sidebar {
  flex: 0 0 220px;
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
    color: var(--primary-color);
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
      color: var(--primary-color);
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
      background-color: var(--primary-color);
      color: #fff;
    }
  }
}

.sort-options {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  
  .sort-option {
    padding: 0.4rem 0.8rem;
    border-radius: 3px;
    cursor: pointer;
    transition: all 0.2s;
    font-size: 0.9rem;
    
    &:hover {
      background-color: #f0f0f0;
    }
    
    &.active {
      background-color: rgba(24, 144, 255, 0.1);
      color: var(--primary-color);
    }
  }
}

.filter-options {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  
  .filter-option {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.9rem;
    cursor: pointer;
    
    input[type="checkbox"] {
      margin: 0;
    }
  }
}
</style>