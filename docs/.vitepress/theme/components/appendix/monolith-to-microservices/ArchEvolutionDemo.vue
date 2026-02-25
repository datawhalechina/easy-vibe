<!--
  ArchEvolutionDemo.vue
  架构演进演示：展示从单体到微服务的演进过程
-->
<template>
  <div class="arch-evolution-demo">
    <div class="header">
      <div class="title">架构演进路径</div>
      <div class="subtitle">点击查看每个阶段的架构特点</div>
    </div>

    <div class="stages">
      <div
        v-for="(stage, i) in stages"
        :key="stage.key"
        :class="['stage-card', { active: activeStage === stage.key }]"
        @click="activeStage = stage.key"
      >
        <div class="stage-num">{{ i + 1 }}</div>
        <div class="stage-name">{{ stage.name }}</div>
      </div>
    </div>

    <div v-if="current" class="stage-detail">
      <div class="detail-name">{{ current.name }}</div>
      <div class="detail-desc">{{ current.desc }}</div>

      <div class="arch-visual">
        <div
          v-for="(box, i) in current.boxes"
          :key="i"
          :class="['arch-box', box.type]"
        >
          {{ box.label }}
        </div>
      </div>

      <div class="detail-row">
        <span class="label">适用规模：</span>{{ current.scale }}
      </div>
      <div class="detail-row">
        <span class="label">核心挑战：</span>{{ current.challenge }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const activeStage = ref('monolith')

const stages = [
  {
    key: 'monolith',
    name: '单体架构',
    desc: '所有功能打包在一个应用中，共享一个数据库。简单直接，适合早期快速迭代。',
    scale: '团队 < 10 人，日活 < 10 万',
    challenge: '代码耦合严重，一个模块的 Bug 可能拖垮整个系统',
    boxes: [
      { label: '用户模块', type: 'module' },
      { label: '订单模块', type: 'module' },
      { label: '支付模块', type: 'module' },
      { label: '商品模块', type: 'module' },
      { label: '单体应用（一个进程）', type: 'container' },
      { label: 'MySQL', type: 'db' }
    ]
  },
  {
    key: 'modular',
    name: '模块化单体',
    desc: '在单体内部按业务域划分模块，模块间通过接口通信。是微服务的前置步骤。',
    scale: '团队 10-30 人',
    challenge: '模块边界容易被打破，需要纪律性',
    boxes: [
      { label: '用户域', type: 'domain' },
      { label: '订单域', type: 'domain' },
      { label: '支付域', type: 'domain' },
      { label: '内部 API 边界', type: 'boundary' },
      { label: 'MySQL', type: 'db' }
    ]
  },
  {
    key: 'soa',
    name: '服务化（SOA）',
    desc: '按业务能力拆分为独立服务，通过 ESB 或 API 网关通信。每个服务可以独立部署。',
    scale: '团队 30-100 人',
    challenge: '服务间调用链变长，需要服务治理',
    boxes: [
      { label: '用户服务', type: 'service' },
      { label: '订单服务', type: 'service' },
      { label: '支付服务', type: 'service' },
      { label: 'API 网关', type: 'gateway' },
      { label: '各自数据库', type: 'db' }
    ]
  },
  {
    key: 'microservices',
    name: '微服务架构',
    desc: '更细粒度的服务拆分，每个服务独立开发、部署、扩缩容。配合容器化和 K8s。',
    scale: '团队 100+ 人，日活百万+',
    challenge: '分布式复杂性、数据一致性、运维成本',
    boxes: [
      { label: '用户服务', type: 'service' },
      { label: '认证服务', type: 'service' },
      { label: '订单服务', type: 'service' },
      { label: '库存服务', type: 'service' },
      { label: '支付服务', type: 'service' },
      { label: '通知服务', type: 'service' },
      { label: 'API Gateway + Service Mesh', type: 'gateway' },
      { label: '独立数据库 x N', type: 'db' }
    ]
  }
]

const current = computed(() => stages.find(s => s.key === activeStage.value))
</script>

<style scoped>
.arch-evolution-demo {
  border: 1px solid var(--vp-c-divider); background: var(--vp-c-bg-soft);
  border-radius: 12px; padding: 1.5rem; margin: 1.5rem 0;
}
.header { margin-bottom: 1rem; }
.title { font-weight: 700; font-size: 1.1rem; }
.subtitle { color: var(--vp-c-text-2); font-size: 0.9rem; }
.stages { display: flex; gap: 0.5rem; margin-bottom: 1rem; flex-wrap: wrap; }
.stage-card {
  display: flex; align-items: center; gap: 0.4rem;
  padding: 0.4rem 0.75rem; border-radius: 6px; cursor: pointer;
  font-size: 0.85rem; background: var(--vp-c-bg); border: 1px solid var(--vp-c-divider);
  transition: all 0.2s;
}
.stage-card:hover { border-color: var(--vp-c-brand); }
.stage-card.active { border-color: var(--vp-c-brand); background: rgba(var(--vp-c-brand-rgb), 0.05); font-weight: 600; }
.stage-num {
  width: 20px; height: 20px; border-radius: 50%; background: var(--vp-c-brand);
  color: white; font-size: 0.7rem; font-weight: 700;
  display: flex; align-items: center; justify-content: center;
}
.stage-detail { background: var(--vp-c-bg); border-radius: 8px; padding: 1rem; border: 1px solid var(--vp-c-divider); }
.detail-name { font-weight: 700; font-size: 0.95rem; }
.detail-desc { color: var(--vp-c-text-2); font-size: 0.82rem; margin-bottom: 0.75rem; }
.arch-visual { display: flex; flex-wrap: wrap; gap: 0.4rem; margin-bottom: 0.75rem; }
.arch-box {
  padding: 0.35rem 0.6rem; border-radius: 4px; font-size: 0.72rem; font-weight: 600;
  border: 1px dashed var(--vp-c-divider);
}
.arch-box.module { background: rgba(var(--vp-c-brand-rgb), 0.06); }
.arch-box.domain { background: rgba(99,102,241,0.06); }
.arch-box.service { background: rgba(34,197,94,0.06); }
.arch-box.gateway { background: rgba(245,158,11,0.06); width: 100%; text-align: center; }
.arch-box.container { background: rgba(239,68,68,0.06); width: 100%; text-align: center; }
.arch-box.boundary { background: rgba(156,163,175,0.06); width: 100%; text-align: center; }
.arch-box.db { background: rgba(139,92,246,0.06); }
.detail-row { font-size: 0.82rem; margin-bottom: 0.25rem; }
.label { font-weight: 600; color: var(--vp-c-text-2); }
</style>
