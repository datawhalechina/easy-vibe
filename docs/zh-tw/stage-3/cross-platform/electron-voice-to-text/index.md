# 如何構建跨平台 Electron 桌面應用：語音轉文字應用

# 第一章：Electron 與桌面應用開發是什麼

在本教程中，我們將完成一個完整的閉環：使用 Electron 從零構建一個語音轉文字的桌面應用，支援雲端 API 和本地模型兩種識別模式，最終打包成可以在 Windows、macOS 和 Linux 上安裝運行的真實桌面應用。

學習本教程，你至少需要準備：

- 一台電腦（Windows 或 Mac，推薦 Mac，因為本地模型在 Apple Silicon 上運行非常快）
- Node.js 環境（18.0 或以上版本）
- 你的 AI 編碼助手（Cursor / Trae / Claude Code）
- （可選）一個 OpenAI API Key（如果你使用雲端模式）
- 一個麥克風（筆電內建麥克風即可）

## 1.1 什麼是 Electron？

你日常使用的應用，如 **VS Code、Slack、Discord 和 Notion**，都有一個共同點：它們都是用 **Electron** 構建的桌面應用。

Electron 是一個開源框架，讓你可以使用 **HTML + CSS + JavaScript**（和網頁用的技術棧一樣）來構建跨 **Windows、macOS 和 Linux** 運行的桌面應用。它的原理很簡單：將 Chromium 和 Node.js 打包在一起，你的網頁就變成了一個獨立的桌面應用。

**一句話理解**：Electron = 一個「隱形的 Chrome 瀏覽器」+ Node.js 系統能力。

<!-- ![placeholder: Electron 架構示意圖：Chromium（用於 UI 渲染）+ Node.js（用於系統訪問）= 桌面應用](/zh-cn/stage-3/cross-platform/electron-voice-to-text/images/image1.webp) -->

## 1.2 Electron 核心架構

一個 Electron 應用由兩種程序類型組成。理解它們是開發的關鍵：

**主程序（Main Process）**

* 應用的「總管」
* 負責創建視窗、管理應用生命週期、訪問檔案系統等原生能力
* 在 Node.js 環境中運行，可以使用所有 Node.js 模組
* 每個應用只有一個主程序

**渲染程序（Renderer Process）**

* 應用的「門面」
* 本質上是一個 Chromium 網頁，負責 UI 渲染
* 每個視窗對應一個渲染程序
* 出於安全原因，渲染程序不能直接訪問 Node.js API

**預載腳本（Preload Script）**

* 主程序和渲染程序之間的「橋樑」
* 使用 `contextBridge` 安全地將選定的 API 暴露給渲染程序

它們通過 **IPC（程序間通訊）** 進行溝通，就像打電話一樣：渲染程序說「我要開始錄音」，主程序收到請求後調用系統麥克風。

<!-- ![placeholder: Electron 程序架構示意圖，顯示主程序、渲染程序和預載腳本，以及它們之間的 IPC 通訊](/zh-cn/stage-3/cross-platform/electron-voice-to-text/images/image2.webp) -->

## 1.3 我們要構建什麼？

在本教程中，我們將構建一個**語音轉文字（Speech-to-Text）**桌面應用。它的功能很直接：

1. 點擊「開始錄音」按鈕，應用開始監聽麥克風
2. 說完後，點擊「停止」，應用將音頻發送給 AI 進行識別
3. 識別出的文字顯示在 UI 中，可以一鍵複製

**提供兩種識別模式：**

| 對比維度 | 雲端 API 模式 | 本地模型模式 |
|---------|-------------|------------|
| 代表方案 | OpenAI Whisper API | whisper.cpp |
| 是否需要網路 | 是 | 否 |
| 識別速度 | 取決於網路 | 取決於硬體（Apple Silicon 上非常快） |
| 中文識別品質 | 優秀 | 優秀（large-v3 模型） |
| 成本 | $0.006/分鐘 | 免費 |
| 模型大小 | 無需下載 | tiny 模型 75MB，large 模型 3GB |
| 最適合 | 快速上手、輕量使用 | 注重隱私、離線使用、長期高頻使用 |

<!-- ![placeholder: 應用預覽圖，顯示語音轉文字 UI：頂部有錄音按鈕和波形動畫，下方為識別文字，右上角有模式切換](/zh-cn/stage-3/cross-platform/electron-voice-to-text/images/image3.webp) -->

## 1.4 重要提醒：Electron 中無法使用 Web Speech API

如果你搜索過「Electron 語音識別」，可能會看到推薦使用瀏覽器內建的 `Web Speech API`。**請注意：這在 Electron 中不可用。**

Google 已經停止了對非 Chrome/Edge 瀏覽器外殼的語音 API 支援。Electron 雖然基於 Chromium，但它不是 Chrome 本身，所以 `window.SpeechRecognition` 會直接失敗。

這就是為什麼我們需要獨立的解決方案，例如 OpenAI Whisper API 或 whisper.cpp。

## 1.5 教程路線圖

我們將按以下步驟完成整個流程：

1. **創建 Electron 項目**：使用 Electron Forge 腳手架創建項目，理解程序間通訊
2. **實現錄音功能**：在渲染程序中捕獲麥克風輸入並處理音頻數據
3. **雲端識別（方案 A）**：使用 OpenAI Whisper API 進行語音轉文字
4. **本地識別（方案 B）**：使用 whisper.cpp 在本地離線識別
5. **打包和分發**：將應用打包成可安裝的桌面程式

# 第二章：創建 Electron 項目

## 2.1 使用 AI 初始化項目

打開你的 AI 編碼助手，輸入以下提示：

```
Please help me create a new Electron project with Electron Forge using the Vite template.
The project name is voice-to-text.
Please run: npx create-electron-app voice-to-text --template=vite
After creation, enter the project directory and install dependencies.
```

Electron Forge 是 Electron 官方推薦的腳手架工具。它幫助處理項目初始化、打包、分發等繁瑣的設置工作。

創建完成後，項目結構大致如下：

```text
voice-to-text/
├── src/
│   ├── main.js            # 主程序入口
│   ├── preload.js         # 預載腳本（橋樑）
│   ├── renderer.js        # 渲染程序入口
│   └── index.html         # 應用 HTML 頁面
├── forge.config.js        # Electron Forge 配置
├── vite.main.config.mjs   # 主程序 Vite 配置
├── vite.preload.config.mjs # 預載腳本 Vite 配置
├── vite.renderer.config.mjs # 渲染程序 Vite 配置
└── package.json
```

## 2.2 啟動和預覽

讓 AI 啟動開發伺服器：

```
Please help me start the Electron development server by running npm start
```

幾秒鐘後，會彈出一個桌面視窗。這就是你的 Electron 應用。雖然現在只顯示一個默認的歡迎頁面，但它已經是一個真正的桌面程式了。

<!-- ![placeholder: 首次啟動 Electron 應用的截圖，顯示默認歡迎頁面](/zh-cn/stage-3/cross-platform/electron-voice-to-text/images/image4.png) -->

## 2.3 理解 IPC（程序間通訊）

在實現語音功能之前，我們需要理解 Electron 最重要的概念：**IPC（Inter-Process Communication，程序間通訊）**。

因為渲染程序（UI）和主程序（系統能力）是隔離的，它們必須通過 IPC「打電話」來協作：

```text
渲染程序 (UI)                 主程序 (系統)
    │                                │
    │── 「我要開始錄音」 ──────────→   │
    │                                │── 調用麥克風
    │                                │── 處理音頻
    │   ←──── 「這是結果」 ───────────│
    │                                │
    │── 在 UI 中顯示文字             │
```

在代碼中，這種通訊通過 `preload.js` 橋接：

```javascript
// preload.js - 安全地將 API 暴露給渲染程序
const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  // 渲染程序 -> 主程序
  sendAudio: (audioData) => ipcRenderer.invoke('transcribe-audio', audioData),
  // 主程序 -> 渲染程序
  onResult: (callback) => ipcRenderer.on('transcription-result', callback)
})
```

```javascript
// main.js - 主程序監聽訊息
const { ipcMain } = require('electron')

ipcMain.handle('transcribe-audio', async (event, audioData) => {
  // 在這裡調用 Whisper API 或 whisper.cpp
  const text = await transcribe(audioData)
  return text
})
```

<!-- ![placeholder: IPC 流程示意圖，顯示從渲染程序 -> 預載腳本 -> 主程序的訊息傳遞](/zh-cn/stage-3/cross-platform/electron-voice-to-text/images/image5.webp) -->

# 第三章：實現錄音功能

## 3.1 在渲染程序中捕獲麥克風輸入

瀏覽器（也就是 Electron 的渲染程序）提供了 `navigator.mediaDevices.getUserMedia` 來訪問麥克風。讓 AI 幫忙實現錄音功能：

```
Please help me modify src/index.html and src/renderer.js to implement:

UI:
1. A large circular "Start Recording" button, which turns into a red "Stop Recording" button when clicked
2. Show a simple pulse animation while recording
3. A text display area below for recognition results
4. Two buttons at the bottom: "Copy Text" and "Clear"
5. A settings icon at top-right to switch recognition mode (cloud/local)

Recording logic (in renderer.js):
1. On button click, request microphone access via navigator.mediaDevices.getUserMedia
2. Use MediaRecorder to record audio in webm format
3. After stopping, convert audio Blob to ArrayBuffer
4. Send it to main process via window.electronAPI.sendAudio
5. Wait for recognition result from main process and display it
```

核心錄音代碼：

```javascript
// renderer.js
let mediaRecorder = null
let audioChunks = []

async function startRecording() {
  const stream = await navigator.mediaDevices.getUserMedia({
    audio: {
      channelCount: 1,
      sampleRate: 16000,
      echoCancellation: true,
      noiseSuppression: true
    }
  })

  mediaRecorder = new MediaRecorder(stream, {
    mimeType: 'audio/webm;codecs=opus'
  })

  audioChunks = []
  mediaRecorder.ondataavailable = (e) => audioChunks.push(e.data)

  mediaRecorder.onstop = async () => {
    const audioBlob = new Blob(audioChunks, { type: 'audio/webm' })
    const arrayBuffer = await audioBlob.arrayBuffer()

    // 發送給主程序進行轉錄
    const result = await window.electronAPI.sendAudio(arrayBuffer)
    document.getElementById('result').textContent = result
  }

  mediaRecorder.start()
}
```

<!-- ![placeholder: 錄音 UI 截圖，顯示紅色錄音狀態按鈕和脈衝動畫，下方為文字結果區域](/zh-cn/stage-3/cross-platform/electron-voice-to-text/images/image6.webp) -->

## 3.2 處理麥克風權限

Electron 默認會阻止權限請求。我們需要在主程序中明確允許麥克風訪問：

```
Please help me add microphone permission handling in main.js:
1. Use session.defaultSession.setPermissionRequestHandler to handle permission requests
2. Auto-allow when request type is 'media'
3. For macOS, ensure microphone usage description is declared in package.json or entitlements
```

```javascript
// 添加到 main.js
const { session } = require('electron')

session.defaultSession.setPermissionRequestHandler(
  (webContents, permission, callback) => {
    if (permission === 'media') {
      callback(true)
    } else {
      callback(false)
    }
  }
)
```

> **macOS 用戶注意**：macOS 會顯示系統級的麥克風權限對話框。這是正常的。點擊「允許」即可。

# 第四章：方案 A - 雲端識別（OpenAI Whisper API）

這是最簡單的方案。你只需要一個 API Key 和幾行代碼。

## 4.1 獲取 OpenAI API Key

1. 訪問 [OpenAI Platform](https://platform.openai.com/)，註冊並登入
2. 進入 API Keys 頁面，點擊 **「Create new secret key」**
3. 複製生成的密鑰（以 `sk-` 開頭）並妥善保管

> **成本參考**：Whisper API 的費用為 **$0.006/分鐘**。也就是說，識別 1 小時的音頻只需 $0.36，非常經濟實惠。

## 4.2 在主程序中調用 Whisper API

讓 AI 在主程序中實現語音識別：

```
Please help me implement OpenAI Whisper API in main.js:
1. Install node-fetch (if needed) or use built-in fetch in Node.js
2. Create transcribeWithWhisper function that accepts audio ArrayBuffer
3. Convert ArrayBuffer to Blob/File and build FormData
4. Call https://api.openai.com/v1/audio/transcriptions
5. Use model whisper-1 and set language to zh (Chinese)
6. Return the recognized text
7. Read API key from environment variables or config file
```

核心代碼：

```javascript
// main.js
async function transcribeWithWhisper(audioBuffer, apiKey) {
  const blob = new Blob([audioBuffer], { type: 'audio/webm' })
  const formData = new FormData()
  formData.append('file', blob, 'audio.webm')
  formData.append('model', 'whisper-1')
  formData.append('language', 'zh')

  const response = await fetch(
    'https://api.openai.com/v1/audio/transcriptions',
    {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}` },
      body: formData
    }
  )

  const data = await response.json()
  return data.text
}
```

<!-- ![placeholder: 運行中的應用截圖，顯示 Whisper API 返回的中文語音識別結果](/zh-cn/stage-3/cross-platform/electron-voice-to-text/images/image7.webp) -->

## 4.3 添加設置 UI

讓 AI 在渲染程序中添加一個簡單的設置面板，用於輸入 API Key 和切換識別模式：

```
Please help me add a settings panel in index.html:
1. Add a gear icon in the top-right corner; click to expand settings panel
2. The panel includes:
   - Recognition mode switch (Cloud API / Local model)
   - API Key input (only visible in cloud mode)
   - Language dropdown (Chinese / English / Auto detect)
3. Save settings to localStorage
4. Close panel when clicking outside
```

<!-- ![placeholder: 展開的設置面板截圖，顯示模式切換和 API Key 輸入](/zh-cn/stage-3/cross-platform/electron-voice-to-text/images/image8.png) -->

# 第五章：方案 B - 本地識別（whisper.cpp）

如果你不想依賴雲端 API，或者需要離線使用，whisper.cpp 是最佳選擇。它是 OpenAI Whisper 模型的 C++ 移植版本，完全在本地運行，無需網路。

## 5.1 安裝 whisper.cpp Node.js 綁定

讓 AI 幫忙安裝和配置：

```
Please help me install nodejs-whisper in the project:
npm install nodejs-whisper

After installation, please help me download the whisper tiny model (small size, fast for testing).
nodejs-whisper will handle model download automatically.
```

> **模型選擇指南**：
> * `tiny`（75MB）：最快，適合測試和輕量使用，準確度一般
> * `base`（142MB）：速度和準確度的平衡
> * `small`（466MB）：中文識別品質明顯更好
> * `large-v3-turbo`（1.5GB）：推薦；比 large 快 5-8 倍，準確度僅低 1-2%
> * `large-v3`（3GB）：最高準確度，但速度較慢，需要更好的硬體

## 5.2 在主程序中整合 whisper.cpp

讓 AI 實現本地識別：

```
Please help me add whisper.cpp local recognition in main.js:
1. Import nodejs-whisper
2. Create transcribeWithLocal function
3. Accept audio ArrayBuffer and save it as a temporary WAV file first (16kHz mono)
4. Call nodejs-whisper for recognition
5. Return recognized text
6. Delete temporary file after recognition
```

核心代碼：

```javascript
// main.js
const { nodewhisper } = require('nodejs-whisper')
const path = require('path')
const fs = require('fs')
const os = require('os')

async function transcribeWithLocal(audioBuffer) {
  // 保存為臨時文件
  const tempPath = path.join(os.tmpdir(), `recording-${Date.now()}.wav`)
  fs.writeFileSync(tempPath, Buffer.from(audioBuffer))

  try {
    const result = await nodewhisper(tempPath, {
      modelName: 'base',
      autoDownloadModelName: 'base',
      whisperOptions: {
        language: 'zh',
        word_timestamps: true
      }
    })
    return result.map(r => r.speech).join('')
  } finally {
    // 清理臨時文件
    fs.unlinkSync(tempPath)
  }
}
```

<!-- ![placeholder: 本地模型離線識別中文語音輸入的截圖](/zh-cn/stage-3/cross-platform/electron-voice-to-text/images/image9.png) -->

## 5.3 Apple Silicon 用戶的好消息

如果你使用的是 M1/M2/M3/M4 Mac，whisper.cpp 可以自動使用 **Metal GPU 加速**和 **Apple Neural Engine**。識別速度可以**快於即時**，也就是說 1 分鐘的音頻可能只需要幾秒鐘就能處理完成。

對於 NVIDIA GPU 用戶，whisper.cpp 也支援 **CUDA 加速**，同樣提供強大的性能。

# 第六章：打包和分發

開發完成後，我們需要將應用打包為可分發的安裝程式。

## 6.1 使用 Electron Forge 打包

我們的項目已經包含了 Electron Forge，所以打包很簡單：

```
Please help me run the Electron Forge packaging command:
npx electron-forge make
```

這個命令會自動為你當前的作業系統生成安裝程式：

* **macOS**：`.dmg` 安裝映像和 `.zip` 壓縮包
* **Windows**：`.exe` 安裝程式（Squirrel 格式）
* **Linux**：`.deb`（Debian/Ubuntu）和 `.rpm`（Fedora）套件

構建輸出在 `out/make/` 目錄中。

<!-- ![placeholder: out/make 目錄中的文件截圖，顯示生成的 .dmg 或 .exe 安裝程式](/zh-cn/stage-3/cross-platform/electron-voice-to-text/images/image10.png) -->

## 6.2 應用大小優化

Electron 應用的一個「痛點」是包體積較大（因為打包了 Chromium）。優化建議：

* 確保只有 `dependencies` 中的套件被打包，將開發依賴保持在 `devDependencies` 中
* 使用 Vite tree-shaking 來減少 JavaScript 體積
* 如果使用本地模型，考慮在首次啟動時下載模型，而不是打包進安裝程式

| 配置 | 預估大小 |
|------|---------|
| 純 Electron 應用（無模型） | ~150-200 MB |
| + whisper tiny 模型 | ~250 MB |
| + whisper large-v3-turbo 模型 | ~1.7 GB |

## 6.3 跨平台注意事項

**macOS：**
* 發佈到 App Store 或分發給他人需要**代碼簽名**（Apple Developer ID，$99/年）
* 還需要 Apple 的**公證（Notarization）**流程
* 麥克風權限必須在 `Info.plist` 中聲明 `NSMicrophoneUsageDescription`
* 建議構建 Universal Binary 以同時支援 Intel 和 Apple Silicon

**Windows：**
* 建議進行代碼簽名，否則 Windows SmartScreen 會顯示安全警告
* 用戶仍然可以為未簽名的應用選擇「仍然運行」

**Linux：**
* 不需要代碼簽名
* 建議同時提供 `.deb` 和 `.AppImage` 格式

> **提示**：對於個人項目或小範圍分發，可以暫時跳過代碼簽名，直接將打包好的文件分享給朋友。

# 第七章：總結

恭喜！你已經從零構建了一個跨平台的語音轉文字桌面應用。讓我們回顧一下做了什麼：

1. 使用 Electron Forge 創建了跨平台桌面應用的腳手架
2. 理解了主程序、渲染程序和 IPC 通訊
3. 實現了麥克風錄音和音頻捕獲
4. 整合了兩種語音識別方案：雲端 Whisper API 和本地 whisper.cpp
5. 學會了如何打包和分發 Electron 應用

Electron 的強大之處在於，你可以用 Web 技術棧構建出 VS Code 或 Slack 級別的桌面應用。而配合成熟的 AI 語音識別，像語音轉文字這樣的功能，曾經需要專門團隊才能做到，現在一个人就能完成。

**進階方向：**

* **即時字幕**：使用 AudioWorklet 進行串流音頻處理，搭配串流識別 API 實現即時轉錄
* **會議助手**：錄製完整會議，自動生成帶時間戳的轉錄稿，並用 AI 總結要點
* **多語言翻譯**：轉錄語音並調用翻譯 API 實現即時語言轉換
* **語音筆記本**：結合本地資料庫（如 SQLite）構建可搜索的語音筆記

***讓你的聲音，讓代碼為你記錄一切。***

# 參考資料

* [Electron 官方文件](https://www.electronjs.org/docs/latest/)
* [Electron Forge 官方文件](https://www.electronforge.io/)
* [OpenAI Whisper API 文件](https://platform.openai.com/docs/guides/speech-to-text)
* [whisper.cpp GitHub 倉庫](https://github.com/ggml-org/whisper.cpp)
* [nodejs-whisper npm 套件](https://www.npmjs.com/package/nodejs-whisper)
* [MDN MediaDevices.getUserMedia()](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia)
