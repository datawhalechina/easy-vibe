<template>
  <div class="type-system-demo">
    <div class="demo-header">
      <span class="icon">🏷️</span>
      <span class="title">类型系统：数据的分类规则</span>
      <span class="subtitle">静态 vs 动态，强类型 vs 弱类型</span>
    </div>

    <div class="demo-content">
      <div class="type-quadrant">
        <div class="quadrant-title">
          类型系统四象限
        </div>
        <div class="quadrant-grid">
          <div class="quadrant-cell strong-static">
            <div class="cell-label">
              强类型 + 静态
            </div>
            <div class="cell-langs">
              Java, Rust, Haskell
            </div>
            <div class="cell-desc">
              最安全，编译期检查
            </div>
          </div>
          <div class="quadrant-cell weak-static">
            <div class="cell-label">
              弱类型 + 静态
            </div>
            <div class="cell-langs">
              C, C++
            </div>
            <div class="cell-desc">
              高效，但需小心
            </div>
          </div>
          <div class="quadrant-cell strong-dynamic">
            <div class="cell-label">
              强类型 + 动态
            </div>
            <div class="cell-langs">
              Python, Ruby
            </div>
            <div class="cell-desc">
              灵活，运行时检查
            </div>
          </div>
          <div class="quadrant-cell weak-dynamic">
            <div class="cell-label">
              弱类型 + 动态
            </div>
            <div class="cell-langs">
              JavaScript, PHP
            </div>
            <div class="cell-desc">
              最灵活，但易出错
            </div>
          </div>
        </div>
        <div class="axis-labels">
          <span class="axis-x">静态 ←→ 动态</span>
          <span class="axis-y">强类型 ←→ 弱类型</span>
        </div>
      </div>

      <div class="type-demo">
        <div class="demo-title">
          类型检查演示
        </div>
        <div class="code-comparison">
          <div class="code-block">
            <div class="code-label">
              静态类型 (Java)
            </div>
            <pre><code>String name = "Alice";
name = 123; // ❌ 编译错误

int x = 10;
String s = x; // ❌ 编译错误</code></pre>
            <div class="code-result error">
              编译期发现错误
            </div>
          </div>
          <div class="code-block">
            <div class="code-label">
              动态类型 (Python)
            </div>
            <pre><code>name = "Alice"
name = 123  # ✅ 运行正常

x = 10
s = str(x)  # 需要显式转换</code></pre>
            <div class="code-result success">
              运行时类型可变
            </div>
          </div>
        </div>
      </div>

      <div class="conversion-demo">
        <div class="demo-title">
          类型转换演示
        </div>
        <div class="conversion-tabs">
          <button 
            v-for="lang in languages" 
            :key="lang.name"
            :class="['tab-btn', { active: activeLang === lang.name }]"
            @click="activeLang = lang.name"
          >
            {{ lang.name }}
          </button>
        </div>
        <div
          v-if="currentLang"
          class="conversion-content"
        >
          <div
            v-for="(item, i) in currentLang.conversions"
            :key="i"
            class="conversion-item"
          >
            <code class="code-expr">{{ item.expr }}</code>
            <span class="arrow">→</span>
            <code
              class="code-result"
              :class="{ error: item.error }"
            >{{ item.result }}</code>
            <span class="explanation">{{ item.explain }}</span>
          </div>
        </div>
      </div>

      <div class="type-inference">
        <div class="demo-title">
          类型推断
        </div>
        <div class="inference-examples">
          <div
            v-for="(example, i) in inferenceExamples"
            :key="i"
            class="inference-item"
          >
            <div class="inference-lang">
              {{ example.lang }}
            </div>
            <code class="inference-code">{{ example.code }}</code>
            <div class="inference-result">
              推断为: <span class="type">{{ example.type }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="type-benefits">
        <div class="benefits-title">
          类型系统的好处
        </div>
        <div class="benefits-grid">
          <div
            v-for="(b, i) in benefits"
            :key="i"
            class="benefit-item"
          >
            <span class="benefit-icon">{{ b.icon }}</span>
            <span class="benefit-name">{{ b.name }}</span>
            <span class="benefit-desc">{{ b.desc }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="info-box">
      <span class="icon">💡</span>
      <strong>核心思想：</strong>类型系统是编程语言的"交通规则"，帮助我们在编译期或运行时发现错误。静态类型在编译期检查，动态类型在运行时检查；强类型不允许隐式转换，弱类型允许。
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const activeLang = ref('JavaScript')

const languages = [
  {
    name: 'JavaScript',
    conversions: [
      { expr: '"1" + 1', result: '"11"', explain: '字符串拼接', error: false },
      { expr: '"1" - 1', result: '0', explain: '自动转数字', error: false },
      { expr: '[] + []', result: '""', explain: '空数组转空字符串', error: false },
      { expr: '[] + {}', result: '"[object Object]"', explain: '对象转字符串', error: false },
      { expr: 'true + true', result: '2', explain: '布尔转数字', error: false }
    ]
  },
  {
    name: 'Python',
    conversions: [
      { expr: '"1" + 1', result: 'TypeError', explain: '不允许隐式转换', error: true },
      { expr: '"1" + str(1)', result: '"11"', explain: '显式转换', error: false },
      { expr: 'int("1") + 1', result: '2', explain: '显式转换', error: false },
      { expr: 'True + True', result: '2', explain: '布尔是整数子类', error: false },
      { expr: '[1] + [2]', result: '[1, 2]', explain: '列表拼接', error: false }
    ]
  },
  {
    name: 'Java',
    conversions: [
      { expr: '"1" + 1', result: '"11"', explain: '字符串拼接(特殊规则)', error: false },
      { expr: '(String) 1', result: '编译错误', explain: '不允许转换', error: true },
      { expr: '(int) 1.5', result: '1', explain: '强制类型转换', error: false },
      { expr: 'Integer.parseInt("1")', result: '1', explain: '显式解析', error: false }
    ]
  },
  {
    name: 'Rust',
    conversions: [
      { expr: '"1".to_string() + "1"', result: '"11"', explain: '字符串拼接', error: false },
      { expr: '"1".parse::<i32>()', result: 'Ok(1)', explain: '显式解析', error: false },
      { expr: '1_i32 + 1_i64', result: '编译错误', explain: '类型不匹配', error: true },
      { expr: '1 as f64', result: '1.0', explain: '显式转换', error: false }
    ]
  }
]

const currentLang = computed(() => {
  return languages.find(l => l.name === activeLang.value)
})

const inferenceExamples = [
  { lang: 'TypeScript', code: 'let x = 1', type: 'number' },
  { lang: 'TypeScript', code: 'let arr = [1, 2, 3]', type: 'number[]' },
  { lang: 'Rust', code: 'let x = 1', type: 'i32 (默认整数类型)' },
  { lang: 'Rust', code: 'let s = "hello"', type: '&str (字符串切片)' },
  { lang: 'Haskell', code: 'x = 1', type: 'Num a => a (多态)' },
  { lang: 'C++ (auto)', code: 'auto x = 1', type: 'int' }
]

const benefits = [
  { icon: '🐛', name: '错误检测', desc: '在编译期发现类型错误' },
  { icon: '📖', name: '文档作用', desc: '类型签名即文档' },
  { icon: '🔧', name: 'IDE 支持', desc: '自动补全、重构' },
  { icon: '⚡', name: '性能优化', desc: '编译器可进行优化' },
  { icon: '🧩', name: '代码抽象', desc: '类型作为设计工具' },
  { icon: '🔒', name: '安全保障', desc: '避免运行时类型错误' }
]
</script>

<style scoped>
.type-system-demo {
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

.type-quadrant {
  background: var(--vp-c-bg);
  padding: 0.75rem;
  border-radius: 6px;
  margin-bottom: 1rem;
}

.quadrant-title {
  font-weight: bold;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}

.quadrant-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
}

.quadrant-cell {
  padding: 0.5rem;
  border-radius: 6px;
  text-align: center;
}

.strong-static { background: #d4edda; }
.weak-static { background: #fff3cd; }
.strong-dynamic { background: #cce5ff; }
.weak-dynamic { background: #f8d7da; }

.cell-label {
  font-weight: bold;
  font-size: 0.8rem;
  margin-bottom: 0.25rem;
}

.cell-langs {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.15rem;
}

.cell-desc {
  font-size: 0.7rem;
  color: var(--vp-c-text-3);
}

.axis-labels {
  display: flex;
  justify-content: space-between;
  margin-top: 0.5rem;
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
}

.type-demo {
  background: var(--vp-c-bg);
  padding: 0.75rem;
  border-radius: 6px;
  margin-bottom: 1rem;
}

.demo-title {
  font-weight: bold;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}

.code-comparison {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
}

.code-block {
  background: var(--vp-c-bg-alt);
  border-radius: 4px;
  overflow: hidden;
}

.code-label {
  font-size: 0.75rem;
  padding: 0.25rem 0.5rem;
  background: var(--vp-c-divider);
}

pre {
  margin: 0;
  padding: 0.5rem;
  font-size: 0.75rem;
  overflow-x: auto;
}

code {
  font-family: monospace;
}

.code-result {
  font-size: 0.75rem;
  padding: 0.25rem 0.5rem;
  text-align: center;
}

.code-result.error {
  background: #f8d7da;
  color: #721c24;
}

.code-result.success {
  background: #d4edda;
  color: #155724;
}

.conversion-demo {
  background: var(--vp-c-bg);
  padding: 0.75rem;
  border-radius: 6px;
  margin-bottom: 1rem;
}

.conversion-tabs {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  flex-wrap: wrap;
}

.tab-btn {
  padding: 0.35rem 0.6rem;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-alt);
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.8rem;
}

.tab-btn.active {
  background: var(--vp-c-brand);
  color: white;
  border-color: var(--vp-c-brand);
}

.conversion-content {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.conversion-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.35rem;
  background: var(--vp-c-bg-alt);
  border-radius: 4px;
  font-size: 0.8rem;
}

.code-expr {
  background: var(--vp-c-divider);
  padding: 0.15rem 0.4rem;
  border-radius: 3px;
  font-family: monospace;
}

.arrow {
  color: var(--vp-c-text-2);
}

.code-result {
  background: var(--vp-c-brand-soft);
  padding: 0.15rem 0.4rem;
  border-radius: 3px;
  font-family: monospace;
}

.code-result.error {
  background: #f8d7da;
  color: #721c24;
}

.explanation {
  color: var(--vp-c-text-2);
  font-size: 0.75rem;
}

.type-inference {
  background: var(--vp-c-bg);
  padding: 0.75rem;
  border-radius: 6px;
  margin-bottom: 1rem;
}

.inference-examples {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 0.5rem;
}

.inference-item {
  padding: 0.4rem;
  background: var(--vp-c-bg-alt);
  border-radius: 4px;
}

.inference-lang {
  font-size: 0.7rem;
  color: var(--vp-c-brand);
  font-weight: bold;
}

.inference-code {
  display: block;
  font-family: monospace;
  font-size: 0.8rem;
  margin: 0.25rem 0;
}

.inference-result {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
}

.inference-result .type {
  color: var(--vp-c-brand);
  font-weight: bold;
}

.type-benefits {
  background: var(--vp-c-bg);
  padding: 0.75rem;
  border-radius: 6px;
}

.benefits-title {
  font-weight: bold;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}

.benefits-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 0.5rem;
}

.benefit-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.4rem;
  background: var(--vp-c-bg-alt);
  border-radius: 4px;
  text-align: center;
}

.benefit-icon { font-size: 1rem; }
.benefit-name { font-size: 0.8rem; font-weight: bold; }
.benefit-desc { font-size: 0.7rem; color: var(--vp-c-text-2); }

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

@media (max-width: 640px) {
  .code-comparison {
    grid-template-columns: 1fr;
  }
}
</style>
