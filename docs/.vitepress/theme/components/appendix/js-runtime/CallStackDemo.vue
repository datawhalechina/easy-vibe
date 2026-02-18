<script setup>
import { ref } from 'vue'

const isAnimating = ref(false)
const currentStep = ref(0)
const callStack = ref([])
const output = ref([])

const codeSteps = [
  { action: 'push', function: 'main', description: '调用 main()', code: 'main()' },
  { action: 'push', function: 'a', description: 'main() 调用 a()', code: 'function a() {' },
  { action: 'push', function: 'b', description: 'a() 调用 b()', code: 'function b() {' },
  { action: 'push', function: 'c', description: 'b() 调用 c()', code: 'function c() {' },
  { action: 'log', function: 'c', description: 'c() 执行 console.log', code: 'console.log("执行完毕")', output: '执行完毕' },
  { action: 'pop', function: 'c', description: 'c() 执行完成,从栈中弹出', code: '}' },
  { action: 'pop', function: 'b', description: 'b() 执行完成,从栈中弹出', code: '}' },
  { action: 'pop', function: 'a', description: 'a() 执行完成,从栈中弹出', code: '}' },
  { action: 'pop', function: 'main', description: 'main() 执行完成,从栈中弹出', code: '}' }
]

const reset = () => {
  currentStep.value = 0
  callStack.value = []
  output.value = []
  isAnimating.value = false
}

const nextStep = () => {
  if (currentStep.value >= codeSteps.length) return

  const step = codeSteps[currentStep.value]

  if (step.action === 'push') {
    callStack.value.push({
      function: step.function,
      code: step.code,
      active: true
    })
    // 标记之前的为非活动
    callStack.value.forEach((item, index) => {
      if (index < callStack.value.length - 1) {
        item.active = false
      }
    })
  } else if (step.action === 'pop') {
    callStack.value.pop()
    // 标记新的顶部为活动
    if (callStack.value.length > 0) {
      callStack.value[callStack.value.length - 1].active = true
    }
  } else if (step.action === 'log') {
    output.value.push(step.output)
  }

  currentStep.value++
}

const play = async () => {
  if (isAnimating.value) return
  isAnimating.value = true
  reset()

  while (currentStep.value < codeSteps.length && isAnimating.value) {
    nextStep()
    await new Promise(resolve => setTimeout(resolve, 1200))
  }

  isAnimating.value = false
}

const stop = () => {
  isAnimating.value = false
}
</script>

<template>
  <div class="call-stack-demo">
    <h3>调用栈:函数执行的足迹</h3>

    <div class="demo-layout">
      <!-- 代码显示 -->
      <div class="code-section">
        <h4>代码</h4>
        <div class="code-display">
          <div
            v-for="(step, index) in codeSteps"
            :key="index"
            class="code-line"
            :class="{
              'current': currentStep === index,
              'executed': currentStep > index
            }"
          >
            <span class="line-number">{{ index + 1 }}</span>
            <span class="line-code">{{ step.code }}</span>
          </div>
        </div>
      </div>

      <!-- 调用栈可视化 -->
      <div class="stack-section">
        <h4>调用栈</h4>
        <div class="stack-container">
          <div class="stack-base">
            <div class="stack-label">
              栈底
            </div>
          </div>

          <div class="stack-frames">
            <transition-group name="stack-frame">
              <div
                v-for="(frame, index) in callStack"
                :key="`${frame.function}-${index}`"
                class="stack-frame"
                :class="{ 'active': frame.active }"
                :style="{ bottom: `${index * 60}px` }"
              >
                <div class="frame-function">
                  {{ frame.function }}()
                </div>
                <div class="frame-code">
                  {{ frame.code }}
                </div>
              </div>
            </transition-group>

            <div
              v-if="callStack.length === 0"
              class="empty-stack"
            >
              栈为空
            </div>
          </div>

          <div class="stack-top">
            <div class="stack-label">
              栈顶
            </div>
          </div>
        </div>

        <div class="stack-explanation">
          <p><strong>当前状态:</strong></p>
          <p v-if="currentStep < codeSteps.length">
            {{ codeSteps[currentStep]?.description }}
          </p>
          <p v-else>
            执行完成
          </p>
        </div>
      </div>
    </div>

    <!-- 输出显示 -->
    <div class="output-section">
      <h4>输出</h4>
      <div class="output-container">
        <div
          v-if="output.length === 0"
          class="empty-output"
        >
          等待输出...
        </div>
        <transition-group name="output">
          <div
            v-for="(log, index) in output"
            :key="`log-${index}`"
            class="output-line"
          >
            {{ log }}
          </div>
        </transition-group>
      </div>
    </div>

    <!-- 控制按钮 -->
    <div class="controls">
      <button
        :disabled="isAnimating"
        class="btn-play"
        @click="play"
      >
        {{ isAnimating ? '执行中...' : '▶ 自动演示' }}
      </button>
      <button
        :disabled="isAnimating || currentStep >= codeSteps.length"
        class="btn-step"
        @click="nextStep"
      >
        ⏭ 单步执行
      </button>
      <button
        :disabled="!isAnimating"
        class="btn-stop"
        @click="stop"
      >
        ⏸ 停止
      </button>
      <button
        :disabled="isAnimating"
        class="btn-reset"
        @click="reset"
      >
        🔄 重置
      </button>
    </div>

    <!-- 说明 -->
    <div class="explanation-box">
      <p><strong>调用栈工作原理:</strong></p>
      <ul>
        <li>每次调用函数,就会在栈上"压入"一个新的"栈帧"</li>
        <li>栈帧记录了函数的执行状态、局部变量等信息</li>
        <li>函数执行完毕,栈帧就会从栈上"弹出"</li>
        <li>栈是"后进先出"(LIFO)的数据结构</li>
        <li>如果递归太深,会导致"栈溢出"错误</li>
      </ul>
      <p class="highlight">
        调用栈就像一摞盘子:最后放上去的盘子最先被取走。每个函数就是一个盘子,执行完就取走,然后继续执行下面的函数。
      </p>
    </div>
  </div>
</template>

<style scoped>
.call-stack-demo {
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
  margin: 0 0 12px 0;
  font-size: 14px;
  font-weight: 600;
  color: var(--vp-c-text-2);
}

.demo-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin-bottom: 20px;
}

@media (max-width: 1024px) {
  .demo-layout {
    grid-template-columns: 1fr;
  }
}

.code-section,
.stack-section {
  border: 2px solid var(--vp-c-border);
  border-radius: 8px;
  padding: 16px;
  background: var(--vp-c-bg-soft);
}

.code-display {
  background: #1e1e1e;
  border-radius: 6px;
  padding: 12px;
  font-family: 'Courier New', monospace;
}

.code-line {
  display: flex;
  gap: 12px;
  padding: 6px 8px;
  border-radius: 4px;
  transition: all 0.3s ease;
}

.code-line.current {
  background: rgba(62, 175, 124, 0.2);
  border-left: 3px solid var(--vp-c-brand-1);
}

.code-line.executed {
  opacity: 0.5;
}

.line-number {
  color: #858585;
  font-size: 12px;
  min-width: 20px;
  text-align: right;
  user-select: none;
}

.line-code {
  color: #d4d4d4;
  font-size: 13px;
}

.stack-container {
  position: relative;
  height: 350px;
  background: var(--vp-c-bg);
  border-radius: 8px;
  padding: 12px;
  margin-top: 12px;
}

.stack-base,
.stack-top {
  display: flex;
  justify-content: center;
  padding: 8px;
  background: var(--vp-c-bg-soft);
  border-radius: 4px;
  margin-bottom: 8px;
}

.stack-top {
  margin-top: 8px;
  margin-bottom: 0;
}

.stack-label {
  font-size: 12px;
  font-weight: 600;
  color: var(--vp-c-text-2);
}

.stack-frames {
  position: relative;
  flex: 1;
}

.stack-frame {
  position: absolute;
  left: 12px;
  right: 12px;
  padding: 12px;
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-border);
  border-radius: 6px;
  transition: all 0.4s ease;
}

.stack-frame.active {
  border-color: var(--vp-c-brand-1);
  background: rgba(62, 175, 124, 0.1);
  box-shadow: 0 0 0 3px rgba(62, 175, 124, 0.1);
}

.stack-frame-enter-active,
.stack-frame-leave-active {
  transition: all 0.4s ease;
}

.stack-frame-enter-from {
  opacity: 0;
  transform: translateY(-20px);
}

.stack-frame-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

.frame-function {
  font-size: 14px;
  font-weight: 600;
  color: var(--vp-c-brand-1);
  margin-bottom: 4px;
  font-family: 'Courier New', monospace;
}

.frame-code {
  font-size: 11px;
  color: var(--vp-c-text-2);
  font-family: 'Courier New', monospace;
}

.empty-stack {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: var(--vp-c-text-3);
  font-size: 14px;
}

.stack-explanation {
  margin-top: 12px;
  padding: 12px;
  background: rgba(62, 175, 124, 0.1);
  border-radius: 6px;
}

.stack-explanation p {
  margin: 0;
  font-size: 13px;
  line-height: 1.6;
  color: var(--vp-c-text-1);
}

.stack-explanation strong {
  color: var(--vp-c-brand-1);
}

.output-section {
  margin-bottom: 20px;
}

.output-container {
  min-height: 60px;
  padding: 12px;
  border: 2px solid var(--vp-c-border);
  border-radius: 8px;
  background: var(--vp-c-bg);
}

.empty-output {
  color: var(--vp-c-text-3);
  font-size: 14px;
}

.output-line {
  padding: 8px 12px;
  margin-bottom: 8px;
  background: var(--vp-c-brand-1);
  color: white;
  border-radius: 6px;
  font-size: 14px;
  font-family: 'Courier New', monospace;
  animation: slideIn 0.3s ease;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.output-enter-active,
.output-leave-active {
  transition: all 0.3s ease;
}

.output-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}

.output-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

.controls {
  display: flex;
  gap: 12px;
  justify-content: center;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

button {
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

button:active {
  transform: scale(0.95);
}

.btn-play {
  background: var(--vp-c-brand-1);
  color: white;
}

.btn-play:hover:not(:disabled) {
  background: var(--vp-c-brand-2);
}

.btn-step {
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
}

.btn-step:hover:not(:disabled) {
  background: var(--vp-c-bg-soft-hover);
}

.btn-stop {
  background: #ed8936;
  color: white;
}

.btn-stop:hover:not(:disabled) {
  background: #dd6b20;
}

.btn-reset {
  background: #f56565;
  color: white;
}

.btn-reset:hover:not(:disabled) {
  background: #e53e3e;
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.explanation-box {
  background: var(--vp-c-bg-soft);
  border-left: 4px solid var(--vp-c-brand-1);
  border-radius: 8px;
  padding: 16px;
}

.explanation-box p {
  margin: 0 0 12px 0;
  font-size: 14px;
  line-height: 1.6;
  color: var(--vp-c-text-1);
}

.explanation-box p:last-child {
  margin-bottom: 0;
}

.explanation-box strong {
  color: var(--vp-c-brand-1);
}

.explanation-box ul {
  margin: 12px 0;
  padding-left: 20px;
}

.explanation-box li {
  margin-bottom: 8px;
  font-size: 14px;
  color: var(--vp-c-text-2);
}

.explanation-box .highlight {
  padding: 12px;
  background: rgba(62, 175, 124, 0.1);
  border-radius: 6px;
  font-weight: 500;
  color: var(--vp-c-brand-1);
}
</style>
