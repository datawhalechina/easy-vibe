<template>
  <div class="demo-card">
    <div class="perceptron-layout">
      <div class="inputs-col">
        <div class="input-node" v-for="inp in inputs" :key="inp.label">
          <span class="node-circle">{{ inp.val }}</span>
          <span class="node-label">{{ inp.label }}</span>
        </div>
      </div>
      <div class="weights-col">
        <div class="weight-arrow" v-for="inp in inputs" :key="inp.label">
          <span class="arrow">→</span>
          <span class="w-tag">×{{ inp.weight }}</span>
        </div>
      </div>
      <div class="neuron-col">
        <div class="neuron-circle">
          <div class="n-sym">Σ</div>
          <div class="n-val">{{ sum }}</div>
        </div>
        <span class="bias-tag">偏置 {{ bias }}</span>
      </div>
      <div class="act-col">
        <span class="arrow big">→</span>
        <div class="act-box">sum &gt; 0 ?</div>
        <span class="arrow big">→</span>
      </div>
      <div class="output-col">
        <div class="output-node" :class="{ on: output === 1 }">
          <span class="out-val">{{ output }}</span>
          <span class="out-lbl">{{ output ? '激活' : '静默' }}</span>
        </div>
      </div>
    </div>
    <div class="caption">
      ① 输入特征&emsp;② 乘以权重（重要性）&emsp;③ 求和 + 偏置&emsp;④ 超过阈值就激活输出 1，否则输出 0
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
const inputs = [{ label: '特征 x₁', val: 1, weight: 0.6 }, { label: '特征 x₂', val: 0, weight: 0.4 }]
const bias = -0.3
const sum = computed(() => Number((inputs.reduce((s, i) => s + i.val * i.weight, 0) + bias).toFixed(2)))
const output = computed(() => sum.value > 0 ? 1 : 0)
</script>

<style scoped>
.demo-card { border: 1px solid var(--vp-c-divider); border-radius: 8px; background: var(--vp-c-bg-soft); padding: 1.25rem; margin: 1rem 0; }
.perceptron-layout { display: flex; align-items: center; justify-content: center; gap: 0.5rem; background: var(--vp-c-bg); border: 1px solid var(--vp-c-divider); border-radius: 6px; padding: 1.2rem 0.8rem; flex-wrap: wrap; }
.inputs-col, .weights-col, .neuron-col, .act-col, .output-col { display: flex; flex-direction: column; align-items: center; gap: 1rem; }
.input-node { display: flex; flex-direction: column; align-items: center; gap: 0.2rem; }
.node-circle { width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; background: var(--vp-c-brand-soft); border: 2px solid var(--vp-c-brand); color: var(--vp-c-brand-1); }
.node-label { font-size: 0.62rem; color: var(--vp-c-text-2); }
.weight-arrow { display: flex; align-items: center; gap: 0.3rem; }
.arrow { color: var(--vp-c-text-3); font-size: 1.1rem; }
.arrow.big { font-size: 1.4rem; }
.w-tag { font-size: 0.72rem; font-weight: bold; font-family: monospace; background: var(--vp-c-bg-alt); border: 1px solid var(--vp-c-divider); padding: 0.1rem 0.4rem; border-radius: 4px; color: var(--vp-c-brand-1); }
.neuron-circle { width: 64px; height: 64px; border-radius: 50%; border: 3px solid var(--vp-c-brand); background: var(--vp-c-bg-alt); display: flex; flex-direction: column; align-items: center; justify-content: center; }
.n-sym { font-size: 1.2rem; font-weight: bold; color: var(--vp-c-brand); }
.n-val { font-size: 0.8rem; font-weight: bold; font-family: monospace; }
.bias-tag { font-size: 0.62rem; color: var(--vp-c-text-3); padding: 0.1rem 0.4rem; border: 1px dashed var(--vp-c-divider); border-radius: 4px; }
.act-col { flex-direction: row; }
.act-box { font-size: 0.72rem; font-family: monospace; background: var(--vp-c-bg-alt); border: 1px solid var(--vp-c-divider); border-radius: 6px; padding: 0.4rem 0.6rem; }
.output-node { width: 54px; height: 54px; border-radius: 50%; border: 2px solid var(--vp-c-divider); background: var(--vp-c-bg-alt); display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 0.1rem; }
.output-node.on { border-color: #059669; background: rgba(5,150,105,0.08); }
.out-val { font-size: 1.3rem; font-weight: bold; }
.out-lbl { font-size: 0.58rem; color: var(--vp-c-text-2); }
.caption { font-size: 0.75rem; color: var(--vp-c-text-3); text-align: center; margin-top: 0.6rem; }
</style>
