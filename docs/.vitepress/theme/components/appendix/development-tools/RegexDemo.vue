<template>
  <div class="regex-demo">
    <div class="demo-header">
      <span class="title">正则表达式：文本的搜索引擎</span>
      <span class="subtitle">模式匹配 · 分组捕获 · 实时预览</span>
    </div>

    <div class="control-panel">
      <div class="mode-btns">
        <button
          v-for="m in modes"
          :key="m.id"
          :class="['mode-btn', { active: activeMode === m.id }]"
          @click="activeMode = m.id"
        >
          {{ m.label }}
        </button>
      </div>
    </div>

    <div class="visualization-area">
      <!-- Mode 1: Live Playground -->
      <div v-if="activeMode === 'playground'" class="playground-section">
        <div class="input-group">
          <label>正则表达式</label>
          <div class="regex-input-wrapper">
            <span class="regex-slash">/</span>
            <input
              v-model="regexPattern"
              type="text"
              placeholder="输入正则..."
              class="regex-input"
            />
            <span class="regex-slash">/</span>
            <input
              v-model="regexFlags"
              type="text"
              placeholder="g"
              class="flags-input"
            />
          </div>
        </div>

        <div class="input-group">
          <label>测试文本</label>
          <textarea
            v-model="testText"
            rows="3"
            placeholder="输入要匹配的文本..."
            class="test-input"
          />
        </div>

        <div class="match-results">
          <div class="results-header">
            <span class="results-title">匹配结果</span>
            <span
              class="match-count"
              :class="{ 'has-match': matches.length > 0 }"
            >
              {{ matches.length }} 个匹配
            </span>
          </div>
          <div class="highlighted-text" v-html="highlightedText" />
          <div v-if="matches.length > 0" class="match-list">
            <div v-for="(m, i) in matches" :key="i" class="match-item">
              <span class="match-index">#{{ i + 1 }}</span>
              <code class="match-value">"{{ m }}"</code>
            </div>
          </div>
          <div v-if="regexError" class="regex-error">{{ regexError }}</div>
        </div>

        <div class="preset-btns">
          <span class="preset-label">试试预设：</span>
          <button
            v-for="p in presets"
            :key="p.name"
            class="preset-btn"
            @click="applyPreset(p)"
          >
            {{ p.name }}
          </button>
        </div>
      </div>

      <!-- Mode 2: Cheat Sheet -->
      <div v-if="activeMode === 'cheatsheet'" class="cheatsheet-section">
        <div
          v-for="cat in cheatsheet"
          :key="cat.category"
          class="cheat-category"
        >
          <div class="cat-title">{{ cat.category }}</div>
          <div class="cheat-grid">
            <div
              v-for="item in cat.items"
              :key="item.pattern"
              class="cheat-item"
              @click="tryCheat(item)"
            >
              <code class="cheat-pattern">{{ item.pattern }}</code>
              <span class="cheat-desc">{{ item.desc }}</span>
              <span class="cheat-example">{{ item.example }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Mode 3: Common Patterns -->
      <div v-if="activeMode === 'patterns'" class="patterns-section">
        <div class="patterns-grid">
          <div v-for="p in commonPatterns" :key="p.name" class="pattern-card">
            <div class="pattern-name">{{ p.name }}</div>
            <code class="pattern-regex">{{ p.regex }}</code>
            <div class="pattern-matches">
              <div
                v-for="(ex, i) in p.examples"
                :key="i"
                class="pattern-example"
              >
                <span class="ex-text">{{ ex.text }}</span>
                <span :class="['ex-result', ex.match ? 'pass' : 'fail']">
                  {{ ex.match ? '✓ 匹配' : '✗ 不匹配' }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Mode 4: Visual Breakdown -->
      <div v-if="activeMode === 'visual'" class="visual-section">
        <div class="visual-example">
          <div class="visual-title">正则解剖：拆解一个邮箱匹配模式</div>
          <div class="visual-regex">
            <span
              v-for="(part, i) in regexParts"
              :key="i"
              :class="['regex-part', part.type]"
              @mouseenter="activePart = i"
              @mouseleave="activePart = -1"
            >
              {{ part.text }}
              <span v-if="activePart === i" class="part-tooltip">{{
                part.desc
              }}</span>
            </span>
          </div>
          <div class="visual-legend">
            <span
              v-for="l in legend"
              :key="l.type"
              :class="['legend-item', l.type]"
            >
              <span class="legend-dot" />{{ l.label }}
            </span>
          </div>
        </div>

        <div class="visual-flow">
          <div class="flow-title">正则引擎的工作过程</div>
          <div class="flow-steps">
            <div v-for="(step, i) in engineSteps" :key="i" class="flow-step">
              <div class="flow-num">{{ i + 1 }}</div>
              <div class="flow-content">
                <div class="flow-action">{{ step.action }}</div>
                <div class="flow-detail">{{ step.detail }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="info-box">
      <strong>核心思想：</strong>
      <span v-if="activeMode === 'playground'"
        >正则表达式是一种用特殊符号描述文本模式的语言，在搜索、替换、数据验证中无处不在。</span
      >
      <span v-else-if="activeMode === 'cheatsheet'"
        >记住几个核心符号（. * + ? \d \w [] ()）就能覆盖 80%
        的使用场景。点击任意符号可直接试验。</span
      >
      <span v-else-if="activeMode === 'patterns'"
        >不需要自己从零写正则——常见场景（邮箱、手机号、URL）都有成熟的模式可以直接复用。</span
      >
      <span v-else
        >正则引擎从左到右逐字符匹配，遇到量词会"贪婪"地尽量多匹配，失败时"回溯"尝试其他路径。</span
      >
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const activeMode = ref('playground')

const modes = [
  { id: 'playground', label: '实时试验' },
  { id: 'cheatsheet', label: '速查表' },
  { id: 'patterns', label: '常用模式' },
  { id: 'visual', label: '可视化解析' }
]

const regexPattern = ref('\\d+')
const regexFlags = ref('g')
const testText = ref(
  '我的手机号是 13812345678，座机是 010-12345678，邮箱是 test@example.com'
)

function buildRegex(pattern, flags) {
  try {
    if (!pattern) return { regex: null, error: '' }
    return { regex: new RegExp(pattern, flags), error: '' }
  } catch (e) {
    return { regex: null, error: e.message }
  }
}

const regexResult = computed(() =>
  buildRegex(regexPattern.value, regexFlags.value)
)
const regexError = computed(() => regexResult.value.error)

const matches = computed(() => {
  const { regex } = regexResult.value
  if (!regex) return []
  try {
    const result = []
    let match
    if (regexFlags.value.includes('g')) {
      while ((match = regex.exec(testText.value)) !== null) {
        result.push(match[0])
        if (!match[0]) break
      }
    } else {
      match = regex.exec(testText.value)
      if (match) result.push(match[0])
    }
    return result
  } catch {
    return []
  }
})

const highlightedText = computed(() => {
  try {
    if (!regexPattern.value || regexError.value) {
      return escapeHtml(testText.value)
    }
    const regex = new RegExp(regexPattern.value, regexFlags.value)
    return escapeHtml(testText.value).replace(
      regex,
      (m) => `<mark class="highlight">${escapeHtml(m)}</mark>`
    )
  } catch {
    return escapeHtml(testText.value)
  }
})

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

const presets = [
  {
    name: '找数字',
    pattern: '\\d+',
    flags: 'g',
    text: '价格是 99 元，优惠 20 元，共 79 元'
  },
  {
    name: '找邮箱',
    pattern: '[\\w.+-]+@[\\w-]+\\.[\\w.]+',
    flags: 'g',
    text: 'admin@test.com 和 user@example.org 是有效邮箱'
  },
  {
    name: '找手机号',
    pattern: '1[3-9]\\d{9}',
    flags: 'g',
    text: '联系我：13812345678 或 15099887766'
  },
  {
    name: '找 URL',
    pattern: 'https?://[^\\s]+',
    flags: 'g',
    text: '访问 https://github.com 或 http://example.com/path'
  },
  {
    name: '找中文',
    pattern: '[\\u4e00-\\u9fa5]+',
    flags: 'g',
    text: 'Hello世界，你好World！'
  }
]

function applyPreset(p) {
  regexPattern.value = p.pattern
  regexFlags.value = p.flags
  testText.value = p.text
}

const cheatsheet = [
  {
    category: '字符类',
    items: [
      { pattern: '.', desc: '任意字符（除换行）', example: 'a.c → abc, a1c' },
      { pattern: '\\d', desc: '数字 [0-9]', example: '\\d → 3, 7' },
      { pattern: '\\w', desc: '字母数字下划线', example: '\\w → a, 5, _' },
      { pattern: '\\s', desc: '空白字符', example: '空格、Tab、换行' },
      { pattern: '[abc]', desc: '字符集合', example: '[aeiou] → 元音' },
      { pattern: '[^abc]', desc: '否定集合', example: '[^0-9] → 非数字' }
    ]
  },
  {
    category: '量词',
    items: [
      { pattern: '*', desc: '0 或多次', example: 'ab* → a, ab, abb' },
      { pattern: '+', desc: '1 或多次', example: 'ab+ → ab, abb' },
      { pattern: '?', desc: '0 或 1 次', example: 'colou?r → color, colour' },
      { pattern: '{n}', desc: '恰好 n 次', example: '\\d{4} → 2024' },
      { pattern: '{n,m}', desc: 'n 到 m 次', example: '\\d{2,4} → 12, 123' }
    ]
  },
  {
    category: '位置',
    items: [
      { pattern: '^', desc: '行首', example: '^Hello → 以 Hello 开头' },
      { pattern: '$', desc: '行尾', example: 'end$ → 以 end 结尾' },
      {
        pattern: '\\b',
        desc: '单词边界',
        example: '\\bcat\\b → cat（不匹配 catch）'
      }
    ]
  },
  {
    category: '分组与引用',
    items: [
      { pattern: '(abc)', desc: '捕获组', example: '(\\d+)-(\\d+) → 分别捕获' },
      { pattern: 'a|b', desc: '或', example: 'cat|dog → cat 或 dog' },
      { pattern: '(?:abc)', desc: '非捕获组', example: '(?:ab)+ → abab' }
    ]
  }
]

function tryCheat(item) {
  activeMode.value = 'playground'
  regexPattern.value = item.pattern.replace(/\\/g, '\\')
  regexFlags.value = 'g'
}

const commonPatterns = [
  {
    name: '邮箱',
    regex: '^[\\w.+-]+@[\\w-]+\\.[\\w.]+$',
    examples: [
      { text: 'user@example.com', match: true },
      { text: 'a.b+c@test.org', match: true },
      { text: 'invalid@', match: false },
      { text: '@no-user.com', match: false }
    ]
  },
  {
    name: '手机号（中国）',
    regex: '^1[3-9]\\d{9}$',
    examples: [
      { text: '13812345678', match: true },
      { text: '15099887766', match: true },
      { text: '12345678901', match: false },
      { text: '1381234567', match: false }
    ]
  },
  {
    name: 'URL',
    regex: '^https?://[^\\s]+$',
    examples: [
      { text: 'https://github.com', match: true },
      { text: 'http://example.com/path?q=1', match: true },
      { text: 'ftp://not-http.com', match: false },
      { text: 'just-text', match: false }
    ]
  },
  {
    name: 'IPv4 地址',
    regex: '^(\\d{1,3}\\.){3}\\d{1,3}$',
    examples: [
      { text: '192.168.1.1', match: true },
      { text: '10.0.0.255', match: true },
      { text: '999.999.999.999', match: true },
      { text: '1.2.3', match: false }
    ]
  },
  {
    name: '日期 (YYYY-MM-DD)',
    regex: '^\\d{4}-\\d{2}-\\d{2}$',
    examples: [
      { text: '2024-01-15', match: true },
      { text: '2023-12-31', match: true },
      { text: '24-1-5', match: false },
      { text: '2024/01/15', match: false }
    ]
  },
  {
    name: '强密码',
    regex: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,}$',
    examples: [
      { text: 'Passw0rd', match: true },
      { text: 'MyP@ss123', match: true },
      { text: 'password', match: false },
      { text: 'SHORT1a', match: false }
    ]
  }
]

const activePart = ref(-1)

const regexParts = [
  { text: '[', type: 'bracket', desc: '字符集合开始' },
  { text: '\\w', type: 'char-class', desc: '字母、数字或下划线' },
  { text: '.+-', type: 'literal', desc: '点号、加号、横杠（字面量）' },
  { text: ']', type: 'bracket', desc: '字符集合结束' },
  { text: '+', type: 'quantifier', desc: '一个或多个（贪婪匹配）' },
  { text: '@', type: 'literal', desc: '字面量 @ 符号' },
  { text: '[', type: 'bracket', desc: '字符集合开始' },
  { text: '\\w', type: 'char-class', desc: '字母、数字或下划线' },
  { text: '-', type: 'literal', desc: '横杠（字面量）' },
  { text: ']', type: 'bracket', desc: '字符集合结束' },
  { text: '+', type: 'quantifier', desc: '一个或多个' },
  { text: '\\.', type: 'escape', desc: '转义的点号（匹配字面量 .）' },
  { text: '[', type: 'bracket', desc: '字符集合开始' },
  { text: '\\w', type: 'char-class', desc: '字母、数字或下划线' },
  { text: '.', type: 'literal', desc: '点号（在字符集中是字面量）' },
  { text: ']', type: 'bracket', desc: '字符集合结束' },
  { text: '+', type: 'quantifier', desc: '一个或多个' }
]

const legend = [
  { type: 'char-class', label: '字符类' },
  { type: 'quantifier', label: '量词' },
  { type: 'literal', label: '字面量' },
  { type: 'bracket', label: '集合边界' },
  { type: 'escape', label: '转义字符' }
]

const engineSteps = [
  {
    action: '从左到右扫描',
    detail: '正则引擎从文本第一个字符开始，逐个尝试匹配'
  },
  { action: '贪婪匹配', detail: '遇到 * + 等量词时，尽量多匹配字符' },
  { action: '回溯', detail: '如果贪婪匹配失败，退回一步尝试更少的字符' },
  { action: '捕获分组', detail: '遇到 () 时，记录匹配的子串供后续引用' },
  { action: '返回结果', detail: '全部匹配完成，返回所有匹配项和捕获组' }
]
</script>

<style scoped>
.regex-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg-soft);
  padding: 0.75rem;
  margin: 0.5rem 0;
}

.demo-header {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.demo-header .title {
  font-weight: bold;
  font-size: 1rem;
}
.demo-header .subtitle {
  color: var(--vp-c-text-2);
  font-size: 0.82rem;
}

.control-panel {
  background: var(--vp-c-bg);
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
  border: 1px solid var(--vp-c-divider);
  margin-bottom: 0.75rem;
}

.mode-btns {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.mode-btn {
  padding: 0.35rem 0.7rem;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-alt);
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.82rem;
  transition: all 0.2s;
}

.mode-btn.active {
  background: var(--vp-c-brand);
  color: white;
  border-color: var(--vp-c-brand);
}

/* Playground */
.input-group {
  margin-bottom: 0.5rem;
}

.input-group label {
  display: block;
  font-size: 0.8rem;
  font-weight: bold;
  color: var(--vp-c-text-2);
  margin-bottom: 0.25rem;
}

.regex-input-wrapper {
  display: flex;
  align-items: center;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  padding: 0 0.35rem;
}

.regex-slash {
  color: var(--vp-c-text-3);
  font-family: var(--vp-font-family-mono);
  font-size: 0.9rem;
}

.regex-input {
  flex: 1;
  border: none;
  background: transparent;
  padding: 0.4rem 0.25rem;
  font-family: var(--vp-font-family-mono);
  font-size: 0.85rem;
  outline: none;
  color: var(--vp-c-brand);
}

.flags-input {
  width: 30px;
  border: none;
  background: transparent;
  padding: 0.4rem 0.15rem;
  font-family: var(--vp-font-family-mono);
  font-size: 0.85rem;
  outline: none;
  color: var(--vp-c-text-2);
}

.test-input {
  width: 100%;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  border-radius: 4px;
  padding: 0.4rem;
  font-size: 0.85rem;
  resize: vertical;
  font-family: inherit;
  line-height: 1.5;
  box-sizing: border-box;
}

.match-results {
  background: var(--vp-c-bg);
  border-radius: 6px;
  padding: 0.5rem 0.75rem;
  margin-bottom: 0.5rem;
  border: 1px solid var(--vp-c-divider);
}

.results-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.35rem;
}

.results-title {
  font-weight: bold;
  font-size: 0.85rem;
}

.match-count {
  font-size: 0.78rem;
  color: var(--vp-c-text-3);
  padding: 0.1rem 0.4rem;
  border-radius: 10px;
  background: var(--vp-c-bg-alt);
}

.match-count.has-match {
  background: rgba(16, 185, 129, 0.15);
  color: var(--vp-c-green-1);
}

.highlighted-text {
  font-size: 0.85rem;
  line-height: 1.6;
  padding: 0.35rem;
  background: var(--vp-c-bg-alt);
  border-radius: 4px;
  word-break: break-all;
}

:deep(.highlight) {
  background: rgba(59, 130, 246, 0.25);
  padding: 0.05rem 0.15rem;
  border-radius: 2px;
  border-bottom: 2px solid var(--vp-c-brand);
}

.match-list {
  display: flex;
  gap: 0.35rem;
  flex-wrap: wrap;
  margin-top: 0.35rem;
}

.match-item {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.78rem;
}

.match-index {
  color: var(--vp-c-text-3);
  font-size: 0.7rem;
}

.match-value {
  background: var(--vp-c-brand-soft);
  padding: 0.1rem 0.3rem;
  border-radius: 3px;
  font-family: var(--vp-font-family-mono);
  font-size: 0.78rem;
}

.regex-error {
  color: var(--vp-c-danger-1);
  font-size: 0.78rem;
  margin-top: 0.25rem;
}

.preset-btns {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  flex-wrap: wrap;
}

.preset-label {
  font-size: 0.78rem;
  color: var(--vp-c-text-2);
}

.preset-btn {
  padding: 0.2rem 0.5rem;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.75rem;
}

.preset-btn:hover {
  border-color: var(--vp-c-brand);
  color: var(--vp-c-brand);
}

/* Cheatsheet */
.cheat-category {
  margin-bottom: 0.75rem;
}

.cat-title {
  font-weight: bold;
  font-size: 0.88rem;
  margin-bottom: 0.35rem;
  color: var(--vp-c-brand);
}

.cheat-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 0.35rem;
}

.cheat-item {
  display: flex;
  flex-direction: column;
  padding: 0.4rem 0.5rem;
  background: var(--vp-c-bg);
  border-radius: 4px;
  border: 1px solid var(--vp-c-divider);
  cursor: pointer;
  transition: border-color 0.2s;
}

.cheat-item:hover {
  border-color: var(--vp-c-brand);
}

.cheat-pattern {
  font-family: var(--vp-font-family-mono);
  font-size: 0.9rem;
  font-weight: bold;
  color: var(--vp-c-brand);
}

.cheat-desc {
  font-size: 0.78rem;
  color: var(--vp-c-text-1);
}

.cheat-example {
  font-size: 0.72rem;
  color: var(--vp-c-text-3);
}

/* Patterns */
.patterns-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 0.5rem;
}

.pattern-card {
  background: var(--vp-c-bg);
  border-radius: 6px;
  padding: 0.5rem 0.75rem;
  border: 1px solid var(--vp-c-divider);
}

.pattern-name {
  font-weight: bold;
  font-size: 0.88rem;
  margin-bottom: 0.25rem;
}

.pattern-regex {
  display: block;
  font-family: var(--vp-font-family-mono);
  font-size: 0.75rem;
  background: var(--vp-c-bg-alt);
  padding: 0.25rem 0.4rem;
  border-radius: 4px;
  margin-bottom: 0.35rem;
  color: var(--vp-c-brand);
  word-break: break-all;
}

.pattern-matches {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.pattern-example {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.2rem 0.35rem;
  background: var(--vp-c-bg-alt);
  border-radius: 3px;
  font-size: 0.78rem;
}

.ex-text {
  font-family: var(--vp-font-family-mono);
  font-size: 0.75rem;
}

.ex-result.pass {
  color: var(--vp-c-green-1);
  font-weight: bold;
}

.ex-result.fail {
  color: var(--vp-c-danger-1);
}

/* Visual */
.visual-example {
  background: var(--vp-c-bg);
  padding: 0.75rem;
  border-radius: 6px;
  margin-bottom: 0.75rem;
  border: 1px solid var(--vp-c-divider);
}

.visual-title,
.flow-title {
  font-weight: bold;
  font-size: 0.88rem;
  margin-bottom: 0.5rem;
}

.visual-regex {
  display: flex;
  flex-wrap: wrap;
  gap: 0;
  padding: 0.5rem;
  background: var(--vp-c-bg-alt);
  border-radius: 4px;
  margin-bottom: 0.5rem;
  font-family: var(--vp-font-family-mono);
  font-size: 1rem;
}

.regex-part {
  position: relative;
  padding: 0.15rem 0.1rem;
  cursor: pointer;
  border-radius: 2px;
  transition: background 0.2s;
}

.regex-part.char-class {
  color: #3b82f6;
  background: rgba(59, 130, 246, 0.1);
}
.regex-part.quantifier {
  color: #f59e0b;
  background: rgba(245, 158, 11, 0.1);
}
.regex-part.literal {
  color: var(--vp-c-text-1);
}
.regex-part.bracket {
  color: #8b5cf6;
  background: rgba(139, 92, 246, 0.1);
}
.regex-part.escape {
  color: #ef4444;
  background: rgba(239, 68, 68, 0.1);
}

.part-tooltip {
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  background: var(--vp-c-text-1);
  color: var(--vp-c-bg);
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.72rem;
  white-space: nowrap;
  z-index: 10;
  pointer-events: none;
}

.visual-legend {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.75rem;
}

.legend-dot {
  width: 8px;
  height: 8px;
  border-radius: 2px;
}

.legend-item.char-class .legend-dot {
  background: #3b82f6;
}
.legend-item.quantifier .legend-dot {
  background: #f59e0b;
}
.legend-item.literal .legend-dot {
  background: var(--vp-c-text-2);
}
.legend-item.bracket .legend-dot {
  background: #8b5cf6;
}
.legend-item.escape .legend-dot {
  background: #ef4444;
}

.visual-flow {
  background: var(--vp-c-bg);
  padding: 0.75rem;
  border-radius: 6px;
  border: 1px solid var(--vp-c-divider);
}

.flow-steps {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.flow-step {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.35rem;
  background: var(--vp-c-bg-alt);
  border-radius: 4px;
}

.flow-num {
  width: 22px;
  height: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--vp-c-brand);
  color: white;
  border-radius: 50%;
  font-size: 0.72rem;
  font-weight: bold;
  flex-shrink: 0;
}

.flow-action {
  font-weight: bold;
  font-size: 0.82rem;
}

.flow-detail {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
}

/* Info Box */
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

.info-box strong {
  white-space: nowrap;
  flex-shrink: 0;
}

@media (max-width: 640px) {
  .cheat-grid {
    grid-template-columns: 1fr;
  }

  .patterns-grid {
    grid-template-columns: 1fr;
  }
}
</style>
