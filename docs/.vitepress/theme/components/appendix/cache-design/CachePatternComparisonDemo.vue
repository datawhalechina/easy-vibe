<template>
  <div class="cache-pattern-comparison-demo">
    <div class="demo-header">
      <span class="icon">🔄</span>
      <span class="title">缓存读写模式</span>
      <span class="subtitle">Cache-Aside vs Read-Through vs Write-Behind</span>
    </div>

    <div class="intro-text">
      想象你在<span class="highlight">厨房</span>做菜：Cache-aside 就像自己决定什么时候从冰箱拿菜；
      Read-Through 像有个助手，你说要什么他就帮你拿；Write-Behind 像先记在购物清单上，之后再去买。
    </div>

    <div class="pattern-tabs">
      <button
        v-for="pattern in patterns"
        :key="pattern.id"
        class="tab-btn"
        :class="{ active: activePattern === pattern.id }"
        @click="activePattern = pattern.id"
      >
        <span class="tab-icon">{{ pattern.icon }}</span>
        <span class="tab-name">{{ pattern.name }}</span>
      </button>
    </div>

    <div class="pattern-content">
      <div v-if="activePattern === 'cache-aside'" class="pattern-detail">
        <div class="pattern-header">
          <h3>Cache-Aside (旁路缓存)</h3>
          <p class="pattern-desc">最常用的模式，应用代码直接控制缓存</p>
        </div>

        <div class="flow-diagram">
          <div class="flow-step read">
            <div class="step-icon">📖</div>
            <div class="step-content">
              <strong>读取：</strong>先查缓存 → 没有就查数据库 → 写入缓存
            </div>
          </div>
          <div class="flow-step write">
            <div class="step-icon">✏️</div>
            <div class="step-content">
              <strong>更新：</strong>先更新数据库 → <span class="highlight">删除</span>缓存（不是更新！）
            </div>
          </div>
        </div>

        <div class="pros-cons">
          <div class="pros">
            <div class="list-title">✅ 优点</div>
            <div class="list-item">灵活，可精细控制</div>
            <div class="list-item">适合大多数场景</div>
          </div>
          <div class="cons">
            <div class="list-title">❌ 缺点</div>
            <div class="list-item">代码复杂度较高</div>
            <div class="list-item">需要手动维护一致性</div>
          </div>
        </div>
      </div>

      <div v-if="activePattern === 'read-through'" class="pattern-detail">
        <div class="pattern-header">
          <h3>Read-Through (读穿透)</h3>
          <p class="pattern-desc">缓存库负责从数据库加载数据</p>
        </div>

        <div class="flow-diagram">
          <div class="flow-step">
            <div class="step-icon">📖</div>
            <div class="step-content">
              <strong>读取：</strong>应用只调 cache.get()，缓存库负责查数据库
            </div>
          </div>
          <div class="flow-step">
            <div class="step-icon">✏️</div>
            <div class="step-content">
              <strong>写入：</strong>通常与 Write-Through 配合，同步写缓存和数据库
            </div>
          </div>
        </div>

        <div class="pros-cons">
          <div class="pros">
            <div class="list-title">✅ 优点</div>
            <div class="list-item">代码简洁</div>
            <div class="list-item">一致性更好</div>
          </div>
          <div class="cons">
            <div class="list-title">❌ 缺点</div>
            <div class="list-item">需要专门的缓存库</div>
            <div class="list-item">灵活性较低</div>
          </div>
        </div>
      </div>

      <div v-if="activePattern === 'write-behind'" class="pattern-detail">
        <div class="pattern-header">
          <h3>Write-Behind (异步写回)</h3>
          <p class="pattern-desc">写入时只写缓存，异步批量写数据库</p>
        </div>

        <div class="flow-diagram">
          <div class="flow-step">
            <div class="step-icon">⚡</div>
            <div class="step-content">
              <strong>写入：</strong>立即写缓存 → 异步批量写数据库
            </div>
          </div>
          <div class="flow-step">
            <div class="step-icon">⚠️</div>
            <div class="step-content">
              <strong>风险：</strong>缓存崩溃会导致数据丢失
            </div>
          </div>
        </div>

        <div class="pros-cons">
          <div class="pros">
            <div class="list-title">✅ 优点</div>
            <div class="list-item">写入极快</div>
            <div class="list-item">适合写多场景</div>
          </div>
          <div class="cons">
            <div class="list-title">❌ 缺点</div>
            <div class="list-item">可能丢失数据</div>
            <div class="list-item">一致性差</div>
          </div>
        </div>
      </div>
    </div>

    <div class="comparison-table">
      <div class="table-title">三种模式对比</div>
      <table>
        <thead>
          <tr>
            <th>模式</th>
            <th>复杂度</th>
            <th>性能</th>
            <th>一致性</th>
            <th>适用场景</th>
          </tr>
        </thead>
        <tbody>
          <tr :class="{ active: activePattern === 'cache-aside' }">
            <td>Cache-Aside</td>
            <td>中</td>
            <td>高</td>
            <td>中</td>
            <td>大多数场景</td>
          </tr>
          <tr :class="{ active: activePattern === 'read-through' }">
            <td>Read-Through</td>
            <td>低</td>
            <td>中</td>
            <td>高</td>
            <td>读多写少</td>
          </tr>
          <tr :class="{ active: activePattern === 'write-behind' }">
            <td>Write-Behind</td>
            <td>高</td>
            <td>极高</td>
            <td>低</td>
            <td>写多、可丢失</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="info-box">
      <span class="icon">💡</span>
      <strong>选择建议：</strong>90% 的场景用 Cache-Aside；如果追求代码简洁用 Read-Through；如果是秒杀、点赞这种"能丢数据"的场景才用 Write-Behind。
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const activePattern = ref('cache-aside')

const patterns = [
  { id: 'cache-aside', name: 'Cache-Aside', icon: '🔧' },
  { id: 'read-through', name: 'Read-Through', icon: '📖' },
  { id: 'write-behind', name: 'Write-Behind', icon: '⚡' }
]
</script>

<style scoped>
.cache-pattern-comparison-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  padding: 1rem;
  margin: 1rem 0;
}

.demo-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.demo-header .icon { font-size: 1.25rem; }
.demo-header .title { font-weight: bold; font-size: 1rem; }
.demo-header .subtitle { color: var(--vp-c-text-2); font-size: 0.85rem; margin-left: 0.5rem; }

.intro-text {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  line-height: 1.6;
  margin-bottom: 1rem;
  padding: 0.75rem;
  background: var(--vp-c-bg);
  border-radius: 6px;
}

.intro-text .highlight {
  color: var(--vp-c-brand-1);
  font-weight: 500;
}

.pattern-tabs {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

.tab-btn {
  flex: 1;
  min-width: 140px;
  padding: 0.75rem 1rem;
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider);
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.tab-btn:hover {
  border-color: var(--vp-c-brand);
}

.tab-btn.active {
  background: var(--vp-c-brand);
  color: white;
  border-color: var(--vp-c-brand);
}

.tab-icon {
  font-size: 1.2rem;
}

.tab-name {
  font-size: 0.9rem;
}

.pattern-content {
  min-height: 300px;
}

.pattern-detail {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.pattern-header {
  padding: 1rem;
  background: var(--vp-c-bg);
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
}

.pattern-header h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1.1rem;
}

.pattern-desc {
  margin: 0;
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
}

.flow-diagram {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 1rem;
  background: var(--vp-c-bg);
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
}

.flow-step {
  display: flex;
  gap: 0.75rem;
  align-items: flex-start;
}

.step-icon {
  font-size: 1.5rem;
  flex-shrink: 0;
}

.step-content {
  flex: 1;
  font-size: 0.9rem;
  line-height: 1.5;
}

.step-content .highlight {
  color: var(--vp-c-brand-1);
  font-weight: 600;
}

.pros-cons {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.pros, .cons {
  padding: 1rem;
  border-radius: 8px;
}

.pros {
  background: #f0fdf4;
  border: 1px solid #bbf7d0;
}

.cons {
  background: #fef2f2;
  border: 1px solid #fecaca;
}

.list-title {
  font-weight: 600;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
}

.list-item {
  font-size: 0.85rem;
  margin-bottom: 0.35rem;
  line-height: 1.4;
}

.comparison-table {
  background: var(--vp-c-bg);
  padding: 1rem;
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
  margin-bottom: 1rem;
}

.table-title {
  font-weight: 600;
  margin-bottom: 0.75rem;
  font-size: 0.95rem;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 0.5rem;
  text-align: left;
  border: 1px solid var(--vp-c-divider);
  font-size: 0.85rem;
}

th {
  background: var(--vp-c-bg-soft);
  font-weight: 600;
}

tr.active {
  background: #eff6ff;
}

.info-box {
  background: var(--vp-c-bg-alt);
  padding: 0.75rem;
  border-radius: 6px;
  font-size: 0.85rem;
  line-height: 1.4;
  color: var(--vp-c-text-2);
}

.info-box .icon {
  margin-right: 0.25rem;
}
</style>
