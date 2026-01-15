<template>
  <div class="web-tech-triad">
    <div class="triad-container">
      <!-- HTML -->
      <div class="tech-card html">
        <div class="tech-icon">🏗️</div>
        <div class="tech-title">HTML</div>
        <div class="tech-subtitle">结构层</div>
        <div class="tech-desc">网页的骨架</div>
        <div class="code-example">
          <div class="code-header">&lt;结构&gt;</div>
          <div class="code-content">
            &lt;h1&gt;标题&lt;/h1&gt;<br>
            &lt;p&gt;段落&lt;/p&gt;
          </div>
        </div>
        <div class="tech-role">
          <div class="role-item">✅ 定义内容</div>
          <div class="role-item">✅ 组织结构</div>
        </div>
      </div>

      <!-- CSS -->
      <div class="tech-card css">
        <div class="tech-icon">🎨</div>
        <div class="tech-title">CSS</div>
        <div class="tech-subtitle">表现层</div>
        <div class="tech-desc">网页的化妆师</div>
        <div class="code-example">
          <div class="code-header">&lt;样式&gt;</div>
          <div class="code-content">
            color: red;<br>
            font-size: 16px;
          </div>
        </div>
        <div class="tech-role">
          <div class="role-item">✅ 控制外观</div>
          <div class="role-item">✅ 响应布局</div>
        </div>
      </div>

      <!-- JavaScript -->
      <div class="tech-card js">
        <div class="tech-icon">⚡</div>
        <div class="tech-title">JavaScript</div>
        <div class="tech-subtitle">行为层</div>
        <div class="tech-desc">网页的灵魂</div>
        <div class="code-example">
          <div class="code-header">&lt;交互&gt;</div>
          <div class="code-content">
            onclick="..."<br>
            addEventListener()
          </div>
        </div>
        <div class="tech-role">
          <div class="role-item">✅ 处理事件</div>
          <div class="role-item">✅ 动态交互</div>
        </div>
      </div>
    </div>

    <div class="collaboration">
      <div class="collab-title">🤝 三者如何协作？</div>
      <div class="collab-demo">
        <div class="collab-step">
          <div class="step-number">1</div>
          <div class="step-content">
            <span class="step-tech">HTML</span> 搭建骨架
          </div>
        </div>
        <div class="collab-arrow">→</div>
        <div class="collab-step">
          <div class="step-number">2</div>
          <div class="step-content">
            <span class="step-tech">CSS</span> 美化外观
          </div>
        </div>
        <div class="collab-arrow">→</div>
        <div class="collab-step">
          <div class="step-number">3</div>
          <div class="step-content">
            <span class="step-tech">JS</span> 添加交互
          </div>
        </div>
      </div>
    </div>

    <div class="analogy">
      <div class="analogy-title">💡 生动比喻</div>
      <div class="analogy-content">
        建网站就像<strong>盖房子</strong>：
        <br><br>
        🏗️ <strong>HTML</strong> = 房屋结构（墙、屋顶、门窗）
        <br>
        🎨 <strong>CSS</strong> = 室内装修（颜色、家具、装饰）
        <br>
        ⚡ <strong>JavaScript</strong> = 智能家居（灯光控制、自动化）
      </div>
    </div>
  </div>
</template>

<style scoped>
.web-tech-triad {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 20px;
  background: var(--vp-c-bg-soft);
  margin: 20px 0;
}

.triad-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
  margin-bottom: 25px;
}

@media (max-width: 768px) {
  .triad-container {
    grid-template-columns: 1fr;
  }
}

.tech-card {
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 15px;
  text-align: center;
}

.tech-card.html {
  border-color: #e34c26;
}

.tech-card.css {
  border-color: #264de4;
}

.tech-card.js {
  border-color: #f7df1e;
}

.tech-icon {
  font-size: 2.5rem;
  margin-bottom: 10px;
}

.tech-title {
  font-size: 1.3rem;
  font-weight: bold;
  margin-bottom: 5px;
}

.tech-card.html .tech-title {
  color: #e34c26;
}

.tech-card.css .tech-title {
  color: #264de4;
}

.tech-card.js .tech-title {
  color: #f7df1e;
}

.tech-subtitle {
  font-size: 0.85rem;
  color: var(--vp-c-text-3);
  margin-bottom: 8px;
}

.tech-desc {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  margin-bottom: 15px;
}

.code-example {
  background: #000;
  border-radius: 6px;
  padding: 10px;
  margin-bottom: 15px;
  text-align: left;
}

.code-header {
  font-size: 0.7rem;
  color: #a1a1aa;
  margin-bottom: 6px;
  font-family: monospace;
}

.code-content {
  font-size: 0.75rem;
  color: #22c55e;
  font-family: monospace;
  line-height: 1.6;
}

.tech-role {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.role-item {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  text-align: left;
}

.collaboration {
  background: var(--vp-c-bg);
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
}

.collab-title {
  font-size: 1rem;
  font-weight: bold;
  color: var(--vp-c-text-1);
  margin-bottom: 15px;
  text-align: center;
}

.collab-demo {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  flex-wrap: wrap;
}

.collab-step {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.step-number {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: var(--vp-c-brand);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 0.9rem;
}

.step-content {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

.step-tech {
  font-weight: bold;
}

.collab-arrow {
  font-size: 1.5rem;
  color: var(--vp-c-text-3);
}

.analogy {
  background: var(--vp-c-bg);
  border-radius: 8px;
  padding: 15px;
}

.analogy-title {
  font-size: 1rem;
  font-weight: bold;
  color: var(--vp-c-text-1);
  margin-bottom: 10px;
}

.analogy-content {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  line-height: 1.8;
}
</style>
