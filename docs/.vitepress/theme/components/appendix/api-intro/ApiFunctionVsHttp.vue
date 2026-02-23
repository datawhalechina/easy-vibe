<template>
  <div class="api-compare-root">
    <div class="demo-header">
      <span class="title">📚 函数 API vs HTTP API</span>
      <span class="subtitle">本地调用 vs 网络请求，文档怎么看？</span>
    </div>

    <div class="control-panel">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        :class="['tab-btn', { active: activeTab === tab.id }]"
        @click="activeTab = tab.id"
      >
        {{ tab.icon }} {{ tab.name }}
      </button>
    </div>

    <div class="visualization-area">
      <!-- 对比视图 -->
      <div v-if="activeTab === 'compare'" class="compare-view">
        <div class="compare-cards">
          <div class="compare-card">
            <div class="card-header function">
              <span class="card-icon">📦</span>
              <span class="card-title">函数 API</span>
            </div>
            <div class="card-body">
              <div class="feature-list">
                <div class="feature-item">
                  <span class="feature-label">调用方式</span>
                  <span class="feature-value">直接函数调用</span>
                </div>
                <div class="feature-item">
                  <span class="feature-label">参数传递</span>
                  <span class="feature-value">括号内传参</span>
                </div>
                <div class="feature-item">
                  <span class="feature-label">返回值</span>
                  <span class="feature-value">直接获得结果</span>
                </div>
                <div class="feature-item">
                  <span class="feature-label">错误处理</span>
                  <span class="feature-value">异常/返回值</span>
                </div>
              </div>
              <div class="code-block">
                <div class="code-label">Python 示例</div>
                <pre><code># 调用内置函数
length = len("hello")      # 返回 5

# 调用库函数
import math
result = math.sqrt(16)     # 返回 4.0

# 调用自定义函数
def add(a, b):
    return a + b
sum = add(3, 5)            # 返回 8</code></pre>
              </div>
            </div>
          </div>

          <div class="vs-divider">
            <span class="vs-text">VS</span>
          </div>

          <div class="compare-card">
            <div class="card-header http">
              <span class="card-icon">🌐</span>
              <span class="card-title">HTTP API</span>
            </div>
            <div class="card-body">
              <div class="feature-list">
                <div class="feature-item">
                  <span class="feature-label">调用方式</span>
                  <span class="feature-value">网络请求</span>
                </div>
                <div class="feature-item">
                  <span class="feature-label">参数传递</span>
                  <span class="feature-value">URL/Body/Header</span>
                </div>
                <div class="feature-item">
                  <span class="feature-label">返回值</span>
                  <span class="feature-value">JSON/XML 响应</span>
                </div>
                <div class="feature-item">
                  <span class="feature-label">错误处理</span>
                  <span class="feature-value">状态码判断</span>
                </div>
              </div>
              <div class="code-block">
                <div class="code-label">HTTP 请求示例</div>
                <pre><code>POST /v1/chat/completions HTTP/1.1
Host: api.deepseek.com
Authorization: Bearer sk-xxx
Content-Type: application/json

{
  "model": "deepseek-chat",
  "messages": [
    {"role": "user", "content": "你好"}
  ]
}</code></pre>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 文档对比视图 -->
      <div v-if="activeTab === 'docs'" class="docs-view">
        <div class="docs-cards">
          <div class="doc-card">
            <div class="doc-header">
              <span class="doc-icon">📖</span>
              <span class="doc-title">函数文档怎么看</span>
            </div>
            <div class="doc-content">
              <div class="doc-section">
                <div class="doc-section-title">🔍 关注重点</div>
                <ul class="doc-list">
                  <li><strong>函数签名</strong>：函数名和参数列表</li>
                  <li><strong>参数类型</strong>：每个参数要什么类型</li>
                  <li><strong>返回值</strong>：函数返回什么</li>
                  <li><strong>异常说明</strong>：可能抛出什么错误</li>
                </ul>
              </div>
              <div class="doc-example">
                <div class="doc-example-label">Python 文档示例</div>
                <pre><code>def open(file: str, mode: str = 'r') -> TextIO:
    """
    打开文件并返回文件对象
    
    Args:
        file: 文件路径
        mode: 打开模式 ('r', 'w', 'a')
    
    Returns:
        文件对象
    
    Raises:
        FileNotFoundError: 文件不存在
    """</code></pre>
              </div>
            </div>
          </div>

          <div class="doc-card">
            <div class="doc-header">
              <span class="doc-icon">📡</span>
              <span class="doc-title">HTTP API 文档怎么看</span>
            </div>
            <div class="doc-content">
              <div class="doc-section">
                <div class="doc-section-title">🔍 关注重点</div>
                <ul class="doc-list">
                  <li><strong>Endpoint</strong>：URL 路径和 HTTP 方法</li>
                  <li><strong>认证方式</strong>：API Key / Token 怎么传</li>
                  <li><strong>请求参数</strong>：Body / Query / Header</li>
                  <li><strong>响应格式</strong>：成功和错误返回什么</li>
                </ul>
              </div>
              <div class="doc-example">
                <div class="doc-example-label">API 文档示例</div>
                <pre><code>POST /v1/chat/completions

Headers:
  Authorization: Bearer {api_key}
  Content-Type: application/json

Body:
{
  "model": "deepseek-chat",
  "messages": [...],
  "temperature": 0.7
}

Response:
{
  "choices": [{
    "message": {"content": "..."}
  }]
}</code></pre>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 快速判断视图 -->
      <div v-if="activeTab === 'quick'" class="quick-view">
        <div class="quick-cards">
          <div class="quick-card">
            <div class="quick-header">
              <span class="quick-icon">⚡</span>
              <span class="quick-title">快速判断指南</span>
            </div>
            <div class="quick-content">
              <div class="decision-tree">
                <div class="decision-item">
                  <div class="decision-question">看到代码里有 <code>()</code> 调用？</div>
                  <div class="decision-answer">→ 这是 <strong>函数 API</strong></div>
                  <div class="decision-example">如：len(), print(), requests.get()</div>
                </div>
                <div class="decision-arrow">↓</div>
                <div class="decision-item">
                  <div class="decision-question">看到 URL 和 HTTP 方法？</div>
                  <div class="decision-answer">→ 这是 <strong>HTTP API</strong></div>
                  <div class="decision-example">如：POST /api/users, GET https://...</div>
                </div>
                <div class="decision-arrow">↓</div>
                <div class="decision-item">
                  <div class="decision-question">看到 SDK/Client 对象？</div>
                  <div class="decision-answer">→ 这是 <strong>封装后的 HTTP API</strong></div>
                  <div class="decision-example">如：client.chat.completions.create()</div>
                </div>
              </div>
            </div>
          </div>

          <div class="quick-card">
            <div class="quick-header">
              <span class="quick-icon">🎯</span>
              <span class="quick-title">使用场景对比</span>
            </div>
            <div class="quick-content">
              <div class="scenario-table">
                <div class="scenario-row header">
                  <div class="scenario-cell">场景</div>
                  <div class="scenario-cell">推荐方式</div>
                  <div class="scenario-cell">原因</div>
                </div>
                <div class="scenario-row">
                  <div class="scenario-cell">本地数据处理</div>
                  <div class="scenario-cell"><span class="badge function">函数 API</span></div>
                  <div class="scenario-cell">快速、无需网络</div>
                </div>
                <div class="scenario-row">
                  <div class="scenario-cell">调用 AI 模型</div>
                  <div class="scenario-cell"><span class="badge http">HTTP API</span></div>
                  <div class="scenario-cell">模型在远程服务器</div>
                </div>
                <div class="scenario-row">
                  <div class="scenario-cell">获取天气数据</div>
                  <div class="scenario-cell"><span class="badge http">HTTP API</span></div>
                  <div class="scenario-cell">数据在服务商那里</div>
                </div>
                <div class="scenario-row">
                  <div class="scenario-cell">文件读写操作</div>
                  <div class="scenario-cell"><span class="badge function">函数 API</span></div>
                  <div class="scenario-cell">直接操作本地文件</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="info-box">
      <strong>核心要点：</strong>函数 API 是"本地办事"，HTTP API 是"远程通信"。看文档时，函数关注参数和返回值，HTTP API 关注 Endpoint、认证和请求/响应格式。
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const activeTab = ref('compare')

const tabs = [
  { id: 'compare', name: '核心区别', icon: '🔍' },
  { id: 'docs', name: '文档对比', icon: '📚' },
  { id: 'quick', name: '快速判断', icon: '⚡' }
]
</script>

<style scoped>
.api-compare-root {
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

.tab-btn {
  flex: 1;
  padding: 12px 16px;
  background: transparent;
  border: none;
  border-right: 1px solid var(--vp-c-divider);
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  color: var(--vp-c-text-2);
}

.tab-btn:last-child {
  border-right: none;
}

.tab-btn:hover {
  background: var(--vp-c-bg-mute);
}

.tab-btn.active {
  background: var(--vp-c-brand);
  color: white;
}

.visualization-area {
  padding: 20px;
  background: var(--vp-c-bg);
}

/* 对比视图 */
.compare-view {
  width: 100%;
}

.compare-cards {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 16px;
  align-items: stretch;
}

@media (max-width: 768px) {
  .compare-cards {
    grid-template-columns: 1fr;
  }
  .vs-divider {
    display: none;
  }
}

.compare-card {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  overflow: hidden;
  background: var(--vp-c-bg-soft);
}

.card-header {
  padding: 12px 16px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  font-size: 0.95rem;
}

.card-header.function {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: white;
}

.card-header.http {
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  color: white;
}

.card-icon {
  font-size: 1.2rem;
}

.card-body {
  padding: 16px;
}

.feature-list {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-bottom: 16px;
}

@media (max-width: 480px) {
  .feature-list {
    grid-template-columns: 1fr;
  }
}

.feature-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 10px 12px;
  background: var(--vp-c-bg);
  border-radius: 6px;
  border: 1px solid var(--vp-c-divider);
}

.feature-label {
  font-size: 0.7rem;
  color: var(--vp-c-text-3);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.feature-value {
  font-size: 0.85rem;
  color: var(--vp-c-text-1);
  font-weight: 500;
}

.code-block {
  background: #0a0a0a;
  border-radius: 6px;
  overflow: hidden;
}

.code-label {
  padding: 8px 12px;
  background: #18181b;
  color: #71717a;
  font-size: 0.75rem;
  font-weight: 600;
  border-bottom: 1px solid #27272a;
}

.code-block pre {
  margin: 0;
  padding: 12px;
  color: #e4e4e7;
  font-size: 0.8rem;
  line-height: 1.6;
  overflow-x: auto;
}

.code-block code {
  font-family: 'Menlo', 'Monaco', 'Courier New', monospace;
}

.vs-divider {
  display: flex;
  align-items: center;
  justify-content: center;
}

.vs-text {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--vp-c-bg-alt);
  border: 2px solid var(--vp-c-divider);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

/* 文档视图 */
.docs-view {
  width: 100%;
}

.docs-cards {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

@media (max-width: 768px) {
  .docs-cards {
    grid-template-columns: 1fr;
  }
}

.doc-card {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  overflow: hidden;
  background: var(--vp-c-bg-soft);
}

.doc-header {
  padding: 14px 16px;
  background: var(--vp-c-bg-alt);
  border-bottom: 1px solid var(--vp-c-divider);
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  font-size: 0.95rem;
  color: var(--vp-c-text-1);
}

.doc-icon {
  font-size: 1.2rem;
}

.doc-content {
  padding: 16px;
}

.doc-section {
  margin-bottom: 16px;
}

.doc-section-title {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 10px;
}

.doc-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.doc-list li {
  padding: 6px 0;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  border-bottom: 1px dashed var(--vp-c-divider);
}

.doc-list li:last-child {
  border-bottom: none;
}

.doc-list strong {
  color: var(--vp-c-brand);
}

.doc-example {
  background: #0a0a0a;
  border-radius: 6px;
  overflow: hidden;
  margin-top: 12px;
}

.doc-example-label {
  padding: 8px 12px;
  background: #18181b;
  color: #71717a;
  font-size: 0.75rem;
  font-weight: 600;
  border-bottom: 1px solid #27272a;
}

.doc-example pre {
  margin: 0;
  padding: 12px;
  color: #e4e4e7;
  font-size: 0.75rem;
  line-height: 1.6;
  overflow-x: auto;
}

.doc-example code {
  font-family: 'Menlo', 'Monaco', 'Courier New', monospace;
}

/* 快速判断视图 */
.quick-view {
  width: 100%;
}

.quick-cards {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

@media (max-width: 768px) {
  .quick-cards {
    grid-template-columns: 1fr;
  }
}

.quick-card {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  overflow: hidden;
  background: var(--vp-c-bg-soft);
}

.quick-header {
  padding: 14px 16px;
  background: var(--vp-c-bg-alt);
  border-bottom: 1px solid var(--vp-c-divider);
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  font-size: 0.95rem;
  color: var(--vp-c-text-1);
}

.quick-icon {
  font-size: 1.2rem;
}

.quick-content {
  padding: 16px;
}

.decision-tree {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.decision-item {
  padding: 14px;
  background: var(--vp-c-bg);
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
}

.decision-question {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  margin-bottom: 6px;
}

.decision-question code {
  background: var(--vp-c-bg-mute);
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 0.8rem;
}

.decision-answer {
  font-size: 0.9rem;
  color: var(--vp-c-text-1);
  font-weight: 600;
}

.decision-example {
  font-size: 0.75rem;
  color: var(--vp-c-text-3);
  margin-top: 6px;
  padding-top: 6px;
  border-top: 1px dashed var(--vp-c-divider);
}

.decision-arrow {
  text-align: center;
  color: var(--vp-c-text-3);
  font-size: 1.2rem;
}

.scenario-table {
  display: flex;
  flex-direction: column;
  gap: 1px;
  background: var(--vp-c-divider);
  border-radius: 6px;
  overflow: hidden;
}

.scenario-row {
  display: grid;
  grid-template-columns: 1.2fr 1fr 1.2fr;
  gap: 12px;
  padding: 12px;
  background: var(--vp-c-bg);
  align-items: center;
}

.scenario-row.header {
  background: var(--vp-c-bg-alt);
  font-weight: 600;
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
}

.scenario-cell {
  font-size: 0.8rem;
  color: var(--vp-c-text-1);
}

.badge {
  display: inline-block;
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 600;
}

.badge.function {
  background: rgba(16, 185, 129, 0.15);
  color: #059669;
}

.badge.http {
  background: rgba(59, 130, 246, 0.15);
  color: #2563eb;
}

/* Info Box */
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
