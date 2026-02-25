# Linux 基础

::: tip 前言
**服务器的世界，Linux 是绝对的主角。** 全球超过 90% 的服务器运行 Linux，从你每天用的微信到 Google 搜索，背后都是 Linux 在支撑。作为开发者，掌握 Linux 基础不是可选项，而是必修课。
:::

**这篇文章会带你学什么？**

学完这章后，你将获得：

- **文件系统**：理解 Linux 目录结构和"一切皆文件"的哲学
- **常用命令**：掌握文件操作、文本处理、进程管理等核心命令
- **权限模型**：理解用户、组、权限的概念
- **Shell 基础**：了解管道、重定向、环境变量等 Shell 核心概念
- **实战技能**：学会日志查看、进程排查、网络诊断等运维基本功

| 章节 | 内容 | 核心概念 |
|-----|------|---------|
| **第 1 章** | 文件系统 | 目录结构、一切皆文件 |
| **第 2 章** | 常用命令 | 文件、文本、进程、网络 |
| **第 3 章** | 权限模型 | 用户、组、rwx、sudo |
| **第 4 章** | Shell 基础 | 管道、重定向、变量、脚本 |
| **第 5 章** | 实战场景 | 日志排查、性能诊断 |

---

## 1. 文件系统：一切皆文件

Linux 最核心的哲学之一就是**一切皆文件**。普通文件是文件，目录是文件，硬盘是文件，甚至网络连接、进程信息都是文件。这个统一的抽象让你可以用同一套工具（读、写、权限控制）操作几乎所有系统资源。

<LinuxFileSystemDemo />

### 目录结构速记

把 Linux 文件系统想象成一棵倒过来的树：

```
/                    ← 根目录（树根）
├── home/            ← 用户的家（你的文件都在这）
├── etc/             ← 配置文件（系统的"设置面板"）
├── var/             ← 变化的数据（日志、缓存）
├── usr/             ← 用户安装的程序
├── tmp/             ← 临时文件（重启就没了）
├── proc/            ← 进程信息（虚拟的，不占磁盘）
├── dev/             ← 设备文件（硬盘、终端）
├── bin/             ← 基础命令（ls、cp、mv）
├── sbin/            ← 系统管理命令（需要 root）
├── opt/             ← 第三方软件
└── root/            ← root 用户的家目录
```

### 路径的两种写法

| 类型 | 格式 | 示例 | 说明 |
|------|------|------|------|
| 绝对路径 | 从 `/` 开始 | `/home/alice/code/app.js` | 从根目录出发，不会歧义 |
| 相对路径 | 从当前目录开始 | `./code/app.js` 或 `../config` | `.` 是当前目录，`..` 是上级目录 |

::: tip "一切皆文件"的威力
想知道 CPU 信息？读文件：`cat /proc/cpuinfo`
想知道内存使用？读文件：`cat /proc/meminfo`
想产生随机数？读文件：`cat /dev/urandom`
想丢弃输出？写文件：`echo "no thanks" > /dev/null`

不需要专门的 API，读写文件就够了。这就是 Unix 哲学的优雅之处。
:::

---

## 2. 常用命令

Linux 命令遵循一个统一的格式：`命令 [选项] [参数]`。比如 `ls -la /home` 中，`ls` 是命令，`-la` 是选项，`/home` 是参数。

<LinuxCommandDemo />

### 最常用的 10 个命令

如果只能记住 10 个命令，记这些：

| 命令 | 用途 | 记忆技巧 |
|------|------|----------|
| `ls` | 列出文件 | list |
| `cd` | 切换目录 | change directory |
| `cat` | 查看文件 | concatenate |
| `grep` | 搜索文本 | global regular expression print |
| `find` | 查找文件 | 就是 find |
| `ps` | 查看进程 | process status |
| `tail -f` | 实时看日志 | 看文件"尾巴"，-f 是 follow |
| `chmod` | 改权限 | change mode |
| `curl` | 发 HTTP 请求 | client URL |
| `ssh` | 远程登录 | secure shell |

### 命令组合的艺术

Linux 的强大不在于单个命令，而在于**命令组合**。通过管道 `|` 把多个简单命令串起来，解决复杂问题：

```bash
# 找出占用 CPU 最多的 5 个进程
ps aux --sort=-%cpu | head -6

# 统计日志中出现最多的错误类型
grep "ERROR" app.log | awk '{print $4}' | sort | uniq -c | sort -rn | head -10

# 查找大于 100MB 的文件
find / -size +100M -type f 2>/dev/null

# 实时监控日志中的错误
tail -f /var/log/app.log | grep --color "ERROR"
```

::: tip Unix 哲学
"做一件事，做好它。" 每个命令只负责一个功能，通过管道组合实现复杂操作。这就是为什么 Linux 命令都很短小——它们是积木，不是瑞士军刀。
:::

---

## 3. 权限模型

Linux 是多用户系统，权限模型是安全的基石。每个文件都有三组权限，分别控制**所有者（Owner）**、**所属组（Group）**、**其他人（Others）**能做什么。

### 读懂 `ls -l` 的输出

```bash
$ ls -l app.js
-rwxr-xr-- 1 alice developers 2048 Jan 15 10:30 app.js
│├──┤├──┤├──┤   │     │          │
│ │   │   │     │     │          └── 文件大小
│ │   │   │     │     └── 所属组
│ │   │   │     └── 所有者
│ │   │   └── 其他人权限：r-- (只读)
│ │   └── 组权限：r-x (读+执行)
│ └── 所有者权限：rwx (读+写+执行)
└── 文件类型：- 普通文件，d 目录，l 链接
```

### 权限的三种操作

| 权限 | 字母 | 数字 | 对文件的含义 | 对目录的含义 |
|------|------|------|-------------|-------------|
| 读 | `r` | 4 | 查看文件内容 | 列出目录内容（ls） |
| 写 | `w` | 2 | 修改文件内容 | 创建/删除目录中的文件 |
| 执行 | `x` | 1 | 运行程序/脚本 | 进入目录（cd） |

<LinuxPermissionsDemo />

### 数字权限速算

三个数字分别代表 Owner、Group、Others 的权限，每个数字是 r(4) + w(2) + x(1) 的和：

```
chmod 755 script.sh
  7 = rwx (4+2+1)  → 所有者：读+写+执行
  5 = r-x (4+0+1)  → 组：读+执行
  5 = r-x (4+0+1)  → 其他人：读+执行
```

| 常见权限 | 含义 | 典型用途 |
|---------|------|---------|
| `644` | rw-r--r-- | 普通文件（所有者可写，其他人只读） |
| `755` | rwxr-xr-x | 可执行文件/目录 |
| `600` | rw------- | 私密文件（如 SSH 密钥） |
| `777` | rwxrwxrwx | 所有人可读写执行（危险，避免使用） |

### sudo：临时获取超级权限

普通用户权限有限，有些操作需要 root 权限。`sudo` 让你临时以 root 身份执行命令：

```bash
# 普通用户无法修改系统配置
$ vim /etc/nginx/nginx.conf
# Permission denied

# 用 sudo 临时提权
$ sudo vim /etc/nginx/nginx.conf
# 输入你的密码后可以编辑

# 切换到 root 用户（谨慎使用）
$ sudo su -
```

::: warning 最小权限原则
永远不要用 `chmod 777` 解决权限问题，这等于把门锁拆了。正确做法是搞清楚谁需要什么权限，精确授予。同样，不要长期以 root 身份操作，只在必要时用 `sudo`。
:::

---

## 4. Shell 基础

Shell 是你和 Linux 内核之间的"翻译官"。你输入命令，Shell 解释并交给内核执行。最常用的 Shell 是 **Bash**（大多数 Linux 发行版默认）和 **Zsh**（macOS 默认）。

### 管道与重定向

这是 Shell 最强大的两个特性：

| 符号 | 名称 | 作用 | 示例 |
|------|------|------|------|
| `|` | 管道 | 把前一个命令的输出作为后一个的输入 | `cat log | grep ERROR` |
| `>` | 输出重定向 | 把输出写入文件（覆盖） | `echo "hello" > file.txt` |
| `>>` | 追加重定向 | 把输出追加到文件末尾 | `echo "world" >> file.txt` |
| `<` | 输入重定向 | 从文件读取输入 | `wc -l < file.txt` |
| `2>` | 错误重定向 | 把错误信息写入文件 | `cmd 2> error.log` |
| `2>&1` | 合并输出 | 把错误和正常输出合并 | `cmd > all.log 2>&1` |

### 环境变量

环境变量是 Shell 中的"全局配置"，影响命令的行为：

```bash
# 查看所有环境变量
env

# 查看某个变量
echo $PATH
echo $HOME

# 临时设置（只在当前 Shell 有效）
export API_KEY="abc123"

# 永久设置（写入配置文件）
echo 'export API_KEY="abc123"' >> ~/.bashrc
source ~/.bashrc   # 让配置立即生效
```

| 常见变量 | 含义 | 示例值 |
|---------|------|--------|
| `$PATH` | 命令搜索路径 | `/usr/local/bin:/usr/bin:/bin` |
| `$HOME` | 用户主目录 | `/home/alice` |
| `$USER` | 当前用户名 | `alice` |
| `$PWD` | 当前工作目录 | `/var/log` |
| `$SHELL` | 当前使用的 Shell | `/bin/bash` |

### Shell 脚本入门

把多个命令写进一个文件，就是 Shell 脚本。它是自动化运维的起点：

```bash
#!/bin/bash
# deploy.sh - 简单的部署脚本

APP_DIR="/opt/myapp"
LOG_FILE="/var/log/deploy.log"

echo "$(date) - 开始部署..." >> $LOG_FILE

# 拉取最新代码
cd $APP_DIR && git pull origin main

# 安装依赖
npm install --production

# 重启服务
pm2 restart myapp

echo "$(date) - 部署完成" >> $LOG_FILE
```

```bash
# 给脚本执行权限并运行
chmod +x deploy.sh
./deploy.sh
```

::: tip 脚本调试技巧
在脚本开头加 `set -ex`：`-e` 让脚本遇到错误立即退出（而不是继续执行），`-x` 会打印每条执行的命令（方便排查问题）。这两个选项在生产脚本中几乎是标配。
:::

---

## 5. 实战场景

理论学完了，来看几个开发中最常遇到的实战场景。

### 5.1 日志排查

服务出问题，第一反应就是看日志。以下是日志排查的常用套路：

```bash
# 1. 实时跟踪日志（最常用）
tail -f /var/log/app/error.log

# 2. 搜索特定时间段的错误
grep "2024-01-15 14:" error.log | grep "ERROR"

# 3. 统计每小时的错误数量
grep "ERROR" app.log | awk '{print substr($1,1,13)}' | uniq -c

# 4. 查看最近 100 行日志
tail -100 app.log

# 5. 在多个日志文件中搜索
grep -r "OutOfMemory" /var/log/app/
```

### 5.2 进程排查

应用卡死、CPU 飙高、内存泄漏——这些问题都需要从进程入手：

```bash
# 查看 CPU 占用最高的进程
ps aux --sort=-%cpu | head -10

# 查看内存占用最高的进程
ps aux --sort=-%mem | head -10

# 查找特定进程
ps aux | grep "node"

# 查看进程的详细信息（包括线程）
top -Hp <PID>

# 查看进程打开的文件
lsof -p <PID>

# 优雅终止进程（SIGTERM）
kill <PID>

# 强制终止（SIGKILL，最后手段）
kill -9 <PID>
```

### 5.3 网络诊断

服务连不上？先搞清楚是网络问题还是应用问题：

```bash
# 测试目标是否可达
ping -c 4 google.com

# 检查端口是否开放
telnet db-server 3306
# 或者用 nc
nc -zv db-server 3306

# 查看本机监听的端口
ss -tlnp
# 或
netstat -tlnp

# DNS 解析检查
dig api.example.com
nslookup api.example.com

# 测试 HTTP 接口
curl -v http://localhost:3000/health

# 查看网络连接状态统计
ss -s
```

### 5.4 磁盘空间排查

磁盘满了是线上最常见的故障之一：

```bash
# 查看各分区使用情况
df -h

# 找出占用空间最大的目录
du -sh /* 2>/dev/null | sort -rh | head -10

# 进一步定位大目录
du -sh /var/log/* | sort -rh | head -10

# 查找大文件（>100MB）
find / -type f -size +100M 2>/dev/null | head -20

# 清理常见的空间占用
# 清理旧日志
sudo journalctl --vacuum-size=500M
# 清理 Docker 无用镜像
docker system prune -a
```

::: tip 线上排查口诀
**"一看日志，二看进程，三看网络，四看磁盘"**。90% 的线上问题都能通过这四步定位到原因。养成习惯后，排查效率会大幅提升。
:::

---

## 总结

Linux 是开发者的必备技能，掌握基础就能应对大部分日常开发和运维场景。

回顾本章的关键要点：

1. **一切皆文件**：Linux 用文件抽象统一了对硬件、进程、网络等资源的访问方式
2. **命令组合**：单个命令功能简单，通过管道 `|` 组合才能发挥真正威力
3. **权限模型**：Owner/Group/Others × Read/Write/Execute，用数字（如 755）快速设置
4. **Shell 基础**：管道、重定向、环境变量、脚本是自动化的基石
5. **实战排查**：日志 → 进程 → 网络 → 磁盘，四步定位大部分线上问题

## 延伸阅读

- [Linux 命令大全](https://man7.org/linux/man-pages/) - Linux man pages 官方文档
- [The Linux Command Line](https://linuxcommand.org/tlcl.php) - 免费的 Linux 命令行入门书
- [Linux Journey](https://linuxjourney.com/) - 交互式 Linux 学习网站
- [explainshell.com](https://explainshell.com/) - 输入命令自动解释每个参数的含义
