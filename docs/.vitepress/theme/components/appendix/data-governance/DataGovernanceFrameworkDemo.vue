<!--
  DataGovernanceFrameworkDemo.vue
  数据治理框架演示：展示数据治理的核心流程
-->
<template>
  <div class="governance-demo">
    <div class="header">
      <div class="title">数据治理框架</div>
      <div class="subtitle">点击各阶段查看详情</div>
    </div>

    <div class="pipeline">
      <div
        v-for="(stage, i) in stages"
        :key="stage.key"
        :class="['stage', { active: activeStage === stage.key }]"
        @click="activeStage = stage.key"
      >
        <div class="stage-num">{{ i + 1 }}</div>
        <div class="stage-name">{{ stage.name }}</div>
        <div v-if="i < stages.length - 1" class="arrow">→</div>
      </div>
    </div>

    <div v-if="current" class="stage-detail">
      <div class="detail-title">{{ current.name }}</div>
      <div class="detail-desc">{{ current.desc }}</div>
      <div class="activities">
        <div v-for="(act, i) in current.activities" :key="i" class="activity">
          <span class="act-icon">{{ act.icon }}</span>
          <div>
            <div class="act-name">{{ act.name }}</div>
            <div class="act-desc">{{ act.desc }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const activeStage = ref('define')

const stages = [
  {
    key: 'define',
    name: '定义标准',
    desc: '制定数据标准、命名规范、数据字典',
    activities: [
      { icon: '📖', name: '数据字典', desc: '定义每个字段的含义、类型、取值范围' },
      { icon: '📏', name: '命名规范', desc: '统一字段命名：snake_case、驼峰、前缀约定' },
      { icon: '🏷️', name: '分类分级', desc: '按敏感度分级：公开、内部、机密、绝密' }
    ]
  },
  {
    key: 'collect',
    name: '采集接入',
    desc: '规范数据采集流程，确保源头质量',
    activities: [
      { icon: '🔌', name: '接入规范', desc: '定义数据接入的格式、协议、频率要求' },
      { icon: '✅', name: '入库校验', desc: '数据写入前进行格式、完整性、合规性校验' },
      { icon: '📝', name: '血缘记录', desc: '记录数据来源、加工链路、依赖关系' }
    ]
  },
  {
    key: 'store',
    name: '存储管理',
    desc: '合理存储数据，控制成本和访问权限',
    activities: [
      { icon: '🗄️', name: '分层存储', desc: 'ODS → DWD → DWS → ADS 数仓分层' },
      { icon: '🔒', name: '权限控制', desc: '按角色和数据分级控制读写权限' },
      { icon: '♻️', name: '生命周期', desc: '热数据 → 温数据 → 冷数据 → 归档/删除' }
    ]
  },
  {
    key: 'use',
    name: '使用消费',
    desc: '让数据安全、高效地被业务使用',
    activities: [
      { icon: '🔍', name: '数据目录', desc: '提供可搜索的数据资产目录，降低找数成本' },
      { icon: '🎭', name: '脱敏处理', desc: '对敏感字段进行掩码、加密、泛化处理' },
      { icon: '📊', name: '质量监控', desc: '持续监控数据质量指标，异常时告警' }
    ]
  },
  {
    key: 'retire',
    name: '归档销毁',
    desc: '按合规要求归档或安全销毁数据',
    activities: [
      { icon: '📦', name: '归档策略', desc: '超过保留期的数据迁移到低成本存储' },
      { icon: '🗑️', name: '安全删除', desc: '按 GDPR/个保法要求彻底删除用户数据' },
      { icon: '📋', name: '审计日志', desc: '记录数据删除操作，满足合规审计要求' }
    ]
  }
]

const current = computed(() => stages.find(s => s.key === activeStage.value))
</script>

<style scoped>
.governance-demo {
  border: 1px solid var(--vp-c-divider); background: var(--vp-c-bg-soft);
  border-radius: 12px; padding: 1.5rem; margin: 1.5rem 0;
}
.header { margin-bottom: 1rem; }
.title { font-weight: 700; font-size: 1.1rem; }
.subtitle { color: var(--vp-c-text-2); font-size: 0.9rem; }
.pipeline { display: flex; align-items: center; gap: 0.25rem; margin-bottom: 1rem; flex-wrap: wrap; }
.stage {
  display: flex; align-items: center; gap: 0.4rem; padding: 0.5rem 0.75rem;
  border-radius: 8px; cursor: pointer; background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider); transition: all 0.2s; font-size: 0.85rem;
}
.stage:hover { border-color: var(--vp-c-brand); }
.stage.active { border-color: var(--vp-c-brand); background: rgba(var(--vp-c-brand-rgb), 0.05); }
.stage-num { width: 20px; height: 20px; border-radius: 50%; background: var(--vp-c-brand); color: #fff; display: flex; align-items: center; justify-content: center; font-size: 0.7rem; font-weight: 700; }
.stage-name { font-weight: 600; }
.arrow { color: var(--vp-c-text-3); margin-left: 0.25rem; }
.stage-detail { background: var(--vp-c-bg); border-radius: 8px; padding: 1rem; border: 1px solid var(--vp-c-divider); }
.detail-title { font-weight: 700; font-size: 1rem; margin-bottom: 0.25rem; }
.detail-desc { color: var(--vp-c-text-2); font-size: 0.85rem; margin-bottom: 0.75rem; }
.activities { display: flex; flex-direction: column; gap: 0.5rem; }
.activity { display: flex; gap: 0.5rem; padding: 0.5rem; border-radius: 6px; background: var(--vp-c-bg-soft); }
.act-icon { font-size: 1.2rem; }
.act-name { font-weight: 600; font-size: 0.85rem; }
.act-desc { font-size: 0.78rem; color: var(--vp-c-text-2); }
@media (max-width: 640px) { .pipeline { flex-direction: column; align-items: stretch; } .arrow { display: none; } }
</style>
