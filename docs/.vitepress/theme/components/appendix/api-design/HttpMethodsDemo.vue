<!--
  HttpMethodsDemo.vue - HTTP 方法对比演示组件
  展示 GET/POST/PUT/PATCH/DELETE 的区别和使用场景
-->
<template>
  <div class="demo">
    <div class="header">
      <span class="icon">🎯</span>
      <span class="title">HTTP 方法：用正确的姿势操作资源</span>
    </div>

    <div class="content">
      <!-- HTTP 方法选择器 -->
      <div class="method-selector">
        <button
          v-for="method in methods"
          :key="method.name"
          class="method-btn"
          :class="[method.name, { active: selectedMethod === method.name }]"
          @click="selectedMethod = method.name"
        >
          {{ method.name }}
        </button>
      </div>

      <!-- 当前方法详情 -->
      <div class="method-detail" v-if="currentMethod">
        <div class="detail-header">
          <span class="http-badge" :class="currentMethod.name">{{ currentMethod.name }}</span>
          <span class="method-desc">{{ currentMethod.description }}</span>
        </div>

        <div class="properties">
          <div class="property" :class="{ yes: currentMethod.idempotent }">
            <span class="prop-icon">{{ currentMethod.idempotent ? '✅' : '❌' }}</span>
            <span class="prop-label">幂等性</span>
            <span class="prop-hint">{{ currentMethod.idempotent ? '多次执行结果相同' : '每次执行可能产生不同结果' }}</span>
          </div>
          <div class="property" :class="{ yes: currentMethod.safe }">
            <span class="prop-icon">{{ currentMethod.safe ? '✅' : '❌' }}</span>
            <span class="prop-label">安全性</span>
            <span class="prop-hint">{{ currentMethod.safe ? '不修改服务器状态' : '可能会修改服务器状态' }}</span>
          </div>
          <div class="property has-body">
            <span class="prop-icon">{{ currentMethod.hasBody ? '✅' : '❌' }}</span>
            <span class="prop-label">请求体</span>
            <span class="prop-hint">{{ currentMethod.hasBody ? '可以携带请求体数据' : '通常不携带请求体' }}</span>
          </div>
        </div>

        <div class="example-section">
          <div class="example-title">📝 使用示例</div>
          <div class="example-content">
            <div class="example-item" v-for="(example, idx) in currentMethod.examples" :key="idx">
              <div class="example-scenario">{{ example.scenario }}</div>
              <div class="example-request">
                <span class="http-method" :class="currentMethod.name">{{ currentMethod.name }}</span>
                <span class="request-url">{{ example.url }}</span>
              </div>
              <div class="example-body" v-if="example.body">
                <pre><code>{{ JSON.stringify(example.body, null, 2) }}</code></pre>
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

const methods = [
  {
    name: 'GET',
    description: '获取资源',
    idempotent: true,
    safe: true,
    hasBody: false,
    examples: [
      {
        scenario: '获取用户列表',
        url: '/api/v1/users?page=1&page_size=20'
      },
      {
        scenario: '获取单个用户详情',
        url: '/api/v1/users/123'
      }
    ]
  },
  {
    name: 'POST',
    description: '创建资源',
    idempotent: false,
    safe: false,
    hasBody: true,
    examples: [
      {
        scenario: '创建新用户',
        url: '/api/v1/users',
        body: {
          name: '张三',
          email: 'zhangsan@example.com',
          phone: '13800138000'
        }
      },
      {
        scenario: '提交订单',
        url: '/api/v1/orders',
        body: {
          user_id: 123,
          items: [
            { product_id: 'P001', quantity: 2 },
            { product_id: 'P002', quantity: 1 }
          ],
          shipping_address: {...}
        }
      }
    ]
  },
  {
    name: 'PUT',
    description: '全量更新资源',
    idempotent: true,
    safe: false,
    hasBody: true,
    examples: [
      {
        scenario: '更新用户全部信息（替换）',
        url: '/api/v1/users/123',
        body: {
          id: 123,
          name: '张三（已更新）',
          email: 'zhangsan_new@example.com',
          phone: '13900139000',
          avatar: 'https://...',
          status: 'active'
        }
      }
    ]
  },
  {
    name: 'PATCH',
    description: '部分更新资源',
    idempotent: false,
    safe: false,
    hasBody: true,
    examples: [
      {
        scenario: '仅修改用户邮箱',
        url: '/api/v1/users/123',
        body: {
          email: 'newemail@example.com'
        }
      },
      {
        scenario: '更新多个字段',
        url: '/api/v1/users/123',
        body: {
          phone: '13800138000',
          avatar: 'https://...'
        }
      }
    ]
  },
  {
    name: 'DELETE',
    description: '删除资源',
    idempotent: true,
    safe: false,
    hasBody: false,
    examples: [
      {
        scenario: '删除单个用户',
        url: '/api/v1/users/123'
      },
      {
        scenario: '批量删除（通过查询参数）',
        url: '/api/v1/users?ids=1,2,3,4,5'
      }
    ]
  }
]

const selectedMethod = ref('GET')
const currentMethod = computed(() =>
  methods.find(m => m.name === selectedMethod.value)
)
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
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
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

.method-selector {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 24px;
  padding-bottom: 20px;
  border-bottom: 1px solid var(--vp-c-divider);
}

.method-btn {
  padding: 8px 16px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg);
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.method-btn:hover {
  transform: translateY(-1px);
}

.method-btn.active {
  transform: scale(1.05);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

/* HTTP 方法颜色 */
.method-btn.GET, .http-method.GET { border-color: #22c55e; color: #16a34a; }
.method-btn.GET.active, .http-badge.GET { background: #22c55e; color: white; }

.method-btn.POST, .http-method.POST { border-color: #3b82f6; color: #2563eb; }
.method-btn.POST.active, .http-badge.POST { background: #3b82f6; color: white; }

.method-btn.PUT, .http-method.PUT { border-color: #f59e0b; color: #d97706; }
.method-btn.PUT.active, .http-badge.PUT { background: #f59e0b; color: white; }

.method-btn.PATCH, .http-method.PATCH { border-color: #8b5cf6; color: #7c3aed; }
.method-btn.PATCH.active, .http-badge.PATCH { background: #8b5cf6; color: white; }

.method-btn.DELETE, .http-method.DELETE { border-color: #ef4444; color: #dc2626; }
.method-btn.DELETE.active, .http-badge.DELETE { background: #ef4444; color: white; }

.method-detail {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 20px;
}

.detail-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--vp-c-divider);
}

.http-badge {
  padding: 6px 12px;
  border-radius: 6px;
  font-weight: 700;
  font-size: 14px;
}

.method-desc {
  font-size: 15px;
  color: var(--vp-c-text-2);
}

.properties {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin-bottom: 20px;
}

.property {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12px;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
  opacity: 0.6;
  transition: all 0.2s ease;
}

.property.yes {
  opacity: 1;
  border-color: #22c55e;
  background: #f0fdf4;
}

.property.has-body {
  opacity: 1;
}

.property.has-body:not(.yes) {
  border-color: #f59e0b;
  background: #fffbeb;
}

.prop-icon {
  font-size: 20px;
  margin-bottom: 4px;
}

.prop-label {
  font-weight: 600;
  font-size: 13px;
  color: var(--vp-c-text-1);
  margin-bottom: 2px;
}

.prop-hint {
  font-size: 11px;
  color: var(--vp-c-text-3);
  text-align: center;
}

.example-section {
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid var(--vp-c-divider);
}

.example-title {
  font-weight: 600;
  font-size: 14px;
  color: var(--vp-c-text-1);
  margin-bottom: 12px;
}

.example-item {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 12px;
}

.example-item:last-child {
  margin-bottom: 0;
}

.example-scenario {
  font-size: 12px;
  color: var(--vp-c-text-3);
  margin-bottom: 8px;
}

.example-request {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 8px;
}

.http-method {
  padding: 4px 8px;
  border-radius: 4px;
  font-weight: 700;
  font-size: 11px;
  background: var(--vp-c-bg);
}

.request-url {
  font-family: monospace;
  font-size: 13px;
  color: var(--vp-c-text-1);
}

.example-body {
  background: var(--vp-c-bg);
  border-radius: 4px;
  padding: 8px;
}

.example-body pre {
  margin: 0;
  font-size: 11px;
  line-height: 1.4;
  overflow-x: auto;
}

.example-body code {
  font-family: monospace;
  color: var(--vp-c-text-1);
}

@media (max-width: 640px) {
  .properties {
    grid-template-columns: 1fr;
  }

  .detail-header {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
