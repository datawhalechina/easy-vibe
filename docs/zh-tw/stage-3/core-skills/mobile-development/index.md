# Claude Code 行動開發

## 簡介

想像這些場景：你在通勤的地鐵上突然想到一個絕妙的 bug 修復方案；在咖啡廳排隊時收到緊急的生產事故警報；陪女朋友逛街時想查看 AI 建構的專案進度。

在傳統的開發流程中，這些場景通常意味著你需要找個地方開啟筆電，或者無奈地推遲工作。但在 AI 輔助程式設計時代，規則已經改變了。Claude Code 讓你把開發環境裝進口袋，隨時隨地保持高效。

2025 年夏天，隨著 Claude Code 的普及，開發者開始探索不同的「手機寫程式」方式。從簡單的本地 Termux 使用，到複雜的 SSH + Tailscale 遠端連線，再到專門的 Happy Coder 應用程式，一個完整的行動開發生態系統逐漸成形。

本章要解決的核心問題是：如何讓 Claude Code 跟著你的手機走，成為真正的「口袋開發助理」。

---

::: info 社群回饋一覽

根據真實的社群回饋，各方案的體驗比較如下：

**Happy Coder（方案 2）**
- 連線穩定性問題：斷線情況經常發生，斷線後上下文會遺失
- 功能受限：無法使用 `/` 命令
- 安全性疑慮：依賴官方中繼伺服器，部分使用者擔心資料安全

**HAPI（方案 3）**
- 支援自建伺服器：可部署在自己的 VPS 上
- 搭配 Tailscale 體驗更好：在電腦上執行 `hapi server`，手機透過 Tailscale IP 連線
- 連線相對穩定，適合長期使用

**Claude Remote Control（官方方案）**
- 官方解決方案，原生整合 Claude Code
- 支援完整存取本地環境（MCP、工具、專案配置）
- 需要 Max 訂閱（Pro 支援即將推出）
- 依賴 Anthropic 雲端連線

**建議**：如果你對連線穩定性要求較高，或者擔心第三方中繼安全性，請選擇 **HAPI + Tailscale** 或**官方 Remote Control** 方案。

:::

---

## 核心原理：行動開發架構模式

在介紹具體方案之前，先了解問題的本質。

### 為什麼行動開發是個問題？

傳統的 IDE（如 VS Code 和 IntelliJ）需要完整的作業系統環境、強大的 CPU、大容量記憶體和儲存空間。雖然手機效能越來越強，但對於開發體驗仍有天然的限制：

**輸入限制**：虛擬鍵盤不利於編寫程式碼，複雜語法容易打錯

**螢幕限制**：小螢幕難以同時查看程式碼、終端機和瀏覽器

**環境限制**：手機無法運行完整的開發工具鏈（編譯器、資料庫、除錯器）

**連線限制**：行動網路不穩定，SSH 連線容易中斷

### 核心思想：瘦客戶端架構

所有行動開發方案背後的核心思想都是一樣的：手機只是「控制台」，真正的開發工作在別處完成。

```text
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│    ┌─────────────┐              ┌─────────────┐             │
│    │   手機      │              │ 主機/雲端   │             │
│    │ （控制器）  │   ────────►  │ （執行器）  │             │
│    │             │   命令       │             │             │
│    │ • 發送命令  │              │ • 運行 CLI  │             │
│    │ • 查看輸出  │              │ • 執行程式碼│             │
│    │ • 審查結果  │              │ • 存取檔案系統│            │
│    └─────────────┘              └─────────────┘             │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

這種架構讓手機只負責人機互動，而繁重的運算則交給你的主機或雲端。

---

## 方案 1：官方 iOS App

2025 年 10 月，Anthropic 在 iOS 應用程式中正式推出 Claude Code 行動支援。這是最簡單的行動開發選項。

### 地區限制

重要提醒：Claude 應用程式在中國大陸**無法直接使用**。

如果你在中國大陸，建議直接使用 **Happy Coder**（方案 2），透過配置的國內 API 中繼服務即可正常使用。

如果你有海外 Apple ID，可以切換地區並下載 Claude 應用程式。

### 運作原理

```text
┌─────────────┐                    ┌─────────────────┐
│  iOS App    │ ──────────────────► │ Anthropic Cloud │
│  （手機）   │   HTTPS + OAuth     │  Claude Code    │
└─────────────┘                    └────────┬────────┘
                                           │
                                           ▼
                                   ┌───────────────┐
                                   │   GitHub API  │
                                   └───────────────┘
```

你的手機應用程式只發送命令。所有程式碼執行都在 Anthropic 的雲端沙盒中運行，結果透過 GitHub 同步。

### 基本使用

**前置條件：**

- iPhone，iOS 15 或更高版本
- Claude Pro/Team/Enterprise 訂閱（免費方案不支援）
- GitHub 帳號

**步驟：**

1. 從 App Store 下載 Claude 應用程式
2. 登入你的 Anthropic 帳號
3. 在應用程式中找到「Code」分頁
4. 透過 OAuth 連接你的 GitHub 儲存庫
5. 開始建立任務

### 優缺點

優點是零設定門檻、體驗流暢、支援推播通知。缺點是僅支援 iOS、主要基於 GitHub 工作流程、功能相對有限（無法存取本地檔案系統），且在中國大陸無法直接使用。

---

## 方案 2：Happy Coder

Happy Coder 是一個開源的行動和網頁用戶端，專為 Claude Code 和 Codex 設計，具有端到端加密功能，可從任何地方遠端控制你的 AI 程式設計助理。

### 運作原理

```text
┌─────────────┐              ┌─────────────┐              ┌─────────────┐
│  Happy App  │   ────────►  │ Happy Server │   ◄────────  │happy-coder  │
│（手機/網頁）│ 加密 WS      │  （中繼）    │  WebSocket   │ （桌面端）  │
└─────────────┘              └─────────────┘              └──────┬──────┘
                                                               │
                                                               ▼
                                                        ┌─────────────┐
                                                        │Claude Code  │
                                                        │    CLI      │
                                                        └─────────────┘
```

在你的電腦上，用 `happy` 代替 `claude` 來啟動 AI 程式設計助理。當你需要手機控制時，工作階段會自動切換到遠端模式。在電腦上按任意鍵即可切回本地控制。

### 安裝和使用

**步驟 1：下載應用程式**

| 平台 | 連結 |
|------|------|
| iOS | [App Store](https://apps.apple.com/us/app/happy-claude-code-client/id6748571505) |
| Android | [Google Play](https://play.google.com/store/apps/details?id=com.ex3ndr.happy) |
| 網頁 | [app.happy.engineering](https://app.happy.engineering) |

**步驟 2：在電腦上安裝 CLI**

```bash
npm install -g happy-coder
```

**步驟 3：啟動並配對**

```bash
# 在你的專案目錄中執行
cd ~/my-project
happy

# 會顯示一個配對 QR code
```

**步驟 4：在手機上掃描配對**

開啟 Happy 應用程式，掃描電腦上顯示的 QR code。配對成功後，你就可以從手機控制 Claude Code。

**步驟 5：使用**

```bash
# 啟動 Claude Code
happy

# 或啟動 Codex
happy codex
```

### 資源連結

- [GitHub 專案](https://github.com/slopus/happy) - 原始碼
- [文件](https://happy.engineering/docs) - 使用說明
- [Discord 社群](https://discord.gg/fX9WBAhyfD) - 社群討論

### 優缺點

優點是設定簡單、跨平台支援、端到端加密和開源可審計。缺點是依賴第三方中繼基礎設施，需要在你自己的環境中驗證行動應用程式的可用性。

---

## 方案 3：HAPI

HAPI 是 Happy Coder 的替代方案，採用本地優先設計，支援跨多個 AI 模型的無縫裝置切換。

### 運作原理

```text
┌─────────────┐              ┌─────────────┐              ┌─────────────┐
│  HAPI App   │   ────────►  │ HAPI Server │   ◄────────  │    hapi     │
│（手機/PWA/  │  WireGuard   │（自建       │  WireGuard   │ （桌面端）  │
│ Telegram）  │   + TLS      │  中繼）     │   + TLS      │             │
└─────────────┘              └─────────────┘              └──────┬──────┘
                                                               │
                                                               ▼
                                                        ┌─────────────┐
                                                        │Claude Code  │
                                                        │ / Codex /   │
                                                        │ Gemini 等   │
                                                        └─────────────┘
```

HAPI 使用 WireGuard 加 TLS 進行端到端加密。所有通訊都透過加密的中繼伺服器。你可以自建中繼伺服器以完全控制資料流。

### 核心功能

- **無縫切換**：在桌面端和手機之間切換控制；按任意鍵即可回到本地控制
- **原生優先**：行動應用程式使用原生技術封裝，互動流暢
- **AFK 審批**：離開電腦時在手機上接收審批請求
- **多模型支援**：支援 Claude Code、Codex、Gemini、OpenCode 等
- **隨處終端**：透過 PWA、Telegram Mini App 等方式存取
- **語音控制**：支援語音輸入命令，讓雙手保持自由

### 安裝和使用

**步驟 1：啟動中繼伺服器**

```bash
# 在你的伺服器上執行（或直接用 npx 啟動）
npx @twsxtd/hapi hub --relay
```

**步驟 2：在電腦上安裝 CLI**

```bash
# 在你的專案目錄中執行
cd ~/my-project
npx @twsxtd/hapi

# 或全域安裝
npm install -g @twsxtd/hapi
hapi
```

**步驟 3：配對裝置**

按照終端機提示，在手機上開啟 HAPI 應用程式，掃描 QR code 完成配對。

**步驟 4：存取方式**

| 存取方式 | 說明 |
|---------|------|
| 網頁 PWA | 瀏覽器存取，支援安裝到主畫面 |
| Telegram Mini App | 直接在 Telegram 內使用 |
| 行動應用程式 | 原生應用體驗（若已發佈） |

### 與 Happy Coder 的差異

| 功能 | Happy Coder | HAPI |
|------|-------------|------|
| 設計理念 | 雲端優先 | 本地優先 |
| 加密方式 | WebSocket + E2E | WireGuard + TLS |
| 多模型支援 | Claude Code、Codex | Claude、Codex、Gemini、OpenCode |
| 存取方式 | iOS/Android/網頁 | PWA、Telegram 等 |
| 語音控制 | 否 | 是 |
| AFK 審批 | 否 | 是 |
| 自建中繼 | 需手動部署 | 開箱即用 |

### 資源連結

- [GitHub 專案](https://github.com/tiann/hapi) - 原始碼
- [PWA 文件](https://github.com/tiann/hapi/blob/main/docs/pwa.md) - PWA 安裝和使用
- [運作原理](https://github.com/tiann/hapi/blob/main/docs/how-it-works.md) - 技術實作細節
- [語音助理](https://github.com/tiann/hapi/blob/main/docs/voice.md) - 語音控制功能
- [為什麼選擇 HAPI](https://github.com/tiann/hapi/blob/main/docs/why-hapi.md) - 設計理念
- [常見問題](https://github.com/tiann/hapi/blob/main/docs/faq.md) - 常見問題解答

### 優缺點

優點是本地優先設計、多模型支援、端到端加密、語音控制和自建中繼能力。缺點是專案相對較新，生態系統仍在成長中。

---

## 方案 4：SSH + Tailscale + Tmux

這是專業開發者的最佳選擇。你透過 SSH 遠端連線到開發機器，並使用 Tmux 保持工作階段持久。

### 運作原理

```text
┌─────────────┐              ┌─────────────┐              ┌─────────────┐
│   手機      │   ────────►  │  Tailscale  │   ◄────────  │  電腦       │
│（SSH 用戶端）│   VPN P2P    │ 中繼/穿透   │   VPN P2P    │ （開發主機）│
└─────────────┘              └─────────────┘              └──────┬──────┘
                                                               │
                                                               ▼
                                                        ┌─────────────┐
                                                        │    Tmux     │
                                                        │（工作階段  │
                                                        │ 持久化）    │
                                                        └─────────────┘
```

Tailscale 建立點對點 VPN，讓你可以從任何網路存取家裡的電腦。Tmux 確保即使 SSH 斷線，Claude Code 仍會在背景繼續運行。

### 為什麼需要 Tailscale？

**傳統 SSH 的問題：**

```text
手機 (4G) ──XX──> 路由器 NAT ──XX──> 家裡電腦
             （無法穿透）    （區域網路隔離）
```

你的電腦在私有網路上，手機在公共網路上，所以直接存取會失敗。傳統解決方案需要連接埠轉發加上動態 DNS，既複雜又有風險。

**Tailscale 解決方案：**

```text
手機 (4G) ──► Tailscale 中繼 ──◄── 家裡電腦
            （自動穿透或中繼）
```

Tailscale 使用 NAT 穿透技術，如果穿透失敗會自動回退到中繼。整個連線都是加密的。

### 完整設定步驟

**步驟 1：在電腦上安裝 Tailscale**

```bash
# macOS
brew install --cask tailscale

# 或下載安裝程式
# https://tailscale.com/download
```

**步驟 2：登入並取得 IP**

```bash
# 啟動 Tailscale
sudo tailscale up

# 檢查 Tailscale IPv4
tailscale ip -4
# 範例輸出：100.x.x.x
```

**步驟 3：在手機上安裝 Tailscale**

從 App Store 或 Google Play 下載 Tailscale，使用相同的帳號登入。

**步驟 4：安裝和配置 Tmux**

```bash
# macOS
brew install tmux

# 建立 ~/.tmux.conf
cat > ~/.tmux.conf << 'EOF'
# 啟用滑鼠支援
set -g mouse on

# 預設終端機使用 256 色
set -g default-terminal "screen-256color"

# 將前綴鍵改為 Ctrl+A（選用）
unbind C-b
set -g prefix C-a

# 簡化的分割快捷鍵
bind v split-window -h
bind h split-window
EOF
```

**步驟 5：建立持久工作階段**

```bash
# 建立名為 "claude" 的工作階段
tmux new -s claude

# 在此工作階段中啟動 Claude Code
cd ~/my-project
claude

# 分離但不關閉
# 按 Ctrl+B 然後按 D
```

**步驟 6：從手機 SSH 用戶端連線**

推薦的 SSH 用戶端：

| 用戶端 | 平台 | 備註 |
|--------|------|------|
| Blink Shell | iOS | 支援 MOSH，適合不穩定網路 |
| Termius | iOS/Android | 跨平台，介面精美 |
| a-Shell | iOS | 免費且輕量 |

連線配置：

```text
Host: 100.x.x.x（你的 Tailscale IP）
Port: 22
Username: 你的電腦使用者名稱
```

連線後，附加到 Tmux：

```bash
tmux attach -t claude
```

### 進階技巧

**防止電腦進入睡眠：**

```bash
# macOS
caffeinate -dimsu &

# 或在系統設定 > 省電 > 防止自動睡眠
```

**在不穩定網路中使用 MOSH：**

MOSH（Mobile Shell）是專為行動網路優化的 SSH 替代方案，可在網路切換時無縫恢復。

```bash
# 在電腦上安裝
brew install mosh

# 從手機用戶端使用 MOSH
# Blink Shell 原生支援 MOSH
```

**一鍵連線腳本：**

在你的 SSH 用戶端中設定為啟動命令：

```bash
tmux attach -t claude || tmux new -s claude
```

這會自動附加到現有工作階段或建立新的工作階段。

### 優缺點

優點是功能完整，具備與桌面端相當的工作流程和所有開發工具。缺點是設定較為複雜，且需要保持電腦開機。

---

## 方案 5：本地 Termux 執行環境

如果你是 Android 使用者，可以直接在手機上運行 Claude Code，無需連接外部裝置。

### 運作原理

```text
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│                    ┌─────────────┐                          │
│                    │   Termux    │                          │
│                    │（Linux 環境）│                          │
│                    │             │                          │
│                    │ • Node.js   │                          │
│                    │ • Claude    │                          │
│                    │   Code CLI  │                          │
│                    │             │                          │
│                    │ • 專案      │                          │
│                    │   檔案      │                          │
│                    │ • Git       │                          │
│                    └─────────────┘                          │
│                         │                                   │
│                         ▼                                   │
│                   ┌─────────────┐                           │
│                   │Anthropic API│                           │
│                   └─────────────┘                           │
└─────────────────────────────────────────────────────────────┘
```

Termux 是 Android 上的終端機模擬器和 Linux 環境。你可以直接在其中安裝 Node.js 和 Claude Code。

### 安裝步驟

**重要**：請從 [F-Droid](https://f-droid.org/) 下載 Termux，不要從 Google Play 下載（Play 版本已過時）。

**步驟 1：安裝基礎工具**

```bash
# 更新套件管理器
pkg update && pkg upgrade

# 安裝開發工具
pkg install git nodejs python vim
```

**步驟 2：安裝 Claude Code**

```bash
npm install -g @anthropic-ai/claude-code
```

**步驟 3：配置環境**

```bash
# 建立工作區
mkdir -p ~/projects
cd ~/projects

# 初始化專案
git clone https://github.com/your-repo.git
cd your-repo

# 啟動 Claude Code
claude
```

**步驟 4：配置外接鍵盤（建議）**

在 Termux 中：

```bash
# 啟用額外按鍵列
# 長按螢幕 > 更多 > Extra keys row

# 配置快捷鍵
# 在 ~/.termux/termux.properties 中新增
extra-keys = [['ESC','/','-','HOME','UP','END','PGUP','~'], \
              ['TAB','CTRL','ALT','LEFT','DOWN','RIGHT','PGDN','|']]
```

### 效能考量

| 任務類型 | Android 效能 |
|---------|-------------|
| 網頁開發（HTML/CSS/JS） | 優秀 |
| Python 腳本 | 優秀 |
| Node.js 應用程式 | 良好 |
| 運行測試套件 | 一般 |
| 編譯大型專案 | 不建議 |

### 優缺點

優點是完全的本地控制、不依賴外部主機、離線優先運作。缺點是手機效能有限、文字輸入體驗較弱，且僅限 Android。

---

## 方案 6：Claude Code UI

Claude Code UI（也稱為 CloudCLI）是一個開源專案，為 Claude Code 提供網頁介面，支援手機瀏覽器存取。

### 運作原理

```text
┌─────────────┐              ┌─────────────┐              ┌─────────────┐
│手機瀏覽器   │   ────────►  │ 網頁伺服器  │   ◄────────  │Claude Code  │
│             │  HTTP/HTTPS  │ （本地）    │   呼叫       │    CLI      │
└─────────────┘              └─────────────┘              └─────────────┘
```

你在電腦上運行一個網頁伺服器，然後從手機瀏覽器存取。這需要區域網路存取或隧道。

### 安裝和使用

**步驟 1：安裝**

```bash
# 一鍵啟動（推薦）
npx @siteboon/claude-code-ui

# 或全域安裝
npm install -g @siteboon/claude-code-ui
claude-code-ui
```

**步驟 2：開啟介面**

伺服器預設在 `http://localhost:3001`。

**步驟 3：從手機存取**

方法 A - 區域網路存取（同一 Wi-Fi）：

```bash
# 綁定所有介面
claude-code-ui --host 0.0.0.0

# 從手機存取
http://<電腦區域網路 IP>:3001
```

方法 B - ngrok 隧道：

```bash
# 安裝 ngrok
brew install ngrok

# 啟動隧道
ngrok http 3001

# 從手機開啟 ngrok URL
```

### 功能特色

- 響應式設計，支援行動裝置
- 內建聊天介面
- 檔案瀏覽器
- Git 操作 UI
- 工作階段管理

### 優缺點

優點是圖形化介面和功能豐富。缺點是區域網路外需要隧道，設定相對較複雜。

---

## 方案 7：雲端開發環境

如果你沒有長期開機的本地電腦，可以使用雲端開發環境，讓 Claude Code 運行在雲端伺服器上。

### 運作原理

```text
┌─────────────┐              ┌─────────────┐              ┌─────────────┐
│   手機      │   ────────►  │ 雲端主機    │   ─────────► │Claude Code  │
│（瀏覽器/App）│    HTTPS     │  (DevBox)   │              │    CLI      │
└─────────────┘              └─────────────┘              └─────────────┘
```

雲端容器預裝了 Claude Code，你透過瀏覽器或行動應用程式存取。

### 使用 Sealos DevBox

**步驟 1：建立環境**

前往 [Sealos DevBox](https://sealos.io/devbox)，選擇 Claude Code 模板，建立一個環境。

**步驟 2：啟動開發環境**

環境約在 30-60 秒內準備就緒，你會得到一個網頁終端機。

**步驟 3：配置 Claude API**

```bash
export ANTHROPIC_API_KEY="your-api-key"
```

**步驟 4：連接 Happy 應用程式**

```bash
# 安裝 happy-coder（或使用預裝版本）
npm install -g happy-coder

# 生成配對 QR code
happy
```

在手機上掃描後即可立即使用。

### 雲端方案比較

| 平台 | Claude Code | 行動優化 | 啟動時間 | 費用 |
|------|------------|----------|----------|------|
| Sealos DevBox | 預裝 | Happy 支援 | ~60 秒 | 按量計費 |
| GitHub Codespaces | 手動設定 | 瀏覽器流程 | ~2-3 分鐘 | 免費額度 + 按時計費 |
| Gitpod | 手動設定 | 瀏覽器流程 | ~1-2 分鐘 | 免費額度 + 按時計費 |
| Replit | 無原生 Claude Code | 原生應用 | 即時 | 免費 + 訂閱 |

### 優缺點

優點是不需要本地電腦、環境一致性和可擴展性。缺點是付費使用、依賴網路，以及程式碼託管在雲端。

---

## 比較與選擇

每個方案都有不同的優勢，適用於不同的場景。

### 比較表

| 方案 | 難度 | 需要隧道 | 費用 | 最佳場景 |
|------|------|---------|------|----------|
| 官方 iOS App | 簡單 | 否 | $20/月 | 快速查看、簡單任務 |
| Happy Coder | 較簡單 | 否 | 免費 | 日常使用、便利性 |
| HAPI | 中等 | 否 | 免費 | 多模型、本地優先 |
| SSH + Tailscale | 較複雜 | 否 | 免費 | 專業開發、完整功能 |
| Termux | 中等 | 否 | 免費 | Android 本地開發 |
| Claude Code UI | 中等 | 是 | 免費 | 偏好網頁介面 |
| 雲端 DevBox | 簡單 | 否 | 按量計費 | 無本地電腦 |

### 選擇指南

**如果你在中國大陸**：使用 **Happy Coder**；搭配國內 API 中繼配置，使用效果良好。

**如果你想要最大的便利性**：選擇 Happy Coder。掃碼即用的流程非常方便。

**如果你需要多模型支援**：選擇 HAPI。它支援多個 AI 程式設計助理，非常適合需要切換模型的工作流程。

**如果你有一台長期開機的電腦**：選擇 SSH + Tailscale。這會帶來最完整的體驗。

**如果你是 iPhone 使用者（中國大陸以外）**：官方應用程式是最容易上手的方式。

**如果你只有 Android**：Termux 提供了完全本地的行動開發路徑。

**如果你沒有電腦**：雲端 DevBox 是理想選擇。

---

## 安全與隱私

行動開發涉及透過網路傳輸程式碼，因此安全性需要特別注意。

### 中繼伺服器的風險

使用依賴中繼的服務（如 Happy Coder 或 HAPI）時，請考慮以下風險：

```text
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  中繼伺服器可能看到什麼？                                  │
│                                                             │
│  • 加密前的資料（如果 E2E 實作不佳）                       │
│  • 元資料（你何時連線、工作階段持續多久）                  │
│  • 你的 API 金鑰（如果配置不當）                            │
│                                                             │
│  中繼伺服器可能做什麼？                                    │
│                                                             │
│  • 記錄你的程式碼內容                                      │
│  • 竊取 API 憑證                                           │
│  • 注入惡意命令                                            │
│  • 將你的裝置濫用為攻擊節點                                │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 安全最佳實踐

**1. 程式碼敏感度分級**

```text
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  公開專案/學習程式碼 -> 任何方案都可以                      │
│                                                             │
│  私有專案 -> 優先選擇 SSH+Tailscale 或自建中繼             │
│                                                             │
│  商業程式碼 -> 僅使用 SSH+Tailscale，停用所有              │
│  第三方中繼路徑                                            │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**2. 金鑰管理**

```bash
# 不要在原始碼中寫死金鑰
const apiKey = "sk-ant-xxxxx"

# 使用環境變數
const apiKey = process.env.ANTHROPIC_API_KEY

# 使用 .env 檔案（加入 .gitignore）
ANTHROPIC_API_KEY=sk-ant-xxxxx
```

**3. 使用沙盒模式**

Claude Code 支援沙盒模式以限制存取範圍：

```bash
claude --sandbox /path/to/project
```

**4. 自建中繼**

如果使用 Happy Coder，考慮自建中繼伺服器：

```bash
# 複製專案（包含伺服器實作）
git clone https://github.com/slopus/happy.git
cd happy

# 將伺服器部署到你的 VPS
# 詳情請參考專案文件
```

**5. 使用 Headscale**

Headscale 是 Tailscale 的開源實作，可以自行託管：

```bash
# 一鍵 Docker 部署
docker run -d \
  --name headscale \
  -v /srv/headscale:/etc/headscale \
  -p 3478:3478/udp \
  -p 8080:8080 \
  headscale/headscale:latest
```

---

## 常見問題

### 我需要 NAT 穿透嗎？

大多數現代方案**不需要**手動 NAT 穿透：

| 方案 | 原理 |
|------|------|
| Happy Coder | 中繼模式，雙方主動連線到伺服器 |
| HAPI | 中繼模式，WireGuard + TLS |
| Tailscale | NAT 穿孔或中繼 |
| iOS App | 雲端執行 |
| Claude Code UI | 需要入站存取 |

### 為什麼中繼模式不需要穿透？

```text
出站連線（NAT 允許）：
電腦 ──► 中繼伺服器 可以

入站連線（NAT 阻擋）：
外部 ──► 電腦 不行

中繼技巧：
雙方都向中繼發起出站連線，
所以兩端都不需要入站連線能力。
```

### 行動開發會影響電池續航嗎？

不同方案的耗電量不同：

| 方案 | 耗電量 | 原因 |
|------|--------|------|
| SSH 終端機 | 低 | 僅渲染文字 |
| iOS App | 中 | 雲端執行，手機僅控制 |
| Termux | 高 | 本地 CLI 運行 |
| 瀏覽器 | 中 | 網頁 UI 渲染負載 |

長時間使用時，建議保持手機充電。

### 網路斷線時會怎樣？

| 方案 | 網路斷線的影響 |
|------|---------------|
| SSH + Tmux | Claude 繼續運行；重新連線後恢復 |
| Happy Coder | 自動重新連線 |
| HAPI | 自動重新連線 |
| iOS App | 雲端繼續；應用程式顯示斷線 |
| Termux | 工作階段中斷 |

### 我可以在手機上編譯大型專案嗎？

不建議。手機 CPU 和記憶體有限，大型建構可能導致：

- 嚴重發燙
- 電池快速耗盡
- 編譯時間非常長

請在遠端主機或雲端環境中執行繁重的建構任務。

---

## 總結

Claude Code 行動開發的核心思想是：**手機是控制器，真正的開發在別處運行**。

你應該選擇哪個方案取決於你的具體需求。

如果你在中國大陸，推薦使用 **Happy Coder**，特別是搭配國內 API 中繼配置。

如果你想要最方便的設定，使用 **Happy Coder**。掃碼連線、接收推播通知、順暢切換裝置。

如果你需要多模型支援或本地優先架構，使用 **HAPI**。它支援多個助理和自建中繼。

如果你想要最完整的開發體驗，使用 **SSH + Tailscale**。設定較為複雜，但功能最接近桌面端。

如果你是中國大陸以外的 iOS 使用者，**官方應用程式**是最容易入門的方式。

如果你是 Android 使用者，**Termux** 可以實現完全本地的手機開發。

如果你沒有長期開機的電腦，**雲端 DevBox** 是理想的選擇。

無論選擇哪個方案，安全都很重要：對敏感程式碼謹慎使用第三方中繼，妥善管理 API 金鑰，重要專案優先選擇自建或私有路徑。

---

## 參考資料

### 官方資源

- [Claude Code 官方文件](https://docs.anthropic.com/en/docs/claude-code) - 完整的官方 Claude Code 文件
- [Claude iOS App](https://apps.apple.com/app/claude/id6473753684) - 官方 iOS 應用程式

### 開源專案

- [slopus/happy](https://github.com/slopus/happy)（2.5k stars）- Happy Coder 行動用戶端
- [tiann/hapi](https://github.com/tiann/hapi) - HAPI 本地優先多模型 AI 程式設計助理
- [siteboon/claudecodeui](https://github.com/siteboon/claudecodeui) - Claude Code UI（CloudCLI）
- [juanfont/headscale](https://github.com/juanfont/headscale)（19k stars）- 開源 Tailscale 實作

### 中文教學

- [隨時隨地寫程式碼：在手機上配置 Claude Code](https://m.blog.csdn.net/haa_y/article/details/151156494) - Termux 設定指南
- [口袋裡的 AI 實驗室：永遠在線的 Claude Code 行動工作流](https://www.cnblogs.com/swizard/p/19308983) - Tmux + Docker 方案
- [我帶著 Claude Code 陪女朋友逛街](https://post.m.smzdm.com/p/a3r7d63d/) - Tailscale 遠端連線
- [從手機打造生產級應用](https://m.toutiao.com/article/7611823834756301318/) - 真實行動開發案例

### 英文資源

- [The Definitive Guide to Using Claude Code on Your Phone | Sealos Blog](https://sealos.io/blog/claude-code-on-phone/) - 最全面的手機開發指南
- [SSH + Tailscale + Termius 完整指南](https://m.blog.csdn.net/Lvyizhuo/article/details/157692953) - 詳細的遠端連線指南

### 工具下載

- [Tailscale](https://tailscale.com/download) - 點對點 VPN 工具
- [Termux（F-Droid）](https://f-droid.org/en/packages/com.termux/) - Android 終端機模擬器
- [Blink Shell](https://blink.sh/) - iOS SSH 用戶端（支援 MOSH）
- [Termius](https://termius.com/) - 跨平台 SSH 用戶端
