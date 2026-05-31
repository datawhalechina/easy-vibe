# Cách Xây Dựng Trang Web Cá Nhân và Blog Học Thuật - Triển Khai Tĩnh với GitHub Pages

# 1. Trang Web Cá Nhân và Blog Học Thuật Là Gì?

Trong hướng dẫn này, chúng ta sẽ trải qua một vòng lặp hoàn chỉnh: **từ việc tìm một mẫu trang web có sẵn, chỉnh sửa thành trang chủ cá nhân của Elon Musk, và cuối cùng là xuất bản trực tuyến miễn phí**.

Để thực hiện hướng dẫn này, bạn cần ít nhất:

* **Một máy tính** (Windows hoặc Mac)
* **Tài khoản GitHub** (dùng để lưu trữ mã nguồn trang web và cung cấp hosting miễn phí)
* **Đã cài đặt Trae** (trợ lý lập trình AI của bạn)
* **Môi trường Git**
* **Môi trường Ruby**

## 1.1 Trang chủ học thuật cá nhân là gì?

**Trang chủ học thuật cá nhân** là vùng lãnh thổ riêng của bạn trên internet.

Không giống như WeChat Moments, Zhihu hay LinkedIn, nó không phụ thuộc vào thuật toán đề xuất của bất kỳ nền tảng nào, và sẽ không biến mất nếu một nền tảng đóng cửa. Đây là một **không gian trưng bày cá nhân** lâu dài, ổn định có thể được Google và Google Scholar lập chỉ mục. Nó thường chứa tiểu sử, ấn phẩm, dự án và blog kỹ thuật của bạn.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image1.png)

## 1.2 Tại sao nên xây dựng trang web riêng?

Trong mô hình phát triển Vibe Coding, chúng ta không còn cần phải vật lộn với những cuốn sách HTML/CSS dày cộp như cách người ta làm mười năm trước. Với AI, vai trò xây dựng trang web chuyển từ "lập trình viên struggling" sang "tổng biên tập trang web":

1. **Bạn (Biên tập / PM)**: quyết định phong cách và nội dung trang. Ví dụ: "Đặt PPT về thuộc địa hóa Sao Hỏa của Musk ở đây," hoặc "Đổi nút này sang màu đỏ Tesla."
2. **Trae (Kỹ sư AI)**: xử lý công việc triển khai khó khăn. Nó chuyển hướng dẫn bằng ngôn ngữ tự nhiên của bạn thành mã, bao gồm bố cục, phối màu và thích ứng mobile.
3. **GitHub Pages (Phòng trưng bày)**: cung cấp máy chủ và tên miền miễn phí để mọi người trên thế giới có thể xem tác phẩm của bạn.

**Tại sao nó đáng có đối với giới học thuật hoặc kỹ thuật?**

* **Bên ngoài (xây dựng ảnh hưởng)**: đây là một **"danh thiếp xanh tươi mãi mãi."** Khi nộp hồ sơ tiến sĩ, xin việc hoặc hợp tác, một trang chủ cá nhân gọn gàng thường thuyết phục hơn nhiều so với bản CV PDF.
* **Bên trong (tích lũy kiến thức)**: đây là **"bộ não thứ hai"** của bạn. Bạn có thể dùng nó để ghi chú bài giảng, suy nghĩ kỹ thuật và xây dựng hệ thống tri thức riêng.
* **Cho tương lai (khả năng được khám phá)**: các công cụ tìm kiếm thích nội dung có cấu trúc. Với trang chủ, khi người ta tìm kiếm tên bạn, **nội dung do bạn định nghĩa** có thể xuất hiện đầu tiên, thay vì những người không liên quan có cùng tên.

## 1.3 Bốn cách điển hình để xây dựng trang web cá nhân

Trên thực tế, có vô số cách để xây dựng trang web. Ở đây chúng tôi chỉ giới thiệu bốn cách phổ biến nhất:

**Phương pháp 1: Tự viết từ đầu bằng HTML / CSS / JS**
Đây là lộ trình khoa học máy tính truyền thống. Bạn viết từng ký tự mã. Ưu điểm là linh hoạt tối đa. Nhược điểm là rào cản gia nhập rất cao, và dễ bị kẹt khi tinh chỉnh CSS. Không lý tưởng cho những ai muốn tập trung vào nội dung.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image2.png)

**Phương pháp 2: Công cụ xây dựng trang web trực quan như Wix / WordPress**
Giống như xây bằng các khối. Ưu điểm là dễ kéo thả chỉnh sửa. Nhược điểm là thường yêu cầu thanh toán, có xu hướng tạo mã cồng kềnh, thiếu cảm giác academic-geek, và khó tùy chỉnh sâu.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image3.png)

**Phương pháp 3: Mẫu dựa trên GitHub (Trình tạo trang tĩnh)**
Đây là lộ trình phổ biến **được khuyên dùng nhất** trong cộng đồng học thuật và geek. Chúng ta fork trực tiếp một mẫu trưởng thành do người khác viết, chẳng hạn dựa trên Jekyll hoặc Hugo, rồi chỉ chỉnh sửa các tệp cấu hình và nội dung.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image4.png)

**Phương pháp 4: Vibe Coding (Quy trình tạo hình ảnh bằng AI)**
Với các agent AI có khả năng hiểu hình ảnh đa phương thức mạnh mẽ, bạn chỉ cần thấy một phong cách trang web mà bạn thích trên mạng, chụp màn hình, và nói với AI: "Viết cho tôi một trang web dựa trên phong cách này." AI có thể phân tích các yếu tố hình ảnh và tạo mã nền tảng cho bạn.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image5.png)

**Lựa chọn trong hướng dẫn này: GitHub Pages + mẫu học thuật + chỉnh sửa AI.**
Lý do rất đơn giản:

* **Chi phí bằng không**: không cần mua máy chủ, không cần mua tên miền.
* **Chất lượng cao**: các mẫu thường được thiết kế bởi các nhà phát triển hàng đầu, với phong cách tối giản, cấu trúc chuyên nghiệp và tải nhanh.
* **Dễ bảo trì**: bạn chủ yếu viết Markdown, tương tự như viết trong Feishu Docs hay Notion, và AI giúp tạo trang web.

## 1.4 Lộ trình đầy đủ của hướng dẫn này

Để quá trình cấu hình trực quan và ít nhàm chán hơn, chúng ta sẽ sử dụng một trường hợp thú vị: **xây dựng trang chủ học thuật cho Musk**.

Mặc dù Elon Musk không phải là giáo sư đại học, ông đã xuất bản nhiều "bài viết kỹ thuật" công khai, chẳng hạn như *Hyperloop Alpha*, và cũng có nhiều dự án nổi tiếng, như SpaceX và Tesla. Chúng ta sẽ sử dụng những tài liệu đó làm dữ liệu thử nghiệm, kết hợp với quy trình Vibe Coding của Trae, trải qua một lộ trình xây dựng trang có thể tái sử dụng:

1. **Tìm bộ khung**: tìm một mẫu trang web chất lượng cao trên GitHub và fork vào kho của bạn.
2. **Chuẩn bị môi trường**: kéo mã về máy cục bộ và cấu hình Trae để AI có thể đọc dự án của bạn.
3. **Lặp lại với AI**: thay thế người mẫu của mẫu bằng Elon Musk, tải lên CV của ông, đổi "danh sách ấn phẩm" thành "trưng bày bài viết kỹ thuật," và thậm chí yêu cầu AI đổi màu trang thành "đỏ Sao Hỏa."
4. **Triển khai trực tuyến**: đẩy mã đã chỉnh sửa trở lại GitHub và ngay lập tức nhận được URL trang web có thể truy cập.

Phần này chỉ chịu trách nhiệm phác họa bức tranh tổng thể. Hiện tại, chỉ cần nhớ dòng chính:
**Fork mẫu -> Cải tạo bằng AI -> Đẩy lên mạng**
Trong các phần tiếp theo, chúng ta sẽ cùng đi qua từng bước.

# 2. Chuẩn Bị Môi Trường

## 2.1 Công cụ sử dụng trong hướng dẫn này

Toàn bộ quá trình xây dựng sử dụng bốn công cụ hoặc tài nguyên, mỗi cái đóng vai trò nhà thiết kế, nhà thầu, chủ đất hoặc hệ thống logistics.

* **Một máy tính**: Windows hoặc Mac đều được. Khác với phát triển Android thường yêu cầu bộ nhớ cao, phát triển web rất nhẹ và chạy mượt trên laptop văn phòng thông thường.
* **Trae**: đây là **trợ lý lập trình AI** và công cụ năng suất cốt lõi của bạn. Trong chế độ Vibe Coding, bạn không cần nắm vững cú pháp HTML hay CSS. Bạn chủ yếu nói với AI bằng ngôn ngữ tự nhiên, chẳng hạn "Đổi thanh điều hướng thành màu đen" hoặc "Đặt ảnh của Musk ở đây," và để nó viết và chỉnh sửa mã cho bạn.
* **Tài khoản GitHub**: đây là **máy chủ miễn phí và kho mã** của bạn. Chúng ta cần nó để lưu trữ tất cả các tệp trang web. Quan trọng nhất, chúng ta sẽ sử dụng **GitHub Pages** để biến mã thành URL có thể truy cập toàn cầu miễn phí, loại bỏ nhu cầu mua máy chủ hay tên miền.
* **Môi trường Git**: đây là **người đưa thư** hậu trường. Mặc dù chúng ta viết mã cục bộ trong Trae, Git là thứ đẩy mã từ máy tính của bạn lên GitHub. Bạn không cần nắm vững lệnh Git, và Trae có thể giúp gọi chúng, nhưng Git phải được cài đặt trước.
* **Môi trường Ruby**: đây là **xưởng trang web** cục bộ. Vì mẫu học thuật trong hướng dẫn này sử dụng Jekyll, chạy trên Ruby, chúng ta cần Ruby cục bộ để có thể xem trước trang web trên máy tính của mình trước khi đẩy lên mạng.

## 2.2 Tải xuống Trae

**Trae** là chiến trường chính của chúng ta trong Vibe Coding. Bạn có thể coi nó như một **trình soạn thảo mã với AI siêu việt tích hợp sẵn**. Khác với các trình soạn thảo khô khan truyền thống, nó giống như một lập trình viên giàu kinh nghiệm ngồi cạnh bạn, luôn sẵn sàng giúp đỡ.

* **Địa chỉ tải xuống**: truy cập trang chính thức [https://www.trae.cn](https://www.trae.cn) và tải xuống phiên bản cho hệ điều hành của bạn, Windows hoặc Mac.
* **Cài đặt**: cài đặt rất đơn giản, giống như cài đặt WeChat hay QQ. Nhấp đúp vào gói cài đặt và nhấp "Tiếp theo" cho đến khi hoàn tất.

Sau khi chuẩn bị xong công cụ này, trong các bước thực hành sau, chúng ta sẽ không cần phải nhìn chằm chằm vào các ngăn mã nhàm chán. Chúng ta sẽ trực tiếp mở dự án ở đây và sử dụng bảng trò chuyện ở bên phải để nói với AI bằng ngôn ngữ tự nhiên, bằng tiếng Việt nếu bạn muốn, để giúp chúng ta viết mã, sửa lỗi và thậm chí tái cấu trúc toàn bộ trang.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image6.png)

## 2.3 Tải xuống Git

**Git là gì?**
Nếu Trae là kỹ sư AI chịu trách nhiệm viết mã trong Vibe Coding, thì **Git là người đưa thư chịu trách nhiệm vận chuyển mã**. Bạn cần nó để đóng gói mã được viết trên máy tính và đẩy an toàn lên GitHub, kho lưu trữ đám mây của bạn. Không có nó, trang web của bạn chỉ chạy trên máy của bạn và không ai khác có thể xem.

Trước đây, bạn phải vào trang chính thức, tải xuống trình cài đặt và cấu hình biến môi trường thủ công. Điều đó thật phiền phức. Bây giờ, chúng ta có thể đơn giản để Trae giúp kiểm tra và cài đặt.

**Bước 1: Kiểm tra xem Git đã được cài đặt chưa**

Mở Trae và nhập hướng dẫn sau trong bảng trò chuyện ở góc dưới bên phải:

```markdown
Please help me check whether Git is already installed on this computer. Please run the `git --version` command in the terminal.
```

* **Trường hợp A (đã cài đặt)**: nếu bạn thấy something like `git version 2.xx.x`, chúc mừng. Bạn có thể bỏ qua bước cài đặt.
* **Trường hợp B (chưa cài đặt)**: nếu bạn thấy "command not found" hoặc một loạt thông báo lỗi màu đỏ, hãy tiếp tục bên dưới.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image7.png)

**Bước 2: Cài đặt với sự hỗ trợ của AI**

Đừng đóng Trae. Tiếp tục nhập trong bảng trò chuyện:

**Hướng dẫn (người dùng Windows):**

```markdown
I have not installed Git. Please write the command that uses the `winget` command-line tool to install Git automatically, and tell me how to run it in the terminal.
```

**Hướng dẫn (người dùng Mac):**

```markdown
I have not installed Git. Please tell me how to quickly install Git through terminal commands, for example using `git` or `brew`.
```

Trae sẽ cung cấp cho bạn một lệnh, thường là something like `winget install --id Git.Git`.

Bạn chỉ cần nhấp nút **Run in Terminal** trong khối mã hoặc sao chép vào terminal ở dưới cùng và nhấn Enter. Nó sẽ tự động tải xuống và cài đặt Git cho bạn.

Nếu bạn vẫn cảm thấy quy trình hỗ trợ AI chưa hoàn hảo, bạn có thể tham khảo hướng dẫn này để tải xuống và cài đặt thủ công:
[Git download and installation tutorial](https://blog.csdn.net/weixin_41293671/article/details/144255269?ops_request_misc=elastic_search_misc&request_id=63236900b52320a7beb177787ba97f07&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~baidu_landing_v2~default-5-144255269-null-null.142^v102^pc_search_result_base4&utm_term=git%E4%B8%8B%E8%BD%BD%E5%AE%89%E8%A3%85&spm=1018.2226.3001.4187)

## 2.4 Cài đặt môi trường Ruby

Trước khi chính thức bắt đầu viết mã, chúng ta vẫn cần một mảnh ghép cuối cùng. Mẫu trang chủ học thuật được sử dụng trong hướng dẫn này được xây dựng bằng Jekyll, bản thân nó dựa trên ngôn ngữ lập trình Ruby.

Để xem trước và gỡ lỗi "hiệu ứng cải tạo" trên máy tính của mình trước khi đẩy mã lên GitHub cho cả thế giới xem, chúng ta phải cài đặt môi trường Ruby trên máy tính. Hãy coi đây như việc thuê một thông dịch viên trên máy tính hiểu Ruby. Đừng lo, bạn không cần học cách viết Ruby. Bạn chỉ cần cài đặt nó, và Trae có thể xử lý phần còn lại.

### 2.4.1 Cài đặt trên Windows

**Bước 1: Tải xuống trình cài đặt bằng mirror trong nước**

Đối với người dùng Windows, trang chính thức tại https://rubyinstaller.org/downloads/ cung cấp trình cài đặt một chạm, nhưng do khác biệt mạng, sẽ hữu ích nếu biết một mẹo. Khuyến nghị chính thức cho người mới bắt đầu thường là **`Ruby+Devkit 3.X.X (x64)`**, vì nó bao gồm toolchain cần thiết.

**Lưu ý cho người mới bắt đầu**: trên thực tế, tải xuống trực tiếp từ trang chính thức có thể chậm hoặc thất bại. Chúng tôi khuyên dùng mirror trong nước tại [RubyInstaller for Windows - China mirror](https://rubyinstaller.cn/), thường nhanh hơn nhiều.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image8.png)

**Bước 2: Chạy cài đặt**

Nhấp đúp vào trình cài đặt đã tải xuống. Trong trình hướng dẫn thiết lập, đảm bảo đánh dấu **"Add Ruby executables to your PATH."** Đây là bước quan trọng nhất. Nếu không, máy tính sẽ không thể "tìm thấy" trình thông dịch bạn vừa cài đặt.

Sau khi đánh dấu, tiếp tục nhấp **Next** để hoàn tất cài đặt.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image9.png)

**Bước 3: Cấu hình bộ công cụ phát triển**

Khi tiến trình cài đặt hoàn tất, một cửa sổ dòng lệnh đen sẽ tự động mở ra. Đừng hoảng sợ. Nhập số `3` nơi con trỏ đang nhấp nháy, nghĩa là cài đặt môi trường MSYS2 cơ sở và toolchain MINGW, sau đó nhấn Enter. Đợi cho đến khi các lệnh chạy xong và cửa sổ tự động đóng.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image10.png)

**Bước 4: Xác minh kết quả**

Bây giờ là lúc yêu cầu AI kiểm tra bài tập của bạn. Mở Trae và nhập hướng dẫn ngôn ngữ tự nhiên sau trong bảng trò chuyện bên phải:

```markdown
Please help me check whether the Ruby environment has been installed correctly on this computer. Please run the `ruby -v` command in the terminal at the bottom and tell me the result.
```

Nếu Trae trả lời something like `ruby 3.x.x`, thì môi trường Ruby Windows của bạn đã được thiết lập hoàn chỉnh.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image11.png)

### 2.4.2 Cài đặt trên Mac

Cấu hình môi trường Mac có cảm giác "geek" hơn vì nó thường yêu cầu lệnh terminal. Nhưng trong chế độ Vibe Coding, chúng ta thậm chí không cần mở terminal thủ công. Chúng ta có thể để Trae đóng vai nhân viên IT cá nhân của mình.

**Bước 1: Đưa ra hướng dẫn thiết lập môi trường một lần**

Mở Trae và dán hướng dẫn ngôn ngữ tự nhiên sau vào bảng trò chuyện bên phải. Chúng ta sẽ yêu cầu nó xử lý việc kiểm tra Homebrew, cài đặt nếu thiếu, rồi cài đặt Ruby:

```markdown
I am using a Mac computer and need to configure a Ruby development environment. Please help me complete the following steps:
1. Check whether Homebrew is already installed. If not, please run Homebrew's official installation script in the terminal.
2. After confirming Homebrew is ready, run `brew install ruby` in the terminal.
3. When everything is done, run `ruby -v` to confirm the installation succeeded.
Please guide me step by step, and when necessary provide terminal commands that I can click and run directly.
```

Sau khi nhận được hướng dẫn, Trae sẽ bắt đầu làm việc và hiển thị các khối mã với nút chạy trong bảng trò chuyện.

**Lưu ý quan trọng cho người mới bắt đầu**

Khi cài đặt Homebrew, terminal thường hiển thị something like `Password:` và yêu cầu mật khẩu đăng nhập Mac của bạn.

**Lưu ý:** khi bạn nhập mật khẩu trong terminal Mac, màn hình sẽ không hiển thị bất kỳ ký tự hay dấu sao nào. Điều này là bình thường. Chỉ cần nhập mật khẩu mù và nhấn Enter.

**Bước 2: Xác minh kết quả**

Sau khi cài đặt, quay lại Trae và nhập:

```markdown
I just installed Ruby on this Mac through `brew`. Please help me run the `ruby -v` command in the terminal and check whether the installation and environment variables are correct.
```

Khi bạn thấy something like `ruby 3.x.x` trong terminal, xưởng trang web cục bộ đã sẵn sàng và Mac của bạn đã được chuẩn bị cho Vibe Coding.

## 2.5 Đăng ký tài khoản GitHub

**GitHub là gì?**
Nếu Git là người đưa thư, thì **GitHub là kho lưu trữ đám mây và phòng trưng bày**. Nó không chỉ lưu trữ mã của bạn miễn phí, mà quan trọng hơn, với **GitHub Pages** nó có thể biến mã của bạn thành URL trang web có thể truy cập toàn cầu. Nó cũng là nền tảng lưu trữ mã lớn nhất thế giới, và có tài khoản GitHub là một loại hộ chiếu vào thế giới kỹ thuật.

**Các bước đăng ký:**

1. **Truy cập trang chính thức**: mở [https://github.com/](https://github.com/).
2. **Nhấp Sign up**: nhấp **"Sign up"** ở góc trên bên phải.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image12.png)

3. **Điền thông tin của bạn**
4. **Email**: nhập địa chỉ email thật.
5. **Mật khẩu**: chọn mật khẩu mạnh.
6. **Tên người dùng (quan trọng!)**: **chọn cẩn thận**. URL trang chủ của bạn sau này sẽ trở thành **`https://your-username.github.io`**. Tốt nhất là sử dụng tên tiếng Anh, pinyin, ID quen thuộc hoặc kết hợp đơn giản các chữ cái và số. **Đừng** chọn something like `a1b2c3d4`, nếu không liên kết trang web của bạn sẽ khó nhớ.
7. **Xác minh và kích hoạt**: hoàn thành xác minh con người, thường là xoay hình ảnh hoặc chọn thiên hà xoắn ốc, sau đó kiểm tra email để lấy mã xác minh.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image13.png)

Sau khi đăng ký hoàn tất, bạn đã có một mảnh đất riêng trên internet. Trong phần tiếp theo, chúng ta sẽ bắt đầu xây dựng trên mảnh đất đó.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image14.png)

# 3. Từ Mẫu Đến Trang Truy Cập Đầu Tiên

Mọi thứ đã sẵn sàng. Trong hai chương đầu, chúng ta đã chuẩn bị các công cụ. Trong chương này, chúng ta sẽ chính thức chiếm đất trên internet. Nhiệm vụ trong chương này rất đơn giản:
**Đừng lo về trang trí hay nội dung. Trước tiên hãy xây dựng bộ khung trang và lấy liên kết truy cập trực tiếp.**

Chúng ta sẽ fork trực tiếp một mẫu học thuật trưởng thành và sử dụng tự động hóa GitHub Pages để让它 chạy trong vòng hai mươi phút. Khi hoàn tất, bạn sẽ có một liên kết có thể truy cập toàn cầu.

## 3.1 Lấy mẫu trang web

Trong chế độ Vibe Coding, chúng ta không cần viết HTML từ đầu. GitHub có hàng ngàn mẫu mã nguồn mở xuất sắc. Chúng ta chỉ cần "mượn" một cái và đổi tên thành của mình.

**Bước 1: Tìm một mẫu**

Ở đây chúng ta đã chọn một mẫu kinh điển với cấu trúc rõ ràng và tính phù hợp cao cho trưng bày học thuật:
https://github.com/luost26/academic-homepage?tab=readme-ov-file
Mẫu này dựa trên framework Jekyll.

Tất nhiên, bạn cũng có thể tìm kiếm **`academic-homepage`** trên GitHub và chọn phong cách khác mà bạn thích, nhưng để theo hướng dẫn này, nên sử dụng mẫu ở trên trước.

Chúng tôi cũng chuẩn bị một số mẫu bổ sung để giới thiệu:

* Minimal Light personal homepage theme: https://github.com/yaoyao-liu/minimal-light?
* Minimal Mistakes: [https://github.com/mmistakes/minimal-mistakes](https://github.com/mmistakes/minimal-mistakes?utm_source=chatgpt.com)
* Pixyll: https://github.com/johno/pixyll
* Hydejack: https://github.com/hydecorp/hydejack
* Forty Jekyll Theme: https://github.com/andrewbanchich/forty-jekyll-theme
* Leonids: https://github.com/github.com/renyuanz/leonids
* YAT: https://github.com/jeffreytse/jekyll-theme-yat

**Bước 2: Fork dự án**

Truy cập trang chủ kho lưu trữ mục tiêu và nhấp nút **Fork** ở góc trên bên phải. Một hộp xác nhận sẽ xuất hiện. Nhấp trực tiếp **Create Fork**.

* Giải thích: bước này tương đương với việc sao chép kho mã của người khác với đầy đủ chìa khóa vào tài khoản GitHub của bạn. Bây giờ, bạn sở hữu bản sao trang web của riêng mình.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image15.png)

**Bước 3: Đổi tên kho lưu trữ, bước quan trọng nhất**

Đổi tên kho lưu trữ thành:
`your-username.github.io`

**Lưu ý quan trọng cho người mới bắt đầu**:
Đây là quy tắc bắt buộc của GitHub Pages.
Ví dụ, nếu tên người dùng GitHub của bạn là `musk-fan`, thì tên kho lưu trữ **phải** là `musk-fan.github.io`.
Chỉ có như vậy GitHub mới tự động cấp cho bạn một tên miền miễn phí. Nếu tên sai, trang web sẽ không mở được sau này.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image16.png)

## 3.2 Lấy URL dự án GitHub

Sau khi đổi tên, chúng ta cần biên lai lấy kho lưu trữ.

1. Quay lại trang chủ kho lưu trữ, dưới tab **Code**.
2. Nhấp nút **Code** màu xanh lá.
3. Đảm bảo tab **HTTPS** được chọn.
4. Nhấp nút sao chép và sao chép URL kết thúc bằng `.git`, ví dụ `https://github.com/musk-fan/musk-fan.github.io.git`.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image17.png)

## 3.3 Kéo dự án về máy cục bộ

Trước đây, các lập trình viên phải gõ lệnh Git phức tạp trong terminal đen để tải xuống mã. Trong kỷ nguyên Vibe Coding, chúng ta có Trae. Chúng ta chỉ cần nói với AI, "Tôi muốn cái này, giúp tôi kéo nó xuống."

**Bước 1: Chuẩn bị**

Tạo một thư mục mới trên máy tính, ví dụ `MyWebsite`, sau đó nhấp chuột phải và chọn **Open with Trae**, hoặc mở Trae trước và chọn **Open Folder**.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image18.png)

**Bước 2: Đưa ra lệnh clone**

Sau khi Trae mở, gọi bảng trò chuyện AI ở bên phải và nhập hướng dẫn ngôn ngữ tự nhiên sau:

```text
Please help me clone the remote GitHub repository into the current folder.
Repository address: paste the URL you just copied, for example https://github.com/musk-fan/musk-fan.github.io.git
Execution requirement: please run the `git clone` command directly in the terminal.
```

**Bước 3: Xác nhận tải xuống**

Trae sẽ tự động gọi terminal ở dưới cùng và thực thi lệnh. Đợi vài giây. Khi bạn thấy các tệp như `_config.yml` và `index.html` xuất hiện trong cây tệp bên trái, dự án đã được chuyển thành công vào máy tính của bạn.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image19.png)

## 3.4 Xem trước trang web cục bộ

Mã đã trên máy của bạn và môi trường Ruby đã sẵn sàng. Trước khi chúng ta chỉnh sửa trang, trước tiên phải kiểm tra nó cục bộ trên máy tính của mình. Điều này giống như cải tạo một ngôi nhà: bạn đầu tiên sắp xếp mọi thứ trong phòng trưng bày, xác nhận nó trông đúng, và chỉ khi đó mới mở cửa công khai.

Nhờ môi trường Ruby được cài đặt trong **Phần 2.4**, điều này giờ rất đơn giản.

**Bước 1: Cài đặt các phụ thuộc**

Một trang Jekyll phụ thuộc vào nhiều Gems để chạy. Điều này giống như mua tất cả đồ nội thất từ một danh sách mua sắm. **Tuy nhiên**, do điều kiện mạng, tải xuống trực tiếp có thể bị đình trệ. Chúng ta sẽ yêu cầu Trae **chuyển sang mirror trong nước** và cài đặt các phụ thuộc ở đó.

Trong hộp trò chuyện của Trae, nhập:

```markdown
I need to install the Jekyll dependencies. Considering the network environment, please first change the `source` in the Gemfile to the domestic mirror `https://gems.ruby-china.com/`. After that, please run the `bundle install` command in the terminal to install all dependencies.
```

**Bước 2: Khởi động dịch vụ cục bộ**

Bây giờ chúng ta sẽ khởi động một **máy chủ cục bộ** để mô phỏng trang web đang chạy. Tiếp tục và nói với Trae:

```markdown
The dependencies have finished installing. Please help me start the Jekyll local preview service in the terminal. Please run the `bundle exec jekyll serve` command.
```

Sau khi terminal chạy vài giây, bạn sẽ thấy something similar to:
`Server address: http://127.0.0.1:4000/academic-homepage/`

1. **Mở trình duyệt**: nhấp vào liên kết đó, hoặc nhập trực tiếp vào trình duyệt:
   `http://127.0.0.1:4000/academic-homepage/`
2. **Nhìn thấy phép thuật**: bây giờ trang web của bạn đã đang chạy trong trình duyệt. Mặc dù nó vẫn hiển thị tên tác giả mẫu gốc, nó đã chạy cục bộ trên máy tính của bạn.

Từ thời điểm này, bất cứ khi nào bạn thay đổi nội dung và nhấn `Ctrl+S`, sau đó làm mới trình duyệt, **nội dung trang web sẽ thay đổi theo**.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image20.png)

Sau khi xem trước cục bộ hoạt động, chúng ta có thể vào chương tiếp theo và bắt đầu biến trang web thành something có hình dáng của Elon Musk.

# 4. Chỉnh Sửa Nội Dung Với Sự Hỗ Trợ Của AI

Để giúp mọi người nhanh chóng trải nghiệm quy trình đầy đủ, chúng ta sẽ không sử dụng thông tin cá nhân của mình, để tránh lo lắng về quyền riêng tư. Thay vào đó, chúng ta sẽ sử dụng **Elon Musk làm ví dụ** và xây dựng một trang chủ học thuật cho ông. Điều này giúp chúng ta bỏ áp lực nhàm chán của việc viết CV cá nhân và tập trung vào niềm vui của Vibe Coding cho trang web. Nó cũng cho phép chúng ta thấy thú vị như thế nào khi đặt các "bài viết kỹ thuật" của một người thép Silicon Valley, chẳng hạn như *Hyperloop Alpha*, trên một trang web phong cách học thuật.

Chúng ta sẽ đi qua vòng lặp hoàn chỉnh từ **lấy mẫu** đến **xuất bản trang**, và xây dựng một không gian trưng bày cá nhân đẳng cấp thế giới bằng tay.

Theo nhịp độ của tôi và gửi hướng dẫn đầu tiên cho AI.

## 4.1 Ràng buộc toàn cục thống nhất

Đây là **prompt thiết lập toàn cục**. Bạn chỉ cần gửi nó một lần.
Mục đích của nó là đặt quy tắc cho AI, để ngăn nó tự ý ngẫu hứng và phá vỡ cấu trúc trang. Sao chép trực tiếp vào Trae:

```text
You are now the maintainer of a "GitHub Pages + Jekyll academic homepage template" site.
The current repository is a Jekyll-powered academic homepage (including `_config.yml`, `_data`, `_layouts`, etc.).
Your modifications must follow these principles:
1. Each step should only solve the current stage goal. Do not do later-stage content in advance.
2. Do not modify the site structure, do not introduce new plugins, and do not change the theme style.
3. All content must be renderable by Jekyll without errors.
4. All identity information must follow an "academic-style simulation" tone and must not use first-person voice.
5. Do not invent obviously fake IEEE / Nature papers.
6. If information is uncertain, use "publicly well-known facts" or "reasonable academic simulation labeling."
```

## 4.2 Xây dựng trang chủ của Musk, phần nội dung

### 4.2.1 Hướng dẫn toàn cục đầu tiên: thay thế danh tính

Điều đầu tiên chúng ta cần giải quyết là "Tôi là ai?" Mẫu được điền thông tin của tác giả gốc, và chúng ta cần thay thế bằng AI trong một lần.

**Bước 1: Chuẩn bị tài sản**

Đặt các tài sản hình ảnh tôi cung cấp cho bạn, `University_of_Pennsylvania.jpg` và `Queen_University.jpg`, vào thư mục dự án tương ứng, thường là `/assets/images/badges/`.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image21.png)
![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image22.png)

**Bước 2: Gửi hướng dẫn**

Trong hộp trò chuyện bên phải của Trae, nhập prompt sau. Lưu ý rằng chúng ta không cần tìm và chỉnh sửa các dòng thủ công. Chúng ta chỉ cần nói với AI những gì chúng ta muốn:

```text
1. Goal: replace the "person identity" of the current academic homepage with Elon Musk. Only modify the basic profile information.
2. Specific requirements:
1. Name: Elon Musk
2. Professional identity:
    Technology Entrepreneur
    Engineer
    Founder & CEO of SpaceX
    CEO of Tesla, Inc.
3. Education:
    Queen's University (Physics and Economics, not completed) (image path: /assets/images/badges/Queen_University.jpg)
    University of Pennsylvania (B.S. in Physics, B.A. in Economics) (image path: /assets/images/badges/University_of_Pennsylvania.jpg)
4. Research Interests (can be simulated as):
    Space Systems Engineering
    Sustainable Energy Systems
    Artificial Intelligence & Robotics
    Large-scale Technological Innovation
5. Honors & Recognition:
    Time Person of the Year (2021)
    Fellow of the Royal Society (FRS)
    Listed in Forbes Billionaires (multiple years)
6. Constraints:
    Do not add papers / publications
    Do not invent IEEE, Nature, or Science papers
    Use academic-style wording and avoid commercial promotional tone
    Keep the original field structure unchanged and only replace the content
```

Đến đây, bạn có thể thấy rằng Trae đã hoàn thành tất cả yêu cầu chỉnh sửa của chúng ta.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image23.png)

**Bước 3: Làm mới trình duyệt cục bộ**

Làm mới trình duyệt cục bộ bây giờ, và bạn sẽ thấy mọi thứ đã được thay đổi chính xác.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image24.png)

### 4.2.2 Cải thiện lặp đi lặp lại: thêm "bài viết" và dự án

Vì Elon Musk không phải là giáo sư đại học truyền thống, ông hiếm khi xuất bản bài báo trên *Nature* hay *Science*. Nhưng với tư cách là "kỹ sư trưởng," ông đã phát hành nhiều **bài viết kỹ thuật** và **kế hoạch tầm nhìn** có tính chuyên môn cao.

Trong bối cảnh của trang chủ học thuật, chúng ta có thể định nghĩa lại ý nghĩa của "Publications" là **"Bài viết Kỹ thuật & Kế hoạch Tầm nhìn."** Điều này không hề gượng ép. Trên thực tế, nó rất phù hợp với danh tính người xây dựng của ông.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image25.png)

**Bước 1: Chuẩn bị tài sản**

Tải xuống các hình ảnh bìa tôi cung cấp, namely `Hyperloop_Alpha_sketch.jpg`, `SpaceX_Starship.jpg`, và `Neuralink_sewing_machine_robot.jpg`, đặt chúng dưới `/assets/images/covers/`, và xóa các hình ảnh mẫu ban đầu có trong thư mục đó.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image26.png)
![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image27.png)
![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image28.png)

**Bước 2: Gửi hướng dẫn**

Gửi prompt sau cho Trae và để nó giúp chúng ta xây dựng lại cấu trúc dữ liệu:

```text
1. Role setting: you are a static site development expert who is proficient in Jekyll and Liquid syntax.
2. Task goal:
Modify the section title on the homepage or in the navigation bar.
The current file structure is organized by year subfolders, for example `_publications/2023/xxx.md`.
Create three new Markdown files in the specified format to display Elon Musk's technical white papers and visionary plans.
3. Specific steps and requirements:
1. Modify the section title
    Please search globally for the string "Selected Publications" (it may appear in `index.html`, `_config.yml`, or `_pages/publications.md`).
    Replace it with: "Technical White Papers & Visionary Plans".
2. Rebuild the publication data (critical step)
    Clear all old content under the `_publications` folder, including old year folders such as 2023 and 2024.
    Create three new folders: `_publications/2013/`, `_publications/2017/`, and `_publications/2019/`.
    In those folders, create the following three Markdown files.
3. Strictly follow this file format
Important: you must strictly follow the YAML Front Matter format below, and must not invent new field names:
    - title:          "paper title"
    - date:           YYYY-MM-DD HH:MM:SS +0800
    - selected:       true
    - pub:            "venue / journal name"
    - pub_date:       "year"
    - abstract: >-    abstract content...
    - cover:          /assets/images/covers/cover_name.jpg
    - authors:        - Author1- Author2
    - links:Paper:    https://paper-link
4. Please generate the full code for the following three files (including the path descriptions):
(1) Path: `_publications/2013/2013-hyperloop.md`
    Title: Hyperloop Alpha
    Date: 2013-08-12
    Pub: Tesla Blog (Open Source)
    Pub_date: "2013"
    Abstract: A proposal for a fifth mode of transport, utilizing a low-pressure tube and air bearings to achieve subsonic speeds.
    cover: /assets/images/covers/Hyperloop_Alpha_sketch.jpg
    Authors: Elon Musk, SpaceX & Tesla Teams
    Link: https://www.tesla.com/sites/default/files/blog_images/hyperloop-alpha.pdf
(2) Path: `_publications/2017/2017-mars.md`
    Title: Making Humans a Multi-Planetary Species
    Date: 2017-06-01
    Pub: New Space
    Pub_date: "2017"
    Abstract: Detailed architecture of the Starship system designed to colonize Mars. This paper outlines the technical challenges to establish a self-sustaining city.
    cover: /assets/images/covers/SpaceX_Starship.jpg
    Authors: Elon Musk
    Link: https://www.liebertpub.com/doi/10.1089/space.2017.29009.emu
(3) Path: `_publications/2019/2019-neuralink.md`
    Title: An Integrated Brain-Machine Interface Platform
    Date: 2019-10-16
    Pub: Journal of Medical Internet Research
    Pub_date: "2019"
    Abstract: We have built arrays of small and flexible electrode threads, with as many as 3,072 electrodes per array, and a neurosurgical robot.
    cover: /assets/images/covers/Neuralink_sewing_machine_robot.jpg
    Authors: Elon Musk, Neuralink
    Link: https://www.jmir.org/2019/10/e16194/
Execution requirement:
Please directly provide the complete content of these three files, and also provide the modification code for the file where you changed the title.
```

**Bước 3: Làm mới trình duyệt cục bộ**

Khi quá trình build hoàn tất, bạn sẽ thấy danh sách ấn phẩm vốn nhàm chán đã biến thành một trưng bày công nghệ đen tương lai.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image33.png)

### 4.2.3 Hoàn thiện cuối cùng: liên kết mạng xã hội và avatar

Đây là bước chính để đi từ điểm 90 lên điểm 100. Thanh bên vẫn có thể chứa liên kết GitHub gốc của mẫu hoặc email không chính xác. Chúng ta cần trỏ chúng đến các tài khoản mạng xã hội thật của Musk, chủ yếu là X.com.

**Bước 1: Chuẩn bị**

Tìm kiếm trên Google một bức ảnh đẹp của Musk, lưu thành `portrait.png`, hoặc kéo vào thư mục `images/photo` trong Trae và thay thế hình ảnh gốc.

**Bước 2: Sao chép prompt sau vào Trae**

```text
1. Role setting: you are a detail-oriented Jekyll website development expert.
2. Task goal: complete the final update of the website sidebar and personal information configuration. We need to update the author's avatar, intro, and social links to Elon Musk's real information.
Please first scan the project structure and find the configuration file that controls the author information.
3. Please make the following modifications:
1. Avatar path fix
    I have already uploaded a new image named `portrait.png` into the `images/` or `assets/images/` folder.
    Please modify the avatar path in the configuration file to point to this image, and ensure the relative path is correct, for example `/images/portrait.png`.
2. Social link cleanup
    Please update or remove the social icon links in the sidebar:
    Email: change it to `elon@spacex.com`, or if the field allows, comment it out or remove it to avoid harassment.
    Twitter / X: change it to `https://x.com/elonmusk` (this is the core link).
    GitHub: change it to `https://github.com/tesla` to point to the Tesla open-source repository, or remove it directly.
    Google Scholar: must be removed, because he does not maintain it.
    LinkedIn / ResearchGate: if they exist, remove them all.
Output requirement:
Please directly provide the complete modified configuration code snippet.
```

**Bước 3: Làm mới trình duyệt cục bộ**

1. Nhìn vào thanh bên. Có đang sử dụng bức ảnh đẹp đó chưa? Có nhấp vào biểu tượng Twitter đưa bạn đến X.com chưa?

Đến lúc này, cục bộ, bạn đã có một trang chủ học thuật cá nhân hoàn chỉnh, chuyên nghiệp và mang đậm phong cách Musk.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image34.png)

## 4.3 Tiêm linh hồn qua tùy chỉnh UI, phần phong cách

Hiện tại nội dung đã chính xác, nhưng trang vẫn trông giống như một bản CV in. Nó thiếu cảm giác công nghệ. Trong chế độ Vibe Coding, chúng ta không cần hiểu CSS. Chúng ta chỉ cần mô tả **cảm giác** mà chúng ta muốn cho AI.

**Kịch bản ví dụ**:
Nếu bạn nghĩ nền xám quá nhàm chán và muốn đổi thành **đỏ Sao Hỏa**, chỉ cần yêu cầu Trae:
*"Tôi muốn đổi màu nền của thanh bên thành đỏ đậm (#8B0000) để phản ánh cảm giác của Sao Hỏa. Tôi nên sửa tệp CSS hay SCSS nào? Vui lòng cho tôi mã trực tiếp."*

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image35.png)

Nếu bạn thích phong cách **SpaceX Dashboard** trong hình ảnh ví dụ trên, bạn có thể sao chép trực tiếp prompt cấp nhà thiết kế sau:

```text
1. Role setting: you are a top UI designer who admires "Swiss internationalist style" and is good at interfaces like Notion, Linear, or Apple.
2. Task goal: please completely rewrite the CSS / SCSS to create a "SpaceX Dashboard" style minimalist academic homepage. The core keywords are: transparent, restrained, precise.
3. Please apply the following concrete style overrides:
1. Global typography
    Font: abandon the original serif font. Force the whole site to use the system-level sans-serif stack:
    'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif.
    Line height: increase breathing room in the body text with `line-height: 1.75`.
    Colors:
        Main title: #111111
        Body text: #333333
        Secondary information such as dates or citations: #666666
2. Clean header
    Background: remove the previous black background and use pure white (#FFFFFF), or translucent white with blur if supported, for example `rgba(255, 255, 255, 0.9)` plus `backdrop-filter: blur(10px)`.
    Border: keep only a very thin bottom border, `border-bottom: 1px solid #EAEAEA`.
    Text: navigation links should use dark gray #333333, and only become black and bold on hover.
3. Remove cards and return to content
    Remove the background and shadow of the left sidebar and the About me cards (`box-shadow: none`, `background: transparent`).
    Great minimalism lets the text float directly on the page background.
    Increase spacing: significantly increase `margin-bottom`, for example 80px, between sections and use whitespace instead of borders to separate content.
4. Restrained use of brand color
    Use Tesla Red (#E82127) only on links and important buttons.
    Link style: remove underline and only change color. On hover, add a light red background block such as `background: rgba(232, 33, 39, 0.05)`.
5. Avatar tuning
    Keep it circular with `border-radius: 50%`.
    Remove the border.
    Keep only a very light shadow, such as `box-shadow: 0 10px 30px rgba(0,0,0,0.08)`.
Execution requirement:
Please analyze the `_sass` or CSS files. Do not patch the old code. Instead, directly provide the code that resets and overrides the styles above.
```

## 4.4 Thay thế bằng thông tin của riêng bạn, phần tùy chỉnh

Chúc mừng. Sau khi trải qua quy trình trang chủ Musk ở trên, bạn đã nắm vững tư duy cốt lõi của Vibe Coding trong việc xây dựng trang. Biến phòng trưng bày mẫu này thành ngôi nhà của riêng bạn thực sự dễ dàng bây giờ.

Bạn không cần bắt đầu lại từ đầu. Bạn chỉ cần lặp lại các bước trên, nhưng với chiến lược linh hoạt hơn:

**Bước 1: Thay thế vật lý, avatar và thông tin cơ bản**

Đây là bước dễ nhất:

1. **Đổi ảnh**: trong bảng tệp ở bên trái Trae, tìm `assets/images/` và kéo ảnh chân dung của bạn vào đó, thay thế `portrait.png`.
2. **Đổi tên**: nói với Trae, "Thay thế tất cả các lần xuất hiện của Elon Musk trên toàn bộ trang bằng [tên của bạn]."

**Bước 2: Tiền xử lý AI, để ChatGPT / Gemini giúp tổ chức nội dung**

Trae giỏi viết mã, nhưng nếu bạn trực tiếp ném một CV PDF lộn xộn cho nó, nó có thể bị bối rối.

**Vì vậy cách tiếp cận hiệu quả hơn là**:
đầu tiên sử dụng một AI mạnh trong xử lý văn bản dài, chẳng hạn như ChatGPT, Gemini hoặc Kimi, để giúp bạn **định dạng sạch sẽ** CV.

Bạn có thể gửi ChatGPT một prompt như thế này:

```text
Role setting: you are a professional academic website content planner.
Task goal:
I will send you my personal resume / CV. Please help me extract key information from it and organize it into a clear Markdown structure suitable for filling directly into a static website.
Please strictly organize and refine it into the following five modules. If some content does not exist, leave it blank.
1. Profile
Name: my full name.
Tagline: a one-line professional tag, for example "CS Student @ XX Univ | AI Enthusiast".
Bio: a 50 to 100 word third-person introduction summarizing my background and core skills, in a professional academic tone.
Socials: extract email, GitHub, LinkedIn, blog links, and so on.
2. Education
Please list: school name, degree such as B.S. in CS, and time range.
Optional: if GPA or core courses are available, add them on a separate line.
3. Selected Projects — important
Please extract 2 to 3 strongest projects, and for each include:
Title: project name.
Tech Stack: technologies used, such as Python, React, PyTorch.
TL;DR: a one-line summary of what the project does.
Description: 2 to 3 core contributions, refined using STAR style.
Image Placeholder: reserve an image filename such as `project_name.jpg`.
4. Publications / Articles
If there are papers or technical articles, please extract:
Title
Venue
Date, year is enough
Abstract, one-sentence summary
5. Skills
Please organize them into categories: programming languages, frameworks / tools, and other skills.
Output requirement:
Do not explain the process. Directly output the cleaned Markdown content.
```

Sau khi bạn nhận được văn bản đã được làm sạch, đưa nó vào Trae, và độ chính xác sẽ cải thiện đáng kể.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image36.png)
![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image37.png)

**Bước 3: Thay thế nội dung cốt lõi, với hai lộ trình có thể**

Ở bước này, tùy thuộc vào sở thích của bạn, bạn có thể chọn hai chế độ Vibe Coding khác nhau:

1. **Chế độ A: để AI dẫn đường, sau đó chỉnh sửa thủ công**

Nếu bạn muốn biết chính xác nơi mọi thứ được thay đổi, bạn có thể hỏi Trae:

```markdown
I want to modify the "Education" section. Please tell me where the corresponding file path is and which lines contain the code.
```

Trae sẽ cho bạn biết trong bảng trò chuyện something like:
"Tệp bạn cần sửa đổi là `_pages/about.md`, và mã liên quan ở quanh dòng XX..."

Sau đó bạn có thể tự mở tệp đó từ cây tệp bên trái và điền nội dung đã được làm sạch từ ChatGPT như một bài tập chỉnh sửa có cấu trúc.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image38.png)

2. **Chế độ B: tự động hóa được quản lý hoàn toàn**

Nếu bạn nghĩ việc tìm tệp quá rắc rối, trực tiếp dán thông tin đã được làm sạch vào Trae:

```markdown
Here is the cleaned content for my "Education" and "Project Experience" sections (paste the Markdown content).
Please directly replace the corresponding content in the current site and preserve the existing layout format.
```

# 5. Triển Khai Trực Tuyến

## 5.1 Triển khai lên GitHub Pages

**Bước 1: Kích hoạt GitHub Actions, build trên đám mây**

Quay lại GitHub trong trình duyệt:

1. Nhấp **Settings** ở đầu kho lưu trữ.
2. Trong thanh bên trái, nhấp **Pages**.
3. Dưới **Build and deployment**, đổi **Source** từ `Deploy from a branch` thành **`GitHub Actions`**.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image39.png)

**Bước 2: Tự động cấu hình Jekyll workflow**

Sau khi chuyển đổi, bố cục trang thay đổi. GitHub sẽ tự động nhận diện đây là một dự án Jekyll.

1. Tìm thẻ **Jekyll (By GitHub Actions)**.
2. Nhấp **Configure** trên thẻ đó.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image40.png)

**Bước 3: Commit tệp cấu hình**

Sau khi nhấp, bạn sẽ được đưa đến một trang đầy mã. Đây là tệp cấu hình `.yml` đã được GitHub viết sẵn để build trang Jekyll.

1. **Đừng sửa đổi bất kỳ mã nào**.
2. Nhấp nút **Commit changes...** màu xanh lá ở góc trên bên phải.
3. Trong hộp xác nhận pop-up, nhấp **Commit changes** lần nữa.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image41.png)

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image42.png)

**Bước 4: Đợi và xác minh**

Sau khi commit, máy chủ của GitHub bắt đầu làm việc tự động.

1. Nhấp tab **Actions** trong menu trên cùng.
2. Bạn sẽ thấy một task có tên `Deploy Jekyll site to Pages` đang quay.
3. Đợi một đến hai phút cho đến khi vòng tròn vàng biến thành **dấu tích xanh**.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image43.png)

**Bước 5: Truy cập trang web của bạn**

Khi vòng tròn chuyển sang màu xanh, bạn có thể truy cập phiên bản mặc định của mẫu qua một địa chỉ như:
**`https://your-username.github.io/`**

Chúc mừng. Bạn đã triển khai thành công một trang chủ học thuật cá nhân có thể truy cập toàn cầu.

## 5.2 Commit các thay đổi và cập nhật trang chủ

Bây giờ chúng ta sẽ đẩy tất cả các chỉnh sửa cục bộ mà chúng ta đã thực hiện trước đó lên GitHub, để trang chủ cá nhân phong cách Musk này có thể được cả thế giới nhìn thấy.

1. Nhấp **Source Control** ở bên trái.
2. Thêm tất cả **thay đổi** vào **staged changes**.
3. Để Trae giúp tạo commit message, sau đó nhấp **Commit**.
4. Nhấp **Sync Changes** hoặc **Push** để đẩy lên nhánh `main`.
5. Đợi một lúc cho đến khi tất cả các quy trình dưới tab **Actions** hoàn tất.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image44.png)

Bây giờ, chúc mừng. Mở **`https://your-username.github.io/`**, và bạn đã có một trang chủ học thuật hoàn chỉnh, chuyên nghiệp và mang đậm hương vị Musk.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image45.png)

# 6. Chơi Nâng Cao: Tự Tay Xây Dựng Trang Chủ Cá Nhân Từ Đầu

Nếu bạn nghĩ các mẫu học thuật quá cứng nhắc, hoặc nếu bạn muốn tạo một trang web one-page cool như *The Matrix*, chào mừng đến với **phần DIY**.

Ở đây, chúng ta không fork mã của bất kỳ ai. Chúng ta sẽ sử dụng Trae, bắt đầu từ một thư mục trống, và tạo ra một trang web hoàn chỉnh chỉ với một hướng dẫn, sau đó triển khai nó trực tuyến.

## 6.1 Tại sao nên tự xây dựng

* **Tự do tuyệt đối**: không có ràng buộc mẫu. Nếu bạn muốn thanh điều hướng ở bên phải, hoặc pháo hoa trong nền, bạn chỉ cần nói với AI.
* **Tối giản**: các mẫu thường chứa hàng trăm tệp, trong khi một trang web tự xây dựng có thể chỉ cần một `index.html`.
* **Kiểm soát kỹ thuật**: đây là cách tốt nhất để hiểu cách một trang web thực sự hoạt động.

Chúng ta sẽ minh họa **quy trình HTML thuần** cổ điển:
không cần biên dịch, và GitHub Pages hỗ trợ nó nguyên bản, khiến nó lý tưởng để xây dựng trang đích cá nhân.

## 6.2 Ví dụ thực hành: yêu cầu AI viết trang chủ "trung tâm chỉ huy Sao Hỏa"

Lần này chúng ta không đi lộ trình học thuật. Giả sử Musk muốn một trang chủ cá nhân cực kỳ tối giản, tương lai để trình bày kế hoạch Sao Hỏa của ông.

**Bước 1: Tạo một dự án trống**

Tạo một thư mục mới trên máy tính và mở bằng Trae. Lúc đó, cây tệp bên trái hoàn toàn trống.

*(Mẹo: bạn có thể chuẩn bị trước một bức ảnh của Musk và đặt tên là `portrait.png`.)*

**Bước 2: Xây dựng framework**

Nhập prompt sau trong bảng trò chuyện của Trae. Lưu ý rằng chúng ta yêu cầu AI viết tất cả mã vào một tệp duy nhất để dễ quản lý cho người mới bắt đầu:

```text
I want to build a minimalist personal homepage for Elon Musk from scratch, without any complex framework, using only HTML + CSS + JS.
Design style: SpaceX dashboard style.
    Background: use deep space black (#000000), with starlight animation.
    Main accent color: use "Mars red" (#E82127).
    Font: use a monospace font stack to imitate the feel of a code terminal.
Page content:
    Place Elon Musk's avatar in the center, circular, with a rotating border. The image path is `portrait.png`.
    Name: Elon Musk (Technoking of Tesla)
    Intro: "Occupying Mars... 99% Loading."
    At the bottom, put three glowing buttons linking to X (Twitter), SpaceX, and Tesla.
Technical requirement:
Please put all CSS styles and HTML structure inside a single `index.html` file.
Please generate the full code directly.
```

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image46.png)

**Bước 3: Tạo và xem trước**

Trong bước trước, Trae đã giúp chúng ta tạo một tệp `index.html`. Vậy làm thế nào để xem hiệu quả hiện tại?

Nói với Trae trong bảng trò chuyện:

```markdown
Please help me start a local service to preview this webpage.
```

Bạn sẽ nhận được một liên kết như `http://localhost:8000`. Sao chép và mở trong trình duyệt, và bạn sẽ thấy một "trang chủ Sao Hỏa" cực cool, có lẽ với những ngôi sao lấp lánh trong nền.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image47.png)

Nhưng chúng ta sẽ nhận thấy trang hiện tại chỉ là một landing page rất cool. Với tư cách là một trang chủ cá nhân hoàn chỉnh, nó vẫn còn quá ít thông tin và thiếu độ sâu mong đợi của một trang chủ học thuật. Vì vậy, dựa trên framework hình ảnh này, bây giờ chúng ta tiếp tục làm phong phú nó với thông tin phong cách học thuật về Elon Musk.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image48.png)

**Bước 4: Cải thiện thông tin thêm**

Chúng ta muốn Trae giữ phong cách Sao Hỏa hiện tại, nhưng tái cấu trúc trang thành something giống mẫu học thuật hơn. Chúng ta cần nói rõ ràng với nó để di chuyển các yếu tố hiện có sang bên trái và tạo một vùng nội dung mới ở bên phải cho văn bản hồ sơ và bài viết kỹ thuật, trong khi giữ tất cả nội dung mới thêm trong cùng phong cách cyberpunk đen-đỏ.

Sao chép prompt sau và gửi cho Trae:

```text
Core principle:
You must strictly preserve the current "SpaceX / Mars" design style, including pure black background, starlight decorations, red neon accent color, and monospace code-style font. Do not use the white background from the reference image.

Specific modification steps:
1. Create a two-column layout
Split the page into left and right columns. The left sidebar should take about 30% to 35% width, and the right content area should take about 65% to 70%.

2. Left sidebar - move the existing information
Move all current elements from the original hero screen into the fixed left sidebar:
    - Avatar: keep Elon Musk's circular avatar.
    - Name and title: keep the red neon text "ELON MUSK" and "Technoking of Tesla".
    - Loading bar: keep "Occupying Mars... 99% Loading" as the personal signature.
    - Social buttons: move the three red buttons, X, SPACE X, and TESLA, to the bottom of the left sidebar.

3. Right content area - add detailed information
Add detailed personal introduction and achievements in the right area. All new body text should use white or light gray, while titles should use red neon emphasis. Please create the following sections:
- About Me:
    Write a short introduction, for example: "Technology entrepreneur and engineer focused on multi-planetary expansion, sustainable energy, and artificial intelligence."
- Focus Areas:
    List Space Systems Engineering, Mars Colonization Architecture, Brain-Machine Interfaces.
- Visionary Plans & White Papers:
    This is the key section. Refer to the list style in the example image, but convert it into a black-background style.
    Create a list displaying his important technical plans, using red borders or glow effects to distinguish each item.
    Item 1: "Making Humans a Multi-Planetary Species" (Starship Architecture, 2017).
    Item 2: "Hyperloop Alpha" (High-speed transportation proposal, 2013).
    Item 3: "Neuralink: An Integrated Brain-Machine Interface Platform" (2019).
- Notable Achievements:
    Briefly list milestones such as:
    First private liquid-propellant rocket to reach orbit (Falcon 1)
    First reusable orbital class rocket (Falcon 9)

4. Style detail requirements
All section titles on the right, such as "About Me," should use the same red glowing style as the "ELON MUSK" text on the left.
Make sure the whole page remains responsive and preserves a good two-column layout on different screen sizes.
```

Làm mới trình duyệt sau đó, và trang học thuật cyberpunk của bạn đã hoàn tất. Tất nhiên, bạn có thể tiếp tục cải thiện theo sở thích của riêng mình. Như trong các bước trước, bạn chỉ cần nói với Trae mục tiêu rõ ràng, và nó sẽ xử lý quá trình lập trình tẻ nhạt cho bạn.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image49.png)

## 6.3 Cách triển khai trang web tự xây dựng

Khác với mẫu forked trước đó, đến từ kho lưu trữ của người khác, dự án này được bạn tạo mới và chưa có vị trí GitHub tương ứng. Do đó chúng ta cần liên kết nó thủ công.

**Bước 1: Tạo kho lưu trữ mới trên GitHub**

1. Đăng nhập GitHub trong trình duyệt.
2. Nhấp biểu tượng **+** ở góc trên bên phải, sau đó **New repository**.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image50.png)

3. **Tên kho lưu trữ**: nhập `mars-profile`, hoặc bất kỳ tên nào khác bạn thích.

**Lưu ý**:
Nếu bạn đã sử dụng **`your-username.github.io`**, bạn không thể sử dụng lại tên đó ở đây. Bạn có thể chọn tên khác, và GitHub sẽ tạo URL như **`your-username.github.io/mars-link`**.

4. **Public / Private**: chọn **Public**.
5. **Không đánh dấu "Add a README file"!**
   Để các tùy chọn khác ở mặc định.
6. Nhấp **Create repository**.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image51.png)

**Bước 2: Đẩy mã cục bộ lên đám mây**

Sau khi tạo, GitHub sẽ đưa bạn đến một trang có nhiều nội dung trông giống mã. Đừng lo. Chúng ta chỉ cần sao chép liên kết kho lưu trữ hiển thị trên trang đó.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image52.png)

Quay lại Trae và nhập trong bảng trò chuyện:

```markdown
I have created an empty repository on GitHub. The address is: https://github.com/your-username/mars-link.git (please replace this with the actual repository address you just created).
Now please help me initialize the current local project as a Git repository and push the code to the `main` branch of this remote address.
```

Trae thường sẽ giúp thực thi chuỗi chuẩn bên dưới, và bạn có thể chỉ cần nhấp để chạy chúng:

1. `git init`
2. `git add .` và `git commit -m "First commit"`
3. `git branch -M main` và `git remote add origin [địa chỉ của bạn]`
4. `git push -u origin main`

Sau khi Trae hoàn tất đẩy, quay lại GitHub và làm mới trang. Nhấp tab **Code**, và bạn sẽ thấy mã được viết trong Trae đã được đẩy thành công vào kho lưu trữ.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image53.png)

**Bước 3: Kích hoạt GitHub Pages**

Sau khi mã được đẩy, trang web sẽ không tự động xuất hiện. Chúng ta vẫn cần bật công tắc thủ công:

1. Quay lại trang kho lưu trữ GitHub và nhấp **Settings** ở đầu trang.
2. Nhấp **Pages** trong thanh bên trái.
3. Dưới **Build and deployment**:
   1. Đặt **Source** thành `Deploy from a branch`.
   2. Đặt **Branch** thành `main`, và chọn `/(root)` làm thư mục.
4. Nhấp **Save**.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image54.png)

Sau khi bạn nhấp Save, trang web sẽ không xuất hiện ngay lập tức. Backend của GitHub hoạt động như một nhà máy robot nhỏ. Nó cần khoảng **1 đến 2 phút** để đóng gói mã của bạn, build và xuất bản lên máy chủ toàn cầu.

Đợi kiên nhẫn và làm mới trang. Dưới tiêu đề lớn **GitHub Pages**, bạn sẽ thấy một dòng với URL tương tự như:
**"Your site is live at `https://your-username.github.io/mars-link/`"**

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image55.png)

Nhấp vào nó, và trung tâm chỉ huy Sao Hỏa của bạn đã trực tuyến.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image56.png)

# 7. Lời Kết

Hướng dẫn đã kết thúc. Bây giờ, khi bạn nhìn vào `.github.io` sáng lên trong thanh địa chỉ trình duyệt, bạn có cảm thấy hơi giống như đã cắm một lá cờ trên internet?

Trong hướng dẫn này, chúng ta đã mượn nhân cách của Elon Musk và xây dựng một trang web như một dự án Lego trông khá ấn tượng. Nhưng đây chỉ là khởi đầu. Phần quyến rũ nhất của Vibe Coding không phải là tiết kiệm bao nhiêu thời gian gõ phím. Đó là nó **hoàn toàn phá vỡ bức tường giữa "ý tưởng" và "thực tế."**

Trước đây, bạn có thể đã từ bỏ việc trưng bày một dự án vì **bạn không thể viết CSS**.
Bây giờ, giới hạn duy nhất còn lại là **trí tưởng tượng** và **gu thẩm mỹ** của bạn.

**Đừng để trang web này giữ nguyên là một "bản sao lấy cảm hứng từ Musk."**
Liên kết Tesla bạn đã dùng để luyện tập và bài viết về thuộc địa hóa Sao Hỏa đó cuối cùng là câu chuyện của người khác. Trang chủ của bạn nên là danh thiếp mang tên bạn trong thế giới kỹ thuật số.

Hãy đi và đặt trải nghiệm dự án thực tế đầu tiên của bạn ở đó.
Hãy đi và xuất bản những suy nghĩ độc đáo của riêng bạn về một chủ đề kỹ thuật.
Bạn thậm chí có thể đặt danh sách sách yêu thích hoặc ảnh của riêng bạn lên đó.
Những suy nghĩ mà sẽ bị chôn vùi trên WeChat Moments có thể lưu lại vĩnh viễn ở đây.
Niềm đam mê không vừa trong CV có thể lan tỏa tự do ở đây.

Đừng để mảnh đất này trống.
Hãy đi thử nghiệm. Hãy phá vỡ nó. Hãy xây dựng lại.
Tiếp tục làm điều đó cho đến khi nó phát triển thành hình dáng bạn thích nhất.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image57.png)

***Hãy tiến lên, và để thế giới nhìn thấy bạn.***

# Tài liệu tham khảo

CSDN: [2025 latest nanny-level tutorial: step by step on using GitHub to build a personal homepage](https://blog.csdn.net/qq_45743991/article/details/145505150?ops_request_misc=&request_id=&biz_id=102&utm_term=github%E6%9E%84%E5%BB%BA%E4%B8%AA%E4%BA%BA%E4%B8%BB%E9%A1%B5&utm_medium=distribute.pc_search_result.none-task-blog-2~all~sobaiduweb~default-0-145505150.142^v102^pc_search_result_base4&spm=1018.2226.3001.4187)

CSDN: [Git download and installation tutorial](https://blog.csdn.net/weixin_41293671/article/details/144255269?ops_request_misc=elastic_search_misc&request_id=63236900b52320a7beb177787ba97f07&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~baidu_landing_v2~default-5-144255269-null-null.142^v102^pc_search_result_base4&utm_term=git%E4%B8%8B%E8%BD%BD%E5%AE%89%E8%A3%85&spm=1018.2226.3001.4187)

CSDN: [Ruby installation tutorial under Windows](https://blog.csdn.net/alive_tree/article/details/103043158?ops_request_misc=elastic_search_misc&request_id=ad7e29ea7f702554d785c2fc82ec6e95&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~ElasticSearch~search_v2-11-103043158-null-null.142^v102^pc_search_result_base4&utm_term=ruby%E5%AE%89%E8%A3%85%E6%95%99%E7%A8%8B&spm=1018.2226.3001.4187)
