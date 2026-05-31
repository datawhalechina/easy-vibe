# Phát Triển Từ Xa Claude Code trên Điện Thoại

## Giới thiệu

Hãy tưởng tượng các tình huống sau: bạn đột nhiên nghĩ ra ý tưởng sửa lỗi tuyệt vời trên tàu điện ngầm khi đi làm; bạn nhận được cảnh báo sự cố sản xuất khẩn cấp trong khi xếp hàng mua cà phê; bạn muốn kiểm tra tiến độ dự án AI của mình trong khi đi mua sắm cùng bạn gái.

Trong quy trình phát triển truyền thống, các tình huống này thường có nghĩa là bạn cần tìm một nơi để mở máy tính xách tay, hoặc bất lực trì hoãn công việc. Nhưng trong kỷ nguyên viết mã có sự hỗ trợ của AI, các quy tắc đã thay đổi. Claude Code giúp bạn có thể mang theo môi trường phát triển trong túi và duy trì năng suất mọi lúc, mọi nơi.

Vào mùa hè năm 2025, khi việc sử dụng Claude Code ngày càng tăng, các nhà phát triển bắt đầu khám phá các cách tiếp cận "viết mã trên điện thoại" khác nhau. Từ việc sử dụng Termux cục bộ đơn giản, đến kết nối từ xa SSH + Tailscale phức tạp, đến ứng dụng Happy Coder chuyên dụng, một hệ sinh thái phát triển trên điện thoại hoàn chỉnh đã dần hình thành.

Vấn đề cốt lõi mà chương này giải quyết là: làm thế nào để Claude Code theo bạn trên điện thoại và trở thành một "trợ lý phát triển bỏ túi" thực sự.

---

::: info Tổng quan Phản hồi Cộng đồng

Dựa trên phản hồi thực tế từ cộng đồng, trải nghiệm của mỗi cách tiếp cận được so sánh như sau:

**Happy Coder (Cách tiếp cận 2)**
- Vấn đề ổn định kết nối: ngắt kết nối xảy ra thường xuyên và ngữ cảnh bị mất sau khi ngắt
- Chức năng hạn chế: không thể sử dụng các lệnh `/`
- Lo ngại bảo mật: phụ thuộc vào máy chủ chuyển tiếp chính thức và một số người dùng lo ngại về bảo mật dữ liệu

**HAPI (Cách tiếp cận 3)**
- Hỗ trợ máy chủ tự lưu trữ: có thể triển khai trên VPS của riêng bạn
- Trải nghiệm tốt hơn khi kết hợp với Tailscale: chạy `hapi server` trên máy tính và kết nối từ điện thoại qua IP Tailscale
- Kết nối tương đối ổn định, phù hợp cho sử dụng lâu dài

**Claude Remote Control (Cách tiếp cận chính thức)**
- Giải pháp chính thức, tích hợp sẵn với Claude Code
- Hỗ trợ truy cập đầy đủ môi trường cục bộ (MCP, công cụ, cấu hình dự án)
- Yêu cầu đăng ký Max (hỗ trợ Pro sắp ra mắt)
- Phụ thuộc vào kết nối đám mây Anthropic

**Khuyến nghị**: nếu bạn yêu cầu ổn định kết nối cao hoặc lo ngại về bảo mật chuyển tiếp bên thứ ba, hãy chọn **HAPI + Tailscale** hoặc cách tiếp cận **Remote Control chính thức**.

:::

---

## Nguyên lý cốt lõi: Các mô hình kiến trúc phát triển trên điện thoại

Trước khi giới thiệu các cách tiếp cận cụ thể, trước tiên hãy hiểu bản chất của vấn đề.

### Tại sao phát triển trên điện thoại lại là vấn đề?

Các IDE truyền thống (như VS Code và IntelliJ) yêu cầu môi trường hệ điều hành đầy đủ, CPU mạnh, bộ nhớ lớn và không gian lưu trữ. Mặc dù điện thoại ngày càng mạnh mẽ, chúng vẫn có những giới hạn tự nhiên đối với trải nghiệm phát triển:

**Giới hạn đầu vào**: bàn phím ảo kém hiệu quả cho việc viết mã và cú pháp phức tạp dễ gõ sai

**Giới hạn màn hình**: màn hình nhỏ khiến khó xem mã, terminal và trình duyệt cùng lúc

**Giới hạn môi trường**: điện thoại không thể chạy chuỗi công cụ phát triển đầy đủ (trình biên dịch, cơ sở dữ liệu, trình gỡ lỗi)

**Giới hạn kết nối**: mạng di động không ổn định và phiên SSH dễ bị ngắt

### Ý tưởng cốt lõi: kiến trúc thin-client

Ý tưởng cốt lõi đằng sau tất cả các cách tiếp cận phát triển trên điện thoại đều giống nhau: điện thoại chỉ là "bảng điều khiển"; công việc phát triển thực sự được thực hiện ở nơi khác.

```text
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│    ┌─────────────┐              ┌─────────────┐             │
│    │  Điện thoại │              │  Máy chủ/   │             │
│    │(Bộ điều khiển)│  ────────►  │   Đám mây   │             │
│    │             │   Lệnh       │(Bộ thực thi) │             │
│    │ • Gửi lệnh │              │ • Chạy CLI  │             │
│    │ • Xem kết quả│              │ • Thực thi  │             │
│    │ • Xem xét   │              │   mã        │             │
│    └─────────────┘              └─────────────┘             │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

Kiến trúc này cho phép điện thoại chỉ tập trung vào tương tác người-máy, trong khi tính toán nặng được giao cho máy chủ hoặc đám mây của bạn.

---

## Cách tiếp cận 1: Ứng dụng iOS Chính Thức

Vào tháng 10 năm 2025, Anthropic chính thức ra mắt hỗ trợ Claude Code trên điện thoại trong ứng dụng iOS. Đây là lựa chọn phát triển trên điện thoại đơn giản nhất.

### Giới hạn khu vực

Lưu ý quan trọng: ứng dụng Claude **kh thể sử dụng trực tiếp** ở Trung Quốc đại lục.

Nếu bạn ở Trung Quốc đại lục, bạn nên sử dụng trực tiếp **Happy Coder** (Cách tiếp cận 2), có thể hoạt động bình thường thông qua dịch vụ chuyển tiếp API nội địa đã cấu hình.

Nếu bạn có Apple ID nước ngoài, bạn có thể chuyển đổi khu vực và tải xuống ứng dụng Claude.

### Cách hoạt động

```text
┌─────────────┐                    ┌─────────────────┐
│  Ứng dụng   │ ──────────────────► │  Đám mây        │
│    iOS      │   HTTPS + OAuth     │  Anthropic      │
│ (Điện thoại)│                    │  Claude Code    │
└─────────────┘                    └────────┬────────┘
                                           │
                                           ▼
                                   ┌───────────────┐
                                   │   GitHub API  │
                                   └───────────────┘
```

Ứng dụng điện thoại của bạn chỉ gửi lệnh. Tất cả thực thi mã chạy trong sandbox đám mây của Anthropic và kết quả được đồng bộ hóa thông qua GitHub.

### Cách sử dụng cơ bản

**Điều kiện tiên quyết:**

- iPhone với iOS 15 trở lên
- Đăng ký Claude Pro/Team/Enterprise (gói miễn phí không được hỗ trợ)
- Tài khoản GitHub

**Các bước:**

1. Tải xuống ứng dụng Claude từ App Store
2. Đăng nhập vào tài khoản Anthropic của bạn
3. Tìm tab "Code" trong ứng dụng
4. Kết nối kho lưu trữ GitHub của bạn thông qua OAuth
5. Bắt đầu tạo tác vụ

### Ưu điểm và nhược điểm

Ưu điểm là không có rào cản cài đặt, trải nghiệm mượt mà và thông báo đẩy. Nhược điểm là chỉ hỗ trợ iOS, quy trình làm việc chủ yếu qua GitHub, khả năng tương đối hạn chế (không thể truy cập hệ thống tệp cục bộ) và không thể sử dụng trực tiếp ở Trung Quốc đại lục.

---

## Cách tiếp cận 2: Happy Coder

Happy Coder là một ứng dụng khách di động và web mã nguồn mở được thiết kế cho Claude Code và Codex, với mã hóa đầu cuối và điều khiển từ xa trợ lý viết mã AI của bạn từ bất cứ đâu.

### Cách hoạt động

```text
┌─────────────┐              ┌─────────────┐              ┌─────────────┐
│  Ứng dụng   │   ────────►  │ Máy chủ     │   ◄────────  │ happy-coder │
│    Happy    │  WS mã hóa   │   Happy     │  WebSocket   │ (Máy tính)  │
│ (Điện thoại/│              │ (Chuyển tiếp)│              │             │
│     Web)    │              │             │              │             │
└─────────────┘              └─────────────┘              └──────┬──────┘
                                                               │
                                                               ▼
                                                        ┌─────────────┐
                                                        │ Claude Code │
                                                        │     CLI     │
                                                        └─────────────┘
```

Trên máy tính của bạn, chạy `happy` thay vì `claude` để khởi động trợ lý viết mã AI. Khi bạn cần điều khiển từ điện thoại, phiên tự động chuyển sang chế độ từ xa. Nhấn bất kỳ phím nào trên máy tính để chuyển lại sang điều khiển cục bộ.

### Cài đặt và sử dụng

**Bước 1: tải xuống ứng dụng**

| Nền tảng | Liên kết |
|------|------|
| iOS | [App Store](https://apps.apple.com/us/app/happy-claude-code-client/id6748571505) |
| Android | [Google Play](https://play.google.com/store/apps/details?id=com.ex3ndr.happy) |
| Web | [app.happy.engineering](https://app.happy.engineering) |

**Bước 2: cài đặt CLI trên máy tính**

```bash
npm install -g happy-coder
```

**Bước 3: khởi động và ghép nối**

```bash
# chạy trong thư mục dự án của bạn
cd ~/my-project
happy

# một mã QR ghép nối sẽ được hiển thị
```

**Bước 4: quét và ghép nối trên điện thoại**

Mở ứng dụng Happy và quét mã QR hiển thị trên máy tính. Sau khi ghép nối thành công, bạn có thể điều khiển Claude Code từ điện thoại.

**Bước 5: sử dụng**

```bash
# khởi động Claude Code
happy

# hoặc khởi động Codex
happy codex
```

### Liên kết tài nguyên

- [Dự án GitHub](https://github.com/slopus/happy) - mã nguồn
- [Tài liệu](https://happy.engineering/docs) - tài liệu sử dụng
- [Cộng đồng Discord](https://discord.gg/fX9WBAhyfD) - thảo luận cộng đồng

### Ưu điểm và nhược điểm

Ưu điểm là cài đặt đơn giản, hỗ trợ đa nền tảng, mã hóa đầu cuối và có thể kiểm tra mã nguồn mở. Nhược điểm là phụ thuộc vào cơ sở hạ tầng chuyển tiếp bên thứ ba và cần xác minh tính khả dụng của ứng dụng di động trong môi trường của riêng bạn.

---

## Cách tiếp cận 3: HAPI

HAPI là một giải pháp thay thế cho Happy Coder, với thiết kế ưu tiên cục bộ và hỗ trợ chuyển đổi thiết bị liền mạch trên nhiều mô hình AI.

### Cách hoạt động

```text
┌─────────────┐              ┌─────────────┐              ┌─────────────┐
│  Ứng dụng   │   ────────►  │ Máy chủ     │   ◄────────  │    hapi     │
│    HAPI     │  WireGuard   │    HAPI     │  WireGuard   │ (Máy tính)  │
│(Điện thoại/ │    + TLS     │ (Tự lưu     │    + TLS     │             │
│ PWA/Telegram)│              │   trữ)     │              │             │
└─────────────┘              └─────────────┘              └──────┬──────┘
                                                               │
                                                               ▼
                                                        ┌─────────────┐
                                                        │ Claude Code │
                                                        │   / Codex / │
                                                        │ Gemini v.v. │
                                                        └─────────────┘
```

HAPI sử dụng WireGuard cộng với TLS để mã hóa đầu cuối. Tất cả giao tiếp đi qua các máy chủ chuyển tiếp được mã hóa. Bạn có thể tự lưu trữ máy chủ chuyển tiếp để kiểm soát hoàn toàn luồng dữ liệu của mình.

### Tính năng cốt lõi

- **Chuyển đổi liền mạch**: chuyển đổi điều khiển giữa máy tính để bàn và điện thoại; nhấn bất kỳ phím nào để quay lại điều khiển cục bộ
- **Ưu tiên native**: ứng dụng di động được bọc bằng công nghệ native để tương tác mượt mà
- **Phê duyệt AFK**: nhận yêu cầu phê duyệt trên điện thoại khi bạn rời khỏi máy tính
- **Hỗ trợ đa mô hình**: hỗ trợ Claude Code, Codex, Gemini, OpenCode và nhiều hơn nữa
- **Terminal ở bất cứ đâu**: truy cập qua PWA, Telegram Mini App và nhiều hơn nữa
- **Điều khiển bằng giọng nói**: hỗ trợ lệnh đầu vào bằng giọng nói, giúp tay bạn rảnh rỗi

### Cài đặt và sử dụng

**Bước 1: khởi động máy chủ chuyển tiếp**

```bash
# chạy trên máy chủ của bạn (hoặc khởi động trực tiếp với npx)
npx @twsxtd/hapi hub --relay
```

**Bước 2: cài đặt CLI trên máy tính**

```bash
# chạy trong thư mục dự án của bạn
cd ~/my-project
npx @twsxtd/hapi

# hoặc cài đặt toàn cầu
npm install -g @twsxtd/hapi
hapi
```

**Bước 3: ghép nối thiết bị**

Làm theo hướng dẫn trên terminal, mở ứng dụng HAPI trên điện thoại và quét mã QR để hoàn tất ghép nối.

**Bước 4: phương thức truy cập**

| Phương thức truy cập | Mô tả |
|---------|------|
| Web PWA | Truy cập trình duyệt, hỗ trợ cài đặt lên màn hình chính |
| Telegram Mini App | Sử dụng trực tiếp trong Telegram |
| Ứng dụng di động | Trải nghiệm ứng dụng native (nếu đã phát hành) |

### So sánh với Happy Coder

| Tính năng | Happy Coder | HAPI |
|------|-------------|------|
| Triết lý thiết kế | Ưu tiên đám mây | Ưu tiên cục bộ |
| Phương thức mã hóa | WebSocket + E2E | WireGuard + TLS |
| Hỗ trợ đa mô hình | Claude Code, Codex | Claude, Codex, Gemini, OpenCode |
| Phương thức truy cập | iOS/Android/Web | PWA, Telegram, thêm |
| Điều khiển giọng nói | Không | Có |
| Phê duyệt AFK | Không | Có |
| Chuyển tiếp tự lưu trữ | Yêu cầu triển khai thủ công | Hỗ trợ sẵn sàng |

### Liên kết tài nguyên

- [Dự án GitHub](https://github.com/tiann/hapi) - mã nguồn
- [Tài liệu PWA](https://github.com/tiann/hapi/blob/main/docs/pwa.md) - cài đặt và sử dụng PWA
- [Cách hoạt động](https://github.com/tiann/hapi/blob/main/docs/how-it-works.md) - chi tiết triển khai kỹ thuật
- [Trợ lý giọng nói](https://github.com/tiann/hapi/blob/main/docs/voice.md) - tính năng điều khiển bằng giọng nói
- [Tại sao chọn HAPI](https://github.com/tiann/hapi/blob/main/docs/why-hapi.md) - triết lý thiết kế
- [FAQ](https://github.com/tiann/hapi/blob/main/docs/faq.md) - câu hỏi thường gặp

### Ưu điểm và nhược điểm

Ưu điểm là thiết kế ưu tiên cục bộ, hỗ trợ đa mô hình, mã hóa đầu cuối, điều khiển bằng giọng nói và khả năng tự lưu trữ máy chủ chuyển tiếp. Nhược điểm là dự án còn khá mới và hệ sinh thái vẫn đang phát triển.

---

## Cách tiếp cận 4: SSH + Tailscale + Tmux

Đây là lựa chọn tốt nhất cho các nhà phát triển chuyên nghiệp. Bạn kết nối từ xa đến máy phát triển của mình qua SSH và giữ các phiên liên tục với Tmux.

### Cách hoạt động

```text
┌─────────────┐              ┌─────────────┐              ┌─────────────┐
│  Điện thoại │   ────────►  │  Tailscale  │   ◄────────  │  Máy tính   │
│(SSH client) │   VPN P2P    │  relay/hole │   VPN P2P    │ (máy chủ   │
│             │              │             │              │  phát triển)│
└─────────────┘              └─────────────┘              └──────┬──────┘
                                                               │
                                                               ▼
                                                        ┌─────────────┐
                                                        │    Tmux     │
                                                        │ (duy trì   │
                                                        │   phiên)   │
                                                        └─────────────┘
```

Tailscale tạo một VPN peer-to-peer để bạn có thể truy cập máy tính ở nhà từ bất kỳ mạng nào. Tmux đảm bảo Claude Code tiếp tục chạy trong nền ngay cả khi SSH bị ngắt.

### Tại sao bạn cần Tailscale?

**Vấn đề với SSH truyền thống:**

```text
Điện thoại (4G) ──XX──> Router NAT ──XX──> Máy tính ở nhà
              (không thể xuyên qua)   (cách ly LAN)
```

Máy tính của bạn nằm trên mạng riêng và điện thoại của bạn nằm trên mạng công cộng, nên truy cập trực tiếp thất bại. Giải pháp truyền thống yêu cầu chuyển tiếp cổng cộng với DNS động, vừa phức tạp vừa rủi ro.

**Giải pháp Tailscale:**

```text
Điện thoại (4G) ──► Chuyển tiếp Tailscale ──◄── Máy tính ở nhà
             (tự động đục lỗ hoặc chuyển tiếp)
```

Tailscale sử dụng kỹ thuật xuyên NAT và tự động dự phòng sang chuyển tiếp nếu xuyên NAT thất bại. Toàn bộ kết nối được mã hóa.

### Các bước cài đặt đầy đủ

**Bước 1: cài đặt Tailscale trên máy tính**

```bash
# macOS
brew install --cask tailscale

# hoặc tải xuống trình cài đặt
# https://tailscale.com/download
```

**Bước 2: đăng nhập và lấy IP**

```bash
# khởi động Tailscale
sudo tailscale up

# kiểm tra IPv4 Tailscale
tailscale ip -4
# ví dụ đầu ra: 100.x.x.x
```

**Bước 3: cài đặt Tailscale trên điện thoại**

Tải xuống Tailscale từ App Store hoặc Google Play và đăng nhập bằng cùng tài khoản.

**Bước 4: cài đặt và cấu hình Tmux**

```bash
# macOS
brew install tmux

# tạo ~/.tmux.conf
cat > ~/.tmux.conf << 'EOF'
# bật hỗ trợ chuột
set -g mouse on

# terminal mặc định với 256 màu
set -g default-terminal "screen-256color"

# thay đổi phím tiền tố thành Ctrl+A (tùy chọn)
unbind C-b
set -g prefix C-a

# phím tắt chia màn hình đơn giản hóa
bind v split-window -h
bind h split-window
EOF
```

**Bước 5: tạo một phiên liên tục**

```bash
# tạo phiên có tên "claude"
tmux new -s claude

# khởi động Claude Code trong phiên này
cd ~/my-project
claude

# tách mà không đóng
# nhấn Ctrl+B rồi D
```

**Bước 6: kết nối từ ứng dụng SSH trên điện thoại**

Các ứng dụng SSH được khuyến nghị:

| Ứng dụng | Nền tảng | Ghi chú |
|--------|------|------|
| Blink Shell | iOS | Hỗ trợ MOSH, tuyệt vời cho mạng không ổn định |
| Termius | iOS/Android | Đa nền tảng và giao diện đẹp |
| a-Shell | iOS | Miễn phí và nhẹ |

Cấu hình kết nối:

```text
Host: 100.x.x.x (IP Tailscale của bạn)
Port: 22
Username: tên người dùng máy tính của bạn
```

Sau khi kết nối, kết nối vào Tmux:

```bash
tmux attach -t claude
```

### Mẹo nâng cao

**Ngăn máy tính ngủ:**

```bash
# macOS
caffeinate -dimsu &

# hoặc đặt Cài đặt Hệ thống > Tiết kiệm Năng lượng > ngăn ngủ tự động
```

**Sử dụng MOSH cho mạng không ổn định:**

MOSH (Mobile Shell) là một giải pháp thay thế SSH được tối ưu hóa cho mạng di động, với khả năng khôi phục liền mạch khi chuyển đổi mạng.

```bash
# cài đặt trên máy tính
brew install mosh

# sử dụng MOSH từ ứng dụng điện thoại
# Blink Shell hỗ trợ MOSH sẵn
```

**Script kết nối một lệnh:**

Đặt lệnh này làm lệnh khởi động trong ứng dụng SSH của bạn:

```bash
tmux attach -t claude || tmux new -s claude
```

Lệnh này sẽ tự động kết nối vào phiên hiện có hoặc tạo phiên mới.

### Ưu điểm và nhược điểm

Ưu điểm là khả năng đầy đủ và quy trình làm việc tương đương máy tính để bàn với tất cả công cụ phát triển. Nhược điểm là cài đặt phức tạp hơn và yêu cầu giữ máy tính trực tuyến.

---

## Cách tiếp cận 5: Môi trường Termux Cục bộ

Nếu bạn là người dùng Android, bạn có thể chạy Claude Code trực tiếp trên điện thoại mà không cần kết nối thiết bị bên ngoài.

### Cách hoạt động

```text
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│                    ┌─────────────┐                          │
│                    │   Termux    │                          │
│                    │ (môi trường │                          │
│                    │   Linux)    │                          │
│                    │             │                          │
│                    │ • Node.js   │                          │
│                    │ • Claude    │                          │
│                    │   Code CLI  │                          │
│                    │             │                          │
│                    │ • Tệp dự   │                          │
│                    │   án       │                          │
│                    │ • Git       │                          │
│                    └─────────────┘                          │
│                         │                                   │
│                         ▼                                   │
│                   ┌─────────────┐                           │
│                   │Anthropic API│                           │
│                   └─────────────┘                           │
└─────────────────────────────────────────────────────────────┘
```

Termux là trình mô phỏng terminal và môi trường Linux cho Android. Bạn có thể cài đặt trực tiếp Node.js và Claude Code trong đó.

### Các bước cài đặt

**Quan trọng**: tải Termux từ [F-Droid](https://f-droid.org/), không phải từ Google Play (phiên bản Play đã lỗi thời).

**Bước 1: cài đặt công cụ cơ bản**

```bash
# cập nhật trình quản lý gói
pkg update && pkg upgrade

# cài đặt công cụ phát triển
pkg install git nodejs python vim
```

**Bước 2: cài đặt Claude Code**

```bash
npm install -g @anthropic-ai/claude-code
```

**Bước 3: cấu hình môi trường**

```bash
# tạo không gian làm việc
mkdir -p ~/projects
cd ~/projects

# khởi tạo dự án
git clone https://github.com/your-repo.git
cd your-repo

# khởi động Claude Code
claude
```

**Bước 4: cấu hình bàn phím ngoài (khuyến nghị)**

Trong Termux:

```bash
# bật hàng phím bổ sung
# nhấn giữ màn hình > More > Extra keys row

# cấu hình phím tắt
# thêm vào ~/.termux/termux.properties
extra-keys = [['ESC','/','-','HOME','UP','END','PGUP','~'], \
              ['TAB','CTRL','ALT','LEFT','DOWN','RIGHT','PGDN','|']]
```

### Cân nhắc hiệu suất

| Loại tác vụ | Hiệu suất Android |
|---------|-------------|
| Phát triển web (HTML/CSS/JS) | Xuất sắc |
| Script Python | Xuất sắc |
| Ứng dụng Node.js | Tốt |
| Chạy bộ kiểm thử | Trung bình |
| Biên dịch dự án lớn | Không khuyến nghị |

### Ưu điểm và nhược điểm

Ưu điểm là kiểm soát cục bộ đầy đủ, không phụ thuộc máy chủ bên ngoài và hoạt động ưu tiên ngoại tuyến. Nhược điểm là hiệu suất điện thoại hạn chế, trải nghiệm nhập văn bản kém và chỉ có trên Android.

---

## Cách tiếp cận 6: Claude Code UI

Claude Code UI (còn được gọi là CloudCLI) là một dự án mã nguồn mở cung cấp giao diện web cho Claude Code, với hỗ trợ trình duyệt điện thoại.

### Cách hoạt động

```text
┌─────────────┐              ┌─────────────┐              ┌─────────────┐
│Trình duyệt  │   ────────►  │ Máy chủ Web │   ◄────────  │ Claude Code │
│  điện thoại │  HTTP/HTTPS  │ (localhost) │   gọi        │     CLI     │
└─────────────┘              └─────────────┘              └─────────────┘
```

Bạn chạy một máy chủ web trên máy tính, sau đó truy cập nó từ trình duyệt điện thoại. Điều này yêu cầu truy cập LAN hoặc tạo đường hầm.

### Cài đặt và sử dụng

**Bước 1: cài đặt**

```bash
# khởi động một lệnh (khuyến nghị)
npx @siteboon/claude-code-ui

# hoặc cài đặt toàn cầu
npm install -g @siteboon/claude-code-ui
claude-code-ui
```

**Bước 2: mở giao diện**

Máy chủ mặc định tại `http://localhost:3001`.

**Bước 3: truy cập từ điện thoại**

Phương pháp A - truy cập LAN (cùng Wi-Fi):

```bash
# liên kết tất cả giao diện
claude-code-ui --host 0.0.0.0

# truy cập từ điện thoại
http://<computer-lan-ip>:3001
```

Phương pháp B - đường hầm ngrok:

```bash
# cài đặt ngrok
brew install ngrok

# khởi động đường hầm
ngrok http 3001

# mở URL ngrok từ điện thoại
```

### Tính năng

- Thiết kế đáp ứng với hỗ trợ di động
- Giao diện trò chuyện tích hợp
* Trình duyệt tệp
* Giao diện thao tác Git
* Quản lý phiên

### Ưu điểm và nhược điểm

Ưu điểm là giao diện đồ họa và tính năng phong phú. Nhược điểm là yêu cầu đường hầm khi ngoài LAN và cài đặt tương đối phức tạp hơn.

---

## Cách tiếp cận 7: Môi trường Phát triển Đám mây

Nếu bạn không có máy tính cục bộ luôn bật, bạn có thể sử dụng môi trường phát triển đám mây nơi Claude Code chạy trên máy chủ đám mây.

### Cách hoạt động

```text
┌─────────────┐              ┌─────────────┐              ┌─────────────┐
│  Điện thoại │   ────────►  │  Hộp đám mây│   ─────────► │ Claude Code │
│(Trình duyệt/│    HTTPS     │  (DevBox)   │              │     CLI     │
│  Ứng dụng)  │              │             │              │             │
└─────────────┘              └─────────────┘              └─────────────┘
```

Một container đám mây được cài đặt sẵn Claude Code và bạn truy cập nó từ trình duyệt hoặc ứng dụng di động.

### Sử dụng Sealos DevBox

**Bước 1: tạo môi trường**

Truy cập [Sealos DevBox](https://sealos.io/devbox), chọn mẫu Claude Code và tạo môi trường.

**Bước 2: khởi động môi trường phát triển**

Môi trường sẵn sàng trong khoảng 30-60 giây và bạn nhận được một terminal web.

**Bước 3: cấu hình Claude API**

```bash
export ANTHROPIC_API_KEY="your-api-key"
```

**Bước 4: kết nối ứng dụng Happy**

```bash
# cài đặt happy-coder (hoặc sử dụng phiên bản đã cài đặt sẵn)
npm install -g happy-coder

# tạo mã QR ghép nối
happy
```

Sau khi quét trên điện thoại, bạn có thể sử dụng ngay lập tức.

### So sánh các lựa chọn đám mây

| Nền tảng | Claude Code | Tối ưu hóa di động | Thời gian khởi động | Giá |
|------|------------|----------|----------|------|
| Sealos DevBox | Cài đặt sẵn | Hỗ trợ Happy | ~60s | Trả theo mức sử dụng |
| GitHub Codespaces | Cài đặt thủ công | Quy trình trình duyệt | ~2-3 phút | Hạn mức miễn phí + theo giờ |
| Gitpod | Cài đặt thủ công | Quy trình trình duyệt | ~1-2 phút | Hạn mức miễn phí + theo giờ |
| Replit | Không có Claude Code native | Ứng dụng native | Tức thì | Miễn phí + đăng ký |

### Ưu điểm và nhược điểm

Ưu điểm là không yêu cầu máy tính cục bộ, tính nhất quán môi trường và khả năng mở rộng. Nhược điểm là sử dụng trả phí, phụ thuộc mạng và mã được lưu trữ trên đám mây.

---

## So sánh và Lựa chọn

Mỗi cách tiếp cận có những điểm mạnh khác nhau và phù hợp với các tình huống khác nhau.

### Bảng so sánh

| Cách tiếp cận | Độ khó | Yêu cầu đường hầm | Chi phí | Tình huống tốt nhất |
|------|------|-------------|------|----------|
| Ứng dụng iOS chính thức | Dễ | Không | $20/tháng | Kiểm tra nhanh, tác vụ đơn giản |
| Happy Coder | Khá dễ | Không | Miễn phí | Sử dụng hàng ngày, tiện lợi |
| HAPI | Trung bình | Không | Miễn phí | Đa mô hình, ưu tiên cục bộ |
| SSH + Tailscale | Khá phức tạp | Không | Miễn phí | Phát triển chuyên nghiệp, đầy đủ tính năng |
| Termux | Trung bình | Không | Miễn phí | Phát triển cục bộ Android |
| Claude Code UI | Trung bình | Có | Miễn phí | Ưu tiên giao diện web |
| Cloud DevBox | Dễ | Không | Trả theo mức sử dụng | Không có máy tính cục bộ |

### Hướng dẫn lựa chọn

**Nếu bạn ở Trung Quốc đại lục**: sử dụng **Happy Coder**; với cấu hình chuyển tiếp API nội địa, nó hoạt động tốt.

**Nếu bạn muốn tối đa tiện lợi**: chọn Happy Coder. Quy trình quét và sử dụng rất tiện lợi.

**Nếu bạn cần hỗ trợ đa mô hình**: chọn HAPI. Nó hỗ trợ nhiều trợ lý viết mã AI và lý tưởng cho quy trình chuyển đổi mô hình.

**Nếu bạn có máy tính luôn bật**: chọn SSH + Tailscale. Điều này mang lại trải nghiệm hoàn chỉnh nhất.

**Nếu bạn là người dùng iPhone (ngoài Trung Quốc đại lục)**: ứng dụng chính thức là cách dễ nhất để bắt đầu.

**Nếu bạn chỉ có Android**: Termux cung cấp một lộ trình phát triển di động hoàn toàn cục bộ.

**Nếu bạn không có máy tính**: cloud DevBox là lựa chọn lý tưởng.

---

## Bảo mật và Quyền riêng tư

Phát triển trên điện thoại liên quan đến việc chuyển mã qua mạng, do đó bảo mật cần được đặc biệt chú ý.

### Rủi ro của máy chủ chuyển tiếp

Khi sử dụng các dịch vụ phụ thuộc chuyển tiếp như Happy Coder hoặc HAPI, hãy xem xét các rủi ro sau:

```text
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  Máy chủ chuyển tiếp có thể thấy những gì?                 │
│                                                             │
│  • Dữ liệu trước mã hóa (nếu E2E được triển khai kém)     │
│  • Metadata (khi bạn kết nối, phiên chạy bao lâu)          │
│  • Khóa API của bạn (nếu cấu hình sai)                     │
│                                                             │
│  Máy chủ chuyển tiếp có thể làm những gì?                  │
│                                                             │
│  • Ghi lại nội dung mã của bạn                             │
│  • Đánh cắp thông tin xác thực API                         │
│  • Tiêm các lệnh độc hại                                   │
│  • Lạm dụng thiết bị của bạn làm nút tấn công             │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Thực hành bảo mật tốt nhất

**1. Phân loại độ nhạy mã**

```text
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  Dự án công khai/mã học tập -> mọi cách tiếp cận đều chấp │
│  nhận được                                                 │
│                                                             │
│  Dự án riêng tư -> ưu tiên SSH+Tailscale hoặc tự lưu trữ  │
│                                                             │
│  Mã thương mại -> chỉ sử dụng SSH+Tailscale, vô hiệu hóa  │
│  tất cả đường dẫn chuyển tiếp bên thứ ba                   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**2. Quản lý khóa**

```bash
# không mã hóa cứng khóa trong nguồn
const apiKey = "sk-ant-xxxxx"

# sử dụng biến môi trường
const apiKey = process.env.ANTHROPIC_API_KEY

# sử dụng tệp .env (thêm vào .gitignore)
ANTHROPIC_API_KEY=sk-ant-xxxxx
```

**3. Sử dụng chế độ sandbox**

Claude Code hỗ trợ chế độ sandbox để giới hạn phạm vi truy cập:

```bash
claude --sandbox /path/to/project
```

**4. Tự lưu trữ chuyển tiếp**

Nếu sử dụng Happy Coder, cân nhắc tự lưu trữ máy chủ chuyển tiếp:

```bash
# sao chép dự án (bao gồm triển khai máy chủ)
git clone https://github.com/slopus/happy.git
cd happy

# triển khai máy chủ lên VPS của bạn
# xem tài liệu dự án để biết chi tiết
```

**5. Sử dụng Headscale**

Headscale là một triển khai mã nguồn mở của Tailscale và có thể tự lưu trữ:

```bash
# triển khai Docker một lệnh
docker run -d \
  --name headscale \
  -v /srv/headscale:/etc/headscale \
  -p 3478:3478/udp \
  -p 8080:8080 \
  headscale/headscale:latest
```

---

## Câu hỏi Thường gặp

### Tôi có cần xuyên NAT không?

Hầu hết các cách tiếp cận hiện đại **không** yêu cầu xuyên NAT thủ công:

| Cách tiếp cận | Nguyên lý |
|------|------|
| Happy Coder | Chế độ chuyển tiếp, cả hai bên chủ động kết nối đến máy chủ |
| HAPI | Chế độ chuyển tiếp, WireGuard + TLS |
| Tailscale | Xuyên NAT hoặc chuyển tiếp |
| Ứng dụng iOS | Thực thi đám mây |
| Claude Code UI | Yêu cầu truy cập đầu vào |

### Tại sao chế độ chuyển tiếp không yêu cầu xuyên NAT?

```text
Kết nối ra ngoài (NAT cho phép):
Máy tính ──► Máy chủ chuyển tiếp có

Kết nối vào (NAT chặn):
Bên ngoài ──► Máy tính không

Thủ thuật chuyển tiếp:
Cả hai bên tạo kết nối ra ngoài đến máy chủ chuyển tiếp,
do đó không bên nào cần kết nối đầu vào.
```

### Phát triển trên điện thoại có ảnh hưởng đến pin không?

Các cách tiếp cận khác nhau tiêu thụ điện năng khác nhau:

| Cách tiếp cận | Mức tiêu thụ | Lý do |
|------|--------|------|
| Terminal SSH | Thấp | Chỉ kết xuất văn bản |
| Ứng dụng iOS | Trung bình | Thực thi đám mây, điện thoại chỉ điều khiển |
| Termux | Cao | Runtime CLI cục bộ |
| Trình duyệt | Trung bình | Tải kết xuất giao diện web |

Đối với các phiên dài, hãy giữ điện thoại đang sạc.

### Điều gì xảy ra khi mạng bị ngắt?

| Cách tiếp cận | Tác động của việc ngắt mạng |
|------|-------------|
| SSH + Tmux | Claude tiếp tục chạy; khôi phục khi kết nối lại |
| Happy Coder | Tự động kết nối lại |
| HAPI | Tự động kết nối lại |
| Ứng dụng iOS | Đám mây tiếp tục; ứng dụng hiển thị ngắt kết nối |
| Termux | Gián đoạn phiên |

### Tôi có thể biên dịch dự án lớn trên điện thoại không?

Không khuyến nghị. CPU và bộ nhớ điện thoại hạn chế và biên dịch lớn có thể gây ra:

-发热 đáng kể
- pin cạn nhanh
- thời gian biên dịch rất lâu

Chạy các tác vụ biên dịch nặng trên máy chủ từ xa hoặc môi trường đám mây.

---

## Tổng kết

Ý tưởng cốt lõi của phát triển Claude Code trên điện thoại là: **điện thoại là bộ điều khiển và phát triển thực sự chạy ở nơi khác**.

Cách tiếp cận nào bạn nên chọn phụ thuộc vào nhu cầu cụ thể của bạn.

Nếu bạn ở Trung Quốc đại lục, **Happy Coder** được khuyến nghị, đặc biệt khi kết hợp với cấu hình chuyển tiếp API nội địa.

Nếu bạn muốn cài đặt thuận tiện nhất, hãy sử dụng **Happy Coder**. Quét để kết nối, nhận thông báo đẩy và chuyển đổi thiết bị mượt mà.

Nếu bạn cần hỗ trợ đa mô hình hoặc kiến trúc ưu tiên cục bộ, hãy sử dụng **HAPI**. Nó hỗ trợ nhiều trợ lý và tự lưu trữ máy chủ chuyển tiếp.

Nếu bạn muốn trải nghiệm phát triển hoàn chỉnh nhất, hãy sử dụng **SSH + Tailscale**. Cài đặt phức tạp hơn nhưng khả năng gần giống với máy tính để bàn nhất.

Nếu bạn là người dùng iOS ngoài Trung Quốc đại lục, **ứng dụng chính thức** là cách dễ nhất để bắt đầu.

Nếu bạn là người dùng Android, **Termux** cho phép phát triển hoàn toàn cục bộ trên điện thoại.

Nếu bạn không có máy tính luôn bật, **cloud DevBox** là lựa chọn lý tưởng.

Bất kể bạn chọn giải pháp nào, bảo mật đều quan trọng: thận trọng với chuyển tiếp bên thứ ba cho mã nhạy cảm, quản lý khóa API đúng cách và ưu tiên đường dẫn tự lưu trữ hoặc riêng tư cho các dự án quan trọng.

---

## Tài liệu tham khảo

### Tài nguyên chính thức

- [Tài liệu chính thức Claude Code](https://docs.anthropic.com/en/docs/claude-code) - tài liệu Claude Code chính thức đầy đủ
- [Ứng dụng Claude iOS](https://apps.apple.com/app/claude/id6473753684) - ứng dụng iOS chính thức

### Dự án mã nguồn mở

- [slopus/happy](https://github.com/slopus/happy) (2.5k stars) - ứng dụng khách di động Happy Coder
- [tiann/hapi](https://github.com/tiann/hapi) - trợ lý viết mã AI đa mô hình ưu tiên cục bộ HAPI
- [siteboon/claudecodeui](https://github.com/siteboon/claudecodeui) - Claude Code UI (CloudCLI)
- [juanfont/headscale](https://github.com/juanfont/headscale) (19k stars) - triển khai Tailscale mã nguồn mở

### Hướng dẫn tiếng Trung

- [Viết mã mọi lúc mọi nơi: Cấu hình Claude Code trên điện thoại](https://m.blog.csdn.net/haa_y/article/details/151156494) - hướng dẫn cài đặt Termux
- [Phòng thí nghiệm AI trong túi của bạn: Quy trình Claude Code di động luôn trực tuyến](https://www.cnblogs.com/swizard/p/19308983) - cách tiếp cận Tmux + Docker
- [Tôi đưa Claude Code đi mua sắm cùng bạn gái](https://post.m.smzdm.com/p/a3r7d63d/) - kết nối từ xa Tailscale
- [Xây dựng ứng dụng sản xuất từ điện thoại](https://m.toutiao.com/article/7611823834756301318/) - trường hợp phát triển di động thực tế

### Tài nguyên tiếng Anh

- [Hướng dẫn toàn diện sử dụng Claude Code trên điện thoại | Sealos Blog](https://sealos.io/blog/claude-code-on-phone/) - hướng dẫn di động toàn diện nhất
- [Hướng dẫn đầy đủ SSH + Tailscale + Termius](https://m.blog.csdn.net/Lvyizhuo/article/details/157692953) - hướng dẫn kết nối từ xa chi tiết

### Tải xuống công cụ

- [Tailscale](https://tailscale.com/download) - công cụ VPN peer-to-peer
- [Termux (F-Droid)](https://f-droid.org/en/packages/com.termux/) - trình mô phỏng terminal Android
- [Blink Shell](https://blink.sh/) - ứng dụng SSH iOS (hỗ trợ MOSH)
- [Termius](https://termius.com/) - ứng dụng SSH đa nền tảng
