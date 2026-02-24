<template>
  <div class="doc-structure-demo">
    <div class="demo-label">文档结构模板 ── 点击切换文档类型</div>

    <div class="tabs">
      <button
        v-for="(doc, i) in docs"
        :key="i"
        class="tab"
        :class="{ active: current === i }"
        @click="current = i"
      >{{ doc.icon }} {{ doc.name }}</button>
    </div>

    <div class="structure-card">
      <div class="section-list">
        <div
          v-for="(sec, j) in docs[current].sections"
          :key="j"
          class="section-item"
          :class="{ active: selectedSec === j }"
          @click="selectedSec = selectedSec === j ? -1 : j"
        >
          <div class="sec-header">
            <span class="sec-num">{{ j + 1 }}</span>
            <span class="sec-name">{{ sec.name }}</span>
            <span class="sec-toggle">{{ selectedSec === j ? '▼' : '▶' }}</span>
          </div>
          <Transition name="fade">
            <div v-if="selectedSec === j" class="sec-detail">
              <p>{{ sec.desc }}</p>
              <pre v-if="sec.example"><code>{{ sec.example }}</code></pre>
            </div>
          </Transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
const current = ref(0)
const selectedSec = ref(-1)
watch(current, () => { selectedSec.value = -1 })

const docs = [
  {
    name: 'README',
    icon: '📖',
    sections: [
      { name: '项目名称 + 一句话描述', desc: '让读者在 3 秒内知道这个项目是什么。', example: '# MyApp\n> 一个轻量级的任务管理工具' },
      { name: '快速开始', desc: '最短路径让用户跑起来，通常是安装 + 运行命令。', example: 'npm install myapp\nnpx myapp init' },
      { name: '功能特性', desc: '用列表列出核心功能，让用户判断是否满足需求。', example: '- ✅ 任务看板\n- ✅ 团队协作\n- ✅ 数据导出' },
      { name: '使用示例', desc: '展示典型用法的代码片段，比文字描述更直观。', example: null },
      { name: '贡献指南 + 许可证', desc: '说明如何参与贡献，以及项目的开源许可证。', example: null }
    ]
  },
  {
    name: 'API 文档',
    icon: '🔌',
    sections: [
      { name: '接口概述', desc: '说明 API 的基础 URL、认证方式、通用参数。', example: 'Base URL: https://api.example.com/v1\nAuth: Bearer Token' },
      { name: '请求参数', desc: '用表格列出每个参数的名称、类型、是否必填、说明。', example: '| 参数   | 类型   | 必填 | 说明     |\n| name   | string | 是   | 用户名   |' },
      { name: '响应格式', desc: '展示成功和失败的 JSON 响应示例。', example: '{ "code": 200, "data": { ... } }' },
      { name: '错误码说明', desc: '列出所有可能的错误码及其含义。', example: '401 - 未授权\n404 - 资源不存在\n429 - 请求过于频繁' }
    ]
  },
  {
    name: '架构文档',
    icon: '🏛️',
    sections: [
      { name: '系统概述', desc: '用一段话说明系统的目标、边界和核心约束。', example: null },
      { name: '架构图', desc: '展示系统的整体架构，包括各模块和它们之间的关系。', example: '[客户端] → [API 网关] → [微服务集群]\n                    ↓\n              [数据库集群]' },
      { name: '技术选型', desc: '说明关键技术的选择理由和替代方案的对比。', example: null },
      { name: '部署架构', desc: '说明生产环境的部署方式、扩容策略。', example: null }
    ]
  }
]
</script>

<style scoped>
.doc-structure-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  padding: 1rem 1.2rem;
  margin: 1rem 0;
}
.demo-label { font-size: 0.78rem; font-weight: bold; color: var(--vp-c-text-2); margin-bottom: 1rem; text-align: center; }
.tabs { display: flex; gap: 6px; margin-bottom: 1rem; flex-wrap: wrap; }
.tab { padding: 6px 14px; border-radius: 6px; border: 1px solid var(--vp-c-divider); background: var(--vp-c-bg); cursor: pointer; font-size: 0.85rem; transition: all 0.2s; }
.tab.active { background: var(--vp-c-brand); color: #fff; border-color: var(--vp-c-brand); }

.section-list { display: flex; flex-direction: column; gap: 6px; }
.section-item { border: 1px solid var(--vp-c-divider); border-radius: 6px; background: var(--vp-c-bg); overflow: hidden; }
.sec-header { display: flex; align-items: center; gap: 8px; padding: 8px 12px; cursor: pointer; }
.sec-num { width: 22px; height: 22px; border-radius: 50%; background: var(--vp-c-brand); color: #fff; font-size: 0.72rem; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.sec-name { flex: 1; font-size: 0.88rem; font-weight: 600; }
.sec-toggle { font-size: 0.7rem; color: var(--vp-c-text-3); }
.section-item.active { border-color: var(--vp-c-brand); }

.sec-detail { padding: 0 12px 10px; }
.sec-detail p { font-size: 0.83rem; color: var(--vp-c-text-2); margin: 0 0 6px; }
.sec-detail pre { margin: 0; padding: 8px; background: var(--vp-c-bg-soft); border-radius: 4px; font-size: 0.78rem; line-height: 1.5; overflow-x: auto; }

.fade-enter-active, .fade-leave-active { transition: opacity 0.2s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
