<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useRouter, withBase } from 'vitepress'
import easyVibePaths from '../data/easyVibePaths.json'

const router = useRouter()
const WELCOME_SEEN_KEY = 'easy-vibe-welcome-seen'
const phase = ref('reset')
const theme = ref('ocean')
const themes = ['ocean', 'rainbow', 'sunset']
let timers = []

const themeColor = computed(() => `url(#welcome-${theme.value})`)
const themeClass = computed(() => `welcome-theme-${theme.value}`)

const clearTimers = () => {
  timers.forEach((timer) => clearTimeout(timer))
  timers = []
}

const runLoop = () => {
  clearTimers()
  const run = () => {
    phase.value = 'draw'
    timers.push(
      setTimeout(() => {
        phase.value = 'fade'
      }, 5800)
    )
    timers.push(
      setTimeout(() => {
        phase.value = 'reset'
      }, 7600)
    )
    timers.push(
      setTimeout(() => {
        const currentIndex = themes.indexOf(theme.value)
        theme.value = themes[(currentIndex + 1) % themes.length]
        run()
      }, 7800)
    )
  }
  timers.push(setTimeout(run, 80))
}

const enterHome = () => {
  const params = new URLSearchParams(window.location.search)
  const nextPath = params.get('next')
  window.localStorage.setItem(WELCOME_SEEN_KEY, '1')
  if (nextPath) {
    router.go(nextPath)
    return
  }
  router.go(withBase('/'))
}

onMounted(() => {
  runLoop()
})

onUnmounted(() => {
  clearTimers()
})
</script>

<template>
  <div
    class="welcome-overlay"
    :class="themeClass"
    @click="enterHome"
  >
    <div class="welcome-content">
      <div
        class="welcome-logo"
        :style="{ '--welcome-theme-color': themeColor }"
        :class="{
          'welcome-fin': phase === 'draw' || phase === 'fade',
          'welcome-fade': phase === 'fade',
          'welcome-reset': phase === 'reset'
        }"
      >
        <svg
          viewBox="0 0 460 220"
          class="welcome-svg"
        >
          <defs>
            <linearGradient
              id="welcome-rainbow"
              x1="0"
              y1="0"
              x2="460"
              y2="0"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stop-color="#00a6ff" />
              <stop offset="18%" stop-color="#00c6a2" />
              <stop offset="36%" stop-color="#53d93e" />
              <stop offset="54%" stop-color="#f4c732" />
              <stop offset="72%" stop-color="#ff7a1a" />
              <stop offset="86%" stop-color="#ff3c81" />
              <stop offset="100%" stop-color="#9d4edd" />
            </linearGradient>
            <linearGradient
              id="welcome-ocean"
              x1="0"
              y1="0"
              x2="460"
              y2="0"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stop-color="#06b6d4" />
              <stop offset="50%" stop-color="#0ea5e9" />
              <stop offset="100%" stop-color="#3b82f6" />
            </linearGradient>
            <linearGradient
              id="welcome-sunset"
              x1="0"
              y1="0"
              x2="460"
              y2="0"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stop-color="#f43f5e" />
              <stop offset="50%" stop-color="#f97316" />
              <stop offset="100%" stop-color="#f59e0b" />
            </linearGradient>
          </defs>
          <path
            v-for="(path, index) in easyVibePaths"
            :key="index"
            :d="path"
            class="welcome-path"
            :class="`welcome-path-${index}`"
          />
        </svg>
      </div>
      <p class="welcome-tip">
        Click anywhere to enter home
      </p>
    </div>
  </div>
</template>

<style scoped>
.welcome-overlay {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  isolation: isolate;
  background:
    radial-gradient(120% 90% at 50% -20%, rgba(255, 255, 255, 0.86), rgba(255, 255, 255, 0)),
    linear-gradient(135deg, #e8f8ff 0%, #e9edff 36%, #efe7ff 68%, #ffeef4 100%);
  background-size: 130% 130%;
  background-position: 0% 0%;
  cursor: pointer;
  animation: welcome-bg-base-flow 42s ease-in-out infinite alternate;
}

.welcome-overlay::before,
.welcome-overlay::after {
  content: '';
  position: absolute;
  inset: -18%;
  pointer-events: none;
  will-change: transform, opacity;
}

.welcome-overlay::before {
  background:
    radial-gradient(60% 58% at 18% 45%, rgba(182, 225, 255, 0.32), rgba(182, 225, 255, 0)),
    radial-gradient(48% 52% at 82% 62%, rgba(223, 199, 255, 0.28), rgba(223, 199, 255, 0));
  animation: welcome-bg-wave-a 26s ease-in-out infinite alternate;
}

.welcome-overlay::after {
  background:
    radial-gradient(54% 52% at 68% 26%, rgba(186, 245, 228, 0.24), rgba(186, 245, 228, 0)),
    radial-gradient(56% 48% at 30% 82%, rgba(255, 219, 189, 0.22), rgba(255, 219, 189, 0));
  animation: welcome-bg-wave-b 34s ease-in-out infinite alternate;
}

.welcome-theme-ocean {
  background:
    radial-gradient(120% 90% at 50% -20%, rgba(255, 255, 255, 0.88), rgba(255, 255, 255, 0)),
    linear-gradient(135deg, #e0f7fa 0%, #e7f0ff 45%, #eef3ff 100%);
}

.welcome-theme-rainbow {
  background:
    radial-gradient(120% 90% at 50% -20%, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0)),
    linear-gradient(135deg, #e8f8ff 0%, #e9edff 36%, #efe7ff 68%, #ffeef4 100%);
}

.welcome-theme-sunset {
  background:
    radial-gradient(120% 90% at 50% -20%, rgba(255, 255, 255, 0.86), rgba(255, 255, 255, 0)),
    linear-gradient(135deg, #fff0e8 0%, #ffe9dc 45%, #ffe1f0 100%);
}

.welcome-content {
  width: min(88vw, 700px);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  position: relative;
  z-index: 1;
}

.welcome-logo {
  width: 100%;
  opacity: 1;
}

.welcome-svg {
  width: 100%;
  height: auto;
}

.welcome-path {
  fill: var(--welcome-theme-color);
  fill-opacity: 0;
  stroke: var(--welcome-theme-color);
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-dasharray: 1000;
  stroke-dashoffset: 1000;
  transition: none;
}

.welcome-fin .welcome-path {
  stroke-dashoffset: 0;
  fill-opacity: 1;
}

.welcome-fin .welcome-path-0 { transition: stroke-dashoffset 0.62s ease-in-out 0s, fill-opacity 0.45s ease-in 2.75s; }
.welcome-fin .welcome-path-1 { transition: stroke-dashoffset 0.62s ease-in-out 0.28s, fill-opacity 0.45s ease-in 2.75s; }
.welcome-fin .welcome-path-2 { transition: stroke-dashoffset 0.62s ease-in-out 0.56s, fill-opacity 0.45s ease-in 2.75s; }
.welcome-fin .welcome-path-3 { transition: stroke-dashoffset 0.62s ease-in-out 0.84s, fill-opacity 0.45s ease-in 2.75s; }
.welcome-fin .welcome-path-4 { transition: stroke-dashoffset 0.62s ease-in-out 1.12s, fill-opacity 0.45s ease-in 2.75s; }
.welcome-fin .welcome-path-5 { transition: stroke-dashoffset 0.62s ease-in-out 1.4s, fill-opacity 0.45s ease-in 2.75s; }
.welcome-fin .welcome-path-6 { transition: stroke-dashoffset 0.62s ease-in-out 1.68s, fill-opacity 0.45s ease-in 2.75s; }
.welcome-fin .welcome-path-7 { transition: stroke-dashoffset 0.62s ease-in-out 1.96s, fill-opacity 0.45s ease-in 2.75s; }
.welcome-fin .welcome-path-8 { transition: stroke-dashoffset 0.62s ease-in-out 2.24s, fill-opacity 0.45s ease-in 2.75s; }

.welcome-fade {
  opacity: 0;
  transition: opacity 0.85s ease-out;
}

.welcome-reset {
  opacity: 0;
  transition: none;
}

.welcome-tip {
  margin: 44px 0 0;
  font-size: 11px;
  letter-spacing: 0.2em;
  color: rgba(34, 34, 34, 0.32);
  text-transform: uppercase;
  animation: welcome-tip-breathe 5s ease-in-out infinite;
}

@keyframes welcome-tip-breathe {
  0% {
    opacity: 0;
  }
  40% {
    opacity: 0.55;
  }
  80% {
    opacity: 0;
  }
  100% {
    opacity: 0;
  }
}

@keyframes welcome-bg-base-flow {
  0% {
    background-position: 0% 0%;
  }
  100% {
    background-position: 100% 100%;
  }
}

@keyframes welcome-bg-wave-a {
  0% {
    transform: translate3d(-2.5%, 1.8%, 0) scale(1.02);
    opacity: 0.72;
  }
  50% {
    transform: translate3d(2%, -1.6%, 0) scale(1.06);
    opacity: 0.9;
  }
  100% {
    transform: translate3d(4%, -2.4%, 0) scale(1.08);
    opacity: 0.72;
  }
}

@keyframes welcome-bg-wave-b {
  0% {
    transform: translate3d(2.2%, -1.4%, 0) scale(1.01);
    opacity: 0.6;
  }
  50% {
    transform: translate3d(-2.6%, 1.6%, 0) scale(1.05);
    opacity: 0.86;
  }
  100% {
    transform: translate3d(-4.4%, 2.4%, 0) scale(1.07);
    opacity: 0.6;
  }
}
</style>
