<!--
  SamplerComparisonDemo.vue
  采样器对比演示组件

  用途：
  展示不同采样器（Euler, DPM++, DDIM 等）的生成特点，帮助用户选择合适的采样器。

  交互功能：
  - 采样器选择对比
  - 步数调节
  - 生成路径可视化
  - 速度/质量权衡展示
-->
<template>
  <div class="sampler-demo">
    <el-card shadow="never">
      <template #header>
        <div class="header-title">
          <el-icon><Timer /></el-icon>
          <span>⏱️ 采样器对比</span>
        </div>
      </template>

      <div class="demo-content">
        <!-- 采样器列表 -->
        <div class="sampler-list">
          <div
            v-for="sampler in samplers"
            :key="sampler.id"
            class="sampler-card"
            :class="{ active: selectedSampler === sampler.id }"
            @click="selectedSampler = sampler.id"
          >
            <div class="sampler-header">
              <span class="sampler-name">{{ sampler.name }}</span>
              <el-tag :type="sampler.speed" size="small">{{ sampler.speedLabel }}</el-tag>
            </div>
            <div class="sampler-desc">{{ sampler.description }}</div>
            <div class="sampler-pros-cons">
              <div class="pros">
                <el-icon><CircleCheck /></el-icon>
                {{ sampler.pros }}
              </div>
              <div class="cons">
                <el-icon><CircleClose /></el-icon>
                {{ sampler.cons }}
              </div>
            </div>
          </div>
        </div>

        <!-- 可视化对比 -->
        <div class="visualization-section">
          <div class="viz-header">
            <span class="viz-title">生成路径可视化</span>
            <el-slider
              v-model="steps"
              :min="10"
              :max="50"
              :step="5"
              show-stops
              style="width: 200px"
            />
            <span class="steps-label">{{ steps }} 步</span>
          </div>

          <div class="path-visualization">
            <canvas
              ref="pathCanvas"
              width="600"
              height="300"
              class="path-canvas"
            />
          </div>

          <div class="sampler-details">
            <el-descriptions :column="2" border>
              <el-descriptions-item label="推荐步数">
                {{ currentSampler.recommendedSteps }}
              </el-descriptions-item>
              <el-descriptions-item label="收敛速度">
                {{ currentSampler.convergence }}
              </el-descriptions-item>
              <el-descriptions-item label="适用场景">
                {{ currentSampler.useCase }}
              </el-descriptions-item>
              <el-descriptions-item label="稳定性">
                <el-rate
                  :model-value="currentSampler.stability"
                  disabled
                  show-score
                  text-color="#ff9900"
                />
              </el-descriptions-item>
            </el-descriptions>
          </div>
        </div>

        <!-- 推荐矩阵 -->
        <div class="recommendation-matrix">
          <div class="matrix-title">🎯 采样器选择指南</div>
          <div class="matrix-grid">
            <div class="matrix-row header">
              <div class="matrix-cell">场景</div>
              <div class="matrix-cell">推荐采样器</div>
              <div class="matrix-cell">原因</div>
            </div>
            <div
              v-for="rec in recommendations"
              :key="rec.scenario"
              class="matrix-row"
            >
              <div class="matrix-cell scenario">{{ rec.scenario }}</div>
              <div class="matrix-cell">
                <el-tag type="primary">{{ rec.sampler }}</el-tag>
              </div>
              <div class="matrix-cell reason">{{ rec.reason }}</div>
            </div>
          </div>
        </div>
      </div>

      <div class="info-box">
        <p>
          <span class="icon">💡</span>
          <strong>采样器的作用：</strong>
          采样器决定了如何从噪声中逐步恢复图像。不同的采样器有不同的数学特性，影响生成速度、质量和稳定性。
        </p>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { Timer, CircleCheck, CircleClose } from '@element-plus/icons-vue'

const selectedSampler = ref('euler')
const steps = ref(20)
const pathCanvas = ref(null)

const samplers = [
  {
    id: 'euler',
    name: 'Euler',
    speed: 'success',
    speedLabel: '快速',
    description: '最简单高效的采样器，适合快速预览',
    pros: '速度快，内存占用低',
    cons: '步数少时可能不够精细',
    recommendedSteps: '20-30',
    convergence: '中等',
    useCase: '快速迭代、草图生成',
    stability: 3
  },
  {
    id: 'euler_a',
    name: 'Euler a',
    speed: 'success',
    speedLabel: '快速',
    description: 'Euler 的祖先版本，更具创造性',
    pros: '生成结果更有创意',
    cons: '收敛性较差，结果不稳定',
    recommendedSteps: '25-35',
    convergence: '慢',
    useCase: '艺术创作、探索性生成',
    stability: 2
  },
  {
    id: 'dpm',
    name: 'DPM++ 2M',
    speed: 'warning',
    speedLabel: '中等',
    description: '当前最流行的采样器，平衡了速度和质量',
    pros: '质量高，收敛快',
    cons: '计算量稍大',
    recommendedSteps: '20-30',
    convergence: '快',
    useCase: '大多数场景的首选',
    stability: 5
  },
  {
    id: 'dpm_karras',
    name: 'DPM++ 2M Karras',
    speed: 'warning',
    speedLabel: '中等',
    description: '使用 Karras 噪声调度的 DPM++',
    pros: '低步数也能出好效果',
    cons: '需要更多显存',
    recommendedSteps: '15-25',
    convergence: '很快',
    useCase: '高质量最终输出',
    stability: 5
  },
  {
    id: 'ddim',
    name: 'DDIM',
    speed: 'danger',
    speedLabel: '较慢',
    description: '确定性采样器，可复现结果',
    pros: '确定性，相同种子结果一致',
    cons: '速度较慢',
    recommendedSteps: '25-50',
    convergence: '中等',
    useCase: '需要可复现结果的场景',
    stability: 4
  },
  {
    id: 'uni_pc',
    name: 'UniPC',
    speed: 'success',
    speedLabel: '快速',
    description: '新型采样器，5-10 步即可出图',
    pros: '极快，低步数效果好',
    cons: '较新，兼容性待验证',
    recommendedSteps: '5-15',
    convergence: '极快',
    useCase: '实时应用、快速预览',
    stability: 4
  }
]

const currentSampler = computed(() => {
  return samplers.find(s => s.id === selectedSampler.value) || samplers[0]
})

const recommendations = [
  {
    scenario: '快速预览',
    sampler: 'Euler / UniPC',
    reason: '步数少，速度快，适合快速尝试不同提示词'
  },
  {
    scenario: '最终输出',
    sampler: 'DPM++ 2M Karras',
    reason: '质量高，收敛快，15-20 步即可出高质量图'
  },
  {
    scenario: '艺术创作',
    sampler: 'Euler a',
    reason: '结果更有创意和随机性，适合探索'
  },
  {
    scenario: '需要可复现',
    sampler: 'DDIM',
    reason: '确定性采样，相同参数结果完全一致'
  }
]

// 绘制采样路径可视化
const drawPathVisualization = () => {
  const canvas = pathCanvas.value
  if (!canvas) return

  const ctx = canvas.getContext('2d')
  const width = canvas.width
  const height = canvas.height

  // 清空画布
  ctx.fillStyle = '#f5f5f5'
  ctx.fillRect(0, 0, width, height)

  // 绘制坐标轴
  ctx.strokeStyle = '#ccc'
  ctx.lineWidth = 1
  ctx.beginPath()
  ctx.moveTo(40, height - 40)
  ctx.lineTo(width - 20, height - 40)
  ctx.moveTo(40, height - 40)
  ctx.lineTo(40, 20)
  ctx.stroke()

  // 标签
  ctx.fillStyle = '#666'
  ctx.font = '12px sans-serif'
  ctx.fillText('步数 →', width - 60, height - 20)
  ctx.save()
  ctx.translate(20, height / 2)
  ctx.rotate(-Math.PI / 2)
  ctx.fillText('图像质量 →', 0, 0)
  ctx.restore()

  // 绘制不同采样器的收敛曲线
  const samplerCurves = {
    euler: { color: '#67c23a', curve: t => 1 - Math.exp(-t * 2) },
    euler_a: { color: '#e6a23c', curve: t => 1 - Math.exp(-t * 1.5) + Math.sin(t * 10) * 0.05 },
    dpm: { color: '#409eff', curve: t => 1 - Math.exp(-t * 3) },
    dpm_karras: { color: '#409eff', curve: t => 1 - Math.exp(-t * 4), dashed: true },
    ddim: { color: '#f56c6c', curve: t => 1 - Math.exp(-t * 1.8) },
    uni_pc: { color: '#909399', curve: t => 1 - Math.exp(-t * 5) }
  }

  const plotWidth = width - 60
  const plotHeight = height - 60

  Object.entries(samplerCurves).forEach(([id, config]) => {
    if (id !== selectedSampler.value && id !== 'dpm_karras') return

    ctx.strokeStyle = config.color
    ctx.lineWidth = id === selectedSampler.value ? 3 : 2
    ctx.setLineDash(config.dashed ? [5, 5] : [])

    ctx.beginPath()
    for (let i = 0; i <= steps.value; i++) {
      const t = i / 50
      const x = 40 + (i / 50) * plotWidth
      const y = height - 40 - config.curve(t) * plotHeight * 0.9

      if (i === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    }
    ctx.stroke()
  })

  ctx.setLineDash([])

  // 绘制当前步数标记
  const currentX = 40 + (steps.value / 50) * plotWidth
  ctx.strokeStyle = '#ff6b6b'
  ctx.lineWidth = 2
  ctx.beginPath()
  ctx.moveTo(currentX, 20)
  ctx.lineTo(currentX, height - 40)
  ctx.stroke()

  // 标记点
  const selectedCurve = samplerCurves[selectedSampler.value]
  const currentT = steps.value / 50
  const currentY = height - 40 - selectedCurve.curve(currentT) * plotHeight * 0.9

  ctx.fillStyle = '#ff6b6b'
  ctx.beginPath()
  ctx.arc(currentX, currentY, 6, 0, Math.PI * 2)
  ctx.fill()

  // 图例
  let legendY = 30
  ctx.font = '12px sans-serif'
  Object.entries(samplerCurves).forEach(([id, config]) => {
    if (id !== selectedSampler.value) return

    ctx.fillStyle = config.color
    ctx.fillRect(width - 120, legendY, 15, 3)
    ctx.fillStyle = '#666'
    ctx.fillText(samplers.find(s => s.id === id)?.name || id, width - 100, legendY + 5)
    legendY += 20
  })
}

onMounted(drawPathVisualization)
watch([selectedSampler, steps], drawPathVisualization)
</script>

<style scoped>
.sampler-demo {
  margin: 1rem 0;
}

.header-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
}

.demo-content {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.sampler-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 16px;
}

.sampler-card {
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  padding: 16px;
  cursor: pointer;
  transition: all 0.2s;
  border: 2px solid transparent;
}

.sampler-card:hover {
  border-color: var(--vp-c-brand);
}

.sampler-card.active {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-bg-mute);
}

.sampler-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.sampler-name {
  font-weight: 600;
  font-size: 1.1rem;
}

.sampler-desc {
  font-size: 0.875rem;
  color: var(--vp-c-text-2);
  margin-bottom: 12px;
}

.sampler-pros-cons {
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: 0.8rem;
}

.pros {
  color: #67c23a;
  display: flex;
  align-items: center;
  gap: 4px;
}

.cons {
  color: #f56c6c;
  display: flex;
  align-items: center;
  gap: 4px;
}

.visualization-section {
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  padding: 20px;
}

.viz-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
  flex-wrap: wrap;
}

.viz-title {
  font-weight: 500;
}

.steps-label {
  font-size: 0.875rem;
  color: var(--vp-c-text-2);
}

.path-visualization {
  background: var(--vp-c-bg);
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 16px;
}

.path-canvas {
  width: 100%;
  height: auto;
  max-height: 300px;
}

.sampler-details {
  margin-top: 16px;
}

.recommendation-matrix {
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  padding: 20px;
}

.matrix-title {
  font-weight: 500;
  margin-bottom: 16px;
  text-align: center;
}

.matrix-grid {
  display: flex;
  flex-direction: column;
  gap: 1px;
  background: var(--vp-c-divider);
  border-radius: 8px;
  overflow: hidden;
}

.matrix-row {
  display: grid;
  grid-template-columns: 1fr 1.5fr 2fr;
  background: var(--vp-c-bg);
}

.matrix-row.header {
  background: var(--vp-c-bg-mute);
  font-weight: 600;
}

.matrix-cell {
  padding: 12px;
  display: flex;
  align-items: center;
}

.matrix-cell.scenario {
  font-weight: 500;
}

.matrix-cell.reason {
  font-size: 0.875rem;
  color: var(--vp-c-text-2);
}

.info-box {
  margin-top: 16px;
  padding: 12px;
  background: var(--vp-c-bg-mute);
  border-radius: 6px;
  font-size: 0.9rem;
  line-height: 1.6;
}

.icon {
  font-size: 1.2em;
}

@media (max-width: 640px) {
  .matrix-row {
    grid-template-columns: 1fr;
    gap: 8px;
    padding: 12px;
  }

  .matrix-row.header {
    display: none;
  }

  .matrix-cell {
    padding: 4px;
  }

  .matrix-cell::before {
    content: attr(data-label);
    font-weight: 600;
    margin-right: 8px;
  }
}
</style>
