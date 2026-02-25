<!--
  AsyncComparisonDemo.vue
  异步任务框架对比演示
-->
<template>
  <div class="comparison-demo">
    <div class="header">
      <div class="title">主流异步任务框架对比</div>
      <div class="subtitle">点击查看各框架详情</div>
    </div>

    <div class="framework-grid">
      <div
        v-for="fw in frameworks"
        :key="fw.name"
        :class="['fw-card', { active: selected === fw.name }]"
        @click="selected = fw.name"
      >
        <div class="fw-name">{{ fw.name }}</div>
        <div class="fw-lang">{{ fw.lang }}</div>
        <div class="fw-stars">
          <span v-for="n in 5" :key="n" :class="n <= fw.rating ? 'star-filled' : 'star-empty'">★</span>
        </div>
      </div>
    </div>

    <div v-if="currentFw" class="detail-panel">
      <div class="detail-header">
        <span class="detail-name">{{ currentFw.name }}</span>
        <span class="detail-lang-tag">{{ currentFw.lang }}</span>
      </div>
      <div class="detail-desc">{{ currentFw.desc }}</div>
      <div class="detail-features">
        <div class="feature-title">核心特性：</div>
        <div class="feature-list">
          <span v-for="f in currentFw.features" :key="f" class="feature-tag">{{ f }}</span>
        </div>
      </div>
      <div class="detail-usecase">
        <div class="usecase-title">典型场景：</div>
        <div class="usecase-text">{{ currentFw.usecase }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const selected = ref('Celery')

const frameworks = [
  {
    name: 'Celery',
    lang: 'Python',
    rating: 5,
    desc: 'Python 生态最流行的分布式任务队列，支持多种消息中间件（RabbitMQ、Redis），功能全面且社区活跃。',
    features: ['定时任务', '任务链', '结果存储', '自动重试', '优先级队列', '任务路由'],
    usecase: '数据处理管道、邮件发送、报表生成、机器学习训练任务'
  },
  {
    name: 'Sidekiq',
    lang: 'Ruby',
    rating: 5,
    desc: 'Ruby 生态的高性能后台任务处理器，基于 Redis，使用多线程模型，内存效率极高。',
    features: ['多线程', 'Web UI', '定时任务', '批量处理', '速率限制', '唯一任务'],
    usecase: 'Rails 应用的邮件、通知、数据导入导出'
  },
  {
    name: 'Bull',
    lang: 'Node.js',
    rating: 4,
    desc: 'Node.js 生态最成熟的任务队列库，基于 Redis，支持优先级、延迟任务、重复任务等。BullMQ 是其下一代版本。',
    features: ['优先级', '延迟任务', '速率限制', '并发控制', '事件驱动', 'Dashboard'],
    usecase: 'API 后台处理、文件转换、爬虫任务、通知推送'
  },
  {
    name: 'RQ',
    lang: 'Python',
    rating: 3,
    desc: '轻量级 Python 任务队列，基于 Redis，API 简洁易用。适合不需要 Celery 全部功能的中小项目。',
    features: ['简洁 API', '任务依赖', 'Worker 管理', '失败重试', 'Dashboard'],
    usecase: '中小型 Web 应用的后台任务处理'
  },
  {
    name: 'Kafka Streams',
    lang: 'Java/JVM',
    rating: 4,
    desc: '基于 Kafka 的流处理框架，适合高吞吐量的实时数据处理场景，天然支持分布式和容错。',
    features: ['流处理', '精确一次语义', '状态存储', '窗口操作', '高吞吐', '容错'],
    usecase: '实时数据管道、事件驱动架构、日志聚合分析'
  }
]

const currentFw = computed(() => frameworks.find(f => f.name === selected.value))
</script>

<style scoped>
.comparison-demo {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  padding: 1.5rem;
  margin: 1.5rem 0;
}
.header { margin-bottom: 1rem; }
.title { font-weight: 700; font-size: 1.1rem; }
.subtitle { color: var(--vp-c-text-2); font-size: 0.9rem; }
.framework-grid {
  display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 0.5rem; margin-bottom: 1rem;
}
.fw-card {
  padding: 0.75rem; border-radius: 8px; background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider); cursor: pointer; text-align: center;
  transition: all 0.2s;
}
.fw-card:hover { border-color: var(--vp-c-brand); }
.fw-card.active { border-color: var(--vp-c-brand); background: rgba(var(--vp-c-brand-rgb), 0.05); }
.fw-name { font-weight: 700; font-size: 0.95rem; }
.fw-lang { font-size: 0.8rem; color: var(--vp-c-text-2); margin: 0.25rem 0; }
.fw-stars { font-size: 0.85rem; }
.star-filled { color: #f59e0b; }
.star-empty { color: var(--vp-c-divider); }
.detail-panel {
  padding: 1rem; border-radius: 10px; background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
}
.detail-header { display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem; }
.detail-name { font-weight: 700; font-size: 1rem; }
.detail-lang-tag {
  padding: 0.15rem 0.5rem; border-radius: 4px; font-size: 0.75rem;
  background: rgba(var(--vp-c-brand-rgb), 0.1); color: var(--vp-c-brand);
}
.detail-desc { font-size: 0.9rem; color: var(--vp-c-text-2); margin-bottom: 0.75rem; line-height: 1.6; }
.feature-title, .usecase-title { font-weight: 600; font-size: 0.85rem; margin-bottom: 0.4rem; }
.feature-list { display: flex; flex-wrap: wrap; gap: 0.4rem; margin-bottom: 0.75rem; }
.feature-tag {
  padding: 0.2rem 0.5rem; border-radius: 4px; font-size: 0.75rem;
  background: var(--vp-c-bg-soft); border: 1px solid var(--vp-c-divider);
}
.usecase-text { font-size: 0.85rem; color: var(--vp-c-text-2); }
</style>
