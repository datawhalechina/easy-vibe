# Cách Xây dựng Ứng dụng Android Đơn giản - Phát triển Native Compose

# 1 Ứng dụng Android và Phát triển Android Là Gì

Trong hướng dẫn này, chúng ta sẽ hoàn thành một vòng lặp khép kín: **từ một ý tưởng trong đầu đến một ứng dụng thực sự có thể được cài đặt và chạy thành công trên điện thoại Android.**

Để thực hiện hướng dẫn này, bạn ít nhất cần có:

- Một máy tính có hiệu năng khá (Windows hoặc Mac)
- Một điện thoại Android (tùy chọn; nếu không có, chúng ta sẽ sử dụng trình mô phỏng)
- Đã cài đặt Android Studio (để xây dựng)
- Đã cài đặt và đăng ký Trae (để lập trình AI)

## 1.1 Định nghĩa Ứng dụng Android

Ứng dụng Android là một ứng dụng native chạy trên hệ điều hành Android. Khác với mini program, nó không phụ thuộc vào một nền tảng chủ nào như WeChat. Nó chạy trực tiếp ở cấp hệ thống. Ứng dụng có biểu tượng riêng trên màn hình chính, khởi động nhanh, hoạt động mượt mà và có thể truy cập sâu vào các tính năng cấp hệ thống như Bluetooth, cảm biến và dịch vụ chạy nền.

![](/zh-cn/stage-3/cross-platform/android-app/images/image1.png)

## 1.2 Phát triển Ứng dụng Android

Phát triển Android là toàn bộ quá trình xây dựng các ứng dụng như vậy. Trong chế độ phát triển Vibe Coding được sử dụng trong hướng dẫn này, với **lập trình có hỗ trợ AI**, vai trò của nhà phát triển chuyển từ "người viết code" sang "kiến trúc sư sản phẩm":

1. **Bạn (kiến trúc sư / PM)**: chịu trách nhiệm thiết kế logic nghiệp vụ, viết prompt và nghiệm thu kết quả cuối cùng.
2. **Trae (kỹ sư AI)**: chịu trách nhiệm thực thi hướng dẫn, chuyển đổi ngôn ngữ tự nhiên thành code Kotlin tiêu chuẩn và bố cục Jetpack Compose, xử lý lỗi cú pháp và chi tiết logic.
3. **Android Studio (nhà máy xây dựng)**: chịu trách nhiệm cung cấp môi trường biên dịch, đóng gói code thành ứng dụng có thể chạy và cung cấp bản xem trước trình mô phỏng.

## 1.3 Các Cách Phổ biến để Xây dựng Ứng dụng Android

Trong phát triển thực tế, có nhiều hơn một cách để xây dựng ứng dụng Android. Chúng ta sẽ không đi sâu ở đây, mà chỉ cung cấp một cái nhìn tổng quan.

**Cách thứ nhất: Phát triển Native**
Đây là lộ trình chính thức và được Google khuyến nghị. Bạn trực tiếp sử dụng **Kotlin** và **Jetpack Compose** để phát triển. Ưu điểm của nó là hiệu suất tốt nhất và truy cập đầy đủ vào phần cứng điện thoại.

![](/zh-cn/stage-3/cross-platform/android-app/images/image2.png)![](/zh-cn/stage-3/cross-platform/android-app/images/image3.png)

**Cách thứ hai: Phát triển Cross-Platform**
Ví dụ Flutter hoặc React Native. Ý tưởng cốt lõi là "viết một codebase và tạo ra cả ứng dụng Android và iOS."

**Cách thứ ba: Phát triển Hybrid**
Về bản chất, đây là việc bọc một trang web bên trong một vỏ ứng dụng. Cách này phát triển nhanh, nhưng trải nghiệm và độ mượt thường không tốt bằng ứng dụng native, và khó xây dựng một công cụ nhỏ tinh tế và cuốn hút theo cách này.

**Lựa chọn của hướng dẫn này: phát triển native (** **Kotlin + Compose)** kết hợp với công cụ AI để lập trình.
Lý do rất đơn giản: code native Jetpack Compose có cấu trúc rất rõ ràng và cực kỳ phù hợp để AI hiểu và tạo ra. Chúng ta không cần viết code từ đầu. Thay vào đó, chúng ta hướng dẫn Trae bằng ngôn ngữ tự nhiên để tạo ra code native chất lượng cao.

![](/zh-cn/stage-3/cross-platform/android-app/images/image4.png)

## 1.4 Các Bước Phát triển Ứng dụng Android được Trình bày trong Hướng dẫn này

Để quá trình học tập trở nên thú vị hơn, hướng dẫn này xoay quanh một case study thư giãn nhưng mang tính đại diện về mặt kỹ thuật - **Mõ Gỗ Điện tử**. Chúng ta kết hợp chế độ Vibe Coding của Trae với một lộ trình bạn có thể tái sử dụng nhiều lần:

1. **Xây dựng hiểu biết và môi trường**: hiểu ứng dụng Android là gì, cài đặt Android Studio và Trae, và cấu hình mirror phù hợp để bộ công cụ hoạt động trơn tru.
2. **Xây dựng khung dự án**: tạo một dự án Android trống có thể chạy thành công trong trình mô phỏng.
3. **Phát triển lặp với AI**: mở dự án trong Trae, sau đó thông qua hội thoại với AI, dần dần triển khai hình ảnh mõ gỗ, hoạt ảnh khi chạm, hiệu ứng âm thanh, văn bản nổi và nhiều hơn nữa.
4. **Gỡ lỗi trên thiết bị thực và tinh chỉnh**: vượt ra khỏi trình mô phỏng, cài đặt ứng dụng trên điện thoại thực, trải nghiệm phản hồi rung thực và để AI giúp điều tra lỗi.
5. **Đóng gói và xuất bản**: tạo một APK chính thức và hiểu cách chia sẻ hoặc phát hành nó.

Phần này chỉ vẽ bức tranh tổng thể và không mở rộng tất cả các lệnh. Hiện tại, chỉ cần nhớ dòng chính: **thiết lập môi trường -> xây dựng khung -> mô tả và tạo bằng AI -> tinh chỉnh trên thiết bị thực -> đóng gói và bàn giao**. Trong các chương tiếp theo, chúng ta sẽ hướng dẫn bạn qua từng bước.

# 2 Thiết lập Môi trường Phát triển

## 2.1 Các Công cụ Sử dụng trong Hướng dẫn này

Trong toàn bộ quá trình phát triển, chúng ta sử dụng ba công cụ cùng nhau, đóng vai trò "thiết kế," "xây dựng," và "nghiệm thu."

- **Trae**: đây là **đối tác lập trình AI** của bạn. Trong chế độ Vibe Coding, chúng ta không còn cần gõ code từng dòng. Thay vào đó, chúng ta chủ yếu nói với AI bằng ngôn ngữ tự nhiên những gì mình muốn, và nó xử lý việc tạo và sửa đổi code.
- **Android Studio**: đây là **nhà máy xây dựng ứng dụng** chính thức của Google. Mặc dù có nhiều nút, trong hướng dẫn này chúng ta chủ yếu sử dụng nó để tạo khung dự án và biên dịch code do Trae tạo thành thứ có thể cài đặt trên điện thoại.
- **Một thiết bị Android**: đóng vai trò là **thiết bị kiểm tra** để xem kết quả. Bạn có thể kết nối nó với máy tính để gỡ lỗi thiết bị thực và cảm nhận phản hồi rung thực. Nếu không có, **trình mô phỏng** tích hợp sẵn của Android Studio có thể mô phỏng một điện thoại ảo hoàn hảo, đủ cho giai đoạn phát triển ban đầu.

## 2.2 Tải xuống Trae

Trae là chiến trường chính của chúng ta cho **Vibe Coding**. Bạn có thể hiểu đơn giản nó là một **"trình soạn thảo code có tích hợp AI."**

Truy cập trang web chính thức [https://www.trae.cn](https://www.trae.cn), tải xuống phiên bản phù hợp với hệ thống máy tính của bạn (Windows hoặc Mac), và cài đặt như phần mềm thông thường bằng cách nhấp đúp vào trình cài đặt và làm theo hướng dẫn. Khi công cụ này sẵn sàng, trong thực hành sau này chúng ta sẽ ngừng nhìn vào các cửa sổ code nhàm chán và thay vào đó mở dự án tại đây và nói với AI những gì cần xây dựng bằng ngôn ngữ tự nhiên.

![](/zh-cn/stage-3/cross-platform/android-app/images/image5.png)

## 2.3 Tải xuống Android Studio

Chúng ta cần Android Studio để cung cấp Android SDK và trình mô phỏng cần thiết để chạy ứng dụng. Truy cập trang tải xuống chính thức [https://developer.android.com/studio?hl=zh-cn](https://developer.android.com/studio?hl=zh-cn) và tải xuống gói cho hệ điều hành của bạn (hướng dẫn này dựa trên **2025.2.3**). Sau khi tải xuống, cài đặt như phần mềm thông thường, giữ các tùy chọn mặc định xuyên suốt.

**Lưu ý đặc biệt cho người mới bắt đầu:**

Mặc dù các phiên bản hiện đại của Android Studio đã đơn giản hóa việc cấu hình đáng kể, nhưng nó vẫn phụ thuộc vào **JDK (Java Development Kit)** bên dưới. Nếu đây là lần đầu tiên bạn làm phát triển, hoặc nếu bạn gặp lỗi liên quan đến biến môi trường hoặc cấu hình SDK trong quá trình cài đặt, đừng hoảng sợ. Bạn có thể tham khảo hướng dẫn thiết lập chi tiết này: [Android Studio 2024 setup: SDK and Gradle configuration](https://blog.csdn.net/keiraee/article/details/142321644?ops_request_misc=elastic_search_misc&request_id=a2b858d1f665095c53afa9114ad8864d&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~top_positive~default-2-142321644-null-null.142^v102^pc_search_result_base4&utm_term=android%20studio%E5%AE%89%E8%A3%85%E5%8F%8A%E9%85%8D%E7%BD%AE&spm=1018.2226.3001.4187)

![](/zh-cn/stage-3/cross-platform/android-app/images/image6.png)

## 2.4 Tạo một Dự án Mới

Mở Android Studio và nhấp vào **New Project** trên màn hình chào mừng.

**Bước 1: Chọn mẫu**

Trong danh sách mẫu, chọn **Empty Activity** (lưu ý biểu tượng Jetpack Compose trên đó).

![](/zh-cn/stage-3/cross-platform/android-app/images/image7.png)![](/zh-cn/stage-3/cross-platform/android-app/images/image8.png)

**Bước 2: Điền thông tin cấu hình dự án**

Sau đó bạn sẽ thấy một biểu mẫu cấu hình. Điền đại loại như sau và giữ phần còn lại ở mặc định:

| **Trường** | **Giá trị Khuyến nghị** | **Giải thích** |
| ----------------- | -------------------------------------------------- | ---------------------------------------- |
| **Name** | My Application 1 | Tên ứng dụng hiển thị trên màn hình chính điện thoại |
| **Package name** | com.example.myapplication1 | Định danh ứng dụng duy nhất |
| **Save location** | Đường dẫn tùy chỉnh (ví dụ `E:\AndroidProjects\Myapplication1`) | Vị trí lưu trữ dự án; không khuyến nghị đặt trên ổ đĩa C |
| **Minimum SDK** | API 30 | Phủ hơn 90% thiết bị đang hoạt động đồng thời cân bằng khả năng tương thích và tính năng |
| **Language** | Kotlin (được khuyến nghị) | Kotlin là ngôn ngữ được Google khuyến nghị chính thức, gọn gàng và an toàn hơn |

![](/zh-cn/stage-3/cross-platform/android-app/images/image9.png)

**Bước 3: Chờ xây dựng dự án**

Nhấp vào **Finish**. Android Studio sẽ tự động tải xuống các phụ thuộc và xây dựng dự án (bạn sẽ thấy thanh tiến trình ở góc dưới bên phải).

- _Lưu ý: việc tạo dự án lần đầu có thể mất vài phút. Hãy kiên nhẫn chờ đợi cho đến khi tiến trình ở dưới cùng hoàn tất và cây tệp dự án được tải đầy đủ ở bên trái._

## 2.5 Cấu hình Phụ thuộc: Tải xuống Gradle và Mirror Kho Gradle

> Đây là một trong số ít các bước trong quy trình làm việc Vibe Coding mà **thao tác thủ công** được khuyến nghị. Mặc dù AI cũng có thể giúp sửa đổi cấu hình, nhưng cấu hình môi trường liên quan đến các tệp cấp thấp, nên thay đổi thủ công đáng tin cậy hơn.

Tại sao cần sửa đổi cấu hình?

Theo mặc định, Android Studio kết nối đến các máy chủ ở nước ngoài, do đó việc tải xuống công cụ xây dựng và phụ thuộc có thể mất một giờ hoặc thậm chí thất bại. Sau khi chuyển sang mirror trong nước, thường hoàn thành trong vài phút. **Đây là một tác vụ một lần mang lại lợi ích mãi mãin.**

1. **Chuẩn bị**

Nếu thanh trạng thái ở góc dưới bên phải của Android Studio đang hiển thị thanh tiến trình như `Gradle Building...`, hãy tạm dừng việc tải xuống phụ thuộc đang diễn ra để tránh xung đột tệp.

![](/zh-cn/stage-3/cross-platform/android-app/images/image10.png)

2. **Tăng tốc tải xuống Gradle**

Trong cây tệp dự án ở bên trái, mở rộng `gradle` -> `wrapper`, sau đó mở `gradle-wrapper.properties`. Thay đổi nguồn tải xuống thành mirror của Tencent:

```text
distributionUrl=https\://mirrors.cloud.tencent.com/gradle/gradle-8.7-bin.zip
```

Lưu ý: bạn chỉ cần thay thế `services.gradle.org/distributions` bằng `mirrors.cloud.tencent.com/gradle`. Không thay đổi bất cứ điều gì khác.

![](/zh-cn/stage-3/cross-platform/android-app/images/image11.png)

3. **Tăng tốc tải xuống kho phụ thuộc**

Tiếp theo, mở `settings.gradle.kts` trong thư mục gốc dự án, và thay thế nội dung bên trong khối `repositories` bằng nội dung sau:

![](/zh-cn/stage-3/cross-platform/android-app/images/image12.png)

Thay thế phần được highlight bằng code sau (danh sách nguồn mới nhất tính đến 2025-02-21):

```json
        // Aliyun mirrors (bao gồm Maven Central, Google, JCenter, v.v.)
        maven { setUrl("https://maven.aliyun.com/repository/public/") }
        maven { setUrl("https://maven.aliyun.com/repository/google/") }
        maven { setUrl("https://maven.aliyun.com/repository/jcenter/") }
        maven { setUrl("https://maven.aliyun.com/repository/gradle-plugin/") }
        // Huawei Cloud mirror
        maven { setUrl("https://repo.huaweicloud.com/repository/maven/") }
        // Tencent Cloud mirror
        maven { setUrl("https://mirrors.cloud.tencent.com/nexus/repository/maven-public/") }
        // NetEase mirror
        maven { setUrl("https://mirrors.163.com/maven/repository/maven-public/") }
```

Sau đó nó sẽ trông giống như ảnh chụp màn hình bên dưới:

![](/zh-cn/stage-3/cross-platform/android-app/images/image13.png)

4. **Lưu và áp dụng thay đổi**

Lúc này, lưu tệp và nhấp vào `Try Again` ở góc trên bên phải. Android Studio sẽ chạy lại quá trình tải xuống. Chờ vài phút. Khi bảng điều khiển hiển thị `BUILD SUCCESSFUL`, điều đó có nghĩa là việc thiết lập môi trường đã hoàn tất và chúng ta đã sẵn sàng bắt đầu lập trình.

![](/zh-cn/stage-3/cross-platform/android-app/images/image14.png)

## 2.6 Hiểu Cấu trúc Dự án

Sau khi tạo dự án thành công, bảng **Project** sẽ xuất hiện ở bên trái. Chuyển sang chế độ xem **Android** (mặc định), và bạn sẽ thấy các thư mục chính như sau:

```text
app/
├── manifests/
│   └── AndroidManifest.xml            <- "CMND" của ứng dụng, khai báo tên ứng dụng và Activity đầu vào (MainActivity)
│
├── java/
│   └── com.example.myapplication1/
│       ├── MainActivity.kt            <- đầu vào ứng dụng, xây dựng UI bằng Jetpack Compose
│       │
│       └── ui/                        <- kiểm soát phong cách UI tổng thể (màu sắc, phông chữ)
├── res/
│   ├── drawable/                      <- tài nguyên hình ảnh (ví dụ ic_launcher.png)
│   ├── mipmap/                        <- biểu tượng ứng dụng
│   ├── values/                        <- văn bản, màu sắc, phong cách chủ đề
│   │   ├── colors.xml
│   │   ├── strings.xml
│   │   └── themes.xml
│   └── xml/                           <- tệp cấu hình liên quan đến hệ thống (không phải UI)
└── build.gradle (Module: app)         <- cấu hình xây dựng ứng dụng (thường không chạm ở giai đoạn người mới bắt đầu)
```

Là người mới bắt đầu, chúng ta thường chỉ cần quan tâm đến ba tệp:

- `MainActivity.kt`: kiểm soát hành vi và quyết định "những gì xuất hiện trên màn hình"
- `AndroidManifest.xml`: đăng ký các thành phần và quyết định "ứng dụng bắt đầu từ đâu"
- `Theme.kt`: định nghĩa diện mạo trực quan

# 3 Phát triển Ứng dụng Android

Trong hai chương đầu, chúng ta đã hiểu ứng dụng Android là gì và mài giũa hai công cụ chính: Trae và Android Studio. Từ phần này trở đi, chúng ta rời khỏi phần thảo luận lý thuyết và bước vào thực hành thực tế. Chúng ta sẽ áp dụng chế độ Vibe Coding để xây dựng một ứng dụng giảm căng thẳng rất phổ biến từ đầu - **Mõ Gỗ Điện tử**. Nó phù hợp với chủ đề "Vibe" (đơn giản và thư giãn), đồng thời bao gồm ba phần cốt lõi của phát triển Android: **tương tác UI (chạm), lưu trữ dữ liệu (số công đức) và đa phương tiện (hiệu ứng âm thanh)**.

Bây giờ, hãy làm theo và gửi hướng dẫn đầu tiên cho AI.

## 3.1 "Master Prompt" Đầu tiên: Từ Không đến Một

Trong chế độ Vibe Coding, chúng ta không cần phải tạo tệp bố cục trước rồi viết code logic như phát triển truyền thống. Điều chúng ta cần làm là **mô tả yêu cầu rõ ràng trong một lần và để AI tạo ra nguyên mẫu chạy được đầu tiên**.

Mở thư mục dự án vừa tạo trong Trae, và trong bảng trò chuyện ở bên phải, nhập Prompt sau:

```text
Bạn là một chuyên gia phát triển Android kỳ cựu. Vui lòng viết lại MainActivity.kt hiện tại và biến nó thành ứng dụng "Mõ Gỗ Điện tử". Yêu cầu:
1. Nền màn hình màu đen.
2. Hiển thị hình ảnh mõ gỗ ở trung tâm màn hình, kích thước vừa phải, màu trắng.
3. Hiển thị một dòng văn bản màu trắng phía trên: "Công đức: 0".
4. Khi chạm vào mõ gỗ ở trung tâm, số tăng lên 1 và xuất hiện hiệu ứng hoạt ảnh phóng to thu nhỏ đơn giản (mô phỏng cảm giác gõ).
5. Sử dụng Jetpack Compose.
```

Sau khi gửi, Trae sẽ bắt đầu phân tích cấu trúc dự án của bạn. Vài giây sau, nó sẽ trực tiếp tạo ra code hoàn chỉnh cho `MainActivity.kt`.

1. Từ phản hồi, chúng ta có thể thấy logic suy luận và logic tương tác của nó
2. Chúng ta có thể trực tiếp thấy những phần code nào đã được viết lại
3. Nếu không hài lòng với kết quả, chúng ta có thể quay lại phiên bản trước

![](/zh-cn/stage-3/cross-platform/android-app/images/image15.png)

## 3.2 Chạy và Xem trước (Gỡ lỗi Trình mô phỏng)

Lúc này, AI đã hoàn thành vòng phát triển đầu tiên. Nhưng hãy nhớ rằng, những gì chúng ta thấy trong Trae chỉ là "bản thiết kế" code, không phải là một ứng dụng tương tác thực sự. Trae bản thân không thể chạy trực tiếp ứng dụng Android, nên chúng ta cần dựa vào **trình mô phỏng Thiết bị Ảo** do Android Studio cung cấp. Nó giống như biến màn hình máy tính của bạn thành một điện thoại Android ảo, cho phép chúng ta cài đặt code ngay lập tức và xem kết quả thực tế.

Tiếp theo, hãy cấu hình "chiếc điện thoại ảo" này.

**Bước 1: Tạo trình mô phỏng**

Quay lại Android Studio, tìm và nhấp vào **Device Manager** trong thanh công cụ bên phải. Nếu không tìm thấy, mở từ `View -> Tool Windows -> Device Manager`.

Trong bảng điều khiển, nhấp vào **Add a new device**, sau đó chọn **Create Virtual Device** để vào cửa sổ chọn thiết bị.

![](/zh-cn/stage-3/cross-platform/android-app/images/image16.png)

![](/zh-cn/stage-3/cross-platform/android-app/images/image17.png)

Trong cửa sổ chọn phần cứng, chọn **Phone** rồi **Smart Phone** (kích thước màn hình trung bình), hoặc bất kỳ hồ sơ thiết bị nào bạn thích như Pixel, sau đó nhấp vào **Next**.

![](/zh-cn/stage-3/cross-platform/android-app/images/image18.png)

**Bước 2: Cấu hình hình ảnh hệ thống**

Trong hộp thoại **System Image**, chọn **API 36.1**. Nếu chưa được tải xuống, nhấp vào **Download** trước, sau đó chọn sau khi tải xong, và nhấp vào **Finish**.

![](/zh-cn/stage-3/cross-platform/android-app/images/image19.png)

**Bước 3: Khởi động trình mô phỏng**

Sau khi tạo thành công, điện thoại mới của bạn sẽ xuất hiện trong danh sách quản lý thiết bị. Nhấp vào **nút phát hình tam giác** ở bên phải. Sau một khoảng chờ ngắn, một cửa sổ hình điện thoại sẽ bật lên - đây là trình mô phỏng Android của bạn.

![](/zh-cn/stage-3/cross-platform/android-app/images/image20.png)

![](/zh-cn/stage-3/cross-platform/android-app/images/image21.png)

**Bước 4: Chạy ứng dụng**

Bây giờ là khoảnh khắc kỳ diệu. Đảm bảo trình mô phỏng đã khởi động và đang hiển thị màn hình chính, sau đó nhấp vào **nút Run tam giác xanh nổi bật** trên thanh công cụ trên cùng của Android Studio (hoặc sử dụng phím tắt `Shift + F10`). Android Studio sẽ tự động biên dịch code do Trae viết, đóng gói thành ứng dụng và cài đặt vào trình mô phỏng.

Trong vài giây, bạn sẽ thấy màn hình trình mô phỏng sáng lên, hiển thị hình ảnh mõ gỗ màu trắng ở trung tâm với văn bản "Công đức: 0" phía trên. Thử chạm vào nó và xem số có tăng lên và hoạt ảnh có hoạt động không. Đây là ứng dụng Android đầu tiên của bạn.

![](/zh-cn/stage-3/cross-platform/android-app/images/image22.png)

![](/zh-cn/stage-3/cross-platform/android-app/images/image23.png)

## 3.3 Lặp Tối ưu hóa (Thêm Tài nguyên và Âm thanh)

Ở giai đoạn này, ứng dụng của chúng ta đã có hình dạng cơ bản: chạm để tăng số. Nhưng nó vẫn chỉ là một hình học màu trắng "câm", thiếu tính thú vị. Tiếp theo, chúng ta sẽ làm cho Mõ Gỗ Điện tử trở nên cuốn hút hơn nhiều bằng cách thêm hình ảnh thực sự và hiệu ứng âm thanh gõ.

**Đây chính là phần hấp dẫn nhất của chế độ Vibe Coding.** Trong phát triển truyền thống, việc thêm hiệu ứng âm thanh và hoạt ảnh phức tạp hơn thường là ác mộng của người mới bắt đầu. Bạn cần quản lý việc tải và giải phóng tài nguyên `MediaPlayer` (nếu không có thể gây rò rỉ bộ nhớ), và cũng phải tính toán đường cong hoạt ảnh. Trong chế độ Vibe Coding, bạn không cần quan tâm đến những chi tiết cấp thấp này. Bạn chỉ cần nói với AI như một đạo diễn: "thay đổi đạo cụ và thêm âm thanh khi chạm," và phần triển khai xuất hiện ngay lập tức.

**Bước 1: Chuẩn bị tài nguyên**
Bạn cần một hình ảnh mõ gỗ (`png`) và một hiệu ứng âm thanh gõ (`mp3`).

- **Tài nguyên hình ảnh**: sao chép `white_muyu.png` đã chuẩn bị vào `app/src/main/res/drawable`
- **Tài nguyên âm thanh**: trong Android Studio, nhấp chuột phải vào thư mục `res` trong bảng dự án bên trái, chọn `New -> Android Resource Directory`, chọn **raw** làm loại tài nguyên, nhấp OK, sau đó sao chép `voice.mp3` vào thư mục `res/raw` mới tạo. _(Lưu ý: nếu bạn dự định phát hành thương mại, hãy đảm bảo bạn có quyền hợp pháp đối với tất cả tài nguyên.)_

Dưới đây là hình ảnh và tài nguyên âm thanh tôi tìm thấy cho bạn. Nếu bạn không tiện tự tìm, có thể sử dụng trực tiếp.

![](/zh-cn/stage-3/cross-platform/android-app/images/image24.png)

Link tải xuống âm thanh gõ: https://www.aigei.com/s?q=%E6%9C%A8%E9%B1%BC&type=sound
Chọn hiệu ứng âm thanh 1 giây đầu tiên.

![](/zh-cn/stage-3/cross-platform/android-app/images/image25.png)

**Bước 2: Gửi hướng dẫn lặp**

Sau khi tài nguyên đã sẵn sàng, quay lại Trae. Trae sẽ sửa đổi code một lần nữa và xử lý logic tải âm thanh và hoạt ảnh cho bạn. Bạn chỉ cần nói với nó tài nguyên nào cần sử dụng. Nhập Prompt này:

```text
Tôi đã thêm các tài nguyên. Đường dẫn hình ảnh là res/drawable/white_muyu.png và đường dẫn âm thanh là res/raw/voice.mp3. Vui lòng cập nhật code:
1. Thay thế biểu tượng mõ gỗ ở trung tâm bằng hình ảnh của tôi.
2. Phát âm thanh gõ mỗi khi mõ gỗ được chạm.
3. Khi chạm, hiển thị văn bản "+1" tạm thời phía trên mõ gỗ, sau đó cho nó nổi lên và biến mất (giống văn bản điểm số nổi trong trò chơi).
```

![](/zh-cn/stage-3/cross-platform/android-app/images/image26.png)

**Bước 3: Xác minh kết quả**

Sau khi Trae hoàn tất việc sửa đổi code, quay lại Android Studio và nhấp lại nút Run xanh (Re-run) để khởi động lại trình mô phỏng. Lúc này, ứng dụng của bạn sẽ cảm thấy hoàn toàn khác. Thử chạm liên tục - bạn sẽ nghe thấy tiếng "cốc cốc" giòn và thấy văn bản "Công đức +1" nổi nhảy ra. Điều này hoàn thành sự chuyển đổi chính từ "bản demo" sang "sản phẩm."

![](/zh-cn/stage-3/cross-platform/android-app/images/image27.png)

![](/zh-cn/stage-3/cross-platform/android-app/images/image28.png)

## 3.4 Nếu Xuất hiện Lỗi thì Sao? (Vòng lặp Gỡ lỗi với AI)

Code do AI tạo ra không được đảm bảo hoàn hảo ngay từ lần đầu tiên, giống như các kỹ sư hàng đầu cũng không thể hứa hẹn code không có lỗi trong một lần. Nhưng trong chế độ Vibe Coding, lỗi không còn là bức tường ngăn cản bạn; chúng trở thành những bước đệm trong sự hợp tác giữa bạn và AI.

**Trường hợp 1: ứng dụng bị crash**

Giả sử ứng dụng crash ngay sau khi nhấp Run, hoặc chạm vào mõ gỗ không phát âm thanh. Theo cách truyền thống, bạn sẽ cần tìm mã lỗi, duyệt hàng chục diễn đàn kỹ thuật và đọc nhiều bài viết tiếng Anh khó hiểu. Trong chế độ Vibe Coding, bạn chỉ cần làm một việc - **trở thành người chuyển phát**.

**Các bước:**

1. **Mở log**: tìm bảng **Logcat** ở phía dưới Android Studio (biểu tượng con mèo nhỏ).
2. **Xác định lỗi**: bạn sẽ thấy các log cuộn, và các **dòng màu đỏ** thường là lỗi chính.
3. **Sao chép và dán**: chọn văn bản lỗi tiếng Anh màu đỏ, sao chép và dán vào Trae: "Tôi gặp lỗi này khi chạy. Vui lòng giúp tôi sửa."
4. AI có thể ngay lập tức nói với bạn điều gì đó như: "Điều này xảy ra vì quyền rung chưa được khai báo trong `AndroidManifest.xml`," và sau đó cung cấp cho bạn code đã sửa. Bạn chỉ cần nhấp Apply và tiếp tục.

**Trường hợp 2: ứng dụng chạy, nhưng trải nghiệm cảm thấy tệ**

Đôi khi ứng dụng không crash, nhưng vẫn cảm thấy không hài lòng. Ví dụ, khi chạm vào mõ gỗ rất nhanh, bạn có thể nhận thấy rằng các hoạt ảnh "+1" mới không xuất hiện cho đến khi "+1" trước đó biến mất hoàn toàn. Điều đó làm cho phản hồi cảm thấy chậm và không thỏa đáng. Bạn không cần phải tự nghiên cứu đa luồng hoặc hàng đợi hoạt ảnh. Bạn chỉ cần mô tả rõ ràng sự khó chịu đó cho AI.

Gửi "hướng dẫn nâng cao" này cho Trae:

```text
Vui lòng sửa đổi logic hoạt ảnh hiện tại để giải quyết vấn đề "chạm nhanh không kích hoạt".
Vấn đề hiện tại: dường như chỉ có một trạng thái hoạt ảnh, nên tôi phải đợi cho đến khi "+1" trước đó hoàn toàn biến mất trước khi một cú chạm khác được phản hồi.
Yêu cầu:
1. Thay thế trạng thái hoạt ảnh đơn bằng danh sách dựa trên mutableStateListOf.
2. Mỗi khi mõ gỗ được chạm, ngay lập tức thêm một thực thể "+1" mới vào danh sách (với ID riêng và vị trí ban đầu), bất kể hoạt ảnh trước đó đã kết thúc hay chưa.
3. Trong UI, lặp qua danh sách này để mỗi "+1" chạy hoạt ảnh nổi lên + mờ dần độc lập của riêng nó.
4. Sau khi hoạt ảnh "+1" kết thúc, tự động xóa nó khỏi danh sách để ngăn rò rỉ bộ nhớ.
Vui lòng trực tiếp cung cấp code MainActivity.kt đã cập nhật.
```

![](/zh-cn/stage-3/cross-platform/android-app/images/image29.png)

![](/zh-cn/stage-3/cross-platform/android-app/images/image30.png)

## 3.5 Trình bày Kết quả Cuối cùng

Trong các bước trước, chúng ta đã hoàn thành một Mõ Gỗ Điện tử có thể nhìn và nghe thấy. Để đưa nó gần hơn với một ứng dụng có thể xuất bản, chúng ta sẽ sử dụng một lần lặp cuối cùng để thêm **phản hồi khi chạm** và **tùy chỉnh**. Chúng ta sẽ triển khai hai tính năng cốt lõi: đầu tiên, **phản hồi rung**, để mỗi cú chạm nhận được phản hồi vật lý từ động cơ rung của điện thoại và cải thiện đáng kể sự chìm đắm; thứ hai, **văn bản tùy chỉnh**, cho phép người dùng sửa đổi văn bản trên màn hình, ví dụ thay đổi "Công đức +1" thành "Lương +1" hoặc "Phiền phức -1".

Gửi Prompt được thiết kế cẩn thận sau cho Trae. Nó sẽ xử lý logic hộp thoại, chuyển đổi trạng thái và tương tác phần cứng trong một lần:

```text
Vai trò: Bạn là chuyên gia Android Jetpack Compose.
Nhiệm vụ: Vui lòng thêm "văn bản tùy chỉnh" và "phản hồi rung" vào ứng dụng Mõ Gỗ Điện tử hiện có.
Yêu cầu:
1. Phản hồi Haptic
Mỗi khi người dùng chạm vào mõ gỗ, ngoài âm thanh và hoạt ảnh, gọi phản hồi haptic của điện thoại (sử dụng LocalHapticFeedback.current) để đưa ra phản hồi xúc giác nhẹ.
2. Tính năng Văn bản Tùy chỉnh (UI và tương tác)
Đầu vào: Thêm một biểu tượng chỉnh sửa nhỏ bên cạnh văn bản trên cùng như "Công đức +1" (có thể sử dụng Icons.Default.Edit).
Logic hộp thoại: Khi biểu tượng được chạm, hiển thị hộp thoại (Dialog/AlertDialog).
    Tiêu đề hộp thoại: "Sửa đổi Nội dung"
    Đầu vào: Cho phép người dùng nhập văn bản họ muốn tích lũy (mặc định là "Công đức")
    Lựa chọn giá trị: Bên dưới đầu vào, cung cấp hai tùy chọn (ví dụ RadioButton hoặc bật/tắt) để người dùng chọn "+1" hoặc "-1"
    Nút lưu: Sau khi nhấp lưu, đóng hộp thoại và áp dụng cài đặt mới cho màn hình chính
    Làm mới dữ liệu: Nếu người dùng cập nhật nội dung, đặt lại bộ đếm trên cùng về 0 và bắt đầu đếm lại từ đầu
3. Cập nhật hiệu ứng
Sau khi lưu, cả văn bản bộ đếm trên cùng và văn bản hoạt ảnh nổi hiển thị khi chạm mõ gỗ đều nên thay đổi theo định dạng tùy chỉnh của người dùng.
    Kích thước văn bản nổi không được vượt quá kích thước văn bản bộ đếm trên cùng
    Ví dụ: nếu người dùng nhập "Lương" và chọn "+1", logic bộ đếm trên cùng trở thành +1 và văn bản nổi trở thành "Lương+1"
    Nếu người dùng nhập "Phiền phức" và chọn "-1", logic bộ đếm trên cùng trở thành -1 và văn bản nổi trở thành "Phiền phức-1"
4. Yêu cầu kỹ thuật:
Đảm bảo trạng thái mới (văn bản và số) ảnh hưởng chính xác đến hoạt ảnh.
Vui lòng trực tiếp cung cấp code MainActivity.kt cập nhật đầy đủ trong khi giữ nguyên logic âm thanh và hoạt ảnh trước đó.
```

![](/zh-cn/stage-3/cross-platform/android-app/images/image31.png)

# 4 Gỡ lỗi Thiết bị Thực và Tinh chỉnh

Trình mô phỏng rất tiện lợi, nhưng nó không thể mô phỏng rung điện thoại thực hoặc phản ánh đầy đủ độ trễ cảm ứng thực tế. Để có "cảm giác" chính xác nhất, chúng ta cần cài đặt ứng dụng trên điện thoại Android thực. Dưới đây là hai phương pháp kết nối bạn có thể chọn:

1. **Gỡ lỗi không dây (Wi-Fi)**: không cần cáp dữ liệu, tiện lợi cho việc kiểm tra hàng ngày. Nhưng máy tính và điện thoại của bạn phải trên **cùng một mạng Wi-Fi**.
2. **Gỡ lỗi có dây USB**: ổn định hơn và ít bị ngắt kết nối hơn, phù hợp khi mạng kém hoặc cài đặt ban đầu thất bại.

## 4.1 Gỡ lỗi Không dây

Đây là phương pháp tiện lợi nhất trên Android 11 trở lên.

**Bước 1: Chuẩn bị điện thoại**

1. Đảm bảo điện thoại và máy tính trên **cùng một Wi-Fi**.
2. Mở **Tùy chọn nhà phát triển** và bật **Gỡ lỗi không dây**.
3. Nhấp vào **Gỡ lỗi không dây** để vào chi tiết, sau đó chọn **Ghép nối thiết bị bằng mã QR**. Điện thoại của bạn sẽ mở chế độ quét mã QR.

![](/zh-cn/stage-3/cross-platform/android-app/images/image32.png)![](/zh-cn/stage-3/cross-platform/android-app/images/image33.png)

**Bước 2: Ghép nối trên máy tính**

1. Quay lại Android Studio, nhấp vào bộ chọn thiết bị trong thanh công cụ trên cùng.
2. Chọn **Pair Devices Using Wi-Fi** từ menu thả xuống.
3. Mã QR sẽ xuất hiện trên màn hình.

![](/zh-cn/stage-3/cross-platform/android-app/images/image34.png)

**Bước 3: Quét để kết nối**

1. Sử dụng điện thoại quét mã QR trên màn hình máy tính.
2. Cả điện thoại và máy tính đều sẽ hiển thị "ghép nối thành công."
3. Lúc này, thanh thiết bị trên cùng của Android Studio sẽ tự động hiển thị model điện thoại của bạn (ví dụ `Google Pixel 8`).

![](/zh-cn/stage-3/cross-platform/android-app/images/image35.png)

4. Chạy ứng dụng bằng cách nhấp ▶️ Run

![](/zh-cn/stage-3/cross-platform/android-app/images/image36.png)

## 4.2 Gỡ lỗi Có dây USB

Nếu kết nối không dây không ổn định, hoặc mạng của bạn phức tạp, việc cắm cáp luôn là giải pháp đáng tin cậy nhất. Mặc dù ít tiện lợi hơn, nhưng nó cho tốc độ truyền nhanh nhất và gần như không bao giờ bị ngắt kết nối.

### 4.2.1 Chuẩn bị Trình điều khiển USB trong Android Studio (Chỉ Windows)

Người dùng Mac có thể bỏ qua bước này, vì macOS thường nhận diện điện thoại trực tiếp. Người dùng Windows cần đảm bảo máy tính có thể nhận diện điện thoại Android, điều này thường có nghĩa là cần cài đặt trình điều khiển USB của Google:

1. Trong Android Studio, nhấp vào `Tools -> SDK Manager` (hoặc tìm trong `Settings -> Languages & Frameworks -> Android SDK`)
2. Chuyển sang tab **SDK Tools**
3. Chọn **Google USB Driver** và nhấp vào **Apply** để tải xuống và cài đặt

![](/zh-cn/stage-3/cross-platform/android-app/images/image37.png)![](/zh-cn/stage-3/cross-platform/android-app/images/image38.png)

![](/zh-cn/stage-3/cross-platform/android-app/images/image39.png)

### 4.2.2 Tải xuống Phiên bản SDK Giống với Thiết bị Thực của Bạn

**Bước 1: Kiểm tra phiên bản Android của điện thoại**

Lấy điện thoại OPPO làm ví dụ: mở Cài đặt -> Thông tin điện thoại -> kiểm tra phiên bản Android (trong ví dụ là Android 12).

![](/zh-cn/stage-3/cross-platform/android-app/images/image40.png)

**Bước 2: Tải xuống phiên bản nền tảng Android đó trong Android Studio**

1. Trong Android Studio, nhấp vào `Tools -> SDK Manager`
2. Giữ ở tab **SDK Platforms** mặc định
3. Chọn Android 12.0 và nhấp Apply để tải xuống

![](/zh-cn/stage-3/cross-platform/android-app/images/image41.png)

### 4.2.3 Bật Chế độ Nhà phát triển trên Điện thoại

Mở cài đặt điện thoại, vào tùy chọn nhà phát triển, và bật **Gỡ lỗi USB**.

![](/zh-cn/stage-3/cross-platform/android-app/images/image42.png)

### 4.2.4 Cấp phép Trình điều khiển USB trên Điện thoại

Lúc này, hãy cầm điện thoại lên. Nó sẽ hiển thị một hộp thoại bảo mật quan trọng: "Cho phép gỡ lỗi USB?" Đảm bảo chọn **Luôn cho phép** và sau đó nhấp **Cho phép** hoặc **OK**. Đây là ủy quyền chính để cấp cho máy tính quyền kiểm soát để gỡ lỗi.

![](/zh-cn/stage-3/cross-platform/android-app/images/image43.png)

### 4.2.5 Chạy Ứng dụng trên Điện thoại

1. Trong bộ chọn thiết bị trên cùng của Android Studio, bạn sẽ thấy model điện thoại của mình (ví dụ `OPPO-PDKM00`)
2. Nhấp ▶️ Run. Điện thoại của bạn sẽ hiển thị hộp thoại "Cho phép gỡ lỗi USB?"; chọn "Luôn cho phép" và xác nhận
3. Ứng dụng sẽ tự động cài đặt và khởi chạy

Bây giờ hãy thử chạm vào mõ gỗ trên điện thoại của bạn và cảm nhận phản hồi của động cơ rung thực. Đây là trải nghiệm Vibe Coding hoàn chỉnh.

![](/zh-cn/stage-3/cross-platform/android-app/images/image44.png)![](/zh-cn/stage-3/cross-platform/android-app/images/image45.png)![](/zh-cn/stage-3/cross-platform/android-app/images/image46.png)

# 5 Đóng gói Ứng dụng thành APK

Code đã xong, và kiểm tra thiết bị thực cũng hoạt động. Bây giờ chúng ta cần "lấy ứng dụng ra" khỏi Android Studio và biến nó thành một tệp bạn có thể gửi cho bạn bè để cài đặt. Quá trình này được gọi là **đóng gói**. Trong phát triển Android, đóng gói có hai chế độ hoàn toàn khác nhau, và chúng ta chọn dựa trên kịch bản sử dụng.

## 5.1 Đóng gói Phiên bản Debug (để Chia sẻ Nhanh)

Nếu bạn chỉ muốn chia sẻ ứng dụng với bạn bè để thử nhanh, hoặc gửi đến điện thoại kiểm tra để xác minh, **phiên bản Debug** là lựa chọn nhanh nhất. Nó giống như một "bản nháp" - đầy đủ chức năng, nhưng không được ký chính thức, nên không thể gửi lên cửa hàng ứng dụng.

**Các bước rất đơn giản:** trong menu trên cùng của Android Studio, tìm `Build`, di chuột vào `Generate App Bundles or APKs`, và nhấp vào `Generate APKs` từ menu con.

![](/zh-cn/stage-3/cross-platform/android-app/images/image47.png)

Chờ khoảng 5 giây tùy thuộc vào kích thước dự án. Trong vùng bảng điều khiển góc dưới bên phải của Android Studio, một thông báo sẽ xuất hiện. Nhấp vào liên kết `locate` màu xanh và thư mục đầu ra sẽ tự động mở. Tệp có tên `app-debug.apk` là gói chúng ta cần.

Bạn có thể gửi trực tiếp qua WeChat hoặc QQ đến bất kỳ điện thoại Android nào, và người nhận có thể cài đặt và sử dụng. Lưu ý rằng debug không phải là phiên bản release.

![](/zh-cn/stage-3/cross-platform/android-app/images/image48.png)

![](/zh-cn/stage-3/cross-platform/android-app/images/image49.png)

## 5.2 Đóng gói Phiên bản Release

Nếu bạn muốn xuất bản ứng dụng lên cửa hàng ứng dụng (như Google Play hoặc Huawei AppGallery), hoặc tránh cảnh báo "ứng dụng không an toàn" trong quá trình cài đặt, thì bạn phải đóng gói một **phiên bản Release**. Phiên bản này yêu cầu một **chữ ký số** duy nhất, giống như một con dấu chống giả chứng minh rằng bạn đã phát triển ứng dụng này và nó không bị giả mạo.

> Mục đích cốt lõi của việc ký
>
> - Xác định danh tính nhà xuất bản: vì một ứng dụng có cùng tên gói có thể thay thế chương trình đã cài đặt, việc ký ngăn chặn việc lạm dụng điều đó
> - Đảm bảo tính toàn vẹn của ứng dụng: quá trình ký bao phủ mọi tệp trong gói, đảm bảo chúng không bị thay thế sau đó

Ký ứng dụng Android giống như gắn một con dấu. Sau khi con dấu được gắn, ứng dụng và nhà phát triển bị khóa cùng nhau: ứng dụng là của bạn, và bạn chịu trách nhiệm về nó. Người khác không thể mạo danh bạn, và bạn không thể mạo danh người khác.

**Bước 1: Khởi động trình hướng dẫn ký**

Trong menu trên cùng, chọn `Build`, sau đó nhấp vào `Generate Signed Bundle / APK`. Trong cửa sổ bật lên, bạn sẽ đối mặt với hai lựa chọn:

- Android App Bundle (`.aab`): yêu cầu bởi Google Play, kích thước nhỏ hơn, nhưng không thể cài đặt trực tiếp trên điện thoại
- APK: gói cài đặt tiêu chuẩn, có thể cài đặt trực tiếp
_Vì mục đích minh họa, chúng ta chọn APK trước và nhấp Next._

![](/zh-cn/stage-3/cross-platform/android-app/images/image50.png)![](/zh-cn/stage-3/cross-platform/android-app/images/image51.png)

**Bước 2: Tạo khóa số (KeyStore)**

Đây là nơi người mới bắt đầu hay bị kẹt nhất. Vì đây là lần đầu tiên bạn đóng gói release, bạn cần tạo một **keystore** mới. Nhấp vào **Create new** bên dưới `Key store path`.

![](/zh-cn/stage-3/cross-platform/android-app/images/image52.png)

Trong cửa sổ bật lên, điền thông tin cần thiết, tương tự như đăng ký tài khoản. Chúng tôi khuyến nghị mạnh mẽ rằng mật khẩu keystore và mật khẩu alias khóa nên **giống nhau**, và bạn nên **ghi chú cẩn thận**. Nếu bạn mất mật khẩu này, ứng dụng của bạn sẽ không bao giờ có thể cập nhật được nữa trong tương lai.

Sau khi hoàn tất, nhấp OK. Bạn sẽ quay lại màn hình trước, và thông tin khóa bạn vừa điền sẽ được tự động điền sẵn.

![](/zh-cn/stage-3/cross-platform/android-app/images/image53.png)![](/zh-cn/stage-3/cross-platform/android-app/images/image54.png)

**Bước 3: Tạo gói chính thức**

Nhấp Next, chọn **release** dưới Build Variants, và cuối cùng nhấp **Create**.

Sau một khoảng chờ ngắn, Android Studio sẽ lại hiển thị thông báo "Generate Signed APK" thành công ở góc dưới bên phải. Nhấp vào **locate**, và lần này bạn sẽ thấy gói chính thức được ký số trong thư mục (thường có tên `app-release.apk`). Tệp này là sản phẩm cuối cùng bạn bàn giao với tư cách là nhà phát triển.

![](/zh-cn/stage-3/cross-platform/android-app/images/image55.png)

![](/zh-cn/stage-3/cross-platform/android-app/images/image56.png)![](/zh-cn/stage-3/cross-platform/android-app/images/image57.png)

# 6 Xuất bản Chính thức lên Cửa hàng / Thị trường Ứng dụng

Khi phát triển ứng dụng của bạn hoàn tất và gói Release đã sẵn sàng, bước tiếp theo là xuất bản nó để nhiều người có thể tải xuống và sử dụng. Hiện tại, các kênh phân phối chính được chia thành hai loại: **cửa hàng ứng dụng Android trong nước** và **cửa hàng ứng dụng quốc tế (Google Play)**.

## 6.1 Xuất bản lên Thị trường Trong nước

Hệ sinh thái Android ở Trung Quốc đại lục rất đặc biệt. Không có một cửa hàng chính thức duy nhất (vì Google Play không thể truy cập trực tiếp). Thay vào đó, thị trường được chia giữa **cửa hàng ứng dụng của nhà sản xuất điện thoại** và **nền tảng bên thứ ba**. Các **cửa hàng nhà sản xuất** lớn bao gồm Huawei, Xiaomi, OPPO, vivo, Meizu, Samsung, v.v. Vì chúng được cài đặt sẵn trên thiết bị, nên có lưu lượng truy cập lớn nhất. Các **nền tảng bên thứ ba** chính bao gồm Tencent MyApp và 360 Mobile Assistant.

### 6.1.1 Khó khăn Cốt lõi: "Chướng ngại" đối với Nhà phát triển Cá nhân

Trước khi đăng ký tài khoản, có một điều rất quan trọng bạn cần biết: **các thị trường ứng dụng trong nước rất khắt khe với nhà phát triển cá nhân.**

Hiện tại, gần như tất cả các cửa hàng ứng dụng trong nước lớn (Huawei, Xiaomi, OV, MyApp, v.v.) **yêu cầu** *Giấy chứng nhận Đăng ký Bản quyền Phần mềm* để nộp.

![](/zh-cn/stage-3/cross-platform/android-app/images/image58.png)![](/zh-cn/stage-3/cross-platform/android-app/images/image59.png)

- **Nó là gì?** Đây là tài liệu pháp lý chứng minh ứng dụng thuộc về bạn.
- **Chi phí để có được nó**: bạn cần nộp đơn qua cơ quan bản quyền. Tự làm thường mất 2-3 tháng; sử dụng dịch vụ để xử lý nhanh hơn có thể tốn từ vài trăm đến hơn một nghìn RMB.
- **Thực tế hiện tại**: không có chứng nhận này, ứng dụng của bạn rất có thể sẽ không vượt qua đánh giá, hoặc bạn thậm chí không thể tạo mục ứng dụng. Ngoài ra, các danh mục như tin tức, tài chính và y tế cũng có thể yêu cầu hồ sơ ICP hoặc các bằng cấp khác.

Vì vậy, nếu ứng dụng của bạn chỉ là một dự án thực hành cá nhân hoặc công cụ nhỏ, và bạn không muốn dành thời gian và tiền bạc để xin chứng nhận này, tôi đề nghị bỏ qua trực tiếp sang Phần 6.2 và cân nhắc Google Play thay thế, hoặc đơn giản là chia sẻ tệp APK với bạn bè trực tiếp.

### 6.1.2 Đăng ký Tài khoản Nhà phát triển

Nếu bạn đã chuẩn bị các bằng cấp cần thiết, hoặc đã quyết định xuất bản trên thị trường trong nước, bước đầu tiên là đăng ký tài khoản. Quy trình tương tự giữa các nền tảng lớn, thường yêu cầu xác minh ID cá nhân hoặc xác minh giấy phép kinh doanh cho công ty.

Dưới đây là URL nền tảng nhà phát triển cho các thị trường ứng dụng lớn:

Nền tảng Mở Tencent: https://open.tencent.com/

Nền tảng Mở 360: http://dev.360.cn

Nền tảng Nhà phát triển Baidu: http://app.baidu.com

Nền tảng Mở Xiaomi: https://dev.mi.com

Liên minh Nhà phát triển Huawei: http://developer.huawei.com/consumer/cn

Nền tảng Nhà phát triển Alibaba: http://open.uc.cn
Phân phối Alibaba tích hợp Wandoujia, Ali Jiuyou, PP Assistant, UC App Store, Shenma Search và YunOS App Store. Bạn chỉ cần đăng ký một tài khoản nhà phát triển Alibaba.

Nền tảng Nhà phát triển Samsung: http://support-cn.samsung.com/App/DeveloperChina/Home/Index

Liên minh Nhà phát triển OPPO: http://open.oppomobile.com

Liên minh Nhà phát triển vivo: https://dev.vivo.com.cn

Nền tảng Mở Lenovo: http://open.lenovo.com

Liên minh Nhà phát triển Meizu: http://open.flyme.cn

Liên minh Nhà phát triển Gionee: https://open.appgionee.com

**Lấy Tencent MyApp làm ví dụ:** truy cập Nền tảng Mở Tencent và nhấp đăng ký. Khuyến nghị đăng nhập trực tiếp bằng tài khoản QQ. Lưu ý rằng khi tài khoản QQ đã được liên kết, rất khó để hủy liên kết, nên tốt hơn nên sử dụng tài khoản QQ công việc chuyên dụng. Làm theo hướng dẫn, chọn "Nhà phát triển Cá nhân" hoặc "Nhà phát triển Doanh nghiệp," tải lên ảnh ID của bạn và hoàn tất xác minh khuôn mặt. Sau khi vượt qua xác minh, nhấp **Tạo Ứng dụng** để bắt đầu.

![](/zh-cn/stage-3/cross-platform/android-app/images/image60.png)![](/zh-cn/stage-3/cross-platform/android-app/images/image61.png)

![](/zh-cn/stage-3/cross-platform/android-app/images/image62.png)

### 6.1.3 Quy trình Nộp và Tài liệu Cần thiết

Sau khi xét duyệt tài khoản được phê duyệt, bạn có thể tạo ứng dụng và nộp để xét duyệt. Bạn cần chuẩn bị "bộ bốn" sau:

1. **Gói cài đặt**: **Release APK** được đóng gói trong Chương 5
2. **Thông tin văn bản**:
3. **Tên ứng dụng**: không được chứa từ ngữ nhạy cảm
4. **Giới thiệu một dòng**: trong 20 ký tự Trung Quốc, đơn giản và trực tiếp (ví dụ: "Một ứng dụng mõ gỗ điện tử thư giãn")
5. **Mô tả chi tiết**: 200+ ký tự Trung Quốc giới thiệu các chức năng và kịch bản sử dụng của ứng dụng
6. **Tài nguyên hình ảnh**:
7. **Biểu tượng ứng dụng**: PNG độ nét cao, thường 512x512
8. **Ảnh chụp màn hình ứng dụng**: chuẩn bị 4-5 ảnh chụp màn hình rõ ràng về ứng dụng đang sử dụng, tốt nhất bao phủ các trang chính, thường có kích thước nhất quán như 1080x1920
9. **Tài liệu bằng cấp**: tải lên bản scan Giấy chứng nhận Đăng ký Bản quyền Phần mềm của bạn

**Nộp và xét duyệt:** sau khi điền tất cả thông tin và tải lên APK, nhấp **Nộp để Xét duyệt**. Chu kỳ xét duyệt thường là 1-3 ngày làm việc. Trong thời gian đó, chú ý email hoặc SMS. Người xét duyệt có thể từ chối nộp do ảnh chụp màn hình không rõ ràng, mô tả không chuẩn, hoặc thiếu bằng cấp cần thiết. Trong trường hợp đó, bạn sửa đổi theo phản hồi và nộp lại.

## 6.2 Xuất bản lên Thị trường Quốc tế (Google Play)

Nếu bạn không muốn đối phó với sự phức tạp của giấy chứng nhận bản quyền phần mềm và hồ sơ trong các cửa hàng ứng dụng trong nước, hoặc nếu đối tượng mục tiêu của bạn là toàn cầu, Google Play là lựa chọn tốt nhất cho nhà phát triển cá nhân.

### 6.2.1 Chuẩn bị

- **Tài khoản Google**: một tài khoản Gmail thông thường là đủ
- **Phí đăng ký $25**: đây là **phí một lần trọn đời**, và yêu cầu thẻ tín dụng hỗ trợ thanh toán USD (Visa / Mastercard)
- **Truy cập mạng đáng tin cậy**: bạn cần có thể truy cập Google Play Console trơn tru
- **Gói cài đặt chính thức**: lưu ý rằng Google Play yêu cầu định dạng **.aab** (Android App Bundle), không phải APK. Trong Android Studio, chọn Android App Bundle khi đóng gói. Các bước gần như giống hệt với đóng gói APK.

![](/zh-cn/stage-3/cross-platform/android-app/images/image63.png)

### 6.2.2 Quy trình Xuất bản Google Play Console (Tổng quan)

Vì việc đăng ký và thanh toán Google Play vẫn có một số rào cản gia nhập (như cần thẻ tín dụng quốc tế), hướng dẫn này hiện không cung cấp ảnh chụp màn hình từng bước. Nhưng đây là quy trình bốn bước phổ biến:

**Bước 1: Tạo ứng dụng và vào bảng điều khiển**

Nhấp vào `Create app`, điền tên ứng dụng (`Electronic Wooden Fish`), chọn tiếng Anh làm ngôn ngữ, chọn App và Free làm loại ứng dụng, sau đó đánh dấu vào thỏa thuận. Sau đó, bạn sẽ có quyền truy cập vào backend.

**Bước 2: Trang trí trang cửa hàng**

Đây là ấn tượng đầu tiên của người dùng. Bạn cần tải lên **biểu tượng** ứng dụng đã chuẩn bị (512x512) và một **hình ảnh nổi bật** (1024x500). Về mô tả tiếng Anh, bạn có thể đơn giản hỏi Trae: **"Vui lòng giúp tôi viết mô tả tiếng Anh để xuất bản Electronic Wooden Fish trên Google Play, với giọng điệu nhẹ nhàng và thư giãn."** AI thường viết tự nhiên hơn so với bản dịch trực tiếp.

**Bước 3: Xếp hạng quyền riêng tư và nội dung**

- Chính sách quyền riêng tư: tìm kiếm "App Privacy Policy Generator" và tạo một liên kết miễn phí để dán vào
- Xếp hạng nội dung: điền một bảng hỏi đơn giản (ví dụ, có bạo lực hay đánh bạc không). Electronic Wooden Fish thường nhận xếp hạng chung 3+.

**Bước 4: Tải lên và xuất bản**

Trong menu `Production`, nhấp vào `Create new release`, tải lên tệp `.aab` của bạn, lưu và nộp để xét duyệt. Xét duyệt Google Play thường nhanh (1-3 ngày). Khi được phê duyệt, ứng dụng của bạn có thể được tải xuống trên toàn cầu.

![](/zh-cn/stage-3/cross-platform/android-app/images/image64.png)

_Nếu bạn đã hoàn tất đăng ký tài khoản nhà phát triển, video hướng dẫn này có thể hướng dẫn bạn qua phần còn lại của quy trình:_ [Full workflow: uploading an Android app to Google Play](https://www.bilibili.com/video/BV16REQzGEnk/?share_source=weixin&vd_source=b42f227a4f2d413fbde18499d83227cf)

# 7 Lưu ý Cuối cùng

Đó là phần cuối của hướng dẫn. Nhìn vào Mõ Gỗ Điện tử bạn tự tay tạo ra trên điện thoại của mình, tôi tự hỏi bạn cảm thấy thế nào lúc này.

Là một người được đào tạo về kỹ thuật phần mềm, tôi thực sự cảm thấy khá xúc động trong kỷ nguyên AI phát triển nhanh chóng ngày nay. Trước đây, chúng ta phải đọc qua những cuốn sách lập trình dày cộp, học cú pháp phức tạp, vật lộn với việc thiết lập môi trường, và dành nửa ngày để chiến đấu với các thông báo lỗi màu đỏ. Nhưng thời đại đã thay đổi, và bây giờ chúng ta đang ngày càng học cách cách điều khiển AI nhiều hơn.

Thông qua thực hành Vibe Coding này, bạn đã trải nghiệm toàn bộ quy trình phát triển ứng dụng Android. Rào cản kỹ thuật chắc chắn đang giảm xuống. Chúng ta không còn cần phải mài mòn qua code khô khan liên tục, và có thể dành nhiều năng lượng hơn để quyết định **xây dựng cái gì**. Nhưng dù công cụ có mạnh đến đâu, chúng vẫn chỉ là công cụ. Đừng để ứng dụng này đóng bụi trên điện thoại của bạn. Hãy tiếp tục nghịch nó, phá nó và sửa lại nó. Chỉ khi bạn bắt đầu có ý tưởng của riêng mình và biến chúng thành hiện thực, bạn mới thực sự vượt qua ngưỡng cửa.

Nếu hướng dẫn này giúp bạn cảm thấy "xây dựng ứng dụng thực ra không khó như vậy," thì tôi rất vinh dự đã giúp đưa thêm một nhà sáng thế hệ mới vào thế giới phát triển.

Tôi rất mong chờ tác phẩm tiếp theo của bạn. Hãy tiếp tục tiến lên!

![](/zh-cn/stage-3/cross-platform/android-app/images/image65.png)

**_Chúc bạn vui vẻ trong thế giới phát triển Android!_**

# Tài liệu Tham khảo

CSDN: [Cách đóng gói/xây dựng dự án Android Studio (2024-03-04)](https://blog.csdn.net/GenuineMonster/article/details/136443130?ops_request_misc=&request_id=&biz_id=102&utm_term=android%20studio%20%E6%89%93%E5%8C%85%20APK%20%E5%B9%B6%E5%88%86%E4%BA%AB&utm_medium=distribute.pc_search_result.none-task-blog-2~all~sobaiduweb~default-1-136443130.142^v102^pc_search_result_base4&spm=1018.2226.3001.4187)

CSDN: [Cài đặt và cấu hình Android Studio](https://blog.csdn.net/Changersh/article/details/149838228?ops_request_misc=&request_id=&biz_id=102&utm_term=android%20studio%E5%AE%89%E8%A3%85%E5%8F%8A%E9%85%8D%E7%BD%AE&utm_medium=distribute.pc_search_result.none-task-blog-2~all~sobaiduweb~default-0-149838228.142^v102^pc_search_result_base4&spm=1018.2226.3001.4187)
