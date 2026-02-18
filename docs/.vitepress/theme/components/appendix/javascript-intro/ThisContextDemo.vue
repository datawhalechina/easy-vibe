<template>
  <div class="this-context-demo">
    <div class="demo-header">
      <span class="icon">🎯</span>
      <span class="title">this 与执行上下文</span>
      <span class="subtitle">理解 this 的指向规则</span>
    </div>

    <div class="intro-text">
      想象<span class="highlight">this</span>就像一个<span class="highlight">指针</span>，
      指向"当前正在执行的主角"。不同场景下，主角会变化——
      有时是<span class="highlight">对象自己</span>，有时是<span class="highlight">全局环境</span>，还有时完全取决于<span class="highlight">谁在调用</span>
    </div>

    <div class="scenario-selector">
      <button
        v-for="scenario in scenarios"
        :key="scenario.id"
        class="scenario-btn"
        :class="{ active: activeScenario === scenario.id }"
        @click="activeScenario = scenario.id"
      >
        {{ scenario.label }}
      </button>
    </div>

    <!-- 方法调用 -->
    <div
      v-if="activeScenario === 'method'"
      class="scenario-content"
    >
      <div class="split-view">
        <div class="code-panel">
          <div class="code-title">
            对象方法调用
          </div>
          <div class="code-block">
            <div class="code-line">
              const person = {
            </div>
            <div class="code-line indent">
              name: "张三",
            </div>
            <div class="code-line indent">
              greet: function() {
            </div>
            <div class="code-line indent indent">
              return "你好，我是" + this.name
            </div>
            <div class="code-line indent">
              }
            </div>
            <div class="code-line">
              }
            </div>
            <div class="code-line" />
            <div class="code-line">
              person.greet() <span class="comment">// this → person</span>
            </div>
          </div>
        </div>

        <div class="visual-panel">
          <div class="object-visual">
            <div class="object-box">
              <div class="object-title">
                person 对象
              </div>
              <div class="object-content">
                <div class="property">
                  name: "张三"
                </div>
                <div
                  class="method"
                  @click="simulateMethodCall"
                >
                  greet: function() { ... }
                </div>
              </div>
            </div>

            <div class="arrow-indicator">
              <div class="this-pointer">
                this →
              </div>
            </div>

            <div
              v-if="methodCallResult"
              class="result-box"
            >
              {{ methodCallResult }}
            </div>
          </div>

          <div class="rule-box">
            <div class="rule-title">
              规则：对象方法
            </div>
            <div class="rule-content">
              通过对象调用方法时，<code>this</code> 指向该对象
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 普通函数 -->
    <div
      v-else-if="activeScenario === 'function'"
      class="scenario-content"
    >
      <div class="split-view">
        <div class="code-panel">
          <div class="code-title">
            普通函数调用
          </div>
          <div class="code-block">
            <div class="code-line">
              function show() {
            </div>
            <div class="code-line indent">
              return this === window
            </div>
            <div class="code-line">
              }
            </div>
            <div class="code-line" />
            <div class="code-line">
              show() <span class="comment">// this → window (浏览器)</span>
            </div>
            <div class="code-line" />
            <div class="code-line comment">
              // 严格模式下是 undefined
            </div>
          </div>
        </div>

        <div class="visual-panel">
          <div class="function-visual">
            <div class="global-window">
              <div class="window-title">
                window (全局对象)
              </div>
              <div class="window-content">
                <div class="global-item">
                  show 函数在这里
                </div>
                <div class="global-item">
                  this → window
                </div>
              </div>
            </div>
          </div>

          <div class="mode-toggle">
            <button
              class="toggle-btn"
              @click="strictMode = !strictMode"
            >
              {{ strictMode ? '严格模式：开' : '严格模式：关' }}
            </button>
            <div class="mode-result">
              this = {{ strictMode ? 'undefined' : 'window' }}
            </div>
          </div>

          <div class="rule-box">
            <div class="rule-title">
              规则：普通函数
            </div>
            <div class="rule-content">
              非严格模式：<code>this</code> 指向全局对象<br>
              严格模式：<code>this</code> 是 <code>undefined</code>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 构造函数 -->
    <div
      v-else-if="activeScenario === 'constructor'"
      class="scenario-content"
    >
      <div class="split-view">
        <div class="code-panel">
          <div class="code-title">
            构造函数调用
          </div>
          <div class="code-block">
            <div class="code-line">
              function Person(name) {
            </div>
            <div class="code-line indent">
              this.name = name
            </div>
            <div class="code-line">
              }
            </div>
            <div class="code-line" />
            <div class="code-line">
              const p1 = new Person("李四")
            </div>
            <div class="code-line">
              const p2 = new Person("王五")
            </div>
            <div class="code-line" />
            <div class="code-line comment">
              // p1.name = "李四"
            </div>
            <div class="code-line comment">
              // p2.name = "王五"
            </div>
          </div>
        </div>

        <div class="visual-panel">
          <div class="constructor-visual">
            <div class="constructor-process">
              <div class="process-step">
                <span class="step-num">1</span>
                <span>创建新对象</span>
              </div>
              <div class="process-arrow">
                ↓
              </div>
              <div class="process-step">
                <span class="step-num">2</span>
                <span>this 指向新对象</span>
              </div>
              <div class="process-arrow">
                ↓
              </div>
              <div class="process-step">
                <span class="step-num">3</span>
                <span>执行构造函数</span>
              </div>
              <div class="process-arrow">
                ↓
              </div>
              <div class="process-step">
                <span class="step-num">4</span>
                <span>返回新对象</span>
              </div>
            </div>

            <div class="object-comparison">
              <div class="obj-instance">
                <div class="obj-title">
                  p1
                </div>
                <div class="obj-content">
                  name: "李四"
                </div>
              </div>
              <div class="obj-instance">
                <div class="obj-title">
                  p2
                </div>
                <div class="obj-content">
                  name: "王五"
                </div>
              </div>
            </div>
          </div>

          <div class="rule-box">
            <div class="rule-title">
              规则：new 调用
            </div>
            <div class="rule-content">
              使用 <code>new</code> 调用函数时，<code>this</code> 指向新创建的对象
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- call/apply/bind -->
    <div
      v-else-if="activeScenario === 'explicit'"
      class="scenario-content"
    >
      <div class="split-view">
        <div class="code-panel">
          <div class="code-title">
            显式绑定 (call/apply/bind)
          </div>
          <div class="code-block">
            <div class="code-line">
              function greet() {
            </div>
            <div class="code-line indent">
              return "我是" + this.name
            </div>
            <div class="code-line">
              }
            </div>
            <div class="code-line" />
            <div class="code-line">
              const person = { name: "小明" }
            </div>
            <div class="code-line" />
            <div class="code-line">
              greet.call(person) <span class="comment">// 显式指定 this</span>
            </div>
            <div class="code-line">
              greet.apply(person)
            </div>
            <div class="code-line">
              const bound = greet.bind(person)
            </div>
          </div>
        </div>

        <div class="visual-panel">
          <div class="binding-visual">
            <div class="function-box">
              <div class="box-title">
                greet 函数
              </div>
              <div class="box-content">
                this.name
              </div>
            </div>

            <div class="binding-methods">
              <div
                class="binding-item"
                :class="{ active: bindingMethod === 'call' }"
                @click="simulateCall"
              >
                <div class="method-name">
                  call(person)
                </div>
                <div class="method-desc">
                  立即调用，this → person
                </div>
              </div>
              <div
                class="binding-item"
                :class="{ active: bindingMethod === 'apply' }"
                @click="simulateApply"
              >
                <div class="method-name">
                  apply(person)
                </div>
                <div class="method-desc">
                  同 call，参数为数组
                </div>
              </div>
              <div
                class="binding-item"
                :class="{ active: bindingMethod === 'bind' }"
                @click="simulateBind"
              >
                <div class="method-name">
                  bind(person)
                </div>
                <div class="method-desc">
                  返回新函数，this 固定
                </div>
              </div>
            </div>

            <div
              v-if="bindingResult"
              class="binding-result"
            >
              {{ bindingResult }}
            </div>
          </div>

          <div class="rule-box">
            <div class="rule-title">
              规则：显式绑定
            </div>
            <div class="rule-content">
              <code>call/apply/bind</code> 可以显式指定 <code>this</code> 的指向
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 箭头函数 -->
    <div
      v-else
      class="scenario-content"
    >
      <div class="split-view">
        <div class="code-panel">
          <div class="code-title">
            箭头函数的 this
          </div>
          <div class="code-block">
            <div class="code-line">
              const person = {
            </div>
            <div class="code-line indent">
              name: "小红",
            </div>
            <div class="code-line indent">
              greet: function() {
            </div>
            <div class="code-line indent indent">
              setTimeout(() => {
            </div>
            <div class="code-line indent indent indent">
              console.log(this.name)
            </div>
            <div class="code-line indent indent">
              }, 1000)
            </div>
            <div class="code-line indent">
              }
            </div>
            <div class="code-line">
              }
            </div>
            <div class="code-line" />
            <div class="code-line">
              person.greet() <span class="comment">// 输出 "小红"</span>
            </div>
          </div>
        </div>

        <div class="visual-panel">
          <div class="arrow-function-visual">
            <div class="outer-context">
              <div class="context-title">
                外层作用域 (person)
              </div>
              <div class="context-content">
                <div class="context-item">
                  this.name = "小红"
                </div>
              </div>
            </div>

            <div class="arrow-capture">
              <div class="capture-title">
                箭头函数捕获外层 this
              </div>
              <div class="capture-arrow">
                ↑ 继承 this
              </div>
            </div>

            <div class="inner-context">
              <div class="context-title">
                箭头函数内部
              </div>
              <div class="context-content">
                <div class="context-item">
                  this → 外层的 this
                </div>
              </div>
            </div>
          </div>

          <div class="rule-box">
            <div class="rule-title">
              规则：箭头函数
            </div>
            <div class="rule-content">
              箭头函数没有自己的 <code>this</code>，它继承外层作用域的 <code>this</code>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="quick-reference">
      <div class="reference-title">
        📋 this 指向速查表
      </div>
      <div class="reference-table">
        <div class="ref-row header">
          <span>调用方式</span>
          <span>this 指向</span>
        </div>
        <div class="ref-row">
          <span>obj.method()</span>
          <span>obj</span>
        </div>
        <div class="ref-row">
          <span>func()</span>
          <span>window / undefined</span>
        </div>
        <div class="ref-row">
          <span>new Func()</span>
          <span>新创建的对象</span>
        </div>
        <div class="ref-row">
          <span>func.call(obj)</span>
          <span>obj</span>
        </div>
        <div class="ref-row">
          <span>箭头函数</span>
          <span>外层作用域的 this</span>
        </div>
      </div>
    </div>

    <div class="info-box">
      <span class="icon">💡</span>
      <strong>核心思想：</strong>
      <span>this 的值是在函数调用时确定的，不是定义时确定的。关键要看"函数是如何被调用的"，而不是"函数在哪里定义"。箭头函数是例外——它没有自己的 this，从外层作用域继承。</span>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const activeScenario = ref('method')
const strictMode = ref(false)
const bindingMethod = ref('')
const methodCallResult = ref('')
const bindingResult = ref('')

const scenarios = [
  { id: 'method', label: '对象方法' },
  { id: 'function', label: '普通函数' },
  { id: 'constructor', label: '构造函数' },
  { id: 'explicit', label: 'call/apply/bind' },
  { id: 'arrow', label: '箭头函数' }
]

const simulateMethodCall = () => {
  methodCallResult.value = '你好，我是张三'
  setTimeout(() => {
    methodCallResult.value = ''
  }, 2000)
}

const simulateCall = () => {
  bindingMethod.value = 'call'
  bindingResult.value = '我是小明 (通过 call 绑定)'
}

const simulateApply = () => {
  bindingMethod.value = 'apply'
  bindingResult.value = '我是小明 (通过 apply 绑定)'
}

const simulateBind = () => {
  bindingMethod.value = 'bind'
  bindingResult.value = '我是小明 (通过 bind 绑定，返回新函数)'
}
</script>

<style scoped>
.this-context-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  padding: 1rem;
}

.demo-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.demo-header .icon { font-size: 1.25rem; }
.demo-header .title { font-weight: bold; font-size: 1rem; }
.demo-header .subtitle { color: var(--vp-c-text-2); font-size: 0.85rem; margin-left: 0.5rem; }

.intro-text {
  font-size: 0.9rem;
  line-height: 1.6;
  margin-bottom: 1rem;
  color: var(--vp-c-text-1);
}

.highlight {
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand);
  padding: 0.1rem 0.3rem;
  border-radius: 4px;
  font-weight: 500;
}

.scenario-selector {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

.scenario-btn {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.85rem;
  transition: all 0.2s;
}

.scenario-btn:hover {
  border-color: var(--vp-c-brand);
}

.scenario-btn.active {
  background: var(--vp-c-brand);
  color: white;
  border-color: var(--vp-c-brand);
}

.scenario-content {
  min-height: 350px;
}

.split-view {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.code-panel {
  background: #1e1e1e;
  border-radius: 6px;
  padding: 0.75rem;
  font-family: 'Monaco', 'Menlo', monospace;
  font-size: 0.8rem;
  color: #d4d4d4;
}

.code-title {
  color: #888;
  font-size: 0.7rem;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
}

.code-block {
  line-height: 1.5;
}

.code-line {
  padding: 0.1rem 0;
}

.code-line.indent {
  padding-left: 1.5rem;
}

.code-line.indent.indent {
  padding-left: 3rem;
}

.code-line .comment {
  color: #6a9955;
}

.code-line code {
  background: #333;
  padding: 0.1rem 0.3rem;
  border-radius: 3px;
}

.visual-panel {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.object-visual {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
}

.object-box {
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-brand);
  border-radius: 8px;
  padding: 0.75rem;
  width: 100%;
}

.object-title {
  font-weight: 600;
  color: var(--vp-c-brand);
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
}

.object-content {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.property, .method {
  background: var(--vp-c-bg-soft);
  padding: 0.4rem;
  border-radius: 4px;
  font-family: monospace;
  font-size: 0.8rem;
}

.method {
  cursor: pointer;
  transition: background 0.2s;
}

.method:hover {
  background: var(--vp-c-brand-soft);
}

.arrow-indicator {
  text-align: center;
}

.this-pointer {
  background: var(--vp-c-brand);
  color: white;
  padding: 0.3rem 0.6rem;
  border-radius: 4px;
  font-size: 0.85rem;
  font-weight: 600;
}

.result-box {
  background: var(--vp-c-brand-soft);
  border: 2px solid var(--vp-c-brand);
  border-radius: 6px;
  padding: 0.75rem;
  text-align: center;
  color: var(--vp-c-brand);
  font-weight: 600;
  animation: fadeIn 0.3s;
}

@keyframes fadeIn {
  from { opacity: 0; transform: scale(0.9); }
  to { opacity: 1; transform: scale(1); }
}

.rule-box {
  background: var(--vp-c-bg-alt);
  border-radius: 6px;
  padding: 0.75rem;
}

.rule-title {
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 0.5rem;
  font-size: 0.85rem;
}

.rule-content {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  line-height: 1.5;
}

.rule-content code {
  background: var(--vp-c-bg-soft);
  padding: 0.1rem 0.3rem;
  border-radius: 3px;
  font-family: monospace;
}

.function-visual {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
}

.global-window {
  background: #f5f5f5;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  padding: 1rem;
  width: 100%;
}

.window-title {
  font-weight: 600;
  color: #666;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
}

.window-content {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.global-item {
  background: white;
  padding: 0.4rem;
  border-radius: 4px;
  font-size: 0.8rem;
  color: #666;
}

.mode-toggle {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.toggle-btn {
  background: var(--vp-c-brand);
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.85rem;
}

.mode-result {
  background: var(--vp-c-bg-soft);
  padding: 0.5rem;
  border-radius: 4px;
  font-family: monospace;
  color: var(--vp-c-brand);
  font-weight: 600;
}

.constructor-process {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
}

.process-step {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

.step-num {
  background: var(--vp-c-brand);
  color: white;
  width: 1.3rem;
  height: 1.3rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.7rem;
  font-weight: 600;
}

.process-arrow {
  color: var(--vp-c-text-3);
  font-size: 1rem;
}

.object-comparison {
  display: flex;
  gap: 1rem;
  margin-top: 0.5rem;
}

.obj-instance {
  flex: 1;
  background: var(--vp-c-bg-soft);
  border: 2px solid var(--vp-c-brand);
  border-radius: 6px;
  padding: 0.5rem;
  text-align: center;
}

.obj-title {
  font-weight: 600;
  color: var(--vp-c-brand);
  margin-bottom: 0.25rem;
  font-size: 0.85rem;
}

.obj-content {
  font-family: monospace;
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
}

.binding-visual {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
}

.function-box {
  background: var(--vp-c-bg-soft);
  border: 2px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 0.5rem;
  text-align: center;
}

.box-title {
  font-weight: 600;
  color: var(--vp-c-text-2);
  font-size: 0.8rem;
  margin-bottom: 0.25rem;
}

.box-content {
  font-family: monospace;
  font-size: 0.85rem;
  color: var(--vp-c-brand);
}

.binding-methods {
  display: flex;
  gap: 0.5rem;
  width: 100%;
}

.binding-item {
  flex: 1;
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 0.5rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s;
}

.binding-item:hover {
  border-color: var(--vp-c-brand);
}

.binding-item.active {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-brand-soft);
}

.method-name {
  font-family: monospace;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 0.25rem;
  font-size: 0.8rem;
}

.method-desc {
  font-size: 0.7rem;
  color: var(--vp-c-text-3);
}

.binding-result {
  background: var(--vp-c-brand-soft);
  border: 2px solid var(--vp-c-brand);
  border-radius: 6px;
  padding: 0.75rem;
  text-align: center;
  color: var(--vp-c-brand);
  font-weight: 600;
  font-size: 0.9rem;
}

.arrow-function-visual {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.outer-context, .inner-context {
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-brand);
  border-radius: 6px;
  padding: 0.75rem;
}

.context-title {
  font-weight: 600;
  color: var(--vp-c-brand);
  margin-bottom: 0.5rem;
  font-size: 0.85rem;
}

.context-content {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.context-item {
  background: var(--vp-c-bg-soft);
  padding: 0.4rem;
  border-radius: 4px;
  font-family: monospace;
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
}

.arrow-capture {
  text-align: center;
  background: var(--vp-c-brand-soft);
  padding: 0.5rem;
  border-radius: 4px;
}

.capture-title {
  font-size: 0.8rem;
  color: var(--vp-c-brand);
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.capture-arrow {
  font-size: 0.85rem;
  color: var(--vp-c-brand);
}

.quick-reference {
  background: var(--vp-c-bg-alt);
  border-radius: 6px;
  padding: 0.75rem;
  margin-top: 1rem;
}

.reference-title {
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: var(--vp-c-text-1);
  font-size: 0.9rem;
}

.reference-table {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.ref-row {
  display: flex;
  justify-content: space-between;
  padding: 0.4rem;
  background: var(--vp-c-bg);
  border-radius: 4px;
  font-size: 0.85rem;
}

.ref-row.header {
  background: var(--vp-c-brand-soft);
  font-weight: 600;
  color: var(--vp-c-brand);
}

.ref-row span:first-child {
  font-family: monospace;
}

.info-box {
  background: var(--vp-c-bg-alt);
  padding: 0.75rem;
  border-radius: 6px;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  margin-top: 0.75rem;
  display: flex;
  gap: 0.25rem;
}

.info-box .icon { flex-shrink: 0; }

@media (max-width: 768px) {
  .split-view {
    grid-template-columns: 1fr;
  }
}
</style>
