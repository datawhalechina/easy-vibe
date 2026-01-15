# HTML/CSS/JS 基础 (Web Basics)

> 💡 **学习指南**：网页开发的三大基石，每个前端工程师的必修课。本章节将通过可视化和实战示例，带你快速理解 HTML、CSS 和 JavaScript 的职责与协作关系。

## 0. 快速上手：三剑客简介

现代网页由三种核心技术组成，它们各司其职，缺一不可。

<WebTechTriad />

## 1. HTML：网页的骨架

### 1.1 什么是 HTML？

**HTML (HyperText Markup Language)** 是超文本标记语言，用来定义网页的<strong>结构和内容</strong>。

简单来说，HTML 告诉浏览器：
- 这里是标题
- 这里是段落
- 这里是图片
- 这里是链接

### 1.2 HTML 基础语法

```html
<!-- 这是一个标题 -->
<h1>欢迎来到我的网站</h1>

<!-- 这是一个段落 -->
<p>这是一段文字内容。</p>

<!-- 这是一个图片 -->
<img src="photo.jpg" alt="我的照片">

<!-- 这是一个链接 -->
<a href="https://example.com">点击这里</a>
```

**关键概念**：
- **标签 (Tags)**：用 `< >` 包裹的关键字，如 `<h1>`
- **元素 (Elements)**：标签 + 内容，如 `<h1>标题</h1>`
- **属性 (Attributes)**：标签的附加信息，如 `src="photo.jpg"`
- **嵌套 (Nesting)**：标签可以包含其他标签

### 1.3 常用 HTML 标签

| 标签 | 用途 | 示例 |
|------|------|------|
| `<h1>` - `<h6>` | 标题（从大到小） | `<h1>文章标题</h1>` |
| `<p>` | 段落 | `<p>这是一段话。</p>` |
| `<div>` | 容器（块级） | `<div class="header">...</div>` |
| `<span>` | 容器（行内） | `<span style="color:red">红色文字</span>` |
| `<ul>` / `<ol>` | 列表（无序/有序） | `<ul><li>项目1</li></ul>` |
| `<a>` | 链接 | `<a href="/about">关于</a>` |
| `<img>` | 图片 | `<img src="cat.jpg" alt="猫咪">` |
| `<button>` | 按钮 | `<button>点击我</button>` |

## 2. CSS：网页的化妆师

### 2.1 什么是 CSS？

**CSS (Cascading Style Sheets)** 是层叠样式表，用来控制网页的<strong>外观和布局</strong>。

简单来说，CSS 告诉浏览器：
- 这个标题是红色的
- 这段文字要居中显示
- 这个盒子要圆角边框
- 背景是渐变色

### 2.2 CSS 盒模型交互演示

**盒模型** 是 CSS 中最重要的概念之一！每个元素都被表示为一个矩形的盒子。

<CssBoxModel />

**关键要点**：
- **Content（内容）**：元素的实际内容区域
- **Padding（内边距）**：内容和边框之间的空间
- **Border（边框）**：包裹内容的边界线
- **Margin（外边距）**：元素与其他元素之间的空间
- **总宽度** = margin + border + padding + width + padding + border + margin

### 2.3 CSS Flexbox 布局交互演示

**Flexbox** 是现代 CSS 布局的利器，让元素排列变得简单！

<CssFlexbox />

**Flexbox 核心概念**：
- **flex-direction**：控制主轴方向（行/列）
- **justify-content**：控制主轴对齐方式
- **align-items**：控制交叉轴对齐方式
- **flex-wrap**：控制是否换行
- **gap**：控制项目间距
- **flex-grow**：控制项目的放大比例

### 2.4 CSS 基础语法

```css
/* 选择器 { 属性: 值; } */
h1 {
  color: red;              /* 文字颜色 */
  font-size: 24px;         /* 字体大小 */
  text-align: center;      /* 文字居中 */
}

.button {
  background: #007bff;     /* 背景颜色 */
  border: none;            /* 无边框 */
  padding: 10px 20px;       /* 内边距 */
  border-radius: 5px;      /* 圆角 */
}

.button:hover {
  background: #0056b3;     /* 鼠标悬停时的颜色 */
}
```

**关键概念**：
- **选择器 (Selector)**：要样式化的元素，如 `h1`
- **属性 (Property)**：要改变的样式，如 `color`
- **值 (Value)**：属性的设置，如 `red`
- **盒模型 (Box Model)**：padding, border, margin

### 2.3 CSS 引入方式

三种方式引入 CSS：

```html
<!-- 1. 行内样式 -->
<div style="color: red;">红色文字</div>

<!-- 2. 内部样式表 -->
<head>
  <style>
    .box { background: blue; }
  </style>
</head>

<!-- 3. 外部样式表（推荐） -->
<head>
  <link rel="stylesheet" href="styles.css">
</head>
```

## 3. JavaScript：网页的灵魂

### 3.1 什么是 JavaScript？

**JavaScript** 是一种编程语言，用来实现网页的<strong>交互和动态功能</strong>。

简单来说，JavaScript 让网页：
- 响应用户点击
- 处理表单提交
- 加载数据并更新页面
- 创建动画效果

### 3.2 DOM 操作交互演示

**DOM (Document Object Model)** 文档对象模型，是 JavaScript 操作网页内容的接口。

<DomManipulator />

**DOM 操作核心方法**：
- **获取元素**：`document.getElementById()`、`document.querySelector()`
- **修改内容**：`element.textContent`、`element.innerHTML`
- **修改样式**：`element.style.property = value`
- **添加/删除类**：`element.classList.add()`、`element.classList.remove()`
- **显示/隐藏**：`element.style.display = 'none'/'block'`

### 3.3 JavaScript 基础语法

```javascript
// 变量声明
let message = "Hello, World!";

// 函数定义
function greet(name) {
  return "Hello, " + name + "!";
}

// 事件监听
button.addEventListener('click', function() {
  alert('按钮被点击了！');
});

// DOM 操作
document.getElementById('title').textContent = '新标题';
```

**关键概念**：
- **变量 (Variables)**：存储数据，如 `let x = 10;`
- **函数 (Functions)**：可复用的代码块
- **事件 (Events)**：用户动作（点击、输入等）
- **DOM (Document Object Model)**：网页内容的编程接口

### 3.3 JavaScript 引入方式

```html
<!-- 1. 行内脚本（不推荐） -->
<button onclick="alert('Hi')">点击</button>

<!-- 2. 内部脚本 -->
<head>
  <script>
    console.log('Hello!');
  </script>
</head>

<!-- 3. 外部脚本（推荐） -->
<body>
  <script src="script.js"></script>
</body>
```

## 4. 三者协作示例

让我们看一个完整的例子：

```html
<!DOCTYPE html>
<html>
<head>
  <!-- CSS 样式 -->
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
  <!-- HTML 结构 -->
  <div class="card">
    <h1 id="title">欢迎</h1>
    <p>点击按钮改变标题！</p>
    <button class="btn" onclick="changeTitle()">点击我</button>
  </div>

  <!-- JavaScript 交互 -->
  <script>
    function changeTitle() {
      document.getElementById('title').textContent = '已点击！';
      alert('标题已改变');
    }
  </script>
</body>
</html>
```

## 5. 学习路线图

### 5.1 初学者路线

1. **第一周**：HTML 基础
   - 学习常用标签
   - 理解文档结构
   - 创建第一个网页

2. **第二周**：CSS 基础
   - 掌握盒模型
   - 学习布局方式
   - 美化你的网页

3. **第三周**：JavaScript 基础
   - 理解变量和函数
   - 学习 DOM 操作
   - 添加交互功能

### 5.2 进阶学习方向

**HTML 深入**：
- 语义化标签 (`<header>`, `<nav>`, `<article>`)
- 表单增强
- SEO 优化

**CSS 深入**：
- Flexbox 和 Grid 布局
- 响应式设计
- CSS 动画

**JavaScript 深入**：
- ES6+ 新特性
- 异步编程 (Promise, async/await)
- 框架学习 (Vue, React)

## 6. 实用工具推荐

### 6.1 编辑器

- **VS Code**：最流行的代码编辑器
- **WebStorm**：专业的 IDE
- **Sublime Text**：轻量级编辑器

### 6.2 浏览器开发者工具

按 `F12` 打开，包含：
- **Elements**：查看和修改 HTML/CSS
- **Console**：执行 JavaScript 代码
- **Network**：监控网络请求
- **Sources**：调试 JavaScript

### 6.3 学习资源

- **MDN Web Docs**：Mozilla 官方文档
- **W3Schools**：入门教程
- **freeCodeCamp**：互动式学习
- **Codecademy**：实战练习

## 7. 总结

HTML/CSS/JavaScript 是网页开发的三大支柱：

- 🏗️ **HTML** = 结构（是什么）
- 🎨 **CSS** = 表现（长什么样）
- ⚡ **JavaScript** = 行为（做什么）

**学习建议**：
- ✅ 先学 HTML，再学 CSS，最后学 JavaScript
- ✅ 多动手实践，创建小项目
- ✅ 查看优秀网站的源代码
- ✅ 使用浏览器开发者工具实验

记住：<strong>理论 + 实践 = 掌握</strong>。现在就开始创建你的第一个网页吧！
