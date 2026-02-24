<template>
  <div class="browser-demo">
    <div class="demo-label">浏览器架构 ── 点击查看各模块</div>

    <div class="browser-schema">
      <div class="browser-layers">
        <div
          v-for="layer in layers"
          :key="layer.name"
          class="layer"
          :class="{ active: activeLayer === layer.name }"
          @click="activeLayer = activeLayer === layer.name ? '' : layer.name"
        >
          <div class="layer-header">
            <span class="layer-name">{{ layer.name }}</span>
            <span class="layer-icon">{{ layer.icon }}</span>
          </div>
          <div v-if="activeLayer === layer.name" class="layer-detail">
            <div class="detail-text">{{ layer.desc }}</div>
            <div class="detail-examples">
              <span v-for="ex in layer.examples" :key="ex" class="example-tag">{{ ex }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="tap-hint">👆 点击查看各模块详情</div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const activeLayer = ref('')
const layers = [
  { name: '用户界面', icon: '🎨', desc: '你看到的地址栏、标签页、书签等', examples: ['地址栏', '标签页', '书签栏', '工具栏'] },
  { name: '浏览器引擎', icon: '⚙️', desc: '协调 UI 和渲染引擎的桥梁', examples: ['Chrome: Blink', 'Firefox: Gecko', 'Safari: WebKit'] },
  { name: '渲染引擎', icon: '📄', desc: '解析 HTML/CSS，把网页显示出来', examples: ['Blink', 'Gecko', 'WebKit'] },
  { name: 'JavaScript 引擎', icon: '⚡', desc: '执行页面中的 JavaScript 代码', examples: ['V8', 'SpiderMonkey', 'JavaScriptCore'] },
  { name: '网络模块', icon: '🌐', desc: '发送 HTTP/HTTPS 请求', examples: ['HTTP', 'HTTP/2', 'HTTP/3', 'WebSocket'] },
  { name: '数据存储', icon: '💾', desc: '保存 Cookie、缓存等数据', examples: ['Cookie', 'LocalStorage', 'Cache'] }
]
</script>

<style scoped>
.browser-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  padding: 1rem 1.2rem;
  margin: 1rem 0;
  cursor: pointer;
  user-select: none;
}

.demo-label {
  font-size: 0.78rem;
  font-weight: bold;
  color: var(--vp-c-text-2);
  margin-bottom: 0.75rem;
  letter-spacing: 0.2px;
}

.browser-layers {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.layer {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 0.5rem 0.7rem;
  transition: all 0.3s;
}

.layer.active {
  border-color: var(--vp-c-brand);
}

.layer-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.layer-name {
  font-size: 0.78rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
}

.layer-icon {
  font-size: 0.9rem;
}

.layer-detail {
  margin-top: 0.5rem;
  padding-top: 0.5rem;
  border-top: 1px solid var(--vp-c-divider);
}

.detail-text {
  font-size: 0.72rem;
  color: var(--vp-c-text-3);
  margin-bottom: 0.4rem;
}

.detail-examples {
  display: flex;
  flex-wrap: wrap;
  gap: 0.3rem;
}

.example-tag {
  font-size: 0.65rem;
  padding: 0.15rem 0.4rem;
  background: var(--vp-c-bg-soft);
  border-radius: 3px;
  color: var(--vp-c-text-2);
}

.tap-hint {
  text-align: center;
  font-size: 0.72rem;
  color: var(--vp-c-text-3);
  margin-top: 0.75rem;
}
</style>
