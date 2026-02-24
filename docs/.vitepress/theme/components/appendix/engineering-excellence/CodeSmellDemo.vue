<template>
  <div class="code-smell-demo">
    <div class="demo-label">代码坏味道识别器 ── 点击切换不同示例</div>

    <div class="tabs">
      <button
        v-for="(item, i) in smells"
        :key="i"
        class="tab"
        :class="{ active: current === i }"
        @click="current = i"
      >
        {{ item.icon }} {{ item.name }}
      </button>
    </div>

    <div class="content">
      <div class="code-panel">
        <div class="panel-title">问题代码</div>
        <pre><code>{{ smells[current].bad }}</code></pre>
      </div>
      <div class="info-panel" :class="smells[current].cls">
        <h4>{{ smells[current].icon }} {{ smells[current].name }}</h4>
        <p class="desc">{{ smells[current].desc }}</p>
        <div class="suggestion">
          <strong>改进建议：</strong>{{ smells[current].fix }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const current = ref(0)

const smells = [
  {
    name: '过长函数',
    icon: '📏',
    cls: 'red',
    desc: '一个函数超过 50 行，做了太多事情，难以理解和测试。',
    bad: `function processOrder(order) {
  // 验证订单... (20行)
  // 计算价格... (15行)
  // 检查库存... (10行)
  // 发送通知... (15行)
  // 更新数据库... (10行)
  // 生成报表... (10行)
  // 总计 80+ 行！
}`,
    fix: '将大函数拆分为多个职责单一的小函数：validateOrder()、calculatePrice()、checkInventory() 等。'
  },
  {
    name: '魔法数字',
    icon: '🔢',
    cls: 'orange',
    desc: '代码中直接使用含义不明的数字字面量，阅读者无法理解其含义。',
    bad: `if (user.age >= 18) { ... }
if (password.length < 8) { ... }
if (retryCount > 3) { ... }
setTimeout(fn, 86400000)`,
    fix: '用命名常量替代：const ADULT_AGE = 18、const MIN_PASSWORD_LENGTH = 8、const ONE_DAY_MS = 86400000。'
  },
  {
    name: '重复代码',
    icon: '📋',
    cls: 'yellow',
    desc: '相同或相似的代码出现在多处，修改时容易遗漏。',
    bad: `// 文件 A
const tax = price * 0.13
const total = price + tax

// 文件 B（几乎一样）
const tax = amount * 0.13
const sum = amount + tax`,
    fix: '提取公共函数 calculateTax(amount)，在多处复用，修改只需改一处。'
  },
  {
    name: '过深嵌套',
    icon: '🪆',
    cls: 'purple',
    desc: '多层 if/for 嵌套导致代码难以阅读，逻辑像迷宫。',
    bad: `if (user) {
  if (user.isActive) {
    if (user.hasPermission) {
      if (order.isValid) {
        // 终于到了真正的逻辑...
      }
    }
  }
}`,
    fix: '使用卫语句（Guard Clause）提前返回：if (!user) return; if (!user.isActive) return; ...'
  }
]
</script>

<style scoped>
.code-smell-demo {
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
  margin-bottom: 1rem;
  text-align: center;
}

.tabs {
  display: flex;
  gap: 6px;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

.tab {
  padding: 6px 12px;
  border-radius: 6px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  cursor: pointer;
  font-size: 0.82rem;
  transition: all 0.2s;
}

.tab.active {
  background: var(--vp-c-brand);
  color: #fff;
  border-color: var(--vp-c-brand);
}

.content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

@media (max-width: 640px) {
  .content {
    grid-template-columns: 1fr;
  }
}

.code-panel {
  background: var(--vp-c-bg);
  border-radius: 6px;
  overflow: hidden;
}

.panel-title {
  font-size: 0.72rem;
  padding: 4px 10px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-3);
  border-bottom: 1px solid var(--vp-c-divider);
}

.code-panel pre {
  margin: 0;
  padding: 10px;
  font-size: 0.8rem;
  line-height: 1.5;
  overflow-x: auto;
}

.info-panel {
  padding: 1rem;
  border-radius: 6px;
}

.info-panel.red { background: #fef2f2; border: 1px solid #fecaca; }
.info-panel.orange { background: #fff7ed; border: 1px solid #fed7aa; }
.info-panel.yellow { background: #fefce8; border: 1px solid #fde68a; }
.info-panel.purple { background: #faf5ff; border: 1px solid #e9d5ff; }

:root.dark .info-panel.red { background: #1c0606; border-color: #7f1d1d; }
:root.dark .info-panel.orange { background: #1c0f03; border-color: #9a3412; }
:root.dark .info-panel.yellow { background: #1c1a03; border-color: #854d0e; }
:root.dark .info-panel.purple { background: #1a0a2e; border-color: #6b21a8; }

.info-panel h4 {
  margin: 0 0 0.5rem;
  font-size: 1rem;
}

.desc {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.6rem;
}

.suggestion {
  font-size: 0.83rem;
  padding: 8px;
  background: var(--vp-c-bg);
  border-radius: 4px;
}
</style>
