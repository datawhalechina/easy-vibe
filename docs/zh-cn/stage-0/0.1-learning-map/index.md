---
title: '从创意到 AI 产品 - Easy-Vibe 学习路线图'
description: '学习 AI 编程完整路线图：从零基础到全栈开发。掌握 Vibe Coding、Claude Code、Cursor 等 AI IDE 工具，学会产品思维、全栈开发和 AI 能力集成。'
---

# 从创意到 AI 产品

以前做软件，门槛很高：你要懂编程、懂算法，还得有几年的项目经验。
现在不一样了。只要你有想法，AI 就能帮你写代码。

这是一个巨大的变化：**编程语言正在变成自然语言**。

大语言模型（LLM）的出现，让开发不再是“技术大神的专属”，而是变成了每个人都能上手的工具。曾经最难的是“怎么写代码”，现在最难的是“**你要做什么**”。

> **什么是 Vibe Coding？**
> 简单说，就是“用说话来编程”。 氛围编程的意思是你可以依赖只和 AI 对话，而不是直接写代码的方式，来完成编程项目。

当然，让 AI 写出代码只是第一步。要做出一个真正能用的产品，你还会遇到这些问题：
- 怎么让 AI 写出干净、能维护的代码？
- 怎么把零散的代码拼成一个能跑的应用？
- 怎么让应用真正上线、被人用到？
- 怎么把文本生成、图像识别这些 AI 能力装进你的产品？

这些问题将在这门课中找到答案。

不管你是学生、老师、医生、工人，还是任何一位对技术一窍不通的普通人——不用先学几年编程，两周时间就能做出能跑、能演示的产品原型。

| 你的身份 | 这门课能帮你 |
|---------|-------------|
| 学生 | 作业、比赛、创业，自己动手做项目，不再求人 |
| 职场人 | 把重复工作自动化，提升效率，甚至开发副业 |
| 产品经理 / 设计师 | 想法不再停留在纸面，能快速做出 Demo 给老板/客户看 |
| 创业者 / 中小企业主 | 低成本验证想法，不用花几万块找外包也能做出 MVP |
| 老师 / 教育工作者 | 制作教学工具、课件、自动化出题，提升教学效率 |
| 医生 / 律师 / 专业工作者 | 把专业流程自动化，打造自己的效率工具 |
| 任何人 | 用 AI 解决生活/工作中的具体问题，让不可能变成可能 |

AI 时代，执行力和想法永远比技术更重要。

## 成长路径：从“会用 AI”到“会做 AI 产品”

<div class="stage-intro">
  <div class="stage-card">
    <div class="stage-icon">🎮</div>
    <h3>新手入门</h3>
    <p class="stage-role">体验 AI 编程</p>
    <div class="stage-tags">
      <span>贪吃蛇小游戏</span>
      <span>零基础上手</span>
      <span>Vibecoding 初体验</span>
      <span>几分钟生成</span>
    </div>
  </div>
</div>

<div class="stage-grid">
  <div class="stage-card">
    <div class="stage-icon">🛠️</div>
    <h3>第一阶段</h3>
    <p class="stage-role">产品经理 / 运营</p>
    <div class="stage-tags">
      <span>AI IDE (Cursor/Claude)</span>
      <span>需求拆解 & 原型</span>
      <span>接入 AI 能力</span>
      <span>完整 Demo 开发</span>
    </div>
  </div>
  <div class="stage-card">
    <div class="stage-icon">💻</div>
    <h3>第二阶段</h3>
    <p class="stage-role">初中级开发 / 独立开发者</p>
    <div class="stage-tags">
      <span>Figma 到代码</span>
      <span>Supabase 数据库</span>
      <span>Stripe 支付集成</span>
      <span>Dify 知识库</span>
    </div>
  </div>
  <div class="stage-card">
    <div class="stage-icon">🚀</div>
    <h3>第三阶段</h3>
    <p class="stage-role">高级开发 / 架构师</p>
    <div class="stage-tags">
      <span>Web/小程序/多端</span>
      <span>MCP 高级工具</span>
      <span>RAG & LangGraph</span>
      <span>高级工程师思维</span>
    </div>
  </div>
</div>

<style>
.stage-intro {
  margin: 20px auto;
  max-width: 400px;
}

.stage-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 12px;
  margin: 16px 0;
}

.stage-card {
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  padding: 12px;
  background-color: var(--vp-c-bg-soft);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  height: 100%;
}

.stage-card:hover {
  transform: translateY(-2px);
  background-color: var(--vp-c-bg-mute);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
  border-color: var(--vp-c-brand);
}

.stage-icon {
  font-size: 2rem;
  margin-bottom: 8px;
  line-height: 1;
}

.stage-card h3 {
  margin: 0 0 4px 0 !important;
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.2;
}

.stage-role {
  margin: 0 0 8px 0 !important;
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  font-weight: 500;
}

.stage-tags {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 4px;
}

.stage-tags span {
  font-size: 0.7rem;
  padding: 1px 6px;
  border-radius: 3px;
  background-color: var(--vp-c-bg-alt);
  color: var(--vp-c-text-2);
  border: 1px solid var(--vp-c-divider);
}

.stage-card:hover .stage-tags span {
  background-color: var(--vp-c-bg);
  border-color: var(--vp-c-brand-dimm);
  color: var(--vp-c-brand-dark);
}
</style>

通过这个完整的学习路径，你将获得：

- **Vibe Coding开发能力：** 熟练使用 vibecoding 思维和 AI 编码工具，将开发效率提升数倍。不再需要死记硬背语法，而是学会如何引导 AI 生成高质量代码。
- **全栈开发技能：** 从 UI 设计到前端实现，从数据库设计到 API 开发，从本地开发到云端部署，掌握现代 Web 应用的完整技术栈。
- **AI 能力集成：** 学会调用各类多模态 AI API，将文本、图像、语音等 AI 能力无缝集成到你的应用中，并通过 RAG 等技术构建智能化产品。
- **产品思维与运营能力：** 从用户研究到需求拆解，从 MVP 设计到产品迭代，从支付集成到用户管理，形成完整的产品开发与运营闭环。

# 学完能做什么？

## 第一阶段：做出你的第一个产品原型

这个阶段适合完全没编程基础，或者只会一点点但不太自信的同学。你不用先学一堆理论知识，而是直接跟着做，在做的过程中学会用 AI 工具写代码。

**学完你能**：
- 用 AI 编程工具独立完成一个网页应用
- 把产品想法变成能点击、能交互的原型
- 给原型加上 AI 功能（比如文生图、智能对话）
- 遇到报错知道怎么排查和解决

简单说，就是能做出一个"能跑、能给别人演示"的东西。

我们可以先通过小游戏感受 AI 编程，然后学会用 AI 编程工具帮你写代码、改报错。接着从简单页面开始，逐步做出能交互的多页面应用，再加上文生图、智能对话这些 AI 功能。最后独立完成一个完整项目，让你的创意能够真正拥有落地的可能。

# 为什么要用项目制来训练？

> **现实世界的挑战**
>
> 原因其实很简单：按照大多数同学现在的状态，直接走入职场，很可能会在真实项目和老板 / 客户的“社会毒打”下寸步难行。现实世界更常见的场景是：

> 你的导师 / 老板：我们要做一个 xxx，目标是达到 yyy 的效果。
>
> 文档？现成框架？详细的需求说明？很多时候都不存在。

真实工作中的许多任务，本质上就是在高度不确定的环境下解决从未见过的问题：需求是模糊的，边界是变化的，没人告诉你标准答案，你需要自己查资料、做实验、搭原型、不断迭代，最后给出一个“能跑、能用、能上线”的解决方案。

这门课想做的，就是在一个相对安全的环境里，提前给你一次“模拟社会毒打”：

- 通过看似有一定难度的项目任务，迫使你练习拆解问题、设计方案、自己寻找资料
- 通过不那么“傻瓜化”的脚手架和代码，让你学会阅读、理解和改造一份中大型代码库
- 通过从创意到上线的完整闭环，让你体验真实产品从 0 到 1 的完整过程

短期来看，这种训练确实比较折磨人；但从长期来看，它会极大提高你在求职和职业发展中的竞争力：你会更能扛事儿，更能在不确定环境中找到突破口，也更有能力把 AI 变成真正落地的产品，而不是停留在“玩玩 Demo”阶段。

# 提问的艺术：AI 时代的必备技能

在 AI 时代，提问也属于一种 “基本功”。同一份代码、同一个报错，**你怎么提问，几乎决定了 AI 能给出怎样的答案**：是泛泛而谈，还是一步一步给出可落地的改法。

**养成好习惯**：把“向 AI 提问”当成日常开发流程的一部分：遇到不懂、卡住的问题就立刻问。

## 为什么这是必备技能？

- **现实很少有完整文档**：更多时候你面对的是不清晰的需求、半成品代码、零散的错误信息
- **AI 是你随身的导师 + 同事**：会提问的人，能把它变成“高质量的结对编程”
- **能力上限由沟通决定**：你越能提供关键信息、越能约束输出格式，答案越可用

**常见误区**：只问一句“为啥报错？”通常只能得到一堆猜测。把上下文补齐，才会得到可执行的方案。

## 如何把信息"喂给"AI：截图 vs 复制粘贴

两种方式都可以，但用途不同：

| 方式         | 适用场景                                  | 关键要求                                  |
| ------------ | ----------------------------------------- | ----------------------------------------- |
| **复制粘贴** | 报错堆栈、日志、代码、配置、API 返回      | 尽量完整，不要只截一行关键字              |
| **截图**     | UI 布局问题、交互异常、工具界面找不到按钮 | 截全屏 + 标注重点区域，最好配一句文字说明 |

::: danger ⚠️ 重要前提
**并非所有 AI 都支持图片输入。** 截图沟通需要 AI 具备多模态能力（即能够理解和分析图片）。目前支持图片输入的 AI 包括：Claude (Anthropic)、GPT-4V/GPT-4o (OpenAI)、Gemini (Google)、以及部分国产大模型如通义千问、文心一言等。

**如果你使用的 AI 不支持图片输入**，截图将无法被识别，此时请改用复制粘贴文字的方式沟通。
:::

## 让 AI “解释得很好”的提示词技巧

如果你不是只要答案，而是要“学会”答案。使用类似下面指令能显著提升解释质量：

> **学习型提问示例**
>
> - “请先用 5 句话讲清楚这个概念，再给几个问题提问我验证我理解对了没。”
> - ”请你详细解释一下这个报错信息，我不理解为什么会报错。”

# 坚持了好久还是搞不定，我想放弃了

也许是你坚持的方法不对。不要一个人在黑暗中硬撑，可以来跟作者和助教们聊聊：把你已经尝试过的方法、遇到的具体卡点、和你目前的心理状态，坦诚地说出来。很多时候，只要稍微调整一下方向、补上一个关键知识点，你就能继续往前走。

# 我觉得教程有的设计不合理

欢迎随时联系作者、提交 issue，或者在群里 / 课堂上直接反馈。我们非常希望和你一起把这套教程打磨得越来越好：哪里不清晰、哪里体验不好、哪里让你白费力气，都可以坦诚指出来。越真实、越具体的反馈，越能帮助后来者少踩坑。

# Reference

- [南京大学 计算机科学与技术系 计算机系统基础 课程实验](https://nju-projectn.github.io/ics-pa-gitbook/ics2025/)
