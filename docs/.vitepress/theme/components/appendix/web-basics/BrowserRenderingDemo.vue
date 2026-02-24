<template>
  <div class="browser-rendering-demo custom-demo-base">
    <div class="demo-label">浏览器渲染 ── 干瘪文字拆解组装变成精美画面</div>
    <div class="demo-panel">
      
      <div class="stepper">
        <button v-for="(step, index) in steps" :key="index"
          class="step-btn"
          :class="{ active: currentStep === index, completed: currentStep > index }"
          @click="currentStep = index"
        >
          <div class="step-icon">{{ step.icon }}</div>
          <div class="step-name">{{ step.name }}</div>
        </button>
      </div>

      <div class="stage-window">
        <!-- 侧边说明 -->
        <div class="explanations">
          <div class="exp-title">{{ steps[currentStep].title }}</div>
          <div class="exp-desc">{{ steps[currentStep].desc }}</div>
        </div>

        <!-- 当前结果呈现区域 -->
        <div class="render-canvas">
          <!-- Step 0: 代码 -->
          <div v-if="currentStep === 0" class="canvas-item code-raw fade-in">
            <pre><code><b>&lt;html&gt;</b>
  <b>&lt;style&gt;</b>
   .title { color: #f00; }
  <b>&lt;/style&gt;</b>
  <b>&lt;body&gt;</b>
   <b>&lt;h1 class="title"&gt;</b>
     Google Search
   <b>&lt;/h1&gt;</b>
   <b>&lt;input /&gt;</b>
  <b>&lt;/body&gt;</b>
<b>&lt;/html&gt;</b></code></pre>
          </div>

          <!-- Step 1: DOM树 -->
          <div v-if="currentStep === 1" class="canvas-item dom-tree fade-in">
            <div class="tree-node">html
              <div class="tree-children">
                <div class="tree-node">body
                  <div class="tree-children">
                    <div class="tree-node leaf">h1 (Google)</div>
                    <div class="tree-node leaf">input (搜索框)</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Step 2: 结合 CSS -->
          <div v-if="currentStep === 2" class="canvas-item css-merge fade-in">
             <div class="merge-box">
                <div class="box-left">h1 (Google)</div>
                <div class="box-plus">+</div>
                <div class="box-right">.title { color: #f00 }</div>
                <div class="box-arrow">↓</div>
                <div class="box-result">h1 (红色文字规则)</div>
             </div>
          </div>

          <!-- Step 3: Layout -->
          <div v-if="currentStep === 3" class="canvas-item layout-plan fade-in">
             <div class="blueprint">
                <div class="bp-box bp-h1">x:50, y:20<br>w:200, h:40</div>
                <div class="bp-box bp-input">x:50, y:80<br>w:400, h:30</div>
             </div>
          </div>

          <!-- Step 4: Paint -->
          <div v-if="currentStep === 4" class="canvas-item final-paint fade-in">
             <div class="browser-fake">
               <h1 style="color:red; font-family:sans-serif; margin-bottom:20px; font-weight:normal;">Google Search</h1>
               <div style="width:100%; max-width:400px; height:36px; border-radius:20px; border:1px solid #dfe1e5; padding:0 20px; display:flex; align-items:center;">
                  🔍 
               </div>
             </div>
          </div>
        </div>
      </div>
    </div>
    <div class="demo-status">点击上方各步骤图标，查看每一阶段的工厂作业产出</div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const currentStep = ref(0)
const steps = [
  { icon: '📄', name: '源码', title: '拿到纯文本源代码', desc: '刚传回来的只是一堆干瘪的 HTML, CSS 等代码字符。这只是建造网页的说明书，不是真正的画面。' },
  { icon: '🦴', name: 'DOM解析', title: '1. 搭骨架 (DOM 解析)', desc: '第一步通读 HTML 标签，构建树状骨架图（DOM 树），了解结构关系，例如"标题框在身体(body)里"。' },
  { icon: '🎨', name: 'CSS解析', title: '2. 样式附加 (CSS 解析)', desc: '第二步读 CSS，把对应的样式规则（如"标题为红色"）关联并绑定到我们刚才搭建好的特定骨架节点上。' },
  { icon: '📏', name: 'Layout排版', title: '3. 几何排版 (Layout)', desc: '第三步拿尺子量每个骨架的大小。结合你的屏幕尺寸，精确计算出每个元素所在的绝对坐标 x, y 和明确的长宽高尺寸。' },
  { icon: '🖼️', name: 'Paint绘制', title: '4. 像素涂色 (Paint)', desc: '最后，有了骨架、颜色规则、和精准坐标尺寸，浏览器控制像素画笔，在一瞬间完成上色和填充！' }
]
</script>

<style scoped>
.custom-demo-base {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  padding: 1rem 1.2rem;
  margin: 1rem 0;
}

.demo-label {
  font-size: 0.78rem;
  font-weight: bold;
  color: var(--vp-c-text-2);
  margin-bottom: 0.75rem;
  letter-spacing: 0.2px;
}

.demo-panel {
  display: flex;
  flex-direction: column;
  padding: 1rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg);
}

.demo-status {
  margin-top: 0.75rem;
  font-size: 0.78rem;
  color: var(--vp-c-text-3);
  text-align: center;
  font-weight: bold;
}

.stepper {
  display: flex;
  justify-content: space-between;
  border-bottom: 2px solid var(--vp-c-divider);
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
}

.step-btn {
  flex: 1;
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.4rem;
  opacity: 0.5;
  transition: all 0.3s;
}

.step-btn.active { opacity: 1; transform: scale(1.1); }
.step-btn.completed { opacity: 0.8; }

.step-icon { font-size: 1.5rem; }
.step-name { font-size: 0.8rem; font-weight: bold; color: var(--vp-c-text-1); }

.stage-window {
  display: flex;
  gap: 2rem;
  align-items: center;
  min-height: 200px;
}

.explanations {
  flex: 1;
  padding: 1.5rem;
  background: var(--vp-c-bg-alt);
  border-radius: 8px;
  border-left: 4px solid var(--vp-c-brand-1, #3b82f6);
}

.exp-title { font-weight: bold; font-size: 1.05rem; margin-bottom: 0.8rem; color: var(--vp-c-text-1); }
.exp-desc { font-size: 0.85rem; color: var(--vp-c-text-2); line-height: 1.6; }

.render-canvas {
  flex: 1.2;
  height: 280px;
  border: 2px dashed var(--vp-c-divider);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background: var(--vp-c-bg-alt);
  overflow: hidden;
}

.canvas-item { width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; padding: 1rem; }
.fade-in { animation: fadeIn 0.4s ease-out; }
@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

/* Code state */
.code-raw pre { background: var(--vp-code-bg); padding: 1rem; border-radius: 6px; font-size: 0.75rem; color: var(--vp-code-color); width: 100%; height: 100%; overflow: auto; margin:0; line-height: 1.5;}

/* DOM Tree state */
.tree-node { border: 2px solid var(--vp-c-brand-soft); background: var(--vp-c-bg); padding: 0.5rem 1rem; border-radius: 6px; font-size: 0.8rem; font-weight: bold; text-align: center; color: var(--vp-c-text-1); }
.tree-children { display: flex; gap: 1.5rem; margin-top: 2rem; position: relative; justify-content: center; }
.tree-children::before { content:''; position: absolute; top: -2rem; left: 50%; width: 2px; height: 2rem; background: var(--vp-c-brand-soft); }
.tree-children .tree-node { position: relative; }
.tree-children .tree-node::before { content:''; position: absolute; top: -2rem; left: 50%; width: 2px; height: 2rem; background: var(--vp-c-brand-soft); }
.tree-node.leaf { background: var(--vp-c-brand-soft, #eff6ff); color: var(--vp-c-brand-1, #3b82f6); border-color: var(--vp-c-brand-1); }

/* CSS Merge */
.merge-box { display: flex; flex-direction: column; align-items: center; gap: 0.6rem; font-family: var(--vp-font-family-mono); font-size: 0.85rem;}
.box-left, .box-right { padding: 0.8rem 1.2rem; border-radius: 6px; border: 2px dashed var(--vp-c-text-3); background: var(--vp-c-bg); color: var(--vp-c-text-1); }
.box-result { padding: 0.8rem 1.2rem; border-radius: 6px; background: var(--vp-c-danger-soft, #fee2e2); color: var(--vp-c-danger-3, #b91c1c); border: 2px solid var(--vp-c-danger-1, #ef4444); font-weight: bold; }
.box-arrow, .box-plus { font-size: 1.5rem; font-weight: bold; color: var(--vp-c-text-2); }

/* Layout Plan */
.blueprint { width: 100%; height: 100%; position: relative; border: 2px solid var(--vp-c-brand-1); background: rgba(59, 130, 246, 0.05); }
.blueprint::before { content: 'Viewport Blueprint'; position: absolute; font-size: 0.75rem; color: var(--vp-c-brand-1); top: 8px; left: 8px; font-family: monospace; font-weight: bold; }
.bp-box { position: absolute; border: 2px dashed var(--vp-c-warning-1, #f59e0b); background: var(--vp-c-warning-soft, #fffbeb); color: var(--vp-c-warning-1); font-size: 0.75rem; padding: 4px; display: flex; align-items: center; justify-content: center; text-align: center; font-family: monospace; font-weight: bold; }
.bp-box.bp-h1 { top: 25%; left: 10%; width: 50%; height: 25%; }
.bp-box.bp-input { top: 60%; left: 10%; width: 80%; height: 20%; }

/* Final Paint */
.browser-fake { width: 100%; height: 100%; background: #fff; padding: 2rem; display: flex; flex-direction: column; justify-content: center; color: #1a1a1a; box-shadow: inset 0 0 10px rgba(0,0,0,0.05); }
html.dark .browser-fake { background: #111; color: #eee; }

@media (max-width: 768px) {
  .stage-window { flex-direction: column; }
  .stepper { flex-wrap: wrap; gap: 1rem; }
  .step-btn { flex: 1 1 20%; }
}
</style>
