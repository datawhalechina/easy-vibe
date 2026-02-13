<template>
  <div class="props-flow-demo">
    <div class="demo-header">
      <span class="icon">📦</span>
      <span class="title">Props 数据传递</span>
      <span class="subtitle">父亲给儿子送礼物的单向流动</span>
    </div>

    <div class="intro-text">
      想象你在<span class="highlight">快递公司</span>工作：包裹（数据）只能从寄件人（父组件）发往收件人（子组件），收件人不能直接修改包裹内容，只能通过电话（事件）让寄件人修改。
    </div>

    <div class="demo-content">
      <div class="component-box parent">
        <div class="component-label">👨 父组件 (寄件人)</div>
        <div class="data-display">
          <div class="data-row">
            <span class="key">包裹内容:</span>
            <span class="value">{{ user.name }} ({{ user.age }}岁)</span>
          </div>
          <div class="data-row">
            <span class="key">包装颜色:</span>
            <span class="value" :class="theme">{{ theme === 'light' ? '亮色' : '暗色' }}</span>
          </div>
        </div>
        <div class="props-output">
          <span class="label">📮 发送包裹:</span>
          <div class="prop-tags">
            <span class="prop-tag">:user</span>
            <span class="prop-tag">:theme</span>
          </div>
        </div>
      </div>

      <div class="flow-arrow" :class="{ active: isFlowing }">
        <div class="arrow-body">▼</div>
        <div class="flow-text">{{ isFlowing ? '快递派送中...' : 'Props 单向传递' }}</div>
      </div>

      <div class="component-box child">
        <div class="component-label">👦 子组件 (收件人)</div>
        <div class="props-display">
          <div class="label">📬 接收包裹:</div>
          <div class="prop-item">
            <span class="prop-name">user</span>
            <span class="prop-value">{{ user.name }} ({{ user.age }}岁)</span>
          </div>
          <div class="prop-item">
            <span class="prop-name">theme</span>
            <span class="prop-value" :class="theme">{{ theme === 'light' ? '亮色' : '暗色' }}</span>
          </div>
        </div>
        <button class="emit-btn" @click="handleEmit">
          📞 打电话给爸爸改名字
        </button>
      </div>
    </div>

    <div class="interaction-area">
      <div class="control-group">
        <label>📝 修改包裹内容：</label>
        <input v-model="user.name" placeholder="收件人姓名" @input="triggerFlow" />
        <input v-model.number="user.age" type="number" placeholder="年龄" @input="triggerFlow" />
        <select v-model="theme" @change="triggerFlow">
          <option value="light">亮色包装</option>
          <option value="dark">暗色包装</option>
        </select>
      </div>
    </div>

    <div class="info-box">
      <span class="icon">💡</span>
      <strong>核心思想：</strong>Props 是单向数据流，父组件像寄件人，子组件像收件人。子组件不能直接修改 props，只能通过 emit 事件通知父组件修改。
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

const user = reactive({
  name: '小明',
  age: 25
})

const theme = ref('light')
const isFlowing = ref(false)

let flowTimeout = null

const triggerFlow = () => {
  isFlowing.value = true
  clearTimeout(flowTimeout)
  flowTimeout = setTimeout(() => {
    isFlowing.value = false
  }, 1000)
}

const handleEmit = () => {
  user.name = '小红'
  triggerFlow()
}
</script>

<style scoped>
.props-flow-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  padding: 1rem;
  margin: 1rem 0;
  max-height: 600px;
  overflow-y: auto;
}

.demo-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.demo-header .icon {
  font-size: 1.25rem;
}

.demo-header .title {
  font-weight: bold;
  font-size: 1rem;
}

.demo-header .subtitle {
  color: var(--vp-c-text-2);
  font-size: 0.85rem;
  margin-left: 0.5rem;
}

.intro-text {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  line-height: 1.6;
  margin-bottom: 1rem;
  padding: 0.75rem;
  background: var(--vp-c-bg);
  border-radius: 6px;
}

.intro-text .highlight {
  color: var(--vp-c-brand-1);
  font-weight: 500;
}

.demo-content {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.component-box {
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 0.75rem;
}

.component-label {
  font-weight: 600;
  color: var(--vp-c-brand);
  margin-bottom: 0.5rem;
  padding-bottom: 0.4rem;
  border-bottom: 1px solid var(--vp-c-divider);
  font-size: 0.85rem;
}

.data-display,
.props-display {
  margin-bottom: 0.5rem;
}

.data-row,
.prop-item {
  display: flex;
  gap: 0.5rem;
  padding: 0.2rem 0;
  font-family: monospace;
  font-size: 0.85rem;
}

.key,
.prop-name {
  color: var(--vp-c-brand);
  font-weight: 500;
}

.value,
.prop-value {
  color: var(--vp-c-text-2);
}

.value.light,
.prop-value.light {
  background: #fef3c7;
  padding: 2px 6px;
  border-radius: 3px;
}

.value.dark,
.prop-value.dark {
  background: #374151;
  color: #f3f4f6;
  padding: 2px 6px;
  border-radius: 3px;
}

.props-output {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
}

.prop-tags {
  display: flex;
  gap: 0.25rem;
}

.prop-tag {
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand);
  padding: 2px 8px;
  border-radius: 4px;
  font-family: monospace;
  font-size: 0.8rem;
}

.flow-arrow {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  padding: 0.4rem;
  transition: all 0.3s ease;
}

.flow-arrow.active {
  color: var(--vp-c-brand);
}

.arrow-body {
  font-size: 1.3rem;
  color: var(--vp-c-text-3);
  transition: all 0.3s ease;
}

.flow-arrow.active .arrow-body {
  color: var(--vp-c-brand);
  transform: scale(1.2);
}

.flow-text {
  font-size: 0.8rem;
  color: var(--vp-c-text-3);
}

.flow-arrow.active .flow-text {
  color: var(--vp-c-brand);
  font-weight: 600;
}

.emit-btn {
  width: 100%;
  padding: 0.5rem 1rem;
  background: var(--vp-c-brand);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.85rem;
  transition: all 0.2s ease;
}

.emit-btn:hover {
  opacity: 0.9;
  transform: translateY(-1px);
}

.interaction-area {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 0.75rem;
  margin-bottom: 0.75rem;
}

.control-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.control-group label {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  font-weight: 500;
}

.control-group input,
.control-group select {
  padding: 0.4rem 0.6rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font-size: 0.85rem;
}

.control-group input:focus,
.control-group select:focus {
  outline: none;
  border-color: var(--vp-c-brand);
}

.info-box {
  background: var(--vp-c-bg-alt);
  padding: 0.75rem;
  border-radius: 6px;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

.info-box .icon {
  margin-right: 0.25rem;
}
</style>
