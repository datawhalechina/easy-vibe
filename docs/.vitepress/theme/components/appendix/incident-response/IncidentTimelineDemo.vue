<!--
  IncidentTimelineDemo.vue
  事故响应时间线演示：展示从发现到复盘的完整事故响应流程
-->
<template>
  <div class="incident-timeline-demo">
    <div class="header">
      <div class="title">事故响应时间线 (Incident Timeline)</div>
      <div class="subtitle">点击各阶段，了解每个环节的关键动作</div>
    </div>

    <div class="timeline">
      <div class="timeline-track">
        <div
          class="timeline-progress"
          :style="{ width: progressWidth }"
        ></div>
      </div>
      <div class="timeline-nodes">
        <div
          v-for="(phase, index) in phases"
          :key="phase.id"
          :class="[
            'timeline-node',
            {
              active: activePhase === phase.id,
              completed: completedPhases.includes(phase.id)
            }
          ]"
          @click="selectPhase(phase.id)"
        >
          <div class="node-dot">
            <span v-if="completedPhases.includes(phase.id)">&#10003;</span>
            <span v-else>{{ index + 1 }}</span>
          </div>
          <div class="node-label">{{ phase.name }}</div>
          <div class="node-time">{{ phase.timeHint }}</div>
        </div>
      </div>
    </div>

    <div v-if="currentPhase" class="phase-detail">
      <div class="phase-header" :style="{ background: currentPhase.color }">
        <span class="phase-icon">{{ currentPhase.icon }}</span>
        <span class="phase-name">{{ currentPhase.name }}</span>
        <span class="phase-duration">{{ currentPhase.duration }}</span>
      </div>
      <div class="phase-body">
        <div class="phase-desc">{{ currentPhase.description }}</div>
        <div class="phase-actions">
          <div class="actions-title">关键动作：</div>
          <div
            v-for="(action, i) in currentPhase.actions"
            :key="i"
            class="action-item"
          >
            <span class="action-bullet">{{ i + 1 }}</span>
            <span>{{ action }}</span>
          </div>
        </div>
        <div class="phase-roles">
          <span class="roles-label">参与角色：</span>
          <span
            v-for="role in currentPhase.roles"
            :key="role"
            class="role-tag"
          >
            {{ role }}
          </span>
        </div>
      </div>
    </div>

    <div class="auto-controls">
      <button class="play-btn" @click="autoPlay" :disabled="isPlaying">
        {{ isPlaying ? '播放中...' : '自动演示完整流程' }}
      </button>
      <button class="reset-btn" @click="resetAll">重置</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const activePhase = ref(null)
const completedPhases = ref([])
const isPlaying = ref(false)

const phases = [
  {
    id: 'detect',
    name: '发现',
    timeHint: 'T+0',
    icon: '🔍',
    color: '#ef4444',
    duration: '目标 < 5 分钟',
    description:
      '通过监控告警、用户反馈或自动化检测发现系统异常。越早发现，损失越小。',
    actions: [
      '监控系统触发告警（CPU、延迟、错误率等）',
      '值班人员收到通知并确认',
      '初步判断影响范围',
      '在事故频道发出第一条通报'
    ],
    roles: ['值班工程师', '监控系统']
  },
  {
    id: 'triage',
    name: '分级',
    timeHint: 'T+5min',
    icon: '📋',
    color: '#f59e0b',
    duration: '目标 < 10 分钟',
    description:
      '快速评估事故严重程度，确定优先级（P0-P4），决定响应规模和升级路径。',
    actions: [
      '评估用户影响面（多少用户受影响？）',
      '确定业务影响（核心功能是否不可用？）',
      '分配事故等级（P0/P1/P2/P3/P4）',
      '根据等级启动对应的响应流程'
    ],
    roles: ['值班工程师', '事故指挥官']
  },
  {
    id: 'mitigate',
    name: '止血',
    timeHint: 'T+15min',
    icon: '🚑',
    color: '#3b82f6',
    duration: '目标 < 1 小时',
    description:
      '采取紧急措施恢复服务，优先止血而非根治。回滚、降级、限流都是常见手段。',
    actions: [
      '回滚最近的变更（代码、配置、基础设施）',
      '启用降级方案或备用系统',
      '实施限流保护核心链路',
      '持续监控恢复进度并通报状态'
    ],
    roles: ['事故指挥官', '运维工程师', '开发工程师']
  },
  {
    id: 'resolve',
    name: '解决',
    timeHint: 'T+1h',
    icon: '🔧',
    color: '#22c55e',
    duration: '视复杂度而定',
    description:
      '在服务恢复后，定位根本原因并实施永久修复，确保同类问题不再发生。',
    actions: [
      '深入分析日志、监控数据定位根因',
      '编写并审核修复代码',
      '在预发布环境验证修复效果',
      '灰度发布修复，确认问题彻底解决'
    ],
    roles: ['开发工程师', '架构师', 'QA 工程师']
  },
  {
    id: 'postmortem',
    name: '复盘',
    timeHint: 'T+48h',
    icon: '📝',
    color: '#8b5cf6',
    duration: '事故后 48 小时内',
    description:
      '召开无责复盘会议，分析根因，提炼经验教训，制定改进措施防止再次发生。',
    actions: [
      '撰写事故复盘报告（时间线、影响、根因）',
      '召开复盘会议，全员参与讨论',
      '使用"五个为什么"深挖根本原因',
      '制定并跟踪改进行动项（Action Items）'
    ],
    roles: ['事故指挥官', '全体相关人员', '管理层']
  }
]

const currentPhase = computed(() => {
  if (!activePhase.value) return null
  return phases.find((p) => p.id === activePhase.value)
})

const progressWidth = computed(() => {
  if (completedPhases.value.length === 0 && !activePhase.value) return '0%'
  const activeIndex = phases.findIndex((p) => p.id === activePhase.value)
  if (activeIndex === -1) {
    const lastCompleted = completedPhases.value.length
    return `${(lastCompleted / phases.length) * 100}%`
  }
  return `${((activeIndex + 0.5) / phases.length) * 100}%`
})

const selectPhase = (id) => {
  activePhase.value = id
}

const autoPlay = async () => {
  isPlaying.value = true
  completedPhases.value = []
  activePhase.value = null

  for (let i = 0; i < phases.length; i++) {
    activePhase.value = phases[i].id
    await new Promise((r) => setTimeout(r, 1800))
    completedPhases.value.push(phases[i].id)
  }
  isPlaying.value = false
}

const resetAll = () => {
  activePhase.value = null
  completedPhases.value = []
  isPlaying.value = false
}
</script>

<style scoped>
.incident-timeline-demo {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  padding: 1.5rem;
  margin: 1.5rem 0;
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

.timeline {
  position: relative;
  margin-bottom: 1.5rem;
}

.timeline-track {
  position: absolute;
  top: 16px;
  left: 5%;
  right: 5%;
  height: 4px;
  background: var(--vp-c-divider);
  border-radius: 2px;
}

.timeline-progress {
  height: 100%;
  background: var(--vp-c-brand);
  border-radius: 2px;
  transition: width 0.5s ease;
}

.timeline-nodes {
  display: flex;
  justify-content: space-between;
  position: relative;
}

.timeline-node {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  flex: 1;
  transition: all 0.2s;
}

.node-dot {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: var(--vp-c-bg);
  border: 3px solid var(--vp-c-divider);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 0.8rem;
  transition: all 0.3s;
  z-index: 1;
}

.timeline-node.active .node-dot {
  border-color: var(--vp-c-brand);
  color: var(--vp-c-brand);
  transform: scale(1.2);
  box-shadow: 0 0 0 4px rgba(var(--vp-c-brand-rgb, 100, 108, 255), 0.2);
}

.timeline-node.completed .node-dot {
  border-color: #22c55e;
  background: #22c55e;
  color: #fff;
}

.node-label {
  margin-top: 0.5rem;
  font-size: 0.85rem;
  font-weight: 600;
  text-align: center;
}

.node-time {
  font-size: 0.75rem;
  color: var(--vp-c-text-3);
  margin-top: 0.15rem;
}

.phase-detail {
  background: var(--vp-c-bg);
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 1rem;
  border: 1px solid var(--vp-c-divider);
}

.phase-header {
  padding: 0.75rem 1rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: #fff;
}

.phase-icon {
  font-size: 1.3rem;
}

.phase-name {
  font-weight: 700;
  font-size: 1rem;
  flex: 1;
}

.phase-duration {
  background: rgba(255, 255, 255, 0.2);
  padding: 0.2rem 0.6rem;
  border-radius: 999px;
  font-size: 0.8rem;
}

.phase-body {
  padding: 1rem;
}

.phase-desc {
  font-size: 0.9rem;
  color: var(--vp-c-text-1);
  margin-bottom: 1rem;
  line-height: 1.6;
}

.actions-title {
  font-weight: 600;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}

.action-item {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  font-size: 0.85rem;
  margin-bottom: 0.4rem;
  color: var(--vp-c-text-2);
}

.action-bullet {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: var(--vp-c-bg-soft);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.7rem;
  font-weight: 700;
  flex-shrink: 0;
  color: var(--vp-c-text-1);
}

.phase-roles {
  margin-top: 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.roles-label {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

.role-tag {
  padding: 0.15rem 0.5rem;
  background: var(--vp-c-bg-soft);
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 500;
}

.auto-controls {
  display: flex;
  gap: 0.5rem;
}

.play-btn,
.reset-btn {
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  border: 1px solid var(--vp-c-divider);
  transition: all 0.2s;
}

.play-btn {
  background: var(--vp-c-brand);
  color: #fff;
  border-color: var(--vp-c-brand);
}

.play-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.reset-btn {
  background: var(--vp-c-bg);
}

.reset-btn:hover {
  border-color: var(--vp-c-brand);
}

@media (max-width: 768px) {
  .timeline-nodes {
    flex-direction: column;
    gap: 0.75rem;
  }

  .timeline-track {
    display: none;
  }

  .timeline-node {
    flex-direction: row;
    gap: 0.75rem;
  }

  .node-label {
    margin-top: 0;
  }

  .node-time {
    margin-top: 0;
    margin-left: auto;
  }
}
</style>
