<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'

const { t } = useI18n()
const route = useRoute()
const postId = route.params.id
</script>

<template>
  <div class="post">
    <h1>{{ t('common.post') }} #{{ postId }}</h1>
    <div class="post-content">
      <!-- Post content will be rendered here -->
    </div>
  </div>
</template>

<style lang="scss" scoped>
.post {
  padding: 2rem;

  h1 {
    color: var(--primary-color);
    margin-bottom: 2rem;
  }

  .post-content {
    max-width: 800px;
    margin: 0 auto;
    padding: 1rem;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
}
</style>