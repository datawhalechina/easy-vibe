<template>
  <div class="demo-card">
    <div class="foundation-container">
      
      <!-- Part 1: Core Theories -->
      <div class="section-block">
        <div class="section-title">核心人物与理论</div>
        <div class="event-list">
          <div class="event-item">
            <span class="e-year">1943</span>
            <span class="e-text"><strong>沃伦·麦卡洛克 & 沃尔特·皮茨</strong> 提出 <em>MP 神经元模型</em>，首次用数学描述神经网络</span>
          </div>
          <div class="event-item">
            <span class="e-year">1950</span>
            <span class="e-text"><strong>艾伦·图灵</strong> 发表《计算机器与智能》，提出 <em>图灵测试</em>，定义机器智能标准</span>
          </div>
          <div class="event-item highlight-event">
            <span class="e-year">1956</span>
            <span class="e-text"><strong>达特茅斯会议</strong>，约翰·麦卡锡首次提出"人工智能"概念，标志 AI 学科正式诞生</span>
          </div>
        </div>
      </div>

      <!-- Part 2: Symbolism -->
      <div class="symbolism-panel">
        <div class="s-header">
          <span class="s-icon">📜</span>
          <span class="s-title">符号主义兴起 (Symbolism)</span>
        </div>
        <div class="s-body">
          <div class="s-equation">智能 = 符号推理</div>
          <div class="s-desc">
            符号主义（逻辑主义/计算机学派）主张将知识编码为符号，通过 <strong>逻辑规则与推导</strong> 解决问题，这是一条极其依赖人类专家的 <em>自上而下</em> 的智能模拟路径。
          </div>
        </div>
      </div>

      <!-- Part 3: Early Breakthroughs -->
      <div class="section-block">
        <div class="section-title">早期突破</div>
        <div class="event-list">
          <div class="event-item">
            <span class="e-year">1956</span>
            <span class="e-text">纽厄尔和西蒙开发 <strong>逻辑理论家 (Logic Theorist)</strong>，首个能证明数学定理的 AI 程序</span>
          </div>
          <div class="event-item">
            <span class="e-year">1958</span>
            <span class="e-text">麦卡锡发明 <strong>LISP 语言</strong>，成为 AI 研究的重要工具</span>
          </div>
          <div class="event-item">
            <span class="e-year">1959</span>
            <span class="e-text">乔治·德沃尔与约瑟夫·恩格尔伯格开发首台 <strong>工业机器人</strong>，标志 AI 从理论走向应用</span>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.demo-card { border: 1px solid var(--vp-c-divider); border-radius: 8px; background: var(--vp-c-bg-soft); padding: 1.2rem; margin: 1rem 0; }
.foundation-container { display: flex; flex-direction: column; gap: 1.2rem; }

.section-block { display: flex; flex-direction: column; gap: 0.5rem; }
.section-title { font-weight: bold; font-size: 0.9rem; color: var(--vp-c-brand-1); border-bottom: 1px solid var(--vp-c-divider); padding-bottom: 0.3rem; margin-bottom: 0.3rem; }

.event-list { display: flex; flex-direction: column; gap: 0.5rem; }
.event-item { display: flex; align-items: flex-start; gap: 0.6rem; font-size: 0.8rem; line-height: 1.4; }
.e-year { font-weight: bold; background: var(--vp-c-bg-alt); padding: 0.1rem 0.4rem; border-radius: 4px; color: var(--vp-c-text-1); border: 1px solid var(--vp-c-divider); font-family: monospace; flex-shrink: 0; }
.e-text { color: var(--vp-c-text-2); padding-top: 0.1rem; }
.e-text strong { color: var(--vp-c-text-1); }
.e-text em { color: var(--vp-c-brand-1); font-style: normal; font-weight: 500; }
.highlight-event .e-year { background: #10b981; color: white; border-color: #059669; }

.symbolism-panel { background: rgba(16, 185, 129, 0.05); border: 1px dashed #10b981; border-radius: 8px; padding: 1rem; display: flex; flex-direction: column; gap: 0.6rem; text-align: center; }
.s-header { display: flex; align-items: center; justify-content: center; gap: 0.4rem; }
.s-icon { font-size: 1.2rem; }
.s-title { font-weight: bold; font-size: 0.95rem; color: #059669; }
.s-equation { font-family: monospace; font-size: 1rem; font-weight: bold; color: var(--vp-c-text-1); background: var(--vp-c-bg); padding: 0.4rem 1rem; border-radius: 6px; border: 1px solid var(--vp-c-divider); display: inline-block; margin: 0 auto; }
.s-desc { font-size: 0.78rem; color: var(--vp-c-text-2); line-height: 1.5; max-width: 90%; margin: 0 auto; }
.html.dark .symbolism-panel { background: rgba(5, 150, 105, 0.15); border-color: #059669; }
.html.dark .s-title { color: #34d399; }
</style>
