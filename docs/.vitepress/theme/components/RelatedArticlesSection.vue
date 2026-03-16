<script setup>
import NavCard from './NavCard.vue'

defineProps({
  title: {
    type: String,
    default: '继续阅读'
  },
  description: {
    type: String,
    default: ''
  },
  items: {
    type: Array,
    required: true
  }
})
</script>

<template>
  <section class="related-section">
    <div class="related-header">
      <h2 class="related-title">
        {{ title }}
      </h2>
      <p
        v-if="description"
        class="related-description"
      >
        {{ description }}
      </p>
    </div>
    <div class="related-grid">
      <NavCard
        v-for="(item, index) in items"
        :key="item.href || index"
        :href="item.href"
        :title="item.title"
        :description="item.description"
        :icon="item.icon"
      />
    </div>
  </section>
</template>

<style scoped>
.related-section {
  margin: 44px 0 10px;
  padding: 22px;
  border-radius: 28px;
  border: 1px solid rgba(0, 0, 0, 0.06);
  background: linear-gradient(180deg, rgba(0, 102, 204, 0.04) 0%, rgba(255, 255, 255, 0.98) 100%);
}

.dark .related-section {
  border-color: rgba(255, 255, 255, 0.1);
  background: linear-gradient(180deg, rgba(60, 160, 255, 0.1) 0%, var(--vp-c-bg-soft) 100%);
}

.related-header {
  margin-bottom: 14px;
}

.related-title {
  margin: 0;
  font-size: 1.25rem;
  line-height: 1.35;
  font-weight: 700;
  color: var(--vp-c-text-1);
}

.related-description {
  margin: 8px 0 0;
  font-size: 0.92rem;
  color: var(--vp-c-text-2);
  line-height: 1.65;
}

.related-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}

@media (max-width: 900px) {
  .related-section {
    margin-top: 36px;
    padding: 18px;
    border-radius: 22px;
  }

  .related-grid {
    grid-template-columns: 1fr;
    gap: 12px;
  }
}
</style>
