# Vue 组件开发规范（避免 Build 卡住）

本文档记录了在开发 VitePress 主题组件时需要注意的问题，以防止 `npm run build` 时进程卡住无法退出。

---

## 问题描述

当 Vue 组件在模块加载时立即执行定时器（如 `setInterval`、`setTimeout`）或启动持续运行的逻辑时，VitePress 的 build 进程会卡住，无法正常退出。

---

## 常见原因

### 1. 在组件顶层直接调用启动函数

```javascript
// ❌ 错误示例
function startTimer() {
  timer = setInterval(() => { ... }, 1000)
}

startTimer() // 模块加载时立即执行，导致 build 卡住
```

**解决方案**：不要在组件顶层直接调用启动函数，让用户交互触发。

---

### 2. 使用 `setInterval` 但未清理

```javascript
// ❌ 错误示例
let timer = setInterval(() => { ... }, 1000)
```

**解决方案**：
- 使用 `onUnmounted` 清理定时器
- 不要在模块加载时启动定时器

---

## 正确示例

### 按钮触发启动

```vue
<script setup>
import { ref, onUnmounted } from 'vue'

const running = ref(false)
let timer = null

function start() {
  running.value = true
  timer = setInterval(() => { ... }, 1000)
}

function stop() {
  running.value = false
  if (timer) clearInterval(timer)
}

onUnmounted(() => {
  if (timer) clearInterval(timer)
})
</script>

<template>
  <button @click="start" :disabled="running">开始</button>
  <button @click="stop">停止</button>
</template>
```

---

### 初始化状态使用 ref，不用立即启动定时器

```vue
<script setup>
import { ref } from 'vue'

// ❌ 不要这样
// reset() // 这会启动定时器

// ✅ 正确：初始化为静态值
const passed = ref(0)
const rejected = ref(0)
const tokens = ref(5) // 初始令牌数，不启动补充
</script>
```

---

## 排查步骤

如果 build 卡住：

1. **检查组件末尾是否有立即执行的函数调用**
2. **搜索 `setInterval`、`setTimeout`**：确认是否在用户交互时才调用
3. **添加 `onUnmounted` 清理**：确保组件卸载时清理定时器
4. **逐个注释组件**：锁定问题组件后，逐行排查

---

## 归档组件修复记录

| 组件 | 问题 | 修复方式 |
|------|------|----------|
| `RateLimitAlgorithmDemo.vue` | 模块加载时调用 `reset()` 启动定时器 | 移除末尾的 `reset()` 调用 |

---

## 相关文件

- `docs/.vitepress/theme/index.js` - 组件注册文件
- `docs/archived-components.md` - 已归档的组件列表

