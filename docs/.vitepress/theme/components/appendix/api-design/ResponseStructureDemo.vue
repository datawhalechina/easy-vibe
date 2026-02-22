<template>
  <div class="demo">
    <div class="header">
      <span class="icon">📋</span>
      <span class="title">API 响应结构设计</span>
    </div>

    <div class="tabs">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        :class="['tab', { active: active === tab.id }]"
        @click="active = tab.id"
      >
        {{ tab.icon }} {{ tab.name }}
      </button>
    </div>

    <div class="content">
      <div v-if="active === 'why'" class="section">
        <h4>为什么要统一响应格式？</h4>
        <div class="problem-box">
          <div class="problem-title">❌ 问题：不同接口返回格式不一致</div>
          <pre class="code-sm">
// 接口 A
{ "data": { "user": {...} } }

// 接口 B
{ "result": { "user": {...} } }

// 接口 C
{ "user": {...} }</pre>
          <div class="problem-desc">
            前端需要针对每个接口单独处理，代码冗余，容易出错
          </div>
        </div>
        <div class="solution-box">
          <div class="solution-title">✅ 解决：统一响应格式</div>
          <pre class="code-sm">
{
  "code": 0,
  "message": "success",
  "data": { ... },
  "request_id": "req-xxx"
}</pre>
        </div>
      </div>

      <div v-if="active === 'fields'" class="section">
        <h4>响应字段说明</h4>
        <div class="field-list">
          <div v-for="field in fields" :key="field.name" class="field-item">
            <div class="field-header">
              <code class="field-name">{{ field.name }}</code>
              <span class="field-type">{{ field.type }}</span>
              <span v-if="field.required" class="field-required">必填</span>
            </div>
            <div class="field-desc">{{ field.desc }}</div>
          </div>
        </div>
      </div>

      <div v-if="active === 'codes'" class="section">
        <h4>业务状态码设计</h4>
        <div class="code-ranges">
          <div class="range-item">
            <span class="range-num">0</span>
            <span class="range-label">成功</span>
          </div>
          <div class="range-item">
            <span class="range-num">1xxxx</span>
            <span class="range-label">客户端错误</span>
          </div>
          <div class="range-item">
            <span class="range-num">2xxxx</span>
            <span class="range-label">业务错误</span>
          </div>
          <div class="range-item">
            <span class="range-num">3xxxx</span>
            <span class="range-label">认证/权限错误</span>
          </div>
          <div class="range-item">
            <span class="range-num">5xxxx</span>
            <span class="range-label">系统错误</span>
          </div>
        </div>
        <div class="code-examples">
          <div v-for="code in codeExamples" :key="code.code" class="code-row">
            <code class="code-value">{{ code.code }}</code>
            <span class="code-msg">{{ code.message }}</span>
          </div>
        </div>
      </div>

      <div v-if="active === 'examples'" class="section">
        <h4>不同场景响应示例</h4>
        <div class="example-tabs">
          <button
            v-for="ex in examples"
            :key="ex.id"
            :class="['ex-tab', { active: exId === ex.id }]"
            @click="exId = ex.id"
          >
            {{ ex.name }}
          </button>
        </div>
        <div class="example-content">
          <pre class="code-block"><code>{{ currentExample.code }}</code></pre>
          <div class="example-note">{{ currentExample.note }}</div>
        </div>
      </div>

      <div v-if="active === 'pagination'" class="section">
        <h4>分页参数设计</h4>
        <div class="pg-row">
          <div class="pg-col">
            <div class="pg-title">请求参数</div>
            <div class="pg-params">
              <div class="pg-item">
                <code>page</code>
                <span>页码，从 1 开始</span>
              </div>
              <div class="pg-item">
                <code>page_size</code>
                <span>每页数量，默认 20</span>
              </div>
              <div class="pg-item">
                <code>sort</code>
                <span>排序，如 created_desc</span>
              </div>
            </div>
          </div>
          <div class="pg-col">
            <div class="pg-title">响应格式</div>
            <pre class="code-sm">
"pagination": {
  "page": 1,
  "page_size": 20,
  "total": 156,
  "total_pages": 8,
  "has_next": true
}</pre>
          </div>
        </div>
      </div>
    </div>

    <div class="tips">
      <span class="tips-icon">💡</span>
      <span class="tips-text">request_id 用于问题追踪，建议使用 UUID v4 或雪花算法生成</span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const active = ref('why')
const exId = ref('success')

const tabs = [
  { id: 'why', icon: '❓', name: '为什么统一' },
  { id: 'fields', icon: '📝', name: '字段说明' },
  { id: 'codes', icon: '🔢', name: '状态码' },
  { id: 'examples', icon: '📄', name: '示例' },
  { id: 'pagination', icon: '📑', name: '分页' }
]

const fields = [
  {
    name: 'code',
    type: 'number',
    required: true,
    desc: '业务状态码，0 表示成功'
  },
  { name: 'message', type: 'string', required: true, desc: '状态描述信息' },
  {
    name: 'data',
    type: 'any',
    required: false,
    desc: '业务数据，失败时可为 null'
  },
  {
    name: 'request_id',
    type: 'string',
    required: true,
    desc: '请求唯一标识，用于追踪'
  },
  {
    name: 'timestamp',
    type: 'string',
    required: false,
    desc: '响应时间戳，ISO 8601 格式'
  }
]

const codeExamples = [
  { code: 0, message: 'success - 成功' },
  { code: 10001, message: '参数错误：缺少必填字段' },
  { code: 10002, message: '资源不存在' },
  { code: 20001, message: '余额不足' },
  { code: 30001, message: '未登录' },
  { code: 50001, message: '系统繁忙，请稍后重试' }
]

const examples = [
  {
    id: 'success',
    name: '成功-单对象',
    code: `{
  "code": 0,
  "message": "success",
  "data": {
    "id": 123,
    "name": "张三",
    "email": "zhangsan@example.com"
  },
  "request_id": "req-abc123"
}`,
    note: '成功响应：data 包含具体业务数据'
  },
  {
    id: 'list',
    name: '成功-列表',
    code: `{
  "code": 0,
  "message": "success",
  "data": {
    "items": [
      { "id": 1, "name": "商品A" },
      { "id": 2, "name": "商品B" }
    ],
    "pagination": {
      "page": 1,
      "page_size": 20,
      "total": 156
    }
  },
  "request_id": "req-def456"
}`,
    note: '列表响应：items 数组 + pagination 分页信息'
  },
  {
    id: 'error',
    name: '业务错误',
    code: `{
  "code": 20001,
  "message": "余额不足，当前余额 50.00 元",
  "data": null,
  "request_id": "req-ghi789"
}`,
    note: '业务错误：code 非 0，message 说明原因'
  },
  {
    id: 'validate',
    name: '参数校验',
    code: `{
  "code": 10001,
  "message": "参数校验失败",
  "data": {
    "errors": [
      { "field": "email", "message": "邮箱格式不正确" },
      { "field": "password", "message": "密码长度至少 8 位" }
    ]
  },
  "request_id": "req-jkl012"
}`,
    note: '参数错误：data.errors 列出所有错误字段'
  }
]

const currentExample = computed(() => {
  return examples.find((e) => e.id === exId.value) || examples[0]
})
</script>

<style scoped>
.demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
  margin: 24px 0;
  overflow: hidden;
}

.header {
  padding: 14px 20px;
  background: var(--vp-c-bg);
  border-bottom: 1px solid var(--vp-c-divider);
  display: flex;
  align-items: center;
  gap: 10px;
}

.icon {
  font-size: 20px;
}

.title {
  font-weight: 600;
  font-size: 15px;
}

.tabs {
  display: flex;
  gap: 4px;
  padding: 10px 12px;
  background: var(--vp-c-bg);
  border-bottom: 1px solid var(--vp-c-divider);
  overflow-x: auto;
}

.tab {
  padding: 6px 12px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg-soft);
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s;
}

.tab:hover {
  border-color: var(--vp-c-brand);
}

.tab.active {
  background: var(--vp-c-brand);
  border-color: var(--vp-c-brand);
  color: white;
}

.content {
  padding: 16px;
}

.section h4 {
  margin: 0 0 12px 0;
  font-size: 14px;
}

.problem-box,
.solution-box {
  margin-bottom: 12px;
  padding: 12px;
  border-radius: 8px;
}

.problem-box {
  background: color-mix(in srgb, #ef4444 8%, var(--vp-c-bg));
  border: 1px solid color-mix(in srgb, #ef4444 20%, transparent);
}

.solution-box {
  background: color-mix(in srgb, #22c55e 8%, var(--vp-c-bg));
  border: 1px solid color-mix(in srgb, #22c55e 20%, transparent);
}

.problem-title,
.solution-title {
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 8px;
}

.problem-desc {
  font-size: 12px;
  color: var(--vp-c-text-3);
  margin-top: 8px;
}

.code-sm {
  background: #1e293b;
  color: #e2e8f0;
  padding: 10px;
  border-radius: 6px;
  font-family: 'Menlo', monospace;
  font-size: 11px;
  line-height: 1.5;
  overflow-x: auto;
  margin: 0;
}

.field-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.field-item {
  padding: 10px 12px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
}

.field-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
}

.field-name {
  font-size: 13px;
  font-weight: 600;
  color: var(--vp-c-brand);
}

.field-type {
  font-size: 11px;
  color: var(--vp-c-text-3);
  background: var(--vp-c-bg-soft);
  padding: 2px 6px;
  border-radius: 4px;
}

.field-required {
  font-size: 10px;
  color: #f59e0b;
  background: color-mix(in srgb, #f59e0b 15%, transparent);
  padding: 1px 5px;
  border-radius: 3px;
}

.field-desc {
  font-size: 12px;
  color: var(--vp-c-text-2);
}

.code-ranges {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 14px;
}

.range-item {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 10px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
}

.range-num {
  font-family: monospace;
  font-size: 12px;
  font-weight: 600;
  color: var(--vp-c-brand);
}

.range-label {
  font-size: 11px;
  color: var(--vp-c-text-2);
}

.code-examples {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.code-row {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 10px;
  background: var(--vp-c-bg);
  border-radius: 4px;
}

.code-value {
  font-family: monospace;
  font-size: 12px;
  font-weight: 600;
  color: var(--vp-c-brand);
  min-width: 50px;
}

.code-msg {
  font-size: 12px;
  color: var(--vp-c-text-2);
}

.example-tabs {
  display: flex;
  gap: 4px;
  margin-bottom: 10px;
  flex-wrap: wrap;
}

.ex-tab {
  padding: 5px 10px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  background: var(--vp-c-bg);
  font-size: 11px;
  cursor: pointer;
  transition: all 0.2s;
}

.ex-tab:hover {
  border-color: var(--vp-c-brand);
}

.ex-tab.active {
  background: var(--vp-c-brand);
  border-color: var(--vp-c-brand);
  color: white;
}

.code-block {
  background: #1e293b;
  color: #e2e8f0;
  padding: 12px;
  border-radius: 6px;
  font-family: 'Menlo', monospace;
  font-size: 11px;
  line-height: 1.5;
  overflow-x: auto;
  margin: 0;
}

.example-note {
  font-size: 11px;
  color: var(--vp-c-text-3);
  margin-top: 8px;
  padding-left: 4px;
}

.pg-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

@media (max-width: 640px) {
  .pg-row {
    grid-template-columns: 1fr;
  }
}

.pg-col {
  padding: 12px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
}

.pg-title {
  font-size: 12px;
  font-weight: 600;
  margin-bottom: 10px;
}

.pg-params {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.pg-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 11px;
}

.pg-item code {
  background: var(--vp-c-bg-soft);
  padding: 2px 6px;
  border-radius: 3px;
  font-size: 11px;
  color: var(--vp-c-brand);
}

.pg-item span {
  color: var(--vp-c-text-2);
}

.tips {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  background: var(--vp-c-bg);
  border-top: 1px solid var(--vp-c-divider);
}

.tips-icon {
  font-size: 14px;
}

.tips-text {
  font-size: 12px;
  color: var(--vp-c-text-2);
}
</style>
