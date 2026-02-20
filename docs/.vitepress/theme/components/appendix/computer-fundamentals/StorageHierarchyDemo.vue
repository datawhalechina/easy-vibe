<template>
  <div class="storage-hierarchy-demo">
    <div class="demo-header">
      <span class="icon">💾</span>
      <span class="title">存储层次结构</span>
      <span class="subtitle">从快到慢，从小到大</span>
    </div>

    <div class="hierarchy-pyramid">
      <div class="pyramid-level register">
        <div class="level-name">寄存器</div>
        <div class="level-speed">最快</div>
        <div class="level-size">最小 (KB)</div>
      </div>
      <div class="pyramid-level cache">
        <div class="level-name">缓存</div>
        <div class="level-speed">很快</div>
        <div class="level-size">小 (MB)</div>
      </div>
      <div class="pyramid-level ram">
        <div class="level-name">内存</div>
        <div class="level-speed">快</div>
        <div class="level-size">中等 (GB)</div>
      </div>
      <div class="pyramid-level disk">
        <div class="level-name">硬盘</div>
        <div class="level-speed">慢</div>
        <div class="level-size">大 (TB)</div>
      </div>
      <div class="pyramid-level network">
        <div class="level-name">网络/云</div>
        <div class="level-speed">最慢</div>
        <div class="level-size">无限</div>
      </div>
    </div>

    <div class="comparison-table">
      <div class="table-title">详细对比</div>
      <table class="hierarchy-table">
        <thead>
          <tr>
            <th>存储层次</th>
            <th>访问时间</th>
            <th>典型容量</th>
            <th>成本</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>寄存器</td>
            <td>&lt; 1 ns</td>
            <td>几 KB</td>
            <td>最高</td>
          </tr>
          <tr>
            <td>L1 缓存</td>
            <td>~1 ns</td>
            <td>64 KB</td>
            <td>很高</td>
          </tr>
          <tr>
            <td>L2 缓存</td>
            <td>~3 ns</td>
            <td>256 KB</td>
            <td>高</td>
          </tr>
          <tr>
            <td>L3 缓存</td>
            <td>~10 ns</td>
            <td>8 MB</td>
            <td>中等</td>
          </tr>
          <tr>
            <td>内存</td>
            <td>~100 ns</td>
            <td>8-32 GB</td>
            <td>中低</td>
          </tr>
          <tr>
            <td>SSD</td>
            <td>~100 μs</td>
            <td>256 GB-2 TB</td>
            <td>低</td>
          </tr>
          <tr>
            <td>HDD</td>
            <td>~10 ms</td>
            <td>1-10 TB</td>
            <td>最低</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="principle">
      <div class="principle-title">局部性原理</div>
      <div class="principle-content">
        <div class="principle-text">
          程序倾向于访问<strong>最近访问过的位置</strong>（时间局部性）
          和<strong>邻近的位置</strong>（空间局部性）
        </div>
        <div class="principle-example">
          利用局部性原理，缓存可以显著提高性能
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.storage-hierarchy-demo {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  padding: 1.5rem;
  margin: 1.5rem 0;
}

.demo-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.demo-header .icon { font-size: 1.5rem; }
.demo-header .title { font-weight: 700; font-size: 1.1rem; }
.demo-header .subtitle { color: var(--vp-c-text-2); font-size: 0.9rem; }

.hierarchy-pyramid {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 2rem;
}

.pyramid-level {
  padding: 1rem;
  border-radius: 6px;
  text-align: center;
  color: white;
}

.pyramid-level.register {
  background: linear-gradient(135deg, #ef4444, #dc2626);
}

.pyramid-level.cache {
  background: linear-gradient(135deg, #f59e0b, #d97706);
}

.pyramid-level.ram {
  background: linear-gradient(135deg, #10b981, #059669);
}

.pyramid-level.disk {
  background: linear-gradient(135deg, #3b82f6, #2563eb);
}

.pyramid-level.network {
  background: linear-gradient(135deg, #8b5cf6, #7c3aed);
}

.level-name {
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 0.35rem;
}

.level-speed {
  font-size: 0.8rem;
  margin-bottom: 0.35rem;
}

.level-size {
  font-size: 0.8rem;
}

.comparison-table {
  margin-bottom: 2rem;
}

.table-title {
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 1rem;
  color: var(--vp-c-brand);
}

.hierarchy-table {
  width: 100%;
  border-collapse: collapse;
}

.hierarchy-table th {
  background: var(--vp-c-brand);
  color: white;
  padding: 0.75rem;
  text-align: center;
  font-size: 0.85rem;
}

.hierarchy-table td {
  padding: 0.75rem;
  border-bottom: 1px solid var(--vp-c-divider);
  text-align: center;
  font-size: 0.85rem;
  font-family: 'Courier New', monospace;
}

.principle {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 1.5rem;
}

.principle-title {
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 1rem;
  color: var(--vp-c-brand);
}

.principle-content {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.principle-text {
  font-size: 0.95rem;
  line-height: 1.6;
}

.principle-example {
  padding: 0.75rem;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}
</style>
