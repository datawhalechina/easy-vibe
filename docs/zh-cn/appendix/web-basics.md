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
*   文字黑乎乎，挤在一起。
*   图片乱排，大小不一。
*   没有任何设计感。

### 2.2 解决方案：请个“装修队” (CSS)

**CSS (Cascading Style Sheets)** 专门负责**变好看**。它不改变房子结构（HTML），只负责刷漆、贴砖、摆家具。

```css
/* 谁？ { 改什么: 变成啥; } */
h1 {
  color: red;        /* 颜色变红 */
  font-size: 24px;   /* 字变大 */
  text-align: center;/* 居中放 */
}

.button {
  background: #007bff; /* 蓝色背景 */
  border: none;        /* 不要边框 */
  padding: 10px 20px;  /* 撑大一点 */
  border-radius: 5px;  /* 圆角 */
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
  .box { background: blue; }
</style>

<!-- 3) 找专业装修公司出图纸（外部样式 - 推荐！） -->
<link rel="stylesheet" href="styles.css" />
```

### 2.3 盒模型：为什么宽度算不准？

每个元素都是一个盒子，由 **内容 → 内边距 → 边框 → 外边距** 组成。

<CssBoxModel />

记忆公式：**总宽度 = margin + border + padding + width + padding + border + margin**。

### 2.4 Flexbox：为什么对齐和分布这么简单？

<CssFlexbox />

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

## 4. 协作实战：三者如何“分工又配合”？

### 4.1 分工对比表

| 角色           | 负责什么         | 不做什么        | 典型示例                           |
| :------------- | :--------------- | :-------------- | :--------------------------------- |
| **HTML**       | 定义结构与语义   | 不负责样式/交互 | `<section><h1>标题</h1></section>` |
| **CSS**        | 定义表现与布局   | 不存放业务逻辑  | `.card { border-radius: 8px; }`    |
| **JavaScript** | 定义行为与数据流 | 不承担视觉表现  | `button.onclick = changeTitle`     |

### 4.2 组合示例：点击改变标题

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
