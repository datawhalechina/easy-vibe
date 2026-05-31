# Claude Code Skills 完整指南

## Skills 簡介

**Claude Code Skills** 是一項功能，能將專業知識、工作流程和最佳實踐封裝成可重複使用的「技能包」。

你可以把 Skills 想像成為 Claude 配備的「技能書」。當你需要它完成某項特定任務時，不再需要一遍又一遍地解釋需求，而是讓它直接按照 Skill 預先定義的標準來執行工作。

### 為什麼需要 Skills？

在 Skills 出現之前，使用 Claude Code 有幾個問題：

- **重複指令**：每次都要解釋「遵循什麼程式碼風格」「commit message 怎麼寫」之類的事情
- **知識無法累積**：團隊成員個人使用 Claude 的經驗無法分享
- **標準不一致**：不同人使用 Claude 可能得到完全不同的結果
- **效率低下**：常見任務每次都要從頭解釋

Skills 解決了這些問題，讓 Claude 變成一個「有經驗的團隊成員」——它了解你的專案規範、工作流程和最佳實踐。

---

## 為什麼現在學習 Skills？

**Skills 正在成為 AI 工程師的必備能力**：

- **社群關注度高**：相關 GitHub 倉庫星數快速增長。例如 OpenSkills 專案已達到 7.2k 星，Obsidian Skills 在短短 9 天內獲得 6.6k 星
- **官方支援**：Anthropic 維護了官方 Skills 倉庫，Vercel 推出了 Agent Skills 和 find-skills 工具
- **實用性高**：從程式碼審查、Git 操作到影片製作和 PPT 生成，Skills 涵蓋了許多場景。skills.sh 平台上已有熱門技能達到 60K+ 訂閱量
- **效率提升**：一次配置，重複使用，讓 Claude 真正成為你的「數位員工」
- **開發者認可**：被多個技術社群推薦，廣泛被認為是提升 AI 程式設計效率的關鍵工具

---

## 快速入門

了解了 Skills 的價值後，讓我們馬上來試試。本節將帶你安裝第一個 Skill，並完成幾個有趣的實作任務，讓你快速建立直覺。

### 第一步：安裝 `find-skills`（強烈推薦）

在開始使用 Skills 之前，強烈建議先安裝 `find-skills`。它是 AI Agent 世界中的「終極技能搜尋工具」，已有 60K+ 訂閱量。

**什麼是 `find-skills`？**

簡單來說，`find-skills` 就像是 AI Agent 的「應用商店搜尋引擎」。當你需要完成一項任務但本地沒有合適的 Skill 時，它會自動搜尋並推薦最適合的一個。

**安裝 `find-skills`：**

```bash
npx skills add vercel-labs/skills@find-skills -g -y
```

安裝完成後，你可以直接告訴 Claude 你的需求，它會自動使用 `find-skills` 搜尋相關技能。

**使用範例：**

```text
我需要優化一個 React 組件的效能。幫我找找有什麼技能可以使用。
```

Claude 會透過 `find-skills` 搜尋，然後告訴你找到了哪些相關技能，讓你選擇安裝。

**為什麼要先安裝 `find-skills`？**

在 `find-skills` 之前：
- 手動在 GitHub 上搜尋相關技能
- 逐一複製、安裝和配置
- 反覆除錯和調整

有了 `find-skills` 之後：
- 用一句話描述需求
- AI 自動搜尋最佳匹配的技能
- 一鍵安裝，立即使用

**Windows 使用者注意**：官方版本對 Windows 的支援有限。社群已製作了相容 Windows 的版本，支援 CMD 和 PowerShell，並新增了中文搜尋功能。

下載 Windows 版本：[github.com/tongbei821/customize-skills](https://github.com/tongbei821/customize-skills/blob/main/findskills/SKILL.md)

安裝步驟：
1. 下載 Windows 版本的 `SKILL.md`
2. 替換 `C:/Users/your-username/.agents/skills/find-skills` 中的檔案
3. 重新啟動 Claude Code 即可生效

**相關連結**：
- [Skills 官方網站](https://skills.sh/) - 瀏覽所有可用技能
- [find-skills 倉庫](https://github.com/vercel-labs/agent-skills) - 官方原始碼

### 安裝並試用你的第一個 Skill

安裝 `find-skills` 後，讓我們用它來搜尋並安裝一個有趣的第一個 Skill：Remotion 影片製作工具。

#### 第一步：使用 `find-skills` 搜尋 Remotion

在 Claude Code 中輸入：

```text
幫我找找跟 Remotion 相關的技能。我想製作影片。
```

Claude 會透過 `find-skills` 搜尋並推薦 `remotion-dev/skills`。

#### 第二步：安裝 Remotion Skills

```bash
npx skills add remotion-dev/skills -g
```

#### 第三步：用它來做些有趣的東西

Remotion 是一個用 React 程式碼製作影片的框架。安裝這個 Skill 後，你可以用自然語言請 Claude 幫你撰寫影片程式碼。

**任務 1：製作一個酷炫的動態文字影片**

```text
使用 Remotion 製作一個影片：
- 1920x1080，5 秒
- 一行文字「Hello World」從左邊飛入
- 同時帶有旋轉和縮放效果
- 背景是漸層色
```

Claude 會生成完整的 Remotion 程式碼，你可以執行它來觀看動畫。

**任務 2：製作一個資料視覺化影片**

```text
製作一個 10 秒的影片，展示資料成長：
- 從長條圖開始
- 長條一根一根帶動畫增長
- 數字往上跳動
- 最後顯示大字「300% 成長」
```

**任務 3：製作一個多場景產品展示影片**

```text
製作一個產品展示影片，包含三個場景：
場景 1：Logo 淡入，2 秒
場景 2：產品功能逐一出現，3 秒
場景 3：CTA 按鈕彈出，2 秒
每個場景之間使用流暢的過渡效果
```

**執行程式碼**：

Claude 生成的程式碼是一個完整的 Remotion 專案。你可以：

1. 建立新專案：`npx create-video my-video`
2. 將 Claude 生成的程式碼複製進去
3. 執行預覽：`npm start`
4. 渲染影片：`npm run build`

---

### 第二個 Skill：使用 `find-skills` 解決「前端看起來很醜、感覺很慢」

#### 第一步：用自然語言描述你的問題

直接告訴 Claude 你的高層次需求：

```text
我的網站看起來過時了，載入也很慢。幫我找找有什麼技能可以使用。
```

或者更具體一點：

```text
我想讓前端看起來更好看，不要再那麼卡頓。
```

#### 第二步：Claude 會使用 `find-skills` 搜尋

Claude 會透過 `find-skills` 搜尋 skills.sh 資料庫並推薦相關技能。對於「變好看 + 減少卡頓」這類需求，它會推薦：

**anthropics/skills/frontend-design**（官方技能）

這個技能專門解決 AI 生成的介面「看起來平庸、千篇一律」的問題，幫助 Claude 設計：

- 獨特的視覺風格，避免同樣的「AI 模板感」
- 專業的配色和排版
- 流暢的動畫效果
- 生產級別的程式碼品質，程式碼整潔，效能自然更好

#### 第三步：安裝並使用

**安裝**：

```bash
npx skills add anthropics/skills/frontend-design -g
```

**你可以用它完成的任務**：

```text
幫我重新設計這個頁面。我要它看起來非常專業，不像 AI 生成的。
```

```text
這個 UI 太醜了。用更現代的設計風格重寫。
```

```text
做一個深色主題的儀表板，有強烈的科技感。
```

Claude 會遵循這個技能的規範，幫你設計：
- 獨特的視覺方向，如極簡主義、復古未來主義或粗野主義
- 精心挑選的顏色和字體
- 合理的間距和佈局
- 流暢的互動動畫

---

### 兩個 Skill 比較

| 技能 | 解決什麼問題 | 有趣程度 |
|--------|-------------|---------|
| **remotion-dev/skills** | 用程式碼製作影片 | ⭐⭐⭐⭐⭐ |
| **anthropics/skills/frontend-design** | 讓前端更好看 | ⭐⭐⭐⭐ |

---

### 第三個 Skill：使用 `frontend-slides` 快速製作精美的 PPT 簡報

#### 簡介

**frontend-slides** 是一個讓你能用自然語言建立精美 HTML 簡報的 Skill——即使你完全不懂 CSS 或 JavaScript。

它的核心理念是「**展示，而非描述**」。如果你無法清楚描述想要的設計風格，它會生成 3 個視覺預覽讓你選擇，而不是強迫你描述像「藍色背景、大字體」這樣的抽象需求。

#### 安裝 `frontend-slides`

**方法一：手動安裝**

```bash
# 建立技能目錄
mkdir -p ~/.claude/skills/frontend-slides

# 下載檔案（或從 GitHub 複製）
# 1. 造訪 https://github.com/zarazhangrui/frontend-slides
# 2. 下載 SKILL.md 和 STYLE_PRESETS.md
# 3. 將它們放入 ~/.claude/skills/frontend-slides/
```

**方法二：使用 `find-skills` 安裝**

```text
幫我找一個製作 PPT 簡報的技能
```

Claude 會透過 `find-skills` 搜尋並推薦 `frontend-slides`。

#### 使用場景

**場景一：從零開始建立簡報**

```text
/frontend-slides

我想為一個 AI 新創專案建立一個募資簡報，大約 10 頁
```

Claude 會引導你：
1. 填寫每張投影片的內容，如標題、重點和圖片
2. 描述你想要的感覺，如驚豔、專業或溫馨
3. 從 3 個視覺風格預覽中選擇
4. 建立完整的 HTML 簡報
5. 在瀏覽器中開啟預覽

**場景二：轉換 PowerPoint 檔案**

```text
/frontend-slides

將我的 presentation.pptx 轉換成網頁簡報
```

Claude 會：
1. 從 PPT 中提取所有文字、圖片和備註
2. 顯示提取的內容讓你確認
3. 讓你選擇視覺風格
4. 生成保留所有原始內容的 HTML 簡報

**場景三：快速生成風格預覽**

```text
/frontend-slides

我想為一場技術演講製作 PPT。先給我看看可用的視覺風格。
```

Claude 會直接生成 3 個不同風格的預覽頁面：
- **深色主題**：霓虹賽博、終端綠、深空
- **淺色主題**：紙墨、瑞士現代、柔和粉彩
- **特殊風格**：粗野主義、漸層波浪

#### 內建視覺風格

| 風格名稱 | 特點 | 適用場景 |
|---------|------|---------|
| **霓虹賽博** | 未來科技感、粒子效果 | 技術演講、AI 產品 |
| **午夜商務** | 高端商務、值得信賴 | 商務報告、募資簡報 |
| **紙墨風格** | 編輯風格、文藝氛圍 | 內容創作、教育分享 |
| **瑞士現代** | 簡潔幾何、包浩斯風格 | 設計作品集、極簡主義 |
| **粗野主義** | 原始、大膽、引人注目 | 藝術展示、個人表達 |

#### 輸出結果

生成的簡報是一個**單一 HTML 檔案**，包含：

- 完整的樣式和互動程式碼
- 方向鍵和空白鍵的鍵盤導航
- 觸控滑動支援
- 滑鼠滾輪翻頁
- 進度條和導航圓點
- 滾動觸發動畫
- 響應式設計

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <!-- 所有樣式皆為內嵌，零依賴 -->
</head>
<body>
    <section class="slide title-slide">
        <h1 class="reveal">你的標題</h1>
    </section>
    <!-- 更多投影片... -->
</body>
</html>
```

#### 為什麼推薦它？

1. **零依賴**：單一 HTML 檔案，10 年後仍能開啟
2. **視覺探索**：不需描述設計，只需挑選你喜歡的
3. **PPT 轉換**：保留現有內容，為它換上更好的視覺外衣
4. **生產級程式碼**：可存取、註解清晰、易於客製化

**相關連結**：
- [frontend-slides GitHub 倉庫](https://github.com/zarazhangrui/frontend-slides) - 6.1k+ 星
- [線上預覽範例](https://github.com/zarazhangrui/frontend-slides#output-example)

---

### 三個 Skill 比較

| 技能 | 解決什麼問題 | 有趣程度 | 實用性 |
|--------|-------------|---------|---------|
| **remotion-dev/skills** | 用程式碼製作影片 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| **anthropics/skills/frontend-design** | 讓前端更好看 | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **frontend-slides** | 快速製作精美 PPT | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |

---

### 安裝後如何使用

安裝後不需要額外配置。當你請 Claude 執行相關任務時，它會自動呼叫對應的 Skill。

查看已安裝的 Skills：

```bash
npx skills list
```

---

## 什麼是 Skills？

### 核心概念

**Skills 是儲存在檔案系統中的「技能包」**，可以包含：

- **SKILL.md**：技能的定義檔案，必要
- **scripts/**：輔助腳本，選填
- **templates/**：輸出模板，選填
- **references/**：參考文件，選填

### Skills 與 Prompts 的區別

你可能會好奇：Skills 和直接向 Claude 發送 prompts 有什麼區別？

| Prompts | Skills |
|--------|--------|
| 暫時性的，每次都要重複 | 持久性的，寫一次可重複使用多次 |
| 存在對話歷史中，消耗 tokens | 按需載入，節省 tokens |
| 無法跨對話共享 | 可以在團隊中共享 |
| 難以進行版本控制 | 可以用 Git 管理 |

### 兩種 Skills 類型

**全域 Skills（個人）**：
- 儲存位置：`~/.claude/skills/`
- 作用範圍：所有專案
- 適用場景：通用型個人技能

**專案 Skills（團隊）**：
- 儲存位置：`專案目錄/.claude/skills/`
- 作用範圍：當前專案
- 適用場景：團隊共享和專案特定規範

### Skills 的運作方式

當 Claude Code 啟動時，它會：

1. 掃描 Skills 目錄
2. 解析每個 `SKILL.md` 檔案
3. 提取 YAML frontmatter 元資料
4. 將技能內容加入其「知識庫」
5. 根據描述自動匹配觸發條件

---

## `SKILL.md` 檔案結構

### 基本結構

一個完整的 Skill 目錄看起來像這樣：

```text
my-skill/
├── SKILL.md          # 必要：技能定義檔案
├── scripts/          # 選填：輔助腳本
├── templates/        # 選填：輸出模板
├── references/       # 選填：參考文件
└── examples/         # 選填：範例檔案
```

### `SKILL.md` 模板

`SKILL.md` 檔案有兩個部分：

**第一部分：YAML Frontmatter（元資料）**

```yaml
---
name: skill-name              # 技能名稱，會變成 /skill-name 指令
description: short description # 用於 Claude 的自動觸發匹配
category: development         # 分類
tags:                         # 標籤
  - code
  - automation
---
```

**第二部分：Markdown 內容（指令）**

```markdown
# Skill 標題

## 使用場景
何時使用此技能

## 執行步驟
1. 步驟一
2. 步驟二

## 注意事項
- 注意事項 1
- 注意事項 2
```

### 關鍵欄位說明

| 欄位 | 必要 | 說明 |
|------|------|------|
| `name` | 是 | 技能名稱。只允許小寫字母、數字和連字號 |
| `description` | 是 | 技能描述。越具體，Claude 越容易自動匹配 |
| `category` | 否 | 分類標籤 |
| `tags` | 否 | 額外的分類標籤 |
| `allowed-tools` | 否 | 可使用的工具，無需額外授權 |

---

## Skills 與 MCP：有什麼區別？

很多初學者會混淆 Skills 和 MCP，但它們是完全不同的東西。

### 核心區別

| 維度 | Skills | MCP |
|------|--------|-----|
| **本質** | 知識和工作流程 | 工具和介面 |
| **提供的內容** | 告訴 AI「怎麼做」 | 給 AI「能用什麼」 |
| **儲存位置** | `skills/` 目錄 | MCP 伺服器 |
| **配置格式** | Markdown 檔案 | JSON 配置檔案 |
| **觸發方式** | `/skill-name` 或自動識別 | 透過配置自動載入 |

### 直觀的比喻

如果 Claude 是一個「工人」：

- **MCP** 是給工人的「工具」，例如扳手、電腦和存取權限
- **Skills** 是給工人的「操作手冊」，例如如何做程式碼審查或如何提交程式碼

### 它們的關係

Skills 和 MCP 不是競爭關係。它們是互補的：

```text
使用者任務 -> Claude 識別需求
               ↓
        載入相關 Skills（知道怎麼做）
               ↓
        透過 MCP 呼叫工具（有工具可用）
               ↓
        完成任務
```

### 範例

**場景：程式碼審查**

- **Skills** 定義審查步驟、檢查清單和輸出格式
- **MCP** 提供存取 GitHub PR 和獲取程式碼 diff 的能力

協作方式：Skills 告訴 Claude「如何審查」，MCP 給 Claude「存取程式碼的能力」。

### 選擇建議

| 你的需求 | 推薦方案 |
|----------|----------|
| 需要定義工作流程 | 使用 Skills |
| 需要存取外部資料 | 使用 MCP |
| 兩者都需要 | 一起使用 |

---

## 獲取 Skills 的常用資源

### 官方資源

- [Anthropic 官方 Skills 倉庫](https://github.com/anthropics/skills) - 官方維護的技能集合
- [Claude Code 官方文件 - Skills](https://docs.anthropic.com/en/docs/claude-code/configuration/skills) - 官方文件

### GitHub 社群資源

| 倉庫 | 說明 |
|------|------|
| [shanraisshan/claude-code-best-practice](https://github.com/shanraisshan/claude-code-best-practice) | 由 Claude Code 負責人 Boris Cherny 維護，包含 Skills、Agents、Hooks 等 |
| [affaan-m/everything-claude-code](https://github.com/affaan-m/everything-claude-code) | 綜合工具包，包含預配置的 Skills |
| [JackyST0/awesome-agent-skills](https://github.com/JackyST0/awesome-agent-skills) | 精選 Skills 資源清單 |
| [jeffallan/claude-skills](https://github.com/jeffallan/claude-skills) | 66 個專業技能和 300+ 參考文件 |
| [GitCode/awesome-claude-skills](https://gitcode.com/GitHub_Trending/aw/awesome-claude-skills) | 精選開源集合 |

### 如何安裝社群 Skills

使用 `find-skills`，你只需告訴 Claude 你的需求，它會自動搜尋並推薦：

```text
幫我找一個跟 React 效能優化相關的技能
```

Claude 會透過 `find-skills` 搜尋 skills.sh 資料庫，然後列出最相關的技能，你可以選擇安裝。

**搜尋技巧**：

- 使用具體的關鍵字：`「react testing」` 比 `「testing」` 更好
- 結合「領域 + 動作」：`「nextjs deploy」`、`「typescript lint」`
- 優先選擇安裝數量高的技能，10K+ 通常意味著經過實戰驗證
- 關注熱門排行榜，發掘新興技能

---

## 如何建立你自己的 Skills

有兩種建立 Skills 的方式：直接請 Claude 幫你建立，或使用專門的 `skill-creator` 工具。

### 方法一：直接請 Claude 幫你建立

這是最簡單的方式。只需用自然語言告訴 Claude 你的需求。

**範例**：

```text
請幫我建立一個名為「format-code」的技能，用於自動格式化程式碼。

需求：
1. 自動偵測程式語言
2. 套用對應的格式化規則
3. 回傳格式化前後的 diff
```

Claude 會自動：
1. 建立目錄結構
2. 生成 `SKILL.md` 檔案
3. 填寫 YAML frontmatter
4. 撰寫技能內容

**適用場景**：
- 快速建立簡單技能
- 你知道自己要什麼，但不熟悉 `SKILL.md` 格式
- 想要快速迭代修改

### 方法二：使用 `skill-creator`

`skill-creator` 是一個專門用來建立 Skills 的工具。它會一步步引導你完成整個過程。

**安裝**：

```bash
npx skills add anthropics/skills@skill-creator -g
```

或安裝整個官方技能倉庫：

```bash
npx skills add anthropics/skills -g
```

**使用**：

```text
/skill-creator
```

然後填寫提示中的欄位：
- 技能名稱
- 功能描述
- 使用場景
- 執行步驟

`skill-creator` 會：
1. 引導你釐清技能的用途
2. 生成 `SKILL.md` 草稿
3. 建立測試案例
4. 執行評估並優化

**適用場景**：
- 建立複雜技能
- 需要更標準化的建立流程
- 想要測試驗證技能

### 兩種方法比較

| 方法一：直接建立 | 方法二：`skill-creator` |
|-----------------|---------------------|
| 快速簡單 | 引導式步驟 |
| 適合簡單技能 | 適合複雜技能 |
| 直接在對話中完成 | 標準化流程 |
| 靈活修改 | 包含測試和驗證 |

### 提示：如何寫好需求

**好的需求描述**：

```text
建立一個「git-commit」技能，用於自動提交程式碼。

執行步驟：
1. 檢查哪些檔案被修改了
2. 生成遵循 Conventional Commits 的提交訊息
3. 執行 git commit
4. 詢問是否要推送

注意事項：
- 提交前檢查是否有敏感資訊
- 不要提交 dist/ 或 node_modules/ 等目錄
```

**差的需求描述**：

```text
幫我寫一個提交程式碼的技能
```

這太模糊了。Claude 不會知道它具體需要做什麼。

---

## 常見 Skill 範例

### 範例一：程式碼審查 Skill

建立目錄和檔案：

```bash
mkdir -p ~/.claude/skills/review-pr
```

```bash
cat > ~/.claude/skills/review-pr/SKILL.md << 'EOF'
---
name: review-pr
description: Review Pull Requests for code quality, security, and test coverage
---

You are a senior code reviewer.

## Review workflow

1. **Code style check**
   - Does the code follow team conventions?
   - Are names clear?
   - Are comments sufficient?

2. **Security check**
   - Are there security vulnerabilities?
   - Is sensitive information exposed?
   - Is input validation complete?

3. **Testing check**
   - Are there enough tests?
   - Do test cases cover edge conditions?
   - Are the tests runnable?

4. **Overall evaluation**
   - What are the strengths?
   - What needs improvement?
   - Do you recommend approving the merge?

## Output format

Please output the review results in a clear structure using a list format.
EOF
```

如何使用：

```text
/review-pr
請審查當前分支的 PR
```

### 範例二：Git 自動提交 Skill

```bash
mkdir -p ~/.claude/skills/git-commit
```

```bash
cat > ~/.claude/skills/git-commit/SKILL.md << 'EOF'
---
name: git-commit
description: Automatically detect changes, generate a commit message, and commit the code
---

You are a skilled Git user.

## Execution workflow

1. **Check changes**
   Run `git status` to view modified files
   Run `git diff` to view detailed changes

2. **Generate commit message**
   Analyze the nature of the changes
   Generate a commit message that follows Conventional Commits
   Format: `type(scope): description`

3. **Security check**
   Check whether there is sensitive information such as keys, passwords, or tokens
   Check whether directories that should not be committed are included

4. **Execute after confirmation**
   Show the commit message for confirmation
   Run `git add` and `git commit`
   Ask whether a push is needed

## Notes

- Do not commit directories such as node_modules/, dist/, or .next/
- Run tests before committing to ensure the code works
- The commit message should clearly explain the change
EOF
```

如何使用：

```text
/git-commit
```

### 範例三：測試生成 Skill

```bash
mkdir -p ~/.claude/skills/gen-test
```

```bash
cat > ~/.claude/skills/gen-test/SKILL.md << 'EOF'
---
name: gen-test
description: Automatically generate unit tests for code to ensure correctness
---

You are a test engineer.

## Workflow

1. **Analyze the code**
   - Understand the function or class
   - Identify inputs and outputs
   - Find edge cases

2. **Generate tests**
   - Use an appropriate test framework
   - Cover normal cases
   - Cover edge cases
   - Cover exceptional cases

3. **Validate the tests**
   - Make sure the tests can run
   - Make sure the tests can catch problems
   - Do not over-mock the implementation

## Test frameworks

- JavaScript/TypeScript: Jest or Vitest
- Python: pytest
- Go: testing package

## Output format

Output the test code first, then explain how to run the tests.
EOF
```

如何使用：

```text
/gen-test
為 src/utils.ts 生成單元測試
```

### 範例四：文件生成 Skill

```bash
mkdir -p ~/.claude/skills/gen-readme
```

```bash
cat > ~/.claude/skills/gen-readme/SKILL.md << 'EOF'
---
name: gen-readme
description: Automatically generate a README document for a project
---

You are a technical documentation expert.

## Workflow

1. **Analyze the project**
   - Scan the project directory structure
   - Check package.json or other configuration files
   - Read the existing code

2. **Generate content**
   - Project introduction
   - Installation steps
   - Usage instructions
   - API documentation
   - Development guide

3. **Formatting**
   - Use a clear section structure
   - Add code examples
   - Add appropriate badges
   - Add license information

## Standard README structure

- Project title and introduction
- Features
- Installation
- Quick start
- Usage instructions
- API documentation
- Development guide
- Contribution guide
- License
EOF
```

如何使用：

```text
/gen-readme
為當前專案生成 README 文件
```

---

## 進階技巧

### 結合 Skills 與 Hooks

Hooks 可以在特定事件上自動執行動作。結合 Skills，可以實現更強大的自動化。

例如，儲存後自動格式化程式碼：

```json
// .claude/hooks.json
{
  "hooks": {
    "PostToolUse": [{
      "matcher": {
        "tool_name": "Edit"
      },
      "hook": {
        "type": "command",
        "command": "/format-code"  // 呼叫 format-code 技能
      }
    }]
  }
}
```

### 結合 Skills 與 Commands

Commands 是簡單的快捷指令。Skills 是複雜的工作流程。它們可以一起使用。

### 團隊協作

**共享專案 Skills**：

1. 將 Skills 放在 `.claude/skills/` 下
2. 提交到 Git
3. 團隊成員複製專案後即可使用

**版本控制**：

- Skills 可以像程式碼一樣進行版本控制
- 每次提交可以記錄 Skills 的變更
- 可以回復到舊版本

---

## 常見問題

### Q1：為什麼 Skill 沒有被觸發？

可能原因：
- YAML frontmatter 格式錯誤
- 描述不夠具體
- Claude Code 未重新啟動

解決方法：
- 檢查 YAML 格式是否正確
- 改進描述，包含具體的使用場景
- 重新啟動 Claude Code

### Q2：如何撰寫準確的描述？

好的描述包含：
- 技能的具體功能
- 使用場景，例如「當使用者提到……」
- 觸發關鍵字

**不好的範例**：
```text
description: Review code
```

**好的範例**：
```text
description: Review Pull Request code. Trigger when the user mentions PR, review, or code review.
```

### Q3：Skills 和 Commands 有什麼區別？

| Commands | Skills |
|----------|--------|
| 簡單的快捷指令 | 完整的工作流程 |
| 單一 `.md` 檔案 | 目錄結構（`SKILL.md` + 選填檔案） |
| 手動觸發 | 可以自動觸發 |
| 適合簡單操作 | 適合複雜流程 |

### Q4：如何除錯 Skill？

1. 使用 `/skills` 檢查技能是否被識別
2. 直接輸入技能名稱手動觸發
3. 檢查 `SKILL.md` 內容是否正確
4. 查看 Claude Code 日誌

---

## 參考資料

### 官方資源

- [Claude Code 官方文件 - Skills](https://docs.anthropic.com/en/docs/claude-code/configuration/skills)
- [Agent Skills 標準](https://agentskills.io/)
- [Anthropic 工程文章（Agent Skills 背後的實踐理念）](https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills)
- [Anthropic 官方 Skills GitHub 倉庫](https://github.com/anthropics/skills)
- [VS Code Copilot Agent Skills 文件](https://code.visualstudio.com/docs/copilot/customization/agent-skills)

### 資源目錄

- [skills.sh](https://skills.sh/) - Vercel 的 Agent Skills 應用商店，擁有 48,000+ 技能庫
- [find-skills](https://github.com/vercel-labs/agent-skills) - 智慧技能搜尋工具，60K+ 訂閱量
- [Skills 市場（中文介面）](https://skillsmp.com/zh) - 發現並安裝社群 Skills

### GitHub 社群專案

- [vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills) - Vercel Labs 官方 Agent Skills 集合，包含 find-skills
- [claude-code-best-practice](https://github.com/shanraisshan/claude-code-best-practice) - 由 Boris Cherny 維護的官方最佳實踐
- [everything-claude-code](https://github.com/affaan-m/everything-claude-code) - 包含預配置 Skills 的綜合工具包
- [awesome-claude-skills](https://github.com/ComposioHQ/awesome-claude-skills) - 精選 Skills 資源列表
- [superpowers](https://github.com/obra/superpowers) - 軟體開發自動化工作流程的 Skills 集合
- [jeffallan/claude-skills](https://github.com/jeffallan/claude-skills) - 66 個專業技能和 300+ 參考文件
- [awesome-agent-skills](https://github.com/JackyST0/awesome-agent-skills) - 精選資源列表

### 官方 Skill 範例

- [skill-creator](https://github.com/anthropics/skills/tree/main/skills/skill-creator) - 用於建立新技能的技能
- [mcp-builder](https://github.com/anthropics/skills/tree/main/skills/mcp-builder) - 用於建構 MCP 伺服器的技能
- [slack-gif-creator](https://github.com/anthropics/skills/tree/main/skills/slack-gif-creator) - 用於建立 Slack GIF 的技能

### 中文教學

- [Claude Code 進階配置與使用技巧完全指南](https://blog.csdn.net/2601_95335870/article/details/158460599)
- [Vibe Coding - CLAUDE.md、Skills 和 Subagents 的全鏈路實踐](https://blog.csdn.net/yangshangwei/article/details/158319117)
- [一步步教你自定義 Claude Code Skills](https://m.blog.csdn.net/u010028049/article/details/157979705)

## 進階閱讀：Claude Skills 的內部機制

接下來，我們將深入探討 Claude Skills 的內部運作方式，讓你不僅知道如何使用它們，也了解它們為什麼這樣設計。

### 第一性原理視角：基於 Prompt 的動態上下文注入

首先，理解一個關鍵事實：**Skills 不是可執行程式碼**。

Skills 本質上是高級指令，或稱 prompts，在需要時被「注入」到 Claude 的上下文中。這種設計被稱為「**基於 Prompt 的動態上下文注入與元工具架構**」。

```text
┌─────────────┐      ┌─────────────┐      ┌──────────────┐
│ 使用者請求  │ ───> │ LLM 匹配    │ ───> │ 觸發 Skill   │
└─────────────┘      │ 描述        │      └──────────────┘
                     └─────────────┘              │
                                                 ▼
                                          ┌──────────────┐
                                          │ 注入完整     │
                                          │ 指令         │
                                          └──────────────┘
                                                 │
                                                 ▼
                                          ┌──────────────┐
                                          │ 執行任務     │
                                          └──────────────┘
```

### 三層漸進式載入架構（token 優化）

為了在不消耗過多 tokens 的情況下處理大量 Skills，Claude 使用了智慧的三層載入機制：

| 層級 | 內容 | 何時載入 | Token 開銷 |
|------|------|----------|-----------|
| **第一層：元資料** | YAML frontmatter（`name + description`） | Claude 啟動時 | ~30-50 tokens/skill |
| **第二層：指令** | 完整的 `SKILL.md` 內容 | Skill 被觸發時 | ~5,000 tokens |
| **第三層：資源** | 腳本、模板、參考文件 | 按需從檔案系統存取 | 不加入上下文 |

**這種設計的優勢**：

- 假設你有 100 個 Skills。啟動時，只需消耗約 3,000-5,000 tokens 的元資料
- 只有被觸發的 Skill 才會載入完整內容
- 參考文件等資源檔案永遠不會完全載入到上下文中

**與無 Skills 相比**：

```text
沒有 Skills：每次對話需要 50,000+ tokens 來描述所有能力
有 Skills：啟動 ~100 tokens/skill + 按需載入 5,000 tokens
節省：平均每次對話節省 40,000+ tokens
```

### 雙重上下文注入機制

當 Skill 被啟用時，系統會同時進行兩項修改：

**1. 對話上下文注入**

```javascript
// 使用者看到的（可見訊息）
<command-message>The "pdf" skill is loading</command-message>

// AI 實際接收的（隱藏的元訊息）
{
  isMeta: true,  // 標記為元訊息，不在 UI 中顯示
  content: `
    # PDF 分析專家指令

    你是一位專業的 PDF 分析專家。工作流程：
    1. 使用 pdftotext 提取文字
    2. 分析文件結構
    3. 生成摘要報告
    ...
  `  // 完整的 SKILL.md 內容，可能有數千字
}
```

**2. 執行上下文修改**

除了注入指令外，Skill 還可以動態修改 Claude 的環境：

| 修改類型 | 範例 | 說明 |
|---------|------|------|
| **工具權限** | `allowed-tools: "Bash(pdftotext:*)"` | 暫時授予特定工具的存取權 |
| **模型切換** | 從 Sonnet 切換到 Opus | 某些複雜任務需要更強的推理能力 |
| **上下文隔離** | 建立子對話空間 | 避免污染主對話上下文 |

### 完全基於 LLM 推理的路由機制

這是一個非常重要的設計決策：**Claude Skills 不使用硬編碼路由**。

| 傳統方式 | Claude Skills |
|---------|--------------|
| ❌ 嵌入向量匹配 | ✅ 純 LLM 推理 |
| ❌ 分類器 | ✅ Transformer 前向傳播 |
| ❌ 正則表達式或關鍵字匹配 | ✅ 自然語言理解 |
| ❌ 獨立的路由演算法 | ✅ 統一模型決策 |

**工作流程**：

```text
1. 每個 Skill 的名稱和描述被格式化為 Skill 工具描述

2. Claude 接收：
   - 使用者訊息
   - 可用工具列表，包含 Skill 元工具
   - Skill 列表，包含名稱 + 描述

3. Claude 的自然語言理解將使用者意圖匹配到 Skill 描述

4. 匹配成功時，它會呼叫：command: "skill-name"
```

**為什麼這樣設計？**

**硬編碼路由需要**：
- 額外的維護成本
- 無法理解複雜的語意關係
- 難以處理多種語言
- 不支援模糊匹配

**純 LLM 推理**：
- 利用 Claude 自身的語言理解能力
- 自動處理多種語言、同義詞和模糊描述
- 不需額外維護
- 使路由決策更智慧

### 檔案解析機制

**`SKILL.md` 檔案結構**：

```bash
my-custom-skill/
├── SKILL.md              # 必要：核心定義檔案
├── config.json           # 選填：元資料配置
├── README.md             # 建議：使用文件
├── scripts/              # 選填：可執行腳本
├── templates/            # 選填：模板資料夾
└── references/           # 選填：參考文件
```

**解析流程**：

```text
┌─────────────────────────────────────────────────────────────┐
│                    Claude Code 啟動                          │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│  掃描 ~/.claude/skills/ 和 .claude/skills/ 目錄             │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│  使用 gray-matter 函式庫解析每個 SKILL.md                    │
│  的 YAML frontmatter                                        │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│  驗證必要欄位（name 和 description）                         │
│  - name：最多 64 個字元，只允許小寫字母、                    │
│    數字和連字號                                              │
│  - description：用於 LLM 自動匹配                            │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│  提取元資料並建構 Skill 列表                                 │
│  （只載入名稱 + 描述，不載入完整內容）                       │
└─────────────────────────────────────────────────────────────┘
```

### 完整執行流程範例

讓我們透過一個具體的例子來看整個流程：

```text
使用者：「幫我分析這個 PDF 檔案」

═══════════════════════════════════════════════════════════════

步驟 1：LLM 決策
────────────────
Claude 在 Skill 列表中找到「pdf」技能的描述：
  description: "Analyze PDF document content, extract text, generate a summary"

═══════════════════════════════════════════════════════════════

步驟 2：系統介入
────────────────
Claude Code 執行：
  1. 讀取 ~/.claude/skills/pdf/SKILL.md
  2. 生成可見訊息：「The pdf skill is loading」
  3. 生成隱藏的元訊息：完整的 SKILL.md 內容
  4. 修改對話權限：allowed-tools = ["Bash(pdftotext:*)"]

═══════════════════════════════════════════════════════════════

步驟 3：LLM 執行
────────────────
現在 Claude 的上下文包含：
  - 原始使用者請求
  - PDF 專家工作流程指令
  - pdftotext 工具的存取權限

Claude 執行：
  1. 使用 pdftotext 提取 PDF 文字
  2. 分析內容結構
  3. 生成摘要報告
  4. 將結果呈現給使用者

═══════════════════════════════════════════════════════════════

步驟 4：用後即棄
────────────────
任務完成後，完整的 Skill 內容會從上下文中移除
（只保留對話歷史，不保留完整的 Skill 指令）
```

### 核心設計創新

| 創新點 | 傳統方式 | Skills 方式 | 優勢 |
|--------|---------|------------|------|
| **能力來源** | 固定在模型權重中 | 動態載入的 prompts | 可擴展、可更新 |
| **Token 效率** | 所有能力始終佔用記憶體 | 按需載入 | 節省 80%+ tokens |
| **知識管理** | 散落在對話歷史中 | 模組化檔案系統 | 可版本控制、可共享 |
| **生命週期** | 持續佔用空間 | 用後即棄 | 更乾淨的上下文 |

### 學術基礎

Claude Skills 的設計借鑑了以下研究：

| 研究領域 | 代表作 | 在此的應用 |
|---------|---------|---------|
| **強化學習** | Voyager (2023) | 技能庫累積的理念 |
| **認知架構** | ACT-R, Soar | 程序性記憶與陳述性記憶的分離 |
| **分層策略** | Options Framework | 三層漸進式載入 |

**核心思維轉變**：

```text
傳統：AI 需要記住所有東西
      ↓
Skills：AI 知道去哪裡找專業知識
      ↓
結果：更像人類專家的思維模式
```

### 與 Agent Skills 標準的關係

Claude Skills 遵循 [Agent Skills 開放標準](https://agentskills.io/)，這意味著：

- ✅ 跨平台相容：Cursor、Windsurf、Aider 等工具也支援
- ✅ 統一檔案格式：標準化的 `SKILL.md` 結構
- ✅ 互通性：Skills 可以在不同工具之間共享

```text
Agent Skills 標準定義：
├── 必要：SKILL.md 檔案（元資料 + 指令）
├── 選填：scripts/（可執行程式碼）
├── 選填：references/（知識庫文件）
└── 選填：assets/（模板和資源）
```

### 總結：為什麼這個設計很精妙？

1. **將能力與模型解耦**：專業知識不再依賴模型訓練，可隨時透過 Markdown 檔案更新

2. **極致的 token 效率**：三層載入機制確保只載入必要的內容

3. **善用 LLM 自身的優勢**：路由和匹配完全依賴 Claude 的語言理解，無需額外演算法

4. **對開發者友善**：建立 Skill 只需撰寫 Markdown，不需程式設計

5. **可組合**：Skills 可以相互參考和組合，形成複雜的工作流程

6. **用後即棄**：完成後自動清理，保持上下文清新

---

### 總結

Skills 是將 Claude Code 從「通用助手」變成「團隊專家」的關鍵。

透過 Skills，你可以：
- 標準化工作流程
- 重複使用團隊知識
- 提升協作效率
- 減少重複解釋

記住：**如果你發現自己重複了兩次相同的指令，就應該考慮建立一個 Skill**。

現在去建立你的第一個 Skill 吧。
