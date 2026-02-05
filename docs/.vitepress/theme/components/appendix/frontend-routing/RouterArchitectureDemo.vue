<template>
  <div class="router-architecture-demo">
    <div class="demo-header">
      <h4>前端路由架构</h4>
      <p class="demo-desc">展示前端路由系统的核心组件和数据流向</p>
    </div>

    <div class="architecture-diagram">
      <div class="layer browser-layer">
        <div class="layer-title">浏览器层</div>
        <div class="layer-content">
          <div class="component">URL Bar</div>
          <div class="component">History API</div>
          <div class="component">Hash Change</div>
        </div>
      </div>

      <div class="arrow down">↓</div>

      <div class="layer router-core">
        <div class="layer-title">路由核心层</div>
        <div class="layer-content">
          <div class="component main">Router Instance</div>
          <div class="sub-components">
            <div class="component">Route Matcher</div>
            <div class="component">History Manager</div>
            <div class="component">Guard Pipeline</div>
          </div>
        </div>
      </div>

      <div class="arrow down">↓</div>

      <div class="layer component-layer">
        <div class="layer-title">组件层</div>
        <div class="layer-content">
          <div class="component">Router View</div>
          <div class="component">Router Link</div>
          <div class="component">Page Components</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.router-architecture-demo {
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

.architecture-diagram {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.layer {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 16px;
}

.layer-title {
  font-size: 13px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 12px;
  padding-bottom: 8px;
  border-bottom: 1px solid var(--vp-c-divider);
}

.layer-content {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.component {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 8px 12px;
  font-size: 12px;
  color: var(--vp-c-text-1);
}

.component.main {
  background: var(--vp-c-brand-soft);
  border-color: var(--vp-c-brand);
  color: var(--vp-c-brand);
  font-weight: 500;
  width: 100%;
  text-align: center;
}

.sub-components {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  width: 100%;
  margin-top: 8px;
}

.arrow {
  text-align: center;
  color: var(--vp-c-text-3);
  font-size: 16px;
}

@media (max-width: 768px) {
  .layer-content {
    flex-direction: column;
  }

  .sub-components {
    flex-direction: column;
  }
}
</style>
