<template>
  <div class="compile-vs-interpret-demo">
    <h4>🔄 编译型 vs 解释型 vs JIT</h4>
    <p class="desc">点击不同执行模式，观察代码从源码到运行的过程</p>

    <div class="mode-selector">
      <button
        v-for="(m, i) in modes"
        :key="i"
        :class="['mode-btn', { active: selected === i }]"
        @click="selectMode(i)"
      >
        {{ m.name }}
      </button>
    </div>

    <div class="pipeline">
      <div
        v-for="(step, j) in modes[selected].steps"
        :key="j"
        :class="['pipe-step', { visible: visibleSteps > j }]"
      >
        <div class="step-icon">{{ step.icon }}</div>
        <div class="step-content">
          <div class="step-name">{{ step.name }}</div>
          <div class="step-desc">{{ step.desc }}</div>
        </div>
        <div v-if="j < modes[selected].steps.length - 1" class="arrow">→</div>
      </div>
    </div>

    <div class="metrics">
      <div class="metric" v-for="m in modes[selected].metrics" :key="m.label">
        <span class="metric-label">{{ m.label }}</span>
        <div class="metric-bar-bg">
          <div class="metric-bar" :style="{ width: m.value + '%', background: m.color }"></div>
        </div>
        <span class="metric-val">{{ m.text }}</span>
      </div>
    </div>

    <div class="examples">
      <span class="ex-label">代表语言：</span>
      <span class="ex-lang" v-for="l in modes[selected].langs" :key="l">{{ l }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const selected = ref(0)
const visibleSteps = ref(0)
let timer = null

onMounted(() => {
  // 组件挂载后开始动画，避免模块加载时启动定时器导致 build 卡住
  selectMode(0)
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})

function selectMode(i) {
  selected.value = i
  visibleSteps.value = 0
  clearInterval(timer)
  timer = setInterval(() => {
    if (visibleSteps.value < modes[i].steps.length) {
      visibleSteps.value++
    } else {
      clearInterval(timer)
    }
  }, 300)
}

const modes = [
  {
    name: '编译型',
    steps: [
      { icon: '📝', name: '源代码', desc: 'main.c' },
      { icon: '⚙️', name: '编译器', desc: '全量编译' },
      { icon: '📦', name: '机器码', desc: '二进制可执行文件' },
      { icon: '🚀', name: '直接执行', desc: 'CPU 直接运行' }
    ],
    metrics: [
      { label: '运行速度', value: 95, text: '极快', color: '#22c55e' },
      { label: '启动速度', value: 30, text: '慢（需编译）', color: '#ef4444' },
      { label: '跨平台', value: 20, text: '需重新编译', color: '#ef4444' }
    ],
    langs: ['C', 'C++', 'Rust', 'Go']
  },
  {
    name: '解释型',
    steps: [
      { icon: '📝', name: '源代码', desc: 'app.py' },
      { icon: '🔍', name: '解释器', desc: '逐行读取' },
      { icon: '🔄', name: '逐行执行', desc: '边翻译边运行' }
    ],
    metrics: [
      { label: '运行速度', value: 30, text: '较慢', color: '#ef4444' },
      { label: '启动速度', value: 90, text: '快（直接运行）', color: '#22c55e' },
      { label: '跨平台', value: 90, text: '天然跨平台', color: '#22c55e' }
    ],
    langs: ['Python', 'Ruby', 'PHP', 'Bash']
  },
  {
    name: 'JIT 即时编译',
    steps: [
      { icon: '📝', name: '源代码', desc: 'app.js' },
      { icon: '🔍', name: '解释执行', desc: '先解释运行' },
      { icon: '🔥', name: '热点检测', desc: '发现高频代码' },
      { icon: '⚡', name: 'JIT 编译', desc: '编译为机器码' },
      { icon: '🚀', name: '高速执行', desc: '接近原生速度' }
    ],
    metrics: [
      { label: '运行速度', value: 75, text: '快（热点接近原生）', color: '#22c55e' },
      { label: '启动速度', value: 60, text: '中等（需预热）', color: '#eab308' },
      { label: '跨平台', value: 85, text: '跨平台', color: '#22c55e' }
    ],
    langs: ['JavaScript (V8)', 'Java (JVM)', 'C# (.NET)']
  }
]
</script>

<style scoped>
.compile-vs-interpret-demo {
  padding: 20px; border: 1px solid var(--vp-c-divider);
  border-radius: 12px; margin: 16px 0; background: var(--vp-c-bg-soft);
}
h4 { margin: 0 0 4px; }
.desc { color: var(--vp-c-text-2); font-size: 14px; margin: 0 0 16px; }
.mode-selector { display: flex; gap: 8px; margin-bottom: 16px; }
.mode-btn {
  padding: 8px 18px; border-radius: 8px; border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg); cursor: pointer; font-size: 14px; font-weight: 500;
  transition: all 0.2s;
}
.mode-btn.active { background: var(--vp-c-brand-1); color: #fff; border-color: var(--vp-c-brand-1); }
.pipeline { display: flex; align-items: center; gap: 4px; flex-wrap: wrap; margin-bottom: 16px; }
.pipe-step {
  display: flex; align-items: center; gap: 4px; opacity: 0;
  transform: translateY(8px); transition: all 0.3s;
}
.pipe-step.visible { opacity: 1; transform: translateY(0); }
.step-icon { font-size: 24px; }
.step-name { font-size: 12px; font-weight: 600; }
.step-desc { font-size: 11px; color: var(--vp-c-text-3); }
.arrow { color: var(--vp-c-text-3); font-size: 18px; margin: 0 4px; }
.metrics { display: flex; flex-direction: column; gap: 8px; margin-bottom: 14px; }
.metric { display: flex; align-items: center; gap: 8px; font-size: 13px; }
.metric-label { width: 70px; text-align: right; color: var(--vp-c-text-2); }
.metric-bar-bg { flex: 1; height: 10px; background: var(--vp-c-divider); border-radius: 5px; overflow: hidden; }
.metric-bar { height: 100%; border-radius: 5px; transition: width 0.5s; }
.metric-val { width: 130px; font-size: 12px; color: var(--vp-c-text-3); }
.examples { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
.ex-label { font-size: 13px; color: var(--vp-c-text-2); }
.ex-lang {
  padding: 3px 10px; background: var(--vp-c-bg); border: 1px solid var(--vp-c-divider);
  border-radius: 4px; font-size: 12px;
}
@media (max-width: 640px) { .metric-val { width: auto; } }
</style>
