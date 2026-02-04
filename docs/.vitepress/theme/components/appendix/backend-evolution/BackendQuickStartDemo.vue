<template>
  <div class="be-quickstart-container">
    <div class="be-stage-tabs">
      <button
        v-for="(stage, idx) in stages"
        :key="idx"
        :class="['be-stage-btn', { active: currentStage === idx }]"
        @click="currentStage = idx"
      >
        <span class="be-stage-icon">{{ stage.icon }}</span>
        <span class="be-stage-name">{{ stage.name }}</span>
        <span class="be-stage-year">{{ stage.year }}</span>
      </button>
    </div>

    <div class="be-stage-content">
      <Transition name="be-fade" mode="out-in">
        <div :key="currentStage" class="be-stage-panel">
          <div class="be-visual-section">
            <div class="be-arch-diagram">
              <div
                v-for="(node, idx) in currentStageData.nodes"
                :key="idx"
                :class="['be-arch-node', node.type]"
                :style="node.style"
              >
                <div class="be-node-icon">{{ node.icon }}</div>
                <div class="be-node-label">{{ node.label }}</div>
              </div>
              <svg class="be-connections" viewBox="0 0 600 300">
                <path
                  v-for="(conn, idx) in currentStageData.connections"
                  :key="idx"
                  :d="conn.path"
                  :class="['be-conn-line', conn.type]"
                />
              </svg>
            </div>
          </div>

          <div class="be-info-section">
            <h3 class="be-section-title">💡 核心特点</h3>
            <ul class="be-feature-list">
              <li
                v-for="(feature, idx) in currentStageData.features"
                :key="idx"
                :class="['be-feature-item', feature.type]"
              >
                <span class="be-feature-icon">{{ feature.icon }}</span>
                <span class="be-feature-text">{{ feature.text }}</span>
              </li>
            </ul>

            <div class="be-analogy-box">
              <h4>🏪 餐厅类比</h4>
              <p>{{ currentStageData.analogy }}</p>
            </div>
          </div>
        </div>
      </Transition>
    </div>

    <div class="be-progress-bar">
      <div
        class="be-progress-fill"
        :style="{ width: ((currentStage + 1) / stages.length) * 100 + '%' }"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const currentStage = ref(0)

const stages = [
  { name: '物理时代', year: '1990s', icon: '🖥️' },
  { name: '单体架构', year: '2000s', icon: '🏢' },
  { name: '微服务', year: '2010s', icon: '🐜' },
  { name: 'Serverless', year: '2020s', icon: '☁️' }
]

const stageData = [
  {
    nodes: [
      { icon: '🌐', label: '用户请求', type: 'user', style: { left: '20px', top: '120px' } },
      { icon: '🖥️', label: '物理服务器', type: 'server', style: { left: '220px', top: '80px' } },
      { icon: '📁', label: '静态文件', type: 'file', style: { left: '420px', top: '60px' } },
      { icon: '⚙️', label: 'CGI脚本', type: 'script', style: { left: '420px', top: '160px' } }
    ],
    connections: [
      { path: 'M 80 140 Q 150 140 220 120', type: 'http' },
      { path: 'M 320 100 Q 370 80 420 80', type: 'read' },
      { path: 'M 320 130 Q 370 160 420 180', type: 'exec' }
    ],
    features: [
      { icon: '🐢', text: '手动部署，更新慢', type: 'con' },
      { icon: '💰', text: '扩容只能买更大的机器', type: 'con' },
      { icon: '🔧', text: 'FTP上传，配置复杂', type: 'con' }
    ],
    analogy: '像一家小餐馆，只有一个大厨。所有活都要他自己干：洗菜、切菜、炒菜。客人多了就忙不过来，只能买更大的厨房。'
  },
  {
    nodes: [
      { icon: '🌐', label: '用户请求', type: 'user', style: { left: '20px', top: '120px' } },
      { icon: '🏢', label: '单体应用', type: 'app', style: { left: '200px', top: '100px', width: '140px', height: '100px' } },
      { icon: '👤', label: '用户模块', type: 'module', style: { left: '220px', top: '115px', transform: 'scale(0.7)' } },
      { icon: '🛒', label: '订单模块', type: 'module', style: { left: '270px', top: '115px', transform: 'scale(0.7)' } },
      { icon: '💳', label: '支付模块', type: 'module', style: { left: '245px', top: '155px', transform: 'scale(0.7)' } },
      { icon: '🗄️', label: '数据库', type: 'db', style: { left: '420px', top: '120px' } }
    ],
    connections: [
      { path: 'M 80 140 Q 140 140 200 150', type: 'http' },
      { path: 'M 340 150 Q 380 150 420 150', type: 'sql' }
    ],
    features: [
      { icon: '✅', text: '开发简单，部署方便', type: 'pro' },
      { icon: '❌', text: '牵一发而动全身', type: 'con' },
      { icon: '🐌', text: '代码膨胀，启动慢', type: 'con' }
    ],
    analogy: '像一个大型中央厨房，所有工序都在一个地方完成。好处是管理简单，坏处是如果洗菜区水管爆了，整个厨房都得停工。'
  },
  {
    nodes: [
      { icon: '🌐', label: '用户请求', type: 'user', style: { left: '10px', top: '130px' } },
      { icon: '⚖️', label: '网关/负载均衡', type: 'gateway', style: { left: '120px', top: '130px' } },
      { icon: '👤', label: '用户服务', type: 'service', style: { left: '260px', top: '50px' } },
      { icon: '🛒', label: '订单服务', type: 'service', style: { left: '380px', top: '50px' } },
      { icon: '💳', label: '支付服务', type: 'service', style: { left: '320px', top: '130px' } },
      { icon: '📦', label: '库存服务', type: 'service', style: { left: '440px', top: '130px' } },
      { icon: '📊', label: '消息队列', type: 'mq', style: { left: '320px', top: '210px' } },
      { icon: '🗄️', label: '数据库集群', type: 'db-cluster', style: { left: '440px', top: '210px' } }
    ],
    connections: [
      { path: 'M 70 150 L 120 150', type: 'http' },
      { path: 'M 190 140 Q 225 95 260 70', type: 'rpc' },
      { path: 'M 320 70 L 380 70', type: 'rpc' },
      { path: 'M 420 90 Q 400 110 380 130', type: 'rpc' },
      { path: 'M 220 160 Q 270 145 320 150', type: 'rpc' },
      { path: 'M 400 150 L 440 150', type: 'rpc' },
      { path: 'M 360 170 Q 360 190 360 210', type: 'async' },
      { path: 'M 480 170 Q 480 190 480 210', type: 'sql' }
    ],
    features: [
      { icon: '✅', text: '故障隔离，独立部署', type: 'pro' },
      { icon: '✅', text: '团队自治，技术异构', type: 'pro' },
      { icon: '❌', text: '分布式复杂度，治理难', type: 'con' }
    ],
    analogy: '像一条流水线，每个环节都是一个独立的工作站。一个工作站坏了，其他还能继续工作。但要协调这么多工作站，需要复杂的管理系统（Kubernetes）。'
  },
  {
    nodes: [
      { icon: '🌐', label: '用户请求', type: 'user', style: { left: '20px', top: '130px' } },
      { icon: '🔀', label: 'API 网关', type: 'gateway', style: { left: '150px', top: '130px' } },
      { icon: '⚡', label: '函数1\n验证', type: 'function', style: { left: '300px', top: '60px' } },
      { icon: '⚡', label: '函数2\n处理', type: 'function', style: { left: '420px', top: '60px' } },
      { icon: '⚡', label: '函数3\n存储', type: 'function', style: { left: '360px', top: '160px' } },
      { icon: '☁️', label: '托管服务', type: 'managed', style: { left: '520px', top: '100px', width: '70px', height: '80px' } },
      { icon: '🗄️', label: '云数据库', type: 'cloud-db', style: { left: '480px', top: '210px' } }
    ],
    connections: [
      { path: 'M 80 150 L 150 150', type: 'http' },
      { path: 'M 220 140 Q 260 100 300 80', type: 'invoke' },
      { path: 'M 360 80 L 420 80', type: 'chain' },
      { path: 'M 350 110 Q 360 135 360 160', type: 'invoke' },
      { path: 'M 480 80 L 520 110', type: 'baas' },
      { path: 'M 440 190 Q 460 200 480 220', type: 'db' }
    ],
    features: [
      { icon: '✅', text: '零运维，自动扩缩容', type: 'pro' },
      { icon: '✅', text: '按量付费，成本优化', type: 'pro' },
      { icon: '❌', text: '冷启动延迟，vendor锁定', type: 'con' }
    ],
    analogy: '像外卖平台。你不用自己开餐厅（维护服务器），只需要提供菜谱（写函数）。平台负责找厨师、准备食材、送餐。有人点餐就现做，没人点餐就不花钱。'
  }
]

const currentStageData = computed(() => stageData[currentStage.value])
</script>

<style scoped>
.be-quickstart-container {
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  border-radius: 16px;
  padding: 24px;
  color: #fff;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.be-stage-tabs {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  margin-bottom: 24px;
}

.be-stage-btn {
  background: rgba(255, 255, 255, 0.05);
  border: 2px solid transparent;
  border-radius: 12px;
  padding: 16px 12px;
  color: #a0a0b0;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.be-stage-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: translateY(-2px);
}

.be-stage-btn.active {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-color: rgba(255, 255, 255, 0.3);
  color: #fff;
  box-shadow: 0 8px 32px rgba(102, 126, 234, 0.4);
}

.be-stage-icon {
  font-size: 28px;
  margin-bottom: 4px;
}

.be-stage-name {
  font-size: 14px;
  font-weight: 600;
}

.be-stage-year {
  font-size: 11px;
  opacity: 0.7;
}

.be-stage-content {
  min-height: 400px;
}

.be-stage-panel {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 24px;
}

.be-visual-section {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 12px;
  padding: 16px;
}

.be-arch-diagram {
  position: relative;
  height: 300px;
  width: 100%;
}

.be-arch-node {
  position: absolute;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 10px;
  padding: 8px 12px;
  text-align: center;
  font-size: 11px;
  font-weight: 600;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
  transition: all 0.3s ease;
  min-width: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
}

.be-arch-node:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.5);
}

.be-arch-node.user {
  background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);
}

.be-arch-node.service,
.be-arch-node.function {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
}

.be-arch-node.db,
.be-arch-node.cloud-db {
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
}

.be-arch-node.gateway {
  background: linear-gradient(135deg, #fa709a 0%, #fee140 100%);
}

.be-arch-node.mq {
  background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%);
}

.be-arch-node.managed {
  background: linear-gradient(135deg, #d299c2 0%, #fef9d7 100%);
}

.be-node-icon {
  font-size: 16px;
}

.be-node-label {
  font-size: 9px;
  line-height: 1.2;
  white-space: pre-line;
}

.be-connections {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.be-conn-line {
  fill: none;
  stroke: rgba(102, 126, 234, 0.4);
  stroke-width: 2;
  stroke-dasharray: 5, 5;
  animation: be-flow 2s linear infinite;
}

@keyframes be-flow {
  to {
    stroke-dashoffset: -20;
  }
}

.be-info-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.be-section-title {
  font-size: 16px;
  font-weight: 600;
  color: #667eea;
  margin: 0;
}

.be-feature-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.be-feature-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  font-size: 13px;
}

.be-feature-item.pro {
  border-left: 3px solid #38ef7d;
}

.be-feature-item.con {
  border-left: 3px solid #f5576c;
}

.be-feature-icon {
  font-size: 16px;
}

.be-feature-text {
  color: #c0c0d0;
}

.be-analogy-box {
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
  border: 1px solid rgba(102, 126, 234, 0.3);
  border-radius: 12px;
  padding: 16px;
}

.be-analogy-box h4 {
  font-size: 14px;
  font-weight: 600;
  color: #667eea;
  margin: 0 0 8px 0;
}

.be-analogy-box p {
  font-size: 13px;
  color: #a0a0b0;
  line-height: 1.6;
  margin: 0;
}

.be-progress-bar {
  height: 4px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 2px;
  margin-top: 20px;
  overflow: hidden;
}

.be-progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
  border-radius: 2px;
  transition: width 0.5s ease;
}

.be-fade-enter-active,
.be-fade-leave-active {
  transition: all 0.4s ease;
}

.be-fade-enter-from {
  opacity: 0;
  transform: translateX(20px);
}

.be-fade-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}

@media (max-width: 768px) {
  .be-stage-tabs {
    grid-template-columns: repeat(2, 1fr);
  }

  .be-stage-panel {
    grid-template-columns: 1fr;
  }

  .be-arch-diagram {
    height: 250px;
  }
}
</style>
