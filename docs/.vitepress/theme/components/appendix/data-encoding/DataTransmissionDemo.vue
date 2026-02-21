<template>
  <div class="transmission-demo">
    <!-- Mode selector -->
    <div class="mode-panel">
      <div class="mode-label">选择传输方式，然后点"发送数据包"</div>
      <div class="mode-buttons">
        <button
          :class="['mode-btn', { active: mode === 'serial' }]"
          @click="mode = 'serial'; reset()"
        >
          串行传输（现代）
        </button>
        <button
          :class="['mode-btn', { active: mode === 'parallel' }]"
          @click="mode = 'parallel'; reset()"
        >
          并行传输（旧时代）
        </button>
      </div>
    </div>

    <!-- Visualization -->
    <div class="vis-area">
      <!-- Sender -->
      <div class="device sender">
        <div class="device-icon">Tx</div>
        <div class="device-label">发送方</div>
        <div class="data-bits">
          <span
            v-for="(bit, i) in dataBits"
            :key="i"
            class="bit"
            :class="{ sent: sentBits.includes(i) }"
          >{{ bit }}</span>
        </div>
      </div>

      <!-- Wire(s) -->
      <div class="wire-container" :class="mode">
        <div v-if="mode === 'serial'" class="wire-group serial">
          <div class="wire-label">1 条线</div>
          <div class="wire">
            <span
              v-for="(p, i) in particles"
              :key="'p' + i"
              class="particle"
              :style="{ left: p.progress + '%', top: '50%' }"
            >{{ p.bit }}</span>
          </div>
        </div>
        <div v-if="mode === 'parallel'" class="wire-group parallel-group">
          <div class="wire-label">8 条线</div>
          <div v-for="l in 8" :key="l" class="wire">
            <span
              v-if="parallelParticle && parallelParticle.lane === l - 1"
              class="particle"
              :style="{ left: parallelParticle.progress + '%', top: '50%' }"
            >{{ parallelBits[l - 1] || '·' }}</span>
          </div>
        </div>
      </div>

      <!-- Receiver -->
      <div class="device receiver">
        <div class="device-icon">Rx</div>
        <div class="device-label">接收方</div>
        <div class="received-bits">
          <span
            v-for="(bit, i) in receivedBits"
            :key="'r' + i"
            class="bit received"
          >{{ bit }}</span>
        </div>
        <div v-if="checksumResult !== null" class="checksum-badge" :class="checksumResult ? 'ok' : 'fail'">
          {{ checksumResult ? '✓ 校验通过' : '✕ 校验失败' }}
        </div>
      </div>
    </div>

    <!-- Status bar -->
    <div class="status-bar">
      <div class="status-item">
        <span class="s-label">已发送</span>
        <span class="s-val">{{ sentBits.length }} / {{ dataBits.length }} 位</span>
      </div>
      <div class="status-item">
        <span class="s-label">传输速率</span>
        <span class="s-val">{{ mode === 'serial' ? '1 位/次' : '8 位/次' }}</span>
      </div>
      <div class="status-item">
        <span class="s-label">状态</span>
        <span class="s-val" :class="statusColor">{{ statusText }}</span>
      </div>
    </div>

    <!-- Send button -->
    <button class="send-btn" :disabled="isSending" @click="send">
      {{ isSending ? '传输中...' : '发送数据包' }}
    </button>

    <div class="note-box">
      <strong>提示：等等，串行不是更慢吗？</strong><br>
      表面上是的——但现代串行接口（USB 4、PCIe）传输频率高达每秒 <strong>数百亿次</strong>，而并行线路之间会产生 <em>信号串扰（Crosstalk）</em>，反而限制了速度。所以高速接口全面转向了串行。
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const mode = ref('serial')
const dataBits = ref([1,0,1,1,0,0,1,0]) // "Hello" first byte 0b10110010
const sentBits = ref([])
const receivedBits = ref([])
const particles = ref([])
const parallelParticle = ref(null)
const parallelBits = ref([])
const isSending = ref(false)
const checksumResult = ref(null)

function reset() {
  sentBits.value = []
  receivedBits.value = []
  particles.value = []
  parallelParticle.value = null
  parallelBits.value = []
  checksumResult.value = null
  isSending.value = false
}

const statusText = computed(() => {
  if (isSending.value) return '传输中...'
  if (receivedBits.value.length === dataBits.value.length) return '传输完成 ✓'
  if (receivedBits.value.length > 0) return '接收中...'
  return '就绪'
})

const statusColor = computed(() => {
  if (receivedBits.value.length === dataBits.value.length) return 'green'
  if (isSending.value) return 'yellow'
  return ''
})

function sleep(ms) { return new Promise(r => setTimeout(r, ms)) }

async function send() {
  if (isSending.value) return
  reset()
  isSending.value = true

  if (mode.value === 'serial') {
    await sendSerial()
  } else {
    await sendParallel()
  }

  // Checksum simulation
  await sleep(400)
  checksumResult.value = true  // always pass in demo
  isSending.value = false
}

async function sendSerial() {
  for (let i = 0; i < dataBits.value.length; i++) {
    sentBits.value.push(i)
    const bit = dataBits.value[i]
    // animate particle
    const p = { bit, progress: 0, id: i }
    particles.value.push(p)
    for (let prog = 0; prog <= 100; prog += 10) {
      p.progress = prog
      await sleep(35)
    }
    particles.value = particles.value.filter(x => x !== p)
    receivedBits.value.push(bit)
    await sleep(30)
  }
}

async function sendParallel() {
  sentBits.value = dataBits.value.map((_, i) => i)
  parallelBits.value = [...dataBits.value]
  for (let prog = 0; prog <= 100; prog += 8) {
    parallelParticle.value = { progress: prog, lane: Math.floor(Math.random() * 8) }
    await sleep(40)
  }
  parallelParticle.value = null
  receivedBits.value = [...dataBits.value]
}
</script>

<style scoped>
.transmission-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  padding: 1.25rem;
  margin: 1rem 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.mode-label {
  font-size: 0.88rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.mode-buttons {
  display: flex;
  gap: 0.5rem;
}

.mode-btn {
  padding: 0.4rem 0.9rem;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.85rem;
  transition: all 0.2s;
}

.mode-btn.active {
  background: var(--vp-c-brand);
  color: white;
  border-color: var(--vp-c-brand);
}

/* Visualization */
.vis-area {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 1rem;
  min-height: 140px;
}

.device {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.3rem;
  flex-shrink: 0;
  width: 100px;
}

.device-icon { font-size: 2rem; }
.device-label { font-size: 0.8rem; font-weight: bold; color: var(--vp-c-text-2); }

.data-bits, .received-bits {
  display: flex;
  flex-wrap: wrap;
  gap: 2px;
  justify-content: center;
}

.bit {
  width: 18px;
  height: 18px;
  border-radius: 3px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-alt);
  font-family: monospace;
  font-size: 0.7rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.bit.sent { background: var(--vp-c-brand-soft); border-color: var(--vp-c-brand); }
.bit.received { background: #d1fae5; border-color: #059669; color: #065f46; }

.checksum-badge {
  margin-top: 4px;
  font-size: 0.72rem;
  padding: 2px 6px;
  border-radius: 4px;
  font-weight: bold;
}
.checksum-badge.ok { background: #d1fae5; color: #065f46; }
.checksum-badge.fail { background: #fee2e2; color: #991b1b; }

/* Wires */
.wire-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 3px;
  padding: 0 0.5rem;
}

.wire-label {
  font-size: 0.72rem;
  color: var(--vp-c-text-3);
  text-align: center;
  margin-bottom: 3px;
}

.wire {
  position: relative;
  height: 14px;
  background: var(--vp-c-bg-alt);
  border-radius: 2px;
  border: 1px solid var(--vp-c-divider);
  overflow: hidden;
}

.wire-group.serial .wire { height: 20px; }
.parallel-group { display: flex; flex-direction: column; gap: 2px; }

.particle {
  position: absolute;
  transform: translate(-50%, -50%);
  font-family: monospace;
  font-size: 0.65rem;
  font-weight: bold;
  color: var(--vp-c-brand);
  transition: left 0.04s linear;
  background: var(--vp-c-brand-soft);
  border-radius: 2px;
  padding: 1px 3px;
}

/* Status bar */
.status-bar {
  display: flex;
  gap: 1rem;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 0.6rem 0.85rem;
}

.status-item { display: flex; flex-direction: column; gap: 2px; }
.s-label { font-size: 0.72rem; color: var(--vp-c-text-3); }
.s-val { font-size: 0.88rem; font-weight: bold; }
.s-val.green { color: #059669; }
.s-val.yellow { color: #d97706; }

.send-btn {
  padding: 0.5rem 1.2rem;
  background: var(--vp-c-brand);
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  font-size: 0.95rem;
  transition: opacity 0.2s;
  align-self: flex-start;
}

.send-btn:disabled { opacity: 0.6; cursor: not-allowed; }

.note-box {
  background: var(--vp-c-bg-alt);
  border-left: 4px solid var(--vp-c-yellow-1);
  padding: 0.75rem 1rem;
  border-radius: 0 6px 6px 0;
  font-size: 0.83rem;
  color: var(--vp-c-text-1);
  line-height: 1.6;
}
</style>
