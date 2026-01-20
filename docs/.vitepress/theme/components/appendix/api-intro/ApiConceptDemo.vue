<!--
  ApiConceptDemo.vue - 互动点餐版
  目标：通过"点菜"的过程演示 API 的三个核心要素
-->
<template>
  <div class="demo">
    <div class="header">
      <span class="icon">🍳</span>
      <span class="title">互动演示：向 AI 厨房点菜</span>
    </div>

    <div class="stepper">
      <!-- Step 1: Endpoint -->
      <div class="step-group">
        <div class="step-label">1. 跟谁说？(Endpoint)</div>
        <select v-model="endpoint" class="control">
          <option value="/kitchen/chef">👨‍🍳 主厨 (/kitchen/chef)</option>
          <option value="/kitchen/bar">🍸 调酒师 (/kitchen/bar)</option>
        </select>
      </div>

      <!-- Step 2: Method -->
      <div class="step-group">
        <div class="step-label">2. 怎么说？(Method)</div>
        <div class="toggle-group">
          <button 
            :class="['toggle-btn', { active: method === 'GET' }]"
            @click="method = 'GET'"
          >
            GET (看看有什么)
          </button>
          <button 
            :class="['toggle-btn', { active: method === 'POST' }]"
            @click="method = 'POST'"
          >
            POST (我要下单)
          </button>
        </div>
      </div>

      <!-- Step 3: Params -->
      <div class="step-group" v-if="method === 'POST'">
        <div class="step-label">3. 点什么？(Body)</div>
        <div class="params-editor">
          { "food": 
          <select v-model="food" class="inline-select">
            <option value="steak">🥩 牛排</option>
            <option value="pasta">🍝 意面</option>
            <option value="salad">🥗 沙拉</option>
          </select>
          }
        </div>
      </div>
      <div class="step-group" v-else>
        <div class="step-label">3. 查什么？(Params)</div>
        <div class="params-editor">
          ?type=
          <select v-model="menuType" class="inline-select">
            <option value="today">📅 今日特供</option>
            <option value="all">📜 全部菜单</option>
          </select>
        </div>
      </div>

      <!-- Action -->
      <button class="send-btn" @click="sendRequest" :disabled="loading">
        {{ loading ? '🍳 正在做...' : '🚀 发送请求' }}
      </button>
    </div>

    <!-- Result -->
    <div class="result-box" v-if="response">
      <div class="result-header">
        <span class="badge" :class="response.status === 200 ? 'success' : 'error'">
          {{ response.status }} {{ response.statusText }}
        </span>
      </div>
      <div class="result-content">
        {{ response.data }}
      </div>
      <div class="result-explanation">
        💡 <strong>解释：</strong> {{ response.explanation }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const endpoint = ref('/kitchen/chef')
const method = ref('GET')
const food = ref('steak')
const menuType = ref('today')
const loading = ref(false)
const response = ref(null)

// Reset response when inputs change
watch([endpoint, method, food, menuType], () => {
  response.value = null
})

function sendRequest() {
  loading.value = true
  response.value = null

  setTimeout(() => {
    loading.value = false
    
    // Logic for different combinations
    if (endpoint.value === '/kitchen/bar') {
      if (method.value === 'GET') {
        response.value = {
          status: 200,
          statusText: 'OK',
          data: { menu: ['Mojito', 'Martini', 'Beer'] },
          explanation: '你问调酒师有哪些酒，他给了你酒单。'
        }
      } else {
        response.value = {
          status: 400,
          statusText: 'Bad Request',
          data: { error: "Bar only serves drinks, not food!" },
          explanation: '你试图向调酒师点菜（牛排/意面），他拒绝了你。你应该去 /kitchen/chef 点菜，或者只点酒。'
        }
      }
      return
    }

    // Chef logic
    if (method.value === 'GET') {
      response.value = {
        status: 200,
        statusText: 'OK',
        data: { specials: ['Spicy Chicken', 'Tofu Soup'] },
        explanation: '你问主厨今天有什么特供，他告诉了你。'
      }
    } else {
      // POST to Chef
      const foodMap = {
        steak: '🥩 滋滋作响的牛排',
        pasta: '🍝 香气扑鼻的意面',
        salad: '🥗 新鲜健康的沙拉'
      }
      response.value = {
        status: 200,
        statusText: 'Created',
        data: { dish: foodMap[food.value], message: "Enjoy your meal!" },
        explanation: `你向主厨下了单 (${food.value})，主厨为你做好了菜。`
      }
    }
  }, 600)
}
</script>

<style scoped>
.demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
  margin: 24px 0;
  overflow: hidden;
}

.header {
  padding: 12px 20px;
  background: var(--vp-c-bg);
  border-bottom: 1px solid var(--vp-c-divider);
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 600;
}

.stepper {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.step-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.step-label {
  font-size: 13px;
  font-weight: 600;
  color: var(--vp-c-text-2);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.control, .inline-select {
  padding: 8px 12px;
  border-radius: 6px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font-size: 14px;
  cursor: pointer;
}

.toggle-group {
  display: flex;
  background: var(--vp-c-divider);
  padding: 2px;
  border-radius: 8px;
  width: fit-content;
}

.toggle-btn {
  padding: 6px 16px;
  border-radius: 6px;
  border: none;
  background: transparent;
  color: var(--vp-c-text-2);
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
}

.toggle-btn.active {
  background: var(--vp-c-bg);
  color: var(--vp-c-brand-1);
  font-weight: 600;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

.params-editor {
  font-family: monospace;
  background: var(--vp-c-bg);
  padding: 12px;
  border-radius: 6px;
  border: 1px solid var(--vp-c-divider);
  display: flex;
  align-items: center;
  gap: 8px;
}

.send-btn {
  margin-top: 8px;
  background: var(--vp-c-brand-1);
  color: white;
  border: none;
  padding: 12px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.2s;
}

.send-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.result-box {
  margin: 0 20px 20px;
  background: #1e293b;
  border-radius: 8px;
  overflow: hidden;
  color: #e2e8f0;
  font-family: monospace;
  animation: slideDown 0.3s ease;
}

.result-header {
  padding: 8px 12px;
  background: rgba(0,0,0,0.3);
  display: flex;
  align-items: center;
}

.badge {
  font-size: 12px;
  padding: 2px 6px;
  border-radius: 4px;
  font-weight: bold;
}

.badge.success { background: #22c55e; color: #fff; }
.badge.error { background: #ef4444; color: #fff; }

.result-content {
  padding: 16px;
  white-space: pre-wrap;
}

.result-explanation {
  padding: 12px;
  background: #334155;
  font-family: var(--vp-font-family-base);
  font-size: 13px;
  border-top: 1px solid rgba(255,255,255,0.1);
}

@keyframes slideDown {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
