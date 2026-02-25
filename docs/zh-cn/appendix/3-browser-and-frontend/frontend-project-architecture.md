# 前端项目架构设计

::: tip 🎯 核心问题
**从简单的 HTML 页面到复杂的企业级应用，如何为不同规模的项目选择合适的架构？** 这就像问：从单身公寓到大型商场，如何根据需求设计不同的空间布局？好的架构应该随项目成长而演进，而不是一开始就过度设计。
:::

---

## 1. 架构演进：从简单到复杂

### 1.1 三个复杂度级别概览

前端项目的架构应该与项目复杂度相匹配。我们按**技术复杂度**和**用户规模**两个维度，将项目分为三个级别：

| 级别 | 技术栈 | 用户规模 | 典型场景 | 核心关注点 |
|------|--------|----------|----------|------------|
| **入门级** | HTML/CSS/JS | 个人/小团队 | 个人博客、宣传页、简单工具 | 快速上线、简单维护 |
| **进阶级** | Vue/React + 构建工具 | 中小型企业 | 管理系统、电商前台、SaaS | 组件复用、状态管理 |
| **企业级** | 框架 + 微前端/SSR | 大型应用 | 大型平台、复杂业务系统 | 性能优化、团队协作、可扩展性 |

::: tip 💡 如何选择？
**不要过度设计！** 很多项目从简单的 HTML 开始，随着需求增长逐步引入框架和工具。

- 个人项目 → 入门级
- 创业公司 MVP → 入门级或进阶级
- 企业管理系统 → 进阶级
- 大型互联网平台 → 企业级
:::

---

## 2. 入门级：HTML/CSS/JS 项目

### 2.1 适用场景

- 个人博客、简历页面
- 产品宣传页（Landing Page）
- 简单的工具页面（计算器、转换器等）
- 原型验证、快速 Demo

### 2.2 推荐目录结构

```
my-simple-project/
├── index.html              # 首页
├── about.html              # 关于页面（如有）
├── css/
│   ├── reset.css           # 重置样式
│   ├── variables.css       # CSS 变量（颜色、字体等）
│   ├── components.css      # 组件样式（按钮、卡片等）
│   └── main.css            # 主样式文件
├── js/
│   ├── utils.js            # 工具函数
│   ├── api.js              # 简单的 API 调用
│   └── main.js             # 主逻辑
├── assets/
│   ├── images/             # 图片资源
│   └── fonts/              # 字体文件
└── README.md               # 项目说明
```

### 2.3 代码组织原则

**HTML**：语义化标签，清晰的结构

```html
<!-- index.html -->
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>我的个人博客</title>
  <link rel="stylesheet" href="css/reset.css">
  <link rel="stylesheet" href="css/variables.css">
  <link rel="stylesheet" href="css/components.css">
  <link rel="stylesheet" href="css/main.css">
</head>
<body>
  <header class="site-header">
    <nav class="main-nav">
      <a href="index.html">首页</a>
      <a href="about.html">关于</a>
    </nav>
  </header>
  
  <main class="content">
    <article class="blog-post">
      <h1>文章标题</h1>
      <p>文章内容...</p>
    </article>
  </main>
  
  <footer class="site-footer">
    <p>&copy; 2024 我的博客</p>
  </footer>
  
  <script src="js/utils.js"></script>
  <script src="js/main.js"></script>
</body>
</html>
```

**CSS**：使用 CSS 变量管理主题

```css
/* variables.css */
:root {
  --primary-color: #3498db;
  --text-color: #333;
  --bg-color: #fff;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  --font-base: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

/* components.css - 可复用的组件样式 */
.btn {
  padding: var(--spacing-sm) var(--spacing-md);
  border: none;
  border-radius: 4px;
  background: var(--primary-color);
  color: white;
  cursor: pointer;
}

.card {
  padding: var(--spacing-md);
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}
```

**JavaScript**：模块化组织（使用 ES6 模块或简单拆分）

```javascript
// utils.js
const utils = {
  // DOM 操作简化
  $(selector) {
    return document.querySelector(selector);
  },
  
  // 简单的防抖
  debounce(fn, delay) {
    let timer;
    return function(...args) {
      clearTimeout(timer);
      timer = setTimeout(() => fn.apply(this, args), delay);
    };
  },
  
  // 本地存储封装
  storage: {
    get(key) {
      return JSON.parse(localStorage.getItem(key) || 'null');
    },
    set(key, value) {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }
};

// main.js
document.addEventListener('DOMContentLoaded', () => {
  // 页面初始化逻辑
  initNavigation();
  loadBlogPosts();
});
```

### 2.4 最佳实践

✅ **应该做的**：
- 使用语义化 HTML 标签
- CSS 变量管理颜色和间距
- 图片压缩和懒加载
- 添加基础的 SEO meta 标签

❌ **避免的**：
- 内联样式（`style="..."`）
- 全局变量污染
- 重复代码（复制粘贴）

---

## 3. 进阶级：Vue/React 框架项目

### 3.1 适用场景

- 企业管理系统（ERP、CRM、OA）
- 电商前台/后台
- SaaS 应用
- 需要复杂交互的 Web 应用

### 3.2 Vue 项目推荐结构

```
my-vue-project/
├── public/                     # 静态资源
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── assets/                 # 样式、图片、字体
│   │   ├── styles/
│   │   │   ├── variables.scss
│   │   │   ├── mixins.scss
│   │   │   └── global.scss
│   │   └── images/
│   ├── components/             # 通用组件
│   │   ├── common/             # 全局通用（Button、Modal 等）
│   │   │   ├── Button/
│   │   │   │   ├── index.vue
│   │   │   │   └── Button.scss
│   │   │   └── Modal/
│   │   └── business/           # 业务组件（UserCard 等）
│   ├── views/                  # 页面组件
│   │   ├── Home/
│   │   ├── User/
│   │   │   ├── List.vue
│   │   │   └── Detail.vue
│   │   └── Product/
│   ├── router/                 # 路由配置
│   │   └── index.js
│   ├── stores/                 # Pinia/Vuex 状态管理
│   │   ├── user.js
│   │   └── app.js
│   ├── services/               # API 服务
│   │   ├── request.js          # axios 封装
│   │   ├── user.js
│   │   └── product.js
│   ├── utils/                  # 工具函数
│   │   ├── format.js
│   │   ├── validate.js
│   │   └── storage.js
│   ├── composables/            # 组合式函数
│   │   ├── useAuth.js
│   │   └── useLoading.js
│   ├── constants/              # 常量定义
│   │   └── index.js
│   ├── App.vue
│   └── main.js
├── tests/                      # 测试文件
├── .env                        # 环境变量
├── vite.config.js
├── package.json
└── README.md
```

### 3.3 React 项目推荐结构

```
my-react-project/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── common/             # 通用组件
│   │   │   ├── Button/
│   │   │   │   ├── index.jsx
│   │   │   │   └── Button.module.css
│   │   │   └── Modal/
│   │   └── business/           # 业务组件
│   ├── pages/                  # 页面组件
│   │   ├── Home/
│   │   ├── User/
│   │   └── Product/
│   ├── hooks/                  # 自定义 Hooks
│   │   ├── useAuth.js
│   │   └── useFetch.js
│   ├── services/               # API 服务
│   │   ├── api.js
│   │   └── userService.js
│   ├── store/                  # Redux/Zustand 状态管理
│   │   ├── slices/
│   │   └── index.js
│   ├── utils/
│   ├── constants/
│   ├── App.jsx
│   └── main.jsx
├── tests/
└── package.json
```

### 3.4 关键概念详解

#### 组件设计原则

**单一职责**：一个组件只做一件事

```vue
<!-- ❌ 不好的例子：组件做了太多事 -->
<template>
  <div>
    <form @submit="handleSubmit">
      <!-- 表单内容 -->
    </form>
    <table>
      <!-- 数据表格 -->
    </table>
    <div class="charts">
      <!-- 统计图表 -->
    </div>
  </div>
</template>

<!-- ✅ 好的例子：拆分成独立组件 -->
<template>
  <div>
    <UserForm @submit="fetchData" />
    <UserTable :data="users" />
    <UserStats :data="users" />
  </div>
</template>
```

#### 状态管理策略

| 状态类型 | 存储位置 | 示例 |
|----------|----------|------|
| **全局状态** | Pinia/Redux | 用户信息、登录状态、主题设置 |
| **页面状态** | 页面组件 | 列表查询条件、分页信息 |
| **组件状态** | 组件内部 | 表单输入、弹窗显示/隐藏 |
| **服务端状态** | TanStack Query/SWR | 服务器数据、缓存 |

#### 目录组织方式选择

**方式一：按类型组织（适合小型项目）**

```
src/
├── components/     # 所有组件
├── views/          # 所有页面
├── stores/         # 所有状态
└── services/       # 所有服务
```

**方式二：按功能组织（适合中大型项目）**

```
src/
├── features/
│   ├── auth/       # 认证功能的所有代码
│   ├── user/       # 用户功能的所有代码
│   └── product/    # 商品功能的所有代码
├── shared/         # 共享资源
└── App.vue
```

::: tip 💡 如何选择？
- 项目页面 < 10 个 → 按类型组织
- 项目页面 > 20 个 → 按功能组织
- 团队 > 5 人 → 按功能组织，便于并行开发
:::

---

## 4. 企业级：大型应用架构

### 4.1 适用场景

- 大型互联网平台（电商、社交、内容平台）
- 复杂的企业级应用
- 需要支持多团队协作的项目
- 对性能和可维护性要求极高的项目

### 4.2 微前端架构

当项目规模大到一定程度，单个代码库难以维护时，可以考虑**微前端**架构。

```
大型电商平台/
├── 基座应用（主框架）
│   ├── 顶部导航
│   ├── 侧边菜单
│   ├── 用户中心入口
│   └── 子应用容器
├── 商品子应用（独立部署）
│   ├── 商品列表
│   ├── 商品详情
│   └── 商品管理
├── 订单子应用（独立部署）
│   ├── 购物车
│   ├── 订单列表
│   └── 支付流程
├── 用户子应用（独立部署）
│   ├── 个人中心
│   ├── 收货地址
│   └── 优惠券
└── 营销子应用（独立部署）
    ├── 活动页面
    ├── 优惠券发放
    └── 积分商城
```

**微前端的优势**：
- 团队自治：每个子应用独立开发、部署
- 技术栈无关：不同团队可以用不同框架
- 渐进式升级：可以逐步重构老系统

### 4.3 企业级目录结构

```
enterprise-project/
├── apps/                       # 微前端子应用
│   ├── main/                   # 基座应用
│   ├── product/
│   ├── order/
│   └── user/
├── packages/                   # 共享包（Monorepo）
│   ├── ui-components/          # 通用组件库
│   ├── utils/                  # 工具函数
│   ├── constants/              # 常量定义
│   └── types/                  # TypeScript 类型
├── shared/                     # 共享配置
│   ├── eslint-config/
│   ├── ts-config/
│   └── vite-config/
├── docs/                       # 项目文档
├── scripts/                    # 构建脚本
└── package.json
```

### 4.4 性能优化架构

大型应用需要关注性能优化：

```
性能优化策略/
├── 构建时优化
│   ├── 代码分割（Code Splitting）
│   ├── 路由懒加载
│   ├── Tree Shaking
│   └── 资源压缩
├── 运行时优化
│   ├── 虚拟滚动（长列表）
│   ├── 图片懒加载
│   ├── 组件按需渲染
│   └── 缓存策略
└── 网络优化
    ├── CDN 加速
    ├── HTTP 缓存
    ├── 资源预加载
    └── Service Worker
```

### 4.5 SSR/SSG 架构

对于需要 SEO 或首屏性能的场景：

| 方案 | 适用场景 | 代表框架 |
|------|----------|----------|
| **SSR** | 需要 SEO、首屏渲染快 | Next.js、Nuxt.js |
| **SSG** | 内容静态、更新不频繁 | Astro、VitePress |
| **混合** | 部分静态、部分动态 | Next.js (ISR) |

---

## 5. 按用户量级别的架构选择

### 5.1 个人/小团队（日活 < 1000）

**特点**：快速迭代、资源有限、需求变化快

**推荐架构**：
- 技术栈：Vue 3 + Vite 或 React + Vite
- 状态管理：Pinia 或 Zustand（轻量级）
- UI 库：Element Plus / Ant Design
- 部署：Vercel / Netlify / 云服务器

**目录结构**：简单按类型组织即可

### 5.2 中型企业（日活 1k-100k）

**特点**：业务复杂、团队协作、需要稳定性

**推荐架构**：
- 技术栈：Vue 3 + TypeScript 或 React + TypeScript
- 状态管理：Pinia + 组合式函数 或 Redux Toolkit
- UI 库：自建组件库 + 业务组件库
- 测试：单元测试 + E2E 测试
- 部署：CI/CD 流水线 + Docker

**目录结构**：按功能组织，建立规范

### 5.3 大型平台（日活 > 100k）

**特点**：高并发、多团队协作、长期维护

**推荐架构**：
- 技术栈：React/Vue + TypeScript（严格模式）
- 架构：微前端 + Monorepo
- 状态管理：细粒度状态管理 + 服务端状态缓存
- 性能：SSR/SSG + CDN + 边缘计算
- 监控：前端监控 + 错误追踪 + 性能分析

**目录结构**：Monorepo + 微前端

---

## 6. 架构演进路线图

### 6.1 演进示例：从博客到平台

```
阶段 1：个人博客（HTML/CSS/JS）
    ↓ 需求：需要后台管理
阶段 2：增加管理后台（Vue/React + 简单结构）
    ↓ 需求：用户系统、评论功能
阶段 3：功能模块化（按功能组织）
    ↓ 需求：多团队协作、独立部署
阶段 4：微前端架构（Monorepo）
```

### 6.2 何时该升级架构？

| 信号 | 说明 | 建议 |
|------|------|------|
| 构建时间 > 5 分钟 | 项目过大 | 代码分割、微前端 |
| 多人频繁冲突 | 协作困难 | 按功能组织、模块拆分 |
| 改一处崩多处 | 耦合严重 | 重构、加强测试 |
| 首屏加载 > 3 秒 | 性能问题 | 懒加载、SSR、优化 |
| 新成员上手慢 | 结构混乱 | 文档、规范、重构 |

---

## 7. 总结

::: tip 💡 核心思想
**架构没有银弹，适合的才是最好的。**

- **小项目**不要过度设计，HTML/CSS/JS 足够
- **中项目**建立规范，组件化、模块化
- **大项目**考虑微前端、性能优化、团队协作

**记住这几点**：
1. **渐进式演进**：从简单开始，随需求增长
2. **统一约定**：命名、结构、代码风格保持一致
3. **文档先行**：架构决策要记录，便于传承
4. **定期重构**：技术债务要及时偿还

**最终目标**：让代码像整理好的空间一样，无论大小，都能高效运转。
:::

---

## 参考资源

- [Vue 风格指南](https://vuejs.org/style-guide/)
- [React 项目结构建议](https://react.dev/learn/thinking-in-react)
- [Bulletproof React - 架构指南](https://github.com/alan2207/bulletproof-react)
- [Feature Sliced Design](https://feature-sliced.design/)
- [微前端架构](https://micro-frontends.org/)
