<!--
  IncidentCommandDemo.vue
  事故指挥体系演示：展示事故响应中的角色分工和协作关系
-->
<template>
  <div class="incident-command-demo">
    <div class="header">
      <div class="title">事故指挥体系 (Incident Command System)</div>
      <div class="subtitle">点击角色卡片，了解各角色的职责和协作关系</div>
    </div>

    <div class="org-chart">
      <div class="org-level org-top">
        <div
          :class="['role-card', 'commander', { active: activeRole === 'ic' }]"
          @click="selectRole('ic')"
        >
          <div class="role-icon">🎖️</div>
          <div class="role-name">事故指挥官</div>
          <div class="role-eng">Incident Commander</div>
        </div>
      </div>

      <div class="org-connector">
        <div class="connector-line"></div>
      </div>

      <div class="org-level org-middle">
        <div
          v-for="role in middleRoles"
          :key="role.id"
          :class="['role-card', { active: activeRole === role.id }]"
          @click="selectRole(role.id)"
        >
          <div class="role-icon">{{ role.icon }}</div>
          <div class="role-name">{{ role.name }}</div>
          <div class="role-eng">{{ role.eng }}</div>
        </div>
      </div>
    </div>

    <div v-if="currentRole" class="role-detail">
      <div class="detail-header" :style="{ background: currentRole.color }">
        <span class="detail-icon">{{ currentRole.icon }}</span>
        <span class="detail-name">{{ currentRole.name }}</span>
      </div>
      <div class="detail-body">
        <div class="detail-section">
          <div class="section-label">核心职责</div>
          <div class="responsibilities">
            <div
              v-for="(r, i) in currentRole.responsibilities"
              :key="i"
              class="resp-item"
            >
              <span class="resp-num">{{ i + 1 }}</span>
              <span>{{ r }}</span>
            </div>
          </div>
        </div>
        <div class="detail-section">
          <div class="section-label">关键能力</div>
          <div class="skills">
            <span
              v-for="skill in currentRole.skills"
              :key="skill"
              class="skill-tag"
            >
              {{ skill }}
            </span>
          </div>
        </div>
        <div class="detail-section">
          <div class="section-label">常见话术</div>
          <div class="quote-box">
            "{{ currentRole.quote }}"
          </div>
        </div>
      </div>
    </div>

    <div class="scenario-box">
      <div class="scenario-title">模拟场景：支付系统 P0 事故</div>
      <div class="scenario-timeline">
        <div
          v-for="(event, i) in scenarioEvents"
          :key="i"
          class="event-item"
        >
          <span class="event-time">{{ event.time }}</span>
          <span
            class="event-role"
            :style="{ background: event.color }"
          >
            {{ event.role }}
          </span>
          <span class="event-text">{{ event.text }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const activeRole = ref('ic')

const allRoles = {
  ic: {
    id: 'ic',
    icon: '🎖️',
    name: '事故指挥官',
    eng: 'Incident Commander',
    color: '#8b5cf6',
    responsibilities: [
      '统筹协调整个事故响应过程',
      '做出关键决策（回滚、切流、降级等）',
      '确保各角色高效协作，避免混乱',
      '控制事故响应节奏，定时同步进展'
    ],
    skills: ['全局视野', '决策能力', '沟通协调', '压力管理'],
    quote: '当前状态：支付服务不可用。运维组排查数据库，后端组准备回滚方案，通讯组每 10 分钟同步一次。'
  },
  comm: {
    id: 'comm',
    icon: '📢',
    name: '通讯协调员',
    eng: 'Communications Lead',
    color: '#3b82f6',
    responsibilities: [
      '对内：定时向管理层和相关团队通报进展',
      '对外：更新状态页面，通知受影响客户',
      '记录事故时间线，为复盘提供素材',
      '过滤噪音信息，确保指挥官专注决策'
    ],
    skills: ['文字表达', '信息整理', '多方沟通', '时间管理'],
    quote: '状态更新：我们已识别到支付服务异常，团队正在紧急处理中，预计 30 分钟内恢复。'
  },
  ops: {
    id: 'ops',
    icon: '🔧',
    name: '运维负责人',
    eng: 'Operations Lead',
    color: '#ef4444',
    responsibilities: [
      '执行具体的技术操作（回滚、重启、扩容等）',
      '监控系统指标变化，判断操作效果',
      '管理基础设施层面的应急响应',
      '向指挥官汇报技术层面的进展'
    ],
    skills: ['系统运维', '故障排查', '脚本自动化', '监控分析'],
    quote: '数据库主节点 CPU 100%，正在执行主从切换，预计 2 分钟完成。'
  },
  dev: {
    id: 'dev',
    icon: '💻',
    name: '开发负责人',
    eng: 'Development Lead',
    color: '#22c55e',
    responsibilities: [
      '分析代码层面的问题根因',
      '准备和执行代码级别的修复或回滚',
      '评估变更风险，提供技术方案',
      '协调开发团队成员参与排查'
    ],
    skills: ['代码分析', '快速调试', '风险评估', '版本管理'],
    quote: '定位到问题：昨天上线的批量查询没有加分页，导致全表扫描拖垮数据库。准备回滚到上一版本。'
  }
}

const middleRoles = [
  allRoles.comm,
  allRoles.ops,
  allRoles.dev
]

const currentRole = computed(() => {
  return allRoles[activeRole.value] || null
})

const selectRole = (id) => {
  activeRole.value = id
}

const scenarioEvents = [
  { time: '14:02', role: '监控', color: '#3b82f6', text: '支付成功率从 99.9% 骤降至 12%，触发 P0 告警' },
  { time: '14:03', role: '指挥官', color: '#8b5cf6', text: '确认 P0 事故，开启事故频道，召集各角色' },
  { time: '14:05', role: '通讯', color: '#3b82f6', text: '通知管理层，更新状态页为"服务降级"' },
  { time: '14:08', role: '运维', color: '#ef4444', text: '发现数据库主节点 CPU 100%，连接池耗尽' },
  { time: '14:10', role: '开发', color: '#22c55e', text: '定位到昨日上线的慢查询是根因' },
  { time: '14:12', role: '指挥官', color: '#8b5cf6', text: '决策：立即回滚昨日变更 + 数据库主从切换' },
  { time: '14:15', role: '运维', color: '#ef4444', text: '数据库主从切换完成，连接恢复' },
  { time: '14:18', role: '开发', color: '#22c55e', text: '代码回滚部署完成' },
  { time: '14:20', role: '通讯', color: '#3b82f6', text: '支付成功率恢复至 99.8%，通知各方服务恢复' }
]
</script>

<style scoped>
.incident-command-demo {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  padding: 1.5rem;
  margin: 1.5rem 0;
}

.header { margin-bottom: 1.5rem; }
.title { font-weight: 700; font-size: 1.1rem; margin-bottom: 0.25rem; }
.subtitle { color: var(--vp-c-text-2); font-size: 0.9rem; }

.org-chart {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1.5rem;
}

.org-level { display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; }

.org-connector {
  display: flex;
  justify-content: center;
  padding: 0.5rem 0;
}

.connector-line {
  width: 2px;
  height: 24px;
  background: var(--vp-c-divider);
}

.role-card {
  padding: 0.75rem 1rem;
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider);
  border-radius: 10px;
  cursor: pointer;
  text-align: center;
  transition: all 0.2s;
  min-width: 130px;
}

.role-card:hover { border-color: var(--vp-c-brand); transform: translateY(-2px); }
.role-card.active { border-color: var(--vp-c-brand); box-shadow: 0 2px 12px rgba(var(--vp-c-brand-rgb, 100, 108, 255), 0.15); }
.role-card.commander { border-width: 3px; }

.role-icon { font-size: 1.5rem; margin-bottom: 0.25rem; }
.role-name { font-weight: 600; font-size: 0.9rem; }
.role-eng { font-size: 0.75rem; color: var(--vp-c-text-3); }

.role-detail {
  background: var(--vp-c-bg);
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 1.5rem;
  border: 1px solid var(--vp-c-divider);
}

.detail-header {
  padding: 0.75rem 1rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: #fff;
}

.detail-icon { font-size: 1.3rem; }
.detail-name { font-weight: 700; font-size: 1rem; }

.detail-body { padding: 1rem; display: flex; flex-direction: column; gap: 0.75rem; }
.detail-section { display: flex; flex-direction: column; gap: 0.3rem; }
.section-label { font-weight: 600; font-size: 0.85rem; color: var(--vp-c-text-2); }

.responsibilities { display: flex; flex-direction: column; gap: 0.3rem; }

.resp-item {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  font-size: 0.85rem;
}

.resp-num {
  width: 20px; height: 20px; border-radius: 50%;
  background: var(--vp-c-bg-soft);
  display: flex; align-items: center; justify-content: center;
  font-size: 0.7rem; font-weight: 700; flex-shrink: 0;
}

.skills { display: flex; gap: 0.4rem; flex-wrap: wrap; }

.skill-tag {
  padding: 0.15rem 0.5rem;
  background: var(--vp-c-bg-soft);
  border-radius: 4px;
  font-size: 0.8rem;
}

.quote-box {
  font-size: 0.85rem;
  padding: 0.6rem 0.8rem;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  border-left: 3px solid var(--vp-c-brand);
  font-style: italic;
  color: var(--vp-c-text-2);
  line-height: 1.5;
}

.scenario-box {
  background: var(--vp-c-bg);
  border-radius: 10px;
  padding: 1rem;
  border: 1px solid var(--vp-c-divider);
}

.scenario-title { font-weight: 700; font-size: 0.95rem; margin-bottom: 0.75rem; }

.scenario-timeline { display: flex; flex-direction: column; gap: 0.4rem; }

.event-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.82rem;
  padding: 0.3rem 0;
  border-bottom: 1px solid var(--vp-c-divider);
}

.event-item:last-child { border-bottom: none; }

.event-time {
  font-family: monospace;
  font-size: 0.8rem;
  color: var(--vp-c-text-3);
  min-width: 40px;
}

.event-role {
  padding: 0.1rem 0.4rem;
  border-radius: 4px;
  color: #fff;
  font-size: 0.75rem;
  font-weight: 600;
  min-width: 45px;
  text-align: center;
}

.event-text { color: var(--vp-c-text-1); }

@media (max-width: 768px) {
  .org-level { flex-direction: column; align-items: center; }
  .event-item { flex-wrap: wrap; }
}
</style>
