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

上一章接入了 AI 能力，Demo 能跑起来了，但离真正的"产品"还<strong>差得远</strong>：页面一刷新<strong>数据就没了</strong>，报错就<strong>白屏</strong>，列表里只有"测试数据 1、测试数据 2"，用户点错了也<strong>没法撤销</strong>...

这一章要把这些<strong>坑都填上</strong>：我们会<strong>补全产品的完整链路</strong>，用 AI 生成<strong>逼真的业务数据</strong>替代假数据，加上<strong>错误处理和用户反馈</strong>，最后打磨出一个<strong>拿得出手、能给别人演示</strong>的完整原型。

这是初级阶段的<strong>最后一章</strong>，走完这一步，你就完成了从"完全不会编程"到"<strong>能独立做出 AI 产品原型</strong>"的蜕变。

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

| 方案             | 适用场景                         | 特点                                 |
| ---------------- | -------------------------------- | ------------------------------------ |
| **LocalStorage** | 纯前端项目，用户数据保存在浏览器 | 实现简单，刷新不丢失，无法跨设备同步 |
| **JSON 文件**    | 本地原型，数据以文件形式存储     | 结构清晰，便于调试，可手动编辑       |
| **TXT 文件**     | 最简方案，快速记录文本内容       | 格式自由，兼容性好                   |

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

一个空荡荡的页面是无法打动人的。想象一下，你向别人展示“电商素材工作台”，结果历史记录里空空如也，或者只有一行 "test / test / test"。
为了让演示效果最佳，我们需要“伪造”一些逼真的数据，让你的原型看起来像一个已经运营了半年的真实产品。

### 2.1 让 AI 帮你设计数据结构

我们不需要自己去想每一个字段叫什么（比如是叫 `name` 还是 `title`），这件事完全可以交给 AI。

你只需要告诉 AI 你的**业务场景**：

> **提示词示例：**
> “我正在做一个**抖音电商素材工作台**的原型。
> 请帮我设计一个 JSON 数据结构，用来描述一个‘商品任务’。
> 这个任务应该包含：商品的基本信息（名字、类目）、输入的素材（图片链接）、以及 AI 生成的结果（标题、文案、海报图）。
> 请直接给我一个 JSON 示例。”

AI 会根据你的描述，自动帮你构思出类似 `productName`, `generatedContent` 这样的字段。

### 2.2 让 AI 批量生产“逼真”数据

有了数据结构后，下一步就是让 AI 帮你“填空”，生成一批看起来真实的数据。

**提示词技巧：**
你不能只告诉 AI “帮我生成数据”，你需要像给实习生布置任务一样，告诉它**业务背景**和**内容要求**：

- **业务背景**：告诉 AI 我们是做“抖音电商”的，所以商品标题要吸睛（比如“显瘦神器”、“学生党必入”），文案要口语化。
- **图片要求**：为了让原型好看，图片不能是黑白的占位符，最好是随机的彩色风景或实物图。

> **提示词示例：**
> “请基于刚才设计的结构，帮我生成 10 条逼真的模拟数据。
> （备注：不一定要 JSON 格式。如果你正在写前端，可以让它直接生成 JavaScript 数组；如果你用 Python，可以让它生成 List。）
>
> **业务场景要求**：
>
> 1. 假设这是一家综合百货店，商品涵盖‘女装’、‘数码’、‘美妆’三个类目。
> 2. **生成的标题和文案要非常‘抖音风’**：比如标题要包含 Emoji (🔥, ✨)，文案要用‘绝绝子’、‘亲测好用’这种语气。
> 3. **图片字段**：请统一使用 `https://picsum.photos/seed/{random_id}/300/400` 这个格式，确保每张图都不一样。”

**生成的 Mock Data 示例：**

```javascript
export const mockProductTasks = [
  {
    id: 'task_001',
    name: '夏季法式复古碎花裙',
    status: 'completed',
    input: {
      category: '女装',
      features: ['收腰', '显瘦', '气质'],
      originalImage: 'https://picsum.photos/seed/dress_input/300/400'
    },
    output: {
      generatedTitle: '✨谁穿谁好看！这条法式碎花裙真的绝绝子🔥',
      generatedCopy:
        '姐妹们！这条裙子真的太显瘦了！收腰设计绝了，穿上立马有腰身。面料很透气，夏天穿完全不闷。约会逛街首选！👗',
      generatedPosterImage: 'https://picsum.photos/seed/dress_output/300/400'
    },
    createdAt: '2026-01-20T10:00:00Z'
  },
  {
    id: 'task_002',
    name: '超强降噪蓝牙耳机 Pro',
    status: 'completed',
    input: {
      category: '数码',
      features: ['降噪', '超长续航', '低延迟'],
      originalImage: 'https://picsum.photos/seed/tech_input/300/400'
    },
    output: {
      generatedTitle: '🎧 终于被我找到了！这款耳机降噪太强了吧！🔇',
      generatedCopy:
        '戴上它，世界瞬间安静了。音质绝佳，听歌就像在现场。续航也很给力，充一次电用一周！学生党必入！',
      generatedPosterImage: 'https://picsum.photos/seed/tech_output/300/400'
    },
    createdAt: '2026-01-21T14:30:00Z'
  }
  // ... 更多数据
]
```

### 2.3 (进阶) 使用 LocalStorage 实现“假增删改”

如果你希望刚才生成的“模拟数据”不仅能看，还能删、能改，甚至新生成的任务刷新页面后还在，你可以结合 `LocalStorage`。

> **提示词示例：**
> “请帮我实现一个数据存储功能。
>
> 1. 优先从 `localStorage` 读取数据。
> 2. 如果 `localStorage` 为空，则使用刚才生成的 Mock 数据初始化，并将它们存入 `localStorage`。
> 3. 同时帮我写 `addProductTask` 和 `deleteProductTask` 函数，每次操作都要同步更新 `localStorage`。”

通过这一步，你的原型就拥有了“记忆”，用户体验几乎和真产品无异。

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

- **找朋友/同事**：不需要他们懂技术，只需要让他们试着用一下。
- **观察而非引导**：不要说“点这里”，而是看他们会点哪里。如果他们找不到按钮，说明设计有问题。
- **“Wizard of Oz” (绿野仙踪法)**：如果你的 AI 还没接好，你可以人工在后台（或数据库）手动修改数据来模拟 AI 的返回，先验证用户是否需要这个功能。

### 3.2 面对 Bug 和 吐槽

- **样式错乱**：不同屏幕尺寸下可能会乱。
  - **Action**: 截图发给 AI IDE -> “在这个屏幕宽度下乱了，帮我修一下。”
- **操作别扭**：“这个流程太繁琐了”。
  - **Action**: 把建议告诉 AI IDE -> “用户觉得先上传再生成太慢，能不能改成一键生成？”
- **需求新增**：“如果有这个功能就好了”。
  - **Action**: 评估是否核心，如果是，让 AI 快速实现一个简化版。

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
