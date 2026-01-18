# 线上运维：从监控到故障排查 (Interactive Guide to Operations)

> 💡 **学习指南**：本章节无需编程基础，通过交互式演示带你了解运维的完整知识体系。从监控告警到故障排查，从容量规划到自动化运维，全面掌握线上系统运维技能。

## 0. 引言：系统上线只是开始

很多新手认为："代码部署上线，任务就完成了。"

**大错特错！**

系统上线只是**运维工作的起点**。就像买了一辆新车，后续的保养、维修、加油才是常态。

运维的目标有三个：

1. **稳定性 (Stability)**：系统不宕机，服务一直可用
2. **性能 (Performance)**：响应快速，用户体验好
3. **安全 (Security)**：数据不泄露，防止被攻击

---

## 1. 监控体系 (Monitoring)

监控是运维的"眼睛"。没有监控的系统就像盲人开车，出了问题都不知道。

### 1.1 监控的三个层次

<MonitoringDashboardDemo />

**基础设施监控**：关注服务器硬件资源

- CPU 使用率
- 内存使用率
- 磁盘空间和 I/O
- 网络带宽

**应用监控**：关注软件运行状态

- QPS（每秒请求数）
- 响应时间（延迟）
- 错误率
- 依赖服务调用情况

**业务监控**：关注业务健康度

- DAU/MAU（日活/月活）
- 订单量
- 支付成功率
- 用户留存率

### 1.2 监控工具栈

| 工具           | 用途           | 特点                     |
| :------------- | :------------- | :----------------------- |
| **Prometheus** | 指标采集与存储 | 时序数据库，适合监控数据 |
| **Grafana**    | 可视化面板     | 强大的图表和 dashboard   |
| **Zabbix**     | 综合监控       | 老牌工具，功能全面       |
| **Datadog**    | SaaS 监控平台  | 一站式解决方案，收费     |

**关键点**：监控要分层，从基础设施到业务全方位覆盖，避免"盲区"。

---

## 2. 告警系统 (Alerting)

监控发现问题后，需要及时通知运维人员，这就是**告警**。

### 2.1 告警流程

<AlertFlowDemo />

### 2.2 告警级别设计

合理的告警分级能避免"告警疲劳"：

| 级别   | 响应时间        | 典型场景                   | 通知渠道           |
| :----- | :-------------- | :------------------------- | :----------------- |
| **P0** | 立即（5分钟内） | 核心服务宕机、支付失败     | 电话 + 短信 + 钉钉 |
| **P1** | 30分钟内        | 部分功能异常、性能严重下降 | 短信 + 钉钉 + 邮件 |
| **P2** | 当天处理        | 资源使用率偏高、偶发错误   | 钉钉 + 邮件        |
| **P3** | 本周处理        | 非核心问题、优化建议       | 邮件               |

### 2.3 告警收敛与降噪

**痛点**：一个小问题可能触发成百上千条告警，导致值班人员麻木。

**解决方案**：

1. **告警分组**：相似告警合并（如同一台服务器的多个问题合并为一条）
2. **告警抑制**：如果父问题已触发，子问题不重复告警
3. **静默规则**：维护期间自动暂停告警
4. **频率限制**：同一告警短时间内不重复通知

**关键点**：告警要"少而精"，每条都要值得处理。

---

## 3. 日志管理 (Logging)

日志是排查问题的"黑匣子"。

### 3.1 日志分级

```javascript
console.debug('详细调试信息') // 开发时使用
console.info('一般信息') // 正常流程记录
console.warn('警告信息') // 潜在问题
console.error('错误信息') // 需要关注的错误
```

### 3.2 结构化日志

传统日志（不好）：

```
2024-01-15 10:23:45 ERROR User john failed to login, attempts=3, ip=192.168.1.100
```

结构化日志（推荐）：

```json
{
  "timestamp": "2024-01-15T10:23:45Z",
  "level": "ERROR",
  "message": "User login failed",
  "user": "john",
  "attempts": 3,
  "ip": "192.168.1.100",
  "service": "auth-service"
}
```

### 3.3 ELK 日志栈

**ELK = Elasticsearch + Logstash + Kibana**

- **Logstash**：日志采集和过滤
- **Elasticsearch**：日志存储和搜索
- **Kibana**：日志可视化查询

**最佳实践**：

- ✅ 敏感信息（密码、token）不要记入日志
- ✅ 关键操作（登录、支付、权限变更）必须记录
- ✅ 日志要包含上下文（用户 ID、请求 ID、时间戳）
- ✅ 定期清理过期日志，避免磁盘爆满

---

## 4. 链路追踪 (Tracing)

在微服务架构中，一个请求可能经过十几个服务，如何追踪它的完整路径？

**Trace ID 和 Span ID**

- **Trace ID**：整个请求链路的唯一标识（像快递单号）
- **Span ID**：单个服务调用的标识（像每个中转站）

### 4.1 分布式追踪演示

<TraceVisualizationDemo />

### 4.2 OpenTelemetry 标准

OpenTelemetry (OTel) 是链路追踪的**行业标准**，提供统一的 API 和 SDK。

```javascript
// 示例：使用 OpenTelemetry 记录 Span
import { trace } from '@opentelemetry/api'

const tracer = trace.getTracer('my-service')

async function processOrder(orderId) {
  // 创建一个 Span
  const span = tracer.startSpan('processOrder')

  try {
    // 设置属性
    span.setAttribute('order.id', orderId)

    // 业务逻辑...
    await validateOrder(orderId)
    await saveToDatabase(orderId)

    span.setStatus({ code: SpanStatusCode.OK })
  } catch (error) {
    span.recordException(error)
    span.setStatus({ code: SpanStatusCode.ERROR, message: error.message })
  } finally {
    span.end() // 结束 Span
  }
}
```

**关键点**：链路追踪能快速定位性能瓶颈和故障点，是微服务必备工具。

---

## 5. 故障排查流程

线上故障不可避免，关键是**快速响应、快速恢复**。

### 5.1 故障处理流程

<IncidentResponseDemo />

### 5.2 常用排查工具

| 工具         | 用途         | 典型场景                 |
| :----------- | :----------- | :----------------------- |
| **tcpdump**  | 抓包分析     | 网络不通、数据包丢失     |
| **strace**   | 追踪系统调用 | 进程卡住、文件权限问题   |
| **Arthas**   | Java 诊断    | CPU 飙高、内存泄漏、死锁 |
| **top/htop** | 系统资源监控 | CPU/内存占用高           |
| **netstat**  | 网络连接查看 | 端口占用、连接数异常     |
| **lsof**     | 查看打开文件 | 文件被占用、磁盘满       |

**Arthas 示例**（阿里开源的 Java 诊断工具）：

```bash
# 查看 CPU 最高的前 5 个线程
$ top -H -p 12345

# 查看某个方法的调用耗时
$ trace com.example.OrderService createOrder

# 查看类的静态字段
$ getstatic com.example.Config MAX_CONNECTIONS

# 热更新代码（无需重启）
$ mc /tmp/Test.java
$ redefine /tmp/Test.class
```

### 5.3 故障复盘 (Post-mortem)

**复盘不是追责会！**

复盘的目的是：

1. 梳理故障时间线
2. 找出根本原因 (Root Cause Analysis)
3. 总结经验教训
4. 制定改进措施

**5 Why 分析法**：

问"为什么"至少 5 次，找到根本原因：

- 为什么服务宕机？
  - 因为内存溢出
- 为什么内存溢出？
  - 因为缓存数据过多
- 为什么缓存数据过多？
  - 因为没有设置过期时间
- 为什么没有设置过期时间？
  - 因为开发时遗漏了
- **根本原因**：缺少代码审查和测试用例

**关键点**：建立 blameless 文化，关注流程改进而非个人责任。

---

## 6. 性能优化

### 6.1 性能瓶颈分析

**从上到下的优化思路**：

```
用户感知
  ↓
前端优化（减少请求、CDN、懒加载）
  ↓
网络优化（HTTP/2、压缩、长连接）
  ↓
后端优化（缓存、异步、批处理）
  ↓
数据库优化（索引、查询优化、分库分表）
  ↓
系统优化（内核参数、JVM 调优）
```

### 6.2 数据库优化

**索引优化**：

```sql
-- 查询慢（无索引）
SELECT * FROM orders WHERE user_id = 12345;

-- 创建索引后快 100 倍
CREATE INDEX idx_user_id ON orders(user_id);
```

**查询优化**：

```sql
-- ❌ 避免 SELECT *
SELECT * FROM users WHERE id = 123;

-- ✅ 只查需要的字段
SELECT id, name, email FROM users WHERE id = 123;

-- ❌ 避免 IN 子句太多
SELECT * FROM orders WHERE user_id IN (1, 2, 3, ..., 10000);

-- ✅ 使用 JOIN 或批量查询
SELECT * FROM orders o JOIN user_ids u ON o.user_id = u.id;
```

### 6.3 缓存优化

**多级缓存架构**：

```
浏览器缓存 (CDN)
  ↓
本地缓存 (内存/Guava)
  ↓
分布式缓存 (Redis/Memcached)
  ↓
数据库 (MySQL/PostgreSQL)
```

**缓存更新策略**：

| 策略              | 优点         | 缺点         | 适用场景                 |
| :---------------- | :----------- | :----------- | :----------------------- |
| **Cache-Aside**   | 简单、可靠   | 首次查询慢   | 读多写少                 |
| **Write-Through** | 数据一致性好 | 写入慢       | 读写均衡                 |
| **Write-Behind**  | 写入极快     | 可能丢失数据 | 写多读少、允许短时不一致 |

**关键点**：缓存不是银弹，要考虑一致性、雪崩、穿透等问题（参考《系统缓存设计》章节）。

---

## 7. 容量规划

### 7.1 容量评估

<CapacityPlanningDemo />

### 7.2 压力测试

**工具选择**：

| 工具       | 特点                | 适用场景      |
| :--------- | :------------------ | :------------ |
| **JMeter** | 功能强大、可视化    | HTTP 接口压测 |
| **wrk/ab** | 轻量、命令行        | 快速基准测试  |
| **Locust** | Python 脚本、分布式 | 复杂场景压测  |
| **K6**     | 现代、JS 脚本       | CI/CD 集成    |

**wrk 示例**：

```bash
# 安装 wrk
$ brew install wrk  # macOS
$ apt install wrk   # Ubuntu

# 压测 HTTP 接口（10 线程，持续 30 秒）
$ wrk -t10 -c100 -d30s http://example.com/api/users

# 输出：
# Running 30s test @ http://example.com/api/users
#   10 threads and 100 connections
#   Thread Stats   Avg      Stdev     Max   +/- Stdev
#     Latency    45.32ms   12.45ms 120.50ms   87.56%
#     Req/Sec     2.12k   123.45    3.45k    89.01%
#   632450 requests in 30.00s, 1.23GB read
# Requests/sec:  21081.67
```

### 7.3 弹性扩缩容

**云原生时代的自动扩缩容**：

```yaml
# Kubernetes HPA (Horizontal Pod Autoscaler)
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: my-app-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: my-app
  minReplicas: 2
  maxReplicas: 10
  metrics:
    - type: Resource
      resource:
        name: cpu
        target:
          type: Utilization
          averageUtilization: 70
```

**当 CPU 使用率超过 70% 时，自动扩容 Pod（最多 10 个）**

**关键点**：结合业务预测（如双 11）提前扩容，避免来不及。

---

## 8. 安全运维

### 8.1 访问控制

**最小权限原则**：

- 开发人员只能访问开发环境
- 运维人员只能访问生产环境，且需要审批
- 数据库敏感操作需要二次确认

**堡垒机 (Jump Server)**：

所有运维操作通过堡垒机进行，记录完整操作日志。

### 8.2 数据备份

**3-2-1 备份原则**：

- **3**份数据副本（1 份原始 + 2 份备份）
- **2**种不同存储介质（本地磁盘 + 云存储）
- **1**份异地备份（防止单点灾难）

**备份策略**：

| 类型         | 频率 | 保留时间 | RTO    | RPO     |
| :----------- | :--- | :------- | :----- | :------ |
| **全量备份** | 每周 | 1 个月   | 4 小时 | 24 小时 |
| **增量备份** | 每天 | 1 周     | 2 小时 | 1 小时  |
| **实时备份** | 秒级 | 7 天     | 分钟级 | 秒级    |

**RTO (Recovery Time Objective)**：恢复时间目标（服务最多中断多久）
**RPO (Recovery Point Objective)**：恢复点目标（最多丢失多少数据）

### 8.3 漏洞扫描

**定期扫描**：

- **代码扫描**：SonarQube、ESLint（发现潜在漏洞）
- **依赖扫描**：npm audit、Snyk（检测第三方库漏洞）
- **容器扫描**：Trivy、Clair（检测镜像漏洞）

```bash
# npm audit 示例
$ npm audit

found 3 vulnerabilities (1 moderate, 2 high)

Package         Severity  Vulnerable versions
lodash          high      <4.17.21
express         moderate  4.0.0 - 4.18.2

# 自动修复
$ npm audit fix
```

---

## 9. 自动化运维 (DevOps)

### 9.1 CI/CD 流水线

```yaml
# .gitlab-ci.yml 示例
stages:
  - test
  - build
  - deploy

test:
  stage: test
  script:
    - npm install
    - npm test
  tags:
    - docker

build:
  stage: build
  script:
    - docker build -t myapp:$CI_COMMIT_SHA .
    - docker push registry.example.com/myapp:$CI_COMMIT_SHA
  only:
    - main

deploy:
  stage: deploy
  script:
    - kubectl set image deployment/myapp myapp=registry.example.com/myapp:$CI_COMMIT_SHA
  environment:
    name: production
  when: manual # 手动触发部署
```

### 9.2 基础设施即代码 (IaC)

**Terraform 示例**（管理云资源）：

```hcl
# main.tf
resource "aws_instance" "web" {
  ami           = "ami-0c55b159cbfafe1f0"
  instance_type = "t2.micro"

  tags = {
    Name = "WebServer"
    Env  = "production"
  }
}

resource "aws_security_group" "web" {
  name = "web-sg"

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}
```

**优势**：

- ✅ 版本控制：所有配置在 Git 中
- ✅ 可重复：环境一致性
- ✅ 可审计：变更历史清晰
- ✅ 可回滚：快速恢复到之前版本

### 9.3 GitOps 实践

**GitOps = Git + IaC + Automation**

核心理念：**Git 仓库是基础设施的唯一真实来源**

工作流程：

```
1. 修改配置文件（push 到 Git）
   ↓
2. Git 仓库变更触发 CI/CD
   ↓
3. 自动执行terraform apply/kubectl apply
   ↓
4. 基础设施自动更新
   ↓
5. 监控对比实际状态与期望状态
```

**工具**：ArgoCD、Flux（Kubernetes 部署）

---

## 10. 总结与最佳实践

运维是一个庞大的体系，但核心可以概括为：

### 10.1 运维成熟度模型

| 等级     | 特征               | 实践                           |
| :------- | :----------------- | :----------------------------- |
| **初级** | 被动响应，人工操作 | 出问题才处理，手工部署         |
| **中级** | 自动化，标准化     | CI/CD、监控告警、文档化        |
| **高级** | 预防为主，自愈     | 容量规划、故障演练、自动扩缩容 |
| **专家** | 智能化，无人值守   | AIOps、混沌工程、Serverless    |

### 10.2 运维工程师的一天

```
09:00 - 查看夜间告警，确认系统状态
10:00 - 处理用户反馈的问题
11:00 - 参加研发周会，评估新方案运维风险
14:00 - 优化慢查询，提升性能
15:00 - 代码审查（Code Review）
16:00 - 编写部署文档，更新监控规则
17:00 - 故障演练（Chaos Engineering）
18:00 - 值班交接
```

### 10.3 学习路线

**入门阶段**（1-3 个月）：

- 学会 Linux 常用命令
- 了解监控系统（Prometheus + Grafana）
- 掌握日志查询（ELK）

**进阶阶段**（3-6 个月）：

- 深入理解容器技术（Docker + K8s）
- 掌握一门诊断工具（Arthas、tcpdump）
- 实践 CI/CD 流水线

**高级阶段**（6-12 个月）：

- 性能调优（数据库、JVM、网络）
- 容量规划与成本优化
- 故障复盘与流程改进

**专家阶段**（1 年以上）：

- 架构设计（高可用、容灾）
- 混沌工程（主动注入故障）
- AIOps（智能运维）

---

## 11. 名词速查表 (Glossary)

| 名词            | 全称                              | 解释                                           |
| :-------------- | :-------------------------------- | :--------------------------------------------- |
| **Monitoring**  | -                                 | 监控，实时观测系统运行状态。                   |
| **Alerting**    | -                                 | 告警，异常时通知相关人员。                     |
| **Logging**     | -                                 | 日志，记录系统运行过程中的事件。               |
| **Tracing**     | -                                 | 链路追踪，跟踪请求在分布式系统中的完整路径。   |
| **QPS**         | Queries Per Second                | 每秒请求数，衡量系统吞吐量。                   |
| **Latency**     | -                                 | 延迟，请求从发出到响应的时间。                 |
| **RTO**         | Recovery Time Objective           | 恢复时间目标，服务最多中断多久。               |
| **RPO**         | Recovery Point Objective          | 恢复点目标，最多丢失多少数据。                 |
| **Post-mortem** | -                                 | 故障复盘，分析故障原因和改进措施。             |
| **CI/CD**       | Continuous Integration/Delivery   | 持续集成与持续交付，自动化测试与部署。         |
| **IaC**         | Infrastructure as Code            | 基础设施即代码，用代码管理服务器、网络等资源。 |
| **GitOps**      | -                                 | Git 运维，Git 仓库是基础设施的唯一真实来源。   |
| **ELK**         | Elasticsearch + Logstash + Kibana | 日志采集、存储、可视化三件套。                 |
| **SLA**         | Service Level Agreement           | 服务等级协议，承诺的服务可用性（如 99.9%）。   |
| **Blameless**   | -                                 | 无责备文化，复盘关注流程改进而非个人责任。     |

---

## 12. 延伸阅读

- **[系统缓存设计](/zh-cn/appendix/cache-design)** - 缓存原理、模式与最佳实践
- **[消息队列设计](/zh-cn/appendix/queue-design)** - 削峰填谷、异步解耦
- **[鉴权原理与实战](/zh-cn/appendix/auth-design)** - 认证授权、安全加固
- **[后端进化史](/zh-cn/appendix/backend-evolution)** - 从单体到微服务到 Serverless
- **[部署与上线](/zh-cn/appendix/deployment)** - 从开发到生产的最后一公里
