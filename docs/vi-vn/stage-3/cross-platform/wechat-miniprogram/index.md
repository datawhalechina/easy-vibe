# Cách Xây dựng Ứng dụng WeChat Mini Program Đơn giản nhất

# 1. Ứng dụng WeChat Mini Program và Phát triển Mini Program là gì

Trong hướng dẫn này, chúng ta sẽ hoàn thành một vòng lặp khép kín: từ một ý tưởng trong đầu bạn đến một mini program thực sự có thể được tìm kiếm và mở bằng mã QR trong WeChat.

Trước khi bắt đầu xây dựng, chúng ta cần thiết lập hai hiểu biết cơ bản.

Thứ nhất là **bản chất**: chính xác thì mini program WeChat là gì? Nó khác gì với ứng dụng hoặc trang web thông thường? Tại sao nhiều sản phẩm chọn định dạng này? Chỉ khi bạn hiểu logic cốt lõi thì mới có thể đánh giá ý tưởng của bạn có phù hợp với mini program hay không.

Thứ hai là **con đường**: khi bạn nói "tôi muốn xây một mini program," con đường đầy đủ từ không đến khi ra mắt trông như thế nào? Các nút then chốt trên con đường đó là gì - cần suy nghĩ gì trong giai đoạn ý tưởng, cách thiết lập môi trường, cách phát triển có hỗ trợ AI cải thiện hiệu quả, những cạm bẫy nào xuất hiện khi gỡ lỗi trên trình mô phỏng và tài khoản thử nghiệm so với phát hành chính thức giải quyết điều gì. Nếu bạn chạy qua quy trình này trong đầu trước, bạn sẽ không bị lạc trong quá trình triển khai.

Sau khi hai câu hỏi này rõ ràng, chúng ta có thể chính thức bước vào phát triển. Hãy bắt đầu với câu hỏi đầu tiên: chính xác thì mini program WeChat là gì?

## 1.1 Ứng dụng WeChat Mini Program

Một mini program WeChat có thể được xem như một ứng dụng sống bên trong WeChat. Bạn không cần tìm kiếm trong cửa hàng ứng dụng, tải xuống hay cài đặt. Người dùng có thể tìm theo tên trong WeChat, quét mã QR hoặc mở một thẻ chia sẻ và sử dụng ngay lập tức. Sau khi sử dụng, chỉ cần đóng lại. Nó không chiếm dụng màn hình chính hoặc bộ nhớ điện thoại vĩnh viễn.

Đối với người dùng thông thường, mini program giải quyết nhiều "nhiệm vụ nhỏ": theo dõi giao hàng, đặt cà phê, xem đơn hàng, chơi một trò chơi nhanh. Khởi động nhanh và điểm truy cập thống nhất trong WeChat là đặc điểm trải nghiệm lớn nhất.

Đối với công ty và nhà phát triển, mini program là một "định dạng ứng dụng nhỏ" có thể tìm kiếm và chia sẻ được. Miễn là bạn đăng ký trên Nền tảng Chính thức WeChat, hoàn tất cài đặt và vượt qua kiểm duyệt, mini program của bạn có thể mở cho tất cả người dùng WeChat. So với ứng dụng truyền thống, dễ dàng hơn để có được nhóm người dùng đầu tiên vì mọi người đã quen làm nhiều việc trong WeChat.

Trong hướng dẫn này, chúng ta sẽ không xây dựng một hệ thống kinh doanh phức tạp. Chúng ta chọn một ví dụ kinh điển: trò chơi Rắn. Nó nhỏ gọn và logic rõ ràng, nhưng bao gồm đầy đủ các yếu tố mà một mini program nên có: nhiều trang, tương tác đơn giản, thay đổi trạng thái, ghi điểm, v.v. Hoàn hảo làm dự án đầu tiên của bạn.

## 1.2 Phát triển Ứng dụng WeChat Mini Program

Sau khi hiểu "mini program là gì," câu hỏi tiếp theo là: phát triển một mini program thực sự bao gồm những gì?

Bạn cần một mục tiêu rõ ràng (ví dụ, một trò chơi Rắn mà người dùng có thể chơi bất cứ lúc nào), thiết kế giao diện mà người dùng sẽ thấy, xác định điều gì sẽ xảy ra dưới các hành động khác nhau và cuối cùng là xuất bản nó.

Trong phát triển truyền thống, lập trình viên thường dẫn dắt tất cả các bước này và viết rất nhiều mã. Trong phát triển có hỗ trợ AI, điều này có thể được chia rõ ràng hơn: bạn giải thích những gì bạn muốn và AI giúp với hầu hết các chi tiết triển khai. Điều đó có nghĩa là đối với người mới bắt đầu, kỹ năng quan trọng nhất không còn là ghi nhớ cú pháp mà là mô tả rõ ràng yêu cầu và hiểu đầu ra của AI.

## 1.3 Một số Cách Phát triển Ứng dụng WeChat Mini Program

Trong dự án thực tế, mọi người sử dụng các lộ trình kỹ thuật khác nhau. Để tránh làm bạn quá tải với thuật ngữ ngay từ đầu, chúng ta sẽ chỉ phân loại sơ bộ để bạn hiểu các con đường phổ biến.

Cách đầu tiên là sử dụng trực tiếp các khả năng gốc chính thức. Sau khi tạo dự án trong WeChat DevTools, bạn sẽ thấy một bộ tệp cố định được sử dụng để mô tả cấu trúc trang, kiểu dáng và logic. Cách này bám sát tài liệu chính thức và có khả năng kiểm soát mạnh, nhưng đối với người mới học frontend lần đầu, đường cong học tập hơi dốc hơn.

Cách thứ hai là sử dụng framework đa nền tảng, như uni-app. Bạn chủ yếu viết mã giống web cục bộ (ví dụ tệp `.vue`) và framework chuyển đổi mã này sang định dạng mà mini program WeChat có thể chạy. Ưu điểm là cấu trúc thống nhất. Nếu bạn sau này xuất bản lên các nền tảng khác (như H5 hoặc App), thay đổi sẽ ít hơn tương đối.

Dựa trên hai phương pháp này, hướng dẫn này tập trung vào SOP mini program sử dụng công cụ có hỗ trợ AI. Ví dụ, mở toàn bộ dự án trong Trae và nói trực tiếp với AI tích hợp: "Vui lòng thêm trang chủ với tiêu đề và nút trong tệp này" hoặc "Vui lòng tạo trang trò chơi hiển thị con rắn và điểm số." AI sẽ tạo đoạn mã mới hoặc sửa đổi/tái cấu trúc mã hiện có dựa trên ngữ cảnh dự án hiện tại.

Ba cách này không loại trừ lẫn nhau. Bạn hoàn toàn có thể xây dựng trong dự án uni-app đồng thời sử dụng Trae AI cho hầu hết công việc lập trình. Điều quan trọng không phải là chọn một phương pháp mà là biết bạn đang ở đâu và những công cụ nào có sẵn.

## 1.4 Các Bước Phát triển Ứng dụng WeChat Mini Program được Trình bày trong Bài viết này (Xem trước Tổng quan)

Hướng dẫn này tuân theo nhịp độ từ **môi trường đến sản phẩm cuối cùng**. Xung quanh ví dụ Rắn và phong cách vibecoding Trae, chúng ta chia quy trình thành một lộ trình có thể tái sử dụng. Trong các chương sau, bạn sẽ đi qua các giai đoạn này:

1. Xây dựng nền tảng khái niệm: hiểu mini program là gì, các phương pháp phát triển phổ biến và đối tượng mà trò chơi Rắn mini program này phục vụ và trong những tình huống nào.
2. Chuẩn bị môi trường: đăng ký tài khoản mini program, cài đặt HBuilderX, Trae và WeChat DevTools, sau đó tạo khung dự án cơ bản với HBuilderX có thể chạy trong WeChat DevTools và hiển thị trang đơn giản nhất trước tiên.
3. Bước vào phát triển chính thức: mở dự án trong Trae, sử dụng hộp thoại vibecoding với AI để tạo trang chủ và bố cục trang trò chơi từng bước, triển khai lối chơi cốt lõi như di chuyển rắn, ăn thức ăn và kết thúc trò chơi.
4. Sau khi các tính năng cốt lõi chạy, học cách sử dụng AI như một "đối tác gỡ lỗi và tái cấu trúc": yêu cầu chẩn đoán lỗi, dọn dẹp cấu trúc khi mã trở nên lộn xộn và dần thêm chi tiết như bắt đầu/tạm dừng, ghi điểm cao và làm đẹp UI.
5. Bước vào xuất bản: xây dựng dự án thành phiên bản nhận diện được bởi WeChat, xem trước và thử nghiệm trên thiết bị thật trong WeChat DevTools, ra mắt trước bằng tài khoản thử nghiệm và phiên bản trải nghiệm để xác nhận quy trình, sau đó hoàn tất nộp hồ sơ và kiểm duyệt trước khi phát hành chính thức để người khác có thể tìm kiếm và chơi mini program của bạn.

Phần này chỉ vẽ bản đồ đầy đủ và chưa mở rộng lệnh hoặc chi tiết mã. Hiện tại, hãy nhớ 5 bước này: **Hiểu -> Cài đặt môi trường -> Phát triển Vibecoding -> Gỡ lỗi và tinh chỉnh -> Xây dựng và phát hành**. Các chương sau sẽ phóng to vào từng bước, cho thấy cần chuẩn bị gì, nói gì với AI và kết quả nào bạn sẽ thấy trên màn hình ở mỗi giai đoạn.

# 2. Chuẩn bị Môi trường

Trước khi viết bất kỳ dòng mã nào, hãy chuẩn bị môi trường trước.
Mục tiêu của phần này là đảm bảo bạn không còn bị kẹt ở **chỗ tải công cụ và tại sao mọi thứ không chạy được**, để bạn có thể tập trung trực tiếp vào đối thoại AI và triển khai yêu cầu.

Nếu bạn có thể mở trình duyệt, tải tệp và nhấp đúp để cài đặt, bạn có thể hoàn thành phần này.

## 2.1 Ba Công cụ Sử dụng trong Hướng dẫn này

Để phát triển mini program Rắn, chúng ta sử dụng ba công cụ cùng nhau, mỗi công cụ có trách nhiệm khác nhau:

1. Thứ nhất là Trae. Hãy coi nó như một trình soạn mã tích hợp AI. Nó có thể mở tệp dự án như IDE bình thường và cũng cho phép bạn trò chuyện với AI bằng ngôn ngữ tự nhiên để tạo, sửa đổi và giải thích mã. Hầu hết các hoạt động "xây dựng mini program với AI" trong hướng dẫn này diễn ra trong Trae. Tải phiên bản mới nhất từ https://www.trae.cn .
2. Thứ hai là HBuilderX. Nó có hỗ trợ mạnh mẽ cho Vue và uni-app, và cung cấp mẫu mini program sẵn có. Chúng ta sử dụng nó để "tạo một cú nhấp chuột" một dự án mini program cơ sở - đây là đặt nền móng trước khi giao cho Trae + AI để tiếp tục lặp lại. Tải từ https://www.dcloud.io/hbuilderx.html .
3. Thứ ba là WeChat DevTools. Công cụ chính thức này được sử dụng để phát triển và xem trước mini program. Nó chạy dự án của bạn trên máy tính để bàn và hỗ trợ gỡ lỗi trên thiết bị thật trên điện thoại. Tải từ https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html .

Tóm lại: HBuilderX tạo dự án cơ sở nhanh chóng, Trae giúp bạn lập trình với AI và WeChat DevTools hiển thị mini program đang chạy thực tế.

## 2.2 Đăng ký Tài khoản Nền tảng Chính thức WeChat và Lấy AppID

Với công cụ đã sẵn sàng, bạn vẫn cần một **định danh mini program**, được tạo trên Nền tảng Chính thức WeChat.
Nếu bạn chưa từng đăng ký mini program trước đây, hãy làm theo thứ tự này:

1. Nhập https://mp.weixin.qq.com trong trình duyệt, mở Nền tảng Chính thức WeChat và đăng nhập bằng cách quét mã QR với WeChat.

![](/zh-cn/stage-3/cross-platform/wechat-miniprogram/images/image1.webp)

2. Chọn "Mini Program" trên trang chủ và hoàn tất lời nhắc đăng ký, bao gồm email, số điện thoại và loại thực thể (cá nhân hoặc doanh nghiệp).
   ![](/zh-cn/stage-3/cross-platform/wechat-miniprogram/images/image2.png)
3. Sau khi đăng ký thành công, vào backend, tìm "Development Management" hoặc "Development Settings" và bạn sẽ thấy một ID duy nhất tên là AppID. Đây là định danh mini program của bạn và sẽ được sử dụng trong cấu hình dự án sau này.

![](/zh-cn/stage-3/cross-platform/wechat-miniprogram/images/image3.png)

Khuyến nghị lưu AppID ở nơi dễ tìm. Trong các phần sau, chúng ta sẽ điền trực tiếp giá trị này để ánh xạ dự án cục bộ đến mini program trực tuyến của bạn.

## 2.3 Cài đặt WeChat DevTools

Tiếp theo chúng ta cần một nơi để thực sự chạy và xem trước mini program. Đó chính xác là những gì WeChat DevTools dùng để làm.

1. Truy cập trang tải xuống https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html .
   Trên trang này bạn sẽ thấy các phiên bản cho các hệ điều hành khác nhau. Thường chọn phiên bản ổn định phù hợp với hệ thống của bạn, như Windows 64-bit hoặc macOS.
2. Sau khi tải về, nhấp đúp vào trình cài đặt và làm theo hướng dẫn từng bước. Nếu không chắc, giữ các tùy chọn mặc định.
3. Sau khi cài đặt, khởi chạy WeChat DevTools từ máy tính để bàn hoặc menu bắt đầu. Khi khởi chạy lần đầu, nó hiển thị mã QR và yêu cầu bạn quét bằng WeChat. Quét và ủy quyền để vào giao diện chính.

![](/zh-cn/stage-3/cross-platform/wechat-miniprogram/images/image4.png)![](/zh-cn/stage-3/cross-platform/wechat-miniprogram/images/image5.png)

Sau này, khi tệp dự án đã sẵn sàng trong Trae, chúng ta sẽ import mini program đã xây dựng vào WeChat DevTools và xem kết quả chạy thực tế tại đây.

## 2.4 Chuẩn bị Trae và HBuilderX

Cuối cùng, cài đặt hai công cụ được sử dụng cho việc lập trình thực tế: Trae và HBuilderX.

Bạn có thể **cài đặt Trae trước**. Truy cập https://www.trae.cn trong trình duyệt và tải phiên bản phù hợp cho hệ điều hành của bạn. Cài đặt như phần mềm bình thường: nhấp đúp vào trình cài đặt và làm theo hướng dẫn. Sau khi cài đặt, bạn có một IDE có thể mở thư mục cục bộ, kiểm tra mã và trò chuyện với AI. Tất cả các bước vibecoding sau đều diễn ra tại đây.

![](/zh-cn/stage-3/cross-platform/wechat-miniprogram/images/image6.png)

**Sau đó cài đặt HBuilderX**. Truy cập https://www.dcloud.io/hbuilderx.html và tải gói cho hệ điều hành của bạn. HBuilderX nhẹ và khởi động nhanh. Sau khi cài đặt, bạn có thể xem qua giao diện; không cần nghiên cứu sâu tính năng ngay bây giờ. Trong các chương sau, chúng ta sử dụng nó để tạo mẫu uni-app mini program làm điểm bắt đầu dự án.

![](/zh-cn/stage-3/cross-platform/wechat-miniprogram/images/image7.png)

Sau khi hoàn thành phần này, môi trường của bạn đã hoàn chỉnh: bạn có tài khoản mini program + AppID, công cụ xem trước thời gian chạy và IDE lập trình AI. Tiếp theo chúng ta bắt đầu từ **tạo khung dự án đầu tiên** và làm cho các công cụ này thực sự chạy.

## 2.5 Chuẩn bị Tệp Cơ sở

1. Nhấp "New Project".

![](/zh-cn/stage-3/cross-platform/wechat-miniprogram/images/image8.png)

2. Chọn mẫu mặc định, đặt tên mini program, chọn đường dẫn lưu trữ, sau đó nhấp tạo ở góc dưới bên phải:

![](/zh-cn/stage-3/cross-platform/wechat-miniprogram/images/image9.png)

3. Màn hình tạo thành công xuất hiện:

![](/zh-cn/stage-3/cross-platform/wechat-miniprogram/images/image10.png)

4. Sau đó tìm thư mục này trong hệ thống tệp, mở nó trong Trae và bạn sẽ thấy các tệp nền tảng đã sẵn sàng:

![](/zh-cn/stage-3/cross-platform/wechat-miniprogram/images/image11.png)

# 3. Phát triển Mini Program

Trong hai phần đầu, chúng ta đã làm rõ "mini program là gì" và "cách thiết lập công cụ và môi trường." Từ phần này, chúng ta bước vào thực hành: không chỉ là khái niệm mà AI thực sự giúp bạn xây dựng mini program Rắn từ không.

Trong phần này, bạn sẽ đi qua một SOP hoàn chỉnh cho giai đoạn phát triển, bao gồm khoảng:

1. Mở dự án hiện tại trong Trae và đưa cho AI chỉ dẫn hoàn chỉnh đầu tiên để nó thiết kế và triển khai phiên bản Rắn có thể chạy dựa trên khung hiện tại.
2. Để Trae sửa đổi trực tiếp tệp dự án thực tế, không chỉ xuất "mã mẫu," và học cách sử dụng rollback để khôi phục trạng thái trước đó khi cần.
3. Quay lại HBuilderX và WeChat DevTools, chạy trên trình mô phỏng mini program và chơi phiên bản này trong trình mô phỏng để chuyển từ "góc độ mã" sang "góc độ người dùng."
4. Dựa trên kết quả chơi, tiếp tục đề xuất sửa đổi bằng ngôn ngữ tự nhiên và để AI lặp lại điều khiển từ kiểu nút bấm sang kiểu cần điều khiển, đồng thời trải nghiệm một vòng lặp đầy đủ "tìm vấn đề -> mô tả vấn đề -> AI sửa -> xác minh lại."

Bạn có thể chọn thiết kế từng trang và nút trước khi phát triển.
Nhưng đối với người mới bắt đầu hoàn toàn, thiết kế giao diện và tương tác bản thân cũng là một lĩnh vực mới (sau này chúng ta sẽ trình bày thiết kế có hỗ trợ AI). Vì vậy trong vòng này, chúng ta cố ý sử dụng cách khác: bắt đầu trước - để AI tạo một phiên bản có thể chạy, sau đó tinh chỉnh dần bằng cách xem hiệu ứng và trò chuyện bằng ngôn ngữ tự nhiên.

## 3.1 Giải thích Yêu cầu Rõ ràng trong Một Lần: Đưa cho Trae "Prompt Tổng" Đầu tiên

Sau khi mở dự án mini program đã chuẩn bị trong Trae, tôi không vội chỉnh sửa một dòng cụ thể. Thay vào đó, tôi nói với trợ lý AI tích hợp:

**Tôi đã đưa cho AI một lệnh: dựa trên khung hiện tại, xây dựng một mini program Rắn. Vui lòng thiết kế mini program này và viết cho tôi một prompt.**

Nói cách khác, tôi không yêu cầu nó "viết từng hàm một từng bước." Tôi đưa ra một mục tiêu hoàn chỉnh trước, để AI giúp lập kế hoạch và AI không chỉ lập kế hoạch mà còn trực tiếp hạ cánh triển khai đầu tiên.

Sau khi nhận được chỉ dẫn này, Trae đọc cấu trúc dự án hiện tại, xác định nơi thêm trang và nơi thêm logic, và trực tiếp sửa đổi tệp/mã dự án. Bạn không cần viết tay mã hoặc tạo/sửa thư mục thủ công.

## 3.2 Để AI Tự động Sửa đổi Mã Thực tế, Không Lập trình Thủ công

Khi bạn thực thi chỉ dẫn này trong Trae, AI bước vào quy trình "chỉnh sửa dự án." Trong quá trình này, bạn có thể quan sát các điểm chính:

1. Nó giải thích suy nghĩ của mình trong khu vực trò chuyện, ví dụ thư mục nào sẽ thêm trang và cách tổ chức logic trò chơi.

![](/zh-cn/stage-3/cross-platform/wechat-miniprogram/images/image12.png)![](/zh-cn/stage-3/cross-platform/wechat-miniprogram/images/image13.png)

2. Nó trực tiếp chỉnh sửa tệp dự án thực tế, thay vì chỉ đưa "mã mẫu" để sao chép-dán.
3. Sau khi hoàn thành, Trae xuất bản tóm tắt ngắn cho bạn biết tệp nào đã thay đổi và đã làm gì.

Nếu bạn không hài lòng với vòng này (hoặc nghĩ có gì sai), không cần hoảng hả. Trae cung cấp rollback ở góc trên bên ngoài hộp trò chuyện. Bạn có thể khôi phục trạng thái dự án trước khi có chỉ dẫn này bằng một cú nhấp - giống như một phím hoàn tác an toàn.

![](/zh-cn/stage-3/cross-platform/wechat-miniprogram/images/image14.png)

![](/zh-cn/stage-3/cross-platform/wechat-miniprogram/images/image15.png)

## 3.3 Xem Hiệu ứng trong HBuilderX và WeChat DevTools

Sau khi AI hoàn thành vòng phát triển đầu tiên, mã đã được viết vào dự án, nhưng bạn vẫn chưa thấy hiệu ứng thực tế từ phía người chơi.
Tiếp theo chúng ta cần chạy nó.

Thao tác cụ thể: quay lại HBuilderX, tìm menu trên cùng "Run," chọn "Run to Mini Program Simulator" -> "WeChat DevTools." Điều này kích hoạt xây dựng dự án và mở kết quả trong WeChat DevTools.

![](/zh-cn/stage-3/cross-platform/wechat-miniprogram/images/image16.png)

Bảng đầu ra ở phía dưới hiển thị quá trình xây dựng. Nếu trạng thái cuối cùng là "ready" không có lỗi, xây dựng thành công. Sau đó chuyển sang WeChat DevTools để kiểm tra UI và tính năng của phiên bản này.

![](/zh-cn/stage-3/cross-platform/wechat-miniprogram/images/image17.png)

Trong hầu hết trường hợp, HBuilderX tự động mở WeChat DevTools và bạn có thể trực tiếp thấy mini program đã cập nhật. Nếu không tự động mở, làm như sau:

1. Dừng chạy hiện tại trong HBuilderX trước.
2. Khởi chạy WeChat DevTools thủ công và giữ nó mở.
3. Quay lại HBuilderX, nhấp "Run -> Run to Mini Program Simulator -> WeChat DevTools" lại.

Sau đó bạn có thể thấy mini program vibecoding trong WeChat DevTools:

![](/zh-cn/stage-3/cross-platform/wechat-miniprogram/images/image18.png)

## 3.4 Sử dụng Ngôn ngữ Tự nhiên để Điều chỉnh Lặp lại cho đến khi Hài lòng

Trong thực hành này, AI ban đầu tạo ra một Rắn điều khiển bằng nút: bốn nút hướng trên màn hình và con rắn đổi hướng khi nhấp. Nó hoàn toàn có thể chơi được, nhưng cá nhân tôi thích điều khiển bằng cần analog. Đối với yêu cầu điều chỉnh của bạn (không chỉ tính năng mà còn thiết kế UI và bố cục; khi đã có kinh nghiệm, bạn thậm chí có thể yêu cầu AI tích hợp API mô hình bên ngoài hoặc cơ sở dữ liệu), lại một lần nữa: bạn chỉ cần mô tả yêu cầu bằng ngôn ngữ tự nhiên.

Đây là lợi thế cốt lõi của vibecoding: bạn không cần phải đào sâu vào mã để liên kết sự kiện hoặc logic tọa độ. Bạn trực tiếp nói cho AI biết bạn muốn gì. Ví dụ, trong hộp thoại Trae bạn có thể viết:

Thay nút bằng điều khiển cần analog. Khi người dùng nhả cần, rắn nên tiếp tục di chuyển theo hướng hiện tại cho đến hành động cần tiếp theo.

Miễn là yêu cầu rõ ràng, AI sẽ tự động định vị tệp mục tiêu và sửa đổi kiểu điều khiển, liên kết tương tác và logic xử lý hướng.

![](/zh-cn/stage-3/cross-platform/wechat-miniprogram/images/image19.png)

Sau khi sửa đổi, quay lại WeChat DevTools để kiểm tra.
Nếu thay đổi không hiển thị ngay lập tức, nhấp "Run" trong DevTools hoặc làm mới cửa sổ xem trước để áp dụng bản xây dựng mới nhất. Nếu vẫn chưa cập nhật, dừng chạy trong HBuilderX và chạy lại trên trình mô phỏng, sau đó bạn có thể thấy mini program đã cập nhật:

![](/zh-cn/stage-3/cross-platform/wechat-miniprogram/images/image20.png)

## 3.5 Nếu Xuất hiện Vấn đề: Tiếp tục Giao tiếp bằng Ngôn ngữ Tự nhiên

Các phiên bản do AI tạo ra không phải lúc nào cũng hoàn hảo ngay từ đầu. Bạn có thể gặp:

- lỗi thời gian chạy và ứng dụng không mở được;
- tính năng nhìn chung đúng nhưng chi tiết khác với kỳ vọng của bạn;
- UI sử dụng được nhưng vẫn chưa đẹp hoặc tiện dụng đủ.

Đây những lúc này, không cần tự mù quáng chỉnh sửa mã. Mô tả vấn đề trực tiếp cho trợ lý AI Trae bằng ngôn ngữ tự nhiên, ví dụ:

"Điều khiển cần analog giờ đã hoạt động, nhưng con rắn đôi khi đột ngột dừng lại. Vui lòng kiểm tra triển khai hiện tại."
Hoặc: "Trò chơi giờ đã chơi được, nhưng giao diện cảm thấy chật chội. Tôi muốn khoảng cách dọc nhiều hơn trên điện thoại. Vui lòng điều chỉnh bố cục."

AI sẽ sử dụng ngữ cảnh dự án hiện tại + mô tả của bạn, sau đó cung cấp và áp dụng thay đổi mã trực tiếp. Nếu kết quả trở nên tệ hơn hoặc hướng sai, bạn vẫn có thể rollback về phiên bản ổn định trước đó và thử cách diễn đạt khác.

Thông qua nhiều vòng như vậy, bạn có thể đánh bóng từ "phiên bản đầu tiên thô" đến một Rắn điều khiển bằng cần analog gần hơn với sở thích của bạn.
Ví dụ, tôi cung cấp hình ảnh tham khảo kiểu dáng và yêu cầu AI điều chỉnh kiểu UI tương ứng:

![](/zh-cn/stage-3/cross-platform/wechat-miniprogram/images/image21.png)

## 3.6 Kết quả Cuối cùng và Tóm tắt Phần

Sau nhiều vòng lặp **mô tả ngôn ngữ tự nhiên -> AI sửa đổi -> xem trước trong WeChat DevTools -> tiếp tục tinh chỉnh nhỏ**, tôi cuối cùng có được kết quả này:

- trang trò chơi hoàn chỉnh;
- con rắn di chuyển mượt mà và ăn thức ăn;
- hỗ trợ điều khiển cần analog;
- chạy đúng trong trình mô phỏng mini program.

Ví dụ sản phẩm cuối cùng:

![](/zh-cn/stage-3/cross-platform/wechat-miniprogram/images/image22.png)![](/zh-cn/stage-3/cross-platform/wechat-miniprogram/images/image23.png)![](/zh-cn/stage-3/cross-platform/wechat-miniprogram/images/image24.png)

Trong phần này, bạn đã thấy một vòng lặp khép kín hoàn chỉnh:

1. Trong Trae, một chỉ dẫn rõ ràng đã để AI xây dựng phiên bản mini program Rắn đầu tiên;
2. Với HBuilderX + WeChat DevTools, xác nhận hiệu ứng thực tế từ góc độ người dùng;
3. Tiếp tục đề xuất sửa đổi bằng ngôn ngữ tự nhiên, để AI xử lý tối ưu tính năng và UI;
4. Khi vấn đề xuất hiện, sử dụng rollback + chạy lại để giữ quy trình an toàn.

Tiếp theo, bạn có thể sử dụng cùng nhịp độ cho ý tưởng của riêng mình: không giới hạn ở Rắn mà còn mini program tiện ích, trang sự kiện hoặc nguyên mẫu kinh doanh thực tế. Nhiệm vụ chính của bạn là suy nghĩ rõ ràng và mô tả rõ ràng. Để AI và công cụ lo phần còn lại.

# 4. Phát hành Mini Program

Trong ba chương trước, chúng ta đã hoàn thành quy trình đầy đủ từ **thiết lập môi trường** -> **phát triển có hỗ trợ AI** -> **chạy Rắn trong trình mô phỏng cục bộ**.

Từ chương này, câu hỏi then chốt trở thành: **làm thế nào để thực sự xuất bản tác phẩm này lên WeChat, để nó không chỉ là đồ chơi mà là một mini program sử dụng được?**

Để giảm độ khó, trước tiên chúng ta thực hiện **vòng lặp ngắn nhất**: chỉ phát hành dưới dạng **phiên bản thử nghiệm/trải nghiệm** cho chính bạn và một vài đồng đội. Sau khi tính năng và trải nghiệm ổn định, sau đó mới tiến đến phát hành công khai chính thức.

Chương này trước hết bao gồm 4.1 để hoàn thành đường ngắn nhất cho **phát hành phiên bản trải nghiệm**. Phát hành chính thức cho tất cả người dùng được giải thích trong 4.2.

## 4.1 SOP Ngắn nhất - Ra mắt dưới dạng Phiên bản Trải nghiệm

Mục tiêu của phần phụ này chỉ có một điều: để bạn mở mini program Rắn của mình trong WeChat dưới dạng một **phiên bản trải nghiệm**.

Toàn bộ quy trình là bốn nhiệm vụ:

1. Tìm và xác nhận AppID của bạn trong Nền tảng Chính thức WeChat.
2. Cấu hình AppID này trong dự án của bạn.
3. Tải lên phiên bản hiện tại trong WeChat DevTools.
4. Quay lại Nền tảng Chính thức và đặt phiên bản đã tải lên này là "Phiên bản Trải nghiệm."

Hãy đi theo thứ tự này.

### 4.1.1 Xác nhận AppID trong Nền tảng Chính thức WeChat

Bước đầu tiên: xác nhận AppID mini program của bạn trong Nền tảng Chính thức WeChat.

Bạn đã làm việc này một lần trong **Phần 2 Thiết lập Môi trường**. Ở đây chúng ta sử dụng nó thực sự.

1. Truy cập `https://mp.weixin.qq.com` và đăng nhập vào backend mini program của bạn.
2. Tìm "Development Management" trong menu bên trái, sau đó vào "Development Settings."
3. Ở phía trên, tìm khu vực "Developer ID." Có một dòng "AppID (Mini Program ID)" - đây là ID duy nhất của bạn.

ID này phải khớp chính xác với cấu hình dự án. Nếu không WeChat sẽ xem nó là một định danh ứng dụng khác và xem trước/phát hành sẽ thất bại.

![](/zh-cn/stage-3/cross-platform/wechat-miniprogram/images/image25.png)

### 4.1.2 Điền AppID vào Dự án

Bước thứ hai: viết AppID này vào cấu hình dự án để ánh xạ bản xây dựng cục bộ đến tài khoản mini program chính thức của bạn.

Nếu dự án của bạn sử dụng mẫu uni-app, làm như sau:

1. Mở HBuilderX và tải dự án Rắn.
2. Tìm `manifest.json` trong cây tệp và mở nó.
3. Cuộn đến "WeChat Mini Program Configuration" và bạn sẽ thấy ô nhập liệu như "WeChat Mini Program AppID."
4. Dán AppID đã sao chép từ Nền tảng Chính thức chính xác và lưu tệp.
   ![](/zh-cn/stage-3/cross-platform/wechat-miniprogram/images/image26.png)

Giờ dự án cục bộ của bạn đã xác nhận định danh mini program này. Tiếp theo, khi bạn tải lên từ WeChat DevTools, nó sẽ được ghi dưới AppID này.

### 4.1.3 Tải lên Phiên bản trong WeChat DevTools

Chúng ta đã chạy dự án vào WeChat DevTools để xem trước trên trình mô phỏng.

Bây giờ chúng ta làm: "đóng gói mã hiện tại thành một phiên bản và tải lên máy chủ."

Các bước:

1. Trong thanh công cụ phía trên bên phải của WeChat DevTools, nhấp "Upload."
2. Trong cửa sổ popup, điền hai trường chính:
   1. Số phiên bản: ví dụ `1.0.0` (chỉ số và dấu chấm).
   2. Ghi chú dự án: mô tả ngắn, như "Hoàn thành lối chơi cốt lõi."
3. Xác nhận và nhấp "Upload." Bảng đầu ra hiển thị quá trình xây dựng. Nếu tất cả các bước chuyển sang màu xanh và tải lên hoàn tất, phiên bản này đã được gửi thành công đến máy chủ WeChat.

![](/zh-cn/stage-3/cross-platform/wechat-miniprogram/images/image27.png)

![](/zh-cn/stage-3/cross-platform/wechat-miniprogram/images/image28.png)

![](/zh-cn/stage-3/cross-platform/wechat-miniprogram/images/image29.png)![](/zh-cn/stage-3/cross-platform/wechat-miniprogram/images/image30.png)

### 4.1.4 Đặt Phiên bản đã Tải lên làm Phiên bản Trải nghiệm trong Backend

Tải lên chỉ gửi mã đến phía WeChat. Bạn vẫn cần nói cho hệ thống "đây là một phiên bản trải nghiệm."

Bước cuối cùng: quay lại backend Nền tảng Chính thức và hoàn tất vòng lặp.

1. Mở `https://mp.weixin.qq.com` và vào backend mini program.
2. Trong menu bên trái, tìm "Management" -> "Version Management."
3. Trong phần "Development Version," bạn sẽ thấy phiên bản đã tải lên: phiên bản `1.0.0`, ghi chú của bạn và dấu thời gian vừa tải lên.
4. Ở bên phải hàng này, sử dụng menu thả xuống/nút hành động để chọn "Set as Experience Version," xác nhận hành động. Trước bước này, đảm bảo danh mục chính đã được cấu hình trên trang chủ/cài đặt danh mục.

   ![](/zh-cn/stage-3/cross-platform/wechat-miniprogram/images/image31.png)

   ![](/zh-cn/stage-3/cross-platform/wechat-miniprogram/images/image32.png)

Sau khi hoàn tất, phiên bản này trở thành "Phiên bản Trải nghiệm" mini program của bạn. Bạn có thể tạo mã QR trải nghiệm trong backend, hoặc thêm chính mình/đội ngũ làm thành viên trải nghiệm, sau đó quét trong WeChat để thử nghiệm trên thiết bị thật.

Đến đây, chúng ta đã hoàn thành vòng lặp ngắn nhất từ dự án cục bộ đến phát hành thử nghiệm:

Bạn không cần mở cho tất cả người dùng WeChat ngay lập tức. Trong phạm vi an toàn, chạy mini program thực trong môi trường WeChat thực. Đủ cho thử nghiệm tính năng, thu thập phản hồi và lặp lại.

## 4.2 Ra mắt Chính thức Mini Program

Sau khi phiên bản trải nghiệm chạy tốt, bạn đã có thể chơi mini program Rắn này trong WeChat của riêng mình.
Bước tiếp theo là chuyển từ người dùng trải nghiệm hạn chế sang một mini program WeChat hoàn toàn công khai.

Chia thành các bước: hoàn thành thông tin cơ bản, chọn danh mục, hoàn tất nộp hồ sơ, sau đó gửi kiểm duyệt. Làm theo thứ tự này:

### 4.2.1 Vào Quy trình Phát hành Mini Program

Trước tiên quay lại backend Nền tảng Chính thức WeChat và đăng nhập.
Trong điều hướng bên trái tìm các mục liên quan đến "Version Management / Release" (UI có thể thay đổi nhẹ theo thời gian). Bạn sẽ tìm thấy "Mini Program Release Flow."

Sau khi vào, khu vực phía trên hiển thị thanh tiến trình. Bên dưới liệt kê các bước như:

1. Mini Program Information
2. Mini Program Category
3. Operation Information / Filing
4. WeChat Verification (tùy thuộc vào loại thực thể)

Ban đầu tiến trình là 0%. Khi mỗi bước hoàn thành, hệ thống tự động cập nhật.

![](/zh-cn/stage-3/cross-platform/wechat-miniprogram/images/image33.png)

### 4.2.2 Điền Thông tin Cơ bản Mini Program

Bước đầu tiên là hoàn thành "danh thiếp" mini program của bạn, là những gì người dùng thấy đầu tiên trong WeChat.

Trên trang "Mini Program Information," bạn thường cần điền/xác nhận:

1. Tên mini program
   Nó xuất hiện trong kết quả tìm kiếm và tiêu đề ứng dụng. Có giới hạn độ dài và quy tắc đặt tên. Chọn tên mô tả chức năng và dễ nhớ.
2. Mô tả / giới thiệu
   Sử dụng một hoặc hai câu để giải thích mini program này làm gì, ví dụ: "Trò chơi Rắn được phát triển bằng lập trình có hỗ trợ AI, phù hợp chơi giải trí nhanh."
   Giữ mô tả nhất quán với chức năng thực tế và tránh văn bản tiếp thị phóng đại.
3. Biểu tượng và ảnh chụp màn hình
   1. Biểu tượng thường yêu cầu hình vuông với hỗ trợ PNG/JPG và giới hạn kích thước/pixel (kiểm tra quy tắc trang). Sử dụng biểu tượng đơn giản, độ tương phản cao.
   2. Tải lên một số ảnh chụp màn hình như trang chủ, trang trò chơi, trang cài đặt. Chúng giúp người dùng hiểu nội dung.
4. Các trường bắt buộc khác
   Như thẻ và khu vực dịch vụ, điền theo hướng dẫn.
   Chỉ một nguyên tắc: tất cả thông tin phải khớp với chức năng thực tế của mini program Rắn của bạn.

![](/zh-cn/stage-3/cross-platform/wechat-miniprogram/images/image34.png)

Sau khi tất cả các trường hoàn tất, nhấp Save hoặc Next. Bước đầu tiên trong quy trình phát hành hoàn tất.

### 4.2.3 Chọn Danh mục Dịch vụ Mini Program

Sau khi thông tin cơ bản xong, hướng dẫn đưa bạn đến "Mini Program Category."
Danh mục là phân loại ứng dụng của bạn trong WeChat, ảnh hưởng đến lộ trình kiểm duyệt và hiển thị/vận hành sau này.

![](/zh-cn/stage-3/cross-platform/wechat-miniprogram/images/image35.png)

Trên trang này bạn sẽ thấy "Add Category." Nhấp vào đó và chọn danh mục phù hợp trong cây danh mục hệ thống, ví dụ:

![](/zh-cn/stage-3/cross-platform/wechat-miniprogram/images/image36.png)

1. Chọn "Education" làm danh mục cấp cao nhất;
2. Sau đó chọn danh mục phụ cụ thể hơn như "Education Tools / Teaching Assistant." Trong ví dụ này, công cụ giáo dục được chọn làm trợ trợ học tập cho vibecoding.

Trong dự án của riêng bạn, chỉ cần chọn danh mục phù hợp nhất theo trường hợp sử dụng thực tế.

![](/zh-cn/stage-3/cross-platform/wechat-miniprogram/images/image37.png)

![](/zh-cn/stage-3/cross-platform/wechat-miniprogram/images/image38.png)

Sau khi xác nhận danh mục, nhấp Save. Nếu trang hiển thị "category created successfully" và hiển thị mục mới của bạn, bước này hoàn tất.

### 4.2.4 Hoàn tất Thông tin Nộp hồ sơ

Tiếp theo, quy trình phát hành yêu cầu "Operation Information / Filing." Điều này xác minh thực thể chịu trách nhiệm đằng sau mini program.

![](/zh-cn/stage-3/cross-platform/wechat-miniprogram/images/image39.png)

Trong ví dụ thực thể cá nhân, quy trình thường bao gồm:

1. Chọn loại nộp hồ sơ
   Chọn giữa các loại như "Individual" hoặc "Enterprise," phù hợp với thực thể đăng ký của bạn.
2. Điền thông tin thực thể
   Bao gồm tên, loại giấy tờ, số giấy tờ, v.v. Phải khớp với thông tin đăng ký, nếu không kiểm duyệt có thể từ chối.
3. Tải lên tài liệu hỗ trợ
   Thường yêu cầu ảnh giấy tờ tùy thân hoặc tệp chứng minh khác, với yêu cầu định dạng/kích thước/độ nét cụ thể hiển thị trên trang. Chuẩn bị và tải lên tệp rõ ràng.
   ![](/zh-cn/stage-3/cross-platform/wechat-miniprogram/images/image40.png)

Sau khi gửi, hệ thống chuyển sang "đang được kiểm duyệt" và hiển thị thông báo như "Information submitted, please wait." Việc này có thể mất một thời gian. Bạn có thể kiểm tra tiến độ bất kỳ lúc nào trong backend.

![](/zh-cn/stage-3/cross-platform/wechat-miniprogram/images/image41.png)

### 4.2.5 Gửi Kiểm duyệt và Đợi Phát hành Chính thức

Khi "Mini Program Information," "Category" và "Operation Information/Filing" đều hoàn tất, thực hiện hành động cuối cùng: gửi kiểm duyệt.

1. Quay lại trang tổng quan quy trình phát hành và xác nhận tất cả mục hiển thị hoàn tất, với tiến trình gần 100%.
2. Nhấp "Submit for Review" (hoặc nút tương tự) để gửi phiên bản phát triển hiện tại đến đội kiểm duyệt WeChat.
3. Trong "Version Management," trạng thái phiên bản này trở thành "Under Review." Sau khi được phê duyệt nó trở thành "Published" hoặc sẵn sàng để "Go Live."

Nếu kiểm duyệt hồ sơ thất bại, nhà phát triển có thể nhận được cuộc gọi chỉ định các phần thất bại.

Đối với hồ sơ, bạn có thể nhận mã xác nhận và liên kết xác nhận từ Bộ Công nghiệp và Công nghệ Thông tin. Mở liên kết và điền mã + thông tin cá nhân (xác nhận có hiệu lực 1 ngày). Nếu hồ sơ vượt qua, bạn nhận email và SMS thông báo với số hồ sơ.
Xác minh WeChat: cá nhân thường trả 30 CNY, doanh nghiệp khoảng 300 CNY. Phí không hoàn lại bất kể kết quả phê duyệt. Bạn có thể nhận thông báo xác minh và cuộc gọi xác nhận.

Khi gửi kiểm duyệt, tải lên video hoạt ảnh/ảnh chụp màn hình và điền thông tin yêu cầu. Sau đó nhấp "Submit Release" để phát hành chính thức.

![](/zh-cn/stage-3/cross-platform/wechat-miniprogram/images/image42.png)

# 5. Tóm tắt

Đến đây, bạn đã hoàn thành một vòng lặp phát triển mini program đầy đủ **từ 0 đến 1**: từ việc hiểu mini program, đến cài đặt Trae, HBuilderX và WeChat DevTools; từ việc đưa ý tưởng cho AI và để nó "xây gạch" trong mã, đến chơi phiên bản Rắn đầu tiên trong trình mô phỏng; sau đó đóng gói thành phiên bản trải nghiệm, hoàn tất hồ sơ/kiểm duyệt và làm cho nó thực sự sử dụng được trong WeChat - bạn đã tự mình chạy qua toàn bộ chuỗi một lần.

Quan trọng hơn, bạn đạt được điều này không phải bằng cách ghi nhớ cú pháp. Bạn đạt được bằng cách thể hiện yêu cầu rõ ràng + giao tiếp hiệu quả với AI. Bạn đã trải nghiệm điều này: **một chỉ dẫn bằng ngôn ngữ tự nhiên có thể để AI đáp ứng nhu cầu phát triển của bạn rất hiệu quả**. Khả năng này không giới hạn ở Rắn. Nó có thể chuyển sang bất kỳ mini program nào bạn muốn xây dựng sau này - công cụ, trang sự kiện, ứng dụng giáo dục hoặc dự án công việc thực tế.

Nếu chúng ta tóm tắt thành một **SOP tổng quát**, chỉ có năm bước:
**Làm rõ một yêu cầu nhỏ -> xây dựng khung dự án trong Trae -> sử dụng vibecoding + AI để tạo phiên bản đầu tiên -> liên tục thử nghiệm và cải thiện trong WeChat DevTools -> tải lên, nộp hồ sơ, kiểm duyệt và ra mắt.**
Mỗi lần bạn lặp lại năm bước này, bạn có thêm một mini program thực có thể mở và chia sẻ, và thêm một tầng tự tin rằng "tôi có thể sử dụng AI để biến ý tưởng thành sản phẩm."

Tiếp theo, bạn có thể tiếp tục đánh bóng ứng dụng Rắn này hoặc đóng nó lại và bắt đầu một dự án trắng từ ý tưởng riêng. Bất kể bạn xây dựng gì, hãy nhớ một điều: bạn không còn chỉ là người "muốn xây dựng gì đó." Bạn đã là một nhà phát triển vibecoding đã chạy qua toàn bộ quy trình làm việc. Phần còn lại là lặp lại cho đến khi khả năng này trở thành thói quen.

# Tài liệu Tham khảo:

- https://zhuanlan.zhihu.com/p/1889401120939567074
- https://blog.csdn.net/2401_87407347/article/details/155193007
