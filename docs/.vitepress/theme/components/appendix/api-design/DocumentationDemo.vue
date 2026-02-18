<!--
  DocumentationDemo.vue - API 文档演示组件
  展示 API 文档的编写规范和最佳实践
-->
<template>
  <div class="demo">
    <div class="header">
      <span class="icon">📚</span>
      <span class="title">API 文档：最好的 API 文档就是代码本身</span>
    </div>

    <div class="content">
      <div class="tools-tabs">
        <button
          v-for="tool in tools"
          :key="tool.id"
          class="tool-btn"
          :class="{ active: selectedTool === tool.id }"
          @click="selectedTool = tool.id"
        >
          <span class="tool-icon">{{ tool.icon }}</span>
          <span class="tool-name">{{ tool.name }}</span>
        </button>
      </div>

      <div
        v-if="currentTool"
        class="tool-detail"
      >
        <div class="tool-header">
          <div class="tool-title">
            {{ currentTool.name }}
          </div>
          <div class="tool-tags">
            <span
              v-for="tag in currentTool.tags"
              :key="tag.text"
              class="tag"
              :class="tag.class"
            >
              {{ tag.text }}
            </span>
          </div>
        </div>

        <div class="tool-description">
          <p>{{ currentTool.description }}</p>
        </div>

        <div class="feature-section">
          <h4>核心特性</h4>
          <div class="feature-list">
            <div
              v-for="(feature, idx) in currentTool.features"
              :key="idx"
              class="feature-item"
            >
              <span class="feature-icon">✓</span>
              <span class="feature-text">{{ feature }}</span>
            </div>
          </div>
        </div>

        <div class="example-section">
          <h4>文档示例（OpenAPI 3.0）</h4>
          <div class="code-block">
            <pre><code>{{ currentTool.example }}</code></pre>
          </div>
        </div>

        <div class="tools-section">
          <h4>🔧 推荐工具</h4>
          <div class="tools-grid">
            <div
              v-for="(rec, idx) in currentTool.recommendations"
              :key="idx"
              class="tool-card"
            >
              <div class="rec-name">
                {{ rec.name }}
              </div>
              <div class="rec-desc">
                {{ rec.description }}
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

const tools = [
  {
    id: 'openapi',
    name: 'OpenAPI 规范',
    icon: '📋',
    tags: [
      { text: '行业标准', class: 'primary' },
      { text: '语言无关', class: 'secondary' }
    ],
    description: 'OpenAPI Specification（原 Swagger）是描述 REST API 的标准格式，可以被工具解析生成交互式文档、客户端 SDK、服务器存根等。',
    features: [
      '标准化的 YAML/JSON 格式描述 API',
      '支持路径、参数、响应模型、认证等完整定义',
      '生态系统丰富，支持 100+ 工具',
      '可以生成交互式文档（Swagger UI）',
      '可以从代码注释自动生成',
      '支持 API 版本控制和演进'
    ],
    example: `openapi: 3.0.0
info:
  title: 用户服务 API
  version: 1.0.0
  description: 提供用户管理相关接口
servers:
  - url: https://api.example.com/v1
paths:
  /users:
    get:
      summary: 获取用户列表
      parameters:
        - name: page
          in: query
          schema:
            type: integer
            default: 1
      responses:
        '200':
          description: 成功
          content:
            application/json:
              schema:
                type: object
                properties:
                  code:
                    type: integer
                  data:
                    type: array
                    items:
                      $ref: '#/components/schemas/User'
components:
  schemas:
    User:
      type: object
      properties:
        id:
          type: integer
        name:
          type: string
        email:
          type: string
          format: email`,
    recommendations: [
      { name: 'Swagger UI', description: '最流行的交互式文档界面' },
      { name: 'Redoc', description: '美观的现代文档生成器' },
      { name: 'Stoplight', description: '可视化的 API 设计平台' }
    ]
  },
  {
    id: 'swagger',
    name: 'Swagger 工具链',
    icon: '🛠️',
    tags: [
      { text: '工具集', class: 'success' },
      { text: '自动化', class: 'info' }
    ],
    description: 'Swagger 是一套围绕 OpenAPI 规范构建的工具，包括编辑器、UI、代码生成器等，帮助开发者快速构建和使用 API。',
    features: [
      'Swagger Editor：在线编写和验证 OpenAPI 文档',
      'Swagger UI：自动生成交互式文档',
      'Swagger Codegen：根据文档生成客户端 SDK',
      '支持主流编程语言和框架',
      '集成到 CI/CD 流程',
      '自动保持文档与代码同步'
    ],
    example: `# Swagger Editor 示例配置
swagger: '2.0'
info:
  title: 示例 API
  version: '1.0.0'
host: api.example.com
basePath: /v1
schemes:
  - https
paths:
  /users:
    get:
      tags:
        - Users
      summary: 获取所有用户
      produces:
        - application/json
      responses:
        200:
          description: 成功
          schema:
            type: object
            properties:
              code:
                type: integer
              data:
                type: array`,
    recommendations: [
      { name: 'Swagger Editor', description: '在线编辑器，实时预览' },
      { name: 'Swagger Codegen', description: '生成 40+ 种语言的客户端' },
      { name: 'Postman', description: '导入 OpenAPI 进行测试' }
    ]
  },
  {
    id: 'best-practices',
    name: '文档最佳实践',
    icon: '⭐',
    tags: [
      { text: '经验', class: 'warning' },
      { text: '规范', class: 'secondary' }
    ],
    description: '好的 API 文档应该像用户手册一样清晰，让开发者不问问题就能完成集成。',
    features: [
      '每个接口都有完整的请求示例',
      '提供多种语言的代码示例（curl、JavaScript、Python）',
      '错误码文档化，附带解决方案',
      '提供沙箱环境或测试工具',
      '包含认证流程和获取 Token 的方法',
      '实时更新，与代码保持一致',
      '版本变更日志和迁移指南'
    ],
    example: `# 完整的接口文档示例

## 获取用户信息

**请求示例：**

\`\`\`bash
curl -X GET \\
  https://api.example.com/v1/users/123 \\
  -H "Authorization: Bearer YOUR_TOKEN"
\`\`\`

**成功响应：**

\`\`\`json
{
  "code": 0,
  "message": "success",
  "data": {
    "id": 123,
    "name": "张三",
    "email": "zhangsan@example.com"
  }
}
\`\`\`

**错误响应：**

| 错误码 | 说明 | 解决方案 |
|--------|------|----------|
| 10010 | 用户不存在 | 检查 user_id 是否正确 |
| 10018 | Token 已过期 | 重新调用登录接口 |

**在线测试：**

[🚀 在 API Explorer 中测试](https://api.example.com/docs)`,
    recommendations: [
      { name: 'API Blueprint', description: ' Markdown 风格的 API 文档' },
      { name: 'Docusaurus', description: ' Facebook 开源的文档平台' },
      { name: 'GitBook', description: '美观的文档托管平台' }
    ]
  }
]

const selectedTool = ref('openapi')
const currentTool = computed(() =>
  tools.find(t => t.id === selectedTool.value)
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
  background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
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

.tools-tabs {
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.tool-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  border: 2px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg);
  cursor: pointer;
  transition: all 0.2s ease;
}

.tool-btn:hover {
  border-color: rgba(var(--vp-c-brand-rgb), 0.5);
  transform: translateY(-2px);
}

.tool-btn.active {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-brand);
  color: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.tool-icon {
  font-size: 18px;
}

.tool-name {
  font-weight: 600;
  font-size: 14px;
}

.tool-detail {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  overflow: hidden;
}

.tool-header {
  padding: 16px;
  background: var(--vp-c-bg-soft);
  border-bottom: 1px solid var(--vp-c-divider);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.tool-title {
  font-weight: 700;
  font-size: 16px;
  color: var(--vp-c-text-1);
}

.tool-tags {
  display: flex;
  gap: 8px;
}

.tag {
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 600;
}

.tag.primary {
  background: #dbeafe;
  color: #1d4ed8;
}

.tag.secondary {
  background: #e0e7ff;
  color: #4338ca;
}

.tag.success {
  background: #dcfce7;
  color: #16a34a;
}

.tag.info {
  background: #ccfbf1;
  color: #0f766e;
}

.tag.warning {
  background: #fef3c7;
  color: #d97706;
}

.tool-description {
  padding: 16px;
  font-size: 14px;
  color: var(--vp-c-text-2);
  line-height: 1.7;
  border-bottom: 1px solid var(--vp-c-divider);
}

.feature-section, .example-section, .tools-section {
  padding: 16px;
}

.feature-section h4, .example-section h4, .tools-section h4 {
  font-size: 14px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin: 0 0 12px 0;
}

.feature-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.feature-item {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  padding: 8px;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
}

.feature-icon {
  color: #22c55e;
  font-weight: 700;
  font-size: 16px;
  flex-shrink: 0;
}

.feature-text {
  font-size: 13px;
  color: var(--vp-c-text-2);
  line-height: 1.5;
}

.code-block {
  background: var(--vp-c-bg-alt);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  overflow: hidden;
}

.code-block pre {
  margin: 0;
  padding: 16px;
  font-size: 12px;
  line-height: 1.5;
  overflow-x: auto;
}

.code-block code {
  font-family: monospace;
  color: var(--vp-c-text-1);
}

.tools-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}

.tool-card {
  padding: 12px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  text-align: center;
}

.rec-name {
  font-weight: 600;
  font-size: 13px;
  color: var(--vp-c-text-1);
  margin-bottom: 4px;
}

.rec-desc {
  font-size: 12px;
  color: var(--vp-c-text-2);
  line-height: 1.4;
}

@media (max-width: 768px) {
  .tools-tabs {
    flex-direction: column;
  }

  .feature-list {
    grid-template-columns: 1fr;
  }

  .tools-grid {
    grid-template-columns: 1fr;
  }
}
</style>
