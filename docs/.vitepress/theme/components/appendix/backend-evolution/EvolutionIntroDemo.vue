<template>
  <div class="evolution-intro-demo">
    <div class="demo-header">
      <span class="icon">🏗️</span>
      <span class="title">后端架构进化之旅</span>
      <span class="subtitle">用餐厅比喻理解 30 年架构演进</span>
    </div>

    <div class="timeline-cards">
      <div
        v-for="(stage, idx) in stages"
        :key="idx"
        class="stage-card"
        :class="{ active: currentStage === idx }"
        @click="currentStage = idx"
      >
        <div class="stage-era">
          {{ stage.era }}
        </div>
        <div class="stage-icon">
          {{ stage.icon }}
        </div>
        <div class="stage-name">
          {{ stage.name }}
        </div>
        <div class="stage-arch">
          {{ stage.arch }}
        </div>
      </div>
    </div>

    <div
      v-if="currentStage !== null"
      class="stage-detail"
    >
      <Transition
        name="fade"
        mode="out-in"
      >
        <div
          :key="currentStage"
          class="detail-panel"
        >
          <div class="detail-header">
            <span class="detail-icon">{{ stages[currentStage].icon }}</span>
            <h4>{{ stages[currentStage].restaurant }}</h4>
          </div>
          <div class="detail-content">
            <div class="detail-section">
              <h5>🍽️ 餐厅场景</h5>
              <p>{{ stages[currentStage].scenario }}</p>
            </div>
            <div class="detail-section">
              <h5>💻 后端映射</h5>
              <p>{{ stages[currentStage].mapping }}</p>
            </div>
            <div class="detail-section">
              <h5>⚡ 核心痛点</h5>
              <ul>
                <li
                  v-for="(pain, i) in stages[currentStage].pains"
                  :key="i"
                >
                  {{ pain }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Transition>
    </div>

    <div class="info-box">
      <span class="icon">💡</span>
      <strong>核心思想：</strong>架构演进是为了解决上一个时代的痛点，但也带来了新的复杂度。没有最好的架构，只有最适合的架构。
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const currentStage = ref(0)

const stages = [
  {
    era: '1990s',
    icon: '🏠',
    name: '家庭小作坊',
    arch: '物理服务器',
    restaurant: '家庭小厨房',
    scenario: '一位厨师在一间小厨房里，亲自去菜市场买菜、洗菜、切菜、炒菜、上菜。客人多了就忙不过来，只能让客人排队等。',
    mapping: '一台物理服务器，处理所有请求：接收HTTP请求、读取文件、执行CGI脚本、返回响应。CPU和内存有限，请求多了只能排队。',
    pains: [
      '单机性能瓶颈：客人太多时，厨师根本忙不过来',
      '垂直扩展成本高：买更贵的机器就像换更大的厨房，治标不治本',
      '单点故障：厨师生病了，整个餐馆必须关门'
    ]
  },
  {
    era: '2000s',
    icon: '🏢',
    name: '大型中央厨房',
    arch: '单体架构',
    restaurant: '连锁餐厅中央厨房',
    scenario: '建立了一个大型中央厨房，分工明确：有人专门洗菜、有人专门切菜、有人专门炒菜。但所有人都在一个大空间里工作，互相依赖。',
    mapping: '单体应用架构：所有功能模块（用户、订单、支付）都在同一个进程中运行，共享同一个数据库，部署在一个大应用服务器上。',
    pains: [
      '牵一发而动全身：切菜师傅切到手，整个厨房都要停下来',
      '技术债务累积：老员工（老代码）越来越多，新人很难接手',
      '部署风险高：更新一个菜品（功能）可能影响整个菜单（系统）'
    ]
  },
  {
    era: '2010s',
    icon: '🏭',
    name: '专业化分工',
    arch: '微服务架构',
    restaurant: '餐饮集团多厨房',
    scenario: '把中央厨房拆分成多个专业厨房：一个专门做中餐、一个专门做西餐、一个专门做甜点。每个厨房独立运营，通过标准化流程协作。',
    mapping: '微服务架构：每个业务功能（用户服务、订单服务、支付服务）都是独立的进程，有自己的数据库，通过HTTP/gRPC通信。',
    pains: [
      '分布式复杂度：协调多个厨房比管理一个厨房难得多',
      '网络依赖：中餐厨房需要西餐厨房的原料时，可能网络延迟或故障',
      '运维成本激增：需要更多人手（运维工程师）来管理这么多厨房'
    ]
  },
  {
    era: '2020s+',
    icon: '🍽️',
    name: '外卖平台',
    arch: 'Serverless',
    restaurant: '外卖/云厨房',
    scenario: '你不再自己开厨房，而是在外卖平台上注册。有订单时，平台调度附近的厨房为你制作食物。你只管设计菜品和推广，不用关心厨房在哪、有多少厨师。',
    mapping: 'Serverless架构：开发者只写业务代码（函数），不关心服务器在哪、有多少台、怎么扩容。云平台自动调度资源，按实际执行时间付费。',
    pains: [
      '冷启动延迟：第一家店接单时可能需要热身（冷启动），客人要等',
      '平台依赖：完全依赖外卖平台（云厂商），迁移成本高',
      '资源限制：不能做太复杂的菜品（函数有时长和内存限制）'
    ]
  }
]
</script>

<style scoped>
.evolution-intro-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg-soft);
  padding: 0.75rem;
  margin: 0.5rem 0;
}

.demo-header {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  margin-bottom: 0.5rem;
  padding-bottom: 0.4rem;
  border-bottom: 1px solid var(--vp-c-divider);
}

.demo-header .icon {
  font-size: 1rem;
}

.demo-header .title {
  font-weight: bold;
  font-size: 0.9rem;
  color: var(--vp-c-text-1);
}

.demo-header .subtitle {
  color: var(--vp-c-text-2);
  font-size: 0.75rem;
  margin-left: 0.4rem;
}

.timeline-cards {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.4rem;
  margin-bottom: 0.5rem;
}

.stage-card {
  background: var(--vp-c-bg);
  border: 1px solid transparent;
  border-radius: 4px;
  padding: 0.75rem 0.5rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s;
}

.stage-card:hover {
  border-color: var(--vp-c-brand);
  transform: translateY(-1px);
}

.stage-card.active {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-brand-soft);
}

.stage-era {
  font-size: 0.6rem;
  color: var(--vp-c-text-3);
  margin-bottom: 0.1rem;
}

.stage-icon {
  font-size: 1rem;
  margin-bottom: 0.2rem;
}

.stage-name {
  font-size: 0.7rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 0.1rem;
}

.stage-arch {
  font-size: 0.55rem;
  color: var(--vp-c-text-3);
}

.stage-detail {
  background: var(--vp-c-bg);
  border-radius: 4px;
  padding: 0.5rem;
}

.detail-panel {
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(5px); }
  to { opacity: 1; transform: translateY(0); }
}

.detail-header {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  margin-bottom: 0.5rem;
  padding-bottom: 0.4rem;
  border-bottom: 1px solid var(--vp-c-divider);
}

.detail-icon {
  font-size: 1rem;
}

.detail-header h4 {
  font-size: 0.85rem;
  font-weight: 600;
  margin: 0;
  color: var(--vp-c-text-1);
}

.detail-content {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.4rem;
}

.detail-section h5 {
  font-size: 0.7rem;
  font-weight: 600;
  margin: 0 0 0.3rem 0;
  color: var(--vp-c-brand);
}

.detail-section p {
  font-size: 0.65rem;
  line-height: 1.4;
  margin: 0 0 0.3rem 0;
  color: var(--vp-c-text-2);
}

.detail-section ul {
  margin: 0;
  padding-left: 0.75rem;
}

.detail-section li {
  font-size: 0.6rem;
  line-height: 1.4;
  margin-bottom: 0.25rem;
  color: var(--vp-c-text-2);
}

.info-box {
  background: var(--vp-c-bg-alt);
  padding: 0.75rem;
  border-radius: 6px;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  margin-top: 1rem;
  display: flex;
  gap: 0.25rem;
}

.info-box .icon {
  flex-shrink: 0;
}

.info-box strong {
  color: var(--vp-c-text-1);
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: translateX(20px);
}

.fade-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}

@media (max-width: 768px) {
  .timeline-cards {
    grid-template-columns: repeat(2, 1fr);
  }

  .detail-content {
    grid-template-columns: 1fr;
  }
}
</style>
