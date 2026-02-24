# 安全思维与攻防基础

::: tip 前言
**你的网站安全吗？** 很多开发者觉得"安全是安全团队的事"，直到自己的项目被攻击、用户数据泄露。安全不是可选项，而是每个开发者的基本功。

本章带你建立安全思维，理解最常见的 Web 安全威胁和防御方法。
:::

**这篇文章会带你学什么？**

| 章节 | 内容 | 核心概念 |
|-----|------|---------|
| **第 1 章** | 安全思维模型 | 像攻击者一样思考 |
| **第 2 章** | 常见 Web 攻击 | XSS、SQL 注入、CSRF |
| **第 3 章** | 防御策略 | 输入验证、输出编码、权限控制 |
| **第 4 章** | 安全检查清单 | 项目上线前的安全自查 |

学完本章，你将具备基本的安全意识，能识别和防御最常见的 Web 安全威胁。

---

## 0. 全景图：为什么开发者需要懂安全？

想象你建了一栋房子，功能齐全、装修漂亮，但忘了装锁。安全漏洞就是代码世界里"忘了装的锁"。

::: tip 安全的核心原则
- **最小权限**：只给必要的权限，不多给一分
- **纵深防御**：不依赖单一防线，层层设防
- **永不信任输入**：所有来自外部的数据都可能是恶意的
- **安全默认**：默认配置应该是安全的，而不是方便的
:::

---

## 1. 常见 Web 攻击

通过下面的交互组件，了解三种最常见的 Web 攻击原理（仅用于教育目的）：

<WebSecurityDemo />

### 1.1 XSS（跨站脚本攻击）

攻击者将恶意脚本注入到网页中，当其他用户访问时，脚本在他们的浏览器中执行。

```javascript
// 危险：直接将用户输入插入 HTML
element.innerHTML = userInput
// 如果 userInput 是 <script>恶意代码</script>，就会执行

// 安全：使用 textContent 或转义
element.textContent = userInput
// 或使用框架的自动转义（Vue 的 {{ }}、React 的 JSX）
```

**防御要点**：
- 输出时转义 HTML 特殊字符（`<`, `>`, `&`, `"`, `'`）
- 使用现代框架的自动转义机制
- 设置 `Content-Security-Policy` HTTP 头

### 1.2 SQL 注入

攻击者通过构造特殊输入，篡改 SQL 查询的逻辑。

```javascript
// 危险：字符串拼接 SQL
const query = `SELECT * FROM users WHERE name = '${userInput}'`
// 如果 userInput 是 ' OR '1'='1，就会返回所有用户

// 安全：使用参数化查询
const query = 'SELECT * FROM users WHERE name = ?'
db.execute(query, [userInput])
```

**防御要点**：
- 永远使用参数化查询 / 预编译语句
- 使用 ORM 框架（如 Prisma、Sequelize）
- 限制数据库账号权限

### 1.3 CSRF（跨站请求伪造）

攻击者诱导已登录用户访问恶意页面，利用用户的登录状态发起请求。

**防御要点**：
- 使用 CSRF Token
- 检查 `Referer` / `Origin` 头
- 关键操作使用 POST 而非 GET
- Cookie 设置 `SameSite` 属性

---

## 2. 防御策略

### 2.1 输入验证

```javascript
// 白名单验证：只允许预期的格式
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

// 长度限制
function isValidUsername(name) {
  return name.length >= 2 && name.length <= 50
}
```

### 2.2 敏感数据保护

| 数据类型 | 保护措施 |
|---------|---------|
| 密码 | bcrypt/argon2 哈希，永不明文存储 |
| API 密钥 | 环境变量，不提交到代码仓库 |
| 用户数据 | HTTPS 传输，加密存储 |
| 会话令牌 | HttpOnly + Secure + SameSite Cookie |

### 2.3 HTTP 安全头

```
Content-Security-Policy: default-src 'self'
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
Strict-Transport-Security: max-age=31536000
```

---

## 3. 安全检查清单

上线前，用下面的交互组件检查你的项目安全状况：

<SecurityChecklistDemo />

### 3.1 开发阶段

- [ ] 所有用户输入都经过验证和转义
- [ ] 使用参数化查询，无 SQL 拼接
- [ ] 密码使用 bcrypt 等算法哈希存储
- [ ] 敏感配置通过环境变量管理
- [ ] `.env` 文件已加入 `.gitignore`

### 3.2 部署阶段

- [ ] 启用 HTTPS
- [ ] 配置安全 HTTP 头
- [ ] 关闭调试模式和详细错误信息
- [ ] 数据库使用最小权限账号
- [ ] 定期更新依赖（`npm audit`）

---

## 4. 总结

1. **安全思维**：永不信任外部输入，最小权限，纵深防御
2. **常见攻击**：XSS、SQL 注入、CSRF 是最高频的 Web 安全威胁
3. **防御策略**：输入验证、输出编码、参数化查询、安全 HTTP 头
4. **安全习惯**：上线前过安全检查清单，定期审计依赖

::: tip 终极思考
安全不是一次性的工作，而是贯穿开发全过程的习惯。就像开车系安全带——不是因为你预期会出事故，而是因为这是基本的安全意识。**写每一行代码时都问自己：如果这个输入是恶意的，会发生什么？**
:::

---

## 延伸阅读

- **OWASP Top 10**：Web 应用安全十大风险清单，每个开发者都应该了解。
- **实践工具**：使用 `npm audit` 检查依赖漏洞，使用 ESLint 安全插件检查代码。
- **深入学习**：了解 HTTPS 原理、JWT 安全实践、OAuth 2.0 安全考量。
- **安全社区**：关注安全公告，及时修补已知漏洞。
