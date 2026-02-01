<!--
  ApiMethodDemo.vue
  目标：清晰展示各种 HTTP 方法的含义和使用场景
-->
<template>
  <div class="demo">
    <div class="title">🔍 HTTP 方法：GET、POST、PUT、DELETE 是什么？</div>
    <p class="subtitle">把它们想象成对数据的"操作方式"</p>

    <div class="methods-grid">
      <div class="method-card get">
        <div class="method-badge">GET</div>
        <div class="method-title">📖 获取（查询）</div>
        <div class="method-desc">
          <p><strong>只看不改</strong> - 从服务器获取数据</p>
          <div class="method-examples">
            <div class="example-item">• 查询用户信息</div>
            <div class="example-item">• 搜索商品</div>
            <div class="example-item">• 获取文章列表</div>
          </div>
        </div>
        <div class="method-tip">💡 可以安全重试，不会改变服务器数据</div>
      </div>

      <div class="method-card post">
        <div class="method-badge">POST</div>
        <div class="method-title">➕ 创建（新增）</div>
        <div class="method-desc">
          <p><strong>新建数据</strong> - 在服务器创建新资源</p>
          <div class="method-examples">
            <div class="example-item">• 创建新用户</div>
            <div class="example-item">• 提交订单</div>
            <div class="example-item">• 发表评论</div>
          </div>
        </div>
        <div class="method-tip">⚠️ 不能随意重试，可能会重复创建</div>
      </div>

      <div class="method-card put">
        <div class="method-badge">PUT</div>
        <div class="method-title">✏️ 更新（替换）</div>
        <div class="method-desc">
          <p><strong>整体替换</strong> - 用新数据完全替换旧数据</p>
          <div class="method-examples">
            <div class="example-item">• 修改用户全部信息</div>
            <div class="example-item">• 更换文章全部内容</div>
          </div>
        </div>
        <div class="method-tip">⚠️ 会覆盖整个资源，需要提供完整数据</div>
      </div>

      <div class="method-card patch">
        <div class="method-badge">PATCH</div>
        <div class="method-title">🔧 修改（部分）</div>
        <div class="method-desc">
          <p><strong>局部更新</strong> - 只修改资源的部分字段</p>
          <div class="method-examples">
            <div class="example-item">• 只修改用户昵称</div>
            <div class="example-item">• 更新文章标题</div>
          </div>
        </div>
        <div class="method-tip">💡 只传需要修改的字段，更灵活</div>
      </div>

      <div class="method-card delete">
        <div class="method-badge">DELETE</div>
        <div class="method-title">🗑️ 删除</div>
        <div class="method-desc">
          <p><strong>移除数据</strong> - 从服务器删除资源</p>
          <div class="method-examples">
            <div class="example-item">• 删除用户</div>
            <div class="example-item">• 取消订单</div>
            <div class="example-item">• 删除评论</div>
          </div>
        </div>
        <div class="method-tip">⚠️ 操作不可逆，删除后无法恢复</div>
      </div>
    </div>

    <div class="comparison-table">
      <div class="table-title">📊 快速对比</div>
      <table>
        <thead>
          <tr>
            <th>方法</th>
            <th>操作</th>
            <th>是否会改数据</th>
            <th>能否重试</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><span class="badge get">GET</span></td>
            <td>查询</td>
            <td>❌ 否</td>
            <td>✅ 可以</td>
          </tr>
          <tr>
            <td><span class="badge post">POST</span></td>
            <td>创建</td>
            <td>✅ 是</td>
            <td>⚠️ 不建议</td>
          </tr>
          <tr>
            <td><span class="badge put">PUT</span></td>
            <td>替换</td>
            <td>✅ 是</td>
            <td>⚠️ 不建议</td>
          </tr>
          <tr>
            <td><span class="badge patch">PATCH</span></td>
            <td>修改</td>
            <td>✅ 是</td>
            <td>⚠️ 不建议</td>
          </tr>
          <tr>
            <td><span class="badge delete">DELETE</span></td>
            <td>删除</td>
            <td>✅ 是</td>
            <td>⚠️ 不建议</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="tips">
      <p><strong>💡 新手建议：</strong></p>
      <ul>
        <li>
          先学会 <strong>GET</strong>（查询）和
          <strong>POST</strong>（创建）就够用了
        </li>
        <li>PUT/PATCH/DELETE 可以慢慢学，理解原理更重要</li>
        <li>实际开发中，GET 和 POST 占了 80% 的使用场景</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
// 无需脚本逻辑
</script>

<style scoped>
.demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 20px;
  background: var(--vp-c-bg-soft);
  margin: 16px 0;
}

.title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 8px;
  color: var(--vp-c-text-1);
}

.subtitle {
  color: var(--vp-c-text-2);
  margin-bottom: 24px;
}

.methods-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 16px;
  margin-bottom: 24px;
}

.method-card {
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 16px;
  position: relative;
}

.method-card.get {
  border-color: #3b82f6;
}
.method-card.post {
  border-color: #22c55e;
}
.method-card.put {
  border-color: #f59e0b;
}
.method-card.patch {
  border-color: #8b5cf6;
}
.method-card.delete {
  border-color: #ef4444;
}

.method-badge {
  position: absolute;
  top: 12px;
  right: 12px;
  padding: 4px 12px;
  border-radius: 6px;
  font-weight: bold;
  font-size: 12px;
  color: white;
}

.method-card.get .method-badge {
  background: #3b82f6;
}
.method-card.post .method-badge {
  background: #22c55e;
}
.method-card.put .method-badge {
  background: #f59e0b;
}
.method-card.patch .method-badge {
  background: #8b5cf6;
}
.method-card.delete .method-badge {
  background: #ef4444;
}

.method-title {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 12px;
  padding-right: 60px;
  color: var(--vp-c-text-1);
}

.method-desc p {
  margin: 0 0 12px 0;
  font-size: 14px;
  font-weight: 600;
}

.method-examples {
  background: var(--vp-c-bg-soft);
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 12px;
}

.example-item {
  font-size: 13px;
  padding: 4px 0;
  color: var(--vp-c-text-1);
}

.method-tip {
  padding: 10px 12px;
  border-radius: 8px;
  font-size: 12px;
  line-height: 1.5;
}

.method-card.get .method-tip {
  background: #eff6ff;
  color: #1e40af;
}

.method-card.post .method-tip,
.method-card.put .method-tip,
.method-card.patch .method-tip,
.method-card.delete .method-tip {
  background: #fef2f2;
  color: #991b1b;
}

.comparison-table {
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
}

.table-title {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 16px;
  color: var(--vp-c-text-1);
}

table {
  width: 100%;
  border-collapse: collapse;
}

thead {
  background: var(--vp-c-bg-soft);
}

th {
  padding: 12px;
  text-align: left;
  font-weight: bold;
  font-size: 13px;
  color: var(--vp-c-text-1);
  border-bottom: 2px solid var(--vp-c-divider);
}

td {
  padding: 12px;
  font-size: 13px;
  border-bottom: 1px solid var(--vp-c-divider);
  color: var(--vp-c-text-1);
}

tr:last-child td {
  border-bottom: none;
}

.badge {
  display: inline-block;
  padding: 4px 10px;
  border-radius: 6px;
  font-weight: bold;
  font-size: 12px;
  color: white;
}

.badge.get {
  background: #3b82f6;
}
.badge.post {
  background: #22c55e;
}
.badge.put {
  background: #f59e0b;
}
.badge.patch {
  background: #8b5cf6;
}
.badge.delete {
  background: #ef4444;
}

.tips {
  background: var(--vp-c-bg);
  padding: 16px;
  border-radius: 8px;
  font-size: 14px;
  line-height: 1.8;
  color: var(--vp-c-text-2);
}

.tips p {
  margin-bottom: 8px;
}

.tips ul {
  margin: 0;
  padding-left: 20px;
}

.tips li {
  margin: 4px 0;
}
</style>
