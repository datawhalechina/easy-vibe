# Claude Code 快速上手核心指南

Claude Code 是 Anthropic 官方的 AI 原生程式設計工具。它將大型語言模型能力直接整合到終端機中，讓你可以透過自然語言與 AI 協作來完成程式設計任務。與傳統的程式碼補全工具不同，Claude Code 能夠理解整個專案的上下文，並執行複雜的開發任務。從程式碼生成到重構，從除錯到文件撰寫，它都能勝任。

本章幫助你快速掌握 Claude Code 的核心用法，包括安裝設定、基本操作、實用技巧和常用命令。無論你是第一次使用 AI 程式設計工具，還是想更有效率地使用 Claude Code，都能在這裡找到所需內容。

---

## 快速安裝

Claude Code 基於 Node.js 建構，因此安裝前請確保系統已安裝 Node.js 18 或以上版本。整個過程非常簡單，通常只需要幾分鐘。

### 為什麼你需要 Claude Code

在傳統的開發工作流程中，開發者頻繁在編輯器、終端機、瀏覽器和文件之間切換。Claude Code 將這些工作流程統一到一個介面中：在同一個終端機視窗裡，你可以撰寫程式碼、執行測試、閱讀文件，甚至與團隊成員協作。更重要的是，它能理解你的專案結構並記住你的程式設計習慣，成為真正的程式設計助手。

### 方法一：手動安裝

手動安裝適合喜歡完全掌控每個步驟的開發者，也有助於你清楚了解工具的各個元件。

```bash
# 全域安裝 Claude Code CLI
# 使用 -g 全域安裝命令，可在任何目錄下使用
npm install -g @anthropic-ai/claude-code

# 驗證安裝
# 如果顯示版本號（例如 0.1.25），表示安裝成功
claude --version
```

安裝過程中，npm 會自動下載依賴項並設定環境變數。如果遇到權限問題，請嘗試使用 `sudo`（macOS/Linux）或以管理員身份執行終端機（Windows）。

### 方法二：讓 AI Agent 為你安裝

如果你已經在使用其他 AI 程式設計助手（例如 Cursor、Windsurf 或本專案中的 AI Agent），可以讓它們幫你完成安裝。好處是 AI 能自動偵測你的環境、處理依賴衝突，並為你的系統選擇最佳安裝路徑。

**你只需要說：**

```text
幫我安裝 Anthropic 的 Claude Code。
```

或更具體地說：

```text
安裝 Claude Code CLI 並檢查我的 Node.js 版本是否相容。
```

AI Agent 會執行以下步驟：
1. 檢查目前的 Node.js 版本
2. 如果不符合要求，提示你升級
3. 執行安裝命令
4. 驗證安裝結果
5. 如果有問題，嘗試自動修復

### 首次啟動與初始化

安裝完成後，進入你的專案目錄並啟動 Claude Code：

```bash
# 進入專案目錄（Claude Code 在當前目錄下運作）
cd /path/to/your/project

# 啟動 Claude Code
claude
```

首次啟動時，Claude Code 會引導你完成幾個重要的設定步驟：

1. **登入 Anthropic 帳號**：你需要一個 Anthropic 帳號才能使用 Claude Code。如果還沒有帳號，系統會提示你註冊。
2. **選擇方案**：
   - **免費方案**：適合個人學習和輕度使用，有呼叫次數限制
   - **Pro 方案**：適合專業開發者，提供更高的額度和優先回應
3. **接受條款**：閱讀並接受 Anthropic 的使用條款和隱私政策
4. **選填：設定 API 金鑰**：如果你有自訂金鑰（例如來自第三方供應商），可在此設定

::: info 中國大陸使用者特別說明

由於網路原因，中國大陸使用者可能無法直接存取 Anthropic 官方服務。Claude Code 支援與 Anthropic API 格式相容的第三方服務，這在技術上是可行的。

**你有兩個選擇：**

1. **直接使用 API Token**：從與 Anthropic API 相容的供應商購買 Token，並透過環境變數進行設定
2. **使用程式設計方案**：一些供應商提供針對程式設計場景優化的方案，通常更具成本效益

**建議做法**：讓 AI Agent 幫你設定。你只需要提供供應商的設定資訊（API 端點、金鑰等），AI 就能正確設定環境變數。

**詳細設定指南請參閱：** [如何安裝 Claude Code 並設定環境變數](/zh-tw/stage-2/backend/modern-cli/)

:::

---

## 快速上手：執行幾個小實驗

安裝完成後，不要急著投入正式專案。先執行幾個小實驗來了解 Claude Code 的運作方式。以下三個實驗由淺入深設計，分別對應三項核心能力：自然語言理解、內容生成和程式碼執行。

### 實驗一：對話——感受 AI 的理解力

目的是體驗 Claude Code 的自然語言理解能力。與普通搜尋引擎不同，Claude Code 能夠理解上下文、進行多輪對話，並根據你的反饋調整回答。

**試試這些提示：**

```text
你好，你是誰？
```

Claude 會自我介紹為 Claude Code，Anthropic 的 AI 程式設計助手。

```text
什麼是閉包？給我太長沒看版（TL;DR）的解釋。
```

觀察 Claude 如何以「太長沒看」為提示，給出簡潔但準確的解釋。

```text
JavaScript 和 TypeScript 有什麼區別？
```

這是一個技術比較問題。看看 Claude 是否提供結構化且有深度的回答。

**實驗重點**：注意 Claude 的回應風格。它通常先給出核心結論，然後再補充細節。這種「倒金字塔」風格非常適合快速獲取資訊。

### 實驗二：生成 Markdown 文件——體驗內容創作

這個實驗展示 Claude Code 的內容生成能力。對開發者來說，撰寫文件往往令人頭痛。Claude 能根據需求快速生成清晰且完整的文件。

**輸入以下指令：**

```text
撰寫一份常用 Git 命令的 Markdown 文件。
要求：包含命令、說明和範例。
```

**Claude 會執行以下步驟：**

1. 分析你的需求：常用 Git 命令、Markdown 格式和三個要素（命令/說明/範例）
2. 規劃文件結構：通常按使用場景分組（初始化、日常開發、分支工作流程、遠端協作等）
3. 生成內容：為每個命令提供簡潔的說明和實用範例
4. 格式化輸出：使用 Markdown 語法和適當的結構

**預期輸出範例：**

```markdown
# 常用 Git 命令速查表

## 初始化儲存庫

| 命令 | 說明 | 範例 |
|------|------|------|
| `git init` | 初始化新儲存庫 | `git init my-project` |
| `git clone` | 複製遠端儲存庫 | `git clone https://github.com/user/repo.git` |

...
```

**進階嘗試**：你可以加入額外要求，例如「加入中文註解」、「按使用頻率排序」、「包含常見錯誤處理」等，觀察 Claude 如何調整輸出。

### 實驗三：撰寫並執行遊戲——端到端程式設計工作流程

這是最具挑戰性的實驗。它展示了 Claude Code 的完整工作流程：理解需求、撰寫程式碼、建立檔案、執行程式和處理錯誤。透過這個實驗，你能真正感受到 AI 程式設計助手的強大之處。

**輸入以下指令：**

```text
用 Python 寫一個貪食蛇遊戲。
要求：
1. 使用 pygame
2. 顯示分數
3. 按 ESC 退出

寫完後幫我執行。
```

**Claude 會執行以下步驟：**

**步驟一：檢查環境**
- 檢查是否已安裝 Python
- 檢查 pygame 是否可用
- 如果缺少則提示安裝

**步驟二：撰寫程式碼**
- 建立遊戲入口檔案（例如 `snake_game.py`）
- 實作移動、食物生成、碰撞偵測
- 加入分數顯示
- 實作 ESC 退出功能

**步驟三：執行遊戲**
- 執行 Python 腳本並啟動遊戲
- 遊戲視窗彈出，使用方向鍵控制蛇的移動

**步驟四：後續支援**
- 如果有 Bug，你可以直接說「蛇可以穿牆，修復這個問題」
- 如果你想要更多功能，例如「分數越高難度越大」，Claude 可以繼續修改

**這個實驗的價值：**

1. **驗證安裝**：確認 Claude Code 能正確執行程式碼
2. **體驗互動**：感受與 AI 協作開發的過程
3. **建立信心**：看到 AI 完成一個端到端可執行的程式

**常見問題：**

- **問：如果沒有安裝 pygame 怎麼辦？**
  - 答：Claude 會偵測到並建議 `pip install pygame`，或者你可以要求 Claude 安裝

- **問：遊戲啟動後終端機被佔用了，怎麼辦？**
  - 答：按 ESC 退出遊戲，或在另一個終端機視窗中繼續使用 Claude Code

- **問：可以換程式語言嗎？**
  - 答：當然可以。試試「用 JavaScript 寫」、「用 HTML5 Canvas 寫」等

---

## 核心技巧

掌握這些技巧，你的 Claude Code 使用效率可以提升數倍。它們來自真實的開發實踐，涵蓋高頻使用場景。

### 技巧一：連按兩次 Esc 回溯對話——撤銷誤操作

這是 Claude Code 中最常用也最重要的快捷鍵。在協作過程中，你可能會打錯字、給出錯誤指令或對回答不滿意。連按兩次 Esc 可以讓你快速「時光倒流」。

**快捷鍵說明：**

```text
按一次 Esc     -> 清除目前輸入（類似 Ctrl+C）
按兩次 Esc     -> 回溯到前一個對話狀態（撤銷上一輪對話）
按三次 Esc     -> 清除所有對話歷史（重新開始）
```

**使用場景：**

- **場景 A**：你不小心發送了錯誤指令，Claude 已經開始執行。快速按兩次 Esc 回到執行前的狀態。
- **場景 B**：Claude 的回答不是你想要的，你想重新表述。連按兩次 Esc 撤銷並重新提問。
- **場景 C**：對話經過多輪，上下文變得混亂。連按三次 Esc 清除並重新開始。

**重要提醒**：連按兩次 Esc 回溯的是**對話狀態**，而不是程式碼變更。如果 Claude 已經編輯了檔案，這些編輯不會自動還原。你需要透過 Git 手動恢復。

**建議**：在可能進行大量程式碼編輯之前，先儲存當前狀態（`git commit` 或 `git stash`），以便輕鬆恢復。

### 技巧二：使用 @ 引用檔案——精確控制上下文

雖然 Claude Code 能自動讀取專案檔案，但明確引用檔案能讓意圖更清晰，避免在不相關的檔案上浪費 Token。

**基本用法：**

與其使用模糊的指令：

```text
解釋 src/utils.ts
```

不如使用明確的引用：

```text
@src/utils.ts 解釋這個檔案
```

**進階用法：**

**比較多個檔案：**
```text
@src/app.tsx @src/components/Header.tsx 這兩個檔案之間有什麼關係？
```

**引用目錄：**
```text
@src/components/ 總結這個目錄下的所有元件
```

**引用特定行（配合編輯器）：**
```text
@src/utils.ts:45-60 解釋這段程式碼的作用
```

**使用提示：**

1. **Tab 補全**：輸入 `@` 後按 Tab，Claude 會顯示當前目錄下的檔案列表，你可以用方向鍵選擇
2. **相對路徑**：支援 `@./config.json` 或 `@../shared/types.ts` 等引用方式
3. **模糊匹配**：允許部分檔案名稱，例如 `@utils` 可以匹配 `src/utils.ts` 或 `src/utils/index.ts`

### 技巧三：使用 ! 執行命令——終端機整合

Claude Code 內建命令執行功能。你不需要切換到其他終端機就能執行命令。

**基本用法：**

```text
!npm test           # 執行測試
!git status         # 檢查 Git 狀態
!ls -la             # 列出檔案
```

**實用場景：**

**場景：執行測試並分析失敗原因**
```text
!npm test
# 失敗後
分析測試失敗原因並修復程式碼
```

**場景：檢查 Git diff**
```text
!git diff
# 請 Claude 解釋變更
總結這次 diff 中的關鍵變更
```

**場景：建構專案**
```text
!npm run build
# 如果建構失敗
建構失敗了，幫我修復
```

**安全提醒：**

對於敏感命令（例如 `rm -rf`、`sudo`），Claude Code 會要求確認。這是一種保護機制，請仔細確認。

### 技巧四：先 /plan 再寫程式——處理複雜任務的正確方式

對於複雜任務，直接寫程式往往效率低下。`/plan` 進入規劃模式：先定義實作計畫，再逐步執行。

**用法：**

```text
/plan
我想加入使用者認證功能。請建立實作計畫。
```

**Claude 會執行以下步驟：**

1. **分析需求**
2. **評估目前專案和技術棧**
3. **建立逐步計畫**
4. **與你討論並根據反饋調整**

**輸出範例：**

```text
📋 使用者認證實作計畫

第一階段：資料庫設計
- [ ] 建立 users 表（id, email, password_hash, created_at）
- [ ] 建立 sessions 表（id, user_id, expires_at）

第二階段：後端 API
- [ ] POST /api/auth/register - 註冊
- [ ] POST /api/auth/login - 登入
- [ ] POST /api/auth/logout - 登出
- [ ] GET /api/auth/me - 取得當前使用者

第三階段：前端整合
- [ ] 建立登入頁面
- [ ] 建立註冊頁面
- [ ] 加入路由守衛

第四階段：測試
- [ ] 撰寫單元測試
- [ ] 撰寫整合測試

你想從哪個階段開始？還是需要調整計畫？
```

**最佳實踐：**

- 預計超過 30 分鐘的任務，先使用 `/plan`
- 逐階段執行並驗證每個階段
- 如果需求變更，重新執行 `/plan` 進行調整

### 技巧五：/init 自動生成設定——快速初始化專案

`/init` 是 Claude Code 最強大的命令之一。它會自動掃描你的專案，識別技術棧和結構，並生成完整的 `CLAUDE.md`。

**用法：**

```text
/init
```

**Claude 會執行：**

1. **掃描專案結構**：識別框架/語言/建構工具
2. **分析設定檔案**：讀取 package.json、tsconfig.json 等
3. **推斷風格**：命名規範和檔案組織方式
4. **生成 CLAUDE.md**

**生成的 CLAUDE.md 範例：**

```text
# 我的專案

## 技術棧
- 框架：Next.js 14（App Router）
- 語言：TypeScript
- 樣式：Tailwind CSS
- 狀態管理：Zustand
- 資料庫：Prisma + PostgreSQL

## 常用命令

\`\`\`bash
npm run dev      # 啟動開發伺服器
npm run build    # 正式建構
npm run test     # 執行測試
npx prisma migrate dev  # 資料庫遷移
\`\`\`

## 程式碼規範
- 使用函式元件 + Hooks
- 檔案命名：PascalCase（元件）、camelCase（工具函式）
- 提交風格：Conventional Commits
```

**為什麼這很重要：**

`CLAUDE.md` 是 Claude Code 的「專案記憶」。每次啟動時，Claude 都會讀取這個檔案，了解專案背景。這意味著：

- 你不需要重複解釋框架和技術棧
- Claude 會遵循你的規範和最佳實踐
- 新團隊成員可以更快上手

**建議**：專案初始化後，立即執行 `/init`，然後根據實際情況微調生成的設定。

### 技巧六：/compact 壓縮上下文——節省 Token

Claude Code 的上下文視窗是有限的（通常約 200K Token）。長時間對話會消耗大量 Token、增加成本，並可能將重要的早期資訊擠出上下文。

**用法：**

```text
/compact
```

**運作原理：**

`/compact` 分析對話歷史，提取關鍵資訊（已做出的決策、已生成的程式碼、已確認的需求），並建立簡潔的摘要。後續對話將基於此摘要而非完整歷史。

**何時使用：**

- 5-6 輪對話之後
- 當 Claude 似乎「忘記」之前的上下文時
- 當切換到新的子任務但需要保留關鍵背景時

**建議用法：**

```text
# 長對話後壓縮
/compact

# 繼續工作
使用者模組已完成，接下來建構訂單模組。
```

### 技巧七：使用 Claude Code 輔助 Git 提交

在 Claude Code 中，建議的提交工作流程是：讓 Claude 檢查 diff 並起草提交訊息，然後你執行標準 Git 命令。這樣清晰明瞭，而且在提交前多了一次審查的機會。

官方參考資料：

- [內建命令](https://code.claude.com/docs/en/commands)
- [探索外掛](https://code.claude.com/docs/en/discover-plugins)

**建議的工作流程：**

```bash
# 1. 檢查當前變更
/diff
!git status

# 2. 請 Claude 總結並生成提交訊息
根據目前的 git diff，生成一條 Conventional Commits 格式的提交訊息，
並用中文解釋為什麼選擇這個類型。

# 3. 確認後，執行標準 Git 提交
!git add -A
!git commit -m "feat(docs): 更新 Claude Code 工作流程指南"
```

**這種方式的好處：**

1. **與目前官方功能一致**：不依賴已移除的內建命令
2. **透明可控**：提交前可審查 diff 和提交訊息
3. **可攜帶**：同樣的工作流程適用於其他 AI IDE 或純 Git

**如果你想要「一鍵提交」的體驗：**

Claude Code 現在建議透過外掛擴展功能。例如，`commit-commands` 提供了 `/commit-commands:commit` 等命令。

```bash
# 1. 加入外掛市集範例
/plugin marketplace add anthropics/claude-code

# 2. 安裝提交工作流程外掛
/plugin install commit-commands@anthropics-claude-code

# 3. 重新載入外掛
/reload-plugins

# 4. 使用外掛命令提交
/commit-commands:commit
```

**額外說明：**

- `/commit-commands:commit` 由外掛提供，不是目前的預設內建命令
- 如果你只需要在提交前檢查變更，建議使用 `/diff` 或讓 Claude 解釋 `git diff`
- 官方 `/review` 也已被標記為廢棄；如需類似功能，請使用外掛或自然語言審查流程

### 技巧八：Shift+Tab 自動接受——提升流暢度

預設情況下，Claude 在編輯程式碼前會要求確認。這在學習階段很有用，但之後可能會覺得慢。`Shift+Tab` 啟用自動接受模式，加快迭代速度。

**用法：**

- 按 `Shift+Tab` -> 進入自動接受模式
- 再按 `Shift+Tab` -> 退出自動接受模式

**模式比較：**

| 模式 | 行為 | 使用場景 |
|------|------|----------|
| 預設模式 | 每次編輯都要求確認 | 學習階段、重要程式碼 |
| 自動接受 | 直接套用編輯 | 熟悉後、快速迭代 |

**注意事項：**

- 在自動接受模式下，Claude 會直接編輯檔案，不會二次確認
- 建議搭配 Git 使用，以便輕鬆回滾
- 對於敏感操作（刪除檔案、修改關鍵設定），Claude 仍然會詢問

### 技巧九：Ctrl+C 取消操作——緊急煞車

當 Claude 正在執行長時間任務，或者你意識到給出了錯誤指令時，`Ctrl+C` 就是緊急煞車。

**用法：**

- 按一次 `Ctrl+C` -> 取消目前正在執行的操作
- 連按兩次 `Ctrl+C` -> 完全退出 Claude Code

**使用場景：**

- 長時間執行的命令需要中斷
- Claude 正在生成大量不相關的程式碼
- 發現給出了錯誤指令，想要立即停止

**與連按兩次 Esc 的區別：**

- `Ctrl+C`：停止正在進行的**操作**（執行命令/生成程式碼）
- 連按兩次 `Esc`：回溯**對話狀態**（撤銷上一輪對話）

### 技巧十：/context 檢查上下文使用量——最佳化 Token 成本

`/context` 顯示目前工作階段的上下文使用量，幫助你了解 Token 消耗情況並最佳化成本。

**用法：**

```text
/context
```

**輸出範例：**

```text
📊 上下文使用量

Token 使用量：45,230 / 200,000（22.6%）
引用檔案數：12 個
對話輪數：8

Token 消耗最多的檔案：
1. src/api/users.ts（3,420 Token）
2. node_modules/@types/react/index.d.ts（2,890 Token）
3. src/components/Dashboard.tsx（1,560 Token）

建議：
- 目前使用量健康，無需壓縮
- 如需減少使用量，可將 node_modules 加入 .claudeignore
```

**如何利用這些資訊：**

1. **識別大檔案**：如果某個檔案消耗大量 Token，檢查是否真的需要
2. **最佳化 .claudeignore**：忽略不相關的檔案（node_modules、建構輸出等）
3. **決定何時壓縮**：當使用量超過 70% 時，考慮使用 `/compact`

### 技巧十一：/resume 恢復工作階段——多任務對話切換

處理多個任務時，你可能會執行多個對話執行緒。`/resume` 讓你在目前聊天中切換回之前的工作階段上下文，無需重新開始。

**用法：**

```text
/resume
```

**運作原理：**

Claude Code 會自動記錄之前的工作階段。當你執行 `/resume` 時，它會切換到之前的工作階段上下文，保留所有先前的討論內容和狀態。

**使用場景：**

**場景 A：平行多任務處理**
```text
# 任務 1：修復 Bug
claude> 修復登入頁面的驗證問題
# ... 一段對話 ...

# 任務 2：新增功能（新執行緒）
claude> 新增使用者註冊功能
# ... 另一段對話 ...

# 切回任務 1
claude> /resume
# 繼續之前的 Bug 修復工作
```

**場景 B：臨時查詢後返回**
```text
claude> 解釋這個演算法
# ... 討論演算法 ...

claude> /resume
# 返回之前的程式設計工作
```

**場景 C：中斷後恢復**
```text
claude> 繼續之前的工作
# 如果你之前中斷了，/resume 會帶你回到之前的狀態
```

**與相關命令的比較：**

| 命令 | 功能 | 場景 |
|------|------|------|
| `/resume` | 在目前聊天中切回之前的工作階段 | 多任務切換 |
| `claude -c` | 繼續最近的工作階段 | 退出後重新連接 |
| `claude -r` | 恢復之前的工作階段 | 退出後恢復先前狀態 |
| 連按兩次 `Esc` | 回溯一輪對話 | 撤銷最近一輪對話 |

**建議：**

1. **多任務管理**：`/resume` 比重新解釋上下文更高效
2. **工作階段記憶**：每個工作階段有獨立的上下文；`/resume` 會保留它
3. **搭配 /compact 使用**：在長時間工作階段中，先壓縮再恢復切換，保持上下文清爽

---

## 核心設定

合理的設定能幫助 Claude Code 更好地適應你的專案和團隊。本節說明設定的作用、優先級以及針對不同使用場景的最佳化。

### 設定檔案位置與優先級

Claude Code 採用分層設定策略。不同層級有不同的作用範圍和優先級。了解這一點可以讓你靈活管理設定。

**設定優先級（從高到低）：**

| 位置 | 作用範圍 | 用途 | 提交到 Git |
|------|----------|------|------------|
| `.claude/settings.local.json` | 本地專案 | 個人偏好 | 否 |
| `.claude/settings.json` | 專案共享 | 團隊統一設定 | 是 |
| `~/.claude/settings.json` | 全域 | 個人預設值 | 否 |

**合併規則：**

- 高優先級的設定會覆蓋低優先級中相同的鍵
- 不衝突的鍵會合併
- 專案設定覆蓋全域設定
- 本地個人設定覆蓋專案共享設定

**實際場景：**

**場景一：團隊專案**
```text
~/.claude/settings.json          # 你的個人預設編輯器設定
.claude/settings.json            # 團隊程式碼規範和權限設定
.claude/settings.local.json      # 你的除錯偏好和主題設定
```

**場景二：個人專案**
```text
~/.claude/settings.json          # 全域預設設定
.claude/settings.json            # 專案特定設定（例如特殊權限規則）
```

### CLAUDE.md——專案記憶

`CLAUDE.md` 是 Claude Code 最重要的設定檔案。它就像專案的「說明書」。每次 Claude Code 啟動時，它都會讀取當前目錄下的 `CLAUDE.md`，了解專案背景、技術棧和規範。

**為什麼 CLAUDE.md 如此重要：**

想像你加入了一個新專案：你需要了解技術棧、程式碼規範和常用命令。通常這需要幾個小時的文件/程式碼審查和詢問團隊成員。有了 `CLAUDE.md`，Claude 在啟動時就知道了這些資訊，你可以立即進行高效協作。

**最小可行模板：**

```text
# [專案名稱]

## 技術棧
- 框架：React 18 + TypeScript
- 狀態管理：Zustand
- 樣式：Tailwind CSS
- 建構工具：Vite

## 常用命令

\`\`\`bash
npm run dev      # 啟動開發伺服器（連接埠 5173）
npm run test     # 執行單元測試
npm run build    # 正式建構
npm run lint     # 程式碼檢查
\`\`\`

## 程式碼規範
- 元件使用函式元件 + Hooks
- 命名：PascalCase（元件）、camelCase（工具函式）
- Git 提交使用 Conventional Commits
- 所有 API 呼叫必須透過統一的請求封裝
```

**完整模板（建議）：**

```text
# [專案名稱]

## 專案概述
一句話描述主要功能和目標使用者。

## 技術棧
### 前端
- 框架：React 18 + TypeScript
- 路由：React Router v6
- 狀態管理：Zustand + React Query
- 樣式：Tailwind CSS + Headless UI
- 建構：Vite

### 後端（如適用）
- 執行環境：Node.js + Express
- 資料庫：PostgreSQL + Prisma
- 認證：JWT + bcrypt

## 專案結構

\`\`\`
src/
├── components/      # 可重用元件
├── pages/           # 頁面元件
├── hooks/           # 自訂 Hooks
├── lib/             # 工具函式
├── types/           # TypeScript 型別定義
└── api/             # API 呼叫
\`\`\`

## 常用命令

\`\`\`bash
# 開發
npm run dev              # 啟動開發伺服器
npm run dev:mock         # 開發時使用模擬資料

# 測試
npm run test             # 執行所有測試
npm run test:watch       # 監控模式
npm run test:coverage    # 生成覆蓋率報告

# 程式碼品質
npm run lint             # ESLint 檢查
npm run lint:fix         # 自動修復 ESLint 問題
npm run format           # Prettier 格式化
npm run typecheck        # TypeScript 型別檢查

# 建構
npm run build            # 正式建構
npm run preview          # 預覽正式建構
\`\`\`

## 開發規則
### 程式碼風格
- 使用函式元件，避免類別元件
- 優先使用自訂 Hooks 進行邏輯抽象
- 元件 props 必須定義 TypeScript 介面

### Git 工作流程
- 分支前綴：`feature/`、`fix/`、`refactor/`
- 提交訊息遵循 Conventional Commits
- PR 必須通過 CI 和程式碼審查

### 效能要求
- 元件延遲載入以減少首屏載入時間
- 使用 WebP 圖片並啟用延遲載入
- API 回應時間保持在 200ms 以下

## 環境變數

\`\`\`bash
# .env.local
VITE_API_BASE_URL=http://localhost:3000
VITE_APP_NAME=MyApp
\`\`\`

## 常見問題

### 開發伺服器啟動失敗？

檢查連接埠 5173 是否被佔用，或嘗試 `npm run dev -- --port 3000`

### 型別錯誤？

執行 `npm run typecheck` 查看詳細錯誤
```

**快速生成 CLAUDE.md：**

如果你的專案已經存在但沒有 `CLAUDE.md`，執行 `/init`：

```bash
claude
# 在 Claude Code 中
/init
```

Claude 會分析專案結構、package.json 和現有程式碼，然後生成實用的 `CLAUDE.md`。生成後，請手動審查並調整。

### .claudeignore——節省 Token

`.claudeignore` 告訴 Claude Code 哪些檔案不應該被讀入上下文。正確的設定可以顯著減少 Token 使用量（通常 40-60%），並提高回應速度。

**為什麼需要 .claudeignore：**

當 Claude Code 嘗試理解專案時，它會讀取相關檔案。有些檔案對理解沒有幫助，而且可能：
- 消耗大量 Token（例如 node_modules 中的型別定義檔案）
- 引入雜訊（日誌、建構輸出）
- 包含敏感資訊（.env 檔案）

**建議設定：**

```text
# ===== 依賴項 =====
# 大量第三方程式碼，通常不需要進入 Claude 上下文
node_modules/
.pnp/
.pnp.js

# ===== 建構輸出 =====
# 生成的產物，不是原始邏輯
dist/
build/
.next/
out/
*.tsbuildinfo

# ===== 日誌 =====
# 執行時日誌，對理解架構沒有價值
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

# ===== 測試輸出 =====
coverage/
.nyc_output/

# ===== 編輯器 / IDE =====
.vscode/*
!.vscode/extensions.json
.idea/
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?

# ===== 系統檔案 =====
.DS_Store
Thumbs.db

# ===== 環境檔案 =====
.env
.env.local
.env.*.local

# ===== 大型二進位資源 =====
*.png
*.jpg
*.jpeg
*.gif
*.svg
*.ico
*.mp4
*.webm

# ===== 鎖定檔案（選填）=====
# 如果你不需要 Claude 分析依賴版本，可以忽略這些
# package-lock.json
# yarn.lock
# pnpm-lock.yaml
```

**設定技巧：**

1. **從最小開始**：先忽略 node_modules 和建構輸出，然後觀察 Token 使用量
2. **根據專案調整**：圖片多的專案 -> 忽略圖片格式；文件專案 -> 保留 Markdown
3. **定期最佳化**：使用 `/context` 查看 Token 消耗最多的檔案，決定是否需要忽略

### 權限設定

預設情況下，Claude Code 在執行敏感操作前會要求確認。透過 `settings.json` 中的 `permissions`，你可以控制哪些動作自動允許、需要確認或完全拒絕。

**權限設定結構：**

```json
{
  "permissions": {
    "allow": [
      // 自動允許，不詢問
    ],
    "ask": [
      // 執行前詢問
    ],
    "deny": [
      // 完全拒絕
    ]
  }
}
```

**規則語法：**

權限規則使用 `ActionType(pattern)` 格式：

| 動作類型 | 說明 | 範例 |
|----------|------|------|
| `Bash` | 執行終端機命令 | `Bash(git status)` |
| `Edit` | 編輯檔案 | `Edit(src/**/*.ts)` |
| `Read` | 讀取檔案 | `Read(README.md)` |
| `Write` | 建立檔案 | `Write(src/components/*.tsx)` |

**萬用字元支援：**

- `*` 匹配任意字元（不包括 `/`）
- `**` 匹配任意路徑
- `?` 匹配一個字元

**實際設定範例：**

```json
{
  "permissions": {
    "allow": [
      "Bash(git status)",
      "Bash(git log:*)",
      "Bash(git diff:*)",
      "Bash(npm test:*)",
      "Bash(npm run lint:*)",
      "Edit(src/**/*.{ts,tsx})",
      "Edit(tests/**/*.test.ts)",
      "Read(src/**/*.ts)",
      "Write(src/components/*.tsx)"
    ],
    "ask": [
      "Bash(git commit:*)",
      "Bash(git push:*)",
      "Bash(git pull:*)",
      "Bash(npm install:*)",
      "Bash(npm run build)",
      "Edit(package.json)",
      "Edit(tsconfig.json)",
      "Read(.env)",
      "Read(config/secrets.*)"
    ],
    "deny": [
      "Bash(rm -rf:*)",
      "Bash(sudo:*)",
      "Bash(curl * | sh)",
      "Bash(wget * | sh)",
      "Edit(.git/*)",
      "Write(/etc/*)",
      "Read(/etc/passwd)"
    ]
  }
}
```

**設定建議：**

1. **開發階段**：相對寬鬆的權限以加快迭代速度
2. **正式階段**：更嚴格的權限，特別是部署和敏感資料操作
3. **團隊協作**：將基線規則放在共享的 `settings.json` 中，個人調整放在 `settings.local.json` 中

### 規則目錄

對於大型專案，單一 `CLAUDE.md` 可能變得臃腫且難以維護。Claude Code 支援透過**規則目錄**進行模組化管理，按主題將規範拆分為獨立檔案。

**目錄結構：**

```text
.claude/
├── settings.json          # 主要設定檔案
├── CLAUDE.md              # 專案概述（仍然需要）
└── rules/                 # 規則目錄
    ├── 00-security.md     # 安全規則（全域）
    ├── 01-coding-style.md # 程式碼風格規則（全域）
    ├── 10-api.md          # API 開發規則
    ├── 11-frontend.md     # 前端開發規則
    ├── 12-backend.md      # 後端開發規則
    └── 20-testing.md      # 測試規則
```

**檔案命名建議：**

使用數字前綴（`00-`、`01-`）控制載入順序：基礎規則在前，特定規則在後。

**規則檔案格式：**

規則檔案支援 YAML frontmatter 來定義適用範圍：

```markdown
---
# 選填：此規則適用的路徑
globs:
  - "src/api/**/*.ts"
  - "src/services/**/*.ts"

# 選填：此規則適用的命令
commands:
  - "generate api"
  - "create endpoint"

# 選填：規則優先級（數字越小 = 優先級越高）
priority: 10
---

# API 開發規則

## 路由設計
- RESTful 風格，使用複數名詞
- 版本控制：/api/v1/users
- 巢狀資源：/api/v1/users/123/orders

## 請求/回應格式
- 統一使用 JSON
- 錯誤回應必須包含 code 和 message
- 分頁回應使用 { data, pagination } 結構

## 安全要求
- 所有端點必須驗證認證（公開端點除外）
- 敏感操作需要二次確認
- 實施速率限制以防止濫用
```

**規則繼承與覆蓋：**

- 全域規則（沒有 frontmatter 或 `globs: *`）適用於所有檔案
- 特定路徑規則僅適用於匹配的檔案
- 如果規則衝突，優先級更高的規則生效
- 特定規則可以覆蓋全域規則

**使用場景範例：**

**場景一：前後端分離專案**
```text
.claude/rules/
├── 00-general.md          # 通用標準（提交訊息、命名）
├── 10-backend.md          # 後端標準（NestJS 特定）
├── 11-frontend.md         # 前端標準（React 特定）
└── 20-database.md         # 資料庫標準（Prisma 特定）
```

**場景二：微服務架構**
```text
.claude/rules/
├── 00-global/             # 全域規則
│   ├── security.md
│   └── logging.md
├── 10-services/           # 服務特定規則
│   ├── user-service.md
│   ├── order-service.md
│   └── payment-service.md
└── 20-shared/             # 共用元件規則
    ├── shared-lib.md
    └── common-utils.md
```

**遷移建議：**

如果你已經有一個非常大的 `CLAUDE.md`，可以這樣遷移到規則目錄：

1. 建立 `.claude/rules/`
2. 按主題拆分 `CLAUDE.md`
3. 為每個規則檔案加入適當的 frontmatter
4. 將 `CLAUDE.md` 保留為專案概述，將詳細標準移出
5. 測試並確保規則載入正常

---

## 核心操作命令

Claude Code 提供了豐富的操作命令用於高效的 AI 協作。這些命令分為幾類：斜線命令（內建功能）、符號系統（快速操作）和自然語言指令（日常開發）。

### 斜線命令速查

斜線命令是以 `/` 開頭的內建操作。它們提供標準化的動作，如專案初始化、設定管理和狀態檢查。

| 命令 | 功能 | 使用場景 |
|------|------|----------|
| `/help` | 顯示所有命令 | 忘記命令時快速查閱 |
| `/init` | 初始化專案並生成 CLAUDE.md | 新專案或新增設定 |
| `/plan` | 進入規劃模式 | 複雜任務前建立計畫 |
| `/clear` | 清除對話歷史 | 上下文混亂時重新開始 |
| `/compact` | 壓縮上下文 | 長對話後節省 Token |
| `/diff` | 開啟互動式 diff 檢視 | 檢查目前未提交的變更 |
| `/plugin` | 管理外掛 | 安裝提交/審查擴展 |
| `/context` | 顯示上下文使用量 | 最佳化 Token 成本 |
| `/cost` | 顯示工作階段成本 | 監控使用成本 |
| `/config` | 開啟設定面板 | 更新設定 |
| `/permissions` | 權限管理 | 調整操作權限 |
| `/model` | 切換模型 | 選擇不同的模型 |

**命令組合範例：**

```bash
# 完整的開發工作流程
/plan                    # 1. 建立計畫
# ... 執行開發 ...
/diff                    # 2. 檢查變更
根據目前的 diff 生成提交訊息
!git add -A              # 3. 暫存變更
!git commit -m "..."     # 4. 提交
/cost                    # 5. 檢查成本
```

### 符號系統

符號系統是 Claude Code 的快速操作機制。特殊符號可以快速觸發特定功能。

| 符號 | 名稱 | 用途 | 範例 |
|------|------|------|------|
| `/` | 斜線命令 | 執行內建操作 | `/help`、`/plan` |
| `@` | At 引用 | 引用檔案/目錄 | `@src/app.tsx` |
| `!` | 驚嘆號模式 | 執行終端機命令 | `!npm test` |
| `&` | 背景執行 | 在背景執行任務 | `&npm run dev` |

**符號組合技巧：**

```bash
# 組合符號
@src/utils.ts !npm test
# 含義：讀取 utils.ts，然後執行測試

@src/components/ @src/pages/ 比較這兩個目錄的結構
# 含義：同時引用兩個目錄進行比較

!git diff @src/app.tsx 解釋這些變更
# 含義：檢查 Git diff 並請 Claude 解釋特定檔案的變更
```

### 檔案操作

檔案操作是最常見的日常動作：讀取、編輯、建立和刪除檔案。

**讀取檔案：**

```bash
# 基本讀取
@src/app.tsx 解釋這個檔案

# 讀取 + 分析
@src/utils/helpers.ts 找出潛在的效能問題

# 比較讀取
@src/components/OldButton.tsx @src/components/NewButton.tsx 比較差異
```

**編輯檔案：**

```bash
# 簡單編輯
修改 src/utils/date.ts 中的 formatDate 以支援中文在地化格式

# 複雜編輯
@src/api/users.ts 重構這個檔案：
1. 將重複的錯誤處理提取為共用的 handleError
2. 將 Promise 鏈替換為 async/await
3. 加入 JSDoc 註解

# 批次編輯
將 src/components/ 下的所有類別元件轉換為函式元件
```

**建立檔案：**

```bash
# 建立一個檔案
建立 src/components/UserCard.tsx，一個用於顯示使用者資訊的卡片元件

# 建立相關檔案
建立使用者模組：
1. src/types/user.ts - 定義 User 介面
2. src/api/users.ts - 使用者 API 呼叫
3. src/components/UserCard.tsx - 使用者卡片元件
4. src/hooks/useUser.ts - 取得使用者資料的 Hook
```

**刪除檔案：**

```bash
# 帶確認的刪除
刪除 src/old-component.tsx（這個元件已不再使用）

# Claude 會要求確認，並可能建議先檢查引用
```

### Git 操作

Claude Code 與 Git 深度整合，讓你可以在不離開終端機的情況下完成完整的版本控制工作流程。

**檢查狀態：**

```bash
# 顯示 Git 狀態
顯示 git status 和未提交的變更

# 詳細 diff
!git diff
解釋 src/api/users.ts 中的變更
```

**建立提交：**

```bash
# 檢查變更
/diff

# 生成提交訊息
根據目前的 git diff 生成一條 Conventional Commit 格式的提交訊息

# 手動提交
!git add -A
!git commit -m "..."
```

**分支操作：**

```bash
# 建立功能分支
!git checkout -b feature/user-authentication

# 實作完成後
根據目前的變更生成提交訊息
!git add -A
!git commit -m "..."
!git push -u origin feature/user-authentication
```

**完整的 Git 工作流程範例：**

```bash
# 1. 開始新功能
!git checkout -b feature/payment-integration

# 2. 開發功能（由 Claude 協助）
建立支付模組，支援支付寶和微信支付

# 3. 執行測試
!npm test

# 4. 檢查變更
/diff

# 5. 生成並確認提交訊息
根據目前的 git diff 生成一條 Conventional Commit 格式的提交訊息
!git add -A
!git commit -m "..."

# 6. 推送到遠端
!git push -u origin feature/payment-integration

# 7. 建立 PR（選填，使用 GitHub CLI）
!gh pr create --title "feat: 新增支付整合" --body "支援支付寶和微信支付"
```

### 程式碼操作

程式碼操作是 Claude Code 的核心優勢：生成、解釋、重構和最佳化。

**生成程式碼：**

```bash
# 生成元件
建立一個 React Hook 來管理認證狀態，包括登入/登出/權限檢查

# 生成工具函式
建立一個日期格式化工具，支援相對時間（例如「2 小時前」）

# 生成完整模組
建立訂單模組，包含：
- 訂單列表頁
- 訂單詳情頁
- 建立訂單 API
- 訂單狀態管理
```

**解釋程式碼：**

```bash
# 逐行解釋
逐行解釋 src/algorithms/quicksort.ts

# 高層級解釋
@src/services/payment.ts 解釋這個模組的架構設計

# 解釋複雜邏輯
解釋 src/utils/dataTransformer.ts 中的 reduce 在做什麼
```

**重構程式碼：**

```bash
# 架構重構
將 src/components/ 中的類別元件轉換為函式元件

# 效能重構
最佳化 src/App.tsx 的渲染效能，減少不必要的重新渲染

# 清理重構
@src/utils/helpers.ts 重構這個檔案：
1. 刪除未使用的函式
2. 將重複的邏輯提取為共用工具
3. 加入型別定義
4. 改善函式命名
```

**除錯程式碼：**

```bash
# 錯誤分析
npm test 失敗了，分析根本原因並修復

# 效能分析
@src/components/DataTable.tsx 這個元件渲染很慢，找出瓶頸

# 日誌分析
!cat logs/error.log
分析這些錯誤日誌並識別根本原因
```

### 測試操作

測試是品質保證的關鍵。Claude Code 可以幫助生成測試、執行測試和分析結果。

**生成測試：**

```bash
# 單元測試
為 src/utils/math.ts 生成單元測試，包括邊界情況

# 元件測試
為 src/components/UserForm.tsx 生成 React Testing Library 測試

# 整合測試
為使用者註冊流程建立整合測試，從表單提交到資料庫寫入
```

**執行和除錯測試：**

```bash
# 執行測試
!npm test

# 除錯失敗的測試
分析失敗原因並修復
@tests/auth.test.ts

# 覆蓋率檢查
!npm run test:coverage
哪些程式碼路徑沒有被覆蓋？
```

**測試策略建議：**

```bash
我加入了使用者認證功能。請：
1. 為 auth.service.ts 生成單元測試
2. 為 LoginForm 生成元件測試
3. 執行所有測試並確保通過
```

### 命令鏈與工作流程組合

使用 Claude Code 最高效的方式是將命令串聯成完整的工作流程。

**場景一：Bug 修復工作流程**

```bash
# 1. 檢查問題
!npm test
測試失敗了，分析原因

# 2. 定位問題
@src/utils/validation.ts 問題在這個檔案中嗎？

# 3. 修復問題
修復 validation.ts 中的 isEmail，使其正確處理包含 + 的信箱地址

# 4. 驗證修復
!npm test

# 5. 提交修復
根據目前的 diff 生成一條 fix 類型的提交訊息
!git add -A
!git commit -m "fix: ..."
```

**場景二：程式碼審查工作流程**

```bash
# 1. 檢查變更
!git diff --stat
哪些檔案變更了？

# 2. 詳細審查
@src/components/ 審查這些元件的變更

# 3. 建議改進
根據這次審查，應該做哪些改進？

# 4. 實施改進
最佳化 UserList 元件的效能

# 5. 最終審查
/diff
審查目前的變更並指出潛在風險和改進空間
```

**場景三：新功能工作流程**

```bash
# 1. 先規劃
/plan
我想加入購物車功能

# 2. 建立分支
!git checkout -b feature/shopping-cart

# 3. 實作功能
按計畫逐步實作

# 4. 加入測試
為購物車模組生成測試

# 5. 執行測試
!npm test

# 6. 程式碼審查
/diff
請對目前的 diff 進行程式碼審查

# 7. 提交
為這次功能開發生成提交訊息
!git add -A
!git commit -m "feat: ..."
!git push
```

---

## 常見問題

使用 Claude Code 時，你可能會遇到各種問題。本節總結了常見的問題和解決方案。

### Token 使用量太快？

Token 消耗過快是最常見的問題之一。以下是一套完整的最佳化策略。

**診斷：**

首先執行 `/context` 檢查目前的 Token 使用量：

```text
/context
```

關注以下指標：
- **Token 使用率**：如果超過 70%，考慮壓縮上下文
- **引用檔案數量**：更多檔案意味著更高的 Token 消耗
- **大檔案**：檢查哪些檔案消耗了最多的 Token

**最佳化策略：**

**1. 改善 .claudeignore**

確保 `.claudeignore` 包含不需要的檔案：

```text
# 必須忽略
node_modules/
dist/
build/
*.log
.env

# 專案特定
# React
.next/
out/

# Vue
.nuxt/
.output/

# 通用
.vscode/
.idea/
coverage/
*.min.js
*.bundle.js
```

**2. 定期壓縮上下文**

長對話會累積大量 Token。建議每 5-6 輪執行一次 `/compact`：

```text
# 長對話後
/compact

# 繼續
現在來實作訂單模組...
```

**3. 精確引用檔案**

除非必要，避免引用整個目錄：

```bash
# 不建議
@src/ 解釋這段程式碼

# 建議
@src/utils/auth.ts @src/components/Login.tsx 解釋登入流程
```

**4. 避免讀取超大檔案**

如果 `/context` 顯示某個檔案消耗大量 Token，考慮：
- 你真的需要它嗎？
- 能否只引用其中一部分？
- 這個檔案能否拆分為更小的模組？

### Claude 不理解專案？

如果 Claude 回答不準確或反覆詢問基本的專案資訊，說明它缺乏專案上下文。

**解決方案：**

**1. 生成 CLAUDE.md**

執行 `/init` 生成專案設定：

```bash
/init
```

生成後，驗證：
- 專案摘要是否準確？
- 技術棧是否完整？
- 常用命令是否正確？
- 程式碼規範是否清晰？

**2. 手動編輯 CLAUDE.md**

如果自動生成的設定不夠詳細，可以加入：

```markdown
## 專案特定資訊

### 架構決策
- 為什麼選擇 X 而不是 Y？
- 核心設計模式是什麼？

### 常見陷阱
- 使用 useEffect 時要注意...
- 資料庫查詢必須...

### 第三方整合
- 透過 Stripe 處理支付
- 透過 SendGrid 發送郵件
- 透過 AWS S3 儲存檔案
```

**3. 使用規則目錄**

對於大型專案，將規範整理到規則目錄中：

```text
.claude/rules/
├── 00-architecture.md    # 架構概述
├── 01-coding-style.md    # 程式碼風格
├── 10-frontend.md        # 前端規則
├── 11-backend.md         # 後端規則
└── 20-testing.md         # 測試規則
```

**4. 需要時在提示中加入上下文**

對於特定任務，附加相關背景資訊：

```text
我們使用自訂的 useAuth Hook 進行認證。
它回傳 { user, login, logout, isLoading }。
請基於這個 Hook 建立一個使用者選單元件。
```

### 如何回滾操作？

Claude Code 提供多種回滾機制以應對不同場景。

**場景一：回溯對話狀態**

如果你只是打錯字或對回應不滿意：

```text
連按兩次 Esc  -> 回溯上一輪對話
連按三次 Esc  -> 清除所有對話歷史
```

**注意**：這只回溯對話狀態，不會還原檔案編輯。

**場景二：撤銷檔案編輯**

如果 Claude 已經修改了檔案，需要手動撤銷：

```bash
# 檢查變更
!git status
!git diff

# 還原單個檔案
git checkout -- src/utils/helpers.ts

# 還原所有工作區變更
git checkout -- .

# 如果已經提交
# 軟回滾（保留變更）
git reset --soft HEAD~1

# 硬回滾（丟棄變更）
git reset --hard HEAD~1
```

**場景三：預防性使用 Git 工作流程**

最佳實踐：在 Claude 工作階段之前儲存當前工作：

```bash
# 開始前儲存當前狀態
git add .
git commit -m "WIP: Claude Code 工作階段前"
# 或使用 stash
git stash push -m "before claude"

# 使用 Claude Code 開發...

# 如果結果不滿意，完全回滾
git reset --hard HEAD~1
# 或
git stash pop
```

### 權限提示太多？

頻繁的權限確認會影響效率。適當的權限設定可以讓工作流程更順暢。

**權限模型：**

Claude Code 的權限分為三個層級：
- **allow**：自動允許
- **ask**：執行前詢問
- **deny**：完全拒絕

**最佳化設定：**

編輯 `.claude/settings.json`：

```json
{
  "permissions": {
    "allow": [
      // Git 讀取操作
      "Bash(git status)",
      "Bash(git log:*)",
      "Bash(git diff:*)",
      "Bash(git branch)",

      // 測試和檢查
      "Bash(npm test:*)",
      "Bash(npm run lint:*)",
      "Bash(npm run typecheck)",

      // 開發伺服器
      "Bash(npm run dev:*)",

      // 原始碼編輯
      "Edit(src/**/*.{ts,tsx})",
      "Edit(tests/**/*.test.ts)",
      "Write(src/**/*.ts)"
    ],
    "ask": [
      // Git 寫入操作
      "Bash(git commit:*)",
      "Bash(git push:*)",
      "Bash(git pull:*)",

      // 套件管理
      "Bash(npm install:*)",
      "Bash(npm uninstall:*)",

      // 建構和部署
      "Bash(npm run build)",
      "Bash(npm run deploy:*)",

      // 設定檔編輯
      "Edit(package.json)",
      "Edit(tsconfig.json)",

      // 敏感檔案讀取
      "Read(.env)",
      "Read(config/secrets.*)"
    ],
    "deny": [
      // 危險命令
      "Bash(rm -rf:*)",
      "Bash(sudo:*)",
      "Bash(curl * | sh)",
      "Bash(wget * | sh)",

      // 系統檔案
      "Edit(/etc/*)",
      "Write(/usr/*)",

      // Git 內部
      "Edit(.git/*)"
    ]
  }
}
```

**漸進式權限策略：**

- **學習階段**：保持預設設定，了解 Claude 嘗試執行什麼
- **熟悉階段**：將常見的安全操作（如 git status、npm test）加入 allow
- **高效階段**：根據專案特點建立細粒度規則

### 如何在中國大陸使用？

由於網路限制，中國大陸使用者可能無法直接存取 Anthropic 官方服務。以下提供幾種方案。

**方案一：使用 API 代理服務**

許多雲端供應商提供與 Anthropic 相容的 API 代理服務：

```bash
# 設定環境變數
export ANTHROPIC_BASE_URL="https://your-api-proxy.com/v1"
export ANTHROPIC_API_KEY="your-api-key"

# 啟動 Claude Code
claude
```

**方案二：使用第三方 Claude Code 相容工具**

一些國內供應商提供相容工具：

```bash
# 安裝相容版本
npm install -g @some-provider/claude-code

# 設定 API 金鑰
claude config set api.key your-api-key
claude config set api.baseUrl https://api.some-provider.com
```

**方案三：使用其他 AI 程式設計工具**

如果 Claude Code 無法使用，可以考慮替代方案：

| 工具 | 特點 | 使用場景 |
|------|------|----------|
| Cursor | 基於 VS Code，功能齊全 | 完整的 IDE 體驗 |
| GitHub Copilot | 強大的自動補全 | 主要用於程式碼補全 |
| 通義靈碼 | 國內產品，國內穩定 | 國內開發環境 |
| Codeium | 免費額度豐厚 | 預算有限 |

**方案四：讓 AI Agent 幫忙設定**

如果你不確定如何設定，可以詢問 AI Agent：

```text
我想使用 Claude Code，但在中國大陸無法直接存取。
我從供應商 XXX 購買了 API。
API 端點是 https://api.xxx.com，
金鑰是 sk-xxx。

請設定環境變數，讓 Claude Code 能夠正常運作。
```

**常見問題：**

- **問：設定後仍然無法連接？**
  - 答：檢查 API 端點是否正確，包括 `/v1` 路徑
  - 答：檢查 API 金鑰的有效性和餘額
  - 答：檢查本地網路是否需要代理

- **問：回應速度慢？**
  - 答：選擇地理區域更近的供應商
  - 答：使用針對程式設計場景優化的方案而非通用 API 方案
  - 答：使用 `/compact` 減少 Token 使用量

- **問：部分功能不可用？**
  - 答：部分第三方供應商可能不完全支援所有 Claude Code 功能
  - 答：查看供應商文件了解支援的功能範圍

---

## 參考資源

- [Claude Code 官方文件](https://code.claude.com/docs)
- [Claude Code GitHub](https://github.com/anthropics/claude-code)
- [Everything Claude Code](https://github.com/affaan-m/everything-claude-code)
