<template>
  <div class="register-demo">
    <div class="demo-header">
      <span class="title">寄存器：能「记住」一个 0 或 1 的小单元</span>
      <span class="subtitle">只有点「写入」时才会把当前输入记下来，平时改输入不会影响已存的值</span>
    </div>

    <div class="why-what-box">
      <p class="why-p">
        <strong>为啥要看这个？</strong>CPU 算到一半要暂时「记住」中间结果，寄存器就是干这个的。它和「直接连线」不同：改输入不会立刻改变里面存的东西，必须主动点一次「写入」才会更新。
      </p>
      <p class="what-p">
        <strong>这些词是啥？</strong>
        <span class="term">输入</span>：你想写进去的 0 或 1。
        <span class="term">写入</span>：点一下，把当前输入「锁进」寄存器。
        <span class="term">存储值</span>：寄存器里现在记着的数（只有写入时才会变）。
        <span class="term">输出</span>：从寄存器读出来的数，和存储值一样。
      </p>
    </div>

    <div class="control-panel">
      <label class="ctrl-group">
        <span class="ctrl-label">输入</span>
        <button
          class="input-toggle"
          :class="{ on: inputData === 1 }"
          @click="inputData = inputData === 1 ? 0 : 1"
        >
          {{ inputData }}
        </button>
      </label>
      <button class="write-btn" :class="{ flash: isWriting }" @click="writeOnce">
        写入
      </button>
      <label class="ctrl-group">
        <span class="ctrl-label">存储</span>
        <span class="stored-val" :class="{ on: storedData === 1 }">{{ storedData }}</span>
      </label>
      <span class="ctrl-group">
        <span class="ctrl-label">输出</span>
        <span class="output-val" :class="{ on: storedData === 1 }">{{ storedData }}</span>
      </span>
    </div>

    <div class="visualization-area">
      <div class="flow-strip">
        <span class="flow-item">输入 {{ inputData }}</span>
        <span class="flow-arrow" :class="{ active: isWriting }">{{ isWriting ? '写入中 →' : '— 点「写入」才更新 →' }}</span>
        <span class="flow-item flow-store" :class="{ flash: isWriting }">存 {{ storedData }}</span>
      </div>
      <p class="flow-hint">
        {{ inputData !== storedData ? '输入和存储不一样：点「写入」会把当前输入记进去。' : '输入和存储已一致。' }}
      </p>
    </div>

    <div class="info-box">
      <strong>核心思想：</strong>寄存器只在「写入」那一刻更新，其余时间一直保持原来的值，所以 CPU 能稳定保存中间结果。
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const inputData = ref(0)
const storedData = ref(0)
const isWriting = ref(false)

const writeOnce = () => {
  isWriting.value = true
  storedData.value = inputData.value
  window.setTimeout(() => {
    isWriting.value = false
  }, 400)
}
</script>

<style scoped>
.register-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  padding: 1rem;
  margin: 1rem 0;
}

.demo-header {
  margin-bottom: 0.5rem;
}

.demo-header .title {
  display: block;
  font-weight: bold;
  font-size: 1rem;
}

.demo-header .subtitle {
  display: block;
  font-size: 0.82rem;
  color: var(--vp-c-text-2);
  font-weight: normal;
}

.why-what-box {
  background: var(--vp-c-bg-alt);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 0.65rem 0.85rem;
  margin-bottom: 0.75rem;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  line-height: 1.55;
}

.why-what-box .why-p {
  margin: 0 0 0.4rem;
}

.why-what-box .what-p {
  margin: 0;
}

.why-what-box .term {
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.control-panel {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.6rem;
  padding: 0.5rem 0.7rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg);
  margin-bottom: 0.75rem;
}

.ctrl-group {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
}

.ctrl-label {
  font-size: 0.82rem;
  color: var(--vp-c-text-2);
}

.input-toggle {
  width: 2.2rem;
  height: 2.2rem;
  border-radius: 6px;
  border: 2px solid var(--vp-c-divider);
  background: var(--vp-c-bg-alt);
  font-weight: bold;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s;
}

.input-toggle.on {
  border-color: var(--vp-c-brand);
  color: var(--vp-c-brand);
  background: var(--vp-c-brand-soft);
}

.write-btn {
  padding: 0.35rem 0.8rem;
  border-radius: 6px;
  border: 2px solid var(--vp-c-warning-1, #d97706);
  background: var(--vp-c-bg);
  color: var(--vp-c-warning-1, #d97706);
  font-size: 0.85rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s;
}

.write-btn:hover {
  background: var(--vp-c-warning-soft, rgba(217, 119, 6, 0.1));
}

.write-btn.flash {
  background: var(--vp-c-warning-1, #d97706);
  color: white;
}

.stored-val,
.output-val {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 2rem;
  height: 2rem;
  padding: 0 0.4rem;
  border-radius: 6px;
  border: 2px solid var(--vp-c-divider);
  background: var(--vp-c-bg-alt);
  font-weight: bold;
  font-family: monospace;
  font-size: 1rem;
}

.stored-val.on,
.output-val.on {
  border-color: var(--vp-c-brand);
  color: var(--vp-c-brand);
  background: var(--vp-c-brand-soft);
}

.visualization-area {
  margin-bottom: 0.75rem;
}

.flow-strip {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.4rem;
  padding: 0.6rem 0.8rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg);
  font-size: 0.9rem;
}

.flow-item {
  font-weight: bold;
}

.flow-store {
  color: var(--vp-c-brand);
}

.flow-store.flash {
  box-shadow: 0 0 0 2px var(--vp-c-warning-1);
  border-radius: 4px;
}

.flow-arrow {
  color: var(--vp-c-text-3);
  font-size: 0.82rem;
}

.flow-arrow.active {
  color: var(--vp-c-warning-1);
  font-weight: bold;
}

.flow-hint {
  margin: 0.4rem 0 0;
  font-size: 0.82rem;
  color: var(--vp-c-text-2);
}

.info-box {
  display: flex;
  gap: 0.25rem;
  background: var(--vp-c-bg-alt);
  padding: 0.75rem;
  border-radius: 6px;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

.info-box strong {
  white-space: nowrap;
  flex-shrink: 0;
}

@media (max-width: 520px) {
  .control-panel {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
