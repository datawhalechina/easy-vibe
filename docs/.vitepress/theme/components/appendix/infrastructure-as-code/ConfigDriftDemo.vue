<template>
  <div class="config-drift-demo">
    <div class="demo-label">交互演示 ── 配置漂移：无声的定时炸弹</div>

    <div class="timeline">
      <div class="timeline-track">
        <div
          v-for="(event, i) in events"
          :key="i"
          :class="['timeline-node', event.type, { active: step >= i }]"
          @click="goToStep(i)"
        >
          <div class="node-dot"></div>
          <div class="node-label">{{ event.label }}</div>
        </div>
      </div>
    </div>

    <div class="scene-area">
      <div class="infra-visual">
        <div class="server-group">
          <div class="group-title">期望状态（代码定义）</div>
          <div class="server-cards">
            <div v-for="s in expectedServers" :key="s.name" class="server-card expected">
              <div class="server-icon">🖥️</div>
              <div class="server-name">{{ s.name }}</div>
              <div class="server-config">{{ s.config }}</div>
            </div>
          </div>
        </div>

        <div class="drift-indicator">
          <div :class="['drift-status', driftLevel]">
            <span class="drift-icon">{{ driftIcon }}</span>
            <span class="drift-text">{{ driftText }}</span>
          </div>
        </div>

        <div class="server-group">
          <div class="group-title">实际状态（线上环境）</div>
          <div class="server-cards">
            <div
              v-for="s in actualServers"
              :key="s.name"
              :class="['server-card', 'actual', { drifted: s.drifted }]"
            >
              <div class="server-icon">{{ s.drifted ? '⚠️' : '🖥️' }}</div>
              <div class="server-name">{{ s.name }}</div>
              <div class="server-config">{{ s.config }}</div>
              <div v-if="s.driftReason" class="drift-reason">{{ s.driftReason }}</div>
            </div>
          </div>
        </div>
      </div>

      <div class="event-desc">
        <div class="event-title">{{ events[step].title }}</div>
        <p class="event-detail">{{ events[step].detail }}</p>
      </div>
    </div>

    <div class="controls">
      <button class="ctrl-btn" :disabled="step === 0" @click="goToStep(step - 1)">← 上一步</button>
      <button class="ctrl-btn reset" @click="goToStep(0)">重置</button>
      <button class="ctrl-btn primary" :disabled="step >= events.length - 1" @click="goToStep(step + 1)">
        下一步 →
      </button>
    </div>

    <div class="lesson-box">
      <div class="lesson-title">关键教训</div>
      <div class="lesson-items">
        <div v-for="(lesson, i) in lessons" :key="i" class="lesson-item">
          <span class="lesson-icon">{{ lesson.icon }}</span>
          <span class="lesson-text">{{ lesson.text }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const step = ref(0)

const events = [
  {
    label: '初始部署',
    type: 'good',
    title: '第 0 步：通过 IaC 初始部署',
    detail: '团队使用 Terraform 部署了 3 台 Web 服务器，配置完全一致：Nginx 1.24、端口 443、2GB 内存。代码和实际状态完美匹配。'
  },
  {
    label: '手动修改',
    type: 'warn',
    title: '第 1 步：深夜紧急手动修改',
    detail: '凌晨 3 点，Server-B 出现性能问题。值班工程师直接 SSH 登录，手动将内存从 2GB 升级到 4GB，并修改了 Nginx 配置。没有更新 IaC 代码。'
  },
  {
    label: '又一次修改',
    type: 'warn',
    title: '第 2 步：另一位同事的"临时"调整',
    detail: '一周后，另一位工程师为了调试，在 Server-C 上开放了 22 端口（SSH），并安装了调试工具。同样没有更新代码。'
  },
  {
    label: '漂移加剧',
    type: 'bad',
    title: '第 3 步：配置漂移已经失控',
    detail: '此时 3 台"相同"的服务器实际配置已经各不相同。代码描述的状态和线上真实状态严重脱节，没有人能说清楚线上到底是什么配置。'
  },
  {
    label: 'IaC 检测',
    type: 'fix',
    title: '第 4 步：terraform plan 发现漂移',
    detail: '运行 terraform plan 后，Terraform 对比 State 文件和实际资源，清晰列出所有差异。团队决定将手动变更回退，统一通过代码管理。'
  }
]

const expectedServers = [
  { name: 'Server-A', config: 'Nginx 1.24 | 443 | 2GB' },
  { name: 'Server-B', config: 'Nginx 1.24 | 443 | 2GB' },
  { name: 'Server-C', config: 'Nginx 1.24 | 443 | 2GB' }
]

const actualServers = computed(() => {
  if (step.value === 0) {
    return [
      { name: 'Server-A', config: 'Nginx 1.24 | 443 | 2GB', drifted: false },
      { name: 'Server-B', config: 'Nginx 1.24 | 443 | 2GB', drifted: false },
      { name: 'Server-C', config: 'Nginx 1.24 | 443 | 2GB', drifted: false }
    ]
  }
  if (step.value === 1) {
    return [
      { name: 'Server-A', config: 'Nginx 1.24 | 443 | 2GB', drifted: false },
      { name: 'Server-B', config: 'Nginx 1.25 | 443 | 4GB', drifted: true, driftReason: '手动升级内存和 Nginx' },
      { name: 'Server-C', config: 'Nginx 1.24 | 443 | 2GB', drifted: false }
    ]
  }
  if (step.value === 2 || step.value === 3) {
    return [
      { name: 'Server-A', config: 'Nginx 1.24 | 443 | 2GB', drifted: false },
      { name: 'Server-B', config: 'Nginx 1.25 | 443 | 4GB', drifted: true, driftReason: '手动升级内存和 Nginx' },
      { name: 'Server-C', config: 'Nginx 1.24 | 22+443 | 2GB', drifted: true, driftReason: '开放了 SSH 端口' }
    ]
  }
  // step 4: fix
  return [
    { name: 'Server-A', config: 'Nginx 1.24 | 443 | 2GB', drifted: false },
    { name: 'Server-B', config: 'Nginx 1.24 | 443 | 2GB', drifted: false },
    { name: 'Server-C', config: 'Nginx 1.24 | 443 | 2GB', drifted: false }
  ]
})

const driftLevel = computed(() => {
  if (step.value === 0 || step.value === 4) return 'ok'
  if (step.value <= 2) return 'warning'
  return 'danger'
})

const driftIcon = computed(() => {
  if (driftLevel.value === 'ok') return '✅'
  if (driftLevel.value === 'warning') return '⚠️'
  return '🔥'
})

const driftText = computed(() => {
  if (step.value === 0) return '状态一致'
  if (step.value === 4) return '漂移已修复'
  if (step.value === 1) return '1 台漂移'
  if (step.value === 2) return '2 台漂移'
  return '严重漂移！'
})

const lessons = [
  { icon: '🚫', text: '禁止手动修改线上环境，所有变更必须通过代码' },
  { icon: '🔍', text: '定期运行 terraform plan 检测漂移' },
  { icon: '🔒', text: '限制生产环境的 SSH 权限，减少人为干预' },
  { icon: '📋', text: '建立变更审批流程（PR → Review → Merge → Apply）' }
]

function goToStep(i) {
  step.value = Math.max(0, Math.min(i, events.length - 1))
}
</script>

<style scoped>
.config-drift-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  padding: 1rem 1.2rem;
  margin: 1rem 0;
}
.demo-label {
  font-size: 0.78rem;
  font-weight: bold;
  color: var(--vp-c-text-2);
  margin-bottom: 1rem;
  text-align: center;
}
.timeline { margin-bottom: 1rem; overflow-x: auto; }
.timeline-track {
  display: flex;
  align-items: flex-start;
  gap: 0;
  min-width: max-content;
  position: relative;
  padding: 0 0.5rem;
}
.timeline-node {
  flex: 1;
  min-width: 90px;
  text-align: center;
  cursor: pointer;
  position: relative;
  padding-top: 20px;
}
.timeline-node::before {
  content: '';
  position: absolute;
  top: 8px;
  left: 0;
  right: 0;
  height: 2px;
  background: var(--vp-c-divider);
}
.timeline-node:first-child::before { left: 50%; }
.timeline-node:last-child::before { right: 50%; }
.node-dot {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider);
  margin: 0 auto 4px;
  position: relative;
  z-index: 1;
  transition: all 0.3s;
}
.timeline-node.active .node-dot { transform: scale(1.3); }
.timeline-node.active.good .node-dot { background: #10b981; border-color: #10b981; }
.timeline-node.active.warn .node-dot { background: #f59e0b; border-color: #f59e0b; }
.timeline-node.active.bad .node-dot { background: #ef4444; border-color: #ef4444; }
.timeline-node.active.fix .node-dot { background: #3b82f6; border-color: #3b82f6; }
.node-label { font-size: 0.68rem; color: var(--vp-c-text-3); }
.timeline-node.active .node-label { font-weight: 600; color: var(--vp-c-text-1); }

.scene-area { margin-bottom: 1rem; }
.infra-visual {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 0.8rem;
}
.group-title {
  font-size: 0.72rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
  margin-bottom: 0.3rem;
  text-align: center;
}
.server-cards {
  display: flex;
  gap: 0.4rem;
  justify-content: center;
  flex-wrap: wrap;
}
.server-card {
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 0.5rem 0.6rem;
  background: var(--vp-c-bg);
  text-align: center;
  min-width: 120px;
  transition: all 0.3s;
  font-size: 0.73rem;
}
.server-card.expected { border-color: #10b981; }
.server-card.drifted {
  border-color: #ef4444;
  background: #fef2f210;
  box-shadow: 0 0 0 1px #fca5a540;
}
.server-icon { font-size: 1.2rem; }
.server-name { font-weight: 600; font-size: 0.75rem; }
.server-config { font-size: 0.68rem; color: var(--vp-c-text-2); }
.drift-reason {
  font-size: 0.62rem;
  color: #ef4444;
  margin-top: 2px;
  font-style: italic;
}
.drift-indicator { text-align: center; }
.drift-status {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 14px;
  border-radius: 16px;
  font-size: 0.78rem;
  font-weight: 600;
}
.drift-status.ok { background: #d1fae5; color: #065f46; }
.drift-status.warning { background: #fef3c7; color: #92400e; }
.drift-status.danger { background: #fee2e2; color: #991b1b; }
:root.dark .drift-status.ok { background: #022c2240; color: #6ee7b7; }
:root.dark .drift-status.warning { background: #451a0340; color: #fcd34d; }
:root.dark .drift-status.danger { background: #450a0a40; color: #fca5a5; }

.event-desc {
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 0.8rem;
  background: var(--vp-c-bg);
}
.event-title { font-weight: 600; font-size: 0.88rem; margin-bottom: 4px; }
.event-detail { font-size: 0.8rem; color: var(--vp-c-text-2); line-height: 1.6; margin: 0; }

.controls {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
}
.ctrl-btn {
  padding: 6px 14px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg);
  cursor: pointer;
  font-size: 0.78rem;
  transition: all 0.2s;
}
.ctrl-btn:disabled { opacity: 0.4; cursor: default; }
.ctrl-btn.primary { background: var(--vp-c-brand); color: #fff; border-color: var(--vp-c-brand); }
.ctrl-btn.reset { color: var(--vp-c-text-3); }

.lesson-box {
  border: 1px solid #3b82f640;
  border-radius: 6px;
  padding: 0.8rem;
  background: #dbeafe10;
}
.lesson-title {
  font-weight: 600;
  font-size: 0.82rem;
  margin-bottom: 0.5rem;
  color: #2563eb;
}
:root.dark .lesson-title { color: #93c5fd; }
.lesson-items { display: flex; flex-direction: column; gap: 0.3rem; }
.lesson-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.78rem;
}
</style>
