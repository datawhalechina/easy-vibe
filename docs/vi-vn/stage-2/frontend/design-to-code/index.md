# Từ nguyên mẫu thiết kế đến code dự án

::: tip 🎯 Vấn đề cốt lõi
**Làm thế nào để chuyển nguyên mẫu từ công cụ thiết kế thành code frontend thực sự có thể chạy trong trình duyệt?**
:::

---

## 1. Ba con đường từ nguyên mẫu đến code

Sau khi hoàn thành thiết kế giao diện bằng các công cụ thiết kế frontend hiện đại như Figma, MasterGo, một câu hỏi rất thực tế tự nhiên xuất hiện: làm thế nào để chuyển những bản thiết kế có cấu trúc hoàn chỉnh này thành code frontend thực sự có thể chạy trong trình duyệt?

Nói chung, việc chuyển từ nguyên mẫu đến code có ba con đường điển hình:

| Con đường | Phương pháp | Đặc điểm | Kịch bản phù hợp |
|-----------|-------------|----------|------------------|
| **Con đường 1** | Dựa trên hình ảnh, sử dụng mô hình đa phương thức lớn để trực tiếp khôi phục code | Linh hoạt, không cần công cụ cụ thể | Xác minh nguyên mẫu nhanh, trang đơn giản |
| **Con đường 2** | Xuất code sử dụng được thông qua khả năng của nền tảng hoặc plugin | Độ khôi phục cao, khả năng chỉnh sửa mạnh | Người dùng Figma/MasterGo |
| **Con đường 3** | Nền tảng kết hợp khả năng MCP để xuất code sử dụng được | Mức độ tự động hóa cao, có thể tùy chỉnh | Quy trình làm việc cần tích hợp sâu |

Bài viết này sẽ giới thiệu chi tiết phương pháp thực hiện cụ thể của ba con đường này, giúp bạn chọn quy trình làm việc phù hợp nhất theo nhu cầu dự án.

::: tip 📚 Kiến thức tiên quyết
Trước khi bắt đầu phần này, khuyến nghị bạn học trước hướng dẫn [Giới thiệu Figma và MasterGo](../figma-mastergo/), nắm vững các thao tác cơ bản của công cụ thiết kế frontend.
:::

---

## 2. Con đường 1: AI đa phương thức trực tiếp khôi phục code

Các mô hình_large có khả năng thị giác vốn sẵn có khả năng chuyển ảnh thành code. Chúng ta chỉ cần import screenshot bản thiết kế trực tiếp vào hộp thoại, sau đó để mô hình_large tạo code kết quả hoàn chỉnh.

### 2.1 Quy trình thao tác

1. **Chụp screenshot bản thiết kế**
   - Trong Figma hoặc MasterGo, xuất trang đã thiết kế thành PNG hoặc JPG
   - Đảm bảo screenshot bao gồm bố cục trang hoàn chỉnh

2. **Chọn mô hình AI đa phương thức**
   - Có thể sử dụng các mô hình hỗ trợ đầu vào hình ảnh như Gemini, Qwen, Claude
   - Ở đây lấy Gemini làm ví dụ demo

3. **Viết prompt**
   ```
   Xin tạo code HTML/CSS tương ứng dựa trên bản thiết kế này.
   Yêu cầu:
   - Sử dụng layout CSS hiện đại (Flexbox/Grid)
   - Responsive design, thích ứng các kích thước màn hình khác nhau
   - Bao gồm tất cả các yếu tố UI nhìn thấy được
   - Màu sắc, kích thước font cố gắng khôi phục theo bản thiết kế
   ```

![](/zh-cn/stage-2/frontend/design-to-code/images/image42.png)

4. **Lấy và lưu code**
   - Yêu cầu mô hình trả về code HTML hoàn chỉnh
   - Lưu thành file `.html` đơn lẻ, thuận tiện kiểm thử cục bộ
   - Sau đó có thể chuyển đổi thành các framework như React trong IDE cục bộ

### 2.2 Các vấn đề phổ biến và giải pháp

Tạo trang không phải là nhiệm vụ đơn giản, trong quá trình cụ thể bạn có thể gặp nhiều vấn đề:

| Vấn đề | Giải pháp |
|---------|-----------|
| Bố cục giao diện không đều | Mô tả vấn đề bố cục cụ thể cho AI, yêu cầu điều chỉnh CSS margin/padding |
| Giao diện hiển thị không đầy đủ | Kiểm tra xem đã đặt viewport đúng chưa, yêu cầu thêm responsive breakpoint |
| Màu sắc khôi phục không chính xác | Sử dụng công cụ lấy màu để lấy giá trị màu chính xác từ bản thiết kế, cung cấp cho AI |
| Font không khớp | Chỉ định tên font cụ thể hoặc yêu cầu sử dụng Google Fonts thay thế |

::: tip 💡 Mẹo nhỏ
Khuyến nghị tạo code HTML trước, sau khi nhận được thì sử dụng IDE cục bộ để chuyển đổi thành framework React. Bằng cách này bạn có thể nhận được nhiều file HTML độc lập, tiến hành chuyển đổi framework thống nhất.
:::

### 2.3 MasterGo AI tạo trang

MasterGo cũng cung cấp chức năng tạo trang AI mạnh mẽ, có thể trực tiếp tạo code trang web sử dụng được dựa trên ảnh tham khảo.

#### Tìm lối vào chức năng AI

Trong thanh công cụ phía trên giao diện chỉnh sửa MasterGo, bạn có thể tìm thấy nút công cụ AI:

![](/zh-cn/stage-2/frontend/design-to-code/images/image47.png)

#### Quy trình tạo

1. **Tải lên ảnh tham khảo**
   - Sử dụng cùng cách với AI đa phương thức để tải lên ảnh tham khảo thiết kế
   - Thêm mô tả văn bản yêu cầu

2. **Xem kết quả tạo**

![](/zh-cn/stage-2/frontend/design-to-code/images/image48.webp)

![](/zh-cn/stage-2/frontend/design-to-code/images/image49.webp)

3. **Lấy code**
   - Nhấp nút xanh "Chèn vào canvas", có thể trực tiếp chỉnh sửa trang web sau khi tạo
   - Hoặc nhấp nút "Code" bên phải, sao chép nội dung code về cục bộ

![](/zh-cn/stage-2/frontend/design-to-code/images/image50.png)

---

## 3. Con đường 2: Khả năng của nền tảng hoặc plugin xuất code

### 3.1 Figma Make tạo code

Figma Make là công cụ thiết kế AI chính thức do Figma ra mắt, có thể dựa trên prompt do người dùng nhập hoặc ảnh tham khảo, khôi phục giao diện UI nguyên mẫu trang web với độ chính xác cao.

#### Đặc điểm chức năng

- **Khôi phục độ chính xác cao**: So với code tạo bằng AI gốc, hiệu quả tốt hơn
- **Khả năng chỉnh sửa**: Kết quả tạo có thể chuyển đổi thành file Figma Design có thể chỉnh sửa
- **Tích hợp GitHub**: Hỗ trợ đồng bộ code trực tiếp lên GitHub

::: tip 🔑 Mô tả quyền
Sử dụng đầy đủ chức năng Figma Make cần quyền người dùng Pro, sinh viên có thể nhận miễn phí quyền Pro thông qua xác thực giáo dục.
:::

#### Các bước thao tác

1. **Vào Figma Make**
   - Nhấp nút Make trên trang chủ Figma
   - Hoặc truy cập [Figma Make](https://www.figma.com/make)

2. **Tải lên ảnh tham khảo**
   - Tải bản thiết kế bạn muốn khôi phục vào hộp thoại
   - Thêm prompt mô tả yêu cầu

![](/zh-cn/stage-2/frontend/design-to-code/images/image43.webp)

3. **Xem kết quả tạo**
   - Đợi một lúc sẽ thấy kết quả render
   - Nhấp nút play ở góc trên bên phải để xem trước toàn màn hình

![](/zh-cn/stage-2/frontend/design-to-code/images/image44.webp)

4. **Điều chỉnh chi tiết**
   - Nhấp icon editor ở góc trên bên phải (icon chuột và thước)
   - Quay lại giao diện Figma Editor quen thuộc để điều chỉnh chi tiết

![](/zh-cn/stage-2/frontend/design-to-code/images/image45.webp)

5. **Xuất code**
   - Sau khi điều chỉnh hài lòng, chọn xuất code
   - Có thể kết nối trực tiếp với GitHub để lưu code

![](/zh-cn/stage-2/frontend/design-to-code/images/image46.png)

### 3.2 Plugin xuất code

Ngoài chức năng AI gốc của nền tảng, cả Figma và MasterGo đều hỗ trợ xuất code thông qua plugin:

**Plugin Figma phổ biến:**
- **Figma to Code**: Chuyển bản thiết kế thành code React, Vue, HTML, v.v.
- **Anima**: Tạo code high-fidelity, hỗ trợ hiệu ứng tương tác
- **Locofy**: Công cụ chuyển thiết kế thành code do AI điều khiển

**Các bước sử dụng:**
1. Mở bảng plugin trong Figma (Plugins)
2. Tìm kiếm và cài đặt plugin xuất code cần thiết
3. Chọn yếu tố thiết kế cần xuất
4. Chạy plugin, chọn framework mục tiêu và định dạng code
5. Sao chép hoặc tải xuống code đã tạo

---

## 4. Con đường 3: Nền tảng kết hợp khả năng MCP xuất code

### 4.1 MCP là gì?

MCP (Model Context Protocol, Giao thức Bối cảnh Mô hình) là một giao thức tiêu chuẩn mở, cho phép mô hình AI truy cập an toàn và có kiểm soát vào các công cụ và nguồn dữ liệu bên ngoài. Trong kịch bản công cụ thiết kế frontend, MCP cho phép mô hình_large trực tiếp đọc cấu trúc, kiểu dáng và thông tin component của file thiết kế, từ đó tạo code chính xác hơn.

### 4.2 Nguyên lý hoạt động của MCP

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Mô hình AI  │ ←→  │  MCP Server  │ ←→  │  Công cụ thiết kế    │
│  (Claude, v.v.)  │     │  (Protocol adapter)  │     │(Figma/MasterGo)│
└─────────────┘     └─────────────┘     └─────────────┘
```

**Quy trình làm việc:**
1. Mô hình AI gửi yêu cầu đến công cụ thiết kế thông qua giao thức MCP
2. Công cụ thiết kế trả về dữ liệu thiết kế có cấu trúc (layer, style, component, v.v.)
3. Mô hình AI hiểu cấu trúc thiết kế và tạo code tương ứng
4. Code có thể xuất trực tiếp hoặc đồng bộ đến môi trường phát triển

### 4.3 Thực hành Figma + MCP

#### Chuẩn bị môi trường

1. **Cài đặt MCP Server**
   ```bash
   # Sử dụng npx cài đặt Figma MCP Server
   npx figma-mcp-server
   ```

2. **Cấu hình Claude Desktop hoặc công cụ AI hỗ trợ MCP khác**
   ```json
   {
     "mcpServers": {
       "figma": {
         "command": "npx",
         "args": ["figma-mcp-server"],
         "env": {
           "FIGMA_ACCESS_TOKEN": "your-figma-token"
         }
       }
     }
   }
   ```

3. **Lấy Figma Access Token**
   - Đăng nhập Figma → Settings → Personal Access Tokens
   - Tạo Token mới và lưu lại

#### Quy trình sử dụng

1. **Kích hoạt kết nối MCP trong công cụ AI**
   - Mở Claude Code hoặc IDE hỗ trợ MCP khác
   - Xác nhận MCP Server đã kết nối

2. **Cung cấp liên kết file thiết kế**
   ```
   Người dùng: Xin giúp tôi chuyển thiết kế Figma này thành code React
   Liên kết: https://www.figma.com/file/xxxxx

   AI: Tôi đã kết nối với Figma thông qua MCP, đang đọc cấu trúc file thiết kế...
   ```

3. **AI tự động phân tích và tạo code**
   - MCP Server lấy layer tree của file thiết kế
   - AI hiểu cấu trúc component và thuộc tính style
   - Tạo React/Vue component với naming và cấu trúc chính xác

4. **Lặp lại và tối ưu**
   ```
   Người dùng: Xin trích xuất button component thành một component độc lập có thể tái sử dụng

   AI: Đã hiểu, tôi đã nhận diện Button component trong design system thông qua MCP,
       đang tạo React component với interface props...
   ```

### 4.4 Lợi thế của MCP

| Tính năng | Phương pháp truyền thống | Phương pháp MCP |
|-----------|--------------------------|-----------------|
| **Độ chính xác dữ liệu** | Dựa vào screenshot, có thể mất chi tiết | Trực tiếp đọc dữ liệu thiết kế gốc |
| **Nhận diện component** | AI cần đoán ranh giới component | Chính xác lấy định nghĩa component |
| **Khôi phục style** | Dựa trên ước tính pixel | Lấy design token chính xác |
| **Hiệu quả lặp lại** | Mỗi lần sửa đổi cần chụp lại | Đồng bộ thay đổi thiết kế theo thời gian thực |
| **Mức độ tự động hóa** | Thủ công sao chép dán | Có thể trực tiếp ghi vào file dự án |

### 4.5 Công cụ MCP hiện có

**MCP công cụ thiết kế:**
- **Figma MCP Server**: Triển khai MCP được hỗ trợ chính thức
- **MasterGo MCP**: Adapter MasterGo do cộng đồng phát triển

**MCP môi trường phát triển:**
- **Claude Code**: Hỗ trợ gốc giao thức MCP
- **Cline**: Plugin VS Code, hỗ trợ kết nối MCP
- **Trae**: Có thể kích hoạt chức năng MCP thông qua cấu hình

::: tip 🔮 Triển vọng tương lai
Giao thức MCP đang phát triển nhanh chóng, trong tương lai tích hợp giữa công cụ thiết kế và môi trường phát triển sẽ chặt chẽ hơn. Dự kiến sẽ xuất hiện nhiều giải pháp đồng bộ thiết kế thành code chỉ bằng một cú nhấp hơn nữa, rút ngắn khoảng cách giữa thiết kế và phát triển.
:::

---

## 5. Công việc sau khi xuất code

### 5.1 Kiểm thử cục bộ

Sau khi lấy code, mở trong IDE cục bộ và kiểm thử:

1. **Tạo dự án mới**
   ```bash
   # Nếu là file HTML, mở trực tiếp bằng trình duyệt
   open index.html

   # Nếu là dự án React/Vue
   npm install
   npm run dev
   ```

2. **Cộng tác với AI IDE**
   - Import code đã tạo vào Trae hoặc AI IDE khác
   - Để AI giúp sửa vấn đề bố cục, thêm chức năng tương tác

### 5.2 Xử lý vấn đề phổ biến

| Giai đoạn | Vấn đề | Giải pháp |
|-----------|--------|-----------|
| Bố cục | Yếu tố bị lệch | Kiểm tra thuộc tính display và position của CSS |
| Style | Màu sắc không nhất quán | Sử dụng developer tool của trình duyệt kiểm tra giá trị màu thực tế |
| Responsive | Hiển thị trên mobile bất thường | Thêm media query breakpoint |
| Tương tác | Nút không phản hồi | Kiểm tra event binding của JavaScript |

---

## 6. So sánh ba con đường và đề xuất lựa chọn

### 6.1 So sánh các con đường

| Chiều | Con đường 1: AI đa phương thức | Con đường 2: Khả năng nền tảng | Con đường 3: MCP |
|-------|-------------------------------|-------------------------------|-------------------|
| **Độ khó bắt đầu** | ⭐ Đơn giản | ⭐⭐ Trung bình | ⭐⭐⭐ Khá phức tạp |
| **Độ chính xác khôi phục** | ⭐⭐⭐ Trung bình | ⭐⭐⭐⭐ Cao | ⭐⭐⭐⭐⭐ Cao nhất |
| **Tính linh hoạt** | ⭐⭐⭐⭐⭐ Cao | ⭐⭐⭐ Trung bình | ⭐⭐⭐⭐ Khá cao |
| **Mức độ tự động hóa** | ⭐⭐ Thấp | ⭐⭐⭐ Trung bình | ⭐⭐⭐⭐⭐ Cao |
| **Chi phí** | Thấp (tính theo API call) | Trung bình (có thể cần Pro) | Thấp (công cụ mã nguồn mở) |

### 6.2 Đề xuất lựa chọn

**Chọn con đường 1 (AI đa phương thức) nếu:**
- Cần nhanh chóng xác minh ý tưởng
- Công cụ thiết kế không cố định, thường xuyên chuyển đổi
- Không yêu cầu cao về độ chính xác khôi phục
- Ngân sách hạn chế

**Chọn con đường 2 (Khả năng nền tảng) nếu:**
- Đội nhóm chủ yếu sử dụng Figma hoặc MasterGo
- Cần khôi phục code với độ chính xác cao
- Designer và developer cần cộng tác thường xuyên
- Sẵn sàng đầu tư phiên bản Pro

**Chọn con đường 3 (MCP) nếu:**
- Theo đuổi mức độ tự động hóa cao nhất
- Có khả năng kỹ thuật cấu hình môi trường MCP
- Dự án cần lặp lại từ thiết kế đến code thường xuyên
- Muốn xây dựng quy trình thiết kế-phát triển tiêu chuẩn hóa

---

## 7. Tổng kết

Thông qua việc học chương này, bạn đã nắm vững ba con đường cốt lõi từ nguyên mẫu thiết kế đến code:

1. **Chuyển đổi trực tiếp bằng AI đa phương thức**: Linh hoạt và nhanh chóng, phù hợp để xác minh nguyên mẫu
2. **Khả năng gốc của nền tảng**: Độ khôi phục cao, phù hợp cho quy trình thiết kế chuyên nghiệp
3. **Tích hợp giao thức MCP**: Mức độ tự động hóa cao nhất, đại diện cho xu hướng tương lai

::: tip 💡 Thực hành tốt nhất
- **Người mới khuyến nghị**: Bắt đầu từ con đường 1 (AI đa phương thức), nhanh chóng làm quen
- **Cộng tác đội nhóm**: Sử dụng con đường 2 (Khả năng nền tảng), đảm bảo tính nhất quán thiết kế
- **Ưu tiên hiệu quả**: Thử con đường 3 (MCP), xây dựng quy trình làm việc tự động hóa
- **Sử dụng kết hợp**: Chuyển đổi linh hoạt giữa các con đường khác nhau theo giai đoạn dự án
:::

---

## Tài nguyên tham khảo

- [Giới thiệu Figma và MasterGo](../figma-mastergo/) - Học kiến thức cơ bản về công cụ thiết kế
- [Cùng làm Chân dung Hogwarts](../hogwarts-portraits/) - Thực hành dự án hoàn chỉnh
- [Tài liệu chính thức MCP](https://modelcontextprotocol.io/) - Tìm hiểu chi tiết giao thức
- [Tài liệu chính thức Figma Make](https://help.figma.com/hc/en-us/sections/360007453634-Figma-Make)
- [Hướng dẫn MasterGo AI](https://mastergo.com/tutorials)
