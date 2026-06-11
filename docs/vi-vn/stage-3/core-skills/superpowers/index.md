# Siêu năng lực Claude Code cho Phát triển Cấp Kỹ nghệ

## Giới thiệu về Siêu năng lực

**Siêu năng lực** là một framework kỹ năng agent mã nguồn mở do Jesse Vincent (biệt danh trực tuyến: obra) tạo ra, được thiết kế đặc biệt để giải quyết một vấn đề cốt lõi trong lập trình AI: làm thế nào để AI tạo ra mã "cấp kỹ nghệ" thay vì mã "cấp đồ chơi".

Hãy tưởng tượng một trợ lý lập trình AI thông thường như một "thực tập sinh thông minh." Nó có thể viết mã chạy được nhưng có thể không có kiểm thử, không có tài liệu và không có kỷ luật thực hành tốt nhất. Siêu năng lực giống như chỉ định một "mentor kỹ sư cao cấp" cho thực tập sinh đó, buộc nó tuân theo quy trình phát triển phần mềm hoàn chỉnh.

### Tại sao Chúng ta Cần Siêu năng lực?

Trước Siêu năng lực, có một số vấn đề khi sử dụng Claude Code:

- **Hỗn loạn trong vibe coding**: AI bắt đầu lập trình trực tiếp mà không lập kế hoạch, gây làm lại thường xuyên
- **Thiếu kỷ luật TDD**: AI có xu hướng viết mã trước và thêm kiểm thử sau hoặc bỏ qua kiểm thử hoàn toàn
- **Lập trình với yêu cầu mơ hồ**: người dùng nói "xây tính năng đăng nhập," AI bắt đầu ngay lập tức và kết quả không như mong muốn
- **Chất lượng mã không ổn định**: không có cơ chế code-review nên chất lượng phụ thuộc vào "tâm trạng" của AI

Siêu năng lực giải quyết các vấn đề này và biến Claude thành một "đội phát triển có kỷ luật." Nó giúp làm rõ yêu cầu trước, sau đó tạo kế hoạch, phát triển bằng TDD và cuối cùng đảm bảo chất lượng thông qua code review.

---

## Bắt đầu Nhanh

### Bước 1: Cài đặt Siêu năng lực

Chạy trong Claude Code:

```bash
# Thêm marketplace
/plugin marketplace add obra/superpowers-marketplace

# Cài đặt superpowers
/plugin install superpowers@superpowers-marketplace
```

Hoặc clone thủ công:

```bash
git clone https://github.com/obra/superpowers.git ~/.claude/skills/superpowers
```

### Bước 2: Thử Kỹ năng Đầu tiên

Hãy sử dụng kỹ năng **brainstorming** của Siêu năng lực để trải nghiệm giá trị của nó.

Trong Claude Code, nhập:

```text
Build me a user login feature
```

**Trước Siêu năng lực**: Claude bắt đầu viết mã trực tiếp và có thể tạo ra thứ bạn không thực sự muốn.

**Với Siêu năng lực**: Claude sử dụng câu hỏi Socratic để giúp làm rõ yêu cầu:

> Tính năng đăng nhập này dành cho ứng dụng Web hay ứng dụng di động?
>
> Phương thức đăng nhập nào được yêu cầu? Email/mật khẩu? Đăng nhập bên thứ ba (Google, GitHub)?
>
> Bạn có cần tính năng "Ghi nhớ tôi" không?
>
> Đặt lại mật khẩu nên qua email hay SMS?
>
> ...

Những câu hỏi này buộc bạn làm rõ những gì bạn thực sự cần trước khi lập trình, ngăn nhiều mã không sử dụng.

### Bước 3: Hiểu Cơ chế Kích hoạt Kỹ năng

Siêu năng lực không phải là "công tắc ma thuật." Nó là một **bộ kỹ năng**. Hiểu cách kỹ năng được kích hoạt là quan trọng.

**Ba phương thức kích hoạt:**

1. **Kích hoạt bằng từ khóa**
   - Khi bạn đề cập "TDD," "test-driven development" hoặc "write tests first"
   - Kỹ năng `test-driven-development` được kích hoạt

2. **Kích hoạt theo kịch bản**
   - Khi yêu cầu không rõ ràng, `brainstorming` hỏi chủ động
   - Khi lỗi xuất hiện, `systematic-debugging` được kích hoạt

3. **Gọi thủ công**
   - Sử dụng tên kỹ năng trực tiếp, như: `/test-driven-development`

#### 💡 Làm rõ Quan trọng: Điều gì Xảy ra nếu Bạn Không Chỉ định TDD?

Đây là hiểu lầm phổ biến. Hãy làm rõ:

```text
# Trường hợp A: Không đề cập TDD
"Implement a calculator"
-> Claude có thể viết kiểm thử hoặc không
-> Phụ thuộc vào thói quen riêng của mô hình

# Trường hợp B: Yêu cầu TDD rõ ràng
"Implement a calculator with TDD"
-> Kỹ năng test-driven-development được kích hoạt
-> RED-GREEN-REFACTOR được thực thi
```

**Giá trị thực sự của Siêu năng lực**: không tạo khả năng từ hư không mà tăng cường kỷ luật.

- Không có kỹ năng TDD: Claude viết kiểm thử là "có thể có"
- Có kỹ năng TDD: Claude bị buộc tuân theo quy trình TDD

### Hiểu Giá trị của Siêu năng lực

Từ giải thích trên, giá trị cốt lõi của Siêu năng lực rõ ràng:

1. **Yêu cầu trước**: `brainstorming` hỏi chủ động khi yêu cầu mơ hồ
2. **Kỷ luật quy trình**: `test-driven-development` thực thi vòng lặp TDD red-green-refactor
3. **Phân giải nhiệm vụ**: `writing-plans` chia dự án lớn thành nhiệm vụ nhỏ
4. **Kiểm soát chất lượng**: Kỹ năng `code-review` đảm bảo chất lượng mã

---

## Chi tiết Các Kỹ năng Cốt lõi của Siêu năng lực

Siêu năng lực bao gồm **20+ kỹ năng có thể kết hợp** bao phủ toàn bộ vòng đời phần mềm. Hãy cùng xem theo danh mục.

### 🧪 Kỹ năng Kiểm thử

#### test-driven-development

**Cách kích hoạt**: đề cập từ khóa như "TDD," "test-driven development" hoặc "write tests first."

**Kỹ năng này làm gì**: buộc Claude tuân theo vòng lặp TDD red-green-refactor thay vì "có thể viết kiểm thử sau."

**Cách tiếp cận truyền thống** (vấn đề phổ biến):
1. Viết mã trực tiếp
2. Kiểm thử thủ công nhanh
3. Tìm lỗi và vá mã
4. Lặp lại... (kiểm thử? có thể lần sau)

**Cách tiếp cận TDD** (sau khi kích hoạt kỹ năng):
1. 🔴 **RED**: viết kiểm thử thất bại trước
2. 🟢 **GREEN**: viết mã tối thiểu để vượt qua kiểm thử
3. 🔵 **REFACTOR**: tái cấu trúc trong khi giữ kiểm thử vượt qua
4. Lặp lại

**Ví dụ sử dụng**:

```text
Implement a user authentication module using TDD
```

Claude sẽ:
1. Viết kiểm thử trước (xác thực username/password, tạo token, v.v.)
2. Chạy kiểm thử và xác nhận tất cả thất bại (RED)
3. Viết mã triển khai tối thiểu
4. Chạy kiểm thử và xác nhận vượt qua (GREEN)
5. Tái cấu trúc mã và trích xuất logic dùng chung
6. Chạy kiểm thử lại và xác nhận vượt qua (REFACTOR)

> **Lưu ý**: nếu bạn không đề cập "TDD," Claude có thể hoặc không viết kiểm thử. Vai trò của kỹ năng là **thực thi kỷ luật quy trình** để kiểm thử không bị "quên."

### 🐛 Kỹ năng Gỡ lỗi

#### systematic-debugging

Khi lỗi xuất hiện, nhà phát triển thường thử sửa ngẫu nhiên. Siêu năng lực thực thi phân tích nguyên nhân gốc bốn giai đoạn:

**Giai đoạn 1: Tái hiện vấn đề**
- Xác nhận lỗi có thể tái hiện nhất quán
- Ghi lại bước tái hiện chính xác

**Giai đoạn 2: Cô lập nguyên nhân gốc**
- Thu hẹp phạm vi sử dụng giảm kiểu tìm kiếm nhị phân
- Thêm nhật ký để định vị mã có vấn đề

**Giai đoạn 3: Xác nhận giả thuyết**
- Đề xuất giả thuyết nguyên nhân gốc
- Thiết kế thí nghiệm xác nhận

**Giai đoạn 4: Sửa và xác minh**
- Triển khai sửa chữa
- Xác nhận lỗi đã được giải quyết
- Thêm kiểm thử hồi quy

#### verification-before-completion

Kỹ năng này ngăn Claude dừng lại khi mọi thứ chỉ "có vẻ đủ gần." Trước khi tuyên bố hoàn thành, nó yêu cầu Claude:

1. Chạy tất cả kiểm thử
2. Kiểm thử thủ công các tính năng chính
3. Kiểm tra chất lượng mã (lint)
4. Xác nhận tài liệu đã cập nhật

### 🤝 Kỹ năng Cộng tác

#### brainstorming

Đây là một trong những kỹ năng Siêu năng lực thú vị nhất. Nó sử dụng câu hỏi Socratic để làm rõ yêu cầu.

**Cách hoạt động**: khi bạn cung cấp yêu cầu mơ hồ, Claude không bắt đầu lập trình trực tiếp. Nó hỏi:

```text
Bạn: Xây dựng hệ thống blog

Claude:
- Blog này dành cho ai? Độc giả kỹ thuật hay độc giả chung?
- Nên hỗ trợ chỉnh sửa Markdown không?
- Bạn cần bình luận không?
- Bạn cần tìm kiếm không?
- Một người dùng hay nhiều tác giả?
- ...
```

Những câu hỏi này buộc bạn suy nghĩ về chức năng nào thực sự cần thiết, tránh nhiều tính năng không sử dụng.

#### writing-plans

Kỹ năng này phân giải nhiệm vụ lớn thành nhiệm vụ nhỏ mỗi cái có thể hoàn thành trong 2-5 phút.

**Ví dụ**:

```text
Use writing-plans to plan development of a todo API
```

Claude sẽ tạo kế hoạch chi tiết:

```markdown
# Kế hoạch Triển khai

## Nhiệm vụ 1: Thiết kế schema cơ sở dữ liệu (ước tính 5 phút)
- Tạo bảng todos
- Xác định trường: id, title, completed, createdAt

## Nhiệm vụ 2: Tạo route Express (ước tính 10 phút)
- POST /todos - tạo nhiệm vụ
- GET /todos - liệt kê nhiệm vụ
- GET /todos/:id - lấy một nhiệm vụ
- PUT /todos/:id - cập nhật
- DELETE /todos/:id - xóa

## Nhiệm vụ 3: Thêm xác thực đầu vào (ước tính 10 phút)
- title không được để trống
- completed phải là boolean

## Nhiệm vụ 4: Viết kiểm thử (ước tính 15 phút)
- Viết kiểm thử cho mỗi endpoint
- Bao phủ trường hợp biên

## Nhiệm vụ 5: Khởi động server và xác minh (ước tính 5 phút)
- Chạy kiểm thử
- Kiểm thử API thủ công

Tiêu chí chấp nhận:
- Tất cả kiểm thử vượt qua
- Kiểm thử curl vượt qua cho mọi endpoint
```

#### executing-plans

Kỹ năng này thực thi kế hoạch theo lô và tạm dừng tại mỗi điểm kiểm tra để xác nhận.

**Ví dụ sử dụng**:

```text
Execute the plan above, and pause after each completed task
```

Claude sẽ:
1. Hoàn thành nhiệm vụ 1, sau đó tạm dừng: `✅ Database schema done. Continue?`
2. Sau khi bạn xác nhận, hoàn thành nhiệm vụ 2 và tạm dừng lại
3. Và cứ tiếp tục

Điều này cho phép bạn xác minh hướng ở mỗi giai đoạn, tránh phát hiện muộn rằng mọi thứ đã đi chệch hướng.

#### dispatching-parallel-agents

Kỹ năng này có thể khởi chạy nhiều sub-agent song song.

**Trường hợp sử dụng**: khi bạn cần xử lý nhiều nhiệm vụ độc lập cùng lúc.

```text
Use parallel agents to complete:
- Agent A: viết API backend
- Agent B: viết component frontend
- Agent C: viết kiểm thử
```

Mỗi agent làm việc trong môi trường cách ly riêng không can thiệp lẫn nhau.

#### subagent-driven-development

Kỹ năng này khởi chạy một sub-agent độc lập cho mỗi nhiệm vụ nhỏ.

**Ưu điểm**:
- Mỗi sub-agent có ngữ cảnh cách ly
- Thất bại của một nhiệm vụ không ảnh hưởng đến nhiệm vụ khác
- Nhiều nhiệm vụ có thể chạy song song

#### using-git-worktrees

Kỹ năng này sử dụng Git worktree để tạo môi trường phát triển cách ly.

**Lợi ích**:
- Nhiều tính năng có thể được phát triển song song
- Mỗi worktree độc lập
- Không xung đột lẫn nhau

### 👀 Kỹ năng Code Review

#### requesting-code-review

Sau khi mã hoàn thành, kỹ năng này tự động yêu cầu code review.

```text
Automatically trigger code review after finishing the feature
```

#### receiving-code-review

Kỹ năng này xác định cách nhận và xử lý phản hồi review.

**Quy trình review**:
1. Gửi mã
2. Kích hoạt review tự động
3. Người review kiểm tra chất lượng mã, bảo mật và độ bao phủ kiểm thử
4. Người review cung cấp gợi ý cải thiện
5. Sửa vấn đề
6. Review lại cho đến khi phê duyệt

---

## Quy trình Làm việc Đầy đủ của Siêu năng lực

Sức mạnh thực sự của Siêu năng lực đến từ việc kết hợp nhiều kỹ năng thành quy trình phát triển đầy đủ.

### Quy trình Làm việc Phát triển Tiêu chuẩn

```text
1. Brainstorming
   ↓ Làm rõ yêu cầu thực tế thông qua Hỏi-Đáp

2. Tài liệu Thiết kế
   ↓ Trình bày thiết kế theo từng phần và đợi xác nhận

3. Writing Plans
   ↓ Phân thành nhiệm vụ 2-5 phút

4. Subagent Development
   ↓ Khởi chạy sub-agent cách ly cho mỗi nhiệm vụ
   ↓ Review hai giai đoạn: tuân thủ quy cách + chất lượng mã

5. TDD
   ↓ Thực thi RED-GREEN-REFACTOR

6. Code Review
   ↓ Cổng chất lượng

7. Hoàn thành
```

### Ví dụ Thực tế: Xây dựng Hệ thống Xác thực Người dùng bằng Siêu năng lực

Hãy trải nghiệm quy trình làm việc Siêu năng lực qua một ví dụ hoàn chỉnh.

#### Bước 1: Làm rõ Yêu cầu bằng Brainstorming

```text
Tôi cần một hệ thống xác thực người dùng
```

Claude sẽ hỏi:
- Là ứng dụng Web hay ứng dụng di động?
- Phương thức đăng nhập nào được yêu cầu?
- Có cần đặt lại mật khẩu không?
- Có cần "Ghi nhớ tôi" không?
- ...

#### Bước 2: Tạo Tài liệu Thiết kế

Sau khi yêu cầu được xác nhận, Claude sẽ tạo tài liệu thiết kế:

```markdown
# Thiết kế Hệ thống Xác thực Người dùng

## Yêu cầu Chức năng
1. Đăng ký người dùng (email + mật khẩu)
2. Đăng nhập người dùng
3. Đặt lại mật khẩu (email)
4. Ghi nhớ tôi (JWT + Refresh Token)

## Lựa chọn Công nghệ
- Backend: Node.js + Express
- Cơ sở dữ liệu: SQLite
- Xác thực: JWT
- Mã hóa: bcrypt

## Thiết kế API
- POST /api/auth/register
- POST /api/auth/login
- POST /api/auth/refresh
- POST /api/auth/reset-password
```

#### Bước 3: Viết Kế hoạch Triển khai

```text
Use writing-plans to create the implementation plan
```

Claude sẽ tạo danh sách nhiệm vụ chi tiết, mỗi nhiệm vụ có thể hoàn thành trong 2-5 phút.

#### Bước 4: Thực thi Phát triển

```text
Execute the plan above with TDD
```

Claude sẽ:
1. Viết kiểm thử trước
2. Xác nhận kiểm thử thất bại (RED)
3. Viết mã triển khai
4. Xác nhận kiểm thử vượt qua (GREEN)
5. Tái cấu trúc mã (REFACTOR)

#### Bước 5: Code Review

Sau khi hoàn thành, code review được kích hoạt tự động để kiểm tra:
- chất lượng mã
- bảo mật (SQL injection, XSS, v.v.)
- độ bao phủ kiểm thử
- tính đầy đủ của tài liệu

---

## Siêu năng lực so với Sử dụng Claude Code Trực tiếp

| Chiều | Sử dụng Claude Code Trực tiếp | Sử dụng Siêu năng lực |
|------|---------------------|-----------------|
| **Làm rõ yêu cầu** | AI bắt đầu lập trình trực tiếp | Câu hỏi Socratic làm rõ yêu cầu trước |
| **Quy trình phát triển** | Tự do tùy thuộc AI | TDD red-green-refactor được thực thi |
| **Quản lý nhiệm vụ** | Hoàn thành một lần | Chia thành nhiệm vụ nhỏ với điểm kiểm tra |
| **Chất lượng mã** | Phụ thuộc đánh giá AI | Code review được thực thi |
| **Khả năng dự đoán** | Kết quả không ổn định | Quy trình có thể lặp lại |
| **Phù hợp nhất** | Nhiệm vụ đơn giản, xác minh nguyên mẫu | Dự án phức tạp, mã sản xuất |

### Ẩn dụ Trực quan

Nếu Claude Code là một "thực tập sinh thông minh":

- **Sử dụng trực tiếp**: nói thực tập sinh "xây tính năng đăng nhập" và họ bắt đầu lập trình ngay lập tức, có thể tạo ra thứ bạn thấy lệch mục tiêu
- **Với Siêu năng lực**: chỉ định cho thực tập sinh một mentor cao cấp làm rõ yêu cầu, tạo kế hoạch và kiểm tra chất lượng mã

---

## Cài đặt và Cấu hình Chi tiết

### Phương pháp 1: Qua Marketplace (Khuyến nghị)

```bash
# Thêm marketplace
/plugin marketplace add obra/superpowers-marketplace

# Cài đặt
/plugin install superpowers@superpowers-marketplace

# Xác minh cài đặt
/skills
```

### Phương pháp 2: Clone Thủ công

```bash
# Tạo thư mục
mkdir -p ~/.claude/skills

# Clone kho
git clone https://github.com/obra/superpowers.git ~/.claude/skills/superpowers
```

### Phương pháp 3: Cài đặt Cấp Dự án

Nếu bạn muốn sử dụng Siêu năng lực trong một dự án cụ thể:

```bash
# Trong thư mục gốc dự án
mkdir -p .claude/skills

# Clone hoặc sao chép superpowers
cp -r ~/.claude/skills/superpowers .claude/skills/
```

Điều này cho phép thành viên đội chia sẻ cùng cấu hình Siêu năng lực.

---

## Tham khảo Nhanh Kỹ năng Phổ biến

| Tên Kỹ năng | Chức năng | Trường hợp Sử dụng |
|---------|------|---------|
| `brainstorming` | Làm rõ yêu cầu qua câu hỏi Socratic | Khi yêu cầu không rõ ràng |
| `writing-plans` | Chia nhiệm vụ thành bước nhỏ | Trước khi bắt đầu dự án lớn |
| `executing-plans` | Thực thi kế hoạch với điểm kiểm tra | Trong phát triển hướng kế hoạch |
| `test-driven-development` | Vòng lặp TDD red-green-refactor | Cho tất cả phát triển tính năng |
| `systematic-debugging` | Phân tích nguyên nhân gốc bốn giai đoạn | Khi lỗi xuất hiện |
| `verification-before-completion` | Xác minh trước khi hoàn thành | Tại thời điểm hoàn thành nhiệm vụ |
| `requesting-code-review` | Yêu cầu code review | Trước khi gửi mã |
| `subagent-driven-development` | Phát triển hướng sub-agent | Nhiệm vụ song song |
| `using-git-worktrees` | Cách ly Git worktree | Phát triển tính năng song song |

---

## Thực hành Tốt nhất

### 1. Sử dụng Từ khóa Kích hoạt Rõ ràng

Kỹ năng Siêu năng lực được kích hoạt bằng từ khóa. Học các từ khóa kích hoạt phổ biến:

| Kỹ năng | Từ khóa Kích hoạt |
|------|-----------|
| `test-driven-development` | "TDD", "test-driven", "write tests first" |
| `brainstorming` | Tự động kích hoạt khi yêu cầu không rõ |
| `systematic-debugging` | "debug", "bug", "not working" |
| `writing-plans` | "make a plan", "planning" |

### 2. Sử dụng Siêu năng lực Khi Cần Kỷ luật Quy trình

- Phát triển mã cấp sản xuất -> đề cập "TDD"
- Yêu cầu không rõ -> để `brainstorming` làm rõ
- Dự án phức tạp -> sử dụng `writing-plans` để phân giải nhiệm vụ

### 3. Không Ép buộc cho Nhiệm vụ Đơn giản

Nếu là nguyên mẫu nhanh hoặc script dùng một lần, bạn không cần quy trình đầy đủ. Siêu năng lực phù hợp nhất cho mã yêu cầu bảo trì dài hạn.

### 4. Kỹ năng Có thể Kết hợp

```text
Implement user authentication with TDD, and after completion, help me do a code review
```

Điều này kích hoạt cả kỹ năng `test-driven-development` và `code-review`.

---

## Câu hỏi Thường gặp

### Hỏi 1: Tôi có phải chỉ định "TDD" khi sử dụng Siêu năng lực không?

**Không bắt buộc**.

Siêu năng lực là một bộ kỹ năng và mỗi kỹ năng có điều kiện kích hoạt riêng:
- Nói "use TDD" -> kích hoạt `test-driven-development`
- Không nói TDD -> Claude có thể hoặc không viết kiểm thử (phụ thuộc hành vi mô hình)

Siêu năng lực tồn tại để **thực thi kỷ luật quy trình**, không phải tạo khả năng từ hư không.

### Hỏi 2: Siêu năng lực làm phát triển chậm hơn?

Ban đầu, nó có thể cảm thấy chậm hơn vì:
- làm rõ yêu cầu tốn thời gian
- kiểm thử được viết trước khi có mã
- code review là bắt buộc

Nhưng về dài hạn, hiệu suất tổng thể cải thiện nhờ giảm làm lại và ít lỗi hơn.

### Hỏi 3: Dự án nhỏ cũng cần Siêu năng lực?

Đối với xác minh nguyên mẫu hoặc nhiệm vụ rất đơn giản, bạn có thể sử dụng Claude Code trực tiếp. Siêu năng lực phù hợp hơn cho:
- dự án cấp sản xuất
- cộng tác nhiều người
- khả năng bảo trì dài hạn

### Hỏi 4: Khác biệt giữa Siêu năng lực và Kỹ năng là gì?

| Chiều | Siêu năng lực | Kỹ năng |
|------|-------------|--------|
| **Bản chất** | Framework phương pháp luận phát triển hoàn chỉnh | Gói kỹ năng có thể tái sử dụng |
| **Phạm vi** | Bao phủ toàn bộ quy trình phát triển | Tập trung vào chức năng cụ thể |
| **Mối quan hệ** | Siêu năng lực sử dụng Kỹ năng nội bộ | Siêu năng lực là một tập hợp Kỹ năng |

### Hỏi 5: Tôi có thể tùy chỉnh kỹ năng Siêu năng lực không?

Có. Siêu năng lực là mã nguồn mở và bạn có thể:
1. Fork kho
2. Sửa đổi kỹ năng hiện có
3. Thêm kỹ năng mới
4. Đóng góp lại cho cộng đồng

---

## Tài liệu Tham khảo

### Tài nguyên Chính thức

- [obra/superpowers GitHub](https://github.com/obra/superpowers) - kho chính thức (50,000+ ⭐)
- [Hướng dẫn Sử dụng Siêu năng lực Chi tiết](https://www.cnblogs.com/gyc567/p/19510203) - hướng dẫn tiếng Trung chi tiết
- [Hướng dẫn Thiết lập Môi trường Siêu năng lực](https://m.blog.csdn.net/gitblog_00683/article/details/144768992) - hướng dẫn thiết lập

### Tài nguyên Cộng đồng

| Kho | Mô tả |
|------|------|
| [affaan-m/everything-claude-code](https://github.com/affaan-m/everything-claude-code) | bộ công cụ toàn diện bao gồm quy trình TDD |
| [shanraisshan/claude-code-best-practice](https://github.com/shanraisshan/claude-code-best-practice) | tài liệu thực hành cộng đồng |

### Bài viết Liên quan

- [Tạm biệt Vibe Coding! Sử dụng Siêu năng lực để Claude Code Viết Mã Cấp Kỹ nghệ](https://juejin.cn/post/7593573617648123956)
- [Cách Tôi Sử dụng MCP Siêu năng lực để Buộc Claude Code Lập Kế hoạch Trước khi Lập trình](https://juejin.cn/post/7570341520551673871)
- [Hướng dẫn Dành cho Người mới Bắt đầu Claude Code + Siêu năng lực](https://juejin.cn/post/7594832320030638123)

---

## Tóm tắt

Siêu năng lực là một bộ **kỹ năng phát triển cấp kỹ nghệ** nâng cấp Claude Code từ "thực tập sinh thông minh" thành "đội phát triển có kỷ luật."

### Điểm Chính

1. **Siêu năng lực là bộ kỹ năng, không phải phép thuật**
   - Sau khi cài đặt, kỹ năng có sẵn trong nền
   - Được kích hoạt qua từ khóa hoặc kịch bản
   - Bạn có thể gọi thủ công kỹ năng cụ thể

2. **Nhớ các cụm từ kích hoạt chính**
   - Muốn TDD -> nói "use TDD"
   - Yêu cầu mơ hồ -> `brainstorming` hỏi chủ động
   - Lỗi xuất hiện -> đề cập "debug" để kích hoạt `systematic-debugging`

3. **Kịch bản phù hợp nhất**
   - ✅ Phát triển mã cấp sản xuất
   - ✅ Dự án có thể bảo trì dài hạn
   - ✅ Dự án cộng tác nhóm
   - ❌ Nguyên mẫu nhanh (tùy chọn)
   - ❌ Script dùng một lần (tùy chọn)

Nhớ: **Siêu năng lực không làm AI thông minh hơn; nó làm AI có kỷ luật hơn.**
