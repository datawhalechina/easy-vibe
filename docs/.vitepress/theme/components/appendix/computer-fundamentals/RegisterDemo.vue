<template>
  <div class="register-demo">
    <div class="demo-header">
      <span class="title">寄存器：存储状态的功能单元</span>
      <span class="subtitle">改变输入不会改变存储值——必须主动"写入"</span>
    </div>

    <div class="control-panel">
      <div class="control-left">
        <span class="ctrl-label">输入值</span>
        <button
          class="input-toggle"
          :class="{ on: inputData === 1 }"
          @click="inputData = inputData === 1 ? 0 : 1"
        >
          {{ inputData }}
        </button>
      </div>
      <button class="write-btn" :class="{ flash: isWriting }" @click="writeOnce">
        写入寄存器 →
      </button>
      <div class="control-right">
        <span class="chip">存储值：{{ storedData }}</span>
        <span class="chip" :class="{ chip_on: storedData === 1 }">输出：{{ storedData === 1 ? '1 ✓' : '0' }}</span>
      </div>
    </div>

    <div class="demo-content">
      <div class="flow-diagram">
        <div class="flow-node input-node">
          <div class="node-label">输入（Data）</div>
          <div class="node-value" :class="{ on: inputData === 1 }">{{ inputData }}</div>
          <div class="node-hint">点左侧按钮切换</div>
        </div>

        <div class="flow-arrow" :class="{ active: isWriting }">
          <div class="arrow-line" />
          <div class="arrow-tag">{{ isWriting ? '写入中...' : '写入触发' }}</div>
          <div class="arrow-head">→</div>
        </div>

        <div class="flow-node register-node" :class="{ flashing: isWriting }">
          <div class="node-label">D 触发器（寄存器核心）</div>
          <div class="node-value" :class="{ on: storedData === 1 }">{{ storedData }}</div>
          <div class="node-hint">{{ isWriting ? '正在锁存...' : '保持 (Hold)' }}</div>
        </div>

        <div class="flow-arrow" :class="{ active: storedData === 1 }">
          <div class="arrow-line" />
          <div class="arrow-tag">输出</div>
          <div class="arrow-head">→</div>
        </div>

        <div class="flow-node output-node" :class="{ on: storedData === 1 }">
          <div class="node-label">输出（Output）</div>
          <div class="bulb">{{ storedData === 1 ? '💡' : '🌑' }}</div>
          <div class="node-hint">{{ storedData === 1 ? '亮（1）' : '灭（0）' }}</div>
        </div>
      </div>

      <div class="state-table">
        <div class="table-title">操作步骤说明</div>
        <div class="state-rows">
          <div class="state-row">
            <span class="step-num">①</span>
            <span>点"输入值"按钮切换输入（0/1）</span>
          </div>
          <div class="state-row">
            <span class="step-num">②</span>
            <span>此时存储值<strong>不变</strong>——这就是寄存器的意义</span>
          </div>
          <div class="state-row">
            <span class="step-num">③</span>
            <span>点"写入寄存器"，输入值才被锁入</span>
          </div>
          <div class="state-row">
            <span class="step-num">④</span>
            <span>写入后再改输入，存储值依然<strong>保持</strong>不变</span>
          </div>
        </div>

        <div class="diff-display">
          <div class="diff-item">
            <div class="diff-label">当前输入</div>
            <div class="diff-value" :class="{ on: inputData === 1 }">{{ inputData }}</div>
          </div>
          <div class="diff-sep">≠</div>
          <div class="diff-item">
            <div class="diff-label">存储值</div>
            <div class="diff-value" :class="{ on: storedData === 1 }">{{ storedData }}</div>
          </div>
          <div v-if="inputData === storedData" class="diff-same">（当前相同）</div>
        </div>
      </div>
    </div>

    <div class="info-box">
      <strong>核心思想：</strong>寄存器只在"写入"信号触发时更新，其余时刻持续锁定当前值。这就是 CPU 能在计算过程中稳定保存中间结果的原因。
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
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.8rem;
  flex-wrap: wrap;
}

.demo-header .title {
  font-weight: bold;
  font-size: 1rem;
}

.demo-header .subtitle {
  color: var(--vp-c-text-2);
  font-size: 0.82rem;
  margin-left: 0.5rem;
}

/* ---- control panel ---- */
.control-panel {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  padding: 0.6rem 0.75rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg);
  margin-bottom: 0.8rem;
  flex-wrap: wrap;
}

.control-left {
  display: flex;
  align-items: center;
  gap: 0.45rem;
}

.ctrl-label {
  font-size: 0.82rem;
  color: var(--vp-c-text-2);
}

.input-toggle {
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
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
  padding: 0.3rem 0.75rem;
  border-radius: 999px;
  border: 2px solid var(--vp-c-warning);
  background: var(--vp-c-bg);
  color: var(--vp-c-warning-1, #d97706);
  font-size: 0.82rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;
}

.write-btn:hover {
  background: var(--vp-c-warning-soft);
}

.write-btn.flash {
  background: var(--vp-c-warning);
  color: white;
  transform: scale(0.96);
}

.control-right {
  display: flex;
  gap: 0.4rem;
  flex-wrap: wrap;
  margin-left: auto;
}

.chip {
  font-size: 0.78rem;
  padding: 0.2rem 0.45rem;
  border-radius: 999px;
  background: var(--vp-c-bg-alt);
  border: 1px solid var(--vp-c-divider);
}

.chip_on {
  border-color: var(--vp-c-brand);
  color: var(--vp-c-brand);
}

/* ---- main content ---- */
.demo-content {
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: 0.8rem;
}

/* ---- flow diagram ---- */
.flow-diagram {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg);
  padding: 0.8rem;
  display: flex;
  align-items: center;
  gap: 0.3rem;
  flex-wrap: nowrap;
  overflow-x: auto;
}

.flow-node {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.3rem;
  flex-shrink: 0;
}

.node-label {
  font-size: 0.72rem;
  color: var(--vp-c-text-2);
  text-align: center;
}

.node-value {
  width: 2.4rem;
  height: 2.4rem;
  border-radius: 8px;
  border: 2px solid var(--vp-c-divider);
  background: var(--vp-c-bg-alt);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  font-weight: bold;
  font-family: monospace;
  transition: all 0.3s;
}

.node-value.on {
  border-color: var(--vp-c-brand);
  color: var(--vp-c-brand);
  background: var(--vp-c-brand-soft);
}

.node-hint {
  font-size: 0.7rem;
  color: var(--vp-c-text-3);
}

.register-node .node-value {
  width: 3rem;
  height: 3rem;
  font-size: 1.5rem;
  border: 3px solid var(--vp-c-text-1);
}

.register-node.flashing .node-value {
  border-color: var(--vp-c-warning);
  box-shadow: 0 0 10px var(--vp-c-warning-soft);
}

.bulb {
  font-size: 1.8rem;
  filter: grayscale(100%);
  opacity: 0.4;
  transition: all 0.3s;
}

.output-node.on .bulb {
  filter: grayscale(0%);
  opacity: 1;
  text-shadow: 0 0 12px #facc15;
}

/* ---- arrows ---- */
.flow-arrow {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.2rem;
  flex-shrink: 0;
}

.arrow-line {
  width: 28px;
  height: 2px;
  background: var(--vp-c-divider);
  transition: background 0.3s;
}

.flow-arrow.active .arrow-line {
  background: var(--vp-c-brand);
}

.arrow-tag {
  font-size: 0.65rem;
  color: var(--vp-c-text-3);
  white-space: nowrap;
}

.arrow-head {
  font-size: 0.8rem;
  color: var(--vp-c-text-3);
}

/* ---- state table ---- */
.state-table {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg);
  padding: 0.8rem;
}

.table-title {
  font-weight: bold;
  font-size: 0.85rem;
  margin-bottom: 0.6rem;
}

.state-rows {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.state-row {
  display: flex;
  align-items: flex-start;
  gap: 0.4rem;
  font-size: 0.78rem;
  color: var(--vp-c-text-2);
}

.step-num {
  flex-shrink: 0;
  font-weight: bold;
  color: var(--vp-c-brand);
}

.diff-display {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.75rem;
  padding: 0.5rem;
  background: var(--vp-c-bg-alt);
  border-radius: 6px;
}

.diff-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.2rem;
}

.diff-label {
  font-size: 0.7rem;
  color: var(--vp-c-text-2);
}

.diff-value {
  width: 1.6rem;
  height: 1.6rem;
  border-radius: 4px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-family: monospace;
}

.diff-value.on {
  border-color: var(--vp-c-brand);
  color: var(--vp-c-brand);
  background: var(--vp-c-brand-soft);
}

.diff-sep {
  font-size: 1.1rem;
  color: var(--vp-c-text-3);
  font-weight: bold;
}

.diff-same {
  font-size: 0.72rem;
  color: var(--vp-c-text-3);
}

/* ---- info box ---- */
.info-box {
  background: var(--vp-c-bg-alt);
  padding: 0.75rem;
  border-radius: 6px;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  margin-top: 0.8rem;
  display: flex;
  gap: 0.25rem;
}

.info-box strong {
  white-space: nowrap;
  flex-shrink: 0;
}

@media (max-width: 760px) {
  .demo-content {
    grid-template-columns: 1fr;
  }
}
</style>
