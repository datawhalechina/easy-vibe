# 高级二：如何让 Claude Code 长时间工作

## 引言

传统的 AI 编程助手是"对话式"的——你说一句，它回一句，然后停下了。但对于真正的开发任务来说，这种模式远远不够。

想象一下这些场景：你想让 Claude 帮你重构整个项目，但它写完几个文件就说"我完成了"；你想让 Claude 持续修复 bug 直到测试全部通过，但它跑一次就停下来；你想让 Claude "过夜干活"，但第二天发现它早就停了。

本章要解决的核心问题是：如何让 Claude Code 像真正的开发者一样，持续工作直到任务真正完成。

---

## 核心原理：为什么 AI 会"过早停止"？

在介绍各种方法之前，先理解问题的根源。

### AI 的"完成判断"不可靠

LLM（大语言模型）有一个根本缺陷：它无法准确判断自己的工作是否真正完成。

人类的完成标准是客观的——所有测试通过、功能完整可用、代码质量达标。但 AI 只能基于"感觉"来判断。它可能会觉得"看起来差不多了"就停止，或者觉得"输出够多了"就停下，又或者不知道接下来该干什么而停下。

这就是为什么我们需要一个外部系统来判断任务是否真正完成，而不是依赖 AI 自己的感觉。

### 解决方案的核心思想

解决方案的核心是：让 AI 在一个"循环"中工作。

每次它想退出时，外部系统会检查三个问题——真的完成了吗？符合客观标准了吗？还有没有遗漏？如果没有，就重新注入任务，继续下一轮。

这个思想的实现形式多种多样，从简单的 bash 脚本到复杂的编排系统，本质都是一样的。

---

## 方法一：While True Bash Loop（最原始的方法）

这是最简单、最直接的实现方式。本质上就是写一个无限循环，每次循环都重新启动 Claude Code 并喂给它同样的任务描述。

最简单的实现只需要 5 行代码：

```bash
#!/bin/bash
while true; do
    cat PROMPT.md | claude
done
```

### 工作原理

这个脚本的工作流程很直接。第一步是读取 PROMPT.md 文件中的任务描述。第二步是启动 Claude Code 并将任务描述传递给它。第三步是 Claude 开始工作并输出结果。第四步是 Claude 完成后退出。第五步是循环自动重新启动，整个过程回到第一步，形成无限循环——除非你手动按 Ctrl+C 中断。

### 优缺点

这种方法的优点是极其简单，任何人都能看懂，不需要任何配置，立即可用，适合快速实验。

但缺点也很明显：它无法判断任务是否真的完成，可能无限空转，没有安全保护机制，会浪费 API 调用。

### 实际使用示例

首先创建一个 PROMPT.md 文件来描述任务。比如重构用户认证模块的任务可以这样写：

```markdown
# 任务：重构用户认证模块

要求：
1. 将所有认证逻辑抽取到独立的 AuthService 类
2. 添加单元测试，覆盖率 > 80%
3. 更新相关文档

当所有测试通过且文档更新完成后，输出：任务完成
```

然后创建循环脚本并运行：

```bash
chmod +x loop.sh
./loop.sh
```

### 安全改进版

为了避免无限循环，可以添加迭代次数限制：

```bash
#!/bin/bash
MAX_ITERATIONS=50
iteration=0

while true; do
    iteration=$((iteration + 1))
    echo "=== 迭代 $iteration/$MAX_ITERATIONS ==="

    cat PROMPT.md | claude

    if [ $iteration -ge $MAX_ITERATIONS ]; then
        echo "达到最大迭代次数，停止"
        break
    fi

    sleep 5  # 稍作等待，避免 API 限流
done
```

这个改进版本添加了最大迭代次数限制，每次循环显示当前进度，达到限制后自动停止。同时在每次循环之间添加 5 秒延迟，避免触发 API 限流。

---

## 方法二：Ralph Wiggum Plugin（官方推荐）

Ralph Wiggum 是 Anthropic 官方推出的插件，专门解决长时间任务问题。它以《辛普森一家》中的角色命名，象征着"尽管失败，仍坚持尝试"的精神。

### 核心机制：Stop Hook

Ralph 的核心机制是 Stop Hook。当 Claude 想要退出时，Stop Hook 会拦截这个退出信号。然后系统会检查：输出了特定的完成标记吗？如果没有找到完成标记，就重新注入原始 prompt，开始下一轮迭代。如果找到了完成标记，才允许 Claude 退出。

这个机制保证了 Claude 不会因为"感觉差不多了"就停下来，而是必须真正完成明确标记的任务。

### 安装

安装很简单，只需要在 Claude Code 中运行：

```bash
claude /plugins:add ralph-wiggum
```

### 基本使用

基本使用方式是通过 `/ralph-loop` 命令：

```bash
/ralph-loop "构建一个待办事项 API，包含 CRUD 操作、输入验证、测试。
             全部完成后输出 <promise>COMPLETE</promise>" \
  --max-iterations 50 \
  --completion-promise "COMPLETE"
```

### 参数说明

最重要的两个参数是 `--max-iterations` 和 `--completion-promise`。

`--max-iterations` 设置最大迭代次数，这是安全机制，推荐值在 20-100 之间。即使任务没有完成，达到这个次数后也会停止，防止无限循环消耗 API 额度。

`--completion-promise` 指定完成标记文本，需要是一个明确唯一的标识。当 Claude 的输出中包含这个标记时，Ralph 才会认为任务完成并允许退出。推荐使用像 `COMPLETE`、`TASK_DONE` 这样清晰的标记，避免使用模糊的词汇。

### Prompt 编写最佳实践

编写好的 Prompt 是 Ralph 成功的关键。

不好的 Prompt 往往没有明确的完成标准。比如简单地说"写一个 todo API"，这样 AI 可能写个基础框架就说完成了，没有测试、没有验证、没有文档。

好的 Prompt 应该包含详细的阶段性要求和明确的验收标准。比如可以这样写：

首先分阶段描述任务。阶段 1 是基础功能，列出所有 CRUD 端点：POST /todos 创建任务、GET /todos 获取列表、GET /todos/:id 获取单个、PUT /todos/:id 更新、DELETE /todos/:id 删除。阶段 2 是输入验证，标题不能为空，完成状态必须是布尔值。阶段 3 是测试，为每个端点编写测试，覆盖率要大于 80%。

然后列出验收标准：所有测试通过、代码通过 linter 检查、README 包含 API 文档。

最后指定一个唯一的完成标记：`<promise>TODO_API_COMPLETE</promise>`。

这样 Claude 就知道确切要做什么，什么时候才算真正完成。

### 实战案例

有一个著名的案例是在 Y Combinator 黑客松上，一个团队使用 Ralph Loop。晚上 11 点他们设置任务：根据 specs 目录下的 6 个产品需求，依次实现每个项目的 MVP，每完成一个输出特定的完成标记。设置最大迭代次数 200 次，然后就去睡觉了。

第二天早上醒来，他们发现有 6 个可演示的项目，而 API 调用成本只有 297 美元。这就是 Ralph 的威力——你睡觉的时候，AI 在工作。

另一个案例来自 Boris Cherny（Claude Code 负责人）。他使用 Ralph 加上 Opus 4.5 模型，在 30 天内提交了 259 个 PR，包含 497 次提交，新增 40,000 行代码、删除 38,000 行代码。最惊人的是，这 100% 都是由 Claude Code 完成的，没有人工编写一行代码。

### Ralph 的哲学

Ralph 体现了三个核心哲学思想。

第一是迭代大于完美。不要指望一次就完美，让循环来改进。第一次可能只写个框架，第二次修复 bug，第三次优化代码，第四次添加测试，每次都比上一次更好。

第二是失败是数据。每次测试失败都是改进的机会，不要害怕失败，要从失败中学习。

第三是持续尝试。Keep trying until it works——这就是 Ralph 的精神。

---

## 方法三：增强版 Ralph

这是社区对官方 Ralph 的增强实现，在 GitHub 上可以找到 [frankbria/ralph-claude-code](https://github.com/frankbria/ralph-claude-code) 项目，增加了更多安全机制。

### 额外特性

增强版提供了几个额外的安全特性。

第一个是双重退出条件。官方 Ralph 只需要检查完成标记，但增强版需要同时满足完成标记和显式 EXIT_SIGNAL 才会真正停止。这意味着即使 Claude 输出了完成标记，如果它没有明确表示要退出，循环还会继续，可以进一步验证和改进。

第二个是速率限制功能。默认设置为 100 次/小时，防止因为某种 bug 导致无限循环时，API 账单爆炸。你可以根据需要调整这个限制。

第三个是智能熔断器。如果系统连续 5 次检测到完成标记，会强制退出。这是为了防止某种边缘情况导致循环无法正常结束。

第四个是实时仪表盘。增强版提供了一个命令行界面，可以显示当前迭代次数、任务进度、预估成本等信息，让你随时掌握状态。

### 安装

安装增强版 Ralph 需要先从 GitHub 克隆仓库：

```bash
git clone https://github.com/frankbria/ralph-claude-code.git
cd ralph-claude-code
./install.sh
```

安装脚本会自动设置好所需的文件和配置。

### 使用

使用增强版 Ralph 分两步。首先用 `ralph-setup` 命令初始化项目：

```bash
ralph-setup my-project
```

这会在项目中创建所需的配置文件。然后用 `ralph loop` 命令启动循环：

```bash
ralph loop
```

### 配置文件

增强版 Ralph 使用配置文件 `.claude/ralph-config.json` 来设置参数：

```json
{
  "maxIterations": 50,
  "rateLimitPerHour": 100,
  "completionPromise": "TASK_COMPLETE",
  "exitSignal": "EXIT_NOW",
  "costAlertThresholds": [10, 50, 100]
}
```

`maxIterations` 是最大迭代次数。`rateLimitPerHour` 是每小时速率限制。`completionPromise` 是完成标记文本。`exitSignal` 是显式退出信号。`costAlertThresholds` 是成本预警阈值，当花费达到这些金额时会发出警告。

---

## 方法四：Agent Teams（多代理并行）

当任务足够大时，单个 Claude 不够用，需要"团队协作"。

Agent Teams 是一个高级功能，允许多个 Claude 实例并行工作，通过共享任务列表协调依赖关系。这适合超大型项目，比如 Nicholas Carlini 的实验中，16 个并行 Agent 在 2 周内编写了 100,000+ 行代码，构建出一个能编译 Linux 内核的 C 编译器。

Agent Teams 的内容比较复杂，我们将在下一节《3.3 Agent Teams 多代理协作》中详细讲解。

---

## 方法五：后台任务（Ctrl+B）

这是一个简单但实用的非阻塞执行方法。

### 基本操作

使用方式很直观。当 Claude 开始运行一个任务时，你可以按 `Ctrl+B` 把它推送到后台。

比如你说："运行完整测试套件"。Claude 开始运行。你可以按 `Ctrl+B`，Claude 会返回："任务已推送到后台（ID: task_abc123）"。然后你可以继续说："同时，帮我分析这个日志文件"。Claude 会在后台运行测试的同时，帮你分析日志。

### 查看后台任务

有几种方式查看后台任务。使用 `/tasks` 命令可以列出所有后台任务，包括任务 ID、状态、启动时间等信息。按 `Ctrl+T` 可以快速查看任务状态的摘要。你也可以从任务列表中选择某个任务，把它恢复到前台（Bring to foreground），查看它的实时输出。

### 适用场景

后台任务适合几个典型场景。

第一个是长时间运行的测试。完整测试套件可能需要几十分钟，用后台任务可以在测试运行的同时继续开发。

第二个是大型项目构建。构建过程可能需要很长时间，后台运行不会阻塞其他工作。

第三个是批量文件处理。比如批量重命名、批量格式化等，可以在后台进行。

第四个是任何你不想等待的事情。

---

## 安全机制：防止无限循环

任何自动循环系统都必须有安全保护，否则可能出现失控的情况。

### 硬性限制

最基本的保护是设置 `--max-iterations`（最大迭代次数），这是必须的。无论任务是否完成，达到这个次数后都会停止，防止无限循环消耗 API 额度。

你还可以设置时间限制，比如最长运行 4 小时后自动停止。或者设置 API 预算警告，当花费达到一定金额（比如 10 美元、50 美元、100 美元）时暂停并通知你。

### 智能检测

可以添加智能检测来发现死循环。比如检查最近几次提交有没有实质变化：

```bash
if [ $(git diff HEAD~5 | wc -l) -eq 0 ]; then
    echo "最近 5 次提交没有实质变化，可能陷入循环"
    exit 1
fi
```

如果最近 5 次提交的代码差异很小，说明可能陷入了死循环，应该停止并报警。

### 成本预警

配置文件中可以设置成本预警阈值：

```json
{
  "costAlertThresholds": [10, 50, 100],
  "alertAction": "pause_and_notify"
}
```

当花费达到 10、50、100 美元时，系统会暂停任务并发送通知，让你决定是否继续。

### 人工检查点

对于特别重要的任务，可以设置人工检查点：

```bash
if [ $((iteration % 10)) -eq 0 ]; then
    read -p "已完成 $iteration 次迭代，继续吗？(y/n)" answer
    if [ "$answer" != "y" ]; then
        break
    fi
fi
```

这样每 10 次迭代暂停一次，等待你确认是否继续。这样可以在出现问题时及时干预。

---

## 实战：用 Ralph Loop 构建完整的 BBS 论坛系统

让我们通过一个完整的例子来展示 Ralph Loop 的威力。我们将从零开始构建一个仿造 BBS 论坛系统，包含用户鉴权、发帖、用户中心和管理后台。

### 项目目标

构建一个功能完整的 BBS 论坛系统，包含：

**用户端功能**：
- 用户注册、登录、退出
- 浏览帖子列表（分页）
- 查看帖子详情
- 发布新帖
- 评论功能
- 个人中心（查看自己的帖子、修改个人信息）

**管理后台功能**：
- 管理员登录
- 用户管理（封禁、解封）
- 帖子管理（删除、置顶）
- 评论管理
- 系统统计

**技术栈**：
- 后端：Node.js + Express + SQLite 数据库
- 前端：React + React Router + Axios
- 认证：JWT Token
- 样式：Tailwind CSS

### 准备工作

首先安装 Ralph Wiggum 插件：

```bash
claude /plugins:add ralph-wiggum
```

### 启动 Ralph Loop

现在启动 Ralph Loop，让它完成整个项目：

```bash
/ralph-loop "
请从零开始构建一个完整的 BBS 论坛系统，使用 TDD 方式开发。

项目结构要求：
- backend/ 目录：Express API 服务器
- frontend/ 目录：React 前端应用
- 两个目录都有各自的测试

后端功能要求：
- 使用 Express 框架
- SQLite 数据存储（better-sqlite3）
- JWT 用户认证（jsonwebtoken + bcrypt）
- 用户表：id、username、password、email、role、createdAt
- 帖子表：id、title、content、authorId、category、pinned、createdAt
- 评论表：id、content、postId、authorId、createdAt

后端 API 端点：
- POST /api/auth/register - 用户注册
- POST /api/auth/login - 用户登录
- GET /api/posts - 获取帖子列表（分页、分类筛选）
- GET /api/posts/:id - 获取帖子详情
- POST /api/posts - 发布帖子（需登录）
- PUT /api/posts/:id - 编辑帖子（作者或管理员）
- DELETE /api/posts/:id - 删除帖子（作者或管理员）
- POST /api/posts/:id/comments - 发表评论（需登录）
- GET /api/user/profile - 获取个人信息（需登录）
- PUT /api/user/profile - 更新个人信息（需登录）
- GET /api/admin/stats - 管理员统计（需管理员）
- GET /api/admin/users - 用户列表（需管理员）
- PUT /api/admin/users/:id/ban - 封禁用户（需管理员）

前端页面要求：
- /login - 登录页
- /register - 注册页
- / - 首页（帖子列表）
- /post/:id - 帖子详情
- /new - 发布帖子
- /profile - 个人中心
- /admin - 管理后台（需管理员权限）

管理后台功能：
- 用户管理（查看、封禁、解封）
- 帖子管理（查看、删除、置顶）
- 评论管理（查看、删除）
- 系统统计（用户数、帖子数、评论数）

TDD 要求：
- 先写测试，后写代码
- 每个功能都要有对应的测试
- 后端使用 Jest，API 测试要覆盖所有端点
- 前端使用 Vitest，组件测试要覆盖主要功能
- 认证中间件要有测试

验收标准：
- 运行 npm test（后端）全部通过
- 运行 npm test（前端）全部通过
- 前端可以正常启动并使用
- 后端 API 可以正常响应
- 普通用户和管理员权限正确隔离
- 代码通过 ESLint 检查

完成后输出：<promise>BBS_SYSTEM_COMPLETE</promise>
" --max-iterations 150 --completion-promise "BBS_SYSTEM_COMPLETE"
```

### 预计时间

根据项目复杂度：

**如果人工编写**：大约 40-60 小时（包括数据库设计、认证系统、前后端联调、测试）

**使用 Ralph Loop**：
- 基础版本（核心功能）：约 3-5 小时
- 完整版本（包含管理后台、测试）：约 6-10 小时

### 监控进度

Ralph Loop 运行时，你可以通过几个方式监控进度：

**查看迭代次数**：Ralph 会显示当前迭代次数和最大次数，你可以估算剩余时间。

**查看日志**：你可以看到 Claude 正在做什么——设计数据库、写 API、实现前端组件、修复 bug。

**测试状态**：每次测试运行的结果会显示，通过的测试会增加，失败的测试会减少。当失败的测试开始变少，说明项目接近完成。

### 完成后验证

当 Ralph Loop 输出完成标记后，你需要手动验证：

```bash
# 后端测试
cd backend
npm test

# 前端测试
cd frontend
npm test

# 启动后端
cd backend
npm start

# 启动前端（另一个终端）
cd frontend
npm run dev
```

打开浏览器，测试以下流程：

1. 注册新用户
2. 登录
3. 浏览帖子
4. 发布新帖
5. 发表评论
6. 访问个人中心
7. 退出后用管理员登录（默认账号：admin/admin123）
8. 测试管理后台功能

### 注意事项

Ralph Loop 虽然强大，但有几个注意事项：

**第一，Prompt 越详细，结果越好**。模糊的 Prompt 导致需要更多迭代来修正。

**第二，设置合理的迭代次数**。BBS 系统比较复杂，建议至少 100 次迭代。

**第三，TDD 是推荐方式**。先写测试可以大幅减少调试时间。

**第四，最终需要人工验证**。AI 可能遗漏边界情况或特殊场景，特别是安全相关的功能。

**第五，数据库设计要仔细**。Ralph 可能需要几次迭代才能设计出合理的数据库结构。

---

## 方法对比与选择

各种方法各有特点，适合不同场景。

While True Loop 最简单，只需要 5 行代码就能工作，适合快速实验和原型验证。但功能有限，没有完成检测，只能靠迭代次数限制。

Ralph Wiggum 是通用推荐，适合大部分场景。它有完整的 Stop Hook 机制，支持完成标记检测，有官方支持，文档完善。

增强版 Ralph 更适合生产环境，有双重退出条件、速率限制、智能熔断器等额外的安全机制。

后台任务适合简单的非阻塞执行，只需要按 `Ctrl+B` 就能用。但它只是简单的后台运行，没有循环机制。

---

## 总结

让 Claude Code 长时间工作的核心思想很简单：不要让它"一次完成"，而是让它"持续尝试直到真正完成"。

所有方法本质上都是在做同一件事：给 Claude 一个任务，让它工作，检查是否真的完成，如果没有，继续下一轮。

选择哪种方法取决于你的具体需求。

如果想要简单快速，用 While True Loop。5 行代码就能工作，但功能有限。

如果想要通用推荐，用 Ralph Wiggum。官方支持，功能完整，适合大部分场景。

如果是生产环境，用增强版 Ralph。有额外的安全机制，更可靠。

（Agent Teams 多代理协作的内容请参考下一节《3.3 Agent Teams 多代理协作》）

希望这一章的内容能帮助你更好地利用 Claude Code，让 AI 真正成为你的生产力工具，而不仅仅是聊天机器人。

---

## 参考资料

### 官方资源

- [Claude Code 官方文档](https://docs.anthropic.com/en/docs/claude-code) - Claude Code 的完整官方文档
- [Ralph Wiggum Plugin README](https://github.com/anthropics/claude-plugins-official/tree/main/plugins/ralph-wiggum) - Ralph Wiggum 插件的官方文档
- [Claude Code Hooks 系统](https://docs.anthropic.com/en/docs/claude-code/configuration/hooks) - Hooks 系统的官方文档

### 社区项目

- [frankbria/ralph-claude-code](https://github.com/frankbria/ralph-claude-code) - 增强版 Ralph 实现，包含额外的安全机制
- [win4r/claude-code-hooks](https://github.com/win4r/claude-code-hooks) - Hook 示例和工具集合
- [snarktank/ralph](https://github.com/snarktank/ralph) - 原始 Ralph 实现
- [affaan-m/everything-claude-code](https://github.com/affaan-m/everything-claude-code) - 生产级配置模板
- [claude-flow](https://github.com/ruvnet/claude-flow) - 企业级编排平台

### 文章与教程

- [Geoffrey Huntley - Ralph Technique](https://ghuntley.com/ralph/) - Ralph 技术的原创者
- [O'Reilly - Conductors to Orchestrators](https://www.oreilly.com/radar/conductors-to-orchestrators-the-future-of-agentic-coding/) - AI 编程从指挥到编排的演进
- [构建可靠长时运行AI代理的有效框架实践](https://m.blog.csdn.net/weixin_48708052/article/details/158044721) - Anthropic 工程博客精读
- [Claude Code 最佳实践（作者亲授）](https://juejin.cn/post/7366666666666666666) - 官方最佳实践分享
- [Claude Code 全攻略](https://developer.aliyun.com/article/1705912) - 完整的使用指南
- [Reverse Engineering Analysis](https://m.blog.csdn.net/qq_33778762/article/details/149490953) - Claude Code 的逆向工程分析

### 实战案例

- [16 Agents Build C Compiler](https://arxiv.org/abs/2408.01342) - Nicholas Carlini 的实验论文
- [Boris Cherny's 30 Days](https://twitter.com/boriskirov/status/1756002385683786616) - 259 PRs 案例分享
- [Y Combinator Hackathon](https://github.com/geoffreyhuntley/ralph) - 6 个项目过夜生成的案例

### 工具文档

- [Tmux 官方文档](https://github.com/tmux/tmux/wiki) - Tmux 的完整文档
- [GitHub Actions 文档](https://docs.github.com/en/actions) - GitHub Actions 的官方文档
- [Agent SDK](https://docs.anthropic.com/en/docs/agents) - 构建自定义代理的 SDK
