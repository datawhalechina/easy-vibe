<template>
  <div class="tcp-handshake-demo">
    <div class="controls">
      <div class="status-indicator">
        {{ t.statusLabel }}:
        <span :class="connectionStatus.toLowerCase()">{{ statusText }}</span>
      </div>
      <div class="buttons">
        <button v-if="step === 0" @click="startHandshake" class="action-btn">
          {{ t.connect }}
        </button>
        <button v-else @click="reset" class="reset-btn">{{ t.reset }}</button>
      </div>
    </div>

    <div class="sequence-diagram">
      <!-- Client Timeline -->
      <div class="timeline client">
        <div class="actor">
          <span class="icon">💻</span>
          <span class="name">{{ t.client }}</span>
        </div>
        <div class="line"></div>
        <div class="state-marker" :class="{ active: step >= 1 }">SYN_SENT</div>
        <div class="state-marker" :class="{ active: step >= 3 }">
          ESTABLISHED
        </div>
      </div>

      <!-- Interaction Area -->
      <div class="interaction-space">
        <!-- SYN Packet -->
        <div class="packet-track">
          <transition name="slide-right">
            <div v-if="showSyn" class="packet syn">
              <div class="packet-body">SYN</div>
              <div class="packet-detail">SEQ=0</div>
            </div>
          </transition>
        </div>

        <!-- SYN-ACK Packet -->
        <div class="packet-track reverse">
          <transition name="slide-left">
            <div v-if="showSynAck" class="packet syn-ack">
              <div class="packet-body">SYN-ACK</div>
              <div class="packet-detail">SEQ=0, ACK=1</div>
            </div>
          </transition>
        </div>

        <!-- ACK Packet -->
        <div class="packet-track">
          <transition name="slide-right">
            <div v-if="showAck" class="packet ack">
              <div class="packet-body">ACK</div>
              <div class="packet-detail">SEQ=1, ACK=1</div>
            </div>
          </transition>
        </div>
      </div>

      <!-- Server Timeline -->
      <div class="timeline server">
        <div class="actor">
          <span class="icon">🖥️</span>
          <span class="name">{{ t.server }}</span>
        </div>
        <div class="line"></div>
        <div class="state-marker" :class="{ active: step >= 2 }">SYN_RCVD</div>
        <div class="state-marker" :class="{ active: step >= 3 }">
          ESTABLISHED
        </div>
      </div>
    </div>

    <div class="description-box">
      <p>{{ currentDescription }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  lang: {
    type: String,
    default: 'zh'
  }
})

// Bilingual text directly
const t = {
  statusLabel: '通话状态',
  connect: '拨打电话',
  reset: '挂断重拨',
  client: '我 (顾客)',
  server: '玩具店',
  status: {
    closed: '未通话',
    handshaking: '正在拨号...',
    established: '通话中 (连接已建立)'
  },
  steps: {
    0: '点击 "拨打电话" 开始确认店铺是否营业。',
    1: '步骤 1: 我问 "喂？有人在吗？" (SYN)',
    2: '步骤 2: 店员答 "在的！请问有什么事？" (SYN-ACK)',
    3: '步骤 3: 我说 "太好了，我想买东西！" (ACK)'
  }
}

const step = ref(0)
const showSyn = ref(false)
const showSynAck = ref(false)
const showAck = ref(false)

const connectionStatus = computed(() => {
  if (step.value === 0) return 'closed'
  if (step.value < 3) return 'handshaking'
  return 'established'
})

const statusText = computed(() => {
  const s = connectionStatus.value
  return t.status[s] || s.toUpperCase()
})

const currentDescription = computed(() => {
  return t.steps[step.value] || ''
})

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const startHandshake = async () => {
  if (step.value > 0) return

  // Step 1: SYN
  step.value = 1
  showSyn.value = true
  await wait(1500)

  // Step 2: SYN-ACK
  step.value = 2
  showSynAck.value = true
  await wait(1500)

  // Step 3: ACK
  step.value = 3
  showAck.value = true
}

const reset = () => {
  step.value = 0
  showSyn.value = false
  showSynAck.value = false
  showAck.value = false
}
</script>

<style scoped>
.tcp-handshake-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg);
  padding: 1.5rem;
  margin: 1rem 0;
  font-family: var(--vp-font-family-mono);
}

.controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--vp-c-divider);
}

.status-indicator {
  font-weight: bold;
}
.status-indicator span.closed {
  color: var(--vp-c-text-3);
}
.status-indicator span.handshaking {
  color: #f59e0b;
}
.status-indicator span.established {
  color: #10b981;
}

.action-btn {
  background: #3b82f6;
  color: white;
  border: none;
  padding: 0.5rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
}

.reset-btn {
  background: var(--vp-c-bg-alt);
  border: 1px solid var(--vp-c-divider);
  padding: 0.5rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
}

.sequence-diagram {
  display: flex;
  justify-content: space-between;
  height: 300px;
  position: relative;
}

.timeline {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100px;
  position: relative;
}

.actor {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1rem;
  z-index: 2;
  background: var(--vp-c-bg);
}

.timeline .line {
  width: 2px;
  background: var(--vp-c-divider);
  flex: 1;
}

.state-marker {
  margin-top: 2rem;
  padding: 0.3rem 0.6rem;
  background: var(--vp-c-bg-alt);
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  font-size: 0.7rem;
  color: var(--vp-c-text-3);
  transition: all 0.3s;
}

.state-marker.active {
  background: #10b981;
  color: white;
  border-color: #10b981;
}

.interaction-space {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 2rem 0;
}

.packet-track {
  height: 40px;
  position: relative;
  display: flex;
  align-items: center;
}

.packet-track.reverse {
  justify-content: flex-end;
}

.packet {
  background: #3b82f6;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 120px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 10;
}

.packet.syn-ack {
  background: #f59e0b;
}
.packet.ack {
  background: #10b981;
}

.packet-body {
  font-weight: bold;
}
.packet-detail {
  font-size: 0.7rem;
  opacity: 0.9;
}

/* Animations */
.slide-right-enter-active {
  animation: slide-right 1.5s linear;
}
.slide-left-enter-active {
  animation: slide-left 1.5s linear;
}

@keyframes slide-right {
  0% {
    transform: translateX(0);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    transform: translateX(100%);
    opacity: 1;
  } /* Not quite right, need to stick */
}

/* 
Vue transitions are tricky for "moving across". 
Let's use a simpler approach: CSS transitions on left/right property or keyframes.
Actually, for a "send" animation, we want it to move from A to B and then stay or disappear.
Here I want it to appear and move.
*/

.slide-right-enter-active,
.slide-left-enter-active {
  transition: all 1.5s cubic-bezier(0.25, 1, 0.5, 1);
}

.slide-right-enter-from {
  transform: translateX(-150px);
  opacity: 0;
}
.slide-right-enter-to {
  transform: translateX(0);
  opacity: 1;
}

/* This is getting complicated with Vue transitions for simple movement.
   Let's just use CSS keyframes on the element itself when it renders.
*/

.packet {
  animation-duration: 1s;
  animation-fill-mode: forwards;
  animation-timing-function: ease-in-out;
}

.packet-track .packet {
  animation-name: moveRight;
}
.packet-track.reverse .packet {
  animation-name: moveLeft;
}

@keyframes moveRight {
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes moveLeft {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.description-box {
  margin-top: 1rem;
  padding: 1rem;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  text-align: center;
  min-height: 3rem;
  color: var(--vp-c-text-2);
}
</style>
