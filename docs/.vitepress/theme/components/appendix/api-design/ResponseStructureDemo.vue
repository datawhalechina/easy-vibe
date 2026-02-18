<!--
  ResponseStructureDemo.vue - HTTP 响应结构演示组件
  展示标准化 API 响应结构和分页响应
-->
<template>
  <div class="demo">
    <div class="header">
      <span class="icon">📦</span>
      <span class="title">HTTP 响应结构：标准化的数据契约</span>
    </div>

    <div class="content">
      <div class="response-tabs">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          class="tab-btn"
          :class="{ active: selectedTab === tab.id }"
          @click="selectedTab = tab.id"
        >
          {{ tab.name }}
        </button>
      </div>

      <div class="response-detail">
        <div class="response-header">
          <div class="status-line">
            <span class="http-version">HTTP/1.1</span>
            <span
              class="status-code"
              :class="getStatusClass(currentResponse.status)"
            >{{ currentResponse.status }}</span>
            <span class="status-text">{{ currentResponse.statusText }}</span>
          </div>
        </div>

        <div class="response-headers">
          <div class="header-item">
            <span class="header-key">Content-Type:</span>
            <span class="header-value">application/json</span>
          </div>
          <div class="header-item">
            <span class="header-key">X-Request-ID:</span>
            <span class="header-value">req-550e8400-e29b-41d4</span>
          </div>
          <div class="header-item">
            <span class="header-key">X-Response-Time:</span>
            <span class="header-value">45ms</span>
          </div>
        </div>

        <div class="response-body">
          <pre><code>{{ JSON.stringify(currentResponse.body, null, 2) }}</code></pre>
        </div>

        <div class="field-descriptions">
          <h4>字段说明</h4>
          <div class="field-list">
            <div
              v-for="field in currentResponse.fields"
              :key="field.name"
              class="field-item"
            >
              <div class="field-name">
                <code>{{ field.name }}</code>
                <span class="field-type">{{ field.type }}</span>
              </div>
              <div class="field-desc">
                {{ field.description }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const tabs = [
  { id: 'success', name: '成功响应' },
  { id: 'pagination', name: '分页响应' },
  { id: 'error', name: '错误响应' }
]

const responses = {
  success: {
    status: 200,
    statusText: 'OK',
    body: {
      code: 0,
      message: 'success',
      data: {
        id: 123,
        name: '张三',
        email: 'zhangsan@example.com',
        phone: '13800138000',
        created_at: '2024-01-15T10:30:00.000Z'
      },
      request_id: 'req-550e8400-e29b-41d4-a716-446655440000',
      timestamp: '2024-01-15T10:30:00.000Z'
    },
    fields: [
      { name: 'code', type: 'integer', description: '业务状态码，0 表示成功' },
      { name: 'message', type: 'string', description: '状态描述，成功时为 "success"' },
      { name: 'data', type: 'object', description: '业务数据，成功时返回具体数据' },
      { name: 'request_id', type: 'string', description: '请求唯一标识，用于问题追踪' },
      { name: 'timestamp', type: 'string', description: '响应时间戳，ISO 8601 格式' }
    ]
  },
  pagination: {
    status: 200,
    statusText: 'OK',
    body: {
      code: 0,
      message: 'success',
      data: {
        list: [
          { id: 1, name: '商品A', price: 100 },
          { id: 2, name: '商品B', price: 200 }
        ],
        pagination: {
          page: 1,
          page_size: 20,
          total: 156,
          total_pages: 8,
          has_next: true,
          has_prev: false
        }
      },
      request_id: 'req-550e8400-e29b-41d4-a716-446655440000',
      timestamp: '2024-01-15T10:30:00.000Z'
    },
    fields: [
      { name: 'list', type: 'array', description: '数据列表' },
      { name: 'pagination', type: 'object', description: '分页信息对象' },
      { name: 'page', type: 'integer', description: '当前页码' },
      { name: 'page_size', type: 'integer', description: '每页数量' },
      { name: 'total', type: 'integer', description: '总记录数' },
      { name: 'total_pages', type: 'integer', description: '总页数' },
      { name: 'has_next', type: 'boolean', description: '是否有下一页' },
      { name: 'has_prev', type: 'boolean', description: '是否有上一页' }
    ]
  },
  error: {
    status: 422,
    statusText: 'Unprocessable Entity',
    body: {
      code: 20003,
      message: '密码强度不足',
      errors: [
        {
          field: 'password',
          code: 'VALIDATION_ERROR',
          message: '密码必须包含至少 1 个大写字母、1 个小写字母、1 个数字，且长度至少 8 位'
        }
      ],
      request_id: 'req-550e8400-e29b-41d4-a716-446655440000',
      timestamp: '2024-01-15T10:30:00.000Z',
      help_url: 'https://docs.example.com/errors/20003'
    },
    fields: [
      { name: 'code', type: 'integer', description: '错误码，非 0 表示失败' },
      { name: 'message', type: 'string', description: '错误描述，供用户阅读' },
      { name: 'errors', type: 'array', description: '详细错误信息数组（可选）' },
      { name: 'help_url', type: 'string', description: '错误文档链接（可选）' }
    ]
  }
}

const selectedTab = ref('success')
const currentResponse = computed(() => responses[selectedTab.value])

function getStatusClass(status) {
  const prefix = Math.floor(status / 100)
  switch (prefix) {
    case 2: return 'success'
    case 3: return 'redirect'
    case 4: return 'client-error'
    case 5: return 'server-error'
    default: return ''
  }
}
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
  padding: 16px 20px;
  background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
  color: white;
  display: flex;
  align-items: center;
  gap: 12px;
}

.icon {
  font-size: 24px;
}

.title {
  font-weight: 600;
  font-size: 16px;
}

.content {
  padding: 24px;
}

.response-tabs {
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
}

.tab-btn {
  padding: 8px 16px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg);
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.tab-btn:hover {
  transform: translateY(-1px);
}

.tab-btn.active {
  background: var(--vp-c-brand);
  color: white;
  border-color: var(--vp-c-brand);
  transform: scale(1.05);
}

.response-detail {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  overflow: hidden;
}

.response-header {
  padding: 16px;
  background: var(--vp-c-bg-soft);
  border-bottom: 1px solid var(--vp-c-divider);
}

.status-line {
  display: flex;
  align-items: center;
  gap: 12px;
}

.http-version {
  font-family: monospace;
  font-size: 13px;
  color: var(--vp-c-text-2);
}

.status-code {
  padding: 4px 8px;
  border-radius: 4px;
  font-weight: 700;
  font-size: 13px;
  font-family: monospace;
}

.status-code.success {
  background: #dcfce7;
  color: #16a34a;
}

.status-code.client-error {
  background: #fef3c7;
  color: #d97706;
}

.status-text {
  font-size: 13px;
  color: var(--vp-c-text-2);
}

.response-headers {
  padding: 12px 16px;
  border-bottom: 1px solid var(--vp-c-divider);
}

.header-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 0;
  font-size: 12px;
}

.header-key {
  font-family: monospace;
  font-weight: 600;
  color: var(--vp-c-text-2);
  min-width: 120px;
}

.header-value {
  font-family: monospace;
  color: var(--vp-c-text-1);
}

.response-body {
  padding: 16px;
  border-bottom: 1px solid var(--vp-c-divider);
}

.response-body pre {
  margin: 0;
  background: var(--vp-c-bg-alt);
  padding: 16px;
  border-radius: 6px;
  font-size: 12px;
  line-height: 1.5;
  overflow-x: auto;
}

.response-body code {
  font-family: monospace;
  color: var(--vp-c-text-1);
}

.field-descriptions {
  padding: 16px;
}

.field-descriptions h4 {
  font-size: 14px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin: 0 0 12px 0;
}

.field-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.field-item {
  padding: 12px;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  border-left: 3px solid var(--vp-c-brand);
}

.field-name {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
}

.field-name code {
  font-family: monospace;
  font-size: 13px;
  color: var(--vp-c-brand);
  font-weight: 600;
}

.field-type {
  font-size: 11px;
  padding: 2px 6px;
  background: rgba(var(--vp-c-brand-rgb), 0.1);
  color: var(--vp-c-brand);
  border-radius: 4px;
  font-family: monospace;
}

.field-desc {
  font-size: 13px;
  color: var(--vp-c-text-2);
  line-height: 1.6;
}

@media (max-width: 640px) {
  .response-tabs {
    flex-direction: column;
  }

  .status-line {
    flex-wrap: wrap;
  }

  .header-item {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
