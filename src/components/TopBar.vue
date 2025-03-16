<template>
  <div class="topbar">
    <div class="topbar__left">
      <router-link to="/" class="topbar__logo">
        <img :src="logoSvg" alt="Logo" class="topbar__logo-img" />
        <span class="topbar__logo-text">Dora Forum</span>
      </router-link>
    </div>

    <nav class="topbar__nav">
      <router-link
        v-for="item in navItems"
        :key="item.path"
        :to="item.path"
        class="topbar__nav-item"
        active-class="topbar__nav-item--active"
      >
        {{ item.name }}
      </router-link>
    </nav>

    <div class="topbar__right">
      <button class="topbar__button">
        <i class="fas fa-search"></i>
      </button>
      <button class="topbar__button">
        <i class="fas fa-bell"></i>
      </button>
      <div class="topbar__user">
        <img :src="avatarSvg" alt="User Avatar" class="topbar__user-avatar" />
        <span class="topbar__user-name">用户名</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import logoSvg from '@/assets/icons/logo.svg'
import avatarSvg from '@/assets/icons/avatar.svg'

const { t } = useI18n()

const navItems = [
  { name: t('nav.home'), path: '/' },
  { name: t('nav.forum'), path: '/forum' },
  { name: t('nav.tags'), path: '/tags' },
  { name: t('nav.about'), path: '/about' },
]
</script>

<style lang="scss" scoped>
.topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: $spacing-md $spacing-lg;
  background-color: $bg-color;
  box-shadow: $box-shadow-light;
  position: sticky;
  top: 0;
  z-index: 100;

  &__left {
    display: flex;
    align-items: center;
  }

  &__logo {
    display: flex;
    align-items: center;
    gap: $spacing-sm;
    text-decoration: none;
    color: $text-color;

    &-img {
      height: 32px;
      width: auto;
    }

    &-text {
      font-size: $font-size-lg;
      font-weight: bold;
    }
  }

  &__nav {
    display: flex;
    gap: $spacing-lg;

    &-item {
      text-decoration: none;
      color: $text-color;
      font-size: $font-size-base;
      padding: $spacing-xs $spacing-sm;
      border-radius: $border-radius-base;
      transition: all $transition-duration $transition-timing-function;

      &:hover {
        color: $primary-color;
        background-color: rgba($primary-color, 0.1);
      }

      &--active {
        color: $primary-color;
        background-color: rgba($primary-color, 0.1);
      }
    }
  }

  &__right {
    display: flex;
    align-items: center;
    gap: $spacing-md;
  }

  &__button {
    background: none;
    border: none;
    padding: $spacing-xs;
    cursor: pointer;
    color: $text-color-secondary;
    border-radius: $border-radius-base;
    transition: all $transition-duration $transition-timing-function;

    &:hover {
      color: $primary-color;
      background-color: rgba($primary-color, 0.1);
    }
  }

  &__user {
    display: flex;
    align-items: center;
    gap: $spacing-sm;
    cursor: pointer;
    padding: $spacing-xs $spacing-sm;
    border-radius: $border-radius-base;
    transition: all $transition-duration $transition-timing-function;

    &:hover {
      background-color: $bg-color-light;
    }

    &-avatar {
      width: 32px;
      height: 32px;
      border-radius: 50%;
    }

    &-name {
      font-size: $font-size-base;
      color: $text-color;
    }
  }
}
</style>