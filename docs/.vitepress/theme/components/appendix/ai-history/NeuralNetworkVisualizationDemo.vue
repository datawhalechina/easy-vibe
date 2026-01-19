<template>
  <div class="nn-viz-demo">
    <div class="header">
      <div class="title">神经网络：手动前向传播（可控演示）</div>
      <div class="subtitle">
        用“开始 / 上一步 /
        下一步”逐层推进，不自动播放，避免误把动画当成真实训练过程。
      </div>
    </div>

    <div class="controls">
      <button class="btn primary" @click="start" :disabled="step !== 0">
        开始
      </button>
      <button class="btn" @click="prev" :disabled="step <= 1">上一步</button>
      <button
        class="btn primary"
        @click="next"
        :disabled="step === 0 || step >= maxStep"
      >
        下一步
      </button>
      <button class="btn" @click="reset">重置</button>
    </div>

    <div v-if="step > 0" class="progress">
      Step {{ step }} / {{ maxStep }} · {{ stepTitle }}
    </div>

    <div class="grid">
      <div class="card">
        <div class="card-title">网络结构</div>
        <div class="network-container">
          <svg class="network-svg" :viewBox="`0 0 ${svgWidth} ${svgHeight}`">
            <defs>
              <linearGradient id="conn" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop
                  offset="0%"
                  :style="{
                    stopColor: 'var(--vp-c-brand)',
                    stopOpacity: 0.18
                  }"
                />
                <stop
                  offset="100%"
                  :style="{
                    stopColor: 'var(--vp-c-brand)',
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
                <text v-if="n.label" y="32" text-anchor="middle">
                  {{ n.label }}
                </text>
              </g>
            </g>
          </svg>
        </div>

        <div class="hint">
          提示：点击某一层的神经元可以“聚焦”该层（仅用于查看，不会触发自动流程）。
        </div>
      </div>

      <div class="card">
        <div class="card-title">每一层在做什么</div>
        <div class="layers">
          <button
            v-for="(l, idx) in layerConfigs"
            :key="l.name"
            class="layer"
            :class="{ active: focusLayer === idx }"
            @click="focusLayer = idx"
          >
            <div class="layer-name">{{ l.name }}</div>
            <div class="layer-desc">{{ l.desc }}</div>
          </button>
        </div>

        <div class="explain">
          <div class="explain-title">当前推进到：</div>
          <div class="explain-text">{{ stepExplain }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'

const svgWidth = 820
const svgHeight = 360

const layers = ref([4, 6, 6, 3])
const layerConfigs = [
  { name: '输入层', desc: '接收原始输入（例如像素、特征、词向量等）。' },
  { name: '隐藏层 1', desc: '学习更基础的组合特征（例如边缘、局部模式）。' },
  { name: '隐藏层 2', desc: '学习更复杂的抽象表示（例如形状、语义组合）。' },
  { name: '输出层', desc: '输出任务结果（分类概率、回归值等）。' }
]

const neurons = ref([])
const connections = ref([])

const maxStep = computed(() => layers.value.length)
const step = ref(0)
const focusLayer = ref(0)

const activeToLayer = computed(() => (step.value === 0 ? -1 : step.value - 1))

const stepTitle = computed(() => {
  if (step.value === 1) return '激活输入层'
  if (step.value === 2) return '传递到隐藏层 1'
  if (step.value === 3) return '传递到隐藏层 2'
  if (step.value === 4) return '得到输出'
  return '未开始'
})

const stepExplain = computed(() => {
  if (step.value === 0)
    return '点击“开始”，先把输入层视为已有数据。之后每次“下一步”只推进一层，便于你观察。'
  if (step.value === 1) return '输入层被激活：表示我们把输入数据“喂”进网络。'
  if (step.value === 2)
    return '从输入层到隐藏层 1：连接把输入做加权求和，得到第一层的激活。'
  if (step.value === 3) return '从隐藏层 1 到隐藏层 2：更高层的表示通常更抽象。'
  if (step.value === 4)
    return '输出层激活：拿到最终输出（例如“猫/狗/鸟”的概率）。'
  return ''
})

const start = () => {
  step.value = 1
  focusLayer.value = 0
}

const next = () => {
  step.value = Math.min(maxStep.value, step.value + 1)
  focusLayer.value = Math.min(activeToLayer.value, layers.value.length - 1)
}

const prev = () => {
  step.value = Math.max(1, step.value - 1)
  focusLayer.value = Math.min(activeToLayer.value, layers.value.length - 1)
}

const reset = () => {
  step.value = 0
  focusLayer.value = 0
}

const isNeuronActive = (n) => n.layer >= 0 && n.layer <= activeToLayer.value

const isConnectionActive = (c) => {
  if (activeToLayer.value < 1) return false
  return c.toLayer <= activeToLayer.value
}

const isConnectionFocus = (c) => {
  if (activeToLayer.value < 1) return false
  return c.toLayer === activeToLayer.value
}

const layout = () => {
  const ns = []
  const cs = []
  const layerSpacing = svgWidth / (layers.value.length + 1)

  layers.value.forEach((count, layerIndex) => {
    const x = layerSpacing * (layerIndex + 1)
    const ySpacing = svgHeight / (count + 1)

    for (let i = 0; i < count; i++) {
      const y = ySpacing * (i + 1)
      ns.push({
        id: `${layerIndex}-${i}`,
        layer: layerIndex,
        x,
        y,
        r: 18,
        label:
          layerIndex === 0
            ? ['像素1', '像素2', '像素3', '像素4'][i]
            : layerIndex === layers.value.length - 1
              ? ['猫', '狗', '鸟'][i]
              : ''
      })
    }
  })

  let id = 0
  for (let l = 0; l < layers.value.length - 1; l++) {
    const from = ns.filter((n) => n.layer === l)
    const to = ns.filter((n) => n.layer === l + 1)
    from.forEach((a) => {
      to.forEach((b) => {
        cs.push({
          id: id++,
          x1: a.x,
          y1: a.y,
          x2: b.x,
          y2: b.y,
          toLayer: l + 1
        })
      })
    })
  }

  neurons.value = ns
  connections.value = cs
}

onMounted(() => {
  layout()
})
</script>

<style scoped>
.nn-viz-demo {
  margin: 1rem 0;
  padding: 1.5rem;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  color: var(--vp-c-text-1);
}

.header {
  margin-bottom: 1rem;
}

.title {
  font-weight: 800;
}

.subtitle {
  margin-top: 0.25rem;
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
}

.controls {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-bottom: 0.75rem;
}

.btn {
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  cursor: pointer;
  font-weight: 700;
  font-size: 0.875rem;
}

.btn.primary {
  background: var(--vp-c-brand);
  border-color: var(--vp-c-brand);
  color: var(--vp-c-bg);
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.progress {
  margin-bottom: 0.75rem;
  color: var(--vp-c-text-2);
  font-family: var(--vp-font-family-mono);
  font-size: 0.85rem;
}

.grid {
  display: grid;
  grid-template-columns: 1.3fr 1fr;
  gap: 0.75rem;
}

@media (max-width: 720px) {
  .grid {
    grid-template-columns: 1fr;
  }
}

.card {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  border-radius: 8px;
  padding: 1rem;
}

.card-title {
  font-weight: 900;
  margin-bottom: 0.5rem;
}

.network-container {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  padding: 0.75rem;
  overflow-x: auto;
}

.network-svg {
  width: 100%;
  min-width: 640px;
  height: auto;
  display: block;
}

.connections line {
  stroke: var(--vp-c-divider);
  stroke-width: 1;
  opacity: 0.35;
  transition:
    opacity 0.15s ease,
    stroke-width 0.15s ease;
}

.connections line.active {
  stroke: url(#conn);
  opacity: 0.75;
}

.connections line.focus {
  opacity: 0.95;
  stroke-width: 2;
}

.neuron {
  cursor: pointer;
}

.neuron circle {
  fill: rgba(var(--vp-c-brand-rgb), 0.1);
  stroke: var(--vp-c-divider);
  stroke-width: 2;
  transition:
    transform 0.15s ease,
    fill 0.15s ease,
    stroke 0.15s ease;
}

.neuron.active circle {
  fill: rgba(var(--vp-c-brand-rgb), 0.25);
  stroke: var(--vp-c-brand);
}

.neuron.focus circle {
  transform: scale(1.06);
}

.neuron text {
  font-size: 10px;
  fill: var(--vp-c-text-2);
  font-weight: 700;
}

.hint {
  margin-top: 0.6rem;
  color: var(--vp-c-text-2);
  font-size: 0.85rem;
}

.layers {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.5rem;
}

.layer {
  text-align: left;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  border-radius: 8px;
  padding: 0.75rem;
  cursor: pointer;
}

.layer.active {
  border-color: var(--vp-c-brand);
  box-shadow: 0 0 0 3px rgba(var(--vp-c-brand-rgb), 0.12);
}

.layer-name {
  font-weight: 900;
}

.layer-desc {
  margin-top: 0.25rem;
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
  line-height: 1.5;
}

.explain {
  margin-top: 0.75rem;
  padding-top: 0.75rem;
  border-top: 1px solid var(--vp-c-divider);
}

.explain-title {
  font-weight: 900;
}

.explain-text {
  margin-top: 0.25rem;
  color: var(--vp-c-text-2);
  line-height: 1.6;
}
</style>
