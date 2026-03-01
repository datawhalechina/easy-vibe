<template>
  <div class="clean-arch-demo">
    <div class="header">
      <div class="title">整洁架构与分层架构对比</div>
      <div class="subtitle">分层架构是整洁架构的基础，理解两者关系有助于构建更灵活的系统</div>
    </div>

    <div class="tabs">
      <button
        v-for="t in tabs" :key="t.id"
        :class="['tab', { active: current === t.id }]"
        @click="current = t.id"
      >{{ t.name }}</button>
    </div>

    <div v-if="current === 'layered'" class="panel">
      <div class="arch-layers">
        <div v-for="l in layeredLayers" :key="l.name" :class="['arch-layer', l.cls]">
          <strong>{{ l.name }}</strong> <span>{{ l.desc }}</span>
        </div>
      </div>
      <div class="traits">
        <strong>传统分层架构特点</strong>
        <ul>
          <li>垂直依赖：上层直接依赖下层</li>
          <li>简单直观：结构清晰，易于理解</li>
          <li>适合中小型项目：快速开发，上手简单</li>
          <li>潜在问题：底层变更可能影响上层</li>
        </ul>
      </div>
    </div>

    <div v-else-if="current === 'clean'" class="panel">
      <div class="clean-layers">
        <div v-for="l in cleanLayers" :key="l.name" :class="['arch-layer', l.cls]">
          <strong>{{ l.name }}</strong> <span>{{ l.items }}</span>
        </div>
      </div>
      <div class="dep-rule">依赖方向：外层 → 内层，内层不知道外层的存在</div>
      <div class="traits">
        <strong>整洁架构特点</strong>
        <ul>
          <li>依赖倒置：依赖方向从外到内，通过接口隔离</li>
          <li>领域为核心：业务逻辑位于中心，独立于框架</li>
          <li>可测试性强：核心业务可脱离框架单元测试</li>
          <li>技术无关：可轻松切换数据库、框架等</li>
        </ul>
      </div>
    </div>

    <div v-else class="panel">
      <table>
        <thead><tr><th>特性</th><th>传统分层</th><th>整洁架构</th></tr></thead>
        <tbody>
          <tr v-for="r in compareRows" :key="r.feature">
            <td>{{ r.feature }}</td><td>{{ r.layered }}</td><td>{{ r.clean }}</td>
          </tr>
        </tbody>
      </table>
      <div class="rec-grid">
        <div class="rec-card">
          <strong>选择传统分层当...</strong>
          <ul>
            <li>项目规模较小，业务简单</li>
            <li>团队对 DDD 不熟悉</li>
            <li>需要快速上线验证市场</li>
          </ul>
        </div>
        <div class="rec-card recommended">
          <strong>选择整洁架构当...</strong>
          <ul>
            <li>业务复杂，领域模型丰富</li>
            <li>需要长期维护和演进</li>
            <li>需要频繁切换技术栈</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const current = ref('layered')
const tabs = [
  { id: 'layered', name: '传统分层' },
  { id: 'clean', name: '整洁架构' },
  { id: 'compare', name: '对比总结' }
]

const layeredLayers = [
  { name: 'Controller 层', desc: '接收请求、参数校验', cls: 'green' },
  { name: 'Service 层', desc: '业务逻辑、事务管理', cls: 'orange' },
  { name: 'Repository 层', desc: '数据访问、ORM 映射', cls: 'blue' },
  { name: 'Domain 层', desc: '实体定义、业务规则', cls: 'teal' }
]

const cleanLayers = [
  { name: '领域层（核心）', items: 'Entity / ValueObject / DomainService', cls: 'teal' },
  { name: '应用层', items: 'Service / UseCase / DTO', cls: 'orange' },
  { name: '接口适配层', items: 'Controller / Gateway / Presenter', cls: 'blue' },
  { name: '框架与驱动层', items: 'Web / DB / UI / 外部接口', cls: 'gray' }
]

const compareRows = [
  { feature: '依赖方向', layered: '从上到下', clean: '从外到内' },
  { feature: '核心业务位置', layered: 'Service 层', clean: 'Domain 层（中心）' },
  { feature: '框架依赖', layered: '较深', clean: '较浅（接口隔离）' },
  { feature: '可测试性', layered: '需要集成测试', clean: '核心可单元测试' },
  { feature: '学习曲线', layered: '平缓', clean: '较陡' },
  { feature: '适用场景', layered: '中小型、快速迭代', clean: '大型复杂、长期维护' }
]
</script>

<style scoped>
.clean-arch-demo { padding: 20px; background: var(--vp-c-bg-soft); border-radius: 12px; }
.header { text-align: center; margin-bottom: 20px; }
.title { font-size: 16px; font-weight: 600; color: var(--vp-c-text-1); }
.subtitle { font-size: 13px; color: var(--vp-c-text-3); margin-top: 4px; }

.tabs { display: flex; gap: 8px; margin-bottom: 16px; }
.tab {
  padding: 7px 16px; border: 1px solid var(--vp-c-divider); background: var(--vp-c-bg);
  border-radius: 6px; cursor: pointer; font-size: 13px; color: var(--vp-c-text-2); transition: all .2s;
}
.tab:hover { color: var(--vp-c-brand-1); border-color: var(--vp-c-brand-1); }
.tab.active { background: var(--vp-c-brand-1); border-color: var(--vp-c-brand-1); color: #fff; }

.panel {
  padding: 18px; border-radius: 10px;
  background: var(--vp-c-bg); border: 1px solid var(--vp-c-divider);
}

.arch-layers, .clean-layers { display: flex; flex-direction: column; gap: 6px; margin-bottom: 16px; }
.arch-layer {
  padding: 12px 14px; border-radius: 6px;
  background: var(--vp-c-bg-soft); border-left: 3px solid var(--vp-c-divider);
  font-size: 13px; color: var(--vp-c-text-2);
}
.arch-layer strong { color: var(--vp-c-text-1); margin-right: 8px; }
.arch-layer.green { border-left-color: #10b981; }
.arch-layer.orange { border-left-color: #f59e0b; }
.arch-layer.blue { border-left-color: #3b82f6; }
.arch-layer.teal { border-left-color: #14b8a6; }
.arch-layer.gray { border-left-color: #6b7280; }

.dep-rule {
  text-align: center; padding: 10px; margin-bottom: 16px; border-radius: 6px;
  border: 2px dashed var(--vp-c-brand-1); font-size: 13px; color: var(--vp-c-brand-1); font-weight: 500;
}

.traits { padding: 14px; border-radius: 6px; background: var(--vp-c-bg-soft); font-size: 13px; }
.traits strong { color: var(--vp-c-text-1); }
.traits ul { margin: 8px 0 0; padding-left: 18px; }
.traits li { margin: 4px 0; color: var(--vp-c-text-2); line-height: 1.5; }

table { width: 100%; border-collapse: collapse; font-size: 12px; margin-bottom: 16px; }
th, td { padding: 10px; text-align: left; border-bottom: 1px solid var(--vp-c-divider); color: var(--vp-c-text-2); }
th { background: var(--vp-c-bg-soft); font-weight: 600; color: var(--vp-c-text-1); }

.rec-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.rec-card { padding: 14px; border-radius: 6px; background: var(--vp-c-bg-soft); font-size: 12px; }
.rec-card strong { font-size: 13px; color: var(--vp-c-text-1); display: block; margin-bottom: 8px; }
.rec-card ul { margin: 0; padding-left: 16px; }
.rec-card li { margin: 4px 0; color: var(--vp-c-text-2); }
.rec-card.recommended { border: 2px solid var(--vp-c-green-1); background: var(--vp-c-green-soft); }

@media (max-width: 768px) {
  .rec-grid { grid-template-columns: 1fr; }
}
</style>
