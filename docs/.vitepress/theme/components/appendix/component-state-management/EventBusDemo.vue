<template>
  <div class="event-bus-demo">
    <div class="demo-header">
      <span class="icon">📡</span>
      <span class="title">Event Bus 事件总线</span>
      <span class="subtitle">像广播站一样的消息传递</span>
    </div>

    <div class="intro-text">
      想象你在<span class="highlight">广播电台</span>工作：任何部门（组件）都可以通过广播站（Event Bus）发布消息，所有收音机（监听器）都能收到广播。不需要知道对方是谁！
    </div>

    <div class="demo-content">
      <div class="bus-center">
        <div class="bus-icon">📻</div>
        <div class="bus-label">广播站 (Event Bus)</div>
      </div>

      <div class="components-grid">
        <div
          v-for="comp in components"
          :key="comp.id"
          class="component-node"
          :class="{ active: comp.isActive }"
          @click="sendEvent(comp)"
        >
          <div class="comp-icon">{{ comp.icon }}</div>
          <div class="comp-name">{{ comp.name }}</div>
          <div class="comp-status" :class="{ listening: comp.isListening }">
            {{ comp.isListening ? '📻 收音中' : '🔇 未开机' }}
          </div>
        </div>
      </div>

      <Transition name="fade">
        <div v-if="logs.length > 0" class="event-log">
          <div class="log-title">📨 消息记录</div>
          <div class="log-list">
            <div v-for="(log, index) in logs.slice(0, 5)" :key="index" class="log-item" :class="log.type">
              <span class="log-type">{{ log.type === 'emit' ? '🎤 广播' : '📻 收听' }}</span>
              <span class="log-text">{{ log.text }}</span>
            </div>
          </div>
        </div>
      </Transition>
    </div>

    <div class="hint-text">
      👆 点击上方任意部门，模拟发送广播消息，其他开机的部门会收到
    </div>

    <div class="info-box">
      <span class="icon">💡</span>
      <strong>核心思想：</strong>Event Bus 像广播站，任何组件都可以发送和接收消息，不需要知道对方存在。适合简单的跨组件通信，但要记得组件销毁时关闭收音机（取消监听）。
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'

const components = reactive([
  { id: 1, name: 'Header', icon: '📌', isActive: false, isListening: true },
  { id: 2, name: 'Sidebar', icon: '📑', isActive: false, isListening: true },
  { id: 3, name: 'ProductList', icon: '🛍️', isActive: false, isListening: true },
  { id: 4, name: 'Cart', icon: '🛒', isActive: false, isListening: true }
])

const logs = ref([])

const sendEvent = (comp) => {
  // 发送动画
  comp.isActive = true
  logs.value.unshift({
    type: 'emit',
    text: `${comp.name} 发布广播: 有新消息！`
  })

  // 其他组件接收
  components.forEach(target => {
    if (target.id !== comp.id && target.isListening) {
      setTimeout(() => {
        target.isActive = true
        logs.value.unshift({
          type: 'receive',
          text: `${target.name} 收到广播`
        })
        setTimeout(() => {
          target.isActive = false
        }, 500)
      }, 100)
    }
  })

  setTimeout(() => {
    comp.isActive = false
  }, 500)
}
</script>

<style scoped>
.event-bus-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  padding: 1rem;
  margin: 1rem 0;
  max-height: 600px;
  overflow-y: auto;
}

.demo-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.demo-header .icon {
  font-size: 1.25rem;
}

.demo-header .title {
  font-weight: bold;
  font-size: 1rem;
}

.demo-header .subtitle {
  color: var(--vp-c-text-2);
  font-size: 0.85rem;
  margin-left: 0.5rem;
}

.intro-text {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  line-height: 1.6;
  margin-bottom: 1rem;
  padding: 0.75rem;
  background: var(--vp-c-bg);
  border-radius: 6px;
}

.intro-text .highlight {
  color: var(--vp-c-brand-1);
  font-weight: 500;
}

.demo-content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1rem;
}

.bus-center {
  align-self: center;
  text-align: center;
  padding: 1rem 2rem;
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-brand);
  border-radius: 50%;
}

.bus-icon {
  font-size: 2rem;
}

.bus-label {
  font-weight: 600;
  color: var(--vp-c-brand);
  font-size: 0.9rem;
}

.components-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 1rem;
}

.component-node {
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 1rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.component-node:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.component-node.active {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-brand-soft);
  box-shadow: 0 0 0 3px var(--vp-c-brand-delta);
}

.comp-icon {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}

.comp-name {
  font-weight: 600;
  font-size: 0.9rem;
  margin-bottom: 0.25rem;
}

.comp-status {
  font-size: 0.75rem;
  color: var(--vp-c-text-3);
}

.comp-status.listening {
  color: var(--vp-c-brand);
  font-weight: 500;
}

.event-log {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 1rem;
}

.log-title {
  font-weight: 600;
  font-size: 0.9rem;
  margin-bottom: 0.75rem;
}

.log-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.log-item {
  display: flex;
  gap: 0.5rem;
  padding: 0.5rem;
  border-radius: 4px;
  font-size: 0.85rem;
  font-family: monospace;
}

.log-item.emit {
  background: var(--vp-c-brand-soft);
  border-left: 3px solid var(--vp-c-brand);
}

.log-item.receive {
  background: var(--vp-c-bg-soft);
  border-left: 3px solid var(--vp-c-text-2);
}

.log-type {
  font-weight: 600;
  flex-shrink: 0;
}

.hint-text {
  text-align: center;
  font-size: 0.85rem;
  color: var(--vp-c-text-3);
  margin-bottom: 0.75rem;
  background: var(--vp-c-bg);
  padding: 0.75rem;
  border-radius: 6px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.info-box {
  background: var(--vp-c-bg-alt);
  padding: 0.75rem;
  border-radius: 6px;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

.info-box .icon {
  margin-right: 0.25rem;
}
</style>
