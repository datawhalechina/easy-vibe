<template>
  <div class="nested-routes-demo">
    <div class="demo-header">
      <h4>嵌套路由可视化</h4>
      <p class="demo-desc">点击不同层级，观察嵌套路由的渲染位置和层级关系</p>
    </div>

    <div class="demo-container">
      <!-- 路由层级可视化 -->
      <div class="routes-hierarchy">
        <div class="tree-view">
          <div
            v-for="node in treeData"
            :key="node.path"
            class="tree-node"
            :style="{ paddingLeft: `${node.level * 24}px` }"
            @click="selectNode(node)"
          >
            <div
              :class="[
                'node-content',
                { active: currentPath === node.path },
                { 'has-children': node.children?.length }
              ]"
            >
              <span class="node-icon">{{ node.children?.length ? '📁' : '📄' }}</span>
              <span class="node-path">{{ node.name }}</span>
              <code class="node-route">{{ node.path || '/' }}</code>
            </div>
          </div>
        </div>
      </div>

      <!-- 渲染区域预览 -->
      <div class="render-preview">
        <div class="preview-header">
          <h5>渲染视图</h5>
          <span class="current-path">{{ currentPath || '/' }}</span>
        </div>

        <div class="router-view-hierarchy">
          <div
            v-for="(route, index) in activeRouteChain"
            :key="route.path"
            class="router-view-level"
            :style="{ marginLeft: `${index * 20}px` }"
          >
            <div class="router-view-box">
              <div class="view-label">
                <span class="view-icon">🔲</span>
                <span class="view-name">{{ route.name }}</span>
              </div>
              <div class="view-path">{{ route.path }}</div>
            </div>
          </div>
        </div>

        <div class="breadcrumb">
          <span
            v-for="(crumb, index) in breadcrumbs"
            :key="index"
            class="breadcrumb-item"
            @click="navigateTo(crumb.path)"
          >
            {{ crumb.name }}
            <span v-if="index < breadcrumbs.length - 1" class="separator">/</span>
          </span>
        </div>
      </div>
    </div>

    <!-- 代码示例 -->
    <div class="code-section">
      <h5>路由配置示例</h5>
      <pre class="code-block"><code>{{ routeConfigCode }}</code></pre>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const currentPath = ref('/dashboard')

const routeConfig = [
  {
    path: '/',
    name: 'Layout',
    component: 'Layout',
    children: [
      {
        path: '',
        name: 'Home',
        component: 'Home'
      },
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: 'Dashboard'
      },
      {
        path: 'users',
        name: 'Users',
        component: 'UserLayout',
        children: [
          {
            path: '',
            name: 'UserList',
            component: 'UserList'
          },
          {
            path: ':id',
            name: 'UserDetail',
            component: 'UserDetail'
          },
          {
            path: ':id/edit',
            name: 'UserEdit',
            component: 'UserEdit'
          }
        ]
      },
      {
        path: 'products',
        name: 'Products',
        component: 'ProductLayout',
        children: [
          {
            path: '',
            name: 'ProductList',
            component: 'ProductList'
          },
          {
            path: 'category/:categoryId',
            name: 'ProductCategory',
            component: 'ProductCategory'
          }
        ]
      },
      {
        path: 'settings',
        name: 'Settings',
        component: 'Settings',
        children: [
          {
            path: 'profile',
            name: 'ProfileSettings',
            component: 'ProfileSettings'
          },
          {
            path: 'security',
            name: 'SecuritySettings',
            component: 'SecuritySettings'
          }
        ]
      }
    ]
  }
]

// 扁平化路由，添加层级信息
const flattenRoutes = (routes, level = 0, parentPath = '') => {
  const result = []

  routes.forEach(route => {
    const fullPath = route.path
      ? `${parentPath}/${route.path}`.replace(/\/+/g, '/')
      : parentPath || '/'

    const node = {
      ...route,
      fullPath,
      level,
      children: []
    }

    if (route.children?.length) {
      node.children = flattenRoutes(route.children, level + 1, fullPath)
    }

    result.push(node)
  })

  return result
}

const treeData = computed(() => {
  const flatten = (routes, level = 0) => {
    const result = []

    routes.forEach(route => {
      const node = {
        name: route.name,
        path: route.path || '/',
        fullPath: route.fullPath,
        level,
        component: route.component,
        children: route.children?.length ? flatten(route.children, level + 1) : null
      }
      result.push(node)
    })

    return result
  }

  return flatten(flattenRoutes(routeConfig))
})

const activeRouteChain = computed(() => {
  const findChain = (routes, target, chain = []) => {
    for (const route of routes) {
      const currentChain = [...chain, route]

      if (route.path === target || route.fullPath === target) {
        return currentChain
      }

      if (route.children?.length) {
        const found = findChain(route.children, target, currentChain)
        if (found) return found
      }
    }
    return null
  }

  return findChain(flattenRoutes(routeConfig), currentPath.value) || []
})

const breadcrumbs = computed(() => {
  return activeRouteChain.value.map(route => ({
    name: route.name,
    path: route.fullPath || route.path
  }))
})

const routeConfigCode = computed(() => `const routes = [
  {
    path: '/',
    component: Layout,
    children: [
      { path: 'dashboard', component: Dashboard },
      {
        path: 'users',
        component: UserLayout,
        children: [
          { path: '', component: UserList },
          { path: ':id', component: UserDetail },
          { path: ':id/edit', component: UserEdit }
        ]
      },
      {
        path: 'settings',
        component: Settings,
        children: [
          { path: 'profile', component: ProfileSettings },
          { path: 'security', component: SecuritySettings }
        ]
      }
    ]
  }
]`)

const selectNode = (node) => {
  currentPath.value = node.fullPath || node.path
}

const navigateTo = (path) => {
  currentPath.value = path
}
</script>

<style scoped>
.nested-routes-demo {
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

.demo-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 20px;
}

.routes-hierarchy {
  background: var(--vp-c-bg);
  border-radius: 8px;
  padding: 16px;
  border: 1px solid var(--vp-c-divider);
}

.tree-view {
  max-height: 350px;
  overflow-y: auto;
}

.tree-node {
  margin: 2px 0;
}

.node-content {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
}

.node-content:hover {
  background: var(--vp-c-bg-soft);
}

.node-content.active {
  background: var(--vp-c-brand-soft);
  border: 1px solid var(--vp-c-brand);
}

.node-icon {
  font-size: 14px;
}

.node-path {
  font-size: 13px;
  font-weight: 500;
  color: var(--vp-c-text-1);
}

.node-route {
  margin-left: auto;
  font-size: 11px;
  color: var(--vp-c-text-3);
  font-family: monospace;
  background: var(--vp-c-bg-soft);
  padding: 2px 6px;
  border-radius: 4px;
}

.render-preview {
  background: var(--vp-c-bg);
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
  overflow: hidden;
}

.preview-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background: var(--vp-c-bg-soft);
  border-bottom: 1px solid var(--vp-c-divider);
}

.preview-header h5 {
  margin: 0;
  font-size: 13px;
  color: var(--vp-c-text-1);
}

.current-path {
  font-size: 12px;
  color: var(--vp-c-text-3);
  font-family: monospace;
  background: var(--vp-c-bg);
  padding: 2px 8px;
  border-radius: 4px;
}

.router-view-hierarchy {
  padding: 16px;
  min-height: 200px;
}

.router-view-level {
  margin-bottom: 8px;
}

.router-view-box {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 12px;
}

.view-label {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 4px;
}

.view-icon {
  font-size: 12px;
}

.view-name {
  font-size: 13px;
  font-weight: 500;
  color: var(--vp-c-text-1);
}

.view-path {
  font-size: 11px;
  color: var(--vp-c-text-3);
  font-family: monospace;
}

.breadcrumb {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 12px 16px;
  background: var(--vp-c-bg-soft);
  border-top: 1px solid var(--vp-c-divider);
  overflow-x: auto;
}

.breadcrumb-item {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: var(--vp-c-text-2);
  cursor: pointer;
  white-space: nowrap;
}

.breadcrumb-item:hover {
  color: var(--vp-c-brand);
}

.separator {
  color: var(--vp-c-text-3);
  margin: 0 2px;
}

.code-section {
  margin-top: 20px;
  padding: 20px;
  background: var(--vp-c-bg);
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
}

.code-section h5 {
  margin: 0 0 16px 0;
  font-size: 14px;
  color: var(--vp-c-text-1);
}

.code-block {
  background: #1e1e1e;
  color: #d4d4d4;
  padding: 16px;
  border-radius: 6px;
  overflow-x: auto;
  font-family: 'Monaco', 'Menlo', monospace;
  font-size: 13px;
  line-height: 1.5;
  margin: 0;
}

@media (max-width: 768px) {
  .demo-container {
    grid-template-columns: 1fr;
  }

  .breadcrumb {
    flex-wrap: wrap;
  }
}
</style>
