<template>
  <div class="os-overview-demo">
    <div class="demo-header">
      <span class="icon">🎛️</span>
      <span class="title">操作系统：计算机的"大管家"</span>
      <span class="subtitle">让多个程序和谐共处的艺术</span>
    </div>

    <div class="demo-content">
      <div class="os-layers">
        <div class="layer user-apps">
          <div class="layer-title">
            应用程序层
          </div>
          <div class="layer-content">
            <div
              v-for="app in applications"
              :key="app.id"
              class="app-icon"
              :class="{ active: activeApp === app.id }"
              @click="activeApp = app.id"
              :title="app.name"
            >
              {{ app.icon }}
            </div>
          </div>
          <div class="layer-desc">
            用户直接使用的程序（浏览器、IDE、游戏等）
          </div>
        </div>

        <div class="layer kernel">
          <div class="layer-title">
            操作系统内核
          </div>
          <div class="layer-content">
            <div class="kernel-components">
              <div
                v-for="component in kernelComponents"
                :key="component.id"
                class="kernel-component"
                :class="{ active: activeComponent === component.id }"
                @click="activeComponent = component.id"
              >
                {{ component.icon }} {{ component.name }}
              </div>
            </div>
          </div>
          <div class="layer-desc">
            进程管理、内存管理、文件系统、设备管理
          </div>
        </div>

        <div class="layer hardware">
          <div class="layer-title">
            硬件层
          </div>
          <div class="layer-content">
            <div class="hardware-icons">
              <span>💻 CPU</span>
              <span>🧠 RAM</span>
              <span>💾 硬盘</span>
              <span>🖥️ GPU</span>
            </div>
          </div>
        </div>
      </div>

      <div class="resource-flow">
        <div class="flow-title">资源流向</div>
        <div class="flow-content">
          <div class="flow-item" :class="{ active: showFlow }">
            <div class="flow-arrow">↓</div>
            <div class="flow-desc">
              应用程序请求资源（内存、CPU、文件）
            </div>
          </div>
          <div class="flow-item" :class="{ active: showFlow }">
            <div class="flow-arrow">↓</div>
            <div class="flow-desc">
              操作系统内核统一分配和调度
            </div>
          </div>
          <div class="flow-item" :class="{ active: showFlow }">
            <div class="flow-arrow">↓</div>
            <div class="flow-desc">
              硬件执行实际操作
            </div>
          </div>
        </div>
        <button
          class="flow-btn"
          @click="showFlow = !showFlow"
        >
          {{ showFlow ? '隐藏' : '显示' }}资源流
        </button>
      </div>

      <div class="demo-details">
        <div class="detail-item">
          <div class="detail-title">
            当前选中：{{ activeAppName || '请选择应用程序' }}
          </div>
          <div class="detail-desc">
            {{ getActiveAppDesc() }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const activeApp = ref('browser')
const activeComponent = ref('process')
const showFlow = ref(false)

const applications = [
  { id: 'browser', name: '浏览器', icon: '🌐' },
  { id: 'ide', name: '代码编辑器', icon: '💻' },
  { id: 'music', name: '音乐播放器', icon: '🎵' },
  { id: 'video', name: '视频播放器', icon: '🎬' },
  { id: 'game', name: '游戏', icon: '🎮' }
]

const kernelComponents = [
  { id: 'process', name: '进程管理', icon: '🔄' },
  { id: 'memory', name: '内存管理', icon: '🧠' },
  { id: 'filesystem', name: '文件系统', icon: '📁' },
  { id: 'device', name: '设备管理', icon: '🔧' }
]

const activeAppName = computed(() => {
  const app = applications.find(a => a.id === activeApp.value)
  return app?.name || ''
})

const getActiveAppDesc = () => {
  const component = kernelComponents.find(c => c.id === activeComponent.value)
  const app = applications.find(a => a.id === activeApp.value)

  if (!app || !component) return '请选择应用程序和内核组件'
  return `${app.name} 需要使用 ${component.name} 的功能`
}
</script>

<style scoped>
.os-overview-demo {
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

.os-layers {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.layer {
  padding: 1rem;
  border-radius: 8px;
  border: 2px solid var(--vp-c-divider);
  transition: all 0.3s;
}

.layer.user-apps {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.layer.kernel {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  color: white;
}

.layer.hardware {
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  color: white;
}

.layer-title {
  font-weight: 600;
  margin-bottom: 0.75rem;
  font-size: 1rem;
}

.layer-content {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.app-icon {
  font-size: 1.8rem;
  padding: 0.5rem;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s;
}

.app-icon:hover, .app-icon.active {
  transform: scale(1.1);
  background: rgba(255, 255, 255, 0.2);
}

.kernel-component {
  padding: 0.4rem 0.6rem;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.15);
  cursor: pointer;
  font-size: 0.85rem;
  transition: all 0.3s;
}

.kernel-component:hover, .kernel-component.active {
  background: rgba(255, 255, 255, 0.3);
  font-weight: 600;
}

.hardware-icons {
  display: flex;
  gap: 1rem;
  font-size: 1.2rem;
  flex-wrap: wrap;
}

.layer-desc {
  font-size: 0.85rem;
  margin-top: 0.5rem;
  opacity: 0.9;
}

.resource-flow {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1.5rem;
}

.flow-title {
  font-weight: 600;
  margin-bottom: 0.75rem;
  font-size: 0.9rem;
}

.flow-content {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.flow-item {
  text-align: center;
  font-size: 0.85rem;
  padding: 0.5rem;
  opacity: 0.6;
  transition: all 0.3s;
}

.flow-item.active {
  opacity: 1;
  color: var(--vp-c-brand);
}

.flow-arrow {
  font-size: 1.2rem;
}

.flow-btn {
  width: 100%;
  padding: 0.5rem;
  margin-top: 0.75rem;
  background: var(--vp-c-brand);
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.85rem;
  transition: all 0.3s;
}

.flow-btn:hover {
  background: var(--vp-c-brand-dark);
}

.demo-details {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 1rem;
}

.detail-title {
  font-weight: 600;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  color: var(--vp-c-brand);
}

.detail-desc {
  font-size: 0.85rem;
  color: var(--vP-c-text-2);
  line-height: 1.5;
}
</style>
