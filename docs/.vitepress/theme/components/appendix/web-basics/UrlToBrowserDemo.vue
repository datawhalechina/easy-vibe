<template>
  <div class="url-to-browser-demo">
    <div class="stage-tracker">
      <button
        v-for="(stage, index) in stages"
        :key="index"
        class="tracker-node"
        :class="{
          active: currentStage === index,
          visited: currentStage > index
        }"
        @click="currentStage = index"
      >
        <div class="node-circle">
          <span class="icon">{{ stage.icon }}</span>
        </div>
        <span class="node-label">{{ stage.name }}</span>
      </button>
      <div class="tracker-line">
        <div
          class="line-fill"
          :style="{ width: (currentStage / (stages.length - 1)) * 100 + '%' }"
        ></div>
      </div>
    </div>

    <div class="stage-display">
      <div class="header">
        <h2>{{ stages[currentStage].title }}</h2>
        <p>{{ stages[currentStage].desc }}</p>
      </div>

      <div class="component-wrapper">
        <transition name="fade" mode="out-in">
          <component :is="stages[currentStage].component" :key="currentStage" />
        </transition>
      </div>

      <div class="action-footer" v-if="currentStage < stages.length - 1">
        <button class="next-btn" @click="nextStage">下一步 →</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const currentStage = ref(0)

const stages = [
  {
    name: 'URL',
    title: '1. 填写购物单 (URL)',
    desc: '你想买一个玩具。首先要在订单上写清楚：去哪家店 (域名)、买什么 (路径)、用什么快递 (协议)。',
    icon: '📝',
    component: 'UrlParserDemo'
  },
  {
    name: 'DNS',
    title: '2. 查找店铺地址 (DNS)',
    desc: '快递员不知道 "玩具店" 在哪。他需要查地图 (DNS)，把店名翻译成具体的 GPS 坐标 (IP 地址)。',
    icon: '🧭',
    component: 'DnsLookupDemo'
  },
  {
    name: 'TCP',
    title: '3. 建立通话 (TCP)',
    desc: '找到店了！进店前先敲门确认："有人吗？" "有！" "那我进来了！"。确保连接通畅，不会白跑一趟。',
    icon: '📞',
    component: 'TcpHandshakeDemo'
  },
  {
    name: 'HTTP',
    title: '4. 购买商品 (HTTP)',
    desc: '进店后，你递交订单："我要这个玩具"。店员去仓库找货，最后把装有玩具的包裹 (HTML) 递给你。',
    icon: '📦',
    component: 'HttpExchangeDemo'
  },
  {
    name: 'Render',
    title: '5. 拆盒组装 (渲染)',
    desc: '回到家，拆开包裹。照着说明书 (HTML)，把积木 (DOM) 搭起来，涂上颜色 (CSS)，玩具就变好看了！',
    icon: '🧩',
    component: 'BrowserRenderingDemo'
  }
]

const nextStage = () => {
  if (currentStage.value < stages.length - 1) {
    currentStage.value++
  }
}
</script>

<style scoped>
.url-to-browser-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background-color: var(--vp-c-bg-soft);
  overflow: hidden;
  margin: 2rem 0;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.05);
}

.stage-tracker {
  display: flex;
  justify-content: space-between;
  padding: 2rem 2rem 1rem;
  position: relative;
  background: var(--vp-c-bg);
  border-bottom: 1px solid var(--vp-c-divider);
}

.tracker-line {
  position: absolute;
  top: 3.2rem; /* Adjusted for padding */
  left: 3.5rem;
  right: 3.5rem;
  height: 2px;
  background: var(--vp-c-divider);
  z-index: 0;
}

.line-fill {
  height: 100%;
  background: var(--vp-c-brand);
  transition: width 0.3s ease;
}

.tracker-node {
  position: relative;
  z-index: 1;
  background: transparent;
  border: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  padding: 0;
  width: 60px;
}

.node-circle {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  transition: all 0.3s;
}

.tracker-node.visited .node-circle {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-brand);
  color: white;
}

.tracker-node.active .node-circle {
  border-color: var(--vp-c-brand);
  box-shadow: 0 0 0 4px var(--vp-c-brand-dimm);
  transform: scale(1.1);
  background: var(--vp-c-bg);
}

.node-label {
  font-size: 0.75rem;
  font-weight: bold;
  color: var(--vp-c-text-2);
}

.tracker-node.active .node-label {
  color: var(--vp-c-brand);
}

.stage-display {
  padding: 2rem;
}

.header {
  text-align: center;
  margin-bottom: 2rem;
}

.header h2 {
  border: none;
  margin: 0 0 0.5rem 0;
  padding: 0;
  font-size: 1.5rem;
}

.header p {
  margin: 0;
  color: var(--vp-c-text-2);
  max-width: 600px;
  margin: 0 auto;
}

.component-wrapper {
  background: var(--vp-c-bg);
  border-radius: 8px;
  /* padding: 1rem; */
}

.action-footer {
  margin-top: 2rem;
  display: flex;
  justify-content: center;
}

.next-btn {
  padding: 0.8rem 2rem;
  background: var(--vp-c-brand);
  color: white;
  border: none;
  border-radius: 25px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.next-btn:hover {
  background: var(--vp-c-brand-dark);
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
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
