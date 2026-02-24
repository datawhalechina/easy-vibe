<template>
  <div class="refactoring-demo">
    <div class="demo-label">重构手法对比演示 ── 选择一种手法查看前后对比</div>

    <div class="tabs">
      <button
        v-for="(item, i) in techniques"
        :key="i"
        :class="['tab-btn', { active: activeTab === i }]"
        @click="selectTab(i)"
      >
        {{ item.name }}
      </button>
    </div>

    <div class="desc">{{ current.description }}</div>

    <div class="compare-area">
      <div class="compare-panel before">
        <div class="panel-header">
          <span class="dot red"></span> 重构前
        </div>
        <pre class="code-block"><template
          v-for="(seg, j) in current.before"
          :key="'b'+j"
        ><span :class="{ highlight: showHighlight && seg.changed }">{{ seg.text }}</span></template></pre>
      </div>

      <div class="arrow-col">
        <span class="arrow-icon">→</span>
      </div>

      <div class="compare-panel after">
        <div class="panel-header">
          <span class="dot green"></span> 重构后
        </div>
        <pre class="code-block"><template
          v-for="(seg, j) in current.after"
          :key="'a'+j"
        ><span :class="{ highlight: showHighlight && seg.changed }">{{ seg.text }}</span></template></pre>
      </div>
    </div>

    <div class="tip-box">
      <strong>要点：</strong>{{ current.tip }}
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const activeTab = ref(0)
const showHighlight = ref(false)

function selectTab(i) {
  activeTab.value = i
  showHighlight.value = false
  setTimeout(() => { showHighlight.value = true }, 300)
}

// 初始化高亮
setTimeout(() => { showHighlight.value = true }, 500)

const techniques = [
  {
    name: '提炼函数',
    description: 'Extract Function：将一段代码从大函数中提取出来，放入一个命名清晰的新函数中。',
    before: [
      { text: 'function printReport(invoice) {\n  console.log("=== 账单 ===")\n' },
      { text: '  // 计算总额\n  let total = 0\n  for (let item of invoice.items) {\n    total += item.price * item.qty\n  }\n', changed: true },
      { text: '  console.log(`总计: ${total}`)\n}' }
    ],
    after: [
      { text: 'function printReport(invoice) {\n  console.log("=== 账单 ===")\n' },
      { text: '  const total = calcTotal(invoice.items)\n', changed: true },
      { text: '  console.log(`总计: ${total}`)\n}\n\n' },
      { text: 'function calcTotal(items) {\n  return items.reduce(\n    (s, i) => s + i.price * i.qty, 0\n  )\n}', changed: true }
    ],
    tip: '提炼函数是最常用的重构手法。好的函数名就是最好的注释——如果你需要写注释解释一段代码在做什么，那它就该被提炼成函数。'
  },
  {
    name: '重命名变量',
    description: 'Rename Variable：用清晰、有意义的名称替换含糊的变量名，让代码自解释。',
    before: [
      { text: 'function calc(', changed: true },
      { text: 'a, b, c', changed: true },
      { text: ') {\n' },
      { text: '  const d = a * b\n  const e = d * (1 - c)\n  return e\n}', changed: true }
    ],
    after: [
      { text: 'function calcOrderTotal(', changed: true },
      { text: 'price, quantity, discountRate', changed: true },
      { text: ') {\n' },
      { text: '  const subtotal = price * quantity\n  const total = subtotal * (1 - discountRate)\n  return total\n}', changed: true }
    ],
    tip: '变量命名是程序员最重要的基本功之一。好的命名让代码像散文一样可读，差的命名让代码像密码一样难解。'
  },
  {
    name: '消除重复',
    description: 'Remove Duplication：将重复的逻辑抽取为共享函数或模板，遵循 DRY 原则。',
    before: [
      { text: '// 员工报表\nfunction empReport(emp) {\n' },
      { text: '  return `${emp.name} | ${emp.dept} | ${emp.salary}`', changed: true },
      { text: '\n}\n\n// 经理报表\nfunction mgrReport(mgr) {\n' },
      { text: '  return `${mgr.name} | ${mgr.dept} | ${mgr.salary}`', changed: true },
      { text: '\n}' }
    ],
    after: [
      { text: '' },
      { text: 'function formatReport(person) {\n  return `${person.name} | ${person.dept} | ${person.salary}`\n}', changed: true },
      { text: '\n\n// 统一调用\n' },
      { text: 'formatReport(employee)\nformatReport(manager)', changed: true }
    ],
    tip: 'DRY（Don\'t Repeat Yourself）是软件工程的基本原则。每一处重复都是未来 bug 的温床——改了一处忘了另一处，就是典型的重复代码事故。'
  },
  {
    name: '简化条件',
    description: 'Simplify Conditional：用卫语句、策略模式等手法替代深层嵌套的 if-else，降低圈复杂度。',
    before: [
      { text: 'function getDiscount(user) {\n' },
      { text: '  if (user.type === "vip") {\n    if (user.years > 5) {\n      return 0.3\n    } else {\n      return 0.2\n    }\n  } else {\n    if (user.years > 3) {\n      return 0.1\n    } else {\n      return 0\n    }\n  }', changed: true },
      { text: '\n}' }
    ],
    after: [
      { text: 'function getDiscount(user) {\n' },
      { text: '  if (user.type === "vip" && user.years > 5) return 0.3\n  if (user.type === "vip") return 0.2\n  if (user.years > 3) return 0.1\n  return 0', changed: true },
      { text: '\n}' }
    ],
    tip: '卫语句（Guard Clause）通过提前返回来消除嵌套。扁平的代码结构比深层嵌套更容易理解和维护。'
  }
]

const current = computed(() => techniques[activeTab.value])
</script>

<style scoped>
.refactoring-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  padding: 1rem 1.2rem;
  margin: 1rem 0;
}

.demo-label {
  font-size: 0.78rem;
  font-weight: bold;
  color: var(--vp-c-text-2);
  margin-bottom: 0.75rem;
}

.tabs {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.6rem;
  flex-wrap: wrap;
}

.tab-btn {
  padding: 0.35rem 0.8rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-2);
  cursor: pointer;
  font-size: 0.82rem;
  transition: all 0.2s;
}

.tab-btn.active {
  background: var(--vp-c-brand-1);
  color: #fff;
  border-color: var(--vp-c-brand-1);
}

.desc {
  font-size: 0.82rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.8rem;
  line-height: 1.5;
}

.compare-area {
  display: flex;
  gap: 0.5rem;
  align-items: stretch;
}

@media (max-width: 640px) {
  .compare-area {
    flex-direction: column;
  }
  .arrow-col {
    transform: rotate(90deg);
  }
}

.compare-panel {
  flex: 1;
  min-width: 0;
}

.panel-header {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
  margin-bottom: 0.3rem;
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  display: inline-block;
}

.dot.red { background: #ef4444; }
.dot.green { background: #22c55e; }

.code-block {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 0.8rem;
  font-size: 0.75rem;
  line-height: 1.6;
  overflow-x: auto;
  margin: 0;
  white-space: pre;
  font-family: 'Fira Code', 'Consolas', monospace;
  min-height: 140px;
}

.highlight {
  background: rgba(34, 197, 94, 0.15);
  border-radius: 2px;
  transition: background 0.6s ease;
}

.before .highlight {
  background: rgba(239, 68, 68, 0.12);
}

.arrow-col {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.4rem;
  color: var(--vp-c-text-3);
  padding: 0 0.2rem;
}

.tip-box {
  margin-top: 0.8rem;
  padding: 0.6rem 0.8rem;
  background: rgba(59, 130, 246, 0.08);
  border-left: 3px solid var(--vp-c-brand-1);
  border-radius: 0 6px 6px 0;
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  line-height: 1.6;
}
</style>
