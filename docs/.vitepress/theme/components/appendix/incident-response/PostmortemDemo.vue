<!--
  PostmortemDemo.vue
  事后复盘演示：交互式展示"五个为什么"分析法和复盘报告模板
-->
<template>
  <div class="postmortem-demo">
    <div class="header">
      <div class="title">事后复盘：五个为什么 (5 Whys Analysis)</div>
      <div class="subtitle">点击"继续追问"，层层深入挖掘根本原因</div>
    </div>

    <div class="case-select">
      <button
        v-for="c in cases"
        :key="c.id"
        :class="['case-btn', { active: activeCase === c.id }]"
        @click="selectCase(c.id)"
      >
        {{ c.name }}
      </button>
    </div>

    <div v-if="currentCase" class="whys-chain">
      <div
        v-for="(why, index) in visibleWhys"
        :key="index"
        class="why-item"
      >
        <div class="why-header">
          <span class="why-badge">
            {{ index === 0 ? '现象' : '第 ' + index + ' 个为什么' }}
          </span>
          <span class="why-depth">
            深度 {{ index }} / {{ currentCase.whys.length - 1 }}
          </span>
        </div>
        <div class="why-question" v-if="index > 0">
          为什么{{ currentCase.whys[index - 1].answer }}？
        </div>
        <div class="why-answer">
          <span class="answer-icon">{{ index === currentCase.whys.length - 1 && revealedCount >= currentCase.whys.length ? '🎯' : '💡' }}</span>
          <span>{{ why.answer }}</span>
        </div>
        <div
          v-if="index < visibleWhys.length - 1"
          class="why-arrow"
        >
          ↓ 继续追问
        </div>
      </div>

      <div class="why-controls" v-if="revealedCount < currentCase.whys.length">
        <button class="ask-btn" @click="revealNext">
          继续追问：为什么？
        </button>
      </div>

      <div v-else class="root-cause-box">
        <div class="root-label">根本原因已找到</div>
        <div class="root-content">{{ currentCase.rootCause }}</div>
        <div class="root-actions">
          <div class="actions-label">改进措施：</div>
          <div
            v-for="(action, i) in currentCase.actions"
            :key="i"
            class="action-item"
          >
            <span class="action-check">&#10003;</span>
            <span>{{ action }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="template-box">
      <div class="template-title">复盘报告模板</div>
      <div class="template-sections">
        <div
          v-for="(section, i) in templateSections"
          :key="i"
          class="template-item"
          :class="{ expanded: expandedSection === i }"
          @click="expandedSection = expandedSection === i ? -1 : i"
        >
          <div class="template-item-header">
            <span class="template-num">{{ i + 1 }}</span>
            <span class="template-name">{{ section.name }}</span>
            <span class="template-toggle">
              {{ expandedSection === i ? '−' : '+' }}
            </span>
          </div>
          <div v-if="expandedSection === i" class="template-item-body">
            {{ section.desc }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const activeCase = ref('payment')
const revealedCount = ref(1)
const expandedSection = ref(-1)

const casesData = {
  payment: {
    id: 'payment',
    name: '支付系统宕机',
    whys: [
      { answer: '支付系统在高峰期完全不可用，持续 18 分钟' },
      { answer: '数据库连接池被耗尽，所有新请求排队超时' },
      { answer: '一条慢查询占用连接长达 30 秒不释放' },
      { answer: '新上线的对账功能执行了全表扫描，没有使用索引' },
      { answer: '代码审查时没有检查 SQL 执行计划，也没有慢查询测试环节' }
    ],
    rootCause: '研发流程缺陷：代码审查清单中缺少 SQL 性能审查项，CI/CD 流水线中没有慢查询检测环节。',
    actions: [
      '代码审查清单增加"SQL 执行计划检查"必选项',
      'CI 流水线增加慢查询自动检测（阈值 100ms）',
      '数据库连接池增加单查询超时限制（5s 强制断开）',
      '建立大表变更审批流程'
    ]
  },
  deploy: {
    id: 'deploy',
    name: '部署导致服务中断',
    whys: [
      { answer: '新版本部署后，用户登录功能完全失效，持续 25 分钟' },
      { answer: '新版本的认证服务无法连接 Redis 缓存集群' },
      { answer: '部署脚本使用了错误的 Redis 集群地址（指向了测试环境）' },
      { answer: '环境配置是硬编码在部署脚本中的，没有使用配置中心' },
      { answer: '团队没有统一的配置管理规范，每个服务自行管理配置' }
    ],
    rootCause: '基础设施缺陷：缺乏统一的配置管理平台和规范，环境配置散落在各处，容易出错且难以审计。',
    actions: [
      '引入配置中心（如 Consul/Nacos），统一管理所有环境配置',
      '部署流水线增加配置校验步骤（连通性检查）',
      '禁止在代码和脚本中硬编码环境地址',
      '建立部署前 Checklist，包含配置确认环节'
    ]
  }
}

const cases = [
  { id: 'payment', name: '支付系统宕机' },
  { id: 'deploy', name: '部署导致服务中断' }
]

const currentCase = computed(() => casesData[activeCase.value] || null)

const visibleWhys = computed(() => {
  if (!currentCase.value) return []
  return currentCase.value.whys.slice(0, revealedCount.value)
})

const selectCase = (id) => {
  activeCase.value = id
  revealedCount.value = 1
}

const revealNext = () => {
  if (currentCase.value && revealedCount.value < currentCase.value.whys.length) {
    revealedCount.value++
  }
}

const templateSections = [
  { name: '事故概述', desc: '简要描述事故发生的时间、持续时长、影响范围和严重程度。例如："2024年3月15日 14:02-14:20，支付服务完全不可用，影响约 12 万笔交易。"' },
  { name: '时间线', desc: '按时间顺序记录从发现到解决的每一个关键事件，精确到分钟。包括：告警触发、人员响应、排查过程、修复操作、服务恢复等。' },
  { name: '影响评估', desc: '量化事故影响：受影响用户数、失败请求数、经济损失估算、SLA 影响等。用数据说话，避免模糊描述。' },
  { name: '根因分析', desc: '使用"五个为什么"等方法深入分析根本原因。区分直接原因（触发因素）和根本原因（系统性缺陷）。' },
  { name: '改进措施', desc: '列出具体的改进行动项，每项必须有负责人和截止日期。分为短期（本周）、中期（本月）、长期（本季度）三个层次。' },
  { name: '经验教训', desc: '总结哪些做得好（值得保持）、哪些做得不好（需要改进）、哪些是意外发现（新的风险点）。' }
]
</script>

<style scoped>
.postmortem-demo {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  padding: 1.5rem;
  margin: 1.5rem 0;
}

.header { margin-bottom: 1.5rem; }
.title { font-weight: 700; font-size: 1.1rem; margin-bottom: 0.25rem; }
.subtitle { color: var(--vp-c-text-2); font-size: 0.9rem; }

.case-select {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
}

.case-btn {
  padding: 0.5rem 1rem;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.2s;
}

.case-btn:hover {
  border-color: var(--vp-c-brand);
  color: var(--vp-c-brand);
}

.case-btn.active {
  background: var(--vp-c-brand);
  color: #fff;
  border-color: var(--vp-c-brand);
}

.whys-chain {
  margin-bottom: 1.5rem;
}

.why-item {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 0.75rem;
  margin-bottom: 0.25rem;
}

.why-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.4rem;
}

.why-badge {
  font-weight: 700;
  font-size: 0.8rem;
  padding: 0.15rem 0.5rem;
  background: var(--vp-c-brand);
  color: #fff;
  border-radius: 4px;
}

.why-depth {
  font-size: 0.75rem;
  color: var(--vp-c-text-3);
}

.why-question {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  font-style: italic;
  margin-bottom: 0.3rem;
  padding-left: 0.5rem;
  border-left: 2px solid var(--vp-c-divider);
}

.why-answer {
  display: flex;
  align-items: flex-start;
  gap: 0.4rem;
  font-size: 0.9rem;
  line-height: 1.5;
}

.answer-icon { flex-shrink: 0; }

.why-arrow {
  text-align: center;
  color: var(--vp-c-text-3);
  font-size: 0.8rem;
  padding: 0.25rem 0;
}

.why-controls {
  text-align: center;
  margin-top: 0.75rem;
}

.ask-btn {
  padding: 0.6rem 1.5rem;
  background: var(--vp-c-brand);
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 600;
  transition: all 0.2s;
}

.ask-btn:hover { opacity: 0.9; transform: translateY(-1px); }

.root-cause-box {
  background: rgba(34, 197, 94, 0.08);
  border: 2px solid #22c55e;
  border-radius: 10px;
  padding: 1rem;
  margin-top: 0.75rem;
}

.root-label {
  font-weight: 700;
  font-size: 0.95rem;
  color: #22c55e;
  margin-bottom: 0.5rem;
}

.root-content {
  font-size: 0.9rem;
  line-height: 1.6;
  margin-bottom: 0.75rem;
}

.actions-label {
  font-weight: 600;
  font-size: 0.85rem;
  margin-bottom: 0.4rem;
}

.action-item {
  display: flex;
  align-items: flex-start;
  gap: 0.4rem;
  font-size: 0.85rem;
  margin-bottom: 0.3rem;
}

.action-check {
  color: #22c55e;
  font-weight: 700;
  flex-shrink: 0;
}

.template-box {
  background: var(--vp-c-bg);
  border-radius: 10px;
  padding: 1rem;
  border: 1px solid var(--vp-c-divider);
}

.template-title {
  font-weight: 700;
  font-size: 0.95rem;
  margin-bottom: 0.75rem;
}

.template-sections {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.template-item {
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
  overflow: hidden;
}

.template-item:hover {
  border-color: var(--vp-c-brand);
}

.template-item.expanded {
  border-color: var(--vp-c-brand);
}

.template-item-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
}

.template-num {
  width: 22px; height: 22px; border-radius: 50%;
  background: var(--vp-c-bg-soft);
  display: flex; align-items: center; justify-content: center;
  font-size: 0.75rem; font-weight: 700; flex-shrink: 0;
}

.template-name {
  flex: 1;
  font-weight: 600;
  font-size: 0.9rem;
}

.template-toggle {
  font-size: 1.1rem;
  color: var(--vp-c-text-3);
  font-weight: 700;
}

.template-item-body {
  padding: 0 0.75rem 0.6rem;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  line-height: 1.6;
}

@media (max-width: 768px) {
  .case-select { flex-direction: column; }
  .case-btn { width: 100%; }
}
</style>
