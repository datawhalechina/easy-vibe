<script setup>
import { relatedArticlesMap } from '@theme/data/relatedArticles'

const relatedArticles = relatedArticlesMap['vi-vn/stage-2/frontend/ui-design'] ?? []
</script>

# Xây dựng ứng dụng hiện đại đầu tiên - Thiết kế UI

Bạn có còn nhớ cảm giác lần đầu tiên lướt vào một trang sản phẩm được thiết kế đẹp mắt không? Chức năng thì tương tự nhau, nhưng trang của người khác trông lại "cao cấp" hơn hẳn: màu sắc gọn gàng, khoảng trắng thoải mái, bo góc của nút bấm vừa đúng chuẩn. Bạn không khỏi tự hỏi — **"Họ đã thiết kế ra sao? Chúng ta có thể làm ra một trang như vậy không?"**

Ý nghĩ "muốn tìm hiểu xem người khác làm như thế nào" này chính là điểm khởi đầu tốt nhất cho thiết kế frontend. Trước khi bắt tay vào làm, hãy cùng ôn lại những năng lực chúng ta đã nắm được:

- Trong các bài trước, chúng ta đã học cách dùng NanoBanana để tạo tài liệu thiết kế hàng loạt, hiểu được "phong cách" trong prompt ảnh hưởng đến kết quả đầu ra như thế nào;
- Đã làm quen với các công cụ thiết kế chuyên nghiệp như Figma và MasterGo, biết một bản thiết kế được tổ chức ra sao;
- Cũng đã được thấy quy trình chuyển đổi từ bản thiết kế sang code frontend.

Nhưng khi thực sự muốn làm một trang ưng ý cho dự án của mình, bạn có thể vẫn bị mắc kẹt: biết dùng công cụ, biết tạo tài liệu, nhưng **không biết "đẹp" trông như thế nào, cũng không biết cách phân tích và mô phỏng một trang xuất sắc**. Đừng lo, bài học này sẽ chuyên giải quyết vấn đề đó.

Để giúp bạn kết nối các nội dung trước và sau, hãy thử suy nghĩ vài câu hỏi nhỏ:

1. Một trang web hiện đại thường gồm những khối nào?
2. "Đẹp" là cảm nhận chủ quan, hay có thể được định lượng bằng các con số (giá trị màu, cỡ chữ, khoảng cách, bo góc)?
3. Nếu được yêu cầu mô phỏng phong cách thị giác của một trang web, bạn sẽ bắt đầu từ đâu?

Nếu chưa có câu trả lời rõ ràng cho những câu hỏi này, không sao — đó chính là điều bài học này sẽ dạy bạn. Nếu gặp bước khó hiểu trong quá trình thao tác, cứ thoải mái chụp ảnh màn hình trang hiện tại gửi cho mô hình lớn để hỏi; mạnh dạn thử nghiệm, đừng sợ sai, mỗi lần thử là một cơ hội học hỏi và tiến bộ.

::: tip 🎯 Vấn đề cốt lõi
**Đối mặt với một APP hoặc trang web được thiết kế đẹp mắt, làm thế nào để phân tích nó được thiết kế ra sao, và nhờ các công cụ thiết kế AI để mô phỏng nó "giả đến mức thật"?**
:::

---

## Trong bài học này bạn sẽ học

1. **Học "xem" thiết kế**: Có một trang trong tay, biết nên xem gì, cách phân tích
2. **Nắm phương pháp nhập môn**: Tìm tham chiếu → Phân tích → Mô phỏng → Giống → Nhập môn
3. **Biết 2 đường thiết kế**: Figma/MasterGo và Claude Design/Open Design (bao gồm UI design Skills)
4. **Thực hành mô phỏng**: Chọn một trang web thực tế, mô phỏng từ 0 đến khi có độ hoàn thiện cao
5. **Đúc kết hệ thống thiết kế**: Biến quy trình thiết kế của các công ty lớn thành của riêng bạn

::: tip 📚 Kiến thức tiền đề
Hướng dẫn này phù hợp với những nhà phát triển đã biết dùng công cụ lập trình AI (như Trae) và muốn bổ sung năng lực thị giác frontend cho dự án. Nếu muốn xây dựng cảm giác tạo hình ảnh trước, nên học [Sản xuất tài liệu với NanoBanana](../lovart-assets/) trước; nếu muốn đi sâu vào công cụ thiết kế, có thể kết hợp học [Nhập môn Figma và MasterGo](../figma-mastergo/).
:::

---

## Chương 1: Nhập môn thiết kế frontend, bắt đầu từ việc "chép"

Bài trước chúng ta đặt ra ba câu hỏi — trang web gồm những khối nào, thế nào là đẹp, cách mô phỏng ra sao. Phần này hãy bắt đầu từ phương pháp luận: **bài học đầu tiên của thiết kế frontend không phải là sáng tạo, mà là tái hiện.**

Cũng như học thư pháp thì luyện tập theo mẫu, học vẽ thì vẽ tượng thạch cao, vậy tại sao lại chính là "chép"?

- Cái "đẹp" của thiết kế có thể được định lượng — **giá trị màu, cỡ chữ, khoảng cách, bo góc, đổ bóng**, tất cả đều là con số
- Khi tái hiện từng pixel một bộ thiết kế thuần thục, bạn sẽ buộc phải hiểu từng quyết định đằng sau nó
- Khi bạn "chép đến giống", lần sau gặp hoàn cảnh tương tự, bạn sẽ biết "nên chép theo hướng nào"

![](/zh-cn/stage-2/frontend/ui-design/images/design-reference.jpg)

> 💡 Tóm lại một câu: **Mô phỏng được một sản phẩm tốt, chứng tỏ bạn đã có nền tảng cơ bản của thiết kế frontend; có thể trên cơ sở đó thay đổi, chứng tỏ bạn đã ra nghề.**

### 1.1 Vì sao mô phỏng là cách nhập môn nhanh nhất

Có người sẽ lo lắng: "Tôi đang chép đồ của người khác, như vậy thực sự học được gì hay sao?" Câu trả lời là: có, và đó là con đường nhanh nhất. Nguyên nhân là mô phỏng không phải là sao chép kết quả, mà là **buộc bản thân tái hiện lại quá trình**:

- Bạn sẽ buộc phải đo từng khoảng cách, từ đó hiểu được "khoảng trắng tạo cảm giác thở bằng cách nào"
- Bạn sẽ buộc phải tra từng giá trị màu, từ đó hiểu được "vì sao phối màu này trông hài hòa"
- Bạn sẽ buộc phải so sánh từng cấp độ, từ đó hiểu được "thông tin chính phụ được sắp xếp ra sao"

Khi bạn có thể "phân tích một trang xuất sắc đến mức chi tiết tham số" rồi xây dựng lại, sự hiểu biết của bạn về thiết kế đã vượt qua rất nhiều người chỉ "dựa vào cảm giác".

### 1.2 Các công ty lớn cũng "tham khảo", đó không phải bí mật

Cách làm việc của nhà thiết kế tự nhiên bao gồm tham khảo: Pinterest tìm ý tưởng, Dribbble xem xu hướng, phân tích đối thủ xem cấu trúc. Trong thời đại AI, điều này được phóng đại lên — vì công cụ trực tiếp biến "tham khảo" thành năng lực có thể thực thi:

![](/zh-cn/stage-2/frontend/ui-design/images/design-inspiration.jpg)

- Claude Design có thể nhập các trang web tham khảo bạn đã lưu, tạo bản nháp đầu theo phong cách của nó
- Open Design tích hợp sẵn 151 bộ hệ thống thiết kế mã nguồn mở, một cú nhấp là áp dụng vào dự án của mình
- Nhiều UI design Skill đóng gói "quy trình thị giác của các công ty lớn" thành các chỉ dẫn mà AI có thể thực thi

Vậy vấn đề của bạn không phải là "có được chép hay không", mà là "**làm sao chép chuyên nghiệp, chép hợp pháp, chép ra được thứ của riêng mình**".

#### Tìm tài liệu tham khảo ở đâu? Trước tiên hãy lưu các trang web này

Bước đầu tiên của tham khảo là **tích lũy một "thư viện tham khảo"**. Các trang web dưới đây được phân loại theo mục đích sử dụng, nên đánh dấu lưu tất cả, tùy nhu cầu mà dùng:

| Trang web | Mục đích | Phù hợp tìm gì |
| :--- | :--- | :--- |
| [Awwwards](https://www.awwwards.com) | "Giải Oscar" của giới thiết kế web | Sáng tạo đỉnh cao, hiệu ứng động, tương tác, học "trần nhà" trông thế nào |
| [Recent (trước đây là Godly)](https://godly.website) | Bộ sưu tập cảm hứng trang web chất lượng cao | Những thiết kế tiên phong của AI, Web3, trang portfolio |
| [Landbook](https://land-book.com) | Tuyển chọn thiết kế landing page | Lọc theo ngành/màu sắc tìm trang chủ, trang giá, bố cục màn hình đầu |
| [Lapa Ninja](https://www.lapa.ninja) | Thư viện 7300+ ảnh chụp landing page | Tra cứu thanh điều hướng, trưng bày tính năng, đánh giá khách hàng theo phần tử |
| [Mobbin](https://mobbin.com) | Thư viện giao diện App thực tế | Nghiên cứu trang và luồng thực tế của uber, Notion và các sản phẩm khác |
| [Dribbble](https://dribbble.com) | Cộng đồng designer | Cảm hứng phối màu, icon, phong cách minh họa và micro-interaction |
| [Behance](https://www.behance.net) | Thư viện case study dự án hoàn chỉnh | Xem ý tưởng thiết kế, quá trình nghiên cứu và portfolio hoàn chỉnh |

Những trang web này trông như thế nào? Xem trước một chút (bấm vào ảnh để phóng to):

![Awwwards — "Giải Oscar" của thiết kế web](/zh-cn/stage-2/frontend/ui-design/images/site-awwwards.jpg)

![Recent (trước đây là Godly) — Bộ sưu tập cảm hứng web chất lượng cao](/zh-cn/stage-2/frontend/ui-design/images/site-godly.jpg)

![Landbook — Tuyển chọn thiết kế landing page](/zh-cn/stage-2/frontend/ui-design/images/site-landbook.jpg)

![Lapa Ninja — Thư viện 7300+ ảnh chụp landing page](/zh-cn/stage-2/frontend/ui-design/images/site-lapa.jpg)

![Mobbin — Thư viện giao diện App thực tế](/zh-cn/stage-2/frontend/ui-design/images/site-mobbin.jpg)

![Dribbble — Cộng đồng designer](/zh-cn/stage-2/frontend/ui-design/images/site-dribbble.jpg)

![Behance — Thư viện case study dự án hoàn chỉnh](/zh-cn/stage-2/frontend/ui-design/images/site-behance.jpg)

::: tip 💡 Xây dựng thư viện tham khảo của riêng bạn
Gặp trang web khiến bạn rung động, **hãy lập tức chụp ảnh + lưu link**, phân loại lưu trữ theo "landing page / component / phối màu / hiệu ứng động". Khi mô phỏng, chọn mục tiêu trực tiếp từ thư viện này, nhanh hơn nhiều so với lên mạng tìm.
:::

### 1.3 Tham khảo vs Sao chép: một ranh giới rõ ràng

| Khía cạnh | Tham khảo (khuyến nghị ✅) | Sao chép (nguy hiểm ❌) |
| :--- | :--- | :--- |
| Đối tượng | Cấu trúc bố cục, phong cách thị giác, quy trình thiết kế | Logo thương hiệu, icon độc quyền, minh họa gốc |
| Cách làm | Hiểu rồi làm lại, tích hợp vào sản phẩm của mình | Sao chép trực tiếp tài liệu, code, hình ảnh |
| Kết quả | Giống phong cách, nhưng nội dung hoàn toàn khác | Kể cả văn bản, phối màu, tài liệu đều y hệt |
| Rủi ro | Thấp | Bản quyền/rủi ro thương mại cao |

Chương 7 sẽ nói chuyên sâu về ranh giới bản quyền, trước tiên hãy nhớ một câu: **Chép "quy tắc" được, chép "kết quả" nguy hiểm.**

---

## Chương 2: Biết nhìn, mới thiết kế được — Phân tích một trang web

Tiền đề của "chép giống" là "nhìn hiểu". Chương này dạy bạn một khung phân tích trang web tổng quát.

![](/zh-cn/stage-2/frontend/ui-design/images/page-structure.jpg)

### 2.1 Nhìn cấu trúc: trang web gồm những khối nào

Đại đa số trang web hiện đại đều có thể phân ra làm 4 khối lớn:

```
┌─────────────────────────┐
│ ① Thanh điều hướng Nav    │  Logo · Menu · Đăng nhập/CTA
├─────────────────────────┤
│ ② Màn hình đầu Hero       │  Tiêu đề chính · Tiêu đề phụ · Nút chính · Ảnh sản phẩm
├─────────────────────────┤
│ ③ Khu vực nội dung Sections│  Thẻ tính năng · Hiển thị dữ liệu · Đánh giá · Giá
├─────────────────────────┤
│ ④ Chân trang Footer       │  Liên kết · Bản quyền · Đăng ký
└─────────────────────────┘
```

Khi nhìn một trang web, đừng vội để tâm đến chi tiết, **trước tiên hãy dùng mắt vẽ ra "bản xương" của nó**: đâu là thanh điều hướng, đâu là màn hình đầu, ở giữa chia thành mấy đoạn, mỗi đoạn có mấy phần tử.

### 2.2 Nhìn thị giác: 4 yếu tố có thể định lượng

| Yếu tố | Nhìn gì | Cách ghi nhớ |
| :--- | :--- | :--- |
| **Màu sắc** | Màu chính, màu nền, màu chữ lần lượt là gì | Dùng công cụ lấy màu trực tiếp lấy giá trị Hex |
| **Phông chữ** | Tiêu đề/nội dung dùng phông gì, cỡ bao nhiêu, đậm bao nhiêu | Xem font-family/size/weight trong DevTools của trình duyệt |
| **Khoảng cách** | Khoảng trắng giữa các khối, bên trong thẻ | Ghi nhớ nhịp 8 / 16 / 24 / 48 px thường dùng |
| **Bo góc và đổ bóng** | Bán kính bo góc và cường độ đổ bóng của thẻ, nút bấm | Xem border-radius / box-shadow trong DevTools |

::: tip 💡 Lợi thế thiên bẩy của thiết kế frontend
**Bạn là nhà phát triển frontend, DevTools chính là máy phân tích thiết kế của bạn.** Bấm phải → Kiểm tra phần tử, mọi giá trị màu, cỡ chữ, khoảng cách, bo góc của bất kỳ trang nào đều lộ ra hết. Đây là năng lực mà designer mơ ước, còn nhà phát triển lại có sẵn.

Các công cụ lấy màu thông dụng: bộ chọn màu của Chrome DevTools, các extension loại `color-picker`; cũng có thể trực tiếp gửi ảnh chụp màn hình cho mô hình đa phương thức, để nó giúp bạn trích xuất quy trình thiết kế.
:::

### 2.3 Nhìn component: tách ra "phụ tùng tái sử dụng"

Tách trang web thành từng component, mỗi component ghi lại các tham số style của nó:

```text
Nút bấm Primary Button
- Nền: #4F46E5
- Chữ: #FFFFFF, 14px / 600
- Bo góc: 8px
- Padding: 12px 24px
- Đổ bóng: 0 2px 8px rgba(79,70,229,0.3)

Thẻ Card
- Nền: #FFFFFF
- Bo góc: 16px
- Viền: 1px solid #E2E8F0
- Đổ bóng: 0 4px 12px rgba(15,23,42,0.08)
```

Sau khi tách 3-5 trang, trong tay bạn đã có một "thư viện style component" — đây chính là mô hình sơ khai của hệ thống thiết kế của riêng bạn.

### 2.4 "Dịch" thiết kế đã thấy thành "ngôn ngữ AI hiểu được"

Khi mô phỏng vào công cụ AI, bạn cần dịch hình ảnh thành mô tả có cấu trúc. **Nhìn càng kỹ, dịch càng chuẩn, AI chép càng giống.**

```text
Tham khảo phong cách của landing page này, giúp tôi tạo một trang đồng cấu trúc:
- Cấu trúc: Điều hướng + Màn hình đầu (Hero) + 3 thẻ tính năng + Khu vực giá + Chân trang
- Phối màu: Màu chính Indigo #4F46E5, nền #F8FAFC, chữ #0F172A
- Phông chữ: Tiêu đề Space Grotesk 700, nội dung Inter 400
- Khoảng cách: Khối 96px, trong thẻ 24px, lưới 24px
- Bo góc: Thẻ 16px, nút bấm 8px
- Đổ bóng: 0 4px 12px rgba(15,23,42,0.08)
```

---

## Chương 3: Toàn cảnh công cụ thiết kế frontend thời đại AI

"Vậy họ đã thiết kế ra sao?" Câu trả lời ngày càng đa dạng. Dưới đây là 2 đường điển hình, bao phủ từ "kiểm soát thủ công tỉ mỉ" đến "tự động tạo bằng hội thoại".

![](/zh-cn/stage-2/frontend/ui-design/images/ai-design.jpg)

### 3.1 Đường 1: Figma / MasterGo — công cụ bản thiết kế chuyên nghiệp

Nếu bạn cần **bản thiết kế có thể chỉnh sửa, cộng tác, kiểm soát pixel-level**, hãy dùng Figma (chuẩn quốc tế) hoặc MasterGo (nội địa, dễ dùng hơn):

- Dựng layout, chỉnh component, làm prototype tương tác trên canvas
- Thông qua các năng lực như Figma Make / MasterGo AI hỗ trợ tạo và điều chỉnh hàng loạt
- Cuối cùng giao cho frontend hiện thực theo bản thiết kế, hoặc qua plugin chuyển sang code

![Trình biên tập Figma: bảng layer bên trái, canvas ở giữa, bảng thuộc tính bên phải](/zh-cn/stage-2/frontend/ui-design/images/figma_editor.jpg)

![Trình biên tập MasterGo: công cụ thiết kế đám mây nội địa, bố cục canvas tương tự Figma](/zh-cn/stage-2/frontend/ui-design/images/mastergo_editor.jpg)

> Phù hợp: các kịch bản cần bàn giao bản thiết kế nghiêm ngặt, cộng tác nhóm, tương tác phức tạp. Thao tác chi tiết xem [Nhập môn Figma và MasterGo](../figma-mastergo/).

### 3.2 Đường 2: Claude Design / Open Design — canvas thiết kế theo hội thoại

Điểm chung của loại công cụ này là **dùng ngôn ngữ tự nhiên trực tiếp tạo prototype thiết kế có thể tương tác**, chứ không phải hình ảnh tĩnh. Đại diện là Claude Design và bản thay thế mã nguồn mở Open Design.

#### Claude Design: canvas thiết kế theo hội thoại chính thức

Claude Design là sản phẩm thiết kế AI do Anthropic ra mắt (cổng vào `claude.ai/design`):

- Nhập một câu yêu cầu, mặc định tạo ra 3 biến thể thiết kế, bao phủ landing page, wireframe, bài thuyết trình v.v.
- Hỗ trợ nhập hệ thống thiết kế (kho GitHub, xuất từ Figma, ảnh chụp website, file thương hiệu), tự động trích xuất màu/phông chữ/component
- Trong canvas trực tiếp nhận xét sửa đổi, kéo thả tinh chỉnh, cuối cùng xuất HTML / PDF / PPTX, hoặc bàn giao cho Claude Code hiện thực thành code thật

**Kịch bản sử dụng điển hình:**

**① Tái hiện trực tiếp trang high-fidelity từ ảnh tham khảo (thường dùng nhất)**

Nhập mô tả sản phẩm và tham khảo phong cách, Claude tự động tạo landing page hoàn chỉnh — bên trái ghi lại prompt và quá trình tạo, bên phải canvas render kết quả theo thời gian thực.

```text
Create a high-fidelity landing page designed to raise $500,000 from angel investors
for "雾屿咖啡 Mist Island Coffee" - a boutique specialty coffee shop that combines
premium coffee, quiet workspaces, and warm community events.
Tone should feel warm, premium, calm, and trustworthy - think a mix of Blue Bottle
Coffee + Apple Store + minimalist lifestyle design.
```

![Claude Design tạo thực tế: landing page high-fidelity của Mist Island Coffee, bên trái hội thoại + tiến độ, bên phải canvas render khu vực Hero hoàn chỉnh](/zh-cn/stage-2/frontend/ui-design/images/claude_case_landing.jpg)

**② Mặc định tạo 3 biến thể thiết kế, chọn hướng rồi tinh chỉnh**

Claude Design không chỉ đưa một câu trả lời, mà mặc định tạo nhiều hướng để bạn chọn — phong cách Editor, phong cách Museum, phong cách Zine v.v., bấm vào rồi tinh chỉnh thêm.

![Case thực tế: phóng viên PCWorld để Claude giải thích khái niệm AI Tokens, trả về ba phong cách Editorial / Museum / Field Notes để chọn](/zh-cn/stage-2/frontend/ui-design/images/claude_case_variants.jpg)

**③ Tạo prototype tương tác (không chỉ là ảnh tĩnh)**

Trang tạo ra là HTML thực sự có thể bấm, có thể nhập — nút bấm có hiệu ứng hover, form có thể nhập, dữ liệu được tính toán theo thời gian thực.

![Trang giải thích Token được tạo thực tế: tích hợp bộ tách từ theo thời gian thực, nhập câu vào là các khối màu highlight từng token, đáy thống kê số ký tự/từ/token](/zh-cn/stage-2/frontend/ui-design/images/claude_case_interactive.jpg)

**④ Làm bài thuyết trình/PPT sản phẩm**

Không chỉ làm được trang web, còn tạo được slide hoàn chỉnh (nhiều trang, có điều hướng, xuất được PDF/PPTX).

![Tạo thực tế: Pitch Deck thương hiệu cà phê, bên trái liệt kê dàn ý 13 trang, bên phải render nội dung slide hiện tại, đáy có thể lật trang](/zh-cn/stage-2/frontend/ui-design/images/claude_case_slide.jpg)

**⑤ Tạo video hoạt hình**

Thông qua "From template" có thể tạo video HTML có animation — kịch bản phân cảnh + khung hình hoạt hình được render thực tế, có thanh điều khiển phát.

![Tạo thực tế: video hoạt hình làm cà phê 45 giây, bên trái liệt kê lịch trình phân cảnh, bên phải canvas phát hoạt hình (hạt cà phê → rang → pha)](/zh-cn/stage-2/frontend/ui-design/images/claude_case_video.jpg)

**⑥ Lặp lại thiết kế hiện có (trực tiếp nhận xét trên canvas)**

Sau khi tạo prototype, không cần viết lại prompt, bấm trực tiếp nút Comment khoanh chọn phần tử để viết nhận xét, Claude sẽ sửa cục bộ.

![Trên canvas bấm nút Comment, khoanh chọn bất kỳ phần tử nào rồi hiện khung nhận xét, viết "Suggest to Claude" là có thể lặp lại cục bộ](/zh-cn/stage-2/frontend/ui-design/images/claude_case_comment.jpg)

**⑦ Thiết kế trang App di động**

Hỗ trợ chỉ định kích thước thiết bị (ví dụ iPhone), tạo prototype UI di động có khung thiết bị.

![Tạo thực tế: giao diện App tính điểm cricket (Tracket) di động — Header tối + hiển thị tỷ số + nút thao tác, thiết kế tương phản cao cho kịch bản trời nắng ngoài trời](/zh-cn/stage-2/frontend/ui-design/images/claude_case_mobile.jpg)

![Tổng quan canvas Claude Design: bên trái hội thoại, bên phải bảng Tweaks có thể điều chỉnh theme, breakpoint, màu sắc theo thời gian thực](/zh-cn/stage-2/frontend/ui-design/images/claude_design_canvas.jpg)

> Phù hợp: những người không có nền tảng thiết kế, muốn bỏ qua đường cong học tập của Figma, nhanh chóng có được prototype tương tác.

#### Open Design: bản thay thế mã nguồn mở của Claude Design

Nếu bạn không muốn đăng ký, hoặc coi trọng quyền riêng tư dữ liệu hơn, có thể thử Open Design (dự án mã nguồn mở nexu-io). Nó cùng một đường với Claude Design: **tạo prototype thiết kế theo hội thoại**, điểm khác là **ưu tiên local, BYOK (mang theo Key mô hình riêng), không gắn với bất kỳ Agent nào**.

Nó có hai khái niệm cốt lõi:

| Khái niệm | Giải thích | Giá trị đối với bạn |
| :--- | :--- | :--- |
| **Skills (kỹ năng)** | 16 kỹ năng thiết kế dạng chỉ dẫn (văn bản, phối màu, chỉ đạo sáng tạo, động não…) | Một skill = một mẫu tác vụ chuyên nghiệp |
| **Templates (mẫu)** | 288 mẫu có thể chạy (prototype, slide, hiệu ứng động…), đều kèm `example.html` | fork về đổi dữ liệu là có thể giao hàng |
| **Design Systems (hệ thống thiết kế)** | 151 bộ hệ thống thiết kế có thể di chuyển (bảng màu, phông chữ, hiệu ứng động, văn phong) | Một câu là áp dụng được quy trình thị giác của công ty lớn |

Nó sẽ phát hiện coding Agent cục bộ của bạn (Claude Code, Codex, Cursor, Qwen, Kimi…, chính thức thông báo hỗ trợ 21 loại) làm "công cụ thiết kế" — **Agent hiện có của bạn chính là designer**. Ngoài ra, các **UI design Skill** trong hệ sinh thái công cụ như Claude Code (ví dụ frontend-design) cũng có thể đóng gói quy trình thiết kế thành chỉ dẫn mà AI có thể thực thi, để AI xuất ra theo đúng quy trình.

**Kịch bản sử dụng điển hình:**

**① Tạo dự án mới: chọn Skill + hệ thống thiết kế + độ chính xác**

Khi tạo prototype, có thể chọn wireframe hoặc high-fidelity, chỉ định nền tảng đích (Web responsive / di động v.v.), và chọn một bộ từ hơn 150 hệ thống thiết kế tích hợp sẵn làm nền tảng thị giác.

```text
Dùng Open Design, áp dụng hệ thống thiết kế của Linear, tạo HTML landing page cho sản phẩm SaaS
```

![Hộp thoại tạo mới prototype Open Design: giao diện tiếng Trung, có thể chọn prototype/slide/media, chuyển wireframe/high-fidelity, chọn hệ thống thiết kế và nền tảng đích](/zh-cn/stage-2/frontend/ui-design/images/od_case_create.jpg)

![Open Design tích hợp sẵn hơn 150 bộ hệ thống thiết kế (Agentic, Airbnb, Airtable, Linear, Stripe, Vercel…), phân nhóm theo loại, mỗi bộ đều có bảng màu xem trước và giải thích](/zh-cn/stage-2/frontend/ui-design/images/od_case_designsystems.jpg)

**② Không gian làm việc Studio: hội thoại dẫn dắt, tạo theo thời gian thực**

Bên trái là bảng hội thoại (hiển thị các bước suy nghĩ của AI, danh sách Todo, thao tác Write), bên phải là canvas iframe render kết quả theo thời gian thực — giống Claude Design, nhưng đáy hiển thị CLI Agent cục bộ đang gọi (như Claude Code, Codex, deepseek v.v.).

![Không gian làm việc Open Design Studio: bên trái bảng Chat hiển thị kế hoạch và tiến độ tạo, bên phải canvas render trang bìa chữ lớn "Open Design" (chế độ slide), trên đầu có thể chuyển Preview/Source/Comment/Edit](/zh-cn/stage-2/frontend/ui-design/images/od_case_studio.jpg)

**③ Áp dụng hệ thống thiết kế tạo slide/PPT**

Chọn loại Slide deck, nhập chủ đề là có thể tạo slide hoàn chỉnh nhiều trang. Hình dưới là slide thuyết trình tiếng Trung do người dùng cộng đồng tạo bằng Open Design.

![Case người dùng thật: trang bìa slide thuyết trình "Công ty một người · Tổ chức bị AI gấp lại" — nền tối, tiêu đề chữ lớn serif, thông tin người thuyết trình, thanh số trang ở đáy](/zh-cn/stage-2/frontend/ui-design/images/od_case_deck.jpg)

**④ Tạo prototype App di động high-fidelity**

Hỗ trợ xem trước nhiều màn hình cùng lúc, tự động tạo khung thiết bị iPhone, thành phần như Tab bar, bố cục thẻ, thanh tiến độ đều đầy đủ.

![Case tạo thật: App quản lý cuộc sống gamified (Level) — xem trước 3 màn hình song song, gồm trang chủ nhiệm vụ hằng ngày, bảng điều khiển phân loại nhiệm vụ, trang chi tiết nhiệm vụ, chế độ sáng, thẻ màu](/zh-cn/stage-2/frontend/ui-design/images/od_case_mobile.jpg)

**⑤ Dùng UI design Skill chuẩn hóa đầu ra của AI**

Cài Skill như frontend-design cho Claude Code / Cursor, AI viết trang sẽ tự động tuân thủ quy trình thiết kế:

```text
# Gọi trong Claude Code
/frontend-design giúp tôi hiện thực một trang đăng nhập
→ Tự động xuất ra theo quy trình thiết kế tích hợp trong Skill:
   - Màu sắc: Màu chính #4F46E5, Thành công #10B981, Lỗi #EF4444
   - Khoảng cách: lưới 8px cơ sở
   - Component: Button / Input / Form đạt chuẩn khả năng tiếp cận
   - Responsive: thích ứng ba nền tảng di động / máy tính bảng / desktop
```

**⑥ Dự án riêng tư cục bộ không ra mạng**

Dự án nội bộ công ty, thiết kế sản phẩm chứa dữ liệu nhạy cảm, tất cả file đều xử lý tại cục bộ, mô hình có thể đi qua triển khai cục bộ hoặc BYOK:

```text
# Khởi động cục bộ Open Design, mô hình đi qua Qwen triển khai cục bộ
OPENAI_API_KEY=your-local-key OPENAI_BASE_URL=http://localhost:8000/v1 \
opendesign
# Tất cả file thiết kế được lưu cục bộ trong ~/.open-design/, không đi qua bất kỳ máy chủ bên thứ ba nào
```

![Giao diện chính Open Design: chọn Skill (prototype/slide/ảnh/video…) + nhập yêu cầu là có thể tạo, CLI Agent cục bộ tự động làm công cụ](/zh-cn/stage-2/frontend/ui-design/images/opendesign_home.jpg)

> Phù hợp: các nhà phát triển coi trọng quyền riêng tư dữ liệu, đã có coding Agent, muốn kiểm soát hoàn toàn quy trình thiết kế.

### 3.3 Chọn hai đường như thế nào

| Hạng mục so sánh | Đường 1: Figma / MasterGo | Đường 2: Claude Design / Open Design |
| :--- | :--- | :--- |
| Định vị | Công cụ bản thiết kế chuyên nghiệp | Canvas thiết kế AI theo hội thoại |
| Công cụ đại diện | Figma, MasterGo | Claude Design (chính thức), Open Design (thay thế mã nguồn mở) |
| Sản phẩm đầu ra | Bản thiết kế có thể chỉnh sửa | Prototype HTML tương tác |
| Độ khó làm quen | ⭐⭐ Trung bình | ⭐ Thấp |
| Chi phí | Bản miễn phí dùng được | Claude Design cần đăng ký; Open Design mã nguồn mở miễn phí (BYOK) |
| Phù hợp | Bàn giao nghiêm ngặt và cộng tác | Xác minh prototype nhanh, ưu tiên quyền riêng tư |

::: tip 💡 Cách kết hợp trong thực tế
**Tham khảo → Thiết kế → Bàn giao** toàn bộ quá trình có thể trộn dùng: dùng Claude Design / Open Design nhanh chóng ra hướng và prototype → sau khi chốt bản nhập vào Figma/MasterGo tinh chỉnh → bàn giao cho Claude Code viết code. Mỗi đường lấy dài bù ngắn.
:::

![](/zh-cn/stage-2/frontend/ui-design/images/design-tools.jpg)

---

## Chương 4: Thực hành 1: mô phỏng "trang web của người khác" đến giống

Mục tiêu rất cụ thể: **chọn một trang web thực tế bạn thích, mô phỏng đến "giống".** Ở đây lấy landing page làm ví dụ.

![](/zh-cn/stage-2/frontend/ui-design/images/design-workspace.jpg)

### Bước 1: Chọn mục tiêu

Chọn một landing page có cấu trúc rõ ràng, bạn có hứng thú (trang chủ SaaS, trang giới thiệu sản phẩm đều được). Lưu lại ảnh chụp và link của nó.

### Bước 2: Dùng khung Chương 2 để phân tích

Trong trình duyệt bấm phải → Kiểm tra, ghi lại theo 4 bước:

```text
Mục tiêu: landing page trang chủ của một SaaS nào đó
① Cấu trúc: Điều hướng(Logo/Menu/CTA) → Hero(Tiêu đề/Tiêu đề phụ/Nút/Ảnh chụp) → 3 thẻ tính năng → Giá(3 mức) → Chân trang
② Màu sắc: Màu chính #0F172A tối, nhấn #6366F1, nền #FFFFFF / #F8FAFC
③ Phông chữ: Tiêu đề Inter 800 48px, nội dung Inter 400 16px
④ Component: Nút bấm bo góc 8px/đặc, thẻ bo góc 16px/nền xám nhạt/không viền
```

### Bước 3: Đưa cho công cụ thiết kế AI, tạo phiên bản đầu

Gửi kết quả phân tích cho Claude Design / Open Design, để nó tạo theo quy trình này:

```text
Tạo một landing page đồng cấu trúc theo quy trình thiết kế sau:
[dán bản ghi phân tích ở Bước 2]
Sản phẩm: dự án của tôi (một câu giải thích mục đích)
Yêu cầu: tuân thủ pixel-level các quy chuẩn màu, phông chữ, khoảng cách, bo góc trên
```

Phiên bản đầu thường là "thần đồng mà hình không giống" — cấu trúc đúng, chi tiết có sai lệch. **Đây không phải thất bại, mà chính là thứ cho bạn biết nên chỉnh ở đâu tiếp theo.**

### Bước 4: Đối chiếu từng khối, lặp lại sửa đổi

Đặt ảnh tham khảo và kết quả tạo song song, đối chiếu từng khối, dùng "lệnh sửa đổi" để tiến gần đến:

| Vấn đề phát hiện | Lệnh sửa đổi |
| :--- | :--- |
| Màu chính hơi sáng | "Đổi màu chính thành #0F172A, màu nhấn #6366F1" |
| Bo góc nút bấm không đúng | "Tất cả nút bấm thống nhất bo góc 8px, nền đặc" |
| Khoảng cách quá chật | "Đổi khoảng cách khối thành 96px, padding trong thẻ 24px" |
| Phông chữ không đúng | "Tiêu đề đổi thành Inter 800, nội dung Inter 400" |
| Thừa phần tử trang trí | "Bỏ trang trí nền, chỉ giữ nội dung cốt lõi" |

### Bước 5: Tiêu chuẩn nghiệm thu — "giống"

Làm sao biết mình đã nhập môn? Hãy đặt cho mình một tiêu chuẩn khách quan:

- [ ] Chụp hai ảnh: trang web gốc vs bản mô phỏng của bạn
- [ ] Đặt hai ảnh song song, phóng to, so sánh từng pixel
- [ ] Giá trị màu, cỡ chữ, khoảng cách, bo góc **mắt thường không thấy khác biệt bố cục**
- [ ] Thu nhỏ xuống 50% rồi so sánh, vẫn không phân biệt được bản gốc là cái nào

> 💡 **"Giống" không phải mục đích, mà là phương tiện.** Sau khi mô phỏng 2-3 website có phong cách hoàn toàn khác nhau, bạn sẽ tự nhiên tích lũy được một "cảm giác thiết kế": khi nào nên khoảng trắng lớn, khi nào nên bão hòa cao, khi nào nên thu hẹp bo góc. Lúc này mô phỏng trang mới, tốc độ sẽ nhanh hơn nhiều.

---

## Chương 5: Thực hành 2: từ thiết kế đến code

Bản thiết kế/prototype mô phỏng ra, cuối cùng phải trở thành trang thật trong sản phẩm. Hai đường bàn giao:

![](/zh-cn/stage-2/frontend/ui-design/images/design-to-code.jpg)

### 5.1 Đường A: công cụ thiết kế AI → code frontend

- **Claude Design**: sau khi chốt trên canvas, dùng `/design-sync` đồng bộ sang Claude Code, viết tiếp code từ thiết kế, không cần làm lại từ ảnh chụp
- **Open Design**: có thể trực tiếp xuất HTML, rồi giao cho Agent cải tạo thành component của dự án
- **Figma/MasterGo**: thông qua plugin hoặc MCP xuất code React / Vue

### 5.2 Đường B: ảnh chụp → mô hình đa phương thức tái hiện

Đơn giản nhất: gửi trực tiếp ảnh chụp thiết kế đã mô phỏng cho mô hình đa phương thức, "tái hiện thành React component", từng khối hiện thực.

> So sánh chi tiết ba đường "từ thiết kế sang code", xem [Từ prototype thiết kế đến code dự án](../design-to-code/). Muốn nâng cao hiệu quả engineering ở cấp component, có thể xem thêm [Dùng thư viện component hiện đại cập nhật giao diện của bạn](../modern-component-library/).

---

## Chương 6: Biến hệ thống thiết kế của công ty lớn thành của bạn

Sau khi mô phỏng 3 trang bạn sẽ phát hiện: **đằng sau trang web đẹp đều có một "hệ thống thiết kế" ổn định.** Thay vì tự tạo từ 0, không bằng đứng trên vai người khổng lồ.

![](/zh-cn/stage-2/frontend/ui-design/images/design-system.jpg)

### 6.1 Thế nào là "hệ thống thiết kế có thể di chuyển"

Open Design đóng gói hệ thống thiết kế thành file `DESIGN.md` (Linear, Vercel, Stripe, Apple, Cursor, Figma…), còn Claude Design tự động trích xuất từ kho code/file thiết kế của bạn. Về bản chất chúng đều là một thứ:

```text
DESIGN.md  =  Token màu + Quy chuẩn phông chữ + Nhịp khoảng cách + Style component + Quy ước sử dụng
```

Một ví dụ cấu trúc thực tế:

```markdown
# Design System: Linear

## Colors
- background: #08090A
- primary: #5E6AD2
- text: #F7F7F8

## Typography
- heading: 22px / 600, letter-spacing -0.4px
- body: 14px / 400

## Radius
- card: 8px
- button: 6px

## Spacing
- 4 / 8 / 12 / 16 / 24 / 32 px

## Do / Don't
- Do: 大量留白，克制用色
- Don't: 不使用渐变、不使用阴影堆叠
```

### 6.2 Ba bước xây dựng hệ thống thiết kế của riêng bạn

1. **Chọn nền tảng**: áp dụng một hệ thống thiết kế của công ty lớn mà bạn công nhận (như sự tối giản tối màu của Linear, khoảng trắng của Apple)
2. **Đổi tham số**: thay màu chính bằng màu thương hiệu của bạn, điều chỉnh bo góc và khoảng cách
3. **Đúc kết thành file**: lưu thành `DESIGN.md` hoặc Skill, để AI mỗi lần tạo đều tự động tuân thủ

### 6.3 Nâng cao: dùng UI design Skill cố định phong cách

Sau khi đóng gói hệ thống thiết kế thành Skill, một câu là gọi được:

```text
Dùng quy trình thiết kế của skill my-brand, tạo phương án màn hình đầu cho 3 trang tính năng
```

Cách tạo và sử dụng Skill, xem chi tiết [Dùng LLM và Skills làm giao diện đẹp hơn](../llm-skills-beautiful/).

---

## Chương 7: Bản quyền và đạo đức

Năng lực mô phỏng càng mạnh, càng phải giữ ranh giới:

![](/zh-cn/stage-2/frontend/ui-design/images/copyright.jpg)

**Chép quy tắc, không chép kết quả.** Bố cục, phối màu, khoảng cách là những "quy tắc" có thể học; Logo, icon, minh họa, văn bản là những "kết quả" không nên sao chép trực tiếp.

**Dự án thương mại phải cẩn trọng.** Trước khi bàn giao thương mại cần xác nhận: bản quyền tài liệu, giấy phép phông chữ (phông thương mại cần mua), điều khoản sử dụng của trang web tham khảo.

**Quyền sở hữu nội dung do AI tạo.** Các điều khoản của các nền tảng khác nhau (Claude Design, Open Design v.v.) khác nhau, trước khi dùng thương mại hãy xem thỏa thuận dịch vụ.

**Ghi chú sự tham gia của AI.** Một số nền tảng/quy định yêu cầu công khai nội dung do AI tạo ra.

**Kiểm duyệt cuối cùng.** Các kịch bản nhạy cảm như nhận diện thương hiệu, tài liệu quảng cáo bắt buộc phải xét duyệt bằng người.

::: tip 💡 Đề xuất
Giai đoạn học tập và prototype cứ thoải mái mô phỏng; **khi vào bàn giao thương mại, hãy biến "tham khảo" thành "tái sáng tạo từ hệ thống thiết kế của riêng bạn", và giữ lại bản ghi quá trình tạo**.
:::

---

## Tổng kết

Chương này đưa "nhập môn thiết kế frontend" vào một đường đi có thể thực thi:

1. **Tâm thế**: nhập môn thiết kế frontend bắt đầu từ việc "chép", chép quy tắc, không chép kết quả
2. **Nhìn**: dùng ba lớp cấu trúc (4 khối lớn) + thị giác (màu sắc/phông chữ/khoảng cách/bo góc) + component để phân tích bất kỳ trang nào, DevTools là máy phân tích của bạn
3. **Công cụ**: 2 đường — Figma/MasterGo (bản thiết kế tỉ mỉ), Claude Design / Open Design + UI design Skills (prototype theo hội thoại)
4. **Mô phỏng**: chọn mục tiêu → phân tích → tạo → lặp lại từng khối → nghiệm thu so sánh pixel-level
5. **Đúc kết**: cải tạo DESIGN.md của công ty lớn thành hệ thống thiết kế của bạn, rồi dùng Skill cố định lại

::: tip 💡 Hành động tiếp theo
Hôm nay hãy hoàn thành một lần mô phỏng trọn vẹn:
1. Tìm một landing page bạn muốn "chép", dùng DevTools tách ra màu sắc/phông chữ/khoảng cách/bo góc của nó
2. Dùng Claude Design hoặc Open Design tạo phiên bản đầu, sửa từng khối đến "giống"
3. Giao bản chốt cho AI biến thành code, và tiện tay lưu một bản DESIGN.md của riêng mình
:::

<RelatedArticlesSection
  title="Bài viết liên quan"
  description="Tiếp tục đào sâu thiết kế AI, sản xuất tài liệu và thực hành chuyển thiết kế sang code."
  :items="relatedArticles"
/>
