<template>
  <div class="monolith-demo">
    <div class="demo-header">
      <span class="icon">🏢</span>
      <span class="title">单体架构演示</span>
      <span class="subtitle">观察单体应用如何处理请求</span>
    </div>

    <div class="monolith-diagram">
      <div
        class="monolith-box"
        :class="{ crashed: hasCrashed }"
      >
        <div class="monolith-header">
          单体应用进程
        </div>
        <div class="modules-container">
          <div
            v-for="module in modules"
            :key="module.name"
            class="module-box"
            :class="{ active: activeModule === module.name, crashed: crashedModule === module.name }"
            @click="triggerModule(module.name)"
          >
            <div class="module-icon">
              {{ module.icon }}
            </div>
            <div class="module-name">
              {{ module.name }}
            </div>
            <div
              class="module-status"
              :class="module.status"
            >
              {{ module.statusText }}
            </div>
          </div>
        </div>
        <div class="shared-db">
          <div class="db-icon">
            🗄️
          </div>
          <div class="db-label">
            共享数据库
          </div>
        </div>
      </div>

      <div class="request-flow">
        <div
          v-for="req in requests"
          :key="req.id"
          class="flow-request"
          :class="req.status"
        >
          <span class="req-type">{{ req.type }}</span>
          <span class="req-arrow">→</span>
          <span class="req-target">{{ req.target }}</span>
        </div>
      </div>
    </div>

    <div class="controls">
      <button
        class="control-btn"
        @click="simulateNormalRequest"
      >
        正常请求
      </button>
      <button
        class="control-btn danger"
        @click="simulateCrash"
      >
        模拟模块故障
      </button>
      <button
        class="control-btn"
        @click="reset"
      >
        重置
      </button>
    </div>

    <div class="info-box">
      <span class="icon">💡</span>
      <strong>核心思想：</strong>所有模块在同一个进程中运行，内存共享，但一个模块崩溃可能导致整个进程挂掉（雪崩效应）。
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const modules = ref([
  { name: '用户模块', icon: '👤', status: 'healthy', statusText: '健康' },
  { name: '订单模块', icon: '📦', status: 'healthy', statusText: '健康' },
  { name: '支付模块', icon: '💳', status: 'healthy', statusText: '健康' },
  { name: '库存模块', icon: '🏭', status: 'healthy', statusText: '健康' }
])

const requests = ref([])
const hasCrashed = ref(false)
const crashedModule = ref(null)
const activeModule = ref(null)
const requestId = ref(0)

const simulateNormalRequest = () => {
  const targets = ['用户模块', '订单模块', '支付模块', '库存模块']
  const target = targets[Math.floor(Math.random() * targets.length)]

  activeModule.value = target
  requestId.value++

  requests.value.push({
    id: requestId.value,
    type: 'GET',
    target: target,
    status: 'active'
  })

  setTimeout(() => {
    activeModule.value = null
    if (requests.value.length > 5) {
      requests.value.shift()
    }
  }, 1500)
}

const simulateCrash = () => {
  const targetModule = '订单模块'
  hasCrashed.value = true
  crashedModule.value = targetModule

  const module = modules.value.find(m => m.name === targetModule)
  if (module) {
    module.status = 'crashed'
    module.statusText = '已崩溃'
  }

  // Cascade effect - other modules become unavailable
  setTimeout(() => {
    modules.value.forEach(m => {
      if (m.name !== targetModule) {
        m.status = 'affected'
        m.statusText = '受影响'
      }
    })
  }, 500)
}

const reset = () => {
  hasCrashed.value = false
  crashedModule.value = null
  activeModule.value = null
  requests.value = []

  modules.value.forEach(m => {
    m.status = 'healthy'
    m.statusText = '健康'
  })
}
</script>

<style scoped>
.monolith-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg-soft);
  padding: 0.75rem;
  margin: 0.5rem 0;
}

.demo-header {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  margin-bottom: 0.5rem;
  padding-bottom: 0.4rem;
  border-bottom: 1px solid var(--vp-c-divider);
}

.demo-header .icon {
  font-size: 1rem;
}

.demo-header .title {
  font-weight: bold;
  font-size: 0.9rem;
  color: var(--vp-c-text-1);
}

.demo-header .subtitle {
  color: var(--vp-c-text-2);
  font-size: 0.75rem;
  margin-left: 0.4rem;
}

.monolith-diagram {
  display: flex;
  gap: 0.75rem;
  align-items: flex-start;
  margin-bottom: 0.75rem;
}

.monolith-box {
  flex: 1;
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-brand);
  border-radius: 6px;
  padding: 0.5rem;
  transition: all 0.3s;
}

.monolith-box.crashed {
  border-color: var(--vp-c-danger);
  background: rgba(239, 68, 68, 0.05);
}

.monolith-header {
  text-align: center;
  font-weight: 600;
  color: var(--vp-c-brand);
  margin-bottom: 0.5rem;
  padding-bottom: 0.25rem;
  border-bottom: 1px solid var(--vp-c-divider);
  font-size: 0.75rem;
}

.modules-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.4rem;
  margin-bottom: 0.5rem;
}

.module-box {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  padding: 0.4rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s;
}

.module-box:hover {
  border-color: var(--vp-c-brand);
}

.module-box.active {
  border-color: var(--vp-c-brand);
  background: rgba(102, 126, 234, 0.1);
}

.module-box.crashed {
  border-color: var(--vp-c-danger);
  background: rgba(239, 68, 68, 0.1);
}

.module-icon {
  font-size: 1rem;
  margin-bottom: 0.1rem;
}

.module-name {
  font-size: 0.65rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 0.1rem;
}

.module-status {
  font-size: 0.55rem;
  padding: 0.05rem 0.25rem;
  border-radius: 6px;
  display: inline-block;
}

.module-status.healthy {
  background: rgba(34, 197, 94, 0.2);
  color: #16a34a;
}

.module-status.crashed {
  background: rgba(239, 68, 68, 0.2);
  color: #dc2626;
}

.module-status.affected {
  background: rgba(245, 158, 11, 0.2);
  color: #d97706;
}

.shared-db {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.3rem;
  padding: 0.4rem;
  background: var(--vp-c-bg-soft);
  border: 1px dashed var(--vp-c-divider);
  border-radius: 4px;
}

.db-icon {
  font-size: 1rem;
}

.db-label {
  font-size: 0.65rem;
  color: var(--vp-c-text-2);
}

.request-flow {
  width: 100px;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.flow-request {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.3rem;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  font-size: 0.6rem;
}

.flow-request.active {
  border-color: var(--vp-c-brand);
  background: rgba(102, 126, 234, 0.1);
}

.req-type {
  font-weight: 600;
  color: var(--vp-c-brand);
}

.req-arrow {
  color: var(--vp-c-text-3);
}

.req-target {
  color: var(--vp-c-text-2);
}

.controls {
  display: flex;
  gap: 0.4rem;
  justify-content: center;
  margin-bottom: 0.75rem;
  flex-wrap: wrap;
}

.control-btn {
  padding: 0.3rem 0.6rem;
  border-radius: 4px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font-size: 0.75rem;
  cursor: pointer;
  transition: all 0.2s;
}

.control-btn:hover {
  border-color: var(--vp-c-brand);
}

.control-btn.danger {
  border-color: var(--vp-c-danger);
  color: var(--vp-c-danger);
}

.control-btn.danger:hover {
  background: rgba(239, 68, 68, 0.1);
}

@media (max-width: 768px) {
  .monolith-diagram {
    flex-direction: column;
  }

  .request-flow {
    width: 100%;
    flex-direction: row;
    flex-wrap: wrap;
  }
}

.info-box {
  background: var(--vp-c-bg-alt);
  padding: 0.5rem;
  border-radius: 4px;
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  margin-top: 0.5rem;
  display: flex;
  gap: 0.2rem;
}

.info-box .icon {
  flex-shrink: 0;
}

.info-box strong {
  color: var(--vp-c-text-1);
}
</style>
