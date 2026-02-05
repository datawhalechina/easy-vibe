<template>
  <div class="demo-container">
    <h4>浏览器渲染管线全景图</h4>
    <p class="demo-description">点击每个阶段查看详情，观察数据如何在管线中流动</p>

    <div class="pipeline-container">
      <div class="pipeline-flow">
        <div
          v-for="(stage, index) in stages"
          :key="stage.id"
          class="stage-card"
          :class="{
            active: activeStage === index,
            completed: activeStage > index,
            pending: activeStage < index
          }"
          @click="selectStage(index)"
        >
          <div class="stage-icon">{{ stage.icon }}</div>
          <div class="stage-name">{{ stage.name }}</div>
          <div class="stage-time">{{ stage.time }}</div>
        </div>

        <div class="flow-arrows">
          <div v-for="i in stages.length - 1" :key="i" class="flow-arrow">
            <span class="arrow-line"></span>
            <span class="arrow-head">▶</span>
          </div>
        </div>
      </div>

      <div class="stage-detail" v-if="activeStage >= 0">
        <div class="detail-header">
          <span class="detail-icon">{{ stages[activeStage].icon }}</span>
          <span class="detail-title">{{ stages[activeStage].name }}</span>
        </div>
        <div class="detail-content">
          <p>{{ stages[activeStage].description }}</p>
          <div class="detail-meta">
            <div class="meta-item">
              <span class="meta-label">输入:</span>
              <span class="meta-value">{{ stages[activeStage].input }}</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">输出:</span>
              <span class="meta-value">{{ stages[activeStage].output }}</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">耗时:</span>
              <span class="meta-value">{{ stages[activeStage].time }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="simulation-controls">
      <el-button type="primary" @click="startSimulation" :disabled="isSimulating">
        {{ isSimulating ? '模拟中...' : '开始模拟' }}
      </el-button>
      <el-button @click="resetSimulation">重置</el-button>
      <el-slider v-model="simulationSpeed" :min="1" :max="5" :step="1" style="width: 150px;" />
    </div>

    <div class="pipeline-stats" v-if="showStats">
      <div class="stat-card">
        <div class="stat-value">{{ totalTime }}ms</div>
        <div class="stat-label">总耗时</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">{{ bottleneckStage }}</div>
        <div class="stat-label">瓶颈阶段</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">{{ optimizationTip }}</div>
        <div class="stat-label">优化建议</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const stages = [
  {
    id: 'html',
    icon: '📄',
    name: 'HTML解析',
    time: '15ms',
    description: '浏览器接收HTML字节流，进行词法分析和语法分析，构建DOM树。这是渲染管线的起点。',
    input: 'HTML字节流',
    output: 'DOM树'
  },
  {
    id: 'css',
    icon: '🎨',
    name: 'CSS解析',
    time: '12ms',
    description: '解析CSS样式表，处理选择器优先级，构建CSSOM树。CSSOM与DOM是并行构建的。',
    input: 'CSS字节流',
    output: 'CSSOM树'
  },
  {
    id: 'render',
    icon: '🌳',
    name: '构建渲染树',
    time: '8ms',
    description: '将DOM树和CSSOM树合并，生成渲染树。只包含可见节点，并计算每个节点的样式。',
    input: 'DOM + CSSOM',
    output: '渲染树'
  },
  {
    id: 'layout',
    icon: '📐',
    name: '布局 (Reflow)',
    time: '25ms',
    description: '计算每个节点在视口中的精确位置和大小。这是最耗时的阶段之一，牵一发而动全身。',
    input: '渲染树',
    output: '几何信息'
  },
  {
    id: 'paint',
    icon: '✏️',
    name: '绘制 (Paint)',
    time: '18ms',
    description: '将每个节点转换为屏幕上的实际像素。包括文本、颜色、图像、边框等视觉内容。',
    input: '几何信息',
    output: '绘制记录'
  },
  {
    id: 'composite',
    icon: '🔮',
    name: '合成 (Composite)',
    time: '5ms',
    description: '将多个图层按照正确的层级顺序合并为最终图像。利用GPU加速，是现代浏览器的优化重点。',
    input: '绘制记录',
    output: '屏幕像素'
  }
]

const activeStage = ref(0)
const isSimulating = ref(false)
const simulationSpeed = ref(3)
const showStats = ref(false)

const totalTime = computed(() => {
  return stages.reduce((sum, stage) => sum + parseInt(stage.time), 0)
})

const bottleneckStage = computed(() => '布局阶段')
const optimizationTip = computed(() => '减少DOM操作')

function selectStage(index) {
  activeStage.value = index
}

function startSimulation() {
  isSimulating.value = true
  showStats.value = true
  activeStage.value = 0

  const interval = setInterval(() => {
    if (activeStage.value < stages.length - 1) {
      activeStage.value++
    } else {
      clearInterval(interval)
      isSimulating.value = false
    }
  }, (6 - simulationSpeed.value) * 800)
}

function resetSimulation() {
  isSimulating.value = false
  activeStage.value = 0
  showStats.value = false
}
</script>

<style scoped>
.demo-container {
  padding: 20px;
  background: #f5f7fa;
  border-radius: 8px;
}

h4 {
  margin: 0 0 8px 0;
  color: #303133;
}

.demo-description {
  color: #606266;
  font-size: 14px;
  margin-bottom: 20px;
}

.pipeline-container {
  background: white;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
}

.pipeline-flow {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  margin-bottom: 20px;
  overflow-x: auto;
  padding-bottom: 10px;
}

.stage-card {
  flex-shrink: 0;
  width: 100px;
  padding: 12px 8px;
  border: 2px solid #e4e7ed;
  border-radius: 8px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s;
  background: white;
  position: relative;
  z-index: 1;
}

.stage-card:hover {
  border-color: #409eff;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(64, 158, 255, 0.2);
}

.stage-card.active {
  border-color: #409eff;
  background: #ecf5ff;
  box-shadow: 0 0 0 3px rgba(64, 158, 255, 0.2);
}

.stage-card.completed {
  border-color: #67c23a;
  background: #f0f9eb;
}

.stage-icon {
  font-size: 24px;
  margin-bottom: 4px;
}

.stage-name {
  font-size: 12px;
  font-weight: 500;
  color: #303133;
  margin-bottom: 2px;
}

.stage-time {
  font-size: 11px;
  color: #909399;
}

.flow-arrows {
  position: absolute;
  top: 50%;
  left: 50px;
  right: 50px;
  height: 2px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  pointer-events: none;
  z-index: 0;
}

.flow-arrow {
  display: flex;
  align-items: center;
  color: #c0c4cc;
  font-size: 12px;
}

.arrow-line {
  width: 30px;
  height: 2px;
  background: #dcdfe6;
}

.arrow-head {
  margin-left: -5px;
}

.stage-detail {
  background: #f5f7fa;
  border-radius: 8px;
  padding: 16px;
}

.detail-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
}

.detail-icon {
  font-size: 20px;
}

.detail-title {
  font-size: 16px;
  font-weight: 600;
  color: #303133;
}

.detail-content {
  color: #606266;
  font-size: 14px;
  line-height: 1.6;
}

.detail-content p {
  margin: 0 0 12px 0;
}

.detail-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid #e4e7ed;
}

.meta-item {
  display: flex;
  gap: 6px;
  font-size: 13px;
}

.meta-label {
  color: #909399;
}

.meta-value {
  color: #409eff;
  font-weight: 500;
}

.simulation-controls {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.pipeline-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 16px;
}

.stat-card {
  background: white;
  border-radius: 8px;
  padding: 16px;
  text-align: center;
}

.stat-value {
  font-size: 20px;
  font-weight: 600;
  color: #409eff;
  margin-bottom: 4px;
}

.stat-label {
  font-size: 12px;
  color: #909399;
}

@media (max-width: 768px) {
  .pipeline-flow {
    flex-direction: column;
    gap: 12px;
  }

  .flow-arrows {
    display: none;
  }

  .stage-card {
    width: 100%;
    max-width: 200px;
  }

  .detail-meta {
    flex-direction: column;
    gap: 8px;
  }
}
</style>
