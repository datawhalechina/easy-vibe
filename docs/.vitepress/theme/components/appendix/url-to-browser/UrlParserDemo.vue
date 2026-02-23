<template>
  <div class="url-parser-demo">
    <div class="url-line">
      <span class="part protocol">https://</span><span class="part host">www.google.com</span><span class="part path">/search</span><span class="part query">?q=hello</span>
    </div>
    <div class="labels">
      <span class="label protocol">协议</span>
      <span class="label host">域名</span>
      <span class="label path">路径</span>
      <span class="label query">参数</span>
    </div>
  </div>
</template>

<style scoped>
.url-parser-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg-soft);
  padding: 0.5rem 0.6rem;
  margin: 0.5rem 0;
  font-family: var(--vp-font-family-mono);
}

.url-line {
  font-size: 0.75rem;
  margin-bottom: 0.3rem;
  word-break: break-all;
  line-height: 1.6;
}

.part {
  padding: 0.05rem 0.15rem;
  border-radius: 3px;
}

.part.protocol { background: #fee2e2; color: #dc2626; }
.part.host { background: #dbeafe; color: #2563eb; }
.part.path { background: #d1fae5; color: #059669; }
.part.query { background: #ede9fe; color: #7c3aed; }

.labels {
  display: flex;
  gap: 0.3rem;
}

.label {
  font-size: 0.6rem;
  padding: 0.05rem 0.25rem;
  border-radius: 3px;
}

.label.protocol { background: #fee2e2; color: #dc2626; }
.label.host { background: #dbeafe; color: #2563eb; }
.label.path { background: #d1fae5; color: #059669; }
.label.query { background: #ede9fe; color: #7c3aed; }
</style>
