<template>
  <div class="process-demo">
    <div class="demo-header">
      <span class="icon">🔄</span>
      <span class="title">进程：程序的"分身术"</span>
      <span class="subtitle">一个程序如何同时运行多个实例</span>
    </div>

    <div class="demo-content">
      <div class="process-list">
        <div class="process-header">
          <span class="col-name">进程名</span>
          <span class="col-pid">PID</span>
          <span class="col-state">状态</span>
          <span class="col-mem">内存</span>
        </div>
        <div 
          v-for="p in processes" 
          :key="p.pid"
          class="process-item"
          :class="{ running: p.state === '运行中', selected: selectedPid === p.pid }"
          @click="selectedPid = p.pid"
        >
          <span class="col-name">
            <span class="process-icon">{{ p.icon }}</span>
            {{ p.name }}
          </span>
          <span class="col-pid">{{ p.pid }}</span>
          <span class="col-state">
            <span
              class="state-badge"
              :class="p.state === '运行中' ? 'running' : 'waiting'"
            >
              {{ p.state }}
            </span>
          </span>
          <span class="col-mem">{{ p.memory }}</span>
        </div>
      </div>

      <div
        v-if="selectedProcess"
        class="process-detail"
      >
        <div class="detail-title">
          进程详情：{{ selectedProcess.name }}
        </div>
        <div class="detail-grid">
          <div class="detail-item">
            <span class="label">进程ID (PID)</span>
            <span class="value">{{ selectedProcess.pid }}</span>
          </div>
          <div class="detail-item">
            <span class="label">父进程ID</span>
            <span class="value">{{ selectedProcess.ppid }}</span>
          </div>
          <div class="detail-item">
            <span class="label">内存占用</span>
            <span class="value">{{ selectedProcess.memory }}</span>
          </div>
          <div class="detail-item">
            <span class="label">CPU 占用</span>
            <span class="value">{{ selectedProcess.cpu }}%</span>
          </div>
        </div>
        <div class="memory-layout">
          <div class="layout-title">
            进程内存布局
          </div>
          <div class="layout-visual">
            <div
              v-for="seg in memorySegments"
              :key="seg.name"
              class="segment"
              :style="{ height: seg.height }"
            >
              <span class="seg-name">{{ seg.name }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="info-box">
      <span class="icon">💡</span>
      <strong>核心思想：</strong>进程是程序的"运行实例"。同一个程序可以启动多个进程，每个进程有独立的内存空间，互不干扰。
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const selectedPid = ref(1001)

const processes = ref([
  { pid: 1001, name: 'Chrome', icon: '🌐', state: '运行中', memory: '512MB', cpu: 15, ppid: 1 },
  { pid: 1002, name: 'VS Code', icon: '📝', state: '运行中', memory: '384MB', cpu: 8, ppid: 1 },
  { pid: 1003, name: '微信', icon: '💬', state: '等待中', memory: '256MB', cpu: 2, ppid: 1 },
  { pid: 1004, name: '终端', icon: '⬛', state: '等待中', memory: '32MB', cpu: 0, ppid: 1002 },
  { pid: 1005, name: '音乐', icon: '🎵', state: '运行中', memory: '128MB', cpu: 3, ppid: 1 }
])

const selectedProcess = computed(() => {
  return processes.value.find(p => p.pid === selectedPid.value)
})

const memorySegments = [
  { name: '栈区 (Stack)', height: '20%' },
  { name: '堆区 (Heap)', height: '35%' },
  { name: '数据段 (Data)', height: '15%' },
  { name: '代码段 (Text)', height: '30%' }
]
</script>

<style scoped>
.process-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  padding: 1rem;
  margin: 1rem 0;
}

.demo-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.demo-header .icon { font-size: 1.25rem; }
.demo-header .title { font-weight: bold; font-size: 1rem; }
.demo-header .subtitle { color: var(--vp-c-text-2); font-size: 0.85rem; margin-left: 0.5rem; }

.demo-content {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.process-list {
  flex: 1;
  min-width: 280px;
  font-size: 0.85rem;
}

.process-header {
  display: grid;
  grid-template-columns: 2fr 1fr 1.5fr 1fr;
  gap: 0.5rem;
  padding: 0.5rem;
  background: var(--vp-c-bg-alt);
  border-radius: 4px;
  font-weight: bold;
  margin-bottom: 0.25rem;
}

.process-item {
  display: grid;
  grid-template-columns: 2fr 1fr 1.5fr 1fr;
  gap: 0.5rem;
  padding: 0.5rem;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
}

.process-item:hover {
  background: var(--vp-c-bg);
}

.process-item.selected {
  background: var(--vp-c-brand-soft);
}

.process-icon {
  margin-right: 0.25rem;
}

.state-badge {
  padding: 0.1rem 0.4rem;
  border-radius: 3px;
  font-size: 0.75rem;
}

.state-badge.running {
  background: var(--vp-c-success);
  color: white;
}

.state-badge.waiting {
  background: var(--vp-c-divider);
  color: var(--vp-c-text-2);
}

.process-detail {
  flex: 1;
  min-width: 250px;
}

.detail-title {
  font-weight: bold;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}

.detail-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.detail-item {
  background: var(--vp-c-bg);
  padding: 0.5rem;
  border-radius: 4px;
}

.detail-item .label {
  display: block;
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
}

.detail-item .value {
  font-weight: bold;
  font-size: 0.9rem;
}

.memory-layout {
  background: var(--vp-c-bg-alt);
  padding: 0.5rem;
  border-radius: 4px;
}

.layout-title {
  font-size: 0.8rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.layout-visual {
  display: flex;
  flex-direction: column;
  gap: 2px;
  height: 120px;
}

.segment {
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--vp-c-brand-soft);
  border-radius: 2px;
}

.seg-name {
  font-size: 0.7rem;
  font-weight: bold;
}

.info-box {
  background: var(--vp-c-bg-alt);
  padding: 0.75rem;
  border-radius: 6px;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  margin-top: 0.75rem;
  display: flex;
  gap: 0.25rem;
}

.info-box .icon { flex-shrink: 0; }
</style>
