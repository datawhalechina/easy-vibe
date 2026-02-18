# TypeScript 深度指南

::: tip 前言
你已经会写 JavaScript 了，但可能遇到过这些问题：
- 变量赋值了错误类型，运行时才发现
- 对象属性写错了名字，调试半天
- 函数参数类型不对，改来改去

TypeScript 就是在代码运行前帮你发现这些问题的工具。读完这篇，你就能理解 TypeScript 为什么能提升代码质量，看懂类型注解、接口、泛型等核心概念，在 vibecoding 中更好地利用 AI 生成的代码。
:::

**这篇文章会带你学什么？**

| 章节 | 内容 | 学完能干嘛 |
|-----|------|-----------|
| **第 1 章** | TypeScript 是什么 | 明白它和 JavaScript 的关系 |
| **第 2 章** | 基础类型注解 | 知道怎么给变量标注类型 |
| **第 3 章** | 对象类型与接口 | 定义数据结构的类型 |
| **第 4 章** | 函数类型 | 给函数参数和返回值标注类型 |
| **第 5 章** | 泛型 | 编写可复用的类型安全代码 |
| **第 6 章** | 类型推断与实用技巧 | 知道何时需要显式注解 |

---

## 1. TypeScript 是什么

::: tip 🤔 核心问题
**JavaScript 已经够用了，为什么还需要 TypeScript？** 多学一门语法值得吗？
:::

### 1.1 从"运行时出错"到"编译时发现"

<div style="display: flex; gap: 20px; margin: 20px 0;">
<div style="flex: 1; padding: 16px; border: 1px solid #e4e7ed; border-radius: 12px;">

**🔴 JavaScript 的痛点**
- 运行时才发现类型错误
- 拼写错误难以察觉
- 重构时容易遗漏
- IDE 提示不够准确

*就像没有拼写检查的文档编辑器*

</div>
<div style="flex: 1; padding: 16px; border: 1px solid #e4e7ed; border-radius: 12px;">

**✅ TypeScript 的优势**
- 写代码时就发现错误
- 智能提示更准确
- 重构更安全
- 代码更易维护

*就像有拼写检查和语法高亮的编辑器*

</div>
</div>

**用一句话理解两者的关系：**

| 技术 | 比喻 | 作用 |
|------|------|------|
| **JavaScript** | 原始材料 | 可以直接运行的代码 |
| **TypeScript** | 蓝图 + 质检 | 给 JavaScript 加类型检查，最后编译成 JavaScript |

### 1.2 为什么 vibecoding 也需要 TypeScript？

::: warning AI 写代码也会出错
一位开发者用 AI 生成了一个用户管理功能。AI 写的 JavaScript 代码能运行，但有个问题：用户年龄应该是数字，但有时候会被错误地赋值为字符串。

结果在计算"是否成年"时，字符串 "25" 被当成字符串处理，导致判断失败。这个 bug 隐藏了很久，直到某个用户输入了非数字字符才暴露出来。

如果用 TypeScript，这段代码在写的时候就会报错：`不能将类型 "string" 分配给类型 "number"`。

**这就是 TypeScript 的价值——在 AI 写错类型时，你能第一时间发现。**
:::

### 1.3 TypeScript 实际上是这样的

TypeScript 不是一门全新的语言，它只是 JavaScript 的"超集"：

```typescript
// 这是有效的 JavaScript，也是有效的 TypeScript
const name = "张三"
const age = 25
function greet(user) {
  return `Hello ${user}`
}

// 这是 TypeScript 特有的类型注解
const name2: string = "李四"
const age2: number = 30
function greet2(user: string): string {
  return `Hello ${user}`
}
```

**关键理解：**
- 所有 JavaScript 代码都是有效的 TypeScript 代码
- TypeScript 添加了可选的**类型注解**
- TypeScript 最终会编译成 JavaScript 运行

::: info 💡 核心启示
TypeScript 不会改变代码的运行方式，它只是在编译时帮你检查类型是否正确。**你可以渐进地采用 TypeScript**——从给关键变量添加类型开始。
:::

---

## 2. 基础类型注解

::: tip 🤔 核心问题
**怎么告诉 TypeScript 一个变量应该是什么类型？** 类型注解的语法是怎样的？
:::

### 2.1 类型注解语法

类型注解就是在变量名后面加上`: 类型`：

```typescript
// 语法：变量名: 类型 = 值
const name: string = "张三"
let age: number = 25
let isStudent: boolean = true
```

👇 **动手试试看**：给变量添加类型注解

<TypeAnnotationDemo />

::: details 🔍 为什么有些地方不需要类型注解？
TypeScript 可以根据赋值自动推断类型：

```typescript
// 这些不需要类型注解，TypeScript 能自动推断
const name = "张三"      // 推断为 string
const age = 25          // 推断为 number
const isActive = true   // 推断为 boolean

// 这些情况需要显式注解
let data  // ❌ 错误：不能推断类型
let data: any  // ✅ 可以，但失去了类型检查的好处

function add(a, b) {  // ❌ 参数类型不明确
  return a + b
}

function add2(a: number, b: number): number {  // ✅ 类型明确
  return a + b
}
```
:::

### 2.2 基本类型

TypeScript 支持所有 JavaScript 的基本类型：

| 类型 | 说明 | 示例 |
|------|------|------|
| `string` | 字符串 | `"hello"`, `'你好'` |
| `number` | 数字（整数和小数） | `42`, `3.14` |
| `boolean` | 布尔值 | `true`, `false` |
| `null` / `undefined` | 空值 | `null`, `undefined` |
| `array` | 数组 | `number[]`, `string[]` |
| `object` | 对象 | `{ name: string; age: number }` |

**数组类型的两种写法：**

```typescript
// 写法 1：类型[]（更常用）
const numbers: number[] = [1, 2, 3, 4, 5]
const names: string[] = ["张三", "李四", "王五"]

// 写法 2：Array<类型>
const numbers2: Array<number> = [1, 2, 3, 4, 5]
const names2: Array<string> = ["张三", "李四", "王五"]
```

**特殊类型：**

```typescript
// any：任意类型（慎用，相当于关闭类型检查）
let data: any = 42
data = "现在可以是字符串"
data = { name: "张三" }  // 也可以是对象

// unknown：类型安全的 any
let value: unknown = 42
// if (typeof value === "number") {
//   console.log(value + 10)  // 需要先检查类型才能用
// }

// void：没有返回值
function log(message: string): void {
  console.log(message)
}

// never：永远不会返回
function error(message: string): never {
  throw new Error(message)
}
```

::: info 💡 识别技巧
- 看到 `: string` → 这是 string 类型的注解
- 看到 `: number[]` → 这是数字数组的注解
- 看到 `: void` → 这个函数没有返回值
:::

---

## 3. 对象类型与接口

::: tip 🤔 核心问题
**怎么定义一个对象的类型？** 对象的属性应该是什么类型？
:::

### 3.1 接口（Interface）：定义对象的"形状"

接口是 TypeScript 中定义对象类型的主要方式：

```typescript
// 定义一个 User 接口
interface User {
  id: number
  name: string
  email: string
  age?: number  // 可选属性
}

// 使用接口
const user: User = {
  id: 1,
  name: "张三",
  email: "zhangsan@example.com",
  age: 25
}

// age 是可选的，可以不提供
const user2: User = {
  id: 2,
  name: "李四",
  email: "lisi@example.com"
}
```

👇 **动手试试看**：创建符合接口定义的对象

<InterfaceDemo />

::: details 🔍 接口的其他特性
```typescript
// 只读属性
interface User {
  readonly id: number  // id 创建后不能修改
  name: string
}

const user: User = {
  id: 1,
  name: "张三"
}

user.id = 2  // ❌ 错误：不能修改只读属性
user.name = "李四"  // ✅ 可以修改

// 函数类型
interface User {
  name: string
  greet: () => string  // greet 是一个函数，返回 string
}

const user: User = {
  name: "张三",
  greet: () => "Hello"
}

// 继承接口
interface Admin extends User {
  permissions: string[]
}

const admin: Admin = {
  name: "管理员",
  greet: () => "Hello Admin",
  permissions: ["read", "write", "delete"]
}
```
:::

### 3.2 类型别名（Type Alias）

除了接口，还可以用 `type` 定义类型别名：

```typescript
// 类型别名
type User = {
  id: number
  name: string
  email: string
}

// 联合类型
type Status = "pending" | "success" | "error"

const status: Status = "success"  // ✅
// const status2: Status = "failed"  // ❌ 错误：不在联合类型中

// 交叉类型（合并多个类型）
type User = {
  id: number
  name: string
}

type Timestamp = {
  createdAt: Date
  updatedAt: Date
}

type UserWithTimestamp = User & Timestamp

const user: UserWithTimestamp = {
  id: 1,
  name: "张三",
  createdAt: new Date(),
  updatedAt: new Date()
}
```

**接口 vs 类型别名：**

| 特性 | interface | type |
|------|-----------|------|
| 扩展 | `extends` | `&` 交叉类型 |
| 重复声明 | 会自动合并 | 会报错 |
| 适用场景 | 对象形状、类 | 联合类型、交叉类型、基本类型别名 |

::: info 💡 识别技巧
- 看到 `interface` → 这是定义对象类型
- 看到 `type` → 这是创建类型别名
- 看到 `?` → 这是可选属性
- 看到 `readonly` → 这是只读属性
:::

---

## 4. 函数类型

::: tip 🤔 核心问题
**怎么给函数的参数和返回值标注类型？**
:::

### 4.1 参数类型与返回值类型

```typescript
// 完整的函数类型注解
function add(a: number, b: number): number {
  return a + b
}

// 箭头函数
const multiply = (a: number, b: number): number => {
  return a * b
}

// 没有返回值
function log(message: string): void {
  console.log(message)
}

// 返回多种类型（联合类型）
function parseInput(input: string): number | string {
  const num = parseFloat(input)
  return isNaN(num) ? input : num
}
```

### 4.2 可选参数与默认参数

```typescript
// 可选参数（用 ? 标记）
function greet(name: string, title?: string): string {
  return title ? `${title} ${name}` : name
}

greet("张三")  // "张三"
greet("张三", "先生")  // "先生 张三"

// 默认参数
function greet2(name: string, title: string = "朋友"): string {
  return `${title} ${name}`
}

greet2("李四")  // "朋友 李四"
greet2("李四", "博士")  // "博士 李四"
```

### 4.3 函数类型作为参数

```typescript
// 接受函数作为参数
function calculate(
  a: number,
  b: number,
  operation: (x: number, y: number) => number
): number {
  return operation(a, b)
}

calculate(10, 5, (x, y) => x + y)  // 15
calculate(10, 5, (x, y) => x * y)  // 50

// 更清晰的写法：先定义函数类型
type Operation = (x: number, y: number) => number

function calculate2(
  a: number,
  b: number,
  operation: Operation
): number {
  return operation(a, b)
}
```

::: info 💡 识别技巧
- 看到 `(a: number, b: number) => number` → 这是函数类型，描述参数和返回值
- 看到 `: void` → 函数没有返回值
- 看到 `?` → 参数是可选的
:::

---

## 5. 泛型

::: tip 🤔 核心问题
**怎么编写能处理多种类型、但保持类型安全的代码？**
:::

### 5.1 泛型的基本概念

泛型让你在定义函数、接口或类时，不预先指定具体的类型，而是在使用时再指定：

```typescript
// 泛型函数：T 是类型变量
function identity<T>(arg: T): T {
  return arg
}

// 使用时明确指定类型
const num1 = identity<number>(42)  // 类型是 number
const str1 = identity<string>("hello")  // 类型是 string

// 类型推断：TypeScript 能自动推断
const num2 = identity(42)  // 推断为 number
const str2 = identity("hello")  // 推断为 string
```

👇 **动手试试看**：使用泛型处理不同类型的数据

<GenericDemo />

### 5.2 泛型约束

限制泛型必须满足某些条件：

```typescript
// 约束 T 必须有 length 属性
interface HasLength {
  length: number
}

function logLength<T extends HasLength>(arg: T): void {
  console.log(arg.length)
}

logLength("hello")  // ✅ 字符串有 length
logLength([1, 2, 3])  // ✅ 数组有 length
// logLength(42)  // ❌ 数字没有 length 属性
```

### 5.3 泛型接口和类

```typescript
// 泛型接口
interface Box<T> {
  value: T
  getValue(): T
}

const numberBox: Box<number> = {
  value: 42,
  getValue: () => 42
}

const stringBox: Box<string> = {
  value: "hello",
  getValue: () => "hello"
}

// 泛型类
class Storage<T> {
  private items: T[] = []

  add(item: T): void {
    this.items.push(item)
  }

  get(index: number): T {
    return this.items[index]
  }
}

const numberStorage = new Storage<number>()
numberStorage.add(1)
numberStorage.add(2)
// numberStorage.add("string")  // ❌ 错误

const stringStorage = new Storage<string>()
stringStorage.add("hello")
// stringStorage.add(1)  // ❌ 错误
```

::: info 💡 识别技巧
- 看到 `<T>` → 这是泛型类型变量
- 看到 `<T extends SomeType>` → 泛型约束
- 看到 `Array<T>` 或 `Promise<T>` → 内置泛型类型
:::

---

## 6. 类型推断与实用技巧

::: tip 🤔 核心问题
**什么时候需要显式类型注解？什么时候可以依赖推断？**
:::

### 6.1 类型推断

TypeScript 能根据上下文自动推断类型：

```typescript
// 变量初始化时的推断
const name = "张三"  // 推断为 string
const age = 25  // 推断为 number
const isActive = true  // 推断为 boolean

// 数组推断
const numbers = [1, 2, 3]  // 推断为 number[]
const mixed = [1, "hello", true]  // 推断为 (number | string | boolean)[]

// 函数返回值推断
function add(a: number, b: number) {
  return a + b  // 推断返回值为 number
}
```

👇 **动手试试看**：观察 TypeScript 如何推断类型

<TypeInferenceDemo />

### 6.2 何时使用显式类型注解

::: details 推荐使用类型推断的场景
```typescript
// ✅ 推荐：简单的字面量赋值
const count = 0
const name = "张三"
const isActive = true

// ✅ 推荐：函数返回值可以推断
function getUserId(user: User) {
  return user.id  // 推断为 number
}
```
:::

::: details 推荐使用显式注解的场景
```typescript
// ✅ 推荐：函数参数（必须）
function add(a: number, b: number) {
  return a + b
}

// ✅ 推荐：对象属性类型不明确
const user: {
  id: number
  name: string
  metadata: Record<string, any>
} = {
  id: 1,
  name: "张三",
  metadata: {}  // 可能推断为 {}，需要明确指定
}

// ✅ 推荐：函数返回类型复杂
function getUser(): User | null {
  // ...
  return null
}

// ✅ 推荐：公共 API
export function calculateTotal(prices: number[]): number {
  return prices.reduce((sum, price) => sum + price, 0)
}
```
:::

### 6.3 类型守卫

在运行时检查类型：

```typescript
// typeof 类型守卫
function processValue(value: string | number) {
  if (typeof value === "string") {
    // 这里 TypeScript 知道 value 是 string
    console.log(value.toUpperCase())
  } else {
    // 这里 TypeScript 知道 value 是 number
    console.log(value * 2)
  }
}

// instanceof 类型守卫
class Dog {
  bark() {
    console.log("汪汪")
  }
}

class Cat {
  meow() {
    console.log("喵喵")
  }
}

function makeSound(animal: Dog | Cat) {
  if (animal instanceof Dog) {
    animal.bark()  // TypeScript 知道这是 Dog
  } else {
    animal.meow()  // TypeScript 知道这是 Cat
  }
}

// 自定义类型守卫
interface User {
  name: string
  email: string
}

function isUser(value: any): value is User {
  return (
    typeof value === "object" &&
    value !== null &&
    typeof value.name === "string" &&
    typeof value.email === "string"
  )
}

function processValue(value: unknown) {
  if (isUser(value)) {
    // 这里 value 是 User
    console.log(value.name)
  }
}
```

### 6.4 实用工具类型

TypeScript 提供了一些内置的工具类型：

```typescript
// Partial：将所有属性变为可选
interface User {
  id: number
  name: string
  email: string
}

type PartialUser = Partial<User>
// 等价于：{ id?: number; name?: string; email?: string }

// Required：将所有属性变为必需
type RequiredUser = Required<PartialUser>
// 等价于：{ id: number; name: number; email: string }

// Pick：只保留指定的属性
type UserBasicInfo = Pick<User, "id" | "name">
// 等价于：{ id: number; name: string }

// Omit：排除指定的属性
type UserWithoutEmail = Omit<User, "email">
// 等价于：{ id: number; name: string }

// Record：创建对象类型
type UserRoles = Record<string, boolean>
// 等价于：{ [key: string]: boolean }
```

---

## 7. 实战技巧：在 vibecoding 中使用 TypeScript

::: tip 🤔 核心问题
**怎么在 AI 辅助开发中更好地利用 TypeScript？**
:::

### 7.1 让 AI 生成类型安全代码

**❌ 不好的提示词：**
```
帮我写一个用户管理功能
```

**✅ 好的提示词：**
```
帮我写一个用户管理功能，使用 TypeScript。

数据结构定义如下：
interface User {
  id: number
  name: string
  email: string
  age: number
}

需要实现：
1. 获取用户列表：返回 User[]
2. 创建用户：接受 Partial<User>，返回 User
3. 更新用户：接受 id 和 Partial<User>，返回 User
4. 删除用户：接受 id，返回 void

请确保所有函数都有完整的类型注解。
```

### 7.2 看懂 TypeScript 错误信息

**常见错误及含义：**

| 错误信息 | 含义 | 解决方法 |
|---------|------|---------|
| `Type 'X' is not assignable to type 'Y'` | 类型 X 不能赋值给类型 Y | 检查类型是否匹配，或进行类型转换 |
| `Property 'X' does not exist on type 'Y'` | 类型 Y 上不存在属性 X | 检查属性名拼写，或定义该属性 |
| `Argument of type 'X' is not assignable to parameter of type 'Y'` | 参数类型不匹配 | 检查函数调用时的参数类型 |
| `Type 'X' is missing the following properties from type 'Y'` | 类型 X 缺少类型 Y 的某些属性 | 补全缺失的属性 |

### 7.3 渐进式采用 TypeScript

如果你有一个 JavaScript 项目，可以渐进地迁移到 TypeScript：

1. **第一步：将文件重命名为 `.ts`**
   ```bash
   # 从 utils.js 改为 utils.ts
   mv utils.js utils.ts
   ```

2. **第二步：修复明显的类型错误**
   ```typescript
   // 如果报错：Parameter 'a' implicitly has an 'any' type
   // 添加类型注解
   function add(a: number, b: number) {
     return a + b
   }
   ```

3. **第三步：逐步添加类型定义**
   ```typescript
   // 先用 any 快速修复
   function processUser(user: any) {
     // ...
   }

   // 后续再完善类型
   interface User {
     id: number
     name: string
   }

   function processUser(user: User) {
     // ...
   }
   ```

4. **第四步：启用更严格的类型检查**
   ```json
   // tsconfig.json
   {
     "compilerOptions": {
       "strict": true,  // 启用严格模式
       "noImplicitAny": true,  // 禁止隐式 any
       "strictNullChecks": true  // 严格空值检查
     }
   }
   ```

---

## 8. 你现在应该能识别的代码

- 看到 `: string` → 这是 string 类型的注解
- 看到 `: number[]` → 这是数字数组的注解
- 看到 `interface User` → 这是定义对象类型
- 看到 `type User =` → 这是类型别名
- 看到 `<T>` → 这是泛型
- 看到 `extends` → 接口继承或泛型约束
- 看到 `?` → 可选属性
- 看到 `readonly` → 只读属性
- 看到 `|` → 联合类型
- 看到 `&` → 交叉类型

**如果你认真读了每章的"深入"部分，你还掌握了这些核心概念：**

- **类型注解**：明确告诉 TypeScript 变量的类型
- **接口**：定义对象的结构和类型
- **泛型**：编写可复用的类型安全代码
- **类型推断**：TypeScript 自动推断类型
- **类型守卫**：运行时检查类型
- **工具类型**：Partial、Required、Pick、Omit 等

::: info 💡 遇到问题时这样跟 AI 说
- "这个函数的类型注解应该怎么写？参数是 X，返回值是 Y"
- "帮我定义一个接口，描述这个数据结构：..."
- "这个 TypeScript 错误是什么意思？怎么修复？"
- "如何给这个泛型函数添加约束，确保 T 必须有某个属性？"
:::
