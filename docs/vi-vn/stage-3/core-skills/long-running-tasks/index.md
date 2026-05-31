# Cách Khiến Claude Code Làm Việc Trong Thời Gian Dài

## Giới thiệu

Các trợ lý lập trình AI truyền thống hoạt động theo chế độ "hội thoại": bạn nói một câu, nó trả lời một lần, sau đó dừng lại. Nhưng đối với các tác vụ phát triển thực tế, chế độ này là远远 không đủ.

Hãy tưởng tượng các tình huống sau: bạn muốn Claude tái cấu trúc toàn bộ dự án, nhưng nó chỉ chỉnh sửa vài file rồi nói "xong"; bạn muốn Claude tiếp tục sửa lỗi cho đến khi tất cả test đều vượt qua, nhưng nó chỉ chạy một lần rồi dừng; bạn muốn Claude "làm việc qua đêm," nhưng sáng hôm sau bạn thấy nó đã dừng từ lâu.

Vào mùa hè năm 2025, một nhà phát triển Úc tên Geoffrey Huntley (người cũng là một người nuôi cừu) đã viết một bash script 5 dòng. Script rất đơn giản: liên tục khởi động lại Claude Code và cung cấp cho nó cùng một tác vụ. Ông đặt tên nó là "Ralph Wiggum," theo tên nhân vật phim Simpsons người luôn cố gắng và không bao giờ bỏ cuộc.

Script đơn giản này đã gây sốc Thung lũng Silicon. Chỉ trong hai tuần, các dự án liên quan đã nhận được hơn 7.000 sao GitHub. Mọi người sử dụng nó để tạo ra 6 dự án hoàn chỉnh qua đêm, hoàn thành công việc hợp đồng trị giá 50.000 USD với chi phí API chỉ 297 USD, và thậm chí sử dụng nó để xây dựng một ngôn ngữ lập trình hoàn chỉnh trong 3 tháng.

Câu hỏi cốt lõi mà chương này giải quyết là: cách khiến Claude Code làm việc liên tục như một nhà phát triển thực sự cho đến khi tác vụ thực sự hoàn thành.

---

## Nguyên Lý Cốt Lõi: Tại Sao AI "Dừng Quá Sớm"?

Trước khi thảo luận về các phương pháp cụ thể, trước tiên hãy hiểu nguyên nhân gốc rễ.

### Phán đoán hoàn thành của AI là không đáng tin cậy

LLM có một điểm yếu cơ bản: chúng không thể đánh giá đáng tin cậy liệu công việc có thực sự hoàn thành hay không.

Tiêu chí hoàn thành của con người là khách quan: tất cả test đều vượt qua, tính năng hoàn chỉnh và chất lượng mã đạt tiêu chuẩn. Nhưng AI chỉ có thể đánh giá bằng "cảm giác." Nó có thể dừng lại vì "trông có vẻ ổn," hoặc vì "đầu ra có vẻ đủ," hoặc vì nó không biết phải làm gì tiếp theo.

Đó là lý do tại sao chúng ta cần một hệ thống bên ngoài để xác định việc hoàn thành thực sự thay vì dựa vào cảm nhận nội tại của AI.

### Ý tưởng cốt lõi của giải pháp

Giải pháp cốt lõi là giữ AI hoạt động bên trong một "vòng lặp."

Mỗi khi nó cố gắng thoát, hệ thống bên ngoài kiểm tra ba câu hỏi: có thực sự hoàn thành chưa? có đáp ứng tiêu chí khách quan không? có thiếu gì không? Nếu không, đưa tác vụ vào lại và tiếp tục một vòng khác.

Ý tưởng này có thể được triển khai dưới nhiều hình thức, từ bash script đơn giản đến hệ thống điều phối phức tạp, nhưng bản chất là giống nhau.

---

## Phương Pháp 1: Vòng Lặp While True Bash (Phương Pháp Nguyên Thủy Nhất)

Đây là triển khai đơn giản và trực tiếp nhất. Về bản chất, viết một vòng lặp vô hạn khởi động lại Claude Code mỗi vòng và cung cấp cùng một mô tả tác vụ.

Triển khai đơn giản nhất chỉ có 5 dòng:

```bash
#!/bin/bash
while true; do
    cat PROMPT.md | claude
done
```

### Cách hoạt động

Luồng script rất đơn giản. Bước 1 đọc mô tả tác vụ từ `PROMPT.md`. Bước 2 khởi chạy Claude Code và truyền mô tả tác vụ vào. Bước 3 Claude hoạt động và xuất kết quả. Bước 4 Claude thoát sau khi hoàn thành. Bước 5 vòng lặp tự động khởi động lại và quay lại bước 1, tạo ra một chu kỳ vô hạn trừ khi bạn ngắt thủ công bằng `Ctrl+C`.

### Ưu và nhược điểm

Ưu điểm là cực kỳ đơn giản: bất kỳ ai cũng có thể hiểu, không cần cấu hình, sử dụng ngay lập tức và tốt cho thử nghiệm nhanh.

Nhưng nhược điểm rõ ràng: không thể đánh giá hoàn thành thực sự, có thể xoay mãi mãi, không có bảo vệ an toàn và có thể lãng phí lệnh gọi API.

### Ví dụ sử dụng thực tế

Đầu tiên, tạo file `PROMPT.md` để mô tả tác vụ của bạn. Ví dụ, tái cấu trúc module xác thực người dùng:

```markdown
# Tác vụ: Tái cấu trúc module xác thực người dùng

Yêu cầu:
1. Trích xuất toàn bộ logic xác thực thành lớp AuthService độc lập
2. Thêm unit test, độ phủ > 80%
3. Cập nhật tài liệu liên quan

Khi tất cả test đều vượt qua và tài liệu được cập nhật, xuất: task complete
```

Sau đó tạo và chạy script vòng lặp:

```bash
chmod +x loop.sh
./loop.sh
```

### Phiên bản cải tiến an toàn hơn

Để tránh vòng lặp vô hạn, thêm giới hạn lặp:

```bash
#!/bin/bash
MAX_ITERATIONS=50
iteration=0

while true; do
    iteration=$((iteration + 1))
    echo "=== Lần lặp $iteration/$MAX_ITERATIONS ==="

    cat PROMPT.md | claude

    if [ $iteration -ge $MAX_ITERATIONS ]; then
        echo "Đã đạt số lần lặp tối đa, dừng lại"
        break
    fi

    sleep 5  # độ trễ nhỏ để tránh giới hạn tốc độ API
done
```

Phiên bản cải tiến này thêm giới hạn số lần lặp tối đa, hiển thị tiến trình theo từng vòng và tự động dừng ở giới hạn. Nó cũng thêm độ trễ 5 giây mỗi vòng để tránh giới hạn tốc độ.

---

## Phương Pháp 2: Plugin Ralph Wiggum (Khuyến Nghị Chính Thức)

Ralph Wiggum là plugin chính thức của Anthropic được xây dựng đặc biệt cho các tác vụ chạy dài. Nó được đặt theo tên nhân vật phim Simpsons, đại diện cho tinh thần "tiếp tục cố gắng dù thất bại."

### Cơ chế cốt lõi: Stop Hook

Cốt lõi của Ralph là Stop Hook. Khi Claude muốn thoát, Stop Hook chặn tín hiệu thoát. Sau đó hệ thống kiểm tra: đầu ra có chứa đánh dấu hoàn thành cụ thể không? Nếu không tìm thấy đánh dấu, nó đưa lại prompt gốc và bắt đầu một lần lặp khác. Chỉ khi đánh dấu hoàn thành được phát hiện, Claude mới được phép thoát.

Điều này đảm bảo Claude không dừng lại chỉ vì "cảm thấy đủ gần." Nó phải hoàn thành các yêu cầu được đánh dấu rõ ràng.

### Cài đặt

Ralph Wiggum là plugin chính thức của Claude Code và có thể được cài đặt theo hai cách.

**Cách 1: cài đặt từ thị trường plugin chính thức (khuyến nghị)**

```bash
# chạy trong Claude Code
claude

# thêm thị trường plugin chính thức
/plugin marketplace add anthropics/claude-code

# cài đặt Ralph Wiggum
/plugin install ralph-wiggum@claude-code-plugins

# xác minh cài đặt
/plugin
```

**Cách 2: cài đặt trực tiếp từ GitHub**

```bash
# vào thư mục plugin
cd ~/.claude/plugins/

# clone kho plugin
git clone https://github.com/anthropics/ralph-wiggum-plugin.git
```

Sau khi cài đặt, bạn có thể sử dụng:

- `/ralph-wiggum:ralph-loop` - bắt đầu vòng lặp
- `/ralph-wiggum:cancel-ralph` - hủy vòng lặp
- `/ralph-wiggum:help` - hiển thị trợ giúp

### Sử dụng cơ bản

Sử dụng `/ralph-wiggum:ralph-loop`:

```bash
/ralph-wiggum:ralph-loop "Xây dựng một todo API với các thao tác CRUD, xác thực đầu vào và test.
             Xuất <promise>COMPLETE</promise> khi mọi thứ xong." \
  --max-iterations 50 \
  --completion-promise "COMPLETE"
```

### Giải thích tham số

Hai tham số quan trọng nhất là `--max-iterations` và `--completion-promise`.

`--max-iterations` đặt giới hạn an toàn cứng. Giá trị khuyến nghị thường là 20-100. Ngay cả khi chưa hoàn thành, Ralph dừng ở giới hạn này để ngăn chi tiêu API vô hạn.

`--completion-promise` chỉ định văn bản đánh dấu hoàn thành, phải rõ ràng và duy nhất. Ralph chỉ coi tác vụ là hoàn thành khi đầu ra của Claude chứa đánh dấu đó. Sử dụng các đánh dấu rõ ràng như `COMPLETE` hoặc `TASK_DONE` và tránh các từ mơ hồ.

### Thực hành tốt nhất cho Prompt

Viết prompt tốt là chìa khóa để Ralph thành công.

Prompt xấu thường không xác định tiêu chí hoàn thành. Ví dụ, "viết một todo API" có thể khiến AI xuất một khung sườn thô và dừng, không có test, không có xác minh và không có tài liệu.

Prompt tốt nên bao gồm yêu cầu theo giai đoạn và tiêu chí chấp nhận rõ ràng. Ví dụ:

Mô tả các tác vụ theo giai đoạn trước. Giai đoạn 1 là chức năng cốt lõi với tất cả endpoint CRUD: POST `/todos` tạo, GET `/todos` danh sách, GET `/todos/:id` lấy một mục, PUT `/todos/:id` cập nhật, DELETE `/todos/:id` xóa. Giai đoạn 2 là xác thực đầu vào: tiêu đề không thể để trống, trạng thái hoàn thành phải là boolean. Giai đoạn 3 là test: viết test cho mỗi endpoint, với độ phủ > 80%.

Sau đó xác định tiêu chí chấp nhận: tất cả test đều vượt qua, mã vượt qua linter, README bao gồm tài liệu API.

Cuối cùng xác định đánh dấu hoàn thành duy nhất: `<promise>TODO_API_COMPLETE</promise>`.

Bằng cách này Claude biết chính xác phải làm gì và khi nào hoàn thành thực sự đạt được.

### Các mẫu prompt khác

Dưới đây là các mẫu tác vụ phổ biến bạn có thể sử dụng trực tiếp hoặc điều chỉnh.

**Mẫu 1: di chuyển test (Jest -> Vitest)**

```text
/ralph-wiggum:ralph-loop "
Di chuyển tất cả test trong dự án này từ Jest sang Vitest:
- Giữ nguyên toàn bộ logic test
- Cập nhật các file cấu hình (vite.config.js, vitest.config.js)
- Thay thế các API đặc thưng của Jest (ví dụ, jest.mock -> vi.mock)
- Đảm bảo tất cả test đều vượt qua
- Xóa các phụ thuộc liên quan đến Jest

Tiêu chí chấp nhận:
- npm test vượt qua hoàn toàn
- không có phụ thuộc Jest trong package.json
- dự án build thành công

Xuất sau khi hoàn thành: <promise>VITEST_MIGRATION_COMPLETE</promise>
" --max-iterations 40 --completion-promise "VITEST_MIGRATION_COMPLETE"
```

**Mẫu 2: tối ưu hóa UI/UX (mobile-first)**

```text
/ralph-wiggum:ralph-loop "
Tinh chỉnh UI/UX của dự án này thành một ứng dụng học ngôn ngữ mobile-first tinh tế:
- thống nhất khoảng cách và không gian trắng (sử dụng đơn vị cơ sở 4px)
- thiết lập hệ thống phân cấp kiểu rõ ràng (tiêu đề/nội dung/văn bản phụ trợ)
- thống nhất kiểu dáng cho thẻ, danh sách và thành phần dùng chung
- thêm điều hướng dưới cùng (Trang chủ/Học/Quiz/Tiến độ/Cài đặt)
- đảm bảo chất lượng hiển thị trên điện thoại di động

Tiêu chí chấp nhận:
- npm run build thành công
- không có lỗi TypeScript
- các trang chính xem trước chính xác trên điện thoại di động

Xuất sau khi hoàn thành: <promise>UI_UX_COMPLETE</promise>
" --max-iterations 25 --completion-promise "UI_UX_COMPLETE"
```

**Mẫu 3: chú thích TypeScript hàng loạt**

```text
/ralph-wiggum:ralph-loop "
Thêm chú thích kiểu TypeScript cho tất cả hàm trong dự án:
- ưu tiên thư mục src/
- thêm kiểu cho tham số hàm và giá trị trả về
- tránh any, sử dụng kiểu cụ thể hoặc unknown
- thêm các định nghĩa kiểu cần thiết

Tiêu chí chấp nhận:
- npm run typecheck vượt qua
- không có bình luận @ts-ignore hoặc @ts-any
- mã chạy chính xác

Xuất sau khi hoàn thành: <promise>TYPES_ADDED</promise>
" --max-iterations 30 --completion-promise "TYPES_ADDED"
```

**Mẫu 4: phát triển tính năng theo hướng TDD**

```text
/ralph-wiggum:ralph-loop "
Triển khai chức năng thanh toán sử dụng TDD:
1. Viết test trước (checkout.test.ts)
2. Chạy test (sẽ thất bại)
3. Viết mã tối thiểu để vượt qua test
4. Tái cấu trúc và tối ưu hóa
5. Lặp lại cho đến khi tất cả test đều vượt qua

Yêu cầu tính năng:
- danh sách mặt hàng trong giỏ hàng
- tính phí vận chuyển
- áp dụng mã giảm giá
- xác thực biểu mẫu thanh toán

Tiêu chí chấp nhận:
- tất cả test vượt qua (npm test checkout.test.ts)
- độ phủ mã > 80%
- không có lỗi ESLint

Xuất sau khi hoàn thành: <promise>CHECKOUT_COMPLETE</promise>
" --max-iterations 25 --completion-promise "CHECKOUT_COMPLETE"
```

**Mẫu 5: thống nhất phong cách mã**

```text
/ralph-wiggum:ralph-loop "
Thống nhất phong cách mã trong toàn bộ dự án:
- định dạng tất cả file với Prettier
- thống nhất quy tắc đặt tên (biến camelCase, thành phần PascalCase)
- xóa các import và biến không sử dụng
- thống nhất kiểu dấu ngoặc kép (dấu nháy đơn)
- thống nhất kiểu dấu chấm phẩy (không dấu chấm phẩy)

Tiêu chí chấp nhận:
- npm run lint vượt qua
- phong cách mã nhất quán
- build thành công

Xuất sau khi hoàn thành: <promise>STYLE_UNIFIED</promise>
" --max-iterations 20 --completion-promise "STYLE_UNIFIED"
```

### Các trường hợp thực tế

Một trường hợp nổi tiếng xảy ra tại một hackathon Y Combinator, nơi một đội đã sử dụng Ralph Loop. Lúc 11 giờ tối, họ đặt một tác vụ: triển khai MVP cho 6 đặc tả sản phẩm theo trình tự và phát ra đánh dấu hoàn thành cụ thể cho mỗi cái. Họ đặt số lần lặp tối đa là 200 và đi ngủ.

Sáng hôm sau, họ có 6 dự án sẵn sàng demo và chi phí API chỉ là 297 USD. Đó chính là sức mạnh của Ralph: trong khi bạn ngủ, AI tiếp tục làm việc.

Một trường hợp khác đến từ Boris Cherny (trưởng nhóm Claude Code). Với Ralph cộng thêm Opus 4.5, ông đã giao 259 PR trong 30 ngày, bao gồm 497 commit, thêm 40.000 dòng và xóa 38.000 dòng. Đáng chú ý nhất, tất cả đều được Claude Code sản xuất mà không cần viết mã thủ công.

Một trường hợp điên rồ hơn là ngôn ngữ lập trình CURSED. Người tạo ra Ralph, Geoffrey Huntley, đã sử dụng Ralph Loop trong 3 tháng để tự xây dựng một ngôn ngữ lập trình hoàn chỉnh. Các từ khóa của nó sử dụng tiếng lóng Gen Z (như `slay`, `sus`, `based`) và quan trọng hơn là nó bao gồm triển khai trình biên dịch LLVM hoàn chỉnh, thư viện tiêu chuẩn và hỗ trợ trình soạn thảo một phần. Điều này chứng minh tiềm năng thực sự của Ralph Loop: nếu bạn cung cấp một mục tiêu rõ ràng, nó có thể tiếp tục làm việc trong nhiều tháng cho đến khi một dự án phức tạp thực sự hoàn thành.

### Các trường hợp thực tế khác

**Tái cấu trúc dự án tự động**

Một nhà phát triển đã sử dụng Ralph để tái cấu trúc một dự án cũ với mã lộn xộn, không có test và thiếu tài liệu. Các tác vụ được giao là:

1. Thêm test cho mã hiện có
2. Tái cấu trúc từng bước, đảm bảo test vượt qua sau mỗi thay đổi
3. Cập nhật tài liệu

Ralph đã chạy qua cả một cuối tuần. Đến thứ Hai, có 47 commit, cấu trúc mã sạch hơn, độ phủ test 75% và tài liệu API hoàn chỉnh. Chi phí khoảng 12 USD.

### Triết lý Ralph

Ralph phản ánh ba triết lý cốt lõi.

Đầu tiên là lặp lại thay vì hoàn hảo. Đừng kỳ vọng hoàn hảo trong một lần; sử dụng vòng lặp để cải thiện. Lần đầu có thể chỉ xây dựng khung sườn, lần hai sửa lỗi, lần ba tối ưu hóa, lần bốn thêm test; mỗi vòng đều tốt hơn.

Thứ hai là thất bại như dữ liệu. Mỗi lần test thất bại là một cơ hội để cải thiện; đừng sợ thất bại, hãy học từ nó.

Thứ ba là cố gắng kiên trì: tiếp tục cố gắng cho đến khi nó hoạt động. Đó chính là tinh thần của Ralph.

### Khi nào Ralph phù hợp hoặc không phù hợp

Biết nơi Ralph phù hợp giúp tiết kiệm cả thời gian và chi phí.

**Các tình huống phù hợp với Ralph**

Các tác vụ này có tiêu chí hoàn thành rõ ràng và tốt cho tự động hóa lặp lại:

| Tình huống | Lý do |
|------|------|
| Di chuyển test | Framework mục tiêu rõ ràng, xác thực bằng test vượt qua |
| Tái cấu trúc lớn | Có thể xác định quy tắc tái cấu trúc cụ thể |
| Di chuyển framework | Di chuyển thành công có thể xác minh bằng mã hoạt động |
| Chú thích kiểu hàng loạt | Xong khi typecheck vượt qua |
| Cải thiện độ phủ test | Phần trăm độ phủ là khách quan |
| Tạo tài liệu | Tài liệu API có thể được xác thực tự động |
| Thống nhất UI/UX | Có thể xác định quy tắc thiết kế cụ thể |
| Sửa lỗi có repro | Điều kiện vượt qua có thể test được |

**Các tình huống không phù hợp với Ralph**

Các tác vụ này đòi hỏi phán đoán hoặc khám phá của con người:

| Tình huống | Lý do |
|------|------|
| Quyết định kiến trúc | ví dụ, microservices vs monolith đòi hỏi phán đoán đánh đổi |
| Mã nhạy cảm bảo mật | Lỗ hổng có thể tinh tế và khó phát hiện tự động |
| Yêu cầu mơ hồ | Không có tiêu chí hoàn thành rõ ràng |
| Công việc khám phá | Hướng thay đổi liên tục |
| Thiết kế sáng tạo | Đòi hỏi phán đoán thẩm mỹ của con người |
| Tác vụ đơn giản một lần | Sử dụng Ralph là quá mức cần thiết |

**Danh sách kiểm tra quyết định**

Hãy tự hỏi ba câu hỏi:
1. **Tôi có thể xác định tiêu chí hoàn thành rõ ràng không?** Nếu không, không phù hợp
2. **Có phương pháp xác minh khách quan không?** (test/build/typecheck) Nếu không, không phù hợp
3. **Tác vụ này có cần phản hồi liên tục từ con người không?** Nếu có, không phù hợp

Nếu cả ba câu trả lời là "không," hãy để Ralph chạy.

---

## Phương Pháp 3: Ralph Cải Tiến

Đây là triển khai được cộng đồng cải tiến từ Ralph chính thức. Dự án [frankbria/ralph-claude-code](https://github.com/frankbria/ralph-claude-code) thêm các cơ chế an toàn mạnh mẽ hơn.

### Các tính năng bổ sung

Ralph cải tiến thêm một số tính năng an toàn bổ sung.

Đầu tiên là điều kiện thoát kép. Ralph chính thức chỉ kiểm tra đánh dấu hoàn thành, nhưng phiên bản cải tiến yêu cầu cả đánh dấu hoàn thành và `EXIT_SIGNAL` rõ ràng trước khi dừng. Điều này có nghĩa là ngay cả khi Claude xuất đánh dấu hoàn thành, vòng lặp có thể tiếp tục để xác minh thêm trừ khi tín hiệu thoát rõ ràng xuất hiện.

Thứ hai là giới hạn tốc độ. Mặc định là 100 lần chạy/giờ, ngăn hóa đơn API tăng vọt nếu lỗi gây ra vòng lặp vô hạn. Bạn có thể điều chỉnh giới hạn này.

Thứ ba là bộ ngắt mạch thông minh. Nếu hệ thống phát hiện đánh dấu hoàn thành 5 lần liên tiếp, nó buộc dừng. Điều này ngăn các trường hợp cạnh hiếm khi vòng lặp không thể kết thúc chính xác.

Thứ tư là bảng điều khiển thời gian thực. Ralph cải tiến cung cấp bảng điều khiển dòng lệnh hiển thị số lần lặp hiện tại, tiến trình tác vụ và chi phí ước tính.

### Cài đặt

Cài đặt Ralph cải tiến bằng cách clone từ GitHub:

```bash
git clone https://github.com/frankbria/ralph-claude-code.git
cd ralph-claude-code
./install.sh
```

Script cài đặt tự động thiết lập các file và cấu hình cần thiết.

### Sử dụng

Sử dụng Ralph cải tiến có hai bước. Đầu tiên khởi tạo dự án với `ralph-setup`:

```bash
ralph-setup my-project
```

Điều này tạo các file cấu hình cần thiết trong dự án. Sau đó bắt đầu vòng lặp với `ralph loop`:

```bash
ralph loop
```

### File cấu hình

Ralph cải tiến sử dụng `.claude/ralph-config.json`:

```json
{
  "maxIterations": 50,
  "rateLimitPerHour": 100,
  "completionPromise": "TASK_COMPLETE",
  "exitSignal": "EXIT_NOW",
  "costAlertThresholds": [10, 50, 100]
}
```

`maxIterations` là số lần lặp tối đa. `rateLimitPerHour` là giới hạn tốc độ theo giờ. `completionPromise` là văn bản đánh dấu hoàn thành. `exitSignal` là tín hiệu thoát rõ ràng. `costAlertThresholds` xác định các mức cảnh báo ngân sách.

---

## Phương Pháp 4: Agent Teams (Đa Agent Song Song)

Khi tác vụ đủ lớn, một Claude là không đủ; bạn cần "hợp tác nhóm."

Agent Teams là một khả năng nâng cao cho phép nhiều phiên bản Claude chạy song song và phối hợp thông qua danh sách tác vụ và phụ thuộc dùng chung. Điều này phù hợp cho các dự án rất lớn. Trong thử nghiệm của Nicholas Carlini, 16 agent song song đã sản xuất hơn 100.000 dòng mã trong hai tuần và xây dựng một trình biên dịch C có khả năng biên dịch Linux kernel.

Agent Teams phức tạp hơn và chúng ta sẽ đề cập chi tiết trong phần tiếp theo: "3.3 Agent Teams Hợp Tác Đa Agent."

---

## Phương Pháp 5: Tác Vụ Nền (Ctrl+B)

Đây là một phương pháp thực thi không chặn đơn giản và thực tế.

### Thao tác cơ bản

Sử dụng rất đơn giản. Khi Claude bắt đầu một tác vụ, nhấn `Ctrl+B` để đẩy nó vào nền.

Ví dụ, bạn nói: "Chạy toàn bộ bộ test." Claude bắt đầu chạy. Bạn nhấn `Ctrl+B` và Claude trả lời: "Tác vụ đã được đẩy vào nền (ID: task_abc123)." Sau đó bạn có thể tiếp tục: "Trong khi đó, hãy phân tích file log này." Claude có thể phân tích log trong khi test tiếp tục chạy trong nền.

### Xem tác vụ nền

Có một số cách để kiểm tra tác vụ nền. Sử dụng `/tasks` để liệt kê tất cả tác vụ với ID tác vụ, trạng thái và thời gian bắt đầu. Nhấn `Ctrl+T` để xem tóm tắt trạng thái nhanh. Bạn cũng có thể đưa tác vụ trở lại tiền cảnh để kiểm tra đầu ra trực tiếp.

### Các tình huống phù hợp

Tác vụ nền phù hợp cho các tình huống điển hình:

Thứ nhất, test chạy lâu. Bộ test đầy đủ có thể mất hàng chục phút và chế độ nền tránh chặn.

Thứ hai, build dự án lớn. Quy trình build có thể chạy trong khi bạn tiếp tục công việc khác.

Thứ ba, thao tác file hàng loạt như đổi tên hàng loạt và định dạng.

Thứ tư, bất cứ điều gì bạn không muốn chờ đồng bộ.

---

## Cơ Chế An Toàn: Ngăn Chặn Vòng Lặp Vô Hạn

Bất kỳ hệ thống vòng lặp tự động nào cũng phải bao gồm bảo vệ, nếu không nó có thể chạy mất kiểm soát.

### Giới hạn cứng

Bảo vệ cơ bản nhất là đặt `--max-iterations` (số lần lặp tối đa). Điều này là bắt buộc. Bất kể trạng thái hoàn thành, tác vụ dừng ở giới hạn này và ngăn chi tiêu API không giới hạn.

Bạn cũng có thể áp dụng giới hạn thời gian, ví dụ tự động dừng sau 4 giờ. Bạn cũng có thể đặt cảnh báo ngân sách tạm dừng và thông báo tại các ngưỡng chi tiêu (ví dụ 10 USD, 50 USD, 100 USD).

### Phát hiện thông minh

Bạn có thể thêm phát hiện vòng lặp chết thông minh. Ví dụ, kiểm tra xem các commit gần đây có bao gồm thay đổi có ý nghĩa:

```bash
if [ $(git diff HEAD~5 | wc -l) -eq 0 ]; then
    echo "Không có thay đổi thực chất trong 5 commit gần nhất, có thể bị vòng lặp"
    exit 1
fi
```

Nếu diff gần đây tối thiểu, hệ thống có thể bị kẹt và nên dừng với cảnh báo.

### Cảnh báo chi phí

Đặt ngưỡng cảnh báo chi phí trong cấu hình:

```json
{
  "costAlertThresholds": [10, 50, 100],
  "alertAction": "pause_and_notify"
}
```

Khi chi tiêu đạt 10, 50 hoặc 100 USD, hệ thống tạm dừng và thông báo để bạn quyết định có tiếp tục hay không.

### Điểm kiểm tra thủ công

Đối với các tác vụ quan trọng, thêm điểm kiểm tra thủ công:

```bash
if [ $((iteration % 10)) -eq 0 ]; then
    read -p "Đã hoàn thành $iteration lần lặp. Tiếp tục? (y/n)" answer
    if [ "$answer" != "y" ]; then
        break
    fi
fi
```

Điều này tạm dừng mỗi 10 lần lặp để xác nhận, cho phép can thiệp con người kịp thời.

---

## Thực Hành: Xây Dựng Diễn Đàn BBS Hoàn Chỉnh với Ralph Loop

Hãy sử dụng một ví dụ đầy đủ để thể hiện sức mạnh của Ralph Loop. Chúng ta sẽ xây dựng một hệ thống diễn đàn kiểu BBS từ đầu, bao gồm xác thực người dùng, đăng bài, trang cá nhân và quản trị viên.

### Mục tiêu dự án

Xây dựng một hệ thống diễn đàn BBS hoàn chỉnh với:

**Tính năng phía người dùng:**
- đăng ký, đăng nhập, đăng xuất người dùng
- duyệt danh sách bài đăng (phân trang)
- xem chi tiết bài đăng
- xuất bản bài viết mới
- tính năng bình luận
- trang cá nhân (xem bài viết của mình, cập nhật hồ sơ)

**Tính năng quản trị viên:**
- đăng nhập quản trị viên
- quản lý người dùng (cấm/bỏ cấm)
- quản lý bài đăng (xóa/ghim)
- quản lý bình luận
- thống kê hệ thống

**Công nghệ:**
- backend: Node.js + Express + SQLite
- frontend: React + React Router + Axios
- xác thực: JWT token
- kiểu dáng: Tailwind CSS

### Chuẩn bị

Đầu tiên cài đặt plugin Ralph Wiggum:

```bash
claude /plugins:add ralph-wiggum
```

### Khởi động Ralph Loop

Bây giờ khởi chạy Ralph Loop để xây dựng toàn bộ dự án:

```bash
/ralph-wiggum:ralph-loop "
Vui lòng xây dựng một hệ thống diễn đàn BBS hoàn chỉnh từ đầu sử dụng TDD.

Yêu cầu cấu trúc dự án:
- thư mục backend/: máy chủ Express API
- thư mục frontend/: ứng dụng React frontend
- cả hai thư mục có test riêng

Yêu cầu backend:
- sử dụng framework Express
- lưu trữ SQLite (better-sqlite3)
- xác thực JWT (jsonwebtoken + bcrypt)
- bảng user: id, username, password, email, role, createdAt
- bảng post: id, title, content, authorId, category, pinned, createdAt
- bảng comment: id, content, postId, authorId, createdAt

Các endpoint API backend:
- POST /api/auth/register - đăng ký người dùng
- POST /api/auth/login - đăng nhập người dùng
- GET /api/posts - lấy danh sách bài đăng (phân trang + lọc danh mục)
- GET /api/posts/:id - lấy chi tiết bài đăng
- POST /api/posts - tạo bài đăng (yêu cầu xác thực)
- PUT /api/posts/:id - chỉnh sửa bài đăng (tác giả hoặc quản trị viên)
- DELETE /api/posts/:id - xóa bài đăng (tác giả hoặc quản trị viên)
- POST /api/posts/:id/comments - thêm bình luận (yêu cầu xác thực)
- GET /api/user/profile - lấy hồ sơ (yêu cầu xác thực)
- PUT /api/user/profile - cập nhật hồ sơ (yêu cầu xác thực)
- GET /api/admin/stats - thống kê quản trị (chỉ quản trị viên)
- GET /api/admin/users - danh sách người dùng (chỉ quản trị viên)
- PUT /api/admin/users/:id/ban - cấm người dùng (chỉ quản trị viên)

Yêu cầu trang frontend:
- /login - trang đăng nhập
- /register - trang đăng ký
- / - trang chủ (danh sách bài đăng)
- /post/:id - chi tiết bài đăng
- /new - xuất bản bài đăng
- /profile - trang cá nhân
- /admin - bảng điều khiển quản trị (yêu cầu quyền quản trị viên)

Tính năng bảng điều khiển quản trị:
- quản lý người dùng (xem, cấm, bỏ cấm)
- quản lý bài đăng (xem, xóa, ghim)
- quản lý bình luận (xem, xóa)
- thống kê hệ thống (số người dùng, số bài đăng, số bình luận)

Yêu cầu TDD:
- viết test trước, sau đó triển khai
- mỗi tính năng phải có test tương ứng
- backend sử dụng Jest, test API bao phủ tất cả endpoint
- frontend sử dụng Vitest, test thành phần bao phủ các tính năng chính
- middleware xác thực phải có test

Tiêu chí chấp nhận:
- npm test (backend) vượt qua
- npm test (frontend) vượt qua
- frontend khởi động và hoạt động chính xác
- backend API phản hồi chính xác
- cách ly quyền hợp lý giữa người dùng thường và quản trị viên
- mã vượt qua kiểm tra ESLint

Xuất sau khi hoàn thành: <promise>BBS_SYSTEM_COMPLETE</promise>
" --max-iterations 150 --completion-promise "BBS_SYSTEM_COMPLETE"
```

### Thời gian dự kiến

Dựa trên độ phức tạp:

**Nếu viết mã thủ công**: khoảng 40-60 giờ (bao gồm thiết kế schema, hệ thống xác thực, tích hợp frontend/backend và test)

**Sử dụng Ralph Loop**:
- phiên bản cơ sở (tính năng cốt lõi): khoảng 3-5 giờ
- phiên bản đầy đủ (quản trị viên + test): khoảng 6-10 giờ

### Theo dõi tiến trình

Trong khi Ralph Loop đang chạy, bạn có thể theo dõi tiến trình theo một số cách:

**Số lần lặp**: Ralph hiển thị số lần lặp hiện tại và tối đa, giúp ước tính thời gian còn lại.

**Log**: bạn có thể thấy Claude đang làm gì, chẳng hạn như thiết kế schema, viết API, xây dựng thành phần và sửa lỗi.

**Trạng thái test**: mỗi kết quả chạy test được hiển thị. Test vượt qua tăng lên và test thất bại giảm xuống. Khi thất bại bắt đầu giảm, dự án đang tiến gần đến hoàn thành.

### Xác minh sau khi hoàn thành

Sau khi Ralph xuất đánh dấu hoàn thành, thực hiện xác minh thủ công:

```bash
# test backend
cd backend
npm test

# test frontend
cd frontend
npm test

# khởi động backend
cd backend
npm start

# khởi động frontend (trong terminal khác)
cd frontend
npm run dev
```

Mở trình duyệt và test:

1. đăng ký người dùng mới
2. đăng nhập
3. duyệt bài đăng
4. xuất bản bài viết mới
5. thêm bình luận
6. mở trang cá nhân
7. đăng xuất và đăng nhập sebagai quản trị viên (tài khoản mặc định: admin/admin123)
8. test tính năng quản trị viên

### Lưu ý

Ralph Loop mạnh mẽ, nhưng hãy ghi nhớ các điểm sau:

**Thứ nhất, prompt chi tiết hơn cho kết quả tốt hơn.** Prompt mơ hồ cần nhiều lần lặp hơn để sửa chữa.

**Thứ hai, đặt giới hạn lặp hợp lý.** Hệ thống BBS phức tạp; khuyến nghị ít nhất 100 lần lặp.

**Thứ ba, TDD được khuyến nghị.** Viết test trước có thể giảm đáng kể thời gian gỡ lỗi.

**Thứ tư, cần xác minh thủ công cuối cùng.** AI có thể bỏ qua các trường hợp cạnh hoặc tình huống đặc biệt, đặc biệt trong các đường dẫn nhạy cảm bảo mật.

**Thứ năm, chú ý chặt chẽ đến thiết kế schema.** Ralph có thể cần nhiều lần lặp trước khi có được schema mạnh mẽ.

---

## So Sánh và Lựa Chọn Phương Pháp

Mỗi phương pháp có đặc điểm riêng và phù hợp với các tình huống khác nhau.

While True Loop đơn giản nhất: chỉ 5 dòng để chạy, tốt cho thử nghiệm nhanh và nguyên mẫu. Nhưng nó bị giới hạn và không phát hiện hoàn thành thực sự, chỉ dựa vào giới hạn lặp.

Ralph Wiggum là khuyến nghị chung cho hầu hết các tình huống. Nó có cơ chế Stop Hook hoàn chỉnh, hỗ trợ kiểm tra đánh dấu hoàn thành, có hỗ trợ chính thức và tài liệu vững chắc.

Ralph Cải Tiến tốt hơn cho môi trường sản xuất, với điều kiện thoát kép, giới hạn tốc độ và bộ ngắt mạch thông minh.

Tác vụ nền hữu ích cho thực thi không chặn đơn giản: chỉ cần nhấn `Ctrl+B`. Nhưng nó chỉ là thực thi nền, không phải điều phối vòng lặp lặp lại.

---

## Tóm Tắt

Ý tưởng cốt lõi để khiến Claude Code làm việc dài hạn rất đơn giản: đừng yêu cầu nó "hoàn thành trong một lần," hãy yêu cầu nó "tiếp tục cố gắng cho đến khi hoàn thành thực sự."

Tất cả các phương pháp đều về cơ bản làm cùng một việc: đưa cho Claude một tác vụ, để nó chạy, kiểm tra xem hoàn thành có thực sự không và nếu không, tiếp tục vòng tiếp theo.

Phương pháp nào để chọn phụ thuộc vào nhu cầu của bạn.

Nếu bạn muốn đơn giản và nhanh chóng, sử dụng While True Loop. Năm dòng có thể chạy, nhưng tính năng bị giới hạn.

Nếu bạn muốn khuyến nghị chung, sử dụng Ralph Wiggum. Hỗ trợ chính thức, khả năng hoàn chỉnh, phù hợp cho hầu hết trường hợp.

Nếu đây là sử dụng sản xuất, sử dụng Ralph cải tiến. Nó có cơ chế an toàn bổ sung và đáng tin cậy hơn.

(Về hợp tác đa agent Agent Teams, xem phần tiếp theo: "3.3 Agent Teams Hợp Tác Đa Agent.")

Hy vọng chương này giúp bạn sử dụng Claude Code hiệu quả hơn để AI trở thành công cụ năng suất thực sự thay vì chỉ là chatbot.

---

## Tài Liệu Tham Khảo

### Tài nguyên chính thức

- [Tài Liệu Claude Code Chính Thức](https://docs.anthropic.com/en/docs/claude-code) - tài liệu Claude Code chính thức hoàn chỉnh
- [Ralph Wiggum Plugin README](https://github.com/anthropics/claude-plugins-official/tree/main/plugins/ralph-wiggum) - tài liệu plugin chính thức
- [Claude Code Hooks](https://docs.anthropic.com/en/docs/claude-code/configuration/hooks) - tài liệu hệ thống Hooks chính thức

### Dự án cộng đồng

- [frankbria/ralph-claude-code](https://github.com/frankbria/ralph-claude-code) (2.1k sao) - triển khai Ralph cải tiến với bảo vệ bổ sung
- [Awesome Ralph](https://github.com/snwfdhmp/awesome-ralph) - tài nguyên và ví dụ Ralph được tuyển chọn
- [Ralph Ryan](https://github.com/wquguru/ralph-ryan) - tạo PRD + tích hợp vòng lặp Ralph
- [snarktank/ralph](https://github.com/snarktank/ralph) - triển khai Ralph gốc

### Bài viết và Hướng dẫn

**Tài nguyên tiếng Anh**

- [Geoffrey Huntley - Ralph Technique](https://ghuntley.com/ralph/) - khái niệm Ralph gốc bởi người tạo ra
- [Effective Framework Practices for Reliable Long-Running AI Agents](https://m.blog.csdn.net/weixin_48708052/article/details/158044721) - đọc sâu blog kỹ thuật Anthropic
- [Complete Claude Code Guide](https://developer.aliyun.com/article/1705912) - hướng dẫn sử dụng đầy đủ

**Hướng dẫn tiếng Trung**

- [Beginner-Friendly Tutorial - CSDN](https://m.blog.csdn.net/zsr154278963/article/details/156637281) - hướng dẫn cài đặt và sử dụng chi tiết
- [Deep Analysis - Toutiao](https://m.toutiao.com/a7585579989207188006/) - cơ chế và nguyên lý cốt lõi
- [Full-Stack Plain-Language Guide](https://www.jdon.com/90167-ralph-wigum-loop-explained-for-teens.html) - hướng dẫn hoàn chỉnh từ nguyên lý đến thực hành
- [Beginner and Practical Guide - CNBlogs](https://www.cnblogs.com/buwai/p/19625356) - cơ bản và ví dụ thực tế
- [Ralph Loop Deep Dive - CSDN](https://m.blog.csdn.net/roamingcode/article/details/156732443) - chi tiết cơ chế Stop Hook
- [Claude Code Perpetual Engine - CSDN](https://m.blog.csdn.net/qq_44866828/article/details/156736656) - đi sâu vào plugin vòng lặp vô hạn
- [Ralph Loop New User Starter - CNBlogs](https://www.cnblogs.com/gyc567/p/19495639) - thực hành tốt nhất và tóm tắt prompt

### Nghiên cứu tình huống thực tế

- [CURSED Programming Language](https://github.com/geoffreyhuntley/cursed) - ngôn ngữ lập trình hoàn chỉnh được xây dựng với Ralph trong 3 tháng
- [Boris Cherny's 30 Days](https://twitter.com/boriskirov/status/1756002385683786616) - chia sẻ trường hợp 259 PR
- [Y Combinator Hackathon](https://github.com/geoffreyhuntley/ralph) - trường hợp tạo 6 dự án qua đêm
- [Geoffrey Huntley's Blog](https://ghuntley.com/) - blog kỹ thuật của người tạo ra
