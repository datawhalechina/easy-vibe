<template>
  <div class="data-ui-gap-demo">
    <div class="two-panels">
      <div class="panel data-panel">
        <div class="panel-header">
          <span class="panel-badge data">数据（JavaScript 变量）</span>
        </div>
        <div class="data-display">
          <div class="data-row">
            <span class="data-key">商品数量</span>
            <span class="data-val">{{ dataCount }}</span>
          </div>
          <div class="data-row">
            <span class="data-key">总价</span>
            <span class="data-val">¥{{ dataCount * 99 }}</span>
          </div>
          <div class="data-row">
            <span class="data-key">状态</span>
            <span class="data-val">{{ dataCount > 5 ? '过多' : '正常' }}</span>
          </div>
        </div>
        <button class="action-btn" @click="addItem">添加商品（修改数据）</button>
      </div>

      <div class="gap-indicator" :class="{ desynced: isDesynced }">
        <div class="gap-line" />
        <span class="gap-label">{{ isDesynced ? '❌ 不同步' : '✅ 同步' }}</span>
        <div class="gap-line" />
      </div>

      <div class="panel ui-panel">
        <div class="panel-header">
          <span class="panel-badge ui">界面（用户看到的）</span>
        </div>
        <div class="ui-display">
          <div class="ui-row" :class="{ stale: uiCount !== dataCount }">
            <span class="ui-key">购物车</span>
            <span class="ui-val">{{ uiCount }} 件</span>
          </div>
          <div class="ui-row" :class="{ stale: uiCount !== dataCount }">
            <span class="ui-key">总价</span>
            <span class="ui-val">¥{{ uiCount * 99 }}</span>
          </div>
          <div class="ui-row" :class="{ stale: uiCount !== dataCount }">
            <span class="ui-key">状态</span>
            <span class="ui-val">{{ uiCount > 5 ? '过多' : '正常' }}</span>
          </div>
        </div>
        <button class="sync-btn" :disabled="!isDesynced" @click="syncUI">
          {{ isDesynced ? '手动同步界面' : '已同步' }}
        </button>
      </div>
    </div>

    <div class="controls-row">
      <button class="action-btn outline" @click="reset">重置</button>
      <span v-if="desyncCount > 0" class="desync-stat">
        累计不同步 {{ desyncCount }} 次
      </span>
    </div>

    <div class="info-box">
      <strong>核心问题：</strong>
      <span>在没有框架的情况下，数据变了，界面不会自动跟着变。你必须自己写代码去更新界面，一旦忘了，用户看到的就是过时的、错误的信息。</span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const dataCount = ref(0)
const uiCount = ref(0)
const desyncCount = ref(0)

const isDesynced = computed(() => dataCount.value !== uiCount.value)

function addItem() {
  dataCount.value++
  if (dataCount.value > 1 && isDesynced.value) {
    desyncCount.value++
  }
}

function syncUI() {
  uiCount.value = dataCount.value
}

function reset() {
  dataCount.value = 0
  uiCount.value = 0
  desyncCount.value = 0
}
</script>

<style scoped>
.data-ui-gap-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background-color: var(--vp-c-bg-soft);
  padding: 0.75rem;
  margin: 0.5rem 0;
}

.two-panels {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 0.75rem;
  align-items: start;
  margin-bottom: 0.75rem;
}

.panel {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 0.75rem;
}

.panel-header {
  text-align: center;
  margin-bottom: 0.75rem;
}

.panel-badge {
  display: inline-block;
  padding: 0.2rem 0.6rem;
  border-radius: 9999px;
  font-size: 0.72rem;
  font-weight: 600;
}

.panel-badge.data {
  background: rgba(59, 130, 246, 0.1);
  color: var(--vp-c-brand);
}

.panel-badge.ui {
  background: rgba(16, 185, 129, 0.1);
  color: var(--vp-c-green-1);
}

.data-display,
.ui-display {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  margin-bottom: 0.75rem;
}

.data-row,
.ui-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.35rem 0.5rem;
  background: var(--vp-c-bg-alt);
  border-radius: 4px;
  font-size: 0.82rem;
  border: 1px solid transparent;
  transition: all 0.3s;
}

.ui-row.stale {
  border-color: var(--vp-c-danger-1);
  background: rgba(239, 68, 68, 0.06);
}

.data-key,
.ui-key {
  color: var(--vp-c-text-2);
}

.data-val,
.ui-val {
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.gap-indicator {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.35rem;
  padding-top: 2.5rem;
}

.gap-line {
  width: 2px;
  height: 2rem;
  background: var(--vp-c-green-1);
  transition: background 0.3s;
}

.gap-indicator.desynced .gap-line {
  background: var(--vp-c-danger-1);
  animation: pulse-line 1s infinite;
}

@keyframes pulse-line {
  0%, 100% { opacity: 0.4; }
  50% { opacity: 1; }
}

.gap-label {
  font-size: 0.72rem;
  font-weight: 600;
  white-space: nowrap;
}

.action-btn {
  display: block;
  width: 100%;
  padding: 0.35rem 0.75rem;
  background: var(--vp-c-brand);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.82rem;
  transition: opacity 0.2s;
}

.action-btn:hover { opacity: 0.85; }

.action-btn.outline {
  background: transparent;
  border: 1px solid var(--vp-c-divider);
  color: var(--vp-c-text-1);
}

.action-btn.outline:hover {
  border-color: var(--vp-c-brand);
  color: var(--vp-c-brand);
}

.sync-btn {
  display: block;
  width: 100%;
  padding: 0.35rem 0.75rem;
  background: var(--vp-c-green-1);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.82rem;
  transition: opacity 0.2s;
}

.sync-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.controls-row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
}

.controls-row .action-btn {
  width: auto;
}

.desync-stat {
  font-size: 0.8rem;
  color: var(--vp-c-danger-1);
  font-weight: 600;
}

.info-box {
  background: var(--vp-c-bg-alt);
  padding: 0.75rem;
  border-radius: 6px;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  display: flex;
  gap: 0.25rem;
}

.info-box strong {
  white-space: nowrap;
  flex-shrink: 0;
  color: var(--vp-c-text-1);
}

@media (max-width: 720px) {
  .two-panels {
    grid-template-columns: 1fr;
  }
  .gap-indicator {
    flex-direction: row;
    padding-top: 0;
  }
  .gap-line {
    width: 2rem;
    height: 2px;
  }
}
</style>
