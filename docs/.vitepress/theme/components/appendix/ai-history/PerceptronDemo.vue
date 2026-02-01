<template>
  <div class="perceptron-demo">
    <el-card shadow="hover">
      <template #header>
        <div class="card-header">
          <h4>感知机 (Perceptron) 演示</h4>
          <p class="subtitle">最简单的神经元：输入 x 权重 + 偏置 = 输出</p>
        </div>
      </template>

      <div class="neuron-viz-container">
        <!-- Inputs -->
        <div class="col inputs-col">
          <div class="node-wrapper">
            <el-tag effect="dark">输入 A</el-tag>
            <el-input-number v-model="x1" size="small" :step="1" />
          </div>
          <div class="node-wrapper">
            <el-tag effect="dark">输入 B</el-tag>
            <el-input-number v-model="x2" size="small" :step="1" />
          </div>
        </div>

        <!-- Weights Visual -->
        <div class="col weights-col">
          <div class="weight-group">
            <div
              class="weight-line"
              :style="{
                height: Math.abs(w1) * 2 + 2 + 'px',
                opacity: Math.abs(w1) / 5 + 0.2
              }"
            ></div>
            <div class="weight-control">
              <span class="label">权重 A: {{ w1 }}</span>
              <el-slider
                v-model="w1"
                :min="-5"
                :max="5"
                :step="0.1"
                size="small"
              />
            </div>
          </div>

          <div class="weight-group">
            <div
              class="weight-line"
              :style="{
                height: Math.abs(w2) * 2 + 2 + 'px',
                opacity: Math.abs(w2) / 5 + 0.2
              }"
            ></div>
            <div class="weight-control">
              <span class="label">权重 B: {{ w2 }}</span>
              <el-slider
                v-model="w2"
                :min="-5"
                :max="5"
                :step="0.1"
                size="small"
              />
            </div>
          </div>
        </div>

        <!-- Neuron Body -->
        <div class="col neuron-col">
          <div class="neuron-circle">
            <div class="sum-symbol">总分</div>
            <div class="sum-value">{{ weightedSum.toFixed(1) }}</div>
          </div>
          <div class="bias-control mt-2">
            <span class="label">基础分 (Bias):</span>
            <el-input-number v-model="bias" size="small" :step="1" />
          </div>
        </div>

        <!-- Output -->
        <div class="col output-col">
          <el-icon class="arrow-icon"><Right /></el-icon>
          <div class="node-wrapper">
            <el-tag :type="output > 0 ? 'success' : 'info'" effect="dark"
              >结果 (Output)</el-tag
            >
            <div class="output-value" :class="{ active: output > 0 }">
              {{ output }}
            </div>
          </div>
        </div>
      </div>

      <el-divider />

      <div class="formula-bar">
        <el-alert type="info" :closable="false">
          <template #title>
            <div class="formula-content">
              <div>
                <strong>总分计算: </strong>
                <span class="calc-step">
                  (输入A {{ x1 }} × 权重 {{ w1 }}) + (输入B {{ x2 }} × 权重 {{ w2 }}) + 基础分 {{ bias }} =
                  {{ weightedSum.toFixed(1) }}
                </span>
              </div>
              <div class="mt-1">
                <strong>判断结果: </strong>
                <span class="calc-step"> 
                   {{ weightedSum.toFixed(1) }} {{ weightedSum > 0 ? '>' : '≤' }} 0 
                   → 输出 {{ output }} ({{ output > 0 ? '激活' : '静默' }})
                </span>
              </div>
            </div>
          </template>
        </el-alert>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Right } from '@element-plus/icons-vue'

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
  margin: 20px 0;
}

.card-header h4 {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
}

.subtitle {
  font-size: 13px;
  color: var(--vp-c-text-2);
  margin: 4px 0 0;
}

.neuron-viz-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  padding: 20px 0;
  overflow-x: auto;
}

.col {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.node-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.weight-group {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  width: 120px;
}

.weight-line {
  width: 100%;
  background-color: var(--el-color-primary);
  height: 2px;
  min-height: 2px;
}

.weight-control {
  width: 100%;
  text-align: center;
}

.label {
  font-size: 12px;
  color: var(--vp-c-text-2);
}

.neuron-circle {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 2px solid var(--el-color-primary);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: var(--vp-c-bg);
}

.sum-symbol {
  font-size: 24px;
  font-weight: bold;
}

.sum-value {
  font-family: monospace;
}

.arrow-icon {
  font-size: 24px;
  color: var(--vp-c-text-2);
}

.output-value {
  font-size: 24px;
  font-weight: bold;
  color: var(--vp-c-text-2);
}

.output-value.active {
  color: var(--el-color-success);
}

.mt-1 {
  margin-top: 4px;
}

.mt-2 {
  margin-top: 8px;
}

.formula-content code {
  background-color: var(--vp-c-bg-alt);
  padding: 2px 4px;
  border-radius: 4px;
  font-family: monospace;
}
</style>
