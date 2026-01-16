<!--
  DeploymentArchitecture.vue
  全景图：快递配送隐喻
-->
<template>
  <div class="arch">
    <div class="header">
      <div>
        <div class="title">全景演示：一个请求的“奇幻漂流”</div>
        <div class="subtitle">
          点击下方按钮，看看三种模式的“配送路线”有什么不同
        </div>
      </div>
      <div class="modes">
        <button
          v-for="mode in modes"
          :key="mode.id"
          :class="['mode', { active: mode.id === currentMode }]"
          @click="currentMode = mode.id"
        >
          <span class="icon">{{ mode.icon }}</span>
          {{ mode.label }}
        </button>
      </div>
    </div>

    <div class="flow">
      <div
        v-for="(node, idx) in nodes"
        :key="node.name"
        class="node"
        :style="{ borderColor: node.color }"
      >
        <div class="node-head">
          <div class="dot" :style="{ background: node.color }">
            {{ node.icon }}
          </div>
          <div class="name-box">
            <div class="role">{{ node.role }}</div>
            <div class="tech-name">{{ node.name }}</div>
          </div>
        </div>
        <div class="desc">{{ node.desc }}</div>
        <div v-if="idx < nodes.length - 1" class="arrow">→</div>
      </div>
    </div>

    <div class="summary">
      <div class="metric">
        <div class="label">当前场景</div>
        <div class="value">{{ currentModeLabel }}</div>
      </div>
      <div class="metric">
        <div class="label">瓶颈环节</div>
        <div class="value">{{ bottleneck }}</div>
      </div>
      <div class="metric">
        <div class="label">通俗解释</div>
        <div class="value">{{ advice }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

const modes = [
  { id: 'static', label: '看海报 (静态)', icon: '🖼️' },
  { id: 'spa', label: '玩 App (SPA)', icon: '📱' },
  { id: 'ssr', label: '刷动态 (SSR)', icon: '🔄' },
]

const currentMode = ref('spa')

const currentModeLabel = computed(() => 
  modes.find(m => m.id === currentMode.value)?.label
)

// 角色：User(寄件人), DNS(查号台), CDN(快递柜), WAF(保安), LB(大堂经理), Server(办事员), DB(档案室)
const commonNodes = {
  user: { role: '寄件人', name: 'User', icon: '🧑', color: '#64748b', desc: '发出请求' },
  dns: { role: '查号台', name: 'DNS', icon: '📒', color: '#0ea5e9', desc: '查询 IP 地址' },
  cdn: { role: '快递柜', name: 'CDN', icon: '📦', color: '#22c55e', desc: '就近取货' },
  waf: { role: '保安', name: 'WAF', icon: '🛡️', color: '#ef4444', desc: '拦截黑客' },
  lb: { role: '大堂经理', name: 'LB', icon: '💁', color: '#f59e0b', desc: '分配窗口' },
  server: { role: '办事员', name: 'Server', icon: '👨‍💼', color: '#8b5cf6', desc: '处理业务' },
  db: { role: '档案室', name: 'Database', icon: '🗄️', color: '#d946ef', desc: '存取数据' },
  obj: { role: '仓库', name: 'OSS', icon: '🏭', color: '#f97316', desc: '拿静态文件' }
}

const flowMap = {
  static: [
    { ...commonNodes.user, desc: '想看一张图片' },
    { ...commonNodes.dns, desc: '找到图片仓库地址' },
    { ...commonNodes.cdn, desc: '家门口就有？直接拿走！' },
    { ...commonNodes.obj, desc: '没有？去总仓库拿' }
  ],
  spa: [
    { ...commonNodes.user, desc: '打开网页 App' },
    { ...commonNodes.dns, desc: '找到服务器地址' },
    { ...commonNodes.cdn, desc: '先拿网页外壳 (HTML/JS)' },
    { ...commonNodes.server, desc: '再拿动态数据 (API)' },
    { ...commonNodes.db, desc: '查用户数据' }
  ],
  ssr: [
    { ...commonNodes.user, desc: '打开复杂网页' },
    { ...commonNodes.dns, desc: '找到服务器地址' },
    { ...commonNodes.lb, desc: '人多排队，你以此去 2 号窗口' },
    { ...commonNodes.server, desc: '现场拼装好整个页面' },
    { ...commonNodes.db, desc: '查所有需要的数据' }
  ]
}

const nodes = computed(() => flowMap[currentMode.value])

const bottleneck = computed(() => {
  switch (currentMode.value) {
    case 'static': return '几乎没有瓶颈，起飞！'
    case 'spa': return 'API 接口响应速度'
    case 'ssr': return '办事员 (Server) 拼装页面的速度'
    default: return ''
  }
})

const advice = computed(() => {
  switch (currentMode.value) {
    case 'static':
      return '这是最简单的模式。就像去看公告栏的海报（或者发传单），内容印死在上面了，所有人看到的都一样。速度最快！'
    case 'spa':
      return '就像送你一套乐高积木。先给你个空盒子和图纸（网页壳子），你的浏览器自己在本地把页面拼出来。拼好后怎么玩都快。'
    case 'ssr':
      return '就像点了一份热披萨。厨师（服务器）必须现场烤好，再热乎乎地送给你。虽然慢点，但保证新鲜、不仅能吃（能看）还能闻到香味（SEO友好）。'
    default:
      return ''
  }
})
</script>

<style scoped>
.arch {
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
  padding: 20px;
  margin: 20px 0;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.header {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

@media (min-width: 640px) {
  .header {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
}

.title {
  font-weight: 800;
  font-size: 18px;
}

.subtitle {
  color: var(--vp-c-text-2);
  font-size: 14px;
  margin-top: 4px;
}

.modes {
  display: flex;
  gap: 8px;
  background: var(--vp-c-bg);
  padding: 4px;
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
}

.mode {
  padding: 6px 12px;
  border-radius: 6px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  transition: all 0.2s;
  white-space: nowrap;
}

.mode:hover {
  background: var(--vp-c-bg-soft);
}

.mode.active {
  background: var(--vp-c-brand);
  color: white;
}

.flow {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 16px;
  align-items: start;
}

.node {
  position: relative;
  background: var(--vp-c-bg);
  border: 2px solid transparent;
  border-radius: 12px;
  padding: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s;
}

.node:hover {
  transform: translateY(-2px);
}

.node-head {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 8px;
}

.dot {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  color: #fff;
  display: grid;
  place-items: center;
  font-size: 20px;
  flex-shrink: 0;
}

.name-box {
  line-height: 1.2;
}

.role {
  font-size: 12px;
  color: var(--vp-c-text-2);
}

.tech-name {
  font-weight: 700;
  font-size: 14px;
}

.desc {
  color: var(--vp-c-text-2);
  font-size: 12px;
  line-height: 1.4;
}

.arrow {
  position: absolute;
  right: -14px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--vp-c-divider);
  font-size: 18px;
  display: none;
}

@media (min-width: 768px) {
  .arrow {
    display: block;
  }
}

.summary {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 12px;
  background: var(--vp-c-bg);
  border-radius: 12px;
  padding: 16px;
  border: 1px solid var(--vp-c-divider);
}

.metric {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.label {
  color: var(--vp-c-text-2);
  font-size: 12px;
}

.value {
  font-weight: 600;
  font-size: 14px;
  color: var(--vp-c-text-1);
}
</style>
