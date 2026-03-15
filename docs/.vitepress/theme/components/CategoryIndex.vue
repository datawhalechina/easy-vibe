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
      <h2
        v-if="category.title"
        class="category-title"
      >
        {{ category.title }}
      </h2>
      <p
        v-if="category.description"
        class="category-desc"
      >
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
  margin-top: 28px;
}

.category-section {
  margin-bottom: 52px;
}

.category-title {
  font-size: 1.65rem;
  font-weight: 700;
  margin-bottom: 10px;
  border-bottom: none;
  letter-spacing: -0.02em;
}

.category-desc {
  font-size: 1rem;
  color: var(--vp-c-text-2);
  margin-bottom: 20px;
  line-height: 1.68;
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 18px;
}

@media (max-width: 768px) {
  .category-section {
    margin-bottom: 38px;
  }

  .category-title {
    font-size: 1.4rem;
  }

  .card-grid {
    grid-template-columns: 1fr;
    gap: 14px;
  }
}
</style>
