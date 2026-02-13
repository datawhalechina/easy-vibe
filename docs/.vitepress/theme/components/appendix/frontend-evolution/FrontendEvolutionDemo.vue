<!--
  FrontendEvolutionDemo.vue - 前端演进总览
  用时间线的方式展示前端开发从静态页面到现代框架的演进
-->
<template>
  <div class="evolution-timeline">
    <div class="timeline-header">
      <span class="header-icon">🚀</span>
      <span class="header-title">前端开发演进时间线</span>
      <span class="header-subtitle">从"贴海报"到"搭乐高"的 20 年变迁</span>
    </div>

    <!-- 时间线 -->
    <div class="timeline-container">
      <div
        v-for="(era, index) in eras"
        :key="era.id"
        class="era-item"
        :class="{ active: activeEra === era.id }"
        @click="activeEra = activeEra === era.id ? null : era.id"
      >
        <div class="era-marker">
          <div class="era-dot">{{ era.emoji }}</div>
          <div v-if="index < eras.length - 1" class="era-line"></div>
        </div>

        <div class="era-content">
          <div class="era-header">
            <span class="era-year">{{ era.year }}</span>
            <span class="era-name">{{ era.name }}</span>
          </div>

          <div class="era-brief">{{ era.brief }}</div>

          <Transition name="expand">
            <div v-if="activeEra === era.id" class="era-detail">
              <div class="detail-section">
                <div class="section-title">🔑 关键技术</div>
                <div class="tech-tags">
                  <span
                    v-for="tech in era.technologies"
                    :key="tech"
                    class="tech-tag"
                  >{{ tech }}</span>
                </div>
              </div>

              <div class="detail-section">
                <div class="section-title">💪 优点</div>
                <div class="benefit-list">
                  <div
                    v-for="benefit in era.pros"
                    :key="benefit"
                    class="benefit-item"
                  >
                    <span class="check-icon">✓</span>
                    <span>{{ benefit }}</span>
                  </div>
                </div>
              </div>

              <div class="detail-section">
                <div class="section-title">⚠️ 缺点</div>
                <div class="problem-list">
                  <div
                    v-for="problem in era.cons"
                    :key="problem"
                    class="problem-item"
                  >
                    <span class="warn-icon">!</span>
                    <span>{{ problem }}</span>
                  </div>
                </div>
              </div>

              <div class="detail-section" v-if="era.metaphor">
                <div class="section-title">💡 生活比喻</div>
                <div class="metaphor-box">{{ era.metaphor }}</div>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </div>

    <!-- 提示 -->
    <div class="timeline-hint">
      <span>👆</span>
      <span>点击任意时代，查看详细信息</span>
    </div>

    <!-- 核心要点 -->
    <div class="key-takeaway">
      <span class="takeaway-icon">🎯</span>
      <div class="takeaway-content">
        <strong>核心思想：</strong>
        前端技术的演进，本质是为了解决两个问题：
        <strong>提升开发效率</strong>（从手动到自动化）和
        <strong>支撑更复杂的应用</strong>（从简单页面到桌面级应用）。
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const activeEra = ref(null)

const eras = [
  {
    id: 1,
    year: '2000s',
    name: '静态网页时代',
    emoji: '🖼️',
    brief: '网页像海报，只能看不能动',
    technologies: ['HTML', 'CSS', 'JavaScript', '切图', 'jQuery'],
    pros: ['简单直接', '写完就能跑', '学习成本低'],
    cons: ['加载慢（请求多）', '难以维护', '无法动态更新'],
    metaphor: '就像贴海报：你画好一张图，贴到墙上就完事了。内容固定，用户只能看，不能互动。'
  },
  {
    id: 2,
    year: '2010s 初',
    name: '响应式布局时代',
    emoji: '📱',
    brief: '一套代码适配手机和电脑',
    technologies: ['Media Query', '响应式设计', 'Bootstrap', 'Flexbox'],
    pros: ['跨设备适配', '维护成本低', '用户体验好'],
    cons: ['设计复杂度高', '调试麻烦', '性能开销大'],
    metaphor: '就像魔法相框：照片会自动根据房间大小调整展示方式。大房间摆大开，小房间缩小。'
  },
  {
    id: 3,
    year: '2010s 中',
    name: 'jQuery 时代',
    emoji: '🔧',
    brief: '简化 DOM 操作，但还是手动搬砖',
    technologies: ['jQuery', 'DOM 操作', 'AJAX', '动画效果'],
    pros: ['上手简单', '兼容性好', '生态丰富'],
    cons: ['代码一多就乱', '容易出 bug', '状态管理难'],
    metaphor: '就像手工装修：你需要亲自告诉工人每一步做什么。工人多了，指令杂了，容易出错。'
  },
  {
    id: 4,
    year: '2010s 末',
    name: '现代框架时代',
    emoji: '⚛️',
    brief: '数据驱动，组件化开发',
    technologies: ['Vue.js', 'React', 'Angular', '组件化', '状态管理'],
    pros: ['代码可维护', '开发效率高', '适合复杂应用'],
    cons: ['学习成本高', '构建复杂', '小项目过重'],
    metaphor: '就像搭乐高：你先设计好房子长什么样，然后乐高积木会自动按设计图组装好。'
  },
  {
    id: 5,
    year: '2020s',
    name: '工程化时代',
    emoji: '🏭',
    brief: '自动化、规范化、规模化',
    technologies: ['Webpack', 'Vite', 'TypeScript', 'CI/CD', '测试'],
    pros: ['团队协作友好', '代码质量高', '性能优化好'],
    cons: ['配置复杂', '学习曲线陡', '维护成本高'],
    metaphor: '就像现代化工厂：从原材料到成品，整个生产流程自动化、标准化、可控化。'
  }
]
</script>

<style scoped>
.evolution-timeline {
  border: 2px solid #e0e0e0;
  border-radius: 16px;
  background: linear-gradient(135deg, #fafbfc 0%, #f0f4f8 100%);
  padding: 24px;
  margin: 20px 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif;
}

.timeline-header {
  text-align: center;
  margin-bottom: 32px;
}

.header-icon {
  font-size: 48px;
  display: block;
  margin-bottom: 12px;
}

.header-title {
  display: block;
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin-bottom: 8px;
}

.header-subtitle {
  display: block;
  font-size: 14px;
  color: #666;
}

/* 时间线容器 */
.timeline-container {
  position: relative;
}

.era-item {
  display: flex;
  gap: 20px;
  margin-bottom: 24px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.era-item:hover {
  transform: translateX(4px);
}

.era-item.active {
  transform: translateX(8px);
}

/* 标记点 */
.era-marker {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
}

.era-dot {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea, #764ba2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
  z-index: 1;
  transition: all 0.3s ease;
}

.era-item:hover .era-dot {
  transform: scale(1.1);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
}

.era-line {
  width: 4px;
  flex: 1;
  background: linear-gradient(180deg, #667eea, #e0e0e0);
  margin-top: 8px;
  min-height: 40px;
}

/* 内容区域 */
.era-content {
  flex: 1;
  background: white;
  border-radius: 12px;
  padding: 16px;
  border: 2px solid #e0e0e0;
  transition: all 0.3s ease;
}

.era-item:hover .era-content {
  border-color: #667eea;
  box-shadow: 0 4px 16px rgba(102, 126, 234, 0.1);
}

.era-item.active .era-content {
  border-color: #667eea;
  background: linear-gradient(135deg, #f8f9ff, #ffffff);
}

.era-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
}

.era-year {
  padding: 4px 12px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  border-radius: 12px;
  font-size: 12px;
  font-weight: bold;
}

.era-name {
  font-size: 18px;
  font-weight: bold;
  color: #333;
}

.era-brief {
  font-size: 14px;
  color: #666;
  line-height: 1.5;
}

/* 详情展开 */
.era-detail {
  margin-top: 16px;
  padding-top: 16px;
  border-top: 2px dashed #e0e0e0;
}

.detail-section {
  margin-bottom: 16px;
}

.detail-section:last-child {
  margin-bottom: 0;
}

.section-title {
  font-size: 13px;
  font-weight: bold;
  color: #667eea;
  margin-bottom: 8px;
}

/* 技术标签 */
.tech-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tech-tag {
  padding: 4px 12px;
  background: #f0f4ff;
  color: #667eea;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
}

/* 优点列表 */
.benefit-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.benefit-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: #16a34a;
}

.check-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  background: #dcfce7;
  border-radius: 50%;
  font-size: 10px;
  font-weight: bold;
}

/* 缺点列表 */
.problem-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.problem-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: #dc2626;
}

.warn-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  background: #fecaca;
  border-radius: 50%;
  font-size: 10px;
  font-weight: bold;
}

/* 比喻框 */
.metaphor-box {
  background: linear-gradient(135deg, #fff7ed, #ffedd5);
  border-left: 4px solid #f97316;
  padding: 12px;
  border-radius: 8px;
  font-size: 13px;
  color: #9a3412;
  line-height: 1.6;
}

/* 提示 */
.timeline-hint {
  text-align: center;
  font-size: 13px;
  color: #666;
  margin: 16px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

/* 核心要点 */
.key-takeaway {
  display: flex;
  gap: 12px;
  padding: 16px;
  background: linear-gradient(135deg, #dcfce7, #d1fae5);
  border-radius: 12px;
  border-left: 4px solid #16a34a;
}

.takeaway-icon {
  font-size: 24px;
  flex-shrink: 0;
}

.takeaway-content {
  flex: 1;
  font-size: 14px;
  color: #14532d;
  line-height: 1.6;
}

/* 动画 */
.expand-enter-active,
.expand-leave-active {
  transition: all 0.3s ease;
  overflow: hidden;
}

.expand-enter-from,
.expand-leave-to {
  max-height: 0;
  opacity: 0;
}

.expand-enter-to,
.expand-leave-from {
  max-height: 1000px;
  opacity: 1;
}

/* 响应式 */
@media (max-width: 768px) {
  .era-item {
    flex-direction: column;
    gap: 12px;
  }

  .era-marker {
    flex-direction: row;
    gap: 12px;
  }

  .era-line {
    width: 100%;
    height: 4px;
    min-height: 0;
    margin-top: 0;
    margin-left: 8px;
  }
}
</style>
