<!--
  ResponsiveGridDemo.vue - 魔法衣柜
  用"衣服自动叠放"的比喻来解释响应式布局
-->
<template>
  <div class="magic-closet">
    <!-- 故事开头 -->
    <div class="story-box">
      <div class="story-emoji">👗✨🚪</div>
      <h4 class="story-title">小美的魔法衣柜</h4>
      <p class="story-text">
        小美有一件神奇的魔法衣柜！不管你把它放在大房间还是小房间，<br>
        <strong>里面的衣服都会自动叠好、排好，完美适应空间大小！</strong>
      </p>
    </div>

    <!-- 衣柜宽度调节 -->
    <div class="closet-control">
      <div class="control-label">
        <span>🚪 拖动把手，把衣柜放进不同房间：</span>
        <span class="room-label">{{ currentRoom.name }}</span>
      </div>

      <div class="slider-box">
        <span class="slider-emoji">🏠小</span>
        <input
          type="range"
          v-model="closetWidth"
          :min="280"
          :max="900"
          step="10"
          class="magic-slider"
        />
        <span class="slider-emoji">大🏰</span>
      </div>

      <div class="width-hint">
        当前衣柜宽度：<strong>{{ closetWidth }}px</strong> | 可以放下 <strong>{{ clothesPerRow }}</strong> 件衣服
      </div>
    </div>

    <!-- 魔法衣柜展示 -->
    <div class="closet-display" :style="{ width: closetWidth + 'px' }">
      <div class="closet-header">
        <span class="closet-icon">🚪</span>
        <span class="closet-title">小美的魔法衣柜</span>
        <span class="closet-icon">🪄</span>
      </div>

      <div class="closet-interior">
        <div class="clothes-rack" :style="rackStyle">
          <div
            v-for="(item, index) in clothes"
            :key="index"
            class="clothing-item"
            :class="{ 'folded': isSmallSpace }"
            :style="{ animationDelay: (index * 0.1) + 's' }"
          >
            <div class="item-hanger">🪝</div>
            <div class="item-emoji">{{ item.emoji }}</div>
            <div class="item-name">{{ item.name }}</div>
            <div class="fold-hint" v-if="isSmallSpace">叠好了!</div>
          </div>
        </div>
      </div>

      <div class="closet-footer">
        <span>✨ 衣服数量：{{ clothes.length }}件</span>
        <span>📐 排列方式：{{ arrangementMode }}</span>
      </div>
    </div>

    <!-- 魔法原理说明 -->
    <div class="magic-explain">
      <div class="explain-title">🔮 魔法原理揭秘</div>
      <div class="explain-cards">
        <div class="explain-card">
          <div class="card-icon">📱</div>
          <div class="card-title">小房间（手机）</div>
          <div class="card-desc">衣柜只有 320px 宽，衣服会自动叠起来，<strong>1列</strong>排开</div>
        </div>
        <div class="explain-arrow">➡️</div>
        <div class="explain-card">
          <div class="card-icon">📲</div>
          <div class="card-title">中房间（平板）</div>
          <div class="card-desc">衣柜有 768px 宽，衣服舒展开，<strong>2列</strong>排开</div>
        </div>
        <div class="explain-arrow">➡️</div>
        <div class="explain-card">
          <div class="card-icon">💻</div>
          <div class="card-title">大房间（电脑）</div>
          <div class="card-desc">衣柜有 1200px 宽，衣服完全展开，<strong>3列</strong>排开</div>
        </div>
      </div>
    </div>

    <!-- 代码展示 -->
    <div class="code-section">
      <div class="code-header">
        <span>💻 魔法咒语（CSS代码）</span>
        <span class="code-tag">CSS</span>
      </div>
      <pre class="code-content"><code>/* 默认：小房间，衣服叠成1列 */
.closet {
  display: grid;
  gap: 10px;
  grid-template-columns: 1fr;  /* 1列 */
}

/* 中房间：衣服排成2列 */
@media (min-width: 640px) {
  .closet {
    grid-template-columns: repeat(2, 1fr);  /* 2列 */
  }
}

/* 大房间：衣服排成3列 */
@media (min-width: 1024px) {
  .closet {
    grid-template-columns: repeat(3, 1fr);  /* 3列 */
  }
}</code></pre>
    </div>

    <!-- 总结 -->
    <div class="summary-box">
      <div class="summary-icon">🎯</div>
      <div class="summary-content">
        <strong>关键 takeaway：</strong>
        响应式布局就像小美的魔法衣柜，<strong>同一套衣服（内容）</strong>，
        会根据<strong>房间大小（屏幕宽度）</strong>自动调整排列方式！
        这就是 CSS 媒体查询（Media Query）的魔法！
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// 衣柜宽度（模拟屏幕宽度）
const closetWidth = ref(375)

// 房间类型
const rooms = [
  { name: '小房间（手机）', min: 280, max: 639, cols: 1, icon: '📱' },
  { name: '中房间（平板）', min: 640, max: 1023, cols: 2, icon: '📲' },
  { name: '大房间（电脑）', min: 1024, max: 900, cols: 3, icon: '💻' }
]

// 当前房间
const currentRoom = computed(() => {
  const room = rooms.find(r => closetWidth.value >= r.min && closetWidth.value <= r.max)
  return room || rooms[0]
})

// 每行衣服数量
const clothesPerRow = computed(() => currentRoom.value.cols)

// 是否小空间（需要叠衣服）
const isSmallSpace = computed(() => closetWidth.value < 500)

// 排列模式文字
const arrangementMode = computed(() => {
  if (closetWidth.value < 640) return '小空间模式（叠放）'
  if (closetWidth.value < 1024) return '中等空间（舒展）'
  return '大空间（完全展开）'
})

// 衣柜网格样式
const rackStyle = computed(() => {
  const cols = currentRoom.value.cols
  return {
    display: 'grid',
    gridTemplateColumns: `repeat(${cols}, 1fr)`,
    gap: '10px'
  }
})

// 衣服列表
const clothes = [
  { emoji: '👗', name: '连衣裙' },
  { emoji: '👔', name: '衬衫' },
  { emoji: '👖', name: '牛仔裤' },
  { emoji: '🧥', name: '大衣' },
  { emoji: '👘', name: '和服' },
  { emoji: '🥻', name: '纱丽' }
]
</script>

<style scoped>
.magic-closet {
  border: 2px solid #e0d5c8;
  border-radius: 16px;
  background: linear-gradient(135deg, #faf6f0 0%, #f5ebe0 100%);
  padding: 24px;
  margin: 20px 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif;
}

/* 故事框 */
.story-box {
  text-align: center;
  margin-bottom: 24px;
  padding: 20px;
  background: linear-gradient(135deg, #fff5e6, #ffecd2);
  border-radius: 16px;
  border: 2px dashed #ffb347;
}

.story-emoji {
  font-size: 48px;
  margin-bottom: 8px;
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
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

/* 衣柜控制 */
.closet-control {
  background: white;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 20px;
  border: 2px solid #e0e0e0;
}

.control-label {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  font-size: 14px;
  color: #333;
}

.room-label {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: bold;
}

.slider-box {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
}

.slider-emoji {
  font-size: 20px;
}

.magic-slider {
  flex: 1;
  height: 10px;
  -webkit-appearance: none;
  appearance: none;
  background: linear-gradient(90deg, #ffb347, #ff6b6b, #4ecdc4);
  border-radius: 5px;
  outline: none;
}

.magic-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 28px;
  height: 28px;
  background: white;
  border: 4px solid #ff6b6b;
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.width-hint {
  text-align: center;
  font-size: 13px;
  color: #666;
  background: #f8f9fa;
  padding: 8px;
  border-radius: 8px;
}

/* 衣柜展示 */
.closet-display {
  margin: 0 auto 20px;
  background: linear-gradient(135deg, #8b4513, #a0522d);
  border-radius: 16px;
  padding: 4px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}

.closet-header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 12px;
  background: linear-gradient(135deg, #d2691e, #cd853f);
  border-radius: 12px 12px 0 0;
}

.closet-icon {
  font-size: 24px;
}

.closet-title {
  font-size: 16px;
  font-weight: bold;
  color: #fff;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.closet-interior {
  background: linear-gradient(135deg, #f5f5dc, #faf0e6);
  padding: 16px;
  min-height: 200px;
}

.clothes-rack {
  display: grid;
  gap: 12px;
}

.clothing-item {
  background: white;
  border-radius: 12px;
  padding: 12px;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  animation: popIn 0.5s ease both;
}

@keyframes popIn {
  0% { opacity: 0; transform: scale(0.8); }
  100% { opacity: 1; transform: scale(1); }
}

.clothing-item:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

.clothing-item.folded {
  padding: 8px;
}

.item-hanger {
  font-size: 20px;
  margin-bottom: 4px;
}

.item-emoji {
  font-size: 40px;
  margin-bottom: 4px;
  display: block;
}

.clothing-item.folded .item-emoji {
  font-size: 28px;
}

.item-name {
  font-size: 13px;
  color: #333;
  font-weight: 500;
}

.clothing-item.folded .item-name {
  font-size: 11px;
}

.fold-hint {
  font-size: 10px;
  color: #ff6b6b;
  margin-top: 4px;
  font-weight: bold;
}

.closet-footer {
  display: flex;
  justify-content: space-between;
  padding: 12px 16px;
  background: linear-gradient(135deg, #d2691e, #cd853f);
  border-radius: 0 0 12px 12px;
  font-size: 12px;
  color: white;
}

/* 魔法原理说明 */
.magic-explain {
  background: linear-gradient(135deg, #e3f2fd, #f3e5f5);
  border-radius: 16px;
  padding: 20px;
  margin-bottom: 20px;
  border: 2px dashed #7e57c2;
}

.explain-title {
  font-size: 18px;
  font-weight: bold;
  color: #5e35b1;
  text-align: center;
  margin-bottom: 16px;
}

.explain-cards {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  flex-wrap: wrap;
}

.explain-card {
  background: white;
  border-radius: 12px;
  padding: 16px;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  min-width: 140px;
}

.card-icon {
  font-size: 32px;
  margin-bottom: 8px;
}

.card-title {
  font-size: 14px;
  font-weight: bold;
  color: #333;
  margin-bottom: 6px;
}

.card-desc {
  font-size: 12px;
  color: #666;
  line-height: 1.4;
}

.explain-arrow {
  font-size: 24px;
  color: #7e57c2;
}

/* 代码区域 */
.code-section {
  border: 2px solid #e0e0e0;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 16px;
}

.code-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  font-weight: bold;
}

.code-tag {
  background: rgba(255, 255, 255, 0.2);
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
}

.code-content {
  margin: 0;
  padding: 16px;
  background: #2d2d2d;
  color: #f8f8f2;
  font-size: 13px;
  line-height: 1.6;
  overflow-x: auto;
}

/* 总结框 */
.summary-box {
  display: flex;
  gap: 16px;
  padding: 20px;
  background: linear-gradient(135deg, #d4edda, #c3e6cb);
  border-radius: 12px;
  border-left: 4px solid #28a745;
}

.summary-icon {
  font-size: 32px;
  flex-shrink: 0;
}

.summary-content {
  flex: 1;
  font-size: 14px;
  color: #155724;
  line-height: 1.6;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .explain-cards {
    flex-direction: column;
  }

  .explain-arrow {
    transform: rotate(90deg);
  }

  .closet-display {
    transform: scale(0.9);
    transform-origin: top center;
  }
}
</style>
