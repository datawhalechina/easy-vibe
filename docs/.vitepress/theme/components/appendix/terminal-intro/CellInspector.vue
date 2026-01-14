<!--
  CellInspector.vue
  单元格检查器组件
  
  用途：
  深入展示单个终端单元格（Cell）的内部结构。
  说明一个单元格不仅仅包含字符，还包含前景色、背景色、加粗、下划线等属性。
  
  交互功能：
  - 属性切换：用户可以修改字符、颜色和样式。
  - 实时预览：左侧大图实时反映右侧属性的修改结果。
-->
<template>
  <div class="cell-inspector">
    <div class="preview-area">
      <div class="large-cell" :style="cellStyle">
        {{ char }}
      </div>
    </div>
    
    <div class="controls-area">
      <div class="control-group">
        <label>CHARACTER</label>
        <div class="char-buttons">
          <button 
            v-for="c in chars" 
            :key="c" 
            :class="{ active: char === c }"
            @click="char = c"
          >{{ c }}</button>
        </div>
      </div>

      <div class="control-group">
        <label>FOREGROUND</label>
        <div class="color-palette">
          <div 
            v-for="color in colors" 
            :key="color" 
            class="color-swatch"
            :style="{ backgroundColor: color }"
            :class="{ active: fgColor === color }"
            @click="fgColor = color"
          ></div>
        </div>
      </div>

      <div class="control-group">
        <label>BACKGROUND</label>
        <div class="color-palette">
          <div 
            class="color-swatch"
            :class="{ active: bgColor === 'transparent' }"
            style="background: linear-gradient(45deg, #222 25%, transparent 25%), linear-gradient(-45deg, #222 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #222 75%), linear-gradient(-45deg, transparent 75%, #222 75%); background-size: 10px 10px; background-color: #111;"
            @click="bgColor = 'transparent'"
          ></div>
          <div 
            v-for="color in bgColors" 
            :key="color" 
            class="color-swatch"
            :style="{ backgroundColor: color }"
            :class="{ active: bgColor === color }"
            @click="bgColor = color"
          ></div>
        </div>
      </div>

      <div class="control-group">
        <label>ATTRIBUTES</label>
        <div class="toggles">
          <label class="toggle">
            <input type="checkbox" v-model="isBold">
            <span>Bold</span>
          </label>
          <label class="toggle">
            <input type="checkbox" v-model="isUnderline">
            <span>Underline</span>
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const chars = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P']
const colors = [
  '#ef4444', '#22c55e', '#eab308', '#3b82f6', '#a855f7', '#06b6d4', '#f3f4f6', '#6b7280',
  '#f87171', '#4ade80', '#facc15', '#60a5fa', '#c084fc', '#22d3ee', '#ffffff'
]
const bgColors = [
  '#000000', '#1f2937', '#111827', '#374151', '#1e3a8a', '#3f2c08', '#310b0b'
]

const char = ref('A')
const fgColor = ref('#22c55e')
const bgColor = ref('transparent')
const isBold = ref(false)
const isUnderline = ref(false)

const cellStyle = computed(() => ({
  color: fgColor.value,
  backgroundColor: bgColor.value,
  fontWeight: isBold.value ? 'bold' : 'normal',
  textDecoration: isUnderline.value ? 'underline' : 'none'
}))
</script>

<style scoped>
.cell-inspector {
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: 40px;
  background: #09090b;
  padding: 30px;
  border-radius: 12px;
  border: 1px solid #27272a;
  font-family: 'JetBrains Mono', 'Menlo', monospace;
}

.preview-area {
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #27272a;
  border-radius: 8px;
  background: #000;
  aspect-ratio: 3/4;
}

.large-cell {
  font-size: 120px;
  line-height: 1;
  width: 140px;
  height: 180px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.controls-area {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.control-group label {
  display: block;
  color: #a1a1aa; /* Zinc 400 */
  font-size: 12px;
  margin-bottom: 10px;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 600;
}

.char-buttons {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  gap: 6px;
}

.char-buttons button {
  background: #18181b;
  border: 1px solid #27272a;
  color: #a1a1aa;
  padding: 8px 0;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
}

.char-buttons button:hover {
  border-color: #52525b;
  color: #fff;
  background: #27272a;
}

.char-buttons button.active {
  background: #fff;
  color: #000;
  border-color: #fff;
  font-weight: bold;
}

.color-palette {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.color-swatch {
  width: 32px;
  height: 32px;
  border-radius: 4px;
  cursor: pointer;
  border: 2px solid transparent;
  transition: transform 0.1s;
}

.color-swatch:hover {
  transform: scale(1.1);
}

.color-swatch.active {
  border-color: #fff;
  transform: scale(1.1);
  box-shadow: 0 0 10px rgba(0,0,0,0.5);
}

.toggles {
  display: flex;
  gap: 20px;
}

.toggle {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #e4e4e7;
  cursor: pointer;
  user-select: none;
}

.toggle input {
  width: 16px;
  height: 16px;
  accent-color: #22c55e;
}

@media (max-width: 640px) {
  .cell-inspector {
    grid-template-columns: 1fr;
  }
}
</style>
