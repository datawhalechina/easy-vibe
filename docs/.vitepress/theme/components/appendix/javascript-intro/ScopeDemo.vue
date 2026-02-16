<script setup>
import { ref } from 'vue'

const activeScope = ref('global')
const explanation = ref('')

const scopes = [
  {
    id: 'global',
    name: '全局作用域',
    color: '#a0aec0',
    vars: [{ name: 'appName', value: '"Todo"', own: true }]
  },
  {
    id: 'function',
    name: '函数 greet() 作用域',
    color: '#4299e1',
    vars: [
      { name: 'appName', value: '"Todo"', own: false, from: '全局' },
      { name: 'message', value: '"你好"', own: true }
    ]
  },
  {
    id: 'block',
    name: 'if 块作用域',
    color: '#38a169',
    vars: [
      { name: 'appName', value: '"Todo"', own: false, from: '全局' },
      { name: 'message', value: '"你好"', own: false, from: '函数' },
      { name: 'greeting', value: 'message+appName', own: true }
    ]
  }
]

const updateExplanation = () => {
  const texts = {
    global: '在全局作用域，只能使用全局变量 appName',
    function: '在函数作用域，可以使用自己的 message 和全局的 appName（作用域链查找）',
    block: '在块级作用域，可以使用自己的 greeting，以及外层的 message 和 appName'
  }
  explanation.value = texts[activeScope.value]
}

updateExplanation()
</script>

<template>
  <div class="scope-demo">
    <h3>🔍 作用域：变量的"可见范围"</h3>

    <div class="scope-selector">
      <button
        v-for="scope in scopes"
        :key="scope.id"
        @click="activeScope = scope.id; updateExplanation()"
        class="scope-btn"
        :class="{ active: activeScope === scope.id }"
        :style="{ borderColor: scope.color }"
      >
        {{ scope.name }}
      </button>
    </div>

    <div class="scope-visual">
      <!-- 作用域层级图 -->
      <div class="scope-levels">
        <div
          v-for="(scope, index) in scopes"
          :key="scope.id"
          class="level"
          :class="{ active: activeScope === scope.id, dimmed: activeScope !== scope.id }"
          :style="{ borderLeftColor: scope.color }"
        >
          <div class="level-header" :style="{ color: scope.color }">
            {{ scope.name }}
          </div>
          <div class="level-vars">
            <div
              v-for="v in scope.vars"
              :key="v.name"
              class="var-tag"
              :class="{ own: v.own, inherited: !v.own }"
            >
              <span class="var-name">{{ v.name }}</span>
              <span class="var-value">= {{ v.value }}</span>
              <span v-if="!v.own" class="var-from">← {{ v.from }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 说明 -->
      <div class="explanation-box">
        <div class="explanation-title">💡 当前位置可见的变量</div>
        <div class="explanation-text">{{ explanation }}</div>
      </div>
    </div>

    <div class="code-display">
      <h4>对应代码</h4>
      <pre><code>const appName = "Todo"  // 全局作用域

function greet() {
  const message = "你好"  // 函数作用域

  if (true) {
    const greeting = message + appName  // 块级作用域
    console.log(greeting)
  }

  console.log(greeting)  // ❌ 报错！外层看不到内层
}</code></pre>
    </div>
  </div>
</template>

<style scoped>
.scope-demo {
  border: 1px solid var(--vp-c-border);
  border-radius: 12px;
  padding: 24px;
  margin: 24px 0;
  background: var(--vp-c-bg);
}

h3 {
  margin: 0 0 20px 0;
  font-size: 18px;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.scope-selector {
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.scope-btn {
  padding: 10px 16px;
  border: 2px solid var(--vp-c-border);
  border-radius: 8px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.scope-btn:hover {
  background: var(--vp-c-bg-soft);
}

.scope-btn.active {
  background: var(--vp-c-brand-soft);
  border-color: var(--vp-c-brand);
}

.scope-visual {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 20px;
  margin-bottom: 20px;
}

@media (max-width: 768px) {
  .scope-visual {
    grid-template-columns: 1fr;
  }
}

.scope-levels {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.level {
  border-left: 4px solid;
  padding: 12px 16px;
  background: var(--vp-c-bg-soft);
  border-radius: 0 8px 8px 0;
  transition: all 0.3s ease;
}

.level.active {
  background: var(--vp-c-bg);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.level.dimmed {
  opacity: 0.6;
}

.level-header {
  font-weight: 600;
  font-size: 14px;
  margin-bottom: 8px;
}

.level-vars {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.var-tag {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 13px;
  font-family: 'Courier New', monospace;
}

.var-tag.own {
  background: var(--vp-c-brand-soft);
  border: 1px solid var(--vp-c-brand);
}

.var-tag.inherited {
  background: var(--vp-c-bg-alt);
  border: 1px dashed var(--vp-c-border);
}

.var-name {
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.var-value {
  color: var(--vp-c-text-2);
}

.var-from {
  font-size: 11px;
  color: var(--vp-c-text-3);
  font-style: italic;
}

.explanation-box {
  background: var(--vp-c-brand-soft);
  border-radius: 8px;
  padding: 16px;
}

.explanation-title {
  font-weight: 600;
  color: var(--vp-c-brand);
  margin-bottom: 8px;
  font-size: 14px;
}

.explanation-text {
  color: var(--vp-c-text-1);
  font-size: 14px;
  line-height: 1.6;
}

.code-display {
  background: #1e1e1e;
  border-radius: 8px;
  padding: 16px;
  overflow-x: auto;
}

.code-display h4 {
  color: #d4d4d4;
  margin: 0 0 12px 0;
  font-size: 14px;
  font-weight: 600;
}

.code-display pre {
  margin: 0;
}

.code-display code {
  font-family: 'Courier New', monospace;
  font-size: 13px;
  line-height: 1.6;
  color: #d4d4d4;
}
</style>
