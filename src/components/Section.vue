<template>
  <div class="section">
    <h2 class="section__title">{{ section.name }}</h2>
    <p class="section__description">{{ section.description }}</p>
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
import { defineProps } from 'vue'
import { Section } from '@/types/forum'
import Category from './Category.vue'

defineProps<{
  section: Section
}>()
</script>

<style lang="scss" scoped>
.section {
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

  &__categories {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
}
</style>