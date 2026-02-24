<template>
  <div class="comparison-demo">
    <h4 style="margin: 0 0 12px 0; color: #1a1a2e">
      🔐 HTTP vs HTTPS 数据传输对比
    </h4>
    <div class="control-row">
      <button
        class="mode-btn"
        :class="{ active: mode === 'http' }"
        @click="mode = 'http'"
      >
        HTTP（明文）
      </button>
      <button
        class="mode-btn https"
        :class="{ active: mode === 'https' }"
        @click="mode = 'https'"
      >
        HTTPS（加密）
      </button>
      <button class="send-btn" :disabled="isSending" @click="sendData">
        {{ isSending ? '传输中...' : '发送数据' }}
      </button>
    </div>

    <div class="flow-area">
      <div class="endpoint">
        <div class="ep-icon">💻</div>
        <div class="ep-label">浏览器</div>
        <div class="ep-data original">
          <div class="data-title">原始数据</div>
          <code>{{ originalData }}</code>
        </div>
      </div>

      <div class="transmission">
        <div class="wire" :class="mode">
          <div class="wire-label">
            {{ mode === 'http' ? '🔓 明文传输' : '🔒 加密传输' }}
          </div>
          <div
            class="packet"
            :class="{ moving: isSending, done: sendDone }"
          >
            <code class="packet-text">{{ transmittedData }}</code>
          </div>
        </div>
        <div v-if="mode === 'http'" class="hacker-box">
          <div class="hacker-icon">🕵️</div>
          <div class="hacker-label">中间人可窃听</div>
          <div v-if="sendDone" class="hacker-sees">
            <code>{{ originalData }}</code>
          </div>
        </div>
        <div v-else class="hacker-box blocked">
          <div class="hacker-icon">🕵️</div>
          <div class="hacker-label">中间人无法解密</div>
          <div v-if="sendDone" class="hacker-sees encrypted">
            <code>{{ encryptedData }}</code>
          </div>
        </div>
      </div>

      <div class="endpoint">
        <div class="ep-icon">🖥️</div>
        <div class="ep-label">服务器</div>
        <div v-if="sendDone" class="ep-data received">
          <div class="data-title">收到数据</div>
          <code>{{ originalData }}</code>
        </div>
      </div>
    </div>

    <div class="compare-table">
      <table>
        <thead>
          <tr>
            <th>对比项</th>
            <th>HTTP</th>
            <th>HTTPS</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, i) in compareRows" :key="i">
            <td class="row-label">{{ row.label }}</td>
            <td class="http-cell">{{ row.http }}</td>
            <td class="https-cell">{{ row.https }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const mode = ref('http')
const isSending = ref(false)
const sendDone = ref(false)

const originalData = 'password=MySecret123&user=zhangsan'
const encryptedData = 'a7f2c9...3b8e1d（密文）'

const transmittedData = ref('')

const compareRows = [
  { label: '端口', http: '80', https: '443' },
  { label: '数据加密', http: '无（明文传输）', https: 'TLS 对称加密' },
  { label: '身份验证', http: '无', https: 'CA 证书验证服务器身份' },
  { label: '数据完整性', http: '无保障', https: 'MAC 校验防篡改' },
  { label: 'SEO 影响', http: '搜索引擎降权', https: '搜索引擎优先收录' },
  { label: '性能开销', http: '无额外开销', https: 'TLS 握手增加约 1-2 RTT' }
]

async function sendData() {
  if (isSending.value) return
  isSending.value = true
  sendDone.value = false

  if (mode.value === 'http') {
    transmittedData.value = originalData
  } else {
    transmittedData.value = encryptedData
  }

  await sleep(1500)
  sendDone.value = true
  isSending.value = false
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms))
}
</script>

<style scoped>
.comparison-demo {
  background: linear-gradient(135deg, #e8eaf6 0%, #fce4ec 100%);
  border-radius: 12px;
  padding: 20px;
  margin: 16px 0;
  font-family: system-ui, sans-serif;
}

.control-row {
  display: flex;
  gap: 8px;
  margin-bottom: 18px;
  flex-wrap: wrap;
}

.mode-btn {
  padding: 7px 18px;
  border: 2px solid #ef5350;
  border-radius: 8px;
  background: #fff;
  color: #c62828;
  font-weight: 600;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s;
}

.mode-btn.https {
  border-color: #43a047;
  color: #2e7d32;
}

.mode-btn.active {
  background: #c62828;
  color: #fff;
}

.mode-btn.https.active {
  background: #2e7d32;
  color: #fff;
}

.send-btn {
  padding: 7px 18px;
  background: #1565c0;
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 13px;
}

.send-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.flow-area {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 18px;
  flex-wrap: wrap;
  justify-content: center;
}

.endpoint {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 120px;
}

.ep-icon {
  font-size: 32px;
}

.ep-label {
  font-size: 13px;
  font-weight: 600;
  color: #333;
  margin: 4px 0 8px;
}

.ep-data {
  background: #fff;
  border-radius: 8px;
  padding: 8px 12px;
  font-size: 11px;
  max-width: 160px;
  word-break: break-all;
}

.ep-data.original {
  border: 1px solid #90caf9;
}

.ep-data.received {
  border: 1px solid #a5d6a7;
}

.data-title {
  font-size: 10px;
  color: #888;
  margin-bottom: 4px;
  font-weight: 600;
}

.transmission {
  flex: 1;
  min-width: 180px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.wire {
  width: 100%;
  padding: 10px;
  border-radius: 8px;
  text-align: center;
  position: relative;
  min-height: 60px;
}

.wire.http {
  background: #ffebee;
  border: 2px dashed #ef5350;
}

.wire.https {
  background: #e8f5e9;
  border: 2px solid #43a047;
}

.wire-label {
  font-size: 12px;
  font-weight: 600;
  margin-bottom: 6px;
}

.packet {
  font-size: 11px;
  opacity: 0;
  transition: opacity 0.5s;
}

.packet.moving {
  opacity: 1;
  animation: slide 1.2s ease-in-out;
}

.packet.done {
  opacity: 1;
}

@keyframes slide {
  0% {
    transform: translateX(-30px);
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
}

.packet-text {
  font-size: 10px;
  word-break: break-all;
}

.hacker-box {
  background: #fff3e0;
  border: 1px solid #ffcc80;
  border-radius: 8px;
  padding: 8px 12px;
  text-align: center;
  width: 100%;
}

.hacker-box.blocked {
  background: #f1f8e9;
  border-color: #aed581;
}

.hacker-icon {
  font-size: 24px;
}

.hacker-label {
  font-size: 11px;
  font-weight: 600;
  color: #e65100;
}

.hacker-box.blocked .hacker-label {
  color: #558b2f;
}

.hacker-sees {
  margin-top: 4px;
  font-size: 10px;
  color: #c62828;
  word-break: break-all;
}

.hacker-sees.encrypted {
  color: #558b2f;
}

.compare-table {
  overflow-x: auto;
}

.compare-table table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
}

.compare-table th {
  background: #37474f;
  color: #fff;
  padding: 8px 12px;
  text-align: left;
  font-weight: 600;
}

.compare-table td {
  padding: 8px 12px;
  border-bottom: 1px solid #eee;
}

.row-label {
  font-weight: 600;
  color: #333;
}

.http-cell {
  color: #c62828;
}

.https-cell {
  color: #2e7d32;
}
</style>
