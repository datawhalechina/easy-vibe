# 参考 UI 设计规范设计页面和按钮

很多人说"我想让页面更像 Apple 一点""按钮想做得更高级一点"，但真正开始做时，往往会卡在一个问题上：

**到底该参考什么？**

盯着截图模仿，学到的只是"像不像"。但打开 Apple、Google、Microsoft、Atlassian 的设计规范，你会发现它们真正厉害的地方不是视觉风格，而是**把设计问题讲清楚**：页面先突出什么、按钮如何分级、操作怎么强调——这些判断标准才是核心。

> 参考设计规范，不是为了做得"像谁"，而是学会别人怎么做判断。

:::: info 为什么现在还要学这些
设计规则早已被训练进模型、被设计工具默认吸收，甚至贴几张截图 AI 就能学会。但我们仍然有必要知道这些规则从哪来、为什么这样定。
::::

## 先看几段原文，感受差距

如果你以前觉得“设计规范不就是讲讲风格吗”，先看几条官方原文。

平时我们在团队里经常会这样说：

- 做个下拉框
- 这里放个菜单
- 菜单栏加几个功能
- 这里放两个按钮，一个确认一个取消

听起来没问题，但在大厂规范里，这些词都不是模糊概念，而是被拆得非常细。

| 平时随口说的话 | 官方原文 | 简单说 |
| :--- | :--- | :--- |
| “做个菜单” | Apple: [“A menu reveals its options...”](https://developer.apple.com/design/human-interface-guidelines/menus) | `Menu` 是拿来做操作的 |
| “菜单栏里放功能” | Apple: [“menu bar menus contain all the commands...”](https://developer.apple.com/design/human-interface-guidelines/menus) | 这是应用顶部的命令菜单 |
| “做个下拉框” | Apple: [“A pop-up list lets the user choose one option among several.”](https://developer.apple.com/library/archive/documentation/Cocoa/Conceptual/MenuList/Articles/ManagingPopUpItems.html) | `pop-up` 是从列表里选一个 |
| “也做个下拉框” | Apple: [“A pull-down list is generally used for selecting commands in a specific context.”](https://developer.apple.com/library/archive/documentation/Cocoa/Conceptual/MenuList/Articles/ManagingPopUpItems.html) | `pull-down` 是点开做当前操作 |
| “菜单也能拿来筛选吧” | Fluent: [“If you need to collect information from people, try a select, dropdown, or combobox instead.”](https://fluent2.microsoft.design/components/web/react/core/menu/usage) | `Menu` 不是拿来选值的 |
| “菜单也能当导航吧” | Material: [“Menus should not be used as a primary method for navigation within an app.”](https://m1.material.io/components/menus.html) | `Menu` 不是主导航 |
| “按钮随便写个 OK / Cancel” | Apple: [“Always use ‘Cancel’ to title a button that cancels the alert’s action.”](https://developer.apple.com/design/human-interface-guidelines/alerts) | 按钮文字不能随便写 |

> 表格里的引文都可以直接点击，跳到对应的官方页面。

这就是第一次真正看设计规范时最容易被震到的地方：

> 我们平时以为自己在讨论 UI，实际上很多时候只是在用一堆含糊词交流。

Apple 不会只说“做个菜单”；它会继续区分：

- `menu`
- `menu bar menu`
- `pop-up button`
- `pull-down button`
- `context menu`

Fluent 不会只说“下拉框”；它会继续区分：

- `menu`
- `dropdown`
- `select`
- `combobox`

这就是设计规范的必要性。

它不是为了让页面显得更专业，而是为了让团队在讨论 UI 时，不再每个人脑子里都是不同的东西。

## 你将学到

1. 为什么设计页面和按钮时要先看设计规范
2. Apple、Material、Fluent、Atlassian 这些规范里，哪些内容最值得参考
3. 如何把“页面层级”和“按钮层级”设计清楚
4. 如何让 AI 参考别人的规范来生成页面和按钮

## 1. 设计规范为什么能帮你把页面做清楚

看完上面这些原文，你会发现一个关键点：

**设计规范不是锦上添花，而是在先把词说准。**

很多页面不好看，不是因为配色不够高级，而是因为信息层级混乱。

很多按钮不好用，也不是因为圆角不对，而是因为：

- 主按钮太多，用户不知道该点哪个
- 危险按钮和普通按钮看起来差不多
- 页面里所有按钮都在抢注意力
- 不同页面里的按钮样式和语义不一致

成熟的设计规范，恰好就是在解决这些问题。它们通常会定义：

| 规范内容 | 它解决什么问题 |
| :--- | :--- |
| **页面层级** | 先看哪里、后看哪里，信息怎么组织 |
| **视觉基础** | 颜色、间距、字体、圆角、阴影怎样统一 |
| **按钮层级** | 主按钮、次按钮、文字按钮、危险按钮如何区分 |
| **状态规则** | hover、focus、disabled、loading 怎么表现 |
| **交互语义** | 哪个按钮是“确认”，哪个是“取消”，哪个是“更多操作” |

所以，设计规范真正提供的不是一套“皮肤”，而是一套**判断标准**。

## 2. 参考大厂规范时，重点看什么

### 2.1 参考 Apple：学习“定义得足够细”这件事

Apple 最值得学的，不只是视觉上的克制感，而是它会把概念定义得非常细。

同样是很多团队口中的“菜单”或“下拉框”，Apple 会继续往下拆：

- `menu`：一组命令、选项或状态
- `menu bar menu`：应用级命令集合
- `pop-up button`：选择一个值
- `pull-down button`：在当前上下文里触发命令
- `context menu`：与当前对象或任务相关的常用动作

这套区分非常重要，因为它会直接影响：

- 这个组件是拿来选值，还是拿来做动作
- 它属于页面局部，还是属于应用级
- 它应该长期显示当前选中值，还是只临时展开命令

当你开始按这种粒度思考时，你设计出来的页面就会一下子清楚很多。

### 2.2 参考 Apple：学习页面层级和克制感

Apple Human Interface Guidelines 特别适合学习两件事：

- 页面如何建立清晰层级
- 控件如何在不喧宾夺主的前提下保持明确

Apple 强调 `Hierarchy`、`Harmony`、`Consistency`。这意味着页面设计时要回答：

- 当前页面最重要的信息是什么
- 用户的主要任务是什么
- 哪个操作该最显眼，哪个操作应该退后

如果你参考 Apple 来设计页面，可以重点借鉴：

- 首屏信息不要太碎，核心内容先聚焦
- 用留白、字号、分组建立秩序，而不是靠堆很多边框
- 按钮不要全部高强调，只有关键动作才应该最突出

### 2.3 参考 Material：学习清晰的页面结构

Material Design 很适合学习“页面是怎么组织任务流”的。

它的很多组件和布局规范，核心都在帮助你明确：

- 页面是浏览型，还是执行任务型
- 当前页面是让用户阅读、选择，还是提交
- 一个页面里哪些元素应该稳定重复，哪些元素应该响应上下文变化

如果你参考 Material 来设计页面，可以重点借鉴：

- 页面区块清楚，模块职责明确
- 导航、内容区、操作区分工清晰
- 不同按钮样式对应不同操作优先级

### 2.4 参考 Fluent：学习组件边界和按钮层级

Fluent 2 很适合后台、工具型产品和复杂表单系统。它最值得学的地方，是会直接告诉你“不要混用概念”。

例如它明确写到：如果你要“collect information”，就不要继续用 `menu`，而应该考虑 `select`、`dropdown`、`combobox`。

这句话非常重要，因为它把很多人脑中的“都差不多”打碎了。

Fluent 2 也很重视：

- 操作层级
- 组件语义边界
- 密集信息场景下的清晰度

如果你参考 Fluent 来设计按钮，可以重点借鉴：

- `Primary button` 用来承接当前最重要的动作
- `Secondary button` 用来承接支持性动作
- `Subtle`、`Transparent` 这类弱强调按钮用于不该抢主流程的操作
- 页面里的按钮数量越多，越要控制视觉优先级

### 2.5 参考 Atlassian：学习系统化地管理页面和按钮

Atlassian Design System 特别适合“一个团队做很多页面”的情况。它强调：

- foundations 是共享基础
- tokens 是统一视觉决策的方法
- components 是被反复复用的交互构件

如果你参考 Atlassian 来做页面和按钮，最有价值的是：

- 把按钮尺寸、颜色、圆角、间距做成统一规则
- 把页面布局的节奏固定下来
- 让不同页面虽然内容不同，但结构语言一致

## 3. 设计页面时，应该参考规范里的哪些点

当你看一个设计系统时，不要先问“这个页面好不好看”，而要先问下面几个问题。

### 3.1 页面第一眼，主次是不是明确

一个页面通常至少要有三层：

- **主信息**：当前页面最重要的内容
- **辅助信息**：帮助理解或补充的内容
- **次级操作**：不应该干扰主任务的动作

如果三层没有拉开，页面就会“都重要”，等于“都不重要”。

### 3.2 页面布局，是不是服务任务而不是堆模块

参考规范时，可以特别注意：

- 标题区有没有明确页面目标
- 主内容区是不是围绕任务组织
- 操作按钮是不是贴近相关内容
- 次要信息有没有被弱化

### 3.3 页面里的操作，是不是有优先级

很多页面一眼看过去有 6 个按钮，结果每个按钮都像 CTA，这是典型的层级失控。

更合理的方式是：

- 一个区域通常只有一个主动作
- 次级动作可以用描边、文字按钮或更弱的样式
- 风险动作不要和主动作长得一样

## 4. 设计按钮时，应该参考规范里的哪些点

按钮是最容易被“随手设计”的部分，但也是最能暴露系统是否成熟的部分。

### 4.1 按钮先分“语义”，再分“样式”

不要先想“蓝色按钮还是黑色按钮”，先想这个按钮是什么角色。

常见按钮角色可以这样分：

| 按钮类型 | 作用 | 常见样式策略 |
| :--- | :--- | :--- |
| **Primary** | 当前区域最关键动作 | 实心、高对比、最显眼 |
| **Secondary** | 支持性动作 | 描边或低一级强调 |
| **Tertiary / Text** | 弱操作 | 文字或低视觉占比 |
| **Destructive** | 删除、停用、清空等风险操作 | 警示色或明确风险样式 |
| **Icon button** | 局部工具操作 | 简洁、靠近上下文 |

### 4.2 一个页面不要有太多 Primary Button

这是很多新手最容易踩的坑。

如果页面上有 4 个主按钮，那么等于没有主按钮。主按钮的意义本来就是“告诉用户现在最应该做什么”。

你可以借鉴很多设计系统的共同做法：

- 一个主要区域通常只保留一个主按钮
- 取消、返回、关闭一般不和确认按钮抢同级
- 更多操作放到次级按钮或菜单中

### 4.3 按钮要能表达状态变化

设计规范通常会对按钮状态写得很清楚：

- 默认态
- 悬停态
- 聚焦态
- 禁用态
- 加载态
- 危险态

这很重要，因为按钮不是一张静态图，而是用户操作过程中最常被触发的控件之一。

### 4.4 按钮文案，也属于设计的一部分

按钮文案不只是“文案问题”，它直接影响用户理解。

例如：

- `保存`
- `保存更改`
- `立即发布`
- `删除项目`
- `移到回收站`

这些文案传达的心理预期完全不同。成熟规范通常会要求按钮标签清楚表达动作，而不是使用含糊词。

## 5. 一个很实用的页面与按钮设计清单

你自己设计页面时，可以先快速过一遍这张清单：

### 页面清单

- 页面标题是否清楚说明当前任务
- 首屏最重要的信息是否一眼可见
- 页面是不是按任务流程组织，而不是按想到什么放什么
- 同一个区域里是否只有一个主要动作
- 次要内容是否被适当弱化

### 按钮清单

- 这个按钮是主动作还是次动作
- 它为什么值得比别的按钮更显眼
- 页面里是不是有太多主按钮
- 危险操作是否被明确标识
- 按钮文案是否足够具体

## 6. 怎样用 AI 参考别人的规范来设计页面

这一节最实用。

很多人让 AI 设计页面时，只会说：

```md
帮我做一个设置页面，要高级一点，参考苹果风格
```

这类提示词太模糊了，AI 最后通常只能模仿“白底、圆角、阴影”。

对新手来说，更实用的方式不是自己总结一大段，而是直接把**规范原文里的关键句**贴给 AI。

这样做有两个好处：

- 你不用自己先“翻译”一遍设计思想
- AI 更容易按官方定义去理解页面和按钮

### 6.1 例子一：让 AI 参考 Apple 设计一个设置页面

先找一句 Apple 原文：

> ["Establish a clear visual hierarchy..."](https://developer.apple.com/design/human-interface-guidelines/)

你可以直接这样贴给 AI：

```md
参考 Apple Human Interface Guidelines 里的这句话：
"Establish a clear visual hierarchy..."

帮我设计一个账号安全设置页面。
要求页面层级清楚，重要信息放前面，分组整齐一点。
```

这样写的重点是：不用你自己解释太多，直接把 Apple 的原话贴进去。

### 6.2 例子二：让 AI 参考 Fluent 设计后台页面按钮

先找一句 Fluent 原文：

> ["Only use one primary button in a layout..."](https://fluent2.microsoft.design/components/web/react/core/button/usage)

你可以直接这样贴给 AI：

```md
参考 Fluent 2 里的这句话：
"Only use one primary button in a layout..."

帮我设计一个团队管理后台的按钮。
添加成员按钮最明显，导出、筛选、更多操作弱一点，删除按钮单独突出。
```

这一句非常适合新手，因为它直接告诉 AI：一个区域不要放太多主按钮。

### 6.3 例子三：让 AI 同时参考页面规范和按钮规范

你也可以一次贴两句原文，让 AI 同时参考页面和按钮：

> Apple: ["Establish a clear visual hierarchy..."](https://developer.apple.com/design/human-interface-guidelines/)
>
> Fluent: ["Only use one primary button in a layout..."](https://fluent2.microsoft.design/components/web/react/core/button/usage)

然后直接这样写：

```md
参考下面两句设计规范原文：
Apple: "Establish a clear visual hierarchy..."
Fluent: "Only use one primary button in a layout..."

帮我设计一个项目详情页。
页面包含项目介绍、成员、最近活动和设置入口。
页面层级清楚一点，主按钮只保留一个，其他按钮弱一点。
```

这种方式特别适合新手，因为你只要会复制原文，再加两句自己的需求就够了。

## 7. 怎样用 AI 参考按钮规范来直接生成按钮设计

如果你只想先做按钮，也可以直接贴按钮规范原文。

例如 Atlassian 对按钮的定义很短：

> ["A button triggers an event or action."](https://atlassian.design/components/button/)

你可以这样问 AI：

```md
参考 Atlassian 的这句话：
"A button triggers an event or action."

帮我设计一套后台页面按钮样式。
我要有主按钮、次按钮、删除按钮，顺便告诉我分别用在什么地方。
```

这类提示词尤其适合新手，基本就是“贴原文 + 说需求”。

## 8. 小结

参考 UI 设计规范设计页面和按钮，最重要的不是“做得像谁”，而是学会下面这几件事：

1. 用层级组织页面，而不是把内容堆上去
2. 用按钮分级表达操作优先级，而不是让所有按钮都一样抢眼
3. 用设计规范里的定义、边界和判断标准指导设计
4. 让 AI 参考别人规范时，参考的是“原则和结构”，而不是只参考皮肤

当你这样使用规范时，你参考到的就不只是一个风格，而是一套成熟的设计思考方式。

---

## 参考资料

以下链接都来自官方设计系统或官方文档：

- Apple Human Interface Guidelines: [Overview](https://developer.apple.com/design/human-interface-guidelines/)
- Apple Human Interface Guidelines: [Menus](https://developer.apple.com/design/human-interface-guidelines/menus)
- Apple Human Interface Guidelines: [Alerts](https://developer.apple.com/design/human-interface-guidelines/alerts)
- Apple Human Interface Guidelines: [Buttons](https://developer.apple.com/design/human-interface-guidelines/buttons)
- Apple Archive: [How Menus Work](https://developer.apple.com/library/archive/documentation/Cocoa/Conceptual/MenuList/Articles/HowMenusWork.html)
- Apple Archive: [Managing Pop-Up Buttons and Pull-Down Lists](https://developer.apple.com/library/archive/documentation/Cocoa/Conceptual/MenuList/Articles/ManagingPopUpItems.html)
- Material Design: [Buttons overview](https://m3.material.io/components/buttons/overview)
- Material Design: [Menus](https://m1.material.io/components/menus.html)
- Microsoft Fluent 2: [Start designing](https://fluent2.microsoft.design/get-started/design)
- Microsoft Fluent 2: [Menu usage](https://fluent2.microsoft.design/components/web/react/core/menu/usage)
- Microsoft Fluent 2: [Button usage](https://fluent2.microsoft.design/components/web/react/core/button/usage)
- Atlassian Design System: [Foundations](https://atlassian.design/foundations/)
- Atlassian Design System: [Button](https://atlassian.design/components/button/)
