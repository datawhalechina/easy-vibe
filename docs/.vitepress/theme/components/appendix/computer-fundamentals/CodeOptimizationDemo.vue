<template>
  <div class="code-optimization-demo">
    <h4>⚡ 编译器优化：让代码自动变快</h4>
    <p class="desc">选择一种优化技术，观察编译器如何自动改进你的代码</p>

    <div class="opt-selector">
      <button
        v-for="(opt, i) in optimizations"
        :key="i"
        :class="['opt-btn', { active: selected === i }]"
        @click="selected = i"
      >
        <span class="opt-icon">{{ opt.icon }}</span>
        <span>{{ opt.name }}</span>
      </button>
    </div>

    <div class="opt-detail">
      <div class="code-panel before">
        <div class="panel-header">📝 优化前</div>
        <pre class="code-block">{{ optimizations[selected].before }}</pre>
      </div>
      <div class="arrow-col">
        <div class="arrow-box">
          <span class="arrow-icon">→</span>
          <span class="arrow-label">编译器优化</span>
        </div>
      </div>
      <div class="code-panel after">
        <div class="panel-header">🚀 优化后</div>
        <pre class="code-block">{{ optimizations[selected].after }}</pre>
      </div>
    </div>

    <div class="opt-explain">
      <div class="explain-header">{{ optimizations[selected].name }}原理</div>
      <div class="explain-text">{{ optimizations[selected].explain }}</div>
      <div class="perf-gain">
        <span class="gain-label">性能提升：</span>
        <div class="gain-bar-bg">
          <div
            class="gain-bar"
            :style="{ width: optimizations[selected].gain + '%' }"
          ></div>
        </div>
        <span class="gain-value">{{ optimizations[selected].gain }}%</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const selected = ref(0)

const optimizations = [
  {
    icon: '🧮',
    name: '常量折叠',
    before: `const width = 10
const height = 20
const area = width * height  // 运行时计算
console.log(area)`,
    after: `const area = 200  // 编译时直接算出结果
console.log(200)`,
    explain:
      '编译器发现 width 和 height 都是常量，在编译阶段就直接计算出 10 * 20 = 200，运行时不再需要做乘法运算。这是最基础也最常见的优化。',
    gain: 30
  },
  {
    icon: '💀',
    name: '死代码消除',
    before: `function process(x) {
  const result = x * 2
  return result

  // 以下代码永远不会执行
  console.log("debug info")
  const unused = x + 1
  return unused
}`,
    after: `function process(x) {
  return x * 2  // 只保留有用的代码
}`,
    explain:
      '编译器分析控制流，发现 return 之后的代码永远不会执行，直接删除。同时发现 result 变量只被赋值后立即返回，于是内联了表达式。',
    gain: 20
  },
  {
    icon: '🔄',
    name: '循环不变量外提',
    before: `const arr = [1, 2, 3, ..., 10000]
for (let i = 0; i < arr.length; i++) {
  // arr.length 每次循环都要读取
  process(arr[i])
}`,
    after: `const arr = [1, 2, 3, ..., 10000]
const len = arr.length  // 提到循环外，只读一次
for (let i = 0; i < len; i++) {
  process(arr[i])
}`,
    explain:
      '循环体内的 arr.length 每次迭代都要访问，但它的值在循环中不会改变。编译器把这个不变的计算提到循环外面，避免了 10000 次重复读取。',
    gain: 45
  },
  {
    icon: '📦',
    name: '函数内联',
    before: `function square(x) {
  return x * x
}

// 调用 10000 次
for (let i = 0; i < 10000; i++) {
  result += square(i)  // 每次都有函数调用开销
}`,
    after: `// 消除函数调用开销
for (let i = 0; i < 10000; i++) {
  result += i * i  // 直接展开，无调用开销
}`,
    explain:
      '函数调用有开销（保存寄存器、跳转、返回）。对于小函数，编译器直接把函数体"粘贴"到调用处，消除调用开销。JIT 编译器（如 V8）特别擅长这个优化。',
    gain: 55
  },
  {
    icon: '🔗',
    name: '常量传播',
    before: `const x = 10
const y = x + 5      // y = 15
const z = y * 2      // z = 30
console.log(z + 1)   // 31`,
    after: `console.log(31)  // 编译时追踪所有常量值
// x, y, z 全部被消除`,
    explain:
      '编译器追踪每个变量的值：x=10 → y=15 → z=30 → z+1=31。当所有中间变量都是常量时，整个计算链在编译时就完成了，运行时只需要输出结果。',
    gain: 40
  }
]
</script>

<style scoped>
.code-optimization-demo {
  padding: 20px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  margin: 16px 0;
  background: var(--vp-c-bg-soft);
}
h4 {
  margin: 0 0 4px;
}
.desc {
  color: var(--vp-c-text-2);
  font-size: 14px;
  margin: 0 0 16px;
}
.opt-selector {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
  flex-wrap: wrap;
}
.opt-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  border-radius: 6px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  cursor: pointer;
  font-size: 13px;
  transition: all 0.2s;
}
.opt-btn.active {
  background: var(--vp-c-brand-1);
  color: #fff;
  border-color: var(--vp-c-brand-1);
}
.opt-icon {
  font-size: 16px;
}
.opt-detail {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 8px;
  margin-bottom: 14px;
  align-items: stretch;
}
.code-panel {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  overflow: hidden;
  background: var(--vp-c-bg);
}
.panel-header {
  padding: 6px 12px;
  font-size: 12px;
  font-weight: 600;
  border-bottom: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
}
.code-block {
  padding: 10px 12px;
  margin: 0;
  font-size: 12px;
  line-height: 1.5;
  white-space: pre-wrap;
}
.arrow-col {
  display: flex;
  align-items: center;
  justify-content: center;
}
.arrow-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}
.arrow-icon {
  font-size: 24px;
  color: var(--vp-c-brand-1);
  font-weight: 700;
}
.arrow-label {
  font-size: 11px;
  color: var(--vp-c-text-3);
  white-space: nowrap;
}
.opt-explain {
  padding: 12px 14px;
  background: var(--vp-c-brand-soft);
  border-radius: 8px;
}
.explain-header {
  font-weight: 600;
  font-size: 13px;
  margin-bottom: 6px;
}
.explain-text {
  font-size: 13px;
  line-height: 1.6;
  margin-bottom: 10px;
}
.perf-gain {
  display: flex;
  align-items: center;
  gap: 8px;
}
.gain-label {
  font-size: 12px;
  font-weight: 600;
  white-space: nowrap;
}
.gain-bar-bg {
  flex: 1;
  height: 8px;
  background: var(--vp-c-bg);
  border-radius: 4px;
  overflow: hidden;
}
.gain-bar {
  height: 100%;
  background: var(--vp-c-brand-1);
  border-radius: 4px;
  transition: width 0.4s ease;
}
.gain-value {
  font-size: 12px;
  font-weight: 600;
  color: var(--vp-c-brand-1);
}
@media (max-width: 640px) {
  .opt-detail {
    grid-template-columns: 1fr;
  }
  .arrow-col {
    transform: rotate(90deg);
    padding: 4px 0;
  }
}
</style>
