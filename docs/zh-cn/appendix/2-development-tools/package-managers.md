# 包管理器

> 💡 **学习指南**：写代码不必从零造轮子——99% 的功能已经有人写好并发布到互联网上了。**包管理器**就是那个帮你找到、下载并管理这些"现成零件"的工具。本章围绕一个核心问题展开：**如何让代码依赖变得可重现、可协作、可维护？**

---

## 0. 为什么你一定会用到包管理器？

想象你要写一个能发 HTTP 请求的 Node.js 程序。有两条路：

- **方法 A（手动）**：自己实现 TCP 连接、HTTP 协议解析、重定向处理、超时机制……估计要写几千行代码，调试几个月。
- **方法 B（包管理器）**：`npm install axios`，十秒钟，一行代码搞定。

包管理器本质上是**代码的「应用商店」**。它帮你：

1. 在中央仓库（Registry）里找到别人发布的库
2. 自动下载并安装到你的项目里
3. 处理这个库自己依赖的其他库（依赖的依赖）
4. 记录你用的是哪个精确版本，让团队协作不出问题

---

## 1. 各语言 / 系统生态的包管理器一览

不同编程语言和操作系统有各自的生态工具链，但底层逻辑完全一致。

👇 **动手点点看**：选择你熟悉的生态，探索它的主流包管理工具。

<PackageManagerOverviewDemo />

### 1.1 包去哪里下载？—— Registry（注册表）

每个生态背后都有一个中央仓库，存放所有可下载的包：

| 生态 | 注册表 | 包数量 |
| :--- | :--- | :--- |
| JavaScript | [npmjs.com](https://npmjs.com) | 200 万+ |
| Python | [pypi.org](https://pypi.org) | 50 万+ |
| Rust | [crates.io](https://crates.io) | 15 万+ |
| Go | [pkg.go.dev](https://pkg.go.dev) | 50 万+ |
| macOS/Linux 工具 | [formulae.brew.sh](https://formulae.brew.sh) | 7000+ |
| Windows 软件 | [winget.run](https://winget.run) / [chocolatey.org](https://chocolatey.org) | 数万款 |

### 1.2 JavaScript 三强对比：npm vs yarn vs pnpm

功能相近，区别主要体现在**速度和磁盘占用**：

```text
磁盘占用：pnpm（硬链接共享）< yarn PnP（零 node_modules）< npm（完整复制）
安装速度：pnpm ≈ yarn > npm
使用习惯：npm（最通用）> pnpm（新项目推荐）> yarn（部分团队）
```

**推荐**：新项目用 `pnpm`，已有项目维持原有工具，不要随意切换。

### 1.3 Windows 三强对比：winget vs Chocolatey vs Scoop

| | winget | Chocolatey | Scoop |
| :--- | :--- | :--- | :--- |
| **官方背书** | Microsoft 官方 | 第三方 | 第三方 |
| **需要管理员** | 部分需要 | 是 | **不需要** |
| **适合场景** | 日常软件安装 | 企业批量部署 | 开发工具管理 |
| **包数量** | 多且增长快 | 最多（10000+）| 聚焦开发工具 |

**推荐**：日常用 `winget`，开发工具用 `scoop`，企业自动化用 `Chocolatey`。

---

## 2. 安装包 —— 背后发生了什么？

输入 `npm install axios` 后，命令行安静了几秒，然后就好了。这几秒里到底发生了什么？

👇 **动手点点看**：选择一个包，点击"运行"，观察安装的全过程。

<PackageInstallDemo />

### 2.1 四个阶段详解

**① 依赖解析（Resolve）**

包管理器先"读懂"你要装什么。以 `axios` 为例，它自己依赖 `follow-redirects`、`form-data` 等包，这些也都要安装。这个过程叫做**构建依赖树**。

**② 下载（Fetch）**

从 Registry 下载所有需要的包（`.tgz` 格式的压缩包）。聪明的包管理器会：
- 并行下载多个包，而不是一个个等待
- 先查本地缓存，命中就不走网络

**③ 链接（Link）**

把下载的包解压放到 `node_modules/` 目录，并处理好引用关系。

**④ 写锁文件（Lockfile）**

把这次安装的**精确版本号**写入 `package-lock.json`（或 `yarn.lock` / `pnpm-lock.yaml`）。

### 2.2 最常用命令速查

```bash
# ── JavaScript (npm) ──────────────────────────────────
npm install              # 按 package.json 安装所有依赖
npm install axios        # 安装新包（生产依赖）
npm install -D jest      # 安装开发依赖（只在开发时用）
npm install -g tsx       # 全局安装（任何目录都能用）
npm uninstall axios      # 卸载包
npm update               # 升级所有包到兼容的最新版
npm run build            # 运行 package.json scripts 里的脚本
npx create-react-app .   # 临时运行，不安装到项目

# ── Python (pip) ──────────────────────────────────────
pip install requests           # 安装包
pip install requests==2.28.0   # 安装指定版本
pip freeze > requirements.txt  # 导出当前依赖列表
pip install -r requirements.txt # 按列表安装

# ── Rust (cargo) ──────────────────────────────────────
cargo add serde    # 添加依赖（会自动更新 Cargo.toml）
cargo build        # 构建项目
cargo test         # 运行测试
cargo run          # 运行项目

# ── Go (go mod) ───────────────────────────────────────
go get github.com/gin-gonic/gin  # 添加依赖
go mod tidy                      # 整理依赖（删多余、补缺失）
go build ./...                   # 构建

# ── Windows (winget) ──────────────────────────────────
winget install Git.Git           # 安装软件
winget upgrade --all             # 更新所有已安装软件
```

### 2.3 npm scripts 是什么？

`package.json` 里有一个 `scripts` 字段，这是 npm 内置的**任务运行器**：

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "test": "jest",
    "lint": "eslint src/"
  }
}
```

运行方式：`npm run dev`、`npm run build`。这样做的好处是：
- **统一入口**：团队成员不需要记住底层工具的具体命令
- **环境自动配置**：运行时会自动把 `node_modules/.bin` 加入 PATH，可以直接用本地安装的工具

---

## 3. 全局安装 vs 本地安装

这是新手最容易困惑的概念之一。

### 3.1 两者的区别

```bash
npm install axios        # 本地安装：装到 ./node_modules/，只有当前项目能用
npm install -g typescript  # 全局安装：装到系统目录，任何项目/目录都能用
```

| | 本地安装 | 全局安装 |
| :--- | :--- | :--- |
| **存放位置** | `./node_modules/` | 系统级目录（如 `/usr/local/lib/`） |
| **适合** | 项目依赖的库（axios、vue、react） | 命令行工具（tsc、eslint、create-react-app） |
| **版本隔离** | 每个项目独立版本 ✅ | 全机共用一个版本 ⚠️ |
| **团队一致性** | 锁文件保证一致 ✅ | 各人版本可能不同 ⚠️ |

### 3.2 黄金法则

> **库类依赖（axios、lodash、vue）永远本地安装；  
> 命令行工具（tsc、eslint）优先本地安装，用 `npx` 调用。**

**为什么命令行工具也推荐本地安装？**

假设你全局安装了 `eslint@8`，但项目 A 需要 `eslint@9` 的新规则，你就要在全局和项目之间反复切换。把 `eslint` 装到本地，用 `npx eslint .` 调用，每个项目都能独立配置自己的版本。

### 3.3 npx —— 临时运行，不污染环境

`npx` 是 npm 自带的工具运行器，允许你**不安装直接运行**一个包：

```bash
# 不安装 create-vue，直接运行它来初始化项目
npx create-vue my-project

# 不安装 prettier，直接格式化文件
npx prettier --write src/

# 强制使用指定版本（忽略已安装的）
npx typescript@5.4 tsc --version
```

Python 的 `uvx`、Rust 的 `cargo run` 也提供了类似的"临时运行"能力：

```bash
uvx ruff check .       # Python：临时运行 ruff 检查器
cargo install ripgrep  # Rust：安装到全局，变成系统命令 rg
```

---

## 4. 版本号的秘密 —— 语义化版本

你在 `package.json` 里会看到这样的内容：

```json
{
  "dependencies": {
    "axios": "^1.6.8",
    "typescript": "~5.4.0"
  }
}
```

这里的 `^` 和 `~` 是什么意思？

👇 **动手点点看**：鼠标悬停版本号各个部分，理解含义；点击范围符号，看哪些版本会被接受。

<DependencyTreeDemo />

### 4.1 为什么不锁死版本？

| 做法 | 优点 | 缺点 |
| :--- | :--- | :--- |
| `"axios": "1.6.8"`（精确锁定） | 完全可预测 | 安全补丁无法自动更新 |
| `"axios": "^1.6.8"`（兼容范围，推荐） | 自动获取 bug 修复和新功能 | 极少情况下引入小不兼容 |
| `"axios": "*"`（任意版本） | 总是最新 | 主版本升级会彻底破坏代码 |

**最佳实践**：用 `^` 声明范围 + 锁文件固定实际版本，两者配合使用。

### 4.2 依赖地狱是什么？

当你依赖 50 个包，每个包又依赖若干包，"依赖树"可能有几百个节点。如果两个你依赖的包需要**同一个库的不兼容版本**，就产生了"依赖冲突"。

各生态的解法：
- **npm v3+**：同主版本提升到顶层共享，不同主版本各自安装一份
- **pnpm**：硬链接 + 严格隔离，从根本上防止"幽灵依赖"（没声明却能用的包）
- **cargo（Rust）**：语言层面强制每个包只能依赖同一版本，彻底规避冲突
- **go mod（Go）**：最小版本选择（MVS）策略，选能满足所有约束的最低版本

---

## 5. 锁文件 —— 团队协作的基石

### 5.1 为什么需要锁文件？

假设 `package.json` 写的是 `"axios": "^1.6.0"`：

- 你今天安装 → 装到 `1.6.8`
- 队友明天安装 → 可能装到 `1.7.0`（昨晚刚发布）
- CI 服务器下周 → 可能装到 `1.7.1`

同样的代码，三个人跑出不同结果。**锁文件**记录每个包的精确版本，所有人按它安装，结果完全一致。

| 场景 | 命令 | 行为 |
| :--- | :--- | :--- |
| 开发环境同步 | `npm install` | 参考锁文件安装，不升级版本 |
| CI / 生产部署 | `npm ci` | **严格**按锁文件安装，有差异直接报错 |
| 主动升级版本 | `npm update` | 在允许范围内升级，并更新锁文件 |

### 5.2 锁文件应该提交到 Git 吗？

**应用程序必须提交，发布到 npm 的库可以不提交。**

- ✅ **Web 应用、后端服务**：必须提交，确保部署环境和开发环境完全一致
- ❌ **npm 发布的库**：通常不提交，库的使用者有自己的锁文件
- ✅ **Python 项目**：`requirements.txt` 本身就起锁文件作用，应该提交
- ✅ **Go 项目**：`go.sum` 必须提交，用于完整性校验

---

## 6. Python 虚拟环境

Python 有一个特别需要注意的概念：**虚拟环境（venv）**。

**为什么需要？**

Python 默认**全局**安装包。你的项目 A 需要 `requests==2.28`，项目 B 需要 `requests==2.31`，两者会互相冲突。

**解决方案**：为每个项目创建独立的虚拟环境，互不干扰。

```bash
# 1. 创建虚拟环境（在项目根目录运行）
python -m venv .venv

# 2. 激活虚拟环境
source .venv/bin/activate        # macOS / Linux
.venv\Scripts\activate           # Windows（命令提示符 CMD）
.venv\Scripts\Activate.ps1       # Windows（PowerShell）

# 3. 激活后，pip install 只影响当前虚拟环境，不污染全局
pip install requests

# 4. 退出虚拟环境
deactivate
```

> ⚠️ **Windows 常见问题**：PowerShell 默认禁止运行脚本，需先执行：
> ```powershell
> Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
> ```

**现代替代方案**：
- `conda create -n myproject python=3.11` —— 连 Python 版本都一起管理
- `uv venv && source .venv/bin/activate` —— Rust 写的，创建速度飞快

**`.venv` 要提交到 Git 吗？**

不要！`.venv` 是本机生成的，应加入 `.gitignore`。用 `requirements.txt` 或 `pyproject.toml` 来描述依赖。

---

## 7. 常见问题速查

**Q: `node_modules` 要提交到 Git 吗？**

不要！通常有几百 MB，应该加入 `.gitignore`。有了 `package-lock.json`，任何人都能 `npm install` 快速重建。

**Q: 安装失败 / 出现奇怪报错怎么办？**

```bash
# 清空缓存，删除旧安装，重来
npm cache clean --force
rm -rf node_modules package-lock.json   # macOS/Linux
rmdir /s /q node_modules && del package-lock.json  # Windows CMD
npm install
```

**Q: 安装速度太慢？**

```bash
# 切换到国内镜像（推荐写入 .npmrc 文件，不污染全局）
echo "registry=https://registry.npmmirror.com" > .npmrc

# pip 也可以配置镜像
pip install requests -i https://pypi.tuna.tsinghua.edu.cn/simple
```

**Q: 包有安全漏洞怎么处理？**

```bash
npm audit          # 扫描已知漏洞
npm audit fix      # 自动修复兼容的漏洞
npm audit fix --force  # 强制升级（可能有破坏性，谨慎用）
```

**Q: 怎么知道某个包是否值得信赖？**

在 [npmjs.com](https://npmjs.com) 或 [bundlephobia.com](https://bundlephobia.com) 查看：
- 周下载量（越高越可信）
- 最后更新时间（超过 2 年没更新要谨慎）
- 依赖数量（依赖越多，引入问题的可能性越大）
- GitHub Stars 和 Issues 活跃度

**Q: Windows 上 winget 安装的软件在哪？**

winget 默认安装到系统目录（需要管理员）或 `%LOCALAPPDATA%\Microsoft\WindowsApps`。Scoop 安装的软件统一在 `%USERPROFILE%\scoop\apps\`，方便管理和迁移。

---

## 8. 名词对照表

| 英文术语 | 中文对照 | 解释 |
| :--- | :--- | :--- |
| **Package** | 包 / 库 | 别人写好并发布的代码模块 |
| **Registry** | 注册表 / 仓库 | 所有包的中央存储服务器（如 npmjs.com） |
| **Dependency** | 依赖 | 你的项目运行所需要的其他包 |
| **devDependency** | 开发依赖 | 只在开发阶段需要的包（测试框架、构建工具等） |
| **Lockfile** | 锁文件 | 记录精确版本号，保证环境一致性 |
| **SemVer** | 语义化版本 | MAJOR.MINOR.PATCH 版本命名规范 |
| **node_modules** | 模块目录 | npm 安装的包实际存放的目录 |
| **venv** | 虚拟环境 | Python 项目的独立包隔离沙箱 |
| **tarball** | 压缩包 | 包的分发格式，通常为 `.tgz` 文件 |
| **Hoisting** | 提升 | npm 将子依赖提升到顶层以避免重复安装 |
| **Phantom Dependency** | 幽灵依赖 | 未在配置文件声明却能被使用的包（pnpm 可防止） |
| **npx** | — | npm 自带的包运行器，临时运行包而无需安装 |
| **go.sum** | — | Go 模块的哈希校验文件，防止依赖被篡改 |
| **Crate** | — | Rust 生态中"包"的单位名称 |
| **winget** | — | Windows 官方包管理器（Windows 10/11 内置） |

---

## 总结：包管理器的本质

四句话记住核心：

1. **包管理器 = 应用商店**：帮你找到、安装、管理代码零件，不必重复造轮子。
2. **锁文件 = 团队契约**：固定精确版本，让"在我机器上好好的"成为历史。
3. **语义化版本 = 沟通语言**：`^` 安全地获取更新，MAJOR 变了就要小心。
4. **本地 > 全局**：项目依赖尽量本地安装，`npx` / `uvx` 临时运行工具，保持环境纯净。
