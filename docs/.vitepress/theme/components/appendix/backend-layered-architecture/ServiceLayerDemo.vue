<template>
  <div class="service-layer-demo">
    <div class="demo-header">
      <h4>⚙️ Service 层：业务逻辑的"指挥家"</h4>
      <p class="subtitle">Service 层编排业务逻辑，协调多个 Repository，管理事务边界</p>
    </div>

    <!-- 场景选择器 -->
    <div class="scenario-selector">
      <div class="selector-label">选择业务场景：</div>
      <div class="scenario-buttons">
        <button
          v-for="scenario in scenarios"
          :key="scenario.id"
          :class="['scenario-btn', { active: currentScenario === scenario.id }]"
          @click="currentScenario = scenario.id"
        >
          {{ scenario.name }}
        </button>
      </div>
    </div>

    <!-- 流程图 -->
    <div class="flow-diagram">
      <div class="flow-header">
        <span class="flow-title">{{ currentScenarioData.title }}</span>
        <span class="flow-desc">{{ currentScenarioData.description }}</span>
      </div>

      <div class="flow-steps">
        <div
          v-for="(step, index) in currentScenarioData.steps"
          :key="index"
          class="flow-step"
          :class="{ 'has-sub-steps': step.subSteps }"
          @click="toggleStep(index)"
        >
          <div class="step-header">
            <div class="step-number">{{ index + 1 }}</div>
            <div class="step-info">
              <div class="step-name">{{ step.name }}</div>
              <div class="step-layer">{{ step.layer }}</div>
            </div>
            <div v-if="step.subSteps" class="expand-icon">
              {{ expandedSteps.includes(index) ? '▼' : '▶' }}
            </div>
          </div>

          <div v-if="step.code" class="step-code">
            <pre><code>{{ step.code }}</code></pre>
          </div>

          <!-- 子步骤（事务管理） -->
          <div v-if="step.subSteps && expandedSteps.includes(index)" class="sub-steps">
            <div
              v-for="(subStep, subIndex) in step.subSteps"
              :key="subIndex"
              class="sub-step"
              :class="subStep.status"
            >
              <div class="sub-step-icon">{{ subStep.icon }}</div>
              <div class="sub-step-content">
                <div class="sub-step-name">{{ subStep.name }}</div>
                <div class="sub-step-desc">{{ subStep.desc }}</div>
              </div>
              <div class="sub-step-status">{{ subStep.statusText }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Service 设计原则 -->
    <div class="design-principles">
      <h5>🎯 Service 层设计原则</h5>
      <div class="principles-grid">
        <div
          v-for="principle in principles"
          :key="principle.id"
          class="principle-card"
        >
          <div class="principle-icon">{{ principle.icon }}</div>
          <div class="principle-title">{{ principle.title }}</div>
          <div class="principle-desc">{{ principle.desc }}</div>
          <div class="principle-example">
            <code>{{ principle.example }}</code>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const currentScenario = ref('order')
const expandedSteps = ref([])

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
public ResponseEntity&lt;OrderDTO&gt; createOrder(
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
        code: `public interface OrderRepository extends JpaRepository&lt;Order, Long&gt; {
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
public ResponseEntity&lt;RefundDTO&gt; applyRefund(
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

.design-principles {
  margin-top: 24px;
  padding: 20px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.design-principles h5 {
  margin: 0 0 16px 0;
  color: #1a1a2e;
  font-size: 15px;
}

.principles-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.principle-card {
  padding: 14px;
  background: #f8f9fa;
  border-radius: 8px;
  border-left: 3px solid #e6a23c;
}

.principle-icon {
  font-size: 20px;
  margin-bottom: 6px;
}

.principle-title {
  font-weight: 600;
  color: #303133;
  font-size: 13px;
  margin-bottom: 4px;
}

.principle-desc {
  color: #606266;
  font-size: 11px;
  margin-bottom: 8px;
  line-height: 1.5;
}

.principle-example {
  background: #2d2d2d;
  padding: 8px;
  border-radius: 4px;
  overflow-x: auto;
}

.principle-example code {
  color: #f8f8f2;
  font-family: 'Monaco', 'Menlo', monospace;
  font-size: 10px;
  line-height: 1.4;
}

@media (max-width: 768px) {
  .principles-grid {
    grid-template-columns: 1fr;
  }

  .scenario-selector {
    flex-direction: column;
    align-items: flex-start;
  }

  .step-code {
    padding-left: 16px;
  }
}
</style>
