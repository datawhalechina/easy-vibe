<!--
  SessionVsJWTDemo.vue
  Session vs JWT 对比演示
-->
<template>
  <div class="session-vs-jwt-demo">
    <div class="header">
      <div class="title">Session vs JWT：全方位对比</div>
      <div class="subtitle">两种主流鉴权方案的优劣势分析</div>
    </div>

    <div class="scenario-selector">
      <div class="selector-title">选择场景</div>
      <div class="scenario-buttons">
        <button
          v-for="scenario in scenarios"
          :key="scenario.key"
          class="scenario-btn"
          :class="{ active: selectedScenario === scenario.key }"
          @click="selectScenario(scenario.key)"
        >
          <span class="scenario-icon">{{ scenario.icon }}</span>
          <span class="scenario-label">{{ scenario.label }}</span>
        </button>
      </div>
    </div>

    <div class="comparison-table" v-if="selectedScenario">
      <table>
        <thead>
          <tr>
            <th>对比维度</th>
            <th class="session-col">Session + Cookie</th>
            <th class="jwt-col">JWT</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(row, index) in getCurrentScenarioRows()"
            :key="index"
            :class="{ highlight: row.highlight }"
          >
            <td class="dimension">{{ row.dimension }}</td>
            <td class="session-cell">
              <div class="cell-content">
                <span class="cell-icon">{{ row.session.icon }}</span>
                <span class="cell-text">{{ row.session.text }}</span>
                <span class="cell-score" :class="row.session.scoreClass">
                  {{ row.session.score }}
                </span>
              </div>
            </td>
            <td class="jwt-cell">
              <div class="cell-content">
                <span class="cell-icon">{{ row.jwt.icon }}</span>
                <span class="cell-text">{{ row.jwt.text }}</span>
                <span class="cell-score" :class="row.jwt.scoreClass">
                  {{ row.jwt.score }}
                </span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="recommendation" v-if="selectedScenario">
      <div class="rec-header">
        <div class="rec-icon">{{ currentRecommendation.icon }}</div>
        <div class="rec-title">{{ currentRecommendation.title }}</div>
      </div>
      <div class="rec-content">
        <div class="rec-winner">
          推荐方案：{{ currentRecommendation.winner }}
        </div>
        <div class="rec-reason">{{ currentRecommendation.reason }}</div>
      </div>
    </div>

    <div class="quick-guide">
      <div class="guide-title">快速选择指南</div>
      <div class="guide-cards">
        <div class="guide-card session-card">
          <div class="card-header">
            <div class="card-icon">🍪</div>
            <div class="card-title">选择 Session + Cookie</div>
          </div>
          <ul class="card-list">
            <li>✅ 传统 Web 应用（服务器端渲染）</li>
            <li>✅ 需要服务端主动控制用户会话</li>
            <li>✅ 单体应用，不需要跨域</li>
            <li>✅ 对安全性要求极高的场景</li>
          </ul>
        </div>

        <div class="guide-card jwt-card">
          <div class="card-header">
            <div class="card-icon">🎫</div>
            <div class="card-title">选择 JWT</div>
          </div>
          <ul class="card-list">
            <li>✅ 前后端分离的 SPA 应用</li>
            <li>✅ 移动端 App（iOS/Android）</li>
            <li>✅ 微服务架构</li>
            <li>✅ 需要跨域访问的 API</li>
          </ul>
        </div>
      </div>
    </div>

    <div class="architecture-comparison">
      <div class="arch-title">架构对比</div>
      <div class="arch-diagrams">
        <div class="arch-item session-arch">
          <div class="arch-label">Session 架构</div>
          <div class="arch-content">
            <div class="arch-step">
              <span class="step-icon">1️⃣</span>
              <span class="step-text">用户登录</span>
            </div>
            <div class="arch-arrow">↓</div>
            <div class="arch-step">
              <span class="step-icon">2️⃣</span>
              <span class="step-text">服务器创建 Session</span>
            </div>
            <div class="arch-arrow">↓</div>
            <div class="arch-step server-storage">
              <span class="step-icon">💾</span>
              <span class="step-text">存储到 Redis/Memory</span>
            </div>
            <div class="arch-arrow">↓</div>
            <div class="arch-step">
              <span class="step-icon">3️⃣</span>
              <span class="step-text">返回 Cookie</span>
            </div>
            <div class="arch-arrow">↓</div>
            <div class="arch-step">
              <span class="step-icon">4️⃣</span>
              <span class="step-text">每次请求自动带上</span>
            </div>
          </div>
          <div class="arch-note">有状态：需要存储 Session</div>
        </div>

        <div class="arch-item jwt-arch">
          <div class="arch-label">JWT 架构</div>
          <div class="arch-content">
            <div class="arch-step">
              <span class="step-icon">1️⃣</span>
              <span class="step-text">用户登录</span>
            </div>
            <div class="arch-arrow">↓</div>
            <div class="arch-step">
              <span class="step-icon">2️⃣</span>
              <span class="step-text">服务器生成 JWT</span>
            </div>
            <div class="arch-arrow">↓</div>
            <div class="arch-step client-storage">
              <span class="step-icon">💾</span>
              <span class="step-text">客户端存储 Token</span>
            </div>
            <div class="arch-arrow">↓</div>
            <div class="arch-step">
              <span class="step-icon">3️⃣</span>
              <span class="step-text">返回 Token</span>
            </div>
            <div class="arch-arrow">↓</div>
            <div class="arch-step">
              <span class="step-icon">4️⃣</span>
              <span class="step-text">每次请求在 Header 携带</span>
            </div>
          </div>
          <div class="arch-note">无状态：不存储用户会话</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const selectedScenario = ref('spa')

const scenarios = [
  { key: 'spa', label: '前后端分离', icon: '🌐' },
  { key: 'mobile', label: '移动端', icon: '📱' },
  { key: 'microservice', label: '微服务', icon: '🔧' },
  { key: 'traditional', label: '传统 Web', icon: '🖥️' },
  { key: 'security', label: '高安全需求', icon: '🔒' }
]

const scenarioData = {
  spa: {
    rows: [
      {
        dimension: '跨域支持',
        session: {
          icon: '❌',
          text: 'Cookie 无法跨域',
          score: '⭐⭐',
          scoreClass: 'low'
        },
        jwt: {
          icon: '✅',
          text: 'Header 携带，完美支持',
          score: '⭐⭐⭐⭐⭐',
          scoreClass: 'high'
        },
        highlight: true
      },
      {
        dimension: '实现复杂度',
        session: {
          icon: '⚠️',
          text: '需要处理 CORS 和 Cookie',
          score: '⭐⭐⭐',
          scoreClass: 'medium'
        },
        jwt: {
          icon: '✅',
          text: '简单，localStorage + Header',
          score: '⭐⭐⭐⭐⭐',
          scoreClass: 'high'
        },
        highlight: false
      },
      {
        dimension: '扩展性',
        session: {
          icon: '⚠️',
          text: '有状态，扩展困难',
          score: '⭐⭐',
          scoreClass: 'low'
        },
        jwt: {
          icon: '✅',
          text: '无状态，易于扩展',
          score: '⭐⭐⭐⭐⭐',
          scoreClass: 'high'
        },
        highlight: true
      },
      {
        dimension: '安全性',
        session: {
          icon: '⚠️',
          text: '易受 CSRF 攻击',
          score: '⭐⭐⭐',
          scoreClass: 'medium'
        },
        jwt: {
          icon: '✅',
          text: '天然防 CSRF',
          score: '⭐⭐⭐⭐',
          scoreClass: 'high'
        },
        highlight: false
      }
    ],
    recommendation: {
      icon: '🏆',
      title: '推荐方案',
      winner: 'JWT',
      reason:
        '前后端分离架构下，JWT 的无状态特性和跨域优势使其成为最佳选择。避免 Cookie 的跨域问题，且更易于扩展。'
    }
  },
  mobile: {
    rows: [
      {
        dimension: '移动端支持',
        session: {
          icon: '⚠️',
          text: 'Cookie 管理复杂',
          score: '⭐⭐',
          scoreClass: 'low'
        },
        jwt: {
          icon: '✅',
          text: '原生支持，存储简单',
          score: '⭐⭐⭐⭐⭐',
          scoreClass: 'high'
        },
        highlight: true
      },
      {
        dimension: '网络开销',
        session: {
          icon: '✅',
          text: '只传 session_id',
          score: '⭐⭐⭐⭐',
          scoreClass: 'high'
        },
        jwt: {
          icon: '⚠️',
          text: 'Token 较大',
          score: '⭐⭐⭐',
          scoreClass: 'medium'
        },
        highlight: false
      },
      {
        dimension: '离线能力',
        session: {
          icon: '❌',
          text: '必须联网验证',
          score: '⭐',
          scoreClass: 'low'
        },
        jwt: {
          icon: '✅',
          text: '可离线解析基本信息',
          score: '⭐⭐⭐⭐',
          scoreClass: 'high'
        },
        highlight: true
      }
    ],
    recommendation: {
      icon: '🏆',
      title: '推荐方案',
      winner: 'JWT',
      reason:
        '移动端原生应用没有浏览器的 Cookie 机制，JWT 更适合。可以轻松存储在 UserDefaults/SharedPreferences 中。'
    }
  },
  microservice: {
    rows: [
      {
        dimension: '服务间通信',
        session: {
          icon: '⚠️',
          text: '需要共享 Session 存储',
          score: '⭐⭐',
          scoreClass: 'low'
        },
        jwt: {
          icon: '✅',
          text: '直接传递 Token',
          score: '⭐⭐⭐⭐⭐',
          scoreClass: 'high'
        },
        highlight: true
      },
      {
        dimension: '水平扩展',
        session: {
          icon: '⚠️',
          text: '需要 Redis 共享',
          score: '⭐⭐⭐',
          scoreClass: 'medium'
        },
        jwt: {
          icon: '✅',
          text: '无状态，任意服务器可验证',
          score: '⭐⭐⭐⭐⭐',
          scoreClass: 'high'
        },
        highlight: true
      },
      {
        dimension: '性能',
        session: {
          icon: '⚠️',
          text: '每次请求查 Redis',
          score: '⭐⭐⭐',
          scoreClass: 'medium'
        },
        jwt: {
          icon: '✅',
          text: '直接验证签名',
          score: '⭐⭐⭐⭐',
          scoreClass: 'high'
        },
        highlight: false
      }
    ],
    recommendation: {
      icon: '🏆',
      title: '推荐方案',
      winner: 'JWT',
      reason:
        '微服务架构下，JWT 的无状态特性是巨大优势。不需要在服务间共享 Session，任何服务都可以独立验证 Token。'
    }
  },
  traditional: {
    rows: [
      {
        dimension: '实现难度',
        session: {
          icon: '✅',
          text: '框架内置支持',
          score: '⭐⭐⭐⭐⭐',
          scoreClass: 'high'
        },
        jwt: {
          icon: '⚠️',
          text: '需要额外集成',
          score: '⭐⭐⭐',
          scoreClass: 'medium'
        },
        highlight: true
      },
      {
        dimension: '会话管理',
        session: {
          icon: '✅',
          text: '可主动注销',
          score: '⭐⭐⭐⭐⭐',
          scoreClass: 'high'
        },
        jwt: {
          icon: '⚠️',
          text: '无法主动注销',
          score: '⭐⭐',
          scoreClass: 'low'
        },
        highlight: true
      },
      {
        dimension: '安全性',
        session: {
          icon: '✅',
          text: 'HttpOnly Cookie',
          score: '⭐⭐⭐⭐',
          scoreClass: 'high'
        },
        jwt: {
          icon: '⚠️',
          text: 'XSS 风险',
          score: '⭐⭐⭐',
          scoreClass: 'medium'
        },
        highlight: false
      }
    ],
    recommendation: {
      icon: '🏆',
      title: '推荐方案',
      winner: 'Session + Cookie',
      reason:
        '传统 Web 应用（如 PHP、Java Web）通常有成熟的 Session 机制，实现简单且安全。主动注销功能很重要。'
    }
  },
  security: {
    rows: [
      {
        dimension: '防篡改',
        session: {
          icon: '✅',
          text: '服务端存储，无法篡改',
          score: '⭐⭐⭐⭐⭐',
          scoreClass: 'high'
        },
        jwt: {
          icon: '✅',
          text: '签名防篡改',
          score: '⭐⭐⭐⭐',
          scoreClass: 'high'
        },
        highlight: false
      },
      {
        dimension: '防 CSRF',
        session: {
          icon: '⚠️',
          text: '易受攻击',
          score: '⭐⭐',
          scoreClass: 'low'
        },
        jwt: {
          icon: '✅',
          text: '天然免疫',
          score: '⭐⭐⭐⭐⭐',
          scoreClass: 'high'
        },
        highlight: true
      },
      {
        dimension: '防 XSS',
        session: {
          icon: '✅',
          text: 'HttpOnly Cookie',
          score: '⭐⭐⭐⭐⭐',
          scoreClass: 'high'
        },
        jwt: {
          icon: '⚠️',
          text: 'localStorage 可被读取',
          score: '⭐⭐',
          scoreClass: 'low'
        },
        highlight: true
      },
      {
        dimension: '主动注销',
        session: {
          icon: '✅',
          text: '立即删除 Session',
          score: '⭐⭐⭐⭐⭐',
          scoreClass: 'high'
        },
        jwt: {
          icon: '❌',
          text: '需黑名单机制',
          score: '⭐⭐',
          scoreClass: 'low'
        },
        highlight: true
      }
    ],
    recommendation: {
      icon: '⚖️',
      title: '推荐方案',
      winner: '视情况而定',
      reason:
        '高安全场景下，Session + Cookie（HttpOnly）通常更安全。但如果 CSRF 是主要威胁，JWT 可能更好。建议结合实际威胁模型选择。'
    }
  }
}

const getCurrentScenarioRows = () => {
  return scenarioData[selectedScenario.value]?.rows || []
}

const currentRecommendation = computed(() => {
  return (
    scenarioData[selectedScenario.value]?.recommendation || {
      icon: '❓',
      title: '推荐方案',
      winner: '未知',
      reason: '请选择一个场景'
    }
  )
})

const selectScenario = (key) => {
  selectedScenario.value = key
}
</script>

<style scoped>
.session-vs-jwt-demo {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  padding: 1.5rem;
  margin: 1.5rem 0;
  font-family: var(--vp-font-family-base);
}

.header {
  margin-bottom: 1.5rem;
}

.title {
  font-weight: 700;
  font-size: 1.1rem;
  margin-bottom: 0.3rem;
}

.subtitle {
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
}

.scenario-selector {
  margin-bottom: 1.5rem;
}

.selector-title {
  font-weight: 600;
  font-size: 0.95rem;
  margin-bottom: 0.75rem;
}

.scenario-buttons {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.scenario-btn {
  flex: 1;
  min-width: 100px;
  padding: 0.75rem 1rem;
  border: 2px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg);
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-size: 0.9rem;
}

.scenario-btn:hover {
  border-color: var(--vp-c-brand);
}

.scenario-btn.active {
  background: var(--vp-c-brand);
  color: white;
  border-color: var(--vp-c-brand);
}

.scenario-icon {
  font-size: 1.2rem;
}

.comparison-table {
  background: var(--vp-c-bg);
  border-radius: 10px;
  padding: 1.5rem;
  border: 1px solid var(--vp-c-divider);
  margin-bottom: 1.5rem;
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

thead th {
  padding: 0.75rem;
  text-align: left;
  font-weight: 700;
  font-size: 0.9rem;
  border-bottom: 2px solid var(--vp-c-divider);
}

thead th.session-col {
  color: #f59e0b;
}

thead th.jwt-col {
  color: #8b5cf6;
}

tbody tr {
  border-bottom: 1px solid var(--vp-c-divider);
}

tbody tr:last-child {
  border-bottom: none;
}

tbody tr.highlight {
  background: rgba(59, 130, 246, 0.05);
}

.dimension {
  padding: 0.75rem;
  font-weight: 600;
  font-size: 0.85rem;
}

.cell-content {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
}

.cell-icon {
  font-size: 1.2rem;
  flex-shrink: 0;
}

.cell-text {
  flex: 1;
  font-size: 0.85rem;
}

.cell-score {
  font-size: 0.85rem;
  font-weight: 700;
}

.cell-score.high {
  color: #22c55e;
}

.cell-score.medium {
  color: #f59e0b;
}

.cell-score.low {
  color: #ef4444;
}

.recommendation {
  background: var(--vp-c-bg);
  border-radius: 10px;
  padding: 1.5rem;
  border: 2px solid var(--vp-c-brand);
  margin-bottom: 1.5rem;
}

.rec-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.rec-icon {
  font-size: 2rem;
}

.rec-title {
  font-size: 1.1rem;
  font-weight: 700;
}

.rec-content {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.rec-winner {
  font-size: 1rem;
  font-weight: 700;
  color: var(--vp-c-brand);
}

.rec-reason {
  font-size: 0.9rem;
  line-height: 1.6;
  color: var(--vp-c-text-2);
}

.quick-guide {
  background: var(--vp-c-bg);
  border-radius: 10px;
  padding: 1.5rem;
  border: 1px solid var(--vp-c-divider);
  margin-bottom: 1.5rem;
}

.guide-title {
  font-weight: 700;
  font-size: 1rem;
  margin-bottom: 1rem;
}

.guide-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
}

.guide-card {
  background: var(--vp-c-bg-soft);
  border-radius: 10px;
  padding: 1.25rem;
  border: 1px solid var(--vp-c-divider);
}

.card-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.card-icon {
  font-size: 1.5rem;
}

.card-title {
  font-weight: 700;
  font-size: 0.95rem;
}

.card-list {
  margin: 0;
  padding-left: 1.25rem;
}

.card-list li {
  margin-bottom: 0.5rem;
  font-size: 0.85rem;
  line-height: 1.5;
}

.architecture-comparison {
  background: var(--vp-c-bg);
  border-radius: 10px;
  padding: 1.5rem;
  border: 1px solid var(--vp-c-divider);
}

.arch-title {
  font-weight: 700;
  font-size: 1rem;
  margin-bottom: 1rem;
}

.arch-diagrams {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

.arch-item {
  background: var(--vp-c-bg-soft);
  border-radius: 10px;
  padding: 1.25rem;
  border: 1px solid var(--vp-c-divider);
}

.arch-label {
  font-weight: 700;
  font-size: 0.95rem;
  margin-bottom: 1rem;
  text-align: center;
  color: var(--vp-c-brand);
}

.arch-content {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.arch-step {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  background: white;
  border-radius: 6px;
  font-size: 0.85rem;
  border: 1px solid var(--vp-c-divider);
}

.step-icon {
  font-size: 1.2rem;
  flex-shrink: 0;
}

.step-text {
  flex: 1;
}

.arch-arrow {
  text-align: center;
  font-size: 1.2rem;
  color: var(--vp-c-text-2);
  font-weight: 700;
}

.server-storage,
.client-storage {
  border-color: #f59e0b;
  background: rgba(245, 158, 11, 0.1);
}

.arch-note {
  margin-top: 1rem;
  text-align: center;
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
  padding: 0.5rem;
  background: white;
  border-radius: 6px;
  border: 1px solid var(--vp-c-divider);
}

@media (max-width: 768px) {
  .scenario-buttons {
    flex-direction: column;
  }

  .guide-cards {
    grid-template-columns: 1fr;
  }

  .arch-diagrams {
    grid-template-columns: 1fr;
  }
}
</style>
