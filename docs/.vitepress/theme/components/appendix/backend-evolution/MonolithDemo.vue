<template>
  <div class="monolith-demo">
    <div class="demo-header">
      <h4>🏢 单体架构演示</h4>
      <p>观察单体应用如何处理请求，以及模块间的依赖关系</p>
    </div>

    <div class="monolith-diagram">
      <div class="monolith-box" :class="{ crashed: hasCrashed }">
        <div class="monolith-header">单体应用进程</div>
        <div class="modules-container">
          <div
            v-for="module in modules"
            :key="module.name"
            class="module-box"
            :class="{ active: activeModule === module.name, crashed: crashedModule === module.name }"
            @click="triggerModule(module.name)"
          >
            <div class="module-icon">{{ module.icon }}</div>
            <div class="module-name">{{ module.name }}</div>
            <div class="module-status" :class="module.status">{{ module.statusText }}</div>
          </div>
        </div>
        <div class="shared-db">
          <div class="db-icon">🗄️</div>
          <div class="db-label">共享数据库</div>
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
      <button class="control-btn" @click="simulateNormalRequest">正常请求</button>
      <button class="control-btn danger" @click="simulateCrash">模拟模块故障</button>
      <button class="control-btn" @click="reset">重置</button>
    </div>

    <div class="demo-explanation">
      <h5>💡 单体架构的特点</h5>
      <ul>
        <li><strong>共享进程空间</strong>：所有模块在同一个进程中运行，内存共享</li>
        <li><strong>数据库耦合</strong>：所有模块共享同一个数据库，Schema变更影响全局</li>
        <li><strong>级联故障</strong>：一个模块崩溃可能导致整个进程挂掉（雪崩效应）</li>
      </ul>
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
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  padding: 1.5rem;
  margin: 1rem 0;
}

.demo-header {
  margin-bottom: 1.5rem;
}

.demo-header h4 {
  margin: 0 0 0.5rem 0;
  font-size: 1.1rem;
  color: var(--vp-c-text-1);
}

.demo-header p {
  margin: 0;
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
}

.monolith-diagram {
  display: flex;
  gap: 1.5rem;
  align-items: flex-start;
  margin-bottom: 1.5rem;
}

.monolith-box {
  flex: 1;
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-brand);
  border-radius: 8px;
  padding: 1rem;
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
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--vp-c-divider);
}

.modules-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.module-box {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 0.75rem;
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
  font-size: 1.5rem;
  margin-bottom: 0.25rem;
}

.module-name {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 0.25rem;
}

.module-status {
  font-size: 0.7rem;
  padding: 0.1rem 0.4rem;
  border-radius: 10px;
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
  gap: 0.5rem;
  padding: 0.75rem;
  background: var(--vp-c-bg-soft);
  border: 1px dashed var(--vp-c-divider);
  border-radius: 6px;
}

.db-icon {
  font-size: 1.25rem;
}

.db-label {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
}

.request-flow {
  width: 150px;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.flow-request {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  font-size: 0.75rem;
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
  gap: 0.75rem;
  justify-content: center;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
}

.control-btn {
  padding: 0.5rem 1rem;
  border-radius: 6px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font-size: 0.85rem;
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

.demo-explanation {
  padding-top: 1.5rem;
  border-top: 1px solid var(--vp-c-divider);
}

.demo-explanation h5 {
  font-size: 1rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin: 0 0 0.75rem 0;
}

.demo-explanation ul {
  margin: 0 0 1rem 0;
  padding-left: 1.25rem;
}

.demo-explanation li {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  line-height: 1.6;
  margin-bottom: 0.4rem;
}

.demo-explanation li strong {
  color: var(--vp-c-text-1);
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
</style>
