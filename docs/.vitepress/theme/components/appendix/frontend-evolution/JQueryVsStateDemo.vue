<!--
  JQueryVsStateDemo.vue - 前端开发模式对比
  用"手工记账 vs 智能管家"的比喻来解释 jQuery vs Vue/React
-->
<template>
  <div class="jquery-vs-state-demo">
    <!-- 标题区 -->
    <div class="demo-header">
      <span class="icon">🔄</span>
      <span class="title">前端开发模式</span>
      <span class="subtitle">手动操作DOM vs 状态管理</span>
    </div>

    <!-- 主内容区 -->
    <div class="demo-content">
      <!-- 模式选择 -->
      <div class="mode-tabs">
        <button
          class="tab-btn"
          :class="{ active: mode === 'manual' }"
          @click="mode = 'manual'"
        >
          <span class="tab-icon">✍️</span>
          <span class="tab-text">手工记账</span>
          <span class="tab-sub">通俗说法: jQuery</span>
        </button>
        <button
          class="tab-btn"
          :class="{ active: mode === 'smart' }"
          @click="mode = 'smart'"
        >
          <span class="tab-icon">🤖</span>
          <span class="tab-text">智能管家</span>
          <span class="tab-sub">通俗说法: Vue/React</span>
        </button>
      </div>

      <!-- 对比展示区 -->
      <div class="comparison-showcase">
        <!-- 左侧：场景描述 -->
        <div class="scenario-panel">
          <div class="scenario-header">
            <span class="scenario-icon">{{ mode === 'manual' ? '👨‍🍳' : '🤖' }}</span>
            <span class="scenario-title">{{ mode === 'manual' ? '手工记账' : '智能管家' }}</span>
          </div>

          <div class="scenario-content">
            <div class="step-list">
              <div
                v-for="(step, index) in currentSteps"
                :key="index"
                class="step-item"
                :class="{ active: index === currentStep }"
              >
                <div class="step-number">
                  {{ index + 1 }}
                </div>
                <div class="step-text">
                  {{ step }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 右侧：账本展示 -->
        <div class="ledger-panel">
          <div class="ledger-header">
            <span class="ledger-icon">📒</span>
            <span class="ledger-title">今日账本</span>
            <span
              class="ledger-status"
              :class="mode"
            >{{ ledgerStatus }}</span>
          </div>

          <div class="ledger-content">
            <!-- 订单列表 -->
            <div class="order-list">
              <div
                v-for="order in orders"
                :key="order.id"
                class="order-item"
                :class="{ completed: order.completed }"
              >
                <div class="order-info">
                  <span class="order-name">{{ order.name }}</span>
                  <span class="order-price">¥{{ order.price }}</span>
                </div>
                <div class="order-status">
                  {{ order.completed ? '✓' : '○' }}
                </div>
              </div>
            </div>

            <!-- 总计 -->
            <div class="total-section">
              <div class="total-row">
                <span>菜品数量：</span>
                <span class="total-value">{{ completedCount }}/{{ orders.length }} 份</span>
              </div>
              <div class="total-row total-final">
                <span>今日营收：</span>
                <span class="total-amount">¥{{ totalRevenue }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 操作按钮 -->
      <div class="action-buttons">
        <button
          class="btn btn-primary"
          :disabled="isProcessing || allCompleted"
          @click="processOrder"
        >
          {{ isProcessing ? '处理中...' : allCompleted ? '今日完成！' : '下一道菜' }}
        </button>
        <button
          class="btn btn-secondary"
          @click="resetDemo"
        >
          重新开始
        </button>
      </div>
    </div>

    <!-- 信息框 -->
    <div class="info-box">
      <span class="icon">💡</span>
      <strong>核心思想:</strong>
      <span v-if="mode === 'manual'">jQuery需要手动查找和修改DOM,就像手工记账,容易出错。</span>
      <span v-else>Vue/React通过状态自动更新界面,就像智能管家,改数据界面自动变。</span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// 当前模式
const mode = ref('manual')

// 处理状态
const isProcessing = ref(false)
const currentStep = ref(0)

// 订单数据
const orders = ref([
  { id: 1, name: '宫保鸡丁', price: 38, completed: false },
  { id: 2, name: '鱼香肉丝', price: 32, completed: false },
  { id: 3, name: '麻婆豆腐', price: 18, completed: false },
  { id: 4, name: '糖醋排骨', price: 48, completed: false }
])

// 手工记账步骤
const manualSteps = [
  '翻开账本，找到对应菜品',
  '手动计算价格，写到本子上',
  '再算一遍总数，防止算错',
  '把完成的菜标记一下'
]

// 智能管家步骤
const smartSteps = [
  '告诉管家：这道菜做好了',
  '管家自动更新账本',
  '总数自动计算，不会出错',
  '所有数据实时同步'
]

// 当前步骤列表
const currentSteps = computed(() => {
  return mode.value === 'manual' ? manualSteps : smartSteps
})

// 计算属性
const completedCount = computed(() => orders.value.filter(o => o.completed).length)
const totalRevenue = computed(() => orders.value.filter(o => o.completed).reduce((sum, o) => sum + o.price, 0))
const allCompleted = computed(() => orders.value.every(o => o.completed))

const ledgerStatus = computed(() => {
  if (allCompleted.value) return '已完成'
  return mode.value === 'manual' ? '手工计算中...' : '自动同步中...'
})

// 处理下一道菜
const processOrder = async () => {
  if (isProcessing.value || allCompleted.value) return

  isProcessing.value = true
  currentStep.value = 0

  // 找到第一个未完成的订单
  const orderIndex = orders.value.findIndex(o => !o.completed)

  // 模拟步骤执行
  for (let i = 0; i < currentSteps.value.length; i++) {
    currentStep.value = i
    await sleep(400)
  }

  // 完成订单
  if (orderIndex !== -1) {
    orders.value[orderIndex].completed = true
  }

  isProcessing.value = false
  currentStep.value = 0
}

// 重置演示
const resetDemo = () => {
  isProcessing.value = false
  currentStep.value = 0
  orders.value.forEach(o => o.completed = false)
}

// 辅助函数
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms))
</script>

<style scoped>
.jquery-vs-state-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg-soft);
  padding: 0.75rem;
  margin: 0.5rem 0;
}

/* 标题区 */
.demo-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.demo-header .icon {
  font-size: 1.25rem;
}

.demo-header .title {
  font-weight: bold;
  font-size: 1rem;
}

.demo-header .subtitle {
  color: var(--vp-c-text-2);
  font-size: 0.85rem;
  margin-left: 0.5rem;
}

/* 主内容区 */
.demo-content {
  margin-bottom: 0.75rem;
}

/* 模式选项卡 */
.mode-tabs {
  display: flex;
  gap: 0.75rem;
  margin-bottom: 1rem;
  background: var(--vp-c-bg);
  padding: 0.5rem;
  border-radius: 6px;
  border: 2px solid var(--vp-c-divider);
}

.tab-btn {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  padding: 0.75rem;
  border: none;
  border-radius: 6px;
  background: transparent;
  cursor: pointer;
  transition: all 0.2s;
  color: var(--vp-c-text-1);
}

.tab-btn:hover {
  background: var(--vp-c-bg-alt);
}

.tab-btn.active {
  background: var(--vp-c-brand);
  color: white;
}

.tab-icon {
  font-size: 1.5rem;
}

.tab-text {
  font-size: 0.85rem;
  font-weight: bold;
}

.tab-sub {
  font-size: 0.75rem;
  opacity: 0.8;
}

/* 对比展示区 */
.comparison-showcase {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1rem;
}

@media (max-width: 768px) {
  .comparison-showcase {
    grid-template-columns: 1fr;
  }
}

/* 场景面板 */
.scenario-panel {
  background: var(--vp-c-bg);
  border-radius: 6px;
  border: 2px solid var(--vp-c-divider);
  overflow: hidden;
}

.scenario-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  background: var(--vp-c-bg-alt);
  border-bottom: 2px solid var(--vp-c-divider);
}

.scenario-icon {
  font-size: 1.5rem;
}

.scenario-title {
  font-size: 0.9rem;
  font-weight: bold;
  color: var(--vp-c-text-1);
}

.scenario-content {
  padding: 0.75rem;
}

.step-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.step-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  background: var(--vp-c-bg-alt);
  border-radius: 6px;
  transition: all 0.2s;
}

.step-item.active {
  background: var(--vp-c-brand);
  color: white;
  transform: translateX(4px);
}

.step-number {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  border-radius: 50%;
  font-size: 0.75rem;
  font-weight: bold;
}

.step-item.active .step-number {
  background: rgba(255, 255, 255, 0.2);
  color: white;
}

.step-text {
  font-size: 0.85rem;
  flex: 1;
}

/* 账本面板 */
.ledger-panel {
  background: var(--vp-c-bg);
  border-radius: 6px;
  border: 2px solid var(--vp-c-divider);
  overflow: hidden;
}

.ledger-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  background: var(--vp-c-bg-alt);
  border-bottom: 2px solid var(--vp-c-divider);
}

.ledger-icon {
  font-size: 1.5rem;
}

.ledger-title {
  flex: 1;
  font-size: 0.9rem;
  font-weight: bold;
  color: var(--vp-c-text-1);
}

.ledger-status {
  font-size: 0.75rem;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-2);
}

.ledger-status.manual {
  background: var(--vp-c-warning);
  color: white;
}

.ledger-status.smart {
  background: var(--vp-c-success);
  color: white;
}

.ledger-content {
  padding: 0.75rem;
}

.order-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.order-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem;
  background: var(--vp-c-bg-alt);
  border-radius: 6px;
  transition: all 0.2s;
}

.order-item.completed {
  background: var(--vp-c-success);
  border-left: 4px solid var(--vp-c-brand);
  opacity: 0.3;
}

.order-info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.order-name {
  font-size: 0.85rem;
  font-weight: bold;
  color: var(--vp-c-text-1);
}

.order-price {
  font-size: 0.75rem;
  color: var(--vp-c-brand);
  font-weight: bold;
}

.order-status {
  font-size: 1rem;
}

.total-section {
  border-top: 2px dashed var(--vp-c-divider);
  padding-top: 0.75rem;
}

.total-row {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

.total-row.total-final {
  font-size: 0.9rem;
  font-weight: bold;
  color: var(--vp-c-text-1);
  border-top: 2px solid var(--vp-c-divider);
  margin-top: 0.5rem;
  padding-top: 0.75rem;
}

.total-amount {
  color: var(--vp-c-success);
  font-size: 1.1rem;
}

/* 操作按钮 */
.action-buttons {
  display: flex;
  justify-content: center;
  gap: 0.75rem;
}

.btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s;
}

.btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-primary {
  background: var(--vp-c-brand);
  color: white;
}

.btn-secondary {
  background: var(--vp-c-bg-alt);
  color: var(--vp-c-text-1);
}

/* 信息框 */
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
