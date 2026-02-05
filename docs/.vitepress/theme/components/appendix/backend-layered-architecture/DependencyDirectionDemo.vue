<template>
  <div class="dependency-direction-demo">
    <div class="demo-header">
      <h4>🔄 依赖方向：分层架构的核心规则</h4>
      <p class="subtitle">理解依赖方向，才能真正掌握分层架构</p>
    </div>

    <!-- 依赖方向可视化 -->
    <div class="direction-visualization">
      <div class="arch-diagram">
        <!-- 外层 -->
        <div class="layer outer">
          <div class="layer-label">外层（UI / 外部系统）</div>
          <div class="layer-box">Controller</div>
        </div>

        <!-- 依赖箭头 -->
        <div class="dependency-arrow down">
          <span class="arrow-line"></span>
          <span class="arrow-head">▶️ 依赖</span>
        </div>

        <!-- 中层 -->
        <div class="layer middle">
          <div class="layer-label">中层（应用层）</div>
          <div class="layer-box">Service</div>
        </div>

        <!-- 依赖箭头 -->
        <div class="dependency-arrow down">
          <span class="arrow-line"></span>
          <span class="arrow-head">▶️ 依赖</span>
        </div>

        <!-- 内层 -->
        <div class="layer inner">
          <div class="layer-label">内层（领域层）</div>
          <div class="layer-box">Domain / Repository</div>
        </div>
      </div>

      <!-- 核心原则说明 -->
      <div class="principle-box">
        <div class="principle-title">🎯 核心原则：依赖倒置（DIP）</div>
        <div class="principle-content">
          <p><strong>上层模块不应该依赖下层模块的具体实现，而应该依赖于抽象。</strong></p>
          <div class="rule-list">
            <div class="rule-item">
              <span class="rule-icon">✅</span>
              <div class="rule-text">
                <strong>Controller → Service 接口</strong>
                <div class="rule-desc">Controller 只依赖 Service 的接口，不依赖实现类</div>
              </div>
            </div>
            <div class="rule-item">
              <span class="rule-icon">✅</span>
              <div class="rule-text">
                <strong>Service → Repository 接口</strong>
                <div class="rule-desc">Service 只依赖 Repository 接口，不关心数据怎么存</div>
              </div>
            </div>
            <div class="rule-item">
              <span class="rule-icon">✅</span>
              <div class="rule-text">
                <strong>所有层依赖 Domain</strong>
                <div class="rule-desc">Domain 是核心，被所有上层依赖，但 Domain 不依赖任何层</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 依赖方向示意图 -->
    <div class="direction-diagram">
      <h5>📊 依赖方向示意图</h5>
      <div class="diagram-content">
        <pre class="diagram-code">
┌─────────────────────────────────────────────────────────────┐
│  Controller Layer                                            │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  UserController                                       │  │
│  │  - @Autowired private IUserService userService;      │  │
│  │  ✅ 依赖接口，不依赖实现                              │  │
│  └──────────────────────────────────────────────────────┘  │
│                            │                                 │
│                            ▼ 依赖（Dependency）               │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Service Layer                                        │  │
│  │  ┌────────────────────────────────────────────────┐  │  │
│  │  │  UserServiceImpl                                │  │  │
│  │  │  - @Autowired private UserRepository repository;  │  │  │
│  │  │  ✅ 依赖 Repository 接口                         │  │  │
│  │  └────────────────────────────────────────────────┘  │  │
│  │                      │                              │  │
│  │                      ▼ 依赖                          │  │
│  │  ┌────────────────────────────────────────────────┐  │  │
│  │  │  Repository Layer                               │  │  │
│  │  │  ┌──────────────────────────────────────────┐   │  │  │
│  │  │  │  UserRepository                          │   │  │  │
│  │  │  │  - extends JpaRepository&lt;User, Long&gt;    │   │  │  │
│  │  │  └──────────────────────────────────────────┘   │  │  │
│  │  │                      │                         │  │  │
│  │  │                      ▼ 依赖                     │  │  │
│  │  │  ┌──────────────────────────────────────────┐   │  │  │
│  │  │  │  Domain Layer (核心领域)                   │   │  │  │
│  │  │  │  ┌────────────────────────────────────┐  │   │  │  │
│  │  │  │  │  User (Entity)                     │  │   │  │  │
│  │  │  │  │  - 不包含任何层依赖                  │  │   │  │  │
│  │  │  │  │  - 被所有层依赖                      │  │   │  │  │
│  │  │  │  └────────────────────────────────────┘  │   │  │  │
│  │  │  └──────────────────────────────────────────┘   │  │  │
│  │  └────────────────────────────────────────────────┘  │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
        </pre>
      </div>
    </div>
  </div>
</template>

<script setup>
// Component logic can be added here if needed
</script>

<style scoped>
.dependency-direction-demo {
  padding: 24px;
  background: linear-gradient(135deg, #f0f7ff 0%, #e6f0ff 100%);
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

.direction-visualization {
  background: white;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 24px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
}

.arch-diagram {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 24px;
}

.layer {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.layer-label {
  font-size: 11px;
  color: #909399;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.layer-box {
  padding: 16px 20px;
  background: #f5f7fa;
  border-radius: 8px;
  font-weight: 500;
  color: #303133;
  text-align: center;
  border-left: 4px solid #409eff;
}

.layer.outer .layer-box {
  border-left-color: #67c23a;
}

.layer.middle .layer-box {
  border-left-color: #e6a23c;
}

.layer.inner .layer-box {
  border-left-color: #409eff;
}

.dependency-arrow {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 4px 0;
}

.arrow-line {
  width: 2px;
  height: 12px;
  background: #dcdfe6;
}

.arrow-head {
  color: #909399;
  font-size: 11px;
  margin-top: 2px;
}

.principle-box {
  background: linear-gradient(135deg, #e6f7ff 0%, #f0f7ff 100%);
  border-radius: 10px;
  padding: 20px;
  border-left: 4px solid #1890ff;
}

.principle-title {
  font-size: 15px;
  font-weight: 600;
  color: #1a1a2e;
  margin-bottom: 12px;
}

.principle-content p {
  margin: 0 0 12px 0;
  color: #595959;
  font-size: 13px;
  line-height: 1.6;
}

.rule-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.rule-item {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 10px;
  background: white;
  border-radius: 6px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
}

.rule-icon {
  font-size: 16px;
  flex-shrink: 0;
}

.rule-text {
  flex: 1;
}

.rule-text strong {
  color: #1a1a2e;
  font-size: 13px;
}

.rule-desc {
  color: #8c8c8c;
  font-size: 12px;
  margin-top: 2px;
}

.direction-diagram {
  background: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
}

.direction-diagram h5 {
  margin: 0 0 16px 0;
  color: #1a1a2e;
  font-size: 15px;
  text-align: center;
}

.diagram-content {
  overflow-x: auto;
}

.diagram-code {
  font-family: 'Monaco', 'Menlo', monospace;
  font-size: 11px;
  line-height: 1.5;
  color: #595959;
  margin: 0;
  white-space: pre;
}

@media (max-width: 768px) {
  .model-cards {
    grid-template-columns: 1fr;
  }

  .comparison-tabs {
    flex-direction: column;
  }

  .tab-btn {
    width: 100%;
    text-align: center;
  }
}
</style>
