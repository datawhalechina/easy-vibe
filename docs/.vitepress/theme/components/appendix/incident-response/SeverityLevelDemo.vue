<!--
  SeverityLevelDemo.vue
  事故严重程度分级演示：交互式展示 P0-P4 各级别的定义、示例和响应要求
-->
<template>
  <div class="severity-level-demo">
    <div class="header">
      <div class="title">事故严重程度分级 (Severity Levels)</div>
      <div class="subtitle">点击各级别，了解对应的响应要求和真实案例</div>
    </div>

    <div class="level-tabs">
      <button
        v-for="level in levels"
        :key="level.id"
        :class="['level-tab', level.id, { active: activeLevel === level.id }]"
        @click="activeLevel = level.id"
      >
        <span class="tab-badge">{{ level.id.toUpperCase() }}</span>
        <span class="tab-name">{{ level.shortName }}</span>
      </button>
    </div>

    <div v-if="current" class="level-detail">
      <div class="detail-header" :style="{ background: current.color }">
        <div class="detail-level">{{ current.id.toUpperCase() }}</div>
        <div class="detail-name">{{ current.name }}</div>
      </div>
      <div class="detail-body">
        <div class="detail-section">
          <div class="section-label">定义</div>
          <div class="section-content">{{ current.definition }}</div>
        </div>
        <div class="detail-section">
          <div class="section-label">响应时间</div>
          <div class="section-content response-time">
            {{ current.responseTime }}
          </div>
        </div>
        <div class="detail-section">
          <div class="section-label">通知方式</div>
          <div class="channels">
            <span
              v-for="ch in current.channels"
              :key="ch"
              class="channel-tag"
            >
              {{ ch }}
            </span>
          </div>
        </div>
        <div class="detail-section">
          <div class="section-label">真实案例</div>
          <div class="examples">
            <div
              v-for="(ex, i) in current.examples"
              :key="i"
              class="example-item"
            >
              {{ ex }}
            </div>
          </div>
        </div>
        <div class="detail-section">
          <div class="section-label">响应要求</div>
          <div class="requirements">
            <div
              v-for="(req, i) in current.requirements"
              :key="i"
              class="req-item"
            >
              <span class="req-check">&#10003;</span>
              <span>{{ req }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="comparison-table">
      <div class="table-title">各级别对比一览</div>
      <div class="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>级别</th>
              <th>用户影响</th>
              <th>响应时间</th>
              <th>值班要求</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="level in levels"
              :key="level.id"
              :class="{ highlight: activeLevel === level.id }"
              @click="activeLevel = level.id"
            >
              <td>
                <span class="table-badge" :class="level.id">
                  {{ level.id.toUpperCase() }}
                </span>
              </td>
              <td>{{ level.userImpact }}</td>
              <td>{{ level.responseTime }}</td>
              <td>{{ level.oncallReq }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const activeLevel = ref('p0')

const levels = [
  {
    id: 'p0',
    shortName: '致命',
    name: '致命事故 (Critical)',
    color: '#ef4444',
    definition: '核心业务完全不可用，大面积用户受影响，造成严重经济损失或数据丢失风险。',
    responseTime: '立即响应，5 分钟内到位',
    userImpact: '全部用户',
    oncallReq: '全员到位',
    channels: ['电话', '短信', '即时通讯', '邮件'],
    examples: [
      '主数据库宕机，所有读写请求失败',
      '支付系统完全不可用，用户无法下单',
      '用户数据大规模泄露'
    ],
    requirements: [
      '事故指挥官必须在 5 分钟内就位',
      '每 15 分钟向管理层通报进展',
      '所有相关团队取消休假立即支援',
      '事后 24 小时内完成复盘报告'
    ]
  },
  {
    id: 'p1',
    shortName: '严重',
    name: '严重事故 (Major)',
    color: '#f59e0b',
    definition: '核心功能部分受损，大量用户体验降级，但系统未完全不可用。',
    responseTime: '15 分钟内响应',
    userImpact: '大量用户',
    oncallReq: '核心团队',
    channels: ['即时通讯', '短信', '邮件'],
    examples: [
      '搜索功能返回结果严重延迟（>5s）',
      '部分地区用户无法登录',
      '订单处理队列严重积压'
    ],
    requirements: [
      '值班工程师 15 分钟内开始排查',
      '每 30 分钟通报一次进展',
      '必要时升级为 P0',
      '事后 48 小时内完成复盘'
    ]
  },
  {
    id: 'p2',
    shortName: '中等',
    name: '中等事故 (Moderate)',
    color: '#eab308',
    definition: '非核心功能异常，部分用户受影响，不影响主要业务流程。',
    responseTime: '1 小时内响应',
    userImpact: '部分用户',
    oncallReq: '值班工程师',
    channels: ['即时通讯', '邮件'],
    examples: [
      '用户头像加载失败',
      '报表导出功能超时',
      '非关键页面 CSS 样式错乱'
    ],
    requirements: [
      '值班工程师在工作时间内处理',
      '当天给出修复方案',
      '不需要全员响应',
      '在周报中记录'
    ]
  },
  {
    id: 'p3',
    shortName: '轻微',
    name: '轻微问题 (Minor)',
    color: '#84cc16',
    definition: '边缘功能小问题，极少数用户受影响，不影响正常使用。',
    responseTime: '当天确认，本周处理',
    userImpact: '极少用户',
    oncallReq: '正常排期',
    channels: ['邮件', '工单系统'],
    examples: [
      '某个按钮在特定浏览器下对齐偏移',
      '日志中出现非关键性警告',
      '文案有错别字'
    ],
    requirements: [
      '记录到缺陷跟踪系统',
      '纳入正常迭代排期',
      '不需要紧急响应',
      '修复后正常发布'
    ]
  },
  {
    id: 'p4',
    shortName: '建议',
    name: '改进建议 (Suggestion)',
    color: '#64748b',
    definition: '非故障类问题，属于优化建议或技术债务，不影响任何用户。',
    responseTime: '按优先级排期',
    userImpact: '无直接影响',
    oncallReq: '无需值班',
    channels: ['工单系统'],
    examples: [
      '代码中存在可优化的性能瓶颈',
      '依赖库版本过旧需要升级',
      '监控覆盖率不足需要补充'
    ],
    requirements: [
      '记录到技术债务清单',
      '季度规划时评估优先级',
      '作为团队改进项跟踪',
      '无时间压力'
    ]
  }
]

const current = computed(() => {
  return levels.find((l) => l.id === activeLevel.value)
})
</script>

<style scoped>
.severity-level-demo {
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

.level-tabs {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
}

.level-tab {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.5rem 0.9rem;
  border: 2px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 0.9rem;
}

.level-tab:hover {
  border-color: var(--vp-c-text-3);
}

.level-tab.active.p0 { border-color: #ef4444; background: rgba(239,68,68,0.08); }
.level-tab.active.p1 { border-color: #f59e0b; background: rgba(245,158,11,0.08); }
.level-tab.active.p2 { border-color: #eab308; background: rgba(234,179,8,0.08); }
.level-tab.active.p3 { border-color: #84cc16; background: rgba(132,204,22,0.08); }
.level-tab.active.p4 { border-color: #64748b; background: rgba(100,116,139,0.08); }

.tab-badge {
  font-weight: 700;
  font-size: 0.8rem;
  padding: 0.1rem 0.4rem;
  border-radius: 4px;
  color: #fff;
}

.p0 .tab-badge { background: #ef4444; }
.p1 .tab-badge { background: #f59e0b; }
.p2 .tab-badge { background: #eab308; }
.p3 .tab-badge { background: #84cc16; }
.p4 .tab-badge { background: #64748b; }

.tab-name {
  font-weight: 500;
}

.level-detail {
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

.detail-level {
  font-weight: 800;
  font-size: 1.2rem;
}

.detail-name {
  font-weight: 600;
  font-size: 1rem;
}

.detail-body {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.detail-section {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.section-label {
  font-weight: 600;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

.section-content {
  font-size: 0.9rem;
  line-height: 1.6;
}

.response-time {
  font-weight: 700;
  color: var(--vp-c-brand);
}

.channels {
  display: flex;
  gap: 0.4rem;
  flex-wrap: wrap;
}

.channel-tag {
  padding: 0.15rem 0.5rem;
  background: var(--vp-c-bg-soft);
  border-radius: 4px;
  font-size: 0.8rem;
}

.examples {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.example-item {
  font-size: 0.85rem;
  padding: 0.3rem 0.5rem;
  background: var(--vp-c-bg-soft);
  border-radius: 4px;
  border-left: 3px solid var(--vp-c-divider);
}

.requirements {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.req-item {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.85rem;
}

.req-check {
  color: #22c55e;
  font-weight: 700;
}

.comparison-table {
  background: var(--vp-c-bg);
  border-radius: 10px;
  padding: 1rem;
  border: 1px solid var(--vp-c-divider);
}

.table-title {
  font-weight: 700;
  font-size: 0.95rem;
  margin-bottom: 0.75rem;
}

.table-wrapper {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.85rem;
}

th {
  text-align: left;
  padding: 0.5rem;
  border-bottom: 2px solid var(--vp-c-divider);
  font-weight: 600;
  color: var(--vp-c-text-2);
}

td {
  padding: 0.5rem;
  border-bottom: 1px solid var(--vp-c-divider);
}

tr.highlight {
  background: rgba(var(--vp-c-brand-rgb, 100, 108, 255), 0.06);
}

tr {
  cursor: pointer;
  transition: background 0.2s;
}

tr:hover {
  background: var(--vp-c-bg-soft);
}

.table-badge {
  padding: 0.15rem 0.4rem;
  border-radius: 4px;
  font-weight: 700;
  font-size: 0.75rem;
  color: #fff;
}

.table-badge.p0 { background: #ef4444; }
.table-badge.p1 { background: #f59e0b; }
.table-badge.p2 { background: #eab308; }
.table-badge.p3 { background: #84cc16; }
.table-badge.p4 { background: #64748b; }

@media (max-width: 768px) {
  .level-tabs {
    flex-direction: column;
  }

  .level-tab {
    width: 100%;
    justify-content: center;
  }
}
</style>
