<template>
  <div class="disaster-recovery-demo">
    <!-- 控制面板 -->
    <div class="control-panel">
      <el-radio-group v-model="drMode" size="small">
        <el-radio-button label="same-city">同城双活</el-radio-button>
        <el-radio-button label="remote">异地灾备</el-radio-button>
        <el-radio-button label="three-center">两地三中心</el-radio-button>
        <el-radio-button label="switchover">故障切换</el-radio-button>
      </el-radio-group>

      <el-switch v-model="showRPO" active-text="显示 RPO/RTO" style="margin-left: 20px" />
    </div>

    <!-- 灾备架构图 -->
    <div class="dr-architecture">
      <!-- 生产中心 -->
      <div class="dr-center production" :class="{ degraded: drMode === 'switchover' && switchoverStep >= 2 }">
        <div class="center-header">
          <div class="center-badge production">生产</div>
          <div class="center-title">生产中心 (Region A)</div>
          <div class="center-location">📍 北京</div>
        </div>

        <div class="center-content">
          <!-- 可用区 A -->
          <div class="az-block" :class="{ failed: drMode === 'switchover' && switchoverStep >= 1 }">
            <div class="az-header">
              <span class="az-name">可用区 A</span>
              <span class="az-status" :class="getAzStatus('A')">{{ getAzStatusText('A') }}</span>
            </div>

            <div class="az-resources">
              <div class="resource-group">
                <div class="group-title">计算</div>
                <div class="resource-tags">
                  <span class="tag">ECS × 8</span>
                  <span class="tag primary">SLB 主</span>
                </div>
              </div>

              <div class="resource-group">
                <div class="group-title">数据库</div>
                <div class="resource-tags">
                  <span class="tag primary">RDS 主</span>
                  <span class="tag">Redis 主</span>
                </div>
              </div>
            </div>
          </div>

          <!-- 可用区 B (同城灾备) -->
          <div class="az-block standby" v-if="drMode !== 'remote'">
            <div class="az-header">
              <span class="az-name">可用区 B</span>
              <span class="az-status standby">热备</span>
            </div>

            <div class="az-resources">
              <div class="resource-group">
                <div class="group-title">计算</div>
                <div class="resource-tags">
                  <span class="tag">ECS × 6</span>
                  <span class="tag standby">SLB 备</span>
                </div>
              </div>

              <div class="resource-group">
                <div class="group-title">数据库</div>
                <div class="resource-tags">
                  <span class="tag standby">RDS 备</span>
                  <span class="tag">Redis 备</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- RPO/RTO 指示器 -->
        <div class="rpo-indicator" v-if="showRPO">
          <div class="rpo-item">
            <span class="rpo-label">RPO</span>
            <span class="rpo-value">{{ getRPO() }}</span>
          </div>
          <div class="rpo-item">
            <span class="rpo-label">RTO</span>
            <span class="rpo-value">{{ getRTO() }}</span>
          </div>
        </div>
      </div>

      <!-- 复制链路 -->
      <div class="replication-links">
        <div class="link-group same-city" v-if="drMode === 'same-city' || drMode === 'three-center'">
          <div class="link-line"></div>
          <div class="link-label">同步复制</div>
          <div class="link-bandwidth">延迟 &lt; 5ms</div>
        </div>

        <div class="link-group remote" v-if="drMode === 'remote' || drMode === 'three-center'">
          <div class="link-line async"></div>
          <div class="link-label">异步复制</div>
          <div class="link-bandwidth">RPO ≈ 5s</div>
        </div>
      </div>

      <!-- 灾备中心 -->
      <div class="dr-center disaster-recovery" :class="{ active: drMode === 'switchover' && switchoverStep >= 2 }">
        <div class="center-header">
          <div class="center-badge dr">灾备</div>
          <div class="center-title">灾备中心 (Region B)</div>
          <div class="center-location">📍 {{ drMode === 'same-city' ? '北京 (可用区 C)' : '上海' }}</div>
        </div>

        <div class="center-content">
          <div class="az-block dr-standby" :class="{ promoted: drMode === 'switchover' && switchoverStep >= 3 }">
            <div class="az-header">
              <span class="az-name">{{ drMode === 'same-city' ? '可用区 C' : '可用区 A' }}</span>
              <span class="az-status" :class="getDrAzStatus()">{{ getDrAzStatusText() }}</span>
            </div>

            <div class="az-resources">
              <div class="resource-group">
                <div class="group-title">计算</div>
                <div class="resource-tags">
                  <span class="tag">ECS × 4</span>
                  <span :class="['tag', drMode === 'switchover' && switchoverStep >= 3 ? 'primary' : 'standby']">
                    SLB {{ drMode === 'switchover' && switchoverStep >= 3 ? '主' : '备' }}
                  </span>
                </div>
              </div>

              <div class="resource-group">
                <div class="group-title">数据库</div>
                <div class="resource-tags">
                  <span :class="['tag', drMode === 'switchover' && switchoverStep >= 3 ? 'primary' : 'standby']">
                    RDS {{ drMode === 'switchover' && switchoverStep >= 3 ? '主' : '备' }}
                  </span>
                  <span class="tag">Redis 备</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 切换进度 (仅在故障切换模式显示) -->
    <div class="switchover-progress" v-if="drMode === 'switchover'">
      <div class="progress-title">故障切换进度</div>
      <el-steps :active="switchoverStep" finish-status="success">
        <el-step title="检测故障" description="监控系统发现可用区 A 故障" />
        <el-step title="停止写入" description="切离主库，暂停业务写入" />
        <el-step title="提升备库" description="灾备中心数据库提升为主库" />
        <el-step title="流量切换" description="DNS 切换到灾备中心 SLB" />
        <el-step title="恢复服务" description="业务在灾备中心正常运行" />
      </el-steps>

      <div class="progress-actions">
        <el-button @click="prevStep" :disabled="switchoverStep === 0">上一步</el-button>
        <el-button type="primary" @click="nextStep" :disabled="switchoverStep === 5">下一步</el-button>
        <el-button @click="resetSwitchover">重置</el-button>
      </div>
    </div>

    <!-- 架构对比表 -->
    <div class="comparison-section">
      <div class="comparison-title">📊 灾备架构方案对比</div>

      <div class="comparison-table">
        <div class="table-header">
          <div class="header-cell">对比维度</div>
          <div class="header-cell">同城双活</div>
          <div class="header-cell">异地灾备</div>
          <div class="header-cell">两地三中心</div>
        </div>

        <div class="table-row" v-for="row in drComparisonData" :key="row.dimension">
          <div class="cell dimension">{{ row.dimension }}</div>
          <div class="cell">{{ row.sameCity }}</div>
          <div class="cell">{{ row.remote }}</div>
          <div class="cell highlight">{{ row.threeCenter }}</div>
        </div>
      </div>
    </div>

    <!-- RPO/RTO 说明 -->
    <div class="rpo-rto-explanation">
      <div class="explanation-title">💡 RPO 与 RTO 说明</div>

      <div class="explanation-grid">
        <div class="explanation-card">
          <div class="card-icon">⏰</div>
          <div class="card-title">RPO (恢复点目标)</div>
          <div class="card-desc">可接受的数据丢失量，即最后一次备份到故障发生的时间间隔</div>
          <div class="card-example">示例：RPO = 5秒，意味着最多丢失5秒的数据</div>
        </div>

        <div class="explanation-card">
          <div class="card-icon">🔄</div>
          <div class="card-title">RTO (恢复时间目标)</div>
          <div class="card-desc">从故障发生到业务恢复所需的最长时间</div>
          <div class="card-example">示例：RTO = 30分钟，意味着30分钟内必须恢复服务</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const drMode = ref('same-city')
const showRPO = ref(false)
const switchoverStep = ref(0)

// 获取可用区状态
const getAzStatus = (az) => {
  if (drMode.value === 'switchover' && switchoverStep.value >= 1 && az === 'A') {
    return 'failed'
  }
  return 'running'
}

const getAzStatusText = (az) => {
  if (drMode.value === 'switchover' && switchoverStep.value >= 1 && az === 'A') {
    return '故障'
  }
  return '运行中'
}

const getDrAzStatus = () => {
  if (drMode.value === 'switchover' && switchoverStep.value >= 3) {
    return 'promoted'
  }
  return 'standby'
}

const getDrAzStatusText = () => {
  if (drMode.value === 'switchover' && switchoverStep.value >= 3) {
    return '主库'
  }
  return '冷备'
}

const getRPO = () => {
  switch (drMode.value) {
    case 'same-city': return '0 (同步复制)'
    case 'remote': return '~5s (异步复制)'
    case 'three-center': return '0 (同城) / ~5s (异地)'
    default: return '-'
  }
}

const getRTO = () => {
  switch (drMode.value) {
    case 'same-city': return '~5min'
    case 'remote': return '~30min'
    case 'three-center': return '~5min (同城) / ~30min (异地)'
    default: return '-'
  }
}

const nextStep = () => {
  if (switchoverStep.value < 5) {
    switchoverStep.value++
  }
}

const prevStep = () => {
  if (switchoverStep.value > 0) {
    switchoverStep.value--
  }
}

const resetSwitchover = () => {
  switchoverStep.value = 0
}

// 灾备对比数据
const drComparisonData = [
  { dimension: '部署成本', sameCity: '中等', remote: '较低', threeCenter: '高' },
  { dimension: '运维复杂度', sameCity: '中等', remote: '低', threeCenter: '高' },
  { dimension: '数据保护', sameCity: 'RPO=0', remote: 'RPO~5s', threeCenter: '最全面' },
  { dimension: '恢复速度', sameCity: '~5分钟', remote: '~30分钟', threeCenter: '分层恢复' },
  { dimension: '适用场景', sameCity: '金融核心', remote: '中小企业', threeCenter: '大型核心' }
]
</script>

<style scoped>
.disaster-recovery-demo {
  padding: 20px;
  background: #f5f7fa;
  border-radius: 8px;
}

.control-panel {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding: 16px;
  background: white;
  border-radius: 8px;
  flex-wrap: wrap;
  gap: 12px;
}

.dr-architecture {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 20px;
}

.dr-center {
  background: white;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  border: 2px solid transparent;
  transition: all 0.3s;
}

.dr-center.production {
  border-color: #409eff;
}

.dr-center.production.degraded {
  border-color: #f56c6c;
  background: #fef0f0;
}

.dr-center.disaster-recovery {
  border-color: #67c23a;
}

.dr-center.disaster-recovery.active {
  border-color: #409eff;
  background: #ecf5ff;
}

.center-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid #e4e7ed;
}

.center-badge {
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  color: white;
}

.center-badge.production {
  background: #409eff;
}

.center-badge.dr {
  background: #67c23a;
}

.center-title {
  flex: 1;
  font-size: 15px;
  font-weight: 600;
  color: #303133;
}

.center-location {
  font-size: 13px;
  color: #909399;
}

.center-content {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

/* AZ Block */
.az-block {
  background: #f5f7fa;
  border-radius: 8px;
  padding: 12px;
  border-left: 4px solid #409eff;
  transition: all 0.3s;
}

.az-block.failed {
  border-left-color: #f56c6c;
  background: #fef0f0;
}

.az-block.standby {
  border-left-color: #67c23a;
  background: #f0f9eb;
}

.az-block.dr-standby {
  border-left-color: #e6a23c;
  background: #fdf6ec;
}

.az-block.dr-standby.promoted {
  border-left-color: #409eff;
  background: #ecf5ff;
}

.az-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.az-name {
  font-size: 14px;
  font-weight: 600;
  color: #303133;
}

.az-status {
  font-size: 11px;
  padding: 2px 8px;
  border-radius: 10px;
  font-weight: 500;
}

.az-status.running {
  background: #e1f3d8;
  color: #67c23a;
}

.az-status.failed {
  background: #fde2e2;
  color: #f56c6c;
}

.az-status.standby {
  background: #e1f3d8;
  color: #67c23a;
}

.az-status.promoted {
  background: #ecf5ff;
  color: #409eff;
}

.az-resources {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.resource-group {
  display: flex;
  align-items: center;
  gap: 8px;
}

.group-title {
  font-size: 12px;
  color: #909399;
  width: 50px;
}

.resource-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  flex: 1;
}

.tag {
  font-size: 11px;
  padding: 2px 8px;
  background: #e4e7ed;
  border-radius: 10px;
  color: #606266;
}

.tag.primary {
  background: #409eff;
  color: white;
}

.tag.standby {
  background: #67c23a;
  color: white;
}

/* RPO Indicator */
.rpo-indicator {
  display: flex;
  gap: 16px;
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px dashed #dcdfe6;
}

.rpo-item {
  display: flex;
  align-items: center;
  gap: 6px;
}

.rpo-label {
  font-size: 11px;
  color: #909399;
  text-transform: uppercase;
}

.rpo-value {
  font-size: 13px;
  font-weight: 600;
  color: #409eff;
}

/* Replication Links */
.replication-links {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background: #f5f7fa;
  border-radius: 8px;
}

.link-group {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  width: 100%;
}

.link-line {
  width: 80%;
  height: 3px;
  background: linear-gradient(90deg, #409eff, #67c23a);
  border-radius: 2px;
  position: relative;
}

.link-line::before,
.link-line::after {
  content: '';
  position: absolute;
  top: 50%;
  width: 8px;
  height: 8px;
  background: #409eff;
  border-radius: 50%;
  transform: translateY(-50%);
}

.link-line::before {
  left: -4px;
}

.link-line::after {
  right: -4px;
  background: #67c23a;
}

.link-line.async {
  background: linear-gradient(90deg, #409eff, #e6a23c);
  background-image: repeating-linear-gradient(
    90deg,
    transparent,
    transparent 10px,
    rgba(255, 255, 255, 0.3) 10px,
    rgba(255, 255, 255, 0.3) 20px
  );
}

.link-label {
  font-size: 12px;
  font-weight: 600;
  color: #606266;
}

.link-bandwidth {
  font-size: 11px;
  color: #909399;
}

/* Switchover Progress */
.switchover-progress {
  margin-top: 20px;
  padding: 20px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.progress-title {
  font-size: 16px;
  font-weight: 600;
  color: #303133;
  margin-bottom: 20px;
}

.progress-actions {
  margin-top: 20px;
  display: flex;
  gap: 12px;
  justify-content: center;
}

/* Comparison Section */
.comparison-section {
  margin-top: 20px;
  padding: 20px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.comparison-title {
  font-size: 16px;
  font-weight: 600;
  color: #303133;
  margin-bottom: 16px;
}

.comparison-table {
  overflow-x: auto;
}

.table-header {
  display: grid;
  grid-template-columns: 120px repeat(3, 1fr);
  gap: 1px;
  background: #e4e7ed;
  border-radius: 8px 8px 0 0;
  overflow: hidden;
}

.header-cell {
  padding: 12px;
  background: #f5f7fa;
  font-size: 13px;
  font-weight: 600;
  color: #606266;
  text-align: center;
}

.table-row {
  display: grid;
  grid-template-columns: 120px repeat(3, 1fr);
  gap: 1px;
  background: #e4e7ed;
  border-bottom: 1px solid #e4e7ed;
}

.table-row:last-child {
  border-radius: 0 0 8px 8px;
  overflow: hidden;
  border-bottom: none;
}

.cell {
  padding: 10px 12px;
  background: white;
  font-size: 12px;
  color: #606266;
  text-align: center;
}

.cell.dimension {
  text-align: left;
  font-weight: 500;
  color: #303133;
  background: #fafafa;
}

.cell.highlight {
  font-weight: 600;
  color: #67c23a;
}

/* RPO/RTO Explanation */
.rpo-rto-explanation {
  margin-top: 20px;
  padding: 20px;
  background: #f0f9ff;
  border-radius: 12px;
  border-left: 4px solid #409eff;
}

.explanation-title {
  font-size: 16px;
  font-weight: 600;
  color: #0969da;
  margin-bottom: 16px;
}

.explanation-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 16px;
}

.explanation-card {
  background: white;
  border-radius: 8px;
  padding: 16px;
}

.card-icon {
  font-size: 32px;
  margin-bottom: 8px;
}

.card-title {
  font-size: 15px;
  font-weight: 600;
  color: #303133;
  margin-bottom: 8px;
}

.card-desc {
  font-size: 13px;
  color: #606266;
  line-height: 1.5;
  margin-bottom: 8px;
}

.card-example {
  font-size: 12px;
  color: #909399;
  padding: 8px;
  background: #f5f7fa;
  border-radius: 4px;
}

@media (max-width: 768px) {
  .control-panel {
    flex-direction: column;
    align-items: stretch;
  }

  .center-content {
    flex-direction: column;
  }

  .comparison-table {
    font-size: 11px;
  }

  .table-header,
  .table-row {
    grid-template-columns: 80px repeat(3, 1fr);
  }
}
</style>
