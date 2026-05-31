# Claude Agent SDK 完整指南

## 簡介

你可能已經使用過 Claude 的基本 API：發送一則訊息，收到一則回覆，就像聊天一樣。但如果你希望 Claude 幫你讀取檔案、執行指令、搜尋程式碼、修復 bug、自行驗證結果並持續迭代，這種「自主工作」不是基本 API 能做到的。

Claude Agent SDK 正是為此場景而生。它將 Claude Code 的所有能力——讀寫檔案、執行指令、搜尋程式碼、編輯檔案、瀏覽網頁——打包成一個可程式化的函式庫。你不需要自己寫工具呼叫的迴圈，Claude 可以自主執行工具、自主迭代，直到任務真正完成。

一句話總結：基本 SDK 是「你問，它答」；Agent SDK 是「你派任，它動手」。

---

## 與基本 SDK 有什麼區別？

先看程式碼，差異一目了然：

```python
# 基本 anthropic SDK：你必須自己寫迴圈來處理工具呼叫
import anthropic

client = anthropic.Anthropic()
response = client.messages.create(
    model="claude-sonnet-4-6",
    max_tokens=1024,
    messages=[{"role": "user", "content": "修復 auth.py 中的 bug"}],
    tools=[...]  # 你必須自己定義工具
)
# Claude 請求呼叫某個工具
while response.stop_reason == "tool_use":
    result = your_tool_executor(response.tool_use)  # 你必須自己執行
    response = client.messages.create(tool_result=result, **params)  # 你必須自己回傳結果
```

```python
# Agent SDK：一個區塊搞定，Claude 自己讀檔、找 bug、編輯程式碼
from claude_agent_sdk import query, ClaudeAgentOptions

async for message in query(
    prompt="修復 auth.py 中的 bug",
    options=ClaudeAgentOptions(allowed_tools=["Read", "Edit", "Bash"]),
):
    print(message)  # Claude 自己讀取檔案、定位問題並編輯程式碼
```

差異非常明顯：

| 比較項目 | 基本 anthropic SDK | Claude Agent SDK |
|--------|-------------------|-----------------|
| 工具執行 | 你自己實現 | Claude 處理 |
| 工具迴圈 | 你自己實現 | 內建 Agent 迴圈 |
| 內建工具 | 無，全部自訂 | 內建讀寫檔案、Bash、搜尋等開箱即用 |
| 上下文管理 | 你自己維護 | 自動壓縮和管理 |
| 最適合場景 | 聊天、生成、簡單工具呼叫 | 自主完成複雜任務 |

---

## 與其他 Agent 框架有什麼不同？

市面上有很多 Agent 框架——LangChain、LlamaIndex、CrewAI、AutoGPT 等等。Claude Agent SDK 與它們相比有什麼獨特之處？

> 📚 **詳細比較請參閱附錄**：[主流 Agent 框架比較](/zh-tw/appendix/8-artificial-intelligence/ai-agents.html)

簡單來說：

| 框架 | 最適合的場景 |
|------|-------------|
| **Claude Agent SDK** | 讓 Claude 自主完成程式設計、檔案操作和指令執行 |
| **LangChain** | 建置高度客製化流程的複雜通用 AI 應用程式 |
| **CrewAI** | 模擬多角色協作場景（虛擬團隊、角色扮演） |
| **LlamaIndex** | 建置連接企業資料與 LLM 的知識庫問答系統 |

---

## 安裝和配置

### 安裝

Python 需要 3.10+，TypeScript 需要 Node.js 18+：

```bash
# Python
pip install claude-agent-sdk

# TypeScript
npm install @anthropic-ai/claude-agent-sdk
```

### 認證

只需設定 API 金鑰環境變數：

```bash
export ANTHROPIC_API_KEY=your-api-key
```

也支援雲端平台認證：
- AWS Bedrock：設定 `CLAUDE_CODE_USE_BEDROCK=1` + AWS 憑證
- Google Vertex AI：設定 `CLAUDE_CODE_USE_VERTEX=1` + GCP 憑證
- Microsoft Azure：設定 `CLAUDE_CODE_USE_FOUNDRY=1` + Azure 憑證

### 自訂 API 端點

如果你使用代理、閘道或自建 API 端點，可以透過 `env` 參數更改預設 API URL：

```python
from claude_agent_sdk import query, ClaudeAgentOptions

async for message in query(
    prompt="你好",
    options=ClaudeAgentOptions(
        env={
            "ANTHROPIC_BASE_URL": "https://your-proxy.example.com",
            "ANTHROPIC_API_KEY": "your-api-key",
        }
    ),
):
    print(message)
```

`ClaudeAgentOptions` 沒有直接的 `base_url` 參數，但 `env` 欄位可以將任意環境變數傳入底層的 Claude Code CLI。常用環境變數：

| 環境變數 | 用途 |
|---------|------|
| `ANTHROPIC_BASE_URL` | 自訂 API 端點（代理、閘道） |
| `ANTHROPIC_API_KEY` | API 金鑰 |
| `ANTHROPIC_AUTH_TOKEN` | 替代認證 Token |
| `ANTHROPIC_CUSTOM_HEADERS` | 自訂請求標頭 |

---

## 核心概念

Agent SDK 的運行原理可以用一句話概括：**收集上下文 -> 執行動作 -> 驗證結果 -> 重複**。

這正是人類開發者的工作方式：先讀程式碼，再修改程式碼，然後執行測試並檢查結果。如果不對，就繼續迭代。Agent SDK 將這個迴圈自動化了。

### 兩種使用模式

**模式一：`query()` 函式——無狀態，適合一次性任務**

```python
import asyncio
from claude_agent_sdk import query, ClaudeAgentOptions

async def main():
    async for message in query(
        prompt="這個目錄下有哪些檔案？",
        options=ClaudeAgentOptions(allowed_tools=["Bash", "Glob"]),
    ):
        if hasattr(message, "result"):
            print(message.result)

asyncio.run(main())
```

**模式二：`ClaudeSDKClient`——有狀態，適合多輪對話**

當你需要保留上下文並跨多輪互動時使用。例如，先請 Claude 讀取一個模組，然後請它找出該模組的所有呼叫點——第二輪它仍然記得第一輪讀過的內容。

```python
import asyncio
from claude_agent_sdk import query, ClaudeAgentOptions

async def main():
    session_id = None

    # 第一輪：讀取認證模組
    async for message in query(
        prompt="讀取認證模組的程式碼",
        options=ClaudeAgentOptions(allowed_tools=["Read", "Glob"]),
    ):
        if hasattr(message, "subtype") and message.subtype == "init":
            session_id = message.session_id

    # 第二輪：基於前一輪的上下文繼續
    async for message in query(
        prompt="找出所有呼叫它的地方",
        options=ClaudeAgentOptions(resume=session_id),
    ):
        if hasattr(message, "result"):
            print(message.result)

asyncio.run(main())
```

---

## 內建工具：開箱即用

這是 Agent SDK 最棒的部分之一——你不需要自己實現任何工具，Claude 可以直接使用：

| 工具 | 能力 | 典型用途 |
|------|------|---------|
| Read | 讀取檔案 | 檢視程式碼、讀取配置 |
| Write | 建立檔案 | 生成新檔案 |
| Edit | 精確編輯檔案 | Bug 修復、重構 |
| Bash | 執行終端指令 | 執行測試、安裝依賴、git 操作 |
| Glob | 基於模式的檔案搜尋 | `**/*.py`、`src/**/*.ts` |
| Grep | 正規表達式內容搜尋 | 查找函式定義、TODO |
| WebSearch | 搜尋網頁 | 查詢文件、尋找方案 |
| WebFetch | 抓取網頁內容 | 讀取線上文件 |
| Task | 啟動子代理 | 平行處理子任務 |

使用 `allowed_tools` 控制代理可以使用哪些工具：

```python
# 唯讀代理：只能檢視不能修改
options = ClaudeAgentOptions(
    allowed_tools=["Read", "Glob", "Grep"],
    permission_mode="bypassPermissions"
)

# 完整代理：可讀、可寫、可執行指令
options = ClaudeAgentOptions(
    allowed_tools=["Read", "Write", "Edit", "Bash", "Glob", "Grep"]
)
```

---

## 進階功能

### Hooks：在關鍵時刻插入你自己的邏輯

Hooks 讓你在代理執行的關鍵時刻注入自訂程式碼——例如日誌記錄、攔截風險操作、審計檔案變更。

支援的 Hook 類型包括：`PreToolUse`（工具執行前）、`PostToolUse`（工具執行後）、`Stop`（代理停止時）、`SessionStart`、`SessionEnd` 等。

```python
from datetime import datetime
from claude_agent_sdk import query, ClaudeAgentOptions, HookMatcher

# 每次修改檔案時記錄審計日誌
async def log_file_change(input_data, tool_use_id, context):
    file_path = input_data.get("tool_input", {}).get("file_path", "unknown")
    with open("./audit.log", "a") as f:
        f.write(f"{datetime.now()}: modified {file_path}\n")
    return {}

async def main():
    async for message in query(
        prompt="重構 utils.py 以提高可讀性",
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

實際應用場景：
- 審計日誌：記錄代理執行的每一個操作
- 安全攔截：阻止對關鍵檔案的修改
- 通知推送：代理任務完成時發送訊息
- 成本監控：統計工具呼叫次數和 Token 用量

### 子代理：將大任務拆分給專家

當任務足夠複雜時，你可以定義多個專門的子代理，讓主代理將子任務分配給它們。每個子代理有自己的指令和工具權限，彼此隔離。

```python
from claude_agent_sdk import query, ClaudeAgentOptions, AgentDefinition

async for message in query(
    prompt="使用 code-reviewer 代理審查這個專案的程式碼品質",
    options=ClaudeAgentOptions(
        allowed_tools=["Read", "Glob", "Grep", "Task"],
        agents={
            "code-reviewer": AgentDefinition(
                description="專業的程式碼審查員，負責品質和安全審查",
                prompt="分析程式碼品質，識別潛在問題，並提供改進建議。",
                tools=["Read", "Glob", "Grep"],
            ),
            "test-writer": AgentDefinition(
                description="測試專家，負責撰寫單元測試",
                prompt="為缺少測試的函式撰寫單元測試。",
                tools=["Read", "Write", "Bash"],
            ),
        },
    ),
):
    if hasattr(message, "result"):
        print(message.result)
```

來自子代理的訊息包含 `parent_tool_use_id` 欄位，方便追蹤哪些訊息來自哪個子代理。

### MCP 整合：連接外部世界

透過 Model Context Protocol（MCP），你的代理可以連接到外部系統，如資料庫、瀏覽器和第三方 API。社群已經提供了[數百個 MCP 伺服器](https://github.com/modelcontextprotocol/servers)供你直接使用。

```python
# 連接 Playwright，讓代理可以操作瀏覽器
async for message in query(
    prompt="開啟 example.com 並描述你看到的內容",
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

常見的 MCP 整合場景：
- Playwright：瀏覽器自動化、爬取頁面、填寫表單
- PostgreSQL/MySQL：直接查詢和操作資料庫
- Slack/Email：發送通知和訊息
- GitHub：操作 PR、Issue 和儲存庫

---

## 能做什麼？實際應用場景

了解功能後，最重要的問題是：這東西實際能做什麼？以下是經過社群驗證的真實場景。

### 場景一：自動修 Bug 代理

給它一個 bug 描述，它可以找到程式碼、定位問題、修復它，並執行測試驗證：

```python
async for message in query(
    prompt="使用者回報登入時偶爾出現 HTTP 500 錯誤。調查並修復 src/auth/ 下的程式碼",
    options=ClaudeAgentOptions(
        allowed_tools=["Read", "Edit", "Bash", "Glob", "Grep"],
        permission_mode="acceptEdits",
    ),
):
    print(message)
```

Claude 會 grep 日誌、讀取相關程式碼、找到 bug、修改程式碼，並執行測試確認修復。

### 場景二：程式碼審查代理

建置一個唯讀的程式碼審查代理，審計品質而不做任何修改：

```python
async for message in query(
    prompt="審查 src/ 下的程式碼，重點關注安全漏洞、效能問題和程式碼規範",
    options=ClaudeAgentOptions(
        allowed_tools=["Read", "Glob", "Grep"],
        permission_mode="bypassPermissions",
    ),
):
    if hasattr(message, "result"):
        print(message.result)
```

### 場景三：CI/CD 整合

在 CI 管線中，讓代理分析失敗的測試並嘗試自動修復：

```python
async for message in query(
    prompt="執行 npm test，分析失敗的測試案例，並修復程式碼使所有測試通過",
    options=ClaudeAgentOptions(
        allowed_tools=["Read", "Edit", "Bash", "Glob"],
        max_turns=20,
    ),
):
    print(message)
```

這是 Agent SDK 相比 CLI 的一大優勢——CLI 適合有人坐在終端機前的場景，而 SDK 則適合嵌入到自動化工作流程中。

### 場景四：研究代理

讓代理搜尋網頁、閱讀文件、綜合資訊並產出報告：

```python
async for message in query(
    prompt="研究 2026 年主流的 Python Web 框架。比較 FastAPI、Django 和 Litestar，然後將技術選型報告寫入 report.md",
    options=ClaudeAgentOptions(
        allowed_tools=["WebSearch", "WebFetch", "Write"],
    ),
):
    print(message)
```

### 場景五：帶瀏覽器能力的全端代理

透過 MCP 連接 Playwright，代理不僅能寫程式碼，還能開啟瀏覽器驗證結果：

```python
async for message in query(
    prompt="修復首頁樣式問題，然後開啟瀏覽器截圖驗證結果",
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

### 場景速查表

| 場景 | 核心工具 | 難度 |
|------|---------|------|
| 自動修 Bug | Read, Edit, Bash, Grep | 初級 |
| 程式碼審查 | Read, Glob, Grep | 初級 |
| CI/CD 自動修復 | Read, Edit, Bash | 中級 |
| 技術研究報告 | WebSearch, WebFetch, Write | 初級 |
| 瀏覽器自動化 | MCP (Playwright) | 中級 |
| 多代理協作 | Task + AgentDefinition | 進階 |
| 資料庫操作 | MCP (PostgreSQL/MySQL) | 中級 |
| 郵件/通知助手 | MCP (Slack/Email) | 中級 |

---

## 何時應該使用 Agent SDK？

並非每個場景都需要 Agent SDK。選擇正確的工具很重要：

| 你想做什麼 | 推薦工具 |
|-----------|---------|
| 簡單聊天、文字生成、翻譯 | 基本 `anthropic` SDK |
| 一次性工具呼叫（天氣查詢、計算） | 基本 `anthropic` SDK |
| 自主完成多步驟開發任務 | Agent SDK |
| 嵌入 CI/CD 管線 | Agent SDK |
| 建置操作檔案系統的應用程式 | Agent SDK |
| 日常互動式開發 | Claude Code CLI |
| 一次性快速任務 | Claude Code CLI |

簡而言之：如果你的任務需要 Claude「親自動手」（讀取檔案、編輯程式碼、執行指令），使用 Agent SDK。如果只需要問答，基本 SDK 就夠了。

---

## 企業實踐：建置程式碼品質守護管線

前面的場景都是一個代理做一件事。在真實的企業環境中，你需要的是一條完整的管線——多個代理串聯，每個階段有明確的輸入/輸出，加上審計、回滾和通知。

現在我們來建置一個真實場景：每次 PR 提交後，自動觸發**程式碼審查 -> 安全掃描 -> 自動修復 -> 測試驗證 -> 報告生成**的完整管線。

### 架構設計

```text
PR 提交
  │
  ▼
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│  程式碼審查  │───▶│  安全掃描    │───▶│   自動修復   │
│    Agent     │    │    Agent     │    │    Agent     │
│  (唯讀)      │    │  (唯讀)      │    │  (可寫)      │
└─────────────┘    └─────────────┘    └─────────────┘
                                            │
                                            ▼
                                     ┌─────────────┐    ┌─────────────┐
                                     │  測試驗證    │───▶│  報告生成    │
                                     │    Agent     │    │    Agent     │
                                     │   (Bash)     │    │   (Write)    │
                                     └─────────────┘    └─────────────┘
                                                              │
                                                              ▼
                                                       Slack 通知
```

核心理念：**每個代理只做一件事，權限最小化，結果依序傳遞**。

### 第一步：定義管線框架

```python
import asyncio
import json
from datetime import datetime
from claude_agent_sdk import query, ClaudeAgentOptions, HookMatcher

# 審計日誌：記錄每個代理的每一個操作
audit_log = []

async def audit_hook(input_data, tool_use_id, context):
    audit_log.append({
        "time": datetime.now().isoformat(),
        "tool": input_data.get("tool_name"),
        "input": input_data.get("tool_input", {}),
    })
    return {}

# 共享的 Hook 配置：所有代理共享審計能力
audit_hooks = {
    "PostToolUse": [HookMatcher(matcher=".*", hooks=[audit_hook])]
}
```

### 第二步：程式碼審查代理（唯讀）

```python
async def run_code_review(pr_diff: str) -> str:
    """唯讀代理，審查程式碼品質並輸出結構化報告"""
    result_text = ""
    async for message in query(
        prompt=f"""從以下維度審查此 PR diff：
1. 程式碼規範：命名、格式化、註解
2. 邏輯問題：邊界情況、空指標風險、競態條件
3. 效能風險：N+1 查詢、記憶體洩漏、不必要的迴圈
4. 可維護性：過大的函式、不明確的職責、魔術數字

PR Diff：
{pr_diff}

輸出 JSON 格式：{{"issues": [{{"severity": "high/medium/low", "file": "...", "line": ..., "description": "..."}}], "summary": "..."}}""",
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

### 第三步：安全掃描代理（唯讀）

```python
async def run_security_scan() -> str:
    """唯讀代理，專注於漏洞掃描"""
    result_text = ""
    async for message in query(
        prompt="""掃描專案程式碼中的安全漏洞：
1. SQL 注入、XSS、CSRF
2. 硬編碼的金鑰或憑證
3. 不安全的依賴版本
4. 缺少權限檢查

輸出 JSON：{{"vulnerabilities": [{{"severity": "critical/high/medium", "type": "...", "file": "...", "description": "...", "fix_suggestion": "..."}}]}}""",
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

### 第四步：自動修復代理（可寫）

```python
async def run_auto_fix(review_result: str, security_result: str) -> str:
    """可寫代理，根據審查和掃描結果自動修復程式碼"""
    result_text = ""
    async for message in query(
        prompt=f"""根據以下審查結果修復程式碼：

程式碼審查報告：
{review_result}

安全掃描報告：
{security_result}

修復規則：
1. 只修復嚴重程度為 high 或 critical 的問題
2. 每次修改後執行相關測試，確保不破壞現有功能
3. 不要重構無關的程式碼，只做最小化的修復
4. 完成後輸出修改的檔案列表""",
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

### 第五步：測試驗證 + 報告生成

```python
async def run_test_and_report(fix_result: str) -> str:
    """執行測試並生成最終報告"""
    result_text = ""
    async for message in query(
        prompt=f"""執行以下操作：
1. 執行完整的測試套件（npm test 或 pytest）
2. 計算測試通過率
3. 將 Markdown 品質報告生成到 pr-report.md，包含：
   - 程式碼審查中發現的問題數量和嚴重程度分佈
   - 安全漏洞數量
   - 自動修復的變更：{fix_result}
   - 測試通過率
   - 最終結論：是否建議合併""",
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

### 第六步：串聯整條管線

```python
import subprocess

async def run_pipeline():
    """完整的 PR 品質守護管線"""
    print("🔍 階段 1/4：程式碼審查...")
    pr_diff = subprocess.run(
        ["git", "diff", "main...HEAD"], capture_output=True, text=True
    ).stdout
    review_result = await run_code_review(pr_diff)

    print("🛡️ 階段 2/4：安全掃描...")
    security_result = await run_security_scan()

    print("🔧 階段 3/4：自動修復...")
    fix_result = await run_auto_fix(review_result, security_result)

    print("✅ 階段 4/4：測試驗證 + 報告生成...")
    report = await run_test_and_report(fix_result)

    # 儲存審計日誌
    with open("audit-log.json", "w") as f:
        json.dump(audit_log, f, indent=2, ensure_ascii=False)

    print(f"管線完成，審計日誌已儲存（{len(audit_log)} 條操作記錄）")
    return report

asyncio.run(run_pipeline())
```

### 企業設計思維

這條管線體現了幾個關鍵的企業設計原則：

**最小權限**：程式碼審查和安全掃描代理是唯讀的，不會意外修改程式碼。只有自動修復代理有寫入權限，而且受 `acceptEdits` 約束。

**可審計**：每個代理的每一步都透過 Hooks 記錄。如果出了問題，你可以追溯到哪個代理在什麼時候做了什麼。

**結果串聯**：每個代理的輸出成為下一個代理的輸入。審查結果餵給自動修復；自動修復結果餵給測試驗證。每個階段都有明確的輸入/輸出契約。

**成本控制**：每個代理都有 `max_turns` 限制，防止無限迴圈。在生產環境中，你還可以加上 `max_budget_usd` 進行預算控制。

**可擴展性**：想要加一個階段，比如「文件檢查代理」或「效能基準測試代理」？新增一個函式並插入管線即可。

這個模式可以直接嵌入 GitHub Actions 或 GitLab CI，在每個 PR 上自動觸發，真正實現「AI 驅動的程式碼品質守護」。

---

## 錯誤處理

Agent SDK 提供清晰的異常類型，讓你可以在生產環境中建置穩健的容錯機制：

```python
from claude_agent_sdk import query, CLINotFoundError, ProcessError

try:
    async for msg in query(prompt="分析程式碼"):
        print(msg)
except CLINotFoundError:
    print("Claude Code CLI 未安裝。請先安裝。")
except ProcessError as e:
    print(f"程序異常退出，退出碼：{e.exit_code}")
```

---

## 總結

Claude Agent SDK 的核心價值在於將「模型推理」升級為「受控執行」。它不僅僅生成文字，還能在可審計、受約束的工具系統中真正完成任務。

記住 Anthropic 官方部落格中的一句話：Agent SDK 的設計理念是「給代理一台電腦，讓它像人類一樣工作」。

一個好的代理應用 = 清晰的工具設計 + 明確的任務邊界 + 適當的人工監督。工具賦予代理能力，邊界給予約束，監督帶來信心。三者缺一不可。

---

## 參考資料

### 官方資源

- [Agent SDK 官方文件](https://platform.claude.com/docs/en/agent-sdk/overview) - 最權威的參考
- [GitHub - claude-agent-sdk-python](https://github.com/anthropics/claude-code-sdk-python) - Python SDK 原始碼
- [GitHub - claude-agent-sdk-typescript](https://github.com/anthropics/claude-agent-sdk-typescript) - TypeScript SDK 原始碼
- [Agent SDK 範例專案](https://github.com/anthropics/claude-agent-sdk-demos) - 郵件助手、研究代理等

### 部落格和教學

- [Building agents with the Claude Agent SDK](https://claude.com/blog/building-agents-with-the-claude-agent-sdk) - Anthropic 工程部落格關於設計理念和架構
- [Claude Agent SDK Python 學習指南](https://redreamality.com/blog/claude-agent-sdk-python-) - 從零開始的中文友善完整教學
- [Claude Agent SDK 完整教學](https://blog.wenhaofree.com/en/posts/articles/claude-agent-sdk-tutorial/) - 工具系統、Agent 迴圈和受控執行的實戰指南
- [12 個實用 Agent SDK 場景](https://skywork.ai/blog/claude-agent-sdk-use-cases-2025/) - 涵蓋程式設計、資料、自動化等
- [一步步 Agent 教學](https://skywork.ai/blog/how-to-use-claude-agent-sdk-step-by-step-ai-agent-tutorial/) - TypeScript + Python 雙軌教學
