<template>
  <div class="selectors-demo">
    <div class="hint">
      👇 鼠标悬停在左侧 CSS 代码上，看看右侧 HTML 谁会被选中
    </div>

    <div class="comparison">
      <!-- Left: CSS Rules -->
      <div class="column css-col">
        <div class="col-title">CSS (样式表)</div>
        <div class="rules-list">
          <div
            class="rule-item"
            :class="{ active: activeType === 'tag' }"
            @mouseenter="activeType = 'tag'"
            @mouseleave="activeType = null"
          >
            <div class="selector">p</div>
            <div class="block">{ color: #333; }</div>
            <div class="explanation">
              <span class="badge tag">标签选择器</span>
              直接写标签名，选中所有 <code>&lt;p&gt;</code>
            </div>
          </div>

          <div
            class="rule-item"
            :class="{ active: activeType === 'class' }"
            @mouseenter="activeType = 'class'"
            @mouseleave="activeType = null"
          >
            <div class="selector">.card</div>
            <div class="block">{ background: white; }</div>
            <div class="explanation">
              <span class="badge class">类选择器</span>
              以 <code>.</code> 开头，选中所有 <code>class="card"</code>
            </div>
          </div>

          <div
            class="rule-item"
            :class="{ active: activeType === 'id' }"
            @mouseenter="activeType = 'id'"
            @mouseleave="activeType = null"
          >
            <div class="selector">#submit-btn</div>
            <div class="block">{ font-weight: bold; }</div>
            <div class="explanation">
              <span class="badge id">ID 选择器</span>
              以 <code>#</code> 开头，选中唯一 <code>id="submit-btn"</code>
            </div>
          </div>
        </div>
      </div>

      <!-- Center: Connector -->
      <div class="connector">
        <div class="line-path" :class="activeType"></div>
        <div class="icon">🔗</div>
      </div>

      <!-- Right: HTML Structure -->
      <div class="column html-col">
        <div class="col-title">HTML (结构)</div>
        <div class="code-view">
          <div class="html-line" :class="{ highlight: activeType === 'tag' }">
            &lt;p&gt;我是普通段落&lt;/p&gt;
          </div>

          <div class="html-line" :class="{ highlight: activeType === 'class' }">
            &lt;div <span class="attr">class="card"</span>&gt;
          </div>

          <div
            class="html-line indent"
            :class="{
              highlight: activeType === 'tag' || activeType === 'class'
            }"
          >
            &lt;p&gt;我是卡片里的段落&lt;/p&gt;
          </div>

          <div class="html-line" :class="{ highlight: activeType === 'class' }">
            &lt;/div&gt;
          </div>

          <div class="html-line" :class="{ highlight: activeType === 'id' }">
            &lt;button
            <span class="attr">id="submit-btn"</span>&gt;提交&lt;/button&gt;
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const activeType = ref(null)
</script>

<style scoped>
.selectors-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  padding: 20px;
  margin: 20px 0;
  font-family: var(--vp-font-family-mono);
  font-size: 13px;
}

.hint {
  text-align: center;
  color: var(--vp-c-text-2);
  margin-bottom: 16px;
  font-family: var(--vp-font-family-base);
  font-size: 14px;
}

.comparison {
  display: flex;
  gap: 10px;
  align-items: stretch;
}

.column {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.col-title {
  font-weight: bold;
  margin-bottom: 10px;
  text-align: center;
  color: var(--vp-c-text-1);
}

/* CSS Column */
.rule-item {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
  position: relative;
}

.rule-item:hover,
.rule-item.active {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-brand-dimm);
  transform: translateX(5px);
}

.selector {
  color: #d73a49; /* Red-ish for selector */
  font-weight: bold;
}
.rule-item:nth-child(2) .selector {
  color: #6f42c1;
} /* Purple for class */
.rule-item:nth-child(3) .selector {
  color: #005cc5;
} /* Blue for ID */

.explanation {
  margin-top: 6px;
  font-size: 12px;
  color: var(--vp-c-text-2);
  display: flex;
  align-items: center;
  gap: 6px;
}

.badge {
  font-size: 10px;
  padding: 2px 4px;
  border-radius: 4px;
  color: white;
}
.badge.tag {
  background: #d73a49;
}
.badge.class {
  background: #6f42c1;
}
.badge.id {
  background: #005cc5;
}

/* HTML Column */
.code-view {
  background: #1e1e1e;
  color: #abb2bf;
  padding: 15px;
  border-radius: 6px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.html-line {
  padding: 4px 8px;
  border-radius: 4px;
  transition: all 0.2s;
  border: 1px solid transparent;
}

.html-line.indent {
  margin-left: 20px;
}

.html-line.highlight {
  background: rgba(255, 255, 255, 0.15);
  border-color: rgba(255, 255, 255, 0.3);
  color: white;
  text-shadow: 0 0 5px rgba(255, 255, 255, 0.5);
}

.attr {
  color: #98c379;
}

/* Connector */
.connector {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  position: relative;
}

.icon {
  font-size: 20px;
  z-index: 2;
  background: var(--vp-c-bg-soft);
}

@media (max-width: 600px) {
  .comparison {
    flex-direction: column;
  }
  .rule-item:hover,
  .rule-item.active {
    transform: translateY(2px);
  }
  .connector {
    width: 100%;
    height: 30px;
  }
}
</style>
