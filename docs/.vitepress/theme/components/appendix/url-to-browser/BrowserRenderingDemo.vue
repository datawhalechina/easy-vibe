<!--
  BrowserRenderingDemo.vue
  浏览器渲染演示 - 拆开包裹/装修房子类比
  压缩版：横向延展，减少纵向高度
-->
<template>
  <div class="unboxing-demo">
    <!-- 紧凑头部：标题+场景+步骤导航合并 -->
    <div class="compact-header">
      <div class="header-left">
        <span class="title-icon">[包裹]</span>
        <span class="header-title">拆开包裹：代码如何变成画面</span>
      </div>
      <div class="header-steps">
        <button
          v-for="(step, index) in steps"
          :key="step.id"
          @click="goToStep(index)"
          class="step-chip"
          :class="{ active: currentStep === index, completed: currentStep > index }"
        >
          <span class="chip-num">{{ index + 1 }}</span>
          <span class="chip-name">{{ step.shortName }}</span>
        </button>
      </div>
    </div>

    <!-- 横向主区域：代码输入 | 处理可视化 | 屏幕输出 -->
    <div class="main-stage">
      <!-- 左侧：代码输入 -->
      <div class="stage-box input-box">
        <div class="box-label">[代码包] 收到的代码</div>
        <pre class="code-mini">&lt;div class="box"&gt;
  &lt;h1&gt;Hello&lt;/h1&gt;
&lt;/div&gt;
&lt;style&gt;
  .box { background: blue; }
&lt;/style&gt;</pre>
      </div>

      <!-- 中间：处理过程 -->
      <div class="stage-box process-box">
        <div class="box-label">[{{ stepIcons[currentStep] }}] {{ steps[currentStep]?.name }}</div>
        
        <!-- 步骤1: 解析HTML -->
        <div v-if="currentStep === 0" class="process-content">
          <div class="mini-tree">
            <span class="tree-line">html</span>
            <span class="tree-line indent">└─ body</span>
            <span class="tree-line indent2 highlight">└─ div.box</span>
          </div>
        </div>

        <!-- 步骤2: 解析CSS -->
        <div v-else-if="currentStep === 1" class="process-content">
          <div class="mini-css">
            <span class="css-sel">.box</span> {<br/>
            &nbsp;&nbsp;background: <span class="css-val">blue</span>;<br/>
            }
          </div>
        </div>

        <!-- 步骤3: 合并渲染树 -->
        <div v-else-if="currentStep === 2" class="process-content">
          <div class="mini-render">
            <span class="render-tag">div.box</span>
            <span class="render-arrow">→</span>
            <span class="render-style">蓝色背景</span>
          </div>
        </div>

        <!-- 步骤4: 计算布局 -->
        <div v-else-if="currentStep === 3" class="process-content">
          <div class="mini-layout" :style="{ width: boxSize + 'px', height: boxSize + 'px' }">
            {{ boxSize }}×{{ boxSize }}
          </div>
        </div>

        <!-- 步骤5: 绘制像素 -->
        <div v-else-if="currentStep === 4" class="process-content">
          <div class="mini-layers">
            <div class="layer-bar" :style="{ opacity: layerOp }">背景</div>
            <div class="layer-bar" :style="{ opacity: layerOp }">文字</div>
          </div>
        </div>

        <!-- 步骤6: 合成显示 -->
        <div v-else class="process-content">
          <div class="mini-final">
            <strong>Hello</strong>
          </div>
        </div>
      </div>

      <!-- 右侧：屏幕输出 -->
      <div class="stage-box output-box">
        <div class="box-label">[屏幕] 显示结果</div>
        <div class="screen-mini">
          <div class="browser-bar-mini">
            <span></span><span></span><span></span>
          </div>
          <div class="screen-content" :class="{ styled: currentStep >= 4, final: currentStep >= 5 }">
            <template v-if="currentStep >= 5">
              <strong>Hello</strong>
            </template>
            <template v-else-if="currentStep >= 3">
              内容
            </template>
            <template v-else>
              ...
            </template>
          </div>
        </div>
      </div>
    </div>

    <!-- 双栏对照说明 - 横向排列 -->
    <div class="dual-bar">
      <div class="bar-side">
        <span class="bar-label">[生活] {{ steps[currentStep]?.analogy }}</span>
      </div>
      <div class="bar-divider">↔</div>
      <div class="bar-side">
        <span class="bar-label">[技术] {{ steps[currentStep]?.desc }}</span>
      </div>
    </div>

    <!-- 控制按钮 -->
    <div class="control-bar">
      <button class="bar-btn" @click="prevStep" :disabled="currentStep <= 0">[上一步]</button>
      <button class="bar-btn primary" @click="nextStep" :disabled="currentStep >= steps.length - 1">
        {{ currentStep >= steps.length - 1 ? '[完成]' : '[下一步]' }}
      </button>
      <button class="bar-btn" @click="currentStep = 0">[重置]</button>
    </div>

    <!-- 完整流程 - 横向紧凑 -->
    <div class="flow-bar" v-if="currentStep >= 5">
      <div class="flow-items">
        <span v-for="(step, i) in steps" :key="i" class="flow-item-mini" :class="{ highlight: i === 5 }">
          [{{ stepIcons[i] }}] {{ step.shortName }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const currentStep = ref(0)
const boxSize = ref(0)
const layerOp = ref(0)

const stepIcons = ['清单', '图纸', '组装', '测量', '上色', '完成']

const steps = [
  {
    id: 'parse',
    name: '解析 HTML',
    shortName: '解析',
    desc: '浏览器读取HTML代码，理解页面结构。',
    analogy: '拆开包裹，先看清单。'
  },
  {
    id: 'cssom',
    name: '解析 CSS',
    shortName: '样式',
    desc: '浏览器读取CSS样式，知道每个元素的样子。',
    analogy: '看装修设计图。'
  },
  {
    id: 'render',
    name: '合并渲染树',
    shortName: '合并',
    desc: '把HTML结构和CSS样式结合。',
    analogy: '把结构图和设计图结合。'
  },
  {
    id: 'layout',
    name: '计算布局',
    shortName: '布局',
    desc: '计算每个元素在屏幕上的位置和大小。',
    analogy: '丈量房间尺寸。'
  },
  {
    id: 'paint',
    name: '绘制像素',
    shortName: '绘制',
    desc: '把颜色、文字绘制到屏幕上。',
    analogy: '刷漆、贴壁纸。'
  },
  {
    id: 'composite',
    name: '合成显示',
    shortName: '显示',
    desc: '把所有图层合成，最终显示。',
    analogy: '装修完成！'
  }
]

const goToStep = (step) => { currentStep.value = step }
const nextStep = () => { if (currentStep.value < steps.length - 1) currentStep.value++ }
const prevStep = () => { if (currentStep.value > 0) currentStep.value-- }

watch(currentStep, (newStep) => {
  if (newStep === 3) { boxSize.value = 0; setTimeout(() => boxSize.value = 60, 100) }
  if (newStep === 4) { layerOp.value = 0; setTimeout(() => layerOp.value = 1, 100) }
})
</script>

<style scoped>
.unboxing-demo {
  background: var(--vp-c-bg-soft);
  border: 2px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 16px;
  margin: 16px 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

/* 紧凑头部 */
.compact-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 12px;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--vp-c-divider);
  flex-wrap: wrap;
}
.header-left {
  display: flex;
  align-items: center;
  gap: 8px;
}
.title-icon {
  font-size: 12px;
  color: var(--vp-c-brand);
  font-weight: 600;
}
.header-title {
  font-size: 15px;
  font-weight: 700;
  color: var(--vp-c-text-1);
}
.header-steps {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}
.step-chip {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 10px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  cursor: pointer;
  font-size: 11px;
  transition: all 0.2s;
}
.step-chip:hover { border-color: var(--vp-c-brand); }
.step-chip.active {
  background: var(--vp-c-brand);
  border-color: var(--vp-c-brand);
  color: white;
}
.step-chip.completed { border-color: #67c23a; color: #67c23a; }
.chip-num {
  width: 14px;
  height: 14px;
  background: var(--vp-c-divider);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 9px;
}
.step-chip.active .chip-num { background: rgba(255,255,255,0.3); }

/* 横向主区域 */
.main-stage {
  display: grid;
  grid-template-columns: 1fr 1.5fr 1fr;
  gap: 12px;
  margin-bottom: 12px;
}
.stage-box {
  background: var(--vp-c-bg);
  border-radius: 8px;
  padding: 10px;
  min-height: 100px;
}
.box-label {
  font-size: 11px;
  font-weight: 600;
  color: var(--vp-c-text-2);
  margin-bottom: 8px;
  padding-bottom: 6px;
  border-bottom: 1px solid var(--vp-c-divider);
}

/* 代码输入 */
.code-mini {
  font-family: monospace;
  font-size: 10px;
  line-height: 1.4;
  color: var(--vp-c-text-2);
  margin: 0;
  white-space: pre-wrap;
}

/* 处理过程 */
.process-content {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 70px;
}
.mini-tree {
  font-family: monospace;
  font-size: 10px;
  line-height: 1.5;
}
.tree-line { display: block; }
.indent { margin-left: 12px; }
.indent2 { margin-left: 24px; }
.highlight { color: var(--vp-c-brand); font-weight: 600; }

.mini-css {
  font-family: monospace;
  font-size: 10px;
  background: var(--vp-c-bg-soft);
  padding: 8px 12px;
  border-radius: 4px;
}
.css-sel { color: #e6a23c; }
.css-val { color: #409eff; }

.mini-render {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 11px;
}
.render-tag {
  padding: 3px 8px;
  background: var(--vp-c-brand);
  color: white;
  border-radius: 3px;
  font-size: 10px;
}
.render-arrow { color: var(--vp-c-text-3); }
.render-style { color: var(--vp-c-text-2); }

.mini-layout {
  background: var(--vp-c-brand);
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 10px;
  font-weight: 600;
  transition: all 0.4s;
}

.mini-layers {
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
}
.layer-bar {
  padding: 4px 8px;
  background: var(--vp-c-bg-soft);
  border-radius: 3px;
  font-size: 10px;
  text-align: center;
  transition: opacity 0.4s;
}

.mini-final {
  padding: 12px 20px;
  background: linear-gradient(135deg, #409eff, #67c23a);
  color: white;
  border-radius: 4px;
  font-size: 14px;
}

/* 屏幕输出 */
.screen-mini {
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  overflow: hidden;
}
.browser-bar-mini {
  display: flex;
  gap: 3px;
  padding: 4px 6px;
  background: var(--vp-c-divider);
}
.browser-bar-mini span {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #ccc;
}
.browser-bar-mini span:nth-child(1) { background: #ff5f57; }
.browser-bar-mini span:nth-child(2) { background: #febc2e; }
.browser-bar-mini span:nth-child(3) { background: #28c840; }
.screen-content {
  padding: 16px;
  text-align: center;
  font-size: 11px;
  color: var(--vp-c-text-3);
  min-height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.screen-content.styled {
  background: #409eff;
  color: white;
}
.screen-content.final {
  background: linear-gradient(135deg, #409eff, #67c23a);
}

/* 双栏对照 */
.dual-bar {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 8px;
  align-items: center;
  background: var(--vp-c-bg);
  border-radius: 8px;
  padding: 10px 12px;
  margin-bottom: 10px;
}
.bar-side { text-align: center; }
.bar-label {
  font-size: 11px;
  color: var(--vp-c-text-2);
  line-height: 1.4;
}
.bar-divider {
  font-size: 12px;
  color: var(--vp-c-brand);
  font-weight: 700;
}

/* 控制按钮 */
.control-bar {
  display: flex;
  justify-content: center;
  gap: 10px;
}
.bar-btn {
  padding: 6px 16px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 14px;
  cursor: pointer;
  font-size: 11px;
  color: var(--vp-c-text-2);
  transition: all 0.2s;
}
.bar-btn:hover:not(:disabled) { border-color: var(--vp-c-brand); color: var(--vp-c-brand); }
.bar-btn:disabled { opacity: 0.4; cursor: not-allowed; }
.bar-btn.primary { background: var(--vp-c-brand); border-color: var(--vp-c-brand); color: white; }

/* 流程条 */
.flow-bar {
  margin-top: 10px;
  padding-top: 10px;
  border-top: 1px solid var(--vp-c-divider);
}
.flow-items {
  display: flex;
  justify-content: center;
  gap: 8px;
  flex-wrap: wrap;
}
.flow-item-mini {
  padding: 4px 10px;
  background: var(--vp-c-bg);
  border-radius: 12px;
  font-size: 10px;
  color: var(--vp-c-text-2);
}
.flow-item-mini.highlight {
  background: linear-gradient(135deg, #67c23a, #85ce61);
  color: white;
}

@media (max-width: 768px) {
  .main-stage { grid-template-columns: 1fr; }
  .compact-header { flex-direction: column; align-items: flex-start; }
  .dual-bar { grid-template-columns: 1fr; gap: 4px; }
  .bar-divider { display: none; }
}
</style>
