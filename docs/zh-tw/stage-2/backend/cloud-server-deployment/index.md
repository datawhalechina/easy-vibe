<script setup>
import RelatedArticlesSection from '../../../../.vitepress/theme/components/RelatedArticlesSection.vue'
import { relatedArticlesMap } from '../../../../.vitepress/theme/data/relatedArticles'
</script>

# 把網站發到網上（進階方式）：自己買臺 VPS 伺服器搭建發佈

> 💡 **什麼叫「把網站發到網上」？** 也叫「上線」或「部署發佈」。你在本地電腦寫好的網站，只有你自己能開啟；**「發到網上」就是把它放到一台 24 小時開機的伺服器上，讓任何一個人在瀏覽器裡輸入網址就能訪問到**——就像你寫了一篇 Word 文件只有自己電腦能看，發到公眾號／部落格後所有人都能看一樣，只不過這次發上去的是一個完整的網站。

上一章我們學了最簡單的「一鍵發佈」方式（用 Vercel／Zeabur 這類平台，連倉庫即上線），這一章講更靈活、也更徹底的方式：**自己買一台雲伺服器，從頭到尾把網站搭起來發佈出去**。你會學到怎麼選伺服器、怎麼連線上去、怎麼裝環境、怎麼設定 Nginx、怎麼綁網域開 HTTPS——搞懂之後，沒有任何平台能限制你，想跑什麼服務就跑什麼。

---

# 0. 先選對：部署平台全景決策圖

選平台之前，先回答三個問題：

1. **你的專案需要 24 小時線上嗎？**
   - 不需要（使用者訪問時才回應，比如文件站、部落格、普通網站）→ 選 **靜態託管／PaaS**
   - 需要（定時任務、爬蟲、Telegram／Discord Bot、WebSocket 服務）→ 選 **常駐型 PaaS 或 VPS**

2. **你需要 GPU 嗎？**
   - 不需要（只呼叫 OpenAI／Anthropic API）→ 普通平台即可
   - 需要（自己跑開源模型、產生圖片／影片）→ 選 **GPU 雲平台**（Modal、Replicate、AutoDL 等）

3. **你的使用者主要在哪裡？**
   - 國內 → 優先國內雲（阿里雲／騰訊雲）或 Cloudflare（國內訪問快）
   - 海外 → Vercel／Railway／Fly.io／AWS 隨便選
   - 都有 → 用 CDN，國內放國內，海外放海外

根據這三個問題，對應下面的決策路徑：

```
你的項目是什麼類型？
│
├─ 純前端靜態站（Vite/React/Vue 構建產物）
│   ├─ 完全免費 → Cloudflare Pages（無限頻寬）/ GitHub Pages
│   ├─ Next.js 項目 → Vercel（官方平台，體驗最好）
│   └─ 國內使用者為主 → Cloudflare Pages 或 國內 OSS+CDN
│
├─ 有後端 API，但不需要 24 小時常駐（請求觸發）
│   ├─ Node.js/Python API → Vercel Functions / Cloudflare Workers
│   └─ 全端框架（Next.js/Nuxt/SvelteKit）→ Vercel
│
├─ 需要常駐進程（Bot、定時任務、WebSocket）
│   ├─ 不想管伺服器 → Railway / Render / Fly.io
│   ├─ 想完全控制 & 省錢 → 買 VPS（騰訊雲輕量/阿里雲輕量/Vultr/Hetzner）
│   └─ 國內項目 → 騰訊雲輕量應用伺服器
│
├─ 需要跑 AI 模型/需要 GPU
│   ├─ 推理 API → Modal / Replicate / Hugging Face Inference
│   ├─ 國內 GPU → AutoDL（便宜）/ 阿里雲 PAI
│   └─ 訓練/Fine-tune → Modal / Lambda Labs / 國內 GPU 雲
│
└─ 大型生產項目
    └─ AWS/GCP/阿里雲 + Kubernetes（找維運或讓 AI 幫你寫 Terraform）
```

---

# 1. 免費／低成本部署平台詳解（不用買伺服器）

對於大多數個人專案、Demo、作品集，你**完全不需要買伺服器**。這一節詳細介紹各個免費／低成本平台，告訴你怎麼註冊、怎麼用、有什麼雷。

## 1.1 Vercel — Next.js 官方平台，前端首選

![Vercel 首頁](/zh-cn/stage-2/backend/cloud-server-deployment/images/vercel.png)

**官網**：https://vercel.com

**適合什麼：** Next.js 專案、React/Vue 前端、帶 Serverless Functions 的全端應用、AI Chatbot（回應快的）

**怎麼用：**
1. 用 GitHub 帳號登入 Vercel
2. 點擊 "Add New..." → "Project"
3. 選擇你的 GitHub 倉庫
4. Vercel 自動偵測框架（Next.js/Vite/React 等），填好環境變數
5. 點 "Deploy"，等 1-2 分鐘就上線了，自動給你一個 `xxx.vercel.app` 網域

**免費額度（Hobby 方案）：**
- 100 GB 頻寬／月
- 100 小時構建時間／月
- Serverless Function 執行時長 **10 秒**（這是最關鍵的限制！）
- 自動 HTTPS、全球 CDN、PR 預覽連結

**付費（Pro，$20／月）：**
- Function 執行時長延長到 60-300 秒
- 1 TB 頻寬
- 團隊協作功能

**⚠️ 關鍵限制（新手常踩的雷）：**
- **Serverless Function 逾時 10 秒**：AI API 呼叫超過 10 秒就會斷（免費版）。Pro 版 $20／月可延長到 60 秒，300 秒需額外付費
- **不能跑常駐進程**：沒有 cron、沒有 WebSocket 長連線、沒有永遠線上的 Bot
- **冷啟動**：長時間沒人訪問的 Function 首次請求會慢一點
- **AI 專案成本**：AI 串流輸出耗頻寬，使用者多了之後 Pro 版帳單可能飆到 $200／月

**結論**：部署前端頁面、文件站、快速 Demo → Vercel 是最順暢的選擇。但需要常駐進程或長時間 AI 呼叫的 Agent → 不要選 Vercel。

## 1.2 Cloudflare Pages — 無限頻寬，國內訪問快

![Cloudflare Pages 首頁](/zh-cn/stage-2/backend/cloud-server-deployment/images/cloudflare-pages.png)

**官網**：https://pages.cloudflare.com

**適合什麼：** 靜態站點、需要大頻寬的專案、國內使用者為主的網站、Edge Functions

**免費額度：**
- **無限頻寬**（這是最大賣點！）
- 500 次構建／月
- Unlimited 請求數
- Cloudflare Workers 100,000 請求／天
- 全球 300+ 邊緣節點，國內訪問速度比 Vercel/Netlify 快很多

**怎麼用：**
1. 註冊 Cloudflare 帳號（免費）
2. 進入 Workers & Pages → Create → Pages → Connect to Git
3. 選擇倉庫，設定構建指令（Vite 是 `npm run build`，輸出目錄 `dist`）
4. 點 Save and Deploy

**配套的 Workers AI：** Cloudflare 還提供在邊緣節點直接跑開源 AI 模型的能力（Llama 3、Mistral、Stable Diffusion 等），免費額度每天 10,000 神經元（推理單位）。適合不想依賴 OpenAI API、想在邊緣跑小模型的場景。

**結論**：靜態站首選，尤其是面向國內使用者的專案，Cloudflare Pages 的國內訪問速度和無限頻寬是殺手鐧。

## 1.3 Netlify — 老牌靜態託管，外掛生態豐富

![Netlify 首頁](/zh-cn/stage-2/backend/cloud-server-deployment/images/netlify.png)

**官網**：https://www.netlify.com

**免費額度：** 100 GB 頻寬／月 + 300 分鐘構建時間

**特點：** 外掛市集非常豐富（表單處理、圖片最佳化、A/B 測試等），支援分支預覽，企業級功能多。適合需要更多內建功能的靜態站專案。

**和 Vercel 的區別：** Netlify 更中立，不綁定特定框架；Vercel 對 Next.js 有深度最佳化。純靜態站選哪個都行。

## 1.4 Railway — 部署後端的最佳體驗（常駐服務）

![Railway 首頁](/zh-cn/stage-2/backend/cloud-server-deployment/images/railway.webp)

**官網**：https://railway.app

**適合什麼：** 需要常駐執行的後端服務、Node.js/Python/Go API、Discord/Telegram Bot、需要資料庫的全端專案

**怎麼用：**
1. GitHub 帳號登入
2. New Project → Deploy from GitHub repo（或選模板）
3. Railway 自動偵測你的專案類型，自動安裝依賴、構建、啟動
4. 可以一鍵新增 PostgreSQL/Redis/MySQL/MongoDB 資料庫
5. 自動給網域，也可以綁定自訂網域

**定價：**
- 新使用者註冊送 **$5 試用額度**（不是永久免費）
- 之後按用量計費，大概 $5／月起（一個最小規格的常駐服務 + 資料庫）
- 閒置 5 分鐘後休眠（免費試用期間）；付費後不睡眠

**⚠️ 關鍵限制：**
- 沒有真正的永久免費層，$5 用完就停
- 按用量計費，成本不可預測（但對小專案來說通常落在 $5-15／月）
- 沒有原生 GPU 支援

**結論**：部署後端 API、Bot、需要資料庫的全端應用，Railway 的體驗是最好的——連 GitHub 自動部署、內建資料庫、日誌監控全都有，不用寫 Dockerfile。適合不想折騰伺服器但需要比 Vercel 更靈活的場景。

## 1.5 Zeabur — 國內開發者友善的 PaaS

![Zeabur 首頁](/zh-cn/stage-2/backend/cloud-server-deployment/images/zeabur.webp)

**官網**：https://zeabur.com

**適合什麼：** 國內開發者、需要國內訪問速度的專案、從 Vercel/Heroku 遷移的專案

**特點：**
- 國產 PaaS 平台，中文介面，國內訪問速度好
- 支援 Node.js、Python、Go、Rust、Docker 等幾乎所有語言
- 一鍵部署常見模板（WordPress、Ghost、Uptime Kuma 等）
- 內建 MySQL/PostgreSQL/Redis/MongoDB 資料庫
- 免費額度可用，付費方案 ¥30／月起

**怎麼用：** 我們已經在 [上一章](./../zeabur-deployment/) 詳細講過 Zeabur 的使用方法，這裡不再贅述。

## 1.6 Render — 750 小時免費，但會休眠

**官網**：https://render.com

**適合什麼：** 學習階段、個人專案、不介意冷啟動的小專案

**免費額度：**
- Web Service：750 小時／月（一個實例可以一直跑）
- PostgreSQL：免費 90 天（⚠️ 到期資料庫被刪！）
- 靜態站：完全免費，100 GB 頻寬

**⚠️ 關鍵問題：**
- **15 分鐘無訪問就休眠**，首次喚醒需要 10-30 秒冷啟動（使用者體驗差）
- 免費資料庫 90 天後被刪除，記得備份！
- 冷啟動期間使用者看到的就是轉圈或逾時

**結論**：適合開發測試、課程作業，但不要把面向使用者的生產專案放在免費層。付費 $7／月起，可以關閉休眠。

## 1.7 Fly.io — 真正 7×24 線上的免費容器

![Fly.io 首頁](/zh-cn/stage-2/backend/cloud-server-deployment/images/flyio.webp)

**官網**：https://fly.io

**適合什麼：** 需要全球分佈的低延遲服務、想要真正 7×24 小時免費執行的容器、能接受一點學習曲線

**免費額度：**
- 3 台微型共享 VM（micro-1x，256 MB 記憶體）
- **不限執行時間**（不像 Render 會休眠）
- 160 GB 出站流量／月
- 3 GB 持久化磁碟區
- 全球 30+ 資料中心可選
- 支援 GPU（A100/H100）

**怎麼用：**
1. 註冊需要綁信用卡（不扣錢，驗證身份）
2. 安裝 flyctl CLI
3. 在專案目錄寫 `fly.toml` 設定檔（AI 可以幫你產生）
4. `fly launch` → 自動構建 Docker 映像、分配 IP、部署
5. `fly deploy` 更新，`fly logs` 看日誌

**⚠️ 注意：**
- 需要會寫 Dockerfile 或使用 buildpack
- 學習曲線比 Railway 陡
- 超出免費額度按量計費，但小專案基本上不會超

**結論**：如果你需要一個**真正 24 小時線上**的免費容器跑 Bot/API/定時任務，Fly.io 是目前最好的免費選擇。缺點是需要學一下 flyctl 命令列和 Docker。

## 1.8 其他值得了解的免費／低成本平台

| 平台 | 類型 | 免費額度 | 特點 |
|------|------|---------|------|
| **GitHub Pages** | 靜態站 | 無限（100GB 軟限制） | 最省心，推 GitHub 就上線，適合部落格／文件 |
| **Hugging Face Spaces** | AI 應用 | 免費 CPU 小實例 | 專門部署 AI Demo（Gradio/Streamlit），社群活躍 |
| **Modal** | AI/Serverless GPU | $30／月額度 | Python 函式即服務，GPU 冷啟動 < 4 秒，適合 AI 推理 |
| **Replicate** | AI 模型託管 | 按呼叫付費 | 把模型變成 API，不用管基礎設施 |
| **Denoland Deploy** | Deno/Edge | 免費 100k 請求／天 | Deno 官方平台，TypeScript 原生支援 |
| **Koyeb** | 全端 PaaS | 免費 1 個服務 | 支援 Docker，全球邊緣部署 |
| **Railway 模板** | 一鍵部署 | - | 有上百個開源專案模板，點一下就部署（如 Uptime Kuma、Plausible） |
| **Supabase** | 後端即服務 | 免費 500MB 資料庫 | Firebase 的開源替代品，Postgres+Auth+Storage |
| **Neon** | Serverless Postgres | 免費 500MB | 分支資料庫，適合 Serverless 架構 |
| **Upstash** | Serverless Redis | 免費 10k 指令／天 | 按請求計費的 Redis，適合 Serverless 專案 |

---

# 2. 國內雲伺服器詳細購買指南

如果你需要完全控制伺服器環境、跑自訂服務、或者 PaaS 滿足不了需求，那就買一台自己的雲伺服器。這一節手把手教你怎麼在國內三大雲廠商買伺服器。

## 2.1 選哪家？國內三大雲廠商對比

### 騰訊雲輕量應用伺服器（推薦新手）

![騰訊雲輕量應用伺服器](/zh-cn/stage-2/backend/cloud-server-deployment/images/tencent-lighthouse.webp)

**官網**：https://cloud.tencent.com/product/lighthouse

**推薦理由：**
- **最便宜**：新使用者 2核2G 4M 頻寬只要 99 元／年，限時搶購最低 38 元／年
- **操作最簡單**：主控檯直觀，一鍵應用映像（WordPress、寶塔面板、Docker 等開箱即用）
- **頻寬給得大方**：入門款 4-5 Mbps，銳馳型方案有 200 Mbps 無限流量
- **微信生態整合好**：部署小程式後端、公眾號服務很方便

**怎麼買：**
1. 註冊騰訊雲帳號，完成實名認證
2. 開啟輕量應用伺服器購買頁：https://cloud.tencent.com/product/lighthouse
3. 點擊「立即選購」
4. 選擇設定：
   - **地區**：離你的使用者最近的（南方選廣州、北方選北京、海外選香港／新加坡）
   - **映像**：選「系統映像」→ **Ubuntu 22.04 LTS**（最推薦新手）
   - **方案**：入門選 2核2G 4M 方案（~99元／年）；預算夠選 2核4G 5M（~198元／年）
   - **時長**：建議直接買 1 年，新使用者折扣只有首單
5. 確認訂單，付款
6. 購買成功後，進入「主控檯」→「輕量應用伺服器」就能看到你的伺服器了
7. **重設密碼**：點進伺服器詳情 → 重設密碼（設一個強密碼）
8. **設定防火牆**：在「防火牆」分頁新增規則：
   - TCP:80（HTTP）
   - TCP:443（HTTPS）
   - TCP:22（SSH）
   - 其他連接埠按需開放（比如 3000 除錯用）

**學生優惠：** 完成學生認證後 2核2G 4M 約 10 元／月。前往 https://cloud.tencent.com/act/campus 申請。

### 阿里雲輕量應用伺服器

![阿里雲輕量應用伺服器](/zh-cn/stage-2/backend/cloud-server-deployment/images/aliyun-lighthouse.webp)

**官網**：https://www.aliyun.com/product/swas

**推薦理由：**
- **文件最豐富**：網上教學最多，遇到問題容易搜到答案
- **免費學生機**：學生認證（學信網）後 2核2G 免費 1-3 個月，還有 300 元抵用券
- **穩定性好**：ESSD 雲端磁碟效能強，企業級穩定性
- **生態最全**：配套的 CDN、OSS、RDS、網域等服務最完善

**怎麼買：**
1. 註冊阿里雲帳號，完成實名認證
2. 學生使用者先去「飛天加速計畫」領免費券：https://university.aliyun.com/
3. 開啟輕量應用伺服器：https://www.aliyun.com/product/swas
4. 點擊「立即購買」
5. 選擇設定：
   - **地區**：同騰訊雲，選近的。香港／新加坡免備案但頻寬小
   - **映像**：Ubuntu 22.04 LTS
   - **方案**：入門 2核2G 3M ~99 元／年
6. 付款後到主控檯查看伺服器
7. **重設密碼**：實例詳情 → 重設實例密碼
8. **設定防火牆**：「安全群組」／「防火牆」放行 22、80、443 連接埠

**學生免費領：** 前往 https://university.aliyun.com/ → 學生認證 → 領 300 元券 → 0 元購機。

### 華為雲耀雲伺服器 HECS

**官網**：https://www.huaweicloud.com/product/hecs.html

**推薦理由：**
- 企業級穩定性，安全防護能力強
- 學生價約 9 元／月（1核2G）
- 不限制 CPU 使用率（部分廠商突發效能實例會限速）
- 可選鯤鵬 ARM 架構（有國產化需求時有用）

**不足：** 文件和社群不如阿里雲／騰訊雲豐富，新手入門資料較少。

## 2.2 海外 VPS 選擇（不想備案／面向海外使用者）

如果你的使用者主要在海外，或者不想做備案（國內伺服器必須備案才能用 80／443 連接埠），選海外 VPS：

| 廠商 | 入門價格 | 特點 | 適合族群 |
|------|---------|------|---------|
| **Vultr** | $2.5／月（IPv6 only）／ $5／月 | 按小時計費，隨時銷毀，20+ 全球節點 | 新手練手、快速測試 |
| **DigitalOcean** | $4／月 | 文件極佳，社群教學多，Droplet 一鍵部署 | 想學習的人 |
| **Hetzner** | €3.49／月（CX22） | CP 值之王，歐洲廠商，網路穩定 | 追求 CP 值的長期專案 |
| **AWS Lightsail** | $3.5／月（首年免費） | 亞馬遜旗下，免費 1 年 | 想用 AWS 生態的人 |
| **RackNerd** | ~$10／年（年付） | 超低價，適合非核心專案練手 | 純練手、預算極低 |
| **雨雲** | ¥10／月起 | 國內廠商營運的海外 VPS，支付寶付款方便 | 國內使用者圖方便 |

![Vultr 首頁](/zh-cn/stage-2/backend/cloud-server-deployment/images/vultr.png)

**Vultr 購買流程（其他海外廠商類似）：**
1. 前往 https://www.vultr.com/ 註冊帳號（需要信箱+信用卡/PayPal）
2. 點擊 "Deploy Server"
3. 選擇：
   - **Server Type**: Ubuntu 22.04 LTS
   - **Server Size**: $5／月的 Regular Performance（1 vCPU / 1GB 記憶體，足夠入門）
   - **Location**: 選離使用者近的（Tokyo/Singapore 對國內速度好一些；美西對國內延遲高但便宜）
4. 不用加額外選項，點 "Deploy Now"
5. 等 1-2 分鐘，伺服器建立完成，在 Products 頁面能看到 IP 和密碼
6. 海外 VPS 沒有額外的「安全群組」，系統裝好防火牆預設關閉，連上後自己設定 `ufw`

**⚠️ 注意：** 海外 VPS 不備案，但從國內訪問延遲較高（香港 ~50ms，新加坡 ~100ms，美西 ~200ms）。對延遲敏感的專案建議用國內伺服器+備案。

## 2.3 備案問題（國內伺服器必須了解）

**什麼是備案？** 中國大陸的伺服器要綁定網域對外提供 Web 服務（80／443 連接埠），必須在工信部做 ICP 備案，免費但需要 7-20 天審核。

**備案規則：**
- 用國內節點（阿里雲／騰訊雲／華為雲國內地區）→ **必須備案**才能透過網域訪問 80／443
- 用中國香港／海外節點 → **不需要備案**，網域直接解析就能用
- 備案免費，在雲廠商主控檯提交資料（身份證、人臉核驗、網域資訊）
- 備案期間網域不能訪問，可以先買伺服器設定環境
- 個人備案和企業備案流程類似，個人備案不能做經營性網站

**建議：**
- 面向國內使用者 → 買國內伺服器 + 花 2-3 週備案（備案期間可以開發）
- 想快速上線／面向海外 → 香港節點或海外 VPS，跳過備案
- 不想備案但想要國內速度 → Cloudflare Pages（CDN 國內有節點）

---

# 3. 連接伺服器 & 基礎環境設定

## 3.1 第一次 SSH 連接伺服器

買好伺服器後，你會拿到：
- **公網 IP 位址**（比如 `123.45.67.89`）
- **登入使用者名稱**（Ubuntu 映像預設是 `root` 或 `ubuntu`）
- **登入密碼**（你在購買時設定的，或者在主控檯重設的）

**如果你用 macOS / Linux：** 直接開啟終端機，輸入：

```bash
ssh root@你的伺服器IP
# 例如：ssh root@123.45.67.89
```

**如果你用 Windows：** 推薦用 Windows Terminal + 內建 OpenSSH（Win10/11 內建），或使用 FinalShell（中文、圖形化）、Xshell 等工具。

第一次連接會提示：

```
The authenticity of host '123.45.67.89 (123.45.67.89)' can't be established.
ED25519 key fingerprint is SHA256:xxxxxx.
Are you sure you want to continue connecting (yes/no/[fingerprint])?
```

輸入 `yes` 回車，然後輸入密碼。看到類似這樣的提示字元，就說明登入成功了：

```
Welcome to Ubuntu 22.04.3 LTS!
root@your-server:~#
```

**設定 SSH 金鑰登入（推薦，免密碼+更安全）：**

```bash
# 在你本地電腦執行（不是伺服器上）
# 產生金鑰（如果已經有就跳過）
ssh-keygen -t ed25519

# 把公鑰傳到伺服器
ssh-copy-id root@你的伺服器IP

# 之後就可以免密碼登入了
ssh root@你的伺服器IP
```

> 🎯 **AI 輔助提示**：如果你連不上伺服器，直接把報錯資訊複製給 AI：「我 ssh root@xxx 連不上，報錯是 xxx，幫我排解」。AI 會從網路、安全群組、防火牆、金鑰權限等角度一步步幫你找原因。

## 3.2 設定安全群組／防火牆（非常重要！）

**雲廠商安全群組（主控檯操作）：** 購買伺服器後，一定要在雲廠商主控檯的「安全群組」／「防火牆」裡放行連接埠：

| 連接埠 | 用途 | 建議 |
|------|------|------|
| **22** | SSH 登入 | 必開，建議限制為自己的 IP |
| **80** | HTTP 訪問 | 必開 |
| **443** | HTTPS 訪問 | 必開 |
| **3000-3999** | Node.js 開發連接埠 | 除錯時暫時開啟，部署完關閉 |
| **8080** | 常見備用連接埠 | 按需 |

**伺服器內部防火牆（登入後執行）：**

```bash
# 安裝 ufw
apt install -y ufw

# 允許 SSH、HTTP、HTTPS
ufw allow ssh
ufw allow http
ufw allow https

# 啟用防火牆
ufw enable

# 查看狀態
ufw status
```

> ⚠️ 安全群組是雲廠商層面的防火牆，ufw 是伺服器內部的防火牆。**兩層都需要放行才能訪問。新手最常見的雷就是程式跑起來了但訪問不到，90% 是安全群組沒開連接埠。**

## 3.3 初始化伺服器環境

登入伺服器後，你可以**直接把下面這段話複製給你的 AI 程式設計助手**，讓它幫你產生完整初始化指令：

> 「我剛買了一台 Ubuntu 22.04 的雲伺服器，打算部署一個 [Node.js/Python/...] 專案，幫我寫出完整的初始化指令，包括：更新系統、建立非 root 使用者、設定 SSH 金鑰登入、安裝 Docker/Nginx/Node.js、設定基礎防火牆。」

下面是一個典型的初始化流程，供你參考理解：

```bash
# 1. 更新系統 & 安裝基礎工具
apt update && apt upgrade -y
apt install -y curl wget git vim ufw build-essential

# 2. 建立一般使用者（不要一直用 root）
adduser yourname
usermod -aG sudo yourname

# 3. 安裝 Node.js（用 nvm，不要用 apt）
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
source ~/.bashrc
nvm install 20
node -v  # 驗證

# 4. 安裝 Nginx
apt install -y nginx
systemctl start nginx
systemctl enable nginx
# 瀏覽器訪問 http://你的IP，應該看到 Nginx 歡迎頁

# 5. 安裝 Docker（如果用容器部署）
curl -fsSL https://get.docker.com | sh
usermod -aG docker yourname  # 免 sudo
docker --version
```

---

# 4. 三種典型部署場景實作

環境設定好之後，我們來看三種常見的部署方式。

## 4.1 場景一：部署純前端靜態站（Vite/React/Vue）

`npm run build` 後會產生 `dist/` 目錄，裡面是純 HTML/CSS/JS 檔案。

**把程式碼傳到伺服器：**

```bash
# 方式一：在本地用 rsync 傳到伺服器
rsync -avz --exclude=node_modules ./dist/ yourname@你的IP:/var/www/myapp/

# 方式二：在伺服器上 git clone（推薦，更新方便）
cd /var/www
sudo git clone https://github.com/你的使用者名稱/你的倉庫.git myapp
cd myapp
npm install
npm run build
```

**設定 Nginx：**

```bash
sudo vim /etc/nginx/sites-available/myapp
```

寫入：

```nginx
server {
    listen 80;
    server_name 你的IP或網域;

    root /var/www/myapp/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;  # 前端路由 history 模式
    }

    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff2?)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

啟用：

```bash
sudo ln -s /etc/nginx/sites-available/myapp /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
```

## 4.2 場景二：部署 Node.js 後端服務

後端需要持續執行，關鍵是讓它在背景不停止。

**用 PM2（最推薦新手）：**

```bash
npm install -g pm2
cd /path/to/your/app
npm install
npm run build  # TypeScript 專案需要
pm2 start dist/main.js --name "myapp"
pm2 startup && pm2 save  # 開機自啟
pm2 logs myapp  # 看日誌
```

**用 Nginx 反向代理：**

```nginx
server {
    listen 80;
    server_name api.yourdomain.com;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

## 4.3 場景三：Docker Compose 一鍵部署全端

不想在伺服器上裝各種環境？用 Docker：

```dockerfile
# Dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["node", "dist/main.js"]
```

```yaml
# docker-compose.yml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgresql://postgres:pass@db:5432/myapp
    depends_on: [db, redis]
    restart: always

  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_PASSWORD: pass
      POSTGRES_DB: myapp
    volumes:
      - postgres_data:/var/lib/postgresql/data
    restart: always

  redis:
    image: redis:7-alpine
    restart: always

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/conf.d/default.conf
      - ./frontend/dist:/usr/share/nginx/html
    depends_on: [app]
    restart: always

volumes:
  postgres_data:
```

啟動：`docker compose up -d`。查看日誌：`docker compose logs -f`。

---

# 5. 網域 & HTTPS

## 5.1 買網域 & 解析

在阿里雲萬網、騰訊雲、Namecheap、Cloudflare、GoDaddy 等平台買網域（.com 約 55-75 元／年，.cn 約 29 元／年）。

在網域主控檯新增 **A 記錄**：

| 記錄類型 | 主機記錄 | 記錄值 |
|---------|---------|--------|
| A | @ | 你的伺服器 IP |
| A | www | 你的伺服器 IP |
| A | api | 你的伺服器 IP（後端 API） |

## 5.2 一鍵 HTTPS（Let's Encrypt 免費憑證）

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com -d api.yourdomain.com
# 選 2（Redirect）自動把 HTTP 重新導向到 HTTPS
sudo certbot renew --dry-run  # 測試自動續期
```

---

# 6. 雲廠商常見服務功能全解析（不只是伺服器！）

買了雲伺服器之後，你會發現雲廠商主控檯裡有上百種產品，名字聽起來都很專業（ECS、OSS、CDN、RDS、SLB…），新手往往不知道是幹嘛的、什麼時候該用。這一節我們把最常見的服務逐個講清楚，**國內以阿里雲／騰訊雲為例，海外以 AWS 為例**，幫你建立雲服務的「地圖感」。

## 6.1 一張表搞懂：雲服務全家福

先看全景。一個完整的 Web 應用在雲上通常長這樣：

```
使用者 ──→ CDN（靜態資源加速）──→ 負載平衡 SLB/ALB ──→ 雲伺服器 ECS/EC2（你的應用）
                │                        │                │
                │                        │                ├── 物件儲存 OSS/S3（圖片/檔案）
                │                        │                ├── 雲端資料庫 RDS/RDS（MySQL/Postgres）
                │                        │                └── 快取 Redis/ElastiCache
                │                        │
                │                        └── 容器服務 ACK/EKS（Kubernetes，進階）
                │
                └── 網域解析 DNS/DNS（把網域指向你的服務）
                     + SSL 憑證（HTTPS 加密）
```

下面逐個解釋每個服務是什麼、什麼時候用、怎麼操作。

## 6.2 運算類：跑你程式碼的地方

### 雲伺服器 ECS / CVM / EC2

這就是我們前面一直在說的「VPS」「雲伺服器」。

| 廠商 | 產品名 | 說明 |
|------|--------|------|
| 阿里雲 | ECS（彈性運算服務） | 最通用的雲伺服器，可以自由選設定、裝系統 |
| 騰訊雲 | CVM（雲伺服器）/ Lighthouse（輕量應用伺服器） | CVM 更靈活，Lighthouse 更簡單適合新手 |
| 華為雲 | ECS / HECS（雲耀） | HECS 類似輕量伺服器 |
| AWS | EC2（Elastic Compute Cloud） | AWS 的虛擬伺服器，類型極多（通用／運算最佳化／記憶體最佳化／GPU） |

**什麼時候用：** 需要自己掌控執行環境、跑自訂服務、24小時線上的進程。

**怎麼操作（以騰訊雲輕量為例）：**
1. 進入「輕量應用伺服器」主控檯
2. 點「新建」選映像（推薦 Ubuntu 22.04）、方案、地區
3. 購買後在實例列表裡看到公網 IP
4. 點「重設密碼」設定 root 密碼
5. 點「防火牆」新增連接埠規則（22/80/443）
6. SSH 連接上去開始部署

### Serverless 函式運算 / Lambda

不用買伺服器，上傳程式碼，按呼叫次數和執行時間付費。請求來了才執行，沒請求不花錢。

| 廠商 | 產品名 |
|------|--------|
| 阿里雲 | 函式運算 FC |
| 騰訊雲 | 雲函式 SCF |
| AWS | Lambda |

**什麼時候用：** 偶爾被觸發的任務（比如 Webhook 處理、圖片壓縮、定時任務）、流量波動大的 API。不適合需要常駐的服務（比如 WebSocket Bot）。

### 容器服務 / EKS / ACK

如果你的專案用了 Docker，且規模變大需要管理多個容器，用 Kubernetes（K8s）編排。

| 廠商 | 產品名 |
|------|--------|
| 阿里雲 | ACK（容器服務 Kubernetes 版） |
| 騰訊雲 | TKE |
| AWS | EKS（Elastic Kubernetes Service）|

**什麼時候用：** 多服務微服務架構、需要自動擴縮容、團隊有維運能力。個人／小專案用不上，一台 VPS + Docker Compose 就夠了。

## 6.3 儲存類：放檔案和資料的地方

### 物件儲存 OSS / COS / S3 ⭐ 最常用

**這是除了伺服器之外最常用的服務**，用來存放圖片、影片、PDF、前端打包後的靜態檔案等「大檔案」。**不要把使用者上傳的檔案存在伺服器本機磁碟上！** 伺服器重新安裝／遷移／擴容時很容易弄丟。

| 廠商 | 產品名 | 免費額度 | 費用 |
|------|--------|---------|------|
| 阿里雲 | OSS（物件儲存服務）| 新使用者 5GB 標準儲存 6 個月 | 標準儲存約 ¥0.12/GB/月 |
| 騰訊雲 | COS（物件儲存） | 新使用者 50GB 6 個月 | 標準儲存約 ¥0.118/GB/月 |
| AWS | S3（Simple Storage Service）| 5GB（Free Tier，12個月）| 標準儲存約 $0.023/GB/月 |

**它能做什麼：**
- 存放使用者上傳的圖片／頭像／附件（部落格配圖、商品圖片、使用者頭像）
- 託管前端靜態網站（把 `dist/` 目錄直接傳上去，開啟「靜態網站託管」功能就能訪問）
- 備份資料庫匯出檔案
- 和 CDN 配合，讓全世界使用者快速下載你的檔案
- 產生臨時連結分享私有檔案

**怎麼操作（以阿里雲 OSS 為例）：**
1. 進入 OSS 主控檯，點「建立 Bucket」
2. 填寫 Bucket 名稱（全域唯一，比如 `myapp-images`）
3. 地區選離你伺服器近的
4. 儲存類型選「標準儲存」
5. 讀寫權限：**初期建議「公共讀」**（圖片可以直接訪問），敏感檔案用「私有」
6. 建立完成後，進入 Bucket →「檔案管理」→「上傳檔案」
7. 上傳後每個檔案都有一個 URL，比如 `https://myapp-images.oss-cn-hangzhou.aliyuncs.com/avatar.jpg`
8. 前端程式碼裡直接用這個 URL 顯示圖片

**配合 CDN 加速：** 給 OSS Bucket 綁定自訂網域 + CDN，使用者訪問圖片時從最近的 CDN 節點取得，速度快且省 OSS 流量費。

**用程式碼操作（Node.js 範例，讓 AI 幫你寫具體邏輯）：**

```javascript
// 安裝 SDK: npm install ali-oss
const OSS = require('ali-oss');
const client = new OSS({
  region: 'oss-cn-hangzhou',
  accessKeyId: '你的AccessKey',
  accessKeySecret: '你的AccessKeySecret',
  bucket: 'myapp-images'
});

// 上傳檔案
async function uploadFile(localPath, ossPath) {
  const result = await client.put(ossPath, localPath);
  return result.url; // 回傳檔案的公網 URL
}
```

> ⚠️ **重要安全提醒：** AccessKey 相當於你的 OSS 密碼，**絕對不要硬編碼在前端程式碼或提交到 Git**！放在伺服器端環境變數裡。如果不小心洩漏了，立即到 RAM 主控檯停用舊 Key 並產生新的。

**AWS S3 操作（同樣流程）：**
1. AWS 主控檯搜尋 S3 → Create bucket
2. 填名字、選區域（如 us-east-1）、取消勾選 "Block all public access"（如果需要公開訪問）
3. 上傳檔案後可以透過 `https://bucket-name.s3.region.amazonaws.com/file.jpg` 訪問
4. SDK 用 `aws-sdk` 或 `@aws-sdk/client-s3`

### 雲端硬碟 / 雲碟 / EBS

掛載在雲伺服器上的區塊儲存（類似電腦的硬碟）。伺服器自帶的系統碟通常 40-60GB，不夠用時你可以額外買「資料碟」掛載上去。

- 阿里雲：雲碟（高效雲碟/ESSD/SSD）
- 騰訊雲：雲端硬碟 CBS
- AWS：EBS（Elastic Block Store）

**什麼時候用：** 伺服器磁碟不夠、需要額外儲存空間、需要獨立於伺服器生命週期保留資料（伺服器刪了資料碟還在）。

### 檔案儲存 / NAS / EFS

多台伺服器可以同時掛載的共享檔案儲存。適合多台 Web 伺服器共享同一份上傳檔案。

- 阿里雲：NAS（網路附加儲存）
- 騰訊雲：CFS
- AWS：EFS（Elastic File System）

個人小專案一般用不上，單台伺服器 + OSS 足夠。

## 6.4 資料庫類：存結構化資料

### 雲端資料庫 RDS / Cloud Database ⭐ 常用

**不要把資料庫裝在同一台 VPS 上跑生產環境！** 雖然技術上可以（我們前面的教學就是在 VPS 上裝 PostgreSQL），但生產環境用雲端資料庫更省心：自動備份、高可用性、監控告警、一鍵擴容。

| 廠商 | 產品名 | 支援的資料庫 | 免費／入門 |
|------|--------|------------|----------|
| 阿里雲 | RDS | MySQL、PostgreSQL、SQL Server、MariaDB | 新使用者免費試用 1-3 個月 |
| 騰訊雲 | TDSQL-C（原CynosDB）/ 雲端資料庫 MySQL | MySQL、PostgreSQL、MariaDB | 新使用者 1核1G 約 ¥30／月 |
| AWS | RDS（Relational Database Service） | MySQL、PostgreSQL、MariaDB、SQL Server、Oracle、Aurora | Free Tier 12 個月（t2.micro/t3.micro） |

**什麼時候用：** 生產環境的資料庫（特別是有使用者資料、不能弄丟資料的場景）。

**怎麼操作（以阿里雲 RDS 為例）：**
1. RDS 主控檯 → 建立實例
2. 選資料庫引擎（MySQL 8.0 最常用）、規格（入門選 1核2G）、儲存空間
3. 建立後設定「白名單」把你的伺服器 IP 加進去（重要！否則連不上）
4. 建立資料庫帳號和密碼
5. 在「資料庫管理」裡建立資料庫名稱
6. 拿到連線位址（類似 `rm-xxxxx.mysql.rds.aliyuncs.com:3306`）
7. 修改你專案的 `.env` 裡的 `DATABASE_URL` 指向這個位址

> 💡 **vibecoding 提示：** 告訴 AI「我有一個阿里雲 RDS MySQL 實例，連線位址是 xxx，帳號是 xxx，幫我寫 Node.js/Python 連線程式碼和資料庫初始化遷移腳本」。

### 快取 Redis / ElastiCache

記憶體資料庫，用來快取熱點資料（減少資料庫查詢）、存 Session/Token、做訊息佇列、排行榜等。

- 阿里雲：雲端資料庫 Redis 版
- 騰訊雲：雲端資料庫 Redis
- AWS：ElastiCache for Redis

入門可以直接在 VPS 上 `apt install redis-server`，生產環境／高可用場景用雲端 Redis。

## 6.5 網路類：讓使用者訪問更快更安全

### CDN（內容傳遞網路）⭐ 常用

把你的靜態資源（圖片、CSS、JS、影片）快取到全球／全國的邊緣節點，使用者訪問時從最近的節點取得，速度飛快。

- 阿里雲：CDN / DCDN（全站加速）
- 騰訊雲：CDN / EdgeOne（邊緣安全加速）
- AWS：CloudFront

**什麼時候用：**
- 網站有圖片／影片等大檔案
- 使用者分佈在全國各地／全球各地
- 想減少伺服器頻寬壓力（CDN 幫你扛流量）
- 前面提到的 Cloudflare Pages 本質上就是 CDN + 靜態託管

**怎麼設定（以騰訊雲 CDN 為例）：**
1. CDN 主控檯 → 新增網域 → 填入你的網域（比如 `static.yourdomain.com`）
2. 源站類型選「COS 源」或「自有源」（填你的伺服器 IP）
3. 等待設定下發（約 5-10 分鐘）
4. 去網域解析主控檯，給 `static.yourdomain.com` 新增 CNAME 記錄，指向 CDN 分配給你的 CNAME 位址
5. 設定完成，訪問 `static.yourdomain.com/images/xxx.jpg` 就是 CDN 加速了

### 負載平衡 SLB / CLB / ALB / ELB

當你有多台後端伺服器時，負載平衡器把流量均勻分發到各台伺服器上，還能自動踢掉掛掉的伺服器。

- 阿里雲：SLB（伺服器負載平衡）/ ALB（應用型）
- 騰訊雲：CLB（負載平衡）
- AWS：ELB（Elastic Load Balancing：ALB/NLB/Gateway LB）

個人專案只有一台伺服器時用不上，使用者多了、需要多台伺服器時再考慮。

### DNS 網域解析 / Cloud DNS

把網域翻譯成 IP 位址的服務。買網域的地方通常自帶免費 DNS 解析，但也可以換成更專業的。

- 阿里雲：雲解析 DNS（萬網網域自帶）
- 騰訊雲：DNSPod（騰訊雲旗下）
- AWS：Route 53
- 第三方推薦：Cloudflare DNS（免費、全球最快之一）

**怎麼操作：** 在網域主控檯新增解析記錄：

| 記錄類型 | 作用 | 範例 |
|---------|------|------|
| **A 記錄** | 網域 → IPv4 位址 | `@ → 123.45.67.89` |
| **AAAA 記錄** | 網域 → IPv6 位址 | `@ → 2400:xxxx::` |
| **CNAME 記錄** | 網域 → 另一個網域（常用於 CDN） | `static → static.cdn.com` |
| **MX 記錄** | 郵件伺服器（用企業信箱需要設定） | - |
| **TXT 記錄** | 任意文字（驗證網域所有權、設定 SPF/DKIM 等） | - |

### SSL 憑證服務

HTTPS 需要的 SSL 憑證。

- 阿里雲／騰訊雲：免費 SSL 憑證（Let's Encrypt 或雲廠商免費憑證，有效期 3-12 個月）
- AWS：ACM（AWS Certificate Manager，免費）
- 通用免費方案：Certbot + Let's Encrypt（我們前面第 5 章的方法，90 天自動續期）

我們前面用的 `certbot --nginx` 就是最通用的免費方案，不用專門去雲廠商買憑證。

### VPC（私有網路）/ VPC

在雲上劃一個隔離的虛擬區域網路，你的伺服器、資料庫都在裡面，更安全。新使用者建立雲產品時一般會預設建立一個 VPC，不用你操心。進階用法（比如公有子網／私有子網分離、NAT 閘道）需要專門學習。

## 6.6 其他常用服務

### 網域註冊 / Domain

買網域的地方。
- 國內：阿里雲萬網、騰訊雲（DNSPod）、華為雲
- 海外：Namecheap、Cloudflare Registrar、GoDaddy、Google Domains（已遷移到 Squarespace）
- 建議：國內使用者用國內註冊商（方便備案），海外專案用 Namecheap 或 Cloudflare（便宜、免費隱私保護）

### 郵件服務 / SES

不要在伺服器上自己搭郵件伺服器（大概率被當成垃圾郵件）。用專業的郵件發送服務：
- 國內：阿里雲郵件推送、騰訊雲 SES
- 海外：AWS SES、SendGrid、Mailgun、Resend
- 用途：註冊驗證郵件、通知郵件、行銷郵件

### 簡訊服務 / SMS

發送驗證碼簡訊、通知簡訊：
- 國內：阿里雲簡訊服務、騰訊雲簡訊
- 海外：AWS SNS、Twilio
- 國內發簡訊需要企業資質／簽名備案，個人開發者比較難申請到。個人專案可以用郵件／信箱驗證碼代替簡訊。

### 監控／日誌 / CloudWatch

監控伺服器的 CPU／記憶體／磁碟使用率，查看應用日誌，設定警報（CPU 太高、服務掛了就通知你）：
- 阿里雲：雲監控、SLS（日誌服務）
- 騰訊雲：雲監控、CLS（日誌服務）
- AWS：CloudWatch

入門階段：可以用 PM2 自帶的監控 + Uptime Kuma（開源監控工具，一個 Docker 就能跑）。

### 物件儲存的進階用法：圖片處理／影片轉碼

雲廠商的 OSS/S3 通常還附帶媒體處理能力：
- 阿里雲 OSS：圖片處理（縮圖／浮水印／格式轉換）、影片轉碼（需搭配 MPS）
- 騰訊雲 COS：資料萬象 CI（圖片處理／內容審核／人臉辨識）
- AWS S3：搭配 Lambda 自動產生縮圖

**範例**：你上傳了一張 5MB 的原圖 `photo.jpg`，訪問時在 URL 後面加參數 `?x-oss-process=image/resize,w_300` 就能直接拿到 300px 寬的縮圖，不用你自己處理。

## 6.7 國內 vs 海外：兩套生態對照速查

做專案時經常需要在國內雲和海外雲之間對照，這個表幫你快速找到對應服務：

| 功能類別 | 阿里雲 | 騰訊雲 | AWS | 免費／低價替代 |
|---------|--------|--------|-----|-------------|
| 雲伺服器 | ECS | CVM / Lighthouse | EC2 | Vultr / DigitalOcean / Hetzner |
| 物件儲存 | OSS | COS | S3 | Cloudflare R2（免出站流量費）|
| 關聯式資料庫 | RDS | 雲端資料庫 | RDS | Supabase / Neon / PlanetScale |
| 快取 Redis | 雲 Redis | 雲 Redis | ElastiCache | Upstash（Serverless Redis）|
| CDN | CDN | CDN / EdgeOne | CloudFront | Cloudflare CDN（免費）|
| 負載平衡 | SLB/ALB | CLB | ELB | Nginx 自建 / Caddy |
| Serverless | 函式運算 FC | 雲函式 SCF | Lambda | Cloudflare Workers |
| 容器/K8s | ACK | TKE | EKS | Fly.io / Railway |
| DNS 解析 | 雲解析 | DNSPod | Route 53 | Cloudflare DNS（免費）|
| SSL 憑證 | 免費憑證 | 免費憑證 | ACM（免費）| Let's Encrypt（免費）|
| 郵件推送 | 郵件推送 | SES | SES | Resend / SendGrid 免費額度 |
| 簡訊服務 | 簡訊服務 | 簡訊 | SNS | Twilio |
| 監控 | 雲監控 | 雲監控 | CloudWatch | Uptime Kuma（自建開源）|
| AI 模型/API | 通義千問、百煉 | 混元、TI平台 | Bedrock | OpenAI API / Anthropic API |
| 網域註冊 | 萬網 | DNSPod | Route 53 | Namecheap / Cloudflare |

## 6.8 新手常見疑問

**Q：我應該把所有服務都用雲廠商的，還是都在 VPS 上自己搭？**

**個人專案／學習階段：** VPS 自己搭就行（Docker Compose 一把梭），省錢且能學到東西。
**面向使用者的生產專案：** 資料庫和物件儲存建議用雲服務（自動備份、穩定），應用層還是可以跑在 VPS 上。
**預算充足／團隊專案：** 盡量用雲端託管服務（RDS/Redis/OSS），把精力放在寫業務程式碼上而不是維運上。

**Q：AWS 免費方案怎麼用？**

AWS 給新使用者 12 個月的 Free Tier，包含：
- EC2：t2.micro/t3.micro 每月 750 小時（相當於一台一直跑）
- S3：5GB 標準儲存
- RDS：750 小時 db.t2.micro/t3.micro + 20GB 儲存
- Lambda：每月 100 萬次請求免費
- CloudFront：50GB 出站流量 + 200萬次請求／月

但注意：**AWS Free Tier 到期後自動按標準費率計費**，不用了記得銷毀資源，不然月底帳單會很驚喜。建議設定帳單警報（Billing Dashboard → Budgets）。

**Q：國內雲和海外雲怎麼選？**

- 使用者在大陸 → 用國內雲（阿里雲／騰訊雲）+ 備案，訪問速度快且合規
- 使用者在海外 → 用 AWS/Vultr/Fly.io/Cloudflare 等海外服務
- 兩邊都有使用者 → 前端用 Cloudflare CDN，大陸放阿里雲／騰訊雲海外節點（香港／新加坡），海外用 AWS，透過 GeoDNS 分流
- 不想備案但要大陸能訪問 → Cloudflare Pages（靜態站）或香港節點 VPS，但速度不如大陸備案伺服器

---

# 7. AI Agent 專用部署平台

如果你部署的是 AI Agent（不只是普通 Web 應用），有些平台專門為 AI 工作負載設計：

## 7.1 Modal — Python AI/ML 的 Serverless GPU

**官網**：https://modal.com

**適合：** 需要 GPU 推理、定時任務、批次資料處理的 Python AI 專案

**特點：**
- 用 Python 裝飾器定義函式，`modal deploy` 一鍵部署
- GPU 容器冷啟動約 1 秒，按毫秒計費
- 內建定時任務、金鑰管理、共享儲存
- 免費方案每月 $30 額度（個人專案基本上夠用）
- 缺點：只支援 Python

```python
# 範例：一個簡單的 Modal 部署
import modal

app = modal.App("my-ai-agent")

@app.function(gpu="A10G", timeout=300)
def run_agent(prompt: str):
    # 在這裡跑你的 AI 模型/Agent
    return result
```

## 7.2 Hugging Face Spaces — AI Demo 首選

**官網**：https://huggingface.co/spaces

**適合：** 快速展示 AI Demo（Gradio/Streamlit 介面）、開源模型展示

**特點：**
- 免費 CPU 小實例，GPU 需付費
- 支援 Gradio、Streamlit、Docker 三種方式
- 社群活躍，每個 Space 都有公開的程式碼和討論區
- 點一下就能 Fork 別人的 Space 改成自己的

## 7.3 Replicate — 把模型變成 API

**官網**：https://replicate.com

**適合：** 想把 AI 模型變成 API 但不想管伺服器

**特點：** 把你的模型推上去，它自動打包成可呼叫的 HTTP API，按呼叫量計費。適合發佈自己微調的模型。

## 7.4 國內 GPU 雲：AutoDL

**官網**：https://www.autodl.com

**適合：** 國內使用者跑 AI 模型訓練／推理，需要 GPU 且預算有限

**特點：**
- 價格極低（RTX 3090 約 1 元／小時，A100 約 5-8 元／小時）
- 有免費 CPU 實例
- 支援 JupyterLab、SSH、VS Code Remote
- 映像市集預裝了各種 AI 框架（PyTorch、TensorFlow、Stable Diffusion 等）
- 關機後只收儲存費，很適合學生和研究人員

---

# 8. 🎯 Vibecoding 部署實戰：讓 AI 當你的維運助手

這才是 vibecoding 時代最重要的部署心法：**你不需要記住所有指令，AI 就是你的維運助手。**

## 8.1 兩種 AI 協作部署方式

**方式一：本地產生腳本，手動執行**

告訴你的 AI 程式設計助手（Claude Code、Trae Solo、Cursor）：

> 「我要把 [專案描述] 部署到 [平台名／伺服器]，幫我產生：
> 1. 完整的部署步驟清單
> 2. 所有需要的設定檔（Nginx、PM2、Dockerfile、docker-compose）
> 3. 部署腳本 deploy.sh
> 4. 環境變數檢查清單」

AI 產生好所有檔案後，你只需要複製執行即可。

**方式二：AI 直接 SSH 到伺服器操作（更省事）**

Claude Code 支援 SSH 遠端操作：

```bash
claude
# 告訴它：
# 「透過 SSH 連接到 root@我的IP，幫我部署 /root/myapp，設定 Nginx + HTTPS + PM2」
```

AI 會自動檢查環境、安裝缺失依賴、拉程式碼、構建、設定、驗證，全程不用你手動敲指令。

> ⚠️ **安全提醒**：
> - 先在測試伺服器練手，確認 AI 不會誤操作
> - 重要資料定期備份
> - 給 AI 的使用者權限最小化（不要給 root，可以給有 sudo 的一般使用者）
> - AI 執行危險指令前先看一眼它要做什麼

## 8.2 萬能部署 Prompt 模板

不管你選哪個平台／伺服器，填好這個模板給 AI，它都能給你一份可執行的方案：

```
幫我部署一個專案，資訊如下：

【部署目標】
- 平台/伺服器：[Vercel / Railway / Fly.io / Ubuntu 22.04 VPS / ...]
- 伺服器 IP（如果是 VPS）：xxx.xxx.xxx.xxx
- 已設定：[SSH金鑰登入 / Docker已裝 / Nginx已裝 / ...]

【專案資訊】
- 專案類型：[Next.js 14 / Vite+React / Node.js Express / Python FastAPI / ...]
- 程式碼位置：GitHub 倉庫 https://github.com/xxx/xxx
- 技術棧：Node.js 20 + PostgreSQL 16 + Redis 7
- 啟動指令：npm run start
- 監聽連接埠：3000
- 環境變數：DATABASE_URL=xxx, JWT_SECRET=xxx, OPENAI_API_KEY=xxx

【網域】
- 網域：mydomain.com
- 已解析到伺服器 IP：是/否
- 需要 HTTPS：是/否

【要求】
1. 給出完整步驟（本地操作 vs 伺服器操作分開列出）
2. 提供所有設定檔
3. 告訴我如何驗證部署成功
4. 列出常見雷和排解方法
```

## 8.3 AI 輔助排錯流程

出問題不要慌：

1. **先看日誌**：
   - Nginx：`sudo tail -50 /var/log/nginx/error.log`
   - PM2：`pm2 logs myapp`
   - Docker：`docker compose logs app`
   - systemd：`sudo journalctl -u myapp -n 50`

2. **把報錯完整複製給 AI**，加上上下文：
   > 「部署 Node.js 到 Ubuntu，訪問顯示 502，Nginx 錯誤日誌是 [貼上]，設定是 [貼上]，PM2 狀態是 [貼上]，幫我排解」

3. **常見問題速查：**
   - **502 Bad Gateway**：後端沒啟動、連接埠不對、proxy_pass 位址錯誤
   - **無法訪問 IP**：安全群組沒開連接埠、ufw 沒放行、Nginx 沒啟動
   - **重新整理 404**：Nginx 沒設定 `try_files`
   - **靜態資源 404**：root 路徑錯、檔案權限不對
   - **HTTPS 憑證失敗**：網域沒解析、80 連接埠被佔、防火牆沒開 80
   - **PM2 頻繁重新啟動**：程式碼有 bug，`pm2 logs` 看錯誤
   - **Vercel Function 逾時**：超過 10 秒限制，改長時間執行的選 Fly.io/Railway/VPS
   - **Railway/Render 服務 503**：休眠了或額度用完了

---

# 9. 部署後實用技巧

## 9.1 檔案傳輸

```bash
# 本地 → 伺服器
scp ./file.zip yourname@IP:/home/yourname/
scp -r ./dir yourname@IP:/home/yourname/

# 伺服器 → 本地
scp yourname@IP:/home/yourname/file.zip ./

# rsync（增量同步，推薦部署用）
rsync -avz --exclude=node_modules --exclude=.git ./project/ yourname@IP:/var/www/project/
```

## 9.2 一鍵更新腳本

在伺服器上建立 `deploy.sh`：

```bash
#!/bin/bash
set -e
cd /path/to/project
git pull origin main
npm install
npm run build
pm2 restart myapp
echo "✅ 部署完成！"
```

以後更新只需要 `bash deploy.sh`。再配個 GitHub Actions（讓 AI 幫你寫），程式碼 push 後自動部署。

## 9.3 安全強化清單

讓 AI 幫你產生完整的安全強化腳本，主要包括：
- 停用密碼登入，只用 SSH 金鑰
- 修改 SSH 預設連接埠（22 → 其他）
- 安裝 fail2ban（自動封鎖暴力破解 IP）
- 啟用自動安全更新：`apt install unattended-upgrades`
- 不要把金鑰／.env 提交到 Git
- 定期備份資料庫到物件儲存

---

# 10. 本章小結

**部署選項總結表：**

| 場景 | 推薦方案 | 成本 | 難度 |
|------|---------|------|------|
| 純前端／文件站 | Cloudflare Pages / Vercel / GitHub Pages | 免費 | ⭐ |
| Next.js 全端（快速回應） | Vercel | 免費/$20月 | ⭐ |
| 後端 API / Bot（常駐） | Railway / Fly.io（免費）/ VPS | $0-10/月 | ⭐⭐ |
| 全端專案（完全控制） | 騰訊雲輕量 / Vultr + Docker | ¥99/年起 | ⭐⭐⭐ |
| AI Agent 演示 | Hugging Face Spaces | 免費 | ⭐ |
| AI GPU 推理 | Modal（海外）/ AutoDL（國內） | $0-30/月 | ⭐⭐ |
| 面向國內使用者正式專案 | 國內雲伺服器 + 備案 + CDN | ¥200+/年 | ⭐⭐⭐ |

**核心流程記住 5 步：**
1. **選平台** → 根據專案類型從上面的表選
2. **傳程式碼** → git push / rsync / GitHub 自動部署
3. **設環境** → 裝 Node.js/Nginx/Docker（或平台自動處理）
4. **跑起來** → PM2/Docker/systemd 守護進程
5. **設網域+HTTPS** → DNS 解析 + Certbot 一鍵憑證

**vibecoding 心法：**
1. 理解「需要做什麼」，不需要記住每條指令
2. 把需求清楚描述給 AI，它會給你完整方案
3. 看得懂 AI 在做什麼，關鍵步驟確認
4. 出問題複製日誌給 AI，它能排解 90% 的問題
5. 重要資料備份，權限最小化

部署一次你就會發現——原來上線也沒那麼難。🎯

---

<RelatedArticlesSection
  :articles="relatedArticlesMap['zh-tw/stage-2/backend/cloud-server-deployment'] ?? []"
  title="相關文章"
  description="繼續學習部署前後的工程化技能。"
/>
