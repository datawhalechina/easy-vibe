<template>
  <div class="memory-demo">
    <div class="header">
      <div class="title">💾 Agent 的记忆系统</div>
    </div>

    <!-- 快捷操作 -->
    <div class="quick-actions">
      <button
        v-for="action in quickActions"
        :key="action"
        class="action-btn"
        @click="sendMessage(action)"
        :disabled="isTyping"
      >
        {{ action }}
      </button>
      <button class="action-btn reset" @click="resetConversation">🔄 重置</button>
    </div>

    <!-- 主区域 -->
    <div class="main-area">
      <!-- 对话区 -->
      <div class="chat-box">
        <div class="box-header">💬 对话</div>
        <div class="messages" ref="chatContainer">
          <div v-for="(msg, i) in messages.slice(-4)" :key="i" class="msg-row" :class="msg.role">
            <span class="avatar">{{ msg.role === 'user' ? '👤' : '🤖' }}</span>
            <span class="text">{{ msg.content }}</span>
          </div>
          <div v-if="isTyping" class="msg-row assistant typing">
            <span class="avatar">🤖</span>
            <span class="dots"><span></span><span></span><span></span></span>
          </div>
          <div v-if="messages.length === 0" class="empty-msg">点击上方按钮开始对话</div>
        </div>
      </div>

      <!-- 三种记忆并排 -->
      <div class="memory-row">
        <div class="memory-card">
          <div class="card-header">
            <span>⏱️ 短期记忆</span>
            <span class="count">{{ shortTermMemory.length }}</span>
          </div>
          <div class="card-body">
            <div v-for="(item, i) in shortTermMemory.slice(-3)" :key="i" class="mem-item">
              <span class="role">{{ item.role === 'user' ? 'U' : 'A' }}</span>
              <span class="content">{{ truncate(item.content, 20) }}</span>
            </div>
            <div v-if="shortTermMemory.length === 0" class="empty">空</div>
          </div>
        </div>

        <div class="memory-card">
          <div class="card-header">
            <span>📝 工作记忆</span>
            <span class="count">{{ Object.keys(workingMemory).length }}</span>
          </div>
          <div class="card-body">
            <div v-for="(v, k) in workingMemory" :key="k" class="mem-item kv">
              <span class="key">{{ k }}</span>
              <span class="value">{{ v }}</span>
            </div>
            <div v-if="Object.keys(workingMemory).length === 0" class="empty">空</div>
          </div>
        </div>

        <div class="memory-card">
          <div class="card-header">
            <span>🗄️ 长期记忆</span>
            <span class="count">{{ longTermMemory.length }}</span>
          </div>
          <div class="card-body">
            <div v-for="(item, i) in longTermMemory.slice(-2)" :key="i" class="mem-item">
              <span class="tag">{{ item.category }}</span>
              <span class="content">{{ item.content }}</span>
            </div>
            <div v-if="longTermMemory.length === 0" class="empty">空</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 记忆操作提示 -->
    <div v-if="lastOp" class="op-bar">
      <span>{{ lastOp.icon }}</span>
      <span>{{ lastOp.text }}</span>
    </div>

    <!-- 提示 -->
    <div class="tip-bar">
      <span>💡</span>
      <span><strong>短期</strong>=当前对话，<strong>工作</strong>=临时变量，<strong>长期</strong>=跨会话知识</span>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick } from 'vue'

const messages = ref([])
const shortTermMemory = ref([])
const workingMemory = ref({})
const longTermMemory = ref([])
const isTyping = ref(false)
const lastOp = ref(null)

const quickActions = [
  '我叫张三',
  '我喜欢 Python',
  '推荐编程书',
  '我叫什么？'
]

const responses = {
  '我叫张三': {
    reply: '好的，我记住了你叫张三。',
    op: { icon: '💾', text: '长期记忆: 姓名=张三' },
    update: () => longTermMemory.value.push({ category: '身份', content: '姓名: 张三' })
  },
  '我喜欢 Python': {
    reply: '收到！记录了你偏好 Python。',
    op: { icon: '💾', text: '工作记忆: 偏好=Python | 长期记忆: 技术偏好' },
    update: () => {
      workingMemory.value['偏好'] = 'Python'
      longTermMemory.value.push({ category: '偏好', content: '编程语言: Python' })
    }
  },
  '推荐编程书': {
    reply: '基于你偏好 Python，推荐《流畅的Python》。',
    op: { icon: '🔍', text: '检索工作记忆: 偏好=Python → 生成推荐' }
  },
  '我叫什么？': {
    reply: '你叫张三。',
    op: { icon: '🔍', text: '检索长期记忆: 姓名=张三' }
  }
}

const sendMessage = async (text) => {
  messages.value.push({ role: 'user', content: text })
  shortTermMemory.value.push({ role: 'user', content: text })
  isTyping.value = true
  scrollToBottom()

  await wait(600)

  const config = responses[text] || { reply: '收到', op: null, update: () => {} }
  config.update()
  lastOp.value = config.op

  messages.value.push({ role: 'assistant', content: config.reply })
  shortTermMemory.value.push({ role: 'assistant', content: config.reply })
  isTyping.value = false
  scrollToBottom()
}

const resetConversation = () => {
  messages.value = []
  shortTermMemory.value = []
  workingMemory.value = {}
  longTermMemory.value = []
  lastOp.value = null
  isTyping.value = false
}

const scrollToBottom = async () => {
  await nextTick()
  const container = document.querySelector('.messages')
  if (container) container.scrollTop = container.scrollHeight
}

const truncate = (text, len) => text.length > len ? text.slice(0, len) + '...' : text
const wait = (ms) => new Promise(r => setTimeout(r, ms))
</script>

<style scoped>
.memory-demo {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 20px;
  margin: 20px 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.header {
  text-align: center;
  margin-bottom: 16px;
}

.title {
  font-size: 17px;
  font-weight: 700;
  background: linear-gradient(120deg, var(--vp-c-brand), #9c27b0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* 快捷操作 */
.quick-actions {
  display: flex;
  gap: 8px;
  justify-content: center;
  margin-bottom: 16px;
  flex-wrap: wrap;
}

.action-btn {
  padding: 8px 14px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 16px;
  background: var(--vp-c-bg);
  cursor: pointer;
  font-size: 13px;
  transition: all 0.2s;
}

.action-btn:hover:not(:disabled) {
  background: var(--vp-c-brand-soft);
  border-color: var(--vp-c-brand);
}

.action-btn.reset {
  background: #fee2e2;
  border-color: #fecaca;
  color: #991b1b;
}

.action-btn:disabled { opacity: 0.5; cursor: not-allowed; }

/* 主区域 */
.main-area {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 12px;
  margin-bottom: 16px;
}

@media (max-width: 768px) {
  .main-area { grid-template-columns: 1fr; }
}

/* 对话区 */
.chat-box {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  overflow: hidden;
}

.box-header {
  padding: 10px 12px;
  background: var(--vp-c-bg-soft);
  border-bottom: 1px solid var(--vp-c-divider);
  font-size: 12px;
  font-weight: 600;
}

.messages {
  padding: 12px;
  min-height: 120px;
  max-height: 160px;
  overflow-y: auto;
}

.msg-row {
  display: flex;
  gap: 8px;
  margin-bottom: 10px;
  align-items: flex-start;
}

.msg-row.user { flex-direction: row-reverse; }

.avatar {
  font-size: 14px;
  flex-shrink: 0;
}

.text {
  padding: 8px 12px;
  border-radius: 10px;
  font-size: 12px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
}

.msg-row.user .text {
  background: var(--vp-c-brand);
  color: white;
  border-color: var(--vp-c-brand);
}

.dots {
  display: flex;
  gap: 4px;
  padding: 8px 12px;
  background: var(--vp-c-bg-soft);
  border-radius: 10px;
}

.dots span {
  width: 6px;
  height: 6px;
  background: var(--vp-c-text-3);
  border-radius: 50%;
  animation: bounce 1.4s infinite;
}

.dots span:nth-child(1) { animation-delay: 0s; }
.dots span:nth-child(2) { animation-delay: 0.2s; }
.dots span:nth-child(3) { animation-delay: 0.4s; }

@keyframes bounce {
  0%, 80%, 100% { transform: scale(0); }
  40% { transform: scale(1); }
}

.empty-msg {
  text-align: center;
  color: var(--vp-c-text-3);
  padding: 40px 0;
  font-size: 12px;
}

/* 记忆行 */
.memory-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
}

@media (max-width: 600px) {
  .memory-row { grid-template-columns: 1fr; }
}

.memory-card {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  overflow: hidden;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 12px;
  background: var(--vp-c-bg-soft);
  border-bottom: 1px solid var(--vp-c-divider);
  font-size: 12px;
  font-weight: 600;
}

.count {
  padding: 2px 8px;
  background: var(--vp-c-bg);
  border-radius: 10px;
  font-size: 11px;
  color: var(--vp-c-text-2);
}

.card-body {
  padding: 10px;
  min-height: 80px;
}

.mem-item {
  display: flex;
  gap: 6px;
  padding: 6px 8px;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  margin-bottom: 6px;
  font-size: 11px;
  align-items: center;
}

.mem-item .role {
  font-weight: 600;
  color: var(--vp-c-brand);
  min-width: 14px;
}

.mem-item .content {
  color: var(--vp-c-text-1);
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.mem-item.kv .key {
  font-weight: 600;
  color: var(--vp-c-brand);
}

.mem-item.kv .value {
  color: var(--vp-c-text-1);
}

.mem-item .tag {
  padding: 1px 6px;
  background: var(--vp-c-brand-soft);
  border-radius: 4px;
  font-size: 10px;
  color: var(--vp-c-brand-dark);
}

.empty {
  text-align: center;
  color: var(--vp-c-text-3);
  padding: 20px 0;
  font-size: 12px;
}

/* 操作提示 */
.op-bar {
  display: flex;
  gap: 8px;
  padding: 10px 14px;
  background: #dcfce7;
  border-radius: 8px;
  margin-bottom: 16px;
  font-size: 12px;
  color: #166534;
}

/* 提示 */
.tip-bar {
  display: flex;
  gap: 8px;
  padding: 10px 14px;
  background: var(--vp-c-brand-soft);
  border-radius: 8px;
  font-size: 12px;
  color: var(--vp-c-text-1);
}
</style>
