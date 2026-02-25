<template>
  <div class="bios-demo">
    <div class="demo-header">
      <span class="demo-icon">📟</span>
      <span class="demo-title">BIOS/UEFI 工作流程</span>
      <span class="demo-hint">点击每一步查看详情</span>
    </div>

    <div class="timeline">
      <div
        v-for="(step, i) in steps"
        :key="i"
        class="timeline-item"
        :class="{ active: active === i, done: active > i }"
        @click="active = active === i ? -1 : i"
      >
        <div class="marker-col">
          <div class="dot">
            <span v-if="active > i" class="check">✓</span>
            <span v-else>{{ i + 1 }}</span>
          </div>
          <div v-if="i < steps.length - 1" class="line"></div>
        </div>

        <div class="card">
          <div class="card-header">
            <span class="step-icon">{{ step.icon }}</span>
            <div class="card-titles">
              <div class="step-name">{{ step.name }}</div>
              <div class="step-brief">{{ step.brief }}</div>
            </div>
            <span class="expand-icon">{{ active === i ? '▾' : '▸' }}</span>
          </div>

          <transition name="slide">
            <div v-if="active === i" class="card-detail">
              <div class="detail-desc">{{ step.detail }}</div>
              <div class="detail-visual">
                <div
                  v-for="(item, j) in step.items"
                  :key="j"
                  class="visual-item"
                  :class="{ 'error-item': item.error }"
                >
                  <span class="vi-icon">{{ item.icon }}</span>
                  <div class="vi-text">
                    <span class="vi-label">{{ item.label }}</span>
                    <span class="vi-desc">{{ item.desc }}</span>
                  </div>
                </div>
              </div>
              <div v-if="step.analogy" class="analogy">
                <span class="analogy-icon">💡</span>
                <span class="analogy-text">{{ step.analogy }}</span>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </div>

    <div class="beep-note">
      <span class="beep-icon">🔔</span>
      <div class="beep-content">
        <div class="beep-title">蜂鸣声错误码</div>
        <div class="beep-desc">如果 POST 发现问题，主板会发出蜂鸣声。不同次数代表不同错误：</div>
        <div class="beep-codes">
          <div v-for="code in beepCodes" :key="code.beeps" class="beep-code">
            <span class="beep-count">{{ code.beeps }}</span>
            <span class="beep-meaning">{{ code.meaning }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const active = ref(-1)

const steps = [
  {
    icon: '🔍',
    name: '硬件自检（POST）',
    brief: '检查内存、显卡、键盘等部件是否正常',
    detail: 'Power-On Self-Test 是开机后执行的第一段程序。BIOS/UEFI 固件逐一检测关键硬件，确保它们能正常工作，任何故障都会在这一步被发现。',
    items: [
      { icon: '🧠', label: '内存检测', desc: '向内存写入测试数据并读回验证，确认每个内存条工作正常' },
      { icon: '🎮', label: '显卡检测', desc: '初始化显卡，尝试输出画面；如果失败，屏幕会保持黑屏' },
      { icon: '⌨️', label: '键盘/鼠标检测', desc: '扫描 PS/2 或 USB 端口，检测输入设备是否连接并响应' },
      { icon: '💾', label: '存储设备检测', desc: '识别硬盘、SSD、光驱等存储设备，读取设备信息' },
      { icon: '❌', label: '错误报告', desc: '检测失败时通过蜂鸣声或屏幕错误码告知用户具体问题', error: true }
    ],
    analogy: '就像飞机起飞前的安全检查——机长逐项确认引擎、仪表、燃油都正常，有任何问题就不能起飞。'
  },
  {
    icon: '⚙️',
    name: '初始化硬件',
    brief: '设置硬件工作模式，配置中断向量表',
    detail: '自检通过后，BIOS/UEFI 开始配置各硬件的工作参数：设置 CPU 频率、内存时序、配置中断控制器，建立硬件与软件之间的通信桥梁。',
    items: [
      { icon: '🔧', label: '设置工作模式', desc: '配置 CPU 运行频率、内存时序（CAS Latency）等参数' },
      { icon: '📋', label: '中断向量表', desc: '建立中断号与处理程序的映射表，让硬件事件能被正确响应' },
      { icon: '🔌', label: 'PCI 设备枚举', desc: '扫描 PCI/PCIe 总线，为显卡、网卡、声卡分配资源' },
      { icon: '🕐', label: '时钟初始化', desc: '读取 CMOS 中的实时时钟（RTC），同步系统时间' }
    ],
    analogy: '好比乐队演出前的调音——每件乐器（硬件）都要调到正确的音高（工作模式），指挥（中断控制器）要能指挥每个声部。'
  },
  {
    icon: '🔎',
    name: '寻找启动设备',
    brief: '按启动顺序查找可启动设备，读取启动扇区',
    detail: 'BIOS/UEFI 按照用户设定的启动顺序（Boot Order），依次检查硬盘、U 盘、网络等设备，找到第一个包含有效引导记录的设备，读取其启动扇区并将控制权交出。',
    items: [
      { icon: '📑', label: '读取启动顺序', desc: '从 CMOS/NVRAM 中读取用户设定的设备优先级列表' },
      { icon: '💿', label: '检查启动扇区', desc: '读取设备第一个扇区，验证末尾的 0x55AA 魔数签名' },
      { icon: '🔀', label: '多设备尝试', desc: '第一个设备无法启动时，自动尝试下一个（硬盘→U盘→网络）' },
      { icon: '🚀', label: '跳转执行', desc: '将启动扇区代码加载到内存 0x7C00，CPU 跳转到该地址执行' }
    ],
    analogy: '就像你早上出门找交通工具——先看车库有没有车（硬盘），没有就看门口有没有共享单车（U盘），再不行就叫网约车（网络启动）。'
  }
]

const beepCodes = [
  { beeps: '1 短', meaning: '正常启动，一切 OK' },
  { beeps: '1 长 2 短', meaning: '显卡错误或未插好' },
  { beeps: '1 长 3 短', meaning: '内存错误或未插好' },
  { beeps: '持续长鸣', meaning: '内存未检测到' },
  { beeps: '持续短鸣', meaning: '电源供电异常' }
]
</script>

<style scoped>
.bios-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  background: var(--vp-c-bg-soft);
  padding: 1.2rem;
  margin: 1rem 0;
}
.demo-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
}
.demo-icon { font-size: 1.2rem; }
.demo-title {
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
}
.demo-hint {
  font-size: 0.65rem;
  color: var(--vp-c-text-3);
  margin-left: auto;
}

.timeline { display: flex; flex-direction: column; }

.timeline-item {
  display: flex;
  gap: 0.8rem;
  cursor: pointer;
}

.marker-col {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 2rem;
  flex-shrink: 0;
}
.dot {
  width: 1.8rem;
  height: 1.8rem;
  border-radius: 50%;
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider);
  color: var(--vp-c-text-3);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.7rem;
  font-weight: 700;
  transition: all 0.3s;
}
.timeline-item.active .dot {
  background: var(--vp-c-brand);
  border-color: var(--vp-c-brand);
  color: white;
  transform: scale(1.15);
  box-shadow: 0 0 0 4px var(--vp-c-brand-soft);
}
.timeline-item.done .dot {
  background: #10b981;
  border-color: #10b981;
  color: white;
}
.check { font-size: 0.65rem; }
.line {
  flex: 1;
  width: 2px;
  background: var(--vp-c-divider);
  min-height: 0.8rem;
  transition: background 0.3s;
}
.timeline-item.done .line { background: #10b981; opacity: 0.5; }
.timeline-item.active .line { background: var(--vp-c-brand); opacity: 0.4; }

.card {
  flex: 1;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 0.7rem 0.9rem;
  margin-bottom: 0.5rem;
  transition: all 0.25s;
}
.timeline-item.active .card {
  border-color: var(--vp-c-brand);
  box-shadow: 0 2px 12px rgba(0,0,0,0.06);
}
.card-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.step-icon { font-size: 1.2rem; }
.card-titles { flex: 1; }
.step-name {
  font-size: 0.78rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
}
.step-brief {
  font-size: 0.68rem;
  color: var(--vp-c-text-3);
  margin-top: 0.1rem;
  line-height: 1.4;
}
.expand-icon {
  font-size: 0.7rem;
  color: var(--vp-c-text-3);
}

.card-detail {
  margin-top: 0.7rem;
  padding-top: 0.7rem;
  border-top: 1px dashed var(--vp-c-divider);
}
.detail-desc {
  font-size: 0.72rem;
  color: var(--vp-c-text-2);
  line-height: 1.6;
  margin-bottom: 0.6rem;
}
.detail-visual {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.4rem;
}
.visual-item {
  display: flex;
  align-items: flex-start;
  gap: 0.4rem;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  padding: 0.45rem 0.55rem;
}
.visual-item.error-item {
  background: rgba(239, 68, 68, 0.08);
  border: 1px solid rgba(239, 68, 68, 0.15);
}
.vi-icon { font-size: 0.9rem; flex-shrink: 0; margin-top: 0.05rem; }
.vi-text { display: flex; flex-direction: column; }
.vi-label {
  font-size: 0.68rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}
.vi-desc {
  font-size: 0.62rem;
  color: var(--vp-c-text-3);
  line-height: 1.4;
  margin-top: 0.1rem;
}

.analogy {
  display: flex;
  align-items: flex-start;
  gap: 0.4rem;
  margin-top: 0.6rem;
  padding: 0.5rem 0.6rem;
  background: var(--vp-c-brand-soft);
  border-radius: 6px;
}
.analogy-icon { font-size: 0.85rem; flex-shrink: 0; }
.analogy-text {
  font-size: 0.66rem;
  color: var(--vp-c-text-2);
  line-height: 1.5;
  font-style: italic;
}

.beep-note {
  display: flex;
  gap: 0.6rem;
  margin-top: 0.8rem;
  padding: 0.7rem 0.8rem;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  border-left: 3px solid #f59e0b;
}
.beep-icon { font-size: 1.1rem; flex-shrink: 0; }
.beep-content { flex: 1; }
.beep-title {
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
  margin-bottom: 0.2rem;
}
.beep-desc {
  font-size: 0.66rem;
  color: var(--vp-c-text-3);
  margin-bottom: 0.5rem;
}
.beep-codes {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
}
.beep-code {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  background: var(--vp-c-bg-soft);
  border-radius: 4px;
  padding: 0.25rem 0.5rem;
}
.beep-count {
  font-size: 0.62rem;
  font-weight: 700;
  color: #f59e0b;
  white-space: nowrap;
}
.beep-meaning {
  font-size: 0.62rem;
  color: var(--vp-c-text-2);
  white-space: nowrap;
}

.slide-enter-active, .slide-leave-active {
  transition: all 0.3s ease;
  overflow: hidden;
}
.slide-enter-from, .slide-leave-to {
  opacity: 0;
  max-height: 0;
  margin-top: 0;
  padding-top: 0;
}
.slide-enter-to, .slide-leave-from {
  opacity: 1;
  max-height: 30rem;
}

@media (max-width: 640px) {
  .detail-visual { grid-template-columns: 1fr; }
  .demo-hint { display: none; }
  .beep-codes { flex-direction: column; }
}
</style>
