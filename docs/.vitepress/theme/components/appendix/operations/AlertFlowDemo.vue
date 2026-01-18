<!--
  AlertFlowDemo.vue
  告警流程演示：展示从监控指标异常到告警通知的完整流程
-->
<template>
  <div class="alert-flow-demo">
    <div class="header">
      <div class="title">告警流程 (Alerting Flow)</div>
      <div class="subtitle">从发现异常到通知运维的自动化流程</div>
    </div>

    <div class="controls">
      <button
        v-for="scenario in scenarios"
        :key="scenario.id"
        :class="['scenario-btn', { active: activeScenario === scenario.id }]"
        @click="triggerScenario(scenario.id)"
      >
        {{ scenario.name }}
      </button>
    </div>

    <div class="flow-steps">
      <div
        v-for="(step, index) in steps"
        :key="step.id"
        :class="[
          'flow-step',
          { active: step.active, completed: step.completed }
        ]"
      >
        <div class="step-number">{{ index + 1 }}</div>
        <div class="step-content">
          <div class="step-title">{{ step.title }}</div>
          <div class="step-desc">{{ step.desc }}</div>
          <div v-if="step.details" class="step-details">{{ step.details }}</div>
        </div>
        <div v-if="index < steps.length - 1" class="step-arrow">→</div>
      </div>
    </div>

    <div class="alert-info" v-if="currentAlert">
      <div class="alert-header" :class="'level-' + currentAlert.level">
        <span class="alert-icon">⚠️</span>
        <span class="alert-title">告警详情</span>
        <span class="alert-level">{{ currentAlert.levelName }}</span>
      </div>
      <div class="alert-body">
        <div class="alert-row">
          <span class="label">告警名称：</span>
          <span class="value">{{ currentAlert.name }}</span>
        </div>
        <div class="alert-row">
          <span class="label">触发时间：</span>
          <span class="value">{{ currentAlert.time }}</span>
        </div>
        <div class="alert-row">
          <span class="label">当前值：</span>
          <span class="value critical">{{ currentAlert.currentValue }}</span>
        </div>
        <div class="alert-row">
          <span class="label">阈值：</span>
          <span class="value">{{ currentAlert.threshold }}</span>
        </div>
        <div class="alert-row">
          <span class="label">通知渠道：</span>
          <span class="value">{{ currentAlert.channels.join(', ') }}</span>
        </div>
      </div>
    </div>

    <div class="level-guide">
      <div class="guide-title">告警级别说明</div>
      <div class="levels">
        <div class="level-item">
          <span class="level-badge p0">P0</span>
          <span>最高优先级，立即处理（如核心服务宕机）</span>
        </div>
        <div class="level-item">
          <span class="level-badge p1">P1</span>
          <span>高优先级，30分钟内处理（如部分功能异常）</span>
        </div>
        <div class="level-item">
          <span class="level-badge p2">P2</span>
          <span>中优先级，当天处理（如性能下降）</span>
        </div>
        <div class="level-item">
          <span class="level-badge p3">P3</span>
          <span>低优先级，本周处理（如资源使用率偏高）</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const activeScenario = ref(null)
const currentAlert = ref(null)

const scenarios = [
  { id: 'cpu', name: 'CPU 过载告警' },
  { id: 'latency', name: '响应延迟告警' },
  { id: 'error', name: '错误率飙升告警' },
  { id: 'disk', name: '磁盘空间不足告警' }
]

const steps = ref([
  {
    id: 'monitor',
    title: '监控采集',
    desc: 'Prometheus 每隔 15s 采集一次指标',
    active: false,
    completed: false
  },
  {
    id: 'rule',
    title: '规则评估',
    desc: 'Alertmanager 评估是否满足告警条件',
    active: false,
    completed: false
  },
  {
    id: 'group',
    title: '告警分组',
    desc: '相似告警合并，避免轰炸',
    active: false,
    completed: false
  },
  {
    id: 'silence',
    title: '静默判断',
    desc: '检查是否在静默时间（如维护窗口）',
    active: false,
    completed: false
  },
  {
    id: 'route',
    title: '路由分发',
    desc: '根据标签分发到不同接收器',
    active: false,
    completed: false
  },
  {
    id: 'notify',
    title: '发送通知',
    desc: '通过钉钉/邮件/短信通知值班人员',
    active: false,
    completed: false
  }
])

const scenarioData = {
  cpu: {
    name: 'CPU 使用率过高',
    level: 'p1',
    levelName: 'P1 - 高优先级',
    currentValue: '92%',
    threshold: '> 85%',
    channels: ['钉钉', '短信', '邮件']
  },
  latency: {
    name: 'API 响应延迟过高',
    level: 'p0',
    levelName: 'P0 - 最高优先级',
    currentValue: '2350ms',
    threshold: '> 1000ms',
    channels: ['钉钉', '短信', '电话']
  },
  error: {
    name: '错误率异常升高',
    level: 'p0',
    levelName: 'P0 - 最高优先级',
    currentValue: '8.5%',
    threshold: '> 5%',
    channels: ['钉钉', '短信', '电话', '邮件']
  },
  disk: {
    name: '磁盘空间不足',
    level: 'p2',
    levelName: 'P2 - 中优先级',
    currentValue: '88%',
    threshold: '> 85%',
    channels: ['钉钉', '邮件']
  }
}

const triggerScenario = async (scenarioId) => {
  activeScenario.value = scenarioId
  currentAlert.value = null

  // 重置所有步骤
  steps.value.forEach((step) => {
    step.active = false
    step.completed = false
  })

  // 逐步执行流程
  for (let i = 0; i < steps.value.length; i++) {
    steps.value[i].active = true

    await new Promise((resolve) => setTimeout(resolve, 600))

    steps.value[i].active = false
    steps.value[i].completed = true

    // 最后一步时显示告警详情
    if (i === steps.value.length - 1) {
      const data = scenarioData[scenarioId]
      currentAlert.value = {
        ...data,
        time: new Date().toLocaleString('zh-CN')
      }
    }
  }
}
</script>

<style scoped>
.alert-flow-demo {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  padding: 1.5rem;
  margin: 1.5rem 0;
  font-family: var(--vp-font-family-base);
}

.header {
  margin-bottom: 1.5rem;
}

.title {
  font-weight: 700;
  font-size: 1.1rem;
  margin-bottom: 0.25rem;
}

.subtitle {
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
}

.controls {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
}

.scenario-btn {
  padding: 0.5rem 1rem;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.2s;
}

.scenario-btn:hover {
  border-color: var(--vp-c-brand);
  color: var(--vp-c-brand);
}

.scenario-btn.active {
  background: var(--vp-c-brand);
  color: #fff;
  border-color: var(--vp-c-brand);
}

.flow-steps {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.flow-step {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  background: var(--vp-c-bg);
  border-radius: 8px;
  border: 2px solid var(--vp-c-divider);
  transition: all 0.3s;
}

.flow-step.active {
  border-color: var(--vp-c-brand);
  background: rgba(var(--vp-c-brand-rgb), 0.05);
}

.flow-step.completed {
  border-color: #22c55e;
  background: rgba(34, 197, 94, 0.05);
}

.step-number {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: var(--vp-c-bg-soft);
  border: 2px solid var(--vp-c-divider);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 0.9rem;
  flex-shrink: 0;
}

.flow-step.active .step-number {
  border-color: var(--vp-c-brand);
  color: var(--vp-c-brand);
}

.flow-step.completed .step-number {
  border-color: #22c55e;
  color: #22c55e;
}

.step-content {
  flex: 1;
}

.step-title {
  font-weight: 600;
  font-size: 0.95rem;
  margin-bottom: 0.25rem;
}

.step-desc {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

.step-details {
  margin-top: 0.5rem;
  padding: 0.5rem;
  background: var(--vp-c-bg-soft);
  border-radius: 4px;
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
}

.step-arrow {
  font-size: 1.5rem;
  color: var(--vp-c-text-2);
  flex-shrink: 0;
}

.alert-info {
  background: var(--vp-c-bg);
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 1.5rem;
}

.alert-header {
  padding: 1rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: #fff;
}

.alert-header.level-p0 {
  background: #ef4444;
}

.alert-header.level-p1 {
  background: #f59e0b;
}

.alert-header.level-p2 {
  background: #eab308;
}

.alert-icon {
  font-size: 1.5rem;
}

.alert-title {
  font-weight: 700;
  font-size: 1rem;
  flex: 1;
}

.alert-level {
  background: rgba(255, 255, 255, 0.2);
  padding: 0.25rem 0.75rem;
  border-radius: 999px;
  font-size: 0.85rem;
  font-weight: 600;
}

.alert-body {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.alert-row {
  display: flex;
  font-size: 0.9rem;
}

.label {
  color: var(--vp-c-text-2);
  min-width: 100px;
}

.value {
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.value.critical {
  color: #ef4444;
}

.level-guide {
  background: var(--vp-c-bg);
  border-radius: 10px;
  padding: 1rem;
  border: 1px solid var(--vp-c-divider);
}

.guide-title {
  font-weight: 700;
  font-size: 0.95rem;
  margin-bottom: 0.75rem;
}

.levels {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.level-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.85rem;
}

.level-badge {
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-weight: 700;
  font-size: 0.75rem;
  color: #fff;
  min-width: 40px;
  text-align: center;
}

.level-badge.p0 {
  background: #ef4444;
}

.level-badge.p1 {
  background: #f59e0b;
}

.level-badge.p2 {
  background: #eab308;
}

.level-badge.p3 {
  background: #84cc16;
}

@media (max-width: 768px) {
  .flow-steps {
    gap: 0.5rem;
  }

  .flow-step {
    flex-direction: column;
    align-items: flex-start;
  }

  .step-arrow {
    transform: rotate(90deg);
    align-self: center;
  }

  .controls {
    flex-direction: column;
  }

  .scenario-btn {
    width: 100%;
  }
}
</style>
