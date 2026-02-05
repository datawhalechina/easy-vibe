<template>
  <div class="clean-architecture-demo">
    <div class="demo-header">
      <h4>🏗️ 整洁架构（Clean Architecture）与分层架构</h4>
      <p class="subtitle">分层架构是整洁架构的基础，理解两者的关系有助于构建更灵活的系统</p>
    </div>

    <!-- 架构对比 -->
    <div class="architecture-comparison">
      <div class="comparison-tabs">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          :class="['tab-btn', { active: currentTab === tab.id }]"
          @click="currentTab = tab.id"
        >
          {{ tab.name }}
        </button>
      </div>

      <div class="comparison-content">
        <!-- 传统分层架构 -->
        <div v-if="currentTab === 'layered'" class="tab-panel">
          <div class="arch-diagram layered">
            <div class="layer-box controller">
              <div class="layer-title">Controller 层</div>
              <div class="layer-desc">接收请求、参数校验</div>
            </div>
            <div class="arrow down">⬇️ 依赖</div>
            <div class="layer-box service">
              <div class="layer-title">Service 层</div>
              <div class="layer-desc">业务逻辑、事务管理</div>
            </div>
            <div class="arrow down">⬇️ 依赖</div>
            <div class="layer-box repository">
              <div class="layer-title">Repository 层</div>
              <div class="layer-desc">数据访问、ORM 映射</div>
            </div>
            <div class="arrow down">⬇️ 依赖</div>
            <div class="layer-box domain">
              <div class="layer-title">Domain 层</div>
              <div class="layer-desc">实体定义、业务规则</div>
            </div>
          </div>

          <div class="arch-characteristics">
            <h5>📌 传统分层架构特点</h5>
            <ul>
              <li><strong>垂直依赖</strong>：上层直接依赖下层，依赖方向从上到下</li>
              <li><strong>简单直观</strong>：结构清晰，易于理解和实现</li>
              <li><strong>适合中小型项目</strong>：快速开发，上手简单</li>
              <li><strong>潜在问题</strong>：底层变更可能影响上层，循环依赖风险</li>
            </ul>
          </div>
        </div>

        <!-- 整洁架构 -->
        <div v-else-if="currentTab === 'clean'" class="tab-panel">
          <div class="arch-diagram clean">
            <div class="clean-layers">
              <div class="clean-layer framework">
                <div class="layer-name">框架与驱动层</div>
                <div class="layer-items">Web / DB / UI / 外部接口</div>
              </div>
              <div class="clean-layer interface">
                <div class="layer-name">接口适配层</div>
                <div class="layer-items">Controller / Gateway / Presenter</div>
              </div>
              <div class="clean-layer application">
                <div class="layer-name">应用层</div>
                <div class="layer-items">Service / UseCase / DTO</div>
              </div>
              <div class="clean-layer domain">
                <div class="layer-name">领域层（核心）</div>
                <div class="layer-items">Entity / ValueObject / DomainService</div>
              </div>
            </div>

            <div class="dependency-rule">
              <div class="rule-arrow">
                <span class="arrow-line"></span>
                <span class="arrow-head">◀ 依赖方向</span>
              </div>
              <div class="rule-text">
                外层依赖内层，内层不依赖外层
              </div>
            </div>
          </div>

          <div class="arch-characteristics">
            <h5>📌 整洁架构特点</h5>
            <ul>
              <li><strong>依赖倒置</strong>：依赖方向从外到内，通过接口隔离</li>
              <li><strong>领域为核心</strong>：业务逻辑位于中心，独立于框架</li>
              <li><strong>可测试性强</strong>：核心业务可脱离框架进行单元测试</li>
              <li><strong>技术无关</strong>：可轻松切换数据库、框架等外部技术</li>
            </ul>
          </div>
        </div>

        <!-- 对比总结 -->
        <div v-else class="tab-panel">
          <div class="comparison-table">
            <table>
              <thead>
                <tr>
                  <th>特性</th>
                  <th>传统分层架构</th>
                  <th>整洁架构</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>依赖方向</td>
                  <td>从上到下</td>
                  <td>从外到内</td>
                </tr>
                <tr>
                  <td>核心业务位置</td>
                  <td>Service 层</td>
                  <td>Domain 层（中心）</td>
                </tr>
                <tr>
                  <td>框架依赖</td>
                  <td>较深（如 Spring）</td>
                  <td>较浅（通过接口隔离）</td>
                </tr>
                <tr>
                  <td>可测试性</td>
                  <td>需要集成测试</td>
                  <td>核心可单元测试</td>
                </tr>
                <tr>
                  <td>学习曲线</td>
                  <td>平缓</td>
                  <td>较陡</td>
                </tr>
                <tr>
                  <td>适用场景</td>
                  <td>中小型项目、快速迭代</td>
                  <td>大型复杂业务、长期维护</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="recommendation">
            <h5>💡 选型建议</h5>
            <div class="rec-grid">
              <div class="rec-card">
                <div class="rec-title">选择传统分层架构当...</div>
                <ul>
                  <li>项目规模较小，业务相对简单</li>
                  <li>团队对 DDD 不熟悉</li>
                  <li>需要快速上线，验证市场</li>
                  <li>技术栈相对固定</li>
                </ul>
              </div>
              <div class="rec-card recommended">
                <div class="rec-title">选择整洁架构当...</div>
                <ul>
                  <li>业务复杂，领域模型丰富</li>
                  <li>需要长期维护和演进</li>
                  <li>需要频繁切换技术栈</li>
                  <li>团队有较强的设计能力</li>
                </ul>
                <div class="rec-badge">推荐</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const currentTab = ref('layered')

const tabs = [
  { id: 'layered', name: '传统分层' },
  { id: 'clean', name: '整洁架构' },
  { id: 'comparison', name: '对比总结' }
]
</script>

<style scoped>
.clean-architecture-demo {
  padding: 24px;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4e8ec 100%);
  border-radius: 12px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.demo-header {
  text-align: center;
  margin-bottom: 24px;
}

.demo-header h4 {
  margin: 0 0 8px 0;
  color: #1a1a2e;
  font-size: 18px;
}

.subtitle {
  margin: 0;
  color: #666;
  font-size: 13px;
}

.architecture-comparison {
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
}

.comparison-tabs {
  display: flex;
  background: #f5f7fa;
  border-bottom: 1px solid #e4e7ed;
}

.tab-btn {
  padding: 12px 24px;
  border: none;
  background: transparent;
  color: #606266;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
}

.tab-btn:hover {
  color: #409eff;
}

.tab-btn.active {
  color: #409eff;
  background: white;
  font-weight: 500;
}

.tab-btn.active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: #409eff;
}

.comparison-content {
  padding: 20px;
}

.tab-panel {
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Layered Architecture */
.arch-diagram.layered {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
  margin-bottom: 20px;
}

.layer-box {
  width: 100%;
  max-width: 400px;
  padding: 16px;
  border-radius: 8px;
  text-align: center;
  border-left: 4px solid;
}

.layer-box.controller {
  background: #f0f9ff;
  border-left-color: #52c41a;
}

.layer-box.service {
  background: #fff7e6;
  border-left-color: #fa8c16;
}

.layer-box.repository {
  background: #e6f7ff;
  border-left-color: #1890ff;
}

.layer-box.domain {
  background: #f6ffed;
  border-left-color: #73d13d;
}

.layer-title {
  font-weight: 600;
  color: #1a1a2e;
  margin-bottom: 4px;
}

.layer-desc {
  font-size: 12px;
  color: #666;
}

.arrow {
  color: #909399;
  font-size: 12px;
  text-align: center;
}

.arch-characteristics {
  padding: 16px;
  background: #f8f9fa;
  border-radius: 8px;
}

.arch-characteristics h5 {
  margin: 0 0 12px 0;
  color: #1a1a2e;
  font-size: 14px;
}

.arch-characteristics ul {
  margin: 0;
  padding-left: 20px;
}

.arch-characteristics li {
  margin: 8px 0;
  color: #595959;
  font-size: 13px;
  line-height: 1.5;
}

/* Clean Architecture */
.arch-diagram.clean {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
  margin-bottom: 20px;
}

.clean-layers {
  display: flex;
  flex-direction: column-reverse;
  gap: 8px;
}

.clean-layer {
  padding: 12px 16px;
  border-radius: 8px;
  border-left: 4px solid;
}

.clean-layer.framework {
  background: #f0f0f0;
  border-left-color: #8c8c8c;
}

.clean-layer.interface {
  background: #e6f7ff;
  border-left-color: #1890ff;
}

.clean-layer.application {
  background: #fff7e6;
  border-left-color: #fa8c16;
}

.clean-layer.domain {
  background: #f6ffed;
  border-left-color: #52c41a;
}

.clean-layer .layer-name {
  font-weight: 600;
  color: #1a1a2e;
  font-size: 14px;
  margin-bottom: 4px;
}

.clean-layer .layer-items {
  font-size: 12px;
  color: #666;
}

.dependency-rule {
  background: white;
  border-radius: 8px;
  padding: 16px;
  text-align: center;
  border: 2px dashed #1890ff;
}

.rule-arrow {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 8px;
}

.rule-arrow .arrow-line {
  width: 2px;
  height: 20px;
  background: #1890ff;
}

.rule-arrow .arrow-head {
  color: #1890ff;
  font-weight: 600;
  font-size: 14px;
}

.rule-text {
  color: #595959;
  font-size: 13px;
}

/* Comparison Table */
.comparison-table {
  overflow-x: auto;
}

.comparison-table table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
}

.comparison-table th,
.comparison-table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #e8e8e8;
}

.comparison-table th {
  background: #f5f7fa;
  font-weight: 600;
  color: #1a1a2e;
}

.comparison-table tr:hover {
  background: #fafafa;
}

/* Recommendation */
.recommendation {
  margin-top: 24px;
}

.recommendation h5 {
  margin: 0 0 16px 0;
  color: #1a1a2e;
  font-size: 15px;
  text-align: center;
}

.rec-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.rec-card {
  background: #f8f9fa;
  border-radius: 8px;
  padding: 16px;
  position: relative;
}

.rec-card.recommended {
  background: #f6ffed;
  border: 2px solid #52c41a;
}

.rec-badge {
  position: absolute;
  top: -10px;
  right: 16px;
  background: #52c41a;
  color: white;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 600;
}

.rec-title {
  font-weight: 600;
  color: #1a1a2e;
  margin-bottom: 12px;
  font-size: 14px;
}

.rec-card ul {
  margin: 0;
  padding-left: 18px;
}

.rec-card li {
  margin: 6px 0;
  color: #595959;
  font-size: 12px;
  line-height: 1.5;
}

@media (max-width: 768px) {
  .rec-grid {
    grid-template-columns: 1fr;
  }
}
</style>
