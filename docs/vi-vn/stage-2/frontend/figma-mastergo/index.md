<script setup>
import { relatedArticlesMap } from '@theme/data/relatedArticles'

const relatedArticles = relatedArticlesMap['vi-vn/stage-2/frontend/figma-mastergo'] ?? []
</script>

# Giới thiệu Figma và MasterGo

::: tip 🎯 Vấn đề cốt lõi
**Làm thế nào để sử dụng công cụ thiết kế hiện đại để tạo nguyên mẫu trang web từ con số không?**
:::

---

## 1. Tại sao cần học công cụ thiết kế frontend?

Trước khi bắt đầu, chúng ta cần hiểu một vấn đề: tại sao cần học "công cụ thiết kế frontend"? Dù sao thì viết code HTML/CSS trực tiếp cũng có thể tạo ra trang web, việc học thêm một phần mềm và công nghệ mới có thực sự cần thiết không?

Thực tế, việc chạy được trang web và thiết kế sản phẩm tốt là hai khái niệm hoàn toàn khác nhau. Code chỉ giải quyết vấn đề render trên trình duyệt, chạy trên các thiết bị khác nhau; công cụ thiết kế frontend giải quyết vấn đề phân bố thông tin, sắp xếp tương tác frontend như thế nào, chuyển trang khác nhau ra sao, phân bổ ưu tiên thị giác thế nào. Chỉ cần tạo một canvas trong công cụ thiết kế là có thể so sánh và xác định layout, phân cấp thông tin và phương thức tương tác trên một màn hình, chọn hiệu quả trình bày phù hợp nhất.

Nếu bắt đầu viết code trực tiếp hoặc dùng AI tạo trang frontend hoàn chỉnh, trải nghiệm người dùng thường không tốt lắm. Sản phẩm nghiêm túc sẽ cân nhắc đến độ thoải mái của tương tác người dùng và frontend, cũng như phân bố nội dung mà các trang khác nhau muốn truyền đạt, từ góc độ người dùng sắp xếp trang frontend trước, sau đó mới chuyển đổi hoặc tạo code.

Ngoài ra, từ góc độ hợp tác nhóm, công cụ thiết kế frontend còn giảm chi phí hợp tác giữa nhiều bên: nhà thiết kế, sản phẩm, phát triển không còn mỗi người tưởng tượng hoặc mô tả code trừu tượng, mà hỗ trợ nhiều người cộng tác, mọi người có thể thảo luận quản lý phiên bản, thay đổi yêu cầu, phản hồi xung quanh một canvas có thể nhìn thấy, có thể chú thích, có thể lặp lại. Hơn thế nữa, công cụ thiết kế frontend hiện đại không chỉ là phần mềm vẽ, một click tạo code một phần, quản lý hệ thống thiết kế và thư viện component, công cụ thiết kế thời đại mới đã có thể tự động hóa hoặc hàng loạt hóa nhiều công việc lặp đi lặp lại (căn chỉnh, chú thích, xuất, thay đổi style), thúc đẩy đáng kể hiệu quả phát triển thiết kế trang.

![](/zh-cn/stage-2/frontend/figma-mastergo/images/image8.webp)

### 1.1 Sự tiến hóa của công cụ thiết kế frontend

Trong dòng chảy thời gian, cái gọi là công cụ thiết kế frontend thực chất là một công nghệ liên tục tiến hóa. Từ thời Photoshop chủ yếu chỉnh sửa bitmap cục bộ những năm 90, đến khoảng năm 2010 Sketch mang đến workflow vector hóa, component hóa, rồi sau 2016 Figma đưa cộng tác lên đám mây hoàn toàn, đội thiết kế từ làm việc đơn độc dần chuyển sang cộng tác thời gian thực nhiều người. Đến năm 2025, AI đã thực sự tích hợp vào bên trong các công cụ này: từ "tạo bản nháp trang web theo một câu mô tả", đến "chuyển thiết kế trực tiếp thành cấu trúc frontend có thể chạy", "thiết kế chính là code", "người và máy cùng sáng tạo" đang từ khái niệm trở thành năng lực sản xuất thực tế.

Trong phần này, chúng ta sẽ chọn hai công cụ thiết kế frontend hiện đại đại diện nhất để giới thiệu: Figma và MasterGo. Một mặt, cả hai đều bao phủ các năng lực cốt lõi mà UI/UX hiện đại cần (chỉnh sửa vector, hệ thống component, tự động layout, giao code, v.v.), có thể hỗ trợ bạn hoàn thành vòng lặp hoàn chỉnh từ wireframe đến high-fidelity đến bàn giao phát triển; mặt khác, hai công cụ này đã lần lượt tích hợp các chức năng AI thực tế sau năm 2025, giúp bạn đảm bảo nguyên mẫu không đổi đồng thời chuyển thiết kế thành chương trình thực sự có thể chạy.

## 1.2 Hành trình ra đời

![](/zh-cn/stage-2/frontend/figma-mastergo/images/image9.webp)

Trong thời kỳ chưa có công cụ thiết kế frontend chuyên dụng, toàn bộ công việc thiết kế thị giác của ngành thiết kế giao diện trong thời gian dài đều do phần mềm thiết kế "đa năng" như Photoshop đảm nhận. Nhà thiết kế sẽ tạo lớp layer lớp layer tại địa phương, hoàn thành thiết kế hiệu quả thị giác tổng thể trang một cách tỉ mỉ, cuối cùng bàn giao file nguồn .psd khá lớn cho kỹ sư frontend - mà frontend muốn khôi phục chính xác thiết kế, còn phải hoàn thành thủ công ba công việc phức tạp và quan trọng:

Thứ nhất là "cắt ảnh": cần từ cấu trúc nhiều layer của file .psd, tách riêng từng phần tử thị giác độc lập như nút bấm, icon, Logo, module nền, rồi xuất sang định dạng hình ảnh mà web có thể tải trực tiếp như PNG, JPG (vì web không thể nhận diện thông tin layer PSD, chỉ dựa vào các hình ảnh đã tách để thể hiện chi tiết);

![](/zh-cn/stage-2/frontend/figma-mastergo/images/image10.webp)

Thứ hai là "đo kích thước": phải dùng công cụ đo tích hợp, xác nhận từng kích thước chiều rộng chiều cao, khoảng cách giữa các module khác nhau (margin/padding) và các dữ liệu khác, đảm bảo tất cả kích thước chính xác đến pixel;

![](/zh-cn/stage-2/frontend/figma-mastergo/images/image11.webp)

Thứ ba là "trích chú thích": cần trích xuất từ thiết kế các tham số "không nhìn thấy nhưng bắt buộc phải có" - như kích thước chữ, font-weight, line-height, giá trị màu RGB hoặc HEX của mỗi khối màu, tương đương với việc "thông số kỹ thuật thiết kế" mà nhà thiết kế không viết trên giấy phải được "trích" thủ công.

![](/zh-cn/stage-2/frontend/figma-mastergo/images/image12.webp)

Sau đó, giai đoạn hiện thực frontend mới thực sự bắt đầu. Dù sử dụng HTML/CSS/JS gốc hay dựa trên framework Vue, React, quá trình bản chất là giống nhau. Frontend sẽ lấy "container làm载体 cốt lõi", tái xây dựng cấu trúc trang theo phân cấp và ngữ nghĩa của các module trong thiết kế. Container ở đây là đơn vị có ranh giới layout rõ ràng, chuyên chứa và tổ chức các phần tử con, nó không trực tiếp thể hiện nội dung cụ thể, mà thông qua các quy tắc như Flex, Grid, vạch phạm vi sắp xếp cho các phần tử bên trong. "Khối cấu trúc" (như thanh điều hướng trên cùng, sidebar, khu vực danh sách bài viết, chân trang dưới cùng v.v.) dựa vào container tồn tại; bên trong mỗi khối cấu trúc, lại lồng các container nhỏ hơn để tổ chức phần tử, ví dụ một mục danh sách bài viết sẽ được "container mục danh sách" điều khiển padding và layout tổng thể, rồi bọc các phần tử chi tiết như tiêu đề, tóm tắt, thời gian, icon bìa.

![](/zh-cn/stage-2/frontend/figma-mastergo/images/image13.webp)

Trong framework frontend hiện đại, các "khối cấu trúc (và container & phần tử liên quan)" này thường được hiện thực thành "component". Component có thể hiểu đơn giản là đơn vị giao diện tái sử dụng có ranh giới rõ ràng, tích hợp layout container và logic, nó vừa chứa container điều khiển ngoại hình và sắp xếp (ví dụ "component nút bấm" dùng container định nghĩa chiều rộng, chiều cao, bo góc, "component thẻ bài viết" dùng container tổ chức vị trí tiêu đề, bìa), vừa đóng gói logic tương tác. Những phần lặp lại xuất hiện, hình thái nhất quán trong thiết kế (như nút bấm phong cách thống nhất, thẻ bài viết sử dụng nhiều lần) sẽ được trừu tượng thành component trong code: vừa tái sử dụng được trong các trang/kịch bản khác nhau, giảm phát triển lặp, vừa thông qua quy tắc thống nhất của container trong component, đảm bảo layout và phong cách nhất quán ở mọi nơi tái sử dụng.

Tiếp đó, frontend sử dụng hệ thống style khôi phục thị giác và layout. Các tài nguyên PNG/JPG xuất trong giai đoạn cắt ảnh, sẽ được sử dụng làm `<img>` hoặc ảnh nền bên trong component hoặc khối cấu trúc; các giá trị cụ thể về chiều rộng, chiều cao, khoảng cách, chiều cao dòng thu được trong giai đoạn đo kích thước, sẽ được chuyển thành các thuộc tính style như `width`, `height`, `margin`, `padding`, `line-height`, áp dụng cho component hoặc khối cấu trúc tương ứng; màu sắc, font chữ, đổ bóng, bo góc và các trạng thái hover/active được sắp xếp trong giai đoạn trích chú thích, sẽ được thể hiện vào `color`, `font-family`, `font-size`, `box-shadow`, `border-radius` và pseudo-class hoặc class trạng thái trong các giải pháp cụ thể như CSS, CSS Modules, CSS-in-JS, Tailwind. Lúc này, cắt ảnh, kích thước và chú thích cung cấp một bộ tham số thị giác chính xác, component và khối cấu trúc cung cấp đơn vị tổ chức code mang các tham số này, kết hợp cả hai tạo thành hiện thực giao diện có thể bảo trì, tái sử dụng.

![](/zh-cn/stage-2/frontend/figma-mastergo/images/image14.webp)

Tuy nhiên, mô hình lấy file cục bộ làm trung tâm tự nhiên có hiệu suất thấp. Phiên bản truyền qua email và đám mây, bản nháp mới cũ dễ nhầm lẫn, thiết kế và phát triển phụ thuộc nhiều vào các phương thức tương tác phức tạp nói trên, chi phí cộng tác và xác suất lỗi đều không thấp.

Sau khi internet di động phát triển, độ phức tạp giao diện và nhu cầu tốc độ lặp lại nhanh chóng tăng lên, "lớn và toàn diện" của Photoshop dần trở nên cồng kềnh. Giai đoạn này, Sketch xuất hiện. Sketch tập trung vào bản thân thiết kế UI, tách bỏ hầu hết gánh nặng liên quan đến xử lý hậu kỳ thị giác; dùng Symbols biến các phần tử tái sử dụng cao như nút bấm, thanh điều hướng, ô nhập thành component hóa, sửa một chỗ có thể đồng bộ toàn cục; kết hợp với công cụ như Zeplin, tự động tạo chú thích và đoạn style. Sketch đưa "tư duy component" vào workflow thiết kế. Nhưng nó vẫn là ứng dụng desktop dựa trên file cục bộ, cộng tác thời gian thực phải dựa vào cloud drive, plugin bên thứ ba hoặc công cụ phiên bản, chưa giải quyết vấn đề "nhiều người cùng sửa một bản nháp" từ gốc.

![](/zh-cn/stage-2/frontend/figma-mastergo/images/image15.webp)

Thực sự thay đổi luật chơi là Figma. Từ năm 2016, nó tích hợp thiết kế UI, tạo nguyên mẫu, bình luận cộng tác vào trình duyệt, hỗ trợ nhiều chức năng hiện đại: con trỏ thời gian thực nhiều người, bình luận trực tuyến, dòng thời gian phiên bản, liên kết chia sẻ, v.v., ngày nay nhìn thấy rất đơn giản nhưng lúc đó là thách thức trực tiếp với mô hình Photoshop/Sketch.

![](/zh-cn/stage-2/frontend/figma-mastergo/images/image16.webp)

Đến đây, thiết kế giao diện không còn là các file rải rác trên máy tính mỗi người, mà tập trung trên một canvas trực tuyến, cập nhật thời gian thực trên đám mây. Xoay quanh canvas này, chúng ta có thể tưởng tượng xa hơn nữa, dùng tự động hóa hoặc AI làm mờ ranh giới giữa thiết kế và code frontend.

Ban đầu, chúng ta chỉ có thể dựa vào các plugin nền tảng khác nhau, xuất bán tự động thông tin component, style từ thiết kế thành đoạn code (như khung component React/Vue, biến CSS, v.v.), bản chất cốt lõi là trích xuất thông tin có cấu trúc thông qua plugin. Sau đó, cùng với sự tiến hóa năng lực nền tảng, hầu hết nền tảng thiết kế bắt đầu hỗ trợ chức năng MCP (Model Context Protocol, Giao thức Ngữ cảnh Mô hình) mô hình lớn: giao thức này cung cấp một bộ cơ chế chuẩn, cho phép mô hình lớn truy cập an toàn, có kiểm soát vào file thiết kế, interface plugin và metadata dự án, từ đó thuận tiện hơn xuất thiết kế thành code.

Tiếp tục, trên cơ sở plugin và MCP, tự động hóa code frontend tiến thêm bước sang giai đoạn hỗ trợ gốc từ thiết kế trực tiếp suy ra cấu trúc code. Chúng ta có thể tạo khung dự án frontend, phân cấp component, hệ thống style và kết quả code tương ứng chỉ với một click trong công cụ thiết kế. Điều này giúp nhà thiết kế và kỹ sư phát triển frontend được giải phóng khỏi việc vận chuyển thủ công chi tiết thiết kế, tập trung nhiều năng lực hơn vào tối ưu trải nghiệm người dùng và cập nhật lặp lại phiên bản chức năng.

---

## 2. Giới thiệu Figma

Tiếp theo chúng ta đi từ phần khái niệm trừu tượng đến khâu thao tác thực tế. Do thời gian có hạn, chúng ta chỉ học logic thao tác cơ bản của Figma, đảm bảo dù bạn chưa từng dùng công cụ thiết kế nào cũng có thể theo làm bài tập. Nếu bạn muốn học đầy đủ chức năng Figma, hãy tham khảo hướng dẫn chi tiết chính thức mà Figma cung cấp: https://help.figma.com/hc/en-us/sections/30880632542743-Figma-Design-for-beginners

Hoặc tham khảo hướng dẫn dưới đây, xây dựng nhanh một trang web portfolio cá nhân đơn giản: https://help.figma.com/hc/en-us/sections/35895585621655-Figma-Sites-collectio

![](/zh-cn/stage-2/frontend/figma-mastergo/images/image17.webp)

Bên trái là nơi tạo mới và quản lý tài nguyên dự án, vài nút bấm ở góc trên bên phải là các chức năng phổ biến của Figma. Trong đó, Make dùng để AI giúp bạn tạo trước một giao diện hoặc bản nháp cấu trúc với một câu mô tả, Design là không gian làm việc chính để vẽ giao diện web/App, tạo component và làm nguyên mẫu, FigJam giống như bảng trắng nhóm, dùng để dán note, vẽ quy trình và thảo luận sơ bộ, Buzz là công cụ sản xuất hàng loạt tài sản thương hiệu, dùng để tạo hàng loạt nội dung duy trì nhất quán thương hiệu, Site là tổng hợp các thiết kế này thành trang web hoặc trang tài liệu thực sự có thể truy cập để trưng bày bên ngoài.

Nhìn thoạt qua chức năng Figma rất nhiều, khó nhập môn, nhưng thực tế loại công cụ chức năng này bản chất là quen tay hay làm, không cần sợ thao tác sai lúc đầu, cũng đừng nghĩ phải làm đúng ngay từ đầu, chỉ cần chơi trước, chơi nhiều tự nhiên sẽ nhanh thành thạo.

Trong bài hướng dẫn này, để nhanh chóng nhập môn, chúng ta sẽ giải thích đơn giản chức năng Design.

### 2.1 Tạo file Design mới

Từ trang chủ hoặc ô nhập ở góc trên bên phải, chọn **Design**, tạo một file mới, bạn sẽ vào một canvas thiết kế trống.
Giao diện này大致 chia làm ba phần: bên trái là trang và layer, dùng để xem và sửa đổi quan hệ trang, quan hệ phần tử; ở giữa là canvas, dùng để xem hiệu quả hiện tại; bên phải là thuộc tính và style, dùng để sửa đổi hình dạng, màu sắc, style cụ thể; một thanh công cụ ở dưới cùng, dùng để chuyển đổi công cụ, bao gồm select, vẽ hình, nhập chữ, bình luận, plugin, v.v., sau khi chọn công cụ, có thể nhấn phím Esc để quay lại công cụ chuột mặc định.

![](/zh-cn/stage-2/frontend/figma-mastergo/images/image18.png)

### 2.2 Tạo Frame (bảng vẽ) đầu tiên của bạn

Trước khi đặt phần tử chính thức, cần xác định ranh giới rõ ràng cho trang, ranh giới này do Frame đảm nhận. Bạn có thể chọn công cụ Frame trong thanh công cụ dưới cùng, hoặc nhấn trực tiếp phím F, rồi kéo ra một vùng hình chữ nhật trên canvas.

1. Sử dụng công cụ Frame trong thanh công cụ dưới cùng, hoặc nhấn trực tiếp phím `F`.
2. Kéo ra một vùng hình chữ nhật trong canvas, thanh thuộc tính bên phải đổi chiều rộng thành ví dụ `1440`, chiều cao thành `900`.
3. Trong thanh layer bên trái, đổi tên Frame này, ví dụ `My First Page` hoặc tên dự án của bạn.

Frame này là container trang của giao diện một màn hình, sau đó tiêu đề, chữ, nút bấm, hình ảnh v.v. đều nên đặt bên trong Frame này, chứ không rải rác ở bất kỳ vị trí nào trên canvas. Tổ chức nội dung với Frame làm ranh giới giúp giữ cấu trúc可控 trong các khâu sau như cài đặt cuộn, thích ứng kích thước thiết bị khác nhau, xuất hình và tạo nguyên mẫu.

![](/zh-cn/stage-2/frontend/figma-mastergo/images/image19.png)

### 2.3 Đặt chữ và phần tử đơn giản trong Frame

Có container rồi, tiếp theo chúng ta học cách đặt các component cơ bản nhất, ví dụ: tiêu đề, tiêu đề phụ, nút bấm, khối ảnh placeholder.

1. Chọn công cụ chữ (phím `T` trong thanh công cụ dưới cùng), click một cái trong Frame, nhập tiêu đề trang, ví dụ: `My Portfolio`.
   Trong thuộc tính bên phải, tăng kích thước font lên (ví dụ 96), tăng font-weight.
2. Bên dưới tiêu đề, dùng công cụ chữ nhập một dòng mô tả đơn giản, ví dụ một hai câu mô tả trang này làm gì.
   Kích thước chữ có thể nhỏ hơn, line-height tăng nhẹ một chút, đọc không bị chật.
3. Vẽ một nút bấm sơ bộ:
   Dùng công cụ hình chữ nhật vẽ một hình chữ nhật khoảng `200 × 48` bên dưới tiêu đề, bên phải cho một màu fill khá nổi bật, thêm bo góc phù hợp.
   ![](/zh-cn/stage-2/frontend/figma-mastergo/images/image20.png)
4. Rồi dùng công cụ chữ nhập chữ nút bấm bên trên hình chữ nhật, ví dụ `Get Started`, chọn cả hình chữ nhật và chữ, dùng công cụ căn chỉnh ở trên cùng cho chữ căn giữa cả theo chiều ngang và chiều dọc.
5. Bên cạnh hoặc bên dưới nút bấm, vẽ thêm một hình chữ nhật lớn màu xám nhạt làm "khu vực ảnh placeholder", sau này có thể dùng để đặt ảnh trưng bày.

Đến đây, thực tế bạn đã có một "bản nháp trang chủ" rất đơn giản nhưng cấu trúc hoàn chỉnh: một tiêu đề, một đoạn văn, một nút bấm, một khu vực trưng bày chính.

![](/zh-cn/stage-2/frontend/figma-mastergo/images/image21.png)

### 2.4 Tận dụng Auto Layout tích hợp phần tử

Nếu tất cả phần tử chỉ kéo thả tùy tiện, trang sẽ nhanh chóng lộn xộn. Một khái niệm rất quan trọng trong Figma là **Auto Layout**, nó có thể biến một nhóm phần tử thành một container có quy tắc.

![](/zh-cn/stage-2/frontend/figma-mastergo/images/image22.png)

Bạn có thể chọn cả ba thứ "tiêu đề chính + tiêu đề phụ + nút bấm", click **Add Auto layout** trong thanh thuộc tính bên phải.

Lúc này ba thứ sẽ được bọc trong một container, bạn có thể điều chỉnh tham số ở bên phải, layout các phần tử bên trong sẽ tự động thích ứng theo tham số:

- Chúng xếp dọc hay xếp ngang.
- Khoảng cách giữa các phần tử là bao nhiêu.
- Toàn bộ khối này cách mép container bao nhiêu padding.

![](/zh-cn/stage-2/frontend/figma-mastergo/images/image23.png)

Tương tự, bên trong nút bấm cũng có thể dùng Auto Layout, chúng ta có thể đạt được hiệu quả: khi chỉnh sửa chữ, độ dài nút bấm cũng tự động điều chỉnh.

Trước hết chọn hình chữ nhật nền nút bấm và chữ nút bấm, thêm Auto Layout, cho hai thứ này thành một "container nút bấm". Sau đó chọn container nút bấm này, đặt cả chiều rộng và chiều cao thành **Hug contents**. Như vậy, chữ sẽ luôn ở giữa nút bấm, chữ nhiều hơn hay ít hơn, chiều rộng nút bấm đều tự động thay đổi theo.

![](/zh-cn/stage-2/frontend/figma-mastergo/images/image24.png)

### 2.5 Biến nút bấm thành component tái sử dụng

Bây giờ chúng ta học một khái niệm mới: component. Component nghĩa là phần tử có thể được sử dụng lặp đi lặp lại, ví dụ phần tử như nút bấm, chỉ cần bạn dự cảm sau này còn dùng lại nhiều lần, có thể cân nhắc biến nó thành component. Chúng ta dựa trên nút bấm đã thêm Auto Layout ở trên:

1. Chọn toàn bộ container nút bấm.
2. Nhấp chuột phải chọn Create component (tạo component).
   ![](/zh-cn/stage-2/frontend/figma-mastergo/images/image25.png)

Như vậy, nút bấm này từ một nhóm layer bình thường, trở thành một bản gốc component. Sau này nếu bạn cần nút bấm cùng phong cách ở trang khác hoặc Frame khác, có thể kéo trực tiếp từ bảng Assets bên trái để sử dụng.

![](/zh-cn/stage-2/frontend/figma-mastergo/images/image26.png)

Lúc này tất cả nút bấm được sử dụng đều là bản sao đồng bộ của bản gốc này. Khi bạn sửa màu sắc, bo góc hoặc khoảng cách của bản gốc, tất cả instance sẽ tự động giữ đồng bộ cập nhật.

![](/zh-cn/stage-2/frontend/figma-mastergo/images/image27.webp)

Đến đây, bạn đã nắm初步 cách sử dụng đơn giản của Figma. Bạn không cần hiểu tất cả chức năng ngay từ đầu, chỉ cần làm theo một trang đơn giản đầu tiên, quen với vài thao tác cốt lõi, rồi dần khám phá thêm năng lực trong hướng dẫn chính thức, cùng với số lần sử dụng tăng lên chắc chắn sẽ thành thạo.

---

## 3. Giới thiệu MasterGo

Sau khi hiểu workflow cơ bản của Figma, chúng ta nhìn sang MasterGo, bạn có thể đơn giản xem MasterGo là phiên bản Trung Quốc của Figma, nhưng có một số khác biệt về mặt chức năng. Nhìn chung, nó kế thừa layout giao diện và triết lý thao tác tương tự Figma: cũng có canvas, cây layer và bảng thuộc tính, cũng hỗ trợ component, style, tự động layout và cộng tác nhiều người. Nội dung chi tiết hơn có thể tham khảo hướng dẫn chính thức của MasterGo: https://mastergo.com/tutorials/12

### 3.1 Tạo file thiết kế mới

1. **Vào backend MasterGo**
   1. Mở trang chủ MasterGo và đăng nhập tài khoản.
   2. Sau khi vào, bạn sẽ thấy khu vực trang chủ "Danh sách file/Danh sách dự án" tương tự, dùng để quản lý file thiết kế của bạn.
      ![](/zh-cn/stage-2/frontend/figma-mastergo/images/image28.webp)

2. **Tạo file mới**
   1. Thấy nút + File thiết kế ở góc trên bên phải để click, hoặc chọn nhập file Figma, v.v.
   2. Sau khi click, bạn sẽ vào một canvas trống, đây là không gian làm việc thiết kế của MasterGo.

3. **Làm quen các khu vực giao diện cơ bản**
   Khi bạn đã biết dùng Figma, cách dùng MasterGo cũng tương tự, chủ yếu chia làm vài khu vực:

   ![](/zh-cn/stage-2/frontend/figma-mastergo/images/image29.png)
   1. Thanh công cụ trên cùng: nằm ở trên cùng canvas, bên trái là vị trí file và tên file, ở giữa là một hàng nút công cụ phổ biến (chọn, khu vực/bảng vẽ, hình dạng, văn bản, chú thích, bình luận, chọn plugin và công cụ AI, v.v.), bên phải là thành viên trực tuyến hiện tại, entrance chia sẻ và chức năng điều khiển zoom và xem trước canvas.
   2. Bảng bên trái: chủ yếu chia làm layer và tài nguyên, hiện đang dừng ở tab layer, có thể thấy danh sách trang, cấu trúc và phân cấp của tất cả layer trong trang đó.
   3. Khu vực canvas ở giữa: không gian làm việc cụ thể để vẽ và layout, tất cả Frame, component và hình dạng đều hiển thị ở đây.
   4. Bảng thuộc tính bên phải: dùng để xem và chỉnh sửa thuộc tính đối tượng đã chọn, ví dụ kích thước, vị trí, căn chỉnh, fill nền, viền, bo góc, v.v. Nếu chưa chọn đối tượng nào, sẽ hiển thị cài đặt liên quan canvas như màu nền canvas, tag và tùy chọn xuất.

### 3.2 Tạo Frame đầu tiên của bạn

Trước khi đặt thứ gì chính thức, chúng ta cần một container trang để xác định ranh giới và kích thước giao diện. Container này trong MasterGo thường gọi là Frame.

**Các bước:**

1. **Chọn công cụ Frame**
   1. Tìm công cụ Frame/bảng vẽ trong thanh công cụ, click后 có thể dùng tham số mặc định tạo nội dung trực tiếp vào bảng vẽ.
   2. Hoặc dùng phím tắt (thường là `F`, nếu khác biệt thì theo giao diện thực tế).
2. **Kéo ra một vùng hình chữ nhật trong canvas**
   1. Sau khi kéo ra, bạn sẽ thấy một vùng có khung chọn.
   2. Bảng thuộc tính bên phải, có thể thấy chiều rộng và chiều cao của Frame này.
   3. Đổi chiều rộng thành ví dụ `1440`, chiều cao thành `900` (một kích thước phổ biến cho web một màn hình).
3. **Đổi tên Frame**
   1. Tìm Frame này trong bảng layer bên trái.
   2. Nhấp đúp tên, đổi thành tên dự án của bạn, ví dụ: `My First Page`, hoặc tên trang bạn tự đặt.

![](/zh-cn/stage-2/frontend/figma-mastergo/images/image30.png)

### 3.3 Tạo nội dung bảng vẽ

Có container rồi, sử dụng cách tương tự đã dạy trong Figma, rất dễ có thể được trang trưng bày tương tự. (Bạn có thể thử sao chép phần tử chữ từ bảng vẽ Figma, hỗ trợ nhập dán trực tiếp component văn bản)

![](/zh-cn/stage-2/frontend/figma-mastergo/images/image31.png)

Đáng chú ý là hành vi chức năng Auto Layout hơi không nhất quán, trong MasterGo, nếu bạn muốn hiện thực độ dài nút bấm thay đổi theo độ dài chữ tương tự Figma, bạn cần tạo container hoặc component dựa trên phần tử hình chữ nhật tương ứng trước, như hình所示:

![](/zh-cn/stage-2/frontend/figma-mastergo/images/image32.png)

Sau khi tạo container thành công, đặt hình chữ nhật nút bấm và chữ vào container song song tương ứng, rồi tìm nút Auto Layout ở bên phải bật chức năng tự động, là có thể hiện thực thành công chức năng chiều rộng nút bấm thay đổi theo độ dài chữ.

![](/zh-cn/stage-2/frontend/figma-mastergo/images/image33.png)

![](/zh-cn/stage-2/frontend/figma-mastergo/images/image34.png)

### 3.4 AI tạo trang

![](/zh-cn/stage-2/frontend/figma-mastergo/images/image35.png)

Trong MasterGo, một chức năng thú vị đáng chú ý là AI tạo trang. Bạn có thể dùng một câu hoặc kèm ảnh tham khảo, tạo component phiên bản MasterGo có thể chỉnh sửa tương ứng, và nhận code có thể sử dụng trực tiếp. Bạn có thể dùng tiếng Trung hoặc tiếng Anh nhập yêu cầu trực tiếp, trang sẽ trả về layout trang có cấu trúc rõ ràng theo yêu cầu, hiệu quả như sau:

![](/zh-cn/stage-2/frontend/figma-mastergo/images/image36.png)

![](/zh-cn/stage-2/frontend/figma-mastergo/images/image37.webp)

Sau khi tạo tài liệu thiết kế xong, nhấp bắt đầu tạo, đợi một lúc là có thể nhận được hiệu quả trang web thực tế tương ứng:

![](/zh-cn/stage-2/frontend/figma-mastergo/images/image38.webp)

Lúc này bạn có hai lựa chọn thao tác: một là nhấp nút xanh để chèn kết quả tạo trực tiếp vào canvas, hai là nhấp chức năng xem trước code, trực tiếp nhận code trang hoàn chỉnh hiện tại, giao diện thao tác cụ thể như sau:

![](/zh-cn/stage-2/frontend/figma-mastergo/images/image39.webp)

![](/zh-cn/stage-2/frontend/figma-mastergo/images/image40.webp)

Sau khi chèn kết quả vào canvas, bạn còn có thể điều chỉnh tinh chỉnh hơn layout tổng thể trang web, chi tiết phần tử (như font chữ, màu sắc, khoảng cách, v.v.), cho đến khi hiệu quả cuối cùng hoàn toàn đáp ứng kỳ vọng của bạn.

![](/zh-cn/stage-2/frontend/figma-mastergo/images/image41.webp)

---

## 4. Bước tiếp theo: Từ nguyên mẫu đến code

Trong nội dung trước, chúng ta đã học thao tác cơ bản Figma và MasterGo, có thể tạo nguyên mẫu giao diện có cấu trúc hoàn chỉnh. Bước quan trọng tiếp theo là: **làm thế nào để chuyển các thiết kế này thành code frontend thực sự có thể chạy trên trình duyệt?**

::: tip 📚 Hướng dẫn tiếp theo
Giới thiệu phương pháp chi tiết hãy tham khảo [Từ nguyên mẫu thiết kế đến code dự án](../design-to-code/), bạn sẽ học:

- **Chuyển đổi trực tiếp AI đa phương thức**: Gửi ảnh chụp thiết kế cho AI, trực tiếp tạo code HTML/React
- **Figma Make**: Sử dụng công cụ AI chính thức Figma khôi phục thiết kế chính xác cao và xuất code
- **MasterGo AI**: Một click tạo trang có thể chỉnh sửa và nhận code

Các phương pháp này đều có ưu nhược điểm, phù hợp với các kịch bản khác nhau, đề nghị chọn workflow phù hợp theo nhu cầu dự án.
:::

---

## 5. Tổng kết

Thông qua học tập chương này, bạn đã nắm được:

1. **Giá trị của công cụ thiết kế frontend**: Hiểu tại sao cần công cụ thiết kế, và chúng giải quyết vấn đề phân bố thông tin, hợp tác nhóm như thế nào.

2. **Thao tác cơ bản Figma**:
   - Tạo file Design và bảng vẽ Frame
   - Thêm chữ, hình dạng và các phần tử cơ bản
   - Sử dụng Auto Layout hiện thực layout tự thích ứng
   - Tạo hệ thống component tái sử dụng

3. **Thao tác cơ bản MasterGo**:
   - Làm quen layout giao diện tương tự Figma
   - Tạo Frame và nội dung bảng vẽ cơ bản
   - Sử dụng chức năng AI tạo trang để nhanh chóng tạo nguyên mẫu

::: tip 💡 Bước tiếp theo
Bây giờ bạn đã nắm được cách sử dụng cơ bản công cụ thiết kế frontend, có thể thử:
- Thiết kế một trang portfolio cá nhân cho mình
- Thiết kế nguyên mẫu giao diện cho dự án tiếp theo
- Học [Từ nguyên mẫu thiết kế đến code dự án](../design-to-code/), chuyển thiết kế thành code có thể chạy

Nếu bạn đang làm dự án [Cùng làm Chân dung Hogwarts](../hogwarts-portraits/), có thể thiết kế nguyên mẫu giao diện trước, rồi xuất code kết hợp với chức năng hội thoại AI.
:::

<RelatedArticlesSection
  title="Bài viết liên quan"
  description="Đề nghị tiếp tục học chuyên sâu thiết kế UI và thực hành chuyển thiết kế sang code."
  :items="relatedArticles"
/>
