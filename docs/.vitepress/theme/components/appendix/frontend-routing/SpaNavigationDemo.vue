<template>
  <div class="spa-navigation-demo">
    <div class="demo-header">
      <span class="icon">🚀</span>
      <span class="title">SPA导航流程</span>
      <span class="subtitle">从点击到渲染的完整旅程</span>
    </div>

    <div class="intro-text">
      想象你在<span class="highlight">餐厅点菜</span>：从看菜单、下单、厨房准备、最后上菜。SPA导航也是这样，用户触发后经过一系列步骤，最终把新"菜品"（页面）端到你面前。
    </div>

    <div class="flow-container">
      <div
        v-for="(step, index) in steps"
        :key="index"
        class="flow-step"
      >
        <div class="step-number">
          {{ index + 1 }}
        </div>
        <div class="step-content">
          <div class="step-title">
            {{ step.title }}
          </div>
          <div class="step-desc">
            {{ step.desc }}
          </div>
        </div>
      </div>
    </div>

    <div class="highlight-box">
      <h5>⚡ 关键优化点</h5>
      <div class="optimization-tips">
        <div class="tip-item">
          <span class="tip-icon">🎯</span>
          <div class="tip-content">
            <div class="tip-title">
              路由懒加载
            </div>
            <div class="tip-desc">
              按需加载页面组件，减少初始包体积
            </div>
          </div>
        </div>
        <div class="tip-item">
          <span class="tip-icon">🛡️</span>
          <div class="tip-content">
            <div class="tip-title">
              守卫预加载
            </div>
            <div class="tip-desc">
              在beforeEnter中预加载数据，提升用户体验
            </div>
          </div>
        </div>
        <div class="tip-item">
          <span class="tip-icon">⚡</span>
          <div class="tip-content">
            <div class="tip-title">
              过渡动画
            </div>
            <div class="tip-desc">
              添加页面切换动画，让导航更流畅
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="info-box">
      <span class="icon">💡</span>
      <strong>核心优势：</strong>整个流程在浏览器内完成，无需服务器参与，体验如原生应用般流畅。这就是SPA相比传统MPA的最大优势。
    </div>
  </div>
</template>

<script setup>
const steps = [
  { title: '触发导航', desc: '用户点击链接或调用 router.push()' },
  { title: 'URL 变化', desc: '浏览器地址栏更新，History API 记录状态' },
  { title: '路由匹配', desc: '路由器根据URL匹配对应的路由配置' },
  { title: '守卫验证', desc: '执行全局、路由独享、组件内守卫' },
  { title: '组件加载', desc: '懒加载的组件异步加载并解析' },
  { title: '组件渲染', desc: '新组件挂载到 DOM，页面更新' },
  { title: '后置钩子', desc: '执行 afterEach 钩子，完成导航' }
]
</script>

<style scoped>
.spa-navigation-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg-soft);
  padding: 0.75rem;
  margin: 0.5rem 0;
  
  
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

.flow-container {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.flow-step {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 0.75rem;
  background: var(--vp-c-bg);
  border-radius: 6px;
  border-left: 3px solid var(--vp-c-brand);
  transition: all 0.2s;
}

.flow-step:hover {
  background: var(--vp-c-bg-soft);
  transform: translateX(4px);
}

.step-number {
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--vp-c-brand);
  color: white;
  border-radius: 50%;
  font-size: 0.85rem;
  font-weight: 600;
  flex-shrink: 0;
}

.step-content {
  flex: 1;
}

.step-title {
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--vp-c-text-1);
  margin-bottom: 0.25rem;
}

.step-desc {
  font-size: 0.75rem;
  color: var(--vp-c-text-3);
  line-height: 1.4;
}

.highlight-box {
  background: var(--vp-c-bg);
  border-radius: 6px;
  padding: 0.75rem;
  border: 1px solid var(--vp-c-divider);
  margin-bottom: 1rem;
}

.highlight-box h5 {
  margin: 0 0 0.75rem 0;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

.optimization-tips {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.tip-item {
  display: flex;
  gap: 0.75rem;
  padding: 0.5rem;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
}

.tip-icon {
  font-size: 1.25rem;
  flex-shrink: 0;
}

.tip-content {
  flex: 1;
}

.tip-title {
  font-size: 0.8rem;
  font-weight: 500;
  color: var(--vp-c-text-1);
  margin-bottom: 0.25rem;
}

.tip-desc {
  font-size: 0.7rem;
  color: var(--vp-c-text-3);
  line-height: 1.4;
}

.info-box {
  background: var(--vp-c-bg-alt);
  padding: 0.75rem;
  border-radius: 6px;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

.info-box .icon { margin-right: 0.25rem; }

@media (max-width: 768px) {
  .flow-step {
    padding: 0.5rem;
  }

  .step-number {
    width: 24px;
    height: 24px;
    font-size: 0.75rem;
  }
}
</style>
