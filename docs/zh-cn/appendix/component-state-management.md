# 组件化与状态管理模式总览

> **学习指南**：组件化解决的是"代码该怎么拆"，状态管理解决的是"数据该怎么流"。本章节会围绕一个问题展开：**当应用规模越来越大，组件之间该如何优雅地共享和同步数据？**

在开始之前，建议你先补两块"基础砖"：

- **Vue/React 基础组件**：如果你还不熟悉组件的 props、events、生命周期等概念，建议先回顾一下 [前端框架入门](../stage-1/)。
- **JavaScript 模块化**：了解 ES Module 和 CommonJS 的基本用法，有助于理解状态管理库的设计哲学。

---

## 0. 引言：从"一盘散沙"到"井然有序"

<ComponentHierarchyDemo />

很多前端开发者在项目初期都会经历这样的阶段：

- 页面功能少的时候，数据直接放组件里，props 传来传去还能应付；
- 业务复杂了，组件层级越来越深，props drilling（属性钻取）像打地鼠一样令人崩溃；
- 两个不相干的组件需要共享同一份数据，开始搞事件总线、全局变量，结果代码像意大利面一样纠缠不清。

**直觉上，我们会以为是："这个框架不够强大"。** 但大多数时候，问题并不在于工具，而在于我们**没有设计好组件的职责边界和数据流向**。

面对这些挑战，单纯依靠"写更多代码"已经捉襟见肘。我们需要一套系统的方法论，来在复杂的组件树中优雅地管理共享状态。这正是**组件化与状态管理**试图解决的问题。

---

## 1. 什么是"组件化思维"？（定义 + 场景）

先给一个简短的工作定义，再看几个典型场景。

> 组件化思维，是一种将用户界面拆分为独立、可复用、职责单一的代码单元的工程方法，每个组件封装自己的结构（HTML）、表现（CSS）和行为（JS），并通过明确的接口与其他组件通信。

你可以简单地把它理解成三件事：**高内聚、低耦合、可复用**。
常见会用到它的场景包括：

- **UI 组件库开发**（如 Element Plus、Ant Design）
- **大型单页应用（SPA）**的页面拆分
- **跨项目复用**的业务组件封装

接下来，我们就从一个真实团队的"血泪教训"出发，看看他们是怎么一点点从"面条代码"进化到"组件化架构"的。

---

## 2. 从"血泪教训"说起：某电商团队的组件化重构

### 2.1 初始阶段：一团乱麻的"大泥球"

某电商团队在 2019 年启动了一个促销活动后台管理系统。初期为了快速上线，采用了传统的 jQuery + 服务端渲染模式。

**代码结构大概长这样：**

```html
<!-- promotion-edit.html -->
<div id="page">
  <div class="header">...</div>

  <!-- 活动基本信息表单 -->
  <form id="basic-info">
    <input name="activityName" />
    <input name="startTime" type="datetime-local" />
    <!-- 200+ 行的表单字段... -->
  </form>

  <!-- 商品选择弹窗（隐藏在页面里） -->
  <div id="product-modal" style="display:none">
    <!-- 商品列表、搜索、分页... -->
  </div>

  <!-- 优惠券规则配置（另一个弹窗） -->
  <div id="coupon-modal" style="display:none">
    <!-- 复杂的规则配置表单... -->
  </div>

  <script>
    // 1000+ 行的 jQuery 代码，处理各种交互
    $(function() {
      // 初始化日期选择器
      $('#startTime').datetimepicker({...});

      // 打开商品弹窗
      $('#select-product-btn').click(function() {
        $('#product-modal').show();
        loadProductList();
      });

      // 提交表单（200+ 行的表单验证和提交逻辑）
      $('#submit-btn').click(function() {
        // ...
      });
    });
  </script>
</div>
```

**当时的痛点：**

| 问题 | 表现 | 影响 |
| :--- | :--- | :--- |
| **代码冗余** | 商品选择弹窗在 5 个页面复制粘贴 | 修改一次要改 5 处，经常漏改 |
| **耦合严重** | 表单验证逻辑散落在 HTML、JS、CSS 中 | 改一个字段可能引发连锁 Bug |
| **难以测试** | 所有逻辑都挂在 jQuery 回调里 | 无法单元测试，只能靠人工点 |
| **团队协作难** | 5 个前端同时改一个文件 | Git 冲突频发，合并痛苦 |

### 2.2 第一次重构：Vue 2 的曙光

2020 年，团队决定用 Vue 2 重构系统。这次重构的核心目标是：**按页面维度拆分组件**。

**重构后的代码结构：**

```vue
<!-- ActivityEdit.vue -->
<template>
  <div class="activity-edit">
    <PageHeader title="编辑活动" />

    <BasicInfoForm v-model="activityData" />

    <ProductSelector
      v-model="activityData.productIds"
      @open="showProductModal = true"
    />

    <CouponRules
      v-model="activityData.coupons"
      @open="showCouponModal = true"
    />

    <div class="actions">
      <el-button @click="save">保存</el-button>
      <el-button @click="publish">发布</el-button>
    </div>

    <!-- 弹窗组件 -->
    <ProductModal
      v-model:visible="showProductModal"
      @select="onProductSelect"
    />
    <CouponModal
      v-model:visible="showCouponModal"
      @confirm="onCouponConfirm"
    />
  </div>
</template>

<script>
export default {
  components: {
    PageHeader,
    BasicInfoForm,
    ProductSelector,
    CouponRules,
    ProductModal,
    CouponModal
  },
  data() {
    return {
      activityData: {
        name: '',
        startTime: null,
        productIds: [],
        coupons: []
      },
      showProductModal: false,
      showCouponModal: false
    }
  },
  methods: {
    save() {
      // 保存逻辑
    },
    publish() {
      // 发布逻辑
    }
  }
}
</script>
```

**这次重构带来的改变：**

- **组件复用**：商品选择弹窗从 5 个页面复制粘贴，变成了 1 个 `<ProductModal>` 组件到处复用
- **职责分离**：每个组件只负责自己的逻辑，表单验证拆到 `<BasicInfoForm>` 内部
- **团队协作**：5 个前端可以并行开发不同组件，Git 冲突大幅减少

但很快，新的问题又出现了...

### 2.3 第二次重构：状态管理的觉醒

随着业务复杂度增加，组件之间的通信变得越来越复杂。

**典型场景：购物车状态同步**

用户在一个页面把商品加入购物车，购物车图标上的数字要实时更新。但购物车状态散落在多个组件中：

```vue
<!-- Header.vue -->
<template>
  <header>
    <div class="cart-icon">
      <i class="icon-cart"></i>
      <span class="badge">{{ cartCount }}</span>
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      cartCount: 0  // 自己的购物车数量
    }
  },
  created() {
    // 方案1：事件总线
    this.$bus.$on('cart-updated', (count) => {
      this.cartCount = count
    })

    // 方案2：localStorage 轮询
    setInterval(() => {
      this.cartCount = JSON.parse(localStorage.getItem('cart')).length
    }, 1000)
  }
}
</script>
```

**问题爆发：**

| 反模式 | 代码表现 | 后果 |
| :--- | :--- | :--- |
| **事件总线地狱** | `$bus.$emit` 满天飞，不知道谁监听谁 | 调试困难，内存泄漏 |
| **Props Drilling** | 数据层层传递，中间组件只是"搬运工" | 中间组件被迫耦合 |
| **LocalStorage 滥用** | 把状态存 localStorage 然后轮询 | 性能差，数据不一致 |
| **全局变量** | `window.sharedState` 直接修改 | 无法追踪变化，Bug 难定位 |

**最终解决方案：Vuex + 组件化设计规范**

团队引入了 Vuex 作为集中式状态管理，并制定了组件设计规范：

```javascript
// store/modules/cart.js
export default {
  namespaced: true,
  state: {
    items: [],
    selectedIds: []
  },
  getters: {
    totalCount: state => state.items.reduce((sum, item) => sum + item.quantity, 0),
    totalPrice: state => state.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  },
  mutations: {
    ADD_ITEM(state, item) {
      const existing = state.items.find(i => i.id === item.id)
      if (existing) {
        existing.quantity += item.quantity
      } else {
        state.items.push(item)
      }
    },
    REMOVE_ITEM(state, itemId) {
      state.items = state.items.filter(i => i.id !== itemId)
    }
  },
  actions: {
    async addToCart({ commit }, product) {
      // 可以在这里调用 API
      commit('ADD_ITEM', { ...product, quantity: 1 })
    }
  }
}
```

重构后的组件代码：

```vue
<!-- Header.vue -->
<template>
  <header>
    <div class="cart-icon" @click="goToCart">
      <i class="icon-cart"></i>
      <span v-if="cartCount > 0" class="badge">{{ cartCount }}</span>
    </div>
  </header>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters('cart', ['totalCount'])
  }
}
</script>
```

通过这两次重构，团队总结出了组件化开发的**核心心法**：

1. **组件化是手段，不是目的**：不要为了拆而拆，组件的边界应该对应业务的边界。
2. **状态往上提，事件往下传**：共享状态尽量放在共同的父组件或状态管理库中。
3. **单向数据流是底线**：不要直接修改 props，不要跨组件直接修改状态。

---

## 3. 组件通信的"七种武器"

在深入状态管理库之前，我们先搞清楚组件之间有哪些通信方式，以及它们各自的适用场景。

### 3.1 Props / Emit：父子组件的"官方通道"

这是 Vue/React 中最基础、最推荐的父子通信方式。

<PropsFlowDemo />

**Vue 示例：**

```vue
<!-- Parent.vue -->
<template>
  <div>
    <Child
      :user="currentUser"
      :theme="darkMode"
      @update:profile="handleProfileUpdate"
      @delete="handleDelete"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentUser: { id: 1, name: '张三' },
      darkMode: true
    }
  },
  methods: {
    handleProfileUpdate(newProfile) {
      this.currentUser = { ...this.currentUser, ...newProfile }
    },
    handleDelete(userId) {
      console.log('删除用户:', userId)
    }
  }
}
</script>
```

```vue
<!-- Child.vue -->
<template>
  <div :class="['user-card', theme ? 'dark' : 'light']">
    <h3>{{ user.name }}</h3>
    <input v-model="localProfile.bio" placeholder="个人简介" />
    <button @click="saveProfile">保存</button>
    <button @click="requestDelete">删除</button>
  </div>
</template>

<script>
export default {
  props: {
    user: { type: Object, required: true },
    theme: { type: Boolean, default: false }
  },
  data() {
    return {
      localProfile: { bio: '' }
    }
  },
  watch: {
    user: {
      immediate: true,
      handler(newVal) {
        this.localProfile = { ...newVal }
      }
    }
  },
  methods: {
    saveProfile() {
      // 通过事件通知父组件更新
      this.$emit('update:profile', this.localProfile)
    },
    requestDelete() {
      this.$emit('delete', this.user.id)
    }
  }
}
</script>
```

**最佳实践：**

1. **Props 向下传递，Events 向上传递**：保持单向数据流
2. **Props 尽量只读**：不要在子组件直接修改 props
3. **事件命名要语义化**：`update:xxx` 表示更新，`delete`、`submit` 表示动作

### 3.2 Event Bus：跨组件通信的"小道消息"

当两个没有直接父子关系的组件需要通信时，Event Bus（事件总线）是一种简单的方案。

<EventBusDemo />

**实现方式：**

```javascript
// eventBus.js
import { createApp } from 'vue'

// 创建一个空的 Vue 实例作为事件总线
const EventBus = createApp({})

export default EventBus
```

**使用示例：**

```vue
<!-- 组件 A：发送消息 -->
<template>
  <button @click="notifyUserLoggedIn">用户登录</button>
</template>

<script>
import EventBus from './eventBus'

export default {
  methods: {
    notifyUserLoggedIn() {
      // 发送事件，带上用户数据
      EventBus.$emit('user:login', {
        userId: 123,
        username: '张三',
        timestamp: Date.now()
      })
    }
  }
}
</script>
```

```vue
<!-- 组件 B：接收消息 -->
<template>
  <div class="notification-bar">
    <span v-if="lastLoginUser">欢迎回来，{{ lastLoginUser.username }}!</span>
  </div>
</template>

<script>
import EventBus from './eventBus'

export default {
  data() {
    return {
      lastLoginUser: null
    }
  },
  created() {
    // 监听登录事件
    EventBus.$on('user:login', this.handleUserLogin)
  },
  beforeUnmount() {
    // 重要：组件销毁时取消监听，防止内存泄漏
    EventBus.$off('user:login', this.handleUserLogin)
  },
  methods: {
    handleUserLogin(userData) {
      console.log('收到登录事件:', userData)
      this.lastLoginUser = userData

      // 3秒后清空提示
      setTimeout(() => {
        this.lastLoginUser = null
      }, 3000)
    }
  }
}
</script>
```

**Event Bus 的优缺点：**

| 优点 | 缺点 |
| :--- | :--- |
| 实现简单，无需额外依赖 | 难以追踪事件流向，调试困难 |
| 适合小范围、临时性的通信 | 容易形成"事件 spaghetti" |
| 解耦发送方和接收方 | 必须手动管理订阅/取消订阅，容易内存泄漏 |

**什么时候用，什么时候不用：**

- **可以用**：两个距离较远、但逻辑上有关联的组件，且通信频率不高
- **不要用**：组件层级简单、可以用 props/emit 解决；或者通信逻辑复杂、需要状态持久化

### 3.3 Provide / Inject：跨层级传值的"秘密通道"

当数据需要从祖先组件传递给深层嵌套的后代组件时，逐层传递 props 会非常繁琐。Vue 的 Provide / Inject 机制可以解决这个问题。

**使用场景：**

- 主题配置（深色/浅色模式）
- 用户信息（当前登录用户）
- 国际化配置
- 表单控件之间的通信

**代码示例：**

```vue
<!-- 祖先组件：App.vue -->
<template>
  <div :class="['app', theme]">
    <!-- 深层嵌套的组件树 -->
    <Layout>
      <Sidebar>
        <Menu>
          <MenuItem v-for="item in menuItems" :key="item.id" />
        </Menu>
      </Sidebar>
      <MainContent>
        <RouterView />
      </MainContent>
    </Layout>
  </div>
</template>

<script>
import { provide, ref } from 'vue'

export default {
  setup() {
    // 响应式的主题配置
    const theme = ref('light')
    const userInfo = ref({
      id: 123,
      name: '张三',
      role: 'admin'
    })

    // 切换主题的方法
    const toggleTheme = () => {
      theme.value = theme.value === 'light' ? 'dark' : 'light'
    }

    // 提供给后代组件
    provide('theme', theme)
    provide('userInfo', userInfo)
    provide('toggleTheme', toggleTheme)

    return { theme }
  }
}
</script>
```

```vue
<!-- 深层后代组件：MenuItem.vue（可能是第 5+ 层嵌套） -->
<template>
  <div :class="['menu-item', theme]">
    <span class="icon">{{ icon }}</span>
    <span class="label">{{ label }}</span>

    <!-- 管理员才能看到设置按钮 -->
    <button
      v-if="userInfo?.role === 'admin'"
      class="settings-btn"
      @click="openSettings"
    >
      设置
    </button>
  </div>
</template>

<script>
import { inject } from 'vue'

export default {
  props: {
    icon: String,
    label: String
  },
  setup() {
    // 注入祖先提供的数据
    const theme = inject('theme', 'light') // 提供默认值
    const userInfo = inject('userInfo', {})

    const openSettings = () => {
      console.log('打开设置，当前主题:', theme.value)
    }

    return { theme, userInfo, openSettings }
  }
}
</script>
```

**Provide / Inject 的特点：**

| 优点 | 缺点 |
| :--- | :--- |
| 解决跨层级通信问题，无需逐层传递 props | 破坏了组件的封装性，难以追踪数据来源 |
| 适合提供全局配置、主题、用户上下文等 | 过度使用会导致组件间耦合严重 |
| 与响应式系统配合良好 | 不适合频繁变化的数据（如表单输入） |

**使用建议：**

- **适合**：主题、语言、当前用户、全局配置等相对稳定的数据
- **不适合**：频繁变化的业务数据、组件间复杂的交互逻辑

---

## 4. 状态管理的"进化论"

前面我们讲了组件之间的通信方式，但当应用规模进一步扩大，单纯依靠组件自身的机制已经不够用了。这时候就需要专门的状态管理方案。

### 4.1 为什么需要专门的状态管理？

<StateManagementComparisonDemo />

让我们看一个典型的购物车场景：

**没有状态管理时的问题：**

```javascript
// 问题1：状态分散在各个组件
// Header.vue 有自己的 cartCount
// CartPage.vue 有自己的 cartItems
// ProductDetail.vue 也有自己的 localCart

// 问题2：同步困难
// 在 ProductDetail 添加商品到购物车
// Header 的购物车数量不会自动更新

// 问题3：数据不一致
// 用户在 CartPage 删除了商品
// 但 ProductDetail 的"已加入购物车"按钮还是选中状态

// 问题4：难以持久化
// 用户刷新页面，购物车数据丢失
```

**有状态管理时的好处：**

```javascript
// 1. 单一数据源
// 整个应用只有一份购物车状态
const store = {
  cart: {
    items: [],
    selectedIds: []
  }
}

// 2. 响应式同步
// 任何地方修改购物车，所有相关组件自动更新

// 3. 状态可追溯
// 每次修改都有记录，可以调试、回滚

// 4. 易于持久化
// 可以方便地保存到 localStorage 或服务器
```

### 4.2 状态管理的核心概念

无论你选择哪种状态管理方案，以下概念都是通用的：

| 概念 | 解释 | 类比 |
| :--- | :--- | :--- |
| **State** | 应用的状态数据 | 数据库中的数据 |
| **Getter** | 从 state 派生的计算属性 | SQL 查询视图 |
| **Mutation** | 修改 state 的唯一方式（同步） | 数据库事务 |
| **Action** | 提交 mutation 的方法（可异步） | 业务逻辑层 |
| **Store** | 容纳以上所有内容的对象 | 数据库实例 |

### 4.3 主流状态管理库对比

<StateManagementComparisonDemo />

| 特性 | Redux | Vuex | Pinia | MobX | Zustand | Jotai |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **框架** | React | Vue | Vue | React/Vue | React | React |
| **学习曲线** | 陡峭 | 中等 | 平缓 | 中等 | 平缓 | 平缓 |
| **样板代码** | 多 | 中等 | 少 | 少 | 极少 | 极少 |
| **TypeScript** | 良好 | 良好 | 优秀 | 良好 | 优秀 | 优秀 |
| **中间件支持** | 丰富 | 有 | 无 | 无 | 无 | 无 |
| **适用场景** | 大型应用 | 中大型 Vue 应用 | 中小型 Vue 应用 | 中大型应用 | 中小型应用 | 原子化状态 |

---

## 5. 各框架状态管理详解

### 5.1 Redux：严格而强大的状态管理

<ReduxFlowDemo />

Redux 是 React 生态中最经典的状态管理方案，以严格的单向数据流著称。

**核心原则：**

1. **单一数据源**：整个应用的 state 存储在一个对象树中
2. **State 只读**：唯一改变 state 的方法是触发 action
3. **使用纯函数修改**：Reducer 必须是纯函数

**代码示例：**

```javascript
// 1. Action Types
const ADD_TODO = 'ADD_TODO'
const TOGGLE_TODO = 'TOGGLE_TODO'

// 2. Action Creators
const addTodo = (text) => ({
  type: ADD_TODO,
  payload: { id: Date.now(), text, completed: false }
})

const toggleTodo = (id) => ({
  type: TOGGLE_TODO,
  payload: { id }
})

// 3. Reducer
const initialState = {
  todos: [],
  filter: 'all' // all, active, completed
}

const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        todos: [...state.todos, action.payload]
      }
    case TOGGLE_TODO:
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload.id
            ? { ...todo, completed: !todo.completed }
            : todo
        )
      }
    default:
      return state
  }
}

// 4. Store
import { createStore } from 'redux'
const store = createStore(todoReducer)

// 5. 在 React 中使用
import { useSelector, useDispatch } from 'react-redux'

function TodoList() {
  const todos = useSelector(state => state.todos)
  const dispatch = useDispatch()

  return (
    <ul>
      {todos.map(todo => (
        <li
          key={todo.id}
          onClick={() => dispatch(toggleTodo(todo.id))}
          style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
        >
          {todo.text}
        </li>
      ))}
    </ul>
  )
}
```

**Redux 的优缺点：**

| 优点 | 缺点 |
| :--- | :--- |
| 严格的数据流，易于调试 | 样板代码多，学习曲线陡峭 |
| 时间旅行调试（Time Travel） | 简单的状态也需要写很多代码 |
| 丰富的中间件生态（redux-thunk, redux-saga） | 不适合小型项目 |
| 可预测的状态更新 | 需要理解函数式编程概念 |

### 5.2 Vuex 与 Pinia：Vue 生态的状态管理双雄

<VuexPiniaDemo />

#### 5.2.1 Vuex：经典的选择

Vuex 是 Vue 2 时代的官方状态管理库，设计理念与 Redux 类似，但更贴合 Vue 的响应式系统。

**核心概念：**

```javascript
// store/index.js
import { createStore } from 'vuex'

export default createStore({
  // State: 存储应用的状态数据
  state: {
    user: null,
    cart: {
      items: [],
      selectedIds: []
    },
    theme: 'light'
  },

  // Getters: 从 state 派生的计算属性
  getters: {
    isLoggedIn: state => !!state.user,
    cartTotal: state => {
      return state.cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
    },
    cartItemCount: state => {
      return state.cart.items.reduce((count, item) => count + item.quantity, 0)
    }
  },

  // Mutations: 修改 state 的唯一方式（必须是同步的）
  mutations: {
    SET_USER(state, user) {
      state.user = user
    },
    ADD_TO_CART(state, product) {
      const existing = state.cart.items.find(item => item.id === product.id)
      if (existing) {
        existing.quantity++
      } else {
        state.cart.items.push({ ...product, quantity: 1 })
      }
    },
    REMOVE_FROM_CART(state, productId) {
      state.cart.items = state.cart.items.filter(item => item.id !== productId)
    },
    SET_THEME(state, theme) {
      state.theme = theme
    }
  },

  // Actions: 提交 mutation 的方法（可以包含异步操作）
  actions: {
    // 用户登录
    async login({ commit }, credentials) {
      try {
        const response = await fetch('/api/login', {
          method: 'POST',
          body: JSON.stringify(credentials)
        })
        const user = await response.json()
        commit('SET_USER', user)
        return { success: true }
      } catch (error) {
        return { success: false, error: error.message }
      }
    },

    // 添加到购物车（可能涉及 API 调用）
    async addToCart({ commit, state }, product) {
      // 先乐观更新 UI
      commit('ADD_TO_CART', product)

      try {
        // 同步到服务器
        await fetch('/api/cart', {
          method: 'POST',
          body: JSON.stringify({
            productId: product.id,
            quantity: 1
          })
        })
      } catch (error) {
        // 如果失败，回滚状态
        commit('REMOVE_FROM_CART', product.id)
        throw error
      }
    }
  },

  // Modules: 将 store 分割成模块
  modules: {
    user: {
      namespaced: true,
      state: () => ({
        profile: null,
        preferences: {}
      }),
      mutations: {
        SET_PROFILE(state, profile) {
          state.profile = profile
        }
      }
    },
    cart: {
      namespaced: true,
      state: () => ({
        items: [],
        selectedIds: []
      }),
      getters: {
        total: state => state.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
      }
    }
  }
})
```

**在组件中使用 Vuex：**

```vue
<template>
  <div class="cart">
    <span>购物车 ({{ cartItemCount }})</span>
    <span>总计: ¥{{ cartTotal }}</span>
    <button @click="addItem">添加商品</button>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    // 方式1：使用辅助函数
    ...mapState(['user']),
    ...mapGetters(['cartTotal', 'cartItemCount']),

    // 方式2：使用命名空间模块
    ...mapState('cart', ['items']),

    // 方式3：直接访问（适合简单场景）
    userName() {
      return this.$store.state.user?.name
    }
  },
  methods: {
    ...mapActions(['addToCart']),

    async addItem() {
      await this.addToCart({ id: 1, name: '商品A', price: 100 })
    }
  }
}
</script>
```

#### 5.2.2 Pinia：新一代的优雅之选

Pinia 是 Vue 团队官方推荐的新一代状态管理库，专为 Vue 3 设计，但也支持 Vue 2。

**Pinia 相比 Vuex 的优势：**

| 特性 | Vuex | Pinia |
| :--- | :--- | :--- |
| 语法 | 选项式 API | 组合式 API（更现代） |
| 类型支持 | 需要额外配置 | 原生 TypeScript 支持 |
| 代码量 | 需要 mutations、actions 分开 | 更简洁，直接修改 state |
| 模块化 | 需要 namespaced | 自动模块化 |
| 开发工具 | 支持 | 支持，且体验更好 |

**Pinia 代码示例：**

```javascript
// stores/counter.js
import { defineStore } from 'pinia'

// 方式1：选项式 API（类似 Vuex）
export const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 0,
    name: '计数器'
  }),
  getters: {
    doubleCount: (state) => state.count * 2,
    // 可以访问其他 getter
    doubleCountPlusOne() {
      return this.doubleCount + 1
    }
  },
  actions: {
    increment() {
      this.count++
    },
    async fetchCount() {
      const response = await fetch('/api/count')
      const data = await response.json()
      this.count = data.count
    }
  }
})

// 方式2：组合式 API（推荐，更符合 Vue3 风格）
import { ref, computed } from 'vue'

export const useCartStore = defineStore('cart', () => {
  // State
  const items = ref([])
  const selectedIds = ref([])

  // Getters
  const totalCount = computed(() =>
    items.value.reduce((sum, item) => sum + item.quantity, 0)
  )

  const totalPrice = computed(() =>
    items.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
  )

  // Actions
  function addItem(product) {
    const existing = items.value.find(item => item.id === product.id)
    if (existing) {
      existing.quantity++
    } else {
      items.value.push({ ...product, quantity: 1 })
    }
  }

  function removeItem(productId) {
    items.value = items.value.filter(item => item.id !== productId)
  }

  async function checkout() {
    // 调用支付 API
    const response = await fetch('/api/checkout', {
      method: 'POST',
      body: JSON.stringify({ items: items.value })
    })
    if (response.ok) {
      items.value = [] // 清空购物车
    }
  }

  return {
    items,
    selectedIds,
    totalCount,
    totalPrice,
    addItem,
    removeItem,
    checkout
  }
})
```

**在组件中使用 Pinia：**

```vue
<template>
  <div class="cart-page">
    <h2>购物车 ({{ cart.totalCount }})</h2>

    <div v-for="item in cart.items" :key="item.id" class="cart-item">
      <span>{{ item.name }}</span>
      <span>¥{{ item.price }} x {{ item.quantity }}</span>
      <button @click="cart.removeItem(item.id)">删除</button>
    </div>

    <div class="cart-summary">
      <p>总计: ¥{{ cart.totalPrice }}</p>
      <button @click="cart.checkout" :disabled="cart.items.length === 0">
        结算
      </button>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from '@/stores/cart'

// 直接获取 store 实例，所有属性和方法都是响应式的
const cart = useCartStore()
</script>
```

**Vuex vs Pinia 的选择建议：**

- **新项目**：直接选择 Pinia，官方推荐，体验更好
- **Vue 2 老项目**：可以继续使用 Vuex，或者迁移到 Pinia（Pinia 支持 Vue 2）
- **大型项目需要中间件**：如果依赖 Redux 生态的中间件（如 redux-saga），可以考虑 Redux

### 5.3 MobX：响应式编程的魔法

<MobxReactivityDemo />

MobX 是一个基于响应式编程（Reactive Programming）的状态管理库，通过自动追踪依赖来实现状态更新。

**核心概念：**

```javascript
import { makeAutoObservable } from 'mobx'

class TodoStore {
  todos = []
  filter = 'all' // all, active, completed

  constructor() {
    // 自动将所有属性和方法转为响应式
    makeAutoObservable(this)
  }

  // 计算属性（自动追踪依赖）
  get filteredTodos() {
    switch (this.filter) {
      case 'active':
        return this.todos.filter(t => !t.completed)
      case 'completed':
        return this.todos.filter(t => t.completed)
      default:
        return this.todos
    }
  }

  get stats() {
    return {
      total: this.todos.length,
      active: this.todos.filter(t => !t.completed).length,
      completed: this.todos.filter(t => t.completed).length
    }
  }

  // Action：修改状态
  addTodo(text) {
    this.todos.push({
      id: Date.now(),
      text,
      completed: false
    })
  }

  toggleTodo(id) {
    const todo = this.todos.find(t => t.id === id)
    if (todo) {
      todo.completed = !todo.completed
    }
  }

  removeTodo(id) {
    this.todos = this.todos.filter(t => t.id !== id)
  }

  setFilter(filter) {
    this.filter = filter
  }
}

// 创建 store 实例
const todoStore = new TodoStore()
export default todoStore
```

**在 React 中使用：**

```jsx
import { observer } from 'mobx-react-lite'
import todoStore from './TodoStore'

// 使用 observer 包裹组件，使其自动追踪使用的状态
const TodoList = observer(() => {
  return (
    <div>
      <div className="filters">
        {['all', 'active', 'completed'].map(filter => (
          <button
            key={filter}
            onClick={() => todoStore.setFilter(filter)}
            className={todoStore.filter === filter ? 'active' : ''}
          >
            {filter}
          </button>
        ))}
      </div>

      <ul>
        {todoStore.filteredTodos.map(todo => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => todoStore.toggleTodo(todo.id)}
            />
            <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
              {todo.text}
            </span>
            <button onClick={() => todoStore.removeTodo(todo.id)}>删除</button>
          </li>
        ))}
      </ul>

      <div className="stats">
        总计: {todoStore.stats.total} |
        进行中: {todoStore.stats.active} |
        已完成: {todoStore.stats.completed}
      </div>
    </div>
  )
})
```

**MobX 的优缺点：**

| 优点 | 缺点 |
| :--- | :--- |
| 自动追踪依赖，无需手动优化 | 魔法般的响应式可能让人困惑 |
| 代码量少，接近原生 JavaScript | 装饰器语法需要额外配置 |
| 面向对象风格，易于理解 | 调试工具不如 Redux 强大 |
| 性能优秀，只更新需要的组件 | 大型团队需要约定规范 |

### 5.4 Zustand 与 Jotai：轻量级的新星

<ZustandJotaiDemo />

#### 5.4.1 Zustand：极简主义的选择

Zustand（德语"状态"）是一个轻量级的状态管理库，核心代码只有几百行。

**基本用法：**

```javascript
import { create } from 'zustand'

// 创建 store
const useStore = create((set, get) => ({
  // State
  bears: 0,
  fish: 100,

  // Actions
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),

  // 使用 get 访问当前状态
  eatFish: () => {
    const { fish, bears } = get()
    if (fish > 0) {
      set({ fish: fish - 1, bears: bears + 0.1 })
    }
  },

  // 异步 action
  fetchBears: async () => {
    const response = await fetch('/api/bears')
    const bears = await response.json()
    set({ bears })
  }
}))

// 在 React 组件中使用
function BearCounter() {
  // 只订阅需要的字段，实现细粒度更新
  const bears = useStore((state) => state.bears)
  const increase = useStore((state) => state.increasePopulation)

  return (
    <div>
      <h1>{bears} bears around here...</h1>
      <button onClick={increase}>Add bear</button>
    </div>
  )
}
```

**Zustand 的优势：**

1. **极简 API**：核心只有 `create`、`set`、`get` 三个概念
2. **无需 Provider**：没有 Context 的包裹问题
3. **细粒度订阅**：组件只订阅需要的状态片段
4. **中间件支持**：持久化、日志、 immer 等

```javascript
// 使用中间件
import { persist, createJSONStorage } from 'zustand/middleware'

const useStore = create(
  persist(
    (set, get) => ({
      bears: 0,
      increase: () => set((state) => ({ bears: state.bears + 1 }))
    }),
    {
      name: 'bear-storage', // localStorage 的 key
      storage: createJSONStorage(() => localStorage)
    }
  )
)
```

#### 5.4.2 Jotai：原子化的状态管理

Jotai 采用"原子（Atom）"的概念来管理状态，灵感来自 Recoil。

**核心概念：**

```javascript
import { atom, useAtom } from 'jotai'

// 定义原子状态
const countAtom = atom(0)

// 派生原子（类似 computed）
const doubledCountAtom = atom((get) => get(countAtom) * 2)

// 可写派生原子
const incrementAtom = atom(
  (get) => get(countAtom),
  (get, set, update) => {
    set(countAtom, get(countAtom) + update)
  }
)

// 在组件中使用
function Counter() {
  const [count, setCount] = useAtom(countAtom)
  const [doubled] = useAtom(doubledCountAtom)
  const [, increment] = useAtom(incrementAtom)

  return (
    <div>
      <p>Count: {count}</p>
      <p>Doubled: {doubled}</p>
      <button onClick={() => setCount(c => c + 1)}>+1</button>
      <button onClick={() => increment(5)}>+5</button>
    </div>
  )
}
```

**Jotai 的特点：**

1. **原子化**：状态拆分成独立的小单元，按需组合
2. **细粒度更新**：只有订阅的原子变化时才重渲染
3. **派生状态**：类似 computed，自动追踪依赖
4. **异步支持**：内置对异步原子的支持

```javascript
// 异步原子
const userAtom = atom(null)

const fetchUserAtom = atom(
  (get) => get(userAtom),
  async (get, set, userId) => {
    const response = await fetch(`/api/users/${userId}`)
    const user = await response.json()
    set(userAtom, user)
  }
)

// 使用
function UserProfile({ userId }) {
  const [user, fetchUser] = useAtom(fetchUserAtom)

  useEffect(() => {
    fetchUser(userId)
  }, [userId])

  if (!user) return <div>Loading...</div>
  return <div>Hello, {user.name}</div>
}
```

---

## 6. 如何选择适合你的状态管理方案？

面对这么多选择，你可能会感到困惑。以下是一些实用的决策建议：

### 6.1 决策树

```
你的项目规模？
├── 小型项目 (< 10 个组件)
│   └── 使用组件自带的状态管理即可
│       （useState / ref）
│
├── 中型项目 (10-50 个组件)
│   ├── 使用 Vue？
│   │   └── Pinia（推荐）或 Vuex
│   └── 使用 React？
│       ├── 需要严格的数据流？→ Redux Toolkit
│       └── 追求简洁？→ Zustand
│
└── 大型项目 (> 50 个组件，多团队协作)
    ├── 使用 Vue？
    │   ├── 需要严格规范？→ Vuex + Modules
    │   └── 追求开发效率？→ Pinia
    ├── 使用 React？
    │   ├── 企业级应用？→ Redux + Redux Toolkit
    │   ├── 需要细粒度控制？→ Recoil / Jotai
    │   └── 追求简洁？→ Zustand
    └── 跨框架需求？
        └── 考虑 RxJS 或原生事件机制
```

### 6.2 各方案适用场景速查表

| 如果你... | 推荐方案 | 理由 |
| :--- | :--- | :--- |
| 刚开始学 Vue 3 | Pinia | 官方推荐，语法简单，TypeScript 支持好 |
| 维护 Vue 2 老项目 | Vuex | 稳定成熟，生态丰富 |
| 做企业级 React 项目 | Redux Toolkit | 规范严格，调试工具强大 |
| 做中小型 React 项目 | Zustand | 极简，无样板代码 |
| 需要原子化状态管理 | Jotai / Recoil | 细粒度控制，派生状态强大 |
| 喜欢面向对象风格 | MobX | 自动追踪依赖，代码直观 |
| 追求极致性能 | 原生 Context + useReducer | 零依赖，完全可控 |

### 6.3 避坑指南

**不要这样用：**

```javascript
// ❌ 错误：直接修改 state
store.state.user.name = '李四'

// ❌ 错误：在组件外修改 state
setTimeout(() => {
  store.count++
}, 1000)

// ❌ 错误：在 getter 中修改 state
getters: {
  doubleCount(state) {
    state.count *= 2  // 副作用！
    return state.count
  }
}

// ❌ 错误：不取消事件监听
export default {
  created() {
    EventBus.$on('event', this.handler)
  }
  // 忘记在 beforeUnmount 中取消订阅
}
```

**推荐这样用：**

```javascript
// ✅ 正确：通过 mutation/action 修改 state
store.commit('SET_USER_NAME', '李四')
// 或 Pinia：
store.userName = '李四'  // Pinia 允许直接修改，因为它底层已经处理了响应式

// ✅ 正确：在 action 中处理异步
actions: {
  async fetchUser({ commit }) {
    const user = await api.getUser()
    commit('SET_USER', user)
  }
}

// ✅ 正确：getter 是纯函数
getters: {
  doubleCount: (state) => state.count * 2
}

// ✅ 正确：及时取消订阅
export default {
  created() {
    this.unsubscribe = store.$subscribe((mutation, state) => {
      console.log(mutation, state)
    })
  },
  beforeUnmount() {
    this.unsubscribe()
  }
}
```

---

## 7. 实战：电商购物车状态管理设计

让我们综合运用前面的知识，设计一个电商购物车系统的状态管理方案。

### 7.1 需求分析

- 商品列表页可以添加商品到购物车
- 购物车页面可以查看、修改数量、删除商品
- 头部导航显示购物车商品数量
- 支持选择/取消选择商品，计算选中商品总价
- 支持全选/取消全选
- 数据持久化到 localStorage

### 7.2 状态设计（Pinia）

```javascript
// stores/cart.js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCartStore = defineStore('cart', () => {
  // ============ State ============
  const items = ref([])
  const selectedIds = ref([])
  const isLoading = ref(false)
  const error = ref(null)

  // 从 localStorage 恢复数据
  const initFromStorage = () => {
    const stored = localStorage.getItem('cart')
    if (stored) {
      try {
        const data = JSON.parse(stored)
        items.value = data.items || []
        selectedIds.value = data.selectedIds || []
      } catch (e) {
        console.error('Failed to parse cart data:', e)
      }
    }
  }

  // 持久化到 localStorage
  const persist = () => {
    localStorage.setItem('cart', JSON.stringify({
      items: items.value,
      selectedIds: selectedIds.value
    }))
  }

  // ============ Getters ============
  const itemCount = computed(() =>
    items.value.reduce((sum, item) => sum + item.quantity, 0)
  )

  const totalPrice = computed(() =>
    items.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
  )

  // 选中商品相关计算
  const selectedItems = computed(() =>
    items.value.filter(item => selectedIds.value.includes(item.id))
  )

  const selectedTotalPrice = computed(() =>
    selectedItems.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
  )

  const isAllSelected = computed(() =>
    items.value.length > 0 && selectedIds.value.length === items.value.length
  )

  // ============ Actions ============
  const addItem = (product) => {
    const existing = items.value.find(item => item.id === product.id)
    if (existing) {
      existing.quantity += product.quantity || 1
    } else {
      items.value.push({
        ...product,
        quantity: product.quantity || 1
      })
    }
    persist()
  }

  const updateQuantity = (productId, quantity) => {
    const item = items.value.find(item => item.id === productId)
    if (item) {
      if (quantity <= 0) {
        removeItem(productId)
      } else {
        item.quantity = quantity
        persist()
      }
    }
  }

  const removeItem = (productId) => {
    items.value = items.value.filter(item => item.id !== productId)
    selectedIds.value = selectedIds.value.filter(id => id !== productId)
    persist()
  }

  const toggleSelection = (productId) => {
    const index = selectedIds.value.indexOf(productId)
    if (index > -1) {
      selectedIds.value.splice(index, 1)
    } else {
      selectedIds.value.push(productId)
    }
    persist()
  }

  const toggleSelectAll = () => {
    if (isAllSelected.value) {
      selectedIds.value = []
    } else {
      selectedIds.value = items.value.map(item => item.id)
    }
    persist()
  }

  const clearCart = () => {
    items.value = []
    selectedIds.value = []
    persist()
  }

  // 初始化
  initFromStorage()

  return {
    // State
    items,
    selectedIds,
    isLoading,
    error,
    // Getters
    itemCount,
    totalPrice,
    selectedItems,
    selectedTotalPrice,
    isAllSelected,
    // Actions
    addItem,
    updateQuantity,
    removeItem,
    toggleSelection,
    toggleSelectAll,
    clearCart
  }
})
```

### 7.3 组件中使用

```vue
<!-- CartIcon.vue -->
<template>
  <div class="cart-icon" @click="goToCart">
    <i class="icon-cart"></i>
    <span v-if="cart.itemCount > 0" class="badge">
      {{ cart.itemCount }}
    </span>
  </div>
</template>

<script setup>
import { useCartStore } from '@/stores/cart'

const cart = useCartStore()

const goToCart = () => {
  router.push('/cart')
}
</script>
```

```vue
<!-- ProductCard.vue -->
<template>
  <div class="product-card">
    <img :src="product.image" :alt="product.name" />
    <h3>{{ product.name }}</h3>
    <p class="price">¥{{ product.price }}</p>
    <button @click="addToCart" :disabled="isInCart">
      {{ isInCart ? '已加入' : '加入购物车' }}
    </button>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useCartStore } from '@/stores/cart'

const props = defineProps({
  product: Object
})

const cart = useCartStore()

const isInCart = computed(() =>
  cart.items.some(item => item.id === props.product.id)
)

const addToCart = () => {
  cart.addItem({
    id: props.product.id,
    name: props.product.name,
    price: props.product.price,
    image: props.product.image
  })
}
</script>
```

---

## 8. 名词对照表

| 英文术语 | 中文对照 | 解释 |
| :--- | :--- | :--- |
| **State** | 状态 | 应用的数据存储，是状态管理的核心。 |
| **Props** | 属性 | 父组件向子组件传递数据的方式。 |
| **Event/Action** | 事件/动作 | 组件通知父组件或触发状态变更的方式。 |
| **Store** | 存储/仓库 | 集中管理状态的对象。 |
| **Getter** | 获取器 | 从 state 派生的计算属性。 |
| **Mutation** | 变更 | Vuex 中修改 state 的唯一方式，必须是同步的。 |
| **Reducer** | 归约器 | Redux 中处理 state 更新的纯函数。 |
| **Dispatch** | 派发 | 触发 action 或 mutation 的操作。 |
| **Subscribe** | 订阅 | 监听状态变化的操作。 |
| **Reactive** | 响应式 | 数据变化自动触发更新的机制。 |
| **Computed** | 计算属性 | 基于其他状态派生的状态。 |
| **Module** | 模块 | 将 store 分割成多个子模块的方式。 |
| **Namespaced** | 命名空间 | 模块内部的 action/mutation 自动带命名前缀。 |
| **Hydration** | 注水 | SSR 中将服务端状态同步到客户端的过程。 |
| **Time Travel** | 时间旅行 | Redux DevTools 中回溯状态变化的功能。 |

---

## 总结

状态管理是前端开发中永恒的话题。从简单的 props 传递到复杂的全局状态管理，没有银弹，只有适合当前场景的方案。

**记住这些核心原则：**

1. **从简单开始**：不要过早引入复杂的状态管理库，props 和 emit 能解决大部分问题。
2. **状态往上提**：共享状态尽量放在共同的父组件或状态管理库中。
3. **单一数据源**：避免同一份数据在多个地方存储。
4. **不可变性**：修改状态时创建新对象，而不是直接修改原对象。
5. **按需选择**：根据团队技术栈和项目规模选择合适的方案。

**不同场景的选择建议：**

- **小型项目**：props / emit + Provide / Inject
- **中型 Vue 项目**：Pinia
- **中型 React 项目**：Zustand 或 React Query
- **大型项目**：Redux Toolkit、Vuex/Pinia + 严格规范
- **需要细粒度控制**：MobX、Jotai、Recoil

希望这篇指南能帮助你在面对复杂的状态管理问题时，做出明智的选择。
