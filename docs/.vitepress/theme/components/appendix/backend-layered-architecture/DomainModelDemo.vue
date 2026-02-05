<template>
  <div class="domain-model-demo">
    <div class="demo-header">
      <h4>📦 Domain 层：领域模型设计</h4>
      <p class="subtitle">Domain 是业务概念的载体，所有层的依赖基础</p>
    </div>

    <!-- 领域模型对比 -->
    <div class="model-comparison">
      <div class="comparison-tabs">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          :class="['tab-btn', { active: currentTab === tab.id }]"
          @click="currentTab = tab.id"
        >
          {{ tab.name }}
        </button>
      </div>

      <div class="comparison-content">
        <!-- 贫血模型 vs 充血模型 -->
        <div v-if="currentTab === 'comparison'" class="tab-panel">
          <div class="model-cards">
            <div class="model-card anemic">
              <div class="card-header">
                <span class="card-icon">📄</span>
                <span class="card-title">贫血模型 (Anemic)</span>
                <span class="card-badge">传统做法</span>
              </div>
              <div class="card-content">
                <div class="code-section">
                  <div class="code-label">Entity（只有 getter/setter）</div>
                  <pre><code>@Entity
public class Order {
    @Id
    private Long id;
    private Long userId;
    private BigDecimal totalAmount;
    private OrderStatus status;
    private LocalDateTime createdAt;

    // 只有 getter/setter，没有业务逻辑
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    // ... 其他 getter/setter
}</code></pre>
                </div>

                <div class="code-section">
                  <div class="code-label">Service（所有业务逻辑都在这里）</div>
                  <pre><code>@Service
public class OrderService {

    public void cancelOrder(Long orderId) {
        Order order = orderRepository.findById(orderId)
            .orElseThrow();

        // 贫血模型：业务逻辑散落在 Service 里
        if (order.getStatus() == OrderStatus.SHIPPED) {
            throw new IllegalStateException("已发货订单不能取消");
        }
        if (order.getStatus() == OrderStatus.CANCELLED) {
            throw new IllegalStateException("订单已取消");
        }

        // 修改状态
        order.setStatus(OrderStatus.CANCELLED);
        orderRepository.save(order);
    }
}</code></pre>
                </div>

                <div class="problems">
                  <div class="problem-title">😫 贫血模型的问题</div>
                  <ul>
                    <li><strong>违背面向对象</strong>：对象只有数据没有行为，变成了 "数据结构"</li>
                    <li><strong>逻辑分散</strong>：同样的业务规则可能在多个 Service 重复</li>
                    <li><strong>难以维护</strong>：改一个规则要找所有用到的地方</li>
                  </ul>
                </div>
              </div>
            </div>

            <div class="model-card rich">
              <div class="card-header">
                <span class="card-icon">🧠</span>
                <span class="card-title">充血模型 (Rich Domain)</span>
                <span class="card-badge tag-green">推荐做法</span>
              </div>
              <div class="card-content">
                <div class="code-section">
                  <div class="code-label">Entity（包含业务逻辑）</div>
                  <pre><code>@Entity
public class Order {
    @Id
    private Long id;
    private Long userId;
    private BigDecimal totalAmount;
    private OrderStatus status;
    private LocalDateTime createdAt;

    // 🎯 业务行为封装在实体里

    /**
     * 取消订单
     */
    public void cancel() {
        // 状态校验内聚在方法里
        if (this.status == OrderStatus.SHIPPED) {
            throw new IllegalStateException("已发货订单不能取消");
        }
        if (this.status == OrderStatus.CANCELLED) {
            throw new IllegalStateException("订单已取消");
        }

        this.status = OrderStatus.CANCELLED;
        // 可以触发领域事件
        registerEvent(new OrderCancelledEvent(this.id));
    }

    /**
     * 支付订单
     */
    public void pay(Payment payment) {
        if (this.status != OrderStatus.PENDING_PAYMENT) {
            throw new IllegalStateException("订单状态不正确");
        }
        if (!payment.getAmount().equals(this.totalAmount)) {
            throw new IllegalArgumentException("支付金额不匹配");
        }

        this.status = OrderStatus.PAID;
        this.paymentTime = LocalDateTime.now();
    }

    // ... 其他业务方法
}</code></pre>
                </div>

                <div class="code-section">
                  <div class="code-label">Service（只做协调，不做业务判断）</div>
                  <pre><code>@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;
    private final DomainEventPublisher eventPublisher;

    @Transactional
    public void cancelOrder(Long orderId) {
        // 1. 加载聚合根
        Order order = orderRepository.findById(orderId)
            .orElseThrow(() -> new OrderNotFoundException(orderId));

        // 2. 💡 调用领域对象的业务方法
        // 业务规则封装在 Order 里，Service 只做协调
        order.cancel();

        // 3. 保存变更
        orderRepository.save(order);

        // 4. 发布领域事件
        order.getDomainEvents().forEach(eventPublisher::publish);
        order.clearDomainEvents();
    }
}</code></pre>
                </div>

                <div class="benefits">
                  <div class="benefit-title">😊 充血模型的优势</div>
                  <ul>
                    <li><strong>符合面向对象</strong>：数据和行为封装在一起，是真正的 "对象"</li>
                    <li><strong>业务内聚</strong>：规则跟着对象走，改一处处处生效</li>
                    <li><strong>可复用可测试</strong>：领域对象是纯内存对象，单元测试不需要数据库</li>
                    <li><strong>表达力强</strong>：order.cancel() 比 orderService.cancel(order) 更自然</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 值对象 -->
        <div v-else-if="currentTab === 'valueobject'" class="tab-panel">
          <div class="value-object-content">
            <div class="concept-intro">
              <h5>💎 什么是值对象（Value Object）？</h5>
              <p>值对象是没有唯一标识、不可变的对象，它描述了某种特征或属性。两个值对象如果所有属性相等，就被认为是同一个对象。</p>
            </div>

            <div class="vo-examples">
              <div class="example-card">
                <div class="example-title">📍 地址 Address</div>
                <pre><code>// 值对象：不可变、无 ID
public record Address(
    String province,    // 省
    String city,        // 市
    String district,    // 区
    String street,      // 街道
    String zipCode      // 邮编
) {
    // 值对象的方法通常是转换或计算
    public String toDisplayString() {
        return String.format("%s%s%s%s",
            province, city, district, street);
    }

    // 校验逻辑
    public boolean isValid() {
        return StringUtils.isNotBlank(province)
            && StringUtils.isNotBlank(city);
    }
}

// 使用：地址相等只要属性相同
Address addr1 = new Address("广东", "深圳", "南山", "科技园", "518000");
Address addr2 = new Address("广东", "深圳", "南山", "科技园", "518000");

System.out.println(addr1.equals(addr2)); // true - 值对象比较的是值</code></pre>
              </div>

              <div class="example-card">
                <div class="example-title">💰 金钱 Money</div>
                <pre><code>// 金钱是经典的值对象
public record Money(
    BigDecimal amount,
    Currency currency
) {

    // 工厂方法
    public static Money of(BigDecimal amount, String currencyCode) {
        return new Money(amount, Currency.getInstance(currencyCode));
    }

    public static Money yuan(BigDecimal amount) {
        return new Money(amount, Currency.getInstance("CNY"));
    }

    // 值对象的核心：运算返回新的值对象
    public Money add(Money other) {
        if (!this.currency.equals(other.currency)) {
            throw new IllegalArgumentException("Cannot add different currencies");
        }
        return new Money(this.amount.add(other.amount), this.currency);
    }

    public Money multiply(int factor) {
        return new Money(this.amount.multiply(BigDecimal.valueOf(factor)), currency);
    }

    public boolean isGreaterThan(Money other) {
        return this.amount.compareTo(other.amount) > 0;
    }

    // 格式化显示
    public String toDisplayString() {
        return currency.getSymbol() + amount.setScale(2, RoundingMode.HALF_UP);
    }
}

// 使用示例
Money price = Money.yuan(new BigDecimal("199.99"));
Money shipping = Money.yuan(new BigDecimal("10.00"));
Money discount = Money.yuan(new BigDecimal("20.00"));

Money total = price.add(shipping).add(discount.negate());
System.out.println(total.toDisplayString()); // ¥189.99</code></pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const currentTab = ref('comparison')

const tabs = [
  { id: 'comparison', name: '贫血 vs 充血' },
  { id: 'valueobject', name: '值对象设计' }
]
</script>

<style scoped>
.domain-model-demo {
  padding: 24px;
  background: linear-gradient(135deg, #f0f7ff 0%, #e6f0ff 100%);
  border-radius: 12px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.demo-header {
  text-align: center;
  margin-bottom: 24px;
}

.demo-header h4 {
  margin: 0 0 8px 0;
  color: #1a1a2e;
  font-size: 18px;
}

.subtitle {
  margin: 0;
  color: #666;
  font-size: 13px;
}

.model-comparison {
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
}

.comparison-tabs {
  display: flex;
  background: #f5f7fa;
  border-bottom: 1px solid #e4e7ed;
}

.tab-btn {
  padding: 12px 24px;
  border: none;
  background: transparent;
  color: #606266;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
}

.tab-btn:hover {
  color: #409eff;
}

.tab-btn.active {
  color: #409eff;
  background: white;
  font-weight: 500;
}

.tab-btn.active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: #409eff;
}

.comparison-content {
  padding: 20px;
}

.tab-panel {
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.model-cards {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.model-card {
  background: #f8f9fa;
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid #e4e7ed;
}

.model-card.anemic {
  border-left: 4px solid #ff4d4f;
}

.model-card.rich {
  border-left: 4px solid #52c41a;
}

.card-header {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  background: white;
  border-bottom: 1px solid #e4e7ed;
}

.card-icon {
  font-size: 20px;
}

.card-title {
  font-weight: 600;
  color: #303133;
  font-size: 14px;
}

.card-badge {
  margin-left: auto;
  padding: 2px 8px;
  background: #ff4d4f;
  color: white;
  border-radius: 10px;
  font-size: 11px;
}

.card-badge.tag-green {
  background: #52c41a;
}

.card-content {
  padding: 16px;
}

.code-section {
  margin-bottom: 16px;
}

.code-label {
  font-size: 11px;
  color: #909399;
  margin-bottom: 6px;
  font-weight: 500;
}

.code-section pre {
  background: #2d2d2d;
  padding: 12px;
  border-radius: 6px;
  overflow-x: auto;
  margin: 0;
}

.code-section code {
  color: #f8f8f2;
  font-family: 'Monaco', 'Menlo', monospace;
  font-size: 10px;
  line-height: 1.5;
}

.problems, .benefits {
  padding: 12px;
  border-radius: 6px;
  margin-top: 12px;
}

.problems {
  background: #fff1f0;
  border-left: 3px solid #ff4d4f;
}

.benefits {
  background: #f6ffed;
  border-left: 3px solid #52c41a;
}

.problem-title, .benefit-title {
  font-weight: 600;
  font-size: 13px;
  margin-bottom: 8px;
}

.problem-title {
  color: #cf1322;
}

.benefit-title {
  color: #389e0d;
}

.problems ul, .benefits ul {
  margin: 0;
  padding-left: 16px;
}

.problems li, .benefits li {
  margin: 6px 0;
  font-size: 12px;
  line-height: 1.5;
  color: #595959;
}

@media (max-width: 1024px) {
  .model-cards {
    grid-template-columns: 1fr;
  }
}
</style>
