<template>
  <div class="selective-context-demo">
    <div class="viz-container">
      <div class="window-frame">
        <div class="window-header">
          <span>Smart Context Window</span>
          <span class="capacity">{{ usedSlots }} / {{ maxSlots }} Slots</span>
        </div>

        <!-- Pinned Messages -->
        <div class="section pinned">
          <div class="section-label">📌 Pinned (Always Kept)</div>
          <div
            v-for="msg in pinnedMessages"
            :key="msg.id"
            class="message-bubble pinned"
          >
            <div class="msg-content">
              <span class="role">{{ msg.role }}:</span> {{ msg.content }}
            </div>
            <button class="pin-btn active" @click="togglePin(msg)">📌</button>
          </div>
        </div>

        <!-- Scrolling Messages -->
        <div class="section scrolling">
          <div class="section-label">📜 Scrolling (FIFO)</div>
          <transition-group name="list">
            <div
              v-for="msg in scrollingMessages"
              :key="msg.id"
              class="message-bubble"
            >
              <div class="msg-content">
                <span class="role">{{ msg.role }}:</span> {{ msg.content }}
              </div>
              <button class="pin-btn" @click="togglePin(msg)">📌</button>
            </div>
          </transition-group>
        </div>
      </div>
    </div>

    <div class="controls">
      <div class="input-group">
        <input
          v-model="newMessage"
          @keyup.enter="sendMessage"
          placeholder="Add a fact or message..."
        />
        <button @click="sendMessage">Add</button>
      </div>
      <div class="info-text">
        <p>
          Try pinning a message. Pinned messages stay in the window even as new
          messages push old ones out.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const maxSlots = 5
const messages = ref([
  {
    id: 1,
    role: 'System',
    content: 'You are a helpful assistant.',
    pinned: true
  },
  { id: 2, role: 'User', content: 'My name is Alice.', pinned: false },
  { id: 3, role: 'AI', content: 'Hello Alice!', pinned: false }
])
const newMessage = ref('')
let msgId = 4

const pinnedMessages = computed(() => messages.value.filter((m) => m.pinned))
const scrollingMessages = computed(() =>
  messages.value.filter((m) => !m.pinned)
)

const usedSlots = computed(() => messages.value.length)

const sendMessage = () => {
  if (!newMessage.value.trim()) return

  // Add new message
  messages.value.push({
    id: msgId++,
    role: 'User',
    content: newMessage.value,
    pinned: false
  })

  newMessage.value = ''

  // Enforce limit logic:
  // If total > max, remove oldest NON-PINNED message
  if (messages.value.length > maxSlots) {
    const unpinned = messages.value.filter((m) => !m.pinned)
    if (unpinned.length > 0) {
      // Find index of oldest unpinned
      const oldestUnpinned = unpinned[0]
      const indexToRemove = messages.value.findIndex(
        (m) => m.id === oldestUnpinned.id
      )
      if (indexToRemove !== -1) {
        messages.value.splice(indexToRemove, 1)
      }
    } else {
      // If all are pinned and we add one more, we can't remove anything (in this simple logic),
      // or we reject the new one. Let's just remove the newly added one to show "Full".
      messages.value.pop()
      alert('Context Window Full with Pinned Messages!')
    }
  }
}

const togglePin = (msg) => {
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

.window-frame {
  border: 2px solid var(--vp-c-brand);
  border-radius: 8px;
  padding: 1rem;
  background: var(--vp-c-bg);
  min-height: 300px;
  display: flex;
  flex-direction: column;
}

.window-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  font-weight: bold;
  border-bottom: 1px solid var(--vp-c-divider);
  padding-bottom: 0.5rem;
}

.section {
  margin-bottom: 1rem;
  padding: 0.5rem;
  border-radius: 6px;
}

.section.pinned {
  background: #fffbeb;
  border: 1px solid #fcd34d;
}

.section.scrolling {
  background: #f3f4f6;
  border: 1px solid #e5e7eb;
  flex: 1;
}

.section-label {
  font-size: 0.7rem;
  text-transform: uppercase;
  color: var(--vp-c-text-2);
  margin-bottom: 0.5rem;
}

.message-bubble {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  margin-bottom: 0.5rem;
  background: white;
  border-radius: 4px;
  border: 1px solid var(--vp-c-divider);
  font-size: 0.9rem;
}

.message-bubble.pinned {
  border-left: 3px solid #f59e0b;
}

.pin-btn {
  background: none;
  border: none;
  cursor: pointer;
  opacity: 0.3;
  font-size: 1rem;
}

.pin-btn:hover,
.pin-btn.active {
  opacity: 1;
}

.controls {
  margin-top: 1rem;
}

.input-group {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

input {
  flex: 1;
  padding: 0.6rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
}

button {
  padding: 0.5rem 1rem;
  background: var(--vp-c-brand);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.info-text {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
}

.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(20px);
}
</style>
