<template>
  <div class="storage-topology-demo">
    <!-- 控制面板 -->
    <div class="control-panel">
      <el-radio-group v-model="viewMode" size="small">
        <el-radio-button label="overview">存储概览</el-radio-button>
        <el-radio-button label="object">对象存储</el-radio-button>
        <el-radio-button label="block">块存储</el-radio-button>
        <el-radio-button label="file">文件存储</el-radio-button>
      </el-radio-group>

      <el-switch v-model="showDetails" active-text="显示详情" style="margin-left: 20px" />
    </div>

    <!-- 存储架构图 -->
    <div class="storage-architecture">
      <!-- 应用接入层 -->
      <div class="layer access-layer">
        <div class="layer-title">🔌 应用接入层</div>
        <div class="access-methods">
          <div class="method-card" v-for="method in accessMethods" :key="method.name"
               @mouseenter="hoverMethod = method.name" @mouseleave="hoverMethod = null">
            <div class="method-icon">{{ method.icon }}</div>
            <div class="method-name">{{ method.name }}</div>
            <div class="method-desc">{{ method.description }}</div>

            <div class="method-tooltip" v-if="hoverMethod === method.name && showDetails">
              <div v-for="detail in method.details" :key="detail">{{ detail }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 存储网关层 -->
      <div class="layer gateway-layer">
        <div class="layer-title">🚪 存储网关层</div>
        <div class="gateways-grid">
          <div class="gateway-card" v-for="gateway in storageGateways" :key="gateway.name"
               :class="gateway.type">
            <div class="gateway-header">
              <span class="gateway-icon">{{ gateway.icon }}</span>
              <span class="gateway-name">{{ gateway.name }}</span>
            </div>

            <div class="gateway-metrics" v-if="showDetails">
              <div class="metric">
                <span class="metric-label">TPS：</span>
                <span class="metric-value">{{ gateway.tps }}</span>
              </div>
              <div class="metric">
                <span class="metric-label">延迟：</span>
                <span class="metric-value">{{ gateway.latency }}ms</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 存储服务层 -->
      <div class="layer storage-services-layer">
        <div class="layer-title">💾 存储服务层</div>
        <div class="storage-types-grid">
          <!-- 对象存储 -->
          <div class="storage-type-card object-storage"
               :class="{ active: viewMode === 'object' || viewMode === 'overview' }">
            <div class="storage-header">
              <div class="storage-icon">🪣</div>
              <div class="storage-title">对象存储 OSS</div>
            </div>

            <div class="storage-desc">适合存储图片、视频、日志等非结构化数据</div>

            <div class="storage-features">
              <div class="feature">
                <span class="feature-icon">✅</span>
                <span>海量存储</span>
              </div>
              <div class="feature">
                <span class="feature-icon">✅</span>
                <span>低成本</span>
              </div>
              <div class="feature">
                <span class="feature-icon">✅</span>
                <span>CDN 加速</span>
              </div>
            </div>

            <div class="storage-buckets" v-if="showDetails">
              <div class="bucket" v-for="bucket in buckets" :key="bucket.name">
                <div class="bucket-info">
                  <span class="bucket-name">{{ bucket.name }}</span>
                  <span class="bucket-objects">{{ bucket.objects }} 个对象</span>
                </div>

                <div class="bucket-size">{{ bucket.size }}</div>
              </div>
            </div>
          </div>

          <!-- 块存储 -->
          <div class="storage-type-card block-storage"
               :class="{ active: viewMode === 'block' || viewMode === 'overview' }">
            <div class="storage-header">
              <div class="storage-icon">💽</div>
              <div class="storage-title">块存储 EBS</div>
            </div>

            <div class="storage-desc">为云服务器提供高性能、低延迟的数据块存储</div>

            <div class="storage-features">
              <div class="feature">
                <span class="feature-icon">✅</span>
                <span>高性能 SSD</span>
              </div>
              <div class="feature">
                <span class="feature-icon">✅</span>
                <span>快照备份</span>
              </div>
              <div class="feature">
                <span class="feature-icon">✅</span>
                <span>弹性扩容</span>
              </div>
            </div>

            <div class="volumes-list" v-if="showDetails">
              <div class="volume" v-for="vol in volumes" :key="vol.id">
                <div class="volume-info">
                  <div class="volume-header">
                    <span class="volume-name">{{ vol.name }}</span>
                    <span class="volume-type" :class="vol.type">{{ vol.type }}</span>
                  </div>

                  <div class="volume-meta">
                    <span>{{ vol.size }}</span>
                    <span>•</span>
                    <span>挂载到: {{ vol.attachedTo }}</span>
                  </div>
                </div>

                <div class="volume-iops" v-if="vol.iops">
                  <div class="iops-label">IOPS</div>
                  <div class="iops-value">{{ vol.iops }}</div>
                </div>
              </div>
            </div>
          </div>

          <!-- 文件存储 -->
          <div class="storage-type-card file-storage"
               :class="{ active: viewMode === 'file' || viewMode === 'overview' }">
            <div class="storage-header">
              <div class="storage-icon">📁</div>
              <div class="storage-title">文件存储 NAS</div>
            </div>

            <div class="storage-desc">为多个计算节点提供共享文件系统访问</div>

            <div class="storage-features">
              <div class="feature">
                <span class="feature-icon">✅</span>
                <span>共享访问</span>
              </div>
              <div class="feature">
                <span class="feature-icon">✅</span>
                <span>POSIX 兼容</span>
              </div>
              <div class="feature">
                <span class="feature-icon">✅</span>
                <span>自动扩容</span>
              </div>
            </div>

            <div class="filesystems-list" v-if="showDetails">
              <div class="filesystem" v-for="fs in filesystems" :key="fs.name">
                <div class="fs-header">
                  <div class="fs-info">
                    <span class="fs-name">{{ fs.name }}</span>
                    <span class="fs-protocol" :class="fs.protocol">{{ fs.protocol }}</span>
                  </div>

                  <div class="fs-capacity">
                    <span class="capacity-used">{{ fs.used }}</span>
                    <span class="capacity-total">/ {{ fs.total }}</span>
                  </div>
                </div>

                <div class="fs-capacity-bar">
                  <div class="capacity-progress" :style="{ width: fs.percentage + '%' }"
                       :class="{ warning: fs.percentage > 80, danger: fs.percentage > 90 }"></div>
                </div>

                <div class="fs-mounts">
                  <div class="mounts-label">挂载点：</div>
                  <div class="mounts-list">
                    <span class="mount-point" v-for="mount in fs.mounts" :key="mount">{{ mount }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 存储选型对比 -->
    <div class="comparison-section">
      <div class="comparison-title">📊 存储类型选型对比</div>

      <div class="comparison-table">
        <div class="table-header">
          <div class="header-cell">特性</div>
          <div class="header-cell object">对象存储</div>
          <div class="header-cell block">块存储</div>
          <div class="header-cell file">文件存储</div>
        </div>

        <div class="table-row" v-for="row in comparisonData" :key="row.feature">
          <div class="cell feature">{{ row.feature }}</div>
          <div class="cell" :class="{ highlight: row.object === '优秀' || row.object === '强' }">{{ row.object }}</div>
          <div class="cell" :class="{ highlight: row.block === '优秀' || row.block === '强' }">{{ row.block }}</div>
          <div class="cell" :class="{ highlight: row.file === '优秀' || row.file === '强' }">{{ row.file }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const viewMode = ref('overview')
const showDetails = ref(false)
const hoverMethod = ref(null)

// 接入方式
const accessMethods = [
  {
    name: 'API/SDK',
    icon: '🔧',
    description: '通过编程接口访问存储',
    details: ['支持 RESTful API', '提供多语言 SDK', '支持批量操作', '可编程访问控制']
  },
  {
    name: '挂载访问',
    icon: '🔗',
    description: '像本地磁盘一样使用',
    details: ['支持 NFS 协议', '支持 SMB 协议', 'POSIX 兼容', '透明访问']
  },
  {
    name: '控制台',
    icon: '🖥️',
    description: '通过 Web 界面管理',
    details: ['可视化操作', '权限管理', '监控报表', '日志审计']
  }
]

// 存储网关
const storageGateways = [
  { name: '对象网关', icon: '🪣', type: 'object', tps: '10000', latency: '5' },
  { name: '块网关', icon: '💽', type: 'block', tps: '50000', latency: '1' },
  { name: '文件网关', icon: '📁', type: 'file', tps: '8000', latency: '3' }
]

// 存储桶
const buckets = [
  { name: 'images-bucket', protocol: 'S3', used: '2.5 TB', total: '10 TB', percentage: 25, mounts: ['CDN 加速', '图片处理'] },
  { name: 'logs-bucket', protocol: 'S3', used: '850 GB', total: '5 TB', percentage: 17, mounts: ['日志归档', '数据分析'] },
  { name: 'backup-bucket', protocol: 'S3', used: '4.2 TB', total: '5 TB', percentage: 84, mounts: ['自动备份', '跨区域复制'] }
]

// 云盘
const volumes = [
  { name: 'data-disk-01', type: 'ESSD', size: '500 GB', used: '320 GB', percentage: 64, attachedTo: 'DB-Server-01', iops: 50000 },
  { name: 'data-disk-02', type: 'SSD', size: '200 GB', used: '145 GB', percentage: 72, attachedTo: 'App-Server-02', iops: 25000 },
  { name: 'log-disk-01', type: 'SATA', size: '1 TB', used: '680 GB', percentage: 68, attachedTo: 'Log-Server-01', iops: 5000 }
]

// 文件系统
const filesystems = [
  { name: 'shared-data', protocol: 'NFS', used: '1.2 TB', total: '5 TB', percentage: 24, mounts: ['/mnt/shared'] },
  { name: 'dev-env', protocol: 'NFS', used: '450 GB', total: '2 TB', percentage: 22, mounts: ['/mnt/dev'] },
  { name: 'team-share', protocol: 'SMB', used: '890 GB', total: '3 TB', percentage: 30, mounts: ['\\\\nas\\team'] }
]

// 对比数据
const comparisonData = [
  { feature: '访问协议', object: 'HTTP/HTTPS', block: 'iSCSI/NVMe', file: 'NFS/SMB' },
  { feature: '性能', object: '高吞吐', block: '低延迟', file: '中等' },
  { feature: '数据共享', object: '弱', block: '不支持', file: '强' },
  { feature: '容量扩展', object: '强', block: '中等', file: '中等' },
  { feature: '成本', object: '低', block: '高', file: '中等' },
  { feature: '典型场景', object: '图片/视频/备份', block: '数据库/应用', file: '共享文件/开发' }
]
</script>

<style scoped>
.storage-topology-demo {
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

.storage-architecture {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 20px;
}

.layer {
  background: white;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.layer-title {
  font-size: 14px;
  font-weight: 600;
  color: #606266;
  margin-bottom: 12px;
  text-transform: uppercase;
  letter-spacing: 1px;
}

/* Access Layer */
.access-methods {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 12px;
}

.method-card {
  background: #f5f7fa;
  border-radius: 8px;
  padding: 16px;
  text-align: center;
  position: relative;
  cursor: pointer;
  transition: all 0.3s;
}

.method-card:hover {
  background: #ecf5ff;
  transform: translateY(-2px);
}

.method-icon {
  font-size: 32px;
  margin-bottom: 8px;
}

.method-name {
  font-size: 14px;
  font-weight: 600;
  color: #303133;
  margin-bottom: 4px;
}

.method-desc {
  font-size: 12px;
  color: #909399;
}

.method-tooltip {
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  background: #333;
  color: white;
  padding: 10px 14px;
  border-radius: 8px;
  font-size: 12px;
  z-index: 10;
  margin-bottom: 8px;
  white-space: nowrap;
}

/* Gateway Layer */
.gateways-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 12px;
}

.gateway-card {
  background: #f5f7fa;
  border-radius: 8px;
  padding: 12px;
  border-left: 4px solid;
}

.gateway-card.object {
  border-left-color: #409eff;
}

.gateway-card.block {
  border-left-color: #67c23a;
}

.gateway-card.file {
  border-left-color: #e6a23c;
}

.gateway-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 10px;
}

.gateway-icon {
  font-size: 20px;
}

.gateway-name {
  font-size: 14px;
  font-weight: 600;
  color: #303133;
}

.gateway-metrics {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.metric {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
}

.metric-label {
  color: #909399;
}

.metric-value {
  color: #409eff;
  font-weight: 500;
}

/* Storage Types Grid */
.storage-types-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 16px;
}

.storage-type-card {
  background: #f5f7fa;
  border-radius: 12px;
  padding: 16px;
  border: 2px solid transparent;
  transition: all 0.3s;
}

.storage-type-card:hover,
.storage-type-card.active {
  border-color: #409eff;
  background: #ecf5ff;
}

.storage-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 8px;
}

.storage-icon {
  font-size: 28px;
}

.storage-title {
  font-size: 16px;
  font-weight: 600;
  color: #303133;
}

.storage-desc {
  font-size: 12px;
  color: #606266;
  margin-bottom: 12px;
  line-height: 1.5;
}

.storage-features {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 12px;
}

.feature {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: #606266;
}

.feature-icon {
  color: #67c23a;
}

/* Buckets List */
.storage-buckets {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid #e4e7ed;
}

.bucket {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 10px;
  background: white;
  border-radius: 6px;
}

.bucket-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.bucket-name {
  font-size: 13px;
  font-weight: 500;
  color: #303133;
}

.bucket-objects {
  font-size: 11px;
  color: #909399;
}

.bucket-size {
  font-size: 12px;
  color: #409eff;
  font-weight: 500;
}

/* Volumes List */
.volumes-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid #e4e7ed;
}

.volume {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background: white;
  border-radius: 6px;
}

.volume-info {
  flex: 1;
}

.volume-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
}

.volume-name {
  font-size: 13px;
  font-weight: 500;
  color: #303133;
}

.volume-type {
  font-size: 10px;
  padding: 1px 6px;
  border-radius: 10px;
  text-transform: uppercase;
}

.volume-type.essd {
  background: #409eff;
  color: white;
}

.volume-type.ssd {
  background: #67c23a;
  color: white;
}

.volume-type.sata {
  background: #909399;
  color: white;
}

.volume-meta {
  font-size: 11px;
  color: #909399;
}

.volume-meta span {
  margin: 0 4px;
}

.volume-iops {
  text-align: center;
  padding-left: 12px;
  border-left: 1px solid #e4e7ed;
}

.iops-label {
  font-size: 10px;
  color: #909399;
  text-transform: uppercase;
}

.iops-value {
  font-size: 14px;
  font-weight: 600;
  color: #409eff;
}

/* Filesystems List */
.filesystems-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid #e4e7ed;
}

.filesystem {
  background: white;
  border-radius: 6px;
  padding: 12px;
}

.fs-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.fs-info {
  display: flex;
  align-items: center;
  gap: 8px;
}

.fs-name {
  font-size: 14px;
  font-weight: 500;
  color: #303133;
}

.fs-protocol {
  font-size: 10px;
  padding: 2px 8px;
  border-radius: 10px;
  font-weight: 500;
}

.fs-protocol.nfs {
  background: #409eff;
  color: white;
}

.fs-protocol.smb {
  background: #67c23a;
  color: white;
}

.fs-capacity {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 13px;
}

.capacity-used {
  color: #303133;
  font-weight: 500;
}

.capacity-total {
  color: #909399;
}

.fs-capacity-bar {
  height: 4px;
  background: #e4e7ed;
  border-radius: 2px;
  margin-bottom: 8px;
  overflow: hidden;
}

.capacity-progress {
  height: 100%;
  background: #67c23a;
  border-radius: 2px;
  transition: width 0.3s;
}

.capacity-progress.warning {
  background: #e6a23c;
}

.capacity-progress.danger {
  background: #f56c6c;
}

.fs-mounts {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.mounts-label {
  font-size: 12px;
  color: #909399;
}

.mounts-list {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}

.mount-point {
  font-size: 11px;
  padding: 2px 8px;
  background: #ecf5ff;
  color: #409eff;
  border-radius: 10px;
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

.header-cell.object {
  background: #ecf5ff;
  color: #409eff;
}

.header-cell.block {
  background: #f0f9eb;
  color: #67c23a;
}

.header-cell.file {
  background: #fdf6ec;
  color: #e6a23c;
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

.cell.feature {
  text-align: left;
  font-weight: 500;
  color: #303133;
  background: #fafafa;
}

.cell.highlight {
  font-weight: 600;
  color: #67c23a;
}

@media (max-width: 768px) {
  .control-panel {
    flex-direction: column;
    align-items: stretch;
  }

  .storage-types-grid {
    grid-template-columns: 1fr;
  }

  .comparison-table {
    font-size: 11px;
  }

  .table-header,
  .table-row {
    grid-template-columns: 80px repeat(3, 1fr);
  }

  .header-cell,
  .cell {
    padding: 6px 8px;
  }
}
</style>
