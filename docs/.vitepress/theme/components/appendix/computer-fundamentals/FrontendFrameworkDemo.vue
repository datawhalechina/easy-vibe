<template>
  <div class="framework-demo">
    <div class="demo-header">
      <span class="title">前端框架演进</span>
      <span class="subtitle">从 jQuery 到现代框架</span>
    </div>

    <div class="timeline">
      <div v-for="(era, index) in eras" :key="era.name" class="era-item">
        <div class="era-marker">
          <span class="era-dot"></span>
          <span v-if="index < eras.length - 1" class="era-line"></span>
        </div>
        <div class="era-content">
          <div class="era-header">
            <span class="era-name">{{ era.name }}</span>
            <span class="era-time">{{ era.time }}</span>
          </div>
          <div class="era-desc">{{ era.desc }}</div>
          <div class="era-techs">
            <span v-for="tech in era.techs" :key="tech" class="tech-tag">{{ tech }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="info-box">
      <strong>框架的本质：</strong>解决"数据变化后如何高效更新 UI"的问题。现代框架让你只需关注"数据是什么"，框架自动处理"UI 怎么变"。
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const eras = ref([
  {
    name: '原生时代',
    time: '1990s',
    desc: '直接用代码操控页面元素，一切从零开始',
    techs: ['HTML', 'CSS', 'JavaScript']
  },
  {
    name: 'jQuery 时代',
    time: '2006-2015',
    desc: '简化页面操控，跨浏览器兼容',
    techs: ['jQuery', 'Bootstrap']
  },
  {
    name: 'MVVM 时代',
    time: '2010-2015',
    desc: '数据驱动视图，双向绑定',
    techs: ['Angular.js', 'Knockout']
  },
  {
    name: '组件化时代',
    time: '2013-至今',
    desc: '声明式、组件化，框架自动更新页面',
    techs: ['React', 'Vue', 'Angular']
  },
  {
    name: '新时代',
    time: '2020-至今',
    desc: '编译时优化，更少运行时开销',
    techs: ['Svelte', 'Solid']
  }
])
</script>

<style scoped>
.framework-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  padding: 1rem 1.2rem;
  margin: 1rem 0;
}

.demo-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid var(--vp-c-divider);
}

.title {
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.subtitle {
  font-size: 0.78rem;
  color: var(--vp-c-text-3);
}

.timeline {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.era-item {
  display: flex;
  gap: 0.75rem;
}

.era-marker {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
}

.era-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--vp-c-brand-1);
  border: 2px solid var(--vp-c-bg);
}

.era-line {
  width: 2px;
  flex: 1;
  background: var(--vp-c-divider);
  margin: 2px 0;
}

.era-content {
  flex: 1;
  padding: 0.5rem 0.75rem;
  background: var(--vp-c-bg);
  border-radius: 6px;
  margin-bottom: 0.25rem;
}

.era-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.25rem;
}

.era-name {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.era-time {
  font-size: 0.7rem;
  color: var(--vp-c-text-3);
  background: var(--vp-c-bg-soft);
  padding: 0.1rem 0.35rem;
  border-radius: 3px;
}

.era-desc {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.35rem;
}

.era-techs {
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem;
}

.tech-tag {
  font-size: 0.68rem;
  padding: 0.15rem 0.4rem;
  background: var(--vp-c-bg-soft);
  border-radius: 3px;
  color: var(--vp-c-text-2);
}

.info-box {
  margin-top: 1rem;
  padding: 0.75rem;
  background: var(--vp-c-bg);
  border-radius: 6px;
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  border-left: 3px solid var(--vp-c-brand-1);
}
</style>
