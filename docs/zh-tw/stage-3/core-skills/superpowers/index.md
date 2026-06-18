# Claude Code Superpowers：工程級開發的超能力

## Superpowers 簡介

**Superpowers** 是由 Jesse Vincent（網名：obra）創建的開源 Agent 技能框架，專門解決 AI 程式設計中的一個核心問題：如何讓 AI 產出「工程級」代碼而非「玩具級」代碼。

把普通的 AI 編碼助手想像成一個「聰明的實習生」。它能寫出可運行的代碼，但可能沒有測試、沒有文件、也沒有最佳實踐的紀律。Superpowers 就像是給那個實習生配了一個「資深工程師導師」，強制它遵循完整的軟體開發流程。

### 為什麼需要 Superpowers？

在 Superpowers 出現之前，使用 Claude Code 有幾個問題：

- **Vibe Coding 的混亂**：AI 不經規劃就開始編碼，導致頻繁返工
- **缺乏 TDD 紀律**：AI 傾向於先寫代碼後補測試，或者完全跳過測試
- **需求模糊就開始寫代碼**：用戶說「做一個登入功能」，AI 立刻動手，結果不是想要的
- **代碼品質不穩定**：沒有 code-review 機制，品質取決於 AI 的「心情」

Superpowers 解決了這些問題，把 Claude 變成一個「有紀律的開發團隊」。它幫你先釐清需求，再制定計劃，然後用 TDD 開發，最後通過 Code Review 確保品質。

---

## 快速開始

### 第一步：安裝 Superpowers

在 Claude Code 中運行：

```bash
# 添加市場
/plugin marketplace add obra/superpowers-marketplace

# 安裝 superpowers
/plugin install superpowers@superpowers-marketplace
```

或手動克隆：

```bash
git clone https://github.com/obra/superpowers.git ~/.claude/skills/superpowers
```

### 第二步：嘗試你的第一個技能

讓我們用 Superpowers 的 **brainstorming** 技能來體驗它的價值。

在 Claude Code 中輸入：

```text
幫我做一個用戶登入功能
```

**沒有 Superpowers 時**：Claude 直接開始寫代碼，可能產出你並不真正想要的東西。

**有 Superpowers 時**：Claude 用蘇格拉底式提問幫你釐清需求：

> 這個登入功能是給 Web 應用還是行動應用的？
>
> 需要哪些登入方式？信箱/密碼？第三方登入（Google、GitHub）？
>
> 需要「記住我」功能嗎？
>
> 密碼重設是通過信件還是簡訊？
>
> ...

這些問題迫使你在編碼前就搞清楚真正需要什麼，避免了大量無用代碼。

### 第三步：了解技能觸發機制

Superpowers 不是一個「魔法開關」。它是一組**技能集合**。了解技能如何被觸發很重要。

**三種觸發方式：**

1. **關鍵字觸發**
   - 當你提到 "TDD"、"test-driven development" 或 "write tests first"
   - `test-driven-development` 技能被啟動

2. **場景觸發**
   - 當需求不明確時，`brainstorming` 主動提問
   - 當出現 bug 時，`systematic-debugging` 被啟動

3. **手動調用**
   - 直接使用技能名稱，例如：`/test-driven-development`

#### 💡 重要澄清：如果不指定 TDD 會怎樣？

這是一個常見的誤解。讓我們澄清一下：

```text
# 情況 A：未提及 TDD
"實現一個計算器"
-> Claude 可能寫測試，也可能不寫
-> 取決於模型自身的習慣

# 情況 B：明確要求 TDD
"用 TDD 實現一個計算器"
-> test-driven-development 技能被啟動
-> 強制執行 RED-GREEN-REFACTOR
```

**Superpowers 的真正價值**：不是無中生有地創造能力，而是加強紀律。

- 沒有 TDD 技能：Claude 寫測試是「也許」
- 有 TDD 技能：Claude 被強制遵循 TDD 流程

### 理解 Superpowers 的價值

從上面的解釋可以看出，Superpowers 的核心價值在於：

1. **需求優先**：`brainstorming` 在需求模糊時主動提問
2. **流程紀律**：`test-driven-development` 強制執行 TDD 紅綠重構循環
3. **任務分解**：`writing-plans` 將大項目拆分為小任務
4. **品質控制**：`code-review` 技能確保代碼品質

---

## Superpowers 核心技能詳解

Superpowers 包含 **20+ 可組合技能**，覆蓋完整的軟體生命週期。讓我們按類別逐一介紹。

### 🧪 測試技能

#### test-driven-development

**觸發方式**：提到 "TDD"、"test-driven development" 或 "write tests first" 等關鍵字。

**這個技能做什麼**：強制 Claude 遵循 TDD 紅綠重構循環，而不是「可能事後補測試」。

**傳統做法**（常見問題）：
1. 直接寫代碼
2. 快速手動測試
3. 發現 bug，打補丁
4. 重複...（測試？下次再說吧）

**TDD 做法**（技能啟動後）：
1. 🔴 **RED**：先寫一個會失敗的測試
2. 🟢 **GREEN**：寫最少的代碼讓測試通過
3. 🔵 **REFACTOR**：重構代碼，同時保持測試通過
4. 重複

**使用範例**：

```text
用 TDD 實現一個用戶認證模組
```

Claude 會：
1. 先寫測試（用戶名/密碼驗證、Token 生成等）
2. 運行測試，確認全部失敗（RED）
3. 寫最少的實現代碼
4. 運行測試，確認通過（GREEN）
5. 重構代碼，提取共用邏輯
6. 再次運行測試，確認通過（REFACTOR）

> **注意**：如果你不提到 "TDD"，Claude 可能寫測試也可能不寫。技能的作用是**強制流程紀律**，讓測試不會被「遺忘」。

### 🐛 調試技能

#### systematic-debugging

當 bug 出現時，人類開發者經常嘗試隨機修復。Superpowers 強制執行四階段根因分析：

**階段一：重現問題**
- 確認 bug 可以穩定重現
- 記錄精確的重現步驟

**階段二：隔離根因**
- 用二分法風格縮小範圍
- 添加日誌定位問題代碼

**階段三：驗證假設**
- 提出根因假設
- 設計驗證實驗

**階段四：修復並驗證**
- 實現修復
- 確認 bug 已解決
- 添加回歸測試

#### verification-before-completion

這個技能防止 Claude 在事情只是「看起來差不多」時就宣告完成。在聲稱完成之前，它要求 Claude：

1. 運行所有測試
2. 手動測試關鍵功能
3. 檢查代碼品質（lint）
4. 確認文件已更新

### 🤝 協作技能

#### brainstorming

這是 Superpowers 最有趣的技能之一。它用蘇格拉底式提問來釐清需求。

**工作方式**：當你提供一個模糊的需求時，Claude 不直接開始編碼。它會問問題：

```text
你：做一個博客系統

Claude：
- 這個博客是給誰看的？技術讀者還是普通讀者？
- 需要支援 Markdown 編輯嗎？
- 需要評論功能嗎？
- 需要搜索嗎？
- 是單用戶還是多作者？
- ...
```

這些問題迫使你思考真正需要什麼功能，避免大量無用功能。

#### writing-plans

這個技能將大任務分解為每個可在 2-5 分鐘內完成的小任務。

**範例**：

```text
用 writing-plans 規劃一個 todo API 的開發
```

Claude 會生成一份詳細計劃：

```markdown
# 實現計劃

## 任務一：設計資料庫 schema（預計 5 分鐘）
- 創建 todos 表
- 定義欄位：id, title, completed, createdAt

## 任務二：創建 Express 路由（預計 10 分鐘）
- POST /todos - 創建任務
- GET /todos - 列出任務
- GET /todos/:id - 獲取單個任務
- PUT /todos/:id - 更新
- DELETE /todos/:id - 刪除

## 任務三：添加輸入驗證（預計 10 分鐘）
- title 不能為空
- completed 必須是布林值

## 任務四：寫測試（預計 15 分鐘）
- 為每個端點寫測試
- 覆蓋邊界情況

## 任務五：啟動伺服器並驗證（預計 5 分鐘）
- 運行測試
- 手動測試 API

驗收標準：
- 所有測試通過
- 每個端點的 curl 測試通過
```

#### executing-plans

這個技能分批執行計劃，在每個檢查點暫停等待確認。

**使用範例**：

```text
執行上面的計劃，每完成一個任務後暫停
```

Claude 會：
1. 完成任務一，然後暫停：`✅ 資料庫 schema 完成。繼續嗎？`
2. 你確認後，完成任務二，再暫停
3. 依此類推

這讓你在每個階段都能驗證方向，避免到後面才發現偏離了。

#### dispatching-parallel-agents

這個技能可以並行啟動多個子 Agent。

**使用場景**：當你需要同時處理多個獨立任務時。

```text
用並行 Agent 完成：
- Agent A：寫後端 API
- Agent B：寫前端組件
- Agent C：寫測試
```

每個 Agent 在自己的隔離環境中工作，互不干擾。

#### subagent-driven-development

這個技能為每個小任務啟動一個獨立的子 Agent。

**優點**：
- 每個子 Agent 有隔離的上下文
- 一個任務失敗不影響其他任務
- 多個任務可以並行運行

#### using-git-worktrees

這個技能使用 Git worktree 創建隔離的開發環境。

**好處**：
- 多個功能可以並行開發
- 每個 worktree 相互獨立
- 不會互相衝突

### 👀 Code Review 技能

#### requesting-code-review

代碼完成後，這個技能自動請求 Code Review。

```text
完成功能後自動觸發 Code Review
```

#### receiving-code-review

這個技能定義了如何接收和處理 Review 回饋。

**Review 工作流程**：
1. 提交代碼
2. 自動觸發 Review
3. Reviewer 檢查代碼品質、安全性和測試覆蓋率
4. Reviewer 提供改進建議
5. 修復問題
6. 重新 Review 直到批准

---

## 完整的 Superpowers 工作流程

Superpowers 的真正威力來自於組合多個技能形成完整的開發工作流程。

### 標準開發工作流程

```text
1. Brainstorming
   ↓ 通過問答釐清真實需求

2. 設計文件
   ↓ 分塊展示設計並等待確認

3. Writing Plans
   ↓ 拆分為 2-5 分鐘的小任務

4. Subagent 開發
   ↓ 為每個任務啟動隔離的子 Agent
   ↓ 兩階段 Review：規格一致性 + 代碼品質

5. TDD
   ↓ 強制執行 RED-GREEN-REFACTOR

6. Code Review
   ↓ 品質門檻

7. 完成
```

### 實戰範例：用 Superpowers 構建用戶認證系統

讓我們通過一個完整範例來體驗 Superpowers 的工作流程。

#### 第一步：用 Brainstorming 釐清需求

```text
我需要一個用戶認證系統
```

Claude 會問：
- 是 Web 應用還是行動應用？
- 需要哪些登入方式？
- 需要密碼重設嗎？
- 需要「記住我」功能嗎？
- ...

#### 第二步：生成設計文件

需求確認後，Claude 會產出設計文件：

```markdown
# 用戶認證系統設計

## 功能需求
1. 用戶註冊（信箱 + 密碼）
2. 用戶登入
3. 密碼重設（信件）
4. 記住我（JWT + Refresh Token）

## 技術選擇
- 後端：Node.js + Express
- 資料庫：SQLite
- 認證：JWT
- 加密：bcrypt

## API 設計
- POST /api/auth/register
- POST /api/auth/login
- POST /api/auth/refresh
- POST /api/auth/reset-password
```

#### 第三步：編寫實現計劃

```text
用 writing-plans 創建實現計劃
```

Claude 會生成詳細的任務列表，每個任務可在 2-5 分鐘內完成。

#### 第四步：執行開發

```text
用 TDD 執行上面的計劃
```

Claude 會：
1. 先寫測試
2. 確認測試失敗（RED）
3. 寫實現代碼
4. 確認測試通過（GREEN）
5. 重構代碼（REFACTOR）

#### 第五步：Code Review

完成後自動觸發 Code Review，檢查：
- 代碼品質
- 安全性（SQL 注入、XSS 等）
- 測試覆蓋率
- 文件完整性

---

## Superpowers 與直接使用 Claude Code 的對比

| 維度 | 直接使用 Claude Code | 使用 Superpowers |
|------|---------------------|-----------------|
| **需求釐清** | AI 直接開始編碼 | 蘇格拉底式提問先釐清需求 |
| **開發流程** | 自由發揮，取決於 AI | 強制執行 TDD 紅綠重構 |
| **任務管理** | 一次完成 | 拆分為小任務，帶檢查點 |
| **代碼品質** | 取決於 AI 判斷 | 強制執行 Code Review |
| **可預測性** | 結果不穩定 | 可重複的流程 |
| **最適合** | 簡單任務、原型驗證 | 複雜項目、生產代碼 |

### 視覺比喻

如果 Claude Code 是一個「聰明的實習生」：

- **直接使用**：告訴實習生「做一個登入功能」，他立刻開始編碼，可能產出你覺得不對的東西
- **有 Superpowers**：給實習生配了一位資深導師，幫他釐清需求、制定計劃、檢查代碼品質

---

## 安裝和配置詳解

### 方法一：通過市場安裝（推薦）

```bash
# 添加市場
/plugin marketplace add obra/superpowers-marketplace

# 安裝
/plugin install superpowers@superpowers-marketplace

# 驗證安裝
/skills
```

### 方法二：手動克隆

```bash
# 創建目錄
mkdir -p ~/.claude/skills

# 克隆倉庫
git clone https://github.com/obra/superpowers.git ~/.claude/skills/superpowers
```

### 方法三：項目級別安裝

如果你想在特定項目中使用 Superpowers：

```bash
# 在項目根目錄
mkdir -p .claude/skills

# 克隆或複製 superpowers
cp -r ~/.claude/skills/superpowers .claude/skills/
```

這樣團隊成員可以共享相同的 Superpowers 配置。

---

## 常用技能速查表

| 技能名稱 | 功能 | 使用場景 |
|---------|------|---------|
| `brainstorming` | 通過蘇格拉底式提問釐清需求 | 需求不明確時 |
| `writing-plans` | 將任務拆分為小步驟 | 啟動大型項目前 |
| `executing-plans` | 帶檢查點地執行計劃 | 計劃驅動開發過程中 |
| `test-driven-development` | TDD 紅綠重構循環 | 所有功能開發 |
| `systematic-debugging` | 四階段根因分析 | 出現 bug 時 |
| `verification-before-completion` | 完成前驗證 | 任務完成時 |
| `requesting-code-review` | 請求 Code Review | 代碼提交前 |
| `subagent-driven-development` | 子 Agent 驅動開發 | 並行任務 |
| `using-git-worktrees` | Git worktree 隔離 | 並行功能開發 |

---

## 最佳實踐

### 1. 使用清晰的觸發關鍵字

Superpowers 技能通過關鍵字觸發。了解常見觸發詞：

| 技能 | 觸發關鍵字 |
|------|-----------|
| `test-driven-development` | "TDD"、"test-driven"、"write tests first" |
| `brainstorming` | 需求不明確時自動觸發 |
| `systematic-debugging` | "debug"、"bug"、"not working" |
| `writing-plans` | "make a plan"、"planning" |

### 2. 在需要流程紀律時使用 Superpowers

- 生產級代碼開發 -> 提到 "TDD"
- 需求不明確 -> 讓 `brainstorming` 釐清
- 複雜項目 -> 用 `writing-plans` 分解任務

### 3. 簡單任務不要強制使用

如果是快速原型或一次性腳本，不需要完整流程。Superpowers 最適合需要長期維護的代碼。

### 4. 技能可以組合使用

```text
用 TDD 實現用戶認證，完成後幫我做 Code Review
```

這會同時觸發 `test-driven-development` 和 `code-review` 技能。

---

## 常見問題

### Q1：使用 Superpowers 必須指定 "TDD" 嗎？

**不需要**。

Superpowers 是一個技能集合，每個技能有自己的觸發條件：
- 說「用 TDD」-> 觸發 `test-driven-development`
- 不說 TDD -> Claude 可能寫測試也可能不寫（取決於模型行為）

Superpowers 的存在是為了**強制流程紀律**，而不是無中生有地創造能力。

### Q2：Superpowers 會讓開發變慢嗎？

一開始可能會覺得慢，因為：
- 需求釐清需要時間
- 先寫測試再寫代碼
- 需要 Code Review

但長期來看，由於減少了返工和 bug，整體效率會提高。

### Q3：小項目也需要 Superpowers 嗎？

對於原型驗證或非常簡單的任務，可以直接使用 Claude Code。Superpowers 更適合：
- 生產級項目
- 多人協作
- 長期可維護性

### Q4：Superpowers 和 Skills 有什麼區別？

| 維度 | Superpowers | Skills |
|------|-------------|--------|
| **性質** | 完整的開發方法論框架 | 可複用的技能包 |
| **範圍** | 覆蓋完整開發流程 | 聚焦於特定功能 |
| **關係** | Superpowers 內部使用 Skills | Superpowers 是 Skills 的集合 |

### Q5：我可以自定義 Superpowers 技能嗎？

可以。Superpowers 是開源的，你可以：
1. Fork 倉庫
2. 修改現有技能
3. 添加新技能
4. 回饋給社群

---

## 參考資料

### 官方資源

- [obra/superpowers GitHub](https://github.com/obra/superpowers) - 官方倉庫（50,000+ ⭐）
- [Superpowers 詳細使用教程](https://www.cnblogs.com/gyc567/p/19510203) - 詳細的中文教程
- [Superpowers 環境搭建指南](https://m.blog.csdn.net/gitblog_00683/article/details/144768992) - 搭建指南

### 社群資源

| 倉庫 | 描述 |
|------|------|
| [affaan-m/everything-claude-code](https://github.com/affaan-m/everything-claude-code) | 包含 TDD 工作流程的全面工具包 |
| [shanraisshan/claude-code-best-practice](https://github.com/shanraisshan/claude-code-best-practice) | 社群實踐資料 |

### 相關文章

- [告別 Vibe Coding！用 Superpowers 讓 Claude Code 寫出工程級代碼](https://juejin.cn/post/7593573617648123956)
- [我是如何用 Superpowers MCP 強制 Claude Code 先規劃再寫代碼的](https://juejin.cn/post/7570341520551673871)
- [Claude Code + Superpowers 新手教程](https://juejin.cn/post/7594832320030638123)

---

## 總結

Superpowers 是一套**工程級開發技能**，將 Claude Code 從「聰明的實習生」升級為「有紀律的開發團隊」。

### 核心要點

1. **Superpowers 是技能集合，不是魔法**
   - 安裝後技能在背景可用
   - 通過關鍵字或場景觸發
   - 你可以手動調用特定技能

2. **記住關鍵觸發詞**
   - 想要 TDD -> 說「用 TDD」
   - 需求模糊 -> `brainstorming` 主動提問
   - 出現 bug -> 提到 "debug" 觸發 `systematic-debugging`

3. **最適合的場景**
   - ✅ 生產級代碼開發
   - ✅ 長期可維護的項目
   - ✅ 團隊協作項目
   - ❌ 快速原型（可選）
   - ❌ 一次性腳本（可選）

記住：**Superpowers 不會讓 AI 更聰明；它讓 AI 更有紀律。**
