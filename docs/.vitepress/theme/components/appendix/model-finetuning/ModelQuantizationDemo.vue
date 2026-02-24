<template>
  <div class="quantization-demo">
    <div class="demo-header">
      <h4>模型量化演示</h4>
      <p class="subtitle">拖动滑块，直观感受不同精度下的模型体积、速度与质量变化</p>
    </div>

    <div class="precision-selector">
      <div
        v-for="(p, i) in precisions"
        :key="p.id"
        class="precision-card"
        :class="{ active: activePrecision === i }"
        @click="activePrecision = i"
      >
        <div class="prec-badge" :style="{ background: p.color }">{{ p.label }}</div>
        <div class="prec-bits">{{ p.bits }} bit</div>
      </div>
    </div>

    <div class="metrics-grid">
      <div class="metric-card">
        <div class="metric-icon">💾</div>
        <div class="metric-label">模型体积</div>
        <div class="metric-bar-wrap">
          <div class="metric-bar" :style="{ width: currentPrecision.sizePercent + '%', background: currentPrecision.color }"></div>
        </div>
        <div class="metric-value">{{ currentPrecision.size }}</div>
      </div>

      <div class="metric-card">
        <div class="metric-icon">⚡</div>
        <div class="metric-label">推理速度</div>
        <div class="metric-bar-wrap">
          <div class="metric-bar" :style="{ width: currentPrecision.speedPercent + '%', background: '#10b981' }"></div>
        </div>
        <div class="metric-value">{{ currentPrecision.speed }}</div>
      </div>

      <div class="metric-card">
        <div class="metric-icon">🎯</div>
        <div class="metric-label">输出质量</div>
        <div class="metric-bar-wrap">
          <div class="metric-bar" :style="{ width: currentPrecision.qualityPercent + '%', background: '#818cf8' }"></div>
        </div>
        <div class="metric-value">{{ currentPrecision.quality }}</div>
      </div>

      <div class="metric-card">
        <div class="metric-icon">🖥️</div>
        <div class="metric-label">显存需求</div>
        <div class="metric-bar-wrap">
          <div class="metric-bar" :style="{ width: currentPrecision.vramPercent + '%', background: '#f59e0b' }"></div>
        </div>
        <div class="metric-value">{{ currentPrecision.vram }}</div>
      </div>
    </div>

    <div class="detail-section">
      <div class="detail-title">{{ currentPrecision.label }} 详解</div>
      <p class="detail-desc">{{ currentPrecision.description }}</p>

      <div class="bit-visual">
        <div class="bit-label">单个参数存储示意</div>
        <div class="bit-row">
          <div
            v-for="i in currentPrecision.bits"
            :key="i"
            class="bit-cell"
            :style="{ background: currentPrecision.color }"
          >{{ i % 2 === 0 ? '1' : '0' }}</div>
        </div>
        <div class="bit-info">每个参数占用 {{ currentPrecision.bits }} 位 = {{ currentPrecision.bytes }} 字节</div>
      </div>

      <div class="use-case">
        <span class="use-label">适用场景：</span>
        <span>{{ currentPrecision.useCase }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const activePrecision = ref(0)

const precisions = [
  {
    id: 'fp32',
    label: 'FP32',
    bits: 32,
    bytes: 4,
    color: '#ef4444',
    size: '~28 GB (7B 模型)',
    sizePercent: 100,
    speed: '1x (基准)',
    speedPercent: 25,
    quality: '100% (无损)',
    qualityPercent: 100,
    vram: '~32 GB',
    vramPercent: 100,
    description: 'FP32（32位浮点数）是模型训练时的默认精度。每个参数用 32 位存储，精度最高但体积最大。通常只在训练阶段使用，推理时很少直接使用 FP32。',
    useCase: '模型训练、科研实验、精度敏感的任务'
  },
  {
    id: 'fp16',
    label: 'FP16',
    bits: 16,
    bytes: 2,
    color: '#f59e0b',
    size: '~14 GB (7B 模型)',
    sizePercent: 50,
    speed: '2x',
    speedPercent: 50,
    quality: '~99.5%',
    qualityPercent: 99,
    vram: '~16 GB',
    vramPercent: 50,
    description: 'FP16（16位浮点数）将精度减半，模型体积直接缩小一半。在绝大多数场景下，FP16 的输出质量与 FP32 几乎无差别，是目前最主流的推理精度。',
    useCase: '标准推理部署、GPU 服务器、大多数生产环境'
  },
  {
    id: 'int8',
    label: 'INT8',
    bits: 8,
    bytes: 1,
    color: '#10b981',
    size: '~7 GB (7B 模型)',
    sizePercent: 25,
    speed: '3-4x',
    speedPercent: 75,
    quality: '~98%',
    qualityPercent: 96,
    vram: '~8 GB',
    vramPercent: 25,
    description: 'INT8（8位整数）量化将浮点数映射为整数，体积仅为 FP32 的四分之一。质量损失很小，但推理速度显著提升。适合在消费级 GPU 上运行大模型。',
    useCase: '消费级 GPU 部署（RTX 4090）、成本敏感场景'
  },
  {
    id: 'int4',
    label: 'INT4',
    bits: 4,
    bytes: 0.5,
    color: '#818cf8',
    size: '~3.5 GB (7B 模型)',
    sizePercent: 12.5,
    speed: '5-6x',
    speedPercent: 90,
    quality: '~93-95%',
    qualityPercent: 90,
    vram: '~4 GB',
    vramPercent: 12.5,
    description: 'INT4（4位整数）是目前最激进的量化方案。模型体积压缩到 FP32 的八分之一，甚至可以在笔记本电脑上运行 7B 模型。质量有一定损失，但对于大多数应用仍然可用。',
    useCase: '笔记本/手机端部署、边缘计算、离线场景'
  }
]

const currentPrecision = computed(() => precisions[activePrecision.value])
</script>

<style scoped>
.quantization-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 24px;
  margin: 16px 0;
  background: var(--vp-c-bg-soft);
}

.demo-header h4 {
  margin: 0 0 4px;
  font-size: 16px;
  color: var(--vp-c-text-1);
}

.subtitle {
  margin: 0 0 20px;
  font-size: 13px;
  color: var(--vp-c-text-3);
}

.precision-selector {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.precision-card {
  flex: 1;
  min-width: 80px;
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 12px;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s;
}

.precision-card.active {
  border-color: var(--vp-c-brand-1);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.prec-badge {
  display: inline-block;
  padding: 2px 10px;
  border-radius: 10px;
  color: #fff;
  font-size: 12px;
  font-weight: 700;
  margin-bottom: 4px;
}

.prec-bits {
  font-size: 11px;
  color: var(--vp-c-text-3);
}

.metrics-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  margin-bottom: 20px;
}

@media (max-width: 640px) {
  .metrics-grid {
    grid-template-columns: 1fr;
  }
}

.metric-card {
  background: var(--vp-c-bg);
  border-radius: 8px;
  padding: 14px;
}

.metric-icon {
  font-size: 18px;
  margin-bottom: 4px;
}

.metric-label {
  font-size: 12px;
  color: var(--vp-c-text-3);
  margin-bottom: 8px;
}

.metric-bar-wrap {
  height: 6px;
  background: var(--vp-c-divider);
  border-radius: 3px;
  overflow: hidden;
  margin-bottom: 6px;
}

.metric-bar {
  height: 100%;
  border-radius: 3px;
  transition: width 0.5s ease;
}

.metric-value {
  font-size: 13px;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.detail-section {
  background: var(--vp-c-bg);
  border-radius: 8px;
  padding: 16px;
  border: 1px solid var(--vp-c-divider);
}

.detail-title {
  font-size: 15px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 8px;
}

.detail-desc {
  font-size: 13px;
  color: var(--vp-c-text-2);
  line-height: 1.7;
  margin: 0 0 16px;
}

.bit-visual {
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  padding: 12px;
  margin-bottom: 12px;
}

.bit-label {
  font-size: 11px;
  color: var(--vp-c-text-3);
  margin-bottom: 8px;
}

.bit-row {
  display: flex;
  gap: 2px;
  flex-wrap: wrap;
  margin-bottom: 6px;
}

.bit-cell {
  width: 20px;
  height: 20px;
  border-radius: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 10px;
  font-weight: 600;
  font-family: monospace;
}

.bit-info {
  font-size: 12px;
  color: var(--vp-c-text-3);
}

.use-case {
  font-size: 13px;
  color: var(--vp-c-text-2);
  padding: 8px 12px;
  background: var(--vp-c-brand-soft);
  border-radius: 6px;
}

.use-label {
  font-weight: 600;
  color: var(--vp-c-brand-1);
}
</style>
