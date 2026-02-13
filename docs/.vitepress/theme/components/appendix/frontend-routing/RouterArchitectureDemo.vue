<template>
  <div class="router-architecture-demo">
    <div class="demo-header">
      <span class="icon">🏗️</span>
      <span class="title">路由架构</span>
      <span class="subtitle">前端路由系统的组成部分</span>
    </div>

    <div class="intro-text">
      想象<span class="highlight">公司的组织架构</span>：有前台接待（URL监听）、有调度中心（路由匹配）、有各部门（组件渲染）。前端路由也是这样分层协作的，各司其职。
    </div>

    <div class="architecture-layers">
      <div class="layer" v-for="(layer, index) in layers" :key="layer.name">
        <div class="layer-header">
          <span class="layer-icon">{{ layer.icon }}</span>
          <span class="layer-name">{{ layer.name }}</span>
          <span class="layer-desc">{{ layer.desc }}</span>
        </div>
        <div class="layer-components">
          <div
            v-for="comp in layer.components"
            :key="comp"
            class="component-tag"
          >
            {{ comp }}
          </div>
        </div>
        <div v-if="index < layers.length - 1" class="layer-arrow">↓</div>
      </div>
    </div>

    <div class="data-flow">
      <h5>📊 数据流向</h5>
      <div class="flow-steps">
        <div class="flow-step">
          <span class="step-num">1</span>
          <span>用户点击链接，触发 URL 变化</span>
        </div>
        <div class="flow-step">
          <span class="step-num">2</span>
          <span>History 监听器捕获变化</span>
        </div>
        <div class="flow-step">
          <span class="step-num">3</span>
          <span>路由匹配器找到对应配置</span>
        </div>
        <div class="flow-step">
          <span class="step-num">4</span>
          <span>执行守卫进行验证</span>
        </div>
        <div class="flow-step">
          <span class="step-num">5</span>
          <span>渲染组件到 RouterView</span>
        </div>
      </div>
    </div>

    <div class="info-box">
      <span class="icon">💡</span>
      <strong>核心思想：</strong>路由系统通过监听URL变化、匹配路由配置、执行守卫验证、渲染组件这一系列流程，实现了单页应用的无刷新导航。
    </div>
  </div>
</template>

<script setup>
const layers = [
  {
    name: '浏览器层',
    icon: '🌐',
    desc: '提供 URL 和 History API',
    components: ['URL Bar', 'History API', 'Hash Change', 'PopState']
  },
  {
    name: '路由核心层',
    icon: '⚙️',
    desc: '路由系统的核心逻辑',
    components: ['Router 实例', '路由匹配器', 'History 管理', '守卫管道']
  },
  {
    name: '组件层',
    icon: '🧩',
    desc: '用户界面渲染',
    components: ['RouterView', 'RouterLink', '页面组件']
  }
]
</script>

<style scoped>
.router-architecture-demo {
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

.architecture-layers {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.layer {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 0.75rem;
}

.layer-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.layer-icon {
  font-size: 1rem;
}

.layer-name {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.layer-desc {
  font-size: 0.7rem;
  color: var(--vp-c-text-3);
  margin-left: auto;
}

.layer-components {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.component-tag {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  padding: 0.25rem 0.5rem;
  font-size: 0.7rem;
  color: var(--vp-c-text-2);
}

.layer-arrow {
  text-align: center;
  color: var(--vp-c-text-3);
  font-size: 0.75rem;
  margin-top: 0.25rem;
}

.data-flow {
  background: var(--vp-c-bg);
  border-radius: 8px;
  padding: 0.75rem;
  border: 1px solid var(--vp-c-divider);
  margin-bottom: 1rem;
}

.data-flow h5 {
  margin: 0 0 0.5rem 0;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

.flow-steps {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.flow-step {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  border-left: 3px solid var(--vp-c-brand);
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
}

.step-num {
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--vp-c-brand);
  color: white;
  border-radius: 50%;
  font-size: 0.65rem;
  font-weight: 600;
  flex-shrink: 0;
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
  .layer-header {
    flex-wrap: wrap;
  }

  .layer-desc {
    margin-left: 0;
    width: 100%;
  }
}
</style>
