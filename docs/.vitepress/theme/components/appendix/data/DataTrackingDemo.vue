<template>
  <div class="demo data-tracking-demo">
    <div class="header">
      <span class="title">数据埋点与采集演示</span>
    </div>

    <!-- Overview Diagram -->
    <div v-if="activeTab === 'overview'" class="content">
      <div class="overview-container">
        <div class="app-screen">
          <div class="app-header">电商 App</div>
          <div class="app-body">
            <div class="product-card">
              <div class="product-img"></div>
              <div class="product-info">新款手机</div>
              <div class="product-btn">点击购买</div>
            </div>
            <!-- Animated click cursor and ripple -->
            <div class="animation-cursor"></div>
            <div class="animation-ripple"></div>
          </div>
        </div>

        <div class="data-flow">
          <div class="flow-line"></div>
          <div class="data-packet">
            <span class="bracket">{</span>
            <div class="packet-lines">
              <div class="pline">e: "click_buy"</div>
              <div class="pline">u: "user123"</div>
            </div>
            <span class="bracket">}</span>
          </div>
        </div>

        <div class="server-db">
          <div class="server-header">后端分析系统</div>
          <div class="server-body">
            <div class="db-row">user123 | click_buy | 10:05</div>
            <div class="db-row skeleton"></div>
            <div class="db-row skeleton"></div>
          </div>
        </div>
      </div>
      <p class="desc">用户每一次关键操作都在底层触发了一个埋点事件，飞掠网络被永远记录在案。</p>
    </div>

    <!-- Methods Compare -->
    <div v-if="activeTab === 'methods'" class="content">
      <div class="methods-compare">
        <div class="method-card">
          <div class="method-title">代码埋点 (Code)</div>
          <div class="method-body">
            <div class="code-block">tracker.track('buy', { price: 299 })</div>
            <div class="method-pro">极度精准、深入业务字段</div>
            <div class="method-con">需要开发排期，成本高</div>
          </div>
        </div>
        <div class="method-card">
          <div class="method-title">可视化埋点 (Visual)</div>
          <div class="method-body">
            <div class="visual-tool">
              <div class="v-box selected"></div>
              <div class="v-box"></div>
            </div>
            <div class="method-pro">产品经理可自行圈选</div>
            <div class="method-con">只能抓取表层点击，无法获取深层属性</div>
          </div>
        </div>
        <div class="method-card">
          <div class="method-title">全埋点 (Auto)</div>
          <div class="method-body">
            <div class="auto-tool">
              <div class="noise-line"></div>
              <div class="noise-line"></div>
              <div class="noise-line"></div>
            </div>
            <div class="method-pro">无死角全量捕捉</div>
            <div class="method-con">数据如同雪花般庞大，无用噪音极多</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Event Model -->
    <div v-if="activeTab === 'model'" class="content">
      <div class="model-container">
        <div class="json-code">
{
  <span class="key">"event_name"</span>: <span class="string">"add_to_cart"</span>, <span class="comment">// 发生了什么 (What)</span>
  <span class="key">"timestamp"</span>: <span class="number">1723456789000</span>, <span class="comment">// 什么时候 (When)</span>
  <span class="key">"user_id"</span>: <span class="string">"u_98765"</span>, <span class="comment">// 是谁 (Who)</span>
  
  <span class="key">"common_props"</span>: { <span class="comment">// 在哪里/环境 (Where & How)</span>
    <span class="key">"device"</span>: <span class="string">"iPhone 15Pro"</span>,
    <span class="key">"network"</span>: <span class="string">"5G"</span>,
    <span class="key">"os"</span>: <span class="string">"iOS 17"</span>
  },
  
  <span class="key">"custom_props"</span>: { <span class="comment">// 业务详情 (Details)</span>
    <span class="key">"product_id"</span>: <span class="string">"p_001"</span>,
    <span class="key">"price"</span>: <span class="number">7999.00</span>
  }
}
        </div>
      </div>
      <p class="desc">每一个标准事件都必须回答 4W1H：Who, What, When, Where, How。</p>
    </div>

    <!-- Data Pipeline -->
    <div v-if="activeTab === 'pipeline'" class="content">
       <div class="pipeline-flow">
          <div class="pipe-node">App 客户端</div>
          <div class="pipe-arrow">本地缓存<br>批量上报</div>
          <div class="pipe-node server">接入网关</div>
          <div class="pipe-arrow">消息队列</div>
          <div class="pipe-node etl">清洗 (ETL)</div>
          <div class="pipe-arrow">入库</div>
          <div class="pipe-node db">数据仓库</div>
       </div>
       <p class="desc">数据并非立刻入库，为了抵御高并发和弱网环境，它必须经历缓存、打包、列队和清洗的漫长流水线。</p>
    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  tab: {
    type: String,
    default: 'overview'
  }
})

const activeTab = ref(props.tab)
</script>

<style scoped>
.demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
  margin: 24px 0;
  overflow: hidden;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.header {
  padding: 14px 20px;
  background: var(--vp-c-bg);
  border-bottom: 1px solid var(--vp-c-divider);
  display: flex;
  align-items: center;
}

.title {
  font-weight: 600;
  font-size: 15px;
}

.content {
  padding: 24px;
  background: #f8fafc;
}

.desc {
  margin-top: 16px;
  font-size: 13px;
  color: #64748b;
  text-align: center;
}

/* Overview Styles & Animations */
.overview-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 600px;
  margin: 0 auto;
}

.app-screen {
  width: 140px;
  height: 220px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  border: 4px solid #333;
  position: relative;
  overflow: hidden;
}

.app-header {
  background: #3b82f6;
  color: white;
  text-align: center;
  font-size: 10px;
  padding: 8px 0;
}

.app-body {
  padding: 10px;
}

.product-card {
  border: 1px solid #eee;
  border-radius: 6px;
  padding: 8px;
  text-align: center;
}

.product-img {
  height: 60px;
  background: #e2e8f0;
  border-radius: 4px;
  margin-bottom: 8px;
}

.product-info {
  font-size: 10px;
  margin-bottom: 8px;
}

.product-btn {
  background: #ef4444;
  color: white;
  font-size: 10px;
  padding: 4px;
  border-radius: 4px;
}

@keyframes cursor-move {
  0% { transform: translate(60px, 180px); opacity: 0; }
  20% { opacity: 1; }
  40% { transform: translate(60px, 120px); }
  50% { transform: translate(60px, 120px) scale(0.9); }
  60% { transform: translate(60px, 120px); }
  80% { opacity: 1; }
  100% { transform: translate(60px, 180px); opacity: 0; }
}

@keyframes ripple-effect {
  0% { transform: scale(0.5); opacity: 1; }
  100% { transform: scale(2); opacity: 0; }
}

@keyframes packet-fly {
  0% { left: 0; opacity: 0; }
  10% { opacity: 1; left: 0;}
  90% { left: 100%; opacity: 1; }
  100% { left: 100%; opacity: 0; }
}

.animation-cursor {
  position: absolute;
  top: 0; left: 0;
  width: 12px; height: 12px;
  background: #1e293b;
  border-radius: 50%;
  animation: cursor-move 3s infinite;
}

.animation-ripple {
  position: absolute;
  top: 120px; left: 60px;
  width: 20px; height: 20px;
  border: 2px solid #ef4444;
  border-radius: 50%;
  opacity: 0;
  animation: ripple-effect 3s infinite;
  animation-delay: 1.5s;
}

.data-flow {
  flex: 1;
  height: 60px;
  position: relative;
  margin: 0 20px;
}

.flow-line {
  position: absolute;
  top: 50%;
  left: 0; right: 0;
  height: 2px;
  background: dashed 2px #cbd5e1;
}

.data-packet {
  position: absolute;
  top: 0;
  transform: translateY(-5px);
  display: flex;
  align-items: center;
  background: #e0f2fe;
  padding: 4px 8px;
  border-radius: 6px;
  font-family: monospace;
  font-size: 10px;
  color: #0369a1;
  animation: packet-fly 3s infinite;
  animation-delay: 1.5s;
}

.server-db {
  width: 160px;
  background: #1e293b;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.server-header {
  background: #334155;
  color: white;
  text-align: center;
  font-size: 12px;
  padding: 8px 0;
}

.server-body {
  padding: 12px;
}

.db-row {
  background: #475569;
  color: #94a3b8;
  padding: 4px;
  margin-bottom: 6px;
  font-size: 8px;
  border-radius: 4px;
  font-family: monospace;
}

.db-row.skeleton {
  height: 14px;
  background: #334155;
}

/* Methods Compare */
.methods-compare {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.method-card {
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 16px;
}

.method-title {
  font-weight: 600;
  font-size: 14px;
  margin-bottom: 12px;
  color: #1e293b;
  text-align: center;
  border-bottom: 1px solid #f1f5f9;
  padding-bottom: 8px;
}

.code-block {
  background: #1e293b;
  color: #cbd5e1;
  padding: 8px;
  border-radius: 4px;
  font-family: monospace;
  font-size: 10px;
  margin-bottom: 12px;
}

.visual-tool {
  background: #f1f5f9;
  height: 40px;
  border-radius: 4px;
  margin-bottom: 12px;
  display: flex;
  gap: 8px;
  align-items: center;
  padding: 8px;
}

.v-box {
  width: 20px; height: 20px;
  background: #cbd5e1;
  border-radius: 2px;
}

.v-box.selected {
  border: 2px dashed #ef4444;
  background: #fee2e2;
}

.auto-tool {
  background: #f1f5f9;
  height: 40px;
  border-radius: 4px;
  margin-bottom: 12px;
  padding: 8px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.noise-line {
  height: 4px;
  background: #cbd5e1;
  width: 100%;
}

.method-pro, .method-con {
  font-size: 11px;
  margin-bottom: 4px;
}

.method-pro {
  color: #16a34a;
}
.method-pro::before { content: "优势："; font-weight: bold; }
.method-con {
  color: #dc2626;
}
.method-con::before { content: "劣势："; font-weight: bold; }

/* JSON Model */
.model-container {
  background: #1e293b;
  border-radius: 8px;
  padding: 24px;
  overflow-x: auto;
}

.json-code {
  font-family: 'Monaco', 'Menlo', monospace;
  font-size: 13px;
  color: #cbd5e1;
  line-height: 1.6;
  white-space: pre;
}

.key { color: #38bdf8; }
.string { color: #a3e635; }
.number { color: #f472b6; }
.comment { color: #64748b; font-style: italic; }

/* Pipeline */
.pipeline-flow {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: white;
  padding: 24px;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  overflow-x: auto;
}

.pipe-node {
  padding: 12px 16px;
  background: #e0f2fe;
  color: #0369a1;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 500;
  border: 1px solid #bae6fd;
  text-align: center;
}

.pipe-node.server { background: #fef08a; color: #854d0e; border-color: #fde047; }
.pipe-node.etl { background: #fed7aa; color: #9a3412; border-color: #fdba74; }
.pipe-node.db { background: #bbf7d0; color: #166534; border-color: #86efac; }

.pipe-arrow {
  position: relative;
  font-size: 10px;
  color: #64748b;
  text-align: center;
}

.pipe-arrow::after {
  content: "→";
  display: block;
  font-size: 16px;
  color: #94a3b8;
}
</style>
