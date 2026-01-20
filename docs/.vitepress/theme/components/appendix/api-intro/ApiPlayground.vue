<!--
  ApiPlayground.vue - 简化版
  目标：用最简单的演示展示 API 调用的各种情况
-->
<template>
  <div class="demo">
    <div class="title">🎮 练习场：试试调用 API</div>
    <p class="subtitle">体验一下成功和失败的情况</p>

    <div class="playground">
      <div class="controls">
        <div class="control-group">
          <label>🔑 钥匙（API Key）：</label>
          <button
            :class="['toggle', { active: hasKey }]"
            @click="hasKey = !hasKey"
          >
            {{ hasKey ? '✅ 有钥匙' : '❌ 没有钥匙' }}
          </button>
        </div>

        <div class="control-group">
          <label>📍 用户 ID：</label>
          <input
            v-model="userId"
            class="input"
            placeholder="例如：u_123"
          />
        </div>

        <button class="call-btn" :disabled="calling" @click="callApi">
          {{ calling ? '调用中...' : '🚀 调用 API' }}
        </button>
      </div>

      <div class="result-area">
        <div v-if="!result" class="placeholder">
          还没有结果。点一下"调用 API"试试！
        </div>
        <div v-else class="result" :class="result.type">
          <div class="result-header">
            {{ result.type === 'success' ? '✅ 成功' : '❌ 失败' }}
          </div>
          <div class="result-body">{{ result.message }}</div>
        </div>
      </div>

      <div class="tips">
        <p><strong>💡 玩法建议：</strong></p>
        <ul>
          <li>试试把"钥匙"改成"没有钥匙"，看看会发生什么</li>
          <li>试试把 ID 改成 <code>u_404</code>，看看会怎样</li>
          <li>连续快速点击，看看"限流"提示</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const hasKey = ref(true)
const userId = ref('u_123')
const calling = ref(false)
const result = ref(null)
const callCount = ref([])
const now = ref(Date.now())

function callApi() {
  calling.value = true
  result.value = null

  // 模拟限流
  const currentTime = Date.now()
  callCount.value = callCount.value.filter(t => currentTime - t < 2000)
  callCount.value.push(currentTime)

  if (callCount.value.length >= 4) {
    setTimeout(() => {
      result.value = {
        type: 'error',
        message: '太频繁了！请慢一点再试（限流）'
      }
      calling.value = false
    }, 300)
    return
  }

  setTimeout(() => {
    // 检查钥匙
    if (!hasKey.value) {
      result.value = {
        type: 'error',
        message: '没有钥匙！你没有权限调用这个 API（401 未授权）'
      }
      calling.value = false
      return
    }

    // 检查用户 ID
    const id = userId.value.trim()
    if (!id) {
      result.value = {
        type: 'error',
        message: '你还没填用户 ID！'
      }
      calling.value = false
      return
    }

    if (id === 'u_404') {
      result.value = {
        type: 'error',
        message: '找不到这个用户！ID 不存在（404）'
      }
      calling.value = false
      return
    }

    // 成功
    result.value = {
      type: 'success',
      message: `成功获取用户信息：\nID: ${id}\n姓名: 张三\n邮箱: zhang@example.com`
    }
    calling.value = false
  }, 800)
}
</script>

<style scoped>
.demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 20px;
  background: var(--vp-c-bg-soft);
  margin: 16px 0;
}

.title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 8px;
  color: var(--vp-c-text-1);
}

.subtitle {
  color: var(--vp-c-text-2);
  margin-bottom: 16px;
}

.playground {
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 20px;
}

.controls {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 20px;
}

.control-group {
  display: flex;
  align-items: center;
  gap: 12px;
}

.control-group label {
  font-weight: bold;
  font-size: 14px;
  min-width: 120px;
}

.toggle {
  padding: 8px 16px;
  border: 2px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  cursor: pointer;
  font-size: 13px;
  font-weight: bold;
  transition: all 0.2s;
}

.toggle.active {
  border-color: #22c55e;
  background: #dcfce7;
  color: #166534;
}

.input {
  flex: 1;
  padding: 8px 12px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  font-size: 14px;
  background: var(--vp-c-bg-soft);
}

.call-btn {
  width: 100%;
  padding: 12px 20px;
  background: var(--vp-c-brand-1);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s;
}

.call-btn:hover:not(:disabled) {
  opacity: 0.9;
}

.call-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.result-area {
  min-height: 120px;
  margin-bottom: 20px;
}

.placeholder {
  padding: 20px;
  text-align: center;
  color: var(--vp-c-text-2);
  font-style: italic;
}

.result {
  border: 2px solid;
  border-radius: 8px;
  overflow: hidden;
}

.result.success {
  border-color: #22c55e;
  background: #f0fdf4;
}

.result.error {
  border-color: #ef4444;
  background: #fef2f2;
}

.result-header {
  padding: 12px 16px;
  font-weight: bold;
  font-size: 14px;
}

.result.success .result-header {
  background: #dcfce7;
  color: #166534;
}

.result.error .result-header {
  background: #fee2e2;
  color: #991b1b;
}

.result-body {
  padding: 12px 16px;
  font-size: 13px;
  white-space: pre-line;
  line-height: 1.6;
}

.tips {
  background: var(--vp-c-bg-soft);
  padding: 16px;
  border-radius: 8px;
  font-size: 13px;
  line-height: 1.6;
}

.tips p {
  margin-bottom: 8px;
}

.tips ul {
  margin: 0;
  padding-left: 20px;
}

.tips li {
  margin: 4px 0;
}

.tips code {
  background: #1e293b;
  color: #e2e8f0;
  padding: 2px 6px;
  border-radius: 4px;
  font-family: 'Monaco', 'Menlo', monospace;
  font-size: 12px;
}
</style>
