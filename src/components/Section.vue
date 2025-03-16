<template>
  <div class="section">
    <div class="section__header">
      <div class="section__header-content">
        <h2 class="section__title">{{ section.name }}</h2>
        <p class="section__description">{{ section.description }}</p>
      </div>
    </div>
    <div class="section__categories">
      <Category
          v-for="category in section.categories"
          :key="category.id"
          :category="category"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import {defineProps} from 'vue'
import {Section} from '@/types/forum'
import Category from './Category.vue'

defineProps<{
  section: Section
}>()
</script>

<style lang="scss" scoped>
.section {
  margin-bottom: 2rem;
  background-color: #f8f9fa;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

  &__header {
    background-color: #fff;
    padding: 1.5rem;
    position: relative;
    border-bottom: 1px solid #eee;

    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: 4px;
      background: var(--primary-color, #4fc08d);
    }
  }

  &__header-content {
    margin-left: 1rem;
  }

  &__title {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
    color: #333;
  }

  &__description {
    color: #666;
    margin-bottom: 0;
    font-size: 0.9rem;
  }

  &__categories {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1.5rem;
  }
}
</style>