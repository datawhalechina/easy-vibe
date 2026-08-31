<script setup>
import { relatedArticlesMap } from '@theme/data/relatedArticles'

const relatedArticles = relatedArticlesMap['zh-tw/stage-2/frontend/ui-design'] ?? []
</script>

# 構建第一個現代應用程序 - UI 設計

還記得你第一次刷到一個設計精美的產品頁面時的感受嗎？明明功能差不多，別人的頁面看起來就是更「高級」：配色乾淨、留白舒服、按鈕的圓角恰到好處。你忍不住會想——**「他們是怎麼設計出來的？我們能不能也做出這樣的頁面？」**

這種「想搞清楚別人怎麼做」的念頭，恰恰是前端設計最好的起點。在動手之前，先回顧一下我們已經掌握的能力：

- 在前幾節課裡，我們學會了用 NanoBanana 批次生成設計素材，理解了提示詞裡的「風格」如何影響最終輸出；
- 認識了 Figma 與 MasterGo 這些專業設計工具，知道一份設計稿是如何組織起來的；
- 也見識了從設計稿到前端程式碼的轉化流程。

但當你真正要為自己的專案做一個像樣的頁面時，可能還是會卡住：工具會用，素材能生成，卻**不知道「好看」長什麼樣，更不知道該怎麼拆解和模仿一個優秀的頁面**。別擔心，這節課就專門解決這個問題。

為了幫你把前後內容串起來，可以先思考幾個小問題：

1. 一個現代網頁通常由哪些區塊組成？
2. 「好看」是一種主觀感受，還是可以被量化的數字（色值、字號、間距、圓角）？
3. 如果讓你模仿一個網站的視覺風格，你會從哪裡下手？

如果對這些問題還沒有清晰的答案，沒關係——這正是本節課要教你的。操作中遇到難以理解的步驟，隨時對當前頁面截圖發給大模型詢問；大膽嘗試，不必害怕出錯，每一次嘗試都是學習和進步的機會。

::: tip 🎯 核心問題
**面對一款設計精美的 APP 或網頁，如何分析它是怎麼設計出來的，並借助 AI 設計工具把它臨摹到「以假亂真」？**
:::

---

## 本節課你將學到

1. **學會「看」設計**：拿到一個頁面，知道該看什麼、怎麼拆解
2. **掌握入門方法論**：找參考 → 分析 → 臨摹 → 到像 → 入門
3. **認識 2 條設計路線**：Figma/MasterGo 與 Claude Design/Open Design（含 UI design Skills）
4. **實戰臨摹**：挑一個真實網頁，從 0 臨摹到高還原度交付
5. **沉澱設計系統**：把大廠的設計規範，變成你自己的

::: tip 📚 前置知識
本教程適合已經會用 AI 程式設計工具（如 Trae）、想為專案補齊前端視覺能力的開發者。若想先建立生圖手感，建議先學 [NanoBanana 素材生產](../lovart-assets/)；若想深入設計工具，可結合 [Figma 與 MasterGo 入門](../figma-mastergo/) 學習。
:::

---

## 第 1 章：前端設計入門，從「抄」開始

上一節我們提出了三個問題——頁面由哪些區塊組成、好看要看什麼、怎麼模仿。這一節先從方法論說起：**前端設計的第一課，不是創造，而是復刻。**

就像學書法先臨帖、學畫畫先畫石膏像一樣，為什麼偏偏是「抄」？

- 設計的「好」是可以被量化的——**色值、字號、間距、圓角、陰影**，全是數字
- 把一套成熟設計逐像素復刻出來，你就被迫搞懂了它背後的每一個決策
- 當你「抄到像」了，下一次遇到類似場景，你就知道「該往哪個方向抄」

![](/zh-cn/stage-2/frontend/ui-design/images/design-reference.jpg)

> 💡 一句話總結：**能臨摹出一款好產品，說明你已經具備了前端設計的基本功；能在這個基礎上做改動，說明你已經出師了。**

### 1.1 為什麼臨摹是入門最快的方式

有人會擔心：「我是在抄別人的東西，這樣真的能學到東西嗎？」答案是：能，而且是最快的路徑。原因在於臨摹不是照搬結果，而是**強迫自己還原過程**：

- 你會被迫去測量每一個間距，從而理解「留白是怎麼製造呼吸感的」
- 你會被迫去查每一個色值，從而理解「這個配色為什麼看起來協調」
- 你會被迫去比較每一個層級，從而理解「主次資訊是怎麼被排出來的」

當你能把一個優秀頁面「拆到參數級別」再重建出來，你對設計的理解，已經超過了很多只會「憑感覺」的人。

### 1.2 大廠也在「參考」，這不是祕密

設計師的工作方式天然包含參考：Pinterest 找靈感、Dribbble 看趨勢、競品分析看結構。AI 時代這件事被放大了——因為工具直接把「參考」變成了可執行的能力：

![](/zh-cn/stage-2/frontend/ui-design/images/design-inspiration.jpg)

- Claude Design 可以匯入你收藏的參考網站，按它的風格生成初稿
- Open Design 內建了 151 套開源設計系統，一鍵套用到自己的專案
- 各種 UI design Skill 把「大廠的視覺規範」打包成 AI 可執行的指令

所以你的問題不該是「能不能抄」，而是「**怎麼抄得專業、抄得合法、抄出自己的東西**」。

#### 去哪裡找參考？先收藏這些網站

參考的第一步是**累積一個「參考庫」**。下面這些網站按用途分類，建議全部收藏，按需取用：

| 網站 | 用途 | 適合找什麼 |
| :--- | :--- | :--- |
| [Awwwards](https://www.awwwards.com) | 網頁設計界的「奧斯卡」 | 頂級創意、動效、互動，學「天花板」長什麼樣 |
| [Recent（原 Godly）](https://godly.website) | 高品質網頁靈感合集 | AI、Web3、作品集網站的先鋒設計 |
| [Landbook](https://land-book.com) | 落地頁設計精選 | 按行業/配色篩選官網、定價頁、首屏版面 |
| [Lapa Ninja](https://www.lapa.ninja) | 7300+ 落地頁截圖庫 | 按元素分類查導覽、特性展示、客戶評價 |
| [Mobbin](https://mobbin.com) | 真實 App 介面庫 | 研究 Uber、Notion 等產品的真實頁面與流程 |
| [Dribbble](https://dribbble.com) | 設計師社群 | 配色、圖示、插畫風格與微互動靈感 |
| [Behance](https://www.behance.net) | 完整專案案例庫 | 看設計思路、調研過程與完整作品集 |

這些網站長什麼樣？先睹為快（點擊圖片可放大）：

![Awwwards — 網頁設計的「奧斯卡」](/zh-cn/stage-2/frontend/ui-design/images/site-awwwards.jpg)

![Recent（原 Godly）— 高品質網頁靈感合集](/zh-cn/stage-2/frontend/ui-design/images/site-godly.jpg)

![Landbook — 落地頁設計精選](/zh-cn/stage-2/frontend/ui-design/images/site-landbook.jpg)

![Lapa Ninja — 7300+ 落地頁截圖庫](/zh-cn/stage-2/frontend/ui-design/images/site-lapa.jpg)

![Mobbin — 真實 App 介面庫](/zh-cn/stage-2/frontend/ui-design/images/site-mobbin.jpg)

![Dribbble — 設計師社群](/zh-cn/stage-2/frontend/ui-design/images/site-dribbble.jpg)

![Behance — 完整專案案例庫](/zh-cn/stage-2/frontend/ui-design/images/site-behance.jpg)

::: tip 💡 建立自己的參考庫
遇到心動的頁面，**立刻截圖 + 存連結**，按「落地頁 / 元件 / 配色 / 動效」分類歸檔。臨摹時直接從這個庫裡挑目標，比臨時上網找快得多。
:::

### 1.3 參考 vs 抄襲：一條清晰的界線

| 維度 | 參考（推薦 ✅） | 抄襲（危險 ❌） |
| :--- | :--- | :--- |
| 對象 | 版面結構、視覺風格、設計規範 | 品牌 Logo、專屬圖示、原創插畫 |
| 方式 | 理解後重做，融入自己的產品 | 直接複製素材、程式碼、圖片 |
| 結果 | 像風格，但內容完全不同 | 連文案、配色、素材都一模一樣 |
| 風險 | 低 | 版權/商業風險高 |

第 7 章會專門講版權界線，先記住一句話：**抄「規則」可以，抄「結果」危險。**

---

## 第 2 章：會看，才會設計——拆解一個頁面

「抄得像」的前提是「看得懂」。這一章教你一套通用的頁面拆解框架。

![](/zh-cn/stage-2/frontend/ui-design/images/page-structure.jpg)

### 2.1 看結構：頁面由哪些區塊組成

絕大多數現代網頁都能拆成 4 大塊：

```
┌─────────────────────────┐
│ ① 導覽列 Nav             │  Logo · 選單 · 登入/CTA
├─────────────────────────┤
│ ② 首屏 Hero              │  主標題 · 副標題 · 主按鈕 · 產品圖
├─────────────────────────┤
│ ③ 內容區 Sections         │  特性卡片 · 資料展示 · 評價 · 定價
├─────────────────────────┤
│ ④ 頁腳 Footer            │  連結 · 版權 · 訂閱
└─────────────────────────┘
```

看一個頁面時，先別管細節，**先用眼睛畫出它的「骨架圖」**：哪塊是導覽、哪塊是首屏、中間分了幾段、每段幾個元素。

### 2.2 看視覺：4 個可量化的要素

| 要素 | 看什麼 | 怎麼記 |
| :--- | :--- | :--- |
| **色彩** | 主色、背景色、文字色各是什麼 | 用取色器直接取 Hex 值 |
| **字型** | 標題/正文用什麼字型、幾號、多粗 | 瀏覽器 DevTools 裡看 font-family/size/weight |
| **間距** | 區塊之間、卡片內部的留白 | 記下常用的 8 / 16 / 24 / 48 px 節奏 |
| **圓角與陰影** | 卡片、按鈕的圓角半徑與陰影強度 | DevTools 裡看 border-radius / box-shadow |

::: tip 💡 前端設計的天然優勢
**你是前端開發者，DevTools 就是你的設計分析儀。** 按右鍵 → 檢查元素，任何頁面的色值、字號、間距、圓角全都暴露無遺。這是設計師夢寐以求、而開發者天生就有的能力。

常見取色工具：Chrome DevTools 的顏色選擇器、`color-picker` 類擴充功能；也可以直接把截圖丟給多模態大模型，讓它幫你提取設計規範。
:::

### 2.3 看元件：拆出「可複用零件」

把頁面拆成一個個元件，每個元件記錄它的樣式參數：

```text
按鈕 Primary Button
- 背景：#4F46E5
- 文字：#FFFFFF，14px / 600
- 圓角：8px
- 內邊距：12px 24px
- 陰影：0 2px 8px rgba(79,70,229,0.3)

卡片 Card
- 背景：#FFFFFF
- 圓角：16px
- 邊框：1px solid #E2E8F0
- 陰影：0 4px 12px rgba(15,23,42,0.08)
```

拆完 3-5 個頁面，你手裡就有了一份「元件樣式庫」——這就是你自己的設計系統雛形。

### 2.4 把「看到的設計」翻譯成「AI 聽得懂的話」

臨摹到 AI 工具裡，你需要把視覺翻譯成結構化描述。**看得越細，翻譯得越準，AI 抄得越像。**

```text
參考這個落地頁的風格，幫我做一個同構的頁面：
- 結構：導覽 + 首屏(Hero) + 3 個特性卡片 + 定價區 + 頁腳
- 配色：主色 Indigo #4F46E5，背景 #F8FAFC，文字 #0F172A
- 字型：標題 Space Grotesk 700，正文 Inter 400
- 間距：區塊 96px，卡片內 24px，網格 24px
- 圓角：卡片 16px，按鈕 8px
- 陰影：0 4px 12px rgba(15,23,42,0.08)
```

---

## 第 3 章：AI 時代的前端設計工具全景

「他們是怎麼設計出來的？」答案越來越多元。以下是 2 條典型路線，涵蓋從「手動精細控制」到「對話式自動生成」。

![](/zh-cn/stage-2/frontend/ui-design/images/ai-design.jpg)

### 3.1 路線一：Figma / MasterGo——專業設計稿工具

如果你要的是**可編輯、可協作、像素級可控的設計稿**，用 Figma（國際主流）或 MasterGo（國產，上手更輕）：

- 在畫布裡搭版面、調元件、做互動原型
- 透過 Figma Make / MasterGo AI 等能力輔助生成與批次調整
- 最終交給前端按設計稿實作，或透過外掛轉成程式碼

![Figma 編輯器：左側圖層面板、中間畫布、右側屬性面板](/zh-cn/stage-2/frontend/ui-design/images/figma_editor.jpg)

![MasterGo 編輯器：國產雲端設計工具，與 Figma 類似的畫布版面](/zh-cn/stage-2/frontend/ui-design/images/mastergo_editor.jpg)

> 適合：需要嚴格設計稿交付、團隊協作、複雜互動的場景。工具操作詳見 [Figma 與 MasterGo 入門](../figma-mastergo/)。

### 3.2 路線二：Claude Design / Open Design——對話式設計畫布

這類工具的共同點是**用自然語言直接生成可互動的設計原型**，而不是靜態圖片。代表工具是 Claude Design 與它的開源平替 Open Design。

#### Claude Design：官方對話式設計畫布

Claude Design 是 Anthropic 推出的 AI 設計產品（入口 `claude.ai/design`）：

- 輸入一句話需求，預設產出 3 個設計變體，涵蓋落地頁、線框圖、簡報等
- 支援匯入設計系統（GitHub 倉庫、Figma 匯出、網站截圖、品牌檔案），自動提取顏色/字型/元件
- 在畫布內直接評論修改、拖曳微調，最終匯出 HTML / PDF / PPTX，或交接給 Claude Code 實作為真實程式碼

**典型使用場景：**

**① 從參考截圖直接復刻高保真頁（最常用）**

輸入產品描述與風格參考，Claude 自動生成完整落地頁——左側對話記錄 prompt 和生成過程，右側畫布實時渲染結果。

```text
Create a high-fidelity landing page designed to raise $500,000 from angel investors
for "雾屿咖啡 Mist Island Coffee" - a boutique specialty coffee shop that combines
premium coffee, quiet workspaces, and warm community events.
Tone should feel warm, premium, calm, and trustworthy - think a mix of Blue Bottle
Coffee + Apple Store + minimalist lifestyle design.
```

![Claude Design 實際生成：霧嶼咖啡高保真落地頁，左側對話+進度，右側畫布渲染完整 Hero 區](/zh-cn/stage-2/frontend/ui-design/images/claude_case_landing.jpg)

**② 預設產出 3 個設計變體，選方向再精修**

Claude Design 不是只給一個答案，而是預設生成多個方向供你挑選——編輯器風、博物館風、Zine 風等，點進去再細化。

![實際案例：PCWorld 記者讓 Claude 解釋 AI Tokens 概念，返回 Editorial / Museum / Field Notes 三種風格供選擇](/zh-cn/stage-2/frontend/ui-design/images/claude_case_variants.jpg)

**③ 生成可互動原型（不只是靜態圖）**

生成的頁面是真正可點擊、可輸入的 HTML——按鈕有 hover 效果，表單能輸入，資料會實時計算。

![實際生成的 Token 科普頁：內建實時分詞器，輸入句子後色塊高亮顯示每個 token，底部統計字元/字詞/token 數](/zh-cn/stage-2/frontend/ui-design/images/claude_case_interactive.jpg)

**④ 做產品簡報/PPT**

不僅能做網頁，還能生成完整的投影片（多頁、帶導覽、可匯出 PDF/PPTX）。

![實際生成：咖啡品牌 Pitch Deck，左側列出 13 頁大綱，右側渲染目前投影片內容，底部可翻頁](/zh-cn/stage-2/frontend/ui-design/images/claude_case_slide.jpg)

**⑤ 生成動畫影片**

透過「From template」可以建立帶動畫的 HTML 影片——分鏡腳本 + 實際渲染的動畫畫面，有播放控制列。

![實際生成：45秒咖啡製作動畫影片，左側列出分鏡時間表，右側畫布播放動畫（咖啡豆→烘焙→沖泡）](/zh-cn/stage-2/frontend/ui-design/images/claude_case_video.jpg)

**⑥ 迭代既有設計（直接在畫布上評論）**

生成原型後，不用重新寫 prompt，直接點 Comment 按鈕圈選元素寫評論，Claude 會局部修改。

![畫布上點擊 Comment 按鈕，圈選任意元素後彈出評論框，寫「Suggest to Claude」即可局部迭代](/zh-cn/stage-2/frontend/ui-design/images/claude_case_comment.jpg)

**⑦ 移動端 App 頁面設計**

支援指定裝置尺寸（如 iPhone），生成帶裝置外框的移動端 UI 原型。

![實際生成：板球計分 App（Tracket）移動端介面——深色 Header + 比分顯示 + 操作按鈕，針對戶外陽光場景做了高對比度設計](/zh-cn/stage-2/frontend/ui-design/images/claude_case_mobile.jpg)

![Claude Design 畫布總覽：左側對話，右側 Tweaks 面板可實時調整主題、斷點、顏色等參數](/zh-cn/stage-2/frontend/ui-design/images/claude_design_canvas.jpg)

> 適合：沒有設計背景、想跳過 Figma 學習曲線、快速拿到可互動原型的人。

#### Open Design：Claude Design 的開源平替

如果你不想訂閱、或更看重資料隱私，可以試試 Open Design（nexu-io 開源專案）。它與 Claude Design 是同一路線：**對話式生成設計原型**，差別在於**本機優先、BYOK（自帶模型 Key）、不綁定任何 Agent**。

它有兩個核心概念：

| 概念 | 說明 | 對你的價值 |
| :--- | :--- | :--- |
| **Skills（技能）** | 16 個指令型設計技能（文案、配色、創意指導、腦力激盪…） | 一個技能 = 一個專業任務模板 |
| **Templates（模板）** | 288 個可執行模板（原型、投影片、動效…），都帶 `example.html` | fork 下來換資料就能交付 |
| **Design Systems（設計系統）** | 151 套可攜式的設計系統（色票、字型、動效、文風） | 一句話套用大廠視覺規範 |

它會偵測你本機的編碼 Agent（Claude Code、Codex、Cursor、Qwen、Kimi 等，官方稱支援 21 種）作為「設計引擎」——**你現有的 Agent 就是設計師**。此外，Claude Code 等工具生態裡的 **UI design Skill**（如 frontend-design）也能把設計規範打包成 AI 可執行的指令，讓 AI 按規範輸出。

**典型使用場景：**

**① 新建專案：選 Skill + 設計體系 + 精度**

建立原型時，可以選擇線框圖或高保真，指定目標平台（響應式 Web / 移動端等），並從內建的 150+ 設計體系中挑選一套作為視覺基礎。

```text
用 Open Design，套用 Linear 的設計系統，生成一個 SaaS 產品的落地頁 HTML
```

![Open Design 新建原型對話框：中文介面，可選原型/投影片/媒體，切換線框圖/高保真，選擇設計體系和目標平台](/zh-cn/stage-2/frontend/ui-design/images/od_case_create.jpg)

![Open Design 內建 150+ 套設計系統（Agentic、Airbnb、Airtable、Linear、Stripe、Vercel…），按類別分組，每個都有色票預覽和說明](/zh-cn/stage-2/frontend/ui-design/images/od_case_designsystems.jpg)

**② Studio 工作區：對話驅動，實時生成**

左側是對話面板（顯示 AI 的思考步驟、Todo 列表、Write 操作），右側是 iframe 畫布實時渲染生成結果——和 Claude Design 類似，但底部顯示本機正在呼叫哪個 CLI Agent（如 Claude Code、Codex、deepseek 等）。

![Open Design Studio 工作區：左側 Chat 面板顯示生成計畫和進度，右側畫布渲染出「Open Design」大字封面頁（投影片模式），頂部可切換 Preview/Source/Comment/Edit](/zh-cn/stage-2/frontend/ui-design/images/od_case_studio.jpg)

**③ 套用設計系統生成投影片/PPT**

選擇 Slide deck 類型，輸入主題即可生成完整多頁投影片。下圖是社群使用者用 Open Design 生成的中文演講投影片。

![真實使用者案例：「一人公司 · 被 AI 摺疊的組織」演講投影片封面——深色背景、襯線大字標題、演講者資訊、底部頁碼導覽](/zh-cn/stage-2/frontend/ui-design/images/od_case_deck.jpg)

**④ 生成高保真移動端 App 原型**

支援多螢幕同時預覽，自動生成 iPhone 裝置外框，Tab 欄、卡片版面、進度條等元件一應俱全。

![真實生成案例：遊戲化生活管理 App（Level）——3 螢幕並排預覽，包含每日任務首頁、任務分類儀表板、任務詳情頁，淺色模式，彩色卡片](/zh-cn/stage-2/frontend/ui-design/images/od_case_mobile.jpg)

**⑤ 用 UI design Skill 規範化 AI 輸出**

給 Claude Code / Cursor 裝上 frontend-design 這類 Skill，AI 寫頁面時自動遵循設計規範：

```text
# 在 Claude Code 裡呼叫
/frontend-design 幫我實現一個登入頁面
→ 自動按 Skill 內建的設計規範輸出：
   - 顏色：主色 #4F46E5，成功 #10B981，錯誤 #EF4444
   - 間距：8px 基準網格
   - 元件：符合無障礙標準的 Button / Input / Form
   - 響應式：移動端 / 平板 / 桌面三端適配
```

**⑥ 本機私有專案不出網**

公司內部專案、含敏感資料的產品設計，所有檔案都在本機處理，模型可走本機部署或 BYOK：

```text
# 本機啟動 Open Design，模型走本機部署的 Qwen
OPENAI_API_KEY=your-local-key OPENAI_BASE_URL=http://localhost:8000/v1 \
opendesign
# 所有設計檔案保存在本機 ~/.open-design/，不經過任何第三方伺服器
```

![Open Design 主介面：選擇 Skill（原型/投影片/圖片/影片等）+ 輸入需求即可生成，本機 CLI Agent 自動作為引擎](/zh-cn/stage-2/frontend/ui-design/images/opendesign_home.jpg)

> 適合：注重資料隱私、已有編碼 Agent、想完全掌控設計流程的開發者。

### 3.3 兩條路線怎麼選

| 對比項 | 路線一：Figma / MasterGo | 路線二：Claude Design / Open Design |
| :--- | :--- | :--- |
| 定位 | 專業設計稿工具 | 對話式 AI 設計畫布 |
| 代表工具 | Figma、MasterGo | Claude Design（官方）、Open Design（開源平替） |
| 產出 | 可編輯設計稿 | 可互動 HTML 原型 |
| 上手難度 | ⭐⭐ 中 | ⭐ 低 |
| 成本 | 免費版可用 | Claude Design 需訂閱；Open Design 開源免費（BYOK） |
| 適合 | 嚴謹交付與協作 | 快速原型驗證、隱私優先 |

::: tip 💡 現實中的組合用法
**參考 → 設計 → 交付** 全程可以混用：用 Claude Design / Open Design 快速出方向和原型 → 定稿後匯入 Figma/MasterGo 精修 → 交接給 Claude Code 寫成程式碼。每條路線取長補短。
:::

![](/zh-cn/stage-2/frontend/ui-design/images/design-tools.jpg)

---

## 第 4 章：實戰一：把「別人的網頁」臨摹到像

目標很具體：**選一個你喜歡的真實網頁，臨摹到「像」。** 這裡以落地頁為例。

![](/zh-cn/stage-2/frontend/ui-design/images/design-workspace.jpg)

### Step 1：選定目標

選一個結構清晰、你有興趣的落地頁（SaaS 官網、產品介紹頁都行）。儲存它的截圖和連結。

### Step 2：用第 2 章框架拆解

在瀏覽器裡按右鍵 → 檢查，按 4 步記錄：

```text
目標：某 SaaS 官網落地頁
① 結構：導覽(Logo/選單/CTA) → Hero(標題/副標題/按鈕/截圖) → 3 特性卡片 → 定價(3 檔) → 頁腳
② 色彩：主色 #0F172A 深色，強調 #6366F1，背景 #FFFFFF / #F8FAFC
③ 字型：標題 Inter 800 48px，正文 Inter 400 16px
④ 元件：按鈕 圓角 8px/實色，卡片 圓角 16px/淺灰底/無邊框
```

### Step 3：餵給 AI 設計工具，生成第一版

把拆解結果丟給 Claude Design / Open Design，讓它按這套規範生成：

```text
按以下設計規範生成一個同構落地頁：
[貼上 Step 2 的拆解記錄]
產品：我的專案（一句話說明用途）
要求：像素級遵循上面的色彩、字型、間距、圓角規範
```

第一版通常是「神似而形不似」——結構對，細節有偏差。**這不叫失敗，這正好告訴你接下來該調哪裡。**

### Step 4：逐區塊對照，迭代修改

把參考截圖和生成結果並排，逐區塊對照，用「修改指令」逼近：

| 發現的問題 | 修改指令 |
| :--- | :--- |
| 主色偏亮 | 「把主色改為 #0F172A，強調色 #6366F1」 |
| 按鈕圓角不對 | 「所有按鈕統一 8px 圓角、實心背景」 |
| 間距太擠 | 「區塊間距改為 96px，卡片內邊距 24px」 |
| 字型不對 | 「標題改用 Inter 800，正文 Inter 400」 |
| 多了裝飾元素 | 「去掉背景裝飾，只保留核心內容」 |

### Step 5：驗收標準——「像」

怎麼判斷自己入門了？給自己設一個客觀標準：

- [ ] 截兩張圖：原網頁 vs 你的臨摹版
- [ ] 把兩張圖並排放大，逐像素對比
- [ ] 色值、字號、間距、圓角**肉眼看不出版式差異**
- [ ] 縮到 50% 再對比，依然分不清哪個是原版

> 💡 **「像」不是目的，是手段。** 臨摹 2-3 個風格完全不同的網站後，你會自然累積一套「設計手感」：什麼時候該大留白、什麼時候該高飽和、什麼時候圓角要收斂。這時候再臨摹新頁面，速度會快得多。

---

## 第 5 章：實戰二：從設計到程式碼

臨摹出的設計稿/原型，最終要變成產品裡的真實頁面。兩條交接路徑：

![](/zh-cn/stage-2/frontend/ui-design/images/design-to-code.jpg)

### 5.1 路徑 A：AI 設計工具 → 前端程式碼

- **Claude Design**：在畫布定稿後，用 `/design-sync` 同步到 Claude Code，從設計直接續寫程式碼，不必從截圖重來
- **Open Design**：可直接匯出 HTML，再交給 Agent 改造成專案元件
- **Figma/MasterGo**：透過外掛或 MCP 匯出 React / Vue 程式碼

### 5.2 路徑 B：截圖 → 多模態大模型還原

最簡單：把臨摹好的設計截圖直接丟給多模態大模型，「還原成 React 元件」，逐區塊落地。

> 三種「設計轉程式碼」路徑的詳細對比，見 [從設計原型到專案程式碼](../design-to-code/)。想要元件級的工程化提效，可再看 [使用現代元件庫更新你的介面](../modern-component-library/)。

---

## 第 6 章：把大廠的設計系統變成自己的

臨摹 3 個頁面後你會發現：**好看的頁面背後都有一套穩定的「設計系統」**。與其自己從 0 造，不如站在巨人肩膀上。

![](/zh-cn/stage-2/frontend/ui-design/images/design-system.jpg)

### 6.1 什麼是「可攜式的設計系統」

Open Design 把設計系統做成 `DESIGN.md` 檔案（Linear、Vercel、Stripe、Apple、Cursor、Figma…），Claude Design 則從你的程式碼倉庫/設計檔案自動提取。它們本質都是同一件事：

```text
DESIGN.md  =  顏色 Token + 字型規範 + 間距節奏 + 元件樣式 + 使用約定
```

一個真實的範例結構：

```markdown
# Design System: Linear

## Colors
- background: #08090A
- primary: #5E6AD2
- text: #F7F7F8

## Typography
- heading: 22px / 600, letter-spacing -0.4px
- body: 14px / 400

## Radius
- card: 8px
- button: 6px

## Spacing
- 4 / 8 / 12 / 16 / 24 / 32 px

## Do / Don't
- Do: 大量留白，克制用色
- Don't: 不使用渐变、不使用阴影堆叠
```

### 6.2 三步建立自己的設計系統

1. **選基底**：套用一個你認可的大廠設計系統（如 Linear 的克制暗色、Apple 的留白）
2. **改參數**：替換主色為你的品牌色、調整圓角與間距
3. **沉澱成檔案**：儲存為 `DESIGN.md` 或 Skill，讓 AI 每次生成都自動遵守

### 6.3 進階：用 UI design Skill 固定風格

把設計系統封裝成 Skill 後，一句話即可呼叫：

```text
使用 my-brand skill 的設計規範，生成 3 個功能頁面的首屏方案
```

建立與使用 Skill 的方法，詳見 [用 LLM 和 Skills 讓介面變好看](../llm-skills-beautiful/)。

---

## 第 7 章：版權與倫理

臨摹能力越強，越要守住界線：

![](/zh-cn/stage-2/frontend/ui-design/images/copyright.jpg)

**抄規則，不抄結果。** 版面、配色、間距這些「規則」可以學習；Logo、圖示、插畫、文案等「結果」不要直接複製。

**商用專案要謹慎。** 商業交付前確認：素材版權、字型授權（商用字型需購買）、參考網站的使用條款。

**AI 生成內容的歸屬。** 不同平台（Claude Design、Open Design 等）條款不同，商用前查看服務協議。

**標註 AI 參與。** 部分平台/法規要求公開內容由 AI 生成。

**最終把關。** 品牌標識、廣告物料等敏感場景務必人工審核。

::: tip 💡 建議
學習與原型階段放開臨摹；**進入商業交付時，把「參考」變成「自己設計系統的再創作」，並保留生成記錄**。
:::

---

## 總結

這一章把「前端設計入門」落到了可執行的路徑上：

1. **心態**：前端設計入門從「抄」開始，抄規則、不抄結果
2. **看**：用結構(4 大塊) + 視覺(色彩/字型/間距/圓角) + 元件 三層拆解任何頁面，DevTools 是你的分析儀
3. **工具**：2 條路線——Figma/MasterGo（精細設計稿）、Claude Design / Open Design + UI design Skills（對話式原型）
4. **臨摹**：選目標 → 拆解 → 生成 → 逐區塊迭代 → 像素級對比驗收
5. **沉澱**：把大廠 DESIGN.md 改造成自己的設計系統，再用 Skill 固定下來

::: tip 💡 下一步行動
今天就完成一次完整的臨摹練習：
1. 找一個你想「抄」的落地頁，用 DevTools 拆出它的色彩/字型/間距/圓角
2. 用 Claude Design 或 Open Design 生成第一版，逐區塊修改到「像」
3. 把定稿交給 AI 變成程式碼，並順手儲存一份自己的 DESIGN.md
:::

<RelatedArticlesSection
  title="相關文章"
  description="繼續深入 AI 設計、素材生產與設計轉程式碼實戰。"
  :items="relatedArticles"
/>
