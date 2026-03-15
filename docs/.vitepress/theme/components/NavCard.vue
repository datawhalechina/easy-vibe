<script setup>
import { withBase } from 'vitepress'

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
  <a
    :href="withBase(href)"
    class="nav-card-link"
  >
    <div class="nav-card">
      <div class="card-top">
        <div class="card-header">
          <span
            v-if="icon"
            class="card-icon"
          >{{ icon }}</span>
          <span class="card-title">{{ title }}</span>
        </div>
        <span class="card-arrow">↗</span>
      </div>
      <div
        v-if="description"
        class="card-desc"
      >{{ description }}</div>
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
  border: 1px solid color-mix(in srgb, var(--vp-c-brand-1) 12%, var(--vp-c-divider));
  border-radius: 22px;
  padding: 20px 22px;
  transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
  background:
    radial-gradient(circle at 100% -10%, color-mix(in srgb, var(--vp-c-brand-1) 12%, transparent), transparent 45%),
    linear-gradient(165deg, color-mix(in srgb, var(--vp-c-brand-1) 6%, var(--vp-c-bg-soft)) 0%, var(--vp-c-bg-soft) 100%);
  height: 100%;
  min-height: 132px;
  backdrop-filter: blur(10px);
}

.nav-card:hover {
  border-color: var(--vp-c-brand);
  transform: translateY(-4px) scale(1.01);
  box-shadow: 0 18px 40px rgba(0, 113, 227, 0.14);
}

.dark .nav-card:hover {
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.34);
}

.card-top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
}

.card-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 10px;
}

.card-icon {
  font-size: 22px;
}

.card-title {
  font-weight: 600;
  color: var(--vp-c-text-1);
  font-size: 17px;
  line-height: 1.35;
  letter-spacing: -0.01em;
}

.card-arrow {
  color: var(--vp-c-brand-1);
  font-size: 15px;
  font-weight: 700;
  opacity: 0.8;
  transition: transform 0.25s ease, opacity 0.25s ease;
}

.nav-card:hover .card-arrow {
  transform: translate(2px, -2px);
  opacity: 1;
}

.card-desc {
  color: var(--vp-c-text-2);
  font-size: 14px;
  line-height: 1.68;
}
</style>
