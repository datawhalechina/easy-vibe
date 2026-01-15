<template>
  <div class="tcp-handshake-demo">
    <div class="participants">
      <div class="participant client">
        <div class="participant-icon">💻</div>
        <div class="participant-name">客户端</div>
        <div class="participant-ip">192.168.1.100</div>
      </div>

      <div class="connection-area">
        <div class="connection-line" :class="{ active: step >= 1 }"></div>
        <div class="packets">
          <div
            v-for="(packet, index) in packets"
            :key="index"
            class="packet"
            :class="{
              active: step === index + 1,
              sent: step > index + 1
            }"
          >
            <div class="packet-content">{{ packet.content }}</div>
            <div class="packet-direction">{{ packet.direction }}</div>
          </div>
        </div>
      </div>

      <div class="participant server">
        <div class="participant-icon">🖥️</div>
        <div class="participant-name">服务器</div>
        <div class="participant-ip">93.184.216.34</div>
      </div>
    </div>

    <div class="controls">
      <button
        class="control-btn"
        @click="startHandshake"
        :disabled="handshaking || step === 3"
      >
        {{ step === 3 ? '✅ 握手完成' : handshaking ? '🔄 握手中...' : '🤝 开始三次握手' }}
      </button>
      <button class="control-btn reset" @click="reset" v-if="step === 3">
        🔄 重新演示
      </button>
    </div>

    <div class="step-explanation">
      <div class="explanation-title">当前步骤说明</div>
      <div class="explanation-content" v-if="step === 0">
        点击"开始三次握手"按钮，观察客户端和服务器如何建立可靠连接。
      </div>
      <div class="explanation-content" v-else-if="step === 1">
        <strong>第一步：SYN（同步请求）</strong>
        <br><br>
        客户端发送一个 SYN 包给服务器，告诉服务器："我想和你建立连接"。
        <br>
        客户端会生成一个随机序列号（seq=x），这个号码很重要，后续的数据传输都要用它来保证数据不丢失、不重复。
      </div>
      <div class="explanation-content" v-else-if="step === 2">
        <strong>第二步：SYN-ACK（同步确认）</strong>
        <br><br>
        服务器收到客户端的 SYN 请求后：
        <br>1. 生成自己的随机序列号（seq=y）
        <br>2. 把客户端的序列号加 1（ack=x+1），表示"我收到了你的请求"
        <br>3. 发送 SYN-ACK 包给客户端
      </div>
      <div class="explanation-content" v-else-if="step === 3">
        <strong>第三步：ACK（确认）</strong>
        <br><br>
        客户端收到服务器的 SYN-ACK 后：
        <br>1. 把服务器的序列号加 1（ack=y+1），表示"我也收到了你的确认"
        <br>2. 发送 ACK 包给服务器
        <br><br>
        <strong>🎉 连接建立成功！</strong>双方现在可以开始传输数据了。
      </div>
    </div>

    <div class="why-three">
      <div class="why-title">🤔 为什么需要三次握手？</div>
      <div class="why-content">
        <div class="why-item">
          <strong>1. 确认双方都能正常收发数据</strong>
          <br>
          第一次握手：证明客户端能发送 ✅
          <br>
          第二次握手：证明服务器能接收和发送 ✅
          <br>
          第三次握手：证明客户端能接收 ✅
        </div>
        <div class="why-item">
          <strong>2. 防止已失效的连接请求突然传到服务器</strong>
          <br>
          如果只有两次握手，客户端发送的第一个连接请求在网络中滞留，
          等到连接释放后才到达服务器，服务器会误以为是新的连接请求，
          浪费资源。三次握手可以避免这个问题。
        </div>
        <div class="why-item">
          <strong>3. 同步双方的初始序列号</strong>
          <br>
          双方需要协商一个起始序列号，用于后续的数据传输和确认。
        </div>
      </div>
    </div>

    <div class="analogy">
      <div class="analogy-title">💡 生活中的类比</div>
      <div class="analogy-content">
        想象你在打电话给朋友：
        <br><br>
        <strong>你</strong>："喂？你能听到我说话吗？" （SYN）
        <br>
        <strong>朋友</strong>："能听到，你能听到我吗？" （SYN-ACK）
        <br>
        <strong>你</strong>："我也能听到！" （ACK）
        <br><br>
        现在双方确认都能听到对方，可以开始正常通话了！
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const step = ref(0)
const handshaking = ref(false)

const packets = [
  {
    content: 'SYN seq=x',
    direction: '客户端 → 服务器'
  },
  {
    content: 'SYN-ACK seq=y, ack=x+1',
    direction: '服务器 → 客户端'
  },
  {
    content: 'ACK ack=y+1',
    direction: '客户端 → 服务器'
  }
]

const startHandshake = () => {
  if (handshaking.value || step.value === 3) return

  handshaking.value = true
  step.value = 0

  setTimeout(() => {
    step.value = 1
    setTimeout(() => {
      step.value = 2
      setTimeout(() => {
        step.value = 3
        handshaking.value = false
      }, 1500)
    }, 1500)
  }, 500)
}

const reset = () => {
  step.value = 0
  handshaking.value = false
}
</script>

<style scoped>
.tcp-handshake-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 20px;
  background: var(--vp-c-bg-soft);
  margin: 20px 0;
}

.participants {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  gap: 20px;
}

.participant {
  flex: 1;
  text-align: center;
  padding: 20px;
  background: var(--vp-c-bg);
  border-radius: 8px;
  border: 2px solid var(--vp-c-divider);
}

.participant.client {
  border-color: #3b82f6;
}

.participant.server {
  border-color: #ef4444;
}

.participant-icon {
  font-size: 3rem;
  margin-bottom: 10px;
}

.participant-name {
  font-size: 1rem;
  font-weight: bold;
  color: var(--vp-c-text-1);
  margin-bottom: 5px;
}

.participant-ip {
  font-size: 0.8rem;
  color: var(--vp-c-text-3);
  font-family: monospace;
}

.connection-area {
  flex: 1;
  position: relative;
  padding: 20px;
}

.connection-line {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 2px;
  background: var(--vp-c-divider);
  transition: all 0.3s;
}

.connection-line.active {
  background: linear-gradient(90deg, #3b82f6, #ef4444);
}

.packets {
  display: flex;
  flex-direction: column;
  gap: 15px;
  position: relative;
  z-index: 1;
}

.packet {
  padding: 12px;
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider);
  border-radius: 6px;
  opacity: 0.3;
  transform: scale(0.9);
  transition: all 0.3s;
}

.packet.active {
  opacity: 1;
  transform: scale(1.05);
  border-color: var(--vp-c-brand);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

.packet.sent {
  opacity: 0.6;
}

.packet-content {
  font-size: 0.85rem;
  color: var(--vp-c-brand);
  font-family: monospace;
  font-weight: 600;
  margin-bottom: 4px;
}

.packet-direction {
  font-size: 0.75rem;
  color: var(--vp-c-text-3);
}

.controls {
  display: flex;
  gap: 10px;
  margin-bottom: 25px;
  justify-content: center;
}

.control-btn {
  padding: 12px 24px;
  background: var(--vp-c-brand);
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.control-btn:hover:not(:disabled) {
  background: var(--vp-c-brand-dark);
}

.control-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.control-btn.reset {
  background: #22c55e;
}

.control-btn.reset:hover {
  background: #16a34a;
}

.step-explanation {
  background: var(--vp-c-bg);
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 25px;
  border-left: 4px solid var(--vp-c-brand);
}

.explanation-title {
  font-size: 1rem;
  font-weight: bold;
  color: var(--vp-c-text-1);
  margin-bottom: 12px;
}

.explanation-content {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  line-height: 1.8;
}

.why-three {
  background: var(--vp-c-bg);
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 25px;
}

.why-title {
  font-size: 1rem;
  font-weight: bold;
  color: var(--vp-c-text-1);
  margin-bottom: 15px;
}

.why-content {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.why-item {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  line-height: 1.8;
  padding: 12px;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
}

.analogy {
  background: var(--vp-c-bg);
  border-radius: 8px;
  padding: 20px;
  border-left: 4px solid #f59e0b;
}

.analogy-title {
  font-size: 1rem;
  font-weight: bold;
  color: var(--vp-c-text-1);
  margin-bottom: 12px;
}

.analogy-content {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  line-height: 1.8;
}
</style>
