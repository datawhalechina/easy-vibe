<template>
  <div class="model-serving-demo">
    <div class="demo-header">
      <h4>模型服务架构演示</h4>
      <p class="subtitle">点击不同部署方案，对比其特点与适用场景</p>
    </div>

    <div class="serving-options">
      <div
        v-for="(opt, i) in options"
        :key="opt.id"
        class="option-card"
        :class="{ active: activeOption === i }"
        @click="activeOption = i"
      >
        <div class="opt-icon">{{ opt.icon }}</div>
        <div class="opt-name">{{ opt.name }}</div>
        <div class="opt-brief">{{ opt.brief }}</div>
      </div>
    </div>

    <div class="option-detail" v-if="currentOption">
      <div class="detail-header">
        <span class="detail-icon">{{ currentOption.icon }}</span>
        <span class="detail-name">{{ currentOption.name }}</span>
      </div>
      <p class="detail-desc">{{ currentOption.description }}</p>

      <div class="arch-flow">
        <div class="flow-label">架构流程</div>
        <div class="flow-steps">
          <div v-for="(node, i) in currentOption.flow" :key="i" class="flow-node">
            <div class="node-box">{{ node }}</div>
            <div v-if="i < currentOption.flow.length - 1" class="flow-arrow-h">→</div>
          </div>
        </div>
      </div>

      <div class="specs-grid">
        <div v-for="spec in currentOption.specs" :key="spec.label" class="spec-item">
          <div class="spec-label">{{ spec.label }}</div>
          <div class="spec-value">{{ spec.value }}</div>
          <div class="spec-bar-wrap">
            <div class="spec-bar" :style="{ width: spec.score + '%', background: spec.color }"></div>
          </div>
        </div>
      </div>

      <div class="tools-section">
        <div class="tools-label">常用工具</div>
        <div class="tools-list">
          <span v-for="tool in currentOption.tools" :key="tool" class="tool-tag">{{ tool }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const activeOption = ref(0)

const options = [
  {
    id: 'api',
    icon: '🌐',
    name: 'API 服务',
    brief: '最常见的在线部署方式',
    description: '将模型封装为 RESTful API 或 gRPC 服务，通过 HTTP 请求调用。适合需要实时响应的在线应用，如聊天机器人、智能客服、内容生成等。是目前最主流的部署方式。',
    flow: ['客户端请求', '负载均衡', '推理服务器', 'GPU 推理', '返回结果'],
    specs: [
      { label: '响应延迟', value: '100ms - 2s', score: 70, color: '#10b981' },
      { label: '并发能力', value: '高（可水平扩展）', score: 85, color: '#818cf8' },
      { label: '部署成本', value: '中高（需 GPU 服务器）', score: 50, color: '#f59e0b' },
      { label: '运维复杂度', value: '中等', score: 55, color: '#ef4444' }
    ],
    tools: ['vLLM', 'TGI', 'Triton', 'FastAPI', 'Ollama']
  },
  {
    id: 'edge',
    icon: '📱',
    name: '边缘部署',
    brief: '在终端设备上本地运行',
    description: '将量化后的模型部署到手机、笔记本、嵌入式设备等终端上，无需网络连接即可运行。适合隐私敏感、离线场景或需要极低延迟的应用。',
    flow: ['模型量化', '格式转换', '设备加载', '本地推理', '即时输出'],
    specs: [
      { label: '响应延迟', value: '50ms - 5s', score: 60, color: '#10b981' },
      { label: '并发能力', value: '低（单设备）', score: 20, color: '#818cf8' },
      { label: '部署成本', value: '低（无服务器费用）', score: 90, color: '#f59e0b' },
      { label: '运维复杂度', value: '低', score: 85, color: '#ef4444' }
    ],
    tools: ['llama.cpp', 'MLC LLM', 'ONNX Runtime', 'MediaPipe']
  },
  {
    id: 'batch',
    icon: '📦',
    name: '批量处理',
    brief: '离线批量推理大量数据',
    description: '将大量请求收集后统一处理，不要求实时响应。适合数据标注、文档摘要、批量翻译等离线任务。通过批处理可以最大化 GPU 利用率，显著降低单条推理成本。',
    flow: ['数据队列', '批量收集', 'GPU 批推理', '结果存储', '异步通知'],
    specs: [
      { label: '响应延迟', value: '分钟~小时级', score: 20, color: '#10b981' },
      { label: '吞吐量', value: '极高（批处理优化）', score: 95, color: '#818cf8' },
      { label: '部署成本', value: '低（GPU 利用率高）', score: 85, color: '#f59e0b' },
      { label: '运维复杂度', value: '中等', score: 55, color: '#ef4444' }
    ],
    tools: ['Ray Serve', 'Spark', 'Celery', 'AWS Batch']
  }
]

const currentOption = computed(() => options[activeOption.value])
</script>

<style scoped>
.model-serving-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 24px;
  margin: 16px 0;
  background: var(--vp-c-bg-soft);
}

.demo-header h4 {
  margin: 0 0 4px;
  font-size: 16px;
  color: var(--vp-c-text-1);
}

.subtitle {
  margin: 0 0 20px;
  font-size: 13px;
  color: var(--vp-c-text-3);
}

.serving-options {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  margin-bottom: 20px;
}

@media (max-width: 640px) {
  .serving-options {
    grid-template-columns: 1fr;
  }
}

.option-card {
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider);
  border-radius: 10px;
  padding: 16px;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s;
}

.option-card.active {
  border-color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
}

.opt-icon {
  font-size: 28px;
  margin-bottom: 6px;
}

.opt-name {
  font-size: 14px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 4px;
}

.opt-brief {
  font-size: 11px;
  color: var(--vp-c-text-3);
}

.option-detail {
  background: var(--vp-c-bg);
  border-radius: 8px;
  padding: 20px;
  border: 1px solid var(--vp-c-divider);
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(6px); }
  to { opacity: 1; transform: translateY(0); }
}

.detail-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}

.detail-icon {
  font-size: 22px;
}

.detail-name {
  font-size: 16px;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.detail-desc {
  font-size: 13px;
  color: var(--vp-c-text-2);
  line-height: 1.7;
  margin: 0 0 16px;
}

.arch-flow {
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  padding: 14px;
  margin-bottom: 16px;
}

.flow-label {
  font-size: 11px;
  color: var(--vp-c-text-3);
  margin-bottom: 10px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.flow-steps {
  display: flex;
  align-items: center;
  gap: 4px;
  flex-wrap: wrap;
  justify-content: center;
}

.flow-node {
  display: flex;
  align-items: center;
  gap: 4px;
}

.node-box {
  padding: 6px 12px;
  border-radius: 6px;
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  font-size: 12px;
  font-weight: 500;
  white-space: nowrap;
}

.flow-arrow-h {
  color: var(--vp-c-text-3);
  font-size: 16px;
}

.specs-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  margin-bottom: 16px;
}

@media (max-width: 640px) {
  .specs-grid {
    grid-template-columns: 1fr;
  }
}

.spec-item {
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  padding: 10px 12px;
}

.spec-label {
  font-size: 11px;
  color: var(--vp-c-text-3);
  margin-bottom: 4px;
}

.spec-value {
  font-size: 13px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 6px;
}

.spec-bar-wrap {
  height: 4px;
  background: var(--vp-c-divider);
  border-radius: 2px;
  overflow: hidden;
}

.spec-bar {
  height: 100%;
  border-radius: 2px;
  transition: width 0.5s ease;
}

.tools-section {
  border-top: 1px solid var(--vp-c-divider);
  padding-top: 12px;
}

.tools-label {
  font-size: 12px;
  color: var(--vp-c-text-3);
  margin-bottom: 8px;
}

.tools-list {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}

.tool-tag {
  padding: 3px 10px;
  border-radius: 12px;
  font-size: 12px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-2);
  border: 1px solid var(--vp-c-divider);
}
</style>
