<template>
  <div class="url-parser-demo custom-demo-base">
    <div class="demo-label">URL 解析 ── 把人类文字翻译成结构化信息</div>

    <div class="demo-panel url-panel">
      <!-- url block -->
      <div class="url-layout">
        <span 
          class="url-part protocol" 
          :class="{ active: activePart === 'protocol' }"
          @mouseenter="activePart = 'protocol'"
          @mouseleave="activePart = null"
        >https://</span>
        <span 
          class="url-part host"
          :class="{ active: activePart === 'host' }"
          @mouseenter="activePart = 'host'"
          @mouseleave="activePart = null"
        >www.google.com</span>
        <span 
          class="url-part path"
          :class="{ active: activePart === 'path' }"
          @mouseenter="activePart = 'path'"
          @mouseleave="activePart = null"
        >/search</span>
      </div>

      <div class="info-blocks">
        <div 
          class="info-card protocol-card"
          :class="{ active: activePart === 'protocol' }"
          @mouseenter="activePart = 'protocol'"
          @mouseleave="activePart = null"
        >
          <div class="card-title">🚛 交通方式 (协议 Protocol)</div>
          <div class="card-desc">代表你要求坐安全级别最高的"运钞车"（加密通信HTTPS）。如果是 HTTP，就是老式敞篷车，沿途都会被看见。</div>
        </div>

        <div 
          class="info-card host-card"
          :class="{ active: activePart === 'host' }"
          @mouseenter="activePart = 'host'"
          @mouseleave="activePart = null"
        >
          <div class="card-title">🏢 店铺名 (主机名 Host)</div>
          <div class="card-desc">这就是你要去哪家店，也是服务器的域名，后续浏览器需要把它翻译成网络世界认的数字 IP。</div>
        </div>

        <div 
          class="info-card path-card"
          :class="{ active: activePart === 'path' }"
          @mouseenter="activePart = 'path'"
          @mouseleave="activePart = null"
        >
          <div class="card-title">📍 具体货架 (路径 Path)</div>
          <div class="card-desc">进了店门之后，你要去哪个房间拿具体的哪件商品或执行具体的某个动作。</div>
        </div>
      </div>
    </div>
    <div class="demo-status">悬停查看每个部分的职责</div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const activePart = ref(null)
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
  gap: 1.5rem;
  padding: 1.5rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg);
}

.demo-status {
  margin-top: 0.75rem;
  font-size: 0.78rem;
  color: var(--vp-c-text-3);
  text-align: center;
}

.url-layout {
  font-size: 1.8rem;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.2rem;
  flex-wrap: wrap;
  font-family: var(--vp-font-family-mono);
  padding: 1rem;
  border-radius: 8px;
  background: var(--vp-c-bg-alt);
}

.url-part {
  padding: 0.3rem 0.6rem;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
  border: 2px solid transparent;
}

.url-part.protocol { color: var(--vp-c-danger-1, #ef4444); }
.url-part.protocol.active { background: var(--vp-c-danger-soft, #fef2f2); border-color: var(--vp-c-danger-1, #ef4444); transform: scale(1.05); }

.url-part.host { color: var(--vp-c-brand-1, #3b82f6); }
.url-part.host.active { background: var(--vp-c-brand-soft, #eff6ff); border-color: var(--vp-c-brand-1, #3b82f6); transform: scale(1.05); }

.url-part.path { color: var(--vp-c-success-1, #10b981); }
.url-part.path.active { background: var(--vp-c-success-soft, #ecfdf5); border-color: var(--vp-c-success-1, #10b981); transform: scale(1.05); }

.info-blocks {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.info-card {
  padding: 1.2rem;
  border-radius: 8px;
  border: 2px solid transparent;
  background: var(--vp-c-bg-alt);
  transition: all 0.2s;
  cursor: pointer;
}

.info-card:hover, .info-card.active {
  transform: translateY(-4px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.protocol-card.active { border-color: var(--vp-c-danger-1, #ef4444); background: var(--vp-c-danger-soft, #fef2f2); }
.host-card.active { border-color: var(--vp-c-brand-1, #3b82f6); background: var(--vp-c-brand-soft, #eff6ff); }
.path-card.active { border-color: var(--vp-c-success-1, #10b981); background: var(--vp-c-success-soft, #ecfdf5); }

.card-title {
  font-size: 0.95rem;
  font-weight: bold;
  margin-bottom: 0.6rem;
  color: var(--vp-c-text-1);
}

.protocol-card.active .card-title { color: var(--vp-c-danger-1, #ef4444); }
.host-card.active .card-title { color: var(--vp-c-brand-1, #3b82f6); }
.path-card.active .card-title { color: var(--vp-c-success-1, #10b981); }

.card-desc {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  line-height: 1.6;
}

@media (max-width: 640px) {
  .url-layout { font-size: 1.2rem; }
  .info-blocks { grid-template-columns: 1fr; }
}
</style>
