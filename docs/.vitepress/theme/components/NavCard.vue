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
  outline: none;
  border-bottom: 0 !important;
}

.nav-card-link:focus,
.nav-card-link:focus-visible,
.nav-card-link:active {
  outline: none !important;
  box-shadow: none !important;
  text-decoration: none !important;
  border-bottom: 0 !important;
  border-bottom-color: transparent !important;
}

.nav-card-link:hover,
.nav-card-link:visited {
  text-decoration: none !important;
  border-bottom: 0 !important;
  border-bottom-color: transparent !important;
}

.nav-card-link:focus-visible .nav-card {
  border-color: #0066cc;
  box-shadow: 0 0 0 3px rgba(0, 102, 204, 0.18);
}

.nav-card {
  border: 1px solid rgba(0, 0, 0, 0.04);
  border-radius: 24px;
  padding: 20px 22px;
  transition: all 0.3s cubic-bezier(0.25, 0.1, 0.25, 1);
  background: #fff;
  height: 100%;
  min-height: 124px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  position: relative;
  overflow: hidden;
}

.nav-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.08);
  border-color: rgba(0, 0, 0, 0.08);
}

.dark .nav-card {
  border-color: rgba(255, 255, 255, 0.08);
  background: var(--vp-c-bg-mute);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
}

.dark .nav-card:hover {
  border-color: rgba(255, 255, 255, 0.14);
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.34);
}

.card-top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
}

.card-header {
  display: flex;
  align-items: flex-start;
  gap: 8px;
}

.card-icon {
  font-size: 22px;
}

.card-title {
  font-weight: 700;
  color: var(--vp-c-text-1);
  font-size: 17px;
  line-height: 1.35;
  letter-spacing: -0.01em;
}

.card-arrow {
  color: #0066cc;
  font-size: 16px;
  font-weight: 600;
  opacity: 0.9;
  transition: transform 0.25s ease, opacity 0.25s ease;
  margin-top: 2px;
}

.nav-card:hover .card-arrow {
  transform: translate(2px, -2px);
  opacity: 1;
}

.card-desc {
  color: var(--vp-c-text-2);
  font-size: 14px;
  line-height: 1.6;
  margin-top: 10px;
}

@media (max-width: 768px) {
  .nav-card {
    border-radius: 18px;
    padding: 16px 18px;
    min-height: 108px;
  }

  .card-title {
    font-size: 16px;
  }

  .card-desc {
    font-size: 13px;
  }
}
</style>
