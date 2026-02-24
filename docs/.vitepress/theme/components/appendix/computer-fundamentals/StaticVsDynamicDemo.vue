<template>
  <div class="static-vs-dynamic-demo">
    <h4>🔍 静态类型 vs 动态类型：实时对比</h4>
    <p class="desc">选择一段代码，观察两种类型系统的不同行为</p>

    <div class="example-selector">
      <button
        v-for="(ex, i) in examples"
        :key="i"
        :class="['ex-btn', { active: selected === i }]"
        @click="selected = i"
      >
        {{ ex.label }}
      </button>
    </div>

    <div class="comparison">
      <div class="panel static-panel">
        <div class="panel-header">
          <span class="badge">静态类型（TypeScript）</span>
          <span class="timing">⏱ 编译时检查</span>
        </div>
        <pre class="code-block">{{ examples[selected].staticCode }}</pre>
        <div :class="['result', examples[selected].staticOk ? 'ok' : 'err']">
          {{ examples[selected].staticResult }}
        </div>
      </div>

      <div class="vs">VS</div>

      <div class="panel dynamic-panel">
        <div class="panel-header">
          <span class="badge dynamic">动态类型（JavaScript）</span>
          <span class="timing">⏱ 运行时检查</span>
        </div>
        <pre class="code-block">{{ examples[selected].dynamicCode }}</pre>
        <div :class="['result', examples[selected].dynamicOk ? 'ok' : 'err']">
          {{ examples[selected].dynamicResult }}
        </div>
      </div>
    </div>

    <div class="insight">
      💡 {{ examples[selected].insight }}
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const selected = ref(0)

const examples = [
  {
    label: '变量赋值',
    staticCode: `let name: string = "Alice"
name = 42  // ❌ 编译错误`,
    dynamicCode: `let name = "Alice"
name = 42  // ✅ 没问题`,
    staticResult: '❌ Type "number" is not assignable to type "string"',
    dynamicResult: '✅ 运行正常，name 变成了 42',
    staticOk: false,
    dynamicOk: true,
    insight: '静态类型在你写代码时就发现错误，动态类型要等到运行时才知道。'
  },
  {
    label: '函数参数',
    staticCode: `function add(a: number, b: number) {
  return a + b
}
add("1", 2)  // ❌ 编译错误`,
    dynamicCode: `function add(a, b) {
  return a + b
}
add("1", 2)  // ✅ 返回 "12"`,
    staticResult: '❌ Argument of type "string" is not assignable to parameter of type "number"',
    dynamicResult: '✅ 返回 "12"（字符串拼接，不是数学加法！）',
    staticOk: false,
    dynamicOk: true,
    insight: '动态类型的"灵活"有时是 bug 的温床——你期望 3，却得到 "12"。'
  },
  {
    label: '属性访问',
    staticCode: `interface User { name: string }
let user: User = { name: "Bob" }
console.log(user.age)  // ❌ 编译错误`,
    dynamicCode: `let user = { name: "Bob" }
console.log(user.age)  // ✅ 输出 undefined`,
    staticResult: '❌ Property "age" does not exist on type "User"',
    dynamicResult: '✅ 输出 undefined（不报错，但可能导致后续逻辑出错）',
    staticOk: false,
    dynamicOk: true,
    insight: '静态类型能在编译时捕获拼写错误和属性缺失，动态类型只会默默返回 undefined。'
  }
]
</script>

<style scoped>
.static-vs-dynamic-demo {
  padding: 20px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  margin: 16px 0;
  background: var(--vp-c-bg-soft);
}
h4 { margin: 0 0 4px; }
.desc { color: var(--vp-c-text-2); font-size: 14px; margin: 0 0 16px; }
.example-selector { display: flex; gap: 8px; margin-bottom: 16px; flex-wrap: wrap; }
.ex-btn {
  padding: 6px 14px; border-radius: 6px; border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg); cursor: pointer; font-size: 13px; transition: all 0.2s;
}
.ex-btn.active { background: var(--vp-c-brand-1); color: #fff; border-color: var(--vp-c-brand-1); }
.comparison { display: flex; gap: 12px; align-items: stretch; }
.panel { flex: 1; border-radius: 8px; border: 1px solid var(--vp-c-divider); background: var(--vp-c-bg); overflow: hidden; }
.panel-header { display: flex; justify-content: space-between; align-items: center; padding: 8px 12px; background: var(--vp-c-bg-soft); border-bottom: 1px solid var(--vp-c-divider); }
.badge { font-size: 12px; font-weight: 600; color: var(--vp-c-brand-1); }
.badge.dynamic { color: #e5a00d; }
.timing { font-size: 11px; color: var(--vp-c-text-3); }
.code-block { padding: 12px; margin: 0; font-size: 12px; line-height: 1.6; white-space: pre-wrap; overflow-x: auto; }
.result { padding: 8px 12px; font-size: 12px; border-top: 1px solid var(--vp-c-divider); }
.result.ok { background: #f0fdf4; color: #166534; }
.result.err { background: #fef2f2; color: #991b1b; }
.vs { display: flex; align-items: center; font-weight: 700; color: var(--vp-c-text-3); font-size: 14px; }
.insight { margin-top: 12px; padding: 10px 14px; background: var(--vp-c-brand-soft); border-radius: 8px; font-size: 13px; }
@media (max-width: 640px) {
  .comparison { flex-direction: column; }
  .vs { justify-content: center; padding: 4px 0; }
}
</style>
