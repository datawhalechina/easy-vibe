<template>
  <div class="fullstack-demo">
    <div class="demo-header">
      <span class="title">全栈技能树</span>
      <span class="subtitle">前后端通吃的核心能力</span>
    </div>

    <div class="skill-sections">
      <div class="skill-section">
        <div class="section-title">前端能力</div>
        <div class="skill-list">
          <div v-for="skill in frontendSkills" :key="skill" class="skill-item">{{ skill }}</div>
        </div>
      </div>

      <div class="skill-section bridge">
        <div class="section-title">全栈核心</div>
        <div class="skill-list">
          <div v-for="skill in bridgeSkills" :key="skill" class="skill-item highlight">{{ skill }}</div>
        </div>
      </div>

      <div class="skill-section">
        <div class="section-title">后端能力</div>
        <div class="skill-list">
          <div v-for="skill in backendSkills" :key="skill" class="skill-item">{{ skill }}</div>
        </div>
      </div>
    </div>

    <div class="info-box">
      <strong>全栈不等于全部精通：</strong>核心是打通前后端，能独立完成一个完整功能。不需要在每个领域都达到专家级别。
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const frontendSkills = ref(['HTML/CSS', 'JavaScript', '框架使用', '响应式设计'])
const backendSkills = ref(['API 设计', '数据库操作', '业务逻辑', '服务器部署'])
const bridgeSkills = ref(['HTTP 协议', 'Git 协作', '调试能力', '系统设计'])
</script>

<style scoped>
.fullstack-demo {
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

.skill-sections {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 0.75rem;
}

.skill-section {
  padding: 0.6rem;
  background: var(--vp-c-bg);
  border-radius: 6px;
}

.skill-section.bridge {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-brand-1);
}

.section-title {
  font-size: 0.78rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
  margin-bottom: 0.5rem;
  padding-bottom: 0.35rem;
  border-bottom: 1px dashed var(--vp-c-divider);
}

.skill-list {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.skill-item {
  font-size: 0.72rem;
  padding: 0.25rem 0.5rem;
  background: var(--vp-c-bg-soft);
  border-radius: 3px;
  color: var(--vp-c-text-2);
}

.skill-item.highlight {
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
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

@media (max-width: 640px) {
  .skill-sections {
    grid-template-columns: 1fr;
  }
}
</style>
