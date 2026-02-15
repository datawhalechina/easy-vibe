<script setup>
import { ref } from 'vue'

// 基本类型
const basicA = ref(10)
const basicB = ref(null)
const basicStep = ref(0)
const basicMessage = ref('')

// 引用类型
const obj1Data = ref({ name: '张三', age: 25 })
const obj2Exists = ref(false)
const obj2Age = ref('')
const refMessage = ref('')

const basicCopy = () => {
  basicB.value = basicA.value
  basicStep.value = 1
  basicMessage.value = '✅ 基本类型复制的是值本身'
}

const basicModify = () => {
  if (basicB.value === null) {
    basicMessage.value = '⚠️ 请先复制'
    return
  }
  basicB.value = 20
  basicMessage.value = '✅ 修改 b 不影响 a'
}

const refCopy = () => {
  obj2Exists.value = true
  obj2Age.value = obj1Data.value.age
  refMessage.value = '⚠️ 两个变量指向同一份数据'
}

const refModify = () => {
  if (!obj2Exists.value) {
    refMessage.value = '⚠️ 请先复制'
    return
  }
  obj1Data.value.age = 30
  obj2Age.value = 30
  refMessage.value = '❌ 两个变量指向同一份数据，改了一个另一个也变了！'
}

const refSpreadCopy = () => {
  obj2Exists.value = true
  obj2Age.value = 25
  refMessage.value = '✅ 用展开运算符创建真正的副本，现在互不影响'
}
</script>

<template>
  <div class="reference-demo">
    <h3>值 vs 引用</h3>

    <div class="demo-container">
      <!-- 左侧：基本类型 -->
      <div class="demo-section basic-section">
        <h4>基本类型（复制值）</h4>

        <div class="visualization">
          <div class="box" :class="{ 'active': basicA !== null }">
            <div class="box-label">a</div>
            <div class="box-value">{{ basicA }}</div>
          </div>

          <div class="arrow" v-if="basicStep >= 1">
            <div class="arrow-line"></div>
            <div class="arrow-head">→</div>
          </div>

          <div class="box" :class="{ 'active': basicB !== null }" v-if="basicStep >= 1">
            <div class="box-label">b</div>
            <div class="box-value">{{ basicB }}</div>
          </div>
        </div>

        <div class="message" v-if="basicMessage">{{ basicMessage }}</div>

        <div class="controls">
          <button @click="basicCopy" class="btn-primary">let b = a（复制）</button>
          <button @click="basicModify" class="btn-secondary">b = 20</button>
        </div>
      </div>

      <!-- 右侧：引用类型 -->
      <div class="demo-section reference-section">
        <h4>引用类型（复制地址）</h4>

        <div class="visualization">
          <!-- 数据区 -->
          <div class="data-area">
            <div class="data-label">数据区</div>
            <div class="data-content">
              <div>{{ `{ name: "${obj1Data.name}", age: ${obj1Data.age} }` }}</div>
            </div>
          </div>

          <div class="pointers">
            <div class="pointer">
              <div class="pointer-label">obj1</div>
              <div class="arrow-line-down"></div>
            </div>

            <div class="pointer" v-if="obj2Exists">
              <div class="pointer-label">obj2</div>
              <div class="arrow-line-down"></div>
            </div>
          </div>
        </div>

        <div class="message" v-if="refMessage">{{ refMessage }}</div>

        <div class="controls">
          <button @click="refCopy" class="btn-primary">let obj2 = obj1（复制）</button>
          <button @click="refModify" class="btn-danger">obj2.age = 30</button>
          <button @click="refSpreadCopy" class="btn-success">用展开运算符创建副本</button>
        </div>
      </div>
    </div>

    <div class="code-display">
      <h4>代码</h4>
      <pre><code>// 基本类型
let a = {{ basicA }}
{{ basicB !== null ? `let b = ${basicB}` : '' }}
{{ basicB !== null ? `b = ${basicB}` : '' }}
console.log(a)  // {{ basicA }}

// 引用类型
let obj1 = { name: "{{ obj1Data.name }}", age: {{ obj1Data.age }} }
{{ obj2Exists ? 'let obj2 = obj1  // 指向同一份数据' : '' }}
{{ obj2Exists ? `obj2.age = ${obj1Data.age}` : '' }}
console.log(obj1.age)  // {{ obj1Data.age }}
</code></pre>
    </div>
  </div>
</template>

<style scoped>
.reference-demo {
  border: 1px solid var(--vp-c-border);
  border-radius: 12px;
  padding: 24px;
  margin: 24px 0;
  background: var(--vp-c-bg);
}

h3 {
  margin: 0 0 20px 0;
  font-size: 18px;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

h4 {
  margin: 0 0 16px 0;
  font-size: 14px;
  font-weight: 600;
  color: var(--vp-c-text-2);
}

.demo-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin-bottom: 24px;
}

@media (max-width: 768px) {
  .demo-container {
    grid-template-columns: 1fr;
  }
}

.demo-section {
  border: 1px dashed var(--vp-c-border);
  border-radius: 8px;
  padding: 20px;
  background: var(--vp-c-bg-soft);
}

.visualization {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  margin-bottom: 16px;
  min-height: 120px;
}

.box {
  width: 80px;
  height: 80px;
  border: 2px solid var(--vp-c-border);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: var(--vp-c-bg);
  transition: all 0.3s ease;
}

.box.active {
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 0 0 3px rgba(62, 175, 124, 0.1);
}

.box-label {
  font-size: 12px;
  font-weight: 600;
  color: var(--vp-c-text-2);
  margin-bottom: 4px;
}

.box-value {
  font-size: 24px;
  font-weight: 600;
  font-family: 'Courier New', monospace;
  color: var(--vp-c-brand-1);
}

.arrow {
  display: flex;
  align-items: center;
  gap: 4px;
}

.arrow-line {
  width: 40px;
  height: 2px;
  background: var(--vp-c-brand-1);
}

.arrow-head {
  font-size: 24px;
  color: var(--vp-c-brand-1);
}

.data-area {
  text-align: center;
}

.data-label {
  font-size: 12px;
  font-weight: 600;
  color: var(--vp-c-text-2);
  margin-bottom: 8px;
}

.data-content {
  border: 2px solid var(--vp-c-brand-1);
  border-radius: 8px;
  padding: 12px;
  background: var(--vp-c-bg);
  font-family: 'Courier New', monospace;
  font-size: 12px;
  color: var(--vp-c-text-1);
}

.pointers {
  display: flex;
  gap: 24px;
  margin-top: 12px;
}

.pointer {
  text-align: center;
}

.pointer-label {
  font-size: 12px;
  font-weight: 600;
  color: var(--vp-c-text-2);
  margin-bottom: 4px;
}

.arrow-line-down {
  width: 2px;
  height: 30px;
  background: var(--vp-c-brand-1);
  margin: 0 auto;
}

.message {
  text-align: center;
  padding: 8px;
  border-radius: 6px;
  margin-bottom: 12px;
  font-size: 13px;
  font-weight: 500;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
}

.controls {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

button {
  padding: 6px 12px;
  border: none;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

button:active {
  transform: scale(0.95);
}

.btn-primary {
  background: var(--vp-c-brand-1);
  color: white;
}

.btn-primary:hover {
  background: var(--vp-c-brand-2);
}

.btn-secondary {
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
}

.btn-secondary:hover {
  background: var(--vp-c-bg-soft-hover);
}

.btn-danger {
  background: #f56565;
  color: white;
}

.btn-danger:hover {
  background: #e53e3e;
}

.btn-success {
  background: #38a169;
  color: white;
}

.btn-success:hover {
  background: #2f855a;
}

.code-display {
  background: #1e1e1e;
  border-radius: 8px;
  padding: 16px;
  overflow-x: auto;
}

.code-display h4 {
  color: #d4d4d4;
  margin-bottom: 12px;
}

.code-display pre {
  margin: 0;
}

.code-display code {
  font-family: 'Courier New', monospace;
  font-size: 13px;
  line-height: 1.6;
  color: #d4d4d4;
}
</style>
