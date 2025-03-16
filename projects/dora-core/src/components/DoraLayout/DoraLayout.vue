<template>
  <div class="dora-layout-container">
    <slot name="header" />
    <div class="main-content">
      <slot name="sidebar" />
      <slot />
    </div>
  </div>
</template>

<style scoped>
.dora-layout-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.main-content {
  flex: 1;
  display: flex;
}
</style>