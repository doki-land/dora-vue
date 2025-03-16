<template>
  <DoraLayout>
    <template #header>
      <h1 class="header">Dora Demo Header</h1>
    </template>

    <template #sidebar>
      <nav class="sidebar">
        <router-link to="/">Home</router-link>
      </nav>
    </template>

    <router-view />
  </DoraLayout>
</template>

<script setup lang="ts">
import { DoraLayout } from '@doki-land/dora'
</script>

<style>
.header {
  background: #f0f0f0;
  padding: 20px;
}

.sidebar {
  width: 200px;
  background: #e8e8e8;
  padding: 20px;
}
</style>