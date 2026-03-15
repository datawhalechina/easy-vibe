<script setup>
import { withBase } from 'vitepress'

defineProps({
  title: String,
  description: String,
  link: String,
  tags: Array
})
</script>

<template>
  <a
    :href="withBase(link)"
    class="article-card"
  >
    <div class="card-content">
      <h3 class="title">{{ title }}</h3>
      <p class="description">{{ description }}</p>
      <div
        v-if="tags && tags.length"
        class="tags"
      >
        <span
          v-for="tag in tags"
          :key="tag"
          class="tag"
        >{{ tag }}</span>
      </div>
    </div>
    <div class="arrow">→</div>
  </a>
</template>

<style scoped>
.article-card {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  background:
    radial-gradient(circle at 100% -10%, color-mix(in srgb, var(--vp-c-brand-1) 10%, transparent), transparent 42%),
    linear-gradient(160deg, color-mix(in srgb, var(--vp-c-brand-1) 6%, var(--vp-c-bg-soft)) 0%, var(--vp-c-bg-soft) 100%);
  border: 1px solid color-mix(in srgb, var(--vp-c-brand-1) 10%, var(--vp-c-divider));
  border-radius: 20px;
  padding: 18px 20px;
  text-decoration: none;
  transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
  height: 100%;
  backdrop-filter: blur(8px);
}

.article-card:hover {
  border-color: var(--vp-c-brand);
  transform: translateY(-4px) scale(1.01);
  box-shadow: 0 18px 40px rgba(0, 113, 227, 0.12);
}

.dark .article-card:hover {
  box-shadow: 0 18px 36px rgba(0, 0, 0, 0.32);
}

.card-content {
  flex: 1;
}

.title {
  margin: 0 0 10px;
  font-size: 1.08rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  line-height: 1.4;
  letter-spacing: -0.01em;
}

.description {
  margin: 0;
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  line-height: 1.65;
}

.tags {
  margin-top: 14px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tag {
  font-size: 0.75rem;
  padding: 4px 10px;
  border-radius: 999px;
  background-color: color-mix(in srgb, var(--vp-c-brand-1) 10%, var(--vp-c-bg-mute));
  color: var(--vp-c-text-2);
}

.arrow {
  margin-left: 16px;
  margin-top: 2px;
  font-size: 1rem;
  color: var(--vp-c-text-3);
  transition: transform 0.2s;
  line-height: 1;
  font-weight: 700;
}

.article-card:hover .arrow {
  transform: translateX(4px);
  color: var(--vp-c-brand);
}
</style>
