<template>
  <div class="iac-concept-demo">
    <div class="demo-label">交互演示 ── 手动运维 vs 基础设施即代码</div>

    <div class="toggle-bar">
      <button
        v-for="mode in modes"
        :key="mode.key"
        :class="['toggle-btn', { active: current === mode.key }]"
        @click="current = mode.key"
      >
        {{ mode.icon }} {{ mode.label }}
      </button>
    </div>

    <div class="scene-container">
      <Transition name="fade" mode="out-in">
        <div v-if="current === 'manual'" key="manual" class="scene manual-scene">
          <div class="scene-title">手动运维流程</div>
          <div class="steps">
            <div
              v-for="(step, i) in manualSteps"
              :key="i"
              :class="['step-card', { done: manualProgress > i, current: manualProgress === i }]"
            >
              <div class="step-num">{{ i + 1 }}</div>
              <div class="step-icon">{{ step.icon }}</div>
              <div class="step-text">{{ step.text }}</div>
              <div class="step-risk">{{ step.risk }}</div>
            </div>
          </div>
          <button class="action-btn manual-btn" @click="advanceManual" :disabled="manualProgress >= manualSteps.length">
            {{ manualProgress >= manualSteps.length ? '全部完成（耗时约 2 小时）' : '点击控制台按钮...' }}
          </button>
          <div v-if="manualProgress >= manualSteps.length" class="result-box warning">
            手动操作完成，但存在风险：步骤不可重复、无法审计、容易遗漏配置。
          </div>
        </div>

        <div v-else key="iac" class="scene iac-scene">
          <div class="scene-title">IaC 代码驱动流程</div>
          <div class="code-block">
            <div class="code-header">main.tf</div>
            <pre class="code-content"><code>{{ iacCode }}</code></pre>
          </div>
          <div class="iac-steps">
            <div
              v-for="(step, i) in iacSteps"
              :key="i"
              :class="['iac-step', { done: iacProgress > i, current: iacProgress === i }]"
            >
              <span class="iac-arrow" v-if="i > 0">→</span>
              <span class="iac-badge">{{ step.icon }}</span>
              <span class="iac-label">{{ step.text }}</span>
            </div>
          </div>
          <button class="action-btn iac-btn" @click="advanceIac" :disabled="iacProgress >= iacSteps.length">
            {{ iacProgress >= iacSteps.length ? '全部完成（耗时约 30 秒）' : '执行下一步' }}
          </button>
          <div v-if="iacProgress >= iacSteps.length" class="result-box success">
            代码即文档，可重复、可审计、可版本控制，团队协作无忧。
          </div>
        </div>
      </Transition>
    </div>

    <div class="comparison-table">
      <table>
        <thead>
          <tr>
            <th>对比维度</th>
            <th>手动运维</th>
            <th>基础设施即代码</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in comparisonRows" :key="row.dim">
            <td class="dim-cell">{{ row.dim }}</td>
            <td class="bad-cell">{{ row.manual }}</td>
            <td class="good-cell">{{ row.iac }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const current = ref('manual')
const manualProgress = ref(0)
const iacProgress = ref(0)

const modes = [
  { key: 'manual', icon: '🖱️', label: '手动运维' },
  { key: 'iac', icon: '📝', label: '基础设施即代码' }
]

const manualSteps = [
  { icon: '🌐', text: '登录云控制台', risk: '需要记住密码' },
  { icon: '🖥️', text: '手动创建服务器', risk: '配置可能遗漏' },
  { icon: '🔧', text: '配置安全组规则', risk: '容易开放过多端口' },
  { icon: '💾', text: '挂载存储卷', risk: '大小可能选错' },
  { icon: '🔗', text: '配置负载均衡', risk: '路由规则易出错' },
  { icon: '📋', text: '手动记录到文档', risk: '文档很快过时' }
]

const iacSteps = [
  { icon: '📝', text: 'Write（编写代码）' },
  { icon: '🔍', text: 'Plan（预览变更）' },
  { icon: '🚀', text: 'Apply（自动执行）' },
  { icon: '✅', text: 'Done（状态记录）' }
]

const iacCode = `resource "aws_instance" "web" {
  ami           = "ami-0c55b159"
  instance_type = "t3.micro"

  tags = {
    Name = "web-server"
    Env  = "production"
  }
}

resource "aws_security_group" "web_sg" {
  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}`

const comparisonRows = [
  { dim: '可重复性', manual: '每次操作可能不同', iac: '代码保证完全一致' },
  { dim: '速度', manual: '分钟到小时级', iac: '秒到分钟级' },
  { dim: '审计追踪', manual: '依赖人工记录', iac: 'Git 历史自动记录' },
  { dim: '协作', manual: '口头传达、截图', iac: 'Code Review、PR 流程' },
  { dim: '回滚', manual: '几乎不可能', iac: 'git revert 一键回滚' }
]

function advanceManual() {
  if (manualProgress.value < manualSteps.length) {
    manualProgress.value++
  }
}

function advanceIac() {
  if (iacProgress.value < iacSteps.length) {
    iacProgress.value++
  }
}
</script>

<style scoped>
.iac-concept-demo {
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
.toggle-bar {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
}
.toggle-btn {
  padding: 6px 16px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg);
  cursor: pointer;
  font-size: 0.85rem;
  transition: all 0.2s;
}
.toggle-btn.active {
  background: var(--vp-c-brand);
  color: #fff;
  border-color: var(--vp-c-brand);
}
.scene-container { min-height: 200px; }
.scene-title {
  font-weight: 600;
  font-size: 0.9rem;
  margin-bottom: 0.8rem;
  text-align: center;
}
.steps {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 0.5rem;
  margin-bottom: 1rem;
}
.step-card {
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 0.6rem;
  background: var(--vp-c-bg);
  text-align: center;
  transition: all 0.3s;
  opacity: 0.5;
}
.step-card.done { opacity: 1; border-color: #f59e0b; background: #fef3c710; }
.step-card.current { opacity: 1; border-color: var(--vp-c-brand); box-shadow: 0 0 0 2px var(--vp-c-brand-light); }
.step-num { font-size: 0.65rem; color: var(--vp-c-text-3); }
.step-icon { font-size: 1.4rem; margin: 4px 0; }
.step-text { font-size: 0.75rem; font-weight: 600; }
.step-risk { font-size: 0.65rem; color: #ef4444; margin-top: 2px; }
.action-btn {
  display: block;
  margin: 0 auto;
  padding: 8px 20px;
  border: none;
  border-radius: 6px;
  font-size: 0.82rem;
  cursor: pointer;
  transition: all 0.2s;
}
.action-btn:disabled { opacity: 0.6; cursor: default; }
.manual-btn { background: #fbbf24; color: #78350f; }
.iac-btn { background: var(--vp-c-brand); color: #fff; }
.code-block {
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  overflow: hidden;
  margin-bottom: 1rem;
}
.code-header {
  background: var(--vp-c-bg-alt);
  padding: 4px 10px;
  font-size: 0.72rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
  border-bottom: 1px solid var(--vp-c-divider);
}
.code-content {
  padding: 0.8rem;
  font-size: 0.75rem;
  line-height: 1.5;
  margin: 0;
  overflow-x: auto;
  background: var(--vp-c-bg);
}
.iac-steps {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.3rem;
  margin-bottom: 1rem;
}
.iac-step {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 10px;
  border-radius: 16px;
  font-size: 0.78rem;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  opacity: 0.4;
  transition: all 0.3s;
}
.iac-step.done { opacity: 1; border-color: #10b981; background: #d1fae510; }
.iac-step.current { opacity: 1; border-color: var(--vp-c-brand); box-shadow: 0 0 0 2px var(--vp-c-brand-light); }
.iac-arrow { color: var(--vp-c-text-3); font-size: 0.8rem; }
.result-box {
  margin-top: 0.8rem;
  padding: 0.6rem 1rem;
  border-radius: 6px;
  font-size: 0.8rem;
  text-align: center;
}
.result-box.warning { background: #fef3c7; color: #92400e; border: 1px solid #fcd34d; }
.result-box.success { background: #d1fae5; color: #065f46; border: 1px solid #6ee7b7; }
:root.dark .result-box.warning { background: #451a0320; color: #fcd34d; }
:root.dark .result-box.success { background: #022c2220; color: #6ee7b7; }
.comparison-table { margin-top: 1rem; overflow-x: auto; }
.comparison-table table { width: 100%; border-collapse: collapse; font-size: 0.78rem; }
.comparison-table th, .comparison-table td {
  padding: 6px 10px;
  border: 1px solid var(--vp-c-divider);
  text-align: center;
}
.comparison-table th { background: var(--vp-c-bg-alt); font-weight: 600; }
.dim-cell { font-weight: 600; }
.bad-cell { color: #ef4444; }
.good-cell { color: #10b981; }
.fade-enter-active, .fade-leave-active { transition: opacity 0.25s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
