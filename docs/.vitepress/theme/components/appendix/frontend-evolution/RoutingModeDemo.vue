<!--
  RoutingModeDemo.vue - MPA vs SPA 路由模式对比
  用"翻书 vs 换纸"的比喻来解释多页应用和单页应用的区别
-->
<template>
  <div class="routing-demo">
    <!-- 标题区 -->
    <div class="demo-header">
      <span class="icon">📖</span>
      <span class="title">路由模式对比</span>
      <span class="subtitle">MPA 多页应用 vs SPA 单页应用</span>
    </div>

    <!-- 主内容区 -->
    <div class="demo-content">
      <!-- 故事引入 -->
      <div class="story-box">
        <p class="story-text">
          <strong>通俗说法：</strong>小明喜欢看书，有两种看书方式：<br>
          <strong>MPA 方式（像翻书）</strong>：每翻一页都要换一本书<br>
          <strong>SPA 方式（像换纸）</strong>：在同一本书里换内容
        </p>
      </div>

      <!-- 模式选择 -->
      <div class="mode-selector">
        <div
          class="mode-card"
          :class="{ active: mode === 'mpa' }"
          @click="switchMode('mpa')"
        >
          <div class="mode-icon">
            📚
          </div>
          <div class="mode-name">
            MPA 多页应用
          </div>
          <div class="mode-sub">
            通俗说法: 像翻书
          </div>
          <div class="mode-desc">
            每点一次链接，浏览器向服务器要新页面
          </div>
        </div>

        <div class="vs-divider">
          VS
        </div>

        <div
          class="mode-card"
          :class="{ active: mode === 'spa' }"
          @click="switchMode('spa')"
        >
          <div class="mode-icon">
            📄
          </div>
          <div class="mode-name">
            SPA 单页应用
          </div>
          <div class="mode-sub">
            通俗说法: 像换纸
          </div>
          <div class="mode-desc">
            只加载一次，后续只切换内容
          </div>
        </div>
      </div>

      <!-- 动画演示 -->
      <div class="demo-area">
        <div class="demo-header">
          <span>当前模式：</span>
          <span
            class="mode-badge"
            :class="mode"
          >{{ mode === 'mpa' ? 'MPA 多页应用' : 'SPA 单页应用' }}</span>
        </div>

        <!-- 场景模拟 -->
        <div class="scene-container">
          <!-- 书架（服务器） -->
          <div class="server-side">
            <div class="server-icon">
              📚
            </div>
            <div class="server-label">
              书架（服务器）
            </div>
            <div class="books-shelf">
              <div
                v-for="page in pages"
                :key="page.id"
                class="book-item"
                :class="{
                  active: currentPage === page.id,
                  loading: mode === 'mpa' && isLoading && page.id === targetPage
                }"
              >
                {{ page.emoji }}
              </div>
            </div>
          </div>

          <!-- 传输过程 -->
          <div class="transfer-area">
            <div
              v-if="mode === 'mpa' && isLoading"
              class="transfer-animation"
            >
              <div class="transfer-icon">
                {{ pages.find(p => p.id === targetPage)?.emoji }}
              </div>
              <div class="transfer-arrow">
                →
              </div>
            </div>
            <div
              v-else
              class="transfer-placeholder"
            >
              <span>{{ mode === 'mpa' ? '点击页面传输' : '无需传输' }}</span>
            </div>
          </div>

          <!-- 阅读区（浏览器） -->
          <div class="browser-side">
            <div class="browser-icon">
              📖
            </div>
            <div class="browser-label">
              阅读区（浏览器）
            </div>
            <div class="reading-paper">
              <Transition
                :name="mode === 'mpa' ? 'page-flip' : 'content-fade'"
                mode="out-in"
              >
                <div
                  :key="currentPage"
                  class="page-content"
                >
                  <div class="page-emoji">
                    {{ getCurrentPage.emoji }}
                  </div>
                  <div class="page-title">
                    {{ getCurrentPage.title }}
                  </div>
                  <div class="page-text">
                    {{ getCurrentPage.content }}
                  </div>
                </div>
              </Transition>

              <!-- 状态保留测试 -->
              <div class="state-test">
                <div class="test-label">
                  ✏️ 状态保留测试：
                </div>
                <input
                  v-model="userInput"
                  type="text"
                  placeholder="在这里输入文字，然后切换页面..."
                  class="test-input"
                >
              </div>
            </div>
          </div>
        </div>

        <!-- 导航控制 -->
        <div class="navigation-controls">
          <div class="nav-label">
            切换页面：
          </div>
          <div class="nav-buttons">
            <button
              v-for="page in pages"
              :key="page.id"
              class="nav-btn"
              :class="{ active: currentPage === page.id }"
              :disabled="isLoading"
              @click="navigateTo(page.id)"
            >
              {{ page.emoji }} {{ page.title }}
            </button>
          </div>
        </div>

        <!-- 状态指示 -->
        <div class="status-indicator">
          <div
            v-if="mode === 'mpa'"
            class="status-text mpa"
          >
            <span class="status-icon">📚</span>
            <span>每次切换都要从书架拿新书（服务器请求）</span>
          </div>
          <div
            v-else
            class="status-text spa"
          >
            <span class="status-icon">⚡</span>
            <span>内容已经下载好了，切换不需要再拿（前端路由）</span>
          </div>
        </div>
      </div>

      <!-- 对比表格 -->
      <div class="comparison-table">
        <div class="table-title">
          📊 MPA vs SPA 对比
        </div>
        <div class="table-content">
          <div class="comparison-row header">
            <div class="col-feature">
              特点
            </div>
            <div class="col-mpa">
              MPA 多页应用
            </div>
            <div class="col-spa">
              SPA 单页应用
            </div>
          </div>
          <div class="comparison-row">
            <div class="col-feature">
              比喻
            </div>
            <div class="col-mpa">
              翻书：每翻一页换一本书
            </div>
            <div class="col-spa">
              换纸：同一本书里换内容
            </div>
          </div>
          <div class="comparison-row">
            <div class="col-feature">
              页面切换
            </div>
            <div class="col-mpa">
              每次都重新加载整个页面
            </div>
            <div class="col-spa">
              只加载一次，后续只切换内容
            </div>
          </div>
          <div class="comparison-row">
            <div class="col-feature">
              速度体验
            </div>
            <div class="col-mpa">
              每次都有"白屏-加载"的过程
            </div>
            <div class="col-spa">
              页面切换流畅，无白屏
            </div>
          </div>
          <div class="comparison-row">
            <div class="col-feature">
              状态保留
            </div>
            <div class="col-mpa">
              切换页面后，输入的内容会丢失
            </div>
            <div class="col-spa">
              切换页面后，输入的内容还在
            </div>
          </div>
          <div class="comparison-row">
            <div class="col-feature">
              搜索引擎
            </div>
            <div class="col-mpa">
              容易被搜索到（SEO 友好）
            </div>
            <div class="col-spa">
              需要额外处理才能被搜索到
            </div>
          </div>
          <div class="comparison-row">
            <div class="col-feature">
              首屏加载
            </div>
            <div class="col-mpa">
              服务器直接给 HTML，首屏快
            </div>
            <div class="col-spa">
              需要先下载 JS，首屏可能慢
            </div>
          </div>
          <div class="comparison-row">
            <div class="col-feature">
              适合场景
            </div>
            <div class="col-mpa">
              博客、新闻、企业官网
            </div>
            <div class="col-spa">
              淘宝、网易云音乐、后台系统
            </div>
          </div>
        </div>
      </div>

      <!-- 核心要点 -->
      <div class="info-box">
        <span class="icon">💡</span>
        <strong>核心思想：</strong>
        <strong>MPA</strong> 每次切换都要"整页刷新"，像翻书，适合内容为主的网站；
        <strong>SPA</strong> 只加载一次，后续"局部更新"，像换纸，适合交互复杂的应用。
        关键是：<strong>状态会不会丢</strong>。
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// 模式选择
const mode = ref('spa')
const currentPage = ref(1)
const targetPage = ref(1)
const isLoading = ref(false)
const userInput = ref('')

// 页面数据
const pages = [
  { id: 1, emoji: '🏠', title: '首页', content: '欢迎来到首页！这是网站的入口。' },
  { id: 2, emoji: '🛍️', title: '商品', content: '这里展示所有商品，可以浏览和购买。' },
  { id: 3, emoji: '🛒', title: '购物车', content: '购物车里有你选中的商品，可以结算。' },
  { id: 4, emoji: '👤', title: '我的', content: '这里是个人中心，查看订单和信息。' }
]

// 获取当前页面
const getCurrentPage = computed(() => {
  return pages.find(p => p.id === currentPage.value) || pages[0]
})

// 切换模式
const switchMode = (newMode) => {
  mode.value = newMode
  currentPage.value = 1
  userInput.value = ''
}

// 导航到指定页面
const navigateTo = async (pageId) => {
  if (pageId === currentPage.value || isLoading.value) return

  targetPage.value = pageId

  if (mode.value === 'mpa') {
    // MPA 模式：模拟网络请求延迟
    isLoading.value = true
    await sleep(800)
    currentPage.value = pageId
    isLoading.value = false
  } else {
    // SPA 模式：即时切换
    currentPage.value = pageId
  }
}

// 辅助函数
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms))
</script>

<style scoped>
.routing-demo {
  border: 2px solid var(--vp-c-divider);
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

/* 模式选择 */
.mode-selector {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  margin-bottom: 24px;
  flex-wrap: wrap;
}

.mode-card {
  flex: 1;
  min-width: 200px;
  max-width: 280px;
  background: white;
  border: 3px solid var(--vp-c-divider);
  border-radius: 16px;
  padding: 20px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.mode-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

.mode-card.active {
  border-color: #4caf50;
  background: #e8f5e9;
}

.mode-icon {
  font-size: 48px;
  margin-bottom: 12px;
}

.mode-name {
  font-size: 16px;
  font-weight: bold;
  color: #333;
  margin-bottom: 6px;
}

.mode-sub {
  font-size: 13px;
  color: #666;
  margin-bottom: 8px;
  font-weight: 500;
}

.mode-desc {
  font-size: 12px;
  color: #999;
}

.vs-divider {
  font-size: 24px;
  font-weight: bold;
  color: #999;
  padding: 0 8px;
}

/* 演示区域 */
.demo-area {
  background: white;
  border-radius: 16px;
  border: 2px solid var(--vp-c-divider);
  padding: 20px;
  margin-bottom: 24px;
}

.demo-header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-bottom: 20px;
  font-size: 14px;
}

.mode-badge {
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: bold;
}

.mode-badge.mpa {
  background: #fff3e0;
  color: #e65100;
}

.mode-badge.spa {
  background: #e3f2fd;
  color: #1565c0;
}

/* 场景模拟 */
.scene-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 20px;
  min-height: 280px;
}

.server-side,
.browser-side {
  flex: 1;
  text-align: center;
}

.server-icon,
.browser-icon {
  font-size: 32px;
  margin-bottom: 8px;
}

.server-label,
.browser-label {
  font-size: 12px;
  color: #666;
  margin-bottom: 12px;
}

.books-shelf {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
  padding: 12px;
  background: #f5f5f5;
  border-radius: 12px;
}

.book-item {
  width: 40px;
  height: 56px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  margin: 0 auto;
  transition: all 0.3s ease;
  opacity: 0.5;
}

.book-item.active {
  opacity: 1;
  transform: scale(1.1);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

.book-item.loading {
  animation: pulse 0.8s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.15); }
}

/* 传输区域 */
.transfer-area {
  flex: 0 0 100px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.transfer-animation {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  animation: slideRight 0.8s ease-in-out;
}

@keyframes slideRight {
  0% { transform: translateX(-20px); opacity: 0; }
  50% { opacity: 1; }
  100% { transform: translateX(20px); opacity: 0; }
}

.transfer-icon {
  font-size: 32px;
}

.transfer-arrow {
  font-size: 24px;
  color: #4caf50;
}

.transfer-placeholder {
  font-size: 12px;
  color: #999;
}

/* 阅读区 */
.reading-paper {
  background: white;
  border: 2px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 16px;
  min-height: 200px;
}

.page-content {
  text-align: center;
}

.page-emoji {
  font-size: 48px;
  margin-bottom: 12px;
}

.page-title {
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-bottom: 8px;
}

.page-text {
  font-size: 14px;
  color: #666;
  margin-bottom: 16px;
}

.state-test {
  margin-top: 16px;
  padding-top: 16px;
  border-top: 2px dashed var(--vp-c-divider);
}

.test-label {
  font-size: 12px;
  color: #666;
  margin-bottom: 8px;
  text-align: left;
}

.test-input {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  font-size: 13px;
  box-sizing: border-box;
}

.test-input:focus {
  outline: none;
  border-color: #667eea;
}

/* 导航控制 */
.navigation-controls {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-bottom: 16px;
  flex-wrap: wrap;
}

.nav-label {
  font-size: 13px;
  color: #666;
  font-weight: 500;
}

.nav-buttons {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.nav-btn {
  padding: 8px 16px;
  border: 2px solid var(--vp-c-divider);
  border-radius: 6px;
  background: white;
  cursor: pointer;
  font-size: 13px;
  transition: all 0.3s ease;
}

.nav-btn:hover:not(:disabled) {
  border-color: #667eea;
  color: #667eea;
}

.nav-btn.active {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  border-color: transparent;
}

.nav-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* 状态指示 */
.status-indicator {
  text-align: center;
  padding: 12px;
  border-radius: 6px;
  font-size: 13px;
}

.status-text {
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.status-text.mpa {
  background: #fff3e0;
  color: #e65100;
  padding: 8px 16px;
  border-radius: 6px;
}

.status-text.spa {
  background: #e3f2fd;
  color: #1565c0;
  padding: 8px 16px;
  border-radius: 6px;
}

.status-icon {
  font-size: 18px;
}

/* 对比表格 */
.comparison-table {
  background: white;
  border-radius: 16px;
  border: 2px solid var(--vp-c-divider);
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
  grid-template-columns: 1fr 1.5fr 1.5fr;
  gap: 16px;
  padding: 16px;
  border-bottom: 1px solid var(--vp-c-divider);
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
}

.col-mpa {
  color: #e65100;
  font-size: 13px;
}

.col-spa {
  color: #1565c0;
  font-size: 13px;
}

.comparison-row.header .col-mpa,
.comparison-row.header .col-spa {
  color: #333;
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
  line-height: 1.6;
}

/* 动画 */
.page-flip-enter-active,
.page-flip-leave-active {
  transition: all 0.4s ease;
}

.page-flip-enter-from {
  opacity: 0;
  transform: rotateY(-90deg);
}

.page-flip-leave-to {
  opacity: 0;
  transform: rotateY(90deg);
}

.content-fade-enter-active,
.content-fade-leave-active {
  transition: all 0.3s ease;
}

.content-fade-enter-from,
.content-fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

/* 响应式 */
@media (max-width: 768px) {
  .mode-selector {
    flex-direction: column;
  }

  .vs-divider {
    transform: rotate(90deg);
  }

  .scene-container {
    flex-direction: column;
  }

  .transfer-area {
    transform: rotate(90deg);
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
