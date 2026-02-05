<!--
  StatusCodeDemo.vue - HTTP 状态码演示组件
  展示常见 HTTP 状态码的含义和使用场景
-->
<template>
  <div class="demo">
    <div class="header">
      <span class="icon">📡</span>
      <span class="title">HTTP 状态码：服务器的"情绪表达"</span>
    </div>

    <div class="content">
      <div class="category-tabs">
        <button
          v-for="category in categories"
          :key="category.code"
          class="category-btn"
          :class="[category.class, { active: selectedCategory === category.code }]"
          @click="selectedCategory = category.code"
        >
          <span class="category-code">{{ category.code }}xx</span>
          <span class="category-name">{{ category.name }}</span>
        </button>
      </div>

      <div class="status-codes" v-if="filteredCodes.length > 0">
        <div
          v-for="code in filteredCodes"
          :key="code.number"
          class="status-card"
          :class="{ expanded: expandedCode === code.number }"
          @click="toggleExpand(code.number)"
        >
          <div class="status-header">
            <span class="status-number" :class="getCategoryClass(code.number)">{{ code.number }}</span>
            <span class="status-name">{{ code.name }}</span>
            <span class="expand-icon">{{ expandedCode === code.number ? '▼' : '▶' }}</span>
          </div>

          <div class="status-detail" v-show="expandedCode === code.number">
            <div class="detail-section">
              <h4>💡 含义解释</h4>
              <p>{{ code.description }}</p>
            </div>

            <div class="detail-section">
              <h4>📝 使用场景</h4>
              <ul>
                <li v-for="(scenario, idx) in code.scenarios" :key="idx">{{ scenario }}</li>
              </ul>
            </div>

            <div class="detail-section" v-if="code.example">
              <h4>💻 示例代码</h4>
              <div class="code-example">
                <div class="code-request">
                  <span class="method-badge" :class="getCategoryClass(code.number)">{{ code.example.method }}</span>
                  <code>{{ code.example.path }}</code>
                </div>
                <div class="code-response">
                  <pre><code>{{ JSON.stringify(code.example.response, null, 2) }}</code></pre>
                </div>
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

const categories = [
  { code: '2', name: '成功', class: 'success' },
  { code: '3', name: '重定向', class: 'redirect' },
  { code: '4', name: '客户端错误', class: 'client-error' },
  { code: '5', name: '服务器错误', class: 'server-error' }
]

const statusCodes = [
  {
    number: 200,
    name: 'OK',
    description: '请求已成功处理。这是最常用的成功状态码。',
    scenarios: [
      'GET 请求成功返回数据',
      'POST 请求成功处理但未创建新资源',
      'PUT/PATCH 更新成功'
    ],
    example: {
      method: 'GET',
      path: '/api/v1/users/123',
      response: {
        code: 0,
        data: {
          id: 123,
          name: '张三',
          email: 'zhangsan@example.com'
        }
      }
    }
  },
  {
    number: 201,
    name: 'Created',
    description: '请求成功处理并创建了新的资源。通常用于 POST 请求。',
    scenarios: [
      '成功创建用户账号',
      '成功创建订单',
      '成功上传文件'
    ],
    example: {
      method: 'POST',
      path: '/api/v1/users',
      response: {
        code: 0,
        data: {
          id: 124,
          name: '李四',
          created_at: '2024-01-15T10:30:00Z'
        }
      }
    }
  },
  {
    number: 204,
    name: 'No Content',
    description: '请求成功处理，但响应中没有返回内容。',
    scenarios: [
      'DELETE 删除成功',
      'PUT/PATCH 更新成功但无需返回数据',
      '预检请求（OPTIONS）响应'
    ],
    example: {
      method: 'DELETE',
      path: '/api/v1/users/123',
      response: null
    }
  },
  {
    number: 301,
    name: 'Moved Permanently',
    description: '请求的资源已永久移动到新的 URL。',
    scenarios: [
      'API 版本升级，旧版本废弃',
      '网站重构，URL 结构变更',
      '资源合并或重命名'
    ]
  },
  {
    number: 304,
    name: 'Not Modified',
    description: '资源自上次请求以来未被修改，客户端可使用缓存版本。',
    scenarios: [
      '客户端带有 If-None-Match 或 If-Modified-Since 头部',
      '静态资源缓存优化',
      '减少不必要的数据传输'
    ]
  },
  {
    number: 400,
    name: 'Bad Request',
    description: '请求语法错误或参数无效，服务器无法理解请求。',
    scenarios: [
      '请求体格式不正确（如 JSON 语法错误）',
      '缺少必填参数',
      '参数类型不匹配（字符串传数字）'
    ],
    example: {
      method: 'POST',
      path: '/api/v1/users',
      response: {
        code: 10001,
        message: '参数校验失败',
        errors: [
          { field: 'email', message: '邮箱格式不正确' }
        ]
      }
    }
  },
  {
    number: 401,
    name: 'Unauthorized',
    description: '请求需要用户身份验证，但未提供或凭证无效。',
    scenarios: [
      '未登录就访问受保护资源',
      'Token 过期或无效',
      '缺少 Authorization 头部'
    ],
    example: {
      method: 'GET',
      path: '/api/v1/user/profile',
      response: {
        code: 10018,
        message: '认证令牌已过期，请重新登录'
      }
    }
  },
  {
    number: 403,
    name: 'Forbidden',
    description: '服务器理解请求，但拒绝执行（权限不足）。',
    scenarios: [
      '已登录但访问了没有权限的资源',
      '普通用户尝试访问管理员功能',
      '账号被禁用或权限被撤销'
    ],
    example: {
      method: 'DELETE',
      path: '/api/v1/users/456',
      response: {
        code: 10021,
        message: '权限不足，需要管理员权限才能删除用户'
      }
    }
  },
  {
    number: 404,
    name: 'Not Found',
    description: '服务器找不到请求的资源。',
    scenarios: [
      'URL 拼写错误',
      '资源已被删除或不存在',
      'API 版本已废弃'
    ],
    example: {
      method: 'GET',
      path: '/api/v1/users/99999',
      response: {
        code: 10002,
        message: '用户不存在'
      }
    }
  },
  {
    number: 409,
    name: 'Conflict',
    description: '请求与服务器当前状态冲突（如资源重复）。',
    scenarios: [
      '尝试创建已存在的用户（唯一约束冲突）',
      '乐观锁版本号不匹配',
      '并发修改导致的状态冲突'
    ],
    example: {
      method: 'POST',
      path: '/api/v1/users',
      response: {
        code: 10011,
        message: '邮箱已被注册'
      }
    }
  },
  {
    number: 422,
    name: 'Unprocessable Entity',
    description: '请求格式正确，但语义上有错误（验证失败）。',
    scenarios: [
      '请求体 JSON 格式正确，但字段值不符合业务规则',
      '密码强度不足',
      '余额不足无法完成支付'
    ],
    example: {
      method: 'POST',
      path: '/api/v1/orders',
      response: {
        code: 10014,
        message: '订单金额不能为负数'
      }
    }
  },
  {
    number: 429,
    name: 'Too Many Requests',
    description: '客户端发送请求过多，触发了限流。',
    scenarios: [
      '短时间内大量请求',
      '超出 API 配额限制',
      '触发防刷机制'
    ],
    example: {
      method: 'GET',
      path: '/api/v1/data',
      response: {
        code: 10005,
        message: '请求过于频繁，请 60 秒后重试'
      }
    }
  },
  {
    number: 500,
    name: 'Internal Server Error',
    description: '服务器内部错误，无法完成请求。',
    scenarios: [
      '代码抛出未捕获的异常',
      '数据库连接失败',
      '依赖服务不可用'
    ],
    example: {
      method: 'GET',
      path: '/api/v1/users',
      response: {
        code: 10000,
        message: '服务器内部错误，请联系管理员'
      }
    }
  },
  {
    number: 502,
    name: 'Bad Gateway',
    description: '网关或代理从上游服务器收到无效响应。',
    scenarios: [
      '反向代理（Nginx）无法连接到后端服务',
      '后端服务崩溃或重启中',
      '网关配置错误'
    ]
  },
  {
    number: 503,
    name: 'Service Unavailable',
    description: '服务器暂时无法处理请求（维护或过载）。',
    scenarios: [
      '服务器正在进行维护',
      '服务器过载，触发熔断',
      '依赖服务大面积故障'
    ],
    example: {
      method: 'GET',
      path: '/api/v1/status',
      response: {
        code: 10007,
        message: '服务维护中，预计 10 分钟后恢复'
      }
    }
  },
  {
    number: 504,
    name: 'Gateway Timeout',
    description: '网关或代理等待上游服务器响应超时。',
    scenarios: [
      '后端处理时间过长',
      '网络延迟或丢包',
      '数据库查询超时'
    ]
  }
]

const selectedCategory = ref('2')
const expandedCode = ref(null)

const filteredCodes = computed(() => {
  const prefix = selectedCategory.value
  return statusCodes.filter(code => {
    const codePrefix = Math.floor(code.number / 100).toString()
    return codePrefix === prefix
  })
})

function getCategoryClass(number) {
  const prefix = Math.floor(number / 100)
  switch (prefix) {
    case 2: return 'success'
    case 3: return 'redirect'
    case 4: return 'client-error'
    case 5: return 'server-error'
    default: return ''
  }
}

function toggleExpand(number) {
  expandedCode.value = expandedCode.value === number ? null : number
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
  background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
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

.category-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 20px;
}

.category-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12px 20px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg);
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 100px;
}

.category-btn:hover {
  transform: translateY(-2px);
}

.category-btn.active {
  transform: scale(1.02);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

/* 分类颜色 */
.category-btn.success, .status-number.success { border-color: #22c55e; color: #16a34a; }
.category-btn.success.active { background: #22c55e; color: white; }

.category-btn.redirect, .status-number.redirect { border-color: #3b82f6; color: #2563eb; }
.category-btn.redirect.active { background: #3b82f6; color: white; }

.category-btn.client-error, .status-number.client-error { border-color: #f59e0b; color: #d97706; }
.category-btn.client-error.active { background: #f59e0b; color: white; }

.category-btn.server-error, .status-number.server-error { border-color: #ef4444; color: #dc2626; }
.category-btn.server-error.active { background: #ef4444; color: white; }

.category-code {
  font-size: 18px;
  font-weight: 700;
}

.category-name {
  font-size: 12px;
  margin-top: 4px;
}

.status-codes {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.status-card {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.2s ease;
}

.status-card:hover {
  border-color: rgba(var(--vp-c-brand-rgb), 0.5);
}

.status-card.expanded {
  border-color: rgba(var(--vp-c-brand-rgb), 0.8);
  box-shadow: 0 0 0 3px rgba(var(--vp-c-brand-rgb), 0.1);
}

.status-header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
}

.status-number {
  padding: 6px 12px;
  border-radius: 6px;
  font-weight: 700;
  font-size: 14px;
  background: var(--vp-c-bg-soft);
  border: 1px solid;
}

.status-name {
  flex: 1;
  font-weight: 600;
  font-size: 14px;
  color: var(--vp-c-text-1);
}

.expand-icon {
  font-size: 12px;
  color: var(--vp-c-text-3);
}

.status-detail {
  padding: 16px;
  border-top: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
}

.detail-section {
  margin-bottom: 16px;
}

.detail-section:last-child {
  margin-bottom: 0;
}

.detail-section h4 {
  font-size: 13px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin: 0 0 8px 0;
}

.detail-section p {
  font-size: 13px;
  color: var(--vp-c-text-2);
  line-height: 1.6;
  margin: 0;
}

.detail-section ul {
  margin: 0;
  padding-left: 16px;
}

.detail-section li {
  font-size: 13px;
  color: var(--vp-c-text-2);
  line-height: 1.6;
  margin: 4px 0;
}

.code-example {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  overflow: hidden;
}

.code-request {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  background: var(--vp-c-bg-soft);
  border-bottom: 1px solid var(--vp-c-divider);
}

.method-badge {
  padding: 4px 8px;
  border-radius: 4px;
  font-weight: 700;
  font-size: 11px;
  background: var(--vp-c-bg);
  border: 1px solid;
}

.code-request code {
  font-family: monospace;
  font-size: 13px;
  color: var(--vp-c-text-1);
}

.code-response {
  padding: 12px;
  background: var(--vp-c-bg);
}

.code-response pre {
  margin: 0;
  font-size: 12px;
  line-height: 1.5;
  overflow-x: auto;
}

.code-response code {
  font-family: monospace;
  color: var(--vp-c-text-1);
}

@media (max-width: 640px) {
  .category-tabs {
    flex-direction: column;
  }

  .category-btn {
    flex-direction: row;
    justify-content: space-between;
  }

  .status-header {
    flex-wrap: wrap;
  }

  .code-request {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
