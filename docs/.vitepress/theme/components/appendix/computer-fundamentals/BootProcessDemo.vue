<template>
  <div class="boot-demo">
    <div class="demo-header">
      <span class="demo-title">从开机到桌面</span>
    </div>

    <div class="main-layout">
      <!-- 左侧：模拟屏幕 -->
      <div class="screen-panel">
        <div class="monitor">
          <div class="monitor-bezel">
            <div class="screen" :class="'stage-' + stage">
              <!-- Stage 0: 关机 -->
              <div v-if="stage === 0" class="screen-off">
                <div class="power-icon">⏻</div>
                <div class="off-text">按下电源键开始</div>
              </div>

              <!-- Stage 1: BIOS 自检 -->
              <div v-if="stage === 1" class="screen-bios">
                <div class="bios-line" v-for="(line, i) in biosLines" :key="i">{{ line }}</div>
                <div class="bios-cursor">_</div>
              </div>

              <!-- Stage 2: 内核加载 -->
              <div v-if="stage === 2" class="screen-kernel">
                <div class="kernel-logo">🐧</div>
                <div class="kernel-text">Loading kernel...</div>
                <div class="kernel-bar-wrap">
                  <div class="kernel-bar"></div>
                </div>
                <div class="kernel-modules">
                  <div v-for="m in kernelModules" :key="m">[ OK ] {{ m }}</div>
                </div>
              </div>

              <!-- Stage 3: 服务启动 -->
              <div v-if="stage === 3" class="screen-services">
                <div class="svc-header">Starting system services...</div>
                <div class="svc-list">
                  <div v-for="s in services" :key="s.name" class="svc-item">
                    <span class="svc-status" :class="s.ok ? 'ok' : ''">{{ s.ok ? '●' : '○' }}</span>
                    <span>{{ s.name }}</span>
                  </div>
                </div>
              </div>

              <!-- Stage 4: 桌面 -->
              <div v-if="stage === 4" class="screen-desktop">
                <div class="desktop-icons">
                  <div class="desktop-icon" v-for="ic in desktopIcons" :key="ic.label">
                    <span class="icon-emoji">{{ ic.icon }}</span>
                    <span class="icon-label">{{ ic.label }}</span>
                  </div>
                </div>
                <div class="taskbar">
                  <span class="taskbar-menu">☰</span>
                  <span class="taskbar-time">09:57</span>
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
          <button class="ctrl-btn primary" v-if="stage === 0" @click="next">⏻ 开机</button>
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
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const stage = ref(0)
const expandedOp = ref(-1)

const biosLines = [
  'American Megatrends BIOS v2.20',
  'CPU: Intel Core i7 @ 3.60GHz ... OK',
  'Memory: 16384 MB ... OK',
  'GPU: NVIDIA GeForce RTX ... OK',
  'Keyboard ... OK',
  'Detecting drives ...',
  'SATA0: Samsung SSD 512GB',
  'Boot from Hard Disk ...'
]

const kernelModules = [
  'Started Memory Manager',
  'Started Process Scheduler',
  'Loaded disk driver',
  'Mounted root filesystem'
]

const services = [
  { name: 'Network Manager', ok: true },
  { name: 'Firewall (iptables)', ok: true },
  { name: 'Audio Service', ok: true },
  { name: 'SSH Server', ok: true },
  { name: 'Display Manager', ok: true },
  { name: 'System Logger', ok: true }
]

const desktopIcons = [
  { icon: '📁', label: '文件' },
  { icon: '🌐', label: '浏览器' },
  { icon: '⚙️', label: '设置' },
  { icon: '🗑️', label: '回收站' }
]

const stages = [
  {
    short: '关机',
    icon: '⏻',
    name: '准备就绪',
    desc: '电脑处于关机状态，按下电源键即可开始启动流程',
    operations: [
      {
        icon: '🔌', name: '电源供电',
        what: '按下电源键后，电源（PSU）将交流电转换为直流电，为主板、CPU、内存等供电。',
        details: ['220V 交流电 → 12V/5V/3.3V 直流电', '主板收到 Power Good 信号后开始工作']
      },
      {
        icon: '⚡', name: 'CPU 复位',
        what: 'CPU 收到复位信号，清空所有寄存器，跳转到固定地址（0xFFFFFFF0）执行第一条指令。',
        details: ['所有寄存器归零', '指令指针指向 BIOS/UEFI 固件入口']
      }
    ],
    analogy: '就像你按下汽车的启动按钮——电池通电，发动机准备点火。'
  },
  {
    short: 'BIOS 自检',
    icon: '📟',
    name: 'BIOS/UEFI 自检',
    desc: '固件程序逐一检测硬件，确保一切正常后寻找启动设备',
    operations: [
      {
        icon: '🧠', name: '内存检测（POST）',
        what: '向内存写入测试数据并读回验证，确认每根内存条都能正常工作。',
        details: ['逐字节写入/读取测试', '检测内存容量和速度', '失败会发出蜂鸣声（1长3短 = 内存错误）']
      },
      {
        icon: '🎮', name: '显卡检测',
        what: '初始化显卡，尝试输出画面。如果显卡故障，屏幕会保持黑屏。',
        details: ['加载显卡 BIOS', '设置基本显示模式', '失败蜂鸣：1长2短']
      },
      {
        icon: '⌨️', name: '外设检测',
        what: '扫描 USB/PS2 端口，检测键盘、鼠标等输入设备。',
        details: ['枚举 USB 设备', '检测键盘响应', '非关键设备，缺失不影响启动']
      },
      {
        icon: '💾', name: '寻找启动设备',
        what: '按照启动顺序（Boot Order）依次检查硬盘、U盘、网络，找到可启动设备。',
        details: ['读取 CMOS 中的启动顺序设置', '检查设备第一扇区的 0x55AA 签名', '找到后将引导代码加载到内存 0x7C00']
      }
    ],
    analogy: '好比飞机起飞前的安全检查——机长逐项确认引擎、仪表、燃油，有问题就不能起飞。'
  },
  {
    short: '内核加载',
    icon: '⚙️',
    name: '操作系统内核加载',
    desc: '引导程序找到内核文件，将其加载到内存，内核接管整台计算机',
    operations: [
      {
        icon: '📀', name: '引导程序（Bootloader）',
        what: '硬盘第一扇区的引导程序（如 GRUB、bootmgr）读取分区表，找到内核文件位置。',
        details: ['Windows: bootmgr → 读取 BCD 配置', 'Linux: GRUB → 显示系统选择菜单', 'macOS: boot.efi → 直接加载 XNU 内核']
      },
      {
        icon: '📦', name: '内核解压与加载',
        what: '内核通常是压缩存储的，引导程序将其解压并复制到内存的指定位置。',
        details: ['解压 vmlinuz（Linux）或加载 ntoskrnl.exe（Windows）', '内核大小通常 5-15 MB']
      },
      {
        icon: '🧠', name: '初始化内存管理',
        what: '建立虚拟内存页表，划分内核空间和用户空间，让每个程序以为自己独占内存。',
        details: ['建立页表映射', '内核空间：高地址区域', '用户空间：低地址区域，程序运行在这里']
      },
      {
        icon: '📁', name: '挂载根文件系统',
        what: '将硬盘分区挂载为根目录（/），从此系统可以读写文件。',
        details: ['识别文件系统类型（NTFS/ext4/APFS）', '挂载为 /（Linux）或 C:\\（Windows）', '加载设备驱动程序']
      }
    ],
    analogy: '内核就像公司的 CEO 上任——接管所有部门（硬件），安排人事（进程）、财务（内存）、后勤（设备）各就各位。'
  },
  {
    short: '服务启动',
    icon: '🔧',
    name: '系统服务启动',
    desc: '内核拉起第一个用户进程，按依赖顺序启动各种后台服务',
    operations: [
      {
        icon: '🚀', name: '初始化进程启动',
        what: '内核启动第一个用户态进程（PID=1），它是所有其他进程的"祖先"。',
        details: ['Linux: systemd 或 init', 'Windows: smss.exe → csrss.exe → wininit.exe', '负责按配置文件拉起后续服务']
      },
      {
        icon: '🌐', name: '网络服务',
        what: '初始化网卡驱动，通过 DHCP 获取 IP 地址，启动 DNS 解析。',
        details: ['加载网卡驱动', '发送 DHCP 请求获取 IP', '配置 DNS 服务器地址']
      },
      {
        icon: '🔒', name: '安全服务',
        what: '启动防火墙、用户认证系统，确保系统安全。',
        details: ['Linux: iptables/nftables 防火墙', 'Windows: Windows Defender、安全中心', '加载登录管理器，准备用户认证']
      },
      {
        icon: '🔊', name: '多媒体与其他服务',
        what: '启动音频服务、打印服务、日志服务等，让系统功能完整。',
        details: ['音频混合器（PulseAudio/PipeWire）', '系统日志（journald/Event Log）', '定时任务（cron/Task Scheduler）']
      }
    ],
    analogy: '就像商场开门营业前——保安到岗（安全）、空调开启（后台服务）、收银上线（网络），一切就绪迎接顾客。'
  },
  {
    short: '桌面就绪',
    icon: '🖥️',
    name: '桌面环境显示',
    desc: '图形界面启动完成，你熟悉的桌面出现了',
    operations: [
      {
        icon: '🎮', name: '显卡驱动加载',
        what: '初始化 GPU，设置屏幕分辨率、刷新率和色彩深度。',
        details: ['加载 NVIDIA/AMD/Intel 驱动', '设置分辨率（如 1920×1080）', '启用硬件加速']
      },
      {
        icon: '🪟', name: '显示服务器启动',
        what: '窗口管理系统启动，负责管理所有窗口的绘制、层叠和交互。',
        details: ['Windows: Desktop Window Manager (DWM)', 'Linux: X Server 或 Wayland', 'macOS: WindowServer']
      },
      {
        icon: '🎨', name: '桌面环境渲染',
        what: '绘制壁纸、桌面图标、任务栏、系统托盘等界面元素。',
        details: ['Windows: explorer.exe 渲染桌面', 'Linux: GNOME/KDE/XFCE 桌面环境', 'macOS: Finder + Dock']
      },
      {
        icon: '👆', name: '等待用户操作',
        what: '鼠标光标出现，键盘就绪，系统进入完全可交互状态。',
        details: ['加载用户配置和偏好设置', '恢复上次会话（如果设置了）', '自启动程序开始运行']
      }
    ],
    analogy: '幕布拉开，灯光亮起——舞台（窗口）搭好，演员（图标）就位，等待观众（你）的第一次操作。'
  }
]

const currentStage = computed(() => stages[stage.value])

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
}
</script>

<style scoped>
.boot-demo {
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

/* 关机 */
.stage-0 { background: #000; }
.screen-off { text-align: center; color: #555; }
.power-icon { font-size: 2.5rem; margin-bottom: 0.3rem; }
.off-text { font-size: 0.6rem; }

/* BIOS */
.stage-1 { background: #000; align-items: flex-start; justify-content: flex-start; padding: 0.5rem; flex-direction: column; }
.screen-bios { width: 100%; }
.bios-line { color: #aaa; font-size: 0.5rem; line-height: 1.5; }
.bios-cursor { color: #fff; animation: blink 1s infinite; font-size: 0.55rem; }

/* 内核 */
.stage-2 { background: #1a1a2e; flex-direction: column; padding: 0.6rem; }
.screen-kernel { text-align: center; width: 100%; }
.kernel-logo { font-size: 1.8rem; margin-bottom: 0.3rem; }
.kernel-text { color: #ccc; font-size: 0.55rem; margin-bottom: 0.4rem; }
.kernel-bar-wrap {
  width: 70%; height: 4px; background: #333; border-radius: 2px;
  margin: 0 auto 0.5rem; overflow: hidden;
}
.kernel-bar {
  width: 100%; height: 100%;
  background: linear-gradient(90deg, #4ade80, #22d3ee);
  animation: loading 2s ease-in-out infinite;
}
.kernel-modules { text-align: left; width: 100%; }
.kernel-modules div { color: #4ade80; font-size: 0.45rem; line-height: 1.6; }

/* 服务 */
.stage-3 { background: #0f172a; flex-direction: column; align-items: flex-start; padding: 0.6rem; }
.screen-services { width: 100%; }
.svc-header { color: #94a3b8; font-size: 0.55rem; margin-bottom: 0.4rem; }
.svc-list { display: flex; flex-direction: column; gap: 0.15rem; }
.svc-item { color: #cbd5e1; font-size: 0.48rem; display: flex; align-items: center; gap: 0.3rem; }
.svc-status { font-size: 0.5rem; color: #475569; }
.svc-status.ok { color: #4ade80; }

/* 桌面 */
.stage-4 { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); flex-direction: column; justify-content: space-between; padding: 0; }
.screen-desktop { flex: 1; display: flex; flex-direction: column; justify-content: space-between; width: 100%; }
.desktop-icons {
  display: grid; grid-template-columns: repeat(4, 1fr);
  gap: 0.3rem; padding: 0.8rem 0.5rem; justify-items: center;
}
.desktop-icon { display: flex; flex-direction: column; align-items: center; gap: 0.1rem; }
.icon-emoji { font-size: 1.3rem; filter: drop-shadow(0 1px 2px rgba(0,0,0,0.3)); }
.icon-label { font-size: 0.45rem; color: white; text-shadow: 0 1px 2px rgba(0,0,0,0.5); }
.taskbar {
  background: rgba(0,0,0,0.6); backdrop-filter: blur(8px);
  display: flex; justify-content: space-between; align-items: center;
  padding: 0.25rem 0.5rem;
}
.taskbar-menu { color: white; font-size: 0.7rem; }
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

/* 展开动画 */
.expand-enter-active, .expand-leave-active { transition: all 0.25s ease; overflow: hidden; }
.expand-enter-from, .expand-leave-to { opacity: 0; max-height: 0; }
.expand-enter-to, .expand-leave-from { opacity: 1; max-height: 20rem; }

@keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
@keyframes loading { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }

@media (max-width: 720px) {
  .main-layout { flex-direction: column; }
  .screen-panel { flex: none; width: 100%; }
}
</style>
