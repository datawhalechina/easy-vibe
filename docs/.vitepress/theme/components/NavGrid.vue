<template>
  <div class="nav-grid">
    <slot />
  </div>
</template>

<style scoped>
.nav-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px;
  margin: 20px 0 26px;
}

@media (min-width: 1400px) {
  .nav-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@media (max-width: 900px) {
  .nav-grid {
    grid-template-columns: 1fr;
    gap: 12px;
    margin: 16px 0 22px;
  }
}
</style>
