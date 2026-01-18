<template>
  <div class="monolith-microservice-demo">
    <div class="controls">
      <button class="action-btn crash-btn" @click="triggerCrash">
        💥 Simulate Order Service Crash
      </button>
      <button class="action-btn reset-btn" @click="reset">🔄 Reset</button>
    </div>

    <div class="comparison-view">
      <!-- Monolith -->
      <div class="architecture-block monolith">
        <div class="arch-header">Monolith Architecture</div>
        <div class="server-container" :class="{ crashed: monolithCrashed }">
          <div class="process-box">
            <div class="module user">User</div>
            <div class="module order" :class="{ error: monolithCrashed }">
              Order
            </div>
            <div class="module pay">Payment</div>
          </div>
          <div class="status-indicator">
            Status:
            {{ monolithCrashed ? 'SYSTEM DOWN (Critical Failure)' : 'Healthy' }}
          </div>
        </div>
        <div class="desc">
          One process. If "Order" module has a memory leak or fatal error,
          <strong>the entire server crashes</strong>. Everyone is affected.
        </div>
      </div>

      <!-- Microservices -->
      <div class="architecture-block microservices">
        <div class="arch-header">Microservices Architecture</div>
        <div class="services-container">
          <div class="service-box user">
            <span>User Svc</span>
            <div class="dot green"></div>
          </div>
          <div class="service-box order" :class="{ crashed: microCrashed }">
            <span>Order Svc</span>
            <div class="dot" :class="microCrashed ? 'red' : 'green'"></div>
          </div>
          <div class="service-box pay">
            <span>Payment Svc</span>
            <div class="dot green"></div>
          </div>
        </div>
        <div class="status-indicator">
          Status: {{ microCrashed ? 'Partial Outage (Order Down)' : 'Healthy' }}
        </div>
        <div class="desc">
          Isolated processes. If "Order" crashes, User and Payment services
          <strong>keep running</strong>. The system degrades gracefully.
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const monolithCrashed = ref(false)
const microCrashed = ref(false)

const triggerCrash = () => {
  monolithCrashed.value = true
  microCrashed.value = true
}

const reset = () => {
  monolithCrashed.value = false
  microCrashed.value = false
}
</script>

<style scoped>
.monolith-microservice-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  padding: 1.5rem;
  margin: 1rem 0;
}

.controls {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-bottom: 2rem;
}

.action-btn {
  padding: 0.5rem 1rem;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.2s;
}

.crash-btn {
  background: #ef4444;
  color: white;
}
.crash-btn:hover {
  background: #dc2626;
}

.reset-btn {
  background: var(--vp-c-brand);
  color: white;
}

.comparison-view {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

@media (max-width: 640px) {
  .comparison-view {
    grid-template-columns: 1fr;
  }
}

.architecture-block {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.arch-header {
  font-weight: bold;
  margin-bottom: 1rem;
  color: var(--vp-c-text-1);
}

/* Monolith Visuals */
.server-container {
  border: 2px solid #3b82f6;
  background: #eff6ff;
  padding: 1rem;
  border-radius: 8px;
  width: 100%;
  text-align: center;
  transition: all 0.3s;
}

.server-container.crashed {
  border-color: #ef4444;
  background: #fef2f2;
  animation: shake 0.5s;
}

.process-box {
  display: flex;
  flex-direction: column;
  gap: 4px;
  background: white;
  padding: 0.5rem;
  border-radius: 4px;
  border: 1px dashed #93c5fd;
}

.module {
  background: #dbeafe;
  padding: 4px;
  border-radius: 2px;
  font-size: 0.8rem;
}
.module.error {
  background: #ef4444;
  color: white;
}

/* Microservices Visuals */
.services-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
}

.service-box {
  background: white;
  border: 1px solid #e5e7eb;
  padding: 0.8rem;
  border-radius: 6px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.service-box.crashed {
  border-color: #ef4444;
  background: #fef2f2;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}
.dot.green {
  background: #22c55e;
  box-shadow: 0 0 4px #22c55e;
}
.dot.red {
  background: #ef4444;
  box-shadow: 0 0 4px #ef4444;
}

.status-indicator {
  margin-top: 1rem;
  font-size: 0.9rem;
  font-weight: bold;
  color: var(--vp-c-text-2);
}

.desc {
  margin-top: 1rem;
  font-size: 0.8rem;
  color: var(--vp-c-text-3);
  text-align: center;
  line-height: 1.5;
}

@keyframes shake {
  0% {
    transform: translate(1px, 1px) rotate(0deg);
  }
  10% {
    transform: translate(-1px, -2px) rotate(-1deg);
  }
  20% {
    transform: translate(-3px, 0px) rotate(1deg);
  }
  30% {
    transform: translate(3px, 2px) rotate(0deg);
  }
  40% {
    transform: translate(1px, -1px) rotate(1deg);
  }
  50% {
    transform: translate(-1px, 2px) rotate(-1deg);
  }
  60% {
    transform: translate(-3px, 1px) rotate(0deg);
  }
  70% {
    transform: translate(3px, 1px) rotate(-1deg);
  }
  80% {
    transform: translate(-1px, -1px) rotate(1deg);
  }
  90% {
    transform: translate(1px, 2px) rotate(0deg);
  }
  100% {
    transform: translate(1px, -2px) rotate(-1deg);
  }
}
</style>
