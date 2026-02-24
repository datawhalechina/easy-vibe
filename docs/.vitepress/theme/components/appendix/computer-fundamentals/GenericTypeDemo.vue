<template>
  <div class="generic-type-demo">
    <h4>🧩 泛型：写一次，适用所有类型</h4>
    <p class="desc">点击不同场景，看泛型如何让代码既灵活又安全</p>

    <div class="scene-selector">
      <button
        v-for="(s, i) in scenes"
        :key="i"
        :class="['scene-btn', { active: selected === i }]"
        @click="selected = i"
      >
        {{ s.label }}
      </button>
    </div>

    <div class="code-comparison">
      <div class="code-panel">
        <div class="panel-tag bad">❌ 没有泛型</div>
        <pre class="code-block">{{ scenes[selected].without }}</pre>
        <div class="panel-problem">{{ scenes[selected].problem }}</div>
      </div>
      <div class="code-panel">
        <div class="panel-tag good">✅ 使用泛型</div>
        <pre class="code-block">{{ scenes[selected].withGeneric }}</pre>
        <div class="panel-benefit">{{ scenes[selected].benefit }}</div>
      </div>
    </div>

    <div class="type-flow">
      <div class="flow-title">类型传递过程</div>
      <div class="flow-steps">
        <span
          v-for="(step, j) in scenes[selected].flow"
          :key="j"
          class="flow-step"
        >
          <code>{{ step }}</code>
          <span v-if="j < scenes[selected].flow.length - 1" class="flow-arrow">→</span>
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const selected = ref(0)

const scenes = [
  {
    label: '通用函数',
    without: `// 要为每种类型写一个函数
function getFirstNumber(arr: number[]): number {
  return arr[0]
}
function getFirstString(arr: string[]): string {
  return arr[0]
}
// 还有 boolean、object...写不完`,
    withGeneric: `// 一个泛型函数搞定所有类型
function getFirst<T>(arr: T[]): T {
  return arr[0]
}

getFirst<number>([1, 2, 3])   // → number
getFirst<string>(["a", "b"])  // → string`,
    problem: '每种类型都要写一遍，代码重复',
    benefit: 'T 是类型参数，调用时自动替换为实际类型',
    flow: ['T = number', 'arr: number[]', '返回值: number']
  },
  {
    label: '类型安全容器',
    without: `// 用 any 失去类型安全
class Box {
  value: any
  get(): any { return this.value }
}
const box = new Box()
box.value = 42
const v = box.get() // v 是 any，没有类型提示`,
    withGeneric: `// 泛型类保持类型安全
class Box<T> {
  value: T
  get(): T { return this.value }
}
const box = new Box<number>()
box.value = 42
const v = box.get() // v 是 number，有完整提示`,
    problem: 'any 类型没有任何类型检查和提示',
    benefit: '泛型类在实例化时确定类型，全程类型安全',
    flow: ['Box<number>', 'value: number', 'get(): number']
  },
  {
    label: '类型约束',
    without: `// 没有约束，什么都能传
function getLength<T>(item: T): number {
  return item.length  // ❌ 编译错误！
  // T 可能没有 length 属性
}`,
    withGeneric: `// 用 extends 约束 T 必须有 length
interface HasLength { length: number }

function getLength<T extends HasLength>(item: T) {
  return item.length  // ✅ 安全！
}

getLength("hello")     // ✅ string 有 length
getLength([1, 2, 3])   // ✅ array 有 length
getLength(42)           // ❌ number 没有 length`,
    problem: '不加约束，泛型太"自由"，无法安全访问属性',
    benefit: 'extends 约束确保 T 一定有 length 属性',
    flow: ['T extends HasLength', '确保有 .length', '安全访问']
  }
]
</script>

<style scoped>
.generic-type-demo {
  padding: 20px; border: 1px solid var(--vp-c-divider);
  border-radius: 12px; margin: 16px 0; background: var(--vp-c-bg-soft);
}
h4 { margin: 0 0 4px; }
.desc { color: var(--vp-c-text-2); font-size: 14px; margin: 0 0 16px; }
.scene-selector { display: flex; gap: 8px; margin-bottom: 16px; flex-wrap: wrap; }
.scene-btn {
  padding: 6px 14px; border-radius: 6px; border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg); cursor: pointer; font-size: 13px; transition: all 0.2s;
}
.scene-btn.active { background: var(--vp-c-brand-1); color: #fff; border-color: var(--vp-c-brand-1); }
.code-comparison { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 14px; }
.code-panel { border: 1px solid var(--vp-c-divider); border-radius: 8px; overflow: hidden; background: var(--vp-c-bg); }
.panel-tag { padding: 6px 12px; font-size: 12px; font-weight: 600; border-bottom: 1px solid var(--vp-c-divider); }
.panel-tag.bad { background: #fef2f2; color: #991b1b; }
.panel-tag.good { background: #f0fdf4; color: #166534; }
.code-block { padding: 10px 12px; margin: 0; font-size: 12px; line-height: 1.5; white-space: pre-wrap; }
.panel-problem, .panel-benefit { padding: 6px 12px; font-size: 12px; border-top: 1px solid var(--vp-c-divider); }
.panel-problem { background: #fef2f2; color: #991b1b; }
.panel-benefit { background: #f0fdf4; color: #166534; }
.type-flow { padding: 12px 14px; background: var(--vp-c-brand-soft); border-radius: 8px; }
.flow-title { font-weight: 600; font-size: 13px; margin-bottom: 8px; }
.flow-steps { display: flex; align-items: center; gap: 6px; flex-wrap: wrap; }
.flow-step { display: flex; align-items: center; gap: 6px; }
.flow-step code { padding: 3px 8px; background: var(--vp-c-bg); border-radius: 4px; font-size: 12px; }
.flow-arrow { color: var(--vp-c-text-3); font-weight: 600; }
@media (max-width: 640px) { .code-comparison { grid-template-columns: 1fr; } }
</style>
