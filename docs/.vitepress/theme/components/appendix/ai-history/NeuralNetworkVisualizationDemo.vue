<template>
  <div class="neural-network-viz-demo">
    <div class="demo-header">
      <h4>🧠 神经网络可视化</h4>
      <p>观察数据如何在神经网络中流动</p>
    </div>

    <div class="network-container">
      <svg ref="svgRef" class="network-svg" :width="svgWidth" :height="svgHeight">
        <defs>
          <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop
            offset="0%"
            style="stop-color: var(--vp-c-brand); stop-opacity: 0.15"
          />
          <stop
            offset="100%"
            style="stop-color: var(--vp-c-brand); stop-opacity: 0.45"
          />
        </linearGradient>
        </defs>

        <!-- Connections -->
        <g class="connections">
          <line
            v-for="conn in connections"
            :key="conn.id"
            :x1="conn.x1"
            :y1="conn.y1"
            :x2="conn.x2"
            :y2="conn.y2"
            :stroke-width="conn.width"
            :opacity="conn.opacity"
            stroke="url(#connectionGradient)"
            class="connection-line"
          />
        </g>

        <!-- Neurons -->
        <g class="neurons">
          <g
            v-for="neuron in neurons"
            :key="neuron.id"
            :transform="`translate(${neuron.x}, ${neuron.y})`"
            class="neuron-group"
            :class="{ active: neuron.active, input: neuron.layer === 0, output: neuron.layer === layers.length - 1 }"
          >
            <circle
              :r="neuron.radius"
              class="neuron-circle"
              @click="activateNeuron(neuron)"
            />
            <text
              v-if="neuron.label"
              y="30"
              text-anchor="middle"
              class="neuron-label"
            >
              {{ neuron.label }}
            </text>
          </g>
        </g>
      </svg>
    </div>

    <div class="layer-info">
      <div
        v-for="(layer, index) in layerConfigs"
        :key="index"
        class="layer-card"
        :class="{ active: currentLayer === index }"
        @click="currentLayer = index"
      >
        <div class="layer-badge">{{ layer.name }}</div>
        <div class="layer-neurons">{{ layer.neurons }} 个神经元</div>
        <div class="layer-desc">{{ layer.desc }}</div>
      </div>
    </div>

    <div class="controls">
      <button @click="startForwardPropagation" class="action-btn">
        ▶️ 前向传播
      </button>
      <button @click="resetNetwork" class="action-btn secondary">
        🔄 重置
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const svgWidth = 800
const svgHeight = 400
const currentLayer = ref(0)
const animationId = ref(null)

const layers = ref([4, 6, 6, 3]) // 输入层、2个隐藏层、输出层
const layerConfigs = ref([
  { name: '输入层', neurons: 4, desc: '接收原始数据（如图片像素）' },
  { name: '隐藏层 1', neurons: 6, desc: '识别边缘和简单特征' },
  { name: '隐藏层 2', neurons: 6, desc: '识别形状和复杂特征' },
  { name: '输出层', neurons: 3, desc: '输出分类结果' }
])

const neurons = ref([])
const connections = ref([])

// 计算神经元位置
const calculateNeurons = () => {
  neurons.value = []
  const layerSpacing = svgWidth / (layers.value.length + 1)

  layers.value.forEach((neuronCount, layerIndex) => {
    const x = layerSpacing * (layerIndex + 1)
    const neuronSpacing = svgHeight / (neuronCount + 1)

    for (let i = 0; i < neuronCount; i++) {
      const y = neuronSpacing * (i + 1)
      neurons.value.push({
        id: `${layerIndex}-${i}`,
        layer: layerIndex,
        x,
        y,
        radius: 20,
        active: false,
        label:
          layerIndex === 0
            ? ['像素1', '像素2', '像素3', '像素4'][i]
            : layerIndex === layers.value.length - 1
            ? ['猫', '狗', '鸟'][i]
            : ''
      })
    }
  })
}

// 计算连接
const calculateConnections = () => {
  connections.value = []
  let connId = 0

  for (let l = 0; l < layers.value.length - 1; l++) {
    const currentLayerNeurons = neurons.value.filter((n) => n.layer === l)
    const nextLayerNeurons = neurons.value.filter((n) => n.layer === l + 1)

    currentLayerNeurons.forEach((fromNeuron) => {
      nextLayerNeurons.forEach((toNeuron) => {
        connections.value.push({
          id: connId++,
          x1: fromNeuron.x,
          y1: fromNeuron.y,
          x2: toNeuron.x,
          y2: toNeuron.y,
          width: Math.random() * 2 + 0.5,
          opacity: 0.3,
          active: false
        })
      })
    })
  }
}

const activateNeuron = (neuron) => {
  neuron.active = !neuron.active
  currentLayer.value = neuron.layer
}

const startForwardPropagation = async () => {
  resetNetwork()

  // 激活输入层
  const inputNeurons = neurons.value.filter((n) => n.layer === 0)
  inputNeurons.forEach((n) => {
    n.active = true
    n.radius = 25
  })
  currentLayer.value = 0

  await sleep(500)

  // 逐层激活
  for (let l = 1; l < layers.value.length; l++) {
    currentLayer.value = l
    const layerNeurons = neurons.value.filter((n) => n.layer === l)

    layerNeurons.forEach((neuron) => {
      neuron.active = true
      neuron.radius = 25
    })

    // 高亮连接
    connections.value.forEach((conn) => {
      const fromNeuron = neurons.value.find(
        (n) => Math.abs(n.x - conn.x1) < 1 && Math.abs(n.y - conn.y1) < 1
      )
      if (fromNeuron && fromNeuron.layer === l - 1 && fromNeuron.active) {
        conn.opacity = 0.8
        conn.width = 3
      }
    })

    await sleep(600)
  }
}

const resetNetwork = () => {
  neurons.value.forEach((n) => {
    n.active = false
    n.radius = 20
  })
  connections.value.forEach((conn) => {
    conn.opacity = 0.3
    conn.width = Math.random() * 2 + 0.5
  })
  currentLayer.value = 0
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

onMounted(() => {
  calculateNeurons()
  calculateConnections()
})
</script>

<style scoped>
.neural-network-viz-demo {
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

.network-container {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1.5rem;
  overflow-x: auto;
}

.network-svg {
  display: block;
  margin: 0 auto;
  min-width: 600px;
}

.connection-line {
  transition: all 0.3s ease;
}

.neuron-group {
  cursor: pointer;
  transition: all 0.3s ease;
}

.neuron-group:hover .neuron-circle {
  opacity: 0.9;
}

.neuron-circle {
  fill: rgba(var(--vp-c-brand-rgb), 0.35);
  stroke: var(--vp-c-brand);
  stroke-width: 2;
  transition: all 0.3s ease;
}

.neuron-group.input .neuron-circle {
  fill: rgba(var(--vp-c-brand-rgb), 0.2);
  stroke: var(--vp-c-brand);
}

.neuron-group.output .neuron-circle {
  fill: rgba(var(--vp-c-brand-rgb), 0.12);
  stroke: var(--vp-c-brand);
}

.neuron-group.active .neuron-circle {
  stroke-width: 3;
}

.neuron-label {
  font-size: 10px;
  fill: var(--vp-c-text-1);
  font-weight: 600;
}

.layer-info {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.layer-card {
  padding: 1rem;
  background: var(--vp-c-bg);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid var(--vp-c-divider);
}

.layer-card:hover {
  border-color: rgba(var(--vp-c-brand-rgb), 0.35);
}

.layer-card.active {
  border-color: var(--vp-c-brand);
  box-shadow: 0 0 0 3px rgba(var(--vp-c-brand-rgb), 0.12);
}

.layer-badge {
  font-weight: 700;
  color: var(--vp-c-brand);
  margin-bottom: 0.5rem;
}

.layer-neurons {
  font-size: 0.875rem;
  color: var(--vp-c-text-1);
  margin-bottom: 0.5rem;
}

.layer-desc {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  line-height: 1.4;
}

.controls {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.action-btn {
  padding: 0.75rem 2rem;
  background: var(--vp-c-brand);
  color: var(--vp-c-bg);
  border: 1px solid var(--vp-c-brand);
  border-radius: 6px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.action-btn:hover {
  opacity: 0.95;
}

.action-btn.secondary {
  background: var(--vp-c-bg);
  border-color: var(--vp-c-divider);
  color: var(--vp-c-text-1);
}

.action-btn.secondary:hover {
  border-color: var(--vp-c-brand);
}

@media (max-width: 768px) {
  .layer-info {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
