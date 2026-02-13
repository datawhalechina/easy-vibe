<script setup>
import { ref, computed } from 'vue'

const checklist = ref([
  { id: 1, category: '代码', task: '代码已通过测试', checked: true, critical: true },
  { id: 2, category: '代码', task: '移除调试代码和 console.log', checked: false, critical: false },
  { id: 3, category: '环境', task: '生产环境配置已设置', checked: true, critical: true },
  { id: 4, category: '环境', task: '数据库迁移脚本已准备', checked: false, critical: true },
  { id: 5, category: '环境', task: '环境变量已配置', checked: true, critical: true },
  { id: 6, category: '安全', task: '敏感信息已从代码中移除', checked: true, critical: true },
  { id: 7, category: '安全', task: 'HTTPS 证书已配置', checked: false, critical: true },
  { id: 8, category: '安全', task: '防火墙规则已设置', checked: true, critical: false },
  { id: 9, category: '性能', task: '静态资源已压缩', checked: true, critical: false },
  { id: 10, category: '性能', task: 'CDN 已配置', checked: false, critical: false },
  { id: 11, category: '监控', task: '日志收集已启用', checked: true, critical: false },
  { id: 12, category: '监控', task: '错误监控已配置', checked: false, critical: true },
  { id: 13, category: '备份', task: '数据备份策略已确认', checked: true, critical: true },
  { id: 14, category: '回滚', task: '回滚方案已准备', checked: false, critical: true },
  { id: 15, category: '文档', task: '部署文档已更新', checked: false, critical: false }
])

const categories = computed(() => {
  const cats = [...new Set(checklist.value.map(item => item.category))]
  return cats
})

const itemsByCategory = (category) => {
  return checklist.value.filter(item => item.category === category)
}

const totalTasks = computed(() => checklist.value.length)
const completedTasks = computed(() => checklist.value.filter(item => item.checked).length)
const progress = computed(() => Math.round((completedTasks.value / totalTasks.value) * 100))

const criticalCompleted = computed(() => {
  const criticalItems = checklist.value.filter(item => item.critical)
  return criticalItems.filter(item => item.checked).length
})

const criticalTotal = computed(() => checklist.value.filter(item => item.critical).length)
const allCriticalDone = computed(() => criticalCompleted.value === criticalTotal.value)

const readyToDeploy = computed(() => {
  return progress.value === 100 && allCriticalDone.value
})
</script>

<template>
  <div class="deployment-checklist">
    <div class="demo-header">
      <h3>上线前检查清单</h3>
      <p class="subtitle">确保万无一失的起飞前检查</p>
    </div>

    <div class="intro-text">
      <p>
        就像飞机起飞前飞行员要逐项检查<strong>仪表盘</strong>、<strong>油量</strong>、<strong>跑道</strong>，
        软件上线前的检查清单能避免很多低级错误导致的线上事故。
      </p>
    </div>

    <div class="demo-content">
      <!-- 进度概览 -->
      <div class="progress-overview">
        <div class="progress-circle">
          <div class="progress-value" :class="{ success: progress === 100 }">
            {{ progress }}%
          </div>
          <svg class="progress-ring" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              :stroke="progress === 100 ? 'var(--vp-c-brand-delta)' : 'var(--vp-c-bg-alt)'"
              stroke-width="8"
            />
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              :stroke="readyToDeploy ? 'var(--vp-c-brand-delta)' : 'var(--vp-c-brand)'"
              stroke-width="8"
              stroke-dasharray="283"
              :stroke-dashoffset="283 - (283 * progress) / 100"
              transform="rotate(-90 50 50)"
              class="progress-ring-circle"
            />
          </svg>
        </div>

        <div class="progress-stats">
          <div class="stat-item">
            <span class="stat-value">{{ completedTasks }}/{{ totalTasks }}</span>
            <span class="stat-label">总任务</span>
          </div>
          <div class="stat-item critical">
            <span class="stat-value">{{ criticalCompleted }}/{{ criticalTotal }}</span>
            <span class="stat-label">关键任务</span>
          </div>
          <div class="deploy-status" :class="{ ready: readyToDeploy }">
            {{ readyToDeploy ? '✅ 准备就绪' : '⚠️ 还有待办项' }}
          </div>
        </div>
      </div>

      <!-- 分类检查清单 -->
      <div class="checklist-categories">
        <div
          v-for="category in categories"
          :key="category"
          class="category-section"
        >
          <div class="category-title">{{ category }}</div>
          <div class="checklist-items">
            <div
              v-for="item in itemsByCategory(category)"
              :key="item.id"
              class="checklist-item"
              :class="{ checked: item.checked, critical: item.critical }"
            >
              <label class="checkbox-wrapper">
                <input
                  type="checkbox"
                  v-model="item.checked"
                  class="checkbox"
                />
                <span class="checkbox-custom"></span>
                <span class="task-text">{{ item.task }}</span>
                <span v-if="item.critical" class="critical-badge">关键</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      <!-- 提示信息 -->
      <div v-if="!allCriticalDone" class="warning-box">
        <span class="warning-icon">⚠️</span>
        <span class="warning-text">
          还有 <strong>{{ criticalTotal - criticalCompleted }}</strong> 项关键任务未完成，
          建议优先处理这些关键项后再上线。
        </span>
      </div>

      <div v-else-if="progress < 100" class="info-box-inline">
        <span class="info-icon">ℹ️</span>
        <span class="info-text">
          关键任务已完成！还有 <strong>{{ totalTasks - completedTasks }}</strong> 项可选任务，
          建议尽快完成以提升系统稳定性。
        </span>
      </div>

      <div v-else class="success-box">
        <span class="success-icon">🎉</span>
        <span class="success-text">
          太棒了！所有检查项都已完成，可以放心上线了！
        </span>
      </div>
    </div>

    <div class="info-box">
      <p>
        💡 <strong>最佳实践</strong>：将此检查清单集成到 CI/CD 流程中，
        关键项不通过则禁止自动部署，避免人为疏忽导致线上故障。
      </p>
    </div>
  </div>
</template>

<style scoped>
.deployment-checklist {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background-color: var(--vp-c-bg-soft);
  max-height: 600px;
  overflow-y: auto;
  margin: 1rem 0;
}

.demo-header {
  padding: 1.25rem;
  background: var(--vp-c-bg);
  border-bottom: 1px solid var(--vp-c-divider);
}

.demo-header h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1.2rem;
  color: var(--vp-c-text-1);
}

.subtitle {
  margin: 0;
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
}

.intro-text {
  padding: 1rem 1.25rem;
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  line-height: 1.6;
  border-bottom: 1px solid var(--vp-c-divider);
}

.demo-content {
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.progress-overview {
  background: var(--vp-c-bg);
  border-radius: 8px;
  padding: 1.5rem;
  border: 1px solid var(--vp-c-divider);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
}

.progress-circle {
  position: relative;
  width: 100px;
  height: 100px;
}

.progress-ring {
  width: 100%;
  height: 100%;
}

.progress-ring-circle {
  transition: stroke-dashoffset 0.5s ease;
}

.progress-value {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--vp-c-brand);
}

.progress-value.success {
  color: var(--vp-c-brand-delta);
}

.progress-stats {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.stat-item {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.stat-value {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
  font-family: var(--vp-font-family-mono);
}

.stat-label {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
}

.stat-item.critical .stat-value {
  color: #ef4444;
}

.deploy-status {
  font-size: 0.9rem;
  font-weight: 600;
  padding: 0.5rem 1rem;
  background: #fef3c7;
  color: #92400e;
  border-radius: 6px;
  text-align: center;
}

.deploy-status.ready {
  background: var(--vp-c-brand-dimm);
  color: var(--vp-c-brand-delta);
}

.checklist-categories {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.category-section {
  background: var(--vp-c-bg);
  border-radius: 8px;
  padding: 1rem;
  border: 1px solid var(--vp-c-divider);
}

.category-title {
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
  margin-bottom: 0.75rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid var(--vp-c-divider);
}

.checklist-items {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.checklist-item {
  padding: 0.75rem;
  border-radius: 6px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  transition: all 0.3s ease;
}

.checklist-item.checked {
  background: var(--vp-c-brand-dimm);
  border-color: var(--vp-c-brand-delta);
}

.checklist-item.critical {
  border-left: 3px solid #ef4444;
}

.checklist-item.critical.checked {
  border-left-color: var(--vp-c-brand-delta);
}

.checkbox-wrapper {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  user-select: none;
}

.checkbox {
  position: absolute;
  opacity: 0;
  pointer-events: none;
}

.checkbox-custom {
  width: 20px;
  height: 20px;
  border: 2px solid var(--vp-c-divider);
  border-radius: 4px;
  position: relative;
  transition: all 0.3s ease;
  flex-shrink: 0;
}

.checkbox:checked + .checkbox-custom {
  background: var(--vp-c-brand);
  border-color: var(--vp-c-brand);
}

.checkbox:checked + .checkbox-custom::after {
  content: '✓';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 0.75rem;
  font-weight: 700;
}

.task-text {
  flex: 1;
  font-size: 0.9rem;
  color: var(--vp-c-text-1);
}

.checklist-item.checked .task-text {
  text-decoration: line-through;
  color: var(--vp-c-text-3);
}

.critical-badge {
  font-size: 0.7rem;
  padding: 0.15rem 0.4rem;
  background: #fee2e2;
  color: #dc2626;
  border-radius: 4px;
  font-weight: 600;
}

.warning-box,
.info-box-inline,
.success-box {
  padding: 1rem;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.warning-box {
  background: #fef3c7;
  border-left: 3px solid #f59e0b;
}

.info-box-inline {
  background: #dbeafe;
  border-left: 3px solid #3b82f6;
}

.success-box {
  background: var(--vp-c-brand-dimm);
  border-left: 3px solid var(--vp-c-brand-delta);
}

.warning-icon,
.info-icon,
.success-icon {
  font-size: 1.2rem;
}

.warning-text,
.info-text,
.success-text {
  flex: 1;
  font-size: 0.9rem;
  color: var(--vp-c-text-1);
  line-height: 1.5;
}

.info-box {
  padding: 1rem 1.25rem;
  margin: 0;
  background: var(--vp-c-bg);
  border-top: 1px solid var(--vp-c-divider);
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  line-height: 1.6;
}

.info-box p {
  margin: 0;
}

@media (max-width: 640px) {
  .progress-overview {
    flex-direction: column;
  }

  .checkbox-wrapper {
    gap: 0.5rem;
  }

  .task-text {
    font-size: 0.85rem;
  }
}
</style>
