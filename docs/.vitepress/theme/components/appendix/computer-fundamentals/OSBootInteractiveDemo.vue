<template>
  <div class="os-boot-demo">
    <div class="demo-header">
      <span class="demo-title">操作系统启动流程</span>
    </div>

    <div class="main-layout">
      <!-- 左侧：模拟屏幕 -->
      <div class="screen-panel">
        <div class="monitor">
          <div class="monitor-bezel">
            <div class="screen" :class="'stage-' + stage">
              <!-- Stage 0: 操作系统介绍 -->
              <div v-if="stage === 0" class="screen-intro">
                <div class="intro-icon">🖥️</div>
                <div class="intro-title">操作系统</div>
                <div class="intro-desc">管理硬件和软件资源<br>计算机的"大管家"</div>
                <div class="os-icons">
                  <div v-for="os in osList" :key="os.name" class="os-item">
                    <span class="os-icon">{{ os.icon }}</span>
                    <span class="os-name">{{ os.name }}</span>
                  </div>
                </div>
              </div>

              <!-- Stage 1: 引导程序 -->
              <div v-if="stage === 1" class="screen-bootloader">
                <div class="bl-header">Bootloader</div>
                <div class="bl-flow">
                  <div v-for="(step, i) in blSteps" :key="i" class="bl-step" :class="{ active: blStep >= i }">
                    <span class="bl-num">{{ i + 1 }}</span>
                    <span class="bl-text">{{ step }}</span>
                  </div>
                </div>
                <div class="bl-code">
                  <div class="code-line" v-for="(line, i) in blCode" :key="i" :class="{ highlight: blCodeLine === i }">
                    {{ line }}
                  </div>
                </div>
              </div>

              <!-- Stage 2: 内核加载 -->
              <div v-if="stage === 2" class="screen-kernel">
                <div class="kernel-header">Kernel Loading</div>
                <div class="kernel-logo">⚙️</div>
                <div class="kernel-name">{{ kernelName }}</div>
                <div class="kernel-bar-wrap">
                  <div class="kernel-bar" :style="{ width: kernelProgress + '%' }"></div>
                </div>
                <div class="kernel-modules">
                  <div v-for="(m, i) in kernelModules" :key="i" class="k-module" :class="{ loaded: kernelProgress > (i + 1) * 20 }">
                    <span class="k-status">{{ kernelProgress > (i + 1) * 20 ? '✓' : '○' }}</span>
                    <span class="k-name">{{ m }}</span>
                  </div>
                </div>
              </div>

              <!-- Stage 3: 系统服务 -->
              <div v-if="stage === 3" class="screen-services">
                <div class="svc-header">System Services</div>
                <div class="svc-grid">
                  <div v-for="(svc, i) in services" :key="i" class="svc-item" :class="{ started: svcProgress > i * 15 }">
                    <span class="svc-icon">{{ svc.icon }}</span>
                    <span class="svc-name">{{ svc.name }}</span>
                    <span class="svc-status">{{ svcProgress > i * 15 ? '●' : '○' }}</span>
                  </div>
                </div>
                <div class="svc-progress-bar">
                  <div class="svc-progress-fill" :style="{ width: svcProgress + '%' }"></div>
                </div>
              </div>

              <!-- Stage 4: 桌面显示 -->
              <div v-if="stage === 4" class="screen-desktop">
                <div class="desktop-bg">
                  <div class="desktop-icons">
                    <div class="desktop-icon" v-for="(ic, i) in desktopIcons" :key="i">
                      <span class="d-icon">{{ ic.icon }}</span>
                      <span class="d-label">{{ ic.label }}</span>
                    </div>
                  </div>
                  <div class="taskbar">
                    <span class="taskbar-start">🪟</span>
                    <span class="taskbar-apps">
                      <span v-for="(app, i) in taskbarApps" :key="i" class="taskbar-app">{{ app }}</span>
                    </span>
                    <span class="taskbar-time">{{ currentTime }}</span>
                  </div>
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
          <button class="ctrl-btn primary" v-else-if="stage < 4" @click="next">下一步 →</button>
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

        <!-- 操作系统对比表 -->
        <div v-if="stage === 0" class="os-comparison">
          <div class="os-comp-header">
            <span class="os-comp-icon">📊</span>
            <span class="os-comp-title">常见操作系统</span>
          </div>
          <div class="os-comp-table">
            <div class="os-comp-row os-comp-header-row">
              <span class="os-comp-cell">系统</span>
              <span class="os-comp-cell">特点</span>
              <span class="os-comp-cell">典型设备</span>
            </div>
            <div v-for="os in osList" :key="os.name" class="os-comp-row">
              <span class="os-comp-cell os-name-cell">
                <span class="os-comp-icon-small">{{ os.icon }}</span>
                {{ os.name }}
              </span>
              <span class="os-comp-cell">{{ os.feature }}</span>
              <span class="os-comp-cell">{{ os.device }}</span>
            </div>
          </div>
        </div>

        <!-- 启动流程对比 -->
        <div v-if="stage === 1" class="boot-flow-comparison">
          <div class="bf-header">
            <span class="bf-icon">🔄</span>
            <span class="bf-title">Windows vs Linux 启动流程</span>
          </div>
          <div class="bf-content">
            <div class="bf-col">
              <div class="bf-os-name">🪟 Windows</div>
              <div class="bf-flow">
                <div class="bf-step" v-for="(step, i) in windowsFlow" :key="i">
                  <span class="bf-arrow" v-if="i > 0">↓</span>
                  <span class="bf-step-text">{{ step }}</span>
                </div>
              </div>
            </div>
            <div class="bf-col">
              <div class="bf-os-name">🐧 Linux</div>
              <div class="bf-flow">
                <div class="bf-step" v-for="(step, i) in linuxFlow" :key="i">
                  <span class="bf-arrow" v-if="i > 0">↓</span>
                  <span class="bf-step-text">{{ step }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'

const stage = ref(0)
const expandedOp = ref(-1)
const blStep = ref(-1)
const blCodeLine = ref(-1)
const kernelProgress = ref(0)
const svcProgress = ref(0)
const currentTime = ref('09:41')

const osList = [
  { name: 'Windows', icon: '🪟', feature: '生态丰富，兼容性好', device: '桌面电脑、笔记本' },
  { name: 'macOS', icon: '🍎', feature: '苹果生态，流畅稳定', device: 'Mac 电脑' },
  { name: 'Linux', icon: '🐧', feature: '开源免费，服务器首选', device: '服务器、嵌入式' },
  { name: 'Android', icon: '🤖', feature: '移动端 Linux', device: '手机、平板' },
  { name: 'iOS', icon: '📱', feature: '苹果移动端', device: 'iPhone、iPad' }
]

const blSteps = ['读取分区表', '找到系统分区', '加载内核到内存', '跳转到内核入口']
const blCode = [
  'mov ax, 0x07C0',
  'mov ds, ax',
  'read_sector:',
  '  mov ah, 0x02',
  '  int 0x13',
  'jmp 0x0000:0x7C00'
]

const kernelName = ref('ntoskrnl.exe')
const kernelModules = ['进程管理', '内存管理', '文件系统', '设备驱动']

const services = [
  { name: '网络服务', icon: '🌐' },
  { name: '音频服务', icon: '🔊' },
  { name: '安全中心', icon: '🛡️' },
  { name: '打印服务', icon: '🖨️' },
  { name: '图形界面', icon: '🎨' },
  { name: '系统日志', icon: '📝' }
]

const desktopIcons = [
  { icon: '📁', label: '文件' },
  { icon: '🌐', label: '浏览器' },
  { icon: '📧', label: '邮件' },
  { icon: '⚙️', label: '设置' }
]

const taskbarApps = ['🌐', '📁', '📝']

const windowsFlow = ['BIOS', 'MBR', 'bootmgr', 'winload.exe', 'ntoskrnl.exe', '系统服务', '桌面']
const linuxFlow = ['BIOS', 'GRUB', 'vmlinuz', 'systemd', '系统服务', '桌面环境']

const stages = [
  {
    short: '介绍',
    icon: '🖥️',
    name: '什么是操作系统？',
    desc: '操作系统（OS）是管理计算机硬件和软件资源的程序集合，就像一个"大管家"。',
    operations: [
      {
        icon: '🏢', name: '资源管理',
        what: '操作系统负责管理 CPU、内存、硬盘、网络等所有硬件资源。',
        details: ['进程管理 - 调度程序运行', '内存管理 - 分配和回收内存', '文件系统 - 管理文件存储', '设备管理 - 控制硬件设备']
      },
      {
        icon: '🎮', name: '提供接口',
        what: '为应用程序提供统一的接口，让程序不需要直接操作硬件。',
        details: ['系统调用接口（API）', '图形用户界面（GUI）', '命令行界面（CLI）', '驱动程序接口']
      },
      {
        icon: '🔒', name: '安全保护',
        what: '保护系统资源不被非法访问，确保多用户环境下的隔离。',
        details: ['用户权限管理', '进程地址空间隔离', '文件访问控制', '网络安全防护']
      }
    ],
    analogy: '操作系统就像一座大楼的物业管理——负责水电供应（硬件资源）、分配房间（内存）、管理仓库（文件系统）、维护安全（权限控制），让住户（应用程序）可以安心生活。'
  },
  {
    short: '引导程序',
    icon: '🚀',
    name: '引导程序（Bootloader）',
    desc: '硬盘第一个扇区存放着引导程序，它的任务是把操作系统内核加载到内存。',
    operations: [
      {
        icon: '📀', name: '读取分区表',
        what: '引导程序首先读取硬盘的分区表，找到操作系统所在的分区。',
        details: ['读取 MBR（主引导记录）', '解析分区表结构', '定位活动分区', 'Windows: bootmgr / Linux: GRUB']
      },
      {
        icon: '🔍', name: '定位内核',
        what: '在系统分区中找到操作系统内核文件的位置。',
        details: ['Windows: 读取 BCD 配置', 'Linux: 显示系统选择菜单', '支持多系统启动', '加载文件系统驱动']
      },
      {
        icon: '💾', name: '加载到内存',
        what: '将内核文件从硬盘读取到内存的指定位置。',
        details: ['解压压缩的内核镜像', '复制到内存 0x100000 以上', 'Windows: ntoskrnl.exe', 'Linux: vmlinuz']
      },
      {
        icon: '➡️', name: '跳转执行',
        what: '设置好初始环境后，跳转到内核入口点，把控制权交给内核。',
        details: ['设置 CPU 保护模式', '初始化页表', '跳转至内核入口', '内核开始执行']
      }
    ],
    analogy: '引导程序就像剧场的报幕员——他先上台确认场地（检查硬件）、找到剧本（定位内核）、把道具摆好（加载到内存），然后宣布："演出开始！"（跳转执行）'
  },
  {
    short: '内核加载',
    icon: '⚙️',
    name: '操作系统内核（Kernel）',
    desc: '内核是操作系统的核心，负责管理内存、CPU、进程等核心功能。',
    operations: [
      {
        icon: '🧠', name: '进程管理',
        what: '创建第一个用户进程，建立进程调度机制。',
        details: ['创建 init/systemd 进程', '建立进程控制块（PCB）', '初始化调度器', '设置进程优先级']
      },
      {
        icon: '💾', name: '内存管理',
        what: '建立虚拟内存系统，划分内核空间和用户空间。',
        details: ['初始化页表', '建立物理内存映射', '设置内存保护', '启用虚拟内存']
      },
      {
        icon: '📁', name: '文件系统',
        what: '挂载根文件系统，初始化 VFS 层。',
        details: ['识别文件系统类型', '挂载根分区（/）', '初始化 inode 缓存', '建立文件描述符表']
      },
      {
        icon: '🔌', name: '设备驱动',
        what: '加载核心设备驱动，初始化硬件抽象层。',
        details: ['加载磁盘驱动', '初始化显示驱动', '加载键盘鼠标驱动', '枚举 PCI 设备']
      }
    ],
    analogy: '内核就像公司的 CEO 上任——接管所有部门（硬件），安排人事（进程）、财务（内存）、后勤（设备）各就各位，建立公司的基本运作框架。'
  },
  {
    short: '服务启动',
    icon: '🔧',
    name: '系统服务启动',
    desc: '内核拉起第一个用户进程，按依赖顺序启动各种后台服务。',
    operations: [
      {
        icon: '🚀', name: '初始化进程',
        what: '启动第一个用户态进程（PID=1），它是所有其他进程的"祖先"。',
        details: ['Linux: systemd 或 init', 'Windows: smss.exe → csrss.exe', '读取服务配置文件', '按依赖关系排序']
      },
      {
        icon: '🌐', name: '网络服务',
        what: '初始化网卡驱动，配置网络连接。',
        details: ['加载网卡驱动', 'DHCP 获取 IP 地址', '配置 DNS 服务器', '启动防火墙']
      },
      {
        icon: '🔒', name: '安全服务',
        what: '启动用户认证和安全监控服务。',
        details: ['启动登录管理器', '初始化权限系统', '启动杀毒软件', '配置安全策略']
      },
      {
        icon: '🔊', name: '多媒体服务',
        what: '启动音频、显示等多媒体相关服务。',
        details: ['启动音频服务', '初始化显示管理器', '加载主题和字体', '准备用户界面']
      }
    ],
    analogy: '就像商场开门营业前——保安到岗（安全）、空调开启（后台服务）、收银上线（网络），一切就绪迎接顾客（用户）。'
  },
  {
    short: '桌面就绪',
    icon: '🖥️',
    name: '显示桌面',
    desc: '图形界面启动完成，用户熟悉的桌面环境呈现出来。',
    operations: [
      {
        icon: '🎮', name: '显卡驱动',
        what: '初始化 GPU，设置屏幕分辨率和色彩。',
        details: ['加载显卡驱动', '设置分辨率（如 1920×1080）', '启用硬件加速', '配置多显示器']
      },
      {
        icon: '🪟', name: '窗口系统',
        what: '启动窗口管理器，负责窗口的绘制和交互。',
        details: ['Windows: DWM', 'Linux: X11/Wayland', 'macOS: WindowServer', '管理窗口层叠关系']
      },
      {
        icon: '🎨', name: '桌面环境',
        what: '绘制壁纸、桌面图标、任务栏等界面元素。',
        details: ['加载桌面壁纸', '显示桌面图标', '渲染任务栏', '加载系统托盘']
      },
      {
        icon: '👆', name: '用户交互',
        what: '鼠标光标出现，系统进入完全可交互状态。',
        details: ['显示鼠标指针', '响应键盘输入', '加载用户配置', '启动自启动程序']
      }
    ],
    analogy: '幕布拉开，灯光亮起——舞台（窗口）搭好，演员（图标）就位，等待观众（你）的第一次操作。'
  }
]

const currentStage = computed(() => stages[stage.value])

let timeInterval = null

onMounted(() => {
  timeInterval = setInterval(() => {
    const now = new Date()
    currentTime.value = now.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
  }, 1000)
})

const blTimer = ref(null)
const kernelTimer = ref(null)
const svcTimer = ref(null)

onUnmounted(() => {
  if (timeInterval) clearInterval(timeInterval)
  if (blTimer.value) clearInterval(blTimer.value)
  if (kernelTimer.value) clearInterval(kernelTimer.value)
  if (svcTimer.value) clearInterval(svcTimer.value)
})

// 引导程序动画
watch(() => stage.value, (newStage) => {
  if (blTimer.value) clearInterval(blTimer.value)
  if (newStage === 1) {
    blStep.value = -1
    blCodeLine.value = -1
    let step = 0
    blTimer.value = setInterval(() => {
      if (step < blSteps.length) {
        blStep.value = step
        blCodeLine.value = step + 1
        step++
      } else {
        if (blTimer.value) clearInterval(blTimer.value)
      }
    }, 600)
  }
})

// 内核加载动画
watch(() => stage.value, (newStage) => {
  if (kernelTimer.value) clearInterval(kernelTimer.value)
  if (newStage === 2) {
    kernelProgress.value = 0
    kernelName.value = Math.random() > 0.5 ? 'ntoskrnl.exe' : 'vmlinuz'
    kernelTimer.value = setInterval(() => {
      if (kernelProgress.value < 100) {
        kernelProgress.value += 4
      } else {
        if (kernelTimer.value) clearInterval(kernelTimer.value)
      }
    }, 80)
  }
})

// 服务启动动画
watch(() => stage.value, (newStage) => {
  if (svcTimer.value) clearInterval(svcTimer.value)
  if (newStage === 3) {
    svcProgress.value = 0
    svcTimer.value = setInterval(() => {
      if (svcProgress.value < 100) {
        svcProgress.value += 3
      } else {
        if (svcTimer.value) clearInterval(svcTimer.value)
      }
    }, 100)
  }
})

function next() {
  if (stage.value < 4) {
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
  blStep.value = -1
  blCodeLine.value = -1
  kernelProgress.value = 0
  svcProgress.value = 0
}
</script>

<style scoped>
.os-boot-demo {
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
.stage-0 { background: linear-gradient(135deg, #1e3a5f 0%, #0f172a 100%); }
.screen-intro { text-align: center; color: #fff; width: 100%; padding: 0.5rem; }
.intro-icon { font-size: 2rem; margin-bottom: 0.2rem; }
.intro-title { font-size: 0.8rem; font-weight: 700; margin-bottom: 0.2rem; }
.intro-desc { font-size: 0.55rem; color: #94a3b8; margin-bottom: 0.4rem; line-height: 1.4; }
.os-icons {
  display: grid; grid-template-columns: repeat(5, 1fr);
  gap: 0.2rem; padding: 0 0.3rem;
}
.os-item { display: flex; flex-direction: column; align-items: center; }
.os-icon { font-size: 1rem; }
.os-name { font-size: 0.4rem; color: #94a3b8; margin-top: 0.1rem; }

/* Bootloader */
.stage-1 { background: #0f172a; flex-direction: column; padding: 0.5rem; align-items: flex-start; }
.screen-bootloader { width: 100%; }
.bl-header { color: #fbbf24; font-size: 0.55rem; margin-bottom: 0.4rem; font-weight: 700; }
.bl-flow { display: flex; flex-direction: column; gap: 0.2rem; margin-bottom: 0.4rem; }
.bl-step {
  display: flex; align-items: center; gap: 0.3rem;
  color: #64748b; font-size: 0.55rem;
  transition: all 0.3s;
}
.bl-step.active { color: #fbbf24; }
.bl-num {
  width: 1rem; height: 1rem; border-radius: 50%;
  background: rgba(255,255,255,0.1); display: flex;
  align-items: center; justify-content: center; font-size: 0.5rem;
}
.bl-step.active .bl-num { background: #fbbf24; color: #000; }
.bl-code {
  background: rgba(0,0,0,0.5); border-radius: 4px;
  padding: 0.3rem; font-size: 0.45rem; color: #64748b;
  font-family: monospace;
}
.code-line { line-height: 1.4; padding: 0 0.2rem; }
.code-line.highlight { color: #fbbf24; background: rgba(251, 191, 36, 0.1); border-radius: 2px; }

/* Kernel */
.stage-2 { background: #1a1a2e; flex-direction: column; padding: 0.6rem; }
.screen-kernel { text-align: center; width: 100%; }
.kernel-header { color: #60a5fa; font-size: 0.55rem; margin-bottom: 0.4rem; font-weight: 700; }
.kernel-logo { font-size: 2rem; margin-bottom: 0.2rem; }
.kernel-name { color: #fff; font-size: 0.6rem; margin-bottom: 0.4rem; }
.kernel-bar-wrap {
  width: 80%; height: 6px; background: #333; border-radius: 3px;
  margin: 0 auto 0.4rem; overflow: hidden;
}
.kernel-bar {
  height: 100%; background: linear-gradient(90deg, #60a5fa, #3b82f6);
  transition: width 0.1s linear;
}
.kernel-modules { display: flex; flex-direction: column; gap: 0.15rem; }
.k-module {
  display: flex; align-items: center; gap: 0.3rem;
  color: #64748b; font-size: 0.55rem;
}
.k-module.loaded { color: #4ade80; }
.k-status { width: 1rem; text-align: center; }

/* Services */
.stage-3 { background: #0f172a; flex-direction: column; padding: 0.5rem; }
.screen-services { width: 100%; }
.svc-header { color: #a78bfa; font-size: 0.55rem; margin-bottom: 0.4rem; font-weight: 700; }
.svc-grid {
  display: grid; grid-template-columns: repeat(2, 1fr);
  gap: 0.3rem; margin-bottom: 0.4rem;
}
.svc-item {
  display: flex; align-items: center; gap: 0.2rem;
  padding: 0.25rem; background: rgba(255,255,255,0.05);
  border-radius: 4px; font-size: 0.5rem; color: #64748b;
  transition: all 0.3s;
}
.svc-item.started { color: #a78bfa; background: rgba(167, 139, 250, 0.1); }
.svc-icon { font-size: 0.7rem; }
.svc-name { flex: 1; }
.svc-status { font-size: 0.5rem; }
.svc-progress-bar {
  height: 4px; background: #333; border-radius: 2px; overflow: hidden;
}
.svc-progress-fill {
  height: 100%; background: linear-gradient(90deg, #a78bfa, #8b5cf6);
  transition: width 0.1s linear;
}

/* Desktop */
.stage-4 { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 0; }
.screen-desktop { width: 100%; height: 100%; }
.desktop-bg {
  width: 100%; height: 100%;
  display: flex; flex-direction: column; justify-content: space-between;
}
.desktop-icons {
  display: grid; grid-template-columns: repeat(4, 1fr);
  gap: 0.3rem; padding: 0.6rem 0.4rem;
}
.desktop-icon {
  display: flex; flex-direction: column; align-items: center;
  gap: 0.1rem;
}
.d-icon { font-size: 1.2rem; filter: drop-shadow(0 1px 2px rgba(0,0,0,0.3)); }
.d-label { font-size: 0.45rem; color: white; text-shadow: 0 1px 2px rgba(0,0,0,0.5); }
.taskbar {
  background: rgba(0,0,0,0.6); backdrop-filter: blur(8px);
  display: flex; align-items: center; gap: 0.4rem;
  padding: 0.25rem 0.4rem;
}
.taskbar-start { font-size: 0.9rem; cursor: pointer; }
.taskbar-apps { display: flex; gap: 0.2rem; flex: 1; }
.taskbar-app { font-size: 0.8rem; opacity: 0.8; cursor: pointer; }
.taskbar-time { color: white; font-size: 0.5rem; }

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

/* 操作系统对比表 */
.os-comparison {
  margin-top: 0.6rem; padding: 0.5rem 0.6rem;
  background: var(--vp-c-bg); border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
}
.os-comp-header {
  display: flex; align-items: center; gap: 0.3rem;
  margin-bottom: 0.4rem;
}
.os-comp-icon { font-size: 0.9rem; }
.os-comp-title { font-size: 0.7rem; font-weight: 600; color: var(--vp-c-text-1); }
.os-comp-table { display: flex; flex-direction: column; gap: 0.2rem; }
.os-comp-row {
  display: grid; grid-template-columns: 1.2fr 1.5fr 1.3fr;
  gap: 0.3rem; font-size: 0.6rem; padding: 0.2rem 0;
  border-bottom: 1px solid var(--vp-c-divider);
}
.os-comp-row:last-child { border-bottom: none; }
.os-comp-header-row { font-weight: 600; color: var(--vp-c-text-1); }
.os-comp-cell { color: var(--vp-c-text-2); }
.os-name-cell { display: flex; align-items: center; gap: 0.2rem; }
.os-comp-icon-small { font-size: 0.7rem; }

/* 启动流程对比 */
.boot-flow-comparison {
  margin-top: 0.6rem; padding: 0.5rem 0.6rem;
  background: var(--vp-c-bg); border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
}
.bf-header {
  display: flex; align-items: center; gap: 0.3rem;
  margin-bottom: 0.4rem;
}
.bf-icon { font-size: 0.9rem; }
.bf-title { font-size: 0.7rem; font-weight: 600; color: var(--vp-c-text-1); }
.bf-content { display: flex; gap: 0.5rem; }
.bf-col { flex: 1; }
.bf-os-name { font-size: 0.65rem; font-weight: 600; color: var(--vp-c-text-1); margin-bottom: 0.3rem; }
.bf-flow { display: flex; flex-direction: column; gap: 0.15rem; }
.bf-step { display: flex; flex-direction: column; align-items: center; font-size: 0.55rem; }
.bf-arrow { color: var(--vp-c-brand); font-size: 0.6rem; }
.bf-step-text {
  padding: 0.15rem 0.3rem; background: var(--vp-c-bg-soft);
  border-radius: 3px; color: var(--vp-c-text-2);
}

/* 展开动画 */
.expand-enter-active, .expand-leave-active { transition: all 0.25s ease; overflow: hidden; }
.expand-enter-from, .expand-leave-to { opacity: 0; max-height: 0; }
.expand-enter-to, .expand-leave-from { opacity: 1; max-height: 20rem; }

@media (max-width: 720px) {
  .main-layout { flex-direction: column; }
  .screen-panel { flex: none; width: 100%; }
  .bf-content { flex-direction: column; }
}
</style>
