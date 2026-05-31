# 如何建置 iOS 應用程式 - 原生 SwiftUI 開發

## 第 1 章：什麼是 iOS 應用程式與 iOS 應用程式開發

在本教學中，我們將完成一個完整的閉環：**從你腦中的一個想法，到一個能夠成功安裝並在 iPhone 上運行的真實 iOS 應用程式。**

進行本教學，你至少需要具備：

1. 一台運行較新 macOS 的 Mac
2. 一支運行較新 iOS 版本的 iPhone，並已啟用開發者模式
3. 已成功安裝 Xcode
4. 已安裝並開啟 Trae
5. 一個可用的 Apple ID

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image1.png)

### 1.1 iOS 應用程式

iOS 應用程式是運行在 iPhone 作業系統上的原生應用。它啟動快速、體驗流暢，可以深度使用通知、相機、本機儲存等系統功能。

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image2.png)

### 1.2 iOS 應用程式開發

建置 iOS 應用程式的核心只需要幾件事：

1. 明確你的應用程式要解決什麼問題
2. 設計使用者可以看到和操作的介面
3. 定義應用程式在不同操作下的行為
4. 正確建置應用程式並安裝到 iPhone 上

### 1.3 常見的 iOS 應用程式建置方式

在實際開發中，建置 iOS 應用程式的方式不止一種。我們在此不深入探討，僅提供整體概念。

第一種方式是 Apple 官方的原生路線：在 Xcode 中建立專案，使用 Swift 和 SwiftUI 建置介面和邏輯。

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image3.png)

第二種方式是使用跨平台框架，例如 React Native 和 Flutter，將一份程式碼適配到多個平台。

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image4.png)

基於以上方式，本教學選擇：**以原生 SwiftUI 開發為基礎，由 AI 工具完成大部分的程式設計工作**。

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image5.png)

### 1.4 本教學涵蓋的 iOS 應用程式開發步驟（整體預覽）

本教學使用的範例應用程式是 **FridgeChef**。

使用者輸入冰箱中目前可用的食材，應用程式使用真實的 AI API 生成可行的食譜，然後將結果儲存到本機供日後查看。這個範例完整涵蓋了真實 iOS 應用程式的核心部分，包括 UI 輸入和顯示、網路請求、資料解析、本機儲存，以及最終在真實裝置上安裝和運行。

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image6.png)

- 從原型到原生應用的整體思路

在實作上，本教學採用分階段的方式。我們先使用 AI 快速生成一個 HTML 和 CSS 的介面原型，在瀏覽器中確認佈局結構和資訊層級，然後再遷移到 SwiftUI 中。

- 整體開發流程預覽

總體來說，後續章節將按以下階段依序進行：

1. 建立基本認知
   理解 iOS 應用程式的形態、常見的開發方式，以及範例應用程式要解決的問題。
2. 完成環境準備
   準備一台 Mac 和一支 iPhone，更新系統，安裝 Xcode 和 Trae，並建立一個能在模擬器中成功運行的基本 iOS 專案。
3. 進入正式開發
   在 Trae 中開啟專案，透過與 AI 的對話逐步生成 UI 和基本互動，將應用程式從空殼變成可用的成品。
4. 除錯和整理
   當編譯錯誤出現或行為與預期不符時，讓 AI 協助排查；當結構變得混亂時，使用 AI 重構和簡化。
5. 在真機上運行
   配置簽名，將應用程式安裝到真實的 iPhone 上，完成從程式碼到硬體的一次完整驗證。

## 第 2 章：開發環境準備

### 2.1 所需裝置和系統

在本實作中，有兩件硬體是不可替代的：一台 Mac 和一支 iPhone。
同時，兩台裝置都應運行**較新的官方系統版本**。

#### 2.1.1 Mac

iOS 應用程式只能在 macOS 上開發和編譯。這是 Apple 平台的硬性要求。

為確保 Xcode 能正常安裝和使用，建議你先將 macOS 更新到較新的官方版本。你可以從**系統設定 -> 一般 -> 軟體更新**中檢查並更新。

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image7.png)

#### 2.1.2 真實的 iPhone 裝置

除了 Mac，本教學還需要一支真實的 iPhone 來驗證應用程式能否正確安裝和啟動。

為保持除錯過程順暢，iPhone 也應運行較新的 iOS 版本。你可以從**設定 -> 一般 -> 軟體更新**中檢查並更新。

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image8.png)

在後續的開發中，這支 iPhone 將透過傳輸線連接到 Mac 進行真機除錯。

#### 2.1.3 在 iPhone 上啟用開發者模式

要從 Xcode 在真實裝置上安裝和運行除錯應用程式，你需要在 iPhone 上啟用開發者模式。

步驟：

1. 開啟**設定**
2. 進入**隱私權與安全性**
3. 捲動到底部，找到**開發者模式**
4. 開啟它，然後按照提示重新啟動裝置
5. 重新啟動後，解鎖裝置並確認啟用開發者模式

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image9.png)

如果你的 iPhone 之前從未連接到 Xcode 或其他開發工具，你可能會發現**開發者模式**沒有出現在**隱私權與安全性**下。這不是系統問題——只是開發者模式尚未被觸發。

在這種情況下，你可以按照以下步驟讓它出現：

1. 開啟**設定 -> 隱私權與安全性 -> 分析與改進**
2. 開啟**與 App 開發者分享**
3. 返回上一層，再次進入**隱私權與安全性**，捲動到底部
4. 你現在應該能看到**開發者模式**，然後啟用它並重新啟動裝置

完成以上步驟後，開發者模式只需啟用一次。之後使用 Xcode 進行真機除錯時不需要重複此配置。

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image10.png)

### 2.2 所需軟體

裝置和系統準備好後，你還需要安裝用於開發的軟體。本教學只使用兩類工具：官方 iOS 開發工具和 AI 輔助開發工具。

#### 2.2.1 Xcode

Xcode 是 Apple 官方的 iOS 開發工具。在本教學中，它主要用於建立 iOS 專案、編譯 Swift / SwiftUI 程式碼，以及在模擬器或真實裝置上運行應用程式。

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image11.png)

Xcode 可以直接從 App Store 搜尋並安裝。安裝後，首次開啟時你會看到歡迎畫面。之後的專案建立就從那裡開始。

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image12.png)

#### 2.2.2 Trae

Trae 是本教學中進行開發工作的主要環境。你會將整個 iOS 專案放入 Trae，透過對話與 AI 協作完成開發。

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image13.png)

### 2.3 Apple ID 和開發除錯注意事項

在 iOS 平台上，要讓應用程式安裝到真實裝置上，必須經過開發者簽名。本教學不要求你付費加入 Apple Developer Program。個人的 Apple ID 就夠了。

### 2.4 進入下一章前的檢查清單

在進入下一章之前，你可以對照以下清單檢查你的目前狀態。

你現在應該已經有：

1. 一台運行較新 macOS 的 Mac
2. 一支運行較新 iOS 版本並已啟用開發者模式的 iPhone
3. 已成功安裝 Xcode
4. 已安裝並開啟 Trae
5. 一個可用的 Apple ID

如果這些都準備好了，你可以繼續建立你的第一個 iOS 應用程式。

## 第 3 章：建立第一個 iOS 專案

### 3.1 使用 Xcode 建立新專案

開啟 Xcode。在歡迎畫面中，選擇建立新專案。

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image14.png)

點擊 **Create new project** 進入專案範本選擇畫面。

### 3.2 選擇應用程式範本和技術棧

在範本選擇畫面中，使用以下配置：

1. 平台：iOS
2. 應用程式類型：App

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image15.png)

點擊 **Next** 進入專案資訊配置畫面。

### 3.3 配置專案資訊

在專案資訊畫面中，只需填寫基本設定：

1. Product Name：應用程式名稱（例如 `FridgeChef`）
2. Team：選擇你的個人 Apple ID
3. Organization Identifier：反向域名格式（例如 `com.example`）
4. Bundle Identifier：自動生成，保持預設
5. Testing System：Swift Testing with XCTest UI Tests
6. Storage：選擇 Core Data（用於後續儲存食譜歷史）
7. 其他選項保持預設

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image16.png)

點擊 **Next** 並選擇專案儲存位置。

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image17.png)

### 3.4 認識建立後的專案結構

專案建立後，Xcode 會自動開啟工作區。此時你不需要理解每個檔案。你只需要認識幾個關鍵部分。

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image18.png)

在預設專案中，你會看到：

- 一個以專案名稱命名的資料夾
- 一個以 `App` 結尾的 Swift 檔案（應用程式入口）
- 一個 `ContentView.swift` 檔案（預設頁面）

這已經是一個最小可運行的 iOS 應用程式。

### 3.5 運行第一個 iOS 應用程式

在修改任何程式碼之前，先直接運行原始專案。

在 Xcode 的頂部工具列中，保持預設的 iPhone 模擬器被選取，然後點擊左上角的 **Run** 按鈕。

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image19.png)

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image20.png)

如果一切正常，模擬器會顯示一個可以成功啟動的空白應用程式。首次編譯可能需要較長時間。在後續章節中，我們透過先使用 HTML 原型來減少等待時間。

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image21.png)

要停止應用程式，點擊 Run 按鈕旁的 **Stop**。

### 3.6 在這個階段你實際達成了什麼

雖然介面仍然簡單，但你已經完成了幾個關鍵確認：

1. 專案可以成功編譯
2. 模擬器可以正確運行應用程式
3. 開發流程已被證明可以端到端運作

這意味著未來的問題將主要集中在**程式碼和邏輯本身**，而不是環境問題。

### 3.7 將專案交給 Trae

從下一節開始，主要的開發工作將逐漸轉移到 Trae 中。

你需要做的很簡單：**在 Trae 中開啟你剛才建立的 iOS 專案資料夾。**

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image22.png)

## 第 4 章：AI 輔助開發實踐 - 從零建置 FridgeChef

本章是整個教學的核心部分。

本教學不採用「先寫 SwiftUI、反覆編譯、不斷調整預覽」的傳統路線。相反，我們使用更高效的流程：
**先使用 HTML 快速驗證介面結構，然後將確認的結果遷移到 SwiftUI 中，最後逐步完成業務邏輯、本機資料和互動細節。**

### 4.1 第一階段：需求釐清

在寫程式碼之前，第一步不是建頁面——而是釐清我們要建什麼。**讓 AI 先像產品經理一樣，將需求整理成結構化的規格文件。**

在 Trae 的聊天視窗中，輸入以下指令。Trae 會在專案根目錄生成一個 `REQUIREMENTS.md` 檔案，描述整個應用程式的功能和結構。

📋 **可複製的提示詞：**

```text
我們現在要開發一個名為「FridgeChef」的 iOS 應用程式。

1. 核心概念
這是一個解決「不知道冰箱裡剩下的食材能做什麼菜」問題的 AI 助手。
使用者輸入目前擁有的食材，應用程式呼叫大模型生成實用的食譜。

2. 核心功能
- 首頁：
  顯示醒目的「開始烹飪」入口，下方以卡片或列表形式顯示歷史食譜記錄。
- 輸入頁面：
  使用者輸入食材，支援文字輸入或簡單的快速標籤。
- 結果頁面：
  顯示 AI 生成的食譜，包括菜名、食材列表和烹飪步驟。

3. 技術要求
- 使用 SwiftUI
- 本機儲存資料（Core Data）
- 支援基本的頁面導航和狀態更新

請幫我從產品經理的角度將這些整理成一份清晰、結構化的 REQUIREMENTS.md 文件，並儲存在專案根目錄。
```

生成後，快速瀏覽文件並確認功能點是否符合你的預期。

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image23.png)

### 4.2 第二階段：視覺原型

讓 AI 使用 **HTML + CSS** 快速繪製一個高保真介面原型，讓我們先確認整體佈局和風格。繼續在 Trae 中輸入：

📋 **可複製的提示詞：**

```text
需求已確認。
請使用 HTML + Tailwind CSS 為我生成一個高保真介面原型。

設計風格：Neo-Pop
配色：
- 背景：淺米色 #FFFDF5
- 強調色：酸性綠 #CCFF00、亮粉色

視覺特徵：
- 3px 粗黑色邊框
- 無模糊的硬陰影（偏移 4px）
- 大圓角卡片，整體貼紙 / 漫畫風格

佈局要求：
- 首頁使用類似 Bento Grid 的佈局
- 包含兩個畫面：首頁和輸入頁面

請生成一個單一檔案 index.html，並在內容周圍模擬 iPhone 螢幕比例。
```

生成後，在檔案列表中找到 `index.html` 並直接在瀏覽器中開啟。

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image24.png)

在這個階段，重點不是每個細節是否完美。重點是**頁面結構是否合理、主要元素是否齊全、整體方向是否正確。**

### 4.3 第三階段：原生重建

HTML 原型確定後，**將確認的介面翻譯成 SwiftUI。**

步驟：

1. 將 `index.html` 檔案（或瀏覽器截圖）上傳到 Trae
2. 告訴 AI 根據它生成 SwiftUI 程式碼

📋 **可複製的提示詞：**

```text
[index.html 已上傳]

請閱讀此 HTML 檔案的佈局和樣式。

任務：使用 SwiftUI 在當前專案中重建此介面。

要求：
1. 封裝一個 NeoPopStyle 修飾器，包含背景色、粗邊框和硬陰影
2. 建立 HomeView.swift 作為首頁佈局
3. 建立 InputView.swift 作為輸入頁面
4. 目前使用 Mock Data，確保能在 Xcode Preview 和模擬器中正確顯示
```

完成後，開啟 Xcode 並運行模擬器。你會看到一個已經有完整視覺結構的 iOS 應用程式。

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image25.png)

### 4.4 第四階段：連接 AI API

介面完成後，應用程式還只是一個顯示層。接下來我們需要連接真實的 AI 能力。本教學使用 **SiliconFlow** 提供的大模型服務：
[https://cloud.siliconflow.cn](https://cloud.siliconflow.cn/)

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image26.png)

SiliconFlow 提供與 OpenAI API 規範相容的 API，因此使用標準的網路請求從 iOS 專案中呼叫非常方便。

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image27.png)

開始之前，你需要在網站上註冊一個帳號並建立 API Key。

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image28.png)

這個 Key 將用於後續的模型呼叫。

📋 **可複製的提示詞：**

```text
現在我們需要連接 AI 能力。

請建立 APIService.swift。

配置：
- Base URL：https://api.siliconflow.cn/v1
- 模型：Qwen/Qwen2.5-7B-Instruct
- API Key：先定義為變數，我稍後會填入

功能：
- 寫一個 generateRecipe(ingredients: [String]) 方法
- System Prompt 必須嚴格要求模型只回傳純 JSON
- JSON 欄位應包含：dishName、ingredients、steps

同時定義一個 RecipeModel 結構體來解析回傳的資料。
```

程式碼生成後，在 `APIService.swift` 中填入你自己的 Key。

### 4.5 第五階段：Core Data 本機儲存

為了讓應用程式記住它生成過的食譜，我們需要引入本機資料儲存。此階段分為兩步。

**第一步：在 Xcode 中手動配置 Core Data**

1. 開啟 `FridgeChef.xcdatamodeld`
2. 建立一個新的 Entity，命名為 `RecipeEntity`

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image29.png)

3. 新增以下屬性：
   1. `id`：**UUID**
   2. `name`：**String**
   3. `cookTime`：**String**
   4. `difficulty`：**String**
   5. `desc`：**String**
   6. `timestamp`：**Date**
   7. `colorIndex`：**Integer 16**

      ![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image30.png)

**第二步：讓 AI 寫邏輯程式碼**

📋 **可複製的提示詞：**

```text
我已完成 Core Data Entity 的配置。

Entity：RecipeEntity
Attributes：id、name、difficulty、timestamp、colorindex、cookTime、desc

請完成以下任務：
1. 食譜生成成功後將資料儲存到 Core Data
2. 在首頁使用 FetchRequest 讀取歷史記錄並按時間倒序顯示
3. 當資料庫為空時，顯示友善的空狀態提示
```

### 4.6 第六階段：生成應用程式圖示

最後一步是為應用程式準備一個合適的圖示。這裡我們使用 **Lovart** 來生成圖示素材：[https://www.lovart.ai/zh](https://www.lovart.ai/zh)

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image31.png)![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image32.png)

📋 **複製到 Lovart 的提示詞：**

```text
主題：一個可愛的擬人化冰箱角色，帶有開心的表情
風格：極簡 App Icon，Neo-pop 風格，粗黑色輪廓，向量藝術
配色：酸性綠（#CCFF00）和深藍色
背景：純奶油色
負面提示詞：文字、寫實細節、3D 渲染、複雜背景
```

生成後，將圖片裁切為 1024x1024 並拖入 Xcode 中的 `Assets.xcassets` -> `AppIcon`。

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image33.png)

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image34.png)

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image35.png)

再次運行應用程式，你現在會看到一個完整的、可辨識的真實 iOS 應用程式。

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image36.png)

### 4.7 第七階段：進階體驗升級

功能穩定後，如果你想進一步改善視覺風格，只需要向 AI 描述你想要的效果，讓它生成新的設計方案，然後將確認的結果遷移到 SwiftUI 中。

📋 參考提示詞：

```text
應用程式的功能已經完成，但我想嘗試更具視覺衝擊力的 UI 風格。
請先為我生成一個新的 HTML + Tailwind CSS 設計稿，檔案名稱為 design_v2.html。

設計風格：Neo-Pop（多巴胺風格）
配色要求：
使用 Deep Royal Blue 作為全螢幕背景
使用 Acid Green（#CCFF00）作為強調色

視覺感受：
所有卡片使用 3px 粗黑色邊框
使用不透明的硬陰影，無模糊，向右下偏移

佈局要求：
保持首頁結構不變
使用藥丸形按鈕和輸入框

請生成完整的程式碼讓我在瀏覽器中預覽。
```

生成後，在瀏覽器中開啟此 HTML 檔案。

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image37.png)

HTML 版本確認後，你就可以開始修改 iOS 專案了。

📋 參考提示詞：

```text
[design_v2.html 已上傳]
請分析此 HTML 的視覺風格，並將其遷移到當前的 iOS 專案中。

任務要求：
建立一個新的 NeoPopStyle.swift 檔案
封裝一個 neoPopBlue() 樣式修飾器

修飾器需要包含：
- 圓角
- 粗黑色邊框
- 不透明的硬陰影

重構 HomeView：
- 將背景改為 Deep Royal Blue
- 主按鈕使用 Acid Green
- 歷史記錄卡片使用白色背景
- 確保文字在深色背景上保持清晰可讀

請提供完整的修改後程式碼。
```

在 Xcode 中再次點擊 Run。如果一切正常，你應該會看到：

- 功能與之前完全相同
- 視覺風格有了顯著變化
- 整體應用程式品質感明顯提升

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image38.png)

## 第 5 章：運行、除錯和錯誤處理

在上一章中，你完成了核心功能並成功在模擬器中運行了應用程式。
但對於一個 iOS 應用程式來說，真正的完成不只是「編譯成功」——而是**穩定運行，並且知道問題出現時如何處理**。

### 5.1 在 Xcode 中運行應用程式

首先，確保專案可以在 Xcode 中正確運行。

在 Xcode 左上方，選擇運行裝置並保持預設的 iPhone 模擬器。點擊 **Run** 按鈕進行編譯和運行。如果一切正常，應用程式會在模擬器中啟動並顯示第 4 章中建置的介面。

### 5.2 在真實裝置上運行應用程式

使用傳輸線將 iPhone 連接到 Mac。

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image39.png)

首次連接時，手機會顯示**信任此電腦？**。點擊信任並輸入解鎖密碼。

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image40.png)

在 Xcode 的裝置列表中，選擇你的 iPhone，然後再次點擊 **Run**。

此時，你應該能在手機的主畫面上看到 **FridgeChef** 的圖示，並且可以正常開啟和使用。

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image41.png)

這一步標誌著一次完整 iOS 開發閉環的完成。

### 5.3 iOS 開發中的錯誤通常來自哪裡

在實際開發中，**遇到錯誤是正常的**，不是例外。

常見問題通常來自以下幾類：

1. **編譯錯誤**
   Swift 語法、類型不匹配、缺少參數等。Xcode 會直接用紅色標記。
2. **執行時錯誤**
   應用程式編譯通過，但在執行過程中閃退——例如陣列越界或強制解包 nil 值。
3. **權限或配置錯誤**
   網路請求被系統阻止、缺少 Info.plist 配置、簽名問題等。
4. **邏輯錯誤**
   應用程式不閃退，但行為不對——例如按鈕沒有回應或資料沒有刷新。

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image42.png)

當任何錯誤出現時，你只需要**將完整的錯誤訊息原封不動地複製到 Trae 的聊天框中。**在了解專案上下文的情況下，Trae 可以幫你進行除錯。

### 5.4 常見的真機除錯錯誤和解決方案

真機除錯過程中的錯誤非常常見。這些問題通常不是程式碼本身造成的，而是由裝置信任、安全規則或簽名配置引起的。如果應用程式無法在你的 iPhone 上順利運行，你可以先查看本節。

#### 1. 簽名和註冊問題

**常見症狀：**

- Xcode 顯示紅色錯誤，如
  `"Communication with Apple failed"`
  或
  `"No profiles for 'com.xxx.xxx' were found"`
- 或者提示
  `"Your team has no devices which are compatible"`

**原因：**

- Bundle Identifier 不唯一或無效
- 當前 iPhone 尚未在你的 Apple ID 下註冊為開發裝置

**解決方案：**

1. **修改 Bundle Identifier**
   在 Xcode 專案設定中，將 Bundle Identifier 改為更獨特的名稱，例如：
   `com.yourname.FridgeChef`
2. **讓 Xcode 自動註冊裝置**
   在錯誤提示中，點擊 `Try Again` 或 `Register Device`，讓 Xcode 自動完成裝置註冊和憑證配置。

#### 2. 裝置配對和連接問題

**常見症狀：**

- Xcode 顯示
  `"Device is not available because pairing is in progress"`
- 或者提示
  `"Device Locked"`
- 或者你已經點擊了信任，但 Xcode 仍然卡住

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image43.png)

**原因：**

- iPhone 仍處於鎖定狀態
- 配對過程尚未完全完成
- Xcode 尚未刷新連接狀態

**解決方案：**

1. 解鎖手機
   確保 iPhone 已解鎖並停留在主畫面。
2. 完成信任過程
   當手機彈出**信任此電腦？**時，點擊**信任**並**輸入鎖定密碼**。
3. 刷新連接狀態
   如果仍然卡住，拔掉傳輸線，等待 2-3 秒後重新連接。如有必要，重啟 Xcode 再試一次。

#### 3. 應用程式已安裝但無法開啟

**常見症狀：**

- 應用程式圖示已出現在 iPhone 主畫面上
- 系統顯示
  **不受信任的開發者**

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image44.png)

**原因：**

這是 iOS 的安全機制。使用個人 Apple ID 安裝的除錯應用程式需要手動的信任授權。

**解決方案：**

1. 開啟**設定**
2. 進入**一般**
3. 點擊**VPN 與裝置管理**
4. 在**開發者 App** 下，找到你的 Apple ID
5. 點擊**信任**，然後再次確認

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image45.png)

之後，返回主畫面再次點擊應用程式。它現在應該可以正常運行了。

## 第 6 章：如果你想將應用程式發佈到 App Store

在本教學中，我們主要完成的是**個人開發和除錯版本應用程式**的完整閉環：從建立專案、實現功能、除錯，一直到在真實裝置上成功安裝和使用。

如果你想更進一步，正式將應用程式發佈到 **Apple App Store**，讓所有使用者都能下載和使用，那麼你需要進入一個更正式的發佈流程。由於該流程涉及付費開發者帳號、審核規則和合規要求，且不是本教學的主要實作重點，以下內容僅作為**整體參考和路線圖**提供。

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image46.png)

> 以下內容參考了 Apple 官方審核要求和公開的經驗分享（包括知乎原創分享）。連結如下。如果任何連結失效，你可以透過標題或關鍵字搜尋找到原始來源。

### 6.1 Apple Developer Program

要將應用程式發佈到 App Store，你必須加入 Apple 的付費開發者計畫：

- **Apple Developer Program**（每年 99 美元）
- 官方網站：[https://developer.apple.com/](https://developer.apple.com/)

加入後，你可以使用 **App Store Connect** 建立應用程式條目、管理版本並正式發佈。

### 6.2 App Store Connect：建立應用程式條目

在 App Store Connect 中，你需要建立一個完整的應用程式記錄，包括但不限於：

1. 應用程式名稱和 Bundle ID
2. 描述、關鍵字和隱私權政策連結
3. 應用程式圖示、截圖和預覽素材
4. 定價和發佈地區設定

所有這些資訊都必須在提交審核前完成。

### 6.3 建置並提交審核

元資料準備好後，你需要：

1. 在 Xcode 中使用付費開發者帳號簽署 Release 版本
2. 建置並上傳正式版本
3. 在 App Store Connect 中提交審核

提交後，應用程式進入 Apple 的審核佇列。審核時間通常為 1-3 天，具體視情況而定。

### 6.4 審核規則和常見的被拒原因

Apple 主要從以下方面審核應用程式：

- 功能和穩定性
- 隱私權和資料合規
- 元資料與實際功能的一致性
- 是否存在侵權或誤導行為

如果應用程式不符合要求，審核將被拒絕，Apple 會提供具體原因。開發者隨後需要修改應用程式並重新提交。

### 6.5 被拒後怎麼辦

如果應用程式被拒，你可以：

- 根據回饋修改程式碼或描述
- 重新提交版本
- 透過 App Store Connect 與審核團隊溝通

這是發佈過程中非常常見的一部分，並不代表專案失敗。

### 參考來源

以下內容參考了 Apple 官方文件和公開的經驗分享：

- App Store Review Guidelines（Apple 官方）
  [https://developer.apple.com/app-store/review/guidelines/](https://developer.apple.com/app-store/review/guidelines/?utm_source=chatgpt.com)
- 提交審核的官方指南
  [https://developer.apple.com/cn/help/app-store-connect/manage-submissions-to-app-review/submit-for-review](https://developer.apple.com/cn/help/app-store-connect/manage-submissions-to-app-review/submit-for-review?utm_source=chatgpt.com)
- iOS App Store 發佈和審核坑點完全圖文指南（知乎）
  [https://zhuanlan.zhihu.com/p/146128612](https://zhuanlan.zhihu.com/p/146128612)

## 第 7 章：總結

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image47.png)

恭喜！至此，你已經親自走完了從 0 到 1 的完整 iOS 應用程式開發流程。從準備環境、運行專案，到逐步落地介面、功能、資料和真機測試，所有關鍵階段都已順利完成。更重要的是，你不是靠背誦 Swift 語法走到這裡的——而是將大部分實作交給了 AI。無論你的背景是什麼，每一次這樣的嘗試都會讓你更加流暢，你會發現 iOS 開發其實沒有想像中那麼困難。即使你之前一行程式碼都不會寫，你仍然可以建置屬於自己的應用程式。

回頭看，整個過程其實並不複雜：決定你要建什麼，用 HTML 快速驗證介面，轉換成 SwiftUI，連接 API 和本機資料，然後除錯運行一遍。在此基礎上，未來你也可以隨手建一個個人鬧鐘、一個極簡待辦清單，甚至一個用你喜歡的名人語氣說話的聊天機器人。

這正是本教學——以及 easy-vibe——想教給你的最重要的事。期待各位未來 Vibe Coding 大師們的最新創作，也期待有一天我被你們的作品驚豔到。
