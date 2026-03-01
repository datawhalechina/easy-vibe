<template>
  <div class="repo-demo">
    <div class="header">
      <div class="title">Repository 层：数据的"仓库管理员"</div>
      <div class="subtitle">Repository 封装数据访问逻辑，让上层无需关心数据库细节</div>
    </div>

    <div class="toggle-group">
      <button :class="['toggle', { active: view === 'bad' }]" @click="view = 'bad'">糟糕的做法</button>
      <button :class="['toggle', { active: view === 'good' }]" @click="view = 'good'">优雅的做法</button>
    </div>

    <div :class="['panel', view]">
      <div class="panel-head">
        <span class="panel-title">{{ view === 'bad' ? '在 Service 里直接写 SQL' : '使用 Repository 封装数据访问' }}</span>
        <span class="panel-badge">{{ view === 'bad' ? '耦合严重' : '清晰解耦' }}</span>
      </div>

      <pre class="code-block"><code>{{ view === 'bad' ? badCode : goodCode }}</code></pre>

      <div :class="['result-box', view]">
        <strong>{{ view === 'bad' ? '这种做法的问题' : '这样做的好处' }}</strong>
        <ul>
          <li v-for="item in (view === 'bad' ? problems : benefits)" :key="item">{{ item }}</li>
        </ul>
      </div>
    </div>

    <div class="compare-table">
      <div class="table-title">不同 Repository 实现方式对比</div>
      <table>
        <thead>
          <tr><th>实现方式</th><th>优点</th><th>缺点</th><th>适用场景</th></tr>
        </thead>
        <tbody>
          <tr v-for="r in repos" :key="r.name">
            <td><strong>{{ r.name }}</strong><br><span class="tag" :class="r.tagClass">{{ r.tag }}</span></td>
            <td>{{ r.pros }}</td>
            <td>{{ r.cons }}</td>
            <td>{{ r.scene }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const view = ref('good')

const badCode = `@Service
public class OrderService {
    @Autowired private JdbcTemplate jdbcTemplate;

    public List<Order> getUserOrders(Long userId) {
        // ❌ SQL 硬编码在 Service 里
        // ❌ 更换数据库需要改业务代码
        // ❌ 无法单元测试，必须连真实数据库
        String sql = "SELECT * FROM orders WHERE user_id = ? AND deleted = 0";
        return jdbcTemplate.query(sql, (rs, rowNum) -> {
            Order order = new Order();
            order.setId(rs.getLong("id"));
            order.setUserId(rs.getLong("user_id"));
            return order;
        }, userId);
    }
}`

const goodCode = `// Repository 接口定义
@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    // ✅ 自动生成查询
    List<Order> findByUserIdAndDeletedFalse(Long userId);

    // ✅ 自定义 JPQL
    @Query("SELECT o FROM Order o WHERE o.createdAt BETWEEN :start AND :end")
    List<Order> findByDateRange(@Param("start") LocalDateTime start,
                                @Param("end") LocalDateTime end);
}

// Service 层（纯业务逻辑）
@Service
public class OrderService {
    @Autowired private OrderRepository orderRepository; // ✅ 依赖接口

    public List<OrderDTO> getUserOrders(Long userId) {
        List<Order> orders = orderRepository.findByUserIdAndDeletedFalse(userId);
        return orders.stream().map(OrderDTO::from).collect(Collectors.toList());
    }
}`

const problems = [
  '数据库耦合：业务代码里到处都是 SQL，换数据库等于重写',
  '难以测试：必须连真实数据库，单元测试变成集成测试',
  '代码重复：同样的查询条件在每个方法里重复写',
  '安全隐患：手写 SQL 容易漏掉防注入处理'
]

const benefits = [
  '关注点分离：Service 专注业务，Repository 专注数据',
  '可测试性高：单元测试可用 Mock 替代真实数据库',
  '代码复用：通用查询方法定义一次，到处复用',
  '切换成本低：换数据库只需改 Repository 实现'
]

const repos = [
  { name: 'Spring Data JPA', tag: '主流方案', tagClass: '', pros: '方法名自动推导、分页内置', cons: '复杂查询性能一般', scene: '快速开发、标准 CRUD' },
  { name: 'MyBatis / MyBatis-Plus', tag: '国内主流', tagClass: 'blue', pros: 'SQL 完全可控、动态 SQL 强大', cons: '需要手写 SQL', scene: '复杂查询、性能敏感' },
  { name: 'Spring Data JDBC', tag: '轻量', tagClass: 'green', pros: '简单轻量、启动快速', cons: '无复杂映射', scene: '微服务、简单聚合根' }
]
</script>

<style scoped>
.repo-demo { padding: 20px; background: var(--vp-c-bg-soft); border-radius: 12px; }
.header { text-align: center; margin-bottom: 20px; }
.title { font-size: 16px; font-weight: 600; color: var(--vp-c-text-1); }
.subtitle { font-size: 13px; color: var(--vp-c-text-3); margin-top: 4px; }

.toggle-group { display: flex; gap: 8px; justify-content: center; margin-bottom: 16px; }
.toggle {
  padding: 8px 18px; border: 2px solid var(--vp-c-divider); background: var(--vp-c-bg);
  border-radius: 6px; cursor: pointer; font-size: 13px; font-weight: 500;
  color: var(--vp-c-text-2); transition: all .2s;
}
.toggle:hover { border-color: var(--vp-c-brand-1); color: var(--vp-c-brand-1); }
.toggle.active { background: var(--vp-c-brand-1); border-color: var(--vp-c-brand-1); color: #fff; }

.panel {
  padding: 18px; border-radius: 10px; margin-bottom: 16px;
  background: var(--vp-c-bg); border: 1px solid var(--vp-c-divider);
}
.panel.bad { border-left: 3px solid var(--vp-c-danger-1); }
.panel.good { border-left: 3px solid var(--vp-c-green-1); }

.panel-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px; padding-bottom: 10px; border-bottom: 1px solid var(--vp-c-divider); }
.panel-title { font-weight: 600; font-size: 14px; color: var(--vp-c-text-1); }
.panel-badge { padding: 3px 10px; border-radius: 10px; font-size: 11px; color: #fff; }
.panel.bad .panel-badge { background: var(--vp-c-danger-1); }
.panel.good .panel-badge { background: var(--vp-c-green-1); }

.code-block {
  margin: 0 0 14px; padding: 14px; border-radius: 6px; overflow-x: auto;
  background: var(--vp-code-block-bg); font-size: 11px; line-height: 1.6;
}
.code-block code { color: var(--vp-c-text-1); font-family: var(--vp-font-family-mono); }

.result-box { padding: 12px; border-radius: 6px; font-size: 12px; line-height: 1.6; }
.result-box.bad { background: var(--vp-c-danger-soft); border-left: 3px solid var(--vp-c-danger-1); }
.result-box.good { background: var(--vp-c-green-soft); border-left: 3px solid var(--vp-c-green-1); }
.result-box strong { font-size: 13px; color: var(--vp-c-text-1); }
.result-box ul { margin: 6px 0 0; padding-left: 18px; }
.result-box li { margin: 4px 0; color: var(--vp-c-text-2); }

.compare-table {
  padding: 16px; border-radius: 10px;
  background: var(--vp-c-bg); border: 1px solid var(--vp-c-divider);
}
.table-title { text-align: center; font-weight: 600; font-size: 14px; color: var(--vp-c-text-1); margin-bottom: 12px; }
table { width: 100%; border-collapse: collapse; font-size: 12px; }
th, td { padding: 10px; text-align: left; border-bottom: 1px solid var(--vp-c-divider); color: var(--vp-c-text-2); }
th { background: var(--vp-c-bg-soft); font-weight: 600; color: var(--vp-c-text-1); }
.tag { display: inline-block; padding: 1px 6px; border-radius: 4px; font-size: 10px; color: #fff; background: #f59e0b; margin-top: 4px; }
.tag.blue { background: #3b82f6; }
.tag.green { background: #10b981; }

@media (max-width: 768px) {
  .toggle-group { flex-direction: column; }
  .toggle { width: 100%; }
}
</style>
