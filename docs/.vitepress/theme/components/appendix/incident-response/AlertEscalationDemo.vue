<!--
  AlertEscalationDemo.vue
  告警升级流程演示：展示告警如何根据严重程度和时间逐级升级
-->
<template>
  <div class="alert-escalation-demo">
    <div class="header">
      <div class="title">告警升级流程 (Alert Escalation)</div>
      <div class="subtitle">选择一个场景，观察告警如何逐级升级</div>
    </div>

    <div class="scenario-select">
      <button
        v-for="s in scenarios"
        :key="s.id"
        :class="['scenario-btn', { active: activeScenario === s.id }]"
        @click="startScenario(s.id)"
      >
        {{ s.name }}
      </button>
    </div>

    <div class="escalation-flow">
      <div
        v-for="(step, index) in escalationSteps"
        :key="step.id"
        :class="[
          'esc-step',
          {
            active: currentStep === index,
            completed: currentStep > index,
            pending: currentStep < index
          }
        ]"
      >
        <div class="esc-left">
          <div class="esc-icon" :style="{ background: step.color }">
            {{ step.icon }}
          </div>
          <div v-if="index < escalationSteps.length - 1" class="esc-line">
            <div
              class="esc-line-fill"
              :class="{ filled: currentStep > index }"
            ></div>
          </div>
        </div>
        <div class="esc-content">
          <div class="esc-header">
            <span class="esc-title">{{ step.title }}</span>
            <span class="esc-time">{{ step.time }}</span>
          </div>
          <div class="esc-desc">{{ step.desc }}</div>
          <div v-if="step.action && currentStep >= index" class="esc-action">
            {{ step.action }}
          </div>
        </div>
      </div>
    </div>

    <div v-if="activeScenario" class="timer-bar">
      <div class="timer-label">
        升级进度：第 {{ currentStep + 1 }} / {{ escalationSteps.length }} 级
      </div>
      <div class="timer-track">
        <div
          class="timer-fill"
          :style="{
            width: ((currentStep + 1) / escalationSteps.length) * 100 + '%'
          }"
        ></div>
      </div>
      <div class="timer-controls">
        <button
          class="ctrl-btn"
          @click="prevStep"
          :disabled="currentStep <= 0"
        >
          上一级
        </button>
        <button
          class="ctrl-btn"
          @click="nextStep"
          :disabled="currentStep >= escalationSteps.length - 1"
        >
          下一级升级
        </button>
      </div>
    </div>

    <div class="rule-box">
      <div class="rule-title">升级规则说明</div>
      <div class="rules">
        <div class="rule-item">
          <span class="rule-dot" style="background: #22c55e"></span>
          <span>P3/P4 告警：仅通知值班工程师，无需升级</span>
        </div>
        <div class="rule-item">
          <span class="rule-dot" style="background: #eab308"></span>
          <span>P2 告警：15 分钟未响应则升级至团队负责人</span>
        </div>
        <div class="rule-item">
          <span class="rule-dot" style="background: #f59e0b"></span>
          <span>P1 告警：5 分钟未响应升级，30 分钟未解决升级至总监</span>
        </div>
        <div class="rule-item">
          <span class="rule-dot" style="background: #ef4444"></span>
          <span>P0 告警：立即通知全链路，15 分钟未缓解升级至 VP/CTO</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const activeScenario = ref(null)
const currentStep = ref(0)

const scenarios = [
  { id: 'p0', name: 'P0 数据库宕机' },
  { id: 'p1', name: 'P1 接口超时' },
  { id: 'p2', name: 'P2 性能下降' }
]

const scenarioSteps = {
  p0: [
    {
      id: 1,
      icon: '📡',
      color: '#3b82f6',
      title: '监控系统检测',
      time: 'T+0s',
      desc: 'Prometheus 检测到数据库连接池耗尽，所有查询超时',
      action: '自动触发 P0 级别告警'
    },
    {
      id: 2,
      icon: '📱',
      color: '#f59e0b',
      title: '值班工程师',
      time: 'T+30s',
      desc: '电话 + 短信 + 即时通讯同时通知值班 DBA',
      action: '值班工程师确认告警，开始排查'
    },
    {
      id: 3,
      icon: '👥',
      color: '#ef4444',
      title: '团队负责人',
      time: 'T+5min',
      desc: '自动升级至数据库团队负责人和后端团队负责人',
      action: '团队负责人召集紧急会议'
    },
    {
      id: 4,
      icon: '🎖️',
      color: '#8b5cf6',
      title: '技术总监',
      time: 'T+15min',
      desc: '问题未缓解，自动升级至技术总监',
      action: '总监协调跨团队资源，启动应急预案'
    },
    {
      id: 5,
      icon: '🏢',
      color: '#1e293b',
      title: 'VP / CTO',
      time: 'T+30min',
      desc: '重大事故升级至高管层，准备对外沟通',
      action: 'CTO 决策是否启动灾备切换'
    }
  ],
  p1: [
    {
      id: 1,
      icon: '📡',
      color: '#3b82f6',
      title: '监控系统检测',
      time: 'T+0s',
      desc: 'API 网关检测到 P99 延迟超过 3 秒阈值',
      action: '触发 P1 级别告警'
    },
    {
      id: 2,
      icon: '📱',
      color: '#f59e0b',
      title: '值班工程师',
      time: 'T+1min',
      desc: '即时通讯 + 短信通知值班后端工程师',
      action: '工程师开始查看监控面板和日志'
    },
    {
      id: 3,
      icon: '👥',
      color: '#ef4444',
      title: '团队负责人',
      time: 'T+15min',
      desc: '15 分钟未解决，自动升级至团队负责人',
      action: '负责人评估是否需要更多人力支援'
    },
    {
      id: 4,
      icon: '🎖️',
      color: '#8b5cf6',
      title: '技术总监',
      time: 'T+30min',
      desc: '30 分钟未缓解，升级至技术总监',
      action: '总监决定是否升级为 P0'
    }
  ],
  p2: [
    {
      id: 1,
      icon: '📡',
      color: '#3b82f6',
      title: '监控系统检测',
      time: 'T+0s',
      desc: '检测到页面加载时间从 1.2s 上升到 2.8s',
      action: '触发 P2 级别告警'
    },
    {
      id: 2,
      icon: '📱',
      color: '#eab308',
      title: '值班工程师',
      time: 'T+5min',
      desc: '即时通讯通知值班前端工程师',
      action: '工程师确认问题，记录工单'
    },
    {
      id: 3,
      icon: '👥',
      color: '#f59e0b',
      title: '团队负责人',
      time: 'T+30min',
      desc: '30 分钟未响应时升级至团队负责人',
      action: '负责人安排当天修复'
    }
  ]
}

const escalationSteps = computed(() => {
  if (!activeScenario.value) return scenarioSteps.p0
  return scenarioSteps[activeScenario.value]
})

const startScenario = (id) => {
  activeScenario.value = id
  currentStep.value = 0
}

const nextStep = () => {
  if (currentStep.value < escalationSteps.value.length - 1) {
    currentStep.value++
  }
}

const prevStep = () => {
  if (currentStep.value > 0) {
    currentStep.value--
  }
}
</script>

<style scoped>
.alert-escalation-demo {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  padding: 1.5rem;
  margin: 1.5rem 0;
}

.header { margin-bottom: 1.5rem; }
.title { font-weight: 700; font-size: 1.1rem; margin-bottom: 0.25rem; }
.subtitle { color: var(--vp-c-text-2); font-size: 0.9rem; }

.scenario-select {
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

.scenario-btn:hover { border-color: var(--vp-c-brand); color: var(--vp-c-brand); }
.scenario-btn.active { background: var(--vp-c-brand); color: #fff; border-color: var(--vp-c-brand); }

.escalation-flow {
  display: flex;
  flex-direction: column;
  margin-bottom: 1.5rem;
}

.esc-step {
  display: flex;
  gap: 1rem;
  opacity: 0.4;
  transition: all 0.3s;
}

.esc-step.active,
.esc-step.completed { opacity: 1; }

.esc-left {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
}

.esc-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  color: #fff;
  z-index: 1;
}

.esc-line {
  width: 3px;
  flex: 1;
  min-height: 20px;
  background: var(--vp-c-divider);
  margin: 4px 0;
}

.esc-line-fill {
  width: 100%;
  height: 0;
  background: var(--vp-c-brand);
  transition: height 0.5s;
}

.esc-line-fill.filled { height: 100%; }

.esc-content {
  padding-bottom: 1rem;
  flex: 1;
}

.esc-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.25rem;
}

.esc-title { font-weight: 600; font-size: 0.95rem; }
.esc-time { font-size: 0.8rem; color: var(--vp-c-text-3); font-family: monospace; }
.esc-desc { font-size: 0.85rem; color: var(--vp-c-text-2); margin-bottom: 0.3rem; }

.esc-action {
  font-size: 0.85rem;
  padding: 0.4rem 0.6rem;
  background: rgba(var(--vp-c-brand-rgb, 100, 108, 255), 0.08);
  border-radius: 4px;
  border-left: 3px solid var(--vp-c-brand);
  color: var(--vp-c-text-1);
}

.timer-bar {
  background: var(--vp-c-bg);
  border-radius: 8px;
  padding: 0.75rem;
  margin-bottom: 1.5rem;
  border: 1px solid var(--vp-c-divider);
}

.timer-label { font-size: 0.85rem; font-weight: 600; margin-bottom: 0.5rem; }

.timer-track {
  height: 6px;
  background: var(--vp-c-divider);
  border-radius: 3px;
  margin-bottom: 0.75rem;
  overflow: hidden;
}

.timer-fill {
  height: 100%;
  background: var(--vp-c-brand);
  border-radius: 3px;
  transition: width 0.3s;
}

.timer-controls { display: flex; gap: 0.5rem; }

.ctrl-btn {
  padding: 0.4rem 0.8rem;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.85rem;
  transition: all 0.2s;
}

.ctrl-btn:hover:not(:disabled) { border-color: var(--vp-c-brand); color: var(--vp-c-brand); }
.ctrl-btn:disabled { opacity: 0.4; cursor: not-allowed; }

.rule-box {
  background: var(--vp-c-bg);
  border-radius: 10px;
  padding: 0.75rem;
  border: 1px solid var(--vp-c-divider);
}

.rule-title { font-weight: 700; font-size: 0.95rem; margin-bottom: 0.75rem; }
.rules { display: flex; flex-direction: column; gap: 0.5rem; }

.rule-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
}

.rule-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  flex-shrink: 0;
}

@media (max-width: 768px) {
  .scenario-select { flex-direction: column; }
  .scenario-btn { width: 100%; }
}
</style>
