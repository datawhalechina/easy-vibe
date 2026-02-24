<template>
  <div class="career-path-demo">
    <div class="demo-header">
      <span class="icon">🚀</span>
      <span class="title">工程师成长路径</span>
      <span class="subtitle">从入门到精通的技能演进</span>
    </div>

    <div class="path-container">
      <div
        v-for="(stage, index) in stages"
        :key="stage.name"
        class="stage-card"
        :class="{ active: activeStage === index }"
        @click="activeStage = index"
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
        <div v-if="index < stages.length - 1" class="stage-arrow">→</div>
      </div>
    </div>

    <div class="path-insight">
      <div class="insight-icon">💡</div>
      <div class="insight-content">
        <div class="insight-title">成长关键点</div>
        <ul class="insight-list">
          <li>前 1-2 年：打基础，建立"能独立完成任务"的能力</li>
          <li>2-3 年：选方向，在某个领域建立深度</li>
          <li>3-5 年：横向扩展，培养架构思维和团队协作能力</li>
          <li>5 年+：技术决策、团队带领、技术影响力</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const activeStage = ref(0)

const stages = ref([
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
])
</script>

<style scoped>
.career-path-demo {
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  border-radius: 16px;
  padding: 24px;
  margin: 20px 0;
}

.demo-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 2px solid #e2e8f0;
}

.icon {
  font-size: 28px;
}

.title {
  font-size: 20px;
  font-weight: 700;
  color: #1e293b;
}

.subtitle {
  font-size: 14px;
  color: #64748b;
  margin-left: auto;
}

.path-container {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.stage-card {
  background: white;
  border-radius: 12px;
  padding: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid transparent;
  position: relative;
}

.stage-card:hover {
  transform: translateX(4px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.stage-card.active {
  border-color: #3b82f6;
  background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
}

.stage-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}

.stage-icon {
  font-size: 24px;
}

.stage-name {
  font-size: 18px;
  font-weight: 600;
  color: #1e293b;
}

.stage-time {
  font-size: 12px;
  color: #64748b;
  background: #f1f5f9;
  padding: 2px 8px;
  border-radius: 4px;
  margin-left: auto;
}

.stage-content {
  padding-left: 36px;
}

.stage-desc {
  font-size: 14px;
  color: #475569;
  margin-bottom: 12px;
}

.stage-skills {
  margin-bottom: 8px;
}

.skill-label,
.output-label {
  font-size: 12px;
  color: #64748b;
  margin-right: 8px;
}

.skill-tags {
  display: inline-flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 4px;
}

.skill-tag {
  font-size: 12px;
  background: #e0f2fe;
  color: #0369a1;
  padding: 2px 8px;
  border-radius: 4px;
}

.stage-output {
  font-size: 13px;
  color: #475569;
}

.output-text {
  color: #1e293b;
}

.stage-arrow {
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 20px;
  color: #cbd5e1;
}

.path-insight {
  margin-top: 24px;
  background: white;
  border-radius: 12px;
  padding: 16px;
  display: flex;
  gap: 16px;
  border-left: 4px solid #f59e0b;
}

.insight-icon {
  font-size: 24px;
}

.insight-title {
  font-size: 16px;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 8px;
}

.insight-list {
  margin: 0;
  padding-left: 20px;
  font-size: 13px;
  color: #475569;
  line-height: 1.8;
}

.insight-list li {
  margin-bottom: 4px;
}

@media (max-width: 640px) {
  .stage-content {
    padding-left: 0;
  }

  .stage-arrow {
    display: none;
  }
}
</style>
