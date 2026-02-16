<template>
  <div class="data-type-demo">
    <div class="demo-header">
      <span class="icon">🏷️</span>
      <span class="title">JavaScript 数据类型</span>
      <span class="subtitle">原始类型 vs 引用类型</span>
    </div>

    <div class="intro-text">
      想象你在外面<span class="highlight">租了个储物柜</span>：
      <span class="highlight">原始类型</span>像是把东西直接拿回家（复制一份）；
      <span class="highlight">引用类型</span>像是只拿了张写着地址的小纸条（共享同一个位置）
    </div>

    <div class="type-tabs">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        @click="activeTab = tab.id"
        class="tab-btn"
        :class="{ active: activeTab === tab.id }"
      >
        {{ tab.label }}
      </button>
    </div>

    <div class="content-area">
      <!-- 原始类型 -->
      <div v-if="activeTab === 'primitive'" class="primitive-types">
        <div class="type-grid">
          <div
            v-for="type in primitiveTypes"
            :key="type.name"
            class="type-card"
            @click="selectedType = type"
            :class="{ selected: selectedType?.name === type.name }"
          >
            <div class="type-icon">{{ type.icon }}</div>
            <div class="type-name">{{ type.name }}</div>
            <div class="type-example">{{ type.example }}</div>
          </div>
        </div>

        <div v-if="selectedType" class="type-detail">
          <div class="detail-title">📝 {{ selectedType.name }} 详细说明</div>
          <div class="detail-desc">{{ selectedType.description }}</div>
          <div class="detail-note">
            <strong>💡 关键特性：</strong>{{ selectedType.note }}
          </div>
        </div>
      </div>

      <!-- 引用类型 -->
      <div v-else-if="activeTab === 'reference'" class="reference-types">
        <div class="comparison-box">
          <div class="compare-side">
            <div class="side-title">原始类型赋值</div>
            <div class="code-example">
              <div class="code-line">let a = 10</div>
              <div class="code-line">let b = a</div>
              <div class="code-line">b = 20</div>
              <div class="code-line result">// a = 10 (不变)</div>
            </div>
            <div class="visual-box">
              <div class="value-box">a = 10</div>
              <div class="arrow">复制</div>
              <div class="value-box">b = 20</div>
            </div>
          </div>

          <div class="compare-side">
            <div class="side-title">引用类型赋值</div>
            <div class="code-example">
              <div class="code-line">let obj1 = {x: 10}</div>
              <div class="code-line">let obj2 = obj1</div>
              <div class="code-line">obj2.x = 20</div>
              <div class="code-line result">// obj1.x = 20 (变了!)</div>
            </div>
            <div class="visual-box ref-visual">
              <div class="ref-boxes">
                <div class="ref-var-box">
                  <div class="ref-var-name">obj1</div>
                  <div class="ref-var-arrow">→</div>
                </div>
                <div class="ref-var-box">
                  <div class="ref-var-name">obj2</div>
                  <div class="ref-var-arrow">→</div>
                </div>
              </div>
              <div class="arrow down-arrow">指向同一位置</div>
              <div class="memory-box">{x: 20}</div>
            </div>
          </div>
        </div>

        <div class="ref-types-list">
          <div class="ref-type-item" v-for="type in referenceTypes" :key="type.name">
            <div class="ref-icon">{{ type.icon }}</div>
            <div class="ref-info">
              <div class="ref-name">{{ type.name }}</div>
              <div class="ref-desc">{{ type.description }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 类型转换 -->
      <div v-else class="type-conversion">
        <div class="conversion-playground">
          <div class="input-section">
            <label>输入一个值：</label>
            <input v-model="inputValue" type="text" placeholder="试试输入 '123' 或 'hello'" @keyup.enter="convertType" />
            <button @click="convertType" class="convert-btn">转换</button>
          </div>

          <div class="results-section">
            <div class="result-row">
              <span class="result-label">String():</span>
              <span class="result-value">{{ conversionResults.string }}</span>
            </div>
            <div class="result-row">
              <span class="result-label">Number():</span>
              <span class="result-value" :class="{ error: conversionResults.number === 'NaN' }">
                {{ conversionResults.number }}
              </span>
            </div>
            <div class="result-row">
              <span class="result-label">Boolean():</span>
              <span class="result-value">{{ conversionResults.boolean }}</span>
            </div>
          </div>

          <div class="falsy-values">
            <div class="falsy-title">⚠️ 转成 false 的值（falsy values）：</div>
            <div class="falsy-list">
              <span v-for="val in falsyValues" :key="val" class="falsy-item">{{ val }}</span>
            </div>
            <div class="falsy-note">其他所有值（包括空数组 []、空对象 {}）都转成 true</div>
          </div>
        </div>
      </div>
    </div>

    <div class="info-box">
      <span class="icon">💡</span>
      <strong>核心思想：</strong>
      <span v-if="activeTab === 'primitive'">原始类型存储实际的值，赋值时复制值。它们是不可变的，修改后创建新值。</span>
      <span v-else-if="activeTab === 'reference'">引用类型存储的是内存地址的引用，赋值时复制引用。多个变量可以指向同一个对象，修改其中一个会影响所有引用。</span>
      <span v-else>类型转换是 JS 中常见的 bug 来源。理解 falsy values 和隐式转换规则能避免很多问题。使用 === 而不是 == 来避免自动类型转换。</span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const activeTab = ref('primitive')
const selectedType = ref(null)
const inputValue = ref('')
const conversionResults = ref({
  string: '-',
  number: '-',
  boolean: '-'
})

const tabs = [
  { id: 'primitive', label: '原始类型' },
  { id: 'reference', label: '引用类型' },
  { id: 'conversion', label: '类型转换' }
]

const primitiveTypes = [
  {
    name: 'Number',
    icon: '🔢',
    example: '42, 3.14, NaN',
    description: '数字类型，包括整数和小数。NaN 表示"不是数字"。',
    note: '所有数字都是浮点数，没有整数类型。特殊值：Infinity、-Infinity、NaN'
  },
  {
    name: 'String',
    icon: '📝',
    example: '"hello", \'你好\'',
    description: '字符串类型，用单引号或双引号包裹的文本。',
    note: '字符串是不可变的，任何操作都会返回新的字符串。'
  },
  {
    name: 'Boolean',
    icon: '✅',
    example: 'true, false',
    description: '布尔类型，只有两个值：真或假。',
    note: '常用于条件判断和逻辑运算。'
  },
  {
    name: 'Undefined',
    icon: '❓',
    example: 'let x; // x 是 undefined',
    description: '变量已声明但未赋值时的默认值。',
    note: '表示"缺少值"。主动赋值 undefined 没有意义。'
  },
  {
    name: 'Null',
    icon: '🕳️',
    example: 'let x = null;',
    description: '表示"空值"或"无对象"。',
    note: 'typeof null === "object" 是 JS 的历史 bug。'
  },
  {
    name: 'Symbol',
    icon: '🔑',
    example: 'Symbol("id")',
    description: 'ES6 新增，表示独一无二的值。',
    note: '常用于对象属性的键，防止属性名冲突。'
  },
  {
    name: 'BigInt',
    icon: '🔢',
    example: '9007199254740991n',
    description: 'ES2020 新增，表示任意大的整数。',
    note: '数字后面加 n。用于处理超大整数。'
  }
]

const referenceTypes = [
  {
    name: 'Object',
    icon: '📦',
    description: '键值对集合，最常用的引用类型。数组、函数也是对象。'
  },
  {
    name: 'Array',
    icon: '📚',
    description: '有序的数据集合，实际上是特殊的对象。'
  },
  {
    name: 'Function',
    icon: '⚙️',
    description: '可执行的代码块，也是对象，可以赋值给变量。'
  },
  {
    name: 'Date',
    icon: '📅',
    description: '日期和时间对象。'
  },
  {
    name: 'RegExp',
    icon: '🔍',
    description: '正则表达式对象，用于模式匹配。'
  }
]

const falsyValues = ['false', '0', '""', 'null', 'undefined', 'NaN']

const convertType = () => {
  const val = inputValue.value
  conversionResults.value = {
    string: String(val),
    number: Number(val).toString(),
    boolean: Boolean(val).toString()
  }
}
</script>

<style scoped>
.data-type-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  padding: 1rem;
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

.intro-text {
  font-size: 0.9rem;
  line-height: 1.6;
  margin-bottom: 1rem;
  color: var(--vp-c-text-1);
}

.highlight {
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand);
  padding: 0.1rem 0.3rem;
  border-radius: 4px;
  font-weight: 500;
}

.type-tabs {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
  border-bottom: 1px solid var(--vp-c-divider);
  padding-bottom: 0.5rem;
}

.tab-btn {
  background: transparent;
  border: none;
  padding: 0.5rem 1rem;
  cursor: pointer;
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
  border-radius: 6px;
  transition: all 0.2s;
}

.tab-btn:hover {
  background: var(--vp-c-bg-soft);
}

.tab-btn.active {
  background: var(--vp-c-brand);
  color: white;
}

.content-area {
  min-height: 350px;
}

.type-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.type-card {
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 0.75rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s;
}

.type-card:hover {
  border-color: var(--vp-c-brand);
  transform: translateY(-2px);
}

.type-card.selected {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-brand-soft);
}

.type-icon {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.type-name {
  font-weight: 600;
  margin-bottom: 0.25rem;
  color: var(--vp-c-text-1);
}

.type-example {
  font-size: 0.75rem;
  color: var(--vp-c-text-3);
  font-family: monospace;
}

.type-detail {
  background: var(--vp-c-bg-alt);
  border-radius: 6px;
  padding: 0.75rem;
  margin-top: 1rem;
}

.detail-title {
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: var(--vp-c-text-1);
}

.detail-desc {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.5rem;
  line-height: 1.5;
}

.detail-note {
  font-size: 0.85rem;
  color: var(--vp-c-brand);
  background: var(--vp-c-brand-soft);
  padding: 0.5rem;
  border-radius: 4px;
}

.comparison-box {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1rem;
}

.compare-side {
  background: var(--vp-c-bg);
  border-radius: 6px;
  padding: 0.75rem;
  border: 1px solid var(--vp-c-divider);
}

.side-title {
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: var(--vp-c-text-1);
  text-align: center;
}

.code-example {
  background: #1e1e1e;
  border-radius: 4px;
  padding: 0.5rem;
  font-family: monospace;
  font-size: 0.8rem;
  margin-bottom: 0.5rem;
}

.code-line {
  padding: 0.15rem 0;
  color: #d4d4d4;
}

.code-line.result {
  color: #6a9955;
  margin-top: 0.25rem;
}

.visual-box {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-size: 0.8rem;
}

.value-box {
  background: var(--vp-c-bg-soft);
  padding: 0.5rem;
  border-radius: 4px;
  border: 2px solid var(--vp-c-brand);
}

.ref-box {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.memory-box {
  background: var(--vp-c-brand-soft);
  padding: 0.5rem;
  border-radius: 4px;
  border: 2px solid var(--vp-c-brand);
}

.arrow {
  color: var(--vp-c-text-3);
  font-size: 0.75rem;
  text-align: center;
}

/* 修复引用类型可视化 */
.ref-visual {
  flex-direction: column;
  gap: 0.75rem;
}

.ref-boxes {
  display: flex;
  gap: 2rem;
  justify-content: center;
}

.ref-var-box {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.ref-var-name {
  font-weight: 600;
  color: var(--vp-c-text-1);
  font-family: monospace;
}

.ref-var-arrow {
  color: var(--vp-c-brand);
  font-weight: bold;
}

.down-arrow {
  color: var(--vp-c-brand);
  font-size: 0.8rem;
}

.ref-types-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.ref-type-item {
  display: flex;
  gap: 0.75rem;
  padding: 0.75rem;
  background: var(--vp-c-bg);
  border-radius: 6px;
  align-items: center;
}

.ref-icon {
  font-size: 1.5rem;
}

.ref-name {
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.ref-desc {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

.conversion-playground {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.input-section {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.input-section label {
  font-size: 0.9rem;
  color: var(--vp-c-text-1);
  white-space: nowrap;
}

.input-section input {
  flex: 1;
  padding: 0.5rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
}

.convert-btn {
  background: var(--vp-c-brand);
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
}

.results-section {
  background: var(--vp-c-bg);
  border-radius: 6px;
  padding: 0.75rem;
}

.result-row {
  display: flex;
  justify-content: space-between;
  padding: 0.4rem 0;
  border-bottom: 1px solid var(--vp-c-divider);
}

.result-row:last-child {
  border-bottom: none;
}

.result-label {
  font-weight: 600;
  color: var(--vp-c-text-2);
  font-family: monospace;
}

.result-value {
  font-family: monospace;
  color: var(--vp-c-brand);
}

.result-value.error {
  color: #f48771;
}

.falsy-values {
  background: var(--vp-c-bg-alt);
  border-radius: 6px;
  padding: 0.75rem;
}

.falsy-title {
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: var(--vp-c-text-1);
}

.falsy-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.falsy-item {
  background: var(--vp-c-bg);
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-family: monospace;
  font-size: 0.85rem;
  color: var(--vp-c-brand);
}

.falsy-note {
  font-size: 0.85rem;
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

@media (max-width: 768px) {
  .comparison-box {
    grid-template-columns: 1fr;
  }
}
</style>
