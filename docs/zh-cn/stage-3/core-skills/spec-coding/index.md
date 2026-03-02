# 从 Vibe Coding 到 Spec Coding：AI 编程的进化之路

> "Code is a lossy projection of intent."
> 代码是意图的有损投影。
> —— Sean Grove, OpenAI, AI Engineer World's Fair 2025

## Spec Coding 的核心理念：万物皆 Markdown

在深入 Spec Coding 之前，先理解 Claude Code 的底层哲学：**万物皆 Markdown**。

Claude Code 的设计哲学中，所有过程记载、信息传递、甚至与模型的对话，都可以是 Markdown：

- **CLAUDE.md**：项目规范的 Markdown 文档
- **.claude/rules/**：分层规范的 Markdown 文件集合
- **specs/**：功能需求的 Markdown 描述
- **对话历史**：Claude Code 的对话记录本身就是 Markdown 格式
- **AGENTS.md**：Agent 行为规范的 Markdown 指令

这正是 Spec Coding 的内核：**规范本身就是代码**。当你用 Markdown 写下需求、设计、验收标准时，你已经在写"代码"了——AI 会读取这些 Markdown，然后生成真正的代码实现。

Josh Beckman 对 Grove 演讲的总结一针见血：

> "Software engineering (and lawmaking and legal review) is specification repair."
> 软件工程（以及立法和法律审查）的本质是规范修复。

在 Claude Code 中，这个"规范修复"的过程就是：**修改 Markdown → AI 读取 Markdown → 生成/修改代码 → 验证结果**。整个过程都是 Markdown 驱动的。

---

## 1. Sean Grove 的 "The New Code"：一场改变思维的演讲

2025 年，OpenAI 研究员 **Sean Grove** 在 AI Engineer World's Fair 上发表了一场题为 **"The New Code"** 的演讲，震动了整个开发者社区。他提出了一个颠覆性的观点：**70 年来我们一直在写代码来解决问题，但代码只是意图的有损投影——规范才是真正的"新代码"**。

这场演讲催生了一种新的开发范式：**Spec Coding**（规范编程）——以规范文档而非代码作为开发的核心产物，让 AI 根据规范生成代码。

本文将从 Grove 的演讲出发，带你理解 Spec Coding 的核心思想，回顾 Vibe Coding 的局限，并结合 Claude Code 的实践，展示如何在真实开发中运用这种方法论。

::: info 📚 你将学到

1. 理解 Sean Grove "The New Code" 演讲的关键思想
2. 掌握 Spec Coding 的核心理念和方法论
3. 认识 Vibe Coding 的价值与天花板
4. 学会在 Claude Code 中实践 Spec Coding 工作流
5. 掌握从 Vibe Coding 到 Spec Coding 的渐进式过渡策略

:::

---

## 1. Sean Grove 的 "The New Code"：一场改变思维的演讲

2025 年，OpenAI 研究员 Sean Grove 在 AI Engineer World's Fair 上发表了题为 **"The New Code"** 的演讲。这场演讲被广泛认为是 Spec Coding 运动的思想源头。

Grove 此前创办了 OneGraph（一个 GraphQL 开发工具公司，后被 Netlify 收购），目前在 OpenAI 从事 alignment reasoning 工作——帮助将高层意图转化为可执行的规范和评估标准。

### 1.1 核心论点：代码是意图的有损投影

Grove 演讲的核心概念可以用一句话概括：

> **Code is a lossy projection of intent.**
> 代码是意图的有损投影。

什么意思？当你脑子里有一个想法，把它变成代码的过程中，大量的上下文信息会丢失——**为什么**要这样做、**权衡了哪些方案**、**考虑了什么约束**。最终的代码只保留了"怎么做"，却丢掉了"为什么这样做"。

这就像把一本书压缩成一条推文——信息量大幅缩减，原始意图被严重损耗。

### 1.2 编程的本质是沟通

Grove 提出了一个看似简单却深刻的观点：

> "If you can communicate effectively, you can program."
> 如果你能有效沟通，你就能编程。

他认为，实际编码工作只占开发的 **10-20%**，剩下的 80% 是围绕需求和目标的**结构化沟通**——理解用户要什么、和团队对齐方案、定义验收标准、处理边界情况。

这意味着编程能力的核心不是掌握某种语言的语法，而是**把模糊的意图转化为精确描述的能力**。

### 1.3 写规范的人就是程序员

这是 Grove 最具颠覆性的观点：

> "Whoever writes the spec — be it a PM, a lawmaker, an engineer, a marketer — is now the programmer."
> 无论是产品经理、律师、工程师还是市场人员，写规范的人就是程序员。

随着 AI 越来越擅长把规范转化为代码，**真正的编程工作**从"写代码"变成了"写规范"。谁能最精确地表达意图，谁就是最有价值的"程序员"。

### 1.4 规范拥有类似代码的工具链

Grove 指出，规范可以像代码一样拥有完整的工具链：

> "Specs actually give us a very similar toolchain, but it's targeted at intentions rather than syntax."

- **组合**：规范可以模块化组合，就像代码模块
- **测试**：规范可以嵌入单元测试，验证行为是否符合预期
- **Lint 检查**：可以检测规范中的模糊语言，就像代码 linter 检测语法问题
- **一致性验证**：跨部门的规范可以做一致性检查，类似类型检查器

### 1.5 OpenAI Model Spec：活的证明

Grove 用 OpenAI 自己的 **Model Spec** 文档作为实证。

当 OpenAI 发现模型存在 sycophancy（过度迎合用户）问题时，他们没有重新训练模型，而是**修改了规范文档**。改动自动传播到整个系统，问题得到修正。

这证明了一个关键点：**规范本身可以作为"可执行代码"发挥作用**。修改规范就等于修改行为，不需要碰一行传统代码。

Josh Beckman 对 Grove 演讲的总结一针见血：

> "Software engineering (and lawmaking and legal review) is specification repair."
> 软件工程（以及立法和法律审查）的本质是规范修复。

---

## 2. Spec Coding：规范即代码

### 2.1 什么是 Spec Coding

Spec Coding（规范编程），也叫 Spec-Driven Development（SDD），是一种以**规范文档作为开发核心产物**的方法论。

核心思路：**先写清楚规范，再让 AI 根据规范生成代码。规范是 source of truth，代码只是规范的实现产物。**

Robert C. Martin 在《Clean Code》中的经典论断在 AI 时代被重新激活：

> "Specifying requirements so precisely that a machine can execute them is programming."
> 把需求描述得足够精确以至于机器能执行它——这就是编程。

### 2.2 Vibe Coding vs Spec Coding 对比

| 维度 | Vibe Coding | Spec Coding |
|------|------------|-------------|
| **方式** | 即兴 prompt，逐条迭代 | 先写完整规范，再生成代码 |
| **适用场景** | 原型、hackathon、探索 | 生产系统、团队协作、企业级 |
| **代码质量** | 快但脆弱 | 结构化、可测试、可审计 |
| **首次通过率** | 不稳定 | 目标 95%+ |
| **可复用性** | 一次性 prompt | 规范可跨项目复用 |
| **安全性** | 容易遗漏 | 从规范层面内建 |
| **文档** | 无或滞后 | 规范即文档，自维护 |
| **团队协作** | 依赖个人 prompt 技巧 | 共享规范，统一标准 |

两者并非对立。Brad Jolicoeur 指出：

> "Clever engineers will even use vibe coding as a first step to generate the initial draft of a specification."
> 聪明的工程师会用 Vibe Coding 作为第一步，生成规范的初始草稿。

### 2.3 Spec Coding 的三层规范结构

Red Hat 的工程师总结了一个实用的三层规范模型：

**第一层：功能规范（What）**

用自然语言描述期望结果，回答"做什么"：

```markdown
## 用户认证功能

### 用户故事
- 作为新用户，我希望能通过邮箱注册账号
- 作为已注册用户，我希望能用邮箱和密码登录
- 作为忘记密码的用户，我希望能通过邮件重置密码

### 验收标准
- 注册时验证邮箱格式和密码强度
- 登录失败 5 次后锁定账号 15 分钟
- 密码重置链接 30 分钟内有效
```

**第二层：语言无关规范（How - 架构层）**

定义数据结构、架构模式、安全要求：

```markdown
## 技术设计

### 数据模型
- users 表：id, email, password_hash, created_at, locked_until
- sessions 表：id, user_id, token, expires_at

### API 设计
- POST /api/auth/register → 201 Created
- POST /api/auth/login → 200 OK + JWT
- POST /api/auth/reset-password → 202 Accepted

### 安全要求
- 密码使用 bcrypt 加密，cost factor ≥ 12
- JWT 有效期 15 分钟，refresh token 7 天
- 所有端点启用 rate limiting
```

**第三层：语言特定规范（How - 实现层）**

版本要求、测试框架、文档标准：

```markdown
## 实现约束

### 技术栈
- Runtime: Node.js 20+
- Framework: Express 5
- ORM: Prisma
- Testing: Vitest

### 代码规范
- 使用 TypeScript strict mode
- 错误处理使用自定义 AppError 类
- 所有 API 端点需要 JSDoc 注释
```

---

## 3. 在 Claude Code 中实践 Spec Coding

理解了理论，接下来看如何在 Claude Code 中落地。Claude Code 的设计哲学天然契合 Spec Coding——它的 `CLAUDE.md`、Rules 目录、`/plan` 命令，本质上都是在做"规范驱动"。

OpenAI 自己用 Codex 构建项目时，也采用了类似的方式：用 `AGENTS.md` 文件作为规范来引导 AI agent。他们的核心经验是——**当 agent 遇到困难时，把它当作信号：找出缺少什么（工具、护栏、文档），然后补充到仓库中**。这和 Spec Coding 的理念完全一致：规范是活的，需要持续演进。

Augment Code 的研究也印证了这一点：**可执行规范之所以保持准确，是因为 AI agent 直接从规范生成代码，形成了一个强制函数——过时的规范会产生坏掉的实现**。这意味着规范不会像传统文档那样腐烂。

### 3.1 第一步：用 CLAUDE.md 建立项目规范

`CLAUDE.md` 就是你项目的"活规范"。每次 Claude Code 启动时都会读取它，相当于给 AI 一份持久的项目说明书。

在前面的 [Claude Code 快速上手核心指南](../basics/) 中，我们学过如何创建 `CLAUDE.md`。在 Spec Coding 的语境下，它的角色更加重要——**它不只是配置文件，而是项目规范的入口**。

LogRocket 的工程师强调：**坚实的上下文对于 AI agent 至关重要，它能防止幻觉和低效**。没有规范的 AI agent 可能会对项目做出大范围的、不受控的修改。`CLAUDE.md` 就是提供这个"坚实上下文"的第一道防线。

```markdown
# 电商项目规范

## 项目定位
面向中小商家的 SaaS 电商平台，支持多店铺、多支付渠道。

## 架构决策
- 前后端分离，API-first 设计
- 后端微服务架构，服务间通过消息队列通信
- 数据库读写分离

## 核心约束
- 所有金额使用整数（分）存储，避免浮点精度问题
- 订单状态机严格遵循：待支付 → 已支付 → 已发货 → 已完成
- 支付相关接口必须幂等
```

Aviator 的团队总结了规范应该捕获的关键信息——这也是你写 `CLAUDE.md` 时应该覆盖的：

- 输入/输出格式和数据类型
- 业务规则和边界情况
- 系统依赖和约束
- 性能和扩展要求
- 错误处理和安全需求

### 3.2 第二步：用 Rules 目录管理分层规范

当项目变大，单个 `CLAUDE.md` 不够用。这时候用 `.claude/rules/` 目录来组织分层规范。

这正是 Augment Code 所说的"可执行规范"理念：**规范不是静态文档，而是 AI agent 直接消费的活的指令**。当你把规范拆分到 Rules 目录中，每个规范文件只在相关文件被编辑时加载，既节省 token 又保证精准。

Tessl 的工程师发现，将需求分解为结构化文档——PRD 定义"做什么和为什么"，技术规范定义"怎么做"——能有效防止 AI 在长对话中"混淆累积"，显著提升输出一致性。

```
.claude/rules/
├── 00-architecture.md      # 架构规范（全局）
├── 01-security.md           # 安全规范（全局）
├── 10-api-design.md         # API 设计规范
├── 11-frontend-patterns.md  # 前端模式规范
├── 12-database.md           # 数据库规范
└── 20-testing.md            # 测试规范
```

每个规范文件可以通过 frontmatter 指定适用范围：

```markdown
---
globs:
  - "src/api/**/*.ts"
  - "src/services/**/*.ts"
---

# API 设计规范

## 路由设计
- RESTful 风格，使用名词复数：/api/v1/orders
- 嵌套资源最多两层：/api/v1/users/123/orders

## 响应格式
- 成功：{ data, pagination? }
- 错误：{ error: { code, message, details? } }

## 必须遵守
- 所有写操作需要认证
- 列表接口必须支持分页
- 敏感操作记录审计日志
```

这样，当 Claude Code 编辑 API 相关文件时，会自动加载这份规范，确保生成的代码符合标准。

### 3.3 第三步：用 /plan 实现 Specify → Plan → Tasks → Implement

Spec Coding 的标准工作流是四阶段循环。GitHub Spec Kit 将其标准化为 Specify → Plan → Tasks → Implement，而 Claude Code 的 `/plan` 命令天然支持这个流程。

SpecThis 的团队强调了一个关键原则：**在 agent 运行之前定义边界——在代码变更之前就知道什么应该改变**。这正是 `/plan` 的价值所在。

**阶段一：Specify（定义规范）**

先写清楚要做什么，不急着写代码：

```
/plan
我需要实现订单退款功能，规范如下：

功能需求：
- 用户可以在发货前申请全额退款
- 发货后 7 天内可以申请退货退款
- 退款需要管理员审批

验收标准：
- 退款金额不能超过订单实付金额
- 退款状态机：申请中 → 审批通过 → 退款中 → 已退款
- 退款完成后恢复库存
- 全程记录操作日志
```

**阶段二：Plan（技术规划）**

Claude 会基于你的规范生成技术方案：

```
📋 退款功能实施计划

1. 数据模型设计
   - 创建 refunds 表
   - 添加订单状态机的退款相关状态

2. API 设计
   - POST /api/orders/:id/refund - 申请退款
   - PUT /api/refunds/:id/approve - 审批退款
   - GET /api/refunds - 退款列表

3. 业务逻辑
   - 退款资格校验
   - 退款金额计算
   - 库存恢复逻辑

4. 集成
   - 对接支付渠道退款接口
   - 发送退款通知
```

**阶段三：Tasks（任务拆解）**

将计划拆分为可独立执行的小任务，每个任务有明确的完成标准。

**阶段四：Implement（逐步实现）**

按任务逐个实现，每完成一个就验证一次。

### 3.4 实战案例：用 Spec Coding 构建用户通知系统

让我们通过一个完整的例子，对比 Vibe Coding 和 Spec Coding 的差异。Orchestrator.dev 的数据显示，2025 Stack Overflow 调查中 84% 的开发者使用或计划使用 AI 工具，但只有 22% 对结果满意，46% 认为准确性有问题。Spec Coding 正是解决这个满意度鸿沟的关键。

**Vibe Coding 方式：**

```
你：做一个通知功能
AI：[直接开始写代码，生成了一个简单的通知列表]

你：要支持已读未读
AI：[修改代码，加了个 read 字段]

你：还要支持不同类型的通知
AI：[又改，加了 type 字段]

你：要能推送到手机
AI：[大改一通，之前的结构不太适配了...]
```

结果：改了 4 轮，架构被反复推翻，代码越来越乱。

**Spec Coding 方式：**

先写规范文档 `specs/notification.md`：

```markdown
# 用户通知系统规范

## 功能需求
1. 支持站内通知、邮件通知、推送通知三种渠道
2. 通知类型：系统公告、订单状态、促销活动、安全提醒
3. 用户可以按渠道和类型配置通知偏好
4. 支持已读/未读状态，支持批量标记已读

## 数据模型
- notifications 表：id, user_id, type, channel, title, content,
  is_read, created_at
- notification_preferences 表：user_id, type, channel, enabled

## API 设计
- GET /api/notifications?type=&is_read= - 获取通知列表（分页）
- PUT /api/notifications/:id/read - 标记已读
- PUT /api/notifications/read-all - 全部标记已读
- GET /api/notification-preferences - 获取偏好设置
- PUT /api/notification-preferences - 更新偏好设置

## 验收标准
- 未读通知数实时更新
- 通知列表支持无限滚动
- 推送通知延迟 < 3 秒
- 偏好设置变更立即生效
```

然后在 Claude Code 中：

```
@specs/notification.md
按照这份规范实现用户通知系统。
先从数据模型开始，然后实现 API，最后做前端组件。
每完成一个模块暂停一下，我确认后再继续。
```

结果：一次到位，架构清晰，不需要反复推翻重来。

### 3.5 结合 Superpowers 强化 Spec Coding

在前面的 [Superpowers 工程级开发](../superpowers/) 章节中，我们学过 Superpowers 的技能体系。Spec Coding 和 Superpowers 是天然的搭档：

| Spec Coding 阶段 | 对应 Superpowers 技能 |
|------------------|---------------------|
| 定义规范 | `brainstorming` — 苏格拉底式提问澄清需求 |
| 技术规划 | `writing-plans` — 将规范拆解为小任务 |
| 逐步实现 | `test-driven-development` — TDD 红绿重构 |
| 质量验证 | `code-review` + `verification-before-completion` |

**组合使用示例：**

```
@specs/notification.md
用 TDD 方式按照这份规范实现通知系统，
完成后帮我做代码审查
```

这条指令同时触发了 Spec Coding 工作流和 Superpowers 的 TDD + Code Review 技能，形成完整的工程级开发流程。

### 3.6 规范的版本控制与持续演进

The Vibe Coding Substack 提出了一个重要观点：**Specs are now code**。既然规范是代码，就应该像代码一样管理：

- **版本控制**：规范文件放在 Git 仓库中，和代码一起提交
- **变更追踪**：每次修改规范都有 commit 记录，知道谁改了什么、为什么改
- **Code Review**：规范的修改也需要 PR 审查，确保团队对齐
- **CI 集成**：规范变更触发自动化测试，验证实现是否仍然符合规范

在 Claude Code 中，这意味着你的 `CLAUDE.md`、`.claude/rules/` 和 `specs/` 目录都应该纳入版本控制。Robomotion 的经验是：**规范和实现一起版本化，防止漂移，保持可审计性**。

OpenAI 的 Harness Engineering 实践也验证了这一点：他们的 `AGENTS.md` 文件本身就是由 Codex 编写的，并且随着项目演进持续更新。当 agent 遇到困难时，修复方案不是改代码，而是**让 Codex 自己更新规范**——形成规范的自我修复循环。

---

## 4. 混合策略：从 Vibe 到 Spec 的渐进式过渡

行业共识并非"抛弃 Vibe Coding"，而是**根据场景选择合适的方式**。

### 4.1 什么时候用 Vibe Coding

- 验证一个想法是否可行（30 分钟内的原型）
- 探索不熟悉的技术或框架
- Hackathon 或内部 demo
- 一次性脚本或工具

### 4.2 什么时候用 Spec Coding

- 生产级功能开发
- 多人协作的项目
- 需要长期维护的代码
- 涉及安全、支付、数据等敏感领域
- API 设计和系统集成

### 4.3 推荐的渐进式工作流

**阶段一：Vibe 探索**

用 Vibe Coding 快速验证想法，不写规范，不管代码质量：

```
做一个简单的通知弹窗，看看效果
```

**阶段二：提炼规范**

验证可行后，把探索中的发现整理成规范。你甚至可以让 AI 帮你：

```
基于我们刚才做的通知功能原型，
帮我整理一份正式的功能规范文档，
包括数据模型、API 设计和验收标准
```

**阶段三：Spec 重建**

基于规范，用 Spec Coding 方式重新实现生产级版本：

```
@specs/notification.md
按照这份规范从零实现，不要参考之前的原型代码
```

这个流程的好处是：**用 Vibe Coding 的速度验证方向，用 Spec Coding 的质量交付产品**。

Robomotion 的总结很到位：

> "The spec is the source of truth. The AI generated output is the draft implementation. Validation is not optional."
> 规范是唯一的真相来源。AI 生成的代码只是草稿实现。验证不是可选的。

---

## 5. 常见问题

### Q1：Spec Coding 会不会太慢了？

写规范确实需要前期投入。但 Greg Ceccarelli 的团队用 Spec Coding 方式，**3 个人在 4 周内交付了一个完整的 macOS 产品**——这在传统开发中几乎不可能。

前期写规范的时间，会在后期通过减少返工、减少 bug、减少沟通成本来回收。

### Q2：规范写多详细才够？

Robomotion 的建议是：**一份高质量的规范可以只有一页**。关键是回答 8 个问题：

1. 我们在自动化什么？
2. 输入是什么？
3. 输出是什么？
4. 约束条件是什么？
5. 失败模式有哪些？
6. 安全要求是什么？
7. 性能要求是什么？
8. 什么测试能证明它工作？

### Q3：AI 只做规范说的事，遗漏了"显而易见"的功能怎么办？

这确实是 Spec Coding 的一个局限。GitHub Spec Kit 的用户反馈：AI 会"exactly and only"做规范里写的事。

解决方法：在规范中加一个"非功能性需求"部分，列出通用期望（错误处理、日志、可访问性等）。或者在 `CLAUDE.md` 中设置全局规则。

### Q4：小项目也需要 Spec Coding 吗？

不需要。Spec Coding 适合：
- 生产级项目
- 多人协作项目
- 需要长期维护的项目

对于快速原型、一次性脚本、学习实验，Vibe Coding 更合适。

### Q5：怎么让团队接受 Spec Coding？

从一个小功能开始试点。让团队看到 Spec Coding 减少返工、提高首次通过率的效果。Stack Overflow 2025 调查显示，84% 的开发者使用或计划使用 AI 工具，但只有 22% 对结果满意——Spec Coding 正是提升满意度的关键。

---

## 6. 总结

从 Vibe Coding 到 Spec Coding，不是一次革命，而是一次进化。

Sean Grove 在 "The New Code" 中说得很清楚：**70 年来我们一直在写代码来解决问题，现在应该写规范来生成代码**。代码是意图的有损投影，而规范才能完整地捕获意图、上下文和约束。

对于使用 Claude Code 的开发者来说，这个转变其实已经在发生：

- 你写的 `CLAUDE.md` 就是项目规范
- 你配置的 Rules 目录就是分层规范
- 你用 `/plan` 做的规划就是 Specify → Plan → Tasks 流程
- 你结合 Superpowers 的 TDD 和 Code Review 就是完整的 Spec Coding 工作流

**关键要点：**

- Vibe Coding 适合探索和原型，Spec Coding 适合生产和协作
- 规范是 source of truth，代码是规范的实现产物
- 写规范的能力 = 编程能力，沟通能力 > 语法能力
- 从小处开始：先把 `CLAUDE.md` 写好，就已经迈出了 Spec Coding 的第一步

::: tip 💡 下一步
在下一章节中，我们将学习如何使用 Claude Code 的 Agent Teams 功能，让多个 AI 实例像真正的开发团队一样协同工作。
:::

---

## 参考资料

### Sean Grove "The New Code" 演讲相关

- [Code is just a lossy projection of intent — The Decoder](https://the-decoder.com/code-is-just-a-lossy-projection-of-intent-according-to-openai-researcher-sean-grove/)
- [The End of Coding? How Specifications Are Becoming the New Source Code — Implicator](https://www.implicator.ai/the-end-of-coding-how-specifications-are-becoming-the-new-source-code/)
- [OpenAI: Intent, Not Code, Drives Future Software Development — AI Tech Suite](https://www.aitechsuite.com/ai-news/openai-intent-not-code-drives-future-software-development)
- [Note on The New Code — Josh Beckman](https://www.joshbeckman.org/notes/914234100)
- [The New Code 演讲完整文字稿](https://lawwu.github.io/transcripts/8rABwKRsec4.html)

### Spec Coding 方法论

- [How spec-driven development improves AI coding quality — Red Hat](https://developers.redhat.com/articles/2025/10/22/how-spec-driven-development-improves-ai-coding-quality)
- [Spec-Driven Development with AI: Complete 2025 Guide — Dplooy](https://www.dplooy.com/blog/spec-driven-development-with-ai-complete-2025-guide)
- [Spec-Driven Development: Building Production-Ready Software with AI — Orchestrator.dev](https://orchestrator.dev/blog/2025-12-16-spec_driven_dev_article)
- [Agents Code but the Problem of Clear Specification Remains — Greg Ceccarelli](https://www.gregceccarelli.com/writing/beyond-code-centric)

### Vibe Coding vs Spec Coding

- [Vibe Coding vs Spec Driven — Cosmo Edge](https://cosmo-edge.com/vibe-coding-vs-spec-driven-ai-development/)
- [Master AI in Software Engineering: Vibe vs. Spec Coding — Brad Jolicoeur](https://bradjolicoeur.com/article/ai-software-engineering-vibe-spec-prompting)
- [From Vibe Coding to Spec-Driven Development — Tessl](https://tessl.io/blog/from-vibe-coding-to-spec-driven-development/)
- [Spec first approach for enterprise — Robomotion](https://robomotion.io/blog/spec-first-approach-the-way-to-adapt-vibe-coding-for-enterprise-work)

### 工具与实践

- [GitHub Spec Kit vs Vibe Coding — Ossels](https://ossels.ai/github-spec-kit-spec-driven-development/)
- [A spec-first workflow for agentic AI — LogRocket](https://blog.logrocket.com/spec-first-workflow-agentic-ai/)
- [Specs Are Now Code — The Vibe Coding Substack](https://thevibecoding.substack.com/p/specs-are-now-code)
- [Harness Engineering — Martin Fowler](https://martinfowler.com/articles/exploring-gen-ai/harness-engineering.html)
- [Spec-Driven Development & AI Agents Explained — Augment Code](https://www.augmentcode.com/guides/spec-driven-development-ai-agents-explained)
- [Spec-Driven Development: The Key to Scalable AI Agents — Aviator](https://www.aviator.co/blog/spec-driven-development/)

