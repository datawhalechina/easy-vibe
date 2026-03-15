<script setup>
import ArticleCard from './ArticleCard.vue'

defineProps({
  items: {
    type: Array,
    required: true
  }
})
</script>

<template>
  <div class="article-grid">
    <ArticleCard
      v-for="(item, i) in items"
      :key="i"
      v-bind="item"
    />
  </div>
</template>

<style scoped>
.article-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 18px;
  margin-top: 24px;
  margin-bottom: 48px;
}

@media (max-width: 768px) {
  .article-grid {
    grid-template-columns: 1fr;
    gap: 14px;
    margin-top: 18px;
    margin-bottom: 28px;
  }
}
</style>
