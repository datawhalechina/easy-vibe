<template>
  <div class="iac-best-practice-demo">
    <div class="demo-label">交互演示 ── IaC 最佳实践</div>

    <div class="practice-tabs">
      <button
        v-for="(tab, i) in practices"
        :key="tab.key"
        :class="['practice-tab', { active: activeTab === i }]"
        @click="activeTab = i"
      >
        <span class="tab-icon">{{ tab.icon }}</span>
        <span class="tab-name">{{ tab.name }}</span>
      </button>
    </div>

    <Transition name="fade" mode="out-in">
      <div :key="activeTab" class="practice-content">
        <div class="practice-header">
          <span class="practice-icon">{{ currentPractice.icon }}</span>
          <div>
            <div class="practice-title">{{ currentPractice.title }}</div>
            <div class="practice-subtitle">{{ currentPractice.subtitle }}</div>
          </div>
        </div>

        <div class="do-dont-grid">
          <div class="do-card">
            <div class="card-label good-label">✅ 推荐做法</div>
            <div class="card-items">
              <div v-for="(item, i) in currentPractice.dos" :key="i" class="card-item">
                {{ item }}
              </div>
            </div>
          </div>
          <div class="dont-card">
            <div class="card-label bad-label">❌ 反面模式</div>
            <div class="card-items">
              <div v-for="(item, i) in currentPractice.donts" :key="i" class="card-item">
                {{ item }}
              </div>
            </div>
          </div>
        </div>

        <div v-if="currentPractice.code" class="code-example">
          <div class="code-header">
            <span>{{ currentPractice.codeTitle }}</span>
          </div>
          <pre class="code-body"><code>{{ currentPractice.code }}</code></pre>
        </div>

        <div class="maturity-bar">
          <div class="maturity-label">实践成熟度</div>
          <div class="maturity-track">
            <div
              v-for="(level, i) in maturityLevels"
              :key="i"
              :class="['maturity-segment', { filled: i <= currentPractice.maturity }]"
            >
              <span class="maturity-text">{{ level }}</span>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const activeTab = ref(0)
const maturityLevels = ['入门', '基础', '进阶', '成熟', '卓越']

const practices = [
  {
    key: 'vcs', icon: '📂', name: '版本控制',
    title: '实践一：基础设施代码纳入版本控制',
    subtitle: '像管理应用代码一样管理基础设施代码',
    dos: [
      '所有 .tf 文件提交到 Git 仓库',
      '使用分支策略（main / dev / feature）',
      '通过 Pull Request 进行代码审查',
      '在 CI 中自动运行 terraform plan'
    ],
    donts: [
      '在本地执行 apply 后不提交代码',
      '直接在 main 分支上修改',
      '将 .tfstate 文件提交到 Git',
      '跳过 Code Review 直接部署'
    ],
    codeTitle: '.gitignore 示例',
    code: `# 忽略本地状态文件
*.tfstate
*.tfstate.backup
.terraform/

# 忽略敏感变量文件
*.tfvars
!example.tfvars`,
    maturity: 1
  },
  {
    key: 'modules', icon: '🧩', name: '模块化',
    title: '实践二：使用模块实现代码复用',
    subtitle: '避免复制粘贴，通过模块封装通用基础设施模式',
    dos: [
      '将通用模式抽取为可复用模块',
      '模块使用语义化版本号',
      '为模块编写 README 和使用示例',
      '通过 variables 暴露可配置参数'
    ],
    donts: [
      '在多个项目中复制粘贴相同代码',
      '创建过于庞大的"万能"模块',
      '模块内硬编码环境特定的值',
      '不写文档直接发布模块'
    ],
    codeTitle: '模块调用示例',
    code: `module "web_server" {
  source  = "./modules/ec2-instance"
  version = "2.1.0"

  instance_type = "t3.micro"
  environment   = "production"
  app_name      = "my-web-app"
}`,
    maturity: 2
  },
  {
    key: 'state', icon: '💾', name: '状态管理',
    title: '实践三：远程状态存储与锁定',
    subtitle: 'State 文件是 IaC 的核心，必须安全可靠地管理',
    dos: [
      '使用远程后端（S3 + DynamoDB）',
      '启用状态文件加密',
      '配置状态锁防止并发冲突',
      '按环境/项目隔离状态文件'
    ],
    donts: [
      '将 State 存储在本地文件系统',
      '多人共享同一个 State 无锁机制',
      '手动编辑 terraform.tfstate',
      '所有环境共用一个 State 文件'
    ],
    codeTitle: '远程后端配置',
    code: `terraform {
  backend "s3" {
    bucket         = "my-tf-state"
    key            = "prod/terraform.tfstate"
    region         = "us-east-1"
    encrypt        = true
    dynamodb_table = "tf-lock"
  }
}`,
    maturity: 2
  },
  {
    key: 'env', icon: '🌍', name: '环境管理',
    title: '实践四：多环境一致性管理',
    subtitle: '开发、测试、生产环境使用相同代码，仅参数不同',
    dos: [
      '使用 Workspace 或目录隔离环境',
      '通过 .tfvars 文件区分环境参数',
      '保持环境间代码结构完全一致',
      '先在 dev 验证，再推广到 prod'
    ],
    donts: [
      '为每个环境维护独立的代码副本',
      '在代码中硬编码环境名称',
      '跳过测试环境直接部署生产',
      '不同环境使用不同的模块版本'
    ],
    codeTitle: '多环境目录结构',
    code: `environments/
├── dev/
│   ├── main.tf        # 引用相同模块
│   └── dev.tfvars     # 开发环境参数
├── staging/
│   ├── main.tf
│   └── staging.tfvars
└── prod/
    ├── main.tf
    └── prod.tfvars`,
    maturity: 3
  }
]

const currentPractice = computed(() => practices[activeTab.value])
</script>

<style scoped>
.iac-best-practice-demo {
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
.practice-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-bottom: 1rem;
  justify-content: center;
}
.practice-tab {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 6px 14px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg);
  cursor: pointer;
  font-size: 0.8rem;
  transition: all 0.2s;
}
.practice-tab.active {
  background: var(--vp-c-brand);
  color: #fff;
  border-color: var(--vp-c-brand);
}
.practice-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 1rem;
}
.practice-icon { font-size: 1.5rem; }
.practice-title { font-weight: 600; font-size: 0.95rem; }
.practice-subtitle { font-size: 0.78rem; color: var(--vp-c-text-3); }

.do-dont-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.6rem;
  margin-bottom: 1rem;
}
@media (max-width: 540px) {
  .do-dont-grid { grid-template-columns: 1fr; }
}
.do-card, .dont-card {
  border-radius: 6px;
  padding: 0.7rem;
  border: 1px solid var(--vp-c-divider);
}
.do-card { background: #d1fae508; border-color: #6ee7b740; }
.dont-card { background: #fee2e208; border-color: #fca5a540; }
.card-label {
  font-size: 0.75rem;
  font-weight: 600;
  margin-bottom: 0.4rem;
}
.good-label { color: #10b981; }
.bad-label { color: #ef4444; }
.card-items { display: flex; flex-direction: column; gap: 0.25rem; }
.card-item {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  padding-left: 0.5rem;
  border-left: 2px solid var(--vp-c-divider);
}

.code-example {
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
.code-body {
  background: #1a1a2e;
  color: #e0e0e0;
  padding: 0.8rem;
  font-size: 0.73rem;
  font-family: 'Menlo', 'Consolas', monospace;
  line-height: 1.5;
  overflow-x: auto;
  margin: 0;
}

.maturity-bar { margin-top: 0.5rem; }
.maturity-label {
  font-size: 0.72rem;
  color: var(--vp-c-text-3);
  margin-bottom: 4px;
}
.maturity-track {
  display: flex;
  gap: 2px;
}
.maturity-segment {
  flex: 1;
  height: 24px;
  border-radius: 4px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.65rem;
  color: var(--vp-c-text-3);
  transition: all 0.3s;
}
.maturity-segment.filled {
  background: var(--vp-c-brand);
  color: #fff;
  border-color: var(--vp-c-brand);
}

.fade-enter-active, .fade-leave-active { transition: opacity 0.25s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
