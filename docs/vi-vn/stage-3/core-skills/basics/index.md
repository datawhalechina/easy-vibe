# Hướng dẫn Khởi nhanh Cốt lõi Claude Code

Claude Code là công cụ lập trình native AI chính thức của Anthropic. Nó tích hợp khả năng của mô hình ngôn ngữ lớn trực tiếp vào terminal, giúp bạn hoàn thành các tác vụ lập trình thông qua hợp tác với AI bằng ngôn ngữ tự nhiên. Khác với các công cụ tự động hoàn thành mã truyền thống, Claude Code có thể hiểu ngữ cảnh của toàn bộ dự án và thực thi các tác vụ phát triển phức tạp. Từ tạo mã đến tái cấu trúc, từ gỡ lỗi đến viết tài liệu, nó có thể xử lý tất cả.

Chương này giúp bạn nhanh chóng làm chủ cách sử dụng cốt lõi của Claude Code, bao gồm cài đặt và cấu hình, thao tác cơ bản, kỹ thuật thực tế và các lệnh thường dùng. Dù đây là lần đầu bạn sử dụng công cụ lập trình AI, hay bạn muốn sử dụng Claude Code hiệu quả hơn, bạn sẽ tìm thấy những gì cần ở đây.

---

## Cài đặt Nhanh

Claude Code được xây dựng trên Node.js, vì vậy trước khi cài đặt hãy đảm bảo Node.js 18 trở lên đã được cài đặt trên hệ thống của bạn. Quá trình này rất đơn giản và thường chỉ mất vài phút.

### Tại sao bạn cần Claude Code

Trong quy trình phát triển truyền thống, các lập trình viên thường xuyên chuyển đổi giữa trình soạn thảo, terminal, trình duyệt và tài liệu. Claude Code thống nhất các quy trình này thành một giao diện: trong cùng một cửa sổ terminal, bạn có thể viết mã, chạy thử nghiệm, đọc tài liệu và thậm chí hợp tác với đồng đội. Quan trọng hơn, nó có thể hiểu cấu trúc dự án của bạn và ghi nhớ thói quen lập trình, trở thành một trợ lý lập trình thực sự.

### Phuong phap 1: Cài đặt Thủ công

Cài đặt thủ công phù hợp với các lập trình viên thích kiểm soát hoàn toàn từng bước, và cũng giúp bạn hiểu rõ các thành phần của công cụ.

```bash
# Cài đặt Claude Code CLI toàn cầu
# Sử dụng -g để cài lệnh toàn cầu, có thể sử dụng trong bất kỳ thư mục nào
npm install -g @anthropic-ai/claude-code

# Xác minh cài đặt
# Nếu phiên bản được hiển thị (ví dụ 0.1.25), cài đặt thành công
claude --version
```

Trong quá trình cài đặt, npm tự động tải các phụ thuộc và cấu hình biến môi trường. Nếu bạn gặp vấn đề về quyền, thử `sudo` (macOS/Linux) hoặc chạy terminal với quyền quản trị viên (Windows).

### Phuong phap 2: Để AI Agent cài đặt cho bạn

Nếu bạn đã sử dụng các trợ lý lập trình AI khác (như Cursor, Windsurf, hoặc AI Agent trong dự án này), bạn có thể để chúng hoàn tất cài đặt cho bạn. Lợi ích là AI có thể tự động phát hiện môi trường của bạn, xử lý xung đột phụ thuộc và chọn tuyến cài đặt tốt nhất cho hệ thống của bạn.

**Bạn chỉ cần nói:**

```text
Giúp tôi cài đặt Anthropic Claude Code.
```

Hoặc cụ thể hơn:

```text
Cài đặt Claude Code CLI và kiểm tra xem phiên bản Node.js của tôi có tương thích không.
```

Một AI Agent sẽ:
1. Kiểm tra phiên bản Node.js hiện tại
2. Nhắc bạn nâng cấp nếu không đáp ứng yêu cầu
3. Chạy các lệnh cài đặt
4. Xác minh kết quả cài đặt
5. Thử sửa chữa tự động nếu có vấn đề

### Khởi chạy và Khởi tạo lần đầu

Sau khi cài đặt, vào thư mục dự án của bạn và khởi động Claude Code:

```bash
# Vào thư mục dự án (Claude Code hoạt động trong thư mục hiện tại)
cd /duong/dan/den/du/an/cua/ban

# Khởi động Claude Code
claude
```

Khi khởi chạy lần đầu, Claude Code hướng dẫn bạn qua một số bước cấu hình quan trọng:

1. **Đăng nhập tài khoản Anthropic**: bạn cần tài khoản Anthropic để sử dụng Claude Code. Nếu chưa có, bạn sẽ được nhắc đăng ký.
2. **Chọn gói**:
   - **Gói miễn phí**: phù hợp cho học tập cá nhân và sử dụng nhẹ, với giới hạn cuộc gọi
   - **Gói Pro**: phù hợp cho lập trình viên chuyên nghiệp, với hạn mức cao hơn và phản hồi ưu tiên
3. **Chấp nhận điều khoản**: đọc và chấp nhận điều khoản và chính sách bảo mật của Anthropic
4. **Tùy chọn: cấu hình khóa API**: nếu bạn có khóa tùy chỉnh (ví dụ từ nhà cung cấp bên thứ ba), cấu hình tại đây

::: info Lưu ý đặc biệt cho người dùng Trung Quốc đại lục

Do lý do mạng, người dùng ở Trung Quốc đại lục có thể không truy cập trực tiếp dịch vụ chính thức của Anthropic. Claude Code hỗ trợ các dịch vụ bên thứ ba tương thích với định dạng API Anthropic, và điều này khả thi về mặt kỹ thuật.

**Bạn có hai lựa chọn:**

1. **Sử dụng token API trực tiếp**: mua token từ nhà cung cấp tương thích với API Anthropic và cấu hình bằng biến môi trường
2. **Sử dụng gói Coding**: một số nhà cung cấp cung cấp các gói tối ưu cho lập trình thường tiết kiệm hơn cho các tình huống lập trình

**Cách tiếp cận được đề xuất**: để AI Agent giúp bạn cấu hình. Bạn chỉ cần cung cấp thông tin cấu hình của nhà cung cấp (API endpoint, khóa, v.v.), và AI có thể thiết lập biến môi trường chính xác.

**Xem hướng dẫn cấu hình chi tiết:** [Cách cài đặt claudecode và cấu hình biến môi trường](/vi-vn/stage-2/backend/modern-cli/)

:::

---

## Khởi nhanh: Chạy vài thử nghiệm nhỏ

Sau khi cài đặt, đừng vội vào các dự án chính thức. Chạy trước vài thử nghiệm nhỏ để hiểu cách Claude Code hoạt động. Ba thử nghiệm này được thiết kế từ dễ đến nâng cao, tương ứng với ba khả năng cốt lõi: hiểu ngôn ngữ tự nhiên, tạo nội dung và thực thi mã.

### Thử nghiệm 1: Hội thoại - Trải nghiệm khả năng hiểu của AI

Mục đích là trải nghiệm khả năng hiểu ngôn ngữ tự nhiên của Claude Code. Khác với các công cụ tìm kiếm thông thường, Claude Code có thể hiểu ngữ cảnh, duy trì hội thoại nhiều vòng và điều chỉnh câu trả lời dựa trên phản hồi của bạn.

**Thử các prompt sau:**

```text
Xin chào, bạn là ai?
```

Claude tự giới thiệu là Claude Code, một trợ lý lập trình AI của Anthropic.

```text
Closure là gì? Cho tôi phiên bản tóm tắt.
```

Quan sát cách Claude sử dụng "phiên bản tóm tắt" làm gợi ý và đưa ra giải thích ngắn gọn nhưng chính xác.

```text
Sự khác biệt giữa JavaScript và TypeScript là gì?
```

Đây là câu hỏi so sánh kỹ thuật. Kiểm tra xem Claude có cung cấp câu trả lời có cấu trúc và chuyên sâu không.

**Điểm thử nghiệm**: lưu ý phong cách phản hồi của Claude. Nó thường đưa ra kết luận cốt lõi trước, sau đó là chi tiết. Phong cách "kim tự tháp ngược" này rất tuyệt vời cho việc truy xuất thông tin nhanh.

### Thử nghiệm 2: Tạo tài liệu Markdown - Trải nghiệm tạo nội dung

Thử nghiệm này демонстрирует khả năng tạo nội dung của Claude Code. Đối với lập trình viên, viết tài liệu thường là điều đau đầu. Claude có thể nhanh chóng tạo tài liệu rõ ràng và hoàn chỉnh từ yêu cầu.

**Nhập lệnh sau:**

```text
Viết tài liệu Markdown về các lệnh Git thường dùng.
Yêu cầu: bao gồm lệnh, giải thích và ví dụ.
```

**Những gì Claude làm:**

1. Phân tích yêu cầu của bạn: lệnh Git thường dùng, định dạng Markdown và ba yếu tố (lệnh/giải thích/ví dụ)
2. Lập kế hoạch cấu trúc tài liệu: thường được nhóm theo tình huống sử dụng (khởi tạo, phát triển hàng ngày, quy trình nhánh, hợp tác từ xa, v.v.)
3. Tạo nội dung: giải thích ngắn gọn và ví dụ thực tế cho mỗi lệnh
4. Định dạng đầu ra: sử dụng cú pháp Markdown và cấu trúc phù hợp

**Mẫu đầu ra dự kiến**:

```markdown
# Bảng tham chiếu nhanh các lệnh Git thường dùng

## Khởi tạo Repository

| Lệnh | Giải thích | Ví dụ |
|------|------|------|
| `git init` | Khởi tạo repository mới | `git init du-an-cua-toi` |
| `git clone` | Sao chép repository từ xa | `git clone https://github.com/user/repo.git` |

...
```

**Thử nâng cao**: bạn có thể thêm yêu cầu bổ sung như "thêm chú thích tiếng Việt", "sắp xếp theo tần suất", "bao gồm xử lý lỗi thường gặp", v.v., và quan sát cách Claude điều chỉnh đầu ra.

### Thử nghiệm 3: Viết và chạy trò chơi - Quy trình lập trình End-to-End

Đây là thử nghiệm đầy thách thức nhất. Nó демонстрирует quy trình làm việc đầy đủ của Claude Code: hiểu yêu cầu, viết mã, tạo tệp, chạy chương trình và xử lý lỗi. Thông qua đó, bạn có thể thực sự cảm nhận sức mạnh của trợ lý lập trình AI.

**Nhập lệnh sau:**

```text
Viết trò chơi Snake bằng Python.
Yêu cầu:
1. Sử dụng pygame
2. Hiển thị điểm số
3. Nhấn ESC để thoát

Sau khi viết xong, giúp tôi chạy nó.
```

**Claude thực hiện các bước sau:**

**Bước 1: Kiểm tra môi trường**
- Kiểm tra xem Python đã được cài đặt chưa
- Kiểm tra xem pygame có sẵn không
- Nhắc cài đặt nếu thiếu

**Bước 2: Viết mã**
- Tạo tệp khởi động trò chơi (ví dụ `snake_game.py`)
- Triển khai di chuyển, tạo thức ăn, phát hiện va chạm
- Thêm hiển thị điểm số
- Triển khai thoát bằng ESC

**Bước 3: Chạy trò chơi**
- Thực thi script Python và khởi chạy trò chơi
- Cửa sổ trò chơi hiện ra, sử dụng phím mũi tên để điều khiển con rắn

**Bước 4: Hỗ trợ tiếp theo**
- Nếu có bug, bạn có thể nói trực tiếp "con rắn có thể đi xuyên tường, hãy sửa nó"
- Nếu muốn thêm tính năng, như "tăng độ khó theo điểm số", Claude có thể tiếp tục chỉnh sửa

**Giá trị của thử nghiệm này:**

1. **Xác minh cấu hình**: xác nhận Claude Code có thể thực thi mã chính xác
2. **Trải nghiệm tương tác**: cảm nhận phát triển hợp tác với AI
3. **Xây dựng tự tin**: thấy AI hoàn thành một chương trình có thể chạy từ đầu đến cuối

**Câu hỏi thường gặp:**

- **H: Nếu pygame chưa được cài đặt thì sao?**
  - Đ: Claude phát hiện và đề xuất `pip install pygame`, hoặc bạn có thể yêu cầu Claude cài đặt

- **H: Terminal bị chiếm sau khi trò chơi khởi động, phải làm gì?**
  - Đ: Nhấn ESC để thoát trò chơi, hoặc tiếp tục sử dụng Claude Code trong cửa sổ terminal khác

- **H: Tôi có thể đổi ngôn ngữ lập trình không?**
  - Đ: Hoàn toàn có thể. Thử "viết bằng JavaScript", "viết với HTML5 Canvas", v.v.

---

## Kỹ thuật Cốt lõi

Nắm vững các kỹ thuật này và hiệu quả Claude Code của bạn có thể cải thiện gấp nhiều lần. Chúng đến từ thực tiễn phát triển thực tế và bao phủ các tình huống tần suất cao.

### Ky thuat 1: Nhấn Esc hai lần để quay lại hội thoại - Hoàn tác thao tác sai

Đây là phím tắt phổ biến và quan trọng nhất trong Claude Code. Trong quá trình hợp tác, bạn có thể gõ sai, đưa ra lệnh sai hoặc không thích một câu trả lời. Nhấn Esc hai lần cho phép bạn "quay ngược thời gian" nhanh chóng.

**Chi tiết phím tắt:**

```text
Nhấn Esc một lần     -> xóa đầu vào hiện tại (tương tự Ctrl+C)
Nhấn Esc hai lần    -> quay lại trạng thái hội thoại trước (hoàn tác lượt trước)
Nhấn Esc ba lần -> xóa toàn bộ lịch sử hội thoại (bắt đầu lại)
```

**Trường hợp sử dụng:**

- **Trường hợp A**: bạn vô tình gửi lệnh sai và Claude bắt đầu thực thi. Nhấn nhanh Esc hai lần để quay lại trước khi thực thi.
- **Trường hợp B**: phản hồi của Claude không phải là điều bạn muốn, và bạn muốn diễn đạt lại. Nhấn Esc đúp để hoàn tác và hỏi lại.
- **Trường hợp C**: hội thoại có nhiều vòng và ngữ cảnh bị lộn xộn. Nhấn Esc ba lần để xóa và khởi động lại.

**Lưu ý quan trọng**: nhấn Esc đúp quay lại **trạng thái hội thoại**, không phải thay đổi mã. Nếu Claude đã chỉnh sửa tệp, các chỉnh sửa đó không được tự động hoàn nguyên. Bạn phải khôi phục thủ công qua Git.

**Đề xuất**: trước khi chỉnh sửa mã có thể lớn, lưu trạng thái hiện tại (`git commit` hoặc `git stash`) để dễ khôi phục.

### Ky thuat 2: Sử dụng @ để tham chiếu tệp - Kiểm soát ngữ cảnh chính xác

Mặc dù Claude Code có thể tự động đọc tệp dự án, tham chiếu tệp rõ ràng làm cho ý định rõ ràng hơn và tránh lãng phí tokens cho các tệp không liên quan.

**Cách sử dụng cơ bản:**

Thay vì mơ hồ như:

```text
Giải thích src/utils.ts
```

Sử dụng tham chiếu rõ ràng:

```text
@src/utils.ts Giải thích tệp này
```

**Cách sử dụng nâng cao:**

**So sánh nhiều tệp:**
```text
@src/app.tsx @src/components/Header.tsx Mối quan hệ giữa hai tệp này là gì?
```

**Tham chiếu thư mục:**
```text
@src/components/ Tóm tắt tất cả component trong thư mục này
```

**Tham chiếu dòng cụ thể (với editor):**
```text
@src/utils.ts:45-60 Giải thích đoạn mã này làm gì
```

**Mẹo sử dụng:**

1. **Tự động hoàn thành Tab**: gõ `@` rồi nhấn Tab, Claude hiển thị danh sách tệp trong thư mục hiện tại và bạn có thể chọn bằng phím mũi tên
2. **Đường dẫn tương đối**: hỗ trợ tham chiếu như `@./config.json` hoặc `@../shared/types.ts`
3. **Khớp mờ**: cho phép tên tệp một phần, ví dụ `@utils` có thể khớp với `src/utils.ts` hoặc `src/utils/index.ts`

### Ky thuat 3: Sử dụng ! để thực thi lệnh - Tích hợp Terminal

Claude Code có tính năng thực thi lệnh tích hợp. Bạn có thể chạy lệnh mà không cần chuyển sang terminal khác.

**Cách sử dụng cơ bản:**

```text
!npm test           # chạy thử nghiệm
!git status         # kiểm tra trạng thái Git
!ls -la             # liệt kê tệp
```

**Tình huống thực tế:**

**Tình huống: chạy thử nghiệm và phân tích thất bại**
```text
!npm test
# sau khi thất bại
Phân tích nguyên nhân thất bại thử nghiệm và sửa mã
```

**Tình huống: kiểm tra Git diff**
```text
!git diff
# yêu cầu Claude giải thích thay đổi
Tóm tắt các thay đổi chính trong diff này
```

**Tình huống: build dự án**
```text
!npm run build
# nếu build thất bại
Build thất bại, giúp tôi sửa
```

**Lưu ý bảo mật:**

Đối với các lệnh nhạy cảm (ví dụ `rm -rf`, `sudo`), Claude Code yêu cầu xác nhận. Đây là cơ chế bảo vệ. Xác nhận cẩn thận.

### Ky thuat 4: /plan trước khi lập trình - Cách đúng để xử lý tác vụ phức tạp

Đối với tác vụ phức tạp, lập trình trực tiếp thường kém hiệu quả. `/plan` vào chế độ lập kế hoạch: xác định kế hoạch triển khai trước, sau đó thực hiện từng bước.

**Cách sử dụng:**

```text
/plan
Tôi muốn thêm xác thực người dùng. Hãy tạo kế hoạch triển khai.
```

**Những gì Claude làm:**

1. **Phân tích yêu cầu**
2. **Đánh giá dự án hiện tại và stack công nghệ**
3. **Tạo kế hoạch từng bước**
4. **Thảo luận và điều chỉnh dựa trên phản hồi của bạn**

**Mẫu đầu ra:**

```text
📋 Kế hoạch Triển khai Xác thực Người dùng

Giai đoạn 1: Thiết kế cơ sở dữ liệu
- [ ] Tạo bảng users (id, email, password_hash, created_at)
- [ ] Tạo bảng sessions (id, user_id, expires_at)

Giai đoạn 2: API Backend
- [ ] POST /api/auth/register - đăng ký
- [ ] POST /api/auth/login - đăng nhập
- [ ] POST /api/auth/logout - đăng xuất
- [ ] GET /api/auth/me - lấy người dùng hiện tại

Giai đoạn 3: Tích hợp Frontend
- [ ] Tạo trang đăng nhập
- [ ] Tạo trang đăng ký
- [ ] Thêm route guards

Giai đoạn 4: Thử nghiệm
- [ ] Viết bài kiểm tra đơn vị
- [ ] Viết bài kiểm tra tích hợp

Bạn muốn bắt đầu với giai đoạn nào? Hay chúng ta nên điều chỉnh kế hoạch?
```

**Thực hành tốt nhất:**

- Đối với tác vụ kéo dài hơn 30 phút, sử dụng `/plan` trước
- Thực hiện từng giai đoạn và xác minh từng giai đoạn
- Nếu yêu cầu thay đổi, chạy lại `/plan` để điều chỉnh

### Ky thuat 5: /init tự động tạo cấu hình - Khởi tạo dự án nhanh chóng

`/init` là một trong những lệnh mạnh mẽ nhất của Claude Code. Nó tự động quét dự án của bạn, xác định stack công nghệ và cấu trúc, và tạo một `CLAUDE.md` hoàn chỉnh.

**Cách sử dụng:**

```text
/init
```

**Claude thực hiện:**

1. **Quét cấu trúc dự án**: xác định framework/ngôn ngữ/công cụ build
2. **Phân tích tệp cấu hình**: đọc package.json, tsconfig.json, v.v.
3. **Suy luận phong cách**: quy ước đặt tên và tổ chức tệp
4. **Tạo CLAUDE.md**

**Ví dụ CLAUDE.md được tạo:**

```text
# Dự án của tôi

## Stack Công nghệ
- Framework: Next.js 14 (App Router)
- Ngôn ngữ: TypeScript
- Styling: Tailwind CSS
- State: Zustand
- Cơ sở dữ liệu: Prisma + PostgreSQL

## Lệnh Thường Dùng

\`\`\`bash
npm run dev      # khởi động server dev
npm run build    # build production
npm run test     # chạy thử nghiệm
npx prisma migrate dev  # migrate DB
\`\`\`

## Quy ước Mã
- Sử dụng function components + Hooks
- Đặt tên tệp: PascalCase (components), camelCase (hàm tiện ích)
- Phong cách commit: Conventional Commits
```

**Tại sao điều này quan trọng:**

`CLAUDE.md` là "bộ nhớ dự án" của Claude Code. Mỗi lần khởi động, Claude đọc tệp này và hiểu bối cảnh dự án. Điều đó có nghĩa là:

- bạn không cần giải thích lặp lại framework và stack
- Claude tuân theo quy ước và thực hành tốt nhất của bạn
- thành viên mới trong đội có thể onboard nhanh hơn

**Đề xuất**: sau khi khởi tạo dự án, chạy `/init` ngay lập tức, sau đó tinh chỉnh cấu hình được tạo để phù hợp với thực tế.

### Ky thuat 6: /compact nén ngữ cảnh - Tiết kiệm tokens

Cửa sổ ngữ cảnh của Claude Code có giới hạn (thường khoảng 200K tokens). Các cuộc hội thoại dài tiêu tốn nhiều tokens, tăng chi phí và có thể đẩy thông tin quan trọng sớm ra khỏi ngữ cảnh.

**Cách sử dụng:**

```text
/compact
```

**Cách hoạt động:**

`/compact` phân tích lịch sử trò chuyện, trích xuất thông tin quan trọng (quyết định đã đưa ra, mã đã tạo, yêu cầu đã xác nhận) và tạo một bản tóm tắt ngắn gọn. Cuộc đối thoại sau đó dựa trên bản tóm tắt này thay vì lịch sử đầy đủ.

**Khi nào sử dụng:**

- sau 5-6 vòng
- khi Claude có vẻ "quên" ngữ cảnh trước đó
- khi chuyển sang tác vụ phụ mới nhưng vẫn giữ thông tin nền quan trọng

**Đề xuất:**

```text
# nén sau cuộc hội thoại dài
/compact

# tiếp tục làm việc
Bây giờ module người dùng đã xong, hãy xây dựng module đơn hàng.
```

### Ky thuat 7: Sử dụng Claude Code hỗ trợ Git Commits

Trong Claude Code, quy trình commit được đề xuất là: để Claude kiểm tra diff và soạn thông điệp commit, sau đó bạn chạy các lệnh Git tiêu chuẩn. Điều này rõ ràng và cho bạn thêm một điểm kiểm tra trước khi commit.

Tài liệu tham khảo chính thức:

- [Lệnh tích hợp](https://code.claude.com/docs/en/commands)
- [Khám phá plugins](https://code.claude.com/docs/en/discover-plugins)

**Quy trình làm việc được đề xuất:**

```bash
# 1. Kiểm tra thay đổi hiện tại
/diff
!git status

# 2. Yêu cầu Claude tóm tắt và tạo thông điệp commit
Dựa trên git diff hiện tại, tạo thông điệp Conventional Commits,
và giải thích bằng tiếng Việt tại sao danh mục này phù hợp.

# 3. Sau khi bạn xác nhận, chạy Git commit tiêu chuẩn
!git add -A
!git commit -m "feat(docs): cập nhật hướng dẫn quy trình làm việc Claude Code"
```

**Lợi ích của cách tiếp cận này:**

1. **Phù hợp với khả năng chính thức hiện tại**: không phụ thuộc vào các lệnh tích hợp đã bị loại bỏ
2. **Minh bạch**: xem lại diff và thông điệp commit trước khi gửi
3. **Có thể chuyển đổi**: cùng quy trình hoạt động trong IDE AI khác hoặc Git thuần

**Nếu bạn muốn trải nghiệm "commit bằng một lệnh":**

Claude Code hiện nay đề xuất mở rộng dựa trên plugin. Ví dụ, `commit-commands` cung cấp các lệnh như `/commit-commands:commit`.

```bash
# 1. Thêm ví dụ marketplace plugin
/plugin marketplace add anthropics/claude-code

# 2. Cài đặt plugin quy trình commit
/plugin install commit-commands@anthropics-claude-code

# 3. Tải lại plugins
/reload-plugins

# 4. Sử dụng lệnh plugin để commit
/commit-commands:commit
```

**Ghi chú bổ sung:**

- `/commit-commands:commit` được cung cấp bởi plugin, không phải lệnh tích hợp mặc định hiện tại
- nếu bạn chỉ cần kiểm tra thay đổi trước khi commit, ưu tiên `/diff` hoặc yêu cầu Claude giải thích `git diff`
- `/review` chính thức cũng đã được đánh dấu không còn dùng; cho khả năng tương tự, sử dụng plugin hoặc quy trình review bằng ngôn ngữ tự nhiên

### Ky thuat 8: Shift+Tab Tự động chấp nhận - Cải thiện độ trôi chảy

Theo mặc định, Claude yêu cầu xác nhận trước khi chỉnh sửa mã. Điều này hữu ích khi học, nhưng có thể cảm thấy chậm sau này. `Shift+Tab` kích hoạt chế độ tự động chấp nhận để lặp lại nhanh hơn.

**Cách sử dụng:**

- nhấn `Shift+Tab` -> vào chế độ tự động chấp nhận
- nhấn `Shift+Tab` lại -> thoát chế độ tự động chấp nhận

**So sánh chế độ:**

| Chế độ | Hành vi | Tình huống sử dụng |
|------|------|----------|
| Chế độ mặc định | Yêu cầu xác nhận cho mỗi chỉnh sửa | Giai đoạn học tập, mã quan trọng |
| Tự động chấp nhận | Áp dụng chỉnh sửa trực tiếp | Sau khi đã quen, lặp lại nhanh |

**Lưu ý:**

- Trong chế độ tự động chấp nhận, Claude chỉnh sửa tệp trực tiếp mà không xác nhận lần hai
- Khuyến nghị kết hợp với Git để dễ hoàn tác
- Đối với thao tác nhạy cảm (xóa tệp, sửa cấu hình quan trọng), Claude vẫn hỏi

### Ky thuat 9: Ctrl+C hủy thao tác - Phanh khẩn cấp

Khi Claude đang chạy tác vụ dài, hoặc bạn nhận ra đã đưa ra lệnh sai, `Ctrl+C` là phanh khẩn cấp.

**Cách sử dụng:**

- nhấn `Ctrl+C` một lần -> hủy thao tác đang chạy
- nhấn `Ctrl+C` hai lần -> thoát hoàn toàn Claude Code

**Trường hợp sử dụng:**

- lệnh chạy dài cần gián đoạn
- Claude đang tạo mã không liên quan lớn
- phát hiện lệnh sai và muốn dừng ngay lập tức

**Khác biệt với nhấn Esc đúp:**

- `Ctrl+C`: dừng **thao tác** đang tiến hành (lệnh đang chạy / tạo mã)
- `nhấn Esc đúp`: quay lại **trạng thái hội thoại** (hoàn tác lượt trước)

### Ky thuat 10: /context kiểm tra sử dụng ngữ cảnh - Tối ưu chi phí tokens

`/context` hiển thị sử dụng ngữ cảnh phiên hiện tại, giúp bạn hiểu mức tiêu thụ tokens và tối ưu chi phí.

**Cách sử dụng:**

```text
/context
```

**Mẫu đầu ra:**

```text
📊 Sử dụng Ngữ cảnh

Sử dụng tokens: 45,230 / 200,000 (22.6%)
Tham chiếu tệp: 12 tệp
Vòng hội thoại: 8

Tệp tiêu tốn nhiều tokens nhất:
1. src/api/users.ts (3,420 tokens)
2. node_modules/@types/react/index.d.ts (2,890 tokens)
3. src/components/Dashboard.tsx (1,560 tokens)

Đề xuất:
- Mức sử dụng hiện tại ổn định, không cần nén
- Để giảm sử dụng, thêm node_modules vào .claudeignore
```

**Cách sử dụng thông tin này:**

1. **Xác định tệp lớn**: nếu một tệp tiêu tốn nhiều tokens, kiểm tra xem có thực sự cần không
2. **Tối ưu .claudeignore**: bỏ qua tệp không liên quan (node_modules, đầu ra build, v.v.)
3. **Quyết định khi nào compact**: khi mức sử dụng vượt 70%, cân nhắc `/compact`

### Ky thuat 11: /resume khôi phục phiên - Chuyển đổi hội thoại đa tác vụ

Khi xử lý nhiều tác vụ, bạn có thể chạy nhiều luồng hội thoại. `/resume` cho phép bạn quay lại ngữ cảnh phiên trước trong cuộc trò chuyện hiện tại mà không cần khởi động lại.

**Cách sử dụng:**

```text
/resume
```

**Cách hoạt động:**

Claude Code tự động ghi lại các phiên trước. Khi bạn chạy `/resume`, nó chuyển sang ngữ cảnh phiên trước và giữ toàn bộ nội dung thảo luận và trạng thái trước đó.

**Trường hợp sử dụng:**

**Trường hợp A: đa tác vụ song song**
```text
# Tác vụ 1: sửa bug
claude> Sửa vấn đề xác thực trang đăng nhập
# ... một cuộc hội thoại ...

# Tác vụ 2: thêm tính năng (luồng mới)
claude> Thêm tính năng đăng ký người dùng
# ... một cuộc hội thoại khác ...

# Quay lại tác vụ 1
claude> /resume
# Tiếp tục công việc sửa bug trước đó
```

**Trường hợp B: tra cứu tạm thời rồi quay lại**
```text
claude> Giải thích thuật toán này
# ... thảo luận thuật toán ...

claude> /resume
# Quay lại công việc lập trình trước đó
```

**Trường hợp C: tiếp tục sau gián đoạn**
```text
claude> Tiếp tục công việc trước đó
# Nếu bạn bị gián đoạn trước đó, /resume đưa bạn quay lại
```

**So sánh với các lệnh liên quan:**

| Lệnh | Chức năng | Tình huống |
|------|------|----------|
| `/resume` | Quay lại phiên trước trong cuộc trò chuyện hiện tại | Chuyển đổi đa tác vụ |
| `claude -c` | Tiếp tục phiên gần nhất | Kết nối lại sau khi thoát |
| `claude -r` | Khôi phục phiên trước | Phục hồi trạng thái trước sau khi thoát |
| `nhấn Esc đúp` | Quay lại một lượt | Hoàn tác lượt hội thoại gần nhất |

**Gợi ý:**

1. **Quản lý đa tác vụ**: `/resume` hiệu quả hơn so với giải thích lại ngữ cảnh
2. **Bộ nhớ phiên**: mỗi phiên có ngữ cảnh độc lập; `/resume` bảo toàn nó
3. **Sử dụng với /compact**: trong các phiên dài, compact trước, sau đó chuyển đổi resume để giữ ngữ cảnh sạch

---

## Cấu hình Cốt lõi

Cấu hình hợp lý giúp Claude Code phù hợp hơn với dự án và đội ngũ của bạn. Phần này giải thích vai trò cấu hình, mức ưu tiên và tối ưu hóa cho các tình huống sử dụng khác nhau.

### Vị trí và Mức ưu tiên Tệp cấu hình

Claude Code sử dụng chiến lược cấu hình phân tầng. Các cấp khác nhau có phạm vi và mức ưu tiên khác nhau. Hiểu điều này cho phép bạn quản lý cài đặt linh hoạt.

**Mức ưu tiên cấu hình (từ cao đến thấp):**

| Vị trí | Phạm vi | Mục đích | Commit vào Git |
|------|--------|------|--------------|
| `.claude/settings.local.json` | dự án cục bộ | sở thích cá nhân | ❌ không |
| `.claude/settings.json` | dự án chia sẻ | cấu hình toàn đội | ✅ có |
| `~/.claude/settings.json` | toàn cầu | mặc định cá nhân | ❌ không |

**Quy tắc hợp nhất:**

- Cấu hình ưu tiên cao hơn ghi đè cùng khóa trong ưu tiên thấp hơn
- Các khóa không xung đột được hợp nhất
- Cấu hình dự án ghi đè cấu hình toàn cầu
- Cấu hình cá nhân cục bộ ghi đè cấu hình chia sẻ của dự án

**Tình huống thực tế:**

**Tình huống 1: dự án đội nhóm**
```text
~/.claude/settings.json          # cài đặt trình soạn thảo mặc định cá nhân
.claude/settings.json            # tiêu chuẩn lập trình và cấu hình quyền của đội
.claude/settings.local.json      # sở thích gỡ lỗi và cài đặt giao diện
```

**Tình huống 2: dự án cá nhân**
```text
~/.claude/settings.json          # cấu hình mặc định toàn cầu
.claude/settings.json            # cấu hình cụ thể dự án (ví dụ: quy tắc quyền đặc biệt)
```

### CLAUDE.md - Bộ nhớ Dự án

`CLAUDE.md` là tệp quan trọng nhất cho cấu hình Claude Code. Nó hoạt động như một "sổ tay" dự án. Mỗi khi Claude Code khởi động, nó đọc `CLAUDE.md` trong thư mục hiện tại, hiểu bối cảnh, stack công nghệ và quy ước.

**Tại sao CLAUDE.md lại quan trọng:**

Hãy tưởng tượng bạn tham gia một dự án mới: bạn cần học stack công nghệ, quy ước lập trình và lệnh thường dùng. Thông thường việc này mất hàng giờ đọc tài liệu/mã và hỏi đồng đội. Với `CLAUDE.md`, Claude biết điều này khi khởi động và bạn có thể hợp tác hiệu quả ngay lập tức.

**Template tối thiểu khả thi:**

```text
# [Tên Dự án]

## Stack Công nghệ
- Framework: React 18 + TypeScript
- State: Zustand
- Styling: Tailwind CSS
- Công cụ build: Vite

## Lệnh Thường Dùng

\`\`\`bash
npm run dev      # khởi động server phát triển (cổng 5173)
npm run test     # chạy bài kiểm tra đơn vị
npm run build    # build production
npm run lint     # kiểm tra lint
\`\`\`

## Quy ước Mã
- Components sử dụng function components + Hooks
- Đặt tên: PascalCase (components), camelCase (hàm tiện ích)
- Git commits sử dụng Conventional Commits
- Tất cả lệnh gọi API phải đi qua wrapper request thống nhất
```

**Template đầy đủ (được đề xuất):**

```text
# [Tên Dự án]

## Tổng quan Dự án
Một câu mô tả chức năng chính và người dùng mục tiêu.

## Stack Công nghệ
### Frontend
- Framework: React 18 + TypeScript
- Router: React Router v6
- State: Zustand + React Query
- Styling: Tailwind CSS + Headless UI
- Build: Vite

### Backend (nếu có)
- Runtime: Node.js + Express
- Cơ sở dữ liệu: PostgreSQL + Prisma
- Auth: JWT + bcrypt

## Cấu trúc Dự án

\`\`\`
src/
├── components/      # components tái sử dụng
├── pages/           # components trang
├── hooks/           # Hooks tùy chỉnh
├── lib/             # hàm tiện ích
├── types/           # kiểu TypeScript
└── api/             # lệnh gọi API
\`\`\`

## Lệnh Thường Dùng

\`\`\`bash
# phát triển
npm run dev              # khởi động server dev
npm run dev:mock         # sử dụng dữ liệu mock trong phát triển

# thử nghiệm
npm run test             # chạy tất cả bài kiểm tra
npm run test:watch       # chế độ theo dõi
npm run test:coverage    # tạo báo cáo phủ

# chất lượng mã
npm run lint             # kiểm tra ESLint
npm run lint:fix         # tự sửa vấn đề ESLint
npm run format           # định dạng Prettier
npm run typecheck        # kiểm tra kiểu TypeScript

# build
npm run build            # build production
npm run preview          # xem trước build production
\`\`\`

## Quy tắc Phát triển
### Phong cách mã
- Sử dụng function components, tránh class components
- Ưu tiên Hooks tùy chỉnh cho trừu tượng hóa logic
- Props của component phải định nghĩa interface TypeScript

### Quy trình Git
- Tiền tố nhánh: `feature/`, `fix/`, `refactor/`
- Thông điệp commit tuân theo Conventional Commits
- PR phải vượt qua CI và review mã

### Yêu cầu hiệu suất
- Lazy loading component để giảm thời gian tải trang đầu tiên
- Sử dụng hình ảnh WebP và bật lazy loading
- Giữ thời gian phản hồi API dưới 200ms

## Biến Môi trường

\`\`\`bash
# .env.local
VITE_API_BASE_URL=http://localhost:3000
VITE_APP_NAME=MyApp
\`\`\`

## Vấn đề Thường Gặp

### Server phát triển không khởi động được?

Kiểm tra xem cổng 5173 có bị chiếm không, hoặc thử `npm run dev -- --port 3000`

### Lỗi kiểu?

Chạy `npm run typecheck` để xem lỗi chi tiết
```

**Tạo CLAUDE.md nhanh chóng:**

Nếu dự án của bạn đã tồn tại nhưng chưa có `CLAUDE.md`, chạy `/init`:

```bash
claude
# trong Claude Code
/init
```

Claude phân tích cấu trúc dự án, package.json và mã hiện tại, sau đó tạo một `CLAUDE.md` thực tế. Sau khi tạo, xem lại và điều chỉnh thủ công.

### .claudeignore - Tiết kiệm tokens

`.claudeignore` cho Claude Code biết tệp nào không nên được đọc vào ngữ cảnh. Cấu hình đúng có thể giảm đáng kể mức sử dụng tokens (thường 40-60%) và cải thiện tốc độ phản hồi.

**Tại sao cần .claudeignore:**

Khi Claude Code cố gắng hiểu dự án, nó đọc các tệp liên quan. Một số tệp không giúp hiểu và có thể:
- tiêu tốn nhiều tokens (ví dụ tệp định nghĩa kiểu trong node_modules)
- gây nhiễu (logs, đầu ra build)
- chứa thông tin nhạy cảm (tệp .env)

**Cấu hình được đề xuất:**

```text
# ===== phụ thuộc =====
# mã bên thứ ba khổng lồ, thường không cần thiết cho ngữ cảnh Claude
node_modules/
.pnp/
.pnp.js

# ===== đầu ra build =====
# tạo phẩm được tạo ra, không phải logic nguồn
dist/
build/
.next/
out/
*.tsbuildinfo

# ===== logs =====
# logs runtime, không có giá trị để hiểu kiến trúc
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

# ===== đầu ra thử nghiệm =====
coverage/
.nyc_output/

# ===== editor / IDE =====
.vscode/*
!.vscode/extensions.json
.idea/
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?

# ===== tệp hệ thống =====
.DS_Store
Thumbs.db

# ===== tệp env =====
.env
.env.local
.env.*.local

# ===== tài sản nhị phân lớn =====
*.png
*.jpg
*.jpeg
*.gif
*.svg
*.ico
*.mp4
*.webm

# ===== tệp lock (tùy chọn) =====
# Nếu bạn không cần Claude phân tích phiên bản phụ thuộc, bỏ qua các tệp này
# package-lock.json
# yarn.lock
# pnpm-lock.yaml
```

**Mẹo cấu hình:**

1. **Bắt đầu tối thiểu**: bỏ qua node_modules và đầu ra build trước, sau đó quan sát mức sử dụng tokens
2. **Điều chỉnh theo dự án**: dự án nhiều hình ảnh -> bỏ qua định dạng hình ảnh; dự án tài liệu -> giữ Markdown
3. **Tối ưu thường xuyên**: sử dụng `/context` để xem tệp tiêu tốn nhiều tokens nhất và quyết định có bỏ qua không

### Cấu hình Quyền

Theo mặc định, Claude Code yêu cầu xác nhận trước các thao tác nhạy cảm. Thông qua `permissions` trong `settings.json`, bạn có thể kiểm soát hành động nào được tự động cho phép, yêu cầu xác nhận hoặc bị từ chối hoàn toàn.

**Cấu trúc cấu hình quyền:**

```json
{
  "permissions": {
    "allow": [
      // tự động cho phép mà không hỏi
    ],
    "ask": [
      // hỏi trước khi thực thi
    ],
    "deny": [
      // từ chối hoàn toàn
    ]
  }
}
```

**Cú pháp quy tắc:**

Quy tắc quyền sử dụng định dạng `ActionType(pattern)`:

| Loại hành động | Mô tả | Ví dụ |
|----------|------|------|
| `Bash` | chạy lệnh terminal | `Bash(git status)` |
| `Edit` | chỉnh sửa tệp | `Edit(src/**/*.ts)` |
| `Read` | đọc tệp | `Read(README.md)` |
| `Write` | tạo tệp | `Write(src/components/*.tsx)` |

**Hỗ trợ ký tự đại diện:**

- `*` khớp với ký tự tùy ý (không bao gồm `/`)
- `**` khớp với đường dẫn tùy ý
- `?` khớp với một ký tự

**Ví dụ cấu hình thực tế:**

```json
{
  "permissions": {
    "allow": [
      "Bash(git status)",
      "Bash(git log:*)",
      "Bash(git diff:*)",
      "Bash(npm test:*)",
      "Bash(npm run lint:*)",
      "Edit(src/**/*.{ts,tsx})",
      "Edit(tests/**/*.test.ts)",
      "Read(src/**/*.ts)",
      "Write(src/components/*.tsx)"
    ],
    "ask": [
      "Bash(git commit:*)",
      "Bash(git push:*)",
      "Bash(git pull:*)",
      "Bash(npm install:*)",
      "Bash(npm run build)",
      "Edit(package.json)",
      "Edit(tsconfig.json)",
      "Read(.env)",
      "Read(config/secrets.*)"
    ],
    "deny": [
      "Bash(rm -rf:*)",
      "Bash(sudo:*)",
      "Bash(curl * | sh)",
      "Bash(wget * | sh)",
      "Edit(.git/*)",
      "Write(/etc/*)",
      "Read(/etc/passwd)"
    ]
  }
}
```

**Gợi ý cấu hình:**

1. **Giai đoạn phát triển**: quyền tương đối lỏng để lặp lại nhanh hơn
2. **Giai đoạn production**: quyền nghiêm ngặt hơn, đặc biệt cho triển khai và thao tác dữ liệu nhạy cảm
3. **Hợp tác đội nhóm**: đặt quy tắc cơ sở trong `settings.json` chia sẻ, điều chỉnh cá nhân trong `settings.local.json`

### Thư mục Rules

Đối với dự án lớn, một `CLAUDE.md` đơn lẻ có thể trở nên cồng kềnh và khó bảo trì. Claude Code hỗ trợ quản lý module thông qua **Thư mục Rules**, chia quy ước theo chủ đề thành các tệp riêng biệt.

**Cấu trúc thư mục:**

```text
.claude/
├── settings.json          # tệp cấu hình chính
├── CLAUDE.md              # tổng quan dự án (vẫn cần thiết)
└── rules/                 # thư mục rules
    ├── 00-security.md     # quy tắc bảo mật (toàn cầu)
    ├── 01-coding-style.md # quy tắc phong cách mã (toàn cầu)
    ├── 10-api.md          # quy tắc phát triển API
    ├── 11-frontend.md     # quy tắc phát triển frontend
    ├── 12-backend.md      # quy tắc phát triển backend
    └── 20-testing.md      # quy tắc thử nghiệm
```

**Gợi ý đặt tên tệp:**

Sử dụng tiền tố số (`00-`, `01-`) để kiểm soát thứ tự tải: quy tắc cơ sở trước, quy tắc cụ thể sau.

**Định dạng tệp quy tắc:**

Các tệp quy tắc hỗ trợ frontmatter YAML để xác định khả năng áp dụng:

```markdown
---
# Tùy chọn: đường dẫn nơi quy tắc này áp dụng
globs:
  - "src/api/**/*.ts"
  - "src/services/**/*.ts"

# Tùy chọn: lệnh nơi quy tắc này áp dụng
commands:
  - "generate api"
  - "create endpoint"

# Tùy chọn: mức ưu tiên quy tắc (số nhỏ hơn = ưu tiên cao hơn)
priority: 10
---

# Quy tắc Phát triển API

## Thiết kế route
- Phong cách RESTful, sử dụng danh từ số nhiều
- Phiên bản: /api/v1/users
- Tài nguyên lồng nhau: /api/v1/users/123/orders

## Định dạng request/response
- Sử dụng JSON nhất quán
- Response lỗi phải bao gồm code và message
- Response phân trang sử dụng cấu trúc { data, pagination }

## Yêu cầu bảo mật
- Tất cả endpoints phải xác minh xác thực (trừ endpoints công khai)
- Thao tác nhạy cảm yêu cầu xác nhận thứ cấp
- Triển khai rate limiting để ngăn chặn lạm dụng
```

**Kế thừa và ghi đè quy tắc:**

- Quy tắc toàn cầu (không có frontmatter hoặc `globs: *`) áp dụng cho tất cả tệp
- Quy tắc cụ thể đường dẫn chỉ áp dụng cho tệp khớp
- Nếu quy tắc xung đột, quy tắc ưu tiên cao hơn chiến thắng
- Quy tắc cụ thể có thể ghi đè quy tắc toàn cầu

**Ví dụ tình huống sử dụng:**

**Tình huống 1: dự án tách frontend-backend**
```text
.claude/rules/
├── 00-general.md          # tiêu chuẩn chung (thông điệp commit, đặt tên)
├── 10-backend.md          # tiêu chuẩn backend (cụ thể NestJS)
├── 11-frontend.md         # tiêu chuẩn frontend (cụ thể React)
└── 20-database.md         # tiêu chuẩn cơ sở dữ liệu (cụ thể Prisma)
```

**Tình huống 2: kiến trúc microservice**
```text
.claude/rules/
├── 00-global/             # quy tắc toàn cầu
│   ├── security.md
│   └── logging.md
├── 10-services/           # quy tắc cụ thể theo dịch vụ
│   ├── user-service.md
│   ├── order-service.md
│   └── payment-service.md
└── 20-shared/             # quy tắc component chia sẻ
    ├── shared-lib.md
    └── common-utils.md
```

**Khuyến nghị di chuyển:**

Nếu bạn đã có một `CLAUDE.md` rất lớn, di chuyển sang Thư mục Rules như sau:

1. Tạo `.claude/rules/`
2. Chia `CLAUDE.md` theo chủ đề
3. Thêm frontmatter phù hợp cho mỗi tệp quy tắc
4. Giữ `CLAUDE.md` làm tổng quan dự án và chuyển các tiêu chuẩn chi tiết ra
5. Kiểm tra và đảm bảo tải quy tắc hoạt động chính xác

---

## Các Lệnh Thao tác Cốt lõi

Claude Code cung cấp một bộ lệnh thao tác phong phú để hợp tác AI hiệu quả. Các lệnh này được chia thành danh mục: lệnh Slash (tính năng tích hợp), hệ thống ký hiệu (thao tác ngắn) và lệnh ngôn ngữ tự nhiên (phát triển hàng ngày).

### Tham chiếu nhanh Lệnh Slash

Lệnh Slash là các thao tác tích hợp bắt đầu bằng `/`. Chúng cung cấp các hành động được chuẩn hóa như khởi tạo dự án, quản lý cấu hình và kiểm tra trạng thái.

| Lệnh | Chức năng | Tình huống sử dụng |
|------|------|----------|
| `/help` | Hiển thị tất cả lệnh | tra cứu nhanh khi quên lệnh |
| `/init` | Khởi tạo dự án và tạo CLAUDE.md | dự án mới hoặc thêm cấu hình |
| `/plan` | Vào chế độ lập kế hoạch | tạo kế hoạch trước tác vụ phức tạp |
| `/clear` | Xóa lịch sử hội thoại | khởi động lại khi ngữ cảnh lộn xộn |
| `/compact` | Nén ngữ cảnh | tiết kiệm tokens sau chat dài |
| `/diff` | Mở xem diff tương tác | kiểm tra thay đổi chưa commit hiện tại |
| `/plugin` | Quản lý plugins | cài đặt tiện ích commit/review |
| `/context` | Hiển thị sử dụng ngữ cảnh | tối ưu chi phí tokens |
| `/cost` | Hiển thị chi phí phiên | theo dõi chi phí sử dụng |
| `/config` | Mở bảng cấu hình | cập nhật cài đặt |
| `/permissions` | Quản lý quyền | điều chỉnh quyền thao tác |
| `/model` | Chuyển đổi mô hình | chọn mô hình khác |

**Ví dụ kết hợp lệnh:**

```bash
# quy trình phát triển hoàn chỉnh
/plan                    # 1. tạo kế hoạch
# ... thực hiện phát triển ...
/diff                    # 2. kiểm tra thay đổi
Tạo thông điệp commit từ diff hiện tại
!git add -A              # 3. stage thay đổi
!git commit -m "..."     # 4. commit
/cost                    # 5. kiểm tra chi phí
```

### Hệ thống Ký hiệu

Hệ thống ký hiệu là cơ chế thao tác viết tắt của Claude Code. Các ký hiệu đặc biệt kích hoạt nhanh các khả năng cụ thể.

| Ký hiệu | Tên | Mục đích | Ví dụ |
|------|------|------|------|
| `/` | Lệnh Slash | thực thi thao tác tích hợp | `/help`, `/plan` |
| `@` | Tham chiếu At | tham chiếu tệp/thư mục | `@src/app.tsx` |
| `!` | Chế độ Bang | chạy lệnh terminal | `!npm test` |
| `&` | Chạy nền | chạy tác vụ trong nền | `&npm run dev` |

**Mẹo kết hợp ký hiệu:**

```bash
# kết hợp ký hiệu
@src/utils.ts !npm test
# nghĩa: đọc utils.ts, sau đó chạy thử nghiệm

@src/components/ @src/pages/ so sánh cấu trúc của hai thư mục này
# nghĩa: tham chiếu hai thư mục đồng thời để so sánh

!git diff @src/app.tsx giải thích những thay đổi này
# nghĩa: kiểm tra Git diff và yêu cầu Claude giải thích thay đổi tệp cụ thể
```

### Thao tác Tệp

Thao tác tệp là các hành động hàng ngày phổ biến nhất: đọc, chỉnh sửa, tạo và xóa tệp.

**Đọc tệp:**

```bash
# đọc cơ bản
@src/app.tsx giải thích tệp này

# đọc + phân tích
@src/utils/helpers.ts tìm vấn đề hiệu suất tiềm ẩn

# đọc so sánh
@src/components/OldButton.tsx @src/components/NewButton.tsx so sánh sự khác biệt
```

**Chỉnh sửa tệp:**

```bash
# chỉnh sửa đơn giản
Sửa formatDate trong src/utils/date.ts để hỗ trợ định dạng locale tiếng Việt

# chỉnh sửa phức tạp
@src/api/users.ts Tái cấu trúc tệp này:
1. Trích xuất xử lý lỗi trùng lặp thành handleError chia sẻ
2. Thay thế chuỗi Promise bằng async/await
3. Thêm bình luận JSDoc

# chỉnh sửa hàng loạt
Chuyển đổi tất cả class components dưới src/components/ thành function components
```

**Tạo tệp:**

```bash
# tạo một tệp
Tạo src/components/UserCard.tsx, một component thẻ để hiển thị thông tin người dùng

# tạo tệp liên quan
Tạo module người dùng:
1. src/types/user.ts - định nghĩa interface User
2. src/api/users.ts - lệnh gọi API người dùng
3. src/components/UserCard.tsx - component thẻ người dùng
4. src/hooks/useUser.ts - hook để lấy dữ liệu người dùng
```

**Xóa tệp:**

```bash
# xóa với xác nhận
Xóa src/old-component.tsx (component này không còn sử dụng)

# Claude yêu cầu xác nhận và có thể đề xuất kiểm tra tham chiếu trước
```

### Thao tác Git

Claude Code tích hợp sâu với Git giúp bạn hoàn thành quy trình kiểm soát phiên bản đầy đủ mà không cần rời terminal.

**Kiểm tra trạng thái:**

```bash
# hiển thị trạng thái Git
Hiển thị git status và thay đổi chưa commit

# diff chi tiết
!git diff
Giải thích thay đổi trong src/api/users.ts
```

**Tạo commits:**

```bash
# kiểm tra thay đổi
/diff

# tạo thông điệp commit
Tạo thông điệp Conventional Commit từ git diff hiện tại

# commit thủ công
!git add -A
!git commit -m "..."
```

**Thao tác nhánh:**

```bash
# tạo nhánh feature
!git checkout -b feature/user-authentication

# sau khi triển khai
Tạo thông điệp commit dựa trên thay đổi hiện tại
!git add -A
!git commit -m "..."
!git push -u origin feature/user-authentication
```

**Ví dụ quy trình Git hoàn chỉnh:**

```bash
# 1. bắt đầu tính năng mới
!git checkout -b feature/payment-integration

# 2. phát triển tính năng (với hỗ trợ của Claude)
Tạo module thanh toán với Alipay và WeChat Pay

# 3. chạy thử nghiệm
!npm test

# 4. kiểm tra thay đổi
/diff

# 5. tạo và xác nhận thông điệp commit
Tạo thông điệp Conventional Commit từ git diff hiện tại
!git add -A
!git commit -m "..."

# 6. push lên remote
!git push -u origin feature/payment-integration

# 7. tạo PR (tùy chọn, với GitHub CLI)
!gh pr create --title "feat: thêm tích hợp thanh toán" --body "Hỗ trợ Alipay và WeChat Pay"
```

### Thao tác Mã

Thao tác mã là điểm mạnh cốt lõi của Claude Code: tạo, giải thích, tái cấu trúc và tối ưu hóa.

**Tạo mã:**

```bash
# tạo component
Tạo một React Hook để quản lý trạng thái xác thực, bao gồm đăng nhập/đăng xuất/kiểm tra quyền

# tạo hàm tiện ích
Tạo tiện ích định dạng ngày hỗ trợ thời gian tương đối (ví dụ "2 giờ trước")

# tạo module hoàn chỉnh
Tạo module đơn hàng với:
- trang danh sách đơn hàng
- trang chi tiết đơn hàng
- API tạo đơn hàng
- quản lý trạng thái đơn hàng
```

**Giải thích mã:**

```bash
# giải thích từng dòng
Giải thích src/algorithms/quicksort.ts từng dòng

# giải thích cấp cao
@src/services/payment.ts giải thích thiết kế kiến trúc của module này

# giải thích logic phức tạp
Giải thích reduce trong src/utils/dataTransformer.ts đang làm gì
```

**Tái cấu trúc mã:**

```bash
# tái cấu trúc kiến trúc
Chuyển đổi class components trong src/components/ thành function components

# tái cấu trúc hiệu suất
Tối ưu hiệu suất render trong src/App.tsx, giảm re-render không cần thiết

# tái cấu trúc dọn dẹp
@src/utils/helpers.ts Tái cấu trúc tệp này:
1. Xóa hàm không sử dụng
2. Trích xuất logic lặp lại thành tiện ích chia sẻ
3. Thêm định nghĩa kiểu
4. Cải thiện đặt tên hàm
```

**Gỡ lỗi mã:**

```bash
# phân tích lỗi
npm test thất bại, phân tích nguyên nhân gốc và sửa

# phân tích hiệu suất
@src/components/DataTable.tsx Component này render chậm, tìm điểm nghẽn

# phân tích log
!cat logs/error.log
Phân tích các log lỗi này và xác định nguyên nhân gốc
```

### Thao tác Thử nghiệm

Thử nghiệm là cần thiết cho đảm bảo chất lượng. Claude Code có thể giúp tạo thử nghiệm, chạy thử nghiệm và phân tích kết quả.

**Tạo thử nghiệm:**

```bash
# bài kiểm tra đơn vị
Tạo bài kiểm tra đơn vị cho src/utils/math.ts, bao gồm trường hợp biên

# bài kiểm tra component
Tạo bài kiểm tra React Testing Library cho src/components/UserForm.tsx

# bài kiểm tra tích hợp
Tạo bài kiểm tra tích hợp cho quy trình đăng ký người dùng từ gửi biểu mẫu đến ghi DB
```

**Chạy và gỡ lỗi thử nghiệm:**

```bash
# chạy thử nghiệm
!npm test

# gỡ lỗi thử nghiệm thất bại
Phân tích nguyên nhân thất bại và sửa
@tests/auth.test.ts

# kiểm tra phủ
!npm run test:coverage
Đường dẫn mã nào chưa được phủ?
```

**Gợi ý chiến lược thử nghiệm:**

```bash
Tôi đã thêm xác thực người dùng. Vui lòng:
1. Tạo bài kiểm tra đơn vị cho auth.service.ts
2. Tạo bài kiểm tra component cho LoginForm
3. Chạy tất cả bài kiểm tra và đảm bảo vượt qua
```

### Chuỗi lệnh và Kết hợp Quy trình làm việc

Cách hiệu quả nhất để sử dụng Claude Code là kết nối các lệnh thành quy trình làm việc hoàn chỉnh.

**Tình huống 1: quy trình sửa bug**

```bash
# 1. kiểm tra vấn đề
!npm test
Thử nghiệm thất bại, phân tích lý do

# 2. định vị vấn đề
@src/utils/validation.ts Vấn đề có trong tệp này không?

# 3. sửa vấn đề
Sửa isEmail trong validation.ts để xử lý đúng địa chỉ chứa +

# 4. xác minh sửa chữa
!npm test

# 5. commit sửa chữa
Tạo thông điệp commit kiểu fix từ diff hiện tại
!git add -A
!git commit -m "fix: ..."
```

**Tình huống 2: quy trình review mã**

```bash
# 1. kiểm tra thay đổi
!git diff --stat
Những tệp nào đã thay đổi?

# 2. review chi tiết
@src/components/ Xem xét các thay đổi component này

# 3. đề xuất cải thiện
Những cải thiện nào nên thực hiện dựa trên review này?

# 4. triển khai cải thiện
Tối ưu hiệu suất component UserList

# 5. review cuối cùng
/diff
Xem xét thay đổi hiện tại và chỉ ra rủi ro tiềm ẩn và cải thiện
```

**Tình huống 3: quy trình tính năng mới**

```bash
# 1. lập kế hoạch trước
/plan
Tôi muốn thêm tính năng giỏ hàng

# 2. tạo nhánh
!git checkout -b feature/shopping-cart

# 3. triển khai tính năng
Triển khai từng bước theo kế hoạch

# 4. thêm thử nghiệm
Tạo thử nghiệm cho module giỏ hàng

# 5. chạy thử nghiệm
!npm test

# 6. review mã
/diff
Vui lòng review mã của diff hiện tại

# 7. commit
Tạo thông điệp commit cho phát triển tính năng này
!git add -A
!git commit -m "feat: ..."
!git push
```

---

## Câu hỏi Thường Gặp

Trong quá trình sử dụng Claude Code, bạn có thể gặp nhiều vấn đề khác nhau. Phần này tóm tắt các vấn đề phổ biến và giải pháp.

### Sử dụng tokens quá nhanh?

Tiêu thụ tokens nhanh là một trong những vấn đề phổ biến nhất. Dưới đây là chiến lược tối ưu hóa hoàn chỉnh.

**Chẩn đoán:**

Trước tiên chạy `/context` để kiểm tra mức sử dụng tokens hiện tại:

```text
/context
```

Tập trung vào:
- **Tỷ lệ sử dụng tokens**: nếu vượt 70%, cân nhắc nén ngữ cảnh
- **Số tệp được tham chiếu**: nhiều tệp hơn nghĩa là tiêu thụ tokens cao hơn
- **Tệp lớn**: kiểm tra tệp nào tiêu tốn nhiều tokens nhất

**Chiến lược tối ưu:**

**1. Cải thiện .claudeignore**

Đảm bảo `.claudeignore` bao gồm các tệp không cần thiết:

```text
# phải bỏ qua
node_modules/
dist/
build/
*.log
.env

# cụ thể dự án
# React
.next/
out/

# Vue
.nuxt/
.output/

# tổng quát
.vscode/
.idea/
coverage/
*.min.js
*.bundle.js
```

**2. Nén ngữ cảnh thường xuyên**

Các cuộc hội thoại dài tích lũy nhiều tokens. Khuyến nghị chạy `/compact` mỗi 5-6 vòng:

```text
# sau cuộc hội thoại dài
/compact

# tiếp tục
Bây giờ hãy triển khai module đơn hàng...
```

**3. Tham chiếu tệp chính xác**

Tránh tham chiếu toàn bộ thư mục nếu không cần:

```bash
# không khuyến nghị
@src/ Giải thích mã này

# khuyến nghị
@src/utils/auth.ts @src/components/Login.tsx Giải thích luồng đăng nhập
```

**4. Tránh đọc tệp khổng lồ**

Nếu `/context` cho thấy một tệp tiêu tốn nhiều tokens, cân nhắc:
- bạn có thực sự cần nó không?
- bạn có thể chỉ tham chiếu một phần không?
- tệp này có thể chia thành các module nhỏ hơn không?

### Claude không hiểu dự án?

Nếu Claude trả lời không chính xác hoặc liên tục hỏi thông tin cơ bản về dự án, nó thiếu ngữ cảnh dự án.

**Giải pháp:**

**1. Tạo CLAUDE.md**

Chạy `/init` để tạo cấu hình dự án:

```bash
/init
```

Sau khi tạo, xác minh:
- mô tả dự án có chính xác không?
- stack công nghệ có đầy đủ không?
- lệnh thường dùng có chính xác không?
- quy ước lập trình có rõ ràng không?

**2. Chỉnh sửa CLAUDE.md thủ công**

Nếu cấu hình tự tạo không đủ chi tiết, thêm:

```markdown
## Thông tin Cụ thể Dự án

### Quyết định kiến trúc
- Tại sao chọn X thay vì Y?
- Các mẫu thiết kế cốt lõi là gì?

### Cạm bẫy thường gặp
- Khi sử dụng useEffect, chú ý...
- Truy vấn DB phải...

### Tích hợp bên thứ ba
- Thanh toán qua Stripe
- Email qua SendGrid
- Lưu trữ tệp qua AWS S3
```

**3. Sử dụng Thư mục Rules**

Đối với dự án lớn, tổ chức quy ước trong Rules:

```text
.claude/rules/
├── 00-architecture.md    # tổng quan kiến trúc
├── 01-coding-style.md    # phong cách mã
├── 10-frontend.md        # quy tắc frontend
├── 11-backend.md         # quy tắc backend
└── 20-testing.md         # quy tắc thử nghiệm
```

**4. Thêm ngữ cảnh trong prompt khi cần**

Đối với tác vụ cụ thể, thêm bối cảnh liên quan:

```text
Chúng tôi sử dụng Hook useAuth tùy chỉnh để xác thực.
Nó trả về { user, login, logout, isLoading }.
Vui lòng xây dựng component menu người dùng dựa trên Hook này.
```

### Làm thế nào để hoàn tác thao tác?

Claude Code cung cấp nhiều cơ chế hoàn tác cho các tình huống khác nhau.

**Tình huống 1: quay lại trạng thái hội thoại**

Nếu bạn chỉ gõ sai hoặc không thích phản hồi:

```text
Nhấn Esc đúp  -> quay lại lượt trước
Nhấn Esc ba lần  -> xóa toàn bộ lịch sử hội thoại
```

**Lưu ý**: điều này chỉ quay lại trạng thái hội thoại, không phải chỉnh sửa tệp.

**Tình huống 2: hoàn tác chỉnh sửa tệp**

Nếu Claude đã sửa đổi tệp, hoàn tác thủ công:

```bash
# kiểm tra thay đổi
!git status
!git diff

# hoàn tác một tệp
git checkout -- src/utils/helpers.ts

# hoàn tác tất cả thay đổi cây làm việc
git checkout -- .

# nếu đã commit
# hoàn tác mềm (giữ thay đổi)
git reset --soft HEAD~1

# hoàn tác cứng (loại bỏ thay đổi)
git reset --hard HEAD~1
```

**Tình huống 3: sử dụng phòng ngừa quy trình Git**

Thực hành tốt nhất: lưu công việc hiện tại trước phiên với Claude:

```bash
# lưu trạng thái hiện tại trước khi bắt đầu
git add .
git commit -m "WIP: trước phiên Claude Code"
# hoặc sử dụng stash
git stash push -m "trước claude"

# phát triển với Claude Code...

# nếu kết quả không hài lòng, hoàn tác đầy đủ
git reset --hard HEAD~1
# hoặc
git stash pop
```

### Quá nhiều yêu cầu quyền?

Xác nhận quyền thường xuyên ảnh hưởng đến hiệu suất. Cấu hình quyền phù hợp có thể làm quy trình làm việc trôi chảy hơn.

**Mô hình quyền:**

Quyền Claude Code có ba cấp:
- **allow**: tự động cho phép
- **ask**: hỏi trước khi thực thi
- **deny**: từ chối hoàn toàn

**Cấu hình tối ưu:**

Chỉnh sửa `.claude/settings.json`:

```json
{
  "permissions": {
    "allow": [
      // thao tác đọc Git
      "Bash(git status)",
      "Bash(git log:*)",
      "Bash(git diff:*)",
      "Bash(git branch)",

      // thử nghiệm và kiểm tra
      "Bash(npm test:*)",
      "Bash(npm run lint:*)",
      "Bash(npm run typecheck)",

      // server phát triển
      "Bash(npm run dev:*)",

      // chỉnh sửa nguồn
      "Edit(src/**/*.{ts,tsx})",
      "Edit(tests/**/*.test.ts)",
      "Write(src/**/*.ts)"
    ],
    "ask": [
      // thao tác ghi Git
      "Bash(git commit:*)",
      "Bash(git push:*)",
      "Bash(git pull:*)",

      // quản lý gói
      "Bash(npm install:*)",
      "Bash(npm uninstall:*)",

      // build và triển khai
      "Bash(npm run build)",
      "Bash(npm run deploy:*)",

      // chỉnh sửa tệp cấu hình
      "Edit(package.json)",
      "Edit(tsconfig.json)",

      // đọc tệp nhạy cảm
      "Read(.env)",
      "Read(config/secrets.*)"
    ],
    "deny": [
      // lệnh nguy hiểm
      "Bash(rm -rf:*)",
      "Bash(sudo:*)",
      "Bash(curl * | sh)",
      "Bash(wget * | sh)",

      // tệp hệ thống
      "Edit(/etc/*)",
      "Write(/usr/*)",

      // nội bộ Git
      "Edit(.git/*)"
    ]
  }
}
```

**Chiến lược quyền tiệm tiến:**

- **Giai đoạn học tập**: giữ mặc định và hiểu Claude cố gắng thực thi gì
- **Giai đoạn làm quen**: thêm các thao tác an toàn phổ biến (như git status, npm test) vào allow
- **Giai đoạn hiệu suất cao**: tạo quy tắc chi tiết dựa trên đặc điểm dự án

### Sử dụng ở Trung Quốc đại lục như thế nào?

Do hạn chế mạng, người dùng ở Trung Quốc có thể không truy cập trực tiếp dịch vụ chính thức của Anthropic. Dưới đây là một số lựa chọn.

**Lựa chọn 1: sử dụng dịch vụ proxy API**

Nhiều nhà cung cấp đám mây cung cấp dịch vụ proxy API tương thích với Anthropic:

```bash
# thiết lập biến môi trường
export ANTHROPIC_BASE_URL="https://api-proxy-cua-ban.com/v1"
export ANTHROPIC_API_KEY="api-key-cua-ban"

# khởi động Claude Code
claude
```

**Lựa chọn 2: sử dụng công cụ tương thích Claude Code bên thứ ba**

Một số nhà cung cấp nội địa cung cấp công cụ tương thích:

```bash
# cài đặt phiên bản tương thích
npm install -g @mot-nha-cung-cap/claude-code

# cấu hình khóa API
claude config set api.key api-key-cua-ban
claude config set api.baseUrl https://api.mot-nha-cung-cap.com
```

**Lựa chọn 3: sử dụng công cụ lập trình AI khác**

Nếu Claude Code không khả dụng, cân nhắc các lựa chọn thay thế:

| Công cụ | Đặc điểm | Tình huống sử dụng |
|------|------|----------|
| Cursor | Dựa trên VS Code, đầy đủ tính năng | trải nghiệm IDE đầy đủ |
| GitHub Copilot | tự động hoàn thành mạnh mẽ | chủ yếu hoàn thành mã |
| Tongyi Lingma | sản phẩm nội địa, ổn định ở Trung Quốc | môi trường phát triển nội địa |
| Codeium | hạn mức miễn phí hào phóng | ngân sách hạn chế |

**Lựa chọn 4: để AI Agent giúp cấu hình**

Nếu bạn không chắc cách cấu hình, hỏi AI Agent:

```text
Tôi muốn sử dụng Claude Code, nhưng không thể truy cập trực tiếp ở Trung Quốc đại lục.
Tôi đã mua API từ nhà cung cấp XXX.
API endpoint là https://api.xxx.com,
khóa là sk-xxx.

Vui lòng cấu hình biến môi trường để Claude Code hoạt động chính xác.
```

**Câu hỏi thường gặp:**

- **H: vẫn không thể kết nối sau khi cấu hình?**
  - Đ: kiểm tra tính chính xác của API endpoint, bao gồm đường dẫn `/v1`
  - Đ: kiểm tra tính hợp lệ của API key và số dư
  - Đ: kiểm tra xem mạng cục bộ có cần proxy không

- **H: phản hồi chậm?**
  - Đ: chọn nhà cung cấp có khu vực địa lý gần hơn
  - Đ: sử dụng gói tối ưu cho lập trình thay vì gói API chung
  - Đ: sử dụng `/compact` để giảm sử dụng tokens

- **H: một số tính năng không khả dụng?**
  - Đ: một số nhà cung cấp bên thứ ba có thể không hỗ trợ đầy đủ tất cả tính năng Claude Code
  - Đ: kiểm tra tài liệu nhà cung cấp về phạm vi tính năng được hỗ trợ

---

## Tài nguyên Tham khảo

- [Tài liệu Chính thức Claude Code](https://code.claude.com/docs)
- [GitHub Claude Code](https://github.com/anthropics/claude-code)
- [Everything Claude Code](https://github.com/affaan-m/everything-claude-code)
