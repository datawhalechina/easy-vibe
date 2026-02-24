<template>
  <div class="tech-writing-demo">
    <div class="demo-label">技术写作对比 ── 点击切换案例</div>

    <div class="tabs">
      <button
        v-for="(c, i) in cases"
        :key="i"
        class="tab"
        :class="{ active: current === i }"
        @click="current = i"
      >{{ c.icon }} {{ c.name }}</button>
    </div>

    <div class="compare">
      <div class="col bad">
        <div class="col-title">❌ 差的写法</div>
        <pre><code>{{ cases[current].bad }}</code></pre>
      </div>
      <div class="col good">
        <div class="col-title">✅ 好的写法</div>
        <pre><code>{{ cases[current].good }}</code></pre>
      </div>
    </div>

    <div class="tips">
      <strong>改进要点：</strong>
      <span v-for="(t, i) in cases[current].tips" :key="i" class="tip-tag">{{ t }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const current = ref(0)

const cases = [
  {
    name: '函数注释',
    icon: '💬',
    bad: `// 处理数据
function process(d) {
  // ...
}`,
    good: `/**
 * 将原始订单数据转换为发票格式
 * @param {Order} order - 原始订单对象
 * @returns {Invoice} 格式化后的发票
 * @throws {ValidationError} 订单数据不完整时
 */
function toInvoice(order) {
  // ...
}`,
    tips: ['说明"为什么"而非"是什么"', '标注参数类型和返回值', '说明异常情况']
  },
  {
    name: 'API 说明',
    icon: '🔌',
    bad: `POST /api/users
发送用户数据创建用户。`,
    good: `POST /api/users
创建新用户账号。

请求体：
{
  "name": "张三",      // 必填，2-50字符
  "email": "a@b.com"  // 必填，有效邮箱
}

成功响应 201：
{ "id": "u_123", "name": "张三" }

错误响应 400：
{ "error": "邮箱格式无效" }`,
    tips: ['提供完整的请求/响应示例', '标注必填/选填', '列出错误场景']
  },
  {
    name: '变更日志',
    icon: '📝',
    bad: `v2.1 - 修了一些bug，加了新功能`,
    good: `## v2.1.0 (2025-01-15)

### 新增
- 支持批量导出 PDF 格式报表

### 修复
- 修复登录页在 Safari 下白屏的问题 (#234)

### 变更
- 最低 Node.js 版本要求从 16 升至 18`,
    tips: ['按类型分类（新增/修复/变更）', '关联 Issue 编号', '标注版本号和日期']
  }
]
</script>

<style scoped>
.tech-writing-demo {
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

.compare { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 10px; }
@media (max-width: 640px) { .compare { grid-template-columns: 1fr; } }
.col { border-radius: 6px; overflow: hidden; }
.col-title { font-size: 0.72rem; padding: 4px 10px; border-bottom: 1px solid var(--vp-c-divider); }
.col.bad .col-title { background: #fef2f2; color: #991b1b; }
.col.good .col-title { background: #ecfdf5; color: #065f46; }
:root.dark .col.bad .col-title { background: #1c0606; color: #fca5a5; }
:root.dark .col.good .col-title { background: #031c14; color: #6ee7b7; }
.col pre { margin: 0; padding: 8px; font-size: 0.78rem; line-height: 1.5; overflow-x: auto; background: var(--vp-c-bg); }

.tips { font-size: 0.83rem; display: flex; align-items: center; gap: 6px; flex-wrap: wrap; }
.tip-tag { padding: 2px 8px; border-radius: 10px; background: var(--vp-c-brand-soft); font-size: 0.75rem; }
</style>
