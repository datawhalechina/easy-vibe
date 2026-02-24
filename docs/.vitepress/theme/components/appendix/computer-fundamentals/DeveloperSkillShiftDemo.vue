<template>
  <div class="skill-shift-demo">
    <div class="demo-header">
      <span class="title">能力重要性变化</span>
      <span class="subtitle">AI 时代，哪些能力更重要了？</span>
    </div>

    <div class="comparison-grid">
      <div class="column">
        <div class="column-title">传统时代更重要</div>
        <div class="skill-list">
          <div v-for="skill in beforeSkills" :key="skill.name" class="skill-item">
            <span class="skill-name">{{ skill.name }}</span>
            <div class="skill-bar">
              <div class="bar-fill before" :style="{ width: skill.level + '%' }"></div>
            </div>
            <span class="skill-desc">{{ skill.desc }}</span>
          </div>
        </div>
      </div>

      <div class="column">
        <div class="column-title">AI 时代更重要</div>
        <div class="skill-list">
          <div v-for="skill in afterSkills" :key="skill.name" class="skill-item">
            <span class="skill-name">{{ skill.name }}</span>
            <div class="skill-bar">
              <div class="bar-fill after" :style="{ width: skill.level + '%' }"></div>
            </div>
            <span class="skill-desc">{{ skill.desc }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="info-box">
      <strong>关键洞察：</strong>AI 能帮你写代码，但判断力、架构思维、领域知识、调试能力是 AI 替代不了的。
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const beforeSkills = ref([
  { name: '语法记忆', level: 90, desc: '熟记 API 和语法细节' },
  { name: '手写代码速度', level: 85, desc: '快速敲代码的能力' },
  { name: '查文档能力', level: 80, desc: '快速找到 API 用法' }
])

const afterSkills = ref([
  { name: '需求描述能力', level: 95, desc: '用自然语言准确描述需求' },
  { name: '代码审核能力', level: 90, desc: '判断 AI 生成代码的对错' },
  { name: '架构设计能力', level: 85, desc: '设计系统整体结构' },
  { name: '问题定位能力', level: 80, desc: '出问题时知道从哪排查' }
])
</script>

<style scoped>
.skill-shift-demo {
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

.comparison-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

.column-title {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
  margin-bottom: 0.75rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px dashed var(--vp-c-divider);
}

.skill-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.skill-item {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.skill-name {
  font-size: 0.82rem;
  font-weight: 500;
  color: var(--vp-c-text-1);
}

.skill-bar {
  height: 6px;
  background: var(--vp-c-divider);
  border-radius: 3px;
  overflow: hidden;
}

.bar-fill {
  height: 100%;
  border-radius: 3px;
  transition: width 0.3s ease;
}

.bar-fill.before {
  background: var(--vp-c-text-3);
}

.bar-fill.after {
  background: var(--vp-c-brand-1);
}

.skill-desc {
  font-size: 0.72rem;
  color: var(--vp-c-text-3);
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
  .comparison-grid {
    grid-template-columns: 1fr;
  }
}
</style>
