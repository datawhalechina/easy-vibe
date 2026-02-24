<template>
  <div class="https-handshake-demo">
    <h4 style="margin: 0 0 12px 0; color: #1a1a2e">
      🤝 TLS 握手过程演示
    </h4>
    <div class="control-row">
      <button class="start-btn" :disabled="isRunning" @click="startHandshake">
        {{ isRunning ? '握手进行中...' : '开始 TLS 握手' }}
      </button>
      <button class="reset-btn" @click="reset">重置</button>
    </div>

    <div class="handshake-area">
      <div class="side client-side">
        <div class="side-icon">💻</div>
        <div class="side-label">客户端（浏览器）</div>
      </div>

      <div class="message-lane">
        <div
          v-for="(msg, idx) in messages"
          :key="idx"
          class="msg-row"
          :class="{
            active: currentStep === idx,
            done: currentStep > idx,
            pending: currentStep < idx
          }"
        >
          <div
            class="msg-arrow"
            :class="msg.direction === 'right' ? 'arrow-right' : 'arrow-left'"
          >
            <span class="arrow-line"></span>
            <span class="arrow-head">{{ msg.direction === 'right' ? '→' : '←' }}</span>
          </div>
          <div class="msg-content">
            <div class="msg-name">{{ msg.name }}</div>
            <div class="msg-desc">{{ msg.desc }}</div>
          </div>
        </div>
      </div>

      <div class="side server-side">
        <div class="side-icon">🖥️</div>
        <div class="side-label">服务器</div>
      </div>
    </div>

    <div v-if="currentStep >= 0 && currentStep < messages.length" class="detail-box">
      <div class="detail-title">
        {{ messages[currentStep].name }}
      </div>
      <div class="detail-text">
        {{ messages[currentStep].detail }}
      </div>
    </div>

    <div v-if="handshakeDone" class="success-box">
      ✅ TLS 握手完成！后续所有 HTTP 数据都将通过对称加密传输，第三方无法窃听。
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const isRunning = ref(false)
const currentStep = ref(-1)
const handshakeDone = ref(false)

const messages = [
  {
    name: 'Client Hello',
    direction: 'right',
    desc: '发送支持的 TLS 版本、加密套件列表、随机数',
    detail:
      '浏览器向服务器发起连接请求，告知自己支持的 TLS 版本（如 TLS 1.3）、可用的加密算法列表（如 AES-256-GCM）以及一个客户端随机数（Client Random）。这就像自我介绍："我会这些加密方式，你选一个吧。"'
  },
  {
    name: 'Server Hello',
    direction: 'left',
    desc: '选定 TLS 版本、加密套件、服务器随机数',
    detail:
      '服务器从客户端提供的列表中选择一个最优的加密套件，并返回自己的随机数（Server Random）。相当于回应："好的，我们就用 TLS 1.3 + AES-256-GCM 来通信。"'
  },
  {
    name: 'Certificate',
    direction: 'left',
    desc: '服务器发送数字证书（含公钥）',
    detail:
      '服务器将自己的数字证书发送给浏览器。证书中包含服务器的公钥、域名信息以及 CA 的签名。浏览器会验证证书是否由受信任的 CA 签发、是否过期、域名是否匹配。'
  },
  {
    name: 'Key Exchange',
    direction: 'right',
    desc: '双方协商生成会话密钥',
    detail:
      '在 TLS 1.3 中，客户端和服务器通过 ECDHE（椭圆曲线 Diffie-Hellman）算法交换密钥材料。双方各自生成临时密钥对，交换公钥后独立计算出相同的"预主密钥"，再结合之前的随机数推导出最终的对称会话密钥。'
  },
  {
    name: 'Finished',
    direction: 'right',
    desc: '双方确认握手成功，开始加密通信',
    detail:
      '双方各自发送 Finished 消息，其中包含之前所有握手消息的摘要（用刚协商好的密钥加密）。如果对方能正确解密并验证，说明密钥协商成功，后续所有数据都将使用对称加密传输。'
  }
]

async function startHandshake() {
  if (isRunning.value) return
  isRunning.value = true
  handshakeDone.value = false
  currentStep.value = -1

  for (let i = 0; i < messages.length; i++) {
    currentStep.value = i
    await sleep(1200)
  }

  handshakeDone.value = true
  isRunning.value = false
}

function reset() {
  isRunning.value = false
  currentStep.value = -1
  handshakeDone.value = false
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms))
}
</script>

<style scoped>
.https-handshake-demo {
  background: linear-gradient(135deg, #e3f2fd 0%, #e8eaf6 100%);
  border-radius: 12px;
  padding: 20px;
  margin: 16px 0;
  font-family: system-ui, sans-serif;
}

.control-row {
  display: flex;
  gap: 8px;
  margin-bottom: 18px;
}

.start-btn {
  padding: 8px 20px;
  background: #1565c0;
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
}

.start-btn:hover:not(:disabled) {
  background: #0d47a1;
}

.start-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.reset-btn {
  padding: 8px 16px;
  background: #e0e0e0;
  color: #333;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
}

.handshake-area {
  display: flex;
  gap: 12px;
  align-items: flex-start;
}

.side {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 80px;
  padding-top: 10px;
}

.side-icon {
  font-size: 36px;
}

.side-label {
  font-size: 12px;
  font-weight: 600;
  color: #333;
  margin-top: 4px;
  text-align: center;
}

.message-lane {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.msg-row {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 14px;
  border-radius: 8px;
  background: #fff;
  border: 2px solid transparent;
  opacity: 0.35;
  transition: all 0.4s;
}

.msg-row.active {
  opacity: 1;
  border-color: #ff9800;
  background: #fff8e1;
  transform: scale(1.02);
  box-shadow: 0 3px 10px rgba(255, 152, 0, 0.2);
}

.msg-row.done {
  opacity: 1;
  border-color: #4caf50;
  background: #e8f5e9;
}

.msg-arrow {
  display: flex;
  align-items: center;
  min-width: 36px;
  font-size: 18px;
  font-weight: bold;
}

.arrow-right {
  color: #1565c0;
}

.arrow-left {
  color: #e65100;
}

.msg-name {
  font-weight: 700;
  font-size: 14px;
  color: #1a1a2e;
}

.msg-desc {
  font-size: 12px;
  color: #666;
  margin-top: 2px;
}

.detail-box {
  margin-top: 14px;
  padding: 14px 18px;
  background: #fff;
  border-radius: 10px;
  border-left: 4px solid #1565c0;
}

.detail-title {
  font-weight: 700;
  color: #1565c0;
  margin-bottom: 6px;
  font-size: 15px;
}

.detail-text {
  font-size: 13px;
  color: #444;
  line-height: 1.7;
}

.success-box {
  margin-top: 14px;
  padding: 12px 18px;
  background: #e8f5e9;
  border-radius: 10px;
  border: 1px solid #a5d6a7;
  color: #2e7d32;
  font-weight: 600;
  font-size: 14px;
}
</style>
