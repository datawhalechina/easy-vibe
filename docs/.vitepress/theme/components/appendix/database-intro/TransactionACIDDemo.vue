<template>
  <div class="acid-demo">
    <div class="demo-header">
      <span class="icon">🔒</span>
      <span class="title">事务 ACID 特性演示</span>
      <span class="subtitle">理解事务如何保证数据安全</span>
    </div>

    <div class="intro-text">
      想象<span class="highlight">银行转账</span>：A 转给 B 100 元。这个操作包含两步：从 A 扣 100，给 B 加 100。如果只扣了钱但没到账，就是灾难。事务保证这两步<span class="highlight">要么全成功，要么全失败</span>。
    </div>

    <div class="acid-cards">
      <div
        v-for="item in acidItems"
        :key="item.key"
        class="acid-card"
        :class="{ active: activeItem === item.key }"
        @click="activeItem = activeItem === item.key ? null : item.key"
      >
        <div class="card-icon">{{ item.icon }}</div>
        <div class="card-letter">{{ item.letter }}</div>
        <div class="card-name">{{ item.name }}</div>
        <div class="card-meaning">{{ item.meaning }}</div>
      </div>
    </div>

    <Transition name="fade">
      <div v-if="activeItem" class="detail-panel">
        <div class="detail-header">
          <span class="detail-icon">{{ currentItem?.icon }}</span>
          <span class="detail-title">{{ currentItem?.name }} ({{ currentItem?.letter }})</span>
        </div>
        <div class="detail-content">
          <div class="explanation">
            <strong>含义：</strong>{{ currentItem?.explanation }}
          </div>
          <div class="example">
            <div class="example-label">🌰 银行转账例子：</div>
            <div class="example-text">{{ currentItem?.example }}</div>
          </div>
        </div>
      </div>
    </Transition>

    <div v-if="!activeItem" class="hint-text">
      👆 点击上方任意特性，查看详细解释
    </div>

    <div class="scenario-box">
      <div class="scenario-title">🎯 12306 抢票场景</div>
      <div class="scenario-content">
        <p><strong>场景：</strong>用户 A 和 B 同时看到还剩 1 张票，同时点击购买。</p>
        <p><strong>没有事务：</strong>A 扣库存，B 也扣库存，同一张票卖给了两个人！</p>
        <p><strong>有事务（隔离性）：</strong>A 的操作加锁，B 必须等待。A 买完后，库存变为 0，B 看到的是"已售罄"。</p>
      </div>
    </div>

    <div class="info-box">
      <span class="icon">💡</span>
      <strong>核心思想：</strong>ACID 四个特性共同保证了数据在高并发环境下的<span class="highlight">不丢、不乱、不冲突</span>。这就是为什么所有涉及资金、订单的系统都必须使用数据库事务。
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const activeItem = ref(null)

const acidItems = ref([
  {
    key: 'atomicity',
    letter: 'A',
    icon: '⚛️',
    name: '原子性',
    meaning: 'Atomicity',
    explanation: '事务中的操作要么全部成功，要么全部失败，不会出现"做了一半"的情况。',
    example: '转账时，扣款和入账必须同时成功。如果扣款成功但入账失败，系统会自动回滚，把钱退回去。'
  },
  {
    key: 'consistency',
    letter: 'C',
    icon: '⚖️',
    name: '一致性',
    meaning: 'Consistency',
    explanation: '事务执行前后，数据都必须处于合法状态，满足所有约束条件。',
    example: '转账前后，A 和 B 的余额总和必须不变。票卖完了，库存必须是 0，不能是负数。'
  },
  {
    key: 'isolation',
    letter: 'I',
    icon: '🔒',
    name: '隔离性',
    meaning: 'Isolation',
    explanation: '多个事务同时执行时，互不干扰，每个事务都感觉不到其他事务的存在。',
    example: 'A 在买票时，B 看到的结果应该是"已售罄"或"还剩 1 张"，不会看到 A 买了一半的中间状态（比如库存变成了 0.5）。'
  },
  {
    key: 'durability',
    letter: 'D',
    icon: '💾',
    name: '持久性',
    meaning: 'Durability',
    explanation: '事务一旦提交，结果就会永久保存，即使断电、宕机也不会丢失。',
    example: '订单成功后，即使服务器立刻断电，已售出的票记录也不会消失。重启服务器后，数据依然在。'
  }
])

const currentItem = computed(() => {
  return acidItems.value.find(item => item.key === activeItem.value)
})
</script>

<style scoped>
.acid-demo {
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

.acid-cards {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.75rem;
  margin-bottom: 1rem;
}

@media (max-width: 768px) {
  .acid-cards {
    grid-template-columns: repeat(2, 1fr);
  }
}

.acid-card {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 0.75rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s;
}

.acid-card:hover {
  background: var(--vp-c-bg-soft);
}

.acid-card.active {
  background: var(--vp-c-brand-soft);
  border-color: var(--vp-c-brand);
}

.card-icon {
  font-size: 1.5rem;
  margin-bottom: 0.25rem;
}

.card-letter {
  font-size: 1.25rem;
  font-weight: bold;
  color: var(--vp-c-brand-1);
  margin-bottom: 0.25rem;
}

.card-name {
  font-size: 0.85rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.card-meaning {
  font-size: 0.7rem;
  color: var(--vp-c-text-3);
  font-family: monospace;
}

.detail-panel {
  background: var(--vp-c-bg);
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 0.75rem;
  border: 1px solid var(--vp-c-divider);
}

.detail-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.detail-icon {
  font-size: 1.5rem;
}

.detail-title {
  font-weight: 600;
  font-size: 1rem;
  color: var(--vp-c-text-1);
}

.detail-content {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.explanation {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  line-height: 1.5;
}

.example {
  background: var(--vp-c-bg-soft);
  padding: 0.75rem;
  border-radius: 6px;
  border-left: 3px solid var(--vp-c-brand);
}

.example-label {
  font-size: 0.8rem;
  font-weight: 500;
  color: var(--vp-c-text-2);
  margin-bottom: 0.5rem;
}

.example-text {
  font-size: 0.85rem;
  color: var(--vp-c-text-1);
  line-height: 1.5;
}

.hint-text {
  text-align: center;
  font-size: 0.85rem;
  color: var(--vp-c-text-3);
  margin-bottom: 0.75rem;
}

.scenario-box {
  background: rgba(34, 197, 94, 0.05);
  border: 1px solid rgba(34, 197, 94, 0.2);
  border-radius: 6px;
  padding: 0.75rem;
  margin-bottom: 0.75rem;
}

.scenario-title {
  font-size: 0.85rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: var(--vp-c-text-1);
}

.scenario-content p {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  margin: 0.25rem 0;
  line-height: 1.5;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.info-box {
  background: var(--vp-c-bg-alt);
  padding: 0.75rem;
  border-radius: 6px;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  line-height: 1.5;
}

.info-box .icon { margin-right: 0.25rem; }

.info-box .highlight {
  color: var(--vp-c-brand-1);
  font-weight: 500;
}
</style>
