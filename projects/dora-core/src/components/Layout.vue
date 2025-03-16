<template>
  <div class="dora-layout">
    <header v-if="showHeader" class="dora-layout__header">
      <slot name="header">
        <TopBar />
      </slot>
    </header>
    
    <div class="dora-layout__container">
      <aside v-if="showSidebar" class="dora-layout__sidebar">
        <slot name="sidebar"></slot>
      </aside>
      
      <main class="dora-layout__content">
        <slot></slot>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { withDefaults } from 'vue'
import { DoraLayoutProps } from '../types/components'
import TopBar from './TopBar.vue'

const props = withDefaults(defineProps<DoraLayoutProps>(), {
  showHeader: true,
  showSidebar: true
})
</script>

<style lang="scss" scoped>
.dora-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  
  &__header {
    width: 100%;
  }
  
  &__container {
    display: flex;
    flex: 1;
  }
  
  &__sidebar {
    width: 250px;
    background-color: #f5f5f5;
  }
  
  &__content {
    flex: 1;
    padding: 20px;
  }
}
</style>