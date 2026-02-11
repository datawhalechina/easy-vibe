<template>
  <div class="deploy-workflow-demo">
    <div class="workflow-steps">
      <div
        v-for="(step, index) in steps"
        :key="index"
        class="step-card"
        :class="{ active: currentStep === index, completed: currentStep > index }"
        @click="currentStep = index"
      >
        <div class="step-number">{{ index + 1 }}</div>
        <div class="step-info">
          <div class="step-name">{{ step.name }}</div>
          <div class="step-time">{{ step.time }}</div>
        </div>
      </div>
    </div>

    <div v-if="currentStepData" class="step-detail">
      <div class="detail-header">
        <span class="detail-step">步骤 {{ currentStep + 1 }}</span>
        <span class="detail-name">{{ currentStepData.name }}</span>
      </div>
      <div class="detail-content">
        <div class="detail-desc">{{ currentStepData.description }}</div>
        <div class="detail-tasks">
          <div class="tasks-title">具体操作：</div>
          <ul>
            <li v-for="(task, i) in currentStepData.tasks" :key="i">{{ task }}</li>
          </ul>
        </div>
      </div>
    </div>

    <div class="workflow-actions">
      <button class="action-btn" @click="prevStep" :disabled="currentStep === 0">
        上一步
      </button>
      <button class="action-btn primary" @click="nextStep" :disabled="currentStep >= steps.length - 1">
        {{ currentStep >= steps.length - 1 ? '完成' : '下一步' }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const currentStep = ref(0)

const steps = [
  {
    name: '准备代码',
    time: '5分钟',
    description: '将网站代码打包成可部署的格式',
    tasks: [
      '整理 HTML/CSS/JS 文件',
      '压缩图片和静态资源',
      '检查文件路径是否正确'
    ]
  },
  {
    name: '创建存储桶',
    time: '2分钟',
    description: '在对象存储服务中创建存储空间',
    tasks: [
      '登录云控制台',
      '进入对象存储 OSS/S3',
      '点击"创建 Bucket"',
      '设置 Bucket 名称和地域'
    ]
  },
  {
    name: '上传文件',
    time: '3分钟',
    description: '将网站文件上传到存储桶',
    tasks: [
      '进入 Bucket 管理页面',
      '点击"上传文件"',
      '选择本地网站文件',
      '等待上传完成'
    ]
  },
  {
    name: '配置 CDN',
    time: '5分钟',
    description: '配置内容分发网络加速访问',
    tasks: [
      '进入 CDN 控制台',
      '添加加速域名',
      '配置源站为存储桶',
      '等待 CDN 部署完成'
    ]
  },
  {
    name: '域名绑定',
    time: '10分钟',
    description: '将自定义域名绑定到 CDN',
    tasks: [
      '添加域名解析记录',
      '配置 CNAME 到 CDN',
      '申请 SSL 证书',
      '测试 HTTPS 访问'
    ]
  }
]

const currentStepData = computed(() => steps[currentStep.value])

function nextStep() {
  if (currentStep.value < steps.length - 1) {
    currentStep.value++
  }
}

function prevStep() {
  if (currentStep.value > 0) {
    currentStep.value--
  }
}
</script>

<style scoped>
.deploy-workflow-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background-color: var(--vp-c-bg-soft);
  padding: 1rem;
  margin: 1rem 0;
}

.workflow-steps {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
  overflow-x: auto;
  padding-bottom: 0.5rem;
}

.step-card {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 0.75rem;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
  min-width: 120px;
}

.step-card:hover {
  border-color: var(--vp-c-brand);
}

.step-card.active {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-brand-soft);
}

.step-card.completed {
  border-color: #22c55e;
  background: rgba(34, 197, 94, 0.1);
}

.step-number {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: var(--vp-c-divider);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 600;
  flex-shrink: 0;
}

.step-card.active .step-number {
  background: var(--vp-c-brand);
  color: white;
}

.step-card.completed .step-number {
  background: #22c55e;
  color: white;
}

.step-info {
  flex: 1;
}

.step-name {
  font-weight: 500;
  font-size: 0.85rem;
}

.step-time {
  font-size: 0.7rem;
  color: var(--vp-c-text-2);
}

.step-detail {
  background: var(--vp-c-bg);
  border-radius: 6px;
  padding: 1rem;
  margin-bottom: 1rem;
}

.detail-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--vp-c-divider);
}

.detail-step {
  font-size: 0.75rem;
  color: var(--vp-c-brand);
  font-weight: 600;
}

.detail-name {
  font-weight: 600;
}

.detail-desc {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.75rem;
}

.tasks-title {
  font-size: 0.8rem;
  font-weight: 500;
  margin-bottom: 0.4rem;
}

.detail-tasks ul {
  margin: 0;
  padding-left: 1.25rem;
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
}

.detail-tasks li {
  margin-bottom: 0.2rem;
}

.workflow-actions {
  display: flex;
  gap: 0.5rem;
}

.action-btn {
  padding: 0.5rem 1rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  background: var(--vp-c-bg);
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.2s;
}

.action-btn:hover:not(:disabled) {
  border-color: var(--vp-c-brand);
}

.action-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.action-btn.primary {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-brand);
  color: white;
}

.action-btn.primary:hover:not(:disabled) {
  opacity: 0.9;
}
</style>
