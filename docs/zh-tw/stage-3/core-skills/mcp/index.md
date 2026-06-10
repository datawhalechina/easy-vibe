# Claude Code MCP 完整指南

## 什麼是 Claude Code MCP？

**Claude Code** 是 Anthropic 的官方 AI 命令列工具，而 **MCP（Model Context Protocol）** 是讓 Claude Code 能夠連接外部工具和服務的協議。

簡單來說，MCP 將 Claude Code 從一個只能讀寫本地文件的 AI 助手，變成了一個能夠訪問 GitHub、資料庫、API 和雲端服務的超級助手。

## 為什麼在 Claude Code 中使用 MCP？

### 沒有 MCP 的 Claude Code

```text
你能做的：
✓ 讀取本地文件
✓ 編輯代碼
✓ 運行命令
✓ 使用 Bash 工具

你不能做的：
✗ 查看 GitHub Issues
✗ 訪問雲端資料庫
✗ 調用外部 API
✗ 獲取即時天氣
```

### 有 MCP 的 Claude Code

```text
你能做的：
✓ 所有原有功能
✓ 查看/創建 GitHub Issues 和 PR
✓ 查詢 SQLite 和 PostgreSQL 資料庫
✓ 訪問 Notion 和 Slack 等外部服務
✓ 獲取即時天氣和地圖數據
✓ 瀏覽器自動化
✓ ...以及更多
```

## 快速開始

### 第一步：了解配置文件的位置

Claude Code 的 MCP 配置文件位於：

| 層級 | 配置文件路徑 | 作用範圍 |
|-----|-------------|----------|
| **用戶級別** | `~/.claude.json` | 所有項目 |
| **項目級別** | `.claude/mcp.json` | 當前項目 |

建議優先使用**項目級別配置**，這樣不同項目可以使用不同的 MCP 服務。

### 第二步：用自然語言添加 MCP 伺服器

在 Claude Code 中，你不需要手動編輯配置文件或記憶命令。你可以用自然語言描述你想要什麼：

```text
你：幫我添加一個 GitHub MCP 伺服器，我的 token 是 ghp_xxx

Claude：我來幫你配置 GitHub MCP 伺服器...

[自動更新 .claude/mcp.json]
```

```text
你：添加一個 SQLite 資料庫伺服器，資料庫文件在 ./data/app.db

Claude：好的，我來配置 SQLite MCP 伺服器...
```

```text
你：添加一個 HTTP 類型的 MCP 伺服器，地址是 https://api.example.com/mcp

Claude：我來添加那個遠端 MCP 伺服器...
```

### 第三步：驗證配置

直接問 Claude Code：

```text
你：現在有哪些 MCP 伺服器可用？

Claude：目前已配置的 MCP 伺服器：
• github - GitHub 整合
• sqlite - SQLite 資料庫
• filesystem - 文件系統訪問
```

或者使用診斷命令：

```text
/doctor
```

### 第四步：開始使用

配置成功後，你可以直接用自然語言調用 MCP 功能：

```text
你：幫我在 GitHub 上創建一個 Issue

Claude：我可以幫你創建 GitHub Issue。請告訴我：
- 倉庫地址，例如 owner/repo
- Issue 標題
- Issue 描述
```

## Claude Code 中的自然語言管理

### 查看和管理 MCP 伺服器

你可以完全用自然語言與 Claude Code 交互：

```text
你：列出所有已配置的 MCP 伺服器

你：檢查 MCP 伺服器的連接狀態

你：刪除名為 notion 的 MCP 伺服器

你：更新 github 伺服器的 token
```

### 診斷問題

遇到問題時：

```text
你：檢查一下 MCP 連接有什麼問題

Claude：[會自動運行診斷、分析配置文件、檢查伺服器狀態]
```

## 配置方法詳解

### 用戶級別配置（全局）

編輯 `~/.claude.json`：

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/Users/yourname/Documents"]
    },
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "your-token"
      }
    }
  }
}
```

### 項目級別配置（推薦）

在項目根目錄編輯 `.claude/mcp.json`：

```json
{
  "mcpServers": {
    "project-db": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-sqlite", "--db-path", "./data/app.db"]
    }
  }
}
```

**項目級別配置的優點：**

- 團隊成員可以通過提交到 Git 來共享配置
- 不同項目可以使用不同的 MCP 服務
- 配置更靈活，不會污染全局設置

### 傳輸模式

Claude Code 支援三種傳輸模式：

#### STDIO（本地程序）

```json
{
  "mcpServers": {
    "local-tool": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/path"]
    }
  }
}
```

#### HTTP（遠端服務）

```json
{
  "mcpServers": {
    "remote-api": {
      "url": "https://api.example.com/mcp",
      "transport": "http",
      "headers": {
        "Authorization": "Bearer your-token"
      }
    }
  }
}
```

#### SSE（伺服器推送事件）

```json
{
  "mcpServers": {
    "streaming": {
      "url": "https://api.example.com/sse",
      "transport": "sse"
    }
  }
}
```

## 實際範例

### 範例一：GitHub 工作流程自動化

```text
你：幫我把當前修改推送到 GitHub，然後創建一個標題為「添加新功能」的 PR

Claude：
1. 檢查當前 git 狀態...
2. 創建新分支 feature/new-feature...
3. 提交修改...
4. 推送到遠端...
5. 調用 github_create_pull_request 創建 PR...
6. PR 已創建：https://github.com/owner/repo/pull/123
```

### 範例二：資料庫查詢

```text
你：查詢資料庫中最近註冊的 10 個用戶

Claude：
1. 連接到 SQLite 資料庫...
2. 執行查詢：SELECT * FROM users ORDER BY created_at DESC LIMIT 10
3. 返回結果：
   - 張三 (zhang@example.com) - 2025-02-28
   - 李四 (li@example.com) - 2025-02-27
   ...
```

### 範例三：網頁截圖分析

```text
你：打開 https://example.com，截個圖，分析一下頁面設計

Claude：
1. 啟動瀏覽器...
2. 導航到 https://example.com...
3. 截圖...
4. [返回截圖]
5. 頁面設計分析：
   - 佈局使用置中設計，最大寬度 1200px
   - 主色調為藍色 (#3b82f6)
   - 導航欄固定在頂部
   ...
```

### 範例四：與 Notion 整合

```text
你：把我剛寫的筆記保存到 Notion

Claude：
1. 使用 Notion MCP 伺服器...
2. 創建新頁面...
3. 已保存：https://notion.so/page/xxx
```

## 調試技巧

### 用自然語言診斷

出問題時，直接告訴 Claude Code：

```text
你：我的 MCP 伺服器連不上了，幫我檢查一下

你：GitHub MCP 工具調用失敗了，是什麼原因？

你：為什麼 sqlite 伺服器總是顯示「連接中」？
```

Claude Code 會自動：

1. 檢查配置文件格式
2. 驗證環境變數
3. 測試伺服器連接
4. 提供具體的修復建議

### 常見問題排查

| 問題 | 可能原因 | 解決方案 |
|-----|---------|----------|
| 伺服器未連接 | 配置文件格式錯誤 | 檢查 JSON 語法 |
| 工具無法調用 | 權限不足 | 檢查環境變數 |
| 連接超時 | 網路問題 | 檢查 URL 或網路 |
| 程序崩潰 | 伺服器代碼 bug | 檢查伺服器日誌 |

### 手動診斷命令

```text
/doctor
```

範例輸出：

```text
System Diagnostic Report:
===============

Claude Code: v2.5.0 ✓
Node.js: v20.0.0 ✓

MCP server status:
• github: ✓ Connected (12 tools)
• sqlite: ✗ Connection failed - Database file not found
• puppeteer: ✓ Connected (8 tools)

Suggestions:
1. Check whether the sqlite database path is correct
2. Make sure the .claude/mcp.json format is correct
```

## 最佳實踐

### 1. 優先使用項目級別配置

**為什麼推薦項目級別配置？**

不同項目通常需要不同的 MCP 服務。例如，前端項目可能需要瀏覽器測試工具，而後端項目可能需要資料庫連接。使用項目級別配置，每個項目都可以有自己專屬的 MCP 伺服器集合，避免全局配置混亂。

更重要的是，項目級別配置可以提交到 Git。團隊成員克隆項目後，可以直接使用相同的 MCP 服務，無需重新配置。

```text
項目 A，前端項目 -> .claude/mcp.json 包含瀏覽器測試 MCP
項目 B，後端項目 -> .claude/mcp.json 包含資料庫 MCP
```

### 2. 將敏感資訊存儲在環境變數中

**永遠不要在配置文件中硬編碼密鑰。**

配置文件可能會被意外提交到 Git 而洩露密鑰。正確的做法是將敏感值存儲在環境變數中，只在配置文件中引用變數名稱。這樣即使配置文件被公開，真正的密鑰仍然安全。

```json
{
  "env": {
    "GITHUB_TOKEN": "$GITHUB_TOKEN",
    "GITHUB_TOKEN": "ghp_abc123"
  }
}
```

第一種寫法是好的，因為它從環境變數讀取。第二種寫法是不好的，因為它直接硬編碼了密鑰。

### 3. 鎖定版本

**為什麼需要鎖定版本？**

默認情況下，`npx -y` 會始終使用最新版本的 MCP 伺服器。這可能會帶來問題：新版本可能引入破壞性變更，或者套件可能突然被刪除或改名。

通過在套件名後附加 `@version`，可以確保始終使用經過驗證的版本，減少自動升級帶來的意外。

```json
{
  "command": "npx",
  "args": ["-y", "@modelcontextprotocol/server-github@1.2.3"]
}
```

### 4. 為 MCP 配置寫文檔

**幫助團隊成員快速了解 MCP 設置**

當一個項目包含多個 MCP 伺服器時，新加入的團隊成員可能不了解每個伺服器的用途和所需配置。在 `.claude/` 目錄下創建 `README.md`，說明每個伺服器的用途、所需配置以及如何獲取憑證，可以顯著降低溝通成本。

在項目中創建 `.claude/README.md`：

```markdown
# MCP 配置說明

本項目使用的 MCP 伺服器：

## github
用於 GitHub 自動化。需要 GITHUB_TOKEN。

## sqlite
連接到 ./data/app.db，用於查詢和修改數據。

## puppeteer
用於 E2E 測試。
```

## Claude Code 與 Claude Desktop 的區別

| 功能 | Claude Code | Claude Desktop |
|-----|-------------|----------------|
| **配置文件** | `~/.claude.json` 或 `.claude/mcp.json` | `claude_desktop_config.json` |
| **項目級別配置** | ✓ 支援 | ✗ 不支援 |
| **自然語言管理** | ✓ 支援 | ✗ 需手動編輯 |
| **診斷** | ✓ `/doctor` | ✗ 無 |
| **熱重載** | ✓ 自動 | ✗ 需重啟應用 |
| **使用場景** | 開發工作流程、CI/CD | 日常使用、辦公任務 |

## 常見 MCP 伺服器

> 💡 完整的 MCP 伺服器列表，請參考附錄：[MCP 伺服器目錄](/zh-tw/appendix/8-artificial-intelligence/ai-protocols)

### GitHub 伺服器

**功能：** Issues、PR、倉庫管理

```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "your-token"
      }
    }
  }
}
```

**獲取 token：** https://github.com/settings/tokens

### SQLite 伺服器

**功能：** 查詢和管理 SQLite 資料庫

```json
{
  "mcpServers": {
    "sqlite": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-sqlite", "--db-path", "./data/database.db"]
    }
  }
}
```

### Filesystem 伺服器

**功能：** 訪問指定目錄內的文件

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/Users/yourname/Documents"]
    }
  }
}
```

### Puppeteer 瀏覽器自動化

**功能：** 瀏覽器控制、截圖、自動化測試

```json
{
  "mcpServers": {
    "puppeteer": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-puppeteer"]
    }
  }
}
```

### Brave 搜索伺服器

**功能：** 網頁搜索

```json
{
  "mcpServers": {
    "brave-search": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-brave-search"],
      "env": {
        "BRAVE_API_KEY": "your-brave-api-key"
      }
    }
  }
}
```

## 參考資源

### 官方文件

- [Claude Code 官方文件 - MCP](https://docs.anthropic.com/zh-CN/docs/claude-code/mcp)
- [MCP 官方網站](https://modelcontextprotocol.io/)
- [MCP 規範文件](https://modelcontextprotocol.io/specification/)
- [MCP GitHub 倉庫](https://github.com/modelcontextprotocol)

### 官方伺服器

- [@modelcontextprotocol/server-github](https://github.com/modelcontextprotocol/servers/tree/main/src/github) - GitHub 整合
- [@modelcontextprotocol/server-sqlite](https://github.com/modelcontextprotocol/servers/tree/main/src/sqlite) - SQLite 資料庫
- [@modelcontextprotocol/server-postgres](https://github.com/modelcontextprotocol/servers/tree/main/src/postgres) - PostgreSQL 資料庫
- [@modelcontextprotocol/server-filesystem](https://github.com/modelcontextprotocol/servers/tree/main/src/filesystem) - 文件系統訪問
- [@modelcontextprotocol/server-puppeteer](https://github.com/modelcontextprotocol/servers/tree/main/src/puppeteer) - 瀏覽器自動化
- [@modelcontextprotocol/server-fetch](https://github.com/modelcontextprotocol/servers/tree/main/src/fetch) - 網頁抓取
- [@modelcontextprotocol/server-brave-search](https://github.com/modelcontextprotocol/servers/tree/main/src/brave-search) - Brave 搜索
- [@modelcontextprotocol/server-git](https://github.com/modelcontextprotocol/servers/tree/main/src/git) - Git 操作

### 教程文章

- [MCP 原理與實踐詳解](https://view.inews.qq.com/a/20250414A023WV00)
- [MCP（Model Context Protocol）架構與工作原理](https://m.toutiao.com/w/1826385835060307/)
- [2025 最新大模型教程：從入門到掌握 MCP 協議](https://m.blog.csdn.net/weixin_45653328/article/details/150916706)
- [從零開始學 MCP（八）- 構建 MCP 伺服器](https://juejin.cn/post/7582510291667419187)

### 配置指南

- [Claude Code 最佳實踐](https://www.anthropic.com/engineering/claude-code-best-practices)
- [Claude Code 完整配置指南](https://juejin.cn/post/7576838552472043563)

### 開發教程

- [入門友好的 MCP 伺服器實踐指南（TypeScript 和 Python）](https://m.blog.csdn.net/ztt123654/article/details/150844207)
- [終極 MCP 伺服器構建指南：完整的 TypeScript 和 Python 教程](https://m.blog.csdn.net/gitblog_00703/article/details/154862128)
- [用 TypeScript 構建最簡單的 MCP 伺服器](https://m.blog.csdn.net/weixin_45653525/article/details/148433757)
- [使用 Azure 容器應用生成 TypeScript MCP 伺服器](https://learn.microsoft.com/zh-cn/azure/developer/ai/build-mcp-server-ts)

### MCP 伺服器資源

- [Awesome MCP Servers](https://github.com/punkpeye/awesome-mcp-servers) - 最全面的 MCP 伺服器列表
- [Official MCP Registry](https://registry.modelcontextprotocol.io) - Anthropic 官方應用商店
- [MCP.so](https://mcp.so) - 社群 MCP 伺服器中心
- [Glama.ai MCP](https://glama.ai/mcp/servers) - 帶評分和評論的 MCP 目錄
- [Smithery](https://smithery.ai) - MCP 伺服器市場
- [MCPHub](https://mcphub.io/registry) - 介面簡潔的目錄
- [LobeHub MCP](https://lobehub.com/zh/mcp) - 中文 MCP 目錄

### 地圖和天氣服務

- [高德地圖 MCP Server](https://lobehub.com/zh/mcp/luozengchang-mcp-amap)
- [騰訊位置服務 MCP 文件](https://lbs.qq.com/service/MCPServer/MCPServerGuide/overview)
- [彩雲天氣 MCP Server](https://github.com/caiyunapp/mcp-caiyun-weather)
- [OpenWeatherMap MCP Server](https://github.com/CodeByWaqas/weather-mcp-server)

### 社群資源

- [Everything Claude Code Config](https://github.com/affaan-m/everything-claude-code) - 生產級 Claude Code 配置合集
- [AI Coding Guide](https://github.com/hacket/AICodingGuide) - Claude Code 中文學習路徑

### 實際應用案例

- [BlenderMCP - AI 驅動的 3D 建模](https://github.com/Belthur/blender-mcp) - 4,100+ ⭐
- [MCP 在生產中的 15 個最佳實踐](https://learn.microsoft.com/zh-cn/azure/azure-functions/scenario-mcp-apps)
