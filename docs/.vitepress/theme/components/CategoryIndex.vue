<script setup>
import ArticleCard from './ArticleCard.vue'

defineProps({
  categories: {
    type: Array,
    required: true
  }
})
</script>

<template>
  <div class="category-index">
    <div
      v-for="(category, index) in categories"
      :key="index"
      class="category-section"
    >
      <h2 v-if="category.title" class="category-title">{{ category.title }}</h2>
      <p v-if="category.description" class="category-desc">
        {{ category.description }}
      </p>

      <div class="card-grid">
        <ArticleCard
          v-for="(item, i) in category.items"
          :key="i"
          v-bind="item"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.category-index {
  margin-top: 24px;
}

.category-section {
  margin-bottom: 48px;
}

.category-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 16px;
  border-bottom: none;
}

.category-desc {
  font-size: 1rem;
  color: var(--vp-c-text-2);
  margin-bottom: 24px;
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}
</style>
