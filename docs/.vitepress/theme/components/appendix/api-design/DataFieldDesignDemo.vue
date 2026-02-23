<template>
  <div class="demo">
    <div class="header">
      <span class="icon">📦</span>
      <span class="title">data 字段设计规范</span>
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
      <div v-if="active === 'structure'" class="section">
        <h4>单对象 vs 列表</h4>
        <div class="compare-row">
          <div class="compare-col">
            <div class="compare-title">单对象</div>
            <pre class="code-sm">
{
  "code": 0,
  "data": {
    "id": 123,
    "name": "张三"
  }
}</pre>
          </div>
          <div class="compare-col">
            <div class="compare-title">列表</div>
            <pre class="code-sm">
{
  "code": 0,
  "data": {
    "items": [...],
    "pagination": {
      "page": 1,
      "total": 100
    }
  }
}</pre>
          </div>
        </div>
        <div class="note">
          列表数据包裹在 items 数组中，分页信息放在 pagination 对象
        </div>
      </div>

      <div v-if="active === 'naming'" class="section">
        <h4>字段命名规范</h4>
        <div class="rule-list">
          <div v-for="rule in namingRules" :key="rule.name" class="rule-item">
            <div class="rule-header">
              <span class="rule-icon">{{ rule.icon }}</span>
              <span class="rule-name">{{ rule.name }}</span>
            </div>
            <div class="rule-examples">
              <code class="good">{{ rule.good }}</code>
              <span v-if="rule.bad" class="vs">vs</span>
              <code v-if="rule.bad" class="bad">{{ rule.bad }}</code>
            </div>
            <div class="rule-desc">{{ rule.desc }}</div>
          </div>
        </div>
      </div>

      <div v-if="active === 'datetime'" class="section">
        <h4>时间格式设计</h4>
        <div class="time-example">
          <pre class="code-block">
{
  "created_at": "2024-01-15T09:30:00.000Z",
  "updated_at": "2024-01-15T10:00:00.000Z",
  "expired_at": "2025-01-15T00:00:00.000Z"
}</pre>
        </div>
        <div class="time-rules">
          <div class="time-rule">
            <span class="rule-label">格式</span>
            <span class="rule-value">ISO 8601</span>
          </div>
          <div class="time-rule">
            <span class="rule-label">时区</span>
            <span class="rule-value">UTC（Z 后缀）或明确偏移量</span>
          </div>
          <div class="time-rule">
            <span class="rule-label">精度</span>
            <span class="rule-value">毫秒 .000Z</span>
          </div>
          <div class="time-rule">
            <span class="rule-label">命名</span>
            <span class="rule-value">xxx_at 表示时间点，xxx_duration 表示时长</span>
          </div>
        </div>
      </div>

      <div v-if="active === 'null'" class="section">
        <h4>空值处理</h4>
        <div class="compare-row">
          <div class="compare-col good-col">
            <div class="compare-title">✅ 推荐</div>
            <pre class="code-sm">
{
  "name": "张三",
  "nickname": null,
  "avatar": null
}</pre>
            <div class="compare-desc">字段存在但无值时返回 null</div>
          </div>
          <div class="compare-col bad-col">
            <div class="compare-title">❌ 不推荐</div>
            <pre class="code-sm">
{
  "name": "张三"
}</pre>
            <div class="compare-desc">省略字段，前端需判断是否存在</div>
          </div>
        </div>
        <div class="null-tips">
          <div class="tip-item">空数组返回 <code>[]</code></div>
          <div class="tip-item">空对象返回 <code>{}</code></div>
          <div class="tip-item">前端可统一处理，无需判断字段是否存在</div>
        </div>
      </div>

      <div v-if="active === 'relation'" class="section">
        <h4>关联数据设计</h4>
        <div class="relation-tabs">
          <button
            v-for="r in relations"
            :key="r.id"
            :class="['r-tab', { active: rId === r.id }]"
            @click="rId = r.id"
          >
            {{ r.name }}
          </button>
        </div>
        <div class="relation-content">
          <div class="relation-desc">{{ currentRelation.desc }}</div>
          <pre class="code-block"><code>{{ currentRelation.code }}</code></pre>
        </div>
      </div>
    </div>

    <div class="tips">
      <span class="tips-icon">💡</span>
      <span class="tips-text">参考 ISO 8601 时间标准，字段命名保持 snake_case 风格</span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const active = ref('structure')
const rId = ref('embed')

const tabs = [
  { id: 'structure', icon: '📐', name: '结构设计' },
  { id: 'naming', icon: '📝', name: '命名规范' },
  { id: 'datetime', icon: '🕐', name: '时间格式' },
  { id: 'null', icon: '∅', name: '空值处理' },
  { id: 'relation', icon: '🔗', name: '关联数据' }
]

const namingRules = [
  {
    icon: '🔡',
    name: '使用 snake_case',
    good: 'created_at',
    bad: 'createdAt',
    desc: 'JSON 字段名统一用下划线'
  },
  {
    icon: '📖',
    name: '避免缩写',
    good: 'user_id',
    bad: 'uid',
    desc: '保持可读性'
  },
  {
    icon: '✅',
    name: '布尔值加前缀',
    good: 'is_active, has_permission',
    bad: 'active, permission',
    desc: '一眼识别布尔类型'
  },
  {
    icon: '📅',
    name: '时间带后缀',
    good: 'created_at, expired_at',
    bad: 'created, expired',
    desc: '明确是时间字段'
  },
  {
    icon: '🔢',
    name: '数量带后缀',
    good: 'total_count, page_size',
    bad: 'total, size',
    desc: '明确是数值类型'
  }
]

const relations = [
  {
    id: 'embed',
    name: '内嵌',
    desc: '适合数据量小、频繁访问的关联数据',
    code: `{
  "id": 123,
  "name": "张三",
  "department": {
    "id": 1,
    "name": "技术部"
  }
}`
  },
  {
    id: 'foreign',
    name: '外键',
    desc: '适合数据量大、按需加载的关联数据',
    code: `{
  "id": 123,
  "name": "张三",
  "department_id": 1
}`
  },
  {
    id: 'expand',
    name: 'expand 参数',
    desc: 'Stripe 风格，客户端按需展开',
    code: `// GET /users/123?expand=department
{
  "id": 123,
  "name": "张三",
  "department": {
    "id": 1,
    "name": "技术部"
  }
}`
  }
]

const currentRelation = computed(() => {
  return relations.find((r) => r.id === rId.value) || relations[0]
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

.compare-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

@media (max-width: 640px) {
  .compare-row {
    grid-template-columns: 1fr;
  }
}

.compare-col {
  padding: 12px;
  border-radius: 8px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
}

.compare-col.good-col {
  border-color: color-mix(in srgb, #22c55e 30%, transparent);
  background: color-mix(in srgb, #22c55e 5%, var(--vp-c-bg));
}

.compare-col.bad-col {
  border-color: color-mix(in srgb, #ef4444 30%, transparent);
  background: color-mix(in srgb, #ef4444 5%, var(--vp-c-bg));
}

.compare-title {
  font-size: 12px;
  font-weight: 600;
  margin-bottom: 8px;
}

.compare-desc {
  font-size: 11px;
  color: var(--vp-c-text-3);
  margin-top: 8px;
}

.code-sm {
  background: #1e293b;
  color: #e2e8f0;
  padding: 10px;
  border-radius: 6px;
  font-family: 'Menlo', monospace;
  font-size: 11px;
  line-height: 1.5;
  overflow-x: auto;
  margin: 0;
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

.note {
  font-size: 12px;
  color: var(--vp-c-text-2);
  margin-top: 12px;
  padding: 8px 12px;
  background: var(--vp-c-bg);
  border-radius: 6px;
}

.rule-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.rule-item {
  padding: 12px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
}

.rule-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}

.rule-icon {
  font-size: 16px;
}

.rule-name {
  font-size: 13px;
  font-weight: 600;
}

.rule-examples {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 6px;
}

.rule-examples code {
  padding: 3px 8px;
  border-radius: 4px;
  font-size: 12px;
}

.rule-examples .good {
  background: color-mix(in srgb, #22c55e 15%, transparent);
  color: #16a34a;
}

.rule-examples .bad {
  background: color-mix(in srgb, #ef4444 15%, transparent);
  color: #dc2626;
  text-decoration: line-through;
}

.rule-examples .vs {
  font-size: 10px;
  color: var(--vp-c-text-3);
}

.rule-desc {
  font-size: 11px;
  color: var(--vp-c-text-3);
}

.time-example {
  margin-bottom: 12px;
}

.time-rules {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.time-rule {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 12px;
  background: var(--vp-c-bg);
  border-radius: 6px;
}

.rule-label {
  font-size: 12px;
  font-weight: 600;
  color: var(--vp-c-text-2);
  min-width: 40px;
}

.rule-value {
  font-size: 12px;
  color: var(--vp-c-text-1);
}

.null-tips {
  margin-top: 12px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.tip-item {
  font-size: 12px;
  color: var(--vp-c-text-2);
  padding: 6px 10px;
  background: var(--vp-c-bg);
  border-radius: 4px;
}

.tip-item code {
  background: var(--vp-c-bg-soft);
  padding: 1px 5px;
  border-radius: 3px;
  font-size: 11px;
}

.relation-tabs {
  display: flex;
  gap: 4px;
  margin-bottom: 12px;
}

.r-tab {
  padding: 6px 12px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  background: var(--vp-c-bg);
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s;
}

.r-tab:hover {
  border-color: var(--vp-c-brand);
}

.r-tab.active {
  background: var(--vp-c-brand);
  border-color: var(--vp-c-brand);
  color: white;
}

.relation-desc {
  font-size: 12px;
  color: var(--vp-c-text-2);
  margin-bottom: 10px;
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
