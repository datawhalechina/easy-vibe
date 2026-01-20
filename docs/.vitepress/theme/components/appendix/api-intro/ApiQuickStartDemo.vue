<!--
  ApiQuickStartDemo.vue - 简化版
  目标：用最简单的交互展示 API 调用流程
-->
<template>
  <div class="demo">
    <div class="title">🎮 试试看：调用一次 API</div>
    <p class="subtitle">点一下按钮，看看会发生什么</p>

    <div class="box">
      <button class="call-btn" :disabled="calling" @click="callApi">
        {{ calling ? '调用中...' : '🔘 点我调用 API' }}
      </button>

      <div class="result" v-if="result">
        <div class="success" v-if="result.success">
          ✅ 成功！API 返回了：{{ result.data }}
        </div>
        <div class="error" v-else>
          ❌ 失败了：{{ result.error }}
        </div>
      </div>
    </div>

    <div class="explain">
      <p><strong>你看：</strong>你只需要点一下按钮（调用 API），就会得到结果。</p>
      <p>这就是 API 的本质：<strong>按约定把请求交给对方，对方按约定把结果给你</strong>。</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const calling = ref(false)
const result = ref(null)

function callApi() {
  calling.value = true
  result.value = null

  // 模拟 API 调用
  setTimeout(() => {
    result.value = {
      success: true,
      data: 'Hello from API!'
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

.box {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 20px;
  text-align: center;
}

.call-btn {
  background: var(--vp-c-brand-1);
  color: white;
  border: none;
  padding: 12px 24px;
  font-size: 16px;
  font-weight: bold;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
}

.call-btn:hover:not(:disabled) {
  opacity: 0.9;
  transform: scale(1.05);
}

.call-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.result {
  margin-top: 16px;
  padding: 12px;
  border-radius: 8px;
  font-size: 14px;
}

.success {
  background: #dcfce7;
  color: #166534;
  border: 1px solid #86efac;
}

.error {
  background: #fee2e2;
  color: #991b1b;
  border: 1px solid #fca5a5;
}

.explain {
  margin-top: 16px;
  padding: 12px;
  background: var(--vp-c-bg);
  border-radius: 8px;
  font-size: 14px;
  line-height: 1.6;
  color: var(--vp-c-text-2);
}
</style>
