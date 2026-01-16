---
name: 编写交互式教程指南
description: 基于 llm-intro.md 的编写模式，总结如何创建高质量的交互式技术教程。涵盖内容展开的循序渐进原则、文章结构规范、交互式组件开发规范、最佳实践及完整开发工作流。
---

# 编写交互式教程指南 (Interactive Tutorial Guide)

## 概述

本指南基于 `docs/zh-cn/appendix/llm-intro.md` 的编写模式，总结如何创建高质量的交互式技术教程。

## 一、内容展开的循序渐进原则

### 1.1 核心叙事模式

`llm-intro.md` 采用的是 **"螺旋上升"** 的叙事结构，每个知识点都遵循以下认知路径：

```
具体体验 → 抽象概念 → 历史对比 → 本质揭示 → 前沿拓展
```

#### 原则 1：从具体体验到抽象原理

**不要一上来就讲定义**，先让读者看到效果。

**示例（llm-intro.md 第 0 章）**：

```markdown
# 大语言模型入门

> 💡 **学习指南**：本章节无需编程基础，通过交互式演示带你深入了解大语言模型...

<LlmQuickStartDemo /> <!-- 先让读者玩起来 -->

## 0. 引言：从人类语言到机器计算

人类用语言交流，计算机用数字计算。
**大语言模型 (LLM)** 的本质，就是一座连接这两个世界的桥梁。
```

**要点**：

- ✅ 第一屏就是交互式演示
- ✅ 读者"玩过"后再讲原理
- ❌ 避免开篇就是"LLM 是基于 Transformer 的..."

#### 原则 2：从简单到复杂（知识依赖链）

**每个新概念都建立在前一个概念基础上**，形成知识链条。

**示例（llm-intro.md 第 1-3 章）**：

```markdown
## 1. 第一步：翻译（Tokenization）

核心任务：把文字变成数字 ID
<TokenizationDemo />

## 2. 核心难题：如何让计算机"计算"语言？

问题：只用 ID 太浪费、没内涵
方案：Embedding（稠密向量）
<EmbeddingDemo />

## 3. 从 单词 到 矩阵

回顾：Embedding 把每个词变成向量 → 把向量拼成矩阵 → GPU 高效计算
<TokenizerToMatrix />
```

**依赖关系**：

```
Tokenization（基础）
    ↓
Embedding（优化 Tokenization）
    ↓
矩阵化（优化 Embedding 的计算）
    ↓
Transformer（利用矩阵并行）
```

**要点**：

- 每章开头"回顾"上一章内容
- 明确说明"为什么要学这个"
- 用"因为...所以..."连接知识点

#### 原则 3：从问题到方案（对比式讲解）

**先提出"直白方案"的缺陷，再引出"聪明方案"**。

**示例（llm-intro.md 第 2.1-2.2 章）**：

```markdown
### 2.1 为什么不用简单的 ID？

如果只用 ID，计算机会认为"10"和"20"只是两个毫无关系的数字。

- **缺点1**：太浪费（稀疏，One-Hot 数组太大）。
- **缺点2**：没内涵（无法表示"苹果"和"香蕉"都是水果）。

### 2.2 解决方案：Embedding（稠密向量）

为了**高效**且**有内涵**地表达一个词，我们发明了 **Embedding**。
它不再用一个长长的 0/1 数组，而是用一个短一点的、填满小数的数组...
```

**模板**：

```markdown
### N.1 为什么不用 [朴素方案]？

[说明朴素方案的问题]

- **缺点1**：[具体问题]
- **缺点2**：[具体问题]

### N.2 解决方案：[优化方案]

为了解决上述问题，我们引入了 [优化方案]。
[说明优化方案的核心思想]
```

**要点**：

- 用"为什么不用..."作为章节标题
- 用列表清晰列出缺陷
- 用"为了...我们引入..."过渡到新方案

#### 原则 4：从历史到现代（进化式讲解）

**通过对比"旧技术"和"新技术"，说明技术演进的动机**。

**示例（llm-intro.md 第 4 章）**：

```markdown
### 4.1 为什么要淘汰 RNN？

以前的模型（RNN）像人读书一样，**从左到右**一个字一个字读。

- **缺点1**：慢。必须读完第1个字才能读第2个，没法并行。
- **缺点2**：忘。读到文章最后，可能已经忘了开头讲什么了。

### 4.2 Transformer 强在哪？

现在的 LLM 都基于 Transformer 架构，它完美契合了矩阵并行的特性：

1.  **并行阅读**：它可以**一眼看完**整句话...
2.  **注意力机制**：让每个词都**直接关注**到其他所有词...
```

**对比表格化**：

```markdown
| 特性           | RNN                | Transformer            |
| :------------- | :----------------- | :--------------------- |
| **阅读方式**   | 从左到右，逐字处理 | 并行处理，一眼看完整句 |
| **计算效率**   | 慢（无法并行）     | 快（GPU 矩阵运算）     |
| **长距离记忆** | 容易遗忘           | 注意力机制保持连接     |
```

**要点**：

- 明确说明"为什么要淘汰"
- 用具体场景对比（如"读书方式"）
- 配合 `<RNNvsTransformer />` 可视化

#### 原则 5：从现象到本质（揭秘式讲解）

**先描述用户能观察到的现象，再揭示背后的本质机制**。

**示例（llm-intro.md 第 5 章）**：

```markdown
## 5. 揭秘：从"续写"到"对话"

很多人会误以为 ChatGPT 真的懂我们在说什么，但其实它的本能只有一个：**猜下一个词**。

### 5.1 本能：疯狂续写

如果你给基础模型输入："今天天气不错"，它可能会续写："去公园玩吧。"
但如果你输入："美国的首都是哪里？"，它可能会续写："中国首都是哪里？..."

### 5.2 技巧：用"剧本"来对话

为了让它变成对话助手，工程师们想出了一个绝妙的办法：**角色扮演**。
我们在输入给模型的内容里，悄悄加了一些特殊的**标签**...
```

**叙事结构**：

```
现象（ChatGPT 会对话）
    ↓
打破误解（它只是在续写）
    ↓
揭示本质（Next Token Prediction）
    ↓
技巧揭秘（Template 角色扮演）
    ↓
深度交互（TrainingInferenceDemo）
```

**要点**：

- 用"揭秘"作为章节标题
- 用"很多人会误以为..."制造悬念
- 用"但其实..."转折到真相
- 用"本质只有一个"强调核心

#### 原则 6：从基础到前沿（拓展式讲解）

**在讲完核心原理后，介绍最新进展，保持内容的先进性**。

**示例（llm-intro.md 第 7 章）**：

```markdown
## 7. 前沿探索：会思考的模型、MoE 架构与线性注意力机制

随着技术的发展，我们发现仅仅靠"预测下一个词"有时候会犯蠢...
于是，新一代的 **Thinking Models**（如 OpenAI o1, DeepSeek-R1）诞生了。

### 7.1 什么是"思考"？

- **快思考 (System 1)**：凭直觉，脱口而出。容易犯错。
- **慢思考 (System 2)**：通过产生"思维链"，一步步推理。

### 7.5 架构进化：从"全能"到"专家团"（Dense vs MoE）

- **Dense（稠密模型）**：比喻为一个**全能天才**...
- **MoE（混合专家模型）**：比喻为一个**专家团队**...
```

**拓展维度**：

1. **算法演进**：传统 → 现代
2. **架构优化**：Dense → MoE
3. **效率提升**：标准 Attention → Linear Attention

**要点**：

- 用"前沿探索"作为章节标题
- 说明"为什么需要新东西"
- 用比喻降低理解难度（如"专家团队"）
- 提供实战指南（Prompt 风格变化）

### 1.2 章节编排的六个层次

一个完整的交互式教程应该包含以下层次（从浅到深）：

```
层次 0：引子          （类比 + 核心挑战）
层次 1：基础概念      （是什么 + 怎么做）
层次 2：设计动机      （为什么不用朴素方案）
层次 3：核心机制      （本质原理 + 可视化）
层次 4：实践应用      （数据格式 + 使用场景）
层次 5：前沿拓展      （最新技术 + 未来趋势）
```

**对照检查**：

- ✅ 每个层次是否有对应章节？
- ✅ 层次之间是否有逻辑连接？
- ✅ 是否提供了交互式演示？

### 1.3 段落内的微观展开

每个段落内部也遵循 **"提出问题 → 分析问题 → 解决问题"** 的三段式结构：

```markdown
[提出问题]
计算机看不懂"汉堡"这两个字，它只认识数字。
所以，我们的第一个任务是：**把文本切分成计算机能理解的最小单位**。

[分析问题]

- **英文**：自带空格，天然容易分词（如 `I love AI`）。
- **中文**：没有空格，需要算法来切分（如 `我爱人工智能`）。

[解决问题]
现代 LLM（如 GPT-4）通常使用 **Subword Tokenization（子词分词）** 技术（如 BPE 算法）。
它的聪明之处在于：

- **常用词**（如 "apple"）保持完整，作为一个 Token。
- **生僻词**（如 "applepie"）拆分成常见片段（"apple" + "pie"）。
```

**要点**：

- 第一段：提出问题（用粗体强调任务）
- 第二段：分析问题（用列表对比）
- 第三段：解决问题（说明方案和优势）

## 二、文章结构规范

### 2.1 标题与学习指南

```markdown
# 主题名称 (English Title)

> 💡 **学习指南**：本章节[前置要求]，通过[教学方式]带你深入了解[核心主题]。我们将从[起点]开始，一直到[终点]。
```

**要点**：

- 标题使用中英双语，括号标注
- 学习指南块说明：前置要求、教学方式、学习路径
- 降低读者焦虑，强调"无需XX基础"

### 2.2 引子：从问题到动机

**结构**：

1. **类比/比喻**：用日常生活中的例子引入
2. **核心挑战**：列出 3 个左右要解决的问题
3. **路线图**：预告章节结构

```markdown
## 0. 引言：从[熟悉概念]到[新概念]

[用类比连接两个概念]

它的核心任务只有一个：**[一句话总结核心目标]**。

为了实现这个目标，我们需要解决三个核心挑战：

1.  **[挑战1]**：[为什么需要]
2.  **[挑战2]**：[为什么需要]
3.  **[挑战3]**：[为什么需要]

本教程将带你从零开始，一步步拆解[核心主题]的构建过程。
```

### 2.3 主体章节结构

每个知识点遵循 **"问题 → 方案 → 对比 → 演示"** 的结构：

```markdown
## N. [章节标题]

[段落1：提出问题/当前困境]

### N.1 [子问题标题]

[解释问题产生的背景/原因]

### N.2 [解决方案标题]

[提出解决方案，解释其核心思想]

**关键点**：[一句话总结核心概念]

<[InteractiveDemo />
```

**要点**：

- 用问答式标题（"什么是XX？" "为什么不用XX？"）
- 用列表和粗体强调重点
- 每个关键概念后紧跟交互式演示

### 2.4 对比分析表格

当需要对比多个选项时，使用表格：

```markdown
| 特性         | [选项A]            | [选项B]            |
| :----------- | :----------------- | :----------------- |
| **核心逻辑** | **[描述]**         | **[描述]**         |
| **优点**     | [优点1]<br>[优点2] | [优点1]<br>[优点2] |
| **缺点**     | [缺点1]<br>[缺点2] | [缺点1]<br>[缺点2] |
| **适用场景** | [场景1]            | [场景2]            |

> ⚠️ **注意**：[使用建议或注意事项]
```

### 2.5 数据示例

当涉及数据格式时，提供 JSON 示例：

````markdown
- **数据示例 (JSON 格式)**：
  ```json
  // [注释说明这是什么数据]
  {
    "field1": "值1",
    "field2": "值2"
  }
  // 模型学会了：[解释这个数据的作用]
  ```
````

### 2.6 名词速查表

文章末尾提供 Glossary：

```markdown
## N. 名词速查表 (Glossary)

| 名词      | 全称        | 解释                                   |
| :-------- | :---------- | :------------------------------------- |
| **TERM1** | Full Name 1 | **简短中文说明**。详细解释为什么重要。 |
| **TERM2** | Full Name 2 | **简短中文说明**。详细解释。           |
```

## 三、交互式组件规范

### 3.1 组件文件组织

**目录结构**：

```
docs/.vitepress/theme/components/appendix/{topic-name}/
├── {Concept}Demo.vue      # 主演示组件
├── {Concept}Demo.vue      # 其他相关组件
└── ...
```

**命名规范**：

- 使用 PascalCase
- 描述性强，如 `TokenizationDemo.vue`、`EmbeddingDemo.vue`
- 与 Markdown 中引用的组件名一致

### 3.2 组件开发规范

#### 3.2.1 文件头注释

```vue
<!--
  ComponentName.vue
  组件用途简述

  用途：
  [详细说明这个组件要展示什么概念，解决什么教学问题]

  交互功能：
  - [功能1]：[说明]
  - [功能2]：[说明]
  - [功能3]：[说明]
-->
```

#### 3.2.2 模板结构

```vue
<template>
  <div class="[component-name]">
    <!-- 控制面板（如果有） -->
    <div class="control-panel">[输入控件、模式切换等]</div>

    <!-- 可视化区域 -->
    <div class="visualization-area">[核心可视化内容]</div>

    <!-- 说明文字 -->
    <div class="info-box">
      <p>
        <span class="icon">💡</span>
        <strong>Note:</strong>
        [教育性说明文字]
      </p>
    </div>
  </div>
</template>
```

**层级结构**：

- `.control-panel`：控制区（输入、切换按钮）
- `.visualization-area`：核心可视化区
- `.info-box`：说明提示框

#### 3.2.3 脚本编写

```vue
<script setup>
import { ref, computed } from 'vue'

// 响应式状态
const [stateName] = ref([initialValue])

// 计算属性
const [computedName] = computed(() => {
  // 逻辑处理
  return result
})

// 方法
const [methodName] = ([params]) => {
  // 方法实现
}
</script>
```

**要点**：

- 使用 Vue 3 Composition API (`<script setup>`)
- 优先使用 `ref` 和 `computed`
- 保持逻辑简洁，复杂计算应有注释

#### 3.2.4 样式规范

```vue
<style scoped>
.[component-name] {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background-color: var(--vp-c-bg-soft);
  padding: 1.5rem;
  margin: 1rem 0;
  font-family: var(--vp-font-family-mono);
}

.control-panel {
  /* 控制面板样式 */
}

.visualization-area {
  /* 可视化区域样式 */
}
</style>
```

**CSS 变量使用**：

- `var(--vp-c-bg)`：主背景色
- `var(--vp-c-bg-soft)`：次背景色
- `var(--vp-c-bg-alt)`：交替背景色
- `var(--vp-c-divider)`：分隔线颜色
- `var(--vp-c-brand)`：主题色
- `var(--vp-c-text-1/2/3)`：文本颜色（1最深，3最浅）

**布局工具**：

- 使用 Flexbox：`display: flex; gap: 1rem;`
- 响应式：`@media (max-width: 640px) { ... }`
- 圆角：`border-radius: 6px/8px/12px`
- 过渡：`transition: all 0.2s`

### 3.3 交互设计原则

#### 3.3.1 即时反馈

```javascript
// 用户操作立即触发视觉反馈
const handleInput = (value) => {
  result.value = processInput(value)
  // 不需要点击"提交"按钮
}
```

#### 3.3.2 颜色编码

```javascript
// 使用颜色区分不同状态/类型
const colorClasses = [
  'color-0', // rgba(255, 99, 132, 0.2) - 红色
  'color-1', // rgba(54, 162, 235, 0.2) - 蓝色
  'color-2', // rgba(255, 206, 86, 0.2) - 黄色
  'color-3', // rgba(75, 192, 192, 0.2) - 青色
  'color-4' // rgba(153, 102, 255, 0.2) - 紫色
]
```

#### 3.3.3 多模式支持

```javascript
// 提供不同视角/模式
const modes = [
  { id: 'mode1', label: '模式1', desc: '说明' },
  { id: 'mode2', label: '模式2', desc: '说明' }
]

const currentMode = ref('mode1')
```

#### 3.3.4 动画效果

```css
/* 淡入动画 */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(5px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 脉冲动画 */
@keyframes pulse {
  0% {
    opacity: 0.4;
    transform: scale(0.8);
  }
  50% {
    opacity: 1;
    transform: scale(1.1);
  }
  100% {
    opacity: 0.4;
    transform: scale(0.8);
  }
}

/* 弹性过渡 */
transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
```

### 3.4 常见组件模式

#### 3.4.1 输入演示型

**示例**：`TokenizationDemo.vue`

```vue
<template>
  <div class="demo">
    <div class="input-group">
      <label>Input</label>
      <textarea v-model="inputText"></textarea>
    </div>

    <div class="output">
      <div v-for="item in processedItems" :key="item.id">
        {{ item }}
      </div>
    </div>
  </div>
</template>

<script setup>
const inputText = ref('默认示例文本')

const processedItems = computed(() => {
  return process(inputText.value)
})
</script>
```

#### 3.4.2 模式切换型

**示例**：`EmbeddingDemo.vue`

```vue
<template>
  <div class="demo">
    <div class="mode-selector">
      <button
        v-for="mode in modes"
        :key="mode.id"
        :class="{ active: currentMode === mode.id }"
        @click="currentMode = mode.id"
      >
        {{ mode.label }}
      </button>
    </div>

    <div class="content">
      {{ modes.find((m) => m.id === currentMode)?.content }}
    </div>
  </div>
</template>
```

#### 3.4.3 步骤引导型

**示例**：`TrainingInferenceDemo.vue`（假设）

```vue
<template>
  <div class="demo">
    <div class="steps">
      <button
        v-for="(step, index) in steps"
        :key="index"
        :class="{ active: currentStep === index }"
        @click="currentStep = index"
      >
        {{ step.title }}
      </button>
    </div>

    <div class="step-content">
      {{ steps[currentStep].content }}
    </div>
  </div>
</template>
```

## 四、Markdown 使用技巧

### 4.1 组件引用

```markdown
<ConceptDemo />

<!-- 带间距 -->
<ConceptDemo />

<!-- 多个组件 -->
<Demo1 />
<Demo2 />
```

### 4.2 代码块

````markdown
```javascript
// 代码示例
const example = 'highlighted'
```
````

### 4.3 强调与标注

```markdown
**粗体强调**
_斜体_
`代码片段`

> 引用块
```

### 4.4 分隔线

```markdown
---

<!-- 使用分隔线区分不同主题 -->
```

## 五、最佳实践

### 5.1 内容层面

1. **从具体到抽象**：先展示效果，再解释原理
2. **用类比降低认知负担**：如"Tokenizer 就像翻译官"
3. **多问"为什么"**：解释设计动机，不只讲是什么
4. **保持简洁**：每个知识点控制在 200-300 字

### 5.2 交互层面

1. **提供默认值**：让用户打开即见效果
2. **即时反馈**：不需要点击"提交"才看结果
3. **容错性**：输入验证，友好提示错误
4. **移动端适配**：使用 `@media` 查询

### 5.3 可视化层面

1. **颜色有意义**：不仅美观，更要传递信息
2. **动画适度**：增强理解，不干扰阅读
3. **层次清晰**：用阴影、边框、间距区分层级
4. **统一风格**：项目内组件使用相似的设计语言

### 5.4 性能优化

1. **计算属性缓存**：使用 `computed` 而非方法
2. **避免不必要的响应式**：静态数据用 `const`
3. **懒加载**：复杂组件考虑按需加载

## 六、开发工作流

### 6.1 创建新教程步骤

1. **规划内容**：
   - 列出要讲解的核心概念
   - 为每个概念设计交互演示
   - 画出组件草图

2. **创建组件**：

   ```bash
   mkdir -p docs/.vitepress/theme/components/appendix/{topic-name}
   touch docs/.vitepress/theme/components/appendix/{topic-name}/{Concept}Demo.vue
   ```

3. **编写组件**：
   - 添加文件头注释
   - 实现 `<template>`、`<script setup>`、`<style scoped>`
   - 本地测试交互效果

4. **编写文档**：
   - 创建 Markdown 文件
   - 按照文章结构规范编写
   - 在适当位置嵌入组件

5. **测试发布**：

   ```bash
   npm run dev     # 本地预览
   npm run build   # 构建检查
   ```

### 6.2 调试技巧

1. **Vue DevTools**：检查组件状态
2. **Console.log**：输出中间结果
3. **简化测试**：先用静态数据测试布局

## 七、示例对照

参考以下文件学习完整实现：

| 文件                                                                        | 说明           |
| --------------------------------------------------------------------------- | -------------- |
| `docs/zh-cn/appendix/llm-intro.md`                                          | 完整的文章结构 |
| `docs/.vitepress/theme/components/appendix/llm-intro/LlmQuickStartDemo.vue` | 聊天交互型组件 |
| `docs/.vitepress/theme/components/appendix/llm-intro/TokenizationDemo.vue`  | 输入处理型组件 |
| `docs/.vitepress/theme/components/appendix/llm-intro/EmbeddingDemo.vue`     | 模式切换型组件 |

## 八、检查清单

发布前确认：

- [ ] 文章结构完整（标题、引言、主体、总结）
- [ ] 每个核心概念都有交互演示
- [ ] 组件有文件头注释
- [ ] 使用 VitePress CSS 变量
- [ ] 响应式设计（移动端测试）
- [ ] 默认值示例让组件"打开即用"
- [ ] 动画流畅不卡顿
- [ ] 文字无错别字
- [ ] 代码示例可运行
- [ ] `npm run build` 成功

---

**总结**：优秀的交互式教程 = 清晰的逻辑 + 即时的反馈 + 精致的可视化。遵循本规范，可以创建出让读者"秒懂"复杂概念的高质量内容。
