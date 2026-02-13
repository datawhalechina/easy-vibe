<template>
  <div class="developer-efficiency-demo">
    <div class="demo-header">
      <span class="icon">⏱️</span>
      <span class="title">开发效率</span>
      <span class="subtitle">不同语言完成相同任务的时间成本</span>
    </div>

    <div class="intro-text">
      想象你在<span class="highlight">装修房子</span>：有的装修队能快速完工但质量一般（Python、Ruby），有的慢工出细活（Rust、C++），有的速度和质量都不错（Go、Node.js）。
    </div>

    <div class="task-selector">
      <label>选择任务：</label>
      <select v-model="selectedTask">
        <option value="rest">REST API</option>
        <option value="web">Web 应用</option>
        <option value="script">数据处理脚本</option>
      </select>
    </div>

    <div class="efficiency-chart">
      <div class="chart-header">
        <span>开发时间（小时）</span>
      </div>
      <div class="bars">
        <div
          v-for="lang in sortedLanguages"
          :key="lang.name"
          class="bar-wrapper"
        >
          <div class="bar-label">{{ lang.name }}</div>
          <div class="bar-track">
            <div
              class="bar-fill"
              :style="{ width: (lang.time / maxTime * 100) + '%' }"
            >
              <span class="bar-value">{{ lang.time }}h</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="info-box">
      <span class="icon">💡</span>
      <strong>核心思想：</strong>初创公司选 Python/Ruby 快速验证想法，大厂选 Java/Go 平衡速度和质量。开发效率不只是写代码的速度，还包括调试、测试、维护的时间成本。
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const selectedTask = ref('rest')

const taskData = {
  rest: [
    { name: 'Python', time: 4 },
    { name: 'Ruby', time: 3.5 },
    { name: 'Go', time: 5 },
    { name: 'Node.js', time: 4.5 },
    { name: 'Java', time: 8 },
    { name: 'Rust', time: 10 }
  ],
  web: [
    { name: 'Ruby', time: 9 },
    { name: 'Python', time: 10 },
    { name: 'Node.js', time: 11 },
    { name: 'Go', time: 12 },
    { name: 'Java', time: 20 },
    { name: 'Rust', time: 25 }
  ],
  script: [
    { name: 'Python', time: 1 },
    { name: 'Ruby', time: 1 },
    { name: 'Node.js', time: 1.5 },
    { name: 'Go', time: 2 },
    { name: 'Java', time: 4 },
    { name: 'Rust', time: 4 }
  ]
}

const sortedLanguages = computed(() => {
  return [...taskData[selectedTask.value]].sort((a, b) => a.time - b.time)
})

const maxTime = computed(() => {
  return Math.max(...taskData[selectedTask.value].map(l => l.time))
})
</script>

<style scoped>
.developer-efficiency-demo {
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

.task-selector {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  background: var(--vp-c-bg);
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
}

.task-selector label {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.task-selector select {
  padding: 0.35rem 0.5rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  background: var(--vp-c-bg-alt);
  color: var(--vp-c-text-1);
  font-size: 0.85rem;
  cursor: pointer;
}

.efficiency-chart {
  background: var(--vp-c-bg);
  padding: 0.75rem;
  border-radius: 6px;
  margin-bottom: 1rem;
}

.chart-header {
  margin-bottom: 0.75rem;
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.bars {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.bar-wrapper {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.bar-label {
  min-width: 70px;
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.bar-track {
  flex: 1;
  height: 24px;
  background: var(--vp-c-bg-soft);
  border-radius: 4px;
  overflow: hidden;
}

.bar-fill {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 0.5rem;
  background: var(--vp-c-green-1);
  transition: width 0.5s ease;
  color: white;
  font-weight: 600;
  font-size: 0.75rem;
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
