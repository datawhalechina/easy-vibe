<template>
  <div class="type-system-demo">
    <div class="demo-header">
      <span class="title">类型系统探索器</span>
      <span class="subtitle">静态 vs 动态 · 强类型 vs 弱类型 · 类型推断</span>
    </div>

    <div class="control-panel">
      <div class="tab-btns">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          :class="['tab-btn', { active: activeTab === tab.id }]"
          @click="activeTab = tab.id"
        >
          {{ tab.label }}
        </button>
      </div>
    </div>

    <div class="visualization-area">
      <!-- Tab 1: 四象限 -->
      <div v-if="activeTab === 'quadrant'" class="quadrant-section">
        <div class="quadrant-grid">
          <div class="quadrant-axes">
            <span class="axis-label top">强类型</span>
            <span class="axis-label bottom">弱类型</span>
            <span class="axis-label left">静态</span>
            <span class="axis-label right">动态</span>
          </div>
          <div class="quadrant-cells">
            <div
              v-for="q in quadrants"
              :key="q.id"
              :class="['q-cell', q.id, { active: activeQuadrant === q.id }]"
              @click="activeQuadrant = q.id"
            >
              <div class="q-title">{{ q.title }}</div>
              <div class="q-langs">
                <span v-for="lang in q.langs" :key="lang" class="lang-chip">{{
                  lang
                }}</span>
              </div>
            </div>
          </div>
        </div>
        <div v-if="selectedQuadrant" class="quadrant-detail">
          <div class="detail-title">{{ selectedQuadrant.title }}</div>
          <div class="detail-desc">{{ selectedQuadrant.desc }}</div>
          <div class="detail-traits">
            <span
              v-for="t in selectedQuadrant.traits"
              :key="t"
              class="trait-tag"
              >{{ t }}</span>
          </div>
        </div>
      </div>

      <!-- Tab 2: 类型检查对比 -->
      <div v-if="activeTab === 'check'" class="check-section">
        <div class="check-scenario">
          <div class="scenario-title">场景：给变量赋不同类型的值</div>
          <div class="scenario-code">
            <code>name = "Alice" → name = 123</code>
          </div>
        </div>
        <div class="check-grid">
          <div v-for="check in typeChecks" :key="check.lang" class="check-card">
            <div class="check-header">
              <span class="check-lang">{{ check.lang }}</span>
              <span :class="['check-badge', check.result]">{{
                check.badge
              }}</span>
            </div>
            <pre class="check-code"><code>{{ check.code }}</code></pre>
            <div :class="['check-verdict', check.result]">
              {{ check.verdict }}
            </div>
          </div>
        </div>
      </div>

      <!-- Tab 3: 类型转换实验 -->
      <div v-if="activeTab === 'convert'" class="convert-section">
        <div class="convert-picker">
          <button
            v-for="lang in convertLangs"
            :key="lang.name"
            :class="['lang-btn', { active: activeLang === lang.name }]"
            @click="activeLang = lang.name"
          >
            {{ lang.name }}
          </button>
        </div>
        <div v-if="currentLang" class="convert-list">
          <div
            v-for="(item, i) in currentLang.conversions"
            :key="i"
            class="convert-row"
          >
            <div class="convert-expr">
              <code>{{ item.expr }}</code>
            </div>
            <span class="convert-arrow">→</span>
            <div :class="['convert-result', { error: item.error }]">
              <code>{{ item.result }}</code>
            </div>
            <div class="convert-explain">{{ item.explain }}</div>
          </div>
        </div>
        <div class="convert-summary">
          <span v-if="activeLang === 'JavaScript'" class="summary-tag weak">弱类型：隐式转换，结果常出人意料</span>
          <span v-else-if="activeLang === 'Python'" class="summary-tag strong">强类型：拒绝隐式转换，必须显式指定</span>
          <span v-else-if="activeLang === 'Java'" class="summary-tag strong">强类型：字符串拼接是特例，其余严格</span>
          <span v-else class="summary-tag strong">强类型：类型不匹配就报错，零容忍</span>
        </div>
      </div>

      <!-- Tab 4: 类型推断 -->
      <div v-if="activeTab === 'infer'" class="infer-section">
        <div class="infer-intro">
          现代语言的类型推断：<strong>写着像动态语言，保护像静态语言</strong>
        </div>
        <div class="infer-grid">
          <div
            v-for="(example, i) in inferenceExamples"
            :key="i"
            class="infer-card"
          >
            <div class="infer-lang">{{ example.lang }}</div>
            <div class="infer-code">
              <code>{{ example.code }}</code>
            </div>
            <div class="infer-arrow">↓ 编译器自动推断</div>
            <div class="infer-type">{{ example.type }}</div>
          </div>
        </div>
        <div class="infer-benefit">
          <span v-for="b in inferBenefits" :key="b" class="benefit-item">{{
            b
          }}</span>
        </div>
      </div>
    </div>

    <div class="info-box">
      <strong>核心思想：</strong>
      <span v-if="activeTab === 'quadrant'">类型系统在两个维度上做选择——何时检查（静态/动态）和是否允许隐式转换（强/弱）。没有最好的组合，只有最适合的场景。</span>
      <span v-else-if="activeTab === 'check'">静态类型在编译时就能发现错误，动态类型要到运行时才知道——越早发现
        bug，修复成本越低。</span>
      <span v-else-if="activeTab === 'convert'">弱类型语言会"猜"你的意思做隐式转换（常出错），强类型语言要求你明确表达意图（更安全）。</span>
      <span v-else>类型推断让你两全其美：代码像动态语言一样简洁，编译器像静态语言一样严格检查。</span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const activeTab = ref('quadrant')

const tabs = [
  { id: 'quadrant', label: '四象限' },
  { id: 'check', label: '类型检查' },
  { id: 'convert', label: '类型转换' },
  { id: 'infer', label: '类型推断' }
]

const activeQuadrant = ref('strong-static')

const quadrants = [
  {
    id: 'strong-static',
    title: '强 + 静态',
    langs: ['Java', 'Rust', 'Haskell'],
    desc: '编译期严格检查，不允许隐式转换。最安全，IDE 支持最好，但写起来相对"啰嗦"。',
    traits: ['编译期检查', '无隐式转换', '自动补全友好', '重构安全']
  },
  {
    id: 'weak-static',
    title: '弱 + 静态',
    langs: ['C', 'C++'],
    desc: '编译期检查类型，但允许指针强转等隐式转换。性能极高，但容易踩坑。',
    traits: ['编译期检查', '允许指针转换', '性能极高', '需要小心使用']
  },
  {
    id: 'strong-dynamic',
    title: '强 + 动态',
    langs: ['Python', 'Ruby'],
    desc: '运行时检查类型，不允许隐式转换。灵活且安全，但性能较低。',
    traits: ['运行时检查', '拒绝隐式转换', '开发快速', '性能受限']
  },
  {
    id: 'weak-dynamic',
    title: '弱 + 动态',
    langs: ['JavaScript', 'PHP'],
    desc: '运行时检查，允许隐式转换。最灵活但最容易出错，"1" + 1 可能让你抓狂。',
    traits: ['运行时检查', '隐式转换', '灵活自由', '容易出意外']
  }
]

const selectedQuadrant = computed(() =>
  quadrants.find((q) => q.id === activeQuadrant.value)
)

const typeChecks = [
  {
    lang: 'Java（静态）',
    code: 'String name = "Alice";\nname = 123; // ❌ 编译错误',
    result: 'error',
    badge: '编译期报错',
    verdict: '还没运行就发现了问题，0 成本修复'
  },
  {
    lang: 'Python（动态强类型）',
    code: 'name = "Alice"\nname = 123  # ✅ 运行正常\nname + " test"  # ❌ 运行时 TypeError',
    result: 'warning',
    badge: '运行时报错',
    verdict: '赋值没问题，但后续操作可能出错'
  },
  {
    lang: 'JavaScript（动态弱类型）',
    code: 'let name = "Alice"\nname = 123  // ✅ 运行正常\nname + " test"  // "123 test" 🤔',
    result: 'success',
    badge: '静默通过',
    verdict: '不报错但结果可能不是你想要的'
  }
]

const activeLang = ref('JavaScript')

const convertLangs = [
  {
    name: 'JavaScript',
    conversions: [
      { expr: '"1" + 1', result: '"11"', explain: '字符串拼接', error: false },
      { expr: '"1" - 1', result: '0', explain: '自动转数字', error: false },
      {
        expr: '[] + []',
        result: '""',
        explain: '空数组转空字符串',
        error: false
      },
      {
        expr: '[] + {}',
        result: '"[object Object]"',
        explain: '对象转字符串',
        error: false
      },
      { expr: 'true + true', result: '2', explain: '布尔转数字', error: false },
      { expr: 'null + 1', result: '1', explain: 'null 变成 0', error: false }
    ]
  },
  {
    name: 'Python',
    conversions: [
      {
        expr: '"1" + 1',
        result: 'TypeError',
        explain: '不允许隐式转换',
        error: true
      },
      {
        expr: '"1" + str(1)',
        result: '"11"',
        explain: '显式转换',
        error: false
      },
      { expr: 'int("1") + 1', result: '2', explain: '显式转换', error: false },
      {
        expr: 'True + True',
        result: '2',
        explain: '布尔是整数子类（特殊）',
        error: false
      },
      {
        expr: '[1] + [2]',
        result: '[1, 2]',
        explain: '列表拼接（同类型操作）',
        error: false
      }
    ]
  },
  {
    name: 'Java',
    conversions: [
      {
        expr: '"1" + 1',
        result: '"11"',
        explain: '字符串拼接（特殊规则）',
        error: false
      },
      {
        expr: '(String) 1',
        result: '编译错误',
        explain: '不允许转换',
        error: true
      },
      {
        expr: '(int) 1.5',
        result: '1',
        explain: '强制类型转换（丢精度）',
        error: false
      },
      {
        expr: 'Integer.parseInt("1")',
        result: '1',
        explain: '显式解析',
        error: false
      }
    ]
  },
  {
    name: 'Rust',
    conversions: [
      {
        expr: '1_i32 + 1_i64',
        result: '编译错误',
        explain: '类型不匹配',
        error: true
      },
      {
        expr: '1_i32 as i64 + 1_i64',
        result: '2',
        explain: '显式 as 转换',
        error: false
      },
      {
        expr: '"1".parse::<i32>()',
        result: 'Ok(1)',
        explain: '显式解析（返回 Result）',
        error: false
      },
      { expr: '1 as f64', result: '1.0', explain: '显式转换', error: false }
    ]
  }
]

const currentLang = computed(() =>
  convertLangs.find((l) => l.name === activeLang.value)
)

const inferenceExamples = [
  { lang: 'TypeScript', code: 'let x = 1', type: 'number' },
  { lang: 'TypeScript', code: 'let arr = [1, 2, 3]', type: 'number[]' },
  { lang: 'Rust', code: 'let x = 1', type: 'i32' },
  { lang: 'Rust', code: 'let s = "hello"', type: '&str' },
  { lang: 'Kotlin', code: 'val x = 1', type: 'Int' },
  { lang: 'Go', code: 'x := 1', type: 'int' }
]

const inferBenefits = [
  '✅ 少写类型声明',
  '✅ 编译器仍然严格检查',
  '✅ IDE 自动补全照样工作',
  '✅ 重构时编译器帮你找错'
]
</script>

<style scoped>
.type-system-demo {
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

.tab-btns {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.tab-btn {
  padding: 0.35rem 0.7rem;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-alt);
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.82rem;
  transition: all 0.2s;
}

.tab-btn.active {
  background: var(--vp-c-brand);
  color: white;
  border-color: var(--vp-c-brand);
}

/* Quadrant */
.quadrant-grid {
  position: relative;
  margin-bottom: 0.75rem;
}

.quadrant-axes {
  pointer-events: none;
}

.axis-label {
  position: absolute;
  font-size: 0.7rem;
  color: var(--vp-c-text-3);
  font-weight: bold;
}

.axis-label.top {
  top: -0.1rem;
  left: 50%;
  transform: translateX(-50%);
}
.axis-label.bottom {
  bottom: -0.1rem;
  left: 50%;
  transform: translateX(-50%);
}
.axis-label.left {
  left: -0.1rem;
  top: 50%;
  transform: translateY(-50%) rotate(-90deg);
}
.axis-label.right {
  right: -0.1rem;
  top: 50%;
  transform: translateY(-50%) rotate(90deg);
}

.quadrant-cells {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
  padding: 1rem 0.5rem;
}

.q-cell {
  padding: 0.6rem;
  border-radius: 6px;
  cursor: pointer;
  border: 2px solid transparent;
  transition: all 0.2s;
}

.q-cell.strong-static {
  background: rgba(16, 185, 129, 0.1);
}
.q-cell.weak-static {
  background: rgba(245, 158, 11, 0.1);
}
.q-cell.strong-dynamic {
  background: rgba(59, 130, 246, 0.1);
}
.q-cell.weak-dynamic {
  background: rgba(239, 68, 68, 0.1);
}

.q-cell.active {
  border-color: var(--vp-c-brand);
  box-shadow: 0 0 8px rgba(59, 130, 246, 0.2);
}

.q-title {
  font-weight: bold;
  font-size: 0.85rem;
  margin-bottom: 0.25rem;
}

.q-langs {
  display: flex;
  gap: 0.25rem;
  flex-wrap: wrap;
}

.lang-chip {
  font-size: 0.72rem;
  background: var(--vp-c-bg);
  padding: 0.1rem 0.35rem;
  border-radius: 3px;
}

.quadrant-detail {
  background: var(--vp-c-bg);
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
  border: 1px solid var(--vp-c-divider);
}

.detail-title {
  font-weight: bold;
  font-size: 0.88rem;
  margin-bottom: 0.25rem;
  color: var(--vp-c-brand);
}

.detail-desc {
  font-size: 0.82rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.35rem;
}

.detail-traits {
  display: flex;
  gap: 0.35rem;
  flex-wrap: wrap;
}

.trait-tag {
  font-size: 0.72rem;
  padding: 0.15rem 0.4rem;
  background: var(--vp-c-brand-soft);
  border-radius: 3px;
}

/* Check */
.check-scenario {
  background: var(--vp-c-bg);
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
  margin-bottom: 0.5rem;
  text-align: center;
}

.scenario-title {
  font-size: 0.82rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.25rem;
}

.scenario-code code {
  font-family: var(--vp-font-family-mono);
  font-size: 0.85rem;
  background: var(--vp-c-bg-alt);
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
}

.check-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 0.5rem;
}

.check-card {
  background: var(--vp-c-bg);
  border-radius: 6px;
  overflow: hidden;
  border: 1px solid var(--vp-c-divider);
}

.check-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.35rem 0.5rem;
  background: var(--vp-c-bg-alt);
}

.check-lang {
  font-weight: bold;
  font-size: 0.82rem;
}

.check-badge {
  font-size: 0.7rem;
  padding: 0.1rem 0.35rem;
  border-radius: 3px;
  font-weight: bold;
}

.check-badge.error {
  background: rgba(239, 68, 68, 0.15);
  color: var(--vp-c-danger-1);
}

.check-badge.warning {
  background: rgba(245, 158, 11, 0.15);
  color: #d97706;
}

.check-badge.success {
  background: rgba(16, 185, 129, 0.15);
  color: var(--vp-c-green-1);
}

.check-code {
  margin: 0;
  padding: 0.4rem 0.5rem;
  font-size: 0.75rem;
  font-family: var(--vp-font-family-mono);
  white-space: pre-wrap;
  line-height: 1.5;
}

.check-verdict {
  padding: 0.3rem 0.5rem;
  font-size: 0.75rem;
  font-weight: bold;
}

.check-verdict.error {
  background: rgba(239, 68, 68, 0.1);
  color: var(--vp-c-danger-1);
}
.check-verdict.warning {
  background: rgba(245, 158, 11, 0.1);
  color: #d97706;
}
.check-verdict.success {
  background: rgba(16, 185, 129, 0.1);
  color: var(--vp-c-green-1);
}

/* Convert */
.convert-picker {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  flex-wrap: wrap;
}

.lang-btn {
  padding: 0.3rem 0.6rem;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.8rem;
}

.lang-btn.active {
  background: var(--vp-c-brand);
  color: white;
  border-color: var(--vp-c-brand);
}

.convert-list {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  margin-bottom: 0.5rem;
}

.convert-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.35rem 0.5rem;
  background: var(--vp-c-bg);
  border-radius: 4px;
  font-size: 0.82rem;
  flex-wrap: wrap;
}

.convert-expr code {
  font-family: var(--vp-font-family-mono);
  background: var(--vp-c-bg-alt);
  padding: 0.15rem 0.4rem;
  border-radius: 3px;
  font-size: 0.8rem;
}

.convert-arrow {
  color: var(--vp-c-text-3);
}

.convert-result code {
  font-family: var(--vp-font-family-mono);
  background: var(--vp-c-brand-soft);
  padding: 0.15rem 0.4rem;
  border-radius: 3px;
  font-size: 0.8rem;
}

.convert-result.error code {
  background: rgba(239, 68, 68, 0.15);
  color: var(--vp-c-danger-1);
}

.convert-explain {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  margin-left: auto;
}

.convert-summary {
  text-align: center;
}

.summary-tag {
  display: inline-block;
  padding: 0.3rem 0.75rem;
  border-radius: 4px;
  font-size: 0.82rem;
  font-weight: bold;
}

.summary-tag.weak {
  background: rgba(239, 68, 68, 0.1);
  color: var(--vp-c-danger-1);
}

.summary-tag.strong {
  background: rgba(16, 185, 129, 0.1);
  color: var(--vp-c-green-1);
}

/* Infer */
.infer-intro {
  text-align: center;
  font-size: 0.88rem;
  margin-bottom: 0.5rem;
  color: var(--vp-c-text-2);
}

.infer-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.infer-card {
  background: var(--vp-c-bg);
  padding: 0.5rem;
  border-radius: 6px;
  text-align: center;
  border: 1px solid var(--vp-c-divider);
}

.infer-lang {
  font-size: 0.72rem;
  color: var(--vp-c-brand);
  font-weight: bold;
  margin-bottom: 0.15rem;
}

.infer-code code {
  font-family: var(--vp-font-family-mono);
  font-size: 0.82rem;
}

.infer-arrow {
  font-size: 0.7rem;
  color: var(--vp-c-text-3);
  margin: 0.15rem 0;
}

.infer-type {
  font-weight: bold;
  font-size: 0.82rem;
  color: var(--vp-c-brand);
  background: var(--vp-c-brand-soft);
  padding: 0.15rem 0.35rem;
  border-radius: 3px;
  display: inline-block;
}

.infer-benefit {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
}

.benefit-item {
  font-size: 0.78rem;
  padding: 0.2rem 0.5rem;
  background: var(--vp-c-bg);
  border-radius: 4px;
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
  .check-grid {
    grid-template-columns: 1fr;
  }

  .convert-row {
    flex-direction: column;
    align-items: flex-start;
  }

  .convert-explain {
    margin-left: 0;
  }
}
</style>
