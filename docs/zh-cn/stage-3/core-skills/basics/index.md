# Claude Code 快速上手核心指南

Claude Code 是 Anthropic 官方出品的 AI 原生编码工具，它将大型语言模型的能力直接集成到终端中，让你可以用自然语言与 AI 协作完成编程任务。不同于传统的代码补全工具，Claude Code 能够理解整个项目的上下文，执行复杂的开发任务，从代码生成到重构、从调试到文档编写，它都能胜任。

本章将带你快速掌握 Claude Code 的核心用法，包括安装配置、基础操作、实用技巧和常用指令。无论你是第一次接触 AI 编程工具，还是想更高效地使用 Claude Code，这里都有你需要的知识。

---

## 快速安装

Claude Code 基于 Node.js 构建，因此安装前请确保你的系统已安装 Node.js 18 或更高版本。安装过程非常简单，通常只需要几分钟。

### 为什么需要 Claude Code

在传统的开发流程中，开发者需要在编辑器、终端、浏览器和文档之间频繁切换。Claude Code 将这些工作流整合到一个统一的界面中：你可以在同一个终端窗口里编写代码、运行测试、查看文档、甚至与团队成员协作。更重要的是，它能理解你的项目结构，记住你的编码习惯，真正成为你的编程助手。

### 方法一：手动安装

手动安装适合喜欢掌控每个步骤的开发者，也让你更清楚工具的组成部分。

```bash
# 全局安装 Claude Code CLI
# 使用 -g 参数将命令安装到全局，这样在任何目录都能使用
npm install -g @anthropic-ai/claude-code

# 验证安装是否成功
# 如果显示版本号（如 0.1.25），说明安装成功
claude --version
```

安装过程中，npm 会自动下载所有依赖并配置好环境变量。如果遇到权限问题，可以尝试在命令前加 `sudo`（macOS/Linux）或以管理员身份运行终端（Windows）。

### 方法二：让 AI Agent 帮你安装

如果你已经在使用其他 AI 编程助手（如 Cursor、Windsurf 或本项目的 AI Agent），可以让它们帮你完成安装。这种方式的好处是 AI 会自动检测你的环境，处理可能出现的依赖冲突，并根据你的系统配置选择最优的安装方式。

**直接这样说就行：**

```
帮我装 anthropic 的 claude code
```

或者更具体一点：

```
安装 claude code cli，并检查 Node.js 版本是否兼容
```

AI Agent 会：
1. 检查当前 Node.js 版本
2. 如果不符合要求，提示你升级
3. 执行安装命令
4. 验证安装结果
5. 如有问题，自动尝试修复

### 首次启动与初始化

安装完成后，进入你的项目目录启动 Claude Code：

```bash
# 进入项目目录（Claude Code 会在当前目录下工作）
cd /path/to/your/project

# 启动 Claude Code
claude
```

首次启动时，Claude Code 会引导你完成几个重要的初始化步骤：

1. **登录 Anthropic 账户**：你需要有一个 Anthropic 账户才能使用 Claude Code。如果没有，系统会提示你注册。

2. **选择使用计划**：
   - **免费计划**：适合个人学习和轻量级使用，有一定的调用限制
   - **Pro 计划**：适合专业开发者，提供更高的调用配额和优先响应

3. **同意使用条款**：阅读并同意 Anthropic 的服务条款和隐私政策

4. **可选：配置 API 密钥**：如果你有自定义的 API 密钥（比如通过第三方服务提供商获取的），可以在此时配置

::: info 中国区用户的特别说明

由于网络原因，中国区的用户可能无法直接访问 Anthropic 的官方服务。Claude Code 支持使用兼容 Anthropic API 格式的第三方服务，这在技术上是完全可行的。

**你有两个选择：**

1. **直接使用 API Token**：购买兼容 Anthropic API 的服务商提供的 Token，通过环境变量配置
2. **使用 Coding Plan**：一些服务商提供专门的 Coding Plan，针对代码场景优化，通常更实惠

**推荐做法**：直接让 AI Agent 帮你完成配置。只需提供厂商给的配置信息（如 API 地址、密钥等），AI 会自动设置正确的环境变量。

**更详细的配置指南请参考：** [如何安装 claudecode 以及如何配置环境变量](/zh-cn/stage-2/backend/modern-cli/)

:::

---

## 快速开始：做点小实验

安装完成后，不要急于在正式项目中使用，建议先做几个小实验来熟悉 Claude Code 的工作方式。这 3 个实验设计得由浅入深，分别对应 Claude Code 的三种核心能力：自然语言理解、内容生成和代码执行。

### 实验 1：对话 —— 感受 AI 的理解能力

这个实验的目的是让你体验 Claude Code 的自然语言理解能力。与普通的搜索引擎不同，Claude Code 能够理解上下文、进行多轮对话，并根据你的反馈调整回答。

**试试这些对话：**

```
你好，你是谁？
```
Claude 会介绍自己是 Claude Code，Anthropic 开发的 AI 编程助手。

```
什么是闭包？太长不看版本
```
观察 Claude 如何根据"太长不看"这个提示，给出简洁但准确的解释。

```
JavaScript 和 TypeScript 有什么区别？
```
这个问题涉及技术对比，看 Claude 能否给出结构化的、有深度的回答。

**实验要点**：注意 Claude 的回答风格——它通常会先给出核心结论，再展开细节。这种"倒金字塔"式的回答方式非常适合快速获取信息。

### 实验 2：生成 Markdown 文档 —— 体验内容创作

这个实验展示 Claude Code 的内容生成能力。对于开发者来说，写文档往往是最头疼的事情之一。Claude 可以根据你的要求快速生成结构清晰、内容完整的文档。

**输入这个指令：**

```
帮我写一份 Git 常用命令的 Markdown 文档
要求：包含命令、说明、示例
```

**Claude 会做什么：**

1. 分析你的需求：Git 常用命令、Markdown 格式、三要素（命令、说明、示例）
2. 规划文档结构：通常会按使用场景分类（初始化、日常开发、分支管理、远程协作等）
3. 生成内容：为每个命令提供简洁说明和实用示例
4. 格式化输出：使用 Markdown 语法，确保格式规范

**预期输出示例**：

```markdown
# Git 常用命令速查表

## 初始化仓库

| 命令 | 说明 | 示例 |
|------|------|------|
| `git init` | 初始化新仓库 | `git init my-project` |
| `git clone` | 克隆远程仓库 | `git clone https://github.com/user/repo.git` |

...
```

**进阶尝试**：你可以增加更多要求，比如"添加中文注释"、"按使用频率排序"、"包含常见错误处理"等，观察 Claude 如何调整输出。

### 实验 3：编写并运行游戏 —— 完整的代码工作流

这个实验是最具挑战性的，它展示了 Claude Code 的完整代码工作流：理解需求、编写代码、创建文件、运行程序、处理错误。通过这个实验，你能真正感受到 AI 编程助手的威力。

**输入这个指令：**

```
用 Python 写一个贪吃蛇游戏
要求：
1. 使用 pygame 库
2. 有分数显示
3. 按 ESC 退出

写完后帮我运行它
```

**Claude 会执行以下步骤：**

**步骤 1：检查环境**
- 检查 Python 是否安装
- 检查 pygame 库是否可用
- 如有缺失，提示你安装

**步骤 2：编写代码**
- 创建游戏主文件（如 `snake_game.py`）
- 实现游戏逻辑：蛇的移动、食物生成、碰撞检测
- 添加分数显示功能
- 实现 ESC 键退出

**步骤 3：运行游戏**
- 执行 Python 脚本启动游戏
- 游戏窗口会弹出，你可以用方向键控制蛇

**步骤 4：后续支持**
- 如果游戏有 bug，你可以直接说"蛇穿墙了，修复一下"
- 如果想加功能，比如"增加难度随分数提升"，Claude 会继续修改

**这个实验的价值**：

1. **验证安装**：确保 Claude Code 能正常执行代码
2. **体验交互**：感受与 AI 协作开发的过程
3. **建立信心**：看到 AI 能独立完成一个完整的可运行程序

**常见问题**：

- **Q: 如果我没有安装 pygame？**
  - A: Claude 会检测到并提示你运行 `pip install pygame`，你也可以让 Claude 帮你安装

- **Q: 游戏运行后终端被占用了怎么办？**
  - A: 按 ESC 退出游戏，或者在其他终端窗口继续使用 Claude Code

- **Q: 可以换成其他编程语言吗？**
  - A: 当然可以！试试"用 JavaScript 写"、"用 HTML5 Canvas 写"等

---

## 核心技巧

掌握这些技巧，能让你的 Claude Code 使用效率提升数倍。这些技巧来自实际开发经验，涵盖了最常用的操作场景。

### 技巧 1：双击 Esc 回退对话 —— 撤销误操作

这是 Claude Code 中最常用、最重要的快捷键。在与 AI 协作时，你可能会说错话、给错指令，或者对 AI 的回答不满意。双击 Esc 能让你快速"时光倒流"。

**快捷键详解：**

```
按一次 Esc     → 清除当前正在输入的内容（类似 Ctrl+C）
按两次 Esc     → 回退到上一次对话状态（撤销上一轮对话）
按三次 Esc     → 清除所有对话历史（重新开始）
```

**使用场景：**

- **场景 A**：你不小心发了一个错误的指令，Claude 开始执行了。快速按两次 Esc，回到执行前的状态。
- **场景 B**：Claude 的回复不是你想要的，你想换个方式提问。双击 Esc 撤销，重新组织语言。
- **场景 C**：对话已经进行了很多轮，上下文混乱了。三击 Esc 清空，重新开始。

**⚠️ 重要注意**：双击 Esc 回退的是**对话状态**，不是代码修改。如果 Claude 已经修改了你的文件，这些修改不会被自动撤销。你需要手动用 `git checkout` 或 `git reset` 恢复文件。

**建议**：在进行可能大幅修改代码的操作前，先提交当前工作（`git commit` 或 `git stash`），这样即使出了问题也能快速恢复。

### 技巧 2：@ 引用文件 —— 精准指定上下文

Claude Code 虽然能自动读取项目文件，但显式地引用文件能让 AI 更准确地理解你的意图，也能避免 AI 读取不相关的文件浪费 Token。

**基本用法：**

与其模糊地说：
```
解释 src/utils.ts 这个文件
```

不如直接引用：
```
@src/utils.ts 解释这个文件
```

**高级用法：**

**多文件对比分析：**
```
@src/app.tsx @src/components/Header.tsx 这两个文件的关系是什么？
```

**引用目录：**
```
@src/components/ 总结一下这个目录下的所有组件
```

**引用特定行（配合代码编辑器）：**
```
@src/utils.ts:45-60 解释这段代码的作用
```

**使用技巧：**

1. **Tab 补全**：输入 `@` 后按 Tab 键，Claude 会显示当前目录下的文件列表，可以用方向键选择
2. **相对路径**：支持相对路径引用，如 `@./config.json` 或 `@../shared/types.ts`
3. **模糊匹配**：可以输入部分文件名，如 `@utils` 会匹配 `src/utils.ts` 或 `src/utils/index.ts`

### 技巧 3：! 执行命令 —— 终端集成

Claude Code 内置了终端命令执行能力，无需切换到另一个终端窗口就能运行命令。

**基本用法：**

```
!npm test           # 运行测试
!git status         # 查看 Git 状态
!ls -la             # 列出文件
```

**实际应用场景：**

**场景：运行测试并分析失败原因**
```
!npm test
# 测试失败后
分析一下测试失败的原因，并修复代码
```

**场景：查看 Git 差异**
```
!git diff
# 然后让 Claude 解释变更内容
总结一下这些变更的主要内容
```

**场景：构建项目**
```
!npm run build
# 如果构建失败
构建报错了，帮我修复
```

**⚠️ 安全提示：**

Claude Code 会询问是否执行某些敏感命令（如 `rm -rf`、`sudo` 等）。这是保护机制，请谨慎确认。

### 技巧 4：/plan 先规划后编码 —— 复杂任务的正确打开方式

对于复杂的开发任务，直接开始编码往往效率低下。`/plan` 命令让 Claude 进入规划模式，先制定详细的实施计划，再一步步执行。

**使用方式：**

```
/plan
我想添加用户认证功能，请帮我制定实施计划
```

**Claude 会做什么：**

1. **分析需求**：理解你要实现的功能
2. **评估现状**：查看当前项目结构和技术栈
3. **制定计划**：分步骤列出需要做的事情
4. **确认方案**：与你讨论计划，根据反馈调整

**示例输出：**

```
📋 用户认证功能实施计划

阶段 1：数据库设计
- [ ] 创建 users 表（id, email, password_hash, created_at）
- [ ] 创建 sessions 表（id, user_id, expires_at）

阶段 2：后端 API
- [ ] POST /api/auth/register - 用户注册
- [ ] POST /api/auth/login - 用户登录
- [ ] POST /api/auth/logout - 用户登出
- [ ] GET /api/auth/me - 获取当前用户

阶段 3：前端集成
- [ ] 创建登录页面
- [ ] 创建注册页面
- [ ] 添加路由守卫

阶段 4：测试
- [ ] 编写单元测试
- [ ] 编写集成测试

你想从哪个阶段开始？或者需要调整计划？
```

**最佳实践：**

- 对于超过 30 分钟的任务，先用 `/plan`
- 计划制定后，可以逐阶段执行，每完成一个阶段检查一次
- 如果需求变更，可以重新运行 `/plan` 调整计划

### 技巧 5：/init 自动生成配置 —— 快速初始化项目

`/init` 是 Claude Code 最强大的命令之一。它能自动扫描你的项目，理解技术栈和结构，然后生成一份完整的 `CLAUDE.md` 配置文件。

**使用方式：**

```
/init
```

**Claude 会执行以下步骤：**

1. **扫描项目结构**：识别框架、语言、构建工具
2. **分析配置文件**：读取 package.json、tsconfig.json 等
3. **检查代码风格**：了解命名规范、文件组织方式
4. **生成 CLAUDE.md**：创建包含项目信息的配置文件

**生成的 CLAUDE.md 示例：**

```
# My Project

## 技术栈
- 框架：Next.js 14 (App Router)
- 语言：TypeScript
- 样式：Tailwind CSS
- 状态管理：Zustand
- 数据库：Prisma + PostgreSQL

## 常用命令

\`\`\`bash
npm run dev      # 启动开发服务器
npm run build    # 生产构建
npm run test     # 运行测试
npx prisma migrate dev  # 数据库迁移
\`\`\`

## 代码规范
- 使用函数组件 + Hooks
- 文件命名：PascalCase（组件）、camelCase（工具函数）
- 提交规范：Conventional Commits
```

**为什么这很重要：**

`CLAUDE.md` 是 Claude Code 的"项目记忆"。每次启动时，Claude 会自动读取这个文件，了解项目背景。这意味着：

- 你不需要每次都解释项目用什么框架
- Claude 会知道你的代码规范和最佳实践
- 团队协作时，新成员也能快速了解项目

**建议**：新项目初始化后，立即运行 `/init`，然后根据实际情况调整生成的配置。

### 技巧 6：/compact 压缩上下文 —— 节省 Token

Claude Code 的上下文窗口是有限的（通常 200K Token）。长对话会消耗大量 Token，不仅增加成本，还可能导致重要的早期信息被挤出上下文窗口。

**使用方式：**

```
/compact
```

**工作原理：**

`/compact` 会分析当前对话历史，提取关键信息（如已做出的决策、已生成的代码、已确认的需求），然后生成一份简洁的摘要。之后的对话基于这份摘要，而不是完整的历史记录。

**什么时候使用：**

- 对话进行了 5-6 轮后
- 感觉 Claude 开始"遗忘"之前的内容
- 要切换到新的子任务，但想保留关键背景

**使用建议：**

```
# 长对话后压缩
/compact

# 压缩后继续工作
现在我们已经完成了用户模块，接下来做订单模块
```

### 技巧 7：用 Claude Code 辅助 Git 提交

在 Claude Code 里，推荐的提交流程是：先让 Claude 帮你查看 diff、整理提交信息，再由你执行标准的 Git 命令完成提交。这样既清晰，也方便你在提交前再次确认改动内容。

官方文档参考：

- [Built-in commands](https://code.claude.com/docs/en/commands)
- [Discover plugins](https://code.claude.com/docs/en/discover-plugins)

**推荐工作流：**

```bash
# 1. 查看当前改动
/diff
!git status

# 2. 让 Claude 总结变更并生成提交信息
请基于当前 git diff，按照 Conventional Commits 规范生成一个 commit message，
并用中文解释为什么这样分类

# 3. 你确认后，再执行标准 Git 提交
!git add -A
!git commit -m "feat(docs): update Claude Code workflow guidance"
```

**这种方式的好处：**

1. **更贴近当前官方能力**：不依赖已经移除的内置命令
2. **更透明**：你能先检查 diff 和 commit message，再决定是否提交
3. **更通用**：换到别的 AI IDE 或纯 Git 环境时，工作流依然成立

**如果你想保留"一条命令提交"的体验：**

Claude Code 现在推荐通过插件补回这类能力。例如官方插件市场示例里的 `commit-commands` 插件，会提供 `/commit-commands:commit` 这类命令。

```bash
# 1. 添加示例插件市场
/plugin marketplace add anthropics/claude-code

# 2. 安装提交工作流插件
/plugin install commit-commands@anthropics-claude-code

# 3. 重新加载插件
/reload-plugins

# 4. 使用插件命令提交
/commit-commands:commit
```

**补充说明：**

- `/commit-commands:commit` 是插件提供的命令，不是 Claude Code 当前默认内置命令
- 如果你只是想在提交前检查改动，优先使用 `/diff`，或直接让 Claude 解读 `git diff`
- 官方也已将 `/review` 标记为 deprecated；如果你需要类似能力，建议改用插件或自然语言审查工作流

### 技巧 8：Shift+Tab 自动接受 —— 提高流畅度

默认情况下，Claude 修改代码前会询问你的确认。这在学习阶段很有帮助，但熟悉后可能会觉得繁琐。`Shift+Tab` 开启自动接受模式，让工作流更流畅。

**使用方式：**

- 按 `Shift+Tab` → 进入自动接受模式
- 再按 `Shift+Tab` → 退出自动接受模式

**模式对比：**

| 模式 | 行为 | 适用场景 |
|------|------|----------|
| 默认模式 | 每次修改都询问确认 | 学习阶段、重要代码 |
| 自动接受 | 直接应用修改 | 熟悉后、快速迭代 |

**⚠️ 注意事项：**

- 自动接受模式下，Claude 会直接修改文件，没有二次确认
- 建议配合 Git 使用，这样即使出问题也能回滚
- 对于敏感操作（如删除文件、修改配置），Claude 仍会询问

### 技巧 9：Ctrl+C 取消操作 —— 紧急制动

当 Claude 正在执行一个长时间运行的任务，或者你意识到给错了指令时，`Ctrl+C` 是你的"紧急制动"按钮。

**使用方式：**

- 按一次 `Ctrl+C` → 取消当前正在执行的操作
- 按两次 `Ctrl+C` → 完全退出 Claude Code

**使用场景：**

- Claude 正在运行一个耗时的命令，你想中断
- Claude 开始生成大量不相关的代码
- 你意识到给错了指令，想立即停止

**与双击 Esc 的区别：**

- `Ctrl+C`：停止正在进行的**操作**（如运行命令、生成代码）
- `双击 Esc`：回退**对话状态**（撤销上一轮对话）

### 技巧 10：/context 查看上下文使用 —— 优化 Token 消耗

`/context` 显示当前会话的上下文使用情况，帮助你了解 Token 消耗，优化使用成本。

**使用方式：**

```
/context
```

**输出示例：**

```
📊 上下文使用情况

Token 使用：45,230 / 200,000 (22.6%)
文件引用：12 个文件
对话轮数：8 轮

最消耗 Token 的文件：
1. src/api/users.ts (3,420 tokens)
2. node_modules/@types/react/index.d.ts (2,890 tokens)
3. src/components/Dashboard.tsx (1,560 tokens)

建议：
- 当前使用率健康，无需压缩
- 如需减少消耗，可在 .claudeignore 中添加 node_modules
```

**如何利用这个信息：**

1. **识别大文件**：如果某个文件消耗了大量 Token，考虑是否真的需要它
2. **优化 .claudeignore**：将不相关的文件（如 node_modules、构建产物）加入忽略列表
3. **决定何时压缩**：当使用率超过 70% 时，考虑使用 `/compact`

### 技巧 11：/resume 恢复会话 —— 切换多任务对话

当你在处理多个任务时，可能会开启多段对话。`/resume` 能让你在当前聊天中快速切换回之前的会话，而不需要退出重新启动。

**使用方式：**

```
/resume
```

**工作原理：**

Claude Code 会自动记录你之前的对话会话。当你使用 `/resume` 时，它会切换回上一段会话的上下文，保留之前的所有讨论内容和状态。

**使用场景：**

**场景 A：多任务并行处理**
```
# 任务 1：修复 bug
claude> 修复登录页面的验证问题
# ... 进行了一段对话...

# 任务 2：添加新功能（新开一段会话）
claude> 添加用户注册功能
# ... 进行了另一段对话...

# 切换回任务 1
claude> /resume
# 继续之前的 bug 修复工作
```

**场景 B：临时查询后返回**
```
claude> 解释一下这个算法
# ... 讨论算法...

claude> /resume
# 自动切换回之前的代码开发工作
```

**场景 C：对话中断后继续**
```
claude> 继续之前的工作
# 如果你之前中断了某个任务，可以用 /resume 返回
```

**与相关命令的对比：**

| 命令 | 作用 | 使用场景 |
|------|------|----------|
| `/resume` | 在当前聊天中切换回上一段会话 | 多任务并行，需要来回切换 |
| `claude -c` | 继续最近的一次会话 | 退出后重新连接同一会话 |
| `claude -r` | 恢复上一段会话 | 退出后恢复到之前的会话状态 |
| `双击 Esc` | 回退到上一次对话状态 | 撤销最近一轮对话 |

**使用建议：**

1. **多任务管理**：当你需要在多个任务之间切换时，使用 `/resume` 比重新描述上下文更高效
2. **会话记忆**：每段会话都有独立的上下文，`/resume` 能帮你保留这些上下文
3. **配合 /compact**：在长会话中，可以先 `/compact` 压缩，再 `/resume` 切换，保持上下文清晰

---

## 核心配置

合理的配置能让 Claude Code 更好地适应你的项目和团队。本节介绍配置文件的作用、优先级以及如何针对不同的使用场景进行优化。

### 配置文件位置与优先级

Claude Code 采用分层配置策略，不同级别的配置有不同的作用范围和优先级。理解这个机制，能让你更灵活地管理配置。

**配置优先级（从高到低）：**

| 位置 | 作用域 | 用途 | 是否提交 Git |
|------|--------|------|--------------|
| `.claude/settings.local.json` | 项目本地 | 个人偏好设置 | ❌ 否 |
| `.claude/settings.json` | 项目共享 | 团队统一配置 | ✅ 是 |
| `~/.claude/settings.json` | 全局 | 个人默认配置 | ❌ 否 |

**配置合并规则：**

- 高优先级的配置会覆盖低优先级的相同配置项
- 不冲突的配置项会合并生效
- 项目级配置优先于全局配置，个人本地配置优先于共享配置

**实际应用场景：**

**场景 1：团队项目**
```
~/.claude/settings.json          # 你的个人默认编辑器设置
.claude/settings.json            # 团队统一的代码规范、权限配置
.claude/settings.local.json      # 你自己的调试偏好、主题设置
```

**场景 2：个人项目**
```
~/.claude/settings.json          # 全局默认配置
.claude/settings.json            # 项目特定配置（如特殊的权限规则）
```

### CLAUDE.md - 项目记忆

`CLAUDE.md` 是 Claude Code 最重要的配置文件，它相当于项目的"说明书"。每次启动 Claude Code 时，它会自动读取当前目录下的 `CLAUDE.md`，了解项目背景、技术栈和规范。

**为什么 CLAUDE.md 如此重要？**

想象这样一个场景：你加入一个新项目，需要了解技术栈、代码规范、常用命令。通常你要花几个小时阅读文档、看代码、问同事。而有了 `CLAUDE.md`，Claude Code 在启动时就知道了所有这些信息，你可以立即开始高效协作。

**最小可用模板：**

```
# [项目名称]

## 技术栈
- 框架：React 18 + TypeScript
- 状态管理：Zustand
- 样式方案：Tailwind CSS
- 构建工具：Vite

## 常用命令

\`\`\`bash
npm run dev      # 启动开发服务器（端口 5173）
npm run test     # 运行单元测试
npm run build    # 生产构建
npm run lint     # 代码检查
\`\`\`

## 代码规范
- 组件使用函数组件 + Hooks
- 文件命名：PascalCase（组件）、camelCase（工具函数）
- Git 提交使用 Conventional Commits 规范
- 所有 API 调用必须经过统一的 request 封装
```

**完整模板（推荐）：**

```
# [项目名称]

## 项目概述
一句话描述项目的主要功能和目标用户。

## 技术栈
### 前端
- 框架：React 18 + TypeScript
- 路由：React Router v6
- 状态：Zustand + React Query
- 样式：Tailwind CSS + Headless UI
- 构建：Vite

### 后端（如适用）
- 运行时：Node.js + Express
- 数据库：PostgreSQL + Prisma
- 认证：JWT + bcrypt

## 项目结构

\`\`\`
src/
├── components/      # 可复用组件
├── pages/           # 页面组件
├── hooks/           # 自定义 Hooks
├── lib/             # 工具函数
├── types/           # TypeScript 类型
└── api/             # API 调用
\`\`\`

## 常用命令

\`\`\`bash
# 开发
npm run dev              # 启动开发服务器
npm run dev:mock         # 使用 Mock 数据开发

# 测试
npm run test             # 运行所有测试
npm run test:watch       # 监听模式运行测试
npm run test:coverage    # 生成测试覆盖率报告

# 代码质量
npm run lint             # ESLint 检查
npm run lint:fix         # 自动修复 ESLint 问题
npm run format           # Prettier 格式化
npm run typecheck        # TypeScript 类型检查

# 构建
npm run build            # 生产构建
npm run preview          # 预览生产构建
\`\`\`

## 开发规范
### 代码风格
- 使用函数组件，避免类组件
- 优先使用自定义 Hooks 封装逻辑
- 组件 Props 必须定义 TypeScript 接口

### Git 工作流
- 分支命名：`feature/`、`fix/`、`refactor/` 前缀
- 提交信息遵循 Conventional Commits
- PR 必须通过 CI 检查和 Code Review

### 性能要求
- 组件懒加载，减少首屏时间
- 图片使用 WebP 格式，开启懒加载
- API 响应时间控制在 200ms 以内

## 环境变量

\`\`\`bash
# .env.local
VITE_API_BASE_URL=http://localhost:3000
VITE_APP_NAME=MyApp
\`\`\`

## 常见问题

### 开发服务器启动失败？

检查端口 5173 是否被占用，或尝试 `npm run dev -- --port 3000`

### 类型错误？

运行 `npm run typecheck` 查看详细错误信息
```

**快速生成 CLAUDE.md：**

如果你已经有一个项目，但还没有 `CLAUDE.md`，运行 `/init` 命令让 Claude 自动生成：

```bash
claude
# 在 Claude Code 中输入
/init
```

Claude 会分析你的项目结构、package.json、现有代码，生成一份符合实际情况的 `CLAUDE.md`。生成后建议人工检查并根据需要调整。

### .claudeignore - 节省 Token

`.claudeignore` 文件告诉 Claude Code 哪些文件不应该被读取到上下文中。合理配置可以显著减少 Token 消耗（通常能减少 40-60%），同时提高响应速度。

**为什么需要 .claudeignore？**

Claude Code 在理解项目时，会尝试读取相关文件。但有些文件对理解项目没有帮助，反而会：
- 消耗大量 Token（如 node_modules 中的类型定义文件）
- 引入噪音（如日志文件、构建产物）
- 包含敏感信息（如 .env 文件）

**推荐配置：**

```
# ===== 依赖目录 =====
# 这些目录包含大量第三方代码，不需要 Claude 读取
node_modules/
.pnp/
.pnp.js

# ===== 构建产物 =====
# 生成的文件，不包含源代码信息
dist/
build/
.next/
out/
*.tsbuildinfo

# ===== 日志文件 =====
# 运行时生成的日志，对理解项目无帮助
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

# ===== 测试相关 =====
# 测试覆盖率报告、coverage 数据
coverage/
.nyc_output/

# ===== 编辑器/IDE =====
# 编辑器配置和临时文件
.vscode/*
!.vscode/extensions.json
.idea/
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?

# ===== 系统文件 =====
# macOS、Windows 系统文件
.DS_Store
Thumbs.db

# ===== 环境变量 =====
# 包含敏感信息，不应被读取
.env
.env.local
.env.*.local

# ===== 大型资源文件 =====
# 图片、视频等二进制文件
*.png
*.jpg
*.jpeg
*.gif
*.svg
*.ico
*.mp4
*.webm

# ===== 锁文件（可选） =====
# 如果你不需要 Claude 分析依赖版本，可以忽略
# package-lock.json
# yarn.lock
# pnpm-lock.yaml
```

**配置技巧：**

1. **从最小配置开始**：先忽略 node_modules 和构建产物，观察 Token 消耗
2. **根据项目调整**：如果是图片密集型项目，添加图片格式忽略；如果是文档项目，保留 Markdown 文件
3. **定期优化**：使用 `/context` 查看哪些文件消耗了最多 Token，考虑是否加入忽略列表

### 权限配置

Claude Code 默认会在执行敏感操作前询问确认。通过 `settings.json` 中的 `permissions` 配置，你可以精细控制哪些操作可以自动执行，哪些需要确认，哪些完全禁止。

**权限配置结构：**

```json
{
  "permissions": {
    "allow": [
      // 自动允许，不询问
    ],
    "ask": [
      // 执行前询问确认
    ],
    "deny": [
      // 完全禁止
    ]
  }
}
```

**配置语法：**

权限规则使用 `操作类型(匹配模式)` 的格式：

| 操作类型 | 说明 | 示例 |
|----------|------|------|
| `Bash` | 执行终端命令 | `Bash(git status)` |
| `Edit` | 编辑文件 | `Edit(src/**/*.ts)` |
| `Read` | 读取文件 | `Read(README.md)` |
| `Write` | 创建新文件 | `Write(src/components/*.tsx)` |

**匹配模式支持通配符：**

- `*` 匹配任意字符（不包括 `/`）
- `**` 匹配任意路径
- `?` 匹配单个字符

**实际配置示例：**

```json
{
  "permissions": {
    "allow": [
      "Bash(git status)",
      "Bash(git log:*)",
      "Bash(git diff:*)",
      "Bash(npm test:*)",
      "Bash(npm run lint:*)",
      "Edit(src/**/*.{ts,tsx})",
      "Edit(tests/**/*.test.ts)",
      "Read(src/**/*.ts)",
      "Write(src/components/*.tsx)"
    ],
    "ask": [
      "Bash(git commit:*)",
      "Bash(git push:*)",
      "Bash(git pull:*)",
      "Bash(npm install:*)",
      "Bash(npm run build)",
      "Edit(package.json)",
      "Edit(tsconfig.json)",
      "Read(.env)",
      "Read(config/secrets.*)"
    ],
    "deny": [
      "Bash(rm -rf:*)",
      "Bash(sudo:*)",
      "Bash(curl * | sh)",
      "Bash(wget * | sh)",
      "Edit(.git/*)",
      "Write(/etc/*)",
      "Read(/etc/passwd)"
    ]
  }
}
```

**配置建议：**

1. **开发阶段**：设置较宽松的权限，提高迭代速度
2. **生产环境**：收紧权限，特别是涉及部署、敏感数据的操作
3. **团队协作**：将基础权限放在 `settings.json`（共享），个人调整放在 `settings.local.json`

### Rules 规则目录

对于大型项目，单个 `CLAUDE.md` 可能变得臃肿且难以维护。Claude Code 支持使用 **Rules 规则目录** 进行模块化管理，将不同方面的规范拆分成独立的文件。

**目录结构：**

```
.claude/
├── settings.json          # 主配置文件
├── CLAUDE.md              # 项目概述（仍需要）
└── rules/                 # 规则目录
    ├── 00-security.md     # 安全规则（全局）
    ├── 01-coding-style.md # 编码风格（全局）
    ├── 10-api.md          # API 开发规范
    ├── 11-frontend.md     # 前端开发规范
    ├── 12-backend.md      # 后端开发规范
    └── 20-testing.md      # 测试规范
```

**文件命名建议：**

使用数字前缀控制加载顺序（如 `00-`、`01-`），确保基础规则先加载，特定规则后加载。

**规则文件格式：**

规则文件支持 YAML frontmatter，用于控制规则的适用范围：

```markdown
---
# 可选：指定规则适用的文件路径
globs:
  - "src/api/**/*.ts"
  - "src/services/**/*.ts"

# 可选：指定规则适用的命令
commands:
  - "generate api"
  - "create endpoint"

# 可选：规则优先级（数字越小优先级越高）
priority: 10
---

# API 开发规范

## 路由设计
- RESTful 风格，使用名词复数
- 版本控制：/api/v1/users
- 嵌套资源：/api/v1/users/123/orders

## 请求/响应格式
- 统一使用 JSON
- 错误响应必须包含 code 和 message
- 分页响应使用 { data, pagination } 结构

## 安全要求
- 所有端点必须验证认证（除公开端点）
- 敏感操作需要二次确认
- 实现速率限制防止滥用
```

**规则继承与覆盖：**

- 全局规则（无 frontmatter 或 `globs: *`）适用于所有文件
- 特定路径规则只适用于匹配的文件
- 当多个规则冲突时，优先级高的规则生效
- 特定规则可以覆盖全局规则

**使用场景示例：**

**场景 1：前后端分离项目**
```
.claude/rules/
├── 00-general.md          # 通用规范（提交信息、命名约定）
├── 10-backend.md          # 后端规范（NestJS 特定）
├── 11-frontend.md         # 前端规范（React 特定）
└── 20-database.md         # 数据库规范（Prisma 特定）
```

**场景 2：微服务架构**
```
.claude/rules/
├── 00-global/             # 全局规则
│   ├── security.md
│   └── logging.md
├── 10-services/           # 服务特定规则
│   ├── user-service.md
│   ├── order-service.md
│   └── payment-service.md
└── 20-shared/             # 共享组件规则
    ├── shared-lib.md
    └── common-utils.md
```

**迁移建议：**

如果你已经有一个庞大的 `CLAUDE.md`，可以按以下步骤迁移到 Rules 目录：

1. 创建 `.claude/rules/` 目录
2. 将 `CLAUDE.md` 中的内容按主题拆分
3. 为每个规则文件添加适当的 frontmatter
4. 保留 `CLAUDE.md` 作为项目概述，移除详细规范
5. 测试确保规则正确加载

---

## 核心操作指令

Claude Code 提供了一套丰富的操作指令，让你能够高效地与 AI 协作。这些指令分为几类：Slash 命令（内置功能）、符号系统（快捷操作）、以及自然语言指令（日常开发）。

### Slash 命令速查

Slash 命令是 Claude Code 的内置功能，以 `/` 开头。它们提供标准化的操作，如初始化项目、管理配置、查看状态等。

| 命令 | 功能 | 使用场景 |
|------|------|----------|
| `/help` | 显示所有命令 | 忘记命令时快速查看 |
| `/init` | 初始化项目，生成 CLAUDE.md | 新项目或添加配置 |
| `/plan` | 进入规划模式 | 复杂任务前先制定计划 |
| `/clear` | 清除对话历史 | 上下文混乱时重新开始 |
| `/compact` | 压缩上下文 | 长对话后节省 Token |
| `/diff` | 打开交互式 diff 视图 | 查看当前未提交改动 |
| `/plugin` | 管理插件 | 安装提交、审查等扩展能力 |
| `/context` | 查看上下文使用 | 优化 Token 消耗 |
| `/cost` | 查看本次会话费用 | 关注使用成本 |
| `/config` | 打开配置面板 | 修改设置 |
| `/permissions` | 权限管理 | 调整操作权限 |
| `/model` | 切换 AI 模型 | 选择不同模型 |

**命令组合示例：**

```bash
# 完整开发工作流
/plan                    # 1. 制定计划
# ... 执行开发 ...
/diff                    # 2. 查看变更
请基于当前 diff 生成 commit message
!git add -A              # 3. 暂存改动
!git commit -m "..."     # 4. 提交代码
/cost                    # 5. 查看成本
```

### 符号系统

符号系统是 Claude Code 的快捷操作方式，通过特殊符号快速触发特定功能。

| 符号 | 名称 | 用途 | 示例 |
|------|------|------|------|
| `/` | Slash 命令 | 执行内置操作 | `/help`, `/plan` |
| `@` | At 引用 | 引用文件/目录 | `@src/app.tsx` |
| `!` | Bang 模式 | 执行终端命令 | `!npm test` |
| `&` | 后台运行 | 后台执行任务 | `&npm run dev` |

**符号组合技巧：**

```bash
# 组合使用多个符号
@src/utils.ts !npm test
# 解释：读取 utils.ts，然后运行测试

@src/components/ @src/pages/ 比较这两个目录的结构
# 解释：同时引用两个目录进行对比

!git diff @src/app.tsx 解释这些变更
# 解释：查看 Git 差异，然后让 Claude 解释特定文件的变更
```

### 文件操作

文件操作是日常开发中最常用的功能。Claude Code 支持读取、编辑、创建、删除等各种文件操作。

**读取文件：**

```bash
# 基本读取
@src/app.tsx 解释这个文件

# 读取并分析
@src/utils/helpers.ts 找出潜在的性能问题

# 对比读取
@src/components/OldButton.tsx @src/components/NewButton.tsx 对比这两个组件的差异
```

**编辑文件：**

```bash
# 简单编辑
将 src/utils/date.ts 的 formatDate 函数改为支持中文格式

# 复杂编辑
@src/api/users.ts 重构这个文件：
1. 将重复的错误处理逻辑抽取到统一的 handleError 函数
2. 使用 async/await 替代 Promise 链
3. 添加 JSDoc 注释

# 批量编辑
将 src/components/ 下所有类组件转换为函数组件
```

**创建文件：**

```bash
# 创建单个文件
创建 src/components/UserCard.tsx，实现一个展示用户信息的卡片组件

# 创建多个相关文件
创建用户模块：
1. src/types/user.ts - 定义 User 接口
2. src/api/users.ts - 用户相关 API 调用
3. src/components/UserCard.tsx - 用户卡片组件
4. src/hooks/useUser.ts - 获取用户数据的 Hook
```

**删除文件：**

```bash
# 删除前确认
删除 src/old-component.tsx（这个组件已经不再使用）

# Claude 会询问确认，并可能建议你检查是否有其他文件引用它
```

### Git 操作

Claude Code 深度集成了 Git，让你可以在不离开终端的情况下完成完整的版本控制工作流。

**查看状态：**

```bash
# 查看 Git 状态
显示 Git 状态和未提交的变更

# 查看详细变更
!git diff
解释 src/api/users.ts 的变更内容
```

**创建提交：**

```bash
# 查看变更
/diff

# 让 Claude 生成提交信息
请基于当前 git diff 生成一个 Conventional Commit message

# 手动提交
!git add -A
!git commit -m "..."
```

**分支操作：**

```bash
# 创建功能分支
!git checkout -b feature/user-authentication

# 完成开发后
请根据当前改动生成提交信息
!git add -A
!git commit -m "..."
!git push -u origin feature/user-authentication
```

**完整 Git 工作流示例：**

```bash
# 1. 开始新功能
!git checkout -b feature/payment-integration

# 2. 开发功能（Claude 协助编码）
创建支付模块，包含支付宝和微信支付

# 3. 运行测试
!npm test

# 4. 查看变更
/diff

# 5. 生成并确认提交信息
请基于当前 git diff 生成一个 Conventional Commit message
!git add -A
!git commit -m "..."

# 6. 推送到远程
!git push -u origin feature/payment-integration

# 7. 创建 PR（可选，配合 GitHub CLI）
!gh pr create --title "feat: add payment integration" --body "支持支付宝和微信支付"
```

### 代码操作

代码操作是 Claude Code 的核心能力，包括生成、解释、重构、优化等。

**生成代码：**

```bash
# 生成组件
创建一个 React Hook 管理用户认证状态，包含登录、登出、权限检查功能

# 生成工具函数
创建一个日期格式化工具函数，支持相对时间（如"2小时前"）

# 生成完整模块
创建订单模块，包含：
- 订单列表页面
- 订单详情页面
- 创建订单 API
- 订单状态管理
```

**解释代码：**

```bash
# 逐行解释
逐行解释 src/algorithms/quicksort.ts

# 高层次解释
@src/services/payment.ts 解释这个模块的架构设计

# 解释复杂逻辑
解释 src/utils/dataTransformer.ts 中的 reduce 操作在做什么
```

**重构代码：**

```bash
# 架构重构
将 src/components/ 的类组件转换为函数组件

# 性能重构
优化 src/App.tsx 的渲染性能，减少不必要的重渲染

# 代码清理
@src/utils/helpers.ts 重构这个文件：
1. 删除未使用的函数
2. 将重复逻辑抽取为通用函数
3. 添加类型定义
4. 优化函数命名
```

**调试代码：**

```bash
# 分析错误
运行 npm test 失败了，分析错误原因并修复

# 性能分析
@src/components/DataTable.tsx 这个组件渲染很慢，找出性能瓶颈

# 日志分析
!cat logs/error.log
分析这些错误日志，找出根本原因
```

### 测试操作

测试是保证代码质量的重要手段。Claude Code 可以协助你生成测试、运行测试、分析测试结果。

**生成测试：**

```bash
# 生成单元测试
为 src/utils/math.ts 生成单元测试，覆盖所有边界情况

# 生成组件测试
为 src/components/UserForm.tsx 生成 React Testing Library 测试

# 生成集成测试
创建用户注册流程的集成测试，覆盖从表单提交到数据库写入的完整流程
```

**运行和调试测试：**

```bash
# 运行测试
!npm test

# 调试失败测试
分析测试失败原因并修复
@tests/auth.test.ts

# 查看测试覆盖率
!npm run test:coverage
哪些代码没有被测试覆盖？
```

**测试策略建议：**

```bash
# 为新功能添加测试
我添加了用户认证功能，请：
1. 为 auth.service.ts 生成单元测试
2. 为 LoginForm 组件生成组件测试
3. 运行所有测试确保通过
```

### 指令组合与链式操作

高效的 Claude Code 使用方式是将多个指令组合起来，形成完整的工作流。

**场景 1：Bug 修复工作流**

```bash
# 1. 查看问题
!npm test
测试报错了，分析一下

# 2. 定位问题
@src/utils/validation.ts 问题出在这个文件吗？

# 3. 修复问题
修复 validation.ts 中的 isEmail 函数，使其正确处理包含 + 的邮箱地址

# 4. 验证修复
!npm test

# 5. 提交修复
请根据当前 diff 生成修复类提交信息
!git add -A
!git commit -m "fix: ..."
```

**场景 2：代码审查工作流**

```bash
# 1. 查看变更
!git diff --stat
有哪些文件被修改了？

# 2. 详细审查
@src/components/ 审查这些组件的变更

# 3. 提出改进建议
基于审查结果，有哪些可以改进的地方？

# 4. 实施改进
优化 UserList 组件的性能

# 5. 最终审查
/diff
请审查当前改动，指出潜在风险和可改进点
```

**场景 3：新功能开发工作流**

```bash
# 1. 制定计划
/plan
我要添加购物车功能

# 2. 创建分支
!git checkout -b feature/shopping-cart

# 3. 开发功能
按照计划逐步实现

# 4. 添加测试
为购物车模块生成测试

# 5. 运行测试
!npm test

# 6. 代码审查
/diff
请基于当前 diff 做一次代码审查

# 7. 提交代码
请生成本次功能开发的 commit message
!git add -A
!git commit -m "feat: ..."
!git push
```

---

## 常见问题

在使用 Claude Code 的过程中，你可能会遇到各种问题。本节整理了最常见的问题及其解决方案。

### Token 消耗太快？

Token 消耗过快是使用 Claude Code 时最常见的问题。以下是优化 Token 使用的完整策略。

**问题诊断：**

首先，使用 `/context` 命令查看当前的 Token 使用情况：
```
/context
```

关注以下指标：
- **Token 使用率**：如果超过 70%，需要考虑压缩上下文
- **文件引用数量**：引用的文件越多，Token 消耗越大
- **大文件**：查看哪些文件占用了最多 Token

**优化策略：**

**1. 完善 .claudeignore 配置**

确保你的 `.claudeignore` 文件包含了所有不需要的文件：
```
# 必须忽略的
node_modules/
dist/
build/
*.log
.env

# 根据项目类型添加
# React 项目
.next/
out/

# Vue 项目
.nuxt/
.output/

# 通用
.vscode/
.idea/
coverage/
*.min.js
*.bundle.js
```

**2. 定期压缩上下文**

长对话会累积大量 Token。建议每 5-6 轮对话后使用 `/compact`：
```
# 长对话后
/compact

# 继续工作
现在我们来实现订单模块...
```

**3. 精准引用文件**

不要引用整个目录，而是引用具体需要的文件：
```bash
# 不推荐（会读取整个目录）
@src/ 解释这些代码

# 推荐（只读取需要的文件）
@src/utils/auth.ts @src/components/Login.tsx 解释登录流程
```

**4. 避免读取大文件**

如果 `/context` 显示某个文件占用了大量 Token，考虑：
- 是否真的需要这个文件？
- 能否只引用其中的部分代码？
- 能否将大文件拆分成小模块？

### Claude 不理解项目？

当 Claude 的回答不够准确，或者频繁询问项目的基本信息时，说明它缺乏足够的项目背景知识。

**解决方案：**

**1. 生成 CLAUDE.md**

运行 `/init` 让 Claude 自动生成项目配置文件：
```bash
/init
```

生成后，检查并完善以下内容：
- 项目概述是否准确？
- 技术栈是否完整？
- 常用命令是否正确？
- 代码规范是否明确？

**2. 手动编辑 CLAUDE.md**

如果自动生成的配置不够详细，手动添加：
```markdown
## 项目特定信息

### 架构决策
- 为什么选择 X 而不是 Y？
- 核心设计模式是什么？

### 常见陷阱
- 使用 useEffect 时要注意...
- 数据库查询必须...

### 第三方集成
- 支付使用 Stripe
- 邮件使用 SendGrid
- 文件存储使用 AWS S3
```

**3. 使用 Rules 目录**

大型项目可以使用 Rules 目录组织规范：
```
.claude/rules/
├── 00-architecture.md    # 架构概述
├── 01-coding-style.md    # 代码风格
├── 10-frontend.md        # 前端规范
├── 11-backend.md         # 后端规范
└── 20-testing.md         # 测试规范
```

**4. 即时补充上下文**

对于特定任务，可以在指令中补充背景：
```
我们使用自定义的 useAuth Hook 处理认证，
它返回 { user, login, logout, isLoading }。
请基于这个 Hook 实现用户菜单组件。
```

### 如何回退操作？

Claude Code 提供了多种回退机制，适用于不同的场景。

**场景 1：回退对话状态**

如果只是说错了话，或者对 Claude 的回答不满意：
```
双击 Esc  →  回退到上一轮对话
三击 Esc  →  清除所有对话历史
```

**⚠️ 注意**：这只会回退对话状态，不会撤销文件修改。

**场景 2：撤销文件修改**

如果 Claude 已经修改了文件，你需要手动撤销：

```bash
# 查看变更
!git status
!git diff

# 撤销特定文件
git checkout -- src/utils/helpers.ts

# 撤销所有变更
git checkout -- .

# 如果已经提交了
# 软回退（保留变更）
git reset --soft HEAD~1

# 硬回退（丢弃变更）
git reset --hard HEAD~1
```

**场景 3：使用 Git 工作流预防**

最佳实践是在使用 Claude Code 前提交当前工作：
```bash
# 开始前保存当前状态
git add .
git commit -m "WIP: before Claude Code session"
# 或使用 git stash
git stash push -m "before claude"

# 使用 Claude Code 进行开发...

# 如果结果不满意，完全回退
git reset --hard HEAD~1
# 或
git stash pop
```

### 权限提示太多？

频繁的权限确认会影响开发效率。通过合理配置权限，可以让工作流更流畅。

**理解权限系统：**

Claude Code 的权限分为三级：
- **allow**：自动允许，不询问
- **ask**：执行前询问确认
- **deny**：完全禁止

**优化配置：**

编辑 `.claude/settings.json`：

```json
{
  "permissions": {
    "allow": [
      // Git 只读操作
      "Bash(git status)",
      "Bash(git log:*)",
      "Bash(git diff:*)",
      "Bash(git branch)",
      
      // 测试和检查
      "Bash(npm test:*)",
      "Bash(npm run lint:*)",
      "Bash(npm run typecheck)",
      
      // 开发服务器
      "Bash(npm run dev:*)",
      
      // 源代码编辑
      "Edit(src/**/*.{ts,tsx})",
      "Edit(tests/**/*.test.ts)",
      "Write(src/**/*.ts)"
    ],
    "ask": [
      // Git 写操作
      "Bash(git commit:*)",
      "Bash(git push:*)",
      "Bash(git pull:*)",
      
      // 包管理
      "Bash(npm install:*)",
      "Bash(npm uninstall:*)",
      
      // 构建和部署
      "Bash(npm run build)",
      "Bash(npm run deploy:*)",
      
      // 配置文件修改
      "Edit(package.json)",
      "Edit(tsconfig.json)",
      
      // 敏感文件读取
      "Read(.env)",
      "Read(config/secrets.*)"
    ],
    "deny": [
      // 危险命令
      "Bash(rm -rf:*)",
      "Bash(sudo:*)",
      "Bash(curl * | sh)",
      "Bash(wget * | sh)",
      
      // 系统文件
      "Edit(/etc/*)",
      "Write(/usr/*)",
      
      // Git 目录
      "Edit(.git/*)"
    ]
  }
}
```

**渐进式权限策略：**

- **学习阶段**：保持默认设置，了解 Claude 会执行哪些操作
- **熟悉阶段**：将常用的安全操作（如 git status、npm test）加入 allow
- **高效阶段**：根据项目特点，配置更精细的权限规则

### 国内如何使用？

由于网络原因，中国用户可能无法直接访问 Anthropic 的官方服务。以下是几种解决方案。

**方案 1：使用 API 代理服务**

许多云服务商提供兼容 Anthropic API 的代理服务：

```bash
# 设置环境变量
export ANTHROPIC_BASE_URL="https://your-api-proxy.com/v1"
export ANTHROPIC_API_KEY="your-api-key"

# 启动 Claude Code
claude
```

**方案 2：使用第三方 Claude Code 兼容工具**

一些国内服务商提供兼容 Claude Code 的工具：

```bash
# 安装兼容版本
npm install -g @some-provider/claude-code

# 配置 API 密钥
claude config set api.key your-api-key
claude config set api.baseUrl https://api.some-provider.com
```

**方案 3：使用其他 AI 编程工具**

如果 Claude Code 无法使用，可以考虑以下替代方案：

| 工具 | 特点 | 适用场景 |
|------|------|----------|
| Cursor | 基于 VS Code，功能完善 | 需要完整 IDE 体验 |
| GitHub Copilot | 代码补全能力强 | 主要需要代码补全 |
| 通义灵码 | 国产，国内访问稳定 | 国内开发环境 |
| Codeium | 免费额度多 | 预算有限 |

**方案 4：让 AI Agent 帮你配置**

如果你不确定如何配置，可以让 AI Agent 协助：

```
我要使用 Claude Code，但国内无法直接访问。
我购买了 XXX 服务商的 API，
API 地址是 https://api.xxx.com，
密钥是 sk-xxx。

请帮我配置好环境变量，确保 Claude Code 能正常使用。
```

**常见问题：**

- **Q: 配置后仍然无法连接？**
  - A: 检查 API 地址是否正确，确认是否包含 `/v1` 路径
  - A: 检查 API 密钥是否有效，是否已充值
  - A: 检查本地网络是否需要代理

- **Q: 响应速度很慢？**
  - A: 选择地理位置更近的服务商
  - A: 使用 Coding Plan 而非通用 API
  - A: 考虑使用 `/compact` 减少 Token 消耗

- **Q: 某些功能无法使用？**
  - A: 部分第三方服务可能不完全兼容所有 Claude Code 功能
  - A: 检查服务商的文档，了解支持的功能范围

---

## 参考资源

- [Claude Code 官方文档](https://code.claude.com/docs)
- [Claude Code GitHub](https://github.com/anthropics/claude-code)
- [Everything Claude Code](https://github.com/affaan-m/everything-claude-code)
