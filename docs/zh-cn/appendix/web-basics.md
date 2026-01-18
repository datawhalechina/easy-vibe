# HTML/CSS/JS 基础 (Web Basics)

> 💡 **学习指南**：不需要任何基础，像玩游戏一样点一点、改一改，亲手拆解网页背后的秘密，五分钟看懂它到底是怎么造出来的。

## 0. 引言：从网页外观到幕后三剑客

你每天刷到的页面，其实是 **结构（HTML）+ 表现（CSS）+ 行为（JavaScript）** 三股力量协作的结果。

为了把一个想法变成可交互的网页，我们需要解决三件事：

1. **放什么**：内容与层级如何组织？
2. **长什么样**：颜色、布局、留白、动效如何呈现？
3. **怎么动**：用户点击/输入后，页面如何响应？

打开下面的交互，先“玩一玩”三者的分工，再继续向下学习。

<WebTechTriad />

---

## 1. HTML：为什么不能只用纯文本？

### 1.1 朴素方案的缺陷

- 纯文本无法表达层级（标题、列表、表格）。
- 屏幕阅读器和搜索引擎看不懂语义。
- 链接、表单、媒体都无法定义。

### 1.2 解决方案：用标记语言搭出“骨架”

**HTML (HyperText Markup Language)** 用标签描述结构和含义。

```html
<h1>欢迎来到我的网站</h1>
<p>这是一段文字内容。</p>
<img src="photo.jpg" alt="我的照片" />
<a href="https://example.com">点击这里</a>
```

**关键概念**：

- **标签 (Tag)**：`<h1>`、`<p>` 用来声明“这是什么”。
- **元素 (Element)**：标签 + 内容，如 `<h1>标题</h1>`。
- **属性 (Attribute)**：附加信息，如 `alt="我的照片"`。
- **嵌套 (Nesting)**：父子结构，让页面有层次。

### 1.3 常用语义标签速查

<SemanticTagsDemo />

---

## 2. CSS：给网页“精装修”

### 2.1 只有 HTML 会怎样？

就像**毛坯房**：有墙有窗，能住人，但**丑**。

- 文字黑乎乎，挤在一起。
- 图片乱排，大小不一。
- 没有任何设计感。

### 2.2 解决方案：请个“装修队” (CSS)

**CSS (Cascading Style Sheets)** 专门负责**变好看**。它不改变房子结构（HTML），只负责刷漆、贴砖、摆家具。

```css
/* 谁？ { 改什么: 变成啥; } */
h1 {
  color: red; /* 颜色变红 */
  font-size: 24px; /* 字变大 */
  text-align: center; /* 居中放 */
}

.button {
  background: #007bff; /* 蓝色背景 */
  border: none; /* 不要边框 */
  padding: 10px 20px; /* 撑大一点 */
  border-radius: 5px; /* 圆角 */
}

.button:hover {
  background: #0056b3; /* 鼠标放上去变深蓝 */
}
```

**引入方式**：

```html
<!-- 1) 临时贴个条（行内样式） -->
<div style="color: red;">红色文字</div>

<!-- 2) 写在户型图背面（内部样式） -->
<style>
  .box {
    background: blue;
  }
</style>

<!-- 3) 找专业装修公司出图纸（外部样式 - 推荐！） -->
<link rel="stylesheet" href="styles.css" />
```

### 2.3 核心机制：CSS 怎么找到 HTML？

新手最容易晕的就是：CSS 里写的 `p`、`.card`、`#btn` 到底是怎么跟 HTML 对应上的？

这就好比老师在班级里点名，有三种点法：

1.  **喊“所有人” (标签选择器)**：喊 "男生"，所有男生都要站起来。
2.  **喊“小组名” (类选择器)**：喊 "英语课代表"，可能有好几个。
3.  **喊“学号” (ID 选择器)**：喊 "2024001"，全班只有一个。

**互动演示：把鼠标移到左边的 CSS 规则上，看看右边谁会亮起来。**

<CssSelectorsDemo />

### 2.4 盒模型：为什么宽度算不准？

每个元素都是一个盒子，由 **内容 → 内边距 → 边框 → 外边距** 组成。

<CssBoxModel />

记忆公式：**总宽度 = margin + border + padding + width + padding + border + margin**。

### 2.5 怎么知道有哪些 CSS 属性？

新手常问：“我怎么知道要改颜色是 `color` 还是 `font-color`？” CSS 属性多到记不住，是因为网页要面对的情况太复杂了（各种屏幕尺寸、各种设计需求）。

**但好消息是：日常开发中，90% 的时间你只需要用到下面这 20% 的核心属性。**

<CssCommonProperties />

#### 遇到不认识的属性怎么办？

**在 AI 原生时代，解决这个问题有更聪明的方法：**

1.  **直接问 AI (首选方案)**：
    - 现在的 AI 编程助手（如 Cursor、Trae、GitHub Copilot）已经非常强大。
    - 你根本不需要背诵属性，直接用自然语言描述你的需求。
    - **例子**：你对 AI 说 "我要一个带有阴影的蓝色圆形按钮"，它会直接给你写出包含 `background-color`, `border-radius`, `box-shadow` 的完整代码。
    - **为什么这是首选？** 因为它不仅告诉你“属性名”，还帮你把“值”都调好了。

2.  **查文档 (MDN)**：
    - MDN Web Docs 是 Web 开发的权威字典。
    - 搜 "MDN CSS text color"，它会告诉你正确属性是 `color`。
    - 搜 "MDN CSS background"，它会列出 `background-color`, `background-image` 等家族成员。

3.  **用浏览器“偷看” (DevTools)**：
    - 在喜欢的网页上**右键 -> 检查 (Inspect)**。
    - 在 **Styles** 面板里，你可以看到人家用了什么属性。
    - 你甚至可以直接在那里面试着改改数值，实时看效果（刷新就没了，很安全）。

4.  **CSS 游乐场**：
    - 下面的演示列出了一些最常用的“装修参数”。
    - 试着拖动滑块、修改颜色，看看它们分别控制什么。

<CssPlaygroundDemo />

### 2.6 现代 CSS 开发：Tailwind CSS 简介

以前写 CSS，我们要给每个东西起个名字（比如 `.my-button`, `.header-title`），然后在 CSS 文件里写一堆属性。这叫“语义化 CSS”。

现在流行一种**原子化 CSS (Utility-first CSS)**，代表作是 **Tailwind CSS**。

**它的核心思想**：
不要写 CSS 代码，直接在 HTML 标签上写“代号”。

- **传统写法**：

  ```html
  <button class="btn-primary">按钮</button>
  <style>
    .btn-primary {
      background-color: #3b82f6;
      color: white;
      padding: 0.5rem 1rem;
      border-radius: 0.25rem;
    }
  </style>
  ```

- **Tailwind 写法**：
  ```html
  <!-- bg-blue-500: 蓝色背景 -->
  <!-- text-white: 白字 -->
  <!-- px-4 py-2: 左右间距4，上下间距2 -->
  <!-- rounded: 圆角 -->
  <button class="bg-blue-500 text-white px-4 py-2 rounded">按钮</button>
  ```

**为什么它这么火？**

1.  **不用起名**：最头疼的“起类名”环节没了。
2.  **不切文件**：不用在 HTML 和 CSS 文件之间切来切去。
3.  **不怕删**：删掉 HTML 标签时，样式自动就没了，不会留下堆积如山的无用 CSS 代码。

> 💡 **提示**：现在的 AI 编程工具（如 Cursor, v0）非常擅长写 Tailwind。你只要说“给我一个蓝色的圆角按钮”，它大概率直接给你生成带 Tailwind 类的代码。

### 2.7 Flexbox：为什么对齐和分布这么简单？

<CssLayoutDemo />

核心属性速记：

- `flex-direction`: 行/列
- `justify-content`: 主轴对齐
- `align-items`: 交叉轴对齐
- `flex-wrap`: 是否换行
- `gap`: 间距
- `flex-grow`: 放大比例

---

## 3. JavaScript：为什么页面需要“思考”？

### 3.1 没有 JS 会怎样？

- 按钮点了没反应，表单无法校验。
- 数据更新只能靠刷新整页。
- 动画、互动、个性化都做不了。

### 3.2 解决方案：用 JS 驱动行为与状态

**JavaScript** 赋予页面交互和逻辑。

```javascript
// 变量 + 函数
let message = 'Hello, World!'
function greet(name) {
  return `Hello, ${name}!`
}

// 事件监听
button.addEventListener('click', () => alert('按钮被点击了！'))

// DOM 操作
document.getElementById('title').textContent = '新标题'
```

### 3.3 DOM 现场演示：修改节点、切换样式

<DomManipulator />

常用接口：

- **获取元素**：`getElementById` / `querySelector`
- **改内容**：`textContent` / `innerHTML`
- **改样式**：`element.style.*`
- **类名切换**：`classList.add / remove / toggle`
- **显隐**：`element.style.display = 'none' | 'block'`

### 3.4 引入方式

```html
<!-- 行内（不推荐） -->
<button onclick="alert('Hi')">点击</button>
<!-- 内部脚本 -->
<script>
  console.log('Hello!')
</script>
<!-- 外部脚本（推荐） -->
<script src="script.js"></script>
```

---

## 4. 深入理解 DOM：网页的“族谱”

你可能经常听到 **DOM (Document Object Model)** 这个词。别被这个专业术语吓到，它其实就是一张**网页的族谱**。

### 4.1 什么是 DOM 树？

浏览器读取 HTML 代码后，不会把它们当成一堆字符串，而是会在内存里把它们画成一棵树。

- `<html>` 是祖先。
- `<body>` 是 `<html>` 的孩子。
- `div`、`p`、`button` 又是 `<body>` 的孩子。

这棵树就叫 **DOM 树**。

```mermaid
graph TD
    Document[Document] --> HTML[html]
    HTML --> Head[head]
    HTML --> Body[body]
    Head --> Title[title: "我的网页"]
    Body --> H1[h1: "欢迎"]
    Body --> Div[div.card]
    Div --> Img[img]
    Div --> P[p: "一段文字"]
    Div --> Button[button: "点击"]
```

### 4.2 为什么叫“对象模型” (Object Model)？

因为在 JS 眼里，HTML 标签不仅仅是标签，而是**对象 (Object)**。它们有属性，有方法。

- **属性 (Property)**：
  - `img.src` = "photo.jpg"
  - `div.className` = "box"
  - `input.value` = "123"
- **方法 (Method)**：
  - `button.click()` (假装被点了一下)
  - `div.remove()` (自杀)
  - `body.appendChild(newDiv)` (生个孩子)

### 4.3 怎么找节点？(CRUD)

就像在族谱里找人一样，JS 提供了很多方法：

1.  **按身份证找 (ID)**：
    - `document.getElementById('header')` —— 全局唯一，最快。
2.  **按特征找 (Selector)**：
    - `document.querySelector('.card h2')` —— 就像写 CSS 一样找，很灵活。
3.  **按关系找**：
    - `element.parentNode` (找爸爸)
    - `element.children` (找孩子)

### 4.4 性能警告：不要频繁“拆家”

操作 DOM 是很贵的。每次你修改 DOM（比如改大小、改位置），浏览器都要重新计算排版（**Reflow**）和重新绘制（**Repaint**）。

- ❌ **低效**：循环 1000 次，每次往 `body` 里插入一个 `div`。
- ✅ **高效**：先把 1000 个 `div` 拼好（DocumentFragment），一次性塞进 `body` 里。

这也正是 **Vue / React** 诞生的原因：它们在内存里玩“虚拟 DOM”，计算好最小修改量，最后才去动真正的 DOM，从而保护了性能。

---

## 5. 协作实战：三者如何“分工又配合”？

### 5.1 分工对比表

| 角色           | 负责什么         | 不做什么        | 典型示例                           |
| :------------- | :--------------- | :-------------- | :--------------------------------- |
| **HTML**       | 定义结构与语义   | 不负责样式/交互 | `<section><h1>标题</h1></section>` |
| **CSS**        | 定义表现与布局   | 不存放业务逻辑  | `.card { border-radius: 8px; }`    |
| **JavaScript** | 定义行为与数据流 | 不承担视觉表现  | `button.onclick = changeTitle`     |

### 5.2 组合示例：点击改变标题

```html
<!DOCTYPE html>
<html>
  <head>
    <style>
      .card {
        border: 1px solid #ddd;
        padding: 20px;
        border-radius: 8px;
        background: white;
      }
      .btn {
        background: #007bff;
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: 4px;
        cursor: pointer;
      }
    </style>
  </head>
  <body>
    <div class="card">
      <h1 id="title">欢迎</h1>
      <p>点击按钮改变标题！</p>
      <button class="btn" onclick="changeTitle()">点击我</button>
    </div>
    <script>
      function changeTitle() {
        document.getElementById('title').textContent = '已点击！'
        alert('标题已改变')
      }
    </script>
  </body>
</html>
```

---

## 5. 学习路线图

### 5.1 4 周入门节奏

1. **第 1 周：HTML 结构** — 常用标签、语义化、表单与媒体。
2. **第 2 周：CSS 造型** — 盒模型、选择器、Flexbox、主题色与间距体系。
3. **第 3 周：JavaScript 互动** — 变量/函数、事件、DOM 操作、模块化。
4. **第 4 周：整合小项目** — 做一个带样式和交互的单页，练习部署。

### 5.2 进阶方向

- **HTML**：语义化布局、可访问性 (ARIA)、SEO。
- **CSS**：Grid 布局、响应式设计、CSS 动画与变量。
- **JavaScript**：ES6+ 语法、异步编程 (Promise/async)、前端框架 (Vue/React)。

---

## 6. 实用工具与资源

- **编辑器**：VS Code（丰富插件）、WebStorm（强力重构）、Sublime Text（轻量）。
- **浏览器 DevTools**：Elements / Styles / Console / Network / Sources（`F12` 打开）。
- **在线文档**：MDN Web Docs、W3Schools、freeCodeCamp、Codecademy。

---

## 7. 名词速查表 (Glossary)

| 名词           | 全称                      | 解释                               |
| :------------- | :------------------------ | :--------------------------------- |
| **HTML**       | HyperText Markup Language | 用标签描述网页结构与语义。         |
| **CSS**        | Cascading Style Sheets    | 控制颜色、布局、动效的样式语言。   |
| **JavaScript** | JavaScript                | 让页面具备逻辑与交互的脚本语言。   |
| **DOM**        | Document Object Model     | 用对象树表示页面，可被 JS 读写。   |
| **Flexbox**    | Flexible Box Layout       | 一种一维布局方案，易于对齐与分布。 |
| **Box Model**  | CSS Box Model             | 元素从内容到外边距的层层盒子。     |

---

现在你已经知道：**HTML 定义骨架，CSS 负责颜值，JavaScript 赋予灵魂**。动手把上面的组合示例改成你自己的页面，实践会让每个概念“立即长在手上”。
