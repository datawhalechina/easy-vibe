<template>
  <div class="dns-lookup-demo">
    <div class="domain-input">
      <label>输入域名</label>
      <input
        type="text"
        v-model="domain"
        placeholder="例如: www.google.com"
        class="input-field"
        @keyup.enter="startLookup"
      />
      <button class="lookup-btn" @click="startLookup">
        🔍 开始解析
      </button>
    </div>

    <div class="lookup-process" v-if="isLooking">
      <div class="process-title">DNS 解析过程</div>

      <div class="step-list">
        <div
          v-for="(step, index) in steps"
          :key="index"
          class="step-item"
          :class="{
            active: currentStep === index,
            completed: currentStep > index
          }"
        >
          <div class="step-icon">
            {{ currentStep > index ? '✓' : index + 1 }}
          </div>
          <div class="step-content">
            <div class="step-title">{{ step.title }}</div>
            <div class="step-desc">{{ step.desc }}</div>
            <div v-if="currentStep === index" class="step-animation">
              {{ step.animation }}
            </div>
          </div>
          <div class="step-arrow" v-if="index < steps.length - 1">
            ↓
          </div>
        </div>
      </div>
    </div>

    <div class="result-box" v-if="completed">
      <div class="result-title">✅ 解析完成</div>
      <div class="result-content">
        <div class="result-item">
          <span class="label">域名:</span>
          <span class="value">{{ domain }}</span>
        </div>
        <div class="result-item">
          <span class="label">IP 地址:</span>
          <span class="value">{{ resolvedIP }}</span>
        </div>
        <div class="result-item">
          <span class="label">解析时间:</span>
          <span class="value">{{ lookupTime }}ms</span>
        </div>
      </div>
      <button class="reset-btn" @click="reset">
        🔄 重新解析
      </button>
    </div>

    <div class="info-box">
      <div class="info-title">💡 DNS 知识点</div>
      <div class="info-content">
        <div class="info-item">
          <strong>什么是 DNS？</strong>
          <br>
          DNS（域名系统）就像互联网的电话簿，将易记的域名（如 google.com）转换为计算机能识别的 IP 地址（如 142.250.185.238）。
        </div>
        <div class="info-item">
          <strong>为什么需要 DNS？</strong>
          <br>
          • IP 地址难记：142.250.185.238 vs google.com
          <br>
          • IP 可能变化：服务器迁移时 IP 会变，域名不变
          <br>
          • 负载均衡：一个域名可以对应多个 IP
        </div>
        <div class="info-item">
          <strong>DNS 解析的层次</strong>
          <br>
          1️⃣ 浏览器缓存：最近访问过的域名
          <br>
          2️⃣ 系统缓存：操作系统的 DNS 缓存
          <br>
          3️⃣ 路由器缓存：本地路由器的缓存
          <br>
          4️⃣ ISP DNS：网络服务商的 DNS 服务器
          <br>
          5️⃣ 根域名服务器：最高层级的 DNS
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const domain = ref('www.google.com')
const isLooking = ref(false)
const currentStep = ref(-1)
const completed = ref(false)
const resolvedIP = ref('')
const lookupTime = ref(0)

const steps = [
  {
    title: '检查浏览器缓存',
    desc: '查看最近是否访问过该域名',
    animation: '🔍 正在搜索浏览器缓存...'
  },
  {
    title: '检查系统缓存',
    desc: '查看操作系统的 DNS 缓存',
    animation: '💻 正在查询系统 DNS 缓存...'
  },
  {
    title: '查询路由器 DNS',
    desc: '向本地路由器发送 DNS 查询',
    animation: '📡 正在向路由器发送查询...'
  },
  {
    title: '查询 ISP DNS 服务器',
    desc: '向网络服务商的 DNS 服务器查询',
    animation: '🌐 正在联系 ISP DNS 服务器...'
  },
  {
    title: '查询根域名服务器',
    desc: '从 . 根服务器开始递归查询',
    animation: '🔝 正在查询根域名服务器...'
  },
  {
    title: '获取 IP 地址',
    desc: '成功解析到 IP 地址',
    animation: '✅ 找到 IP 地址！'
  }
]

const ipAddresses = {
  'www.google.com': '142.250.185.238',
  'www.baidu.com': '110.242.68.4',
  'www.github.com': '140.82.112.3',
  'default': '93.184.216.34'
}

const startLookup = () => {
  isLooking.value = true
  completed.value = false
  currentStep.value = -1
  const startTime = Date.now()

  // 模拟 DNS 查询过程
  let stepIndex = 0
  const interval = setInterval(() => {
    if (stepIndex < steps.length) {
      currentStep.value = stepIndex
      stepIndex++
    } else {
      clearInterval(interval)
      const endTime = Date.now()
      lookupTime.value = endTime - startTime
      resolvedIP.value = ipAddresses[domain.value.toLowerCase()] || ipAddresses['default']
      completed.value = true
    }
  }, 800)
}

const reset = () => {
  isLooking.value = false
  currentStep.value = -1
  completed.value = false
}
</script>

<style scoped>
.dns-lookup-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 20px;
  background: var(--vp-c-bg-soft);
  margin: 20px 0;
}

.domain-input {
  background: var(--vp-c-bg);
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  display: flex;
  gap: 10px;
  align-items: flex-end;
  flex-wrap: wrap;
}

.domain-input label {
  width: 100%;
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
  margin-bottom: 8px;
}

.input-field {
  flex: 1;
  min-width: 200px;
  padding: 12px;
  border: 2px solid var(--vp-c-divider);
  border-radius: 6px;
  font-size: 0.9rem;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
}

.input-field:focus {
  outline: none;
  border-color: var(--vp-c-brand);
}

.lookup-btn {
  padding: 12px 24px;
  background: var(--vp-c-brand);
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}

.lookup-btn:hover {
  background: var(--vp-c-brand-dark);
}

.lookup-process {
  background: var(--vp-c-bg);
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
}

.process-title {
  font-size: 1rem;
  font-weight: bold;
  color: var(--vp-c-text-1);
  margin-bottom: 20px;
  text-align: center;
}

.step-list {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.step-item {
  display: flex;
  align-items: flex-start;
  gap: 15px;
  position: relative;
  opacity: 0.3;
  transition: opacity 0.3s;
}

.step-item.active {
  opacity: 1;
}

.step-item.completed {
  opacity: 0.7;
}

.step-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--vp-c-divider);
  color: var(--vp-c-text-3);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 0.9rem;
  flex-shrink: 0;
}

.step-item.active .step-icon {
  background: var(--vp-c-brand);
  color: white;
}

.step-item.completed .step-icon {
  background: #22c55e;
  color: white;
}

.step-content {
  flex: 1;
  padding-top: 5px;
}

.step-title {
  font-size: 0.95rem;
  font-weight: bold;
  color: var(--vp-c-text-1);
  margin-bottom: 4px;
}

.step-desc {
  font-size: 0.85rem;
  color: var(--vp-c-text-3);
  margin-bottom: 6px;
}

.step-animation {
  font-size: 0.8rem;
  color: var(--vp-c-brand);
  background: var(--vp-c-bg-soft);
  padding: 8px;
  border-radius: 4px;
  font-family: monospace;
}

.step-arrow {
  position: absolute;
  left: 20px;
  top: 40px;
  width: 2px;
  height: calc(100% - 20px);
  background: var(--vp-c-divider);
}

.step-item.completed .step-arrow {
  background: #22c55e;
}

.result-box {
  background: var(--vp-c-bg);
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  border-left: 4px solid #22c55e;
}

.result-title {
  font-size: 1rem;
  font-weight: bold;
  color: var(--vp-c-text-1);
  margin-bottom: 15px;
}

.result-content {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 15px;
}

.result-item {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
}

.result-item .label {
  font-size: 0.85rem;
  color: var(--vp-c-text-3);
  font-weight: 600;
}

.result-item .value {
  font-size: 0.9rem;
  color: var(--vp-c-brand);
  font-family: monospace;
  font-weight: 600;
}

.reset-btn {
  width: 100%;
  padding: 10px;
  background: var(--vp-c-brand);
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}

.reset-btn:hover {
  background: var(--vp-c-brand-dark);
}

.info-box {
  background: var(--vp-c-bg);
  border-radius: 8px;
  padding: 20px;
  border-left: 4px solid var(--vp-c-brand);
}

.info-title {
  font-size: 1rem;
  font-weight: bold;
  color: var(--vp-c-text-1);
  margin-bottom: 15px;
}

.info-content {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.info-item {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  line-height: 1.8;
}
</style>
