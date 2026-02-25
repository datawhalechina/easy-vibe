<template>
  <div class="bios-demo">
    <div class="demo-header">
      <span class="demo-title">BIOS/UEFI 工作流程</span>
    </div>

    <div class="main-layout">
      <!-- 左侧：模拟屏幕 -->
      <div class="screen-panel">
        <div class="monitor">
          <div class="monitor-bezel">
            <div class="screen" :class="'stage-' + stage">
              <!-- Stage 0: 介绍 -->
              <div v-if="stage === 0" class="screen-intro">
                <div class="intro-icon">📟</div>
                <div class="intro-title">BIOS/UEFI</div>
                <div class="intro-desc">点击开始了解<br>固件启动流程</div>
              </div>

              <!-- Stage 1: POST 自检 -->
              <div v-if="stage === 1" class="screen-post">
                <div class="post-header">POST - Power On Self Test</div>
                <div class="post-list">
                  <div v-for="(item, i) in postItems" :key="i" class="post-item" :class="{ checking: currentCheck === i, done: currentCheck > i }">
                    <span class="post-icon">{{ currentCheck > i ? '✓' : (currentCheck === i ? '◐' : '○') }}</span>
                    <span class="post-name">{{ item.name }}</span>
                  </div>
                </div>
                <div v-if="currentCheck >= postItems.length" class="post-result">
                  <span class="result-ok">✓ 所有硬件检测通过</span>
                </div>
              </div>

              <!-- Stage 2: 初始化硬件 -->
              <div v-if="stage === 2" class="screen-init">
                <div class="init-header">初始化硬件配置</div>
                <div class="init-visual">
                  <div class="hardware-grid">
                    <div v-for="(hw, i) in hardwareItems" :key="i" class="hw-item" :class="{ active: activeHw === i }">
                      <span class="hw-icon">{{ hw.icon }}</span>
                      <span class="hw-name">{{ hw.name }}</span>
                    </div>
                  </div>
                  <div class="init-progress">
                    <div class="progress-bar">
                      <div class="progress-fill" :style="{ width: hwProgress + '%' }"></div>
                    </div>
                    <div class="progress-text">{{ hwProgress }}%</div>
                  </div>
                </div>
              </div>

              <!-- Stage 3: 寻找启动设备 -->
              <div v-if="stage === 3" class="screen-boot">
                <div class="boot-header">寻找启动设备</div>
                <div class="boot-order">
                  <div class="order-label">启动顺序：</div>
                  <div class="device-list">
                    <div v-for="(dev, i) in bootDevices" :key="i" class="device-item" :class="{ checking: currentDevice === i, found: foundDevice === i, skipped: foundDevice > i || (foundDevice === -1 && currentDevice > i) }">
                      <span class="device-num">{{ i + 1 }}</span>
                      <span class="device-icon">{{ dev.icon }}</span>
                      <span class="device-name">{{ dev.name }}</span>
                      <span class="device-status">{{ getDeviceStatus(i) }}</span>
                    </div>
                  </div>
                </div>
                <div v-if="foundDevice >= 0" class="boot-result">
                  <span class="boot-ok">🚀 从 {{ bootDevices[foundDevice].name }} 启动</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 进度指示 -->
        <div class="stage-dots">
          <div
            v-for="(s, i) in stages"
            :key="i"
            class="stage-dot"
            :class="{ active: stage === i, done: stage > i }"
          >
            <span class="dot-label">{{ s.short }}</span>
          </div>
        </div>

        <!-- 控制按钮 -->
        <div class="controls">
          <button class="ctrl-btn" :disabled="stage <= 0" @click="prev">← 上一步</button>
          <button class="ctrl-btn primary" v-if="stage === 0" @click="next">开始 →</button>
          <button class="ctrl-btn primary" v-else-if="stage < 3" @click="next">下一步 →</button>
          <button class="ctrl-btn" v-else @click="reset">↺ 重新开始</button>
        </div>
      </div>

      <!-- 右侧：详细信息 -->
      <div class="info-panel">
        <div class="info-stage-header">
          <span class="info-stage-icon">{{ currentStage.icon }}</span>
          <div>
            <div class="info-stage-name">{{ currentStage.name }}</div>
            <div class="info-stage-desc">{{ currentStage.desc }}</div>
          </div>
        </div>

        <div class="info-operations">
          <div
            v-for="(op, i) in currentStage.operations"
            :key="i"
            class="op-card"
            :class="{ expanded: expandedOp === i }"
            @click="expandedOp = expandedOp === i ? -1 : i"
          >
            <div class="op-header">
              <span class="op-num">{{ i + 1 }}</span>
              <span class="op-icon">{{ op.icon }}</span>
              <span class="op-name">{{ op.name }}</span>
              <span class="op-toggle">{{ expandedOp === i ? '▾' : '▸' }}</span>
            </div>
            <transition name="expand">
              <div v-if="expandedOp === i" class="op-detail">
                <div class="op-what">{{ op.what }}</div>
                <div v-if="op.details" class="op-details">
                  <div v-for="(d, j) in op.details" :key="j" class="op-detail-item">
                    <span class="od-dot">•</span>
                    <span>{{ d }}</span>
                  </div>
                </div>
              </div>
            </transition>
          </div>
        </div>

        <div v-if="currentStage.analogy" class="info-analogy">
          <span class="analogy-icon">💡</span>
          <span>{{ currentStage.analogy }}</span>
        </div>

        <!-- 蜂鸣声错误码 -->
        <div v-if="stage === 1" class="beep-codes">
          <div class="beep-header">
            <span class="beep-icon">🔔</span>
            <span class="beep-title">蜂鸣声错误码</span>
          </div>
          <div class="beep-list">
            <div v-for="code in beepCodes" :key="code.beeps" class="beep-item">
              <span class="beep-count">{{ code.beeps }}</span>
              <span class="beep-meaning">{{ code.meaning }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onUnmounted } from 'vue'

const stage = ref(0)
const expandedOp = ref(-1)
const currentCheck = ref(0)
const activeHw = ref(0)
const hwProgress = ref(0)
const currentDevice = ref(0)
const foundDevice = ref(-1)

const postItems = [
  { name: '内存检测', icon: '🧠' },
  { name: '显卡检测', icon: '🎮' },
  { name: '键盘/鼠标', icon: '⌨️' },
  { name: '存储设备', icon: '💾' }
]

const hardwareItems = [
  { name: 'CPU', icon: '🧠' },
  { name: '内存', icon: '💾' },
  { name: '显卡', icon: '🎮' },
  { name: '网卡', icon: '🌐' },
  { name: '声卡', icon: '🔊' },
  { name: 'USB', icon: '🔌' }
]

const bootDevices = [
  { name: '硬盘', icon: '💿' },
  { name: 'U盘', icon: '🔌' },
  { name: '网络', icon: '🌐' }
]

const beepCodes = [
  { beeps: '1 短', meaning: '正常启动' },
  { beeps: '1 长 2 短', meaning: '显卡错误' },
  { beeps: '1 长 3 短', meaning: '内存错误' },
  { beeps: '持续长鸣', meaning: '内存未检测' },
  { beeps: '持续短鸣', meaning: '电源异常' }
]

const stages = [
  {
    short: '介绍',
    icon: '📟',
    name: '什么是 BIOS/UEFI？',
    desc: 'BIOS 是电脑启动后第一个运行的程序，存储在主板的只读芯片中。UEFI 是 BIOS 的升级版，更安全、更现代。',
    operations: [
      {
        icon: '💾', name: 'BIOS（传统）',
        what: 'Basic Input/Output System，1980年代开始使用的固件接口。',
        details: ['存储在主板 ROM 芯片中', '16位实模式运行', '最大支持 2.2TB 硬盘', '蓝色文本界面']
      },
      {
        icon: '✨', name: 'UEFI（现代）',
        what: 'Unified Extensible Firmware Interface，BIOS 的现代化替代品。',
        details: ['支持 32/64位模式', '支持超过 2.2TB 的大硬盘', '图形化设置界面', '安全启动（Secure Boot）']
      }
    ],
    analogy: 'BIOS/UEFI 就像是电脑的"守门人"——它第一个醒来，检查一切是否正常，然后决定让谁（操作系统）进来。'
  },
  {
    short: 'POST',
    icon: '🔍',
    name: '硬件自检（POST）',
    desc: 'Power-On Self-Test，逐一检测关键硬件，确保它们能正常工作。',
    operations: [
      {
        icon: '🧠', name: '内存检测',
        what: '向内存写入测试数据并读回验证，确认每个内存条工作正常。',
        details: ['逐字节写入/读取测试', '检测内存容量和速度', '失败会发出蜂鸣声（1长3短）']
      },
      {
        icon: '🎮', name: '显卡检测',
        what: '初始化显卡，尝试输出画面。如果失败，屏幕会保持黑屏。',
        details: ['加载显卡 BIOS', '设置基本显示模式', '失败蜂鸣：1长2短']
      },
      {
        icon: '⌨️', name: '外设检测',
        what: '扫描 USB/PS2 端口，检测键盘、鼠标等输入设备。',
        details: ['枚举 USB 设备', '检测键盘响应', '非关键设备，缺失不影响启动']
      },
      {
        icon: '💾', name: '存储设备检测',
        what: '识别硬盘、SSD、光驱等存储设备，读取设备信息。',
        details: ['检测 SATA/NVMe 设备', '读取设备型号和容量', '为后续启动做准备']
      }
    ],
    analogy: '就像飞机起飞前的安全检查——机长逐项确认引擎、仪表、燃油都正常，有任何问题就不能起飞。'
  },
  {
    short: '初始化',
    icon: '⚙️',
    name: '初始化硬件',
    desc: '自检通过后，配置各硬件的工作参数，建立硬件与软件之间的通信桥梁。',
    operations: [
      {
        icon: '🔧', name: '设置工作模式',
        what: '配置 CPU 运行频率、内存时序（CAS Latency）等参数。',
        details: ['读取 CMOS 中的用户设置', '应用超频配置（如果有）', '设置电源管理模式']
      },
      {
        icon: '📋', name: '中断向量表',
        what: '建立中断号与处理程序的映射表，让硬件事件能被正确响应。',
        details: ['配置中断控制器（PIC/APIC）', '分配 IRQ 中断号', '设置中断处理程序入口']
      },
      {
        icon: '🔌', name: 'PCI 设备枚举',
        what: '扫描 PCI/PCIe 总线，为显卡、网卡、声卡分配资源。',
        details: ['发现所有 PCI 设备', '分配内存映射 I/O 地址', '分配中断资源']
      },
      {
        icon: '🕐', name: '时钟初始化',
        what: '读取 CMOS 中的实时时钟（RTC），同步系统时间。',
        details: ['读取硬件时钟', '校验时间有效性', '为操作系统提供初始时间']
      }
    ],
    analogy: '好比乐队演出前的调音——每件乐器（硬件）都要调到正确的音高（工作模式），指挥（中断控制器）要能指挥每个声部。'
  },
  {
    short: '启动',
    icon: '🔎',
    name: '寻找启动设备',
    desc: '按照启动顺序查找可启动设备，读取启动扇区，把控制权交给操作系统。',
    operations: [
      {
        icon: '📑', name: '读取启动顺序',
        what: '从 CMOS/NVRAM 中读取用户设定的设备优先级列表。',
        details: ['硬盘 → U盘 → 网络（默认顺序）', '用户可在 BIOS 设置中修改', '保存到非易失性存储器']
      },
      {
        icon: '💿', name: '检查启动扇区',
        what: '读取设备第一个扇区，验证末尾的 0x55AA 魔数签名。',
        details: ['读取第 0 扇区（512字节）', '检查 510-511 字节是否为 0x55AA', '验证引导代码有效性']
      },
      {
        icon: '🔀', name: '多设备尝试',
        what: '第一个设备无法启动时，自动尝试下一个。',
        details: ['硬盘无系统 → 尝试 U盘', 'U盘不存在 → 尝试网络启动', '全部失败 → 显示错误信息']
      },
      {
        icon: '🚀', name: '跳转执行',
        what: '将启动扇区代码加载到内存 0x7C00，CPU 跳转到该地址执行。',
        details: ['加载 512 字节引导代码', '跳转到 0x7C00 执行', '控制权交给引导程序']
      }
    ],
    analogy: '就像你早上出门找交通工具——先看车库有没有车（硬盘），没有就看门口有没有共享单车（U盘），再不行就叫网约车（网络启动）。'
  }
]

const currentStage = computed(() => stages[stage.value])

function getDeviceStatus(i) {
  if (foundDevice.value === i) return '✓ 可启动'
  if (foundDevice.value > i || (foundDevice.value === -1 && currentDevice.value > i)) return '✗ 跳过'
  if (currentDevice.value === i) return '检查中...'
  return '等待'
}

const postTimer = ref(null)
const hwTimer = ref(null)
const bootTimer = ref(null)

onUnmounted(() => {
  if (postTimer.value) clearInterval(postTimer.value)
  if (hwTimer.value) clearInterval(hwTimer.value)
  if (bootTimer.value) clearInterval(bootTimer.value)
})

// POST 自检动画
watch(() => stage.value, (newStage) => {
  if (postTimer.value) clearInterval(postTimer.value)
  if (newStage === 1) {
    currentCheck.value = 0
    postTimer.value = setInterval(() => {
      if (currentCheck.value < postItems.length) {
        currentCheck.value++
      } else {
        if (postTimer.value) clearInterval(postTimer.value)
      }
    }, 600)
  }
})

// 硬件初始化动画
watch(() => stage.value, (newStage) => {
  if (hwTimer.value) clearInterval(hwTimer.value)
  if (newStage === 2) {
    activeHw.value = 0
    hwProgress.value = 0
    hwTimer.value = setInterval(() => {
      if (hwProgress.value < 100) {
        hwProgress.value += 5
        activeHw.value = Math.floor(hwProgress.value / 20) % hardwareItems.length
      } else {
        if (hwTimer.value) clearInterval(hwTimer.value)
      }
    }, 100)
  }
})

// 启动设备搜索动画
watch(() => stage.value, (newStage) => {
  if (bootTimer.value) clearInterval(bootTimer.value)
  if (newStage === 3) {
    currentDevice.value = 0
    foundDevice.value = -1
    let device = 0
    bootTimer.value = setInterval(() => {
      if (device < bootDevices.length) {
        currentDevice.value = device
        // 假设第一个设备（硬盘）可启动
        if (device === 0) {
          setTimeout(() => {
            foundDevice.value = device
          }, 400)
          if (bootTimer.value) clearInterval(bootTimer.value)
        }
        device++
      } else {
        if (bootTimer.value) clearInterval(bootTimer.value)
      }
    }, 800)
  }
})

function next() {
  if (stage.value < 3) {
    stage.value++
    expandedOp.value = -1
  }
}
function prev() {
  if (stage.value > 0) {
    stage.value--
    expandedOp.value = -1
  }
}
function reset() {
  stage.value = 0
  expandedOp.value = -1
  currentCheck.value = 0
  activeHw.value = 0
  hwProgress.value = 0
  currentDevice.value = 0
  foundDevice.value = -1
  if (postTimer.value) clearInterval(postTimer.value)
  if (hwTimer.value) clearInterval(hwTimer.value)
  if (bootTimer.value) clearInterval(bootTimer.value)
}
</script>

<style scoped>
.bios-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  background: var(--vp-c-bg-soft);
  padding: 1.2rem;
  margin: 1rem 0;
}
.demo-header { margin-bottom: 1rem; }
.demo-title { font-size: 0.9rem; font-weight: 700; color: var(--vp-c-text-1); }

/* 主布局 */
.main-layout { display: flex; gap: 1rem; }

/* ===== 左侧屏幕 ===== */
.screen-panel { flex: 0 0 280px; display: flex; flex-direction: column; gap: 0.6rem; }
.monitor { background: #222; border-radius: 10px; padding: 3px; }
.monitor-bezel { background: #111; border-radius: 8px; overflow: hidden; }
.screen {
  width: 100%; aspect-ratio: 4/3; display: flex;
  align-items: center; justify-content: center;
  font-family: 'Courier New', monospace; transition: background 0.5s;
  overflow: hidden; position: relative;
}

/* 介绍 */
.stage-0 { background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); }
.screen-intro { text-align: center; color: #fff; }
.intro-icon { font-size: 2.5rem; margin-bottom: 0.3rem; }
.intro-title { font-size: 0.9rem; font-weight: 700; margin-bottom: 0.3rem; }
.intro-desc { font-size: 0.6rem; color: #94a3b8; line-height: 1.5; }

/* POST */
.stage-1 { background: #000; flex-direction: column; padding: 0.6rem; align-items: flex-start; }
.screen-post { width: 100%; }
.post-header { color: #4ade80; font-size: 0.55rem; margin-bottom: 0.5rem; font-weight: 700; }
.post-list { display: flex; flex-direction: column; gap: 0.3rem; }
.post-item {
  display: flex; align-items: center; gap: 0.4rem;
  color: #64748b; font-size: 0.6rem;
  transition: all 0.3s;
}
.post-item.checking { color: #fbbf24; }
.post-item.done { color: #4ade80; }
.post-icon { width: 1rem; text-align: center; }
.post-result { margin-top: 0.5rem; padding-top: 0.5rem; border-top: 1px solid #333; }
.result-ok { color: #4ade80; font-size: 0.6rem; }

/* 初始化 */
.stage-2 { background: #0f172a; flex-direction: column; padding: 0.6rem; }
.screen-init { width: 100%; }
.init-header { color: #60a5fa; font-size: 0.55rem; margin-bottom: 0.5rem; font-weight: 700; }
.hardware-grid {
  display: grid; grid-template-columns: repeat(3, 1fr);
  gap: 0.4rem; margin-bottom: 0.6rem;
}
.hw-item {
  display: flex; flex-direction: column; align-items: center;
  padding: 0.4rem; background: rgba(255,255,255,0.05);
  border-radius: 6px; transition: all 0.3s;
}
.hw-item.active { background: rgba(96, 165, 250, 0.3); transform: scale(1.05); }
.hw-icon { font-size: 1.2rem; margin-bottom: 0.1rem; }
.hw-name { font-size: 0.5rem; color: #94a3b8; }
.init-progress { display: flex; align-items: center; gap: 0.4rem; }
.progress-bar {
  flex: 1; height: 4px; background: #333; border-radius: 2px; overflow: hidden;
}
.progress-fill {
  height: 100%; background: linear-gradient(90deg, #60a5fa, #3b82f6);
  transition: width 0.1s linear;
}
.progress-text { color: #60a5fa; font-size: 0.55rem; width: 2rem; text-align: right; }

/* 启动 */
.stage-3 { background: #1e1b4b; flex-direction: column; padding: 0.6rem; align-items: flex-start; }
.screen-boot { width: 100%; }
.boot-header { color: #a78bfa; font-size: 0.55rem; margin-bottom: 0.4rem; font-weight: 700; }
.order-label { color: #94a3b8; font-size: 0.5rem; margin-bottom: 0.3rem; }
.device-list { display: flex; flex-direction: column; gap: 0.25rem; }
.device-item {
  display: flex; align-items: center; gap: 0.3rem;
  padding: 0.3rem 0.4rem; background: rgba(255,255,255,0.05);
  border-radius: 4px; font-size: 0.55rem; color: #64748b;
  transition: all 0.3s;
}
.device-item.checking { color: #fbbf24; background: rgba(251, 191, 36, 0.1); }
.device-item.found { color: #4ade80; background: rgba(74, 222, 128, 0.1); }
.device-item.skipped { opacity: 0.5; }
.device-num {
  width: 1rem; height: 1rem; border-radius: 50%;
  background: rgba(255,255,255,0.1); display: flex;
  align-items: center; justify-content: center; font-size: 0.5rem;
}
.device-icon { font-size: 0.8rem; }
.device-name { flex: 1; }
.device-status { font-size: 0.5rem; }
.boot-result { margin-top: 0.5rem; padding-top: 0.5rem; border-top: 1px solid rgba(167, 139, 250, 0.3); }
.boot-ok { color: #4ade80; font-size: 0.6rem; }

/* 进度点 */
.stage-dots { display: flex; justify-content: center; gap: 0.3rem; }
.stage-dot {
  padding: 0.15rem 0.4rem; border-radius: 10px;
  font-size: 0.55rem; color: var(--vp-c-text-3);
  background: var(--vp-c-bg); border: 1px solid var(--vp-c-divider);
  transition: all 0.3s;
}
.stage-dot.active {
  background: var(--vp-c-brand); color: white; border-color: var(--vp-c-brand);
}
.stage-dot.done { background: #10b981; color: white; border-color: #10b981; }
.dot-label { white-space: nowrap; }

/* 控制按钮 */
.controls { display: flex; gap: 0.4rem; justify-content: center; }
.ctrl-btn {
  padding: 0.35rem 0.8rem; border-radius: 6px; border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg); color: var(--vp-c-text-2); font-size: 0.68rem;
  cursor: pointer; transition: all 0.2s;
}
.ctrl-btn:hover:not(:disabled) { border-color: var(--vp-c-brand); color: var(--vp-c-brand); }
.ctrl-btn:disabled { opacity: 0.4; cursor: not-allowed; }
.ctrl-btn.primary {
  background: var(--vp-c-brand); color: white; border-color: var(--vp-c-brand);
}
.ctrl-btn.primary:hover { opacity: 0.9; }

/* ===== 右侧信息 ===== */
.info-panel { flex: 1; min-width: 0; }
.info-stage-header { display: flex; align-items: flex-start; gap: 0.5rem; margin-bottom: 0.7rem; }
.info-stage-icon { font-size: 1.4rem; }
.info-stage-name { font-size: 0.82rem; font-weight: 700; color: var(--vp-c-text-1); }
.info-stage-desc { font-size: 0.68rem; color: var(--vp-c-text-3); margin-top: 0.1rem; line-height: 1.4; }

/* 操作卡片 */
.info-operations { display: flex; flex-direction: column; gap: 0.35rem; }
.op-card {
  background: var(--vp-c-bg); border: 1px solid var(--vp-c-divider);
  border-radius: 6px; padding: 0.5rem 0.6rem; cursor: pointer;
  transition: all 0.2s;
}
.op-card.expanded { border-color: var(--vp-c-brand); box-shadow: 0 1px 8px rgba(0,0,0,0.05); }
.op-header { display: flex; align-items: center; gap: 0.4rem; }
.op-num {
  width: 1.2rem; height: 1.2rem; border-radius: 50%;
  background: var(--vp-c-brand-soft); color: var(--vp-c-brand);
  display: flex; align-items: center; justify-content: center;
  font-size: 0.58rem; font-weight: 700; flex-shrink: 0;
}
.op-icon { font-size: 0.9rem; }
.op-name { flex: 1; font-size: 0.72rem; font-weight: 600; color: var(--vp-c-text-1); }
.op-toggle { font-size: 0.65rem; color: var(--vp-c-text-3); }

.op-detail { margin-top: 0.4rem; padding-top: 0.4rem; border-top: 1px dashed var(--vp-c-divider); }
.op-what { font-size: 0.66rem; color: var(--vp-c-text-2); line-height: 1.6; margin-bottom: 0.3rem; }
.op-details { display: flex; flex-direction: column; gap: 0.15rem; }
.op-detail-item {
  display: flex; align-items: flex-start; gap: 0.3rem;
  font-size: 0.62rem; color: var(--vp-c-text-3); line-height: 1.4;
}
.od-dot { color: var(--vp-c-brand); flex-shrink: 0; }

/* 类比 */
.info-analogy {
  display: flex; align-items: flex-start; gap: 0.4rem;
  margin-top: 0.6rem; padding: 0.5rem 0.6rem;
  background: var(--vp-c-brand-soft); border-radius: 6px;
  font-size: 0.64rem; color: var(--vp-c-text-2);
  line-height: 1.5; font-style: italic;
}
.analogy-icon { font-size: 0.85rem; flex-shrink: 0; }

/* 蜂鸣声错误码 */
.beep-codes {
  margin-top: 0.6rem; padding: 0.5rem 0.6rem;
  background: var(--vp-c-bg); border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
}
.beep-header {
  display: flex; align-items: center; gap: 0.3rem;
  margin-bottom: 0.4rem;
}
.beep-icon { font-size: 0.9rem; }
.beep-title { font-size: 0.7rem; font-weight: 600; color: var(--vp-c-text-1); }
.beep-list { display: flex; flex-direction: column; gap: 0.2rem; }
.beep-item {
  display: flex; align-items: center; gap: 0.5rem;
  font-size: 0.62rem;
}
.beep-count {
  padding: 0.1rem 0.3rem; background: var(--vp-c-brand-soft);
  border-radius: 4px; color: var(--vp-c-brand); font-weight: 600;
  min-width: 3rem; text-align: center;
}
.beep-meaning { color: var(--vp-c-text-2); }

/* 展开动画 */
.expand-enter-active, .expand-leave-active { transition: all 0.25s ease; overflow: hidden; }
.expand-enter-from, .expand-leave-to { opacity: 0; max-height: 0; }
.expand-enter-to, .expand-leave-from { opacity: 1; max-height: 20rem; }

@media (max-width: 720px) {
  .main-layout { flex-direction: column; }
  .screen-panel { flex: none; width: 100%; }
}
</style>
