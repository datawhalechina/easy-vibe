<!--
  MicroserviceLatencyDemo.vue
  微服务架构中的网络延迟累积演示
-->
<template>
  <div class="microservice-latency-demo">
    <div class="header">
      <div class="title">微服务延迟：网络调用的代价</div>
      <div class="subtitle">
        每次服务间调用都增加网络延迟，累积后响应时间变长
      </div>
    </div>

    <div class="controls">
      <label
        >服务间调用次数：<strong>{{ callCount }}</strong></label
      >
      <input v-model="callCount" type="range" min="1" max="10" step="1" />

      <label
        >网络延迟：<strong>{{ networkLatency }} ms</strong></label
      >
      <input v-model="networkLatency" type="range" min="1" max="50" step="1" />
    </div>

    <div class="comparison">
      <div class="architecture monolith">
        <div class="arch-title">单体架构</div>
        <div class="arch-box">
          <div class="single-process">
            <div class="module">User</div>
            <div class="module">Order</div>
            <div class="module">Payment</div>
          </div>
        </div>
        <div class="latency">
          <div class="latency-value">{{ monolithLatency }} ms</div>
          <div class="latency-label">内存调用（~0ms）</div>
        </div>
      </div>

      <div class="architecture microservices">
        <div class="arch-title">微服务架构</div>
        <div class="arch-box">
          <div class="services">
            <div class="service">User Svc</div>
            <div class="network-arrow" v-if="callCount > 1">
              ⇄ {{ networkLatency }}ms
            </div>
            <div class="service">Order Svc</div>
            <div class="network-arrow" v-if="callCount > 2">
              ⇄ {{ networkLatency }}ms
            </div>
            <div class="service">Payment Svc</div>
          </div>
        </div>
        <div class="latency">
          <div class="latency-value high">{{ microLatency }} ms</div>
          <div class="latency-label">网络调用累积</div>
        </div>
      </div>
    </div>

    <div class="insight">
      <div class="insight-icon" v-html="insightIcon"></div>
      <div class="insight-text">{{ insight }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const callCount = ref(3)
const networkLatency = ref(15)

const baseLatency = 10
const monolithLatency = computed(() => baseLatency)

const microLatency = computed(() =>
  Math.round(baseLatency + callCount.value * networkLatency.value * 2)
)

const insight = computed(() => {
  const ratio = Math.round(microLatency.value / monolithLatency.value)
  if (ratio <= 2) return '微服务架构的延迟还可以接受，但比单体慢'
  if (ratio <= 5) return '服务拆分越多，网络延迟累积越明显'
  return '过多的服务间调用会导致性能严重下降！'
})

const insightIcon = computed(() => {
  const ratio = Math.round(microLatency.value / monolithLatency.value)
  if (ratio <= 2) return '✅'
  if (ratio <= 5) return '⚠️'
  return '🚨'
})
</script>

<style scoped>
.microservice-latency-demo {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  padding: 1.5rem;
  margin: 1.5rem 0;
  font-family: var(--vp-font-family-base);
}

.header {
  margin-bottom: 1rem;
}

.title {
  font-weight: 700;
  font-size: 1.05rem;
}

.subtitle {
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
}

.controls {
  margin-bottom: 1.5rem;
}

.controls label {
  display: block;
  margin-bottom: 0.4rem;
  font-size: 0.9rem;
}

.controls input[type='range'] {
  width: 100%;
  margin-bottom: 0.75rem;
}

.comparison {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

@media (max-width: 640px) {
  .comparison {
    grid-template-columns: 1fr;
  }
}

.architecture {
  background: var(--vp-c-bg);
  border-radius: 10px;
  padding: 1rem;
  border: 1px solid var(--vp-c-divider);
}

.arch-title {
  font-weight: 600;
  margin-bottom: 0.75rem;
  text-align: center;
}

.arch-box {
  min-height: 120px;
}

.single-process {
  display: flex;
  flex-direction: column;
  gap: 4px;
  background: #eff6ff;
  padding: 0.75rem;
  border-radius: 6px;
  border: 2px dashed #93c5fd;
}

.module {
  background: #dbeafe;
  padding: 6px;
  border-radius: 3px;
  font-size: 0.85rem;
  text-align: center;
}

.services {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.service {
  background: #fef3c7;
  padding: 8px;
  border-radius: 4px;
  font-size: 0.85rem;
  text-align: center;
  border: 1px solid #fbbf24;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.network-arrow {
  text-align: center;
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  font-weight: 600;
  animation: pulse 1.5s ease-in-out infinite;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.7;
    transform: scale(0.98);
  }
}

.latency {
  margin-top: 1rem;
  text-align: center;
  padding-top: 0.75rem;
  border-top: 1px solid var(--vp-c-divider);
}

.latency-value {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
}

.latency-value.high {
  color: #ef4444;
}

.latency-label {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  margin-top: 0.25rem;
}

.insight {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-top: 1.5rem;
  padding: 0.75rem 1rem;
  background: var(--vp-c-bg);
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
}

.insight-icon {
  font-size: 1.5rem;
}

.insight-text {
  flex: 1;
  font-size: 0.9rem;
  color: var(--vp-c-text-1);
}
</style>
