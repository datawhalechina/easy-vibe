<!--
  SelectiveContextDemo.vue
  选择性上下文保留演示

  用途：
  展示如何通过 "Pinning" (钉住) 机制来保护关键信息不被滑动窗口移除。
  演示 System Prompt 和关键用户指令如何长期保留。

  交互功能：
  - 发送消息：添加新内容。
  - 钉住/取消钉住：手动选择要保留的消息。
  - 自动管理：演示当窗口满时，未钉住的消息优先被移除。
-->
<template>
  <div class="selective-context-demo">
    <div class="control-panel">
      <div class="stat-group">
        <div class="stat-item">
          <span class="value">{{ totalMessages }}</span>
          <span class="label">Total Messages</span>
        </div>
        <div class="stat-divider">/</div>
        <div class="stat-item">
          <span class="value">{{ maxSlots }}</span>
          <span class="label">Window Capacity</span>
        </div>
      </div>
      <div class="usage-bar">
        <div 
          class="usage-fill" 
          :style="{ width: `${(totalMessages / maxSlots) * 100}%` }"
          :class="{ full: totalMessages >= maxSlots }"
        ></div>
      </div>
    </div>

    <div class="visualization-area">
      <!-- Pinned Section -->
      <div class="context-section pinned-section">
        <div class="section-header">
          <span class="icon">📌</span>
          <span class="title">Pinned Context (Protected)</span>
          <span class="count">{{ pinnedMessages.length }} items</span>
        </div>
        <div class="message-list">
          <transition-group name="list">
            <div
              v-for="msg in pinnedMessages"
              :key="msg.id"
              class="message-card pinned"
              :class="msg.role.toLowerCase()"
            >
              <div class="card-header">
                <span class="role-badge">{{ msg.role }}</span>
                <button 
                  class="pin-btn active" 
                  @click="togglePin(msg)"
                  :disabled="msg.role === 'System'"
                  title="Unpin message"
                >
                  <span v-if="msg.role === 'System'">🔒 Fixed</span>
                  <span v-else>📌 Unpin</span>
                </button>
              </div>
              <div class="card-content">{{ msg.content }}</div>
            </div>
          </transition-group>
        </div>
      </div>

      <!-- Scrolling Section -->
      <div class="context-section scrolling-section">
        <div class="section-header">
          <span class="icon">📜</span>
          <span class="title">Scrolling Context (FIFO)</span>
          <span class="count">{{ scrollingMessages.length }} items</span>
        </div>
        <div class="message-list">
          <transition-group name="list">
            <div
              v-for="msg in scrollingMessages"
              :key="msg.id"
              class="message-card scrolling"
              :class="msg.role.toLowerCase()"
            >
              <div class="card-header">
                <span class="role-badge">{{ msg.role }}</span>
                <button class="pin-btn" @click="togglePin(msg)" title="Pin message">
                  📌 Pin
                </button>
              </div>
              <div class="card-content">{{ msg.content }}</div>
            </div>
          </transition-group>
          <div v-if="scrollingMessages.length === 0" class="empty-state">
            No scrolling messages...
          </div>
        </div>
      </div>
    </div>

    <div class="input-section">
      <div class="input-group">
        <input
          v-model="newMessage"
          @keyup.enter="sendMessage"
          placeholder="Add a new fact or message..."
        />
        <button class="send-btn" @click="sendMessage" :disabled="!newMessage.trim()">
          Add
        </button>
      </div>
      <div class="presets">
        <button class="preset-btn" @click="addPreset('My name is Alice.')">User: My name is Alice</button>
        <button class="preset-btn" @click="addPreset('The password is 1234.')">User: Password is 1234</button>
      </div>
    </div>

    <div class="info-box">
      <p>
        <span class="icon">💡</span>
        <strong>Note:</strong>
        "选择性保留" 解决了滑动窗口的遗忘问题。
        System Prompt 通常被永久钉住。用户也可以通过某些机制（如 RAG 或 记忆模块）将重要信息（如名字、密码）钉在窗口中，防止被挤出。
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const maxSlots = 6
const messages = ref([
  {
    id: 1,
    role: 'System',
    content: 'You are a helpful AI assistant focused on coding.',
    pinned: true
  },
  { id: 2, role: 'User', content: 'Hi, I want to learn Vue.', pinned: false },
  { id: 3, role: 'AI', content: 'Sure! Vue is a progressive framework.', pinned: false }
])
const newMessage = ref('')
let msgId = 4

const pinnedMessages = computed(() => messages.value.filter((m) => m.pinned))
const scrollingMessages = computed(() => messages.value.filter((m) => !m.pinned))
const totalMessages = computed(() => messages.value.length)

const sendMessage = () => {
  if (!newMessage.value.trim()) return
  addMessage('User', newMessage.value)
  newMessage.value = ''
}

const addPreset = (text) => {
  addMessage('User', text)
}

const addMessage = (role, content) => {
  // If full, remove oldest unpinned message
  if (messages.value.length >= maxSlots) {
    const firstUnpinnedIndex = messages.value.findIndex(m => !m.pinned)
    if (firstUnpinnedIndex !== -1) {
      messages.value.splice(firstUnpinnedIndex, 1)
    } else {
      // If all are pinned (rare edge case), we might force remove or block
      // For demo, we'll block adding
      alert("Context window full of pinned messages! Unpin something first.")
      return
    }
  }

  messages.value.push({
    id: msgId++,
    role,
    content,
    pinned: false
  })
}

const togglePin = (msg) => {
  if (msg.role === 'System') return // System prompt is always pinned
  
  // If pinning would exceed capacity (unlikely in this logic but possible if we change rules)
  // Logic: Pinning just changes state, doesn't add new msg.
  msg.pinned = !msg.pinned
}
</script>

<style scoped>
.selective-context-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background-color: var(--vp-c-bg-soft);
  padding: 1.5rem;
  margin: 1rem 0;
  font-family: var(--vp-font-family-mono);
}

.control-panel {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
  background: var(--vp-c-bg);
  padding: 1rem;
  border-radius: 6px;
  border: 1px solid var(--vp-c-divider);
}

.stat-group {
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
  min-width: 120px;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stat-item .value {
  font-size: 1.2rem;
  font-weight: bold;
}

.stat-item .label {
  font-size: 0.7rem;
  color: var(--vp-c-text-2);
}

.stat-divider {
  font-size: 1.2rem;
  color: var(--vp-c-divider);
}

.usage-bar {
  flex: 1;
  height: 8px;
  background: var(--vp-c-bg-alt);
  border-radius: 4px;
  overflow: hidden;
}

.usage-fill {
  height: 100%;
  background-color: var(--vp-c-brand);
  transition: width 0.3s ease;
}

.usage-fill.full {
  background-color: var(--vp-c-warning-1);
}

.visualization-area {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.context-section {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg);
  overflow: hidden;
}

.pinned-section {
  border-color: var(--vp-c-brand);
  background: rgba(var(--vp-c-brand-rgb), 0.02);
}

.section-header {
  padding: 0.5rem 1rem;
  background: var(--vp-c-bg-alt);
  border-bottom: 1px solid var(--vp-c-divider);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  font-weight: bold;
}

.pinned-section .section-header {
  background: rgba(var(--vp-c-brand-rgb), 0.1);
  color: var(--vp-c-brand-dark);
}

.section-header .count {
  margin-left: auto;
  font-size: 0.75rem;
  opacity: 0.7;
}

.message-list {
  padding: 1rem;
  min-height: 80px;
}

.message-card {
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 0.75rem;
  margin-bottom: 0.75rem;
  background: var(--vp-c-bg);
  transition: all 0.3s ease;
}

.message-card:last-child {
  margin-bottom: 0;
}

.message-card.pinned {
  border-left: 3px solid var(--vp-c-brand);
}

.message-card.scrolling {
  border-left: 3px solid var(--vp-c-text-3);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.role-badge {
  font-size: 0.7rem;
  text-transform: uppercase;
  font-weight: bold;
  padding: 2px 6px;
  border-radius: 4px;
  background: var(--vp-c-bg-alt);
  color: var(--vp-c-text-2);
}

.pin-btn {
  background: transparent;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  padding: 2px 8px;
  font-size: 0.75rem;
  cursor: pointer;
  color: var(--vp-c-text-2);
  transition: all 0.2s;
}

.pin-btn:hover:not(:disabled) {
  border-color: var(--vp-c-brand);
  color: var(--vp-c-brand);
}

.pin-btn.active {
  background: var(--vp-c-brand);
  color: white;
  border-color: var(--vp-c-brand);
}

.pin-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  background: var(--vp-c-bg-alt);
}

.card-content {
  font-size: 0.9rem;
  line-height: 1.4;
}

.empty-state {
  text-align: center;
  color: var(--vp-c-text-3);
  font-style: italic;
  font-size: 0.85rem;
}

.input-section {
  margin-bottom: 1rem;
}

.input-group {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

input {
  flex: 1;
  padding: 0.75rem;
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
  padding: 0 1.5rem;
  background: var(--vp-c-brand);
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
}

.send-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.presets {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.preset-btn {
  font-size: 0.75rem;
  padding: 4px 8px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  background: transparent;
  color: var(--vp-c-text-2);
  cursor: pointer;
}

.preset-btn:hover {
  border-color: var(--vp-c-brand);
  color: var(--vp-c-brand);
}

.info-box {
  background-color: var(--vp-c-bg-alt);
  padding: 1rem;
  border-radius: 6px;
  font-size: 0.9rem;
  line-height: 1.5;
  color: var(--vp-c-text-2);
}

.info-box .icon {
  margin-right: 0.5rem;
}

/* Animations */
.list-enter-active,
.list-leave-active {
  transition: all 0.4s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
.list-move {
  transition: transform 0.4s ease;
}
</style>
