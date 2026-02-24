<template>
  <div class="field-map-demo">
    <div class="demo-header">
      <span class="title">计算机领域全景图</span>
      <span class="subtitle">点击查看详情</span>
    </div>

    <div class="field-grid">
      <div
        v-for="field in fields"
        :key="field.name"
        class="field-card"
      >
        <div class="field-name">{{ field.name }}</div>
        <div class="field-desc">{{ field.desc }}</div>
        <div class="field-techs">
          <span v-for="tech in field.techs" :key="tech" class="tech-tag">{{ tech }}</span>
        </div>
      </div>
    </div>

    <div class="info-box">
      <strong>建议：</strong>不要试图一次学完所有方向。先选一个方向深入，建立"根据地"，再横向扩展。
    </div>
  </div>
</template>

<script setup>
const fields = [
  {
    name: '前端',
    desc: '用户能看到、能交互的一切',
    techs: ['HTML/CSS', 'JavaScript', 'React/Vue']
  },
  {
    name: '后端',
    desc: '服务器端的业务逻辑和数据处理',
    techs: ['Node.js', 'Go', 'Java', 'Python']
  },
  {
    name: '移动端',
    desc: '手机上的应用体验',
    techs: ['Swift', 'Kotlin', 'Flutter']
  },
  {
    name: 'AI/算法',
    desc: '让系统变"聪明"',
    techs: ['PyTorch', 'TensorFlow', '机器学习']
  },
  {
    name: '运维/DevOps',
    desc: '保证系统稳定运行',
    techs: ['Docker', 'K8s', 'CI/CD']
  },
  {
    name: '数据工程',
    desc: '数据采集、存储、分析',
    techs: ['SQL', 'Spark', '数据仓库']
  }
]
</script>

<style scoped>
.field-map-demo {
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

.field-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.75rem;
}

.field-card {
  padding: 0.75rem;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
}

.field-name {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 0.25rem;
}

.field-desc {
  font-size: 0.72rem;
  color: var(--vp-c-text-3);
  margin-bottom: 0.5rem;
}

.field-techs {
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

@media (max-width: 640px) {
  .field-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
