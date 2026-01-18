<!--
  CachePatternsDemo.vue
  缓存模式演示 - Cache-Aside, Read-Through, Write-Behind
-->
<template>
  <div class="cache-patterns-demo">
    <div class="header">
      <div class="title">缓存模式 (Caching Patterns)</div>
      <div class="subtitle">理解不同缓存读写模式的工作原理</div>
    </div>

    <div class="pattern-selector">
      <button
        v-for="pattern in patterns"
        :key="pattern.id"
        class="pattern-btn"
        :class="{ active: activePattern === pattern.id }"
        @click="activePattern = pattern.id"
      >
        {{ pattern.name }}
      </button>
    </div>

    <div class="pattern-content">
      <!-- Cache-Aside -->
      <div v-if="activePattern === 'cache-aside'" class="pattern-detail">
        <div class="description">
          <div class="pattern-title">Cache-Aside (旁路缓存)</div>
          <div class="pattern-subtitle">最常用的模式，由应用代码控制缓存</div>
          <div class="pattern-points">
            <div class="point">
              <span class="icon">📖</span>
              <div>
                <strong>读取</strong>：先查缓存，没命中再查数据库，然后写入缓存
              </div>
            </div>
            <div class="point">
              <span class="icon">✏️</span>
              <div>
                <strong>更新</strong
                >：先更新数据库，然后<strong>删除</strong>缓存（不是更新！）
              </div>
            </div>
          </div>
        </div>

        <div class="diagram">
          <div class="diagram-title">读取流程</div>
          <div class="flow-chart">
            <div class="flow-step" :class="{ active: flowStep >= 1 }">
              <div class="step-number">1</div>
              <div class="step-text">查询缓存</div>
            </div>
            <div class="flow-arrow">↓</div>
            <div class="flow-decision">
              <div class="decision-label">命中?</div>
              <div class="decision-branches">
                <div
                  class="branch yes"
                  :class="{ active: flowStep >= 2 && cacheHit }"
                >
                  <div class="branch-label">是</div>
                  <div class="branch-result">✅ 返回数据</div>
                </div>
                <div
                  class="branch no"
                  :class="{ active: flowStep >= 2 && !cacheHit }"
                >
                  <div class="branch-label">否</div>
                  <div class="branch-steps">
                    <div class="flow-step" :class="{ active: flowStep >= 3 }">
                      <div class="step-number">2</div>
                      <div class="step-text">查询数据库</div>
                    </div>
                    <div class="flow-arrow">↓</div>
                    <div class="flow-step" :class="{ active: flowStep >= 4 }">
                      <div class="step-number">3</div>
                      <div class="step-text">写入缓存</div>
                    </div>
                    <div class="flow-arrow">↓</div>
                    <div class="flow-step" :class="{ active: flowStep >= 5 }">
                      <div class="step-number">4</div>
                      <div class="step-text">返回数据</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="demo-controls">
            <button
              class="demo-btn"
              @click="simulateCacheAside"
              :disabled="simulating"
            >
              {{ simulating ? '模拟中...' : '模拟读取' }}
            </button>
            <label class="checkbox">
              <input type="checkbox" v-model="cacheHit" />
              缓存命中
            </label>
          </div>
        </div>

        <div class="code-example">
          <div class="code-title">代码示例</div>
          <pre class="code-block"><code>// Cache-Aside 模式
def get_user(user_id):
    # 1. 查缓存
    user = cache.get(f'user:{user_id}')
    if user:
        return user  # 命中，直接返回

    # 2. 查数据库
    user = db.query(f'SELECT * FROM users WHERE id = {user_id}')

    # 3. 写入缓存
    cache.set(f'user:{user_id}', user, ttl=600)

    return user

def update_user(user_id, data):
    # 1. 更新数据库
    db.update('users', data)

    # 2. 删除缓存（不是更新！）
    cache.delete(f'user:{user_id}')</code></pre>
        </div>
      </div>

      <!-- Read-Through -->
      <div v-if="activePattern === 'read-through'" class="pattern-detail">
        <div class="description">
          <div class="pattern-title">Read-Through / Write-Through</div>
          <div class="pattern-subtitle">
            由缓存库负责与数据库交互，应用只和缓存打交道
          </div>
          <div class="pattern-points">
            <div class="point">
              <span class="icon">📖</span>
              <div>
                <strong>Read-Through</strong>：缓存库自动从数据库加载数据
              </div>
            </div>
            <div class="point">
              <span class="icon">✏️</span>
              <div>
                <strong>Write-Through</strong>：写入缓存时同步写入数据库
              </div>
            </div>
          </div>
        </div>

        <div class="diagram">
          <div class="diagram-title">架构对比</div>
          <div class="architecture-comparison">
            <div class="arch-block">
              <div class="arch-title">Cache-Aside</div>
              <div class="arch-flow">
                <div class="flow-box app">应用</div>
                <div class="flow-arrows">
                  <div>↔️ 缓存</div>
                  <div>↔️ 数据库</div>
                </div>
              </div>
            </div>
            <div class="arch-block">
              <div class="arch-title">Read-Through</div>
              <div class="arch-flow">
                <div class="flow-box app">应用</div>
                <div class="flow-arrows">
                  <div>↔️ 缓存库</div>
                </div>
                <div class="flow-box cache">缓存库 ↔️ 数据库</div>
              </div>
            </div>
          </div>
        </div>

        <div class="code-example">
          <div class="code-title">代码示例</div>
          <pre class="code-block"><code>// Read-Through 模式（代码更简洁）
def get_user(user_id):
    # 缓存库自动处理数据库查询
    user = cache.get_or_load(user_id, lambda: db.get_user(user_id))
    return user

// Write-Through 模式
def update_user(user_id, data):
    # 缓存库自动同步到数据库
    cache.set(user_id, data)  # 自动写入数据库</code></pre>
        </div>
      </div>

      <!-- Write-Behind -->
      <div v-if="activePattern === 'write-behind'" class="pattern-detail">
        <div class="description">
          <div class="pattern-title">Write-Behind (异步写回)</div>
          <div class="pattern-subtitle">写入时只写缓存，异步批量写数据库</div>
          <div class="pattern-points">
            <div class="point">
              <span class="icon">⚡</span>
              <div><strong>优点</strong>：写入极快，适合写多的场景</div>
            </div>
            <div class="point">
              <span class="icon">⚠️</span>
              <div>
                <strong>缺点</strong>：数据可能丢失（缓存崩了，数据就没了）
              </div>
            </div>
            <div class="point">
              <span class="icon">🎯</span>
              <div>
                <strong>适用</strong
                >：秒杀系统、点赞数、浏览量（可接受少量丢失）
              </div>
            </div>
          </div>
        </div>

        <div class="diagram">
          <div class="diagram-title">写入流程</div>
          <div class="flow-chart">
            <div class="flow-step">
              <div class="step-number">1</div>
              <div class="step-text">写入缓存</div>
              <div class="step-time">⚡ ~1ms</div>
            </div>
            <div class="flow-arrow">↓</div>
            <div class="flow-step">
              <div class="step-number">2</div>
              <div class="step-text">立即返回</div>
            </div>
            <div class="flow-arrow">↓</div>
            <div class="flow-step pending">
              <div class="step-number">3</div>
              <div class="step-text">异步批量写数据库</div>
              <div class="step-time">🕐 后台执行</div>
            </div>
          </div>

          <div class="demo-controls">
            <button class="demo-btn" @click="simulateWriteBehind">
              模拟批量写入
            </button>
          </div>

          <div class="write-queue" v-if="writeQueue.length > 0">
            <div class="queue-title">待写入队列</div>
            <div class="queue-items">
              <div
                v-for="(item, index) in writeQueue"
                :key="index"
                class="queue-item"
                :class="{ writing: item.writing, written: item.written }"
              >
                <span class="item-key">{{ item.key }}</span>
                <span class="item-status">{{ item.status }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="code-example">
          <div class="code-title">代码示例</div>
          <pre class="code-block"><code>// Write-Behind 模式
def update_counter(post_id):
    # 1. 立即更新缓存（极快）
    cache.incr(f'views:{post_id}')
    # 立即返回，不等待数据库

    # 2. 后台异步批量写入数据库
    async def flush_to_db():
        while True:
            await asyncio.sleep(5)  # 每5秒批量写入
            batch = cache.get_many('views:*')
            db.batch_update(batch)

    asyncio.create_task(flush_to_db())</code></pre>
        </div>
      </div>
    </div>

    <div class="pattern-comparison">
      <div class="comparison-title">模式对比</div>
      <table class="comparison-table">
        <thead>
          <tr>
            <th>模式</th>
            <th>复杂度</th>
            <th>性能</th>
            <th>一致性</th>
            <th>适用场景</th>
          </tr>
        </thead>
        <tbody>
          <tr :class="{ highlight: activePattern === 'cache-aside' }">
            <td>Cache-Aside</td>
            <td>中</td>
            <td>高</td>
            <td>中</td>
            <td>大多数场景</td>
          </tr>
          <tr :class="{ highlight: activePattern === 'read-through' }">
            <td>Read-Through</td>
            <td>低</td>
            <td>中</td>
            <td>高</td>
            <td>简单场景</td>
          </tr>
          <tr :class="{ highlight: activePattern === 'write-behind' }">
            <td>Write-Behind</td>
            <td>高</td>
            <td>极高</td>
            <td>低</td>
            <td>写多、可丢失</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const activePattern = ref('cache-aside')
const flowStep = ref(0)
const cacheHit = ref(false)
const simulating = ref(false)
const writeQueue = ref([])

const patterns = [
  { id: 'cache-aside', name: 'Cache-Aside' },
  { id: 'read-through', name: 'Read-Through' },
  { id: 'write-behind', name: 'Write-Behind' }
]

const simulateCacheAside = async () => {
  simulating.value = true
  flowStep.value = 0

  const steps = cacheHit.value ? [1, 2] : [1, 2, 3, 4, 5]

  for (let i = 0; i < steps.length; i++) {
    await new Promise((resolve) => setTimeout(resolve, 600))
    flowStep.value = steps[i]
  }

  setTimeout(() => {
    flowStep.value = 0
    simulating.value = false
  }, 1000)
}

const simulateWriteBehind = async () => {
  writeQueue.value = [
    {
      key: 'views:post:1',
      value: 100,
      status: '待写入',
      writing: false,
      written: false
    },
    {
      key: 'views:post:2',
      value: 200,
      status: '待写入',
      writing: false,
      written: false
    },
    {
      key: 'views:post:3',
      value: 150,
      status: '待写入',
      writing: false,
      written: false
    }
  ]

  for (let i = 0; i < writeQueue.value.length; i++) {
    await new Promise((resolve) => setTimeout(resolve, 800))
    writeQueue.value[i].writing = true
    writeQueue.value[i].status = '写入中...'

    await new Promise((resolve) => setTimeout(resolve, 700))
    writeQueue.value[i].writing = false
    writeQueue.value[i].written = true
    writeQueue.value[i].status = '✅ 已写入'
  }
}
</script>

<style scoped>
.cache-patterns-demo {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  padding: 1.5rem;
  margin: 1.5rem 0;
  font-family: var(--vp-font-family-base);
}

.header {
  margin-bottom: 1.5rem;
}

.title {
  font-weight: 700;
  font-size: 1.1rem;
}

.subtitle {
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
}

.pattern-selector {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.pattern-btn {
  padding: 0.75rem 1.5rem;
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider);
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s;
}

.pattern-btn.active {
  background: var(--vp-c-brand);
  color: white;
  border-color: var(--vp-c-brand);
}

.pattern-content {
  min-height: 400px;
}

.pattern-detail {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.description {
  background: var(--vp-c-bg);
  padding: 1.5rem;
  border-radius: 10px;
  border: 1px solid var(--vp-c-divider);
}

.pattern-title {
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.pattern-subtitle {
  color: var(--vp-c-text-2);
  margin-bottom: 1rem;
}

.pattern-points {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.point {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
}

.icon {
  font-size: 1.5rem;
  flex-shrink: 0;
}

.diagram {
  background: var(--vp-c-bg);
  padding: 1.5rem;
  border-radius: 10px;
  border: 1px solid var(--vp-c-divider);
}

.diagram-title {
  font-weight: 600;
  margin-bottom: 1rem;
  font-size: 0.95rem;
}

.flow-chart {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.flow-step {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem 1.5rem;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  border: 2px solid var(--vp-c-divider);
  transition: all 0.3s;
}

.flow-step.active {
  border-color: var(--vp-c-brand);
  background: #eff6ff;
}

.flow-step.pending {
  border-color: #f59e0b;
  background: #fef3c7;
}

.step-number {
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--vp-c-brand);
  color: white;
  border-radius: 50%;
  font-weight: 700;
  font-size: 0.85rem;
}

.step-text {
  font-weight: 600;
  font-size: 0.9rem;
}

.step-time {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
}

.flow-arrow {
  font-size: 1.5rem;
  color: var(--vp-c-text-2);
}

.flow-decision {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.decision-label {
  font-weight: 600;
  padding: 0.5rem 1rem;
  background: #fef3c7;
  border-radius: 6px;
  border: 1px solid #f59e0b;
}

.decision-branches {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.branch {
  padding: 1rem;
  border-radius: 8px;
  border: 2px solid var(--vp-c-divider);
  transition: all 0.3s;
}

.branch.active {
  border-color: var(--vp-c-brand);
  background: #eff6ff;
}

.branch-label {
  font-weight: 600;
  margin-bottom: 0.5rem;
  text-align: center;
}

.branch-result {
  text-align: center;
  padding: 0.5rem;
  background: #f0fdf4;
  border-radius: 6px;
  color: #166534;
  font-weight: 600;
}

.branch-steps {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.demo-controls {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.demo-btn {
  padding: 0.75rem 1.5rem;
  background: var(--vp-c-brand);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s;
}

.demo-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.demo-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.checkbox {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  cursor: pointer;
}

.architecture-comparison {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

@media (max-width: 640px) {
  .architecture-comparison {
    grid-template-columns: 1fr;
  }
}

.arch-block {
  padding: 1rem;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
}

.arch-title {
  font-weight: 600;
  margin-bottom: 1rem;
  text-align: center;
}

.arch-flow {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
}

.flow-box {
  padding: 0.75rem 1.5rem;
  background: white;
  border-radius: 8px;
  border: 2px solid var(--vp-c-divider);
  font-weight: 600;
}

.flow-box.cache {
  font-size: 0.85rem;
}

.flow-arrows {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

.write-queue {
  margin-top: 1rem;
}

.queue-title {
  font-weight: 600;
  margin-bottom: 0.75rem;
  font-size: 0.9rem;
}

.queue-items {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.queue-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  border: 1px solid var(--vp-c-divider);
  transition: all 0.3s;
}

.queue-item.writing {
  border-color: #f59e0b;
  background: #fef3c7;
}

.queue-item.written {
  border-color: #22c55e;
  background: #f0fdf4;
}

.item-key {
  font-weight: 600;
  font-size: 0.85rem;
}

.item-status {
  font-size: 0.8rem;
}

.code-example {
  background: var(--vp-c-bg);
  padding: 1.5rem;
  border-radius: 10px;
  border: 1px solid var(--vp-c-divider);
}

.code-title {
  font-weight: 600;
  margin-bottom: 1rem;
  font-size: 0.95rem;
}

.code-block {
  background: #1e293b;
  color: #e2e8f0;
  padding: 1rem;
  border-radius: 8px;
  overflow-x: auto;
  font-size: 0.85rem;
  line-height: 1.6;
}

.pattern-comparison {
  background: var(--vp-c-bg);
  padding: 1.5rem;
  border-radius: 10px;
  border: 1px solid var(--vp-c-divider);
}

.comparison-title {
  font-weight: 600;
  margin-bottom: 1rem;
  font-size: 0.95rem;
}

.comparison-table {
  width: 100%;
  border-collapse: collapse;
}

.comparison-table th,
.comparison-table td {
  padding: 0.75rem;
  text-align: center;
  border: 1px solid var(--vp-c-divider);
}

.comparison-table th {
  background: var(--vp-c-bg-soft);
  font-weight: 600;
  font-size: 0.85rem;
}

.comparison-table td {
  font-size: 0.85rem;
}

.comparison-table tr.highlight {
  background: #eff6ff;
  border-left: 3px solid var(--vp-c-brand);
}
</style>
