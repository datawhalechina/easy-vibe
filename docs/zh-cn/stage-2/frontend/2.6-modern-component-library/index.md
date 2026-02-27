# 使用现代组件库更新你的界面

在前面的课程中，你已经学会了如何用设计工具画出界面、用 AI IDE 把设计稿变成代码，甚至完成了一个完整的前端项目。但你可能也发现了一个问题：自己从零写出来的按钮、表单、弹窗，虽然能用，但总觉得和"专业产品"差了点意思——样式不够统一、交互细节不够丝滑、适配不同屏幕也很头疼。

这就是**组件库**要解决的问题。

组件库是一套预先设计好、开发好的 UI 零件集合。按钮、输入框、下拉菜单、对话框、表格……这些你在任何产品中都会反复用到的界面元素，组件库已经帮你做好了，而且经过了大量用户的验证和打磨。你只需要像搭积木一样把它们组合起来，就能快速构建出专业级的界面。

## 你将学到

1. 理解什么是前端组件库，以及为什么现代开发几乎都在用它
2. 认识四个最具代表性的组件库，了解它们各自擅长的场景
3. 通过三个实战场景（落地页、产品页面、后台管理），学会用 AI IDE + 组件库进行 Vibe Coding
4. 学会阅读组件库文档，根据需求找到合适的组件并正确使用

## 1. 为什么需要组件库？

想象你在装修房子。你可以自己从木头开始做一把椅子，但更常见的做法是去宜家买一把——设计好看、质量稳定、说明书清晰，拿回家组装就行。

组件库就是前端开发中的"宜家"。它提供的不是家具，而是界面零件：

| 自己手写 | 使用组件库 |
| :--- | :--- |
| 需要自己处理样式、交互、动画 | 开箱即用，样式和交互已经打磨好 |
| 不同页面的按钮可能长得不一样 | 全局风格统一，自动保持一致性 |
| 适配手机、平板需要额外工作 | 大多数组件库已内置响应式支持 |
| 无障碍访问（Accessibility）容易遗漏 | 专业组件库已处理好键盘导航、屏幕阅读器等 |
| 开发速度慢 | 开发速度快，专注业务逻辑 |

简单来说：**组件库让你把时间花在"做什么"上，而不是"怎么画"上。**

### 眼见为实：同一个需求，加不加组件库的差距

光说不练没有说服力。我们在 Trae 中用几乎相同的需求，分别不指定和指定组件库，看看生成结果的差距。

**提示词一：不使用组件库**

```text
请帮我用 React + TypeScript 生成一个 AI 写作助手的数据仪表盘页面，包含：
- 顶部标题栏和导出按钮
- 四张统计卡片（用户数、活跃用户、文档数、收入），显示数值和涨跌趋势
- 一个折线图和一个饼图
- 一个用户列表表格，带分页
- 左侧导航侧边栏
```

在 Trae 中直接运行后的效果：

<!-- TODO: 替换为 Trae 中不使用组件库生成的仪表盘截图 -->
![Trae 生成的仪表盘（不使用组件库）](images/compare-without-lib.png)

**提示词二：使用 shadcn/ui 组件库**

```text
请帮我用 React + TypeScript + shadcn/ui + Tailwind CSS 生成一个 AI 写作助手的数据仪表盘页面，包含：
- 顶部标题栏和导出按钮
- 四张统计卡片（用户数、活跃用户、文档数、收入），显示数值和涨跌趋势
- 一个折线图和一个饼图
- 一个用户列表表格，带分页
- 左侧导航侧边栏
```

同样在 Trae 中直接运行后的效果：

<!-- TODO: 替换为 Trae 中使用 shadcn/ui 生成的仪表盘截图 -->
![Trae 生成的仪表盘（使用 shadcn/ui）](images/compare-with-lib.png)

同样的需求，唯一的区别只是在提示词开头加上了 `shadcn/ui + Tailwind CSS`，Trae 生成的结果在视觉一致性、交互细节、整体打磨程度上就完全不在一个层级。这就是组件库带来的"免费升级"——你只需要在提示词里多写一个组件库的名字。

## 2. 认识四个核心组件库

组件库数量众多（完整列表见[附录](#附录-更多组件库一览)），但你只需要先认识这四个最具代表性的：

| 组件库 | 框架 | 一句话定位 | 官网 |
| :--- | :--- | :--- | :--- |
| [Ant Design](https://ant.design) | React | 蚂蚁集团出品，企业级中后台的事实标准，组件覆盖面极广 | ant.design |
| [shadcn/ui](https://ui.shadcn.com) | React | 不装 npm 包，直接把代码复制到你项目里，基于 Tailwind CSS，定制自由度最高 | ui.shadcn.com |
| [HeroUI](https://heroui.com)（原 NextUI） | React | 默认样式精美、动画流畅，适合对视觉品质有要求的落地页和产品展示 | heroui.com |
| [Material UI](https://mui.com) | React | 最老牌的 React 组件库，实现 Google Material Design 规范，生态最成熟 | mui.com |

> Vue 用户同样有丰富选择：[Element Plus](https://element-plus.org)（国内最流行）、[Ant Design Vue](https://antdv.com)、[Naive UI](https://www.naiveui.com) 等，详见[附录](#附录-更多组件库一览)。

不同组件库擅长不同场景。接下来我们通过三个真实开发场景，带你体验如何用 AI IDE + 组件库进行 Vibe Coding。

为了展示不同组件库的风格和特点，我们在每个场景中刻意选用了不同的库。但请注意：**这只是为了让你多见识几种方案**，实际开发中你完全可以只用自己最顺手的那一个。比如你喜欢 shadcn/ui 的风格，用它做落地页、产品页、后台管理都没问题。选一个你觉得好看、用着舒服的，比什么都重要。

## 3. 实战一：用 HeroUI 构建产品落地页

**场景**：你做了一个 AI 写作助手产品，需要一个漂亮的落地页来展示产品特性、吸引用户注册。落地页需要视觉冲击力强、动画流畅、在手机上也好看。

**为什么选 HeroUI**：HeroUI 的默认样式就很精美，自带流畅的过渡动画，非常适合面向用户的展示型页面。

### 3.1 创建项目

```bash
# 使用 HeroUI 官方 CLI 创建项目
npx create-heroui-app@latest ai-writer-landing
cd ai-writer-landing
npm install
```

<!-- TODO: 替换为 HeroUI 官网首页或组件展示截图 -->
![HeroUI 组件库官网](images/heroui-homepage.png)

### 3.2 用 AI IDE 生成落地页

打开 AI IDE（Cursor、Trae 等），在对话框中输入：

```text
我正在用 HeroUI (React) 构建一个 AI 写作助手的落地页，请帮我实现以下结构：

1. 顶部导航栏：左侧 Logo + 产品名，右侧"功能"、"定价"、"关于"导航链接 + "开始使用"按钮
2. Hero 区域：大标题"让 AI 成为你的写作搭档"，副标题描述产品价值，一个"免费试用"主按钮和一个"查看演示"次按钮，下方放一张产品截图
3. 功能展示区：3 列卡片布局，分别展示"智能续写"、"风格调整"、"多语言翻译"三个核心功能，每张卡片有图标、标题、描述
4. 定价区域：3 个定价卡片（免费版、专业版、团队版），专业版高亮推荐
5. 底部 CTA：一句号召性文案 + 注册按钮
6. Footer：版权信息 + 社交媒体链接

请使用 HeroUI 组件库。
页面要有现代感，支持暗色模式，移动端响应式。
```

<!-- TODO: 替换为 AI IDE 生成落地页的过程截图或生成结果截图 -->
![AI 生成的 HeroUI 落地页效果](images/heroui-landing-result.png)

### 3.3 AI 会用到的关键组件

AI 生成的代码中，你会看到这些 HeroUI 组件：

```jsx
import {
  Navbar, NavbarBrand, NavbarContent, NavbarItem,
  Button,
  Card, CardHeader, CardBody, CardFooter,
  Divider,
  Link,
  Chip
} from '@heroui/react'
```

每个组件的作用：

| 组件 | 用途 | 落地页中的位置 |
| :--- | :--- | :--- |
| `Navbar` | 顶部导航栏 | 页面最顶部，固定不动 |
| `Button` | 按钮，支持多种变体和颜色 | CTA 按钮、导航按钮 |
| `Card` | 卡片容器 | 功能展示、定价卡片 |
| `Chip` | 小标签 | "推荐"、"最受欢迎"标记 |
| `Divider` | 分割线 | 区域之间的视觉分隔 |

### 3.4 迭代优化

生成的初版代码可能不完全满意，继续和 AI 对话调整：

```text
请帮我做以下调整：
1. Hero 区域的标题加上渐变色效果（从蓝色到紫色）
2. 功能卡片加上 hover 时的上浮动画
3. 定价区域的"专业版"卡片加上边框高亮和"最受欢迎"标签
4. 移动端导航改为汉堡菜单
```

<!-- TODO: 替换为迭代优化后的落地页效果截图 -->
![迭代优化后的落地页](images/heroui-landing-iterated.png)

> **Vibe Coding 的核心**：你不需要记住每个组件的 API，只需要用自然语言描述你想要的效果，AI 会帮你找到合适的组件和写法。遇到不满意的地方，继续对话迭代就好。

## 4. 实战二：用 shadcn/ui 构建产品页面

**场景**：你的 AI 写作助手需要一个用户登录后的主界面——左侧是文档列表，右侧是编辑器，顶部有工具栏。这是一个功能型产品页面，需要高度定制化的 UI。

**为什么选 shadcn/ui**：shadcn/ui 把组件代码直接放进你的项目，你可以随意修改任何细节。对于需要深度定制的产品界面，这种"拥有代码"的模式最灵活。

<!-- TODO: 替换为 shadcn/ui 官网或组件展示截图 -->
![shadcn/ui 组件库官网](images/shadcn-homepage.png)

### 4.1 创建项目

```bash
# 创建 Next.js 项目
npx create-next-app@latest ai-writer-app --typescript --tailwind --app
cd ai-writer-app

# 初始化 shadcn/ui
npx shadcn@latest init

# 按需添加组件（不是一次性安装所有组件）
npx shadcn@latest add button card input sidebar sheet dialog
```

shadcn/ui 的独特之处：每次 `add` 一个组件，它会把源代码复制到你项目的 `components/ui/` 目录下。你可以直接打开这些文件修改样式和行为。

### 4.2 用 AI IDE 生成产品界面

```text
我正在用 Next.js + shadcn/ui + Tailwind CSS 构建一个 AI 写作助手的主界面，请帮我实现：

整体布局：
- 左侧可折叠侧边栏（宽 280px）：顶部是"新建文档"按钮，下方是文档列表，每个文档显示标题和最后编辑时间，支持右键菜单（重命名、删除）
- 右侧主区域分为上下两部分：
  - 顶部工具栏：文档标题（可编辑）、字数统计、"AI 续写"按钮、"导出"下拉菜单
  - 下方编辑区域：一个大的文本输入区域，占满剩余空间

交互细节：
- 点击"AI 续写"按钮后，按钮变为加载状态，编辑器底部出现 AI 生成的文本（带打字机效果）
- 侧边栏在移动端变为抽屉式弹出
- 文档列表当前选中项高亮

请使用 shadcn/ui 组件库。
```

<!-- TODO: 替换为 AI 生成的 shadcn/ui 产品界面截图 -->
![AI 生成的 shadcn/ui 产品页面效果](images/shadcn-product-result.png)

### 4.3 AI 会用到的关键组件

```tsx
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import {
  Sheet,
  SheetContent,
  SheetTrigger
} from '@/components/ui/sheet'
import {
  Sidebar,
  SidebarContent,
  SidebarHeader
} from '@/components/ui/sidebar'
```

| 组件 | 用途 | 产品页面中的位置 |
| :--- | :--- | :--- |
| `Sidebar` | 可折叠侧边栏 | 左侧文档列表 |
| `Sheet` | 移动端抽屉 | 移动端侧边栏替代 |
| `DropdownMenu` | 下拉菜单 | "导出"按钮、右键菜单 |
| `Dialog` | 对话框 | 重命名、删除确认 |
| `Button` | 按钮，支持 variant 和 loading | 各种操作按钮 |
| `Input` | 输入框 | 文档标题编辑 |

### 4.4 定制组件样式

shadcn/ui 的优势在于你可以直接修改组件源码。比如你想让按钮的圆角更大：

```text
请帮我修改 components/ui/button.tsx，
把所有按钮的默认圆角从 rounded-md 改为 rounded-xl，
并给 primary 变体加上微妙的阴影效果
```

AI 会直接修改你项目中的组件文件，而不是覆盖 npm 包的样式——这就是 shadcn/ui "拥有代码"的好处。

<!-- TODO: 替换为 shadcn/ui 组件源码在项目中的截图，展示可直接编辑 -->
![shadcn/ui 组件代码在项目中可直接编辑](images/shadcn-code-ownership.png)

## 5. 实战三：用 Ant Design 构建后台管理界面

**场景**：你的 AI 写作助手上线后，需要一个管理后台来查看用户数据、管理文档内容、处理付费订单。后台管理系统的核心是数据展示和操作效率。

**为什么选 Ant Design**：Ant Design 在中后台领域积累最深，表格、表单、图表等业务组件开箱即用，内置了大量企业级交互模式（批量操作、高级筛选、数据导出等）。

<!-- TODO: 替换为 Ant Design 官网或 Pro Components 展示截图 -->
![Ant Design 组件库官网](images/antd-homepage.png)

### 5.1 创建项目

```bash
# 使用 Ant Design Pro 脚手架（内置布局、路由、权限）
npx create-umi@latest ai-writer-admin
# 选择 Ant Design Pro 模板
cd ai-writer-admin
npm install
```

或者从零开始：

```bash
npx create-react-app ai-writer-admin --template typescript
cd ai-writer-admin
npm install antd @ant-design/icons @ant-design/pro-components
```

### 5.2 用 AI IDE 生成管理后台

```text
我正在用 React + Ant Design 组件库构建 AI 写作助手的管理后台，请帮我实现用户管理页面：

页面布局：
- 整体框架为左侧菜单 + 顶部面包屑
- 左侧菜单项：仪表盘、用户管理、文档管理、订单管理、系统设置

用户管理页面内容：
- 顶部统计卡片：总用户数、今日新增、活跃用户数、付费用户数
- 搜索筛选区：用户名搜索、注册时间范围、用户状态下拉筛选、"搜索"和"重置"按钮
- 用户表格：
  - 列：头像、用户名、邮箱、注册时间、订阅计划（用彩色标签区分）、状态（用徽标显示）、操作
  - 支持分页（每页 20 条）
  - 支持批量选择 + 批量操作（禁用、导出）
  - 操作列：查看详情、编辑、禁用（需要二次确认）
- 点击"查看详情"弹出侧边抽屉，显示用户完整信息和最近文档列表

请使用 Ant Design 组件库。
```

<!-- TODO: 替换为 AI 生成的 Ant Design 后台管理界面截图 -->
![AI 生成的 Ant Design 后台管理界面](images/antd-admin-result.png)

### 5.3 AI 会用到的关键组件

```tsx
import { PageContainer, ProLayout } from '@ant-design/pro-components'
import { ProTable } from '@ant-design/pro-components'
import { StatisticCard } from '@ant-design/pro-components'
import {
  Button, Tag, Badge, Space, Drawer,
  Popconfirm, message, Modal
} from 'antd'
import {
  UserOutlined, SearchOutlined, ExportOutlined
} from '@ant-design/icons'
```

| 组件 | 用途 | 后台中的位置 |
| :--- | :--- | :--- |
| `ProLayout` | 后台整体布局框架 | 页面骨架（菜单 + 内容区） |
| `ProTable` | 高级表格，内置搜索、分页、列设置 | 用户列表、文档列表、订单列表 |
| `StatisticCard` | 数据统计卡片 | 仪表盘、页面顶部概览 |
| `Tag` / `Badge` | 状态标签 | 订阅计划、用户状态 |
| `Drawer` | 侧边抽屉 | 用户详情、编辑表单 |
| `Popconfirm` | 气泡确认框 | 删除、禁用等危险操作 |

### 5.4 继续迭代：添加仪表盘

```text
请帮我实现仪表盘页面：

1. 顶部 4 个统计卡片（总用户、总文档、今日 API 调用次数、月收入），每个卡片显示数值和环比变化
2. 中间一行两列：
   - 左侧：最近 7 天的用户增长折线图（用 @ant-design/charts）
   - 右侧：订阅计划分布饼图
3. 底部：最近操作日志表格（时间、用户、操作类型、详情）

使用 Ant Design 的 Card、Row、Col 布局，图表用 @ant-design/charts
```

<!-- TODO: 替换为仪表盘页面效果截图 -->
![Ant Design 仪表盘页面效果](images/antd-dashboard-result.png)

> **后台管理的 Vibe Coding 技巧**：后台页面结构相对固定（表格 + 搜索 + 弹窗），非常适合用 AI 批量生成。你可以先让 AI 生成一个"用户管理"页面作为模板，然后说"参考用户管理页面的结构，帮我生成文档管理页面"，AI 会复用相同的布局模式。

## 6. 学会查文档：组件库的"说明书"

Vibe Coding 中 AI 会帮你写大部分代码，但当 AI 生成的结果不对、或者你想微调某个组件的行为时，**查文档**是最快的解决方式。

以 Ant Design 为例，它的文档地址是：`https://ant.design/components/overview-cn`

查文档的标准流程：

1. **明确需求**：比如"我需要表格支持行选择"
2. **在文档中搜索**：搜索"Table"进入表格组件页面
3. **查看示例**：文档中每个组件都有多个在线示例，找到"可选择"示例
4. **复制代码**：把示例代码复制到你的项目中
5. **查看 API 表格**：在页面底部找到 `rowSelection` 属性的完整配置项

> 你也可以把文档链接直接发给 AI IDE："请参考 https://ant.design/components/table-cn 的 rowSelection API，帮我给用户表格加上批量选择功能"。给 AI 提供文档链接，生成的代码会更准确。

各组件库的文档地址速查：

| 组件库 | 文档地址 |
| :--- | :--- |
| Ant Design | `https://ant.design/components/overview-cn` |
| shadcn/ui | `https://ui.shadcn.com/docs/components` |
| HeroUI | `https://heroui.com/docs/components` |
| Material UI | `https://mui.com/material-ui/all-components/` |
| Element Plus | `https://element-plus.org/zh-CN/component/overview.html` |

## 7. 小结

三个实战场景覆盖了最常见的前端开发需求：

| 场景 | 推荐组件库 | 核心特点 |
| :--- | :--- | :--- |
| 落地页 / 展示页 | HeroUI | 默认样式精美，动画流畅，视觉冲击力强 |
| 产品功能页面 | shadcn/ui | 代码完全可控，深度定制灵活 |
| 后台管理系统 | Ant Design | 业务组件丰富，表格表单开箱即用 |

Vibe Coding 的工作流总结：

1. 根据场景选择合适的组件库
2. 用 AI IDE 描述你想要的页面结构和交互
3. AI 生成初版代码，你预览效果
4. 用自然语言继续迭代调整
5. 遇到细节问题时查阅组件库文档

### 练习

选择以下任一场景，用 AI IDE + 组件库从零完成：

1. 用 HeroUI 为你之前做的项目（比如霍格沃茨画像）做一个展示落地页
2. 用 shadcn/ui 构建一个笔记应用的主界面（侧边栏 + 编辑器）
3. 用 Ant Design 构建一个简单的内容管理后台（文章列表 + 新建文章表单）

---

## 附录：更多组件库一览

除了正文介绍的四个核心库，前端生态中还有大量优秀的组件库。下面按框架分类列出，方便你根据项目需求选择。

### Vue 生态

| 组件库 | Stars | 简介 | 适用场景 |
| :--- | :--- | :--- | :--- |
| [Element Plus](https://element-plus.org) | ~27k | 饿了么团队打造的 Vue 3 企业级组件库，国内使用最广泛，中文生态极佳 | 中后台管理系统 |
| [Vuetify](https://vuetifyjs.com) | ~41k | 最流行的 Vue Material Design 组件库，80+ 组件，文档完善 | Google 设计风格项目 |
| [Ant Design Vue](https://antdv.com) | ~21k | 基于蚂蚁设计体系的 Vue 3 组件库，设计规范统一 | 企业级中后台 |
| [Naive UI](https://www.naiveui.com) | ~18k | TypeScript 编写，主题定制性极强，不依赖 CSS 预处理器 | 对设计有独特要求的项目 |
| [Quasar](https://quasar.dev) | ~27k | 一套代码构建 SPA、SSR、PWA、移动端和桌面端应用 | 跨平台项目 |
| [Vant](https://vant-ui.github.io/vant) | ~24k | 有赞团队开发的轻量级移动端组件库，覆盖电商常见需求 | 移动端 H5 页面 |
| [PrimeVue](https://primevue.org) | ~14k | 90+ 组件，支持多种主题（Material、Bootstrap 等） | 需要丰富组件和多主题 |
| [Arco Design Vue](https://arco.design/vue) | ~3k | 字节跳动出品，组件质量高，内置暗色模式 | 中后台产品 |
| [TDesign Vue Next](https://tdesign.tencent.com/vue-next) | ~2k | 腾讯出品，设计语言统一，覆盖桌面端常用场景 | 腾讯生态或企业级项目 |

### React 生态

| 组件库 | Stars | 简介 | 适用场景 |
| :--- | :--- | :--- | :--- |
| [Material UI (MUI)](https://mui.com) | ~95k | Google Material Design 规范的老牌实现，组件最全面，生态最成熟 | 快速构建企业级应用 |
| [Ant Design](https://ant.design) | ~94k | 蚂蚁集团出品，内置大量高质量业务组件，中文开发者社区主导地位 | 企业级中后台 |
| [shadcn/ui](https://ui.shadcn.com) | ~83k | 代码复制到项目中而非 npm 安装，基于 Radix UI + Tailwind CSS，完全可控 | 需要高度定制的项目 |
| [Chakra UI](https://chakra-ui.com) | ~39k | 以开发体验为核心，API 简洁，内置无障碍访问支持 | 快速原型开发 |
| [Mantine](https://mantine.dev) | ~28k | 100+ 组件和 50+ hooks，涵盖日期选择器、富文本编辑器等高级组件 | 需要开箱即用的全功能方案 |
| [Headless UI](https://headlessui.com) | ~27k | Tailwind Labs 官方出品的无样式组件库，同时支持 React 和 Vue | 搭配 Tailwind CSS 使用 |
| [HeroUI](https://heroui.com) | ~24k | 基于 Tailwind CSS + React Aria，默认样式精美，动画流畅 | 追求视觉品质的项目 |
| [Radix UI](https://www.radix-ui.com) | ~17k | 无样式底层组件原语库，专注无障碍和组件行为，是 shadcn/ui 的底层基础 | 构建自定义设计系统 |
