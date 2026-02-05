<!--
  SourceMapDemo.vue
  SourceMap原理演示

  用途：
  展示SourceMap如何将压缩后的代码映射回源代码。
-->
<template>
  <div class="source-map-demo">
    <div class="demo-header">
      <h3>🗺️ SourceMap 原理演示</h3>
      <p>调试压缩代码的秘密武器</p>
    </div>

    <div class="demo-content">
      <div class="code-comparison">
        <div class="code-panel source">
          <div class="panel-title">📄 源代码 (Source)</div>
          <pre class="code-block"><code>function calculateSum(a, b) {
  // 计算两个数的和
  const result = a + b;
  console.log('结果:', result);
  return result;
}

const sum = calculateSum(10, 20);
console.log('总和:', sum);</code></pre>
        </div>

        <div class="mapping-arrows">
          <div class="arrow" v-for="i in 5" :key="i">
            <span class="line"></span>
            <span class="point">→</span>
          </div>
        </div>

        <div class="code-panel minified">
          <div class="panel-title">🔧 压缩后 (Minified)</div>
          <pre class="code-block"><code>function n(n,r){var t=n+r;return console.log("结果:",t),t}var r=n(10,20);console.log("总和:",r);
//# sourceMappingURL=app.js.map</code></pre>
        </div>
      </div>

      <div class="sourcemap-explanation">
        <div class="explanation-section">
          <h4>📦 SourceMap 文件内容示例</h4>
          <pre class="json-block"><code>{
  "version": 3,
  "sources": ["src/utils.js", "src/main.js"],
  "names": ["calculateSum", "a", "b", "result"],
  "mappings": "AAAA,SAASA...",
  "file": "app.min.js"
}</code></pre>
          <ul class="field-explanation">
            <li><strong>version</strong>: SourceMap 规范版本（当前是 3）</li>
            <li><strong>sources</strong>: 原始源文件列表</li>
            <li><strong>names</strong>: 压缩前后的变量名映射</li>
            <li><strong>mappings</strong>: 位置映射信息（VLQ 编码）</li>
            <li><strong>file</strong>: 对应的压缩文件名</li>
          </ul>
        </div>

        <div class="tips-section">
          <h4>💡 使用建议</h4>
          <div class="tips-grid">
            <div class="tip-item">
              <span class="tip-icon">🚀</span>
              <div class="tip-content">
                <strong>开发环境</strong>
                <p>开启 SourceMap，方便调试</p>
              </div>
            </div>
            <div class="tip-item">
              <span class="tip-icon">🔒</span>
              <div class="tip-content">
                <strong>生产环境</strong>
                <p>不部署 .map 文件，防止源码泄露</p>
              </div>
            </div>
            <div class="tip-item">
              <span class="tip-icon">🗂️</span>
              <div class="tip-content">
                <strong>单独存放</strong>
                <p>使用 `sourceMappingURL` 指向独立服务器</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="info-box">
      <p>
        <span class="icon">💡</span>
        <strong>SourceMap 工作原理：</strong>
        压缩代码时，构建工具会记录每个字符在源代码中的位置，生成 .map 文件。
        浏览器调试时，通过映射关系把压缩后的代码"还原"成源代码显示。
        注意：生产环境不要暴露 .map 文件，防止源码泄露！
      </p>
    </div>
  </div>
</template>

<style scoped>
.source-map-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background-color: var(--vp-c-bg-soft);
  padding: 1rem;
  margin: 1rem 0;
  font-family: var(--vp-font-family-mono);
}

.demo-header h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1.1rem;
}

.demo-header p {
  margin: 0;
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
}

.demo-content {
  margin-top: 1rem;
}

.code-comparison {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

@media (max-width: 768px) {
  .code-comparison {
    grid-template-columns: 1fr;
  }

  .mapping-arrows {
    display: none;
  }
}

.code-panel {
  background: var(--vp-c-bg);
  border-radius: 6px;
  border: 1px solid var(--vp-c-divider);
  overflow: hidden;
}

.code-panel .panel-title {
  background: var(--vp-c-bg-soft);
  padding: 0.4rem 0.6rem;
  font-size: 0.8rem;
  font-weight: 600;
  border-bottom: 1px solid var(--vp-c-divider);
}

.code-block {
  padding: 0.6rem;
  font-size: 0.75rem;
  line-height: 1.5;
  margin: 0;
  overflow-x: auto;
  color: var(--vp-c-text-1);
}

.mapping-arrows {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.5rem 0;
}

.arrow {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 20px;
}

.arrow .line {
  width: 20px;
  height: 1px;
  background: var(--vp-c-brand);
}

.arrow .point {
  color: var(--vp-c-brand);
  font-size: 0.8rem;
  margin-left: -2px;
}

.sourcemap-explanation {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

@media (max-width: 768px) {
  .sourcemap-explanation {
    grid-template-columns: 1fr;
  }
}

.explanation-section,
.tips-section {
  background: var(--vp-c-bg);
  border-radius: 6px;
  border: 1px solid var(--vp-c-divider);
  padding: 0.75rem;
}

.explanation-section h4,
.tips-section h4 {
  margin: 0 0 0.75rem 0;
  font-size: 0.85rem;
  color: var(--vp-c-text-1);
}

.json-block {
  background: var(--vp-c-bg-soft);
  border-radius: 4px;
  padding: 0.5rem;
  font-size: 0.7rem;
  line-height: 1.4;
  overflow-x: auto;
  margin: 0 0 0.75rem 0;
  color: var(--vp-c-text-1);
}

.field-explanation {
  margin: 0;
  padding-left: 1rem;
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
}

.field-explanation li {
  margin-bottom: 0.25rem;
}

.field-explanation strong {
  color: var(--vp-c-text-1);
}

.tips-grid {
  display: grid;
  gap: 0.5rem;
}

.tip-item {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  padding: 0.5rem;
  background: var(--vp-c-bg-soft);
  border-radius: 4px;
}

.tip-icon {
  font-size: 1.1rem;
  line-height: 1;
}

.tip-content strong {
  display: block;
  font-size: 0.8rem;
  margin-bottom: 0.1rem;
  color: var(--vp-c-text-1);
}

.tip-content p {
  margin: 0;
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  line-height: 1.3;
}

.info-box {
  background-color: var(--vp-c-bg-alt);
  padding: 0.75rem;
  border-radius: 6px;
  font-size: 0.85rem;
  line-height: 1.4;
  color: var(--vp-c-text-2);
}

.info-box .icon {
  margin-right: 0.5rem;
}
</style>
