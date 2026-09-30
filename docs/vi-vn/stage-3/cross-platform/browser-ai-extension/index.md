# Cách Xây dựng Tiện ích mở rộng Trình duyệt AI Trợ lý: Tóm tắt Bất kỳ Trang web nào bằng Một Cú Nhấp chuột

# Chương 1: Tiện ích mở rộng Trình duyệt và Phát triển Chrome Extension là gì

Trong hướng dẫn này, chúng ta sẽ hoàn thành một vòng lặp khép kín: xây dựng một tiện ích mở rộng trình duyệt Chrome dựa trên AI từ đầu. Nó có thể đọc nội dung của bất kỳ trang web bạn đang duyệt, sau đó sử dụng AI để tạo tóm tắt bằng một cú nhấp chuột. Bạn sẽ tự tay hoàn thành phát triển tiện ích mở rộng, gỡ lỗi và học cách xuất bản nó lên Chrome Web Store.

Để thực hiện hướng dẫn này, bạn cần ít nhất:

- Trình duyệt Chrome (phiên bản 138+ được khuyến nghị nếu bạn muốn sử dụng AI tích hợp sẵn)
- Một trình soạn mã (VS Code / Cursor / Trae)
- (Tùy chọn) OpenAI hoặc Claude API Key

## 1.1 Tiện ích mở rộng Trình duyệt là gì?

Bạn chắc chắn đã sử dụng tiện ích mở rộng trình duyệt trước đây: trình chặn quảng cáo, công cụ dịch, trình quản lý mật khẩu... Chúng giống như "thiết bị bổ sung" cho trình duyệt của bạn, mang lại siêu năng lực khi duyệt web.

Hãy tưởng tượng: bạn mở một bài blog kỹ thuật 5.000 từ, nhấp nút tiện ích mở rộng một lần và vài giây sau một tóm tắt tiếng Trung ngắn gọn xuất hiện trong bảng điều khiển bên. Đó chính xác là những gì chúng ta sẽ xây dựng.

![placeholder: Hình ảnh xem trước hiển thị trang web bài viết dài bên trái và tóm tắt do AI tạo được hiển thị trong bảng điều khiển bên Chrome bên phải](/zh-cn/stage-3/cross-platform/browser-ai-extension/images/image1.webp)

<!-- ![placeholder: Hình ảnh xem trước hiển thị trang web bài viết dài bên trái và tóm tắt do AI tạo được hiển thị trong bảng điều khiển bên Chrome bên phải](/zh-cn/stage-3/cross-platform/browser-ai-extension/images/image1.webp) -->

## 1.2 Kiến trúc Cơ bản của Chrome Extension

Chrome extensions (dựa trên Manifest V3) bao gồm một số thành phần cốt lõi, mỗi thành phần có vai trò riêng:

* **Tệp Manifest (`manifest.json`)**: "thẻ ID" của tiện ích mở rộng, khai báo tên, quyền, tệp entry và hơn thế nữa.
* **Service Worker (background script)**: "bộ não" của tiện ích mở rộng, xử lý sự kiện và gọi API trong nền. Nó không chạy liên tục mà khởi động khi cần.
* **Content Script**: "mắt" của tiện ích mở rộng, được chèn vào trang web và có thể đọc nội dung DOM.
* **Side Panel**: "gương mặt" của tiện ích mở rộng, hiển thị UI ở bên phải trình duyệt nơi người dùng thấy kết quả tóm tắt AI.
* **Options Page**: cho phép người dùng cấu hình API Key và cài đặt liên quan.

Quy trình làm việc của chúng trông như sau:

```text
Người dùng nhấp biểu tượng tiện ích mở rộng
    -> Bảng điều khiển bên mở
    -> Người dùng nhấp nút "Tóm tắt"
    -> Bảng điều khiển bên thông báo Service Worker
    -> Service Worker yêu cầu Content Script đọc văn bản trang
    -> Content Script trả về nội dung trang
    -> Service Worker gửi nội dung đến AI API
    -> AI trả về tóm tắt
    -> Service Worker gửi tóm tắt trở lại bảng điều khiển bên để hiển thị
```

![placeholder: Sơ đồ kiến trúc hiển thị cách Content Script, Service Worker và Side Panel truyền tin nhắn cho nhau](/zh-cn/stage-3/cross-platform/browser-ai-extension/images/image2.webp)
<!-- ![placeholder: Sơ đồ kiến trúc hiển thị cách Content Script, Service Worker và Side Panel truyền tin nhắn cho nhau](/zh-cn/stage-3/cross-platform/browser-ai-extension/images/image2.webp) -->

## 1.3 Hai Tùy chọn AI: API Đám mây so với AI Tích hợp Trình duyệt

Tiện ích mở rộng của chúng ta có hai cách để truy cập khả năng AI:

**Tùy chọn A: Gọi AI API đám mây (OpenAI / Claude)**

* Ưu điểm: khả năng mô hình mạnh mẽ, hỗ trợ tất cả thiết bị
* Nhược điểm: cần API Key, cần internet, có chi phí sử dụng
* Phù hợp nhất: tóm tắt chất lượng cao và xử lý nội dung phức tạp hơn

**Tùy chọn B: Sử dụng AI tích hợp Chrome (Summarizer API)**

Bắt đầu từ Chrome 138, Google tích hợp khả năng AI dựa trên Gemini Nano trực tiếp vào trình duyệt. Một trong số đó là **Summarizer API** - nó chạy hoàn toàn cục bộ, không cần API Key, không cần internet và hoàn toàn miễn phí.

* Ưu điểm: miễn phí, thân thiện với quyền riêng tư, không cần API Key
* Nhược điểm: yêu cầu Chrome 138+, phần cứng tốt hơn (4GB+ VRAM hoặc 16GB+ RAM), khả năng mô hình yếu hơn AI đám mây
* Phù hợp nhất: người dùng quan tâm đến quyền riêng tư, không muốn trả phí và có phần cứng đủ

**Hướng dẫn này sẽ triển khai cả hai tùy chọn** và bạn có thể chọn dựa trên tình hình của mình.

## 1.4 Lộ trình Hướng dẫn

Chúng ta sẽ xây dựng một Chrome extension tên **"AI Page Summarizer"** từ đầu, theo các bước sau:

1. **Xây dựng khung tiện ích mở rộng**: tạo cấu trúc dự án Manifest V3 và tải vào Chrome
2. **Triển khai tính năng cốt lõi**: Content Script đọc trang + Service Worker gọi AI API + bảng điều khiển bên hiển thị kết quả
3. **Tích hợp AI tích hợp Chrome**: sử dụng Summarizer API để cung cấp tóm tắt cục bộ miễn phí
4. **Kiểm thử và gỡ lỗi**: học kỹ thuật gỡ lỗi Chrome extension
5. **Xuất bản lên Chrome Web Store**: đóng gói và gửi kiểm duyệt

# Chương 2: Xây dựng Khung Tiện ích Mở rộng

## 2.1 Tạo Cấu trúc Dự án

Mở trợ lý lập trình AI của bạn (Cursor / Trae / Claude Code), tạo một thư mục trống tên `ai-page-summarizer`, sau đó nhập vào hộp thoại:

```text
Please help me create a Chrome browser extension project using Manifest V3.
The project name is ai-page-summarizer, and its function is to summarize webpage content with AI.
Please create the following file structure:

ai-page-summarizer/
├── manifest.json          # Tệp manifest MV3
├── background.js          # Service Worker background script
├── content.js             # Content script (đọc văn bản trang web)
├── sidepanel.html         # HTML bảng điều khiển bên
├── sidepanel.js           # Logic bảng điều khiển bên
├── sidepanel.css          # Kiểu dáng bảng điều khiển bên
├── options.html           # Trang cài đặt
├── options.js             # Logic trang cài đặt
└── icons/                 # Thư mục biểu tượng

Requirements for manifest.json:
1. manifest_version: 3
2. Permissions: storage, activeTab, scripting, sidePanel
3. Use service_worker: "background.js" for background
4. Configure side_panel with default path sidepanel.html
5. Configure default icon and title for action
```

AI sẽ tạo khung dự án đầy đủ cho bạn. Hãy xem mỗi tệp làm gì.

## 2.2 `manifest.json`: "Thẻ ID" của Tiện ích Mở rộng

Đây là tệp quan trọng nhất trong Chrome extension. Nó cho trình duyệt biết tiện ích mở rộng là gì, quyền gì cần và thành phần nào nó chứa:

```json
{
  "manifest_version": 3,
  "name": "AI Page Summarizer",
  "version": "1.0",
  "description": "Sử dụng AI để tóm tắt bất kỳ trang web nào bằng một cú nhấp chuột",
  "permissions": ["storage", "activeTab", "scripting", "sidePanel"],
  "background": {
    "service_worker": "background.js"
  },
  "action": {
    "default_title": "AI Page Summarizer",
    "default_icon": {
      "16": "icons/icon-16.png",
      "48": "icons/icon-48.png",
      "128": "icons/icon-128.png"
    }
  },
  "side_panel": {
    "default_path": "sidepanel.html"
  },
  "options_page": "options.html",
  "icons": {
    "16": "icons/icon-16.png",
    "48": "icons/icon-48.png",
    "128": "icons/icon-128.png"
  }
}
```

**Giải thích quyền:**

* `storage`: cho phép tiện ích mở rộng lưu trữ dữ liệu như API Key của người dùng
* `activeTab`: cho phép tiện ích mở rộng truy cập tab hiện tại người dùng đang xem (chỉ sau tương tác người dùng, nên rất an toàn)
* `scripting`: cho phép tiện ích mở rộng chèn script vào trang để đọc nội dung
* `sidePanel`: cho phép tiện ích mở rộng sử dụng API bảng điều khiển bên Chrome

![placeholder: Ảnh chụp màn hình manifest.json trong trình soạn](/zh-cn/stage-3/cross-platform/browser-ai-extension/images/image2b.png)
<!-- ![placeholder: Ảnh chụp màn hình manifest.json trong trình soạn](/zh-cn/stage-3/cross-platform/browser-ai-extension/images/image2b.png) -->

## 2.3 Chuẩn bị Biểu tượng

Chrome extensions cần biểu tượng ở ba kích thước: 16x16, 48x48 và 128x128. Bạn có thể yêu cầu AI tạo:

```text
Please help me generate three simple Chrome extension icons (16x16, 48x48, 128x128),
with a rounded rectangle, gradient purple background, and a white AI lightning symbol in the center.
Save them in the icons/ directory as icon-16.png, icon-48.png, and icon-128.png.
```

## 2.4 Tải Tiện ích Mở rộng vào Chrome

Trước khi viết mã, hãy tải tiện ích mở rộng "vỏ rỗng" này vào Chrome trước, để mỗi thay đổi sau có thể xem trước ngay lập tức:

1. Mở Chrome và nhập `chrome://extensions/` trong thanh địa chỉ
2. Bật **Developer mode** ở góc trên bên phải
3. Nhấp **Load unpacked**
4. Chọn thư mục `ai-page-summarizer` của bạn

Bạn sẽ thấy tiện ích mở rộng xuất hiện trong danh sách và biểu tượng của nó hiển thị trong thanh công cụ Chrome.

![placeholder: Ảnh chụp màn hình trang tiện ích mở rộng Chrome hiển thị cách bật chế độ nhà phát triển và tải tiện ích mở rộng](/zh-cn/stage-3/cross-platform/browser-ai-extension/images/image3.png)

<!-- ![placeholder: Ảnh chụp màn hình trang tiện ích mở rộng Chrome hiển thị cách bật chế độ nhà phát triển và tải tiện ích mở rộng](/zh-cn/stage-3/cross-platform/browser-ai-extension/images/image3.png) -->

> **Mẹo**: sau mỗi lần thay đổi mã, quay lại `chrome://extensions/` và nhấp **nút làm mới (🔄)** trên thẻ tiện ích mở rộng để cập nhật.

# Chương 3: Triển khai Tính năng Cốt lõi - Đọc Trang + Tóm tắt AI

## 3.1 Content Script: Đọc Văn bản Trang

Content Script là script được chèn vào trang web. Nó có thể trực tiếp truy cập DOM trang. Chúng ta sử dụng nó để trích xuất văn bản trang.

Yêu cầu AI viết `content.js`:

```text
Please help me write content.js with the following functions:
1. Listen for messages from Service Worker
2. When receiving a "getPageContent" message, extract current page text content
3. Extraction logic: get document.body.innerText, and also get page title and URL
4. Return the extracted content via sendResponse
```

AI sẽ tạo mã như sau:

```javascript
// content.js
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getPageContent') {
    const content = document.body.innerText || document.body.textContent
    sendResponse({
      content: content.trim(),
      title: document.title,
      url: window.location.href
    })
  }
  return true // Giữ kênh tin nhắn mở
})
```

## 3.2 Service Worker: Gọi AI API

Service Worker là "bộ não" của tiện ích mở rộng. Nó điều phối giao tiếp giữa các thành phần và gọi API AI bên ngoài.

Yêu cầu AI viết `background.js`:

```text
Please help me write background.js with the following functions:
1. When the user clicks the extension icon, open the side panel
2. Listen for "summarize" messages from the side panel
3. After receiving the message, send "getPageContent" to the content script in the current tab to get page content
4. After receiving the page content, read the user's configured API Key and model selection from chrome.storage.local
5. Call the corresponding AI API according to the configuration (support OpenAI and Claude)
6. Send the AI summary back to the side panel

For OpenAI, call https://api.openai.com/v1/chat/completions and use model gpt-4o-mini
For Claude, call https://api.anthropic.com/v1/messages and use model claude-sonnet-4-20250514
System prompt: Please summarize the following webpage content in Chinese, extract the key points, and keep it within 300 Chinese characters.
```

Mã cốt lõi trông như sau:

```javascript
// background.js

// Mở bảng điều khiển bên khi người dùng nhấp biểu tượng
chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true })

// Lắng nghe tin nhắn từ bảng điều khiển bên
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'summarize') {
    handleSummarize(request.tabId).then(sendResponse)
    return true // Phản hồi bất đồng bộ
  }
})

async function handleSummarize(tabId) {
  // 1. Lấy nội dung trang
  const [response] = await chrome.tabs.sendMessage(tabId, {
    action: 'getPageContent'
  })

  // 2. Đọc cài đặt người dùng
  const { apiKey, provider } = await chrome.storage.local.get([
    'apiKey', 'provider'
  ])

  if (!apiKey) {
    return { error: 'Please configure your API Key in the settings page first' }
  }

  // 3. Gọi AI API
  const summary = provider === 'claude'
    ? await callClaude(response.content, apiKey)
    : await callOpenAI(response.content, apiKey)

  return { summary, title: response.title }
}
```

![](/zh-cn/stage-3/cross-platform/browser-ai-extension/images/image4.png)
<!-- ![placeholder: Ảnh chụp màn hình mã background.js trong trình soạn](/zh-cn/stage-3/cross-platform/browser-ai-extension/images/image4.png) -->

## 3.3 UI Bảng điều khiển Bên: Hiển thị Kết quả Tóm tắt

Bảng điều khiển bên là UI tương tác chính cho người dùng. Yêu cầu AI viết HTML, CSS và JS cho bảng điều khiển bên:

```text
Please help me write these three files for the side panel:

sidepanel.html:
- Hiển thị tên plugin "AI Page Summarizer" ở phía trên
- Nút "Summarize Current Page" màu xanh
- Vùng hoạt ảnh tải (ẩn theo mặc định)
- Vùng hiển thị kết quả hiển thị tiêu đề trang và tóm tắt AI
- Nút "Copy Summary" ở phía dưới

sidepanel.css:
- Thiết kế hiện đại sạch, kiểu chữ giống Notion
- Chiều rộng thích ứng với bảng điều khiển bên
- Nút có hiệu ứng hover
- Hoạt ảnh tải triển khai bằng CSS

sidepanel.js:
- Khi nhấp nút "Tóm tắt," lấy tab ID hiện tại
- Gửi tin nhắn summarize đến background.js
- Hiển thị hoạt ảnh tải
- Ẩn tải và hiển thị tóm tắt sau khi nhận kết quả
- Sử dụng navigator.clipboard.writeText trong nút "Copy" để sao chép văn bản
```

![placeholder: Ảnh chụp màn hình UI bảng điều khiển bên hiển thị ba trạng thái: nút tóm tắt, trạng thái tải và kết quả tóm tắt](/zh-cn/stage-3/cross-platform/browser-ai-extension/images/image5.png)

<!-- ![placeholder: Ảnh chụp màn hình UI bảng điều khiển bên hiển thị ba trạng thái: nút tóm tắt, trạng thái tải và kết quả tóm tắt](/zh-cn/stage-3/cross-platform/browser-ai-extension/images/image5.png) -->

## 3.4 Trang Cài đặt: Cấu hình API Key

Người dùng cần nơi để nhập API Key của riêng họ. Yêu cầu AI viết trang cài đặt:

```text
Please help me write options.html and options.js:
- A dropdown to choose AI provider (OpenAI / Claude)
- A password input for API Key (type="password")
- A "Save" button
- Save config with chrome.storage.local.set
- Read saved config from storage and fill the form on page load
- Show "Settings saved" after saving
```

> **Lưu ý bảo mật**: API Key được lưu trữ trong `chrome.storage.local` và chỉ giữ trên thiết bị cục bộ. Nhưng nếu bạn muốn xuất bản tiện ích mở rộng này lên Chrome Web Store cho người khác sử dụng, cách an toàn hơn là xây dựng máy chủ proxy backend để API Key không bị phơi trực tiếp trên phía client.

![placeholder: Ảnh chụp màn hình trang cài đặt hiển thị lựa chọn provider và nhập API Key p1](/zh-cn/stage-3/cross-platform/browser-ai-extension/images/image6-1.png)
![placeholder: Ảnh chụp màn hình trang cài đặt hiển thị lựa chọn provider và nhập API Key p2](/zh-cn/stage-3/cross-platform/browser-ai-extension/images/image6-2.png)
![placeholder: Ảnh chụp màn hình trang cài đặt hiển thị lựa chọn provider và nhập API Key p3](/zh-cn/stage-3/cross-platform/browser-ai-extension/images/image6-3.png)
<!-- ![placeholder: Ảnh chụp màn hình trang cài đặt hiển thị lựa chọn provider và nhập API Key](/zh-cn/stage-3/cross-platform/browser-ai-extension/images/image6.png) -->

# Chương 4: Sử dụng AI Tích hợp Chrome (Không cần API Key)

Bắt đầu từ Chrome 138, Google tích hợp khả năng AI dựa trên **Gemini Nano** trực tiếp vào trình duyệt. Cái phù hợp nhất cho trường hợp của chúng ta là **Summarizer API** - nó chạy hoàn toàn cục bộ, không cần API Key, không cần internet và miễn phí.

## 4.1 Kiểm tra Hỗ trợ Trình duyệt

AI tích hợp sẵn có yêu cầu phần cứng:

* Desktop Chrome 138+ (Windows 10+, macOS 13+, Linux, ChromeOS)
* 22 GB dung lượng lưu trữ khả dụng (cho tải mô hình)
* 4GB+ GPU VRAM hoặc 16GB+ RAM hệ thống với 4+ nhân CPU

Nhập `chrome://flags` trong thanh địa chỉ Chrome, tìm cờ liên quan đến Summarization và đảm bảo nó **Enabled**.
* Trong Chrome 131-137, công tắc này gọi là Summarization API.
* Trong Chrome 138-144, nó được đổi tên thành Summarization API for Gemini Nano.
* Trong Chrome 145+, Summarization API for Gemini Nano đã bị loại bỏ và chức năng tóm tắt được tích hợp vào Prompt API for Gemini Nano.

![placeholder: Ảnh chụp màn hình chrome://flags hiển thị công tắc Summarization API](/zh-cn/stage-3/cross-platform/browser-ai-extension/images/image7.png)
<!-- ![placeholder: Ảnh chụp màn hình chrome://flags hiển thị công tắc Summarization API](/zh-cn/stage-3/cross-platform/browser-ai-extension/images/image7.png) -->

## 4.2 Sử dụng Summarizer API

Yêu cầu AI thêm hỗ trợ AI tích hợp sẵn trong `background.js`:

```text
Please help me add Chrome built-in Summarizer API support in background.js:
1. Add a summarizeWithBuiltinAI function
2. First check whether Summarizer.availability() returns 'readily-available'
3. If available, create a summarizer instance, configure type as 'key-points', format as 'markdown', and length as 'medium'
4. Call summarizer.summarize() to summarize
5. In handleSummarize, add a branch for provider === 'builtin'
```

Mã cốt lõi:

```javascript
async function summarizeWithBuiltinAI(text) {
  // Kiểm tra khả dụng
  const availability = await Summarizer.availability()
  if (availability !== 'readily-available') {
    throw new Error('Chrome built-in AI is not available. Please check browser version and hardware requirements.')
  }

  // Tạo summarizer
  const summarizer = await Summarizer.create({
    type: 'key-points',
    format: 'markdown',
    length: 'medium'
  })

  // Chạy tóm tắt
  const summary = await summarizer.summarize(text, {
    context: 'This is a webpage article'
  })

  return summary
}
```

## 4.3 Cập nhật Trang Cài đặt

Thêm tùy chọn **"Chrome Built-in AI (Miễn phí, Không cần API Key)"** vào menu thả xuống provider trong `options.html`. Khi người dùng chọn nó, ẩn ô nhập API Key vì không còn cần nữa.

```text
Please help me modify options.html and options.js:
1. Add an option "Chrome built-in AI (free, no API Key needed)" to the provider dropdown, with value "builtin"
2. Hide the API Key input when builtin is selected
3. Show the API Key input when OpenAI or Claude is selected
```

![placeholder: Ảnh chụp màn hình trang cài đặt đã cập nhật hiển thị ba tùy chọn AI provider, với ô nhập API Key bị ẩn khi Chrome built-in AI được chọn](/zh-cn/stage-3/cross-platform/browser-ai-extension/images/image8.png)
<!-- ![placeholder: Ảnh chụp màn hình trang cài đặt đã cập nhật hiển thị ba tùy chọn AI provider, với ô nhập API Key bị ẩn khi Chrome built-in AI được chọn](/zh-cn/stage-3/cross-platform/browser-ai-extension/images/image8.png) -->

# Chương 5: Kiểm thử và Gỡ lỗi

## 5.1 Quy trình Kiểm thử Cục bộ

Gỡ lỗi Chrome extensions hơi khác so với gỡ lỗi trang web thông thường:

**Gỡ lỗi Service Worker:**
1. Mở `chrome://extensions/`
2. Tìm tiện ích mở rộng của bạn và nhấp liên kết **Service Worker**
3. Cửa sổ DevTools chuyên dụng mở ra nơi bạn có thể thấy đầu ra `console.log` và yêu cầu mạng

**Gỡ lỗi Bảng điều khiển Bên:**
1. Mở bảng điều khiển bên
2. Nhấp chuột phải trong nội dung bảng điều khiển bên
3. Chọn **Inspect**
4. Điều này mở DevTools cho bảng điều khiển bên

**Gỡ lỗi Content Script:**
1. Mở DevTools bằng F12 trên bất kỳ trang web nào
2. Trong bảng Console, nhấp menu thả xuống ngữ cảnh thực thi ở góc trên bên trái
3. Chọn tên tiện ích mở rộng của bạn
4. Sau đó bạn có thể thấy đầu ra `console` từ Content Script

![placeholder: Ảnh chụp màn hình Chrome DevTools hiển thị cách chọn các ngữ cảnh thực thi khác nhau để gỡ lỗi các thành phần tiện ích mở rộng khác nhau](/zh-cn/stage-3/cross-platform/browser-ai-extension/images/image9.webp)
<!-- ![placeholder: Ảnh chụp màn hình Chrome DevTools hiển thị cách chọn các ngữ cảnh thực thi khác nhau để gỡ lỗi các thành phần tiện ích mở rộng khác nhau](/zh-cn/stage-3/cross-platform/browser-ai-extension/images/image9.webp) -->

## 5.2 Khắc phục Sự cố Phổ biến

| Vấn đề | Nguyên nhân Có thể | Giải pháp |
|------|---------|---------|
| Nhấp biểu tượng không có gì xảy ra | Lỗi Service Worker | Kiểm tra Service Worker DevTools Console |
| Không thể lấy nội dung trang | Content Script chưa được chèn | Làm mới trang và thử lại, kiểm tra cấu hình `matches` trong manifest |
| Gọi API thất bại | API Key sai hoặc hết hạn | Nhập lại API Key trong trang cài đặt |
| Bảng điều khiển bên trống | Đường dẫn `sidepanel.html` sai | Kiểm tra `side_panel.default_path` trong manifest |


# Chương 6: Xuất bản lên Chrome Web Store (Tùy chọn)

Nếu bạn muốn chia sẻ tiện ích mở rộng với người khác, bạn có thể xuất bản lên Chrome Web Store.

## 6.1 Chuẩn bị Xuất bản

1. **Đăng ký tài khoản nhà phát triển**: truy cập [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole) và trả phí đăng ký một lần $5
2. **Bật Xác minh 2 Bước**: tài khoản Google của bạn phải bật Xác minh 2 Bước trước khi xuất bản
3. **Chuẩn bị tài sản**:
   * Biểu tượng tiện ích: PNG 128x128
   * Ít nhất một ảnh chụp màn hình: 1280x800 được khuyến nghị
   * Mô tả chức năng chi tiết
   * Giải thích chính sách bảo mật (nếu tiện ích mở rộng của bạn xử lý dữ liệu người dùng)

## 6.2 Đóng gói và Tải lên

1. Nén thư mục tiện ích mở rộng thành tệp `.zip` (không phải `.crx`)
2. Nhấp **New Item** trong Developer Dashboard
3. Tải lên tệp `.zip`
4. Điền thông tin cửa hàng (tên, mô tả, ảnh chụp màn hình, danh mục, v.v.)
5. Điền thực hành bảo mật (khai báo dữ liệu người dùng nào tiện ích mở rộng thu thập)
6. Nhấp **Submit for Review**

Google sẽ kiểm duyệt các tiện ích mở rộng đã gửi, thường mất vài ngày làm việc. Càng ít quyền yêu cầu và mô tả càng rõ ràng, kiểm duyệt thường càng nhanh.

![placeholder: Ảnh chụp màn hình Chrome Web Store Developer Dashboard hiển thị tải lên tiện ích mở rộng và biểu mẫu metadata](/zh-cn/stage-3/cross-platform/browser-ai-extension/images/image10.png)
![placeholder: Ảnh chụp màn hình Chrome Web Store Developer Dashboard hiển thị tải lên tiện ích mở rộng và biểu mẫu metadata p2](/zh-cn/stage-3/cross-platform/browser-ai-extension/images/image10-1.png)

<!-- ![placeholder: Ảnh chụp màn hình Chrome Web Store Developer Dashboard hiển thị tải lên tiện ích mở rộng và biểu mẫu metadata](/zh-cn/stage-3/cross-platform/browser-ai-extension/images/image10.png) -->

# Chương 7: Ghi chú Cuối cùng

Chúc mừng! Bạn đã xây dựng một tiện ích mở rộng trình duyệt dựa trên AI từ đầu. Hãy cùng xem lại những gì chúng ta đã làm:

1. Hiểu kiến trúc Manifest V3 của Chrome extensions
2. Sử dụng Content Script để đọc nội dung trang web
3. Sử dụng Service Worker để gọi AI API và tạo tóm tắt
4. Sử dụng Side Panel để hiển thị kết quả tóm tắt
5. Cũng học cách sử dụng AI tích hợp Chrome không cần bất kỳ API Key nào

Phát triển tiện ích mở rộng trình duyệt là một lĩnh vực rất thú vị - nó cho phép bạn "nâng cấp" bất kỳ trang web nào trên internet. Bên cạnh tóm tắt trang, bạn có thể xây dựng nhiều thứ hơn với kiến trúc tương tự:

**Hướng phát triển nâng cao:**

* **Trợ lý dịch**: dịch trang web ngoại ngữ sang tiếng Việt bằng một cú nhấp chuột
* **Chú thích đọc**: đánh dấu và chú thích trang, sau đó lưu lên đám mây
* **Theo dõi giá**: theo dõi thay đổi giá trên trang thương mại điện tử và thông báo người dùng
* **Trình giải thích mã**: chọn mã trên GitHub và để AI giải thích tự động

Sự xuất hiện của AI tích hợp Chrome giảm rào cản hơn nữa - bạn thậm chí không cần API Key để xây dựng tiện ích mở rộng dựa trên AI. Khi khả năng AI trình duyệt tiếp tục phát triển, không gian tưởng tượng trong lĩnh vực này sẽ chỉ lớn hơn.

***Hãy cho trình duyệt của bạn một số siêu năng lực!***

# Tài liệu Tham khảo

* [Tài liệu Chính thức Chrome Extension - Manifest V3](https://developer.chrome.com/docs/extensions/develop/)
* [Xuất bản Chrome Extension lên Chrome Web Store](https://developer.chrome.com/docs/webstore/publish?hl=zh-cn)
* [Chrome Side Panel API](https://developer.chrome.com/docs/extensions/reference/api/sidePanel)
* [Chrome Built-in AI - Summarizer API](https://developer.chrome.com/docs/ai/summarizer-api)
* [Chrome Built-in AI - Prompt API](https://developer.chrome.com/docs/ai/prompt-api)
* [Tài liệu OpenAI API](https://platform.openai.com/docs/api-reference)
* [Tài liệu Anthropic Claude API](https://docs.anthropic.com/en/docs/)
* [Tài liệu Anthropic Claude API](https://developer.chrome.com/docs/webstore/publish?hl=zh-cn)
