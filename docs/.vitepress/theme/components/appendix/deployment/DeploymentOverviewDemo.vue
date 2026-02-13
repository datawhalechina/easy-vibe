<template>
  <div class="deployment-overview">
    <div class="demo-header">
      <span class="icon">🚀</span>
      <span class="title">服务上线全流程</span>
      <span class="subtitle">从代码到用户眼中的网页</span>
    </div>

    <div class="demo-content">
      <div class="service-flow">
        <div class="flow-step" :class="{ active: currentStep >= 1 }">
          <div class="step-icon">📦</div>
          <div class="step-title">Build</div>
          <div class="tech-term">源码→可执行文件</div>
        </div>
        <span class="flow-arrow">→</span>
        <div class="flow-step" :class="{ active: currentStep >= 2 }">
          <div class="step-icon">🖥️</div>
          <div class="step-title">Server</div>
          <div class="tech-term">24h运行的电脑</div>
        </div>
        <span class="flow-arrow">→</span>
        <div class="flow-step" :class="{ active: currentStep >= 3 }">
          <div class="step-icon">�</div>
          <div class="step-title">Deploy</div>
          <div class="tech-term">代码放到服务器</div>
        </div>
        <span class="flow-arrow">→</span>
        <div class="flow-step" :class="{ active: currentStep >= 4 }">
          <div class="step-icon">🔀</div>
          <div class="step-title">Nginx</div>
          <div class="tech-term">接收请求分发响应</div>
        </div>
        <span class="flow-arrow">→</span>
        <div class="flow-step" :class="{ active: currentStep >= 5 }">
          <div class="step-icon">�</div>
          <div class="step-title">DNS</div>
          <div class="tech-term">域名→IP地址</div>
        </div>
        <span class="flow-arrow">→</span>
        <div class="flow-step" :class="{ active: currentStep >= 6 }">
          <div class="step-icon">�</div>
          <div class="step-title">HTTPS</div>
          <div class="tech-term">加密数据传输</div>
        </div>
        <span class="flow-arrow">→</span>
        <div class="flow-step" :class="{ active: currentStep >= 7 }">
          <div class="step-icon">⚡</div>
          <div class="step-title">CDN</div>
          <div class="tech-term">就近访问加速</div>
        </div>
        <span class="flow-arrow">→</span>
        <div class="flow-step" :class="{ active: currentStep >= 8 }">
          <div class="step-icon">🔄</div>
          <div class="step-title">CI/CD</div>
          <div class="tech-term">自动化部署流程</div>
        </div>
        <span class="flow-arrow">→</span>
        <div class="flow-step" :class="{ active: currentStep >= 9 }">
          <div class="step-icon">�</div>
          <div class="step-title">Monitor</div>
          <div class="tech-term">监控运行状态</div>
        </div>
      </div>

      <div class="info-box">
        <span class="icon">💡</span>
        <strong>核心原则</strong>：小步快跑 → 先上线MVP → 逐步完善
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const currentStep = ref(0)
</script>

<style scoped>
.deployment-overview {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  padding: 0.75rem;
  margin: 1rem 0;
}

.demo-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
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
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  line-height: 1.5;
  margin-bottom: 0.75rem;
  padding: 0.5rem;
  background: var(--vp-c-bg);
  border-radius: 6px;
}

.intro-text strong {
  color: var(--vp-c-brand-1);
  font-weight: 500;
}

.demo-content {
  margin-bottom: 0.5rem;
}

.service-flow {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.25rem;
  overflow-x: auto;
  padding-bottom: 0.5rem;
}

.flow-step {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  padding: 0.5rem;
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider);
  border-radius: 8px;
  transition: all 0.2s ease;
  flex-shrink: 0;
  min-width: 85px;
}

.flow-step:hover {
  border-color: var(--vp-c-brand);
}

.flow-step.active {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-brand-soft);
}

.step-icon {
  font-size: 1rem;
}

.step-title {
  font-weight: 600;
  font-size: 0.75rem;
  color: var(--vp-c-text-1);
  text-align: center;
  white-space: nowrap;
}

.tech-term {
  font-size: 0.6rem;
  color: var(--vp-c-text-2);
  text-align: center;
  white-space: normal;
  line-height: 1.2;
}

.flow-arrow {
  font-size: 1rem;
  color: var(--vp-c-text-3);
  flex-shrink: 0;
}

.info-box {
  background: var(--vp-c-bg-alt);
  padding: 0.5rem;
  border-radius: 6px;
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  margin-top: 0.5rem;
}

.info-box .icon {
  margin-right: 0.25rem;
}
</style>
