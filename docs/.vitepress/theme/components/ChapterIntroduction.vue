<script setup>
import { computed } from 'vue'

const props = defineProps({
  duration: {
    type: String,
    default: ''
  },
  expectedOutput: {
    type: String,
    default: ''
  },
  coreOutput: {
    type: String,
    default: ''
  },
  assignment: {
    type: String,
    default: ''
  },
  tags: {
    type: Array,
    default: () => []
  }
})

const hasMeta = computed(
  () =>
    props.duration ||
    props.expectedOutput ||
    props.coreOutput ||
    props.assignment
)
const hasTags = computed(() => props.tags && props.tags.length > 0)
</script>

<template>
  <div class="chapter-introduction">
    <!-- Learning Objective -->
    <div class="objective-section">
      <div class="objective-label">
        <span class="icon">🎯</span>
        <span class="title">本章学习目标</span>
      </div>
      <div class="content">
        <!-- If tags are provided, show tags list -->
        <div v-if="hasTags" class="tags-container">
          <span v-for="(tag, index) in tags" :key="index" class="objective-tag">
            {{ tag }}
          </span>
        </div>

        <!-- Slot content (full description) always rendered below tags if tags exist, or alone if not -->
        <div class="description-text" :class="{ 'has-tags': hasTags }">
          <slot></slot>
        </div>
      </div>
    </div>

    <!-- Metrics Grid -->
    <div v-if="hasMeta" class="metrics-grid">
      <!-- Duration Card -->
      <div v-if="duration" class="metric-card time-card">
        <div class="card-icon">⏱️</div>
        <div class="card-content">
          <div class="card-label">预计耗时</div>
          <div class="card-value" v-html="duration"></div>
        </div>
      </div>

      <!-- Output Card -->
      <div v-if="expectedOutput || coreOutput" class="metric-card output-card">
        <div class="card-icon">📦</div>
        <div class="card-content">
          <div class="card-label">预期产出</div>
          <div class="output-container">
            <div v-if="coreOutput" class="core-output">{{ coreOutput }}</div>
            <div
              v-if="expectedOutput"
              class="output-desc"
              v-html="expectedOutput"
            ></div>
          </div>
        </div>
      </div>

      <!-- Assignment Card -->
      <div v-if="assignment" class="metric-card task-card">
        <div class="card-icon">📝</div>
        <div class="card-content">
          <div class="card-label">课后任务</div>
          <div class="card-value" v-html="assignment"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.chapter-introduction {
  margin: 24px 0;
  border-radius: 16px;
  background-color: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
}

.objective-section {
  padding: 24px 28px;
  background: linear-gradient(
    to right,
    rgba(var(--vp-c-brand-rgb), 0.05),
    transparent
  );
  border-bottom: 1px dashed var(--vp-c-divider);
}

.objective-label {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  color: var(--vp-c-brand);
}

.icon {
  font-size: 1.4em;
  margin-right: 8px;
}

.title {
  font-size: 1em;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.content {
  font-size: 1.15em;
  line-height: 1.7;
  color: var(--vp-c-text-1);
  font-weight: 500;
}

/* Tags Styling */
.tags-container {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}
.description-text {
  font-size: 1.15em;
  line-height: 1.7;
  color: var(--vp-c-text-1);
}

.description-text.has-tags {
  margin-top: 16px;
  font-size: 1em;
  color: var(--vp-c-text-2);
  border-top: 1px solid var(--vp-c-divider);
  padding-top: 12px;
}

.objective-tag {
  display: inline-flex;
  align-items: center;
  padding: 6px 14px;
  background-color: var(--vp-c-bg-alt);
  border: 1px solid var(--vp-c-divider);
  border-radius: 99px;
  font-size: 1em;
  font-weight: 600;
  color: var(--vp-c-text-1);
  transition: all 0.2s;
}

.objective-tag:hover {
  border-color: var(--vp-c-brand);
  color: var(--vp-c-brand);
  background-color: var(--vp-c-bg-soft);
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

/* Metrics Grid */
.metrics-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 1px;
  background-color: var(--vp-c-divider);
  border-top: 1px solid var(--vp-c-divider);
}

.metric-card {
  flex: 1 1 240px;
  background-color: var(--vp-c-bg-soft);
  padding: 20px 24px;
  display: flex;
  align-items: flex-start;
  gap: 16px;
  transition: background-color 0.2s;
}

.metric-card:hover {
  background-color: var(--vp-c-bg-alt);
}

.card-icon {
  font-size: 1.7em;
  line-height: 1;
  padding-top: 2px;
}

.card-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.card-label {
  font-size: 0.85em;
  color: var(--vp-c-text-2);
  margin-bottom: 8px;
  font-weight: 600;
  text-transform: uppercase;
}

.card-value {
  font-size: 1em;
  line-height: 1.5;
  color: var(--vp-c-text-1);
}

.card-value :deep(strong) {
  display: inline-block;
  color: var(--vp-c-brand-dark);
  font-weight: 800;
  font-size: 1.15em;
  margin-top: 2px;
}

/* Output Container Styling */
.output-container {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.core-output {
  font-size: 1.3em;
  font-weight: 800;
  color: var(--vp-c-brand);
  line-height: 1.4;
  margin-bottom: 2px;
}

.output-desc {
  font-size: 0.93em;
  color: var(--vp-c-text-2);
  line-height: 1.4;
}

.output-desc :deep(strong) {
  color: var(--vp-c-text-1);
  font-weight: 600;
}

/* Mobile adjustments */
@media (max-width: 640px) {
  .metric-card {
    padding: 16px 20px;
    flex-basis: 100%;
  }

  .objective-section {
    padding: 20px;
  }
}
</style>
