<template>
  <div class="architecture-comparison-demo">
    <div class="demo-header">
      <span class="icon">🏗️</span>
      <span class="title">前后端项目架构对比</span>
      <span class="subtitle">点击切换查看不同架构层次</span>
    </div>

    <!-- 切换按钮 -->
    <div class="toggle-buttons">
      <button
        :class="['toggle-btn', { active: activeType === 'frontend' }]"
        @click="activeType = 'frontend'"
      >
        <span class="btn-icon">🎨</span>
        前端架构
      </button>
      <button
        :class="['toggle-btn', { active: activeType === 'backend' }]"
        @click="activeType = 'backend'"
      >
        <span class="btn-icon">⚙️</span>
        后端架构
      </button>
    </div>

    <!-- 架构展示 -->
    <div class="architecture-display">
      <!-- 前端架构 -->
      <div v-if="activeType === 'frontend'" class="architecture-layers">
        <div
          v-for="(layer, index) in frontendLayers"
          :key="layer.id"
          class="layer-box"
          :class="[layer.class, { active: activeLayer === layer.id }]"
          :style="{ animationDelay: `${index * 0.1}s` }"
          @click="setActiveLayer(layer.id)"
        >
          <div class="layer-header">
            <span class="layer-icon">{{ layer.icon }}</span>
            <span class="layer-name">{{ layer.name }}</span>
            <span class="layer-badge">{{ layer.badge }}</span>
          </div>
          <div class="layer-content">
            <div class="duty">{{ layer.duty }}</div>
            <div class="example">🌰 {{ layer.example }}</div>
          </div>
          <div v-if="index < frontendLayers.length - 1" class="layer-arrow">
            <span class="arrow-icon">↓</span>
            <span class="arrow-text">{{ layer.arrow }}</span>
          </div>
        </div>
      </div>

      <!-- 后端架构 -->
      <div v-else class="architecture-layers">
        <div
          v-for="(layer, index) in backendLayers"
          :key="layer.id"
          class="layer-box"
          :class="[layer.class, { active: activeLayer === layer.id }]"
          :style="{ animationDelay: `${index * 0.1}s` }"
          @click="setActiveLayer(layer.id)"
        >
          <div class="layer-header">
            <span class="layer-icon">{{ layer.icon }}</span>
            <span class="layer-name">{{ layer.name }}</span>
            <span class="layer-badge">{{ layer.badge }}</span>
          </div>
          <div class="layer-content">
            <div class="duty">{{ layer.duty }}</div>
            <div class="example">🌰 {{ layer.example }}</div>
          </div>
          <div v-if="index < backendLayers.length - 1" class="layer-arrow">
            <span class="arrow-icon">↓</span>
            <span class="arrow-text">{{ layer.arrow }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 详情面板 -->
    <Transition name="slide">
      <div v-if="currentLayer" class="detail-panel">
        <div class="detail-header">
          <span class="detail-icon">{{ currentLayer.icon }}</span>
          <span class="detail-title">{{ currentLayer.name }}</span>
        </div>
        <div class="detail-content">
          <div class="detail-section">
            <div class="section-title">📁 典型文件</div>
            <div class="file-list">
              <code v-for="file in currentLayer.files" :key="file" class="file-tag">{{ file }}</code>
            </div>
          </div>
          <div class="detail-section">
            <div class="section-title">✅ 设计原则</div>
            <ul class="principle-list">
              <li v-for="principle in currentLayer.principles" :key="principle">{{ principle }}</li>
            </ul>
          </div>
        </div>
      </div>
    </Transition>

    <div class="info-box">
      <span class="icon">💡</span>
      <strong>核心思想：</strong>好的架构就像整理好的空间——前端像衣柜（按功能分类展示），后端像厨房（按流程分工协作）。点击上方层次查看详情！
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const activeType = ref('frontend')
const activeLayer = ref(null)

const frontendLayers = [
  {
    id: 'views',
    name: 'Views / Pages',
    icon: '📄',
    badge: '页面层',
    class: 'views-layer',
    duty: '职责：页面组件，对应路由',
    example: 'Home.vue、UserProfile.vue',
    arrow: '组合',
    files: ['Home/index.vue', 'User/Profile.vue', 'pages/about.tsx'],
    principles: ['保持"薄"，逻辑下沉到 hooks', '页面级状态管理', '路由懒加载']
  },
  {
    id: 'components',
    name: 'Components',
    icon: '🧩',
    badge: '组件层',
    class: 'components-layer',
    duty: '职责：可复用的 UI 组件',
    example: 'Button.vue、Modal.vue、UserCard.vue',
    arrow: '调用',
    files: ['common/Button/', 'business/UserCard/', 'layout/Header/'],
    principles: ['单一职责，一个组件只做一件事', 'Props 清晰可预测', '样式隔离（scoped/css-modules）']
  },
  {
    id: 'hooks',
    name: 'Hooks / Composables',
    icon: '🎣',
    badge: '逻辑层',
    class: 'hooks-layer',
    duty: '职责：可复用的业务逻辑',
    example: 'useAuth()、useLoading()、useForm()',
    arrow: '使用',
    files: ['useAuth.js', 'usePagination.ts', 'composables/useFetch.js'],
    principles: ['纯函数优先', '单一功能，便于测试', '命名以 use 开头']
  },
  {
    id: 'services',
    name: 'Services / API',
    icon: '🌐',
    badge: '服务层',
    class: 'services-layer',
    duty: '职责：API 调用，数据获取',
    example: 'userApi.getProfile()、orderApi.create()',
    arrow: '请求',
    files: ['services/user.js', 'api/request.ts', 'clients/http.js'],
    principles: ['统一错误处理', '请求/响应拦截', '接口统一管理']
  },
  {
    id: 'utils',
    name: 'Utils / Helpers',
    icon: '🛠️',
    badge: '工具层',
    class: 'utils-layer',
    duty: '职责：通用工具函数',
    example: 'formatDate()、storage.set()、validator.email()',
    arrow: '',
    files: ['utils/format.js', 'helpers/storage.ts', 'lib/validator.js'],
    principles: ['纯函数，无副作用', '单一职责', '完善的 JSDoc 注释']
  }
]

const backendLayers = [
  {
    id: 'controller',
    name: 'Controller',
    icon: '🎮',
    badge: '入口层',
    class: 'controller-layer',
    duty: '职责：接收 HTTP 请求，返回响应',
    example: 'UserController.getById()、OrderController.create()',
    arrow: '调用',
    files: ['userController.js', 'routes/api.js', 'handlers/order.ts'],
    principles: ['只处理 HTTP 相关逻辑', '参数校验', '不直接操作数据库']
  },
  {
    id: 'service',
    name: 'Service',
    icon: '⚙️',
    badge: '业务层',
    class: 'service-layer',
    duty: '职责：核心业务逻辑，事务管理',
    example: 'UserService.createUser()、OrderService.process()',
    arrow: '调用',
    files: ['userService.js', 'services/order.ts', 'business/user.js'],
    principles: ['包含核心业务规则', '协调多个 Repository', '管理事务边界']
  },
  {
    id: 'repository',
    name: 'Repository',
    icon: '🗄️',
    badge: '数据层',
    class: 'repository-layer',
    duty: '职责：数据持久化，数据库操作',
    example: 'UserRepository.findById()、OrderRepository.save()',
    arrow: '查询',
    files: ['userRepository.js', 'dao/order.ts', 'models/user.js'],
    principles: ['只负责数据存取', 'ORM 封装', '不包含业务逻辑']
  },
  {
    id: 'model',
    name: 'Model / Entity',
    icon: '📊',
    badge: '模型层',
    class: 'model-layer',
    duty: '职责：数据结构和业务规则定义',
    example: 'User 类、Order 实体、DTO 定义',
    arrow: '',
    files: ['models/User.js', 'entities/order.ts', 'dto/userDto.js'],
    principles: ['定义数据结构', '字段验证规则', '与其他层解耦']
  }
]

const currentLayer = computed(() => {
  const layers = activeType.value === 'frontend' ? frontendLayers : backendLayers
  return layers.find(l => l.id === activeLayer.value)
})

function setActiveLayer(id) {
  activeLayer.value = activeLayer.value === id ? null : id
}
</script>

<style scoped>
.architecture-comparison-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  padding: 1rem;
  margin: 1rem 0;
  max-height: 700px;
  overflow-y: auto;
}

.demo-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
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

/* 切换按钮 */
.toggle-buttons {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.toggle-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.6rem 1rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  cursor: pointer;
  transition: all 0.2s;
  font-size: 0.9rem;
}

.toggle-btn:hover {
  border-color: var(--vp-c-brand);
}

.toggle-btn.active {
  background: var(--vp-c-brand);
  color: white;
  border-color: var(--vp-c-brand);
}

.btn-icon {
  font-size: 1.1rem;
}

/* 架构层 */
.architecture-layers {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.layer-box {
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 0.75rem;
  cursor: pointer;
  transition: all 0.2s;
  animation: fadeInUp 0.3s ease forwards;
  opacity: 0;
  transform: translateY(10px);
}

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.layer-box:hover {
  border-color: var(--vp-c-brand);
  transform: translateX(4px);
}

.layer-box.active {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-brand-soft);
}

/* 不同层的颜色 */
.views-layer {
  border-left: 4px solid #3498db;
}

.components-layer {
  border-left: 4px solid #2ecc71;
}

.hooks-layer {
  border-left: 4px solid #9b59b6;
}

.services-layer {
  border-left: 4px solid #e67e22;
}

.utils-layer {
  border-left: 4px solid #95a5a6;
}

.controller-layer {
  border-left: 4px solid #3498db;
}

.service-layer {
  border-left: 4px solid #2ecc71;
}

.repository-layer {
  border-left: 4px solid #e67e22;
}

.model-layer {
  border-left: 4px solid #9b59b6;
}

.layer-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.layer-icon {
  font-size: 1.2rem;
}

.layer-name {
  font-weight: bold;
  font-size: 0.95rem;
  color: var(--vp-c-text-1);
}

.layer-badge {
  margin-left: auto;
  padding: 0.15rem 0.4rem;
  background: var(--vp-c-bg-soft);
  border-radius: 4px;
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
}

.layer-content {
  font-size: 0.85rem;
}

.duty {
  color: var(--vp-c-text-1);
  margin-bottom: 0.25rem;
}

.example {
  color: var(--vp-c-text-2);
  font-size: 0.8rem;
}

.layer-arrow {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 0.5rem;
  padding: 0.25rem;
  color: var(--vp-c-text-3);
  font-size: 0.75rem;
}

.arrow-icon {
  font-size: 1rem;
}

/* 详情面板 */
.detail-panel {
  margin-top: 1rem;
  padding: 1rem;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.detail-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--vp-c-divider);
}

.detail-icon {
  font-size: 1.25rem;
}

.detail-title {
  font-weight: bold;
  font-size: 1rem;
}

.detail-section {
  margin-bottom: 0.75rem;
}

.detail-section:last-child {
  margin-bottom: 0;
}

.section-title {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 0.5rem;
}

.file-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.file-tag {
  padding: 0.2rem 0.5rem;
  background: var(--vp-c-bg-soft);
  border-radius: 4px;
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  font-family: monospace;
}

.principle-list {
  margin: 0;
  padding-left: 1.2rem;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

.principle-list li {
  margin-bottom: 0.25rem;
}

/* 信息框 */
.info-box {
  background: var(--vp-c-bg-alt);
  padding: 0.75rem;
  border-radius: 6px;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  margin-top: 1rem;
  display: flex;
  gap: 0.25rem;
}

.info-box .icon {
  flex-shrink: 0;
}

/* 响应式 */
@media (max-width: 640px) {
  .toggle-btn {
    font-size: 0.8rem;
    padding: 0.5rem;
  }
  
  .layer-name {
    font-size: 0.85rem;
  }
  
  .duty, .example {
    font-size: 0.75rem;
  }
}
</style>
