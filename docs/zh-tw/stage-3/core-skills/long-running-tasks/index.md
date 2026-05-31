# 如何讓 Claude Code 長時間工作

## 簡介

傳統的 AI 程式設計助手是「對話式」的：你說一句，它回一句，然後停止。但對於真正的開發任務，這種模式遠遠不夠。

想像這些場景：你想讓 Claude 重構一整個專案，但它編輯了幾個檔案就說「完成了」；你想讓 Claude 持續修 bug 直到所有測試通過，但它執行一次就停了；你想讓 Claude「通宵工作」，結果第二天早上發現它早就停了。

2025 年夏天，一位名叫 Geoffrey Huntley 的澳洲開發者（他同時也是一位牧羊人）寫了一個 5 行的 bash 腳本。腳本很簡單：不斷重新啟動 Claude Code 並餵給它相同的任務。他將其命名為「Ralph Wiggum」，取自《辛普森家庭》中那個不斷嘗試、永不放棄的角色。

這個簡單的腳本震驚了矽谷。僅僅兩週內，相關專案就獲得了 7,000+ GitHub Stars。人們用它在一夜之間生成了 6 個完整的專案，僅用 297 美元的 API 成本完成了 50,000 美元的外包工作，甚至用它花了 3 個月建置了一個完整的程式語言。

本章要解決的核心問題是：如何讓 Claude Code 像真正的開發者一樣持續工作，直到任務真正完成。

---

## 核心原理：為什麼 AI 會「過早停止」？

在討論具體方法之前，先了解根本原因。

### AI 的完成判斷是不可靠的

LLM 有一個根本性的弱點：它們無法可靠地判斷工作是否真正完成。

人類的完成標準是客觀的：所有測試通過、功能完整、程式碼品質達標。但 AI 只能靠「感覺」來判斷。它可能因為「看起來差不多了」而停止，或者因為「輸出似乎夠了」而停止，或者因為不知道下一步該做什麼而停止。

正因如此，我們需要一個外部系統來判斷真正的完成，而不是依賴 AI 內部的感覺。

### 解決方案的核心思想

核心解決方案是讓 AI 一直在一個「迴圈」內工作。

每當它試圖退出時，外部系統會檢查三個問題：是否真的完成了？是否滿足客觀標準？有沒有遺漏什麼？如果不是，就重新注入任務，開始下一輪。

這個思想可以用多種形式實現，從簡單的 bash 腳本到複雜的編排系統，但本質是一樣的。

---

## 方法一：While True Bash 迴圈（最原始的方法）

這是最簡單、最直接的實現方式。本質上，寫一個無限迴圈，每輪重新啟動 Claude Code 並餵入相同的任務描述。

最簡單的實現只需要 5 行：

```bash
#!/bin/bash
while true; do
    cat PROMPT.md | claude
done
```

### 運作原理

腳本流程很直接。第 1 步從 `PROMPT.md` 讀取任務描述。第 2 步啟動 Claude Code 並傳入任務描述。第 3 步 Claude 工作並輸出結果。第 4 步 Claude 完成後退出。第 5 步迴圈自動重新啟動並回到第 1 步，形成無限循環，除非你手動用 `Ctrl+C` 中斷。

### 優缺點

優點是極其簡單：任何人都能理解，無需配置，立即可用，適合快速實驗。

但缺點也很明顯：無法判斷真正的完成，可能永遠轉下去，沒有安全防護，可能浪費 API 呼叫。

### 實際使用範例

首先，建立一個 `PROMPT.md` 檔案來描述你的任務。例如，重構一個使用者認證模組：

```markdown
# 任務：重構使用者認證模組

需求：
1. 將所有認證邏輯提取到獨立的 AuthService 類別中
2. 新增單元測試，覆蓋率 > 80%
3. 更新相關文件

當所有測試通過且文件更新後，輸出：任務完成
```

然後建立並運行迴圈腳本：

```bash
chmod +x loop.sh
./loop.sh
```

### 更安全的改進版

為避免無限迴圈，加上迭代上限：

```bash
#!/bin/bash
MAX_ITERATIONS=50
iteration=0

while true; do
    iteration=$((iteration + 1))
    echo "=== 第 $iteration/$MAX_ITERATIONS 次迭代 ==="

    cat PROMPT.md | claude

    if [ $iteration -ge $MAX_ITERATIONS ]; then
        echo "已達到最大迭代次數，停止"
        break
    fi

    sleep 5  # 短暫延遲以避免 API 速率限制
done
```

這個改進版新增了最大迭代次數限制、顯示每輪進度、到達上限時自動停止。同時還加了每次迴圈之間 5 秒的延遲來避免速率限制。

---

## 方法二：Ralph Wiggum 外掛（官方推薦）

Ralph Wiggum 是 Anthropic 官方的外掛，專門為長時間運行的任務而建置。它以《辛普森家庭》中的角色命名，代表「即使失敗也不斷嘗試」的精神。

### 核心機制：Stop Hook

Ralph 的核心是 Stop Hook。當 Claude 想要退出時，Stop Hook 會攔截退出訊號。然後系統檢查：輸出中是否包含特定的完成標記？如果沒有找到標記，就重新注入原始提示詞並開始新一輪迭代。只有在偵測到完成標記時，才允許 Claude 退出。

這保證了 Claude 不會僅僅因為「感覺差不多了」就停止。它必須完成明確標記的要求。

### 安裝

Ralph Wiggum 是 Claude Code 的官方外掛，可以透過兩種方式安裝。

**方式一：從官方外掛市集安裝（推薦）**

```bash
# 在 Claude Code 中執行
claude

# 新增官方外掛市集
/plugin marketplace add anthropics/claude-code

# 安裝 Ralph Wiggum
/plugin install ralph-wiggum@claude-code-plugins

# 驗證安裝
/plugin
```

**方式二：直接從 GitHub 安裝**

```bash
# 進入外掛目錄
cd ~/.claude/plugins/

# 複製外掛儲存庫
git clone https://github.com/anthropics/ralph-wiggum-plugin.git
```

安裝後，你可以使用：

- `/ralph-wiggum:ralph-loop` - 啟動迴圈
- `/ralph-wiggum:cancel-ralph` - 取消迴圈
- `/ralph-wiggum:help` - 顯示說明

### 基本使用

使用 `/ralph-wiggum:ralph-loop`：

```bash
/ralph-wiggum:ralph-loop "建置一個具有 CRUD 操作、輸入驗證和測試的待辦事項 API。
             當一切完成後輸出 <promise>COMPLETE</promise>。" \
  --max-iterations 50 \
  --completion-promise "COMPLETE"
```

### 參數說明

最重要的兩個參數是 `--max-iterations` 和 `--completion-promise`。

`--max-iterations` 設定硬性安全上限。建議值通常為 20-100。即使未完成，Ralph 也會在此上限停止，以防止無限的 API 費用。

`--completion-promise` 指定完成標記文字，必須明確且唯一。Ralph 只有在 Claude 的輸出包含該標記時才視任務為完成。使用清晰的標記如 `COMPLETE` 或 `TASK_DONE`，避免模糊的詞語。

### 提示詞最佳實踐

寫好提示詞是 Ralph 成功的關鍵。

不好的提示詞通常不定義完成標準。例如「寫一個待辦事項 API」可能導致 AI 輸出一個粗略的骨架就停止，沒有測試、沒有驗證、沒有文件。

好的提示詞應該包含分階段的需求和明確的驗收標準。例如：

先描述分階段任務。第一階段是核心功能，包含所有 CRUD 端點：POST `/todos` 建立、GET `/todos` 列表、GET `/todos/:id` 取得單筆、PUT `/todos/:id` 更新、DELETE `/todos/:id` 刪除。第二階段是輸入驗證：標題不能為空，完成狀態必須是布林值。第三階段是測試：為每個端點撰寫測試，覆蓋率 > 80%。

然後定義驗收標準：所有測試通過、程式碼通過 linter、README 包含 API 文件。

最後定義一個唯一的完成標記：`<promise>TODO_API_COMPLETE</promise>`。

這樣 Claude 就確切知道要做什麼以及何時才是真正的完成。

### 更多提示詞範本

以下是常見任務的範本，你可以直接使用或調整。

**範本一：測試遷移（Jest -> Vitest）**

```text
/ralph-wiggum:ralph-loop "
將此專案中的所有測試從 Jest 遷移到 Vitest：
- 保持所有測試邏輯不變
- 更新配置檔案（vite.config.js、vitest.config.js）
- 替換 Jest 特定的 API（例如 jest.mock -> vi.mock）
- 確保所有測試通過
- 移除 Jest 相關依賴

驗收標準：
- npm test 完全通過
- package.json 中沒有 Jest 依賴
- 專案建置成功

完成後輸出：<promise>VITEST_MIGRATION_COMPLETE</promise>
" --max-iterations 40 --completion-promise "VITEST_MIGRATION_COMPLETE"
```

**範本二：UI/UX 優化（行動優先）**

```text
/ralph-wiggum:ralph-loop "
將此專案的 UI/UX 打磨成一個精緻的行動優先語言學習應用程式：
- 統一間距和留白（使用 4px 基準單位）
- 建立清晰的排版層級（標題/正文/輔助文字）
- 統一卡片、列表和共用元件的樣式
- 新增底部導航（首頁/學習/測驗/進度/設定）
- 確保行動端渲染品質

驗收標準：
- npm run build 成功
- 沒有 TypeScript 錯誤
- 關鍵頁面在行動端預覽正確

完成後輸出：<promise>UI_UX_COMPLETE</promise>
" --max-iterations 25 --completion-promise "UI_UX_COMPLETE"
```

**範本三：批量 TypeScript 型別標註**

```text
/ralph-wiggum:ralph-loop "
為專案中所有函式新增 TypeScript 型別標註：
- 優先處理 src/ 目錄
- 為函式參數和回傳值新增型別
- 避免 any，使用具體型別或 unknown
- 新增必要的型別定義

驗收標準：
- npm run typecheck 通過
- 沒有 @ts-ignore 或 @ts-any 註解
- 程式碼正確運行

完成後輸出：<promise>TYPES_ADDED</promise>
" --max-iterations 30 --completion-promise "TYPES_ADDED"
```

**範本四：TDD 驅動的功能開發**

```text
/ralph-wiggum:ralph-loop "
使用 TDD 實作結帳功能：
1. 先寫測試（checkout.test.ts）
2. 執行測試（應該失敗）
3. 寫最小量的程式碼讓測試通過
4. 重構和優化
5. 重複直到所有測試通過

功能需求：
- 購物車商品列表
- 運費計算
- 優惠券套用
- 付款表單驗證

驗收標準：
- 所有測試通過（npm test checkout.test.ts）
- 程式碼覆蓋率 > 80%
- 沒有 ESLint 錯誤

完成後輸出：<promise>CHECKOUT_COMPLETE</promise>
" --max-iterations 25 --completion-promise "CHECKOUT_COMPLETE"
```

**範本五：程式碼風格統一**

```text
/ralph-wiggum:ralph-loop "
統一專案中的程式碼風格：
- 使用 Prettier 格式化所有檔案
- 統一命名規範（變數 camelCase、元件 PascalCase）
- 移除未使用的 import 和變數
- 統一字串引號（單引號）
- 統一分號風格（無分號）

驗收標準：
- npm run lint 通過
- 程式碼風格一致
- 建置成功

完成後輸出：<promise>STYLE_UNIFIED</promise>
" --max-iterations 20 --completion-promise "STYLE_UNIFIED"
```

### 真實案例

一個著名的案例發生在 Y Combinator 的黑客松上，一個團隊使用了 Ralph Loop。晚上 11 點，他們設定了一個任務：依序實作 6 份產品規格的 MVP，並為每一個發出特定的完成標記。他們將最大迭代次數設為 200，然後去睡覺了。

第二天早上，他們有了 6 個可展示的專案，而 API 成本只有 297 美元。這就是 Ralph 的力量：當你在睡覺時，AI 持續工作。

另一個案例來自 Boris Cherny（Claude Code 負責人）。使用 Ralph 加上 Opus 4.5，他在 30 天內交付了 259 個 PR，包含 497 次 commit，新增 40,000 行，刪除 38,000 行。最驚人的是，這一切都是由 Claude Code 生產的，沒有手動寫程式碼。

一個更瘋狂的案例是 CURSED 程式語言。Ralph 的創造者 Geoffrey Huntley 使用 Ralph Loop 花了 3 個月自主建置了一個完整的程式語言。它的關鍵字使用 Z 世代的俚語（如 `slay`、`sus`、`based`），更重要的是它包含完整的 LLVM 編譯器實作、標準函式庫和部分編輯器支援。這展示了 Ralph Loop 的真正潛力：如果你提供一個明確的目標，它可以持續工作數月，直到一個複雜的專案真正完成。

### 更多真實案例

**自動化專案重構**

一位開發者使用 Ralph 重構了一個程式碼混亂、沒有測試、缺少文件的遺留專案。分配的任務是：

1. 為現有程式碼新增測試
2. 逐步重構，確保每次修改後測試仍然通過
3. 更新文件

Ralph 運行了整整一個週末。到週一時，有 47 次 commit，更清晰的程式碼結構，75% 的測試覆蓋率，以及完整的 API 文件。成本約 12 美元。

### Ralph 哲學

Ralph 體現了三個核心哲學。

第一個是迭代勝過完美。不要期望一次就完美；用迴圈來改進。第一輪可能只建了骨架，第二輪修 bug，第三輪優化，第四輪加測試；每一輪都更好。

第二個是將失敗視為資料。每一次測試失敗都是改進的機會；不要害怕失敗，從中學習。

第三個是持續嘗試：不斷嘗試直到成功。這就是 Ralph 精神。

### Ralph 適用和不適用的場景

了解 Ralph 適用於哪裡有助於節省時間和成本。

**Ralph 適用的場景**

這些任務有明確的完成標準，適合自動迭代：

| 場景 | 原因 |
|------|------|
| 測試遷移 | 目標框架明確，通過測試即可驗證 |
| 大型重構 | 可以定義特定的重構規則 |
| 框架遷移 | 遷移成功可由可運行的程式碼驗證 |
| 批量型別標註 | typecheck 通過即完成 |
| 測試覆蓋率提升 | 覆蓋率百分比是客觀的 |
| 文件生成 | API 文件可以自動驗證 |
| UI/UX 統一 | 可以定義具體的設計規則 |
| 有重現步驟的 Bug 修復 | 通過條件是可測試的 |

**Ralph 不適用的場景**

這些任務需要人類判斷或探索：

| 場景 | 原因 |
|------|------|
| 架構決策 | 例如微服務 vs 單體需要權衡判斷 |
| 安全敏感的程式碼 | 漏洞可能很微妙，難以自動偵測 |
| 需求不明確 | 沒有清晰的完成標準 |
| 探索性工作 | 方向持續變化 |
| 創意設計 | 需要人類的審美判斷 |
| 簡單的一次性任務 | 使用 Ralph 太大材小用 |

**決策檢查清單**

問自己三個問題：
1. **我能定義明確的完成標準嗎？** 如果不能，不適合
2. **有客觀的驗證方法嗎？**（測試/建置/typecheck）如果沒有，不適合
3. **這個任務需要持續的人工回饋嗎？** 如果需要，不適合

如果三個答案都是「否」，就讓 Ralph 跑吧。

---

## 方法三：增強版 Ralph

這是社群對官方 Ralph 的增強實現。[frankbria/ralph-claude-code](https://github.com/frankbria/ralph-claude-code) 專案加入了更強的安全機制。

### 額外功能

增強版 Ralph 新增了幾個額外的安全功能。

第一個是雙重退出條件。官方 Ralph 只檢查完成標記，但增強版要求同時滿足完成標記和明確的 `EXIT_SIGNAL` 才會停止。這意味著即使 Claude 輸出了完成標記，迴圈仍可繼續進行額外驗證，除非出現明確的退出訊號。

第二個是速率限制。預設為每小時 100 次運行，防止因 bug 導致的無限迴圈造成失控的 API 帳單。你可以調整此限制。

第三個是智慧斷路器。如果系統連續 5 次偵測到完成標記，它會強制停止。這防止了迴圈無法正確終止的罕見邊界情況。

第四個是即時儀表板。增強版 Ralph 提供了一個命令列儀表板，顯示當前迭代次數、任務進度和預估成本。

### 安裝

透過從 GitHub 複製來安裝增強版 Ralph：

```bash
git clone https://github.com/frankbria/ralph-claude-code.git
cd ralph-claude-code
./install.sh
```

安裝腳本會自動設定所需的檔案和配置。

### 使用

增強版 Ralph 的使用分為兩步。首先用 `ralph-setup` 初始化專案：

```bash
ralph-setup my-project
```

這會在專案中建立所需的配置檔案。然後用 `ralph loop` 啟動迴圈：

```bash
ralph loop
```

### 配置檔案

增強版 Ralph 使用 `.claude/ralph-config.json`：

```json
{
  "maxIterations": 50,
  "rateLimitPerHour": 100,
  "completionPromise": "TASK_COMPLETE",
  "exitSignal": "EXIT_NOW",
  "costAlertThresholds": [10, 50, 100]
}
```

`maxIterations` 是最大迴圈次數。`rateLimitPerHour` 是每小時速率上限。`completionPromise` 是完成標記文字。`exitSignal` 是明確的退出訊號。`costAlertThresholds` 定義預算警告級別。

---

## 方法四：Agent Teams（平行多代理）

當任務足夠大時，單個 Claude 是不夠的；你需要「團隊協作」。

Agent Teams 是一種進階能力，允許多個 Claude 實例平行運行，並透過共享的任務列表和依賴關係進行協調。這適用於非常大的專案。在 Nicholas Carlini 的實驗中，16 個平行代理在兩週內生成了 100,000+ 行程式碼，建置了一個能編譯 Linux 核心的 C 編譯器。

Agent Teams 更為複雜，我們將在下一節詳細介紹：「3.3 Agent Teams 多代理協作」。

---

## 方法五：背景任務（Ctrl+B）

這是一種簡單實用的非阻塞執行方式。

### 基本操作

使用方式很直接。當 Claude 啟動一個任務時，按 `Ctrl+B` 將其推到背景。

例如，你說：「執行完整的測試套件。」Claude 開始運行。你按 `Ctrl+B`，Claude 回覆：「任務已推到背景（ID: task_abc123）。」然後你可以繼續說：「同時，幫我分析這個日誌檔案。」Claude 可以在測試於背景繼續運行的同時分析日誌。

### 查看背景任務

有幾種方式檢查背景任務。使用 `/tasks` 列出所有任務，包含任務 ID、狀態和開始時間。按 `Ctrl+T` 可快速查看狀態摘要。你也可以將任務拉回前景來檢查即時輸出。

### 適用場景

背景任務適用於典型的場景：

第一，長時間運行的測試。完整測試套件可能需要幾十分鐘，背景模式可以避免阻塞。

第二，大型專案建置。建置管線可以在你繼續其他工作時運行。

第三，批量檔案操作，如大量重新命名和格式化。

第四，任何你不想同步等待的操作。

---

## 安全機制：防止無限迴圈

任何自動化迴圈系統都必須包含保護措施，否則可能失控。

### 硬性限制

最基本的保護是設定 `--max-iterations`（最大迴圈次數）。這是強制性的。無論完成狀態如何，任務都會在此上限停止，防止無限的 API 開銷。

你也可以強制時間限制，例如 4 小時後自動停止。你還可以設定預算警報，在消費達到閾值時暫停並通知（例如 10 美元、50 美元、100 美元）。

### 智慧偵測

你可以加入智慧的死循環偵測。例如，檢查最近的 commit 是否包含有意義的變更：

```bash
if [ $(git diff HEAD~5 | wc -l) -eq 0 ]; then
    echo "最近 5 次 commit 沒有實質變更，可能陷入迴圈"
    exit 1
fi
```

如果最近的 diff 幾乎沒有變化，系統可能卡住了，應該停止並發出警報。

### 成本警報

在配置中設定成本警報閾值：

```json
{
  "costAlertThresholds": [10, 50, 100],
  "alertAction": "pause_and_notify"
}
```

當消費達到 10、50 或 100 美元時，系統會暫停並通知，讓你決定是否繼續。

### 手動檢查點

對於重要的任務，加入手動檢查點：

```bash
if [ $((iteration % 10)) -eq 0 ]; then
    read -p "已完成 $iteration 次迭代。繼續嗎？(y/n)" answer
    if [ "$answer" != "y" ]; then
        break
    fi
fi
```

這會每 10 次迭代暫停一次等待確認，允許及時的人工介入。

---

## 實戰建置：使用 Ralph Loop 建置完整的 BBS 論壇

讓我們用一個完整的範例來展示 Ralph Loop 的威力。我們將從零開始建置一個 BBS 風格的論壇系統，包括使用者認證、發文、個人中心和後台管理。

### 專案目標

建置一個功能完整的 BBS 論壇系統，包含：

**使用者端功能：**
- 使用者註冊、登入、登出
- 瀏覽文章列表（分頁）
- 檢視文章詳情
- 發佈新文章
- 留言功能
- 個人中心（檢視自己的文章、更新個人資料）

**後台管理功能：**
- 管理員登入
- 使用者管理（封禁/解封）
- 文章管理（刪除/置頂）
- 留言管理
- 系統統計

**技術棧：**
- 後端：Node.js + Express + SQLite
- 前端：React + React Router + Axios
- 認證：JWT Token
- 樣式：Tailwind CSS

### 準備工作

首先安裝 Ralph Wiggum 外掛：

```bash
claude /plugins:add ralph-wiggum
```

### 啟動 Ralph Loop

現在啟動 Ralph Loop 來建置整個專案：

```bash
/ralph-wiggum:ralph-loop "
請使用 TDD 從零開始建置一個完整的 BBS 論壇系統。

專案結構要求：
- backend/ 目錄：Express API 伺服器
- frontend/ 目錄：React 前端應用程式
- 兩個目錄都有自己的測試

後端要求：
- 使用 Express 框架
- SQLite 儲存（better-sqlite3）
- JWT 認證（jsonwebtoken + bcrypt）
- 使用者表：id、username、password、email、role、createdAt
- 文章表：id、title、content、authorId、category、pinned、createdAt
- 留言表：id、content、postId、authorId、createdAt

後端 API 端點：
- POST /api/auth/register - 使用者註冊
- POST /api/auth/login - 使用者登入
- GET /api/posts - 取得文章列表（分頁 + 分類篩選）
- GET /api/posts/:id - 取得文章詳情
- POST /api/posts - 建立文章（需要認證）
- PUT /api/posts/:id - 編輯文章（作者或管理員）
- DELETE /api/posts/:id - 刪除文章（作者或管理員）
- POST /api/posts/:id/comments - 新增留言（需要認證）
- GET /api/user/profile - 取得個人資料（需要認證）
- PUT /api/user/profile - 更新個人資料（需要認證）
- GET /api/admin/stats - 管理員統計（僅管理員）
- GET /api/admin/users - 使用者列表（僅管理員）
- PUT /api/admin/users/:id/ban - 封禁使用者（僅管理員）

前端頁面要求：
- /login - 登入頁面
- /register - 註冊頁面
- / - 首頁（文章列表）
- /post/:id - 文章詳情
- /new - 發佈文章
- /profile - 個人中心
- /admin - 管理後台（需要管理員權限）

管理後台功能：
- 使用者管理（檢視、封禁、解封）
- 文章管理（檢視、刪除、置頂）
- 留言管理（檢視、刪除）
- 系統統計（使用者數、文章數、留言數）

TDD 要求：
- 先寫測試，再實作
- 每個功能都必須有對應的測試
- 後端使用 Jest，API 測試覆蓋所有端點
- 前端使用 Vitest，元件測試覆蓋主要功能
- 認證中介軟體必須有測試

驗收標準：
- npm test（後端）通過
- npm test（前端）通過
- 前端正確啟動並運行
- 後端 API 正確回應
- 一般使用者和管理員之間有適當的權限隔離
- 程式碼通過 ESLint 檢查

完成後輸出：<promise>BBS_SYSTEM_COMPLETE</promise>
" --max-iterations 150 --completion-promise "BBS_SYSTEM_COMPLETE"
```

### 預計時間

根據複雜度：

**如果手動編碼**：大約 40-60 小時（包括資料庫設計、認證系統、前後端整合和測試）

**使用 Ralph Loop**：
- 基礎版本（核心功能）：約 3-5 小時
- 完整版本（後台管理 + 測試）：約 6-10 小時

### 監控進度

在 Ralph Loop 運行時，你可以透過幾種方式監控進度：

**迭代次數**：Ralph 會顯示當前和最大迭代次數，這有助於估計剩餘時間。

**日誌**：你可以看到 Claude 目前正在做什麼，例如設計資料庫結構、撰寫 API、建置元件和修復 bug。

**測試狀態**：每次測試運行的結果都會顯示。通過的測試越來越多，失敗的測試越來越少。當失敗數開始下降時，專案就接近完成了。

### 完成後的驗證

Ralph 輸出完成標記後，進行手動驗證：

```bash
# 後端測試
cd backend
npm test

# 前端測試
cd frontend
npm test

# 啟動後端
cd backend
npm start

# 啟動前端（在另一個終端機中）
cd frontend
npm run dev
```

開啟瀏覽器並測試：

1. 註冊一個新使用者
2. 登入
3. 瀏覽文章
4. 發佈新文章
5. 新增留言
6. 開啟個人中心
7. 登出並以管理員身份登入（預設帳號：admin/admin123）
8. 測試後台管理功能

### 注意事項

Ralph Loop 很強大，但請記住以下幾點：

**第一，提示詞越詳細，結果越好。** 模糊的提示詞需要更多迭代來修正。

**第二，設定合理的迭代上限。** BBS 系統很複雜；建議至少 100 次迭代。

**第三，推薦使用 TDD。** 先寫測試可以大幅減少除錯時間。

**第四，最後必須進行手動驗證。** AI 可能遺漏邊界情況或特殊場景，特別是在安全敏感的路徑上。

**第五，密切關注資料庫設計。** Ralph 可能需要幾次迭代才能得出穩健的資料庫結構。

---

## 方法比較和選擇

每種方法都有自己的特點，適合不同的場景。

While True 迴圈最簡單：只需要 5 行就能運行，適合快速實驗和原型。但它的能力有限，無法偵測真正的完成，只依賴迭代上限。

Ralph Wiggum 是大多數場景的一般推薦。它有完整的 Stop Hook 機制、支援完成標記檢查、有官方支援和完善的文件。

增強版 Ralph 更適合生產環境，有雙重退出條件、速率限制和智慧斷路器。

背景任務適用於簡單的非阻塞執行：只需按 `Ctrl+B`。但它只是背景執行，不是迭代迴圈編排。

---

## 總結

讓 Claude Code 長時間工作的核心思想很簡單：不要要求它「一次完成」，而是要求它「持續嘗試直到真正完成」。

所有方法基本上都在做同一件事：給 Claude 一個任務，讓它運行，檢查完成是否為真，如果不是，就繼續下一輪。

選擇哪種方法取決於你的需求。

如果你想要簡單快速，使用 While True 迴圈。5 行就能運行，但功能有限。

如果你想要一般推薦，使用 Ralph Wiggum。官方支援，功能完整，適合大多數場景。

如果是生產用途，使用增強版 Ralph。它有額外的安全機制，更可靠。

（關於 Agent Teams 多代理協作，請見下一節：「3.3 Agent Teams 多代理協作」。）

希望本章能幫助你更有效地使用 Claude Code，讓 AI 成為真正的生產力工具，而不僅僅是一個聊天機器人。

---

## 參考資料

### 官方資源

- [Claude Code 官方文件](https://docs.anthropic.com/en/docs/claude-code) - 完整的官方 Claude Code 文件
- [Ralph Wiggum 外掛 README](https://github.com/anthropics/claude-plugins-official/tree/main/plugins/ralph-wiggum) - 官方外掛文件
- [Claude Code Hooks](https://docs.anthropic.com/en/docs/claude-code/configuration/hooks) - 官方 Hooks 系統文件

### 社群專案

- [frankbria/ralph-claude-code](https://github.com/frankbria/ralph-claude-code)（2.1k Stars）- 增強版 Ralph 實現，附帶額外安全機制
- [Awesome Ralph](https://github.com/snwfdhmp/awesome-ralph) - 精選的 Ralph 資源和範例
- [Ralph Ryan](https://github.com/wquguru/ralph-ryan) - PRD 生成 + Ralph 迴圈整合
- [snarktank/ralph](https://github.com/snarktank/ralph) - 原始 Ralph 實現

### 文章和教學

**英文資源**

- [Geoffrey Huntley - Ralph Technique](https://ghuntley.com/ralph/) - 創造者的原始 Ralph 概念
- [Effective Framework Practices for Reliable Long-Running AI Agents](https://m.blog.csdn.net/weixin_48708052/article/details/158044721) - Anthropic 工程部落格深度解讀
- [Complete Claude Code Guide](https://developer.aliyun.com/article/1705912) - 完整使用指南

**中文教學**

- [入門友善教學 - CSDN](https://m.blog.csdn.net/zsr154278963/article/details/156637281) - 詳細的安裝和使用指南
- [深度解析 - 頭條](https://m.toutiao.com/a7585579989207188006/) - 機制和核心原理
- [全端白話指南](https://www.jdon.com/90167-ralph-wigum-loop-explained-for-teens.html) - 從原理到實踐的完整走讀
- [入門與實戰指南 - 園區](https://www.cnblogs.com/buwai/p/19625356) - 基礎和實戰範例
- [Ralph Loop 深度解析 - CSDN](https://m.blog.csdn.net/roamingcode/article/details/156732443) - Stop Hook 機制詳解
- [Claude Code 永動引擎 - CSDN](https://m.blog.csdn.net/qq_44866828/article/details/156736656) - 無限迴圈迭代外掛深度解讀
- [Ralph Loop 新手入門 - 園區](https://www.cnblogs.com/gyc567/p/19495639) - 最佳實踐和提示詞彙整

### 實戰案例研究

- [CURSED 程式語言](https://github.com/geoffreyhuntley/cursed) - 使用 Ralph 花了 3 個月建置的完整程式語言
- [Boris Cherny 的 30 天](https://twitter.com/boriskirov/status/1756002385683786616) - 259 個 PR 案例分享
- [Y Combinator 黑客松](https://github.com/geoffreyhuntley/ralph) - 一夜生成 6 個專案的案例
- [Geoffrey Huntley 的部落格](https://ghuntley.com/) - 創造者的技術部落格
