<template>
  <div class="a2a-detailed-demo">
    <div class="demo-header">
      <span class="title">A2A 内部实现</span>
      <span class="subtitle">对等网络架构的通信细节</span>
    </div>

    <div class="intro-section">
      <div class="section-title">A2A 可以做什么？</div>
      <p class="intro-text">
        A2A 让多个 AI Agent 可以相互协作，不再是单打独斗。一个复杂任务可以分配给多个专业 Agent，每个 Agent 做自己擅长的事。
      </p>
      <div class="popular-uses">
        <div class="use-item">
          <div class="use-title">软件开发流水线</div>
          <div class="use-desc">需求分析 Agent → 代码 Agent → 测试 Agent → 部署 Agent</div>
        </div>
        <div class="use-item">
          <div class="use-title">多厂商 Agent 集成</div>
          <div class="use-desc">Google、Anthropic、OpenAI 的 Agent 可以相互调用</div>
        </div>
        <div class="use-item">
          <div class="use-title">企业工作流</div>
          <div class="use-desc">HR Agent、财务 Agent、审批 Agent 协同处理业务流程</div>
        </div>
        <div class="use-item">
          <div class="use-title">智能客服升级</div>
          <div class="use-desc">接待 Agent → 业务 Agent → 人工 Agent 逐级转接</div>
        </div>
        <div class="use-item">
          <div class="use-title">科研协作</div>
          <div class="use-desc">文献 Agent → 实验 Agent → 分析 Agent → 报告 Agent</div>
        </div>
        <div class="use-item">
          <div class="use-title">自动化运维</div>
          <div class="use-desc">监控 Agent → 诊断 Agent → 修复 Agent → 通知 Agent</div>
        </div>
      </div>
    </div>

    <div class="usage-section">
      <div class="section-title">如何使用 A2A？</div>
      <p class="usage-intro">
        A2A 目前还在早期阶段，主要由 Google 推动。如果你想尝试 A2A，需要开发支持 A2A 协议的 Agent 服务。
      </p>
      
      <div class="usage-steps">
        <div class="usage-step">
          <div class="step-num">1</div>
          <div class="step-content">
            <div class="step-title">实现 Agent Card 端点</div>
            <div class="step-desc">
              在你的 Agent 服务中暴露 <code>/.well-known/agent.json</code>，声明 Agent 的能力和版本
            </div>
          </div>
        </div>
        
        <div class="usage-step">
          <div class="step-num">2</div>
          <div class="step-content">
            <div class="step-title">实现 A2A API</div>
            <div class="step-desc">
              实现 <code>agents/get</code>、<code>tasks/send</code>、<code>tasks/get</code> 等核心 API
            </div>
          </div>
        </div>
        
        <div class="usage-step">
          <div class="step-num">3</div>
          <div class="step-content">
            <div class="step-title">部署并注册 Agent</div>
            <div class="step-desc">
              将 Agent 部署到服务器，并在 Agent 注册表中登记，让其他 Agent 可以发现它
            </div>
          </div>
        </div>
      </div>
      
      <div class="usage-note">
        <div class="note-title">当前状态</div>
        <div class="note-content">
          A2A 协议于 2025 年 4 月发布，目前还在快速发展中。Google 提供了参考实现，但生态还在建设中。建议关注 <a href="https://google.github.io/A2A" target="_blank">官方文档</a> 获取最新进展。
        </div>
      </div>
    </div>

    <div class="demo-content">
      <div class="flow-section">
        <div class="flow-title">
          
          通信流程（5 步）
        </div>
        
        <div class="flow-steps">
          <div
            v-for="(step, index) in a2aFlowSteps"
            :key="index"
            class="flow-step-item"
          >
            <div class="step-header" @click="toggleStep(index)">
              <span class="step-num">{{ index + 1 }}</span>
              <span class="step-name">{{ step.name }}</span>
              <span class="step-arrow">{{ expandedStep === index ? '▼' : '▶' }}</span>
            </div>
            <div v-if="expandedStep === index" class="step-detail">
              <div class="step-desc">{{ step.desc }}</div>
              <div class="step-example">
                <div class="example-title">{{ step.example.title }}</div>
                <pre class="example-code"><code>{{ step.example.code }}</code></pre>
              </div>
            </div>
          </div>
        </div>
      </div>

      <details class="tech-details">
        <summary class="tech-summary">
          
          <span class="summary-text">技术深究：Agent Card 名片格式</span>
        </summary>
        <div class="tech-content">
          <div class="tech-intro">
            Agent Card 是一个 JSON 文件，通常放在 <code>/.well-known/agent.json</code> 路径
          </div>
          <div class="tech-section">
            <div class="tech-title">Agent Card 示例</div>
            <pre class="tech-code"><code>{{ agentCardExample }}</code></pre>
          </div>
          <div class="tech-note">
            
            <span>通过 Agent Card，Agent 之间可以相互发现，了解对方的能力和版本，实现互操作</span>
          </div>
        </div>
      </details>

      <details class="tech-details">
        <summary class="tech-summary">
          
          <span class="summary-text">技术深究：HTTP + SSE 通信</span>
        </summary>
        <div class="tech-content">
          <div class="tech-section">
            <div class="tech-title">任务发送（HTTP POST）</div>
            <pre class="tech-code"><code>{{ taskSendExample }}</code></pre>
          </div>
          <div class="tech-section">
            <div class="tech-title">实时推送（SSE）</div>
            <pre class="tech-code"><code>{{ sseExample }}</code></pre>
          </div>
          <div class="tech-note">
            <span>SSE（Server-Sent Events）允许服务器主动推送消息，适合长时任务的状态更新</span>
          </div>
        </div>
      </details>

      <details class="tech-details">
        <summary class="tech-summary">
          
          <span class="summary-text">技术深究：A2A 核心 API</span>
        </summary>
        <div class="tech-content">
          <div class="api-list">
            <div v-for="(api, index) in a2aApis" :key="index" class="api-item">
              <div class="api-method">
                <span class="method-badge">{{ api.method }}</span>
                <span class="method-name">{{ api.name }}</span>
              </div>
              <div class="api-desc">{{ api.desc }}</div>
            </div>
          </div>
        </div>
      </details>

      <details class="tech-details">
        <summary class="tech-summary">
          
          <span class="summary-text">技术深究：认证机制</span>
        </summary>
        <div class="tech-content">
          <div class="auth-grid">
            <div class="auth-card">
              <div class="auth-header">
                
                <span class="auth-name">API Key</span>
              </div>
              <div class="auth-desc">
                简单的认证方式，适合内部 Agent 通信
              </div>
              <pre class="auth-example"><code>{{ apiKeyExample }}</code></pre>
            </div>
            <div class="auth-card">
              <div class="auth-header">
                
                <span class="auth-name">OAuth 2.0</span>
              </div>
              <div class="auth-desc">
                企业级认证，支持令牌刷新和权限控制
              </div>
              <pre class="auth-example"><code>{{ oauthExample }}</code></pre>
            </div>
          </div>
        </div>
      </details>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const expandedStep = ref(0)

const toggleStep = (index) => {
  expandedStep.value = expandedStep.value === index ? -1 : index
}

const a2aFlowSteps = [
  {
    name: '发现（agents/get）',
    desc: 'Agent 之间通过 HTTP 请求获取对方的 Agent Card，了解对方的能力和版本',
    example: {
      title: 'HTTP 请求',
      code: `// Agent A 获取 Agent B 的 Agent Card
GET /.well-known/agent.json HTTP/1.1
Host: agent-b.company.com

// 响应
{
  "name": "Code Agent",
  "description": "专业代码生成 Agent",
  "url": "https://agent-b.company.com",
  "version": "1.0.0",
  "capabilities": {
    "streaming": true,
    "pushNotifications": true
  },
  "skills": [
    {"id": "code-gen", "name": "代码生成"},
    {"id": "code-review", "name": "代码审查"}
  ]
}`
    }
  },
  {
    name: '发任务（tasks/send）',
    desc: 'Agent A 调用 tasks/send 向 Agent B 发送任务，包含任务ID、描述、上下文等',
    example: {
      title: 'HTTP POST',
      code: `// Agent A 发送任务给 Agent B
POST /tasks/send HTTP/1.1
Content-Type: application/json
Authorization: Bearer xxx

{
  "id": "task-12345",
  "sessionId": "session-001",
  "message": {
    "role": "user",
    "parts": [
      {
        "type": "text",
        "text": "请帮我写一个登录 API"
      },
      {
        "type": "resource",
        "resource": "file:///specs/login.yaml"
      }
    ]
  }
}`
    }
  },
  {
    name: '执行（Task Processing）',
    desc: 'Agent B 接收任务后，可能调用自己的 LLM 或 MCP 工具来执行任务',
    example: {
      title: 'Agent B 内部处理',
      code: `// Agent B 内部处理流程
1. 解析任务请求
2. 分析需要的技能（从 skills 中匹配）
3. 调用内部 LLM 生成代码
4. 可选：通过 MCP 调用外部工具验证代码
5. 生成最终结果

// 整个过程可能耗时较长，通过 SSE 推送进度`
    }
  },
  {
    name: '推送（SSE）',
    desc: 'Agent B 通过 SSE（Server-Sent Events）实时推送任务进度和中间结果',
    example: {
      title: 'SSE 推送',
      code: `// 服务器持续推送
event: taskProgress
data: {
  "taskId": "task-12345",
  "status": "processing",
  "progress": 30,
  "message": "正在生成登录逻辑..."
}

event: taskProgress  
data: {
  "taskId": "task-12345", 
  "status": "processing",
  "progress": 60,
  "message": "正在生成数据库操作..."
}

event: taskCompleted
data: {
  "taskId": "task-12345",
  "status": "completed",
  "result": { ... }
}`
    }
  },
  {
    name: '返回结果（tasks/get）',
    desc: '任务完成后，Agent A 可以通过 tasks/get 获取最终结果',
    example: {
      title: 'HTTP GET',
      code: `// Agent A 获取任务结果
GET /tasks/task-12345 HTTP/1.1
Authorization: Bearer xxx

// 响应
{
  "id": "task-12345",
  "status": "completed",
  "result": {
    "message": {
      "role": "agent",
      "parts": [
        {
          "type": "text",
          "text": "登录 API 已生成..."
        },
        {
          "type": "file",
          "file": {
            "name": "login.py",
            "mimeType": "text/plain",
            "uri": "file:///generated/login.py"
          }
        }
      ]
    }
  }
}`
    }
  }
]

const agentCardExample = `{
  "name": "代码生成 Agent",
  "description": "专业的前后端代码生成 Agent",
  "url": "https://code-agent.company.com",
  "version": "1.0.0",
  "capabilities": {
    "streaming": true,
    "pushNotifications": true
  },
  "skills": [
    {
      "id": "frontend",
      "name": "前端开发",
      "description": "React/Vue/Angular"
    },
    {
      "id": "backend", 
      "name": "后端开发",
      "description": "Node/Python/Go"
    }
  ],
  "authentication": {
    "schemes": ["Bearer", "OAuth2"]
  }
}`

const taskSendExample = `POST /tasks/send HTTP/1.1
Host: agent-b.company.com
Content-Type: application/json
Authorization: Bearer {token}

{
  "id": "task-001",
  "message": {
    "role": "user",
    "parts": [{ "type": "text", "text": "写一个登录接口" }]
  }
}`

const sseExample = `GET /tasks/task-001/sse HTTP/1.1
Authorization: Bearer {token}

event: progress
data: {"status": "processing", "progress": 50}

event: completed  
data: {"status": "completed", "result": {...}}`

const a2aApis = [
  { method: 'GET', name: 'agents/get', desc: '获取指定 Agent 的 Agent Card，了解其能力' },
  { method: 'POST', name: 'tasks/send', desc: '发送任务给目标 Agent，同步等待结果' },
  { method: 'POST', name: 'tasks/sendSubscribe', desc: '发送任务并订阅 SSE 推送，实时获取进度' },
  { method: 'GET', name: 'tasks/get', desc: '根据任务 ID 获取任务状态和结果' },
  { method: 'GET', name: 'tasks/cancel', desc: '取消正在执行的任务' }
]

const apiKeyExample = `Authorization: Bearer sk-xxxxx
# 或
Authorization: ApiKey sk-xxxxx`

const oauthExample = `Authorization: Bearer {access_token}
# 支持刷新令牌
POST /oauth/token
{
  "grant_type": "refresh_token",
  "refresh_token": "xxx"
}`
</script>

<style scoped>
.a2a-detailed-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  padding: 1rem;
  margin: 1rem 0;
}

.demo-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.demo-header .icon {
  font-size: 1.25rem;
}

.demo-header .title {
  font-weight: bold;
  font-size: 1rem;
}

.demo-header .subtitle {
  color: var(--vp-c-text-2);
  font-size: 0.85rem;
  margin-left: 0.5rem;
}

.flow-section {
  margin-bottom: 1rem;
}

.flow-title {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-weight: 600;
  font-size: 0.95rem;
  margin-bottom: 0.75rem;
}

.title-icon {
  font-size: 1rem;
}

.flow-steps {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.flow-step-item {
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  overflow: hidden;
  background: var(--vp-c-bg);
}

.step-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  cursor: pointer;
  background: var(--vp-c-bg-soft);
  transition: background 0.2s;
}

.step-header:hover {
  background: var(--vp-c-bg-alt);
}

.step-num {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #10b981;
  color: white;
  font-size: 0.7rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  flex-shrink: 0;
}

.step-name {
  flex: 1;
  font-size: 0.85rem;
  font-weight: 500;
}

.step-arrow {
  font-size: 0.7rem;
  color: var(--vp-c-text-3);
}

.step-detail {
  padding: 0.75rem;
  border-top: 1px solid var(--vp-c-divider);
}

.step-desc {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.5rem;
}

.step-example {
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  padding: 0.5rem;
}

.example-title {
  font-size: 0.7rem;
  color: var(--vp-c-text-3);
  margin-bottom: 0.3rem;
}

.example-code {
  font-size: 0.7rem;
  background: var(--vp-c-bg);
  padding: 0.5rem;
  border-radius: 4px;
  overflow-x: auto;
  white-space: pre-wrap;
  word-break: break-all;
  font-family: var(--vp-font-family-mono);
  margin: 0;
  line-height: 1.4;
}

.tech-details {
  margin-bottom: 0.75rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  overflow: hidden;
}

.tech-summary {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.6rem 0.75rem;
  cursor: pointer;
  background: var(--vp-c-bg-soft);
  font-size: 0.85rem;
  font-weight: 500;
  list-style: none;
}

.tech-summary::-webkit-details-marker {
  display: none;
}

.summary-icon {
  font-size: 0.9rem;
}

.tech-content {
  padding: 0.75rem;
  border-top: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
}

.tech-intro {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.75rem;
  padding: 0.5rem;
  background: var(--vp-c-bg-soft);
  border-radius: 4px;
}

.tech-intro code {
  background: var(--vp-c-bg);
  padding: 0.1rem 0.3rem;
  border-radius: 3px;
  font-size: 0.75rem;
}

.tech-section {
  margin-bottom: 0.75rem;
}

.tech-title {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 0.4rem;
}

.tech-code {
  font-size: 0.7rem;
  background: var(--vp-c-bg-soft);
  padding: 0.5rem;
  border-radius: 4px;
  overflow-x: auto;
  white-space: pre-wrap;
  word-break: break-all;
  font-family: var(--vp-font-family-mono);
  margin: 0;
  line-height: 1.4;
}

.tech-note {
  display: flex;
  align-items: flex-start;
  gap: 0.3rem;
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  padding: 0.5rem;
  background: var(--vp-c-bg-soft);
  border-radius: 4px;
}

.note-icon {
  flex-shrink: 0;
}

.api-list {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.api-item {
  padding: 0.4rem;
  background: var(--vp-c-bg-soft);
  border-radius: 4px;
}

.api-method {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  margin-bottom: 0.2rem;
}

.method-badge {
  font-size: 0.6rem;
  background: #10b981;
  color: white;
  padding: 0.1rem 0.3rem;
  border-radius: 3px;
  font-family: var(--vp-font-family-mono);
}

.method-name {
  font-size: 0.8rem;
  font-weight: 600;
}

.api-desc {
  font-size: 0.7rem;
  color: var(--vp-c-text-2);
}

.auth-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
}

.auth-card {
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  padding: 0.5rem;
}

.auth-header {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  margin-bottom: 0.3rem;
}

.auth-icon {
  font-size: 0.9rem;
}

.auth-name {
  font-size: 0.8rem;
  font-weight: 600;
}

.auth-desc {
  font-size: 0.7rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.4rem;
}

.auth-example pre {
  font-size: 0.65rem;
  background: var(--vp-c-bg);
  padding: 0.4rem;
  border-radius: 4px;
  overflow-x: auto;
  white-space: pre-wrap;
  word-break: break-all;
  font-family: var(--vp-font-family-mono);
  margin: 0;
  line-height: 1.3;
}

@media (max-width: 640px) {
  .auth-grid {
    grid-template-columns: 1fr;
  }
}

.intro-section {
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--vp-c-divider);
}

.intro-section .section-title {
  font-weight: 600;
  font-size: 0.95rem;
  color: var(--vp-c-text-1);
  margin-bottom: 0.5rem;
}

.intro-section .intro-text {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  line-height: 1.5;
  margin-bottom: 0.75rem;
}

.popular-uses {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
}

.use-item {
  padding: 0.5rem;
  background: var(--vp-c-bg);
  border-radius: 6px;
  border-left: 3px solid var(--vp-c-brand);
}

.use-title {
  font-weight: 600;
  font-size: 0.75rem;
  color: var(--vp-c-text-1);
  margin-bottom: 0.2rem;
}

.use-desc {
  font-size: 0.65rem;
  color: var(--vp-c-text-2);
  line-height: 1.3;
}

@media (max-width: 640px) {
  .popular-uses {
    grid-template-columns: 1fr;
  }
}

.usage-section {
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--vp-c-divider);
}

.usage-section .section-title {
  font-weight: 600;
  font-size: 0.95rem;
  color: var(--vp-c-text-1);
  margin-bottom: 0.5rem;
}

.usage-intro {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  line-height: 1.5;
  margin-bottom: 0.75rem;
}

.usage-intro code {
  background: var(--vp-c-bg-alt);
  padding: 0.1rem 0.3rem;
  border-radius: 3px;
  font-size: 0.8rem;
}

.usage-steps {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  margin-bottom: 1rem;
}

.usage-step {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 0.75rem;
  background: var(--vp-c-bg);
  border-radius: 6px;
}

.usage-step .step-num {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.5rem;
  height: 1.5rem;
  background: var(--vp-c-brand);
  color: white;
  border-radius: 50%;
  font-size: 0.75rem;
  font-weight: 600;
  flex-shrink: 0;
}

.usage-step .step-content {
  flex: 1;
}

.usage-step .step-title {
  font-weight: 600;
  font-size: 0.85rem;
  color: var(--vp-c-text-1);
  margin-bottom: 0.2rem;
}

.usage-step .step-desc {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  line-height: 1.4;
}

.usage-step .step-desc code {
  background: var(--vp-c-bg-alt);
  padding: 0.1rem 0.3rem;
  border-radius: 3px;
  font-size: 0.75rem;
}

.usage-note {
  padding: 0.75rem;
  background: var(--vp-c-bg);
  border-radius: 6px;
  border-left: 3px solid var(--vp-c-brand);
}

.note-title {
  font-weight: 600;
  font-size: 0.8rem;
  color: var(--vp-c-text-1);
  margin-bottom: 0.3rem;
}

.note-content {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  line-height: 1.4;
}

.note-content a {
  color: var(--vp-c-brand);
}
</style>
