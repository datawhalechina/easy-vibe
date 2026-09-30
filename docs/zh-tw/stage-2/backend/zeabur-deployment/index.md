# 把網站發到網上（簡單方式）：Vercel/Zeabur/CloudBase 一鍵發佈

> 💡 **什麼叫「把網站發到網上」？** 也叫「上線」或「部署發佈」。你在本地電腦寫好的網站，只有你自己能開啟；**「發到網上」就是把它放到一台 24 小時開機的伺服器上，讓任何一個人在瀏覽器裡輸入網址就能訪問到**——就像你寫了一篇 Word 文件只有自己電腦能看，發到公眾號／部落格後所有人都能看一樣，只不過這次發上去的是一個完整的網站。

在本教程中，我們會介紹最簡單的發站方式——**不需要買伺服器，不需要懂維運**，連一下 GitHub 倉庫點幾下按鈕就能把網站發到網上。我們會介紹三個常用平台：**騰訊雲 CloudBase**、**Vercel** 和 **Zeabur**。

# 為什麼用平台一鍵發佈，而不自己搭伺服器？

你可能想問：既然最終都要「放到伺服器上」，為什麼不自己買一台伺服器來部署？答案是：**平台幫你把麻煩事全包了**。

如果手動部署，一個項目往往需要好幾個步驟，每一步都可能踩坑。常見關鍵步驟包括：

1. **伺服器準備**：你需要先購買雲伺服器（比如阿里雲、騰訊雲、或 AWS EC2），選擇伺服器所在地區（如上海、新加坡）、設定（CPU、記憶體、磁碟大小等），還要學會如何遠端連接伺服器（例如透過 SSH 工具登入）。
   ![](/zh-cn/stage-2/backend/zeabur-deployment/images/image2.png)
2. **環境設定**：Web 應用需要在特定「環境」中才能執行——例如執行 Node.js 專案必須先安裝 Node.js；執行 Python 專案必須安裝 Python 以及對應的第三方函式庫。如果環境版本不相符，程式就可能報錯、無法啟動。
3. **上傳資源**：你需要把本地的程式碼和資源上傳到伺服器上，常用的方法包括 FTP 或 Git。如果專案體積比較大（比如包含影片檔案），中途一旦斷線，有時需要重新上傳。

![](/zh-cn/stage-2/backend/zeabur-deployment/images/image3.png)

4. **啟動服務並測試**：上傳完成後，你還需要在伺服器上執行指令啟動應用，並測試「分配的網路位址是否能訪問」。如果訪問不了，有可能是伺服器防火牆沒有放行對應連接埠（比如你的應用監聽 3000 連接埠，但該連接埠被防火牆攔截），也可能是程式本身有 Bug，這時就需要查看伺服器日誌進行排解。
   > 💡 可以把連接埠理解為區分同一臺設備上不同應用的「房間號」，而 IP 則是這臺設備的「門牌號」。IP 和連接埠合在一起（IP:port），就可以精確定位到某一個網路服務。
5. **維護與更新**：後續每次你修改程式碼，都要重新上傳並重新啟動服務。如果伺服器當機（例如斷電、網路故障），還需要手動重新啟動應用，有時還要額外設定「進程守護工具」，讓程式在異常退出後自動拉起。

像 CloudBase、Vercel、Zeabur 這樣的「低程式碼部署平臺」，就是為了解決上述複雜問題而誕生的。它們會幫你自動完成「買伺服器、設定環境、上傳程式碼、啟動服務、監控執行」等步驟。你只需要把自己的程式碼倉庫（比如 GitHub 或 GitLab）連接到平臺，或者直接上傳程式碼，它就會自動拉取程式碼、識別應用類型、設定對應的執行環境，最後給你一個可以被任何人訪問的公網位址。它甚至可以一鍵綁定你自己的網域。

![](/zh-cn/stage-2/backend/zeabur-deployment/images/image4.webp)

接下來，我們會分別介紹這三個平臺的特點和使用方法，幫助你選擇最適合自己的部署方案。

---

# 部署平臺對比

| 平臺 | 特點 | 適用場景 | 免費額度 |
|------|------|----------|----------|
| **騰訊雲 CloudBase** | 國內訪問速度快，與微信生態深度整合 | 國內用戶為主、需要微信小程序支持的項目 | 有免費額度 |
| **Vercel** | 前端框架支持好，與 GitHub 集成緊密 | React/Vue/Next.js 等現代前端項目 | 有免費額度 |
| **Netlify** | 功能全面，支持表單處理和身份驗證，與 Git 集成好 | 需要表單處理、身份驗證等高級功能的靜態網站 | 有免費額度 |
| **Zeabur** | 支持多種語言和服務模板，配置靈活 | 需要部署多種服務（如 Dify、n8n）的複雜項目 | 每月約 5 美元免費額度 |

---

# 1. 騰訊雲 CloudBase

騰訊雲 CloudBase（雲開發）是騰訊雲提供的一站式後端雲服務，特別適合國內開發者使用。它的優勢在於：

- **國內訪問速度快**：服務器位於國內，訪問延遲低
- **微信生態整合**：可以方便地對接微信小程序、公眾號
- **一站式解決方案**：提供靜態網站託管、雲函數、資料庫、存儲等全套服務
- **免費額度充足**：個人開發者有充足的免費資源額度

## 使用 CloudBase 部署 Web 應用

### 步驟 1：註冊並登錄

訪問 [騰訊雲 CloudBase 控制檯](https://console.cloud.tencent.com/tcb)，使用微信或 QQ 登錄。

### 步驟 2：創建環境

點擊"新建環境"，選擇一個環境名稱（如 `my-web-app`）。

> ⚠️ **注意**：CloudBase 的免費體驗版需要兌換碼才能開通。你需要關注騰訊雲 CloudBase 公眾號，在公眾號中輸入"領取兌換碼"獲取免費體驗版的兌換碼，然後在創建環境時填寫兌換碼即可開通免費環境（免費試用期為 6 個月）。

### 步驟 3：開通靜態網站託管

在環境管理頁面，找到"靜態網站託管"功能並開通。開通後你會獲得一個默認的訪問域名。

CloudBase 的靜態網站託管提供多種部署方式，與 Zeabur 類似：

- **本地項目上傳**：直接從本地上傳構建好的靜態文件（HTML、CSS、JS 等）
- **模板部署**：使用預設模板快速創建項目，如 React Web 應用模板、Vue Web 應用模板
- **Git 倉庫部署**：支持從 GitHub 等程式碼倉庫自動拉取程式碼並部署

### 步驟 4：部署程式碼

在靜態網站託管頁面，CloudBase 提供三種部署方式：

**方式一：本地項目部署（本地項目上傳）**
- 在控制檯選擇"本地項目部署"
- 直接上傳構建好的靜態文件（HTML、CSS、JS 等）
- 選擇你本地構建好的項目文件夾（如 `dist` 或 `build` 目錄）
- 等待上傳完成即可訪問

**方式二：模板部署**
- 使用預設模板快速創建項目
- 支持 React Web 應用模板、Vue Web 應用模板等
- 基於模板自動構建並部署

**方式三：Git 倉庫部署**
- **Git 個人倉庫部署**：綁定你的 GitHub 等個人程式碼倉庫
- **公開倉庫部署**：支持從公開的 Git 倉庫拉取程式碼
- 配置自動構建命令（如 `npm run build`）
- 每次推送程式碼會自動重新部署

> 💡 **提示**：你也可以使用 CLI 工具進行部署：
> ```bash
> # 安裝 CloudBase CLI
> npm install -g @cloudbase/cli
> # 登錄
> tcb login
> # 部署
> tcb hosting deploy ./dist -e your-env-id
> ```

### 步驟 5：配置自定義域名（可選）

在靜態網站託管設置中，可以綁定你自己的域名，並申請免費的 HTTPS 證書。

---

# 2. Vercel

Vercel 是全球最流行的前端部署平臺之一，特別適合部署 React、Vue、Next.js 等現代前端框架項目。它的特點包括：

- **與 GitHub 深度集成**：推送程式碼即自動部署
- **自動預覽**：每個 Pull Request 都會生成獨立的預覽鏈接
- **全球 CDN**：網站自動分發到全球節點，訪問速度快
- **Serverless 函數**：支持在項目中編寫後端 API

> ⚠️ **注意**：Vercel 在部分網路環境下訪問可能不太穩定，國內用戶建議優先考慮 CloudBase。

## 使用 Vercel 部署 Web 應用

### 步驟 1：註冊賬號

訪問 [Vercel 官網](https://vercel.com)，使用 GitHub 賬號登錄。

### 步驟 2：導入項目

1. 點擊 "Add New Project"
2. 選擇你要部署的 GitHub 倉庫
3. 如果沒有看到想要的倉庫，點擊 "Adjust GitHub App Permissions" 授權訪問

### 步驟 3：配置構建設置

Vercel 會自動識別項目類型並配置構建命令：

| 框架 | 構建命令 | 輸出目錄 |
|------|----------|----------|
| React | `npm run build` | `build` |
| Vue | `npm run build` | `dist` |
| Next.js | `next build` | - |
| 純 HTML | - | 項目根目錄 |

如果自動識別不正確，可以手動修改：
- **Build Command**: 構建命令，如 `npm run build`
- **Output Directory**: 構建輸出目錄，如 `dist` 或 `build`
- **Install Command**: 依賴安裝命令，通常是 `npm install`

### 步驟 4：部署

點擊 "Deploy" 按鈕，等待構建完成。構建成功後，你會獲得一個 `xxx.vercel.app` 的域名。

### 步驟 5：自定義域名（可選）

在項目設置中的 "Domains" 頁面，可以添加你自己的域名。Vercel 會自動配置 HTTPS。

---

# 3. Netlify

Netlify 是另一個非常流行的前端部署平臺，與 Vercel 類似，特別適合部署靜態網站和單頁應用（SPA）。它的特點包括：

- **功能全面**：除了靜態網站託管，還支持表單處理、身份驗證、邊緣函數等高級功能
- **與 Git 深度集成**：支持 GitHub、GitLab、Bitbucket，推送程式碼自動部署
- **分支預覽**：每個分支都會自動生成獨立的預覽鏈接
- **全球 CDN**：網站自動分發到全球節點，訪問速度快
- **表單處理**：無需後端程式碼即可處理網站表單提交
- **身份驗證**：內置用戶身份驗證功能，可快速實現登錄/註冊

> ⚠️ **注意**：Netlify 的國內訪問速度可能不如 CloudBase，建議主要面向海外用戶的項目使用。

## 使用 Netlify 部署 Web 應用

### 步驟 1：註冊賬號

訪問 [Netlify 官網](https://www.netlify.com)，點擊 "Sign up" 註冊。你可以使用 GitHub、GitLab、Bitbucket 或郵箱註冊。

### 步驟 2：導入項目

1. 登錄後點擊 "Add new site" → "Import an existing project"
2. 選擇你的程式碼託管平臺（如 GitHub）
3. 授權 Netlify 訪問你的倉庫
4. 從列表中選擇你要部署的倉庫

### 步驟 3：配置構建設置

Netlify 會自動識別常見的前端框架並配置構建設置：

| 框架 | 構建命令 | 發佈目錄 |
|------|----------|----------|
| React | `npm run build` | `build` |
| Vue | `npm run build` | `dist` |
| Angular | `ng build` | `dist/<project-name>` |
| Next.js | `next build` | `out` |
| 純 HTML | - | `.`（項目根目錄） |

如果自動識別不正確，可以手動配置：
- **Build command**: 構建命令，如 `npm run build`
- **Publish directory**: 構建輸出目錄，如 `dist` 或 `build`

### 步驟 4：部署

點擊 "Deploy site" 按鈕，等待構建完成。構建成功後，你會獲得一個 `xxx.netlify.app` 的域名，任何人都可以通過這個地址訪問你的網站。

### 步驟 5：配置自定義域名（可選）

1. 進入站點設置，點擊 "Domain management"
2. 點擊 "Add custom domain"
3. 輸入你的域名並按照提示配置 DNS 記錄
4. Netlify 會自動申請並配置 HTTPS 證書

### 特色功能

#### 1. 表單處理

Netlify 提供了一個非常方便的功能：無需後端程式碼即可處理表單提交。

只需在 HTML 表單中添加 `netlify` 屬性：

```html
<form name="contact" netlify>
  <p>
    <label>姓名: <input type="text" name="name" /></label>
  </p>
  <p>
    <label>郵箱: <input type="email" name="email" /></label>
  </p>
  <p>
    <label>留言: <textarea name="message"></textarea></label>
  </p>
  <p>
    <button type="submit">發送</button>
  </p>
</form>
```

部署後，表單提交的資料會自動發送到 Netlify 後臺，你可以在 "Forms" 頁面查看所有提交記錄，也可以設置郵件通知或將資料轉發到其他服務。

#### 2. Netlify Functions（邊緣函數）

Netlify 支持部署無服務器函數（Serverless Functions），讓你可以在不搭建完整後端服務器的情況下，實現簡單的 API 接口。你可以使用 JavaScript 或 TypeScript 編寫函數，部署後會自動獲得一個可訪問的 URL。

例如，創建一個 `hello.js` 文件：

```javascript
exports.handler = async (event, context) => {
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Hello from Netlify!" })
  };
};
```

部署後，你可以通過 `https://你的域名/.netlify/functions/hello` 訪問這個函數。

#### 3. 本地開發支持

Netlify 提供了 CLI 工具，方便你在本地開發和測試：

```bash
# 安裝 Netlify CLI
npm install -g netlify-cli

# 登錄賬號
netlify login

# 本地啟動開發服務器
netlify dev

# 本地測試函數
netlify functions:serve
```

使用 CLI 工具可以在本地模擬 Netlify 環境，包括表單提交、函數調用等功能，方便在部署前進行測試。

---

# 4. Zeabur

Zeabur 是一個新興的部署平臺，特別適合需要部署多種服務的複雜項目。它的優勢在於：

- **服務模板豐富**：內置 Dify、n8n、資料庫等多種服務模板
- **支持多種部署方式**：GitHub、模板、Docker 鏡像、本地項目等
- **靈活的服務組合**：可以在一個項目中部署多個相互關聯的服務
- **按量計費**：用多少付多少，適合實驗性項目

## 使用 Zeabur 部署 Dify

在之前的課程中，我們已經簡單接觸過 Dify。現在，我們可以通過 [Zeabur](https://zeabur.com/projects) 非常輕鬆地啟動自己的 Dify 服務。首先打開 [控制檯頁面](https://zeabur.com/projects)，我們先看一下上面的各個區域。

![](/zh-cn/stage-2/backend/zeabur-deployment/images/image5.webp)

在這個頁面上，你首先能看到許多方塊，這些就是已經啟動的服務。在頂部菜單中，你會看到 Agent、Servers、Docs、Templates 等幾個選項，它們分別代表：

1. **Agent**：可以打開 Zeabur 內置的智能助手（Agent），向它提問如何操作，或者查詢當前服務器的狀態。
2. **Servers**：在這裡可以添加你自己購買的雲服務器，或者直接通過 Zeabur 購買服務器。
3. **Docs**：查看 Zeabur 的完整文檔說明。
4. **Templates**：這裡列出了所有內置的模板鏡像。

> 這裡提到的"鏡像（Image）"，可以理解為"包含程式碼和運行環境的壓縮包"。當某個服務在一臺服務器上成功跑起來之後，我們可以選擇把"這套運行環境 + 程式碼"打包成鏡像。之後，在任何新服務器上，只要把這個壓縮包解壓並運行，就不需要重新配置環境和程式碼，服務就能直接跑起來。

在頁面右上角，你還能看到自己的餘額。默認情況下，每個月會有 5 美元左右的免費額度。關於細節計費規則暫時可以不用太在意，只需要知道：只要服務器在運行，就會消耗額度。

![](/zh-cn/stage-2/backend/zeabur-deployment/images/image6.png)

點擊餘額可以查看每日的消耗明細。

![](/zh-cn/stage-2/backend/zeabur-deployment/images/image7.png)

現在我們來創建自己的 Dify 服務。首先，在 [控制檯首頁](https://zeabur.com/projects) 點擊 "New Project"。

![](/zh-cn/stage-2/backend/zeabur-deployment/images/image8.png)

接下來是各個創建方式的解釋：

1. **GitHub**  
   可以連接到你的 GitHub 賬號。綁定之後，就可以直接從 GitHub 倉庫裡選擇項目部署（GitHub 是目前全球最大的程式碼託管平臺）。
2. **Template（模板）**  
    可以基於模板來部署服務。Zeabur 內置了很多預設項目模板（例如 Dify、n8n 等），你可以基於這些模板快速創建並部署應用。
   ![](/zh-cn/stage-2/backend/zeabur-deployment/images/image9.png)
3. **Databases（資料庫）**  
   用於部署資料庫服務，比如 MySQL、MongoDB 等常見資料庫。
   ![](/zh-cn/stage-2/backend/zeabur-deployment/images/image10.png)
4. **Functions（函數）**  
   可以部署函數服務，你可以編寫 JavaScript 或 Python 程式碼，讓它們以函數的形式被調用。
   ![](/zh-cn/stage-2/backend/zeabur-deployment/images/image11.png)

   ![](/zh-cn/stage-2/backend/zeabur-deployment/images/image12.png)

5. **Local Project（本地項目）**  
   上傳一個本地文件夾，Zeabur 會自動識別其中的啟動腳本。這適合將你已經在本地開發好的項目快速部署到 Zeabur 上。
   ![](/zh-cn/stage-2/backend/zeabur-deployment/images/image13.png)
6. **Docker Image**  
   部署已經打包好的 Docker 鏡像。如果你的項目已經被打成了 Docker 鏡像（例如存放在 Docker Hub 或其他鏡像倉庫中），可以在這裡直接部署。
   ![](/zh-cn/stage-2/backend/zeabur-deployment/images/image14.png)
7. **Cursor**  
   如果你安裝了 Cursor（例如 Cursor IDE），可以通過這個入口將 Cursor 中的項目直接部署到 Zeabur。

如果你想部署自己的 Dify 服務，推薦選擇 **Template** 方式，然後在搜索框中輸入 "dify"。可以看到很多由不同作者維護的版本，你可以任選其一（比如 v1.6.0 版本）。

![](/zh-cn/stage-2/backend/zeabur-deployment/images/image15.png)

接著，輸入任意一個名稱，Zeabur 會基於這個名稱生成一個臨時的自定義域名。之後所有人都可以通過這個網址訪問你的服務。

![](/zh-cn/stage-2/backend/zeabur-deployment/images/image16.png)

創建完成後，你會看到多個程序（服務）依次啟動。需要耐心等待所有服務都進入"已啟動"狀態。（Dify 服務是由多個程序組成的，每個程序負責不同的功能，它們之間會相互協作。）

一般來說，你只需要點擊左側的 Dify 應用，就可以看到默認的訪問入口地址。但在本例中，由於前面還套了一層 nginx，你需要點擊 nginx 服務來獲取最終訪問地址。可以理解為：nginx 就是負責對外統一"收發請求"的主程序，它會把外部訪問的地址分發給內部各個服務。點擊左側的 Nginx，在詳情頁中可以看到當前的服務地址，然後在瀏覽器裡打開這個地址，等待服務完全啟動。

![](/zh-cn/stage-2/backend/zeabur-deployment/images/image17.png)

稍等片刻後，你就能看到 Dify 的登錄界面了。輸入郵箱地址和註冊密碼，就可以開始使用你自己的 Dify 服務了。

![](/zh-cn/stage-2/backend/zeabur-deployment/images/image18.png)

如果你有興趣，還可以順便啟動一個 n8n 服務。n8n 也是海外非常流行的一款 AI 工作流平臺。

![](/zh-cn/stage-2/backend/zeabur-deployment/images/image19.png)![](/zh-cn/stage-2/backend/zeabur-deployment/images/image20.webp)

## 使用 Zeabur 與 Trae 部署貪吃蛇遊戲

在本教程的下一個部分，我們會體驗 Zeabur 的一些進階用法。我們先用 Trae 生成一個貪吃蛇小遊戲，再把它部署到 Zeabur 的服務器上，並配置一個可公開訪問的鏈接，讓任何人都可以打開你的遊戲。

第一步，是在本地使用 Trae 創建一個貪吃蛇項目。

### 使用 HTML 框架實現

![](/zh-cn/stage-2/backend/zeabur-deployment/images/image23.webp)

對於 Trae 來說，生成一個基於 HTML 的貪吃蛇網頁遊戲非常簡單。遊戲生成完成後，你只需要按照前面介紹的 Zeabur 本地部署方式，把包含所有文件的文件夾上傳上去即可。

![](/zh-cn/stage-2/backend/zeabur-deployment/images/image24.png)![](/zh-cn/stage-2/backend/zeabur-deployment/images/image25.png)![](/zh-cn/stage-2/backend/zeabur-deployment/images/image26.png)

完成後，你就會進入該服務的詳情界面：

![](/zh-cn/stage-2/backend/zeabur-deployment/images/image27.webp)

點擊左側的 "Network" 選項，在頁面中找到 "Public Address" 區域。點擊 "Generate Domain"，即可生成一個對外訪問地址，你可以輸入任意喜歡的名稱。

![](/zh-cn/stage-2/backend/zeabur-deployment/images/image28.png)

![](/zh-cn/stage-2/backend/zeabur-deployment/images/image29.png)

生成完成後，只要在瀏覽器中打開這個地址，就可以運行你自己的貪吃蛇遊戲了。其它 HTML 類型的 Web 應用也可以用完全相同的方式來部署。

![](/zh-cn/stage-2/backend/zeabur-deployment/images/image30.png)

### 使用 React 框架實現

前面我們學習瞭如何部署基於 HTML 的 Web 應用。接下來，我們再嘗試部署一個目前更常用的前端框架：React 應用。相比純 HTML，React 被認為是一種更加成熟、現代的前端開發框架。它通過組件化的方式組織頁面結構，能夠顯著加快複雜頁面的開發，是企業級項目中非常主流的選擇。

![](/zh-cn/stage-2/backend/zeabur-deployment/images/image31.webp)

#### 重構為 React 架構

在 Trae 中，你只需要向 Agent 說明："幫我把這份程式碼重構成 React 架構"，就可以比較輕鬆地把原本基於 HTML 的結構重構成 React 項目。

![](/zh-cn/stage-2/backend/zeabur-deployment/images/image32.webp)

不過，相比簡單的 HTML 文件，React 應用依賴更復雜的構建工具和項目結構，因此部署過程也會稍微麻煩一些。一個典型的問題體現在端口設置上：默認情況下，React 應用一般會監聽 3000 端口（你也可以在配置文件或啟動日誌中看到這一點）。

然而，在 Zeabur 上這樣部署會失敗——因為 Zeabur 只支持監聽 8080 端口的應用。也就是說，如果想讓 React 應用在 Zeabur 上正常運行，我們必須先把默認監聽端口從 3000 改成 8080。

要正確進行這一步配置，我們需要先弄清楚兩個概念：什麼是"端口（Port）"，以及"監聽端口（Listening Port）"是什麼意思。

#### 什麼是端口？

> 在計算機網路中，端口可以理解為一個"邏輯通信端點"，用來區分同一臺設備上運行的不同網路服務。簡單類比的話，如果 IP 地址好比一個"門牌號"（例如 162.128.1.1），那端口號就像這棟樓裡不同房間的"房間號"——每個房間對應一個服務（例如 Web 服務器、郵箱服務，或者你的 React 應用）。
>
> 端口號用 16 位整型表示，取值範圍是 0 到 65535。

如果不想記這些細節，可以簡單理解：端口是構成"網路訪問地址"的一個必要部分。

我們平時訪問網站或 IP 地址時，通常不會手動加端口號，是因為 Web 的默認端口是 80 或 443（HTTPS）。大多數瀏覽器會自動使用這些標準端口。而對於一些特殊端口，比如 React 默認的 3000、Zeabur 要求的 8080，我們就必須在地址後面加上 `:3000` 或 `:8080` 才能訪問到對應的內容。

#### 什麼是"監聽端口號"？

> "監聽端口號"指的是某個程序在一臺設備上主動"打開並監控"的端口。當一個應用設置了監聽端口時，其實就是在告訴操作系統："我會一直在這個端口上等待網路請求——只要有請求進來，就請轉發給我。"

再形象一點地理解：假設你的電腦是一棟寫字樓，IP 地址是這棟樓的地址。樓裡開了很多公司或部門，它們分別佔用不同的房間，房間號就是端口號。

當默認的 React 開發服務器啟動時，它會"打開"某個房間的門，並安排"前臺"在門口值班，這個房間號就是它的監聽端口——3000。

同時，React 程序還會告訴這棟樓的"物業管理"（操作系統）："我在 3000 號房間，請把所有寄給 3000 的信件（網路請求）都轉給我。"

這樣，當你訪問 React 網站時，請求首先會到達這棟樓；物業看到請求要送到 3000 號房間，就會立刻把請求交給 React 的"前臺"，由它來處理並返回結果——這就是訪問 React 應用的過程。

當你在本地執行 `npm start`（本地啟動 React 開發服務器的默認命令，也可以在 Vibe Coding 的 Agent 側邊欄中執行）時，React 開發服務器就會自動把監聽端口設置為 3000。  
而 Zeabur 的平臺設計決定了它只會"識別"監聽 8080 端口的應用。如果你的 React 應用仍然使用默認的 3000 端口，Zeabur 就無法將請求正確轉發給你的應用，最終導致部署失敗。

#### 修改默認監聽端口

要把 React 默認監聽端口（3000）改成 Zeabur 所要求的 8080，有很多做法。最簡單的方式，就是直接在 Trae 裡對 Agent 下指令："請幫我把這個 React 項目的默認端口改為 8080。"Trae 就會幫你修改項目中對應的配置文件。修改完成後，你只需重新打包並按前面的方式上傳到 Zeabur 即可。

![](/zh-cn/stage-2/backend/zeabur-deployment/images/image33.webp)

![](/zh-cn/stage-2/backend/zeabur-deployment/images/image34.png)

在網路設置中指定一個訪問 URL，方式和部署 HTML 項目時基本相同，就可以啟動 React 版本的服務。

![](/zh-cn/stage-2/backend/zeabur-deployment/images/image35.webp)

![](/zh-cn/stage-2/backend/zeabur-deployment/images/image36.png)

對於其它需要修改端口號的程序，你也可以採用同樣的思路：先改默認端口，再上傳到 Zeabur 部署。至此，你已經掌握了將常見 Web 應用部署到服務器的基礎技能。

你可以嘗試讓 Trae 幫你構建不同類型的應用，並把它們部署到 Zeabur 的默認服務器上。在後續課程中，我們還會學習如何把應用部署到你自己購買的雲服務器上。

---

# ⚠️ 如何停止和刪除項目（Zeabur）

由於啟用服務器相關資源都會產生費用，我們在使用時一定要養成"及時關閉不用服務"的習慣，避免把每個月的免費額度消耗完。

如果要找到項目的管理入口，首先點擊項目中的 "Settings" 選項。

![](/zh-cn/stage-2/backend/zeabur-deployment/images/image21.webp)

進入設置頁面後，將頁面拉到最下方，你會看到類似下面的界面：

![](/zh-cn/stage-2/backend/zeabur-deployment/images/image22.png)

你可以點擊 "Suspend All Services" 來暫停所有服務以降低費用；如果服務出現問題，可以點擊 "Restart All Services" 對全部服務進行重啟。如果你確定不再需要這個項目，可以點擊 "Delete Project" 將整個項目徹底刪除。

---

# 總結

在本教程中，我們介紹了四個常用的 Web 應用部署平臺：

1. **騰訊雲 CloudBase**：適合國內用戶，訪問速度快，與微信生態整合好
2. **Vercel**：適合現代前端框架項目，與 GitHub 集成緊密，全球 CDN 加速
3. **Netlify**：功能全面，支持表單處理和身份驗證，適合需要高級功能的靜態網站
4. **Zeabur**：適合複雜項目，服務模板豐富，支持多種部署方式

選擇哪個平臺取決於你的具體需求：
- 如果主要面向國內用戶，推薦 **CloudBase**
- 如果使用 React/Next.js 等框架，推薦 **Vercel** 或 **Netlify**
- 如果需要表單處理、身份驗證等高級功能，推薦 **Netlify**
- 如果需要部署 Dify、n8n 等服務，推薦 **Zeabur**

無論選擇哪個平臺，部署的核心流程都是相似的：準備程式碼 → 選擇平臺 → 配置構建設置 → 部署上線。掌握這些技能後，你就可以將自己開發的應用分享給全世界了！
