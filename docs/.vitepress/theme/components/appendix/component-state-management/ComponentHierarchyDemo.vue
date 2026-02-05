<template>
  <div class="component-hierarchy-demo">
    <div class="demo-header">
      <h4>组件层级可视化</h4>
      <p class="hint">点击组件查看详情，观察组件树如何组织</p>
    </div>

    <div class="tree-container">
      <div class="tree-node root-node" :class="{ active: selectedNode === 'app' }" @click="selectNode('app')">
        <div class="node-icon">🌳</div>
        <div class="node-label">App (根组件)</div>
        <div class="node-desc">管理全局状态</div>
      </div>

      <div class="tree-children">
        <div class="tree-branch">
          <div class="connector"></div>
          <div class="tree-node" :class="{ active: selectedNode === 'header' }" @click="selectNode('header')">
            <div class="node-icon">📌</div>
            <div class="node-label">Header</div>
            <div class="node-desc">导航 + 用户信息</div>
          </div>
        </div>

        <div class="tree-branch">
          <div class="connector"></div>
          <div class="tree-node" :class="{ active: selectedNode === 'main' }" @click="selectNode('main')">
            <div class="node-icon">📄</div>
            <div class="node-label">Main Content</div>
            <div class="node-desc">页面主要内容</div>
          </div>

          <div class="tree-children">
            <div class="tree-branch">
              <div class="connector"></div>
              <div class="tree-node" :class="{ active: selectedNode === 'sidebar' }" @click="selectNode('sidebar')">
                <div class="node-icon">📑</div>
                <div class="node-label">Sidebar</div>
                <div class="node-desc">侧边栏菜单</div>
              </div>
            </div>

            <div class="tree-branch">
              <div class="connector"></div>
              <div class="tree-node" :class="{ active: selectedNode === 'productlist' }" @click="selectNode('productlist')">
                <div class="node-icon">🛍️</div>
                <div class="node-label">ProductList</div>
                <div class="node-desc">商品列表展示</div>
              </div>

              <div class="tree-children">
                <div class="tree-branch">
                  <div class="connector"></div>
                  <div class="tree-node leaf" :class="{ active: selectedNode === 'productcard' }" @click="selectNode('productcard')">
                    <div class="node-icon">🏷️</div>
                    <div class="node-label">ProductCard</div>
                    <div class="node-desc">单个商品卡片</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="tree-branch">
          <div class="connector"></div>
          <div class="tree-node" :class="{ active: selectedNode === 'footer' }" @click="selectNode('footer')">
            <div class="node-icon">🔻</div>
            <div class="node-label">Footer</div>
            <div class="node-desc">页脚信息</div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="selectedNodeInfo" class="node-details">
      <h5>{{ selectedNodeInfo.title }}</h5>
      <p>{{ selectedNodeInfo.description }}</p>
      <div class="props-list" v-if="selectedNodeInfo.props">
        <strong>接收的 Props:</strong>
        <ul>
          <li v-for="prop in selectedNodeInfo.props" :key="prop">{{ prop }}</li>
        </ul>
      </div>
      <div class="events-list" v-if="selectedNodeInfo.events">
        <strong>触发的事件:</strong>
        <ul>
          <li v-for="event in selectedNodeInfo.events" :key="event">{{ event }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const selectedNode = ref(null)

const nodeInfoMap = {
  app: {
    title: 'App (根组件)',
    description: '应用的入口组件，负责初始化全局状态、路由配置和全局样式。通常包含 RouterView 来渲染页面级组件。',
    props: [],
    events: []
  },
  header: {
    title: 'Header (导航栏)',
    description: '顶部导航组件，显示 Logo、主导航菜单、用户信息、购物车入口等。通常是全局组件，在大多数页面都显示。',
    props: ['user', 'cartCount'],
    events: ['logout', 'search']
  },
  main: {
    title: 'Main Content (主内容区)',
    description: '页面的主要内容区域，包含侧边栏和具体内容。使用 flex 或 grid 布局来组织内容。',
    props: [],
    events: []
  },
  sidebar: {
    title: 'Sidebar (侧边栏)',
    description: '左侧导航菜单，通常用于后台管理系统或分类浏览页面。包含可折叠的菜单组。',
    props: ['menuItems', 'collapsed'],
    events: ['select', 'toggle']
  },
  productlist: {
    title: 'ProductList (商品列表)',
    description: '展示商品列表的容器组件，负责数据获取、分页、排序和筛选逻辑。包含多个 ProductCard 组件。',
    props: ['products', 'loading', 'total'],
    events: ['loadMore', 'sort', 'filter']
  },
  productcard: {
    title: 'ProductCard (商品卡片)',
    description: '单个商品的展示卡片，显示商品图片、名称、价格、评分等信息。是最基础的 UI 组件之一。',
    props: ['product', 'showAddToCart'],
    events: ['addToCart', 'click']
  },
  footer: {
    title: 'Footer (页脚)',
    description: '页面底部的信息区域，包含版权信息、友情链接、联系方式、社交媒体链接等。',
    props: [],
    events: []
  }
}

const selectedNodeInfo = computed(() => {
  return selectedNode.value ? nodeInfoMap[selectedNode.value] : null
})

const selectNode = (nodeId) => {
  selectedNode.value = nodeId
}
</script>

<style scoped>
.component-hierarchy-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 20px;
  background: var(--vp-c-bg-soft);
}

.demo-header {
  margin-bottom: 20px;
}

.demo-header h4 {
  margin: 0 0 8px 0;
  color: var(--vp-c-text-1);
}

.hint {
  margin: 0;
  font-size: 14px;
  color: var(--vp-c-text-2);
}

.tree-container {
  overflow-x: auto;
  padding: 10px 0;
}

.tree-children {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 12px;
  margin-left: 28px;
}

.tree-branch {
  position: relative;
  display: flex;
  align-items: flex-start;
  gap: 12px;
}

.connector {
  width: 20px;
  height: 2px;
  background: var(--vp-c-divider);
  margin-top: 24px;
  position: relative;
}

.connector::before {
  content: '';
  position: absolute;
  left: 0;
  top: -10px;
  width: 2px;
  height: 12px;
  background: var(--vp-c-divider);
}

.tree-node {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 16px;
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 180px;
}

.tree-node:hover {
  border-color: var(--vp-c-brand);
  transform: translateX(4px);
}

.tree-node.active {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-brand-soft);
  box-shadow: 0 0 0 3px var(--vp-c-brand-soft);
}

.root-node {
  background: linear-gradient(135deg, var(--vp-c-brand-soft), var(--vp-c-bg));
  border-width: 3px;
}

.leaf .node-icon {
  opacity: 0.8;
  transform: scale(0.9);
}

.node-icon {
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
}

.node-label {
  font-weight: 600;
  font-size: 14px;
  color: var(--vp-c-text-1);
}

.node-desc {
  font-size: 12px;
  color: var(--vp-c-text-2);
  margin-left: auto;
  padding-left: 12px;
  border-left: 1px solid var(--vp-c-divider);
}

.node-details {
  margin-top: 20px;
  padding: 16px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  animation: slideIn 0.3s ease;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.node-details h5 {
  margin: 0 0 8px 0;
  color: var(--vp-c-brand);
  font-size: 16px;
}

.node-details p {
  margin: 0 0 12px 0;
  color: var(--vp-c-text-2);
  font-size: 14px;
  line-height: 1.6;
}

.props-list, .events-list {
  margin-top: 12px;
}

.props-list strong, .events-list strong {
  display: block;
  margin-bottom: 4px;
  color: var(--vp-c-text-1);
  font-size: 13px;
}

.props-list ul, .events-list ul {
  margin: 0;
  padding-left: 20px;
}

.props-list li, .events-list li {
  color: var(--vp-c-text-2);
  font-size: 13px;
  font-family: monospace;
  margin: 2px 0;
}

@media (max-width: 768px) {
  .tree-node {
    min-width: auto;
    flex-wrap: wrap;
  }

  .node-desc {
    width: 100%;
    margin-top: 4px;
    padding-left: 42px;
    border-left: none;
  }

  .tree-children {
    margin-left: 16px;
  }
}
</style>
