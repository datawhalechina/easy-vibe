<template>
  <div class="type-safety-demo">
    <h4>🛡️ 类型安全实战：常见陷阱与防御</h4>
    <p class="desc">点击不同的陷阱场景，学习如何用类型系统保护你的代码</p>

    <div class="trap-selector">
      <button
        v-for="(trap, i) in traps"
        :key="i"
        :class="['trap-btn', { active: selected === i }]"
        @click="selected = i"
      >
        <span class="trap-icon">{{ trap.icon }}</span>
        <span>{{ trap.name }}</span>
      </button>
    </div>

    <div class="trap-detail">
      <div class="danger-zone">
        <div class="zone-header danger">⚠️ 危险代码</div>
        <pre class="code-block">{{ traps[selected].dangerCode }}</pre>
        <div class="zone-result danger">{{ traps[selected].dangerResult }}</div>
      </div>

      <div class="safe-zone">
        <div class="zone-header safe">✅ 安全代码</div>
        <pre class="code-block">{{ traps[selected].safeCode }}</pre>
        <div class="zone-result safe">{{ traps[selected].safeResult }}</div>
      </div>
    </div>

    <div class="defense-tip">
      <div class="tip-header">🔑 防御策略</div>
      <ul>
        <li v-for="(tip, j) in traps[selected].tips" :key="j">{{ tip }}</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const selected = ref(0)

const traps = [
  {
    icon: '💣', name: 'null 引用',
    dangerCode: `function getLength(str) {
  return str.length  // 如果 str 是 null？
}
getLength(null)  // 💥 运行时崩溃`,
    dangerResult: '💥 TypeError: Cannot read properties of null',
    safeCode: `function getLength(str: string | null): number {
  if (str === null) return 0
  return str.length  // ✅ 编译器确保此处 str 不为 null
}`,
    safeResult: '✅ 编译器强制你处理 null 的情况',
    tips: ['使用 strictNullChecks 编译选项', '用联合类型 string | null 显式标注可空', '用可选链 ?. 安全访问属性']
  },
  {
    icon: '🎭', name: '类型断言滥用',
    dangerCode: `const data = fetchAPI() as any
const name = data.user.profile.name
// 如果 API 返回格式变了？`,
    dangerResult: '💥 运行时崩溃，any 绕过了所有类型检查',
    safeCode: `interface APIResponse {
  user: { profile: { name: string } }
}
const data: APIResponse = await fetchAPI()
const name = data.user.profile.name`,
    safeResult: '✅ 如果 API 格式变了，编译时就能发现',
    tips: ['避免使用 any，用 unknown 代替', '为 API 响应定义明确的接口', '使用 zod 等库做运行时校验']
  },
  {
    icon: '🔄', name: '隐式转换',
    dangerCode: `if (userId == 0) {
  // 当 userId 是 "" 时也会进入！
  console.log("无效用户")
}
// "" == 0 → true（隐式转换）`,
    dangerResult: '💥 空字符串被当成 0，逻辑错误',
    safeCode: `if (userId === 0) {
  console.log("无效用户")
}
// "" === 0 → false（严格比较）`,
    safeResult: '✅ 严格比较不做隐式转换',
    tips: ['始终使用 === 而不是 ==', '开启 ESLint 的 eqeqeq 规则', '用 TypeScript 的严格模式']
  },
  {
    icon: '📦', name: '数组类型不安全',
    dangerCode: `const items = []  // any[] 类型
items.push(1)
items.push("hello")
items.push({ x: 1 })
// 数组里什么都有，取出来用时容易出错`,
    dangerResult: '💥 数组元素类型不一致，后续操作可能崩溃',
    safeCode: `const items: number[] = []
items.push(1)
items.push("hello")  // ❌ 编译错误！
// 编译器确保数组元素类型一致`,
    safeResult: '✅ 编译时就阻止了类型不一致的元素',
    tips: ['声明数组时指定元素类型', '使用 ReadonlyArray 防止意外修改', '用元组类型 [string, number] 表示固定结构']
  }
]
</script>

<style scoped>
.type-safety-demo {
  padding: 20px; border: 1px solid var(--vp-c-divider);
  border-radius: 12px; margin: 16px 0; background: var(--vp-c-bg-soft);
}
h4 { margin: 0 0 4px; }
.desc { color: var(--vp-c-text-2); font-size: 14px; margin: 0 0 16px; }
.trap-selector { display: flex; gap: 8px; margin-bottom: 16px; flex-wrap: wrap; }
.trap-btn {
  display: flex; align-items: center; gap: 6px;
  padding: 6px 14px; border-radius: 6px; border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg); cursor: pointer; font-size: 13px; transition: all 0.2s;
}
.trap-btn.active { background: var(--vp-c-brand-1); color: #fff; border-color: var(--vp-c-brand-1); }
.trap-icon { font-size: 16px; }
.trap-detail { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 12px; }
.danger-zone, .safe-zone { border-radius: 8px; border: 1px solid var(--vp-c-divider); overflow: hidden; background: var(--vp-c-bg); }
.zone-header { padding: 6px 12px; font-size: 13px; font-weight: 600; border-bottom: 1px solid var(--vp-c-divider); }
.zone-header.danger { background: #fef2f2; color: #991b1b; }
.zone-header.safe { background: #f0fdf4; color: #166534; }
.code-block { padding: 10px 12px; margin: 0; font-size: 12px; line-height: 1.5; white-space: pre-wrap; }
.zone-result { padding: 6px 12px; font-size: 12px; border-top: 1px solid var(--vp-c-divider); }
.zone-result.danger { background: #fef2f2; color: #991b1b; }
.zone-result.safe { background: #f0fdf4; color: #166534; }
.defense-tip { padding: 12px 14px; background: var(--vp-c-brand-soft); border-radius: 8px; }
.tip-header { font-weight: 600; font-size: 13px; margin-bottom: 6px; }
.defense-tip ul { margin: 0; padding-left: 18px; }
.defense-tip li { font-size: 13px; margin: 3px 0; }
@media (max-width: 640px) { .trap-detail { grid-template-columns: 1fr; } }
</style>
