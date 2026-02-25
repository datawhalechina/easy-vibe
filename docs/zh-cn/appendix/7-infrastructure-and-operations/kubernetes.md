# Kubernetes 编排

::: tip 前言
**Docker 解决了"打包"问题，Kubernetes 解决了"管理"问题。** 当你有几十上百个容器需要部署、扩缩容、故障恢复时，手动管理是不现实的。Kubernetes（K8s）就是容器的"操作系统"，它自动化了容器化应用的部署、扩展和运维。
:::

**这篇文章会带你学什么？**

学完这章后，你将获得：

- **架构理解**：掌握 K8s 控制平面和工作节点的组成
- **核心资源**：熟悉 Pod、Deployment、Service 等核心概念
- **声明式管理**：理解"声明期望状态，系统自动收敛"的思想
- **运维能力**：了解滚动更新、自动扩缩容、健康检查等机制
- **实战入门**：能用 kubectl 和 YAML 部署一个完整应用

| 章节 | 内容 | 核心概念 |
|-----|------|---------|
| **第 1 章** | 为什么需要 K8s | 容器编排的挑战 |
| **第 2 章** | K8s 架构 | 控制平面、工作节点、etcd |
| **第 3 章** | 核心资源 | Pod、Deployment、Service、Ingress |
| **第 4 章** | 声明式管理 | YAML、kubectl、控制循环 |
| **第 5 章** | 运维实践 | 滚动更新、HPA、健康检查 |

---

## 1. 为什么需要 Kubernetes？

Docker 让单个容器的打包和运行变得简单，但当你面对以下场景时，手动管理就力不从心了：

| 挑战 | 描述 | K8s 的解决方案 |
|------|------|---------------|
| 多实例部署 | 一个服务需要运行 10 个副本 | Deployment 自动管理副本数 |
| 故障恢复 | 某个容器挂了需要自动重启 | 控制器自动检测并重建 Pod |
| 服务发现 | 容器 IP 会变，怎么找到对方？ | Service 提供稳定的 DNS 和 IP |
| 滚动更新 | 更新版本时不能停服 | 逐步替换旧 Pod，零停机 |
| 弹性伸缩 | 流量高峰自动扩容 | HPA 根据 CPU/内存自动调整副本数 |
| 资源调度 | 把容器放到最合适的机器上 | Scheduler 智能调度 |

::: tip K8s 的核心思想：声明式
你不需要告诉 K8s "启动 3 个容器"（命令式），而是告诉它 "我要 3 个副本在运行"（声明式）。K8s 会持续监控，确保实际状态与你声明的期望状态一致。如果一个 Pod 挂了，它会自动创建新的来补上。
:::

---

## 2. Kubernetes 架构

K8s 集群由控制平面（Control Plane）和工作节点（Worker Node）组成。

<K8sArchitectureDemo />

### 一次请求的完整路径

```
用户请求 → Ingress Controller → Service → kube-proxy → Pod（容器）
                                              ↑
                                    Endpoint 列表（由 Service 维护）
```

---

## 3. 核心资源对象

K8s 通过各种"资源对象"来描述集群的期望状态。

<K8sWorkloadsDemo />

### 资源对象分类

| 类别 | 资源 | 用途 |
|------|------|------|
| 工作负载 | Pod、Deployment、StatefulSet、DaemonSet、Job | 运行应用 |
| 网络 | Service、Ingress、NetworkPolicy | 服务发现和流量管理 |
| 配置 | ConfigMap、Secret | 配置和敏感数据管理 |
| 存储 | PersistentVolume、PersistentVolumeClaim | 持久化存储 |
| 调度 | Node、Namespace、ResourceQuota | 资源隔离和限制 |

---

## 4. 声明式管理与 kubectl

### 控制循环（Reconciliation Loop）

K8s 的核心工作机制是控制循环：

```
观察（Observe）→ 比较（Diff）→ 行动（Act）→ 观察...
     ↓                ↓              ↓
  读取实际状态    与期望状态对比    执行修正操作
```

你声明 `replicas: 3`，控制器发现只有 2 个 Pod 在运行，就会创建 1 个新的。这个循环每隔几秒执行一次，确保系统始终向期望状态收敛。

### kubectl 常用命令

| 命令 | 作用 | 示例 |
|------|------|------|
| `kubectl apply -f` | 应用 YAML 配置 | `kubectl apply -f deployment.yaml` |
| `kubectl get` | 查看资源列表 | `kubectl get pods -o wide` |
| `kubectl describe` | 查看资源详情 | `kubectl describe pod my-app-xxx` |
| `kubectl logs` | 查看 Pod 日志 | `kubectl logs -f my-app-xxx` |
| `kubectl exec` | 进入 Pod 终端 | `kubectl exec -it my-app-xxx -- sh` |
| `kubectl delete` | 删除资源 | `kubectl delete -f deployment.yaml` |
| `kubectl scale` | 手动扩缩容 | `kubectl scale deploy my-app --replicas=5` |

::: tip apply vs create
`kubectl create` 是命令式的——"创建这个资源"，如果已存在会报错。`kubectl apply` 是声明式的——"确保资源是这个状态"，不存在就创建，已存在就更新。生产环境中应该始终使用 `apply`。
:::

---

## 5. 运维实践

### 5.1 滚动更新与回滚

Deployment 默认使用滚动更新策略：逐步创建新版本 Pod，同时逐步终止旧版本 Pod。

```yaml
spec:
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1        # 最多多创建 1 个 Pod
      maxUnavailable: 0   # 不允许有 Pod 不可用
```

| 操作 | 命令 |
|------|------|
| 更新镜像 | `kubectl set image deploy/my-app app=my-app:2.0` |
| 查看更新状态 | `kubectl rollout status deploy/my-app` |
| 查看历史版本 | `kubectl rollout history deploy/my-app` |
| 回滚到上一版本 | `kubectl rollout undo deploy/my-app` |

### 5.2 自动扩缩容（HPA）

HPA（Horizontal Pod Autoscaler）根据 CPU、内存或自定义指标自动调整 Pod 副本数。

```yaml
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

### 5.3 健康检查（Probe）

K8s 通过三种探针监控 Pod 的健康状态：

| 探针 | 作用 | 失败后果 |
|------|------|---------|
| livenessProbe | 检测容器是否存活 | 重启容器 |
| readinessProbe | 检测容器是否就绪 | 从 Service 摘除，不接收流量 |
| startupProbe | 检测容器是否启动完成 | 启动期间不执行其他探针 |

::: tip 探针的重要性
没有配置健康检查的 Pod，K8s 只能通过进程是否存在来判断健康状态。但很多时候进程还在，服务已经不响应了（比如死锁、OOM 边缘）。配置 livenessProbe 可以让 K8s 自动重启这些"假死"的容器。
:::

---

## 总结

Kubernetes 是容器编排的事实标准，理解它的核心概念是云原生开发的基础。

回顾本章的关键要点：

1. **声明式管理**：告诉 K8s "我要什么"，而不是"怎么做"，控制循环自动收敛
2. **架构分层**：控制平面负责决策，工作节点负责执行，etcd 存储状态
3. **核心资源**：Pod（最小单元）、Deployment（副本管理）、Service（服务发现）、Ingress（外部入口）
4. **运维自动化**：滚动更新零停机、HPA 弹性伸缩、探针自动故障恢复
5. **配置分离**：ConfigMap 和 Secret 让配置与镜像解耦

## 延伸阅读

- [Kubernetes 官方文档](https://kubernetes.io/zh-cn/docs/) - 最权威的中文参考
- [Kubernetes the Hard Way](https://github.com/kelseyhightower/kubernetes-the-hard-way) - 从零手动搭建 K8s 集群
- [The Illustrated Children's Guide to Kubernetes](https://www.cncf.io/phippy/) - CNCF 出品的趣味入门
- [Kubernetes Patterns](https://www.oreilly.com/library/view/kubernetes-patterns-2nd/9781098131678/) - K8s 设计模式
