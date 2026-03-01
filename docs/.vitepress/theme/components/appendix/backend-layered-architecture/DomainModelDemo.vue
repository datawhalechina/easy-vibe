<template>
  <div class="domain-demo">
    <div class="header">
      <div class="title">Domain 层：领域模型设计</div>
      <div class="subtitle">Domain 是业务概念的载体，所有层的依赖基础</div>
    </div>

    <div class="tabs">
      <button
        v-for="t in tabs" :key="t.id"
        :class="['tab', { active: current === t.id }]"
        @click="current = t.id"
      >{{ t.name }}</button>
    </div>

    <div v-if="current === 'comparison'" class="cards">
      <div class="card bad">
        <div class="card-head">
          <span class="card-title">贫血模型 (Anemic)</span>
          <span class="card-badge bad">传统做法</span>
        </div>
        <pre class="code"><code>{{ anemicEntity }}</code></pre>
        <pre class="code"><code>{{ anemicService }}</code></pre>
        <div class="result-box bad">
          <strong>贫血模型的问题</strong>
          <ul>
            <li>违背面向对象：对象只有数据没有行为</li>
            <li>逻辑分散：同样的规则可能在多个 Service 重复</li>
            <li>难以维护：改一个规则要找所有用到的地方</li>
          </ul>
        </div>
      </div>

      <div class="card good">
        <div class="card-head">
          <span class="card-title">充血模型 (Rich Domain)</span>
          <span class="card-badge good">推荐做法</span>
        </div>
        <pre class="code"><code>{{ richEntity }}</code></pre>
        <pre class="code"><code>{{ richService }}</code></pre>
        <div class="result-box good">
          <strong>充血模型的优势</strong>
          <ul>
            <li>符合面向对象：数据和行为封装在一起</li>
            <li>业务内聚：规则跟着对象走，改一处处处生效</li>
            <li>可测试：领域对象是纯内存对象，不需要数据库</li>
            <li>表达力强：order.cancel() 比 orderService.cancel(order) 更自然</li>
          </ul>
        </div>
      </div>
    </div>

    <div v-else class="vo-section">
      <div class="vo-intro">
        <strong>什么是值对象（Value Object）？</strong>
        <p>没有唯一标识、不可变的对象，描述某种特征或属性。两个值对象所有属性相等就被认为是同一个。</p>
      </div>
      <div class="vo-examples">
        <div class="vo-card">
          <div class="vo-name">地址 Address</div>
          <pre class="code"><code>{{ addressVO }}</code></pre>
        </div>
        <div class="vo-card">
          <div class="vo-name">金钱 Money</div>
          <pre class="code"><code>{{ moneyVO }}</code></pre>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const current = ref('comparison')
const tabs = [
  { id: 'comparison', name: '贫血 vs 充血' },
  { id: 'valueobject', name: '值对象设计' }
]

const anemicEntity = `@Entity
public class Order {
    @Id private Long id;
    private BigDecimal totalAmount;
    private OrderStatus status;
    // 只有 getter/setter，没有业务逻辑
    public Long getId() { return id; }
    public void setStatus(OrderStatus s) { this.status = s; }
}`

const anemicService = `@Service
public class OrderService {
    public void cancelOrder(Long orderId) {
        Order order = orderRepository.findById(orderId).orElseThrow();
        // 贫血模型：业务逻辑散落在 Service 里
        if (order.getStatus() == OrderStatus.SHIPPED)
            throw new IllegalStateException("已发货不能取消");
        order.setStatus(OrderStatus.CANCELLED);
        orderRepository.save(order);
    }
}`

const richEntity = `@Entity
public class Order {
    @Id private Long id;
    private BigDecimal totalAmount;
    private OrderStatus status;

    // 业务行为封装在实体里
    public void cancel() {
        if (this.status == OrderStatus.SHIPPED)
            throw new IllegalStateException("已发货不能取消");
        this.status = OrderStatus.CANCELLED;
        registerEvent(new OrderCancelledEvent(this.id));
    }

    public void pay(Payment payment) {
        if (this.status != OrderStatus.PENDING_PAYMENT)
            throw new IllegalStateException("状态不正确");
        this.status = OrderStatus.PAID;
    }
}`

const richService = `@Service
public class OrderService {
    @Transactional
    public void cancelOrder(Long orderId) {
        Order order = orderRepository.findById(orderId).orElseThrow();
        order.cancel(); // 调用领域对象的业务方法
        orderRepository.save(order);
    }
}`

const addressVO = `// 值对象：不可变、无 ID
public record Address(String province, String city, String district, String street) {
    public String toDisplayString() {
        return String.format("%s%s%s%s", province, city, district, street);
    }
}
// 地址相等只要属性相同
Address a1 = new Address("广东", "深圳", "南山", "科技园");
Address a2 = new Address("广东", "深圳", "南山", "科技园");
a1.equals(a2); // true`

const moneyVO = `public record Money(BigDecimal amount, Currency currency) {
    public static Money yuan(BigDecimal amount) {
        return new Money(amount, Currency.getInstance("CNY"));
    }
    // 运算返回新的值对象（不可变）
    public Money add(Money other) {
        if (!this.currency.equals(other.currency))
            throw new IllegalArgumentException("Cannot add different currencies");
        return new Money(this.amount.add(other.amount), this.currency);
    }
}
Money price = Money.yuan(new BigDecimal("199.99"));
Money shipping = Money.yuan(new BigDecimal("10.00"));
Money total = price.add(shipping); // ¥209.99`
</script>

<style scoped>
.domain-demo { padding: 20px; background: var(--vp-c-bg-soft); border-radius: 12px; }
.header { text-align: center; margin-bottom: 20px; }
.title { font-size: 16px; font-weight: 600; color: var(--vp-c-text-1); }
.subtitle { font-size: 13px; color: var(--vp-c-text-3); margin-top: 4px; }

.tabs { display: flex; gap: 8px; margin-bottom: 16px; }
.tab {
  padding: 7px 16px; border: 1px solid var(--vp-c-divider); background: var(--vp-c-bg);
  border-radius: 6px; cursor: pointer; font-size: 13px; color: var(--vp-c-text-2); transition: all .2s;
}
.tab:hover { color: var(--vp-c-brand-1); border-color: var(--vp-c-brand-1); }
.tab.active { background: var(--vp-c-brand-1); border-color: var(--vp-c-brand-1); color: #fff; }

.cards { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.card {
  padding: 16px; border-radius: 10px;
  background: var(--vp-c-bg); border: 1px solid var(--vp-c-divider);
}
.card.bad { border-left: 3px solid var(--vp-c-danger-1); }
.card.good { border-left: 3px solid var(--vp-c-green-1); }

.card-head { display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px; }
.card-title { font-weight: 600; font-size: 14px; color: var(--vp-c-text-1); }
.card-badge { padding: 2px 8px; border-radius: 10px; font-size: 11px; color: #fff; }
.card-badge.bad { background: var(--vp-c-danger-1); }
.card-badge.good { background: var(--vp-c-green-1); }

.code {
  margin: 0 0 12px; padding: 10px; border-radius: 6px; overflow-x: auto;
  background: var(--vp-code-block-bg); font-size: 10px; line-height: 1.5;
}
.code code { color: var(--vp-c-text-1); font-family: var(--vp-font-family-mono); }

.result-box { padding: 10px; border-radius: 6px; font-size: 12px; line-height: 1.5; }
.result-box.bad { background: var(--vp-c-danger-soft); border-left: 3px solid var(--vp-c-danger-1); }
.result-box.good { background: var(--vp-c-green-soft); border-left: 3px solid var(--vp-c-green-1); }
.result-box strong { font-size: 12px; color: var(--vp-c-text-1); }
.result-box ul { margin: 6px 0 0; padding-left: 16px; }
.result-box li { margin: 3px 0; color: var(--vp-c-text-2); }

.vo-section { background: var(--vp-c-bg); border-radius: 10px; padding: 18px; border: 1px solid var(--vp-c-divider); }
.vo-intro { margin-bottom: 16px; font-size: 13px; color: var(--vp-c-text-2); line-height: 1.6; }
.vo-intro strong { color: var(--vp-c-text-1); }
.vo-intro p { margin: 6px 0 0; }
.vo-examples { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
.vo-card { background: var(--vp-c-bg-soft); border-radius: 8px; padding: 14px; }
.vo-name { font-weight: 600; font-size: 13px; color: var(--vp-c-text-1); margin-bottom: 8px; }

@media (max-width: 1024px) {
  .cards, .vo-examples { grid-template-columns: 1fr; }
}
</style>
