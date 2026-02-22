<template>
  <div class="demo-card">
    <div class="demo-label">符号主义的核心思路 ── 把知识写成规则</div>
    <div class="code-block">
      <div class="code-line"><span class="kw">IF</span>  体温 &gt; 38.5°C  <span class="kw">AND</span>  白细胞计数 &gt; 11000</div>
      <div class="code-line indent"><span class="kw">THEN</span>  诊断 = <span class="str">"细菌感染"</span></div>
      <div class="code-line"><span class="kw">IF</span>  诊断 = <span class="str">"细菌感染"</span>  <span class="kw">AND</span>  对青霉素不过敏</div>
      <div class="code-line indent"><span class="kw">THEN</span>  治疗方案 = <span class="str">"青霉素 400mg / 每日两次"</span></div>
      <div class="code-line comment">// 早期医疗专家系统（MYCIN，1977）就是由 450+ 条这样的规则组成的</div>
    </div>
    <div class="demo-caption">人类专家把经验翻译成一条条 IF-THEN 规则，机器逐条匹配执行</div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.demo-card {
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
  margin-bottom: 0.6rem;
  letter-spacing: 0.2px;
}
.code-block {
  background: #1e1e2e;
  border-radius: 6px;
  padding: 0.9rem 1.1rem;
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
  font-size: 0.82rem;
  line-height: 1.85;
  display: flex;
  flex-direction: column;
  gap: 0.05rem;
}
.code-line { color: #cdd6f4; white-space: nowrap; overflow-x: auto; }
.code-line.indent { padding-left: 2rem; }
.kw { color: #89b4fa; font-weight: bold; }   /* blue – keywords */
.str { color: #a6e3a1; }                       /* green – strings */
.comment { color: #585b70; font-size: 0.75rem; margin-top: 0.4rem; font-style: italic; }
.demo-caption {
  font-size: 0.72rem;
  color: var(--vp-c-text-3);
  margin-top: 0.6rem;
  text-align: center;
}
</style>
