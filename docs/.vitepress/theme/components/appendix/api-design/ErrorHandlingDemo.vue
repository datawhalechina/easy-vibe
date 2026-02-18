<!--
  ErrorHandlingDemo.vue - 错误处理演示组件
  展示错误处理的正确和错误示例对比
-->
<template>
  <div class="demo">
    <div class="header">
      <span class="icon">🚨</span>
      <span class="title">错误处理：优雅地"拒绝"</span>
    </div>

    <div class="content">
      <div class="comparison-tabs">
        <button
          class="tab-btn bad"
          :class="{ active: selectedTab === 'bad' }"
          @click="selectedTab = 'bad'"
        >
          ❌ 错误示范
        </button>
        <button
          class="tab-btn good"
          :class="{ active: selectedTab === 'good' }"
          @click="selectedTab = 'good'"
        >
          ✅ 正确示范
        </button>
      </div>

      <!-- 错误示范 -->
      <div
        v-if="selectedTab === 'bad'"
        class="comparison bad"
      >
        <div class="response-preview">
          <div class="status-line bad">
            <span>HTTP/1.1</span>
            <span class="code">200 OK</span>
          </div>
          <div class="response-body">
            <pre><code>{
  "error": "出错了"
}</code></pre>
          </div>
        </div>

        <div class="problems">
          <h4>问题分析</h4>
          <ul>
            <li>
              <span class="icon">⚠️</span>
              HTTP 状态码说"成功"，但业务说"出错" - 前后端状态不一致
            </li>
            <li>
              <span class="icon">⚠️</span>
              错误信息太笼统，无法定位问题
            </li>
            <li>
              <span class="icon">⚠️</span>
              没有错误代码，难以程序化判断
            </li>
            <li>
              <span class="icon">⚠️</span>
              浏览器和 CDN 会缓存这个"成功的"响应
            </li>
          </ul>
        </div>
      </div>

      <!-- 正确示范 -->
      <div
        v-if="selectedTab === 'good'"
        class="comparison good"
      >
        <div class="response-preview">
          <div class="status-line">
            <span>HTTP/1.1</span>
            <span class="code">422 Unprocessable Entity</span>
          </div>
          <div class="response-body">
            <pre><code>{{ JSON.stringify(goodResponse, null, 2) }}</code></pre>
          </div>
        </div>

        <div class="highlights">
          <h4>正确做法</h4>
          <ul>
            <li>
              <span class="icon">✅</span>
              <strong>正确的 HTTP 状态码</strong>: 422 表示语义错误
            </li>
            <li>
              <span class="icon">✅</span>
              <strong>业务错误码</strong>: `code: 20003` 可用于程序判断
            </li>
            <li>
              <span class="icon">✅</span>
              <strong>详细错误信息</strong>: `errors` 数组包含具体字段和原因
            </li>
            <li>
              <span class="icon">✅</span>
              <strong>可追踪性</strong>: `request_id` 用于日志查询
            </li>
            <li>
              <span class="icon">✅</span>
              <strong>帮助链接</strong>: `help_url` 引导用户查看文档
            </li>
          </ul>
        </div>

        <div class="error-codes">
          <h4>错误码体系</h4>
          <div class="code-list">
            <div
              v-for="item in errorCodeItems"
              :key="item.code"
              class="code-item"
            >
              <span class="code-badge">{{ item.code }}</span>
              <span class="code-desc">{{ item.desc }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const selectedTab = ref('bad')

const goodResponse = {
  code: 20003,
  message: '密码强度不足',
  errors: [
    {
      field: 'password',
      code: 'VALIDATION_ERROR',
      message: '密码必须包含至少 1 个大写字母、1 个小写字母、1 个数字，且长度至少 8 位'
    }
  ],
  request_id: 'req-550e8400-e29b-41d4-a716-44665544000',
  timestamp: '2024-01-15T09:30:00.000Z',
  help_url: 'https://docs.example.com/errors/20003'
}

const errorCodeItems = [
  { code: '1XXYY', desc: '通用错误（第1位固定为1）' },
  { code: '10001', desc: '参数错误' },
  { code: '10010', desc: '用户不存在' },
  { code: '10018', desc: 'Token 已过期' },
  { code: '10021', desc: '权限不足' },
  { code: '20003', desc: '密码强度不足' },
  { code: '20014', desc: '余额不足' }
]
</script>

<style scoped>
.demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
  margin: 24px 0;
  overflow: hidden;
}

.header {
  padding: 16px 20px;
  background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
  color: white;
  display: flex;
  align-items: center;
  gap: 12px;
}

.icon {
  font-size: 24px;
}

.title {
  font-weight: 600;
  font-size: 16px;
}

.content {
  padding: 24px;
}

.comparison-tabs {
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
}

.tab-btn {
  flex: 1;
  padding: 12px;
  border: 2px solid;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.tab-btn.bad {
  border-color: #ef4444;
  background: var(--vp-c-bg);
  color: #ef4444;
}

.tab-btn.bad:hover {
  background: #fef2f2;
}

.tab-btn.bad.active {
  background: #ef4444;
  color: white;
}

.tab-btn.good {
  border-color: #22c55e;
  background: var(--vp-c-bg);
  color: #22c55e;
}

.tab-btn.good:hover {
  background: #f0fdf4;
}

.tab-btn.good.active {
  background: #22c55e;
  color: white;
}

.comparison {
  background: var(--vp-c-bg);
  border-radius: 6px;
  overflow: hidden;
}

.response-preview {
  margin-bottom: 20px;
}

.status-line {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background: var(--vp-c-bg-soft);
  border-bottom: 1px solid var(--vp-c-divider);
  font-family: monospace;
  font-size: 13px;
}

.status-line.bad .code {
  color: #ef4444;
  font-weight: 700;
}

.status-line:not(.bad) .code {
  color: #d97706;
  font-weight: 700;
}

.response-body {
  padding: 16px;
}

.response-body pre {
  margin: 0;
  background: var(--vp-c-bg-alt);
  padding: 16px;
  border-radius: 6px;
  font-size: 12px;
  line-height: 1.5;
  overflow-x: auto;
}

.response-body code {
  font-family: monospace;
  color: var(--vp-c-text-1);
}

.problems, .highlights {
  padding: 16px;
}

.problems h4, .highlights h4 {
  font-size: 14px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin: 0 0 12px 0;
}

.problems ul, .highlights ul {
  margin: 0;
  padding-left: 0;
  list-style: none;
}

.problems li, .highlights li {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 10px;
  margin-bottom: 8px;
  border-radius: 6px;
  line-height: 1.6;
  font-size: 13px;
}

.problems li {
  background: #fef2f2;
  color: #991b1b;
}

.highlights li {
  background: #f0fdf4;
  color: #166534;
}

.problems li .icon, .highlights li .icon {
  font-size: 16px;
  flex-shrink: 0;
}

.problems li strong, .highlights li strong {
  font-weight: 600;
}

.error-codes {
  padding: 16px;
  border-top: 1px solid var(--vp-c-divider);
}

.error-codes h4 {
  font-size: 14px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin: 0 0 12px 0;
}

.code-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.code-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  border-left: 3px solid var(--vp-c-brand);
}

.code-badge {
  font-family: monospace;
  font-size: 12px;
  font-weight: 700;
  padding: 4px 8px;
  background: var(--vp-c-brand);
  color: white;
  border-radius: 4px;
  min-width: 70px;
  text-align: center;
}

.code-desc {
  font-size: 13px;
  color: var(--vp-c-text-2);
}

@media (max-width: 640px) {
  .comparison-tabs {
    flex-direction: column;
  }

  .status-line {
    flex-wrap: wrap;
  }
}
</style>
