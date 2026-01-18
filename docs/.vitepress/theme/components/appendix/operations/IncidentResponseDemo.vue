<!--
  IncidentResponseDemo.vue
  故障响应流程演示：展示从故障发现到复盘的完整流程
-->
<template>
  <div class="incident-demo">
    <div class="header">
      <div class="title">故障响应流程 (Incident Response)</div>
      <div class="subtitle">专业团队如何处理线上故障</div>
    </div>

    <div class="timeline">
      <div
        v-for="(phase, index) in phases"
        :key="phase.id"
        :class="[
          'phase',
          { active: activePhase === index, completed: activePhase > index }
        ]"
        @click="activePhase = index"
      >
        <div class="phase-marker">{{ index + 1 }}</div>
        <div class="phase-content">
          <div class="phase-title">{{ phase.title }}</div>
          <div class="phase-time">{{ phase.time }}</div>
          <div class="phase-desc">{{ phase.desc }}</div>
          <div v-if="activePhase === index" class="phase-actions">
            <div class="action-title">关键动作：</div>
            <ul class="action-list">
              <li v-for="action in phase.actions" :key="action">
                {{ action }}
              </li>
            </ul>
            <div v-if="phase.tools" class="tools-section">
              <div class="tools-title">常用工具：</div>
              <div class="tools-list">
                <span
                  v-for="tool in phase.tools"
                  :key="tool"
                  class="tool-tag"
                  >{{ tool }}</span
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="incident-meta" v-if="activePhase === phases.length - 1">
      <div class="meta-title">📋 故障复盘报告 (Post-mortem)</div>
      <div class="meta-content">
        <div class="meta-section">
          <div class="meta-label">故障等级：</div>
          <div class="meta-value level-p1">P1 - 高优先级</div>
        </div>
        <div class="meta-section">
          <div class="meta-label">影响范围：</div>
          <div class="meta-value">约 15% 用户无法访问订单服务</div>
        </div>
        <div class="meta-section">
          <div class="meta-label">故障时长：</div>
          <div class="meta-value">23 分钟</div>
        </div>
        <div class="meta-section">
          <div class="meta-label">根本原因：</div>
          <div class="meta-value">数据库连接池配置过小，高峰期连接耗尽</div>
        </div>
        <div class="meta-section">
          <div class="meta-label">改进措施：</div>
          <div class="meta-value">
            1. 增加连接池大小至 200
            <br />
            2. 添加连接池监控告警
            <br />
            3. 优化慢查询，减少连接占用时间
          </div>
        </div>
      </div>
    </div>

    <div class="best-practices">
      <div class="practice-title">🎯 故障处理最佳实践</div>
      <div class="practice-grid">
        <div class="practice-card">
          <div class="practice-icon">⚡</div>
          <div class="practice-name">快速响应</div>
          <div class="practice-desc">
            建立 15 分钟响应机制，P0 故障立即电话通知
          </div>
        </div>
        <div class="practice-card">
          <div class="practice-icon">📢</div>
          <div class="practice-name">信息同步</div>
          <div class="practice-desc">
            定期向用户和内部同步故障进展，避免猜测
          </div>
        </div>
        <div class="practice-card">
          <div class="practice-icon">🔍</div>
          <div class="practice-name">保留现场</div>
          <div class="practice-desc">
            故障现场数据（日志、监控）完整留存，便于分析
          </div>
        </div>
        <div class="practice-card">
          <div class="practice-icon">📝</div>
          <div class="practice-name">blameless 文化</div>
          <div class="practice-desc">
            复盘对事不对人，聚焦流程改进而非个人责任
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const activePhase = ref(0)

const phases = [
  {
    id: 'detect',
    title: '故障发现',
    time: 'T+0 分钟',
    desc: '监控系统自动发现异常指标',
    actions: [
      '监控检测到订单服务错误率从 0.1% 飙升到 8.5%',
      'Alertmanager 立即触发 P1 告警',
      '值班人员收到钉钉和短信通知'
    ],
    tools: ['Prometheus', 'Grafana', 'Alertmanager']
  },
  {
    id: 'respond',
    title: '快速响应',
    time: 'T+3 分钟',
    desc: '值班人员确认故障并启动应急流程',
    actions: [
      '登录监控面板确认故障范围',
      '创建线上故障 War Room 会议',
      '通知相关开发人员和运维人员'
    ],
    tools: ['钉钉/飞书', 'Zoom/腾讯会议']
  },
  {
    id: 'diagnose',
    title: '故障定位',
    time: 'T+8 分钟',
    desc: '通过日志和追踪系统分析根因',
    actions: [
      '查看应用日志，发现大量 "Connection pool exhausted" 错误',
      '通过链路追踪定位到数据库查询耗时异常',
      '检查数据库监控，发现连接池已满'
    ],
    tools: ['ELK', 'Jaeger/Zipkin', 'Arthas', 'tcpdump']
  },
  {
    id: 'fix',
    title: '故障修复',
    time: 'T+18 分钟',
    desc: '实施临时解决方案恢复服务',
    actions: [
      '紧急扩容数据库连接池从 50 到 200',
      '重启应用服务使配置生效',
      '监控显示错误率逐渐下降到正常水平'
    ],
    tools: ['K8s Dashboard', 'kubectl', 'ansible']
  },
  {
    id: 'verify',
    title: '恢复验证',
    time: 'T+21 分钟',
    desc: '确认服务完全恢复正常',
    actions: [
      '监控指标全部回到正常范围',
      '执行冒烟测试验证核心功能',
      '观察 5 分钟无异常，宣布故障结束'
    ],
    tools: ['Postman', '自动化测试平台']
  },
  {
    id: 'postmortem',
    title: '故障复盘',
    time: 'T+48 小时',
    desc: '总结经验教训，制定改进计划',
    actions: [
      '召开复盘会议，整理故障时间线',
      '编写 Post-mortem 报告',
      '跟进改进措施落实情况'
    ],
    tools: ['Confluence/Notion', 'JIRA']
  }
]
</script>

<style scoped>
.incident-demo {
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

.timeline {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.phase {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  background: var(--vp-c-bg);
  border-radius: 10px;
  border: 2px solid var(--vp-c-divider);
  cursor: pointer;
  transition: all 0.3s;
}

.phase:hover {
  border-color: var(--vp-c-brand);
}

.phase.active {
  border-color: var(--vp-c-brand);
  background: rgba(var(--vp-c-brand-rgb), 0.05);
}

.phase.completed {
  border-color: #22c55e;
  background: rgba(34, 197, 94, 0.02);
}

.phase-marker {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--vp-c-bg-soft);
  border: 2px solid var(--vp-c-divider);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1rem;
  flex-shrink: 0;
}

.phase.active .phase-marker {
  border-color: var(--vp-c-brand);
  color: var(--vp-c-brand);
  background: rgba(var(--vp-c-brand-rgb), 0.1);
}

.phase.completed .phase-marker {
  border-color: #22c55e;
  color: #22c55e;
  background: rgba(34, 197, 94, 0.1);
}

.phase-content {
  flex: 1;
}

.phase-title {
  font-weight: 700;
  font-size: 1rem;
  margin-bottom: 0.25rem;
}

.phase-time {
  font-size: 0.85rem;
  color: var(--vp-c-brand);
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.phase-desc {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.75rem;
}

.phase-actions {
  padding: 0.75rem;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  margin-top: 0.75rem;
}

.action-title {
  font-weight: 600;
  font-size: 0.85rem;
  margin-bottom: 0.5rem;
}

.action-list {
  margin: 0;
  padding-left: 1.25rem;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

.action-list li {
  margin-bottom: 0.25rem;
}

.tools-section {
  margin-top: 0.75rem;
}

.tools-title {
  font-weight: 600;
  font-size: 0.85rem;
  margin-bottom: 0.5rem;
}

.tools-list {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.tool-tag {
  padding: 0.25rem 0.5rem;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  font-size: 0.75rem;
  font-family: var(--vp-font-family-mono);
}

.incident-meta {
  background: var(--vp-c-bg);
  border-radius: 10px;
  padding: 1rem;
  margin-bottom: 1.5rem;
  border: 1px solid var(--vp-c-divider);
}

.meta-title {
  font-weight: 700;
  font-size: 1rem;
  margin-bottom: 1rem;
}

.meta-content {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.meta-section {
  display: flex;
  gap: 1rem;
  font-size: 0.9rem;
}

.meta-label {
  min-width: 100px;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.meta-value {
  flex: 1;
  color: var(--vp-c-text-2);
  line-height: 1.6;
}

.meta-value.level-p1 {
  color: #f59e0b;
  font-weight: 700;
}

.best-practices {
  background: rgba(var(--vp-c-brand-rgb), 0.05);
  border-radius: 10px;
  padding: 1rem;
  border: 1px solid var(--vp-c-brand);
}

.practice-title {
  font-weight: 700;
  font-size: 1rem;
  margin-bottom: 1rem;
}

.practice-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.practice-card {
  background: var(--vp-c-bg);
  border-radius: 8px;
  padding: 1rem;
  text-align: center;
}

.practice-icon {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.practice-name {
  font-weight: 700;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}

.practice-desc {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  line-height: 1.5;
}

@media (max-width: 768px) {
  .phase {
    flex-direction: column;
  }

  .phase-marker {
    width: 32px;
    height: 32px;
  }

  .meta-section {
    flex-direction: column;
    gap: 0.25rem;
  }

  .meta-label {
    min-width: auto;
  }

  .practice-grid {
    grid-template-columns: 1fr;
  }
}
</style>
