<template>
  <div class="career-path-demo">
    <div class="demo-header">
      <span class="title">工程师成长路径</span>
      <span class="subtitle">从入门到精通的技能演进</span>
    </div>

    <div class="path-container">
      <div
        v-for="stage in stages"
        :key="stage.name"
        class="stage-card"
      >
        <div class="stage-header">
          <span class="stage-icon">{{ stage.icon }}</span>
          <span class="stage-name">{{ stage.name }}</span>
          <span class="stage-time">{{ stage.time }}</span>
        </div>
        <div class="stage-content">
          <div class="stage-desc">{{ stage.desc }}</div>
          <div class="stage-skills">
            <span class="skill-label">核心技能：</span>
            <div class="skill-tags">
              <span v-for="skill in stage.skills" :key="skill" class="skill-tag">
                {{ skill }}
              </span>
            </div>
          </div>
          <div class="stage-output">
            <span class="output-label">典型产出：</span>
            <span class="output-text">{{ stage.output }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="info-box">
      <strong>成长关键点：</strong>前 1-2 年打基础，建立独立完成任务的能力；2-3 年选方向，建立深度；3-5 年横向扩展，培养架构思维；5 年+ 技术决策与团队影响力。
    </div>
  </div>
</template>

<script setup>
const stages = [
  {
    name: '入门期',
    icon: '🌱',
    time: '0-1 年',
    desc: '学习基础语法和工具，能完成简单任务',
    skills: ['一门语言基础', 'Git 使用', '调试技巧', '阅读文档'],
    output: '能独立完成小功能、修复简单 Bug'
  },
  {
    name: '成长期',
    icon: '🌿',
    time: '1-2 年',
    desc: '熟悉常用框架和最佳实践，能独立负责模块',
    skills: ['框架熟练', '代码规范', '单元测试', 'API 设计'],
    output: '独立负责一个功能模块，代码质量稳定'
  },
  {
    name: '进阶期',
    icon: '🌳',
    time: '2-3 年',
    desc: '深入某个领域，开始有技术选型能力',
    skills: ['领域深入', '性能优化', '架构设计', '技术选型'],
    output: '主导技术方案设计，解决复杂问题'
  },
  {
    name: '成熟期',
    icon: '🌲',
    time: '3-5 年',
    desc: '全栈能力或领域专家，能带领小团队',
    skills: ['全栈能力', '团队协作', '技术分享', '项目管理'],
    output: '负责核心系统，指导新人成长'
  },
  {
    name: '专家期',
    icon: '🏔️',
    time: '5 年+',
    desc: '技术决策者，有行业影响力',
    skills: ['技术战略', '团队建设', '行业洞察', '创新引领'],
    output: '技术方向决策，培养技术团队'
  }
]
</script>

<style scoped>
.career-path-demo {
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

.path-container {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.stage-card {
  background: var(--vp-c-bg);
  border-radius: 6px;
  padding: 0.75rem;
  border: 1px solid var(--vp-c-divider);
}

.stage-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.stage-icon {
  font-size: 1.1rem;
}

.stage-name {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.stage-time {
  font-size: 0.7rem;
  color: var(--vp-c-text-3);
  background: var(--vp-c-bg-soft);
  padding: 0.1rem 0.35rem;
  border-radius: 3px;
  margin-left: auto;
}

.stage-content {
  padding-left: 1.6rem;
}

.stage-desc {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.5rem;
}

.stage-skills {
  margin-bottom: 0.35rem;
}

.skill-label,
.output-label {
  font-size: 0.7rem;
  color: var(--vp-c-text-3);
  margin-right: 0.35rem;
}

.skill-tags {
  display: inline-flex;
  flex-wrap: wrap;
  gap: 0.25rem;
  margin-top: 0.2rem;
}

.skill-tag {
  font-size: 0.68rem;
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  padding: 0.1rem 0.4rem;
  border-radius: 3px;
}

.stage-output {
  font-size: 0.72rem;
  color: var(--vp-c-text-2);
}

.output-text {
  color: var(--vp-c-text-1);
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
  .stage-content {
    padding-left: 0;
  }
}
</style>
