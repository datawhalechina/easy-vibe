<!--
  HotReloadDemo.vue
  热更新机制演示

  用途：
  展示HMR（热模块替换）的工作原理。
-->
<template>
  <div class="hot-reload-demo">
    <div class="demo-header">
      <h3>🔥 热更新 (HMR) 演示</h3>
      <p>修改代码无需刷新页面，即时生效</p>
    </div>

    <div class="demo-content">
      <!-- 对比图 -->
      <div class="comparison">
        <div class="method-card no-hmr">
          <div class="card-header">
            <span class="icon">🔄</span>
            <span class="title">传统刷新</span>
          </div>
          <div class="card-body">
            <div class="step" v-for="(step, i) in noHmrSteps" :key="i">
              <span class="step-num">{{ i + 1 }}</span>
              <span class="step-text">{{ step }}</span>
            </div>
          </div>
          <div class="card-footer">
            <span class="time">⏱️ 5-10秒</span>
            <span class="state">页面闪烁、状态丢失</span>
          </div>
        </div>

        <div class="vs-divider">VS</div>

        <div class="method-card hmr">
          <div class="card-header">
            <span class="icon">⚡</span>
            <span class="title">HMR 热更新</span>
          </div>
          <div class="card-body">
            <div class="step" v-for="(step, i) in hmrSteps" :key="i">
              <span class="step-num">{{ i + 1 }}</span>
              <span class="step-text">{{ step }}</span>
            </div>
          </div>
          <div class="card-footer">
            <span class="time">⏱️ 50-200ms</span>
            <span class="state">无刷新、状态保持</span>
          </div>
        </div>
      </div>

      <!-- 流程图 -->
      <div class="flow-diagram">
        <h4>HMR 工作流程</h4>
        <div class="flow-steps">
          <div class="flow-step" v-for="(step, i) in flowSteps" :key="i">
            <div class="step-box">
              <span class="step-icon">{{ step.icon }}</span>
              <span class="step-label">{{ step.label }}</span>
            </div>
            <div v-if="i < flowSteps.length - 1" class="step-arrow">→</div>
          </div>
        </div>
      </div>

      <!-- 支持情况 -->
      <div class="support-table">
        <h4>各构建工具 HMR 支持</h4>
        <table>
          <thead>
            <tr>
              <th>构建工具</th>
              <th>HMR 支持</th>
              <th>更新速度</th>
              <th>特点</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="tool in hmrTools" :key="tool.name">
              <td><strong>{{ tool.name }}</strong></td>
              <td>
                <span class="badge" :class="tool.supportClass">{{ tool.support }}</span>
              </td>
              <td>{{ tool.speed }}</td>
              <td>{{ tool.feature }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="info-box">
      <p>
        <span class="icon">💡</span>
        <strong>HMR 的核心原理：</strong>
        构建工具通过 WebSocket 与浏览器保持连接。当文件修改后，工具编译变更模块，通过 WebSocket 通知浏览器。
        浏览器中的 HMR Runtime 接收更新，替换旧模块，同时保持应用状态不变。
        这就像是给飞行中的飞机换引擎——不停机就能完成更新。
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const noHmrSteps = [
  '修改代码并保存',
  '手动刷新浏览器',
  '页面重新加载所有资源',
  '应用状态重置（登录丢失）'
]

const hmrSteps = [
  '修改代码并保存',
  '构建工具检测变更并编译',
  'WebSocket 推送更新到浏览器',
  '局部替换模块，状态保持'
]

const flowSteps = [
  { icon: '👨‍💻', label: '开发者修改代码' },
  { icon: '🛠️', label: '构建工具编译' },
  { icon: '📡', label: 'WebSocket推送' },
  { icon: '🔄', label: '浏览器替换模块' },
  { icon: '✨', label: '页面即时更新' }
]

const hmrTools = [
  {
    name: 'Vite',
    support: '原生支持',
    supportClass: 'excellent',
    speed: '极快 (<100ms)',
    feature: '基于 ESM，HMR 速度最快'
  },
  {
    name: 'Webpack',
    support: '完全支持',
    supportClass: 'good',
    speed: '较快 (1-3s)',
    feature: '最成熟的 HMR 实现'
  },
  {
    name: 'Parcel',
    support: '自动支持',
    supportClass: 'good',
    speed: '快 (500ms-1s)',
    feature: '零配置，自动 HMR'
  },
  {
    name: 'Rollup',
    support: '插件支持',
    supportClass: 'fair',
    speed: '开发时较慢',
    feature: '主要用于生产构建'
  }
]
</script>

<style scoped>
.hot-reload-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background-color: var(--vp-c-bg-soft);
  padding: 1rem;
  margin: 1rem 0;
  font-family: var(--vp-font-family-mono);
}

.demo-header h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1.1rem;
}

.demo-header p {
  margin: 0;
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
}

.comparison {
  display: flex;
  gap: 1rem;
  margin: 1rem 0;
  align-items: stretch;
}

@media (max-width: 768px) {
  .comparison {
    flex-direction: column;
  }
}

.method-card {
  flex: 1;
  background: var(--vp-c-bg);
  border-radius: 8px;
  border: 2px solid var(--vp-c-divider);
  overflow: hidden;
}

.method-card.hmr {
  border-color: var(--vp-c-brand);
}

.card-header {
  background: var(--vp-c-bg-soft);
  padding: 0.6rem 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border-bottom: 1px solid var(--vp-c-divider);
}

.card-header .icon {
  font-size: 1.25rem;
}

.card-header .title {
  font-weight: 600;
  font-size: 0.9rem;
}

.card-body {
  padding: 0.75rem;
}

.step {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  padding: 0.4rem 0;
  font-size: 0.8rem;
  border-bottom: 1px solid var(--vp-c-divider-light);
}

.step:last-child {
  border-bottom: none;
}

.step-num {
  width: 18px;
  height: 18px;
  background: var(--vp-c-brand);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.65rem;
  font-weight: bold;
  flex-shrink: 0;
}

.step-text {
  color: var(--vp-c-text-1);
  line-height: 1.4;
}

.card-footer {
  background: var(--vp-c-bg-soft);
  padding: 0.5rem 0.75rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid var(--vp-c-divider);
  font-size: 0.75rem;
}

.time {
  font-weight: 600;
  color: var(--vp-c-brand);
}

.state {
  color: var(--vp-c-text-2);
}

.vs-divider {
  display: flex;
  align-items: center;
  font-weight: bold;
  color: var(--vp-c-text-3);
  font-size: 0.9rem;
}

.flow-diagram {
  background: var(--vp-c-bg);
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
  padding: 0.75rem;
  margin-bottom: 1rem;
}

.flow-diagram h4 {
  margin: 0 0 0.75rem 0;
  font-size: 0.9rem;
  color: var(--vp-c-text-1);
}

.flow-steps {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
}

.flow-step {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.step-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.4rem 0.5rem;
  background: var(--vp-c-bg-soft);
  border-radius: 4px;
  min-width: 60px;
}

.step-icon {
  font-size: 1.1rem;
}

.step-label {
  font-size: 0.65rem;
  color: var(--vp-c-text-2);
  text-align: center;
  margin-top: 0.1rem;
}

.step-arrow {
  color: var(--vp-c-brand);
  font-size: 1rem;
  font-weight: bold;
}

.support-table {
  background: var(--vp-c-bg);
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
  padding: 0.75rem;
  overflow-x: auto;
}

.support-table h4 {
  margin: 0 0 0.75rem 0;
  font-size: 0.9rem;
  color: var(--vp-c-text-1);
}

.support-table table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.8rem;
}

.support-table th,
.support-table td {
  padding: 0.5rem 0.6rem;
  text-align: left;
  border-bottom: 1px solid var(--vp-c-divider);
}

.support-table th {
  background: var(--vp-c-bg-soft);
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.badge {
  display: inline-block;
  padding: 0.15rem 0.4rem;
  border-radius: 3px;
  font-size: 0.7rem;
  font-weight: 500;
}

.badge.excellent {
  background: rgba(34, 197, 94, 0.2);
  color: #16a34a;
}

.badge.good {
  background: rgba(59, 130, 246, 0.2);
  color: #2563eb;
}

.badge.fair {
  background: rgba(245, 158, 11, 0.2);
  color: #d97706;
}

.info-box {
  background-color: var(--vp-c-bg-alt);
  padding: 0.75rem;
  border-radius: 6px;
  font-size: 0.85rem;
  line-height: 1.4;
  color: var(--vp-c-text-2);
  margin-top: 1rem;
}

.info-box .icon {
  margin-right: 0.5rem;
}

@media (max-width: 768px) {
  .flow-steps {
    flex-direction: column;
  }

  .flow-step {
    flex-direction: column;
  }

  .step-arrow {
    transform: rotate(90deg);
  }
}
</style>
