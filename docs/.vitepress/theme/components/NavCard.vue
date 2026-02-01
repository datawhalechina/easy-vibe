<script setup>
defineProps({
  href: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  icon: {
    type: String,
    default: ''
  }
})
</script>

<template>
  <a :href="href" class="nav-card-link">
    <div class="nav-card">
      <div class="card-header">
        <span v-if="icon" class="card-icon">{{ icon }}</span>
        <span class="card-title">{{ title }}</span>
      </div>
      <div v-if="description" class="card-desc">{{ description }}</div>
    </div>
  </a>
</template>

<style scoped>
.nav-card-link {
  text-decoration: none !important;
  color: inherit !important;
  display: block;
}

.nav-card {
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 16px;
  transition: all 0.3s ease;
  background: var(--vp-c-bg-soft);
  height: 100%;
}

.nav-card:hover {
  border-color: var(--vp-c-brand);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.card-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}

.card-icon {
  font-size: 20px;
}

.card-title {
  font-weight: 600;
  color: var(--vp-c-brand);
  font-size: 14px;
}

.card-desc {
  color: var(--vp-c-text-2);
  font-size: 14px;
  line-height: 1.5;
}
</style>
