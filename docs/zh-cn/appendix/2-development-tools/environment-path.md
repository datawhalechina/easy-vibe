# 环境变量与 PATH

> 💡 **学习指南**：每次你在终端输入 `git` 或 `python`，系统都要去找这个程序在哪里。每次你的代码调用大模型 API，程序要知道用哪个密钥。这两件事背后都是同一套机制——**环境变量**。

---

## 0. 每个程序身边都带着一组配置

运行中的每个程序，都持有一组「键=值」配置，叫做**环境变量**。程序可以随时读取这些配置，用来了解当前的运行环境。

点击下方列表里的任意变量，在终端里"查看"它的值：

<EnvVarOverviewDemo />

---

## 1. PATH：Shell 怎么找到你输入的命令

`PATH` 是一个特殊的环境变量，存着一串目录路径（用冒号分隔）。你输入 `git` 时，Shell 就按这串目录的顺序，一个一个地进去找名叫 `git` 的可执行文件——找到第一个就立刻停止。

```bash
$ echo $PATH
/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin
```

选择一个命令，观察 Shell 逐目录搜索的过程：

<PathSearchDemo />

**三个关键规律**：
- 目录在 PATH 里越靠前，优先级越高
- 找到第一个就停止，不会继续搜索
- 所有目录都没有 → `command not found`

---

## 2. 为什么安装工具后要重启终端？

安装 nvm、Homebrew、conda 这类工具时，安装脚本会自动在 `~/.zshrc` 里追加一行，把自己的目录加入 PATH：

```bash
# 安装脚本自动写入的内容（示例）
export PATH="/usr/local/opt/python@3.12/bin:$PATH"
```

这行代码只在**新 Shell 启动时**才执行。已经打开的终端窗口不受影响，所以：

```bash
# 不重启也能立刻生效
source ~/.zshrc
```

**AI 开发工具常见情况**：

```bash
# Ollama / pipx 装完报 command not found
which ollama          # 查实际安装位置

# pip 安装的 CLI 工具路径（加入 PATH）
# macOS：~/Library/Python/3.x/bin
# Linux：~/.local/bin
export PATH="$PATH:$HOME/.local/bin"

# 推荐用 pipx 安装命令行工具，自动管理 PATH
pipx install aider-chat
```

---

## 3. 变量的作用域：谁能看见这个变量？

环境变量不是广播给所有程序的——每个进程持有**自己的一份副本**，从父进程继承而来，修改自己的副本不会影响父进程。

下图展示三个层级。在「用户级」里 export 一个新变量，看它是否出现在「进程级」：

<EnvScopeDemo />

---

## 4. export：决定子进程能不能读到这个变量

设置变量时，加不加 `export` 是完全不同的两件事：

<EnvExportDemo />

要让变量跨会话永久存在，把 `export` 写入配置文件：

```bash
# macOS (zsh)
echo 'export MY_VAR="value"' >> ~/.zshrc
source ~/.zshrc       # 立刻生效，不用重开终端

# Linux (bash)
echo 'export MY_VAR="value"' >> ~/.bashrc
source ~/.bashrc
```

---

## 5. API 密钥：绝对不能写进代码

调用 OpenAI、Anthropic、DeepSeek 等 API 时，密钥就是你的「身份证 + 信用卡」。泄露了，别人可以用你的额度消费，费用由你承担。

最常见的错误是把密钥直接写在代码里：

<ApiKeyDangerDemo />

---

## 6. 本地开发：用 .env 文件管密钥

本地开发时，把密钥放在项目根目录的 `.env` 文件里，代码通过 dotenv 库读取。`.env` 必须加入 `.gitignore`，不能提交到 Git。

左边写配置，右边读取——切换语言看两种写法：

<DotEnvDemo />

---

## 7. 生产环境：让运行平台注入密钥

`.env` 是开发阶段的便利工具。服务器和云平台上，应该由**运行环境**负责注入密钥，代码本身完全不感知密钥放在哪里：

<ServerSecretDemo />

---

## 8. 实战排错

### `command not found`

```bash
# 第一步：确认是否在 PATH 里
which python3         # 有输出说明找到了

# 第二步：找到程序实际位置（macOS）
brew list python | grep bin

# 第三步：把目录加入 PATH
export PATH="/找到的路径:$PATH"
source ~/.zshrc       # 写入配置文件后记得 source
```

### 装了两个版本，用的不是我想要的

```bash
which python
# /usr/bin/python ← 系统旧版，在 PATH 靠前

# 把新版目录放到 PATH 最前面
export PATH="/usr/local/bin:$PATH"

which python
# /usr/local/bin/python ← 新版，现在优先了
```

### 变量明明设置了，程序却读不到

| 原因 | 解决 |
|:---|:---|
| 忘了 `export` | 加上 `export` 再试 |
| 改了 `~/.zshrc` 没生效 | `source ~/.zshrc` |
| 用了 `.env` 但没装 dotenv | `pip install python-dotenv` / `npm install dotenv` |
| 服务器上只在 SSH 会话有效 | 改用 systemd `EnvironmentFile` |

---

## 名词速查

| 术语 | 含义 |
|:---|:---|
| **PATH** | 存储 Shell 搜索可执行文件的目录列表，冒号分隔，顺序决定优先级 |
| **export** | 将变量标记为可继承，子进程启动时自动获得副本 |
| **source** | 在当前 Shell 重新执行配置文件，使修改立即生效 |
| **which** | 显示某命令对应的可执行文件路径（PATH 搜索的结果） |
| **.env** | 项目本地配置文件，存开发用密钥，必须加入 `.gitignore` |
| **.env.example** | 变量名完整、值留空的模板，可以安全提交到 Git |
| **chmod 600** | 文件权限：只有所有者可读写，适合保护密钥文件 |
| **Secret Scanner** | GitHub 等平台自动扫描密钥泄露，发现后通知厂商吊销 |
