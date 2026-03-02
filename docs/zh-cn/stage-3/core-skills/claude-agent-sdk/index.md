# Claude Agent SDK 完全指南

## 引言

你可能已经用过 Claude 的基础 API——发一条消息，拿一个回复，就像聊天一样。但如果你想让 Claude 帮你读文件、跑命令、搜代码、改 bug，然后自己验证结果，再继续改……这种"自主干活"的能力，基础 API 是做不到的。

Claude Agent SDK 就是为这个场景而生的。它把 Claude Code 的全部能力——读写文件、执行命令、搜索代码、编辑文件、浏览网页——封装成了一个可编程的库。你不需要自己写工具调用循环，Claude 会自主执行工具、自主迭代，直到任务真正完成。

一句话总结：基础 SDK 是"你问它答"，Agent SDK 是"你下单它干活"。

---

## 它和基础 SDK 到底有什么区别？

先看代码，一目了然：

```python
# 基础 anthropic SDK：你得自己写循环处理工具调用
import anthropic

client = anthropic.Anthropic()
response = client.messages.create(
    model="claude-sonnet-4-6",
    max_tokens=1024,
    messages=[{"role": "user", "content": "修复 auth.py 的 bug"}],
    tools=[...]  # 你得自己定义工具
)
# Claude 说要调用某个工具
while response.stop_reason == "tool_use":
    result = your_tool_executor(response.tool_use)  # 你得自己执行
    response = client.messages.create(tool_result=result, **params)  # 你得自己喂回去
```

```python
# Agent SDK：一行搞定，Claude 自己读文件、找 bug、改代码
from claude_agent_sdk import query, ClaudeAgentOptions

async for message in query(
    prompt="修复 auth.py 的 bug",
    options=ClaudeAgentOptions(allowed_tools=["Read", "Edit", "Bash"]),
):
    print(message)  # Claude 自己读文件、定位问题、修改代码
```

区别很明显：

| 对比项 | 基础 anthropic SDK | Claude Agent SDK |
|--------|-------------------|-----------------|
| 工具执行 | 你自己写 | Claude 自己来 |
| 工具循环 | 你自己实现 | 内置 agent loop |
| 内置工具 | 无，全靠你定义 | 读写文件、Bash、搜索等开箱即用 |
| 上下文管理 | 你自己维护 | 自动压缩、自动管理 |
| 适合场景 | 聊天、生成、简单 tool use | 自主完成复杂任务 |

---

## 它和其他 Agent 框架有什么区别？

市面上有很多 Agent 框架——LangChain、LlamaIndex、CrewAI、AutoGPT……Claude Agent SDK 和它们相比有什么独特之处？

> 📚 **详细对比请参考附录**：[主流 Agent 框架对比](/zh-cn/appendix/8-artificial-intelligence/ai-agents.html#_7-主流框架对比)

简单来说：

| 框架 | 最适合的场景 |
|------|-------------|
| **Claude Agent SDK** | 让 Claude 自主完成代码开发、文件操作、命令执行 |
| **LangChain** | 构建复杂的通用 AI 应用，需要高度自定义流程 |
| **CrewAI** | 模拟多角色协作场景（如虚拟团队、角色扮演） |
| **LlamaIndex** | 构建知识库问答系统，连接企业数据与 LLM |

---

## 安装和配置

### 安装

Python 需要 3.10+，TypeScript 需要 Node.js 18+：

```bash
# Python
pip install claude-agent-sdk

# TypeScript
npm install @anthropic-ai/claude-agent-sdk
```

### 认证

设置 API Key 环境变量即可：

```bash
export ANTHROPIC_API_KEY=your-api-key
```

也支持云平台认证：
- AWS Bedrock：设置 `CLAUDE_CODE_USE_BEDROCK=1` + AWS 凭证
- Google Vertex AI：设置 `CLAUDE_CODE_USE_VERTEX=1` + GCP 凭证
- Microsoft Azure：设置 `CLAUDE_CODE_USE_FOUNDRY=1` + Azure 凭证

### 自定义 API 地址

如果你用的是代理、网关或者自建的 API 端点，可以通过 `env` 参数修改默认的 API URL：

```python
from claude_agent_sdk import query, ClaudeAgentOptions

async for message in query(
    prompt="Hello",
    options=ClaudeAgentOptions(
        env={
            "ANTHROPIC_BASE_URL": "https://your-proxy.example.com",
            "ANTHROPIC_API_KEY": "your-api-key",
        }
    ),
):
    print(message)
```

`ClaudeAgentOptions` 没有直接的 `base_url` 参数，但 `env` 字段可以传入任意环境变量给底层的 Claude Code CLI。常用的环境变量：

| 环境变量 | 用途 |
|---------|------|
| `ANTHROPIC_BASE_URL` | 自定义 API 端点（代理、网关） |
| `ANTHROPIC_API_KEY` | API 密钥 |
| `ANTHROPIC_AUTH_TOKEN` | 替代认证 token |
| `ANTHROPIC_CUSTOM_HEADERS` | 自定义请求头 |

---

## 核心概念

Agent SDK 的运行原理可以用一句话概括：**收集上下文 → 执行动作 → 验证结果 → 重复**。

这和人类开发者的工作方式一模一样——先看代码，再改代码，然后跑测试看结果，不对就继续改。Agent SDK 把这个循环自动化了。

### 两种使用模式

**模式一：`query()` 函数 —— 无状态，适合单次任务**

```python
import asyncio
from claude_agent_sdk import query, ClaudeAgentOptions

async def main():
    async for message in query(
        prompt="这个目录下有哪些文件？",
        options=ClaudeAgentOptions(allowed_tools=["Bash", "Glob"]),
    ):
        if hasattr(message, "result"):
            print(message.result)

asyncio.run(main())
```

**模式二：`ClaudeSDKClient` —— 有状态，适合多轮对话**

当你需要保持上下文、多轮交互时使用。比如先让 Claude 读一个模块，再让它找所有调用这个模块的地方——第二轮它还记得第一轮读了什么。

```python
import asyncio
from claude_agent_sdk import query, ClaudeAgentOptions

async def main():
    session_id = None

    # 第一轮：读认证模块
    async for message in query(
        prompt="读一下认证模块的代码",
        options=ClaudeAgentOptions(allowed_tools=["Read", "Glob"]),
    ):
        if hasattr(message, "subtype") and message.subtype == "init":
            session_id = message.session_id

    # 第二轮：基于上下文继续工作
    async for message in query(
        prompt="找出所有调用它的地方",
        options=ClaudeAgentOptions(resume=session_id),
    ):
        if hasattr(message, "result"):
            print(message.result)

asyncio.run(main())
```

---

## 内置工具：开箱即用

这是 Agent SDK 最爽的地方——你不需要自己实现任何工具，Claude 直接就能用：

| 工具 | 功能 | 典型用途 |
|------|------|---------|
| Read | 读取文件 | 看代码、读配置 |
| Write | 创建文件 | 生成新文件 |
| Edit | 精确编辑文件 | 改 bug、重构 |
| Bash | 执行终端命令 | 跑测试、装依赖、git 操作 |
| Glob | 按模式找文件 | `**/*.py`、`src/**/*.ts` |
| Grep | 正则搜索文件内容 | 找函数定义、找 TODO |
| WebSearch | 搜索网页 | 查文档、找方案 |
| WebFetch | 抓取网页内容 | 读在线文档 |
| Task | 启动子 agent | 并行处理子任务 |

通过 `allowed_tools` 参数控制 agent 能用哪些工具：

```python
# 只读 agent：只能看，不能改
options = ClaudeAgentOptions(
    allowed_tools=["Read", "Glob", "Grep"],
    permission_mode="bypassPermissions"
)

# 全能 agent：能读能写能跑命令
options = ClaudeAgentOptions(
    allowed_tools=["Read", "Write", "Edit", "Bash", "Glob", "Grep"]
)
```

---

## 高级功能

### Hooks：在关键节点插入你的逻辑

Hooks 让你在 agent 执行的关键时刻插入自定义代码——比如记录日志、拦截危险操作、审计文件变更。

支持的 Hook 类型：`PreToolUse`（工具执行前）、`PostToolUse`（工具执行后）、`Stop`（agent 停止时）、`SessionStart`、`SessionEnd` 等。

```python
from datetime import datetime
from claude_agent_sdk import query, ClaudeAgentOptions, HookMatcher

# 每次文件被修改时，记录到审计日志
async def log_file_change(input_data, tool_use_id, context):
    file_path = input_data.get("tool_input", {}).get("file_path", "unknown")
    with open("./audit.log", "a") as f:
        f.write(f"{datetime.now()}: modified {file_path}\n")
    return {}

async def main():
    async for message in query(
        prompt="重构 utils.py 提升可读性",
        options=ClaudeAgentOptions(
            permission_mode="acceptEdits",
            hooks={
                "PostToolUse": [
                    HookMatcher(matcher="Edit|Write", hooks=[log_file_change])
                ]
            },
        ),
    ):
        if hasattr(message, "result"):
            print(message.result)
```

实际用途：
- 审计日志：记录 agent 的每一步操作
- 安全拦截：阻止 agent 修改某些关键文件
- 通知推送：agent 完成任务时发送消息
- 成本监控：统计工具调用次数和 token 消耗

### 子 Agent：把大任务拆给专家

当任务足够复杂时，你可以定义多个专门的子 agent，让主 agent 把子任务分配给它们。每个子 agent 有自己的指令和工具权限，互不干扰。

```python
from claude_agent_sdk import query, ClaudeAgentOptions, AgentDefinition

async for message in query(
    prompt="用 code-reviewer agent 审查这个项目的代码质量",
    options=ClaudeAgentOptions(
        allowed_tools=["Read", "Glob", "Grep", "Task"],
        agents={
            "code-reviewer": AgentDefinition(
                description="专业代码审查员，负责质量和安全审查",
                prompt="分析代码质量，找出潜在问题并给出改进建议。",
                tools=["Read", "Glob", "Grep"],
            ),
            "test-writer": AgentDefinition(
                description="测试专家，负责编写单元测试",
                prompt="为缺少测试的函数编写单元测试。",
                tools=["Read", "Write", "Bash"],
            ),
        },
    ),
):
    if hasattr(message, "result"):
        print(message.result)
```

子 agent 的消息会带有 `parent_tool_use_id` 字段，方便你追踪哪些消息来自哪个子 agent。

### MCP 集成：接入外部世界

通过 Model Context Protocol（MCP），你的 agent 可以连接数据库、浏览器、第三方 API 等外部系统。社区已经有[数百个 MCP 服务器](https://github.com/modelcontextprotocol/servers)可以直接用。

```python
# 接入 Playwright，让 agent 能操作浏览器
async for message in query(
    prompt="打开 example.com 并描述你看到了什么",
    options=ClaudeAgentOptions(
        mcp_servers={
            "playwright": {
                "command": "npx",
                "args": ["@playwright/mcp@latest"]
            }
        }
    ),
):
    if hasattr(message, "result"):
        print(message.result)
```

常见的 MCP 集成场景：
- Playwright：浏览器自动化，爬取网页、填写表单
- PostgreSQL/MySQL：直接查询和操作数据库
- Slack/Email：发送通知和消息
- GitHub：操作 PR、Issue、代码仓库

---

## 能用来做什么？实战场景

理解了功能之后，最重要的问题是：这东西到底能干嘛？下面是经过社区验证的真实场景。

### 场景一：自动修 Bug Agent

给它一个 bug 描述，它自己找代码、定位问题、修复、跑测试验证：

```python
async for message in query(
    prompt="用户反馈登录时偶尔报 500 错误，请排查 src/auth/ 目录下的代码并修复",
    options=ClaudeAgentOptions(
        allowed_tools=["Read", "Edit", "Bash", "Glob", "Grep"],
        permission_mode="acceptEdits",
    ),
):
    print(message)
```

Claude 会自己 grep 错误日志、读相关代码、找到 bug、改代码、跑测试确认修复。

### 场景二：代码审查 Agent

构建一个只读的代码审查 agent，审查代码质量但不做任何修改：

```python
async for message in query(
    prompt="审查 src/ 目录下的代码，关注安全漏洞、性能问题和代码规范",
    options=ClaudeAgentOptions(
        allowed_tools=["Read", "Glob", "Grep"],
        permission_mode="bypassPermissions",
    ),
):
    if hasattr(message, "result"):
        print(message.result)
```

### 场景三：CI/CD 集成

在持续集成流水线中，让 agent 自动分析失败的测试并尝试修复：

```python
async for message in query(
    prompt="运行 npm test，分析失败的测试用例，修复代码使所有测试通过",
    options=ClaudeAgentOptions(
        allowed_tools=["Read", "Edit", "Bash", "Glob"],
        max_turns=20,
    ),
):
    print(message)
```

这是 Agent SDK 相比 CLI 最大的优势场景——CLI 适合人坐在终端前交互，SDK 适合嵌入到自动化流程中。

### 场景四：研究 Agent

让 agent 搜索网络、阅读文档、综合信息并输出报告：

```python
async for message in query(
    prompt="调研 2026 年主流的 Python Web 框架，对比 FastAPI、Django、Litestar，输出技术选型报告到 report.md",
    options=ClaudeAgentOptions(
        allowed_tools=["WebSearch", "WebFetch", "Write"],
    ),
):
    print(message)
```

### 场景五：带浏览器的全栈 Agent

通过 MCP 接入 Playwright，agent 不仅能写代码，还能打开浏览器验证效果：

```python
async for message in query(
    prompt="修复首页的样式问题，然后打开浏览器截图确认效果",
    options=ClaudeAgentOptions(
        allowed_tools=["Read", "Edit", "Bash"],
        mcp_servers={
            "playwright": {
                "command": "npx",
                "args": ["@playwright/mcp@latest"]
            }
        },
    ),
):
    print(message)
```

### 场景速查表

| 场景 | 核心工具 | 难度 |
|------|---------|------|
| 自动修 Bug | Read, Edit, Bash, Grep | 入门 |
| 代码审查 | Read, Glob, Grep | 入门 |
| CI/CD 自动修复 | Read, Edit, Bash | 中级 |
| 技术调研报告 | WebSearch, WebFetch, Write | 入门 |
| 浏览器自动化 | MCP (Playwright) | 中级 |
| 多 Agent 协作 | Task + AgentDefinition | 高级 |
| 数据库操作 | MCP (PostgreSQL/MySQL) | 中级 |
| 邮件/通知助手 | MCP (Slack/Email) | 中级 |

---

## 什么时候该用 Agent SDK？

不是所有场景都需要 Agent SDK。选对工具很重要：

| 你想做的事 | 该用什么 |
|-----------|---------|
| 简单对话、文本生成、翻译 | 基础 `anthropic` SDK |
| 单次 tool use（查天气、算数） | 基础 `anthropic` SDK |
| 自主完成多步骤开发任务 | Agent SDK |
| 嵌入 CI/CD 流水线 | Agent SDK |
| 构建能操作文件系统的应用 | Agent SDK |
| 日常交互式开发 | Claude Code CLI |
| 一次性快速任务 | Claude Code CLI |

简单来说：如果你的任务需要 Claude "自己动手干活"（读文件、改代码、跑命令），用 Agent SDK。如果只是"问答"，用基础 SDK 就够了。

---

## 企业级实战：构建代码质量守护流水线

前面的场景都是单个 agent 做单件事。但在真实的企业环境中，你需要的是一条完整的流水线——多个 agent 串联协作，每个环节有明确的输入输出，有审计、有回滚、有通知。

下面我们构建一个真实场景：**每次 PR 提交后，自动触发代码审查 → 安全扫描 → 自动修复 → 测试验证 → 生成报告**的完整流水线。

### 架构设计

```
PR 提交
  │
  ▼
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│  代码审查     │───▶│  安全扫描     │───▶│  自动修复     │
│  Agent       │    │  Agent       │    │  Agent       │
│ (只读)       │    │ (只读)       │    │ (可写)       │
└─────────────┘    └─────────────┘    └─────────────┘
                                            │
                                            ▼
                                     ┌─────────────┐    ┌─────────────┐
                                     │  测试验证     │───▶│  报告生成     │
                                     │  Agent       │    │  Agent       │
                                     │ (Bash)       │    │ (Write)      │
                                     └─────────────┘    └─────────────┘
                                                              │
                                                              ▼
                                                        Slack 通知
```

核心思想：**每个 agent 只做一件事，权限最小化，结果串联传递**。

### 第一步：定义流水线框架

```python
import asyncio
import json
from datetime import datetime
from claude_agent_sdk import query, ClaudeAgentOptions, HookMatcher

# 审计日志：记录每个 agent 的每一步操作
audit_log = []

async def audit_hook(input_data, tool_use_id, context):
    audit_log.append({
        "time": datetime.now().isoformat(),
        "tool": input_data.get("tool_name"),
        "input": input_data.get("tool_input", {}),
    })
    return {}

# 通用 hook 配置：所有 agent 共享审计能力
audit_hooks = {
    "PostToolUse": [HookMatcher(matcher=".*", hooks=[audit_hook])]
}
```

### 第二步：代码审查 Agent（只读）

```python
async def run_code_review(pr_diff: str) -> str:
    """只读 agent，审查代码质量，输出结构化报告"""
    result_text = ""
    async for message in query(
        prompt=f"""审查以下 PR diff，从这几个维度分析：
1. 代码规范：命名、格式、注释
2. 逻辑问题：边界条件、空指针、竞态
3. 性能隐患：N+1 查询、内存泄漏、不必要的循环
4. 可维护性：函数过长、职责不清、魔法数字

PR Diff:
{pr_diff}

输出 JSON 格式：{{"issues": [{{"severity": "high/medium/low", "file": "...", "line": ..., "description": "..."}}], "summary": "..."}}""",
        options=ClaudeAgentOptions(
            allowed_tools=["Read", "Glob", "Grep"],
            permission_mode="bypassPermissions",
            hooks=audit_hooks,
            max_turns=10,
        ),
    ):
        if hasattr(message, "result"):
            result_text = message.result
    return result_text
```

### 第三步：安全扫描 Agent（只读）

```python
async def run_security_scan() -> str:
    """只读 agent，专注安全漏洞扫描"""
    result_text = ""
    async for message in query(
        prompt="""扫描项目代码中的安全漏洞：
1. SQL 注入、XSS、CSRF
2. 硬编码的密钥或凭证
3. 不安全的依赖版本
4. 权限校验缺失

输出 JSON：{{"vulnerabilities": [{{"severity": "critical/high/medium", "type": "...", "file": "...", "description": "...", "fix_suggestion": "..."}}]}}""",
        options=ClaudeAgentOptions(
            allowed_tools=["Read", "Glob", "Grep", "Bash"],
            permission_mode="bypassPermissions",
            hooks=audit_hooks,
            max_turns=15,
        ),
    ):
        if hasattr(message, "result"):
            result_text = message.result
    return result_text
```

### 第四步：自动修复 Agent（可写）

```python
async def run_auto_fix(review_result: str, security_result: str) -> str:
    """可写 agent，根据审查和扫描结果自动修复代码"""
    result_text = ""
    async for message in query(
        prompt=f"""根据以下审查结果修复代码：

代码审查报告：
{review_result}

安全扫描报告：
{security_result}

修复规则：
1. 只修复 severity 为 high 或 critical 的问题
2. 每次修改后运行相关测试确认没有破坏现有功能
3. 不要重构无关代码，只做最小修复
4. 修复完成后输出修改文件列表""",
        options=ClaudeAgentOptions(
            allowed_tools=["Read", "Edit", "Bash", "Glob", "Grep"],
            permission_mode="acceptEdits",
            hooks=audit_hooks,
            max_turns=30,
        ),
    ):
        if hasattr(message, "result"):
            result_text = message.result
    return result_text
```

### 第五步：测试验证 + 报告生成

```python
async def run_test_and_report(fix_result: str) -> str:
    """运行测试，生成最终报告"""
    result_text = ""
    async for message in query(
        prompt=f"""执行以下操作：
1. 运行完整测试套件（npm test 或 pytest）
2. 统计测试通过率
3. 生成 Markdown 格式的质量报告到 pr-report.md，包含：
   - 代码审查发现的问题数量和严重程度分布
   - 安全漏洞数量
   - 自动修复的内容：{fix_result}
   - 测试通过率
   - 最终结论：是否建议合并""",
        options=ClaudeAgentOptions(
            allowed_tools=["Read", "Bash", "Write", "Glob"],
            hooks=audit_hooks,
            max_turns=15,
        ),
    ):
        if hasattr(message, "result"):
            result_text = message.result
    return result_text
```

### 第六步：串联整条流水线

```python
import subprocess

async def run_pipeline():
    """完整的 PR 质量守护流水线"""
    print("🔍 阶段 1/4：代码审查...")
    pr_diff = subprocess.run(
        ["git", "diff", "main...HEAD"], capture_output=True, text=True
    ).stdout
    review_result = await run_code_review(pr_diff)

    print("🛡️ 阶段 2/4：安全扫描...")
    security_result = await run_security_scan()

    print("🔧 阶段 3/4：自动修复...")
    fix_result = await run_auto_fix(review_result, security_result)

    print("✅ 阶段 4/4：测试验证 + 生成报告...")
    report = await run_test_and_report(fix_result)

    # 保存审计日志
    with open("audit-log.json", "w") as f:
        json.dump(audit_log, f, indent=2, ensure_ascii=False)

    print(f"流水线完成，审计日志已保存（共 {len(audit_log)} 条操作记录）")
    return report

asyncio.run(run_pipeline())
```

### 企业级设计思考

这条流水线体现了几个关键的企业级设计原则：

**权限最小化**：代码审查和安全扫描 agent 只有只读权限，不可能误改代码。只有自动修复 agent 才有写权限，而且限定了 `acceptEdits` 模式。

**可审计**：每个 agent 的每一步操作都通过 Hook 记录到审计日志。出了问题可以回溯是哪个 agent 在什么时间做了什么操作。

**结果串联**：上一个 agent 的输出是下一个 agent 的输入。代码审查的结果喂给自动修复，自动修复的结果喂给测试验证。每个环节都有明确的输入输出契约。

**成本可控**：每个 agent 都设置了 `max_turns` 限制，防止某个环节失控空转。生产环境中还可以加上 `max_budget_usd` 做预算控制。

**可扩展**：想加新环节？比如加一个"文档检查 agent"或"性能基准测试 agent"，只需要写一个新函数，插入流水线即可。

这个模式可以直接嵌入 GitHub Actions 或 GitLab CI，每次 PR 自动触发，真正实现"AI 驱动的代码质量守护"。

---

## 错误处理

Agent SDK 提供了清晰的异常类型，方便你在生产环境中做好容错：

```python
from claude_agent_sdk import query, CLINotFoundError, ProcessError

try:
    async for msg in query(prompt="分析代码"):
        print(msg)
except CLINotFoundError:
    print("Claude Code CLI 未安装，请先安装")
except ProcessError as e:
    print(f"进程异常退出，退出码: {e.exit_code}")
```

---

## 总结

Claude Agent SDK 的核心价值是把"模型推理"升级为"可控执行"。它不只是生成文本，而是能在一个可审计、可约束的工具系统中真正完成任务。

记住 Anthropic 官方博客中的一句话：Agent SDK 的设计哲学是"给 agent 一台电脑，让它像人一样工作"。

好的 agent 应用 = 清晰的工具设计 + 明确的任务边界 + 适当的人工监督。工具给了 agent 能力，边界给了它约束，监督给了你信心。三者缺一不可。

---

## 参考资料

### 官方资源

- [Agent SDK 官方文档](https://platform.claude.com/docs/en/agent-sdk/overview) - 最权威的参考
- [GitHub - claude-agent-sdk-python](https://github.com/anthropics/claude-code-sdk-python) - Python SDK 源码
- [GitHub - claude-agent-sdk-typescript](https://github.com/anthropics/claude-agent-sdk-typescript) - TypeScript SDK 源码
- [示例 Agent 项目](https://github.com/anthropics/claude-agent-sdk-demos) - 邮件助手、研究 agent 等

### 博客与教程

- [Building agents with the Claude Agent SDK](https://claude.com/blog/building-agents-with-the-claude-agent-sdk) - Anthropic 官方工程博客，讲解设计哲学和架构
- [Claude Agent SDK Python 学习指南](https://redreamality.com/blog/claude-agent-sdk-python-) - 中文友好，从零开始的完整教程
- [Claude Agent SDK 完整教程](https://blog.wenhaofree.com/en/posts/articles/claude-agent-sdk-tutorial/) - 工具系统、Agent Loop、可控执行实战
- [12 个 Agent SDK 实用场景](https://skywork.ai/blog/claude-agent-sdk-use-cases-2025/) - 覆盖编码、数据、自动化等
- [Step-by-Step Agent 教程](https://skywork.ai/blog/how-to-use-claude-agent-sdk-step-by-step-ai-agent-tutorial/) - TypeScript + Python 双轨教程
