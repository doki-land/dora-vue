<template>
  <div class="forum-group">
    <h2 class="forum-group__title">{{ group.name }}</h2>
    <p class="forum-group__description">{{ group.description }}</p>
    <div class="forum-group__forums">
      <Forum
          v-for="forum in group.forums"
          :key="forum.id"
          :forum="forum"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import {defineProps} from 'vue'
import {ForumGroup} from '@/types/forum'
import Forum from './Forum.vue'

defineProps<{
  group: ForumGroup
}>()
</script>

<style lang="scss" scoped>
.forum-group {
  margin-bottom: 2rem;

  &__title {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
  }

  &__description {
    color: #666;
    margin-bottom: 1rem;
  }

  &__forums {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
}
</style>