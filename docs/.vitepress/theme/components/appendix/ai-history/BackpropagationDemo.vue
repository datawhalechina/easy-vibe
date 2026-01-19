<template>
  <div class="backpropagation-demo">
    <div class="demo-header">
      <h4>🔄 反向传播演示</h4>
      <p>观察神经网络如何通过误差反向调整权重</p>
    </div>

    <div class="demo-content">
      <div class="network-view">
        <svg class="network-svg" viewBox="0 0 600 300">
          <!-- Layers visualization -->
          <g v-for="(layer, lIndex) in 3" :key="lIndex">
            <text :x="100 + lIndex * 200" y="20" text-anchor="middle" class="layer-label">
              {{ lIndex === 0 ? '输入层' : lIndex === 1 ? '隐藏层' : '输出层' }}
            </text>

            <circle
              v-for="n in 3"
              :key="`${lIndex}-${n}`"
              :cx="100 + lIndex * 200"
              :cy="60 + n * 70"
              :r="25"
              :class="['neuron', getNeuronClass(lIndex, n)]"
            />
          </g>

          <!-- Connections with error flow -->
          <line
            v-for="conn in connections"
            :key="conn.id"
            :x1="conn.x1"
            :y1="conn.y1"
            :x2="conn.x2"
            :y2="conn.y2"
            :stroke="conn.color"
            :stroke-width="conn.width"
            :opacity="conn.opacity"
            class="connection"
          />
        </svg>
      </div>

      <div class="controls-panel">
        <div class="step-indicator">
          <div
            v-for="(step, index) in steps"
            :key="index"
            :class="['step', { active: currentStep === index, completed: currentStep > index }]"
          >
            <div class="step-number">{{ index + 1 }}</div>
            <div class="step-label">{{ step }}</div>
          </div>
        </div>

        <div class="error-display">
          <div class="error-value">
            误差: {{ errorValue.toFixed(4) }}
          </div>
          <div class="error-bar">
            <div class="error-fill" :style="{ width: (errorValue * 100) + '%' }"></div>
          </div>
        </div>

        <button @click="nextStep" class="step-btn" :disabled="currentStep >= 4">
          {{ currentStep < 4 ? '下一步 ▶' : '完成 ✓' }}
        </button>

        <button @click="resetDemo" class="reset-btn">
          🔄 重置演示
        </button>

        <div class="explanation">
          <p><strong>当前步骤:</strong> {{ explanations[currentStep] }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const currentStep = ref(0)
const errorValue = ref(0.95)
const steps = ['前向传播', '计算误差', '反向传播', '更新权重']
const explanations = [
  '输入数据通过各层传递，得到预测输出',
  '对比预测值和真实值，计算误差',
  '将误差从输出层反向传递到各层',
  '根据误差梯度调整每个神经元的权重'
]

const connections = ref([])

// 初始化连接
const initConnections = () => {
  const conns = []
  for (let l = 0; l < 2; l++) {
    for (let i = 1; i <= 3; i++) {
      for (let j = 1; j <= 3; j++) {
        conns.push({
          id: `${l}-${i}-${j}`,
          x1: 100 + l * 200,
          y1: 60 + i * 70,
          x2: 100 + (l + 1) * 200,
          y2: 60 + j * 70,
          color: 'var(--vp-c-divider)',
          width: 1,
          opacity: 0.3,
          active: false
        })
      }
    }
  }
  connections.value = conns
}

const getNeuronClass = (layer, neuron) => {
  if (currentStep.value === 0 && layer === 0) return 'active'
  if (currentStep.value === 1 && layer === 2) return 'error'
  if (currentStep.value >= 2) return 'updated'
  return ''
}

const nextStep = () => {
  if (currentStep.value < 4) {
    currentStep.value++

    // 模拟误差减小
    if (currentStep.value === 2) {
      errorValue.value = 0.95
    } else if (currentStep.value === 3) {
      errorValue.value = 0.65
    } else if (currentStep.value === 4) {
      errorValue.value = 0.32
    }

    // 更新连接显示
    updateConnections()
  }
}

const updateConnections = () => {
  if (currentStep.value >= 2) {
    connections.value.forEach((conn) => {
      conn.color = 'var(--vp-c-brand)'
      conn.width = 2
      conn.opacity = 0.6
    })
  }
}

const resetDemo = () => {
  currentStep.value = 0
  errorValue.value = 0.95
  initConnections()
}

// 初始化
initConnections()
</script>

<style scoped>
.backpropagation-demo {
  margin: 1rem 0;
  padding: 1.5rem;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  color: var(--vp-c-text-1);
}

.demo-header {
  text-align: center;
  margin-bottom: 1.5rem;
}

.demo-header h4 {
  margin: 0 0 0.5rem 0;
  color: var(--vp-c-text-1);
  font-size: 1.5rem;
}

.demo-header p {
  margin: 0;
  color: var(--vp-c-text-2);
  font-size: 0.875rem;
}

.demo-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

.network-view {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  padding: 1rem;
  border-radius: 8px;
}

.network-svg {
  width: 100%;
  height: auto;
}

.layer-label {
  font-size: 12px;
  font-weight: 600;
  fill: var(--vp-c-text-2);
}

.neuron {
  fill: var(--vp-c-bg-alt);
  stroke: var(--vp-c-divider);
  stroke-width: 2;
  transition: all 0.5s ease;
}

.neuron.active {
  fill: var(--vp-c-green-1, #22c55e);
  stroke: var(--vp-c-green-2, #16a34a);
}

.neuron.error {
  fill: var(--vp-c-red-1, #ef4444);
  stroke: var(--vp-c-red-2, #dc2626);
}

.neuron.updated {
  fill: var(--vp-c-brand);
  stroke: var(--vp-c-brand);
}

.connection {
  transition: all 0.5s ease;
}

.controls-panel {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  padding: 1.5rem;
  border-radius: 8px;
}

.step-indicator {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.5rem;
}

.step {
  flex: 1;
  text-align: center;
  position: relative;
  opacity: 0.4;
  transition: all 0.3s ease;
}

.step.active,
.step.completed {
  opacity: 1;
}

.step-number {
  width: 36px;
  height: 36px;
  margin: 0 auto 0.5rem;
  background: var(--vp-c-bg-alt);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 0.875rem;
  color: var(--vp-c-text-2);
  transition: all 0.3s ease;
}

.step.active .step-number {
  background: var(--vp-c-brand);
  color: var(--vp-c-bg);
}

.step.completed .step-number {
  background: var(--vp-c-green-1, #22c55e);
  color: var(--vp-c-bg);
}

.step-label {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
}

.error-display {
  margin-bottom: 1.5rem;
  padding: 1rem;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
}

.error-value {
  font-weight: 700;
  color: var(--vp-c-red-1, #ef4444);
  margin-bottom: 0.5rem;
}

.error-bar {
  height: 8px;
  background: var(--vp-c-bg-alt);
  border-radius: 4px;
  overflow: hidden;
}

.error-fill {
  height: 100%;
  background: var(--vp-c-red-1, #ef4444);
  transition: width 0.5s ease;
}

.step-btn,
.reset-btn {
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 0.75rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.step-btn {
  background: var(--vp-c-brand);
  border-color: var(--vp-c-brand);
  color: var(--vp-c-bg);
}

.step-btn:hover:not(:disabled) {
  opacity: 0.95;
}

.step-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.reset-btn {
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
}

.reset-btn:hover {
  border-color: var(--vp-c-brand);
}

.explanation {
  padding: 1rem;
  background: rgba(var(--vp-c-brand-rgb), 0.08);
  border-left: 4px solid var(--vp-c-brand);
  border-radius: 4px;
  border: 1px solid rgba(var(--vp-c-brand-rgb), 0.15);
}

.explanation p {
  margin: 0;
  font-size: 0.875rem;
  line-height: 1.6;
  color: var(--vp-c-text-2);
}

.explanation strong {
  color: var(--vp-c-text-1);
}

@media (max-width: 768px) {
  .demo-content {
    grid-template-columns: 1fr;
  }
}
</style>
