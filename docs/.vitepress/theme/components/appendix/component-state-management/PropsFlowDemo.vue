<template>
  <div class="props-flow-demo">
    <div class="demo-header">
      <h4>Props 数据流演示</h4>
      <p class="hint">观察父组件如何通过 props 向子组件传递数据，以及子组件如何通过事件向父组件通信</p>
    </div>

    <div class="flow-container">
      <!-- 父组件可视化 -->
      <div class="parent-component">
        <div class="component-header">
          <span class="tag">Parent.vue</span>
          <span class="badge blue">数据持有者</span>
        </div>

        <div class="data-box">
          <div class="data-title">data() {</div>
          <div class="data-item" :class="{ changed: hasChanged }">
            <span class="key">user:</span>
            <span class="value">{ name: '{{ userName }}', age: {{ userAge }} }</span>
          </div>
          <div class="data-item">
            <span class="key">theme:</span>
            <span class="value">'{{ theme }}'</span>
          </div>
          <div class="data-title">}</div>
        </div>

        <div class="props-config">
          <div class="config-title">传递给子组件的 Props:</div>
          <div class="prop-tag" v-for="prop in activeProps" :key="prop">
            :{{ prop }}="{{ prop }}"
          </div>
        </div>
      </div>

      <!-- 流动动画 -->
      <div class="flow-animation">
        <div class="flow-line" :class="{ active: isFlowing }">
          <div class="flow-particles" v-if="isFlowing">
            <span v-for="i in 5" :key="i" class="particle">●</span>
          </div>
        </div>
        <div class="flow-label" :class="{ active: isFlowing }">
          {{ isFlowing ? '传递 Props' : '等待交互' }}
        </div>
      </div>

      <!-- 子组件可视化 -->
      <div class="child-component">
        <div class="component-header">
          <span class="tag">Child.vue</span>
          <span class="badge green">数据展示</span>
        </div>

        <div class="props-box">
          <div class="props-title">props: {</div>
          <div class="prop-item" v-for="prop in activeProps" :key="prop" :class="{ receiving: isFlowing }">
            <span class="prop-name">{{ prop }}</span>
            <span class="prop-type">{ type: {{ getPropType(prop) }} }</span>
          </div>
          <div class="props-title">}</div>
        </div>

        <div class="render-preview">
          <div class="preview-title">渲染预览:</div>
          <div class="preview-content">
            <div class="user-card">
              <div class="avatar">👤</div>
              <div class="user-info">
                <div class="user-name">{{ userName || '未知用户' }}</div>
                <div class="user-meta">
                  <span class="age">{{ userAge }}岁</span>
                  <span class="theme-badge" :class="theme">{{ theme }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="emit-section">
          <div class="emit-title">向父组件通信:</div>
          <button class="emit-btn" @click="emitUpdate">$emit('update', { name: '王五' })</button>
        </div>
      </div>
    </div>

    <div class="interaction-panel">
      <div class="panel-title">🎮 交互控制台</div>
      <div class="control-group">
        <label>修改父组件数据:</label>
        <input v-model="userName" placeholder="用户名" @input="triggerFlow" />
        <input v-model.number="userAge" type="number" placeholder="年龄" @input="triggerFlow" />
        <select v-model="theme" @change="triggerFlow">
          <option value="light">Light 主题</option>
          <option value="dark">Dark 主题</option>
        </select>
      </div>
      <div class="control-group">
        <label>选择传递的 Props:</label>
        <label class="checkbox"><input type="checkbox" v-model="propSelection.user" /> user</label>
        <label class="checkbox"><input type="checkbox" v-model="propSelection.theme" /> theme</label>
      </div>
      <div class="flow-status" :class="{ active: isFlowing }">
        {{ isFlowing ? '⬇️ 数据正在流动...' : '⏸️ 等待数据变化' }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

// 父组件数据
const userName = ref('张三')
const userAge = ref(25)
const theme = ref('light')
const hasChanged = ref(false)

// Props 选择
const propSelection = ref({
  user: true,
  theme: true
})

const activeProps = computed(() => {
  return Object.entries(propSelection.value)
    .filter(([, v]) => v)
    .map(([k]) => k)
})

// 流动动画控制
const isFlowing = ref(false)
let flowTimeout = null

const triggerFlow = () => {
  hasChanged.value = true
  isFlowing.value = true
  clearTimeout(flowTimeout)
  flowTimeout = setTimeout(() => {
    isFlowing.value = false
    hasChanged.value = false
  }, 1500)
}

// 监听数据变化
watch([userName, userAge, theme], () => {
  triggerFlow()
}, { deep: true })

const getPropType = (prop) => {
  const types = {
    user: 'Object',
    theme: 'String'
  }
  return types[prop] || 'Any'
}

const emitUpdate = () => {
  userName.value = '王五'
  triggerFlow()
}
</script>

<style scoped>
.props-flow-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 20px;
  background: var(--vp-c-bg-soft);
}

.demo-header {
  margin-bottom: 20px;
}

.demo-header h4 {
  margin: 0 0 8px 0;
  color: var(--vp-c-text-1);
}

.hint {
  margin: 0;
  font-size: 14px;
  color: var(--vp-c-text-2);
}

.flow-container {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 16px;
  margin-bottom: 20px;
}

@media (max-width: 968px) {
  .flow-container {
    grid-template-columns: 1fr;
  }

  .flow-animation {
    flex-direction: row !important;
    padding: 12px !important;
  }

  .flow-line {
    width: 100% !important;
    height: 2px !important;
  }
}

.parent-component,
.child-component {
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 16px;
}

.component-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
  padding-bottom: 8px;
  border-bottom: 1px solid var(--vp-c-divider);
}

.tag {
  font-family: monospace;
  font-size: 13px;
  padding: 4px 8px;
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand);
  border-radius: 4px;
}

.badge {
  font-size: 11px;
  padding: 2px 6px;
  border-radius: 10px;
}

.badge.blue {
  background: #dbeafe;
  color: #1e40af;
}

.badge.green {
  background: #dcfce7;
  color: #166534;
}

.data-box,
.props-box {
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  padding: 12px;
  margin-bottom: 12px;
  font-family: monospace;
  font-size: 13px;
}

.data-title,
.props-title {
  color: var(--vp-c-text-3);
  margin-bottom: 4px;
}

.data-item,
.prop-item {
  padding: 4px 8px;
  margin: 2px 0;
  border-radius: 3px;
  transition: all 0.3s ease;
}

.data-item.changed {
  background: #fef3c7;
  animation: pulse 0.5s ease;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.02); }
}

.data-item .key {
  color: var(--vp-c-brand);
}

.data-item .value {
  color: var(--vp-c-text-2);
}

.prop-item.receiving {
  background: #dcfce7;
  animation: receive 0.5s ease;
}

@keyframes receive {
  0% { transform: translateX(-10px); opacity: 0.5; }
  100% { transform: translateX(0); opacity: 1; }
}

.prop-name {
  color: var(--vp-c-brand);
}

.prop-type {
  color: var(--vp-c-text-3);
  font-size: 11px;
  margin-left: 8px;
}

.props-config {
  margin-bottom: 12px;
}

.config-title {
  font-size: 12px;
  color: var(--vp-c-text-2);
  margin-bottom: 6px;
}

.prop-tag {
  display: inline-block;
  font-family: monospace;
  font-size: 12px;
  padding: 4px 8px;
  margin: 2px;
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand);
  border-radius: 4px;
}

.flow-animation {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.flow-line {
  width: 2px;
  height: 80px;
  background: var(--vp-c-divider);
  position: relative;
  transition: all 0.3s ease;
}

.flow-line.active {
  background: var(--vp-c-brand);
  box-shadow: 0 0 10px var(--vp-c-brand);
}

.flow-particles {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.particle {
  color: var(--vp-c-brand);
  font-size: 8px;
  animation: flowDown 1s linear infinite;
  opacity: 0;
}

.particle:nth-child(1) { animation-delay: 0s; }
.particle:nth-child(2) { animation-delay: 0.2s; }
.particle:nth-child(3) { animation-delay: 0.4s; }
.particle:nth-child(4) { animation-delay: 0.6s; }
.particle:nth-child(5) { animation-delay: 0.8s; }

@keyframes flowDown {
  0% {
    opacity: 0;
    transform: translateY(0);
  }
  20% {
    opacity: 1;
  }
  80% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: translateY(60px);
  }
}

.flow-label {
  margin-top: 12px;
  font-size: 13px;
  color: var(--vp-c-text-3);
  text-align: center;
  transition: all 0.3s ease;
}

.flow-label.active {
  color: var(--vp-c-brand);
  font-weight: 600;
}

.render-preview {
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  padding: 12px;
  margin-bottom: 12px;
}

.preview-title {
  font-size: 12px;
  color: var(--vp-c-text-3);
  margin-bottom: 8px;
}

.preview-content {
  background: var(--vp-c-bg);
  border-radius: 4px;
  padding: 12px;
}

.user-card {
  display: flex;
  align-items: center;
  gap: 12px;
}

.avatar {
  font-size: 32px;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--vp-c-brand-soft);
  border-radius: 50%;
}

.user-info {
  flex: 1;
}

.user-name {
  font-weight: 600;
  color: var(--vp-c-text-1);
  font-size: 14px;
}

.user-meta {
  display: flex;
  gap: 8px;
  margin-top: 4px;
  font-size: 12px;
}

.age {
  color: var(--vp-c-text-2);
}

.theme-badge {
  padding: 2px 6px;
  border-radius: 3px;
  font-size: 11px;
  text-transform: uppercase;
}

.theme-badge.light {
  background: #fef3c7;
  color: #92400e;
}

.theme-badge.dark {
  background: #374151;
  color: #f3f4f6;
}

.emit-section {
  padding: 12px;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
}

.emit-title {
  font-size: 12px;
  color: var(--vp-c-text-3);
  margin-bottom: 8px;
}

.emit-btn {
  width: 100%;
  padding: 8px 12px;
  background: var(--vp-c-brand);
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 13px;
  font-family: monospace;
  cursor: pointer;
  transition: all 0.2s ease;
}

.emit-btn:hover {
  background: var(--vp-c-brand-dark);
  transform: translateY(-1px);
}

.interaction-panel {
  margin-top: 20px;
  padding: 16px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
}

.panel-title {
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 12px;
  font-size: 14px;
}

.control-group {
  margin-bottom: 16px;
}

.control-group label {
  display: block;
  font-size: 13px;
  color: var(--vp-c-text-2);
  margin-bottom: 8px;
}

.control-group input,
.control-group select {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  font-size: 14px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  margin-bottom: 8px;
}

.control-group input:focus,
.control-group select:focus {
  outline: none;
  border-color: var(--vp-c-brand);
}

.checkbox {
  display: inline-flex !important;
  align-items: center;
  gap: 6px;
  margin-right: 16px;
  cursor: pointer;
}

.checkbox input {
  width: auto !important;
  margin: 0 !important;
}

.flow-status {
  padding: 10px 16px;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  text-align: center;
  font-size: 14px;
  color: var(--vp-c-text-2);
  transition: all 0.3s ease;
}

.flow-status.active {
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand);
  font-weight: 600;
}
</style>
