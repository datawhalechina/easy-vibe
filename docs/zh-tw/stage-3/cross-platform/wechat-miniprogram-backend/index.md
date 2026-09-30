---
title: '如何建立包含後端的微信小程式'
description: '在已能執行的小程式上加入可信身分、雲函式、售後工單、資料庫、檔案、權限與日誌。'
---

# 如何建立包含後端的微信小程式

上一章的小程式頁面在使用者手機上執行；這一章補上企業服務背後真正需要的部分：可信身分、共享資料、權限、檔案和日誌。

我們把原專案改成 Northstar Service Hub。會員建立售後工單，換一台裝置仍能看到同一筆記錄，而公司的密鑰與規則不會放進小程式。

![Uber 微信小程式的路線、訂單與付款頁面](../../../../zh-cn/stage-3/cross-platform/wechat-miniprogram/images/wechat-uber-mini-program.webp)

## 1. 前端是入口，後端負責判斷

前端是微信裡的頁面、按鈕和表單；後端在可信環境中識別使用者、檢查權限、寫入資料庫並連接公司系統。前端送出的資料可以被修改，因此身分和角色必須由後端判斷。

第一次先走最短官方路線：微信雲開發、雲函式、文件資料庫與雲端儲存。已有企業後端也可以直接透過 HTTPS 接入，不是所有帶後端的小程式都必須購買 CloudBase。

## 2. 準備工具與雲端環境

沿用上一章的帳號、AppID、微信開發者工具與 Trae。

![在微信開發者工具掃碼登入](../../../../zh-cn/stage-3/cross-platform/wechat-miniprogram/images/image5.png)

![CloudBase AI 一鍵插件](../../../../zh-cn/stage-3/cross-platform/wechat-miniprogram-backend/images/cloudbase-ai-plugin-current.jpg)

![CloudBase 的 Trae 設定指南](../../../../zh-cn/stage-3/cross-platform/wechat-miniprogram-backend/images/cloudbase-trae-guide-current.jpg)

在開發者工具開啟雲開發並建立環境。方案價格和免費額度會變動，建立前先看目前購買頁。如果只做單機資料，或公司已有後端，並不需要為了「小程式」三個字另外購買一套服務。

![目前的建立雲端環境指南](../../../../zh-cn/stage-3/cross-platform/wechat-miniprogram-backend/images/cloudbase-create-env-guide-current.jpg)

![目前的 CloudBase 控制台登入頁](../../../../zh-cn/stage-3/cross-platform/wechat-miniprogram-backend/images/cloudbase-console-current.jpg)

## 3. 先做出三個頁面

> 把目前專案改成客戶服務小程式。加入會員首頁、建立工單和我的工單。先用範例資料，並保持專案能執行。

先讓 AI 說明修改計畫，完成後在微信開發者工具重跑。錯了就回退，不要在錯誤版本上繼續堆功能。

## 4. 跑通第一個雲函式

雲函式是在 CloudBase 可信環境執行的後端程式。先做最小測試：

> 加入一個回傳伺服器時間的雲函式，頁面用按鈕呼叫並顯示結果。完成後告訴我在哪裡部署。

部署後點擊按鈕，確認時間真的改變，再加入身分：

> 讓雲函式從微信可信呼叫環境取得目前使用者，不要相信頁面傳來的使用者 ID 或角色。

介面與一般日誌都不要顯示完整 OpenID 或聯絡資料。

## 5. 保存第一張工單

> 透過雲函式保存工單。後端檢查必填欄位，寫入可信的目前使用者，並回傳容易辨識的工單編號。

![Northstar Service Hub 的會員與工單頁面](../../../../zh-cn/stage-3/cross-platform/wechat-miniprogram-backend/images/wechat-enterprise-service-hub.png)

成功要在兩個地方看得到：頁面顯示工單編號，資料庫也有一筆相同記錄。

![CloudBase 文件資料庫操作指南](../../../../zh-cn/stage-3/cross-platform/wechat-miniprogram-backend/images/cloudbase-database-guide-current.jpg)

雲函式或管理端寫入資料時不會自動產生 `_openid`。如果權限規則需要資料歸屬，就由雲函式把可信環境取得的歸屬資訊主動寫入。

## 6. 防止重複送出並隔離帳號

> 每次送出都使用固定的 `clientRequestId`。相同編號再次送來時，回傳原工單，不要再建立一張。

用同一編號獨立請求兩次，兩次都應回傳同一工單，資料庫只能有一筆。

> 我的工單只能回傳目前可信使用者自己的資料，不能讓頁面改 ID 後讀取別人的工單。

使用兩個微信帳號交叉測試。前端把按鈕藏起來不是權限控制，後端必須真的拒絕未授權請求。

## 7. 最後再加照片與日誌

> 每張工單最多附三張照片。限制類型和大小、顯示進度，失敗時保留原工單。

檔案不要永久公開。文字和媒體準備給真實使用者時，再加入合適的內容審核流程。

發生錯誤時，把頁面錯誤與雲函式日誌一起交給 AI：

> 頁面錯誤是：【貼上】。雲函式日誌是：【貼上】。找出第一個失敗步驟，只修那一段。

![CloudBase 日誌檢索指南](../../../../zh-cn/stage-3/cross-platform/wechat-miniprogram-backend/images/cloudbase-log-guide-current.jpg)

## 8. 發布前再做一次雙帳號驗證

正式版要確認生產環境、雲函式、集合、索引、權限規則、日誌與告警都已部署，再上傳體驗版。開發、測試與生產環境分開後，把環境 ID 集中設定，避免選錯。

完成標準很具體：A 帳號建立工單後，在另一台裝置仍看得到；資料庫有同一筆記錄；B 帳號無法讀取。這條路跑穩後，才能安心擴展預約、維修、會員與售後服務。
