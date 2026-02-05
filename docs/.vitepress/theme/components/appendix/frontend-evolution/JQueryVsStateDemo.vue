<!--
  JQueryVsStateDemo.vue - 餐厅账本对比
  用"手工记账 vs 智能管家"的比喻来解释 jQuery vs Vue/React
-->
<template>
  <div class="restaurant-demo">
    <!-- 故事引入 -->
    <div class="story-intro">
      <div class="story-icon">👨‍🍳📒🤖</div>
      <h3 class="story-title">老张的餐厅账本</h3>
      <p class="story-desc">
        老张开了家餐厅，每天要点菜、做菜、算账。有两种记账方式：<br>
        <strong>传统方式：老张手工记</strong>（jQuery 模式） vs <strong>智能方式：请个管家</strong>（Vue/React 模式）<br>
        看看哪种更轻松？
      </p>
    </div>

    <!-- 模式选择 -->
    <div class="mode-tabs">
      <button
        class="tab-btn"
        :class="{ active: mode === 'manual' }"
        @click="mode = 'manual'"
      >
        <span class="tab-icon">✍️</span>
        <span class="tab-text">手工记账</span>
        <span class="tab-sub">jQuery 方式</span>
      </button>
      <button
        class="tab-btn"
        :class="{ active: mode === 'smart' }"
        @click="mode = 'smart'"
      >
        <span class="tab-icon">🤖</span>
        <span class="tab-text">智能管家</span>
        <span class="tab-sub">Vue/React 方式</span>
      </button>
    </div>

    <!-- 对比展示区 -->
    <div class="comparison-showcase">
      <!-- 左侧：场景描述 -->
      <div class="scenario-panel">
        <div class="scenario-header">
          <span class="scenario-icon">{{ mode === 'manual' ? '👨‍🍳' : '🤖' }}</span>
          <span class="scenario-title">{{ mode === 'manual' ? '老张手工记账' : '智能管家记账' }}</span>
        </div>

        <div class="scenario-content">
          <div class="step-list">
            <div
              v-for="(step, index) in currentSteps"
              :key="index"
              class="step-item"
              :class="{ active: index === currentStep }"
            >
              <div class="step-number">{{ index + 1 }}</div>
              <div class="step-text">{{ step }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 右侧：账本展示 -->
      <div class="ledger-panel">
        <div class="ledger-header">
          <span class="ledger-icon">📒</span>
          <span class="ledger-title">今日账本</span>
          <span class="ledger-status" :class="mode">{{ ledgerStatus }}</span>
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
        @click="processOrder"
        :disabled="isProcessing || allCompleted"
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

    <!-- 优缺点对比 -->
    <div class="comparison-table">
      <div class="table-header">
        <div class="table-title">💡 两种方式对比</div>
      </div>
      <div class="table-content">
        <div class="comparison-row header">
          <div class="col-feature">特点</div>
          <div class="col-manual">手工记账 (jQuery)</div>
          <div class="col-smart">智能管家 (Vue/React)</div>
        </div>
        <div class="comparison-row">
          <div class="col-feature">工作方式</div>
          <div class="col-manual">手动改每一处</div>
          <div class="col-smart">改数据，界面自动变</div>
        </div>
        <div class="comparison-row">
          <div class="col-feature">容易出错</div>
          <div class="col-manual">容易漏改某处</div>
          <div class="col-smart">自动同步，不易错</div>
        </div>
        <div class="comparison-row">
          <div class="col-feature">适合场景</div>
          <div class="col-manual">简单页面</div>
          <div class="col-smart">复杂交互应用</div>
        </div>
      </div>
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
.restaurant-demo {
  border: 2px solid #e8e8e8;
  border-radius: 16px;
  background: linear-gradient(135deg, #fafbfc 0%, #f0f4f8 100%);
  padding: 24px;
  margin: 20px 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif;
}

/* 故事引入 */
.story-intro {
  text-align: center;
  margin-bottom: 24px;
  padding: 20px;
  background: linear-gradient(135deg, #fff8e1, #ffecb3);
  border-radius: 16px;
  border: 2px dashed #ffc107;
}

.story-icon {
  font-size: 48px;
  margin-bottom: 12px;
}

.story-title {
  font-size: 24px;
  font-weight: bold;
  color: #e65100;
  margin: 0 0 8px 0;
}

.story-desc {
  font-size: 14px;
  color: #666;
  line-height: 1.6;
  margin: 0;
}

/* 模式选项卡 */
.mode-tabs {
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
  background: white;
  padding: 8px;
  border-radius: 12px;
  border: 2px solid #e0e0e0;
}

.tab-btn {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 16px;
  border: none;
  border-radius: 8px;
  background: transparent;
  cursor: pointer;
  transition: all 0.3s ease;
}

.tab-btn:hover {
  background: #f5f5f5;
}

.tab-btn.active {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
}

.tab-icon {
  font-size: 32px;
}

.tab-text {
  font-size: 14px;
  font-weight: bold;
}

.tab-sub {
  font-size: 12px;
  opacity: 0.8;
}

/* 对比展示区 */
.comparison-showcase {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 24px;
}

@media (max-width: 768px) {
  .comparison-showcase {
    grid-template-columns: 1fr;
  }
}

/* 场景面板 */
.scenario-panel {
  background: white;
  border-radius: 16px;
  border: 2px solid #e0e0e0;
  overflow: hidden;
}

.scenario-header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background: linear-gradient(135deg, #ffecb3, #ffe082);
  border-bottom: 2px solid #e0e0e0;
}

.scenario-icon {
  font-size: 28px;
}

.scenario-title {
  font-size: 16px;
  font-weight: bold;
  color: #333;
}

.scenario-content {
  padding: 16px;
}

.step-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.step-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: #f5f5f5;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.step-item.active {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  transform: translateX(8px);
}

.step-number {
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  color: #333;
  border-radius: 50%;
  font-size: 12px;
  font-weight: bold;
}

.step-item.active .step-number {
  background: rgba(255, 255, 255, 0.2);
  color: white;
}

.step-text {
  font-size: 14px;
  flex: 1;
}

/* 账本面板 */
.ledger-panel {
  background: white;
  border-radius: 16px;
  border: 2px solid #e0e0e0;
  overflow: hidden;
}

.ledger-header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background: linear-gradient(135deg, #c8e6c9, #a5d6a7);
  border-bottom: 2px solid #e0e0e0;
}

.ledger-icon {
  font-size: 28px;
}

.ledger-title {
  flex: 1;
  font-size: 16px;
  font-weight: bold;
  color: #333;
}

.ledger-status {
  font-size: 12px;
  padding: 4px 12px;
  border-radius: 12px;
  background: white;
  color: #666;
}

.ledger-status.manual {
  background: #fff3e0;
  color: #e65100;
}

.ledger-content {
  padding: 16px;
}

.order-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 16px;
}

.order-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px;
  background: #f5f5f5;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.order-item.completed {
  background: #e8f5e9;
  border-left: 4px solid #4caf50;
}

.order-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.order-name {
  font-size: 14px;
  font-weight: bold;
  color: #333;
}

.order-price {
  font-size: 13px;
  color: #e65100;
  font-weight: bold;
}

.order-status {
  font-size: 18px;
}

.total-section {
  border-top: 2px dashed #e0e0e0;
  padding-top: 12px;
}

.total-row {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  font-size: 14px;
  color: #666;
}

.total-row.total-final {
  font-size: 16px;
  font-weight: bold;
  color: #333;
  border-top: 2px solid #e0e0e0;
  margin-top: 8px;
  padding-top: 12px;
}

.total-amount {
  color: #4caf50;
  font-size: 20px;
}

/* 操作按钮 */
.action-buttons {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-bottom: 24px;
}

.btn {
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
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
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
}

.btn-secondary {
  background: #f5f5f5;
  color: #666;
}

/* 对比表格 */
.comparison-table {
  background: white;
  border-radius: 16px;
  border: 2px solid #e0e0e0;
  overflow: hidden;
}

.table-header {
  padding: 16px;
  background: linear-gradient(135deg, #e3f2fd, #bbdefb);
  border-bottom: 2px solid #e0e0e0;
}

.table-title {
  font-size: 16px;
  font-weight: bold;
  color: #1565c0;
}

.table-content {
  padding: 0;
}

.comparison-row {
  display: grid;
  grid-template-columns: 1.2fr 1.4fr 1.4fr;
  gap: 16px;
  padding: 16px;
  border-bottom: 1px solid #e0e0e0;
}

.comparison-row:last-child {
  border-bottom: none;
}

.comparison-row.header {
  background: #f5f5f5;
  font-weight: bold;
  color: #333;
}

.col-feature {
  color: #666;
}

.col-manual {
  color: #e65100;
}

.col-smart {
  color: #4caf50;
}

.comparison-row.header .col-manual,
.comparison-row.header .col-smart {
  color: #333;
}

/* 响应式 */
@media (max-width: 768px) {
  .comparison-showcase {
    grid-template-columns: 1fr;
  }

  .comparison-row {
    grid-template-columns: 1fr;
    gap: 8px;
  }

  .comparison-row.header {
    display: none;
  }

  .mode-tabs {
    flex-direction: column;
  }
}
</style>
