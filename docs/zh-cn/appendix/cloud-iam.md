# 云账号与权限管理模型：IAM / RAM 角色与权限关系

> **学习指南**：提示词工程解决的是"怎么把话说清楚"，云账号权限管理解决的是"谁能做什么事"。本章节会围绕一个问题展开：**在云端世界里，如何既能方便地授权，又不把钥匙交给不该给的人？**

在开始之前，建议你先补两块"基础砖"：

- **Token 是什么**：可以先阅读 [大语言模型入门](./llm-intro.md) 的「分词 & Token」部分。
- **Prompt 是什么**：如果你还不熟悉 System / User / Assistant 的基本结构，可以先看 [提示词工程](./prompt-engineering/)。

---

## 0. 引言：为什么刚上云就"踩雷"了？

<IamRamComparisonDemo />

很多人刚开始使用云服务时都会遇到类似的情况：

- 为了省事，直接把 AccessKey 写在代码里提交到 GitHub；
- 给所有员工都开了"管理员权限"，结果有人误删了生产数据库；
- 项目交接后，不知道谁手里还有旧员工的账号密码；
- 听说要开 MFA，但觉得"麻烦"就一直拖着没开。

直觉上，我们会以为是：**"这些员工安全意识不够"**。

但大多数时候，问题并不在于人，而在于**没有建立正确的权限管理体系**。

<IntroProblemReasonSolution />

面对这些挑战，单纯依靠"小心点操作"已经行不通了。我们需要一套系统的权限管理方法论，这正是**IAM（Identity and Access Management，身份与访问管理）**试图解决的问题。

---

## 1. 什么是 IAM/RAM？从"门禁系统"说起

### 1.1 类比：公司的智能门禁

想象一下，你们公司搬到了一栋新写字楼：

| 场景 | 没有 IAM 的做法 | 有 IAM 的做法 |
| :--- | :--- | :--- |
| 新员工入职 | 给他一把能开所有门的万能钥匙 | 给他一张门禁卡，只能刷他办公区域的门 |
| 员工离职 | 钥匙丢了就丢了，也不知道谁拿着 | 立即在系统里注销他的门禁卡，所有门都打不开了 |
| 外包人员 | 把钥匙借给他几天 | 发临时门禁卡，设置3天后自动失效 |
| 访客 | 前台配一把钥匙给他 | 发一次性访客码，只能进会议室 |

**IAM（Identity and Access Management，身份与访问管理）**，就像是这套"智能门禁系统"：

- **身份（Identity）**：谁？员工、外包、访客、应用程序
- **访问（Access）**：能进哪些门？能做什么操作？
- **管理（Management）**：怎么发钥匙、怎么收钥匙、怎么查记录

### 1.2 AWS IAM vs 阿里云 RAM

<IamRamComparisonDemo />

不同的云厂商都有自己的 IAM 实现：

| 云厂商 | 服务名称 | 核心概念 |
| :--- | :--- | :--- |
| **AWS** | IAM (Identity and Access Management) | User、Group、Role、Policy |
| **阿里云** | RAM (Resource Access Management) | 用户、用户组、角色、策略 |
| **腾讯云** | CAM (Cloud Access Management) | 用户、用户组、角色、策略 |
| **华为云** | IAM | 用户、用户组、委托、策略 |
| **Azure** | Azure AD + RBAC | User、Group、Role、RBAC |

虽然名字不同，但**核心概念都是相通的**：

- **用户（User）**：代表一个具体的人或应用程序
- **用户组（Group）**：批量管理一批用户的权限
- **角色（Role）**：定义一组权限，可以被"扮演"
- **策略（Policy）**：具体的权限规则（允许/拒绝做什么）

---

## 2. 用户、组、角色：到底该用哪个？

### 2.1 三种"身份"的区别

<IdentityProviderDemo />

用一个办公室的场景来类比：

| 概念 | 类比 | 适用场景 | 特点 |
| :--- | :--- | :--- | :--- |
| **用户（User）** | 正式员工，有自己的工位和门禁卡 | 长期、稳定的团队成员 | 有永久凭证（密码、AK/SK） |
| **用户组（Group）** | 部门，如"技术部"、"销售部" | 批量管理权限 | 不能登录，只是权限容器 |
| **角色（Role）** | 临时访客证、外包临时卡 | 临时授权、跨账号访问 | 没有永久凭证，靠"扮演"获取临时凭证 |

### 2.2 真实案例：一个创业公司的权限演进

**阶段一：创始团队（2-3人）**

```
问题：直接用根账号（Root Account）登录控制台，因为"省事"
风险：根账号拥有所有权限，一旦泄露整个账号就废了
```

**阶段二：团队扩张（5-10人）**

```
改进：给每个人创建 IAM User，分配不同权限
问题：
- 运维小王离职了，他的 AK/SK 散落在哪些服务器上？
- 新来的前端需要 S3 只读权限，后端需要 RDS 权限，手动一个个配太麻烦
```

**阶段三：规范化（10-30人）**

```
改进：
1. 按角色创建 IAM Group：
   - Developers（开发）：S3、EC2、RDS 读写
   - DevOps（运维）：全权限，但需要 MFA
   - ReadOnly（只读）：查看所有资源，不能修改
   - QAs（测试）：测试环境资源访问

2. 使用 IAM Role：
   - EC2 实例使用 Instance Profile，不再在服务器上放 AK/SK
   - 跨账号访问用 Role Assume，不用共享 AK/SK
   - CI/CD 用 OIDC Federation，不用存储长期凭证
```

**阶段四：多账号/企业级（30人+）**

```
架构：
- Master Account（主账号）：只用来管理账单和组织结构，不放任何资源
- Audit Account（审计账号）：收集所有账号的日志
- Dev Account（开发账号）：开发环境
- Staging Account（预发布账号）：测试环境
- Prod Account（生产账号）：线上环境，权限最严格

权限流转：
- 开发人员默认只有 Dev 账号的只读权限
- 需要修改生产环境时，提工单申请 Assume 到 Prod 的临时 Role
- 所有 Assume 操作都被 CloudTrail 记录，定期审计
```

---

## 3. 角色与策略：权限管理的"灵魂"

### 3.1 角色的本质：信任 + 权限

<RolePolicyDemo />

IAM Role 有两个核心组成部分：

1. **信任策略（Trust Policy）**：谁可以扮演这个角色？
2. **权限策略（Permission Policy）**：扮演成功后能做什么？

用一个话剧表演的类比：

| 概念 | 类比 | 说明 |
| :--- | :--- | :--- |
| **Role（角色）** | 剧本里的"哈姆雷特" | 定义了要演什么戏（权限）|
| **Trust Policy** | 导演说"谁能演哈姆雷特" | 可能是"本剧团的演员"（本账号用户）、"隔壁剧团借来的演员"（跨账号）、"特邀嘉宾"（外部 IdP）|
| **Permission Policy** | 剧本内容 | 哈姆雷特能做什么：说台词、决斗、发疯（具体权限）|
| **Assume Role** | 演员上台表演 | 小李被导演选中演哈姆雷特，上台后他就拥有了剧本里定义的所有权限 |
| **临时凭证** | 演出证 | 小李拿到一个"临时演出证"，演出结束后就失效了 |

### 3.2 策略（Policy）：权限的"语法"

<PermissionHierarchyDemo />

IAM Policy 是一个 JSON 文档，定义了"谁能对什么资源做什么操作"。

**一个完整的 Policy 示例**：

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "AllowS3ReadWrite",
      "Effect": "Allow",
      "Action": [
        "s3:GetObject",
        "s3:PutObject",
        "s3:DeleteObject"
      ],
      "Resource": "arn:aws:s3:::my-app-bucket/*",
      "Condition": {
        "StringEquals": {
          "aws:RequestedRegion": "ap-northeast-1"
        },
        "Bool": {
          "aws:MultiFactorAuthPresent": "true"
        }
      }
    },
    {
      "Sid": "DenySensitiveData",
      "Effect": "Deny",
      "Action": "s3:*",
      "Resource": "arn:aws:s3:::my-app-bucket/sensitive/*"
    }
  ]
}
```

**关键字段解释**：

| 字段 | 含义 | 示例 |
| :--- | :--- | :--- |
| **Version** | Policy 语法版本 | "2012-10-17" |
| **Statement** | 权限声明数组，可包含多个规则 | [...] |
| **Sid** | 声明 ID，可选，用于标识这条规则 | "AllowS3ReadWrite" |
| **Effect** | 效果：Allow（允许）或 Deny（拒绝） | "Allow" |
| **Action** | 允许/拒绝的操作，支持通配符 | "s3:GetObject", "s3:*" |
| **Resource** | 作用的资源，用 ARN 标识 | "arn:aws:s3:::bucket/*" |
| **Condition** | 可选，满足特定条件时才生效 | 区域限制、MFA 要求等 |

### 3.3 权限的优先级：Deny > Allow > 默认拒绝

IAM 的权限评估逻辑可以用一句话总结：**显式 Deny 永远赢，没有 Allow 就是拒绝**。

评估流程如下：

```
1. 先看有没有 Deny 策略
   ├─ 有 Deny → 拒绝（不管有没有 Allow）
   └─ 没有 Deny → 继续看

2. 再看有没有 Allow 策略
   ├─ 有 Allow → 允许
   └─ 没有 Allow → 拒绝（默认拒绝原则）
```

**实战案例：保护敏感数据**

```json
// 策略1：给开发者的普通权限
{
  "Effect": "Allow",
  "Action": ["s3:*"],
  "Resource": "arn:aws:s3:::company-data/*"
}

// 策略2：保护敏感目录（即使开发者有 s3:* 也不能访问）
{
  "Effect": "Deny",
  "Action": ["s3:*"],
  "Resource": "arn:aws:s3:::company-data/sensitive/*"
}
```

**关键点**：
- 开发者虽然有 `s3:*` 的 Allow 权限
- 但敏感目录有显式的 Deny 规则
- Deny 优先级更高，所以开发者无法访问敏感数据
- 即使开发者是管理员，这个 Deny 也有效（除非是根账号）

---

## 4. 访问密钥（AK/SK）：一把需要谨慎保管的"钥匙"

### 4.1 AK/SK 是什么？

<AccessKeyManagementDemo />

Access Key（访问密钥）是云服务提供的一种长期凭证，用于程序化的 API 调用。它由两部分组成：

| 组成部分 | 名称 | 作用 | 类比 |
| :--- | :--- | :--- | :--- |
| **Access Key ID** | 访问密钥 ID | 标识你是谁（类似于用户名） | 银行卡号 |
| **Secret Access Key** | 秘密访问密钥 | 证明你是你（类似于密码） | 银行卡密码 |

### 4.2 为什么 AK/SK 是"高危物品"？

**真实案例：某创业公司的教训**

小李是一家创业公司的新晋后端工程师。入职第一周，他的任务是调试一个文件上传功能。

```python
# 小李写的代码（有严重安全问题！）
import boto3

# 为了方便调试，直接把 AK/SK 写在代码里
s3 = boto3.client(
    's3',
    aws_access_key_id='AKIAIOSFODNN7EXAMPLE',
    aws_secret_access_key='wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY',
    region_name='ap-northeast-1'
)

def upload_file(file_path, bucket_name, object_name):
    s3.upload_file(file_path, bucket_name, object_name)
    print(f"文件已上传到 s3://{bucket_name}/{object_name}")

# 测试上传
upload_file('./test.jpg', 'my-company-bucket', 'uploads/test.jpg')
```

**一周后发生的事情**：

1. 小李提交代码到 GitHub（包括 AK/SK）
2. GitHub 上的代码被爬虫扫描到，AK/SK 被提取
3. 攻击者使用这些凭证，在公司账号里创建了大量 EC2 实例挖矿
4. 月底收到账单：额外消费 12,000 美元
5. 审计发现 AK/SK 泄露，小李被约谈...

**这个案例告诉我们什么？**

| 错误做法 | 正确做法 |
| :--- | :--- |
| 把 AK/SK 硬编码在代码中 | 使用 IAM Role，让程序自动获取临时凭证 |
| 把 AK/SK 提交到 Git 仓库 | 使用 `.gitignore` 忽略配置文件，使用密钥管理服务 |
| 长期使用同一个 AK/SK 不轮换 | 定期轮换 AK/SK，使用临时凭证替代长期凭证 |
| 给 AK/SK 分配过大权限 | 遵循最小权限原则，只授予必要的权限 |

### 4.3 AK/SK 的安全使用指南

**场景一：本地开发**

```bash
# 正确做法：使用 AWS CLI 配置凭证，不写在代码里
aws configure
# 然后根据提示输入 Access Key ID 和 Secret Access Key
# 这些信息会被保存在 ~/.aws/credentials，权限设置为 600

# 代码中不需要任何凭证配置
import boto3
s3 = boto3.client('s3')  # 自动从 ~/.aws/credentials 读取
```

**场景二：服务器/EC2**

```python
# 正确做法：使用 IAM Instance Profile
# 1. 创建一个 IAM Role，附加需要的权限（如 S3ReadOnly）
# 2. 创建一个 Instance Profile，关联这个 Role
# 3. 启动 EC2 时，选择这个 Instance Profile

# 代码中完全不需要凭证
import boto3
s3 = boto3.client('s3')  # 自动从 EC2 元数据服务获取临时凭证

# 临时凭证会自动轮换，无需担心过期
```

**场景三：CI/CD 流水线**

```yaml
# 正确做法：使用 OIDC Federation（OpenID Connect）
# 以 GitHub Actions 为例：

# 1. 在 AWS 创建 OIDC Identity Provider，信任 GitHub
# 2. 创建一个 IAM Role，信任策略允许 GitHub 的特定仓库扮演
# 3. 在 GitHub Actions 中配置

name: Deploy
on: [push]

jobs:
  deploy:
    runs-on: ubuntu-latest
    permissions:
      id-token: write  # 关键：允许请求 OIDC token
      contents: read
    steps:
      - uses: actions/checkout@v3

      - name: Configure AWS Credentials
        uses: aws-actions/configure-aws-credentials@v2
        with:
          role-to-assume: arn:aws:iam::123456789012:role/GitHubActionsRole
          aws-region: ap-northeast-1
          # 注意：这里没有 Access Key！完全使用临时凭证

      - name: Deploy
        run: aws s3 sync ./build s3://my-bucket/
```

**总结：AK/SK 使用的安全层级**

| 安全等级 | 做法 | 适用场景 | 风险等级 |
| :--- | :--- | :--- | :--- |
| 最高 | 使用 IAM Role（无长期凭证） | EC2、Lambda、ECS、CI/CD | 极低 |
| 高 | 使用 OIDC Federation | GitHub Actions、GitLab CI | 低 |
| 中 | 使用密钥管理服务 | 本地开发、小团队 | 中 |
| 低 | 使用环境变量 | 快速原型、个人项目 | 高 |
| 极低 | 硬编码在代码中 | 任何场景都不推荐 | 极高 |

---

## 5. 多因素认证（MFA）：给你的账号加把"锁"

### 5.1 什么是 MFA？

<MfaSecurityDemo />

MFA（Multi-Factor Authentication，多因素认证），也叫 2FA（Two-Factor Authentication，双因素认证），是一种安全机制，要求用户在登录时提供**两种或以上**不同类型的认证因素：

| 因素类型 | 是什么 | 例子 |
| :--- | :--- | :--- |
| **知识因素**（你知道什么） | 只有用户知道的信息 | 密码、PIN 码 |
| **持有因素**（你有什么） | 用户拥有的物理设备 | 手机、硬件密钥 |
| **生物因素**（你是什么） | 用户的生物特征 | 指纹、面部识别 |

### 5.2 为什么 MFA 这么重要？

**真实数据告诉你答案**：

| 攻击方式 | 没有 MFA 时的成功率 | 有 MFA 时的成功率 |
| :--- | :--- | :--- |
| 密码猜测/暴力破解 | 很高 | 极低（还需要第二因素） |
| 钓鱼攻击获取密码 | 很高 | 极低（钓鱼页面无法获取 MFA 码） |
| 密码泄露（其他网站泄露）| 很高 | 极低（不知道第二因素） |

**微软安全报告（2020）**：启用 MFA 可以阻止 **99.9%** 的自动化攻击。

### 5.3 MFA 实战：为 AWS 根账号开启 MFA

**步骤一：登录 AWS 控制台**

1. 使用根账号邮箱和密码登录
2. 在右上角点击你的账号名，选择 "Security Credentials"

**步骤二：启用 MFA**

1. 找到 "Multi-factor authentication (MFA)" 区域
2. 点击 "Assign MFA device"
3. 选择 MFA 设备类型（推荐"Authenticator app"）

**步骤三：配置虚拟 MFA**

1. 在手机上安装 Google Authenticator 或 Microsoft Authenticator
2. 扫描二维码或手动输入密钥
3. 输入 App 上显示的 6 位验证码（连续输入两个，因为验证码每 30 秒刷新）

**完成！** 你的根账号现在有了 MFA 保护。

---

## 6. 跨账号访问：如何安全地"串门"？

### 6.1 为什么需要跨账号访问？

<CrossAccountAccessDemo />

随着业务增长，很多公司会使用**多账号架构**来隔离不同环境：

| 账号类型 | 用途 | 权限要求 |
| :--- | :--- | :--- |
| **Master Account** | 组织管理、账单结算 | 几乎不使用 |
| **Security Audit** | 集中收集所有账号的日志 | 只读访问其他账号 |
| **Shared Services** | 共享资源（镜像仓库等） | 其他账号只读访问 |
| **Development** | 开发环境 | 开发者完全权限 |
| **Staging** | 测试/预发布环境 | 测试人员权限 |
| **Production** | 生产环境 | 严格限制，需要审批 |

**问题：Shared Services 账号里的镜像，怎么让 Production 账号的 EC2 拉取？**

- 方案 A：把 AK/SK 写在 Production 的用户数据里 （危险！AK/SK 泄露风险）
- 方案 B：使用跨账号 Role Assume （推荐！临时凭证，自动轮换）

### 6.2 跨账号 Role Assume 的原理

```
账号 A（Production）                    账号 B（Shared Services）
    |                                           |
    |  1. 请求 Assume Role                      |
    |  "我想扮演账号 B 的 ECRReadRole"          |
    |------------------------------------------>|
    |                                           |
    |                    2. 检查信任策略         |
    |                    "账号 A 可以扮演我吗？" |
    |                                           |
    |  3. 返回临时凭证                          |
    |  AccessKeyId, SecretKey, SessionToken    |
    |<------------------------------------------|
    |                                           |
    |  4. 使用临时凭证访问 ECR                  |
    |  docker pull 账号B.dkr.ecr...            |
```

**关键点**：

- 临时凭证有效期默认 1 小时，最长可配置 12 小时
- 不需要在代码里存储任何长期凭证
- 信任策略可以限制谁可以扮演这个角色（如指定账号、指定外部 ID）

### 6.3 实战：配置跨账号 ECR 访问

**场景**：Production 账号的 EC2 需要拉取 Shared Services 账号的 Docker 镜像。

**步骤一：在 Shared Services 账号创建 IAM Role**

1. 登录 Shared Services 账号的 AWS 控制台
2. 进入 IAM -> Roles -> Create role
3. 选择"Another AWS account"
4. 输入 Production 账号的 Account ID
5. 可选：勾选"Require external ID"并输入一个随机字符串（增加安全性）
6. 附加权限：AmazonEC2ContainerRegistryReadOnly
7. 给 Role 命名：CrossAccountECRReadRole

**步骤二：获取 Role ARN**

创建完成后，复制 Role 的 ARN：
```
arn:aws:iam::SHARED_SERVICES_ACCOUNT_ID:role/CrossAccountECRReadRole
```

**步骤三：在 Production 账号配置 EC2 实例**

方式 A：使用 Instance Profile（推荐）

1. 在 Production 账号创建 IAM Role（EC2 用）
2. 信任策略：信任 EC2 服务
3. 权限策略：允许 Assume 跨账号 Role

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": "sts:AssumeRole",
      "Resource": "arn:aws:iam::SHARED_SERVICES_ACCOUNT_ID:role/CrossAccountECRReadRole"
    }
  ]
}
```

4. 创建 Instance Profile，关联这个 Role
5. 启动 EC2 时，选择这个 Instance Profile

方式 B：在 EC2 用户数据里动态 Assume Role

```bash
#!/bin/bash
# 安装 AWS CLI
yum install -y aws-cli

# Assume 跨账号 Role
CREDS=$(aws sts assume-role \
  --role-arn arn:aws:iam::SHARED_SERVICES_ACCOUNT_ID:role/CrossAccountECRReadRole \
  --role-session-name EC2PullSession)

# 提取临时凭证
export AWS_ACCESS_KEY_ID=$(echo $CREDS | jq -r '.Credentials.AccessKeyId')
export AWS_SECRET_ACCESS_KEY=$(echo $CREDS | jq -r '.Credentials.SecretAccessKey')
export AWS_SESSION_TOKEN=$(echo $CREDS | jq -r '.Credentials.SessionToken')

# 登录 ECR
aws ecr get-login-password --region ap-northeast-1 | \
  docker login --username AWS --password-stdin SHARED_SERVICES_ACCOUNT_ID.dkr.ecr.ap-northeast-1.amazonaws.com

# 拉取镜像
docker pull SHARED_SERVICES_ACCOUNT_ID.dkr.ecr.ap-northeast-1.amazonaws.com/my-app:latest
```

**步骤四：测试跨账号访问**

在 Production 的 EC2 上执行：

```bash
# 测试能否 Assume Role
aws sts get-caller-identity
# 应该显示：arn:aws:sts::PRODUCTION_ACCOUNT_ID:assumed-role/CrossAccountECRReadRole/EC2PullSession

# 测试能否列出 Shared Services 的 ECR 仓库
aws ecr describe-repositories --registry-id SHARED_SERVICES_ACCOUNT_ID
```

**完成！** 现在 Production 的 EC2 可以安全地拉取 Shared Services 的镜像，而无需共享任何长期凭证。

---

## 7. 实战：构建安全的权限体系

### 7.1 从零开始搭建权限架构

<BestPracticesDemo />

假设你是一个 10 人创业公司的技术负责人，需要从零设计 AWS 权限架构。以下是推荐的实施步骤：

**阶段一：根账号保护（第 1 天）**

```
目标：保护根账号，这是最重要的账号

1. 启用根账号 MFA（必须）
   - 推荐硬件 MFA（YubiKey），或者 Google Authenticator

2. 创建 IAM 管理员账号
   - 用户名：admin（或你的名字）
   - 权限：AdministratorAccess（但后续会收紧）
   - 启用 MFA

3. 删除根账号的 Access Key（如果创建了的话）
   - 根账号永远不应该有 AK/SK

4. 配置根账号使用告警
   - 使用 CloudWatch + SNS，一旦根账号登录就发邮件/短信
```

**阶段二：团队权限分组（第 1 周）**

```
目标：给团队成员分组，批量管理权限

1. 分析团队角色：
   - 后端开发（2人）
   - 前端开发（1人）
   - 移动端开发（1人）
   - 产品经理（1人）
   - 设计师（1人）
   - 创始人/管理员（3人）

2. 创建 IAM Groups：

   Group: Developers
   ├── 成员：所有开发（后端、前端、移动端）
   ├── 权限：
   │   ├── EC2: 启动、停止、查看（但不能删除别人的实例）
   │   ├── S3: 读写开发环境的 bucket
   │   ├── RDS: 只读权限（不能修改生产数据库）
   │   └── CloudWatch: 查看日志
   └── 限制：只能操作 ap-northeast-1 区域

   Group: ProductTeam
   ├── 成员：产品经理、设计师
   ├── 权限：
   │   ├── S3: 只读（查看数据文件）
   │   ├── CloudWatch Dashboard: 查看监控图表
   │   └── Cost Explorer: 查看账单（但不能修改）
   └── 限制：只读权限，不能修改任何资源

   Group: Administrators
   ├── 成员：创始人、技术负责人
   ├── 权限：AdministratorAccess
   └── 要求：必须使用 MFA 才能操作

3. 给每个人创建 IAM User，加入对应的 Group
   - 不要给个人直接附加权限，一律通过 Group 管理
   - 启用 MFA（强制要求）
```

**阶段三：应用层权限优化（第 2-4 周）**

```
目标：让应用程序安全地访问 AWS 资源

1. EC2 实例使用 Instance Profile
   - 不再在服务器上配置 AK/SK
   - 创建 IAM Role，附加需要的权限（如 S3 读写）
   - 创建 Instance Profile，关联这个 Role
   - 启动 EC2 时选择这个 Instance Profile
   - 应用代码中直接使用 boto3，无需配置凭证

2. 如果必须使用 AK/SK（第三方集成）
   - 使用 AWS Secrets Manager 存储 AK/SK
   - 应用启动时从 Secrets Manager 读取
   - 设置定期轮换（90天）
   - 监控 AK/SK 的使用情况

3. 配置 CloudTrail 记录所有 API 调用
   - 创建单独的 S3 bucket 存储日志
   - 设置日志文件校验（防止篡改）
   - 配置 SNS 通知关键事件（如根账号使用、策略变更）
```

**阶段四：安全加固（持续）**

```
目标：建立持续的安全监控和改进机制

1. 启用 AWS Config
   - 监控资源配置变更
   - 检查合规性（如安全组是否开放了 0.0.0.0/0）

2. 启用 IAM Access Analyzer
   - 持续分析资源策略
   - 识别外部访问（如 S3 bucket 是否公开）

3. 定期审查 IAM 配置
   - 每月检查一次未使用的 IAM User、Role
   - 检查 Access Key 的使用情况
   - 验证 Group 成员是否合理

4. 建立安全事件响应流程
   - 如果发现 AK/SK 泄露：立即删除、轮换、审计影响范围
   - 如果发现异常 API 调用：立即调查、限制权限
```

---

## 8. 常见误区与避坑指南

### 8.1 十大 IAM 反模式

| # | 反模式 | 为什么不好 | 正确做法 |
| :--- | :--- | :--- | :--- |
| 1 | 使用根账号进行日常操作 | 根账号拥有所有权限，一旦泄露无法限制损害 | 创建 IAM 管理员账号，根账号仅在必要时使用 |
| 2 | 给所有人 AdministratorAccess | 违反最小权限原则，增加误操作和内部威胁风险 | 按角色分组，只授予必要的权限 |
| 3 | 在代码中硬编码 AK/SK | AK/SK 容易通过 GitHub 泄露，且难以轮换 | 使用 IAM Role、环境变量或密钥管理服务 |
| 4 | 长期不轮换 AK/SK | 增加凭证泄露后的风险敞口时间 | 设置 90 天轮换策略，或更好的——使用临时凭证 |
| 5 | 忽略 MFA | 密码泄露后账号直接沦陷 | 为所有 IAM 用户启用 MFA，尤其是高权限用户 |
| 6 | 不使用 CloudTrail | 无法审计谁做了什么操作，出事后无法溯源 | 启用 CloudTrail，并将日志存储到独立的审计账号 |
| 7 | IAM Policy 过于宽松 | 如 `Resource: "*"`、`Action: "*"`，增加攻击面 | 明确指定资源 ARN 和具体 Action |
| 8 | 不清理离职员工的 IAM User | 僵尸账号可能成为后门 | 建立离职流程，立即禁用并删除 IAM User |
| 9 | 不使用 IAM Access Analyzer | 无法发现过度宽松的资源策略（如公开 S3 bucket） | 启用 IAM Access Analyzer，定期检查外部访问 |
| 10 | 不在测试环境验证 Policy | 直接在生产环境应用 Policy，可能导致服务中断 | 使用 IAM Policy Simulator 测试，先在测试环境验证 |

---

## 9. 名词对照表

| 英文术语 | 中文对照 | 解释 |
| :--- | :--- | :--- |
| **IAM (Identity and Access Management)** | 身份与访问管理 | 云服务中管理用户身份和访问权限的服务 |
| **RAM (Resource Access Management)** | 资源访问管理 | 阿里云的 IAM 服务名称 |
| **Root Account** | 根账号 | 注册云账号时创建的拥有者账号，拥有最高权限 |
| **IAM User** | IAM 用户/子账号 | 由根账号创建的子身份，用于日常操作 |
| **IAM Role** | IAM 角色 | 临时性权限载体，无长期凭证，需要被"扮演" |
| **IAM Policy** | IAM 策略 | JSON 格式的权限规则定义 |
| **ARN** | 亚马逊资源名称 | 全局唯一的资源标识符 |
| **AK/SK** | 访问密钥/密钥 | 程序访问云 API 的凭证 |
| **STS** | 安全令牌服务 | 提供临时安全凭证的服务 |
| **MFA** | 多因素认证 | 需要两个或以上因素的认证方式 |
| **SSO** | 单点登录 | 用户一次登录即可访问多个系统的认证方式 |
| **ExternalId** | 外部 ID | 用于防止困惑代理攻击的安全标识符 |
| **CloudTrail** | 云审计服务 | 记录云账号中所有 API 调用和操作的日志服务 |

---

## 总结：云账号权限管理的核心原则

云账号权限管理不是一蹴而就的，而是需要根据团队规模和业务需求持续演进：

1. **起步阶段**（1-10 人）：
   - 保护根账号（MFA + 不用根账号日常操作）
   - 创建 IAM 管理员账号
   - 基本的分组（Developers、Admins）

2. **成长阶段**（10-50 人）：
   - 细化的权限分组（前后端、运维、产品等）
   - 使用 IAM Role 替代 AK/SK
   - 启用 CloudTrail 审计
   - 定期权限审查

3. **成熟阶段**（50 人以上 / 多账号）：
   - 多账号架构（Dev、Staging、Prod 分离）
   - 集中式日志审计账号
   - 自动化权限审查和告警
   - 完善的权限申请和审批流程

**核心原则记住三句话**：

1. **最小权限原则**：只给必要的权限，不要给 AdministratorAccess
2. **不用长期凭证**：优先使用 IAM Role 和临时凭证，避免 AK/SK 泄露
3. **启用 MFA**：特别是根账号和高权限账号，这是最有效的安全措施

---

> **延伸阅读**：
> - [AWS IAM 官方文档](https://docs.aws.amazon.com/iam/)
> - [阿里云 RAM 官方文档](https://www.aliyun.com/product/ram)
> - [AWS IAM Best Practices](https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html)
