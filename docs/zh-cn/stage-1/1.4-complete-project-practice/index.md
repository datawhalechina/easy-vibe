---
title: '完整项目实战 - 从 Demo 到产品级原型'
description: '走出 Demo 阶段，学习如何完善产品链路、构建逼真的模拟数据、通过反馈快速迭代，最终完成一个可展示、可交互的完整 AI 产品原型。'
---

<script setup>
const duration = '约 <strong>3 天</strong>'
</script>

# 初级五：完整项目实战

## 章节导读

<ChapterIntroduction :duration="duration" :tags="['产品思维', '模拟数据', '交互完善', 'LocalStorage']" coreOutput="1 个功能完备的 AI 产品原型" expectedOutput="包含完整链路与真实数据的 Web 应用">

在前面的课程中，你已经完成了“业务分析”、“原型搭建”和“AI 能力接入”。现在的你，手中应该有一个能跑通基本流程的 Demo。

但 Demo 和真正的“产品”之间，还隔着一条鸿沟：
- 页面是不是一刷新就没了？
- 报错的时候是不是直接白屏？
- 列表里是不是只有一条“测试数据”？
- 用户点错了有没有后悔药（撤销/删除）？

本章我们将进行最后的冲刺，把手中的 Demo 打磨成一个**“拿得出手”的完整产品原型**。我们将学习如何补全缺失的链路、如何用 AI 生成逼真的模拟数据，以及如何通过快速反馈来迭代产品。

</ChapterIntroduction>

<div style="margin: 50px 0;">
  <ClientOnly>
    <StepBar :active="0" :items="[
      { title: '完善链路', description: '从单点功能到完整闭环' },
      { title: '注入灵魂', description: '模拟真实业务数据' },
      { title: '反馈迭代', description: '基于真实反馈修补体验' },
      { title: '最终大作业', description: '你的毕业设计' }
    ]" />
  </ClientOnly>
</div>

## 1. 拒绝 "Happy Path"：完善核心链路

很多初学者做原型，往往只做“Happy Path”（最理想的路径）：用户点击 -> API 响应成功 -> 显示结果。
但在真实世界里，事情往往没那么顺利。为了让你的原型看起来像个真正的产品，你需要考虑以下几个“隐形”的环节。

### 1.1 增加“等待”与“反馈”
当用户点击“生成文案”时，AI 往往需要几秒钟才能响应。如果界面毫无反应，用户会以为程序坏了。
**你需要让 AI IDE 帮你加上 Loading 状态：**

> 提示词示例：
> “当我点击生成按钮时，请把按钮变成‘生成中...’并不可点击，同时在右侧区域显示一个加载动画。直到 API 返回结果后，再恢复正常。”

### 1.2 处理“失败”与“异常”
API Key 可能会过期，网络可能会断开。
**你需要让 AI IDE 帮你处理报错：**

> 提示词示例：
> “如果 API 请求失败了，不要直接在控制台报错，请在页面顶部弹出一个红色的提示框（Toast），告诉用户‘生成失败，请稍后重试’，并允许用户重新点击生成。”

### 1.3 对话历史持久化
在与 AI 交互的过程中，我们需要保存对话内容，让用户能够回顾历史、继续之前的交流。目前阶段我们暂不引入数据库，可以选择以下轻量级方案：

**存储方案选择：**

| 方案 | 适用场景 | 特点 |
|------|---------|------|
| **LocalStorage** | 纯前端项目，用户数据保存在浏览器 | 实现简单，刷新不丢失，无法跨设备同步 |
| **JSON 文件** | 本地原型，数据以文件形式存储 | 结构清晰，便于调试，可手动编辑 |
| **TXT 文件** | 最简方案，快速记录文本内容 | 格式自由，兼容性好 |

**对话内容示例：**
保存的对话历史通常包含以下内容：

```json
[
  {
    "role": "user",
    "content": "帮我生成一款蓝牙耳机的抖音带货文案",
    "timestamp": "2026-01-20 10:30:00"
  },
  {
    "role": "assistant",
    "content": "【蓝牙耳机种草文案】\n\n🎧 告别延迟，沉浸式听歌体验\n\n姐妹们！这款蓝牙耳机真的太绝了👇\n\n✅ 40dB主动降噪，瞬间进入音乐世界\n✅ 30小时超长续航，一周通勤不用充电\n✅ 通话清晰如面对面，地铁嘈杂也能聊\n✅ 半入耳设计，久戴不痛不闷耳\n\n💰 限时优惠，点击下方链接入手！",
    "timestamp": "2026-01-20 10:30:05"
  }
]
```

**实现提示词：**

> “请帮我实现对话历史的保存功能。支持将用户和 AI 的对话记录保存为 JSON 文件（或使用 LocalStorage）。每次进入页面时自动加载历史对话，支持查看和删除单条对话记录。”

<div style="margin: 50px 0;">
  <ClientOnly>
    <StepBar :active="1" :items="[
      { title: '完善链路', description: '从单点功能到完整闭环' },
      { title: '注入灵魂', description: '模拟真实业务数据' },
      { title: '反馈迭代', description: '基于真实反馈修补体验' },
      { title: '最终大作业', description: '你的毕业设计' }
    ]" />
  </ClientOnly>
</div>

## 2. 注入灵魂：模拟真实数据 (Mock Data)

一个空荡荡的页面是无法打动人的。想象一下，你向别人展示“电商工作台”，结果商品列表里空空如也，或者只有一行 "test / test / test"。
为了让演示效果最佳，我们需要“伪造”一些逼真的数据。

### 2.1 让 AI 生成 Mock 数据
你不需要手动去编造数据。利用我们学过的 AI 能力，让它帮你生成一份 JSON 数据。

**操作步骤：**
1. 告诉 AI 你的数据结构（或者把代码发给它）。
2. 让它生成 10-20 条逼真的模拟数据。

> 提示词示例：
> “我正在做一个抖音电商的工作台，请帮我生成 10 条模拟的商品历史记录。包含：商品图 URL（找一些真实的占位图，如使用 Unsplash 的图片）、商品标题（要像真实的淘宝/抖音商品标题）、生成的文案、创建时间。请直接给我一个 JavaScript 数组。”

### 2.2 预埋数据到原型中
拿到数据后，让 AI IDE 帮你把它“塞”进代码里。

> 提示词示例：
> “请在页面初始化时，检查如果没有历史记录，就默认加载这 10 条模拟数据，让页面看起来丰富一点。”

### 2.3 使用在线预设数据源
除了让 AI 生成，你还可以利用一些现成的 Mock 数据服务或库（如果你想让原型更专业）：
- **Faker.js**: 一个专门生成假数据的库（可以让 AI 帮你安装和使用）。
- **Picsum Photos**: 自动生成占位图片。例如 `<img src="https://picsum.photos/200/300" />` 会每次给你一张随机图。

**技巧：**
在演示时，一个填满真实感数据的列表，能让观众瞬间代入场景，忽略掉“这只是个原型”的事实。

<div style="margin: 50px 0;">
  <ClientOnly>
    <StepBar :active="2" :items="[
      { title: '完善链路', description: '从单点功能到完整闭环' },
      { title: '注入灵魂', description: '模拟真实业务数据' },
      { title: '反馈迭代', description: '基于真实反馈修补体验' },
      { title: '最终大作业', description: '你的毕业设计' }
    ]" />
  </ClientOnly>
</div>

## 3. 收集反馈与快速迭代

闭门造车是做不出好产品的。现在你的原型已经具备了“核心功能”+“完整链路”+“演示数据”，是时候拿给别人看了。

### 3.1 找谁测？怎么测？
*   **找朋友/同事**：不需要他们懂技术，只需要让他们试着用一下。
*   **观察而非引导**：不要说“点这里”，而是看他们会点哪里。如果他们找不到按钮，说明设计有问题。
*   **“Wizard of Oz” (绿野仙踪法)**：如果你的 AI 还没接好，你可以人工在后台（或数据库）手动修改数据来模拟 AI 的返回，先验证用户是否需要这个功能。

### 3.2 面对 Bug 和 吐槽
*   **样式错乱**：不同屏幕尺寸下可能会乱。
    *   **Action**: 截图发给 AI IDE -> “在这个屏幕宽度下乱了，帮我修一下。”
*   **操作别扭**：“这个流程太繁琐了”。
    *   **Action**: 把建议告诉 AI IDE -> “用户觉得先上传再生成太慢，能不能改成一键生成？”
*   **需求新增**：“如果有这个功能就好了”。
    *   **Action**: 评估是否核心，如果是，让 AI 快速实现一个简化版。

**记住：在这个阶段，AI 是你最好的修改助手。你只需要负责发现问题，代码修改交给它。**

<div style="margin: 50px 0;">
  <ClientOnly>
    <StepBar :active="3" :items="[
      { title: '完善链路', description: '从单点功能到完整闭环' },
      { title: '注入灵魂', description: '模拟真实业务数据' },
      { title: '反馈迭代', description: '基于真实反馈修补体验' },
      { title: '最终大作业', description: '你的毕业设计' }
    ]" />
  </ClientOnly>
</div>

## 4. 🎓 阶段大作业：完成你的“毕业设计”

恭喜你！你已经走完了从“需求”到“原型”再到“AI 集成”的全过程。现在，是时候展示你的最终成果了。

**本次大作业不再局限于“电商素材工作台”**。你需要结合自己的兴趣或行业背景，打造一个独一无二的 AI 产品原型。

### 选题与要求

你需要从 **[产业多分类场景方向参考](../appendix-industry-scenarios/index.md)** 中选择一个最接近的场景，或者根据自己的想法构思一个全新的场景。

**项目必须综合运用前几节课学到的所有内容：**
1.  **原型的构建**：使用前端技术搭建美观、易用的界面。
2.  **需求的控制**：不求大而全，但求核心功能逻辑闭环。
3.  **API 的接入**：接入真实的 AI 模型（LLM/VLM 等），赋予应用真正的智能。
4.  **实现一个可玩的应用**：不仅仅是静态页面，而是有数据流转、有交互反馈的动态应用。

### 作业产出

最终你需要提交以下两样内容：

1.  **一个完整的原型应用**：部署上线或本地可运行，具备完整的使用链路。
2.  **30 秒的演示视频**：录制一段视频，简要介绍你的应用场景，并演示核心功能的实际操作。

<el-card shadow="hover" style="margin: 20px 0; border-radius: 12px;">
  <template #header>
    <div style="font-weight: bold; font-size: 16px;">🚀 最终挑战清单</div>
  </template>

  <p>
    这是 Stage 1 的最后一战。请按照以下清单检查你的作品：
  </p>

  <div style="font-weight: bold; margin-bottom: 10px;">核心功能自检</div>
  <ul style="list-style-type: none; padding-left: 0;">
    <li><label><input type="checkbox" disabled /> <strong>场景明确</strong>：选定了一个具体的行业或应用场景</label></li>
    <li><label><input type="checkbox" disabled /> <strong>逻辑闭环</strong>：核心流程能跑通，不仅仅是 Happy Path</label></li>
    <li><label><input type="checkbox" disabled /> <strong>AI 驱动</strong>：真实调用了大模型 API，而非预设回复</label></li>
    <li><label><input type="checkbox" disabled /> <strong>体验完整</strong>：包含 Loading、错误处理及模拟数据</label></li>
  </ul>

  <div style="font-weight: bold; margin: 20px 0 10px;">交付物准备</div>
  <ul style="list-style-type: none; padding-left: 0;">
    <li><label><input type="checkbox" disabled /> <strong>原型应用</strong>：代码已完成并可运行</label></li>
    <li><label><input type="checkbox" disabled /> <strong>演示视频</strong>：30 秒左右，清晰展示核心亮点</label></li>
  </ul>
</el-card>

## 下一步

完成大作业后，你已经具备了“独立开发 AI 应用原型”的能力。
在接下来的 Stage 2 中，我们将深入更复杂的全栈开发，学习如何把这个原型变成一个真正能上线、有数据库、有用户系统的商业级应用。

让我们在下一阶段见！
