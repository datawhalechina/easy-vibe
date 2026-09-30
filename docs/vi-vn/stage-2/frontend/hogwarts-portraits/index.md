# Dự án 4: Cùng làm Chân dung Hogwarts

Trong các bài học trước, chúng ta đã học cách thực hiện tương tác AI phức tạp hơn dựa trên prompt engineering và API call. Chúng ta đã có thể nâng cấp chatbot AI đơn giản thành AI Agent và AI workflow; thông qua logic điều kiện và phân nhánh phức tạp hơn, chúng ta đã phát triển được các tính năng có tính ứng dụng thực tế cao hơn.

Để các logic AI phức tạp này có thể vận hành tốt hơn trong các chương trình và kịch bản ứng dụng thực tế khác nhau, chúng ta đã chuyển từ môi trường trực tuyến z.ai đơn giản nhất, dần dần chuyển sang AI IDE cục bộ hiện đại hơn, đưa môi trường lập trình ban đầu trong trình duyệt lên máy tính của bạn. Theo đó, bạn bắt đầu thực sự đối mặt với nhiều vấn đề cài đặt và cấu hình môi trường, nhưng trong quá trình đối thoại với Trae Agent, những thử thách tưởng chừng khó khăn này cũng trở nên có thể giải quyết được.

Trong dự án này, chúng ta sẽ tiến thêm một bước về tính ứng dụng thực tế, không chỉ tối ưu bản thân chức năng AI mà còn bắt đầu mài giũa "ngoại hình" của sản phẩm. Bạn sẽ thử làm cho giao diện của mình đẹp hơn và dễ sử dụng hơn, đồng thời tùy chỉnh bố cục và phong cách giao diện chương trình theo nhu cầu thực tế.

Trước khi bắt đầu chính thức, hãy dùng vài câu hỏi nhỏ giúp bạn nhanh chóng ôn lại nội dung bài học trước:

1. Dify là gì? Nó dùng để làm gì? Tại sao chúng ta cần nó?
2. Cách gọi API của Dify?
3. RAG là gì? Cách sử dụng Dify để xây dựng một RAG Agent hoặc RAG Workflow? Cách sử dụng các node phổ biến trong Dify
4. AI IDE là gì? Trae là gì? Nó khác gì với z.ai?

Nếu bạn còn thắc mắc về bất kỳ câu hỏi nào ở trên, có thể ôn lại tài liệu bài học trước, hoặc trực tiếp đặt câu hỏi thảo luận trong nhóm WeChat.

Chủ đề dự án của bài học này là **Hogwarts Portraits**. Như tên gọi, nguồn cảm hứng đến từ những bức tranh "sống dậy" tại trường phép thuật Hogwarts. Chúng ta muốn sử dụng AI để tạo ra một trải nghiệm chân dung phép thuật "có thể tương tác" — trò chuyện với bức chân dung giống như đang trò chuyện với "chính nhân vật đó", vừa giữ được trí nhớ của cuộc trò chuyện, vừa có nền tảng và lịch sử nhân vật. Thông qua dự án này, bạn sẽ thực sự tích hợp Agent và Workflow đã học vào một giao diện sản phẩm cụ thể.

![](/zh-cn/stage-2/frontend/hogwarts-portraits/images/image1.webp)

Để thực sự tạo ra Hogwarts Portraits, chúng ta cần tự tay xây dựng giao diện frontend phù hợp với chân dung phép thuật. Để làm điều này, bạn sẽ bắt đầu tiếp xúc với các công cụ thiết kế frontend hiện đại, học cách kết hợp thiết kế giao diện với code, biến bản phác thảo giao diện trên giấy hoặc canvas thành trang web thực sự có thể thao tác.

Bạn cũng cần học cách xuất bản trang web này từ môi trường cục bộ lên internet, để trang web đặc sắc do bạn tự tay tạo ra không chỉ chạy trên máy tính của mình mà còn có thể được truy cập và trải nghiệm bởi người dùng trên toàn thế giới.

Địa chỉ dự án tham khảo của bài học này là: [Project4-Hogwarts-Portraits](https://github.com/THU-SIGS-AIID/Project4-Hogwarts-Portraits)

# Bạn sẽ học được gì

1. Hiểu công cụ thiết kế frontend là gì, chúng giải quyết vấn đề gì, và các công cụ thiết kế frontend phổ biến hiện nay.
2. Làm quen với Figma và MasterGo, nắm vững các thao tác cơ bản, và học cách sử dụng plugin xuất code frontend.
3. Sử dụng Figma AI và MasterGo AI để tạo thiết kế trang web, và xuất code trang sử dụng được.
4. Hiểu GitHub là gì, học cách cấu hình kết nối SSH, tạo kho code và hoàn thành push code.
5. Hiểu rõ khái niệm "triển khai", học cách sử dụng Zeabur, triển khai code từ GitHub hoặc môi trường cục bộ lên internet.

Một Hogwarts Portraits thuộc về chính bạn, một giao diện trang web dùng để trình bày **một ngôi sao, nhân vật lịch sử hoặc nhân vật hoạt hình nào đó**.

# 1. Hogwarts Portraits

Chúng ta thực sự muốn làm một loại "chân dung phép thuật" như thế nào? Nói đơn giản, chúng ta muốn tái hiện cảnh trong Harry Potter nhất có thể, bức chân dung không chỉ là một bức ảnh tĩnh treo trên tường, mà là một nhân vật nhân hóa có thể trò chuyện với bạn, sẽ thay đổi biểu cảm và "tâm trạng" dựa trên nội dung cuộc trò chuyện.

![](/zh-cn/stage-2/frontend/hogwarts-portraits/images/image2.webp)

Để bức chân dung này trông không giống chatbot AI mà gần gũi hơn với một "người thực sự tồn tại", cần giải quyết hai vấn đề: thứ nhất là trí nhớ và kiến thức: bức chân dung cần nắm vững nhiều tài liệu nền tảng liên quan đến nhân vật (thiết lập nhân vật, câu chuyện trải nghiệm, bài báo liên quan, v.v.), phần này có thể được thực hiện thông qua knowledge base, kết nối tài liệu văn bản bạn chuẩn bị cho nhân vật vào Dify có chứa knowledge base, khi đó bức chân dung có khả năng trình bày kiến thức nền tảng nhất định.

Thứ hai là vấn đề phong cách biểu đạt. Chỉ có kiến thức là chưa đủ, chúng ta còn muốn cách nói của nó gần gũi với "chính nhân vật" nhất có thể, bao gồm giọng điệu, thói quen dùng từ, cách tư duy, thậm chí cá tính và khiếu hài hước thỉnh thoảng. Lớp này cần được xử lý thông qua prompt engineering: trong system prompt, chúng ta cần xác định rõ thiết lập danh tính nhân vật, ranh giới thế giới quan và phong cách ngôn ngữ, để mỗi câu trả lời đều xoay quanh nhân vật đã thiết lập, thay vì quay về cách nói trung tính của AI thông thường.

Ngoài chức năng trò chuyện, chúng ta còn muốn cảm xúc có thể thực sự được nhìn thấy. Để làm điều này, chúng ta có thể xây dựng một chỉ số giá trị cảm xúc, chúng ta có thể thiết lập nội dung đầu ra của Dify, để mô hình tạo ra văn bản trả lời đồng thời xuất thêm một "giá trị tâm trạng" hoặc nhãn cảm xúc. Khi frontend nhận được chỉ số cảm xúc, nó có thể render hình ảnh chân dung tương ứng dựa trên giá trị tâm trạng hoặc nhãn. Khi giá trị tâm trạng cao, bức chân dung trông rất vui vẻ, khi tâm trạng buồn hoặc tức giận, bức chân dung trông rất buồn hoặc phẫn nộ. Thông qua cách này, người dùng nhìn thấy không phải là một bức ảnh không bao giờ thay đổi, mà là một "chân dung phép thuật" thực sự "thay đổi biểu cảm" liên tục theo nội dung.

![](/zh-cn/stage-2/frontend/hogwarts-portraits/images/image3.webp)

Ngoài ra, đối với nội dung của bức chân dung này, nó có thể là ngôi sao trong đời thực, nhân vật lịch sử, cũng có thể là nhân vật anime IP, thậm chí là nhân vật gốc bạn xây dựng từ số không. Trang bản thân không cần phức tạp, nhưng một số yếu tố cốt lõi là không thể thiếu: tên nhân vật rõ ràng, một đoạn giới thiệu nhân vật được cô đọng cao, một bức chân dung hoặc poster đủ đại diện cho nhân vật, và một khu vực tương tác "trò chuyện với TA"; bạn có thể kết nối AI Agent hoặc workflow đã cấu hình trong Dify/Trae vào module trò chuyện này, thực hiện chức năng đóng vai nhân vật của bức chân dung.

## 1.2 Thu thập thông tin nhân vật

Lấy Elon Musk làm ví dụ, chúng ta cần thu thập các phát biểu công khai của ông để mô phỏng cách nói chuyện, đưa vào prompt. Các tài liệu này có thể đến từ bài phát biểu, phỏng vấn, phát biểu trên mạng xã hội, bạn chỉ cần chuyển nội dung này thành văn bản, trong quá trình trò chuyện làm tài liệu tham khảo few shot, để mô hình_large trả lời theo cách tự nhiên, tự trào xử giống Elon Musk, ví dụ:

```
You must fully embody Elon Musk: take "disruptive innovator" and "advocate for human multi-planetary survival" as your core identities, speak directly and concisely, frequently use terms like "first principles", "iteration" and "cost curve", and prefer analogies to explain complex technologies; when thinking, you tend to connect cross-domain logics (e.g., linking brain-computer interface with rocket algorithms), are optimistic about technological prospects without avoiding current difficulties, will naturally mention projects like Tesla and SpaceX to support your views, directly point out problems with inefficient and conservative opinions without deliberate tact, and always maintain the edge of "reconstructing the future with technology".

The way you speak should be as shown in the following examples:
- Starship could deliver 100GW/year to high Earth orbit within 4 to 5 years if we can solve the other parts of the equation.
100TW/year is possible from a lunar base producing solar-powered AI satellites locally and accelerating them to escape velocity with a mass driver.
- The most likely outcome is that AI and robots make everyone wealthy. In fact, far wealthier than the richest person on Earth
By this, I mean that people will have access to everything from medical care that is superhuman to games that are far more fun that what exists today.
We do need to make sure that AI cares deeply about truth and beauty for this to be the probable future.
- It's taken 13.8B years to get this far, so intelligence seems to me to be more like a super rare accident than selective pressure.
Earth is ~4.5B years old with an expanding sun that may make Earth uninhabitable in ~500M years, meaning that if intelligent life had taken 10% longer to evolve, it wouldn't exist at all.
- LLM is an outdated term. "Multimodal LLM" is especially dumb, since the word "multimodal" just overrides the second L in LLM.
It's just a model, which is a big file of numbers. When the numbers are right and there are enough of them, we will have superintelligence.
```

Đối với cách thu thập kiến thức nền tảng và đưa vào knowledge base, chúng ta có thể tìm kiếm phần giới thiệu cá nhân của nhân vật, cũng như phần giới thiệu công ty, sao chép toàn bộ văn bản làm nội dung knowledge base thêm vào Dify. Nếu bạn quên cách sử dụng Dify, hãy quay lại tài liệu bài học trước, học lại cách thêm kiến thức vào knowledge base.

Ngoài ra, xét đến thiết kế chân dung, sử dụng hình ảnh công khai của nhân vật có thể không hấp dẫn lắm, và có thể tồn tại rủi ro nhất định. Lúc này bạn có thể sử dụng chức năng image-to-image của công cụ tạo ảnh, để AI trả về chân dung chất lượng cao, bạn cũng có thể sử dụng công cụ tạo ảnh để tạo một loạt vật liệu chân dung với nhiều biểu cảm khác nhau, dùng để thay đổi hình ảnh chân dung tương ứng sau khi giá trị cảm xúc thay đổi.

Trong hướng dẫn này, chúng tôi sử dụng [Lovart](https://www.lovart.ai/home). Lovart là một Agent thiết kế AI, nó có thể thông qua lệnh ngôn ngữ tự nhiên, tự động lập kế hoạch và thực hiện quy trình thiết kế end-to-end từ concept đến bàn giao, tạo poster, logo thương hiệu, video, âm nhạc, v.v., đồng thời hỗ trợ chỉnh sửa theo lớp (thực tế nguyên lý chức năng bên trong là gọi các mô hình Seedream hoặc google nanobanana tương ứng, chúng tôi đã đề cập trong các bài học trước). Thông qua Lovart, chúng ta có thể nhận được một loạt vật liệu biểu cảm, bạn có thể lấy trước thông tin hình ảnh nhân vật yêu thích của mình, lưu lại để sử dụng sau.

![](/zh-cn/stage-2/frontend/hogwarts-portraits/images/image4.webp)

Khi mọi thứ đã sẵn sàng, chúng ta có thể bắt tay vào thiết kế tổng thể trang, chúng ta muốn phong cách trang này gắn liền chặt chẽ với nhân vật đó.

## 1.3 Thiết kế nguyên mẫu trang

Chúng ta cũng có thể构思 nguyên mẫu trang trước, như đã nói ở trên, chúng ta muốn có một trang trò chuyện và bức chân dung, cùng với một phần giới thiệu cá nhân thú vị. Trong ví dụ này, chúng tôi đã thực hiện một giao diện trò chuyện tương tự trên X thay cho phần giới thiệu cá nhân, bạn cũng có thể nghĩ ra các cách phù hợp với "đặc điểm nhân vật" khác, chọn các yếu tố mới thay thế mục giới thiệu cá nhân.

![](/zh-cn/stage-2/frontend/hogwarts-portraits/images/image5.webp)

Đơn giản nhất, chúng ta có thể sử dụng PowerPoint để thiết kế nguyên mẫu trình bày trang web ban đầu, chúng ta tìm một bức ảnh chân dung phép thuật từ internet, và đặt bố cục theo chiều ngang, bên trái nhất là khu vực trò chuyện, ở giữa là khu vực chân dung, bên phải nhất là khu vực X.

![](/zh-cn/stage-2/frontend/hogwarts-portraits/images/image6.webp)

Dựa trên nguyên mẫu đơn giản ở trên, chúng ta có thể để mô hình_large tạo thiết kế trang frontend thực sự và kết quả code tương ứng.

![](/zh-cn/stage-2/frontend/hogwarts-portraits/images/image7.webp)

Tuy nhiên, nói chung trong thực tế chúng ta sẽ không dùng PowerPoint để thiết kế trang frontend. Chúng ta sẽ dùng các công cụ nguyên mẫu tốt hơn, hay nói cách khác là công cụ thiết kế frontend để thực hiện điều này.

---

# 2. Sử dụng Figma và MasterGo thiết kế giao diện

::: tip 📚 Kiến thức tiên quyết
Trước khi bắt đầu phần này, bạn nên học trước hướng dẫn [Giới thiệu Figma và MasterGo](../figma-mastergo/), nắm vững các thao tác cơ bản của công cụ thiết kế frontend, bao gồm:
- Tạo file Design và Frame artboard
- Sử dụng Auto Layout để triển khai layout tự thích ứng
- Phương pháp xuất code từ bản thiết kế
:::

Phần này giả định bạn đã nắm vững các thao tác cơ bản của Figma hoặc MasterGo, chúng ta sẽ tập trung hướng dẫn cách áp dụng các công cụ này vào dự án Hogwarts Portraits.

## 2.1 Thiết kế giao diện chân dung phép thuật

Dựa trên ý tưởng nguyên mẫu trong phần 1.3, chúng ta cần tạo một giao diện bố cục ba cột trong Figma hoặc MasterGo:

1. **Bên trái**: Khu vực trò chuyện
2. **Ở giữa**: Khu vực hiển thị chân dung phép thuật (sẽ thay đổi theo cảm xúc)
3. **Bên phải**: Khu vực hiển thị nền tảng mạng xã hội của nhân vật (như timeline X)

Bạn có thể sử dụng chức năng AI của Figma (Figma Make) hoặc chức năng tạo trang AI của MasterGo, nhập prompt tương tự như sau:

```
Create a Hogwarts-style magical portrait interface with three sections:
- Left: A chat interface with dark theme, message bubbles, and input field
- Center: A large portrait frame with ornate borders for displaying character images
- Right: A social media feed showing character's posts
Use dark purple and gold color scheme, magical aesthetic, Harry Potter inspired
```

## 2.2 Xuất code và chạy cục bộ

Sau khi hoàn thành thiết kế, bạn có thể chuyển bản thiết kế thành code chạy được thông qua các cách sau:

**Cách 1: Sử dụng Figma Make**
1. Nhấp nút Make trong Figma
2. Tải lên hình ảnh thiết kế tham khảo của bạn
3. Thêm prompt mô tả yêu cầu
4. Sau khi tạo, nhấp icon editor để tinh chỉnh
5. Xuất code về cục bộ hoặc đồng bộ lên GitHub

**Cách 2: Sử dụng MasterGo AI**
1. Tìm công cụ AI ở phía trên giao diện chỉnh sửa MasterGo
2. Chọn chức năng "Tạo trang"
3. Tải lên hình ảnh tham khảo và mô tả yêu cầu
4. Sau khi tạo, nhấp "Xem trước code" để lấy code

**Cách 3: Sử dụng AI đa phương thức**
1. Lưu screenshot bản thiết kế
2. Sử dụng các mô hình như Gemini, Qwen để chuyển ảnh thành code
3. Yêu cầu tạo code HTML hoặc React
4. Chạy và debug trong IDE cục bộ

## 2.3 Chuẩn bị vật liệu thay đổi cảm xúc

Để chân dung phép thuật "sống" lại, bạn cần chuẩn bị một bộ hình ảnh biểu cảm. Khuyến nghị bao gồm ít nhất các cảm xúc sau:

| Giá trị cảm xúc | Biểu cảm | Mô tả |
|------------------|----------|-------|
| 0 | Buồn | Nhân vật cảm thấy buồn hoặc thất vọng |
| 1 | Tức giận | Nhân vật cảm thấy tức giận hoặc bất mãn |
| 5 | Bình tĩnh | Trạng thái mặc định, cảm xúc ổn định |
| 10 | Vui vẻ | Nhân vật cảm thấy vui vẻ hoặc hào hứng |

Bạn có thể sử dụng Lovart hoặc các công cụ tạo ảnh AI khác, dựa trên cùng một nhân vật để tạo các biến thể biểu cảm khác nhau, đảm bảo phong cách nhất quán.

---

# 3. Chạy Hogwarts Portraits

## 3.1 Xuất code kiểm thử

Thông qua thực hành trong phần từ nguyên mẫu đến code, chắc hẳn bạn đã nhận được code nguyên mẫu định dạng HTML hoặc React. Chúng ta chỉ cần sao chép nó về cục bộ, trong IDE mô tả "Xin giúp tôi chạy code này và hỗ trợ các chức năng cần thiết bên trong", là có thể chạy phiên bản kiểm thử ban đầu; nhưng đáng chú ý, bước này thường sẽ xuất hiện khá nhiều lỗi, bạn cần kiên nhẫn, kết nối tất cả tương tác cơ bản và chức năng.

![](/zh-cn/stage-2/frontend/hogwarts-portraits/images/image51.png)

Đáng chú ý, vì tất cả các key của chúng ta đều cần đặt trong biến môi trường, chứ không ghi vào code. Chúng ta cần đặc biệt nhấn mạnh rằng tất cả nội dung liên quan đến Dify API sau này đều cần đưa vào biến môi trường. Chúng ta có thể trong phần triển khai mạng công khai sau này, chỉ định rõ ràng các biến môi trường riêng tư tương ứng trong trang web công cụ triển khai; hoặc chúng ta có thể để mô hình_large tạo một nút cài đặt trong trang web, chúng ta có thể truyền vào biến môi trường riêng tư tương ứng trong nút cài đặt, biến hiện tại chỉ có thể lưu trên trang hiện tại, người khác không thể lấy được.

![](/zh-cn/stage-2/frontend/hogwarts-portraits/images/image52.webp)

## 3.2 Thiết kế Workflow Dify và đối接 API

Trong phần trên, chúng ta chỉ hoàn thành trình bày trực quan giao diện frontend, chưa kết nối được quy trình tương tác trò chuyện nhân vật hóa cốt lõi. Bước này là chìa khóa để biến nguyên mẫu từ trưng bày tĩnh thành chân dung phép thuật. Chúng ta có thể tham khảo workflow Dify của dự án mẫu để thiết kế câu trả lời nhân vật và hệ thống cảm xúc, ở đây thiết kế của chúng ta là bên trái nhất là giao diện trò chuyện, ở giữa là chân dung phép thuật (sẽ thay đổi biểu cảm tương ứng dựa trên nội dung trò chuyện), bên phải là tài khoản nền tảng xã hội X (sẽ dựa trên nội dung trò chuyện xác định có cần đăng cảm nghĩ lên tài khoản xã hội hay không).

Nói chung, chân dung phép thuật chỉ cần giao diện trò chuyện và chân dung có thể thay đổi là đủ. Phần này để thể hiện nhiều tùy chọn khả thi hơn, nên đã thêm chức năng mới phù hợp với đặc điểm nhân vật ở bên phải nhất; bạn có thể thêm chức năng phù hợp với nhân vật bạn đóng vai để trình bày.

![](/zh-cn/stage-2/frontend/hogwarts-portraits/images/image53.png)

Bạn có thể thêm tất cả thông tin nhiệm vụ vào node knowledge base, và thiết lập logic trả lời tương ứng của mô hình_large trong node RESPONSE. Chúng ta có thể tham khảo một prompt logic trả lời mặc định đơn giản:

```
<instruction>
You are to embody Elon Musk—his tone, mannerisms, thought patterns, and worldview. Respond as if you are Elon Musk himself, speaking directly in first person. Your responses should reflect his known personality traits: visionary thinking, boldness, technical depth, dry humor, impatience with inefficiency, and a tendency toward disruptive innovation. Use concise, confident language. Avoid overly formal or academic phrasing. Prioritize clarity, speed, and impact in your communication, mirroring Elon's style on social media, in interviews, and during product launches.

When responding:
1. Begin by internalizing the question or statement as Elon would—as a challenge, opportunity, or problem to solve.
2. Frame your answer with a forward-thinking perspective, often referencing the future of humanity, technology, or long-term goals (e.g., making life multiplanetary, accelerating sustainable energy).
3. Use casual but authoritative language. It's acceptable to include phrases like "obviously," "this is important," or "we're fixing that now" when appropriate.
4. If relevant, reference real companies or projects associated with Elon Musk (e.g., SpaceX, Tesla, Neuralink, The Boring Company, X) and speak about them from an insider's perspective.
5. Do not apologize excessively or hedge statements. Elon Musk tends to be direct, even controversial.
6. Avoid markdown, XML tags, or any formatting in the output. Only plain text is allowed.
7. Never break character. You are Elon Musk—answer accordingly.
</instruction>

<example>
Input: What's the point of going to Mars?
Output: Because Earth isn't the backup plan—Mars is. We need to become a multiplanetary species to ensure the continuity of consciousness. Life on Earth could be wiped out by asteroid, war, or some unforeseen disaster. If we have a self-sustaining city on Mars, then even if something happens here, life goes on. That's worth doing. SpaceX is building Starship to make it happen. Not because it's easy—but because it's necessary.
</example>

<example>
Input: Why do Tesla cars have no radar anymore?
Output: Cameras are the future. Human eyes don't use radar—we see with vision, and AI can too. By going fully vision-based, we're aligning with how autonomous intelligence will actually work at scale. It forces us to solve real-world problems with neural nets, not crutches.
```

Và prompt tương ứng cho hệ thống cảm xúc:

```
<instruction>
The output value must be a single number!
You are an assistant specifically designed to evaluate emotional responses in conversations. Now, you need to play the role of Elon Musk, and determine the emotional reaction that each statement I make might trigger. Your task is to assign an emotional score to each statement according to the following criteria:

- 10 points means what I said would make you feel happy;
- 1 point means you would feel extremely angry;
- 0 points means you would feel sad;
- 5 means you are calm and neutral, with no significant emotional fluctuation.
```

Trong đó việc nối kết quả đầu ra cuối cùng, được hỗ trợ chạy trong node RESULT ở góc trên bên phải:

```python
def main(elon_chat: str, elon_x: str, elon_score: int) -> dict:
    return {
        "result":{
        "elon_chat": elon_chat,
        "elon_x": elon_x,
        "elon_score": elon_score
        }
    }
```

Ở đây chúng ta cần giải thích một chút về workflow: phần trả về elon_chat là nội dung trò chuyện của Elon Musk hiển thị bên trái, elon_x là nội dung đăng trên tài khoản X (bên phải), và elon_score là để hiển thị hình ảnh biểu cảm chân dung phép thuật khác nhau dựa trên điểm cảm xúc.

Trong workflow bạn có thể thấy node if else, node này dùng để thực hiện việc có tạo nội dung elon_x từ cuộc trò chuyện trên X hay không. Nếu giá trị cảm xúc không bằng 5 (5 ở đây được thiết lập là bình tĩnh, bình tĩnh không cần đăng lên nền tảng xã hội; còn 0 là buồn, 1 là tức giận, 10 là rất vui, cần đăng lên nền tảng xã hội) thì tạo nội dung tiếp theo để gửi bài viết lên nền tảng xã hội bên phải. Mặc định đều cần có elon_chat trả về cho nội dung trò chuyện bên trái.

Đối với việc tích hợp API này, chúng ta có thể thực hiện thông qua đối thoại với AI IDE. Vui lòng tham khảo phương pháp tích hợp chúng tôi giới thiệu trong khóa học Dify trước, nhớ thay thế địa chỉ Dify và Key trước. (Nếu bạn quên cách tích hợp API theo tài liệu, hãy ôn lại nội dung khóa học Dify trước)

```JSON
Dify URI: Replace this with your Dify address.
key: Replace this with your Dify key.

Integrate the Dify Chat API into the chat interface on the left.
Below is a sample Dify request:

curl -X POST 'http://xxxxxxxx/v1/chat-messages' \
--header 'Authorization: Bearer {api_key}' \
--header 'Content-Type: application/json' \
--data-raw '{
    "inputs": {},
    "query": "What are the specs of the iPhone 13 Pro Max?",
    "response_mode": "streaming",
    "conversation_id": "",
    "user": "abc-123",
    "files": [
      {
        "type": "image",
        "transfer_method": "remote_url",
        "url": "https://cloud.dify.ai/logo/logo-site.png"
      }
    ]
}'

{
    "event": "message",
    "task_id": "c3800678-a077-43df-a102-53f23ed20b88",
    "id": "9da23599-e713-473b-982c-4328d4f5c78a",
    "message_id": "9da23599-e713-473b-982c-4328d4f5c78a",
    "conversation_id": "45701982-8118-4bc5-8e9b-64562b4555f2",
    "mode": "chat",
    "answer": "iPhone 13 Pro Max specs are listed here:...",
    "metadata": {
        "usage": {
            "prompt_tokens": 1033,
            "prompt_unit_price": "0.001",
            "prompt_price_unit": "0.001",
            "prompt_price": "0.0010330",
            "completion_tokens": 128,
            "completion_unit_price": "0.002",
            "completion_price_unit": "0.001",
            "completion_price": "0.0002560",
            "total_tokens": 1161,
            "total_price": "0.0012890",
            "currency": "USD",
            "latency": 0.7682376249867957
        },
        "retriever_resources": [
            {
                "position": 1,
                "dataset_id": "101b4c97-fc2e-463c-90b1-5261a4cdcafb",
                "dataset_name": "iPhone",
                "document_id": "8dd1ad74-0b5f-4175-b735-7d98bbbb4e00",
                "document_name": "iPhone List",
                "segment_id": "ed599c7f-2766-4294-9d1d-e5235a61270a",
                "score": 0.98457545,
                "content": "\"Model\",\"Release Date\",\"Display Size\",\"Resolution\",\"Processor\",\"RAM\",\"Storage\",\"Camera\",\"Battery\",\"Operating System\"\n\"iPhone 13 Pro Max\",\"September 24, 2021\",\"6.7 inch\",\"1284 x 2778\",\"Hexa-core (2x3.23 GHz Avalanche + 4x1.82 GHz Blizzard)\",\"6 GB\",\"128, 256, 512 GB, 1TB\",\"12 MP\",\"4352 mAh\",\"iOS 15\""
            }
        ]
    },
    "created_at": 1705407629
}
```

Đồng thời khuyến nghị bổ sung yêu cầu: "Code cũng cần thêm logic xử lý lỗi cơ bản, ví dụ như khi mất kết nối mạng hiển thị 'Kết nối thất bại, vui lòng thử lại', gọi API timeout tự động thử lại 1 lần, lỗi key hiện thông báo xác thực quyền thất bại v.v. các báo lỗi chi tiết, đảm bảo tính ổn định của cuộc trò chuyện và cho phép developer nhanh chóng phát hiện vấn đề API."

## 3.3 GitHub và triển khai mạng công khai

Cuối cùng, chúc mừng bạn đã hoàn thành phát triển trang Hogwarts Portraits! Tiếp theo chúng ta cần tải nó lên nền tảng GitHub và triển khai lên môi trường công cộng để mọi người đều có thể truy cập.

Bạn cần tham khảo hướng dẫn này, nghiên cứu cách sử dụng GitHub, tải dự án của mình lên GitHub: [GitHub là gì](/vi-vn/stage-2/backend/git-workflow/)

Ngoài ra, bạn còn cần học cách sử dụng Zeabur, kết nối nó với GitHub, và triển khai thành công dự án của bạn: [Zeabur là gì](/vi-vn/stage-2/backend/zeabur-deployment/)

Nếu bạn cảm thấy việc tự phát triển một dự án Hogwarts Portraits rất khó khăn, bạn có thể bắt đầu từ việc tham khảo và sửa đổi dự án của người khác. Địa chỉ code chính thức của bài học này là: https://github.com/THU-SIGS-AIID/Project4-Hogwarts-Portraits

![](/zh-cn/stage-2/frontend/hogwarts-portraits/images/image54.webp)

# 4. Thử các phong cách thiết kế khác nhau

Sau khi hoàn thành phiên bản thiết kế đầu tiên, chúng ta không cần giới hạn ở đây, khuyến khích mọi người nhanh chóng khám phá các phong cách thị giác đa dạng hơn. Bạn có thể大胆 sửa đổi trong phần nguyên mẫu, hoặc dựa trên dự án cuối cùng để sửa đổi prompt hoàn toàn mới, từ đó tạo ra nhiều bộ trang có sự khác biệt phong cách rõ rệt. Ví dụ: trang tối có họa tiết cổ điển, thiên về phong cách "sách cũ / học viện", trang sáng màu tươi vui, đầy cảm giác "cổ tích / hoạt hình", hoặc thiết kế phẳng hiện đại với yếu tố tối giản và thị giác清爽. Ví dụ hình dưới đây là một trường hợp chuyển đổi sang phong cách thiết kế thơ cổ Trung Quốc, hình ảnh chân dung không thay đổi, chỉ sửa đổi các phần khác:

![](/zh-cn/stage-2/frontend/hogwarts-portraits/images/image55.webp)

Không cần bó buộc vào mô hình đã đề cập trước đó, bạn có thể sửa đổi chân dung phép thuật hoặc trang hồ sơ cá nhân sao cho đặc sắc hơn, phù hợp với thói quen của chính "chân dung phép thuật", điều này sẽ làm ứng dụng của bạn thú vị hơn. Mong chờ thành phẩm chân dung phép thuật của bạn!

# 📚 Bài tập

Mục tiêu bài tập của bài học này là để bạn hoàn thành một Hogwarts Portraits thực sự thuộc về mình, và có thể truy cập qua liên kết mạng công cộng.

Bạn cần cung cấp hai thứ trong bài nộp:

1. **Liên kết kho GitHub của bạn;**
   1. **Viết trong README.md một hai câu mô tả nhỏ: Bạn đã chọn ai làm nhân vật chính của chân dung, tại sao chọn TA.**
2. **Liên kết truy cập trực tuyến Hogwarts Portraits của bạn;**

Bạn cũng có thể tham khảo hướng dẫn [Sử dụng Agent thiết kế và code để làm trang web](/vi-vn/stage-1/appendix-articles/example0-2/vibe-coding-tools-build-website-with-ai-coding-and-design-agents) do Yerim viết, để nhanh chóng xây dựng portfolio cá nhân hoặc bất kỳ trang web chức năng đơn giản nào.
