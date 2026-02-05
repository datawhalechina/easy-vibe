<template>
  <div class="repository-layer-demo">
    <div class="demo-header">
      <h4>🗄️ Repository 层：数据的"仓库管理员"</h4>
      <p class="subtitle">Repository 封装数据访问逻辑，让上层无需关心数据库细节</p>
    </div>

    <!-- 对比演示 -->
    <div class="comparison-section">
      <div class="comparison-header">
        <div class="toggle-group">
          <button
            :class="['toggle-btn', { active: viewMode === 'bad' }]"
            @click="viewMode = 'bad'"
          >
            ❌ 糟糕的做法
          </button>
          <button
            :class="['toggle-btn', { active: viewMode === 'good' }]"
            @click="viewMode = 'good'"
          >
            ✅ 优雅的做法
          </button>
        </div>
      </div>

      <div class="comparison-content">
        <!-- 糟糕的做法 -->
        <div v-if="viewMode === 'bad'" class="code-panel bad">
          <div class="panel-header">
            <span class="panel-title">😫 在 Service 里直接写 SQL</span>
            <span class="panel-badge">耦合严重</span>
          </div>

          <pre class="code-block"><code>@Service
public class OrderService {

    @Autowired
    private JdbcTemplate jdbcTemplate;  // 直接依赖底层 JDBC

    public List&lt;Order&gt; getUserOrders(Long userId) {
        // ❌ 问题1：SQL 硬编码在 Service 里
        // ❌ 问题2：更换数据库需要改业务代码
        // ❌ 问题3：无法单元测试，必须连真实数据库
        String sql = "SELECT * FROM orders WHERE user_id = ? AND deleted = 0";

        return jdbcTemplate.query(sql, (rs, rowNum) -> {
            Order order = new Order();
            order.setId(rs.getLong("id"));
            order.setUserId(rs.getLong("user_id"));
            order.setTotalAmount(rs.getBigDecimal("total_amount"));
            // ... 更多字段映射
            return order;
        }, userId);
    }

    public void updateOrderStatus(Long orderId, OrderStatus status) {
        // ❌ 问题4：到处重复 SQL 片段
        String sql = "UPDATE orders SET status = ?, updated_at = NOW() WHERE id = ?";
        jdbcTemplate.update(sql, status.name(), orderId);
    }
}
</code></pre>


          <div class="problems-list">
            <h5>😰 这种做法的问题</h5>
            <ul>
              <li><strong>数据库耦合</strong>：业务代码里到处都是 SQL，换数据库等于重写</li>
              <li><strong>难以测试</strong>：Service 必须连真实数据库才能跑，单元测试变成集成测试</li>
              <li><strong>代码重复</strong>：同样的查询条件（如 deleted=0）在每个方法里重复写</li>
              <li><strong>安全隐患</strong>：手写 SQL 容易漏掉防注入处理</li>
            </ul>
          </div>
        </div>

        <!-- 优雅的做法 -->
        <div v-else class="code-panel good">
          <div class="panel-header">
            <span class="panel-title">😊 使用 Repository 封装数据访问</span>
            <span class="panel-badge">清晰解耦</span>
          </div>


          <pre class="code-block"><code>// ========== 1. 实体定义（Domain） ==========
@Entity
@Table(name = "orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id", nullable = false)
    private Long userId;

    @Column(name = "total_amount")
    private BigDecimal totalAmount;

    @Enumerated(EnumType.STRING)
    private OrderStatus status;

    @Column(name = "deleted")
    private Boolean deleted = false;

    // getters and setters...
}

// ========== 2. Repository 接口定义 ==========
@Repository
public interface OrderRepository extends JpaRepository&lt;Order, Long&gt; {

    // ✅ Spring Data 自动生成查询 - 简单查询
    List&lt;Order&gt; findByUserIdAndDeletedFalse(Long userId);

    // ✅ 自定义 JPQL 查询 - 复杂统计
    @Query("""
        SELECT new com.example.OrderStatistics(
            o.userId,
            COUNT(o),
            SUM(o.totalAmount),
            MAX(o.createdAt)
        )
        FROM Order o
        WHERE o.createdAt BETWEEN :startDate AND :endDate
          AND o.deleted = false
        GROUP BY o.userId
        HAVING COUNT(o) >= :minOrderCount
        ORDER BY SUM(o.totalAmount) DESC
        """)
    List&lt;OrderStatistics&gt; findUserOrderStatistics(
        @Param("startDate") LocalDateTime startDate,
        @Param("endDate") LocalDateTime endDate,
        @Param("minOrderCount") Long minOrderCount,
        Pageable pageable
    );

    // ✅ 批量更新 - 修改状态
    @Modifying
    @Query("UPDATE Order o SET o.status = :newStatus, " +
           "o.updatedAt = CURRENT_TIMESTAMP WHERE o.id IN :ids")
    int batchUpdateStatus(
        @Param("ids") List&lt;Long&gt; orderIds,
        @Param("newStatus") OrderStatus newStatus
    );
}

// ========== 3. Service 层（纯业务逻辑） ==========
@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;  // ✅ 依赖接口，不依赖具体实现

    @Autowired
    private UserRepository userRepository;

    // ✅ 业务方法清晰简洁，不关心数据怎么存
    public List&lt;OrderDTO&gt; getUserOrders(Long userId) {
        // 可以在这里加业务校验
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new UserNotFoundException(userId));

        // 直接调用 Repository，SQL 藏在后面
        List&lt;Order&gt; orders = orderRepository.findByUserIdAndDeletedFalse(userId);

        // 转换为 DTO 返回
        return orders.stream()
            .map(OrderDTO::from)
            .collect(Collectors.toList());
    }
}
</code></pre>


          <div class="benefits-list">
            <h5>🎉 这样做的好处</h5>
            <ul>
              <li><strong>关注点分离</strong>：Service 专注于业务，Repository 专注于数据，各管一摊</li>
              <li><strong>可测试性高</strong>：Service 只依赖 Repository 接口，单元测试可以用 Mock 对象替代真实数据库</li>
              <li><strong>代码复用</strong>：通用的查询方法（如 findByUserId）定义一次，到处复用</li>
              <li><strong>切换成本低</strong>：从 MySQL 换成 MongoDB，只需改 Repository 实现，Service 完全不动</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!-- Repository 模式对比 -->
    <div class="pattern-comparison">
      <h5>📊 不同 Repository 实现方式对比</h5>

      <div class="comparison-table">
        <div class="table-header">
          <div class="col-method">实现方式</div>
          <div class="col-pros">优点</div>
          <div class="col-cons">缺点</div>
          <div class="col-scene">适用场景</div>
        </div>

        <div class="table-row">
          <div class="col-method">
            <strong>Spring Data JPA</strong>
            <div class="method-tag">主流方案</div>
          </div>
          <div class="col-pros">
            <ul>
              <li>方法名自动推导查询</li>
              <li>分页排序内置支持</li>
              <li>事务管理集成</li>
            </ul>
          </div>
          <div class="col-cons">
            <ul>
              <li>复杂查询性能一般</li>
              <li>学习曲线较陡</li>
            </ul>
          </div>
          <div class="col-scene">快速开发、标准 CRUD 业务</div>
        </div>

        <div class="table-row">
          <div class="col-method">
            <strong>MyBatis / MyBatis-Plus</strong>
            <div class="method-tag tag-blue">国内主流</div>
          </div>
          <div class="col-pros">
            <ul>
              <li>SQL 完全可控</li>
              <li>复杂查询性能优</li>
              <li>动态 SQL 强大</li>
            </ul>
          </div>
          <div class="col-cons">
            <ul>
              <li>需要手写 SQL</li>
              <li>样板代码较多</li>
            </ul>
          </div>
          <div class="col-scene">复杂查询、性能敏感业务</div>
        </div>

        <div class="table-row">
          <div class="col-method">
            <strong>Spring Data JDBC</strong>
            <div class="method-tag tag-green">轻量</div>
          </div>
          <div class="col-pros">
            <ul>
              <li>简单轻量</li>
              <li>无延迟加载</li>
              <li>启动快速</li>
            </ul>
          </div>
          <div class="col-cons">
            <ul>
              <li>无复杂映射</li>
              <li>功能较简单</li>
            </ul>
          </div>
          <div class="col-scene">微服务、简单聚合根场景</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const viewMode = ref('good')
const currentScenario = ref('order')
const expandedSteps = ref([1]) // 默认展开第二步

const scenarios = [
  { id: 'order', name: '下单流程' },
  { id: 'refund', name: '退款处理' },
  { id: 'report', name: '报表生成' }
]

const scenarioData = {
  order: {
    title: '🛒 电商下单流程',
    description: '用户下单涉及库存扣减、订单创建、支付记录等多个操作，需要保证事务一致性',
    steps: [
      {
        name: '参数校验与DTO转换',
        layer: 'Controller',
        code: `@PostMapping("/orders")
public ResponseEntity<OrderDTO> createOrder(
    @RequestBody @Valid CreateOrderRequest request
) {
    // 调用 Service
    OrderDTO order = orderService.createOrder(request);
    return ResponseEntity.ok(order);
}`
      },
      {
        name: '业务逻辑编排（事务管理）',
        layer: 'Service',
        code: `@Service
@Transactional  // 关键：事务管理
public class OrderService {

    public OrderDTO createOrder(CreateOrderRequest request) {
        // 1. 检查库存
        inventoryService.checkAndDeduct(request.getSkuId(),
                                      request.getQuantity());

        // 2. 创建订单
        Order order = new Order();
        order.setUserId(request.getUserId());
        order.setTotalAmount(calculateTotal(request));
        orderRepository.save(order);

        // 3. 创建支付记录
        Payment payment = createPayment(order);
        paymentRepository.save(payment);

        // 任一失败都会回滚
        return convertToDTO(order);
    }
}`,
        subSteps: [
          {
            icon: '✅',
            name: '检查并扣减库存',
            desc: '确保库存充足，预先锁定',
            status: 'success',
            statusText: '成功'
          },
          {
            icon: '📝',
            name: '创建订单记录',
            desc: '生成订单主表数据',
            status: 'success',
            statusText: '成功'
          },
          {
            icon: '💳',
            name: '创建支付记录',
            desc: '初始化待支付状态',
            status: 'success',
            statusText: '成功'
          },
          {
            icon: '🔄',
            name: '事务提交',
            desc: '所有操作原子性提交',
            status: 'success',
            statusText: '已提交'
          }
        ]
      },
      {
        name: '数据持久化',
        layer: 'Repository',
        code: `public interface OrderRepository extends JpaRepository<Order, Long> {
    // 基本的 CRUD 已内置
}

// 实际执行：INSERT INTO orders (...) VALUES (...)`
      }
    ]
  },
  refund: {
    title: '💰 退款处理流程',
    description: '退款涉及订单状态变更、支付原路返回、库存回滚等操作',
    steps: [
      {
        name: '接收退款申请',
        layer: 'Controller',
        code: `@PostMapping("/orders/{orderId}/refund")
public ResponseEntity<RefundDTO> applyRefund(
    @PathVariable Long orderId,
    @RequestBody @Valid RefundRequest request
) {
    RefundDTO refund = refundService.processRefund(orderId, request);
    return ResponseEntity.ok(refund);
}`
      },
      {
        name: '退款业务处理',
        layer: 'Service',
        code: `@Service
@Transactional
public class RefundService {

    public RefundDTO processRefund(Long orderId, RefundRequest request) {
        // 1. 验证订单状态
        Order order = orderRepository.findById(orderId)
            .orElseThrow(() -> new OrderNotFoundException("订单不存在"));

        if (order.getStatus() != OrderStatus.PAID) {
            throw new InvalidOrderStateException("订单状态不允许退款");
        }

        // 2. 计算退款金额
        BigDecimal refundAmount = calculateRefundAmount(order, request);

        // 3. 调用支付渠道退款
        PaymentRefundResult result = paymentService.refund(
            order.getPaymentNo(),
            refundAmount,
            request.getReason()
        );

        // 4. 更新订单状态
        order.setStatus(OrderStatus.REFUNDING);
        orderRepository.save(order);

        // 5. 保存退款记录
        RefundRecord record = new RefundRecord();
        record.setOrderId(orderId);
        record.setAmount(refundAmount);
        record.setReason(request.getReason());
        record.setStatus(RefundStatus.PROCESSING);
        refundRecordRepository.save(record);

        // 6. 异步恢复库存
        inventoryService.restoreStockAsync(order.getItems());

        return convertToDTO(record);
    }
}`,
        subSteps: [
          { icon: '🔍', name: '验证订单状态', desc: '检查订单是否存在且可退款', status: 'success', statusText: '通过' },
          { icon: '💰', name: '计算退款金额', desc: '根据规则计算应退金额', status: 'success', statusText: '完成' },
          { icon: '🏦', name: '调用支付渠道', desc: '请求第三方支付退款', status: 'success', statusText: '处理中' },
          { icon: '📝', name: '更新订单状态', desc: '标记为退款中', status: 'success', statusText: '已更新' },
          { icon: '📊', name: '保存退款记录', desc: '记录退款流水', status: 'success', statusText: '已保存' },
          { icon: '🔄', name: '异步恢复库存', desc: '后台恢复商品库存', status: 'success', statusText: '已提交' }
        ]
      }
    ]
  },
  report: {
    title: '📊 报表生成流程',
    description: '复杂的报表通常涉及多个数据源查询、数据聚合计算、异步导出等',
    steps: [
      {
        name: '接收报表请求',
        layer: 'Controller',
        code: `@GetMapping("/reports/sales")
public ResponseEntity<ReportTaskDTO> generateSalesReport(
    @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    LocalDate startDate,
    @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    LocalDate endDate,
    @RequestParam(required = false) List<Long> regionIds
) {
    // 大报表采用异步生成
    ReportTaskDTO task = reportService.createReportTask(
        ReportType.SALES, startDate, endDate, regionIds
    );
    return ResponseEntity.accepted().body(task);
}`
      },
      {
        name: '复杂报表业务编排',
        layer: 'Service',
        code: `@Service
public class ReportService {

    @Async("reportExecutor")
    public void generateReportAsync(Long taskId) {
        ReportTask task = reportTaskRepository.findById(taskId)
            .orElseThrow();

        try {
            task.setStatus(TaskStatus.RUNNING);
            reportTaskRepository.save(task);

            // 1. 从多个数据源聚合数据
            SalesReportData data = aggregateSalesData(task);

            // 2. 计算各项指标
            calculateMetrics(data);

            // 3. 生成图表数据
            generateChartData(data);

            // 4. 导出为 Excel
            String fileUrl = exportToExcel(data, task);

            task.setStatus(TaskStatus.COMPLETED);
            task.setFileUrl(fileUrl);
            task.setCompletedAt(LocalDateTime.now());

        } catch (Exception e) {
            task.setStatus(TaskStatus.FAILED);
            task.setErrorMessage(e.getMessage());
        }

        reportTaskRepository.save(task);
    }

    private SalesReportData aggregateSalesData(ReportTask task) {
        // 协调多个 Repository 查询数据
        List<Order> orders = orderRepository
            .findByCreatedAtBetween(task.getStartDate(), task.getEndDate());

        List<Payment> payments = paymentRepository
            .findByPaidAtBetween(task.getStartDate(), task.getEndDate());

        List<RefundRecord> refunds = refundRecordRepository
            .findByCreatedAtBetween(task.getStartDate(), task.getEndDate());

        // 数据聚合逻辑...
        return new SalesReportData(orders, payments, refunds);
    }
}`,
        subSteps: [
          { icon: '📥', name: '从多个数据源查询', desc: 'Orders/Payments/Refunds', status: 'success', statusText: '已查询' },
          { icon: '🔄', name: '数据聚合与清洗', desc: '关联数据、处理缺失值', status: 'success', statusText: '已完成' },
          { icon: '📊', name: '计算业务指标', desc: 'GMV、订单数、客单价等', status: 'success', statusText: '已计算' },
          { icon: '📈', name: '生成图表数据', desc: '趋势图、占比图数据结构', status: 'success', statusText: '已生成' },
          { icon: '📄', name: '导出 Excel 文件', desc: '生成并上传至 OSS', status: 'success', statusText: '已完成' }
        ]
      }
    ]
  }
}

const currentScenarioData = computed(() => scenarioData[currentScenario.value])

const toggleStep = (index) => {
  const i = expandedSteps.value.indexOf(index)
  if (i > -1) {
    expandedSteps.value.splice(i, 1)
  } else {
    expandedSteps.value.push(index)
  }
}

const principles = [
  {
    id: 1,
    icon: '🎯',
    title: '单一职责',
    desc: '一个 Service 类只负责一块业务领域',
    example: 'UserService 只管用户，OrderService 只管订单'
  },
  {
    id: 2,
    icon: '🔄',
    title: '事务边界',
    desc: '在 Service 层声明式管理事务',
    example: '@Transactional 放在 Service 方法上'
  },
  {
    id: 3,
    icon: '🔗',
    title: '避免循环依赖',
    desc: 'Service 之间不要互相调用',
    example: 'A 调用 B，B 又调用 A 会导致循环'
  },
  {
    id: 4,
    icon: '📦',
    title: 'DTO 转换',
    desc: '返回前转换为 DTO，不暴露实体',
    example: 'return new UserDTO(user)'
  }
]
</script>

<style scoped>
.service-layer-demo {
  padding: 24px;
  background: linear-gradient(135deg, #fff9f0 0%, #fff0e6 100%);
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

.scenario-selector {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
  padding: 16px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.selector-label {
  font-weight: 600;
  color: #303133;
  font-size: 14px;
  white-space: nowrap;
}

.scenario-buttons {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.scenario-btn {
  padding: 8px 16px;
  border: 1px solid #dcdfe6;
  background: white;
  border-radius: 6px;
  cursor: pointer;
  font-size: 13px;
  color: #606266;
  transition: all 0.3s ease;
}

.scenario-btn:hover {
  border-color: #e6a23c;
  color: #e6a23c;
}

.scenario-btn.active {
  background: #e6a23c;
  border-color: #e6a23c;
  color: white;
}

.flow-diagram {
  background: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
}

.flow-header {
  text-align: center;
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 1px solid #ebeef5;
}

.flow-title {
  display: block;
  font-size: 16px;
  font-weight: 600;
  color: #303133;
  margin-bottom: 6px;
}

.flow-desc {
  font-size: 13px;
  color: #909399;
}

.flow-steps {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.flow-step {
  background: #f8f9fa;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  border-left: 4px solid #e6a23c;
}

.flow-step:hover {
  background: #fff8f0;
  transform: translateX(4px);
}

.step-header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
}

.step-number {
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #e6a23c;
  color: white;
  border-radius: 50%;
  font-size: 13px;
  font-weight: 600;
}

.step-info {
  flex: 1;
}

.step-name {
  font-weight: 600;
  color: #303133;
  font-size: 14px;
}

.step-layer {
  font-size: 12px;
  color: #e6a23c;
  margin-top: 2px;
}

.expand-icon {
  color: #909399;
  font-size: 12px;
}

.step-code {
  padding: 0 16px 16px 56px;
}

.step-code pre {
  margin: 0;
  background: #2d2d2d;
  padding: 12px;
  border-radius: 6px;
  overflow-x: auto;
}

.step-code code {
  color: #f8f8f2;
  font-family: 'Monaco', 'Menlo', monospace;
  font-size: 11px;
  line-height: 1.5;
}

.sub-steps {
  padding: 0 16px 16px 56px;
}

.sub-step {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  background: white;
  border-radius: 6px;
  margin-bottom: 8px;
  border-left: 3px solid #dcdfe6;
}

.sub-step.success {
  border-left-color: #67c23a;
  background: #f6ffed;
}

.sub-step-icon {
  font-size: 16px;
}

.sub-step-content {
  flex: 1;
}

.sub-step-name {
  font-size: 13px;
  font-weight: 500;
  color: #303133;
}

.sub-step-desc {
  font-size: 11px;
  color: #909399;
  margin-top: 2px;
}

.sub-step-status {
  font-size: 11px;
  padding: 2px 8px;
  border-radius: 10px;
  background: #f0f9ff;
  color: #1890ff;
}

.sub-step.success .sub-step-status {
  background: #f6ffed;
  color: #52c41a;
}

.comparison-section {
  margin-bottom: 24px;
}

.comparison-header {
  margin-bottom: 16px;
}

.toggle-group {
  display: flex;
  gap: 8px;
  justify-content: center;
}

.toggle-btn {
  padding: 10px 20px;
  border: 2px solid #dcdfe6;
  background: white;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  color: #606266;
  transition: all 0.3s ease;
}

.toggle-btn:hover {
  border-color: #409eff;
  color: #409eff;
}

.toggle-btn.active {
  background: #409eff;
  border-color: #409eff;
  color: white;
}

.comparison-content {
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
}

.code-panel {
  padding: 20px;
}

.code-panel.bad {
  background: linear-gradient(135deg, #fff5f5 0%, #ffebee 100%);
}

.code-panel.good {
  background: linear-gradient(135deg, #f6ffed 0%, #f0f9ff 100%);
}

.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.panel-title {
  font-weight: 600;
  font-size: 15px;
  color: #303133;
}

.panel-badge {
  padding: 4px 10px;
  background: #ff4d4f;
  color: white;
  border-radius: 12px;
  font-size: 11px;
}

.code-panel.good .panel-badge {
  background: #52c41a;
}

.code-block {
  background: #2d2d2d;
  border-radius: 8px;
  padding: 16px;
  margin: 0;
  overflow-x: auto;
}

.code-block code {
  color: #f8f8f2;
  font-family: 'Monaco', 'Menlo', 'Consolas', monospace;
  font-size: 12px;
  line-height: 1.6;
}

.problems-list, .benefits-list {
  margin-top: 20px;
  padding: 16px;
  background: white;
  border-radius: 8px;
}

.problems-list h5 {
  color: #cf1322;
  margin: 0 0 12px 0;
  font-size: 14px;
}

.benefits-list h5 {
  color: #389e0d;
  margin: 0 0 12px 0;
  font-size: 14px;
}

.problems-list ul, .benefits-list ul {
  margin: 0;
  padding-left: 20px;
}

.problems-list li, .benefits-list li {
  margin: 8px 0;
  color: #595959;
  font-size: 13px;
  line-height: 1.6;
}

.pattern-comparison {
  background: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
}

.pattern-comparison h5 {
  margin: 0 0 16px 0;
  color: #1a1a2e;
  font-size: 15px;
  text-align: center;
}

.comparison-table {
  overflow-x: auto;
}

.table-header, .table-row {
  display: grid;
  grid-template-columns: 140px 1fr 1fr 1fr;
  gap: 12px;
  padding: 12px;
  align-items: start;
}

.table-header {
  background: #f5f7fa;
  border-radius: 8px;
  font-weight: 600;
  color: #303133;
  font-size: 13px;
}

.table-row {
  border-bottom: 1px solid #ebeef5;
  font-size: 12px;
  color: #606266;
}

.table-row:last-child {
  border-bottom: none;
}

.col-method strong {
  color: #303133;
  font-size: 13px;
}

.method-tag {
  display: inline-block;
  padding: 2px 6px;
  background: #e6a23c;
  color: white;
  border-radius: 4px;
  font-size: 10px;
  margin-top: 4px;
}

.method-tag.tag-blue {
  background: #409eff;
}

.method-tag.tag-green {
  background: #67c23a;
}

.col-pros ul, .col-cons ul {
  margin: 0;
  padding-left: 16px;
}

.col-pros li, .col-cons li {
  margin: 4px 0;
}

@media (max-width: 1024px) {
  .table-header, .table-row {
    grid-template-columns: 120px 1fr 1fr 1fr;
    font-size: 11px;
  }

  .col-pros ul, .col-cons ul {
    padding-left: 14px;
  }
}

@media (max-width: 768px) {
  .toggle-group {
    flex-direction: column;
  }

  .toggle-btn {
    width: 100%;
  }

  .table-header, .table-row {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .table-row {
    padding: 16px;
    border: 1px solid #ebeef5;
    border-radius: 8px;
    margin-bottom: 12px;
  }
}
</style>
