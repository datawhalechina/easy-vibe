<template>
  <div class="pattern-catalog-demo">
    <div class="demo-label">设计模式图鉴 ── 点击分类查看常用模式</div>

    <div class="categories">
      <div
        v-for="(cat, i) in categories"
        :key="cat.name"
        class="cat-card"
        :class="[cat.cls, { active: selected === i }]"
        @click="selected = selected === i ? -1 : i"
      >
        <span class="cat-icon">{{ cat.icon }}</span>
        <span class="cat-name">{{ cat.name }}</span>
        <span class="cat-count">{{ cat.patterns.length }} 个模式</span>
      </div>
    </div>

    <Transition name="fade">
      <div v-if="selected >= 0" class="patterns-list">
        <div
          v-for="p in categories[selected].patterns"
          :key="p.name"
          class="pattern-item"
          :class="categories[selected].cls"
        >
          <div class="pattern-header" @click="expanded = expanded === p.name ? '' : p.name">
            <strong>{{ p.name }}</strong>
            <span class="toggle">{{ expanded === p.name ? '▼' : '▶' }}</span>
          </div>
          <div class="pattern-intent">{{ p.intent }}</div>
          <Transition name="fade">
            <div v-if="expanded === p.name" class="pattern-detail">
              <div class="detail-label">适用场景</div>
              <div class="detail-text">{{ p.when }}</div>
              <div class="detail-label">代码示例</div>
              <pre><code>{{ p.code }}</code></pre>
            </div>
          </Transition>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const selected = ref(-1)
const expanded = ref('')

const categories = [
  {
    name: '创建型',
    icon: '🏗️',
    cls: 'create',
    patterns: [
      {
        name: '单例模式 Singleton',
        intent: '确保一个类只有一个实例，并提供全局访问点。',
        when: '数据库连接池、全局配置管理、日志记录器。',
        code: `class Database {
  static instance = null
  static getInstance() {
    if (!this.instance) {
      this.instance = new Database()
    }
    return this.instance
  }
}`
      },
      {
        name: '工厂模式 Factory',
        intent: '定义创建对象的接口，让子类决定实例化哪个类。',
        when: '需要根据条件创建不同类型对象时。',
        code: `function createNotification(type) {
  switch (type) {
    case 'email': return new EmailNotify()
    case 'sms':   return new SmsNotify()
    case 'push':  return new PushNotify()
  }
}`
      }
    ]
  },
  {
    name: '结构型',
    icon: '🧱',
    cls: 'structure',
    patterns: [
      {
        name: '装饰器模式 Decorator',
        intent: '动态地给对象添加额外职责，比继承更灵活。',
        when: '需要在不修改原有代码的情况下扩展功能。',
        code: `function withLogging(fn) {
  return function(...args) {
    console.log('调用:', fn.name)
    return fn.apply(this, args)
  }
}
const save = withLogging(saveUser)`
      },
      {
        name: '适配器模式 Adapter',
        intent: '将一个接口转换成客户端期望的另一个接口。',
        when: '对接第三方 API、兼容旧系统接口。',
        code: `class OldApi { getData() { ... } }

class ApiAdapter {
  constructor(old) { this.old = old }
  fetch() { return this.old.getData() }
}`
      }
    ]
  },
  {
    name: '行为型',
    icon: '🎭',
    cls: 'behavior',
    patterns: [
      {
        name: '观察者模式 Observer',
        intent: '定义一对多依赖，当状态变化时自动通知所有依赖者。',
        when: '事件系统、状态管理、消息推送。',
        code: `class EventBus {
  listeners = {}
  on(event, fn) {
    (this.listeners[event] ||= []).push(fn)
  }
  emit(event, data) {
    this.listeners[event]?.forEach(fn => fn(data))
  }
}`
      },
      {
        name: '策略模式 Strategy',
        intent: '定义一系列算法，使它们可以互相替换。',
        when: '排序策略、支付方式、验证规则的切换。',
        code: `const strategies = {
  bubble: arr => { /* 冒泡排序 */ },
  quick:  arr => { /* 快速排序 */ },
  merge:  arr => { /* 归并排序 */ }
}
function sort(arr, type) {
  return strategies[type](arr)
}`
      }
    ]
  }
]
</script>

<style scoped>
.pattern-catalog-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  padding: 1rem 1.2rem;
  margin: 1rem 0;
}

.demo-label {
  font-size: 0.78rem;
  font-weight: bold;
  color: var(--vp-c-text-2);
  margin-bottom: 1rem;
  text-align: center;
}

.categories { display: flex; gap: 8px; margin-bottom: 1rem; flex-wrap: wrap; }

.cat-card {
  flex: 1;
  min-width: 120px;
  padding: 12px;
  border-radius: 8px;
  cursor: pointer;
  text-align: center;
  transition: transform 0.2s, box-shadow 0.2s;
  user-select: none;
}

.cat-card:hover { transform: scale(1.03); }
.cat-card.active { box-shadow: 0 0 0 2px var(--vp-c-brand); transform: scale(1.05); }

.cat-card.create { background: #dbeafe; color: #1e40af; }
.cat-card.structure { background: #d1fae5; color: #065f46; }
.cat-card.behavior { background: #fef3c7; color: #92400e; }

:root.dark .cat-card.create { background: #172554; color: #93c5fd; }
:root.dark .cat-card.structure { background: #022c22; color: #6ee7b7; }
:root.dark .cat-card.behavior { background: #451a03; color: #fcd34d; }

.cat-icon { display: block; font-size: 1.5rem; margin-bottom: 4px; }
.cat-name { display: block; font-weight: 600; font-size: 0.9rem; }
.cat-count { display: block; font-size: 0.72rem; opacity: 0.7; }

.patterns-list { display: flex; flex-direction: column; gap: 8px; }

.pattern-item {
  border-radius: 6px;
  padding: 10px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
}

.pattern-header {
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  font-size: 0.9rem;
}

.toggle { font-size: 0.7rem; color: var(--vp-c-text-3); }
.pattern-intent { font-size: 0.82rem; color: var(--vp-c-text-2); margin-top: 4px; }

.pattern-detail { margin-top: 8px; }
.detail-label { font-size: 0.75rem; font-weight: 600; color: var(--vp-c-text-3); margin-top: 6px; }
.detail-text { font-size: 0.82rem; color: var(--vp-c-text-2); }

.pattern-detail pre {
  margin: 4px 0 0;
  padding: 8px;
  background: var(--vp-c-bg-soft);
  border-radius: 4px;
  font-size: 0.78rem;
  line-height: 1.5;
  overflow-x: auto;
}

.fade-enter-active, .fade-leave-active { transition: opacity 0.25s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
