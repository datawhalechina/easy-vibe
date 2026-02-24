<template>
  <div class="terraform-workflow-demo">
    <div class="demo-label">交互演示 ── Terraform 工作流四阶段</div>

    <div class="stage-nav">
      <div
        v-for="(stage, i) in stages"
        :key="stage.key"
        :class="['stage-tab', { active: currentStage === i, completed: i < currentStage }]"
        @click="goToStage(i)"
      >
        <span class="stage-icon">{{ stage.icon }}</span>
        <span class="stage-name">{{ stage.name }}</span>
        <span v-if="i < stages.length - 1" class="stage-arrow">→</span>
      </div>
    </div>

    <div class="stage-content">
      <Transition name="slide" mode="out-in">
        <div :key="currentStage" class="stage-panel">
          <div class="panel-header">
            <span class="panel-icon">{{ stages[currentStage].icon }}</span>
            <span class="panel-title">{{ stages[currentStage].title }}</span>
          </div>
          <p class="panel-desc">{{ stages[currentStage].desc }}</p>

          <div class="terminal-block">
            <div class="terminal-header">
              <span class="terminal-dot red"></span>
              <span class="terminal-dot yellow"></span>
              <span class="terminal-dot green"></span>
              <span class="terminal-title">Terminal</span>
            </div>
            <div class="terminal-body">
              <div v-for="(line, li) in visibleLines" :key="li" class="terminal-line">
                <span :class="line.cls">{{ line.text }}</span>
              </div>
              <span v-if="isTyping" class="cursor-blink">_</span>
            </div>
          </div>

          <div class="key-points">
            <div v-for="(point, pi) in stages[currentStage].points" :key="pi" class="point-item">
              <span class="point-bullet">{{ point.icon }}</span>
              <span class="point-text">{{ point.text }}</span>
            </div>
          </div>
        </div>
      </Transition>
    </div>

    <div class="nav-buttons">
      <button class="nav-btn" :disabled="currentStage === 0" @click="goToStage(currentStage - 1)">
        ← 上一步
      </button>
      <span class="stage-indicator">{{ currentStage + 1 }} / {{ stages.length }}</span>
      <button class="nav-btn primary" :disabled="currentStage === stages.length - 1" @click="goToStage(currentStage + 1)">
        下一步 →
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const currentStage = ref(0)
const typingIndex = ref(0)
const isTyping = ref(false)

const stages = [
  {
    key: 'write', icon: '📝', name: 'Write', title: 'Write ── 编写基础设施代码',
    desc: '用声明式语言（HCL）描述你期望的基础设施状态。代码就是文档，可以提交到 Git 进行版本管理和 Code Review。',
    lines: [
      { text: '$ vim main.tf', cls: 'cmd' },
      { text: '', cls: '' },
      { text: 'resource "aws_instance" "app" {', cls: 'code' },
      { text: '  ami           = "ami-0c55b159"', cls: 'code' },
      { text: '  instance_type = "t3.micro"', cls: 'code' },
      { text: '  tags = { Name = "my-app" }', cls: 'code' },
      { text: '}', cls: 'code' },
      { text: '', cls: '' },
      { text: '# 文件已保存 ✓', cls: 'success' }
    ],
    points: [
      { icon: '📄', text: '使用 .tf 文件描述资源' },
      { icon: '🔧', text: 'HCL 语法简洁易读' },
      { icon: '📦', text: '支持模块化复用' }
    ]
  },
  {
    key: 'plan', icon: '🔍', name: 'Plan', title: 'Plan ── 预览变更计划',
    desc: 'Terraform 会对比当前状态和期望状态，生成一份详细的执行计划。这一步不会做任何实际变更，是安全的"预演"。',
    lines: [
      { text: '$ terraform plan', cls: 'cmd' },
      { text: '', cls: '' },
      { text: 'Terraform will perform the following actions:', cls: 'info' },
      { text: '', cls: '' },
      { text: '  + aws_instance.app', cls: 'add' },
      { text: '      ami:           "ami-0c55b159"', cls: 'detail' },
      { text: '      instance_type: "t3.micro"', cls: 'detail' },
      { text: '', cls: '' },
      { text: 'Plan: 1 to add, 0 to change, 0 to destroy.', cls: 'success' }
    ],
    points: [
      { icon: '🛡️', text: '变更前先预览，避免意外' },
      { icon: '➕', text: '绿色 + 表示新增资源' },
      { icon: '🔄', text: '~ 表示修改，- 表示删除' }
    ]
  },
  {
    key: 'apply', icon: '🚀', name: 'Apply', title: 'Apply ── 执行变更',
    desc: '确认计划无误后，Terraform 调用云平台 API 创建/修改/删除资源，并将最终状态写入 State 文件。',
    lines: [
      { text: '$ terraform apply', cls: 'cmd' },
      { text: '', cls: '' },
      { text: 'aws_instance.app: Creating...', cls: 'info' },
      { text: 'aws_instance.app: Still creating... [10s elapsed]', cls: 'info' },
      { text: 'aws_instance.app: Creation complete after 32s', cls: 'success' },
      { text: '', cls: '' },
      { text: 'Apply complete! Resources: 1 added, 0 changed, 0 destroyed.', cls: 'success' },
      { text: '', cls: '' },
      { text: 'Outputs:', cls: 'info' },
      { text: '  public_ip = "54.123.45.67"', cls: 'output' }
    ],
    points: [
      { icon: '☁️', text: '自动调用云平台 API' },
      { icon: '💾', text: '状态保存到 terraform.tfstate' },
      { icon: '📤', text: '输出关键信息（IP、域名等）' }
    ]
  },
  {
    key: 'destroy', icon: '🗑️', name: 'Destroy', title: 'Destroy ── 销毁资源',
    desc: '不再需要时，一条命令即可安全销毁所有资源。Terraform 会按照依赖关系的逆序逐一清理，避免残留。',
    lines: [
      { text: '$ terraform destroy', cls: 'cmd' },
      { text: '', cls: '' },
      { text: 'Terraform will perform the following actions:', cls: 'info' },
      { text: '', cls: '' },
      { text: '  - aws_instance.app', cls: 'remove' },
      { text: '', cls: '' },
      { text: 'Plan: 0 to add, 0 to change, 1 to destroy.', cls: 'warn' },
      { text: 'aws_instance.app: Destroying...', cls: 'info' },
      { text: 'aws_instance.app: Destruction complete after 15s', cls: 'success' },
      { text: '', cls: '' },
      { text: 'Destroy complete! Resources: 1 destroyed.', cls: 'success' }
    ],
    points: [
      { icon: '🧹', text: '按依赖逆序安全清理' },
      { icon: '💰', text: '避免资源遗忘产生费用' },
      { icon: '♻️', text: '环境可随时重建' }
    ]
  }
]

const visibleLines = computed(() => {
  return stages[currentStage.value].lines.slice(0, typingIndex.value)
})

function goToStage(i) {
  currentStage.value = i
}

watch(currentStage, () => {
  typingIndex.value = 0
  isTyping.value = true
  typeNext()
})

function typeNext() {
  const total = stages[currentStage.value].lines.length
  if (typingIndex.value < total) {
    setTimeout(() => {
      typingIndex.value++
      typeNext()
    }, 120)
  } else {
    isTyping.value = false
  }
}

// Initialize first stage
typeNext()
</script>

<style scoped>
.terraform-workflow-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  padding: 1rem 1.2rem;
  margin: 1rem 0;
}
.demo-label {
  font-size: 0.78rem;
  font-weight: bold;
  color: var(--vp-c-text-2);
  margin-bottom: 1rem;
  text-align: center;
}
.stage-nav {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.2rem;
  margin-bottom: 1rem;
}
.stage-tab {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 0.8rem;
  cursor: pointer;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  transition: all 0.2s;
}
.stage-tab.active {
  background: var(--vp-c-brand);
  color: #fff;
  border-color: var(--vp-c-brand);
}
.stage-tab.completed {
  border-color: #10b981;
  background: #d1fae510;
}
.stage-arrow { color: var(--vp-c-text-3); margin: 0 2px; }
.stage-content { min-height: 280px; }
.panel-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 0.5rem;
}
.panel-icon { font-size: 1.3rem; }
.panel-title { font-weight: 600; font-size: 0.95rem; }
.panel-desc {
  font-size: 0.82rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.8rem;
  line-height: 1.6;
}
.terminal-block {
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid var(--vp-c-divider);
  margin-bottom: 0.8rem;
}
.terminal-header {
  background: #1e1e1e;
  padding: 6px 10px;
  display: flex;
  align-items: center;
  gap: 6px;
}
.terminal-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}
.terminal-dot.red { background: #ff5f57; }
.terminal-dot.yellow { background: #febc2e; }
.terminal-dot.green { background: #28c840; }
.terminal-title {
  font-size: 0.7rem;
  color: #888;
  margin-left: 6px;
}
.terminal-body {
  background: #1a1a2e;
  padding: 0.8rem;
  font-family: 'Menlo', 'Consolas', monospace;
  font-size: 0.73rem;
  line-height: 1.6;
  min-height: 160px;
  color: #e0e0e0;
}
.terminal-line .cmd { color: #7dd3fc; }
.terminal-line .code { color: #a5b4fc; }
.terminal-line .info { color: #94a3b8; }
.terminal-line .add { color: #4ade80; }
.terminal-line .remove { color: #f87171; }
.terminal-line .detail { color: #cbd5e1; padding-left: 1rem; }
.terminal-line .success { color: #34d399; font-weight: 600; }
.terminal-line .warn { color: #fbbf24; }
.terminal-line .output { color: #c084fc; }
.cursor-blink {
  animation: blink 1s step-end infinite;
  color: #7dd3fc;
}
@keyframes blink { 50% { opacity: 0; } }
.key-points {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}
.point-item {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 10px;
  border-radius: 16px;
  font-size: 0.75rem;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
}
.nav-buttons {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-top: 1rem;
}
.nav-btn {
  padding: 6px 16px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg);
  cursor: pointer;
  font-size: 0.8rem;
  transition: all 0.2s;
}
.nav-btn:disabled { opacity: 0.4; cursor: default; }
.nav-btn.primary { background: var(--vp-c-brand); color: #fff; border-color: var(--vp-c-brand); }
.stage-indicator { font-size: 0.75rem; color: var(--vp-c-text-3); }
.slide-enter-active, .slide-leave-active { transition: all 0.3s ease; }
.slide-enter-from { opacity: 0; transform: translateX(20px); }
.slide-leave-to { opacity: 0; transform: translateX(-20px); }
</style>
