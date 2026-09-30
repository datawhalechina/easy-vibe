# Cách Xây dựng Ứng dụng Desktop Đa nền tảng Electron: Ứng dụng Chuyển giọng nói thành Văn bản

# Chương 1: Electron và Phát triển Ứng dụng Desktop là gì

Trong hướng dẫn này, chúng ta sẽ hoàn thành một vòng lặp khép kín: xây dựng ứng dụng desktop chuyển giọng nói thành văn bản từ đầu với Electron, hỗ trợ cả chế độ nhận diện API đám mây và mô hình cục bộ, và cuối cùng đóng gói thành ứng dụng desktop thực có thể cài đặt và chạy trên Windows, macOS và Linux.

Để thực hiện hướng dẫn này, bạn cần ít nhất:

- Một máy tính (Windows hoặc Mac, Mac được khuyến nghị vì mô hình cục bộ chạy rất nhanh trên Apple Silicon)
- Môi trường Node.js (phiên bản 18.0 trở lên)
- Trợ lý lập trình AI của bạn (Cursor / Trae / Claude Code)
- (Tùy chọn) OpenAI API Key (nếu bạn sử dụng chế độ đám mây)
- Một micro (micro tích hợp trên laptop là được)

## 1.1 Electron là gì?

Các ứng dụng bạn sử dụng hàng ngày, như **VS Code, Slack, Discord và Notion**, đều có một điểm chung: tất cả đều là ứng dụng desktop được xây dựng bằng **Electron**.

Electron là một framework mã nguồn mở cho phép bạn sử dụng **HTML + CSS + JavaScript** (cùng ngăn xếp công nghệ dùng cho trang web) để xây dựng ứng dụng desktop chạy trên **Windows, macOS và Linux**. Nguyên lý đơn giản: đóng gói Chromium và Node.js cùng nhau, và trang web của bạn trở thành một ứng dụng desktop độc lập.

**Hiểu trong một câu**: Electron = "trình duyệt Chrome vô hình" + khả năng hệ thống Node.js.

<!-- ![placeholder: Sơ đồ hiển thị kiến trúc Electron: Chromium (cho kết xuất UI) + Node.js (cho truy cập hệ thống) = ứng dụng desktop](/zh-cn/stage-3/cross-platform/electron-voice-to-text/images/image1.webp) -->

## 1.2 Kiến trúc Cốt lõi của Electron

Một ứng dụng Electron bao gồm hai loại tiến trình. Hiểu chúng là chìa khóa để phát triển:

**Main Process (Tiến trình Chính)**

* "Tổng quản lý" của ứng dụng
* Chịu trách nhiệm tạo cửa sổ, quản lý vòng đời ứng dụng và truy cập khả năng gốc như hệ thống tệp
* Chạy trong môi trường Node.js và có thể sử dụng tất cả các module Node.js
* Mỗi ứng dụng chỉ có một main process

**Renderer Process (Tiến trình Trình kết xuất)**

* "Mặt tiền" của ứng dụng
* Về bản chất là một trang web Chromium chịu trách nhiệm kết xuất UI
* Mỗi cửa sổ tương ứng với một renderer process
* Vì lý do bảo mật, renderer process không thể trực tiếp truy cập API Node.js

**Preload Script**

* "Cầu nối" giữa main process và renderer process
* Sử dụng `contextBridge` để an toàn expose các API đã chọn cho renderer process

Chúng giao tiếp thông qua **IPC (Inter-Process Communication)**, giống như gọi điện thoại: renderer nói "tôi muốn bắt đầu ghi âm," và main process nhận yêu cầu đó và gọi micro hệ thống.

<!-- ![placeholder: Sơ đồ kiến trúc tiến trình Electron hiển thị Main Process, Renderer Process và Preload Script, cộng với giao tiếp IPC giữa chúng](/zh-cn/stage-3/cross-platform/electron-voice-to-text/images/image2.webp) -->

## 1.3 Chúng ta đang Xây dựng Gì?

Trong hướng dẫn này, chúng ta sẽ xây dựng một ứng dụng desktop **Chuyển giọng nói thành Văn bản**. Chức năng đơn giản:

1. Nhấp nút "Start Recording," ứng dụng bắt đầu nghe micro
2. Sau khi nói xong, nhấp "Stop," ứng dụng gửi âm thanh đến AI để nhận diện
3. Văn bản đã nhận diện được hiển thị trong UI và có thể sao chép bằng một cú nhấp chuột

**Hai chế độ nhận diện có sẵn:**

| Tiêu chí So sánh | Chế độ API Đám mây | Chế độ Mô hình Cục bộ |
|---------|-------------|------------|
| Giải pháp Đại diện | OpenAI Whisper API | whisper.cpp |
| Cần Internet | Có | Không |
| Tốc độ Nhận diện | Phụ thuộc mạng | Phụ thuộc phần cứng (rất nhanh trên Apple Silicon) |
| Chất lượng Nhận diện Tiếng Trung | Xuất sắc | Xuất sắc (mô hình large-v3) |
| Chi phí | $0.006/phút | Miễn phí |
| Kích thước Mô hình | Không cần tải | mô hình tiny 75MB, mô hình large 3GB |
| Phù hợp nhất | Bắt đầu nhanh, sử dụng nhẹ | Qu trọng quyền riêng tư, sử dụng ngoại tuyến, sử dụng tần suất cao dài hạn |

<!-- ![placeholder: Ảnh xem trước ứng dụng hiển thị UI chuyển giọng nói thành văn bản: nút ghi âm và hoạt ảnh sóng phía trên, văn bản đã nhận diện phía dưới và công tắc chế độ ở góc trên bên phải](/zh-cn/stage-3/cross-platform/electron-voice-to-text/images/image3.webp) -->

## 1.4 Lưu ý Quan trọng: Web Speech API Không Khả dụng trong Electron

Nếu bạn đã tìm kiếm "Electron speech recognition," bạn có thể thấy các khuyến nghị sử dụng `Web Speech API` tích hợp sẵn của trình duyệt. **Xin lưu ý: điều này không hoạt động trong Electron.**

Google đã ngừng hỗ trợ API giọng nói cho các shell trình duyệt không phải Chrome/Edge. Electron dựa trên Chromium nhưng không phải Chrome, vì vậy `window.SpeechRecognition` sẽ thất bại trực tiếp.

Đó là lý do chúng ta cần các giải pháp độc lập như OpenAI Whisper API hoặc whisper.cpp.

## 1.5 Lộ trình Hướng dẫn

Chúng ta sẽ hoàn thành quy trình đầy đủ theo các bước sau:

1. **Tạo dự án Electron**: Sử dụng Electron Forge để tạo khung dự án và hiểu giao tiếp liên tiến trình
2. **Triển khai ghi âm**: Chụp đầu vào micro trong renderer process và xử lý dữ liệu âm thanh
3. **Nhận diện đám mây (Tùy chọn A)**: Sử dụng OpenAI Whisper API để chuyển giọng nói thành văn bản
4. **Nhận diện cục bộ (Tùy chọn B)**: Sử dụng whisper.cpp cục bộ không cần internet
5. **Đóng gói và phân phối**: Đóng gói ứng dụng thành chương trình desktop có thể cài đặt

# Chương 2: Tạo Dự án Electron

## 2.1 Khởi tạo Dự án với AI

Mở trợ lý lập trình AI của bạn và nhập prompt sau:

```
Please help me create a new Electron project with Electron Forge using the Vite template.
The project name is voice-to-text.
Please run: npx create-electron-app voice-to-text --template=vite
After creation, enter the project directory and install dependencies.
```

Electron Forge là công cụ tạo khung dự án được Electron chính thức khuyến nghị. Nó giúp với việc khởi tạo dự án, đóng gói, phân phối và các thiết lập phức tạp khác.

Sau khi tạo, cấu trúc dự án khoảng:

```text
voice-to-text/
├── src/
│   ├── main.js            # Entry main process
│   ├── preload.js         # Preload script (cầu nối)
│   ├── renderer.js        # Entry renderer process
│   └── index.html         # Trang HTML ứng dụng
├── forge.config.js        # Cấu hình Electron Forge
├── vite.main.config.mjs   # Cấu hình Vite main process
├── vite.preload.config.mjs # Cấu hình Vite preload script
├── vite.renderer.config.mjs # Cấu hình Vite renderer process
└── package.json
```

## 2.2 Khởi động và Xem trước

Yêu cầu AI khởi động máy chủ phát triển:

```
Please help me start the Electron development server by running npm start
```

Sau vài giây, một cửa sổ desktop xuất hiện. Đây là ứng dụng Electron của bạn. Mặc dù nó chỉ hiển thị trang chào mừng mặc định, nó đã là một chương trình desktop thực sự.

<!-- ![placeholder: Ảnh chụp màn hình khởi động ứng dụng Electron đầu tiên với trang chào mừng mặc định](/zh-cn/stage-3/cross-platform/electron-voice-to-text/images/image4.png) -->

## 2.3 Hiểu IPC (Giao tiếp Liên tiến trình)

Trước khi triển khai tính năng giọng nói, chúng ta cần hiểu khái niệm quan trọng nhất của Electron: **IPC (Inter-Process Communication)**.

Vì renderer process (UI) và main process (khả năng hệ thống) bị cách ly, chúng phải sử dụng "cuộc gọi" IPC để hợp tác:

```text
Renderer process (UI)                 Main process (hệ thống)
    │                                │
    │── "Tôi muốn bắt đầu ghi âm" ──────────→   │
    │                                │── Gọi micro
    │                                │── Xử lý âm thanh
    │   ←──── "Đây là kết quả" ─────────────│
    │                                │
    │── Hiển thị văn bản trong UI           │
```

Trong mã, giao tiếp này được cầu nối qua `preload.js`:

```javascript
// preload.js - an toàn expose API cho renderer process
const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  // Renderer -> Main
  sendAudio: (audioData) => ipcRenderer.invoke('transcribe-audio', audioData),
  // Main -> Renderer
  onResult: (callback) => ipcRenderer.on('transcription-result', callback)
})
```

```javascript
// main.js - main process lắng nghe tin nhắn
const { ipcMain } = require('electron')

ipcMain.handle('transcribe-audio', async (event, audioData) => {
  // Gọi Whisper API hoặc whisper.cpp tại đây
  const text = await transcribe(audioData)
  return text
})
```

<!-- ![placeholder: Sơ đồ luồng IPC hiển thị truyền tin nhắn từ Renderer -> Preload -> Main](/zh-cn/stage-3/cross-platform/electron-voice-to-text/images/image5.webp) -->

# Chương 3: Triển khai Ghi âm

## 3.1 Chụp Đầu vào Micro trong Renderer Process

Trình duyệt (là renderer process của Electron) cung cấp `navigator.mediaDevices.getUserMedia` để truy cập micro. Yêu cầu AI giúp triển khai ghi âm:

```
Please help me modify src/index.html and src/renderer.js to implement:

UI:
1. Nút tròn lớn "Start Recording," chuyển thành nút đỏ "Stop Recording" khi nhấp
2. Hiển thị hoạt ảnh nhịp đơn giản khi đang ghi
3. Vùng hiển thị văn bản phía dưới cho kết quả nhận diện
4. Hai nút ở phía dưới: "Copy Text" và "Clear"
5. Biểu tượng cài đặt ở góc trên bên phải để chuyển chế độ nhận diện (đám mây/cục bộ)

Logic ghi âm (trong renderer.js):
1. Khi nhấp nút, yêu cầu truy cập micro qua navigator.mediaDevices.getUserMedia
2. Sử dụng MediaRecorder để ghi âm định dạng webm
3. Sau khi dừng, chuyển Blob âm thanh thành ArrayBuffer
4. Gửi đến main process qua window.electronAPI.sendAudio
5. Đợi kết quả nhận diện từ main process và hiển thị
```

Mã ghi âm cốt lõi:

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

    // Gửi đến main process để nhận diện
    const result = await window.electronAPI.sendAudio(arrayBuffer)
    document.getElementById('result').textContent = result
  }

  mediaRecorder.start()
}
```

<!-- ![placeholder: Ảnh chụp màn hình UI ghi âm với nút trạng thái ghi màu đỏ và hoạt ảnh nhịp, cộng vùng kết quả văn bản phía dưới](/zh-cn/stage-3/cross-platform/electron-voice-to-text/images/image6.webp) -->

## 3.2 Xử lý Quyền Micro

Electron chặn yêu cầu quyền theo mặc định. Chúng ta cần cho phép truy cập micro rõ ràng trong main process:

```
Please help me add microphone permission handling in main.js:
1. Use session.defaultSession.setPermissionRequestHandler to handle permission requests
2. Auto-allow when request type is 'media'
3. For macOS, ensure microphone usage description is declared in package.json or entitlements
```

```javascript
// Thêm vào main.js
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

> **Lưu ý cho người dùng macOS**: macOS sẽ hiển thị hộp thoại quyền micro cấp hệ thống. Điều này bình thường. Nhấp "Allow."

# Chương 4: Tùy chọn A - Nhận diện Đám mây (OpenAI Whisper API)

Đây là tùy chọn đơn giản nhất. Bạn chỉ cần một API key và vài dòng mã.

## 4.1 Lấy OpenAI API Key

1. Truy cập [OpenAI Platform](https://platform.openai.com/), đăng ký và đăng nhập
2. Vào trang API Keys và nhấp **"Create new secret key"**
3. Sao chép key đã tạo (bắt đầu bằng `sk-`) và lưu trữ an toàn

> **Tham khảo chi phí**: Whisper API có giá **$0.006/phút**. Nghĩa là nhận diện 1 giờ âm thanh chỉ tốn $0.36, rất phải chăng.

## 4.2 Gọi Whisper API trong Main Process

Yêu cầu AI triển khai nhận diện giọng nói trong main process:

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

Mã cốt lõi:

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

<!-- ![placeholder: Ảnh chụp màn hình ứng dụng đang chạy hiển thị giọng nói tiếng Trung đã nhận diện được trả về bởi Whisper API](/zh-cn/stage-3/cross-platform/electron-voice-to-text/images/image7.webp) -->

## 4.3 Thêm UI Cài đặt

Yêu cầu AI thêm bảng cài đặt đơn giản trong renderer process để nhập API key và chuyển chế độ nhận diện:

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

<!-- ![placeholder: Ảnh chụp màn hình bảng cài đặt mở rộng hiển thị công tắc chế độ và nhập API key](/zh-cn/stage-3/cross-platform/electron-voice-to-text/images/image8.png) -->

# Chương 5: Tùy chọn B - Nhận diện Cục bộ (whisper.cpp)

Nếu bạn không muốn phụ thuộc vào API đám mây hoặc cần sử dụng ngoại tuyến, whisper.cpp là lựa chọn tốt nhất. Đây là bản chuyển đổi C++ của mô hình OpenAI Whisper và chạy hoàn toàn cục bộ không cần internet.

## 5.1 Cài đặt whisper.cpp Node.js Bindings

Yêu cầu AI cài đặt và cấu hình:

```
Please help me install nodejs-whisper in the project:
npm install nodejs-whisper

After installation, please help me download the whisper tiny model (small size, fast for testing).
nodejs-whisper will handle model download automatically.
```

> **Hướng dẫn chọn mô hình**:
> * `tiny` (75MB): nhanh nhất, tốt cho thử nghiệm và sử dụng nhẹ, độ chính xác trung bình
> * `base` (142MB): cân bằng giữa tốc độ và độ chính xác
> * `small` (466MB): chất lượng nhận diện tiếng Trung rõ ràng tốt hơn
> * `large-v3-turbo` (1.5GB): được khuyến nghị; nhanh hơn 5-8x so với large, với độ chính xác chỉ thấp hơn 1-2%
> * `large-v3` (3GB): độ chính xác cao nhất nhưng chậm hơn và cần phần cứng tốt hơn

## 5.2 Tích hợp whisper.cpp trong Main Process

Yêu cầu AI triển khai nhận diện cục bộ:

```
Please help me add whisper.cpp local recognition in main.js:
1. Import nodejs-whisper
2. Create transcribeWithLocal function
3. Accept audio ArrayBuffer and save it as a temporary WAV file first (16kHz mono)
4. Call nodejs-whisper for recognition
5. Return recognized text
6. Delete temporary file after recognition
```

Mã cốt lõi:

```javascript
// main.js
const { nodewhisper } = require('nodejs-whisper')
const path = require('path')
const fs = require('fs')
const os = require('os')

async function transcribeWithLocal(audioBuffer) {
  // Lưu thành tệp tạm thời
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
    // Dọn dẹp tệp tạm thời
    fs.unlinkSync(tempPath)
  }
}
```

<!-- ![placeholder: Ảnh chụp màn hình nhận diện mô hình cục bộ hoạt động ngoại tuyến với đầu vào giọng nói tiếng Trung](/zh-cn/stage-3/cross-platform/electron-voice-to-text/images/image9.png) -->

## 5.3 Tin tốt cho Người dùng Apple Silicon

Nếu bạn đang sử dụng Mac M1/M2/M3/M4, whisper.cpp có thể tự động sử dụng **tăng tốc GPU Metal** và **Apple Neural Engine**. Nhận diện có thể chạy **nhanh hơn thời gian thực**, nghĩa là 1 phút âm thanh có thể chỉ mất vài giây để xử lý.

Đối với người dùng GPU NVIDIA, whisper.cpp cũng hỗ trợ **tăng tốc CUDA**, cung cấp hiệu suất mạnh mẽ.

# Chương 6: Đóng gói và Phân phối

Sau khi phát triển hoàn tất, chúng ta cần đóng gói ứng dụng thành các trình cài đặt có thể phân phối.

## 6.1 Đóng gói với Electron Forge

Electron Forge đã được bao gồm trong dự án của chúng ta, vì vậy đóng gói đơn giản:

```
Please help me run the Electron Forge packaging command:
npx electron-forge make
```

Lệnh này tự động tạo trình cài đặt cho hệ điều hành hiện tại của bạn:

* **macOS**: ảnh đĩa `.dmg` và lưu trữ `.zip`
* **Windows**: trình cài đặt `.exe` (định dạng Squirrel)
* **Linux**: gaki `.deb` (Debian/Ubuntu) và `.rpm` (Fedora)

Đầu ra xây dựng nằm trong thư mục `out/make/`.

<!-- ![placeholder: Ảnh chụp màn hình tệp trong thư mục out/make hiển thị trình cài đặt .dmg hoặc .exe đã tạo](/zh-cn/stage-3/cross-platform/electron-voice-to-text/images/image10.png) -->

## 6.2 Tối ưu Kích thước Ứng dụng

Một "điểm đau" của ứng dụng Electron là kích thước gói lớn (vì Chromium được đóng gói cùng). Gợi ý tối ưu:

* Đảm bảo chỉ các gói trong `dependencies` được đóng gói và giữ dev dependencies trong `devDependencies`
* Sử dụng Vite tree-shaking để giảm kích thước JavaScript
* Nếu sử dụng mô hình cục bộ, cân nhắc tải mô hình ở lần khởi chạy đầu tiên thay vì đóng gói vào trình cài đặt

| Cấu hình | Kích thước Ước tính |
|------|---------|
| Ứng dụng Electron thuần (không mô hình) | ~150-200 MB |
| + mô hình whisper tiny | ~250 MB |
| + mô hình whisper large-v3-turbo | ~1.7 GB |

## 6.3 Lưu ý Đa nền tảng

**macOS:**
* Xuất bản lên App Store hoặc phân phối cho người khác yêu cầu **ký mã** (Apple Developer ID, $99/năm)
* Cũng yêu cầu quy trình **Notarization** của Apple
* Quyền micro phải khai báo `NSMicrophoneUsageDescription` trong `Info.plist`
* Khuyến nghị xây dựng Universal Binary để hỗ trợ cả Intel và Apple Silicon

**Windows:**
* Ký mã được khuyến nghị, nếu không Windows SmartScreen sẽ hiển thị cảnh báo bảo mật
* Người dùng vẫn có thể chọn "Run anyway" cho ứng dụng chưa ký

**Linux:**
* Không yêu cầu ký mã
* Khuyến nghị cung cấp cả định dạng `.deb` và `.AppImage`

> **Mẹo**: Đối với dự án cá nhân hoặc phân phối quy mô nhỏ, bạn có thể tạm thời bỏ qua ký mã và chia sẻ trực tiếp tệp đã đóng gói với bạn bè.

# Chương 7: Ghi chú Cuối cùng

Chúc mừng! Bạn đã xây dựng một ứng dụng desktop đa nền tảng chuyển giọng nói thành văn bản từ đầu. Hãy cùng tóm tắt những gì chúng ta đã làm:

1. Sử dụng Electron Forge để tạo khung ứng dụng desktop đa nền tảng
2. Hiểu main process, renderer process và giao tiếp IPC
3. Triển khai ghi âm micro và chụp âm thanh
4. Tích hợp hai tùy chọn nhận diện giọng nói: Whisper API đám mây và whisper.cpp cục bộ
5. Học cách đóng gói và phân phối ứng dụng Electron

Điều làm Electron mạnh mẽ là bạn có thể xây dựng ứng dụng desktop ở mức VS Code hoặc Slack bằng ngăn xếp công nghệ web. Và với nhận diện giọng nói AI trưởng thành, một tính năng như chuyển giọng nói thành văn bản, từng cần một đội chuyên môn, giờ có thể được xây dựng bởi một người.

**Hướng phát triển nâng cao:**

* **Phụ đề thời gian thực**: Sử dụng AudioWorklet cho âm thanh streaming và kết hợp với API nhận diện streaming để chép lại trực tiếp
* **Trợ lý cuộc họp**: Ghi âm toàn bộ cuộc họp, tự động tạo bản chép có dấu thời gian và tóm tắt điểm chính với AI
* **Dịch đa ngôn ngữ**: Chép lại giọng nói và gọi API dịch để chuyển đổi ngôn ngữ thời gian thực
* **Sổ tay giọng nói**: Kết hợp với cơ sở dữ liệu cục bộ (như SQLite) để xây dựng ghi chú giọng nói có thể tìm kiếm

***Hãy để giọng nói của bạn và để mã ghi lại mọi thứ cho bạn.***

# Tài liệu Tham khảo

* [Tài liệu Chính thức Electron](https://www.electronjs.org/docs/latest/)
* [Tài liệu Chính thức Electron Forge](https://www.electronforge.io/)
* [Tài liệu OpenAI Whisper API](https://platform.openai.com/docs/guides/speech-to-text)
* [Kho GitHub whisper.cpp](https://github.com/ggml-org/whisper.cpp)
* [Gói npm nodejs-whisper](https://www.npmjs.com/package/nodejs-whisper)
* [MDN MediaDevices.getUserMedia()](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia)
