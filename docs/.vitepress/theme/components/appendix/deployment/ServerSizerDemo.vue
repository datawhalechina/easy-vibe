<!--
  ServerSizerDemo.vue
  服务器选购指南：租房隐喻
-->
<template>
  <div class="sizer">
    <div class="header">
      <div class="title">服务器选购指南</div>
      <div class="subtitle">不花冤枉钱，够用就好</div>
    </div>

    <div class="controls">
      <div class="control">
        <label>你的业务规模？</label>
        <div class="range-box">
          <input type="range" min="0" max="3" step="1" v-model.number="scaleIndex" />
          <div class="scale-labels">
            <span>个人博客</span>
            <span>初创官网</span>
            <span>小型 App</span>
            <span>中型平台</span>
          </div>
        </div>
      </div>
    </div>

    <div class="result-card">
      <div class="main-rec">
        <div class="icon">{{ recommendation.icon }}</div>
        <div class="details">
          <div class="rec-title">{{ recommendation.title }}</div>
          <div class="rec-spec">{{ recommendation.spec }}</div>
        </div>
      </div>

      <div class="analogy-box">
        <p><strong>🤔 通俗理解：</strong></p>
        <p>{{ recommendation.analogy }}</p>
      </div>

      <div class="specs-grid">
        <div class="spec-item">
          <span class="label">带宽 (水管)</span>
          <span class="val">{{ recommendation.bandwidth }}</span>
        </div>
        <div class="spec-item">
          <span class="label">预算估算</span>
          <span class="val">{{ recommendation.cost }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

const scaleIndex = ref(1)

const levels = [
  {
    title: '入门级 (Entry)',
    spec: '1核 1G ~ 2G',
    icon: '🚲',
    bandwidth: '1 Mbps',
    cost: '¥50~99 / 年 (活动价)',
    analogy: '就像租了个单间。放个博客、跑个脚本完全够用。人多了会挤不动。'
  },
  {
    title: '标准级 (Standard)',
    spec: '2核 4G',
    icon: '🚗',
    bandwidth: '3~5 Mbps',
    cost: '¥300 / 年',
    analogy: '就像租了个两居室。正经跑个公司官网、小程序后端没问题。大多数人的首选。'
  },
  {
    title: '专业级 (Pro)',
    spec: '4核 8G',
    icon: '🏎️',
    bandwidth: '5~10 Mbps',
    cost: '¥1000+ / 年',
    analogy: '就像租了个大平层办公室。能抗住几千人同时在线，跑复杂的计算任务也不虚。'
  },
  {
    title: '企业级 (Enterprise)',
    spec: '8核 16G + 负载均衡',
    icon: '✈️',
    bandwidth: '按量付费',
    cost: '¥5000+ / 年',
    analogy: '这已经不是租房了，是包下了一整层楼。通常需要多台机器配合，专人维护。'
  }
]

const recommendation = computed(() => levels[scaleIndex.value])
</script>

<style scoped>
.sizer {
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
  padding: 20px;
  margin: 20px 0;
}

.header {
  margin-bottom: 20px;
}
.header .title {
  font-weight: 800;
  font-size: 18px;
}
.header .subtitle {
  color: var(--vp-c-text-2);
  font-size: 14px;
}

.controls {
  margin-bottom: 20px;
}

.control label {
  font-weight: 600;
  font-size: 14px;
  display: block;
  margin-bottom: 10px;
}

.range-box {
  background: var(--vp-c-bg);
  padding: 16px;
  border-radius: 10px;
  border: 1px solid var(--vp-c-divider);
}

input[type='range'] {
  width: 100%;
  margin-bottom: 10px;
}

.scale-labels {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: var(--vp-c-text-2);
}

.result-card {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-brand);
  border-radius: 12px;
  padding: 20px;
  position: relative;
  overflow: hidden;
}

.result-card::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 4px;
  height: 100%;
  background: var(--vp-c-brand);
}

.main-rec {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
}

.icon {
  font-size: 40px;
  background: var(--vp-c-bg-soft);
  width: 64px;
  height: 64px;
  border-radius: 12px;
  display: grid;
  place-items: center;
}

.rec-title {
  font-weight: 800;
  font-size: 18px;
  color: var(--vp-c-brand);
}

.rec-spec {
  font-size: 14px;
  color: var(--vp-c-text-1);
  margin-top: 4px;
}

.analogy-box {
  background: var(--vp-c-bg-soft);
  padding: 12px;
  border-radius: 8px;
  font-size: 14px;
  line-height: 1.5;
  margin-bottom: 16px;
}

.analogy-box p {
  margin: 0;
}

.analogy-box strong {
  color: var(--vp-c-text-1);
}

.specs-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  border-top: 1px dashed var(--vp-c-divider);
  padding-top: 16px;
}

.spec-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.spec-item .label {
  font-size: 12px;
  color: var(--vp-c-text-2);
}

.spec-item .val {
  font-weight: 600;
  font-size: 14px;
}
</style>
