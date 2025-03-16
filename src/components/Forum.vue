<template>
  <div class="forum">
    <div class="forum__left">
      <img :src="forum.logo" :alt="forum.name" class="forum__logo"/>
      <div class="forum__info">
        <h3 class="forum__name">{{ forum.name }}</h3>
        <p class="forum__description">{{ forum.description }}</p>
      </div>
    </div>
    <div class="forum__right">
      <div class="forum__posts">
        <div
            v-for="post in displayPosts"
            :key="post.id"
            class="forum__post"
        >
          <div class="forum__post-title">{{ post.title }}</div>
          <div class="forum__post-meta">
            <span>{{ post.author }}</span>
            <span>{{ post.createTime }}</span>
            <span>浏览: {{ post.viewCount }}</span>
            <span>回复: {{ post.replyCount }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {computed} from 'vue'
import {Forum} from '@/types/forum'

const props = defineProps<{
  forum: Forum
}>()

const displayPosts = computed(() => {
  return props.forum.displayMode === 'latest'
      ? [...props.forum.posts].sort((a, b) => new Date(b.createTime).getTime() - new Date(a.createTime).getTime())
      : [...props.forum.posts].sort((a, b) => b.replyCount - a.replyCount)
})
</script>

<style lang="scss" scoped>
.forum {
  display: flex;
  gap: 2rem;
  padding: 1.5rem;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &__left {
    flex: 0 0 200px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }

  &__logo {
    width: 80px;
    height: 80px;
    object-fit: contain;
  }

  &__info {
    text-align: center;
  }

  &__name {
    font-size: 1.2rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
  }

  &__description {
    color: #666;
    font-size: 0.9rem;
  }

  &__right {
    flex: 1;
  }

  &__posts {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  &__post {
    padding: 0.5rem 0;
    border-bottom: 1px solid #eee;

    &:last-child {
      border-bottom: none;
    }
  }

  &__post-title {
    font-size: 1rem;
    margin-bottom: 0.5rem;
    color: #333;
  }

  &__post-meta {
    display: flex;
    gap: 1rem;
    font-size: 0.8rem;
    color: #999;
  }
}
</style>