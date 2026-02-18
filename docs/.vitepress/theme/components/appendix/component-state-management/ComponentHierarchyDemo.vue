<template>
  <div class="component-hierarchy-demo">
    <div class="demo-header">
      <span class="icon">🌳</span>
      <span class="title">组件层级结构</span>
      <span class="subtitle">像家谱树一样的组件关系</span>
    </div>

    <div class="intro-text">
      想象你在<span class="highlight">公司组织架构</span>工作：CEO（根组件）在顶层，下面是各个部门（父组件），每个部门里还有员工（子组件）。这就是组件树！
    </div>

    <div class="demo-content">
      <div class="tree-container">
        <div
          class="tree-node root-node"
          :class="{ active: selectedNode === 'app' }"
          @click="selectNode('app')"
        >
          <div class="node-icon">
            👑
          </div>
          <div class="node-info">
            <div class="node-label">
              App (根组件)
            </div>
            <div class="node-desc">
              CEO - 管理全局
            </div>
          </div>
        </div>

        <div class="tree-children">
          <div class="tree-branch">
            <div class="connector" />
            <div
              class="tree-node"
              :class="{ active: selectedNode === 'header' }"
              @click="selectNode('header')"
            >
              <div class="node-icon">
                📌
              </div>
              <div class="node-info">
                <div class="node-label">
                  Header
                </div>
                <div class="node-desc">
                  导航栏部门
                </div>
              </div>
            </div>
          </div>

          <div class="tree-branch">
            <div class="connector" />
            <div
              class="tree-node"
              :class="{ active: selectedNode === 'main' }"
              @click="selectNode('main')"
            >
              <div class="node-icon">
                📄
              </div>
              <div class="node-info">
                <div class="node-label">
                  Main Content
                </div>
                <div class="node-desc">
                  主内容部门
                </div>
              </div>
            </div>

            <div class="tree-children">
              <div class="tree-branch">
                <div class="connector" />
                <div
                  class="tree-node"
                  :class="{ active: selectedNode === 'sidebar' }"
                  @click="selectNode('sidebar')"
                >
                  <div class="node-icon">
                    📑
                  </div>
                  <div class="node-info">
                    <div class="node-label">
                      Sidebar
                    </div>
                    <div class="node-desc">
                      侧边栏小组
                    </div>
                  </div>
                </div>
              </div>

              <div class="tree-branch">
                <div class="connector" />
                <div
                  class="tree-node"
                  :class="{ active: selectedNode === 'productlist' }"
                  @click="selectNode('productlist')"
                >
                  <div class="node-icon">
                    🛍️
                  </div>
                  <div class="node-info">
                    <div class="node-label">
                      ProductList
                    </div>
                    <div class="node-desc">
                      商品列表组
                    </div>
                  </div>
                </div>

                <div class="tree-children">
                  <div class="tree-branch">
                    <div class="connector" />
                    <div
                      class="tree-node leaf"
                      :class="{ active: selectedNode === 'productcard' }"
                      @click="selectNode('productcard')"
                    >
                      <div class="node-icon">
                        🏷️
                      </div>
                      <div class="node-info">
                        <div class="node-label">
                          ProductCard
                        </div>
                        <div class="node-desc">
                          商品卡片员工
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="tree-branch">
            <div class="connector" />
            <div
              class="tree-node"
              :class="{ active: selectedNode === 'footer' }"
              @click="selectNode('footer')"
            >
              <div class="node-icon">
                🔻
              </div>
              <div class="node-info">
                <div class="node-label">
                  Footer
                </div>
                <div class="node-desc">
                  页脚部门
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Transition name="fade">
        <div
          v-if="selectedNodeInfo"
          class="node-details"
        >
          <div class="detail-header">
            <span class="detail-icon">{{ selectedNodeInfo.icon }}</span>
            <span class="detail-title">{{ selectedNodeInfo.title }}</span>
          </div>
          <p class="detail-desc">
            {{ selectedNodeInfo.description }}
          </p>
          <div
            v-if="selectedNodeInfo.props || selectedNodeInfo.events"
            class="detail-info"
          >
            <div
              v-if="selectedNodeInfo.props"
              class="info-section"
            >
              <strong>📥 接收:</strong>
              <span class="prop-tags">{{ selectedNodeInfo.props.join(', ') }}</span>
            </div>
            <div
              v-if="selectedNodeInfo.events"
              class="info-section"
            >
              <strong>📤 触发:</strong>
              <span class="prop-tags">{{ selectedNodeInfo.events.join(', ') }}</span>
            </div>
          </div>
        </div>
      </Transition>

      <div
        v-if="!selectedNode"
        class="hint-text"
      >
        👆 点击上方任意节点，查看职责说明
      </div>
    </div>

    <div class="info-box">
      <span class="icon">💡</span>
      <strong>核心思想：</strong>组件像组织架构，父组件管理整体，子组件负责具体功能。数据从上往下传，事件从下往上报。
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const selectedNode = ref(null)

const nodeInfoMap = {
  app: {
    icon: '👑',
    title: 'App 根组件',
    description: '就像公司的CEO，负责整个应用的初始化和全局管理。包含路由、全局状态、主题配置等大方向决策。',
    props: [],
    events: []
  },
  header: {
    icon: '📌',
    title: 'Header 导航栏',
    description: '公司的前台部门，负责展示Logo、导航菜单、用户信息和购物车等。大部分页面都会用到它。',
    props: ['user', 'cartCount'],
    events: ['logout', 'search']
  },
  main: {
    icon: '📄',
    title: 'Main Content 主内容',
    description: '公司的核心业务部门，管理页面的主要内容区域。用flex或grid布局组织侧边栏和内容。',
    props: [],
    events: []
  },
  sidebar: {
    icon: '📑',
    title: 'Sidebar 侧边栏',
    description: '公司的导航小组，提供可折叠的菜单。常见于后台管理系统或分类浏览页面。',
    props: ['menuItems', 'collapsed'],
    events: ['select', 'toggle']
  },
  productlist: {
    icon: '🛍️',
    title: 'ProductList 商品列表',
    description: '商品展示团队，负责数据获取、分页、排序和筛选。包含多个ProductCard成员。',
    props: ['products', 'loading', 'total'],
    events: ['loadMore', 'sort', 'filter']
  },
  productcard: {
    icon: '🏷️',
    title: 'ProductCard 商品卡片',
    description: '最基层的员工，负责展示单个商品的信息（图片、名称、价格、评分）。专注于UI展示。',
    props: ['product', 'showAddToCart'],
    events: ['addToCart', 'click']
  },
  footer: {
    icon: '🔻',
    title: 'Footer 页脚',
    description: '公司的后勤部门，展示版权信息、友情链接、联系方式、社交媒体链接等辅助信息。',
    props: [],
    events: []
  }
}

const selectedNodeInfo = computed(() => {
  return selectedNode.value ? nodeInfoMap[selectedNode.value] : null
})

const selectNode = (nodeId) => {
  selectedNode.value = selectedNode.value === nodeId ? null : nodeId
}
</script>

<style scoped>
.component-hierarchy-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg-soft);
  padding: 0.75rem;
  margin: 0.5rem 0;
  
  
}

.demo-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.demo-header .icon {
  font-size: 1.25rem;
}

.demo-header .title {
  font-weight: bold;
  font-size: 1rem;
}

.demo-header .subtitle {
  color: var(--vp-c-text-2);
  font-size: 0.85rem;
  margin-left: 0.5rem;
}

.intro-text {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  line-height: 1.6;
  margin-bottom: 1rem;
  padding: 0.75rem;
  background: var(--vp-c-bg);
  border-radius: 6px;
}

.intro-text .highlight {
  color: var(--vp-c-brand-1);
  font-weight: 500;
}

.demo-content {
  background: var(--vp-c-bg);
  border-radius: 6px;
  padding: 0.75rem;
  margin-bottom: 0.75rem;
}

.tree-container {
  overflow-x: auto;
}

.tree-children {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: 0.75rem;
  margin-left: 1.5rem;
}

.tree-branch {
  position: relative;
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
}

.connector {
  width: 16px;
  height: 2px;
  background: var(--vp-c-divider);
  margin-top: 18px;
  position: relative;
}

.connector::before {
  content: '';
  position: absolute;
  left: 0;
  top: -8px;
  width: 2px;
  height: 10px;
  background: var(--vp-c-divider);
}

.tree-node {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  background: var(--vp-c-bg-soft);
  border: 2px solid var(--vp-c-divider);
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 180px;
}

.tree-node:hover {
  border-color: var(--vp-c-brand);
  transform: translateX(4px);
}

.tree-node.active {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-brand-soft);
  box-shadow: 0 0 0 3px var(--vp-c-brand-delta);
}

.root-node {
  background: linear-gradient(135deg, var(--vp-c-brand-soft), var(--vp-c-bg));
  border-width: 3px;
}

.leaf .node-icon {
  opacity: 0.8;
}

.node-icon {
  font-size: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: var(--vp-c-bg);
  border-radius: 6px;
}

.node-info {
  display: flex;
  flex-direction: column;
}

.node-label {
  font-weight: 600;
  font-size: 0.875rem;
  color: var(--vp-c-text-1);
}

.node-desc {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  margin-top: 0.15rem;
}

.node-details {
  margin-top: 1rem;
  padding: 0.75rem;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  border: 1px solid var(--vp-c-divider);
}

.detail-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.detail-icon {
  font-size: 1.25rem;
}

.detail-title {
  font-weight: 600;
  font-size: 0.9rem;
  color: var(--vp-c-text-1);
}

.detail-desc {
  font-size: 0.875rem;
  color: var(--vp-c-text-2);
  line-height: 1.5;
  margin-bottom: 0.75rem;
}

.detail-info {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.info-section {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.8rem;
}

.info-section strong {
  color: var(--vp-c-text-1);
  flex-shrink: 0;
}

.prop-tags {
  color: var(--vp-c-brand);
  font-family: monospace;
  font-size: 0.75rem;
}

.hint-text {
  text-align: center;
  font-size: 0.85rem;
  color: var(--vp-c-text-3);
  margin-top: 0.75rem;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.info-box {
  background: var(--vp-c-bg-alt);
  padding: 0.75rem;
  border-radius: 6px;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

.info-box .icon {
  margin-right: 0.25rem;
}

@media (max-width: 768px) {
  .tree-node {
    min-width: auto;
  }

  .tree-children {
    margin-left: 1rem;
  }
}
</style>
