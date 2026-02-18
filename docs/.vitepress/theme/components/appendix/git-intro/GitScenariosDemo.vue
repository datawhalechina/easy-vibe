<template>
  <div class="git-scenarios-demo">
    <div class="header">
      <div class="title">
        <div class="h">
          常见场景：直接照抄的 Git 命令
        </div>
        <div class="sub">
          选一个场景，按步骤执行；每一步都解释“为什么这么做”。
        </div>
      </div>

      <div class="actions">
        <button
          class="btn"
          :disabled="activeStepIndex === 0"
          @click="prevStep"
        >
          上一步
        </button>
        <button
          class="btn primary"
          :disabled="activeStepIndex >= activeScenario.steps.length - 1"
          @click="nextStep"
        >
          下一步
        </button>
        <button
          class="btn"
          @click="resetSteps"
        >
          重置
        </button>
      </div>
    </div>

    <div class="tabs">
      <button
        v-for="s in scenarios"
        :key="s.id"
        class="tab"
        :class="{ active: activeScenarioId === s.id }"
        @click="selectScenario(s.id)"
      >
        {{ s.title }}
        <span class="tag">{{ s.level }}</span>
      </button>
    </div>

    <div class="content">
      <div class="scenario-meta">
        <div class="scenario-desc">
          {{ activeScenario.desc }}
        </div>
        <div
          v-if="activeScenario.note"
          class="scenario-note"
        >
          {{ activeScenario.note }}
        </div>
      </div>

      <div class="step-card">
        <div class="step-top">
          <div class="step-title">
            Step {{ activeStepIndex + 1 }} / {{ activeScenario.steps.length }}
            <span class="step-name">{{ activeStep.title }}</span>
          </div>
          <button
            class="copy-btn"
            @click="copy(activeStep.cmd)"
          >
            {{ copied ? '已复制' : '复制命令' }}
          </button>
        </div>

        <div class="cmd">
          <code>{{ activeStep.cmd }}</code>
        </div>

        <div
          v-if="activeStep.output"
          class="output"
        >
          <div class="label">
            你通常会看到：
          </div>
          <pre><code>{{ activeStep.output }}</code></pre>
        </div>

        <div class="why">
          <div class="label">
            为什么：
          </div>
          <div class="text">
            {{ activeStep.why }}
          </div>
        </div>

        <div
          v-if="activeStep.warn"
          class="warn"
        >
          <div class="label">
            注意：
          </div>
          <div class="text">
            {{ activeStep.warn }}
          </div>
        </div>
      </div>

      <div class="tips">
        <div class="tips-title">
          最容易踩坑的 3 件事
        </div>
        <ul>
          <li>
            <strong>先看状态再动手：</strong>每次操作前先跑一次
            <code>git status</code>。
          </li>
          <li>
            <strong>只提交“你想提交的东西”：</strong>用
            <code>git add path</code> 精准暂存，别习惯性
            <code>git add .</code>。
          </li>
          <li>
            <strong>撤销要分层：</strong>没进暂存 / 进了暂存 / 已经
            commit，命令完全不同。
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

const scenarios = [
  {
    id: 'daily',
    title: '日常提交',
    level: '必会',
    desc: '在本地改代码并提交；这是你 90% 的 Git 使用场景。',
    steps: [
      {
        title: '看当前状态',
        cmd: 'git status',
        output:
          'On branch main\nChanges not staged for commit:\n  modified:   src/app.js',
        why: '先确认“你在哪个分支 + 改了哪些文件”，避免在错误分支提交。'
      },
      {
        title: '暂存你要提交的文件',
        cmd: 'git add src/app.js',
        output:
          'On branch main\nChanges to be committed:\n  modified:   src/app.js',
        why: '把“这次提交要包含的改动”放进暂存区，确保提交内容可控。'
      },
      {
        title: '提交并写清楚信息',
        cmd: 'git commit -m \"fix: handle empty input\"',
        output:
          '[main 1a2b3c4] fix: handle empty input\n 1 file changed, 3 insertions(+)',
        why: 'commit message 要能让未来的你/同事一眼看懂“改了什么 + 为什么”。'
      }
    ]
  },
  {
    id: 'new-project',
    title: '新项目推远程',
    level: '常用',
    desc: '把本地新项目推到 GitHub/GitLab（remote 一般叫 origin）。',
    note: '前提：你已经在远端创建了空仓库（不要勾选 README/License，以免产生冲突）。',
    steps: [
      {
        title: '初始化仓库',
        cmd: 'git init',
        output: 'Initialized empty Git repository in .../.git/',
        why: '让当前目录变成一个 Git 仓库。'
      },
      {
        title: '第一次提交',
        cmd: 'git add . && git commit -m \"chore: initial commit\"',
        output: '[main ...] chore: initial commit',
        why: '没有提交就无法 push；先把“初始状态”存档。'
      },
      {
        title: '绑定远程地址',
        cmd: 'git remote add origin <REMOTE_URL>',
        output: '',
        why: '告诉 Git 你的云端仓库在哪里（origin 只是一个名字）。'
      },
      {
        title: '推送并建立追踪关系',
        cmd: 'git push -u origin main',
        output: 'Branch \"main\" set up to track \"origin/main\".',
        why: '加 -u 后，以后可以直接用 git push / git pull。'
      }
    ]
  },
  {
    id: 'branch-pr',
    title: '开分支做功能',
    level: '必会',
    desc: '在 feature 分支开发，推送后提 PR；这是团队协作的基本功。',
    steps: [
      {
        title: '更新主分支',
        cmd: 'git switch main && git pull',
        output: '',
        why: '在开新分支前先把 main 更新到最新，减少未来合并冲突。'
      },
      {
        title: '创建并切到 feature 分支',
        cmd: 'git switch -c feat/login-form',
        output: "Switched to a new branch 'feat/login-form'",
        why: '把改动隔离在分支里，主分支保持可随时发布。'
      },
      {
        title: '提交并推送分支',
        cmd: 'git push -u origin feat/login-form',
        output: '',
        why: '推到远端后，才能在 GitHub/GitLab 上发起 PR/MR。'
      }
    ]
  },
  {
    id: 'undo',
    title: '撤销/回滚',
    level: '救命',
    desc: '写错了别慌：先判断“改动在哪一层”。',
    steps: [
      {
        title: '未 add：丢掉工作区改动',
        cmd: 'git restore <file>',
        output: '',
        why: '只撤销工作区的修改，不影响暂存区和提交历史。',
        warn: '会丢弃未提交的改动；不确定时先备份或用 stash。'
      },
      {
        title: '已 add：撤回暂存',
        cmd: 'git restore --staged <file>',
        output: '',
        why: '把文件从暂存区撤回到工作区，便于重新选择提交内容。'
      },
      {
        title: '已 commit：推荐用 revert',
        cmd: 'git revert <commit>',
        output: '',
        why: 'revert 会生成一个“反向提交”，对协作更安全（不会改写历史）。',
        warn: '不要在共享分支随意 reset --hard（会让别人同步困难）。'
      }
    ]
  },
  {
    id: 'conflict',
    title: '解决冲突',
    level: '常见',
    desc: '多人改同一段代码时，Git 需要你手动选择。',
    steps: [
      {
        title: '合并/拉取触发冲突',
        cmd: 'git merge <branch>',
        output: 'CONFLICT (content): Merge conflict in src/app.js',
        why: 'Git 无法自动决定保留哪一边的改动。'
      },
      {
        title: '打开冲突文件并解决标记',
        cmd: 'git status',
        output:
          'Unmerged paths:\n  both modified:   src/app.js\n\nfix conflicts and run \"git commit\"',
        why: '用 status 定位冲突文件，然后打开文件删掉 <<<<<<</=======/>>>>>>> 标记。'
      },
      {
        title: '标记冲突已解决并提交',
        cmd: 'git add src/app.js && git commit',
        output: '',
        why: 'add 表示“我已解决冲突”；commit 记录一次合并结果。'
      }
    ]
  }
]

const activeScenarioId = ref(scenarios[0].id)
const activeStepIndex = ref(0)
const copied = ref(false)

const activeScenario = computed(
  () => scenarios.find((s) => s.id === activeScenarioId.value) || scenarios[0]
)

const activeStep = computed(
  () => activeScenario.value.steps[activeStepIndex.value]
)

const resetSteps = () => {
  activeStepIndex.value = 0
}

const selectScenario = (id) => {
  activeScenarioId.value = id
  resetSteps()
}

const nextStep = () => {
  activeStepIndex.value = Math.min(
    activeScenario.value.steps.length - 1,
    activeStepIndex.value + 1
  )
}

const prevStep = () => {
  activeStepIndex.value = Math.max(0, activeStepIndex.value - 1)
}

const copy = async (text) => {
  try {
    await navigator.clipboard.writeText(text)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 800)
  } catch {
    copied.value = false
  }
}
</script>

<style scoped>
.git-scenarios-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg-soft);
  padding: 1.25rem;
  margin: 0.5rem 0;
}

.header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 0.75rem;
}

.title .h {
  font-weight: 700;
  font-size: 1rem;
  color: var(--vp-c-text-1);
}

.title .sub {
  margin-top: 0.25rem;
  color: var(--vp-c-text-2);
  font-size: 0.875rem;
}

.actions {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  justify-content: flex-end;
}

.btn {
  padding: 0.45rem 0.75rem;
  border-radius: 6px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 600;
}

.btn.primary {
  background: var(--vp-c-brand);
  border-color: var(--vp-c-brand);
  color: var(--vp-c-bg);
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin: 0.75rem 0 1rem;
}

.tab {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  border-radius: 999px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  cursor: pointer;
  font-size: 0.875rem;
}

.tab.active {
  border-color: rgba(var(--vp-c-brand-rgb), 0.35);
  box-shadow: 0 0 0 3px rgba(var(--vp-c-brand-rgb), 0.12);
}

.tag {
  font-size: 0.75rem;
  padding: 0.15rem 0.5rem;
  border-radius: 999px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-2);
}

.scenario-meta {
  margin-bottom: 0.75rem;
}

.scenario-desc {
  color: var(--vp-c-text-1);
  line-height: 1.6;
}

.scenario-note {
  margin-top: 0.5rem;
  padding: 0.75rem;
  border-radius: 6px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  color: var(--vp-c-text-2);
}

.step-card {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 0.75rem;
}

.step-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
}

.step-title {
  font-weight: 700;
  color: var(--vp-c-text-1);
}

.step-name {
  margin-left: 0.5rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
}

.copy-btn {
  padding: 0.35rem 0.65rem;
  border-radius: 6px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  cursor: pointer;
  font-size: 0.875rem;
}

.cmd {
  font-family: var(--vp-font-family-mono);
  background: var(--vp-c-bg-alt);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 0.75rem;
  overflow-x: auto;
}

.cmd code {
  font-size: 0.9rem;
}

.label {
  font-size: 0.875rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
  margin-bottom: 0.35rem;
}

.output {
  margin-top: 0.75rem;
}

.output pre {
  margin: 0;
  padding: 0.75rem;
  border-radius: 6px;
  background: var(--vp-c-bg-alt);
  border: 1px solid var(--vp-c-divider);
  overflow-x: auto;
}

.why,
.warn {
  margin-top: 0.75rem;
}

.why .text {
  color: var(--vp-c-text-2);
  line-height: 1.7;
}

.warn {
  padding: 0.75rem;
  border-radius: 6px;
  border: 1px solid rgba(var(--vp-c-brand-rgb), 0.18);
  background: rgba(var(--vp-c-brand-rgb), 0.06);
}

.warn .text {
  color: var(--vp-c-text-2);
  line-height: 1.7;
}

.tips {
  margin-top: 1rem;
  padding: 0.75rem;
  border-radius: 6px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
}

.tips-title {
  font-weight: 700;
  color: var(--vp-c-text-1);
  margin-bottom: 0.5rem;
}

.tips ul {
  margin: 0;
  padding-left: 1.1rem;
  color: var(--vp-c-text-2);
}

@media (max-width: 720px) {
  .header {
    flex-direction: column;
    align-items: stretch;
  }
  .actions {
    justify-content: flex-start;
  }
}
</style>
