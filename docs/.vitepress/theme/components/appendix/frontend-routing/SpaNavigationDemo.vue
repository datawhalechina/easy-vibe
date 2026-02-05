<template>
  <div class="spa-navigation-demo">
    <div class="demo-header">
      <h4>SPA 导航流程</h4>
      <p class="demo-desc">完整展示从点击链接到页面更新的全流程</p>
    </div>

    <div class="flow-container">
      <div class="step" v-for="(step, index) in steps" :key="index">
        <div class="step-number">{{ index + 1 }}</div>
        <div class="step-content">
          <div class="step-title">{{ step.title }}</div>
          <div class="step-desc">{{ step.desc }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const steps = [
  { title: '触发导航', desc: '用户点击链接或调用 router.push()' },
  { title: '全局前置守卫', desc: '执行 router.beforeEach 钩子' },
  { title: '解析路由', desc: '匹配路由配置，解析动态参数' },
  { title: '组件内守卫', desc: '执行 beforeRouteEnter 钩子' },
  { title: '全局解析守卫', desc: '执行 beforeResolve 钩子' },
  { title: '更新视图', desc: '渲染匹配的组件，更新 DOM' },
  { title: '全局后置钩子', desc: '执行 afterEach 钩子' }
]
</script>

<style scoped>
.spa-navigation-demo {
  padding: 20px;
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  margin: 20px 0;
}

.demo-header {
  text-align: center;
  margin-bottom: 20px;
}

.demo-header h4 {
  margin: 0 0 8px 0;
  color: var(--vp-c-text-1);
}

.demo-desc {
  margin: 0;
  color: var(--vp-c-text-2);
  font-size: 14px;
}

.flow-container {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.step {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 12px 16px;
  background: var(--vp-c-bg);
  border-radius: 8px;
  border-left: 3px solid var(--vp-c-brand);
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
  font-size: 13px;
  font-weight: 600;
  flex-shrink: 0;
}

.step-content {
  flex: 1;
}

.step-title {
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-text-1);
  margin-bottom: 2px;
}

.step-desc {
  font-size: 12px;
  color: var(--vp-c-text-3);
}

@media (max-width: 768px) {
  .step {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
