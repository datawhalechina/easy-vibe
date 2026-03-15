<template>
  <div class="nav-grid">
    <slot />
  </div>
</template>

<style scoped>
.nav-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 18px;
  margin: 24px 0 28px;
}

@media (max-width: 768px) {
  .nav-grid {
    grid-template-columns: 1fr;
    gap: 14px;
    margin: 18px 0 24px;
  }
}
</style>
