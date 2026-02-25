<template>
  <div class="launch-demo">
    <div class="demo-header">
      <span class="demo-icon">🌐</span>
      <span class="demo-title">浏览器启动过程</span>
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
  </div>
</template>

<script setup>
import { ref } from 'vue'

const active = ref(-1)

const steps = [
  {
    icon: '👆',
    name: '双击图标',
    brief: '用户触发启动请求，操作系统开始响应',
    detail: '你双击桌面上的浏览器图标时，操作系统的窗口管理器捕获这个鼠标事件，通过文件关联表查找该图标对应的可执行文件路径。',
    items: [
      { icon: '🖱️', label: '鼠标事件捕获', desc: '窗口管理器检测到双击动作，识别点击目标' },
      { icon: '🔗', label: '快捷方式解析', desc: '读取 .lnk（Windows）或 .desktop（Linux）文件中的目标路径' },
      { icon: '📂', label: '文件关联查找', desc: '在注册表或 MIME 数据库中找到对应的可执行文件' }
    ],
    analogy: '就像你按下遥控器的开机键，电视先要识别你按的是哪个按钮，再决定执行什么操作。'
  },
  {
    icon: '🔍',
    name: '查找可执行文件',
    brief: '根据文件关联，找到浏览器的 .exe 或可执行文件',
    detail: '操作系统根据路径在硬盘上定位浏览器的可执行文件（如 chrome.exe），验证文件完整性和权限，准备加载。',
    items: [
      { icon: '📋', label: '路径解析', desc: '将快捷方式中的路径转换为硬盘上的实际文件位置' },
      { icon: '🔒', label: '权限检查', desc: '验证当前用户是否有执行该文件的权限' },
      { icon: '✅', label: '签名验证', desc: '检查数字签名确认文件未被篡改（Windows UAC）' }
    ],
    analogy: '好比你要找一本书，先查图书馆目录（路径），确认你有借阅权限（权限检查），再确认书没有被损坏（签名验证）。'
  },
  {
    icon: '📋',
    name: '创建浏览器进程',
    brief: '为浏览器创建一个新的进程，分配进程 ID',
    detail: '操作系统内核调用 fork()+exec()（Linux）或 CreateProcess()（Windows），在进程表中创建新条目，分配唯一的 PID，建立进程控制块（PCB）。',
    items: [
      { icon: '🆔', label: '分配 PID', desc: '为新进程分配唯一的进程标识符' },
      { icon: '📊', label: '创建 PCB', desc: '记录进程状态、优先级、寄存器上下文等元信息' },
      { icon: '🧠', label: '分配虚拟地址空间', desc: '为进程创建独立的 4GB（32位）虚拟内存空间' },
      { icon: '📑', label: '初始化文件描述符', desc: '打开 stdin/stdout/stderr 三个标准 I/O 通道' }
    ],
    analogy: '就像新生儿出生要办户口——分配身份证号（PID）、建立档案（PCB）、分配住房（内存空间）。'
  },
  {
    icon: '💾',
    name: '加载代码到内存',
    brief: '把浏览器的程序代码从硬盘读取到内存中',
    detail: '操作系统的加载器（Loader）解析可执行文件格式（PE/ELF），将代码段、数据段映射到虚拟内存，并加载所需的动态链接库（DLL/SO）。',
    items: [
      { icon: '📦', label: '解析文件格式', desc: '读取 PE（Windows）或 ELF（Linux）文件头，确定各段位置' },
      { icon: '🗺️', label: '内存映射', desc: '将 .text（代码）、.data（数据）、.bss 段映射到虚拟地址' },
      { icon: '🔗', label: '动态链接', desc: '加载 DLL/SO 共享库，解析函数符号引用' },
      { icon: '📍', label: '重定位', desc: '修正代码中的绝对地址引用，适配实际加载位置' }
    ],
    analogy: '好比搬家——把家具（代码）从仓库（硬盘）搬到新房（内存），还要接通水电（链接库）。'
  },
  {
    icon: '🚀',
    name: '初始化各模块',
    brief: '启动主线程、渲染引擎、网络引擎、JS 引擎等',
    detail: '浏览器的 main() 函数开始执行，依次初始化多进程架构中的各个核心模块：Browser 主进程、GPU 进程、网络进程等。',
    items: [
      { icon: '🧵', label: '主线程启动', desc: '初始化消息循环（Event Loop），处理 UI 事件和任务调度' },
      { icon: '🎨', label: '渲染引擎', desc: '初始化 Blink/Gecko 引擎，准备解析 HTML/CSS' },
      { icon: '🌐', label: '网络模块', desc: '启动网络栈，初始化 DNS 缓存、连接池、Cookie 管理' },
      { icon: '⚡', label: 'JS 引擎', desc: '初始化 V8/SpiderMonkey，编译内置 JavaScript 代码' }
    ],
    analogy: '就像一家餐厅开业前——厨房（渲染）、前台（UI）、外卖（网络）、收银（JS）各部门同时准备就绪。'
  },
  {
    icon: '🖼️',
    name: '显示浏览器窗口',
    brief: '所有模块就绪，浏览器界面呈现在屏幕上',
    detail: '浏览器向操作系统请求创建窗口，GPU 进程完成界面的合成与光栅化，最终将像素数据提交给显卡，浏览器窗口出现在屏幕上。',
    items: [
      { icon: '🪟', label: '创建窗口', desc: '调用系统 API 创建原生窗口，设置大小和位置' },
      { icon: '🎨', label: 'UI 绘制', desc: '渲染地址栏、标签页、工具栏等浏览器 Chrome 界面' },
      { icon: '🖥️', label: 'GPU 合成', desc: '将各图层合成为最终画面，提交给显卡输出' },
      { icon: '✨', label: '加载首页', desc: '打开新标签页或恢复上次会话，浏览器进入可用状态' }
    ],
    analogy: '幕布拉开，灯光亮起——舞台（窗口）搭好了，演员（界面元素）就位，等待观众（你）的第一次操作。'
  }
]
</script>

<style scoped>
.launch-demo {
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
  transition: transform 0.2s;
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
}
</style>
