<template>
  <div class="boot-demo">
    <div class="demo-title">操作系统启动流程</div>
    <div class="timeline">
      <div v-for="(step, i) in steps" :key="step.name" class="timeline-item">
        <div class="marker">
          <span class="dot">{{ i + 1 }}</span>
          <span v-if="i < steps.length - 1" class="line"></span>
        </div>
        <div class="content">
          <div class="step-name">{{ step.name }}</div>
          <div class="step-desc">{{ step.desc }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const steps = [
  { name: '引导程序 Bootloader', desc: '从硬盘启动扇区读取引导代码，找到操作系统内核的位置' },
  { name: '内核加载 Kernel', desc: '将内核载入内存，接管 CPU、内存、设备的控制权' },
  { name: '系统服务启动', desc: '启动网络、安全、音频等后台服务（Windows 服务 / Linux systemd）' },
  { name: '桌面环境显示', desc: '加载显卡驱动 → 启动显示服务 → 渲染桌面背景和图标' }
]
</script>

<style scoped>
.boot-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  padding: 1rem 1.2rem;
  margin: 1rem 0;
}
.demo-title {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
  margin-bottom: 0.8rem;
}
.timeline { display: flex; flex-direction: column; }
.timeline-item { display: flex; gap: 0.7rem; }
.marker {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 1.6rem;
  flex-shrink: 0;
}
.dot {
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  background: var(--vp-c-brand);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.7rem;
  font-weight: 600;
}
.line {
  flex: 1;
  width: 2px;
  background: var(--vp-c-brand);
  opacity: 0.3;
  min-height: 1.2rem;
}
.content { flex: 1; padding-bottom: 0.8rem; }
.step-name {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}
.step-desc {
  font-size: 0.68rem;
  color: var(--vp-c-text-3);
  margin-top: 0.15rem;
  line-height: 1.5;
}
</style>
