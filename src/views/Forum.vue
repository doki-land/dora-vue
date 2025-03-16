<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <div class="forum">
    <h1>{{ t('forum.title') }}</h1>
    <p class="description">{{ t('forum.description') }}</p>
    
    <div class="forum-stats">
      <div class="stat-item">
        <span class="label">{{ t('forum.posts') }}</span>
        <span class="value">0</span>
      </div>
      <div class="stat-item">
        <span class="label">{{ t('forum.members') }}</span>
        <span class="value">0</span>
      </div>
    </div>

    <div class="action-bar">
      <button class="create-post-btn">{{ t('forum.createPost') }}</button>
    </div>

    <div class="forum-sections">
      <section class="latest-posts">
        <h2>{{ t('forum.latestPosts') }}</h2>
        <div class="posts-list">
          <!-- Posts will be rendered here -->
        </div>
      </section>

      <section class="hot-topics">
        <h2>{{ t('forum.hotTopics') }}</h2>
        <div class="topics-list">
          <!-- Hot topics will be rendered here -->
        </div>
      </section>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.forum {
  padding: 2rem;

  h1 {
    color: var(--primary-color);
    margin-bottom: 1rem;
  }

  .description {
    color: #666;
    margin-bottom: 2rem;
  }

  .forum-stats {
    display: flex;
    gap: 2rem;
    margin-bottom: 2rem;

    .stat-item {
      display: flex;
      flex-direction: column;
      align-items: center;

      .label {
        font-size: 0.9rem;
        color: #666;
      }

      .value {
        font-size: 1.5rem;
        font-weight: bold;
        color: var(--primary-color);
      }
    }
  }

  .action-bar {
    margin-bottom: 2rem;

    .create-post-btn {
      padding: 0.5rem 1rem;
      background-color: var(--primary-color);
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;

      &:hover {
        opacity: 0.9;
      }
    }
  }

  .forum-sections {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 2rem;

    section {
      h2 {
        color: var(--primary-color);
        margin-bottom: 1rem;
        font-size: 1.2rem;
      }
    }
  }
}
</style>