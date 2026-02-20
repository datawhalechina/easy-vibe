<template>
  <div class="ds-overview-demo">
    <div class="demo-header">
      <span class="icon">🏗️</span>
      <span class="title">数据结构全景图</span>
      <span class="subtitle">不同场景选择不同的数据组织方式</span>
    </div>

    <div class="structure-map">
      <div class="map-intro">
        数据结构就像整理房间的方式：把衣服放进衣柜、书放在书架、杂物放抽屉
      </div>

      <div class="structure-categories">
        <div
          v-for="category in categories"
          :key="category.id"
          :class="['category-card', { active: activeCategory === category.id }]"
          @click="activeCategory = category.id"
        >
          <div class="category-icon">{{ category.icon }}</div>
          <div class="category-name">{{ category.name }}</div>
          <div class="category-desc">{{ category.desc }}</div>
          <div class="category-examples">
            <span
              v-for="example in category.examples"
              :key="example"
              class="example-tag"
            >
              {{ example }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- 详细说明 -->
    <div class="category-detail">
      <div class="detail-header">
        <span class="detail-icon">{{ currentCategory.icon }}</span>
        <span class="detail-title">{{ currentCategory.name }}</span>
      </div>

      <div class="detail-content">
        <div class="detail-section">
          <div class="section-title">特点</div>
          <div class="feature-grid">
            <div
              v-for="(feature, index) in currentCategory.features"
              :key="index"
              class="feature-item"
            >
              <span class="feature-icon">✓</span>
              <span class="feature-text">{{ feature }}</span>
            </div>
          </div>
        </div>

        <div class="detail-section">
          <div class="section-title">适用场景</div>
          <div class="scenario-list">
            <div
              v-for="(scenario, index) in currentCategory.scenarios"
              :key="index"
              class="scenario-card"
            >
              <div class="scenario-icon">{{ scenario.icon }}</div>
              <div class="scenario-content">
                <div class="scenario-title">{{ scenario.title }}</div>
                <div class="scenario-desc">{{ scenario.desc }}</div>
              </div>
            </div>
          </div>
        </div>

        <div class="detail-section">
          <div class="section-title">操作复杂度</div>
          <div class="complexity-table">
            <div class="table-header">
              <span class="header-cell">操作</span>
              <span class="header-cell">平均时间</span>
            </div>
            <div
              v-for="(op, index) in currentCategory.complexity"
              :key="index"
              class="table-row"
            >
              <span class="data-cell">{{ op.operation }}</span>
              <span class="data-cell highlight">{{ op.time }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 类比说明 -->
    <div class="analogy-section">
      <div class="analogy-title">生活类比</div>
      <div class="analogy-content">
        <div class="analogy-text">{{ currentCategory.analogy.text }}</div>
        <div class="analogy-example">{{ currentCategory.analogy.example }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const activeCategory = ref('linear')

const categories = [
  {
    id: 'linear',
    name: '线性结构',
    icon: '📚',
    desc: '数据按顺序排列，像一排书',
    examples: ['数组', '链表', '栈', '队列'],
    features: [
      '数据元素之间一对一关系',
      '有明确的先后顺序',
      '可以是连续存储或链式存储'
    ],
    scenarios: [
      {
        icon: '📝',
        title: '数组：列表数据',
        desc: '存储学生成绩、商品价格等有序数据'
      },
      {
        icon: '🔄',
        title: '栈：撤销操作',
        desc: '文本编辑器的撤销功能，后进先出'
      },
      {
        icon: '🎫',
        title: '队列：任务调度',
        desc: '打印队列、任务队列，先进先出'
      }
    ],
    complexity: [
      { operation: '访问元素', time: 'O(1)' },
      { operation: '插入/删除', time: 'O(n)' }
    ],
    analogy: {
      text: '像一列火车，车厢按顺序连接',
      example: '要找到第 5 节车厢，直接数过去；要插入新车厢，需要断开连接'
    }
  },
  {
    id: 'hash',
    name: '哈希结构',
    icon: '🗂️',
    desc: '通过关键词快速查找',
    examples: ['哈希表', '字典', '集合'],
    features: [
      '通过键值对存储数据',
      '查找速度极快',
      '数据之间没有顺序关系'
    ],
    scenarios: [
      {
        icon: '📖',
        title: '字典：单词查找',
        desc: '根据英文单词快速找到中文释义'
      },
      {
        icon: '👤',
        title: '用户信息：ID 查询',
        desc: '根据用户 ID 快速获取用户资料'
      },
      {
        icon: '🛒',
        title: '购物车：商品管理',
        desc: '记录商品 ID 和数量，快速结算'
      }
    ],
    complexity: [
      { operation: '查找', time: 'O(1)' },
      { operation: '插入/删除', time: 'O(1)' }
    ],
    analogy: {
      text: '像图书馆的索引卡片',
      example: '不用在一排排书架上找，直接查索引就能找到位置'
    }
  },
  {
    id: 'tree',
    name: '树形结构',
    icon: '🌳',
    desc: '层级关系，像家谱',
    examples: ['二叉树', 'B 树', '堆'],
    features: [
      '一对多的层级关系',
      '有明确的根节点',
      '适合表示分类和层级'
    ],
    scenarios: [
      {
        icon: '📁',
        title: '文件系统：目录树',
        desc: '文件夹和文件的层级组织'
      },
      {
        icon: '🏢',
        title: '组织架构：管理树',
        desc: '公司管理层级关系'
      },
      {
        icon: '💻',
        title: 'HTML：DOM 树',
        desc: '网页元素的嵌套结构'
      }
    ],
    complexity: [
      { operation: '查找', time: 'O(log n)' },
      { operation: '插入/删除', time: 'O(log n)' }
    ],
    analogy: {
      text: '像家谱树或公司组织架构',
      example: '从根节点（祖先）开始，一层层向下找，路径唯一'
    }
  },
  {
    id: 'graph',
    name: '图结构',
    icon: '🕸️',
    desc: '复杂关系网络',
    examples: ['有向图', '无向图', '网络图'],
    features: [
      '多对多的复杂关系',
      '节点之间可以任意连接',
      '可以表示复杂网络'
    ],
    scenarios: [
      {
        icon: '🗺️',
        title: '地图：路径规划',
        desc: '城市之间的道路连接，导航系统'
      },
      {
        icon: '👥',
        title: '社交网络：好友关系',
        desc: '用户之间的关注、好友关系'
      },
      {
        icon: '🔗',
        title: '网页：链接关系',
        desc: '网页之间的超链接网络'
      }
    ],
    complexity: [
      { operation: '遍历', time: 'O(V + E)' },
      { operation: '最短路径', time: 'O(E + V log V)' }
    ],
    analogy: {
      text: '像地铁线路图或航空网络',
      example: '多个站点，多条线路，站点之间可以有多种连接方式'
    }
  }
]

const currentCategory = computed(() => categories.find(c => c.id === activeCategory.value))
</script>

<style scoped>
.ds-overview-demo {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  padding: 1.5rem;
  margin: 1.5rem 0;
}

.demo-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.demo-header .icon { font-size: 1.5rem; }
.demo-header .title { font-weight: 700; font-size: 1.1rem; }
.demo-header .subtitle { color: var(--vp-c-text-2); font-size: 0.9rem; }

.structure-map {
  margin-bottom: 2rem;
}

.map-intro {
  padding: 1rem;
  background: var(--vp-c-bg);
  border-left: 4px solid var(--vp-c-brand);
  font-size: 0.9rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.structure-categories {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}

.category-card {
  padding: 1.25rem;
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;
}

.category-card:hover {
  border-color: var(--vp-c-brand);
  transform: translateY(-3px);
}

.category-card.active {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-brand-soft);
}

.category-icon {
  font-size: 2rem;
  margin-bottom: 0.75rem;
}

.category-name {
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 0.5rem;
}

.category-desc {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  margin-bottom: 1rem;
}

.category-examples {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.example-tag {
  padding: 0.25rem 0.6rem;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  font-size: 0.75rem;
}

.category-detail {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
}

.detail-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--vp-c-divider);
}

.detail-icon {
  font-size: 1.5rem;
}

.detail-title {
  font-weight: 600;
  font-size: 1.1rem;
  color: var(--vp-c-brand);
}

.detail-content {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.detail-section {}

.section-title {
  font-weight: 600;
  font-size: 0.95rem;
  margin-bottom: 1rem;
  color: var(--vp-c-brand);
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 0.75rem;
}

.feature-item {
  display: flex;
  gap: 0.5rem;
  align-items: start;
  padding: 0.75rem;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
}

.feature-icon {
  color: #10b981;
  font-weight: 700;
  flex-shrink: 0;
}

.feature-text {
  font-size: 0.85rem;
  line-height: 1.5;
}

.scenario-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.scenario-card {
  display: flex;
  gap: 0.75rem;
  padding: 1rem;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
}

.scenario-icon {
  font-size: 1.5rem;
  flex-shrink: 0;
}

.scenario-content {
  flex: 1;
}

.scenario-title {
  font-weight: 600;
  font-size: 0.9rem;
  margin-bottom: 0.35rem;
}

.scenario-desc {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  line-height: 1.4;
}

.complexity-table {
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  overflow: hidden;
}

.table-header {
  display: grid;
  grid-template-columns: 1fr 1fr;
  background: var(--vp-c-brand);
  color: white;
}

.header-cell {
  padding: 0.6rem;
  font-size: 0.85rem;
  font-weight: 600;
  text-align: center;
}

.table-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  border-top: 1px solid var(--vp-c-divider);
}

.data-cell {
  padding: 0.6rem;
  font-size: 0.85rem;
  text-align: center;
  font-family: 'Courier New', monospace;
}

.data-cell.highlight {
  color: var(--vp-c-brand);
  font-weight: 600;
}

.analogy-section {
  border-top: 1px solid var(--vp-c-divider);
  padding-top: 1.5rem;
}

.analogy-title {
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 1rem;
  color: var(--vp-c-brand);
}

.analogy-content {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.analogy-text {
  padding: 1rem;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  font-size: 0.95rem;
  line-height: 1.6;
}

.analogy-example {
  padding: 0.75rem;
  background: var(--vp-c-bg);
  border-left: 3px solid var(--vp-c-brand);
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  line-height: 1.5;
}
</style>
