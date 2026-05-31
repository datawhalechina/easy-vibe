# Quy Trình Phát Triển Có Sự Trợ Giúp Của AI

Trong các chương trước, chúng ta đã tìm hiểu cách sử dụng AI IDE để viết code, cách quản lý phiên bản code bằng Git, và cách thiết kế cũng như triển khai các giao diện API. Nhưng khi bạn đối mặt với một nhiệm vụ phát triển thực tế, bạn có thể gặp phải những câu hỏi như sau:

- "Dự án này có hàng ngàn file. Tôi nên bắt đầu từ đâu?"
- "Sếp yêu cầu tôi thêm một tính năng mới, nhưng tôi không quen thuộc với phần codebase này."
- "Tôi không biết lỗi này nằm ở đâu. Có quá nhiều code."
- "Tôi cần tái cấu trúc đống code này, nhưng tôi sợ làm hỏng thứ gì đó."

Bản chất của những câu hỏi này là: **làm thế nào để bạn sử dụng công cụ AI một cách hiệu quả trong các tình huống phát triển thực tế để hoàn thành công việc?**

Trong bài học này, chúng ta sẽ tìm hiểu cách xây dựng một quy trình phát triển có sự trợ giúp của AI mang tính hệ thống để bạn có thể sử dụng AI hiệu quả trong các tình huống phát triển khác nhau. Thông qua các ví dụ cụ thể, chúng ta sẽ minh họa cách sử dụng AI trong phát triển tính năng mới, sửa lỗi, tái cấu trúc code và nhiều hơn nữa.

> 💡 **Điều kiện tiên quyết**
>
> Trước khi nghiên cứu phần này, bạn nên tìm hiểu trước:
> - [Kiến thức cơ bản về AI IDE](../../../vi-vn/stage-1/ai-ide/) - nắm vững cách sử dụng cơ bản AI IDE
> - [Quy trình làm việc với Git và GitHub](../../../vi-vn/stage-2/backend/git-workflow/) - hiểu về quản lý phiên bản code
> - [Sử dụng mô hình lớn để hỗ trợ viết code API](../../../vi-vn/stage-2/backend/ai-interface-code/) - hiểu khái niệm cơ bản về phát triển có sự trợ giúp của AI

::: info 📚 Bạn sẽ học được gì

1. Hiểu vai trò của AI trong quá trình phát triển và giới hạn khả năng của nó
2. Nắm vững các chiến lược phát triển có sự trợ giúp của AI cho các loại dự án khác nhau
3. Học cách sử dụng Claude Code trong các tình huống như phát triển tính năng mới, sửa lỗi và tái cấu trúc code
4. Xây dựng cơ sở tri thức dự án để cải thiện hiệu quả cộng tác với Claude Code
5. Nắm vững các kỹ thuật thực tế để nâng cao hiệu quả cộng tác với AI

:::

# 1. Hiểu Giới Hạn Khả Năng Của AI

Trước khi bắt đầu sử dụng AI để hỗ trợ phát triển, trước tiên chúng ta cần hiểu những gì AI có thể và không thể làm. Chỉ khi đó chúng ta mới có thể xây dựng mô hình cộng tác phù hợp.

## 1.1 Những gì AI Giỏi

Hãy coi AI như một trợ lý rất thông minh nhưng vẫn cần hướng dẫn rõ ràng. Nó có thể nhanh chóng tạo ra khung code dựa trên mô tả của bạn, và cũng có thể đọc hàng ngàn dòng code trong vài giây để tìm phần bạn cần. Nếu có các lỗi cú pháp rõ ràng hoặc lỗ hổng bảo mật phổ biến, nó có thể giúp bạn phát hiện ra chúng. Các tác vụ lặp đi lặp lại như đổi tên biến hàng loạt, định dạng code và tạo chú thích tài liệu đặc biệt phù hợp để giao cho AI.

Nói một cách đơn giản, AI giỏi những công việc có quy tắc rõ ràng và có thể tự động hóa.

## 1.2 Những gì AI Không Giỏi

Nhưng AI cũng có những hạn chế của nó. Nó không hiểu logic nghiệp vụ của bạn. Trừ khi bạn nói cho nó biết chi tiết, nó sẽ không biết quy trình đặt hàng của công ty bạn hoạt động như thế nào. Nó cũng không thể đưa ra các quyết định như lựa chọn công nghệ hoặc thiết kế kiến trúc đòi hỏi phải cân nhắc đánh đổi, vì những điều đó phụ thuộc vào kinh nghiệm và sự hiểu biết của bạn về dự án. AI cũng không biết các quy ước đặc biệt của đội ngũ bạn, ví dụ "tất cả API phải có ghi log" hoặc "mã lỗi phải sử dụng enum." Bạn cần cấu hình các quy tắc đó hoặc nói cho nó biết một cách rõ ràng.

Quan trọng nhất, code được tạo bởi AI không thể sử dụng ngay lập tức. Bạn phải xem xét và kiểm tra nó. Nó có thể tạo ra code trông có vẻ đúng nhưng thực tế lại có vấn đề, và có thể bỏ qua một số trường hợp ngoại lệ.

## 1.3 Cách Cộng Tác Với AI

Khi bạn hiểu giới hạn khả năng của AI, mô hình cộng tác trở nên rõ ràng: bạn chịu trách nhiệm quyết định những gì cần xây dựng, đưa ra quyết định và đảm bảo chất lượng; AI chịu trách nhiệm thực thi công việc lập trình cụ thể, tìm kiếm thông tin và phát hiện các vấn đề rõ ràng.

Giống như làm việc với một lập trình viên mới. Bạn nói cho họ biết những gì cần làm, họ triển khai, và sau đó bạn xem xét code. Điểm khác biệt là AI thực thi nhanh hơn nhiều, nhưng khả năng phán đoán của nó yếu hơn con người.

# 2. Chiến Lược Phát Triển Cho Các Loại Dự Án Khác Nhau

Các loại dự án khác nhau đòi hỏi các phong cách phát triển và chiến lược sử dụng AI khác nhau. Việc chọn đúng chiến lược có thể cải thiện đáng kể hiệu quả phát triển.

## 2.1 Dự Án Mới Hoàn Toàn (Bắt Đầu Từ Đầu)

**Đặc điểm dự án:**
- Không có gánh nặng lịch sử, bạn có thể thiết kế tự do
- Bạn cần thiết lập cấu trúc dự án và quy ước code
- Phù hợp cho việc lặp lại nhanh và thử nghiệm-sai

**Quy trình làm việc được khuyến nghị:**

**Bước 1: Lập kế hoạch cấu trúc dự án**

Trước khi bắt đầu viết code, trước tiên hãy yêu cầu AI giúp bạn lập kế hoạch cấu trúc dự án và các lựa chọn công nghệ:

```text
Tôi muốn xây dựng một ứng dụng quản lý tác vụ với các tính năng sau:
- Đăng ký và đăng nhập người dùng
- Tạo, chỉnh sửa và xóa tác vụ
- Danh mục và thẻ cho tác vụ
- Nhắc nhở tác vụ

Vui lòng giúp tôi:
1. Đề xuất ngăn xếp công nghệ phù hợp
2. Thiết kế cấu trúc thư mục dự án
3. Lập kế hoạch schema cơ sở dữ liệu
```

**Bước 2: Xây dựng khung cơ bản**

Dựa trên kế hoạch, yêu cầu AI tạo cấu trúc dự án cơ bản:

```text
Dựa trên kế hoạch chúng ta vừa thảo luận, giúp tôi:
1. Tạo cấu trúc thư mục dự án
2. Khởi tạo các file cấu hình (package.json, .env, v.v.)
3. Tạo code server cơ bản
```

**Bước 3: Triển khai các tính năng từng cái một**

Triển khai các mô-đun tính năng theo thứ tự ưu tiên:

```text
Bây giờ triển khai tính năng đăng ký người dùng với các yêu cầu sau:
- Đăng ký bằng email và mật khẩu
- Lưu trữ mật khẩu dưới dạng mã hóa
- Xác minh email
```

**Điểm chính:**
- Thiết lập quy ước code sớm để AI tạo code tuân theo chúng
- Kiểm tra và xác minh từng mô-đun tính năng ngay khi hoàn thành
- Cập nhật tài liệu dự án kịp thời

## 2.2 Dự Án Trưởng Thành (Codebase Lớn Đã Có Sẵn)

**Đặc điểm dự án:**
- Codebase lớn với các quy ước lịch sử
- Bạn cần giữ phong cách code nhất quán
- Các thay đổi phải xem xét phạm vi ảnh hưởng

**Quy trình làm việc được khuyến nghị:**

**Bước 1: Hiểu cấu trúc dự án**

Trước khi thay đổi code, trước tiên hãy yêu cầu AI giúp bạn hiểu dự án:

```text
Đây là một dự án thương mại điện tử, và tôi cần thêm tính năng mã giảm giá.
Vui lòng giúp tôi:
1. Phân tích cấu trúc dự án tổng thể
2. Tìm code liên quan đến đơn hàng
3. Xem cách các tính năng tương tự khác được triển khai
```

**Bước 2: Tìm code tham chiếu**

Yêu cầu AI tìm các triển khai tương tự trong dự án làm tham chiếu:

```text
Tìm cách các tính năng khuyến mãi khác trong dự án, như giảm giá theo đơn hàng và chiết khấu, được triển khai
```

**Bước 3: Tuân theo phong cách hiện có**

Yêu cầu AI triển khai tính năng mới theo phong cách code hiện có:

```text
Vui lòng triển khai tính năng mã giảm giá bằng cách tham khảo cách khuyến mãi giảm giá theo đơn hàng được triển khai.
Giữ nguyên phong cách code và cấu trúc thư mục.
```

**Điểm chính:**
- Hiểu trước, sau đó mới thay đổi, để không làm hỏng kiến trúc hiện có
- Giữ phong cách code nhất quán
- Kiểm tra các chức năng liên quan sau khi thay đổi

## 2.3 Nguyên Mẫu Nhanh (Xác Minh Ý Tưởng)

**Đặc điểm dự án:**
- Tốc độ quan trọng nhất, chất lượng code kém quan trọng hơn
- Được sử dụng để xác minh ý tưởng sản phẩm hoặc phương pháp công nghệ
- Có thể bị loại bỏ hoặc viết lại sau này

**Quy trình làm việc được khuyến nghị:**

**Mô tả trực tiếp yêu cầu và triển khai nhanh:**

```text
Xây dựng một ứng dụng todo đơn giản với các yêu cầu sau:
- Thêm, xóa và đánh dấu tác vụ đã hoàn thành
- Lưu trữ dữ liệu cục bộ
- Giữ giao diện đơn giản, miễn là hoạt động được
```

**Lặp lại nhanh:**

```text
Thêm tìm kiếm
Chuyển sang giao diện tối
Thêm danh mục tác vụ
```

**Điểm chính:**
- Đừng quá lo lắng về chất lượng code hoặc quy ước
- Xác minh ý tưởng nhanh chóng và điều chỉnh hướng kịp thời
- Nếu nguyên mẫu thành công, nó sẽ cần tái cấu trúc sau

## 2.4 Dự Án Bảo Trì (Chủ Yếu Là Sửa Lỗi)

**Đặc điểm dự án:**
- Code đã ổn định, nhiệm vụ chính là sửa lỗi
- Bạn cần định vị vấn đề nhanh chóng
- Các thay đổi phải được thực hiện cẩn thận để tránh引入 vấn đề mới

**Quy trình làm việc được khuyến nghị:**

**Bước 1: Định vị vấn đề**

```text
Phản hồi người dùng: sau khi nhấp vào nút "Gửi Đơn Hàng", trang bị treo
Lỗi console: TypeError: Cannot read property 'id' of undefined

Vui lòng giúp tôi:
1. Phân tích các nguyên nhân có thể
2. Tìm code liên quan
```

**Bước 2: Phân tích nguyên nhân gốc**

```text
Kiểm tra trong những tình huống nào lỗi này xảy ra
Kiểm tra luồng dữ liệu
```

**Bước 3: Áp dụng bản sửa**

```text
Sửa vấn đề này, và:
1. Thêm code phòng thủ để tránh các vấn đề tương tự
2. Thêm thông báo lỗi để cải thiện trải nghiệm người dùng
```

**Điểm chính:**
- Kiểm tra kỹ lưỡng sau khi sửa để đảm bảo không ảnh hưởng chức năng khác
- Thêm code phòng thủ để cải thiện độ mạnh mẽ của hệ thống
- Ghi lại vấn đề và giải pháp để tham chiếu trong tương lai

# 3. Quy Trình Làm Việc Cho Các Tác Vụ Phát Triển Phổ Biến

Trong quá trình phát triển hàng ngày, chúng ta gặp nhiều loại tác vụ khác nhau. Dưới đây là một số quy trình hỗ trợ AI phổ biến nhất.

## 3.1 Phát Triển Một Tính Năng Mới

**Tình huống:** quản lý sản phẩm giao cho bạn một yêu cầu mới, và bạn cần triển khai một tính năng mới.

**Quy trình làm việc hoàn chỉnh:**

**Bước 1: Hiểu yêu cầu** (do bạn thực hiện)

Trước khi bắt đầu viết code, trước tiên hãy làm rõ:
- Tính năng nào cần được triển khai?
- Đầu vào và đầu ra là gì?
- Điều kiện biên và trường hợp ngoại lệ là gì?
- Yêu cầu về hiệu suất và bảo mật là gì?

**Bước 2: Hiểu code hiện có** (yêu cầu AI hỗ trợ)

```text
Tôi cần triển khai tính năng bình luận của người dùng. Vui lòng giúp tôi:
1. Kiểm tra xem có gì tương tự trong dự án không
2. Tìm cách dữ liệu người dùng và dữ liệu bài viết được lưu trữ
3. Hiểu quy ước thao tác cơ sở dữ liệu trong dự án này
```

**Bước 3: Lập kế hoạch triển khai** (cùng với AI)

```text
Dựa trên phân tích chúng ta vừa thực hiện, triển khai tính năng bình luận yêu cầu:
1. Tạo mô hình dữ liệu bình luận
2. Triển khai API CRUD cho bình luận
3. Thêm chức năng hiển thị và đăng bình luận vào frontend

Vui lòng giúp tôi xác nhận liệu kế hoạch này có hợp lý không và có thiếu sót gì không
```

**Bước 4: Triển khai tính năng** (AI tạo, bạn xem xét)

```text
Theo kế hoạch, trước tiên triển khai mô hình dữ liệu bình luận.
Yêu cầu:
- Bao gồm nội dung bình luận, tác giả, ID bài viết và thời gian tạo
- Hỗ trợ trả lời bình luận lồng nhau
- Thêm các chỉ mục cần thiết
```

```text
Bây giờ triển khai các endpoint API bình luận.
Yêu cầu:
- Đăng một bình luận
- Xóa một bình luận (chỉ có thể xóa bình luận của chính mình)
- Lấy tất cả bình luận của một bài viết
- Hỗ trợ phân trang
```

```text
Cuối cùng triển khai component bình luận frontend.
Yêu cầu:
- Hiển thị danh sách bình luận
- Form đăng bình luận
- Hỗ trợ trả lời bình luận
```

**Bước 5: Kiểm tra và xác minh** (do bạn thực hiện)

- Kiểm tra thủ công luồng chính
- Kiểm tra các trường hợp biên như nội dung trống và nội dung quá dài
- Kiểm tra kiểm soát quyền như không thể xóa bình luận của người khác
- Yêu cầu AI giúp bạn viết kiểm thử tự động

**Ví dụ hội thoại thực tế:**

```text
Bạn: Tôi muốn thêm tính năng bình luận người dùng để người dùng có thể đăng bình luận trên bài viết

AI: Được rồi, để tôi trước hiểu cấu trúc dự án.
    [AI phân tích code dự án]
    Tôi thấy rằng dự án đã có hệ thống người dùng (models/user.js)
    và hệ thống bài viết (models/article.js).

    Triển khai tính năng bình luận yêu cầu:
    1. Tạo mô hình dữ liệu bình luận (models/comment.js)
    2. Thêm API liên quan đến bình luận (routes/comment.js)
    3. Thêm chức năng hiển thị và đăng bình luận vào trang chi tiết bài viết

    Tôi có nên bắt đầu triển khai không?

Bạn: Có, hãy bắt đầu. Tạo mô hình dữ liệu trước

AI: [Tạo models/comment.js]
    Tôi đã tạo mô hình dữ liệu bình luận với các trường sau:
    - id: ID bình luận
    - content: nội dung bình luận
    - userId: ID tác giả
    - articleId: ID bài viết
    - parentId: ID bình luận cha (dành cho trả lời lồng nhau)
    - createdAt: thời gian tạo

    Tôi có nên triển khai API tiếp theo không?

Bạn: Có, triển khai API
```

## 3.2 Sửa Lỗi

**Tình huống:** một người dùng báo cáo một vấn đề, và bạn cần định vị và sửa nó nhanh chóng.

**Quy trình làm việc hoàn chỉnh:**

**Bước 1: Thu thập thông tin** (do bạn thực hiện)

Ghi lại các thông tin sau:
- Thông báo lỗi là gì?
- Làm thế nào để tái hiện vấn đề này?
- Nó bắt đầu xảy ra từ khi nào?
- Phạm vi ảnh hưởng lớn như thế nào?

**Bước 2: Định vị vấn đề** (yêu cầu AI hỗ trợ)

```text
Phản hồi người dùng: sau khi nhấp vào nút "Gửi Đơn Hàng", trang bị treo
Lỗi console trình duyệt: TypeError: Cannot read property 'id' of undefined
Lỗi xảy ra ở dòng 45 của checkout.js

Vui lòng giúp tôi:
1. Phân tích các nguyên nhân có thể
2. Tìm code liên quan
3. Kiểm tra luồng dữ liệu
```

**Bước 3: Phân tích nguyên nhân gốc** (cùng với AI)

```text
Kiểm tra xem đối tượng user này đến từ đâu
Kiểm tra trong những trường hợp nào user có thể là undefined
```

**Bước 4: Triển khai bản sửa** (AI tạo, bạn xem xét)

```text
Sửa vấn đề này với các yêu cầu sau:
1. Thêm code phòng thủ để kiểm tra xem user có tồn tại không
2. Nếu user không tồn tại, chuyển hướng đến trang đăng nhập
3. Thêm thông báo lỗi thân thiện
```

**Bước 5: Xác minh bản sửa** (do bạn thực hiện)

- Tái hiện vấn đề sử dụng các bước ban đầu và xác nhận vấn đề đã được giải quyết
- Kiểm tra chức năng liên quan để đảm bảo không có vấn đề mới được引入
- Suy nghĩ xem có vấn đề tương tự tồn tại ở nơi khác không

**Ví dụ hội thoại thực tế:**

```text
Bạn: Một người dùng báo cáo rằng sau khi đăng nhập, làm mới trang sẽ đăng xuất họ

AI: Đây thường là vấn đề lưu trữ hoặc xác thực token. Để tôi kiểm tra:
    1. Token được lưu ở đâu, localStorage hay cookies?
    2. Token có được tải lại khi trang làm mới không?

    Vui lòng cho tôi biết file nào chứa code liên quan đến token

Bạn: utils/auth.js

AI: [Phân tích utils/auth.js]
    Tôi tìm thấy vấn đề: token được lưu trong sessionStorage,
    và sessionStorage bị xóa khi trang được làm mới.

    Giải pháp: sử dụng localStorage thay thế

    Bạn có muốn tôi thay đổi không?

Bạn: Có, hãy thay đổi

AI: [Sửa đổi code]
    Thay đổi hoàn tất. Token bây giờ được lưu trong localStorage,
    nên nó sẽ không bị mất sau khi làm mới trang.

    Tôi khuyến nghị bạn kiểm tra:
    1. Đăng nhập và làm mới trang để xác nhận người dùng vẫn đăng nhập
    2. Đóng và mở lại trình duyệt để xác nhận người dùng vẫn đăng nhập
```

## 3.3 Tái Cấu Trúc Code

**Tình huống:** code trở nên khó bảo trì, và cần tái cấu trúc để cải thiện chất lượng code.

**Quy trình làm việc hoàn chỉnh:**

**Bước 1: Xác định mục tiêu tái cấu trúc** (do bạn thực hiện)

Làm rõ những điều sau:
- Vấn đề bạn đang cố gắng giải quyết là gì? (code trùng lặp? cấu trúc lộn xộn? vấn đề hiệu suất?)
- Phạm vi tái cấu trúc lớn như thế nào?
- Mức độ rủi ro chấp nhận được là bao nhiêu?

**Bước 2: Lập kế hoạch tái cấu trúc** (cùng với AI)

```text
Ba hàm này (getUserList, getArticleList, getCommentList)
chứa rất nhiều code trùng lặp cho phân trang, sắp xếp và lọc.

Vui lòng giúp tôi:
1. Phân tích các phần trùng lặp
2. Đề xuất kế hoạch tái cấu trúc
3. Đánh giá rủi ro của việc tái cấu trúc
```

**Bước 3: Chuẩn bị mạng lưới an toàn** (yêu cầu AI hỗ trợ)

```text
Trước khi tái cấu trúc, vui lòng viết các test case cho tôi trước
để đảm bảo hành vi không thay đổi sau khi tái cấu trúc
```

**Bước 4: Tái cấu trúc từng bước** (AI thực thi, bạn xác minh)

```text
Theo kế hoạch chúng ta vừa thảo luận, trước tiên trích xuất hàm dùng chung
```

```text
Bây giờ tối ưu cấu trúc dữ liệu
```

```text
Cuối cùng cập nhật các vị trí gọi
```

**Bước 5: Xác minh kết quả** (do bạn thực hiện)

- Chạy tất cả các kiểm thử và đảm bảo chúng vượt qua
- Kiểm tra thủ công các chức năng chính
- Kiểm tra xem chất lượng code đã được cải thiện chưa

**Ví dụ hội thoại thực tế:**

```text
Bạn: Ba hàm này có rất nhiều code trùng lặp. Bạn có thể giúp tôi tái cấu trúc chúng không?
    [Dán code của ba hàm]

AI: Tôi đã phân tích, và sự khác biệt chính là:
    - getUserList: lấy danh sách người dùng
    - getArticleList: lấy danh sách bài viết
    - getCommentList: lấy danh sách bình luận

    Logic chung của chúng là phân trang, sắp xếp và lọc.

    Kế hoạch tái cấu trúc:
    1. Trích xuất một hàm getList tổng quát
    2. Truyền các phần khác nhau dưới dạng tham số

    Điều này có thể giảm 80% code trùng lặp.

    Tôi có nên triển khai không?

Bạn: Có, nhưng trước tiên giúp tôi viết test case

AI: [Tạo kiểm thử]
    Tôi đã viết kiểm thử cho cả ba hàm,
    bao gồm các trường hợp sử dụng chính.

    Tôi có thể bắt đầu tái cấu trúc bây giờ không?

Bạn: Có, bắt đầu tái cấu trúc

AI: [Tái cấu trúc code]
    Tái cấu trúc hoàn tất. Tôi đã tạo một hàm getList tổng quát,
    và ba hàm ban đầu bây giờ đều gọi hàm dùng chung đó.

    Vui lòng chạy kiểm thử để xác nhận mọi thứ hoạt động: npm test
```

## 3.4 Xem Xét Code

**Tình huống:** một thành viên trong nhóm đã gửi code, và bạn cần xem xét nó.

**Quy trình làm việc hoàn chỉnh:**

**Bước 1: Hiểu nhanh thay đổi** (yêu cầu AI hỗ trợ)

```text
Tóm tắt PR này đã thay đổi những gì
Chủ yếu đã sửa đổi những file nào
```

**Bước 2: Kiểm tra các vấn đề phổ biến** (yêu cầu AI hỗ trợ)

```text
Kiểm tra thay đổi này về:
1. Vấn đề bảo mật (SQL injection, XSS, v.v.)
2. Vấn đề hiệu suất (truy vấn N+1, rò rỉ bộ nhớ, v.v.)
3. Lỗi rõ ràng
4. Phong cách code có tuân theo quy ước dự án không
```

**Bước 3: Xem xét sâu** (do bạn thực hiện)

- Logic nghiệp vụ có đúng không
- Có xem xét các trường hợp biên không
- Có cách tiếp cận triển khai tốt hơn không
- Có nên thêm kiểm thử không

**Bước 4: Đưa ra phản hồi** (do bạn thực hiện)

- Chỉ ra những nơi cần thay đổi
- Giải thích lý do tại sao nên thay đổi
- Cung cấp đề xuất cải thiện

**Ví dụ hội thoại thực tế:**

```text
Bạn: Giúp tôi xem xét PR này
    [Cung cấp liên kết PR hoặc code]

AI: Tôi đã xem xét thay đổi và tìm thấy các vấn đề sau:

    1. Vấn đề bảo mật:
       - Dòng 23: đầu vào người dùng không được thoát, có thể dẫn đến rủi ro XSS
       - Dòng 45: truy vấn SQL được xây dựng bằng cách nối chuỗi, có rủi ro injection

    2. Vấn đề hiệu suất:
       - Dòng 67: cơ sở dữ liệu được truy vấn trong vòng lặp, tạo ra vấn đề N+1

    3. Chất lượng code:
       - Hàm handleSubmit quá dài (200 dòng); cân nhắc việc chia nhỏ
       - Thiếu xử lý lỗi

    Bạn có muốn tôi giải thích chi tiết hơn về bất kỳ vấn đề nào trong số này không?

Bạn: Giải thích chi tiết vấn đề SQL injection

AI: Ở dòng 45:
    ```javascript
    const query = `SELECT * FROM users WHERE name = '${userName}'`;
    ```

    Điều này nối trực tiếp đầu vào người dùng vào câu lệnh SQL.
    Nếu người dùng nhập `' OR '1'='1`, nó trở thành:
    ```sql
    SELECT * FROM users WHERE name = '' OR '1'='1'
    ```
    Điều này sẽ trả về tất cả dữ liệu người dùng.

    Cách tiếp cận đúng là sử dụng truy vấn tham số hóa:
    ```javascript
    const query = 'SELECT * FROM users WHERE name = ?';
    db.query(query, [userName]);
    ```

    Bạn có muốn tôi sửa nó không?
```

# 4. Xây Dựng Cơ Sở Tri Thức Dự Án

Để giúp AI hiểu dự án của bạn tốt hơn, bạn nên xây dựng một cơ sở tri thức trong dự án. Bằng cách đó, AI có thể làm việc theo các quy ước và thói quen của bạn.

## 4.1 Tạo File Mô Tả Dự Án

Tạo file `CLAUDE.md` hoặc `AGENTS.md` trong thư mục gốc dự án để ghi lại thông tin quan trọng về dự án:

```markdown
# Tổng Quan Dự Án

## Tóm Tắt Dự Án
Đây là một nền tảng học tập trực tuyến cung cấp quản lý khóa học, học tập của người dùng, nộp bài tập và các tính năng khác.

## Ngăn Xếp Công Nghệ
- Frontend: React 18 + TypeScript + Vite
- Backend: Node.js + Express + PostgreSQL
- Triển khai: Vercel (frontend) + Railway (backend)

## Cấu Trúc Dự Án
```
src/
├── components/     # React components
├── pages/          # Page components
├── api/            # API calls
├── utils/          # Utility functions
└── types/          # TypeScript type definitions
```

## Quy Ước Code
- Sử dụng ESLint và Prettier để định dạng code
- File component sử dụng PascalCase (như UserProfile.tsx)
- Hàm tiện ích sử dụng camelCase (như formatDate.ts)
- Hằng số sử dụng UPPER_SNAKE_CASE (như API_BASE_URL)

## Quy Trình Phát Triển
1. Tạo nhánh tính năng từ main
2. Gửi PR sau khi phát triển hoàn tất
3. Gộp sau khi xem xét code thông qua

## Tác Vụ Phổ Biến
- Khởi động server phát triển: `npm run dev`
- Chạy kiểm thử: `npm test`
- Build cho sản xuất: `npm run build`
- Định dạng code: `npm run format`

## Lưu Ý
- Tất cả các cuộc gọi API phải bao gồm xử lý lỗi
- Đầu vào người dùng phải được xác thực và thoát
- Sử dụng truy vấn tham số hóa cho các thao tác cơ sở dữ liệu để tránh SQL injection
- Thông tin nhạy cảm (mật khẩu, token) không được ghi vào log

## Schema Cơ Sở Dữ Liệu
- users: bảng người dùng (id, email, password_hash, created_at)
- courses: bảng khóa học (id, title, description, teacher_id)
- enrollments: bảng ghi danh (id, user_id, course_id, enrolled_at)
```

## 4.2 Ghi Lại Các Vấn Đề Phổ Biến Và Giải Pháp

Tạo `docs/troubleshooting.md` trong dự án để ghi lại các vấn đề phổ biến:

```markdown
# Các Vấn Đề Phổ Biến

## Vấn Đề Môi Trường Phát Triển

### Vấn đề: npm install thất bại
**Nguyên nhân:** Phiên bản Node không tương thích
**Giải pháp:** Sử dụng Node.js 18 trở lên

### Vấn đề: kết nối cơ sở dữ liệu thất bại
**Nguyên nhân:** biến môi trường chưa được cấu hình
**Giải pháp:** Sao chép .env.example thành .env và điền thông tin kết nối cơ sở dữ liệu

## Vấn Đề Tính Năng

### Vấn đề: sau khi người dùng đăng nhập, làm mới trang sẽ đăng xuất họ
**Nguyên nhân:** token được lưu trong sessionStorage
**Giải pháp:** chuyển sang localStorage

### Vấn đề: tải lên hình ảnh thất bại
**Nguyên nhân:** kích thước file vượt quá giới hạn
**Giải pháp:** thêm kiểm tra kích thước file ở frontend và giới hạn ở 5MB
```

## 4.3 Duy Trì Hồ Sơ Quyết Định Kỹ Thuật

Tạo thư mục `docs/decisions/` để ghi lại các quyết định kỹ thuật quan trọng:

```markdown
# ADR-001: Chọn PostgreSQL làm Cơ Sở Dữ Liệu

## Trạng Thái
Đã Chấp Nhận

## Bối Cảnh
Dự án cần chọn một cơ sở dữ liệu quan hệ. Các ứng viên là MySQL và PostgreSQL.

## Quyết Định
Chọn PostgreSQL

## Lý Do
1. Hỗ trợ JSON tốt hơn, phù hợp để lưu trữ nội dung khóa học
2. Tìm kiếm toàn văn mạnh mẽ hơn
3. Đội ngũ quen thuộc với PostgreSQL hơn

## Hệ Quả
- Chúng ta cần học các tính năng đặc trưng của PostgreSQL
- Triển khai đòi hỏi môi trường PostgreSQL
```

# 5. Kỹ Thuật Cải Thiện Hiệu Quả Cộng Tác Với AI

Bằng cách nắm vững một số kỹ thuật thực tế, bạn có thể làm cho sự cộng tác với AI của mình hiệu quả hơn.

## 5.1 Rõ Ràng và Cụ Thể Khi Mô Tả Vấn Đề

**Mô tả kém:**
```text
Tính năng này có vấn đề
Giúp tôi tối ưu nó
```

**Mô tả tốt:**
```text
Sau khi người dùng nhấp vào nút "Gửi", form không được gửi
Console trình duyệt báo: Uncaught TypeError: Cannot read property 'value' of null
Lỗi xảy ra ở dòng 23 của form.js

Danh sách này tải rất chậm và có 1000 mục
Vui lòng giúp tôi thêm phân trang với 20 mục mỗi trang
```

**Điểm chính:**
- Cung cấp thông tin lỗi cụ thể
- Giải thích kết quả mong đợi
- Cung cấp ngữ cảnh liên quan

## 5.2 Chỉ Làm Một Việc Tại Một Thời Điểm

**Cách tiếp cận kém:**
```text
Giúp tôi triển khai đăng nhập, đăng ký, khôi phục mật khẩu, trang cá nhân,
đổi mật khẩu và xác minh email
```

**Cách tiếp cận tốt:**
```text
Triển khai tính năng đăng nhập trước, với các yêu cầu sau:
- Đăng nhập bằng email và mật khẩu
- Ghi nhớ trạng thái đăng nhập
- Thông báo lỗi

(Sau khi hoàn thành) Bây giờ triển khai tính năng đăng ký

(Sau khi hoàn thành) Bây giờ triển khai tính năng khôi phục mật khẩu
```

**Điểm chính:**
- Chia nhỏ nhiệm vụ lớn thành nhiệm vụ nhỏ
- Kiểm tra và xác minh sau mỗi nhiệm vụ hoàn thành
- Xác nhận không có vấn đề trước khi chuyển sang nhiệm vụ tiếp theo

## 5.3 Xác Minh Kết Quả Kịp Thời

**Cách tiếp cận kém:**
- Để AI sửa đổi 10 file liên tiếp
- Chỉ phát hiện ở cuối rằng thay đổi đầu tiên đã sai
- Lãng phí rất nhiều thời gian

**Cách tiếp cận tốt:**
- Sửa đổi một file và kiểm tra ngay lập tức
- Xác nhận không có vấn đề, sau đó tiếp tục
- Sửa chữa vấn đề ngay khi phát hiện

**Điểm chính:**
- Di chuyển theo từng bước nhỏ và nhận phản hồi nhanh
- Đừng mù quáng tin tưởng AI
- Giữ quyền kiểm soát code

## 5.4 Sử Dụng Ngữ Cảnh Hiệu Quả

**Kỹ thuật 1: tham chiếu cuộc trò chuyện trước**
```text
Triển khai theo kế hoạch chúng ta vừa thảo luận
Tham chiếu hàm getUserList trước đó
```

**Kỹ thuật 2: cung cấp code liên quan**
```text
Đây là code mô hình người dùng hiện có:
[dán code]

Vui lòng triển khai mô hình bài viết theo cùng phong cách
```

**Kỹ thuật 3: giải thích bối cảnh dự án**
```text
Đây là một dự án thương mại điện tử sử dụng React + Node.js
Nó đã có hệ thống người dùng và hệ thống sản phẩm
Bây giờ chúng ta cần thêm tính năng giỏ hàng
```

## 5.5 Lưu Trữ Các Cuộc Trò Chuyện Hữu Ích

**Tình huống:** bạn đã giải quyết một vấn đề phức tạp

**Cách thực hiện:**
1. Ghi lại giải pháp trong tài liệu dự án
2. Tham chiếu nó lần tới khi một vấn đề tương tự xuất hiện
3. Chia sẻ nó với các thành viên khác trong nhóm

**Ví dụ:**

Tạo tài liệu dưới `docs/solutions/`:

```markdown
# Giải Quyết Vấn Đề Truy Vấn N+1

## Mô Tả Vấn Đề
Khi lấy danh sách bài viết, hệ thống truy vấn thông tin tác giả một lần cho mỗi bài viết,
điều này gây ra vấn đề hiệu suất.

## Giải Pháp
Sử dụng truy vấn JOIN để lấy tất cả dữ liệu trong một lần:

```sql
SELECT articles.*, users.name as author_name
FROM articles
LEFT JOIN users ON articles.author_id = users.id
```

**Kết quả:** thời gian truy vấn giảm từ 2000ms xuống 50ms

## 5.6 Học Nghệ Thuật Đặt Câu Hỏi

**Kỹ thuật 1: hỏi "tại sao" trước**
```text
Tại sao code này gây ra rò rỉ bộ nhớ?
Tại sao chúng ta nên sử dụng useCallback thay vì hàm thông thường?
```

**Kỹ thuật 2: yêu cầu nhiều lựa chọn**
```text
Có những cách khác nhau nào để triển khai xác thực người dùng?
Ưu và nhược điểm của mỗi cách là gì?
```

**Kỹ thuật 3: yêu cầu giải thích**
```text
Code này hoạt động như thế nào?
Bạn có thể giải thích thuật toán này chi tiết không?
```

# 6. Các Câu Hỏi Thường Gặp

## Hỏi 1: Tôi có thể sử dụng code do AI tạo ra trực tiếp không?

**Đáp:** Không, không trực tiếp. Nó cần được xem xét và kiểm tra.

Code do AI tạo ra có thể có các vấn đề sau:
- lỗi logic hoặc xử lý kém các trường hợp biên
- không phù hợp với quy ước code của dự án
- rủi ro bảo mật
- tối ưu hóa hiệu suất không đủ

Bạn cần:
- đọc kỹ code được tạo
- hiểu logic của nó
- kiểm tra các kịch bản khác nhau
- xác nhận rằng nó tuân theo quy ước của dự án

## Hỏi 2: Nếu AI hiểu sai ý tôi thì sao?

**Đáp:** Sửa kịp thời và mô tả lại yêu cầu.

```text
Không phải ý tôi. Ý tôi là...
Cách hiểu này không chính xác. Nó phải là...
Để tôi mô tả lại yêu cầu...
```

Nếu vẫn sai sau một vài lần sửa, bạn có thể:
- cung cấp thêm ngữ cảnh
- đưa ra các ví dụ code cụ thể
- chia nhỏ nhiệm vụ thành các phần nhỏ hơn

## Hỏi 3: Nếu tôi gặp phải thứ mà AI không thể giải quyết thì sao?

**Đáp:** AI không phải là toàn năng. Một số vấn đề vẫn cần bạn tự giải quyết.

Các vấn đề mà AI có thể không giải quyết được:
- công nghệ rất mới (kiến thức của AI có ngày cắt off)
- logic nghiệp vụ đặc trưng của đội ngũ bạn
- các vấn đề đòi hỏi truy cập vào hệ thống bên ngoài
- các vấn đề tối ưu hóa hiệu suất phức tạp

Vào lúc đó, bạn cần:
- đọc tài liệu chính thức
- tìm kiếm các giải pháp liên quan
- hỏi các đồng nghiệp có kinh nghiệm
- hỏi trong cộng đồng

## Hỏi 4: Làm thế nào để tôi đánh giá liệu đề xuất của AI có hợp lý không?

**Đáp:** Sử dụng kinh nghiệm và kiến thức của chính bạn để đánh giá.

Tiêu chí đánh giá:
- có tuân theo các phương pháp hay nhất không
- có xem xét các trường hợp biên không
- có rủi ro bảo mật tiềm ẩn không
- có phù hợp với ngăn xếp công nghệ của dự án không
- hiệu suất có chấp nhận được không

Nếu bạn không chắc chắn, bạn có thể:
- yêu cầu AI giải thích lý do tại sao nó đề xuất cách tiếp cận đó
- yêu cầu các giải pháp thay thế
- tham khảo ý kiến các thành viên trong nhóm

## Hỏi 5: Một đội ngũ nên sử dụng AI trong cộng tác như thế nào?

**Đáp:** Thiết lập các quy ước chung và cơ sở tri thức chung.

Đề xuất cho cộng tác đội ngũ:
- chia sẻ cấu hình `CLAUDE.md` của dự án
- thống nhất quy ước và phong cách code
- ghi lại các giải pháp cho các vấn đề phổ biến
- thường xuyên chia sẻ các prompt hữu ích
- kiểm tra code do AI tạo ra trong quá trình xem xét code

## Hỏi 6: Làm thế nào để tôi tránh trở nên quá phụ thuộc vào AI?

**Đáp:** Tiếp tục học hỏi và suy nghĩ. AI là trợ lý, không phải sự thay thế.

Đề xuất:
- hiểu code do AI tạo ra thay vì sao chép mù quáng
- chủ động học các khái niệm bạn chưa hiểu
- thường xuyên ôn lại kiến thức nền tảng
- thử tự giải quyết vấn đề trước, sau đó sử dụng AI để xác minh
- tham gia xem xét code để học hỏi từ kinh nghiệm của người khác

# 7. Tóm Tắt

Thông qua chương này, bạn đã nắm vững:

1. **Giới hạn khả năng của AI**: hiểu những gì AI giỏi và không giỏi, và xây dựng mô hình cộng tác phù hợp
2. **Chiến lược theo loại dự án**: các chiến lược phát triển khác nhau cho dự án mới hoàn toàn, dự án trưởng thành, nguyên mẫu nhanh và dự án bảo trì
3. **Quy trình tác vụ phổ biến**: quy trình làm việc hoàn chỉnh cho phát triển tính năng mới, sửa lỗi, tái cấu trúc code và xem xét code
4. **Cơ sở tri thức dự án**: học cách xây dựng tài liệu dự án để AI có thể hiểu dự án của bạn tốt hơn
5. **Kỹ thuật cộng tác**: các cách thực tế để cải thiện hiệu quả cộng tác với AI

**Điểm chính cần nhớ:**

- **Phân công vai trò rõ ràng**: bạn đưa ra quyết định và đảm bảo chất lượng, AI xử lý thực thi và hỗ trợ
- **Giao tiếp rõ ràng**: cụ thể và làm một việc tại một thời điểm
- **Xác minh kịp thời**: đừng tin mù quáng, kiểm tra và xác minh
- **Tiếp tục học hỏi**: hiểu giới hạn khả năng của AI và liên tục cải thiện mô hình cộng tác

Nhớ rằng: AI là một công cụ, không phải sự thay thế. Nó có thể giúp bạn hiệu quả hơn, nhưng chất lượng code cuối cùng vẫn phụ thuộc vào sự phán đoán của bạn. Bắt đầu với các nhiệm vụ đơn giản và dần dần xây dựng niềm tin. Bạn sẽ thấy rằng AI có thể giúp bạn tiết kiệm rất nhiều thời gian và cho phép bạn tập trung vào công việc có giá trị hơn.

::: tip 💡 Bước tiếp theo
Trong chương tiếp theo, chúng ta sẽ tìm hiểu cách sử dụng AI để xem xét code và đảm bảo chất lượng nhằm đảm bảo khả năng bảo trì và bảo mật của code.
:::
