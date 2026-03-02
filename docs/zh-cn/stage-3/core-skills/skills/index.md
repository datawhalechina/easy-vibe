# Claude Code Skills 完全指南

## Skills 简介

**Claude Code Skills** 是一种将专业知识、工作流程和最佳实践打包成"可复用技能包"的功能。

想象一下，Skills 就像是给 Claude 配备的"技能书"——当你需要它完成特定任务时，它不再需要你一遍遍地解释要求，而是直接按照预先定义好的技能标准来执行工作。

### 为什么需要 Skills？

在没有 Skills 之前，使用 Claude Code 存在一些问题：

- **重复指令**：每次都要解释"代码要符合什么风格"、"提交信息要怎么写"
- **知识无法沉淀**：团队成员各自的使用经验无法共享
- **标准不统一**：不同的人用 Claude，结果可能完全不同
- **效率低下**：常见的任务每次都要从头解释

Skills 解决了这些问题，让 Claude 变成一个"有经验的团队成员"——它知道你的项目规范、工作流程和最佳实践。

---

## 为什么现在要学 Skills？

**Skills 正在成为 AI 工程师的必备技能**：

- **社区热度高**：GitHub 上相关仓库星标快速增长，例如 OpenSkills 项目已收获 7.2k stars，Obsidian Skills 9 天暴涨 6.6k stars
- **官方支持**：Anthropic 官方维护 Skills 仓库，Vercel 推出 Agent Skills 和 find-skills 工具
- **实用性强**：从代码审查、Git 操作到视频制作、PPT 生成，覆盖多种场景。skills.sh 平台已有 60K+ 订阅量的热门技能
- **效率提升**：一次配置，反复使用，让 Claude 真正成为你的"数字员工"
- **开发者认可**：多个技术社区推荐，被广泛认为是提升 AI 编程效率的关键工具

---

## 快速开始

理解了 Skills 的价值后，让我们马上动手体验！本节会带你安装第一个 Skill，并完成几个有趣的实战任务，快速建立起直观认识。

### 第一步：安装 find-skills（强烈推荐必装）

在开始使用 Skills 之前，强烈推荐先安装 `find-skills` —— 这是 AI Agent 领域的"技能搜索神器"，目前已有 60K+ 订阅量。

**find-skills 是什么？**

简单来说，find-skills 就像是 AI Agent 的"应用商店搜索器"。当你需要完成某个任务但本地没有对应的 Skill 时，它会自动帮你搜索并推荐最合适的 Skill。

**安装 find-skills**：

```bash
npx skills add vercel-labs/skills@find-skills -g -y
```

安装完成后，你就可以直接告诉 Claude 你的需求，它会通过 find-skills 自动搜索相关技能。

**使用示例**：

```
我需要做一个 React 组件的性能优化，帮我找找有什么技能可以用
```

Claude 会通过 find-skills 搜索，然后告诉你找到了哪些相关技能，你可以选择安装。

**为什么推荐先装 find-skills？**

没有 find-skills 之前：
- 手动在 GitHub 搜索相关技能
- 逐个复制、安装、配置
- 反复调试适配

有了 find-skills 之后：
- 一句话描述需求
- AI 自动搜索最匹配的技能
- 一键安装，立即可用

**Windows 用户注意**：官方版本对 Windows 支持有限，社区制作了 Windows 适配版本，支持 CMD 和 PowerShell，并增加了中文搜索功能。

下载 Windows 版本：[github.com/tongbei821/customize-skills](https://github.com/tongbei821/customize-skills/blob/main/findskills/SKILL.md)

安装步骤：
1. 下载 Windows 版本的 SKILL.md
2. 替换 `C:/Users/你的用户名/.agents/skills/find-skills` 目录下的文件
3. 重启 Claude Code 即可生效

**相关链接**：
- [Skills 官网](https://skills.sh/) - 浏览所有可用技能
- [find-skills 仓库](https://github.com/vercel-labs/agent-skills) - 官方源码

### 安装并体验第一个 Skill

安装 find-skills 后，让我们用它来搜索并安装第一个好玩 的 Skill —— Remotion 视频制作工具。

#### 第一步：用 find-skills 搜索 Remotion

在 Claude Code 中输入：

```
帮我找找 Remotion 相关的技能，我想做视频
```

Claude 会通过 find-skills 搜索，推荐 `remotion-dev/skills`。

#### 第二步：安装 Remotion Skills

```bash
npx skills add remotion-dev/skills -g
```

#### 第三步：用它做个好玩的！

Remotion 是一个用 React 代码制作视频的框架，安装这个 Skill 后，你可以用自然语言让 Claude 帮你写视频代码。

**任务 1：做个炫酷的文字动画视频**

```
用 Remotion 做一个视频：
- 1920x1080，5 秒
- 一行文字 "Hello World" 从左边飞进来
- 同时带旋转和缩放效果
- 背景是渐变色
```

Claude 会生成完整的 Remotion 代码，你可以运行它看到动画效果。

**任务 2：做一个数据可视化视频**

```
做一个 10 秒的视频，展示数据增长：
- 开始是一个柱状图
- 柱子逐个长高（带动画）
- 数字滚动增加
- 最后显示 "增长 300%" 的大字
```

**任务 3：做一个多场景切换的演示视频**

```
做一个产品演示视频，三个场景：
场景 1：Logo 淡入显示，2 秒
场景 2：产品特性列表逐个出现，3 秒
场景 3：CTA 按钮弹出，2 秒
每个场景之间有平滑过渡
```

**运行代码**：

Claude 生成的代码是完整的 Remotion 项目，你可以：

1. 创建新项目：`npx create-video my-video`
2. 把 Claude 生成的代码复制进去
3. 运行预览：`npm start`
4. 渲染视频：`npm run build`

---

### 第二个 Skill：用 find-skills 解决"前端又丑又卡"

#### 第一步：用自然语言描述你的问题

直接告诉 Claude 你的抽象需求：

```
我的网页看起来很土，而且加载很慢，帮我找找有什么技能可以用
```

或者更具体一点：

```
我想让前端变好看，然后别那么卡
```

#### 第二步：Claude 会用 find-skills 搜索

Claude 会通过 find-skills 搜索 skills.sh 数据库，推荐相关的技能。对于"变好看+不卡"的需求，它会推荐：

**anthropics/skills/frontend-design**（官方技能）

这个技能专门解决 AI 生成的界面"看起来很土"的问题，让 Claude 设计出：

- 独特的视觉风格（避开千篇一律的"AI 模板感"）
- 专业的配色和字体
- 流畅的动画效果
- 生产级别的代码质量（代码干净，性能自然好）

#### 第三步：安装并使用

**安装**：

```bash
npx skills add anthropics/skills/frontend-design -g
```

**可以用它完成的任务**：

```
帮我重新设计这个页面，要看起来很专业，别像 AI 生成的
```

```
这个 UI 太丑了，用更现代的设计风格重写
```

```
做一个暗色主题的 Dashboard，要有科技感
```

Claude 会根据这个技能的规范，帮你设计出：
- 独特的视觉方向（极简主义、复古未来主义、野兽派等）
- 精心挑选的配色和字体
- 合理的间距和布局
- 流畅的交互动画

---

### 两个 Skills 的对比

| Skills | 解决什么问题 | 好玩程度 |
|--------|-------------|---------|
| **remotion-dev/skills** | 用代码做视频 | ⭐⭐⭐⭐⭐ |
| **anthropics/skills/frontend-design** | 让前端变好看 | ⭐⭐⭐⭐ |

---

### 第三个 Skill：用 frontend-slides 快速制作精美 PPT

#### 简介

**frontend-slides** 是一个让你用自然语言创建精美 HTML 演示文稿的 Skill —— 即使你不懂任何 CSS 或 JavaScript！

它的核心特点是"**展示而非讲述**"：当你描述不出想要的设计风格时，它会生成 3 个视觉预览让你选择，而不是让你用语言描述"蓝色背景、大字体"这种抽象需求。

#### 安装 frontend-slides

**方式一：手动安装**

```bash
# 创建 skill 目录
mkdir -p ~/.claude/skills/frontend-slides

# 下载文件（或从 GitHub 复制）
# 1. 访问 https://github.com/zarazhangrui/frontend-slides
# 2. 下载 SKILL.md 和 STYLE_PRESETS.md
# 3. 放到 ~/.claude/skills/frontend-slides/ 目录
```

**方式二：使用 find-skills 安装**

```
帮我找找做 PPT 演示文稿相关的技能
```

Claude 会通过 find-skills 搜索并推荐 frontend-slides。

#### 使用场景

**场景 1：从零创建演示文稿**

```
/frontend-slides

我想创建一个 AI 创业项目的融资路演 PPT，大概 10 页
```

Claude 会引导你：
1. 询问每页内容（标题、要点、图片）
2. 询问你想要的感觉（惊艳？专业？温馨？）
3. 生成 3 个视觉风格预览供你选择
4. 创建完整的 HTML 演示文稿
5. 在浏览器中打开预览

**场景 2：转换 PowerPoint 文件**

```
/frontend-slides

把我的 presentation.pptx 转成网页版演示
```

Claude 会：
1. 提取 PPT 中的所有文本、图片和备注
2. 显示提取的内容供你确认
3. 让你选择视觉风格
4. 生成保留所有原始内容的 HTML 演示文稿

**场景 3：快速生成风格预览**

```
/frontend-slides

我想做一个技术分享的 PPT，先给我看看可选的视觉风格
```

Claude 会直接生成 3 个不同风格的预览页面：
- **暗色主题**：Neon Cyber、Terminal Green、Deep Space
- **亮色主题**：Paper & Ink、Swiss Modern、Soft Pastel
- **特殊风格**：Brutalist、Gradient Wave

#### 内置的视觉风格

| 风格名称 | 特点 | 适用场景 |
|---------|------|---------|
| **Neon Cyber** | 未来科技感、粒子效果 | 技术分享、AI 产品 |
| **Midnight Executive** | 高端商务、值得信赖 | 商务汇报、融资路演 |
| **Paper & Ink** | 编辑风格、文学气息 | 内容创作、教育分享 |
| **Swiss Modern** | 简洁几何、包豪斯风格 | 设计作品、极简主义 |
| **Brutalist** | 原始大胆、抓人眼球 | 艺术展示、个性表达 |

#### 输出效果

生成的演示文稿是一个**单文件 HTML**，包含：

- 完整的样式和交互代码
- 键盘导航（方向键、空格）
- 触摸/滑动支持
- 鼠标滚轮翻页
- 进度条和导航点
- 滚动触发动画
- 响应式设计

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <!-- 所有样式内联，零依赖 -->
</head>
<body>
    <section class="slide title-slide">
        <h1 class="reveal">你的标题</h1>
    </section>
    <!-- 更多幻灯片... -->
</body>
</html>
```

#### 为什么推荐？

1. **零依赖**：单个 HTML 文件，10 年后还能打开
2. **视觉发现**：不用描述设计，直接选择喜欢的
3. **PPT 转换**：保留现有内容，换上更好的皮肤
4. **生产级代码**：可访问性好、注释清晰、易于定制

**相关链接**：
- [frontend-slides GitHub 仓库](https://github.com/zarazhangrui/frontend-slides) - 6.1k+ Star
- [在线预览示例](https://github.com/zarazhangrui/frontend-slides#output-example)

---

### 三个 Skills 的对比

| Skills | 解决什么问题 | 好玩程度 | 实用程度 |
|--------|-------------|---------|---------|
| **remotion-dev/skills** | 用代码做视频 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| **anthropics/skills/frontend-design** | 让前端变好看 | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **frontend-slides** | 快速制作精美 PPT | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |

---

### 安装后如何使用

安装完成后，你不需要做任何额外配置。当你向 Claude 提出相关任务时，它会自动调用对应的 Skill。

查看已安装的 Skills：

```bash
npx skills list
```

---

## Skills 是什么？

### 核心概念

**Skills 是存储在文件系统中的"技能包"**，包含：

- **SKILL.md**：技能的定义文件（必需）
- **scripts/**：辅助脚本（可选）
- **templates/**：输出模板（可选）
- **references/**：参考文档（可选）

### Skills vs 提示词

你可能会有疑问：Skills 和直接给 Claude 发提示词有什么区别？

| 提示词 | Skills |
|--------|--------|
| 临时性的，每次都要重复说 | 持久化的，写一次反复用 |
| 存在对话历史中，占用 Token | 按需加载，节省 Token |
| 无法在会话间共享 | 可以在团队中共享 |
| 难以版本控制 | 可以用 Git 管理 |

### Skills 的两种类型

**全局 Skills（个人）**：
- 存放位置：`~/.claude/skills/`
- 作用范围：所有项目
- 适用场景：个人通用技能

**项目 Skills（团队）**：
- 存放位置：`项目目录/.claude/skills/`
- 作用范围：当前项目
- 适用场景：团队共享、项目特定规范

### Skills 如何工作

当 Claude Code 启动时，它会：

1. 扫描 Skills 目录
2. 解析每个 SKILL.md 文件
3. 提取 YAML frontmatter 元数据
4. 将技能内容加入"知识库"
5. 根据 description 自动匹配触发

---

## SKILL.md 文件结构

### 基本结构

一个完整的 Skill 目录是这样的：

```
my-skill/
├── SKILL.md          # 必需：技能定义文件
├── scripts/          # 可选：辅助脚本
├── templates/        # 可选：输出模板
├── references/       # 可选：参考文档
└── examples/         # 可选：示例文件
```

### SKILL.md 模板

SKILL.md 文件分为两个部分：

**第一部分：YAML Frontmatter（元数据）**

```yaml
---
name: skill-name              # 技能名称，会变成 /skill-name 命令
description: 简短描述         # 用于 Claude 自动匹配触发
category: development         # 分类
tags:                           # 标签
  - code
  - automation
---
```

**第二部分：Markdown 内容（指令）**

```markdown
# 技能标题

## 使用场景
什么时候用这个技能

## 执行步骤
1. 第一步
2. 第二步

## 注意事项
- 注意点 1
- 注意点 2
```

### 关键字段说明

| 字段 | 必填 | 说明 |
|------|------|------|
| `name` | 是 | 技能名称，只能用小写字母、数字、连字符 |
| `description` | 是 | 技能描述，越具体越容易被 Claude 自动匹配 |
| `category` | 否 | 分类标签 |
| `tags` | 否 | 更多分类标签 |
| `allowed-tools` | 否 | 允许使用的工具，无需权限即可用 |

---

## Skills vs MCP：有什么区别？

很多初学者会混淆 Skills 和 MCP，它们是完全不同的两个东西。

### 核心区别

| 维度 | Skills | MCP |
|------|--------|-----|
| **本质** | 知识和流程 | 工具和接口 |
| **提供什么** | 告诉 AI "怎么做" | 给 AI "能用什么" |
| **存储位置** | `skills/` 目录 | MCP 服务器 |
| **配置方式** | Markdown 文件 | JSON 配置文件 |
| **触发方式** | `/skill-name` 或自动识别 | 通过配置自动加载 |

### 形象比喻

如果把 Claude 比作一个"工作人员"：

- **MCP** 是给这个工作人员配备的"工具"（扳手、电脑、访问权限）
- **Skills** 是给这个工作人员的"操作手册"（怎么做代码审查、怎么提交代码）

### 它们的关系

Skills 和 MCP 不是竞争关系，而是互补关系：

```
用户任务 → Claude 识别需求
               ↓
        加载相关 Skills（知道怎么做）
               ↓
        通过 MCP 调用工具（有工具可用）
               ↓
        完成任务
```

### 举例说明

**场景：代码审查**

- **Skills** 定义：审查步骤、检查清单、输出格式
- **MCP** 提供：访问 GitHub PR、获取代码 diff 的能力

两者配合：Skills 告诉 Claude "怎么审查"，MCP 给 Claude "访问代码的能力"。

### 选择建议

| 你的需求 | 推荐方案 |
|----------|----------|
| 需要定义工作流程 | 用 Skills |
| 需要访问外部数据 | 用 MCP |
| 需要两者都有 | 配合使用 |

---

## 常用 Skills 获取资源

### 官方资源

- [Anthropic 官方 Skills 仓库](https://github.com/anthropics/skills) - 官方维护的技能集合
- [Claude Code 官方文档 - Skills](https://docs.anthropic.com/en/docs/claude-code/configuration/skills) - 官方文档

### GitHub 社区资源

| 仓库 | 说明 |
|------|------|
| [shanraisshan/claude-code-best-practice](https://github.com/shanraisshan/claude-code-best-practice) | Boris Cherny（Claude Code 负责人）维护，包含 Skills、Agents、Hooks 等 |
| [affaan-m/everything-claude-code](https://github.com/affaan-m/everything-claude-code) | 综合工具包，包含预配置 Skills |
| [JackyST0/awesome-agent-skills](https://github.com/JackyST0/awesome-agent-skills) | 精选 Skills 资源列表 |
| [jeffallan/claude-skills](https://github.com/jeffallan/claude-skills) | 66 个专业技能，300+ 参考文档 |
| [GitCode/awesome-claude-skills](https://gitcode.com/GitHub_Trending/aw/awesome-claude-skills) | 开源精选 |

### 如何安装社区 Skills

使用 find-skills，只需要告诉 Claude 你需要什么，它会自动搜索并推荐：

```
帮我找找有什么 React 性能优化相关的技能
```

Claude 会通过 find-skills 搜索 skills.sh 数据库，然后列出最相关的技能，你选择安装即可。

**搜索技巧**：

- 使用具体关键词："react testing" 优于 "testing"
- 组合「领域 + 动作」："nextjs deploy"、"typescript lint"
- 优先选择高安装量的技能（10K+ 说明经过实战检验）
- 关注 Trending 榜单发现新兴技能

---

## 如何创建自己的 Skills

创建 Skills 有两种方法：一种是直接让 Claude 帮你创建，另一种使用专门的 skill-creator 工具。

### 方法一：直接让 Claude 帮你创建

这是最简单的方式，直接用自然语言告诉 Claude 你的需求。

**示例**：

```
请帮我创建一个名为 "format-code" 的 skill，功能是自动格式化代码。

要求：
1. 自动检测编程语言类型
2. 应用对应的格式化规则
3. 返回格式化前后的 diff
```

Claude 会自动：
1. 创建目录结构
2. 生成 SKILL.md 文件
3. 填写 YAML frontmatter
4. 编写技能内容

**适用场景**：
- 快速创建简单技能
- 你知道要什么，但不熟悉 SKILL.md 格式
- 想要快速迭代和修改

### 方法二：使用 skill-creator

skill-creator 是一个专门用来创建 Skills 的工具，会引导你一步步完成。

**安装**：

```bash
npx skills add anthropics/skills@skill-creator -g
```

或者安装整个官方 skills 仓库：

```bash
npx skills add anthropics/skills -g
```

**使用**：

```
/skill-creator
```

然后按提示填写：
- 技能名称
- 功能描述
- 使用场景
- 执行步骤

skill-creator 会：
1. 引导你明确技能用途
2. 生成 SKILL.md 草稿
3. 创建测试用例
4. 运行评估并优化

**适用场景**：
- 创建复杂的技能
- 需要规范的创建流程
- 想要测试和验证技能

### 两种方法对比

| 方法一：直接创建 | 方法二：skill-creator |
|-----------------|---------------------|
| 快速简单 | 步骤引导 |
| 适合简单技能 | 适合复杂技能 |
| 直接对话完成 | 规范流程 |
| 灵活修改 | 有测试验证 |

### 技巧：如何写好需求

**好的需求描述**：

```
创建一个 "git-commit" skill，功能是自动提交代码。

执行步骤：
1. 检查有哪些文件被修改
2. 生成符合 Conventional Commits 规范的提交信息
3. 执行 git commit
4. 询问是否需要 push

注意事项：
- 提交前先检查是否有敏感信息
- 不要提交 dist/node_modules/ 等目录
```

**不好的需求描述**：

```
帮我写一个提交代码的 skill
```

太模糊了，Claude 不知道具体要做什么。

---

## 常用 Skills 实例

### 实例 1：代码审查 Skill

创建目录和文件：

```bash
mkdir -p ~/.claude/skills/review-pr
```

```bash
cat > ~/.claude/skills/review-pr/SKILL.md << 'EOF'
---
name: review-pr
description: 审查 Pull Request 的代码质量、安全性和测试覆盖率
---

你是一位资深的代码审查者。

## 审查流程

1. **代码风格检查**
   - 代码是否符合团队规范
   - 命名是否清晰
   - 注释是否充分

2. **安全性检查**
   - 是否有安全漏洞
   - 敏感信息是否暴露
   - 输入验证是否完善

3. **测试检查**
   - 是否有足够的测试
   - 测试用例是否覆盖边界情况
   - 测试是否可运行

4. **总体评价**
   - 优点是什么
   - 需要改进的地方
   - 建议是否批准合并

## 输出格式

请以清晰的结构输出审查结果，使用列表形式。
EOF
```

使用方式：

```
/review-pr
请审查当前分支的 PR
```

### 实例 2：Git 自动提交 Skill

```bash
mkdir -p ~/.claude/skills/git-commit
```

```bash
cat > ~/.claude/skills/git-commit/SKILL.md << 'EOF'
---
name: git-commit
description: 自动检测修改、生成提交信息并提交代码
---

你是一位熟练的 Git 用户。

## 执行流程

1. **检查修改**
   运行 `git status` 查看修改的文件
   运行 `git diff` 查看具体改动

2. **生成提交信息**
   分析改动的性质
   生成符合 Conventional Commits 格式的提交信息
   格式：`type(scope): description`

3. **安全检查**
   检查是否有敏感信息（密钥、密码、token）
   检查是否包含了不该提交的目录

4. **确认后执行**
   显示提交信息供确认
   执行 `git add` 和 `git commit`
   询问是否需要 push

## 注意事项

- 不要提交 node_modules/、dist/、.next/ 等目录
- 提交前先运行测试确保代码可用
- 提交信息要清晰说明改动内容
EOF
```

使用方式：

```
/git-commit
```

### 实例 3：测试生成 Skill

```bash
mkdir -p ~/.claude/skills/gen-test
```

```bash
cat > ~/.claude/skills/gen-test/SKILL.md << 'EOF'
---
name: gen-test
description: 为代码自动生成单元测试，确保功能正确性
---

你是一位测试开发工程师。

## 工作流程

1. **分析代码**
   - 理解函数/类的功能
   - 识别输入和输出
   - 找出边界情况

2. **生成测试**
   - 使用合适的测试框架
   - 覆盖正常情况
   - 覆盖边界情况
   - 覆盖异常情况

3. **验证测试**
   - 确保测试可以运行
   - 确保测试能检测到问题
   - 不要过度模拟实现

## 测试框架

- JavaScript/TypeScript：Jest 或 Vitest
- Python：pytest
- Go：testing 包

## 输出格式

先输出测试代码，然后说明如何运行测试。
EOF
```

使用方式：

```
/gen-test
为 src/utils.ts 生成单元测试
```

### 实例 4：文档生成 Skill

```bash
mkdir -p ~/.claude/skills/gen-readme
```

```bash
cat > ~/.claude/skills/gen-readme/SKILL.md << 'EOF'
---
name: gen-readme
description: 为项目自动生成 README 文档
---

你是一位技术文档专家。

## 工作流程

1. **分析项目**
   - 扫描项目目录结构
   - 查看 package.json 或其他配置文件
   - 阅读现有代码

2. **生成内容**
   - 项目简介
   - 安装方法
   - 使用说明
   - API 文档
   - 开发指南

3. **格式化**
   - 使用清晰的章节结构
   - 添加代码示例
   - 添加适当的徽章
   - 添加许可证信息

## 标准 README 结构

- 项目标题和简介
- 功能特点
- 安装方法
- 快速开始
- 使用说明
- API 文档
- 开发指南
- 贡献指南
- 许可证
EOF
```

使用方式：

```
/gen-readme
为当前项目生成 README 文档
```

---

## 进阶技巧

### Skills 与 Hooks 配合

Hooks 可以在特定事件时自动执行操作，结合 Skills 可以实现更强大的自动化。

例如：代码保存后自动格式化

```json
// .claude/hooks.json
{
  "hooks": {
    "PostToolUse": [{
      "matcher": {
        "tool_name": "Edit"
      },
      "hook": {
        "type": "command",
        "command": "/format-code"  // 调用 format-code skill
      }
    }]
  }
}
```

### Skills 与 Commands 配合

Commands 是简单的快捷命令，Skills 是复杂的工作流。两者可以配合使用。

### 团队协作

**共享项目 Skills**：

1. 将 Skills 放在 `.claude/skills/` 目录
2. 提交到 Git 仓库
3. 团队成员克隆项目后即可使用

**版本控制**：

- Skills 可以像代码一样进行版本控制
- 每个 commit 都可以记录 Skills 的变更
- 可以回滚到旧版本

---

## 常见问题

### Q1：Skill 没有被触发？

可能的原因：
- YAML frontmatter 格式错误
- description 不够具体
- Claude Code 没有重启

解决方法：
- 检查 YAML 格式是否正确
- 改进 description，包含具体的使用场景
- 重启 Claude Code

### Q2：description 怎么写才准确？

好的 description 包含：
- 技能的具体功能
- 使用场景（"当用户提到..."）
- 触发关键词

**不好的例子**：
```
description: 审查代码
```

**好的例子**：
```
description: 审查 Pull Request 的代码。当用户提到 PR、review、代码审查时触发。
```

### Q3：Skills 和 Commands 的区别？

| Commands | Skills |
|----------|--------|
| 简单快捷命令 | 完整工作流 |
| 单个 `.md` 文件 | 目录结构（SKILL.md + 可选文件） |
| 手动触发 | 可自动触发 |
| 适合简单操作 | 适合复杂流程 |

### Q4：如何调试 Skill？

1. 使用 `/skills` 查看技能是否被识别
2. 直接输入技能名称手动触发
3. 检查 SKILL.md 文件内容是否正确
4. 查看 Claude Code 日志

---

## 参考资料

### 官方资源

- [Claude Code 官方文档 - Skills](https://docs.anthropic.com/en/docs/claude-code/configuration/skills)
- [Agent Skills 标准](https://agentskills.io/)
- [Anthropic 官方工程文章（Agent Skills 实战理念）](https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills)
- [Anthropic 官方 Skills GitHub 仓库](https://github.com/anthropics/skills)
- [VS Code Copilot Agent Skills 文档](https://code.visualstudio.com/docs/copilot/customization/agent-skills)

### 资源入口

- [skills.sh](https://skills.sh/) - Vercel 出品的 Agent Skills 应用商店，48000+ 技能库
- [find-skills](https://github.com/vercel-labs/agent-skills) - 智能技能搜索工具，60K+ 订阅
- [Skills 市场（中文界面）](https://skillsmp.com/zh) - 发现和安装社区 Skills

### GitHub 社区项目

- [vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills) - Vercel Labs 官方 Agent Skills 集合（含 find-skills）
- [claude-code-best-practice](https://github.com/shanraisshan/claude-code-best-practice) - Boris Cherny 维护的官方最佳实践
- [everything-claude-code](https://github.com/affaan-m/everything-claude-code) - 综合工具包，包含预配置 Skills
- [awesome-claude-skills](https://github.com/ComposioHQ/awesome-claude-skills) - 精选 Skills 资源列表
- [superpowers](https://github.com/obra/superpowers) - 软件开发自动化工作流 Skills 集合
- [jeffallan/claude-skills](https://github.com/jeffallan/claude-skills) - 66 个专业技能，300+ 参考文档
- [awesome-agent-skills](https://github.com/JackyST0/awesome-agent-skills) - 精选资源列表

### 官方 Skills 示例

- [skill-creator](https://github.com/anthropics/skills/tree/main/skills/skill-creator) - 创建新技能的技能
- [mcp-builder](https://github.com/anthropics/skills/tree/main/skills/mcp-builder) - 构建 MCP 服务器的技能
- [slack-gif-creator](https://github.com/anthropics/skills/tree/main/skills/slack-gif-creator) - 创建 Slack GIF 的技能

### 中文教程

- [Claude Code 高级配置与使用技巧完全指南](https://blog.csdn.net/2601_95335870/article/details/158460599)
- [Vibe Coding - CLAUDE.md、Skills、Subagents 全链路实战](https://blog.csdn.net/yangshangwei/article/details/158319117)
- [手把手教你自定义 Claude Code Skills](https://m.blog.csdn.net/u010028049/article/details/157979705)

## 深入阅读：Claude Skills 的内部机制

接下来我们将深入理解 Claude Skills 的工作原理，让你不仅会用，更懂得为什么这样设计。

### 第一性原理：基于提示词的动态上下文注入

首先，要理解一个关键事实：**Skills 不是可执行代码**。

Skills 本质上是高级指令（Prompt），在需要时被"植入"到 Claude 的上下文中。这种设计被称为"**Prompt-based Dynamic Context Injection & Meta-Tool Architecture**"（基于提示词的动态上下文注入与元工具架构）。

```
┌─────────────┐      ┌─────────────┐      ┌──────────────┐
│  用户请求   │ ───> │  LLM 匹配   │ ───> │  触发 Skill  │
└─────────────┘      │  Skill 描述 │      └──────────────┘
                     └─────────────┘              │
                                                 ▼
                                          ┌──────────────┐
                                          │  注入完整    │
                                          │  指令内容    │
                                          └──────────────┘
                                                 │
                                                 ▼
                                          ┌──────────────┐
                                          │  执行任务    │
                                          └──────────────┘
```

### 三层渐进式加载架构（Token 优化）

为了处理大量 Skills 而不消耗过多 Token，Claude 采用了一种聪明的三层加载机制：

| 层级 | 内容 | 加载时机 | Token 消耗 |
|------|------|----------|-----------|
| **Layer 1: 元数据** | YAML frontmatter（name + description） | Claude 启动时 | ~30-50 tokens/skill |
| **Layer 2: 指令** | 完整 SKILL.md 内容 | Skill 被触发时 | ~5,000 tokens |
| **Layer 3: 资源** | 脚本、模板、参考文档 | 按需通过文件系统访问 | 不占上下文 |

**这个设计的优势**：

- 假设你有 100 个 Skills，启动时只消耗约 3,000-5,000 tokens（元数据）
- 只有被触发的 Skill 才会加载完整内容
- 参考文档等资源文件永远不会被完整加载到上下文

**对比无 Skills 的情况**：

```
无 Skills：每次对话需要 50,000+ tokens 来描述所有能力
有 Skills：启动 ~100 tokens/skill + 5,000 tokens 按需加载
节省：平均每轮对话节省 40,000+ tokens
```

### 双上下文注入机制

当 Skill 被激活时，系统会同时进行两次修改：

**1. 对话上下文注入**

```javascript
// 用户看到的（可见消息）
<command-message>The "pdf" skill is loading</command-message>

// AI 实际收到的（隐藏元消息）
{
  isMeta: true,  // 标记为元消息，用户界面不显示
  content: `
    # PDF 分析专家指令

    你是一位专业的 PDF 分析专家。工作流程：
    1. 使用 pdftotext 提取文本
    2. 分析文档结构
    3. 生成摘要报告
    ...
  `  // 完整的 SKILL.md 内容，可能数千字
}
```

**2. 执行上下文修改**

除了注入指令，Skill 还能动态修改 Claude 的环境：

| 修改类型 | 示例 | 说明 |
|---------|------|------|
| **工具权限** | `allowed-tools: "Bash(pdftotext:*)"` | 临时授予特定工具访问权限 |
| **模型切换** | 从 Sonnet 切换到 Opus | 某些复杂任务需要更强推理能力 |
| **上下文隔离** | 创建子会话空间 | 避免污染主对话上下文 |

### 纯 LLM 推理的路由机制

这是一个非常重要的设计决策：**Claude Skills 没有硬编码路由**。

| 传统方法 | Claude Skills |
|---------|--------------|
| ❌ 嵌入向量匹配 | ✅ 纯 LLM 推理 |
| ❌ 分类器 | ✅ Transformer 前向传播 |
| ❌ 正则/关键词匹配 | ✅ 自然语言理解 |
| ❌ 单独的路由算法 | ✅ 统一的模型决策 |

**工作流程**：

```
1. 所有 Skill 的 name 和 description 被格式化到 Skill 工具的描述中

2. Claude 收到：
   - 用户消息
   - 可用工具列表（包括 Skill meta-tool）
   - Skill 列表（name + description）

3. Claude 的自然语言理解能力将用户意图匹配到 Skill description

4. 匹配成功时调用：command: "skill-name"
```

**为什么这样设计？**

**硬编码路由需要**：
- 额外的维护成本
- 无法理解复杂的语义关系
- 难以处理多语言
- 不支持模糊匹配

**纯 LLM 推理**：
- 利用 Claude 本身的语言理解能力
- 自动处理多语言、同义词、模糊描述
- 无需额外维护
- 路由决策更智能

### 文件解析机制

**SKILL.md 文件结构**：

```bash
my-custom-skill/
├── SKILL.md              # 必需：核心定义文件
├── config.json           # 可选：元数据配置
├── README.md             # 推荐：使用文档
├── scripts/              # 可选：可执行脚本
├── templates/            # 可选：模板文件夹
└── references/           # 可选：参考文档
```

**解析流程**：

```
┌─────────────────────────────────────────────────────────────┐
│                    Claude Code 启动                          │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│  扫描 ~/.claude/skills/ 和 .claude/skills/ 目录             │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│  使用 gray-matter 库解析每个 SKILL.md 的 YAML frontmatter   │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│  验证必需字段（name 和 description）                         │
│  - name: 最大 64 字符，只能用小写字母、数字、连字符          │
│  - description: 用于 LLM 自动匹配                            │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│  提取元数据，构建 Skill 列表                                 │
│  （只加载 name + description，不加载正文）                   │
└─────────────────────────────────────────────────────────────┘
```

### 完整执行流程示例

让我们通过一个具体的例子来看整个流程：

```
用户："帮我分析这个 PDF 文件"

═══════════════════════════════════════════════════════════════

Step 1: LLM 决策
────────────────
Claude 在 Skill 列表中找到 "pdf" skill 的描述：
  description: "分析 PDF 文档内容、提取文本、生成摘要"

═══════════════════════════════════════════════════════════════

Step 2: 系统介入
────────────────
Claude Code 执行：
  1. 读取 ~/.claude/skills/pdf/SKILL.md
  2. 生成可见消息："The pdf skill is loading"
  3. 生成隐藏元消息：完整的 SKILL.md 内容
  4. 修改会话权限：allowed-tools = ["Bash(pdftotext:*)"]

═══════════════════════════════════════════════════════════════

Step 3: LLM 执行
────────────────
现在 Claude 的上下文包含：
  - 原始用户请求
  - PDF 专家的工作流程指令
  - pdftotext 工具的访问权限

Claude 执行：
  1. 使用 pdftotext 提取 PDF 文本
  2. 分析内容结构
  3. 生成摘要报告
  4. 向用户展示结果

═══════════════════════════════════════════════════════════════

Step 4: 用完即弃
────────────────
任务完成后，Skill 的完整内容从上下文中移除
（只保留对话历史，不保留完整的 Skill 指令）
```

### 核心设计创新

| 创新点 | 传统方法 | Skills 方法 | 优势 |
|--------|---------|------------|------|
| **能力来源** | 固化在模型权重中 | 动态加载的提示词 | 可扩展、可更新 |
| **Token 效率** | 所有能力常驻内存 | 按需加载 | 节省 80%+ tokens |
| **知识管理** | 分散在对话历史中 | 模块化的文件系统 | 可版本控制、可共享 |
| **生命周期** | 持续占用 | 用完即弃 | 上下文更清爽 |

### 学术基础

Claude Skills 的设计理念源于以下研究：

| 研究领域 | 代表工作 | 应用体现 |
|---------|---------|---------|
| **强化学习** | Voyager (2023) | 积累技能库的概念 |
| **认知架构** | ACT-R、Soar | 程序性记忆与陈述性记忆分离 |
| **分层策略** | Options Framework | 三层渐进式加载 |

**核心思想转变**：

```
传统：AI 需要记住一切
      ↓
Skills：AI 知道"去哪里找专业知识"
      ↓
结果：更像人类专家的思维方式
```

### 与 Agent Skills 标准的关系

Claude Skills 遵循 [Agent Skills 开放标准](https://agentskills.io/)，这意味着：

- ✅ 跨平台兼容：Cursor、Windsurf、Aider 等工具都支持
- ✅ 统一的文件格式：SKILL.md 结构标准
- ✅ 可互操作：不同工具间可以共享 Skills

```
Agent Skills 标准定义：
├── 必需：SKILL.md 文件（metadata + instructions）
├── 可选：scripts/（可执行代码）
├── 可选：references/（知识库文档）
└── 可选：assets/（模板和资源）
```

### 总结：为什么这个设计是天才的？

1. **解耦能力与模型**：专业知识不再依赖模型训练，可以通过 Markdown 文件随时更新

2. **极致的 Token 效率**：三层加载机制确保只加载需要的内容

3. **利用 LLM 自身能力**：路由匹配完全依靠 Claude 的语言理解，无需额外算法

4. **开发者友好**：创建 Skill 只需要写 Markdown，不需要编程

5. **可组合性**：Skills 可以互相引用、组合，形成复杂的工作流

6. **用完即弃**：任务完成后自动清理，保持上下文清爽

---

### 总结

Skills 是让 Claude Code 从"通用助手"变成"团队专家"的关键。

通过 Skills，你可以：
- 标准化工作流程
- 复用团队知识
- 提高协作效率
- 减少重复解释

记住：**如果你发现自己重复两次同样的指令，就应该考虑创建一个 Skill**。

现在就开始创建你的第一个 Skill 吧！
