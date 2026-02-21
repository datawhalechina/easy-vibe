# SSH 与密钥认证

> 💡 **学习指南**：每次 `git push` 输密码？连服务器总被提示"Permission denied"？本章用 5 分钟带你搞懂 SSH 密钥认证的原理，以及如何一键免密登录 GitHub 和服务器。

---

## 0. 你一定遇到过这些场景

- `git push` 时反复弹出密码输入框，烦不胜烦
- SSH 连接服务器失败，不知道 `id_rsa` 和 `id_ed25519` 是什么
- 听说"公钥"和"私钥"，但搞不清哪个给别人、哪个自己留

**核心矛盾**：密码不安全、又麻烦。SSH 密钥就是用来同时解决安全性和便利性的方案。

---

## 1. 密码 vs 密钥：为什么密钥更好？

👇 动手点点看：对比密码登录和密钥登录的区别

<SSHAuthDemo />

::: tip 💡 一句话总结
密码登录 = 每次把密码发过去让对方核对（密码可能被截获）；  
密钥登录 = 证明"我有钥匙"但不用把钥匙给你看（私钥永不传输）。
:::

---

## 2. 非对称加密：公钥和私钥

SSH 密钥基于**非对称加密**，一次生成两把钥匙：

| | 私钥 (Private Key) | 公钥 (Public Key) |
|---|---|---|
| **保存位置** | 你的电脑 `~/.ssh/id_ed25519` | 服务器/GitHub |
| **可以给别人吗** | ❌ 绝不 | ✅ 随便给 |
| **功能** | 签名（证明身份） | 验签（验证身份） |
| **类比** | 钥匙 | 锁 |

### 常见密钥类型

| 类型 | 命令 | 推荐度 | 说明 |
|---|---|---|---|
| **Ed25519** | `ssh-keygen -t ed25519` | ⭐⭐⭐ | 最新最快最安全 |
| **RSA** | `ssh-keygen -t rsa -b 4096` | ⭐⭐ | 兼容性好，但较慢 |
| **ECDSA** | `ssh-keygen -t ecdsa` | ⭐ | 一般不推荐 |

---

## 3. 实战：生成并配置 SSH 密钥

### 3.1 生成密钥对

```bash
ssh-keygen -t ed25519 -C "your@email.com"
```

执行后会提示：
- **文件路径**：直接回车用默认路径 `~/.ssh/id_ed25519`
- **密码短语**：可以设置额外保护（也可留空）

### 3.2 把公钥添加到 GitHub

```bash
# 1. 复制公钥内容
cat ~/.ssh/id_ed25519.pub | pbcopy  # macOS
cat ~/.ssh/id_ed25519.pub | xclip   # Linux

# 2. 打开 GitHub → Settings → SSH and GPG keys → New SSH key
# 3. 粘贴公钥，保存

# 4. 测试连接
ssh -T git@github.com
# 成功会看到: Hi username! You've been authenticated...
```

### 3.3 把公钥添加到服务器

```bash
# 方式一：ssh-copy-id（推荐）
ssh-copy-id user@your-server

# 方式二：手动复制
cat ~/.ssh/id_ed25519.pub | ssh user@server "mkdir -p ~/.ssh && cat >> ~/.ssh/authorized_keys"
```

---

## 4. SSH Config：告别长命令

在 `~/.ssh/config` 中配置别名，一次配置终身受益：

```
Host dev
  HostName 192.168.1.100
  User deploy
  IdentityFile ~/.ssh/id_ed25519

Host github.com
  HostName github.com
  User git
  IdentityFile ~/.ssh/id_ed25519
```

配置后的效果：

| 之前 | 之后 |
|---|---|
| `ssh -i ~/.ssh/id_ed25519 deploy@192.168.1.100` | `ssh dev` |
| 每次都要记 IP 和用户名 | 记一个别名就够 |

---

## 5. 常见问题排查

| 问题 | 原因 | 解决方案 |
|---|---|---|
| `Permission denied (publickey)` | 公钥没添加到服务器 | `ssh-copy-id user@server` |
| `WARNING: UNPROTECTED PRIVATE KEY FILE` | 私钥文件权限太宽 | `chmod 600 ~/.ssh/id_ed25519` |
| `Could not resolve hostname` | SSH Config 配置有误 | 检查 `~/.ssh/config` 格式 |
| GitHub 还是要密码 | 用的 HTTPS 而非 SSH | 改用 `git@github.com:user/repo.git` |

---

## 6. 总结

::: tip 📚 核心要点
1. **密钥 > 密码**：私钥永不传输，比密码安全得多
2. **推荐 Ed25519**：最现代的密钥算法，速度快、安全性高
3. **公钥随便给，私钥绝不泄露**：记住这条铁律
4. **SSH Config**：配一次别名，之后 `ssh 别名` 一键连接
5. **GitHub/GitLab**：添加公钥后，`git push/pull` 再也不需要输密码
:::

**下一步学习**：
- [端口与 localhost](./ports-localhost) - 理解网络连接的基础
- [环境变量与 PATH](./environment-path) - 理解系统配置
