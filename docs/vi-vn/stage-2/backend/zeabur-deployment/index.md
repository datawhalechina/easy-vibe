# Đưa website lên mạng (dễ dàng): triển khai PaaS một cú nhấp chuột

> 💡 **"Đưa website lên mạng" nghĩa là gì?** Còn được gọi là "going live" hay "triển khai/xuất bản". Một trang web bạn tự xây trên máy tính của mình chỉ có mình bạn mở được. **Đưa lên mạng nghĩa là đặt nó trên một máy chủ chạy 24/7, để bất kỳ ai cũng có thể gõ một URL trong trình duyệt và truy cập** — giống như một tài liệu Word chỉ mình bạn đọc được, sau khi bạn đăng lên blog thì ai cũng xem được; khác biệt là lần này bạn đang xuất bản một trang web hoàn chỉnh.

Trong hướng dẫn này, chúng ta sẽ cùng tìm hiểu **cách dễ nhất để đưa một trang web lên mạng — không cần mua máy chủ, không cần học DevOps**. Chỉ cần kết nối kho GitHub của bạn, bấm vài nút, trang web của bạn sẽ hoạt động. Chúng tôi sẽ giới thiệu bốn nền tảng phổ biến: **Tencent Cloud CloudBase**, **Vercel**, **Netlify** và **Zeabur**.

# Tại sao dùng nền tảng PaaS thay vì tự lập máy chủ?

Bạn có thể thắc mắc: nếu mọi thứ cuối cùng đều nằm "trên một máy chủ", tại sao không tự mua máy chủ và triển khai ở đó? Câu trả lời: **các nền tảng sẽ xử lý hết những phần rắc rối cho bạn**.

Nếu triển khai thủ công, một dự án thường cần nhiều bước, mỗi bước đều có thể gặp vấn đề. Các bước chính thường bao gồm:

1. **Chuẩn bị máy chủ**: Bạn cần mua máy chủ đám mây (ví dụ Alibaba Cloud, Tencent Cloud, hoặc AWS EC2), chọn khu vực đặt máy chủ (như Thượng Hải, Singapore), cấu hình (CPU, bộ nhớ, dung lượng ổ đĩa, v.v.), và học cách kết nối từ xa với máy chủ (ví dụ thông qua công cụ SSH).
   ![](/zh-cn/stage-2/backend/zeabur-deployment/images/image2.png)
2. **Cấu hình môi trường**: Ứng dụng Web cần chạy trong một "môi trường" cụ thể -- ví dụ để chạy dự án Node.js, bạn phải cài đặt Node.js trước; để chạy dự án Python, bạn phải cài đặt Python và các thư viện bên thứ ba tương ứng. Nếu phiên bản môi trường không khớp, chương trình có thể báo lỗi và không thể khởi động.
3. **Tải tài nguyên lên**: Bạn cần tải mã và tài nguyên cục bộ lên máy chủ, các phương pháp phổ biến bao gồm FTP hoặc Git. Nếu dự án có dung lượng lớn (ví dụ chứa tệp video), nếu kết nối bị gián đoạn giữa chừng, đôi khi bạn phải tải lên lại từ đầu.

![](/zh-cn/stage-2/backend/zeabur-deployment/images/image3.png)

4. **Khởi động dịch vụ và kiểm tra**: Sau khi tải lên xong, bạn cần thực thi lệnh khởi động ứng dụng trên máy chủ, và kiểm tra "địa chỉ mạng được phân phối có thể truy cập được không". Nếu không truy cập được, có thể tường lửa của máy chủ chưa mở cổng tương ứng (ví dụ ứng dụng của bạn lắng nghe cổng 3000, nhưng cổng này bị tường lửa chặn), hoặc chương trình có Bug, lúc này cần xem nhật ký máy chủ để khắc phục.
   > Mẹo: Bạn có thể hiểu cổng (port) như "số phòng" để phân biệt các ứng dụng khác nhau trên cùng một thiết bị, còn IP là "số nhà" của thiết bị đó. IP và cổng kết hợp với nhau (IP:port) có thể định vị chính xác một dịch vụ mạng cụ thể.
5. **Bảo trì và cập nhật**: Mỗi lần bạn sửa mã sau này, bạn phải tải lên lại và khởi động lại dịch vụ. Nếu máy chủ gặp sự cố (ví dụ mất điện, lỗi mạng), bạn cần khởi động lại ứng dụng thủ công, đôi khi còn cần cấu hình thêm "công cụ quản lý tiến trình" để chương trình tự động khởi động lại khi thoát bất thường.

Các nền tảng "triển khai mã thấp" như CloudBase, Vercel, Zeabur ra đời chính là để giải quyết các vấn đề phức tạp nói trên. Chúng sẽ giúp bạn tự động hoàn thành các bước "mua máy chủ, cấu hình môi trường, tải mã lên, khởi động dịch vụ, giám sát vận hành". Bạn chỉ cần kết nối kho mã (ví dụ GitHub hoặc GitLab) của mình với nền tảng, hoặc tải mã trực tiếp lên, nó sẽ tự động lấy mã, nhận dạng loại ứng dụng, cấu hình môi trường runtime tương ứng, và cuối cùng cung cấp cho bạn một địa chỉ mạng công cộng mà bất kỳ ai cũng có thể truy cập. Nó thậm chí có thể liên kết tên miền riêng của bạn chỉ bằng một cú nhấp.

![](/zh-cn/stage-2/backend/zeabur-deployment/images/image4.webp)

Tiếp theo, chúng tôi sẽ giới thiệu lần lượt đặc điểm và cách sử dụng của ba nền tảng này, giúp bạn chọn phương án triển khai phù hợp nhất với mình.

---

# So sánh nền tảng triển khai

| Nền tảng | Đặc điểm | Phù hợp cho | Gói miễn phí |
|------|------|----------|----------|
| **Tencent CloudBase** | Truy cập nhanh trong nước, tích hợp sâu với hệ sinh thái WeChat | Dự án hướng tới người dùng trong nước, cần hỗ trợ WeChat Mini Program | Có gói miễn phí |
| **Vercel** | Hỗ trợ tốt cho framework frontend, tích hợp chặt chẽ với GitHub | Dự án frontend hiện đại như React/Vue/Next.js | Có gói miễn phí |
| **Netlify** | Chức năng toàn diện, hỗ trợ xử lý biểu mẫu và xác thực, tích hợp tốt với Git | Trang web tĩnh cần xử lý biểu mẫu, xác thực và các tính năng nâng cao | Có gói miễn phí |
| **Zeabur** | Hỗ trợ nhiều ngôn ngữ và mẫu dịch vụ, cấu hình linh hoạt | Dự án phức tạp cần triển khai nhiều dịch vụ (như Dify, n8n) | Khoảng 5 USD miễn phí mỗi tháng |

---

# 1. Tencent CloudBase

Tencent CloudBase (Phát triển đám mây) là dịch vụ backend đám mây một cửa do Tencent Cloud cung cấp, đặc biệt phù hợp cho nhà phát triển trong nước. Ưu điểm của nó bao gồm:

- **Truy cập nhanh trong nước**: Máy chủ đặt trong nước, độ trễ truy cập thấp
- **Tích hợp hệ sinh thái WeChat**: Có thể dễ dàng kết nối với WeChat Mini Program, Official Account
- **Giải pháp một cửa**: Cung cấp dịch vụ đầy đủ bao gồm lưu trữ trang web tĩnh, hàm đám mây, cơ sở dữ liệu, lưu trữ, v.v.
- **Gói miễn phí dồi dào**: Nhà phát triển cá nhân có đủ tài nguyên miễn phí

## Sử dụng CloudBase để triển khai ứng dụng Web

### Bước 1: Đăng ký và đăng nhập

Truy cập [Tencent CloudBase Console](https://console.cloud.tencent.com/tcb), đăng nhập bằng WeChat hoặc QQ.

### Bước 2: Tạo môi trường

Nhấp vào "Tạo môi trường mới", chọn tên môi trường (ví dụ `my-web-app`).

> **Lưu ý**: Phiên bản dùng thử miễn phí của CloudBase cần mã đổi để kích hoạt. Bạn cần theo dõi tài khoản công cộng Tencent CloudBase, nhập "nhận mã đổi" trong tài khoản công cộng để lấy mã đổi phiên bản dùng thử miễn phí, sau đó điền mã đổi khi tạo môi trường để kích hoạt môi trường miễn phí (thời gian dùng thử miễn phí là 6 tháng).

### Bước 3: Kích hoạt lưu trữ trang web tĩnh

Trong trang quản lý môi trường, tìm chức năng "Lưu trữ trang web tĩnh" và kích hoạt. Sau khi kích hoạt, bạn sẽ nhận được một tên miền truy cập mặc định.

Lưu trữ trang web tĩnh của CloudBase cung cấp nhiều phương pháp triển khai, tương tự như Zeabur:

- **Tải dự án cục bộ lên**: Tải trực tiếp các tệp tĩnh đã xây dựng (HTML, CSS, JS, v.v.) từ máy cục bộ
- **Triển khai bằng mẫu**: Sử dụng các mẫu có sẵn để tạo dự án nhanh chóng, như mẫu ứng dụng React Web, mẫu ứng dụng Vue Web
- **Triển khai từ kho Git**: Hỗ trợ tự động lấy mã từ các kho mã như GitHub và triển khai

### Bước 4: Triển khai mã

Trong trang lưu trữ trang web tĩnh, CloudBase cung cấp ba phương pháp triển khai:

**Phương pháp 1: Triển khai dự án cục bộ (Tải dự án cục bộ lên)**
- Chọn "Triển khai dự án cục bộ" trong bảng điều khiển
- Tải trực tiếp các tệp tĩnh đã xây dựng (HTML, CSS, JS, v.v.)
- Chọn thư mục dự án đã xây dựng trên máy (như thư mục `dist` hoặc `build`)
- Đợi tải lên hoàn tất để truy cập

**Phương pháp 2: Triển khai bằng mẫu**
- Sử dụng các mẫu có sẵn để tạo dự án nhanh chóng
- Hỗ trợ mẫu ứng dụng React Web, mẫu ứng dụng Vue Web, v.v.
- Xây dựng và triển khai tự động dựa trên mẫu

**Phương pháp 3: Triển khai từ kho Git**
- **Triển khai kho cá nhân Git**: Liên kết kho mã GitHub cá nhân của bạn
- **Triển khai kho công khai**: Hỗ trợ lấy mã từ kho Git công khai
- Cấu hình lệnh xây dựng tự động (như `npm run build`)
- Mỗi lần đẩy mã sẽ tự động triển khai lại

> **Mẹo**: Bạn cũng có thể sử dụng công cụ CLI để triển khai:
> ```bash
> # Cài đặt CloudBase CLI
> npm install -g @cloudbase/cli
> # Đăng nhập
> tcb login
> # Triển khai
> tcb hosting deploy ./dist -e your-env-id
> ```

### Bước 5: Cấu hình tên miền tùy chỉnh (tùy chọn)

Trong cài đặt lưu trữ trang web tĩnh, bạn có thể liên kết tên miền riêng của mình và xin chứng chỉ HTTPS miễn phí.

---

# 2. Vercel

Vercel là một trong những nền tảng triển khai frontend phổ biến nhất thế giới, đặc biệt phù hợp để triển khai các dự án sử dụng React, Vue, Next.js và các framework frontend hiện đại khác. Đặc điểm của nó bao gồm:

- **Tích hợp sâu với GitHub**: Đẩy mã là tự động triển khai
- **Xem trước tự động**: Mỗi Pull Request sẽ tạo một liên kết xem trước độc lập
- **CDN toàn cầu**: Trang web tự động phân phối đến các nút toàn cầu, tốc độ truy cập nhanh
- **Hàm Serverless**: Hỗ trợ viết API backend trong dự án

> **Lưu ý**: Vercel có thể truy cập không ổn định trong một số môi trường mạng, người dùng trong nước nên ưu tiên CloudBase.

## Sử dụng Vercel để triển khai ứng dụng Web

### Bước 1: Đăng ký tài khoản

Truy cập [Vercel chính thức](https://vercel.com), đăng nhập bằng tài khoản GitHub.

### Bước 2: Nhập dự án

1. Nhấp vào "Add New Project"
2. Chọn kho GitHub bạn muốn triển khai
3. Nếu không thấy kho bạn muốn, nhấp vào "Adjust GitHub App Permissions" để cấp quyền truy cập

### Bước 3: Cấu hình cài đặt xây dựng

Vercel sẽ tự động nhận dạng loại dự án và cấu hình lệnh xây dựng:

| Framework | Lệnh xây dựng | Thư mục đầu ra |
|------|----------|----------|
| React | `npm run build` | `build` |
| Vue | `npm run build` | `dist` |
| Next.js | `next build` | - |
| HTML thuần | - | Thư mục gốc dự án |

Nếu nhận dạng tự động không chính xác, bạn có thể sửa thủ công:
- **Build Command**: Lệnh xây dựng, ví dụ `npm run build`
- **Output Directory**: Thư mục đầu ra xây dựng, ví dụ `dist` hoặc `build`
- **Install Command**: Lệnh cài đặt dependency, thường là `npm install`

### Bước 4: Triển khai

Nhấp vào nút "Deploy", đợi xây dựng hoàn tất. Sau khi xây dựng thành công, bạn sẽ nhận được tên miền `xxx.vercel.app`.

### Bước 5: Tên miền tùy chỉnh (tùy chọn)

Trong trang "Domains" của cài đặt dự án, bạn có thể thêm tên miền riêng. Vercel sẽ tự động cấu hình HTTPS.

---

# 3. Netlify

Netlify là một nền tảng triển khai frontend rất phổ biến khác, tương tự như Vercel, đặc biệt phù hợp để triển khai trang web tĩnh và ứng dụng đơn trang (SPA). Đặc điểm của nó bao gồm:

- **Chức năng toàn diện**: Ngoài lưu trữ trang web tĩnh, còn hỗ trợ xử lý biểu mẫu, xác thực, hàm edge, v.v.
- **Tích hợp sâu với Git**: Hỗ trợ GitHub, GitLab, Bitbucket, đẩy mã là tự động triển khai
- **Xem trước theo nhánh**: Mỗi nhánh sẽ tự động tạo liên kết xem trước độc lập
- **CDN toàn cầu**: Trang web tự động phân phối đến các nút toàn cầu, tốc độ truy cập nhanh
- **Xử lý biểu mẫu**: Xử lý gửi biểu mẫu trang web mà không cần code backend
- **Xác thực**: Chức năng xác thực người dùng tích hợp, có thể nhanh chóng thực hiện đăng nhập/đăng ký

> **Lưu ý**: Tốc độ truy cập Netlify trong nước có thể không bằng CloudBase, nên sử dụng chủ yếu cho các dự án hướng tới người dùng ở nước ngoài.

## Sử dụng Netlify để triển khai ứng dụng Web

### Bước 1: Đăng ký tài khoản

Truy cập [Netlify chính thức](https://www.netlify.com), nhấp vào "Sign up" để đăng ký. Bạn có thể sử dụng GitHub, GitLab, Bitbucket hoặc email để đăng ký.

### Bước 2: Nhập dự án

1. Sau khi đăng nhập, nhấp vào "Add new site" -> "Import an existing project"
2. Chọn nền tảng lưu trữ mã của bạn (ví dụ GitHub)
3. Cấp quyền cho Netlify truy cập kho của bạn
4. Chọn kho bạn muốn triển khai từ danh sách

### Bước 3: Cấu hình cài đặt xây dựng

Netlify sẽ tự động nhận dạng các framework frontend phổ biến và cấu hình cài đặt xây dựng:

| Framework | Lệnh xây dựng | Thư mục xuất bản |
|------|----------|----------|
| React | `npm run build` | `build` |
| Vue | `npm run build` | `dist` |
| Angular | `ng build` | `dist/<project-name>` |
| Next.js | `next build` | `out` |
| HTML thuần | - | `.` (thư mục gốc dự án) |

Nếu nhận dạng tự động không chính xác, bạn có thể cấu hình thủ công:
- **Build command**: Lệnh xây dựng, ví dụ `npm run build`
- **Publish directory**: Thư mục đầu ra xây dựng, ví dụ `dist` hoặc `build`

### Bước 4: Triển khai

Nhấp vào nút "Deploy site", đợi xây dựng hoàn tất. Sau khi xây dựng thành công, bạn sẽ nhận được tên miền `xxx.netlify.app`, bất kỳ ai cũng có thể truy cập trang web của bạn qua địa chỉ này.

### Bước 5: Cấu hình tên miền tùy chỉnh (tùy chọn)

1. Vào cài đặt trang, nhấp vào "Domain management"
2. Nhấp vào "Add custom domain"
3. Nhập tên miền của bạn và làm theo hướng dẫn cấu hình bản ghi DNS
4. Netlify sẽ tự động xin và cấu hình chứng chỉ HTTPS

### Tính năng đặc biệt

#### 1. Xử lý biểu mẫu

Netlify cung cấp một tính năng rất tiện lợi: xử lý gửi biểu mẫu mà không cần code backend.

Chỉ cần thêm thuộc tính `netlify` vào biểu mẫu HTML:

```html
<form name="contact" netlify>
  <p>
    <label>Họ tên: <input type="text" name="name" /></label>
  </p>
  <p>
    <label>Email: <input type="email" name="email" /></label>
  </p>
  <p>
    <label>Tin nhắn: <textarea name="message"></textarea></label>
  </p>
  <p>
    <button type="submit">Gửi</button>
  </p>
</form>
```

Sau khi triển khai, dữ liệu gửi biểu mẫu sẽ tự động được gửi đến bảng điều khiển Netlify, bạn có thể xem tất cả bản ghi đã gửi trong trang "Forms", cũng có thể thiết lập thông báo email hoặc chuyển tiếp dữ liệu đến dịch vụ khác.

#### 2. Netlify Functions (hàm edge)

Netlify hỗ trợ triển khai hàm Serverless, cho phép bạn thực hiện các API đơn giản mà không cần xây dựng máy chủ backend đầy đủ. Bạn có thể viết hàm bằng JavaScript hoặc TypeScript, sau khi triển khai sẽ tự động nhận được một URL có thể truy cập.

Ví dụ, tạo một tệp `hello.js`:

```javascript
exports.handler = async (event, context) => {
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Hello from Netlify!" })
  };
};
```

Sau khi triển khai, bạn có thể truy cập hàm này qua `https://your-domain/.netlify/functions/hello`.

#### 3. Hỗ trợ phát triển cục bộ

Netlify cung cấp công cụ CLI, giúp bạn phát triển và kiểm tra tại máy cục bộ:

```bash
# Cài đặt Netlify CLI
npm install -g netlify-cli

# Đăng nhập tài khoản
netlify login

# Khởi động máy chủ phát triển cục bộ
netlify dev

# Kiểm tra hàm cục bộ
netlify functions:serve
```

Sử dụng công cụ CLI có thể mô phỏng môi trường Netlify tại máy cục bộ, bao gồm gửi biểu mẫu, gọi hàm, v.v., giúp kiểm tra trước khi triển khai.

---

# 4. Zeabur

Zeabur là một nền tảng triển khai mới nổi, đặc biệt phù hợp cho các dự án phức tạp cần triển khai nhiều dịch vụ. Ưu điểm của nó bao gồm:

- **Mẫu dịch vụ phong phú**: Tích hợp sẵn nhiều mẫu dịch vụ như Dify, n8n, cơ sở dữ liệu, v.v.
- **Hỗ trợ nhiều phương pháp triển khai**: GitHub, mẫu, Docker image, dự án cục bộ, v.v.
- **Kết hợp dịch vụ linh hoạt**: Có thể triển khai nhiều dịch vụ liên quan nhau trong một dự án
- **Tính phí theo lượng sử dụng**: Trả bao nhiêu dùng bấy nhiêu, phù hợp cho dự án thử nghiệm

## Sử dụng Zeabur để triển khai Dify

Trong các khóa học trước, chúng ta đã tiếp xúc đơn giản với Dify. Bây giờ, chúng ta có thể khởi động dịch vụ Dify riêng rất dễ dàng thông qua [Zeabur](https://zeabur.com/projects). Đầu tiên, mở [trang bảng điều khiển](https://zeabur.com/projects), hãy xem các khu vực trên trang.

![](/zh-cn/stage-2/backend/zeabur-deployment/images/image5.webp)

Trên trang này, điều đầu tiên bạn thấy là nhiều ô vuông, đây là các dịch vụ đã được khởi động. Trong menu phía trên, bạn sẽ thấy các tùy chọn Agent, Servers, Docs, Templates, chúng lần lượt đại diện cho:

1. **Agent**: Có thể mở trợ lý thông minh (Agent) tích hợp sẵn của Zeabur, hỏi nó cách thao tác, hoặc truy vấn trạng thái máy chủ hiện tại.
2. **Servers**: Ở đây bạn có thể thêm máy chủ đám mây đã mua, hoặc mua máy chủ trực tiếp qua Zeabur.
3. **Docs**: Xem tài liệu hướng dẫn đầy đủ của Zeabur.
4. **Templates**: Liệt kê tất cả các mẫu image tích hợp sẵn.

> "Image" (ảnh) được đề cập ở đây có thể hiểu là "gói nén chứa mã và môi trường chạy". Khi một dịch vụ đã chạy thành công trên một máy chủ, chúng ta có thể chọn đóng gói "môi trường chạy + mã" thành image. Sau đó, trên bất kỳ máy chủ mới nào, chỉ cần giải nén và chạy gói này, không cần cấu hình lại môi trường và mã, dịch vụ có thể chạy ngay.

Ở góc phải phía trên trang, bạn cũng có thể thấy số dư của mình. Theo mặc định, mỗi tháng sẽ có khoảng 5 USD miễn phí. Về quy tắc tính phí chi tiết, bạn có thể tạm thời không cần quan tâm quá nhiều, chỉ cần biết: miễn là máy chủ đang chạy, sẽ tiêu tốn额度.

![](/zh-cn/stage-2/backend/zeabur-deployment/images/image6.png)

Nhấp vào số dư để xem chi tiết tiêu thụ hàng ngày.

![](/zh-cn/stage-2/backend/zeabur-deployment/images/image7.png)

Bây giờ chúng ta sẽ tạo dịch vụ Dify riêng. Đầu tiên, tại [trang chủ bảng điều khiển](https://zeabur.com/projects), nhấp vào "New Project".

![](/zh-cn/stage-2/backend/zeabur-deployment/images/image8.png)

Tiếp theo là giải thích về các phương pháp tạo:

1. **GitHub**
   Có thể kết nối với tài khoản GitHub của bạn. Sau khi liên kết, bạn có thể chọn trực tiếp dự án từ kho GitHub để triển khai (GitHub là nền tảng lưu trữ mã lớn nhất thế giới hiện nay).
2. **Template (mẫu)**
   Có thể triển khai dịch vụ dựa trên mẫu. Zeabur tích hợp nhiều mẫu dự án có sẵn (ví dụ Dify, n8n, v.v.), bạn có thể tạo và triển khai ứng dụng nhanh chóng dựa trên các mẫu này.
   ![](/zh-cn/stage-2/backend/zeabur-deployment/images/image9.png)
3. **Databases (cơ sở dữ liệu)**
   Dùng để triển khai dịch vụ cơ sở dữ liệu, như MySQL, MongoDB và các cơ sở dữ liệu phổ biến khác.
   ![](/zh-cn/stage-2/backend/zeabur-deployment/images/image10.png)
4. **Functions (hàm)**
   Có thể triển khai dịch vụ hàm, bạn có thể viết mã JavaScript hoặc Python, để chúng được gọi dưới dạng hàm.
   ![](/zh-cn/stage-2/backend/zeabur-deployment/images/image11.png)

   ![](/zh-cn/stage-2/backend/zeabur-deployment/images/image12.png)

5. **Local Project (dự án cục bộ)**
   Tải lên một thư mục cục bộ, Zeabur sẽ tự động nhận dạng script khởi động trong đó. Phù hợp để nhanh chóng triển khai dự án đã phát triển cục bộ lên Zeabur.
   ![](/zh-cn/stage-2/backend/zeabur-deployment/images/image13.png)
6. **Docker Image**
   Triển khai Docker image đã đóng gói. Nếu dự án của bạn đã được đóng gói thành Docker image (ví dụ lưu trữ trên Docker Hub hoặc kho image khác), có thể triển khai trực tiếp tại đây.
   ![](/zh-cn/stage-2/backend/zeabur-deployment/images/image14.png)
7. **Cursor**
   Nếu bạn đã cài đặt Cursor (ví dụ Cursor IDE), có thể triển khai trực tiếp dự án trong Cursor lên Zeabur qua cổng này.

Nếu bạn muốn triển khai dịch vụ Dify riêng, nên chọn phương thức **Template**, sau đó nhập "dify" vào ô tìm kiếm. Bạn sẽ thấy nhiều phiên bản do các tác giả khác nhau bảo trì, có thể chọn bất kỳ phiên bản nào (ví dụ phiên bản v1.6.0).

![](/zh-cn/stage-2/backend/zeabur-deployment/images/image15.png)

Tiếp theo, nhập bất kỳ tên nào, Zeabur sẽ tạo một tên miền tùy chỉnh tạm thời dựa trên tên này. Sau đó tất cả mọi người đều có thể truy cập dịch vụ của bạn qua địa chỉ web này.

![](/zh-cn/stage-2/backend/zeabur-deployment/images/image16.png)

Sau khi tạo xong, bạn sẽ thấy nhiều chương trình (dịch vụ) khởi động lần lượt. Cần kiên nhẫn đợi tất cả dịch vụ vào trạng thái "đã khởi động". (Dịch vụ Dify được cấu thành từ nhiều chương trình, mỗi chương trình chịu trách nhiệm các chức năng khác nhau, chúng sẽ phối hợp với nhau.)

Thông thường, bạn chỉ cần nhấp vào ứng dụng Dify bên trái để xem địa chỉ truy cập mặc định. Nhưng trong ví dụ này, vì phía trước còn có một lớp nginx, bạn cần nhấp vào dịch vụ nginx để lấy địa chỉ truy cập cuối cùng. Có thể hiểu: nginx là chương trình chính chịu trách nhiệm "nhận và gửi yêu cầu" đối ngoại thống nhất, nó sẽ phân phối địa chỉ truy cập bên ngoài cho các dịch vụ nội bộ khác. Nhấp vào Nginx bên trái, trong trang chi tiết bạn có thể thấy địa chỉ dịch vụ hiện tại, sau đó mở địa chỉ này trong trình duyệt, đợi dịch vụ khởi động hoàn toàn.

![](/zh-cn/stage-2/backend/zeabur-deployment/images/image17.png)

Sau khi đợi một lát, bạn sẽ thấy giao diện đăng nhập Dify. Nhập địa chỉ email và mật khẩu đăng ký, bạn có thể bắt đầu sử dụng dịch vụ Dify riêng của mình.

![](/zh-cn/stage-2/backend/zeabur-deployment/images/image18.png)

Nếu bạn quan tâm, bạn cũng có thể khởi động dịch vụ n8n. n8n cũng là một nền tảng quy trình làm việc AI rất phổ biến ở nước ngoài.

![](/zh-cn/stage-2/backend/zeabur-deployment/images/image19.png)![](/zh-cn/stage-2/backend/zeabur-deployment/images/image20.webp)

## Sử dụng Zeabur và Trae để triển khai trò chơi rắn ăn mồi

Trong phần tiếp theo của hướng dẫn này, chúng ta sẽ trải nghiệm một số cách sử dụng nâng cao của Zeabur. Đầu tiên, chúng ta sẽ dùng Trae để tạo một trò chơi rắn ăn mồi nhỏ, sau đó triển khai nó lên máy chủ Zeabur, và cấu hình một liên kết có thể truy cập công khai, để bất kỳ ai cũng có thể mở trò chơi của bạn.

Bước đầu tiên là tạo một dự án rắn ăn mồi bằng Trae tại máy cục bộ.

### Sử dụng framework HTML

![](/zh-cn/stage-2/backend/zeabur-deployment/images/image23.webp)

Đối với Trae, việc tạo một trò chơi web rắn ăn mồi dựa trên HTML rất đơn giản. Sau khi trò chơi được tạo, bạn chỉ cần tải thư mục chứa tất cả các tệp lên theo cách triển khai cục bộ Zeabur đã giới thiệu trước đó.

![](/zh-cn/stage-2/backend/zeabur-deployment/images/image24.png)![](/zh-cn/stage-2/backend/zeabur-deployment/images/image25.png)![](/zh-cn/stage-2/backend/zeabur-deployment/images/image26.png)

Sau khi hoàn tất, bạn sẽ vào giao diện chi tiết của dịch vụ:

![](/zh-cn/stage-2/backend/zeabur-deployment/images/image27.webp)

Nhấp vào tùy chọn "Network" bên trái, tìm khu vực "Public Address" trong trang. Nhấp vào "Generate Domain", có thể tạo một địa chỉ truy cập đối ngoại, bạn có thể nhập bất kỳ tên nào bạn thích.

![](/zh-cn/stage-2/backend/zeabur-deployment/images/image28.png)

![](/zh-cn/stage-2/backend/zeabur-deployment/images/image29.png)

Sau khi tạo xong, chỉ cần mở địa chỉ này trong trình duyệt, bạn có thể chạy trò chơi rắn ăn mồi của riêng mình. Các ứng dụng Web kiểu HTML khác cũng có thể được triển khai theo cùng một cách.

![](/zh-cn/stage-2/backend/zeabur-deployment/images/image30.png)

### Sử dụng framework React

Trước đó chúng ta đã học cách triển khai ứng dụng Web dựa trên HTML. Tiếp theo, chúng ta sẽ thử triển khai một framework frontend phổ biến hơn hiện nay: ứng dụng React. So với HTML thuần, React được coi là một framework phát triển frontend trưởng thành và hiện đại hơn. Nó tổ chức cấu trúc trang theo cách component hóa, có thể tăng tốc độ phát triển trang phức tạp đáng kể, là lựa chọn rất phổ biến trong các dự án cấp doanh nghiệp.

![](/zh-cn/stage-2/backend/zeabur-deployment/images/image31.webp)

#### Tái cấu trúc thành kiến trúc React

Trong Trae, bạn chỉ cần nói với Agent: "Hãy giúp tôi tái cấu trúc mã này thành kiến trúc React", là có thể khá dễ dàng chuyển đổi cấu trúc dựa HTML thành dự án React.

![](/zh-cn/stage-2/backend/zeabur-deployment/images/image32.webp)

Tuy nhiên, so với tệp HTML đơn giản, ứng dụng React phụ thuộc vào công cụ xây dựng và cấu trúc dự án phức tạp hơn, nên quá trình triển khai cũng sẽ hơi phức tạp hơn một chút. Một vấn đề điển hình thể hiện ở cài đặt cổng: theo mặc định, ứng dụng React thường lắng nghe cổng 3000 (bạn cũng có thể thấy điều này trong tệp cấu hình hoặc nhật ký khởi động).

Tuy nhiên, triển khai trên Zeabur như vậy sẽ thất bại -- vì Zeabur chỉ hỗ trợ ứng dụng lắng nghe cổng 8080. Nghĩa là, nếu muốn ứng dụng React chạy bình thường trên Zeabur, chúng ta phải thay đổi cổng lắng nghe mặc định từ 3000 thành 8080.

Để cấu hình đúng bước này, chúng ta cần làm rõ hai khái niệm trước: "cổng (Port)" là gì, và "cổng lắng nghe (Listening Port)" có nghĩa là gì.

#### Cổng là gì?

> Trong mạng máy tính, cổng có thể hiểu là một "điểm cuối giao tiếp logic", dùng để phân biệt các dịch vụ mạng khác nhau đang chạy trên cùng một thiết bị. Nếu ví địa chỉ IP như một "số nhà" (ví dụ 162.128.1.1), thì số cổng giống như "số phòng" của các phòng khác nhau trong tòa nhà đó -- mỗi phòng tương ứng với một dịch vụ (ví dụ máy chủ Web, dịch vụ email, hoặc ứng dụng React của bạn).
>
> Số cổng được biểu diễn bằng số nguyên 16 bit, phạm vi giá trị từ 0 đến 65535.

Nếu không muốn nhớ các chi tiết này, có thể hiểu đơn giản: cổng là một phần cần thiết cấu thành "địa chỉ truy cập mạng".

Khi chúng ta truy cập trang web hoặc địa chỉ IP, thường không tự thêm số cổng, là vì cổng mặc định của Web là 80 hoặc 443 (HTTPS). Hầu hết trình duyệt sẽ tự động sử dụng các cổng tiêu chuẩn này. Đối với một số cổng đặc biệt, như cổng 3000 mặc định của React, cổng 8080 yêu cầu của Zeabur, chúng ta phải thêm `:3000` hoặc `:8080` sau địa chỉ để truy cập nội dung tương ứng.

#### "Cổng lắng nghe" là gì?

> "Cổng lắng nghe" là cổng mà một chương trình chủ động "mở và giám sát" trên một thiết bị. Khi một ứng dụng đặt cổng lắng nghe, thực chất là đang nói với hệ điều hành: "Tôi sẽ luôn đợi yêu cầu mạng trên cổng này -- miễn là có yêu cầu đến, xin hãy chuyển tiếp cho tôi."

Hiểu theo cách hình tượng hơn: giả sử máy tính của bạn là một tòa nhà văn phòng, địa chỉ IP là địa chỉ của tòa nhà. Trong tòa nhà có nhiều công ty hoặc phòng ban, chúng chiếm các phòng khác nhau, số phòng chính là số cổng.

Khi máy chủ phát triển React mặc định khởi động, nó sẽ "mở" cửa một phòng nào đó, và bố trí "lễ tân" trực tại cửa, số phòng này chính là cổng lắng nghe của nó -- 3000.

Đồng thời, chương trình React cũng sẽ nói với "quản lý tài sản" (hệ điều hành) của tòa nhà: "Tôi ở phòng 3000, xin hãy chuyển tất cả thư gửi đến phòng 3000 (yêu cầu mạng) cho tôi."

Như vậy, khi bạn truy cập trang web React, yêu cầu đầu tiên sẽ đến tòa nhà; quản lý thấy yêu cầu cần gửi đến phòng 3000, sẽ ngay lập tức chuyển yêu cầu cho "lễ tân" của React, do nó xử lý và trả kết quả -- đây là quá trình truy cập ứng dụng React.

Khi bạn thực thi `npm start` tại máy cục bộ (lệnh mặc định để khởi động máy chủ phát triển React cục bộ, cũng có thể thực thi trong thanh bên Agent của Vibe Coding), máy chủ phát triển React sẽ tự động đặt cổng lắng nghe thành 3000.
Thiết kế nền tảng Zeabur quyết định nó chỉ sẽ "nhận dạng" ứng dụng lắng nghe cổng 8080. Nếu ứng dụng React của bạn vẫn sử dụng cổng 3000 mặc định, Zeabur sẽ không thể chuyển tiếp yêu cầu chính xác đến ứng dụng của bạn, cuối cùng dẫn đến triển khai thất bại.

#### Thay đổi cổng lắng nghe mặc định

Để thay đổi cổng lắng nghe mặc định của React (3000) thành 8080 như Zeabur yêu cầu, có nhiều cách. Cách đơn giản nhất là trực tiếp ra lệnh cho Agent trong Trae: "Hãy giúp tôi thay đổi cổng mặc định của dự án React này thành 8080." Trae sẽ giúp bạn sửa tệp cấu hình tương ứng trong dự án. Sau khi sửa xong, bạn chỉ cần đóng gói lại và tải lên Zeabur theo cách trước đó.

![](/zh-cn/stage-2/backend/zeabur-deployment/images/image33.webp)

![](/zh-cn/stage-2/backend/zeabur-deployment/images/image34.png)

Trong cài đặt mạng, chỉ định một URL truy cập, cách làm về cơ bản giống với khi triển khai dự án HTML, là có thể khởi động dịch vụ phiên bản React.

![](/zh-cn/stage-2/backend/zeabur-deployment/images/image35.webp)

![](/zh-cn/stage-2/backend/zeabur-deployment/images/image36.png)

Đối với các chương trình khác cần thay đổi số cổng, bạn cũng có thể áp dụng cùng một cách tiếp cận: thay cổng mặc định trước, sau đó tải lên Zeabur để triển khai. Đến đây, bạn đã nắm vững kỹ năng cơ bản để triển khai ứng dụng Web phổ biến lên máy chủ.

Bạn có thể thử để Trae giúp bạn xây dựng các ứng dụng loại khác nhau, và triển khai chúng lên máy chủ mặc định của Zeabur. Trong các bài học tiếp theo, chúng ta sẽ học cách triển khai ứng dụng lên máy chủ đám mây do chính bạn mua.

---

# Cách dừng và xóa dự án (Zeabur)

Vì việc kích hoạt tài nguyên liên quan đến máy chủ sẽ phát sinh chi phí, chúng ta phải hình thành thói quen "đóng dịch vụ không sử dụng kịp thời" khi sử dụng, tránh tiêu hết gói miễn phí hàng tháng.

Nếu muốn tìm cổng quản lý dự án, đầu tiên nhấp vào "Settings" trong dự án.

![](/zh-cn/stage-2/backend/zeabur-deployment/images/image21.webp)

Sau khi vào trang cài đặt, kéo trang xuống dưới cùng, bạn sẽ thấy giao diện tương tự:

![](/zh-cn/stage-2/backend/zeabur-deployment/images/image22.png)

Bạn có thể nhấp vào "Suspend All Services" để tạm dừng tất cả dịch vụ nhằm giảm chi phí; nếu dịch vụ gặp vấn đề, có thể nhấp vào "Restart All Services" để khởi động lại tất cả dịch vụ. Nếu bạn chắc chắn không cần dự án này nữa, có thể nhấp vào "Delete Project" để xóa hoàn toàn dự án.

---

# Tổng kết

Trong hướng dẫn này, chúng tôi đã giới thiệu bốn nền tảng triển khai ứng dụng Web phổ biến:

1. **Tencent CloudBase**: Phù hợp cho người dùng trong nước, tốc độ truy cập nhanh, tích hợp tốt với hệ sinh thái WeChat
2. **Vercel**: Phù hợp cho dự án sử dụng framework frontend hiện đại, tích hợp chặt chẽ với GitHub, CDN toàn cầu
3. **Netlify**: Chức năng toàn diện, hỗ trợ xử lý biểu mẫu và xác thực, phù hợp cho trang web tĩnh cần tính năng nâng cao
4. **Zeabur**: Phù hợp cho dự án phức tạp, mẫu dịch vụ phong phú, hỗ trợ nhiều phương pháp triển khai

Chọn nền tảng nào phụ thuộc vào nhu cầu cụ thể của bạn:
- Nếu chủ yếu hướng tới người dùng trong nước, nên chọn **CloudBase**
- Nếu sử dụng React/Next.js và các framework, nên chọn **Vercel** hoặc **Netlify**
- Nếu cần xử lý biểu mẫu, xác thực và các tính năng nâng cao, nên chọn **Netlify**
- Nếu cần triển khai Dify, n8n và các dịch vụ khác, nên chọn **Zeabur**

Bất kể chọn nền tảng nào, quy trình cốt lõi của triển khai đều tương tự: chuẩn bị mã -> chọn nền tảng -> cấu hình cài đặt xây dựng -> triển khai lên mạng. Sau khi nắm vững các kỹ năng này, bạn có thể chia sẻ ứng dụng đã phát triển với cả thế giới!
