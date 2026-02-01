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
    <ArticleCard v-for="(item, i) in items" :key="i" v-bind="item" />
  </div>
</template>

<style scoped>
.article-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 24px;
  margin-bottom: 48px;
}
</style>
