# Claude Code 工作流最佳实践

## 前言

Claude Code 不仅仅是一个 AI 编程助手，更是一种全新的开发方式。它改变了开发者与代码、与工具、与团队的交互模式。掌握正确的工作流，可以让你的开发效率提升 10 倍，代码质量显著提高，同时减少重复性工作带来的疲惫感。

### 为什么需要专门的工作流？

传统的开发工作流是基于人类开发者设计的：阅读文档、理解代码、编写实现、手动测试、代码审查。而 AI 辅助开发需要一种全新的协作模式：

- **上下文管理**：AI 有上下文窗口限制，需要策略性地传递信息
- **任务分解**：复杂任务需要拆分成 AI 可以理解和执行的小步骤
- **验证机制**：AI 生成的代码需要系统化的验证流程
- **知识沉淀**：团队需要共享 AI 的配置和项目知识

### 本文涵盖的内容

本文将系统介绍 Claude Code 在不同场景下的最佳实践，包括：

1. **日常开发工作流** - 新功能开发、Bug 修复的标准流程
2. **代码重构工作流** - 安全、高效地进行大规模重构
3. **Code Review 工作流** - 利用 AI 提升代码审查质量
4. **团队协作配置** - 共享配置、统一规范、知识管理
5. **CI/CD 集成** - 将 Claude Code 融入自动化流程

### 核心原则

使用 Claude Code 需要建立正确的工作方式。它能力强大，但并非万能，需要合理的分工和有效的协作。

**合理的分工**

Claude 适合处理重复性工作，例如阅读代码、生成样板、查找 Bug、统一代码格式等。但架构设计、业务理解、关键决策等需要由人来把控。

**建立信任**

初次使用时，建议从简单任务开始（如变量重命名、简单函数重构），观察 Claude 的理解能力和执行效果。随着对其能力边界的了解，再逐步增加任务复杂度。

**清晰的上下文传递**

项目背景应通过 CLAUDE.md 文档提供，具体修改目标需使用 `@文件名` 明确指向，预期结果也要描述清楚。模糊的指令会导致偏离预期的输出。

**验证环节不可省略**

Claude 生成的代码需要经过测试验证、类型检查和风格审查。最终的代码质量责任仍在于开发者，AI 是辅助工具而非替代品。

## 日常开发工作流

日常开发占据了程序员大部分的工作时间。建立标准化的日常开发工作流，可以让你更高效地完成新功能开发和 Bug 修复，同时保持代码质量。

### 新功能开发流程

新功能开发是最常见的开发任务。一个完整的 AI 辅助开发流程包含以下步骤：

```
1. 理解需求 → 2. 分析现有代码 → 3. 设计实现方案
→ 4. 编写代码 → 5. 测试与调试 → 6. 代码审查 → 7. 提交代码
```

#### 快速开始

**1. 了解项目结构**

```text
@directory src/
```

让 Claude 快速浏览项目目录结构，了解：

- 代码组织方式（是否分层、模块如何划分）
- 使用的技术栈（框架、库类型）
- 现有的命名和文件组织规范

> **为什么？** 在不熟悉的项目中开发，盲目动手容易写出不符合项目风格的代码。让 Claude 先"看"一遍项目，生成的代码会更契合现有架构。

---

**2. 查找相关代码**

```text
@grep "关键词" --glob "*.ts"
```

查找与当前任务相关的现有代码：

- 是否已有类似功能可以复用
- 其他人是如何处理类似场景的
- 需要修改或关联哪些文件

> **为什么？** 避免"重复造轮子"，同时确保新代码与现有代码风格一致。

---

**3. 制定计划**

```text
使用 /plan 或直接描述需求
```

让 Claude 制定详细的实施计划：

- 涉及哪些文件的修改
- 实现的先后顺序
- 可能遇到的技术难点

> **为什么？** 复杂任务拆分成小步骤后，执行更可控，出错也更容易定位。

---

**4. 生成代码**

```text
让 Claude 根据计划生成代码框架
```

按计划逐步生成代码，从基础框架开始：

- 先生成类型定义和接口
- 再生成核心逻辑
- 最后处理边界情况和错误处理

> **为什么？** 框架先行可以确保结构合理，细节后填可以边写边验证。

---

**5. 运行测试**

```text
!npm test
```

每次代码修改后立即运行测试：

- 单元测试验证函数逻辑
- 集成测试验证模块交互
- 手动测试验证用户交互

> **为什么？** 及早发现问题，避免错误累积到最后难以定位。

---

**6. 代码审查**

```text
使用 /review 或让 Claude 审查变更
```

让 Claude 从多个维度审查代码：

- 安全问题（SQL 注入、XSS 等）
- 性能问题（N+1 查询、内存泄漏等）
- 代码风格（是否符合项目规范）

> **为什么？** AI 能发现人眼容易遗漏的问题，提高代码质量。

---

**7. 提交代码**

```text
/commit
```

生成符合规范的提交信息：

- 自动分析代码变更
- 生成 conventional commit 格式的提交信息
- 包含变更摘要和关键细节

> **为什么？** 清晰的提交信息让代码历史更易读，后续回溯问题更方便。

### Bug 修复流程

Bug 修复需要快速定位问题、理解根因、实施修复并验证。

**标准流程：**

1. **收集错误信息** - 错误消息、复现步骤、环境信息
2. **定位问题代码** - 搜索相关代码、分析调用链
3. **分析根因** - 理解为什么会出错、评估影响范围
4. **实施修复** - 编写修复代码、添加回归测试
5. **提交修复** - 生成提交信息、记录 Bug 原因

**实用命令：**

```bash
# 搜索错误信息
@grep "错误消息" --glob "*.ts"

# 查看函数调用链
@grep "functionName" --context 5

# 运行相关测试
!npm test -- 文件名.test.ts

# 查看最近改动
!git diff
```

### 日常开发 Checklist

| 阶段 | 检查项 | 操作命令/方法 |
|-----|--------|--------------|
| **开始前** | 了解项目结构 | `@directory src/` |
| | 查看相关代码 | `@grep "keyword" --glob "*.ts"` |
| **编码中** | 制定实施计划 | `/plan` |
| | 生成代码框架 | 直接描述需求 |
| **测试阶段** | 运行单元测试 | `!npm test` |
| | 检查测试覆盖率 | `!npm run test:coverage` |
| **审查阶段** | 自动代码审查 | `/review` |
| | 类型检查 | `!npm run typecheck` |
| **提交阶段** | 生成提交信息 | `/commit` |

### 常见陷阱

**陷阱 1：一次性给太多任务**

```
❌ "帮我实现一个完整的电商系统"
✅ "先实现用户注册功能"
```

**陷阱 2：不提供足够的上下文**

```
❌ "修复这个 bug"
✅ "登录功能报错'Invalid token'，错误在 src/middleware/auth.ts"
```

**陷阱 3：不验证 AI 生成的代码**

```
❌ 直接接受所有修改
✅ 每次修改后运行测试，手动验证关键功能
```

## 代码重构工作流

重构就是"在不改变功能的前提下，改善代码结构"。听起来简单，但实际操作中很容易出问题。

### 重构前：先看清楚再动手

动手之前，先搞清楚两件事：要改哪些文件？这些文件被谁引用？

```bash
# 找出需要重构的文件
@grep "旧模式代码" --glob "*.ts"

# 看看这些文件被哪些地方引用
@grep "import.*ModuleName" --glob "*.ts"
```

### 创建安全网

重构就像走钢丝，需要安全网。

```bash
# 第一步：创建新分支，别在主分支上搞
!git checkout -b refactor/描述你的重构

# 第二步：确认现有测试都能通过
!npm test
```

如果测试本来就不过，先修测试再重构。否则你根本不知道重构是不是搞坏了东西。

### 自动验证配置

让 Claude 每次改代码后自动跑测试，省心又安全：

::: details 点击查看配置
```json
// .claude/settings.json
{
  "hooks": {
    "afterEdit": ["npm run test:related"],
    "beforeCommit": ["npm run test"]
  }
}
```
:::

这样配置后，每次 Claude 修改代码都会自动运行测试，失败了会提醒你。

### 重构的核心原则

记住三句话：

1. **小步走** - 别想着一次改完，改一点验证一点
2. **有测试才动** - 没测试的代码先补测试，再重构
3. **重构别改功能** - 只改结构，不改行为。想优化性能？另开一个 PR

### 重构检查清单

每改完一批代码，跑一遍这些检查：

| 检查项 | 命令 | 通过标准 |
|--------|------|----------|
| 类型检查 | `npm run type-check` | 无类型错误 |
| 相关测试 | `npm run test:related` | 相关测试通过 |
| 全部测试 | `npm test` | 所有测试通过 |
| 代码风格 | `npm run lint` | 无 lint 错误 |
| 构建测试 | `npm run build` | 构建成功 |

只要有一项不过，别继续改，先修复。

## Code Review 工作流

代码审查就是让同事检查你的代码，帮你发现问题和改进点。但这事儿挺累人的——看代码费眼，还容易漏掉问题。

Claude 可以帮你做第一轮审查，把明显的问题先筛出来，人只要关注重要的东西就行。

### 审查要看什么？

按优先级排个序：

| 优先级 | 检查项 | 说明 |
| :--- | :--- | :--- |
| 🔴 最高 | 安全问题 | SQL 注入、密码硬编码、权限漏洞 |
| 🟡 高 | 性能问题 | N+1 查询、内存泄漏 |
| 🟢 中 | 代码质量 | 命名不规范、重复代码 |
| ⚪ 低 | 风格问题 | 缺少空格、注释不完整 |

### 提交 PR 前：先自己审一遍

```text
@file src/你改的文件.ts 审查这段代码，看看有没有安全问题
```

让 Claude 帮你检查：

- 有没有安全漏洞
- 有没有性能问题
- 逻辑有没有明显错误

### 写好 PR 描述

好的 PR 描述能让审查者快速理解你在做什么。

::: details 标准模板

```markdown
## 做了什么
用一句话说清楚改了啥

## 为什么改
说明改动的背景和原因

## 改了哪些地方
- 改动点 1
- 改动点 2

## 测试情况
- [ ] 单元测试通过
- [ ] 手动验证通过

## 注意事项
如果会影响其他功能，在这里说明
```

:::

### 审查别人的 PR

用 Claude 帮你快速了解 PR 的内容：

```text
帮我审查这个 PR，重点检查安全问题和性能问题
```

Claude 会列出发现的问题，你再重点看这些问题是否属实。

### 本地预提交检查

在提交前自动跑一遍快速检查：

::: details 点击查看配置

```bash
#!/bin/bash
# .git/hooks/pre-commit

echo "检查代码..."

claude "快速检查暂存的代码：
1. 有没有明显的安全问题
2. 有没有明显的 bug" --strict || exit 1
```

:::

配置后，每次提交都会自动检查，发现问题会阻止提交。

## 团队协作配置共享

在团队中使用 Claude Code，需要建立共享的配置和知识库，确保所有成员都能获得一致的 AI 辅助体验。

### 项目级配置

将 Claude Code 配置提交到仓库，实现团队共享：

**配置结构：**

```text
.claude/
├── settings.json              # 团队共享配置
├── settings.local.json        # 个人本地配置（不提交）
├── CLAUDE.md                  # 项目主文档
├── .claudeignore              # 忽略文件配置
└── memory/                    # 项目记忆
    ├── project-context.md
    ├── conventions.md
    ├── architecture.md
    └── common-pitfalls.md
```

**团队共享配置示例：**

::: details 点击查看 settings.json

```json
{
  "hooks": {
    "beforeEdit": ["npm run type-check"],
    "afterEdit": ["npm run lint"],
    "beforeCommit": ["npm run test"]
  },
  "permissions": {
    "allow": [
      "Bash(git status)",
      "Bash(git log:*)",
      "Bash(npm test:*)",
      "Edit(src/**/*.{ts,tsx})"
    ],
    "ask": [
      "Bash(git commit:*)",
      "Bash(git push:*)"
    ]
  }
}
```

:::

### 项目记忆系统

**记忆系统结构：**

- **project-context.md** - 项目整体上下文
- **conventions.md** - 代码规范和约定
- **architecture.md** - 架构设计说明
- **common-pitfalls.md** - 常见陷阱和解决方案

### 团队协作最佳实践

| 实践 | 说明 | 实施方法 |
| :--- | :--- | :--- |
| **共享配置** | 将 .claude/ 加入版本控制 | `git add .claude/` |
| **文档规范** | 在 memory/ 中记录项目约定 | 每次架构决策更新文档 |
| **代码审查** | 用 Claude 辅助 Code Review | 提交前运行审查 |
| **统一 Hooks** | 团队使用相同的 pre-commit hooks | 配置在 settings.json |
| **知识同步** | 定期更新项目记忆 | 每迭代更新一次 |

## CI/CD 集成

将 Claude Code 集成到 CI/CD 流程中，可以实现自动化的代码审查、测试生成、安全检查等。

### GitHub Actions 集成

#### 场景 1：PR 自动审查

::: details 点击查看配置

```yaml
# .github/workflows/claude-review.yml
name: Claude Code Review

on:
  pull_request:
    types: [opened, synchronize]

jobs:
  claude-review:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Install Claude Code
        run: npm install -g @anthropic-ai/claude-code

      - name: Run Claude Review
        env:
          ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}
        run: |
          CHANGED_FILES=$(git diff --name-only origin/${{ github.base_ref }}...HEAD | grep -E '\.(ts|tsx|js|jsx)$' || true)

          if [ -z "$CHANGED_FILES" ]; then
            echo "No relevant files changed"
            exit 0
          fi

          claude "审查以下文件的变更：
          $CHANGED_FILES

          检查维度：
          1. 安全漏洞
          2. 性能问题
          3. 代码质量

          输出格式：
          - 🔴 严重问题（阻塞）
          - 🟡 警告（建议修复）
          - 🟢 建议（可选）" \
            --output pr-review.md

      - name: Comment PR
        uses: actions/github-script@v7
        with:
          script: |
            const fs = require('fs');
            const review = fs.readFileSync('pr-review.md', 'utf8');

            const hasBlockingIssues = review.includes('🔴');

            const header = hasBlockingIssues
              ? '## ❌ Code Review 未通过\n\n'
              : '## ✅ Code Review 通过\n\n';

            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: header + review
            });

            if (hasBlockingIssues) {
              core.setFailed('发现严重问题');
            }
```

:::

#### 场景 2：部署前安全检查

::: details 点击查看配置

```yaml
# .github/workflows/pre-deploy-security.yml
name: Pre-deploy Security Check

on:
  push:
    branches: [main]

jobs:
  security-check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Install Claude Code
        run: npm install -g @anthropic-ai/claude-code

      - name: Security Scan
        env:
          ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}
        run: |
          claude "对代码进行全面的安全扫描：

          检查以下安全问题：
          1. SQL 注入漏洞
          2. XSS（跨站脚本攻击）
          3. CSRF（跨站请求伪造）
          4. 敏感信息泄露
          5. 不安全的依赖项

          输出格式：
          - 🔴 高危漏洞（立即修复）
          - 🟡 中危漏洞（建议修复）
          - 🟢 低危漏洞（可选修复）" \
            --output security-report.md

      - name: Check for critical issues
        run: |
          if grep -q "🔴" security-report.md; then
            echo "发现高危安全漏洞！"
            cat security-report.md
            exit 1
          fi
```

:::

### 本地 Pre-commit Hook

::: details 点击查看配置

```bash
#!/bin/bash
# .git/hooks/pre-commit

set -e

echo "🔍 运行 Claude Code 预提交检查..."

STAGED_FILES=$(git diff --cached --name-only --diff-filter=ACM | grep -E '\.(ts|tsx|js|jsx)$' || true)

if [ -z "$STAGED_FILES" ]; then
    echo "✅ 没有需要检查的代码文件"
    exit 0
fi

claude "对以下文件进行快速检查：
$STAGED_FILES

检查项目：
1. 明显的语法错误
2. 类型错误
3. 明显的安全问题
4. 代码风格问题

如果发现严重问题，返回非零退出码。" \
    --strict || {
        echo "❌ 预提交检查失败"
        exit 1
    }

echo "✅ 预提交检查通过！"
```

:::

### CI/CD 集成最佳实践

**分层检查策略：**

```text
本地开发 → Pre-commit → PR 审查 → 合并前检查 → 部署前检查
    ↓          ↓            ↓              ↓              ↓
 快速检查    基础检查      深度审查       全面检查        安全检查
 (1-2秒)    (10-30秒)     (1-2分钟)      (3-5分钟)       (5-10分钟)
```

**成本控制：** 只在必要时运行 Claude 检查，通过条件判断避免不必要的 API 调用。

## 工作流速查表

| 场景 | 命令/操作 |
| :--- | :--- |
| **开始新功能** | `@directory src/` 了解项目结构 |
| **查找代码** | `@grep "functionName"` |
| **理解代码** | 直接描述代码文件让 Claude 解释 |
| **重构代码** | 描述重构需求，让 Claude 制定计划 |
| **修复 Bug** | 提供错误信息和复现步骤 |
| **代码审查** | 让 Claude 审查指定文件或目录 |
| **生成测试** | "为 xxx 文件生成单元测试" |
| **提交代码** | `/commit` |

## 总结

掌握这些工作流后，你会发现：

1. **日常开发**：用 @语法快速理解代码，让 Claude 处理重复工作
2. **代码重构**：让 Claude 制定计划，逐步验证
3. **Code Review**：自动发现潜在问题，提高代码质量
4. **团队协作**：共享配置和记忆，保持团队一致性
5. **CI/CD**：将 Claude 集成到自动化流程中

**核心原则：**
- 让 Claude 做它擅长的事：理解代码、生成代码、发现问题
- 你做决策：审查结果、做架构选择、把控方向
- 逐步信任：从简单任务开始，建立对 Claude 的信任
- 持续优化：根据项目特点调整工作流
