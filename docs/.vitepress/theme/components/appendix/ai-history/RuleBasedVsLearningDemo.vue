<template>
  <div class="demo-card">
    <div class="demo-header">
      <span class="title">关键发展路径总结</span>
    </div>
    <div class="path-flow">
      <div class="path-item" v-for="(item, i) in path" :key="i">
        <div class="path-card" :style="{ borderLeftColor: item.color }">
          <div class="path-top">
            <span class="path-icon" :style="{ background: item.color }">{{ i + 1 }}</span>
            <div>
              <div class="path-name">{{ item.name }}</div>
              <div class="path-years">{{ item.years }}</div>
            </div>
          </div>
          <div class="path-desc">{{ item.desc }}</div>
        </div>
        <div v-if="i < path.length - 1" class="path-connector">
          <svg width="20" height="24" viewBox="0 0 20 24"><path d="M10 0 L10 18 L5 13 M10 18 L15 13" fill="none" stroke="var(--vp-c-text-3)" stroke-width="1.5" stroke-linecap="round" /></svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const path = [
  { name: '理论奠基', years: '1940s-1950s', desc: '图灵测试、达特茅斯会议，符号主义诞生', color: '#3b82f6' },
  { name: '符号主义主导', years: '1960s-1980s', desc: '专家系统兴起与两次 AI 寒冬', color: '#059669' },
  { name: '机器学习转型', years: '1990s-2000s', desc: '统计方法取代规则，连接主义复苏', color: '#d97706' },
  { name: '深度学习革命', years: '2010s', desc: 'AlexNet、AlphaGo、Transformer 架构，连接主义成为主流', color: '#dc2626' },
  { name: '大模型时代', years: '2018 至今', desc: 'GPT 系列、多模态融合，通用智能曙光初现', color: '#7c3aed' },
]
</script>

<style scoped>
.demo-card { border: 1px solid var(--vp-c-divider); border-radius: 8px; background: var(--vp-c-bg-soft); padding: 1.25rem; margin: 1rem 0; }
.demo-header { margin-bottom: 1rem; }
.demo-header .title { font-weight: bold; font-size: 1rem; }
.path-flow { display: flex; flex-direction: column; align-items: stretch; }
.path-item { display: flex; flex-direction: column; align-items: center; }
.path-card { background: var(--vp-c-bg); border: 1px solid var(--vp-c-divider); border-left: 4px solid; border-radius: 0 8px 8px 0; padding: 0.8rem 1rem; width: 100%; }
.path-top { display: flex; align-items: center; gap: 0.7rem; margin-bottom: 0.35rem; }
.path-icon { width: 24px; height: 24px; border-radius: 50%; color: white; font-size: 0.72rem; font-weight: bold; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.path-name { font-weight: bold; font-size: 0.9rem; color: var(--vp-c-text-1); }
.path-years { font-size: 0.72rem; color: var(--vp-c-text-3); font-weight: bold; }
.path-desc { font-size: 0.8rem; color: var(--vp-c-text-2); line-height: 1.4; padding-left: 2.2rem; }
.path-connector { display: flex; justify-content: center; padding: 0.15rem 0; }
</style>
