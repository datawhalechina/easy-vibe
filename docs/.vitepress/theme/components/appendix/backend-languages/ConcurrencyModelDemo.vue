<template>
  <div class="concurrency-model-demo">
    <div class="demo-header">
      <span class="icon">🔄</span>
      <span class="title">并发模型</span>
      <span class="subtitle">不同语言处理多任务的方式</span>
    </div>

    <div class="intro-text">
      想象你在<span class="highlight">餐厅工作</span>：有的餐厅多个服务员同时服务（多线程），有的只有一个服务员但动作极快（事件循环），有的像流水线一样分工协作（协程）。
    </div>

    <div class="models-grid">
      <div
        v-for="model in models"
        :key="model.name"
        class="model-card"
        :class="{ active: selectedModel === model.name }"
        @click="selectedModel = model.name"
      >
        <div class="model-icon">
          {{ model.icon }}
        </div>
        <div class="model-name">
          {{ model.name }}
        </div>
        <div class="model-lang">
          {{ model.language }}
        </div>
        <div class="model-desc">
          {{ model.description }}
        </div>
      </div>
    </div>

    <Transition
      name="fade"
      mode="out-in"
    >
      <div
        v-if="selectedModel"
        :key="selectedModel"
        class="model-detail"
      >
        <div class="detail-header">
          <h6>{{ getModelInfo().title }}</h6>
        </div>

        <div class="stats-grid">
          <div class="stat-item">
            <span class="stat-label">并发能力</span>
            <div class="stat-bar">
              <div
                class="stat-fill"
                :style="{ width: getModelInfo().concurrency + '%' }"
              />
            </div>
          </div>
          <div class="stat-item">
            <span class="stat-label">内存开销</span>
            <div class="stat-bar">
              <div
                class="stat-fill memory"
                :style="{ width: getModelInfo().memory + '%' }"
              />
            </div>
          </div>
        </div>

        <div class="code-example">
          <code>{{ getModelInfo().code }}</code>
        </div>

        <div class="pros-cons">
          <div class="pros">
            <strong>✅ 优势</strong>
            <ul>
              <li
                v-for="pro in getModelInfo().pros"
                :key="pro"
              >
                {{ pro }}
              </li>
            </ul>
          </div>
          <div class="cons">
            <strong>❌ 劣势</strong>
            <ul>
              <li
                v-for="con in getModelInfo().cons"
                :key="con"
              >
                {{ con }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Transition>

    <div class="info-box">
      <span class="icon">💡</span>
      <strong>核心思想：</strong>Go 的协程适合高并发 I/O，Java 的线程池适合稳定的企业级应用，Node.js 的事件循环适合简单的 I/O 密集型任务。根据场景选择，而不是盲目追求"并发数"。
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const selectedModel = ref('Goroutine')

const models = [
  {
    name: 'Goroutine',
    icon: '🐹',
    language: 'Go',
    description: '轻量级协程'
  },
  {
    name: 'Thread Pool',
    icon: '🧵',
    language: 'Java',
    description: '线程池'
  },
  {
    name: 'Event Loop',
    icon: '⚡',
    language: 'Node.js',
    description: '事件循环'
  },
  {
    name: 'Async/Await',
    icon: '🦀',
    language: 'Rust',
    description: '异步运行时'
  }
]

const modelInfo = {
  Goroutine: {
    title: 'Go Goroutine (协程)',
    concurrency: 95,
    memory: 90,
    code: 'go func() { /* 任务 */ }()',
    pros: ['轻量级（2KB 栈内存）', '可创建百万级协程', '语法简洁'],
    cons: ['需要手动管理生命周期', '错误处理繁琐']
  },
  'Thread Pool': {
    title: 'Java Thread Pool (线程池)',
    concurrency: 70,
    memory: 40,
    code: 'executor.submit(() -> { /* 任务 */ });',
    pros: ['成熟稳定', '异常处理完善', '工具丰富'],
    cons: ['线程重（1-2MB 栈）', '上下文切换开销大']
  },
  'Event Loop': {
    title: 'Node.js Event Loop (事件循环)',
    concurrency: 85,
    memory: 75,
    code: 'async function task() { /* 任务 */ }',
    pros: ['适合 I/O 密集型', '单线程无锁竞争', '语法优雅'],
    cons: ['CPU 密集型性能差', '无法利用多核']
  },
  'Async/Await': {
    title: 'Rust Async/Await (零成本抽象)',
    concurrency: 90,
    memory: 95,
    code: 'task::spawn(async move { /* 任务 */ });',
    pros: ['零成本抽象', '内存安全', '性能接近手动管理'],
    cons: ['学习曲线陡峭', '需要运行时']
  }
}

const getModelInfo = () => {
  return modelInfo[selectedModel.value] || modelInfo.Goroutine
}
</script>

<style scoped>
.concurrency-model-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg-soft);
  padding: 0.75rem;
  margin: 0.5rem 0;
  
  
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

.models-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.model-card {
  background: var(--vp-c-bg);
  padding: 0.75rem;
  border: 2px solid transparent;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: center;
}

.model-card:hover {
  border-color: var(--vp-c-brand);
}

.model-card.active {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-brand-soft);
}

.model-icon {
  font-size: 1.5rem;
  margin-bottom: 0.25rem;
}

.model-name {
  font-weight: 600;
  font-size: 0.85rem;
  color: var(--vp-c-text-1);
}

.model-lang {
  font-size: 0.7rem;
  color: var(--vp-c-brand-1);
  margin-bottom: 0.25rem;
}

.model-desc {
  font-size: 0.7rem;
  color: var(--vp-c-text-2);
}

.model-detail {
  background: var(--vp-c-bg);
  padding: 0.75rem;
  border-radius: 6px;
}

.detail-header h6 {
  margin: 0 0 0.75rem 0;
  font-size: 0.9rem;
  color: var(--vp-c-text-1);
}

.stats-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
}

.stat-item {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.stat-label {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.stat-bar {
  height: 6px;
  background: var(--vp-c-bg-soft);
  border-radius: 3px;
  overflow: hidden;
}

.stat-fill {
  height: 100%;
  background: var(--vp-c-brand);
  transition: width 0.5s ease;
}

.stat-fill.memory {
  background: var(--vp-c-green-1);
}

.code-example {
  background: #1e1e1e;
  padding: 0.5rem;
  border-radius: 4px;
  margin-bottom: 0.75rem;
}

.code-example code {
  color: #4ec9b0;
  font-family: 'Monaco', 'Menlo', monospace;
  font-size: 0.75rem;
}

.pros-cons {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
}

.pros strong {
  display: block;
  margin-bottom: 0.25rem;
  font-size: 0.8rem;
  color: var(--vp-c-green-1);
}

.cons strong {
  display: block;
  margin-bottom: 0.25rem;
  font-size: 0.8rem;
  color: var(--vp-c-red-1);
}

.pros ul,
.cons ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.pros li,
.cons li {
  padding: 0.15rem 0;
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  line-height: 1.3;
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
  margin-top: 0.75rem;
}

.info-box .icon {
  margin-right: 0.25rem;
}
</style>
