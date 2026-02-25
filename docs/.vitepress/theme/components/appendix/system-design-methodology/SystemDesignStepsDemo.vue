<!--
  SystemDesignStepsDemo.vue
  系统设计步骤交互演示：展示系统设计面试/实战的标准流程
-->
<template>
  <div class="design-steps-demo">
    <div class="header">
      <div class="title">系统设计四步法</div>
      <div class="subtitle">点击每个步骤查看详细内容</div>
    </div>

    <div class="steps">
      <div
        v-for="(step, i) in steps"
        :key="step.key"
        :class="['step-card', { active: activeStep === step.key }]"
        @click="activeStep = step.key"
      >
        <div class="step-number">{{ i + 1 }}</div>
        <div class="step-name">{{ step.name }}</div>
        <div class="step-time">{{ step.time }}</div>
      </div>
    </div>

    <div v-if="current" class="detail-panel">
      <div class="detail-title">{{ current.name }}</div>
      <div class="detail-desc">{{ current.desc }}</div>
      <div class="checklist">
        <div v-for="(item, i) in current.checklist" :key="i" class="check-item">
          <span class="check-icon">✓</span>
          <span>{{ item }}</span>
        </div>
      </div>
      <div class="detail-example">
        <span class="label">示例（设计短链服务）：</span>
        <div class="example-text">{{ current.example }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const activeStep = ref('requirements')

const steps = [
  {
    key: 'requirements',
    name: '需求澄清',
    time: '~5 分钟',
    desc: '不要急着画架构图。先搞清楚：系统要解决什么问题？用户规模多大？有哪些核心功能？有哪些非功能需求？',
    checklist: [
      '核心功能有哪些？（MVP 范围）',
      '用户规模？DAU / QPS 预估',
      '读写比例？读多写少还是写多读少？',
      '数据量级？需要存多少数据？',
      '可用性要求？几个 9？',
      '延迟要求？P99 要多少毫秒？'
    ],
    example: '短链服务：生成短链（写）+ 重定向（读），读写比约 100:1，日均 1 亿次重定向，短链永不过期。'
  },
  {
    key: 'estimation',
    name: '容量估算',
    time: '~5 分钟',
    desc: '用"信封背面估算"（Back-of-envelope estimation）快速计算系统需要的资源量级，为后续架构决策提供数据支撑。',
    checklist: [
      'QPS 估算：日请求量 / 86400',
      '存储估算：单条数据大小 × 总量',
      '带宽估算：QPS × 单次响应大小',
      '缓存估算：热点数据量（通常 20% 数据承载 80% 请求）',
      '峰值估算：平均 QPS × 峰值系数（通常 2-5 倍）'
    ],
    example: '1 亿次/天 ≈ 1200 QPS，峰值 ≈ 3600 QPS。每条短链 100 字节，5 年 = 1.8 亿条 ≈ 18GB。缓存热点 20% ≈ 3.6GB，一台 Redis 足够。'
  },
  {
    key: 'design',
    name: '架构设计',
    time: '~15 分钟',
    desc: '画出核心组件和数据流。先画最简单的版本（单机），再根据需求逐步演进（加缓存、分库分表、CDN 等）。',
    checklist: [
      'API 设计：定义核心接口的输入输出',
      '数据模型：设计核心表结构',
      '核心组件：Web 服务、数据库、缓存、消息队列',
      '数据流：请求从用户到数据库的完整路径',
      '读写分离：读路径和写路径分开考虑'
    ],
    example: '写路径：客户端 → API → 生成短码（Base62） → 写入 MySQL + Redis。读路径：客户端 → CDN → API → Redis 查询 → 302 重定向。'
  },
  {
    key: 'deep-dive',
    name: '深入优化',
    time: '~10 分钟',
    desc: '针对系统的瓶颈和关键问题进行深入讨论。这是展示技术深度的环节。',
    checklist: [
      '如何保证短码唯一性？（哈希冲突处理）',
      '如何应对热点？（缓存、CDN）',
      '如何水平扩展？（分库分表策略）',
      '如何保证高可用？（主备、多可用区）',
      '如何监控和告警？（关键指标）',
      '安全考虑？（防刷、恶意链接检测）'
    ],
    example: '短码生成：用分布式 ID 生成器（Snowflake）+ Base62 编码，避免哈希冲突。热点短链用多级缓存（本地缓存 + Redis + CDN）。'
  }
]

const current = computed(() => steps.find(s => s.key === activeStep.value))
</script>

<style scoped>
.design-steps-demo {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  padding: 1.5rem;
  margin: 1.5rem 0;
}
.header { margin-bottom: 1rem; }
.title { font-weight: 700; font-size: 1.1rem; }
.subtitle { color: var(--vp-c-text-2); font-size: 0.9rem; }
.steps {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.5rem;
  margin-bottom: 1rem;
}
@media (max-width: 640px) {
  .steps { grid-template-columns: repeat(2, 1fr); }
}
.step-card {
  padding: 0.6rem;
  border-radius: 8px;
  cursor: pointer;
  text-align: center;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  transition: all 0.2s;
}
.step-card:hover { border-color: var(--vp-c-brand); }
.step-card.active {
  border-color: var(--vp-c-brand);
  background: rgba(var(--vp-c-brand-rgb), 0.05);
}
.step-number {
  font-size: 1.2rem;
  font-weight: 800;
  color: var(--vp-c-brand);
}
.step-name { font-weight: 600; font-size: 0.85rem; }
.step-time {
  font-size: 0.72rem;
  color: var(--vp-c-text-3);
}
.detail-panel {
  background: var(--vp-c-bg);
  border-radius: 8px;
  padding: 1rem;
  border: 1px solid var(--vp-c-divider);
}
.detail-title {
  font-weight: 700;
  font-size: 0.95rem;
  margin-bottom: 0.4rem;
}
.detail-desc {
  font-size: 0.82rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.75rem;
}
.checklist {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  margin-bottom: 0.75rem;
}
.check-item {
  font-size: 0.8rem;
  display: flex;
  gap: 0.4rem;
  align-items: flex-start;
}
.check-icon {
  color: var(--vp-c-brand);
  font-weight: 700;
  flex-shrink: 0;
}
.detail-example {
  font-size: 0.82rem;
  padding: 0.5rem;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
}
.example-text {
  color: var(--vp-c-text-2);
  margin-top: 0.25rem;
}
.label { font-weight: 600; color: var(--vp-c-text-2); }
</style>
