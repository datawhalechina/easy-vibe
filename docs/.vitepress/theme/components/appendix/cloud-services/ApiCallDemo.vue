<template>
  <div class="api-call-demo">
    <div class="flow-steps">
      <div 
        v-for="(step, index) in steps" 
        :key="index"
        class="step"
        :class="{ active: currentStep >= index, completed: currentStep > index }"
      >
        <div class="step-num">{{ index + 1 }}</div>
        <div class="step-content">
          <div class="step-title">{{ step.title }}</div>
          <div class="step-desc">{{ step.desc }}</div>
        </div>
      </div>
    </div>
    
    <div class="action-panel">
      <button 
        class="action-btn" 
        @click="nextStep"
        :disabled="currentStep >= steps.length"
      >
        {{ currentStep >= steps.length ? '已完成' : '下一步' }}
      </button>
      <button class="action-btn outline" @click="reset">
        重置
      </button>
    </div>
    
    <div v-if="currentStep > 0" class="code-preview">
      <div class="code-title">{{ steps[currentStep - 1].codeTitle }}</div>
      <pre><code>{{ steps[currentStep - 1].code }}</code></pre>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const currentStep = ref(0)

const steps = [
  {
    title: '获取 AccessKey',
    desc: '在控制台创建 AccessKey ID 和 Secret',
    codeTitle: '配置凭证',
    code: `// 环境变量设置
export ALIYUN_ACCESS_KEY_ID=your_key_id
export ALIYUN_ACCESS_KEY_SECRET=your_secret`
  },
  {
    title: '安装 SDK',
    desc: '安装对应语言的云服务 SDK',
    codeTitle: '安装依赖',
    code: `# Python
pip install alibabacloud-ecs20140526

# Node.js
npm install @alicloud/ecs20140526`
  },
  {
    title: '编写调用代码',
    desc: '使用 SDK 调用云服务 API',
    codeTitle: '调用示例',
    code: `from alibabacloud_ecs20140526 import models as ecs_models

# 创建客户端
client = create_client()

# 调用 API
response = client.describe_instances(
  ecs_models.DescribeInstancesRequest()
)

print(response.body)`
  },
  {
    title: '处理响应',
    desc: '解析 API 返回的数据',
    codeTitle: '处理结果',
    code: `// 解析响应
instances = response.body.instances.instance

for inst in instances:
    print(f"ID: {inst.instance_id}")
    print(f"状态: {inst.status}")
    print(f"IP: {inst.public_ip_address}")`
  }
]

function nextStep() {
  if (currentStep.value < steps.length) {
    currentStep.value++
  }
}

function reset() {
  currentStep.value = 0
}
</script>

<style scoped>
.api-call-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background-color: var(--vp-c-bg-soft);
  padding: 1rem;
  margin: 1rem 0;
}

.flow-steps {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.step {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 0.75rem;
  border-radius: 6px;
  opacity: 0.5;
  transition: all 0.2s;
}

.step.active {
  opacity: 1;
  background: var(--vp-c-bg);
}

.step.completed {
  opacity: 0.7;
}

.step-num {
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

.step.active .step-num {
  background: var(--vp-c-brand);
  color: white;
}

.step.completed .step-num {
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand);
}

.step-content {
  flex: 1;
}

.step-title {
  font-weight: 600;
  font-size: 0.9rem;
  margin-bottom: 0.15rem;
}

.step-desc {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
}

.action-panel {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.action-btn {
  padding: 0.5rem 1rem;
  border: 1px solid var(--vp-c-brand);
  border-radius: 4px;
  background: var(--vp-c-brand);
  color: white;
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.2s;
}

.action-btn:hover:not(:disabled) {
  opacity: 0.9;
}

.action-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.action-btn.outline {
  background: transparent;
  color: var(--vp-c-brand);
}

.code-preview {
  background: var(--vp-c-bg);
  border-radius: 6px;
  padding: 0.75rem;
}

.code-title {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.5rem;
}

pre {
  margin: 0;
  font-size: 0.75rem;
  line-height: 1.5;
  overflow-x: auto;
}

code {
  font-family: var(--vp-font-family-mono);
  color: var(--vp-c-text-1);
}
</style>
