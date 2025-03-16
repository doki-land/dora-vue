<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <div class="app">
    <header class="app-header">
      <nav class="nav">
        <router-link to="/" class="nav-item">{{ t('common.home') }}</router-link>
        <router-link to="/forum" class="nav-item">{{ t('common.forum') }}</router-link>
      </nav>
    </header>

    <main class="app-main">
      <router-view />
    </main>
  </div>
</template>

<style lang="scss" scoped>
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.app-header {
  padding: 1rem;
  background-color: var(--primary-color);
  color: white;
}

.nav {
  display: flex;
  gap: 1rem;
}

.nav-item {
  color: white;
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
}

.app-main {
  flex: 1;
  padding: 1rem;
}
</style>