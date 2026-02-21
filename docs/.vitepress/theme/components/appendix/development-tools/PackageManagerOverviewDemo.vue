<template>
  <div class="demo-root">
    <div class="demo-header">
      <span class="title">包管理器生态地图</span>
      <span class="subtitle">选择一个语言生态，探索它的包管理工具</span>
    </div>

    <div class="control-panel">
      <button
        v-for="eco in ecosystems"
        :key="eco.id"
        :class="['eco-btn', { active: activeEco === eco.id }]"
        @click="selectEco(eco.id)"
      >
        <span class="eco-icon">{{ eco.icon }}</span>
        <span class="eco-name">{{ eco.name }}</span>
      </button>
    </div>

    <div class="visualization-area">
      <div class="managers-grid">
        <div
          v-for="pm in currentManagers"
          :key="pm.id"
          :class="['pm-card', { active: activePm === pm.id }]"
          @click="selectPm(pm.id)"
        >
          <div class="pm-badge" :style="{ background: pm.color }">{{ pm.name }}</div>
          <div class="pm-tagline">{{ pm.tagline }}</div>
        </div>
      </div>

      <transition name="fade">
        <div v-if="currentPm" class="pm-detail">
          <div class="detail-top">
            <span class="detail-name" :style="{ color: currentPm.color }">{{ currentPm.name }}</span>
            <span class="detail-full">{{ currentPm.fullName }}</span>
          </div>

          <div class="detail-sections">
            <div class="detail-section">
              <div class="section-label">安装命令</div>
              <div class="cmd-list">
                <div v-for="(cmd, i) in currentPm.commands" :key="i" class="cmd-row">
                  <span class="cmd-op">{{ cmd.op }}</span>
                  <code class="cmd-code">{{ cmd.cmd }}</code>
                </div>
              </div>
            </div>

            <div class="detail-section">
              <div class="section-label">配置文件</div>
              <div class="file-list">
                <div v-for="f in currentPm.files" :key="f.name" class="file-row">
                  <code class="file-name">{{ f.name }}</code>
                  <span class="file-desc">{{ f.desc }}</span>
                </div>
              </div>
            </div>

            <div class="detail-section">
              <div class="section-label">核心特点</div>
              <div class="feature-list">
                <div v-for="feat in currentPm.features" :key="feat" class="feature-tag">{{ feat }}</div>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="pm-placeholder">
          ← 点击上方卡片查看详情
        </div>
      </transition>
    </div>

    <div class="info-box">
      <strong>核心思想：</strong>包管理器 = 应用商店，帮你下载、安装、管理别人写好的代码（库/包），并自动处理版本兼容问题。
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const activeEco = ref('js')
const activePm = ref('npm')


const ecosystems = [
  { id: 'js', icon: '🟨', name: 'JavaScript' },
  { id: 'python', icon: '🐍', name: 'Python' },
  { id: 'rust', icon: '🦀', name: 'Rust' },
  { id: 'go', icon: '🐹', name: 'Go' },
  { id: 'mac', icon: '🍎', name: 'macOS/Linux' },
  { id: 'windows', icon: '🪟', name: 'Windows' }
]

const allManagers = {
  js: [
    {
      id: 'npm',
      name: 'npm',
      fullName: 'Node Package Manager',
      tagline: '最广泛使用，Node.js 自带',
      color: '#cc3534',
      commands: [
        { op: '安装依赖', cmd: 'npm install lodash' },
        { op: '安装开发依赖', cmd: 'npm install -D typescript' },
        { op: '运行脚本', cmd: 'npm run build' },
        { op: '查看已安装', cmd: 'npm list --depth=0' }
      ],
      files: [
        { name: 'package.json', desc: '项目声明文件，记录依赖和脚本' },
        { name: 'package-lock.json', desc: '锁定精确版本，保证环境一致' },
        { name: 'node_modules/', desc: '实际安装的包存放目录' }
      ],
      features: ['Node.js 内置', '最大生态(200万+包)', '支持 workspaces', 'npx 直接运行']
    },
    {
      id: 'yarn',
      name: 'Yarn',
      fullName: 'Yet Another Resource Negotiator',
      tagline: '并行下载快，Plug\'n\'Play 免 node_modules',
      color: '#2c8ebb',
      commands: [
        { op: '安装依赖', cmd: 'yarn add lodash' },
        { op: '安装开发依赖', cmd: 'yarn add -D typescript' },
        { op: '运行脚本', cmd: 'yarn build' },
        { op: '查看已安装', cmd: 'yarn list --depth=0' }
      ],
      files: [
        { name: 'package.json', desc: '与 npm 兼容的项目声明文件' },
        { name: 'yarn.lock', desc: 'Yarn 专属锁文件，格式更易读' },
        { name: '.yarnrc.yml', desc: 'Yarn Berry 配置文件' }
      ],
      features: ['并行安装更快', 'Plug\'n\'Play 零 node_modules', 'Workspace 原生支持', '离线缓存']
    },
    {
      id: 'pnpm',
      name: 'pnpm',
      fullName: 'Performant npm',
      tagline: '硬链接共享，节省磁盘，速度最快',
      color: '#f9ad00',
      commands: [
        { op: '安装依赖', cmd: 'pnpm add lodash' },
        { op: '安装开发依赖', cmd: 'pnpm add -D typescript' },
        { op: '运行脚本', cmd: 'pnpm run build' },
        { op: '查看已安装', cmd: 'pnpm list --depth=0' }
      ],
      files: [
        { name: 'package.json', desc: '与 npm 兼容的项目声明文件' },
        { name: 'pnpm-lock.yaml', desc: 'pnpm 专属锁文件' },
        { name: '.pnpm-store/', desc: '全局内容寻址存储，跨项目共享' }
      ],
      features: ['磁盘空间最省', '安装速度最快', '严格隔离防幽灵依赖', 'Monorepo 友好']
    }
  ],
  python: [
    {
      id: 'pip',
      name: 'pip',
      fullName: 'Pip Installs Packages',
      tagline: 'Python 官方标准，简单直接',
      color: '#3776ab',
      commands: [
        { op: '安装包', cmd: 'pip install requests' },
        { op: '安装指定版本', cmd: 'pip install requests==2.28.0' },
        { op: '导出依赖', cmd: 'pip freeze > requirements.txt' },
        { op: '批量安装', cmd: 'pip install -r requirements.txt' }
      ],
      files: [
        { name: 'requirements.txt', desc: '依赖列表，每行一个包和版本' },
        { name: 'setup.py / pyproject.toml', desc: '项目元数据和打包配置' }
      ],
      features: ['Python 内置', '使用最广泛', '配合 venv 隔离环境', '简单直接']
    },
    {
      id: 'conda',
      name: 'conda',
      fullName: 'Conda Package Manager',
      tagline: '科学计算利器，同时管理 Python 版本',
      color: '#44a833',
      commands: [
        { op: '创建环境', cmd: 'conda create -n myenv python=3.11' },
        { op: '激活环境', cmd: 'conda activate myenv' },
        { op: '安装包', cmd: 'conda install numpy' },
        { op: '导出环境', cmd: 'conda env export > env.yml' }
      ],
      files: [
        { name: 'environment.yml', desc: '完整环境配置，包含 Python 版本' },
        { name: '.condarc', desc: 'conda 全局配置文件' }
      ],
      features: ['管理 Python 版本', '支持非 Python 包(CUDA等)', '科学计算首选', '跨平台环境复现']
    },
    {
      id: 'uv',
      name: 'uv',
      fullName: 'Ultra-fast Python Package Manager',
      tagline: 'Rust 编写，比 pip 快 10-100 倍',
      color: '#7c3aed',
      commands: [
        { op: '安装包', cmd: 'uv pip install requests' },
        { op: '创建虚拟环境', cmd: 'uv venv' },
        { op: '同步依赖', cmd: 'uv pip sync requirements.txt' },
        { op: '运行脚本', cmd: 'uv run python script.py' }
      ],
      files: [
        { name: 'requirements.txt', desc: '与 pip 完全兼容的依赖文件' },
        { name: 'pyproject.toml', desc: '现代 Python 项目配置标准' }
      ],
      features: ['Rust 编写极速', '与 pip 完全兼容', '内置虚拟环境管理', '2024年新秀']
    }
  ],
  rust: [
    {
      id: 'cargo',
      name: 'Cargo',
      fullName: 'Rust\'s Package Manager & Build System',
      tagline: 'Rust 官方工具，集构建/测试/发布于一体',
      color: '#dea584',
      commands: [
        { op: '添加依赖', cmd: 'cargo add serde' },
        { op: '构建项目', cmd: 'cargo build --release' },
        { op: '运行项目', cmd: 'cargo run' },
        { op: '运行测试', cmd: 'cargo test' }
      ],
      files: [
        { name: 'Cargo.toml', desc: '项目清单，声明依赖和元数据' },
        { name: 'Cargo.lock', desc: '精确锁定版本，应用项目必须提交' }
      ],
      features: ['官方唯一标准', '内置构建系统', '包 = Crate', 'crates.io 生态']
    }
  ],
  go: [
    {
      id: 'gomod',
      name: 'Go Modules',
      fullName: 'Go 官方模块系统（go mod）',
      tagline: '内置于 Go 工具链，无需额外安装',
      color: '#00acd7',
      commands: [
        { op: '初始化模块', cmd: 'go mod init github.com/user/project' },
        { op: '添加依赖', cmd: 'go get github.com/gin-gonic/gin' },
        { op: '整理依赖', cmd: 'go mod tidy' },
        { op: '下载到本地', cmd: 'go mod download' }
      ],
      files: [
        { name: 'go.mod', desc: '模块声明文件，记录依赖路径和版本' },
        { name: 'go.sum', desc: '哈希校验文件，防止依赖被篡改' }
      ],
      features: ['Go 工具链内置', '路径即包名', '自动校验完整性', 'pkg.go.dev 生态']
    }
  ],
  mac: [
    {
      id: 'brew',
      name: 'Homebrew',
      fullName: 'The Missing Package Manager for macOS',
      tagline: 'macOS/Linux 必备，安装开发工具首选',
      color: '#fbb040',
      commands: [
        { op: '安装软件', cmd: 'brew install git' },
        { op: '更新所有', cmd: 'brew upgrade' },
        { op: '搜索软件', cmd: 'brew search node' },
        { op: '查看已安装', cmd: 'brew list' }
      ],
      files: [
        { name: 'Brewfile', desc: '批量安装清单，可版本控制' }
      ],
      features: ['macOS/Linux 通用', '管理系统级工具', 'Cask 安装 GUI 应用', '社区驱动']
    },
    {
      id: 'apt',
      name: 'apt',
      fullName: 'Advanced Package Tool',
      tagline: 'Ubuntu/Debian 系统包管理器',
      color: '#e95420',
      commands: [
        { op: '更新列表', cmd: 'sudo apt update' },
        { op: '安装软件', cmd: 'sudo apt install nginx' },
        { op: '更新系统', cmd: 'sudo apt upgrade' },
        { op: '卸载软件', cmd: 'sudo apt remove nginx' }
      ],
      files: [
        { name: '/etc/apt/sources.list', desc: '软件源配置文件' }
      ],
      features: ['Ubuntu/Debian 官方', '系统级权限', '依赖自动解析', '服务器运维必备']
    },
    {
      id: 'dnf',
      name: 'dnf / yum',
      fullName: 'Dandified YUM（Fedora / RHEL / CentOS）',
      tagline: 'Red Hat 系 Linux 的系统包管理器',
      color: '#e00',
      commands: [
        { op: '安装软件', cmd: 'sudo dnf install git' },
        { op: '更新系统', cmd: 'sudo dnf upgrade' },
        { op: '搜索软件', cmd: 'dnf search nginx' },
        { op: '卸载软件', cmd: 'sudo dnf remove nginx' }
      ],
      files: [
        { name: '/etc/dnf/dnf.conf', desc: 'dnf 全局配置文件' }
      ],
      features: ['Fedora/RHEL/CentOS 官方', '支持模块流', 'DNF5 大幅提速', '企业级 Linux 首选']
    }
  ],
  windows: [
    {
      id: 'winget',
      name: 'winget',
      fullName: 'Windows Package Manager',
      tagline: 'Microsoft 官方出品，Win 10/11 内置',
      color: '#0078d4',
      commands: [
        { op: '安装软件', cmd: 'winget install Git.Git' },
        { op: '更新所有', cmd: 'winget upgrade --all' },
        { op: '搜索软件', cmd: 'winget search nodejs' },
        { op: '卸载软件', cmd: 'winget uninstall Git.Git' }
      ],
      files: [
        { name: 'winget-packages.json', desc: '导出的软件清单，可用于批量恢复' }
      ],
      features: ['Windows 10/11 内置', 'Microsoft Store 集成', '软件包签名验证', '官方持续更新中']
    },
    {
      id: 'choco',
      name: 'Chocolatey',
      fullName: 'Chocolatey Package Manager',
      tagline: 'Windows 最成熟的第三方包管理器',
      color: '#4a154b',
      commands: [
        { op: '安装软件', cmd: 'choco install git' },
        { op: '更新所有', cmd: 'choco upgrade all' },
        { op: '搜索软件', cmd: 'choco search nodejs' },
        { op: '卸载软件', cmd: 'choco uninstall git' }
      ],
      files: [
        { name: 'packages.config', desc: 'XML 格式的软件清单，批量安装用' }
      ],
      features: ['生态最成熟(10000+包)', '企业版商业支持', 'PowerShell 集成', '支持无人值守安装']
    },
    {
      id: 'scoop',
      name: 'Scoop',
      fullName: 'Scoop — A command-line installer for Windows',
      tagline: '无需管理员权限，专为开发者设计',
      color: '#1a73e8',
      commands: [
        { op: '安装软件', cmd: 'scoop install git' },
        { op: '更新所有', cmd: 'scoop update *' },
        { op: '搜索软件', cmd: 'scoop search nodejs' },
        { op: '卸载软件', cmd: 'scoop uninstall git' }
      ],
      files: [
        { name: 'Scoopfile / apps.json', desc: '应用清单，用于环境还原' }
      ],
      features: ['无需管理员权限', '安装到用户目录', '版本共存切换', '开发者工具首选']
    }
  ]
}

const currentManagers = computed(() => allManagers[activeEco.value] || [])

const currentPm = computed(() => {
  const list = currentManagers.value
  return list.find(p => p.id === activePm.value) || null
})

function selectEco(id) {
  activeEco.value = id
  activePm.value = allManagers[id]?.[0]?.id || null
}

function selectPm(id) {
  activePm.value = id
}
</script>

<style scoped>
.demo-root {
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  overflow: hidden;
  margin: 1.5rem 0;
  background: var(--vp-c-bg);
}

.demo-header {
  display: flex;
  align-items: baseline;
  gap: 0.6rem;
  padding: 0.85rem 1.1rem 0.7rem;
  background: var(--vp-c-bg-soft);
  border-bottom: 1px solid var(--vp-c-divider);
}

.title {
  font-size: 1rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.subtitle {
  font-size: 0.8rem;
  color: var(--vp-c-text-3);
}

.control-panel {
  display: flex;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background: var(--vp-c-bg-alt);
  border-bottom: 1px solid var(--vp-c-divider);
  flex-wrap: wrap;
}

.eco-btn {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.35rem 0.8rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg);
  cursor: pointer;
  font-size: 0.82rem;
  color: var(--vp-c-text-2);
  transition: all 0.15s;
}

.eco-btn:hover {
  border-color: var(--vp-c-brand);
  color: var(--vp-c-brand);
}

.eco-btn.active {
  background: var(--vp-c-brand);
  border-color: var(--vp-c-brand);
  color: #fff;
}

.eco-icon {
  font-size: 1rem;
}

.visualization-area {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.managers-grid {
  display: flex;
  gap: 0.6rem;
  flex-wrap: wrap;
}

.pm-card {
  flex: 1;
  min-width: 100px;
  padding: 0.6rem 0.8rem;
  border: 1.5px solid var(--vp-c-divider);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.15s;
  background: var(--vp-c-bg-soft);
}

.pm-card:hover {
  border-color: var(--vp-c-brand);
  transform: translateY(-1px);
}

.pm-card.active {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-bg-alt);
  box-shadow: 0 0 0 2px color-mix(in srgb, var(--vp-c-brand) 20%, transparent);
}

.pm-badge {
  display: inline-block;
  padding: 0.15rem 0.5rem;
  border-radius: 4px;
  color: #fff;
  font-size: 0.78rem;
  font-weight: 600;
  margin-bottom: 0.3rem;
}

.pm-tagline {
  font-size: 0.76rem;
  color: var(--vp-c-text-3);
  line-height: 1.3;
}

.pm-detail {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  padding: 0.9rem 1rem;
}

.pm-placeholder {
  text-align: center;
  padding: 1.5rem;
  color: var(--vp-c-text-3);
  font-size: 0.85rem;
}

.detail-top {
  display: flex;
  align-items: baseline;
  gap: 0.6rem;
  margin-bottom: 0.8rem;
  padding-bottom: 0.6rem;
  border-bottom: 1px solid var(--vp-c-divider);
}

.detail-name {
  font-size: 1.05rem;
  font-weight: 700;
}

.detail-full {
  font-size: 0.8rem;
  color: var(--vp-c-text-3);
}

.detail-sections {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 0.8rem;
}

@media (max-width: 640px) {
  .detail-sections {
    grid-template-columns: 1fr;
  }
}

.section-label {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--vp-c-text-3);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 0.4rem;
}

.cmd-list {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.cmd-row {
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
}

.cmd-op {
  font-size: 0.72rem;
  color: var(--vp-c-text-3);
}

.cmd-code {
  font-size: 0.76rem;
  background: var(--vp-c-bg-alt);
  padding: 0.15rem 0.4rem;
  border-radius: 4px;
  color: var(--vp-c-brand);
  word-break: break-all;
}

.file-list {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.file-row {
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
}

.file-name {
  font-size: 0.78rem;
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg-alt);
  padding: 0.1rem 0.35rem;
  border-radius: 3px;
  width: fit-content;
}

.file-desc {
  font-size: 0.72rem;
  color: var(--vp-c-text-3);
}

.feature-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.3rem;
}

.feature-tag {
  font-size: 0.73rem;
  padding: 0.2rem 0.5rem;
  border-radius: 10px;
  background: var(--vp-c-bg-alt);
  border: 1px solid var(--vp-c-divider);
  color: var(--vp-c-text-2);
  white-space: nowrap;
}

.info-box {
  display: block;
  padding: 0.65rem 1rem;
  background: var(--vp-c-bg-soft);
  border-top: 1px solid var(--vp-c-divider);
  font-size: 0.82rem;
  color: var(--vp-c-text-2);
  line-height: 1.5;
}

.info-box strong {
  white-space: nowrap;
  color: var(--vp-c-text-1);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
