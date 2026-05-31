# Cách Xây Dựng Ứng Dụng iOS - Phát Triển Native SwiftUI

## Chương 1: Ứng Dụng iOS và Phát Triển Ứng Dụng iOS Là Gì

Trong hướng dẫn này, chúng ta sẽ hoàn thành một vòng lặp khép kín: **từ một ý tưởng trong đầu bạn đến một ứng dụng iOS thực sự có thể được cài đặt và chạy thành công trên iPhone.**

Để thực hiện hướng dẫn này, bạn ít nhất cần có:

1. Một Mac chạy macOS phiên bản tương đối mới
2. Một iPhone chạy phiên bản iOS tương đối mới, với chế độ nhà phát triển đã được bật
3. Xcode đã được cài đặt thành công
4. Trae đã được cài đặt và mở
5. Một Apple ID có thể sử dụng được

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image1.png)

### 1.1 Ứng Dụng iOS

Ứng dụng iOS là một ứng dụng native chạy trên hệ điều hành iPhone. Nó khởi động nhanh, hoạt động mượt mà và có thể sử dụng sâu các tính năng hệ thống như thông báo, camera và lưu trữ cục bộ.

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image2.png)

### 1.2 Phát Triển Ứng Dụng iOS

Về cốt lõi, việc xây dựng ứng dụng iOS chỉ bao gồm một số việc:

1. Làm rõ vấn đề mà ứng dụng của bạn đang giải quyết
2. Thiết kế giao diện người dùng có thể thấy và thao tác
3. Định nghĩa cách ứng dụng hoạt động dưới các hành động khác nhau
4. Xây dựng ứng dụng đúng cách và cài đặt lên iPhone

### 1.3 Các Cách Phổ Biến Để Xây Dựng Ứng Dụng iOS

Trong phát triển thực tế, có nhiều hơn một cách để xây dựng ứng dụng iOS. Chúng ta sẽ không đi sâu ở đây mà chỉ cung cấp một cái nhìn tổng quan.

Cách đầu tiên là cách native chính thức của Apple: tạo dự án trong Xcode và sử dụng Swift và SwiftUI để xây dựng giao diện và logic.

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image3.png)

Cách thứ hai là sử dụng các framework đa nền tảng, như React Native và Flutter, và điều chỉnh một mã nguồn cho nhiều nền tảng.

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image4.png)

Dựa trên các cách tiếp cận trên, hướng dẫn này chọn: **phát triển native SwiftUI làm nền tảng, với các công cụ AI đảm nhận phần lớn công việc lập trình.**

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image5.png)

### 1.4 Các Bước Phát Triển Ứng Dụng iOS Được Đề Cập Trong Hướng Dẫn Này (Xem Trước Tổng Quan)

Ứng dụng mẫu được sử dụng trong hướng dẫn này là **FridgeChef**.

Người dùng nhập các nguyên liệu hiện có trong tủ lạnh và ứng dụng sử dụng API AI thực để tạo một công thức khả thi, sau đó lưu kết quả cục bộ để xem lại sau. Ví dụ này bao gồm đầy đủ các phần cốt lõi của một ứng dụng iOS thực tế, bao gồm đầu vào và hiển thị UI, yêu cầu mạng, phân tích dữ liệu, lưu trữ cục bộ và cài đặt chạy cuối cùng trên thiết bị thực.

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image6.png)

- Ý tưởng tổng thể từ nguyên mẫu đến ứng dụng native

Trong triển khai, hướng dẫn này áp dụng phương pháp phân giai đoạn. Chúng ta sẽ đầu tiên sử dụng AI để nhanh chóng tạo một nguyên mẫu giao diện với HTML và CSS, xác nhận cấu trúc bố cục và hệ thống thông tin trong trình duyệt, sau đó di chuyển vào SwiftUI.

- Xem trước quy trình phát triển tổng thể

Nhìn chung, các chương sau sẽ đi qua các giai đoạn này theo thứ tự:

1. Xây dựng hiểu biết cơ bản
   Hiểu hình dạng của ứng dụng iOS, các phương pháp phát triển phổ biến và vấn đề mà ứng dụng mẫu này giải quyết.
2. Hoàn thành thiết lập môi trường
   Chuẩn bị Mac và iPhone, cập nhật hệ thống, cài đặt Xcode và Trae, và tạo một dự án iOS cơ bản có thể chạy thành công trong trình mô phỏng.
3. Bắt đầu phát triển chính thức
   Mở dự án trong Trae và dần dần tạo UI và tương tác cơ bản thông qua hội thoại với AI, biến ứng dụng từ vỏ rỗng thành thứ có thể sử dụng.
4. Gỡ lỗi và tổ chức
   Khi lỗi biên dịch xuất hiện hoặc hành vi không khớp với kỳ vọng, để AI giúp khắc phục; khi cấu trúc trở nên lộn xộn, sử dụng AI để tái cấu trúc và đơn giản hóa.
5. Chạy trên thiết bị thực
   Cấu hình ký, cài đặt ứng dụng lên iPhone thực và hoàn thành một lần xác minh đầy đủ từ mã đến phần cứng.

## Chương 2: Chuẩn Bị Môi Trường Phát Triển

### 2.1 Các Thiết Bị và Hệ Thống Cần Thiết

Trong thực hành này, hai phần cứng không thể thay thế: một Mac và một iPhone.
Đồng thời, cả hai thiết bị nên chạy **phiên bản hệ thống chính thức tương đối mới**.

#### 2.1.1 Mac

Ứng dụng iOS chỉ có thể được phát triển và biên dịch trên macOS. Đây là yêu cầu bắt buộc của nền tảng Apple.

Để đảm bảo Xcode có thể được cài đặt và sử dụng bình thường, bạn nên cập nhật macOS lên phiên bản chính thức tương đối mới trước. Bạn có thể kiểm tra và cập nhật từ **Cài đặt Hệ thống -> Cài đặt Chung -> Cập nhật Phần mềm**.

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image7.png)

#### 2.1.2 Thiết Bị iPhone Thực

Ngoài Mac, hướng dẫn này cũng yêu cầu một iPhone thực để xác minh xem ứng dụng có thể được cài đặt và khởi chạy chính xác hay không.

Để giữ quá trình gỡ lỗi trơn tru, iPhone cũng nên chạy phiên bản iOS tương đối mới. Bạn có thể kiểm tra và cập nhật từ **Cài đặt -> Cài đặt Chung -> Cập nhật Phần mềm**.

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image8.png)

Sau này trong phát triển, iPhone này sẽ được kết nối với Mac bằng cáp để gỡ lỗi trên thiết bị thực.

#### 2.1.3 Bật Chế Độ Nhà Phát Triển Trên iPhone

Để cài đặt và chạy ứng dụng gỡ lỗi từ Xcode trên thiết bị thực, bạn cần bật chế độ nhà phát triển trên iPhone.

Các bước:

1. Mở **Cài đặt**
2. Vào **Quyền riêng tư & Bảo mật**
3. Cuộn xuống dưới cùng và tìm **Chế độ Nhà phát triển**
4. Bật nó lên, sau đó khởi động lại thiết bị theo提示
5. Sau khi khởi động lại, mở khóa thiết bị và xác nhận bật chế độ nhà phát triển

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image9.png)

Nếu iPhone của bạn chưa từng được kết nối với Xcode hoặc các công cụ phát triển khác trước đây, bạn có thể thấy rằng **Chế độ Nhà phát triển** không xuất hiện trong **Quyền riêng tư & Bảo mật**. Đây không phải là vấn đề hệ thống - nó chỉ đơn giản là chế độ nhà phát triển chưa được kích hoạt.

Trong trường hợp đó, bạn có thể làm cho nó xuất hiện bằng cách làm theo các bước sau:

1. Mở **Cài đặt -> Quyền riêng tư & Bảo mật -> Phân tích & Cải thiện**
2. Bật **Chia sẻ với Nhà phát triển Ứng dụng**
3. Quay lại một cấp, vào **Quyền riêng tư & Bảo mật** lại và cuộn xuống dưới cùng
4. Bây giờ bạn sẽ thấy **Chế độ Nhà phát triển**, sau đó bật nó lên và khởi động lại thiết bị

Sau khi hoàn thành các bước trên, chế độ nhà phát triển chỉ cần được bật một lần. Các lần gỡ lỗi thiết bị thực sau này với Xcode sẽ không cần lặp lại cấu hình này.

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image10.png)

### 2.2 Phần Mềm Cần Thiết

Sau khi thiết bị và hệ thống đã sẵn sàng, bạn vẫn cần cài đặt phần mềm được sử dụng cho phát triển. Hướng dẫn này chỉ sử dụng hai loại công cụ: công cụ phát triển iOS chính thức và công cụ phát triển hỗ trợ AI.

#### 2.2.1 Xcode

Xcode là công cụ phát triển chính thức của Apple cho iOS. Trong hướng dẫn này, nó chủ yếu được sử dụng để tạo dự án iOS, biên dịch mã Swift / SwiftUI và chạy ứng dụng trên trình mô phỏng hoặc thiết bị thực.

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image11.png)

Xcode có thể được tìm thấy và cài đặt trực tiếp từ App Store. Sau khi cài đặt, khi mở lần đầu tiên, bạn sẽ thấy màn hình chào mừng. Việc tạo dự án sau này bắt đầu từ đó.

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image12.png)

#### 2.2.2 Trae

Trae là môi trường chính nơi công việc phát triển được thực hiện trong hướng dẫn này. Bạn sẽ đặt toàn bộ dự án iOS vào Trae và hợp tác với AI thông qua hội thoại để hoàn thành phát triển.

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image13.png)

### 2.3 Apple ID và Lưu Ý Về Gỡ Lỗi Phát Triển

Trên nền tảng iOS, để một ứng dụng có thể được cài đặt trên thiết bị thực, nó phải thông qua ký nhà phát triển. Hướng dẫn này không yêu cầu bạn trả phí tham gia Chương trình Nhà phát triển Apple. Một Apple ID cá nhân là đủ.

### 2.4 Danh Sách Kiểm Tra Trước Khi Tiếp Tục

Trước khi vào chương tiếp theo, bạn có thể so sánh trạng thái hiện tại của mình với danh sách kiểm tra dưới đây.

Bạn bây giờ đã nên có:

1. Một Mac chạy macOS phiên bản tương đối mới
2. Một iPhone chạy phiên bản iOS tương đối mới với chế độ nhà phát triển đã bật
3. Xcode đã được cài đặt thành công
4. Trae đã được cài đặt và mở
5. Một Apple ID có thể sử dụng được

Nếu tất cả những thứ này đã sẵn sàng, bạn có thể tiếp tục và tạo ứng dụng iOS đầu tiên của mình.

## Chương 3: Tạo Dự Án iOS Đầu Tiên

### 3.1 Sử Dụng Xcode Để Tạo Dự Án Mới

Mở Xcode. Trên màn hình chào mừng, chọn tạo dự án mới.

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image14.png)

Nhấp vào **Create new project** để vào màn hình chọn mẫu dự án.

### 3.2 Chọn Mẫu Ứng Dụng và Công Nghệ

Trên màn hình chọn mẫu, sử dụng cấu hình sau:

1. Nền tảng: iOS
2. Loại ứng dụng: App

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image15.png)

Nhấp vào **Next** để vào màn hình cấu hình thông tin dự án.

### 3.3 Cấu Hình Thông Tin Dự Án

Trên màn hình thông tin dự án, chỉ cần điền các cài đặt cơ bản:

1. Tên Sản phẩm: tên ứng dụng (ví dụ `FridgeChef`)
2. Nhóm: chọn Apple ID cá nhân của bạn
3. Định danh Tổ chức: định dạng tên miền đảo ngược (ví dụ `com.example`)
4. Bundle Identifier: được tạo tự động, giữ mặc định
5. Hệ thống Kiểm thử: Swift Testing with XCTest UI Tests
6. Lưu trữ: chọn Core Data (để lưu lịch sử công thức sau này)
7. Để các tùy chọn khác ở mặc định

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image16.png)

Nhấp vào **Next** và chọn vị trí lưu trữ dự án.

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image17.png)

### 3.4 Nhận Biết Cấu Trúc Dự Án Sau Khi Tạo

Sau khi dự án được tạo, Xcode sẽ tự động mở không gian làm việc. Lúc này, bạn không cần hiểu mọi file. Bạn chỉ cần nhận biết một số phần chính.

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image18.png)

Trong dự án mặc định, bạn sẽ thấy:

- Một thư mục được đặt theo tên dự án
- Một file Swift kết thúc bằng `App` (điểm vào ứng dụng)
- Một file `ContentView.swift` (trang mặc định)

Đây đã là ứng dụng iOS nhỏ nhất có thể chạy được.

### 3.5 Chạy Ứng Dụng iOS Đầu Tiên

Trước khi thay đổi bất kỳ mã nào, chạy dự án gốc trực tiếp.

Trong thanh công cụ phía trên của Xcode, giữ trình mô phỏng iPhone mặc định được chọn, sau đó nhấp nút **Run** ở phía trên bên trái.

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image19.png)

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image20.png)

Nếu mọi thứ bình thường, trình mô phỏng sẽ hiển thị một ứng dụng trống có thể khởi động thành công. Lần biên dịch đầu tiên có thể mất thời gian tương đối dài. Trong các chương sau, chúng ta giảm thời gian chờ bằng cách sử dụng nguyên mẫu HTML trước.

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image21.png)

Để dừng ứng dụng, nhấp **Stop** bên cạnh nút Run.

### 3.6 Những Gì Bạn Đã Thực Sự Đạt Được Ở Giai Đoạn Này

Mặc dù giao diện vẫn đơn giản, bạn đã hoàn thành một số xác nhận chính:

1. Dự án có thể biên dịch thành công
2. Trình mô phỏng có thể chạy ứng dụng chính xác
3. Quy trình phát triển đã được chứng minh hoạt động đầu-cuối

Điều này có nghĩa là các vấn đề trong tương lai sẽ chủ yếu tập trung vào **mã và logic**, thay vì vấn đề môi trường.

### 3.7 Chuyển Dự Án Cho Trae

Bắt đầu từ phần tiếp theo, công việc phát triển chính sẽ dần dần chuyển vào Trae.

Những gì bạn cần làm rất đơn giản: **mở thư mục dự án iOS bạn vừa tạo trong Trae.**

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image22.png)

## Chương 4: Thực Hành Phát Triển Có Hỗ Trợ AI - Xây Dựng FridgeChef Từ Đầu

Chương này là phần cốt lõi của toàn bộ hướng dẫn.

Hướng dẫn này không sử dụng lộ trình truyền thống "viết SwiftUI trước, biên dịch lặp lại và liên tục tinh chỉnh xem trước." Thay vào đó, chúng ta sử dụng quy trình hiệu quả hơn:
**đầu tiên sử dụng \*\***HTML\***\* để nhanh chóng xác minh cấu trúc giao diện, sau đó di chuyển kết quả đã xác nhận vào SwiftUI và cuối cùng dần dần hoàn thành logic nghiệp vụ, dữ liệu cục bộ và chi tiết tương tác.**

### 4.1 Giai Đoạn Một: Làm Rõ Yêu Cầu

Trước khi viết mã, bước đầu tiên không phải là xây dựng trang - mà là làm rõ những gì chúng ta đang xây dựng. **Để AI trước tiên đóng vai trò như một \*\***quản lý sản phẩm\***\* và tổ chức yêu cầu thành tài liệu đặc tả có cấu trúc.**

Trong cửa sổ chat của Trae, nhập hướng dẫn sau. Trae sẽ tạo file `REQUIREMENTS.md` trong thư mục gốc dự án, mô tả chức năng và cấu trúc của toàn bộ ứng dụng.

📋 **Prompt để sao chép:**

```text
Chúng ta sắp phát triển một Ứng dụng iOS gọi là "FridgeChef".

1. Khái niệm cốt lõi
Đây là một trợ lý AI giải quyết vấn đề "Tôi không biết nấu gì với các nguyên liệu còn lại trong tủ lạnh."
Người dùng nhập các nguyên liệu hiện có và ứng dụng gọi một mô hình lớn để tạo một công thức thực tế.

2. Chức năng cốt lõi
- Trang chủ:
  Hiển thị nút "Bắt đầu nấu ăn" nổi bật và bên dưới hiển thị các bản ghi công thức lịch sử dưới dạng thẻ hoặc danh sách.
- Trang nhập:
  Người dùng nhập nguyên liệu, hỗ trợ nhập văn bản hoặc nhãn nhanh đơn giản.
- Trang kết quả:
  Hiển thị công thức do AI tạo, bao gồm tên món, danh sách nguyên liệu và các bước nấu.

3. Yêu cầu kỹ thuật
- Sử dụng SwiftUI
- Lưu dữ liệu cục bộ (Core Data)
- Hỗ trợ điều hướng trang và cập nhật trạng thái cơ bản

Vui lòng giúp tôi tổ chức điều này thành một tài liệu REQUIREMENTS.md rõ ràng, có cấu trúc từ góc độ quản lý sản phẩm và lưu trong thư mục gốc dự án.
```

Sau khi tạo, đọc nhanh qua tài liệu và xác nhận liệu các điểm chức năng có khớp với kỳ vọng của bạn.

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image23.png)

### 4.2 Giai Đoạn Hai: Nguyên Mẫu Hình Ảnh

Để AI nhanh chóng vẽ một nguyên mẫu giao diện độ trung thực cao sử dụng **HTML\*\*** + \***\*CSS**, để chúng ta có thể xác nhận bố cục tổng thể và phong cách trước. Tiếp tục nhập điều này trong Trae:

📋 **Prompt để sao chép:**

```text
Yêu cầu đã được xác nhận.
Vui lòng sử dụng HTML + Tailwind CSS để tạo một nguyên mẫu giao diện độ trung thực cao cho tôi.

Phong cách thiết kế: Neo-Pop
Màu sắc:
- Nền: kem nhạt #FFFDF5
- Màu nhấn: xanh lá axit #CCFF00, hồng nóng

Đặc điểm hình ảnh:
- Viền đen dày 3px
- Bóng cứng không nhòe (offset 4px)
- Thẻ bo tròn lớn, cảm giác sticker / truyện tranh tổng thể

Yêu cầu bố cục:
- Trang chủ nên sử dụng bố cục kiểu Bento Grid
- Bao gồm hai màn hình: trang chủ và trang nhập

Vui lòng tạo một file index.html đơn và mô phỏng tỷ lệ màn hình iPhone xung quanh nội dung.
```

Sau khi tạo, tìm `index.html` trong danh sách file và mở trực tiếp trong trình duyệt.

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image24.png)

Ở giai đoạn này, điểm quan trọng không phải là liệu mọi chi tiết đều hoàn hảo. Điểm quan trọng là liệu **cấu trúc trang có hợp lý không, các yếu tố chính có đầy đủ không và hướng tổng thể có đúng không.**

### 4.3 Giai Đoạn Ba: Tái Tạo Native

Khi nguyên mẫu HTML được hoàn thiện, **dịch giao diện đã xác nhận thành SwiftUI.**

Các bước:

1. Tải file `index.html` lên (hoặc ảnh chụp màn hình trình duyệt) vào Trae
2. Yêu cầu AI tạo mã SwiftUI dựa trên nó

📋 **Prompt để sao chép:**

```text
[index.html đã được tải lên]

Vui lòng đọc bố cục và phong cách của file HTML này.

Nhiệm vụ: tái tạo giao diện này trong dự án hiện tại sử dụng SwiftUI.

Yêu cầu:
1. Đóng gói một modifier NeoPopStyle bao gồm màu nền, viền dày và bóng cứng
2. Tạo HomeView.swift cho bố cục trang chủ
3. Tạo InputView.swift cho trang nhập
4. Sử dụng Mock Data tạm thời và đảm bảo hiển thị chính xác trong Xcode Preview và trình mô phỏng
```

Sau khi hoàn thành, mở Xcode và chạy trình mô phỏng. Bạn sẽ thấy một ứng dụng iOS đã có cấu trúc hình ảnh hoàn chỉnh.

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image25.png)

### 4.4 Giai Đoạn Bốn: Kết Nối API AI

Khi giao diện hoàn thành, ứng dụng vẫn chỉ là lớp hiển thị. Tiếp theo chúng ta cần kết nối khả năng AI thực. Trong hướng dẫn này chúng ta sử dụng dịch vụ mô hình lớn được cung cấp bởi **SiliconFlow**:
[https://cloud.siliconflow.cn](https://cloud.siliconflow.cn/)

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image26.png)

SiliconFlow cung cấp API tương thích với đặc tả API OpenAI, vì vậy rất thuận tiện để gọi từ dự án iOS sử dụng yêu cầu mạng tiêu chuẩn.

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image27.png)

Trước khi bắt đầu, bạn cần đăng ký tài khoản trên trang web và tạo API Key.

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image28.png)

Key này sẽ được sử dụng cho các lần gọi mô hình sau.

📋 **Prompt để sao chép:**

```text
Bây giờ chúng ta cần kết nối khả năng AI.

Vui lòng tạo APIService.swift.

Cấu hình:
- Base URL: https://api.siliconflow.cn/v1
- Mô hình: Qwen/Qwen2.5-7B-Instruct
- API Key: định nghĩa nó như một biến tạm thời, tôi sẽ điền sau

Chức năng:
- Viết phương thức generateRecipe(ingredients: [String])
- System Prompt phải yêu cầu nghiêm ngặt mô hình chỉ trả về JSON thuần
- Các trường JSON nên bao gồm: dishName, ingredients, steps

Cũng định nghĩa struct RecipeModel để phân tích dữ liệu trả về.
```

Sau khi mã được tạo, điền Key của riêng bạn vào `APIService.swift`.

### 4.5 Giai Đoạn Năm: Lưu Trữ Cục Bộ Core Data

Để ứng dụng nhớ các công thức đã tạo, chúng ta cần đưa vào lưu trữ dữ liệu cục bộ. Giai đoạn này được chia thành hai bước.

**Bước 1: cấu hình Core Data thủ công trong Xcode**

1. Mở `FridgeChef.xcdatamodeld`
2. Tạo một Entity mới tên `RecipeEntity`

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image29.png)

3. Thêm các thuộc tính sau:
   1. `id`: **UUID**
   2. `name`: **String**
   3. `cookTime`: **String**
   4. `difficulty`: **String**
   5. `desc`: **String**
   6. `timestamp`: **Date**
   7. `colorIndex`: **Integer 16**

      ![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image30.png)

**Bước 2: để AI viết mã logic**

📋 **Prompt để sao chép:**

```text
Tôi đã hoàn thành cấu hình Core Data Entity.

Entity: RecipeEntity
Các thuộc tính: id, name, difficulty, timestamp, colorindex, cookTime, desc

Vui lòng hoàn thành các nhiệm vụ sau:
1. Lưu dữ liệu vào Core Data sau khi tạo công thức thành công
2. Sử dụng FetchRequest trên trang chủ để đọc các bản ghi lịch sử và hiển thị theo thứ tự thời gian đảo ngược
3. Khi cơ sở dữ liệu trống, hiển thị thông báo trạng thái trống thân thiện
```

### 4.6 Giai Đoạn Sáu: Tạo Biểu Tượng Ứng Dụng

Bước cuối cùng là chuẩn bị một biểu tượng phù hợp cho ứng dụng. Ở đây chúng ta sử dụng **Lovart** để tạo biểu tượng: [https://www.lovart.ai/zh](https://www.lovart.ai/zh)

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image31.png)![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image32.png)

📋 **Prompt để sao chép vào Lovart:**

```text
Chủ đề: Một nhân vật tủ lạnh đáng yêu nhân hóa với khuôn mặt hạnh phúc
Phong cách: Biểu tượng Ứng dụng Tối giản, phong cách Neo-pop, viền đen dày, nghệ thuật vector
Màu sắc: Xanh lá axit (#CCFF00) và xanh đậm
Nền: Màu kem đặc
Negative Prompt: Văn bản, chi tiết chân thực, render 3D, nền phức tạp
```

Sau khi tạo, cắt hình ảnh thành 1024x1024 và kéo vào `Assets.xcassets` -> `AppIcon` trong Xcode.

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image33.png)

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image34.png)

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image35.png)

Chạy ứng dụng lại và bạn sẽ thấy một ứng dụng iOS hoàn chỉnh, dễ nhận biết và thực sự.

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image36.png)

### 4.7 Giai Đoạn Bảy: Nâng Cấp Trải Nghiệm Nâng Cao

Khi chức năng đã ổn định, nếu bạn muốn cải thiện thêm phong cách hình ảnh, bạn chỉ cần mô tả hiệu ứng bạn muốn cho AI, để nó tạo một đề xuất thiết kế mới, sau đó di chuyển kết quả đã xác nhận vào SwiftUI.

📋 Prompt tham khảo:

```text
Chức năng của ứng dụng đã hoàn thành, nhưng tôi muốn thử một phong cách UI có tác động hình ảnh mạnh hơn.
Vui lòng trước tiên tạo một bản thiết kế mới bằng HTML + Tailwind CSS cho tôi, với tên file design_v2.html.

Phong cách thiết kế: Neo-Pop (phong cách dopamine)
Yêu cầu màu sắc:
Sử dụng Xanh Hoàng Gia Đậm làm nền toàn màn hình
Sử dụng Xanh Lá Axit (#CCFF00) làm màu nhấn

Cảm nhận hình ảnh:
Tất cả thẻ nên sử dụng viền đen dày 3px
Sử dụng bóng cứng không có nhòe trong suốt, lệch xuống-phải

Yêu cầu bố cục:
Giữ nguyên cấu trúc trang chủ
Sử dụng nút và hộp nhập liệu hình viên thuốc

Vui lòng tạo mã hoàn chỉnh để tôi có thể xem trước trong trình duyệt.
```

Sau khi được tạo, mở file HTML này trong trình duyệt.

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image37.png)

Khi phiên bản HTML được hoàn thiện, bạn có thể bắt đầu sửa đổi dự án iOS.

📋 Prompt tham khảo:

```text
[design_v2.html đã được tải lên]
Vui lòng phân tích phong cách hình ảnh của HTML này và di chuyển vào dự án iOS hiện tại.

Yêu cầu nhiệm vụ:
Tạo file NeoPopStyle.swift mới
Đóng gói một modifier phong cách neoPopBlue()

Modifier cần bao gồm:
- bo tròn góc
- viền đen dày
- bóng cứng không trong suốt

Tái cấu trúc HomeView:
- thay đổi nền thành Xanh Hoàng Gia Đậm
- sử dụng Xanh Lá Axit cho nút chính
- sử dụng nền trắng cho thẻ bản ghi lịch sử
- đảm bảo văn bản vẫn rõ ràng và dễ đọc trên nền tối

Vui lòng cung cấp mã đã sửa đổi hoàn chỉnh.
```

Nhấp Run trong Xcode lại. Nếu mọi thứ hoạt động, bạn sẽ thấy:

- chức năng hoàn toàn giống như trước
- phong cách hình ảnh đã thay đổi đáng kể
- chất lượng ứng dụng tổng thể cảm thấy nâng cấp rõ ràng

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image38.png)

## Chương 5: Chạy, Gỡ Lỗi và Xử Lý Lỗi

Trong chương trước, bạn đã hoàn thành chức năng cốt lõi và chạy thành công ứng dụng trong trình mô phỏng.
Nhưng đối với một ứng dụng iOS, hoàn thành thực sự không chỉ là "biên dịch thành công" - mà là **hoạt động ổn định và biết cách xử lý vấn đề khi chúng xuất hiện**.

### 5.1 Chạy Ứng Dụng Trong Xcode

Đầu tiên, đảm bảo dự án có thể chạy chính xác trong Xcode.

Ở phía trên bên trái của Xcode, chọn thiết bị chạy và giữ trình mô phỏng iPhone mặc định. Nhấp nút **Run** để biên dịch và chạy. Nếu mọi thứ bình thường, ứng dụng sẽ khởi chạy trong trình mô phỏng và hiển thị giao diện được xây dựng trong Chương 4.

### 5.2 Chạy Ứng Dụng Trên Thiết Bị Thực

Kết nối iPhone với Mac bằng cáp.

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image39.png)

Khi kết nối lần đầu, điện thoại sẽ hiển thị **Tin tưởng Máy tính Này?** Nhấn tin tưởng và nhập mã mở khóa.

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image40.png)

Trong danh sách thiết bị của Xcode, chọn iPhone của bạn, sau đó nhấp **Run** lại.

Lúc này, bạn sẽ có thể thấy biểu tượng **FridgeChef** trên màn hình chính của điện thoại và mở và sử dụng nó bình thường.

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image41.png)

Bước này đánh dấu hoàn thành một vòng lặp phát triển iOS đầy đủ.

### 5.3 Lỗi Phát Triển iOS Thường Đến Từ Đâu

Trong phát triển thực tế, **gặp lỗi là bình thường**, không phải là ngoại lệ.

Các vấn đề phổ biến thường đến từ các danh mục sau:

1. **Lỗi biên dịch**
   Cú pháp Swift, kiểu không khớp, thiếu tham số, v.v. Xcode sẽ làm nổi bật trực tiếp bằng màu đỏ.
2. **Lỗi runtime**
   Ứng dụng biên dịch thành công nhưng bị treo trong quá trình thực thi - ví dụ, mảng vượt quá giới hạn hoặc force-unwrap giá trị nil.
3. **Lỗi quyền hoặc cấu hình**
   Yêu cầu mạng bị hệ thống chặn, thiếu cấu hình Info.plist, vấn đề ký, v.v.
4. **Lỗi logic**
   Ứng dụng không bị treo nhưng hành vi sai - ví dụ, nút không phản hồi hoặc dữ liệu không làm mới.

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image42.png)

Khi bất kỳ lỗi nào xuất hiện, bạn chỉ cần **sao chép toàn bộ thông báo lỗi chính xác như nó là vào hộp chat của Trae.** Với nhận thức về ngữ cảnh dự án, Trae có thể giúp bạn gỡ lỗi.

### 5.4 Lỗi Gỡ Lỗi Trên Thiết Bị Thực Phổ Biến và Giải Pháp

Lỗi trong quá trình gỡ lỗi trên thiết bị thực rất phổ biến. Những vấn đề này thường không phải do mã本身 gây ra mà do tin tưởng thiết bị, quy tắc bảo mật hoặc cấu hình ký. Nếu ứng dụng không thể chạy trên iPhone của bạn trơn tru, bạn có thể kiểm tra phần này trước.

#### 1. Vấn đề ký và đăng ký

**Triệu chứng phổ biến:**

- Xcode hiển thị lỗi đỏ như
  `"Communication with Apple failed"`
  hoặc
  `"No profiles for 'com.xxx.xxx' were found"`
- Hoặc nó nói
  `"Your team has no devices which are compatible"`

**Nguyên nhân:**

- Bundle Identifier không duy nhất hoặc không hợp lệ
- iPhone hiện tại chưa được đăng ký dưới Apple ID của bạn cho phát triển

**Giải pháp:**

1. **Sửa đổi Bundle Identifier**
   Trong cài đặt dự án Xcode, thay đổi Bundle Identifier thành một thứ duy nhất hơn, ví dụ:
   `com.yourname.FridgeChef`
2. **Để Xcode tự động đăng ký thiết bị**
   Trong提示 lỗi, nhấp `Try Again` hoặc `Register Device` và để Xcode hoàn thành đăng ký thiết bị và cấu hình chứng chỉ tự động.

#### 2. Vấn đề ghép nối và kết nối thiết bị

**Triệu chứng phổ biến:**

- Xcode hiển thị
  `"Device is not available because pairing is in progress"`
- Hoặc nó nói
  `"Device Locked"`
- Hoặc bạn đã nhấn Trust, nhưng Xcode vẫn bị kẹt

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image43.png)

**Nguyên nhân:**

- iPhone vẫn bị khóa
- Quá trình ghép nối chưa hoàn thành đầy đủ
- Xcode chưa làm mới trạng thái kết nối

**Giải pháp:**

1. Mở khóa điện thoại
   Đảm bảo iPhone được mở khóa và ở lại màn hình chính.
2. Hoàn thành quá trình tin tưởng
   Khi điện thoại hiển thị **Tin tưởng Máy tính Này?**, nhấn **Tin tưởng** và **nhập mã mở khóa màn hình**.
3. Làm mới trạng thái kết nối
   Nếu vẫn bị kẹt, rút cáp, đợi 2-3 giây và kết nối lại. Nếu cần, khởi động lại Xcode và thử lại.

#### 3. Ứng dụng cài đặt nhưng không thể mở

**Triệu chứng phổ biến:**

- Biểu tượng ứng dụng đã xuất hiện trên màn hình chính iPhone
- Hệ thống hiển thị
  **Nhà phát triển Không đáng tin cậy**

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image44.png)

**Nguyên nhân:**

Đây là cơ chế bảo mật iOS. Ứng dụng gỡ lỗi được cài đặt với Apple ID cá nhân yêu cầu ủy quyền tin tưởng thủ công.

**Giải pháp:**

1. Mở **Cài đặt**
2. Vào **Cài đặt Chung**
3. Nhấp vào **VPN & Quản lý Thiết bị**
4. Trong **Ứng dụng Nhà phát triển**, tìm Apple ID của bạn
5. Nhấp vào **Tin tưởng**, sau đó xác nhận lại

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image45.png)

Sau đó, quay lại màn hình chính và nhấp vào ứng dụng lại. Nó sẽ chạy bình thường.

## Chương 6: Nếu Bạn Muốn Xuất Bản Ứng Dụng Lên App Store

Trong hướng dẫn này, những gì chúng ta chủ yếu hoàn thành là vòng lặp khép kín cho một **phiên bản ứng dụng phát triển và gỡ lỗi cá nhân**: từ tạo dự án, triển khai chức năng và gỡ lỗi cho đến cài đặt và sử dụng thành công trên thiết bị thực.

Nếu bạn muốn đi xa hơn và chính thức xuất bản ứng dụng lên **Apple App Store** để tất cả người dùng có thể tải xuống và sử dụng, thì bạn cần vào một quy trình phát hành chính thức hơn. Vì quy trình đó liên quan đến tài khoản nhà phát triển trả phí, quy tắc đánh giá và yêu cầu tuân thủ và không phải là trọng tâm thực hành chính của hướng dẫn này, nội dung sau chỉ được cung cấp như một **tham khảo tổng quan và lộ trình**.

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image46.png)

> Nội dung sau tham khảo yêu cầu đánh giá chính thức của Apple và thảo luận kinh nghiệm công khai (bao gồm chia sẻ Zhihu gốc). Liên kết được liệt kê dưới đây. Nếu bất kỳ liên kết nào không còn truy cập được, bạn có thể tìm kiếm theo tiêu đề hoặc từ khóa để tìm nguồn gốc.

### 6.1 Chương Trình Nhà Phát Triển Apple

Để xuất bản ứng dụng lên App Store, bạn phải tham gia chương trình nhà phát triển trả phí của Apple:

- **Apple Developer Program** (99 USD mỗi năm)
- Trang web chính thức: [https://developer.apple.com/](https://developer.apple.com/)

Sau khi tham gia, bạn có thể sử dụng **App Store Connect** để tạo mục ứng dụng, quản lý phiên bản và xuất bản chính thức.

### 6.2 App Store Connect: Tạo Mục Ứng Dụng

Trong App Store Connect, bạn cần tạo một bản ghi ứng dụng hoàn chỉnh, bao gồm nhưng không giới hạn:

1. Tên ứng dụng và Bundle ID
2. Mô tả, từ khóa và liên kết chính sách bảo mật
3. Biểu tượng ứng dụng, ảnh chụp màn hình và tài liệu xem trước
4. Cài đặt giá và khu vực phân phối

Tất cả thông tin này phải được hoàn thành trước khi nộp.

### 6.3 Xây Dựng và Nộp Để Đánh Giá

Sau khi metadata đã sẵn sàng, bạn cần:

1. Sử dụng tài khoản nhà phát triển trả phí trong Xcode để ký bản Release
2. Xây dựng và tải lên phiên bản chính thức
3. Nộp để đánh giá trong App Store Connect

Sau khi nộp, ứng dụng vào hàng đợi đánh giá của Apple. Thời gian đánh giá thường là 1-3 ngày, tùy thuộc vào trường hợp.

### 6.4 Quy Tắc Đánh Giá và Lý Do Phổ Biến Dẫn Đến Từ Chối

Apple chủ yếu đánh giá ứng dụng từ các khía cạnh sau:

- chức năng và ổn định
- bảo mật và tuân thủ dữ liệu
- tính nhất quán giữa metadata và chức năng thực tế
- liệu có vi phạm hoặc hành vi gây hiểu lầm hay không

Nếu ứng dụng không đáp ứng yêu cầu, đánh giá sẽ bị từ chối và Apple sẽ cung cấp lý do cụ thể. Nhà phát triển sau đó cần sửa đổi ứng dụng và nộp lại.

### 6.5 Làm Gì Sau Khi Bị Từ Chối

Nếu ứng dụng bị từ chối, bạn có thể:

- sửa đổi mã hoặc mô tả theo phản hồi
- nộp lại phiên bản
- giao tiếp với đội đánh giá thông qua App Store Connect

Đây là một phần rất phổ biến của quy trình xuất bản và không có nghĩa là dự án đã thất bại.

### Nguồn tham khảo

Nội dung sau tham khảo tài liệu chính thức của Apple và chia sẻ kinh nghiệm công khai:

- Hướng dẫn Đánh giá App Store (chính thức Apple)
  [https://developer.apple.com/app-store/review/guidelines/](https://developer.apple.com/app-store/review/guidelines/?utm_source=chatgpt.com)
- Hướng dẫn chính thức về nộp đánh giá
  [https://developer.apple.com/cn/help/app-store-connect/manage-submissions-to-app-review/submit-for-review](https://developer.apple.com/cn/help/app-store-connect/manage-submissions-to-app-review/submit-for-review?utm_source=chatgpt.com)
- Hướng dẫn đầy đủ có hình ảnh về xuất bản và cạm bẫy đánh giá iOS App Store (Zhihu)
  [https://zhuanlan.zhihu.com/p/146128612](https://zhuanlan.zhihu.com/p/146128612)

## Chương 7: Tóm Tắt

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image47.png)

Chúc mừng! Đến lúc này, bạn đã tự mình đi qua quy trình phát triển ứng dụng iOS hoàn chỉnh từ 0 đến 1. Từ thiết lập môi trường, chạy dự án và sau đó dần dần triển khai giao diện, chức năng, dữ liệu và kiểm tra trên thiết bị thực, tất cả các giai đoạn chính đã được hoàn thành trơn tru. Quan trọng hơn, bạn đã đạt được điều này không phải bằng cách ghi nhớ cú pháp Swift - bạn đã giao phần lớn triển khai cho AI. Dù nền tảng của bạn là gì, mỗi nỗ lực như thế này khiến bạn trôi chảy hơn và bạn sẽ nhận ra rằng phát triển iOS không khó như từng tưởng. Ngay cả khi bạn không thể viết một dòng mã nào trước đây, bạn vẫn có thể xây dựng ứng dụng của riêng mình.

Nhìn lại, toàn bộ quy trình thực sự không quá phức tạp: quyết định những gì bạn muốn xây dựng, sử dụng HTML để thử nghiệm giao diện nhanh chóng, chuyển đổi thành SwiftUI, kết nối API và dữ liệu cục bộ, và sau đó chạy gỡ lỗi một lần. Dựa trên điều này, trong tương lai bạn cũng có thể dễ dàng xây dựng một đồng hồ báo thức cá nhân, một danh sách todo tối giản hoặc thậm chí một chatbot nói theo giọng điệu của người nổi tiếng yêu thích của bạn.

Đây chính là điều quan trọng nhất mà hướng dẫn này - và easy-vibe - muốn dạy bạn. Tôi đang mong đợi những sáng tạo mới nhất từ tất cả các bạn, các bậc thầy vibe coding tương lai, và ngày mà tôi được choáng ngợp bởi tác phẩm của các bạn.
