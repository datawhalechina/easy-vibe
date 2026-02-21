<template>
  <div class="demo-root">
    <div class="demo-header">
      <span class="title">依赖树 & 版本语义</span>
      <span class="subtitle">理解语义化版本号与依赖关系图</span>
    </div>

    <div class="control-panel">
      <div class="tab-group">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          :class="['tab-btn', { active: activeTab === tab.id }]"
          @click="activeTab = tab.id"
        >
          {{ tab.label }}
        </button>
      </div>
    </div>

    <!-- Tab: 语义化版本 -->
    <div v-if="activeTab === 'semver'" class="visualization-area">
      <div class="semver-display">
        <div class="version-number">
          <div
            v-for="part in versionParts"
            :key="part.id"
            :class="['ver-part', { highlight: hoveredPart === part.id }]"
            @mouseenter="hoveredPart = part.id"
            @mouseleave="hoveredPart = null"
          >
            <div class="ver-num">{{ part.num }}</div>
            <div class="ver-name" :style="{ color: part.color }">{{ part.label }}</div>
          </div>
          <div class="ver-dots">
            <span>.</span>
            <span>.</span>
          </div>
        </div>
        <transition name="fade">
          <div v-if="hoveredPart" class="ver-detail" :style="{ borderColor: currentPart.color }">
            <div class="ver-detail-title" :style="{ color: currentPart.color }">
              {{ currentPart.label }} 版本
            </div>
            <div class="ver-detail-desc">{{ currentPart.desc }}</div>
            <div class="ver-detail-example">
              <span class="example-label">示例：</span>
              <code>{{ currentPart.example }}</code>
            </div>
          </div>
        </transition>
        <div v-if="!hoveredPart" class="ver-hint">← 鼠标悬停数字查看含义</div>
      </div>

      <div class="range-grid">
        <div class="range-title">常用版本范围符号</div>
        <div
          v-for="r in ranges"
          :key="r.sym"
          :class="['range-card', { active: activeRange === r.sym }]"
          @click="activeRange = activeRange === r.sym ? null : r.sym"
        >
          <code class="range-sym">{{ r.sym }}</code>
          <div class="range-name">{{ r.name }}</div>
          <div class="range-desc">{{ r.desc }}</div>
          <div v-if="activeRange === r.sym" class="range-example">
            <div v-for="ex in r.examples" :key="ex.v" class="range-ex-row">
              <code>{{ ex.v }}</code>
              <span :class="['ex-status', ex.ok ? 'ok' : 'no']">{{ ex.ok ? '✓ 接受' : '✗ 拒绝' }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Tab: 依赖树 -->
    <div v-if="activeTab === 'tree'" class="visualization-area">
      <div class="scenario-select">
        <button
          v-for="sc in scenarios"
          :key="sc.id"
          :class="['scenario-btn', { active: activeScenario === sc.id }]"
          @click="activeScenario = sc.id"
        >
          {{ sc.label }}
        </button>
      </div>

      <div class="tree-container">
        <div class="tree-root-node node">
          <span class="node-name">{{ currentScenario.root }}</span>
          <span class="node-badge root-badge">你的项目</span>
        </div>

        <div class="tree-level">
          <div
            v-for="dep in currentScenario.direct"
            :key="dep.name"
            :class="['tree-branch', dep.conflict ? 'conflict' : '']"
          >
            <div class="branch-line"></div>
            <div class="node dep-node">
              <span class="node-name">{{ dep.name }}</span>
              <span class="node-ver">{{ dep.version }}</span>
              <span v-if="dep.conflict" class="conflict-badge">⚠ 冲突</span>
            </div>
            <div v-if="dep.children && dep.children.length" class="sub-level">
              <div
                v-for="child in dep.children"
                :key="child.name + dep.name"
                :class="['sub-branch', child.conflict ? 'conflict' : '']"
              >
                <div class="sub-line"></div>
                <div class="node sub-node">
                  <span class="node-name">{{ child.name }}</span>
                  <span class="node-ver">{{ child.version }}</span>
                  <span v-if="child.conflict" class="conflict-badge small">⚠</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="scenario-desc" :class="currentScenario.type">
        <div class="desc-icon">{{ currentScenario.icon }}</div>
        <div class="desc-text">{{ currentScenario.description }}</div>
      </div>
    </div>

    <!-- Tab: 锁文件 -->
    <div v-if="activeTab === 'lockfile'" class="visualization-area">
      <div class="lockfile-compare">
        <div class="lf-col">
          <div class="lf-title">📄 package.json（声明意图）</div>
          <div class="lf-content">
            <pre class="code-block">{{ packageJsonExample }}</pre>
          </div>
          <div class="lf-note">用范围符号声明「可以接受哪些版本」</div>
        </div>
        <div class="lf-arrow">→</div>
        <div class="lf-col">
          <div class="lf-title">🔒 package-lock.json（固定现实）</div>
          <div class="lf-content">
            <pre class="code-block">{{ lockfileExample }}</pre>
          </div>
          <div class="lf-note">锁定实际安装的精确版本，团队共享</div>
        </div>
      </div>

      <div class="lockfile-rules">
        <div
          v-for="rule in lockfileRules"
          :key="rule.title"
          class="rule-card"
        >
          <div class="rule-icon">{{ rule.icon }}</div>
          <div class="rule-body">
            <div class="rule-title">{{ rule.title }}</div>
            <div class="rule-desc">{{ rule.desc }}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="info-box">
      <strong>黄金法则：</strong>
      <span v-if="activeTab === 'semver'">语义化版本 = MAJOR.MINOR.PATCH，MAJOR 变说明有破坏性改动，升级需谨慎。</span>
      <span v-else-if="activeTab === 'tree'">依赖的依赖也是依赖，一个包可以间接引入几十个包，这就是"依赖树"。</span>
      <span v-else>把锁文件提交到 Git，保证团队每个人、每次 CI 安装的包版本完全一致。</span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const activeTab = ref('semver')
const hoveredPart = ref(null)
const activeRange = ref(null)
const activeScenario = ref('normal')

const tabs = [
  { id: 'semver', label: '语义化版本' },
  { id: 'tree', label: '依赖树' },
  { id: 'lockfile', label: '锁文件' }
]

const versionParts = [
  {
    id: 'major',
    num: '2',
    label: 'MAJOR',
    color: '#ef4444',
    desc: '主版本号。有破坏性 API 变更时递增，通常不向后兼容。升级前必须看 CHANGELOG。',
    example: 'React 16 → 17 → 18，每次都有较大改动'
  },
  {
    id: 'minor',
    num: '8',
    label: 'MINOR',
    color: '#f59e0b',
    desc: '次版本号。新增功能但向后兼容时递增，可以放心升级。',
    example: 'axios 1.5.0 → 1.6.0，新增了功能但不影响老用法'
  },
  {
    id: 'patch',
    num: '3',
    label: 'PATCH',
    color: '#22c55e',
    desc: '补丁版本号。只修复 bug，完全向后兼容，建议及时升级。',
    example: 'lodash 4.17.20 → 4.17.21，修复安全漏洞'
  }
]

const currentPart = computed(
  () => versionParts.find(p => p.id === hoveredPart.value) || versionParts[0]
)

const ranges = [
  {
    sym: '^2.8.3',
    name: '兼容范围（推荐）',
    desc: '允许 MINOR 和 PATCH 升级，锁定 MAJOR',
    examples: [
      { v: '2.8.3', ok: true }, { v: '2.9.0', ok: true },
      { v: '3.0.0', ok: false }, { v: '2.8.2', ok: false }
    ]
  },
  {
    sym: '~2.8.3',
    name: '近似范围（保守）',
    desc: '只允许 PATCH 升级，锁定 MAJOR 和 MINOR',
    examples: [
      { v: '2.8.3', ok: true }, { v: '2.8.9', ok: true },
      { v: '2.9.0', ok: false }, { v: '3.0.0', ok: false }
    ]
  },
  {
    sym: '2.8.3',
    name: '精确版本（严格）',
    desc: '只接受这一个版本，完全锁定',
    examples: [
      { v: '2.8.3', ok: true }, { v: '2.8.4', ok: false },
      { v: '2.9.0', ok: false }, { v: '2.8.2', ok: false }
    ]
  },
  {
    sym: '*',
    name: '任意版本（危险）',
    desc: '接受任何版本，包括主版本升级，生产环境禁止',
    examples: [
      { v: '1.0.0', ok: true }, { v: '2.8.3', ok: true },
      { v: '99.0.0', ok: true }, { v: '0.0.1', ok: true }
    ]
  }
]

const scenarios = [
  { id: 'normal', label: '正常依赖' },
  { id: 'shared', label: '共享依赖' },
  { id: 'conflict', label: '版本冲突' }
]

const allScenarios = {
  normal: {
    root: 'my-app',
    type: 'success',
    icon: '✅',
    description: '正常情况：直接依赖 axios 和 lodash，它们各自有少量子依赖，无冲突。',
    direct: [
      {
        name: 'axios',
        version: '^1.6.8',
        children: [
          { name: 'follow-redirects', version: '^1.15.6' },
          { name: 'form-data', version: '^4.0.0' }
        ]
      },
      { name: 'lodash', version: '^4.17.21', children: [] }
    ]
  },
  shared: {
    root: 'my-app',
    type: 'info',
    icon: '📌',
    description: '共享依赖：react-dom 和 react-router 都依赖同一个 react，npm 会自动复用，不重复安装。',
    direct: [
      {
        name: 'react-dom',
        version: '^18.2.0',
        children: [{ name: 'react', version: '^18.2.0' }]
      },
      {
        name: 'react-router',
        version: '^6.22.0',
        children: [{ name: 'react', version: '^18.2.0' }]
      }
    ]
  },
  conflict: {
    root: 'my-app',
    type: 'warning',
    icon: '⚠️',
    description: '版本冲突：pkg-a 需要 lodash@^3.0.0，pkg-b 需要 lodash@^4.0.0，MAJOR 不同无法共享，npm 会安装两份，导致包体积膨胀。',
    direct: [
      {
        name: 'pkg-a',
        version: '^1.0.0',
        children: [{ name: 'lodash', version: '^3.10.1', conflict: true }]
      },
      {
        name: 'pkg-b',
        version: '^2.0.0',
        children: [{ name: 'lodash', version: '^4.17.21', conflict: true }]
      }
    ]
  }
}

const currentScenario = computed(() => allScenarios[activeScenario.value])

const packageJsonExample = `{
  "dependencies": {
    "axios": "^1.6.0",
    "lodash": "^4.17.0"
  }
}`

const lockfileExample = `{
  "node_modules/axios": {
    "version": "1.6.8",
    "resolved": "https://registry.npmjs.org/...",
    "integrity": "sha512-..."
  },
  "node_modules/lodash": {
    "version": "4.17.21",
    "resolved": "https://registry.npmjs.org/..."
  }
}`

const lockfileRules = [
  { icon: '📌', title: '必须提交到 Git', desc: '锁文件是团队契约，让所有成员、CI/CD 安装完全相同的版本。' },
  { icon: '🚫', title: '不要手动编辑', desc: '锁文件由包管理器自动维护，手动修改极易引入错误。' },
  { icon: '🔄', title: 'npm install 会更新它', desc: '每次 install/update 后，锁文件会自动更新到最新解析结果。' },
  { icon: '🧪', title: 'npm ci 严格遵守它', desc: 'CI 环境用 npm ci 而非 npm install，保证精确复现锁文件记录的版本。' }
]
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
  padding: 0.6rem 1rem;
  background: var(--vp-c-bg-alt);
  border-bottom: 1px solid var(--vp-c-divider);
}

.tab-group {
  display: flex;
  gap: 0.4rem;
}

.tab-btn {
  padding: 0.3rem 0.9rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-2);
  font-size: 0.83rem;
  cursor: pointer;
  transition: all 0.15s;
}

.tab-btn.active {
  background: var(--vp-c-brand);
  border-color: var(--vp-c-brand);
  color: #fff;
}

.visualization-area {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
}

/* === Semver Tab === */
.semver-display {
  display: flex;
  align-items: flex-start;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.version-number {
  display: flex;
  align-items: flex-end;
  gap: 0;
  position: relative;
}

.ver-dots {
  display: flex;
  flex-direction: column;
  font-size: 2rem;
  font-weight: 700;
  color: var(--vp-c-text-3);
  gap: 1.5rem;
  padding: 0 0.1rem;
  line-height: 1;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  pointer-events: none;
  display: none;
}

.ver-part {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.5rem 0.8rem;
  border: 2px solid var(--vp-c-divider);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.15s;
  margin: 0 0.2rem;
}

.ver-part.highlight {
  border-color: currentColor;
  background: var(--vp-c-bg-soft);
  transform: translateY(-3px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.ver-num {
  font-size: 2.2rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
  line-height: 1;
}

.ver-name {
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  margin-top: 0.25rem;
}

.ver-detail {
  flex: 1;
  min-width: 200px;
  padding: 0.7rem 0.9rem;
  border: 1.5px solid;
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
}

.ver-detail-title {
  font-size: 0.85rem;
  font-weight: 700;
  margin-bottom: 0.3rem;
}

.ver-detail-desc {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  line-height: 1.5;
  margin-bottom: 0.4rem;
}

.ver-detail-example {
  font-size: 0.76rem;
  color: var(--vp-c-text-3);
}

.example-label {
  margin-right: 0.3rem;
}

.ver-hint {
  font-size: 0.8rem;
  color: var(--vp-c-text-3);
  align-self: center;
}

.range-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 0.6rem;
}

.range-title {
  grid-column: 1 / -1;
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
}

.range-card {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 0.65rem 0.8rem;
  cursor: pointer;
  transition: all 0.15s;
  background: var(--vp-c-bg-soft);
}

.range-card:hover {
  border-color: var(--vp-c-brand);
}

.range-card.active {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-bg-alt);
}

.range-sym {
  font-size: 0.95rem;
  color: var(--vp-c-brand);
  display: block;
  margin-bottom: 0.25rem;
}

.range-name {
  font-size: 0.78rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 0.2rem;
}

.range-desc {
  font-size: 0.74rem;
  color: var(--vp-c-text-3);
  line-height: 1.3;
}

.range-example {
  margin-top: 0.5rem;
  padding-top: 0.4rem;
  border-top: 1px dashed var(--vp-c-divider);
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.range-ex-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.74rem;
}

.ex-status.ok { color: #22c55e; }
.ex-status.no { color: #ef4444; }

/* === Tree Tab === */
.scenario-select {
  display: flex;
  gap: 0.4rem;
}

.scenario-btn {
  padding: 0.28rem 0.75rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-2);
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.15s;
}

.scenario-btn.active {
  background: var(--vp-c-brand);
  border-color: var(--vp-c-brand);
  color: #fff;
}

.tree-container {
  padding: 0.8rem;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  overflow-x: auto;
}

.tree-root-node {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  margin-bottom: 0.5rem;
}

.node {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.3rem 0.6rem;
  border-radius: 6px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  white-space: nowrap;
}

.node-name {
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  font-family: monospace;
}

.node-ver {
  font-size: 0.72rem;
  color: var(--vp-c-text-3);
  font-family: monospace;
}

.node-badge {
  font-size: 0.68rem;
  padding: 0.1rem 0.4rem;
  border-radius: 10px;
}

.root-badge {
  background: var(--vp-c-brand);
  color: #fff;
}

.conflict-badge {
  font-size: 0.7rem;
  color: #f59e0b;
}

.conflict-badge.small {
  font-size: 0.65rem;
}

.tree-level {
  display: flex;
  gap: 1rem;
  padding-left: 1rem;
  flex-wrap: wrap;
}

.tree-branch {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.4rem;
}

.tree-branch.conflict .dep-node {
  border-color: #f59e0b;
}

.branch-line {
  width: 2px;
  height: 16px;
  background: var(--vp-c-divider);
  margin-left: 0.8rem;
}

.sub-level {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  padding-left: 1.2rem;
}

.sub-branch {
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.sub-branch.conflict .sub-node {
  border-color: #ef4444;
}

.sub-line {
  width: 16px;
  height: 2px;
  background: var(--vp-c-divider);
}

.sub-node {
  font-size: 0.75rem;
}

.scenario-desc {
  display: flex;
  gap: 0.5rem;
  align-items: flex-start;
  padding: 0.7rem 0.9rem;
  border-radius: 8px;
  font-size: 0.82rem;
  line-height: 1.5;
}

.scenario-desc.success { background: color-mix(in srgb, #22c55e 10%, var(--vp-c-bg)); border: 1px solid color-mix(in srgb, #22c55e 30%, transparent); }
.scenario-desc.info { background: color-mix(in srgb, var(--vp-c-brand) 10%, var(--vp-c-bg)); border: 1px solid color-mix(in srgb, var(--vp-c-brand) 30%, transparent); }
.scenario-desc.warning { background: color-mix(in srgb, #f59e0b 10%, var(--vp-c-bg)); border: 1px solid color-mix(in srgb, #f59e0b 30%, transparent); }

.desc-icon { font-size: 1rem; flex-shrink: 0; }
.desc-text { color: var(--vp-c-text-2); }

/* === Lockfile Tab === */
.lockfile-compare {
  display: flex;
  gap: 0.8rem;
  align-items: flex-start;
}

.lf-col {
  flex: 1;
}

.lf-title {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
  margin-bottom: 0.4rem;
}

.lf-content {
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  overflow: auto;
  max-height: 160px;
}

.code-block {
  margin: 0;
  padding: 0.6rem 0.8rem;
  font-size: 0.74rem;
  color: var(--vp-c-text-2);
  background: var(--vp-c-bg-soft);
  white-space: pre;
  font-family: monospace;
}

.lf-note {
  font-size: 0.73rem;
  color: var(--vp-c-text-3);
  margin-top: 0.35rem;
}

.lf-arrow {
  font-size: 1.5rem;
  color: var(--vp-c-brand);
  padding-top: 3rem;
  flex-shrink: 0;
}

@media (max-width: 640px) {
  .lockfile-compare { flex-direction: column; }
  .lf-arrow { transform: rotate(90deg); padding-top: 0; align-self: center; }
}

.lockfile-rules {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 0.6rem;
}

.rule-card {
  display: flex;
  gap: 0.6rem;
  padding: 0.6rem 0.8rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
}

.rule-icon {
  font-size: 1.2rem;
  flex-shrink: 0;
}

.rule-title {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 0.2rem;
}

.rule-desc {
  font-size: 0.75rem;
  color: var(--vp-c-text-3);
  line-height: 1.4;
}

/* === Info Box === */
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
