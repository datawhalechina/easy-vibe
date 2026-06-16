<script setup>
import { ref, computed } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { portsLocalhostLocale } from '../../../locales/ports-localhost/index.js'

const { t } = useI18n(portsLocalhostLocale)

const currentStep = ref(0)
const isPlaying = ref(false)

const steps = computed(() => [
  {
    title: t('devServerFlow.step1Title'),
    terminal: '$ npm run dev\n\n> vite\n\n  准备就绪...',
    desc: t('devServerFlow.step1Desc'),
    highlight: 'terminal'
  },
  {
    title: t('devServerFlow.step2Title'),
    terminal: '$ npm run dev\n\n> vite\n\n  VITE v5.4.0  ready in 200 ms\n\n  ➜  Local:   http://localhost:5173/\n  ➜  Network: http://192.168.1.10:5173/',
    desc: t('devServerFlow.step2Desc'),
    highlight: 'server'
  },
  {
    title: t('devServerFlow.step3Title'),
    terminal: '$ npm run dev\n\n> vite\n\n  VITE v5.4.0  ready in 200 ms\n\n  ➜  Local:   http://localhost:5173/\n  ➜  Network: http://192.168.1.10:5173/',
    browser: 'http://localhost:5173',
    desc: t('devServerFlow.step3Desc'),
    highlight: 'browser'
  },
  {
    title: t('devServerFlow.step4Title'),
    terminal: '$ npm run dev\n\n> vite\n\n  VITE v5.4.0  ready in 200 ms\n\n  ➜  Local:   http://localhost:5173/\n  ➜  Network: http://192.168.1.10:5173/\n\n  10:30:01 [200] /\n  10:30:01 [200] /src/main.js\n  10:30:01 [200] /src/App.vue',
    browser: 'http://localhost:5173',
    page: t('devServerFlow.pageAppeared'),
    desc: t('devServerFlow.step4Desc'),
    highlight: 'page'
  },
  {
    title: t('devServerFlow.step5Title'),
    terminal: '$ npm run dev\n\n  VITE v5.4.0  ready in 200 ms\n\n  ➜  Local:   http://localhost:5173/\n\n  10:30:01 [200] /\n  10:35:22 [vite] hmr update /src/App.vue',
    browser: 'http://localhost:5173',
    page: t('devServerFlow.pageRefreshed'),
    desc: t('devServerFlow.step5Desc'),
    highlight: 'hmr'
  }
])

async function playAll() {
  if (isPlaying.value) return
  isPlaying.value = true
  currentStep.value = 0
  for (let i = 0; i < steps.value.length; i++) {
    currentStep.value = i
    await new Promise(r => setTimeout(r, 1800))
  }
  isPlaying.value = false
}

function goStep(i) {
  currentStep.value = i
}

function reset() {
  currentStep.value = 0
  isPlaying.value = false
}
</script>

<template>
  <div class="devserver-flow-demo">
    <div class="control-panel">
      <div class="step-indicators">
        <div
          v-for="(s, i) in steps"
          :key="i"
          :class="['step-dot', { active: currentStep >= i, current: currentStep === i }]"
          @click="goStep(i)"
        >
          {{ i + 1 }}
        </div>
      </div>
      <div class="control-btns">
        <button class="action-btn" :disabled="isPlaying" @click="playAll">
          {{ isPlaying ? t('devServerFlow.playing') : t('devServerFlow.autoPlay') }}
        </button>
        <button class="action-btn ghost" @click="reset">{{ t('devServerFlow.reset') }}</button>
      </div>
    </div>

    <div class="visualization-area">
      <div class="step-title">{{ steps[currentStep].title }}</div>

      <div class="flow-layout">
        <div :class="['panel terminal-panel', { highlight: steps[currentStep].highlight === 'terminal' }]">
          <div class="panel-header">
            <span class="dot red" /><span class="dot yellow" /><span class="dot green" />
            <span class="panel-title">{{ t('devServerFlow.terminal') }}</span>
          </div>
          <pre class="terminal-content">{{ steps[currentStep].terminal }}</pre>
        </div>

        <div class="arrow-col">
          <div :class="['flow-arrow', { active: currentStep >= 1 }]">
            <span class="arrow-label">{{ t('devServerFlow.listening') }}</span>
            <span class="arrow-char">↕</span>
          </div>
        </div>

        <div :class="['panel browser-panel', {
          highlight: steps[currentStep].highlight === 'browser' || steps[currentStep].highlight === 'page' || steps[currentStep].highlight === 'hmr'
        }]"
>
          <div class="panel-header">
            <span class="dot red" /><span class="dot yellow" /><span class="dot green" />
            <span class="panel-title">{{ t('devServerFlow.browser') }}</span>
          </div>
          <div class="browser-content">
            <div v-if="steps[currentStep].browser" class="browser-url-bar">
              {{ steps[currentStep].browser }}
            </div>
            <div v-else class="browser-empty">等待你打开{{ t('devServerFlow.browser') }}...</div>
            <div v-if="steps[currentStep].page" class="browser-page">
              {{ steps[currentStep].page }}
            </div>
          </div>
        </div>
      </div>

      <div class="step-desc">
        💡 {{ steps[currentStep].desc }}
      </div>
    </div>

    <div class="http-explain">
      <div class="http-title">{{ t('devServerFlow.httpTitle') }}</div>
      <div class="http-analogy">
        <div class="analogy-item">
          <span class="analogy-icon">🏪</span>
          <div class="analogy-text">
            <strong>{{ t('devServerFlow.httpAnalogy1') }}</strong>
            <span>HTTP 服务器就像一个"永远开着的服务窗口"——它一直等在那里，有人来问就回答，没人来就静静等着。</span>
          </div>
        </div>
        <div class="analogy-item">
          <span class="analogy-icon">📋</span>
          <div class="analogy-text">
            <strong>{{ t('devServerFlow.httpAnalogy2') }}</strong>
            <span>这个窗口只听得懂 HTTP 协议的请求格式（比如 <code>GET /index.html</code>），然后把对应的文件内容返回给你。</span>
          </div>
        </div>
        <div class="analogy-item">
          <span class="analogy-icon">⚙️</span>
          <div class="analogy-text">
            <strong>{{ t('devServerFlow.httpAnalogy3') }}</strong>
            <span>Vite、Webpack 的开发服务器不只是"原样返回文件"，它还会即时编译你的代码（Vue → JS、TS → JS、Sass → CSS），然后再返回给{{ t('devServerFlow.browser') }}。</span>
          </div>
        </div>
      </div>
    </div>

    <div class="info-box">
      <strong>{{ t('devServerFlow.summary') }}</strong>{{ t('devServerFlow.summaryContent') }}
    </div>
  </div>
</template>

<style scoped>
.devserver-flow-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background-color: var(--vp-c-bg-soft);
  overflow: hidden;
  margin: 0.5rem 0;
}

.control-panel {
  padding: 1rem;
  background: var(--vp-c-bg);
  border-bottom: 1px solid var(--vp-c-divider);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.step-indicators {
  display: flex;
  gap: 0.4rem;
}

.step-dot {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 700;
  cursor: pointer;
  border: 2px solid var(--vp-c-divider);
  color: var(--vp-c-text-3);
  background: var(--vp-c-bg);
  transition: all 0.2s;
}

.step-dot.active {
  border-color: var(--vp-c-brand);
  color: var(--vp-c-brand);
}

.step-dot.current {
  background: var(--vp-c-brand);
  color: white;
  border-color: var(--vp-c-brand);
}

.control-btns {
  display: flex;
  gap: 0.4rem;
}

.action-btn {
  padding: 0.35rem 0.7rem;
  background: var(--vp-c-brand);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.82rem;
  font-weight: 600;
  transition: opacity 0.2s;
}

.action-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.action-btn.ghost {
  background: transparent;
  color: var(--vp-c-text-2);
  border: 1px solid var(--vp-c-divider);
}

.visualization-area {
  padding: 1rem;
}

.step-title {
  font-weight: 700;
  font-size: 0.95rem;
  margin-bottom: 0.75rem;
  color: var(--vp-c-brand);
}

.flow-layout {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 0.5rem;
  align-items: stretch;
}

.panel {
  border: 2px solid var(--vp-c-divider);
  border-radius: 8px;
  overflow: hidden;
  background: var(--vp-c-bg);
  transition: border-color 0.3s, box-shadow 0.3s;
}

.panel.highlight {
  border-color: var(--vp-c-brand);
  box-shadow: 0 0 12px rgba(100, 108, 255, 0.2);
}

.panel-header {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.4rem 0.6rem;
  background: var(--vp-c-bg-alt);
  border-bottom: 1px solid var(--vp-c-divider);
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}
.dot.red { background: #ef4444; }
.dot.yellow { background: #f59e0b; }
.dot.green { background: #10b981; }

.panel-title {
  font-size: 0.78rem;
  font-weight: 600;
  margin-left: 0.3rem;
  color: var(--vp-c-text-2);
}

.terminal-content {
  padding: 0.75rem;
  font-family: var(--vp-font-family-mono);
  font-size: 0.75rem;
  line-height: 1.5;
  color: var(--vp-c-text-1);
  margin: 0;
  min-height: 140px;
  white-space: pre-wrap;
  word-break: break-all;
}

.browser-content {
  padding: 0.75rem;
  min-height: 140px;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.browser-url-bar {
  background: var(--vp-c-bg-alt);
  padding: 0.35rem 0.6rem;
  border-radius: 4px;
  font-family: var(--vp-font-family-mono);
  font-size: 0.78rem;
  color: var(--vp-c-text-2);
  border: 1px solid var(--vp-c-divider);
}

.browser-empty {
  color: var(--vp-c-text-3);
  font-size: 0.85rem;
  text-align: center;
  padding: 2rem 0;
}

.browser-page {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--vp-c-brand);
}

.arrow-col {
  display: flex;
  align-items: center;
  justify-content: center;
}

.flow-arrow {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.2rem;
  opacity: 0.3;
  transition: opacity 0.3s;
}

.flow-arrow.active {
  opacity: 1;
}

.arrow-label {
  font-size: 0.68rem;
  color: var(--vp-c-text-3);
  writing-mode: vertical-rl;
}

.arrow-char {
  font-size: 1.2rem;
  color: var(--vp-c-brand);
}

.step-desc {
  margin-top: 0.75rem;
  padding: 0.6rem 0.75rem;
  background: var(--vp-c-bg);
  border-radius: 6px;
  border: 1px solid var(--vp-c-divider);
  font-size: 0.88rem;
  color: var(--vp-c-text-2);
}

.http-explain {
  padding: 1rem;
  border-top: 1px solid var(--vp-c-divider);
}

.http-title {
  font-weight: 700;
  font-size: 0.92rem;
  margin-bottom: 0.6rem;
  color: var(--vp-c-text-1);
}

.http-analogy {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.analogy-item {
  display: flex;
  align-items: flex-start;
  gap: 0.6rem;
  padding: 0.6rem 0.75rem;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
}

.analogy-icon {
  font-size: 1.2rem;
  flex-shrink: 0;
  margin-top: 0.1rem;
}

.analogy-text {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}

.analogy-text strong {
  font-size: 0.85rem;
}

.analogy-text span {
  font-size: 0.82rem;
  color: var(--vp-c-text-2);
  line-height: 1.5;
}

.analogy-text code {
  font-size: 0.78rem;
  background: var(--vp-c-bg-alt);
  padding: 0.1rem 0.3rem;
  border-radius: 3px;
}

.info-box {
  padding: 0.75rem 1rem;
  background: var(--vp-c-bg);
  border-top: 1px solid var(--vp-c-divider);
  font-size: 0.88rem;
  color: var(--vp-c-text-2);
  display: flex;
  gap: 0.25rem;
}

.info-box strong {
  white-space: nowrap;
  flex-shrink: 0;
}

@media (max-width: 640px) {
  .flow-layout {
    grid-template-columns: 1fr;
  }
  .arrow-col {
    transform: rotate(90deg);
    padding: 0.3rem 0;
  }
  .arrow-label {
    writing-mode: horizontal-tb;
  }
}
</style>
