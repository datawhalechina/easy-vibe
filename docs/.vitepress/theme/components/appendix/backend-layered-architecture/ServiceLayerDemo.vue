<template>
  <div class="service-demo">
    <div class="header">
      <div class="title">Service 层：业务逻辑的"指挥家"</div>
      <div class="subtitle">选择业务场景，查看 Service 层如何编排逻辑</div>
    </div>

    <div class="tabs">
      <button
        v-for="s in scenarios" :key="s.id"
        :class="['tab', { active: current === s.id }]"
        @click="current = s.id; expanded = []"
      >{{ s.name }}</button>
    </div>

    <div class="flow-box">
      <div class="flow-title">{{ data.title }}</div>
      <div class="flow-desc">{{ data.desc }}</div>

      <div class="steps">
        <div
          v-for="(step, i) in data.steps" :key="i"
          class="step" @click="toggleStep(i)"
        >
          <div class="step-head">
            <span class="step-num">{{ i + 1 }}</span>
            <div class="step-info">
              <div class="step-name">{{ step.name }}</div>
              <div class="step-layer">{{ step.layer }}</div>
            </div>
            <span v-if="step.subs" class="expand">{{ expanded.includes(i) ? '▼' : '▶' }}</span>
          </div>
          <pre v-if="step.code" class="step-code"><code>{{ step.code }}</code></pre>
          <div v-if="step.subs && expanded.includes(i)" class="subs">
            <div v-for="(sub, j) in step.subs" :key="j" class="sub">
              <span class="sub-icon">{{ sub.icon }}</span>
              <div class="sub-info">
                <div class="sub-name">{{ sub.name }}</div>
                <div class="sub-desc">{{ sub.desc }}</div>
              </div>
              <span class="sub-status">{{ sub.status }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="principles">
      <div class="principles-title">Service 层设计原则</div>
      <div class="principle-grid">
        <div v-for="p in principles" :key="p.title" class="principle">
          <div class="p-title">{{ p.title }}</div>
          <div class="p-desc">{{ p.desc }}</div>
          <code class="p-example">{{ p.example }}</code>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const current = ref('order')
const expanded = ref([])

const scenarios = [
  { id: 'order', name: '下单流程' },
  { id: 'refund', name: '退款处理' },
  { id: 'report', name: '报表生成' }
]

const allData = {
  order: {
    title: '电商下单流程',
    desc: '用户下单涉及库存扣减、订单创建、支付记录，需保证事务一致性',
    steps: [
      { name: '参数校验与DTO转换', layer: 'Controller',
        code: `@PostMapping("/orders")
public ResponseEntity<OrderDTO> createOrder(
    @RequestBody @Valid CreateOrderRequest request) {
    OrderDTO order = orderService.createOrder(request);
    return ResponseEntity.ok(order);
}` },
      { name: '业务逻辑编排（事务管理）', layer: 'Service',
        code: `@Transactional
public OrderDTO createOrder(CreateOrderRequest request) {
    inventoryService.checkAndDeduct(request.getSkuId(), request.getQuantity());
    Order order = new Order();
    order.setUserId(request.getUserId());
    order.setTotalAmount(calculateTotal(request));
    orderRepository.save(order);
    Payment payment = createPayment(order);
    paymentRepository.save(payment);
    return convertToDTO(order);
}`,
        subs: [
          { icon: '✅', name: '检查并扣减库存', desc: '确保库存充足', status: '成功' },
          { icon: '📝', name: '创建订单记录', desc: '生成订单主表', status: '成功' },
          { icon: '💳', name: '创建支付记录', desc: '初始化待支付', status: '成功' },
          { icon: '🔄', name: '事务提交', desc: '原子性提交', status: '已提交' }
        ] },
      { name: '数据持久化', layer: 'Repository',
        code: `public interface OrderRepository extends JpaRepository<Order, Long> {
    // 基本 CRUD 已内置
}` }
    ]
  },
  refund: {
    title: '退款处理流程',
    desc: '退款涉及订单状态变更、支付原路返回、库存回滚',
    steps: [
      { name: '接收退款申请', layer: 'Controller',
        code: `@PostMapping("/orders/{orderId}/refund")
public ResponseEntity<RefundDTO> applyRefund(
    @PathVariable Long orderId, @RequestBody @Valid RefundRequest request) {
    return ResponseEntity.ok(refundService.processRefund(orderId, request));
}` },
      { name: '退款业务处理', layer: 'Service',
        code: `@Transactional
public RefundDTO processRefund(Long orderId, RefundRequest request) {
    Order order = orderRepository.findById(orderId).orElseThrow();
    if (order.getStatus() != OrderStatus.PAID)
        throw new InvalidOrderStateException("不允许退款");
    BigDecimal amount = calculateRefundAmount(order, request);
    paymentService.refund(order.getPaymentNo(), amount, request.getReason());
    order.setStatus(OrderStatus.REFUNDING);
    orderRepository.save(order);
    inventoryService.restoreStockAsync(order.getItems());
    return convertToDTO(saveRefundRecord(orderId, amount, request));
}`,
        subs: [
          { icon: '🔍', name: '验证订单状态', desc: '检查是否可退款', status: '通过' },
          { icon: '💰', name: '计算退款金额', desc: '根据规则计算', status: '完成' },
          { icon: '🏦', name: '调用支付渠道', desc: '请求第三方退款', status: '处理中' },
          { icon: '📝', name: '更新订单状态', desc: '标记为退款中', status: '已更新' },
          { icon: '🔄', name: '异步恢复库存', desc: '后台恢复库存', status: '已提交' }
        ] }
    ]
  },
  report: {
    title: '报表生成流程',
    desc: '复杂报表涉及多数据源查询、数据聚合、异步导出',
    steps: [
      { name: '接收报表请求', layer: 'Controller',
        code: `@GetMapping("/reports/sales")
public ResponseEntity<ReportTaskDTO> generateSalesReport(
    @RequestParam LocalDate startDate, @RequestParam LocalDate endDate) {
    ReportTaskDTO task = reportService.createReportTask(startDate, endDate);
    return ResponseEntity.accepted().body(task);
}` },
      { name: '异步报表编排', layer: 'Service',
        code: `@Async("reportExecutor")
public void generateReportAsync(Long taskId) {
    ReportTask task = reportTaskRepository.findById(taskId).orElseThrow();
    task.setStatus(TaskStatus.RUNNING);
    reportTaskRepository.save(task);
    SalesReportData data = aggregateSalesData(task);
    calculateMetrics(data);
    String fileUrl = exportToExcel(data, task);
    task.setStatus(TaskStatus.COMPLETED);
    task.setFileUrl(fileUrl);
    reportTaskRepository.save(task);
}`,
        subs: [
          { icon: '📥', name: '多数据源查询', desc: 'Orders/Payments/Refunds', status: '已查询' },
          { icon: '🔄', name: '数据聚合清洗', desc: '关联数据、处理缺失值', status: '已完成' },
          { icon: '📊', name: '计算业务指标', desc: 'GMV、订单数、客单价', status: '已计算' },
          { icon: '📄', name: '导出 Excel', desc: '生成并上传至 OSS', status: '已完成' }
        ] }
    ]
  }
}

const data = computed(() => allData[current.value])

const toggleStep = (i) => {
  const idx = expanded.value.indexOf(i)
  if (idx > -1) expanded.value.splice(idx, 1)
  else expanded.value.push(i)
}

const principles = [
  { title: '单一职责', desc: '一个 Service 只负责一块业务领域', example: 'UserService 只管用户，OrderService 只管订单' },
  { title: '事务边界', desc: '在 Service 层声明式管理事务', example: '@Transactional 放在 Service 方法上' },
  { title: '避免循环依赖', desc: 'Service 之间不要互相调用', example: 'A→B→A 会导致循环' },
  { title: 'DTO 转换', desc: '返回前转换为 DTO，不暴露实体', example: 'return new UserDTO(user)' }
]
</script>

<style scoped>
.service-demo { padding: 20px; background: var(--vp-c-bg-soft); border-radius: 12px; }
.header { text-align: center; margin-bottom: 20px; }
.title { font-size: 16px; font-weight: 600; color: var(--vp-c-text-1); }
.subtitle { font-size: 13px; color: var(--vp-c-text-3); margin-top: 4px; }

.tabs { display: flex; gap: 8px; margin-bottom: 16px; }
.tab {
  padding: 7px 16px; border: 1px solid var(--vp-c-divider); background: var(--vp-c-bg);
  border-radius: 6px; cursor: pointer; font-size: 13px; color: var(--vp-c-text-2); transition: all .2s;
}
.tab:hover { border-color: #f59e0b; color: #f59e0b; }
.tab.active { background: #f59e0b; border-color: #f59e0b; color: #fff; }

.flow-box {
  padding: 18px; border-radius: 10px;
  background: var(--vp-c-bg); border: 1px solid var(--vp-c-divider); margin-bottom: 16px;
}
.flow-title { font-size: 15px; font-weight: 600; color: var(--vp-c-text-1); text-align: center; }
.flow-desc { font-size: 12px; color: var(--vp-c-text-3); text-align: center; margin: 4px 0 16px; }

.steps { display: flex; flex-direction: column; gap: 10px; }
.step {
  background: var(--vp-c-bg-soft); border-radius: 6px; border-left: 3px solid #f59e0b;
  cursor: pointer; transition: all .2s; overflow: hidden;
}
.step:hover { transform: translateX(3px); }

.step-head { display: flex; align-items: center; gap: 10px; padding: 10px 14px; }
.step-num {
  width: 24px; height: 24px; display: flex; align-items: center; justify-content: center;
  background: #f59e0b; color: #fff; border-radius: 50%; font-size: 12px; font-weight: 600; flex-shrink: 0;
}
.step-info { flex: 1; }
.step-name { font-weight: 600; font-size: 13px; color: var(--vp-c-text-1); }
.step-layer { font-size: 11px; color: #f59e0b; }
.expand { color: var(--vp-c-text-3); font-size: 11px; }

.step-code {
  margin: 0 14px 14px 48px; padding: 10px; border-radius: 6px; overflow-x: auto;
  background: var(--vp-code-block-bg); font-size: 11px; line-height: 1.5;
}
.step-code code { color: var(--vp-c-text-1); font-family: var(--vp-font-family-mono); }

.subs { padding: 0 14px 14px 48px; }
.sub {
  display: flex; align-items: center; gap: 8px; padding: 8px 10px;
  background: var(--vp-c-bg); border-radius: 6px; margin-bottom: 6px;
  border-left: 2px solid var(--vp-c-green-1);
}
.sub-icon { font-size: 14px; }
.sub-info { flex: 1; }
.sub-name { font-size: 12px; font-weight: 500; color: var(--vp-c-text-1); }
.sub-desc { font-size: 11px; color: var(--vp-c-text-3); }
.sub-status { font-size: 10px; padding: 2px 6px; border-radius: 8px; background: var(--vp-c-green-soft); color: var(--vp-c-green-1); }

.principles {
  padding: 16px; border-radius: 10px;
  background: var(--vp-c-bg); border: 1px solid var(--vp-c-divider);
}
.principles-title { text-align: center; font-weight: 600; font-size: 14px; color: var(--vp-c-text-1); margin-bottom: 12px; }
.principle-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; }
.principle {
  padding: 12px; background: var(--vp-c-bg-soft); border-radius: 6px;
  border-left: 3px solid #f59e0b;
}
.p-title { font-weight: 600; font-size: 13px; color: var(--vp-c-text-1); margin-bottom: 4px; }
.p-desc { font-size: 11px; color: var(--vp-c-text-2); margin-bottom: 6px; }
.p-example {
  display: block; padding: 6px; border-radius: 4px; overflow-x: auto;
  background: var(--vp-code-block-bg); font-size: 10px; color: var(--vp-c-text-2);
  font-family: var(--vp-font-family-mono);
}

@media (max-width: 768px) {
  .principle-grid { grid-template-columns: 1fr; }
  .tabs { flex-wrap: wrap; }
  .step-code { margin-left: 14px; }
}
</style>
