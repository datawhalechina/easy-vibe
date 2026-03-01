<template>
  <div class="layered-arch-demo">
    <div class="header">
      <div class="title">后端四层架构总览</div>
      <div class="subtitle">点击各层查看详细说明</div>
    </div>

    <div class="main">
      <div class="layers">
        <div class="client-box">客户端 (Web / App)</div>
        <div class="arrow">↓ HTTP</div>

        <div
          v-for="layer in layers"
          :key="layer.id"
          :class="['layer-box', layer.id, { active: active === layer.id }]"
          @click="active = active === layer.id ? '' : layer.id"
        >
          <div class="layer-header">
            <span class="layer-name">{{ layer.name }}</span>
            <span class="layer-badge">{{ layer.badge }}</span>
          </div>
          <div class="layer-duty">{{ layer.duty }}</div>
        </div>

        <div class="arrow">↓ SQL</div>
        <div class="client-box db">数据库 (MySQL / PostgreSQL)</div>
      </div>

      <div v-if="active" class="info-panel">
        <div class="info-title">{{ activeInfo.title }}</div>
        <p>{{ activeInfo.desc }}</p>
        <div class="info-analogy">{{ activeInfo.analogy }}</div>
        <div class="info-mistakes">
          <strong>常见错误：</strong>
          <ul>
            <li v-for="m in activeInfo.mistakes" :key="m">{{ m }}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const active = ref('')

const layers = [
  { id: 'controller', name: 'Controller', badge: '入口', duty: '接收请求、参数校验、调用 Service' },
  { id: 'service', name: 'Service', badge: '业务核心', duty: '业务逻辑编排、事务管理、跨模块协调' },
  { id: 'repository', name: 'Repository', badge: '数据访问', duty: '数据持久化、查询封装、ORM 映射' },
  { id: 'domain', name: 'Domain', badge: '领域模型', duty: '实体定义、业务规则、值对象' }
]

const infoMap = {
  controller: {
    title: 'Controller 层 — 请求的"门童"',
    desc: '负责接收 HTTP 请求、解析参数、进行基础校验，然后调用 Service 层处理业务。',
    analogy: '就像餐厅的门童，负责迎接客人、检查预约、引导入座，但不负责做菜。',
    mistakes: ['在 Controller 里写业务逻辑', '直接操作数据库', '不做参数校验']
  },
  service: {
    title: 'Service 层 — 业务逻辑的"厨师"',
    desc: '编排业务逻辑、管理事务、协调多个 Repository。包含所有的业务规则和流程。',
    analogy: '就像餐厅的厨师，按照菜谱做菜，协调各种食材，把控菜品质量。',
    mistakes: ['Service 之间循环依赖', '直接写 SQL', '单个方法过长包含多个业务场景']
  },
  repository: {
    title: 'Repository 层 — 数据的"仓管"',
    desc: '封装所有数据访问逻辑，上层不需要关心具体的数据库类型和 SQL 语句。',
    analogy: '就像仓管员，负责从仓库取食材、存放剩余食材，厨师只需说要什么。',
    mistakes: ['在 Repository 里写业务逻辑', '直接返回实体给前端', '一个 Repository 操作多个表']
  },
  domain: {
    title: 'Domain 层 — 业务概念的"蓝图"',
    desc: '定义实体、值对象、业务规则。是所有层的依赖基础，但不依赖任何其他层。',
    analogy: '就像菜单和菜品标准，定义了什么是"宫保鸡丁"、用什么食材、什么口味。',
    mistakes: ['Domain 包含持久化注解', '在 Domain 里写数据库操作', 'Domain 对象之间循环依赖']
  }
}

const activeInfo = computed(() => infoMap[active.value] || {})
</script>

<style scoped>
.layered-arch-demo {
  padding: 20px;
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
}
.header { text-align: center; margin-bottom: 20px; }
.title { font-size: 16px; font-weight: 600; color: var(--vp-c-text-1); }
.subtitle { font-size: 13px; color: var(--vp-c-text-3); margin-top: 4px; }

.main { display: flex; gap: 20px; align-items: flex-start; }
.layers { flex: 1; display: flex; flex-direction: column; gap: 6px; }

.client-box {
  padding: 12px; text-align: center; border-radius: 8px;
  background: var(--vp-c-bg); color: var(--vp-c-text-2);
  font-size: 13px; border: 1px solid var(--vp-c-divider);
}
.client-box.db { border-left: 3px solid #8b5cf6; }
.arrow { text-align: center; color: var(--vp-c-text-3); font-size: 12px; padding: 2px; }

.layer-box {
  padding: 14px; border-radius: 8px; cursor: pointer;
  background: var(--vp-c-bg); border: 1px solid var(--vp-c-divider);
  border-left: 3px solid var(--vp-c-divider);
  transition: all .2s;
}
.layer-box:hover { box-shadow: 0 2px 8px rgba(0,0,0,.06); }
.layer-box.active { border-color: var(--vp-c-brand-1); box-shadow: 0 0 0 2px var(--vp-c-brand-soft); }
.layer-box.controller { border-left-color: #10b981; }
.layer-box.service { border-left-color: #f59e0b; }
.layer-box.repository { border-left-color: #3b82f6; }
.layer-box.domain { border-left-color: #6b7280; }

.layer-header { display: flex; align-items: center; gap: 8px; margin-bottom: 4px; }
.layer-name { font-weight: 600; font-size: 14px; color: var(--vp-c-text-1); }
.layer-badge {
  padding: 1px 8px; border-radius: 10px; font-size: 11px;
  background: var(--vp-c-bg-soft); color: var(--vp-c-text-3);
}
.layer-duty { font-size: 12px; color: var(--vp-c-text-2); }

.info-panel {
  width: 300px; padding: 18px; border-radius: 10px;
  background: var(--vp-c-bg); border: 1px solid var(--vp-c-divider);
  position: sticky; top: 20px;
}
.info-title { font-weight: 600; font-size: 14px; color: var(--vp-c-text-1); margin-bottom: 10px; padding-bottom: 8px; border-bottom: 2px solid var(--vp-c-brand-1); }
.info-panel p { font-size: 13px; color: var(--vp-c-text-2); line-height: 1.6; margin: 0 0 12px; }
.info-analogy {
  padding: 10px; border-radius: 6px; font-size: 12px; line-height: 1.5;
  background: var(--vp-c-brand-soft); color: var(--vp-c-text-1);
  border-left: 3px solid var(--vp-c-brand-1); margin-bottom: 12px;
}
.info-mistakes {
  padding: 10px; border-radius: 6px; font-size: 12px; line-height: 1.5;
  background: var(--vp-c-danger-soft); color: var(--vp-c-text-1);
  border-left: 3px solid var(--vp-c-danger-1);
}
.info-mistakes strong { font-size: 12px; }
.info-mistakes ul { margin: 6px 0 0; padding-left: 16px; }
.info-mistakes li { margin: 3px 0; }

@media (max-width: 768px) {
  .main { flex-direction: column; }
  .info-panel { width: 100%; position: static; }
}
</style>
