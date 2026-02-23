<template>
  <div class="api-types-demo">
    <div class="switch-bar">
      <button
        v-for="type in types"
        :key="type.id"
        :class="{ active: active === type.id }"
        @click="active = type.id"
      >
        {{ type.icon }} {{ type.name }}
      </button>
    </div>

    <div class="display-area">
      <div class="info-grid">
        <div class="info-item">
          <span class="label">调用对象</span>
          <span class="value">{{ currentType.target }}</span>
        </div>
        <div class="info-item">
          <span class="label">通信方式</span>
          <span class="value">{{ currentType.comm }}</span>
        </div>
        <div class="info-item">
          <span class="label">延迟</span>
          <span class="value">{{ currentType.latency }}</span>
        </div>
        <div class="info-item">
          <span class="label">典型场景</span>
          <span class="value">{{ currentType.scenarios }}</span>
        </div>
      </div>

      <div class="code-preview">
        <div class="code-header">{{ currentType.name }} 示例</div>
        <pre><code>{{ currentType.example }}</code></pre>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const active = ref('function')

const types = [
  {
    id: 'function',
    icon: '📦',
    name: '函数 API',
    target: '本地代码库',
    comm: '函数调用',
    latency: '纳秒级',
    scenarios: '数据处理、文件操作',
    example: `len("hello")           # 返回 5
max([1, 5, 3])         # 返回 5
open("file.txt").read() # 读取文件`
  },
  {
    id: 'system',
    icon: '⚙️',
    name: '操作系统 API',
    target: '操作系统内核',
    comm: '系统调用',
    latency: '微秒级',
    scenarios: '文件操作、进程管理',
    example: `with open("file.txt", "r") as f:
    content = f.read()

subprocess.run(["ls", "-l"])`
  },
  {
    id: 'web',
    icon: '🌐',
    name: 'Web API',
    target: '远程服务器',
    comm: 'HTTP 请求',
    latency: '毫秒级',
    scenarios: 'AI 调用、数据获取',
    example: `requests.post(
    "https://api.deepseek.com/v1/chat/completions",
    json={"model": "deepseek-chat", "messages": [...]}
)`
  }
]

const currentType = computed(() => {
  return types.find((t) => t.id === active.value) || types[0]
})
</script>

<style scoped>
.api-types-demo {
  margin: 20px 0;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  overflow: hidden;
}

.switch-bar {
  display: flex;
  gap: 0;
  border-bottom: 1px solid var(--vp-c-divider);
}

.switch-bar button {
  flex: 1;
  padding: 10px 16px;
  background: var(--vp-c-bg);
  border: none;
  border-right: 1px solid var(--vp-c-divider);
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;
  color: var(--vp-c-text-2);
}

.switch-bar button:last-child {
  border-right: none;
}

.switch-bar button:hover {
  background: var(--vp-c-bg-mute);
}

.switch-bar button.active {
  background: var(--vp-c-brand);
  color: white;
}

.display-area {
  padding: 16px;
  background: var(--vp-c-bg);
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  margin-bottom: 12px;
}

@media (max-width: 768px) {
  .info-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 10px;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
}

.label {
  font-size: 10px;
  color: var(--vp-c-text-3);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.value {
  font-size: 12px;
  color: var(--vp-c-text-1);
  font-weight: 500;
}

.code-preview {
  background: #0a0a0a;
  border-radius: 6px;
  overflow: hidden;
}

.code-header {
  padding: 8px 12px;
  background: #18181b;
  color: #71717a;
  font-size: 11px;
  font-weight: 600;
  border-bottom: 1px solid #27272a;
}

.code-preview pre {
  margin: 0;
  padding: 12px;
  color: #e4e4e7;
  font-size: 11px;
  line-height: 1.5;
  overflow-x: auto;
}

.code-preview code {
  font-family: 'Menlo', 'Monaco', monospace;
}
</style>
