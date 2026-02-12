<script setup>
const props = defineProps({
  title: {
    type: String,
    default: '本幕小结'
  },
  sections: {
    type: Array,
    default: () => []
  },
  outputs: {
    type: Array,
    default: () => []
  }
})
</script>

<template>
  <div class="summary-card">
    <div class="summary-header">
      <div class="header-icon">📚</div>
      <div class="header-content">
        <div class="summary-title">{{ title }}</div>
      </div>
    </div>

    <div class="summary-body">
      <!-- Sections -->
      <div v-if="sections.length > 0" class="sections-container">
        <div v-for="(section, index) in sections" :key="index" class="section-item">
          <div class="section-header">
            <span class="section-number">{{ section.number }}</span>
            <span class="section-title">{{ section.title }}</span>
          </div>
          <ul class="section-list">
            <li v-for="(item, itemIndex) in section.items" :key="itemIndex" class="list-item">
              <span class="item-marker">•</span>
              <span class="item-content" v-html="item"></span>
            </li>
          </ul>
        </div>
      </div>

      <!-- Outputs -->
      <div v-if="outputs.length > 0" class="outputs-section">
        <div class="outputs-header">
          <span class="outputs-icon">📦</span>
          <span class="outputs-title">本幕输出：</span>
        </div>
        <ul class="outputs-list">
          <li v-for="(output, index) in outputs" :key="index" class="output-item">
            <span class="output-marker">✓</span>
            <span class="output-content" v-html="output"></span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.summary-card {
  margin: 16px 0;
  border-radius: 10px;
  background: linear-gradient(
    135deg,
    rgba(var(--vp-c-brand-rgb), 0.015) 0%,
    rgba(var(--vp-c-brand-rgb), 0.04) 100%
  );
  border: 1px solid var(--vp-c-divider);
  overflow: hidden;
  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.03);
}

.summary-header {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 14px;
  background: linear-gradient(
    to right,
    rgba(var(--vp-c-brand-rgb), 0.04),
    transparent
  );
  border-bottom: 1px solid var(--vp-c-divider);
}

.header-icon {
  font-size: 1.2em;
  filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.08));
}

.header-content {
  flex: 1;
}

.summary-title {
  font-size: 0.9em;
  font-weight: 700;
  color: var(--vp-c-brand);
  letter-spacing: 0.2px;
}

.summary-body {
  padding: 12px 14px;
}

/* Sections */
.sections-container {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.section-item {
  background-color: var(--vp-c-bg-soft);
  border-radius: 8px;
  padding: 10px 12px;
  border: 1px solid var(--vp-c-divider);
  transition: all 0.15s ease;
}

.section-item:hover {
  border-color: var(--vp-c-brand-light);
  box-shadow: 0 1px 4px rgba(var(--vp-c-brand-rgb), 0.04);
}

.section-header {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 6px;
}

.section-number {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 20px;
  height: 20px;
  padding: 0 5px;
  background: linear-gradient(135deg, var(--vp-c-brand), var(--vp-c-brand-dark));
  color: white;
  border-radius: 4px;
  font-size: 0.75em;
  font-weight: 700;
  box-shadow: 0 1px 3px rgba(var(--vp-c-brand-rgb), 0.2);
}

.section-title {
  font-size: 0.85em;
  font-weight: 700;
  color: var(--vp-c-text-1);
}

.section-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.list-item {
  display: flex;
  align-items: baseline;
  gap: 4px;
  padding: 2px 0;
  line-height: 1.4;
}

.item-marker {
  color: var(--vp-c-brand);
  font-weight: 700;
  font-size: 0.9em;
  line-height: 1;
  flex-shrink: 0;
}

.item-content {
  color: var(--vp-c-text-1);
  font-size: 0.85em;
  line-height: 1.4;
}

.item-content :deep(strong) {
  color: var(--vp-c-brand-dark);
  font-weight: 700;
}

/* Outputs */
.outputs-section {
  margin-top: 12px;
  padding-top: 10px;
  border-top: 1px dashed var(--vp-c-divider);
}

.outputs-header {
  display: flex;
  align-items: center;
  gap: 5px;
  margin-bottom: 6px;
}

.outputs-icon {
  font-size: 1em;
}

.outputs-title {
  font-size: 0.85em;
  font-weight: 700;
  color: var(--vp-c-text-1);
}

.outputs-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.output-item {
  display: flex;
  align-items: baseline;
  gap: 4px;
  padding: 2px 0;
  line-height: 1.4;
}

.output-marker {
  color: #42d392;
  font-weight: 700;
  font-size: 0.9em;
  line-height: 1;
  flex-shrink: 0;
}

.output-content {
  color: var(--vp-c-text-1);
  font-size: 0.85em;
  line-height: 1.4;
}

.output-content :deep(strong) {
  color: var(--vp-c-brand-dark);
  font-weight: 700;
}

/* Responsive */
@media (max-width: 640px) {
  .summary-card {
    margin: 14px 0;
  }

  .summary-header {
    padding: 8px 12px;
  }

  .summary-body {
    padding: 10px 12px;
  }

  .section-item {
    padding: 8px 10px;
  }

  .section-title {
    font-size: 0.8em;
  }

  .item-content,
  .output-content {
    font-size: 0.8em;
  }
}
</style>