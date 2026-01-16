<template>
  <div class="tcp-handshake-demo">
    <div class="diagram">
      <!-- Client Column -->
      <div class="column client">
        <div class="actor-icon">💻 Client</div>
        <div class="state-label">{{ clientState }}</div>
      </div>

      <!-- Interaction Area -->
      <div class="interaction-zone">
        <!-- Step 1: SYN -->
        <div class="packet-row" :class="{ active: step === 1, done: step > 1 }">
          <button
            @click="sendSyn"
            :disabled="step !== 0"
            class="packet-btn syn"
          >
            SYN (SEQ=x) →
          </button>
        </div>

        <!-- Step 2: SYN-ACK -->
        <div
          class="packet-row reverse"
          :class="{ active: step === 2, done: step > 2 }"
        >
          <button
            @click="sendSynAck"
            :disabled="step !== 1"
            class="packet-btn syn-ack"
          >
            ← SYN-ACK (ACK=x+1, SEQ=y)
          </button>
        </div>

        <!-- Step 3: ACK -->
        <div class="packet-row" :class="{ active: step === 3, done: step > 3 }">
          <button
            @click="sendAck"
            :disabled="step !== 2"
            class="packet-btn ack"
          >
            ACK (ACK=y+1) →
          </button>
        </div>
      </div>

      <!-- Server Column -->
      <div class="column server">
        <div class="actor-icon">🖥️ Server</div>
        <div class="state-label">{{ serverState }}</div>
      </div>
    </div>

    <div class="status-message">
      <p v-if="step === 0">点击 <strong>SYN</strong> 开始连接。</p>
      <p v-if="step === 1">
        服务器收到了请求，现在需要回复 <strong>SYN-ACK</strong>。
      </p>
      <p v-if="step === 2">
        客户端收到了确认，最后发送 <strong>ACK</strong> 完成握手。
      </p>
      <p v-if="step === 3" class="success">🎉 连接已建立 (ESTABLISHED)!</p>
    </div>

    <button v-if="step === 3" @click="reset" class="reset-btn">Reset</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const step = ref(0)
const clientState = ref('CLOSED')
const serverState = ref('LISTEN')

const sendSyn = () => {
  step.value = 1
  clientState.value = 'SYN_SENT'
}

const sendSynAck = () => {
  step.value = 2
  serverState.value = 'SYN_RCVD'
}

const sendAck = () => {
  step.value = 3
  clientState.value = 'ESTABLISHED'
  serverState.value = 'ESTABLISHED'
}

const reset = () => {
  step.value = 0
  clientState.value = 'CLOSED'
  serverState.value = 'LISTEN'
}
</script>

<style scoped>
.tcp-handshake-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background-color: var(--vp-c-bg-soft);
  padding: 1.5rem;
  margin: 1rem 0;
  font-family: var(--vp-font-family-mono);
  text-align: center;
}

.diagram {
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
}

.column {
  width: 120px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.actor-icon {
  font-size: 1.2rem;
  font-weight: bold;
}

.state-label {
  padding: 0.5rem;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
}

.interaction-zone {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1.5rem;
  padding: 0 2rem;
}

.packet-row {
  display: flex;
  justify-content: flex-start;
  opacity: 0.3;
  transition: all 0.3s;
}

.packet-row.reverse {
  justify-content: flex-end;
}

.packet-row.active {
  opacity: 1;
  transform: scale(1.05);
}

.packet-row.done {
  opacity: 1;
}

.packet-btn {
  padding: 0.5rem 1rem;
  border-radius: 20px;
  border: none;
  cursor: pointer;
  font-family: monospace;
  font-size: 0.85rem;
  transition: all 0.2s;
  background: var(--vp-c-bg-alt);
  border: 1px solid var(--vp-c-divider);
}

.packet-btn:not(:disabled):hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.packet-btn.syn {
  background: #3b82f6;
  color: white;
}
.packet-btn.syn-ack {
  background: #f59e0b;
  color: white;
}
.packet-btn.ack {
  background: #10b981;
  color: white;
}

.packet-btn:disabled {
  background: var(--vp-c-bg-alt);
  color: var(--vp-c-text-3);
  cursor: not-allowed;
  border-color: transparent;
}

.status-message {
  height: 2rem;
  margin-bottom: 1rem;
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
}

.status-message .success {
  color: #10b981;
  font-weight: bold;
}

.reset-btn {
  padding: 0.5rem 1.5rem;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  cursor: pointer;
}

.reset-btn:hover {
  background: var(--vp-c-bg-alt);
}
</style>
