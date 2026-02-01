<template>
  <div class="evolution-demo">
    <el-card class="main-card" shadow="hover">
      <template #header>
        <div class="header-container">
          <div class="title-area">
            <span class="main-title">AI 进化模拟器</span>
          </div>
          <el-steps :active="currentStage" finish-status="success" align-center class="compact-steps" simple>
            <el-step v-for="stage in stages" :key="stage.id" :title="stage.label" />
          </el-steps>
        </div>
      </template>

      <!-- Stage 1: Rule Based (Traffic Light Example) -->
      <div v-if="currentStage === 0" class="stage-pane">
        <el-alert type="info" :closable="false" show-icon class="compact-alert mb-2">
          <template #title><span class="alert-title">阶段一：规则时代 (Rule-Based)</span></template>
          <template #default><span class="alert-desc">就像教小孩：如果看到红灯，就停下。</span></template>
        </el-alert>
        
        <div class="game-area-grid">
          <div class="panel left-panel">
            <div class="panel-header">规则库 (Code)</div>
            <div class="code-block">
              <div class="code-line">
                <span class="keyword">function</span> <span class="function">decideTrafficLight</span>(color) {
              </div>
              <div class="code-line indent">
                <span class="keyword">if</span> (color === <span class="string">'red'</span>) <span class="keyword">return</span> <span class="string">'stop'</span>
              </div>
              <div class="code-line indent">
                <span class="keyword">else if</span> (color === <span class="string">'yellow'</span>) <span class="keyword">return</span> <span class="string">'caution'</span>
              </div>
              <div class="code-line indent">
                <span class="keyword">else if</span> (color === <span class="string">'green'</span>) <span class="keyword">return</span> <span class="string">'go'</span>
              </div>
              <div class="code-line">}</div>
            </div>
          </div>
          <div class="panel right-panel">
            <div class="panel-header">测试输入</div>
            <div class="input-controls">
              <el-select v-model="ruleColor" size="small" style="width: 120px;">
                <el-option value="red" label="🔴 红灯" />
                <el-option value="yellow" label="🟡 黄灯" />
                <el-option value="green" label="🟢 绿灯" />
                <el-option value="blue" label="🔵 蓝灯" />
              </el-select>
              <div class="arrow">→</div>
              <el-tag :type="ruleResult === 'stop' ? 'danger' : ruleResult === 'caution' ? 'warning' : ruleResult === 'go' ? 'success' : 'info'">
                {{ ruleResult }}
              </el-tag>
            </div>
            <div class="hint-text" v-if="ruleResult === 'Unknown'">
              规则库中没有定义"蓝灯"，所以系统不知道该做什么。这就是规则系统的局限性：无法处理未定义的规则。
            </div>
            <div class="hint-text" v-else>
              系统严格按照预定义的规则执行指令。
            </div>
          </div>
        </div>
      </div>

      <!-- Stage 2: Machine Learning (Interactive 2D Plot) -->
      <div v-else-if="currentStage === 1" class="stage-pane">
        <el-alert type="info" :closable="false" show-icon class="compact-alert mb-2">
          <template #title><span class="alert-title">阶段二：机器学习 (Machine Learning)</span></template>
          <template #default><span class="alert-desc">点击画布添加数据点，训练模型自动寻找分类边界 (Decision Boundary)。</span></template>
        </el-alert>

        <div class="game-area-grid">
          <div class="panel left-panel canvas-container" @click="addPoint">
             <!-- Simple SVG Plot -->
             <svg width="100%" height="200" class="ml-plot">
                <!-- Background Regions (Visible after training) -->
                <rect v-if="modelTrained" x="0" y="0" width="100%" height="100%" :fill="boundaryColor" />
                
                <!-- Decision Line -->
                <line v-if="modelTrained" :x1="line.x1" :y1="line.y1" :x2="line.x2" :y2="line.y2" stroke="#333" stroke-width="2" stroke-dasharray="4" />

                <!-- Points -->
                <circle 
                  v-for="(p, i) in points" 
                  :key="i" 
                  :cx="p.x" 
                  :cy="p.y" 
                  r="6" 
                  :fill="p.type === 'A' ? '#409eff' : '#e6a23c'" 
                  stroke="white" 
                  stroke-width="2" 
                />
             </svg>
             <div class="canvas-hint" v-if="points.length === 0">👆 点击此处添加数据点</div>
          </div>

          <div class="panel right-panel">
            <div class="panel-header">控制面板</div>
            <div class="control-group">
              <span class="label">当前类别:</span>
              <el-radio-group v-model="currentClass" size="small">
                <el-radio-button label="A"><span style="color: #409eff">● 蓝类</span></el-radio-button>
                <el-radio-button label="B"><span style="color: #e6a23c">● 橙类</span></el-radio-button>
              </el-radio-group>
            </div>
            
            <div class="control-group mt-2">
              <el-button type="primary" size="small" @click="trainLinearModel" :disabled="points.length < 2">
                ⚡ 开始训练 (Fit)
              </el-button>
              <el-button size="small" :icon="Delete" circle @click="clearPoints" />
            </div>

            <div class="stats-info mt-2">
              <p v-if="!modelTrained" class="text-desc">机器学习不再依赖硬编码规则，而是通过统计学方法（如寻找中心点或线性回归）在数据之间划出一条"界线"。试试在不同位置添加点，看看界线如何变化。</p>
              <p v-else class="text-desc">模型已训练！它找到了一条最佳分割线。新进来的数据将根据它在红区还是蓝区被自动分类。</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Stage 3: Deep Learning (3x3 Grid Feature Extraction) -->
      <div v-else class="stage-pane">
        <el-alert type="info" :closable="false" show-icon class="compact-alert mb-2">
          <template #title><span class="alert-title">阶段三：深度学习 (Deep Learning)</span></template>
          <template #default><span class="alert-desc">神经网络通过多层结构自动提取特征（Feature Extraction）。点击格子绘制图案。</span></template>
        </el-alert>

        <div class="game-area-grid">
          <div class="panel left-panel grid-container">
             <div class="pixel-grid">
               <div 
                 v-for="(pixel, i) in pixels" 
                 :key="i" 
                 class="pixel" 
                 :class="{ active: pixel }"
                 @click="togglePixel(i)"
               ></div>
             </div>
             <div class="grid-actions">
               <el-button size="small" link @click="preset('x')">❌ X型</el-button>
               <el-button size="small" link @click="preset('plus')">➕ 十字</el-button>
               <el-button size="small" link @click="clearPixels">清空</el-button>
             </div>
          </div>

          <div class="panel right-panel">
            <div class="panel-header">神经网络层级透视</div>
            
            <!-- Visualization of Layers -->
            <div class="network-viz">
              <div class="layer input-layer">
                <div class="layer-label">输入层 (Pixels)</div>
                <div class="nodes">
                  <span v-for="n in 9" :key="n" class="node mini" :class="{active: pixels[n-1]}"></span>
                </div>
              </div>
              
              <div class="arrow-down">⬇️ 卷积/提取特征</div>

              <div class="layer hidden-layer">
                <div class="layer-label">隐藏层 (Features)</div>
                <div class="feature-detectors">
                  <div class="feature" :class="{detected: features.center}">
                    <span class="f-icon">⏺</span> 中心点
                  </div>
                  <div class="feature" :class="{detected: features.corners}">
                    <span class="f-icon">Corners</span> 四角
                  </div>
                  <div class="feature" :class="{detected: features.cross}">
                    <span class="f-icon">➕</span> 交叉
                  </div>
                </div>
              </div>

              <div class="arrow-down">⬇️ 输出层</div>

              <div class="layer output-layer">
                 <div class="prediction-box">
                   识别结果: <span class="result-text">{{ prediction }}</span>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer Navigation -->
      <div class="footer-nav mt-2 flex justify-end">
         <el-button-group>
          <el-button size="small" :disabled="currentStage === 0" @click="currentStage--">上一步</el-button>
          <el-button size="small" type="primary" :disabled="currentStage === 2" @click="currentStage++">下一步</el-button>
        </el-button-group>
      </div>

    </el-card>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { Delete } from '@element-plus/icons-vue'

const currentStage = ref(0)
const stages = [
  { id: 0, label: '规则', desc: '人工规则' },
  { id: 1, label: '机器学习', desc: '统计特征' },
  { id: 2, label: '深度学习', desc: '自动特征' }
]

// --- Stage 1: Rule Based ---
const ruleColor = ref('red')
const ruleResult = computed(() => {
  if (ruleColor.value === 'red') return 'stop'
  if (ruleColor.value === 'yellow') return 'caution'
  if (ruleColor.value === 'green') return 'go'
  return 'Unknown'
})

// --- Stage 2: Machine Learning ---
const points = ref([])
const currentClass = ref('A')
const modelTrained = ref(false)
const line = reactive({ x1: 0, y1: 0, x2: 0, y2: 0 })
// SVG click coordinates are relative to the SVG element
// We'll use a simple approximation for the demo
// x, y are percentages (0-100)
const addPoint = (e) => {
  const rect = e.target.getBoundingClientRect()
  // Ensure we are clicking on the SVG or its children
  // Best to put event on wrapper
  // But event target might be circle.
  // Use currentTarget
  const x = e.offsetX
  const y = e.offsetY
  // Convert to % for responsiveness if needed, but pixel is easier for calc
  // Let's stick to pixel for this simple demo, assuming fixed height 200
  // width varies.
  points.value.push({
    x, y, 
    type: currentClass.value
  })
  modelTrained.value = false
}

const clearPoints = () => {
  points.value = []
  modelTrained.value = false
}

const trainLinearModel = () => {
  // Simple Nearest Centroid Classifier
  const groupA = points.value.filter(p => p.type === 'A')
  const groupB = points.value.filter(p => p.type === 'B')

  if (groupA.length === 0 || groupB.length === 0) return

  const avgA = {
    x: groupA.reduce((sum, p) => sum + p.x, 0) / groupA.length,
    y: groupA.reduce((sum, p) => sum + p.y, 0) / groupA.length
  }
  const avgB = {
    x: groupB.reduce((sum, p) => sum + p.x, 0) / groupB.length,
    y: groupB.reduce((sum, p) => sum + p.y, 0) / groupB.length
  }

  // Midpoint
  const midX = (avgA.x + avgB.x) / 2
  const midY = (avgA.y + avgB.y) / 2

  // Normal vector (from A to B)
  const dx = avgB.x - avgA.x
  const dy = avgB.y - avgA.y

  // Perpendicular line: dx*x + dy*y = C
  // Slope of normal is dy/dx. Slope of perp line is -dx/dy
  
  // Let's just draw a line perpendicular to the segment AB passing through Midpoint
  // Slope m = -dx/dy
  
  // Calculate line coordinates for visualization
  // y - midY = m * (x - midX)
  // if dy is close to 0, vertical line x = midX
  
  const width = 1000 // ample width
  
  if (Math.abs(dy) < 0.001) {
    // Vertical line
    line.x1 = midX
    line.x2 = midX
    line.y1 = 0
    line.y2 = 200
  } else {
    const m = -dx / dy
    // At x=0
    const y0 = midY + m * (0 - midX)
    // At x=width
    const y1 = midY + m * (width - midX)
    
    line.x1 = 0
    line.y1 = y0
    line.x2 = width
    line.y2 = y1
  }
  
  modelTrained.value = true
}

// Simple visual background
// If A is left/top, background is blue-ish
// SVG doesn't support "half plane fill" easily without path math
// For this demo, we won't fill the background perfectly, just draw the line.
const boundaryColor = computed(() => 'transparent') 


// --- Stage 3: Deep Learning ---
const pixels = ref(Array(9).fill(false))

const togglePixel = (index) => {
  pixels.value[index] = !pixels.value[index]
}

const clearPixels = () => {
  pixels.value = pixels.value.map(() => false)
}

const preset = (type) => {
  clearPixels()
  if (type === 'x') {
    [0, 2, 4, 6, 8].forEach(i => pixels.value[i] = true)
  } else if (type === 'plus') {
    [1, 3, 4, 5, 7].forEach(i => pixels.value[i] = true)
  }
}

const features = computed(() => {
  // Simple heuristics to simulate feature detection
  const p = pixels.value
  const center = p[4]
  const corners = p[0] && p[2] && p[6] && p[8]
  const cross = p[1] && p[3] && p[5] && p[7]
  
  return { center, corners, cross }
})

const prediction = computed(() => {
  const f = features.value
  if (f.corners && f.center) return 'X 型图案 (X-Shape)'
  if (f.cross && f.center) return '十字型 (Plus-Shape)'
  if (f.corners && !f.center) return '四角 (Corners)'
  if (pixels.value.filter(Boolean).length === 0) return '无输入'
  return '未知图案'
})

</script>

<style scoped>
.evolution-demo { margin: 10px 0; }
.header-container { margin-bottom: 5px; }
.main-title { font-weight: bold; font-size: 16px; }
.compact-steps { padding: 5px 0; margin-bottom: 10px; }
.compact-alert { padding: 5px 10px; }
.alert-title { font-weight: bold; font-size: 13px; }
.alert-desc { font-size: 12px; }

.game-area-grid {
  display: flex;
  gap: 15px;
  margin-top: 10px;
}
.panel {
  border: 1px solid #ebeef5;
  border-radius: 4px;
  padding: 10px;
}
.left-panel { flex: 1; }
.right-panel { flex: 1; background-color: #fcfcfc; }
.panel-header {
  font-size: 13px;
  font-weight: bold;
  color: #606266;
  margin-bottom: 10px;
  border-bottom: 1px solid #ebeef5;
  padding-bottom: 5px;
}

/* Stage 1 */
.code-block {
  font-family: monospace;
  font-size: 12px;
  background: #282c34;
  color: #abb2bf;
  padding: 10px;
  border-radius: 4px;
}
.keyword { color: #c678dd; }
.string { color: #98c379; }
.function { color: #61afef; }
.indent { padding-left: 15px; }
.input-controls {
  display: flex;
  align-items: center;
  gap: 10px;
}
.hint-text {
  margin-top: 10px;
  font-size: 12px;
  color: #909399;
}

/* Stage 2 */
.canvas-container {
  height: 220px;
  background-color: #f5f7fa;
  position: relative;
  cursor: crosshair;
  padding: 0;
  overflow: hidden;
}
.ml-plot {
  display: block;
}
.canvas-hint {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #909399;
  font-size: 12px;
  pointer-events: none;
}
.text-desc {
  font-size: 12px;
  color: #606266;
  line-height: 1.5;
}

/* Stage 3 */
.grid-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.pixel-grid {
  display: grid;
  grid-template-columns: repeat(3, 40px);
  gap: 4px;
  margin-bottom: 10px;
}
.pixel {
  width: 40px;
  height: 40px;
  background-color: #eee;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
}
.pixel:hover { background-color: #d9d9d9; }
.pixel.active { background-color: #333; }

.network-viz {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}
.layer {
  width: 100%;
  padding: 5px;
  background: #fff;
  border: 1px solid #ebeef5;
  border-radius: 4px;
  text-align: center;
}
.layer-label { font-size: 11px; color: #909399; margin-bottom: 4px; }
.nodes { display: flex; gap: 2px; justify-content: center; flex-wrap: wrap; width: 60px; margin: 0 auto; }
.node.mini { width: 6px; height: 6px; border-radius: 50%; background: #ddd; }
.node.mini.active { background: #333; }
.arrow-down { font-size: 10px; color: #ccc; }

.feature-detectors {
  display: flex;
  justify-content: space-around;
  font-size: 11px;
}
.feature {
  display: flex;
  flex-direction: column;
  align-items: center;
  opacity: 0.3;
  transition: opacity 0.3s;
}
.feature.detected { opacity: 1; color: #409eff; font-weight: bold; }
.f-icon { font-size: 14px; margin-bottom: 2px; }

.prediction-box { font-weight: bold; font-size: 13px; color: #303133; }
.result-text { color: #67c23a; }

@media (max-width: 600px) {
  .game-area-grid { flex-direction: column; }
}
.flex { display: flex; }
.justify-end { justify-content: flex-end; }
.mt-2 { margin-top: 8px; }
.mb-2 { margin-bottom: 8px; }
</style>