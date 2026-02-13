# 服务上线之旅

::: tip 🎯 核心问题
**代码在本地跑得好好的，怎么让全世界的人都能访问？**
:::

---

## 1. 为什么要"服务上线"？

想象小明在家做了一桌子菜，现在要开餐厅让所有人来吃。这可不是"把菜端出去"那么简单。

<DeploymentOverviewDemo />

**服务上线是一场"搬家+开业"的大工程**：
1. **构建** → 打包代码成服务器能懂的格式
2. **服务器** → 租一台永远不关机的电脑
3. **部署** → 把代码上传到服务器
4. **环境** → 配置 Nginx、Node.js
5. **域名** → 配置 DNS，让用户能找到
6. **HTTPS** → 安装证书，保护数据安全
7. **CI/CD** → 自动化部署，解放双手
8. **监控** → 盯控和备份，守住底线

---

## 2. 构建：把代码变成"可携带的包裹"

### 2.1 为什么要构建？

浏览器只认识 HTML/CSS/JS，不认识 Vue 组件。**构建（Build）就是"打包外卖"的过程**。

<DeploymentBuildDemo />

**构建做了什么**：
- **翻译**：Vue → HTML/CSS/JS
- **压缩**：减小代码体积（省流量、加载快）
- **合并**：多个文件 → 几个大包（减少请求）
- **哈希**：文件名加指纹（`app.abc123.js`），缓存友好

```bash
npm run build
```

---

## 3. 服务器：找房子

### 3.1 服务器是什么？

服务器 = **一台永远不关机、连着互联网的电脑**

<DeploymentServerDemo />

### 3.2 怎么选服务器？

::: tip 💡 选型建议
- **个人项目/学习**：1核2G，约¥100-200/年
- **小型商业项目**：2核4G，约¥500/年
- **中型项目**：4核8G，约¥1000+/年
:::

| 方案 | 类比 | 优点 | 缺点 | 价格 |
|------|------|------|------|------|
| 虚拟主机 | 租床位 | 便宜、简单 | 性能差 | ¥50-200/年 |
| 云服务器 | 租公寓 | 自由度高、可扩展 | 需自己配置 | ¥100-1000/年 |
| Vercel | 租会议室 | 零配置、免费额度 | 受平台限制 | 免费/按量 |

### 3.3 主流云厂商

| 厂商 | 特点 | 适合人群 |
|------|------|---------|
| 阿里云 | 国内访问快 | 国内业务 |
| 腾讯云 | 价格亲民 | 小程序开发者 |
| Vercel | 零配置、免费 | 前端项目 |

---

## 4. 部署：搬家

### 4.1 连接服务器

用 **SSH（远程连接工具）**：

```bash
ssh root@123.45.67.89
# 输入密码后，你就在服务器上了
```

### 4.2 部署方式

| 方式 | 优点 | 缺点 |
|------|------|------|
| FTP上传 | 简单直观 | 容易漏传 |
| Git拉取 | 快、可追溯 | 需配置Git |

**推荐**：Git + Build Script

```bash
cd /var/www/my-site
git pull origin main    # 拉取最新代码
npm install              # 安装依赖
npm run build            # 构建项目
pm2 restart all         # 重启服务
```

### 4.3 环境配置（Ubuntu）

::: details 点击展开：最小化安装脚本
```bash
# 更新系统
sudo apt update && sudo apt upgrade -y

# 安装 Nginx（Web服务器）
sudo apt install -y nginx

# 安装 Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# 安装 PM2（进程管家）
sudo npm install -g pm2

# 安装 Git
sudo apt install -y git
```
:::

**Nginx 反向代理**：把 80 端口请求转发到 3000 端口

```nginx
server {
    listen 80;
    server_name example.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
    }
}
```

---

## 5. 域名和 DNS：挂牌

### 5.1 域名是什么？

- IP地址（123.45.67.89）太难记
- 域名（example.com）好记

**DNS（域名解析）** = **电话本**，把域名翻译成IP

<DeploymentDnsDemo />

### 5.2 配置步骤

1. **买域名**：阿里云/腾讯云（¥50-100/年）
2. **配置DNS**：

| 记录类型 | 用途 | 示例 |
|---------|------|------|
| A记录 | 指向IP | `example.com` → `123.45.67.89` |
| CNAME | 指向域名 | `www.example.com` → `example.com` |

::: tip ⚠️ 注意
- DNS生效慢：全球同步需要几分钟到几小时
- TTL值：设置小一点（如600秒），修改后生效快
:::

---

## 6. HTTPS：安防

### 6.1 为什么需要 HTTPS？

<DeploymentHttpsDemo />

- **HTTP**：数据"裸奔"，谁都能看见
- **HTTPS**：数据加密，黑客看见也是乱码

### 6.2 怎么搞定 HTTPS？

用 **Let's Encrypt（免费证书）** + **Certbot（自动工具）**

```bash
# 安装 Certbot
sudo apt install -y certbot python3-certbot-nginx

# 自动申请证书并配置 Nginx
sudo certbot --nginx -d example.com

# 证书自动续期
sudo certbot renew --dry-run
```

完成后访问网站会看到🔒小锁。

---

## 7. CI/CD：自动化

### 7.1 什么是 CI/CD？

<DeploymentCicdDemo />

- **CI（持续集成）**：每次提交自动测试
- **CD（持续部署）**：测试通过自动部署

### 7.2 GitHub Actions 示例

在 `.github/workflows/deploy.yml`：

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install & Build
        run: |
          npm ci
          npm run build

      - name: Deploy
        uses: appleboy/ssh-action@master
        with:
          host: ${{ secrets.SERVER_HOST }}
          username: root
          key: ${{ secrets.SSH_KEY }}
          script: |
            cd /var/www/my-site
            git pull origin main
            npm install
            npm run build
            pm2 restart all
```

---

::: details 📖 高级主题：CDN 和负载均衡

**CDN（内容分发网络）**：全球连锁仓库

- 把图片、CSS、JS等静态资源上传到CDN
- CDN复制到全球节点
- 用户访问时从最近节点获取

**效果**：北京用户→北京节点（10ms），纽约用户→纽约节点（15ms）

**负载均衡（Load Balancer）**：餐厅领班

- 看着N个服务器
- 把客人分配到最空闲的那个
- 某个服务器挂了，自动切换

**什么时候需要**？
- 访问量 >10000/天
- 单台服务器 CPU/内存 >70%

:::

---

## 8. 监控和备份：守夜人

### 8.1 监控什么？

<DeploymentMonitorDemo />

| 指标 | 正常范围 |
|------|---------|
| CPU使用率 | <70% |
| 内存使用率 | <80% |
| 磁盘空间 | <80% |
| 响应时间 | <2秒 |
| 错误率 | <1% |

### 8.2 备份策略

::: tip 💾 备份三要素
1. **定期备份**：每天凌晨自动备份
2. **多地存储**：本地 + 异地（防止单点故障）
3. **定期恢复测试**：确保备份能恢复
:::

```bash
# 每天自动备份数据库
0 2 * * * /usr/bin/mysqldump -u root -p密码 my_db > /backup/db_$(date +\%Y\%m\%d).sql

# 保留最近7天的备份
find /backup -name "db_*.sql" -mtime +7 -delete

# 自动上传到云存储
/usr/bin/ossutil cp /backup/db_$(date +\%Y\%m\%d).sql oss://my-backup/
```

---

## 9. 常见问题速查

| 现象 | 可能原因 | 怎么办 |
|------|---------|--------|
| 网站打不开 | 域名没解析？服务器挂了？ | `ping 域名`看通不通<br>`ssh`连不上就是服务器挂了 |
| 404 Not Found | Nginx配置错了？路径不对？ | `nginx -t`检查配置 |
| 502 Bad Gateway | 后端服务挂了？端口没开？ | `pm2 list`看服务状态 |
| HTTPS证书报错 | 证书过期？域名不匹配？ | `certbot renew`续期 |
| 更新不生效 | 浏览器缓存？CDN缓存？ | Ctrl+F5强制刷新<br>去CDN控制台"刷新缓存" |
| 很慢 | 性能不够？CDN没配置？ | 查监控看CPU/内存<br>静态资源上CDN |

---

## 10. 上线前检查清单

::: details ✅ 基础检查
- [ ] 代码已构建（`npm run build`）
- [ ] 服务器环境配置完成（Nginx + Node.js）
- [ ] 域名解析正确（能ping通）
- [ ] HTTPS证书正常（有🔒小锁）
:::

::: details 🔒 安全检查
- [ ] 数据库密码不是弱密码
- [ ] 敏感信息没写在代码里
- [ ] 开启了防火墙（只开必要端口）
- [ ] 配置了SQL注入防护
:::

::: details 🛡️ 运维检查
- [ ] 监控告警配置完成
- [ ] 日志正常记录
- [ ] 自动备份已设置
- [ ] CI/CD流程测试通过
:::

---

## 总结

### 核心流程

1. **构建** → 代码打包成浏览器懂的格式
2. **部署** → 代码放到服务器上
3. **配置** → Nginx、域名、HTTPS
4. **优化** → CDN、负载均衡（高级）
5. **自动化** → CI/CD解放双手
6. **保障** → 监控和备份守住底线

### 关键原则

| 原则 | 说明 |
|------|------|
| **小步快跑** | 先上线MVP，再逐步完善 |
| **自动化优先** | 能自动的别手动，减少人为失误 |
| **监控先行** | 先建监控，再上功能 |
| **备份为王** | 数据无价，备份是最后防线 |
| **安全第一** | HTTPS、防火墙、弱密码检查，一个都不能少 |

### 学习路线

**入门（第1天）**：用 Vercel 免费部署静态网页

**进阶（第1周）**：租云服务器、手动部署 Node.js 应用、配置域名和 HTTPS

**实战（第2-4周）**：搭建完整 CI/CD 流程、配置 CDN、建立监控和备份

**深入（持续）**：学习 Docker 容器化、Kubernetes 集群、微服务架构

---

## 名词速查表

| 名词 | 英文 | 人话解释 |
|------|------|---------|
| 部署 | Deployment | 把代码放到服务器上让人能访问 |
| 构建 | Build | 把源代码翻译打包成浏览器懂的格式 |
| 服务器 | Server | 一台永远不关机、连着互联网的电脑 |
| 域名 | Domain Name | 网站的好记名字（如 baidu.com） |
| DNS | Domain Name System | 域名解析系统，把域名翻译成IP |
| HTTP/HTTPS | HyperText Transfer Protocol | 网页传输协议（HTTP不安全，HTTPS加密） |
| Nginx | Engine X | 高性能Web服务器（门童） |
| 反向代理 | Reverse Proxy | 转发请求到后端服务 |
| SSH | Secure Shell | 远程连接服务器的工具 |
| CDN | Content Delivery Network | 内容分发网络，全球加速 |
| CI/CD | Continuous Integration/Deployment | 持续集成/持续部署（自动化） |
| 监控 | Monitoring | 盯着服务器看有没有问题 |
| 备份 | Backup | 备份数据，防丢失 |
