<template>
  <div class="perceptron-demo">
    <div class="neuron-viz">
      <!-- Inputs -->
      <div class="inputs-col">
        <div class="input-node">
          <span class="label">Input 1 (x₁)</span>
          <input type="number" v-model="x1" class="val-input" />
        </div>
        <div class="input-node">
          <span class="label">Input 2 (x₂)</span>
          <input type="number" v-model="x2" class="val-input" />
        </div>
      </div>

      <!-- Weights (Edges) -->
      <div class="weights-col">
        <div
          class="weight-line"
          :style="{
            width: Math.abs(w1) * 2 + 2 + 'px',
            opacity: Math.abs(w1) / 5 + 0.2
          }"
        ></div>
        <div class="weight-control top">
          w₁: <input type="range" v-model="w1" min="-5" max="5" step="0.1" />
          {{ w1 }}
        </div>

        <div
          class="weight-line"
          :style="{
            width: Math.abs(w2) * 2 + 2 + 'px',
            opacity: Math.abs(w2) / 5 + 0.2
          }"
        ></div>
        <div class="weight-control bottom">
          w₂: <input type="range" v-model="w2" min="-5" max="5" step="0.1" />
          {{ w2 }}
        </div>
      </div>

      <!-- Neuron (Sum & Activation) -->
      <div class="neuron-body">
        <div class="sum-part">
          <div class="math">∑</div>
          <div class="val">{{ weightedSum.toFixed(1) }}</div>
        </div>
        <div class="bias-control">
          Bias: <input type="number" v-model="bias" class="bias-input" />
        </div>
      </div>

      <!-- Output -->
      <div class="output-col">
        <div class="arrow">➔</div>
        <div class="output-node" :class="{ active: output > 0 }">
          <span class="label">Output (y)</span>
          <div class="val">{{ output }}</div>
        </div>
      </div>
    </div>

    <div class="formula-bar">
      Formula:
      <code
        >({{ x1 }} * {{ w1 }}) + ({{ x2 }} * {{ w2 }}) + {{ bias }} =
        {{ weightedSum.toFixed(1) }}</code
      >
      <br />
      Activation:
      <code>Step( {{ weightedSum.toFixed(1) }} ) = {{ output }}</code>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const x1 = ref(1)
const x2 = ref(0)
const w1 = ref(2.0)
const w2 = ref(-1.0)
const bias = ref(0)

const weightedSum = computed(() => {
  return x1.value * w1.value + x2.value * w2.value + bias.value
})

const output = computed(() => {
  return weightedSum.value > 0 ? 1 : 0
})
</script>

<style scoped>
.perceptron-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: white;
  padding: 1.5rem;
  margin: 1rem 0;
  overflow-x: auto;
}

.neuron-viz {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-width: 500px;
  gap: 1rem;
}

.inputs-col,
.output-col {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;
}

.input-node,
.output-node {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 2px solid #94a3b8;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #f1f5f9;
  position: relative;
}

.output-node.active {
  background: #4ade80;
  border-color: #16a34a;
  color: white;
  font-weight: bold;
}

.label {
  font-size: 0.6rem;
  position: absolute;
  top: -15px;
  width: 80px;
  text-align: center;
  color: #64748b;
}

.val-input {
  width: 40px;
  text-align: center;
  border: none;
  background: transparent;
  font-weight: bold;
  font-size: 1.1rem;
}

.weights-col {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  height: 120px;
}

.weight-line {
  height: 2px;
  background: #475569;
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform-origin: left center;
}
/* Simplified visual lines for CSS only demo - ideally SVG */
/* This is a simplified representation */

.weight-control {
  font-size: 0.7rem;
  display: flex;
  align-items: center;
  gap: 4px;
  background: white;
  padding: 2px 4px;
  border: 1px solid #e2e8f0;
  border-radius: 4px;
  z-index: 2;
}

.neuron-body {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: #3b82f6;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  box-shadow: 0 4px 10px rgba(59, 130, 246, 0.3);
}

.sum-part {
  text-align: center;
}
.math {
  font-size: 1.5rem;
}
.val {
  font-weight: bold;
}

.bias-control {
  position: absolute;
  bottom: -30px;
  background: white;
  color: #333;
  padding: 2px 8px;
  border-radius: 10px;
  border: 1px solid #e2e8f0;
  font-size: 0.7rem;
  display: flex;
  align-items: center;
  gap: 4px;
}
.bias-input {
  width: 30px;
  border: 1px solid #cbd5e1;
  border-radius: 2px;
  text-align: center;
}

.formula-bar {
  margin-top: 2rem;
  background: #f8fafc;
  padding: 1rem;
  border-radius: 6px;
  font-family: monospace;
  font-size: 0.8rem;
  color: #334155;
  text-align: center;
  border: 1px dashed #cbd5e1;
}

input[type='range'] {
  width: 60px;
}
</style>
