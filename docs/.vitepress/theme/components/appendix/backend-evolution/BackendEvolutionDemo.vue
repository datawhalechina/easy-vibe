<template>
  <div class="backend-evolution-demo">
    <!-- Timeline -->
    <div class="timeline-container">
      <div class="timeline-track"></div>
      <button
        v-for="(stage, index) in stages"
        :key="index"
        class="timeline-node"
        :class="{
          active: currentStage === index,
          passed: currentStage > index
        }"
        @click="currentStage = index"
      >
        <div class="node-dot">
          <div class="inner-dot"></div>
        </div>
        <div class="node-content">
          <span class="year-badge">{{ stage.year }}</span>
          <span class="node-label">{{ stage.label }}</span>
        </div>
      </button>
    </div>

    <!-- Content -->
    <div class="content-wrapper">
      <transition name="fade-slide" mode="out-in">
        <div :key="currentStage" class="stage-content">
          <div class="header-section">
            <h3>
              <span class="stage-index"
                >{{ indexToRoman(currentStage + 1) }}.</span
              >
              {{ stages[currentStage].title }}
            </h3>
            <p>{{ stages[currentStage].desc }}</p>
          </div>

          <div class="visualization-grid">
            <!-- Architecture Diagram -->
            <div class="mac-window arch-window">
              <div class="window-bar">
                <div class="traffic-lights">
                  <span class="light red"></span>
                  <span class="light yellow"></span>
                  <span class="light green"></span>
                </div>
                <div class="window-title">Server Architecture</div>
              </div>
              <div class="arch-canvas">
                <!-- Stage 0: CGI/Static -->
                <div v-if="currentStage === 0" class="arch-static">
                  <div class="server-box">
                    <div class="server-icon">🖥️ Physical Server</div>
                    <div class="file-system">
                      <div class="file">index.html</div>
                      <div class="file">script.pl</div>
                      <div class="file">image.jpg</div>
                    </div>
                  </div>
                  <div class="request-arrow">
                    <span>GET /index.html</span>
                    <span class="arrow">➔</span>
                  </div>
                </div>

                <!-- Stage 1: Monolith -->
                <div v-if="currentStage === 1" class="arch-monolith">
                  <div class="server-box big">
                    <div class="server-icon">
                      🦍 Monolithic App (Tomcat/Django)
                    </div>
                    <div class="modules-grid">
                      <div class="module">User</div>
                      <div class="module">Order</div>
                      <div class="module">Payment</div>
                      <div class="module">Product</div>
                    </div>
                    <div class="db-connection">
                      <span>⬇ SQL</span>
                      <div class="db-icon">🗄️ Single DB</div>
                    </div>
                  </div>
                </div>

                <!-- Stage 2: Microservices -->
                <div v-if="currentStage === 2" class="arch-micro">
                  <div class="cloud-bg">
                    <div class="service-mesh">
                      <div class="service user">
                        <span>User Svc</span>
                        <small>Redis</small>
                      </div>
                      <div class="service order">
                        <span>Order Svc</span>
                        <small>MySQL</small>
                      </div>
                      <div class="service pay">
                        <span>Pay Svc</span>
                        <small>Postgres</small>
                      </div>
                    </div>
                  </div>
                  <div class="comm-lines">HTTP/gRPC</div>
                </div>

                <!-- Stage 3: Serverless -->
                <div v-if="currentStage === 3" class="arch-serverless">
                  <div class="function-cloud">
                    <div class="func-node">λ Login</div>
                    <div class="func-node">λ Checkout</div>
                    <div class="func-node">λ ResizeImg</div>
                  </div>
                  <div class="baas-layer">
                    <span>BaaS (Auth0, Supabase, Stripe)</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Deployment/Ops View -->
            <div class="mac-window ops-window">
              <div class="window-bar">
                <div class="window-title">Deployment & Ops</div>
              </div>
              <div class="ops-canvas">
                <div class="ops-card">
                  <div class="ops-icon">{{ stages[currentStage].opsIcon }}</div>
                  <div class="ops-title">
                    {{ stages[currentStage].opsTitle }}
                  </div>
                  <div class="ops-desc">{{ stages[currentStage].opsDesc }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const currentStage = ref(0)

const indexToRoman = (num) => {
  const map = { 1: 'I', 2: 'II', 3: 'III', 4: 'IV' }
  return map[num] || num
}

const stages = [
  {
    year: '1990s',
    label: 'CGI / Static',
    title: 'Physical Servers & Scripts',
    desc: 'In the beginning, servers were physical machines. We uploaded files via FTP. Backend logic was often simple Perl/CGI scripts executing one by one.',
    opsIcon: '🐌',
    opsTitle: 'Manual FTP Upload',
    opsDesc:
      'Development was slow. "It works on my machine" was the common nightmare. Scaling meant buying a bigger physical computer.'
  },
  {
    year: '2000s',
    label: 'Monolith',
    title: 'The Monolithic Era',
    desc: 'Frameworks like Java Spring, Rails, Django appeared. All logic (User, Order, Pay) was packed into ONE giant process. Simple to develop, hard to scale.',
    opsIcon: '🐳',
    opsTitle: 'Virtual Machines (VM)',
    opsDesc:
      'We started using VMs (AWS EC2). Scaling meant copying the entire giant application to multiple servers behind a Load Balancer.'
  },
  {
    year: '2014+',
    label: 'Microservices',
    title: 'Microservices & Containers',
    desc: 'Breaking the monolith! Each function (User, Order) became a separate tiny server. Docker changed the game by packaging dependencies together.',
    opsIcon: '☸️',
    opsTitle: 'Kubernetes (K8s)',
    opsDesc:
      'Orchestrating thousands of containers. Complexity exploded, but teams could work independently and scale specific parts (e.g., just the Payment service).'
  },
  {
    year: '2020s+',
    label: 'Serverless',
    title: 'Serverless & Edge',
    desc: 'No more managing servers. You just write a function (e.g., "resize image") and upload it. The cloud provider runs it only when needed (Pay-per-use).',
    opsIcon: '⚡',
    opsTitle: 'GitOps & Edge',
    opsDesc:
      'Push to Git -> Auto Deploy to global Edge nodes (Vercel, Cloudflare). Backend becomes "Functions + Managed Services (BaaS)".'
  }
]
</script>

<style scoped>
.backend-evolution-demo {
  border-radius: 16px;
  background: var(--vp-c-bg);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.05);
  border: 1px solid var(--vp-c-divider);
  overflow: hidden;
  margin: 2rem 0;
  font-family:
    -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial,
    sans-serif;
}

/* Timeline (Reused) */
.timeline-container {
  padding: 2rem 1rem 1rem;
  background: linear-gradient(to bottom, var(--vp-c-bg-soft), var(--vp-c-bg));
  display: flex;
  justify-content: space-between;
  position: relative;
  border-bottom: 1px solid var(--vp-c-divider);
}

.timeline-track {
  position: absolute;
  top: 2.5rem;
  left: 3rem;
  right: 3rem;
  height: 2px;
  background: var(--vp-c-divider);
  z-index: 0;
}

.timeline-node {
  position: relative;
  z-index: 1;
  background: transparent;
  border: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  padding: 0;
  width: 25%;
  transition: all 0.3s ease;
  opacity: 0.6;
}

.timeline-node:hover {
  opacity: 0.9;
}
.timeline-node.active,
.timeline-node.passed {
  opacity: 1;
}

.node-dot {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-text-3);
  margin-bottom: 0.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
}

.inner-dot {
  width: 0;
  height: 0;
  border-radius: 50%;
  background: var(--vp-c-brand);
  transition: all 0.3s;
}

.timeline-node.active .node-dot {
  border-color: var(--vp-c-brand);
  transform: scale(1.3);
  box-shadow: 0 0 0 4px var(--vp-c-bg-soft);
}
.timeline-node.active .inner-dot {
  width: 8px;
  height: 8px;
}
.timeline-node.passed .node-dot {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-brand);
}

.node-content {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.2rem;
}

.year-badge {
  font-size: 0.75rem;
  font-family: var(--vp-font-family-mono);
  background: var(--vp-c-bg-alt);
  padding: 2px 6px;
  border-radius: 4px;
  color: var(--vp-c-text-2);
}

.node-label {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

/* Content */
.content-wrapper {
  padding: 2rem;
  min-height: 400px;
}

.header-section {
  text-align: center;
  margin-bottom: 2rem;
  max-width: 600px;
  margin: 0 auto 2rem;
}

.header-section h3 {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  background: linear-gradient(
    120deg,
    #f59e0b,
    #ea580c
  ); /* Orange/Amber for Backend */
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.stage-index {
  color: var(--vp-c-text-3);
  -webkit-text-fill-color: var(--vp-c-text-3);
  margin-right: 0.5rem;
  font-weight: normal;
}
.header-section p {
  font-size: 1rem;
  color: var(--vp-c-text-2);
  line-height: 1.6;
}

/* Visualizations */
.visualization-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  align-items: stretch;
}

@media (max-width: 768px) {
  .visualization-grid {
    grid-template-columns: 1fr;
  }
}

.mac-window {
  border-radius: 12px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background: white;
  transition: transform 0.3s;
}
.mac-window:hover {
  transform: translateY(-5px);
}

.arch-window {
  background: #f1f5f9;
}
.ops-window {
  background: white;
}

.window-bar {
  padding: 0.8rem 1rem;
  background: white;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  display: flex;
  align-items: center;
  position: relative;
}

.traffic-lights {
  display: flex;
  gap: 6px;
}
.light {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}
.light.red {
  background: #ff5f56;
}
.light.yellow {
  background: #ffbd2e;
}
.light.green {
  background: #27c93f;
}

.window-title {
  position: absolute;
  left: 0;
  right: 0;
  text-align: center;
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  font-weight: 600;
}

.arch-canvas,
.ops-canvas {
  padding: 2rem;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 250px;
}

/* Arch Styles */
.server-box {
  background: #cbd5e1;
  border: 2px solid #94a3b8;
  padding: 1rem;
  border-radius: 8px;
  text-align: center;
}
.file-system {
  margin-top: 1rem;
  background: white;
  padding: 0.5rem;
  border-radius: 4px;
  font-family: monospace;
  font-size: 0.8rem;
}
.request-arrow {
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 0.8rem;
  color: #64748b;
}

.server-box.big {
  background: #dbeafe;
  border-color: #3b82f6;
  width: 100%;
  max-width: 250px;
}
.modules-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4px;
  margin: 1rem 0;
}
.module {
  background: #bfdbfe;
  padding: 4px;
  border-radius: 4px;
  font-size: 0.8rem;
  color: #1e40af;
}
.db-connection {
  font-size: 0.8rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.cloud-bg {
  width: 100%;
}
.service-mesh {
  display: flex;
  gap: 1rem;
  justify-content: center;
}
.service {
  background: white;
  border: 1px solid #e2e8f0;
  padding: 0.8rem;
  border-radius: 6px;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
}
.service small {
  color: #64748b;
  font-size: 0.7rem;
  margin-top: 4px;
}
.comm-lines {
  margin-top: 1rem;
  font-size: 0.8rem;
  color: #94a3b8;
  text-align: center;
  border-top: 1px dashed #cbd5e1;
  width: 80%;
  padding-top: 4px;
}

.function-cloud {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
  margin-bottom: 1.5rem;
}
.func-node {
  background: #fef3c7;
  border: 1px solid #f59e0b;
  color: #b45309;
  padding: 6px 12px;
  border-radius: 20px;
  font-family: monospace;
  font-size: 0.8rem;
}
.baas-layer {
  width: 100%;
  background: #e0e7ff;
  padding: 0.5rem;
  text-align: center;
  border-radius: 6px;
  font-size: 0.8rem;
  color: #4338ca;
  font-weight: bold;
}

/* Ops Card */
.ops-card {
  text-align: center;
}
.ops-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
}
.ops-title {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: var(--vp-c-text-1);
}
.ops-desc {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  line-height: 1.5;
}

/* Transitions */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.4s ease;
}
.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(20px);
}
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>
