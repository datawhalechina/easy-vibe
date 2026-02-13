<!--
  RenderingStrategyDemo.vue - 渲染策略对比
  用"餐厅上菜"的比喻来解释 CSR、SSR、SSG 三种渲染方式
-->
<template>
  <div class="rendering-demo">
    <!-- 故事引入 -->
    <div class="story-box">
      <div class="story-emoji">🍽️👨‍🍳⚡</div>
      <h4 class="story-title">小美的餐厅</h4>
      <p class="story-text">
        小美开了家餐厅，有三种上菜方式：<br>
        <strong>CSR（客户端渲染）</strong>：给你半成品食材包，你自己做 <br>
        <strong>SSR（服务端渲染）</strong>：厨房做好菜端给你 <br>
        <strong>SSG（静态生成）</strong>：提前做好所有菜放保温柜
      </p>
    </div>

    <!-- 模式选择 -->
    <div class="mode-tabs">
      <button
        v-for="strategy in strategies"
        :key="strategy.id"
        class="tab-btn"
        :class="{ active: activeStrategy === strategy.id }"
        @click="activeStrategy = strategy.id"
      >
        <span class="tab-icon">{{ strategy.icon }}</span>
        <span class="tab-name">{{ strategy.name }}</span>
        <span class="tab-sub">{{ strategy.sub }}</span>
      </button>
    </div>

    <!-- 演示区域 -->
    <div class="demo-container">
      <!-- 客户区 -->
      <div class="customer-area">
        <div class="customer-icon">🧑‍🦰</div>
        <div class="customer-label">用户（浏览器）</div>
        <div class="table">
          <div v-if="activeStrategy === 'csr'" class="table-content">
            <div class="ingredients-pack">
              <div class="pack-label">📦 食材包</div>
              <div class="pack-content">
                <div class="ingredient">🥬 菜叶</div>
                <div class="ingredient">🥩 肉片</div>
                <div class="ingredient">🧂 调料</div>
              </div>
              <div class="instruction">↑ 请自己烹饪</div>
            </div>
          </div>
          <div v-else class="table-content ready">
            <div class="dish">{{ currentStrategy.dish }}</div>
            <div class="dish-status">{{ currentStrategy.readyStatus }}</div>
          </div>
        </div>
      </div>

      <!-- 传输区 -->
      <div class="transfer-area">
        <div v-if="isAnimating" class="transfer-animation">
          <div class="transfer-content">{{ currentStrategy.transferItem }}</div>
          <div class="transfer-arrow">→</div>
        </div>
        <div v-else class="transfer-info">
          <div class="info-label">{{ currentStrategy.transferLabel }}</div>
        </div>
      </div>

      <!-- 厨房/服务器 -->
      <div class="kitchen-area">
        <div class="kitchen-icon">👨‍🍳</div>
        <div class="kitchen-label">{{ currentStrategy.serverLabel }}</div>
        <div class="kitchen-content">
          <div v-if="activeStrategy === 'csr'" class="server-station">
            <div class="station-icon">📡</div>
            <div class="station-label">配送站</div>
            <div class="station-desc">只管配送，不做菜</div>
          </div>
          <div v-else-if="activeStrategy === 'ssr'" class="server-kitchen">
            <div class="chef-action">{{ chefAction }}</div>
            <div class="cooking-pot" v-if="isCooking">🍳</div>
          </div>
          <div v-else class="server-cabinet">
            <div class="cabinet-icon">🗄️</div>
            <div class="cabinet-label">保温柜</div>
            <div class="cabinet-desc">{{ currentStrategy.cabinetDesc }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 性能指标 -->
    <div class="metrics-panel">
      <div class="metric-item">
        <div class="metric-label">首屏速度</div>
        <div class="metric-bar">
          <div class="metric-fill" :style="{ width: currentStrategy.firstScreenScore + '%', background: currentStrategy.color }"></div>
        </div>
        <div class="metric-value" :style="{ color: currentStrategy.color }">{{ currentStrategy.firstScreenText }}</div>
      </div>
      <div class="metric-item">
        <div class="metric-label">交互体验</div>
        <div class="metric-bar">
          <div class="metric-fill" :style="{ width: currentStrategy.interactionScore + '%', background: currentStrategy.color }"></div>
        </div>
        <div class="metric-value" :style="{ color: currentStrategy.color }">{{ currentStrategy.interactionText }}</div>
      </div>
      <div class="metric-item">
        <div class="metric-label">SEO 友好度</div>
        <div class="metric-bar">
          <div class="metric-fill" :style="{ width: currentStrategy.seoScore + '%', background: currentStrategy.color }"></div>
        </div>
        <div class="metric-value" :style="{ color: currentStrategy.color }">{{ currentStrategy.seoText }}</div>
      </div>
    </div>

    <!-- 操作按钮 -->
    <div class="controls">
      <button class="btn btn-primary" @click="startDemo" :disabled="isAnimating">
        {{ isAnimating ? '演示中...' : '开始演示' }}
      </button>
      <button class="btn btn-secondary" @click="resetDemo">
        重置
      </button>
    </div>

    <!-- 详细对比表 -->
    <div class="comparison-table">
      <div class="table-title">📊 三种渲染方式详细对比</div>
      <div class="table-content">
        <div class="comparison-row header">
          <div class="col-feature">特点</div>
          <div class="col-csr">CSR</div>
          <div class="col-ssr">SSR</div>
          <div class="col-ssg">SSG</div>
        </div>
        <div class="comparison-row">
          <div class="col-feature">比喻</div>
          <div class="col-csr">给半成品食材包，自己做</div>
          <div class="col-ssr">厨房做好菜端给你</div>
          <div class="col-ssg">提前做好放保温柜</div>
        </div>
        <div class="comparison-row">
          <div class="col-feature">首屏速度</div>
          <div class="col-csr">慢（要等 JS）</div>
          <div class="col-ssr">快（直接给 HTML）</div>
          <div class="col-ssg">最快（直接给 HTML）</div>
        </div>
        <div class="comparison-row">
          <div class="col-feature">交互体验</div>
          <div class="col-csr">流畅（已在浏览器）</div>
          <div class="col-ssr">较流畅（交互仍需 JS）</div>
          <div class="col-ssg">较流畅（交互仍需 JS）</div>
        </div>
        <div class="comparison-row">
          <div class="col-feature">SEO 友好度</div>
          <div class="col-csr">差（搜不到内容）</div>
          <div class="col-ssr">好（完整 HTML）</div>
          <div class="col-ssg">好（完整 HTML）</div>
        </div>
        <div class="comparison-row">
          <div class="col-feature">服务器压力</div>
          <div class="col-csr">小（只传 JS）</div>
          <div class="col-ssr">大（每次都渲染）</div>
          <div class="col-ssg">最小（预渲染好）</div>
        </div>
        <div class="comparison-row">
          <div class="col-feature">适合场景</div>
          <div class="col-csr">后台系统、工具应用</div>
          <div class="col-ssr">新闻网站、电商首页</div>
          <div class="col-ssg">博客、文档站</div>
        </div>
        <div class="comparison-row">
          <div class="col-feature">代表框架</div>
          <div class="col-csr">React SPA、Vue SPA</div>
          <div class="col-ssr">Next.js SSR、Nuxt SSR</div>
          <div class="col-ssg">Next.js SSG、Nuxt SSG</div>
        </div>
      </div>
    </div>

    <!-- 核心要点 -->
    <div class="key-takeaway">
      <div class="takeaway-icon">🎯</div>
      <div class="takeaway-content">
        <strong>如何选择？</strong><br>
        <strong>CSR</strong>：适合需要复杂交互、不关心 SEO 的应用（如后台管理系统）<br>
        <strong>SSR</strong>：适合需要首屏快、SEO 好的动态内容网站（如新闻、电商）<br>
        <strong>SSG</strong>：适合内容固定的静态网站（如博客、文档站）<br>
        <strong>现代方案</strong>：混合渲染，首页用 SSG/SSR，后续页面用 CSR，兼顾速度和体验。
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const activeStrategy = ref('ssg')
const isAnimating = ref(false)
const isCooking = ref(false)
const chefAction = ref('👨‍🍳 准备中...')

const strategies = {
  csr: {
    id: 'csr',
    name: 'CSR',
    sub: '客户端渲染',
    icon: '📦',
    dish: '⚠️ 还没做',
    readyStatus: '等待用户自己烹饪',
    transferItem: '📦 食材包',
    transferLabel: '配送食材包',
    serverLabel: '服务器（配送站）',
    firstScreenScore: 40,
    firstScreenText: '慢',
    interactionScore: 100,
    interactionText: '流畅',
    seoScore: 20,
    seoText: '差',
    color: '#f44336',
    cabinetDesc: ''
  },
  ssr: {
    id: 'ssr',
    name: 'SSR',
    sub: '服务端渲染',
    icon: '👨‍🍳',
    dish: '🍲 刚做好的菜',
    readyStatus: '热腾腾，直接吃',
    transferItem: '🍲 做好的菜',
    transferLabel: '现做现送',
    serverLabel: '服务器（厨房）',
    firstScreenScore: 90,
    firstScreenText: '快',
    interactionScore: 85,
    interactionText: '较流畅',
    seoScore: 100,
    seoText: '好',
    color: '#2196f3',
    cabinetDesc: ''
  },
  ssg: {
    id: 'ssg',
    name: 'SSG',
    sub: '静态生成',
    icon: '🗄️',
    dish: '🍲 提前做好的菜',
    readyStatus: '保温中，直接吃',
    transferItem: '🍲 预制的菜',
    transferLabel: '直接取',
    serverLabel: '服务器（保温柜）',
    firstScreenScore: 100,
    firstScreenText: '最快',
    interactionScore: 85,
    interactionText: '较流畅',
    seoScore: 100,
    seoText: '好',
    color: '#4caf50',
    cabinetDesc: '所有菜都提前做好了'
  }
}

const currentStrategy = computed(() => strategies[activeStrategy.value])

// 开始演示
const startDemo = async () => {
  if (isAnimating.value) return

  isAnimating.value = true

  if (activeStrategy.value === 'csr') {
    // CSR: 传送食材包
    await sleep(1000)
  } else if (activeStrategy.value === 'ssr') {
    // SSR: 厨房做菜
    isCooking.value = true
    chefAction.value = '👨‍🍳 正在做菜...'
    await sleep(800)
    chefAction.value = '🍳 烹饪中...'
    await sleep(800)
    chefAction.value = '✅ 做好了！'
    isCooking.value = false
    await sleep(400)
  } else {
    // SSG: 直接取菜
    await sleep(600)
  }

  isAnimating.value = false
}

// 重置演示
const resetDemo = () => {
  isAnimating.value = false
  isCooking.value = false
  chefAction.value = '👨‍🍳 准备中...'
}

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms))
</script>

<style scoped>
.rendering-demo {
  border: 2px solid #e0e0e0;
  border-radius: 16px;
  background: linear-gradient(135deg, #fafbfc 0%, #f0f4f8 100%);
  padding: 24px;
  margin: 20px 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif;
}

/* 故事框 */
.story-box {
  text-align: center;
  margin-bottom: 24px;
  padding: 20px;
  background: linear-gradient(135deg, #fff8e1, #ffecb3);
  border-radius: 16px;
  border: 2px dashed #ffc107;
}

.story-emoji {
  font-size: 48px;
  margin-bottom: 8px;
}

.story-title {
  font-size: 20px;
  font-weight: bold;
  color: #8b4513;
  margin: 0 0 8px 0;
}

.story-text {
  font-size: 14px;
  color: #666;
  margin: 0;
  line-height: 1.6;
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

.tab-name {
  font-size: 16px;
  font-weight: bold;
}

.tab-sub {
  font-size: 12px;
  opacity: 0.8;
}

/* 演示容器 */
.demo-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 24px;
  background: white;
  border-radius: 16px;
  border: 2px solid #e0e0e0;
  padding: 20px;
  min-height: 300px;
}

.customer-area,
.kitchen-area {
  flex: 1;
  text-align: center;
}

.customer-icon,
.kitchen-icon {
  font-size: 48px;
  margin-bottom: 8px;
}

.customer-label,
.kitchen-label {
  font-size: 14px;
  font-weight: bold;
  color: #333;
  margin-bottom: 12px;
}

.table,
.kitchen-content {
  background: #f5f5f5;
  border-radius: 12px;
  padding: 16px;
  min-height: 160px;
}

/* 食材包 */
.ingredients-pack {
  text-align: center;
}

.pack-label {
  font-size: 16px;
  font-weight: bold;
  color: #f44336;
  margin-bottom: 12px;
}

.pack-content {
  display: flex;
  gap: 8px;
  justify-content: center;
  margin-bottom: 12px;
}

.ingredient {
  width: 48px;
  height: 48px;
  background: white;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
}

.instruction {
  font-size: 12px;
  color: #f44336;
  font-weight: 500;
}

/* 做好的菜 */
.table-content.ready {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.dish {
  font-size: 64px;
}

.dish-status {
  font-size: 14px;
  color: #4caf50;
  font-weight: bold;
}

/* 厨房区域 */
.server-station,
.server-kitchen,
.server-cabinet {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.station-icon,
.cabinet-icon {
  font-size: 48px;
}

.station-label,
.cabinet-label {
  font-size: 14px;
  font-weight: bold;
  color: #333;
}

.station-desc,
.cabinet-desc {
  font-size: 12px;
  color: #666;
}

.chef-action {
  font-size: 18px;
  font-weight: bold;
  color: #2196f3;
}

.cooking-pot {
  font-size: 64px;
  animation: cook 0.5s ease-in-out infinite;
}

@keyframes cook {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}

/* 传输区域 */
.transfer-area {
  flex: 0 0 120px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.transfer-animation {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  animation: slideRight 1s ease-in-out;
}

@keyframes slideRight {
  0% { transform: translateX(-20px); opacity: 0; }
  50% { opacity: 1; }
  100% { transform: translateX(20px); opacity: 0; }
}

.transfer-content {
  font-size: 40px;
}

.transfer-arrow {
  font-size: 32px;
  color: #4caf50;
}

.transfer-info {
  font-size: 12px;
  color: #666;
  text-align: center;
}

.info-label {
  padding: 8px 16px;
  background: #e0e0e0;
  border-radius: 8px;
}

/* 性能指标 */
.metrics-panel {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-bottom: 24px;
}

.metric-item {
  background: white;
  border-radius: 12px;
  padding: 16px;
  border: 2px solid #e0e0e0;
}

.metric-label {
  font-size: 13px;
  color: #666;
  margin-bottom: 8px;
  text-align: center;
}

.metric-bar {
  height: 12px;
  background: #f5f5f5;
  border-radius: 6px;
  overflow: hidden;
  margin-bottom: 8px;
}

.metric-fill {
  height: 100%;
  transition: width 0.5s ease;
  border-radius: 6px;
}

.metric-value {
  font-size: 14px;
  font-weight: bold;
  text-align: center;
}

/* 控制按钮 */
.controls {
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
  margin-bottom: 20px;
}

.table-title {
  padding: 16px;
  background: linear-gradient(135deg, #e3f2fd, #bbdefb);
  font-size: 16px;
  font-weight: bold;
  color: #1565c0;
  text-align: center;
}

.table-content {
  padding: 0;
}

.comparison-row {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 12px;
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
  font-size: 13px;
  font-weight: 500;
}

.col-csr {
  color: #f44336;
  font-size: 12px;
}

.col-ssr {
  color: #2196f3;
  font-size: 12px;
}

.col-ssg {
  color: #4caf50;
  font-size: 12px;
}

.comparison-row.header .col-csr,
.comparison-row.header .col-ssr,
.comparison-row.header .col-ssg {
  color: #333;
  font-size: 13px;
}

/* 核心要点 */
.key-takeaway {
  display: flex;
  gap: 16px;
  padding: 20px;
  background: linear-gradient(135deg, #d4edda, #c3e6cb);
  border-radius: 12px;
  border-left: 4px solid #28a745;
}

.takeaway-icon {
  font-size: 32px;
  flex-shrink: 0;
}

.takeaway-content {
  flex: 1;
  font-size: 14px;
  color: #155724;
  line-height: 1.8;
}

/* 响应式 */
@media (max-width: 768px) {
  .mode-tabs {
    flex-direction: column;
  }

  .demo-container {
    flex-direction: column;
    gap: 12px;
  }

  .transfer-area {
    transform: rotate(90deg);
  }

  .metrics-panel {
    grid-template-columns: 1fr;
  }

  .comparison-row {
    grid-template-columns: 1fr;
    gap: 8px;
  }

  .comparison-row.header {
    display: none;
  }
}
</style>
