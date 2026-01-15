# 部署与上线

> 💡 **学习指南**：开发完成只是第一步，让应用真正服务于用户还需要部署和上线。本章节将带你了解域名、服务器、CDN 等核心概念，并掌握现代 Web 应用的部署流程。

## 0. 部署架构概览

让我们先通过可视化演示，了解现代 Web 应用的部署架构：

<DeploymentArchitecture />

## 1. 域名 (Domain Name)

### 1.1 什么是域名？

**域名** 是互联网上识别和定位计算机的层次结构式字符标识。

**域名组成**：

```
www.example.com
│   │     │
│   │     └─ 顶级域名 (TLD)
│   └─────── 二级域名
└─────────── 三级域名 (子域名)
```

**常见顶级域名**：

| 类型 | 域名 | 用途 |
|------|------|------|
| 通用 | `.com` | 商业机构 |
| 通用 | `.org` | 非营利组织 |
| 通用 | `.net` | 网络服务 |
| 国家 | `.cn` | 中国 |
| 国家 | `.us` | 美国 |
| 国家 | `.jp` | 日本 |
| 新通用 | `.io` | 科技初创 |
| 新通用 | `.ai` | 人工智能 |

### 1.2 域名注册

**注册流程**：

1. **选择域名**
   - 简短易记
   - 避免特殊字符
   - 选择合适的后缀

2. **选择注册商**
   - **国外**：GoDaddy、Namecheap、Google Domains
   - **国内**：阿里云、腾讯云、Cloudflare

3. **注册域名**
   - 查询可用性
   - 添加到购物车
   - 填写信息并支付

4. **配置 DNS**
   - 设置域名服务器
   - 添加 DNS 记录

**价格参考**：
- `.com`：$10-15/年
- `.cn`：￥30-50/年
- `.io`：$30-50/年

### 1.3 DNS 解析

**DNS 记录类型**：

**A 记录**（地址记录）：
```
example.com    A    1.2.3.4
www.example.com A    1.2.3.4
```

**CNAME 记录**（别名记录）：
```
www.example.com    CNAME    example.com
blog.example.com   CNAME    example.wordpress.com
```

**MX 记录**（邮件服务器）：
```
example.com    MX    10 mail.example.com
```

**TXT 记录**（文本记录）：
```
example.com    TXT    "v=spf1 include:_spf.google.com ~all"
```

**配置示例**（阿里云 DNS）：

| 主机记录 | 记录类型 | 记录值 | TTL |
|----------|----------|--------|-----|
| @ | A | 1.2.3.4 | 600 |
| www | A | 1.2.3.4 | 600 |
| @ | CNAME | example.com | 600 |

### 1.4 域名生效时间

- **全球生效**：24-48 小时
- **本地生效**：修改后几分钟
- **加速生效**：清除本地 DNS 缓存

```bash
# 清除 DNS 缓存
# Windows
ipconfig /flushdns

# macOS
sudo dscacheutil -flushcache

# Linux
sudo systemd-resolve --flush-caches
```

## 2. 服务器 (Server)

### 2.1 什么是服务器？

**服务器** 是提供计算服务的设备，响应客户端的请求。

**服务器类型**：

**物理服务器**：
- 整机独享
- 性能强大
- 价格昂贵
- 需要运维

**虚拟专用服务器 (VPS)**：
- 虚拟化技术
- 独立环境
- 价格适中
- 常见选择

**云服务器**：
- 弹性扩展
- 按需付费
- 高可用性
- 易于管理

**容器服务器**：
- 轻量级
- 快速部署
- 易于迁移
- 现代化

### 2.2 主流云服务商

**国际**：

| 服务商 | 产品 | 优势 | 价格 |
|--------|------|------|------|
| AWS | EC2 | 功能全面、稳定 | $5-100/月 |
| Google Cloud | Compute Engine | 技术先进 | $6-100/月 |
| DigitalOcean | Droplet | 简单易用 | $4-48/月 |
| Linode | Linode | 性价比高 | $5-80/月 |
| Vultr | Vultr | 全球节点 | $2.5-40/月 |

**国内**：

| 服务商 | 产品 | 优势 | 价格 |
|--------|------|------|------|
| 阿里云 | ECS | 功能完善 | ￥60-500/月 |
| 腾讯云 | CVM | 稳定可靠 | ￥50-400/月 |
| 华为云 | ECS | 企业级 | ￥50-300/月 |

### 2.3 服务器选择

**根据流量选择**：

- **个人博客**：1核1G，$5/月
- **小型应用**：1核2G，$10/月
- **中型应用**：2核4G，$20/月
- **大型应用**：4核8G，$40/月

**根据地区选择**：

- **目标用户在国内**：阿里云、腾讯云
- **目标用户在国外**：AWS、DigitalOcean
- **全球用户**：Cloudflare + 多节点

### 2.4 服务器配置

**基础配置**（Ubuntu）：

```bash
# 1. 更新系统
sudo apt update
sudo apt upgrade -y

# 2. 安装必要软件
sudo apt install -y nginx git curl

# 3. 安装 Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# 4. 安装 PM2（进程管理器）
sudo npm install -g pm2

# 5. 配置防火墙
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw enable
```

**Nginx 配置**：

```nginx
# /etc/nginx/sites-available/example.com
server {
    listen 80;
    server_name example.com www.example.com;

    root /var/www/html;
    index index.html;

    location / {
        try_files $uri $uri/ =404;
    }

    # API 代理
    location /api {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

**启用配置**：

```bash
# 创建软链接
sudo ln -s /etc/nginx/sites-available/example.com /etc/nginx/sites-enabled/

# 测试配置
sudo nginx -t

# 重启 Nginx
sudo systemctl restart nginx
```

### 2.5 SSL 证书

**使用 Let's Encrypt 免费证书**：

```bash
# 安装 Certbot
sudo apt install certbot python3-certbot-nginx

# 获取证书
sudo certbot --nginx -d example.com -d www.example.com

# 自动续期
sudo certbot renew --dry-run
```

**配置示例**：

```nginx
server {
    listen 443 ssl;
    server_name example.com www.example.com;

    ssl_certificate /etc/letsencrypt/live/example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/example.com/privkey.pem;

    # SSL 配置
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
}

# HTTP 重定向到 HTTPS
server {
    listen 80;
    server_name example.com www.example.com;
    return 301 https://$host$request_uri;
}
```

## 3. CDN (内容分发网络)

### 3.1 什么是 CDN？

**CDN (Content Delivery Network)** 内容分发网络，通过将内容缓存到全球各地的边缘节点，让用户就近访问。

**CDN 工作原理**：

```
用户请求 → DNS 解析 → 就近 CDN 节点
                        ↓
                   缓存命中？返回内容
                        ↓ 否
                   回源获取 → 缓存并返回
```

### 3.2 CDN 的优势

**加速访问**：
- 就近节点响应快
- 减少网络延迟
- 提升用户体验

**减轻源站压力**：
- 静态资源由 CDN 承载
- 减少源站带宽
- 降低服务器负载

**提高可用性**：
- 节点故障自动切换
- 防御 DDoS 攻击
- 提高容灾能力

**节省成本**：
- CDN 流量费用低
- 减少源站带宽成本

### 3.3 主流 CDN 服务商

**国际**：

| 服务商 | 免费额度 | 付费价格 | 特点 |
|--------|----------|----------|------|
| Cloudflare | 无限制 | $0-20/月 | 全球节点、免费 SSL |
| AWS CloudFront | 1TB/年 | $0.085/GB | 功能强大 |
| Google Cloud CDN | 无 | $0.08/GB | 全球网络 |
| BunnyCDN | 1TB/月 | $1/TB | 性价比高 |

**国内**：

| 服务商 | 价格 | 特点 |
|--------|------|------|
| 阿里云 CDN | ￥0.24/GB | 节点多、稳定 |
| 腾讯云 CDN | ￥0.21/GB | 价格优惠 |
| 七牛云 | ￥0.29/GB | 存储集成 |

### 3.4 CDN 配置

**Cloudflare 配置步骤**：

1. **添加站点**
   - 输入域名
   - 选择免费计划
   - 扫描 DNS 记录

2. **切换域名服务器**
   - Cloudflare 提供两个 NS 记录
   - 在域名注册商处修改
   - 等待生效（2-24 小时）

3. **配置缓存规则**
   - 缓存静态资源（CSS、JS、图片）
   - 不缓存 HTML 和 API
   - 设置缓存时间

4. **开启 HTTPS**
   - Full 模式（推荐）
   - 自动 SSL 证书
   - 强制 HTTPS

**Nginx 缓存配置**：

```nginx
# 设置缓存头部
location ~* \.(jpg|jpeg|png|gif|ico|css|js)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}

location / {
    add_header Cache-Control "no-cache";
}
```

### 3.5 CDN 最佳实践

**缓存策略**：

- **静态资源**：图片、CSS、JS → 长期缓存（1 年）
- **HTML 文件**：短期缓存或不缓存
- **API 响应**：根据业务设置缓存时间
- **用户特定内容**：不缓存

**缓存清除**：

```bash
# Cloudflare API
curl -X POST "https://api.cloudflare.com/client/v4/zones/zone_id/purge_cache" \
  -H "Authorization: Bearer token" \
  -H "Content-Type: application/json" \
  --data '{"files":["https://example.com/style.css"]}'
```

## 4. 部署流程

### 4.1 部署方式

**传统部署**：
- 手动上传代码
- SSH 登录服务器
- 执行部署脚本
- 重启服务

**CI/CD 部署**：
- 代码推送到 Git
- 自动触发构建
- 自动运行测试
- 自动部署到服务器

**容器化部署**：
- Docker 打包应用
- 推送到镜像仓库
- 服务器拉取镜像
- 运行容器

### 4.2 Docker 部署

**Dockerfile**：

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

**构建和运行**：

```bash
# 构建镜像
docker build -t myapp:1.0 .

# 运行容器
docker run -d -p 3000:3000 --name myapp myapp:1.0

# 查看日志
docker logs -f myapp

# 停止容器
docker stop myapp
```

**Docker Compose**：

```yaml
version: '3.8'

services:
  web:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    restart: always

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./ssl:/etc/nginx/ssl
    depends_on:
      - web
    restart: always
```

### 4.3 CI/CD 配置

**GitHub Actions 示例**：

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v2

      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm ci

      - name: Run tests
        run: npm test

      - name: Build
        run: npm run build

      - name: Deploy to server
        uses: appleboy/ssh-action@master
        with:
          host: ${{ secrets.HOST }}
          username: ${{ secrets.USERNAME }}
          key: ${{ secrets.SSH_KEY }}
          script: |
            cd /var/www/myapp
            git pull
            npm ci --production
            npm run build
            pm2 restart myapp
```

## 5. 监控和运维

### 5.1 日志管理

**应用日志**：

```bash
# PM2 日志
pm2 logs myapp

# Nginx 日志
tail -f /var/log/nginx/access.log
tail -f /var/log/nginx/error.log
```

**日志分析**：

```bash
# 统计访问量
awk '{print $1}' /var/log/nginx/access.log | sort | uniq -c | sort -rn | head -10

# 统计状态码
awk '{print $9}' /var/log/nginx/access.log | sort | uniq -c | sort -rn
```

### 5.2 性能监控

**系统监控**：

```bash
# CPU 使用率
top

# 内存使用
free -h

# 磁盘使用
df -h

# 网络流量
iftop
```

**应用监控工具**：

- **PM2**：进程管理和监控
- **New Relic**：应用性能监控
- **Datadog**：基础设施监控
- **Prometheus + Grafana**：开源监控方案

### 5.3 自动备份

**数据库备份脚本**：

```bash
#!/bin/bash
# backup.sh

DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/var/backups"
DB_NAME="myapp"
DB_USER="root"
DB_PASS="password"

# 备份数据库
mysqldump -u $DB_USER -p$DB_PASS $DB_NAME > $BACKUP_DIR/db_$DATE.sql

# 压缩备份
gzip $BACKUP_DIR/db_$DATE.sql

# 删除 7 天前的备份
find $BACKUP_DIR -name "db_*.sql.gz" -mtime +7 -delete

echo "Backup completed: db_$DATE.sql.gz"
```

**定时任务**：

```bash
# 添加到 crontab
crontab -e

# 每天凌晨 2 点执行备份
0 2 * * * /path/to/backup.sh
```

## 6. 常见问题

### 6.1 网站无法访问

**排查步骤**：

1. **检查域名**
   ```bash
   nslookup example.com
   ping example.com
   ```

2. **检查服务器**
   ```bash
   ping 1.2.3.4
   ```

3. **检查 Web 服务**
   ```bash
   systemctl status nginx
   ```

4. **检查防火墙**
   ```bash
   sudo ufw status
   ```

### 6.2 HTTPS 不生效

**常见原因**：

- 证书过期：续期证书
- 配置错误：检查 Nginx 配置
- 端口未开放：开放 443 端口
- DNS 未生效：等待 DNS 传播

### 6.3 CDN 缓存问题

**解决方法**：

```bash
# 清除 Cloudflare 缓存
# Dashboard → Caching → Purge Everything

# 或使用 API
curl -X POST "https://api.cloudflare.com/client/v4/zones/zone_id/purge_cache" \
  -H "Authorization: Bearer token" \
  --data '{"purge_everything":true}'
```

## 7. 成本优化

### 7.1 服务器成本

**优化策略**：

- 按需选择配置，避免浪费
- 使用预留实例（长期项目）
- 选择合适的计费方式
- 定期清理不用的资源

### 7.2 带宽成本

**优化策略**：

- 使用 CDN 减少源站带宽
- 启用压缩（Gzip、Brotli）
- 优化图片大小和格式
- 使用懒加载

### 7.3 存储成本

**优化策略**：

- 定期清理日志文件
- 使用对象存储（OSS、S3）
- 压缩静态资源
- 删除不必要的备份

## 8. 总结

部署与上线核心要点：

- 🌐 **域名**：网站的入口，选择好记的域名
- 🖥️ **服务器**：应用运行的基础，选择合适的配置
- 📡 **CDN**：加速访问，减轻源站压力
- 🔐 **HTTPS**：安全传输，必备配置
- 🚀 **CI/CD**：自动化部署，提高效率
- 📊 **监控**：及时发现问题，保证稳定

**部署清单**：

- [ ] 注册域名
- [ ] 购买服务器
- [ ] 配置 DNS 解析
- [ ] 安装 Web 服务器
- [ ] 部署应用代码
- [ ] 配置 SSL 证书
- [ ] 启用 CDN
- [ ] 设置监控
- [ ] 配置备份
- [ ] 性能优化

掌握部署与上线，你的应用就能真正服务于用户。现在就开始部署你的第一个项目吧！
