<template>
  <div class="home">
    <div class="content">
      <Section
          v-for="section in sections"
          :key="section.id"
          :section="section"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import Section from '@/components/Section.vue'
import { sections } from '@/mock/sections'
</script>


<style lang="scss" scoped>
.home {
  padding: 2rem;

  h1 {
    color: var(--primary-color);
    margin-bottom: 2rem;
  }

  .content {
    max-width: 1200px;
    margin: 0 auto;
  }
}
</style>