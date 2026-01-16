<template>
  <div class="storage-demo">
    <div class="panel">
      <div class="comparison">
        <div class="mode-selector">
          <button @click="mode = 'full'" :class="{active: mode === 'full'}" class="mode-btn">完整备份</button>
          <button @click="mode = 'git'" :class="{active: mode === 'git'}" class="mode-btn">Git 增量</button>
        </div>

        <div class="visualization">
          <div class="bar-container">
            <div class="bar full" :style="{height: fullSize + '%'}">
              <span class="label">完整备份: {{ fullSize }}MB</span>
            </div>
            <div class="bar git" :style="{height: gitSize + '%'}">
              <span class="label">Git 存储: {{ gitSize }}MB</span>
            </div>
          </div>
        </div>

        <div class="stats">
          <div class="stat-item">
            <span class="value">{{ savedPercent }}%</span>
            <span class="label">节省空间</span>
          </div>
          <div class="stat-item">
            <span class="value">{{ versionCount }}</span>
            <span class="label">版本数</span>
          </div>
        </div>
      </div>
    </div>

    <div class="info-box">
      <p><strong>💡 Git 增量存储:</strong> 只保存变更部分，大幅节省空间</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const mode = ref('git')
const versionCount = ref(5)
const fullSize = ref(500)
const gitSize = ref(50)

const savedPercent = computed(() => Math.round((1 - gitSize.value / fullSize.value) * 100))
</script>

<style scoped>
.storage-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background-color: var(--vp-c-bg-soft);
  padding: 1.5rem;
  margin: 1rem 0;
}

.mode-selector {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.mode-btn {
  padding: 0.5rem 1rem;
  border: 2px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  border-radius: 6px;
  cursor: pointer;
}

.mode-btn.active {
  border-color: var(--vp-c-brand);
  color: var(--vp-c-brand);
}

.bar-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 1.5rem 0;
}

.bar {
  height: 60px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  padding: 0 1rem;
  color: white;
  font-weight: 600;
  transition: height 0.5s ease;
}

.bar.full { background: linear-gradient(135deg, #ef4444, #dc2626); }
.bar.git { background: linear-gradient(135deg, #10b981, #059669); }

.stats {
  display: flex;
  gap: 2rem;
  margin-top: 1.5rem;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stat-item .value {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--vp-c-brand);
}

.stat-item .label {
  font-size: 0.875rem;
  color: var(--vp-c-text-2);
}

.info-box {
  padding: 1rem;
  background: var(--vp-c-bg);
  border-left: 4px solid var(--vp-c-brand);
  border-radius: 4px;
  margin-top: 1rem;
}

.info-box p {
  margin: 0;
  color: var(--vp-c-text-1);
  line-height: 1.6;
}
</style>
