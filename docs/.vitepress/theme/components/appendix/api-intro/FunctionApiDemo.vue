<template>
  <div class="function-api-demo">
    <div class="header">
      <div class="title">🔧 你早就在用 API 了</div>
      <div class="subtitle">函数就是最基础的 API</div>
    </div>

    <div class="demo-container">
      <div class="left">
        <div class="code-panel">
          <div class="code-title">📝 代码</div>
          <pre><code><span class="keyword">def</span> <span class="function">greet</span>(name, greeting=<span class="string">"你好"</span>):
    <span class="keyword">return</span> f<span class="string">"{greeting}，{name}！"</span>

<span class="comment"># 调用这个函数</span>
result = <span class="function">greet</span>(<span class="string">"张三"</span>)
print(result)</code></pre>
        </div>
      </div>

      <div class="right">
        <div class="explanation">
          <p>这个 <code>greet()</code> 函数，就是一个 API：</p>
          
          <div class="point">
            <span class="icon">📦</span>
            <div>
              <strong>输入（参数）</strong>
              <p>你传进去什么？<code>"张三"</code></p>
            </div>
          </div>

          <div class="point">
            <span class="icon">⚙️</span>
            <div>
              <strong>处理</strong>
              <p>函数内部帮你做了拼接字符串的操作</p>
            </div>
          </div>

          <div class="point">
            <span class="icon">📤</span>
            <div>
              <strong>输出（返回值）</strong>
              <p>得到什么？<code>"你好，张三！"</code></p>
            </div>
          </div>
        </div>

        <div class="try-it">
          <div class="try-title">🎮 试试调用：</div>
          <div class="interactive">
            <input
              v-model="name"
              placeholder="输入名字"
              class="name-input"
            />
            <select v-model="greeting" class="greeting-select">
              <option value="你好">你好</option>
              <option value="Hello">Hello</option>
              <option value="早上好">早上好</option>
              <option value="晚安">晚安</option>
            </select>
            <button @click="callFunction" class="call-btn">调用 greet()</button>
          </div>
          <div class="result" v-if="result">
            <span class="arrow">→</span>
            <code>{{ result }}</code>
          </div>
        </div>
      </div>
    </div>

    <div class="summary">
      <div class="summary-item">
        <span class="icon">🔑</span>
        <p><strong>关键点：</strong> 你不需要知道函数内部是怎么实现的，只需要知道怎么调用它</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const name = ref('张三')
const greeting = ref('你好')
const result = ref('')

function greet(name, greeting) {
  return `${greeting}，${name}！`
}

function callFunction() {
  result.value = greet(name.value, greeting.value)
}
</script>

<style scoped>
.function-api-demo {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 20px;
  margin: 24px 0;
}

.header {
  text-align: center;
  margin-bottom: 20px;
}

.title {
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 4px;
}

.subtitle {
  font-size: 14px;
  color: var(--vp-c-text-2);
}

.demo-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

@media (max-width: 768px) {
  .demo-container {
    grid-template-columns: 1fr;
  }
}

.code-panel {
  background: #1e293b;
  border-radius: 10px;
  padding: 16px;
  font-family: monospace;
  font-size: 14px;
}

.code-title {
  color: #94a3b8;
  margin-bottom: 12px;
  font-size: 13px;
}

.code-panel code {
  color: #e2e8f0;
  line-height: 1.8;
}

.keyword {
  color: #c084fc;
}

.function {
  color: #60a5fa;
}

.string {
  color: #4ade80;
}

.comment {
  color: #64748b;
}

.explanation {
  margin-bottom: 20px;
}

.explanation > p {
  margin-bottom: 16px;
}

.point {
  display: flex;
  gap: 12px;
  margin-bottom: 12px;
  align-items: flex-start;
}

.point .icon {
  font-size: 20px;
}

.point strong {
  color: var(--vp-c-text-1);
}

.point p {
  margin: 4px 0 0;
  font-size: 13px;
  color: var(--vp-c-text-2);
}

.try-it {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  padding: 16px;
}

.try-title {
  font-weight: 600;
  margin-bottom: 12px;
}

.interactive {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.name-input {
  flex: 1;
  min-width: 120px;
  padding: 8px 12px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  font-size: 14px;
}

.greeting-select {
  padding: 8px 12px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  font-size: 14px;
  background: var(--vp-c-bg);
}

.call-btn {
  padding: 8px 16px;
  background: var(--vp-c-brand);
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
}

.result {
  margin-top: 16px;
  padding: 12px;
  background: #dcfce7;
  border-radius: 6px;
  font-size: 14px;
}

.result .arrow {
  margin-right: 8px;
}

.result code {
  color: #166534;
}

.summary {
  margin-top: 20px;
  padding-top: 16px;
  border-top: 1px solid var(--vp-c-divider);
}

.summary-item {
  display: flex;
  gap: 12px;
  align-items: center;
  font-size: 14px;
  color: var(--vp-c-text-2);
}

.summary-item .icon {
  font-size: 20px;
}
</style>
