<template>
  <div class="backpropagation-demo">
    <el-card shadow="hover">
      <template #header>
        <div class="card-header">
          <h4>🔄 反向传播演示</h4>
          <p class="subtitle">观察神经网络如何通过误差反向调整权重</p>
        </div>
      </template>

      <div class="demo-content">
        <div class="network-view">
          <svg class="network-svg" viewBox="0 0 600 300">
            <!-- Layers visualization -->
            <g v-for="(layer, lIndex) in 3" :key="lIndex">
              <text
                :x="100 + lIndex * 200"
                y="20"
                text-anchor="middle"
                class="layer-label"
                fill="currentColor"
              >
                {{
                  lIndex === 0 ? '输入层' : lIndex === 1 ? '隐藏层' : '输出层'
                }}
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

        <el-divider />

        <div class="controls-panel">
          <el-steps :active="currentStep" align-center finish-status="success">
            <el-step
              v-for="(step, index) in steps"
              :key="index"
              :title="step"
            />
          </el-steps>

          <div class="error-display mt-4">
            <div class="flex justify-between mb-2">
              <span class="text-sm">误差 (Loss)</span>
              <span class="text-sm font-bold">{{ errorValue.toFixed(4) }}</span>
            </div>
            <el-progress
              :percentage="Math.round(errorValue * 100)"
              :color="customColors"
              :striped="currentStep === 2"
              :striped-flow="currentStep === 2"
            />
          </div>

          <el-alert
            :title="explanations[currentStep]"
            type="info"
            show-icon
            :closable="false"
            class="mt-4"
          />

          <div class="action-buttons mt-4 flex justify-center gap-4">
            <el-button @click="resetDemo" :disabled="currentStep === 0">
              重置
            </el-button>
            <el-button
              type="primary"
              @click="nextStep"
              :disabled="currentStep >= 4"
            >
              {{ currentStep < 4 ? '下一步' : '完成' }}
            </el-button>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const currentStep = ref(0)
const errorValue = ref(0.95)
const steps = ['前向传播', '计算误差', '反向传播', '更新权重']
const explanations = [
  '输入数据通过各层传递，得到预测输出。就像学生做完了一套试卷。',
  '对比预测值和真实值，计算误差。就像老师批改试卷，算出得了多少分（错得有多离谱）。',
  '将误差从输出层反向传递到各层。就像老师把错题反馈给学生，告诉他是哪一步思路错了。',
  '根据误差梯度调整每个神经元的权重。学生根据反馈修正自己的理解（权重），下次就能做对了。',
  '演示完成！通过不断重复这个过程，网络就学会了任务。'
]

const customColors = [
  { color: '#67c23a', percentage: 20 },
  { color: '#e6a23c', percentage: 50 },
  { color: '#f56c6c', percentage: 100 }
]

const connections = ref([])

// Generate initial connections
const initConnections = () => {
  const conns = []
  // Input -> Hidden
  for (let i = 1; i <= 3; i++) {
    for (let j = 1; j <= 3; j++) {
      conns.push({
        id: `i${i}-h${j}`,
        x1: 100,
        y1: 60 + i * 70,
        x2: 300,
        y2: 60 + j * 70,
        width: 2,
        color: '#dcdfe6',
        opacity: 0.5
      })
    }
  }
  // Hidden -> Output
  for (let i = 1; i <= 3; i++) {
    for (let j = 1; j <= 3; j++) {
      conns.push({
        id: `h${i}-o${j}`,
        x1: 300,
        y1: 60 + i * 70,
        x2: 500,
        y2: 60 + j * 70,
        width: 2,
        color: '#dcdfe6',
        opacity: 0.5
      })
    }
  }
  connections.value = conns
}

const getNeuronClass = (layerIndex, neuronIndex) => {
  if (currentStep.value === 0) return 'active' // Forward
  if (currentStep.value === 2) {
    // Backward
    if (layerIndex === 2) return 'error-source'
    if (layerIndex === 1) return 'error-passing'
  }
  if (currentStep.value === 3) return 'updating' // Update
  return ''
}

const nextStep = () => {
  if (currentStep.value >= 4) return
  currentStep.value++

  if (currentStep.value === 1) {
    // Calculate Error
    // Visual effect only
  } else if (currentStep.value === 2) {
    // Backprop: highlight connections red
    connections.value.forEach((c) => {
      c.color = '#f56c6c'
      c.width = 4
      c.opacity = 1
    })
  } else if (currentStep.value === 3) {
    // Update weights: error drops
    const reduceError = setInterval(() => {
      if (errorValue.value > 0.1) {
        errorValue.value -= 0.05
      } else {
        clearInterval(reduceError)
      }
    }, 50)

    connections.value.forEach((c) => {
      c.color = '#67c23a'
      c.width = 2
      c.opacity = 0.8
    })
  }
}

const resetDemo = () => {
  currentStep.value = 0
  errorValue.value = 0.95
  initConnections()
}

onMounted(() => {
  initConnections()
})
</script>

<style scoped>
.backpropagation-demo {
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

.network-view {
  display: flex;
  justify-content: center;
  background-color: var(--vp-c-bg-alt);
  border-radius: 8px;
  padding: 10px;
}

.network-svg {
  width: 100%;
  max-width: 600px;
  height: auto;
}

.layer-label {
  font-size: 14px;
  font-weight: bold;
  fill: var(--vp-c-text-2);
}

.neuron {
  fill: var(--vp-c-bg);
  stroke: var(--vp-c-text-2);
  stroke-width: 2;
  transition: all 0.5s;
}

.neuron.active {
  fill: var(--el-color-primary-light-9);
  stroke: var(--el-color-primary);
}

.neuron.error-source {
  fill: var(--el-color-danger-light-9);
  stroke: var(--el-color-danger);
  filter: drop-shadow(0 0 5px var(--el-color-danger));
}

.neuron.error-passing {
  fill: var(--el-color-warning-light-9);
  stroke: var(--el-color-warning);
}

.neuron.updating {
  fill: var(--el-color-success-light-9);
  stroke: var(--el-color-success);
  r: 28; /* Pulse effect */
}

.connection {
  transition: all 0.5s;
}

.mt-4 {
  margin-top: 16px;
}

.mb-2 {
  margin-bottom: 8px;
}

.flex {
  display: flex;
}

.justify-between {
  justify-content: space-between;
}

.justify-center {
  justify-content: center;
}

.gap-4 {
  gap: 16px;
}

.text-sm {
  font-size: 14px;
}

.font-bold {
  font-weight: bold;
}
</style>
