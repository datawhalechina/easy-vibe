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
  <a :href="withBase(link)" class="article-card">
    <div class="card-content">
      <h3 class="title">{{ title }}</h3>
      <p class="description">{{ description }}</p>
      <div v-if="tags && tags.length" class="tags">
        <span v-for="tag in tags" :key="tag" class="tag">{{ tag }}</span>
      </div>
    </div>
    <div class="arrow">→</div>
  </a>
</template>

<style scoped>
.article-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 16px;
  text-decoration: none;
  transition: all 0.2s;
  height: 100%;
}

.article-card:hover {
  border-color: var(--vp-c-brand);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.card-content {
  flex: 1;
}

.title {
  margin: 0 0 8px;
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.description {
  margin: 0;
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  line-height: 1.5;
}

.tags {
  margin-top: 12px;
  display: flex;
  gap: 8px;
}

.tag {
  font-size: 0.75rem;
  padding: 2px 8px;
  border-radius: 4px;
  background-color: var(--vp-c-bg-mute);
  color: var(--vp-c-text-2);
}

.arrow {
  margin-left: 16px;
  font-size: 1.2rem;
  color: var(--vp-c-text-3);
  transition: transform 0.2s;
}

.article-card:hover .arrow {
  transform: translateX(4px);
  color: var(--vp-c-brand);
}
</style>
