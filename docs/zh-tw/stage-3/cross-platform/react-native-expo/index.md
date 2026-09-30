---
title: '從零開始用 React Native + Expo 做門市巡檢 App'
description: '從空白 Expo 專案做到可保存記錄的門市巡檢 App，並看懂 Android、iOS 與 Web 的開發邊界。'
---

# 從零開始用 React Native + Expo 做門市巡檢 App

假設連鎖門市每天都要檢查照明、價籤、走道和消防出口。員工需要在手機上逐項勾選、留下說明並保存記錄，主管也希望快速在瀏覽器查看。這正是 React Native 與 Expo 適合處理的企業場景。

## 1. React Native 與 Expo 分別做什麼

React Native 讓你用 React 和 TypeScript 建立 Android、iOS 介面；Expo 則提供建立專案、開發伺服器、常用裝置能力、打包與更新工具。

「一套程式碼」不代表每一行都相同，而是讓畫面和商業邏輯盡量共用，真正不同的裝置能力再分開處理。

## 2. 先看三個正式產品

**Shopify POS** 是店員在實體門市結帳、查庫存與連接零售設備的平台。它提醒我們：首頁要先放下一個工作和今日進度，也要在門市真正使用的低階裝置上測試。

![Shopify POS 的門市與庫存介面](../../../../zh-cn/stage-3/cross-platform/react-native-expo/images/shopify-pos-product.jpg)

**Discord** 是社群與通訊平台。它在 Android、iOS 共用大量產品程式碼，但仍保留必要的平台差異。

![Discord Android 角色頁面的改版比較](../../../../zh-cn/stage-3/cross-platform/react-native-expo/images/discord-react-native-roles.png)

**MTA TrainTime** 是紐約通勤鐵路的官方行程與票務 App。Expo 的案例說明了建置與發布工具也能支援正式產品。

![Expo 案例中的 MTA TrainTime](../../../../zh-cn/stage-3/cross-platform/react-native-expo/images/expo-mta-case.webp)

## 3. 建立第一個專案

```bash
npx create-expo-app@latest store-inspection
cd store-inspection
npm run web
```

瀏覽器出現範例頁後，先保留這個可以回復的版本，再對 AI 說：

> 把目前的 Expo 範例改成門市巡檢首頁。顯示門市名稱、今日進度，以及一個「開始巡檢」按鈕。

![React Native 與 Expo 專案的關係](../../../../zh-cn/stage-3/cross-platform/react-native-expo/images/react-native-expo-architecture.svg)

## 4. 做出第一張巡檢單

> 新增巡檢頁，放入照明、價籤、走道和消防出口四個項目。點擊後切換完成狀態，並更新進度。

實際點完四項，再取消其中一項，確認數字會正確增減。

![Expo Web 中實際執行的巡檢 App](../../../../zh-cn/stage-3/cross-platform/react-native-expo/images/expo-web-running.png)

把瀏覽器縮窄，檢查按鈕與文字沒有被截斷。

![同一個 App 的窄螢幕版面](../../../../zh-cn/stage-3/cross-platform/react-native-expo/images/expo-web-mobile-layout.png)

## 5. 保存一筆記錄

> 新增現場說明與「保存」按鈕。保存後，在下方顯示時間、完成數量和說明。

![點擊並保存後的真實巡檢記錄](../../../../zh-cn/stage-3/cross-platform/react-native-expo/images/expo-web-record-saved.png)

接著讓資料留在裝置上：

> 把進度與巡檢記錄保存在本機。關閉後重新開啟時要恢復，先不要接伺服器。

少量資料可用 `AsyncStorage`；資料開始出現巡檢單、明細與待上傳工作之間的關係時，可改用 `expo-sqlite`。

## 6. 再加入照片、登入與後端

普通保存穩定後，再逐步增加：

> 讓未完成的項目可以附上一張照片，顯示預覽，也可以移除。

> 接上既有登入 API。使用者只能看到伺服器分配給他的門市。

登入憑證要放進 `SecureStore`。公司後端密鑰不能放在 App 或 `EXPO_PUBLIC_` 變數裡，因為客戶端內容最後都可能被讀取。

離線同步是「斷網時先存在本機，連線恢復後再上傳」。等本機保存與後端都正常，再加入待同步、重試與唯一請求編號，避免同一張巡檢單被重複建立。

## 7. 到真機上完成最後驗證

Expo Go 適合早期開發；加入自訂原生能力後，應改用 development build。正式發布前，要在 Android 與 iPhone 真機測試鍵盤、權限、相片、重新啟動、弱網、重試、登出與版本升級。

本章原型使用 Expo SDK 57 與 TypeScript，型別檢查、Web 正式匯出、勾選與保存都已實際完成。這台電腦沒有可用的 Android 模擬器與 iOS Simulator Runtime，因此沒有把手機建置、簽名與上架寫成「已通過」。

先把「開啟巡檢表、完成一項、保存說明、重新開啟後仍看得到」這條路做穩，再增加相片、帳號與同步。
