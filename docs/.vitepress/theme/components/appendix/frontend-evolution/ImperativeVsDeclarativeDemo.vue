<!--
  ImperativeVsDeclarativeDemo.vue
  命令式 vs 声明式编程对比演示

  用途：
  通过并排的交互式计数器，直观展示 Imperative（jQuery）和 Declarative（Vue）
  在代码量和心智负担上的差异。

  交互功能：
  - 两个可交互的计数器。
  - 切换展示背后的代码实现。
  - 高亮显示 jQuery 需要手动更新的多个 DOM 节点 vs Vue 的自动绑定。
-->
<template>
  <div class="imperative-declarative-demo">
    <div class="demo-header">
      <div class="toggle-group">
        <button
          v-for="view in views"
          :key="view.id"
          :class="['toggle-btn', { active: currentView === view.id }]"
          @click="currentView = view.id"
        >
          {{ view.label }}
        </button>
      </div>
    </div>

    <div class="comparison-container">
      <!-- Imperative Side (jQuery) -->
      <div class="side imperative-side">
        <div class="side-header">
          <span class="badge imperative">jQuery / Imperative</span>
          <h4>"Tell me HOW"</h4>
        </div>

        <div class="demo-area">
          <!-- The UI -->
          <div class="counter-ui">
            <div class="display-value" id="jq-display">{{ jqCount }}</div>
            <div class="meters">
              <div class="meter-label">Progress:</div>
              <div class="meter-bar">
                <div
                  class="meter-fill"
                  id="jq-meter"
                  :style="{ width: jqProgress + '%' }"
                ></div>
              </div>
              <div class="status-text" id="jq-status">
                {{ jqStatus }}
              </div>
            </div>
            <div class="controls">
              <button class="btn-decrement" @click="updateJq(-1)">-</button>
              <button class="btn-increment" @click="updateJq(1)">+</button>
            </div>
          </div>

          <!-- The Code -->
          <div v-show="currentView === 'code'" class="code-panel">
            <div class="code-block imperative-code">
              <pre><code>function updateCounter(change) {
  // 1. Get current value
  var count = parseInt($('#counter').text());

  // 2. Calculate new value
  var newCount = count + change;

  // 3. Update DOM element 1
  $('#counter').text(newCount);

  // 4. Update DOM element 2
  var progress = (newCount / 10) * 100;
  $('#progress-bar').css('width', progress + '%');

  // 5. Update DOM element 3
  if (newCount > 5) {
    $('#status').text('High!').addClass('warning');
  } else {
    $('#status').text('Normal').removeClass('warning');
  }

  // 6. Update DOM element 4...
  // Oops! Forgot to update the color indicator!
}</code></pre>
            </div>
          </div>
        </div>

        <div class="pain-points" v-if="showAnalysis">
          <div class="pain-point">
            <span class="icon">⚠️</span>
            <span>需要手动操作多个 DOM 元素</span>
          </div>
          <div class="pain-point">
            <span class="icon">🐛</span>
            <span>容易遗漏更新，导致界面不一致</span>
          </div>
          <div class="pain-point">
            <span class="icon">🍝</span>
            <span>逻辑分散，代码难以维护</span>
          </div>
        </div>
      </div>

      <!-- VS Divider -->
      <div class="vs-divider">
        <div class="vs-badge">VS</div>
      </div>

      <!-- Declarative Side (Vue) -->
      <div class="side declarative-side">
        <div class="side-header">
          <span class="badge declarative">Vue / Declarative</span>
          <h4>"Tell me WHAT"</h4>
        </div>

        <div class="demo-area">
          <!-- The UI -->
          <div class="counter-ui">
            <div class="display-value">{{ vueCount }}</div>
            <div class="meters">
              <div class="meter-label">Progress:</div>
              <div class="meter-bar">
                <div
                  class="meter-fill"
                  :style="{ width: vueProgress + '%' }"
                ></div>
              </div>
              <div class="status-text" :class="{ warning: vueCount > 5 }">
                {{ vueStatus }}
              </div>
            </div>
            <div class="controls">
              <button class="btn-decrement" @click="vueCount--">-</button>
              <button class="btn-increment" @click="vueCount++">+</button>
            </div>
          </div>

          <!-- The Code -->
          <div v-show="currentView === 'code'" class="code-panel">
            <div class="code-block declarative-code">
              <pre><code>export default {
  data() {
    return {
      count: 0
    }
  },
  computed: {
    // Automatically updates when count changes
    progress() {
      return (this.count / 10) * 100;
    },
    status() {
      return this.count > 5 ? 'High!' : 'Normal';
    },
    isWarning() {
      return this.count > 5;
    }
  }
}

// Template - just declare what the UI should look like
&lt;template&gt;
  &lt;div class="status" :class="{ warning: isWarning }"&gt;
    {{ status }}
  &lt;/div&gt;
&lt;/template&gt;</code></pre>
            </div>
          </div>
        </div>

        <div class="benefits" v-if="showAnalysis">
          <div class="benefit">
            <span class="icon">✅</span>
            <span>只关注数据，不用手动操作 DOM</span>
          </div>
          <div class="benefit">
            <span class="icon">🔄</span>
            <span>数据变化自动同步到所有相关视图</span>
          </div>
          <div class="benefit">
            <span class="icon">🧩</span>
            <span>代码结构清晰，易于维护</span>
          </div>
        </div>
      </div>
    </div>

    <div class="demo-controls">
      <button class="toggle-btn" @click="showAnalysis = !showAnalysis">
        {{ showAnalysis ? '隐藏' : '显示' }}对比分析
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const currentView = ref('ui')
const showAnalysis = ref(false)
const jqCount = ref(0)
const vueCount = ref(0)

const views = [
  { id: 'ui', label: '仅显示界面' },
  { id: 'code', label: '显示代码' }
]

const jqProgress = computed(() => Math.min((jqCount.value / 10) * 100, 100))
const vueProgress = computed(() => Math.min((vueCount.value / 10) * 100, 100))

const jqStatus = computed(() => (jqCount.value > 5 ? 'High!' : 'Normal'))
const vueStatus = computed(() => (vueCount.value > 5 ? 'High!' : 'Normal'))

function updateJq(change) {
  jqCount.value += change
}
</script>

<style scoped>
.imperative-declarative-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background-color: var(--vp-c-bg-soft);
  padding: 1.5rem;
  margin: 1rem 0;
}

.demo-header {
  margin-bottom: 1.5rem;
}

.toggle-group {
  display: flex;
  gap: 0.5rem;
  justify-content: center;
}

.toggle-btn {
  padding: 0.5rem 1rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background-color: var(--vp-c-bg);
  color: var(--vp-c-text-2);
  cursor: pointer;
  font-size: 0.875rem;
  transition: all 0.2s;
}

.toggle-btn:hover {
  border-color: var(--vp-c-brand);
}

.toggle-btn.active {
  background-color: var(--vp-c-brand);
  color: white;
  border-color: var(--vp-c-brand);
}

.comparison-container {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 1.5rem;
  align-items: stretch;
}

.side {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.side-header {
  text-align: center;
}

.badge {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
}

.badge.imperative {
  background-color: rgba(7, 105, 173, 0.2);
  color: #0769ad;
}

.badge.declarative {
  background-color: rgba(66, 184, 131, 0.2);
  color: #2c8a5e;
}

.side-header h4 {
  margin: 0.5rem 0 0;
  font-size: 1rem;
  color: var(--vp-c-text-1);
}

.demo-area {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.counter-ui {
  background-color: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.display-value {
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  color: var(--vp-c-brand);
}

.meters {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.meter-label {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
}

.meter-bar {
  height: 8px;
  background-color: var(--vp-c-bg-alt);
  border-radius: 4px;
  overflow: hidden;
}

.meter-fill {
  height: 100%;
  background-color: var(--vp-c-brand);
  transition: width 0.3s ease;
}

.status-text {
  font-size: 0.75rem;
  text-align: center;
  color: var(--vp-c-text-2);
}

.status-text.warning {
  color: #f87171;
  font-weight: 600;
}

.controls {
  display: flex;
  gap: 0.5rem;
  justify-content: center;
}

.controls button {
  width: 36px;
  height: 36px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background-color: var(--vp-c-bg);
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.2s;
}

.controls button:hover:not(:disabled) {
  border-color: var(--vp-c-brand);
  color: var(--vp-c-brand);
}

.controls button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.code-panel {
  background-color: var(--vp-c-bg-alt);
  border-radius: 6px;
  overflow: hidden;
}

.code-block {
  margin: 0;
  padding: 0.75rem;
  overflow-x: auto;
}

.code-block pre {
  margin: 0;
  font-size: 0.75rem;
  line-height: 1.5;
}

.imperative-code {
  background-color: #1e1e2e;
  color: #a6accd;
}

.imperative-code code {
  font-family: 'Fira Code', 'Menlo', monospace;
}

.declarative-code {
  background-color: #1e1e2e;
  color: #a6accd;
}

.declarative-code code {
  font-family: 'Fira Code', 'Menlo', monospace;
}

.vs-divider {
  display: flex;
  align-items: center;
  justify-content: center;
}

.vs-badge {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, #0769ad, #42b883);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 0.875rem;
}

.pain-points,
.benefits {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.pain-point,
.benefit {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
  font-size: 0.8125rem;
}

.pain-point {
  background-color: rgba(248, 113, 113, 0.1);
  color: #dc2626;
}

.benefit {
  background-color: rgba(74, 222, 128, 0.1);
  color: #16a34a;
}

.demo-controls {
  display: flex;
  justify-content: center;
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--vp-c-divider);
}

@media (max-width: 768px) {
  .comparison-container {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .vs-divider {
    display: none;
  }
}
</style>
