<template>
  <div class="iac-tool-comparison-demo">
    <div class="demo-label">交互演示 ── 主流 IaC 工具对比</div>

    <div class="tool-selector">
      <span class="selector-hint">选择要对比的工具（至少选 2 个）：</span>
      <div class="tool-chips">
        <button
          v-for="tool in tools"
          :key="tool.name"
          :class="['tool-chip', { selected: selectedTools.includes(tool.name) }]"
          :style="selectedTools.includes(tool.name) ? { background: tool.color, borderColor: tool.color, color: '#fff' } : {}"
          @click="toggleTool(tool.name)"
        >
          {{ tool.icon }} {{ tool.name }}
        </button>
      </div>
    </div>

    <div v-if="selectedTools.length >= 2" class="comparison-grid">
      <table>
        <thead>
          <tr>
            <th class="feature-col">特性</th>
            <th v-for="name in selectedTools" :key="name" class="tool-col">
              <span class="tool-header-icon">{{ getToolByName(name).icon }}</span>
              <span>{{ name }}</span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="feature in features" :key="feature.key">
            <td class="feature-cell">{{ feature.label }}</td>
            <td v-for="name in selectedTools" :key="name" class="value-cell">
              <span :class="getCellClass(name, feature.key)">
                {{ getToolByName(name).features[feature.key] }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-else class="empty-hint">
      请至少选择 2 个工具进行对比
    </div>

    <Transition name="fade">
      <div v-if="selectedDetail" class="detail-card">
        <div class="detail-header">
          <span class="detail-icon">{{ selectedDetail.icon }}</span>
          <span class="detail-name">{{ selectedDetail.name }}</span>
          <button class="close-btn" @click="detailName = ''">✕</button>
        </div>
        <p class="detail-desc">{{ selectedDetail.desc }}</p>
        <div class="detail-code">
          <div class="code-label">示例代码片段：</div>
          <pre class="code-block"><code>{{ selectedDetail.example }}</code></pre>
        </div>
      </div>
    </Transition>

    <div class="detail-hint" v-if="selectedTools.length >= 2 && !detailName">
      点击下方工具名称查看详细介绍和代码示例
    </div>
    <div class="tool-detail-btns" v-if="selectedTools.length >= 2">
      <button
        v-for="name in selectedTools"
        :key="name"
        :class="['detail-btn', { active: detailName === name }]"
        @click="detailName = detailName === name ? '' : name"
      >
        {{ getToolByName(name).icon }} {{ name }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const selectedTools = ref(['Terraform', 'CloudFormation'])
const detailName = ref('')

const selectedDetail = computed(() => {
  if (!detailName.value) return null
  return tools.find(t => t.name === detailName.value)
})

const features = [
  { key: 'vendor', label: '厂商' },
  { key: 'language', label: '配置语言' },
  { key: 'style', label: '声明式/命令式' },
  { key: 'multiCloud', label: '多云支持' },
  { key: 'stateManagement', label: '状态管理' },
  { key: 'learning', label: '学习曲线' },
  { key: 'community', label: '社区生态' },
  { key: 'bestFor', label: '最佳场景' }
]

const tools = [
  {
    name: 'Terraform',
    icon: '🟣',
    color: '#7c3aed',
    features: {
      vendor: 'HashiCorp',
      language: 'HCL',
      style: '声明式',
      multiCloud: '原生多云',
      stateManagement: 'State 文件',
      learning: '中等',
      community: '非常活跃',
      bestFor: '多云/混合云'
    },
    desc: 'Terraform 是目前最流行的开源 IaC 工具，由 HashiCorp 开发。它使用自研的 HCL 语言，通过 Provider 机制支持几乎所有主流云平台。',
    example: `resource "aws_s3_bucket" "data" {
  bucket = "my-data-bucket"
  tags   = { Env = "prod" }
}

resource "aws_instance" "web" {
  ami           = "ami-0c55b159"
  instance_type = "t3.micro"
}`
  },
  {
    name: 'CloudFormation',
    icon: '🟠',
    color: '#ea580c',
    features: {
      vendor: 'AWS',
      language: 'YAML / JSON',
      style: '声明式',
      multiCloud: '仅 AWS',
      stateManagement: 'AWS 托管',
      learning: '中等偏高',
      community: 'AWS 生态',
      bestFor: '纯 AWS 环境'
    },
    desc: 'CloudFormation 是 AWS 原生的 IaC 服务，与 AWS 服务深度集成。状态由 AWS 自动管理，无需额外维护 State 文件。',
    example: `Resources:
  WebServer:
    Type: AWS::EC2::Instance
    Properties:
      ImageId: ami-0c55b159
      InstanceType: t3.micro
      Tags:
        - Key: Name
          Value: web-server`
  },
  {
    name: 'Pulumi',
    icon: '🔵',
    color: '#2563eb',
    features: {
      vendor: 'Pulumi',
      language: 'TypeScript/Python/Go',
      style: '命令式 + 声明式',
      multiCloud: '原生多云',
      stateManagement: 'Pulumi Cloud / 自管',
      learning: '低（熟悉编程语言）',
      community: '快速增长',
      bestFor: '开发者友好场景'
    },
    desc: 'Pulumi 允许使用真正的编程语言（TypeScript、Python、Go 等）来定义基础设施，对开发者非常友好，支持条件判断、循环等编程特性。',
    example: `import * as aws from "@pulumi/aws"

const bucket = new aws.s3.Bucket("data", {
  tags: { Env: "prod" }
})

const server = new aws.ec2.Instance("web", {
  ami: "ami-0c55b159",
  instanceType: "t3.micro",
})`
  },
  {
    name: 'Ansible',
    icon: '🔴',
    color: '#dc2626',
    features: {
      vendor: 'Red Hat',
      language: 'YAML (Playbook)',
      style: '命令式',
      multiCloud: '通过模块支持',
      stateManagement: '无状态（幂等）',
      learning: '低',
      community: '非常活跃',
      bestFor: '配置管理 + 编排'
    },
    desc: 'Ansible 是一个无代理的自动化工具，擅长配置管理和应用部署。它通过 SSH 连接目标机器执行任务，无需安装客户端。',
    example: `- name: 部署 Web 服务器
  hosts: webservers
  tasks:
    - name: 安装 Nginx
      apt:
        name: nginx
        state: present
    - name: 启动服务
      service:
        name: nginx
        state: started`
  }
]

function getToolByName(name) {
  return tools.find(t => t.name === name)
}

function toggleTool(name) {
  const idx = selectedTools.value.indexOf(name)
  if (idx >= 0) {
    if (selectedTools.value.length > 2) {
      selectedTools.value.splice(idx, 1)
    }
  } else {
    selectedTools.value.push(name)
  }
}

function getCellClass(toolName, featureKey) {
  const val = getToolByName(toolName).features[featureKey]
  if (featureKey === 'multiCloud') {
    if (val.includes('原生多云')) return 'cell-good'
    if (val.includes('仅')) return 'cell-warn'
    return ''
  }
  if (featureKey === 'learning') {
    if (val === '低') return 'cell-good'
    if (val.includes('高')) return 'cell-warn'
    return ''
  }
  return ''
}
</script>

<style scoped>
.iac-tool-comparison-demo {
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
.selector-hint {
  font-size: 0.78rem;
  color: var(--vp-c-text-3);
  display: block;
  margin-bottom: 0.5rem;
}
.tool-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-bottom: 1rem;
}
.tool-chip {
  padding: 5px 14px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 20px;
  background: var(--vp-c-bg);
  cursor: pointer;
  font-size: 0.8rem;
  transition: all 0.2s;
}
.tool-chip:hover { transform: scale(1.05); }
.comparison-grid { overflow-x: auto; margin-bottom: 1rem; }
.comparison-grid table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.78rem;
}
.comparison-grid th,
.comparison-grid td {
  padding: 8px 10px;
  border: 1px solid var(--vp-c-divider);
  text-align: center;
}
.comparison-grid th {
  background: var(--vp-c-bg-alt);
  font-weight: 600;
}
.feature-col { text-align: left; min-width: 80px; }
.feature-cell { font-weight: 600; text-align: left; }
.tool-header-icon { margin-right: 4px; }
.cell-good { color: #10b981; font-weight: 600; }
.cell-warn { color: #f59e0b; }
.empty-hint {
  text-align: center;
  padding: 2rem;
  color: var(--vp-c-text-3);
  font-size: 0.85rem;
}
.detail-hint {
  text-align: center;
  font-size: 0.75rem;
  color: var(--vp-c-text-3);
  margin-bottom: 0.5rem;
}
.tool-detail-btns {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}
.detail-btn {
  padding: 4px 12px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg);
  cursor: pointer;
  font-size: 0.78rem;
  transition: all 0.2s;
}
.detail-btn.active {
  background: var(--vp-c-brand);
  color: #fff;
  border-color: var(--vp-c-brand);
}
.detail-card {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 1rem;
  background: var(--vp-c-bg);
  margin-top: 0.5rem;
}
.detail-header {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 0.5rem;
}
.detail-icon { font-size: 1.2rem; }
.detail-name { font-weight: 600; font-size: 1rem; flex: 1; }
.close-btn {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  color: var(--vp-c-text-3);
}
.detail-desc {
  font-size: 0.82rem;
  color: var(--vp-c-text-2);
  line-height: 1.6;
  margin-bottom: 0.8rem;
}
.code-label {
  font-size: 0.72rem;
  color: var(--vp-c-text-3);
  margin-bottom: 4px;
}
.code-block {
  background: #1a1a2e;
  color: #e0e0e0;
  padding: 0.8rem;
  border-radius: 6px;
  font-size: 0.73rem;
  font-family: 'Menlo', 'Consolas', monospace;
  line-height: 1.5;
  overflow-x: auto;
  margin: 0;
}
.fade-enter-active, .fade-leave-active { transition: opacity 0.25s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
