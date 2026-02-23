<template>
  <div class="doc-types-root">
    <div class="demo-header">
      <span class="title">📋 不同文档类型怎么看</span>
      <span class="subtitle">函数文档、REST API 文档、SDK 文档，各有侧重点</span>
    </div>

    <div class="control-panel">
      <button
        v-for="doc in docTypes"
        :key="doc.id"
        :class="['doc-tab', { active: activeDoc === doc.id }]"
        @click="activeDoc = doc.id"
      >
        <span class="tab-icon">{{ doc.icon }}</span>
        <span class="tab-name">{{ doc.name }}</span>
      </button>
    </div>

    <div class="visualization-area">
      <div class="doc-display">
        <!-- 文档头部信息 -->
        <div class="doc-info-bar">
          <div class="info-item">
            <span class="info-label">文档类型</span>
            <span class="info-value">{{ currentDoc.name }}</span>
          </div>
          <div class="info-item">
            <span class="info-label">适用场景</span>
            <span class="info-value">{{ currentDoc.scenario }}</span>
          </div>
          <div class="info-item">
            <span class="info-label">阅读难度</span>
            <span class="info-value">
              <span class="difficulty-stars">{{ currentDoc.difficulty }}</span>
            </span>
          </div>
        </div>

        <!-- 关键信息区 -->
        <div class="key-points">
          <div class="point-section">
            <div class="point-title">🔍 看文档时重点关注</div>
            <div class="point-tags">
              <span v-for="(point, idx) in currentDoc.keyPoints" :key="idx" class="point-tag">
                {{ point }}
              </span>
            </div>
          </div>
        </div>

        <!-- 文档示例区 -->
        <div class="doc-example-area">
          <div class="example-header">
            <span class="example-icon">📝</span>
            <span class="example-title">文档示例</span>
          </div>
          <div class="example-content">
            <pre><code>{{ currentDoc.example }}</code></pre>
          </div>
        </div>

        <!-- 阅读技巧 -->
        <div class="reading-tips">
          <div class="tips-header">
            <span class="tips-icon">💡</span>
            <span class="tips-title">阅读技巧</span>
          </div>
          <ul class="tips-list">
            <li v-for="(tip, idx) in currentDoc.tips" :key="idx">{{ tip }}</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- 对比总结 -->
    <div class="comparison-summary">
      <div class="summary-header">
        <span class="summary-icon">📊</span>
        <span class="summary-title">三种文档快速对比</span>
      </div>
      <div class="summary-table">
        <div class="summary-row header">
          <div class="summary-cell">对比项</div>
          <div class="summary-cell">函数文档</div>
          <div class="summary-cell">REST API 文档</div>
          <div class="summary-cell">SDK 文档</div>
        </div>
        <div class="summary-row">
          <div class="summary-cell label">核心关注</div>
          <div class="summary-cell">参数、返回值</div>
          <div class="summary-cell">Endpoint、请求体</div>
          <div class="summary-cell">初始化、方法链</div>
        </div>
        <div class="summary-row">
          <div class="summary-cell label">代码示例</div>
          <div class="summary-cell">函数调用</div>
          <div class="summary-cell">HTTP 请求</div>
          <div class="summary-cell">对象方法</div>
        </div>
        <div class="summary-row">
          <div class="summary-cell label">错误处理</div>
          <div class="summary-cell">异常/返回值</div>
          <div class="summary-cell">状态码</div>
          <div class="summary-cell">异常对象</div>
        </div>
        <div class="summary-row">
          <div class="summary-cell label">先看什么</div>
          <div class="summary-cell">函数签名</div>
          <div class="summary-cell">Base URL + Auth</div>
          <div class="summary-cell">Quick Start</div>
        </div>
      </div>
    </div>

    <div class="info-box">
      <strong>阅读建议：</strong>函数文档看签名，API 文档看请求格式，SDK 文档看示例。遇到不会的，先找「Quick Start」或「Getting Started」章节。
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const activeDoc = ref('function')

const docTypes = [
  {
    id: 'function',
    icon: '📦',
    name: '函数文档',
    scenario: '使用标准库/第三方库函数',
    difficulty: '⭐⭐',
    keyPoints: ['函数签名', '参数类型', '返回值', '异常说明', '示例代码'],
    example: `### json.loads(s, *, cls=None, object_hook=None...)

将 JSON 字符串解析为 Python 对象

**参数：**
- s (str): 要解析的 JSON 字符串
- cls (JSONDecoder): 自定义解码器类
- object_hook (callable): 可选的转换函数

**返回值：**
- dict | list: 解析后的 Python 对象

**异常：**
- JSONDecodeError: 字符串格式非法

**示例：**
>>> import json
>>> json.loads('{"name": "Alice"}')
{'name': 'Alice'}`,
    tips: [
      '先看函数签名，了解需要什么参数',
      '注意参数的类型和是否必填',
      '查看返回值类型，方便后续处理',
      '关注可能抛出的异常，做好错误处理'
    ]
  },
  {
    id: 'rest',
    icon: '🌐',
    name: 'REST API 文档',
    scenario: '调用远程 HTTP 接口',
    difficulty: '⭐⭐⭐',
    keyPoints: ['Base URL', '认证方式', 'Endpoint', '请求参数', '响应格式', '错误码'],
    example: `## POST /v1/chat/completions

创建聊天完成请求

### 认证
Authorization: Bearer {api_key}

### 请求参数
| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| model | string | 是 | 模型名称 |
| messages | array | 是 | 消息列表 |
| temperature | float | 否 | 采样温度 (0-2) |

### 请求示例
{
  "model": "deepseek-chat",
  "messages": [
    {"role": "user", "content": "Hello"}
  ],
  "temperature": 0.7
}

### 响应示例
{
  "choices": [{
    "message": {
      "role": "assistant",
      "content": "Hello! How can I help you?"
    }
  }]
}`,
    tips: [
      '先找到 Base URL 和认证方式（通常是 API Key）',
      '确认 HTTP 方法（GET/POST/PUT/DELETE）',
      '看清参数是放在 URL、Header 还是 Body 里',
      '注意必填参数和可选参数的区别',
      '查看错误码列表，了解各种异常情况'
    ]
  },
  {
    id: 'sdk',
    icon: '📚',
    name: 'SDK 文档',
    scenario: '使用官方封装好的开发工具包',
    difficulty: '⭐⭐',
    keyPoints: ['安装方式', '初始化', '核心类/方法', '配置选项', '最佳实践'],
    example: `## OpenAI Python SDK

### 安装
pip install openai

### 初始化客户端
from openai import OpenAI

client = OpenAI(
    api_key="your-api-key",
    base_url="https://api.deepseek.com/v1"
)

### 创建聊天完成
response = client.chat.completions.create(
    model="deepseek-chat",
    messages=[
        {"role": "user", "content": "Hello!"}
    ],
    temperature=0.7,
    max_tokens=1000
)

print(response.choices[0].message.content)

### 流式响应
stream = client.chat.completions.create(
    model="deepseek-chat",
    messages=[...],
    stream=True
)

for chunk in stream:
    print(chunk.choices[0].delta.content, end="")`,
    tips: [
      '先看 Quick Start / Getting Started 章节',
      '了解如何初始化和配置客户端',
      '关注核心类和方法的使用方式',
      '查看高级配置选项（如超时、重试）',
      '参考官方示例代码，理解最佳实践'
    ]
  },
  {
    id: 'websocket',
    icon: '🔌',
    name: 'WebSocket 文档',
    scenario: '实时双向通信',
    difficulty: '⭐⭐⭐⭐',
    keyPoints: ['连接地址', '连接建立', '消息格式', '事件处理', '心跳机制', '断开重连'],
    example: `## WebSocket API

### 连接地址
wss://api.example.com/v1/stream

### 连接流程

1. **建立连接**
   - 发送握手请求
   - 服务端返回连接确认

2. **发送消息**
   {
     "type": "subscribe",
     "channel": "price_updates",
     "symbol": "BTC-USD"
   }

3. **接收推送**
   {
     "type": "update",
     "data": {
       "symbol": "BTC-USD",
       "price": "45000.00",
       "timestamp": 1703001600
     }
   }

### 心跳机制
客户端每 30 秒发送 ping：
{"type": "ping"}

服务端返回 pong：
{"type": "pong"}`,
    tips: [
      '注意 ws:// 和 wss:// 的区别（是否加密）',
      '了解连接建立和关闭的时机',
      '明确消息的数据格式和类型',
      '实现心跳检测，保持连接活跃',
      '处理好断线重连逻辑',
      '关注并发连接数限制'
    ]
  }
]

const currentDoc = computed(() => {
  return docTypes.find(d => d.id === activeDoc.value) || docTypes[0]
})
</script>

<style scoped>
.doc-types-root {
  margin: 20px 0;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  overflow: hidden;
}

.demo-header {
  padding: 16px 20px;
  background: var(--vp-c-bg);
  border-bottom: 1px solid var(--vp-c-divider);
}

.title {
  display: block;
  font-size: 1rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 4px;
}

.subtitle {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

.control-panel {
  display: flex;
  gap: 0;
  border-bottom: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
}

.doc-tab {
  flex: 1;
  padding: 14px 12px;
  background: transparent;
  border: none;
  border-right: 1px solid var(--vp-c-divider);
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  color: var(--vp-c-text-2);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
}

.doc-tab:last-child {
  border-right: none;
}

.doc-tab:hover {
  background: var(--vp-c-bg-mute);
}

.doc-tab.active {
  background: var(--vp-c-brand);
  color: white;
}

.tab-icon {
  font-size: 1.4rem;
}

.tab-name {
  font-size: 0.8rem;
}

.visualization-area {
  padding: 20px;
  background: var(--vp-c-bg);
}

.doc-display {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.doc-info-bar {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}

@media (max-width: 600px) {
  .doc-info-bar {
    grid-template-columns: 1fr;
  }
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 14px;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
}

.info-label {
  font-size: 0.7rem;
  color: var(--vp-c-text-3);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.info-value {
  font-size: 0.9rem;
  color: var(--vp-c-text-1);
  font-weight: 600;
}

.difficulty-stars {
  color: #f59e0b;
}

.key-points {
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  padding: 16px;
  border: 1px solid var(--vp-c-divider);
}

.point-title {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 12px;
}

.point-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.point-tag {
  padding: 6px 12px;
  background: var(--vp-c-brand);
  color: white;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 500;
}

.doc-example-area {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  overflow: hidden;
  background: #0a0a0a;
}

.example-header {
  padding: 12px 16px;
  background: #18181b;
  border-bottom: 1px solid #27272a;
  display: flex;
  align-items: center;
  gap: 8px;
}

.example-icon {
  font-size: 1rem;
}

.example-title {
  font-size: 0.85rem;
  font-weight: 600;
  color: #a1a1aa;
}

.example-content pre {
  margin: 0;
  padding: 16px;
  color: #e4e4e7;
  font-size: 0.8rem;
  line-height: 1.7;
  overflow-x: auto;
  white-space: pre-wrap;
  word-wrap: break-word;
}

.example-content code {
  font-family: 'Menlo', 'Monaco', 'Courier New', monospace;
}

.reading-tips {
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(139, 92, 246, 0.05) 100%);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 16px;
}

.tips-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
}

.tips-icon {
  font-size: 1rem;
}

.tips-title {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.tips-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.tips-list li {
  padding: 10px 12px;
  background: var(--vp-c-bg);
  border-radius: 6px;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  border-left: 3px solid var(--vp-c-brand);
}

.comparison-summary {
  margin: 0 20px 20px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  overflow: hidden;
  background: var(--vp-c-bg-soft);
}

.summary-header {
  padding: 14px 16px;
  background: var(--vp-c-bg-alt);
  border-bottom: 1px solid var(--vp-c-divider);
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  font-size: 0.9rem;
  color: var(--vp-c-text-1);
}

.summary-icon {
  font-size: 1.1rem;
}

.summary-table {
  display: flex;
  flex-direction: column;
}

.summary-row {
  display: grid;
  grid-template-columns: 1fr 1.2fr 1.2fr 1.2fr;
  gap: 1px;
  background: var(--vp-c-divider);
}

.summary-row:not(.header) {
  background: var(--vp-c-divider);
}

.summary-row.header {
  background: var(--vp-c-bg-alt);
}

.summary-row.header .summary-cell {
  background: var(--vp-c-bg-alt);
  font-weight: 600;
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
}

.summary-cell {
  padding: 12px;
  background: var(--vp-c-bg);
  font-size: 0.8rem;
  color: var(--vp-c-text-1);
  display: flex;
  align-items: center;
}

.summary-cell.label {
  font-weight: 600;
  color: var(--vp-c-text-2);
  background: var(--vp-c-bg-soft);
}

@media (max-width: 768px) {
  .summary-row {
    grid-template-columns: 1fr;
  }
  
  .summary-row.header {
    display: none;
  }
  
  .summary-cell {
    padding: 8px 12px;
  }
  
  .summary-cell::before {
    content: attr(data-label);
    font-weight: 600;
    color: var(--vp-c-text-2);
    margin-right: 8px;
  }
}

.info-box {
  display: flex;
  gap: 0.5rem;
  padding: 14px 20px;
  background: var(--vp-c-bg-soft);
  border-top: 1px solid var(--vp-c-divider);
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  line-height: 1.6;
}

.info-box strong {
  white-space: nowrap;
  flex-shrink: 0;
  color: var(--vp-c-text-1);
}
</style>
