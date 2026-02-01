<template>
  <div class="nn-viz-demo">
    <el-card shadow="hover">
      <template #header>
        <div class="card-header">
          <h4>神经网络：手动前向传播（可控演示）</h4>
          <p class="subtitle">
            用"开始 / 上一步 / 下一步"逐层推进，避免误把动画当成真实训练过程。
          </p>
        </div>
      </template>

      <div class="controls mb-4 flex gap-2">
        <el-button-group>
          <el-button type="primary" @click="start" :disabled="step !== 0">
            开始
          </el-button>
          <el-button @click="prev" :disabled="step <= 1">上一步</el-button>
          <el-button
            type="primary"
            @click="next"
            :disabled="step === 0 || step >= maxStep"
          >
            下一步
          </el-button>
          <el-button @click="reset">重置</el-button>
        </el-button-group>
      </div>

      <div v-if="step > 0" class="progress mb-4">
        <el-steps :active="step" align-center finish-status="success">
          <el-step title="输入层" />
          <el-step title="隐藏层" />
          <el-step title="输出层" />
        </el-steps>
        <div class="step-info text-center mt-2 text-sm text-gray-500">
          Step {{ step }} / {{ maxStep }} · {{ stepTitle }}
        </div>
      </div>

      <div class="grid-layout">
        <el-card shadow="never" class="viz-card">
          <template #header>
            <div class="card-title">网络结构</div>
          </template>
          <div class="network-container">
            <svg class="network-svg" :viewBox="`0 0 ${svgWidth} ${svgHeight}`">
              <defs>
                <linearGradient id="conn" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop
                    offset="0%"
                    :style="{
                      stopColor: 'var(--el-color-primary)',
                      stopOpacity: 0.18
                    }"
                  />
                  <stop
                    offset="100%"
                    :style="{
                      stopColor: 'var(--el-color-primary)',
                      stopOpacity: 0.45
                    }"
                  />
                </linearGradient>
              </defs>

              <g class="connections">
                <line
                  v-for="c in connections"
                  :key="c.id"
                  :x1="c.x1"
                  :y1="c.y1"
                  :x2="c.x2"
                  :y2="c.y2"
                  :class="{
                    active: isConnectionActive(c),
                    focus: isConnectionFocus(c)
                  }"
                  class="connection-line"
                />
              </g>

              <g class="neurons">
                <g
                  v-for="n in neurons"
                  :key="n.id"
                  :transform="`translate(${n.x}, ${n.y})`"
                  :class="{
                    neuron: true,
                    active: isNeuronActive(n),
                    focus: focusLayer === n.layer
                  }"
                  @click="focusLayer = n.layer"
                >
                  <circle :r="n.r" />
                  <text
                    v-if="n.label"
                    y="32"
                    text-anchor="middle"
                    class="neuron-label"
                  >
                    {{ n.label }}
                  </text>
                </g>
              </g>
            </svg>
          </div>

          <el-alert
            title="提示：点击某一层的神经元可以“聚焦”该层（仅用于查看，不会触发自动流程）。"
            type="info"
            show-icon
            :closable="false"
            class="mt-2"
          />
        </el-card>

        <el-card shadow="never" class="info-card">
          <template #header>
            <div class="card-title">每一层在做什么</div>
          </template>
          <div class="layers-info">
            <el-collapse v-model="activeCollapse">
              <el-collapse-item
                v-for="(l, idx) in layerConfigs"
                :key="l.name"
                :title="l.name"
                :name="idx"
              >
                <div class="layer-detail">
                  <p>{{ l.desc }}</p>
                  <div class="math-box">
                    <code>{{ l.math }}</code>
                  </div>
                </div>
              </el-collapse-item>
            </el-collapse>
          </div>
        </el-card>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const svgWidth = 600
const svgHeight = 300
const step = ref(0)
const maxStep = 3
const focusLayer = ref(null)
const activeCollapse = ref([0])

// Mock logic for demo
const layerConfigs = [
  {
    name: '输入层 (Input)',
    desc: '接收原始数据（如图片的像素值）。',
    math: 'x = [x1, x2, x3]'
  },
  {
    name: '隐藏层 (Hidden)',
    desc: '提取特征（如边缘、形状）。每个神经元计算加权和并激活。',
    math: 'h = ReLU(W1·x + b1)'
  },
  {
    name: '输出层 (Output)',
    desc: '给出最终结果（如分类概率）。',
    math: 'y = Softmax(W2·h + b2)'
  }
]

const neurons = ref([])
const connections = ref([])

const stepTitle = computed(() => {
  if (step.value === 0) return '准备就绪'
  if (step.value === 1) return '输入数据进入网络'
  if (step.value === 2) return '隐藏层提取特征'
  if (step.value === 3) return '输出层得出结果'
  return ''
})

const initNetwork = () => {
  // Simple layout logic
  const layers = [3, 4, 2] // Neuron counts per layer
  const layerX = [100, 300, 500]
  const ns = []
  const cs = []

  layers.forEach((count, layerIdx) => {
    const startY = (svgHeight - (count - 1) * 60) / 2
    for (let i = 0; i < count; i++) {
      ns.push({
        id: `n-${layerIdx}-${i}`,
        layer: layerIdx,
        x: layerX[layerIdx],
        y: startY + i * 60,
        r: 20,
        label: layerIdx === 0 ? `x${i + 1}` : layerIdx === 2 ? `y${i + 1}` : ''
      })
    }
  })

  // Create connections
  ns.forEach((src) => {
    ns.forEach((tgt) => {
      if (tgt.layer === src.layer + 1) {
        cs.push({
          id: `c-${src.id}-${tgt.id}`,
          srcId: src.id,
          tgtId: tgt.id,
          srcLayer: src.layer,
          x1: src.x,
          y1: src.y,
          x2: tgt.x,
          y2: tgt.y
        })
      }
    })
  })

  neurons.value = ns
  connections.value = cs
}

onMounted(() => {
  initNetwork()
})

const start = () => {
  step.value = 1
  focusLayer.value = 0
  activeCollapse.value = [0]
}

const next = () => {
  if (step.value < maxStep) {
    step.value++
    focusLayer.value = step.value - 1
    activeCollapse.value = [step.value - 1]
  }
}

const prev = () => {
  if (step.value > 1) {
    step.value--
    focusLayer.value = step.value - 1
    activeCollapse.value = [step.value - 1]
  }
}

const reset = () => {
  step.value = 0
  focusLayer.value = null
  activeCollapse.value = [0]
}

const isNeuronActive = (n) => {
  if (step.value === 0) return false
  return n.layer < step.value
}

const isConnectionActive = (c) => {
  if (step.value === 0) return false
  return c.srcLayer < step.value - 1
}

const isConnectionFocus = (c) => {
  // Optional: highlight connections related to focused layer
  return false
}
</script>

<style scoped>
.nn-viz-demo {
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

.mb-4 {
  margin-bottom: 16px;
}

.mt-2 {
  margin-top: 8px;
}

.flex {
  display: flex;
}

.gap-2 {
  gap: 8px;
}

.text-center {
  text-align: center;
}

.text-sm {
  font-size: 12px;
}

.text-gray-500 {
  color: var(--vp-c-text-2);
}

.grid-layout {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 20px;
}

@media (max-width: 768px) {
  .grid-layout {
    grid-template-columns: 1fr;
  }
}

.network-container {
  display: flex;
  justify-content: center;
  background-color: var(--vp-c-bg-alt);
  border-radius: 8px;
  padding: 10px;
}

.network-svg {
  width: 100%;
  height: auto;
}

.connection-line {
  stroke: var(--vp-c-divider);
  stroke-width: 2;
  transition: all 0.5s;
}

.connection-line.active {
  stroke: var(--el-color-primary);
  opacity: 0.5;
}

.neuron circle {
  fill: var(--vp-c-bg);
  stroke: var(--vp-c-text-2);
  stroke-width: 2;
  transition: all 0.5s;
  cursor: pointer;
}

.neuron.active circle {
  fill: var(--el-color-primary-light-9);
  stroke: var(--el-color-primary);
}

.neuron.focus circle {
  stroke-width: 4;
}

.neuron-label {
  font-size: 12px;
  fill: var(--vp-c-text-1);
}

.math-box {
  background-color: var(--vp-c-bg-alt);
  padding: 8px;
  border-radius: 4px;
  margin-top: 8px;
  font-family: monospace;
  font-size: 12px;
}
</style>
