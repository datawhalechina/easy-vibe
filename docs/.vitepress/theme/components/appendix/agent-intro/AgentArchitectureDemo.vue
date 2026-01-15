<template>
  <div class="agent-architecture-demo">
    <div class="architecture-diagram">
      <div class="diagram-center">
        <div class="agent-core">🤖 Agent</div>
      </div>

      <div class="modules-container">
        <div
          v-for="(module, index) in modules"
          :key="module.name"
          class="module-card"
          :class="{ active: selectedModule === index }"
          @click="selectedModule = index"
          :style="getModulePosition(index)"
        >
          <div class="module-icon">{{ module.icon }}</div>
          <div class="module-name">{{ module.name }}</div>
          <div class="module-desc">{{ module.desc }}</div>
        </div>
      </div>

      <svg class="connections">
        <line
          v-for="(module, index) in modules"
          :key="'line-' + index"
          x1="50%"
          y1="50%"
          x2="0"
          y2="0"
          :stroke="selectedModule === index ? 'var(--vp-c-brand)' : 'var(--vp-c-divider)'"
          stroke-width="2"
          :class="{ 'line-active': selectedModule === index }"
        />
      </svg>
    </div>

    <div class="module-details">
      <div class="detail-header">
        <span class="detail-icon">{{ modules[selectedModule].icon }}</span>
        <h3>{{ modules[selectedModule].name }}</h3>
      </div>

      <div class="detail-content">
        <p>{{ modules[selectedModule].description }}</p>

        <div class="code-example">
          <div class="code-title">💻 示例代码</div>
          <pre><code>{{ modules[selectedModule].code }}</code></pre>
        </div>

        <div class="key-points">
          <div class="point-title">🎯 关键要点</div>
          <ul>
            <li v-for="point in modules[selectedModule].points" :key="point">{{ point }}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const selectedModule = ref(0)

const modules = [
  {
    name: 'Profile',
    icon: '👤',
    desc: '角色设定',
    description: 'Profile 定义了 Agent 的身份、角色、目标和约束条件。它决定了 Agent 的行为方式和能力范围。就像给演员设定角色一样，Profile 让 Agent 知道"我是谁"和"我应该做什么"。',
    code: `profile = {
  "name": "Web Researcher",
  "role": "网络搜索助手",
  "goal": "帮助用户搜索和总结网络信息",
  "constraints": [
    "只能使用公开信息",
    "必须注明信息来源",
    "不能访问付费内容"
  ],
  "style": "专业、简洁、准确"
}`,
    points: [
      '明确定义 Agent 的职责范围',
      '设定合理的目标和约束',
      '塑造 Agent 的沟通风格',
      '防止 Agent 超出权限范围'
    ]
  },
  {
    name: 'Memory',
    icon: '🧠',
    desc: '记忆系统',
    description: 'Memory 是 Agent 的"大脑"，用于存储和检索信息。它包括短期记忆（当前对话）、长期记忆（持久化知识）和工作记忆（当前任务状态）。好的记忆系统能让 Agent 从历史经验中学习。',
    code: `memory = {
  # 短期记忆：当前对话
  "short_term": [
    {"role": "user", "content": "搜索 AI 文章"},
    {"role": "assistant", "content": "已找到 5 篇"}
  ],

  # 长期记忆：持久化知识
  "long_term": {
    "user_preferences": {...},
    "previous_tasks": [...]
  },

  # 工作记忆：当前任务状态
  "working_memory": {
    "current_goal": "总结第 3 篇文章",
    "completed_steps": [1, 2],
    "pending_steps": [3, 4, 5]
  }
}`,
    points: [
      '短期记忆：存储当前对话历史',
      '长期记忆：保存跨任务的知识',
      '工作记忆：追踪当前任务进度',
      '支持信息的快速检索和更新'
    ]
  },
  {
    name: 'Planning',
    icon: '📋',
    desc: '规划模块',
    description: 'Planning 负责将复杂任务分解为可执行的步骤。它能制定计划、调整策略、评估进度。好的规划能力是 Agent 完成复杂任务的关键。',
    code: `planning = {
  "goal": "搜索并总结 AI 文章",

  "steps": [
    {
      "id": 1,
      "action": "web_search",
      "params": {"query": "AI 技术 2024"},
      "status": "completed"
    },
    {
      "id": 2,
      "action": "filter_results",
      "params": {"top_n": 5},
      "status": "in_progress"
    },
    {
      "id": 3,
      "action": "read_pages",
      "params": {"urls": [...]},
      "status": "pending"
    }
  ],

  "current_step": 2,
  "total_steps": 5
}`,
    points: [
      '将复杂任务分解为小步骤',
      '动态调整执行计划',
      '跟踪每个步骤的执行状态',
      '支持并行和串行任务执行'
    ]
  },
  {
    name: 'Action',
    icon: '🔧',
    desc: '执行模块',
    description: 'Action 模块负责执行具体的操作，包括调用工具、修改文件、发送请求等。它是 Agent 与外部环境交互的接口，将"想法"转化为"行动"。',
    code: `action = {
  "tool": "web_search",
  "input": {
    "query": "AI 技术 2024",
    "max_results": 10,
    "time_range": "last_month"
  },
  "output": {
    "status": "success",
    "results": [
      {
        "title": "...",
        "url": "...",
        "snippet": "..."
      }
    ]
  }
}

# 可用工具
tools = [
  "web_search",    # 搜索引擎
  "read_page",     # 读取网页
  "write_file",    # 写入文件
  "run_code"       # 执行代码
]`,
    points: [
      '提供丰富的工具集',
      '处理工具调用的输入输出',
      '管理工具的权限和安全',
      '支持自定义工具扩展'
    ]
  }
]

const getModulePosition = (index) => {
  const positions = [
    { top: '0', left: '50%', transform: 'translate(-50%, -50%)' },
    { top: '50%', right: '0', transform: 'translate(50%, -50%)' },
    { bottom: '0', left: '50%', transform: 'translate(-50%, 50%)' },
    { top: '50%', left: '0', transform: 'translate(-50%, -50%)' }
  ]
  return positions[index]
}
</script>

<style scoped>
.agent-architecture-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 24px;
  background: var(--vp-c-bg-soft);
  margin: 24px 0;
}

.architecture-diagram {
  position: relative;
  width: 100%;
  aspect-ratio: 4/3;
  max-width: 600px;
  margin: 0 auto 32px;
}

.diagram-center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
}

.agent-core {
  background: var(--vp-c-brand);
  color: white;
  padding: 20px 30px;
  border-radius: 50%;
  font-weight: bold;
  font-size: 1.2rem;
  box-shadow: 0 4px 20px rgba(66, 153, 225, 0.4);
  white-space: nowrap;
}

.modules-container {
  position: relative;
  width: 100%;
  height: 100%;
}

.module-card {
  position: absolute;
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 16px;
  cursor: pointer;
  transition: all 0.3s;
  min-width: 140px;
  text-align: center;
}

.module-card:hover {
  border-color: var(--vp-c-brand);
  transform: scale(1.05) !important;
}

.module-card.active {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-bg-soft);
  box-shadow: 0 4px 20px rgba(66, 153, 225, 0.3);
}

.module-icon {
  font-size: 2rem;
  margin-bottom: 8px;
}

.module-name {
  font-weight: bold;
  color: var(--vp-c-text-1);
  margin-bottom: 4px;
}

.module-desc {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
}

.connections {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

.connections line {
  transition: stroke 0.3s;
}

.line-active {
  stroke-width: 3;
  stroke-dasharray: 5, 5;
  animation: dash 1s linear infinite;
}

@keyframes dash {
  to {
    stroke-dashoffset: -10;
  }
}

.module-details {
  background: var(--vp-c-bg);
  border-radius: 12px;
  padding: 24px;
}

.detail-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 2px solid var(--vp-c-divider);
}

.detail-icon {
  font-size: 2rem;
}

.detail-header h3 {
  margin: 0;
  color: var(--vp-c-brand);
  font-size: 1.5rem;
}

.detail-content > p {
  color: var(--vp-c-text-2);
  line-height: 1.7;
  margin-bottom: 20px;
}

.code-example {
  margin-bottom: 20px;
}

.code-title {
  font-weight: bold;
  margin-bottom: 8px;
  color: var(--vp-c-text-1);
}

pre {
  background: #1e1e1e;
  border-radius: 8px;
  padding: 16px;
  overflow-x: auto;
}

code {
  font-family: 'Monaco', 'Courier New', monospace;
  font-size: 0.85rem;
  color: #d4d4d4;
  line-height: 1.6;
}

.key-points {
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  padding: 16px;
  border-left: 4px solid var(--vp-c-brand);
}

.point-title {
  font-weight: bold;
  margin-bottom: 8px;
  color: var(--vp-c-text-1);
}

.key-points ul {
  margin: 0;
  padding-left: 20px;
  list-style: none;
}

.key-points li {
  padding: 4px 0;
  color: var(--vp-c-text-2);
  position: relative;
}

.key-points li::before {
  content: '✓';
  position: absolute;
  left: -20px;
  color: var(--vp-c-brand);
  font-weight: bold;
}
</style>
