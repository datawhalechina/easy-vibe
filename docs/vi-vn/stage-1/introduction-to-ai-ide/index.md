
# Sơ cấp 2: Học dùng công cụ lập trình AI

## Dẫn nhập chương

<script setup>
import { relatedArticlesMap } from '@theme/data/relatedArticles'

const duration = 'Khoảng <strong>1 ngày</strong>, có thể chia thành nhiều lần học'
const relatedArticles =
  relatedArticlesMap['vi-vn/stage-1/introduction-to-ai-ide'] ?? []
</script>

<ChapterIntroduction :duration="duration" :tags="['Thiết lập môi trường phát triển local', 'IDE và AI IDE', 'Kỹ thuật phát triển hiệu quả']" coreOutput="1 trò chơi nhỏ tự tạo" expectedOutput="Hoàn thành bằng Trae">

Trước đó, chúng ta đã trải nghiệm lập trình AI trên z.ai, nhưng bản web có nhiều giới hạn: <strong>không thể lưu bất cứ lúc nào</strong>, <strong>khó quản lý tệp</strong> và cũng <strong>khó làm dự án phức tạp</strong>. Chương này giúp bạn đưa môi trường phát triển về máy tính của mình để có thể <strong>thực sự tự xây dựng sản phẩm</strong>.

Chúng ta sẽ làm rõ trước <strong>IDE và AI IDE khác nhau ở đâu</strong>, vì sao AI IDE có thể giúp bạn <strong>tăng mạnh hiệu suất</strong>; sau đó sẽ <strong>hướng dẫn từng bước</strong> dùng Trae để làm một trò chơi Rắn săn mồi trên máy local, đi hết <strong>quy trình đầy đủ</strong> từ cài đặt đến chạy thử; cuối cùng sẽ chia sẻ một số <strong>kỹ thuật thực dụng khi trò chuyện với AI</strong> để bạn bớt đi đường vòng.

Học xong chương này, bạn sẽ <strong>nắm được quy trình phát triển gần giống lập trình viên</strong>.

::: tip 💡 Gợi ý nâng cao
Nếu bạn đã có một chút nền tảng lập trình và muốn dùng công cụ mạnh hơn sớm hơn, có thể tham khảo [Công cụ CLI Coding hiện đại](../../stage-2/backend/modern-cli/) để phát triển bằng dòng lệnh.
:::

</ChapterIntroduction>

<div style="margin: 50px 0;">
  <ClientOnly>
    <StepBar :active="0" :items="[
      { title: 'Hiểu môi trường', description: 'Hiểu IDE và AI IDE' },
      { title: 'Thực hành local', description: 'Dùng Trae làm Rắn săn mồi' },
      { title: 'Giải thích công cụ', description: 'Làm quen giao diện IDE' },
      { title: 'Kỹ năng giao tiếp', description: 'Trao đổi hiệu quả với AI' }
    ]" />
  </ClientOnly>
</div>

## 1. Viết code cần môi trường và công cụ gì

### 1.1 Chuyển đổi tư duy: gặp vấn đề, hỏi AI trước

Trước khi giới thiệu các loại môi trường và công cụ, trước hết cần nhắc bạn **thay đổi thói quen tư duy**.

Trong cách học lập trình truyền thống, nếu cần cài Python, cấu hình Conda hoặc xử lý lỗi cài npm, bạn thường mở công cụ tìm kiếm, tìm một bài hướng dẫn rồi làm từng bước. Nếu giữa chừng có lỗi, bạn lại phải tìm thông báo lỗi và thử đi thử lại.

Sai rồi! ❌

Trong thời đại AI, đặc biệt khi dùng AI IDE, hãy nhớ một nguyên tắc cốt lõi: **bất kỳ thao tác nào cũng có thể hỏi AI trước, thậm chí để AI trực tiếp làm giúp bạn.**

- **Không biết cài môi trường thế nào?** Hỏi AI ngay trong sidebar: "Tôi muốn viết Python, hãy kiểm tra giúp tôi đã cài Python chưa; nếu chưa thì cài giúp tôi."
- **Mạng bị kẹt?** Nếu cài dependency cứ quay vòng hoặc báo lỗi, đưa lỗi cho AI: "Tải thất bại rồi, có phải do mạng không? Có thể giúp tôi đổi sang mirror trong nước không?"
- **Không nhớ lệnh?** Không cần học thuộc lệnh Git hay Conda. Chỉ cần nói với AI: "Giúp tôi tạo một virtual environment mới tên là demo."

### 1.2 Vì sao cần môi trường và công cụ

Từ "thử viết vài dòng code" đến "làm một dự án có thể bảo trì lâu dài", yêu cầu về môi trường và công cụ hoàn toàn khác nhau.

Về lý thuyết, bạn cũng có thể viết code bằng Notepad có sẵn trong hệ thống, nhưng vấn đề sẽ xuất hiện rất nhanh:

- **Toàn bộ code chỉ là chữ đen**, keyword, chuỗi và comment lẫn vào nhau, rất khó nhìn ra cấu trúc trong nháy mắt.
- **Không có gợi ý thông minh**, từ nào cũng phải gõ đầy đủ bằng tay; sai một chữ cái là phải kiểm tra đi kiểm tra lại.
- **Nhiều tệp sẽ rất rối**, chuyển qua lại giữa hàng chục tệp và thường không tìm được dòng cần sửa.
- **Có lỗi chỉ biết đoán**, chương trình sập nhưng không biết lỗi ở đâu, chỉ có thể in log từng dòng để thử.

Vì vậy, bạn cần một IDE (Integrated Development Environment, môi trường phát triển tích hợp). Nó sẽ hiển thị code bằng nhiều màu, tự động gợi ý khi nhập, sắp xếp tệp theo dự án và giúp truy vết lỗi từng bước, nhờ đó phát triển hiệu quả hơn và ít lỗi hơn.

## 2. IDE là gì, vì sao cần IDE

::: info Gợi ý đọc trước
Nếu bạn chưa quen IDE là gì và từng phần giao diện có tác dụng gì, nên đọc trước [Giới thiệu IDE](/vi-vn/appendix/2-development-tools/ide-basics) để hiểu các khái niệm cơ bản và chức năng thường gặp của IDE.
:::

Trong giai đoạn đầu của lập trình, chúng ta chỉ cần một trình soạn thảo văn bản đơn giản và bộ xử lý ngôn ngữ. Nhưng khi độ phức tạp của dự án tăng lên, lập trình viên rất cần một công cụ có thể quản lý tệp hiệu quả, hỗ trợ tô sáng cú pháp và debug. Vì vậy, môi trường phát triển tích hợp (IDE) ra đời.

Bạn có thể hiểu IDE là một chương trình chuyên dùng để "chỉnh sửa, quản lý, chạy và debug" code. IDE thời kỳ đầu trông rất "thô sơ" và gần như hoàn toàn thao tác bằng bàn phím.

![](../../../zh-cn/stage-1/introduction-to-ai-ide/images/image1.png)![](../../../zh-cn/stage-1/introduction-to-ai-ide/images/image2.png)

Giao diện terminal. Nguồn ảnh: https://en.wikipedia.org/wiki/File:Emacs-screenshot.png

Các "IDE tích hợp" nổi tiếng và trưởng thành về chức năng như `Vim` thường được dùng khi thao tác từ xa trên server.

![](../../../zh-cn/stage-1/introduction-to-ai-ide/images/image3.png)

Để hiệu quả hơn, chúng ta cần IDE hiện đại hỗ trợ thao tác chuột, thường bao gồm:

- **Trình soạn thảo mã nguồn**: tô sáng cú pháp, tự động hoàn thành.
- **Công cụ build và chạy**: tích hợp compiler/interpreter.
- **Debugger**: debug bằng breakpoint, xem biến.

IDE hiện đại thường còn tích hợp các công cụ như Git. Phổ biến nhất là **[Visual Studio Code (VS Code)](https://code.visualstudio.com/)** của Microsoft: nhẹ và có thể mở rộng. Dù cũng có các IDE chuyên nghiệp như hệ sinh thái JetBrains, VS Code vẫn thân thiện nhất với người mới.

![](../../../zh-cn/stage-1/introduction-to-ai-ide/images/image4.png)

Triết lý cốt lõi của VS Code là "mọi thứ đều là plugin". Thông qua cơ chế plugin, nó hỗ trợ nhiều ngôn ngữ: cài plugin Python thì thành Python IDE, cài plugin C++ thì thành C++ IDE. Khi chưa cài plugin, nó chỉ là một trình soạn thảo văn bản cao cấp.

![](../../../zh-cn/stage-1/introduction-to-ai-ide/images/image5.png)

Thậm chí có thể dùng để chỉnh sửa tài liệu Markdown.

![](../../../zh-cn/stage-1/introduction-to-ai-ide/images/image6.png)

Tóm lại, IDE là một bộ công cụ giúp lập trình viên viết code và chạy chương trình hiệu quả.

Để xem giải thích cụ thể hơn, hãy đọc [phần nguyên lý trực quan hóa IDE trong phụ lục](/vi-vn/appendix/2-development-tools/ide-basics).

## 3. AI IDE khác IDE thông thường ở đâu

IDE thông thường, ví dụ VS Code bản gốc, về bản chất là một "hộp công cụ":  
Bạn có thể mở dự án, viết code, chạy và debug, cũng có thể cài plugin, nhưng điều kiện tiên quyết là bạn phải tự biết cần làm gì và làm như thế nào:

- Khi có lỗi, tự đọc thông báo và tự tìm dòng có vấn đề.
- Khi muốn thêm trang mới hoặc API mới, tự tìm tệp tương ứng và tự viết code.
- Khi muốn cấu hình môi trường hoặc build, tự tra tài liệu và làm theo từng bước.

Nhưng trong AI IDE, bạn có thể trực tiếp dùng mô hình ngôn ngữ lớn để hỗ trợ viết code và sửa tệp:

- Nói thẳng "làm một trang đăng nhập", nó sẽ tạo trước cấu trúc code cơ bản.
- Đưa thông báo lỗi và code liên quan cho nó, để nó phân tích nguyên nhân và đề xuất cách sửa.
- Sau khi bạn xác nhận, để nó tự tạo tệp mới, sửa code hàng loạt và xử lý các việc nặng tay qua nhiều tệp.

Ví dụ, bạn có thể chọn một đoạn code và yêu cầu nó "refactor đoạn này" hoặc "thêm comment"; cũng có thể hỏi trong sidebar "dự án này được thiết kế như thế nào?", dùng `@tên-tệp` hoặc `@toàn-bộ-dự-án` để chỉ định phạm vi tham khảo, rồi dùng một câu để tự động hoàn thành các thao tác rườm rà như tạo tệp, viết code và chạy.

Trong phiên bản VS Code mới, đã có sẵn một trợ lý mô hình ngôn ngữ lớn. Bạn có thể trò chuyện với mô hình về toàn bộ codebase, một tệp cụ thể, thậm chí một hàm cụ thể. Bạn cũng có thể giống như khi dùng công cụ tự động viết code trên web: gửi yêu cầu dưới dạng prompt cho coding Agent tích hợp, để nó tự giúp bạn hiện thực tính năng cần thiết, tạo tệp, sửa code, cấu hình môi trường, v.v.

Bạn có thể tải và cài VS Code, rồi bấm lối vào sidebar ở góc trên bên phải để mở khu vực chức năng AI và trải nghiệm các năng lực này.

![](../../../zh-cn/stage-1/introduction-to-ai-ide/images/image7.png)

Tuy nhiên, VS Code không phải IDE có năng lực AI mạnh nhất. Với các tình huống cần nhiều hỗ trợ lập trình bằng AI, chúng ta thường muốn dùng công cụ "thông minh hơn, hiệu quả hơn". Một AI IDE tốt có thể tiết kiệm đáng kể thời gian viết code và sửa bug. Dưới đây, chúng ta sẽ giới thiệu một số AI IDE phổ biến hiện nay; bạn có thể chọn bất kỳ công cụ nào theo sở thích cá nhân.

Vì VS Code là mã nguồn mở, bất kỳ ai cũng có thể tải source code và tự build, nên phần lớn AI IDE trên thị trường hiện nay đều được phát triển tiếp trên nền VS Code. Vì vậy, bạn không cần lo phải "học rất nhiều loại IDE": **chỉ cần quen cách dùng cơ bản của VS Code**, chuyển sang các AI IDE này sẽ không phải học lại từ đầu.

Nói chung, khác biệt giữa các AI IDE chủ yếu tập trung ở bốn điểm: giá; loại mô hình có thể dùng, trong đó một số mô hình cao cấp có thể bị hạn chế ở vài khu vực; năng lực Agent, tức mức độ thông minh và khả năng thực thi khi hỗ trợ viết code; cũng như tốc độ và hiệu năng. Bạn có thể chọn theo kết quả thử nghiệm thực tế; công cụ phù hợp với mình mới là tốt nhất.

> Một AI IDE điển hình thường có các năng lực cốt lõi sau:
>
> - Tạo và hoàn thành code thông minh: trong IDE truyền thống, chúng ta thường gõ vài ký tự để auto-complete tên biến hoặc tên hàm; trong AI IDE hiện đại, bạn có thể viết vài dòng pseudo-code hoặc mô tả ngắn yêu cầu, để IDE tự hoàn thành toàn bộ logic, thậm chí tạo trực tiếp một đoạn lớn hoặc cả khối code theo chỉ dẫn.
> - Hiểu code và hỏi đáp: IDE có thể hiểu và trả lời câu hỏi về một đoạn code, một tệp, thậm chí toàn bộ cấu trúc thư mục dự án.
> - Refactor và tối ưu code: IDE có thể viết lại hoặc tối ưu logic hiện thực của đoạn code được chỉ định theo ý định của bạn.
> - Tự động tạo test: IDE có thể tự tạo code test cho các hàm và module khác nhau, giúp bạn kiểm thử có mục tiêu dễ hơn.
> - Thực thi nhiệm vụ kiểu Agent: Agent thông minh có thể tự tạo, build, cài đặt, chạy và sửa code; trong nhiều nhiệm vụ, nó có thể thay thế một phần công việc của kỹ sư phần mềm junior.

::: details Antigravity

### [Antigravity](https://antigravity.google/)

Antigravity là AI IDE hoàn toàn mới do Google phát hành cùng Gemini 3 vào tháng 11 năm 2025, dùng mô hình phát triển "Agent-First". Khác với hỗ trợ viết code AI truyền thống, Antigravity để AI agent trở thành "người thực thi chủ động", có thể trực tiếp thao tác editor, terminal, browser và các công cụ khác, đảm nhận nhiều việc hơn trong "thực thi", "lập kế hoạch" và "xác minh". Lập trình viên chỉ cần nêu ý định ở tầng cao; agent sẽ tự chia nhỏ nhiệm vụ, lập kế hoạch, viết code, chạy test và tạo kết quả. Nó hỗ trợ chuyển đổi nhiều mô hình, gồm Gemini 3 Pro, Claude Sonnet 4.5, v.v. Hiện công cụ này được cung cấp dưới dạng public preview và hỗ trợ Windows, macOS, Linux.
:::

::: details Trae

### [Trae](https://www.trae.ai/)

![](../../../zh-cn/stage-1/introduction-to-ai-ide/images/image8.png)

Trae là trợ lý lập trình AI do ByteDance ra mắt, hỗ trợ hơn 100 ngôn ngữ lập trình và có thể tích hợp vào các IDE phổ biến. Chức năng của nó bao gồm tạo code bằng ngôn ngữ tự nhiên, debug tự động, chuyển bản thiết kế thành component React/Vue, v.v. Sau bản cập nhật tháng 8 năm 2025, Trae thêm các tính năng như import dependency thông minh, gợi ý đổi tên, quản lý checklist nhiệm vụ; chế độ SOLO cũng bắt đầu hỗ trợ tạo code backend và chỉnh sửa tài liệu kiến trúc kỹ thuật.
:::

::: details Cursor

### [Cursor](https://cursor.com/)

Cursor là trình soạn thảo code AI do Anysphere phát triển, tùy biến trên nền VS Code, tập trung tối ưu cho codebase quy mô lớn và các tình huống cộng tác nhiều tệp. Nó hỗ trợ các mô hình như GPT-4o, Claude 3.7; chế độ Claude Max ra mắt năm 2025 có thể xử lý dự án ở cấp độ hàng triệu dòng code. Bản Pro đã bỏ giới hạn số lần request, rất phù hợp với dự án doanh nghiệp phức tạp.

Hiện tại, Cursor có thể xem là một trong những AI IDE "có giao diện frontend" có trải nghiệm tổng thể tốt nhất, lượng người dùng lớn và tần suất cập nhật tính năng cao. Nhược điểm lớn nhất của nó là giá tương đối cao: bản Pro khoảng 20 USD mỗi tháng.

![](../../../zh-cn/stage-1/introduction-to-ai-ide/images/image9.png)
:::

::: details Qoder

### [Qoder](https://qoder.com/)

Qoder là AI IDE do Alibaba ra mắt, nhấn mạnh "cộng tác minh bạch" và "tăng cường năng lực context engineering". Thông qua Action Flow, nó hỗ trợ chia nhiệm vụ thành nhiều bước và theo dõi quá trình thực thi của AI theo thời gian thực; đồng thời hỗ trợ routing động nhiều mô hình và quản lý trạng thái nhiệm vụ, rất phù hợp để quản trị kiến trúc trong dự án vừa/lớn và phân tích "reverse engineering" hệ thống legacy.

![](../../../zh-cn/stage-1/introduction-to-ai-ide/images/image10.png)
:::

::: details CodeBuddy

### [CodeBuddy](https://www.codebuddy.com/)

CodeBuddy là công cụ lập trình AI do Tencent Cloud ra mắt, nhấn mạnh hỗ trợ chỉ dẫn tiếng Trung và năng lực tuân thủ cấp doanh nghiệp. Nó cung cấp các chức năng như hoàn thành code, review code hàng loạt và chuyển đổi nhiều mô hình; trong đó Craft agent có thể tạo code nhiều tệp và tích hợp API. Bản enterprise hỗ trợ triển khai private và đã đạt chứng nhận bảo mật cấp 3, phù hợp với các ngành có yêu cầu cao về an toàn dữ liệu như tài chính và y tế.

![](../../../zh-cn/stage-1/introduction-to-ai-ide/images/image11.png)
:::

::: details VS Code + Cline

### VS Code + [Cline](https://cline.bot/)

Cline là một plugin AI programming Agent cho VS Code (Visual Studio Code), có thể linh hoạt chuyển đổi mô hình lớn được dùng bằng cách cấu hình các API endpoint khác nhau. Cline hỗ trợ đầu vào đa phương thức, mở rộng công cụ MCP và giám sát chi phí; mọi thao tác đều cần người dùng xác nhận trước khi thực thi. Nó rất phù hợp để nhanh chóng kiểm chứng ý tưởng hoặc tích hợp vào quy trình phát triển hiện có. Chức năng cơ bản miễn phí, còn bản enterprise hỗ trợ triển khai mô hình trong môi trường private.

![](../../../zh-cn/stage-1/introduction-to-ai-ide/images/image13.png)

![](../../../zh-cn/stage-1/introduction-to-ai-ide/images/image14.png)
:::

::: details Kiro

### [Kiro](https://kiro.dev/)

Kiro là AI programming IDE do AWS ra mắt, tích hợp sâu với Amazon Bedrock và hệ sinh thái dịch vụ cloud AWS. Nó hỗ trợ nhiều mô hình lớn như Claude, Nova, đặc biệt phù hợp với các tình huống phát triển cần tích hợp chặt với dịch vụ cloud AWS. Kiro cung cấp tạo code thông minh, kiểm thử tự động, cũng như kết nối liền mạch với tài nguyên AWS như Lambda, S3, DynamoDB; nhờ đó có lợi thế riêng trong phát triển ứng dụng cloud-native.

> **Ghi chú**: Nếu bạn muốn dùng các mô hình liên quan đến Anthropic Claude, cần dùng Cursor, Kiro hoặc Antigravity làm IDE. Các IDE này có hợp tác chính thức hoặc tích hợp sâu với Anthropic, nên có thể cung cấp trải nghiệm Claude ổn định và đầy đủ hơn.
:::

<div style="margin: 50px 0;">
  <ClientOnly>
    <StepBar :active="1" :items="[
      { title: 'Hiểu môi trường', description: 'Hiểu IDE và AI IDE' },
      { title: 'Thực hành local', description: 'Dùng Trae làm Rắn săn mồi' },
      { title: 'Giải thích công cụ', description: 'Làm quen giao diện IDE' },
      { title: 'Kỹ năng giao tiếp', description: 'Trao đổi hiệu quả với AI' }
    ]" />
  </ClientOnly>
</div>

## 4. Thực hành: dùng AI IDE tạo trò Rắn săn mồi trên máy local

Phần trước chủ yếu nói về "khái niệm" và "khác biệt". Trong mục này, chúng ta sẽ dùng một bài thực hành đầy đủ để biến khái niệm trừu tượng thành thao tác cụ thể: **tạo một thư mục rỗng mới → mở bằng AI IDE → trò chuyện trong sidebar để AI dùng React tạo từ đầu một trò Rắn săn mồi.** Ở đây, chúng ta lấy Trae làm ví dụ, nên trước tiên cần cài đặt và hiểu sơ Trae là gì.

::: tip 💡 Mẹo nhỏ: nối mượt từ web về local
Nếu trước đó bạn đã phát triển dự án trên z.ai hoặc nền tảng lập trình AI web khác, có thể tải code về máy local rồi dùng AI IDE mở để tiếp tục phát triển. Như vậy vừa giữ được thành quả trước đó, vừa tận hưởng năng lực hỗ trợ AI mạnh hơn của IDE local.

Các bước rất đơn giản:
1. Trên z.ai hoặc nền tảng tương tự, bấm nút tải xuống để lưu dự án về máy local
2. Giải nén rồi dùng AI IDE như Trae/Cursor mở thư mục đó
3. Tiếp tục trò chuyện với AI trong sidebar để lặp và tối ưu dự án
:::

### 4.1 Chuẩn bị: cài đặt và tìm hiểu Trae

#### 4.1.1 Trae là gì

Tên đầy đủ của Trae có thể hiểu là "The Real AI Engineer". Đây là một môi trường phát triển tích hợp AI thích ứng do ByteDance phát triển. Nó được xây dựng trên nền VS Code phổ biến, nghĩa là nếu trước đây bạn đã quen VS Code, khi dùng Trae bạn sẽ thấy cả bố cục giao diện lẫn thao tác cơ bản đều rất quen thuộc và dễ chịu.

Mục tiêu cốt lõi của Trae là trở thành "bạn đồng hành lập trình thông minh" của lập trình viên. Bằng cách tích hợp sâu năng lực AI, nó có thể tự động xử lý nhiều việc lặp lại và mang đến trải nghiệm phát triển trực quan, hiệu quả hơn. Nó không chỉ là một "công cụ hoàn thành code", mà muốn hỗ trợ xuyên suốt toàn bộ workflow phát triển: từ tạo dự án, viết code, debug, test đến deploy.

#### 4.1.2 Cài đặt Trae

Trae có bản quốc tế và bản Trung Quốc. Bản quốc tế cần truy cập mạng quốc tế, nhưng có thể dùng các mô hình mới ở nước ngoài như GPT-5; bản Trung Quốc chủ yếu hỗ trợ các mô hình lớn mới trong nước như GLM, Qwen, Kimi.

Địa chỉ tải bản quốc tế: https://www.trae.ai/  
Địa chỉ tải bản Trung Quốc: https://www.trae.cn/

##### Giá và cách dùng Trae

::: info 💡 Gợi ý chọn phiên bản (người mới nên dùng bản CN)
- **Người mới hoàn toàn nên ưu tiên tải bản Trung Quốc (bản CN, trae.cn)**, hiện trải nghiệm tốt hơn, chức năng cơ bản miễn phí và không cần mạng quốc tế.
- Nếu bạn cần dùng các mô hình nước ngoài như GPT-5 và điều kiện mạng cho phép, có thể chọn bản quốc tế.
- Nếu đã có API Key của mô hình bên thứ ba, việc kết nối mô hình bên thứ ba giúp kiểm soát chi phí linh hoạt hơn.
:::

> 💡 **Hiện khuyến nghị dùng mô hình miễn phí của OpenRouter để thử nghiệm**
> 
> Tính đến thời điểm viết giáo trình (2026-02-12), hiện vẫn có thể dùng thử miễn phí mô hình của StepFun. Cụ thể có thể tham khảo cách kết nối mô hình ở phần 4.2 bên dưới và kết nối `stepfun/step-3.5-flash:free`.

Về chi phí và cách dùng Trae, có một số lựa chọn sau:

- **Bản nội địa CN (rất khuyến nghị)**: chức năng cơ bản miễn phí, hiện trải nghiệm tổng thể tốt hơn bản quốc tế, rất phù hợp với người mới. Vì nhiều người dùng nên đôi khi có thể phải xếp hàng chờ.
- **Bản quốc tế**: giá đăng ký khoảng 3 USD/tháng, có thể truy cập GPT-5 và các mô hình nước ngoài khác, nhưng cần mạng quốc tế.
- **Kết nối mô hình bên thứ ba**: nếu bạn đã có Token API của mô hình lớn trong nước, như DeepSeek, Tongyi Qianwen, Kimi, bạn có thể dùng chức năng cấu hình mô hình bên thứ ba của Trae để kết nối các API này. Các nhà cung cấp cloud lớn như Alibaba Cloud, Tencent Cloud, Baidu Cloud thường cung cấp gói đăng ký Coding Plan; sau khi mua, bạn có thể dùng API mô hình lớn của họ với giá ưu đãi hơn. Như vậy bạn vừa tự do chọn mô hình mình thích, vừa kiểm soát chi phí sử dụng.

Người mới nên bắt đầu từ bản CN miễn phí (địa chỉ tải: https://www.trae.cn/). Hiện bản CN có hiệu quả sử dụng tốt hơn và hoàn toàn miễn phí. Nếu gặp vấn đề xếp hàng hoặc cần dịch vụ ổn định hơn, có thể cân nhắc kết nối mô hình bên thứ ba và mua Coding Plan tương ứng của nhà cung cấp cloud.

#### 4.1.3 Giới thiệu nhanh giao diện Trae

Về hình thái giao diện, Trae rất giống VS Code mà chúng ta thường dùng: vẫn là bố cục ba cột kinh điển với Explorer bên trái, vùng editor ở giữa và panel mở rộng bên phải.

![](../../../zh-cn/stage-1/introduction-to-ai-ide/images/image17.png)

Sidebar bên phải là cửa sổ tương tác Copilot, cũng có thể hiểu là cửa sổ Agent. Nếu tạm thời chưa thấy, bạn có thể bấm biểu tượng sidebar ở góc trên bên phải của Trae để mở.

![](../../../zh-cn/stage-1/introduction-to-ai-ide/images/image18.png)

Sau khi mở sidebar, bạn sẽ thấy tùy chọn `Builder`; đây chính là chế độ Agent. Hiểu đơn giản, nó tương đương "bản local" của z.ai, có thể giúp bạn thao tác môi trường trên máy, cài runtime, mở trang web, v.v.

![](../../../zh-cn/stage-1/introduction-to-ai-ide/images/image19.png)

Bấm "Builder", bạn sẽ thấy chế độ "Chat" và "Builder with MCP":

- **Chế độ Chat**: chủ yếu dùng để trò chuyện với code trong thư mục hiện tại, hoặc dùng như một mô hình chat thông thường. Bạn có thể mở một thư mục qua menu "File" ở góc trên bên trái rồi chỉnh sửa trong thư mục đó. Trong trường hợp này, các tệp Builder tạo hoặc sửa chỉ xảy ra bên trong thư mục đó.
- **Chế độ Builder with MCP**: cung cấp thêm công cụ cho Agent, ví dụ kết nối mô hình ngôn ngữ với phần mềm khác, tra thời tiết, v.v. Bạn có thể hiểu đơn giản: MCP giúp mô hình ngôn ngữ gọi nhiều công cụ bên ngoài thuận tiện hơn.

![](../../../zh-cn/stage-1/introduction-to-ai-ide/images/image20.png)

Ở khu vực phía dưới, bạn còn thấy tùy chọn chọn mô hình; bấm vào là có thể đổi mô hình lớn đang dùng. Trong bản Trung Quốc, bạn có thể chọn các mô hình nội địa như Kimi k2 hoặc GLM; nếu dùng bản quốc tế của Trae, bạn cũng có thể chọn các mô hình nước ngoài như ChatGPT hoặc Claude. Tuy nhiên, do mô hình lớn trong nước phát triển rất nhanh, trải nghiệm thực tế của Kimi, Qwen, GLM trong nhiều nhiệm vụ đã gần với Claude 3.5 hoặc 3.7 và hoàn toàn đủ cho phát triển hằng ngày. Ở đây không bắt buộc dùng bản quốc tế hay bản nội địa.

**Cần lưu ý rằng không khuyến nghị dùng chế độ Auto (tự chọn mô hình). Nếu là bản quốc tế, chúng tôi khuyến nghị dùng Gemini hoặc GPT; nếu là bản nội địa, khuyến nghị thử các mô hình trong nước như Kimi k2, MiniMax, GLM.** Mỗi mô hình có tình huống phù hợp khác nhau; không có quy tắc cứng nhắc rằng mô hình nào nhất định tốt hơn mô hình nào. Khi gặp nhiệm vụ khó chưa giải quyết được, bạn có thể đổi mô hình và qua nhiều lần thử nghiệm để tìm kết quả tốt nhất cho mình.

![](../../../zh-cn/stage-1/introduction-to-ai-ide/images/image21.png)

Trên đây là giới thiệu nhanh về Trae. Tiếp theo, chúng ta có thể nhìn lại thao tác đã làm trong z.ai trước đó và thử làm điều tương tự trong Trae.

### 4.2 Bước 1: tạo thư mục rỗng và mở bằng AI IDE

Trước khi bắt tay làm, chúng ta cần chuẩn bị một thư mục làm việc sạch cho dự án.  
Trong ví dụ của mục này, bạn có thể tạo một thư mục rỗng tên là snake-game-react trên máy local.

Sau đó, mở AI IDE đã cài, chọn mở thư mục hoặc Open Folder trên màn hình khởi động, rồi import thư mục rỗng đó làm thư mục gốc của dự án; bạn cũng có thể kéo trực tiếp thư mục vào cửa sổ IDE để mở. Lúc này, Explorer bên trái chưa có tệp code nào, nghĩa là chúng ta đang bắt đầu từ một trạng thái dự án hoàn toàn trống.

::: details 📚 Tùy chọn: kết nối API hoặc Coding Plan của nhà cung cấp cloud

Phần này giới thiệu cách kết nối API hoặc Coding Plan của nhà cung cấp cloud để có lượt gọi mô hình ổn định và thường xuyên hơn. Cuối phần sẽ có ảnh chụp cách kết nối trong Trae.

**Coding Plan là gì**

Coding Plan là gói đăng ký do các nhà cung cấp cloud lớn đưa ra. Sau khi mua, trong một khoảng thời gian nhất định bạn có thể **dùng API mô hình lớn của nhà cung cấp đó không giới hạn hoặc với tần suất cao**. So với cách tính phí theo Token, Coding Plan giống "gói thuê bao tháng" hơn: bạn trả một khoản cố định rồi có thể yên tâm dùng liên tục, không cần lo mỗi lần gọi đều bị tính tiền.

**Vì sao cần mua Coding Plan**

Bạn có thể hỏi: nếu đã có thể gọi mô hình lớn trực tiếp bằng API, vì sao còn cần mua Coding Plan? Lý do chính là: **có thể dùng liên tục**. Ưu điểm cốt lõi của Coding Plan là bạn có thể gọi mô hình lớn bất cứ lúc nào, với tần suất cao, không cần lo dùng nhiều khiến chi phí tăng vọt và cũng không phải liên tục kiểm tra bảng tính phí.

**Coding Plan cloud nội địa được khuyến nghị**

Dưới đây là một số lựa chọn Coding Plan do các nhà cung cấp cloud lớn trong nước cung cấp:

- Zhipu AI (BigModel Plan): https://bigmodel.cn/glm-coding  
- Volcengine (ByteDance Cloud AI Plan): https://www.volcengine.com/activity/codingplan

> 💡 **Cũng có thể kết nối trực tiếp API mô hình lớn**
> Ngoài Coding Plan, bạn cũng có thể kết nối API của các mô hình lớn thông qua Add Model. Bạn có thể tham khảo cách kết nối API miễn phí OpenRouter StepFun ở bên dưới để đưa API vào Trae sử dụng. Theo thử nghiệm, cách này đáp ứng được nhu cầu lập trình cơ bản.
> Nếu cần nạp tiền, nên nạp thử 10 yuan trước để cảm nhận dùng được bao lâu, ví dụ các mô hình có hiệu quả chi phí cao như DeepSeek.

**Cách kết nối Coding Plan**

Các bước kết nối Coding Plan rất đơn giản, chỉ cần vài phút:

1. Truy cập website chính thức của nhà cung cấp cloud bạn chọn, ví dụ Zhipu AI: https://bigmodel.cn/glm-coding hoặc Volcengine: https://www.volcengine.com/activity/codingplan
2. Đăng ký tài khoản và đăng nhập
3. Tìm trang "Pricing" hoặc "Coding Plan"
4. Chọn gói phù hợp và hoàn tất thanh toán
5. Sau khi thanh toán thành công, bạn sẽ nhận được API Key hoặc Plan ID

::: tip 🎯 Gợi ý mô hình tùy chỉnh

Khi kết nối mô hình tùy chỉnh trong Trae, chúng tôi **mặc định khuyến nghị dùng phương án OpenRouter**. OpenRouter cung cấp một API thống nhất, giúp kết nối nhiều mô hình ngôn ngữ lớn rất thuận tiện.

**Tính đến ngày 2026-02-12, bạn vẫn có thể dùng API miễn phí của StepFun:**

- **`stepfun/step-3.5-flash:free`**: mô hình miễn phí do StepFun cung cấp, cũng hỗ trợ kết nối trực tiếp trong Trae.

**Các mô hình miễn phí khác:**

- **`openrouter/free`**: đây là một tùy chọn mô hình mặc định dùng API LLM miễn phí, có thể dùng trực tiếp trong phần Custom Model của Trae. Chỉ cần viết vào model ID là được, không cần trả phí vẫn có thể trải nghiệm lập trình AI.

Các lựa chọn miễn phí này rất phù hợp để người mới trải nghiệm. Trước khi dùng chính thức trong môi trường production, bạn có thể dùng các phương án miễn phí này để làm quen workflow của AI IDE.

**Tùy chọn: kết nối API gọi mô hình lớn (lấy DeepSeek làm ví dụ)**

1. Truy cập nền tảng DeepSeek: https://platform.deepseek.com/usage
2. Đăng ký tài khoản và đăng nhập
3. Mua gói Token 10 yuan trên trang nạp tiền
4. Sau khi nạp thành công, tạo và sao chép API Key trên trang API Keys
5. Trong Trae, bấm **"Add Model"**, tìm DeepSeek, chọn mô hình tương ứng, nhập API Key là có thể dùng

Thông qua giao diện dưới đây, bạn có thể thêm thành công. Lưu ý: sau khi xem tùy chọn chọn mô hình, **nhất định phải cuộn xuống cuối cùng**. Bên dưới có mục "Custom Model"; bấm vào đó mới có thể nhập model ID. Lúc này có thể nhập trực tiếp model ID được khuyến nghị ở trên, ví dụ `stepfun/step-3.5-flash:free`. Đồng thời bấm nút lấy Key phía dưới để đi tới website chính thức, lấy API Key tương ứng rồi nhập vào là có thể dùng bình thường.

![](../../../zh-cn/stage-1/introduction-to-ai-ide/images/index-2026-02-12-14-14-51.png)

![](../../../zh-cn/stage-1/introduction-to-ai-ide/images/index-2026-02-12-14-15-29.png)
:::

### 4.3 Bước 2: trò chuyện trong sidebar, để AI dùng React thiết kế trò Rắn săn mồi

Tiếp theo, mở sidebar chat AI: thường là nhấn `Ctrl+L` hoặc bấm biểu tượng chat bên phải. Sau đó nhập một prompt đủ rõ trong khung chat:

> Hãy dùng kiến trúc React để hiện thực trò Rắn săn mồi, gồm điều khiển bằng bàn phím, ăn thức ăn thì dài ra và cộng điểm, đâm tường hoặc đâm vào chính mình thì hiển thị "Game over" và hỗ trợ chơi lại. Sau khi hiện thực xong, hãy giúp tôi khởi động dự án này. Nếu gặp môi trường chương trình chưa cài đặt, hãy tự động cài môi trường còn thiếu.

Trong quá trình này, bạn cần nhận ra AI không chỉ là mô hình chat; nó có thể giúp bạn thao tác môi trường trên máy: tạo tệp, cài dependency, thực thi lệnh khởi động, v.v. Bạn có thể trực tiếp mô tả mục tiêu bằng ngôn ngữ tự nhiên, còn AI sẽ quyết định cụ thể chạy lệnh nào và tổ chức code ra sao.

Nếu trong quá trình thực thi gặp vấn đề, AI sẽ hiển thị lỗi và phương án xử lý trong cuộc trò chuyện. Bạn có thể tiếp tục yêu cầu nó điều chỉnh qua đối thoại, không cần tự nhớ mọi chi tiết lệnh.

::: warning ⚠️ Cần lưu ý
Như hình bên dưới, **đôi khi AI Agent sẽ tạm dừng trong quá trình thực thi vì nó đang chờ bạn nhập một số thông tin để tương tác**, ví dụ nhập tên cần tạo, nhấn Enter để xác nhận chạy lệnh hoặc bấm vào lệnh để thực thi. Thông thường, chúng ta chỉ cần nhấn Enter. Nếu bạn không chắc bước này cần làm gì, có thể chụp màn hình hiện tại và hỏi mô hình lớn nên thao tác thế nào.
:::

Như hình minh họa, ở đây chúng ta cần bấm Run để xác nhận:
![](../../../zh-cn/stage-1/introduction-to-ai-ide/images/index-2026-01-09-10-52-55.png)

Như hình minh họa, ở đây chỉ cần nhập y để xác nhận:
![](../../../zh-cn/stage-1/introduction-to-ai-ide/images/index-2026-01-09-10-53-24.png)

![](../../../zh-cn/stage-1/introduction-to-ai-ide/images/index-2026-01-09-10-26-33.png)

Như hình minh họa, ở đây chúng ta đang tạo template nhưng không biết thao tác ra sao; có thể chụp màn hình phần này và hỏi mô hình lớn:

![](../../../zh-cn/stage-1/introduction-to-ai-ide/images/index-2026-01-09-10-29-12.png)

Một lý do khác khiến AI Agent tạm dừng trong quá trình thực thi là lúc này đã khởi động một "service". Trò Rắn săn mồi của chúng ta về bản chất cũng là một loại "service". Nếu bạn thấy URL như trong lệnh dưới đây, nghĩa là Agent đã giúp chúng ta chạy một service local trên máy; chúng ta có thể truy cập URL tương ứng để mở trò Rắn săn mồi. Vì service cần tiếp tục chạy, giao diện sẽ rơi vào trạng thái tạm dừng. Lúc này chỉ cần bấm nút `Skip`.

![](../../../zh-cn/stage-1/introduction-to-ai-ide/images/index-2026-01-09-10-30-51.png)

Trong quá trình này, nếu gặp thuật ngữ hoặc nội dung không hiểu, đừng lo. Bạn có thể xem phần "giải thích thuật ngữ máy tính" trong phụ lục, hỏi trực tiếp AI hoặc đặt câu hỏi kịp thời.

Nếu trong quá trình làm gặp hiện tượng không đúng kỳ vọng, ví dụ Rắn săn mồi đâm tường nhưng trò chơi không kết thúc, hoặc bấm bắt đầu mà rắn không di chuyển, lúc này bạn chỉ cần mô tả hiện tượng cho Agent trong sidebar. Nếu gặp lỗi, nhớ chụp màn hình hoặc sao chép lỗi vào sidebar Agent. Nếu nhiều lần vẫn không giải quyết được, hãy thử đổi mô hình.

Chờ một lúc, chúng ta có thể nhận được kết quả tương tự z.ai:

![](../../../zh-cn/stage-1/introduction-to-ai-ide/images/index-2026-01-09-10-33-37.png)

Chúng ta có thể bấm dấu tick ở góc dưới bên phải để xác nhận thay đổi code, hoặc bấm nút `Cancel` để hủy thay đổi. Bạn cũng có thể bấm vào vị trí 2 files need review để mở ra xem code đã thay đổi.

Điểm đáng chú ý nữa là sửa code không phải lúc nào cũng đúng, nên bạn cần biết Agent của các IDE đều hỗ trợ rollback code. Ví dụ, nếu ở đây tôi vô tình thực hiện một thay đổi sai, hoặc kết quả lần này khiến bạn không hài lòng, sau khi sửa xong chúng ta có thể quay lại phần ô nhập, bấm nút Revert để đưa thao tác về trạng thái trước khi sửa. Sau đó bạn có thể chỉnh lại prompt và thao tác lần nữa:

![](../../../zh-cn/stage-1/introduction-to-ai-ide/images/index-2026-01-09-10-42-53.png)

### 4.4 Bước 3 (tùy chọn): hỏi thêm AI về chi tiết hiện thực code

Khi trò Rắn săn mồi đã chạy bình thường, nếu bạn chưa quen frontend hoặc React, có thể tiếp tục ở cùng cửa sổ chat và nhờ AI dẫn bạn xem code bằng cách nói càng đời thường càng tốt. Bạn không cần đổi công cụ, cũng không cần cố lật tài liệu; chỉ cần tiếp tục hỏi xoay quanh dự án hiện tại.

Một cách khá thực dụng là để AI giải thích tổng thể trước "trò chơi vận hành như thế nào", rồi mới tách xuống chi tiết cụ thể. Ví dụ, bạn có thể hỏi trực tiếp:

> "Hãy giải thích từ trên xuống dưới, từng bước trò Rắn săn mồi này vận hành như thế nào. Cố gắng dùng ít thuật ngữ chuyên môn."

![](../../../zh-cn/stage-1/introduction-to-ai-ide/images/index-2026-01-09-10-44-36.png)

Sau đó tiếp tục hỏi sâu theo câu trả lời của nó, ví dụ:

> "Mỗi đốt thân rắn trên màn hình được ghi bằng cấu trúc dữ liệu nào? Có thể ví dụ đời thường không?"  
> "Bạn điều khiển việc 'một lúc di chuyển một lần' như thế nào? Đoạn đó nằm ở đâu trong code?"  
> "Khi rắn ăn được thức ăn, bạn làm những bước nào? Logic nào dùng để xác định đã ăn được?"  
> "Đâm tường và đâm vào chính mình được xác định trong những đoạn code nào?"

Nếu bạn thấy một tệp nào đó, ví dụ `SnakeGame.tsx`, nhưng hoàn toàn không biết nó làm gì, cũng có thể yêu cầu AI giải thích theo từng khối:

> "Hãy chia `SnakeGame.tsx` thành vài khối theo chức năng và giải thích mỗi khối phụ trách việc gì, dùng cách nói dễ hiểu."

Trong vòng đối thoại này, mọi từ bạn không hiểu đều có thể trở thành điểm để hỏi tiếp, ví dụ:

> "Từ 'state' bạn vừa nói cụ thể nghĩa là gì? Có thể dùng ví dụ trong đời sống để giải thích không?"  
> "Timer ở đây chủ yếu dùng để làm gì? Nếu bỏ nó đi thì chuyện gì sẽ xảy ra?"

Bằng cách này, mục tiêu của bạn không phải là ghi nhớ mọi khái niệm ngay lập tức, mà là làm rõ trước ba việc: trong trò chơi này có những dữ liệu cốt lõi nào, như rắn, thức ăn, điểm số, trạng thái trò chơi; các dữ liệu đó thay đổi vào thời điểm nào, như di chuyển, ăn được thức ăn, kết thúc trò chơi; và mỗi loại thay đổi tương ứng với đoạn code nhỏ nào. Chỉ cần thông được ba điểm này, về cơ bản bạn sẽ đọc hiểu được logic chính của code.

### 4.5 Bước 4: để AI làm giao diện đẹp hơn một chút

Ở đây cần nhắc trước một điều rất quan trọng với người mới: đừng chỉ nói với AI một câu "tôi muốn giao diện này đẹp hơn". Cách nói này với designer con người còn quá mơ hồ, huống chi với mô hình. "Đẹp" là phong cách gì, cần chỉnh chỗ nào, vấn đề nằm ở layout hay màu sắc, AI đều không thể đọc ra chỉ từ một câu đó. Để AI thực sự làm ra kết quả gần với kỳ vọng trong đầu bạn, bạn cần học cách tách mục tiêu mơ hồ như "tôi muốn đẹp hơn" thành một chuỗi yêu cầu cụ thể, có thể thực thi.

Ví dụ, ban đầu nhiều người sẽ nói như sau:

> "Tôi muốn làm giao diện này đẹp hơn một chút."

Bạn có thể đưa ra trước một nhóm yêu cầu tổng thể:

> "Hãy giúp tôi làm đẹp tổng thể giao diện trò chơi:
>
> - Vùng trò chơi hiển thị ở giữa, không dính vào góc trên bên trái;
> - Đổi sang màu nền sáng hơn để rắn và thức ăn nổi bật hơn;
> - Phóng to điểm số và đặt ở vị trí dễ thấy;
> - Dùng xanh lam làm màu chủ đạo, làm đẹp phối màu tổng thể và nút bấm."

Nếu muốn khi "game over" có phản hồi rõ hơn, có thể bổ sung:

> "Khi trò chơi kết thúc, hãy hiển thị 'Game over' ở giữa màn hình, bên dưới có nút 'Chơi lại' để reset trò chơi."

AI sẽ dựa trên mô tả của bạn để trực tiếp sửa component React và style. Sau khi lưu và refresh browser, bạn sẽ thấy giao diện mới. Nếu hiệu quả vẫn khác với tưởng tượng của bạn, có thể tiếp tục điều chỉnh từng bước nhỏ, ví dụ:

> "Cho điểm số lớn hơn một chút, màu nổi hơn một chút."  
> "Làm vùng trò chơi gọn hơn một chút, chừa một ít khoảng trắng xung quanh."  
> "Đổi nút Chơi lại sang kiểu bo góc màu xanh lam, đặt ở giữa bên dưới thông báo."

Ở giai đoạn này, nếu một lần sửa nào đó gây lỗi, bạn cũng không cần tự cố tra. Hãy sao chép trực tiếp thông báo lỗi vào cửa sổ chat, hoặc kèm một mô tả ngắn như "đây là lỗi xuất hiện sau khi tôi vừa làm đẹp giao diện", để AI định vị và sửa trong ngữ cảnh dự án hiện tại. Như vậy, bạn có thể trong vòng lặp "liên tục đối thoại, liên tục refresh" dần đánh bóng một demo chạy được thành một sản phẩm nhỏ có giao diện rõ ràng và tương tác mượt.

### 4.6 (Tùy chọn) tham khảo kiến trúc z.ai để chỉnh kết quả Rắn săn mồi

Với người mới làm vibe coding, điều khó nhất thường lại là không biết thế nào mới là "best practice", không biết kiến trúc nào phù hợp nhất. Vì chưa nắm nền tảng máy tính, bạn cũng khó dẫn dắt AI tốt. Cách giải quyết vấn đề này là "tham khảo trực tiếp". Bạn còn nhớ trước đó chúng ta nói trong z.ai có thể xem code không? Thực ra trong README tương ứng, tức phần dùng để giới thiệu chức năng và kiến trúc kỹ thuật của dự án, đã có một tham khảo kiến trúc khá tốt:

![](../../../zh-cn/stage-1/introduction-to-ai-ide/images/index-2026-01-09-10-49-33.png)

Nếu muốn kết quả local gần với kết quả của z.ai nhất có thể, chúng ta có thể sao chép toàn bộ nội dung README này, dán vào sidebar của Trae và yêu cầu nó sửa code local theo kiến trúc trong README.

![](../../../zh-cn/stage-1/introduction-to-ai-ide/images/index-2026-01-09-10-50-31.png)

Cuối cùng, chúng ta có thể nhận được phong cách thiết kế trang rất giống z.ai:

![](../../../zh-cn/stage-1/introduction-to-ai-ide/images/index-2026-01-09-11-00-57.png)

<div style="margin: 50px 0;">
  <ClientOnly>
    <StepBar :active="2" :items="[
      { title: 'Hiểu môi trường', description: 'Hiểu IDE và AI IDE' },
      { title: 'Thực hành local', description: 'Dùng Trae làm Rắn săn mồi' },
      { title: 'Giải thích công cụ', description: 'Làm quen giao diện IDE' },
      { title: 'Kỹ năng giao tiếp', description: 'Trao đổi hiệu quả với AI' }
    ]" />
  </ClientOnly>
</div>

## 5. Mỗi nút trên giao diện dùng để làm gì

Trong các thao tác trên, chúng ta đã nhanh chóng chạy thông vòng khép kín tối thiểu để tạo chương trình, nhưng vẫn chưa thể nói là đã quen IDE. Để thật sự làm quen với công cụ sẽ đồng hành lâu dài này, trong phần này chúng ta sẽ giải thích sâu từng chi tiết của IDE, bắt đầu từ giao diện. Giao diện của các AI IDE khác nhau có thể hơi khác, nhưng phần lớn đều kế thừa [bố cục của VS Code](https://code.visualstudio.com/docs/getstarted/getting-started).

![](../../../zh-cn/stage-1/introduction-to-ai-ide/images/image32.webp)

Tác dụng cụ thể của từng phần là:

- **Title Bar (thanh tiêu đề)**: hiển thị tên tệp và nút điều khiển cửa sổ.
- **Activity Bar (thanh hoạt động)**: chuyển giữa các view chức năng như file, search.
- **Side Bar (sidebar)**: hiển thị danh sách tệp và nội dung cụ thể khác.
- **Editor Groups (vùng editor)**: khu vực cốt lõi để viết code.
- **Breadcrumbs (điều hướng đường dẫn)**: hiển thị đường dẫn tệp, hỗ trợ nhảy nhanh.
- **Minimap (bản đồ thu nhỏ code)**: xem trước và định vị code nhanh.
- **Panel (panel dưới)**: gồm terminal và cửa sổ output.
- **Status Bar (thanh trạng thái)**: hiển thị trạng thái môi trường hiện tại.

Để xem giải thích chi tiết hơn, hãy đọc [phần nguyên lý trực quan hóa IDE trong phụ lục](/vi-vn/appendix/2-development-tools/ide-basics).

<div style="margin: 50px 0;">
  <ClientOnly>
    <StepBar :active="3" :items="[
      { title: 'Hiểu môi trường', description: 'Hiểu IDE và AI IDE' },
      { title: 'Thực hành local', description: 'Dùng Trae làm Rắn săn mồi' },
      { title: 'Giải thích công cụ', description: 'Làm quen giao diện IDE' },
      { title: 'Kỹ năng giao tiếp', description: 'Trao đổi hiệu quả với AI' }
    ]" />
  </ClientOnly>
</div>

## 6. Nói chuyện với AI thế nào mới hiệu quả

Khi năng lực AI ngày càng mạnh, nhiều việc trước đây phải "nhờ lập trình viên viết code" nay đã có thể giao cho AI hoàn thành.  
Nhưng khi dùng thực tế, bạn sẽ thấy: cùng dùng một AI, có người chỉ nói vài câu đã nhận được một dự án nhỏ chạy được, có người trò chuyện rất lâu nhưng kết quả lại hoàn toàn không phải thứ mình muốn. Khác biệt thường không nằm ở "ai thông minh hơn", mà ở cách bạn nói với AI có đủ cụ thể và có đủ từng bước hay không.  
Phần này xuất phát từ một số tình huống thường gặp, giới thiệu các cách đặt câu hỏi phù hợp với người mới hoàn toàn, giúp bạn ổn định hơn khi yêu cầu AI đưa ra kết quả dùng được.

### 6.1 Nói rõ nhu cầu: từ "ý tưởng mơ hồ" đến "mô tả cụ thể"

Nhiều người lần đầu dùng AI thường chỉ nói một câu rất chung chung, ví dụ:

> "Giúp tôi làm một trang web."  
> "Giúp tôi viết một ứng dụng nhỏ."

Trong trường hợp này, AI chỉ có thể tự "đoán" bạn muốn gì, nên nó sẽ tùy tiện đưa ra một thứ trông có vẻ hoàn chỉnh, nhưng thường khác rất xa thứ bạn thật sự muốn làm.  
Để AI hiểu ý bạn hơn, cần tách "ý tưởng trong đầu" ra và dùng vài câu nói rõ từng bước.

Bạn có thể bổ sung từ các khía cạnh sau:

1. **Nói cho nó biết bạn dùng thứ này để làm gì**  
   Ví dụ, đừng chỉ nói "website cá nhân", mà hãy nói:
   - "Tôi muốn làm một trang giới thiệu cá nhân chỉ có một trang, dùng để gửi cho nhà tuyển dụng xem."

2. **Nói cho nó biết đại khái cần những phần nội dung nào**  
   Không cần dùng thuật ngữ chuyên môn, chỉ cần mô tả bạn muốn trên trang xuất hiện gì, ví dụ:
   - "Trang cần có ba phần: trên cùng là tên và một câu tự giới thiệu, giữa trang liệt kê vài kinh nghiệm làm việc, cuối trang đặt email và WeChat."

3. **Nói cho nó biết trình độ và giới hạn của bạn**  
   Để AI làm theo cách người mới có thể chấp nhận, ví dụ:
   - "Tôi hoàn toàn không biết viết code, hãy dùng cách viết đơn giản nhất để tôi có thể copy trực tiếp vào một tệp và mở bằng browser."

4. **Nói cho nó biết bạn muốn nhận kết quả theo cách nào**  
   Ví dụ:
   - "Hãy cho tôi code đầy đủ có thể lưu trực tiếp thành `index.html` và mở trong browser."

Gộp lại, bạn có thể nói với AI như sau:

> "Tôi hoàn toàn không biết viết code. Tôi muốn làm một trang giới thiệu cá nhân chỉ có một trang, dùng để gửi cho nhà tuyển dụng xem.  
> Trang cần ba phần: phía trên là tên và một câu tự giới thiệu, ở giữa là vài kinh nghiệm làm việc, phía dưới là email và WeChat.

Khi bạn nói rõ các thông tin này, AI sẽ tiến gần hơn đến nhu cầu thật của bạn, thay vì tùy tiện đưa một thứ "trông rất xịn nhưng không dùng được".

### 6.2 Dùng đúng nhịp: trước hết "chạy được", rồi mới dần phức tạp

Với người mới hoàn toàn, cái bẫy thường gặp nhất là: vừa bắt đầu đã muốn làm một thứ "rất hoàn chỉnh", "rất nhiều chức năng".  
Ví dụ:

> "Giúp tôi làm một website giống Taobao."  
> "Giúp tôi làm một hệ thống có thể đăng ký, đăng nhập, đặt hàng."

Kết quả thường là: AI đưa cho bạn một đống code lớn; sau khi copy, hoặc không mở được, hoặc lỗi khắp nơi. Bạn cũng không hiểu vấn đề nằm ở đâu, cuối cùng chỉ có thể bỏ cuộc.

Cách phù hợp hơn là **chủ động kiểm soát nhịp**, để AI đi theo bạn từng bước, thay vì một lần ném hết mọi thứ cho bạn. Có thể yêu cầu theo thứ tự sau:

1. **Bước 1: trước hết yêu cầu một "ví dụ tối thiểu"**  
   Chỉ kiểm tra một việc: có nhìn thấy gì trong browser không.  
   Ví dụ:

   > "Hãy cho tôi một ví dụ đơn giản nhất trước, chỉ cần trong browser thấy một dòng 'Đây là trang chủ của tôi' là được.  
   > Sau đó nói từng bước cho tôi: tệp nên đặt tên gì, lưu thế nào, mở thế nào."

2. **Bước 2: trên nền đó, từ từ bổ sung nội dung đầy đủ**  
   Khi bạn xác nhận "thật sự thấy dòng chữ đó", hãy nói tiếp:

   > "Trên nền vừa rồi, hãy giúp tôi thêm một khu vực 'Kinh nghiệm làm việc' và gửi lại toàn bộ code đầy đủ. Đừng chỉ gửi phần thay đổi."

3. **Bước 3: khi cấu trúc gần ổn, hãy nghĩ tiếp đến đẹp hay chưa**  
   Ví dụ:
   > "Hiện trang đã hiển thị nội dung bình thường. Tiếp theo hãy giúp tôi làm đẹp nhẹ: căn giữa tổng thể, tiêu đề lớn hơn, dùng font dễ chịu hơn. Hãy đưa code đầy đủ sau khi cập nhật."

Mỗi lần thêm một bước, bạn hãy chạy thử một lần trước, xác nhận thật sự có thay đổi rồi mới để AI thêm tiếp. Như vậy, dù bước nào có vấn đề, bạn cũng có thể nhanh chóng quay về trạng thái "bản trước vẫn bình thường", thay vì phải làm lại từ đầu.

### 6.3 Tận dụng ảnh chụp và copy: không biết nói thì "ném màn hình cho AI"

Khó khăn của nhiều người mới hoàn toàn không nằm ở "không biết sửa code", mà nằm ở **không biết diễn đạt vấn đề thế nào**.  
Ví dụ:

- Browser đột nhiên hiện một đống lỗi tiếng Anh mà bạn hoàn toàn không hiểu.
- Layout trang web khác với thứ bạn muốn, nhưng bạn cũng không biết dùng từ gì để mô tả.

Trong các tình huống này, không cần cố nặn thuật ngữ chuyên môn. Cách đơn giản nhất là **đưa nguyên thứ bạn nhìn thấy cho AI**.

Có thể làm như sau:

1. **Copy chữ báo lỗi**  
   Khi thấy một chuỗi thông báo lỗi màu đỏ, bạn có thể copy trực tiếp rồi nói:

   > "Đây là toàn bộ thông tin lỗi xuất hiện sau khi tôi chạy. Tôi không hiểu tiếng Anh này; trước hết hãy giải thích bằng lời người bình thường có thể hiểu, đại khái nó nghĩa là gì.  
   > Sau đó nói cho tôi cách sửa đơn giản nhất lúc này."

2. **Cho AI xem ảnh chụp màn hình**
   Nếu bạn cảm thấy "trang này nhìn không đúng", nhưng không biết mô tả, có thể:
   - Chụp ảnh trang hiện tại;
   - Copy toàn bộ đoạn code bạn đang dùng cho AI;
   - Sau đó nói:
     > "Đây là giao diện hiện tại, đây là toàn bộ code hiện tại của tôi.
     > Ban đầu tôi muốn nó là layout ba cột, nhưng giờ lại thành một cột. Hãy giúp tôi xem nguyên nhân và đưa một bản code đầy đủ đã sửa."

   ::: tip 💡 Bổ sung về chức năng ảnh chụp

   Cần lưu ý: **không phải mô hình AI nào cũng hỗ trợ "xem ảnh"**. Điều này liên quan đến hai khái niệm khác nhau:

   - **Mô hình ngôn ngữ lớn thuần văn bản (LLM)**: chỉ xử lý đầu vào văn bản, không thể nhận diện nội dung ảnh. Nếu bạn gửi ảnh chụp cho nó, nó hoặc từ chối xử lý, hoặc không thể hiểu đúng thông tin trong ảnh.

   - **Mô hình đa phương thức**: có thể xử lý đồng thời nhiều loại đầu vào như văn bản, hình ảnh, có thể "hiểu" ảnh chụp bạn gửi và đưa gợi ý dựa trên nội dung ảnh.

   **Tham khảo năng lực của một số mô hình thường gặp** (lấy các mô hình có thể chọn trong Trae làm ví dụ):

   | Mô hình | Có hỗ trợ đầu vào ảnh không |
   |------|-----------------|
   | Dòng Doubao-Seed | ✅ Có |
   | GLM-4.7 / 4.6 | ❌ Không |
   | MiniMax-M2.7 / M2.5 | ❌ Không |
   | DeepSeek-V3.1 | ❌ Không |
   | Kimi-K2.5 | ✅ Có |
   | Kimi-K2-0905 | ❌ Không |
   | Qwen-3-Coder | ❌ Không |
   | Dòng Gemini | ✅ Có |
   | Dòng GPT | ✅ Có |

   **Gợi ý sử dụng**: nếu bạn muốn dùng ảnh chụp để AI hỗ trợ kiểm tra vấn đề giao diện, hãy xác nhận trước mô hình bạn dùng có hỗ trợ đầu vào ảnh. Nếu không hỗ trợ, bạn có thể chuyển sang mô tả vấn đề bằng văn bản hoặc copy-paste thông tin lỗi cho AI.

   :::

3. **Gặp một trang web bạn thích và muốn làm tương tự**  
   Không cần nói "layout này gọi là gì", hãy trực tiếp:
   - Chụp ảnh hoặc copy tiêu đề, đoạn văn chính của trang đó;
   - Rồi nói:
     > "Tôi muốn làm một trang có cấu trúc gần giống thế này, không cần y hệt.  
     > Hãy dùng code đơn giản hơn để dựng một khung tương tự, sau đó tôi sẽ tự thay chữ thành nội dung của mình."

Nói đơn giản: bạn phụ trách "mang thứ mình thấy cho AI", rồi dùng lời mộc mạc nhất nói "tôi muốn nó thành thế nào"; phần còn lại như "dịch thành code, giải thích thuật ngữ, tìm vấn đề" thì giao cho AI.

### 6.4 Khi code AI tạo ra không chạy: một quy trình xử lý chung

Trong luyện tập thực tế, chắc chắn bạn sẽ gặp tình huống này:  
AI rất nghiêm túc đưa bạn một đoạn code, bạn cũng thật thà copy vào, nhưng kết quả hoặc là browser trắng xóa, hoặc hoàn toàn không phải hiệu quả nó mô tả.  
Điều này không có nghĩa là bạn "không học được", cũng không có nghĩa AI hoàn toàn sai; chỉ là giữa bạn và AI còn thiếu vài vòng "xác nhận qua lại".

Khi code "không chạy", bạn có thể nói với AI theo quy trình cố định dưới đây:

1. **Trước hết nói rõ "bạn đã làm gì + hiện tại trông thế nào"**  
   Tránh chỉ nói "không mở được", "không được". Có thể mô tả như sau:

   > Sau khi mở, trang hoàn toàn trắng, không hiển thị câu chào mừng bạn nói.
   > Tôi đã mở trang xxxx, trong đó không có phần tôi vừa nói, nên chưa dùng được.

2. **Gửi toàn bộ code hiện tại cho AI**  
   Nhiều khi vấn đề nằm ở việc copy thiếu một dòng, hoặc nội dung lần trước và lần này bị trộn vào nhau.  
   Bạn có thể nói:

   > "Dưới đây là toàn bộ code trong tệp hiện tại của tôi.  
   > Hãy so sánh xem có chỗ nào thiếu, viết sai hoặc sai thứ tự không.  
   > Hãy trực tiếp đưa tôi một bản code đầy đủ đã sửa, đừng chỉ gửi một đoạn nhỏ."

3. **Nếu có thông báo lỗi, hãy đưa kèm**  
   Ví dụ lỗi bật lên ở góc trên bên phải browser, hoặc một số chữ đỏ ở phía dưới. Bạn có thể:
   - Copy chữ lỗi ra;
   - Hoặc chụp một tấm ảnh;
   - Rồi nói:
     > "Đây là thông báo lỗi tôi nhìn thấy. Tôi hoàn toàn không hiểu; hãy trước hết giải thích đơn giản đây đại khái là vấn đề gì, rồi nói cho tôi hiện cần sửa mấy dòng nào nhất."

4. **Yêu cầu đối phương dùng "chế độ người mới" để nói từng bước**  
   Bạn có thể trực tiếp nói rõ tình trạng của mình để nó đừng bỏ qua bước trung gian:

   > "Tôi hoàn toàn không biết viết code, hãy nói từng bước cho tôi:  
   > Bước 1 cần sửa dòng nào,  
   > Bước 2 cần lưu thế nào,  
   > Bước 3 cần mở lại hoặc refresh trang thế nào.  
   > Mỗi bước hãy viết bằng câu hoàn chỉnh."

5. **Cuối cùng, nhờ nó làm đối chiếu "đáng lẽ phải thấy gì"**  
   Ví dụ:
   > Trước hết hãy nói, theo code bạn đã sửa, trong trường hợp bình thường khi mở trang web tôi nên thấy nội dung gì.

Chỉ cần bạn tương tác với AI theo quy trình này, phần lớn tình huống "code không chạy" đều có thể giải quyết sau vài vòng qua lại.  
Đồng thời, bạn cũng sẽ dần quen các loại vấn đề thường gặp; lần sau gặp tình huống tương tự có thể tự xử lý trực tiếp.

## 7. Tóm tắt và bước tiếp theo

Trong chương này, bạn đã hoàn thành một lần nâng cấp: từ "có thể chơi một trò Rắn săn mồi do AI tạo trên web" đến "có thể tự dùng AI IDE ở local dựng một trò chơi nhỏ". Bạn đã đại khái hiểu ba việc: vì sao viết code không thể thiếu một IDE như VS Code; trên nền đó, khi thêm AI như Trae, Cursor, IDE không còn chỉ là hộp công cụ, mà có thêm một "thực tập sinh kỹ sư" hiểu ngôn ngữ tự nhiên, giúp bạn tạo tệp, cài môi trường và sửa code; cũng như mỗi khu vực trên giao diện IDE, như tệp bên trái, terminal phía dưới, vùng editor ở giữa, panel AI bên phải, phụ trách việc gì, để khi dùng không còn mù mờ.

Quan trọng hơn, bạn đã thực sự chạy thông một quy trình đầy đủ: tạo thư mục rỗng trên local → mở bằng AI IDE → mô tả nhu cầu trong sidebar chat → để AI tạo dự án và khởi động dev server → khi có vấn đề, đưa "hiện tượng + toàn bộ code + ảnh lỗi" cho AI và nhờ nó dùng "chế độ người mới" sửa từng bước. Trong quá trình đó, bạn cũng luyện cách viết prompt hiệu quả hơn: nói rõ mục tiêu, cấu trúc nội dung và trình độ của mình, kiểm soát nhịp tốt, từ "trước hết chạy được" đến "sau đó đẹp hơn, vui hơn".

Chương tiếp theo, chúng ta sẽ chuyển trọng tâm từ "biết dùng công cụ" sang "làm một prototype thật sự có người muốn dùng": xuất phát từ góc nhìn người dùng, thiết kế luật chơi, tương tác và phản hồi, rồi để AI giúp bạn biến các ý tưởng đó thành hình hài sản phẩm ban đầu.

## 8. 📚 Bài tập: dùng AI IDE local làm một trò chơi phức tạp hơn

<el-card shadow="hover" style="margin: 20px 0; border-radius: 12px;">
  <template #header>
    <div style="font-weight: bold; font-size: 16px;">🚀 Thử thách: tạo trò chơi riêng của bạn</div>
  </template>

  <p>
    Bạn đã dùng AI IDE local làm một trò Rắn săn mồi. Bây giờ hãy thử thách bản thân với một trò chơi nhỏ phức tạp hơn và đi trọn quy trình "mô tả nhu cầu →
    tạo dự án → chạy local → debug và lặp".
  </p>

  <ol>
    <li>
      <strong>Chọn một trò chơi phức tạp hơn Rắn săn mồi</strong>
      <ul>
        <li>Có thể là Tetris, Đập chuột, Minesweeper, 2048, bắn máy bay, v.v.</li>
        <li>Hoặc một trò chơi gốc đơn giản do bạn tự tưởng tượng</li>
      </ul>
    </li>
    <li>
      <strong>Phải dùng AI IDE local để hoàn thành toàn bộ quá trình</strong>
      <ul>
        <li>Tạo một thư mục rỗng và mở bằng AI IDE</li>
        <li>Mô tả rõ nhu cầu trò chơi trong sidebar chat</li>
        <li>Để AI phụ trách tạo tệp, dựng cấu trúc dự án và hiện thực logic chính</li>
        <li>Khởi động dev server trên local, đảm bảo trò chơi chạy bình thường</li>
      </ul>
    </li>
    <li>
      <strong>Có "khả năng chơi" và phản hồi cơ bản</strong>
      <ul>
        <li>Ít nhất gồm ba trạng thái: bắt đầu, đang chơi, kết thúc</li>
        <li>Người chơi có cách thao tác rõ ràng, bằng bàn phím hoặc chuột</li>
        <li>Trên màn hình có phản hồi điểm số hoặc tiến độ rõ ràng</li>
      </ul>
    </li>
    <li>
      <strong>Ít nhất thực hiện hơn 2 vòng lặp</strong>
      <ul>
        <li>Vòng đầu để AI làm ra bản "chơi được"</li>
        <li>Từ vòng thứ hai trở đi, từng bước đưa ra cải tiến cụ thể, như style, độ khó, tối ưu tương tác</li>
      </ul>
    </li>
  </ol>
</el-card>

<RelatedArticlesSection
  title="Tiếp tục học"
  description="Nên đi vào thực hành prototype trước, rồi từng bước kết nối năng lực AI."
  :items="relatedArticles"
/>

# Phụ lục

<el-card id="appendix-nav" shadow="hover" style="margin-top: 40px; margin-bottom: 24px; border-left: 5px solid #E6A23C;">
  <div style="font-weight: bold; margin-bottom: 8px;">Điều hướng phụ lục</div>
  <div style="color: #606266; font-size: 14px; line-height: 1.6; margin-bottom: 12px;">
    Đây là tài liệu bổ sung để tra cứu khi cần: khi gặp thuật ngữ không hiểu hoặc không tìm thấy lối vào giao diện, hãy quay lại đây.
  </div>
  <el-row :gutter="16">
    <el-col :span="12">
      <a href="#appendix-1-map" style="text-decoration: none; color: inherit;"><b>Phụ lục 1: bảng tra nhanh thuật ngữ máy tính thường gặp</b></a><br/>
      <span style="font-size: 12px; color: #909399">Khi thấy thuật ngữ máy tính không hiểu, hãy đến đây tra nhanh ý nghĩa. Nên đọc lướt một lần.</span>
    </el-col>
    <el-col :span="12">
      <a href="/vi-vn/appendix/2-development-tools/ide-basics" style="text-decoration: none; color: inherit;"><b>Phụ lục 2: giải thích thanh menu Visual Studio Code</b></a><br/>
      <span style="font-size: 12px; color: #909399">Khi không biết giao diện AI IDE dùng để làm gì, hãy dùng nội dung dưới đây để hỏi AI hoặc trực tiếp đọc.</span>
    </el-col>
  </el-row>
  <div style="margin-top: 12px; font-size: 12px; color: #909399;">
    Hỗ trợ: nhấn Ctrl/⌘+F để tìm từ khóa; khi gặp từ mới, có thể copy lỗi và nhờ AI giải thích bằng "chế độ người mới".
  </div>
</el-card>

# Phụ lục 1: bảng tra nhanh thuật ngữ máy tính thường gặp

<el-card id="appendix-1-map" shadow="hover" style="margin-top: 40px; margin-bottom: 20px; border-left: 5px solid #409EFF;">
  <div style="font-weight: bold; margin-bottom: 10px;">🗺️ Bản đồ thuật ngữ: bạn sẽ gặp ở đây...</div>
  <el-row :gutter="20">
    <el-col :span="6">
      <a href="#term-tool-ui" style="text-decoration: none; color: inherit;">🖥️ <b>Giao diện công cụ</b></a><br/>
      <span style="font-size: 12px; color: #909399">IDE / terminal / panel</span>
    </el-col>
    <el-col :span="6">
      <a href="#term-network" style="text-decoration: none; color: inherit;">🌐 <b>Dịch vụ mạng</b></a><br/>
      <span style="font-size: 12px; color: #909399">URL / port / local</span>
    </el-col>
    <el-col :span="6">
      <a href="#term-frontend-backend" style="text-decoration: none; color: inherit;">⚙️ <b>Frontend và backend</b></a><br/>
      <span style="font-size: 12px; color: #909399">API / JSON / interface</span>
    </el-col>
    <el-col :span="6">
      <a href="#term-code-basic" style="text-decoration: none; color: inherit;">📝 <b>Nền tảng code</b></a><br/>
      <span style="font-size: 12px; color: #909399">biến / hàm / component</span>
    </el-col>
  </el-row>
  <el-row :gutter="20" style="margin-top: 10px;">
    <el-col :span="6">
      <a href="#term-debug" style="text-decoration: none; color: inherit;">🐞 <b>Debug và tìm lỗi</b></a><br/>
      <span style="font-size: 12px; color: #909399">Bug / breakpoint / log</span>
    </el-col>
    <el-col :span="6">
      <a href="#term-project" style="text-decoration: none; color: inherit;">📂 <b>Quản lý dự án</b></a><br/>
      <span style="font-size: 12px; color: #909399">Git / repository / commit</span>
    </el-col>
    <el-col :span="6">
      <a href="#term-ai-tool" style="text-decoration: none; color: inherit;">🤖 <b>Công cụ AI</b></a><br/>
      <span style="font-size: 12px; color: #909399">Agent / model / key</span>
    </el-col>
    <el-col :span="6">
      <a href="#term-browser" style="text-decoration: none; color: inherit;">🛠️ <b>Browser</b></a><br/>
      <span style="font-size: 12px; color: #909399">DevTools / Console</span>
    </el-col>
  </el-row>
</el-card>

Phần này không cần cố học thuộc; điều quan trọng hơn là tạo trước một ấn tượng trong đầu.

## <span id="term-tool-ui">[1. Các từ liên quan đến "giao diện công cụ"](#appendix-1-map)</span>

### 1. IDE, editor, terminal

**IDE (môi trường phát triển tích hợp)**  
Có thể tưởng tượng IDE như "bàn làm việc của lập trình viên":

- Một bên là mặt bàn để viết chữ (editor),
- Một bên có ổ cắm điện và nút bấm (chạy, debug),
- Trong ngăn kéo có nhiều công cụ nhỏ (tìm kiếm, quản lý phiên bản).  
  VS Code, Trae, Cursor đều thuộc IDE hoặc là công cụ được sửa đổi dựa trên IDE.

**Code editor (Editor)**  
Giống "Notepad cao cấp" hơn, chỉ phụ trách:

- Cho bạn gõ code;
- Dùng màu để phân biệt nội dung khác nhau (syntax highlighting);
- Tự động hoàn thành cho bạn.  
  Khu vực viết code trong IDE chính là code editor.

**Terminal / dòng lệnh (Terminal / cửa sổ dòng lệnh)**  
Một cửa sổ nền đen chữ trắng, nơi bạn **nhập lệnh** để máy tính làm việc:

- Ví dụ: `npm run dev` nghĩa là "giúp tôi khởi động dev server";
- `python main.py` nghĩa là "chạy tệp Python này".  
  Có thể tưởng tượng nó là: "bạn gửi từng tin nhắn lệnh cho máy tính, máy tính trả lời kết quả bằng chữ".

### 2. Một số khu vực thường gặp trong IDE

**Activity Bar (thanh hoạt động)**  
Dãy biểu tượng nhỏ nằm dọc ngoài cùng bên trái, giống "tab chức năng":

- Bấm biểu tượng file → bên trái hiển thị danh sách tệp;
- Bấm biểu tượng kính lúp → bên trái chuyển thành tìm kiếm;
- Bấm biểu tượng Git → bên trái hiển thị quản lý phiên bản.

**Side Bar (sidebar)**  
Khu vực lớn bên phải Activity Bar, chuyên hiển thị nội dung trong chế độ hiện tại:

- Chế độ file: hiển thị tệp và thư mục trong dự án;
- Chế độ tìm kiếm: hiển thị danh sách kết quả tìm kiếm;
- Chế độ source control: hiển thị những tệp đã bị thay đổi.

**Editor (vùng chỉnh sửa)**  
Khu vực lớn nhất ở giữa, là nơi bạn thực sự xem và sửa nội dung sau khi mở tệp;  
Các tab phía trên cho biết "hiện đang mở những tệp nào".

**Panel (panel phía dưới)**  
Thường nằm ở phía dưới cùng, có vài loại thường gặp:

- Terminal: nhập lệnh để chạy dự án;
- Problems: liệt kê tệp và số dòng có lỗi;
- Output: thông tin chạy do một số công cụ in ra;
- Debug Console: output khi debug.

**Status Bar (thanh trạng thái)**  
Thanh mảnh ở dưới cùng:

- Hiển thị tệp hiện tại là ngôn ngữ gì (JS, HTML, Python, v.v.);
- Hiển thị indent là "2 spaces" hay "4 spaces";
- Hiển thị có lỗi hay không, nhánh Git hiện tại là gì.  
  Có thể xem nó như "một phiếu khám nhanh của môi trường chỉnh sửa hiện tại".

## <span id="term-network">[2. Các từ liên quan đến "trang web / mạng / service"](#appendix-1-map)</span>

### 1. URL, HTTP, port, service local

**URL (địa chỉ web)**  
Là chuỗi trong thanh địa chỉ browser, ví dụ:

- `https://www.trae.cn/`
- `http://localhost:3000/`  
  Nó giống "địa chỉ đầy đủ của một căn phòng trong thế giới internet".

**HTTP / HTTPS**  
Là `http://` hoặc `https://` bạn thấy ở đầu URL:

- HTTP: cách truyền tải thông thường;
- HTTPS: thêm một lớp mã hóa, an toàn hơn.  
  Bạn có thể tạm nhớ: "khi viết địa chỉ web, thường bắt đầu bằng `http` hoặc `https`".

**Port (cổng)**  
Có thể tưởng tượng một máy tính là một tòa nhà, còn port là **số phòng của từng phòng**:

- `:3000` nghĩa là phòng số 3000;
- Trên cùng một máy tính, có thể mở nhiều service cùng lúc, mỗi service chiếm một port.  
  `http://localhost:3000` nghĩa là "truy cập service đang chạy trong phòng số 3000 trên chính máy tính của tôi".

**Local / localhost (máy cục bộ)**  
Chỉ chính máy tính của bạn.

- `localhost` có thể hiểu là "chính máy này".  
  Khi bạn truy cập `http://localhost:3000`, thực ra bạn đang tương tác với chương trình chạy trên máy của mình, không phải lên mạng truy cập server của người khác.

**Service / Server (dịch vụ / máy chủ)**  
"Service" là một chương trình **luôn chạy ở background và sẵn sàng nghe chỉ dẫn của bạn**:

- Web service: khi browser truy cập một địa chỉ, nó trả về nội dung trang web;
- Game service: phụ trách quản lý ván chơi, lưu trữ, bảng xếp hạng, v.v.  
  Chạy `npm run dev` trong terminal để khởi động dự án, về bản chất là "mở một web service trên local".

## <span id="term-frontend-backend">[3. Các từ liên quan đến "frontend / backend / dữ liệu"](#appendix-1-map)</span>

### 1. Frontend, backend

**Frontend (phần giao diện người dùng)**  
Phần người dùng **nhìn thấy và bấm được**:

- Nút, chữ, hình ảnh, animation trên trang web;
- Trang được viết bằng React / Vue.  
  Phụ trách hiển thị giao diện và phản hồi thao tác người dùng như click, nhập, kéo thả.

**Backend (phần phía máy chủ)**  
Phần người dùng **không nhìn thấy**, chạy trên server:

- Lưu và đọc dữ liệu (thông tin người dùng, đơn hàng, điểm số, v.v.);
- Thực thi quy tắc nghiệp vụ (xác thực đăng nhập, kiểm tra quyền).  
  Bạn có thể ví frontend là "mặt tiền cửa hàng và nhân viên", backend là "kho hàng và hệ thống sổ sách".

### 2. Interface, request, response, JSON

**Interface / API**  
Một bộ quy tắc "hỏi câu hỏi + trả câu trả lời" mà frontend và backend đã thống nhất trước.

- Frontend nói: "Tôi dùng địa chỉ này, định dạng này để hỏi bạn";
- Backend nói: "Tôi dùng định dạng này để trả kết quả cho bạn".

**Request (yêu cầu)**  
Một lần "đặt câu hỏi" frontend gửi cho backend:

- Gửi đến đâu (URL);
- Dùng phương thức gì (GET, POST, v.v.);
- Mang theo tham số gì (ví dụ user ID).

**Response (phản hồi)**  
"Câu trả lời" backend gửi cho frontend:

- Status code (200 thành công, 404 không tìm thấy, 500 lỗi server);
- Dữ liệu thực tế, đa số là JSON.

**JSON**  
Một định dạng biểu diễn dữ liệu bằng cách viết **rất giống JavaScript code**, ví dụ:

```json
{
  "name": "Alice",
  "score": 120
}
```

Có thể hiểu là "sổ ghi key-value phiên bản cho máy", frontend và backend thường dùng nó để trao đổi dữ liệu.

## <span id="term-code-basic">[4. Các từ liên quan đến "bản thân việc viết code"](#appendix-1-map)</span>

### 1. Biến, định danh, state

**Variable (biến)**  
"Nhãn dán lên một phần dữ liệu".

- Ví dụ ghi việc điểm số thành `score`;
- Sau này dùng tên `score` là có thể đọc và ghi phần dữ liệu này:

```js
let score = 0
score = score + 10
```

**Identifier (định danh)**  
"Tên gọi chung cho mọi loại tên bạn tự đặt":

- Tên biến: `score`
- Tên hàm: `moveSnake`
- Tên component: `SnakeGame`  
  Giống như đặt tên thư mục "Ảnh", "Công việc", "Hóa đơn", để tiện phân biệt các "thứ" khác nhau trong code.

**State (trạng thái)**  
"Bản ghi tình huống quan trọng hiện tại" của chương trình:

- Trò chơi đã kết thúc chưa;
- Rắn hiện đang ở ô thứ mấy;
- Điểm hiện tại là bao nhiêu.  
  Trong React, có thể hiểu đơn giản: **state thay đổi thì giao diện cũng phải cập nhật theo**.

### 2. Hàm, component, module

**Function (hàm)**  
Đóng gói một việc "có thể làm lặp đi lặp lại" và đặt tên cho nó:

```js
function sayHello(name) {
  console.log('Hello, ' + name)
}
```

Sau này chỉ cần viết `sayHello('Bob')`, tương đương thực thi lại mấy dòng bên trong.

**Component (thành phần)**  
"Một mảnh giao diện nhỏ + logic nhỏ có thể tái sử dụng" trong frontend:

- Một nút có thể là component;
- Một thanh điều hướng trên cùng có thể là component;
- Toàn bộ khu vực trò chơi cũng có thể là một component.  
  Các component có thể lắp ghép với nhau, giống xếp Lego.

**Module (mô-đun)**  
"Một tệp gồm một nhóm code liên quan":

- `snakeLogic.ts` chuyên đặt code liên quan đến "rắn di chuyển thế nào";
- `score.ts` chuyên đặt code tính điểm.  
  Các module có thể "import / export" lẫn nhau, giống công cụ trong các ngăn kéo khác nhau.

### 3. Cú pháp, ngôn ngữ lập trình, framework

**Syntax (cú pháp)**  
"Quy tắc ngữ pháp" và "thói quen dấu câu" của một ngôn ngữ lập trình:

- Chuỗi phải đặt trong dấu ngoặc;
- Cuối mỗi câu lệnh có cần viết dấu chấm phẩy hay không;
- Khối code phải bọc bằng `{}`.  
  Viết sai cú pháp, compiler / interpreter sẽ báo "syntax error" trực tiếp.

**Programming Language (ngôn ngữ lập trình)**  
Một bộ quy tắc và từ vựng đầy đủ để giao tiếp với máy tính, ví dụ:

- JavaScript、Python、Java、C++、Go……  
  Các ngôn ngữ khác nhau phù hợp với việc khác nhau, cách viết và hệ sinh thái công cụ cũng khác nhau.

**Framework (khung phát triển)**  
Một bộ code và quy ước lớn mà người khác đã "dựng sẵn khung" cho bạn:

- Frontend: React, Vue (giúp xử lý cập nhật giao diện, quản lý state, v.v.);
- Backend: Django, Spring Boot, v.v.  
  Bạn tương đương đang "điền nội dung vào bộ khung có sẵn", nhẹ hơn nhiều so với tự làm từ đầu.

## <span id="term-debug">[5. Các từ liên quan đến "debug / tìm lỗi"](#appendix-1-map)</span>

### 1. Bug, thông báo lỗi, log / console.log

**Bug**  
Khi chương trình hoạt động khác với điều bạn nghĩ, đó là bug:

- Lẽ ra phải xuất hiện nút, nhưng kết quả không có;
- Lẽ ra phải cộng 10 điểm, nhưng lại cộng thêm một đống;
- Vừa mở trang là màn hình trắng.

**Error Message (thông báo lỗi)**  
Đoạn tiếng Anh "trông rất đáng sợ" trên màn hình hoặc trong terminal sau khi chương trình sập.  
Dù khó nhìn, nó thường sẽ cho bạn biết:

- Đại khái lỗi ở đâu;
- Cần kiểm tra gần tệp nào, dòng nào.  
  Bạn có thể copy trực tiếp và đưa cho AI dịch, phân tích.

**Log (nhật ký)**  
Những điều chương trình tự "nói" trong quá trình chạy.  
Phổ biến nhất trong frontend là:

```js
console.log('Điểm hiện tại', score)
```

Có thể hiểu là: **chủ động báo một con số ở bước quan trọng, giúp bạn xác nhận chương trình có đi theo đúng ý mình không**.

> **console.log là gì?**
>
> - `console` có thể hiểu là "bảng đen nhỏ dùng để debug";
> - `.log` là "viết một dòng chữ lên bảng đen nhỏ";
> - Trong browser, nhấn F12 để mở panel Console trong DevTools là có thể thấy các output này.

### 2. Debug, breakpoint, step, snapshot

**Debug (gỡ lỗi / debug chương trình)**  
Khi chương trình có vấn đề, đừng vừa vào đã sửa lung tung, mà hãy:

- Cho chương trình dừng ở một dòng nào đó (breakpoint);
- Xem giá trị hiện tại của từng biến;
- Đi từng bước xuống dưới, quan sát "bắt đầu sai từ đâu".

**Breakpoint (điểm dừng)**  
Có thể tưởng tượng breakpoint là "gắn một nút tạm dừng ở dòng này":

- Bình thường chương trình chạy thẳng xuống;
- Khi chạy đến dòng bạn đặt breakpoint, nó sẽ tạm dừng để bạn kiểm tra.

**Step (thực thi từng bước)**  
Sau khi dừng ở breakpoint, bạn có thể chọn:

- Thực thi từng dòng xuống dưới (step over);
- Đi vào bên trong một hàm để xem chi tiết (step into).  
  Giống như xem động tác nhảy được tách từng bước, thay vì xem video tua nhanh.

**Snapshot: cách hiểu đơn giản**  
Ở đây, "snapshot" có thể hiểu là:

> **Tại một thời điểm, chụp một bức ảnh của "trạng thái hiện tại" để tiện so sánh sau này.**  
> Trong công cụ thực tế, "snapshot" có thể chỉ:

- Trạng thái đầy đủ của dự án tại thời điểm một lần commit;
- Tình trạng tổng thể của memory / biến tại một thời điểm khi debug.  
  Tạm thời bạn chỉ cần nhớ ẩn dụ này là đủ: **snapshot ≈ ảnh lưu lại trạng thái ở một khoảnh khắc**.

## <span id="term-project">[6. Các từ liên quan đến "quản lý dự án"](#appendix-1-map)</span>

### 1. Project, workspace, thư mục

**Project (dự án)**  
Những thứ được đặt trong cùng một thư mục để hiện thực một ứng dụng:

- Tệp mã nguồn
- Tệp cấu hình
- Tài nguyên như hình ảnh, âm thanh, v.v.

**Workspace (không gian làm việc)**  
Khái niệm VS Code / Trae dùng để mô tả "lần này đang mở một nhóm thứ gì":

- Mở một thư mục → một workspace đơn giản;
- Đôi khi cũng có thể gộp nhiều thư mục thành một workspace nhiều dự án.

### 2. Git, repository, commit

**Git (công cụ quản lý phiên bản)**  
Có thể hiểu là "cỗ máy thời gian" của dự án:

- Mỗi lần sửa xong một nhóm nội dung, có thể "chụp một bức ảnh phiên bản";
- Sau này khi cần, có thể quay về một trạng thái lịch sử nào đó.

**Repository / Repo (kho mã nguồn)**  
Sau khi bật Git, thư mục dự án có "bản ghi phiên bản" đó được gọi là repository.

**Commit (lần ghi nhận thay đổi)**  
Mỗi lần bạn thấy "đợt thay đổi này coi như một kết quả theo giai đoạn", bạn có thể:

- Viết một dòng mô tả, ví dụ `Add score panel`;
- Đóng gói toàn bộ thay đổi hiện tại thành một phiên bản;
- Git sẽ lưu trạng thái khoảnh khắc này lại.  
  Hành động này gọi là "tạo một commit".

## <span id="term-ai-tool">[7. Các từ liên quan đến "công cụ phát triển AI"](#appendix-1-map)</span>

### 1. AI IDE, Agent, chế độ SOLO

**AI IDE**  
Trên nền IDE thông thường, thêm một lớp AI "hiểu tiếng người và tự ra tay làm":

- Bạn nói "làm trò Rắn săn mồi", nó có thể giúp dựng dự án và viết code;
- Bạn đưa ảnh lỗi cho nó, nó có thể giải thích trước rồi thử sửa;
- Nó có thể sửa đồng thời qua nhiều tệp, không chỉ hoàn thành từng dòng.

**Agent (tác nhân thông minh)**  
Có thể tưởng tượng Agent là một **kỹ sư AI nhỏ luôn chờ lệnh**:

- Biết đọc cấu trúc dự án của bạn;
- Biết chia nhỏ nhiệm vụ (cài dependency trước, rồi tạo code, rồi chạy dự án);
- Sau khi chạy lỗi, biết tự điều chỉnh phương án theo thông tin lỗi.

**Chế độ SOLO (lấy Trae làm ví dụ)**  
Nghĩa là:

> Bạn chỉ cần nói rõ "đích đến",  
> nó tự lập kế hoạch "đường đi",  
> từng bước thực thi trên local,  
> giữa đường chỉ hỏi bạn có muốn tiếp tục ở các nút quan trọng.

### 2. Model, key (API Key)

**Model (ở đây chỉ mô hình ngôn ngữ lớn)**  
Từ này có thể hiểu đơn giản là "bộ não AI lớn ở phía sau":

- Ví dụ GPT, Claude, Kimi, GLM, v.v.;
- Các mô hình khác nhau có trình độ khác nhau ở "hiểu tiếng Trung", "viết code", "suy luận";
- Trong AI IDE, thường có thể đổi mô hình khác nhau trong menu xổ xuống.

**Key / API Key**  
Bạn có thể hiểu API Key là **một "mật khẩu cao cấp + số định danh" rất dài**,  
tác dụng của nó chỉ có một:

> Nói với server của người khác: "Tôi là người dùng nào, xin cho phép tôi dùng dịch vụ AI của bạn và ghi nhận chi phí cho tôi."

Vài điểm chính:

- Chuỗi này thường là một dãy chữ cái và số ngẫu nhiên rất dài;
- Không được gửi lên nơi công khai như repository, ảnh chụp màn hình, group chat; người khác lấy được là có thể giả mạo tài khoản của bạn;
- Điền API Key vào công cụ tương đương "cắm chìa khóa vào ổ", sau đó công cụ có thể giúp bạn gọi dịch vụ AI tương ứng.

## <span id="term-browser">[8. Các từ liên quan đến "browser / DevTools"](#appendix-1-map)</span>

**Chrome (Google Chrome)**  
Một trong những browser được dùng phổ biến nhất trong phát triển frontend hiện nay:

- Mở trang web nhanh;
- Có sẵn "DevTools" khá mạnh, tiện kiểm tra vấn đề.

**Refresh / Reload (làm mới / tải lại)**  
Tải lại trang web hiện tại:

- Sau khi sửa code frontend, nếu không có công cụ tự refresh, cần tự bấm refresh mới thấy hiệu quả.

**DevTools (công cụ dành cho lập trình viên)**  
Một nhóm panel công cụ trong browser dành riêng cho lập trình viên:

- Xem cấu trúc trang web (Elements);
- Xem style (Styles);
- Kiểm tra lỗi và log (Console);
- Kiểm tra request mạng (Network).  
  Trong Chrome, thường nhấn `F12` hoặc `Ctrl+Shift+I` để mở.

**Console (bảng điều khiển)**  
Một tab trong DevTools, chuyên hiển thị:

- Output của `console.log(...)` bạn viết;
- Lỗi xảy ra trong quá trình chạy, thường là chữ đỏ.  
  Bạn có thể xem nó là "khung chat của chương trình":
- Khi chương trình có điều muốn nói, nó viết ở đây;
- Khi debug, đây là phần bạn thường xem nhất.

Nếu sau này trong quá trình học bạn lại gặp từ mới, cũng có thể yêu cầu AI hỗ trợ bổ sung toàn bộ nội dung theo phong cách này:

- Trước hết viết một câu "nó dùng để làm gì";
- Sau đó viết một câu "có thể tưởng tượng nó là gì";
- Cuối cùng đưa một ví dụ thật đơn giản.  
  Như vậy, "bảng thuật ngữ cá nhân" của bạn sẽ ngày càng dài và hữu dụng, dần giúp bạn giao tiếp với máy tính tốt hơn.
---
title: 'So cap 2: Cong cu lap trinh voi AI'
description: 'Chuyen tu AI tren web sang lam viec local: hieu IDE vs AI IDE, lam game ran san moi voi Trae va nang ky nang noi chuyen voi AI.'
---
