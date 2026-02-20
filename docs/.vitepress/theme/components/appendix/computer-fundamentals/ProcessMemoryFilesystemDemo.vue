<template>
  <div class="pmf-collab-demo">
    <div class="demo-header">
      <span class="icon">🤝</span>
      <span class="title">进程、内存、文件系统的协作</span>
      <span class="subtitle">三大管理模块如何协同工作</span>
    </div>

    <div class="demo-content">
      <div class="collab-scene">
        <div class="scene-title">
          场景选择：
        </div>
        <div class="scene-buttons">
          <button
            v-for="scene in scenes"
            :key="scene.id"
            :class="['scene-btn', { active: activeScene === scene.id }]"
            @click="activeScene = scene.id"
          >
            {{ scene.icon }} {{ scene.name }}
          </button>
        </div>
      </div>

      <div class="collab-visualization">
        <div class="vis-container">
          <!-- 进程区域 -->
          <div class="zone process-zone">
            <div class="zone-header">
              <span class="zone-icon">🔄</span>
              <span class="zone-name">进程管理</span>
            </div>
            <div class="zone-content">
              <div class="process-list">
                <div
                  v-for="proc in processes"
                  :key="proc.id"
                  class="process-item"
                  :class="{ active: proc.id === currentProcessId }"
                >
                  <span class="proc-name">{{ proc.name }}</span>
                  <span class="proc-pid">PID: {{ proc.pid }}</span>
                  <span class="proc-state">{{ proc.state }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- 内存区域 -->
          <div class="zone memory-zone">
            <div class="zone-header">
              <span class="zone-icon">🧠</span>
              <span class="zone-name">内存管理</span>
            </div>
            <div class="zone-content">
              <div class="memory-grid">
                <div
                  v-for="(block, index) in memoryBlocks"
                  :key="index"
                  class="memory-block"
                  :class="{
                    allocated: block.allocated,
                    process: block.processId
                  }"
                  :title="`地址: ${block.address}, 大小: ${block.size}KB`"
                >
                  <div v-if="block.allocated" class="block-info">
                    {{ getProcessName(block.processId) }}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 文件系统区域 -->
          <div class="zone filesystem-zone">
            <div class="zone-header">
              <span class="zone-icon">📁</span>
              <span class="zone-name">文件系统</span>
            </div>
            <div class="zone-content">
              <div class="file-tree">
                <div
                  v-for="file in files"
                  :key="file.id"
                  class="file-item"
                  :class="{ active: file.id === currentFileId }"
                >
                  <span class="file-icon">{{ getIcon(file.type) }}</span>
                  <span class="file-name">{{ file.name }}</span>
                  <span v-if="file.size" class="file-size">{{ file.size }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="explanation">
        <div class="exp-title">
          {{ currentSceneData.title }}
        </div>
        <div class="exp-content">
          <div
            v-for="(step, index) in currentSceneData.steps"
            :key="index"
            class="exp-step"
          >
            <span class="step-number">{{ index + 1 }}</span>
            <span class="step-text">{{ step }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const activeScene = ref('launch')
const currentProcessId = ref(null)
const currentFileId = ref(null)

const scenes = [
  {
    id: 'launch',
    name: '启动程序',
    icon: '🚀'
  },
  {
    id: 'memory-access',
    name: '内存访问',
    icon: '💾'
  },
  {
    id: 'file-access',
    name: '文件读写',
    icon: '📄'
  },
  {
    id: 'context-switch',
    name: '进程切换',
    icon: '🔄'
  }
]

const processes = ref([
  { id: 1, name: '浏览器', pid: 1001, state: '运行中' },
  { id: 2, name: '音乐播放器', pid: 1002, state: '等待中' },
  { id: 3, name: '代码编辑器', pid: 1003, state: '运行中' }
])

const memoryBlocks = ref([
  { address: '0x1000', size: 256, allocated: true, processId: 1 },
  { address: '0x2000', size: 128, allocated: true, processId: 2 },
  { address: '0x3000', size: 512, allocated: true, processId: 3 },
  { address: '0x4000', size: 1024, allocated: false, processId: null },
  { address: '0x5000', size: 512, allocated: false, processId: null },
  { address: '0x6000', size: 256, allocated: false, processId: null },
  { address: '0x7000', size: 128, allocated: false, processId: null }
])

const files = ref([
  { id: 1, name: 'config.json', type: 'json', size: '2KB' },
  { id: 2, name: 'user_data.db', type: 'db', size: '50MB' },
  { id: 3, name: 'cache', type: 'folder', size: '' },
  { id: 4, name: 'song.mp3', type: 'audio', size: '5MB' }
])

const sceneData = {
  launch: {
    title: '场景1：启动程序（浏览器）',
    steps: [
      '1. 用户双击浏览器图标',
      '2. 进程管理创建新进程（PID: 1004）',
      '3. 内存管理分配内存空间（代码段、数据段、堆、栈）',
      '4. 文件系统读取配置文件和缓存数据'
    ]
  },
  'memory-access': {
    title: '场景2：程序运行时申请内存',
    steps: [
      '1. 浏览器加载大图片，需要更多内存',
      '2. 进程通过系统调用请求内存（malloc）',
      '3. 内存管理查找可用内存块（如：0x4000）',
      '4. 将内存块标记为"已分配"，返回地址给程序'
    ]
  },
  'file-access': {
    title: '场景3：保存文件',
    steps: [
      '1. 用户在浏览器点击"保存图片"',
      '2. 进程发起文件写入系统调用',
      '3. 文件系统查找空闲磁盘空间',
      '4. 将数据写入磁盘，更新文件分配表'
    ]
  },
  'context-switch': {
    title: '场景4：切换到音乐播放器',
    steps: [
      '1. 用户点击音乐播放器窗口',
      '2. 操作系统暂停浏览器进程',
      '3. 调度器加载音乐播放器进程上下文',
      '4. CPU开始执行音乐播放器代码'
    ]
  }
}

const currentSceneData = computed(() => sceneData[activeScene.value] || sceneData.launch)

const getProcessName = (id) => {
  const proc = processes.value.find(p => p.id === id)
  return proc?.name || '系统'
}

const getIcon = (type) => {
  const icons = {
    'json': '📋',
    'db': '🗄️',
    'folder': '📁',
    'audio': '🎵'
  }
  return icons[type] || '📄'
}
</script>

<style scoped>
.pmf-collab-demo {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  padding: 1.5rem;
  margin: 1.5rem 0;
}

.demo-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.demo-header .icon { font-size: 1.5rem; }
.demo-header .title { font-weight: 700; font-size: 1.1rem; }
.demo-header .subtitle { color: var(--vp-c-text-2); font-size: 0.9rem; }

.scene-buttons {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  margin-bottom: 1.5rem;
}

.scene-btn {
  padding: 0.6rem 1rem;
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider);
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.3s;
}

.scene-btn:hover {
  border-color: var(--vp-c-brand);
}

.scene-btn.active {
  background: var(--vp-c-brand);
  border-color: var(--vp-c-brand);
  color: white;
}

.collab-visualization {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-bottom: 1.5rem;
}

@media (max-width: 768px) {
  .collab-visualization {
    grid-template-columns: 1fr;
  }
}

.zone {
  border: 2px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 1rem;
  background: var(--vp-c-bg);
}

.zone-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
  font-weight: 600;
  font-size: 0.9rem;
}

.zone-icon { font-size: 1.2rem; }
.zone-name { font-size: 0.85rem; }

.process-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.process-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  background: var(--vp-c-bg-soft);
  border-radius: 4px;
  font-size: 0.8rem;
}

.process-item.active {
  border: 2px solid var(--vp-c-brand);
  background: var(--vp-c-brand-soft);
}

.proc-name, .proc-pid, .proc-state {
  flex: 1;
}

.proc-state {
  color: var(--vp-c-text-2);
  font-size: 0.75rem;
}

.memory-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
}

.memory-block {
  aspect-ratio: 2;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  position: relative;
  background: var(--vp-c-bg-soft);
  transition: all 0.3s;
}

.memory-block.allocated {
  background: var(--vp-c-brand-soft);
  border-color: var(--vp-c-brand);
}

.memory-block.process {
  border: 2px solid var(--vp-c-brand);
}

.block-info {
  font-weight: 600;
  color: var(--vp-c-brand);
  font-size: 0.7rem;
  text-align: center;
}

.file-tree {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.file-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  background: var(--vp-c-bg-soft);
  border-radius: 4px;
  font-size: 0.8rem;
}

.file-item.active {
  border: 2px solid var(--vp-c-brand);
  background: var(--vp-c-brand-soft);
}

.file-name { flex: 1; }
.file-size { color: var(--vp-c-text-2); font-size: 0.7rem; }

.explanation {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 1rem;
}

.exp-title {
  font-weight: 600;
  margin-bottom: 0.75rem;
  font-size: 0.95rem;
  color: var(--vp-c-brand);
}

.exp-content {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.exp-step {
  display: flex;
  gap: 0.5rem;
  font-size: 0.85rem;
  line-height: 1.5;
}

.step-number {
  color: var(--vp-c-brand);
  font-weight: 600;
  flex-shrink: 0;
}
</style>
