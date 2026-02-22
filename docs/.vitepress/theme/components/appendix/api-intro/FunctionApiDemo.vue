<!--
  FunctionApiDemo.vue - 紧凑版
  目标：展示函数就是最基础的 API
-->
<template>
  <div class="demo-root">
    <div class="demo-header">
      <span class="icon">🔧</span>
      <span class="title">函数就是最基础的 API</span>
    </div>

    <div class="demo-layout">
      <div class="code-panel">
        <div class="code-title">📝 Python 代码</div>
        <pre><code><span class="keyword">def</span> <span class="func">greet</span>(name, greeting=<span class="str">"你好"</span>):
    <span class="keyword">return</span> <span class="str">f"{greeting}，{name}！"</span>

result = <span class="func">greet</span>(<span class="str">"张三"</span>)</code></pre>
      </div>

      <div class="right-panel">
        <div class="api-structure">
          <div class="structure-item">
            <span class="label">📦 输入（参数）</span>
            <code class="value">name="张三"</code>
          </div>
          <div class="structure-item">
            <span class="label">⚙️ 处理</span>
            <span class="value">函数内部拼接字符串</span>
          </div>
          <div class="structure-item">
            <span class="label">📤 输出（返回）</span>
            <code class="value highlight">"你好，张三！"</code>
          </div>
        </div>

        <div class="try-area">
          <div class="try-row">
            <input v-model="name" placeholder="名字" class="input" />
            <select v-model="greeting" class="select">
              <option value="你好">你好</option>
              <option value="Hello">Hello</option>
              <option value="早上好">早上好</option>
            </select>
            <button class="btn" @click="callFunction">调用</button>
          </div>
          <div v-if="result" class="result">
            → <code>{{ result }}</code>
          </div>
        </div>
      </div>
    </div>

    <div class="info-box">
      <strong>核心思想：</strong>
      <span
        >你不需要知道函数内部怎么实现，只需要知道怎么调用它。这就是 API
        的本质。</span
      >
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const name = ref('张三')
const greeting = ref('你好')
const result = ref('')

function callFunction() {
  result.value = `${greeting.value}，${name.value}！`
}
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
  gap: 0;
}

.code-panel {
  flex: 1;
  background: #1e293b;
  padding: 12px 14px;
  border-right: 1px solid var(--vp-c-divider);
}

.code-title {
  color: #94a3b8;
  font-size: 0.75rem;
  margin-bottom: 8px;
}

.code-panel pre {
  margin: 0;
  font-family: 'Menlo', 'Monaco', monospace;
  font-size: 0.75rem;
  line-height: 1.6;
}

.code-panel code {
  color: #e2e8f0;
}
.keyword {
  color: #c084fc;
}
.func {
  color: #60a5fa;
}
.str {
  color: #4ade80;
}

.right-panel {
  width: 260px;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  background: var(--vp-c-bg);
}

@media (max-width: 640px) {
  .demo-layout {
    flex-direction: column;
  }
  .code-panel {
    border-right: none;
    border-bottom: 1px solid var(--vp-c-divider);
  }
  .right-panel {
    width: 100%;
  }
}

.api-structure {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.structure-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6px 8px;
  background: var(--vp-c-bg-soft);
  border-radius: 4px;
  font-size: 0.75rem;
}

.structure-item .label {
  color: var(--vp-c-text-2);
}

.structure-item .value {
  font-family: monospace;
  font-size: 0.72rem;
}

.structure-item .highlight {
  background: #dcfce7;
  color: #166534;
  padding: 2px 6px;
  border-radius: 3px;
}

.try-area {
  padding: 10px;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
}

.try-row {
  display: flex;
  gap: 6px;
}

.input {
  flex: 1;
  padding: 6px 8px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  font-size: 0.8rem;
  background: var(--vp-c-bg);
}

.select {
  padding: 6px 8px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  font-size: 0.8rem;
  background: var(--vp-c-bg);
}

.btn {
  padding: 6px 12px;
  background: var(--vp-c-brand);
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
}

.result {
  margin-top: 8px;
  padding: 6px 8px;
  background: #dcfce7;
  border-radius: 4px;
  font-size: 0.8rem;
}

.result code {
  color: #166534;
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
