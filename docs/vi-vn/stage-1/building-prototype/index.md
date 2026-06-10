---
title: 'Tự tay làm nguyên mẫu - từ phân tích nghiệp vụ đến prototype nhiều trang'
description: 'Trải nghiệm vòng khép kín từ phân tích nghiệp vụ đến xây dựng prototype sản phẩm nhiều trang. Học cách hỏi nghiệp vụ, tách nhu cầu, dùng AI IDE tạo ứng dụng một trang và nhiều trang, rồi làm đẹp và kiểm thử prototype.'
---

<script setup>
import { relatedArticlesMap } from '@theme/data/relatedArticles'

const duration = 'khoảng <strong>8 giờ</strong>'
const relatedArticles =
  relatedArticlesMap['vi-vn/stage-1/building-prototype'] ?? []
</script>

# Sơ cấp 3: Tự tay làm nguyên mẫu

## Dẫn nhập chương

<ChapterIntroduction :duration="duration" :tags="['Phân tích nghiệp vụ', 'Thiết kế prototype', 'Lập trình với AI', 'Ứng dụng nhiều trang']" coreOutput="1 prototype bàn làm việc nội dung thương mại điện tử" expectedOutput="Prototype Web có thể tương tác">

Ở chương trước, chúng ta đã học cách <strong>tìm một ý tưởng tốt</strong>: bắt đầu từ nhu cầu người dùng và tìm hướng có người sẵn sàng trả tiền. Nhưng tìm được hướng mới chỉ là bước đầu. Thử thách thật sự là: <strong>làm thế nào biến một nhu cầu mơ hồ thành một sản phẩm dùng được</strong>.

Trong chương này, ta xử lý một vấn đề rất thực tế: sếp nói "hãy dùng AI để tăng hiệu suất đăng sản phẩm lên nền tảng thương mại điện tử". Bạn sẽ biến câu nói đó thành <strong>một prototype sản phẩm có thể thao tác</strong> như thế nào?

Khác với trò rắn săn mồi hay máy tính bỏ túi, nghiệp vụ thật không thể nghĩ chức năng trong phòng kín. Ta cần:

1. <strong>Làm rõ điểm đau</strong>: nói chuyện với vận hành để tìm vấn đề thật phía sau câu "tăng hiệu suất".
2. <strong>Chọn phần quan trọng nhất</strong>: trong nhiều vấn đề, làm trước điểm đau nhất.
3. <strong>Kiểm chứng nhanh</strong>: dùng AI IDE tạo prototype một trang trước, chạy được rồi mới mở rộng.
4. <strong>Làm ra thứ dùng được</strong>: cuối cùng có một bàn làm việc nội dung thương mại điện tử có thể demo và thao tác.

Mục tiêu của chương là chuyển từ "làm đồ chơi" sang "làm ứng dụng", đồng thời học cách đồng cảm và suy nghĩ về nhu cầu thật của khách hàng.

</ChapterIntroduction>

::: info Ghi chú
Trong bài có một số thuật ngữ nghiệp vụ. Nếu chưa hiểu, hãy hỏi AI giải thích bằng ngôn ngữ đơn giản.
:::

<div style="margin: 50px 0;">
  <ClientOnly>
    <StepBar :active="0" :items="[
      { title: 'Phân tích nhu cầu', description: 'Từ mơ hồ đến cụ thể' },
      { title: 'Kiểm chứng một trang', description: 'Làm ra lõi trải nghiệm' },
      { title: 'Mở rộng nhiều trang', description: 'Hoàn thiện cấu trúc ứng dụng' },
      { title: 'Làm đẹp và hoàn thiện', description: 'Nâng trải nghiệm người dùng' }
    ]" />
  </ClientOnly>
</div>

## 1. Xác định nhu cầu trước khi viết code

Trong các bài trước, ta dùng AI IDE để tạo trò chơi nhỏ rất nhanh. Nhưng đó chủ yếu là dự án tự dùng. Nếu muốn năng lực AI thật sự phục vụ công việc và đời sống, ta phải đặt vibe coding vào một bối cảnh cụ thể.

Khi làm sản phẩm thật, khoảng cách giữa "biết muốn làm gì" và "biết phải làm thế nào" rất lớn. Khoảng cách đó chính là quá trình cụ thể hóa nhu cầu.

Trong dự án cá nhân, ta thường bắt đầu bằng một chức năng đơn giản:

- "Làm một bảng Kanban để liệt kê nhiệm vụ."
- "Làm một công cụ vẽ."
- "Làm một phần mềm thu thập khảo sát."

Những câu này thường chỉ mô tả một công cụ hoặc một module, chưa chắc đã là vấn đề nghiệp vụ rõ ràng. Quan trọng hơn: chúng có thể chỉ là "mình thấy hữu ích", chứ chưa chắc người dùng thật sự cần.

Trong dự án doanh nghiệp hoặc khởi nghiệp, sản phẩm thường bắt đầu từ một đề bài rộng hơn. Ví dụ:

<el-card shadow="hover" style="border-left: 5px solid #409EFF; background-color: #ecf5ff; margin: 20px 0;">
  <div style="font-weight: bold; color: #303133; margin-bottom: 10px;">Kịch bản nghiệp vụ:</div>
  <div style="color: #606266; line-height: 1.6;">
    <p>Bạn là product manager phụ trách vận hành thương mại điện tử của một cửa hàng. Sếp giao một đề bài khá mơ hồ nhưng áp lực:</p>
    <p style="font-style: italic; margin-top: 10px;">"Bây giờ ai cũng nói dùng AI làm ảnh và viết copy rất dễ. Em nghiên cứu thử, làm sao để khi chúng ta đăng sản phẩm mới lên Douyin Ecommerce thì hiệu suất cao hơn."</p>
  </div>
</el-card>

Phản ứng đầu tiên có thể là: đưa câu này cho AI Agent và yêu cầu nó thiết kế một bàn làm việc nội dung. Ví dụ:

```txt
Hãy dựa trên nhu cầu của tôi,
thiết kế một bàn làm việc nội dung thương mại điện tử,
bao gồm tạo và quản lý mô tả sản phẩm, ảnh, video và các tài nguyên khác.
```

Nếu làm ngay như vậy rồi đem đi trình bày, khả năng cao kết quả sẽ không dùng được. Lý do là:

- **Bạn chưa phải người dùng thật**: sếp nói "hiệu suất cao hơn", nhưng bạn chưa biết vận hành đang làm gì mỗi ngày và đang kẹt ở đâu.
- **AI cũng không hiểu nghiệp vụ của bạn**: yêu cầu mơ hồ sẽ khiến AI đoán theo kiến thức chung.
- **Ý tưởng tốt không tự động thành sản phẩm tốt**: thêm một chức năng AI nhìn có vẻ hay, nhưng có thể làm quy trình rối hơn.

Vì vậy, trước khi viết code, cần học cách đi từ ý tưởng đến hiểu người dùng.

### 1.1 Từ tưởng tượng đến thực tế: học cách hỏi nghiệp vụ

::: info Nhu cầu và nghiệp vụ là gì?

**Nhu cầu** là điều người dùng thật sự muốn giải quyết: rắc rối, mục tiêu, hoặc áp lực của họ. Ví dụ "đăng sản phẩm nhanh hơn" là một nhu cầu.

**Nghiệp vụ** là cách người dùng đang làm việc mỗi ngày: đăng sản phẩm, sửa giá, làm ảnh, xem dữ liệu, theo dõi chiến dịch.

Nếu không hiểu nghiệp vụ, công cụ rất dễ rơi vào trạng thái "nhìn hay nhưng không ai dùng".

:::

Bạn có thể bắt đầu bằng vài câu hỏi đơn giản:

- "Hiệu suất cao hơn" cụ thể là nhanh hơn, ít tốn tiền hơn, hay bán được nhiều hơn?
- Hiện tại quy trình đăng sản phẩm diễn ra như thế nào?
- Mỗi ngày có bao nhiêu sản phẩm mới? Mỗi sản phẩm cần bao nhiêu ảnh và bao nhiêu chữ?
- Việc nào tốn thời gian nhất, khó chịu nhất, hoặc bị phàn nàn nhiều nhất?

Sau khi hỏi người làm vận hành, ta có thể thu được vài nhận xét:

::: info Kết quả phỏng vấn nghiệp vụ

**1. Công việc quá nhiều và quá vụn**

- Một người phải quản lý nhiều cửa hàng, mỗi cửa hàng có nhiều sản phẩm.
- Mỗi ngày phải đăng hàng mới, sửa giá, làm ảnh, xem dữ liệu, việc này chưa xong đã đến việc khác.

**2. Nội dung không phải làm một lần là xong**

- Ban đầu thường dùng ảnh nhà cung cấp, tư liệu cũ hoặc ảnh tham khảo trên mạng để đăng thử nhanh.
- Chạy quảng bá nhỏ để xem có ai mua không.
- Chỉ khi sản phẩm bán tốt mới đầu tư làm ảnh, viết chi tiết, quay video.

:::

Đến đây vẫn chưa nên làm tất cả. Nếu cố thỏa mãn mọi yêu cầu trong một lần, sản phẩm sẽ quá lớn và khó hoàn thành trong thời gian học. Cần tiếp tục thu hẹp phạm vi.

### 1.2 Từ mở rộng đến thu hẹp: khóa điểm đau cốt lõi

::: info Vì sao cần thu hẹp?

Người dùng có thể nói rất nhiều vấn đề. Nhưng nếu cố làm hết A, B, C cùng lúc, ta thường không làm tốt được vấn đề nào. Thu hẹp nghĩa là chọn một điểm đau cấp bách, cụ thể và có thể giải quyết trước.

**Điểm đau** là việc khiến người dùng tốn thời gian, khó chịu và muốn giải quyết nhất, không phải điều ta tự tưởng tượng là hữu ích.

:::

Qua phỏng vấn, vấn đề vận hành gặp phải có thể chia thành ba nhóm:

1. **Nhịp vận hành**: khi nào đăng hàng, khi nào điều chỉnh giá.
2. **Hiệu suất quản lý**: làm sao quản lý nhiều cửa hàng và nhiều sản phẩm.
3. **Nội dung**: làm sao tạo ảnh sản phẩm và copy nhanh hơn.

Với bài học này, ta chọn nhóm thứ ba. Sau khi hỏi kỹ hơn, có hai điểm đau nổi bật:

::: info Hai điểm đau khi làm nội dung

**Điểm đau 1: Làm ảnh và copy hàng loạt quá mất công**

- Tư liệu nằm rải rác ở ổ đám mây, lịch sử chat, backend nền tảng.
- Một lần phải đăng nhiều sản phẩm, không đủ thời gian làm từng cái thật đẹp.
- Giai đoạn thử nghiệm chỉ cần "nhìn ổn, đăng được", chưa cần hoàn hảo.

**Điểm đau 2: Cách làm tốt không lưu lại để dùng lại được**

- Tiêu đề, bố cục hoặc copy từng dùng tốt rất khó tìm lại.
- Mẫu nằm trong chat cũ hoặc link sản phẩm cũ.
- Khi cần lại phải lục, copy, sửa rất lâu.
- Cần một công cụ để lưu, quản lý và áp dụng lại mẫu.

:::

Vì vậy, prototype đầu tiên chỉ cần làm hai việc:

::: info Chức năng 1: tạo ảnh và copy sản phẩm hàng loạt

**Đầu vào**

| Loại | Nội dung |
| --- | --- |
| Thông tin sản phẩm | Tên, danh mục, thương hiệu, chất liệu, kích thước, màu sắc |
| Ảnh sản phẩm | Ảnh nền trắng hoặc ảnh bối cảnh đơn giản |
| Ảnh tham khảo | Ảnh sản phẩm từng bán tốt hoặc link tham khảo |
| Cách nhập | Nhập Excel hàng loạt hoặc nhập trực tiếp trên trang |

**Đầu ra**

- Ảnh chính có điểm bán cơ bản.
- Tiêu đề chứa từ khóa chính.
- Một đến hai câu copy bán hàng.
- Kết quả đủ để vận hành chọn, sửa nhẹ rồi đăng.

:::

::: info Chức năng 2: lưu phương án tốt thành mẫu

| Đầu vào | Nội dung |
| --- | --- |
| Một bộ kết quả | Ảnh chính + tiêu đề + copy |

| Đầu ra | Mô tả |
| --- | --- |
| Áp dụng | Khi làm sản phẩm mới, dùng mẫu để tạo bản nháp |
| Chỉnh sửa | Sửa trực tiếp tiêu đề hoặc copy |
| Quản lý | Đặt tên, gắn tag, phân loại theo cửa hàng hoặc chiến dịch |

Quy trình mong muốn: nhập sản phẩm mới, chọn tạo mặc định hoặc dùng mẫu đã lưu, sau đó hệ thống áp dụng phong cách của mẫu để tạo kết quả mới.

:::

Tóm lại, trước khi viết code ta đã làm ba việc: hỏi người dùng, tìm điểm đau, thu hẹp phạm vi. Code chỉ là công cụ; hiểu người dùng và chọn đúng vấn đề mới là bước đầu.

<div style="margin: 50px 0;">
  <ClientOnly>
    <StepBar :active="1" :items="[
      { title: 'Phân tích nhu cầu', description: 'Từ mơ hồ đến cụ thể' },
      { title: 'Kiểm chứng một trang', description: 'Làm ra lõi trải nghiệm' },
      { title: 'Mở rộng nhiều trang', description: 'Hoàn thiện cấu trúc ứng dụng' },
      { title: 'Làm đẹp và hoàn thiện', description: 'Nâng trải nghiệm người dùng' }
    ]" />
  </ClientOnly>
</div>

## 2. Tạo prototype trong 10 phút: để AI IDE làm ra lõi trải nghiệm

::: info Gợi ý về Coding Plan
Nếu IDE hiện tại không đủ thông minh hoặc hạn mức hết quá nhanh, bạn có thể tìm hiểu các Coding Plan hoặc công cụ CLI ở bài [Moderne CLI Coding Werkzeuge](../../stage-2/backend/modern-cli/).
:::

Không nên suy nghĩ quá lâu. Khi phạm vi đã rõ, hãy bắt đầu từ một trang đơn giản.

### 2.1 Bước một: nói với AI bằng ngôn ngữ đời thường

Người mới không cần viết prompt hoàn hảo ngay. Hãy mô tả như đang nói chuyện với đồng nghiệp:

```txt
Tôi muốn làm một công cụ giúp vận hành thương mại điện tử tự động tạo ảnh chính và copy sản phẩm.
Hiện tại họ phải tự làm từng ảnh và từng đoạn chữ, rất mất thời gian.
Ý tưởng là: họ nhập thông tin sản phẩm, hệ thống tạo một nhóm bản nháp,
vận hành chọn bản ổn rồi sửa nhẹ để dùng.

Phiên bản đầu tiên chỉ cần một trang:
bên trái nhập thông tin sản phẩm,
bên phải hiển thị kết quả tạo ra.
Hỗ trợ tải ảnh, nhập chữ,
sau khi tạo thì hiển thị ảnh xem trước và copy.
```

Sau đó đưa đoạn này cho AI và yêu cầu nó mở rộng thành tài liệu nghiệp vụ và prompt cho AI IDE:

```txt
Hãy mở rộng ý tưởng trên thành một tài liệu logic nghiệp vụ rõ ràng,
sau đó tạo một prompt phù hợp để gửi cho AI IDE như Cursor hoặc Trae,
dùng để sinh prototype ứng dụng một trang.
```

AI thường sẽ bổ sung các chi tiết bạn chưa nghĩ tới. Bạn cần đọc lại, bỏ những chức năng chưa cần, rồi mới dùng prompt đó để sinh code.

### 2.2 Có tài liệu rồi thì gửi thẳng cho AI IDE

Nếu bạn đã tự viết tài liệu nghiệp vụ, có thể dùng mẫu sau:

```txt
Hãy dựa trên logic nghiệp vụ sau để xây dựng một ứng dụng một trang nhằm kiểm chứng chức năng cốt lõi.

Logic nghiệp vụ:
1. Giúp vận hành tạo bản nháp ảnh và copy sản phẩm hàng loạt.
- Đầu vào:
  - Thông tin cơ bản: tên, danh mục, thương hiệu, chất liệu, kích thước, màu sắc, nhóm người dùng.
  - Ảnh sản phẩm: ảnh nền trắng hoặc ảnh bối cảnh đơn giản.
  - Ảnh tham khảo hoặc link sản phẩm từng bán tốt.
  - Có thể nhập bằng Excel hoặc nhập trực tiếp trên trang.
  - Có tùy chọn lưu tư liệu vào thư viện.
- Đầu ra:
  - Mỗi sản phẩm có một ảnh chính nháp với điểm bán cơ bản.
  - Một tiêu đề có cấu trúc hợp lý và một đến hai câu copy bán hàng.
- Cách dùng mong muốn:
  Thay vì bắt đầu từ trang trắng, vận hành đưa một lô sản phẩm vào hệ thống,
  rồi chọn và chỉnh nhẹ bản nháp do hệ thống tạo.

Trước tiên chỉ làm chức năng thứ nhất. Thư viện mẫu để thêm sau.
```

### 2.3 Cách nâng cao: để AI viết "prompt cho prompt"

Bạn cũng có thể yêu cầu một AI khác viết prompt dành riêng cho coding Agent:

```txt
Dựa trên ý tưởng sau, hãy viết một prompt dùng để gửi cho coding Agent.

[Dán mô tả nghiệp vụ của bạn ở đây]

Yêu cầu:
1. Có mô tả bố cục trang rõ ràng.
2. Nêu rõ cấu trúc dữ liệu và logic tương tác.
3. Chỉ định stack kỹ thuật, ví dụ React + Tailwind.
4. Liệt kê các chức năng cốt lõi cần làm.
```

![](../../../zh-cn/stage-1/building-prototype/images/index-2026-01-14-14-25-56.png)

### 2.4 Để AI IDE sinh code

Nếu chưa quen AI IDE như Cursor, Trae hoặc Windsurf, hãy xem trước [IDE cơ bản](/vi-vn/appendix/2-development-tools/ide-basics): cách tạo dự án, nói chuyện với Agent và đọc quá trình sinh code.

Tạo một thư mục mới rồi mở trong AI IDE:

![](../../../zh-cn/stage-1/building-prototype/images/index-2026-01-14-14-28-44.png)
![](../../../zh-cn/stage-1/building-prototype/images/index-2026-01-14-14-30-00.png)

Trong thanh bên, chọn mô hình bạn muốn dùng, ví dụ Gemini, GPT, GLM, Kimi hoặc MiniMax, rồi dán prompt đã chuẩn bị:

![](../../../zh-cn/stage-1/building-prototype/images/index-2026-01-14-14-31-41.png)

Sau khi gửi, AI sẽ lập kế hoạch thư mục, tạo file và viết nội dung ban đầu.

::: warning Lưu ý: Agent có thể dừng để chờ xác nhận
Trong quá trình sinh code, Agent thường dừng lại để chờ bạn xác nhận: nhấn Enter, chọn phương án, hoặc cho phép chạy lệnh. Nếu thấy AI không chạy tiếp, hãy kiểm tra khung chat xem nó đang chờ phản hồi hay không.
:::

![](../../../zh-cn/stage-1/building-prototype/images/index-2026-01-14-14-33-03.png)

Nếu xuất hiện một dịch vụ local, bạn cần mở đường dẫn trong trình duyệt hoặc bấm bỏ qua bước chờ trong IDE:

![](../../../zh-cn/stage-1/building-prototype/images/index-2026-01-14-14-38-11.png)

::: info Giải thích nhanh về localhost
Khi tạo dự án React bằng Vite, máy tính sẽ chạy một server local để bạn xem trang. `localhost` nghĩa là "chính máy tính này". Cổng như `5174` là số để phân biệt các dịch vụ khác nhau. Nếu `5173` bị chiếm, hệ thống tự đổi sang cổng khác là bình thường.
:::

Sau khi xác nhận xong, chờ Agent chạy một lúc, bạn sẽ có phiên bản đầu tiên:

![](../../../zh-cn/stage-1/building-prototype/images/index-2026-01-14-14-50-34.png)

Nếu giao diện còn xấu, hãy nói thẳng với AI:

![](../../../zh-cn/stage-1/building-prototype/images/index-2026-01-14-15-01-16.png)

Sau khi tối ưu có thể nhận được giao diện đẹp hơn:

![](../../../zh-cn/stage-1/building-prototype/images/index-2026-01-14-15-05-16.png)

Bạn có thể tiếp tục điều chỉnh bằng yêu cầu cụ thể:

- "Tôi chưa cần nhập hàng loạt, hãy bỏ chức năng này."
- "Bên trái có quá nhiều trường, chỉ giữ lại các trường quan trọng."
- "Hãy tham khảo bố cục trong ảnh này, không cần giống hoàn toàn."

![](../../../zh-cn/stage-1/building-prototype/images/index-2026-01-14-15-13-12.png)

Kết quả cuối có thể tiến gần hơn đến một prototype chuyên nghiệp:

![](../../../zh-cn/stage-1/building-prototype/images/index-2026-01-14-15-15-18.png)

### 2.5 Gặp lỗi thì làm gì?

Gặp lỗi là bình thường. Người mới không cần hiểu toàn bộ lỗi, chỉ cần đưa đầy đủ hiện tượng cho AI.

- **Trang hoặc terminal báo lỗi**: chụp ảnh hoặc copy toàn bộ lỗi đỏ gửi cho AI.
- **Chức năng sai nhưng không báo lỗi**: mô tả "hiện tại xảy ra gì" và "tôi mong muốn gì".
- **Không chắc có lỗi hay không**: hỏi AI kiểm tra chức năng có vấn đề rõ ràng không.

Một vài câu hỏi thường gặp:

- **Không biết lỗi nằm ở đâu?** Hãy tìm chữ màu đỏ trong terminal, console hoặc trang web rồi copy cho AI.
- **AI sửa xong vẫn lỗi?** Gửi lỗi mới nhất, yêu cầu sửa trên nền bản vừa sửa.
- **Có cần hiểu hết cách sửa không?** Không cần ngay. Mỗi lần hiểu một hai điểm là đủ.
- **Sửa nhiều lần vẫn không được?** Dùng Revert quay lại bản chạy được, đổi mô hình, hoặc gửi "code hiện tại + log lỗi + hành vi mong muốn" để AI xử lý tổng thể.

## 3. Từ một trang mở rộng thành ứng dụng nhiều trang

<div style="margin: 50px 0;">
  <ClientOnly>
    <StepBar :active="2" :items="[
      { title: 'Phân tích nhu cầu', description: 'Từ mơ hồ đến cụ thể' },
      { title: 'Kiểm chứng một trang', description: 'Làm ra lõi trải nghiệm' },
      { title: 'Mở rộng nhiều trang', description: 'Hoàn thiện cấu trúc ứng dụng' },
      { title: 'Làm đẹp và hoàn thiện', description: 'Nâng trải nghiệm người dùng' }
    ]" />
  </ClientOnly>
</div>

Khi logic cốt lõi đã chạy, hãy bổ sung các phần còn thiếu. Ví dụ nút cài đặt chưa hoạt động, trang thư viện mẫu chưa có, hoặc luồng lưu mẫu chưa hoàn chỉnh. Bạn có thể yêu cầu AI kiểm tra theo tài liệu nghiệp vụ và triển khai từng trang.

![](../../../zh-cn/stage-1/building-prototype/images/index-2026-01-14-15-17-55.png)

Sau một lúc, ứng dụng có thể được bổ sung nhiều trang và chức năng tương tác:

![](../../../zh-cn/stage-1/building-prototype/images/index-2026-01-14-15-23-40.png)

![](../../../zh-cn/stage-1/building-prototype/images/index-2026-01-14-15-23-53.png)

Lúc này bạn cần tự bấm thử những nút quan trọng. Nếu phần nào không tương tác, hãy mô tả hiện tượng và để AI sửa.

## 4. Làm prototype trông "ra dáng"

<div style="margin: 50px 0;">
  <ClientOnly>
    <StepBar :active="3" :items="[
      { title: 'Phân tích nhu cầu', description: 'Từ mơ hồ đến cụ thể' },
      { title: 'Kiểm chứng một trang', description: 'Làm ra lõi trải nghiệm' },
      { title: 'Mở rộng nhiều trang', description: 'Hoàn thiện cấu trúc ứng dụng' },
      { title: 'Làm đẹp và hoàn thiện', description: 'Nâng trải nghiệm người dùng' }
    ]" />
  </ClientOnly>
</div>

Sau khi có nhiều trang, bước cuối là để prototype từ "chạy được" thành "dễ dùng và nhìn chuyên nghiệp". Hãy đi lại toàn bộ quy trình như một người dùng mới: nhập dữ liệu, tạo kết quả, lưu mẫu, mở thư viện, áp dụng lại mẫu.

Nếu mỗi lần kiểm thử đều phải nhập dữ liệu mới, rất tốn thời gian. Hãy yêu cầu AI tạo lối vào dữ liệu thử:

```txt
Tôi cần kiểm thử luồng người dùng này. Hãy thêm một lối vào dữ liệu mẫu để tôi có thể bấm một nút và nhanh chóng kiểm tra toàn bộ quy trình:
1. Nhập thông tin sản phẩm.
2. Tạo ảnh và copy nháp.
3. Chọn một kết quả.
4. Lưu kết quả thành mẫu.
5. Mở thư viện mẫu và xem lại tham số tạo.
```

Nếu một bộ dữ liệu quá ít, hãy yêu cầu AI tạo nhiều case kiểm thử:

![](../../../zh-cn/stage-1/building-prototype/images/index-2026-01-14-15-30-30.png)

Bấm vào có thể nhận kết quả:

![](../../../zh-cn/stage-1/building-prototype/images/index-2026-01-14-15-31-23.png)

Nếu kết quả xuất hiện quá nhanh, không giống quá trình tạo thật, có thể yêu cầu:

> Hãy mô phỏng một quá trình tạo thật: sau khi bấm nút, chờ một khoảng thời gian rồi mới hiển thị kết quả.

![](../../../zh-cn/stage-1/building-prototype/images/index-2026-01-14-15-50-05.png)

Sau đó kiểm tra thư viện mẫu. Nếu card kết quả chưa có chức năng lưu, hãy yêu cầu:

> Hãy đảm bảo người dùng có thể bấm vào một kết quả để lưu thành mẫu. Khi mở mẫu, cần thấy được tham số tạo và nội dung đã lưu.

Quá trình này thường cần sửa nhiều vòng bằng ảnh chụp và mô tả:

![](../../../zh-cn/stage-1/building-prototype/images/index-2026-01-14-15-57-14.png)

Kết quả kỳ vọng:

![](../../../zh-cn/stage-1/building-prototype/images/index-2026-01-14-16-12-56.png)

Ngoài tự trải nghiệm, bạn cũng có thể nhờ AI làm kiểm tra yêu cầu:

- "Hãy đối chiếu yêu cầu ban đầu và kiểm tra ứng dụng hiện tại đã bao phủ các chức năng cốt lõi chưa."
- "Hãy liệt kê checklist chức năng, đánh dấu phần đã xong, phần chưa làm và phần trải nghiệm còn yếu."

Checklist này giúp bạn quyết định nên tiếp tục chỉnh gì.

## 5. Bài tập: làm lại bàn làm việc thương mại điện tử của riêng bạn

<el-card shadow="hover" style="margin: 20px 0; border-radius: 12px;">
  <template #header>
    <div style="font-weight: bold; font-size: 16px;">Nhiệm vụ thử thách: làm lại bàn làm việc nội dung thương mại điện tử</div>
  </template>

  <p>
    Hãy tham khảo prompt và quy trình của bài này để hoàn thành một vòng khép kín:
  </p>

  <ul>
    <li>
      <strong>Thực hành vòng khép kín</strong>
      <ul>
        <li>Tạo prompt phân tích nghiệp vụ -> tạo prototype một trang -> mở rộng thành prototype nhiều trang</li>
      </ul>
    </li>
    <li>
      <strong>Chia sẻ kết quả</strong>
      <ul>
        <li>Chụp ảnh chương trình của bạn và chia sẻ với mọi người</li>
      </ul>
    </li>
    <li>
      <strong>Câu hỏi suy nghĩ</strong>
      <ul>
        <li>Chuẩn bị cho bài tiếp theo về LLM và tạo ảnh: trong bàn làm việc của bạn, có thể nhúng các năng lực như viết copy, tạo ảnh minh họa hoặc tạo kịch bản ở đâu?</li>
      </ul>
    </li>
  </ul>
</el-card>

## Bước tiếp theo

Ở bài tiếp theo, ta sẽ dựa trên bàn làm việc nội dung này để kết nối năng lực AI cụ thể: text-to-text, image-to-text và text-to-image. Ví dụ:

- Tự động tạo bản nháp copy và nhiều tiêu đề cho một nhiệm vụ nội dung.
- Tạo ảnh nháp theo mô tả nhiệm vụ.
- Phân loại và tóm tắt nhiệm vụ nội dung cũ để hỗ trợ lên kế hoạch cho chiến dịch tiếp theo.

<RelatedArticlesSection
  title="Tiếp tục học"
  description="Nên học theo thứ tự: kết nối năng lực AI -> vòng khép kín dự án -> kỹ thuật hóa thiết kế."
  :items="relatedArticles"
/>
