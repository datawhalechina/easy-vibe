<template>
  <div class="layered-architecture-demo">
    <div class="architecture-container">
      <!-- 客户端 -->
      <div class="client-layer">
        <div class="layer-box client">
          <div class="layer-icon">🌐</div>
          <div class="layer-title">客户端</div>
          <div class="layer-desc">Web / App / 小程序</div>
        </div>
        <div class="arrow-down">⬇️ HTTP/HTTPS</div>
      </div>

      <!-- 后端分层 -->
      <div class="backend-layers">
        <!-- Controller 层 -->
        <div
          class="layer-box controller"
          :class="{ active: activeLayer === 'controller' }"
          @click="setActiveLayer('controller')"
        >
          <div class="layer-header">
            <span class="layer-icon">🎮</span>
            <span class="layer-name">Controller</span>
            <span class="layer-badge">入口</span>
          </div>
          <div class="layer-content">
            <div class="duty">职责：接收请求、参数校验、调用 Service</div>
            <div class="tech">技术：Spring MVC / Gin / Echo</div>
          </div>
        </div>

        <div class="arrow-down">⬇️ 调用</div>

        <!-- Service 层 -->
        <div
          class="layer-box service"
          :class="{ active: activeLayer === 'service' }"
          @click="setActiveLayer('service')"
        >
          <div class="layer-header">
            <span class="layer-icon">⚙️</span>
            <span class="layer-name">Service</span>
            <span class="layer-badge">业务核心</span>
          </div>
          <div class="layer-content">
            <div class="duty">职责：业务逻辑编排、事务管理、跨模块协调</div>
            <div class="tech">技术：纯代码逻辑 / 无框架依赖</div>
          </div>
        </div>

        <div class="arrow-down">⬇️ 调用</div>

        <!-- Repository 层 -->
        <div
          class="layer-box repository"
          :class="{ active: activeLayer === 'repository' }"
          @click="setActiveLayer('repository')"
        >
          <div class="layer-header">
            <span class="layer-icon">🗄️</span>
            <span class="layer-name">Repository</span>
            <span class="layer-badge">数据访问</span>
          </div>
          <div class="layer-content">
            <div class="duty">职责：数据持久化、查询封装、ORM 映射</div>
            <div class="tech">技术：MyBatis / GORM / Hibernate</div>
          </div>
        </div>

        <div class="arrow-down">⬇️ SQL</div>

        <!-- Domain 层 -->
        <div
          class="layer-box domain"
          :class="{ active: activeLayer === 'domain' }"
          @click="setActiveLayer('domain')"
        >
          <div class="layer-header">
            <span class="layer-icon">📦</span>
            <span class="layer-name">Domain / Model</span>
            <span class="layer-badge">领域模型</span>
          </div>
          <div class="layer-content">
            <div class="duty">职责：实体定义、业务规则、值对象</div>
            <div class="tech">技术：POJO / Struct / Class</div>
          </div>
        </div>

        <div class="arrow-down">⬇️ 持久化</div>

        <!-- 数据库 -->
        <div class="layer-box database">
          <div class="layer-icon">💾</div>
          <div class="layer-title">数据库</div>
          <div class="layer-desc">MySQL / PostgreSQL / MongoDB</div>
        </div>
      </div>

      <!-- 右侧说明面板 -->
      <div class="info-panel" v-if="activeLayer">
        <h4>{{ layerInfo.title }}</h4>
        <p>{{ layerInfo.description }}</p>
        <div class="analogy">
          <strong>💡 类比：</strong>{{ layerInfo.analogy }}
        </div>
        <div class="common-mistakes">
          <strong>⚠️ 常见错误：</strong>
          <ul>
            <li v-for="mistake in layerInfo.mistakes" :key="mistake">{{ mistake }}</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- 底部交互提示 -->
    <div class="interaction-hint">
      💡 点击各层查看详细说明 | 实际调用流向：从上到下，依赖从下到上
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const activeLayer = ref('')

const setActiveLayer = (layer) => {
  activeLayer.value = activeLayer.value === layer ? '' : layer
}

const layerInfo = computed(() => {
  const infoMap = {
    controller: {
      title: 'Controller 层 - 请求的"门童"',
      description: 'Controller 是系统的入口，负责接收 HTTP 请求、解析参数、进行基础校验，然后调用 Service 层处理业务。',
      analogy: '就像餐厅的门童，负责迎接客人（接收请求）、检查预约（参数校验）、引导入座（路由到对应服务），但不负责做菜。',
      mistakes: [
        '在 Controller 里写业务逻辑（应该放在 Service）',
        '直接操作数据库（应该调用 Repository）',
        '不做参数校验，导致脏数据流入系统'
      ]
    },
    service: {
      title: 'Service 层 - 业务逻辑的"厨师"',
      description: 'Service 是系统的核心，负责编排业务逻辑、管理事务、协调多个 Repository。这一层应该包含所有的业务规则和流程。',
      analogy: '就像餐厅的厨师，负责按照菜谱（业务规则）做菜，需要协调各种食材（数据），把控菜品质量（业务正确性）。',
      mistakes: [
        'Service 之间互相调用，形成循环依赖',
        '在 Service 里直接写 SQL（应该放在 Repository）',
        '一个 Service 方法过长，包含多个业务场景（应该拆分成多个方法）'
      ]
    },
    repository: {
      title: 'Repository 层 - 数据的"仓管"',
      description: 'Repository 负责与数据库交互，封装所有的 CRUD 操作。上层不需要关心具体的数据库类型和 SQL 语句。',
      analogy: '就像餐厅的仓管员，负责从仓库（数据库）取食材、存放剩余食材，厨师（Service）只需要告诉他要什么，不需要知道仓库在哪。',
      mistakes: [
        '在 Repository 里写业务逻辑（应该只负责数据访问）',
        '直接返回数据库实体给前端（应该转换为 DTO）',
        '一个 Repository 操作多个表（应该拆分到不同 Repository）'
      ]
    },
    domain: {
      title: 'Domain 层 - 业务概念的"蓝图"',
      description: 'Domain 定义了系统中的实体、值对象、业务规则。它是所有层的依赖基础，但不依赖任何其他层。',
      analogy: '就像餐厅的菜单和菜品标准，定义了什么是"宫保鸡丁"、用什么食材、什么口味。所有厨师都要按照这个标准来做。',
      mistakes: [
        'Domain 对象里包含持久化注解（应该保持纯净）',
        '在 Domain 里写业务逻辑（业务逻辑应该在 Service）',
        'Domain 对象之间循环依赖'
      ]
    }
  }
  return infoMap[activeLayer.value] || {}
})
</script>

<style scoped>
.layered-architecture-demo {
  padding: 20px;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4e8ec 100%);
  border-radius: 12px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.architecture-container {
  display: flex;
  gap: 20px;
  align-items: flex-start;
}

.client-layer {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.backend-layers {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.layer-box {
  padding: 16px;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid transparent;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.layer-box:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
}

.layer-box.active {
  border-color: #409eff;
  box-shadow: 0 0 0 3px rgba(64, 158, 255, 0.2);
}

/* 各层颜色主题 */
.controller { border-left: 4px solid #67c23a; }
.service { border-left: 4px solid #e6a23c; }
.repository { border-left: 4px solid #409eff; }
.domain { border-left: 4px solid #909399; }
.client { border-left: 4px solid #f56c6c; }
.database { border-left: 4px solid #8e44ad; }

.layer-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 8px;
}

.layer-icon {
  font-size: 20px;
}

.layer-name {
  font-weight: 600;
  font-size: 15px;
  color: #303133;
}

.layer-badge {
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 11px;
  background: #f0f2f5;
  color: #606266;
}

.layer-content {
  padding-left: 30px;
  font-size: 13px;
  color: #606266;
  line-height: 1.6;
}

.duty, .tech {
  margin: 4px 0;
}

.arrow-down {
  text-align: center;
  padding: 6px;
  font-size: 12px;
  color: #909399;
}

.info-panel {
  width: 320px;
  padding: 20px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 20px;
}

.info-panel h4 {
  margin: 0 0 12px 0;
  color: #303133;
  font-size: 16px;
  padding-bottom: 10px;
  border-bottom: 2px solid #409eff;
}

.info-panel p {
  margin: 0 0 16px 0;
  color: #606266;
  font-size: 13px;
  line-height: 1.7;
}

.analogy, .common-mistakes {
  margin: 12px 0;
  padding: 12px;
  border-radius: 6px;
  font-size: 12px;
  line-height: 1.6;
}

.analogy {
  background: #f0f9ff;
  border-left: 3px solid #409eff;
  color: #1d4ed8;
}

.common-mistakes {
  background: #fff2f0;
  border-left: 3px solid #ff4d4f;
  color: #cf1322;
}

.common-mistakes ul {
  margin: 6px 0 0 0;
  padding-left: 16px;
}

.common-mistakes li {
  margin: 4px 0;
}

.interaction-hint {
  text-align: center;
  padding: 16px;
  margin-top: 16px;
  background: #f6ffed;
  border: 1px solid #b7eb8f;
  border-radius: 8px;
  color: #389e0d;
  font-size: 13px;
}

@media (max-width: 1024px) {
  .architecture-container {
    flex-direction: column;
  }

  .info-panel {
    width: 100%;
    position: static;
  }
}
</style>
