# HTML/CSS/JavaScript 基础 (Web Basics)

::: tip 🎯 核心问题
**网页是怎么做出来的?为什么有的网页只有文字,有的却像应用一样可以交互?** 这个问题会引出 Web 开发的三大基石,让你理解每一个网页背后的结构。
:::

---

## 1. 为什么要理解网页的"三剑客"?

### 1.1 从"电子海报"到"Web 应用"

想象一下你在街上看到的**海报**。你只能看,不能互动——海报不会因为你看了就改变内容,也不会因为你点了某个地方就弹出更多信息。

早期的网页就是这样的"电子海报"：只能看、不能改、内容固定。

但现代网页完全不同了。它们像**桌面应用**一样：

- 你可以点击、拖拽、输入、上传
- 页面会根据你的操作实时变化
- 可以像软件一样完成复杂任务(比如在线视频剪辑)

**这种转变的核心原因,就是网页技术的三大基石:HTML + CSS + JavaScript**。

### 1.2 一个生活的比喻:盖房子

为了让你快速理解这三者的关系,我们用"盖房子"来比喻:

| 技术           | 🏠 房子比喻              | 实际作用             | 具体例子                             |
| -------------- | ------------------------ | -------------------- | ------------------------------------ |
| **HTML**       | 房子的**结构和材料**     | 定义网页的内容和层级 | 这是一面墙、这是一扇窗、这是一个房间 |
| **CSS**        | 房子的**装修和外观**     | 控制网页的样式和布局 | 墙刷成蓝色、窗户放在东边、地板铺瓷砖 |
| **JavaScript** | 房子的**电器和智能系统** | 让网页具备交互和逻辑 | 按开关灯亮了、开门窗帘自动拉开       |

::: tip 💡 从表格中你能看到什么?

**HTML → CSS**: 先有房子,才能装修。HTML 是基础,CSS 是美化。没有 HTML,CSS 就没有东西可以装饰。

**HTML + CSS → JavaScript**: 先有房子和装修,才能装智能系统。JavaScript 会让"死"的页面变"活"。

**核心思想**: 三者各司其职,但缺一不可。只有 HTML 的页面很丑,只有 HTML+CSS 的页面不能互动,三者齐全才能做出像微信网页版、淘宝这样的"Web 应用"。

🎯 动手试试看：

下面这个演示展示了 HTML/CSS/JavaScript 三者如何协作。你可以切换三种模式,点击页面上的元素会高亮对应的代码：

<WebTechTriad />

:::

---

## 2. HTML: 网页的"骨架"

### 2.1 为什么不能只用纯文本?

在 HTML 出现之前,互联网上的内容只是**纯文本**。就像你现在看的这段文字,没有任何格式、没有层级、没有链接。

纯文本的问题是什么?

- ❌ **无法表达层级**: 分不清哪是标题、哪是正文、哪是注释
- ❌ **机器看不懂**: 搜索引擎、屏幕阅读器(盲人用)无法理解内容
- ❌ **无法交互**: 没有链接、没有按钮、没有输入框

**HTML (HyperText Markup Language)** 就是为了解决这个问题诞生的。它用"标签"(tag)来标记内容的含义,让浏览器知道"这是什么"。

### 2.2 HTML 的核心概念:标签与元素

HTML 的基本单位是"标签"(tag)。标签用尖括号 `< >` 包裹,成对出现:

```html
<!-- 这是一个完整的 HTML 元素 -->
<h1>这是标题</h1>

<!-- 标签解释 -->
<标签名>内容</标签名>
```

**关键概念**:

- **标签 (Tag)**: `<h1>`、`<p>` 这种标记,告诉浏览器"这是什么"
- **元素 (Element)**: 标签 + 内容,比如 `<h1>标题</h1>` 整体
- **属性 (Attribute)**: 标签上的附加信息,比如 `<img src="photo.jpg">` 中的 `src`
- **嵌套 (Nesting)**: 标签里可以再放标签,形成父子关系

::: details 💡 点击查看:HTML 标签的"家族树"

HTML 标签之间的嵌套关系,就像一个家族树:

```html
<body>
  <!-- body 是"祖先" -->
  <div>
    <!-- div 是 body 的"孩子" -->
    <h1>标题</h1>
    <!-- h1 是 div 的"孙子" -->
    <p>段落</p>
  </div>
</body>
```

这种层级关系叫做 **DOM 树**(Document Object Model),我们后面会详细讲。
:::

### 2.3 常用 HTML 标签速查

::: tip 🎯 学习建议
不要背这些标签! 你只需要知道"有这些分类",用到的时候查文档就行。AI 时代更是如此——你告诉 AI"我要一个表单",它会直接写出完整代码。
:::

**结构标签** (定义页面骨架):

```html
<h1>这是一级标题</h1>
<h2>这是二级标题</h2>
<p>这是一个段落</p>
<div>这是一个容器(用来分组)</div>
<span>这是行内容器(用来分组文本)</span>
```

**链接与媒体** (让页面丰富):

```html
<!-- 链接 -->
<a href="https://example.com">点击这里跳转</a>

<!-- 图片 -->
<img src="photo.jpg" alt="照片描述" />

<!-- 视频 -->
<video src="movie.mp4" controls></video>
```

**表单** (收集用户输入):

```html
<form>
  <!-- 文本输入框 -->
  <input type="text" placeholder="请输入用户名" />

  <!-- 密码框 -->
  <input type="password" placeholder="请输入密码" />

  <!-- 按钮 -->
  <button type="submit">登录</button>
</form>
```

**语义化标签** (HTML5 新增,让页面含义更明确):

```html
<header>这是页面头部</header>
<nav>这是导航栏</nav>
<main>这是主要内容区</main>
<article>这是一篇文章</article>
<aside>这是侧边栏</aside>
<footer>这是页脚</footer>
```

::: tip 💡 为什么要用语义化标签?

`<div class="header">` 和 `<header>` 看起来效果一样,为什么要用后者?

1. **SEO 友好**: 搜索引擎能更好理解页面结构
2. **可访问性**: 屏幕阅读器能快速定位"导航""主要内容"等区域
3. **代码可读性**: 看到 `<header>` 一眼就知道是头部,不用猜 `class="header"` 的意图
   :::

---

## 3. CSS: 网页的"皮肤"

### 3.1 只有 HTML 会怎样?

想象你住进了一个**毛坯房**: 有墙、有窗、有门,能住人,但是:

- 墙是灰色的水泥,不好看
- 插座和开关随便装,不美观
- 没有家具,生活不方便

只有 HTML 的网页就是这样:有内容、有结构,但**丑**、**乱**、**不友好**。

CSS (Cascading Style Sheets) 就是网页的"装修队"。它不改变 HTML 的结构(不拆墙、不改门),只负责:

- 🎨 **刷墙**: 改变颜色、背景
- 🖼️ **挂画**: 添加边框、阴影、圆角
- 🪑 **摆家具**: 调整布局、间距、对齐

### 3.2 CSS 的三种写法

CSS 有三种"安装"方式,就像装修也有三种方式:

**方式一: 行内样式** (临时贴个装饰)

```html
<div style="color: red; background: yellow;">这段文字是红色的,背景是黄色的</div>
```

**适用场景**: 临时测试、快速原型。不推荐在生产代码中使用。

**方式二: 内部样式** (写在户型图背面)

```html
<head>
  <style>
    .red-text {
      color: red;
    }
  </style>
</head>
<body>
  <div class="red-text">这段文字是红色</div>
</body>
```

**适用场景**: 单页应用、组件的专属样式。

**方式三: 外部样式** (请专业装修公司) ⭐

```html
<!-- 在 HTML 中引入 -->
<link rel="stylesheet" href="styles.css" />
```

```css
/* styles.css 文件 */
.red-text {
  color: red;
}
```

**适用场景**: 所有正规项目。优点是可以复用、易于维护、浏览器会缓存。

### 3.3 CSS 如何找到 HTML?选择器的工作原理

新手最容易晕的地方是:"CSS 写的 `.card`、`#btn`、`p` 到底是怎么跟 HTML 对应上的?"

这就像老师在班级里点名,有三种点法:

**1. 喊"所有人"(标签选择器)**

```css
p {
  color: red;
}
```

喊"所有同学",全班同学都要站起来。这里所有 `<p>` 标签的元素都会变成红色。

**2. 喊"小组名"(类选择器 class)**

```css
.highlight {
  background: yellow;
}
```

喊"英语课代表",可能有几个同学都是。所有 `class="highlight"` 的元素背景都会变黄。

**3. 喊"学号"(ID 选择器)**

```css
#submit-btn {
  background: blue;
}
```

喊"2024001",全班只有一个。只有 `id="submit-btn"` 的元素会变蓝。

::: tip 💡 优先级:谁听谁的?

如果一个元素同时被多个选择器选中,怎么办?

```html
<p class="highlight" id="special-para">这段文字是什么颜色?</p>
```

```css
p {
  color: red;
} /* 优先级: 1 */
.highlight {
  color: yellow;
} /* 优先级: 10 */
#special-para {
  color: blue;
} /* 优先级: 100 */
```

**答案**: 蓝色。ID 选择器优先级最高,类选择器次之,标签选择器最低。

**内联样式**(写在 style 属性里)优先级是 1000,最高!
:::

### 3.4 CSS 的"三明治":盒模型

每个 HTML 元素在 CSS 中都被看作一个"盒子",由四层组成:

```
┌──────────────────────────────────┐
│         margin (外边距)           │  ← 盒子之间的距离
│   ┌─────────────────────────┐    │
│   │    border (边框)       │    │  ← 盒子的外壳
│   │  ┌───────────────────┐  │    │
│   │  │  padding (内边距) │  │    │  ← 内容到边框的距离
│   │  │  ┌─────────────┐  │  │    │
│   │  │  │   content    │  │  │    │  ← 实际内容(文字/图片)
│   │  │  └─────────────┘  │  │    │
│   │  └───────────────────┘  │    │
│   └─────────────────────────┘    │
└──────────────────────────────────┘
```

**总宽度计算**:

```css
width: 200px;
padding: 10px; /* 左右各 10px */
border: 5px; /* 左右各 5px */
margin: 20px; /* 左右各 20px */
```

**元素实际占据的宽度** = 20 + 5 + 10 + 200 + 10 + 5 + 20 = **270px**

::: warning ⚠️ 常见错误:宽度对不上

新手常问:"我设置了 `width: 200px`,为什么测量出来是 270px?"

因为你没有算上 padding、border、margin!

**解决方案**:

```css
.box {
  box-sizing: border-box; /* 让 width 包含 padding 和 border */
  width: 200px;
  padding: 10px;
  border: 5px;
}
```

这样,`width: 200px` 就是最终宽度,padding 和 border 会"挤"在里面。
:::

🎯 动手试试看：

下面这个演示让你调节 padding、border 和 margin,实时看到盒模型的变化和总宽度计算：

<CssBoxModel />

### 3.5 怎么知道有哪些 CSS 属性?

::: tip 🎯 AI 时代的学习方式

**以前**: 背 CSS 属性手册

**现在**: 告诉 AI 你要什么效果

例子:

- 你说"我要一个带阴影的蓝色圆角按钮"
- AI 会给出: `background: blue; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1)`

**为什么这是首选?** 因为 AI 不仅告诉你"属性名",还帮你把"值"都调好了。
:::

不过,你仍然需要了解一些**最常用的 CSS 属性分类**:

**文字相关**:

```css
color: red; /* 文字颜色 */
font-size: 16px; /* 字体大小 */
font-weight: bold; /* 字体粗细 */
text-align: center; /* 对齐方式 */
line-height: 1.5; /* 行高 */
```

**背景与边框**:

```css
background: blue; /* 简写,可设置颜色、图片等 */
border: 1px solid black; /* 1px 实线黑色边框 */
border-radius: 8px; /* 圆角 */
box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* 阴影 */
```

**布局相关**:

```css
display: flex; /* 弹性布局 */
justify-content: center; /* 主轴对齐 */
align-items: center; /* 交叉轴对齐 */
gap: 10px; /* 元素之间的间距 */
```

🎯 动手试试看：

下面这个演示展示了 Flexbox 布局的效果。你可以切换方向、对齐方式和换行，观察盒子如何排列：

<CssFlexbox />

**尺寸与间距**:

```css
width: 100px;
height: 100px;
padding: 10px; /* 内边距 */
margin: 20px; /* 外边距 */
```

### 3.6 现代 CSS 开发:Tailwind CSS 简介

::: tip 💡 这部分可选,了解即可

Tailwind 是一种"原子化 CSS"框架,最近几年非常流行。它的核心思想是:**不要写 CSS,直接在 HTML 里写"样式代号"**。

**传统写法**:

```html
<!-- HTML -->
<button class="btn-primary">点击</button>

<!-- CSS -->
<style>
  .btn-primary {
    background-color: #3b82f6;
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 0.25rem;
  }
</style>
```

**Tailwind 写法**:

```html
<button class="bg-blue-500 text-white px-4 py-2 rounded">点击</button>
```

**为什么这么火?**

1. **不用起名**: 最头疼的"这个类叫什么"环节没了
2. **不切文件**: 不用在 HTML 和 CSS 之间来回切换
3. **不怕删**: 删掉 HTML,样式自动就没了,不会留下堆积如山的无用 CSS

---

## 4. JavaScript: 网页的"大脑"

### 4.1 没有 JavaScript 会怎样?

只有 HTML + CSS 的网页,就像**商店橱窗里的模特**:

- ✅ 看起来很漂亮(CSS)
- ✅ 结构很清晰(HTML)
- ❌ 但你跟它说话,它不会回应
- ❌ 你按了按钮,什么也不会发生

**JavaScript** 让网页从"橱窗模特"变成"真人":

- ✅ 点击按钮,会弹出提示
- ✅ 输入文字,会实时检查格式
- ✅ 滚动页面,会加载更多内容
- ✅ 提交表单,会显示"正在提交..."

### 4.2 JavaScript 的核心能力

JavaScript 是一种**编程语言**,它让网页具备"逻辑"和"记忆"。

**能力一: 记住数据**(变量)

```javascript
let userName = '张三'
let isLoggedIn = true
let cartCount = 5
```

**能力二: 重复做事**(函数)

```javascript
// 定义一个函数
function sayHello(name) {
  return '你好, ' + name + '!'
}

// 调用函数
console.log(sayHello('张三')) // 输出: 你好, 张三!
```

**能力三: 响应事件**(事件监听)

```javascript
// 当按钮被点击时
button.addEventListener('click', function () {
  alert('按钮被点击了!')
})
```

**能力四: 修改页面**(DOM 操作)

```javascript
// 修改页面内容
document.getElementById('title').textContent = '新标题'

// 修改样式
document.getElementById('box').style.background = 'red'
```

### 4.3 ECMAScript 是什么?JavaScript 的版本

你可能听说过 **ECMAScript** 这个词。它和 JavaScript 是什么关系?

**简单来说: ECMAScript 是标准,JavaScript 是实现**。

打个比方:

- **ECMAScript** = "普通话标准规范",定义了语法规则
- **JavaScript** = "实际说的普通话",是浏览器真正运行的语言

**为什么会有两个名字?**

- 1995 年,网景公司创造了 JavaScript
- 1996 年,微软推出了 JScript(和 JavaScript 类似但不完全一样)
- 为了避免各浏览器"方言"不统一,1997 年 ECMA 国际组织制定了标准,命名为 ECMAScript

**版本演进**:

JavaScript 这门语言在不断"升级"。每年都会发布新版本:

| 版本           | 发布年份 | 重要特性                                               |
| -------------- | -------- | ------------------------------------------------------ |
| **ES5**        | 2009     | 严格模式、JSON、Array.map/filter/reduce                |
| **ES6/ES2015** | 2015     | `let/const`、箭头函数、`class`、**ES 模块**、`Promise` |
| **ES2020**     | 2020     | 可选链 `?.`、空值合并 `??`、`BigInt`                   |
| **ES2024**     | 2024     | `Object.groupBy()`、`Promise.withResolvers()`          |

::: tip 💡 实用建议

现代浏览器已经支持大部分 ES6+ 特性。如果你需要兼容老浏览器(如 IE),可以用 Babel 等工具把新语法"翻译"成老语法。

不过,现在很多项目已经不再支持 IE,所以你可以放心使用新语法。
:::

### 4.4 TypeScript:加上了"类型"的 JavaScript

你可能还听说过 **TypeScript (TS)**,它和 JavaScript 又是什么关系?

**一句话概括: TypeScript = JavaScript + 类型系统**。

| 对比项       | JavaScript                 | TypeScript                     |
| ------------ | -------------------------- | ------------------------------ |
| **类型系统** | 动态类型(运行时才知道类型) | 静态类型(写代码时就知道类型)   |
| **编译**     | 不需要编译,浏览器直接运行  | 需要编译成 JavaScript 才能运行 |
| **错误检查** | 运行时才发现错误           | 写代码时就能发现错误           |
| **学习曲线** | 入门简单                   | 需要学习类型语法               |
| **适用场景** | 小型项目、快速原型         | 大型项目、团队协作             |

**代码对比**:

```javascript
// JavaScript - 动态类型,变量可以随便变
let name = '张三'
name = 123 // 不报错,但可能出问题
```

```typescript
// TypeScript - 静态类型,类型写死了
let name: string = '张三'
name = 123 // 编译时报错: 不能把数字赋给字符串
```

::: tip 💡 为什么大型项目偏爱 TypeScript?

想象你在团队里开发一个复杂系统,代码几万行。JavaScript 的灵活性在这里变成了"灾难"——你不知道这个函数期望接收什么类型的参数,也不知道它返回什么。

TypeScript 强制你写清楚类型,就像给代码加了"说明书",IDE 也能给你更好的提示。
:::

---

## 5. 深入理解 DOM: 网页的"族谱"

你可能经常听到 **DOM (Document Object Model)** 这个词。别被这个专业术语吓到,它其实就是一张**网页的"族谱"**。

### 5.1 什么是 DOM 树?

浏览器读取 HTML 代码后,不会把它们当成一堆字符串,而是在内存里把它们画成一棵"树"。

```
Document (文档)
    ↓
<html>                    <!-- html 是祖先 -->
    ├─<head>              <!-- head 是 html 的孩子 -->
    │   └─<title>我的网页</title>
    └─<body>              <!-- body 是 html 的孩子 -->
        ├─<h1>欢迎</h1>
        └─<div class="card">   <!-- div 是 body 的孩子 -->
            ├─<img src="photo.jpg">
            └─<p>一段文字</p>
```

这棵树就叫 **DOM 树**。每个 HTML 标签都是这棵树上的一个"节点"。

### 5.2 为什么叫"对象模型"(Object Model)?

因为在 JavaScript 眼里,HTML 标签不仅仅是标签,而是**对象 (Object)**。它们有**属性**(可以读/写的数据)和**方法**(可以执行的动作)。

**属性 (Property)**: 节点的"数据"

```javascript
imgElement.src = 'photo.jpg' // 修改图片地址
divElement.className = 'box' // 修改类名
inputElement.value = '123' // 修改输入框的值
```

**方法 (Method)**: 节点的"动作"

```javascript
buttonElement.click() // 模拟点击
divElement.remove() // 删除元素
bodyElement.appendChild(newDiv) // 添加子元素
```

### 5.3 怎么找节点?(DOM 查询)

就像在族谱里找人一样,JavaScript 提供了很多方法:

**按"身份证"找**(ID):

```javascript
const element = document.getElementById('header')
// 全局唯一,速度最快
```

**按"特征"找**(选择器):

```javascript
// 找到第一个匹配的元素
const element = document.querySelector('.card h2')

// 找到所有匹配的元素
const elements = document.querySelectorAll('button')
```

**按"关系"找**:

```javascript
element.parentNode // 找爸爸
element.children // 找孩子
element.nextElementSibling // 找下一个兄弟
```

### 5.4 性能警告:不要频繁"拆家"

操作 DOM 是很**贵**的。每次你修改 DOM(比如改大小、改位置),浏览器都要:

1. **重新计算排版** (Reflow)
2. **重新绘制** (Repaint)

这两个操作都很耗时。

::: warning ⚠️ 低效操作

```javascript
// ❌ 低效:循环 1000 次,每次都操作 DOM
for (let i = 0; i < 1000; i++) {
  document.body.appendChild(createDiv())
}
```

**为什么会慢?** 每次appendChild,浏览器都要重新计算整页布局,1000 次就是 1000 次重排!

:::

::: tip ✅ 高效操作

```javascript
// ✅ 高效:先拼好,一次性插入
const fragment = document.createDocumentFragment()
for (let i = 0; i < 1000; i++) {
  fragment.appendChild(createDiv())
}
document.body.appendChild(fragment) // 只触发一次重排
```

这也正是 **Vue / React** 等现代框架诞生的原因: 它们在内存里玩"虚拟 DOM",计算好最小修改量,最后才去动真正的 DOM,从而保护了性能。
:::

🎯 动手试试看：

下面这个演示展示了 DOM 操作的基本方法。你可以修改标题文字、切换高亮样式，并看到对应的 JavaScript 代码：

<DomManipulator />

---

## 6. 三剑客如何协作?

### 6.1 分工对比表

| 角色           | 负责什么         | 不做什么        | 典型示例                           |
| -------------- | ---------------- | --------------- | ---------------------------------- |
| **HTML**       | 定义结构与语义   | 不负责样式/交互 | `<section><h1>标题</h1></section>` |
| **CSS**        | 定义表现与布局   | 不存放业务逻辑  | `.card { border-radius: 8px; }`    |
| **JavaScript** | 定义行为与数据流 | 不承担视觉表现  | `button.onclick = changeTitle`     |

### 6.2 一个完整的例子:点击改变标题

```html
<!DOCTYPE html>
<html>
  <head>
    <!-- CSS 部分 -->
    <style>
      .card {
        border: 1px solid var(--vp-c-divider);
        padding: 20px;
        border-radius: 8px;
        background: var(--vp-c-bg-soft);
      }

      .btn {
        background: var(--vp-c-brand);
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: 4px;
        cursor: pointer;
      }

      .btn:hover {
        opacity: 0.9;
      }
    </style>
  </head>
  <body>
    <!-- HTML 部分 -->
    <div class="card">
      <h1 id="title">欢迎</h1>
      <p>点击按钮改变标题!</p>
      <button class="btn" onclick="changeTitle()">点击我</button>
    </div>

    <!-- JavaScript 部分 -->
    <script>
      function changeTitle() {
        // 找到元素
        const titleElement = document.getElementById('title')

        // 修改内容
        titleElement.textContent = '已点击!'

        // 弹出提示
        alert('标题已改变')
      }
    </script>
  </body>
</html>
```

**这个例子展示了三者的协作**:

1. **HTML** 定义了页面结构: 卡片、标题、按钮
2. **CSS** 让页面变好看: 边框、圆角、颜色
3. **JavaScript** 让页面变活: 点击后改变标题

---

## 7. 学习路线图

### 7.1 4 周入门节奏

**第 1 周: HTML 结构**

- 常用标签(div、span、p、h1-h6、a、img)
- 语义化标签(header、nav、main、footer)
- 表单元素(input、button、form)

**第 2 周: CSS 造型**

- 盒模型、选择器
- Flexbox 布局
- 颜色、字体、间距

**第 3 周: JavaScript 互动**

- 变量、函数、事件
- DOM 操作
- ES6+ 新语法

**第 4 周: 整合小项目**

- 做一个带样式和交互的单页
- 练习部署(后续章节会讲)

### 7.2 进阶方向

**HTML 进阶**:

- 语义化布局
- 可访问性 (ARIA)
- SEO 优化

**CSS 进阶**:

- Grid 布局
- 响应式设计
- CSS 动画与变量

**JavaScript 进阶**:

- ES6+ 语法
- 异步编程 (Promise/async)
- 前端框架 (Vue/React)

---

## 8. 名词速查表 (Glossary)

| 名词           | 英文                      | 用人话解释                                      |
| -------------- | ------------------------- | ----------------------------------------------- |
| **HTML**       | HyperText Markup Language | 超文本标记语言。用标签描述网页结构与语义。      |
| **CSS**        | Cascading Style Sheets    | 层叠样式表。控制颜色、布局、动画的样式语言。    |
| **JavaScript** | JavaScript                | 网页的肌肉,负责交互和逻辑。                     |
| **ECMAScript** | ECMAScript                | JavaScript 的语言标准规范,定义语法规则。        |
| **ES 模块**    | ES Modules                | ECMAScript 的官方模块化方案(import/export)。    |
| **TypeScript** | TypeScript                | JavaScript 的超集,增加了静态类型系统。          |
| **DOM**        | Document Object Model     | 文档对象模型。用对象树表示页面,可被 JS 读写。   |
| **Flexbox**    | Flexible Box Layout       | 一种一维布局方案,易于对齐与分布。               |
| **盒模型**     | CSS Box Model             | 元素从内容到外边距的层层盒子。                  |
| **语义化**     | Semantic HTML             | 使用有含义的标签(如 header)而不是无含义的 div。 |
| **响应式**     | Responsive Design         | 页面自动适配不同屏幕尺寸的设计。                |

---

## 总结

现在你已经知道:**HTML 定义骨架,CSS 负责颜值,JavaScript 赋予灵魂**。

这三者是 Web 开发的基石。理解了它们,你就能:

- 看懂任何网页的源代码(右键 → "查看网页源代码")
- 修改别人的网页(浏览器 DevTools → Elements)
- 开始学习前端框架(Vue/React),它们都是基于这三者的

**下一步建议**:

- 如果你想快速做出网页,可以学习 **Vue** 或 **React** 框架
- 如果你想深入理解 CSS,可以学习 **Flexbox** 和 **Grid** 布局
- 如果你想提升代码质量,可以学习 **TypeScript**

祝你学习愉快!
