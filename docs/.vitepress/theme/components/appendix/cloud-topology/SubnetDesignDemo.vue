<template>
  <div class="subnet-design-demo">
    <!-- 控制面板 -->
    <div class="control-panel">
      <div class="panel-section">
        <span class="panel-label">VPC 网段：</span>
        <el-radio-group v-model="vpcCidr" size="small">
          <el-radio-button label="172.16.0.0/12">172.16.0.0/12</el-radio-button>
          <el-radio-button label="10.0.0.0/8">10.0.0.0/8</el-radio-button>
          <el-radio-button label="192.168.0.0/16">192.168.0.0/16</el-radio-button>
        </el-radio-group>
      </div>

      <div class="panel-section">
        <span class="panel-label">子网划分：</span>
        <el-slider v-model="subnetBits" :min="2" :max="4" show-stops :marks="{2: '/24', 3: '/25', 4: '/26'}" style="width: 200px;" />
      </div>

      <el-switch v-model="showCalculation" active-text="显示计算过程" style="margin-left: 20px;" />
    </div>

    <!-- 网段可视化 -->
    <div class="network-visualization">
      <div class="vpc-block">
        <div class="vpc-header">
          <span class="vpc-name">VPC 网段</span>
          <span class="vpc-cidr">{{ vpcCidr }}</span>
          <span class="vpc-stats">可用 IP: {{ totalIps.toLocaleString() }} 个</span>
        </div>

        <div class="subnet-grid">
          <div
            v-for="(subnet, index) in subnets"
            :key="index"
            class="subnet-cell"
            :class="[subnet.type, { active: selectedSubnet === index }]"
            @click="selectSubnet(index)"
            @mouseenter="hoverSubnet = index"
            @mouseleave="hoverSubnet = null"
          >
            <div class="cell-header">
              <span class="cell-type">{{ subnet.type === 'public' ? '🌐' : '🔒' }}</span>
              <span class="cell-name">{{ subnet.name }}</span>
            </div>
            <div class="cell-cidr">{{ subnet.cidr }}</div>
            <div class="cell-stats">
              <span class="ip-count">{{ subnet.ipCount }} IP</span>
              <span class="az-badge">{{ subnet.az }}</span>
            </div>

            <!-- 悬停提示 -->
            <div class="cell-tooltip" v-if="hoverSubnet === index && showCalculation">
              <div class="tooltip-row">
                <span>网段范围：</span>
                <code>{{ subnet.range }}</code>
              </div>
              <div class="tooltip-row">
                <span>可用 IP：</span>
                <span>{{ subnet.usableIps }} 个</span>
              </div>
              <div class="tooltip-row">
                <span>预留 IP：</span>
                <span>网络地址 + 广播地址 + 网关</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 网段计算说明 -->
    <div class="calculation-panel" v-if="showCalculation">
      <h4>📐 子网划分计算说明</h4>

      <div class="calc-section">
        <h5>1. 基础概念</h5>
        <div class="concept-grid">
          <div class="concept-item">
            <span class="concept-label">CIDR 表示法：</span>
            <code>/24</code> 表示网络位占 24 位，主机位 8 位
          </div>
          <div class="concept-item">
            <span class="concept-label">总 IP 数：</span>
            <code>2^(32-24) = 256</code> 个
          </div>
          <div class="concept-item">
            <span class="concept-label">可用 IP 数：</span>
            <code>256 - 3 = 253</code> 个（减去网络、广播、网关地址）
          </div>
        </div>
      </div>

      <div class="calc-section">
        <h5>2. 当前配置计算</h5>
        <div class="calc-result">
          <div class="result-item">
            <span class="result-label">VPC 网段：</span>
            <code class="result-value">{{ vpcCidr }}</code>
          </div>
          <div class="result-item">
            <span class="result-label">子网掩码：</span>
            <code class="result-value">/{{ subnetMask }}</code>
          </div>
          <div class="result-item">
            <span class="result-label">子网数量：</span>
            <code class="result-value">{{ subnets.length }} 个</code>
          </div>
          <div class="result-item">
            <span class="result-label">每个子网 IP 数：</span>
            <code class="result-value">{{ ipsPerSubnet }} 个</code>
          </div>
        </div>
      </div>
    </div>

    <!-- 最佳实践提示 -->
    <div class="tips-panel">
      <h4>💡 子网设计最佳实践</h4>
      <div class="tips-grid">
        <div class="tip-item">
          <div class="tip-icon">🎯</div>
          <div class="tip-content">
            <h5>预留足够 IP</h5>
            <p>每个子网至少预留 20% 的 IP 作为扩容缓冲</p>
          </div>
        </div>
        <div class="tip-item">
          <div class="tip-icon">🔒</div>
          <div class="tip-content">
            <h5>公网私网分离</h5>
            <p>核心数据放在私网子网，通过 NAT 访问外网</p>
          </div>
        </div>
        <div class="tip-item">
          <div class="tip-icon">🌐</div>
          <div class="tip-content">
            <h5>多 AZ 部署</h5>
            <p>同一 VPC 的不同子网放在不同可用区</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const vpcCidr = ref('172.16.0.0/12')
const subnetBits = ref(2)
const showCalculation = ref(false)
const selectedSubnet = ref(null)
const hoverSubnet = ref(null)

const subnetMask = computed(() => {
  const baseMask = parseInt(vpcCidr.value.split('/')[1])
  return baseMask + subnetBits.value
})

const ipsPerSubnet = computed(() => {
  return Math.pow(2, 32 - subnetMask.value)
})

const totalIps = computed(() => {
  const mask = parseInt(vpcCidr.value.split('/')[1])
  return Math.pow(2, 32 - mask)
})

const subnets = computed(() => {
  const baseCidr = vpcCidr.value.split('/')[0]
  const octets = baseCidr.split('.').map(Number)
  const count = Math.pow(2, subnetBits.value)

  const result = []
  for (let i = 0; i < count; i++) {
    const thirdOctet = octets[2] + Math.floor(i / 256)
    const fourthOctet = i % 256

    const cidr = `${octets[0]}.${octets[1]}.${thirdOctet}.${fourthOctet}/${subnetMask.value}`
    const startIp = `${octets[0]}.${octets[1]}.${thirdOctet}.${fourthOctet}`
    const endIp = `${octets[0]}.${octets[1]}.${thirdOctet + Math.floor((ipsPerSubnet.value - 1) / 256)}.${(fourthOctet + ipsPerSubnet.value - 1) % 256}`

    result.push({
      name: `子网-${String.fromCharCode(65 + i)}`,
      cidr,
      type: i % 2 === 0 ? 'public' : 'private',
      ipCount: ipsPerSubnet.value,
      az: `可用区 ${String.fromCharCode(65 + (i % 3))}`,
      range: `${startIp} - ${endIp}`,
      usableIps: ipsPerSubnet.value - 3
    })
  }
  return result
})

const selectSubnet = (index) => {
  selectedSubnet.value = selectedSubnet.value === index ? null : index
}
</script>

<style scoped>
.subnet-design-demo {
  padding: 20px;
  background: #f5f7fa;
  border-radius: 8px;
}

.control-panel {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  align-items: center;
  margin-bottom: 20px;
  padding: 16px;
  background: white;
  border-radius: 8px;
}

.panel-section {
  display: flex;
  align-items: center;
  gap: 8px;
}

.panel-label {
  font-size: 13px;
  color: #606266;
  font-weight: 500;
}

/* Network Visualization */
.network-visualization {
  margin-bottom: 20px;
}

.vpc-block {
  background: white;
  border-radius: 12px;
  padding: 20px;
  border: 2px solid #409eff;
}

.vpc-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid #e4e7ed;
}

.vpc-name {
  font-size: 16px;
  font-weight: 600;
  color: #303133;
}

.vpc-cidr {
  font-size: 13px;
  padding: 4px 8px;
  background: #ecf5ff;
  color: #409eff;
  border-radius: 4px;
  font-family: monospace;
}

.vpc-stats {
  font-size: 12px;
  color: #909399;
}

/* Subnet Grid */
.subnet-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 12px;
}

.subnet-cell {
  background: #f5f7fa;
  border-radius: 8px;
  padding: 12px;
  border: 2px solid transparent;
  cursor: pointer;
  transition: all 0.3s;
  position: relative;
}

.subnet-cell:hover {
  border-color: #c0c4cc;
  transform: translateY(-2px);
}

.subnet-cell.active {
  border-color: #409eff;
  background: #ecf5ff;
}

.subnet-cell.public {
  border-left: 4px solid #409eff;
}

.subnet-cell.private {
  border-left: 4px solid #67c23a;
}

.cell-header {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 6px;
}

.cell-type {
  font-size: 14px;
}

.cell-name {
  font-size: 13px;
  font-weight: 600;
  color: #303133;
}

.cell-cidr {
  font-size: 11px;
  color: #606266;
  font-family: monospace;
  margin-bottom: 8px;
}

.cell-stats {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.ip-count {
  font-size: 11px;
  color: #909399;
}

.az-badge {
  font-size: 10px;
  padding: 2px 6px;
  background: #e4e7ed;
  border-radius: 10px;
  color: #606266;
}

/* Cell Tooltip */
.cell-tooltip {
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

.tooltip-row {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  margin: 3px 0;
}

/* Calculation Panel */
.calculation-panel {
  background: white;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
}

.calculation-panel h4 {
  margin: 0 0 16px 0;
  color: #303133;
  font-size: 16px;
}

.calc-section {
  margin-bottom: 20px;
}

.calc-section:last-child {
  margin-bottom: 0;
}

.calc-section h5 {
  margin: 0 0 12px 0;
  color: #606266;
  font-size: 14px;
}

.concept-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 12px;
}

.concept-item {
  background: #f5f7fa;
  padding: 12px;
  border-radius: 6px;
  font-size: 13px;
  color: #606266;
}

.concept-label {
  font-weight: 600;
  color: #303133;
}

.calc-result {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 12px;
}

.result-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 14px;
  background: #f5f7fa;
  border-radius: 6px;
}

.result-label {
  font-size: 13px;
  color: #606266;
}

.result-value {
  font-size: 13px;
  color: #409eff;
  font-weight: 600;
  font-family: monospace;
}

/* Tips Panel */
.tips-panel {
  background: #f0f9eb;
  border-radius: 8px;
  padding: 20px;
  border-left: 4px solid #67c23a;
}

.tips-panel h4 {
  margin: 0 0 16px 0;
  color: #67c23a;
  font-size: 16px;
}

.tips-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 16px;
}

.tip-item {
  display: flex;
  gap: 12px;
  background: white;
  padding: 12px;
  border-radius: 6px;
}

.tip-icon {
  font-size: 24px;
  flex-shrink: 0;
}

.tip-content h5 {
  margin: 0 0 4px 0;
  font-size: 14px;
  color: #303133;
}

.tip-content p {
  margin: 0;
  font-size: 12px;
  color: #606266;
  line-height: 1.5;
}

@media (max-width: 768px) {
  .control-panel {
    flex-direction: column;
    align-items: stretch;
  }

  .panel-section {
    flex-direction: column;
    align-items: flex-start;
  }

  .subnet-grid {
    grid-template-columns: 1fr;
  }
}
</style>
