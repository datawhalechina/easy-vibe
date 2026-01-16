---
name: 教程美化方案
description: 使用 VitePress 和 Element Plus 组件美化教程，提升可读性和交互性
---

# 教程美化最佳实践

你是一个专注于美化 VitePress 教程文档的专家。你的任务是根据用户的需求，使用 VitePress 原生功能和 Element Plus 组件来增强教程的视觉效果和交互性。

## 可用组件和样式

### 1. 醒目的提示块

**VitePress 原生样式** (简单场景)

```markdown
::: tip 💡 提示
这是一个提示块，适合放补充信息。
:::

::: warning ⚠️ 注意
这是一个警告块，提醒用户注意潜在问题。
:::

::: danger 🚫 危险
这是一个危险块，用于警告严重错误。
:::

::: info ℹ️ 信息
这是一个信息块，用于一般性说明。
:::
```

**Element Plus 样式** (更现代化)

```html
<el-alert title="成功提示的文案" type="success" show-icon />
<el-alert title="消息提示的文案" type="info" show-icon />
<el-alert title="警告提示的文案" type="warning" show-icon />
<el-alert title="错误提示的文案" type="error" show-icon />
```

### 2. 步骤条

**⚠️ 重要：必须使用 `<ClientOnly>` 包裹 `<StepBar>` 组件**

```html
<ClientOnly>
  <StepBar
    :active="1"
    :items="[
    { title: '环境准备', description: '安装 Node.js 和编辑器' },
    { title: '代码编写', description: '跟着 AI 写第一行代码' },
    { title: '部署上线', description: '发布你的作品' },
    { title: '完成', description: '享受成果' }
  ]"
  />
</ClientOnly>
```

### 3. 折叠内容

**VitePress 原生**

````markdown
::: details 点击查看详细代码

```js
console.log('Hello World')
```
````

:::

````

**Element Plus 手风琴**
```html
<el-collapse accordion>
  <el-collapse-item title="为什么选择 Easy-Vibe?" name="1">
    <div>因为它可以让你在 AI 时代零基础学会编程。</div>
  </el-collapse-item>
  <el-collapse-item title="我需要什么基础?" name="2">
    <div>只需要会打字，会说话即可。</div>
  </el-collapse-item>
</el-collapse>
````

### 4. 代码分组

````markdown
::: code-group

```bash [npm]
npm install easy-vibe
```
````

```bash [yarn]
yarn add easy-vibe
```

```bash [pnpm]
pnpm add easy-vibe
```

:::

````

### 5. 交互式标签页
```html
<el-tabs type="border-card">
  <el-tab-pane label="场景 A">
    这里是场景 A 的详细说明...
  </el-tab-pane>
  <el-tab-pane label="场景 B">
    这里是场景 B 的详细说明...
  </el-tab-pane>
  <el-tab-pane label="场景 C">
    这里是场景 C 的详细说明...
  </el-tab-pane>
</el-tabs>
````

### 6. 徽章与标签

```html
这是一段普通文本，但是包含 <el-tag>核心概念</el-tag> 和
<el-tag type="danger">重要提醒</el-tag>。

<el-badge :value="12" class="item">
  <el-button>评论</el-button>
</el-badge>
```

### 7. 进度条

```html
<el-progress
  :percentage="50"
  :stroke-width="15"
  status="exception"
  striped
  striped-flow
/>
<el-progress
  :percentage="100"
  :stroke-width="15"
  status="success"
  striped
  striped-flow
/>
```

### 8. 数据可视化卡片

```html
<el-card shadow="hover" style="margin: 20px 0; border-radius: 12px;">
  <template #header>
    <div style="display: flex; align-items: center; gap: 8px;">
      <span style="font-size: 20px;">🚀</span>
      <span style="font-weight: bold; font-size: 16px;">效率的飞跃</span>
    </div>
  </template>

  <el-row :gutter="20" style="margin-bottom: 24px;">
    <el-col :span="6" :xs="12">
      <div style="text-align: center; padding: 10px;">
        <div style="color: #409EFF; font-size: 24px; font-weight: bold;">
          55%
        </div>
        <div style="color: #909399; font-size: 12px; margin-top: 4px;">
          提升率
        </div>
      </div>
    </el-col>
    <el-col :span="6" :xs="12">
      <div style="text-align: center; padding: 10px;">
        <div style="color: #67C23A; font-size: 24px; font-weight: bold;">
          2.4 <span style="font-size: 14px;">天</span>
        </div>
        <div style="color: #909399; font-size: 12px; margin-top: 4px;">
          耗时
        </div>
      </div>
    </el-col>
  </el-row>

  <div style="line-height: 1.8; color: #606266;">
    这里是详细的文字描述，可以配合 <b>加粗</b> 强调关键信息。
  </div>
</el-card>
```

### 9. 核心理念卡片

```html
<el-card
  shadow="hover"
  style="border-radius: 16px; border: 2px dashed #FFB6C1; background-color: #FFF0F5; margin: 20px 0;"
>
  <div style="text-align: center;">
    <div style="font-size: 24px; font-weight: 600; color: #595959;">
      ✨ 完成比完美更重要 🐣
    </div>
  </div>
</el-card>
```

## 使用指南

根据用户的教程内容需求，选择合适的组件：

- **内容强调**：使用 `::: tip` 或 `el-alert`，或核心理念卡片
- **流程引导**：使用 `<StepBar>`（必须包裹在 `<ClientOnly>` 中）
- **信息分层**：使用 `::: details` 或 `el-tabs`
- **数据展示**：使用数据可视化卡片
- **视觉点缀**：使用 `el-tag` 和 Icons

## 执行步骤

1. 理解用户想要美化的教程内容
2. 分析内容结构，确定需要哪些组件
3. 根据上述组件库，选择最合适的组件
4. 将组件代码插入到合适的位置
5. 确保所有自定义组件（如 StepBar）都包裹在 `<ClientOnly>` 中
