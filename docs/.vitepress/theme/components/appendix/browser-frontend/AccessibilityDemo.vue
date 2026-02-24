<template>
  <div class="demo-wrapper">
    <div class="demo-header">
      <span class="icon">🔍</span> 
      <span>无障碍对象模型 (AOM) 视角对比演示</span>
    </div>
    
    <div class="intro-text">
      请尝试使用<strong>纯键盘（Tab 键与 Enter 键）</strong>分别操作下方两个面板中的元素，并观察右侧“屏幕阅读器”捕获到的 AOM 层解析结果。
    </div>

    <div class="comparison-container">
      <!-- 案例 A：仅仅是看起来像按钮 -->
      <div class="case-panel bad-case">
        <h3 class="case-title">❌ 案例 A：纯粹的视觉欺骗</h3>
        <p class="case-desc">使用 <code>&lt;div&gt;</code> 结合 CSS 绘制。在渲染树上很完美，但在 AOM 树中缺失语义。</p>
        
        <div class="interactive-area">
          <div class="label">操作确认：</div>
          <!-- 伪造的 input -->
          <div 
            class="fake-input" 
            @click="simulateFocus('bad', '文本：请输入验证码')"
          >
            请输入验证码
          </div>
          <!-- 伪造的 button -->
          <div 
            class="fake-button" 
            @mouseenter="simulateFocus('bad', '文本：确认提交')"
            @mouseleave="clearFocus('bad')"
            @click="handleClick('bad')"
          >
            确认提交
          </div>
        </div>

        <div class="aom-monitor">
          <div class="monitor-header">💻 屏幕阅读器解析 (AOM)：</div>
          <div class="monitor-screen" :class="{ 'has-content': badCaseOutput }">
            {{ badCaseOutput || '（视障用户无法通过 Tab 键选中此区域的任何元素）' }}
          </div>
        </div>
      </div>

      <!-- 案例 B：语义化与 ARIA 规范 -->
      <div class="case-panel good-case">
        <h3 class="case-title">✅ 案例 B：语义化 + ARIA 护航</h3>
        <p class="case-desc">使用 <code>&lt;input&gt;</code>、<code>&lt;button&gt;</code> 等原生标签，补充 <code>aria-label</code>。在 AOM 树中拥有完整交互属性。</p>
        
        <div class="interactive-area">
          <label for="a11y-input" class="label">操作确认：</label>
          <input 
            id="a11y-input"
            type="text" 
            placeholder="请输入验证码"
            @focus="simulateFocus('good', '输入框：操作确认，请输入验证码')"
            @blur="clearFocus('good')"
            @mouseenter="simulateFocus('good', '输入框：操作确认，请输入验证码')"
            @mouseleave="clearFocus('good')"
          />
          <button 
            type="button"
            class="real-button"
            aria-label="提交确认验证码"
            @focus="simulateFocus('good', '按钮：提交确认验证码。按下回车键激活。')"
            @blur="clearFocus('good')"
            @mouseenter="simulateFocus('good', '按钮：提交确认验证码。')"
            @mouseleave="clearFocus('good')"
            @click="handleClick('good')"
          >
            确认提交
          </button>
        </div>

        <div class="aom-monitor">
          <div class="monitor-header">💻 屏幕阅读器解析 (AOM)：</div>
          <div class="monitor-screen" :class="{ 'has-content': goodCaseOutput }">
            {{ goodCaseOutput || '（鼠标悬停或按 Tab 键切入以查看解析）' }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const badCaseOutput = ref('')
const goodCaseOutput = ref('')
let timerBad = null
let timerGood = null

const simulateFocus = (type, text) => {
  if (type === 'bad') {
    if (timerBad) clearTimeout(timerBad)
    badCaseOutput.value = text
  } else {
    if (timerGood) clearTimeout(timerGood)
    goodCaseOutput.value = '🗣️ 正在朗读：' + text
  }
}

const clearFocus = (type) => {
  if (type === 'bad') {
    timerBad = setTimeout(() => { badCaseOutput.value = '' }, 400)
  } else {
    timerGood = setTimeout(() => { goodCaseOutput.value = '' }, 400)
  }
}

const handleClick = (type) => {
  if (type === 'bad') {
    alert('【系统提示】普通 div 虽然能绑定点击事件，但键盘用户无法使用 Tab 聚焦它，也无法用 Enter 键触发它。这对肢体障碍人士是灾难。')
  } else {
    alert('【系统提示】原生 button 点击触发成功！无论你是用鼠标点击，还是用键盘 Enter 键，都能完美触发。')
  }
}
</script>

<style scoped>
.demo-wrapper {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  padding: 1.8rem;
  margin: 2rem 0;
  font-family: var(--vp-font-family-base);
}

.demo-header {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
  margin-bottom: 1rem;
  border-bottom: 2px solid var(--vp-c-divider);
  padding-bottom: 0.8rem;
}

.intro-text {
  font-size: 0.95rem;
  color: var(--vp-c-text-2);
  margin-bottom: 1.8rem;
  line-height: 1.6;
}

.comparison-container {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

@media (min-width: 768px) {
  .comparison-container {
    flex-direction: row;
  }
  .case-panel {
    flex: 1;
    min-width: 0;
  }
}

.case-panel {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
}

.bad-case {
  border-top: 4px solid var(--vp-c-danger-1);
}

.good-case {
  border-top: 4px solid var(--vp-c-brand-1);
}

.case-title {
  margin: 0 0 0.8rem 0;
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
}

.case-desc {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  margin-bottom: 1.5rem;
  line-height: 1.5;
  min-height: 2.5rem;
}

.case-desc code {
  background: var(--vp-c-bg-alt);
  padding: 0.1rem 0.3rem;
  border-radius: 4px;
  color: var(--vp-c-text-1);
}

.interactive-area {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: var(--vp-c-bg-alt);
  border-radius: 6px;
  border: 1px dashed var(--vp-c-divider);
}

.label {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

/* 伪造元素的样式 */
.fake-input {
  background: #fff;
  border: 1px solid #ccc;
  padding: 0.6rem 0.8rem;
  font-size: 0.9rem;
  color: #888;
  cursor: text;
  border-radius: 4px;
}
.fake-button {
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  padding: 0.6rem 1.2rem;
  text-align: center;
  font-weight: 600;
  border-radius: 4px;
  cursor: pointer;
  border: 1px solid var(--vp-c-brand-soft);
}
/* 注意：这里故意不写 :focus 样式，以反映一般野路子开发的现状 */

/* 真实原生元素的样式 */
#a11y-input {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  padding: 0.6rem 0.8rem;
  font-size: 0.9rem;
  color: var(--vp-c-text-1);
  border-radius: 4px;
  transition: all 0.2s;
}
#a11y-input:focus {
  outline: none;
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 0 0 2px var(--vp-c-brand-soft);
}
.real-button {
  background: var(--vp-c-brand-1);
  color: #fff;
  padding: 0.6rem 1.2rem;
  text-align: center;
  font-weight: 600;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
}
.real-button:hover {
  background: var(--vp-c-brand-2);
}
.real-button:focus-visible {
  outline: none;
  box-shadow: 0 0 0 3px var(--vp-c-brand-soft);
}

/* 屏幕阅读器模拟面板 */
.aom-monitor {
  margin-top: auto;
  background: #1e293b;
  border-radius: 6px;
  padding: 1rem;
  border-left: 4px solid #475569;
}

.monitor-header {
  font-size: 0.8rem;
  color: #94a3b8;
  margin-bottom: 0.6rem;
  font-weight: 600;
}

.monitor-screen {
  font-family: "Courier New", Courier, monospace;
  font-size: 0.9rem;
  color: #64748b;
  min-height: 2.5rem;
  line-height: 1.4;
}

.monitor-screen.has-content {
  color: #34d399; /* 绿色亮起，表示正确读出语义 */
  font-weight: bold;
}

.dark .fake-input { background: #333; border-color: #555; }
</style>
