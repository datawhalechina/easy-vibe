# 云计算与常见云平台服务版图（可映射 AWS / 阿里云）

> **学习指南**：云服务器不是"买了就能用的玩具"，而是"需要精细运营的资产"。本章节会围绕一个核心问题展开：**如何在 AWS 和阿里云之间做出明智的技术选型？** 我们会用真实案例、成本对比和实战代码，帮你避开那些年我们踩过的坑。

在开始之前，建议你先了解：

- **基础概念**：如果你还不熟悉 VPC、EC2、ECS 等基本概念，建议先阅读本章节第 1-2 节。
- **成本意识**：云服务的计费模式复杂，建议先了解按需、预留、抢占式等计费方式。

---

## 0. 引言：为什么选对云服务商能省下一辆宝马？

想象一下这个场景：你是一家创业公司的技术负责人，公司刚刚获得了一笔融资，需要快速搭建线上业务。你面临着一系列选择：选哪家云服务商？用什么类型的服务器？如何规划架构才能既省钱又高效？

很多人第一次接触云服务时都会遇到类似的情况：

- 看着 AWS 和阿里云琳琅满目的服务列表，不知道从哪里下手
- 同样的配置，为什么账单差距能有 3 倍之多
- 项目上线后才发现，选的实例类型根本不适合业务场景
- 流量突增时，系统直接崩溃，因为没做弹性扩容

**直觉上，我们会以为是："这个服务商太贵了"。**

但大多数时候，问题并不在于价格本身，而在于我们**没有理解不同云服务的定位和适用场景**。

面对这些挑战，单纯比价已经捉襟见肘。我们需要一套更系统的选型方法论，来在功能、性能、成本之间找到最佳平衡点。这正是本章试图解决的问题。

<CloudServicesMapDemo />

---

## 1. 云服务版图全景：AWS vs 阿里云核心服务映射

先给出一个简短的服务对照表，再看几个典型场景。

> 云服务版图，本质上是一张"能力地图"，告诉我们：什么场景下该用什么工具。

### 1.1 核心计算服务对照表

| 服务类型 | AWS | 阿里云 | 典型场景 |
|----------|-----|--------|----------|
| **虚拟服务器** | EC2 | ECS | 通用计算、Web 服务 |
| **无服务器函数** | Lambda | 函数计算 FC | 事件驱动、API 后端 |
| **容器编排** | EKS | ACK | 微服务、容器化应用 |
| **Serverless 容器** | Fargate | ECI | 无需管理服务器的容器 |
| **批处理** | Batch | 批量计算 | 定时任务、数据处理 |

👇 **动手点点看**：
点击上方的服务版图，查看 AWS 和阿里云各层服务的详细对比。

<AwsVsAliyunDemo />

### 1.2 真实踩坑案例：为什么同样的配置，账单差了 3 倍？

**案例背景**：
某创业公司开发了一款 SaaS 产品，初期选择了 AWS EC2 t3.medium 实例（2核4G），按月运行约 500 小时。上线 3 个月后，账单让他们大吃一惊：实际支出比预期高出近 3 倍。

**问题诊断**：

| 问题点 | 预期 | 实际 | 浪费比例 |
|--------|------|------|----------|
| 实例选型 | t3.medium 足够 | 峰值时 CPU 积分耗尽，被迫升配 | 40% |
| 计费模式 | 按需付费灵活 | 未使用预留实例折扣 | 35% |
| 存储配置 | 默认 100GB GP2 | 实际只用 30GB，且未用 GP3 | 15% |
| 网络传输 | 预估 500GB/月 | 实际 2TB（未用 CDN） | 10% |

**解决方案**：

1. **更换实例家族**：从 t3 改为 m6g（Graviton2），性能提升 40%，价格降低 20%
2. **购买 Savings Plans**：承诺 1 年 Compute Savings Plan，节省 35%
3. **优化存储**：改用 GP3 卷，IOPS 提升 4 倍，成本降低 20%
4. **启用 CloudFront**：缓存静态资源，减少 70% 源站流量

**最终效果**：
- 月度账单从 $1,200 降至 $420
- 性能提升 50%（响应时间从 200ms 降至 100ms）
- 为下一阶段用户增长预留了 3 倍容量空间

**核心启示**：
> 云服务不是"买了就能用"，而是"需要持续优化"。第一次选型正确只能解决 20% 的问题，剩下的 80% 需要在运营过程中不断调整。

---

## 2. 计算服务选型：从 EC2/ECS 到函数计算

### 2.1 计算服务的四种"性格"

如果把云服务器比作交通工具，那么：

| 服务类型 | 交通工具类比 | 特点 | 适用场景 |
|----------|-------------|------|----------|
| **虚拟服务器 (EC2/ECS)** | 私家车 | 完全掌控，但需自己驾驶 | 需要自定义环境、长期运行的应用 |
| **无服务器函数 (Lambda/FC)** | 出租车 | 随叫随到，按行程付费 | 事件驱动、短时任务、API 后端 |
| **容器服务 (EKS/ACK)** | 公交车 | 标准化路线，多人共享 | 微服务架构、需要编排的容器化应用 |
| **Serverless 容器 (Fargate/ECI)** | 网约车 | 无需养车，随叫随走 | 不想管理服务器但需要容器化的场景 |

👇 **动手点点看**：
拖动滑块调整您的业务场景参数，获取最佳计算方案推荐。

<ComputeServicesDemo />

### 2.2 实战代码：AWS Lambda vs 阿里云函数计算

**场景**：构建一个简单的图片缩略图生成服务。

**AWS Lambda (Python)**：

```python
import json
import boto3
from PIL import Image
import io

s3 = boto3.client('s3')

def lambda_handler(event, context):
    # 从 S3 事件获取图片信息
    bucket = event['Records'][0]['s3']['bucket']['name']
    key = event['Records'][0]['s3']['object']['key']

    # 下载原图
    response = s3.get_object(Bucket=bucket, Key=key)
    image = Image.open(io.BytesIO(response['Body'].read()))

    # 生成缩略图
    thumbnail = image.copy()
    thumbnail.thumbnail((200, 200))

    # 上传缩略图
    thumbnail_key = key.replace('uploads/', 'thumbnails/')
    buffer = io.BytesIO()
    thumbnail.save(buffer, format='JPEG')
    s3.put_object(
        Bucket=bucket,
        Key=thumbnail_key,
        Body=buffer.getvalue(),
        ContentType='image/jpeg'
    )

    return {
        'statusCode': 200,
        'body': json.dumps({
            'message': 'Thumbnail created successfully',
            'thumbnail': thumbnail_key
        })
    }
```

**阿里云函数计算 (Python)**：

```python
import json
import oss2
from PIL import Image
import io
import os

# 从环境变量获取 OSS 配置
OSS_ENDPOINT = os.environ['OSS_ENDPOINT']
OSS_BUCKET = os.environ['OSS_BUCKET']
OSS_ACCESS_KEY = os.environ['OSS_ACCESS_KEY']
OSS_SECRET_KEY = os.environ['OSS_SECRET_KEY']

def handler(event, context):
    # 解析 OSS 事件
    evt = json.loads(event)
    oss_event = evt['events'][0]
    bucket_name = oss_event['oss']['bucket']['name']
    object_key = oss_event['oss']['object']['key']

    # 初始化 OSS 客户端
    auth = oss2.Auth(OSS_ACCESS_KEY, OSS_SECRET_KEY)
    bucket = oss2.Bucket(auth, OSS_ENDPOINT, bucket_name)

    # 下载原图
    object_stream = bucket.get_object(object_key)
    image = Image.open(io.BytesIO(object_stream.read()))

    # 生成缩略图
    thumbnail = image.copy()
    thumbnail.thumbnail((200, 200))

    # 上传缩略图
    thumbnail_key = object_key.replace('uploads/', 'thumbnails/')
    buffer = io.BytesIO()
    thumbnail.save(buffer, format='JPEG')
    bucket.put_object(thumbnail_key, buffer.getvalue())

    return {
        'statusCode': 200,
        'body': json.dumps({
            'message': '缩略图生成成功',
            'thumbnail': thumbnail_key
        })
    }
```

**成本对比（每月 100 万次调用）**：

| 服务商 | 计算费用 | 请求费用 | 总费用 | 特点 |
|--------|----------|----------|--------|------|
| AWS Lambda | $0（前 1M 免费） | $0.20/百万 | ~$0.20 | 免费额度高，超出后贵 |
| 阿里云 FC | $0（前 100万 免费） | ¥0.0133/万次 | ~¥1.33 | 国内价格低，但免费额度少 |

---

## 3. 存储服务选型：对象存储 vs 块存储 vs 文件存储

### 3.1 存储服务的"三种形态"

如果把数据存储比作"存东西"，那么：

| 存储类型 | 现实类比 | 数据访问方式 | 典型场景 |
|----------|----------|--------------|----------|
| **对象存储 (S3/OSS)** | 仓库 | 通过唯一 ID 访问，扁平结构 | 图片、视频、备份、静态网站 |
| **块存储 (EBS/云盘)** | 硬盘 | 挂载到服务器，裸设备访问 | 数据库、需要文件系统的应用 |
| **文件存储 (EFS/NAS)** | 共享文件夹 | 通过文件路径访问，层次结构 | 共享文件、内容管理、HPC |

👇 **动手点点看**：
选择您的存储场景，查看 AWS 和阿里云的对应服务及选型建议。

<StorageServicesDemo />

---

## 4. 网络服务选型：VPC、负载均衡与 CDN

### 4.1 网络服务的"交通规划"

如果把云网络比作"城市交通系统"，那么：

| 网络服务 | 交通类比 | 核心功能 | 典型场景 |
|----------|----------|----------|----------|
| **VPC/专有网络** | 封闭小区 | 逻辑隔离的网络环境 | 多应用隔离、安全合规 |
| **ELB/SLB** | 交通调度员 | 流量分发、故障转移 | 高可用 Web 服务、应用集群 |
| **CloudFront/CDN** | 快递站点 | 边缘缓存、就近访问 | 静态资源加速、全球分发 |
| **Direct Connect** | 专属通道 | 专线连接、低延迟 | 混合云、大数据传输 |

👇 **动手点点看**：
探索 AWS 和阿里云网络服务的架构差异和选型建议。

<NetworkServicesDemo />

---

## 5. 安全与身份认证服务

### 5.1 云安全的"三道防线"

| 安全层次 | AWS 服务 | 阿里云服务 | 核心功能 |
|----------|----------|------------|----------|
| **身份认证** | IAM | RAM | 用户管理、权限控制、访问密钥 |
| **网络安全** | WAF + Shield | WAF + 高防 | DDoS 防护、Web 攻击防护 |
| **数据安全** | KMS | KMS | 密钥管理、数据加密 |

👇 **动手点点看**：
对比 AWS IAM 和阿里云 RAM 的功能差异和最佳实践。

<SecurityServicesDemo />

---

## 6. 计费模式与成本优化

### 6.1 云服务的"四种买票方式"

| 计费模式 | 类比 | 适用场景 | 节省潜力 |
|----------|------|----------|----------|
| **按需付费** | 单买票 | 测试环境、短期项目 | 0%（基准） |
| **预留实例** | 月票/年票 | 长期稳定负载 | 30-60% |
| **抢占式实例** | 候补票 | 容错批处理任务 | 60-90% |
| **无服务器** | 计程车 | 事件驱动、流量波动大 | 视场景 40-70% |

👇 **动手点点看**：
计算不同计费模式下的成本对比和最优选择。

<PricingModelDemo />

---

## 7. 实战：如何选择适合你的云服务组合？

### 7.1 场景化选型决策树

👇 **动手点点看**：
根据您的业务场景，获取定制化的云服务选型建议。

<ServiceSelectionDemo />

---

## 名词对照表

| 英文术语 | 中文对照 | 解释 |
|----------|----------|------|
| **EC2** | 弹性计算云 | AWS 的虚拟服务器服务，类似阿里云的 ECS |
| **ECS** | 弹性计算服务 | 阿里云的虚拟服务器服务，类似 AWS 的 EC2 |
| **Lambda** | 无服务器函数 | AWS 的事件驱动计算服务，类似阿里云的函数计算 |
| **VPC** | 虚拟私有云 | 隔离的网络环境，AWS 和阿里云都有同名服务 |
| **S3** | 简单存储服务 | AWS 的对象存储，类似阿里云的 OSS |
| **OSS** | 对象存储服务 | 阿里云的对象存储，类似 AWS 的 S3 |
| **RDS** | 关系型数据库服务 | 托管的数据库服务，AWS 和阿里云都有 |
| **IAM** | 身份与访问管理 | 权限管理服务，AWS 和阿里云都有同名服务 |
| **ELB/SLB** | 负载均衡 | 流量分发服务，AWS 叫 ELB，阿里云叫 SLB |
| **CloudFront/CDN** | 内容分发网络 | 全球加速服务，AWS 叫 CloudFront，阿里云叫 CDN |

---

## 总结：云选型的本质

通过本章的学习，我们可以得出几个核心结论：

**从实践来看**：
- 不是功能越多越好，而是匹配度越高越好
- 第一次选型只能解决 20% 的问题，剩下 80% 需要在运营中持续优化
- 多云策略不是"全都要"，而是"各取所长"

**从成本视角看**：
- 预留实例和 Savings Plans 是长期稳定负载的最优选择
- 抢占式/Spot 实例适合容错性高的批处理任务
- 无服务器架构在流量波动大的场景下最具成本优势

**从架构视角看**：
- 计算服务的选择决定了系统的弹性和扩展能力
- 存储服务的选择影响了数据的可靠性和访问速度
- 网络服务的选择直接关系到用户体验和安全性

目标是：在给定的业务需求和预算约束下，让每一个云资源的投入都产生最大化的业务价值。
