# 高级五：Claude Code Superpowers 工程级开发

## Superpowers 简介

**Superpowers** 是由 Jesse Vincent（网名 obra）开发的开源代理技能框架，专门解决 AI 编程中的一个核心问题：如何让 AI 写出"工程级"的代码，而不是"玩具级"的代码。

想象一下，普通 AI 编程助手就像一个"聪明的实习生"——它能写出能跑的代码，但可能没有测试、没有文档、没有遵循最佳实践。而 Superpowers 则像是给这个实习生配备了一位"资深工程师导师"，强制它遵循完整的软件开发流程。

### 为什么需要 Superpowers？

在没有 Superpowers 之前，使用 Claude Code 存在一些问题：

- **Vibe Coding 的混乱**：AI 直接开始写代码，没有规划，导致频繁返工
- **缺少 TDD 纪律**：AI 习惯先写代码再补测试，甚至干脆不写测试
- **需求模糊直接动手**：用户说"做一个登录功能"，AI 就开始写，结果做出来不是想要的
- **代码质量不稳定**：没有代码审查机制，质量依赖 AI 的"心情"

Superpowers 解决了这些问题，让 Claude 变成一个"有纪律的开发团队"——它先帮你澄清需求，然后制定计划，再用 TDD 方式开发，最后通过代码审查确保质量。

---

## 快速开始

### 第一步：安装 Superpowers

在 Claude Code 中运行：

```bash
# 添加 marketplace
/plugin marketplace add obra/superpowers-marketplace

# 安装 superpowers
/plugin install superpowers@superpowers-marketplace
```

或者手动克隆：

```bash
git clone https://github.com/obra/superpowers.git ~/.claude/skills/superpowers
```

### 第二步：体验第一个 Skill

让我们用 Superpowers 的 **brainstorming**（头脑风暴）技能来体验它的价值。

在 Claude Code 中输入：

```
我做一个用户登录功能
```

**没有 Superpowers 之前**：Claude 直接开始写代码，可能做出来不是你想要的。

**有 Superpowers 之后**：Claude 会通过苏格拉底式提问帮你澄清需求：

> 这个登录功能是为 Web 应用还是移动应用设计的？
>
> 需要支持哪些登录方式？邮箱密码？第三方登录（Google、GitHub）？
>
> 是否需要"记住我"功能？
>
> 密码重置流程是邮件还是短信？
>
> ...

这些问题迫使你在编码前想清楚真正需要什么，避免写出一堆用不上的代码。

### 第三步：了解技能触发机制

Superpowers 不是"魔法开关"，它是一组**技能集合**。了解技能如何触发很重要。

**技能触发的三种方式**：

1. **关键词触发**
   - 当你提到 "TDD"、"测试驱动开发"、"先写测试" 时
   - `test-driven-development` 技能会被激活

2. **场景触发**
   - 当需求模糊时，`brainstorming` 技能会主动提问
   - 当出现 bug 时，`systematic-debugging` 技能会被激活

3. **手动调用**
   - 直接使用技能名称：`/test-driven-development`

#### 💡 重要理解：不指定 TDD 会怎样？

这是一个常见误解，让我们澄清：

```
# 情况 A：不提 TDD
"实现一个计算器"
→ Claude 可能写测试，也可能不写
→ 取决于模型本身的训练习惯

# 情况 B：提到 TDD
"用 TDD 方式实现一个计算器"
→ test-driven-development 技能被激活
→ 强制遵循 RED-GREEN-REFACTOR 流程
```

**Superpowers 的真正价值**：不是"无中生有"，而是"强化纪律"。

- 没有 TDD 技能时：Claude 写测试是"看心情"
- 有 TDD 技能时：Claude 被强制遵循 TDD 流程

### 理解 Superpowers 的价值

通过上面的解释，你可以看到 Superpowers 的核心价值：

1. **需求优先**：`brainstorming` 技能在需求模糊时主动提问
2. **流程纪律**：`test-driven-development` 强制 TDD 红绿重构循环
3. **任务分解**：`writing-plans` 将大项目拆解为小任务
4. **质量控制**：`code-review` 技能确保代码质量

---

## Superpowers 核心技能详解

Superpowers 包含 **20+ 个可组合技能**，覆盖整个软件开发生命周期。让我们按类别了解它们。

### 🧪 测试类技能

#### test-driven-development（测试驱动开发）

**如何触发**：提到 "TDD"、"测试驱动开发"、"先写测试" 等关键词。

**这个技能做什么**：强制 Claude 遵循 TDD 红绿重构循环，而不是"想起来再写测试"。

**传统开发方式**（常见问题）：
1. 直接写代码
2. 手动测试一下
3. 发现 bug，修改代码
4. 重复...（测试？下次再说吧）

**TDD 方式**（技能激活后）：
1. 🔴 **RED**：先写一个失败的测试
2. 🟢 **GREEN**：写最少的代码让测试通过
3. 🔵 **REFACTOR**：重构代码，保持测试通过
4. 重复

**使用示例**：

```
用 TDD 方式实现一个用户认证模块
```

Claude 会：
1. 先编写测试（测试用户名密码验证、测试 token 生成...）
2. 运行测试，确认全部失败（RED）
3. 编写最小实现代码
4. 运行测试，确认通过（GREEN）
5. 重构代码，提取公共逻辑
6. 再次运行测试，确认仍然通过（REFACTOR）

> **注意**：如果你不提 "TDD"，Claude 可能也可能不写测试。这个技能的作用是**强化流程纪律**，确保测试不会"被遗忘"。

### 🐛 调试类技能

#### systematic-debugging（系统化调试）

当出现 bug 时，人类开发者往往会随机尝试各种修复方案。Superpowers 强制使用四阶段根因分析：

**阶段 1：复现问题**
- 确认 bug 可以稳定复现
- 记录复现步骤

**阶段 2：隔离根因**
- 通过二分法缩小范围
- 添加日志定位问题代码

**阶段 3：验证假设**
- 提出根因假设
- 设计验证实验

**阶段 4：修复并验证**
- 实施修复
- 确认 bug 解决
- 添加回归测试

#### verification-before-completion（完成前验证）

这个技能防止 Claude "感觉差不多"就停止工作。它要求 Claude 在声称任务完成前：

1. 运行所有测试
2. 手动测试关键功能
3. 检查代码质量（lint）
4. 确认文档已更新

### 🤝 协作类技能

#### brainstorming（头脑风暴）

这是 Superpowers 最有趣的技能之一。它使用苏格拉底式提问法帮你澄清需求。

**工作方式**：当你提出一个模糊需求时，Claude 不会直接动手，而是会问你问题：

```
你：做一个博客系统

Claude：
- 这个博客主要是给谁看的？技术读者还是大众？
- 需要支持 Markdown 编辑吗？
- 需要评论功能吗？
- 需要搜索功能吗？
- 是单用户还是多作者？
- ...
```

这些问题迫使你思考真正需要什么功能，避免开发出一堆用不上的东西。

#### writing-plans（编写计划）

这个技能将大任务分解为 2-5 分钟可完成的小任务。

**示例**：

```
用 writing-plans 规划一个待办事项 API 的开发
```

Claude 会生成详细计划：

```markdown
# 实现计划

## 任务 1：设计数据库 schema（预计 5 分钟）
- 创建 todos 表
- 定义字段：id, title, completed, createdAt

## 任务 2：创建 Express 路由（预计 10 分钟）
- POST /todos - 创建任务
- GET /todos - 获取列表
- GET /todos/:id - 获取单个
- PUT /todos/:id - 更新
- DELETE /todos/:id - 删除

## 任务 3：添加输入验证（预计 10 分钟）
- 标题不能为空
- completed 必须是布尔值

## 任务 4：编写测试（预计 15 分钟）
- 为每个端点编写测试
- 覆盖边界情况

## 任务 5：启动服务器并验证（预计 5 分钟）
- 运行测试
- 手动测试 API

验收标准：
- 所有测试通过
- curl 测试每个端点正常
```

#### executing-plans（执行计划）

这个技能批量执行计划，并在每个检查点暂停确认。

**使用示例**：

```
执行上面的计划，每完成一个任务暂停一下
```

Claude 会：
1. 完成任务 1，然后暂停：`✅ 数据库 schema 完成，继续吗？`
2. 你确认后完成任务 2，再次暂停
3. 以此类推

这让你可以在每个阶段检查方向是否正确，避免跑远了才发现错了。

#### dispatching-parallel-agents（并行代理调度）

这个技能可以同时启动多个子代理并行工作。

**使用场景**：当你需要同时处理多个独立任务时。

```
用并行代理同时完成：
- 代理 A：编写后端 API
- 代理 B：编写前端组件
- 代理 C：编写测试
```

每个代理在自己的隔离环境中工作，互不干扰。

#### subagent-driven-development（子代理驱动开发）

这个技能为每个小任务启动一个独立的子代理。

**优势**：
- 每个子代理有独立的上下文
- 任务失败不会影响其他任务
- 可以并行执行多个任务

#### using-git-worktrees（使用 Git Worktrees）

这个技能使用 Git 的 worktree 功能创建隔离的开发环境。

**好处**：
- 多个功能可以并行开发
- 每个 worktree 是独立的
- 不会互相冲突

### 👀 代码审查类技能

#### requesting-code-review（请求代码审查）

当你完成代码后，这个技能会自动请求代码审查。

```
完成功能后自动触发代码审查
```

#### receiving-code-review（接收代码审查）

这个技能定义了如何接收和处理审查反馈。

**审查流程**：
1. 提交代码
2. 自动触发审查
3. 审查者检查代码质量、安全性、测试覆盖率
4. 提出改进建议
5. 修复问题
6. 重新审查直到批准

---

## Superpowers 完整工作流程

Superpowers 的真正威力在于将多个技能组合成完整的开发流程。

### 标准开发流程

```
1. Brainstorming（头脑风暴）
   ↓ 通过问答澄清真实需求

2. Design Document（设计文档）
   ↓ 分块展示设计，等待确认

3. Writing Plans（编写计划）
   ↓ 分解为 2-5 分钟的小任务

4. Subagent Development（子代理开发）
   ↓ 每个任务启动独立子代理
   ↓ 两阶段审查：规格符合性 + 代码质量

5. TDD（测试驱动开发）
   ↓ 强制 RED-GREEN-REFACTOR

6. Code Review（代码审查）
   ↓ 质量把关

7. 完成
```

### 实战案例：用 Superpowers 构建用户认证系统

让我们通过一个完整的例子来体验 Superpowers 的工作流程。

#### 第一步：Brainstorming 澄清需求

```
我需要一个用户认证系统
```

Claude 会问你：
- Web 应用还是移动应用？
- 支持哪些登录方式？
- 需要密码重置吗？
- 需要"记住我"功能吗？
- ...

#### 第二步：生成设计文档

确认需求后，Claude 会生成设计文档：

```markdown
# 用户认证系统设计

## 功能需求
1. 用户注册（邮箱 + 密码）
2. 用户登录
3. 密码重置（邮件）
4. 记住我（JWT + Refresh Token）

## 技术选型
- 后端：Node.js + Express
- 数据库：SQLite
- 认证：JWT
- 加密：bcrypt

## API 设计
- POST /api/auth/register
- POST /api/auth/login
- POST /api/auth/refresh
- POST /api/auth/reset-password
```

#### 第三步：编写实现计划

```
用 writing-plans 制定实现计划
```

Claude 会生成详细的任务列表，每个任务 2-5 分钟可完成。

#### 第四步：执行开发

```
用 TDD 方式执行上面的计划
```

Claude 会：
1. 先写测试
2. 确认测试失败（RED）
3. 写实现代码
4. 确认测试通过（GREEN）
5. 重构代码（REFACTOR）

#### 第五步：代码审查

完成后自动触发代码审查，检查：
- 代码质量
- 安全性（SQL 注入、XSS 等）
- 测试覆盖率
- 文档完整性

---

## Superpowers vs 直接使用 Claude Code

| 维度 | 直接使用 Claude Code | 使用 Superpowers |
|------|---------------------|-----------------|
| **需求澄清** | AI 直接开始写代码 | 苏格拉底式提问澄清需求 |
| **开发流程** | 随 AI 自由发挥 | 强制 TDD 红绿重构 |
| **任务管理** | 一次性完成 | 分解为小任务，带检查点 |
| **代码质量** | 依赖 AI 判断 | 强制代码审查 |
| **可预测性** | 结果不稳定 | 流程可重复 |
| **适用场景** | 简单任务、原型验证 | 复杂项目、生产代码 |

### 形象比喻

如果把 Claude Code 比作一个"聪明的实习生"：

- **直接使用**：告诉实习生"做一个登录功能"，他直接开始写，可能做出你觉得不对的东西
- **使用 Superpowers**：给实习生配备一位资深导师，导师会问清楚需求、制定计划、检查代码质量

---

## 安装与配置详解

### 方法一：通过 Marketplace（推荐）

```bash
# 添加 marketplace
/plugin marketplace add obra/superpowers-marketplace

# 安装
/plugin install superpowers@superpowers-marketplace

# 验证安装
/skills
```

### 方法二：手动克隆

```bash
# 创建目录
mkdir -p ~/.claude/skills

# 克隆仓库
git clone https://github.com/obra/superpowers.git ~/.claude/skills/superpowers
```

### 方法三：项目级别安装

如果你想在特定项目中使用 Superpowers：

```bash
# 在项目根目录
mkdir -p .claude/skills

# 克隆或复制 superpowers
cp -r ~/.claude/skills/superpowers .claude/skills/
```

这样团队成员可以共享相同的 Superpowers 配置。

---

## 常用技能速查表

| 技能名称 | 功能 | 使用场景 |
|---------|------|---------|
| `brainstorming` | 苏格拉底式提问澄清需求 | 需求不明确时 |
| `writing-plans` | 分解任务为小步骤 | 大项目开始前 |
| `executing-plans` | 执行计划并检查点 | 按计划开发时 |
| `test-driven-development` | TDD 红绿重构循环 | 所有功能开发 |
| `systematic-debugging` | 四阶段根因分析 | 出现 bug 时 |
| `verification-before-completion` | 完成前验证 | 任务结束时 |
| `requesting-code-review` | 请求代码审查 | 提交代码前 |
| `subagent-driven-development` | 子代理驱动开发 | 并行任务 |
| `using-git-worktrees` | Git worktree 隔离 | 并行开发功能 |

---

## 最佳实践

### 1. 明确触发关键词

Superpowers 的技能是通过关键词触发的，了解常用触发词：

| 技能 | 触发关键词 |
|------|-----------|
| `test-driven-development` | "TDD"、"测试驱动"、"先写测试" |
| `brainstorming` | 需求模糊时自动触发 |
| `systematic-debugging` | "调试"、"bug"、"不工作" |
| `writing-plans` | "制定计划"、"规划" |

### 2. 需要流程纪律时用 Superpowers

- 生产级代码开发 → 提到 "TDD"
- 需求不明确时 → 让 `brainstorming` 帮你澄清
- 复杂项目 → 用 `writing-plans` 分解任务

### 3. 简单任务不必强求

如果是快速原型或一次性脚本，不需要强制走完整流程。Superpowers 适合需要长期维护的代码。

### 4. 技能可以组合使用

```
用 TDD 方式实现用户认证，完成后帮我做代码审查
```

这会同时触发 `test-driven-development` 和 `code-review` 技能。

---

## 常见问题

### Q1：用 Superpowers 必须指定 "TDD" 吗？

**不是必须的**。

Superpowers 是技能集合，每个技能有自己的触发条件：
- 说 "用 TDD 方式" → 触发 `test-driven-development`
- 不说 TDD → Claude 可能写测试，也可能不写（取决于模型本身）

Superpowers 的作用是**强化流程纪律**，而不是凭空创造能力。

### Q2：Superpowers 会让开发变慢吗？

初期可能会感觉慢，因为：
- 需要时间澄清需求
- 要先写测试再写代码
- 要经过代码审查

但长期来看，由于减少了返工和 bug，整体效率更高。

### Q3：小项目也需要 Superpowers 吗？

对于原型验证或非常简单的任务，可以直接使用 Claude Code。Superpowers 更适合：
- 生产级项目
- 多人协作项目
- 需要长期维护的项目

### Q4：Superpowers 和 Skills 有什么区别？

| 维度 | Superpowers | Skills |
|------|-------------|--------|
| **本质** | 完整的开发方法论框架 | 可复用的技能包 |
| **范围** | 覆盖整个开发流程 | 聚焦特定功能 |
| **关系** | Superpowers 内部使用 Skills | Superpowers 是 Skills 的集合 |

### Q5：可以自定义 Superpowers 技能吗？

可以！Superpowers 是开源的，你可以：
1. Fork 仓库
2. 修改现有技能
3. 添加新的技能
4. 贡献回社区

---

## 参考资料

### 官方资源

- [obra/superpowers GitHub](https://github.com/obra/superpowers) - 官方仓库（50,000+ ⭐）
- [Superpowers 详细用法教程](https://www.cnblogs.com/gyc567/p/19510203) - 中文详细教程
- [Superpowers 环境配置指南](https://m.blog.csdn.net/gitblog_00683/article/details/144768992) - 配置指南

### 社区资源

| 仓库 | 说明 |
|------|------|
| [affaan-m/everything-claude-code](https://github.com/affaan-m/everything-claude-code) | 综合工具包，包含 TDD 工作流 |
| [shanraisshan/claude-code-best-practice](https://github.com/shanraisshan/claude-code-best-practice) | 官方最佳实践 |

### 相关文章

- [告别 Vibe Coding！用 Superpowers 让 Claude Code 写出工程级代码](https://juejin.cn/post/7593573617648123956)
- [我如何用 Superpowers MCP 强制 Claude Code 在编码前进行规划](https://juejin.cn/post/7570341520551673871)
- [Claude Code + Superpowers 保姆级入门教程](https://juejin.cn/post/7594832320030638123)

---

## 总结

Superpowers 是一组**工程级开发技能集合**，让 Claude Code 从"聪明的实习生"变成"有纪律的开发团队"。

### 核心要点

1. **Superpowers 是技能集合，不是魔法**
   - 安装后，技能在后台可用
   - 通过关键词或场景触发
   - 可以手动调用特定技能

2. **记住关键触发词**
   - 想要 TDD → 说 "用 TDD 方式"
   - 需求模糊 → `brainstorming` 会主动提问
   - 出现 bug → 提到 "调试" 触发 `systematic-debugging`

3. **适用场景**
   - ✅ 生产级代码开发
   - ✅ 需要长期维护的项目
   - ✅ 团队协作项目
   - ❌ 快速原型（可选）
   - ❌ 一次性脚本（可选）

记住：**Superpowers 不让 AI 更聪明，而是让 AI 更有纪律。**
