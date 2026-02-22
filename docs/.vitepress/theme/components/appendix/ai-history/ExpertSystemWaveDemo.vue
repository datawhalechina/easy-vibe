<template>
  <div class="demo-card">
    <div class="expert-system-flow">
      <div class="es-card success">
        <div class="es-title">🌟 专家系统的辉煌</div>
        <div class="es-list">
          <div class="es-item">
            <span class="es-box input">人类专家经验</span>
            <span class="es-arrow">→</span>
            <span class="es-box rules">转为 IF-THEN 规则库</span>
          </div>
          <div class="es-item">
            <span class="es-box input">特定领域问题</span>
            <span class="es-arrow">→</span>
            <span class="es-box output">推理解答 (诊断/配置)</span>
          </div>
        </div>
        <div class="es-tags">
          <span class="es-tag">1965: Dendral (化学)</span>
          <span class="es-tag">1977: MYCIN (医疗)</span>
          <span class="es-tag">1980: XCON (配置)</span>
        </div>
      </div>

      <div class="es-arrow-down">⬇️ 局限性爆发 ⬇️</div>

      <div class="es-card winter">
        <div class="es-title"><span class="snow">❄️</span> 第一次 AI 寒冬 (1974-1980)</div>
        <div class="winter-reasons">
          <div class="reason">
            <span class="r-icon">📝</span>
            <div class="r-text">
              <strong>知识获取瓶颈</strong>
              <span>波兰尼悖论：人类无法说清所有规律。大量"常识"无法被人工硬编码。</span>
            </div>
          </div>
          <div class="reason">
            <span class="r-icon">💥</span>
            <div class="r-text">
              <strong>组合爆炸 & 脆性问题</strong>
              <span>现实情况太多，穷举极难；且缺少常识，稍微偏离规则库系统就直接崩溃。</span>
            </div>
          </div>
          <div class="reason">
            <span class="r-icon">📉</span>
            <div class="r-text">
              <strong>算力不足 & 经费断层</strong>
              <span>当时的硬件算力根本无法支撑爆发性的逻辑推演，遭遇 DARPA 研发经费大削减。</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.demo-card { border: 1px solid var(--vp-c-divider); border-radius: 8px; background: var(--vp-c-bg-soft); padding: 1.25rem; margin: 1rem 0; }
.expert-system-flow { display: flex; flex-direction: column; align-items: center; gap: 0.8rem; }
.es-card { width: 100%; max-width: 500px; border: 1px solid var(--vp-c-divider); border-radius: 6px; padding: 1rem; background: var(--vp-c-bg); }
.es-card.success { border-top: 3px solid #059669; }
.es-card.winter { border-top: 3px solid #3b82f6; background: rgba(59, 130, 246, 0.03); }
.es-title { font-weight: bold; font-size: 0.9rem; margin-bottom: 0.8rem; text-align: center; color: var(--vp-c-text-1); }
.es-list { display: flex; flex-direction: column; gap: 0.6rem; margin-bottom: 1rem; }
.es-item { display: flex; align-items: center; justify-content: center; gap: 0.4rem; font-size: 0.75rem; }
.es-box { padding: 0.4rem 0.6rem; border-radius: 4px; font-weight: 500; border: 1px solid var(--vp-c-divider); text-align: center; }
.es-box.input { background: var(--vp-c-bg-soft); color: var(--vp-c-text-2); }
.es-box.rules { background: #d1fae5; color: #065f46; border-color: #34d399; }
.es-box.output { background: #e0e7ff; color: #3730a3; border-color: #818cf8; }
.html.dark .es-box.rules { background: rgba(5, 150, 105, 0.2); color: #a7f3d0; border-color: #059669; }
.html.dark .es-box.output { background: rgba(79, 70, 229, 0.2); color: #c7d2fe; border-color: #4f46e5; }

.es-arrow { color: var(--vp-c-text-3); font-weight: bold; }
.es-tags { display: flex; flex-wrap: wrap; justify-content: center; gap: 0.5rem; }
.es-tag { font-size: 0.65rem; background: var(--vp-c-bg-soft); padding: 0.15rem 0.5rem; border-radius: 12px; color: var(--vp-c-text-2); border: 1px solid var(--vp-c-divider); }
.es-arrow-down { font-size: 0.8rem; color: var(--vp-c-text-3); font-weight: bold; margin: 0.2rem 0; }
.snow { color: #3b82f6; margin-right: 0.2rem; }
.winter-reasons { display: flex; flex-direction: column; gap: 0.6rem; }
.reason { display: flex; align-items: flex-start; gap: 0.6rem; background: var(--vp-c-bg-alt); padding: 0.6rem; border-radius: 6px; border: 1px solid var(--vp-c-divider); }
.r-icon { font-size: 1.2rem; margin-top: 0.1rem; }
.r-text { display: flex; flex-direction: column; }
.r-text strong { font-size: 0.8rem; color: var(--vp-c-text-1); }
.r-text span { font-size: 0.7rem; color: var(--vp-c-text-2); line-height: 1.4; margin-top: 0.15rem; }
</style>
