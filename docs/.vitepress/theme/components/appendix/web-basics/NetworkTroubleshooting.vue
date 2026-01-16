<template>
  <div class="network-troubleshooting">
    <div class="problem-selector">
      <div class="selector-title">选择问题类型</div>
      <div class="problem-list">
        <button
          v-for="(problem, index) in problems"
          :key="index"
          class="problem-btn"
          :class="{ active: selectedProblem === index }"
          @click="selectProblem(index)"
        >
          <span class="problem-icon">{{ problem.icon }}</span>
          <span class="problem-text">{{ problem.name }}</span>
        </button>
      </div>
    </div>

    <div class="solution-panel" v-if="selectedProblem !== null">
      <div class="solution-header">
        <div class="solution-title">{{ problems[selectedProblem].name }}</div>
        <div class="solution-desc">
          {{ problems[selectedProblem].description }}
        </div>
      </div>

      <div class="solution-steps">
        <div class="steps-title">🔧 解决步骤</div>
        <div class="steps-list">
          <div
            v-for="(step, index) in problems[selectedProblem].steps"
            :key="index"
            class="step-item"
            :class="{ completed: completedSteps.has(index) }"
            @click="toggleStep(index)"
          >
            <div class="step-number">{{ index + 1 }}</div>
            <div class="step-content">
              <div class="step-action">{{ step.action }}</div>
              <div class="step-command" v-if="step.command">
                <code>{{ step.command }}</code>
              </div>
              <div class="step-explanation">{{ step.explanation }}</div>
            </div>
            <div class="step-check">
              {{ completedSteps.has(index) ? '✓' : '○' }}
            </div>
          </div>
        </div>
      </div>

      <div class="related-tools">
        <div class="tools-title">🛠️ 相关工具</div>
        <div class="tools-list">
          <div
            v-for="(tool, index) in problems[selectedProblem].tools"
            :key="index"
            class="tool-item"
          >
            <div class="tool-name">{{ tool.name }}</div>
            <div class="tool-usage">{{ tool.usage }}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="common-commands">
      <div class="commands-title">📋 常用诊断命令</div>
      <div class="commands-grid">
        <div class="command-card" v-for="(cmd, index) in commands" :key="index">
          <div class="command-name">{{ cmd.name }}</div>
          <div class="command-syntax">{{ cmd.syntax }}</div>
          <div class="command-desc">{{ cmd.description }}</div>
        </div>
      </div>
    </div>

    <div class="troubleshooting-tips">
      <div class="tips-title">💡 故障排查技巧</div>
      <div class="tips-list">
        <div class="tip-item">
          <div class="tip-number">1</div>
          <div class="tip-content">
            <strong>从底层到顶层</strong>
            <br />物理层 → 链路层 → 网络层 → 传输层 → 应用层
          </div>
        </div>
        <div class="tip-item">
          <div class="tip-number">2</div>
          <div class="tip-content">
            <strong>分层排查</strong>
            <br />先确定问题发生在哪一层，再针对性解决
          </div>
        </div>
        <div class="tip-item">
          <div class="tip-number">3</div>
          <div class="tip-content">
            <strong>二分法定位</strong>
            <br />
            ping 本机 → ping 网关 → ping 外网 → ping 域名
          </div>
        </div>
        <div class="tip-item">
          <div class="tip-number">4</div>
          <div class="tip-content">
            <strong>查看日志</strong>
            <br />系统日志、应用日志、防火墙日志记录关键信息
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const selectedProblem = ref(0)
const completedSteps = ref(new Set())

const problems = [
  {
    icon: '🌐',
    name: '无法访问网页',
    description: '浏览器无法打开网站，显示连接错误',
    steps: [
      {
        action: '检查网络连接',
        command: 'ping 8.8.8.8',
        explanation: '测试是否能够连接到互联网（8.8.8.8 是 Google DNS）'
      },
      {
        action: '检查 DNS 解析',
        command: 'nslookup google.com',
        explanation: '测试域名是否能正确解析为 IP 地址'
      },
      {
        action: '清除 DNS 缓存',
        command: 'ipconfig /flushdns (Windows)',
        explanation: '清除本地 DNS 缓存，可能解决 DNS 污染或过期问题'
      },
      {
        action: '检查代理设置',
        command: '查看浏览器代理设置',
        explanation: '确认没有配置错误的代理服务器'
      },
      {
        action: '测试其他网站',
        command: '尝试访问不同网站',
        explanation: '确定是单个网站问题还是全局网络问题'
      }
    ],
    tools: [
      { name: 'ping', usage: '测试网络连通性' },
      { name: 'nslookup', usage: '查询 DNS 记录' },
      { name: 'traceroute', usage: '追踪网络路由' }
    ]
  },
  {
    icon: '📶',
    name: 'Wi-Fi 连接问题',
    description: 'Wi-Fi 信号弱、频繁断开或无法连接',
    steps: [
      {
        action: '检查 Wi-Fi 开关',
        command: '检查物理开关或系统设置',
        explanation: '确认 Wi-Fi 功能已开启'
      },
      {
        action: '重启网络设备',
        command: '重启路由器和光猫',
        explanation: '电源重启可以解决大部分临时故障'
      },
      {
        action: '忘记网络重新连接',
        command: '删除 Wi-Fi 配置后重新输入密码',
        explanation: '清除错误的配置信息'
      },
      {
        action: '更新网卡驱动',
        command: '设备管理器 → 网络适配器 → 更新驱动',
        explanation: '过时的驱动可能导致兼容性问题'
      },
      {
        action: '更改 DNS 服务器',
        command: '设置为 8.8.8.8 或 114.114.114.114',
        explanation: 'ISP 的 DNS 可能不稳定'
      }
    ],
    tools: [
      { name: 'wifi-menu (macOS)', usage: '查看 Wi-Fi 信息' },
      { name: 'netsh wlan (Windows)', usage: '管理无线网络' },
      { name: 'iwconfig (Linux)', usage: '配置无线接口' }
    ]
  },
  {
    icon: '🐌',
    name: '网速很慢',
    description: '网络连接正常但速度很慢',
    steps: [
      {
        action: '测试实际带宽',
        command: '访问 speedtest.net',
        explanation: '测试当前网络的上传和下载速度'
      },
      {
        action: '检查网络占用',
        command: 'netstat -an | grep ESTABLISHED',
        explanation: '查看是否有大量连接占用带宽'
      },
      {
        action: '关闭后台应用',
        command: '检查下载、更新、云同步等',
        explanation: '后台应用可能占用大量带宽'
      },
      {
        action: '更换信道',
        command: '路由器管理后台 → 无线设置',
        explanation: '拥挤的信道会严重影响 Wi-Fi 速度'
      },
      {
        action: '联系 ISP',
        command: '检查运营商是否有故障或限速',
        explanation: '可能是运营商线路问题'
      }
    ],
    tools: [
      { name: 'speedtest-cli', usage: '命令行测速' },
      { name: 'nethogs', usage: '查看进程流量' },
      { name: 'iftop', usage: '实时监控带宽' }
    ]
  },
  {
    icon: '⏱️',
    name: '延迟很高',
    description: '网络响应慢，游戏卡顿',
    steps: [
      {
        action: '测试 ping 值',
        command: 'ping -c 100 google.com',
        explanation: '发送 100 个包，统计平均延迟和丢包率'
      },
      {
        action: '追踪路由',
        command: 'traceroute google.com',
        explanation: '查看哪一跳延迟过高'
      },
      {
        action: '检查本地网络',
        command: 'ping 局域网其他设备',
        explanation: '排除本地网络问题'
      },
      {
        action: '使用有线连接',
        command: '插入网线测试',
        explanation: 'Wi-Fi 可能不稳定或有干扰'
      },
      {
        action: '检查 QoS 设置',
        command: '路由器 QoS 配置',
        explanation: '可能被其他设备或应用占用优先级'
      }
    ],
    tools: [
      { name: 'ping', usage: '测试延迟和丢包' },
      { name: 'traceroute', usage: '追踪路由路径' },
      { name: 'mtr', usage: '结合 ping 和 traceroute' }
    ]
  },
  {
    icon: '🔌',
    name: '端口无法访问',
    description: '服务正常运行但外部无法访问',
    steps: [
      {
        action: '检查服务监听',
        command: 'netstat -tuln | grep :80',
        explanation: '确认服务正在监听正确的端口'
      },
      {
        action: '检查防火墙',
        command: 'iptables -L (Linux) 或 firewall-cmd (CentOS)',
        explanation: '防火墙可能阻止了端口'
      },
      {
        action: '测试本地访问',
        command: 'curl http://localhost:8080',
        explanation: '确认服务本身运行正常'
      },
      {
        action: '检查云服务商安全组',
        command: '控制台 → 安全组规则',
        explanation: '云服务器需要额外配置安全组'
      },
      {
        action: '检查端口占用',
        command: 'lsof -i :8080',
        explanation: '确认端口没有被其他程序占用'
      }
    ],
    tools: [
      { name: 'netstat', usage: '查看网络连接' },
      { name: 'telnet', usage: '测试端口连通性' },
      { name: 'nmap', usage: '端口扫描工具' }
    ]
  }
]

const commands = [
  {
    name: 'ping',
    syntax: 'ping [host]',
    description: '测试到目标主机的连通性和延迟'
  },
  {
    name: 'traceroute',
    syntax: 'traceroute [host]',
    description: '显示数据包到达目标的路由路径'
  },
  {
    name: 'nslookup',
    syntax: 'nslookup [domain]',
    description: '查询域名的 DNS 记录'
  },
  {
    name: 'netstat',
    syntax: 'netstat -tuln',
    description: '显示网络连接和监听端口'
  },
  {
    name: 'curl',
    syntax: 'curl -v [url]',
    description: '测试 HTTP 请求并查看详细信息'
  },
  {
    name: 'tcpdump',
    syntax: 'tcpdump -i eth0',
    description: '抓取网络数据包进行分析'
  }
]

const selectProblem = (index) => {
  selectedProblem.value = index
  completedSteps.value = new Set()
}

const toggleStep = (index) => {
  if (completedSteps.value.has(index)) {
    completedSteps.value.delete(index)
  } else {
    completedSteps.value.add(index)
  }
}
</script>

<style scoped>
.network-troubleshooting {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 20px;
  background: var(--vp-c-bg-soft);
  margin: 20px 0;
}

.problem-selector {
  background: var(--vp-c-bg);
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 25px;
}

.selector-title {
  font-size: 1rem;
  font-weight: bold;
  color: var(--vp-c-text-1);
  margin-bottom: 15px;
}

.problem-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 10px;
}

.problem-btn {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 15px;
  border: 2px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  cursor: pointer;
  transition: all 0.2s;
}

.problem-btn:hover {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-bg);
}

.problem-btn.active {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-brand);
}

.problem-btn.active .problem-text {
  color: white;
}

.problem-icon {
  font-size: 1.5rem;
}

.problem-text {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
}

.solution-panel {
  background: var(--vp-c-bg);
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 25px;
}

.solution-header {
  margin-bottom: 25px;
  padding-bottom: 15px;
  border-bottom: 2px solid var(--vp-c-divider);
}

.solution-title {
  font-size: 1.2rem;
  font-weight: bold;
  color: var(--vp-c-text-1);
  margin-bottom: 8px;
}

.solution-desc {
  font-size: 0.9rem;
  color: var(--vp-c-text-3);
}

.solution-steps {
  margin-bottom: 25px;
}

.steps-title {
  font-size: 1rem;
  font-weight: bold;
  color: var(--vp-c-text-1);
  margin-bottom: 15px;
}

.steps-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.step-item {
  display: flex;
  gap: 15px;
  padding: 15px;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  border-left: 3px solid var(--vp-c-divider);
  cursor: pointer;
  transition: all 0.2s;
}

.step-item:hover {
  border-left-color: var(--vp-c-brand);
  background: var(--vp-c-bg);
}

.step-item.completed {
  border-left-color: #22c55e;
  opacity: 0.7;
}

.step-number {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: var(--vp-c-brand);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 0.9rem;
  flex-shrink: 0;
}

.step-content {
  flex: 1;
}

.step-action {
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 6px;
}

.step-command {
  margin-bottom: 6px;
}

.step-command code {
  background: var(--vp-c-bg);
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.8rem;
  color: var(--vp-c-brand);
  font-family: monospace;
}

.step-explanation {
  font-size: 0.85rem;
  color: var(--vp-c-text-3);
  line-height: 1.6;
}

.step-check {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 2px solid var(--vp-c-divider);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  color: var(--vp-c-text-3);
  flex-shrink: 0;
}

.step-item.completed .step-check {
  border-color: #22c55e;
  color: #22c55e;
}

.related-tools {
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  padding: 15px;
}

.tools-title {
  font-size: 0.95rem;
  font-weight: bold;
  color: var(--vp-c-text-1);
  margin-bottom: 12px;
}

.tools-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.tool-item {
  background: var(--vp-c-bg);
  padding: 10px 15px;
  border-radius: 6px;
  border-left: 3px solid var(--vp-c-brand);
}

.tool-name {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--vp-c-brand);
  font-family: monospace;
  margin-bottom: 4px;
}

.tool-usage {
  font-size: 0.75rem;
  color: var(--vp-c-text-3);
}

.common-commands {
  background: var(--vp-c-bg);
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 25px;
}

.commands-title {
  font-size: 1rem;
  font-weight: bold;
  color: var(--vp-c-text-1);
  margin-bottom: 15px;
}

.commands-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 15px;
}

.command-card {
  background: var(--vp-c-bg-soft);
  padding: 15px;
  border-radius: 6px;
  border-left: 3px solid var(--vp-c-brand);
}

.command-name {
  font-size: 0.9rem;
  font-weight: bold;
  color: var(--vp-c-brand);
  font-family: monospace;
  margin-bottom: 6px;
}

.command-syntax {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  font-family: monospace;
  margin-bottom: 6px;
}

.command-desc {
  font-size: 0.8rem;
  color: var(--vp-c-text-3);
  line-height: 1.5;
}

.troubleshooting-tips {
  background: var(--vp-c-bg);
  border-radius: 8px;
  padding: 20px;
  border-left: 4px solid var(--vp-c-brand);
}

.tips-title {
  font-size: 1rem;
  font-weight: bold;
  color: var(--vp-c-text-1);
  margin-bottom: 15px;
}

.tips-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.tip-item {
  display: flex;
  gap: 15px;
}

.tip-number {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: var(--vp-c-brand);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 0.9rem;
  flex-shrink: 0;
}

.tip-content {
  flex: 1;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  line-height: 1.8;
}
</style>
