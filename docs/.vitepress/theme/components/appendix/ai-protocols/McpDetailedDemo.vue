<template>
  <div class="mcp-detailed-demo">
    <div class="demo-header">
      <span class="title">MCP 内部实现</span>
      <span class="subtitle">客户端-服务器架构的通信细节</span>
    </div>

    <div class="intro-section">
      <div class="section-title">为什么 MCP 这么火？</div>
      <p class="intro-text">
        MCP 之前，AI 只能"看"和"说"，有了 MCP，AI 终于可以"动手"了。它让 AI 可以操纵各种程序，真正帮你干活。
      </p>
      <div class="popular-uses">
        <div class="use-item">
          <div class="use-title">Cursor / Claude 等 AI 编辑器</div>
          <div class="use-desc">直接读写文件、执行代码、操作 Git</div>
        </div>
        <div class="use-item">
          <div class="use-title">浏览器自动化</div>
          <div class="use-desc">AI 自动打开网页、点击按钮、填表单</div>
        </div>
        <div class="use-item">
          <div class="use-title">数据库查询</div>
          <div class="use-desc">直接查询/写入数据库，无需手动导出</div>
        </div>
        <div class="use-item">
          <div class="use-title">AI 操作电脑</div>
          <div class="use-desc">Windows-MCP 让 AI 直接操控鼠标键盘</div>
        </div>
        <div class="use-item">
          <div class="use-title">自动化部署</div>
          <div class="use-desc">Vercel-MCP 一键部署网站到线上</div>
        </div>
        <div class="use-item">
          <div class="use-title">设计稿转代码</div>
          <div class="use-desc">Figma-MCP 读取设计稿自动生成网页</div>
        </div>
      </div>
    </div>

    <div class="usage-section">
      <div class="section-title">如何使用 MCP？</div>
      <p class="usage-intro">
        使用 MCP 非常简单，只需要配置一个 <code>mcp.json</code> 文件，就可以在你的 IDE 里使用各种 MCP 工具。
      </p>
      
      <div class="usage-steps">
        <div class="usage-step">
          <div class="step-num">1</div>
          <div class="step-content">
            <div class="step-title">找到 MCP Server</div>
            <div class="step-desc">
              从 MCP 资源站或 GitHub 找到你需要的 MCP Server
            </div>
            <div class="mcp-resources">
              <div class="resource-item">
                <span class="resource-name">官方 Server 列表</span>
                <a href="https://github.com/modelcontextprotocol/servers" target="_blank" class="resource-link">github.com/modelcontextprotocol/servers</a>
              </div>
              <div class="resource-item">
                <span class="resource-name">MCP.so（中文）</span>
                <a href="https://mcp.so" target="_blank" class="resource-link">mcp.so</a>
              </div>
              <div class="resource-item">
                <span class="resource-name">Pulse MCP（英文）</span>
                <a href="https://www.pulsemcp.com" target="_blank" class="resource-link">pulsemcp.com</a>
              </div>
              <div class="resource-item">
                <span class="resource-name">Smithery（英文）</span>
                <a href="https://smithery.ai" target="_blank" class="resource-link">smithery.ai</a>
              </div>
            </div>
          </div>
        </div>
        
        <div class="usage-step">
          <div class="step-num">2</div>
          <div class="step-content">
            <div class="step-title">配置 mcp.json</div>
            <div class="step-desc">
              在你的 AI 编辑器（Cursor / Claude Desktop 等）中找到 MCP 配置文件位置，添加 Server 配置
            </div>
            <pre class="config-example"><code>{{ mcpConfigExample }}</code></pre>
          </div>
        </div>
        
        <div class="usage-step">
          <div class="step-num">3</div>
          <div class="step-content">
            <div class="step-title">重启 IDE 即可使用</div>
            <div class="step-desc">
              重启后，AI 会自动发现并加载 MCP 工具，你就可以直接让 AI 使用这些工具了
            </div>
          </div>
        </div>
      </div>
      
      <div class="skills-note">
        <div class="note-title">Skills 正在替代 MCP？</div>
        <div class="note-content">
          随着 <strong>Skills</strong> 的普及，越来越多的场景开始使用 Skills 替代 MCP 协议。Skills 更轻量、更易编写，适合大多数常见任务。MCP 更适合需要复杂工具集成、多客户端复用的场景。如果你只是想让 AI 做一些简单操作，建议优先考虑 Skills。
        </div>
      </div>
      
      <div class="config-locations">
        <div class="config-title">常见 IDE 的 mcp.json 位置</div>
        <div class="config-list">
          <div class="config-item">
            <span class="config-name">Cursor</span>
            <span class="config-path">~/.cursor/mcp.json</span>
          </div>
          <div class="config-item">
            <span class="config-name">Claude Desktop</span>
            <span class="config-path">~/Library/Application Support/Claude/claude_desktop_config.json (macOS)</span>
          </div>
          <div class="config-item">
            <span class="config-name">Windsurf</span>
            <span class="config-path">~/.windsurf/mcp.json</span>
          </div>
        </div>
      </div>
    </div>

    <div class="implement-section">
      <div class="section-title">如何实现一个 MCP Server？</div>
      <p class="implement-intro">
        假设你有一个天气 API，想把它封装成 MCP Server 让 AI 可以调用。下面以 Node.js 为例演示：
      </p>
      
      <div class="implement-code">
        <div class="code-title">weather-mcp-server.js</div>
        <pre class="code-block"><code>{{ weatherMcpCode }}</code></pre>
      </div>
      
      <div class="transport-compare">
        <div class="compare-title">stdio vs HTTP+SSE 传输方式</div>
        <div class="compare-grid">
          <div class="compare-item">
            <div class="compare-name">stdio（本地进程）</div>
            <div class="compare-desc">
              <p>MCP Server 作为子进程运行，通过标准输入输出通信</p>
              <p><strong>优点：</strong>简单、安全、适合本地工具</p>
              <p><strong>缺点：</strong>只能本地使用，不支持远程</p>
            </div>
          </div>
          <div class="compare-item">
            <div class="compare-name">HTTP + SSE（远程服务）</div>
            <div class="compare-desc">
              <p>MCP Server 作为 HTTP 服务运行，支持 SSE 推送</p>
              <p><strong>优点：</strong>支持远程访问、多客户端共享</p>
              <p><strong>缺点：</strong>需要部署服务器、配置认证</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="demo-content">
      <div class="flow-section">
        <div class="flow-title">
          
          通信流程（4 步）
        </div>
        
        <div class="flow-steps">
          <div
            v-for="(step, index) in mcpFlowSteps"
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
          
          <span class="summary-text">技术深究：JSON-RPC 2.0 消息格式</span>
        </summary>
        <div class="tech-content">
          <div class="tech-section">
            <div class="tech-title">请求消息结构</div>
            <pre class="tech-code"><code>{{ jsonRpcRequest }}</code></pre>
          </div>
          <div class="tech-section">
            <div class="tech-title">响应消息结构</div>
            <pre class="tech-code"><code>{{ jsonRpcResponse }}</code></pre>
          </div>
          <div class="tech-note">
            
            <span>JSON-RPC 2.0 是无状态协议，每个请求都需要包含 <code>id</code> 用于匹配响应</span>
          </div>
        </div>
      </details>

      <details class="tech-details">
        <summary class="tech-summary">
          
          <span class="summary-text">技术深究：两种传输方式</span>
        </summary>
        <div class="tech-content">
          <div class="transport-grid">
            <div class="transport-card">
              <div class="transport-header">
                
                <span class="transport-name">stdio（本地进程）</span>
              </div>
              <div class="transport-desc">
                适用于本地工具，通过标准输入输出通信
              </div>
              <div class="transport-example">
                <pre><code>{{ stdioExample }}</code></pre>
              </div>
            </div>
            <div class="transport-card">
              <div class="transport-header">
                
                <span class="transport-name">HTTP + SSE（远程）</span>
              </div>
              <div class="transport-desc">
                适用于远程服务，支持长连接推送
              </div>
              <div class="transport-example">
                <pre><code>{{ httpExample }}</code></pre>
              </div>
            </div>
          </div>
        </div>
      </details>

      <details class="tech-details">
        <summary class="tech-summary">
          
          <span class="summary-text">技术深究：MCP 核心 API</span>
        </summary>
        <div class="tech-content">
          <div class="api-list">
            <div v-for="(api, index) in mcpApis" :key="index" class="api-item">
              <div class="api-method">
                <span class="method-badge">{{ api.method }}</span>
                <span class="method-name">{{ api.name }}</span>
              </div>
              <div class="api-desc">{{ api.desc }}</div>
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

const mcpFlowSteps = [
  {
    name: '握手（initialize）',
    desc: 'MCP Server 启动时向 Client 发送握手请求，声明自己的协议版本和能力',
    example: {
      title: 'Server → Client',
      code: `// Server 发送 initialize 请求
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "initialize",
  "params": {
    "protocolVersion": "2024-11-05",
    "capabilities": {
      "tools": {},
      "resources": {},
      "prompts": {}
    },
    "serverInfo": {
      "name": "filesystem",
      "version": "1.0.0"
    }
  }
}`
    }
  },
  {
    name: '列工具（tools/list）',
    desc: 'Client 向 Server 请求可用工具列表，AI 知道能调用哪些功能',
    example: {
      title: 'Client → Server',
      code: `// Client 请求工具列表
{
  "jsonrpc": "2.0",
  "id": 2,
  "method": "tools/list",
  "params": {}
}

// Server 返回工具列表
{
  "jsonrpc": "2.0",
  "id": 2,
  "result": {
    "tools": [
      {
        "name": "read_file",
        "description": "读取文件内容",
        "inputSchema": {
          "type": "object",
          "properties": {
            "path": { "type": "string" }
          },
          "required": ["path"]
        }
      },
      {
        "name": "write_file",
        "description": "写入文件内容",
        "inputSchema": { ... }
      }
    ]
  }
}`
    }
  },
  {
    name: '调工具（tools/call）',
    desc: 'AI 决定调用工具时，Client 发送调用请求，Server 执行后返回结果',
    example: {
      title: 'Client → Server',
      code: `// Client 调用工具
{
  "jsonrpc": "2.0",
  "id": 3,
  "method": "tools/call",
  "params": {
    "name": "read_file",
    "arguments": {
      "path": "/home/user/project/README.md"
    }
  }
}

// Server 返回结果
{
  "jsonrpc": "2.0",
  "id": 3,
  "result": {
    "content": [
      {
        "type": "text",
        "text": "# My Project\\n\\nHello World"
      }
    ]
  }
}`
    }
  },
  {
    name: '返回结果',
    desc: 'Server 执行完成后把结果发回给 Client，Client 将结果返回给 AI',
    example: {
      title: '结果流向',
      code: `Server 执行 → 返回 JSON-RPC 响应 → Client 解析 → 
       → 将结果注入 AI 上下文 → AI 继续处理`
    }
  }
]

const jsonRpcRequest = `{
  "jsonrpc": "2.0",           // 协议版本
  "id": 1,                     // 请求 ID，用于匹配响应
  "method": "tools/call",      // 方法名
  "params": { ... }            // 参数对象
}`

const jsonRpcResponse = `// 成功响应
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": { ... }
}

// 错误响应
{
  "jsonrpc": "2.0",
  "id": 1,
  "error": {
    "code": -32600,
    "message": "Invalid Request"
  }
}`

const stdioExample = `// 启动 MCP Server 作为子进程
npx @modelcontextprotocol/server-filesystem ./project

// 通过 stdio 通信
// stdin: 接收请求
// stdout: 发送响应`

const httpExample = `// HTTP 传输（Server-Sent Events）
POST /mcp HTTP/1.1
Content-Type: application/json

{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": { ... }
}

// SSE 长连接用于推送
GET /mcp/sse HTTP/1.1
// 持续接收服务器推送的更新`

const mcpConfigExample = `{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-filesystem",
        "/home/user/projects"
      ]
    },
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_TOKEN": "your-token-here"
      }
    },
    "postgres": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-postgres"],
      "env": {
        "DATABASE_URL": "postgresql://user:pass@localhost/db"
      }
    }
  }
}`

const weatherMcpCode = `import { Server } from '@modelcontextprotocol/sdk/server/index.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'

// 1. 创建 MCP Server
const server = new Server({
  name: 'weather-server',
  version: '1.0.0'
}, {
  capabilities: { tools: {} }
})

// 2. 定义工具列表
server.setRequestHandler('tools/list', async () => ({
  tools: [{
    name: 'get_weather',
    description: '获取指定城市的天气信息',
    inputSchema: {
      type: 'object',
      properties: {
        city: { type: 'string', description: '城市名称' }
      },
      required: ['city']
    }
  }]
}))

// 3. 实现工具调用逻辑
server.setRequestHandler('tools/call', async (request) => {
  const { name, arguments: args } = request.params
  
  if (name === 'get_weather') {
    // 调用你的天气 API
    const response = await fetch(
      \`https://api.weather.com/v1/current?city=\${args.city}\`
    )
    const data = await response.json()
    
    return {
      content: [{
        type: 'text',
        text: JSON.stringify(data)
      }]
    }
  }
})

// 4. 启动服务（stdio 方式）
const transport = new StdioServerTransport()
await server.connect(transport)`

const mcpApis = [
  { method: 'initialize', name: '初始化', desc: 'Server 向 Client 声明协议版本和能力' },
  { method: 'tools/list', name: '工具列表', desc: '获取 Server 提供所有可用工具' },
  { method: 'tools/call', name: '调用工具', desc: '实际调用某个工具并获取结果' },
  { method: 'resources/list', name: '资源列表', desc: '获取可访问的资源（如文件、数据库）' },
  { method: 'resources/read', name: '读取资源', desc: '读取某个资源的内容' },
  { method: 'prompts/list', name: '提示模板', desc: '获取预定义的提示模板' }
]
</script>

<style scoped>
.mcp-detailed-demo {
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
  background: #3b82f6;
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

.tech-note code {
  background: var(--vp-c-bg);
  padding: 0.1rem 0.3rem;
  border-radius: 3px;
  font-size: 0.7rem;
}

.transport-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
}

.transport-card {
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  padding: 0.5rem;
}

.transport-header {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  margin-bottom: 0.3rem;
}

.transport-icon {
  font-size: 0.9rem;
}

.transport-name {
  font-size: 0.8rem;
  font-weight: 600;
}

.transport-desc {
  font-size: 0.7rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.4rem;
}

.transport-example pre {
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
  background: #3b82f6;
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

@media (max-width: 640px) {
  .transport-grid {
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

.usage-step .step-desc a {
  color: var(--vp-c-brand);
}

.config-example {
  margin-top: 0.5rem;
  padding: 0.5rem;
  background: var(--vp-c-bg-alt);
  border-radius: 4px;
  overflow-x: auto;
}

.config-example code {
  font-size: 0.7rem;
  line-height: 1.4;
}

.config-locations {
  padding: 0.75rem;
  background: var(--vp-c-bg);
  border-radius: 6px;
}

.config-title {
  font-weight: 600;
  font-size: 0.8rem;
  color: var(--vp-c-text-1);
  margin-bottom: 0.5rem;
}

.config-list {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.config-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.75rem;
}

.config-name {
  font-weight: 500;
  color: var(--vp-c-text-1);
  min-width: 100px;
}

.config-path {
  color: var(--vp-c-text-2);
  font-family: monospace;
  font-size: 0.7rem;
}

.mcp-resources {
  margin-top: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.resource-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.75rem;
}

.resource-name {
  font-weight: 500;
  color: var(--vp-c-text-1);
  min-width: 120px;
}

.resource-link {
  color: var(--vp-c-brand);
  font-size: 0.7rem;
}

.skills-note {
  margin-top: 1rem;
  padding: 0.75rem;
  background: var(--vp-c-bg-alt);
  border-radius: 6px;
  border-left: 3px solid #f59e0b;
}

.skills-note .note-title {
  font-weight: 600;
  font-size: 0.8rem;
  color: var(--vp-c-text-1);
  margin-bottom: 0.3rem;
}

.skills-note .note-content {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  line-height: 1.4;
}

.implement-section {
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--vp-c-divider);
}

.implement-section .section-title {
  font-weight: 600;
  font-size: 0.95rem;
  color: var(--vp-c-text-1);
  margin-bottom: 0.5rem;
}

.implement-intro {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  line-height: 1.5;
  margin-bottom: 0.75rem;
}

.implement-code {
  margin-bottom: 1rem;
}

.code-title {
  font-weight: 500;
  font-size: 0.8rem;
  color: var(--vp-c-text-1);
  margin-bottom: 0.3rem;
}

.code-block {
  padding: 0.75rem;
  background: var(--vp-c-bg-alt);
  border-radius: 6px;
  overflow-x: auto;
}

.code-block code {
  font-size: 0.65rem;
  line-height: 1.4;
}

.transport-compare {
  padding: 0.75rem;
  background: var(--vp-c-bg);
  border-radius: 6px;
}

.compare-title {
  font-weight: 600;
  font-size: 0.8rem;
  color: var(--vp-c-text-1);
  margin-bottom: 0.5rem;
}

.compare-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
}

.compare-item {
  padding: 0.5rem;
  background: var(--vp-c-bg-alt);
  border-radius: 6px;
}

.compare-name {
  font-weight: 600;
  font-size: 0.75rem;
  color: var(--vp-c-text-1);
  margin-bottom: 0.3rem;
}

.compare-desc p {
  font-size: 0.7rem;
  color: var(--vp-c-text-2);
  line-height: 1.3;
  margin: 0.2rem 0;
}

.compare-desc strong {
  color: var(--vp-c-text-1);
}

@media (max-width: 640px) {
  .compare-grid {
    grid-template-columns: 1fr;
  }
}
</style>
