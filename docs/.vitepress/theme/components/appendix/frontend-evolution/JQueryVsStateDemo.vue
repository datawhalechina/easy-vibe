<!--
  JQueryVsStateDemo.vue
  jQuery vs 数据驱动对比演示 - 重构版

  用途：
  用"餐厅服务员"的比喻，让零基础用户理解命令式 vs 声明式的区别。
  通过并排的交互式计数器，直观展示两种编程范式的差异。
-->
<template>
  <div class="jquery-state-demo">
    <div class="scenario-intro">
      <div class="emoji-scene">🍽️ 👨‍🍳 📝</div>
      <h4>餐厅服务员模拟器</h4>
      <p>想象一下你在餐厅当服务员，有两种工作方式，你会选哪种？</p>
    </div>

    <div class="comparison-container">
      <!-- 左边：jQuery 模式 -->
      <div class="side-panel jquery-panel">
        <div class="panel-header">
          <div class="mode-badge jquery">
            <span class="badge-icon">🏃</span>
            <span class="badge-text">跑腿王模式</span>
          </div>
          <div class="mode-subtitle">命令式（jQuery）</div>
        </div>

        <div class="scenario-visual">
          <div class="visual-label">后厨 → 吧台 → 收银台</div>
          <div class="runner-path">
            <div class="station kitchen" :class="{ active: jqActiveStation === 'kitchen' }">
              <span class="station-icon">🍳</span>
              <span class="station-name">后厨</span>
            </div>
            <div class="path-arrow" :class="{ active: jqActiveStation === 'bar' }">→</div>
            <div class="station bar" :class="{ active: jqActiveStation === 'bar' }">
              <span class="station-icon">🥤</span>
              <span class="station-name">吧台</span>
            </div>
            <div class="path-arrow" :class="{ active: jqActiveStation === 'cashier' }">→</div>
            <div class="station cashier" :class="{ active: jqActiveStation === 'cashier' }">
              <span class="station-icon">💰</span>
              <span class="station-name">收银</span>
            </div>
          </div>
        </div>

        <div class="demo-counter">
          <div class="counter-display">
            <div class="display-label">当前计数</div>
            <div class="display-value">{{ jqCount }}</div>
          </div>

          <div class="counter-controls">
            <button class="ctrl-btn decrement" @click="updateJq(-1)" :disabled="jqCount <= 0">
              <span class="btn-icon">➖</span>
              <span class="btn-label">减 1</span>
            </button>
            <button class="ctrl-btn increment" @click="updateJq(1)">
              <span class="btn-icon">➕</span>
              <span class="btn-label">加 1</span>
            </button>
          </div>

          <div class="status-bars">
            <div class="status-item">
              <span class="status-label">进度条</span>
              <div class="progress-bar">
                <div class="progress-fill" :style="{ width: jqProgress + '%' }"></div>
              </div>
              <span class="status-value">{{ jqProgress }}%</span>
            </div>
            <div class="status-item">
              <span class="status-label">状态</span>
              <span class="status-badge" :class="jqStatusClass">{{ jqStatus }}</span>
            </div>
          </div>
        </div>

        <div class="code-snippet">
          <div class="snippet-header">
            <span class="snippet-title">💻 代码实现</span>
            <span class="snippet-lang">jQuery</span>
          </div>
          <pre class="snippet-code"><code>// 需要手动更新每个元素
function updateCounter(change) {
  var count = parseInt($('#counter').text());
  var newCount = count + change;

  // 更新计数显示
  $('#counter').text(newCount);

  // 更新进度条
  var progress = (newCount / 10) * 100;
  $('#progress').css('width', progress + '%');

  // 更新状态文字
  if (newCount > 5) {
    $('#status').text('高！').addClass('warning');
  } else {
    $('#status').text('正常').removeClass('warning');
  }

  // 如果忘了更新某个地方...
  // 界面就会不一致！😱
}</code></pre>
        </div>

        <div class="pain-points">
          <div class="pain-title">😫 痛点</div>
          <ul class="pain-list">
            <li>每次都要亲自跑三个地方更新</li>
            <li>漏改一个地方，界面就不一致</li>
            <li>代码分散，难以维护</li>
            <li>累得半死，还容易出错</li>
          </ul>
        </div>
      </div>

      <!-- VS 标识 -->
      <div class="vs-divider">
        <div class="vs-badge">VS</div>
      </div>

      <!-- 右边：Vue 模式 -->
      <div class="side-panel vue-panel">
        <div class="panel-header">
          <div class="mode-badge vue">
            <span class="badge-icon">👔</span>
            <span class="badge-text">指挥家模式</span>
          </div>
          <div class="mode-subtitle">声明式（Vue）</div>
        </div>

        <div class="scenario-visual">
          <div class="visual-label">我只管改单子，其他自动同步！</div>
          <div class="conductor-scene">
            <div class="conductor">🎩</div>
            <div class="orchestra">
              <div class="musician" :class="{ playing: vueCount > 0 }">
                <span class="musician-icon">🎸</span>
                <span class="musician-role">计数</span>
              </div>
              <div class="musician" :class="{ playing: vueProgress > 0 }">
                <span class="musician-icon">📊</span>
                <span class="musician-role">进度</span>
              </div>
              <div class="musician" :class="{ playing: vueCount > 5 }">
                <span class="musician-icon">🚦</span>
                <span class="musician-role">状态</span>
              </div>
            </div>
          </div>
        </div>

        <div class="demo-counter">
          <div class="counter-display">
            <div class="display-label">当前计数</div>
            <div class="display-value">{{ vueCount }}</div>
          </div>

          <div class="counter-controls">
            <button class="ctrl-btn decrement" @click="vueCount--" :disabled="vueCount <= 0">
              <span class="btn-icon">➖</span>
              <span class="btn-label">减 1</span>
            </button>
            <button class="ctrl-btn increment" @click="vueCount++">
              <span class="btn-icon">➕</span>
              <span class="btn-label">加 1</span>
            </button>
          </div>

          <div class="status-bars">
            <div class="status-item">
              <span class="status-label">进度条</span>
              <div class="progress-bar">
                <div class="progress-fill vue" :style="{ width: vueProgress + '%' }"></div>
              </div>
              <span class="status-value">{{ vueProgress }}%</span>
            </div>
            <div class="status-item">
              <span class="status-label">状态</span>
              <span class="status-badge" :class="vueStatusClass">{{ vueStatus }}</span>
            </div>
          </div>
        </div>

        <div class="code-snippet">
          <div class="snippet-header">
            <span class="snippet-title">💻 代码实现</span>
            <span class="snippet-lang">Vue</span>
          </div>
          <pre class="snippet-code"><code>// 只需要定义数据和规则
data() {
  return {
    count: 0
  }
},
computed: {
  // 进度自动计算
  progress() {
    return (this.count / 10) * 100;
  },
  // 状态自动判断
  status() {
    return this.count > 5 ? '高！' : '正常';
  },
  isWarning() {
    return this.count > 5;
  }
}

// 模板里只需要声明关系
&lt;template&gt;
  &lt;div class="status" :class="{ warning: isWarning }"&gt;
    {{ status }}
  &lt;/div&gt;
&lt;/template&gt;</code></pre>
        </div>

        <div class="benefits">
          <div class="benefit-title">✨ 优势</div>
          <ul class="benefit-list">
            <li>只需改数据，不用手动更新每个地方</li>
            <li>界面自动同步，永远保持一致</li>
            <li>代码结构清晰，容易维护</li>
            <li>轻松优雅，不易出错</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// jQuery 模式的状态
const jqCount = ref(0)
const jqActiveStation = ref('')

// Vue 模式的状态
const vueCount = ref(0)

// jQuery 计算属性
const jqProgress = computed(() => Math.min((jqCount.value / 10) * 100, 100))

const jqStatus = computed(() => {
  if (jqCount.value > 5) return '高！'
  if (jqCount.value > 0) return '正常'
  return '初始'
})

const jqStatusClass = computed(() => {
  if (jqCount.value > 5) return 'warning'
  if (jqCount.value > 0) return 'normal'
  return 'initial'
})

// Vue 计算属性
const vueProgress = computed(() => Math.min((vueCount.value / 10) * 100, 100))

const vueStatus = computed(() => {
  if (vueCount.value > 5) return '高！'
  if (vueCount.value > 0) return '正常'
  return '初始'
})

const vueStatusClass = computed(() => {
  if (vueCount.value > 5) return 'warning'
  if (vueCount.value > 0) return 'normal'
  return 'initial'
})

// jQuery 更新函数（模拟需要手动更新多个地方）
const updateJq = async (change) => {
  const newCount = jqCount.value + change
  if (newCount < 0) return

  // 模拟需要跑三个地方更新
  // 第一站：后厨（计数）
  jqActiveStation.value = 'kitchen'
  await sleep(300)
  jqCount.value = newCount

  // 第二站：吧台（进度条）
  jqActiveStation.value = 'bar'
  await sleep(300)

  // 第三站：收银台（状态）
  jqActiveStation.value = 'cashier'
  await sleep(300)

  jqActiveStation.value = ''
}

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms))
</script>

<style scoped>
.jquery-state-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: linear-gradient(135deg, var(--vp-c-bg-soft) 0%, var(--vp-c-bg) 100%);
  padding: 1.5rem;
  margin: 1rem 0;
}

.scenario-intro {
  text-align: center;
  margin-bottom: 1.5rem;
  padding: 1rem;
  background: linear-gradient(135deg, rgba(255, 183, 77, 0.2), rgba(255, 138, 101, 0.2));
  border-radius: 12px;
}

.emoji-scene {
  font-size: 3rem;
  margin-bottom: 0.5rem;
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.scenario-intro h4 {
  margin: 0.5rem 0;
  color: var(--vp-c-text-1);
  font-size: 1.2rem;
}

.scenario-intro p {
  margin: 0;
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
}

.comparison-container {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 1rem;
  align-items: stretch;
}

.side-panel {
  border: 2px solid var(--vp-c-divider);
  border-radius: 12px;
  overflow: hidden;
  background: var(--vp-c-bg);
  display: flex;
  flex-direction: column;
}

.jquery-panel {
  border-color: #ff7043;
}

.vue-panel {
  border-color: #42b883;
}

.panel-header {
  padding: 1rem;
  text-align: center;
  border-bottom: 1px solid var(--vp-c-divider);
}

.mode-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.mode-badge.jquery {
  background: linear-gradient(135deg, #ff7043, #f4511e);
  color: white;
}

.mode-badge.vue {
  background: linear-gradient(135deg, #42b883, #35495e);
  color: white;
}

.badge-icon {
  font-size: 1.25rem;
}

.mode-subtitle {
  font-size: 0.875rem;
  color: var(--vp-c-text-2);
}

.scenario-visual {
  padding: 1rem;
  background: var(--vp-c-bg-soft);
  border-bottom: 1px solid var(--vp-c-divider);
}

.visual-label {
  text-align: center;
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.5rem;
}

.runner-path {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.25rem;
}

.station {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.5rem;
  border-radius: 8px;
  background: #f5f5f5;
  transition: all 0.3s;
  min-width: 60px;
}

.station.active {
  background: #ff7043;
  color: white;
  transform: scale(1.1);
  box-shadow: 0 4px 12px rgba(255, 112, 67, 0.4);
}

.station-icon {
  font-size: 1.5rem;
}

.station-name {
  font-size: 0.625rem;
  margin-top: 0.25rem;
}

.path-arrow {
  font-size: 1.5rem;
  color: #ccc;
  transition: all 0.3s;
}

.path-arrow.active {
  color: #ff7043;
  transform: translateX(5px);
}

.conductor-scene {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.conductor {
  font-size: 3rem;
  animation: conduct 2s ease-in-out infinite;
}

@keyframes conduct {
  0%, 100% { transform: rotate(-10deg); }
  50% { transform: rotate(10deg); }
}

.orchestra {
  display: flex;
  gap: 0.5rem;
  justify-content: center;
}

.musician {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.5rem;
  background: #f5f5f5;
  border-radius: 8px;
  transition: all 0.3s;
  min-width: 60px;
}

.musician.playing {
  background: #42b883;
  color: white;
  transform: scale(1.1);
  box-shadow: 0 4px 12px rgba(66, 184, 131, 0.4);
}

.musician-icon {
  font-size: 1.5rem;
}

.musician-role {
  font-size: 0.625rem;
  margin-top: 0.25rem;
}

.demo-counter {
  padding: 1rem;
  flex: 1;
}

.counter-display {
  text-align: center;
  margin-bottom: 1rem;
}

.display-label {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.25rem;
}

.display-value {
  font-size: 3rem;
  font-weight: 700;
  color: var(--vp-c-brand);
  line-height: 1;
}

.counter-controls {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.ctrl-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  padding: 0.75rem;
  border: none;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.ctrl-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.jquery-panel .ctrl-btn.decrement {
  background: #ffccbc;
  color: #bf360c;
}

.jquery-panel .ctrl-btn.increment {
  background: #ff7043;
  color: white;
}

.vue-panel .ctrl-btn.decrement {
  background: #c8e6c9;
  color: #2e7d32;
}

.vue-panel .ctrl-btn.increment {
  background: #42b883;
  color: white;
}

.ctrl-btn:not(:disabled):hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.btn-icon {
  font-size: 1rem;
}

.status-bars {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.status-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.status-label {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  min-width: 50px;
}

.progress-bar {
  flex: 1;
  height: 8px;
  background: #e0e0e0;
  border-radius: 4px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  border-radius: 4px;
  transition: width 0.3s ease;
}

.jquery-panel .progress-fill {
  background: linear-gradient(90deg, #ff7043, #f4511e);
}

.vue-panel .progress-fill {
  background: linear-gradient(90deg, #42b883, #35495e);
}

.status-value {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  min-width: 35px;
  text-align: right;
}

.status-badge {
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 600;
}

.status-badge.initial {
  background: #f5f5f5;
  color: #999;
}

.status-badge.normal {
  background: #c8e6c9;
  color: #2e7d32;
}

.status-badge.warning {
  background: #ffccbc;
  color: #bf360c;
}

.code-snippet {
  margin: 1rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  overflow: hidden;
}

.snippet-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0.75rem;
  background: var(--vp-c-bg-alt);
  border-bottom: 1px solid var(--vp-c-divider);
}

.snippet-title {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--vp-c-text-1);
}

.snippet-lang {
  font-size: 0.75rem;
  padding: 0.125rem 0.5rem;
  border-radius: 4px;
  font-weight: 600;
}

.jquery-panel .snippet-lang {
  background: #ff7043;
  color: white;
}

.vue-panel .snippet-lang {
  background: #42b883;
  color: white;
}

.snippet-code {
  margin: 0;
  padding: 0.75rem;
  background: #1e1e2e;
  color: #a6accd;
  font-size: 0.75rem;
  line-height: 1.5;
  overflow-x: auto;
}

.pain-points,
.benefits {
  margin: 1rem;
  padding: 1rem;
  border-radius: 8px;
}

.pain-points {
  background: #fff3e0;
  border-left: 4px solid #ff7043;
}

.benefits {
  background: #e8f5e9;
  border-left: 4px solid #42b883;
}

.pain-title,
.benefit-title {
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.pain-title {
  color: #e65100;
}

.benefit-title {
  color: #2e7d32;
}

.pain-list,
.benefit-list {
  margin: 0;
  padding-left: 1.25rem;
  font-size: 0.875rem;
  line-height: 1.6;
}

.pain-list li {
  color: #bf360c;
  margin-bottom: 0.25rem;
}

.benefit-list li {
  color: #1b5e20;
  margin-bottom: 0.25rem;
}

.vs-divider {
  display: flex;
  align-items: center;
  justify-content: center;
}

.vs-badge {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1rem;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
}

@media (max-width: 1024px) {
  .comparison-container {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .vs-divider {
    order: -1;
  }

  .vs-badge {
    width: 40px;
    height: 40px;
    font-size: 0.875rem;
  }
}

@media (max-width: 640px) {
  .runner-path,
  .orchestra {
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .counter-controls {
    flex-direction: column;
  }

  .status-item {
    flex-wrap: wrap;
  }
}
</style>
