<template>
  <div class="functional-unit-demo">
    <div class="demo-label">
      常见功能单元 ── 切换不同模块，查看其实际工作原理
    </div>

    <div class="tabs">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        class="tab-btn"
        :class="{ active: currentTab === tab.id }"
        @click="currentTab = tab.id"
      >
        {{ tab.name }}
      </button>
    </div>

    <div class="demo-content">
      <!-- MUX Demo -->
      <div v-if="currentTab === 'mux'" class="demo-panel">
        <div class="panel-desc">
          <strong>多路选择器 (MUX)</strong
          >：像铁路道岔一样，根据"选择信号"决定让哪一路数据通过。
        </div>
        <div class="mux-container">
          <div class="inputs">
            <div class="input-line">
              <span class="label">数据 0 (D0)</span>
              <button
                class="toggle-btn"
                :class="{ on: muxD0 }"
                @click="muxD0 = !muxD0"
              >
                {{ muxD0 ? '1' : '0' }}
              </button>
            </div>
            <div class="input-line">
              <span class="label">数据 1 (D1)</span>
              <button
                class="toggle-btn"
                :class="{ on: muxD1 }"
                @click="muxD1 = !muxD1"
              >
                {{ muxD1 ? '1' : '0' }}
              </button>
            </div>
          </div>

          <div class="mux-chip">
            <div class="chip-body">MUX</div>
            <div class="select-pin">
              <span class="label">选择 (Sel)</span>
              <button
                class="select-btn"
                :class="{ on: muxSel }"
                @click="muxSel = !muxSel"
              >
                {{ muxSel ? '1' : '0' }}
              </button>
            </div>
          </div>

          <div class="outputs">
            <div class="output-line" :class="{ active: muxResult }">
              <span class="label">输出 (Out)</span>
              <span class="out-val">{{ muxResult ? '1' : '0' }}</span>
            </div>
          </div>
        </div>
        <div class="logic-explain">
          <p>
            当前选择信号为 {{ muxSel ? '1' : '0' }}，因此输出等于 数据
            {{ muxSel ? '1 (D1)' : '0 (D0)' }} 的值：<strong>{{
              muxResult ? '1' : '0'
            }}</strong>
          </p>
        </div>
      </div>

      <!-- Decoder Demo -->
      <div v-if="currentTab === 'decoder'" class="demo-panel">
        <div class="panel-desc">
          <strong>译码器 (Decoder)</strong
          >：将二进制输入转换为特定输出线的激活信号（例如 2位输入可以激活
          4根输出线中的一根）。
        </div>
        <div class="decoder-container">
          <div class="inputs vertical">
            <div class="input-line">
              <button
                class="toggle-btn"
                :class="{ on: decA1 }"
                @click="decA1 = !decA1"
              >
                {{ decA1 ? '1' : '0' }}
              </button>
              <span class="label">A1 (高位)</span>
            </div>
            <div class="input-line">
              <button
                class="toggle-btn"
                :class="{ on: decA0 }"
                @click="decA0 = !decA0"
              >
                {{ decA0 ? '1' : '0' }}
              </button>
              <span class="label">A0 (低位)</span>
            </div>
          </div>

          <div class="decoder-chip">
            <div class="chip-body">2-to-4<br />译码器</div>
          </div>

          <div class="outputs vertical-out">
            <div class="output-line" :class="{ active: decResult === 0 }">
              <span class="out-val">{{ decResult === 0 ? '1' : '0' }}</span>
              <span class="label">Y0 (当输入 00 时)</span>
            </div>
            <div class="output-line" :class="{ active: decResult === 1 }">
              <span class="out-val">{{ decResult === 1 ? '1' : '0' }}</span>
              <span class="label">Y1 (当输入 01 时)</span>
            </div>
            <div class="output-line" :class="{ active: decResult === 2 }">
              <span class="out-val">{{ decResult === 2 ? '1' : '0' }}</span>
              <span class="label">Y2 (当输入 10 时)</span>
            </div>
            <div class="output-line" :class="{ active: decResult === 3 }">
              <span class="out-val">{{ decResult === 3 ? '1' : '0' }}</span>
              <span class="label">Y3 (当输入 11 时)</span>
            </div>
          </div>
        </div>
        <div class="logic-explain">
          <p>
            当前输入为二进制的 {{ decA1 ? '1' : '0'
            }}{{ decA0 ? '1' : '0' }} (十进制 {{ decResult }})，因此只有
            <strong>Y{{ decResult }}</strong> 被激活（输出 1）。
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const tabs = [
  { id: 'mux', name: '多路选择器 (MUX)' },
  { id: 'decoder', name: '译码器 (Decoder)' }
]

const currentTab = ref('mux')

// MUX State
const muxD0 = ref(false)
const muxD1 = ref(true)
const muxSel = ref(false)
const muxResult = computed(() => (muxSel.value ? muxD1.value : muxD0.value))

// Decoder State
const decA1 = ref(false)
const decA0 = ref(false)
const decResult = computed(() => (decA1.value ? 2 : 0) + (decA0.value ? 1 : 0))
</script>

<style scoped>
.functional-unit-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  padding: 1rem 1.2rem;
  margin: 1rem 0;
}

.demo-label {
  font-size: 0.78rem;
  font-weight: bold;
  color: var(--vp-c-text-2);
  margin-bottom: 0.75rem;
  letter-spacing: 0.2px;
}

.tabs {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
  border-bottom: 1px solid var(--vp-c-divider);
  padding-bottom: 0.5rem;
}

.tab-btn {
  padding: 0.4rem 0.8rem;
  font-size: 0.85rem;
  border-radius: 4px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  color: var(--vp-c-text-2);
  cursor: pointer;
  transition: all 0.2s;
}

.tab-btn:hover {
  border-color: var(--vp-c-brand-1);
}

.tab-btn.active {
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  border-color: var(--vp-c-brand-1);
  font-weight: bold;
}

.panel-desc {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  margin-bottom: 1rem;
}

/* common elements */
.toggle-btn {
  width: 2rem;
  height: 2rem;
  border-radius: 4px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  font-weight: bold;
  font-family: monospace;
  cursor: pointer;
  transition: all 0.2s;
}
.toggle-btn.on {
  background: var(--vp-c-green-soft, #dcfce7);
  color: var(--vp-c-green-1, #16a34a);
  border-color: var(--vp-c-green-1, #16a34a);
}

.out-val {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border-radius: 4px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  font-weight: bold;
  font-family: monospace;
}
.output-line.active .out-val {
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  border-color: var(--vp-c-brand-1);
}
.output-line.active .label {
  color: var(--vp-c-brand-1);
  font-weight: bold;
}

.logic-explain {
  margin-top: 1rem;
  padding: 0.8rem;
  background: var(--vp-c-bg);
  border-radius: 6px;
  font-size: 0.85rem;
  text-align: center;
  color: var(--vp-c-text-2);
}

/* MUX Layout */
.mux-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  padding: 1rem;
}

.inputs {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.input-line {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.label {
  font-size: 0.8rem;
  color: var(--vp-c-text-3);
  font-variant-numeric: tabular-nums;
}

.mux-chip {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.chip-body {
  width: 4rem;
  height: 6rem;
  background: var(--vp-c-bg-alt);
  border: 2px solid var(--vp-c-divider);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  clip-path: polygon(0 0, 100% 20%, 100% 80%, 0 100%);
}

.select-pin {
  position: absolute;
  bottom: -2.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.3rem;
}

.select-btn {
  width: 2rem;
  height: 1.5rem;
  border-radius: 4px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  font-size: 0.8rem;
  cursor: pointer;
}
.select-btn.on {
  background: #fef08a; /* yellow soft */
  color: #a16207;
  border-color: #a16207;
}

/* Decoder Layout */
.decoder-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  padding: 1rem;
}

.inputs.vertical,
.outputs.vertical-out {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.decoder-chip .chip-body {
  width: 5rem;
  height: 8rem;
  background: var(--vp-c-bg-alt);
  border: 2px solid var(--vp-c-divider);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  text-align: center;
  clip-path: none;
  border-radius: 4px;
}
</style>
