# Học sử dụng Git và Github

Trong các bài học trước, chúng ta đã học cách viết code bằng các công cụ vibe coding dựa trên Web. Mỗi cuộc trò chuyện sẽ tạo ra một phiên bản code mới. Nhưng hãy nghĩ về một vấn đề: nếu chúng ta muốn quay lại sửa đổi trước đó, có cách nào tiện lợi không? Có công cụ nào có thể ghi lại code của chúng ta ở các giai đoạn khác nhau, cho phép chúng ta chuyển đổi và sửa đổi giữa các phiên bản bất kỳ lúc nào không?

Để đáp ứng nhu cầu này, phần mềm kiểm soát phiên bản đã ra đời. Trong bài viết này, chúng ta sẽ giới thiệu chương trình kiểm soát phiên bản nổi tiếng nhất — Git — và nền tảng lưu trữ code tốt nhất — GitHub. Chúng ta sẽ học cách sử dụng Git để quản lý code, cách lấy code của người khác từ GitHub, cách tải lên code của chính mình, và cách hợp tác với người khác trong các dự án lớn.

Cho dù là theo dõi phiên bản dự án cá nhân, đồng bộ code trong hợp tác đội nhóm, hay đóng góp cho cộng đồng mã nguồn mở, Git và GitHub đều là công cụ không thể thiếu của developer hiện đại. Bằng cách làm chủ chúng, bạn sẽ có thể quản lý code hiệu quả hơn, tạo checkpoint theo cần, chuyển đổi tự do giữa các giai đoạn code khác nhau, và dễ dàng xử lý mọi thứ từ thay đổi file đơn lẻ đến phát triển dự án lớn — làm cho mỗi lần lặp code đều có thể kiểm soát và truy xuất nguồn gốc.

> 💡 **Kiến thức tiên quyết**
>
> Trước khi học Git, bạn nên tìm hiểu các khái niệm sau:
> - [Terminal/Dòng lệnh là gì](/vi-vn/appendix/2-development-tools/command-line-shell) - Học cách sử dụng dòng lệnh để tương tác với máy tính
> - [Git là gì](/vi-vn/appendix/2-development-tools/git-version-control) - Hiểu các khái niệm cốt lõi của hệ thống kiểm soát phiên bản Git
>
> Bài viết này sẽ tập trung vào quy trình làm việc GitHub và thao tác thực tế, vui lòng tham khảo các liên kết phụ lục cho kiến thức cơ bản nói trên.

# Bắt đầu nhanh với Git

Trước khi bắt đầu sử dụng Git, hãy đảm bảo bạn đã đọc nội dung về [dòng lệnh](/vi-vn/appendix/2-development-tools/command-line-shell) và [cơ bản về Git](/vi-vn/appendix/2-development-tools/git-version-control) trong phần phụ lục. Bài viết này sẽ giả định bạn đã có kiến thức cơ bản này và trực tiếp hướng dẫn cách cài đặt, cấu hình Git và sử dụng GitHub để cộng tác.

## Cách cài đặt Git

Chúng ta sẽ giới thiệu ba phương pháp cài đặt Git trên các hệ điều hành máy tính khác nhau. Vui lòng làm theo hướng dẫn phù hợp với phiên bản hệ thống của bạn:

### Windows

1. Truy cập [Trang tải Git chính thức](https://git-scm.com/download/win) và tải về trình cài đặt phù hợp với hệ thống của bạn: [Gói cài đặt](https://github.com/git-for-windows/git/releases/download/v2.51.0.windows.1/Git-2.51.0-64-bit.exe). Theo mặc định, khuyến nghị sử dụng trình cài đặt x64.
2. Nhấp đúp vào trình cài đặt và làm theo hướng dẫn của thuật sĩ cài đặt:
   ![](/zh-cn/stage-2/backend/git-workflow/images/image5.png)
   1. Khuyến nghị giữ các tùy chọn mặc định. Nếu bạn cần tùy chỉnh, lưu ý các điểm sau: (Trong hầu hết trường hợp, bạn có thể nhấp "Next" liên tục)
      - Chọn trình soạn thảo mặc định Git sử dụng: Chọn trình soạn thảo bạn thích (như VS Code). Bạn có thể chọn tùy chọn đầu tiên theo mặc định, tức là Vim (một trình soạn thảo văn bản), hoặc chọn tùy chọn "Visual Studio Code as Git's default editor" (cần cài đặt VS Code trước). Bạn có thể giữ lựa chọn mặc định và nhấp "Next" để tiếp tục.
        ![](/zh-cn/stage-2/backend/git-workflow/images/image6.png)
      - Chọn cách sử dụng Git: Ba tùy chọn này kiểm soát khả năng truy cập của Git trong hệ thống. Khuyến nghị chọn tùy chọn 2 ("from command line and 3rd-party software") — nó thêm các công cụ Git cơ bản vào PATH, cho phép bạn sử dụng Git trong Git Bash, Command Prompt, PowerShell và IDE mà không làm rối hệ thống.
        ![](/zh-cn/stage-2/backend/git-workflow/images/image7.png)

3. Sau khi cài đặt, nhấp chuột phải trên màn hình. Nếu bạn thấy "Git Bash Here" trong menu, cài đặt đã thành công.

![](/zh-cn/stage-2/backend/git-workflow/images/image8.png)

### MacOS

Đối với macOS, bạn có thể nhập `git --version` trong terminal để kiểm tra xem Git đã được cài đặt chưa. Nếu chưa, hệ thống sẽ nhắc bạn cài đặt — chỉ cần làm theo hướng dẫn để hoàn tất cài đặt.

1. Phương pháp 1: Cài đặt qua Homebrew
   Nếu bạn đã cài đặt [Homebrew](https://brew.sh/) (trình quản lý gói Mac), hãy mở terminal và nhập
   ```bash
   brew install git
   ```
2. Phương pháp 2: (Khuyến nghị) Cài đặt qua Xcode: https://developer.apple.com/xcode/, Xcode đã tích hợp sẵn Git. Sau khi cài đặt, chỉ cần làm theo hướng dẫn để tiếp tục.

### Linux

Hầu hết các bản phân phối Linux có thể cài đặt Git thông qua trình quản lý gói:

- Ubuntu/Debian:

```bash
sudo apt update
sudo apt install git
```

- CentOS/RHEL:

```bash
sudo yum install git
```

- Xác minh cài đặt: Nhập git --version trong terminal. Nếu hiển thị số phiên bản, cài đặt đã thành công.

## Khởi tạo Git

Sau khi cài đặt Git, đầu tiên bạn cần cấu hình thông tin người dùng — đây là bước cơ bản khi sử dụng Git để kiểm soát phiên bản. Thực hiện các lệnh sau trong terminal (thay thế nội dung trong ngoặc bằng thông tin của bạn):

```bash
# Đặt tên người dùng toàn cục (sẽ hiển thị trong bản ghi commit)
git config --global user.name "Your Name"

# Đặt email toàn cục (khuyến nghị sử dụng email đã đăng ký trên GitHub/GitLab)
git config --global user.email "your.email@example.com"
```

Git sẽ nhúng thông tin này vào mỗi bản ghi commit, làm "thông tin tác giả" cho mỗi lần sửa đổi. Khi xem lịch sử phiên bản (ví dụ: sử dụng git log), bạn có thể thấy rõ ai đã sửa đổi mỗi dòng code, thuận tiện cho việc truy trách nhiệm và giao tiếp. Trong dự án cộng tác, thông tin danh tính thống nhất giúp thành viên nhóm nhanh chóng nhận diện ai đã thực hiện thay đổi nào, từ đó nâng cao hiệu quả cộng tác (ví dụ: tìm developer liên quan thông qua bản ghi commit để thảo luận vấn đề).

Bạn có thể nhập `git config --list` trong dòng lệnh để xem thông tin cấu hình Git hiện tại và xác nhận cài đặt thành công.

# GitHub là gì

GitHub là một nền tảng lưu trữ code dựa trên Git. Nó không chỉ cung cấp lưu trữ từ xa cho các kho lưu trữ Git mà còn bao gồm các công cụ cộng tác (như Issues, Pull Requests, Projects), giúp developer dễ dàng chia sẻ code và hợp tác hơn. Nói một cách đơn giản, Git là công cụ kiểm soát phiên bản cục bộ, còn GitHub là "đĩa cloud kho code + cộng đồng cộng tác" từ xa.

GitHub không chỉ là nền tảng lưu trữ code lớn nhất thế giới mà còn là cộng đồng mã nguồn mở năng động và có sức ảnh hưởng nhất toàn cầu. Ý tưởng cốt lõi của "mã nguồn mở" ở đây là bất kỳ ai cũng có thể tải xuống và chạy mã nguồn của phần mềm. Mô hình này cho phép mọi người trên thế giới kiểm tra code của nhau và thực hiện sửa đổi, hoặc tạo dự án mới dựa trên đó. Ví dụ: bạn có thể tìm thấy nhiều hướng dẫn học tập cũng như mã nguồn hoàn chỉnh của framework huấn luyện mô hình GPT (như PyTorch) trên GitHub. Mỗi ngày, vô số người trên toàn thế giới cộng tác kiểm tra và cải thiện code.

![](/zh-cn/stage-2/backend/git-workflow/images/image9.webp)

Nhiều công ty lớn mở mã nguồn chương trình hoặc hướng dẫn của họ trên GitHub để đạt lợi thế cạnh tranh trong ngành — điều này cũng có thể xem là một hình thức quảng cáo. Trong cộng đồng GitHub, số "ngôi sao (stars)" mà dự án nhận được là thước đo chính về giá trị của dự án; dự án hoặc tổ chức càng có nhiều sao thì uy tín và sức ảnh hưởng càng lớn.

![](/zh-cn/stage-2/backend/git-workflow/images/image10.png)

Trong khóa học của chúng ta, tài nguyên hỗ trợ và bài tập cũng sẽ được tải lên kho lưu trữ GitHub chuyên dụng. Thông qua quá trình tải lên bài tập, bạn sẽ dần làm quen và nắm vững việc sử dụng GitHub, tạo nền tảng vững chắc cho việc kiểm soát phiên bản trong phát triển ứng dụng tương lai.

## Đăng ký tài khoản GitHub

1. Truy cập [Trang chủ GitHub](https://github.com/) và nhấp "Sign up" ở góc trên bên phải.
   ![](/zh-cn/stage-2/backend/git-workflow/images/image11.webp)
2. Nhập địa chỉ email của bạn (khuyến nghị sử dụng email thường xuyên sử dụng, vì xác minh và thông báo sẽ được gửi đến đó), đặt mật khẩu (phải bao gồm chữ cái, số và ký tự đặc biệt).
3. Hoàn thành xác minh con người, xác minh email theo hướng dẫn, tài khoản của bạn đã được tạo.

## Tạo kho lưu trữ đầu tiên trên GitHub

Tiếp theo, chúng ta sẽ tạo thư mục lưu trữ đầu tiên, còn được gọi là kho lưu trữ hoặc "repo".

![](/zh-cn/stage-2/backend/git-workflow/images/image12.png)![](/zh-cn/stage-2/backend/git-workflow/images/image13.png)

![](/zh-cn/stage-2/backend/git-workflow/images/image14.png)

1. Repository name: Tên kho lưu trữ hiển thị cho người khác.
2. Description: Mô tả chi tiết về kho lưu trữ.
3. Choose visibility: Đối với kho cá nhân, nếu đặt là private, chỉ bạn và những người được mời đặc biệt mới có thể xem. Nếu đặt là public, tất cả mọi người đều có thể xem.
   Đối với kho trong tổ chức, nếu là Private, chỉ người trong tổ chức mới có thể xem.
   Nếu là Public, người ngoài tổ chức cũng có thể xem.
4. README: Thông thường, mỗi kho đều nên có file README. Bạn có thể coi nó như bản giới thiệu đầy đủ về kho, bao gồm hướng dẫn sử dụng, danh sách file và cách thao tác.
5. Add .gitignore and license:
   1. File .gitignore báo cho Git biết bỏ qua một số thư mục hoặc file nhất định khi tải lên GitHub, do đó chúng sẽ không được theo dõi hoặc thêm vào staging area. Điều này rất hữu ích cho các file kiểm thử tạm thời, gói dependency hoặc file lớn. Khi đã chỉ định, các file này sẽ không còn được theo dõi.
   2. license là loại giấy phép mã nguồn mở bạn chọn. Các giấy phép khác nhau quy định chi tiết việc người khác có thể sử dụng code của bạn cho mục đích thương mại hay không, cùng với các điều khoản và điều kiện khác.

Khuyến nghị tích "Add README", đặt khả năng hiển thị kho là "Private", điền tên kho và mô tả theo sở thích của bạn, sau đó nhấp "Create repository" để hoàn tất việc tạo kho lưu trữ từ xa đầu tiên.

![](/zh-cn/stage-2/backend/git-workflow/images/image15.png)

Sau đó, bạn sẽ có một kho sạch không có file bổ sung nào. Tiếp theo bạn có thể bắt đầu tải file lên.

![](/zh-cn/stage-2/backend/git-workflow/images/image16.png)

Lệnh để lấy kho là `git clone`, nhưng nó cần địa chỉ kho. Bạn có thể tìm địa chỉ kho bằng cách nhấp nút "Code" màu xanh lá, bạn sẽ thấy các tùy chọn HTTPS và SSH. Thông thường, bạn có thể sử dụng bất kỳ phương pháp nào trong hai phương pháp này để tải kho về máy cục bộ (chỉ có như vậy bạn mới có thể sửa đổi và tải file lên).

![](/zh-cn/stage-2/backend/git-workflow/images/image17.png)

Nói chung, kho được clone qua HTTP phù hợp để tải xuống và kiểm thử tạm thời kho của người khác, nhưng không khuyến nghị cho phát triển cá nhân. Để có trải nghiệm học tập tốt hơn, bạn nên thiết lập xác thực SSH trước.

## Liên kết SSH cục bộ

Trong GitHub, "liên kết giao thức SSH" về bản chất là việc liên kết SSH public key của thiết bị cục bộ với tài khoản GitHub của bạn, cho phép GitHub nhận diện thiết bị của bạn thông qua giao thức SSH. Điều này cho phép bạn vận hành kho lưu trữ từ xa một cách an toàn mà không cần mật khẩu (như clone, push hoặc pull code).

Nói đơn giản: Điều này giống như cấp cho thiết bị của bạn một "thẻ kiểm soát truy cập GitHub chuyên dụng". Sau khi liên kết, khi thiết bị của bạn truy cập kho GitHub thông qua giao thức SSH, GitHub sẽ xác minh "thẻ kiểm soát truy cập" (SSH public key của bạn). Khi đã xác nhận là thiết bị được ủy quyền, bạn có thể trực tiếp vận hành — không cần nhập tài khoản và mật khẩu mỗi lần.

> 💡 SSH là gì

### Tại sao cần liên kết giao thức SSH?

GitHub hỗ trợ hai giao thức vận hành kho chính: giao thức HTTPS và giao thức SSH:

- Giao thức HTTPS: Mỗi thao tác (như push) đều cần nhập tài khoản và mật khẩu GitHub (hoặc Personal Access Token PAT). Quá trình xác minh phức tạp và có rủi ro rò rỉ mật khẩu.
- Giao thức SSH: Xác thực được hoàn thành thông qua "cặp khóa", do đó không cần nhập mật khẩu lặp lại, và truyền tải được mã hóa an toàn hơn.

"Liên kết giao thức SSH" là bước tiên quyết để kích hoạt xác thực SSH GitHub — chỉ khi liên kết SSH public key cục bộ với tài khoản GitHub, GitHub mới có thể nhận diện thiết bị của bạn và cho phép vận hành SSH trên kho.

### Logic cốt lõi của "liên kết": Vai trò của cặp khóa SSH

Xác thực SSH dựa vào cặp khóa (public key + private key), chúng là các file mã hóa khớp nhau. Sau khi tạo, bạn cần cung cấp "public key" cho GitHub ("liên kết"), và giữ "private key" trên thiết bị cục bộ:

1. Private key: Được lưu trữ trong thư mục được chỉ định (thường là ~/.ssh/) trên thiết bị cục bộ (như máy tính), đóng vai trò là "chìa khóa chuyên dụng của bạn", tuyệt đối không chia sẻ với bất kỳ ai.
2. Public key: Đây là một "ổ khóa" có thể chia sẻ công khai — bạn cần sao chép nó vào danh sách "SSH keys" của tài khoản GitHub (thao tác "liên kết").

Khi bạn vận hành kho GitHub thông qua SSH (ví dụ: git push git@github.com:xxx/xxx.git):

- Thiết bị cục bộ của bạn sử dụng private key để mã hóa "yêu cầu vận hành" và gửi đến GitHub;
- Sau khi nhận yêu cầu, GitHub cố gắng giải mã bằng public key bạn đã liên kết trước đó;
- Nếu giải mã thành công, thiết bị của bạn được xác nhận là đã ủy quyền, thao tác được cho phép; nếu không, truy cập bị từ chối.

### Các bước cụ thể của "liên kết" (Quy trình cốt lõi)

Khi bạn đã hiểu nguyên lý, thao tác thực tế rất đơn giản — cốt lõi là "tạo cặp khóa → tải public key lên GitHub":

1. Tạo cặp khóa SSH cục bộ
   1. Sử dụng Trae để lấy public key (khuyến nghị)
      Prompt: `Help me create the SSH key needed for GitHub login. My email is your_email@gmail.com , Please return the public key for me to copy`

   ![](/zh-cn/stage-2/backend/git-workflow/images/image18.webp)

   Sau khi nhập prompt, bạn cũng cần nhấn Enter trong terminal bên trái, nếu không lệnh sẽ tiếp tục chờ mà không thực thi. Vì Trae không thể giúp bạn thực hiện bất kỳ điều kiện phán đoán nào, chúng ta chỉ cần nhấn Enter liên tục.

   Cuối cùng, bạn sẽ thấy Trae ở bên phải trả về public key mà nó đã đọc. Bạn chỉ cần sao chép nó và chuẩn bị dán trong bước tiếp theo.

   ![](/zh-cn/stage-2/backend/git-workflow/images/image19.webp) 2. Lấy public key thủ công
   Mở terminal cục bộ của bạn (trên Windows sử dụng Git Bash hoặc PowerShell; trên macOS/Linux sử dụng Terminal), nhập lệnh sau (thay your_email@example.com bằng email bạn đã đăng ký tài khoản GitHub):

   ```bash
   ssh-keygen -t ed25519 -C "your_email@example.com"
   ```

   1. Nhấn Enter để chấp nhận mặc định (đường dẫn file mặc định, không có passphrase, hoặc đặt passphrase theo cần). Điều này sẽ tạo hai file trong thư mục ~/.ssh/:
      - id_ed25519: Private key (lưu cục bộ, **tuyệt đối không chia sẻ**);
      - id_ed25519.pub: Public key (cần tải lên GitHub).

2. "Liên kết" public key với tài khoản GitHub

Đây là bước liên kết cốt lõi — thêm public key cục bộ vào danh sách "SSH keys" của tài khoản GitHub:

1. Sao chép nội dung public key:
   1. Trae:
   2. Windows: Mở C:\Users\<your>\.ssh\id_ed25519.pub bằng Notepad và sao chép toàn bộ nội dung;
   3. macOS/Linux: Chạy cat ~/.ssh/id_ed25519.pub trong terminal và sao chép toàn bộ đầu ra (từ phần đầu SSH-ed25519 đến email ở cuối).
2. Đăng nhập GitHub và vào trang "SSH Key Management":
   1. Nhấp vào avatar góc trên bên phải → Settings → Menu bên trái SSH and GPG keys → Nhấp New SSH key.
      ![](/zh-cn/stage-2/backend/git-workflow/images/image20.png)![](/zh-cn/stage-2/backend/git-workflow/images/image21.png)
   2. Nhập bất kỳ tiêu đề nào (ví dụ: SSH của máy tính cục bộ của bạn), sau đó dán SSH public key bạn vừa lấy vào đây.

![](/zh-cn/stage-2/backend/git-workflow/images/image22.png)

![](/zh-cn/stage-2/backend/git-workflow/images/image23.png)

3. Xác minh liên kết thành công

Nhập lệnh sau trong terminal (**Trae cũng có thể thực hiện các thao tác sau**) để kiểm tra xem GitHub có thể nhận diện thiết bị của bạn hay không:

```bash
ssh -T git@github.com
```

- Nếu bạn thấy nội dung tương tự như Hi [tên người dùng GitHub của bạn]! You've successfully authenticated..., điều đó có nghĩa là bạn đã liên kết khóa thành công;
- Nếu gặp lỗi, thường là do public key sao chép không đầy đủ, quyền private key quá cao (thư mục ~/.ssh/ cục bộ của bạn chỉ nên cho phép bạn đọc và ghi). Hãy kiểm tra các vấn đề này theo cần.

### Lưu ý quan trọng

Nếu bạn có nhiều thiết bị (như laptop và máy bàn), bạn cần tạo cặp khóa SSH riêng cho mỗi thiết bị và liên kết mỗi public key với cùng một tài khoản GitHub — mỗi thiết bị có "thẻ kiểm soát truy cập" riêng.

Tuyệt đối không chia sẻ private key của bạn (không tải lên GitHub hoặc chia sẻ với người khác), nếu không ai đó có thể mạo danh bạn vận hành kho của bạn. Nếu private key bị rò rỉ, hãy xóa ngay public key tương ứng khỏi GitHub và tạo cặp khóa mới.

Sau khi liên kết SSH, sử dụng địa chỉ kho định dạng SSH (ví dụ: git@github.com:username/repository.git) để vận hành, thay vì định dạng HTTPS (ví dụ: https://github.com/username/repository.git). Nếu bạn đã clone kho bằng HTTPS trước đó, có thể dùng git remote set-url origin `<new>` để chuyển đổi giao thức.

# Sử dụng Trae để thao tác GitHub

Chúng ta đã giải thích Git là gì, GitHub là gì, SSH là gì và cách cấu hình nó. Bây giờ bạn có thể tự do sử dụng Trae để thực hiện các thao tác Git. Đầu tiên, hãy học cách clone kho lưu trữ từ xa về máy cục bộ.

## Git clone: Tải xuống kho hiện có

Bạn có thể trực tiếp cho nó biết địa chỉ kho bạn muốn clone

![](/zh-cn/stage-2/backend/git-workflow/images/image24.webp)

## Git pull: Lấy cập nhật từ kho từ xa

Trước khi cập nhật kho mỗi lần, vì nó có thể được bảo trì bởi nhiều người, bạn cần pull các thay đổi mới nhất trước. Sau đó, bạn có thể sửa đổi và push file.

**Nhớ bao gồm tên thư mục và đường dẫn tương đối hoặc tuyệt đối của nó, để tránh push sai kho.**

prompt:`Help me pull this repository AIID-TEST in ./AIID-TEST.`

## Git commit & Git push: Tạm lưu cập nhật và push lên GitHub

Khi mọi thứ đã sẵn sàng, bạn có thể thử sửa đổi file cục bộ, thêm hoặc xóa các mục trong thư mục. Sau đó, để Trae phát hiện các thay đổi và giúp bạn push lên GitHub.

prompt:`I finished. Commit and push to the repository AIID-TEST in ./AIID-TEST.`

![](/zh-cn/stage-2/backend/git-workflow/images/image25.webp)

Push thành công. Bây giờ bạn có thể xem nội dung đã cập nhật trên GitHub.

# Tài liệu tham khảo

- Pro Git book https://git-scm.com/book/en/v2
- GitHub Docs https://docs.github.com/en
