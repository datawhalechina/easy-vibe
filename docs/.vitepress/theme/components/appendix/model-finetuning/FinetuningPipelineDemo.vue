<template>
  <div class="finetuning-pipeline-demo">
    <div class="pipeline-header">
      <h4>微调流水线演示</h4>
      <p class="subtitle">点击每个阶段，了解微调的完整流程</p>
    </div>

    <div class="pipeline-steps">
      <div
        v-for="(step, index) in steps"
        :key="step.id"
        class="pipeline-step"
        :class="{ active: activeStep === index, completed: index < activeStep }"
        @click="setStep(index)"
      >
        <div class="step-icon">{{ step.icon }}</div>
        <div class="step-label">{{ step.label }}</div>
        <div v-if="index < steps.length - 1" class="step-arrow">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
      </div>
    </div>

    <div class="step-detail" v-if="activeStep >= 0">
      <div class="detail-title">
        {{ steps[activeStep].icon }} {{ steps[activeStep].label }}
      </div>
      <p class="detail-desc">{{ steps[activeStep].description }}</p>

      <div class="detail-points">
        <div v-for="(point, i) in steps[activeStep].points" :key="i" class="point-item">
          <span class="point-bullet">{{ i + 1 }}</span>
          <span>{{ point }}</span>
        </div>
      </div>

      <div class="detail-example" v-if="steps[activeStep].example">
        <div class="example-label">示例</div>
        <code>{{ steps[activeStep].example }}</code>
      </div>
    </div>

    <div class="pipeline-controls">
      <button class="ctrl-btn" :disabled="activeStep <= 0" @click="prevStep">上一步</button>
      <span class="step-indicator">{{ activeStep + 1 }} / {{ steps.length }}</span>
      <button class="ctrl-btn primary" :disabled="activeStep >= steps.length - 1" @click="nextStep">下一步</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const activeStep = ref(0)

const steps = [
  {
    id: 'base',
    icon: '🧠',
    label: '选择基座模型',
    description: '微调的第一步是选择一个合适的预训练基座模型。基座模型已经在海量数据上学习了通用的语言能力，我们要做的是在此基础上进行"专业化训练"。',
    points: [
      '根据任务需求选择模型规模（7B、13B、70B 等）',
      '考虑开源许可证（Apache 2.0、Llama 许可等）',
      '评估模型的基础能力是否匹配目标场景',
      '常见选择：Llama、Qwen、Mistral、DeepSeek 等'
    ],
    example: 'model = AutoModelForCausalLM.from_pretrained("Qwen/Qwen2-7B")'
  },
  {
    id: 'data',
    icon: '📊',
    label: '准备训练数据',
    description: '高质量的训练数据是微调成功的关键。数据的质量远比数量重要——1000 条精心标注的数据，往往胜过 10 万条噪声数据。',
    points: [
      '收集与目标任务相关的数据样本',
      '清洗数据：去重、过滤低质量内容',
      '格式化为模型要求的输入格式（如 instruction-response 对）',
      '划分训练集、验证集（通常 9:1）'
    ],
    example: '{"instruction": "翻译成英文", "input": "你好世界", "output": "Hello World"}'
  },
  {
    id: 'train',
    icon: '⚙️',
    label: '执行微调训练',
    description: '使用准备好的数据对模型进行训练。现代微调通常采用参数高效方法（如 LoRA），只更新模型的一小部分参数，大幅降低计算成本。',
    points: [
      '配置训练超参数（学习率、批次大小、训练轮数）',
      '选择微调策略（全量微调 / LoRA / QLoRA）',
      '监控训练损失曲线，防止过拟合',
      '通常需要 1-4 个 GPU，训练数小时到数天'
    ],
    example: 'trainer = SFTTrainer(model, train_dataset, peft_config=lora_config)'
  },
  {
    id: 'eval',
    icon: '📈',
    label: '评估与测试',
    description: '训练完成后，需要全面评估模型的表现。不仅要看自动化指标，更要进行人工评测，确保模型在真实场景中表现良好。',
    points: [
      '在验证集上计算损失和困惑度（Perplexity）',
      '使用任务特定指标（BLEU、ROUGE、准确率等）',
      '人工评测：流畅度、准确性、安全性',
      '与基座模型对比，确认微调带来了提升'
    ],
    example: 'eval_results = trainer.evaluate(eval_dataset)'
  },
  {
    id: 'deploy',
    icon: '🚀',
    label: '部署上线',
    description: '将微调好的模型部署到生产环境，对外提供服务。部署前通常需要进行模型优化（量化、蒸馏等）以降低推理成本。',
    points: [
      '导出模型权重，合并 LoRA 适配器',
      '应用量化技术压缩模型体积',
      '选择部署方案（API 服务、边缘部署等）',
      '配置监控和日志，持续跟踪线上表现'
    ],
    example: 'model.merge_and_unload().save_pretrained("my-finetuned-model")'
  }
]

function setStep(index) {
  activeStep.value = index
}

function prevStep() {
  if (activeStep.value > 0) activeStep.value--
}

function nextStep() {
  if (activeStep.value < steps.length - 1) activeStep.value++
}
</script>

<style scoped>
.finetuning-pipeline-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 24px;
  margin: 16px 0;
  background: var(--vp-c-bg-soft);
}

.pipeline-header h4 {
  margin: 0 0 4px;
  font-size: 16px;
  color: var(--vp-c-text-1);
}

.subtitle {
  margin: 0 0 20px;
  font-size: 13px;
  color: var(--vp-c-text-3);
}

.pipeline-steps {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  flex-wrap: wrap;
  margin-bottom: 20px;
}

.pipeline-step {
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  transition: all 0.2s;
}

.step-icon {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider);
  transition: all 0.3s;
}

.pipeline-step.active .step-icon {
  border-color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
  transform: scale(1.1);
}

.pipeline-step.completed .step-icon {
  border-color: #10b981;
  background: #d1fae5;
}

.step-label {
  font-size: 12px;
  color: var(--vp-c-text-2);
  max-width: 64px;
  text-align: center;
  line-height: 1.3;
}

.pipeline-step.active .step-label {
  color: var(--vp-c-brand-1);
  font-weight: 600;
}

.step-arrow {
  color: var(--vp-c-text-3);
  display: flex;
  align-items: center;
  margin: 0 2px;
}

.step-detail {
  background: var(--vp-c-bg);
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 16px;
  border: 1px solid var(--vp-c-divider);
}

.detail-title {
  font-size: 16px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 8px;
}

.detail-desc {
  font-size: 14px;
  color: var(--vp-c-text-2);
  line-height: 1.7;
  margin: 0 0 12px;
}

.detail-points {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 12px;
}

.point-item {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  font-size: 13px;
  color: var(--vp-c-text-2);
}

.point-bullet {
  min-width: 20px;
  height: 20px;
  border-radius: 50%;
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 600;
}

.detail-example {
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  padding: 12px;
}

.example-label {
  font-size: 11px;
  color: var(--vp-c-text-3);
  margin-bottom: 6px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.detail-example code {
  font-size: 12px;
  color: var(--vp-c-brand-1);
  word-break: break-all;
}

.pipeline-controls {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
}

.ctrl-btn {
  padding: 6px 16px;
  border-radius: 6px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  color: var(--vp-c-text-2);
  cursor: pointer;
  font-size: 13px;
  transition: all 0.2s;
}

.ctrl-btn:hover:not(:disabled) {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}

.ctrl-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.ctrl-btn.primary {
  background: var(--vp-c-brand-1);
  color: #fff;
  border-color: var(--vp-c-brand-1);
}

.ctrl-btn.primary:hover:not(:disabled) {
  opacity: 0.9;
}

.step-indicator {
  font-size: 13px;
  color: var(--vp-c-text-3);
}
</style>
