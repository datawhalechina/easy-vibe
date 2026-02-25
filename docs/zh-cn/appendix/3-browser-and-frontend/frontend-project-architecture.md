# 前端项目架构设计

::: tip 🎯 核心问题
**文件越放越乱，代码越写越难找，如何设计一个清晰、可维护的前端项目结构？** 这就像问：你是把所有衣服都扔进一个箱子，还是按季节、类型、颜色分类整理？好的项目架构能让团队协作更高效，让代码维护更轻松。
:::

---

## 1. 为什么要关注项目架构？

### 1.1 从小项目到大项目的演变

很多初学者刚开始写前端时，项目结构非常简单：

```
my-project/
├── index.html
├── style.css
└── app.js
```

三个文件搞定一切，简单直接。但随着项目增长，问题开始出现：

- **页面多了**：`page1.html`, `page2.html`... 文件散落在根目录
- **组件多了**：按钮、弹窗、表单各自为政，复用困难
- **工具函数多了**：到处复制粘贴，改一个地方要改十处
- **样式冲突了**：全局 CSS 互相覆盖，调试困难

**问题的本质**：没有"章法"，文件随意存放，就像把春夏秋冬的衣服都扔进一个箱子。

### 1.2 好的架构像整理好的衣柜

想象一个整理好的衣柜：

| 区域 | 存放物品 | 特点 |
|------|----------|------|
| **挂衣区** | 外套、衬衫 | 常穿，方便取用 |
| **抽屉区** | 内衣、袜子 | 分类摆放，整齐 |
| **隔板区** | 毛衣、裤子 | 叠放，节省空间 |
| **顶层区** | 换季衣物 | 不常用，收纳起来 |

**好的项目架构**就是把代码也这样组织：每一类文件有自己的"位置"，团队成员都知道该去哪找、该往哪放。

::: tip 💡 通俗比喻：餐厅后厨的组织
把前端项目想象成一家餐厅的后厨：

- **`src/pages/`（页面区）** = 出餐口：每个订单对应一个成品菜
- **`src/components/`（组件区）** = 备料台：切好的蔬菜、调好的酱料，随时可用
- **`src/utils/`（工具区）** = 工具柜：刀、勺、温度计等通用工具
- **`src/assets/`（食材区）** = 冷藏库：图片、字体、样式等原材料
- **`src/services/`（服务层）** = 传菜窗口：与外部（服务员/后端）交互

**关键点**：每个区域职责明确，不会混乱。你不会在冷藏库里切菜，也不会把刀具扔进汤锅。
:::

---

## 2. 经典目录结构解析

### 2.1 标准目录结构（以 Vue/React 为例）

一个中大型前端项目的典型结构如下：

```
my-frontend-project/
├── public/                     # 静态资源（不经过构建）
│   ├── favicon.ico
│   ├── index.html
│   └── robots.txt
├── src/
│   ├── assets/                 # 项目资源（会被构建工具处理）
│   │   ├── images/
│   │   ├── fonts/
│   │   └── styles/
│   │       ├── variables.scss  # 变量定义
│   │       ├── mixins.scss     # 混入样式
│   │       └── global.css      # 全局样式
│   ├── components/             # 通用组件
│   │   ├── common/             # 全局通用组件
│   │   │   ├── Button/
│   │   │   │   ├── index.vue
│   │   │   │   ├── Button.scss
│   │   │   │   └── Button.test.js
│   │   │   ├── Modal/
│   │   │   └── Loading/
│   │   └── business/           # 业务组件
│   │       ├── UserCard/
│   │       └── ProductList/
│   ├── views/ 或 pages/        # 页面组件
│   │   ├── Home/
│   │   ├── About/
│   │   └── User/
│   │       ├── Profile/
│   │       └── Settings/
│   ├── router/ 或 navigation/  # 路由配置
│   │   └── index.js
│   ├── stores/ 或 state/       # 状态管理
│   │   ├── user.js
│   │   └── app.js
│   ├── services/ 或 api/       # API 服务
│   │   ├── user.js
│   │   └── product.js
│   ├── utils/ 或 helpers/      # 工具函数
│   │   ├── request.js          # 请求封装
│   │   ├── storage.js          # 本地存储
│   │   └── format.js           # 格式化工具
│   ├── hooks/ 或 composables/  # 组合式函数
│   │   ├── useAuth.js
│   │   └── useLoading.js
│   ├── directives/             # 自定义指令
│   ├── plugins/                # 插件配置
│   ├── constants/              # 常量定义
│   ├── types/ 或 @types/       # TypeScript 类型
│   └── App.vue 或 App.jsx      # 根组件
│   └── main.js 或 main.ts      # 入口文件
├── tests/                      # 测试文件
│   ├── unit/
│   └── e2e/
├── .env                        # 环境变量
├── .env.development
├── .env.production
├── vite.config.js              # 构建配置
├── package.json
└── README.md
```

::: tip 📊 从图解中你能看到什么？
**分层逻辑**：

- **`public/` vs `src/assets/`**：前者直接复制到输出目录，后者会被构建工具处理（压缩、转译、添加哈希值）
- **`components/` vs `views/`**：组件是"零件"，页面是"成品"。一个页面由多个组件组装而成
- **`services/` 独立出来**：把 API 调用集中管理，方便统一处理错误、加载状态、请求拦截

**依赖方向**：

```
views/pages → components → utils/hooks
     ↓
services → stores
```

上层可以调用下层，但下层不应该依赖上层。
:::

### 2.2 按功能组织 vs 按类型组织

项目结构有两种主流的组织方式：

#### 方式一：按类型组织（Type-based）

```
src/
├── components/
│   ├── Button.vue
│   ├── Modal.vue
│   └── Card.vue
├── views/
│   ├── Home.vue
│   ├── User.vue
│   └── Product.vue
├── stores/
│   ├── user.js
│   └── product.js
└── services/
    ├── user.js
    └── product.js
```

**优点**：
- 结构清晰，同类文件在一起
- 适合小型项目，一目了然

**缺点**：
- 修改一个功能要跨多个目录
- 大型项目中文件过多，难以定位

#### 方式二：按功能组织（Feature-based）

```
src/
├── features/
│   ├── auth/
│   │   ├── components/
│   │   │   ├── LoginForm.vue
│   │   │   └── RegisterForm.vue
│   │   ├── stores/
│   │   │   └── authStore.js
│   │   ├── services/
│   │   │   └── authApi.js
│   │   ├── hooks/
│   │   │   └── useAuth.js
│   │   └── index.js            # 统一导出
│   ├── user/
│   │   ├── components/
│   │   ├── stores/
│   │   └── services/
│   └── product/
│       ├── components/
│       ├── stores/
│       └── services/
├── shared/                     # 共享资源
│   ├── components/
│   ├── utils/
│   └── styles/
└── App.vue
```

**优点**：
- 高内聚，修改一个功能在一个目录完成
- 便于团队协作，不同人负责不同 feature
- 易于删除或重构，不会散落各处

**缺点**：
- 初期设计需要考虑 feature 划分
- 共享组件需要额外考虑

::: tip 💡 如何选择？
| 项目规模 | 推荐方式 | 原因 |
|----------|----------|------|
| 小型项目（< 10 个页面） | 按类型组织 | 简单直接，快速上手 |
| 中大型项目（> 20 个页面） | 按功能组织 | 便于维护，团队协作 |
| 微前端/大型应用 | 按功能 + 模块拆分 | 独立部署，团队自治 |

**实际建议**：很多项目采用"混合模式"——整体按功能组织，内部按类型细分。
:::

---

## 3. 各目录的职责与最佳实践

### 3.1 `components/` 组件目录

组件是前端项目的核心，良好的组件设计能大幅提升开发效率。

#### 组件分类

```
components/
├── common/                 # 通用组件（跨项目可复用）
│   ├── Button/
│   ├── Input/
│   ├── Modal/
│   └── Loading/
├── business/               # 业务组件（项目特定）
│   ├── UserCard/
│   ├── ProductItem/
│   └── OrderTable/
└── layout/                 # 布局组件
    ├── Header/
    ├── Sidebar/
    └── Footer/
```

#### 单文件组件结构

每个组件建议包含以下文件：

```
Button/
├── index.vue               # 主组件（或 .tsx/.jsx）
├── Button.scss             # 样式（可选 CSS Modules）
├── Button.test.js          # 单元测试
├── Button.stories.js       # Storybook 文档（可选）
├── types.ts                # 类型定义（TS 项目）
└── index.ts                # 统一导出
```

::: details 📝 组件代码示例
```vue
<!-- Button/index.vue -->
<template>
  <button
    :class="['btn', `btn--${type}`, { 'btn--disabled': disabled }]"
    :disabled="disabled"
    @click="handleClick"
  >
    <Loading v-if="loading" size="small" />
    <slot />
  </button>
</template>

<script setup>
import { Loading } from '../Loading'

defineProps({
  type: { type: String, default: 'primary' },
  disabled: Boolean,
  loading: Boolean
})

const emit = defineEmits(['click'])
const handleClick = () => emit('click')
</script>

<style scoped lang="scss">
.btn {
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  
  &--primary {
    background: var(--primary-color);
    color: white;
  }
  
  &--disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
}
</style>
```
:::

### 3.2 `views/` 或 `pages/` 页面目录

页面是用户看到的"成品"，通常对应路由。

```
views/
├── Home/                   # 首页
│   ├── index.vue
│   ├── components/         # 页面私有组件
│   │   ├── HeroSection.vue
│   │   └── FeatureList.vue
│   └── hooks/              # 页面私有 hooks
│       └── useHomeData.js
├── User/
│   ├── Profile/
│   ├── Settings/
│   └── OrderHistory/
└── Product/
    ├── List/
    └── Detail/
```

**最佳实践**：
- 页面组件保持"薄"，逻辑下沉到 hooks 或 services
- 页面私有组件放在页面目录下，避免污染全局
- 复杂页面可以进一步拆分子目录

### 3.3 `services/` 或 `api/` 服务层

集中管理所有 API 调用，统一处理请求/响应拦截。

```
services/
├── request.js              # 请求实例配置（axios/fetch 封装）
├── user.js                 # 用户相关 API
├── product.js              # 商品相关 API
├── order.js                # 订单相关 API
└── index.js                # 统一导出
```

::: details 📝 服务层代码示例
```javascript
// services/request.js
import axios from 'axios'
import { useAuthStore } from '@/stores/auth'

const request = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000
})

// 请求拦截器
request.interceptors.request.use(
  (config) => {
    const authStore = useAuthStore()
    if (authStore.token) {
      config.headers.Authorization = `Bearer ${authStore.token}`
    }
    return config
  }
)

// 响应拦截器
request.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      // 统一处理登录过期
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export default request
```

```javascript
// services/user.js
import request from './request'

export const userApi = {
  login: (data) => request.post('/auth/login', data),
  register: (data) => request.post('/auth/register', data),
  getProfile: () => request.get('/user/profile'),
  updateProfile: (data) => request.put('/user/profile', data)
}
```
:::

### 3.4 `stores/` 状态管理

```
stores/
├── index.js                # store 入口
├── auth.js                 # 认证状态
├── user.js                 # 用户信息
├── app.js                  # 应用级状态（主题、语言等）
└── cart.js                 # 购物车状态
```

**建议**：
- 按功能拆分 store，避免单个文件过大
- 区分全局状态和局部状态，不要什么都放全局
- 使用组合式 API（Pinia/Vuex 4+）更灵活

### 3.5 `utils/` 工具函数

```
utils/
├── format.js               # 格式化（日期、金额等）
├── storage.js              # 本地存储封装
├── validate.js             # 表单验证
├── dom.js                  # DOM 操作
├── date.js                 # 日期处理
└── index.js                # 统一导出
```

**原则**：
- 纯函数优先，便于测试
- 单一职责，一个函数只做一件事
- 添加 JSDoc 注释，说明参数和返回值

::: details 📝 工具函数示例
```javascript
// utils/storage.js
const STORAGE_PREFIX = 'myapp_'

export const storage = {
  get(key) {
    const value = localStorage.getItem(STORAGE_PREFIX + key)
    try {
      return JSON.parse(value)
    } catch {
      return value
    }
  },
  
  set(key, value) {
    localStorage.setItem(
      STORAGE_PREFIX + key,
      typeof value === 'string' ? value : JSON.stringify(value)
    )
  },
  
  remove(key) {
    localStorage.removeItem(STORAGE_PREFIX + key)
  }
}
```
:::

### 3.6 `hooks/` 或 `composables/` 组合式函数

```
hooks/
├── useAuth.js              # 认证逻辑
├── useLoading.js           # 加载状态
├── usePagination.js        # 分页逻辑
├── useForm.js              # 表单处理
└── useWebsocket.js         # WebSocket
```

::: details 📝 Hook 示例
```javascript
// hooks/useLoading.js
import { ref } from 'vue'

export function useLoading() {
  const loading = ref(false)
  
  const withLoading = async (fn) => {
    loading.value = true
    try {
      return await fn()
    } finally {
      loading.value = false
    }
  }
  
  return { loading, withLoading }
}

// 使用
const { loading, withLoading } = useLoading()
const fetchData = () => withLoading(async () => {
  const data = await api.getData()
  list.value = data
})
```
:::

---

## 4. 知名开源项目的架构参考

### 4.1 Vue 3 官方仓库

```
vue/
├── packages/
│   ├── vue/                # 核心包
│   ├── reactivity/         # 响应式系统
│   ├── runtime-core/       # 运行时核心
│   ├── runtime-dom/        # DOM 运行时
│   ├── compiler-sfc/       # 单文件组件编译器
│   └── shared/             # 共享工具
├── scripts/                # 构建脚本
└── tsconfig.json
```

**特点**：
- Monorepo 结构，多个包统一管理
- 按功能拆分 package，职责清晰
- 共享工具提取到 shared 包

### 4.2 React 官方仓库

```
react/
├── packages/
│   ├── react/              # React 核心
│   ├── react-dom/          # DOM 渲染器
│   ├── react-reconciler/   # 协调器
│   ├── scheduler/          # 调度器
│   └── shared/             # 共享代码
├── fixtures/               # 测试用例
└── scripts/
```

**特点**：
- 核心与渲染器分离（react vs react-dom）
- reconciler 独立，支持多平台
- scheduler 单独抽离，可独立使用

### 4.3 Ant Design Vue

```
ant-design-vue/
├── components/             # 组件目录
│   ├── button/
│   ├── modal/
│   └── ...
├── docs/                   # 文档
├── site/                   # 官网
├── tests/                  # 测试
└── typings/                # 类型定义
```

**特点**：
- 组件与文档分离
- 每个组件独立目录，包含 demo、test、style
- 统一的类型定义

### 4.4 Next.js（全栈框架）

```
my-nextjs-app/
├── app/                    # App Router（新版）
│   ├── page.js             # 页面
│   ├── layout.js           # 布局
│   ├── loading.js          # 加载状态
│   └── api/                # API 路由
├── components/             # 组件
├── lib/                    # 工具函数
├── public/                 # 静态资源
└── styles/                 # 全局样式
```

**特点**：
- 约定式路由，文件即路由
- 内置 loading、error、layout 等约定文件
- API 路由与页面共存

---

## 5. 架构设计原则与检查清单

### 5.1 核心原则

| 原则 | 说明 | 实践建议 |
|------|------|----------|
| **单一职责** | 一个模块只做一件事 | 组件、函数保持简洁 |
| **高内聚低耦合** | 相关代码放在一起，减少依赖 | 按功能组织目录 |
| **可预测性** | 代码行为符合直觉 | 命名清晰，结构一致 |
| **可测试性** | 便于编写单元测试 | 纯函数、依赖注入 |
| **可扩展性** | 新功能容易添加 | 预留扩展点，避免硬编码 |

### 5.2 检查清单

**目录结构**：
- [ ] 是否有清晰的目录划分？
- [ ] 新成员能否快速找到文件位置？
- [ ] 是否避免了过深的嵌套（建议不超过 4 层）？

**组件设计**：
- [ ] 组件是否单一职责？
- [ ] Props 是否清晰、可预测？
- [ ] 是否提取了可复用的逻辑到 hooks？

**代码组织**：
- [ ] 是否避免了循环依赖？
- [ ] 工具函数是否纯函数优先？
- [ ] 常量、配置是否集中管理？

**团队协作**：
- [ ] 是否有编码规范文档？
- [ ] 是否有文件命名约定？
- [ ] 代码审查是否关注架构问题？

---

## 6. 总结

::: tip 💡 核心思想
好的前端项目架构不是一成不变的，而是随着项目发展不断演进的。关键是建立清晰的**组织原则**和**命名约定**，让团队成员达成共识。

**记住这几点**：
1. **先简单后复杂**：小项目不要过度设计
2. **按功能组织**：中大型项目推荐 Feature-based
3. **统一约定**：命名、结构、代码风格保持一致
4. **持续重构**：定期审视架构，及时调整

**最终目标**：让代码像整理好的衣柜一样，想找什么立刻能找到，新成员也能快速上手。
:::

---

## 参考资源

- [Vue 风格指南](https://vuejs.org/style-guide/)
- [React 项目结构建议](https://react.dev/learn/thinking-in-react)
- [Bulletproof React - 架构指南](https://github.com/alan2207/bulletproof-react)
- [Feature Sliced Design](https://feature-sliced.design/)
