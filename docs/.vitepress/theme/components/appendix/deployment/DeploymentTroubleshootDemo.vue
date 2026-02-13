<script setup>
import { ref } from 'vue'

const symptoms = ref([
  { id: 'slow', text: '网站访问很慢', icon: '🐌' },
  { id: 'error', text: '显示500错误', icon: '❌' },
  { id: 'timeout', text: '请求超时', icon: '⏰' },
  { id: 'blank', text: '页面空白', icon: '📄' }
])

const selectedSymptom = ref('')
const diagnosis = ref('')
const solution = ref('')
const step = ref(1)

const diagnose = (symptom) => {
  selectedSymptom.value = symptom
  step.value = 2

  if (symptom === 'slow') {
    diagnosis.value = '可能原因：服务器负载过高、数据库查询慢、带宽不足'
    solution.value = '检查CPU/内存使用率，优化数据库查询，考虑使用CDN加速'
  } else if (symptom === 'error') {
    diagnosis.value = '可能原因：代码Bug、配置错误、依赖缺失'
    solution.value = '查看服务器日志，检查环境变量，确认依赖包是否安装'
  } else if (symptom === 'timeout') {
    diagnosis.value = '可能原因：网络问题、防火墙阻拦、服务未启动'
    solution.value = '检查网络连通性，确认防火墙规则，验证服务状态'
  } else if (symptom === 'blank') {
    diagnosis.value = '可能原因：前端资源加载失败、JS报错、路径配置错误'
    solution.value = '检查浏览器控制台错误，验证静态资源路径，查看构建日志'
  }
}

const reset = () => {
  selectedSymptom.value = ''
  diagnosis.value = ''
  solution.value = ''
  step.value = 1
}
</script>

<template>
  <div class="deployment-troubleshoot">
    <div class="demo-header">
      <h3>故障排查演示</h3>
      <p class="subtitle">像医生诊断病人一样排查问题</p>
    </div>

    <div class="intro-text">
      <p>
        就像小明发现咖啡店<strong>出餐慢</strong>、<strong>机器故障</strong>时，
        需要系统性地排查问题（咖啡豆→磨豆机→咖啡机→操作员），
        服务器故障也需要科学的排查流程。
      </p>
    </div>

    <div class="demo-content">
      <!-- 步骤1: 选择症状 -->
      <div v-if="step === 1" class="symptom-selection">
        <div class="section-title">🔍 第一步：选择你遇到的问题</div>
        <div class="symptom-grid">
          <div
            v-for="symptom in symptoms"
            :key="symptom.id"
            class="symptom-card"
            @click="diagnose(symptom.id)"
          >
            <div class="symptom-icon">{{ symptom.icon }}</div>
            <div class="symptom-text">{{ symptom.text }}</div>
          </div>
        </div>
      </div>

      <!-- 步骤2: 诊断结果 -->
      <div v-if="step === 2" class="diagnosis-result">
        <div class="section-title">🩺 诊断结果</div>

        <div class="result-card">
          <div class="result-header">
            <span class="result-icon">😷</span>
            <span class="result-title">问题症状</span>
          </div>
          <div class="result-content">
            {{ symptoms.find(s => s.id === selectedSymptom).text }}
          </div>
        </div>

        <div class="result-card">
          <div class="result-header">
            <span class="result-icon">🔬</span>
            <span class="result-title">可能原因</span>
          </div>
          <div class="result-content">{{ diagnosis }}</div>
        </div>

        <div class="result-card success">
          <div class="result-header">
            <span class="result-icon">💊</span>
            <span class="result-title">解决方案</span>
          </div>
          <div class="result-content">{{ solution }}</div>
        </div>

        <button class="btn secondary" @click="reset">
          ← 重新诊断
        </button>
      </div>

      <!-- 通用排查流程 -->
      <div class="troubleshoot-flow">
        <div class="flow-title">📋 通用排查流程</div>
        <div class="flow-steps">
          <div class="flow-step">
            <div class="step-number">1</div>
            <div class="step-content">
              <div class="step-title">查看日志</div>
              <div class="step-desc">服务器日志、应用日志、错误日志</div>
            </div>
          </div>
          <div class="flow-step">
            <div class="step-number">2</div>
            <div class="step-content">
              <div class="step-title">检查状态</div>
              <div class="step-desc">服务是否运行、端口是否监听、进程是否存在</div>
            </div>
          </div>
          <div class="flow-step">
            <div class="step-number">3</div>
            <div class="step-content">
              <div class="step-title">资源监控</div>
              <div class="step-desc">CPU、内存、磁盘、网络使用情况</div>
            </div>
          </div>
          <div class="flow-step">
            <div class="step-number">4</div>
            <div class="step-content">
              <div class="step-title">网络测试</div>
              <div class="step-desc">ping、telnet、curl 测试连通性</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 常用命令 -->
      <div class="commands-cheatsheet">
        <div class="cheatsheet-title">⚡ 常用排查命令</div>
        <div class="command-list">
          <div class="command-item">
            <code class="command-code">tail -f /var/log/nginx/error.log</code>
            <span class="command-desc">实时查看 Nginx 错误日志</span>
          </div>
          <div class="command-item">
            <code class="command-code">systemctl status nginx</code>
            <span class="command-desc">检查 Nginx 服务状态</span>
          </div>
          <div class="command-item">
            <code class="command-code">netstat -tlnp | grep :80</code>
            <span class="command-desc">检查 80 端口是否被监听</span>
          </div>
          <div class="command-item">
            <code class="command-code">ps aux | grep node</code>
            <span class="command-desc">查看 Node.js 进程</span>
          </div>
        </div>
      </div>
    </div>

    <div class="info-box">
      <p>
        💡 <strong>小明经验</strong>：遇到问题不要慌！按照"查看症状→分析原因→尝试解决→验证效果"的流程，
        90%的问题都能快速定位。记得记录问题，避免重复踩坑！
      </p>
    </div>
  </div>
</template>

<style scoped>
.deployment-troubleshoot {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background-color: var(--vp-c-bg-soft);
  max-height: 600px;
  overflow-y: auto;
  margin: 1rem 0;
}

.demo-header {
  padding: 1.25rem;
  background: var(--vp-c-bg);
  border-bottom: 1px solid var(--vp-c-divider);
}

.demo-header h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1.2rem;
  color: var(--vp-c-text-1);
}

.subtitle {
  margin: 0;
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
}

.intro-text {
  padding: 1rem 1.25rem;
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  line-height: 1.6;
  border-bottom: 1px solid var(--vp-c-divider);
}

.demo-content {
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.section-title {
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 1rem;
}

.symptom-selection {
  background: var(--vp-c-bg);
  border-radius: 8px;
  padding: 1rem;
  border: 1px solid var(--vp-c-divider);
}

.symptom-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 0.75rem;
}

.symptom-card {
  background: var(--vp-c-bg-soft);
  border: 2px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;
}

.symptom-card:hover {
  border-color: var(--vp-c-brand-soft);
  transform: translateY(-2px);
}

.symptom-icon {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.symptom-text {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.diagnosis-result {
  background: var(--vp-c-bg);
  border-radius: 8px;
  padding: 1rem;
  border: 1px solid var(--vp-c-divider);
}

.result-card {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 1rem;
  margin-bottom: 0.75rem;
}

.result-card.success {
  border-color: var(--vp-c-brand-delta);
  background: var(--vp-c-brand-dimm);
}

.result-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.result-icon {
  font-size: 1.2rem;
}

.result-title {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.result-content {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  line-height: 1.5;
  padding-left: 1.7rem;
}

.btn {
  padding: 0.6rem 1.25rem;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  border: none;
  transition: all 0.3s ease;
}

.btn.secondary {
  background: var(--vp-c-bg-alt);
  color: var(--vp-c-text-1);
  border: 1px solid var(--vp-c-divider);
}

.btn.secondary:hover {
  border-color: var(--vp-c-brand);
}

.troubleshoot-flow {
  background: var(--vp-c-bg);
  border-radius: 8px;
  padding: 1rem;
  border: 1px solid var(--vp-c-divider);
}

.flow-title {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 1rem;
}

.flow-steps {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.flow-step {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 0.75rem;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
}

.step-number {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: var(--vp-c-brand);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.85rem;
  font-weight: 700;
  flex-shrink: 0;
}

.step-content {
  flex: 1;
}

.step-title {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 0.15rem;
}

.step-desc {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  line-height: 1.4;
}

.commands-cheatsheet {
  background: var(--vp-c-bg);
  border-radius: 8px;
  padding: 1rem;
  border: 1px solid var(--vp-c-divider);
}

.cheatsheet-title {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 1rem;
}

.command-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.command-item {
  background: #1e1e1e;
  border-radius: 4px;
  padding: 0.6rem 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.command-code {
  font-family: var(--vp-font-family-mono);
  font-size: 0.8rem;
  color: #4ec9b0;
  background: transparent;
}

.command-desc {
  font-size: 0.75rem;
  color: var(--vp-c-text-3);
}

.info-box {
  padding: 1rem 1.25rem;
  margin: 0;
  background: var(--vp-c-bg);
  border-top: 1px solid var(--vp-c-divider);
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  line-height: 1.6;
}

.info-box p {
  margin: 0;
}

@media (max-width: 640px) {
  .symptom-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .command-item {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
