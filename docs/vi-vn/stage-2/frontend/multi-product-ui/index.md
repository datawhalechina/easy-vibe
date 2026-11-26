# Thiết kế trang và nút bấm theo quy chuẩn UI

Nhiều người nói "Tôi muốn trang giống Apple hơn một chút" "Nút bấm muốn làm cao cấp hơn một chút", nhưng khi thực sự bắt đầu làm, thường sẽ bị kẹt ở một vấn đề:

**Rốt cuộc nên tham khảo cái gì?**

Nhìn screenshot bắt chước, học được chỉ là "có giống hay không". Nhưng khi mở quy chuẩn thiết kế của Apple, Google, Microsoft, Atlassian, bạn sẽ phát hiện điểm thực sự tuyệt vời của họ không phải là phong cách thị giác, mà là **nói rõ vấn đề thiết kế**: trang trước tiên làm nổi bật cái gì, nút bấm phân cấp thế nào, thao tác nhấn mạnh ra sao — những tiêu chuẩn phán đoán này mới là cốt lõi.

> Tham khảo quy chuẩn thiết kế, không phải để làm "giống ai", mà là học cách người khác đưa ra phán đoán.

:::: info Tại sao bây giờ vẫn cần học những điều này
Các quy tắc thiết kế đã được huấn luyện vào mô hình, được công cụ thiết kế hấp thụ mặc định, thậm chí chỉ cần dán vài screenshot AI đã có thể học được. Nhưng chúng ta vẫn cần biết những quy tắc này đến từ đâu, tại sao lại quy định như vậy.
::::

## Trước hết xem vài đoạn nguyên văn, cảm nhận khoảng cách

Nếu bạn trước đây nghĩ "quy chuẩn thiết kế chẳng phải chỉ nói về phong cách thôi sao", hãy xem trước vài câu nguyên văn chính thức.

Bình thường trong đội nhóm chúng ta thường nói như thế này:

- Làm một dropdown
- Ở đây đặt một menu
- Thêm vài chức năng vào thanh menu
- Ở đây đặt hai nút, một xác nhận một hủy

Nghe có vẻ không có vấn đề, nhưng trong quy chuẩn của các công ty lớn, những từ này không phải là khái niệm mơ hồ, mà được phân tích rất chi tiết.

| Lời nói bình thường | Nguyên văn chính thức | Nói đơn giản |
| :--- | :--- | :--- |
| "Làm một menu" | Apple: [“A menu reveals its options...”](https://developer.apple.com/design/human-interface-guidelines/menus) | `Menu` là dùng để làm thao tác |
| "Đặt chức năng vào thanh menu" | Apple: [“menu bar menus contain all the commands...”](https://developer.apple.com/design/human-interface-guidelines/menus) | Đây là menu lệnh ở đầu ứng dụng |
| "Làm một dropdown" | Apple: [“A pop-up list lets the user choose one option among several.”](https://developer.apple.com/library/archive/documentation/Cocoa/Conceptual/MenuList/Articles/ManagingPopUpItems.html) | `pop-up` là chọn một cái từ danh sách |
| "Cũng làm một dropdown" | Apple: [“A pull-down list is generally used for selecting commands in a specific context.”](https://developer.apple.com/library/archive/documentation/Cocoa/Conceptual/MenuList/Articles/ManagingPopUpItems.html) | `pull-down` là bấm mở để làm thao tác hiện tại |
| "Menu cũng có thể dùng để lọc đúng không" | Fluent: [“If you need to collect information from people, try a select, dropdown, or combobox instead.”](https://fluent2.microsoft.design/components/web/react/core/menu/usage) | `Menu` không phải để chọn giá trị |
| "Menu cũng có thể làm điều hướng đúng không" | Material: [“Menus should not be used as a primary method for navigation within an app.”](https://m1.material.io/components/menus.html) | `Menu` không phải điều hướng chính |
| "Nút bấm cứ viết OK / Cancel thôi" | Apple: [“Always use ‘Cancel’ to title a button that cancels the alert’s action.”](https://developer.apple.com/design/human-interface-guidelines/alerts) | Văn bản nút không thể viết tùy tiện |

> Các trích dẫn trong bảng đều có thể nhấp trực tiếp để đến trang chính thức tương ứng.

Đây chính là điều dễ gây ấn tượng mạnh nhất khi lần đầu tiên thực sự xem quy chuẩn thiết kế:

> Chúng ta bình thường tưởng mình đang thảo luận về UI, nhưng thực tế rất nhiều lúc chỉ đang giao tiếp bằng một đống từ ngữ mơ hồ.

Apple sẽ không chỉ nói "làm một menu"; nó sẽ tiếp tục phân biệt:

- `menu`
- `menu bar menu`
- `pop-up button`
- `pull-down button`
- `context menu`

Fluent sẽ không chỉ nói "dropdown"; nó sẽ tiếp tục phân biệt:

- `menu`
- `dropdown`
- `select`
- `combobox`

Đây chính là sự cần thiết của quy chuẩn thiết kế.

Nó không phải để làm trang có vẻ chuyên nghiệp hơn, mà là để khi đội nhóm thảo luận về UI, trong đầu mỗi người không còn là những thứ khác nhau nữa.

Chỉ nhìn tên thì khó thấy được sự khác biệt. Hai điều khiển dưới đây trông gần như giống hệt nhau. Bạn hãy mở từng cái và chọn thử một mục để xem chúng hoạt động khác nhau thế nào.

<UiSpecLookalikeControlsDemo />

Trong quy chuẩn Apple, mỗi điều khiển có một trang riêng. Bạn có thể đối chiếu [Pop-up buttons](https://developer.apple.com/design/human-interface-guidelines/pop-up-buttons) và [Pull-down buttons](https://developer.apple.com/design/human-interface-guidelines/pull-down-buttons).

## Bạn sẽ học được gì

1. Tại sao khi thiết kế trang và nút bấm cần xem quy chuẩn thiết kế trước
2. Trong các quy chuẩn Apple, Material, Fluent, Atlassian, nội dung nào đáng tham khảo nhất
3. Cách thiết kế rõ ràng "cấp bậc trang" và "cấp bậc nút bấm"
4. Một quy chuẩn trưởng thành định nghĩa nút bấm chi tiết đến mức nào
5. Cách để AI tham khảo quy chuẩn của người khác để tạo trang và nút bấm

Mỗi phần đều có hình minh họa để bạn tự tay thử.

## 1. Tại sao quy chuẩn thiết kế có thể giúp bạn làm rõ trang

Sau khi xem những nguyên văn trên, bạn sẽ phát hiện một điểm quan trọng:

**Quy chuẩn thiết kế không phải điểm tô, mà là trước hết nói chính xác từ ngữ.**

Nhiều trang không đẹp, không phải vì màu sắc không đủ cao cấp, mà vì cấp bậc thông tin lộn xộn.

Hãy xem một ví dụ. Dưới đây là hai cách thiết kế cùng một trang danh sách dự án. Văn bản giống hệt nhau, tôi chỉ thay đổi cấp bậc. Bạn có thể thử như sau.

- Di chuột lên một hàng trong bảng bên dưới. Cả hai hình sẽ đồng thời đánh dấu vị trí của vấn đề
- Thử bật tắt các công tắc phía trên hình bên phải để xem trang trở lại ra sao khi bỏ từng cải tiến
- Kéo thanh “Thử nheo mắt”. Khi hình mờ đi, mọi thứ bên trái vẫn tranh nhau thu hút sự chú ý, còn bên phải chỉ thấy rõ tiêu đề và nút chính

<UiSpecHierarchyCompareDemo />

Nhiều nút không dễ dùng, cũng không phải vì bo góc không đúng, mà vì:

- Nút chính quá nhiều, người dùng không biết nên nhấn cái nào
- Nút nguy hiểm và nút bình thường trông giống nhau
- Tất cả nút trong trang đều tranh giành sự chú ý
- Phong cách và ngữ nghĩa của nút không nhất quán giữa các trang khác nhau

Quy chuẩn thiết kế trưởng thành được xây dựng để giải quyết những vấn đề này. Chúng thường sẽ định nghĩa:

| Nội dung quy chuẩn | Nó giải quyết vấn đề gì |
| :--- | :--- |
| **Cấp bậc trang** | Nhìn đâu trước, nhìn đâu sau, thông tin tổ chức thế nào |
| **Nền tảng thị giác** | Màu sắc, khoảng cách, font chữ, bo góc, bóng đổ thống nhất thế nào |
| **Cấp bậc nút bấm** | Nút chính, nút phụ, nút văn bản, nút nguy hiểm phân biệt thế nào |
| **Quy tắc trạng thái** | hover, focus, disabled, loading thể hiện thế nào |
| **Ngữ nghĩa tương tác** | Nút nào là "xác nhận", nút nào là "hủy", nút nào là "thao tác thêm" |

Vì vậy, quy chuẩn thiết kế thực sự cung cấp không phải là một "lớp da", mà là một **tiêu chuẩn phán đoán**.

### 1.1 Có gì bên trong một bộ quy chuẩn thực tế?

Bảng trên chỉ có năm hàng nên mới cho bạn cái nhìn khái quát. Bạn có thể thắc mắc một bộ quy chuẩn thiết kế thực tế có bao nhiêu nội dung.

Hãy cùng đếm các mục trong quy chuẩn Apple. Thử nhấp vào các chủ đề bên dưới rồi dùng công tắc ở trên để lọc những mục liên quan đến trang và nút bấm.

<UiSpecSpecMapDemo />

Trong chương này, bạn chỉ cần hiểu những phần liên quan nhất đến trang và nút bấm. Nếu muốn xem toàn bộ mục lục, hãy mở [Apple HIG](https://developer.apple.com/design/human-interface-guidelines/).

## 2. Khi tham khảo quy chuẩn công ty lớn, tập trung vào điều gì

Mỗi bộ quy chuẩn có thế mạnh riêng. Bảng dưới đây giúp bạn xác định nên tìm câu trả lời ở đâu.

| Bạn muốn biết | Có thể xem Apple | Có thể xem Material |
| :--- | :--- | :--- |
| Cần định nghĩa component chi tiết đến đâu | Mục đích, vai trò, hành vi và khả năng tiếp cận | Cấu trúc, cấu hình phong cách và trạng thái |
| Trang thể hiện cấp bậc thế nào | Quan hệ điều hướng, kiểu chữ, thứ tự ưu tiên giữa nội dung và điều khiển | Khung trang và vị trí của điều hướng, nội dung, thao tác |
| Phân chính phụ giữa các thao tác thế nào | Xác định riêng vai trò của nút và mức độ nổi bật | Các mức nhấn mạnh Filled, Tonal, Outlined, Text |
| Làm sao để tiết chế | Giảm lặp lại và đặt các lệnh liên quan cạnh nhau | Mỗi khu vực chỉ đảm nhiệm một việc |

Bạn nên chọn một bộ quy chuẩn rồi áp dụng nhất quán từ đầu đến cuối. Chẳng hạn, ghép hiệu ứng kính của Apple với cả bộ phong cách nút của Material thường làm mất các quy tắc của cả hai bên.

### 2.1 Tham khảo Apple: Học cách "định nghĩa đủ chi tiết"

Điều đáng học nhất ở Apple không chỉ là sự kiềm chế thị giác, mà là nó sẽ định nghĩa khái niệm rất chi tiết.

Cùng là "menu" hoặc "dropdown" trong miệng nhiều đội nhóm, Apple sẽ tiếp tục phân tích nhỏ:

- `menu`: Một nhóm lệnh, tùy chọn hoặc trạng thái
- `menu bar menu`: Tập hợp lệnh cấp ứng dụng
- `pop-up button`: Chọn một giá trị
- `pull-down button`: Kích hoạt lệnh trong ngữ cảnh hiện tại
- `context menu`: Các hành động thường dùng liên quan đến đối tượng hoặc nhiệm vụ hiện tại

Sự phân biệt này rất quan trọng, vì nó sẽ trực tiếp ảnh hưởng đến:

- Component này dùng để chọn giá trị, hay dùng để làm hành động
- Nó thuộc về cục bộ trang, hay thuộc về cấp ứng dụng
- Nó nên hiển thị lâu dài giá trị đã chọn, hay chỉ tạm thời mở rộng lệnh

Khi bạn bắt đầu suy nghĩ theo mức độ chi tiết này, trang bạn thiết kế sẽ lập tức rõ ràng hơn nhiều.

#### Cần định nghĩa một nút chi tiết đến đâu?

“Định nghĩa đủ chi tiết” là thế nào? Hãy thử với một nút đơn giản. Khi nói “thêm một nút”, có thể bạn chỉ nghĩ đến màu xanh, bo góc và chiều cao 40. Một bộ quy chuẩn trưởng thành sẽ hỏi tiếp 10 câu. Bản đặc tả dưới đây liệt kê từng câu. Hãy mở từng mục bên trái để xem cần mô tả chi tiết đến đâu.

<UiSpecButtonSpecDemo />

Xem xong, bạn sẽ thấy màu sắc, bo góc và cỡ chữ chỉ là một phần nhỏ. Định nghĩa đủ chi tiết sẽ giúp một nhà thiết kế hoặc kỹ sư khác làm ra đúng thứ bạn hình dung mà không cần hỏi lại.

Trạng thái và hành vi dễ bị bỏ sót nhất vì ảnh chụp tĩnh không cho thấy chúng. Hãy thử di chuột lên nút, nhấn giữ, dùng phím Tab để đưa tiêu điểm đến nút, rồi nhấp vào “Xuất bản dự án” để xem toàn bộ quá trình.

<UiSpecButtonStatesDemo />

Muốn xem nút trong quy chuẩn chính thức trông thế nào, hãy mở trang [Buttons](https://developer.apple.com/design/human-interface-guidelines/buttons) của Apple và trang [Buttons](https://m3.material.io/components/buttons/overview) của Material.

Giờ hãy nhìn lại hai điều khiển thả xuống trông giống nhau ở đầu chương. Bạn sẽ thấy vì sao chúng không thể thay thế cho nhau. Ngoài hình thức, quy chuẩn còn định nghĩa **điều người dùng có thể trông đợi khi dùng điều khiển**. Một bên giúp bạn đổi giá trị, bên kia thực hiện một thao tác cho bạn.

Điều này cũng giải đáp một thắc mắc thường gặp. Vì sao “Xóa” nguy hiểm mà không nên là nút nổi bật nhất? Vai trò cho biết thao tác có rủi ro hay không. Phong cách thể hiện mức độ quan trọng của thao tác đó.

Quy chuẩn còn có nhiều cặp điều khiển trông giống nhau nhưng phục vụ mục đích khác nhau. Dưới đây là vài cặp thường gặp. Lần sau khi gặp chúng, hãy tự hỏi người dùng muốn làm gì khi nhấn vào.

| Hai điều khiển dễ nhầm | Mỗi điều khiển phụ trách việc gì | Ví dụ |
| :--- | :--- | :--- |
| Điều hướng bằng tab / Thanh công cụ | Tab chuyển giữa các khu vực lớn. Thanh công cụ chứa thao tác trên trang hiện tại | “Dự án” và “Cài đặt” là nơi để đến. “Xóa mục đã chọn” là việc để làm |
| Công tắc / Nút bấm | Công tắc chuyển giữa hai trạng thái. Nút kích hoạt một hành động | “Nhận thông báo” dùng công tắc. “Gửi” dùng nút |
| Bộ chọn / Menu | Bộ chọn cho phép chọn một giá trị. Menu thực thi lệnh | “Sắp xếp theo lần cập nhật gần nhất” dùng bộ chọn. “Đổi tên” đặt trong menu |
| Hộp thoại xác nhận / Bảng bên | Hộp thoại xác nhận đưa ra thông tin quan trọng cần biết ngay. Bảng bên dành cho một nhiệm vụ có phạm vi rõ ràng | “Bạn có chắc muốn xóa?” dùng hộp thoại xác nhận. “Tạo thư mục” dùng bảng bên |

### 2.2 Tham khảo Apple: Học cấp bậc trang và sự kiềm chế

Apple Human Interface Guidelines đặc biệt phù hợp để học hai điều:

- Trang thiết lập cấp bậc rõ ràng thế nào
- Điều khiển giữ rõ ràng dưới tiền đề không lấn át

Apple nhấn mạnh `Hierarchy`, `Harmony`, `Consistency`. Điều này có nghĩa là khi thiết kế trang cần trả lời:

- Thông tin quan trọng nhất của trang hiện tại là gì
- Nhiệm vụ chính của người dùng là gì
- Thao tác nào nên nổi bật nhất, thao tác nào nên lùi lại

Nếu bạn tham khảo Apple để thiết kế trang, có thể tập trung tham khảo:

- Thông tin màn hình đầu không nên quá vụn, nội dung cốt lõi tập trung trước
- Dùng khoảng trắng, kích thước font, nhóm để tạo trật tự, thay vì chất nhiều viền
- Nút không nên tất cả đều nhấn mạnh cao, chỉ hành động quan trọng mới nên nổi bật nhất

#### Minh họa cấu tạo của trang

Những gợi ý trên trông thế nào khi áp dụng vào một trang thực tế? Hãy di chuột lên một tầng bên trái hoặc nhấp để giữ vùng đánh dấu. Hình bên phải sẽ cho biết tầng đó nằm ở đâu và thu hút sự chú ý bằng cách nào. Bật “Hiện đường căn” để xem các khoảng cách được bố trí ra sao.

<UiSpecPageAnatomyDemo />

Khi xem hình bên phải, hãy để ý ba chi tiết sau.

- **Cỡ chữ, độ đậm và sắc độ tạo nên cấp bậc.** Chữ lớn nhất chỉ xuất hiện một lần trên trang. Bạn không cần in đậm mọi tiêu đề
- **Thông tin phụ trợ nằm ngay cạnh thông tin chính mà nó giải thích**, dùng chữ nhỏ và nhạt hơn nhưng vẫn dễ đọc
- **Chỉ có một nút chính**, đặt sau phần nội dung để người dùng đọc xong rồi mới thao tác

Bạn có thể xem cách Apple giải thích trong [Layout](https://developer.apple.com/design/human-interface-guidelines/layout) và [Typography](https://developer.apple.com/design/human-interface-guidelines/typography).

#### Minh họa vì sao bỏ đường viền có thể giúp trang rõ hơn

Câu “dùng khoảng trắng, cỡ chữ và cách phân nhóm để tạo trật tự” dễ khiến bạn nghĩ rằng cứ xóa hết đường viền là được. Có đúng vậy không? Hãy nhấp lần lượt vào ba bước bên dưới để xem từ bước nào các nhóm bắt đầu hiện rõ.

<UiSpecGroupingDemo />

Đến bước ba, bạn sẽ thấy khoảng cách mới là thứ tạo nên nhóm. Khi các nội dung liên quan nằm gần nhau, bạn sẽ tự nhận ra chúng thuộc cùng một nhóm dù không có đường viền. Vì vậy, hãy **phân nhóm trước rồi quyết định có cần đường viền hay không**. Chỉ thêm màu nền hoặc đường viền cho nhóm thực sự cần có ranh giới rõ hơn.

Trang [Toolbars](https://developer.apple.com/design/human-interface-guidelines/toolbars) của Apple có hình so sánh trước và sau minh họa đúng điểm này. Hãy đặt các lệnh liên quan trong cùng một nhóm.

### 2.3 Tham khảo Material: Học cấu trúc trang rõ ràng

Material Design rất phù hợp để học "trang tổ chức luồng nhiệm vụ thế nào".

Nhiều component và quy chuẩn layout của nó, cốt lõi đều giúp bạn làm rõ:

- Trang là loại duyệt, hay loại thực thi nhiệm vụ
- Trang hiện tại là để người dùng đọc, chọn, hay nộp
- Trong một trang, yếu tố nào nên lặp lại ổn định, yếu tố nào nên phản hồi thay đổi ngữ cảnh

Nếu bạn tham khảo Material để thiết kế trang, có thể tập trung tham khảo:

- Khu vực trang rõ ràng, trách nhiệm module xác định
- Điều hướng, khu vực nội dung, khu vực thao tác phân công rõ ràng
- Các phong cách nút khác nhau tương ứng với mức độ ưu tiên thao tác khác nhau

#### Minh họa nhiệm vụ của điều hướng, nội dung và thao tác

Nói “phân công rõ ràng” thì dễ, nhưng cụ thể phải chia thế nào? Material chia trang thành ba phần theo nhiệm vụ. Điều hướng cho biết đi đâu, nội dung cho biết xem gì, còn thao tác cho biết làm gì. Mỗi thao tác cũng cần cho thấy nó ảnh hưởng đến đối tượng nào.

Hình dưới đây phân tích một trang theo cách đó. Hãy di chuột lên một mục bên trái để xem đường liền và đường nét đứt lần lượt chỉ vào đâu.

<UiSpecPageSkeletonDemo />

Khi xem, bạn có thể để ý ba điểm.

- **Hai bên thanh trên cùng có nhiệm vụ riêng.** Nút quay lại và tiêu đề nằm bên trái, các thao tác nằm bên phải và chỉ một nút ở đó nổi bật. Các thao tác liên quan nằm cạnh nhau, nhóm không liên quan thì cách nhau. Đó là cách tiết chế
- **Phạm vi ảnh hưởng của các thao tác có thể rất khác nhau.** “Tạo dự án” ảnh hưởng đến cả danh sách, còn “Mở” chỉ ảnh hưởng đến một mục
- **Đặt sai vị trí sẽ khiến phạm vi khó hiểu.** Bật “Thử chuyển nút Xóa lên thanh trên cùng” để thấy bạn không thể biết nút đó sẽ xóa mục nào

Bạn có thể xem hình gốc trong [Toolbars](https://developer.apple.com/design/human-interface-guidelines/toolbars) của Apple và [Layout](https://m3.material.io/foundations/layout/layout-overview/overview) của Material.

### 2.4 Tham khảo Fluent: Học ranh giới component và cấp bậc nút

Fluent 2 rất phù hợp cho sản phẩm backend, công cụ và hệ thống form phức tạp. Điều đáng học nhất là nó sẽ trực tiếp nói cho bạn biết "đừng lẫn lộn khái niệm".

Ví dụ nó ghi rõ: nếu bạn muốn "collect information", thì đừng tiếp tục dùng `menu`, mà nên cân nhắc `select`, `dropdown`, `combobox`.

Câu nói này rất quan trọng, vì nó phá vỡ "cũng gần giống nhau" trong đầu nhiều người.

Fluent 2 cũng rất chú trọng:

- Cấp bậc thao tác
- Ranh giới ngữ nghĩa component
- Độ rõ ràng trong kịch bản thông tin dày đặc

Nếu bạn tham khảo Fluent để thiết kế nút, có thể tập trung tham khảo:

- `Primary button` dùng để gánh hành động quan trọng nhất hiện tại
- `Secondary button` dùng để gánh hành động hỗ trợ
- Các nút nhấn mạnh yếu như `Subtle`, `Transparent` dùng cho thao tác không nên tranh luồng chính
- Càng nhiều nút trong trang, càng cần kiểm soát mức độ ưu tiên thị giác

#### Minh họa cách dùng bốn cấp nút

“Kiểm soát mức độ ưu tiên thị giác” cụ thể là làm gì? Hãy tự thử trong phần minh họa bên dưới.

<UiSpecFluentButtonsDemo />

### 2.5 Tham khảo Atlassian: Học quản lý trang và nút bấm theo hệ thống

Atlassian Design System đặc biệt phù hợp cho tình huống "một đội nhóm làm nhiều trang". Nó nhấn mạnh:

- foundations là nền tảng chia sẻ
- tokens là phương pháp thống nhất quyết định thị giác
- components là thành phần tương tác được tái sử dụng lặp đi lặp lại

Nếu bạn tham khảo Atlassian để làm trang và nút, giá trị nhất là:

- Làm kích thước, màu sắc, bo góc, khoảng cách nút thành quy tắc thống nhất
- Cố định nhịp điệu layout trang
- Để các trang khác nhau tuy nội dung khác nhưng ngôn ngữ cấu trúc nhất quán

#### Minh họa cách chuyển phong cách thành token

“Quy tắc thống nhất” nghe có vẻ trừu tượng. Hãy kéo các thanh trượt bên phải rồi bật “Mỗi trang dùng một bộ giá trị” để thấy sự khác biệt khi có và khi thiếu quy tắc chung.

<UiSpecTokensDemo />

## 3. Khi thiết kế trang, nên tham khảo những điểm nào trong quy chuẩn

Khi bạn xem một hệ thống thiết kế, đừng hỏi trước "trang này đẹp không", mà hãy hỏi trước mấy câu hỏi dưới đây.

### 3.1 Nhìn trang lần đầu, chính phụ có rõ ràng không

Một trang thường ít nhất phải có ba tầng:

- **Thông tin chính**: Nội dung quan trọng nhất của trang hiện tại
- **Thông tin phụ trợ**: Nội dung giúp hiểu hoặc bổ sung
- **Thao tác cấp hai**: Hành động không nên can thiệp nhiệm vụ chính

Nếu ba tầng không được phân biệt rõ, trang sẽ "đều quan trọng", tương đương với "đều không quan trọng".

Hãy kéo thanh trượt bên dưới để tự tay tách rõ ba tầng.

<UiSpecThreeLayersDemo />

### 3.2 Layout trang, có phục vụ nhiệm vụ thay vì chất module không

Khi tham khảo quy chuẩn, có thể đặc biệt chú ý:

- Khu vực tiêu đề có làm rõ mục tiêu trang không
- Khu vực nội dung chính có xoay quanh nhiệm vụ tổ chức không
- Nút thao tác có gần nội dung liên quan không
- Thông tin thứ cấp có được làm yếu đi không

Điểm cuối đáng để xem kỹ hơn. Làm nhẹ thông tin thứ cấp thường bắt đầu bằng việc đặt nó đúng chỗ.

<UiSpecTaskFlowLayoutDemo />

### 3.3 Thao tác trong trang, có mức độ ưu tiên không

Nhiều trang nhìn qua có 6 nút, kết quả mỗi nút đều giống CTA, đây là cấp bậc mất kiểm soát điển hình.

Cách hợp lý hơn là:

- Một khu vực thường chỉ có một thao tác chính
- Thao tác cấp hai có thể dùng viền, nút văn bản hoặc phong cách yếu hơn
- Hành động rủi ro không nên trông giống hành động chính

Bạn đã thấy hai cách xử lý vấn đề này. Hình so sánh ở mục 1 cho thấy điều gì xảy ra khi có quá nhiều nút nổi bật, còn minh họa Fluent ở mục 2.4 cho thấy cách phân cấp chúng.

### 3.4 Làm sao biết nên nhấn mạnh hay làm nhẹ phần nào?

Bạn có thể quay lại mục 1 và kéo thanh “Thử nheo mắt” một lần nữa. Khi trang mờ đến mức không đọc được chữ, những gì vẫn nhìn thấy chính là những phần thu hút sự chú ý nhất. Hãy tham khảo cách phân chia sau để quyết định phần nào nên nổi bật.

- **Nên nhấn mạnh**: Tiêu đề trang, nội dung cốt lõi của nhiệm vụ hiện tại, thao tác chính tiếp theo
- **Nên làm nhẹ**: Siêu dữ liệu, giải thích bổ sung, lối vào thứ cấp
- **Tuyệt đối không nên nhấn mạnh**: Đường viền trang trí, tiêu đề gắn vào mọi module, nút phụ lấn át thao tác chính

Nếu làm mờ xong mà cả màn hình đầy những mảng tối có kích thước gần bằng nhau, mọi thứ đang cùng hô “nhìn tôi” và chẳng có gì thật sự nổi bật.

## 4. Khi thiết kế nút, nên tham khảo những điểm nào trong quy chuẩn

Nút là phần dễ bị "thiết kế tùy tiện" nhất, nhưng cũng là phần dễ bộc lộ hệ thống có trưởng thành hay không nhất.

### 4.1 Nút trước hết phân "ngữ nghĩa", rồi mới phân "phong cách"

Đừng nghĩ trước "nút xanh hay nút đen", hãy nghĩ trước nút này đóng vai trò gì.

Vai trò nút phổ biến có thể phân như sau:

| Loại nút | Tác dụng | Chiến lược phong cách phổ biến |
| :--- | :--- | :--- |
| **Primary** | Hành động quan trọng nhất trong khu vực hiện tại | Đặc, tương phản cao, nổi bật nhất |
| **Secondary** | Hành động hỗ trợ | Viền hoặc nhấn mạnh thấp hơn một cấp |
| **Tertiary / Text** | Thao tác yếu | Văn bản hoặc tỷ trọng thị giác thấp |
| **Destructive** | Các thao tác rủi ro như xóa, vô hiệu hóa, xóa sạch | Màu cảnh báo hoặc phong cách rủi ro rõ ràng |
| **Icon button** | Thao tác công cụ cục bộ | Ngắn gọn, gần ngữ cảnh |

Khi đặt lên trang, chúng trông như thế này.

<UiSpecRoleSamplesDemo />

### 4.2 Một trang không nên có quá nhiều Primary Button

Đây là cái bẫy dễ giẫm nhất của nhiều người mới.

Nếu trên trang có 4 nút chính, thì tương đương không có nút chính. Ý nghĩa của nút chính vốn dĩ là "nói cho người dùng biết bây giờ nên làm gì nhất".

Bạn có thể tham khảo cách làm chung của nhiều hệ thống thiết kế:

- Một khu vực chính thường chỉ giữ một nút chính
- Hủy, quay lại, đóng thường không tranh cùng cấp với nút xác nhận
- Thêm thao tác đặt vào nút cấp hai hoặc menu

#### Đến lượt bạn quyết định

Hiểu quy tắc mới là bước đầu. Trang dưới đây có 5 nút trông giống hệt nhau. Theo bạn, nút nào nên là nút chính?

<UiSpecButtonDecisionDemo />

Làm xong, bạn sẽ thấy việc phân cấp xoay quanh ba câu hỏi. Người dùng muốn hoàn thành việc gì nhất? Thao tác nào chỉ hỗ trợ? Thao tác nào đã làm thì không thể hoàn tác? Lần sau khi phân nút chính và nút phụ, hãy thử tự hỏi ba câu này.

### 4.3 Nút phải có thể thể hiện thay đổi trạng thái

Quy chuẩn thiết kế thường viết rất rõ về trạng thái nút:

- Trạng thái mặc định
- Trạng thái hover
- Trạng thái focus
- Trạng thái disabled
- Trạng thái loading
- Trạng thái nguy hiểm

Điều này rất quan trọng, vì nút không phải là một bức ảnh tĩnh, mà là một trong những điều khiển được kích hoạt thường xuyên nhất trong quá trình người dùng thao tác.

Để xem sáu trạng thái này trông ra sao và phân biệt thế nào, hãy quay lại phần minh họa trạng thái và hành vi của nút ở mục 2.1.

### 4.4 Văn bản nút, cũng thuộc một phần của thiết kế

Văn bản nút không chỉ là "vấn đề copywriting", nó trực tiếp ảnh hưởng đến sự hiểu biết của người dùng.

Ví dụ:

- `Lưu`
- `Lưu thay đổi`
- `Xuất bản ngay`
- `Xóa dự án`
- `Chuyển vào thùng rác`

Những văn bản này truyền đạt kỳ vọng tâm lý hoàn toàn khác nhau. Quy chuẩn trưởng thành thường yêu cầu nhãn nút thể hiện rõ hành động, thay vì sử dụng từ ngữ mơ hồ.

Dưới đây là vài cách viết mơ hồ thường gặp và cách sửa.

| Cách viết mơ hồ | Cách viết rõ hơn | Vì sao |
| :--- | :--- | :--- |
| Xác nhận | Lưu bản nháp | Nhìn là biết nhấn vào sẽ xảy ra chuyện gì |
| Gửi | Xuất bản bài viết | Có động từ và đối tượng cụ thể nên không cần đoán |
| Có / Không | Xóa dự án / Hủy | Ghi thẳng kết quả lên nút |
| Nhấp vào đây | Xem chi tiết đơn hàng | Đọc riêng nhãn nút cũng biết sẽ đi đâu |
| OK | Gửi lại email | Một trang có thể có vài nút OK và rất khó phân biệt |

## 5. Một danh sách thiết kế trang và nút rất thực dụng

Khi bạn tự thiết kế trang, có thể xem nhanh qua danh sách này trước:

### Danh sách trang

- Tiêu đề trang có nói rõ nhiệm vụ hiện tại không
- Thông tin quan trọng nhất màn hình đầu có nhìn thấy ngay không
- Trang có tổ chức theo luồng nhiệm vụ, thay vì nghĩ đến gì đặt nấy không
- Trong cùng một khu vực có chỉ có một thao tác chính không
- Nội dung thứ cấp có được làm yếu phù hợp không
- Người dùng có luôn biết mình đang ở đâu và quay lại bằng cách nào không
- Trang hiển thị gì khi đang tải, khi không có dữ liệu và khi yêu cầu thất bại
- Khi thu hẹp cửa sổ hoặc tăng cỡ chữ, nội dung có bị che hay cắt mất không

### Danh sách nút

- Nút này là thao tác chính hay thao tác phụ
- Tại sao nó đáng nổi bật hơn nút khác
- Trong trang có quá nhiều nút chính không
- Thao tác nguy hiểm có được đánh dấu rõ ràng không
- Văn bản nút có đủ cụ thể không
- Sau khi nhấn, người dùng có biết ngay hệ thống đã nhận thao tác và kết quả ra sao không
- Chỉ dùng bàn phím, người dùng có đưa tiêu điểm đến nút và nhìn rõ tiêu điểm đang ở đâu không

### Mẫu định nghĩa có thể tái sử dụng

Danh sách giúp bạn kiểm tra, còn mẫu giúp bạn triển khai. Hãy thử điền bảng dưới đây để hoàn thành định nghĩa cơ bản cho một trang hoặc component.

| Mục cần định nghĩa | Cách điền |
| :--- | :--- |
| **Nhiệm vụ** | [Ai] trong [tình huống] sẽ dùng trang này để hoàn thành [nhiệm vụ] và đạt được [kết quả có thể kiểm chứng] |
| **Cấp bậc** | Thông tin chính [ ], thông tin phụ trợ [ ], nội dung hiển thị trước theo mặc định [ ] |
| **Thao tác** | Thao tác chính [ ], thao tác phụ [ ], thao tác nguy hiểm [ ] và cách bảo vệ [ ] |
| **Thị giác** | Các component cần dùng [ ], quy tắc về cỡ chữ, màu sắc và khoảng cách [ ] |
| **Trạng thái** | Đang tải [ ], không có dữ liệu [ ], thất bại [ ], thành công [ ], không khả dụng [ ] |
| **Khả năng tiếp cận** | Tên truy cập [ ], thứ tự điều hướng bằng bàn phím và thứ tự đọc [ ], độ tương phản [ ] |
| **Khả năng thích ứng** | Cửa sổ hẹp [ ], cỡ chữ lớn [ ], văn bản dài [ ] |
| **Ranh giới** | Khi nào nên tránh dùng [ ], phương án thay thế [ ] |

Cách kiểm tra rất đơn giản. Hãy nhờ một người chưa tham gia thiết kế chỉ dựa vào bảng này để kể lại toàn bộ quá trình vào trang, xem nội dung, thao tác, gặp lỗi rồi thoát. Nếu họ phải hỏi bạn giữa chừng, bản định nghĩa vẫn cần được bổ sung.

## 6. Cách dùng AI tham khảo quy chuẩn của người khác để thiết kế trang

Phần này thực dụng nhất.

Nhiều người khi để AI thiết kế trang, chỉ nói:

```md
Giúp tôi làm một trang cài đặt, cao cấp hơn một chút, tham khảo phong cách Apple
```

Loại prompt này quá mơ hồ, AI cuối cùng thường chỉ có thể bắt chước "nền trắng, bo tròn, bóng đổ".

Đối với người mới, cách thực dụng hơn không phải là tự tổng hợp một đoạn dài, mà là trực tiếp dán **câu then chốt trong nguyên văn quy chuẩn** cho AI.

Làm như vậy có hai lợi ích:

- Bạn không cần tự "dịch" tư tưởng thiết kế trước
- AI dễ hiểu trang và nút theo định nghĩa chính thức hơn

### 6.1 Ví dụ 1: Để AI tham khảo Apple thiết kế một trang cài đặt

Tìm một câu nguyên văn Apple trước:

> ["Establish a clear visual hierarchy..."](https://developer.apple.com/design/human-interface-guidelines/)

Bạn có thể trực tiếp dán cho AI như thế này:

```md
Tham khảo câu này từ Apple Human Interface Guidelines:
"Establish a clear visual hierarchy..."

Giúp tôi thiết kế một trang cài đặt bảo mật tài khoản.
Yêu cầu cấp bậc trang rõ ràng, thông tin quan trọng đặt trước, phân nhóm ngăn nắp.
```

Điểm quan trọng của cách viết này là: bạn không cần tự giải thích quá nhiều, trực tiếp dán nguyên văn của Apple vào.

### 6.2 Ví dụ 2: Để AI tham khảo Fluent thiết kế nút trang backend

Tìm một câu nguyên văn Fluent trước:

> ["Only use one primary button in a layout..."](https://fluent2.microsoft.design/components/web/react/core/button/usage)

Bạn có thể trực tiếp dán cho AI như thế này:

```md
Tham khảo câu này từ Fluent 2:
"Only use one primary button in a layout..."

Giúp tôi thiết kế nút cho trang quản lý đội nhóm backend.
Nút thêm thành viên nổi bật nhất, xuất, lọc, thêm thao tác yếu hơn, nút xóa nổi bật riêng.
```

Câu này rất phù hợp cho người mới, vì nó trực tiếp nói cho AI: một khu vực không nên đặt quá nhiều nút chính.

### 6.3 Ví dụ 3: Để AI đồng thời tham khảo quy chuẩn trang và quy chuẩn nút

Bạn cũng có thể dán hai câu nguyên văn cùng lúc, để AI đồng thời tham khảo trang và nút:

> Apple: ["Establish a clear visual hierarchy..."](https://developer.apple.com/design/human-interface-guidelines/)
>
> Fluent: ["Only use one primary button in a layout..."](https://fluent2.microsoft.design/components/web/react/core/button/usage)

Rồi trực tiếp viết như thế này:

```md
Tham khảo hai câu nguyên văn quy chuẩn thiết kế dưới đây:
Apple: "Establish a clear visual hierarchy..."
Fluent: "Only use one primary button in a layout..."

Giúp tôi thiết kế một trang chi tiết dự án.
Trang bao gồm giới thiệu dự án, thành viên, hoạt động gần đây và lối vào cài đặt.
Cấp bậc trang rõ ràng hơn, chỉ giữ một nút chính, nút khác yếu hơn.
```

Cách này đặc biệt phù hợp cho người mới, vì bạn chỉ cần biết sao chép nguyên văn, rồi thêm hai câu yêu cầu của mình là đủ.

### 6.4 Thực hành đưa quy tắc trong hình minh họa vào prompt

Những hình minh họa ở trên giúp bạn thấy từng quy tắc. Bạn cũng có thể biến từng quy tắc đó thành yêu cầu cho AI. Chẳng hạn, hãy lấy các cải tiến trong hình so sánh trước và sau ở mục 1 rồi viết thẳng vào prompt.

```md
Tham khảo quy chuẩn nút của Fluent 2 và Layout trong Apple HIG, giúp tôi thiết kế một trang danh sách dự án.

Yêu cầu cho trang:
- Tiêu đề trang có cỡ chữ lớn nhất và chỉ xuất hiện một lần; đặt bộ lọc và thao tác ở hai hàng riêng
- Dùng khoảng trắng và cỡ chữ để tạo cấp bậc, đừng thêm đường viền cho mọi module
- Cả trang chỉ giữ một nút chính (Tạo dự án), dùng nút viền cho thao tác xuất
- Xóa là thao tác với từng dự án, hãy đặt vào menu “Thao tác thêm” của mỗi mục, đừng đặt ở đầu trang

Yêu cầu cho nút:
- Định nghĩa sáu trạng thái của nút: mặc định, rê chuột, đang nhấn, có tiêu điểm, bị vô hiệu hóa và đang tải
- Dùng màu cảnh báo cho nút xóa và dành kiểu nút chính cho thao tác khác
```

Cách viết này cụ thể hơn nhiều so với “làm cao cấp hơn một chút, tham khảo phong cách Apple”, vì bạn cung cấp cho AI **tiêu chí cụ thể để đưa ra quyết định thiết kế**.

## 7. Cách dùng AI tham khảo quy chuẩn nút để trực tiếp tạo thiết kế nút

Nếu bạn chỉ muốn làm nút trước, cũng có thể trực tiếp dán nguyên văn quy chuẩn nút.

Ví dụ định nghĩa nút của Atlassian rất ngắn:

> ["A button triggers an event or action."](https://atlassian.design/components/button/)

Bạn có thể hỏi AI như thế này:

```md
Tham khảo câu này của Atlassian:
"A button triggers an event or action."

Giúp tôi thiết kế một bộ phong cách nút cho trang backend.
Tôi cần có nút chính, nút phụ, nút xóa, tiện thể nói cho tôi biết dùng ở đâu tương ứng.
```

Loại prompt này đặc biệt phù hợp cho người mới, cơ bản là "dán nguyên văn + nói yêu cầu".

## 8. Tổng kết

Tham khảo quy chuẩn thiết kế UI để thiết kế trang và nút bấm, điều quan trọng nhất không phải "làm giống ai", mà là học được mấy điều sau:

1. Dùng cấp bậc tổ chức trang, thay vì chất nội dung lên
2. Dùng phân cấp nút thể hiện mức độ ưu tiên thao tác, thay vì để tất cả nút đều tranh giành sự chú ý như nhau
3. Dùng định nghĩa, ranh giới và tiêu chuẩn phán đoán trong quy chuẩn thiết kế để dẫn dắt thiết kế
4. Khi để AI tham khảo quy chuẩn của người khác, tham khảo là "nguyên tắc và cấu trúc", chứ không phải chỉ tham khảo lớp da

Khi bạn sử dụng quy chuẩn như thế này, những gì bạn tham khảo được không chỉ là một phong cách, mà là một cách tư duy thiết kế trưởng thành.

---

## Tài liệu tham khảo

Các liên kết dưới đây đều đến từ hệ thống thiết kế chính thức hoặc tài liệu chính thức:

- Apple Human Interface Guidelines: [Overview](https://developer.apple.com/design/human-interface-guidelines/)
- Apple Human Interface Guidelines: [Menus](https://developer.apple.com/design/human-interface-guidelines/menus)
- Apple Human Interface Guidelines: [Alerts](https://developer.apple.com/design/human-interface-guidelines/alerts)
- Apple Human Interface Guidelines: [Buttons](https://developer.apple.com/design/human-interface-guidelines/buttons)
- Apple Archive: [How Menus Work](https://developer.apple.com/library/archive/documentation/Cocoa/Conceptual/MenuList/Articles/HowMenusWork.html)
- Apple Archive: [Managing Pop-Up Buttons and Pull-Down Lists](https://developer.apple.com/library/archive/documentation/Cocoa/Conceptual/MenuList/Articles/ManagingPopUpItems.html)
- Material Design: [Buttons overview](https://m3.material.io/components/buttons/overview)
- Material Design 3: [Layout overview](https://m3.material.io/foundations/layout/layout-overview/overview)
- Material Design 3: [Buttons accessibility](https://m3.material.io/components/buttons/accessibility)
- Apple Human Interface Guidelines: [Layout](https://developer.apple.com/design/human-interface-guidelines/layout)
- Apple Human Interface Guidelines: [Typography](https://developer.apple.com/design/human-interface-guidelines/typography)
- Apple Human Interface Guidelines: [Toolbars](https://developer.apple.com/design/human-interface-guidelines/toolbars)
- Apple Human Interface Guidelines: [Pop-up buttons](https://developer.apple.com/design/human-interface-guidelines/pop-up-buttons)
- Apple Human Interface Guidelines: [Pull-down buttons](https://developer.apple.com/design/human-interface-guidelines/pull-down-buttons)
- Material Design: [Menus](https://m1.material.io/components/menus.html)
- Microsoft Fluent 2: [Start designing](https://fluent2.microsoft.design/get-started/design)
- Microsoft Fluent 2: [Menu usage](https://fluent2.microsoft.design/components/web/react/core/menu/usage)
- Microsoft Fluent 2: [Button usage](https://fluent2.microsoft.design/components/web/react/core/button/usage)
- Atlassian Design System: [Foundations](https://atlassian.design/foundations/)
- Atlassian Design System: [Button](https://atlassian.design/components/button/)
