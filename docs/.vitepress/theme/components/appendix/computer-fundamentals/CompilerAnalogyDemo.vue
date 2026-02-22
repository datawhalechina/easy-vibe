<template>
  <div class="compiler-analogy-demo">
    <div class="demo-header">
      <span class="title">编译原理：翻译的艺术</span>
      <span class="subtitle">如何把代码翻译成机器指令</span>
    </div>

    <div class="analogy-intro">
      <div class="analogy-box">
        <div class="analogy-text">
          编译器就像<strong>翻译官</strong>，把人类能懂的代码翻译成机器能懂的指令
        </div>
      </div>
    </div>

    <!-- 翻译过程 -->
    <div class="translation-process">
      <div class="process-title">代码翻译的完整流程</div>
      <div class="process-flow">
        <div
          v-for="(step, index) in translationSteps"
          :key="index"
          class="process-step"
        >
          <div class="step-number">{{ index + 1 }}</div>
          <div class="step-content">
            <div class="step-name">{{ step.name }}</div>
            <div class="step-desc">{{ step.desc }}</div>
            <div class="step-example">{{ step.example }}</div>
          </div>
          <div v-if="index < translationSteps.length - 1" class="step-arrow">
            →
          </div>
        </div>
      </div>
    </div>

    <!-- 词法分析 -->
    <div class="analyzer-section">
      <div class="analyzer-title">词法分析：分词</div>
      <div class="lexical-demo">
        <div class="source-code">
          <code>int age = 25;</code>
        </div>
        <div class="token-arrow">↓</div>
        <div class="tokens-list">
          <div v-for="(token, index) in tokens" :key="index" class="token-item">
            <span class="token-type">{{ token.type }}</span>
            <span class="token-value">{{ token.value }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 语法分析 -->
    <div class="analyzer-section">
      <div class="analyzer-title">语法分析：构建树</div>
      <div class="syntax-demo">
        <div class="syntax-tree">
          <div class="tree-node root">
            <span class="node-label">赋值语句</span>
            <div class="node-children">
              <div class="tree-node">
                <span class="node-label">变量</span>
                <span class="node-value">age</span>
              </div>
              <div class="tree-node">
                <span class="node-label">运算符</span>
                <span class="node-value">=</span>
              </div>
              <div class="tree-node">
                <span class="node-label">数字</span>
                <span class="node-value">25</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 编译 vs 解释 -->
    <div class="comparison">
      <div class="comparison-title">编译 vs 解释</div>
      <div class="comparison-box">
        <div class="compare-side compile">
          <div class="side-header">编译型语言</div>
          <div class="side-content">
            <div class="side-step">源代码 → 编译器 → 机器码</div>
            <div class="side-example">C, Go, Rust</div>
            <div class="side-features">
              <div class="feature">✓ 执行快</div>
              <div class="feature">✓ 一次编译多次运行</div>
              <div class="feature">✗ 编译慢</div>
            </div>
          </div>
        </div>

        <div class="compare-side interpret">
          <div class="side-header">解释型语言</div>
          <div class="side-content">
            <div class="side-step">源代码 → 解释器 → 逐行执行</div>
            <div class="side-example">Python, JavaScript, PHP</div>
            <div class="side-features">
              <div class="feature">✓ 开发快</div>
              <div class="feature">✓ 跨平台</div>
              <div class="feature">✗ 执行慢</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 优化 -->
    <div class="optimization">
      <div class="optimization-title">编译器优化</div>
      <div class="optimization-content">
        <div class="opt-examples">
          <div class="opt-item">
            <div class="opt-before">优化前：</div>
            <div class="opt-code">x = 5 + 3 + 2</div>
          </div>
          <div class="opt-arrow">⬇️</div>
          <div class="opt-item">
            <div class="opt-after">优化后：</div>
            <div class="opt-code">x = 10</div>
          </div>
        </div>
        <div class="opt-note">编译器会自动优化代码，提高运行效率</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const translationSteps = [
  {
    name: '词法分析',
    desc: '将代码分解成一个个单词（token）',
    example: 'int age = 25 → [int, age, =, 25]'
  },
  {
    name: '语法分析',
    desc: '检查代码是否符合语法规则，构建语法树',
    example: '验证语句结构是否正确'
  },
  {
    name: '语义分析',
    desc: '检查代码的含义是否合理',
    example: '检查变量是否定义、类型是否匹配'
  },
  {
    name: '中间代码生成',
    desc: '生成与机器无关的中间表示',
    example: '生成字节码或中间表示'
  },
  {
    name: '优化',
    desc: '改进代码，提高执行效率',
    example: '常量折叠、死代码消除'
  },
  {
    name: '目标代码生成',
    desc: '生成机器码或目标代码',
    example: '生成 x86、ARM 等机器指令'
  }
]

const tokens = [
  { type: '关键字', value: 'int' },
  { type: '标识符', value: 'age' },
  { type: '运算符', value: '=' },
  { type: '数字', value: '25' },
  { type: '分隔符', value: ';' }
]
</script>

<style scoped>
.compiler-analogy-demo {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  padding: 1.5rem;
  margin: 1.5rem 0;
}

.demo-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.demo-header .title {
  font-weight: 700;
  font-size: 1.1rem;
}
.demo-header .subtitle {
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
}

.analogy-intro {
  margin-bottom: 2rem;
}

.analogy-box {
  padding: 1rem;
  background: var(--vp-c-bg);
  border-left: 4px solid var(--vp-c-brand);
  border-radius: 6px;
}

.analogy-text {
  font-size: 0.95rem;
  line-height: 1.6;
}

.translation-process {
  margin-bottom: 2rem;
}

.process-title {
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 1.5rem;
  text-align: center;
  color: var(--vp-c-brand);
}

.process-flow {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.process-step {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
}

.step-number {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: var(--vp-c-brand);
  color: white;
  border-radius: 50%;
  font-size: 0.9rem;
  font-weight: 600;
  flex-shrink: 0;
}

.step-content {
  flex: 1;
}

.step-name {
  font-weight: 600;
  font-size: 0.95rem;
  margin-bottom: 0.35rem;
  color: var(--vp-c-brand);
}

.step-desc {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.5rem;
}

.step-example {
  font-family: 'Courier New', monospace;
  font-size: 0.8rem;
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg-soft);
  padding: 0.5rem;
  border-radius: 4px;
}

.step-arrow {
  font-size: 1.5rem;
  color: var(--vp-c-brand);
  flex-shrink: 0;
}

.analyzer-section {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 2rem;
}

.analyzer-title {
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 1.5rem;
  color: var(--vp-c-brand);
}

.lexical-demo {
  text-align: center;
}

.source-code {
  padding: 1rem;
  background: #1e1e1e;
  border-radius: 6px;
  margin-bottom: 1rem;
}

.source-code code {
  color: #d4d4d4;
  font-size: 1rem;
}

.token-arrow {
  font-size: 1.5rem;
  color: var(--vp-c-brand);
  margin-bottom: 1rem;
}

.tokens-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
}

.token-item {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  padding: 0.75rem;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  min-width: 100px;
}

.token-type {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
}

.token-value {
  font-family: 'Courier New', monospace;
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--vp-c-brand);
}

.syntax-demo {
  display: flex;
  justify-content: center;
}

.syntax-tree {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.tree-node {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0.75rem;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
}

.tree-node.root {
  background: var(--vp-c-brand-soft);
  border-color: var(--vp-c-brand);
}

.node-label {
  font-size: 0.85rem;
  font-weight: 600;
}

.node-value {
  font-family: 'Courier New', monospace;
  font-size: 0.8rem;
  color: var(--vp-c-brand);
}

.node-children {
  display: flex;
  gap: 0.5rem;
  margin-left: 1rem;
}

.comparison {
  margin-bottom: 2rem;
}

.comparison-title {
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 1rem;
  color: var(--vp-c-brand);
}

.comparison-box {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

@media (max-width: 768px) {
  .comparison-box {
    grid-template-columns: 1fr;
  }
}

.compare-side {
  padding: 1.5rem;
  border-radius: 8px;
}

.side-header {
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 1rem;
  text-align: center;
}

.compile .side-header {
  color: #10b981;
}

.interpret .side-header {
  color: #3b82f6;
}

.side-step {
  text-align: center;
  padding: 0.75rem;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  margin-bottom: 1rem;
  font-size: 0.9rem;
}

.side-example {
  text-align: center;
  margin-bottom: 1rem;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

.side-features {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.feature {
  font-size: 0.85rem;
  padding: 0.5rem;
  background: var(--vp-c-bg);
  border-radius: 4px;
}

.optimization {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 1.5rem;
}

.optimization-title {
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 1.5rem;
  color: var(--vp-c-brand);
}

.optimization-content {
  text-align: center;
}

.opt-examples {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 1rem;
}

.opt-item {
  text-align: center;
}

.opt-before,
.opt-after {
  font-size: 0.85rem;
  margin-bottom: 0.5rem;
}

.opt-code {
  font-family: 'Courier New', monospace;
  padding: 0.75rem;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  font-size: 0.9rem;
}

.opt-arrow {
  font-size: 1.5rem;
}

.opt-note {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  font-style: italic;
}
</style>
