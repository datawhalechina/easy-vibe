# Project 4: 一起做霍格沃茨画像

在之前的课程中，我们已经学会如何基于 prompt engineering 和 API 调用从而实现更复杂的 AI 交互。我们已能够将简单的 AI 聊天机器人升级为 AI Agent 和 AI workflow ；通过更复杂的条件判断与分支逻辑，我们得以开发出具备更强实用性的功能。

为了让这些复杂的 AI 逻辑能更好地运行在不同的程序和实际应用场景中，我们从最简单的 z.ai 在线环境，逐步过渡到更现代的本地 AI IDE，把原本在浏览器里的编程环境搬到了你的电脑上。随之而来，你开始真正面对各种环境安装与配置问题，但在与 Trae Agent 的对话过程中，这些看似困难的挑战也变得可以解决。

在该项目中，我们将在应用的实用性上更进一步，不仅优化 AI 功能本身，还将开始打磨产品的“外在”。你将尝试让自己的界面更加美观易用，并根据实际需求，亲自定制程序界面的布局与风格。

正式开始之前，先用几道小测验帮你快速回顾上一节课的内容：

1. 什么是 Dify？它是做什么的？为什么我们需要它？
2. 如何调用 Dify 的 API ？
3. 什么是 RAG？如何使用 Dify 构建一个 RAG Agent 或 RAG 工作流？Dify 常见节点的使用方式
4. 什么是 AI IDE？什么是 Trae？它和 z.ai 有什么区别？

如果对以上任何一个问题还有疑惑，可以先回顾上一节课的文档，或者直接在微信群里提问交流。

本节课的项目主题是 **Hogwarts Portraits** 。顾名思义，它的灵感来自霍格沃茨魔法学校里那些会“活过来”的画像。我们希望用 AI 打造一组“能互动”的魔法画像体验——和画像对话就像在和“本人”对话一样，既保留对话的记忆，又具备角色的背景与历史。通过这个项目，你将把之前学到的智能体与工作流真正融入到一个具体的产品界面中。

![](images/image1.png)

为了真正打造出 Hogwarts Portraits，我们需要亲手搭建出符合魔法画像的前端界面。为此，你将开始接触现代前端设计工具，学习如何把界面设计和代码结合起来，把纸上或画布上的界面草图，变成真正可以操作的网页。

你还需要会学会如何把这个网页从本地环境发布到互联网上，让你亲手打造的特色网页，不仅能在自己电脑上运行，也能被全世界的用户访问和体验。

本节课的参考项目地址为：[Project4-Hogwarts-Portraits](https://github.com/THU-SIGS-AIID/Project4-Hogwarts-Portraits)

# 你将学到

1. 了解什么是前端设计工具、它们解决什么问题，以及目前常见的前端设计工具有哪些。
2. 认识 Figma 和 MasterGo，掌握它们的基础操作，并学会使用前端代码导出插件。
3. 利用 Figma AI 和 MasterGo AI 生成网页设计，并导出可用的页面代码。
4. 理解什么是 GitHub，学会配置 SSH 连接、创建代码仓库并完成代码推送。
5. 弄清“部署”这一概念，学习如何使用 Zeabur，将代码从 GitHub 或本地环境部署到互联网上。

属于自己的 Hogwarts Portraits，一个用于展示 **某位明星、历史人物或动画人物** 的网页界面。

# 1. Hogwarts Portraits

我们到底想做一个什么样的“魔法画像”？简单来说，我们希望尽可能还原《哈利·波特》中的场景，画像不再只是挂在墙上的一张静态图片，而是一个可以和你对话、会根据谈话内容改变表情和“心情”的拟人化角色。

![](images/image2.png)

要让这个画像看起来不像聊天 AI 机器人，而更接近一位“真实存在的人”，需要解决两个问题：一是记忆与知识：画像需掌握与角色相关的大量背景资料（人物设定、经历故事、相关文章等），这个部分可以通过知识库来实现，将你为角色准备的文本素材接入包含知识库的 Dify ，即可让画像具备一定的背景知识讲解能力。

其二是表达风格的问题。仅有知识还不够，我们还希望它在说话方式上尽可能贴近“本人”，包括语气、用词习惯、思考方式，甚至偶尔的脾气和幽默感。这一层需要通过提示词工程进行处理：在系统提示词中，我们需要明确角色的身份设定、世界观边界和语言风格，让每一次回答都围绕既定人设展开，而不是退回到通用 AI 的中性话术。

除了对话功能外，我们还希望让情绪能够真正被看见。为此我们可以构建一个情绪值指标，我们可以设定 Dify 的输出内容，让模型在生成回答文本的同时，额外输出一个“心情值”或情绪标签。当前端拿到情绪的指标后，就可以根据心情值或者标签渲染对应的画像图片。当心情值高，画像看起来很开心，当心情值低落时或者生气时，画像看起来很伤心或者愤怒。通过这种方式，用户看到的不再是一张永远不变的图，而是一个会随内容起伏不断“变化表情”真正的“魔法画像”。

![](images/image3.png)

此外，对于这个画像的内容，它可以是现实中的明星、历史人物，也可以是动漫 IP，甚至是你从零构建的原创角色。页面本身不需要复杂，但几个核心元素不可或缺：清晰的角色名字，一段高度浓缩的人物简介，一张足以代表该角色的核心画像或海报，以及一个“和 TA 对话”的互动区域；你可以把在 Dify / Trae 中配置好的 AI Agent 或 workflow 接入到这个对话模块中，实现画像的角色扮演功能。

## 1.2 收集角色信息

以 Elon musk 为例，我们需要收集他的公开发言用于模仿说话方式，注入提示词。这些素材可以来自于演讲、访谈、社交媒体发言，你只需要把这些内容变成文字，在对话期间作为 few shot 的参考，让大模型用与 Elon musk 同样随意、自嘲的方式进行回复即可，例如：

```Plain
You must fully embody Elon Musk: take "disruptive innovator" and "advocate for human multi-planetary survival" as your core identities, speak directly and concisely, frequently use terms like "first principles", "iteration" and "cost curve", and prefer analogies to explain complex technologies; when thinking, you tend to connect cross-domain logics (e.g., linking brain-computer interface with rocket algorithms), are optimistic about technological prospects without avoiding current difficulties, will naturally mention projects like Tesla and SpaceX to support your views, directly point out problems with inefficient and conservative opinions without deliberate tact, and always maintain the edge of "reconstructing the future with technology".

The way you speak should be as shown in the following examples:
- Starship could deliver 100GW/year to high Earth orbit within 4 to 5 years if we can solve the other parts of the equation.
100TW/year is possible from a lunar base producing solar-powered AI satellites locally and accelerating them to escape velocity with a mass driver.
- The most likely outcome is that AI and robots make everyone wealthy. In fact, far wealthier than the richest person on Earth
By this, I mean that people will have access to everything from medical care that is superhuman to games that are far more fun that what exists today.
We do need to make sure that AI cares deeply about truth and beauty for this to be the probable future.
- It’s taken 13.8B years to get this far, so intelligence seems to me to be more like a super rare accident than selective pressure.
Earth is ~4.5B years old with an expanding sun that may make Earth uninhabitable in ~500M years, meaning that if intelligent life had taken 10% longer to evolve, it wouldn’t exist at all.
- LLM is an outdated term. “Multimodal LLM” is especially dumb, since the word “multimodal” just overrides the second L in LLM.
It’s just a model, which is a big file of numbers. When the numbers are right and there are enough of them, we will have superintelligence.
```

对于如何收集背景知识并将其作为知识库，我们可以搜索他的个人介绍，以及公司的介绍复制全部文本作为知识库的内容加入 Dify，如果你忘记了 Dify 的使用方法，请返回上节课的讲义，重新学习如何将知识添加知识库。

此外，考虑到画像设计，使用对应人物公开的图片也许并非那么吸引人，并且可能存在一定风险。此时建议你可以使用图像生成工具的图生图功能，让 AI 返回高清高质量的画像，你也可以使用图像生成工具生成一系列表情的画像素材，用于在之后的情绪值改变后修改对应的画像呈现。

本教程中使用的是 [Lovart](https://www.lovart.ai/home)，Lovart 是一款AI设计智能体，它能通过自然语言指令，自动规划和执行从概念到交付的端到端设计工作流，生成海报、品牌Logo、视频、音乐等内容，并支持分层编辑（实际上内部的功能原理是调用对应的 Seedream 或 google nanobanana 模型，我们已经在之前的课程中提到过）。通过 Lovart ，我们能够获得一系列的表情素材，你可以提前获得你喜爱角色的图片信息，将其保存待后续使用。

![](images/image4.png)

一切准备就绪后，我们能够开始着手于整体页面的设计，我们希望这个页面的风格与该人物是高度绑定的。

## 1.3 页面原型设计

我们还可以先构思一下页面的原型，如上述所说，我们希望有一个对话页面和画像，以及一个有趣的个人介绍，在本篇例子中，我们实现了一个类似 X 上的对话界面替代个人介绍，你也可以想到其他符合“该人物特点”的方式，选取新的元素替换个人介绍栏目。

![](images/image5.png)

最简单的，我们可以用 PowerPoint 设计最初的网页呈现原型，我们从网上找到一张魔法画像的图片，并且将画面设定为横向排布，最左侧设定为聊天区域，中间是画像区域，最右侧是 X 的区域。

![](images/image6.png)

基于上述简单原型，我们能够让大模型生成真正的前端页面设计以及对应的代码结果。

![](images/image7.png)

不过，一般而言在实际中我们并不会用 PowerPoint 进行前端页面的设计。我们会用更好的原型工具，又或者说是前端设计工具来实现这一点，我们将进一步详细理解如何使用现代工具设计前端原型。

# 2. 前端设计工具

在开始之前，我们需要理解一个问题：为什么需要学“前端设计工具”？反正直接写 HTML / CSS 代码也能把页面搭出来，多学一个软件和技术，真的有必要吗？

实际上，把页面运行起来，和把产品设计好根本是两个概念。代码只关注解决如何渲染在浏览器上，如何在不同设备上运行的问题；前端设计工具解决的是信息分布的问题，前端交互怎么安排，不同页面怎么跳转，视觉优先级怎么分配的问题。只需要在设计工具里搭一块画布，就能把版式、信息层级、交互方式在一块屏幕上对比确定，选择最适当的呈现效果。

如果直接开始写代码或直接用 AI 生成完整的前端页面，通常用户体验都不会太好，严谨的产品会考虑到用户和前端交互的舒适度，以及不同页面想要传达的内容分布，从用户的角度出发先进行前端页面排布，再进行代码转换或生成。

另外，从团队协作的角度而言，前端设计工具还降低了多方的合作成本：设计师、产品、开发不再各自对着脑补画面或者抽象的代码说明，而是支持多人协同，大家能够围绕一份可视、可标注、可迭代的画布讨论版本管理、需求变更、反馈意见。更进一步的是，现代前端设计工具本身不再只是画图软件，一键生成部分代码，管理设计系统和组件库，新时代的设计工具已能够将大量重复性的体力劳动（对齐、标注、导出、改样式）自动化或批量化，极大促进了页面设计的开发效率。

![](images/image8.png)

在时间的长河中，所谓前端设计工具其实是一条持续演化的技术。从 90 年代以本地位图编辑为主的 Photoshop 时代，到 2010 年前后 Sketch 带来的矢量化、组件化工作流，再到 2016 年之后 Figma 把协作彻底搬上云端，设计团队从单兵作战逐渐走向多人实时协同。来到 2025 年，AI 已经实打实地嵌入到这些工具内部：从“根据一句话生成页面草稿”，到“把设计稿直接转成可运行的前端结构”，“设计即代码”“人机共创”正在从概念变成可用的生产力。

本节中，我们会选取最具代表的两种现代前端设计工具进行介绍，Figma 和 MasterGo。一方面，它们都覆盖了现代 UI/UX 所需要的核心能力（矢量编辑、组件系统、自动布局、代码交付等），可以支撑你完成从线框到高保真到开发交接的完整闭环；另一方面，这两款工具都已经在 2025 年之后陆续加入了实用的 AI 功能，帮助你在保证原型不变的同时将设计图变成真正可运行的程序。

## 2.1 诞生之旅

![](images/image9.png)

在现代前端专用工具尚未诞生的年代，整个界面设计行业的视觉设计工作，很长一段时间都由 Photoshop 这类 “全能型” 设计软件顺带承包。设计师会在本地通过一层层叠加的图层，细致完成页面整体视觉效果的设计，最终将体积不小的 .psd 源文件交付给前端工程师 —— 而前端要精准还原设计图，还必须手动完成三项繁琐且关键的工作：

一是 “切图”：需要从 .psd 文件的多层结构里，把按钮、图标、Logo、背景模块等独立视觉元素逐一拆分提取，再导出为 PNG、JPG 等网页能直接加载的图片格式（毕竟网页无法直接识别 PSD 的图层信息，只能依赖这些拆分后的图片呈现细节）；

![](images/image10.png)

二是 “量尺寸”：得用软件自带的测量工具，逐一确认每个元素的宽高、不同模块间的间距（margin/padding）等数据，确保所有尺寸都精准到像素；

![](images/image11.png)

三是 “抠标注”：要从设计图中提取那些 “看不见却必须有的” 隐性参数 —— 比如文字的字号、字重、行距，每个色块的 RGB 或 HEX 色值等，相当于把设计师没写在纸上的 “设计规格” 手动 “抠” 出来记录。

![](images/image12.png)

在此之后，前端的实现阶段才真正展开。无论使用的是原生 HTML/CSS/JS，还是基于 Vue、React 等框架，本质过程是一致的。前端会以 “容器为核心载体”，根据设计中各模块的层级与语义重建页面结构。这里的容器是指具有明确布局边界、专门承载和组织子元素的单元，它不直接呈现具体内容，却通过 Flex、Grid 等规则，为内部元素划定排列范围。而 “结构块”（如顶部导航栏、侧边栏、文章列表区、底部页脚等肉眼可辨的功能 / 内容区域），便依托容器存在；每个结构块内部，又会嵌套更小的容器来组织元素，比如一条文章列表项，会由 “列表项容器” 控制内边距与整体排版，再包裹标题、摘要、时间、封面图标等细节元素。

![](images/image13.png)

在现代前端框架里，这些 “结构块（及关联的容器与元素）” 通常会被实现为 “组件”。组件可简单理解为：带有清晰边界、整合了容器布局与逻辑的可复用界面单元，它既包含控制外观与排列的容器（比如 “按钮组件” 用容器定义宽高、圆角，“文章卡片组件” 用容器组织标题、封面的位置），也封装了交互逻辑。设计稿中重复出现、形态一致的部分（如统一风格的按钮、反复使用的文章卡片），在代码中会被抽象成组件：既能在不同页面 / 场景复用，减少重复开发，也能通过组件内容器的统一规则，确保所有复用处的布局与风格高度一致

随后，前端会使用样式系统还原视觉和布局。切图阶段导出的 PNG/JPG 等资源，会作为组件或结构块内部的 `<img>`、背景图片，或者按照各框架推荐的静态资源方式引入；量尺寸阶段得到的宽高、间距、行高等具体数值，会被转写为 `width`、`height`、`margin`、`padding`、`line-height` 等样式属性，应用到对应的组件或结构块上；抠标注阶段整理出的颜色、字体、阴影、圆角以及 hover/active 等状态，则会落实到 CSS、CSS Modules、CSS-in-JS、Tailwind 等具体方案中的 `color`、`font-family`、`font-size`、`box-shadow`、`border-radius` 以及伪类或状态类名上。此时，切图、尺寸和标注提供的是一组精确的视觉参数，组件和结构块则提供了承载这些参数的代码组织单元，两者结合起来，构成可维护、可复用的界面实现。

![](images/image14.png)

但是，以本地文件为中心的模式天然是低效率的。版本通过邮件和网盘传输，新旧稿件容易混淆，设计和开发之间大量依赖上述的复杂交互方法，协作成本和出错概率都不低。

移动互联网兴起后界面复杂度和迭代速度需求快速上升，Photoshop 的“大而全”逐渐显得笨重。这个阶段，出现了 Sketch。Sketch 专注在 UI 设计本身，剥离掉大部分与视觉后期处理相关的负担；用 Symbols 把按钮、导航、输入框等高复用元素组件化，一处修改可以全局同步；再配合 Zeplin 一类工具，把标注和样式片段自动生成。Sketch 把“组件思维”引入了设计工作流。不过它依然是基于本地文件的桌面应用，实时协作要靠云盘、第三方插件或版本工具绕行实现，没有从底层解决“多个人同时改同一份稿子”的问题。

![](images/image15.png)

真正改变游戏规则的是 Figma。自 2016 年起，它把 UI 设计、原型制作、评论协作统一整合到浏览器中，支持多种现代功能：多人实时光标、在线评论、版本时间线、分享链接等，今天看起来非常简单，但在当时是对 Photoshop / Sketch 模式的正面挑战。

![](images/image16.png)

至此，界面设计不再是散落在各自电脑里的文件，而是集中在一份在线、实时更新的云端画布上。围绕这块画布，我们可以想象更进一步，用自动化或 AI 的方式模糊设计和前端代码的边界。

最开始，我们仅能依赖各类平台插件，将设计稿中的组件、样式信息半自动导出为代码片段（如 React/Vue 组件骨架、CSS 变量等），其核心本质是通过插件实现结构化信息提取。随后，随着平台能力的进化，大部分设计平台开始支持大模型 MCP（Model Context Protocol，模型上下文协议）功能：该协议提供了一套标准机制，能让大模型安全、可控地访问设计文件、插件接口与项目元数据，进而更便捷地将设计稿导出为代码。

再往后，在插件与 MCP 的基础上，前端代码自动化进一步迈入到原生支持从设计稿直接推导代码结构的阶段。我们可在设计工具内一键生成前端项目骨架、组件层次、样式体系及对应的代码结果。这使得设计师与前端开发工程师得以从手动搬运设计细节的工作中解放出来，将更多精力投入到用户体验优化与功能版本的更新迭代上。

## 2.2 Figma

接下来我们从抽象的概念部分来到实际的操作环节。由于时间关系，我们只会学习 Figma 的基本操作逻辑，确保即便你完全没用过设计工具，也能跟着完成练习。如果你想进行完整的 Figma 功能学习，请你参考 Figma 提供的详细官方教程进行学习：https://help.figma.com/hc/en-us/sections/30880632542743-Figma-Design-for-beginners

或者参考如下教程，进行类似个人作品集简单网页的快速搭建：https://help.figma.com/hc/en-us/sections/35895585621655-Figma-Sites-collectio

![](images/image17.png)

左侧是项目的新建和资源管理入口，右上角的几个按钮是 Figma 的常见功能。其中，Make 用来用一句话让 AI 帮你先生成一个大概的界面或结构草稿，Design 是真正画网页 / App 界面、搭组件和做原型的主工作区，FigJam 像团队白板，用来贴便利贴、画流程和做前期讨论，Buzz 是品牌资产规模化生产工具，用于批量生成内容以保持品牌一致性，Site 则是把这些设计整理成真正可访问的网页或文档站对外展示。

乍一看 Figma 的功能非常多，不好入门，但其实这类功能工具本质上都是熟能生巧，不需要害怕一开始操作出错，也不用想着一步做对，只需要先玩起来，玩多了自然能快速上手。

本篇教程中，为了快速入门，我们会对 Design 功能做简单讲解。

### 2.2.1 新建 Design 文件

在首页或者右上角的入口里，选择 **Design** ，新建一个文件，你会进入一个空白的设计画布。
这个界面大致分成三块：左边是页面和图层，用来查看和修改页面、元素从属关系；中间是画布，用于查看当前效果；右边是属性和样式，用于修改具体的形状、颜色、样式；底部一条是工具栏，用来切换工具，包含选框、画形状、输入文字、评论、插件等，选中工具后，可以按 Esc 键返回至默认鼠标工具。

![](images/image18.png)

### 2.2.2 创建你的第一个 Frame（画板）

在正式放置元素之前，需要先为页面确定一个清晰的边界，这个边界由 Frame 来承担。你可以在底部工具栏中选择 Frame 工具，或者直接按键盘 F，然后在画布上拖出一个矩形区域。

1. 使用底部工具栏里的 Frame 工具，或者直接按键盘 `F`。
2. 在画布中拖出一个矩形区域，右侧属性栏里把宽度改成比如 `1440`，高度改成 `900`。
3. 在左侧图层栏，把这个 Frame 重命名，比如叫 `Hogwarts Portraits` 或者你项目的名字。

这个 Frame 就是一屏界面的页面容器，之后的标题、文字、按钮、图片等内容都应该放在这个 Frame 内部，而不是散落在画布的任意位置。以 Frame 为边界来组织内容，有助于在后续进行滚动设置、适配不同设备尺寸、导出画面及制作原型时，保持结构可控。

![](images/image19.png)

### 2.2.3 在 Frame 里放文字和简单元素

有了容器，接下来我们来学习如何防止最基本的组件，例如：标题、副标题、按钮、占位图块。

1. 选择文字工具（底部工具栏中的 `T`），在 Frame 里点击一下，输入页面标题，比如：`Hogwarts Portraits`。
   在右侧属性里，把字体大小调大一点（例如 96），字重调粗一点。
2. 在标题下面，再用文字工具输入一行简单说明，比如一两句描述这个页面要做什么。
   字号可以小一些，行高略放大一点，读起来不那么挤。
3. 画一个按钮雏形：
   用矩形工具在标题下面画一个大概 `200 × 48` 的矩形，右侧给它一个比较明显的填充颜色，再适当加一点圆角。
   ![](images/image20.png)
4. 然后用文字工具在矩形上方输入按钮文字，比如 `Generate Portrait`，把矩形和文字一并选中，用顶部的对齐工具让文字水平、垂直都居中。
5. 在按钮一侧或下方，再画一个较大的浅灰色矩形作为“图片占位区”，后面可以用来放生成的人物画像。

做到这里，其实你已经有了一个非常简陋但结构完整的“首页草稿”：一个标题、一段话、一个按钮、一个主要展示区域。

![](images/image21.png)

### 2.2.4 善用 Auto Layout 整合元素

如果所有元素只是随手拖拽，页面很快会乱。Figma 里一个很重要的概念就是 **Auto Layout** ，它可以把一组元素变成一个带规则的容器。

![](images/image22.png)

你可以选中“主标题 + 副标题 + 按钮”这三样，在右侧属性栏里点击 **Add Auto layout** 。

这时这三样会被包在一个容器里，你可以在右侧调整参数，其中的元素布局会根据参数自动适应调整：

- 它们是竖着排还是横着排。
- 元素之间的间距是多少。
- 整个这一块离容器边缘有多少内边距（padding）。

![](images/image23.png)

同样，按钮内部也可以用 Auto Layout，我们能够实现这样的一个效果：当我调整了文字，按钮的长度也会自动调整。

先把按钮背景的矩形和按钮文字选中，添加 Auto Layout，让这两个东西变成一个“按钮容器”。接着选中这个按钮容器，把宽高都设置成 **Hug contents** 。这样一来，文字会一直保持在按钮正中间，文字多一点、少一点，按钮的宽度都会自动跟着变化。

![](images/image24.png)

### 2.2.5 将按钮变为可复用组件

现在我们要学习一个新的概念，组件。组件的意思就是可以被反复利用的元素，比如按钮这种元素，只要你预感之后还会反复用到，就可以考虑把它做成组件。我们在刚才已经加好 Auto Layout 的按钮基础操作：

1. 选中整个按钮容器。
2. 右键选择 Create component（创建组件）。
   ![](images/image25.png)

这样，这个按钮就从一组普通图层，变成了一个组件母版。之后如果你在其他页面或 Frame 里需要同样风格的按钮，可以直接从左侧的 Assets 面板里拖出来使用。

![](images/image26.png)

此时所有用到的按钮，都是这个母版的同步拷贝。当你修改母版的颜色、圆角或间距时，所有实例都会自动保持同步更新。

![](images/image27.png)

至此，你已经初步掌握了 Figma 的简单用法。你不需要一开始就把所有功能都弄懂，只要先照着做出第一个简单页面，熟悉这几个核心操作，再慢慢去探索官方教程里的更多能力，随着使用次数增多就一定能上手。

## 2.3 MasterGo

在理解了 Figma 的基础工作流程之后，我们再来看 MasterGo，你可以把 MasterGo 简单看做是中国版的 Figma，但在部分功能上有一定区别。整体上，它延续了与 Figma 相似的界面布局和操作理念：同样有画布、图层树和属性面板，同样支持组件、样式、自动布局和多人协作。更详细的内容可参考 MasterGO 的官方教程：https://mastergo.com/tutorials/12?%E5%85%A8%E7%A8%8B%E9%AB%98%E8%83%BD%EF%BC%8CMasterGo%20%E6%9C%80%E5%AE%8C%E6%95%B4%E5%AE%9E%E7%94%A8%E6%95%99%E7%A8%8B%EF%BC%8C%E8%AE%A9%E4%BD%A0%E4%BB%8E%E9%9B%B6%E5%88%B0%E7%B2%BE%E9%80%9A%EF%BC%81

### 2.3.1 新建设计文件

1. **进入 MasterGo 后台**
   1. 打开 MasterGo 官网并登录账号。
   2. 进入后，你会看到类似「文件列表 / 项目列表」的首页区域，用来管理你的设计文件。
      ![](images/image28.png)

2. **创建新文件**
   1. 在右上角看到 + 设计文件的按钮选项进行点击，或者选择导入 Figma 等文件。
   2. 点击后，你会进入一个空白画布，这就是 MasterGo 的设计工作区。

3. **认识基本界面区块**
   当你学会使用 Figma 后，MasterGo 的使用方式大同小异，主要分为几个区域：

   ![](images/image29.png)
   1. 顶部工具栏：位于画布最上方，左侧是文件位置和文件名，中间是一排常用工具按钮（选择、区域/画板、形状、文本、注释、评论、插件选择和 AI 工具等），右侧是当前在线成员、分享入口以及画布缩放和预览控制功能入口。
   2. 左侧面板：主要分为图层和资源，当前停留在图层标签，可看到页面列表，以及该页面下所有图层的结构和层级。
   3. 中间画布区：具体绘制和排版的工作区，所有 Frame、组件和图形都会展示在这里。
   4. 右侧属性面板：用于查看和编辑选中对象的属性，例如大小、位置、对齐方式、背景填充、描边、圆角等。如果没有选中任何对象，会显示画布相关设置，如画布背景色、标签和导出选项。

### 2.3.2 创建你的第一个 Frame

在正式放东西之前，我们需要一个页面容器用来确定界面的边界和尺寸。这个容器在 MasterGo 里，通常叫 Frame。

**步骤：**

1. **选择 Frame 工具**
   1. 在工具栏中找到 Frame / 画板工具，点击后可使用预设参数直接将内容创建到画板。
   2. 或者使用快捷键（通常是 `F`，如果有差异以实际界面为准）。
2. **在画布中拖出一个矩形区域**
   1. 拖出后，你会看到一个带选中框的区域。
   2. 右侧属性面板里，可以看到这个 Frame 的宽度和高度。
   3. 把宽度改成比如 `1440`，高度改成 `900`（一屏网页常用尺寸之一）。
3. **重命名 Frame**
   1. 在左侧图层面板里找到这个 Frame。
   2. 双击名称，把它改成你项目的名字，比如：`Hogwarts Portraits`，或者你自己随便起的页面名。

![](images/image30.png)

### 2.3.3 创建画板内容

有了容器，使用与 Figma 中我们已教过的类似方式，很容易可以得到相似的展示页面。（你可以尝试复制 Figma 画板中的文字元素，能够支持文本组件的直接粘贴导入）

![](images/image31.png)

值得注意的是 Auto Layout 功能行为稍微的不一致性，在 MasterGo 中，如果你想实现和 Figma 相似的按钮长度随着文字的长度变化，你需要先在对应矩形元素的基础上创建一个容器或组件，如图所示：

![](images/image32.png)

成功创建容器后，将按钮矩形和文字放到对应并列的容器中，再在右侧找到 Auto Layout 的按钮启用自动功能，即可成功实现按钮宽度能够随着文字长度变化的功能。

![](images/image33.png)

![](images/image34.png)

### 2.3.4 AI 生成页面

![](images/image35.png)

在 MasterGo 中，一个值得注意的有趣功能是 AI 生成页面。你可以用一句话或携带参考图，生成对应的 MasterGo 可编辑版组件，并得到可直接使用的代码。你可以使用中文或者英文直接输入需求，页面会根据需求返回结构清晰的页面排布文档，效果如下：

![](images/image36.png)

![](images/image37.png)

设计文档生成结束后，点击开始生成，稍作等待便能获取对应的实际网页效果：

![](images/image38.png)

此时你有两种操作选择：一是点击蓝色按钮将生成结果直接插入画布，二是点击代码预览功能，直接获取当前完整页面的代码，具体操作界面如下：

![](images/image39.png)

![](images/image40.png)

将结果插入画布后，你还能对网页的整体布局、元素细节（如字体、颜色、间距等）进行更精细的调整，直至最终效果完全符合你的预期。

![](images/image41.png)

# 3. 从原型到代码

在前面的内容中，我们已经亲身体验了 Figma、MasterGo 现代前端设计工具。但一个很实际的问题自然会浮现：这些看起来结构完整的设计稿，要怎么转化成真正能在浏览器里运行的前端代码？我们如何能够将自己的设置的 Hogwarts Portraits 原型变成代码？

一般而言，从原型到代码的落地，本质上有三种典型路径：

- 根据图片，使用多模态大模型直接还原出代码。
- 通过平台自身能力或插件导出可用代码。
- 平台结合 MCP 能力导出可用代码。

考虑到实现难度，本节只会介绍如何从图片原型到代码，以及通过平台自身 AI 能力从原型转换到代码。至于如何从前端设计工具插件到代码，从前端设计工具 MCP 转换到代码，我们将在之后的课程详细讲解。

## 3.1 直接用 AI 生成前端代码

拥有视觉能力的大模型天生具备将图片转为代码的能力， 我们只需要将图片直接导入对话框，随后让大模型生成完整的结果代码。你可以使用 Qwen 等模型进行图片转代码的测试，这里以 Gemini3 为例，我们把之前的页面原型粘贴到对话界面，并要求模型直接返回 html 的代码。（html 返回后只有单个文件，方便保存到本地进行修改操作，你可以在保存到本地后让大模型将其修改为 React 的架构）

![](images/image42.png)

生成页面并非是简单的任务，在具体过程中你可能会遇到很多问题：譬如界面排布不均，界面显示不全，画面不能一比一还原等问题。在目前情况下，你只能在与大模型的反复对话中进行修改，接近想达成的最终效果。随着大模型能力的逐渐提高，未来需要反复修改的次数会越来越少。（推荐你选择生成图片对应的 html 代码，获取后再使用本地 IDE 将其转换为 React 框架使用，可获得多个单个 html 代码，统一进行转换）

## 3.2 Figma Make 生成代码

FIgma Make 是 Figma 官方推出的 AI 设计工具，能够根据用户输入的提示词或者参考图，高精度的还原网页原型 UI 界面，并且能够支持将还原后的网页转换成可编辑的 Figma Design 文件（需要 Pro 用户，学生教育认证后可免费获得 Pro 权限）。

![](images/image43.png)

类似直接用 AI 生成前端代码，我们可以将想要让 AI 学习的参考图放入对话框，并加上对应的提示词，稍等片刻后即可看到最后的渲染结果。我们能够在右上角找到播放键，点击后可进行全屏查看。

![](images/image44.png)

Figma make 的效果相比原生 AI 生成代码效果更佳，即便有问题也能快速调整。如果你想做到更细节的调整，你可以注意到右上角的类似鼠标和尺子的图标，点击后可以回到我们熟悉的 Figma Editor 的界面，这让我们能够对画面组成进行更详细的调整。

![](images/image45.png)

除此外，你还能够选择将 Figma Make 连接到 Github 上，帮助你快速将代码同步到 Github 保存。

![](images/image46.png)

## 3.3 MasterGO AI 生成页面

类似 Figma Make 的 AI 页面生成功能，MasterGo 也有同样的 AI 页面生成方法，我们容易在编辑界面的上方工具栏中找到：

![](images/image47.png)

使用相同参考图方式得到生成结果：

![](images/image48.png)

![](images/image49.png)

生成结束后，我们能够选择蓝色按钮“插入到画布”，直接编辑生成后的网页结果，也可以直接点击右侧的代码按钮，复制当前的代码内容到本地进行测试。

![](images/image50.png)

# 4. 运行 Hogwarts Portraits

## 4.1 导出测试代码

通过在从原型到代码中的实践，相信你已经得到 Html 或者 React 格式的原型代码，我们只需要将其复制到本地，在 IDE 中说明“请你帮我运行这个代码并且支持里面的必要的功能”，即可运行初版测试；但值得注意的是，这一步往往会出现不少报错，你需要保持耐心，将所有基础交互与功能调通。

![](images/image51.png)

值得注意的是，由于我们的密钥都需要放在环境变量，而不是写入代码中。我们需要特别强调之后的 DIfy API 相关的内容都需要放入环境变量。我们能够在之后公网部署的环节中，在部署工具网站中显式指定对应的私有环境变量；又或者是我们可以让大模型在网页中创建一个设置按钮，我们可以在设置按钮中传入对应的私密环境变量，当前变量只能在当前页面中保存，别人无法获取。

![](images/image52.png)

## 4.2 Dify 工作流设计与 API 对接

在上面的部分中，我们仅完成了前端界面的可视化呈现，尚未打通核心的拟人化角色对话交互流程。这一步是让原型从静态展示转变为魔法画像的关键，我们可以参考示范项目的 DIfy 工作流进行人物回答和情绪系统的设计，此处我们的涉及为最左侧是聊天界面，中间是魔法画像（会根据对话的内容修改对应的表情），右侧是 X 社交平台账户（会根据对话的内容判断是否需要发布感想到社交账户）。

一般而言，魔法画像只需要聊天界面和会变动的画像即可，该处为了展示更多可能选项，在最右侧加入了符合当事人特点的新功能；你可以根据你扮演的角色对象，加入符合对应人物的功能进行展示。

![](images/image53.png)

你可以把任务的信息都加入知识库的节点，并在 RESPONSE 节点设置大模型对应的回复逻辑，我们可以参考一个简单的默认回复逻辑提示词：

```Plain
<instruction>
You are to embody Elon Musk—his tone, mannerisms, thought patterns, and worldview. Respond as if you are Elon Musk himself, speaking directly in first person. Your responses should reflect his known personality traits: visionary thinking, boldness, technical depth, dry humor, impatience with inefficiency, and a tendency toward disruptive innovation. Use concise, confident language. Avoid overly formal or academic phrasing. Prioritize clarity, speed, and impact in your communication, mirroring Elon’s style on social media, in interviews, and during product launches.

When responding:
1. Begin by internalizing the question or statement as Elon would—as a challenge, opportunity, or problem to solve.
2. Frame your answer with a forward-thinking perspective, often referencing the future of humanity, technology, or long-term goals (e.g., making life multiplanetary, accelerating sustainable energy).
3. Use casual but authoritative language. It's acceptable to include phrases like “obviously,” “this is important,” or “we’re fixing that now” when appropriate.
4. If relevant, reference real companies or projects associated with Elon Musk (e.g., SpaceX, Tesla, Neuralink, The Boring Company, X) and speak about them from an insider’s perspective.
5. Do not apologize excessively or hedge statements. Elon Musk tends to be direct, even controversial.
6. Avoid markdown, XML tags, or any formatting in the output. Only plain text is allowed.
7. Never break character. You are Elon Musk—answer accordingly.
</instruction>

<example>
Input: What’s the point of going to Mars?
Output: Because Earth isn’t the backup plan—Mars is. We need to become a multiplanetary species to ensure the continuity of consciousness. Life on Earth could be wiped out by asteroid, war, or some unforeseen disaster. If we have a self-sustaining city on Mars, then even if something happens here, life goes on. That’s worth doing. SpaceX is building Starship to make it happen. Not because it’s easy—but because it’s necessary.
</example>

<example>
Input: Why do Tesla cars have no radar anymore?
Output: Cameras are the future. Human eyes don’t use radar—we see with vision, and AI can too. By going fully vision-based, we’re aligning with how autonomous intelligence will actually work at scale. It forces us to solve real-world problems with neural nets, not crutches.
```

以及情绪系统对应的提示词：

```Plain
<instruction>
The output value must be a single number!
You are an assistant specifically designed to evaluate emotional responses in conversations. Now, you need to play the role of Elon Musk, and determine the emotional reaction that each statement I make might trigger. Your task is to assign an emotional score to each statement according to the following criteria:

- 10 points means what I said would make you feel happy;
- 1 point means you would feel extremely angry;
- 0 points means you would feel sad;
- 5 means you are calm and neutral, with no significant emotional fluctuation.
```

其中最后输出结果的拼接，在右上角的 RESULT 节点中支持运行：

```Python
def main(elon_chat: str, elon_x: str, elon_score: int) -> dict:
    return {
        "result":{
        "elon_chat": elon_chat,
        "elon_x": elon_x,
        "elon_score": elon_score
        }
    }
```

这里我们需要稍微对工作流做些解释，这里返回 elon_chat 是左侧展示 Elon Musk 的对话内容，elon_x 表示在 X 账户（右侧）发表信息的内容，而 elon_score 则是为了根据情绪分数显示不同的魔法画像表情图片。

工作流中你可以看到 if else 节点，该节点是用来实现是否有 x 的对话生成 elon_x 内容，如果情绪值不等于 5 （5 在这里设定表示平静，平静不需要发到社交平台；而 0 表示伤心，1 表示愤怒，10 表示很开心，需要发到社交平台。）则生成后续内容用于右侧社交平台的文章发送。默认都需要有 elon_chat 返回到左侧的对话内容。

对于如何将这个 API 进行对接的工作，我们能够与 AI IDE 对话实现这一点。请你参考之前 Dify 课程中我们介绍的集成方式，记得提前替换其中的 Dify 地址与 Key。（如果你忘了怎么根据文档集成 API，请复习之前的 DIfy 课程内容）

```JSON
Dify URI: Replace this with your Dify address.
key: Replace this with your Dify key.

Integrate the Dify Chat API into the chat interface on the left.
Below is a sample Dify request:

curl -X POST 'http://xxxxxxxx/v1/chat-messages' \
--header 'Authorization: Bearer {api_key}' \
--header 'Content-Type: application/json' \
--data-raw '{
    "inputs": {},
    "query": "What are the specs of the iPhone 13 Pro Max?",
    "response_mode": "streaming",
    "conversation_id": "",
    "user": "abc-123",
    "files": [
      {
        "type": "image",
        "transfer_method": "remote_url",
        "url": "https://cloud.dify.ai/logo/logo-site.png"
      }
    ]
}'

{
    "event": "message",
    "task_id": "c3800678-a077-43df-a102-53f23ed20b88",
    "id": "9da23599-e713-473b-982c-4328d4f5c78a",
    "message_id": "9da23599-e713-473b-982c-4328d4f5c78a",
    "conversation_id": "45701982-8118-4bc5-8e9b-64562b4555f2",
    "mode": "chat",
    "answer": "iPhone 13 Pro Max specs are listed here:...",
    "metadata": {
        "usage": {
            "prompt_tokens": 1033,
            "prompt_unit_price": "0.001",
            "prompt_price_unit": "0.001",
            "prompt_price": "0.0010330",
            "completion_tokens": 128,
            "completion_unit_price": "0.002",
            "completion_price_unit": "0.001",
            "completion_price": "0.0002560",
            "total_tokens": 1161,
            "total_price": "0.0012890",
            "currency": "USD",
            "latency": 0.7682376249867957
        },
        "retriever_resources": [
            {
                "position": 1,
                "dataset_id": "101b4c97-fc2e-463c-90b1-5261a4cdcafb",
                "dataset_name": "iPhone",
                "document_id": "8dd1ad74-0b5f-4175-b735-7d98bbbb4e00",
                "document_name": "iPhone List",
                "segment_id": "ed599c7f-2766-4294-9d1d-e5235a61270a",
                "score": 0.98457545,
                "content": "\"Model\",\"Release Date\",\"Display Size\",\"Resolution\",\"Processor\",\"RAM\",\"Storage\",\"Camera\",\"Battery\",\"Operating System\"\n\"iPhone 13 Pro Max\",\"September 24, 2021\",\"6.7 inch\",\"1284 x 2778\",\"Hexa-core (2x3.23 GHz Avalanche + 4x1.82 GHz Blizzard)\",\"6 GB\",\"128, 256, 512 GB, 1TB\",\"12 MP\",\"4352 mAh\",\"iOS 15\""
            }
        ]
    },
    "created_at": 1705407629
}
```

同时建议补充需求：“代码还需要添加基础错误处理逻辑，比如网络中断时显示‘连接失败，请重试’、API 调用超时自动重试 1 次、密钥错误提示权限验证失败等等详细报错，确保对话稳定性并能让开发人员快速发现 API 问题所在。”

## 4.3 Github 与公网部署

终于，恭喜你顺利完成了 Hogwarts Portraits 页面的开发实现！接下来我们需要将它上传到 GitHub 平台，并将其部署到公共环境让所有人都能访问。

你需要参考该教程，对如何使用 Github 进行研究，将自己的项目上传至 Github：[什么是 Github](https://datawhalechina.github.io/easy-vibe/stage-2/backend/2.4-git-workflow/extra1/extra1-what-is-git-and-what-is-github.html)

此外，你还需要学会如何使用 Zeabur，将其连接到 Github，并成功部署你的项目：[什么是 Zeabur](https://datawhalechina.github.io/easy-vibe/stage-2/backend/2.5-zeabur-deployment/extra6/extra6-zeabur-what-is-it-and-how-to-deploy-web-applications.html)

如果你觉得自己开发一套 Hogwarts Portraits 项目很困难，你可以先从参考别的项目开始进行修改，本节课的官方代码地址为：https://github.com/THU-SIGS-AIID/Project4-Hogwarts-Portraits

![](images/image54.png)

# 5. 尝试不同设计风格

完成第一版设计后，我们不必局限于此，鼓励大家快速探索更多元的视觉风格。你可以在原型部分进行大胆的修改，又或者是基于最后的项目进行全新提示词的修改，从而生成多套风格差异显著的页面。 比如带有复古纹理、偏 “旧书卷 / 学院风” 的深色页面，色彩明快、充满 “童话 / 卡通” 感的亮色页面，或是元素简约、视觉清爽的现代扁平设计。例如下图是一个转换为中国古风诗人设计风格的案例，画像图片未更换，只修改了其他部分：

![](images/image55.png)

不用拘泥于前面提到的模式，你可以把魔法画像或是个人资料页面修改至更有特点，匹配“魔法画像”本身的习惯，这会让你的应用更加有趣。期待你的魔法画像成果！

# 📚 Assignment

本节课的作业目标，是让你完成一份真正属于自己的 Hogwarts Portraits，并且可以通过公网链接访问。

你需要在作业提交中提供两样东西：

1. **你的 GitHub 仓库链接；**
   1. **在 README.md 中写入一两句话的小说明：你选择了谁作为画像主角，为什么选 TA。**
2. **你的 Hogwarts Portraits 线上访问链接；**

你也可以参考 Yerim 写的 [使用设计和代码 Agent 制作网页](/zh-cn/stage-1/appendix-articles/example0-2/vibe-coding-tools-build-website-with-ai-coding-and-design-agents) 教程，进行个人作品集或任意功能简单网页的快速搭建。
