<!--
  AgentLevelDemo.vue
  Agent 分级（L0-L5）交互：拖动等级，看到“能做什么/不能做什么/典型任务”。
-->
<template>
  <div class="levels">
    <div class="header">
      <div>
        <div class="title">Agent 能力分级（从聊天到协作）</div>
        <div class="subtitle">拖动看看：等级越高，越像“能独立干活的同事”。</div>
      </div>
      <div class="badge">当前：{{ current.name }}</div>
    </div>

    <div class="slider">
      <input type="range" min="0" max="5" step="1" v-model.number="level" />
      <div class="ticks">
        <span v-for="n in 6" :key="n">{{ n - 1 }}</span>
      </div>
    </div>

    <div class="grid">
      <div class="card">
        <div class="k">能做什么</div>
        <ul>
          <li v-for="x in current.can" :key="x">{{ x }}</li>
        </ul>
      </div>
      <div class="card">
        <div class="k">容易出的问题</div>
        <ul>
          <li v-for="x in current.risk" :key="x">{{ x }}</li>
        </ul>
      </div>
      <div class="card">
        <div class="k">典型任务</div>
        <div class="v">{{ current.example }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

const level = ref(2)

const levels = [
  {
    name: 'L0：纯对话',
    can: ['回答问题', '写文本/代码（但不执行）'],
    risk: ['只能“说”，不能“做”', '需要你手动分步骤'],
    example: '解释概念、写一段文案'
  },
  {
    name: 'L1：单工具',
    can: ['调用一个固定工具', '把结果解释给你'],
    risk: ['工具用错参数', '缺少复杂规划'],
    example: '只会查一次搜索/只会跑一次代码'
  },
  {
    name: 'L2：多工具',
    can: ['在多个工具间选择', '按需要组合调用'],
    risk: ['选择工具不稳', '权限与安全需要控制'],
    example: '搜索 + 打开网页 + 摘要'
  },
  {
    name: 'L3：多步骤执行',
    can: ['先计划后执行', '完成一串步骤', '记录中间结果'],
    risk: ['步骤漏/顺序错', '成本上升（更多调用）'],
    example: '读代码 → 改代码 → 跑测试 → 出报告'
  },
  {
    name: 'L4：自我纠错',
    can: ['失败后换策略', '用检查点避免跑偏'],
    risk: ['可能反复尝试（需要上限）', '更依赖监控与日志'],
    example: '测试失败后自动定位并尝试修复'
  },
  {
    name: 'L5：多 Agent 协作',
    can: ['多个角色分工', '并行处理任务', '合并结果'],
    risk: ['协作成本更高', '需要清晰协议与仲裁机制'],
    example: '研究员找资料 + 工程师实现 + 编辑写总结'
  }
]

const current = computed(() => levels[level.value])
</script>

<style scoped>
.levels {
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
  padding: 16px;
  margin: 20px 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.header {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
}
.title {
  font-weight: 800;
}
.subtitle {
  color: var(--vp-c-text-2);
  font-size: 13px;
}
.badge {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 999px;
  padding: 8px 12px;
  font-weight: 800;
}

.slider {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 10px 12px;
}
input[type='range'] {
  width: 100%;
}
.ticks {
  display: flex;
  justify-content: space-between;
  color: var(--vp-c-text-2);
  font-size: 12px;
  margin-top: 6px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 12px;
}
.card {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 12px;
}
.k {
  font-weight: 800;
  margin-bottom: 6px;
}
.v {
  color: var(--vp-c-text-2);
  line-height: 1.6;
}
ul {
  margin: 0;
  padding-left: 18px;
  color: var(--vp-c-text-2);
  line-height: 1.6;
}
</style>
