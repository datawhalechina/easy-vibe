<script setup>
import { ref } from 'vue'

const basicStep = ref(0)
const basicA = ref(10)
const basicB = ref(null)

const refStep = ref(0)
const objData = ref({ age: 25 })

const basicCopy = () => { basicB.value = basicA.value; basicStep.value = 1 }
const basicModify = () => { basicB.value = 20; basicStep.value = 2 }
const basicReset = () => { basicStep.value = 0; basicB.value = null }

const refCopy = () => { refStep.value = 1 }
const refModify = () => { objData.value.age = 30; refStep.value = 2 }
const refSpread = () => { refStep.value = 3 }
const refReset = () => { refStep.value = 0; objData.value.age = 25 }
</script>

<template>
  <div class="reference-demo">
    <div class="demo-title">
      🔄 值 vs 引用
    </div>
    
    <div class="compare-grid">
      <!-- 左侧：基本类型 -->
      <div class="compare-box">
        <div class="box-header blue">
          基本类型（复制值）
        </div>
        
        <div class="memory-area">
          <div class="vars-row">
            <div
              class="var-item"
              :class="{ active: basicStep >= 0 }"
            >
              <span class="var-label">a</span>
              <span class="var-val">{{ basicA }}</span>
            </div>
            <div
              class="var-item"
              :class="{ active: basicStep >= 1, changed: basicStep >= 2 }"
            >
              <span class="var-label">b</span>
              <span class="var-val">{{ basicB ?? '?' }}</span>
            </div>
          </div>
          <div
            v-if="basicStep >= 1"
            class="copy-arrow"
          >
            ↓ 复制值
          </div>
        </div>
        
        <div
          class="result-text"
          :class="basicStep === 2 ? 'success' : 'info'"
        >
          {{ basicStep === 0 ? '点击复制' : basicStep === 1 ? 'b 得到 10' : '✅ 修改 b 不影响 a' }}
        </div>
        
        <div class="btn-group">
          <button
            :disabled="basicStep >= 1"
            @click="basicCopy"
          >
            复制
          </button>
          <button
            :disabled="basicStep !== 1"
            @click="basicModify"
          >
            改 b
          </button>
          <button
            class="reset"
            @click="basicReset"
          >
            重置
          </button>
        </div>
      </div>
      
      <!-- 右侧：引用类型 -->
      <div class="compare-box">
        <div class="box-header orange">
          引用类型（复制地址）
        </div>
        
        <div class="memory-area">
          <div class="vars-row">
            <div
              class="var-item"
              :class="{ active: refStep >= 0 }"
            >
              <span class="var-label">obj1</span>
              <span class="var-addr">0x001</span>
            </div>
            <div
              class="var-item"
              :class="{ active: refStep >= 1 }"
            >
              <span class="var-label">obj2</span>
              <span class="var-addr">{{ refStep >= 1 ? '0x001' : '?' }}</span>
            </div>
          </div>
          <div
            class="data-box"
            :class="{ changed: refStep === 2, copied: refStep === 3 }"
          >
            <div class="data-addr">
              0x001
            </div>
            <div class="data-content">
              { age: {{ objData.age }} }
            </div>
          </div>
          <div
            v-if="refStep >= 1"
            class="copy-arrow"
          >
            指向同一地址
          </div>
        </div>
        
        <div
          class="result-text"
          :class="refStep === 2 ? 'warning' : refStep === 3 ? 'success' : 'info'"
        >
          {{ refStep === 0 ? '点击复制' : refStep === 1 ? '共享地址' : refStep === 2 ? '⚠️ 一改全变' : '✅ 已分离' }}
        </div>
        
        <div class="btn-group">
          <button
            :disabled="refStep >= 1"
            @click="refCopy"
          >
            复制
          </button>
          <button
            :disabled="refStep !== 1"
            @click="refModify"
          >
            修改
          </button>
          <button
            :disabled="refStep !== 2"
            @click="refSpread"
          >
            展开
          </button>
          <button
            class="reset"
            @click="refReset"
          >
            重置
          </button>
        </div>
      </div>
    </div>
    
    <div class="code-compare">
      <div class="code-col">
        <div class="code-title">
          基本类型
        </div>
        <pre><code>let a = 10
let b = a  // b=10
b = 20     // a还是10</code></pre>
      </div>
      <div class="code-col">
        <div class="code-title">
          引用类型
        </div>
        <pre><code>let obj1 = {age:25}
let obj2 = obj1
obj2.age=30 // obj1也变了！
// 用 {...obj1} 复制</code></pre>
      </div>
    </div>
  </div>
</template>

<style scoped>
.reference-demo {
  border: 1px solid var(--vp-c-border);
  border-radius: 12px;
  padding: 20px;
  margin: 16px 0;
  background: var(--vp-c-bg);
}

.demo-title {
  font-size: 16px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 16px;
}

.compare-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 16px;
}

@media (max-width: 768px) {
  .compare-grid {
    grid-template-columns: 1fr;
  }
}

.compare-box {
  border: 1px solid var(--vp-c-border);
  border-radius: 10px;
  padding: 16px;
  background: var(--vp-c-bg-soft);
}

.box-header {
  font-size: 13px;
  font-weight: 600;
  padding: 6px 10px;
  border-radius: 6px;
  margin-bottom: 12px;
  color: white;
}

.box-header.blue {
  background: #3b82f6;
}

.box-header.orange {
  background: #f59e0b;
}

.memory-area {
  background: var(--vp-c-bg);
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 12px;
}

.vars-row {
  display: flex;
  gap: 12px;
  justify-content: center;
  margin-bottom: 8px;
}

.var-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px 16px;
  border: 2px solid var(--vp-c-border);
  border-radius: 6px;
  opacity: 0.4;
  transition: all 0.3s;
}

.var-item.active {
  opacity: 1;
  border-color: #3b82f6;
}

.var-item.changed {
  border-color: #10b981;
  background: #ecfdf5;
}

.var-label {
  font-size: 11px;
  color: var(--vp-c-text-2);
}

.var-val, .var-addr {
  font-size: 18px;
  font-weight: 600;
  font-family: monospace;
  color: #3b82f6;
}

.var-addr {
  color: #8b5cf6;
  font-size: 14px;
}

.copy-arrow {
  text-align: center;
  font-size: 11px;
  color: var(--vp-c-text-2);
  padding: 4px;
}

.data-box {
  border: 2px solid #8b5cf6;
  border-radius: 6px;
  padding: 8px;
  text-align: center;
  background: #f3e8ff;
  margin-top: 8px;
}

.data-box.changed {
  border-color: #ef4444;
  background: #fee2e2;
}

.data-box.copied {
  border-color: #10b981;
  background: #d1fae5;
}

.data-addr {
  font-size: 10px;
  color: #6b7280;
}

.data-content {
  font-family: monospace;
  font-size: 13px;
  color: #374151;
}

.result-text {
  text-align: center;
  padding: 8px;
  border-radius: 6px;
  font-size: 12px;
  margin-bottom: 12px;
}

.result-text.info {
  background: #f3f4f6;
  color: #4b5563;
}

.result-text.success {
  background: #d1fae5;
  color: #065f46;
}

.result-text.warning {
  background: #fee2e2;
  color: #991b1b;
}

.btn-group {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  justify-content: center;
}

.btn-group button {
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
  background: #3b82f6;
  color: white;
}

.btn-group button:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.btn-group button.reset {
  background: var(--vp-c-bg-alt);
  color: var(--vp-c-text-1);
  border: 1px solid var(--vp-c-border);
}

.code-compare {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.code-col {
  background: #1e1e1e;
  border-radius: 8px;
  padding: 12px;
}

.code-title {
  color: #9ca3af;
  font-size: 11px;
  margin-bottom: 8px;
}

.code-col pre {
  margin: 0;
}

.code-col code {
  font-family: monospace;
  font-size: 11px;
  line-height: 1.5;
  color: #d4d4d4;
}
</style>
