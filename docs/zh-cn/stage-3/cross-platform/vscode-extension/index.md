# 如何开发 VS Code 插件——打造你的 AI 项目助手

# 第 1 章：什么是 VS Code 插件开发

在这篇教程中，我们将完整跑通一条闭环：从零开始开发一个 VS Code 插件，它能作为你的 AI 项目助手——内置项目模板一键生成、支持选中文件或代码段与 AI 对话、多文件问答梳理，还有自定义快捷键。你会亲手完成插件的开发、调试，并学会如何发布到 VS Code 插件市场。

本次教程，你至少需要具备：

- Node.js 环境（18.0 以上版本）
- VS Code 编辑器（1.90 以上版本）
- 你的 AI 编程助手（Cursor / Trae / Claude Code）
- （可选）GitHub Copilot 订阅（用于调用 Language Model API）

> **全程 Vibe Coding**：我们会用 AI 编程助手帮你生成大部分代码，你只需要理解核心概念和架构，然后用自然语言描述需求即可。

## 1.1 VS Code 插件能做什么？

你每天都在用 VS Code 插件——Prettier 帮你格式化代码、GitLens 帮你看 Git 历史、GitHub Copilot 帮你写代码。这些插件本质上都是用 TypeScript/JavaScript 编写的程序，通过 VS Code 提供的 API 来扩展编辑器的功能。

VS Code 插件可以做的事情远比你想象的多：

* **添加新的 UI 元素**：侧边栏面板、状态栏信息、Webview 自定义页面
* **处理文件和代码**：读取、修改、创建文件，分析代码结构
* **集成外部服务**：调用 API、连接数据库、对接 CI/CD
* **扩展编辑器能力**：自定义语言支持、代码补全、诊断提示
* **接入 AI 能力**：通过 Chat Participant API 创建 AI 对话助手，通过 Language Model API 调用大模型

<!-- ![placeholder: VS Code 插件生态示意图，展示插件可以扩展的各个区域：侧边栏、编辑器、状态栏、命令面板、Chat 面板](images/image1.png) -->
![VS Code 插件生态示意图，展示插件可以扩展的各个区域：侧边栏、编辑器、状态栏、命令面板、Chat 面板](images/image1.png)

## 1.2 VS Code 插件的核心架构

VS Code 插件运行在一个独立的 **Extension Host（插件宿主）** 进程中，和编辑器主进程隔离，这样即使插件崩溃也不会影响编辑器本身。

一个插件由以下几个核心部分组成：

* **package.json（插件清单）**：插件的"身份证"，声明插件的名称、入口文件、贡献点（commands、menus、keybindings 等）
* **extension.ts（入口文件）**：插件的"大脑"，导出 `activate()` 和 `deactivate()` 两个函数
* **Contribution Points（贡献点）**：在 package.json 中声明插件要"贡献"给 VS Code 的东西——命令、菜单项、快捷键、侧边栏视图等
* **VS Code API**：VS Code 提供的一整套 TypeScript API，让你可以操作编辑器的方方面面

```
VS Code 编辑器
    │
    ├── Extension Host（插件宿主进程）
    │   ├── 你的插件
    │   │   ├── package.json  → 声明"我能做什么"
    │   │   ├── extension.ts  → 实现"怎么做"
    │   │   └── 其他模块      → 具体功能代码
    │   ├── 其他插件 A
    │   └── 其他插件 B
    │
    └── 编辑器主进程（UI 渲染）
```

<!-- ![placeholder: VS Code 插件架构图，展示 Extension Host 进程与编辑器主进程的关系](images/image2.png) -->
![VS Code 插件架构图，展示 Extension Host 进程与编辑器主进程的关系](images/image2.png)

## 1.3 我们要做什么插件？

我们将开发一个名为 **"AI Project Bot"** 的 VS Code 插件，它是你的 AI 项目助手，具备以下功能：

| 功能 | 说明 |
|------|------|
| 项目模板 | 侧边栏展示项目模板列表，一键生成新项目骨架 |
| AI 对话 | 在 VS Code Chat 面板中创建 `@project-bot` 参与者，支持项目相关问答 |
| 文件/段落 Chat | 右键选中代码或文件，直接发送给 AI 分析、解释、重构 |
| 多文件问答 | 在资源管理器中多选文件，一键让 AI 梳理文件关系和逻辑 |
| 快捷键 | 自定义快捷键快速触发常用操作 |

<!-- ![placeholder: AI Project Bot 插件效果预览图，展示侧边栏模板列表、Chat 面板中的 @project-bot 对话、右键菜单](images/image3.png) -->
![AI Project Bot 插件效果预览图，展示侧边栏模板列表、Chat 面板中的 @project-bot 对话、右键菜单](images/image3.png)

## 1.4 本教程的路线图

我们将按以下步骤完成整个流程：

1. **创建插件项目**（3 分钟）：用脚手架生成项目骨架，理解核心文件
2. **实现项目模板功能**（5 分钟）：用 TreeView 在侧边栏展示模板，一键生成项目
3. **实现 AI Chat 参与者**（5 分钟）：用 Chat Participant API 创建 `@project-bot`
4. **实现文件/段落 Chat 和多文件问答**（5 分钟）：右键菜单 + 多选文件 + AI 分析
5. **添加快捷键和 UX 优化**（3 分钟）：自定义快捷键、状态栏提示
6. **发布到插件市场**（可选）：打包并提交审核

# 第 2 章：创建插件项目（3 分钟）

## 2.1 用脚手架生成项目

VS Code 官方提供了 Yeoman 脚手架工具来快速创建插件项目。让 AI 帮你执行：

```
请帮我安装 VS Code 插件开发脚手架并创建项目：
1. 安装 Yeoman 和 VS Code 插件生成器：npm install -g yo generator-code
2. 运行 yo code 生成项目，选择以下选项：
   - 类型：New Extension (TypeScript)
   - 名称：ai-project-bot
   - 标识符：ai-project-bot
   - 描述：AI 项目助手——模板生成、智能对话、多文件问答
   - 包管理器：npm
3. 进入项目目录并安装依赖
```

生成后的项目结构：

```
ai-project-bot/
├── .vscode/
│   ├── launch.json          # 调试配置（F5 启动调试）
│   └── tasks.json           # 编译任务
├── src/
│   └── extension.ts         # 插件入口文件
├── package.json             # 插件清单（最重要的文件）
├── tsconfig.json            # TypeScript 配置
└── vsc-extension-quickstart.md  # 快速入门指南（可删除）
```

## 2.2 理解 package.json——插件的"身份证"

`package.json` 是 VS Code 插件最核心的文件。除了常规的 npm 包信息外，它还有一个 `contributes` 字段，用来声明插件要"贡献"给 VS Code 的所有东西：

```json
{
  "name": "ai-project-bot",
  "displayName": "AI Project Bot",
  "description": "AI 项目助手——模板生成、智能对话、多文件问答",
  "version": "0.0.1",
  "engines": { "vscode": "^1.90.0" },
  "activationEvents": [],
  "main": "./out/extension.js",
  "contributes": {
    "commands": [],
    "menus": {},
    "keybindings": [],
    "viewsContainers": {},
    "views": {},
    "chatParticipants": []
  }
}
```

**关键字段解读：**

| 字段 | 作用 |
|------|------|
| `engines.vscode` | 插件支持的最低 VS Code 版本 |
| `activationEvents` | 什么时候激活插件（留空表示按需激活） |
| `main` | 编译后的入口文件路径 |
| `contributes` | 插件贡献的所有功能（命令、菜单、快捷键、视图等） |

<!-- ![placeholder: package.json 文件在编辑器中的截图，高亮 contributes 字段](images/image4.png) -->
![package.json 文件在编辑器中的截图，高亮 contributes 字段](images/image4.png)

## 2.3 理解 extension.ts——插件的"大脑"

打开 `src/extension.ts`，你会看到两个核心函数：

```typescript
import * as vscode from 'vscode'

// 插件被激活时调用（第一次执行命令、打开特定文件等）
export function activate(context: vscode.ExtensionContext) {
  console.log('AI Project Bot 已激活！')

  // 在这里注册命令、视图、Chat 参与者等
  const disposable = vscode.commands.registerCommand(
    'ai-project-bot.helloWorld',
    () => {
      vscode.window.showInformationMessage('Hello from AI Project Bot!')
    }
  )

  context.subscriptions.push(disposable)
}

// 插件被停用时调用（VS Code 关闭时）
export function deactivate() {}
```

**核心概念：**

* `activate(context)`：插件的初始化函数，所有功能都在这里注册
* `context.subscriptions`：一个"垃圾回收"数组，把注册的东西放进去，VS Code 会在插件停用时自动清理
* `vscode.commands.registerCommand`：注册一个命令，用户可以通过命令面板（Ctrl+Shift+P）调用

## 2.4 启动调试

按 **F5** 键，VS Code 会打开一个新的 **Extension Development Host** 窗口——这是一个加载了你插件的全新 VS Code 实例。

在新窗口中按 **Ctrl+Shift+P**，输入 "Hello World"，你会看到右下角弹出一条消息。这说明你的插件已经在运行了。

<!-- ![placeholder: VS Code 调试插件的截图，展示 Extension Development Host 窗口和 Hello World 消息](images/image5.png) -->
![VS Code 调试插件的截图，展示 Extension Development Host 窗口和 Hello World 消息](images/image5.png)

> **调试技巧**：修改代码后，在 Extension Development Host 窗口中按 **Ctrl+Shift+P** → **"Developer: Reload Window"** 即可重新加载插件，不需要重启调试。

# 第 3 章：实现项目模板功能（5 分钟）

## 3.1 设计模板系统

我们要在 VS Code 侧边栏中添加一个"项目模板"面板，用户可以浏览模板列表，点击后一键生成项目骨架。这需要用到 VS Code 的 **TreeView API**。

让 AI 帮你实现：

```
请帮我在 ai-project-bot 插件中实现项目模板功能：

1. 在 package.json 中添加以下贡献点：
   - 一个新的 viewsContainers.activitybar 项，id 为 "project-bot"，标题 "AI Project Bot"
   - 在该容器下添加一个 view，id 为 "projectTemplates"，名称 "项目模板"
   - 添加命令 "ai-project-bot.createFromTemplate"，标题 "从模板创建项目"

2. 创建 src/templates/templateProvider.ts：
   - 实现 TreeDataProvider，提供以下模板分类和模板：
     - 前端：React + TypeScript、Vue 3 + TypeScript、Next.js App
     - 后端：Express API、FastAPI Python
     - 全栈：T3 Stack（Next.js + tRPC + Prisma）
   - 每个模板项显示名称、描述和图标

3. 创建 src/templates/scaffolder.ts：
   - 实现 createProjectFromTemplate 函数
   - 让用户选择目标文件夹
   - 根据模板类型生成对应的项目文件结构
```

## 3.2 在 package.json 中声明视图

首先在 `package.json` 的 `contributes` 中添加侧边栏视图：

```json
{
  "contributes": {
    "viewsContainers": {
      "activitybar": [
        {
          "id": "project-bot",
          "title": "AI Project Bot",
          "icon": "resources/bot-icon.svg"
        }
      ]
    },
    "views": {
      "project-bot": [
        {
          "id": "projectTemplates",
          "name": "项目模板"
        }
      ]
    },
    "commands": [
      {
        "command": "ai-project-bot.createFromTemplate",
        "title": "从模板创建项目",
        "icon": "$(add)"
      }
    ],
    "menus": {
      "view/title": [
        {
          "command": "ai-project-bot.createFromTemplate",
          "when": "view == projectTemplates",
          "group": "navigation"
        }
      ]
    }
  }
}
```

这段配置做了三件事：

1. 在左侧活动栏添加了一个 "AI Project Bot" 图标入口
2. 在该入口下创建了一个 "项目模板" 视图
3. 在视图标题栏添加了一个 "+" 按钮用于创建项目

<!-- ![placeholder: VS Code 侧边栏中显示 AI Project Bot 图标和项目模板列表的截图](images/image6.png) -->
![VS Code 侧边栏中显示 AI Project Bot 图标和项目模板列表的截图](images/image6.png)

## 3.3 实现 TreeDataProvider

TreeDataProvider 是 VS Code 用来填充树形视图数据的接口。我们需要实现两个方法：`getTreeItem`（返回单个节点的显示信息）和 `getChildren`（返回子节点列表）。

核心代码：

```typescript
// src/templates/templateProvider.ts
import * as vscode from 'vscode'

interface Template {
  name: string
  description: string
  category: string
  command: string // 用于生成项目的命令，如 "npx create-react-app"
}

const TEMPLATES: Template[] = [
  { name: 'React + TypeScript', description: '使用 Vite 构建的 React 项目', category: '前端', command: 'npm create vite@latest {{name}} -- --template react-ts' },
  { name: 'Vue 3 + TypeScript', description: '使用 Vite 构建的 Vue 3 项目', category: '前端', command: 'npm create vite@latest {{name}} -- --template vue-ts' },
  { name: 'Next.js App', description: 'Next.js App Router 全栈项目', category: '前端', command: 'npx create-next-app@latest {{name}} --typescript --app' },
  { name: 'Express API', description: 'Express + TypeScript REST API', category: '后端', command: 'npx create-express-api {{name}}' },
  { name: 'FastAPI Python', description: 'Python FastAPI 后端项目', category: '后端', command: 'pip install fastapi uvicorn' },
]

// 树节点：分类或模板
class TemplateItem extends vscode.TreeItem {
  constructor(
    public readonly label: string,
    public readonly collapsibleState: vscode.TreeItemCollapsibleState,
    public readonly template?: Template
  ) {
    super(label, collapsibleState)
    if (template) {
      this.description = template.description
      this.tooltip = `${template.name}\n${template.description}\n命令: ${template.command}`
      this.contextValue = 'template'
      this.command = {
        command: 'ai-project-bot.createFromTemplate',
        title: '创建项目',
        arguments: [template]
      }
    }
  }
}

export class TemplateProvider implements vscode.TreeDataProvider<TemplateItem> {
  getTreeItem(element: TemplateItem): vscode.TreeItem {
    return element
  }

  getChildren(element?: TemplateItem): TemplateItem[] {
    if (!element) {
      // 根节点：返回分类列表
      const categories = [...new Set(TEMPLATES.map(t => t.category))]
      return categories.map(
        cat => new TemplateItem(cat, vscode.TreeItemCollapsibleState.Expanded)
      )
    }
    // 子节点：返回该分类下的模板
    return TEMPLATES
      .filter(t => t.category === element.label)
      .map(t => new TemplateItem(t.name, vscode.TreeItemCollapsibleState.None, t))
  }
}
```

## 3.4 注册视图和创建命令

在 `extension.ts` 中注册 TreeView 和创建项目的命令：

```typescript
// src/extension.ts
import { TemplateProvider } from './templates/templateProvider'

export function activate(context: vscode.ExtensionContext) {
  // 注册模板视图
  const templateProvider = new TemplateProvider()
  vscode.window.registerTreeDataProvider('projectTemplates', templateProvider)

  // 注册创建项目命令
  const createCmd = vscode.commands.registerCommand(
    'ai-project-bot.createFromTemplate',
    async (template) => {
      if (!template) {
        // 如果没有传入模板（从命令面板调用），让用户选择
        const pick = await vscode.window.showQuickPick(
          TEMPLATES.map(t => ({ label: t.name, description: t.description, template: t })),
          { placeHolder: '选择一个项目模板' }
        )
        if (!pick) return
        template = pick.template
      }

      // 让用户输入项目名称
      const name = await vscode.window.showInputBox({
        prompt: '输入项目名称',
        placeHolder: 'my-awesome-project'
      })
      if (!name) return

      // 让用户选择目标文件夹
      const folder = await vscode.window.showOpenDialog({
        canSelectFolders: true,
        openLabel: '选择项目存放位置'
      })
      if (!folder) return

      // 执行创建命令
      const terminal = vscode.window.createTerminal('AI Project Bot')
      terminal.show()
      const cmd = template.command.replace('{{name}}', name)
      terminal.sendText(`cd "${folder[0].fsPath}" && ${cmd}`)

      vscode.window.showInformationMessage(`正在创建 ${template.name} 项目: ${name}`)
    }
  )

  context.subscriptions.push(createCmd)
}
```

现在按 F5 调试，你会在左侧活动栏看到 AI Project Bot 图标，点击后展开模板列表，点击任意模板即可创建项目。

<!-- ![placeholder: 点击模板后弹出项目名称输入框和文件夹选择对话框的截图](images/image7.png) -->
![点击模板后弹出项目名称输入框和文件夹选择对话框的截图](images/image7.png)

# 第 4 章：实现 AI Chat 参与者（5 分钟）

## 4.1 什么是 Chat Participant API？

从 VS Code 1.90 开始，插件可以通过 **Chat Participant API** 在 VS Code 的 Chat 面板中创建自己的 AI 助手。用户在聊天框中输入 `@project-bot 帮我分析这个项目的架构`，你的插件就会收到这条消息并返回 AI 生成的回复。

Chat Participant API 的核心概念：

* **Participant（参与者）**：你的 AI 助手在 Chat 面板中的身份，用 `@名称` 来调用
* **Slash Commands（斜杠命令）**：参与者支持的快捷指令，如 `/explain`、`/refactor`
* **Language Model API**：调用 VS Code 内置的大模型（如 Copilot 的 GPT-4o）来生成回复
* **Stream（流式响应）**：通过 `stream.markdown()` 逐步输出回复内容

## 4.2 在 package.json 中声明 Chat 参与者

在 `contributes` 中添加：

```json
{
  "contributes": {
    "chatParticipants": [
      {
        "id": "ai-project-bot.projectBot",
        "name": "project-bot",
        "fullName": "AI Project Bot",
        "description": "你的 AI 项目助手，帮你分析代码、解释架构、生成方案",
        "isSticky": true
      }
    ]
  }
}
```

`isSticky: true` 表示用户选择这个参与者后，后续消息会默认发给它，不需要每次都输入 `@project-bot`。

## 4.3 实现 Chat 参与者处理函数

让 AI 帮你编写核心逻辑：

```
请帮我创建 src/chat/chatParticipant.ts，实现 Chat Participant：
1. 注册 "ai-project-bot.projectBot" 参与者
2. 支持三个斜杠命令：
   - /explain：解释选中的代码或当前文件
   - /refactor：给出重构建议
   - /template：推荐适合当前项目的技术栈模板
3. 使用 Language Model API 调用 VS Code 内置模型生成回复
4. 回复使用流式输出（stream.markdown）
```

核心代码：

```typescript
// src/chat/chatParticipant.ts
import * as vscode from 'vscode'

export function registerChatParticipant(context: vscode.ExtensionContext) {
  const participant = vscode.chat.createChatParticipant(
    'ai-project-bot.projectBot',
    async (request, chatContext, stream, token) => {
      // 获取可用的语言模型
      const models = await vscode.lm.selectChatModels({ family: 'gpt-4o' })
      const model = models[0]

      if (!model) {
        stream.markdown('未找到可用的语言模型，请确保已安装 GitHub Copilot。')
        return
      }

      // 根据斜杠命令构建不同的系统提示
      let systemPrompt = '你是一个专业的项目开发助手。'

      if (request.command === 'explain') {
        systemPrompt = '你是一个代码解释专家。请用简洁易懂的中文解释用户提供的代码，包括功能、逻辑流程和关键设计决策。'
      } else if (request.command === 'refactor') {
        systemPrompt = '你是一个代码重构专家。请分析用户提供的代码，给出具体的重构建议和改进后的代码示例。'
      } else if (request.command === 'template') {
        systemPrompt = '你是一个技术选型专家。根据用户描述的项目需求，推荐最合适的技术栈和项目模板。'
      }

      // 构建消息
      const messages = [
        vscode.LanguageModelChatMessage.User(systemPrompt),
        vscode.LanguageModelChatMessage.User(request.prompt)
      ]

      // 流式输出回复
      const response = await model.sendRequest(messages, {}, token)
      for await (const chunk of response.stream) {
        stream.markdown(chunk)
      }

      return { metadata: { command: request.command || '' } }
    }
  )

  // 注册斜杠命令
  participant.slashCommandProvider = {
    provideSlashCommands: () => [
      { name: 'explain', description: '解释代码的功能和逻辑' },
      { name: 'refactor', description: '给出重构建议和改进方案' },
      { name: 'template', description: '推荐适合的项目模板和技术栈' }
    ]
  }

  // 注册跟进建议
  participant.followupProvider = {
    provideFollowups: (result) => {
      if (result.metadata?.command === 'explain') {
        return [
          { prompt: '能画一个流程图吗？', label: '生成流程图' },
          { prompt: '有什么潜在的 bug 吗？', label: '检查潜在问题' }
        ]
      }
      return []
    }
  }

  context.subscriptions.push(participant)
}
```

在 `extension.ts` 中调用注册函数：

```typescript
import { registerChatParticipant } from './chat/chatParticipant'

export function activate(context: vscode.ExtensionContext) {
  // ... 之前的模板注册代码 ...
  registerChatParticipant(context)
}
```

现在在 Chat 面板中输入 `@project-bot /explain 这段代码是做什么的？`，你的插件就会调用大模型生成解释。

<!-- ![placeholder: VS Code Chat 面板中 @project-bot 对话的截图，展示 /explain 命令的使用和流式回复](images/image8.png) -->
![VS Code Chat 面板中 @project-bot 对话的截图，展示 /explain 命令的使用和流式回复](images/image8.png)

# 第 5 章：文件/段落 Chat 与多文件问答（5 分钟）

## 5.1 右键菜单：选中代码发送给 AI

我们希望用户在编辑器中选中一段代码，右键就能把它发送给 AI 分析。这需要用到 VS Code 的 **Context Menu（右键菜单）** 贡献点。

在 `package.json` 中添加：

```json
{
  "contributes": {
    "commands": [
      {
        "command": "ai-project-bot.explainSelection",
        "title": "AI: 解释选中代码"
      },
      {
        "command": "ai-project-bot.refactorSelection",
        "title": "AI: 重构选中代码"
      }
    ],
    "menus": {
      "editor/context": [
        {
          "command": "ai-project-bot.explainSelection",
          "when": "editorHasSelection",
          "group": "ai-project-bot@1"
        },
        {
          "command": "ai-project-bot.refactorSelection",
          "when": "editorHasSelection",
          "group": "ai-project-bot@2"
        }
      ]
    }
  }
}
```

**关键配置解读：**

* `when: "editorHasSelection"`：只有选中了代码时才显示这些菜单项
* `group: "ai-project-bot@1"`：菜单项分组，`@1` 和 `@2` 控制排序

## 5.2 实现选中代码分析

```typescript
// src/commands/selectionCommands.ts
import * as vscode from 'vscode'

export function registerSelectionCommands(context: vscode.ExtensionContext) {
  // 解释选中代码
  const explainCmd = vscode.commands.registerCommand(
    'ai-project-bot.explainSelection',
    async () => {
      const editor = vscode.window.activeTextEditor
      if (!editor) return

      const selection = editor.selection
      const selectedText = editor.document.getText(selection)
      const fileName = editor.document.fileName.split('/').pop()
      const startLine = selection.start.line + 1
      const endLine = selection.end.line + 1

      // 构建带上下文的提示
      const prompt = [
        `请解释以下代码（来自 ${fileName}，第 ${startLine}-${endLine} 行）：`,
        '```',
        selectedText,
        '```',
        '请说明：1. 这段代码的功能 2. 核心逻辑 3. 可能的改进点'
      ].join('\n')

      // 调用 Language Model API
      const models = await vscode.lm.selectChatModels({ family: 'gpt-4o' })
      if (!models.length) {
        vscode.window.showErrorMessage('未找到可用的语言模型')
        return
      }

      // 在输出面板中显示结果
      const outputChannel = vscode.window.createOutputChannel('AI Project Bot')
      outputChannel.show()
      outputChannel.appendLine(`\n--- 代码解释 (${fileName}:${startLine}-${endLine}) ---\n`)

      const messages = [
        vscode.LanguageModelChatMessage.User(prompt)
      ]
      const response = await models[0].sendRequest(messages, {})
      for await (const chunk of response.stream) {
        outputChannel.append(chunk)
      }
    }
  )

  context.subscriptions.push(explainCmd)
}
```

<!-- ![placeholder: 编辑器中右键选中代码后显示 AI 菜单项的截图](images/image9.png) -->
![VS Code Chat 面板中 @project-bot 对话的截图，展示 /explain 命令的使用和流式回复](images/image9.png)

## 5.3 多文件问答：批量分析文件关系

这是我们插件最强大的功能之一——在资源管理器中多选文件，一键让 AI 梳理它们之间的关系和逻辑。

在 `package.json` 中添加资源管理器右键菜单：

```json
{
  "contributes": {
    "commands": [
      {
        "command": "ai-project-bot.analyzeFiles",
        "title": "AI: 分析选中文件的关系"
      }
    ],
    "menus": {
      "explorer/context": [
        {
          "command": "ai-project-bot.analyzeFiles",
          "when": "explorerResourceIsFile",
          "group": "ai-project-bot"
        }
      ]
    }
  }
}
```

实现多文件分析命令：

```typescript
// src/commands/multiFileAnalysis.ts
import * as vscode from 'vscode'

export function registerMultiFileCommands(context: vscode.ExtensionContext) {
  const analyzeCmd = vscode.commands.registerCommand(
    'ai-project-bot.analyzeFiles',
    async (clickedFile: vscode.Uri, selectedFiles: vscode.Uri[]) => {
      // selectedFiles 包含所有被选中的文件
      const files = selectedFiles || [clickedFile]

      if (files.length < 2) {
        vscode.window.showWarningMessage('请至少选择 2 个文件进行分析')
        return
      }

      // 读取所有选中文件的内容
      const fileContents: string[] = []
      for (const file of files) {
        const content = await vscode.workspace.fs.readFile(file)
        const fileName = vscode.workspace.asRelativePath(file)
        fileContents.push(
          `--- ${fileName} ---\n${Buffer.from(content).toString('utf8')}`
        )
      }

      const prompt = [
        `请分析以下 ${files.length} 个文件之间的关系：`,
        '',
        ...fileContents,
        '',
        '请说明：',
        '1. 这些文件各自的职责',
        '2. 它们之间的依赖和调用关系',
        '3. 数据流向（如果有的话）',
        '4. 架构上的建议或潜在问题'
      ].join('\n')

      // 调用模型并在 Webview 中展示结果
      const models = await vscode.lm.selectChatModels({ family: 'gpt-4o' })
      if (!models.length) {
        vscode.window.showErrorMessage('未找到可用的语言模型')
        return
      }

      const outputChannel = vscode.window.createOutputChannel('AI Project Bot')
      outputChannel.show()
      outputChannel.appendLine(
        `\n--- 多文件分析 (${files.length} 个文件) ---\n`
      )

      const messages = [
        vscode.LanguageModelChatMessage.User(prompt)
      ]
      const response = await models[0].sendRequest(messages, {})
      for await (const chunk of response.stream) {
        outputChannel.append(chunk)
      }
    }
  )

  context.subscriptions.push(analyzeCmd)
}
```

使用方式：在资源管理器中按住 Ctrl（Mac 上是 Cmd）多选文件，右键选择 "AI: 分析选中文件的关系"，AI 就会读取所有文件内容并给出分析报告。

<!-- ![placeholder: 资源管理器中多选文件后右键菜单显示 AI 分析选项的截图](images/image10.png) -->
![资源管理器中多选文件后右键菜单显示 AI 分析选项的截图](images/image10.png)

# 第 6 章：快捷键与 UX 优化（3 分钟）

## 6.1 自定义快捷键

快捷键是提升效率的关键。在 `package.json` 中添加：

```json
{
  "contributes": {
    "keybindings": [
      {
        "command": "ai-project-bot.explainSelection",
        "key": "ctrl+shift+e",
        "mac": "cmd+shift+e",
        "when": "editorTextFocus && editorHasSelection"
      },
      {
        "command": "ai-project-bot.refactorSelection",
        "key": "ctrl+shift+r",
        "mac": "cmd+shift+r",
        "when": "editorTextFocus && editorHasSelection"
      },
      {
        "command": "ai-project-bot.createFromTemplate",
        "key": "ctrl+shift+n",
        "mac": "cmd+shift+n",
        "when": ""
      }
    ]
  }
}
```

**when 条件解读：**

| 条件 | 含义 |
|------|------|
| `editorTextFocus` | 光标在编辑器中 |
| `editorHasSelection` | 有选中的文本 |
| `explorerViewletVisible` | 资源管理器面板可见 |
| `!editorReadonly` | 文件不是只读的 |

多个条件用 `&&` 连接表示"同时满足"。

## 6.2 状态栏提示

在状态栏添加一个快捷入口，让用户随时知道插件在运行：

```typescript
// src/statusBar.ts
import * as vscode from 'vscode'

export function createStatusBarItem(context: vscode.ExtensionContext) {
  const statusBar = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Right,
    100
  )
  statusBar.text = '$(hubot) AI Bot'
  statusBar.tooltip = '点击打开 AI Project Bot'
  statusBar.command = 'ai-project-bot.createFromTemplate'
  statusBar.show()

  context.subscriptions.push(statusBar)
}
```

`$(hubot)` 是 VS Code 内置的图标语法，你可以在 [Codicon 图标库](https://microsoft.github.io/vscode-codicons/dist/codicon.html) 中找到所有可用图标。

<!-- ![placeholder: VS Code 状态栏中显示 AI Bot 图标的截图](images/image11.png) -->
![VS Code 状态栏中显示 AI Bot 图标的截图](images/image11.png)

# 第 7 章：发布到插件市场（可选）

## 7.1 发布准备

VS Code 插件通过 **vsce**（Visual Studio Code Extensions）工具打包和发布。

```
请帮我安装 vsce 工具：npm install -g @vscode/vsce
```

发布前需要准备：

1. **Azure DevOps 账号**：访问 [dev.azure.com](https://dev.azure.com/)，注册并创建一个组织
2. **Personal Access Token（PAT）**：在 Azure DevOps 中创建一个 PAT，权限选择 **Marketplace → Manage**
3. **Publisher ID**：在 [VS Code Marketplace](https://marketplace.visualstudio.com/manage) 中创建一个发布者身份

## 7.2 完善 package.json

发布前需要补充一些元信息：

```json
{
  "publisher": "your-publisher-id",
  "repository": {
    "type": "git",
    "url": "https://github.com/yourname/ai-project-bot"
  },
  "categories": ["AI", "Other"],
  "keywords": ["ai", "project", "template", "chat"],
  "icon": "resources/icon.png",
  "galleryBanner": {
    "color": "#1e1e2e",
    "theme": "dark"
  }
}
```

还需要创建一个 `README.md` 作为插件在市场中的介绍页面，以及一个 `CHANGELOG.md` 记录版本变更。

## 7.3 打包与发布

```bash
# 打包为 .vsix 文件（可以手动安装）
vsce package

# 发布到市场
vsce publish
```

打包后会生成一个 `ai-project-bot-0.0.1.vsix` 文件。你可以把这个文件发给朋友，他们通过 VS Code 的 "Install from VSIX" 就能安装。

如果要正式发布到市场，执行 `vsce publish` 后，插件会在几分钟内出现在 VS Code 插件市场中。

<!-- ![placeholder: VS Code 插件市场中 AI Project Bot 插件页面的截图](images/image12.png) -->

> **提示**：首次发布可能需要等待审核。确保你的 README 描述清晰、截图完整，审核通过会更快。

# 第 8 章：写在最后

恭喜你！你已经从零构建了一个功能完整的 VS Code 插件。回顾一下我们做了什么：

1. 用 Yeoman 脚手架创建了插件项目，理解了 package.json 和 extension.ts 的核心作用
2. 用 TreeView API 实现了侧边栏项目模板列表，一键生成新项目
3. 用 Chat Participant API 创建了 `@project-bot` AI 助手，支持斜杠命令和流式回复
4. 用右键菜单实现了选中代码发送给 AI 分析的功能
5. 用多文件选择实现了批量文件关系梳理
6. 添加了自定义快捷键和状态栏提示

VS Code 插件开发的想象空间非常大——你每天使用的那些好用的插件，背后的技术和你刚刚学到的完全一样。

**进阶方向：**

* **Webview 自定义面板**：用 HTML/CSS/JS 构建完全自定义的 UI 面板，比如可视化的项目架构图、交互式的代码审查界面
* **Language Model Tools**：注册自定义工具让 AI 能调用你的函数，比如查询数据库、执行 API 请求
* **代码诊断和 CodeLens**：在代码中内联显示 AI 建议、性能提示、安全警告
* **自定义语言支持**：为特定的 DSL 或配置文件提供语法高亮、自动补全、错误检查
* **远程开发集成**：让插件在 SSH 远程环境、容器、WSL 中也能正常工作

***你的编辑器，你做主。***

# 参考文献

* [VS Code Extension API 官方文档](https://code.visualstudio.com/api)
* [Chat Participant API 指南](https://code.visualstudio.com/api/extension-guides/chat)
* [Language Model API 指南](https://code.visualstudio.com/api/extension-guides/language-model)
* [TreeView API 指南](https://code.visualstudio.com/api/extension-guides/tree-view)
* [Webview API 指南](https://code.visualstudio.com/api/extension-guides/webview)
* [VS Code 插件发布指南](https://code.visualstudio.com/api/working-with-extensions/publishing-extension)
* [Codicon 图标库](https://microsoft.github.io/vscode-codicons/dist/codicon.html)
