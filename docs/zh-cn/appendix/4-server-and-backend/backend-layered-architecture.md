# 后端分层架构
::: tip 🎯 核心问题
**代码越写越乱,怎么组织才能清晰易懂?** 这就像问:你是把所有食材、厨具、调料都扔在一个抽屉里,还是用橱柜、冰箱、抽屉分类摆放?分层架构就是让代码"物归其位"的方法。
:::

---

## 1. 为什么要分层?

### 1.1 从混乱到整洁

很多初学者在刚开始写后端代码时,都会遇到这样的困惑:

- **刚开始**:写一个用户注册接口,100行代码搞定,感觉挺简单
- **三个月后**:业务越来越复杂,一个文件500行,改一行代码怕影响其他地方
- **半年后**:来了新同事,看着代码发愁:"这个接口到底干了多少事?"

**问题的本质**:代码没有"章法",所有的逻辑都堆在一起,就像把食材、厨具、调料都扔在一个抽屉里。

<LayeredArchitectureDemo />

### 1.2 分层的思想:把抽屉换成橱柜

想象一下厨房的组织方式:

| 区域     | 存放物品           | 特点         |
| -------- | ------------------ | ------------ |
| **吊柜** | 不常用的锅具、囤货 | 取用最不方便 |
| **台面** | 正在处理的食材     | 临时操作区   |
| **抽屉** | 分类摆放的餐具     | 按需取用     |
| **冰箱** | 生鲜食材           | 有保鲜条件   |

**分层架构**就是把代码也这样组织:每一层只关心自己的职责,层与层之间通过明确的"接口"交互,而不是随意互相调用。

::: tip 💡 通俗比喻:餐厅的分工
把后端系统想象成一家餐厅:

- **Controller(控制器)** = 前厅接待员:迎接客人、接单、上菜
- **Service(业务逻辑)** = 厨师:按照菜谱做菜,协调各个帮厨
- **Repository(数据访问)** = 仓管员:从仓库取食材、存放剩余食材
- **Domain(领域模型)** = 菜谱标准:定义宫保鸡丁是什么、用什么食材、什么口味

**关键点**:每个角色只做自己的事,不会越界。接待员不会自己跑进厨房炒菜,仓管员不会修改菜谱。
:::

---

## 2. 四层架构的职责划分

### 2.1 四层架构概览

典型的后端分层架构包含四个核心层次:

```
┌─────────────────────────────────────┐
│  Controller 层(控制器层)             │  ← 接待员:接收请求,初步检查
│  - 接收 HTTP 请求                     │
│  - 参数校验                          │
│  - 调用 Service                      │
│  - 返回响应                          │
├─────────────────────────────────────┤
│  Service 层(业务逻辑层)              │  ← 厨师:处理核心业务
│  - 业务逻辑编排                       │
│  - 事务管理                          │
│  - 调用 Repository                   │
│  - 跨模块协调                        │
├─────────────────────────────────────┤
│  Repository 层(数据访问层)           │  ← 仓管员:管理数据存取
│  - 数据库操作                        │
│  - ORM 映射                          │
│  - 查询封装                          │
├─────────────────────────────────────┤
│  Domain 层(领域模型层)               │  ← 菜谱标准:定义业务概念
│  - 实体(Entity)                      │
│  - 值对象(Value Object)              │
│  - 业务规则                          │
└─────────────────────────────────────┘
```

::: tip 📊 从图解中你能看到什么?
**自上而下**:从"接近用户"到"接近数据"

- **Controller**:最接近前端,处理HTTP协议相关的事情
- **Service**:核心业务逻辑,但不关心数据怎么存、HTTP怎么传
- **Repository**:只关心数据怎么存取,不关心业务含义
- **Domain**:最核心的业务概念,所有层都依赖它

**依赖方向**:

```
Controller → Service → Repository
                 ↓
              Domain(核心,不依赖任何层)
```

这符合"依赖倒置原则":高层模块不应依赖低层模块的具体实现,而应依赖抽象(Domain)。
:::

### 2.2 Controller 层:请求的"接待员"

<ControllerLayerDemo />

**职责**:

- 接收 HTTP 请求,解析参数
- 进行基础的参数校验(格式、必填等)
- 调用 Service 层执行业务逻辑
- 封装响应,返回给客户端

**不该做的事**:

- ❌ 在这里写业务逻辑
- ❌ 直接操作数据库
- ❌ 处理事务

**类比**:就像餐厅的门童,负责迎接客人、检查预约、引导入座,但不负责做菜。

::: details 📋 实际代码示例

```java
@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    // ✅ 正确:Controller 只负责接收请求和返回响应
    @PostMapping
    public ResponseEntity<UserDTO> createUser(
            @RequestBody @Valid UserCreateRequest request) {
        // 1. Request DTO → Param DTO
        UserCreateParam param = UserCreateParam.builder()
                .username(request.getUsername())
                .password(encryptPassword(request.getPassword()))
                .email(request.getEmail())
                .build();

        // 2. 调用 Service
        User user = userService.createUser(param);

        // 3. Entity → Response DTO
        UserDTO response = UserDTO.builder()
                .id(user.getId())
                .username(user.getUsername())
                .email(user.getEmail())
                .build();

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
}
```

**关键点**:

- 用 `@Valid` 自动校验参数格式
- 用 DTO(Data Transfer Object)隔离前后端数据结构
- 不包含任何业务逻辑,只做"翻译"和"调度"
  :::

### 2.3 Service 层:业务逻辑的"厨师"

<ServiceLayerDemo />

**职责**:

- 实现核心业务逻辑
- 编排多个 Repository 的操作
- 管理事务边界(@Transactional)
- 处理跨模块的业务协调

**不该做的事**:

- ❌ 直接写 SQL(交给 Repository)
- ❌ 处理 HTTP 相关的事情
- ❌ 返回数据库实体给 Controller

**类比**:就像厨师按照菜谱做菜,需要协调各种食材(数据),把控菜品质量(业务正确性)。

::: details 📋 实际代码示例

```java
@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final EmailService emailService;

    // ✅ 正确:Service 封装业务逻辑
    @Transactional
    public User createUser(UserCreateParam param) {
        // 1. 业务规则:检查用户名是否重复
        if (userRepository.existsByUsername(param.getUsername())) {
            throw new UserAlreadyExistsException();
        }

        // 2. 创建用户实体
        User user = new User();
        user.setUsername(param.getUsername());
        user.setPassword(param.getPassword()); // 已经加密
        user.setEmail(param.getEmail());

        // 3. 保存到数据库
        userRepository.save(user);

        // 4. 发送欢迎邮件(跨模块协调)
        emailService.sendWelcomeEmail(user);

        return user;
    }
}
```

**关键点**:

- 用 `@Transactional` 保证事务一致性
- 抛出业务异常,让 Controller 统一处理
- 不依赖 HTTP 概念,可以复用(如定时任务调用)
  :::

### 2.4 Repository 层:数据的"仓管员"

<RepositoryLayerDemo />

**职责**:

- 封装所有数据访问逻辑
- 执行 CRUD 操作
- 处理 ORM 映射
- 封装查询条件

**不该做的事**:

- ❌ 写业务逻辑
- ❌ 处理事务(Service 层管理)
- ❌ 依赖上层模块

**类比**:就像餐厅的仓管员,负责从仓库取食材、存放剩余食材。厨师只需要告诉仓管员要什么,不需要知道仓库在哪、怎么取。

::: details 📋 实际代码示例

```java
@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    // ✅ Spring Data JPA 自动实现
    Optional<User> findByUsername(String username);

    boolean existsByUsername(String username);

    // ✅ 自定义复杂查询
    @Query("SELECT u FROM User u WHERE u.email = :email AND u.deleted = false")
    Optional<User> findActiveByEmail(@Param("email") String email);
}
```

**关键点**:

- Repository 是接口,不包含业务逻辑
- 用方法名表达查询意图,不需要写实现
- 可以用 `@Query` 自定义复杂查询
  :::

### 2.5 Domain 层:领域模型的"蓝图"

<DomainModelDemo />

**职责**:

- 定义业务实体(Entity)
- 定义值对象(Value Object)
- 封装业务规则
- 作为所有层的共同依赖

**重要特性**:

- Domain 层不依赖任何其他层
- 所有层都依赖 Domain 层
- 是分层架构的基础

**类比**:就像餐厅的菜单和菜品标准,定义了什么是"宫保鸡丁"、用什么食材、什么口味。所有厨师都要按照这个标准来做。

::: details 📋 实际代码示例

```java
// ✅ 实体(Entity):有唯一标识的业务对象
@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String username;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String email;

    // ✅ 业务方法:封装业务规则
    public boolean isPasswordCorrect(String rawPassword) {
        return BCrypt.checkpw(rawPassword, this.password);
    }

    public void changePassword(String oldPassword, String newPassword) {
        if (!isPasswordCorrect(oldPassword)) {
            throw new IncorrectPasswordException();
        }
        this.password = BCrypt.hashpw(newPassword);
    }
}

// ✅ 值对象(Value Object):通过属性值判断相等
@Embeddable
public class Email {

    @Column(nullable = false)
    private String address;

    public Email(String address) {
        if (!isValidEmail(address)) {
            throw new InvalidEmailException();
        }
        this.address = address;
    }

    private boolean isValidEmail(String address) {
        return address.matches("^[A-Za-z0-9+_.-]+@(.+)$");
    }

    // ✅ 值对象不通过ID判断相等,而是通过属性值
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Email)) return false;
        return address.equals(((Email) o).address);
    }
}
```

**关键点**:

- Entity 有唯一标识,Value Object 通过属性值判断相等
- 业务规则封装在 Domain 对象中,而不是散落在 Service 层
- Domain 层是纯粹的业务逻辑,不依赖框架
  :::

---

## 3. DTO:层与层之间的"翻译官"

### 3.1 为什么需要 DTO?

<DtoFlowDemo />

想象一下:如果 Controller 直接把数据库实体(Entity)返回给前端,会发生什么?

```java
// ❌ 错误的做法
@Entity
public class User {
    @Id
    private Long id;
    private String username;
    private String password;        // 敏感信息!
    private String phone;
    private String email;
    private LocalDateTime createdAt;
    private Boolean isDeleted;    // 内部字段!
}

// 如果直接返回这个实体...
// 前端会收到 password、isDeleted 等不应该暴露的字段
```

::: tip 💡 通俗解释
**DTO**(Data Transfer Object,数据传输对象)就像"菜单翻译":

- 厨师的菜谱(Domain Entity)包含:食材清单、烹饪步骤、火候、摆盘要求
- 给客人看的菜单(Controller Response DTO)只包含:菜名、价格、图片、简介

**为什么要翻译**:

1. **安全**:不能把"后厨秘密"(如密码、删除标记)暴露给客人
2. **简化**:客人只关心"这道菜是什么",不关心"怎么做的"
3. **灵活**:同一道菜,堂食菜单和外卖菜单显示的内容可以不同
   :::

**DTO 的作用**:

- **解耦**:隔离数据库实体和 API 契约
- **安全**:控制暴露的字段,避免泄露敏感信息
- **灵活**:可以为不同场景定义不同的 DTO
- **性能**:避免加载不必要的数据

### 3.2 不同层的 DTO 职责

| 层级           | DTO 类型               | 职责                                        | 示例                |
| -------------- | ---------------------- | ------------------------------------------- | ------------------- |
| **Controller** | Request / Response DTO | 定义 API 契约、参数校验、序列化             | `UserCreateRequest` |
| **Service**    | Param / Result DTO     | 封装业务方法参数,解耦 Controller 与 Service | `UserCreateParam`   |
| **Repository** | Entity / DO            | 映射数据库表结构,ORM 映射                   | `UserEntity`        |

---

## 4. 依赖方向:分层架构的铁律

### 4.1 依赖倒置原则(DIP)

<DependencyDirectionDemo />

分层架构的核心规则:**上层模块不应依赖下层模块的具体实现,而应依赖于抽象。**

::: tip 💡 通俗解释
**依赖倒置**(Dependency Inversion Principle):

**错误的做法**(依赖实现):

```
Controller → UserServiceImpl → UserDaoImpl → UserEntity
```

问题:

1. 每层都耦合了具体实现,换个实现要改很多代码
2. 测试困难,Mock 需要修改实现类

**正确的做法**(依赖抽象):

```
Controller → IUserService(接口) → IUserDao(接口) → UserEntity
```

好处:

1. 上层只依赖接口,不关心实现
2. 换实现只需改配置(如从 MySQL 换到 PostgreSQL)
3. 容易 Mock 测试

**比喻**:

- ❌ 错误:你只去某家特定的超市买东西,超市关门你就买不到
- ✅ 正确:你定义"买东西"这个接口,可以去任何超市实现
  :::

### 4.2 正确的依赖方向

```
✅ 正确的依赖方向:

Controller → Service 接口 → Repository 接口 → Domain
    ↑           ↑                ↑              ↑
    └-----------└----------------└--------------┘
    所有层都依赖 Domain,Domain 不依赖任何层

❌ 禁止的做法:
- Service 直接依赖 Repository 实现
- Controller 直接操作数据库
- Domain 依赖 Service 或 Repository
- 层与层之间形成循环依赖
```

---

## 5. 实战案例:电商订单系统的分层实现

### 5.1 需求场景

实现一个电商订单创建功能:

- 用户选择商品,确认订单信息
- 系统检查库存
- 计算订单金额(商品价格 + 运费 - 优惠)
- 创建订单记录
- 扣减库存
- 返回订单信息

::: details 📋 完整的四层代码
**1. Domain 层:领域模型**

```java
// 订单实体
@Entity
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;
    private List<OrderItem> items = new ArrayList<>();
    @Embedded
    private Money totalAmount;
    private OrderStatus status = OrderStatus.PENDING_PAYMENT;
    private LocalDateTime createdAt = LocalDateTime.now();

    // ✅ 业务方法:计算订单总金额
    public void calculateTotal() {
        Money total = Money.zero();
        for (OrderItem item : items) {
            total = total.add(item.getSubTotal());
        }
        this.totalAmount = total;
    }

    // ✅ 业务方法:取消订单
    public void cancel() {
        if (this.status != OrderStatus.PENDING_PAYMENT) {
            throw new IllegalStateException("只有待支付订单可以取消");
        }
        this.status = OrderStatus.CANCELLED;
    }
}

// 值对象:金钱
@Embeddable
public class Money {
    private BigDecimal amount;
    private String currency;

    public static Money zero() {
        return new Money(BigDecimal.ZERO, "CNY");
    }
}
```

**2. Repository 层:数据访问**

```java
@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByUserIdOrderByCreatedAtDesc(Long userId);
}

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    // Spring Data JPA 自动实现
}
```

**3. Service 层:业务逻辑**

```java
@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;
    private final ProductService productService;
    private final InventoryService inventoryService;

    @Transactional
    public OrderDTO createOrder(OrderCreateParam param) {
        // 1. 验证商品并扣减库存
        List<OrderItem> items = new ArrayList<>();
        for (OrderItemParam itemParam : param.getItems()) {
            Product product = productService.getProduct(itemParam.getProductId());

            boolean reserved = inventoryService.reserveStock(
                itemParam.getProductId(),
                itemParam.getQuantity()
            );
            if (!reserved) {
                throw new InsufficientStockException();
            }

            OrderItem item = new OrderItem();
            item.setProductId(product.getId());
            item.setQuantity(itemParam.getQuantity());
            items.add(item);
        }

        // 2. 创建订单
        Order order = new Order();
        order.setUserId(param.getUserId());
        for (OrderItem item : items) {
            order.addItem(item);
        }

        // 3. 计算总价(调用 Domain 方法)
        order.calculateTotal();

        // 4. 保存订单
        orderRepository.save(order);

        return OrderDTO.from(order);
    }
}
```

**4. Controller 层:API 入口**

```java
@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    @PostMapping
    public ResponseEntity<OrderDTO> createOrder(
            @RequestBody @Valid OrderCreateRequest request,
            @AuthenticationPrincipal UserPrincipal user) {

        // 1. Request → Param 转换
        OrderCreateParam param = OrderCreateParam.builder()
                .userId(user.getId())
                .items(request.getItems())
                .build();

        // 2. 调用 Service
        OrderDTO order = orderService.createOrder(param);

        // 3. 返回
        return ResponseEntity.status(HttpStatus.CREATED).body(order);
    }
}
```

:::

---

## 6. 分层架构的演进:从混乱到整洁

### 6.1 初学者常犯的错误

::: details ❌ 错误一:Controller 里写业务逻辑

```java
// ❌ 错误:Controller 里写了太多业务逻辑
@RestController
public class OrderController {

    @Autowired private OrderRepository orderRepository;
    @Autowired private ProductRepository productRepository;

    @PostMapping("/orders")
    public Order createOrder(@RequestBody CreateOrderRequest request) {
        // ❌ 太多的业务逻辑在这里...
        // 检查库存
        for (ItemRequest item : request.getItems()) {
            Product product = productRepository.findById(item.getProductId())
                .orElseThrow(() -> new RuntimeException("商品不存在"));

            if (product.getStock() < item.getQuantity()) {
                throw new RuntimeException("库存不足");
            }
        }

        // ❌ 直接操作数据库
        Order order = new Order();
        orderRepository.save(order);

        return order;
    }
}
```

**重构后**:

```java
// ✅ Controller 只负责接收请求和返回响应
@RestController
public class OrderController {

    @Autowired
    private OrderService orderService;

    @PostMapping("/orders")
    public OrderDTO createOrder(@RequestBody @Valid CreateOrderRequest request) {
        OrderCreateParam param = OrderCreateParam.builder()
                .items(request.getItems())
                .build();

        Order order = orderService.createOrder(param);

        return OrderDTO.from(order);
    }
}
```

:::

::: details ❌ 错误二:循环依赖

```java
// ❌ 错误:Service 之间相互调用,形成循环依赖
@Service
public class OrderService {
    @Autowired
    private PaymentService paymentService;  // A 依赖 B
}

@Service
public class PaymentService {
    @Autowired
    private OrderService orderService;  // B 又依赖 A - 循环!
}
```

**解决方案:使用事件驱动**

```java
// ✅ 发布事件,而不是直接调用
@Service
public class OrderService {
    @Autowired
    private ApplicationEventPublisher eventPublisher;

    public void payOrder(Long orderId, PaymentParam param) {
        Order order = orderRepository.findById(orderId).orElseThrow();
        order.pay(param.getPaymentMethod());
        orderRepository.save(order);

        // ✅ 发布事件,解耦服务
        eventPublisher.publishEvent(new OrderPaidEvent(order));
    }
}

// ✅ PaymentService 监听事件
@Service
public class PaymentService {
    @EventListener
    @Transactional
    public void handleOrderPaid(OrderPaidEvent event) {
        // 处理支付相关逻辑
        createPaymentRecord(event);
    }
}
```

:::

---

## 7. 分层架构 vs 整洁架构

<CleanArchitectureDemo />

### 7.1 两种架构的对比

| 特性             | 传统分层架构         | 整洁架构               |
| ---------------- | -------------------- | ---------------------- |
| **依赖方向**     | 从上到下             | 从外到内               |
| **核心业务位置** | Service 层           | Domain 层(中心)        |
| **框架依赖**     | 较深(如 Spring)      | 较浅(通过接口隔离)     |
| **可测试性**     | 需要集成测试         | 核心可单元测试         |
| **学习曲线**     | 平缓                 | 较陡                   |
| **适用场景**     | 中小型项目、快速迭代 | 大型复杂业务、长期维护 |

::: tip 💡 核心区别
**传统分层架构**:

- 依赖方向:Controller → Service → Repository → Domain
- 框架(Spring)渗透到所有层
- Service 层既包含业务逻辑,也依赖框架

**整洁架构**:

- 依赖方向:所有层都指向中心(Domain)
- 通过接口隔离,框架只在外层
- Domain 层纯粹的业务逻辑,完全不依赖框架

**比喻**:

- 传统分层:像盖楼,从下往上建,地基很重要但可以被替换
- 整洁架构:像洋葱,核心业务在最内层,外层(框架)可以随时更换
  :::

### 7.2 如何选择?

**选择传统分层架构当...**

- 项目规模较小,业务相对简单
- 团队对 DDD 不熟悉
- 需要快速上线,验证市场
- 技术栈相对固定

**选择整洁架构当...**

- 业务复杂,领域模型丰富
- 需要长期维护和演进
- 需要频繁切换技术栈
- 团队有较强的设计能力

---

## 8. 总结:分层架构的核心要点

### 8.1 四层职责速查表

| 层级           | 主要职责                                   | 不该做的事                                   |
| -------------- | ------------------------------------------ | -------------------------------------------- |
| **Controller** | 接收请求、参数校验、调用 Service、返回响应 | 写业务逻辑、操作数据库、处理事务             |
| **Service**    | 业务逻辑编排、事务管理、协调 Repository    | 直接写 SQL、处理 HTTP、返回实体给 Controller |
| **Repository** | 数据访问、ORM 映射、查询封装               | 写业务逻辑、管理事务、依赖上层               |
| **Domain**     | 实体定义、业务规则、值对象                 | 依赖其他层、处理持久化、处理 HTTP            |

### 8.2 依赖方向铁律

```
✅ 正确的依赖方向:

Controller → Service 接口 → Repository 接口 → Domain
    ↑           ↑                ↑              ↑
    └-----------└----------------└--------------┘
    所有层都依赖 Domain,Domain 不依赖任何层

❌ 禁止的做法:
- Service 直接依赖 Repository 实现
- Controller 直接操作数据库
- Domain 依赖 Service 或 Repository
- 层与层之间形成循环依赖
```

### 8.3 编码最佳实践

1. **接口优先**:Service 和 Repository 都定义接口,实现类通过 Spring 注入
2. **DTO 隔离**:每层使用自己的 DTO,不要直接传递 Entity
3. **事务在 Service**:使用 `@Transactional` 在 Service 方法上控制事务
4. **异常处理**:Controller 统一处理异常,不要 try-catch 后吞掉异常
5. **贫血模型 vs 充血模型**:根据团队熟悉程度选择,但建议 Domain 有基本的行为方法

### 8.4 常见面试问题

**Q1:为什么要分层?不分层可以吗?**

> A:分层的目的是解耦和关注点分离。小项目可以不分层,但随着业务复杂度的增加,不分层会导致代码难以维护、测试困难、团队协作效率低下。

**Q2:Controller 层可以写业务逻辑吗?**

> A:不可以。Controller 应该只负责接收请求、调用 Service、返回响应。业务逻辑应该封装在 Service 层,这样代码可以被复用,也更容易测试。

**Q3:什么是贫血模型和充血模型?**

> A:贫血模型是指 Entity 只有 getter/setter,业务逻辑都在 Service 层。充血模型是指 Entity 包含业务方法(如 `order.cancel()`),封装了业务规则。DDD 推荐充血模型,但贫血模型更简单易懂。

**Q4:如何处理跨多个 Service 的事务?**

> A:可以在上层 Service 中使用 `@Transactional`,调用多个下层 Service。或者使用分布式事务方案(如 Seata),但会增加系统复杂度。

---

## 9. 名词对照表

| 英文术语                 | 中文对照     | 解释                                  |
| ------------------------ | ------------ | ------------------------------------- |
| **Layered Architecture** | 分层架构     | 将系统划分为多个层次,每层有明确的职责 |
| **Controller**           | 控制器       | 接收 HTTP 请求,调用 Service,返回响应  |
| **Service**              | 服务         | 封装业务逻辑,协调多个 Repository      |
| **Repository**           | 仓储         | 封装数据访问逻辑,执行 CRUD 操作       |
| **Domain**               | 领域         | 定义业务实体、值对象和业务规则        |
| **DTO**                  | 数据传输对象 | 层与层之间传递数据的载体              |
| **Entity**               | 实体         | 有唯一标识的领域对象,对应数据库表     |
| **Value Object**         | 值对象       | 没有唯一标识,通过属性值判断相等的对象 |
| **Dependency Inversion** | 依赖倒置     | 高层模块不应依赖低层模块,都应依赖抽象 |
| **Transaction**          | 事务         | 保证一组操作原子性的机制              |
| **Clean Architecture**   | 整洁架构     | 以领域为核心的架构风格,强调依赖方向   |
| **Anemic Domain Model**  | 贫血模型     | 实体只有数据没有行为的模型            |
| **Rich Domain Model**    | 充血模型     | 实体包含数据和业务行为的模型          |

---

_本文档示例代码基于 Java + Spring Boot,但分层架构的思想适用于任何后端技术栈(Node.js、Python、Go 等)。_
