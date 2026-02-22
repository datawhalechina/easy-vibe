<template>
  <div class="demo">
    <div class="header">
      <span class="icon">⚠️</span>
      <span class="title">错误响应设计进阶</span>
    </div>

    <div class="tabs">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        :class="['tab', { active: active === tab.id }]"
        @click="active = tab.id"
      >
        {{ tab.icon }} {{ tab.name }}
      </button>
    </div>

    <div class="content">
      <div v-if="active === 'validate'" class="section">
        <h4>参数校验错误</h4>
        <pre class="code-block">{
  "code": 10001,
  "message": "参数校验失败",
  "data": {
    "errors": [
      {
        "field": "email",
        "message": "邮箱格式不正确",
        "value": "invalid-email"
      },
      {
        "field": "password",
        "message": "密码长度至少 8 位",
        "value": "123"
      }
    ]
  }
}</pre>
        <div class="field-tips">
          <div class="tip-row">
            <code>field</code>
            <span>出错字段名，前端可定位表单</span>
          </div>
          <div class="tip-row">
            <code>message</code>
            <span>用户友好的错误描述</span>
          </div>
          <div class="tip-row">
            <code>value</code>
            <span>客户端提交的值（可选）</span>
          </div>
        </div>
      </div>

      <div v-if="active === 'business'" class="section">
        <h4>业务错误</h4>
        <pre class="code-block">{
  "code": 20001,
  "message": "余额不足",
  "data": {
    "current_balance": 50.00,
    "required_amount": 99.00,
    "shortfall": 49.00,
    "suggestion": "请充值后重试"
  }
}</pre>
        <div class="business-tips">
          <div class="b-tip">✓ 返回当前状态数据，便于前端展示</div>
          <div class="b-tip">✓ 提供 suggestion 给出解决建议</div>
          <div class="b-tip">✓ 数据结构化，前端可灵活展示</div>
        </div>
      </div>

      <div v-if="active === 'layers'" class="section">
        <h4>错误码分层设计</h4>
        <div class="layer-list">
          <div
            v-for="layer in layers"
            :key="layer.range"
            class="layer-item"
          >
            <div class="layer-range">{{ layer.range }}</div>
            <div class="layer-info">
              <div class="layer-name">{{ layer.name }}</div>
              <div class="layer-example">示例：{{ layer.example }}</div>
            </div>
            <div class="layer-desc">{{ layer.desc }}</div>
          </div>
        </div>
        <div class="layer-note">错误码从外到内：系统 → 服务 → 业务 → 认证 → 参数</div>
      </div>

      <div v-if="active === 'http'" class="section">
        <h4>HTTP 状态码 vs 业务状态码</h4>
        <div class="http-compare">
          <div class="http-col">
            <div class="http-title">HTTP 状态码</div>
            <div class="http-desc">传输层状态</div>
            <div class="http-codes">
              <div class="http-code">
                <span class="code-num">2xx</span>
                <span>请求成功</span>
              </div>
              <div class="http-code">
                <span class="code-num">4xx</span>
                <span>客户端错误</span>
              </div>
              <div class="http-code">
                <span class="code-num">5xx</span>
                <span>服务端错误</span>
              </div>
            </div>
          </div>
          <div class="http-arrow">→</div>
          <div class="http-col">
            <div class="http-title">业务状态码</div>
            <div class="http-desc">业务层状态</div>
            <div class="http-codes">
              <div class="http-code">
                <span class="code-num">0</span>
                <span>业务成功</span>
              </div>
              <div class="http-code">
                <span class="code-num">1xxxx</span>
                <span>参数错误</span>
              </div>
              <div class="http-code">
                <span class="code-num">2xxxx</span>
                <span>业务错误</span>
              </div>
            </div>
          </div>
        </div>
        <div class="http-note">HTTP 200 + 业务错误码 是业界主流做法</div>
      </div>

      <div v-if="active === 'examples'" class="section">
        <h4>常见错误码示例</h4>
        <div class="ex-tabs">
          <button
            v-for="ex in examples"
            :key="ex.id"
            :class="['ex-tab', { active: exId === ex.id }]"
            @click="exId = ex.id"
          >
            {{ ex.name }}
          </button>
        </div>
        <div class="ex-content">
          <div class="ex-list">
            <div
              v-for="item in currentExample.items"
              :key="item.code"
              class="ex-row"
            >
              <code class="ex-code">{{ item.code }}</code>
              <span class="ex-msg">{{ item.message }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="tips">
      <span class="tips-icon">💡</span>
      <span class="tips-text">错误信息要"机器可读 + 人类友好"，便于前端统一处理</span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const active = ref('validate')
const exId = ref('param')

const tabs = [
  { id: 'validate', icon: '🔍', name: '参数校验' },
  { id: 'business', icon: '💼', name: '业务错误' },
  { id: 'layers', icon: '📊', name: '分层设计' },
  { id: 'http', icon: '🌐', name: 'HTTP对比' },
  { id: 'examples', icon: '📋', name: '常见示例' }
]

const layers = [
  { range: '50001-59999', name: '系统层', example: '50001 数据库异常', desc: '基础设施问题' },
  { range: '40001-49999', name: '服务层', example: '40001 第三方服务超时', desc: '外部依赖问题' },
  { range: '30001-39999', name: '认证层', example: '30001 未登录', desc: '身份权限问题' },
  { range: '20001-29999', name: '业务层', example: '20001 余额不足', desc: '业务规则校验' },
  { range: '10001-19999', name: '参数层', example: '10001 参数缺失', desc: '客户端输入问题' }
]

const examples = [
  {
    id: 'param',
    name: '参数层',
    items: [
      { code: 10001, message: '缺少必填参数' },
      { code: 10002, message: '参数格式错误' },
      { code: 10003, message: '参数长度超限' },
      { code: 10004, message: '参数值非法' }
    ]
  },
  {
    id: 'auth',
    name: '认证层',
    items: [
      { code: 30001, message: '未登录' },
      { code: 30002, message: '登录已过期' },
      { code: 30003, message: '无权限访问' },
      { code: 30004, message: '账号已被禁用' }
    ]
  },
  {
    id: 'biz',
    name: '业务层',
    items: [
      { code: 20001, message: '余额不足' },
      { code: 20002, message: '商品已下架' },
      { code: 20003, message: '订单已取消' },
      { code: 20004, message: '库存不足' }
    ]
  },
  {
    id: 'sys',
    name: '系统层',
    items: [
      { code: 50001, message: '数据库异常' },
      { code: 50002, message: '缓存服务异常' },
      { code: 50003, message: '系统繁忙，请稍后重试' }
    ]
  }
]

const currentExample = computed(() => {
  return examples.find(e => e.id === exId.value) || examples[0]
})
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
  padding: 14px 20px;
  background: var(--vp-c-bg);
  border-bottom: 1px solid var(--vp-c-divider);
  display: flex;
  align-items: center;
  gap: 10px;
}

.icon {
  font-size: 20px;
}

.title {
  font-weight: 600;
  font-size: 15px;
}

.tabs {
  display: flex;
  gap: 4px;
  padding: 10px 12px;
  background: var(--vp-c-bg);
  border-bottom: 1px solid var(--vp-c-divider);
  overflow-x: auto;
}

.tab {
  padding: 6px 12px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg-soft);
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s;
}

.tab:hover {
  border-color: var(--vp-c-brand);
}

.tab.active {
  background: var(--vp-c-brand);
  border-color: var(--vp-c-brand);
  color: white;
}

.content {
  padding: 16px;
}

.section h4 {
  margin: 0 0 12px 0;
  font-size: 14px;
}

.code-block {
  background: #1e293b;
  color: #e2e8f0;
  padding: 12px;
  border-radius: 6px;
  font-family: 'Menlo', monospace;
  font-size: 11px;
  line-height: 1.5;
  overflow-x: auto;
  margin: 0;
}

.field-tips {
  margin-top: 12px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.tip-row {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 12px;
  background: var(--vp-c-bg);
  border-radius: 6px;
}

.tip-row code {
  background: var(--vp-c-bg-soft);
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 12px;
  color: var(--vp-c-brand);
  min-width: 70px;
}

.tip-row span {
  font-size: 12px;
  color: var(--vp-c-text-2);
}

.business-tips {
  margin-top: 12px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.b-tip {
  font-size: 12px;
  color: var(--vp-c-text-2);
  padding: 6px 10px;
  background: var(--vp-c-bg);
  border-radius: 4px;
}

.layer-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.layer-item {
  display: grid;
  grid-template-columns: 100px 1fr auto;
  gap: 12px;
  align-items: center;
  padding: 10px 12px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
}

@media (max-width: 640px) {
  .layer-item {
    grid-template-columns: 1fr;
    gap: 6px;
  }
}

.layer-range {
  font-family: monospace;
  font-size: 12px;
  font-weight: 600;
  color: var(--vp-c-brand);
  background: var(--vp-c-bg-soft);
  padding: 4px 8px;
  border-radius: 4px;
  text-align: center;
}

.layer-name {
  font-size: 13px;
  font-weight: 600;
}

.layer-example {
  font-size: 11px;
  color: var(--vp-c-text-3);
}

.layer-desc {
  font-size: 11px;
  color: var(--vp-c-text-2);
  background: color-mix(in srgb, var(--vp-c-brand) 10%, transparent);
  padding: 4px 8px;
  border-radius: 4px;
}

.layer-note {
  margin-top: 12px;
  font-size: 12px;
  color: var(--vp-c-text-2);
  padding: 8px 12px;
  background: var(--vp-c-bg);
  border-radius: 6px;
}

.http-compare {
  display: flex;
  align-items: stretch;
  gap: 12px;
}

@media (max-width: 640px) {
  .http-compare {
    flex-direction: column;
  }
  
  .http-arrow {
    display: none;
  }
}

.http-col {
  flex: 1;
  padding: 12px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
}

.http-title {
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 4px;
}

.http-desc {
  font-size: 11px;
  color: var(--vp-c-text-3);
  margin-bottom: 10px;
}

.http-arrow {
  display: flex;
  align-items: center;
  font-size: 20px;
  color: var(--vp-c-text-3);
}

.http-codes {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.http-code {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
}

.code-num {
  font-family: monospace;
  font-weight: 600;
  color: var(--vp-c-brand);
  min-width: 50px;
}

.http-note {
  margin-top: 12px;
  font-size: 12px;
  color: var(--vp-c-text-2);
  padding: 8px 12px;
  background: color-mix(in srgb, #22c55e 10%, var(--vp-c-bg));
  border-radius: 6px;
}

.ex-tabs {
  display: flex;
  gap: 4px;
  margin-bottom: 12px;
  flex-wrap: wrap;
}

.ex-tab {
  padding: 5px 10px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  background: var(--vp-c-bg);
  font-size: 11px;
  cursor: pointer;
  transition: all 0.2s;
}

.ex-tab:hover {
  border-color: var(--vp-c-brand);
}

.ex-tab.active {
  background: var(--vp-c-brand);
  border-color: var(--vp-c-brand);
  color: white;
}

.ex-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.ex-row {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 12px;
  background: var(--vp-c-bg);
  border-radius: 6px;
}

.ex-code {
  font-family: monospace;
  font-size: 12px;
  font-weight: 600;
  color: var(--vp-c-brand);
  background: var(--vp-c-bg-soft);
  padding: 2px 8px;
  border-radius: 4px;
  min-width: 50px;
  text-align: center;
}

.ex-msg {
  font-size: 12px;
  color: var(--vp-c-text-2);
}

.tips {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  background: var(--vp-c-bg);
  border-top: 1px solid var(--vp-c-divider);
}

.tips-icon {
  font-size: 14px;
}

.tips-text {
  font-size: 12px;
  color: var(--vp-c-text-2);
}
</style>
