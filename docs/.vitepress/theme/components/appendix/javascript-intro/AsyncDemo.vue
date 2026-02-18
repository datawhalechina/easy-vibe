<template>
  <div class="async-demo">
    <div class="demo-header">
      <span class="icon">⏳</span>
      <span class="title">异步编程</span>
      <span class="subtitle">Promise、async/await 与事件循环</span>
    </div>

    <div class="intro-text">
      想象你在<span class="highlight">餐厅点餐</span>：
      <span class="highlight">同步</span>是点完菜后一直等，什么都不能做；
      <span class="highlight">异步</span>是点完菜拿到个<span class="highlight">取餐器</span>，
      可以先玩手机，取餐器响了再去取——这就是 JavaScript 异步编程的核心思想
    </div>

    <div class="demo-tabs">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        class="tab-btn"
        :class="{ active: activeTab === tab.id }"
        @click="activeTab = tab.id"
      >
        {{ tab.label }}
      </button>
    </div>

    <!-- 回调函数 -->
    <div
      v-if="activeTab === 'callback'"
      class="tab-content"
    >
      <div class="callback-demo">
        <div class="concept-card">
          <div class="concept-icon">
            🔄
          </div>
          <div class="concept-title">
            回调函数 (Callback)
          </div>
          <div class="concept-desc">
            把函数作为参数传给另一个函数，等操作完成后再调用它。这是最早的异步处理方式。
          </div>
        </div>

        <div class="code-example">
          <div class="code-title">
            回调函数示例
          </div>
          <div class="code-block">
            <div class="code-line comment">
              // 模拟异步操作（如网络请求）
            </div>
            <div class="code-line">
              function fetchData(callback) {
            </div>
            <div class="code-line indent">
              setTimeout(() => {
            </div>
            <div class="code-line indent indent">
              const data = { id: 1, name: "数据" }
            </div>
            <div class="code-line indent indent">
              callback(data)
            </div>
            <div class="code-line indent">
              }, 1000)
            </div>
            <div class="code-line">
              }
            </div>
            <div class="code-line" />
            <div class="code-line comment">
              // 使用回调
            </div>
            <div class="code-line">
              fetchData(function(data) {
            </div>
            <div class="code-line indent">
              console.log("收到数据:", data)
            </div>
            <div class="code-line">
              })
            </div>
          </div>
        </div>

        <div class="callback-problem">
          <div class="problem-title">
            ⚠️ 回调地狱问题
          </div>
          <div class="code-block bad">
            <div class="code-line">
              getData(function(a) {
            </div>
            <div class="code-line indent">
              getMoreData(a, function(b) {
            </div>
            <div class="code-line indent indent">
              getMoreData(b, function(c) {
            </div>
            <div class="code-line indent indent indent">
              getMoreData(c, function(d) {
            </div>
            <div class="code-line indent indent indent indent">
              // 无限嵌套...
            </div>
            <div class="code-line indent indent indent">
              })
            </div>
            <div class="code-line indent indent">
              })
            </div>
            <div class="code-line indent">
              })
            </div>
            <div class="code-line">
              })
            </div>
          </div>
          <div class="problem-desc">
            多个异步操作嵌套会导致代码难以维护，被称为"回调地狱"。
          </div>
        </div>
      </div>
    </div>

    <!-- Promise -->
    <div
      v-else-if="activeTab === 'promise'"
      class="tab-content"
    >
      <div class="promise-demo">
        <div class="promise-states">
          <div class="state-title">
            Promise 的三种状态
          </div>
          <div class="states-diagram">
            <div
              class="state-box pending"
              :class="{ active: promiseState === 'pending' }"
            >
              <div class="state-name">
                Pending
              </div>
              <div class="state-desc">
                进行中
              </div>
            </div>
            <div
              v-if="promiseState === 'pending'"
              class="state-arrow"
            >
              ⏳
            </div>

            <div class="state-branch">
              <div class="branch-top">
                <div
                  class="state-box fulfilled"
                  :class="{ active: promiseState === 'fulfilled' }"
                >
                  <div class="state-name">
                    Fulfilled
                  </div>
                  <div class="state-desc">
                    已成功
                  </div>
                </div>
                <div
                  v-if="promiseState === 'fulfilled'"
                  class="state-arrow"
                >
                  ✅
                </div>
              </div>

              <div class="branch-bottom">
                <div
                  class="state-box rejected"
                  :class="{ active: promiseState === 'rejected' }"
                >
                  <div class="state-name">
                    Rejected
                  </div>
                  <div class="state-desc">
                    已失败
                  </div>
                </div>
                <div
                  v-if="promiseState === 'rejected'"
                  class="state-arrow"
                >
                  ❌
                </div>
              </div>
            </div>
          </div>

          <div class="promise-actions">
            <button
              class="action-btn success"
              @click="simulatePromise('fulfilled')"
            >
              模拟成功
            </button>
            <button
              class="action-btn error"
              @click="simulatePromise('rejected')"
            >
              模拟失败
            </button>
          </div>
        </div>

        <div class="promise-usage">
          <div class="code-title">
            Promise 使用示例
          </div>
          <div class="code-block">
            <div class="code-line comment">
              // 创建 Promise
            </div>
            <div class="code-line">
              const promise = new Promise((resolve, reject) => {
            </div>
            <div class="code-line indent">
              const success = Math.random() > 0.5
            </div>
            <div class="code-line indent">
              if (success) {
            </div>
            <div class="code-line indent indent">
              resolve("操作成功！")
            </div>
            <div class="code-line indent">
              } else {
            </div>
            <div class="code-line indent indent">
              reject("操作失败！")
            </div>
            <div class="code-line indent">
              }
            </div>
            <div class="code-line">
              })
            </div>
            <div class="code-line" />
            <div class="code-line comment">
              // 使用 then/catch
            </div>
            <div class="code-line">
              promise
            </div>
            <div class="code-line indent">
              .then(result => console.log(result))
            </div>
            <div class="code-line indent">
              .catch(error => console.error(error))
            </div>
          </div>

          <div class="promise-chain">
            <div class="chain-title">
              链式调用
            </div>
            <div class="chain-visual">
              <div class="chain-step">
                <div class="step-box">
                  Promise
                </div>
                <div class="step-arrow">
                  →
                </div>
              </div>
              <div class="chain-step">
                <div class="step-box then">
                  .then()
                </div>
                <div class="step-arrow">
                  →
                </div>
              </div>
              <div class="chain-step">
                <div class="step-box then">
                  .then()
                </div>
                <div class="step-arrow">
                  →
                </div>
              </div>
              <div class="chain-step">
                <div class="step-box catch">
                  .catch()
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- async/await -->
    <div
      v-else-if="activeTab === 'async'"
      class="tab-content"
    >
      <div class="async-await-demo">
        <div class="comparison-view">
          <div class="compare-panel promise">
            <div class="panel-title">
              Promise 链式调用
            </div>
            <div class="code-block">
              <div class="code-line">
                function fetchUser() {
              </div>
              <div class="code-line indent">
                return fetch('/user')
              </div>
              <div class="code-line indent indent">
                .then(res => res.json())
              </div>
              <div class="code-line indent indent">
                .then(user => {
              </div>
              <div class="code-line indent indent indent">
                return fetch(`/posts/${user.id}`)
              </div>
              <div class="code-line indent indent">
                })
              </div>
              <div class="code-line indent indent">
                .then(res => res.json())
              </div>
              <div class="code-line indent indent">
                .then(posts => {
              </div>
              <div class="code-line indent indent indent">
                console.log(posts)
              </div>
              <div class="code-line indent indent">
                })
              </div>
              <div class="code-line">
                }
              </div>
            </div>
          </div>

          <div class="compare-panel async">
            <div class="panel-title">
              async/await 语法
            </div>
            <div class="code-block">
              <div class="code-line">
                async function fetchUser() {
              </div>
              <div class="code-line indent">
                try {
              </div>
              <div class="code-line indent indent">
                const res = await fetch('/user')
              </div>
              <div class="code-line indent indent">
                const user = await res.json()
              </div>
              <div class="code-line indent indent">
                const postRes = await fetch(`/posts/${user.id}`)
              </div>
              <div class="code-line indent indent">
                const posts = await postRes.json()
              </div>
              <div class="code-line indent indent">
                console.log(posts)
              </div>
              <div class="code-line indent">
                } catch (error) {
              </div>
              <div class="code-line indent indent">
                console.error(error)
              </div>
              <div class="code-line indent">
                }
              </div>
              <div class="code-line">
                }
              </div>
            </div>
          </div>
        </div>

        <div class="async-playground">
          <div class="playground-title">
            async/await 特点
          </div>
          <div class="feature-grid">
            <div class="feature-item">
              <div class="feature-icon">
                📖
              </div>
              <div class="feature-name">
                更像同步代码
              </div>
              <div class="feature-desc">
                用同步的方式写异步代码，更易读
              </div>
            </div>
            <div class="feature-item">
              <div class="feature-icon">
                🎯
              </div>
              <div class="feature-name">
                错误处理简单
              </div>
              <div class="feature-desc">
                用 try/catch 处理错误，而非 .catch()
              </div>
            </div>
            <div class="feature-item">
              <div class="feature-icon">
                ⚡
              </div>
              <div class="feature-name">
                调试友好
              </div>
              <div class="feature-desc">
                可以在 debugger 中设置断点
              </div>
            </div>
          </div>

          <div class="code-note">
            <strong>💡 记住：</strong>
            <ul>
              <li>async 函数总是返回 Promise</li>
              <li>await 只能在 async 函数内使用</li>
              <li>await 会暂停函数执行，直到 Promise 返回结果</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!-- 事件循环 -->
    <div
      v-else
      class="tab-content"
    >
      <div class="event-loop-demo">
        <div class="loop-visual">
          <div class="loop-title">
            事件循环 (Event Loop)
          </div>
          <div class="loop-diagram">
            <div class="diagram-section">
              <div class="section-title">
                调用栈 (Call Stack)
              </div>
              <div class="stack-box">
                <div
                  v-for="(item, i) in callStack"
                  :key="i"
                  class="stack-item"
                >
                  {{ item }}
                </div>
                <div
                  v-if="callStack.length === 0"
                  class="stack-empty"
                >
                  空
                </div>
              </div>
            </div>

            <div class="diagram-arrows">
              <div class="arrow-right">
                入栈 →
              </div>
              <div class="arrow-left">
                ← 出栈
              </div>
            </div>

            <div class="diagram-section">
              <div class="section-title">
                任务队列
              </div>
              <div class="task-queues">
                <div class="queue-box">
                  <div class="queue-title">
                    宏任务 (Macro Tasks)
                  </div>
                  <div class="queue-items">
                    <div
                      v-for="(task, i) in macroTasks"
                      :key="i"
                      class="task-item macro"
                    >
                      {{ task }}
                    </div>
                  </div>
                </div>
                <div class="queue-box">
                  <div class="queue-title">
                    微任务 (Micro Tasks)
                  </div>
                  <div class="queue-items">
                    <div
                      v-for="(task, i) in microTasks"
                      :key="i"
                      class="task-item micro"
                    >
                      {{ task }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="loop-rules">
            <div class="rule-title">
              执行规则
            </div>
            <ol class="rule-list">
              <li>执行同步代码（调用栈中的代码）</li>
              <li>调用栈为空时，先执行所有微任务</li>
              <li>微任务清空后，执行一个宏任务</li>
              <li>重复步骤 2-3</li>
            </ol>
          </div>
        </div>

        <div class="code-challenge">
          <div class="challenge-title">
            🤔 猜猜输出顺序
          </div>
          <div class="code-block">
            <div class="code-line">
              console.log("1")
            </div>
            <div class="code-line" />
            <div class="code-line">
              setTimeout(() => console.log("2"), 0) <span class="comment">// 宏任务</span>
            </div>
            <div class="code-line" />
            <div class="code-line">
              Promise.resolve().then(() => console.log("3")) <span class="comment">// 微任务</span>
            </div>
            <div class="code-line" />
            <div class="code-line">
              console.log("4")
            </div>
          </div>

          <button
            class="answer-btn"
            @click="showEventLoopAnswer"
          >
            {{ showAnswer ? '隐藏答案' : '查看答案' }}
          </button>

          <div
            v-if="showAnswer"
            class="answer-reveal"
          >
            <div class="output-order">
              <div class="order-item">
                <span class="order-num">1</span>
                <span class="order-output">"1"</span>
                <span class="order-reason">同步代码</span>
              </div>
              <div class="order-item">
                <span class="order-num">2</span>
                <span class="order-output">"4"</span>
                <span class="order-reason">同步代码</span>
              </div>
              <div class="order-item">
                <span class="order-num">3</span>
                <span class="order-output">"3"</span>
                <span class="order-reason">微任务（Promise.then）</span>
              </div>
              <div class="order-item">
                <span class="order-num">4</span>
                <span class="order-output">"2"</span>
                <span class="order-reason">宏任务（setTimeout）</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="info-box">
      <span class="icon">💡</span>
      <strong>核心思想：</strong>
      <span v-if="activeTab === 'callback'">回调函数是最基础的异步处理方式，但容易陷入"回调地狱"。现代 JavaScript 提供了 Promise 和 async/await 来更优雅地处理异步操作。</span>
      <span v-else-if="activeTab === 'promise'">Promise 是异步操作的容器，有三种状态：Pending（进行中）、Fulfilled（已成功）、Rejected（已失败）。一旦状态改变就不会再变。Promise 支持链式调用，避免了回调地狱。</span>
      <span v-else-if="activeTab === 'async'">async/await 是 Promise 的语法糖，让异步代码看起来像同步代码。async 函数返回 Promise，await 会暂停函数执行直到 Promise 返回结果。这是目前最推荐的异步编程方式。</span>
      <span v-else>事件循环是 JavaScript 的执行机制。JavaScript 是单线程的，通过事件循环实现异步。执行顺序：同步代码 → 所有微任务 → 一个宏任务 → 所有微任务 → 循环。理解这个顺序对于调试异步代码至关重要。</span>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const activeTab = ref('callback')
const promiseState = ref('pending')
const showAnswer = ref(false)

const callStack = ref(['main', 'console.log("1")'])
const macroTasks = ref(['setTimeout callback'])
const microTasks = ref(['Promise.then callback'])

const tabs = [
  { id: 'callback', label: '回调函数' },
  { id: 'promise', label: 'Promise' },
  { id: 'async', label: 'async/await' },
  { id: 'eventloop', label: '事件循环' }
]

const simulatePromise = (state) => {
  promiseState.value = state
  setTimeout(() => {
    promiseState.value = 'pending'
  }, 2000)
}

const showEventLoopAnswer = () => {
  showAnswer.value = !showAnswer.value
}
</script>

<style scoped>
.async-demo {
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

.demo-tabs {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
  border-bottom: 1px solid var(--vp-c-divider);
  padding-bottom: 0.5rem;
}

.tab-btn {
  background: transparent;
  border: none;
  padding: 0.5rem 1rem;
  cursor: pointer;
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
  border-radius: 6px;
  transition: all 0.2s;
}

.tab-btn:hover {
  background: var(--vp-c-bg-soft);
}

.tab-btn.active {
  background: var(--vp-c-brand);
  color: white;
}

.tab-content {
  min-height: 380px;
}

.callback-demo {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.concept-card {
  background: var(--vp-c-bg);
  border-radius: 8px;
  padding: 1rem;
  text-align: center;
}

.concept-icon {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.concept-title {
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: var(--vp-c-text-1);
}

.concept-desc {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
}

.code-example {
  background: #1e1e1e;
  border-radius: 6px;
  padding: 0.75rem;
  font-family: 'Monaco', 'Menlo', monospace;
  font-size: 0.75rem;
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

.code-line.indent.indent.indent {
  padding-left: 4.5rem;
}

.code-line.indent.indent.indent.indent {
  padding-left: 6rem;
}

.code-line .comment {
  color: #6a9955;
}

.callback-problem {
  background: var(--vp-c-bg-alt);
  border-radius: 6px;
  padding: 0.75rem;
}

.problem-title {
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 0.5rem;
  font-size: 0.85rem;
}

.code-block.bad {
  background: var(--vp-c-bg);
  padding: 0.5rem;
  border-radius: 4px;
  font-size: 0.7rem;
}

.problem-desc {
  margin-top: 0.5rem;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  line-height: 1.5;
}

.promise-demo {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.promise-states {
  background: var(--vp-c-bg);
  border-radius: 6px;
  padding: 0.75rem;
}

.state-title {
  font-weight: 600;
  margin-bottom: 0.75rem;
  color: var(--vp-c-text-1);
  font-size: 0.85rem;
}

.states-diagram {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.state-box {
  background: var(--vp-c-bg-soft);
  border: 2px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 0.75rem;
  text-align: center;
  transition: all 0.3s;
}

.state-box.active {
  transform: scale(1.05);
}

.state-box.pending {
  border-color: #ff9800;
}

.state-box.pending.active {
  background: #fff3e0;
}

.state-box.fulfilled {
  border-color: #4caf50;
}

.state-box.fulfilled.active {
  background: #e8f5e9;
}

.state-box.rejected {
  border-color: #f44336;
}

.state-box.rejected.active {
  background: #ffebee;
}

.state-name {
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 0.25rem;
}

.state-desc {
  font-size: 0.8rem;
  color: var(--vp-c-text-3);
}

.state-arrow {
  text-align: center;
  font-size: 1rem;
}

.state-branch {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
}

.branch-top, .branch-bottom {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.promise-actions {
  display: flex;
  gap: 0.5rem;
}

.action-btn {
  flex: 1;
  padding: 0.5rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.85rem;
  transition: opacity 0.2s;
}

.action-btn:hover {
  opacity: 0.9;
}

.action-btn.success {
  background: #4caf50;
  color: white;
}

.action-btn.error {
  background: #f44336;
  color: white;
}

.promise-usage {
  background: #1e1e1e;
  border-radius: 6px;
  padding: 0.75rem;
  font-family: 'Monaco', 'Menlo', monospace;
  font-size: 0.7rem;
  color: #d4d4d4;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.promise-chain {
  background: var(--vp-c-bg);
  border-radius: 4px;
  padding: 0.5rem;
}

.chain-title {
  font-weight: 600;
  margin-bottom: 0.5rem;
  font-size: 0.8rem;
  color: var(--vp-c-text-1);
}

.chain-visual {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.chain-step {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.step-box {
  background: var(--vp-c-brand-soft);
  border: 1px solid var(--vp-c-brand);
  padding: 0.3rem 0.5rem;
  border-radius: 4px;
  font-size: 0.75rem;
  font-family: monospace;
}

.step-box.then {
  background: #e8f5e9;
  border-color: #4caf50;
  color: #2e7d32;
}

.step-box.catch {
  background: #ffebee;
  border-color: #f44336;
  color: #c62828;
}

.step-arrow {
  color: var(--vp-c-text-3);
  font-size: 0.8rem;
}

.async-await-demo {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.comparison-view {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.compare-panel {
  background: #1e1e1e;
  border-radius: 6px;
  padding: 0.75rem;
  font-family: 'Monaco', 'Menlo', monospace;
  font-size: 0.7rem;
  color: #d4d4d4;
}

.compare-panel.async {
  border: 2px solid var(--vp-c-brand);
}

.panel-title {
  color: #888;
  font-size: 0.7rem;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
}

.async-playground {
  background: var(--vp-c-bg-alt);
  border-radius: 6px;
  padding: 0.75rem;
}

.playground-title {
  font-weight: 600;
  margin-bottom: 0.75rem;
  color: var(--vp-c-text-1);
  font-size: 0.85rem;
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.75rem;
  margin-bottom: 0.75rem;
}

.feature-item {
  background: var(--vp-c-bg);
  border-radius: 6px;
  padding: 0.75rem;
  text-align: center;
}

.feature-icon {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}

.feature-name {
  font-weight: 600;
  margin-bottom: 0.25rem;
  font-size: 0.85rem;
  color: var(--vp-c-text-1);
}

.feature-desc {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  line-height: 1.4;
}

.code-note {
  background: var(--vp-c-bg);
  border-radius: 4px;
  padding: 0.5rem;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

.code-note strong {
  color: var(--vp-c-brand);
}

.code-note ul {
  margin: 0.5rem 0 0 1.2rem;
  padding: 0;
  line-height: 1.5;
}

.event-loop-demo {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.loop-visual {
  background: var(--vp-c-bg);
  border-radius: 6px;
  padding: 0.75rem;
}

.loop-title {
  font-weight: 600;
  margin-bottom: 0.75rem;
  color: var(--vp-c-text-1);
  font-size: 0.85rem;
}

.loop-diagram {
  display: flex;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
}

.diagram-section {
  flex: 1;
}

.section-title {
  font-weight: 600;
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.5rem;
}

.stack-box {
  background: var(--vp-c-bg-soft);
  border: 2px solid var(--vp-c-divider);
  border-radius: 4px;
  padding: 0.5rem;
  min-height: 100px;
}

.stack-item {
  background: var(--vp-c-brand);
  color: white;
  padding: 0.3rem 0.5rem;
  border-radius: 3px;
  font-family: monospace;
  font-size: 0.75rem;
  margin-bottom: 0.25rem;
  text-align: center;
}

.stack-empty {
  color: var(--vp-c-text-3);
  text-align: center;
  font-size: 0.8rem;
  padding: 0.5rem;
}

.diagram-arrows {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.5rem;
}

.arrow-right, .arrow-left {
  font-size: 0.8rem;
  color: var(--vp-c-brand);
  text-align: center;
}

.task-queues {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.queue-box {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  padding: 0.5rem;
}

.queue-title {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
  margin-bottom: 0.25rem;
}

.queue-items {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.task-item {
  padding: 0.25rem 0.5rem;
  border-radius: 3px;
  font-family: monospace;
  font-size: 0.7rem;
}

.task-item.macro {
  background: #fff3e0;
  color: #e65100;
}

.task-item.micro {
  background: #e8f5e9;
  color: #2e7d32;
}

.loop-rules {
  background: var(--vp-c-bg-alt);
  border-radius: 4px;
  padding: 0.5rem;
}

.rule-title {
  font-weight: 600;
  font-size: 0.8rem;
  color: var(--vp-c-text-1);
  margin-bottom: 0.5rem;
}

.rule-list {
  margin: 0;
  padding-left: 1.2rem;
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  line-height: 1.5;
}

.code-challenge {
  background: #1e1e1e;
  border-radius: 6px;
  padding: 0.75rem;
  font-family: 'Monaco', 'Menlo', monospace;
  font-size: 0.75rem;
  color: #d4d4d4;
}

.challenge-title {
  color: #888;
  margin-bottom: 0.5rem;
}

.answer-btn {
  background: var(--vp-c-brand);
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  margin: 0.75rem 0;
  font-size: 0.85rem;
}

.answer-reveal {
  background: var(--vp-c-bg-alt);
  border-radius: 6px;
  padding: 0.75rem;
}

.output-order {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.order-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.order-num {
  background: var(--vp-c-brand);
  color: white;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 600;
}

.order-output {
  font-family: monospace;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.order-reason {
  font-size: 0.8rem;
  color: var(--vp-c-text-3);
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
  .promise-demo,
  .comparison-view,
  .event-loop-demo,
  .feature-grid {
    grid-template-columns: 1fr;
  }
}
</style>
