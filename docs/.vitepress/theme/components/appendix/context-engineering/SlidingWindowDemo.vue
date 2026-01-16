<template>
  <div class="sliding-window-demo">
    <div class="viz-container">
      <!-- Hidden Messages (History) -->
      <div class="message-zone history">
        <div class="zone-label">History (Forgotten)</div>
        <transition-group name="list">
          <div
            v-for="msg in historyMessages"
            :key="msg.id"
            class="message-bubble faded"
          >
            <span class="role">{{ msg.role }}:</span> {{ msg.content }}
          </div>
        </transition-group>
      </div>

      <!-- Active Window -->
      <div class="window-frame">
        <div class="window-header">
          <span>Active Context Window</span>
          <span class="capacity">Capacity: {{ windowSize }} msgs</span>
        </div>
        <div class="message-zone active">
          <transition-group name="list">
            <div
              v-for="msg in activeMessages"
              :key="msg.id"
              class="message-bubble"
              :class="msg.role"
            >
              <span class="role">{{ msg.role }}:</span> {{ msg.content }}
            </div>
          </transition-group>
          <div v-if="activeMessages.length === 0" class="empty-state">
            Start chatting to fill the window...
          </div>
        </div>
      </div>
    </div>

    <div class="controls">
      <div class="input-group">
        <input
          v-model="newMessage"
          @keyup.enter="sendMessage"
          placeholder="Type a message..."
        />
        <button @click="sendMessage">Send</button>
      </div>
      <div class="actions">
        <button class="secondary" @click="reset">Reset</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const windowSize = 4
const messages = ref([])
const newMessage = ref('')
let msgId = 0

const activeMessages = computed(() => {
  return messages.value.slice(-windowSize)
})

const historyMessages = computed(() => {
  return messages.value.slice(
    0,
    Math.max(0, messages.value.length - windowSize)
  )
})

const sendMessage = () => {
  if (!newMessage.value.trim()) return

  messages.value.push({
    id: msgId++,
    role: 'User',
    content: newMessage.value
  })

  // Simulate AI response
  setTimeout(() => {
    messages.value.push({
      id: msgId++,
      role: 'AI',
      content: `Response to "${newMessage.value}"`
    })
  }, 500)

  newMessage.value = ''
}

const reset = () => {
  messages.value = []
  msgId = 0
}
</script>

<style scoped>
.sliding-window-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background-color: var(--vp-c-bg-soft);
  padding: 1.5rem;
  margin: 1rem 0;
  font-family: var(--vp-font-family-mono);
}

.viz-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.5rem;
  min-height: 300px;
}

.message-zone {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.message-zone.history {
  opacity: 0.5;
  border-bottom: 2px dashed var(--vp-c-divider);
  padding-bottom: 1rem;
}

.window-frame {
  border: 2px solid var(--vp-c-brand);
  border-radius: 8px;
  padding: 1rem;
  background: var(--vp-c-bg);
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.window-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  font-size: 0.8rem;
  font-weight: bold;
  color: var(--vp-c-brand);
  border-bottom: 1px solid var(--vp-c-divider);
  padding-bottom: 0.5rem;
}

.message-bubble {
  padding: 0.5rem 0.8rem;
  border-radius: 6px;
  background: var(--vp-c-bg-alt);
  font-size: 0.9rem;
  border: 1px solid var(--vp-c-divider);
}

.message-bubble.User {
  align-self: flex-end;
  background: #eff6ff;
  border-color: #bfdbfe;
  color: #1e3a8a;
}

.message-bubble.AI {
  align-self: flex-start;
  background: #f0fdf4;
  border-color: #bbf7d0;
  color: #14532d;
}

.message-bubble.faded {
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-3);
  border-color: transparent;
}

.empty-state {
  text-align: center;
  color: var(--vp-c-text-3);
  margin-top: 2rem;
}

.controls {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.input-group {
  display: flex;
  gap: 0.5rem;
}

input {
  flex: 1;
  padding: 0.6rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  background: var(--vp-c-bg);
}

button {
  padding: 0.5rem 1rem;
  background: var(--vp-c-brand);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button.secondary {
  background: var(--vp-c-bg-alt);
  color: var(--vp-c-text-1);
  border: 1px solid var(--vp-c-divider);
}

/* Transitions */
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from {
  opacity: 0;
  transform: translateY(20px);
}
.list-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>
