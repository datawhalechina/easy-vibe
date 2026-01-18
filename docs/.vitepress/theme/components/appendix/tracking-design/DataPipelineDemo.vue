<!--
  DataPipelineDemo.vue
  数据处理管道 - 展示数据从采集到分析的完整流程
-->
<template>
  <div class="data-pipeline-demo">
    <div class="header">
      <div class="title">数据处理管道</div>
      <div class="subtitle">从用户行为到数据洞察的完整链路</div>
    </div>

    <div class="pipeline-container">
      <div class="pipeline-flow">
        <div
          v-for="(step, index) in pipelineSteps"
          :key="step.id"
          class="pipeline-step"
          :class="{
            active: currentStep === index,
            completed: currentStep > index
          }"
        >
          <div class="step-header">
            <div class="step-number">{{ index + 1 }}</div>
            <div class="step-info">
              <div class="step-name">{{ step.name }}</div>
              <div class="step-icon">{{ step.icon }}</div>
            </div>
          </div>

          <div class="step-content">
            <div class="step-description">{{ step.description }}</div>

            <div class="step-details">
              <div v-if="step.technologies" class="technologies">
                <div class="tech-label">技术栈：</div>
                <div class="tech-list">
                  <span
                    v-for="(tech, i) in step.technologies"
                    :key="i"
                    class="tech-tag"
                  >
                    {{ tech }}
                  </span>
                </div>
              </div>

              <div v-if="step.metrics" class="metrics">
                <div
                  class="metric"
                  v-for="(metric, i) in step.metrics"
                  :key="i"
                >
                  <div class="metric-value">{{ metric.value }}</div>
                  <div class="metric-label">{{ metric.label }}</div>
                </div>
              </div>
            </div>
          </div>

          <div v-if="index < pipelineSteps.length - 1" class="step-connector">
            <div class="connector-line"></div>
            <div class="connector-arrow">↓</div>
          </div>
        </div>
      </div>
    </div>

    <div class="play-controls">
      <button class="control-btn" @click="startAnimation" :disabled="isPlaying">
        <span v-if="!isPlaying">▶️ 演示数据流</span>
        <span v-else>⏸️ 演示中...</span>
      </button>
      <button class="control-btn secondary" @click="resetAnimation">
        🔄 重置
      </button>
    </div>

    <div class="data-flow-visualization">
      <div class="flow-title">实时数据流</div>
      <div class="flow-cards">
        <div class="flow-card" v-for="(item, index) in dataFlow" :key="index">
          <div class="flow-icon">{{ item.icon }}</div>
          <div class="flow-content">
            <div class="flow-name">{{ item.name }}</div>
            <div class="flow-count">
              {{ formatNumber(item.count) }} {{ item.unit }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="best-practices">
      <div class="practices-title">💡 数据管道最佳实践</div>
      <div class="practices-grid">
        <div class="practice-card">
          <div class="practice-icon">🔄</div>
          <div class="practice-content">
            <div class="practice-name">批量处理</div>
            <div class="practice-desc">
              将小数据包合并成大数据块处理，减少 I/O 开销，提升吞吐量
            </div>
          </div>
        </div>

        <div class="practice-card">
          <div class="practice-icon">⚡</div>
          <div class="practice-content">
            <div class="practice-name">异步非阻塞</div>
            <div class="practice-desc">
              使用消息队列和异步任务，避免阻塞主业务流程
            </div>
          </div>
        </div>

        <div class="practice-card">
          <div class="practice-icon">🛡️</div>
          <div class="practice-content">
            <div class="practice-name">容错机制</div>
            <div class="practice-desc">
              失败重试、死信队列、降级策略，确保数据不丢失
            </div>
          </div>
        </div>

        <div class="practice-card">
          <div class="practice-icon">📊</div>
          <div class="practice-content">
            <div class="practice-name">监控告警</div>
            <div class="practice-desc">
              实时监控数据量、延迟、错误率，异常及时告警
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const currentStep = ref(-1)
const isPlaying = ref(false)

const pipelineSteps = [
  {
    id: 'collection',
    name: '数据采集',
    icon: '📡',
    description: '客户端 SDK、后端埋点代码、CDN 日志采集用户行为数据',
    technologies: ['JavaScript SDK', 'Python SDK', 'CDN Logs', 'Webhook'],
    metrics: [
      { label: '采集量', value: '10M+/天' },
      { label: '成功率', value: '99.9%' }
    ]
  },
  {
    id: 'transmission',
    name: '数据传输',
    icon: '🚚',
    description: '加密上报、批量传输、断点续传，确保数据安全送达',
    technologies: ['HTTPS', 'Batch Upload', 'Retry Logic'],
    metrics: [
      { label: '传输量', value: '5GB/天' },
      { label: '延迟', value: '<100ms' }
    ]
  },
  {
    id: 'cleaning',
    name: '数据清洗',
    icon: '🧹',
    description: '去重、校验、格式化、补全，确保数据质量',
    technologies: ['ETL', 'Data Validation', 'Deduplication'],
    metrics: [
      { label: '清洗率', value: '95%' },
      { label: '准确率', value: '99.99%' }
    ]
  },
  {
    id: 'storage',
    name: '数据存储',
    icon: '🗄️',
    description: '分层存储：热数据、温数据、冷数据，优化成本',
    technologies: ['ClickHouse', 'S3', 'Redis', 'Hive'],
    metrics: [
      { label: '存储量', value: '100TB' },
      { label: '查询', value: '<1s' }
    ]
  },
  {
    id: 'analysis',
    name: '数据分析',
    icon: '📊',
    description: '可视化报表、用户分群、漏斗分析、归因分析',
    technologies: ['SQL', 'Python', 'Tableau', 'Metabase'],
    metrics: [
      { label: '报表数', value: '500+' },
      { label: '用户', value: '10K+' }
    ]
  }
]

const dataFlow = ref([
  { icon: '📱', name: '客户端事件', count: 158420, unit: '次/分' },
  { icon: '📤', name: '上报请求', count: 15842, unit: '次/分' },
  { icon: '✅', name: '成功入库', count: 15840, unit: '条/分' },
  { icon: '❌', name: '处理失败', count: 2, unit: '条/分' }
])

let animationInterval = null

const startAnimation = () => {
  if (isPlaying.value) return

  isPlaying.value = true
  currentStep.value = -1

  animationInterval = setInterval(() => {
    if (currentStep.value < pipelineSteps.length - 1) {
      currentStep.value++
    } else {
      clearInterval(animationInterval)
      isPlaying.value = false
    }
  }, 1000)
}

const resetAnimation = () => {
  if (animationInterval) {
    clearInterval(animationInterval)
  }
  currentStep.value = -1
  isPlaying.value = false
}

const formatNumber = (num) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

onMounted(() => {
  // 模拟实时数据流
  setInterval(() => {
    dataFlow.value = dataFlow.value.map((item) => ({
      ...item,
      count: item.count + Math.floor(Math.random() * 100) - 50
    }))
  }, 2000)
})
</script>

<style scoped>
.data-pipeline-demo {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  padding: 2rem;
  margin: 2rem 0;
  font-family: var(--vp-font-family-base);
}

.header {
  text-align: center;
  margin-bottom: 2rem;
}

.title {
  font-weight: 700;
  font-size: 1.3rem;
  margin-bottom: 0.5rem;
}

.subtitle {
  color: var(--vp-c-text-2);
  font-size: 1rem;
}

.pipeline-container {
  margin-bottom: 2rem;
}

.pipeline-flow {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.pipeline-step {
  display: flex;
  flex-direction: column;
  position: relative;
  padding: 1.5rem;
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider);
  border-radius: 12px;
  transition: all 0.3s;
}

.pipeline-step.active {
  border-color: var(--vp-c-brand);
  box-shadow: 0 0 0 3px rgba(60, 130, 246, 0.1);
  transform: scale(1.02);
}

.pipeline-step.completed {
  border-color: #22c55e;
  opacity: 0.8;
}

.step-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.step-number {
  width: 40px;
  height: 40px;
  background: var(--vp-c-brand);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  font-weight: 700;
  flex-shrink: 0;
}

.pipeline-step.completed .step-number {
  background: #22c55e;
}

.step-info {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.step-name {
  font-size: 1.1rem;
  font-weight: 700;
}

.step-icon {
  font-size: 2rem;
}

.step-description {
  color: var(--vp-c-text-2);
  line-height: 1.6;
  margin-bottom: 1rem;
}

.step-details {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.technologies {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.tech-label {
  font-weight: 600;
  font-size: 0.9rem;
  color: var(--vp-c-text-1);
}

.tech-list {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.tech-tag {
  padding: 0.25rem 0.75rem;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
}

.metrics {
  display: flex;
  gap: 2rem;
}

.metric {
  text-align: center;
}

.metric-value {
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--vp-c-brand);
  margin-bottom: 0.25rem;
}

.metric-label {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
}

.step-connector {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: -0.5rem 0;
  position: relative;
  z-index: 1;
}

.connector-line {
  width: 2px;
  height: 20px;
  background: var(--vp-c-divider);
  transition: background 0.3s;
}

.pipeline-step.active ~ .pipeline-step .connector-line,
.pipeline-step.completed + .pipeline-step .connector-line {
  background: var(--vp-c-brand);
}

.connector-arrow {
  font-size: 1.5rem;
  color: var(--vp-c-text-2);
  margin-top: -5px;
}

.play-controls {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
}

.control-btn {
  padding: 0.75rem 2rem;
  background: var(--vp-c-brand);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.control-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(60, 130, 246, 0.3);
}

.control-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.control-btn.secondary {
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  border: 2px solid var(--vp-c-divider);
}

.data-flow-visualization {
  background: var(--vp-c-bg);
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  border: 1px solid var(--vp-c-divider);
}

.flow-title {
  font-weight: 600;
  margin-bottom: 1rem;
  font-size: 1rem;
  text-align: center;
}

.flow-cards {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
}

.flow-card {
  background: var(--vp-c-bg-soft);
  padding: 1rem;
  border-radius: 10px;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.flow-icon {
  font-size: 2rem;
}

.flow-name {
  font-size: 0.85rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.flow-count {
  font-size: 0.9rem;
  color: var(--vp-c-brand);
  font-weight: 700;
}

.best-practices {
  background: linear-gradient(135deg, #fef3c7, #fde68a);
  border: 2px solid #f59e0b;
  border-radius: 12px;
  padding: 1.5rem;
}

.practices-title {
  font-weight: 700;
  font-size: 1.1rem;
  margin-bottom: 1rem;
  text-align: center;
}

.practices-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
}

.practice-card {
  background: white;
  padding: 1rem;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.practice-icon {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.practice-name {
  font-weight: 600;
  font-size: 0.95rem;
  margin-bottom: 0.25rem;
}

.practice-desc {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  line-height: 1.5;
}

@media (max-width: 768px) {
  .flow-cards,
  .practices-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .metrics {
    flex-direction: column;
    gap: 0.5rem;
  }
}
</style>
