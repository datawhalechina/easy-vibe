<!--
  LocalVsDistributedCacheDemo.vue
  本地缓存 vs 分布式缓存对比演示
-->
<template>
  <div class="cache-comparison-demo">
    <div class="header">
      <div class="title">本地缓存 vs 分布式缓存</div>
      <div class="subtitle">对比两种缓存架构的性能和特点</div>
    </div>

    <div class="comparison-view">
      <!-- Local Cache -->
      <div class="cache-side local">
        <div class="side-header">
          <div class="title">本地缓存 (Local Cache)</div>
          <div class="tag">进程内</div>
        </div>

        <div class="architecture">
          <div class="app-instance">
            <div class="instance-label">应用实例 1</div>
            <div class="cache-box">
              <div class="cache-label">缓存</div>
              <div class="cache-data">
                <div v-for="item in localCache1" :key="item" class="data-item">
                  {{ item }}
                </div>
              </div>
            </div>
          </div>

          <div class="app-instance">
            <div class="instance-label">应用实例 2</div>
            <div class="cache-box">
              <div class="cache-label">缓存</div>
              <div class="cache-data">
                <div v-for="item in localCache2" :key="item" class="data-item">
                  {{ item }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="metrics">
          <div class="metric">
            <div class="metric-label">响应时间</div>
            <div class="metric-value fast">~1 ms</div>
          </div>
          <div class="metric">
            <div class="metric-label">容量</div>
            <div class="metric-value">~1 GB</div>
          </div>
          <div class="metric">
            <div class="metric-label">一致性</div>
            <div class="metric-value warning">低</div>
          </div>
        </div>

        <div class="pros-cons">
          <div class="pros">
            <div class="list-title">✅ 优点</div>
            <div class="list-item">极快（无网络开销）</div>
            <div class="list-item">简单（内存 Map）</div>
          </div>
          <div class="cons">
            <div class="list-title">❌ 缺点</div>
            <div class="list-item">容量受限</div>
            <div class="list-item">实例间不一致</div>
          </div>
        </div>
      </div>

      <!-- Distributed Cache -->
      <div class="cache-side distributed">
        <div class="side-header">
          <div class="title">分布式缓存 (Distributed Cache)</div>
          <div class="tag">独立服务</div>
        </div>

        <div class="architecture">
          <div class="instances-row">
            <div class="app-instance-small">
              <div class="instance-label-small">实例 1</div>
            </div>
            <div class="app-instance-small">
              <div class="instance-label-small">实例 2</div>
            </div>
            <div class="app-instance-small">
              <div class="instance-label-small">实例 3</div>
            </div>
          </div>

          <div class="network-layer">
            <div class="network-label">网络</div>
            <div class="network-arrows">⬇️ ⬇️ ⬇️</div>
          </div>

          <div class="redis-cluster">
            <div class="cluster-label">Redis 集群</div>
            <div class="redis-nodes">
              <div class="redis-node">
                <div class="node-label">Node 1</div>
                <div class="node-data">
                  <div
                    v-for="item in redisData1"
                    :key="item"
                    class="data-item small"
                  >
                    {{ item }}
                  </div>
                </div>
              </div>
              <div class="redis-node">
                <div class="node-label">Node 2</div>
                <div class="node-data">
                  <div
                    v-for="item in redisData2"
                    :key="item"
                    class="data-item small"
                  >
                    {{ item }}
                  </div>
                </div>
              </div>
              <div class="redis-node">
                <div class="node-label">Node 3</div>
                <div class="node-data">
                  <div
                    v-for="item in redisData3"
                    :key="item"
                    class="data-item small"
                  >
                    {{ item }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="metrics">
          <div class="metric">
            <div class="metric-label">响应时间</div>
            <div class="metric-value medium">~5 ms</div>
          </div>
          <div class="metric">
            <div class="metric-label">容量</div>
            <div class="metric-value">~100 GB</div>
          </div>
          <div class="metric">
            <div class="metric-label">一致性</div>
            <div class="metric-value good">高</div>
          </div>
        </div>

        <div class="pros-cons">
          <div class="pros">
            <div class="list-title">✅ 优点</div>
            <div class="list-item">容量可扩展</div>
            <div class="list-item">全局共享</div>
          </div>
          <div class="cons">
            <div class="list-title">❌ 缺点</div>
            <div class="list-item">网络延迟</div>
            <div class="list-item">需要维护</div>
          </div>
        </div>
      </div>
    </div>

    <div class="interactive-demo">
      <div class="demo-title">交互演示：写入和读取数据</div>
      <div class="demo-controls">
        <button class="demo-btn" @click="simulateWrite">写入数据</button>
        <button class="demo-btn secondary" @click="simulateRead">
          读取数据
        </button>
        <button class="demo-btn reset" @click="reset">重置</button>
      </div>

      <div class="demo-result" v-if="lastOperation">
        <div class="result-icon">{{ lastOperation.icon }}</div>
        <div class="result-text">{{ lastOperation.text }}</div>
        <div class="result-detail">{{ lastOperation.detail }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const localCache1 = ref(['user:1', 'user:2', 'config:A'])
const localCache2 = ref(['user:3', 'config:B'])
const redisData1 = ref(['user:1', 'user:2', 'user:3'])
const redisData2 = ref(['product:A', 'product:B', 'product:C'])
const redisData3 = ref(['config:A', 'config:B'])
const lastOperation = ref(null)

let dataCounter = 4

const simulateWrite = () => {
  const key = `user:${dataCounter++}`

  // Local cache: Write to instance 1 only
  localCache1.value.push(key)
  if (localCache1.value.length > 5) localCache1.value.shift()

  // Distributed cache: Hash to a node
  const nodeIndex = dataCounter % 3
  if (nodeIndex === 0) redisData1.value.push(key)
  else if (nodeIndex === 1) redisData2.value.push(key)
  else redisData3.value.push(key)

  lastOperation.value = {
    icon: '✍️',
    text: `写入 ${key}`,
    detail: '本地缓存: 仅实例1有数据 | 分布式缓存: 所有实例共享'
  }
}

const simulateRead = () => {
  const key = 'user:1'

  const inLocal1 = localCache1.value.includes(key)
  const inLocal2 = localCache2.value.includes(key)
  const inRedis =
    redisData1.value.includes(key) ||
    redisData2.value.includes(key) ||
    redisData3.value.includes(key)

  lastOperation.value = {
    icon: '🔍',
    text: `读取 ${key}`,
    detail: `本地缓存: 实例1${inLocal1 ? '✅' : '❌'} 实例2${inLocal2 ? '✅' : '❌'} | 分布式缓存: ${inRedis ? '✅' : '❌'}`
  }
}

const reset = () => {
  localCache1.value = ['user:1', 'user:2', 'config:A']
  localCache2.value = ['user:3', 'config:B']
  redisData1.value = ['user:1', 'user:2', 'user:3']
  redisData2.value = ['product:A', 'product:B', 'product:C']
  redisData3.value = ['config:A', 'config:B']
  dataCounter = 4
  lastOperation.value = null
}
</script>

<style scoped>
.cache-comparison-demo {
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

.comparison-view {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-bottom: 2rem;
}

@media (max-width: 960px) {
  .comparison-view {
    grid-template-columns: 1fr;
  }
}

.cache-side {
  background: var(--vp-c-bg);
  border-radius: 10px;
  padding: 1.25rem;
  border: 2px solid var(--vp-c-divider);
}

.cache-side.local {
  border-color: #3b82f6;
}

.cache-side.distributed {
  border-color: #ef4444;
}

.side-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.side-header .title {
  font-size: 1rem;
  font-weight: 700;
}

.tag {
  padding: 0.25rem 0.75rem;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 600;
  background: var(--vp-c-bg-soft);
}

.architecture {
  margin-bottom: 1rem;
}

.app-instance {
  background: #eff6ff;
  padding: 0.75rem;
  border-radius: 8px;
  margin-bottom: 0.5rem;
  border: 1px solid #bfdbfe;
}

.instance-label {
  font-size: 0.8rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #1e40af;
}

.cache-box {
  background: white;
  padding: 0.5rem;
  border-radius: 6px;
  border: 1px dashed #93c5fd;
}

.cache-label {
  font-size: 0.7rem;
  font-weight: 600;
  margin-bottom: 0.35rem;
  color: var(--vp-c-text-2);
}

.cache-data {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
}

.data-item {
  padding: 0.2rem 0.5rem;
  background: #dbeafe;
  border-radius: 4px;
  font-size: 0.7rem;
  font-weight: 600;
  color: #1e40af;
}

.data-item.small {
  padding: 0.15rem 0.35rem;
  font-size: 0.65rem;
}

.instances-row {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.app-instance-small {
  flex: 1;
  background: #fef2f2;
  padding: 0.5rem;
  border-radius: 6px;
  border: 1px solid #fecaca;
  text-align: center;
}

.instance-label-small {
  font-size: 0.75rem;
  font-weight: 600;
  color: #991b1b;
}

.network-layer {
  text-align: center;
  padding: 0.5rem;
  background: #fef3c7;
  border-radius: 6px;
  margin-bottom: 0.75rem;
}

.network-label {
  font-size: 0.75rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.network-arrows {
  font-size: 1.2rem;
}

.redis-cluster {
  background: #fef2f2;
  padding: 0.75rem;
  border-radius: 8px;
  border: 1px solid #fecaca;
}

.cluster-label {
  font-size: 0.8rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #991b1b;
  text-align: center;
}

.redis-nodes {
  display: flex;
  gap: 0.5rem;
}

.redis-node {
  flex: 1;
  background: white;
  padding: 0.5rem;
  border-radius: 6px;
  border: 1px dashed #fca5a5;
}

.node-label {
  font-size: 0.7rem;
  font-weight: 600;
  margin-bottom: 0.35rem;
  color: var(--vp-c-text-2);
  text-align: center;
}

.node-data {
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem;
}

.metrics {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.75rem;
  margin-bottom: 1rem;
  padding: 0.75rem;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
}

.metric {
  text-align: center;
}

.metric-label {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.25rem;
}

.metric-value {
  font-size: 0.9rem;
  font-weight: 700;
}

.metric-value.fast {
  color: #22c55e;
}

.metric-value.medium {
  color: #f59e0b;
}

.metric-value.good {
  color: #22c55e;
}

.metric-value.warning {
  color: #ef4444;
}

.pros-cons {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.pros,
.cons {
  padding: 0.75rem;
  border-radius: 8px;
}

.pros {
  background: #f0fdf4;
  border: 1px solid #bbf7d0;
}

.cons {
  background: #fef2f2;
  border: 1px solid #fecaca;
}

.list-title {
  font-size: 0.8rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.list-item {
  font-size: 0.75rem;
  margin-bottom: 0.35rem;
  line-height: 1.4;
}

.interactive-demo {
  background: var(--vp-c-bg);
  border-radius: 10px;
  padding: 1.5rem;
  border: 1px solid var(--vp-c-divider);
}

.demo-title {
  font-weight: 600;
  margin-bottom: 1rem;
  font-size: 0.95rem;
}

.demo-controls {
  display: flex;
  gap: 0.75rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

.demo-btn {
  padding: 0.75rem 1.5rem;
  background: var(--vp-c-brand);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.9rem;
  transition: all 0.2s;
}

.demo-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.demo-btn.secondary {
  background: #3b82f6;
}

.demo-btn.reset {
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  border: 1px solid var(--vp-c-divider);
}

.demo-result {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  border-left: 4px solid var(--vp-c-brand);
}

.result-icon {
  font-size: 1.5rem;
}

.result-text {
  font-weight: 600;
  font-size: 0.9rem;
}

.result-detail {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}
</style>
