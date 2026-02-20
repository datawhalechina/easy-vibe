<template>
  <div class="data-encoding-basics-demo">
    <div class="demo-header">
      <span class="icon">🔤</span>
      <span class="title">数据编码基础</span>
      <span class="subtitle">信息如何被表示和存储</span>
    </div>

    <div class="encoding-intro">
      计算机只能识别 <strong>0 和 1</strong>，所有数据都需要转换成二进制
    </div>

    <div class="bit-byte">
      <div class="bb-cards">
        <div class="bb-card">
          <div class="bb-title">位 (Bit)</div>
          <div class="bb-value">0 或 1</div>
          <div class="bb-desc">最小数据单位</div>
        </div>
        <div class="bb-card">
          <div class="bb-title">字节 (Byte)</div>
          <div class="bb-value">8 位</div>
          <div class="bb-desc">常用存储单位</div>
        </div>
      </div>
    </div>

    <div class="encoding-examples">
      <div class="example-title">不同数据的编码方式</div>
      <div class="example-grid">
        <div class="example-card">
          <div class="card-icon">🔢</div>
          <div class="card-title">数字</div>
          <div class="card-encoding">
            <div class="encoding-label">十进制</div>
            <div class="encoding-value">25</div>
          </div>
          <div class="card-encoding">
            <div class="encoding-label">二进制</div>
            <div class="encoding-value">00011001</div>
          </div>
        </div>

        <div class="example-card">
          <div class="card-icon">🔤</div>
          <div class="card-title">字符</div>
          <div class="card-encoding">
            <div class="encoding-label">字符</div>
            <div class="encoding-value">A</div>
          </div>
          <div class="card-encoding">
            <div class="encoding-label">ASCII</div>
            <div class="encoding-value">01000001</div>
          </div>
        </div>

        <div class="example-card">
          <div class="card-icon">🎨</div>
          <div class="card-title">颜色</div>
          <div class="card-encoding">
            <div class="encoding-label">RGB</div>
            <div class="encoding-value">255,0,0</div>
          </div>
          <div class="card-encoding">
            <div class="encoding-label">十六进制</div>
            <div class="encoding-value">#FF0000</div>
          </div>
        </div>
      </div>
    </div>

    <div class="encoding-standards">
      <div class="standards-title">常见编码标准</div>
      <table class="standards-table">
        <thead>
          <tr>
            <th>编码</th>
            <th>说明</th>
            <th>用途</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>ASCII</td>
            <td>7 位，128 个字符</td>
            <td>英文字符</td>
          </tr>
          <tr>
            <td>Unicode</td>
            <td>统一码，全球字符</td>
            <td>多语言文本</td>
          </tr>
          <tr>
            <td>UTF-8</td>
            <td>变长编码，1-4 字节</td>
            <td>网页文本</td>
          </tr>
          <tr>
            <td>Base64</td>
            <td>二进制转文本</td>
            <td>邮件、图片</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.data-encoding-basics-demo {
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

.encoding-intro {
  padding: 1rem;
  background: var(--vp-c-bg);
  border-left: 4px solid var(--vp-c-brand);
  border-radius: 6px;
  margin-bottom: 2rem;
  font-size: 0.95rem;
  line-height: 1.6;
}

.bit-byte {
  margin-bottom: 2rem;
}

.bb-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.bb-card {
  padding: 1.5rem;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  text-align: center;
}

.bb-title {
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 0.75rem;
}

.bb-value {
  font-family: 'Courier New', monospace;
  font-size: 1.2rem;
  color: var(--vp-c-brand);
  margin-bottom: 0.5rem;
}

.bb-desc {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
}

.encoding-examples {
  margin-bottom: 2rem;
}

.example-title {
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 1.5rem;
  text-align: center;
  color: var(--vp-c-brand);
}

.example-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.example-card {
  padding: 1.25rem;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  text-align: center;
}

.card-icon {
  font-size: 2rem;
  margin-bottom: 0.75rem;
}

.card-title {
  font-weight: 600;
  font-size: 0.95rem;
  margin-bottom: 1rem;
}

.card-encoding {
  margin-bottom: 0.75rem;
}

.encoding-label {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.35rem;
}

.encoding-value {
  font-family: 'Courier New', monospace;
  font-size: 0.9rem;
  color: var(--vp-c-brand);
}

.encoding-standards {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 1.5rem;
}

.standards-title {
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 1rem;
  color: var(--vp-c-brand);
}

.standards-table {
  width: 100%;
  border-collapse: collapse;
}

.standards-table th {
  background: var(--vp-c-brand);
  color: white;
  padding: 0.75rem;
  text-align: left;
  font-size: 0.85rem;
}

.standards-table td {
  padding: 0.75rem;
  border-bottom: 1px solid var(--vp-c-divider);
  font-size: 0.85rem;
}
</style>
