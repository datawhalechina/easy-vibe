# 用 LLM 和 Skills 让界面变好看：提示词与插件实战

在前面的课程中，你已经学会了用 AI IDE 把设计稿变成代码、用组件库快速搭建界面。但你可能也发现了一个尴尬的问题：**同样的需求，AI 生成的页面总觉得差点意思**——字体是千篇一律的 Inter，配色是随处可见的紫色渐变，布局是对称得让人打哈欠的卡片网格，整个页面散发着浓烈的"AI 味"。

这不是 AI 的错，而是你没告诉它你想要什么**风格**。

想象你去理发店。如果你只说"帮我剪个头发"，理发师会给你一个安全但平庸的结果。但如果你说"我要日系慵懒卷，刘海要八字型，长度到锁骨，层次感明显"，你就能得到真正符合你期待的效果。

AI 也是一样。**它需要你描述出清晰的审美方向**，才能生成美观独特的界面。

本节课教你两种让 AI 生成漂亮界面的方法：

1. **精心设计的提示词模板**——用自然语言告诉 AI 你想要的美学风格
2. **前端 Skills 插件**——让 AI 自动加载专业设计规范

## 你将学到

1. 理解为什么 AI 默认生成的界面"很普通"
2. 掌握描述设计风格的 5 个维度（字体、颜色、布局、动画、细节）
3. 学会使用 3 个让界面变漂亮的 Skills 插件
4. 通过三个实战场景，练习用提示词 + Skills 生成美观界面

## 1. 为什么 AI 默认生成的界面"很普通"？

AI 训练数据中有海量的前端代码，而大部分代码都使用一些"安全"的选择：

| 维度 | AI 的默认选择 | 问题 |
| :--- | :--- | :--- |
| 字体 | Inter、Roboto、Arial | 太常见，没有个性 |
| 颜色 | 紫色渐变、蓝色主色 | 科技圈过度使用，视觉疲劳 |
| 布局 | 对称网格、卡片堆叠 | 预测性强，缺乏惊喜 |
| 动画 | 淡入淡出、简单的 hover | 不够精致，缺乏层次 |
| 背景 | 纯色、简单渐变 | 单调，缺少质感 |

这些选择单独看都不错，但**当所有 AI 生成的页面都用它们时，就变成了"AI 味"**。

> 💡 **关键洞察**：AI 不是不会设计，而是**默认回到"统计平均"**。你需要明确告诉它偏离平均值的方向。

## 2. 方法一：用提示词描述设计风格

### 2.1 设计风格的 5 个维度

要生成美观的界面，你需要从 5 个维度描述你想要的效果：

| 维度 | 描述要点 | 示例关键词 |
| :--- | :--- | :--- |
| **字体** | 标题用粗体展示字体，正文用易读正文字体 | Space Grotesk、Playfair Display、JetBrains Mono |
| **颜色** | 主色 + 点缀色，避免均匀分布 | #4F46E5 主色 + #F59E0B 点缀 |
| **布局** | 不对称、重叠、打破网格 | Bento Grid、不对称分区、浮动元素 |
| **动画** | 精心编排的页面加载、微交互 | staggered reveals、滚动触发 |
| **细节** | 背景、阴影、边框、纹理 | 噪点、几何图案、渐变网格 |

### 2.2 眼见为实：普通提示词 vs 美化提示词

让我们用一个落地页示例来对比效果：

**普通提示词：**

```
请帮我做一个 AI 写作助手的落地页，包含导航栏、首屏、功能展示、定价、页脚
```

**美化提示词：**

```
请帮我做一个 AI 写作助手的落地页，要求：

**美学风格：新野兽派（Neubrutalism）**

**字体：**
- 标题：Space Grotesk，字重 700-900
- 正文：IBM Plex Sans，字重 400

**颜色：**
- 主色：#000000（纯黑）
- 强调色：#FF6B00（橙色）
- 背景：#FFFDF0（米白色）
- 边框：3px 黑色实线

**布局：**
- 不对称布局，元素之间用粗黑线分隔
- 卡片有硬阴影（box-shadow: 8px 8px 0px #000）
- 大胆的留白对比

**动画：**
- 页面加载时元素从下方弹入
- hover 时按钮向上移动 2px

**细节：**
- 圆角全部用 0px（直角）
- 按钮有强烈的 3D 效果
- 背景添加微妙的噪点纹理
```

同样的需求，第二个提示词能让 AI 生成一个风格鲜明、令人印象深刻的页面。

### 2.3 前端美化 Skills 资源库

不要从零开始写提示词！这里收集了与前端美化直接相关的 AI Skills：

| 仓库名 | 内容 | Star | 链接 |
|:---|:---|:---|:---|
| **ui-ux-pro-max-skill** | 57种风格 + 95种配色 + 56种字体 | 10k+ | [GitHub](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill) |
| **antigravity-awesome-skills** | 避免通用 AI 审美套路 | - | [GitHub](https://github.com/sickn33/antigravity-awesome-skills) |
| **superdesigndev/superdesign** | AI 原生 UI 开发工具 | 4.7k | [GitHub](https://github.com/superdesigndev/superdesign) |
| **anthropics/skills/frontend-design** | Anthropic 官方前端设计 Skill | - | [GitHub](https://github.com/anthropics/skills) |

> 💡 更多风格提示词请参考[附录：设计风格提示词速查](#style-prompts)

### 2.5 三款常用风格模板

这里给你三款经过验证的风格模板，直接复制修改使用：

#### 模板 1：极简主义

```
**美学风格：极简主义**

**字体：**
- 标题：PP Neue Montreal，字重 500-700
- 正文：Inter，字重 400

**颜色：**
- 主色：#FFFFFF（白色）
- 文字：#1A1A1A（近黑）
- 强调：#3B82F6（蓝色，少量使用）

**布局：**
- 大量留白（padding 最小 64px）
- 单栏或双栏布局，居中对齐
- 元素之间用留白而非分割线

**动画：**
- 缓慢的淡入效果（duration 600ms）
- hover 时颜色渐变过渡

**细节：**
- 圆角：8px
- 阴影：subtle（0 4px 12px rgba(0,0,0,0.08)）
- 无背景装饰
```

#### 模板 2：玻璃拟态

```
**美学风格：Glassmorphism（玻璃拟态）**

**字体：**
- 标题：Outfit，字重 600-800
- 正文：Plus Jakarta Sans，字重 400-500

**颜色：**
- 背景：渐变 #667eea 到 #764ba2
- 卡片背景：rgba(255, 255, 255, 0.1)
- 文字：#FFFFFF

**布局：**
- 浮动卡片设计
- 卡片之间有重叠

**动画：**
- 页面加载时卡片依次浮现（staggered）
- hover 时卡片放大 1.05 倍

**细节：**
- 圆角：20px
- 背景模糊：backdrop-blur-xl
- 边框：1px rgba(255, 255, 255, 0.2)
- 微妙的渐变光晕效果
```

#### 模板 3：Bento Grid（便当盒）

```
**美学风格：Bento Grid**

**字体：**
- 标题：SF Pro Display，字重 700
- 正文：SF Pro Text，字重 400

**颜色：**
- 背景：#F5F5F7（浅灰）
- 卡片：#FFFFFF（白色）
- 强调：#0071E3（苹果蓝）

**布局：**
- 网格布局，不同大小的卡片拼在一起
- 卡片之间 gap 16px
- 圆角 24px

**动画：**
- hover 时卡片轻微上浮
- 点击时有按压效果

**细节：**
- 大卡片展示重要内容
- 小卡片展示次要信息
- 用图标代替部分文字
- 干净的阴影（0 4px 24px rgba(0,0,0,0.06)）
```

## 3. 方法二：用 Skills 插件自动加载设计规范

每次手动写风格提示词很麻烦。**Skills** 是一种可复用的设计规范包，安装后 AI 会自动应用这些规范。

### 3.1 三个让界面变漂亮的 Skills

| Skills | 特点 | 安装命令 |
| :--- | :--- | :--- |
| **UI/UX Pro Max** | 67 种风格、96 种配色、57 种字体组合 | `npm install -g uipro-cli && uipro init --ai claude` |
| **frontend-design** | Anthropic 官方，避免 AI 审美套路 | `npx skills add anthropics/skills/frontend-design` |
| **SuperDesign** | IDE 插件，生成多个设计变体 | VSCode 扩展市场搜索 "SuperDesign" |

### 3.2 安装 UI/UX Pro Max（最推荐）

UI/UX Pro Max 是目前最全面的设计规范 Skills，它预置了：

- **67 种 UI 风格**：Glassmorphism、Neumorphism、Brutalism、Bento Grid...
- **96 种配色方案**：按行业分类（SaaS、电商、社交...）
- **57 种字体搭配**：专业设计师验证的组合
- **100+ 条设计规则**：间距、圆角、阴影的规范

**安装步骤：**

```bash
# 1. 全局安装 CLI
npm install -g uipro-cli

# 2. 初始化（选择你用的 AI 工具）
uipro init --ai claude
# 或者
uipro init --ai cursor
# 或者
uipro init --ai trae
```

安装后，你只需要在提示词中加一句话：

```
使用 UI/UX Pro Max 的 Glassmorphism 风格，帮我做一个 AI 写作助手落地页
```

AI 就会自动应用对应的字体、颜色、布局规范。

### 3.3 安装 Anthropic 官方 frontend-design

这是 Anthropic 官方出品的前端设计 Skill，专门解决"AI 审美套路"问题：

```bash
# 在 Claude Code 中执行
npx skills add anthropics/skills/frontend-design
```

安装后，AI 会自动避免：
- ❌ Inter、Roboto、Arial 字体
- ❌ 紫色渐变背景
- ❌ 对称网格布局
- ❌ 过淡的阴影

而是倾向于：
- ✅ 独特的字体组合
- ✅ 大胆的主色 + 锐利的点缀色
- ✅ 不对称、重叠的布局
- ✅ 有质感的背景（噪点、几何图案）

## 4. 实战一：用美化提示词重新设计落地页

让我们用前面学到的知识，把一个普通的落地页变得好看。

### 4.1 普通版本

先用普通提示词看看 AI 给什么：

```
请帮我做一个宠物领养平台的落地页，包含：
- 导航栏（Logo、链接、注册按钮）
- 首屏（标题、副标题、CTA 按钮、宠物图片）
- 宠物展示（三张宠物卡片）
- 关于我们
- 页脚
```

生成的页面...能用，但很普通。

### 4.2 美化版本

现在加上风格描述：

```
请帮我做一个宠物领养平台的落地页，要求：

**美学风格：温暖柔和 + 手绘感**

**字体：**
- 标题：Nunito（圆体），字重 700-800
- 正文：Nunito，字重 400-600

**颜色：**
- 主色：#FFB347（暖橙色）
- 次色：#FFCCB3（浅橙色）
- 背景：#FFF8F0（米白色）
- 文字：#5D4037（棕色）

**布局：**
- 圆润的卡片（border-radius: 24px）
- 卡片略微倾斜旋转（不同角度）
- 元素浮动、重叠效果

**动画：**
- 页面加载时元素从两侧滑入
- 宠物卡片 hover 时像宠物摇头（rotate 动画）
- 按钮 hover 时弹跳效果

**细节：**
- 所有圆角用 16-24px
- 阴影温暖柔和（0 8px 24px rgba(255,179,71,0.3)）
- 背景添加爪印图案装饰
- 图片用不规则裁切（clip-path）
- 手绘风格的图标（outline 风格）
```

生成的页面会是一个温暖、可爱、让人想领养宠物的界面。

## 5. 实战二：用 Skills 快速生成仪表盘

Skills 特别适合需要大量页面的后台系统。

### 5.1 使用 UI/UX Pro Max

```
使用 UI/UX Pro Max 的 Dashboard Dark 风格，
帮我做一个 SaaS 产品管理后台的仪表盘页面，包含：

**顶部：** 四个统计卡片（用户数、活跃用户、收入、API 调用）

**中间：**
- 左边：用户增长折线图（最近 7 天）
- 右边：订阅计划分布饼图

**底部：** 最近活动列表（时间、用户、操作）
```

AI 会自动应用深色仪表盘的设计规范：
- 深灰背景（#1A1A2E）
- 高对比度卡片（#16213E）
- 鲜艳的数据颜色（蓝色、绿色、橙色）
- 玻璃拟态效果的悬浮卡片

### 5.2 使用 frontend-design Skill

```
使用 frontend-design skill，
帮我做一个个人博客的主页，风格要独特、有个性
```

AI 会选择一个非主流的美学方向（比如复古未来主义或杂志风格），然后用独特的字体、配色、布局来实现。

## 6. 实战三：创建自己的设计系统 Skill

如果你有固定的品牌风格，可以创建自己的 Skill，让所有 AI 生成的页面都符合你的品牌。

### 6.1 创建 Skill 文件

在项目中创建 `.claude/skills/my-brand/SKILL.md`：

````markdown
---
name: my-brand
description: 我的项目专用设计系统，确保所有 UI 遵循统一的设计语言
---

# 我的项目设计系统

## 品牌颜色
- 主色：#6366F1（Indigo 500）
- 次色：#8B5CF6（Violet 500）
- 成功：#10B981
- 警告：#F59E0B
- 错误：#EF4444
- 背景：#F9FAFB
- 卡片：#FFFFFF

## 字体系统
- 标题：Plus Jakarta Sans
  - H1: 700, 48px
  - H2: 600, 36px
  - H3: 600, 24px
- 正文：Inter
  - Body: 400, 16px
  - Small: 400, 14px

## 间距系统
- 基础单位：4px
- 组件内边距：8px / 12px / 16px
- 区块间距：24px / 32px / 48px
- 页面边距：64px

## 圆角
- 按钮：8px
- 卡片：12px
- 输入框：8px
- 模态框：16px

## 阴影
- 小：0 1px 3px rgba(0,0,0,0.1)
- 中：0 4px 12px rgba(0,0,0,0.1)
- 大：0 8px 24px rgba(0,0,0,0.12)

## 动画
- 过渡时间：150ms / 300ms
- 缓动函数：cubic-bezier(0.4, 0, 0.2, 1)
- hover 效果：轻微放大（scale-105）

## 禁止使用的样式
- 不要使用紫色渐变背景
- 不要使用 Inter 以外的字体
- 不要使用大于 16px 的圆角
- 不要使用纯黑（#000000），用 #1F2937
````

### 6.2 使用自己的 Skill

创建后，你只需要在提示词中说：

```
使用 my-brand skill，帮我做一个用户设置页面
```

AI 就会自动应用你定义的所有设计规范。

## 7. 小结

让 AI 生成漂亮界面有两种方法：

| 方法 | 优点 | 缺点 | 适用场景 |
| :--- | :--- | :--- |
| **提示词描述** | 灵活、每次可调整 | 需要重复写 | 一次性页面、实验不同风格 |
| **Skills 插件** | 一次安装、持续生效 | 需要安装配置 | 有固定风格要求的项目 |

**Vibe Coding 工作流建议：**

1. **探索阶段**：用不同的风格提示词实验，找到你喜欢的美学方向
2. **确定风格后**：安装对应的 Skill（UI/UX Pro Max 或 frontend-design）
3. **品牌项目**：创建自己的 Skill，统一整个项目的设计语言

### 练习

选择以下任一场景，用本节课的方法从零完成：

1. 用风格提示词为你之前做的一个项目重新设计界面（选一种你喜欢的风格）
2. 安装 UI/UX Pro Max，用它的某个风格生成一个新页面
3. 创建你自己的设计系统 Skill，定义你的品牌颜色和字体

---

## 附录：设计风格速查表

| 风格 | 关键词 | 适用场景 | 示例产品 |
| :--- | :--- | :--- | :--- |
| **极简主义** | 留白、单色、简洁 | 高端产品、个人作品集 | Apple官网 |
| **玻璃拟态** | 毛玻璃、渐变、模糊 | 科技产品、SaaS 落地页 | macOS Big Sur |
| **新野兽派** | 粗边框、硬阴影、纯色 | 潮流品牌、艺术类网站 | Brassius |
| **Bento Grid** | 网格、拼贴、卡片 | 信息展示、仪表盘 | Apple 宣传页 |
| **复古未来** | 霓虹、渐变、合成器波 | 游戏类、音乐类 | STRANGER THINGS |
| **手绘风格** | 不规则、圆润、插画 | 教育类、儿童产品 | Duolingo |
| **杂志风** | 大字体、不对称、留白 | 内容型网站、博客 | Medium |
| **暗色奢华** | 深色、金色、精致 | 高端产品、奢侈品 | 各种高端品牌 |

## 附录：Skills 安装速查

```bash
# UI/UX Pro Max
npm install -g uipro-cli
uipro init --ai claude

# Anthropic frontend-design
npx skills add anthropics/skills/frontend-design

# Anthropic brand-guidelines
npx skills add anthropics/skills/brand-guidelines

# 查看 Claude Code 中已安装的 Skills
/help
```

## 附录：配色方案推荐

| 配色方案 | 主色 | 点缀色 | 背景 | 风格 |
| :--- | :--- | :--- | :--- | :--- |
| **日落** | #F97316 | #FBBF24 | #FFF7ED | 温暖、活力 |
| **海洋** | #0EA5E9 | #06B6D4 | #F0F9FF | 清新、专业 |
| **森林** | #10B981 | #34D399 | #ECFDF5 | 自然、健康 |
| **浆果** | #8B5CF6 | #EC4899 | #FAF5FF | 浪漫、创意 |
| **咖啡** | #78350F | #D97706 | #FFFBEB | 温暖、复古 |
| **单石** | #6B7280 | #9CA3AF | #F9FAFB | 专业、中性 |

## 附录：设计风格提示词速查 {#style-prompts}

让前端页面更好看可以尝试的提示词：

### 风格类别

| 风格 | 关键词（英文） | 核心视觉特征 | 提示词示例 |
|:---|:---|:---|:---|
| **波普艺术** | Pop Art | 大胆的撞色、黑色轮廓线、网点纹理 | Pop art style website, bold colors and comic dots, vibrant |
| **极简主义** | Minimalism | 大量留白、极少色彩与线条、无装饰 | Minimalist web design, ample white space, geometric, serene |
| **抽象表现主义** | Abstract Expressionism | 充满情感张力的笔触、泼洒色彩 | Abstract expressionism background, dynamic paint splashes, emotional |
| **复古风格** | Retro/Vintage | 旧式字体、做旧纹理、复古配色 | Retro 80s website design, neon grid and synthwave color palette |
| **赛博朋克** | Cyberpunk | 高对比霓虹色、故障艺术效果、暗黑背景 | Cyberpunk UI, neon lights on dark background, glitch effects |
| **新拟态** | Neumorphism | 柔和的阴影与高光，轻微凸起/凹陷质感 | Neumorphism design style, soft shadows, clean and modern |
| **生成式艺术** | Generative Art | 算法生成的流动的视觉图案 | Generative art background, flowing algorithmic patterns, digital |
| **酸性设计** | Acid Graphics | 金属质感、玻璃态、锯齿字体 | Acid graphics web layout, glass morphism, chaotic typography |
| **沉浸式3D** | Immersive 3D | 互动3D场景、空间感极强 | Immersive 3D website, interactive product model in space |
