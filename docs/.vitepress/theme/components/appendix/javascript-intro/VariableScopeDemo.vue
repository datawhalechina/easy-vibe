<template>
  <div class="variable-scope-demo">
    <div class="demo-header">
      <span class="icon">📦</span>
      <span class="title">变量与作用域</span>
      <span class="subtitle">理解 let、const、var 的区别</span>
    </div>

    <div class="intro-text">
      想象你在<span class="highlight">家里</span>和<span class="highlight">公司</span>放东西：
      <span class="highlight">var</span>像是把东西贴在脑门上（哪都能看见），
      <span class="highlight">let</span>像是放在抽屉里（当前房间能用），
      <span class="highlight">const</span>像是焊死在地上的柜子（不能移动）
    </div>

    <div class="code-display">
      <div class="code-block">
        <div
          v-for="(line, i) in codeLines"
          :key="i"
          class="code-line"
          :class="{ active: currentLine === i }"
        >
          <span class="line-num">{{ i + 1 }}</span>
          <span
            class="line-code"
            v-html="highlightCode(line)"
          />
        </div>
      </div>

      <div class="visualization">
        <div class="scope-area global-scope">
          <div class="scope-title">
            全局作用域（房子外）
          </div>
          <div class="scope-vars">
            <div
              v-if="step >= 1"
              class="var-item"
              :class="{ error: step === 4 }"
            >
              <span class="var-type">var</span>
              <span class="var-name">globalVar</span>
              <span class="var-value">= "外面"</span>
            </div>
          </div>

          <div
            v-if="step >= 2"
            class="scope-area block-scope"
          >
            <div class="scope-title">
              块级作用域（房间内）
            </div>
            <div class="scope-vars">
              <div
                v-if="step >= 2"
                class="var-item"
                :class="{ error: step === 4 }"
              >
                <span class="var-type">var</span>
                <span class="var-name">blockVar</span>
                <span class="var-value">= "房间里"</span>
              </div>
              <div
                v-if="step >= 3"
                class="var-item let"
              >
                <span class="var-type">let</span>
                <span class="var-name">blockLet</span>
                <span class="var-value">= "只有房间内能用"</span>
              </div>
            </div>
          </div>
        </div>

        <div class="console-output">
          <div class="console-title">
            控制台输出
          </div>
          <div class="console-lines">
            <div
              v-for="(output, i) in consoleOutput"
              :key="i"
              class="console-line"
              :class="{ error: output.error }"
            >
              {{ output.text }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="controls">
      <button
        :disabled="step === 0"
        class="control-btn"
        @click="prevStep"
      >
        ← 上一步
      </button>
      <span class="step-indicator">{{ step + 1 }} / {{ maxSteps }}</span>
      <button
        :disabled="step === maxSteps"
        class="control-btn"
        @click="nextStep"
      >
        下一步 →
      </button>
      <button
        class="control-btn secondary"
        @click="reset"
      >
        重置
      </button>
    </div>

    <div class="info-box">
      <span class="icon">💡</span>
      <strong>核心思想：</strong>
      <span v-if="step === 0">var 没有块级作用域，会"泄漏"到外部；let 和 const 有块级作用域，只在声明的作用域内有效。</span>
      <span v-else-if="step === 1">var 声明的变量可以在全局作用域访问，容易造成命名冲突。</span>
      <span v-else-if="step === 2">var 可以重复声明，这在大型项目中容易导致难以排查的 bug。</span>
      <span v-else-if="step === 3">let 和 const 有块级作用域，在 if 块外部无法访问，更安全。</span>
      <span v-else>const 声明的变量不能重新赋值，let 可以。推荐优先使用 const，需要重新赋值时用 let。</span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const step = ref(0)
const maxSteps = 5

const codeLines = [
  'var globalVar = "外面"',
  'if (true) {',
  '  var blockVar = "房间里"',
  '  let blockLet = "只有房间内能用"',
  '}',
  '// 尝试访问这些变量'
]

const currentLine = computed(() => {
  const lineMap = [0, 1, 2, 3, 1, 4]
  return lineMap[step.value]
})

const consoleOutput = ref([])

const scenarios = {
  0: { output: [] },
  1: { output: [{ text: 'globalVar = "外面"', error: false }] },
  2: { output: [{ text: 'globalVar = "外面"', error: false }, { text: 'blockVar = "房间里"', error: false }] },
  3: { output: [{ text: 'globalVar = "外面"', error: false }, { text: 'blockVar = "房间里"', error: false }, { text: 'blockLet = "只有房间内能用"', error: false }] },
  4: { output: [{ text: 'globalVar = "外面" ✓', error: false }, { text: 'blockVar = "房间里" ✓ (var 泄漏了！)', error: true }, { text: 'blockLet = 报错！let 不在块外部', error: true }] },
  5: { output: [{ text: '推荐：const name = "值" (不能改)', error: false }, { text: '需要改：let count = 0 (可以改)', error: false }, { text: '避免：var old = "过时了"', error: true }] }
}

const nextStep = () => {
  if (step.value < maxSteps) {
    step.value++
    consoleOutput.value = scenarios[step.value].output
  }
}

const prevStep = () => {
  if (step.value > 0) {
    step.value--
    consoleOutput.value = scenarios[step.value].output
  }
}

const reset = () => {
  step.value = 0
  consoleOutput.value = []
}

const highlightCode = (line) => {
  return line
    .replace(/(var|let|const)/g, '<span class="keyword">$1</span>')
    .replace(/(".+?")/g, '<span class="string">$1</span>')
    .replace(/(\/\/.+)/g, '<span class="comment">$1</span>')
}
</script>

<style scoped>
.variable-scope-demo {
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

.code-display {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1rem;
}

.code-block {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 0.75rem;
  font-family: 'Monaco', 'Menlo', monospace;
  font-size: 0.85rem;
}

.code-line {
  display: flex;
  gap: 0.5rem;
  padding: 0.25rem 0;
  border-radius: 4px;
}

.code-line.active {
  background: var(--vp-c-brand-soft);
}

.line-num {
  color: var(--vp-c-text-3);
  min-width: 1.5rem;
  text-align: right;
}

.line-code :deep(.keyword) { color: #c586c0; }
.line-code :deep(.string) { color: #ce9178; }
.line-code :deep(.comment) { color: #6a9955; }

.visualization {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.scope-area {
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 0.75rem;
  background: var(--vp-c-bg);
}

.scope-title {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.scope-vars {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.var-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  background: var(--vp-c-bg-soft);
  border-radius: 4px;
  font-size: 0.85rem;
  transition: all 0.3s;
}

.var-item.error {
  background: #fee;
  border: 1px solid #fcc;
}

.var-item.let {
  background: #e8f5e9;
  border: 1px solid #c8e6c9;
}

.var-type {
  background: var(--vp-c-brand);
  color: white;
  padding: 0.15rem 0.4rem;
  border-radius: 3px;
  font-size: 0.75rem;
  font-weight: 600;
}

.var-name {
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.var-value {
  color: var(--vp-c-text-2);
  font-family: monospace;
}

.block-scope {
  margin-left: 1rem;
  border-left: 3px solid var(--vp-c-brand);
}

.console-output {
  background: #1e1e1e;
  border-radius: 6px;
  padding: 0.75rem;
  color: #d4d4d4;
  font-family: monospace;
  font-size: 0.85rem;
}

.console-title {
  font-size: 0.75rem;
  color: #888;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
}

.console-line {
  padding: 0.2rem 0;
}

.console-line.error {
  color: #f48771;
}

.controls {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 1rem;
}

.control-btn {
  background: var(--vp-c-brand);
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: opacity 0.2s;
}

.control-btn:hover:not(:disabled) {
  opacity: 0.9;
}

.control-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.control-btn.secondary {
  background: transparent;
  border: 1px solid var(--vp-c-divider);
  color: var(--vp-c-text-1);
}

.step-indicator {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  font-weight: 500;
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
  .code-display {
    grid-template-columns: 1fr;
  }
}
</style>
