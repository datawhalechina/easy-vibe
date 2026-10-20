# CLI AI 程式設計工具

在本教程中，我們將介紹直接在命令行中運行的 AI 程式設計 Agent。它們和之前學過的 Trae、Cursor 中的 Agent 不同，CLI AI 程式設計工具只能在終端中使用。與集成在 AI IDE 裡的 Agent 相比，它們通常具有更長的上下文窗口、更快的工具調用速度，並且可以兼容更多種類的大模型。在最新的 AI Vibe Coding 實戰中，我們往往會優先使用 CLI AI 程式設計工具，而不是 IDE 內置的編碼 Agent。

## 從 CLI 說起

還記得我們之前介紹過的 CLI 嗎？CLI 指的是通過終端或命令提示符，用純文本命令來操作軟體應用，而不是依賴圖形界面（GUI——你可以簡單理解為電腦或手機上帶按鈕、可以點擊操作的界面，不需要輸入命令）。

> 在 Windows 上，常見的終端有“命令提示符（cmd）”和 “PowerShell”。你可以在電腦的運行/搜索框中輸入 “cmd” 或 “powershell” 來啟動這些命令行程序。

![](/zh-cn/stage-2/backend/modern-cli/images/image1.png)![](/zh-cn/stage-2/backend/modern-cli/images/image2.png)

CLI 天生適合文本命令操作，在一小部分極客（追求極致的程式設計愛好者）群體中，CLI 甚至比 GUI 更受歡迎——他們希望所有操作都通過鍵盤完成，覺得動鼠標反而會拖慢自己的編碼效率。

在工業界，CLI 往往也是最常見的接口形式，因為 GUI 需要操作系統額外繪製界面、管理窗口，對計算機資源的要求更高；而 CLI 只需要把收到的命令傳給系統執行即可。因此，在連接大規模服務器集群時，我們通常只通過 CLI 進行交互。

![](/zh-cn/stage-2/backend/modern-cli/images/image3.png)

對於許多沒有 CLI 經驗的同學來說，可能會覺得 CLI 操作很複雜、命令太多，甚至擔心“一不小心就把電腦搞壞”。不用擔心。還記得我們在前面教程裡，經常讓 Trae 幫忙完成各種基礎操作嗎？這裡也可以完全照搬這個思路——我們可以讓 CLI 程式設計工具幫我們執行所有 CLI 操作：讓它幫你進入指定文件夾、搜索和處理文件、運行或複製開源項目等。整個過程都可以通過和 CLI AI 程式設計工具的對話來完成。

## 和 AI IDE 有什麼不同

我們可以把 CLI AI 程式設計工具類比成之前學過的 z.ai 和 Trae。某種意義上，CLI AI 程式設計工具可以看成是一種特殊的 z.ai：它們同樣只需要一個簡單的對話入口，就會自動為你執行所有需要的操作（只是有時你需要手動打開瀏覽器查看最終效果）。而如果類比 AI IDE，那麼 CLI AI 程式設計工具可以被看作是 IDE 中的 Agent 模塊——也就是側邊那塊對話區域。

![](/zh-cn/stage-2/backend/modern-cli/images/image4.png)![](/zh-cn/stage-2/backend/modern-cli/images/image5.png)

不過，由於不同 AI IDE 對 Agent 的實現方式不同，能力差異也很大，AI 程式設計效果經常不穩定，因此 CLI AI 程式設計工具通常由大型科技公司直接開發，例如 Claude 背後的 Anthropic、ChatGPT 背後的 OpenAI 等。

相比其他 AI 程式設計 Agent，直接使用這些大廠產品往往是較優的實踐，尤其是 Claude Code 本身就是為 Anthropic 內部研發團隊服務的工具，從一開始就圍繞“滿足工程師真實需求”來設計。

為了更直觀地對比，我們可以簡單看看 Claude Code 和某款 AI IDE Agent 的差異（這裡以 Cursor 為例）：

| 功能特性          | Claude Code   | Cursor          | 更優者      |
| ----------------- | ------------- | --------------- | ----------- |
| 自動任務執行      | ✅ 非常強     | ❌ 能力有限     | Claude Code |
| IDE 集成          | ❌ 僅命令行   | ✅ 原生 VS Code | Cursor      |
| 實時程式碼補全      | ❌ 無         | ✅ 體驗極佳     | Cursor      |
| 多文件操作        | ✅ 非常強     | ⚠️ 還不錯       | Claude Code |
| GitHub 一體化操作 | ✅ 可直接提交 | ⚠️ 需要手動操作 | Claude Code |
| 學習成本          | ⚠️ 中等       | ✅ 上手簡單     | Cursor      |
| 上下文長度        | ✅ 非常長     | ⚠️ 較好         | Claude Code |
| 調試輔助          | ✅ 自動化     | ⚠️ 較多需手動   | Claude Code |

表格來源：<https://northflank.com/blog/claude-code-vs-cursor-comparison>

簡單說，CLI AI 程式設計工具通常可以：

- 支持更長時間的連續對話（甚至可以幫你“工作一整天”）。
- 提供更長的上下文窗口（不再頻繁需要你說“繼續”）。
- 響應速度更快（可以接入更多自定義模型 API）。

在編碼相關操作上，它們通常比大部分 IDE 內置 Agent 更聰明、更穩定。

## 常見的 CLI AI 程式設計工具

目前雖然有很多開源實現，但在實踐中我們只推薦兩大類型的 CLI AI 程式設計工具，作為“首選組合”。你可以根據自己的習慣任選其一，強烈建議都試一試，再選出最適合你的那一個。

- Codex 使用 GPT-5，在整體能力上更強；
- Claude Code 通過 GLM 4.6 轉發 API，整體體驗接近 Claude 4，但價格更便宜。
- OpenCode 可以隨意切換並搭配模型, 提供免費模型, 可以更好的控制成本。

不過，哪一個在實際項目中更好用，只能通過親自測試來判斷。掌握多種 AI 程式設計工具始終是有益的：熟練以後，你可以在不同場景下靈活切換 Claude Code、Codex 或 Trae。如果嘗試多次後發現某個工具效果一般，可以直接換一個工具或模型繼續試驗。

同時，由於模型版本更新非常迅速，建議你優先選擇在“性價比（效果 / 成本）”上表現最好的方案。

### Claude Code

Claude Code 是由 Anthropic 基於 Claude 大模型能力開發的一款 AI 程式設計工具。它的主要交互場景在終端，同時也支持作為 VS Code 插件來使用。類似於 AI IDE 中的 Agent，它可以深度理解開發者的程式碼倉庫，並通過自然語言指令完成端到端的開發任務——包括程式碼編輯、修復 Bug、執行和修復測試、管理 Git 工作流（例如解決合併衝突、創建 PR）、複雜程式碼講解、執行終端命令等。

![](/zh-cn/stage-2/backend/modern-cli/images/image6.png)

Claude Code 的優勢主要體現在：極長的上下文窗口（可以處理完整文件甚至小型項目）、可以主動澄清模糊需求、自動規劃和分配執行任務，以及對整個程式碼庫內容的深度理解和解釋能力。與普通 IDE Agent 相比，它更適合“沉浸式 vibe coding” 的開發流程。

在實際使用中，你可以通過對話指令，讓它幫你創建新項目、執行 CLI 操作（例如整理文件夾、批量重命名文件、部署開源項目等）、配置開發環境（例如安裝和調試 Python 環境）。如果覺得某段程式碼難以理解、某個目錄結構不清晰，也可以直接讓 Claude Code 生成結構化的分析文檔，或者對特定內容進行分步驟講解。

![](/zh-cn/stage-2/backend/modern-cli/images/image7.png)![](/zh-cn/stage-2/backend/modern-cli/images/image8.png)

![](/zh-cn/stage-2/backend/modern-cli/images/image9.png)![](/zh-cn/stage-2/backend/modern-cli/images/image10.png)

如果你想系統地學習 Claude Code，可以參考 Andrew Ng 與 Anthropic 聯合推出的課程：  
<https://www.bilibili.com/video/BV176t2zSEpr>

接下來，我們將學習如何使用 Claude Code。由於直接使用官方 Claude Code 的成本往往非常高（如下圖所示），我們會轉而使用兼容 Claude Code 協議、但基於其他大模型的 API 平臺。

![](/zh-cn/stage-2/backend/modern-cli/images/image11.png)

你需要學習下面幾種不同方案（最好都嘗試一遍），最後選擇最適合你的那一種作為主要實踐路徑。

第一種方式是直接使用“兼容 Anthropic 接口”的 API。隨著 Claude Code 的流行，越來越多的大模型服務商開始支持 Anthropic 風格的調用方式。常見的服務商包括 GLM、Kimi、DeepSeek 和 Siliconflow 等，它們都提供了兼容的 API 接口。關於具體配置，我們會在後文細講。

需要注意的是，Claude Code 通常會消耗大量 token，如果你擔心 API 調用產生過高費用，可以考慮購買 GLM 的月度套餐（大約 20 元/月）來控制成本。如果你想先感受一下實際花費，也可以先充值 10 元做小規模試驗。

另一種方式是使用 “Claude Code Route” 項目。它是一個開源工具，不僅支持所有常見的 API 調用接口，還允許你針對不同場景精細配置要使用的模型，並且支持對接本地部署的大模型。但由於這一方案的配置相對複雜，建議你先從第一種方案入手。

#### 使用智譜 GLM 作為後端（推薦）

GLM（General Language Model）是智譜 AI 自主研發的一系列大型語言模型。GLM-4.6 是當前 GLM 系列的最新版本，其核心亮點是在程式碼能力上的優異表現（在公開基準和真實任務中對標 Claude Sonnet 4，在國內處於第一梯隊）。

![](/zh-cn/stage-2/backend/modern-cli/images/image12.png)

它還將上下文窗口擴展到 200K，可以更加從容地處理長文本和大體量程式碼，同時加強了推理與工具調用能力，在性能和成本之間取得了不錯的平衡。

![](/zh-cn/stage-2/backend/modern-cli/images/image13.png)

在接入 GLM 之前，我們需要先安裝 Claude Code。

如果你覺得命令行安裝步驟麻煩，或者中途出現錯誤，可以直接讓 Trae 的 Agent 幫你完成安裝。

```python
# 安裝 Claude Code
npm install -g @anthropic-ai/claude-code

# 進入你的項目
cd your-awesome-project

# 啟動 Claude Code
claude

# 按 Ctrl+C 退出 Claude
```

接下來，我們需要修改 Claude Code 的默認 API 請求地址，使其支持 GLM 的 API 服務。你可以直接複製下面的內容，讓 Trae 幫你創建對應的環境變量；也可以選擇把它們永久寫入系統環境變量（如果出現問題，同樣可以讓 Agent 幫忙修改）。

首先，你需要先獲取 GLM 的 API Key，並用你自己覺得最方便的方式保存好。

國內版地址：<https://bigmodel.cn/usercenter/proj-mgmt/apikeys>  
國際版地址：<https://z.ai/manage-apikey/apikey-list>

如果你使用的是 **國內版 GLM**，請使用以下變量配置：

```python
# 在 Cmd 中運行以下命令
# 注意將 `your_zhipu_api_key` 替換為你剛剛獲取到的 API Key
setx ANTHROPIC_AUTH_TOKEN your_zhipu_api_key
setx ANTHROPIC_BASE_URL https://open.bigmodel.cn/api/anthropic
```

如果你使用的是 **國際版 GLM**，請使用下面的配置：

```python
# 在 Cmd 中運行以下命令
# 同樣注意替換掉 `your_zai_api_key`
setx ANTHROPIC_AUTH_TOKEN your_zai_api_key
setx ANTHROPIC_BASE_URL https://api.z.ai/api/anthropic
```

你可以直接在 Trae 中輸入類似下面的提示詞：

⚠️ 如果你是通過 Trae 幫你配置“永久環境變量”，那麼配置完成後 **必須重啟 Trae**，否則它內置終端裡的環境變量不會更新，可能導致登錄失敗或網路連接錯誤。

```python
Based on my environment variable settings:
setx ANTHROPIC_AUTH_TOKEN your_zai_api_key
setx ANTHROPIC_BASE_URL https://api.z.ai/api/anthropic

and my key(Replace it with your own key):
681fea485851d29060cc.13gfaendggaFOhb

please help me configure and start Claude Code
```

你會看到類似下面的過程輸出：

![](/zh-cn/stage-2/backend/modern-cli/images/image14.png)

> 💡 什麼是環境變量？
>
> 環境變量本質上是一組存儲在操作系統中的“鍵值對”配置資訊，通常以 “變量名 = 具體值” 的形式存在。只要提前在終端或系統設置中配置好，程序就可以隨時讀取這些變量來獲取相關資訊。由於環境變量可以直接在終端中寫入，而無需修改程式碼本身，我們通常會把訪問大模型所需的密鑰存放在環境變量裡，以避免洩露。程序只需要讀取對應環境變量，就能完成大模型調用。
>
> 在 Windows 系統中，環境變量除了用於存儲大模型的訪問密鑰，還常常用來保存命令行工具的“調用路徑”。
>
> 我們知道終端本身也是一個程序。有時我們希望在終端裡啟動某個外部程序，例如在終端中輸入 `claude` 來啟動 Claude Code。之所以可以直接輸入 `claude` 就運行，是因為終端會讀取系統的環境變量，其中的 PATH 變量裡包含了 Claude Code 可執行文件所在的目錄，所以終端能夠找到並執行它（等價於在終端中粘貼那段程序的絕對路徑再按回車）。
>
> 一個典型的環境變量可能長這樣：`PATH=C:\Windows\system32;C:\Program Files\Python`。這樣我們就可以在任何路徑下執行系統中的這些程序，例如直接在命令行鍵入 `python` 啟動 Python 解釋器。
>
> 如果你想查看系統當前的環境變量，可以在 Windows 搜索中輸入“環境變量”，在彈出的“編輯系統環境變量”窗口中就能看到所有變量及其值。有的變量用於存儲大模型密鑰，有的則用於添加程序目錄，方便在任意路徑下調用。

現在，你就可以使用最新的 GLM 來進行 Claude Code 開發了。你可以嘗試重新跑一遍之前的項目，或者重新挑戰那些 Trae 沒有完成好的任務，對比看看體驗上的差異。

🎉 反覆“推倒重來”並不是浪費時間——你每重做一遍，技能都會更紮實一分。

用和 GLM 完全相同的思路，也可以輕鬆接入其他支持 Anthropic 兼容格式的接口。

#### 使用 Kimi K2 作為後端（推薦）

Kimi K2 是月之暗面（Moonshot AI）推出的新一代大語言模型，在程式碼理解和生成能力上表現出色。Kimi K2 支持超長上下文窗口（最高可達 200K tokens），能夠輕鬆處理大型程式碼庫和複雜項目。

**核心優勢：**

- **超長上下文**：支持 200K 上下文窗口，可以一次性處理整個項目的程式碼
- **程式碼能力強**：在程式碼生成、重構和調試方面表現優異
- **中文理解好**：對中文程式設計需求的理解更加準確
- **工具調用穩定**：支持穩定的函數調用和工具使用

**獲取 API Key：**

訪問 <https://platform.moonshot.cn/console/account> 註冊並獲取 API Key。

**配置方法：**

參考文檔：<https://platform.moonshot.cn/docs/guide/agent-support>

```bash
export ANTHROPIC_BASE_URL=https://api.moonshot.cn/anthropic
export ANTHROPIC_AUTH_TOKEN=sk-YOURKEY
```

#### 使用 Minimax 作為後端（推薦）

Minimax 是稀宇科技（MiniMax）推出的新一代大語言模型，在程式設計任務上表現優異。Minimax 模型以其出色的推理能力和程式碼生成質量而聞名，特別適合複雜的程式設計場景。

**核心優勢：**

- **推理能力強**：在複雜邏輯推理和程式碼架構設計方面表現出色
- **程式碼質量高**：生成的程式碼結構清晰、可讀性好
- **多語言支持**：支持多種程式設計語言的程式碼生成和轉換
- **響應速度快**：API 響應速度快，適合高頻調用場景

**獲取 API Key：**

訪問 <https://platform.minimax.io/> 註冊並獲取 API Key。

**配置方法：**

```bash
export ANTHROPIC_BASE_URL=https://api.minimax.io/anthropic
export ANTHROPIC_AUTH_TOKEN=YOUR_MINIMAX_API_KEY
export ANTHROPIC_MODEL=MiniMax-M3.1-Flash
```

Use `MiniMax-M3.1-Flash` for new configurations, or set `ANTHROPIC_MODEL=MiniMax-M3` explicitly. Keep any intentionally saved legacy or custom model ID. These are direct API model IDs; check your account's access before using a subscription plan. Flash requires adaptive thinking: do not disable thinking or set effort to `none`. See the [MiniMax API compatibility reference](https://platform.minimax.io/docs/api-reference/text-anthropic-api).

#### 使用 DeepSeek 作為後端（推薦）

DeepSeek 是深度求索推出的開源大語言模型，以其出色的程式碼能力和高性價比受到開發者歡迎。DeepSeek Coder 專門針對程式設計任務進行了優化訓練。

**核心優勢：**

- **程式碼能力突出**：在程式碼生成、程式碼理解和 Bug 修復方面表現優異
- **開源可定製**：模型開源，可以根據需求進行微調
- **性價比高**：API 價格相對較低，適合高頻使用
- **中文支持好**：對中文程式設計場景理解準確

**獲取 API Key：**

訪問 <https://platform.deepseek.com/usage> 註冊並獲取 API Key。

**配置方法：**

```bash
export ANTHROPIC_BASE_URL=https://api.deepseek.com/anthropic
export ANTHROPIC_AUTH_TOKEN=YOU_DEEPSEEK_API_KEY
export API_TIMEOUT_MS=600000
export ANTHROPIC_MODEL=deepseek-chat
export ANTHROPIC_SMALL_FAST_MODEL=deepseek-chat
export CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC=1
```

#### 使用火山引擎 Coding Plan 作為後端（推薦）

火山引擎（Volcano Engine）是字節跳動旗下的雲服務平臺，提供企業級的 AI 模型服務。火山引擎的 Coding Plan 專門為程式設計場景優化，提供穩定、高效的程式碼生成能力。

**核心優勢：**

- **企業級穩定性**：提供服務等級協議（SLA），保障服務穩定性
- **程式碼場景優化**：針對程式設計任務進行了專門優化
- **豐富模型選擇**：支持多種模型，包括 Doubao-pro、Doubao-lite 等
- **國內訪問快**：國內節點部署，訪問速度快

**獲取 API Key：**

訪問 <https://console.volcengine.com/ark/region:ark+cn-beijing/apiKey> 註冊並獲取 API Key。

**配置方法：**

```bash
export ANTHROPIC_BASE_URL=https://ark.volces.com/api/anthropic
export ANTHROPIC_AUTH_TOKEN=YOUR_VOLCANO_API_KEY
export ANTHROPIC_MODEL=doubao-pro-32k
```

#### 其他兼容 Anthropic 的 API

Siliconflow：

```bash
export ANTHROPIC_BASE_URL="https://api.siliconflow.cn/"
export ANTHROPIC_MODEL="moonshotai/Kimi-K2-Instruct-0905"    # 可以自行修改所需模型
export ANTHROPIC_API_KEY="YOUR_SILICONCLOUD_API_KEY"    # 請替換 API Key
```

阿里雲 DashScope（Aliyuncs）：<https://help.aliyun.com/zh/model-studio/get-api-key>

```python
export ANTHROPIC_BASE_URL="https://dashscope.aliyuncs.com/apps/anthropic"
export ANTHROPIC_API_KEY="YOUR_DASHSCOPE_API_KEY"
```

::: details 使用 Claude Code Route 作為後端（進階用法）

上面我們講解了如何用 GLM 官方 API 替換 Claude Code 的 Anthropic 接口。接下來，我們來看一下 Claude Code Router 這個工具是如何讓 Claude Code 適配更多模型 API 的。

[Claude Code Router](https://github.com/musistudio/claude-code-router) 是一款專門為 Claude Code 設計的智能路由增強工具。它的核心作用，是幫助用戶按需將 AI 請求分發到不同平臺上的模型，並可以高度自定義。它支持接入幾十個平臺，包括 OpenRouter、DeepSeek、Ollama、Gemini 等，也可以按場景將任務路由到特定模型，比如 GLM-4.5、Kimi-K2、Qwen3-Coder 等。舉例來說，你可以將後臺任務自動交給本地 Ollama，以節省成本；將長文本 / 長程式碼任務交給 Gemini-2.5-Pro；把程式碼講解交給 DeepSeek。

![](/zh-cn/stage-2/backend/modern-cli/images/image16.png)

該工具還提供了方便的 UI/CLI 配置管理能力，並通過"轉換器（converter）"適配不同平臺的 API 格式。它支持 GitHub Actions 等自動化集成以及自定義擴展，解決了"單一模型無法覆蓋所有場景"以及"頻繁切換平臺很麻煩"的問題，幫助用戶更靈活、低成本地利用 AI 工具。

![](/zh-cn/stage-2/backend/modern-cli/images/image17.png)

下面我們簡單介紹如何安裝 Claude Code Router。大致需要以下步驟（同樣可以讓 Trae 幫你執行），以準備好相關環境：

```markdown
npm install -g @anthropic-ai/claude-code
npm install -g @musistudio/claude-code-router
```

安裝完成後，你需要確認本地可以使用 `ccr` 命令。如果看到類似下面的輸出，說明安裝成功：

![](/zh-cn/stage-2/backend/modern-cli/images/image18.png)

接下來，有兩種方式來初始化和配置模型：

- 使用 CCR 自帶的 UI，在瀏覽器中打開它提供的配置頁面進行操作；
- 直接修改 CCR 的默認配置文件（本質上 UI 也是在修改配置文件，只是提供了更直觀的界面）。

如果選擇使用 CCR UI，你會看到類似下面的界面：

![](/zh-cn/stage-2/backend/modern-cli/images/image19.png)

此時點擊 "Add Provider" 按鈕，就會看到如下界面。你需要：

1. 在 Name 中輸入模型提供商的名字；
2. 在 API Full URL 中填寫該提供商的 OpenAI 兼容接口地址；
3. 在 API Key 中填寫對應平臺的 API Key；
4. 在 Models 區域中填寫模型名稱，點擊 "Add Model" 添加；
5. 最後點擊 "Save" 保存配置。

（界面往下滾動還有很多高級選項，但目前你可以先忽略它們。）

![](/zh-cn/stage-2/backend/modern-cli/images/image20.png)

下面是 DeepSeek 與 Kimi 的配置示例：

![](/zh-cn/stage-2/backend/modern-cli/images/image21.png)

![](/zh-cn/stage-2/backend/modern-cli/images/image22.png)

保存模型配置後，還需要在右側 Router 區域中指定默認模型（Default）。點擊對應的下拉選擇，將其設置為 `kimi`（推薦），然後在右上角點擊 `Save and Restart`。

![](/zh-cn/stage-2/backend/modern-cli/images/image23.png)

之後，只需在終端中輸入 `ccr code`，即可通過 Claude Code Router 啟動 Claude Code 的編碼工作流。

![](/zh-cn/stage-2/backend/modern-cli/images/image24.png)

:::

#### Claude Code 的進階用法

很多人最開始使用 Claude Code 時，只把它當成普通對話工具來用。但實際上，它內置了很多豐富的能力，能夠讓你使用起來更高效、靈活。下面是一些常見命令和用法示例：

參考文檔：

<https://docs.claude.com/en/docs/claude-code/cli-reference>  
<https://docs.claude.com/en/docs/claude-code/slash-commands>

| 命令              | 作用                                      | 示例                                     |
| ----------------- | ----------------------------------------- | ---------------------------------------- |
| claude            | 啟動交互模式                              | `claude`                                 |
| claude "query"    | 執行一次性任務並輸出結果                  | `claude "explain this project"`          |
| claude -p "query" | 執行一次性問題並在結束後自動退出          | `claude -p "explain this function xxxx"` |
| claude -c         | 繼續最近的一次會話                        | `claude -c`                              |
| claude -r         | 恢復上一段會話                            | `claude -r`                              |
| /resume           | 在當前聊天中切換回上一段會話              | `claude -c`、`/resume`                   |
| /plugin           | 管理插件，可安裝提交與審查類擴展能力     | `/plugin`                                |
| /init             | 用 CLAUDE.md 初始化項目說明               | `/init`                                  |
| /clear            | 清空當前會話上下文，防止資訊過載          | `/clear`                                 |
| /compact          | 壓縮會話歷史，減少上下文 token 佔用       | `/compact`                               |
| /cost             | 查看當前消費情況                          | `/cost`                                  |
| /model            | 切換使用的模型（用兼容 API 時一般可忽略） | `/model`                                 |
| /memory           | 管理 CLAUDE.md 記憶文件                   |                                          |
| /help             | 顯示可用命令列表                          | `/help`                                  |
| exit or Ctrl+C    | 退出 Claude Code                          | `exit` 或 `Ctrl+C`                       |
| /agents           | 高級功能，後文會說明                      |                                          |
| /mcp              | 高級功能，後文會說明                      |                                          |

**CLAUDE.md**

參考： <https://www.anthropic.com/engineering/claude-code-best-practices>

`CLAUDE.md` 是 Claude 在開始對話時會自動讀取並加入上下文的特殊文件。因此，它非常適合用來記錄：

- 常用 bash 命令
- 核心文件和工具函數
- 程式碼風格約定
- 測試方式說明
- 倉庫協作規範（例如分支命名、是用 merge 還是 rebase 等）
- 開發環境配置說明（例如是否使用 pyenv、推薦哪種編譯器等）
- 項目中需要特別注意的行為或坑點
- 任何你希望 Claude “記住”的資訊

`CLAUDE.md` 本身沒有強制格式要求，只要簡潔、便於人類閱讀即可。例如：

```
# Bash commands
- npm run build: Build the project
- npm run typecheck: Run the typechecker

# Code style
- Use ES modules (import/export) syntax, not CommonJS (require)
- Destructure imports when possible (eg. import { foo } from 'bar')

# Workflow
- Be sure to typecheck when you’re done making a series of code changes
- Prefer running single tests, and not the whole test suite, for performance
```

#### Claude Code 的內部原理

參考： <https://github.com/shareAI-lab/analysis_claude_code>

如果你好奇為什麼 Claude Code 在很多場景下比 Trae 或 Cursor 等 Agent 程式設計工具更好用，我們可以簡單看一下它的內部工作機制。

其他 CLI AI 程式設計工具的整體實現方式也大體類似。

![](/zh-cn/stage-2/backend/modern-cli/images/image25.png)

Claude Code 會把程式設計任務拆解成一個持續的“感知—思考—行動—驗證”循環，並在其中調用不同工具完成任務。它模仿人類開發者的工作流：不斷“寫程式碼 → 運行 → 看結果 → 再改進”。系統內部通過一個主任務循環不斷執行步驟，在每一輪循環中，Claude 都可以調用不同工具——例如讀寫文件、執行命令、搜索程式碼等——再根據工具返回的真實結果決定下一步行動。

其中有幾個關鍵特性值得注意：

- **流式處理（Stream Processing）**：Claude 可以一邊思考一邊輸出結果，而不是必須等所有程式碼寫完再執行。
- **智能壓縮（Intelligent Compression）**：長對話容易導致上下文過長，Claude 通過將歷史壓縮成關鍵資訊來減少“遺忘”的概率，並通過區分長短期記憶保證高效運行。
- **併發控制（Concurrency Control）**：內部並行設計可以讓多個任務同時進行，互不干擾。
- **子 Agent 管理（Sub-agent Management）**：實際工作中並不只相當於一個“角色”處理所有事情，你可以管理多個子 Agent 協作處理程式碼，每個 Agent 負責不同任務，比如專門負責測試、專門負責寫文檔等。

### Codex

![](/zh-cn/stage-2/backend/modern-cli/images/image26.png)

![](/zh-cn/stage-2/backend/modern-cli/images/image27.png)

和 Claude Code 類似，Codex 是由 OpenAI 開發的一款 AI 協作程式設計工具，你可以把它理解成 “OpenAI 版的 Claude Code”。它最大的優勢是對 GPT-5 的高效適配。

從實際體驗來看，GPT-5 目前響應速度更快、犯錯率更低（在多輪複雜任務中正確完成的概率更高）。它的一個缺點是解釋往往偏“學術”和“技術”，有時顯得過於嚴謹、資訊量很大，對初學者來說可能略微難懂。

你可以通過下面的命令安裝 Codex：

```
npm i -g @openai/codex
```

#### 使用 OpenAI 官方 API 作為後端

如果直接使用 OpenAI 官方的 Codex 入口，配置會非常簡單：當你已經開通 OpenAI 訂閱或申請到了相應 API 配額之後，只需要在命令行中輸入 `codex` 啟動程序，並按提示完成登錄即可。

![](/zh-cn/stage-2/backend/modern-cli/images/image28.png)

![](/zh-cn/stage-2/backend/modern-cli/images/image29.png)

#### 使用轉發 OpenAI API 的方式作為後端

由於官方 OPENAI API 可能存在價格較高、網路要求嚴格等問題，為了避免這些限制，我們也可以通過其他 API 網關服務來轉發調用。

在這種方式下，我們只需要在第三方轉發平臺上購買對應的 Codex API 配額，就能獲得接近原生 OpenAI Codex 的使用體驗。

參考： <https://open-dev.feishu.cn/wiki/PAqUwWG4IiuwTvkQ2sGcaQuPnXc>  
充值地址： <https://api.zyai.online/account/topup/recharge>

需要注意的是，在拿到 token 配額後，我們還需要在本地配置好 API Key。

在密鑰分組設置中，要注意選擇專門用於 Codex 的那一項。

![](/zh-cn/stage-2/backend/modern-cli/images/image30.png)

接下來，我們需要把獲取到的 Key 填入下面的提示詞中，並把整段提示詞交給 Trae，讓它幫你完成整個配置過程：

````bash
My API key is: [Paste your obtained sk-xxxxx key here]

Please help me complete the following configuration tasks:

1. Create configuration directory
   - Create a `.codex` folder under my user directory
   - Windows path should be: `C:\Users\[My Username]\.codex`
2. Backup existing configuration (if exists)
   - Check if `.codex\config.toml` exists
   - If it exists, rename it to `config.toml.bak.[current timestamp]` (timestamp format: yyyyMMddHHmmss)
3. Create configuration file
   - Create `config.toml` in the `.codex` directory
   - Write the following complete content:
   ```toml
   preferred_auth_method = "apikey"

   [model_providers.myrelay]
   name = "My Relay Station"
   base_url = "https://api.zyai.online/v1"
   env_key = "MYRELAY_API_KEY"
   wire_api = "responses"
   request_max_retries = 4
   stream_max_retries = 10
   stream_idle_timeout_ms = 300000

   [profiles.myrelay]
   model_provider = "myrelay"
   model = "gpt-5"
   model_reasoning_effort = "medium"

   [tools]
   web_search = true

4. Set system environment variable
Variable name: MYRELAY_API_KEY
Variable value: The key I gave you

5. Confirm completion and report back:

The full path of the configuration file
Whether the environment variable was set successfully
I can use the command `codex --profile myrelay` to run it
````

配置完成後，你就可以通過 `codex --profile myrelay` 啟動使用轉發 API 的 Codex 了。之後的使用方式與 Claude Code 類似：只需要在對話框中隨時輸入你的想法和需求即可。

### OpenCode

![](/zh-cn/stage-2/backend/modern-cli/images/image32.png)

![](/zh-cn/stage-2/backend/modern-cli/images/image33.png)

OpenCode 是一款面向開發者的開源 AI Coding Agent 平臺，定位類似於 “多模型版的 Claude Code”。它以 Terminal 為核心交互入口，同時也支持編輯器集成（如 VS Code、Neovim 等），能夠深度接入本地程式碼倉庫，並通過自然語言完成從程式碼理解到工程執行的一整套開發流程。

它不是綁定單一模型的 AI 程式設計工具，而是一個可自由切換 GPT、Claude、Gemini 乃至本地模型的開放式 AI Coding Agent 平臺。就連 OpenAI 官方也持 OpenCode 接入 Codex / OpenAI 訂閱。

![](/zh-cn/stage-2/backend/modern-cli/images/image34.png)

你可以通過下面的命令安裝 OpenCode:

```bash
# Linux / Unix
curl -fsSL https://opencode.ai/install | bash

# Windows
npm i -g opencode-ai
```

#### 使用 OpenCode 中的免費模型

在 OpenCode 中不定期會提供免費模型可以進行使用, 配置也非常簡單。你可以在你需要使用 OpenCode 的位置在命令行輸入 `opencode` 啟動 Opencode 程序進入聊天面板。輸入 `/models`命令搜索 free 關鍵詞就可以看到帶有 free 字眼的免費模型

![](/zh-cn/stage-2/backend/modern-cli/images/image35.png)

在一般情況下免費模型完成編碼任務會比付費 / 訂閱模型要慢一些，這通常取決於模型線路是否阻塞, 是否編碼高峰期以及模型本身的能力。

#### 使用第三方模型來作為 OpenCode 的主編碼模型

這是 OpenCode 的核心優勢, 它可以在使用同樣的 MCP, Skills, 上下文的情況下允許你自由切換模型來完成不同的編碼任務。下文以 OpenAI 官方的 GPT-5.3 Codex 為例，接入 OpenCode 作為主編碼模型。

在 OpenCode 的聊天窗口中輸入 `/connect` 命令選中第一條最相關指令按下 enter 鍵，就可以進行選擇第三方模型提供商的認證授權。

![](/zh-cn/stage-2/backend/modern-cli/images/image36.png)

這裡以選擇 OpenAI 為例,進行回車選擇認證方式。

![](/zh-cn/stage-2/backend/modern-cli/images/image37.png)

選哪種都可以,只是認證方式不同。這裡選擇第一種進行瀏覽器登錄。

![](/zh-cn/stage-2/backend/modern-cli/images/image38.png)

複製此鏈接到瀏覽器上進行正常的 OpenAI 登錄操作，瀏覽器上出現 Authorization Successful 後 OpenCode 客戶端會自動跳轉至選擇 OpenAI 的模型界面。

![](/zh-cn/stage-2/backend/modern-cli/images/image39.png)

![](/zh-cn/stage-2/backend/modern-cli/images/image40.png)

#### 安裝 Oh My OpenAgent 插件

OpenCode 的強大之處還在於他有非常活躍的社區生態，你可以在 Github 上搜索出非常多與 OpenCode 相關的插件。如果說 OpenCode 是一款可以任意切換模型的 AI 協作工具的話，那麼 Oh-My-OpenAgent 就是一款運行在 OpenCode 之上的 "多 Agent AI 程式設計指揮系統"。它可以將一個複雜任務拆給多個子任務分給不同的模型進行各司其職的工作。

![](/zh-cn/stage-2/backend/modern-cli/images/image41.png)

你可以將以下話術複製之後粘貼給上文在 OpenCode 中配置好的模型進行安裝 OpenCode。

```text
Install and configure oh-my-openagent by following the instructions here:
https://raw.githubusercontent.com/code-yeongyu/oh-my-openagent/refs/heads/dev/docs/guide/installation.md
```

以下是 Oh-My-OpenAgent 的特性以及功能說明。

| 特性 | 功能說明 |
| :-------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **自律軍團 (Discipline Agents)** | Sisyphus 負責調度 Hephaestus、Oracle、Librarian 和 Explore。一支完整的 AI 開發團隊並行工作。 |
| **Team Mode** (v4.0, 選擇性啟用) | 領導 Agent + 最多 8 個並行成員，實時 tmux 可視化，專用 `team_*` 工具家族。驅動 `hyperplan`(5 個敵對評論者) 和 `security-research`(3 個獵手 + 2 個 PoC 工程師)。[文檔 →](docs/guide/team-mode.md) |
| **`ultrawork` / `ulw`** | 一鍵觸發，所有智能體出動。任務完成前絕不罷休。 |
| **[IntentGate 意圖門](https://factory.ai/news/terminal-bench)** | 真正行動前，先分析用戶的真實意圖。徹底告別被字面意思誤導的 AI 廢話。 |
| **基於哈希的編輯工具** | 每次修改都通過 `LINE#ID` 內容哈希驗證、0% 錯誤修改。靈感來自 [oh-my-pi](https://github.com/can1357/oh-my-pi)。[The Harness Problem →](https://blog.can.ac/2026/02/12/the-harness-problem/) |
| **LSP + AST-Grep** | 工作區級別的重命名、構建前診斷、基於 AST 的重寫。為 Agent 提供 IDE 級別的精度。 |
| **後臺智能體** | 同時發射 5+ 個專家並行工作。保持上下文乾淨，隨時獲取成果。 |
| **內置 MCP** | Exa（網路搜索）、Context7（官方文檔）、Grep.app（GitHub 源碼搜索）。默認開啟。 |
| **Ralph Loop / `/ulw-loop`** | 自我引用閉環。達不到 100% 完成度絕不停止。 |
| **Todo 強制執行** | Agent 想要摸魚？系統直接揪著領子拽回來。你的任務，必須完成。 |
| **註釋審查員** | 剔除帶有濃烈 AI 味的冗餘註釋。寫出的程式碼就像老練的高級工程師寫的。 |
| **Tmux 集成** | 完整的交互式終端支持。跑 REPL、用調試器、用 TUI 工具，全都在實時會話中完成。 |
| **Claude Code 兼容** | 你現有的 Hooks、命令、技能、MCP 和插件？全都能無縫遷移過來。 |
| **技能內嵌 MCP** | 技能自帶其所需的 MCP 服務器。按需開啟，不會撐爆你的上下文窗口。 |
| **Prometheus 規劃師** | 動手寫程式碼前，先通過訪談模式做好戰略規劃。 |
| **`/init-deep`** | 在整個項目目錄層級中自動生成 `AGENTS.md`。不僅省 Token，還能大幅提升 Agent 理解力。 |

Sisyphus (claude-opus-4-7 / kimi-k2.6 / glm-5.1) 是你的主指揮官。他負責制定計劃、分配任務給專家團隊，並以極其激進的並行策略推動任務直至完成。他從不半途而廢。

Hephaestus (gpt-5.5) 是你的自主深度工作者。你只需要給他目標，不要給他具體做法。他會自動探索程式碼庫模式，從頭到尾獨立執行任務，絕不會中途要你當保姆。名副其實的正牌工匠。

Prometheus (claude-opus-4-7 / kimi-k2.6 / glm-5.1) 是你的戰略規劃師。他通過訪談模式，在動一行程式碼之前，先通過提問確定範圍並構建詳盡的執行計劃。

瞭解完這些, 你就可以使用裝好 Oh-My-OpenAgent 插件之後的 OpenCode 來完成編碼任務了。

## CLI AI 程式設計工具的更多用法

### 用 AI 寫需求文檔：學會“具體化需求”

對於大語言模型來說，抽象需求需要被“具體化”。比如：“我很餓”是一個抽象需求，我們需要把它變成：“我肚子有點餓，可能需要吃一個紅豆麵包，再配一杯豆漿。”——這才是一種可以被執行的、具體的需求。

但把抽象需求變具體，其實是一個很花精力的過程。如果我們沒有見過足夠多的案例，很難快速聯想到該如何把抽象問題拆解成細緻的模塊。這種時候，最好的辦法就是讓 AI 幫你完成“具體化”這一步。  
比如，我想開發一個“每日計劃”應用，最樸素的想法可能是：

`Please help me write a daily planning app where I can write my plans each day and get reminders.`

AI 確實可以在這個需求基礎上直接拆分任務，然後一步步完成，但中間容易出錯或理解偏差。為了降低風險，我們可以讓 AI 幫我們先擴寫需求：

`Based on my needs, please elaborate and provide a more detailed Product Requirement Document for reference. My idea is: Please help me write a daily planner app that supports daily plan-writing and provides reminders .`

這時，AI 可能會給出類似下面這樣完整的 PRD：

```
Product Requirements Document (PRD): “Today’s Plan” App
Document Version: 1.0
Creation Date: October 27, 2023
Author: (Your Name/Product Manager)

1. Product Introduction
1.1 Product Name
Today's Plan
1.2 Product Vision
“Today’s Plan” is a minimalist and highly efficient daily planning and reminder tool, dedicated to helping users eliminate procrastination and forgetfulness, plan every day clearly, and ensure tasks are carried out through an intelligent reminder system—ultimately enabling users to gain a stronger sense of control and achievement over their time.
1.3 Target Users (User Personas)
We mainly serve three types of users:
Students (Xiao Ming):
Characteristics: Multiple tasks such as courses, assignments, club activities, exam prep, needing organized time arrangement.
Pain Points: Easily forget small tasks or assignment deadlines; feel overwhelmed switching between tasks; want to build regular study and life habits.
Needs: A simple tool to list daily to-dos and provide reminders before class/self-study.
Office Workers (Zhang Wei):
Characteristics: Fast-paced work, many meetings, reports, project milestones, and personal affairs (fitness, picking up children).
Pain Points: Easily forget important meetings or work milestones; get interrupted by urgent tasks and forget the original plan; feel busy but inefficient at end of day.
Needs: Need a tool to quickly record and schedule daily work and send strong reminders at key times (e.g., 15 minutes before meetings).
Freelancers/Self-disciplined Seekers (Li Na):
Characteristics: High freedom of time, but strong self-management required for work output and personal growth.
Pain Points: Easily procrastinate, lack external supervision; start the day without a clear plan, leading to low time utilization.
Needs: Need a tool to help build a daily fixed routine (Morning Routine) and review daily achievements for positive feedback.

2. User Stories
As a user, I want to quickly create today’s plan list so I have an overview of all my tasks for the day.
As a user, I want to set specific start and end times for each task so I can create a visual timeline.
As a user, I want to receive push notification reminders before a task starts so I won’t miss any important arrangements.
As a user, I want to customize the reminder time (such as 5, 15, or 60 minutes in advance) so reminders better fit my habits.
As a user, I want to easily mark completed tasks so I can feel accomplished and clearly see my progress.
As a user, I want to see a summary of my completed plans at the end of each day for reviewing and self-motivation.
As a user, I want to conveniently edit and delete tasks to handle last-minute changes.
As a user, I want to view plans and achievements from previous days to review my efficiency and habits.

3. Feature Breakdown
Core Features (MVP - Minimum Viable Product)
Module 1: Plan Management
3.1.1 Daily Plan Homepage
Interface: “Today” as the core view, current date shown at the top.
View: Timeline list, clearly showing tasks scheduled from morning to evening. Tasks without a time can be listed in the top or bottom “To-do List” section.
Interactions:
Click the “+” button in the bottom right to quickly create a new task.
Pull down to refresh the page.
Swipe left/right to view yesterday’s and tomorrow’s plans.
3.1.2 Create/Edit Task
Entry: Click “+” on the homepage or a time slot in the list.
Fields:
Task title (required): Briefly describe the task, e.g., “10 AM Weekly Product Meeting.”
Task time (optional):
Set “start time” and “end time.”
Provide “all-day” option for unspecified time tasks.
Default time picker should be quick and convenient.
Reminder setting (required, with default value): See Module 2.
Notes (optional): Add further descriptions, links, or location info.
Actions: Save, cancel, delete task.
3.1.3 Task Interaction
Mark as complete: Checkbox before each task; checking adds a strikethrough and gray background, indicating completion. Can unmark if needed.
Edit task: Click the task itself to enter edit page.
Delete task: Swipe left on a task to reveal “Delete” button.
Module 2: Smart Reminder System
3.2.1 Reminder Trigger
Mechanism: Based on task’s set “start time” and the user’s “reminder lead time,” send a push notification from device.
Offline Support: Locally scheduled reminders must trigger even if user is offline.
3.2.2 Reminder Content & Format
Notification title: App name “Today’s Plan.”
Body: “Reminder: [Task Title] will start at [Start Time].” E.g., “Reminder: Product Meeting will start at 10:00.”
Sound: Use system default or offer several simple, effective tones.
3.2.3 Reminder Settings
Global Settings (in Settings page):
User can set a default reminder time, e.g., “15 minutes before task starts.” New tasks adopt this by default.
Single Task Settings (in create/edit page):
Users can override global settings for important tasks, choosing specific reminder times like "on time," "5 minutes early," "30 minutes early," or "1 hour early."
Provide “no reminder” option.
Subsequent Features (V1.1, V2.0)
3.3 Daily Review & Statistics
Push a summary notification at a set time every night (e.g., 22:00): “How was your day? Take a look at your achievements!”
Generate a simple daily report card: shows total planned tasks, completed tasks, completion rate, plus an encouraging message.
3.4 History Review
Calendar view to click on any past day and check its plans and completion status. Days with high completion rates marked with a special color.
3.5 Templates
Allow users to save a successful daily plan as a template, e.g., “Efficient Workday,” “Relaxing Weekend.”
When creating tomorrow’s plan, one-click import a template, modify slightly to save time.
3.6 Themes & Personalization
Offer dark mode.
Allow changing several primary color themes.

4. Non-Functional Requirements
4.1 Performance
Response: App launch time under 2 seconds; adding/editing tasks must be smooth and lag-free.
Resource Use: Low battery and memory consumption in background; do not over-consume resources waiting for reminders.
4.2 Usability
Minimal & intuitive: UI must be minimal, primary functions accessible within 3 clicks. No tutorial needed for new users.
Error tolerance: Offer undo (e.g. brief undo after mistakenly deleting a task).
4.3 Reliability
Reliable reminders: Reminder function is the product’s lifeline; must guarantee 99.99% timely and accurate delivery.
Data loss-free: User plans must be reliably stored locally. Future versions can support cloud sync to prevent data loss on device change.
4.4 Compatibility
Platform: Support major iOS and Android versions (latest 3-4 releases).
Screen: Layout must fit various phone screen sizes.

5. Roadmap
V1.0 (MVP):
Goal: Validate core value—planning & reminders.
Features: Complete all “Core Features” described above (Plan management, smart reminders).
V1.1 (Quick Optimization):
Goal: Improve retention and achievement.
Features: Add “Daily Review & Statistics,” “History Review.”
V2.0 (Enhanced Experience):
Goal: Increase efficiency and personalization.
Features: Add “Templates,” “Themes & Personalization,” and start developing “Cloud Sync.”
```

對比我們最開始那句“幫我寫一個每天可以記計劃並提醒的應用”，現在這份文檔已經詳細得多了。你可以根據自己的真實需求，對其中的內容進行增刪修改；對於某些你不確定的模塊，也可以繼續讓 AI 提供更多備選方案，你再挑選、合併成最終版本。

通過這種方式，我們可以很輕鬆地把抽象想法變成具體描述。對 AI 開發來說，“具體”就是生產力：需求越具體，越容易得到結構穩定、質量較高的項目。你可以嘗試用這種方式重做一下之前的某個小項目，對比一下效果差異。

如果你覺得這類“需求提示詞”太長，非常自然的做法，是把它單獨寫進一個 markdown 文檔中，作為你的“需求文檔 / 開發文檔 / PRD”。之後每次讓 AI 寫項目時，只需要讓它“參考這份文檔”，而不是每次都重打一遍長提示。你也可以在迭代中不斷完善這份文檔，讓後續項目直接受益。

下面是一些其他常見的使用場景：

### 管理文件夾

我們可以嘗試用 CLI AI 程式設計工具來管理當前文件夾中的各種文件。比如，你有一堆雜亂無章的文件，需要整理歸類，就可以對 Claude Code 或 Codex 說：

`Please help me organize the contents of the current folder. I want to group files with the same content together & I want to group files from the same time period together. Please help me handle this.`

### 開發新項目

這和我們之前在 z.ai、Trae 中的用法幾乎完全一樣——我們也可以直接用 CLI AI 程式設計工具來從零開發新項目。當然，最好提前準備好一份需求文檔。

需求文檔越細緻，最終效果越好。你可以根據不斷變化的想法，對文檔做多輪優化；文檔越完善，程式碼實現就越穩定、越成熟。

### 部署開源項目（例如 Dify）

對於剛接觸計算機的同學來說，從 GitHub 上部署一個開源項目往往很有難度。但我們完全可以把這件事交給 Claude Code，就像我們在 Dify 教程中做的那樣：

<https://github.com/langgenius/dify>

如果我想在本地跑起自己的 Dify，只需要把這個鏈接扔給 Claude Code，然後輸入：

`I want to deploy this GitHub project ``https://github.com/langgenius/dify`` . Please help me clone the project and run it.`

收到你的請求後，Claude Code 會自動完成一系列操作，包括從 GitHub 拉取程式碼、配置運行環境、啟動項目等。如果中間某一步出錯或項目啟動狀態不正常，你再根據提示進行少量人工處理即可。除了 Dify，你也可以用 Claude Code 幫你部署大部分常見的 GitHub 開源項目——你只需要一個對話框，再加上喝一杯咖啡的時間 ☕️。

![](/zh-cn/stage-2/backend/modern-cli/images/image31.png)

### 講解程式碼與撰寫文檔

對於一些複雜項目，或者 AI 自動生成的大型項目，你可能會覺得程式碼太長、邏輯太多，很難看懂。這時就可以讓 CLI AI 程式設計工具幫你“讀程式碼”。你可以這樣提問：

- 請幫我解釋這個項目：如何運行、如何使用、後續如何修改和繼續開發？
- 請幫我說明這個項目的整體流程：程序是怎樣運行的？用戶在界面中可以做哪些操作？
- 請幫我為這個項目寫一份完整的文檔，包括開發文檔和運行文檔等。
- 請基於我當前文件夾裡的所有內容，寫一份詳細說明，並保存到指定的 markdown 文檔中。

### 更多玩法

當然，CLI AI 程式設計工具能做的遠不止上面這些。不要只把它當作“寫程式碼工具”，而是把它看作一個具有獨立行動能力的智能 Agent。你可以讓它幫你：

- 管理和整理本地文件；
- 寫日記、寫總結；
- 分析和修復系統錯誤；
- 執行各種重複性命令行任務等。

也許在不久的將來，它會變成你電腦上最重要、也最懂你的 AI 夥伴。
