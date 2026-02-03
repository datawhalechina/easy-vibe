<!--
  SlidingWindowDemo.vue
  滑动窗口机制演示

  用途：
  展示 "Sliding Window" (滑动窗口) 如何处理长对话。
  当新消息进入时，最旧的消息被移除上下文，演示遗忘机制。

  交互功能：
  - 发送消息：用户可发送消息，AI 自动回复。
  - 自动演示：一键模拟长对话，观察窗口滑动。
  - 视觉反馈：清晰展示哪些消息在"窗口内"（活跃），哪些在"窗口外"（遗忘）。
-->
<template>
  <div class="sliding-window-demo">
    <div class="control-panel">
      <div class="info-stat">
        <span class="label">窗口里最多能记住几条对话</span>
        <span class="value">最多 {{ windowSize }} 条</span>
      </div>
      <div class="actions">
        <button class="action-btn" @click="autoPlay" :disabled="isAutoPlaying">
          ▶ 自动演示
        </button>
        <button class="action-btn outline" @click="reset">
          ↺ 重新开始
        </button>
      </div>
    </div>

    <div class="visualization-area">
      <div class="conversation-stream">
        <!-- Forgotten / History Zone -->
        <div class="zone history-zone">
          <div class="zone-label">
            <span class="icon">🗑️</span> 已被遗忘的内容
          </div>
          <transition-group name="fade-list">
            <div
              v-for="msg in historyMessages"
              :key="msg.id"
              class="message-bubble history"
              :class="msg.role.toLowerCase()"
            >
              <div class="avatar">{{ msg.role === 'User' ? '👤' : '🤖' }}</div>
              <div class="content">
                <div class="role-name">{{ msg.role }}</div>
                <div class="text">{{ msg.content }}</div>
              </div>
            </div>
          </transition-group>
          <div v-if="historyMessages.length === 0" class="empty-placeholder">
            这里暂时还没有被“挤出去”的对话
          </div>
        </div>

        <!-- Divider -->
        <div class="window-divider">
          <span>⬆ 窗口外（模型已经看不到）</span>
          <div class="divider-line"></div>
          <span>⬇ 窗口内（模型还能看到）</span>
        </div>

        <!-- Active Window Zone -->
        <div class="zone active-zone">
          <div class="zone-label">
            <span class="icon">🖼️</span> 当前还在记忆里的对话
          </div>
          <transition-group name="slide-list">
            <div
              v-for="msg in activeMessages"
              :key="msg.id"
              class="message-bubble active"
              :class="msg.role.toLowerCase()"
            >
              <div class="avatar">{{ msg.role === 'User' ? '👤' : '🤖' }}</div>
              <div class="content">
                <div class="role-name">{{ msg.role }}</div>
                <div class="text">{{ msg.content }}</div>
              </div>
            </div>
          </transition-group>
          <div v-if="activeMessages.length === 0" class="empty-placeholder">
            从这里开始聊天，看看旧对话是怎么被“挤出去”的
          </div>
        </div>
      </div>
    </div>

    <div class="input-section">
      <input
        v-model="newMessage"
        @keyup.enter="sendMessage"
        placeholder="在这里输入一条消息，然后点发送"
        :disabled="isAutoPlaying"
      />
      <button class="send-btn" @click="sendMessage" :disabled="!newMessage.trim() || isAutoPlaying">
        发送消息
      </button>
    </div>

    <div class="info-box">
      <p>
        <span class="icon">💡</span>
        <strong>说明：</strong>
        滑动窗口是最简单的记忆管理方式：新的进来，旧的出去。
        好处是永远不会“撑爆脑子”，代价就是——一旦滑出窗口（上面灰色区域），模型就完全忘了它存在过。
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const windowSize = 4
const messages = ref([])
const newMessage = ref('')
const isAutoPlaying = ref(false)
let msgId = 0

const activeMessages = computed(() => {
  return messages.value.slice(-windowSize)
})

const historyMessages = computed(() => {
  return messages.value.slice(0, Math.max(0, messages.value.length - windowSize))
})

const sendMessage = () => {
  if (!newMessage.value.trim()) return

  addMessage('User', newMessage.value)
  const userText = newMessage.value
  newMessage.value = ''

  // Simulate AI response
  setTimeout(() => {
    addMessage('AI', `I heard you say "${userText}". Interesting!`)
  }, 600)
}

const addMessage = (role, content) => {
  messages.value.push({
    id: msgId++,
    role,
    content
  })
}

const autoPlay = async () => {
  isAutoPlaying.value = true
  const script = [
    '你好，我是张三。',
    '你好呀，我是你的 AI 助手。',
    '我今天有点累，帮我记录一下待办吧。',
    '没问题，你可以把待办一条条发给我。',
    '第一件事：给客户发邮件。',
    '好的，已经记下来了。',
    '第二件事：晚上去买菜做饭。',
    '收到，也帮你记住了。',
    '第三件事：记得给女朋友买花。',
    '这条也帮你写在“小黑板”上了。',
    '现在还记得我第一句话说了什么吗？',
    '呃……我只看得到窗口里的几条，最早那句已经被挤出去了。'
  ]

  for (const line of script) {
    if (!isAutoPlaying.value) break
    const role = messages.value.length % 2 === 0 ? 'User' : 'AI'
    addMessage(role, line)
    await new Promise((r) => setTimeout(r, 1500))
  }
  isAutoPlaying.value = false
}

const reset = () => {
  messages.value = []
  msgId = 0
  isAutoPlaying.value = false
}
</script>

<style scoped>
.sliding-window-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background-color: var(--vp-c-bg-soft);
  padding: 1rem;
  margin: 1rem 0;
  font-family: var(--vp-font-family-mono);
}

.control-panel {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  background: var(--vp-c-bg);
  padding: 0.75rem;
  border-radius: 6px;
  border: 1px solid var(--vp-c-divider);
}

.info-stat {
  display: flex;
  flex-direction: column;
}

.info-stat .label {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
}

.info-stat .value {
  font-weight: bold;
  font-size: 1.1rem;
}

.actions {
  display: flex;
  gap: 0.5rem;
}

.action-btn {
  padding: 0.25rem 0.75rem;
  border-radius: 4px;
  background-color: var(--vp-c-brand);
  color: white;
  font-size: 0.85rem;
  border: none;
  cursor: pointer;
  transition: opacity 0.2s;
}

.action-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.action-btn.outline {
  background-color: transparent;
  border: 1px solid var(--vp-c-divider);
  color: var(--vp-c-text-1);
}

.visualization-area {
  margin-bottom: 1rem;
  background: var(--vp-c-bg-alt);
  border-radius: 8px;
  padding: 0.75rem;
  border: 1px solid var(--vp-c-divider);
}

.conversation-stream {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.zone {
  padding: 0.75rem;
  border-radius: 6px;
  transition: all 0.3s;
}

.history-zone {
  background-color: rgba(0, 0, 0, 0.03);
  border: 1px dashed var(--vp-c-divider);
  margin-bottom: 0.5rem;
  opacity: 0.6;
}

.active-zone {
  background-color: var(--vp-c-bg);
  border: 2px solid var(--vp-c-brand);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  margin-top: 0.5rem;
  min-height: 100px;
}

.zone-label {
  font-size: 0.8rem;
  font-weight: bold;
  color: var(--vp-c-text-2);
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.window-divider {
  display: flex;
  align-items: center;
  gap: 1rem;
  color: var(--vp-c-text-3);
  font-size: 0.75rem;
  margin: 0.5rem 0;
}

.divider-line {
  flex: 1;
  height: 1px;
  background-color: var(--vp-c-divider);
}

.message-bubble {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  padding: 0.5rem;
  border-radius: 6px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  transition: all 0.5s ease;
}

.message-bubble.history {
  filter: grayscale(100%);
  opacity: 0.7;
}

.message-bubble.user .avatar {
  order: 1;
}

.message-bubble.user {
  flex-direction: row-reverse;
  text-align: right;
}

.message-bubble.user .content {
  align-items: flex-end;
}

.avatar {
  font-size: 1rem;
  width: 1.5rem;
  height: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--vp-c-bg-soft);
  border-radius: 50%;
}

.content {
  display: flex;
  flex-direction: column;
  max-width: 85%;
}

.role-name {
  font-size: 0.65rem;
  color: var(--vp-c-text-3);
  margin-bottom: 0.1rem;
}

.text {
  font-size: 0.85rem;
  line-height: 1.3;
}

.empty-placeholder {
  text-align: center;
  color: var(--vp-c-text-3);
  font-style: italic;
  padding: 0.5rem;
  font-size: 0.8rem;
}

.input-section {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

input {
  flex: 1;
  padding: 0.5rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
}

input:focus {
  outline: none;
  border-color: var(--vp-c-brand);
}

.send-btn {
  padding: 0 1rem;
  background: var(--vp-c-brand);
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.2s;
  font-size: 0.9rem;
}

.send-btn:hover {
  background: var(--vp-c-brand-dark);
}

.send-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.info-box {
  background-color: var(--vp-c-bg-alt);
  padding: 0.75rem;
  border-radius: 6px;
  font-size: 0.85rem;
  line-height: 1.4;
  color: var(--vp-c-text-2);
}

.info-box .icon {
  margin-right: 0.5rem;
}

/* Animations */
.slide-list-enter-active,
.slide-list-leave-active,
.fade-list-enter-active,
.fade-list-leave-active {
  transition: all 0.5s ease;
}

.slide-list-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.slide-list-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

.fade-list-enter-from {
  opacity: 0;
}
.fade-list-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
