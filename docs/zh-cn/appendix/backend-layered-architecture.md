# 后端分层架构：Controller / Service / Repository / Domain

> 💡 **学习指南**：分层架构就像组织一家餐厅——每个人都有明确的职责，前厅接待（Controller）、厨师做菜（Service）、仓管取货（Repository）、菜谱标准（Domain）。本文将带你从零理解后端代码的"层"到底是怎么回事，以及为什么要这样分层。

在开始之前，建议你先有简单的后端开发经验，至少写过几个接口，踩过一些坑。

---

## 0. 引言：为什么代码越写越乱？

<LayeredArchitectureDemo />

很多初学者在刚开始写后端代码时，都会遇到这样的困惑：

- **刚开始**：写一个用户注册接口，100 行代码搞定，感觉挺简单
- **三个月后**：业务越来越复杂，一个文件 500 行，改一行代码怕影响其他地方
- **半年后**：来了新同事，看着代码发愁："这个接口到底干了多少事？"

**问题的本质**：代码没有"章法"，所有的逻辑都堆在一起，就像把食材、厨具、调料都扔在一个抽屉里。

### 分层的思想：把抽屉换成橱柜

想象一下厨房的组织方式：

| 区域 | 存放物品 | 特点 |
|------|---------|------|
| **吊柜** | 不常用的锅具、囤货 | 取用最不方便 |
| **台面** | 正在处理的食材 | 临时操作区 |
| **抽屉** | 分类摆放的餐具 | 按需取用 |
| **冰箱** | 生鲜食材 | 有保鲜条件 |

**分层架构**就是把代码也这样组织：每一层只关心自己的职责，层与层之间通过明确的"接口"交互，而不是随意互相调用。

---

## 1. 核心概念：四层架构的职责划分

### 1.1 四层架构概览

典型的后端分层架构包含四个核心层次：

```
┌─────────────────────────────────────┐
│  Controller 层（控制器层）             │  ← 接待员：接收请求，初步检查
│  - 接收 HTTP 请求                     │
│  - 参数校验                          │
│  - 调用 Service                      │
│  - 返回响应                          │
├─────────────────────────────────────┤
│  Service 层（业务逻辑层）              │  ← 厨师：处理核心业务
│  - 业务逻辑编排                       │
│  - 事务管理                          │
│  - 调用 Repository                   │
│  - 跨模块协调                        │
├─────────────────────────────────────┤
│  Repository 层（数据访问层）           │  ← 仓管员：管理数据存取
│  - 数据库操作                        │
│  - ORM 映射                          │
│  - 查询封装                          │
├─────────────────────────────────────┤
│  Domain 层（领域模型层）               │  ← 菜谱标准：定义业务概念
│  - 实体（Entity）                    │
│  - 值对象（Value Object）             │
│  - 业务规则                          │
└─────────────────────────────────────┘
```

### 1.2 Controller 层：请求的"接待员"

<ControllerLayerDemo />

**职责**：
- 接收 HTTP 请求，解析参数
- 进行基础的参数校验（格式、必填等）
- 调用 Service 层执行业务逻辑
- 封装响应，返回给客户端

**不该做的事**：
- 不要在这里写业务逻辑
- 不要直接操作数据库
- 不要处理事务

**类比**：就像餐厅的门童，负责迎接客人、检查预约、引导入座，但不负责做菜。

### 1.3 Service 层：业务逻辑的"厨师"

<ServiceLayerDemo />

**职责**：
- 实现核心业务逻辑
- 编排多个 Repository 的操作
- 管理事务边界（@Transactional）
- 处理跨模块的业务协调

**不该做的事**：
- 不要直接写 SQL（交给 Repository）
- 不要处理 HTTP 相关的事情
- 不要返回数据库实体给 Controller

**类比**：就像厨师按照菜谱做菜，需要协调各种食材（数据），把控菜品质量（业务正确性）。

### 1.4 Repository 层：数据的"仓管员"

<RepositoryLayerDemo />

**职责**：
- 封装所有数据访问逻辑
- 执行 CRUD 操作
- 处理 ORM 映射
- 封装查询条件

**不该做的事**：
- 不要写业务逻辑
- 不要处理事务（Service 层管理）
- 不要依赖上层模块

**类比**：就像餐厅的仓管员，负责从仓库取食材、存放剩余食材。厨师只需要告诉仓管员要什么，不需要知道仓库在哪、怎么取。

### 1.5 Domain 层：领域模型的"蓝图"

<DomainModelDemo />

**职责**：
- 定义业务实体（Entity）
- 定义值对象（Value Object）
- 封装业务规则
- 作为所有层的共同依赖

**重要特性**：
- Domain 层不依赖任何其他层
- 所有层都依赖 Domain 层
- 是分层架构的基础

**类比**：就像餐厅的菜单和菜品标准，定义了什么是"宫保鸡丁"、用什么食材、什么口味。所有厨师都要按照这个标准来做。

---

## 2. DTO：层与层之间的"翻译官"

<DtoFlowDemo />

### 2.1 为什么需要 DTO？

想象一下：如果 Controller 直接把数据库实体（Entity）返回给前端，会发生什么？

```java
// ❌ 错误的做法
@Entity
public class User {
    @Id
    private Long id;
    private String username;
    private String password;        // 敏感信息！
    private String phone;
    private String email;
    private LocalDateTime createdAt;
    private Boolean isDeleted;    // 内部字段！
}

// 如果直接返回这个实体...
// 前端会收到 password、isDeleted 等不应该暴露的字段
```

**DTO 的作用**：
- **解耦**：隔离数据库实体和 API 契约
- **安全**：控制暴露的字段，避免泄露敏感信息
- **灵活**：可以为不同场景定义不同的 DTO
- **性能**：避免加载不必要的数据

### 2.2 不同层的 DTO 职责

| 层级 | DTO 类型 | 职责 | 示例 |
|------|---------|------|------|
| **Controller** | Request / Response DTO | 定义 API 契约、参数校验、序列化 | `UserCreateRequest` |
| **Service** | Param / Result DTO | 封装业务方法参数，解耦 Controller 与 Service | `UserCreateParam` |
| **Repository** | Entity / DO | 映射数据库表结构，ORM 映射 | `UserEntity` |

### 2.3 DTO 转换实战

```java
// ========== Controller 层：Request DTO ==========
@Data
public class UserCreateRequest {
    @NotBlank(message = "用户名不能为空")
    @Size(min = 3, max = 20, message = "用户名长度3-20")
    private String username;

    @NotBlank(message = "密码不能为空")
    @Size(min = 6, message = "密码至少6位")
    private String password;

    @Email(message = "邮箱格式不正确")
    private String email;
}

// ========== Controller 层：Response DTO ==========
@Data
@Builder
public class UserDTO {
    private Long id;
    private String username;
    private String email;
    private LocalDateTime createdAt;
    // ❌ 注意：不包含 password 字段！
}

// ========== Service 层：Param DTO ==========
@Data
@Builder
public class UserCreateParam {
    private String username;
    private String password;  // 已加密的密码
    private String email;
}

// ========== 转换逻辑 ==========
@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    @PostMapping
    public ResponseEntity<UserDTO> createUser(
            @RequestBody @Valid UserCreateRequest request) {
        // 1. Request DTO -> Param DTO
        UserCreateParam param = UserCreateParam.builder()
                .username(request.getUsername())
                .password(encryptPassword(request.getPassword()))
                .email(request.getEmail())
                .build();

        // 2. 调用 Service
        User user = userService.createUser(param);

        // 3. Entity -> Response DTO
        UserDTO response = UserDTO.builder()
                .id(user.getId())
                .username(user.getUsername())
                .email(user.getEmail())
                .createdAt(user.getCreatedAt())
                .build();

        return ResponseEntity.ok(response);
    }
}
```

---

## 3. 依赖方向：分层架构的铁律

<DependencyDirectionDemo />

### 3.1 依赖倒置原则（DIP）

分层架构的核心规则：**上层模块不应该依赖下层模块的具体实现，而应该依赖于抽象。**

```
❌ 错误的依赖方式（直接依赖实现）：

Controller -> UserServiceImpl -> UserDaoImpl -> UserEntity

问题：
1. 每层都耦合了具体实现
2. 换实现要改很多代码
3. 测试困难

✅ 正确的依赖方式（依赖抽象）：

Controller -> IUserService (接口) -> IUserDao (接口) -> UserEntity

实现：
UserServiceImpl -> UserDaoImpl

好处：
1. 上层只依赖接口
2. 换实现只需改配置
3. 容易 Mock 测试
```

### 3.2 正确的依赖方向

```
┌─────────────────────────────────────────────────────────────┐
│  Controller 层                                               │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  UserController                                       │  │
│  │  - @Autowired private IUserService userService;      │  │
│  │  ✅ 依赖接口，不依赖实现                              │  │
│  └──────────────────────────────────────────────────────┘  │
│                            │                                 │
│                            ▼ 依赖（Dependency）               │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Service 层                                           │  │
│  │  ┌────────────────────────────────────────────────┐  │  │
│  │  │  UserServiceImpl                                │  │  │
│  │  │  - @Autowired private UserRepository repository;  │  │  │
│  │  │  ✅ 依赖 Repository 接口                         │  │  │
│  │  └────────────────────────────────────────────────┘  │  │
│  │                      │                              │  │
│  │                      ▼ 依赖                          │  │
│  │  ┌────────────────────────────────────────────────┐  │  │
│  │  │  Repository 层                                  │  │  │
│  │  │  ┌──────────────────────────────────────────┐   │  │  │
│  │  │  │  UserRepository                          │   │  │  │
│  │  │  │  - extends JpaRepository<User, Long>    │   │  │  │
│  │  │  └──────────────────────────────────────────┘   │  │  │
│  │  │                      │                         │  │  │
│  │  │                      ▼ 依赖                     │  │  │
│  │  │  ┌──────────────────────────────────────────┐   │  │  │
│  │  │  │  Domain 层 (核心领域)                   │   │  │  │
│  │  │  │  ┌────────────────────────────────────┐  │   │  │  │
│  │  │  │  │  User (Entity)                     │  │   │  │  │
│  │  │  │  │  - 不包含任何层依赖              │  │   │  │  │
│  │  │  │  │  - 被所有层依赖                  │  │   │  │  │
│  │  │  │  └────────────────────────────────────┘  │   │  │  │
│  │  │  └──────────────────────────────────────────┘   │  │  │
│  │  └────────────────────────────────────────────────┘  │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

---

## 4. 实战案例：电商订单系统的分层实现

### 4.1 需求场景

实现一个电商订单创建功能：
- 用户选择商品，确认订单信息
- 系统检查库存
- 计算订单金额（商品价格 + 运费 - 优惠）
- 创建订单记录
- 扣减库存
- 返回订单信息

### 4.2 完整的分层代码

```java
// =====================================================
// 1. Domain 层：领域模型
// =====================================================

// 订单实体
@Entity
@Table(name = "orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id")
    private Long userId;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "order_id")
    private List<OrderItem> items = new ArrayList<>();

    @Embedded
    private Money totalAmount;

    @Embedded
    private Address shippingAddress;

    @Enumerated(EnumType.STRING)
    private OrderStatus status = OrderStatus.PENDING_PAYMENT;

    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();

    // 业务方法：计算订单总金额
    public void calculateTotal() {
        Money total = Money.zero();
        for (OrderItem item : items) {
            total = total.add(item.getSubTotal());
        }
        this.totalAmount = total;
    }

    // 业务方法：添加订单项
    public void addItem(OrderItem item) {
        items.add(item);
        item.setOrder(this);
    }

    // 业务方法：取消订单
    public void cancel() {
        if (this.status != OrderStatus.PENDING_PAYMENT) {
            throw new IllegalStateException("只有待支付订单可以取消");
        }
        this.status = OrderStatus.CANCELLED;
    }

    // Getters...
}

// 订单项实体
@Entity
@Table(name = "order_items")
public class OrderItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "product_id")
    private Long productId;

    @Column(name = "product_name")
    private String productName;

    @Embedded
    private Money unitPrice;

    @Column(name = "quantity")
    private Integer quantity;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id")
    private Order order;

    // 计算小计
    public Money getSubTotal() {
        return unitPrice.multiply(quantity);
    }

    // Getters and Setters...
}

// 值对象：金钱
@Embeddable
public class Money {
    @Column(name = "amount")
    private BigDecimal amount;

    @Column(name = "currency")
    private String currency;

    public static Money zero() {
        return new Money(BigDecimal.ZERO, "CNY");
    }

    public Money add(Money other) {
        return new Money(this.amount.add(other.amount), this.currency);
    }

    public Money multiply(int factor) {
        return new Money(this.amount.multiply(BigDecimal.valueOf(factor)), this.currency);
    }

    // Constructor, Getters...
}

// 枚举：订单状态
public enum OrderStatus {
    PENDING_PAYMENT,   // 待支付
    PAID,              // 已支付
    SHIPPED,           // 已发货
    COMPLETED,         // 已完成
    CANCELLED          // 已取消
}

// =====================================================
// 2. Repository 层：数据访问
// =====================================================

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {

    // 根据用户查询订单
    List<Order> findByUserIdOrderByCreatedAtDesc(Long userId);

    // 根据状态查询订单
    List<Order> findByStatus(OrderStatus status);

    // 复杂的 JPQL 查询
    @Query("""
        SELECT o FROM Order o
        WHERE o.userId = :userId
          AND o.status IN :statuses
          AND o.createdAt BETWEEN :startDate AND :endDate
        ORDER BY o.createdAt DESC
        """)
    List<Order> findUserOrdersWithConditions(
        @Param("userId") Long userId,
        @Param("statuses") List<OrderStatus> statuses,
        @Param("startDate") LocalDateTime startDate,
        @Param("endDate") LocalDateTime endDate
    );
}

// =====================================================
// 3. Service 层：业务逻辑
// =====================================================

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;
    private final ProductService productService;
    private final InventoryService inventoryService;
    private final IdGenerator idGenerator;

    /**
     * 创建订单
     */
    @Transactional
    public OrderDTO createOrder(OrderCreateParam param) {
        // 1. 验证商品信息并扣减库存
        List<OrderItem> items = new ArrayList<>();
        for (OrderItemParam itemParam : param.getItems()) {
            // 查询商品
            Product product = productService.getProduct(itemParam.getProductId());

            // 检查库存
            boolean reserved = inventoryService.reserveStock(
                itemParam.getProductId(),
                itemParam.getQuantity()
            );
            if (!reserved) {
                throw new InsufficientStockException("商品库存不足: " + product.getName());
            }

            // 创建订单项
            OrderItem item = new OrderItem();
            item.setProductId(product.getId());
            item.setProductName(product.getName());
            item.setUnitPrice(product.getPrice());
            item.setQuantity(itemParam.getQuantity());
            items.add(item);
        }

        // 2. 创建订单
        Order order = new Order();
        order.setUserId(param.getUserId());
        order.setShippingAddress(param.getAddress());

        // 添加订单项
        for (OrderItem item : items) {
            order.addItem(item);
        }

        // 计算总价
        order.calculateTotal();

        // 3. 保存订单
        orderRepository.save(order);

        // 4. 转换为 DTO 返回
        return OrderDTO.from(order);
    }

    /**
     * 取消订单
     */
    @Transactional
    public void cancelOrder(Long orderId, Long userId) {
        // 1. 查询订单
        Order order = orderRepository.findById(orderId)
            .orElseThrow(() -> new OrderNotFoundException(orderId));

        // 2. 验证权限
        if (!order.getUserId().equals(userId)) {
            throw new AccessDeniedException("无权操作此订单");
        }

        // 3. 执行业务逻辑（在领域对象中封装）
        order.cancel();  // 这会检查状态是否允许取消

        // 4. 恢复库存
        for (OrderItem item : order.getItems()) {
            inventoryService.releaseStock(item.getProductId(), item.getQuantity());
        }

        // 5. 保存
        orderRepository.save(order);
    }
}

// =====================================================
// 4. Controller 层：API 入口
// =====================================================

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    /**
     * 创建订单
     */
    @PostMapping
    public ResponseEntity<OrderDTO> createOrder(
            @RequestBody @Valid OrderCreateRequest request,
            @AuthenticationPrincipal UserPrincipal user) {

        // 1. Request -> Param 转换
        OrderCreateParam param = OrderCreateParam.builder()
                .userId(user.getId())
                .address(request.getAddress())
                .items(request.getItems().stream()
                        .map(item -> OrderItemParam.builder()
                                .productId(item.getProductId())
                                .quantity(item.getQuantity())
                                .build())
                        .collect(Collectors.toList()))
                .build();

        // 2. 调用 Service
        OrderDTO order = orderService.createOrder(param);

        // 3. 返回
        return ResponseEntity.status(HttpStatus.CREATED).body(order);
    }

    /**
     * 取消订单
     */
    @PostMapping("/{orderId}/cancel")
    public ResponseEntity<Void> cancelOrder(
            @PathVariable Long orderId,
            @AuthenticationPrincipal UserPrincipal user) {

        orderService.cancelOrder(orderId, user.getId());

        return ResponseEntity.noContent().build();
    }
}
```

---

## 5. 分层架构的演进：从混乱到整洁

### 5.1 初学者常犯的错误

**错误一：Controller 里写业务逻辑**

```java
// ❌ 错误：Controller 里写了太多业务逻辑
@RestController
public class OrderController {

    @Autowired private OrderRepository orderRepository;
    @Autowired private ProductRepository productRepository;
    @Autowired private InventoryRepository inventoryRepository;

    @PostMapping("/orders")
    public Order createOrder(@RequestBody CreateOrderRequest request) {
        // 太多的业务逻辑在这里...
        // 检查库存
        for (ItemRequest item : request.getItems()) {
            Product product = productRepository.findById(item.getProductId())
                .orElseThrow(() -> new RuntimeException("商品不存在"));

            if (product.getStock() < item.getQuantity()) {
                throw new RuntimeException("库存不足");
            }
        }

        // 扣减库存
        for (ItemRequest item : request.getItems()) {
            Product product = productRepository.findById(item.getProductId()).get();
            product.setStock(product.getStock() - item.getQuantity());
            productRepository.save(product);
        }

        // 创建订单...
        Order order = new Order();
        // ... 更多逻辑

        return orderRepository.save(order);
    }
}
```

**错误二：Service 层直接操作数据库**

```java
// ❌ 错误：Service 里直接写 SQL
@Service
public class OrderService {

    @Autowired
    private JdbcTemplate jdbcTemplate;  // 直接依赖底层 JDBC

    public List<Order> getUserOrders(Long userId) {
        // SQL 硬编码在 Service 里
        String sql = "SELECT * FROM orders WHERE user_id = ? AND deleted = 0";

        return jdbcTemplate.query(sql, (rs, rowNum) -> {
            Order order = new Order();
            order.setId(rs.getLong("id"));
            // ... 更多字段映射
            return order;
        }, userId);
    }
}
```

**错误三：循环依赖**

```java
// ❌ 错误：Service 之间相互调用，形成循环依赖
@Service
public class OrderService {
    @Autowired
    private PaymentService paymentService;  // A 依赖 B
}

@Service
public class PaymentService {
    @Autowired
    private OrderService orderService;  // B 又依赖 A - 循环！
}
```

### 5.2 如何重构？

**重构一：提取 Service 层**

```java
// ✅ Controller 只负责接收请求和返回响应
@RestController
public class OrderController {

    @Autowired
    private OrderService orderService;  // 只依赖 Service 接口

    @PostMapping("/orders")
    public OrderDTO createOrder(@RequestBody @Valid CreateOrderRequest request) {
        // 1. Request -> Param
        CreateOrderParam param = CreateOrderParam.builder()
            .userId(getCurrentUserId())
            .items(request.getItems())
            .address(request.getAddress())
            .build();

        // 2. 调用 Service
        Order order = orderService.createOrder(param);

        // 3. Entity -> DTO
        return OrderDTO.from(order);
    }
}

// ✅ Service 封装业务逻辑
@Service
@Transactional
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private ProductService productService;

    @Autowired
    private InventoryService inventoryService;

    public Order createOrder(CreateOrderParam param) {
        // 1. 检查库存并扣减
        for (ItemParam item : param.getItems()) {
            boolean reserved = inventoryService.reserveStock(
                item.getProductId(),
                item.getQuantity()
            );
            if (!reserved) {
                throw new InsufficientStockException("库存不足");
            }
        }

        // 2. 创建订单
        Order order = new Order();
        order.setUserId(param.getUserId());
        // ... 设置其他属性

        // 3. 保存
        return orderRepository.save(order);
    }
}
```

**重构二：提取 Repository 层**

```java
// ✅ Repository 接口：定义数据访问契约
@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    // Spring Data JPA 自动生成实现
    List<Order> findByUserIdOrderByCreatedAtDesc(Long userId);

    @Query("SELECT o FROM Order o WHERE o.status = :status AND o.createdAt < :date")
    List<Order> findByStatusAndCreatedAtBefore(
        @Param("status") OrderStatus status,
        @Param("date") LocalDateTime date
    );
}

// ✅ Service 只依赖 Repository 接口
@Service
public class OrderService {
    @Autowired
    private OrderRepository orderRepository;  // 依赖接口，不依赖实现

    public Order getOrder(Long id) {
        return orderRepository.findById(id)
            .orElseThrow(() -> new OrderNotFoundException(id));
    }
}
```

**重构三：打破循环依赖**

```java
// ✅ 方案一：抽取共同的依赖到 Domain 层

// 在 Domain 层定义领域事件
public class OrderPaidEvent {
    private final Long orderId;
    private final Long userId;
    private final Money amount;
    private final LocalDateTime paidAt;
    // ...
}

// OrderService 发布事件
@Service
public class OrderService {
    @Autowired
    private ApplicationEventPublisher eventPublisher;

    public void payOrder(Long orderId, PaymentParam param) {
        Order order = orderRepository.findById(orderId).orElseThrow();
        order.pay(param.getPaymentMethod());
        orderRepository.save(order);

        // 发布事件，而不是直接调用 PaymentService
        eventPublisher.publishEvent(new OrderPaidEvent(
            order.getId(),
            order.getUserId(),
            order.getTotalAmount(),
            LocalDateTime.now()
        ));
    }
}

// PaymentService 监听事件
@Service
public class PaymentService {
    @EventListener
    @Transactional
    public void handleOrderPaid(OrderPaidEvent event) {
        // 处理支付相关逻辑
        createPaymentRecord(event);
        // ...
    }
}

// ✅ 方案二：使用中间抽象

// 定义接口
public interface PaymentGateway {
    PaymentResult processPayment(PaymentRequest request);
}

// OrderService 依赖接口
@Service
public class OrderService {
    @Autowired
    private PaymentGateway paymentGateway;  // 依赖接口
}

// 实现类
@Service
public class AlipayGateway implements PaymentGateway {
    // 实现...
}
```

---

## 5. 分层架构 vs 整洁架构

<CleanArchitectureDemo />

### 5.1 两种架构的对比

| 特性 | 传统分层架构 | 整洁架构 |
|------|-------------|----------|
| **依赖方向** | 从上到下 | 从外到内 |
| **核心业务位置** | Service 层 | Domain 层（中心） |
| **框架依赖** | 较深（如 Spring） | 较浅（通过接口隔离） |
| **可测试性** | 需要集成测试 | 核心可单元测试 |
| **学习曲线** | 平缓 | 较陡 |
| **适用场景** | 中小型项目、快速迭代 | 大型复杂业务、长期维护 |

### 5.2 如何选择？

**选择传统分层架构当...**
- 项目规模较小，业务相对简单
- 团队对 DDD 不熟悉
- 需要快速上线，验证市场
- 技术栈相对固定

**选择整洁架构当...**
- 业务复杂，领域模型丰富
- 需要长期维护和演进
- 需要频繁切换技术栈
- 团队有较强的设计能力

---

## 6. 总结：分层架构的核心要点

### 6.1 四层职责速查表

| 层级 | 主要职责 | 不该做的事 |
|------|---------|-----------|
| **Controller** | 接收请求、参数校验、调用 Service、返回响应 | 写业务逻辑、操作数据库、处理事务 |
| **Service** | 业务逻辑编排、事务管理、协调 Repository | 直接写 SQL、处理 HTTP 细节、返回实体给 Controller |
| **Repository** | 数据访问、ORM 映射、查询封装 | 写业务逻辑、管理事务、依赖上层 |
| **Domain** | 实体定义、业务规则、值对象 | 依赖其他层、处理持久化、处理 HTTP |

### 6.2 依赖方向铁律

```
✅ 正确的依赖方向：

Controller → Service 接口 → Repository 接口 → Domain
    ↑           ↑                ↑              ↑
    └-----------└----------------└--------------┘
    所有层都依赖 Domain，Domain 不依赖任何层

❌ 禁止的做法：
- Service 直接依赖 Repository 实现
- Controller 直接操作数据库
- Domain 依赖 Service 或 Repository
- 层与层之间形成循环依赖
```

### 6.3 编码最佳实践

1. **接口优先**：Service 和 Repository 都定义接口，实现类通过 Spring 注入
2. **DTO 隔离**：每层使用自己的 DTO，不要直接传递 Entity
3. **事务在 Service**：使用 `@Transactional` 在 Service 方法上控制事务
4. **异常处理**：Controller 统一处理异常，不要 try-catch 后吞掉异常
5. **贫血模型 vs 充血模型**：根据团队熟悉程度选择，但建议 Domain 有基本的行为方法

### 6.4 常见面试问题

**Q1: 为什么要分层？不分层可以吗？**
> A: 分层的目的是解耦和关注点分离。小项目可以不分层，但随着业务复杂度的增加，不分层会导致代码难以维护、测试困难、团队协作效率低下。

**Q2: Controller 层可以写业务逻辑吗？**
> A: 不可以。Controller 应该只负责接收请求、调用 Service、返回响应。业务逻辑应该封装在 Service 层，这样代码可以被复用，也更容易测试。

**Q3: 什么是贫血模型和充血模型？**
> A: 贫血模型是指 Entity 只有 getter/setter，业务逻辑都在 Service 层。充血模型是指 Entity 包含业务方法（如 `order.cancel()`），封装了业务规则。DDD 推荐充血模型，但贫血模型更简单易懂。

**Q4: 如何处理跨多个 Service 的事务？**
> A: 可以在上层 Service 中使用 `@Transactional`，调用多个下层 Service。或者使用分布式事务方案（如 Seata），但会增加系统复杂度。

---

## 7. 名词对照表

| 英文术语 | 中文对照 | 解释 |
|------|---------|------|
| **Layered Architecture** | 分层架构 | 将系统划分为多个层次，每层有明确的职责 |
| **Controller** | 控制器 | 接收 HTTP 请求，调用 Service，返回响应 |
| **Service** | 服务 | 封装业务逻辑，协调多个 Repository |
| **Repository** | 仓储 | 封装数据访问逻辑，执行 CRUD 操作 |
| **Domain** | 领域 | 定义业务实体、值对象和业务规则 |
| **DTO** | 数据传输对象 | 层与层之间传递数据的载体 |
| **Entity** | 实体 | 有唯一标识的领域对象，对应数据库表 |
| **Value Object** | 值对象 | 没有唯一标识，通过属性值判断相等的对象 |
| **Dependency Inversion** | 依赖倒置 | 高层模块不应依赖低层模块，都应依赖抽象 |
| **Transaction** | 事务 | 保证一组操作原子性的机制 |
| **Clean Architecture** | 整洁架构 | 以领域为核心的架构风格，强调依赖方向 |
| **Anemic Domain Model** | 贫血模型 | 实体只有数据没有行为的模型 |
| **Rich Domain Model** | 充血模型 | 实体包含数据和业务行为的模型 |

---

*本文档示例代码基于 Java + Spring Boot，但分层架构的思想适用于任何后端技术栈（Node.js、Python、Go 等）。*
