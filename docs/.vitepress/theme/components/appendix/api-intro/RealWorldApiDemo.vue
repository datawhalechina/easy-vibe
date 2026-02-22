<!--
  RealWorldApiDemo.vue - 紧凑版
  目标：对比 HTTP 调用和 SDK 调用
-->
<template>
  <div class="demo-root">
    <div class="demo-header">
      <span class="icon">⚡</span>
      <span class="title">HTTP vs SDK：自己跑腿还是让管家代办？</span>
    </div>

    <div class="demo-layout">
      <div class="tabs">
        <button
          :class="['tab', { active: mode === 'http' }]"
          @click="mode = 'http'"
        >
          HTTP API
        </button>
        <button
          :class="['tab', { active: mode === 'sdk' }]"
          @click="mode = 'sdk'"
        >
          SDK
        </button>
      </div>

      <div class="code-area">
        <div class="code-header">
          <span>{{
            mode === 'http' ? '自己处理所有细节' : '管家帮你处理'
          }}</span>
        </div>
        <pre
          class="code"
        ><code>{{ mode === 'http' ? httpCode : sdkCode }}</code></pre>
      </div>

      <div class="compare-panel">
        <div class="compare-title">对比</div>
        <div class="compare-list">
          <div class="compare-item">
            <span class="ci-label">代码量</span>
            <span class="ci-val">{{ mode === 'http' ? '多' : '少' }}</span>
          </div>
          <div class="compare-item">
            <span class="ci-label">错误处理</span>
            <span class="ci-val">{{
              mode === 'http' ? '自己写' : '自动处理'
            }}</span>
          </div>
          <div class="compare-item">
            <span class="ci-label">重试逻辑</span>
            <span class="ci-val">{{
              mode === 'http' ? '自己写' : '内置'
            }}</span>
          </div>
          <div class="compare-item">
            <span class="ci-label">类型提示</span>
            <span class="ci-val">{{ mode === 'http' ? '无' : '有' }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="info-box">
      <strong>核心思想：</strong>
      <span>能用 SDK 就用 SDK，把麻烦事留给库，把时间留给自己。</span>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const mode = ref('sdk')

const httpCode = `import requests

response = requests.post(
    "https://api.deepseek.com/v1/chat/completions",
    headers={
        "Authorization": "Bearer sk-xxx",
        "Content-Type": "application/json"
    },
    json={
        "model": "deepseek-chat",
        "messages": [{"role": "user", "content": "你好"}]
    }
)

if response.status_code == 200:
    result = response.json()
    content = result["choices"][0]["message"]["content"]
else:
    # 处理错误...
    pass`

const sdkCode = `from openai import OpenAI

client = OpenAI(
    api_key="sk-xxx",
    base_url="https://api.deepseek.com"
)

response = client.chat.completions.create(
    model="deepseek-chat",
    messages=[{"role": "user", "content": "你好"}]
)

content = response.choices[0].message.content`
</script>

<style scoped>
.demo-root {
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  overflow: hidden;
  background: var(--vp-c-bg-soft);
  margin: 1rem 0;
  font-size: 0.85rem;
}

.demo-header {
  padding: 10px 16px;
  background: var(--vp-c-bg);
  border-bottom: 1px solid var(--vp-c-divider);
  display: flex;
  align-items: center;
  gap: 8px;
}

.icon {
  font-size: 18px;
}
.title {
  font-weight: 600;
  font-size: 0.9rem;
}

.demo-layout {
  display: flex;
  flex-direction: column;
}

.tabs {
  display: flex;
  gap: 4px;
  padding: 10px 12px;
  background: var(--vp-c-bg);
}

.tab {
  padding: 6px 16px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: transparent;
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.2s;
}

.tab.active {
  background: var(--vp-c-brand);
  color: white;
  border-color: var(--vp-c-brand);
}

.code-area {
  background: #1e293b;
}

.code-header {
  padding: 6px 12px;
  font-size: 0.75rem;
  color: #94a3b8;
  border-bottom: 1px solid #334155;
}

.code {
  margin: 0;
  padding: 12px;
  font-family: 'Menlo', 'Monaco', monospace;
  font-size: 0.72rem;
  line-height: 1.5;
  color: #e2e8f0;
  overflow-x: auto;
  white-space: pre;
}

.compare-panel {
  padding: 12px;
  background: var(--vp-c-bg);
}

.compare-title {
  font-size: 0.8rem;
  font-weight: 600;
  margin-bottom: 8px;
}

.compare-list {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.compare-item {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 10px;
  background: var(--vp-c-bg-soft);
  border-radius: 4px;
  font-size: 0.75rem;
}

.ci-label {
  color: var(--vp-c-text-2);
}

.ci-val {
  font-weight: 600;
}

.info-box {
  display: flex;
  gap: 0.25rem;
  padding: 10px 14px;
  background: var(--vp-c-bg-alt);
  border-top: 1px solid var(--vp-c-divider);
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
}

.info-box strong {
  white-space: nowrap;
  flex-shrink: 0;
}
</style>
