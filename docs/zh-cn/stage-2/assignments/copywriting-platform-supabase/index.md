# 大作业 1：第一个 SaaS 全栈应用——文案生成网站

第一次做全栈网站，最容易卡住的地方往往不是代码，而是**不知道该做什么**。

题目太大，功能太散，做到一半发现根本收不住。

所以这次换个思路：不给开放题，直接给你一个明确的方向——做一件完整但不复杂的事。

::: tip 🎯 这次做什么？
打造一个 **AI 营销文案工作台**。用户登录后填写产品信息，一键生成营销文案，自动保存历史记录。需要更多生成次数？升级套餐即可。管理员可在后台查看所有用户、生成记录和支付情况。
:::

<div style="margin: 32px 0;">
  <ClientOnly>
    <StepBar :active="0" :items="[
      { title: '定主题', description: '先把网站的页面和功能定下来' },
      { title: '搭前台', description: '首页、登录、工作台先做出来' },
      { title: '接后端', description: '数据库、生成、支付接起来' },
      { title: '做后台与交付', description: '管理台、部署、演示材料补齐' }
    ]" />
  </ClientOnly>
</div>

## 为什么选这个题目？

因为它恰到好处——**涵盖了现代网站该有的所有要素，又不会复杂到失控**。

- **前台有实际用途**：不是摆设，用户真的来解决问题
- **用户系统有登录权限**：区分访客与注册用户
- **核心功能是"生成"**：调用 AI 动态产出内容，而非展示静态页面
- **数据持久化**：生成结果存入数据库，随时可查
- **付费机制**：看起来像正经 SaaS，而非玩具项目
- **管理后台**：体验管理员视角，掌控全局

难度适中：不会简单到只有一个表单，也不会复杂到做一周还找不着北。

## 1. 定主题：先搞清楚要做什么

网站名称：**LaunchKit**

定位：AI 营销文案工作台

目标用户：独立开发者、小商家、内容运营者，以及想快速搞定 Landing Page 的人。

他们来这里不是为了闲聊——就是想**快速拿到能用的营销文案**。

### 核心功能

别想太复杂，核心就一件事：

**用户输入**：产品名、一句话介绍、目标用户、3 个卖点、投放渠道

**系统输出**：主标题、副标题、CTA 按钮文案、3 版短文案、1 版长文案

生成结果自动存入账户，下次登录随时查看。

### 页面规划

按这 6 个页面来做：

| 页面 | 路径 | 说明 |
|------|------|------|
| 首页 | `/` | 清晰传达产品价值，放置注册/登录入口 |
| 登录页 | `/login` | 简洁的登录表单 |
| 注册页 | `/register` | 简洁的注册表单 |
| 工作台 | `/dashboard` | 填写信息、生成文案、查看结果 |
| 套餐页 | `/billing` | 展示免费版与 Pro 版，跳转 Stripe 付款 |
| 管理后台 | `/admin` | 管理员查看用户、生成记录、支付状态 |

### 数据模型

三张核心表足够：

```sql
profiles (
  id uuid primary key,
  email text,
  role text,         -- user / admin
  plan text,         -- free / pro
  created_at timestamptz
)

generations (
  id uuid primary key,
  user_id uuid,
  product_name text,
  target_channel text,
  input_payload jsonb,
  result_payload jsonb,
  created_at timestamptz
)

subscriptions (
  id uuid primary key,
  user_id uuid,
  stripe_customer_id text,
  stripe_subscription_id text,
  plan text,
  status text,
  created_at timestamptz
)
```

到这一步，整个网站的骨架已经清晰。

<div style="margin: 32px 0;">
  <ClientOnly>
    <StepBar :active="1" :items="[
      { title: '定主题', description: '先把网站的页面和功能定下来' },
      { title: '搭前台', description: '首页、登录、工作台先做出来' },
      { title: '接后端', description: '数据库、生成、支付接起来' },
      { title: '做后台与交付', description: '管理台、部署、演示材料补齐' }
    ]" />
  </ClientOnly>
</div>

## 2. 搭前台：先把页面做出来

这一步先别碰数据库，也别急着接支付——**先把前台骨架搭起来**。

### 技术栈

- **Next.js App Router** —— 现代 React 框架
- **TypeScript** —— 类型安全
- **Tailwind CSS** —— 原子化样式
- **shadcn/ui** —— 精致组件库
- **Supabase** —— 后端服务
- **Stripe** —— 支付处理

这套组合是目前 AI IDE 最擅长的技术栈，也最符合现代 SaaS 的审美。

### 第一步：搭建项目骨架

把下面这段提示词丢给 Trae / Cursor / Claude Code：

```text
请帮我创建一个现代 SaaS 网站，名字叫 LaunchKit。

技术栈要求：
- Next.js App Router
- TypeScript
- Tailwind CSS
- shadcn/ui

页面清单：
1. 首页 /
2. 登录页 /login
3. 注册页 /register
4. 用户工作台 /dashboard
5. 套餐页 /billing
6. 管理后台 /admin

请先只做前端结构，不接数据库。

要求：
- 首页要有现代 AI SaaS 落地页的气质
- 登录和注册页保持简洁
- Dashboard 左侧表单，右侧结果展示
- Billing 页面展示 free 和 pro 两个套餐
- Admin 页面先做后台框架：侧边栏、顶部栏、表格区域
- 使用 shadcn/ui 组件
- 页面风格要像真实产品，不要像课堂 demo
```

### 第二步：完善工作台细节

第一版页面完成后，继续补充：

```text
请继续完善 /dashboard 页面。

这是一个 AI 营销文案工作台。

左侧表单字段：
- 产品名
- 一句话介绍
- 目标用户
- 3 个卖点
- 投放渠道（官网、朋友圈、小红书、抖音、邮件）

右侧结果区域预留：
- 主标题
- 副标题
- CTA
- 3 版短文案
- 长文案

先用 mock 数据跑通交互。

要求：
- 点击"生成文案"后有 loading 状态
- 结果区域设计空状态
- 响应式布局，宽屏窄屏都能正常显示
```

### 遇到阻碍？

回头看看这几篇：

- [构建第一个现代应用程序 - UI 设计](../../frontend/2.2-ui-design/)
- [参考 UI 设计规范设计页面和按钮](../../frontend/2.3-multi-product-ui/)
- [用 LLM 和 Skills 让界面变好看](../../frontend/2.4-llm-skills-beautiful/)
- [从设计原型到项目代码](../../frontend/2.6-design-to-code/)
- [使用现代组件库更新你的界面](../../frontend/2.7-modern-component-library/)

<div style="margin: 32px 0;">
  <ClientOnly>
    <StepBar :active="2" :items="[
      { title: '定主题', description: '先把网站的页面和功能定下来' },
      { title: '搭前台', description: '首页、登录、工作台先做出来' },
      { title: '接后端', description: '数据库、生成、支付接起来' },
      { title: '做后台与交付', description: '管理台、部署、演示材料补齐' }
    ]" />
  </ClientOnly>
</div>

## 3. 接后端：把数据库、生成、支付串起来

这一步才算真正的"全栈"。

### 第三步：接入 Supabase 登录

```text
请把我当成 0 基础，一步一步带我完成 Supabase 登录接入。

需要你帮我完成：
1. 项目接入 Supabase
2. 实现注册、登录、退出功能
3. 登录成功后跳转到 /dashboard
4. 未登录用户访问 /dashboard、/billing、/admin 时自动跳转 /login
5. 创建 profiles 表
6. 用户注册成功后自动在 profiles 表创建记录
7. profiles 表包含 email、role、plan 字段

实现要求：
- 每步都说明在修改哪些文件
- 密钥不要硬编码
- 需要在 Supabase 后台手动操作的地方请明确标注
- 完成后说明如何验证注册和登录
```

### 第四步：接入生成接口和数据库

```text
请把我当成 0 基础，帮我完成网站的核心功能：生成营销文案并保存。

目标效果：
1. 用户在 /dashboard 填写表单，点击"生成文案"
2. 后端接收：产品名、介绍、目标用户、卖点、投放渠道
3. 后端调用模型生成结果
4. 页面展示生成结果
5. 输入和输出都保存到数据库
6. 用户下次进入可查看历史记录

需要你完成：
- 创建生成接口 /api/generate
- 创建 generations 表
- 设计输入和输出字段
- Dashboard 页面读取当前用户的历史记录

用户体验：
- 按钮 loading 状态
- 生成失败时的错误提示
- 无历史记录时的空状态

完成后请说明：
- 前端页面文件位置
- 后端接口文件位置
- 数据写入数据库的逻辑位置
- 如何测试完整生成链路
```

### 第五步：接入 Stripe 付费

```text
请把我当成 0 基础，帮我给 LaunchKit 加上最简可用的 Stripe 付费。

不需要复杂系统，先跑通最基本的付费链路。

需要你完成：
1. /billing 页面展示 free 和 pro 两个套餐
2. 用户点击升级后跳转 Stripe Checkout
3. 支付成功后返回网站
4. 支付结果保存到 subscriptions 表
5. 同步更新 profile.plan 字段
6. free 用户每日限 3 次生成，pro 用户不限

实现原则：
- 先跑通主流程，暂不考虑复杂边界
- 需要在 Stripe 后台配置的地方请写清楚
- 完成后说明如何测试完整支付流程
```

### 第六步：搭建管理后台

```text
请把我当成 0 基础，帮我做一个简洁可用的管理后台。

仅限管理员访问。

需要你完成：
1. 仅 role = admin 的用户可访问 /admin
2. 后台包含 3 个 Tab：
   - 用户列表
   - 生成记录
   - 订阅状态
3. 用户列表显示：email、plan、创建时间
4. 生成记录显示：用户、产品名、渠道、创建时间
5. 订阅状态显示：用户、套餐、支付状态

要求：
- 界面简洁清晰
- 使用现有组件库的表格、Tab、Badge
- 完成后说明如何将账号设为 admin
```

### 遇到阻碍？

回头看看这几篇：

- [从数据库到 Supabase](../../backend/2.2-database-supabase/)
- [大模型辅助编写接口代码与接口文档](../../backend/2.3-ai-interface-code/)
- [如何集成 Stripe 等收费系统](../../backend/2.7-stripe-payment/)

<div style="margin: 32px 0;">
  <ClientOnly>
    <StepBar :active="3" :items="[
      { title: '定主题', description: '先把网站的页面和功能定下来' },
      { title: '搭前台', description: '首页、登录、工作台先做出来' },
      { title: '接后端', description: '数据库、生成、支付接起来' },
      { title: '做后台与交付', description: '管理台、部署、演示材料补齐' }
    ]" />
  </ClientOnly>
</div>

## 4. 做后台与交付：真正上线

网站基本成型，最后三件事：

### 4.1 部署

代码推送到 GitHub，部署到公网。

参考：

- [Git 和 GitHub 工作流](../../backend/2.4-git-workflow/)
- [如何部署 Web 应用](../../backend/2.5-zeabur-deployment/)

### 第七步：部署前检查

```text
请把我当成 0 基础，帮我检查项目是否具备部署条件。

检查重点：
- 环境变量是否完整
- 登录回调地址是否正确
- Stripe 支付回调地址是否正确
- 页面是否缺少 loading、空状态、错误提示
- README 是否包含启动说明和部署说明

需要你：
1. 按优先级列出待修复事项
2. 标注哪些必须先修
3. 说明修复后的部署步骤
```

### 4.2 README

至少包含：
- 项目简介
- 核心页面说明
- 技术栈
- 本地启动步骤
- 环境变量清单

### 4.3 演示材料

至少准备：
- 首页截图
- Dashboard 生成截图
- Billing 页面截图
- Admin 后台截图
- 60 秒左右演示视频

## 5. 最终成果

按这篇指南做完，你拿到的不是"练习页"，而是一个**最小但完整的 SaaS 产品**：

- ✅ 现代组件库前端
- ✅ Supabase 数据库与登录
- ✅ 真实 AI 生成功能
- ✅ Stripe 支付系统
- ✅ 管理员后台
- ✅ 可部署上线

这完全够资格作为**第一个全栈作品**。

## 6. 提交前最后检查

<el-card shadow="hover" style="margin: 20px 0; border-radius: 12px;">
  <template #header>
    <div style="font-weight: bold; font-size: 16px;">提交前最后看一眼</div>
  </template>

  <ul style="list-style-type: none; padding-left: 0;">
    <li><label><input type="checkbox" disabled /> 首页、登录页、Dashboard、Billing、Admin 均已完成</label></li>
    <li><label><input type="checkbox" disabled /> 用户可以注册、登录、退出</label></li>
    <li><label><input type="checkbox" disabled /> 生成结果真实写入数据库</label></li>
    <li><label><input type="checkbox" disabled /> 支付主流程已跑通</label></li>
    <li><label><input type="checkbox" disabled /> 管理员可查看用户、生成记录和支付状态</label></li>
    <li><label><input type="checkbox" disabled /> 项目已部署到公网</label></li>
  </ul>
</el-card>

::: tip 🚀 下一篇
完成这个网站后，继续阅读 [大作业 2：现代前端组件库 + Trae 实战](../2.2-modern-frontend-trae/)，把界面质量再提升一层。
:::
