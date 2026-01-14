# Terminal Intro Components

此目录包含 `docs/zh-cn/appendix/terminal-intro.md`（终端原理附录）页面使用的所有交互式 Vue 组件。

这些组件旨在通过可视化和互动的方式，帮助读者理解终端的工作原理、ANSI 转义序列、Shell 交互等概念。

## 组件列表

| 组件名 | 描述 | 对应文档章节 |
| :--- | :--- | :--- |
| **TerminalDefinition.vue** | 可视化终端作为“字符流输入/输出环境”的定义。展示键盘输入 -> 字符流 -> 屏幕输出的过程。 | 1. 概念界定 |
| **ArchitectureDemo.vue** | 演示终端（前端）与 Shell（后端）的分离架构。模拟点餐流程类比。 | 2. 核心架构 |
| **TerminalGrid.vue** | 展示终端的字符网格系统，演示行、列和单元格的概念。 | 3. 视觉模型 |
| **CellInspector.vue** | 单元格检查器，展示每个字符单元格背后的属性（字符、前景色、背景色等）。 | 3.2 样式检查 |
| **EscapeSequences.vue** | 演示 ANSI 转义序列如何控制颜色、样式、光标移动和清屏。 | 4. 通信协议 |
| **InputVisualizer.vue** | 可视化键盘按键如何转换为字节序列发送给 Shell。 | 5. 输入机制 |
| **WebTerminal.vue** | 一个功能较完整的模拟终端，支持 `ls`, `cd`, `cat`, `apt` 等命令，包含虚拟文件系统。 | 附录/综合演示 |
| **SignalsDemo.vue** | 演示终端信号（如 Ctrl+C SIGINT）的工作机制。 | (文档中可能引用) |
| **FlowDiagram.vue** | 展示标准输入/输出/错误流 (stdin/stdout/stderr) 的流向图。 | (文档中可能引用) |
| **AdvancedTUIDemo.vue** | 展示基于文本的用户界面 (TUI) 的高级布局能力（如面板、进度条）。 | (文档中可能引用) |

## 开发指南

### 技术栈
- **Vue 3**: 使用 `<script setup>` 语法。
- **Styling**: Scoped CSS，主要使用 Flexbox 和 Grid 布局。
- **Theme**: 统一使用黑色系背景 (`#09090b`, `#18181b`) 和 JetBrains Mono 字体，保持类似终端的视觉风格。

### 维护注意事项
1.  **双语支持**: 组件内部文本尽量支持中英双语，或通过 Props 传入文本。目前部分组件已硬编码双语标签。
2.  **自包含**: 组件应尽量自包含，不依赖外部复杂的 Store 或 Context，以便于在 Markdown 中直接使用。
3.  **响应式**: 考虑移动端适配，通常使用 `@media (max-width: 768px)` 进行布局调整。

### 常用颜色变量 (参考)
- 背景: `#09090b` (Main), `#18181b` (Panel)
- 边框: `#27272a`
- 文本: `#e4e4e7` (Primary), `#a1a1aa` (Secondary)
- 强调色: `#22c55e` (Green/Success), `#facc15` (Yellow/Warning), `#22d3ee` (Cyan/Info)

## 目录结构
所有组件均位于 `docs/.vitepress/theme/components/appendix/terminal-intro/` 下。
注册逻辑位于 `docs/.vitepress/theme/index.js`。
