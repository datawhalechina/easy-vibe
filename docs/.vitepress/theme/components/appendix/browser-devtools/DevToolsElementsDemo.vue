<script setup>
import { ref, reactive, computed } from 'vue'

const selectedElement = ref('box') // 'box' or 'text'

const styles = reactive({
  box: {
    backgroundColor: '#409eff',
    padding: '20px',
    borderRadius: '8px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    color: '#ffffff',
    fontSize: '20px',
    fontWeight: 'bold'
  }
})

const domTree = [
  { tag: 'div', class: 'container', id: 'app' },
  { tag: 'div', class: 'box', id: 'target-box', parent: 'app' },
  { tag: 'span', class: 'text', text: 'Hello DevTools', parent: 'target-box' }
]

const computedStyle = computed(() => {
  return styles[selectedElement.value]
})

const updateStyle = (prop, value) => {
  styles[selectedElement.value][prop] = value
}
</script>

<template>
  <el-card class="elements-demo" shadow="hover">
    <template #header>
      <div class="header">
        <span class="title">Elements (元素面板)</span>
      </div>
    </template>

    <div class="devtools-layout">
      <!-- Left: DOM Tree -->
      <div class="panel dom-panel">
        <div class="panel-header">DOM Tree</div>
        <div class="dom-content">
          <div class="dom-line">
            <span class="tag">&lt;div</span> <span class="attr">id</span>="app" <span class="attr">class</span>="container"<span class="tag">&gt;</span>
          </div>
          
          <div 
            class="dom-line indent" 
            :class="{ selected: selectedElement === 'box' }"
            @click="selectedElement = 'box'"
          >
            <span class="tag">&lt;div</span> <span class="attr">id</span>="target-box" <span class="attr">class</span>="box"<span class="tag">&gt;</span>
          </div>
          
          <div 
            class="dom-line indent-2"
            :class="{ selected: selectedElement === 'text' }"
            @click="selectedElement = 'text'"
          >
            <span class="tag">&lt;span</span> <span class="attr">class</span>="text"<span class="tag">&gt;</span>Hello DevTools<span class="tag">&lt;/span&gt;</span>
          </div>

          <div class="dom-line indent">
            <span class="tag">&lt;/div&gt;</span>
          </div>

          <div class="dom-line">
            <span class="tag">&lt;/div&gt;</span>
          </div>
        </div>
      </div>

      <!-- Right: Styles -->
      <div class="panel style-panel">
        <div class="panel-header">Styles ({{ selectedElement === 'box' ? '.box' : '.text' }})</div>
        <div class="style-content">
          <div class="css-rule">
            <span class="selector">{{ selectedElement === 'box' ? '.box' : '.text' }}</span> {
            <div v-for="(value, prop) in styles[selectedElement]" :key="prop" class="css-prop">
              <span class="prop-name">{{ prop }}</span>: 
              <span class="prop-value">
                  <!-- Simple editable input simulation -->
                  <input 
                    v-model="styles[selectedElement][prop]" 
                    class="style-input"
                  />
              </span>;
            </div>
            }
          </div>
        </div>
      </div>
    </div>

    <!-- Preview Area -->
    <div class="preview-area">
      <div class="preview-label">页面预览 (Page Preview)</div>
      <div class="preview-content">
        <div :style="styles.box">
          <span :style="styles.text">Hello DevTools</span>
        </div>
      </div>
    </div>
    
    <div class="footer-tip">
        点击左侧 DOM 树中的元素，在右侧 Styles 面板修改样式，下方预览会实时更新。
    </div>
  </el-card>
</template>

<style scoped>
.elements-demo {
  margin: 20px 0;
}

.devtools-layout {
  display: flex;
  height: 250px;
  border: 1px solid #dcdfe6;
  font-family: monospace;
  font-size: 13px;
}

.panel {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.dom-panel {
  border-right: 1px solid #dcdfe6;
  background-color: #fff;
}

.style-panel {
  background-color: #f9f9f9;
}

.panel-header {
  padding: 5px 10px;
  background-color: #f0f2f5;
  border-bottom: 1px solid #dcdfe6;
  font-weight: bold;
  color: #606266;
  font-size: 12px;
}

.dom-content, .style-content {
  padding: 10px;
  overflow-y: auto;
  flex: 1;
}

.dom-line {
  padding: 2px 4px;
  cursor: pointer;
  white-space: nowrap;
}

.dom-line:hover {
  background-color: #f0f9eb;
}

.dom-line.selected {
  background-color: #d1e8ff; /* Selection color */
}

.indent { padding-left: 20px; }
.indent-2 { padding-left: 40px; }

.tag { color: #a626a4; }
.attr { color: #986801; }

.css-rule {
  color: #333;
}

.selector { color: #d19a66; }
.prop-name { color: #e45649; }
.prop-value { color: #50a14f; }

.style-input {
  border: none;
  background: transparent;
  color: inherit;
  font-family: inherit;
  width: 100px;
  border-bottom: 1px dashed #ccc;
}

.style-input:focus {
  outline: none;
  border-bottom: 1px solid #409eff;
}

.preview-area {
  margin-top: 15px;
  border: 1px dashed #dcdfe6;
  padding: 15px;
  border-radius: 4px;
  position: relative;
}

.preview-label {
  position: absolute;
  top: -10px;
  left: 10px;
  background: #fff;
  padding: 0 5px;
  font-size: 12px;
  color: #909399;
}

.preview-content {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100px;
}

.header {
  font-weight: bold;
}

.footer-tip {
    margin-top: 10px;
    font-size: 12px;
    color: #909399;
    text-align: center;
}
</style>
