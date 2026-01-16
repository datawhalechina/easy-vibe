<template>
  <div class="url-to-browser-demo">
    <div class="stage-nav">
      <button
        v-for="(stage, index) in stages"
        :key="index"
        :class="{ active: currentStage === index }"
        @click="currentStage = index"
      >
        <span class="stage-num">{{ index + 1 }}</span>
        <span class="stage-name">{{ stage.name }}</span>
      </button>
    </div>

    <div class="stage-content">
      <transition name="fade" mode="out-in">
        <div :key="currentStage" class="stage-viz">
          <div class="viz-icon">{{ stages[currentStage].icon }}</div>
          <div class="viz-desc">
            <h3>{{ stages[currentStage].title }}</h3>
            <p>{{ stages[currentStage].desc }}</p>
          </div>
          <div class="viz-action">
            <component
              :is="stages[currentStage].component"
              v-if="stages[currentStage].component"
            />
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const currentStage = ref(0)

const stages = [
  {
    name: 'URL',
    title: 'Parsing the Address',
    desc: 'Browser breaks down the URL to understand protocol, domain, and path.',
    icon: '🔍',
    component: 'UrlParserDemo'
  },
  {
    name: 'DNS',
    title: 'Finding the IP',
    desc: 'Browser asks DNS servers to translate the domain name into an IP address.',
    icon: '🌐',
    component: 'DnsLookupDemo'
  },
  {
    name: 'TCP',
    title: 'Establishing Connection',
    desc: 'Browser and Server perform a 3-way handshake to create a reliable connection.',
    icon: '🤝',
    component: 'TcpHandshakeDemo'
  },
  {
    name: 'HTTP',
    title: 'Exchanging Data',
    desc: 'Browser sends a request, and the server sends back the website content.',
    icon: '📨',
    component: 'HttpExchangeDemo'
  },
  {
    name: 'Render',
    title: 'Painting the Page',
    desc: 'Browser parses HTML/CSS and paints pixels on your screen.',
    icon: '🎨',
    component: 'BrowserRenderingDemo'
  }
]
</script>

<style scoped>
.url-to-browser-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background-color: var(--vp-c-bg-soft);
  padding: 1.5rem;
  margin: 2rem 0;
}

.stage-nav {
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
  position: relative;
}

.stage-nav::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 2px;
  background: var(--vp-c-divider);
  z-index: 0;
}

.stage-nav button {
  position: relative;
  z-index: 1;
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider);
  border-radius: 20px;
  padding: 0.5rem 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: all 0.2s;
}

.stage-nav button.active {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-brand);
  color: white;
  transform: scale(1.1);
}

.stage-num {
  font-weight: bold;
  font-family: monospace;
}

.stage-content {
  background: var(--vp-c-bg);
  border-radius: 8px;
  padding: 2rem;
  text-align: center;
  min-height: 200px;
}

.viz-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.viz-desc h3 {
  margin-bottom: 0.5rem;
  color: var(--vp-c-text-1);
}

.viz-desc p {
  color: var(--vp-c-text-2);
  max-width: 500px;
  margin: 0 auto;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
