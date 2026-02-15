<script setup>
import { ref } from 'vue'

const activeScope = ref('block') // 'global', 'function', 'block'
const explanation = ref('')

const scopes = [
  {
    id: 'global',
    name: '全局作用域',
    color: '#a0aec0',
    variables: ['appName = "Todo"'],
    canSee: ['appName']
  },
  {
    id: 'function',
    name: '函数 greet() 作用域',
    color: '#4299e1',
    variables: ['message = "你好"'],
    canSee: ['appName', 'message']
  },
  {
    id: 'block',
    name: 'if 块作用域',
    color: '#38a169',
    variables: ['greeting = message + appName'],
    canSee: ['appName', 'message', 'greeting']
  }
]

const updateExplanation = () => {
  const scope = scopes.find(s => s.id === activeScope.value)
  if (scope) {
    const visible = scope.canSee.map(v => `✅ ${v}`).join('、')
    explanation.value = `在这个位置，你能使用这些变量：${visible}`
  }
}

updateExplanation()
</script>

<template>
  <div class="scope-demo">
    <h3>作用域：变量的"可见范围"</h3>

    <div class="scopes-container">
      <!-- 全局作用域 -->
      <div
        class="scope global-scope"
        :class="{ 'active': activeScope === 'global' }"
        @click="activeScope = 'global'; updateExplanation()"
      >
        <div class="scope-header">全局作用域</div>
        <div class="scope-content">
          <div class="variable" :class="{ 'visible': activeScope === 'global', 'dimmed': activeScope !== 'global' }">
            appName = "Todo"
          </div>

          <!-- 函数作用域 -->
          <div class="nested-scope">
            <div
              class="scope function-scope"
              :class="{ 'active': activeScope === 'function' }"
              @click.stop="activeScope = 'function'; updateExplanation()"
            >
              <div class="scope-header">函数 greet() 作用域</div>
              <div class="scope-content">
                <div class="variable" :class="{ 'visible': ['global', 'function'].includes(activeScope), 'dimmed': !['global', 'function'].includes(activeScope) }">
                  appName = "Todo"
                </div>
                <div class="variable" :class="{ 'visible': activeScope === 'function', 'dimmed': activeScope !== 'function' }">
                  message = "你好"
                </div>

                <!-- 块级作用域 -->
                <div class="nested-scope">
                  <div
                    class="scope block-scope"
                    :class="{ 'active': activeScope === 'block' }"
                    @click.stop="activeScope = 'block'; updateExplanation()"
                  >
                    <div class="scope-header">if 块作用域</div>
                    <div class="scope-content">
                      <div class="variable" :class="{ 'visible': true, 'dimmed': false }">
                        appName = "Todo"
                      </div>
                      <div class="variable" :class="{ 'visible': true, 'dimmed': false }">
                        message = "你好"
                      </div>
                      <div class="variable" :class="{ 'visible': activeScope === 'block', 'dimmed': activeScope !== 'block' }">
                        greeting = message + appName
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="explanation" v-if="explanation">
      {{ explanation }}
    </div>

    <div class="code-display">
      <h4>对应代码</h4>
      <pre><code>const appName = "Todo"  // 全局作用域

function greet() {
  const message = "你好"  // 函数作用域

  if (true) {
    const greeting = message + appName  // 块级作用域 ✅ 能看到外层的
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

.scopes-container {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.scope {
  border: 3px solid var(--vp-c-border);
  border-radius: 12px;
  padding: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  background: var(--vp-c-bg-soft);
}

.scope:hover {
  border-color: var(--vp-c-brand-1);
  transform: scale(1.02);
}

.scope.active {
  border-width: 4px;
  box-shadow: 0 0 0 4px rgba(62, 175, 124, 0.1);
}

.global-scope {
  border-color: #a0aec0;
}

.global-scope.active {
  border-color: #a0aec0;
  box-shadow: 0 0 0 4px rgba(160, 174, 192, 0.2);
}

.function-scope {
  border-color: #4299e1;
}

.function-scope.active {
  border-color: #4299e1;
  box-shadow: 0 0 0 4px rgba(66, 153, 225, 0.2);
}

.block-scope {
  border-color: #38a169;
}

.block-scope.active {
  border-color: #38a169;
  box-shadow: 0 0 0 4px rgba(56, 161, 105, 0.2);
}

.scope-header {
  font-size: 12px;
  font-weight: 600;
  margin-bottom: 12px;
  text-align: center;
}

.scope-content {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.nested-scope {
  display: flex;
  justify-content: center;
  margin-top: 12px;
}

.variable {
  padding: 8px 12px;
  border-radius: 6px;
  font-family: 'Courier New', monospace;
  font-size: 12px;
  font-weight: 500;
  background: var(--vp-c-bg);
  transition: all 0.3s ease;
}

.variable.visible {
  color: var(--vp-c-text-1);
  font-weight: 600;
}

.variable.dimmed {
  color: var(--vp-c-text-3);
  opacity: 0.5;
}

.explanation {
  text-align: center;
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 20px;
  font-size: 14px;
  font-weight: 500;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
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

@media (max-width: 768px) {
  .scopes-container {
    flex-direction: column;
    align-items: center;
  }

  .scope {
    min-width: 280px;
  }
}
</style>
