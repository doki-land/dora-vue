<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <div class="home">
    <h1>{{ t('common.home') }}</h1>
    <div class="content">
      <p>Welcome to Dora Vue!</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.home {
  padding: 2rem;
  
  h1 {
    color: var(--primary-color);
    margin-bottom: 2rem;
  }

  .content {
    max-width: 800px;
    margin: 0 auto;
  }
}
</style>