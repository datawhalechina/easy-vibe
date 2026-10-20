# Công cụ lập trình AI CLI

Trong hướng dẫn này, chúng tôi sẽ giới thiệu các Agent lập trình AI chạy trực tiếp trong dòng lệnh. Khác với Agent trong Trae, Cursor mà bạn đã học, công cụ lập trình AI CLI chỉ có thể sử dụng trong terminal. So với Agent tích hợp trong AI IDE, chúng thường có cửa sổ ngữ cảnh dài hơn, tốc độ gọi công cụ nhanh hơn, và có thể tương thích với nhiều loại mô hình lớn hơn. Trong thực chiến AI Vibe Coding mới nhất, chúng ta thường ưu tiên sử dụng công cụ lập trình AI CLI, thay vì Agent mã hóa tích hợp trong IDE.

## Từ CLI nói đến

Bạn còn nhớ CLI mà chúng tôi đã giới thiệu trước đó không? CLI là cách thao tác phần mềm ứng dụng bằng lệnh văn bản thuần túy thông qua terminal hoặc dấu nhắc lệnh, thay vì phụ thuộc vào giao diện đồ họa (GUI -- bạn có thể hiểu đơn giản là giao diện có nút bấm trên máy tính hoặc điện thoại, có thể thao tác bằng cách nhấp, không cần nhập lệnh).

> Trên Windows, các terminal phổ biến bao gồm "Command Prompt (cmd)" và "PowerShell". Bạn có thể nhập "cmd" hoặc "powershell" trong hộp chạy/tìm kiếm trên máy tính để khởi động các chương trình dòng lệnh này.

![](/zh-cn/stage-2/backend/modern-cli/images/image1.png)![](/zh-cn/stage-2/backend/modern-cli/images/image2.png)

CLI thiên về thao tác lệnh văn bản, trong một nhóm nhỏ những người đam mê lập trình theo đuổi sự hoàn hảo (geek), CLI thậm chí còn phổ biến hơn GUI -- họ hy vọng tất cả thao tác đều hoàn thành qua bàn phím, thấy việc dùng chuột lại làm chậm hiệu suất lập trình của mình.

Trong ngành công nghiệp, CLI thường cũng là hình thức giao diện phổ biến nhất, vì GUI cần hệ điều hành vẽ giao diện bổ sung, quản lý cửa sổ, yêu cầu tài nguyên máy tính cao hơn; còn CLI chỉ cần truyền lệnh nhận được cho hệ thống thực thi. Do đó, khi kết nối cụm máy chủ quy mô lớn, chúng ta thường chỉ tương tác qua CLI.

![](/zh-cn/stage-2/backend/modern-cli/images/image3.png)

Đối với nhiều bạn chưa có kinh nghiệm CLI, có thể thấy thao tác CLI rất phức tạp, lệnh quá nhiều, thậm chí lo ngại "một lần vô tình làm hỏng máy". Đừng lo. Còn nhớ trong hướng dẫn trước, chúng ta thường để Trae giúp hoàn thành các thao tác cơ bản không? Ở đây cũng có thể áp dụng hoàn toàn cách suy nghĩ này -- chúng ta có thể để công cụ lập trình CLI giúp chúng ta thực hiện tất cả thao tác CLI: để nó giúp bạn vào thư mục chỉ định, tìm kiếm và xử lý tệp, chạy hoặc sao chép dự án mã nguồn mở, v.v. Toàn bộ quá trình đều có thể hoàn thành thông qua hội thoại với công cụ lập trình AI CLI.

## Khác gì với AI IDE

Chúng ta có thể ví công cụ lập trình AI CLI như z.ai và Trae đã học trước đó. Theo một nghĩa nào đó, công cụ lập trình AI CLI có thể được coi là một z.ai đặc biệt: chúng cũng chỉ cần một cổng hội thoại đơn giản, sẽ tự động thực hiện tất cả thao tác cần thiết cho bạn (chỉ đôi khi bạn cần tự mở trình duyệt để xem kết quả cuối cùng). Còn nếu ví với AI IDE, thì công cụ lập trình AI CLI có thể được coi là module Agent trong IDE -- tức là vùng hội thoại ở thanh bên.

![](/zh-cn/stage-2/backend/modern-cli/images/image4.png)![](/zh-cn/stage-2/backend/modern-cli/images/image5.png)

Tuy nhiên, do các AI IDE khác nhau có cách triển khai Agent khác nhau, năng lực cũng khác nhau đáng kể, hiệu quả lập trình AI thường không ổn định, do đó công cụ lập trình AI CLI thường được phát triển trực tiếp bởi các công ty công nghệ lớn, ví dụ Anthropic đứng sau Claude, OpenAI đứng sau ChatGPT, v.v.

So với các Agent lập trình AI khác, việc trực tiếp sử dụng các sản phẩm từ các nhà sản xuất lớn thường là thực tiễn tốt hơn, đặc biệt Claude Code bản thân là công cụ phục vụ đội ngũ phát triển nội bộ của Anthropic, ngay từ đầu đã được thiết kế xoay quanh "đáp ứng nhu cầu thực sự của kỹ sư".

Để so sánh trực quan hơn, chúng ta có thể xem đơn giản sự khác biệt giữa Claude Code và Agent của một AI IDE (ở đây lấy Cursor làm ví dụ):

| Tính năng | Claude Code | Cursor | Bên ưu thế hơn |
| ----------------- | ------------- | --------------- | ----------- |
| Thực thi tác vụ tự động | Rất mạnh | Khả năng hạn chế | Claude Code |
| Tích hợp IDE | Chỉ dòng lệnh | VS Code gốc | Cursor |
| Tự động hoàn thành mã theo thời gian thực | Không | Trải nghiệm tuyệt vời | Cursor |
| Thao tác đa tệp | Rất mạnh | Khá tốt | Claude Code |
| Thao tác GitHub tích hợp | Có thể commit trực tiếp | Cần thao tác thủ công | Claude Code |
| Chi phí học tập | Trung bình | Dễ bắt đầu | Cursor |
| Độ dài ngữ cảnh | Rất dài | Khá tốt | Claude Code |
| Hỗ trợ gỡ lỗi | Tự động hóa | Nhiều cần thủ công | Claude Code |

Nguồn bảng: <https://northflank.com/blog/claude-code-vs-cursor-comparison>

Nói đơn giản, công cụ lập trình AI CLI thường có thể:

- Hỗ trợ hội thoại liên tục lâu hơn (thậm chí có thể giúp bạn "làm việc cả ngày").
- Cung cấp cửa sổ ngữ cảnh dài hơn (không còn thường xuyên cần bạn nói "tiếp tục").
- Phản hồi nhanh hơn (có thể kết nối nhiều API mô hình tùy chỉnh hơn).

Về các thao tác liên quan đến lập trình, chúng thường thông minh hơn, ổn định hơn so với phần lớn Agent tích hợp trong IDE.

## Các công cụ lập trình AI CLI phổ biến

Hiện tại tuy có nhiều triển khai mã nguồn mở, nhưng trong thực tiễn chúng tôi chỉ giới thiệu hai loại công cụ lập trình AI CLI chính, làm "tổ hợp ưu tiên". Bạn có thể chọn bất kỳ một trong hai theo thói quen của mình, khuyến nghị mạnh mẽ nên thử cả hai, sau đó chọn ra cái phù hợp nhất với bạn.

- Codex sử dụng GPT-5, mạnh hơn về năng lực tổng thể;
- Claude Code thông qua API chuyển tiếp GLM 4.6, trải nghiệm tổng thể gần Claude 4, nhưng giá rẻ hơn.
- OpenCode có thể tự do chuyển đổi và kết hợp mô hình, cung cấp mô hình miễn phí, có thể kiểm soát chi phí tốt hơn.

Tuy nhiên, cái nào tốt hơn trong dự án thực tế chỉ có thể đánh giá thông qua thử nghiệm cá nhân. Việc nắm vững nhiều công cụ lập trình AI luôn có lợi: sau khi thành thạo, bạn có thể linh hoạt chuyển đổi giữa Claude Code, Codex hoặc Trae trong các kịch bản khác nhau. Nếu thử nhiều lần phát hiện công cụ nào hiệu quả chung, có thể trực tiếp đổi công cụ hoặc mô hình khác tiếp tục thử nghiệm.

Đồng thời, do phiên bản mô hình cập nhật rất nhanh, khuyến nghị bạn ưu tiên chọn phương án thể hiện tốt nhất về "tỷ lệ giá (hiệu quả / chi phí)".

### Claude Code

Claude Code là công cụ lập trình AI do Anthropic phát triển dựa trên khả năng mô hình Claude lớn. Kịch bản tương tác chính của nó nằm ở terminal, đồng thời cũng hỗ trợ sử dụng như plugin VS Code. Tương tự như Agent trong AI IDE, nó có thể hiểu sâu kho mã của nhà phát triển, và hoàn thành tác vụ phát triển đầu-cuối thông qua lệnh ngôn ngữ tự nhiên -- bao gồm chỉnh sửa mã, sửa Bug, thực thi và sửa kiểm thử, quản lý quy trình làm việc Git (ví dụ giải quyết xung đột gộp, tạo PR), giải thích mã phức tạp, thực thi lệnh terminal, v.v.

![](/zh-cn/stage-2/backend/modern-cli/images/image6.png)

Ưu điểm chính của Claude Code thể hiện ở: cửa sổ ngữ cảnh cực dài (có thể xử lý tệp hoàn chỉnh thậm chí dự án nhỏ), có thể chủ động làm rõ nhu cầu mơ hồ, tự động lập kế hoạch và phân phối tác vụ thực thi, cũng như khả năng hiểu và giải thích sâu toàn bộ nội dung kho mã. So với Agent IDE thông thường, nó phù hợp hơn với quy trình phát triển "vibe coding nhập môn".

Trong thực tế sử dụng, bạn có thể thông qua lệnh hội thoại, để nó giúp bạn tạo dự án mới, thực hiện thao tác CLI (ví dụ sắp xếp thư mục, đổi tên tệp hàng loạt, triển khai dự án mã nguồn mở, v.v.), cấu hình môi trường phát triển (ví dụ cài đặt và gỡ lỗi môi trường Python). Nếu thấy đoạn mã nào khó hiểu, cấu trúc thư mục nào không rõ ràng, cũng có thể trực tiếp để Claude Code tạo tài liệu phân tích có cấu trúc, hoặc giải thích từng bước nội dung cụ thể.

![](/zh-cn/stage-2/backend/modern-cli/images/image7.png)![](/zh-cn/stage-2/backend/modern-cli/images/image8.png)

![](/zh-cn/stage-2/backend/modern-cli/images/image9.png)![](/zh-cn/stage-2/backend/modern-cli/images/image10.png)

Nếu bạn muốn học Claude Code một cách hệ thống, có thể tham khảo khóa học do Andrew Ng và Anthropic cùng phát triển:
<https://www.bilibili.com/video/BV176t2zSEpr>

Tiếp theo, chúng ta sẽ học cách sử dụng Claude Code. Do việc sử dụng trực tiếp Claude Code chính thức thường tốn kém rất cao (như hình dưới), chúng ta sẽ chuyển sang sử dụng nền tảng API dựa trên các mô hình lớn khác nhưng tương thích với giao thức Claude Code.

![](/zh-cn/stage-2/backend/modern-cli/images/image11.png)

Bạn cần học một số phương án khác nhau dưới đây (tốt nhất nên thử tất cả), cuối cùng chọn phương án phù hợp nhất với bạn làm lộ trình thực hành chính.

Cách đầu tiên là sử dụng trực tiếp API "tương thích giao diện Anthropic". Với sự phổ biến của Claude Code, ngày càng nhiều nhà cung cấp mô hình lớn bắt đầu hỗ trợ cách gọi phong cách Anthropic. Các nhà cung cấp phổ biến bao gồm GLM, Kimi, DeepSeek và Siliconflow, v.v., đều cung cấp giao diện API tương thích. Về cấu hình cụ thể, chúng tôi sẽ nói chi tiết ở phần sau.

Cần lưu ý, Claude Code thường tiêu tốn rất nhiều token, nếu bạn lo ngại phí gọi API quá cao, có thể cân nhắc mua gói tháng của GLM (khoảng 20 tệ/tháng) để kiểm soát chi phí. Nếu muốn cảm nhận chi phí thực tế trước, cũng có thể nạp trước 10 tệ để thử nghiệm quy mô nhỏ.

Một cách khác là sử dụng dự án "Claude Code Route". Đây là một công cụ mã nguồn mở, không chỉ hỗ trợ tất cả giao diện gọi API phổ biến, mà còn cho phép bạn cấu hình tinh chỉnh mô hình sử dụng cho các kịch bản khác nhau, và hỗ trợ kết nối với mô hình lớn triển khai cục bộ. Nhưng do cấu hình phương án này khá phức tạp, khuyến nghị bạn bắt đầu từ phương án đầu tiên.

#### Sử dụng GLM Zhipu làm backend (khuyến nghị)

GLM (General Language Model) là một loạt mô hình ngôn ngữ lớn do Zhipu AI tự nghiên cứu và phát triển. GLM-4.6 là phiên bản mới nhất của dòng GLM hiện tại, điểm nổi bật cốt lõi là hiệu suất xuất sắc trong khả năng mã (đối sánh với Claude Sonnet 4 trong benchmark công khai và tác vụ thực tế, nằm ở top đầu trong nước).

![](/zh-cn/stage-2/backend/modern-cli/images/image12.png)

Nó còn mở rộng cửa sổ ngữ cảnh lên 200K, có thể xử lý văn bản dài và mã quy mô lớn thoải mái hơn, đồng thời tăng cường khả năng suy luận và gọi công cụ, đạt được cân bằng tốt giữa hiệu suất và chi phí.

![](/zh-cn/stage-2/backend/modern-cli/images/image13.png)

Trước khi kết nối GLM, chúng ta cần cài đặt Claude Code trước.

Nếu bạn thấy các bước cài đặt dòng lệnh phiền phức, hoặc gặp lỗi giữa chừng, có thể trực tiếp để Agent của Trae giúp bạn hoàn thành cài đặt.

```python
# Cài đặt Claude Code
npm install -g @anthropic-ai/claude-code

# Vào dự án của bạn
cd your-awesome-project

# Khởi động Claude Code
claude

# Nhấn Ctrl+C để thoát Claude
```

Tiếp theo, chúng ta cần sửa địa chỉ yêu cầu API mặc định của Claude Code, để nó hỗ trợ dịch vụ API của GLM. Bạn có thể trực tiếp sao chép nội dung dưới đây, để Trae giúp bạn tạo biến môi trường tương ứng; hoặc chọn ghi vĩnh viễn vào biến môi trường hệ thống (nếu có vấn đề, cũng có thể để Agent giúp sửa).

Đầu tiên, bạn cần lấy API Key của GLM, và lưu bằng cách bạn thấy tiện nhất.

Địa chỉ phiên bản trong nước: <https://bigmodel.cn/usercenter/proj-mgmt/apikeys>
Địa chỉ phiên bản quốc tế: <https://z.ai/manage-apikey/apikey-list>

Nếu bạn sử dụng **phiên bản GLM trong nước**, vui lòng sử dụng cấu hình biến sau:

```python
# Chạy lệnh sau trong Cmd
# Lưu ý thay `your_zhipu_api_key` bằng API Key bạn vừa lấy
setx ANTHROPIC_AUTH_TOKEN your_zhipu_api_key
setx ANTHROPIC_BASE_URL https://open.bigmodel.cn/api/anthropic
```

Nếu bạn sử dụng **phiên bản GLM quốc tế**, vui lòng sử dụng cấu hình dưới đây:

```python
# Chạy lệnh sau trong Cmd
# Cũng lưu ý thay `your_zai_api_key`
setx ANTHROPIC_AUTH_TOKEN your_zai_api_key
setx ANTHROPIC_BASE_URL https://api.z.ai/api/anthropic
```

Bạn có thể nhập prompt tương tự như sau trực tiếp trong Trae:

⚠️ Nếu bạn cấu hình "biến môi trường vĩnh viễn" thông qua Trae, sau khi cấu hình xong **bắt buộc phải khởi động lại Trae**, nếu không biến môi trường trong terminal tích hợp của nó sẽ không cập nhật, có thể dẫn đến đăng nhập thất bại hoặc lỗi kết nối mạng.

```python
Based on my environment variable settings:
setx ANTHROPIC_AUTH_TOKEN your_zai_api_key
setx ANTHROPIC_BASE_URL https://api.z.ai/api/anthropic

and my key(Replace it with your own key):
681fea485851d29060cc.13gfaendggaFOhb

please help me configure and start Claude Code
```

Bạn sẽ thấy đầu ra quy trình tương tự như dưới:

![](/zh-cn/stage-2/backend/modern-cli/images/image14.png)

> 💡 Biến môi trường là gì?
>
> Biến môi trường về bản chất là một tập thông tin cấu hình "cặp key-giá trị" được lưu trữ trong hệ điều hành, thường tồn tại dưới dạng "tên biến = giá trị cụ thể". Miễn là cấu hình trước trong terminal hoặc cài đặt hệ thống, chương trình có thể đọc các biến này bất cứ lúc nào để lấy thông tin liên quan. Do biến môi trường có thể ghi trực tiếp trong terminal mà không cần sửa mã, chúng ta thường lưu key truy cập mô hình lớn trong biến môi trường để tránh rò rỉ. Chương trình chỉ cần đọc biến môi trường tương ứng để hoàn thành gọi mô hình lớn.
>
> Trong hệ thống Windows, ngoài việc dùng để lưu key truy cập mô hình lớn, biến môi trường còn thường dùng để lưu "đường dẫn gọi" của công cụ dòng lệnh.
>
> Chúng ta biết terminal bản thân cũng là một chương trình. Đôi khi chúng ta muốn khởi động một chương trình bên ngoài trong terminal, ví dụ nhập `claude` trong terminal để khởi động Claude Code. Lý do có thể nhập trực tiếp `claude` để chạy là vì terminal sẽ đọc biến môi trường hệ thống, trong đó biến PATH chứa thư mục nơi chứa tệp thực thi của Claude Code, nên terminal có thể tìm và thực thi nó (tương đương với việc dán đường dẫn tuyệt đối của chương trình đó vào terminal rồi nhấn Enter).
>
> Một biến môi trường điển hình có thể trông như: `PATH=C:\Windows\system32;C:\Program Files\Python`. Như vậy chúng ta có thể thực thi các chương trình này trong hệ thống ở bất kỳ đường dẫn nào, ví dụ trực tiếp gõ `python` trong dòng lệnh để khởi động trình thông dịch Python.
>
> Nếu bạn muốn xem biến môi trường hiện tại của hệ thống, có thể nhập "biến môi trường" trong tìm kiếm Windows, trong cửa sổ "Chỉnh sửa biến môi trường hệ thống" sẽ thấy tất cả các biến và giá trị của chúng. Có biến dùng để lưu key mô hình lớn, có biến dùng để thêm thư mục chương trình, tiện gọi tại bất kỳ đường dẫn nào.

Bây giờ, bạn có thể sử dụng GLM mới nhất để phát triển với Claude Code. Bạn có thể thử chạy lại một dự án đã làm trước đó, hoặc thử lại những tác vụ mà Trae chưa hoàn thành tốt, so sánh sự khác biệt trong trải nghiệm.

🎉 Việc "bắt đầu lại từ đầu" lặp đi lặp lại không phải lãng phí thời gian -- mỗi lần bạn làm lại, kỹ năng sẽ vững thêm một bậc.

Với cùng cách tiếp cận như GLM, bạn cũng có thể dễ dàng kết nối các giao diện tương thích định dạng Anthropic khác.

#### Sử dụng Kimi K2 làm backend (khuyến nghị)

Kimi K2 là mô hình ngôn ngữ lớn thế hệ mới do Moonshot AI ra mắt, thể hiện xuất sắc trong khả năng hiểu và tạo mã. Kimi K2 hỗ trợ cửa sổ ngữ cảnh siêu dài (tối đa 200K tokens), có thể dễ dàng xử lý kho mã lớn và dự án phức tạp.

**Ưu điểm cốt lõi:**

- **Ngữ cảnh siêu dài**: Hỗ trợ cửa sổ ngữ cảnh 200K, có thể xử lý toàn bộ mã dự án cùng lúc
- **Khả năng mã mạnh**: Thể hiện xuất sắc trong tạo mã, tái cấu trúc và gỡ lỗi
- **Hiểu tiếng Trung tốt**: Hiểu chính xác hơn nhu cầu lập trình tiếng Trung
- **Gọi công cụ ổn định**: Hỗ trợ gọi hàm và sử dụng công cụ ổn định

**Lấy API Key:**

Truy cập <https://platform.moonshot.cn/console/account> đăng ký và lấy API Key.

**Phương pháp cấu hình:**

Tài liệu tham khảo: <https://platform.moonshot.cn/docs/guide/agent-support>

```bash
export ANTHROPIC_BASE_URL=https://api.moonshot.cn/anthropic
export ANTHROPIC_AUTH_TOKEN=sk-YOURKEY
```

#### Sử dụng Minimax làm backend (khuyến nghị)

Minimax là mô hình ngôn ngữ lớn thế hệ mới do MiniMax (Xi Yu Ke Ji) ra mắt, thể hiện xuất sắc trong tác vụ lập trình. Mô hình Minimax nổi tiếng với khả năng suy luận xuất sắc và chất lượng tạo mã, đặc biệt phù hợp với các kịch bản lập trình phức tạp.

**Ưu điểm cốt lõi:**

- **Khả năng suy luận mạnh**: Thể hiện xuất sắc trong suy luận logic phức tạp và thiết kế kiến trúc mã
- **Chất lượng mã cao**: Mã tạo ra có cấu trúc rõ ràng, khả năng đọc tốt
- **Hỗ trợ đa ngôn ngữ**: Hỗ trợ tạo và chuyển đổi mã bằng nhiều ngôn ngữ lập trình
- **Tốc độ phản hồi nhanh**: Tốc độ phản hồi API nhanh, phù hợp kịch bản gọi tần suất cao

**Lấy API Key:**

Truy cập <https://platform.minimax.io/> đăng ký và lấy API Key.

**Phương pháp cấu hình:**

```bash
export ANTHROPIC_BASE_URL=https://api.minimax.io/anthropic
export ANTHROPIC_AUTH_TOKEN=YOUR_MINIMAX_API_KEY
export ANTHROPIC_MODEL=MiniMax-M3.1-Flash
```

Use `MiniMax-M3.1-Flash` for new configurations, or set `ANTHROPIC_MODEL=MiniMax-M3` explicitly. Keep any intentionally saved legacy or custom model ID. These are direct API model IDs; check your account's access before using a subscription plan. Flash requires adaptive thinking: do not disable thinking or set effort to `none`. See the [MiniMax API compatibility reference](https://platform.minimax.io/docs/api-reference/text-anthropic-api).

#### Sử dụng DeepSeek làm backend (khuyến nghị)

DeepSeek là mô hình ngôn ngữ lớn mã nguồn mở do DeepSeek ra mắt, được nhà phát triển yêu thích nhờ khả năng mã xuất sắc và tỷ lệ giá cao. DeepSeek Coder được tối ưu hóa và huấn luyện đặc biệt cho các tác vụ lập trình.

**Ưu điểm cốt lõi:**

- **Khả năng mã nổi bật**: Thể hiện xuất sắc trong tạo mã, hiểu mã và sửa Bug
- **Mã nguồn mở có thể tùy chỉnh**: Mô hình mã nguồn mở, có thể tinh chỉnh theo nhu cầu
- **Tỷ lệ giá cao**: Giá API tương đối thấp, phù hợp sử dụng tần suất cao
- **Hỗ trợ tiếng Trung tốt**: Hiểu chính xác kịch bản lập trình tiếng Trung

**Lấy API Key:**

Truy cập <https://platform.deepseek.com/usage> đăng ký và lấy API Key.

**Phương pháp cấu hình:**

```bash
export ANTHROPIC_BASE_URL=https://api.deepseek.com/anthropic
export ANTHROPIC_AUTH_TOKEN=YOU_DEEPSEEK_API_KEY
export API_TIMEOUT_MS=600000
export ANTHROPIC_MODEL=deepseek-chat
export ANTHROPIC_SMALL_FAST_MODEL=deepseek-chat
export CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC=1
```

#### Sử dụng Volcano Engine Coding Plan làm backend (khuyến nghị)

Volcano Engine là nền tảng dịch vụ đám mây dưới trướng ByteDance, cung cấp dịch vụ mô hình AI cấp doanh nghiệp. Coding Plan của Volcano Engine được tối ưu hóa đặc biệt cho kịch bản lập trình, cung cấp khả năng tạo mã ổn định và hiệu quả.

**Ưu điểm cốt lõi:**

- **Ổn định cấp doanh nghiệp**: Cung cấp SLA, đảm bảo tính ổn định của dịch vụ
- **Tối ưu hóa kịch bản mã**: Được tối ưu hóa đặc biệt cho tác vụ lập trình
- **Lựa chọn mô hình phong phú**: Hỗ trợ nhiều mô hình, bao gồm Doubao-pro, Doubao-lite, v.v.
- **Truy cập nhanh trong nước**: Triển khai nút trong nước, tốc độ truy cập nhanh

**Lấy API Key:**

Truy cập <https://console.volcengine.com/ark/region:ark+cn-beijing/apiKey> đăng ký và lấy API Key.

**Phương pháp cấu hình:**

```bash
export ANTHROPIC_BASE_URL=https://ark.volces.com/api/anthropic
export ANTHROPIC_AUTH_TOKEN=YOUR_VOLCANO_API_KEY
export ANTHROPIC_MODEL=doubao-pro-32k
```

#### Các API tương thích Anthropic khác

Siliconflow:

```bash
export ANTHROPIC_BASE_URL="https://api.siliconflow.cn/"
export ANTHROPIC_MODEL="moonshotai/Kimi-K2-Instruct-0905"    # Có thể tự sửa mô hình cần sử dụng
export ANTHROPIC_API_KEY="YOUR_SILICONCLOUD_API_KEY"    # Vui lòng thay API Key
```

Aliyun DashScope (Aliyuncs): <https://help.aliyun.com/zh/model-studio/get-api-key>

```python
export ANTHROPIC_BASE_URL="https://dashscope.aliyuncs.com/apps/anthropic"
export ANTHROPIC_API_KEY="YOUR_DASHSCOPE_API_KEY"
```

::: details Sử dụng Claude Code Route làm backend (cách dùng nâng cao)

Ở trên chúng tôi đã giải thích cách sử dụng API chính thức GLM để thay thế giao diện Anthropic của Claude Code. Tiếp theo, hãy xem công cụ Claude Code Router giúp Claude Code thích ứng với nhiều mô hình API hơn như thế nào.

[Claude Code Router](https://github.com/musistudio/claude-code-router) là công cụ tăng cường định tuyến thông minh được thiết kế riêng cho Claude Code. Vai trò cốt lõi của nó là giúp người dùng phân phối yêu cầu AI đến các mô hình trên các nền tảng khác nhau theo nhu cầu, và có thể tùy chỉnh cao. Nó hỗ trợ kết nối hàng chục nền tảng, bao gồm OpenRouter, DeepSeek, Ollama, Gemini, v.v., cũng có thể định tuyến tác vụ đến mô hình cụ thể theo kịch bản, như GLM-4.5, Kimi-K2, Qwen3-Coder, v.v. Ví dụ, bạn có thể tự động giao tác vụ nền cho Ollama cục bộ để tiết kiệm chi phí; giao tác vụ văn bản dài/mã dài cho Gemini-2.5-Pro; giao giải thích mã cho DeepSeek.

![](/zh-cn/stage-2/backend/modern-cli/images/image16.png)

Công cụ này còn cung cấp khả năng quản lý cấu hình UI/CLI thuận tiện, và thông qua "bộ chuyển đổi (converter)" thích ứng định dạng API của các nền tảng khác nhau. Nó hỗ trợ tích hợp tự động như GitHub Actions và mở rộng tùy chỉnh, giải quyết vấn đề "một mô hình không thể bao phủ tất cả kịch bản" và "chuyển đổi nền tảng thường xuyên rất phiền", giúp người dùng sử dụng công cụ AI linh hoạt và tiết kiệm hơn.

![](/zh-cn/stage-2/backend/modern-cli/images/image17.png)

Dưới đây chúng tôi giới thiệu đơn giản cách cài đặt Claude Code Router. Khoảng cần các bước sau (cũng có thể để Trae giúp bạn thực thi), để chuẩn bị môi trường liên quan:

```markdown
npm install -g @anthropic-ai/claude-code
npm install -g @musistudio/claude-code-router
```

Sau khi cài đặt, bạn cần xác nhận cục bộ có thể sử dụng lệnh `ccr`. Nếu thấy đầu ra tương tự như dưới, tức là cài đặt thành công:

![](/zh-cn/stage-2/backend/modern-cli/images/image18.png)

Tiếp theo, có hai cách để khởi tạo và cấu hình mô hình:

- Sử dụng UI tích hợp của CCR, mở trang cấu hình nó cung cấp trong trình duyệt để thao tác;
- Trực tiếp sửa tệp cấu hình mặc định của CCR (về bản chất UI cũng đang sửa tệp cấu hình, chỉ cung cấp giao diện trực quan hơn).

Nếu chọn sử dụng CCR UI, bạn sẽ thấy giao diện tương tự như dưới:

![](/zh-cn/stage-2/backend/modern-cli/images/image19.png)

Lúc này nhấp vào nút "Add Provider", sẽ thấy giao diện như dưới. Bạn cần:

1. Nhập tên nhà cung cấp mô hình trong Name;
2. Nhập địa chỉ giao diện OpenAI tương thích của nhà cung cấp đó trong API Full URL;
3. Nhập API Key của nền tảng tương ứng trong API Key;
4. Nhập tên mô hình trong vùng Models, nhấp "Add Model" để thêm;
5. Cuối cùng nhấp "Save" để lưu cấu hình.

(Cuộn xuống giao diện còn nhiều tùy chọn nâng cao, nhưng hiện tại bạn có thể bỏ qua trước.)

![](/zh-cn/stage-2/backend/modern-cli/images/image20.png)

Dưới đây là ví dụ cấu hình DeepSeek và Kimi:

![](/zh-cn/stage-2/backend/modern-cli/images/image21.png)

![](/zh-cn/stage-2/backend/modern-cli/images/image22.png)

Sau khi lưu cấu hình mô hình, còn cần chỉ định mô hình mặc định (Default) trong vùng Router bên phải. Nhấp vào dropdown tương ứng, đặt thành `kimi` (khuyến nghị), sau đó nhấp `Save and Restart` ở góc phải phía trên.

![](/zh-cn/stage-2/backend/modern-cli/images/image23.png)

Sau đó, chỉ cần nhập `ccr code` trong terminal, là có thể khởi động quy trình lập trình Claude Code thông qua Claude Code Router.

![](/zh-cn/stage-2/backend/modern-cli/images/image24.png)

:::

#### Cách dùng nâng cao của Claude Code

Nhiều người khi mới bắt đầu sử dụng Claude Code chỉ dùng nó như công cụ hội thoại thông thường. Nhưng thực tế, nó tích hợp nhiều khả năng phong phú, giúp bạn sử dụng hiệu quả và linh hoạt hơn. Dưới đây là một số lệnh và cách dùng phổ biến:

Tài liệu tham khảo:

<https://docs.claude.com/en/docs/claude-code/cli-reference>
<https://docs.claude.com/en/docs/claude-code/slash-commands>

| Lệnh | Vai trò | Ví dụ |
| ----------------- | ----------------------------------------- | ---------------------------------------- |
| claude | Khởi động chế độ tương tác | `claude` |
| claude "query" | Thực thi tác vụ một lần và xuất kết quả | `claude "explain this project"` |
| claude -p "query" | Thực thi câu hỏi một lần và tự động thoát sau khi kết thúc | `claude -p "explain this function xxxx"` |
| claude -c | Tiếp tục phiên gần nhất | `claude -c` |
| claude -r | Khôi phục phiên trước | `claude -r` |
| /resume | Chuyển về phiên trước trong cuộc trò chuyện hiện tại | `claude -c`, `/resume` |
| /plugin | Quản lý plugin, có thể cài đặt mở rộng năng lực commit và xem xét | `/plugin` |
| /init | Khởi tạo mô tả dự án với CLAUDE.md | `/init` |
| /clear | Xóa ngữ cảnh phiên hiện tại, tránh quá tải thông tin | `/clear` |
| /compact | Nén lịch sử phiên, giảm chiếm dụng token ngữ cảnh | `/compact` |
| /cost | Xem chi tiêu hiện tại | `/cost` |
| /model | Chuyển đổi mô hình sử dụng (khi dùng API tương thích thường có thể bỏ qua) | `/model` |
| /memory | Quản lý tệp nhớ CLAUDE.md | |
| /help | Hiển thị danh sách lệnh có sẵn | `/help` |
| exit or Ctrl+C | Thoát Claude Code | `exit` hoặc `Ctrl+C` |
| /agents | Chức năng nâng cao, sẽ giải thích ở phần sau | |
| /mcp | Chức năng nâng cao, sẽ giải thích ở phần sau | |

**CLAUDE.md**

Tham khảo: <https://www.anthropic.com/engineering/claude-code-best-practices>

`CLAUDE.md` là tệp đặc biệt mà Claude sẽ tự động đọc và thêm vào ngữ cảnh khi bắt đầu hội thoại. Do đó, nó rất phù hợp để ghi lại:

- Các lệnh bash thường dùng
- Các tệp và hàm công cụ cốt lõi
- Quy ước phong cách mã
- Mô tả cách kiểm thử
- Quy ước hợp tác kho (ví dụ quy tắc đặt tên nhánh, dùng merge hay rebase, v.v.)
- Mô tả cấu hình môi trường phát triển (ví dụ có dùng pyenv không, khuyến nghị trình biên dịch nào, v.v.)
- Các điểm cần đặc biệt lưu ý trong dự án hoặc dễ gặp lỗi
- Bất kỳ thông tin nào bạn muốn Claude "nhớ"

`CLAUDE.md` bản thân không có yêu cầu định dạng bắt buộc, miễn là ngắn gọn, dễ đọc cho con người. Ví dụ:

```
# Bash commands
- npm run build: Build the project
- npm run typecheck: Run the typechecker

# Code style
- Use ES modules (import/export) syntax, not CommonJS (require)
- Destructure imports when possible (eg. import { foo } from 'bar')

# Workflow
- Be sure to typecheck when you're done making a series of code changes
- Prefer running single tests, and not the whole test suite, for performance
```

#### Nguyên lý hoạt động nội bộ của Claude Code

Tham khảo: <https://github.com/shareAI-lab/analysis_claude_code>

Nếu bạn tò mò tại sao Claude Code hữu dụng hơn các công cụ Agent lập trình như Trae hoặc Cursor trong nhiều kịch bản, chúng ta có thể xem đơn giản cơ chế hoạt động nội bộ của nó.

Các công cụ lập trình AI CLI khác cũng có cách triển khai tổng thể tương tự.

![](/zh-cn/stage-2/backend/modern-cli/images/image25.png)

Claude Code sẽ phân giải tác vụ lập trình thành một vòng lặp "cảm nhận--suy nghĩ--hành động--xác minh" liên tục, và trong đó gọi các công cụ khác nhau để hoàn thành tác vụ. Nó mô phỏng quy trình làm việc của nhà phát triển: liên tục "viết mã -> chạy -> xem kết quả -> cải tiến". Hệ thống nội bộ liên tục thực hiện các bước thông qua vòng lặp tác vụ chính, trong mỗi vòng, Claude đều có thể gọi các công cụ khác nhau -- ví dụ đọc ghi tệp, thực thi lệnh, tìm kiếm mã, v.v. -- sau đó dựa trên kết quả thực tế trả về từ công cụ để quyết định hành động tiếp theo.

Trong đó có một số đặc tính chính đáng chú ý:

- **Xử lý luồng (Stream Processing)**: Claude có thể vừa suy nghĩ vừa xuất kết quả, thay vì phải đợi tất cả mã viết xong mới thực thi.
- **Nén thông minh (Intelligent Compression)**: Hội thoại dài dễ dẫn đến ngữ cảnh quá dài, Claude giảm xác suất "quên" bằng cách nén lịch sử thành thông tin chính, và đảm bảo vận hành hiệu quả thông qua việc phân biệt trí nhớ ngắn hạn và dài hạn.
- **Kiểm soát đồng thời (Concurrency Control)**: Thiết kế song song nội bộ cho phép nhiều tác vụ tiến hành đồng thời, không can thiệp lẫn nhau.
- **Quản lý Agent con (Sub-agent Management)**: Trong công việc thực tế không chỉ tương đương với một "vai trò" xử lý tất cả mọi việc, bạn có thể quản lý nhiều Agent con phối hợp xử lý mã, mỗi Agent chịu trách nhiệm các tác vụ khác nhau, ví dụ chuyên trách kiểm thử, chuyên trách viết tài liệu, v.v.

### Codex

![](/zh-cn/stage-2/backend/modern-cli/images/image26.png)

![](/zh-cn/stage-2/backend/modern-cli/images/image27.png)

Tương tự như Claude Code, Codex là công cụ lập trình AI do OpenAI phát triển, bạn có thể hiểu nó là "phiên bản OpenAI của Claude Code". Ưu điểm lớn nhất của nó là khả năng thích ứng hiệu quả với GPT-5.

Từ trải nghiệm thực tế, GPT-5 hiện tại phản hồi nhanh hơn, tỷ lệ lỗi thấp hơn (xác suất hoàn thành đúng trong tác vụ phức tạp nhiều vòng cao hơn). Một nhược điểm của nó là giải thích thường thiên về "học thuật" và "kỹ thuật", đôi khi quá nghiêm ngặt, lượng thông tin lớn, đối với người mới bắt đầu có thể hơi khó hiểu.

Bạn có thể cài đặt Codex thông qua lệnh dưới:

```
npm i -g @openai/codex
```

#### Sử dụng API chính thức OpenAI làm backend

Nếu trực tiếp sử dụng cổng Codex chính thức của OpenAI, cấu hình sẽ rất đơn giản: sau khi bạn đã đăng ký gói đăng ký OpenAI hoặc được cấp hạn mức API tương ứng, chỉ cần nhập `codex` trong dòng lệnh để khởi động chương trình, và hoàn thành đăng nhập theo hướng dẫn.

![](/zh-cn/stage-2/backend/modern-cli/images/image28.png)

![](/zh-cn/stage-2/backend/modern-cli/images/image29.png)

#### Sử dụng cách chuyển tiếp API OpenAI làm backend

Do API OPENAI chính thức có thể có giá cao, yêu cầu mạng khắt khe và các vấn đề khác, để tránh các hạn chế này, chúng ta cũng có thể thông qua dịch vụ cổng API bên thứ ba khác để chuyển tiếp gọi.

Với cách này, chúng ta chỉ cần mua hạn mức Codex API tương ứng trên nền tảng chuyển tiếp bên thứ ba, là có thể nhận được trải nghiệm sử dụng gần với OpenAI Codex gốc.

Tham khảo: <https://open-dev.feishu.cn/wiki/PAqUwWG4IiuwTvkQ2sGcaQuPnXc>
Địa chỉ nạp tiền: <https://api.zyai.online/account/topup/recharge>

Cần lưu ý, sau khi lấy token hạn mức, chúng ta còn cần cấu hình API Key cục bộ.

Trong cài đặt nhóm key, cần lưu ý chọn mục chuyên dùng cho Codex.

![](/zh-cn/stage-2/backend/modern-cli/images/image30.png)

Tiếp theo, chúng ta cần điền Key đã lấy vào prompt dưới đây, và đưa toàn bộ prompt cho Trae, để nó giúp bạn hoàn thành toàn bộ quá trình cấu hình:

````bash
My API key is: [Paste your obtained sk-xxxxx key here]

Please help me complete the following configuration tasks:

1. Create configuration directory
   - Create a `.codex` folder under my user directory
   - Windows path should be: `C:\Users\[My Username]\.codex`
2. Backup existing configuration (if exists)
   - Check if `.codex\config.toml` exists
   - If it exists, rename it to `config.toml.bak.[current timestamp]` (timestamp format: yyyyMMddHHmmss)
3. Create configuration file
   - Create `config.toml` in the `.codex` directory
   - Write the following complete content:
   ```toml
   preferred_auth_method = "apikey"

   [model_providers.myrelay]
   name = "My Relay Station"
   base_url = "https://api.zyai.online/v1"
   env_key = "MYRELAY_API_KEY"
   wire_api = "responses"
   request_max_retries = 4
   stream_max_retries = 10
   stream_idle_timeout_ms = 300000

   [profiles.myrelay]
   model_provider = "myrelay"
   model = "gpt-5"
   model_reasoning_effort = "medium"

   [tools]
   web_search = true

4. Set system environment variable
Variable name: MYRELAY_API_KEY
Variable value: The key I gave you

5. Confirm completion and report back:

The full path of the configuration file
Whether the environment variable was set successfully
I can use the command `codex --profile myrelay` to run it
````

Sau khi cấu hình xong, bạn có thể khởi động Codex sử dụng API chuyển tiếp thông qua `codex --profile myrelay`. Cách sử dụng sau đó tương tự như Claude Code: chỉ cần nhập suy nghĩ và nhu cầu của bạn vào ô hội thoại bất kỳ lúc nào.

### OpenCode

![](/zh-cn/stage-2/backend/modern-cli/images/image32.png)

![](/zh-cn/stage-2/backend/modern-cli/images/image33.png)

OpenCode là một nền tảng AI Coding Agent mã nguồn mở dành cho nhà phát triển, định vị tương tự như "phiên bản Claude Code đa mô hình". Nó lấy Terminal làm cổng tương tác cốt lõi, đồng thời hỗ trợ tích hợp trình soạn thảo (như VS Code, Neovim, v.v.), có thể truy cập sâu kho mã cục bộ, và hoàn thành toàn bộ quy trình phát triển từ hiểu mã đến thực thi kỹ thuật thông qua ngôn ngữ tự nhiên.

Nó không phải công cụ lập trình AI gắn với một mô hình duy nhất, mà là một nền tảng AI Coding Agent mở có thể tự do chuyển đổi GPT, Claude, Gemini và thậm chí mô hình cục bộ. Ngay cả OpenAI chính thức cũng hỗ trợ OpenCode kết nối Codex/OpenAI subscription.

![](/zh-cn/stage-2/backend/modern-cli/images/image34.png)

Bạn có thể cài đặt OpenCode thông qua lệnh dưới:

```bash
# Linux / Unix
curl -fsSL https://opencode.ai/install | bash

# Windows
npm i -g opencode-ai
```

#### Sử dụng mô hình miễn phí trong OpenCode

Trong OpenCode thỉnh thoảng sẽ có mô hình miễn phí để sử dụng, cấu hình cũng rất đơn giản. Bạn có thể nhập `opencode` tại vị trí cần sử dụng OpenCode trong dòng lệnh để khởi động chương trình OpenCode vào bảng điều khiển trò chuyện. Nhập lệnh `/models` tìm kiếm từ khóa free là có thể thấy các mô hình miễn phí có chữ free.

![](/zh-cn/stage-2/backend/modern-cli/images/image35.png)

Thông thường mô hình miễn phí hoàn thành tác vụ lập trình sẽ chậm hơn so với mô hình trả phí/đăng ký, điều này thường phụ thuộc vào việc đường truyền mô hình có bị tắc nghẽn hay không, có phải giai đoạn cao điểm lập trình hay không và năng lực bản thân của mô hình.

#### Sử dụng mô hình bên thứ ba làm mô hình lập trình chính của OpenCode

Đây là ưu điểm cốt lõi của OpenCode, nó có thể cho phép bạn tự do chuyển đổi mô hình trong khi sử dụng cùng MCP, Skills, ngữ cảnh để hoàn thành các tác vụ lập trình khác nhau. Phần dưới lấy GPT-5.3 Codex chính thức của OpenAI làm ví dụ, kết nối OpenCode làm mô hình lập trình chính.

Nhập lệnh `/connect` trong cửa sổ trò chuyện của OpenCode, chọn chỉ thị đầu tiên phù hợp nhất nhấn enter, là có thể tiến hành chọn xác thực ủy quyền nhà cung cấp mô hình bên thứ ba.

![](/zh-cn/stage-2/backend/modern-cli/images/image36.png)

Ở đây chọn OpenAI làm ví dụ, nhấn enter để chọn phương thức xác thực.

![](/zh-cn/stage-2/backend/modern-cli/images/image37.png)

Chọn loại nào cũng được, chỉ là phương thức xác thực khác nhau. Ở đây chọn loại đầu tiên để đăng nhập qua trình duyệt.

![](/zh-cn/stage-2/backend/modern-cli/images/image38.png)

Sao chép liên kết này vào trình duyệt để thực hiện đăng nhập OpenAI bình thường, sau khi trình duyệt hiển thị Authorization Successful, client OpenCode sẽ tự động chuyển đến giao diện chọn mô hình OpenAI.

![](/zh-cn/stage-2/backend/modern-cli/images/image39.png)

![](/zh-cn/stage-2/backend/modern-cli/images/image40.png)

#### Cài đặt plugin Oh My OpenAgent

Điểm mạnh của OpenCode còn nằm ở cộng đồng sinh thái rất năng động, bạn có thể tìm thấy rất nhiều plugin liên quan đến OpenCode trên Github. Nếu nói OpenCode là một công cụ lập trình AI có thể chuyển đổi mô hình tùy ý, thì Oh-My-OpenAgent là một "hệ thống chỉ huy lập trình AI đa Agent" chạy trên OpenCode. Nó có thể phân giải một tác vụ phức tạp thành nhiều sub-task giao cho các mô hình khác nhau, mỗi mô hình đảm nhận phần việc riêng.

![](/zh-cn/stage-2/backend/modern-cli/images/image41.png)

Bạn có thể sao chép đoạn văn bản dưới đây và dán cho mô hình đã cấu hình trong OpenCode để cài đặt OpenCode.

```text
Install and configure oh-my-openagent by following the instructions here:
https://raw.githubusercontent.com/code-yeongyu/oh-my-openagent/refs/heads/dev/docs/guide/installation.md
```

Dưới đây là các tính năng và mô tả chức năng của Oh-My-OpenAgent.

| Tính năng | Mô tả chức năng |
| :-------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Discipline Agents** | Sisyphus chịu trách nhiệm điều phối Hephaestus, Oracle, Librarian và Explore. Một đội phát triển AI hoàn chỉnh hoạt động song song. |
| **Team Mode** (v4.0, bật tùy chọn) | Leader Agent + tối đa 8 thành viên song song, trực quan hóa tmux thời gian thực, họ công cụ `team_*` chuyên dụng. Điều khiển `hyperplan`(5 người bình luận đối lập) và `security-research`(3 thợ săn + 2 kỹ sư PoC). [Tài liệu ->](docs/guide/team-mode.md) |
| **`ultrawork` / `ulw`** | Một chạm kích hoạt, tất cả agent xuất kích. Không bỏ cuộc cho đến khi tác vụ hoàn thành. |
| **[IntentGate](https://factory.ai/news/terminal-bench)** | Phân tích ý định thực sự của người dùng trước khi hành động thực sự. Tạm biệt vĩnh viễn lời vô nghĩa AI bị hiểu sai theo nghĩa đen. |
| **Công cụ chỉnh sửa dựa trên hash** | Mỗi lần sửa đều xác minh hash nội dung qua `LINE#ID`, tỷ lệ sửa sai 0%. Cảm hứng từ [oh-my-pi](https://github.com/can1357/oh-my-pi). [The Harness Problem ->](https://blog.can.ac/2026/02/12/the-harness-problem/) |
| **LSP + AST-Grep** | Đổi tên cấp workspace, chẩn đoán trước build, viết lại dựa trên AST. Cung cấp cho Agent độ chính xác cấp IDE. |
| **Agent nền** | Đồng thời phóng 5+ chuyên gia làm việc song song. Giữ ngữ cảnh sạch, lấy kết quả bất cứ lúc nào. |
| **MCP tích hợp** | Exa (tìm kiếm web), Context7 (tài liệu chính thức), Grep.app (tìm kiếm mã nguồn GitHub). Bật mặc định. |
| **Ralph Loop / `/ulw-loop`** | Vòng lặp tự tham chiếu. Không dừng lại cho đến khi đạt 100% hoàn thành. |
| **Thực thi Todo bắt buộc** | Agent muốn lười biếng? Hệ thống trực tiếp kéo cổ áo lôi về. Tác vụ của bạn, bắt buộc phải hoàn thành. |
| **Người kiểm tra comment** | Loại bỏ comment dư thừa có mùi AI mạnh. Mã viết ra như kỹ sư cao cấp lão luyện. |
| **Tích hợp Tmux** | Hỗ trợ terminal tương tác hoàn chỉnh. Chạy REPL, dùng debugger, dùng công cụ TUI, tất cả trong phiên thời gian thực. |
| **Tương thích Claude Code** | Hooks, lệnh, skills, MCP và plugin hiện có của bạn? Tất cả có thể di chuyển liền mạch. |
| **MCP nhúng trong Skills** | Skills tự mang MCP server cần thiết. Bật theo nhu cầu, không làm phồng cửa sổ ngữ cảnh của bạn. |
| **Prometheus Planner** | Lập kế hoạch chiến lược tốt trước khi viết mã, thông qua chế độ phỏng vấn. |
| **`/init-deep`** | Tự động tạo `AGENTS.md` trong toàn bộ cấp thư mục dự án. Không chỉ tiết kiệm Token, mà còn nâng cao đáng kể khả năng hiểu của Agent. |

Sisyphus (claude-opus-4-7 / kimi-k2.6 / glm-5.1) là chỉ huy chính của bạn. Nó chịu trách nhiệm lập kế hoạch, phân bổ tác vụ cho đội ngũ chuyên gia, và thúc đẩy tác vụ đến hoàn thành với chiến lược song song cực kỳ tích cực. Nó không bao giờ bỏ cuộc giữa chừng.

Hephaestus (gpt-5.5) là người làm sâu tự chủ của bạn. Bạn chỉ cần đưa cho nó mục tiêu, không cần chỉ cách cụ thể. Nó sẽ tự động khám phá các pattern trong kho mã, thực thi tác vụ độc lập từ đầu đến cuối, tuyệt đối không cần bạn phải giám sát. Đúng như tên gọi, một người thợ thủ công thực thụ.

Prometheus (claude-opus-4-7 / kimi-k2.6 / glm-5.1) là nhà lập kế hoạch chiến lược của bạn. Thông qua chế độ phỏng vấn, trước khi viết một dòng mã nào, nó sẽ xác định phạm vi và xây dựng kế hoạch thực thi chi tiết thông qua việc đặt câu hỏi.

Sau khi hiểu xong những điều này, bạn có thể sử dụng OpenCode đã cài đặt plugin Oh-My-OpenAgent để hoàn thành các tác vụ lập trình.

## Thêm cách dùng công cụ lập trình AI CLI

### Dùng AI viết tài liệu yêu cầu: Học "cụ thể hóa nhu cầu"

Đối với mô hình ngôn ngữ lớn, nhu cầu trừu tượng cần được "cụ thể hóa". Ví dụ: "Tôi đói" là một nhu cầu trừu tượng, chúng ta cần biến nó thành: "Tôi hơi đói, có thể cần ăn một bánh mì đậu đỏ, thêm một ly sữa đậu nành." -- Đây mới là một nhu cầu cụ thể có thể thực thi.

Nhưng biến nhu cầu trừu tượng thành cụ thể, thực ra là một quá trình rất tốn sức. Nếu chúng ta chưa thấy đủ nhiều ví dụ, rất khó nhanh chóng liên tưởng đến cách phân giải vấn đề trừu tượng thành các module chi tiết. Lúc này, cách tốt nhất là để AI giúp bạn hoàn thành bước "cụ thể hóa".
Ví dụ, tôi muốn phát triển một ứng dụng "kế hoạch hàng ngày", suy nghĩ đơn giản nhất có thể là:

`Please help me write a daily planning app where I can write my plans each day and get reminders.`

AI thực sự có thể phân giải tác vụ dựa trên nhu cầu này, rồi hoàn thành từng bước, nhưng dễ sai hoặc hiểu sai giữa chừng. Để giảm rủi ro, chúng ta có thể để AI giúp chúng ta mở rộng nhu cầu trước:

`Based on my needs, please elaborate and provide a more detailed Product Requirement Document for reference. My idea is: Please help me write a daily planner app that supports daily plan-writing and provides reminders.`

Lúc này, AI có thể đưa ra PRD hoàn chỉnh tương tự như dưới:

```
Product Requirements Document (PRD): "Today's Plan" App
Document Version: 1.0
Creation Date: October 27, 2023
Author: (Your Name/Product Manager)

1. Product Introduction
1.1 Product Name
Today's Plan
1.2 Product Vision
"Today's Plan" is a minimalist and highly efficient daily planning and reminder tool, dedicated to helping users eliminate procrastination and forgetfulness, plan every day clearly, and ensure tasks are carried out through an intelligent reminder system—ultimately enabling users to gain a stronger sense of control and achievement over their time.
1.3 Target Users (User Personas)
We mainly serve three types of users:
Students (Xiao Ming):
Characteristics: Multiple tasks such as courses, assignments, club activities, exam prep, needing organized time arrangement.
Pain Points: Easily forget small tasks or assignment deadlines; feel overwhelmed switching between tasks; want to build regular study and life habits.
Needs: A simple tool to list daily to-dos and provide reminders before class/self-study.
Office Workers (Zhang Wei):
Characteristics: Fast-paced work, many meetings, reports, project milestones, and personal affairs (fitness, picking up children).
Pain Points: Easily forget important meetings or work milestones; get interrupted by urgent tasks and forget the original plan; feel busy but inefficient at end of day.
Needs: Need a tool to quickly record and schedule daily work and send strong reminders at key times (e.g., 15 minutes before meetings).
Freelancers/Self-disciplined Seekers (Li Na):
Characteristics: High freedom of time, but strong self-management required for work output and personal growth.
Pain Points: Easily procrastinate, lack external supervision; start the day without a clear plan, leading to low time utilization.
Needs: Need a tool to help build a daily fixed routine (Morning Routine) and review daily achievements for positive feedback.

2. User Stories
As a user, I want to quickly create today's plan list so I have an overview of all my tasks for the day.
As a user, I want to set specific start and end times for each task so I can create a visual timeline.
As a user, I want to receive push notification reminders before a task starts so I won't miss any important arrangements.
As a user, I want to customize the reminder time (such as 5, 15, or 60 minutes in advance) so reminders better fit my habits.
As a user, I want to easily mark completed tasks so I can feel accomplished and clearly see my progress.
As a user, I want to see a summary of my completed plans at the end of each day for reviewing and self-motivation.
As a user, I want to conveniently edit and delete tasks to handle last-minute changes.
As a user, I want to view plans and achievements from previous days to review my efficiency and habits.

3. Feature Breakdown
Core Features (MVP - Minimum Viable Product)
Module 1: Plan Management
3.1.1 Daily Plan Homepage
Interface: "Today" as the core view, current date shown at the top.
View: Timeline list, clearly showing tasks scheduled from morning to evening. Tasks without a time can be listed in the top or bottom "To-do List" section.
Interactions:
Click the "+" button in the bottom right to quickly create a new task.
Pull down to refresh the page.
Swipe left/right to view yesterday's and tomorrow's plans.
3.1.2 Create/Edit Task
Entry: Click "+" on the homepage or a time slot in the list.
Fields:
Task title (required): Briefly describe the task, e.g., "10 AM Weekly Product Meeting."
Task time (optional):
Set "start time" and "end time."
Provide "all-day" option for unspecified time tasks.
Default time picker should be quick and convenient.
Reminder setting (required, with default value): See Module 2.
Notes (optional): Add further descriptions, links, or location info.
Actions: Save, cancel, delete task.
3.1.3 Task Interaction
Mark as complete: Checkbox before each task; checking adds a strikethrough and gray background, indicating completion. Can unmark if needed.
Edit task: Click the task itself to enter edit page.
Delete task: Swipe left on a task to reveal "Delete" button.
Module 2: Smart Reminder System
3.2.1 Reminder Trigger
Mechanism: Based on task's set "start time" and the user's "reminder lead time," send a push notification from device.
Offline Support: Locally scheduled reminders must trigger even if user is offline.
3.2.2 Reminder Content & Format
Notification title: App name "Today's Plan."
Body: "Reminder: [Task Title] will start at [Start Time]." E.g., "Reminder: Product Meeting will start at 10:00."
Sound: Use system default or offer several simple, effective tones.
3.2.3 Reminder Settings
Global Settings (in Settings page):
User can set a default reminder time, e.g., "15 minutes before task starts." New tasks adopt this by default.
Single Task Settings (in create/edit page):
Users can override global settings for important tasks, choosing specific reminder times like "on time," "5 minutes early," "30 minutes early," or "1 hour early."
Provide "no reminder" option.
Subsequent Features (V1.1, V2.0)
3.3 Daily Review & Statistics
Push a summary notification at a set time every night (e.g., 22:00): "How was your day? Take a look at your achievements!"
Generate a simple daily report card: shows total planned tasks, completed tasks, completion rate, plus an encouraging message.
3.4 History Review
Calendar view to click on any past day and check its plans and completion status. Days with high completion rates marked with a special color.
3.5 Templates
Allow users to save a successful daily plan as a template, e.g., "Efficient Workday," "Relaxing Weekend."
When creating tomorrow's plan, one-click import a template, modify slightly to save time.
3.6 Themes & Personalization
Offer dark mode.
Allow changing several primary color themes.

4. Non-Functional Requirements
4.1 Performance
Response: App launch time under 2 seconds; adding/editing tasks must be smooth and lag-free.
Resource Use: Low battery and memory consumption in background; do not over-consume resources waiting for reminders.
4.2 Usability
Minimal & intuitive: UI must be minimal, primary functions accessible within 3 clicks. No tutorial needed for new users.
Error tolerance: Offer undo (e.g. brief undo after mistakenly deleting a task).
4.3 Reliability
Reliable reminders: Reminder function is the product's lifeline; must guarantee 99.99% timely and accurate delivery.
Data loss-free: User plans must be reliably stored locally. Future versions can support cloud sync to prevent data loss on device change.
4.4 Compatibility
Platform: Support major iOS and Android versions (latest 3-4 releases).
Screen: Layout must fit various phone screen sizes.

5. Roadmap
V1.0 (MVP):
Goal: Validate core value—planning & reminders.
Features: Complete all "Core Features" described above (Plan management, smart reminders).
V1.1 (Quick Optimization):
Goal: Improve retention and achievement.
Features: Add "Daily Review & Statistics," "History Review."
V2.0 (Enhanced Experience):
Goal: Increase efficiency and personalization.
Features: Add "Templates," "Themes & Personalization," and start developing "Cloud Sync."
```

So với câu "giúp tôi viết một ứng dụng có thể ghi kế hoạch và nhắc nhở mỗi ngày" ban đầu, tài liệu này đã chi tiết hơn rất nhiều. Bạn có thể thêm bớt sửa đổi theo nhu cầu thực tế; đối với một số module bạn chưa chắc chắn, cũng có thể tiếp tục để AI cung cấp thêm phương án dự phòng, bạn chọn và gộp thành phiên bản cuối cùng.

Thông qua cách này, chúng ta có thể rất dễ dàng biến ý tưởng trừu tượng thành mô tả cụ thể. Đối với phát triển AI, "cụ thể" chính là năng suất: nhu cầu càng cụ thể, càng dễ nhận được dự án có cấu trúc ổn định, chất lượng cao. Bạn có thể thử dùng cách này làm lại một dự án nhỏ trước đó, so sánh sự khác biệt về hiệu quả.

Nếu bạn thấy loại "prompt nhu cầu" này quá dài, một cách rất tự nhiên là viết nó vào một tài liệu markdown riêng, làm "tài liệu nhu cầu / tài liệu phát triển / PRD" của bạn. Sau đó mỗi lần để AI viết dự án, chỉ cần để nó "tham khảo tài liệu này", thay vì gõ lại dài dòng mỗi lần. Bạn cũng có thể liên tục hoàn thiện tài liệu này trong quá trình lặp, để các dự án sau trực tiếp hưởng lợi.

Dưới đây là một số kịch bản sử dụng phổ biến khác:

### Quản lý thư mục

Chúng ta có thể thử dùng công cụ lập trình AI CLI để quản lý các loại tệp trong thư mục hiện tại. Ví dụ, bạn có một loạt tệp lộn xộn, cần sắp xếp phân loại, có thể nói với Claude Code hoặc Codex:

`Please help me organize the contents of the current folder. I want to group files with the same content together & I want to group files from the same time period together. Please help me handle this.`

### Phát triển dự án mới

Điều này gần như giống hệt cách chúng ta sử dụng trong z.ai, Trae trước đó -- chúng ta cũng có thể trực tiếp dùng công cụ lập trình AI CLI để phát triển dự án mới từ đầu. Tất nhiên, tốt nhất nên chuẩn bị sẵn một tài liệu nhu cầu trước.

Tài liệu nhu cầu càng chi tiết, hiệu quả cuối cùng càng tốt. Bạn có thể tối ưu hóa tài liệu nhiều vòng theo ý tưởng thay đổi liên tục; tài liệu càng hoàn thiện, triển khai mã càng ổn định, trưởng thành hơn.

### Triển khai dự án mã nguồn mở (ví dụ Dify)

Đối với các bạn mới tiếp xúc với máy tính, việc triển khai một dự án mã nguồn mở từ GitHub thường rất khó khăn. Nhưng chúng ta hoàn toàn có thể giao việc này cho Claude Code, giống như chúng ta đã làm trong hướng dẫn Dify:

<https://github.com/langgenius/dify>

Nếu tôi muốn chạy Dify riêng trên máy cục bộ, chỉ cần ném liên kết này cho Claude Code, sau đó nhập:

`I want to deploy this GitHub project ``https://github.com/langgenius/dify`` . Please help me clone the project and run it.`

Sau khi nhận yêu cầu của bạn, Claude Code sẽ tự động hoàn thành một loạt thao tác, bao gồm lấy mã từ GitHub, cấu hình môi trường chạy, khởi động dự án, v.v. Nếu có lỗi ở bước nào hoặc trạng thái khởi động dự án không bình thường, bạn chỉ cần xử lý thủ công ít theo hướng dẫn. Ngoài Dify, bạn cũng có thể dùng Claude Code giúp bạn triển khai phần lớn dự án mã nguồn mở GitHub phổ biến -- bạn chỉ cần một ô hội thoại, cộng thêm thời gian uống một tách cà phê.

![](/zh-cn/stage-2/backend/modern-cli/images/image31.png)

### Giải thích mã và viết tài liệu

Đối với một số dự án phức tạp, hoặc dự án lớn do AI tự động tạo, bạn có thể thấy mã quá dài, logic quá nhiều, rất khó hiểu. Lúc này có thể để công cụ lập trình AI CLI giúp bạn "đọc mã". Bạn có thể hỏi như sau:

- Vui lòng giúp tôi giải thích dự án này: cách chạy, cách sử dụng, sau này sửa và tiếp tục phát triển như thế nào?
- Vui lòng giúp tôi giải thích quy trình tổng thể của dự án này: chương trình chạy như thế nào? Người dùng có thể làm những thao tác nào trong giao diện?
- Vui lòng giúp tôi viết một tài liệu hoàn chỉnh cho dự án này, bao gồm tài liệu phát triển và tài liệu chạy, v.v.
- Vui lòng dựa trên tất cả nội dung trong thư mục hiện tại của tôi, viết một mô tả chi tiết, và lưu vào tài liệu markdown đã chỉ định.

### Thêm cách sử dụng

Tất nhiên, công cụ lập trình AI CLI có thể làm được nhiều hơn những điều trên. Đừng chỉ coi nó là "công cụ viết mã", mà hãy coi nó như một Agent thông minh có khả năng hành động độc lập. Bạn có thể để nó giúp bạn:

- Quản lý và sắp xếp tệp cục bộ;
- Viết nhật ký, viết tổng kết;
- Phân tích và sửa lỗi hệ thống;
- Thực hiện các tác vụ dòng lệnh lặp đi lặp lại, v.v.

Có lẽ trong tương lai không xa, nó sẽ trở thành đối tác AI quan trọng nhất và hiểu bạn nhất trên máy tính của bạn.
