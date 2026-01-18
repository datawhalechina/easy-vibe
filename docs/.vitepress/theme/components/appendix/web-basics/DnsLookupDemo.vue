<template>
  <div class="dns-lookup-demo simple-mode">
    <div class="concept-explanation">
      <p class="why-text">
        <strong>为什么需要 DNS？(查导航)</strong>
      </p>
      <p class="why-desc-zh">
        你知道店铺名字叫 "Shop.com"，但快递员需要知道具体的经纬度坐标 (IP 地址)
        才能送达。
        <br />
        DNS 就像是<strong>地图导航</strong>，输入店名，它告诉你具体的坐标。
      </p>
    </div>

    <div class="demo-stage">
      <div class="input-area">
        <span class="label">店铺名称 (域名)</span>
        <div class="fake-input">shop.com</div>
      </div>

      <div class="process-animation">
        <div class="arrow-down">⬇️</div>
        <div class="dns-box">
          <div class="icon">🧭</div>
          <div class="title">DNS (地图导航)</div>
          <div class="desc">正在查找 shop.com 的位置...</div>
        </div>
        <div class="arrow-down">⬇️</div>
      </div>

      <div class="output-area">
        <span class="label">GPS 坐标 (IP 地址)</span>
        <div class="fake-output">93.184.216.34</div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Simplified: No need for complex i18n logic anymore as we display both.
defineProps({
  lang: String // Accepted but ignored
})
</script>

<style scoped>
.dns-lookup-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg);
  padding: 1.5rem;
  margin: 1rem 0;
  font-family: var(--vp-font-family-mono);
}

.concept-explanation {
  background: var(--vp-c-bg-soft);
  padding: 1rem;
  border-radius: 6px;
  margin-bottom: 2rem;
}

.why-text {
  margin: 0 0 0.5rem 0;
  color: var(--vp-c-brand);
  font-weight: bold;
}

.why-desc-en {
  margin: 0 0 0.5rem 0;
  color: var(--vp-c-text-1);
  line-height: 1.5;
  font-size: 0.95rem;
}

.why-desc-zh {
  margin: 0;
  color: var(--vp-c-text-2);
  line-height: 1.5;
  font-size: 0.9rem;
}

.demo-stage {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.input-area,
.output-area {
  text-align: center;
  width: 100%;
}

.label {
  font-size: 0.8rem;
  color: var(--vp-c-text-3);
  display: block;
  margin-bottom: 0.5rem;
}

.fake-input,
.fake-output {
  background: var(--vp-c-bg-alt);
  padding: 0.8rem;
  border-radius: 8px;
  font-size: 1.2rem;
  font-weight: bold;
  border: 2px solid var(--vp-c-divider);
}

.fake-input {
  border-color: #3b82f6;
  color: #3b82f6;
}

.fake-output {
  border-color: #10b981;
  color: #10b981;
}

.process-animation {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.dns-box {
  background: #fffbeb;
  border: 2px solid #f59e0b;
  padding: 1rem 2rem;
  border-radius: 12px;
  text-align: center;
  width: 240px; /* Slightly wider for bilingual text */
}

.html.dark .dns-box {
  background: #451a03;
}

.icon {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.title {
  font-weight: bold;
  color: #d97706;
  font-size: 0.9rem;
}

.desc {
  font-size: 0.8rem;
  color: #b45309;
  margin-top: 0.2rem;
}

.arrow-down {
  font-size: 1.5rem;
  color: var(--vp-c-text-3);
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(5px);
  }
}
</style>
