<template>
  <div class="deployment-dns-demo">
    <div class="demo-header">
      <span class="icon">🔍</span>
      <span class="title">DNS 解析流程</span>
      <span class="subtitle">域名是怎么变成 IP 地址的</span>
    </div>

    <div class="intro-text">
      想象你要给朋友打电话，但你只记得他的名字，不记得电话号。<strong>DNS</strong> 就像一个<strong>电话本</strong>，帮你把名字翻译成号码。
    </div>

    <div class="demo-content">
      <div class="dns-flow">
        <div class="flow-step" :class="{ active: currentStep >= 1 }">
          <div class="step-icon">💻</div>
          <div class="step-info">
            <div class="step-title">用户输入域名</div>
            <div class="step-desc">在浏览器输入 coffee.example.com</div>
          </div>
        </div>

        <div class="flow-arrow">→</div>

        <div class="flow-step" :class="{ active: currentStep >= 2 }">
          <div class="step-icon">📋</div>
          <div class="step-info">
            <div class="step-title">查询本地 DNS</div>
            <div class="step-desc">先查电脑的"电话本"（缓存）</div>
          </div>
        </div>

        <div class="flow-arrow">→</div>

        <div class="flow-step" :class="{ active: currentStep >= 3 }">
          <div class="step-icon">🌐</div>
          <div class="step-info">
            <div class="step-title">向上级 DNS 查询</div>
            <div class="step-desc">本地没有，问"上级电话局"</div>
          </div>
        </div>

        <div class="flow-arrow">→</div>

        <div class="flow-step" :class="{ active: currentStep >= 4 }">
          <div class="step-icon">🏠</div>
          <div class="step-info">
            <div class="step-title">返回 IP 地址</div>
            <div class="step-desc">找到了！123.45.67.89</div>
          </div>
        </div>
      </div>

      <div class="example-box">
        <div class="example-title">DNS 记录示例</div>
        <div class="record-list">
          <div class="record-item">
            <span class="record-type">A 记录</span>
            <span class="record-name">coffee.example.com</span>
            <span class="record-arrow">→</span>
            <span class="record-value">123.45.67.89</span>
          </div>
          <div class="record-item">
            <span class="record-type">CNAME</span>
            <span class="record-name">www.coffee.example.com</span>
            <span class="record-arrow">→</span>
            <span class="record-value">coffee.example.com</span>
          </div>
        </div>
      </div>

      <button @click="playAnimation" class="play-btn">
        {{ isPlaying ? '▶ 重新播放' : '▶ 播放动画' }}
      </button>
    </div>

    <div class="info-box">
      <span class="icon">💡</span>
      <strong>关键点：</strong>DNS 修改不是立即生效的，全球同步需要几分钟到几小时（受 TTL 影响）。
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const currentStep = ref(0)
const isPlaying = ref(false)

const playAnimation = () => {
  isPlaying.value = true
  currentStep.value = 0

  const steps = [1, 2, 3, 4]
  let delay = 0

  steps.forEach((step, index) => {
    delay += 800
    setTimeout(() => {
      currentStep.value = step
      if (index === steps.length - 1) {
        setTimeout(() => {
          isPlaying.value = false
        }, 1000)
      }
    }, delay)
  })
}
</script>

<style scoped>
.deployment-dns-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  padding: 1.5rem;
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

.intro-text strong {
  color: var(--vp-c-brand-1);
  font-weight: 500;
}

.demo-content {
  margin-bottom: 1rem;
}

.dns-flow {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  gap: 0.5rem;
}

.flow-step {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.75rem;
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider);
  border-radius: 8px;
  transition: all 0.3s ease;
}

.flow-step.active {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-brand-soft);
  transform: translateY(-2px);
}

.step-icon {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}

.step-info {
  text-align: center;
}

.step-title {
  font-weight: 600;
  font-size: 0.85rem;
  color: var(--vp-c-text-1);
  margin-bottom: 0.25rem;
}

.step-desc {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  line-height: 1.4;
}

.flow-arrow {
  font-size: 1.25rem;
  color: var(--vp-c-text-3);
}

.example-box {
  background: var(--vp-c-bg);
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
}

.example-title {
  font-weight: 600;
  font-size: 0.9rem;
  margin-bottom: 0.75rem;
  color: var(--vp-c-text-1);
}

.record-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.record-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  background: var(--vp-c-bg-soft);
  border-radius: 4px;
  font-size: 0.8rem;
}

.record-type {
  background: var(--vp-c-brand);
  color: white;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  font-weight: 600;
  font-size: 0.7rem;
  min-width: 60px;
  text-align: center;
}

.record-name {
  color: var(--vp-c-text-2);
  flex: 1;
  font-family: monospace;
}

.record-arrow {
  color: var(--vp-c-text-3);
}

.record-value {
  color: var(--vp-c-brand);
  font-family: monospace;
  font-weight: 500;
}

.play-btn {
  width: 100%;
  padding: 0.75rem;
  background: var(--vp-c-brand);
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s ease;
}

.play-btn:hover {
  background: var(--vp-c-brand-1);
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

@media (max-width: 768px) {
  .dns-flow {
    flex-wrap: wrap;
  }

  .flow-arrow {
    display: none;
  }

  .flow-step {
    min-width: 45%;
  }
}
</style>
