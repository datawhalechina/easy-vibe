<!--
  NeuronDemo.vue
  神经元结构演示：展示单个神经元的工作原理
-->
<template>
  <div class="neuron-demo">
    <div class="header">
      <div class="title">神经元工作原理</div>
      <div class="subtitle">调整输入和权重，观察神经元的输出变化</div>
    </div>

    <div class="neuron-layout">
      <div class="inputs-col">
        <div class="col-label">输入 × 权重</div>
        <div v-for="(inp, i) in inputs" :key="i" class="input-row">
          <div class="input-pair">
            <label>x{{ i + 1 }}</label>
            <input v-model.number="inp.value" type="range" min="-1" max="1" step="0.1" />
            <span class="val">{{ inp.value.toFixed(1) }}</span>
          </div>
          <span class="multiply">×</span>
          <div class="input-pair">
            <label>w{{ i + 1 }}</label>
            <input v-model.number="inp.weight" type="range" min="-2" max="2" step="0.1" />
            <span class="val">{{ inp.weight.toFixed(1) }}</span>
          </div>
          <span class="equals">=</span>
          <span class="partial">{{ (inp.value * inp.weight).toFixed(2) }}</span>
        </div>
      </div>

      <div class="output-col">
        <div class="sum-box">
          <div class="sum-label">加权求和 + 偏置({{ bias.toFixed(1) }})</div>
          <div class="sum-value">{{ weightedSum.toFixed(2) }}</div>
        </div>
        <div class="arrow">↓</div>
        <div class="activation-box">
          <div class="act-label">激活函数: {{ activationName }}</div>
          <div class="act-value">{{ activationOutput.toFixed(4) }}</div>
        </div>
        <div class="controls">
          <div class="control-row">
            <label>偏置 b</label>
            <input v-model.number="bias" type="range" min="-2" max="2" step="0.1" />
            <span class="val">{{ bias.toFixed(1) }}</span>
          </div>
          <div class="control-row">
            <label>激活函数</label>
            <select v-model="activation">
              <option value="sigmoid">Sigmoid</option>
              <option value="relu">ReLU</option>
              <option value="tanh">Tanh</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'

const inputs = reactive([
  { value: 0.5, weight: 0.8 },
  { value: -0.3, weight: 1.2 },
  { value: 0.7, weight: -0.5 }
])

const bias = ref(0.1)
const activation = ref('sigmoid')

const activationName = computed(() => {
  const names = { sigmoid: 'Sigmoid', relu: 'ReLU', tanh: 'Tanh' }
  return names[activation.value]
})

const weightedSum = computed(() => {
  return inputs.reduce((sum, inp) => sum + inp.value * inp.weight, 0) + bias.value
})

const activationOutput = computed(() => {
  const z = weightedSum.value
  switch (activation.value) {
    case 'sigmoid': return 1 / (1 + Math.exp(-z))
    case 'relu': return Math.max(0, z)
    case 'tanh': return Math.tanh(z)
    default: return z
  }
})
</script>

<style scoped>
.neuron-demo {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  padding: 1.5rem;
  margin: 1.5rem 0;
}
.header { margin-bottom: 1rem; }
.title { font-weight: 700; font-size: 1.1rem; }
.subtitle { color: var(--vp-c-text-2); font-size: 0.9rem; }
.neuron-layout {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 1rem;
}
@media (max-width: 640px) {
  .neuron-layout { grid-template-columns: 1fr; }
}
.col-label {
  font-weight: 600;
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.5rem;
}
.input-row {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  margin-bottom: 0.4rem;
  font-size: 0.78rem;
}
.input-pair {
  display: flex;
  align-items: center;
  gap: 0.2rem;
}
.input-pair label {
  font-weight: 600;
  font-size: 0.72rem;
  color: var(--vp-c-text-3);
  min-width: 18px;
}
.input-pair input[type="range"] { width: 60px; }
.val {
  font-family: var(--vp-font-family-mono);
  font-size: 0.72rem;
  min-width: 28px;
  text-align: right;
}
.multiply, .equals {
  color: var(--vp-c-text-3);
  font-weight: 600;
}
.partial {
  font-family: var(--vp-font-family-mono);
  font-weight: 600;
  color: var(--vp-c-brand);
  min-width: 40px;
  text-align: right;
}
.output-col {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.4rem;
}
.sum-box, .activation-box {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 0.5rem 0.8rem;
  text-align: center;
  width: 100%;
}
.sum-label, .act-label {
  font-size: 0.72rem;
  color: var(--vp-c-text-3);
}
.sum-value, .act-value {
  font-size: 1.1rem;
  font-weight: 700;
  font-family: var(--vp-font-family-mono);
  color: var(--vp-c-brand);
}
.arrow { color: var(--vp-c-text-3); font-size: 1.2rem; }
.controls { width: 100%; margin-top: 0.5rem; }
.control-row {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.78rem;
  margin-bottom: 0.3rem;
}
.control-row label {
  font-weight: 600;
  color: var(--vp-c-text-2);
  min-width: 55px;
  font-size: 0.72rem;
}
.control-row select {
  padding: 0.2rem 0.4rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  font-size: 0.78rem;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
}
</style>
