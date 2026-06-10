<script setup>
import { provide, ref } from 'vue'

const activeTab = ref(0)
const tabs = ref([])

const registerTab = (label) => {
  const index = tabs.value.length
  tabs.value.push(label)
  return index
}

provide('tabsState', {
  activeTab,
  tabs,
  registerTab,
  setActiveTab: (index) => {
    activeTab.value = index
  }
})
</script>

<template>
  <div class="doc-tabs">
    <div class="doc-tab-list">
      <button
        v-for="(label, index) in tabs"
        :key="`${label}-${index}`"
        class="doc-tab-button"
        :class="{ active: activeTab === index }"
        type="button"
        @click="activeTab = index"
      >
        {{ label }}
      </button>
    </div>
    <slot />
  </div>
</template>

<style scoped>
.doc-tabs {
  margin: 20px 0;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  overflow: hidden;
  background: var(--vp-c-bg);
}

.doc-tab-list {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  padding: 8px;
  background: var(--vp-c-bg-soft);
  border-bottom: 1px solid var(--vp-c-divider);
}

.doc-tab-button {
  padding: 7px 10px;
  border: 1px solid transparent;
  border-radius: 6px;
  color: var(--vp-c-text-2);
  background: transparent;
  font: inherit;
  font-size: 0.9rem;
  cursor: pointer;
}

.doc-tab-button:hover,
.doc-tab-button.active {
  color: var(--vp-c-brand-1);
  border-color: var(--vp-c-brand-soft);
  background: var(--vp-c-bg);
}
</style>
