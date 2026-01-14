<!--
  AdvancedTUIDemo.vue
  高级 TUI 布局演示组件
  
  用途：
  展示复杂的终端用户界面（Text User Interface）是如何构建的。
  说明如何利用备用缓冲区（Alternate Buffer）和全屏绘制技术来实现类似 vim/htop 的界面。
  
  交互功能：
  - 布局展示：模拟一个包含侧边栏、主内容区和状态栏的 TUI 应用。
  - 动态更新：演示界面元素如何响应窗口大小变化或用户操作。
-->
<template>
  <div class="advanced-tui">
    <div class="tui-window">
      <div class="tui-header">
        <div class="tabs">
          <div class="tab active">Continuous</div>
          <div class="tab">Integration</div>
          <div class="tab">Logging</div>
        </div>
      </div>
      
      <div class="tui-body">
        <div class="sidebar" :style="{ width: sidebarWidth + '%' }">
          <div class="list-item success">
            <span class="icon">✓</span> ci-fe-be-rules
          </div>
          <div class="list-item warning">
            <span class="icon">◐</span> ci-api-test
          </div>
          <div class="list-item success active">
            <span class="icon">✓</span> ci-email-service
          </div>
          <div class="list-item error">
            <span class="icon">✗</span> ci-auth-core
          </div>
          <div class="list-item pending">
            <span class="icon">○</span> ci-db-migration
          </div>
        </div>
        
        <div class="main-content">
          <div class="content-header">
            <h3>ci-email-service</h3>
          </div>
          <div class="content-body">
            <div class="status-row">Status: <span class="text-success">success</span></div>
            <div class="info-row">Updated: 2024-01-15 14:32:00 UTC</div>
          </div>
        </div>
      </div>
    </div>

    <div class="tui-controls">
      <div class="control-group">
        <button @click="toggleCoordinates" :class="{ active: showCoordinates }">
          Show Coordinates
        </button>
      </div>
      <div class="control-group">
        <button @click="simulateResize">Simulate Resize</button>
        <span class="size-label">Size: {{ sizeDisplay }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const showCoordinates = ref(false)
const sidebarWidth = ref(30)
const sizeDisplay = ref('60x20')

const toggleCoordinates = () => {
  showCoordinates.value = !showCoordinates.value
}

const simulateResize = () => {
  // Simple animation to show resizing concept
  const originalWidth = sidebarWidth.value
  sidebarWidth.value = 20
  sizeDisplay.value = '40x20'
  
  setTimeout(() => {
    sidebarWidth.value = 40
    sizeDisplay.value = '80x20'
  }, 500)
  
  setTimeout(() => {
    sidebarWidth.value = originalWidth
    sizeDisplay.value = '60x20'
  }, 1000)
}
</script>

<style scoped>
.advanced-tui {
  background: #0a0a0a;
  padding: 20px;
  border-radius: 8px;
  border: 1px solid #333;
  font-family: 'Menlo', monospace;
}

.tui-window {
  border: 1px solid #333;
  border-radius: 4px;
  background: #000;
  overflow: hidden;
  height: 300px;
  display: flex;
  flex-direction: column;
}

.tui-header {
  border-bottom: 1px solid #333;
  background: #1a1a1a;
}

.tabs {
  display: flex;
}

.tab {
  padding: 8px 16px;
  color: #666;
  cursor: pointer;
  border-right: 1px solid #333;
  font-size: 13px;
}

.tab.active {
  background: #22c55e;
  color: #000;
  font-weight: bold;
}

.tui-body {
  display: flex;
  flex: 1;
}

.sidebar {
  border-right: 1px solid #333;
  padding: 10px 0;
  transition: width 0.3s;
}

.list-item {
  padding: 5px 15px;
  color: #ccc;
  font-size: 13px;
  cursor: pointer;
}

.list-item:hover {
  background: #222;
}

.list-item.active {
  background: #222;
  border-left: 2px solid #22c55e;
}

.icon {
  display: inline-block;
  width: 16px;
}

.success .icon { color: #22c55e; }
.warning .icon { color: #eab308; }
.error .icon { color: #ef4444; }
.pending .icon { color: #666; }

.main-content {
  flex: 1;
  padding: 20px;
}

.content-header h3 {
  margin: 0 0 15px 0;
  color: #fff;
  font-size: 16px;
}

.status-row {
  margin-bottom: 5px;
  color: #aaa;
}

.text-success { color: #22c55e; }

.info-row {
  color: #666;
  font-size: 12px;
}

.tui-controls {
  margin-top: 20px;
  display: flex;
  gap: 20px;
  padding-top: 20px;
  border-top: 1px solid #222;
}

.control-group {
  display: flex;
  align-items: center;
  gap: 10px;
}

button {
  background: #111;
  border: 1px solid #333;
  color: #ccc;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-family: inherit;
  font-size: 13px;
}

button:hover {
  background: #222;
}

button.active {
  background: #222;
  border-color: #666;
  color: #fff;
}

.size-label {
  color: #666;
  font-size: 13px;
}
</style>
