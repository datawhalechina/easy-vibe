<template>
  <div class="concurrency-model-demo">
    <div class="demo-header">
      <h4>并发模型对比</h4>
      <p class="subtitle">不同语言处理并发请求的方式</p>
    </div>

    <div class="model-grid">
      <div
        v-for="model in models"
        :key="model.name"
        class="model-card"
        :class="{ active: selectedModel === model.name }"
        @click="selectedModel = model.name"
      >
        <div class="model-icon">{{ model.icon }}</div>
        <h5>{{ model.name }}</h5>
        <div class="model-tag">{{ model.tag }}</div>
        <div class="model-desc">{{ model.description }}</div>
      </div>
    </div>

    <transition name="fade" mode="out-in">
      <div :key="selectedModel" class="model-detail">
        <div class="detail-header">
          <h5>{{ getModelDetail(selectedModel).title }}</h5>
          <div class="model-stats">
            <div class="stat">
              <span class="stat-label">并发能力</span>
              <div class="stat-bar">
                <div
                  class="stat-fill"
                  :style="{
                    width: getModelDetail(selectedModel).concurrency + '%'
                  }"
                ></div>
              </div>
            </div>
            <div class="stat">
              <span class="stat-label">内存开销</span>
              <div class="stat-bar">
                <div
                  class="stat-fill memory"
                  :style="{ width: getModelDetail(selectedModel).memory + '%' }"
                ></div>
              </div>
            </div>
            <div class="stat">
              <span class="stat-label">CPU 利用率</span>
              <div class="stat-bar">
                <div
                  class="stat-fill cpu"
                  :style="{ width: getModelDetail(selectedModel).cpu + '%' }"
                ></div>
              </div>
            </div>
          </div>
        </div>

        <div class="code-example">
          <h6>代码示例</h6>
          <pre><code>{{ getModelDetail(selectedModel).code }}</code></pre>
        </div>

        <div class="visualization">
          <h6>并发可视化</h6>
          <ConcurrencyVisualization :model="selectedModel" />
        </div>

        <div class="pros-cons">
          <div class="pros">
            <h6>优势</h6>
            <ul>
              <li v-for="pro in getModelDetail(selectedModel).pros" :key="pro">
                {{ pro }}
              </li>
            </ul>
          </div>
          <div class="cons">
            <h6>劣势</h6>
            <ul>
              <li v-for="con in getModelDetail(selectedModel).cons" :key="con">
                {{ con }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, defineComponent } from 'vue'

const selectedModel = ref('Goroutine')

const models = [
  {
    name: 'Goroutine',
    icon: '🐹',
    tag: 'Go',
    description: '轻量级协程，百万级并发'
  },
  {
    name: 'Thread',
    icon: '🧵',
    tag: 'Java',
    description: '传统线程池，成熟稳定'
  },
  {
    name: 'Async/Await',
    icon: '⚡',
    tag: 'Node.js',
    description: '事件循环，非阻塞 I/O'
  },
  {
    name: 'Async/Await',
    icon: '🦀',
    tag: 'Rust',
    description: '零成本抽象，高性能'
  }
]

const modelDetails = {
  Goroutine: {
    title: 'Go Goroutine (协程)',
    concurrency: 95,
    memory: 90,
    cpu: 85,
    code: `// Go: 启动 10 万个协程
package main

import (
    "fmt"
    "time"
)

func task(id int) {
    fmt.Printf("Task %d\\n", id)
}

func main() {
    for i := 0; i < 100000; i++ {
        go task(i) // 启动协程
    }
    time.Sleep(time.Second)
}`,
    pros: [
      '✅ 轻量级：每个协程仅 2KB 栈内存',
      '✅ 可创建百万级协程',
      '✅ 语法简洁（go 关键字）',
      '✅ 通信顺序进程（CSP）模型'
    ],
    cons: [
      '❌ 需要手动管理协程生命周期',
      '❌ 错误处理繁琐（if err != nil）',
      '❌ 不如线程模型成熟'
    ]
  },
  Thread: {
    title: 'Java Thread (线程池)',
    concurrency: 70,
    memory: 40,
    cpu: 80,
    code: `// Java: 线程池处理并发
import java.util.concurrent.*;

ExecutorService executor =
    Executors.newFixedThreadPool(10);

for (int i = 0; i < 1000; i++) {
    final int taskId = i;
    executor.submit(() -> {
        System.out.println("Task " + taskId);
    });
}

executor.shutdown();`,
    pros: [
      '✅ 成熟稳定，企业级应用首选',
      '✅ 异常处理机制完善',
      '✅ 调试工具丰富（JConsole、VisualVM）',
      '✅ 线程池优化（ExecutorService）'
    ],
    cons: [
      '❌ 线程重（1-2MB 栈内存）',
      '❌ 上下文切换开销大',
      '❌ 并发数受限（通常 < 10000）',
      '❌ 锁竞争复杂'
    ]
  },
  'Async/Await': {
    title: 'Node.js Async/Await (事件循环)',
    concurrency: 85,
    memory: 75,
    cpu: 60,
    code: `// Node.js: 异步处理
const axios = require('axios');

async function fetch(id) {
    const response = await axios.get(url);
    console.log(\`Task \${id}\`);
}

async function main() {
    const tasks = [];
    for (let i = 0; i < 10000; i++) {
        tasks.push(fetch(i));
    }
    await Promise.all(tasks);
}

main();`,
    pros: [
      '✅ 适合 I/O 密集型应用',
      '✅ 单线程，无锁竞争',
      '✅ 事件驱动，非阻塞',
      '✅ 语法优雅（async/await）'
    ],
    cons: [
      '❌ 单线程，CPU 密集型性能差',
      '❌ 回调地狱（虽然 async/await 有改善）',
      '❌ 无法利用多核 CPU（需要 Worker Threads）',
      '❌ 错误堆栈复杂'
    ]
  },
  RustAsync: {
    title: 'Rust Async/Await (零成本抽象)',
    concurrency: 90,
    memory: 95,
    cpu: 90,
    code: `// Rust: 异步运行时（tokio）
use tokio::task;

async fn task(id: u32) {
    println!("Task {}", id);
}

#[tokio::main]
async fn main() {
    let mut handles = vec![];

    for i in 0..100_000 {
        let handle = task::spawn(async move {
            task(i).await;
        });
        handles.push(handle);
    }

    for handle in handles {
        handle.await.unwrap();
    }
}`,
    pros: [
      '✅ 零成本抽象（编译成状态机）',
      '✅ 内存安全（编译时保证）',
      '✅ 性能接近手动管理',
      '✅ 无 GC，无运行时开销'
    ],
    cons: [
      '❌ 学习曲线极其陡峭',
      '❌ 需要运行时（tokio、async-std）',
      '❌ 编译时间长',
      '❌ 生态不如 Go/Node.js 成熟'
    ]
  }
}

const getModelDetail = (model) => {
  if (model === 'Async/Await') {
    return selectedModel.value === 'Node.js'
      ? modelDetails['Async/Await']
      : modelDetails.RustAsync
  }
  return modelDetails[model] || modelDetails.Goroutine
}

// ConcurrencyVisualization component
const ConcurrencyVisualization = defineComponent({
  name: 'ConcurrencyVisualization',
  props: {
    model: String
  },
  template: `
    <div class="concurrency-viz">
      <div class="viz-container">
        <div class="task-queue">
          <div class="queue-label">任务队列</div>
          <div class="queue-items">
            <div
              v-for="i in 20"
              :key="i"
              class="queue-item"
              :class="{ processing: i <= activeWorkers }"
            >
              Task {{ i }}
            </div>
          </div>
        </div>
        <div class="workers">
          <div class="workers-label">{{ workersLabel }}</div>
          <div class="worker-pool">
            <div
              v-for="i in maxWorkers"
              :key="i"
              class="worker"
              :class="{ active: i <= activeWorkers }"
            >
              {{ i <= activeWorkers ? '⚡' : '💤' }}
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  setup(props) {
    const workersLabel = computed(() => {
      const labels = {
        Goroutine: 'Goroutines (可无限创建)',
        Thread: 'Thread Pool (固定数量)',
        'Async/Await': 'Event Loop (单线程)',
        RustAsync: 'Async Tasks (可无限创建)'
      }
      return labels[props.model] || 'Workers'
    })

    const maxWorkers = computed(() => {
      const counts = {
        Goroutine: 100,
        Thread: 10,
        'Async/Await': 1,
        RustAsync: 100
      }
      return counts[props.model] || 10
    })

    const activeWorkers = computed(() => {
      const actives = {
        Goroutine: 100,
        Thread: 10,
        'Async/Await': 1,
        RustAsync: 100
      }
      return actives[props.model] || 10
    })

    return {
      workersLabel,
      maxWorkers,
      activeWorkers
    }
  }
})
</script>

<script>
import { computed, defineComponent } from 'vue'

export default {
  components: {
    ConcurrencyVisualization: defineComponent({
      name: 'ConcurrencyVisualization',
      props: {
        model: String
      },
      template: `
        <div class="concurrency-viz">
          <div class="viz-container">
            <div class="task-queue">
              <div class="queue-label">任务队列</div>
              <div class="queue-items">
                <div
                  v-for="i in 20"
                  :key="i"
                  class="queue-item"
                  :class="{ processing: i <= activeWorkers }"
                >
                  Task {{ i }}
                </div>
              </div>
            </div>
            <div class="workers">
              <div class="workers-label">{{ workersLabel }}</div>
              <div class="worker-pool">
                <div
                  v-for="i in displayWorkers"
                  :key="i"
                  class="worker"
                  :class="{ active: i <= activeWorkers }"
                >
                  {{ i <= activeWorkers ? '⚡' : '💤' }}
                </div>
              </div>
            </div>
          </div>
        </div>
      `,
      setup(props) {
        const workersLabel = computed(() => {
          const labels = {
            Goroutine: 'Goroutines (可无限创建)',
            Thread: 'Thread Pool (固定数量)',
            'Async/Await': 'Event Loop (单线程)',
            RustAsync: 'Async Tasks (可无限创建)'
          }
          return labels[props.model] || 'Workers'
        })

        const maxWorkers = computed(() => {
          const counts = {
            Goroutine: 20,
            Thread: 10,
            'Async/Await': 1,
            RustAsync: 20
          }
          return counts[props.model] || 10
        })

        const activeWorkers = computed(() => {
          const actives = {
            Goroutine: 20,
            Thread: 10,
            'Async/Await': 1,
            RustAsync: 20
          }
          return actives[props.model] || 10
        })

        const displayWorkers = computed(() => {
          // 限制显示数量，避免 DOM 过多
          return Math.min(maxWorkers.value, 20)
        })

        return {
          workersLabel,
          maxWorkers,
          activeWorkers,
          displayWorkers
        }
      }
    })
  }
}
</script>

<style scoped>
.concurrency-model-demo {
  background: var(--vp-c-bg);
  border-radius: 12px;
  padding: 2rem;
  margin: 2rem 0;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  border: 1px solid var(--vp-c-divider);
}

.demo-header {
  text-align: center;
  margin-bottom: 2rem;
}

.demo-header h4 {
  margin: 0 0 0.5rem 0;
  color: var(--vp-c-brand);
  font-size: 1.5rem;
}

.subtitle {
  margin: 0;
  color: var(--vp-c-text-2);
  font-size: 0.95rem;
}

.model-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
}

.model-card {
  background: var(--vp-c-bg-soft);
  border: 2px solid transparent;
  border-radius: 8px;
  padding: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;
}

.model-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
}

.model-card.active {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-bg);
}

.model-icon {
  font-size: 3rem;
  margin-bottom: 0.5rem;
}

.model-card h5 {
  margin: 0.5rem 0;
  color: var(--vp-c-text-1);
  font-size: 1.1rem;
}

.model-tag {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  background: var(--vp-c-brand);
  color: white;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.model-desc {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  line-height: 1.4;
}

.model-detail {
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  padding: 2rem;
  animation: fade-in 0.3s ease;
}

.detail-header {
  margin-bottom: 2rem;
}

.detail-header h5 {
  margin: 0 0 1.5rem 0;
  color: var(--vp-c-brand);
  font-size: 1.3rem;
}

.model-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.stat {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.stat-label {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.stat-bar {
  height: 8px;
  background: var(--vp-c-bg);
  border-radius: 4px;
  overflow: hidden;
}

.stat-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--vp-c-brand), #8b5cf6);
  transition: width 0.5s ease;
}

.stat-fill.memory {
  background: linear-gradient(90deg, #f59e0b, #d97706);
}

.stat-fill.cpu {
  background: linear-gradient(90deg, #10b981, #059669);
}

.code-example {
  background: #1e1e1e;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  overflow-x: auto;
}

.code-example h6 {
  margin: 0 0 1rem 0;
  color: #4ec9b0;
  font-size: 1rem;
}

.code-example pre {
  margin: 0;
}

.code-example code {
  font-family: 'Monaco', 'Menlo', monospace;
  font-size: 0.85rem;
  line-height: 1.6;
  color: #d4d4d4;
}

.visualization {
  margin-bottom: 2rem;
}

.visualization h6 {
  margin: 0 0 1rem 0;
  color: var(--vp-c-text-1);
  font-size: 1rem;
}

.concurrency-viz {
  background: var(--vp-c-bg);
  border-radius: 8px;
  padding: 1.5rem;
  border: 1px solid var(--vp-c-divider);
}

.viz-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

.task-queue,
.workers {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.queue-label,
.workers-label {
  font-weight: 600;
  color: var(--vp-c-text-1);
  font-size: 0.9rem;
}

.queue-items {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.queue-item {
  padding: 0.5rem;
  background: var(--vp-c-bg-soft);
  border-radius: 4px;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  transition: all 0.3s ease;
}

.queue-item.processing {
  background: #dcfce7;
  color: #15803d;
  font-weight: 600;
}

.worker-pool {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.worker {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  font-size: 1.2rem;
  transition: all 0.3s ease;
}

.worker.active {
  background: #dcfce7;
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

.pros-cons {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

.pros h6,
.cons h6 {
  margin: 0 0 1rem 0;
  font-size: 1rem;
}

.pros h6 {
  color: #10b981;
}

.cons h6 {
  color: #ef4444;
}

.pros ul,
.cons ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.pros li,
.cons li {
  padding: 0.5rem 0;
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  line-height: 1.5;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .model-stats {
    grid-template-columns: 1fr;
  }

  .viz-container {
    grid-template-columns: 1fr;
  }

  .pros-cons {
    grid-template-columns: 1fr;
  }
}
</style>
