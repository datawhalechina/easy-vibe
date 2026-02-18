<!--
  FrontendEvolutionDemo.vue - 前端演进总览
  用时间线的方式展示前端开发从静态页面到现代框架的演进
-->
<template>
  <div class="evolution-timeline">
    <div class="demo-header">
      <span class="icon">🚀</span>
      <span class="title">前端演进时间线</span>
      <span class="subtitle">从"贴海报"到"搭乐高"的20年变迁</span>
    </div>

    <div class="demo-content">
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
            <div class="era-dot">
              {{ era.emoji }}
            </div>
            <div
              v-if="index < eras.length - 1"
              class="era-line"
            />
          </div>

          <div class="era-content">
            <div class="era-header">
              <span class="era-year">{{ era.year }}</span>
              <span class="era-name">{{ era.name }}</span>
            </div>

            <div class="era-brief">
              {{ era.brief }}
            </div>

            <Transition name="expand">
              <div
                v-if="activeEra === era.id"
                class="era-detail"
              >
                <div class="detail-section">
                  <div class="section-title">
                    🔑 关键技术
                  </div>
                  <div class="tech-tags">
                    <span
                      v-for="tech in era.technologies.slice(0, 5)"
                      :key="tech"
                      class="tech-tag"
                    >{{ tech }}</span>
                  </div>
                </div>

                <div
                  v-if="era.metaphor"
                  class="detail-section"
                >
                  <div class="section-title">
                    💡 生活比喻
                  </div>
                  <div class="metaphor-box">
                    {{ era.metaphor }}
                  </div>
                </div>
              </div>
            </Transition>
          </div>
        </div>
      </div>
    </div>

    <div class="info-box">
      <span class="icon">💡</span>
      <strong>核心思想：</strong>前端技术的演进，本质是为了解决两个问题：提升开发效率（从手动到自动化）和支撑更复杂的应用（从简单页面到桌面级应用）。
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
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg-soft);
  padding: 0.75rem;
  margin: 0.5rem 0;
}

.demo-header {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  margin-bottom: 0.5rem;
}

.demo-header .icon {
  font-size: 1rem;
}

.demo-header .title {
  font-weight: bold;
  font-size: 0.9rem;
}

.demo-header .subtitle {
  color: var(--vp-c-text-2);
  font-size: 0.75rem;
  margin-left: 0.25rem;
}

.demo-content {
  margin-bottom: 0.5rem;
}

/* 时间线容器 */
.timeline-container {
  position: relative;
}

.era-item {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
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
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: var(--vp-c-brand);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  z-index: 1;
  transition: all 0.3s ease;
}

.era-item:hover .era-dot {
  transform: scale(1.1);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
}

.era-line {
  width: 2px;
  flex: 1;
  background: var(--vp-c-divider);
  margin-top: 4px;
  min-height: 20px;
}

/* 内容区域 */
.era-content {
  flex: 1;
  background: var(--vp-c-bg);
  border-radius: 6px;
  padding: 0.5rem;
  border: 1px solid var(--vp-c-divider);
  transition: all 0.3s ease;
}

.era-item:hover .era-content {
  border-color: var(--vp-c-brand);
}

.era-item.active .era-content {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-bg-soft);
}

.era-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.25rem;
}

.era-year {
  padding: 1px 6px;
  background: var(--vp-c-brand);
  color: white;
  border-radius: 4px;
  font-size: 0.65rem;
  font-weight: bold;
}

.era-name {
  font-size: 0.85rem;
  font-weight: bold;
  color: var(--vp-c-text-1);
}

.era-brief {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  line-height: 1.4;
}

/* 详情展开 */
.era-detail {
  margin-top: 0.5rem;
  padding-top: 0.5rem;
  border-top: 1px dashed var(--vp-c-divider);
}

.detail-section {
  margin-bottom: 0.4rem;
}

.detail-section:last-child {
  margin-bottom: 0;
}

.section-title {
  font-size: 0.7rem;
  font-weight: bold;
  color: var(--vp-c-brand);
  margin-bottom: 0.25rem;
}

.tech-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem;
}

.tech-tag {
  padding: 1px 6px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-brand);
  border-radius: 4px;
  font-size: 0.65rem;
  font-weight: 500;
}

.metaphor-box {
  background: var(--vp-c-bg-alt);
  border-left: 2px solid var(--vp-c-brand);
  padding: 0.4rem;
  border-radius: 4px;
  font-size: 0.7rem;
  color: var(--vp-c-text-2);
  line-height: 1.5;
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
  
  opacity: 1;
}

.info-box {
  background: var(--vp-c-bg-alt);
  padding: 0.75rem;
  border-radius: 6px;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  display: flex;
  gap: 0.25rem;
}

.info-box .icon {
  flex-shrink: 0;
}

.info-box strong {
  color: var(--vp-c-text-1);
}
</style>
