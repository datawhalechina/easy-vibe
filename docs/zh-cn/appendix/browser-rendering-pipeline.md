# 浏览器渲染管线与事件循环可视化

> 💡 **学习指南**：浏览器是你最亲密的"同事"，但你真的了解它是怎么干活的吗？本文将带你深入浏览器的"车间"，看看它是如何把一堆HTML、CSS、JavaScript变成你眼前的像素画的。本章节会围绕一个问题展开：**为什么有些网页流畅如丝，有些却卡成PPT？**

在开始之前，建议你先补两块"基础砖"：

- **DOM是什么**：可以先阅读 [Web开发基础](./web-basics/) 的相关内容。
- **JavaScript异步基础**：如果你对Promise、async/await还不熟悉，可以先了解相关概念。

---

## 0. 引言：为什么我的网页卡成PPT？

<RenderingPipelineDemo />

很多人在实际开发中都会遇到类似的情况：

- 页面刚加载时，图片一张一张蹦出来，布局"跳"来"跳"去；
- 滚动页面时，明明很简单的一个动画，却卡得让人想摔鼠标；
- 用户点了按钮，半天没反应，然后突然"嗖"一下全出来了。

直觉上，我们会以为是：**"我的代码写得太烂"**。

但大多数时候，问题并不在于你"不会写"，而在于你**没有理解浏览器的"工作习惯"**。

浏览器就像一位经验丰富的厨师，它有一套固定的"做菜流程"（渲染管线）。如果你不了解这套流程，就可能在一顿操作猛如虎之后，把原本简单的菜（网页）做得一团糟。

<DomToRenderTreeDemo />

面对这些性能挑战，单纯依靠"少写点代码"已经捉襟见肘。我们需要一套更系统的理解方法，来在浏览器的"规则"内，让我们的网页飞起来。这正是本文试图解决的问题。

---

## 1. 什么是"渲染管线"？（定义 + 场景）

先给一个简短的工作定义，再看几个典型场景。

> **渲染管线（Rendering Pipeline）**，是浏览器将HTML、CSS、JavaScript转换为屏幕上像素的一系列处理步骤的总称，它决定了网页的显示方式和性能表现。

你可以简单地把它理解成五个主要阶段：**构建DOM树** → **构建CSSOM树** → **构建渲染树** → **布局（Layout）** → **绘制（Paint）** → **合成（Composite）**。

常见会遇到性能问题的场景包括：

- 大量DOM节点的动态增删改
- 频繁的样式计算和布局更新
- 复杂的CSS动画和过渡效果
- 图片和视频等资源加载

接下来，我们就从一个真实团队的"血泪教训"出发，看看他们是怎么一点点从"页面卡得要死"进化到"丝般顺滑"的。

---

## 2. 从"血泪教训"说起：某电商大促页面优化实录

本章案例来自 **某头部电商平台的详情页团队**。

与普通页面不同，电商详情页需要展示海量信息（商品图片、SKU选择、价格计算、评价、推荐等），动辄上千个DOM节点。

这带来了核心矛盾：
- **如果全量渲染**：首屏加载慢，用户等得想骂人；
- **如果分片渲染**：滚动时布局"跳"动，体验极差。

该团队经历过多次架构重构，才明白一个道理：**性能不能只靠"少写点"，而要靠"理解渲染管线"。**

### 2.1 三次重构教会我们什么？

该团队的前端负责人分享过他们的"踩坑史"：

| 阶段 | 遇到的问题 | 当时的想法 | 结果 |
| :--- | :--- | :--- | :--- |
| **第一次** | 页面滚动卡成PPT | "少渲染点内容就好了" | 图片懒加载后，滚动时布局跳动，更卡 |
| **第二次** | 价格计算时页面"假死" | "把计算放到setTimeout里" | 异步后UI更新延迟，用户觉得"没反应" |
| **第三次** | 复杂的SKU选择器渲染慢 | "用Canvas替换DOM" | 过度优化，维护成本爆炸 |

**核心领悟**：**不是优化越多越好，而是优化越"对位"越好**。

### 2.2 渲染管线的"脾气"到底像什么？

**传统瀑布流开发** = **自助餐**：
- 拿什么都往盘子里装：功能越多，DOM越多；
- 吃完才走：页面完全加载前用户只能等；
- 一次性账单：所有成本在页面打开时集中爆发。

**理解渲染管线后的优化** = **精致法餐**：
- 分道上菜：首屏关键内容优先渲染，其余延后；
- 边吃边做：根据用户滚动动态准备后续"菜品"；
- 精细计费：只在必要时触发昂贵的重排和重绘。

**该团队的经验**：**了解浏览器的"口味"，才能做出让它"吃得香"的网页**。

<LayoutReflowDemo />

---

## 3. 第一阶段：构建DOM树和CSSOM树

### 3.1 为什么浏览器要"树"化？

想象你收到一叠杂乱的发票（HTML代码），需要整理成一本清晰的账本（DOM树）。

浏览器做的工作包括：
- **词法分析**：把HTML字符串拆成Token（标签、属性、文本等）；
- **语法分析**：根据HTML规则，把Token组装成节点；
- **树构建**：根据节点间的父子关系，构建出树形结构。

```html
<!-- 原始HTML -->
<html>
  <body>
    <div class="container">
      <p>Hello World</p>
    </div>
  </body>
</html>
```

```
<!-- DOM树结构 -->
Document
└── html
    └── body
        └── div.container
            └── p
                └── "Hello World"
```

**CSSOM树**的构建过程类似，只是处理的是CSS规则：

```css
/* 原始CSS */
.container { width: 100%; }
.container p { color: red; }
```

```
/* CSSOM树结构 -->
StyleSheet
├── .container
│   ├── width: 100%
│   └── p
│       └── color: red
```

### 3.2 遇到的坑：DOM树为什么有时候"歪"了？

**坑1：HTML标签没闭合**

```html
<!-- 错误的HTML -->
<div>
  <p>这是一段文字
</div>

<!-- 浏览器自动修复后 -->
<div>
  <p>这是一段文字</p>
</div>
```

浏览器很"宽容"，会尝试自动修复不完整的标签。但这种宽容是以性能为代价的——浏览器需要额外计算来猜测你的意图。

**坑2：CSS选择器权重冲突**

```css
/* 你以为的优先级 */
#header { color: red; }      /* id选择器，权重100 */
.title { color: blue; }     /* class选择器，权重10 */

/* 实际计算 */
<div id="header" class="title">   /* 最终颜色：red，因为100 > 10 */
```

浏览器构建CSSOM时需要计算每个元素的最终样式，复杂的选择器会增加计算量。

<PaintLayerDemo />

---

## 4. 第二阶段：构建渲染树（Render Tree）

### 4.1 为什么需要"渲染树"？

DOM树和CSSOM树构建完成后，浏览器需要把它们"合并"成一棵新的树——**渲染树（Render Tree）**。

为什么要多此一举？因为：
- **DOM树包含了所有节点**，包括那些不可见的（如`<head>`、`<script>`、`display:none`的元素）；
- **渲染树只包含可见节点**，它是实际需要绘制到屏幕上的内容的集合。

```
DOM树                          CSSOM树
  │                              │
  ▼                              ▼
┌─────────┐                  ┌──────────┐
│  html   │                  │  body    │
│   │     │                  │   │      │
│  body   │                  │   ├── width: 100%
│   │     │                  │   └── div
│  div    │                  │       ├── color: red
│   │     │                  │       └── display: none
│  span   │                  └──────────┘
│ (隐藏)  │
└─────────┘
           │
           ▼
      合并计算
           │
           ▼
    ┌─────────────┐
    │  渲染树      │
    │             │
    │  body       │
    │   │         │
    │  div        │ ← span被排除，因为CSS指定了display:none
    │ (最终样式)   │
    └─────────────┘
```

### 4.2 渲染树的构建规则

浏览器在构建渲染树时，会遵循以下规则：

| 场景 | 处理方式 | 示例 |
|------|---------|------|
| `display: none` | **完全排除**出渲染树 | 元素及其所有子元素都不可见 |
| `visibility: hidden` | **包含在渲染树中**，但标记为不可见 | 占据空间，但完全透明 |
| `opacity: 0` | **包含在渲染树中**，但完全透明 | 可交互，但看不见 |
| 不在视口内 | **包含在渲染树中**，暂不绘制 | 滚动到视口时才绘制 |

### 4.3 踩坑实录：为什么设置了display:none，页面还是卡？

**坑：以为display:none的元素"不存在"**

```javascript
// 你以为的优化：先隐藏，修改完再显示
const container = document.getElementById('list')
container.style.display = 'none'  // "这步应该很快吧？"

// 疯狂操作DOM
for (let i = 0; i < 1000; i++) {
  const item = document.createElement('div')
  item.textContent = `Item ${i}`
  item.style.width = `${Math.random() * 100}px`  // 改变宽度！
  container.appendChild(item)
}

container.style.display = 'block'  // "这下应该一次渲染了吧？"
```

**残酷的现实**：

即使设置了`display:none`，当你修改元素的样式（尤其是影响布局的属性如`width`、`height`、`margin`等）时，浏览器仍然需要：

1. **重新计算样式**（Recalculate Style）：计算每个元素匹配哪些CSS规则；
2. **构建/更新渲染树**（Update Render Tree）：因为`display:none`的元素虽然不在渲染树中，但它们的子元素可能会被JavaScript引用并修改；
3. **标记需要重排的节点**：即使父节点`display:none`，浏览器也需要跟踪这些变化，以便在显示时正确渲染。

**正确的优化姿势**：

```javascript
// 真正的优化：使用DocumentFragment批量操作
const container = document.getElementById('list')
const fragment = document.createDocumentFragment()  // 创建一个"虚拟容器"

// 所有操作都在内存中的fragment上进行，不影响真实DOM
for (let i = 0; i < 1000; i++) {
  const item = document.createElement('div')
  item.textContent = `Item ${i}`
  item.style.width = `${Math.random() * 100}px`
  fragment.appendChild(item)  // 操作的是fragment，不是真实DOM！
}

// 一次性把fragment的内容插入真实DOM，只触发一次重排和重绘
container.appendChild(fragment)
```

<CompositeDemo />

---

## 5. 第三阶段：布局（Layout）与重排（Reflow）

### 5.1 为什么浏览器要"算"布局？

渲染树构建完成后，浏览器知道了页面上有哪些可见元素，以及它们的样式。但还不知道它们**具体在什么位置、占多大空间**。

这就像你拿到了家具的清单（渲染树），知道要买哪些家具、什么颜色，但还没设计家具的摆放位置。布局阶段就是做这件事的。

浏览器会：
1. **从渲染树的根节点开始遍历**；
2. **计算每个节点的几何信息**：宽度、高度、位置（x, y坐标）；
3. **处理嵌套关系**：父节点的尺寸会影响子节点，子节点的尺寸也可能影响父节点（视布局方式而定）。

### 5.2 重排（Reflow）的"脾气"

布局计算很"贵"，因为它通常是**同步**的、**阻塞**的。也就是说，当你通过JavaScript修改了一个影响布局的属性，浏览器必须：

1. **立即停止当前的所有工作**；
2. **重新计算样式**（可能涉及复杂的CSS选择器匹配）；
3. **重新构建/更新渲染树**；
4. **重新执行布局计算**（从根节点开始，可能涉及成千上万节点的几何计算）；
5. **完成后才能继续执行你的JavaScript代码**。

这就是**重排（Reflow）**，也称为**回流**或**重新布局（Relayout）**。

### 5.3 触发重排的"雷区"

以下是常见的会触发重排的属性和操作，建议**背诵并收藏**：

| 类别 | 属性/操作 | 说明 |
|------|----------|------|
| **尺寸** | `width`, `height`, `min/max-width/height` | 改变元素的宽高会触发重排 |
| **位置** | `top`, `right`, `bottom`, `left` | 定位元素的位置变化会触发重排 |
| **边距** | `margin`, `padding` | 内外边距的改变会触发重排 |
| **边框** | `border-width`, `border-style`（某些情况） | 边框改变可能影响布局 |
| **内容** | 文字内容变化、图片加载 | 内容改变可能导致尺寸变化 |
| **字体** | `font-size`, `font-weight`, `line-height` | 字体变化影响文本布局 |
| **显示** | `display`（值改变时） | `none`↔`block`等切换会触发重排 |
| **布局模式** | `position`（值改变时） | `static`↔`absolute`等切换会触发重排 |
| **查询** | `offsetWidth`, `offsetHeight`, `offsetTop`等 | **读取**这些值会强制浏览器立即执行重排！|

**重点注意最后一项**：读取布局属性会**强制同步布局（Forced Synchronous Layout）**，这是性能杀手中的战斗机！

### 5.4 踩坑实录：为什么我的"优化"反而更卡？

**坑：强制同步布局的"死亡循环"**

```javascript
// 你想做的：给所有卡片设置相同高度
const cards = document.querySelectorAll('.card')

// 你觉得这样很"聪明"：先获取最高卡片的高度
let maxHeight = 0
for (let i = 0; i < cards.length; i++) {
  const height = cards[i].offsetHeight  // 触发强制同步布局！
  maxHeight = Math.max(maxHeight, height)
}

// 然后统一设置
for (let i = 0; i < cards.length; i++) {
  cards[i].style.height = maxHeight + 'px'  // 再次触发重排！
}
```

**问题分析**：

这段代码触发了**两次强制同步布局**：

1. **读取`offsetHeight`时**：浏览器为了确保返回的是最新的高度值，必须立即执行一次完整的布局计算（重排）。如果有100个卡片，这个动作会执行100次！

2. **设置`height`时**：这又触发了新一轮的重排。

更糟糕的是，如果在读取和设置之间还有其他DOM操作，浏览器可能不得不进行**布局抖动（Layout Thrashing）**——反复地读取→重排→写入→重排→读取...形成恶性循环。

**正确的优化姿势**：

```javascript
const cards = document.querySelectorAll('.card')

// 第一步：批量读取（先全部读完）
const heights = []
for (let i = 0; i < cards.length; i++) {
  heights.push(cards[i].offsetHeight)  // 读取操作集中在一起
}

// 计算最大值
const maxHeight = Math.max(...heights)

// 第二步：批量写入（再全部写）
// 使用 requestAnimationFrame 确保在下一次重绘前执行
requestAnimationFrame(() => {
  for (let i = 0; i < cards.length; i++) {
    cards[i].style.height = maxHeight + 'px'
  }
})
```

**优化原理**：

1. **读写分离**：先集中完成所有读取操作（获取offsetHeight），再集中完成所有写入操作（设置height）。这样浏览器可以在读取阶段一次性完成布局计算，而不是每读一个就重排一次。

2. **requestAnimationFrame**：将写入操作放在下一次重绘之前执行。这样可以确保：
   - 批量处理DOM修改，减少重排次数；
   - 与浏览器的渲染周期同步，避免不必要的计算。

<EventLoopDemo />

---

## 6. 第四阶段：绘制（Paint）与合成（Composite）

### 6.1 从"设计图"到"真墙壁"：绘制阶段

布局完成后，浏览器已经知道了每个元素的位置和大小，就像装修师傅已经量好了尺寸、画好了线。接下来就是"刷墙"——把元素的样式真正"画"出来。

绘制阶段，浏览器会：
1. **遍历渲染树**，为每个可见节点创建绘制记录（Paint Record）；
2. **调用图形API**，将元素的背景、边框、文字、阴影等绘制到内存中的位图（Bitmap）上；
3. **分层绘制**，不同的元素可能绘制到不同的"层"（Layer）上，方便后续处理。

### 6.2 触发重绘（Repaint）的"信号"

与重排不同，重绘只涉及"外观"的改变，不涉及"几何"的改变。以下属性会触发重绘：

| 类别 | 属性 | 说明 |
|------|------|------|
| **颜色** | `color`, `background-color` | 文字和背景颜色变化 |
| **背景** | `background-image`, `background-position` | 背景图片和位置 |
| **边框样式** | `border-color`, `border-style`（颜色部分） | 边框外观变化 |
| **文字** | `text-decoration`, `text-shadow` | 文字装饰和阴影 |
| **盒阴影** | `box-shadow` | 元素阴影 |
| **可见性** | `visibility`（非`none`值之间切换） | 元素可见性变化 |
| **圆角** | `border-radius` | 圆角大小 |
| **透明度** | `opacity` | 元素透明度 |

**注意**：`opacity`和`transform`是两个特殊的属性，它们不会触发重绘，而是直接触发**合成**阶段！这是它们性能优异的原因。

### 6.3 合成（Composite）：GPU的"魔法"

传统的前三个阶段（构建渲染树、布局、绘制）都是在**CPU**上执行的。而**合成（Composite）**阶段，是现代浏览器引入的一项重要优化——它把页面的不同部分分成多个**层（Layer）**，然后利用**GPU（图形处理器）**来并行合成最终的画面。

你可以这样理解：
- **传统方式**：画家一笔一笔在画布上画完整个画面（CPU串行执行）；
- **合成方式**：把画面分成多层（背景层、人物层、前景层），分别画好，然后用相机一次性拍在一起（GPU并行合成）。

### 6.4 哪些因素会创建新的合成层？

浏览器会自动将某些元素提升到独立的合成层。以下是常见的触发条件：

| 触发条件 | CSS属性/值 | 说明 |
|---------|-----------|------|
| **3D变换** | `transform: translate3d()`, `rotate3d()`, `scale3d()` | 任何3D变换都会创建合成层 |
| **硬件加速的2D变换** | `transform: translateZ(0)` | 俗称"GPU hack"，强制创建层 |
| **透明度动画** | `opacity`变化（配合动画） | 避免重绘，直接合成 |
| **固定定位** | `position: fixed` | 避免滚动时重复布局 |
| **Will-Change** | `will-change: transform, opacity` | 显式提示浏览器提前创建层 |
| **Canvas/WebGL** | `<canvas>`, WebGL内容 | 天然在独立层中 |
| **Video/iframe** | `<video>`, `<iframe>` | 独立层，防止相互影响 |
| **Backface-Visibility** | `backface-visibility: hidden` | 3D相关，创建层 |
| **CSS滤镜** | `filter`（某些浏览器） | 可能创建层 |
| **Mask/Clip** | `clip-path`, `mask`（某些浏览器） | 可能创建层 |

### 6.5 踩坑实录：合成层太多反而卡？

**坑：滥用`translateZ(0)`导致GPU内存爆炸**

```css
/* 你以为的优化：给所有动画元素都开启GPU加速 */
.card { transform: translateZ(0); }
.button { transform: translateZ(0); }
.icon { transform: translateZ(0); }
/* ... 100个元素都加 ... */
```

**问题分析**：

每个合成层都需要GPU内存来存储：
- **层的内容**：像素数据（位图），大小取决于元素的尺寸；
- **层的元数据**：位置、变换矩阵、透明度等信息。

如果一个页面的合成层太多，会导致：
1. **GPU内存占用过高**：低端设备（尤其是手机）可能会崩溃或降级到CPU渲染；
2. **合成阶段耗时增加**：层越多，GPU需要处理的纹理越多，合成时间线性增长；
3. **额外的内存带宽消耗**：每一层都需要从CPU传输到GPU。

**正确的优化姿势**：

```css
/* 策略1：只给真正需要动画的元素开启GPU加速 */
.card {
  /* 默认不使用GPU加速 */
  transition: transform 0.3s ease;
}

.card:hover {
  /* 只在需要动画时临时开启，动画结束后可移除 */
  transform: translateY(-5px);
  will-change: transform;  /* 或者使用will-change */
}

/* 策略2：使用CSS containment减少影响范围 */
.card {
  contain: layout style paint;  /* 告诉浏览器这个元素是"独立"的 */
}

/* 策略3：对于复杂列表，使用虚拟滚动 */
/* 只渲染视口内的元素，DOM节点数量固定 */
```

**优化原理**：

1. **精准使用GPU加速**：只在真正需要动画的元素上使用`transform`或`will-change`，避免"一刀切"地给所有元素加`translateZ(0)`。

2. **CSS Containment**：`contain`属性告诉浏览器"这个元素的变化不会影响外部"，浏览器可以据此进行优化，比如：
   - `contain: layout`：元素的布局变化不影响外部；
   - `contain: paint`：元素的绘制不会溢出边界；
   - `contain: style`：CSS计数器等不会影响外部。

3. **虚拟滚动**：对于长列表，与其让所有元素都参与渲染管线的各个阶段，不如只渲染视口内的元素。这样无论列表多长，DOM节点数量都是固定的。

<MacroMicroTaskDemo />

---

## 7. 第五阶段：事件循环与JavaScript执行机制

### 7.1 为什么JavaScript需要"事件循环"？

前面的四个阶段（DOM/CSSOM构建、渲染树构建、布局、绘制、合成）都是浏览器的工作。但网页不是静态的图片，它需要响应用户的点击、输入、滚动，需要动态更新内容。这些动态行为的指挥官，就是**JavaScript**。

但JavaScript有一个"先天缺陷"：**它是单线程的**。这意味着它同一时间只能做一件事。如果JavaScript在执行一个耗时任务（比如计算100万以内的所有质数），那么这段时间里，它就不能响应用户的点击，不能更新页面，整个浏览器就会"假死"。

这显然是不可接受的。为了解决这个问题，浏览器为JavaScript设计了一套"分身术"：**事件循环（Event Loop）**。

### 7.2 事件循环的核心组件

你可以把事件循环想象成一个快递分拣中心，有几个核心"工种"在协同工作：

| 组件 | 类比 | 作用 |
|------|------|------|
| **Call Stack（调用栈）** | 当前正在处理的快递 | 记录当前正在执行的JavaScript代码。当一个函数被调用，它就被"压入"栈顶；执行完就"弹出"。 |
| **Web APIs** | 外部合作仓库 | 浏览器提供的"外挂"功能，比如`setTimeout`、DOM事件、AJAX请求。这些操作不会阻塞调用栈，完成后会把回调放入任务队列。 |
| **Callback Queue（回调队列）** | 待处理的快递架 | 存放那些已经"准备好"执行，但还在等待调用栈清空的回调函数。 |
| **Event Loop（事件循环）** | 分拣机器人 | 不断检查调用栈是否为空。如果为空，就把回调队列中的第一个任务推入调用栈执行。 |

<EventLoopDemo />

### 7.3 宏任务（Macro Task）与微任务（Micro Task）

早期的JavaScript只有一套任务队列（就是上面的回调队列）。但随着异步编程越来越复杂，浏览器引入了两类任务：**宏任务（Macro Task）**和**微任务（Micro Task）**。

| 类型 | 常见来源 | 优先级 | 执行时机 |
|------|---------|--------|---------|
| **宏任务** | `setTimeout`/`setInterval`、I/O操作、UI渲染、`<script>`标签 | 低 | 每个事件循环周期执行一个 |
| **微任务** | `Promise.then/catch/finally`、`MutationObserver`、`queueMicrotask` | 高 | 当前宏任务结束后，下一个宏任务开始前，清空所有微任务 |

**执行顺序的"口诀"**：

```
1. 执行当前宏任务（比如<script>整体、setTimeout回调）
2. 执行过程中产生的所有微任务（Promise.then等）
   ↳ 微任务可以产生新的微任务，全部清空后才继续
3. 如果有需要，进行UI渲染（重排/重绘）
4. 开启下一轮事件循环，执行下一个宏任务
```

**关键理解**：

微任务的设计目的是让异步操作尽可能快地执行，但又不会阻塞当前正在执行的同步代码。它比宏任务"更急"，因为宏任务之间可能要等待很长时间（比如`setTimeout`的延迟），而微任务保证在当前操作"告一段落"后立即执行。

<MacroMicroTaskDemo />

### 7.4 踩坑实录：Promise比setTimeout快？

**坑：以为setTimeout(fn, 0)会"立即"执行**

```javascript
console.log('1. Start')

setTimeout(() => {
  console.log('2. setTimeout callback')
}, 0)

Promise.resolve().then(() => {
  console.log('3. Promise.then')
})

console.log('4. End')

// 你以为的输出顺序：
// 1. Start
// 4. End
// 2. setTimeout callback  ← setTimeout(0)不是立即吗？
// 3. Promise.then

// 实际的输出顺序：
// 1. Start
// 4. End
// 3. Promise.then         ← Promise.then比setTimeout先执行！
// 2. setTimeout callback
```

**问题分析**：

1. **`setTimeout(fn, 0)`的真正含义**：不是"0毫秒后立即执行"，而是"**至少**等待0毫秒后，将回调加入宏任务队列"。实际上，由于事件循环的工作机制，它通常需要等待当前调用栈清空、微任务队列清空、可能的UI渲染完成后，才能执行。

2. **Promise.then的本质**：`Promise.then`注册的是微任务。根据事件循环的规则，**微任务在当前宏任务结束后立即执行，优先级高于下一个宏任务**。

3. **执行流程图解**：

```
调用栈（Call Stack）          宏任务队列（Macrotask Queue）    微任务队列（Microtask Queue）
                              [setTimeout callback]           [Promise.then callback]

1. console.log('1. Start')
   → 输出: 1. Start

2. setTimeout(fn, 0)
   → 将回调加入宏任务队列      ← [setTimeout callback]

3. Promise.resolve().then()
   → 将回调加入微任务队列                                     ← [Promise.then callback]

4. console.log('4. End')
   → 输出: 4. End

5. 调用栈清空，检查微任务队列
   → 发现Promise.then回调
   → 执行: console.log('3. Promise.then')
   → 输出: 3. Promise.then

6. 微任务队列清空
   → 可能需要UI渲染（如果有变化）

7. 检查宏任务队列
   → 发现setTimeout回调
   → 执行: console.log('2. setTimeout callback')
   → 输出: 2. setTimeout callback
```

**正确的认知**：

1. **微任务比宏任务"更急"**：如果你希望某个操作在当前代码块"结束后、但UI更新前"尽快执行，用`Promise.then`或`queueMicrotask`。

2. **setTimeout(0)不保证立即执行**：它至少会被延迟到当前调用栈清空、微任务队列清空之后。如果需要"尽快但不必立即"，或者需要兼容旧浏览器，可以用它。

3. **requestAnimationFrame的特殊性**：`requestAnimationFrame`（rAF）也是一种宏任务，但它与渲染周期紧密绑定，通常会在下一次重绘前执行。如果你需要在"下一次UI更新前"做一些计算或准备，rAF是更好的选择。

<RenderingPerformanceDemo />

---

## 8. 性能优化实战：让你的网页"飞"起来

### 8.1 黄金法则：避免强制同步布局

我们已经知道，读取布局属性（如`offsetWidth`、`clientHeight`等）会强制浏览器立即执行布局计算。最坏的情况是**交替进行读取和写入**：

```javascript
// ❌ 极坏：读写交替，导致布局抖动（Layout Thrashing）
for (let i = 0; i < elements.length; i++) {
  const height = elements[i].offsetHeight  // 读取 → 强制布局
  elements[i].style.height = (height * 2) + 'px'  // 写入 → 标记需要重排
  // 下一次循环的读取又会强制布局...恶性循环！
}
```

**优化方案：批量读写分离**

```javascript
// ✅ 极好：先全部读取，再全部写入
// 第一步：批量读取
const heights = []
for (let i = 0; i < elements.length; i++) {
  heights.push(elements[i].offsetHeight)
}

// 第二步：批量写入
for (let i = 0; i < elements.length; i++) {
  elements[i].style.height = (heights[i] * 2) + 'px'
}
// 只需要两次布局计算（读取时一次，实际修改后一次）
```

### 8.2 使用transform和opacity做动画

前面多次提到，`transform`和`opacity`是性能最好的动画属性，因为它们：**不触发重排、不触发重绘，直接触发合成阶段**！

```css
/* ❌ 坏的动画属性（触发重排） */
.box {
  transition: width 0.3s, height 0.3s, left 0.3s, top 0.3s;
}

/* ✅ 好的动画属性（仅触发合成） */
.box {
  transition: transform 0.3s, opacity 0.3s;
}
.box:hover {
  transform: translateX(100px) scale(1.2);  /* 移动+缩放 */
  opacity: 0.8;
}
```

**实用技巧：用transform模拟其他属性变化**

```css
/* 模拟从width: 0到width: auto的展开效果 */
.accordion {
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.3s;
}
.accordion.open {
  transform: scaleX(1);
}

/* 模拟margin-top的移动 */
.slider {
  transform: translateY(0);
  transition: transform 0.3s;
}
.slider.down {
  transform: translateY(100px);  /* 替代 margin-top: 100px */
}
```

### 8.3 虚拟滚动：解决大数据列表

当列表项数量达到数千甚至上万时，无论你怎么优化，DOM节点的数量本身就是一个性能瓶颈。这时，**虚拟滚动（Virtual Scrolling）**是终极解决方案。

**核心思想**：只渲染视口内可见的列表项（加上少量缓冲），DOM节点数量固定，与数据总量无关。

```vue
<template>
  <div class="virtual-list-container" ref="container" @scroll="handleScroll">
    <!-- 占位元素，用于撑起滚动条 -->
    <div class="phantom" :style="{ height: totalHeight + 'px' }"></div>

    <!-- 实际渲染的列表项 -->
    <div class="content" :style="{ transform: `translateY(${offsetY}px)` }">
      <div
        v-for="item in visibleItems"
        :key="item.id"
        class="list-item"
        :style="{ height: itemHeight + 'px' }"
      >
        {{ item.name }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  items: Array,        // 所有数据
  itemHeight: { type: Number, default: 50 }  // 每项高度
})

const container = ref(null)
const scrollTop = ref(0)

// 可视区域能显示多少项
const visibleCount = computed(() => {
  if (!container.value) return 10
  return Math.ceil(container.value.clientHeight / props.itemHeight)
})

// 缓冲数量（上下各多渲染几项，避免快速滚动时白屏）
const buffer = 5

// 起始索引
const startIndex = computed(() => {
  return Math.max(0, Math.floor(scrollTop.value / props.itemHeight) - buffer)
})

// 结束索引
const endIndex = computed(() => {
  return Math.min(
    props.items.length,
    startIndex.value + visibleCount.value + buffer * 2
  )
})

// 当前可视的数据
const visibleItems = computed(() => {
  return props.items.slice(startIndex.value, endIndex.value)
})

// 总高度（用于撑起滚动条）
const totalHeight = computed(() => {
  return props.items.length * props.itemHeight
})

// 偏移量（让可视内容位于正确的位置）
const offsetY = computed(() => {
  return startIndex.value * props.itemHeight
})

// 滚动事件处理
const handleScroll = () => {
  scrollTop.value = container.value.scrollTop
}
</script>

<style scoped>
.virtual-list-container {
  position: relative;
  height: 400px;  /* 固定高度 */
  overflow-y: auto;
}

.phantom {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  z-index: -1;
}

.content {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
}

.list-item {
  display: flex;
  align-items: center;
  padding: 0 16px;
  border-bottom: 1px solid #eee;
}
</style>
```

**虚拟滚动的核心优势**：

| 场景 | 传统列表（10000项） | 虚拟滚动（10000项） |
|------|-------------------|-------------------|
| DOM节点数 | 10000+ | 20-30（可视区域+缓冲） |
| 内存占用 | 高（每个节点都占内存） | 低（节点数固定） |
| 初始渲染时间 | 慢（要创建所有节点） | 快（只创建少量节点） |
| 滚动性能 | 卡（大量节点参与重排/重绘） | 流畅（仅数据更新，DOM复用） |
| 实现复杂度 | 简单 | 较复杂 |

**适用场景**：
- 数据量大的列表（通常>100条就有优化价值）
- 列表项高度固定或可以预估
- 对滚动性能有较高要求

**不适用场景**：
- 数据量很小（<50条）
- 列表项高度极不规律且无法预估
- 需要全量DOM操作（如全选、全量导出等）

---

## 9. 总结：渲染管线优化的本质

通过本文的学习，我们可以得出以下核心结论：

**从实践来看**：不是优化越多越好，而是优化越"对位"越好。理解浏览器的渲染管线，才能知道在哪里用力、在哪里放手。

**从成本视角看**：
- 大部分性能浪费来自对布局属性的**频繁读写交替**，需要通过读写分离、批量处理来解决；
- 复杂的动画效果如果触发了重排和重绘，往往源于使用了"错误的属性"，需要通过`transform`和`opacity`来解决；
- 面对大量数据的列表渲染，单纯依靠虚拟DOM的diff算法已经不够，必须结合**虚拟滚动**等技术。

目标是：在给定的浏览器和硬件条件下，让每一个渲染步骤的投入都具备明确的性能收益。

---

## 10. 名词对照表

| 英文术语 | 中文对照 | 解释 |
| :--- | :--- | :--- |
| **DOM** | 文档对象模型 | Document Object Model，浏览器将HTML文档解析后形成的树形结构，JavaScript可以通过DOM API操作页面元素。 |
| **CSSOM** | CSS对象模型 | CSS Object Model，浏览器将CSS解析后形成的树形结构，与DOM结合用于计算最终样式。 |
| **Render Tree** | 渲染树 | 由DOM树和CSSOM树合并而成，只包含可见节点，用于后续的布局计算和绘制。 |
| **Layout** | 布局 | 计算渲染树中每个节点的几何信息（位置、大小）的过程，也称为Reflow（重排）。 |
| **Reflow** | 重排/回流 | 当元素的尺寸、位置等几何属性发生变化时，浏览器需要重新计算布局的过程。 |
| **Paint** | 绘制/重绘 | 将布局计算后的元素样式（颜色、背景、边框等）绘制到屏幕上的过程。 |
| **Repaint** | 重绘 | 当元素的外观属性（如颜色、背景）变化但不影响几何属性时，触发的绘制更新。 |
| **Composite** | 合成 | 将多个绘制层（Layer）合并为最终屏幕图像的过程，通常在GPU上执行。 |
| **Layer** | 层/合成层 | 浏览器为了优化渲染而创建的独立绘制表面，可以单独变换和合成。 |
| **Event Loop** | 事件循环 | JavaScript的异步执行机制，负责调度宏任务和微任务的执行。 |
| **Call Stack** | 调用栈 | 记录当前正在执行的JavaScript函数的数据结构。 |
| **Macro Task** | 宏任务 | 事件循环中优先级较低的任务类型，如setTimeout、setInterval、I/O操作等。 |
| **Micro Task** | 微任务 | 事件循环中优先级较高的任务类型，如Promise.then、MutationObserver等。 |
| **Forced Synchronous Layout** | 强制同步布局 | 在JavaScript中交替读取和写入布局属性，导致浏览器被迫立即执行布局计算的性能问题。 |
| **Layout Thrashing** | 布局抖动 | 频繁的强制同步布局导致的性能急剧下降现象。 |
| **Virtual Scrolling** | 虚拟滚动 | 只渲染视口内可见列表项的技术，用于优化大数据列表的性能。 |
| **RAF (requestAnimationFrame)** | 请求动画帧 | 浏览器提供的API，用于在下一次重绘前执行动画相关的JavaScript代码。 |
| **RAIL** | 响应、动画、空闲、加载 | Google提出的性能模型，关注响应（Response）、动画（Animation）、空闲（Idle）、加载（Load）四个维度。 |
| **Critical Rendering Path** | 关键渲染路径 | 浏览器将HTML、CSS、JavaScript转换为屏幕上像素所经历的一系列步骤。 |
| **FP (First Paint)** | 首次绘制 | 浏览器首次将像素绘制到屏幕上的时间点。 |
| **FCP (First Contentful Paint)** | 首次内容绘制 | 浏览器首次绘制来自DOM的内容（文本、图片等）的时间点。 |
| **LCP (Largest Contentful Paint)** | 最大内容绘制 | 浏览器绘制视口内最大内容元素的时间点，是Core Web Vitals指标之一。 |
| **TTI (Time to Interactive)** | 可交互时间 | 页面完全可交互（主线程空闲）的时间点。 |
| **TBT (Total Blocking Time)** | 总阻塞时间 | FCP到TTI之间，主线程被阻塞超过50ms的总时间。 |
| **CLS (Cumulative Layout Shift)** | 累积布局偏移 | 页面生命周期内发生的所有意外布局偏移的分数总和，是Core Web Vitals指标之一。 |
