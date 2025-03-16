<template>
  <div class="app">
    <TopBar/>
    <header class="app-header"/>

    <main class="app-main">
      <router-view/>
    </main>
  </div>
</template>

<script setup lang="ts">
import TopBar from './components/TopBar.vue'
</script>


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