<template>
  <div class="route-guards-demo">
    <div class="demo-header">
      <h4>路由守卫机制</h4>
      <p class="demo-desc">了解全局守卫、路由独享守卫和组件内守卫的执行顺序和用途</p>
    </div>

    <div class="guards-container">
      <div class="guard-type" v-for="guard in guardTypes" :key="guard.name">
        <div class="guard-header" :class="guard.type">
          <span class="guard-icon">{{ guard.icon }}</span>
          <span class="guard-title">{{ guard.name }}</span>
        </div>
        <div class="guard-content">
          <p class="guard-desc">{{ guard.description }}</p>
          <div class="guard-example">
            <code>{{ guard.example }}</code>
          </div>
        </div>
      </div>
    </div>

    <div class="execution-flow">
      <h5>守卫执行顺序</h5>
      <div class="flow-chart">
        <div class="flow-step" v-for="(step, index) in executionSteps" :key="index">
          <div class="step-number">{{ index + 1 }}</div>
          <div class="step-content">
            <div class="step-name">{{ step.name }}</div>
            <div class="step-desc">{{ step.description }}</div>
          </div>
          <div v-if="index < executionSteps.length - 1" class="flow-arrow">↓</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const guardTypes = [
  {
    name: '全局前置守卫',
    type: 'global',
    icon: '🌍',
    description: '在路由跳转前执行，常用于权限验证、登录检查等',
    example: `router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !isLoggedIn()) {
    next('/login')
  } else {
    next()
  }
})`
  },
  {
    name: '全局解析守卫',
    type: 'global',
    icon: '🔍',
    description: '在导航被确认之前、组件内守卫和异步路由组件被解析之后调用',
    example: `router.beforeResolve((to, from, next) => {
  // 可以在这里做数据预加载
  next()
})`
  },
  {
    name: '全局后置钩子',
    type: 'global',
    icon: '✅',
    description: '在导航完成后执行，不接受 next 函数，不能改变导航',
    example: `router.afterEach((to, from) => {
  // 设置页面标题
  document.title = to.meta.title || '默认标题'
  // 发送页面浏览统计
  analytics.track(to.path)
})`
  },
  {
    name: '路由独享守卫',
    type: 'route',
    icon: '🛣️',
    description: '在单个路由配置中定义，只在进入该路由时触发',
    example: `{
  path: '/admin',
  component: Admin,
  beforeEnter: (to, from, next) => {
    if (!isAdmin()) {
      next('/unauthorized')
    } else {
      next()
    }
  }
}`
  },
  {
    name: '组件内守卫',
    type: 'component',
    icon: '🔧',
    description: '在组件内部定义，可以访问组件实例 this',
    example: `export default {
  beforeRouteEnter(to, from, next) {
    // 在渲染该组件的对应路由被验证前调用
    // 不能获取组件实例 this
    next(vm => {
      // 通过 vm 访问组件实例
    })
  },
  beforeRouteUpdate(to, from, next) {
    // 在当前路由改变，但该组件被复用时调用
    // 可以访问组件实例 this
    this.name = to.params.name
    next()
  },
  beforeRouteLeave(to, from, next) {
    // 在导航离开渲染该组件的对应路由时调用
    // 可以访问组件实例 this
    const answer = window.confirm('确定要离开吗？未保存的更改将丢失。')
    if (answer) {
      next()
    } else {
      next(false)
    }
  }
}`
  }
]

const executionSteps = [
  {
    name: '导航触发',
    description: '用户点击链接或调用 router.push()'
  },
  {
    name: '组件内 beforeRouteLeave',
    description: '在离开的组件中调用，可以取消导航'
  },
  {
    name: '全局 beforeEach',
    description: '全局前置守卫，常用于权限检查'
  },
  {
    name: '路由独享 beforeEnter',
    description: '在重用的组件中调用'
  },
  {
    name: '组件内 beforeRouteEnter',
    description: '在进入新组件前调用，此时组件实例还未创建'
  },
  {
    name: '全局 beforeResolve',
    description: '在导航被确认前调用，所有组件内守卫和异步组件已解析'
  },
  {
    name: '全局 afterEach',
    description: '导航完成后调用，常用于页面统计、标题设置'
  },
  {
    name: 'DOM 更新',
    description: '触发组件更新，渲染新页面'
  }
]

const selectedType = ref('global')
const currentPath = ref('/dashboard')
</script>

<style scoped>
.route-guards-demo {
  padding: 20px;
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  margin: 20px 0;
}

.demo-header {
  text-align: center;
  margin-bottom: 20px;
}

.demo-header h4 {
  margin: 0 0 8px 0;
  color: var(--vp-c-text-1);
}

.demo-desc {
  margin: 0;
  color: var(--vp-c-text-2);
  font-size: 14px;
}

.guards-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 16px;
  margin-bottom: 24px;
}

.guard-type {
  background: var(--vp-c-bg);
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid var(--vp-c-divider);
}

.guard-header {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  font-weight: 600;
  color: white;
}

.guard-header.global {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.guard-header.route {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
}

.guard-header.component {
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
}

.guard-icon {
  font-size: 18px;
}

.guard-title {
  font-size: 14px;
}

.guard-content {
  padding: 16px;
}

.guard-desc {
  font-size: 13px;
  color: var(--vp-c-text-2);
  line-height: 1.5;
  margin-bottom: 12px;
}

.guard-example {
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  padding: 12px;
  overflow-x: auto;
}

.guard-example code {
  font-family: 'Monaco', 'Menlo', monospace;
  font-size: 12px;
  color: var(--vp-c-text-1);
  line-height: 1.6;
  white-space: pre;
}

.execution-flow {
  background: var(--vp-c-bg);
  border-radius: 8px;
  padding: 20px;
  border: 1px solid var(--vp-c-divider);
}

.execution-flow h5 {
  margin: 0 0 16px 0;
  font-size: 14px;
  color: var(--vp-c-text-1);
}

.flow-chart {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.flow-step {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  border-left: 3px solid var(--vp-c-brand);
}

.step-number {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--vp-c-brand);
  color: white;
  border-radius: 50%;
  font-size: 12px;
  font-weight: 600;
}

.step-content {
  flex: 1;
}

.step-name {
  font-size: 13px;
  font-weight: 500;
  color: var(--vp-c-text-1);
}

.step-desc {
  font-size: 12px;
  color: var(--vp-c-text-3);
  margin-top: 2px;
}

.flow-arrow {
  text-align: center;
  color: var(--vp-c-text-3);
  font-size: 14px;
}

@media (max-width: 768px) {
  .guards-container {
    grid-template-columns: 1fr;
  }

  .flow-step {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
}
</style>
