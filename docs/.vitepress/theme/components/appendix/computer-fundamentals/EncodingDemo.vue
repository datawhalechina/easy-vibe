<template>
  <div class="encoding-demo">
    <div class="demo-header">
      <span class="icon">🔢</span>
      <span class="title">数字编码：用 0 和 1 表示一切</span>
      <span class="subtitle">字符、数字、图像如何变成二进制</span>
    </div>

    <div class="demo-content">
      <div class="encoding-tabs">
        <button 
          v-for="tab in tabs" 
          :key="tab.name"
          :class="['tab-btn', { active: activeTab === tab.name }]"
          @click="activeTab = tab.name"
        >
          {{ tab.label }}
        </button>
      </div>

      <div class="encoding-area">
        <div class="input-section">
          <label>输入内容：</label>
          <input 
            v-model="inputValue" 
            class="input-field"
            :placeholder="currentTab.placeholder"
          >
        </div>

        <div class="output-section">
          <div class="output-label">
            编码结果：
          </div>
          <div class="output-box">
            <code>{{ encodedResult }}</code>
          </div>
          <div
            v-if="currentTab.name === 'text'"
            class="output-info"
          >
            <span>字符数: {{ inputValue.length }}</span>
            <span>字节数: {{ byteCount }}</span>
          </div>
        </div>

        <div
          v-if="currentTab.name === 'text' && inputValue"
          class="encoding-table"
        >
          <div class="table-title">
            字符编码详情
          </div>
          <div class="char-list">
            <div 
              v-for="(char, i) in inputValue.slice(0, 10)" 
              :key="i"
              class="char-item"
            >
              <span class="char-display">{{ char }}</span>
              <span class="char-unicode">U+{{ char.charCodeAt(0).toString(16).toUpperCase().padStart(4, '0') }}</span>
              <span class="char-binary">{{ char.charCodeAt(0).toString(2).padStart(8, '0') }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="info-box">
      <span class="icon">💡</span>
      <strong>核心思想：</strong>所有数据最终都要变成 0 和 1。不同类型的数据用不同的编码规则：字符用 ASCII/Unicode，数字用二进制，图像用像素值。
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const activeTab = ref('text')
const inputValue = ref('Hello')

const tabs = [
  { name: 'text', label: '文本编码' },
  { name: 'number', label: '数字编码' },
  { name: 'color', label: '颜色编码' }
]

const currentTab = computed(() => {
  const tab = tabs.find(t => t.name === activeTab.value)
  return {
    ...tab,
    placeholder: tab.name === 'text' ? '输入文字...' : 
                 tab.name === 'number' ? '输入数字...' : '输入颜色值(如 #FF5733)'
  }
})

const encodedResult = computed(() => {
  if (!inputValue.value) return ''
  
  switch (activeTab.value) {
    case 'text':
      return Array.from(inputValue.value)
        .map(c => c.charCodeAt(0).toString(2).padStart(8, '0'))
        .join(' ')
    case 'number':
      const num = parseInt(inputValue.value)
      if (isNaN(num)) return '请输入有效数字'
      return num.toString(2)
    case 'color':
      const hex = inputValue.value.replace('#', '')
      if (!/^[0-9A-Fa-f]{6}$/.test(hex)) return '请输入有效的颜色值(如 #FF5733)'
      const r = parseInt(hex.slice(0, 2), 16)
      const g = parseInt(hex.slice(2, 4), 16)
      const b = parseInt(hex.slice(4, 6), 16)
      return `R: ${r.toString(2).padStart(8, '0')} G: ${g.toString(2).padStart(8, '0')} B: ${b.toString(2).padStart(8, '0')}`
    default:
      return ''
  }
})

const byteCount = computed(() => {
  return new Blob([inputValue.value]).size
})
</script>

<style scoped>
.encoding-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  padding: 1rem;
  margin: 1rem 0;
}

.demo-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.demo-header .icon { font-size: 1.25rem; }
.demo-header .title { font-weight: bold; font-size: 1rem; }
.demo-header .subtitle { color: var(--vp-c-text-2); font-size: 0.85rem; margin-left: 0.5rem; }

.encoding-tabs {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.tab-btn {
  padding: 0.4rem 0.8rem;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.85rem;
}

.tab-btn.active {
  background: var(--vp-c-brand);
  color: white;
  border-color: var(--vp-c-brand);
}

.encoding-area {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.input-section {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.input-section label {
  font-size: 0.85rem;
  font-weight: bold;
}

.input-field {
  padding: 0.5rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  background: var(--vp-c-bg);
  font-size: 1rem;
}

.output-section {
  background: var(--vp-c-bg);
  padding: 0.75rem;
  border-radius: 6px;
}

.output-label {
  font-size: 0.85rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.output-box {
  background: var(--vp-c-bg-alt);
  padding: 0.5rem;
  border-radius: 4px;
  font-family: monospace;
  font-size: 0.85rem;
  word-break: break-all;
}

.output-info {
  display: flex;
  gap: 1rem;
  margin-top: 0.5rem;
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
}

.encoding-table {
  background: var(--vp-c-bg-alt);
  padding: 0.75rem;
  border-radius: 6px;
}

.table-title {
  font-size: 0.85rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.char-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.char-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.5rem;
  background: var(--vp-c-bg);
  border-radius: 4px;
  min-width: 80px;
}

.char-display {
  font-size: 1.2rem;
  font-weight: bold;
}

.char-unicode {
  font-size: 0.7rem;
  color: var(--vp-c-brand);
}

.char-binary {
  font-size: 0.65rem;
  font-family: monospace;
  color: var(--vp-c-text-2);
}

.info-box {
  background: var(--vp-c-bg-alt);
  padding: 0.75rem;
  border-radius: 6px;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  margin-top: 0.75rem;
  display: flex;
  gap: 0.25rem;
}

.info-box .icon { flex-shrink: 0; }
</style>
