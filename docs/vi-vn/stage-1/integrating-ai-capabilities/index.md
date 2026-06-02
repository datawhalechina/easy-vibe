---
title: 'Thêm năng lực AI cho nguyên mẫu - Kết nối API văn bản và hình ảnh'
description: 'Kết nối năng lực AI thật vào nguyên mẫu Web hiện có: hiểu khái niệm cốt lõi của API, học cách tìm API Key và ví dụ chính thức; thực hành tích hợp mô hình văn bản DeepSeek cùng nhiều dịch vụ tạo ảnh như SiliconFlow Qwen-Image, Recraft, Seedream, đồng thời nắm được phương pháp chọn mô hình thường dùng.'
---

<script setup>
import { relatedArticlesMap } from '@theme/data/relatedArticles'

const duration = 'khoảng <strong>1 ngày</strong>'
const relatedArticles =
  relatedArticlesMap['vi-vn/stage-1/integrating-ai-capabilities'] ?? []
</script>

# Sơ cấp 4: Đưa năng lực AI vào nguyên mẫu

## Dẫn nhập chương

<ChapterIntroduction :duration="duration" :tags="['API', 'Mô hình văn bản', 'Tạo ảnh từ văn bản', 'Tích hợp nguyên mẫu']" coreOutput="Nguyên mẫu kết nối 1 mô hình văn bản + 1 mô hình hình ảnh tùy chọn" expectedOutput="Nguyên mẫu AI có thể gọi API thật">

Trong các chương trước, chúng ta đã hoàn thành toàn bộ quy trình từ <strong>tìm ý tưởng tốt</strong> đến <strong>làm ra nguyên mẫu sản phẩm</strong>. Nhưng nguyên mẫu hiện tại vẫn chỉ là một "lớp vỏ": bấm nút không thật sự tạo nội dung, dữ liệu trên trang đều được viết cố định.

Còn nhớ điều chúng ta nhấn mạnh ở chương đầu không? <strong>Chúng ta muốn làm "sản phẩm có người sẵn sàng trả tiền", chứ không phải "nguyên mẫu nhìn có vẻ ổn".</strong> Giá trị thật đến từ việc sản phẩm có thể <strong>giải quyết vấn đề thật</strong>, và để làm được điều đó, nguyên mẫu phải <strong>thật sự chạy được</strong>.

Chương này sẽ khiến nguyên mẫu <strong>"sống" dậy</strong>: chúng ta sẽ kết nối <strong>năng lực AI thật</strong>, bắt đầu từ việc lấy API Key, đọc hiểu tài liệu chính thức, rồi để AI IDE giúp bạn tích hợp giao diện vào code. Bạn sẽ dùng <strong>mô hình văn bản DeepSeek</strong> làm ví dụ để học cách khiến ứng dụng <strong>thật sự gọi mô hình lớn để tạo nội dung</strong>; nếu hứng thú, bạn cũng có thể <strong>làm thêm phần kết nối tạo hình ảnh</strong>.

Học xong chương này, nguyên mẫu của bạn sẽ <strong>không còn là bản demo tĩnh</strong>, mà là <strong>một ứng dụng có thể gọi năng lực AI thật và giải quyết vấn đề thật</strong>.

</ChapterIntroduction>

<div style="margin: 50px 0;">
  <ClientOnly>
    <StepBar :active="0" :items="[
      { title: 'Nền tảng API', description: 'Hiểu khái niệm cốt lõi và quy tắc an toàn' },
      { title: 'Kết nối văn bản', description: 'Thực hành tạo văn bản với DeepSeek' },
      { title: 'Kết nối hình ảnh', description: 'Hiểu và tạo hình ảnh bằng VLM' }
    ]" />
  </ClientOnly>
</div>

# 1. Khái niệm cơ bản về API

Như đã nói ở trên, mục tiêu của chúng ta là "kết nối năng lực AI vào", để nguyên mẫu không còn là bản demo tĩnh mà trở thành công cụ có thể gọi dịch vụ AI thật. Chìa khóa để làm điều đó là hiểu và sử dụng API.

API là một khái niệm trừu tượng quan trọng trong lĩnh vực máy tính. Có thể hiểu đơn giản là: **bạn "gửi một câu hỏi" theo định dạng đối phương yêu cầu, đối phương sẽ "trả một kết quả" theo định dạng tương ứng**.

- **Nội dung bạn gửi đi**: thường gồm "khóa (API Key)" và "bạn muốn tạo gì"
- **Nội dung đối phương trả về**: thành công thì trả kết quả; thất bại sẽ cho biết nguyên nhân, ví dụ "khóa sai", "không đủ số dư", "tham số viết sai"

Cụ thể, bạn cần nắm các yếu tố cốt lõi sau:

1. **API Key**: "thẻ thông hành" của bạn, cũng là "chìa khóa ví tiền". Nếu người khác có được nó, họ có thể gọi API thay bạn và phát sinh chi phí.
2. **Endpoint (đường dẫn giao diện)**: đường dẫn cụ thể của yêu cầu API, cho máy chủ biết bạn muốn truy cập chức năng nào. Địa chỉ yêu cầu đầy đủ thường được tạo bởi "URL cơ sở + endpoint". Ví dụ:
   - Tạo văn bản: URL cơ sở (`https://api.service.com`) + Endpoint (`/v1/chat/completions`) = URL đầy đủ `https://api.service.com/v1/chat/completions`
   - Tạo hình ảnh: URL cơ sở (`https://api.service.com`) + Endpoint (`/v1/images/generations`) = URL đầy đủ `https://api.service.com/v1/images/generations`
3. **Gọi/yêu cầu**: quá trình gửi nhiệm vụ tới dịch vụ AI và nhận kết quả.
4. **Nội dung yêu cầu**: nội dung cụ thể bạn gửi cho AI, ví dụ chủ đề bài viết bạn muốn AI viết hoặc mô tả hình ảnh muốn tạo.
5. **Kết quả phản hồi**: nội dung AI trả về sau khi xử lý, ví dụ bài viết hoặc hình ảnh được tạo.
6. **Xử lý lỗi**: khi có vấn đề như API Key sai hoặc yêu cầu quá thường xuyên, biết cách kiểm tra và giải quyết.

::: info ℹ️ API là gì
Để hiểu sâu hơn về API, hãy xem phụ lục: [Nhập môn API](/zh-cn/appendix/4-server-and-backend/api-intro).

::: warning 🔐 **Lưu ý an toàn API**
API Key là "thẻ thông hành" để bạn yêu cầu dịch vụ AI. Nó là một chuỗi mật khẩu dùng cho xác thực danh tính và tính phí.

Vì API Key liên quan trực tiếp đến tài khoản và chi phí, hãy đặc biệt chú ý:

- Tuyệt đối **không chia sẻ trong nhóm chat, không upload ảnh chụp lên mạng** hoặc đăng trên diễn đàn công khai
- **Không hardcode vào code** rồi commit lên kho Git, đặc biệt là kho công khai
- Nếu nghi ngờ Key đã bị lộ, **hãy đổi Key mới ngay lập tức**

Trong phần bên dưới, chúng ta sẽ **trực tiếp dán API KEY vào AI IDE để thao tác**. **Trong dự án chính thức đừng làm như vậy!!** Ở đây chỉ làm vì là bài luyện tập. Khi thành thạo hơn, bạn có thể để AI tạo một file cấu hình và chỉ cần đặt API KEY vào file cấu hình đó.
:::

<div style="margin: 50px 0;">
  <ClientOnly>
    <StepBar :active="1" :items="[
      { title: 'Nền tảng API', description: 'Hiểu khái niệm cốt lõi và quy tắc an toàn' },
      { title: 'Kết nối văn bản', description: 'Thực hành tạo văn bản với DeepSeek' },
      { title: 'Kết nối hình ảnh', description: 'Hiểu và tạo hình ảnh bằng VLM' }
    ]" />
  </ClientOnly>
</div>

# 2. Kết nối API tạo văn bản: DeepSeek

Mặc dù API liên quan đến các khái niệm kỹ thuật này, ở giai đoạn phát triển nguyên mẫu, thao tác thực tế có thể rất đơn giản và hiệu quả. Ý tưởng cốt lõi là:

> **Tìm ví dụ chính thức, lấy API Key, rồi để AI IDE giúp bạn kết nối nó vào nút bấm.**

Sau khi nắm được các khái niệm này, bạn sẽ thấy dù kết nối mô hình văn bản hay mô hình hình ảnh, quy trình bản chất đều giống nhau: khi người dùng bấm nút, frontend sắp xếp input và gửi yêu cầu; sau khi API trả kết quả, kết quả được hiển thị lên trang. Tiếp theo, chúng ta sẽ kiểm chứng điều này bằng thao tác thực tế.

Trong `1.2 Tự tay làm ra nguyên mẫu`, bạn đã tạo được một nguyên mẫu có thể tương tác. Tiếp theo, việc cần làm là biến những chức năng "trông giống AI" trong nguyên mẫu thành năng lực thật sự dùng được: **khi người dùng bấm nút, nguyên mẫu sẽ gửi yêu cầu tới dịch vụ AI bên ngoài và hiển thị văn bản trả về.**

::: info ℹ️ Mở rộng nguyên lý
Nếu muốn hiểu thêm nội dung liên quan đến nguyên lý, hãy xem phụ lục: [Nhập môn mô hình ngôn ngữ lớn (LLM)](/zh-cn/appendix/8-artificial-intelligence/llm-principles).
::: details Tìm hiểu thêm: DeepSeek là gì?

**Hangzhou DeepSeek Artificial Intelligence Basic Technology Research Co., Ltd.**, hoạt động dưới thương hiệu DeepSeek, là một **công ty trí tuệ nhân tạo Trung Quốc phát triển mô hình ngôn ngữ lớn (LLMs)**. DeepSeek đặt trụ sở tại Hàng Châu, Chiết Giang, thuộc sở hữu và được tài trợ bởi quỹ định lượng Trung Quốc High-Flyer. DeepSeek được thành lập vào tháng 7 năm 2023 bởi Liang Wenfeng, đồng sáng lập High-Flyer, người đồng thời là CEO của cả hai công ty. Tháng 1 năm 2025, công ty ra mắt chatbot cùng tên và mô hình DeepSeek-R1.

Hãy xem DeepSeek so sánh với các mô hình hàng đầu khác trong bảng xếp hạng benchmark GPQA. Điều đáng chú ý là DeepSeek là mô hình open source, tức mọi người đều có thể tải mô hình từ internet, trong khi các mô hình phổ biến khác như Grok, Google Gemini và ChatGPT đều là mô hình đóng. Như có thể thấy, DeepSeek đã tiến rất gần tới nhóm mô hình hàng đầu.

![](../../../zh-cn/stage-1/integrating-ai-capabilities/images/index-2026-01-20-14-16-48.png)

GPQA là viết tắt của "Graduate-Level Google-Proof Q&A Benchmark", một benchmark cấp sau đại học cho nhiệm vụ hỏi đáp khoa học. Dưới đây là giới thiệu chi tiết.

GPQA gồm 448 câu hỏi trắc nghiệm, bao phủ các phân ngành sinh học, vật lý và hóa học như cơ học lượng tử, hóa hữu cơ, sinh học phân tử, v.v. Các câu hỏi này do 61 chuyên gia có bằng tiến sĩ hoặc đang học tiến sĩ biên soạn và đã trải qua quy trình xác minh nghiêm ngặt.
:::

Làm theo 3 bước sau là có thể nhanh chóng tích hợp API tạo nội dung của mô hình lớn:

1. **Tạo một API Key trên nền tảng DeepSeek**
2. **Tìm ví dụ tạo văn bản trong tài liệu DeepSeek** (thường có code sẵn có thể copy trực tiếp)
3. **Mở AI IDE, dán API Key + ví dụ chính thức vào**, rồi nói với AI cần thực hiện chức năng gì:
   > Giúp tôi kết nối API của mô hình lớn này để hỗ trợ nhiệm vụ tạo copy trong ứng dụng này

Tiếp theo chúng ta sẽ demo. Bạn có thể làm theo toàn bộ quy trình. Trước hết, đăng ký tài khoản [DeepSeek](https://platform.deepseek.com/usage), tạo một API Key và nạp một khoản nhỏ để kiểm thử.

![](../../../zh-cn/stage-1/integrating-ai-capabilities/images/index-2026-01-20-13-57-41.png)

![](../../../zh-cn/stage-1/integrating-ai-capabilities/images/index-2026-01-20-13-58-13.png)

Bấm "API KEYS" và tìm "create new API key" ở phía dưới màn hình. Cuối cùng bạn sẽ nhận được một API key có dạng như `sk-8573341c39fc44315aadc071c53rh7d2`.

![](../../../zh-cn/stage-1/integrating-ai-capabilities/images/index-2026-01-20-13-58-32.png)

Khi đã có khóa, bạn đã có quyền gọi mô hình.

Lúc này, bạn có thể đọc trực tiếp tài liệu [API](https://api-docs.deepseek.com/). Tài liệu thường cung cấp ví dụ gọi bằng curl hoặc Python.

![](../../../zh-cn/stage-1/integrating-ai-capabilities/images/index-2026-01-20-13-58-56.png)

Sau khi tìm được ví dụ, bạn có thể copy toàn bộ nội dung trong tài liệu cùng với khóa vào hộp thoại của AI IDE, yêu cầu nó giúp bạn tích hợp mô hình ngôn ngữ lớn vào nguyên mẫu đã phát triển trước đó.

![](../../../zh-cn/stage-1/integrating-ai-capabilities/images/index-2026-01-20-13-59-31.png)

Bạn có thể tham khảo prompt sau:

```
Hãy tham khảo phương thức gọi này và giúp tôi hỗ trợ chức năng tạo copy. Có thể dựa trên thông tin sản phẩm, sau khi bấm sẽ tạo copy thương mại điện tử Douyin/TikTok tương ứng với nhiều phong cách.

Tài liệu tham khảo:
api key：sk-8573341c39aefa1efe
Tham khảo yêu cầu API:
curl  \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer ${DEEPSEEK_API_KEY}" \
  -d '{
        "model": "deepseek-chat",
        "messages": [
          {"role": "system", "content": "You are a helpful assistant."},
          {"role": "user", "content": "Hello!"}
        ],
        "stream": false
      }'
```

Sau một thời gian để AI tạo code, chúng ta thường dễ dàng có được nút tạo copy tương ứng để kiểm thử. Nếu không tìm thấy lối vào, bạn có thể yêu cầu AI IDE cho biết có thể bấm tới trang đó từ trang nào; nếu vẫn không tìm thấy, có thể yêu cầu AI IDE trực tiếp refactor và cải tiến theo ý tưởng của bạn để có kết quả tạo copy cuối cùng.

![](../../../zh-cn/stage-1/integrating-ai-capabilities/images/index-2026-01-20-14-23-23.png)

![](../../../zh-cn/stage-1/integrating-ai-capabilities/images/index-2026-01-20-14-26-35.png)

Tất nhiên, ở đây bạn có thể hỏi: làm sao biết nó thật sự gọi mô hình lớn chứ không chỉ tích hợp sẵn một phản hồi cố định? Bạn có thể nhập copy tùy chỉnh, để mô hình lớn tạo nội dung tương ứng theo phân tích tùy chỉnh bạn vừa chỉ định.

Nếu thấy mỗi lần kết quả khác nhau và hợp logic, bạn có thể yên tâm rằng API đã được gọi bình thường để tạo nội dung. Bạn cũng có thể xem trên [nền tảng quản lý sử dụng API](https://platform.deepseek.com/usage) xem cuộc gọi có thành công không, dù có thể phải chờ vài phút mới thấy.

## Thêm lựa chọn mô hình tạo văn bản

Ngoài DeepSeek, bạn cũng có thể thử các mô hình ngôn ngữ lớn khác. Vì phần lớn mô hình đều cung cấp **giao diện tương thích OpenAI**, việc chuyển đổi rất đơn giản: chỉ cần thay API Key, URL cơ sở và tên mô hình.

### Tích hợp MiniMax

::: details Tìm hiểu thêm: MiniMax là gì?

**MiniMax** là một công ty trí tuệ nhân tạo Trung Quốc, tập trung vào nghiên cứu và phát triển công nghệ trí tuệ nhân tạo tổng quát. MiniMax đã lần lượt ra mắt các dòng mô hình ngôn ngữ lớn MiniMax-M3 và MiniMax-M2.7, thể hiện tốt trên nhiều benchmark và có tỷ lệ hiệu năng/chi phí rất cao.

**Đặc điểm chính của dòng MiniMax:**

- **Ngữ cảnh siêu dài**: M3 hỗ trợ cửa sổ ngữ cảnh lên tới 512K tokens (M2.7 là 204,800 tokens), phù hợp xử lý tài liệu dài và hội thoại nhiều lượt
- **Hiệu năng/chi phí cao**: giá rất cạnh tranh
- **Giao diện tương thích OpenAI**: có thể gọi trực tiếp bằng OpenAI SDK, không cần học thêm định dạng API mới
- **Các mô hình khả dụng**:
  - `MiniMax-M3`: mô hình flagship mới nhất, ngữ cảnh 512K, đầu ra tối đa 128K và hỗ trợ đầu vào hình ảnh
  - `MiniMax-M2.7`: mô hình flagship thế hệ trước, vẫn khả dụng
  - `MiniMax-M2.7-highspeed`: phiên bản tốc độ cao, giữ cùng hiệu năng nhưng nhanh hơn
:::

Cách kết nối giống DeepSeek, chỉ cần ba bước:

1. Tới [nền tảng mở MiniMax](https://platform.minimax.io/) để đăng ký tài khoản và tạo API Key
2. Tìm ví dụ gọi trong tài liệu MiniMax
3. Dán API Key + ví dụ vào AI IDE

Vì MiniMax cung cấp giao diện tương thích OpenAI, bạn có thể copy trực tiếp ví dụ curl dưới đây cùng API Key của mình và gửi cho AI IDE để tích hợp:

```bash
curl https://api.minimax.io/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer ${MINIMAX_API_KEY}" \
  -d '{
        "model": "MiniMax-M3",
        "messages": [
          {"role": "system", "content": "You are a helpful assistant."},
          {"role": "user", "content": "Hello!"}
        ],
        "stream": false
      }'
```

::: tip ✅ Gợi ý
Định dạng API của MiniMax gần như giống hệt DeepSeek, đều là định dạng tương thích OpenAI. Vì vậy nếu bạn đã kết nối DeepSeek thành công, chuyển sang MiniMax chỉ cần sửa ba chỗ:
1. **URL cơ sở**: đổi thành `https://api.minimax.io/v1`
2. **API Key**: dùng API Key của MiniMax
3. **Tên mô hình**: đổi thành `MiniMax-M3` (flagship mới), `MiniMax-M2.7` hoặc `MiniMax-M2.7-highspeed`

Thông tin thêm xem [tài liệu giao diện tương thích OpenAI của MiniMax](https://platform.minimax.io/docs/api-reference/text-openai-api).
:::

# 3. Tich hop API chuyen hinh anh thanh van ban: Qwen3 VL

::: info ℹ️ Mo rong nguyen ly
Neu ban muon tim hieu them ve nguyen ly lien quan, hay xem phu luc: [Nhap mon mo hinh thi giac-ngon ngu (VLM)](/zh-cn/appendix/8-artificial-intelligence/multimodal-models).

::: details Tim hieu them: Qwen3 VL la gi?

**Qwen3 VL** la phien ban moi nhat trong dong mo hinh da phuong thuc thi giac-ngon ngu do doi Tongyi Qianwen cua Alibaba Cloud ra mat. VL la viet tat cua "Vision-Language", tuc mo hinh thi giac-ngon ngu. No co the hieu noi dung hinh anh, tao mo ta bang van ban tu hinh anh, tra loi cau hoi ve hinh anh va trich xuat thong tin trong hinh anh.

![](../../../zh-cn/stage-1/integrating-ai-capabilities/images/index-2026-01-20-14-48-27.png)
![](../../../zh-cn/stage-1/integrating-ai-capabilities/images/index-2026-01-20-14-48-41.png)

**Cac nang luc chinh cua Qwen3 VL gom:**

- **Hieu hinh anh**: nhan dien vat the, boi canh, con nguoi, chu viet va cac noi dung khac trong anh.
- **Hoi dap thi giac**: tra loi chinh xac cac cau hoi cua nguoi dung ve hinh anh.
- **Mo ta hinh anh**: tao mo ta bang van ban chi tiet hoac ngan gon.
- **Hieu nhieu hinh anh**: ho tro xu ly dong thoi nhieu hinh anh de so sanh va phan tich.
- **Trich xuat van ban**: trich xuat chu tu hinh anh, tuc nang luc OCR.

**Vi sao chon Qwen3 VL?**

So voi the he truoc, Qwen3 VL cai thien ro ret do chinh xac khi hieu hinh anh va ho tro cac tac vu phan tich hinh anh dai hon, phuc tap hon. No co hieu nang tot voi tieng Trung, chi phi goi API tuong doi thap va ti le chi phi-hieu qua tot. Ngoai ra, cua so ngu canh lon hon giup no xu ly cac tac vu suy luan thi giac phuc tap hon.

**Tinh huong ung dung dien hinh:**

- Thuong mai dien tu: tu dong tao tieu de, mo ta va diem ban hang tu anh san pham.
- Sang tao noi dung: tao copy hoac goi y hinh anh tu anh tu lieu.
- Van phong: trich xuat noi dung trong anh, tu dong nhan dien bao cao.
- Giao duc: tu dong phan tich bai tap dang anh va trich xuat diem kien thuc.

:::

Trong phan truoc, chung ta da giai thich cach tich hop API tao van ban. Nhung voi cac tinh huong ung dung o tren, ta se thay mot van de: thu chung ta tai len la mot hinh anh. Neu chi dung mo hinh ngon ngu lon, no khong the hieu tot noi dung trong anh, nen ket qua sinh ra co the sai khac kha nhieu.

Chung ta can mot mo hinh co the giup bien hinh anh thanh mo ta bang van ban. Day la luc can den mo hinh thi giac-ngon ngu (VLM). Trong vi du nay, chung ta se dung VLM de tao mo ta diem ban hang cua san pham, tu do cai thien trai nghiem nguoi dung.

De thuan tien, chung ta se dung API do [nen tang dam may SiliconFlow](https://cloud.siliconflow.cn/me) cung cap de tich hop API chuyen hinh anh thanh van ban.

::: details Tim hieu them: SiliconFlow la gi?
**SiliconFlow** la mot nen tang tong hop mo hinh AI pho bien tai Trung Quoc, cung cap dich vu API cho nhieu mo hinh ngon ngu lon va mo hinh thi giac-ngon ngu chu dao.

**Dac diem nen tang:**

- **Ho tro nhieu mo hinh**: tich hop nhieu mo hinh AI chu dao, gom cac mo hinh ma nguon mo nhu DeepSeek, Qwen va dong Llama.
- **Toi uu ky thuat**: toi uu suy luan cho mo hinh ma nguon mo, cung cap dich vu API do tre thap va kha nang dong thoi cao.
- **Tuong thich giao dien**: cung cap API tuong thich dinh dang OpenAI, thuan tien de tich hop vao ung dung hien co.
- **Tra theo nhu cau**: ho tro tinh phi theo so lan goi.

SiliconFlow kha truong thanh ve dich vu suy luan cho cac mo hinh lon ma nguon mo, va la mot lua chon thuong gap khi su dung cac mo hinh AI ma nguon mo trong he sinh thai Trung Quoc.
:::

Khi vao trang chu cua SiliconFlow, ban se thay co rat nhieu mo hinh de lua chon. Tim bo loc o goc tren ben trai, bam mo bo loc va chon nhan thi giac. Ban se thay nhieu mo hinh chuyen hinh anh thanh van ban, vi du GLM-4.6V cua Zhipu hoac Qwen3-VL.

![](../../../zh-cn/stage-1/integrating-ai-capabilities/images/index-2026-01-20-15-05-04.png)

Ban co the chon bat ky mo hinh nao de thu. O day chung ta lay `Qwen/Qwen3-VL-8B-Instruct` lam vi du.

![](../../../zh-cn/stage-1/integrating-ai-capabilities/images/index-2026-01-20-15-07-44.png)

Vao [nen tang SiliconFlow](https://cloud.siliconflow.cn/me/account/ak), trong phan API key bam "Create API Key" de tao mot API Key moi.

Ban co the dung truc tiep doan ma duoi day lam ma tham khao, roi gui cung API Key vua tao cho AI IDE de tich hop tinh nang.

::: details Ma tham khao chuyen hinh anh thanh van ban

```python
from openai import OpenAI
from typing import Dict, Any, List
import base64
import os
SILICONFLOW_API_KEY: str = ""
SILICONFLOW_BASE_URL: str = "https://api.siliconflow.cn/v1/"
MODEL_NAME: str = "Qwen/Qwen3-VL-8B-Instruct"

def encode_image(image_path: str) -> str:
    with open(image_path, "rb") as image_file:
        return base64.b64encode(image_file.read()).decode('utf-8')

def get_vlm_completion(client: OpenAI, messages: List[Dict[str, Any]]) -> str:
    response = client.chat.completions.create(
        model=MODEL_NAME,
        messages=messages,
        max_tokens=512,
        temperature=0.7,
        top_p=0.7,
        frequency_penalty=0.5,
        stream=False,
        n=1
    )
    return response.choices[0].message.content

def caption_image(image_path: str) -> str:
    base64_image = encode_image(image_path)
    messages = [
        {
            "role": "user",
            "content": [
                {
                    "type": "text",
                    "text": "Please describe this image in detail."
                },
                {
                    "type": "image_url",
                    "image_url": {
                        "url": f"data:image/jpeg;base64,{base64_image}"
                    }
                }
            ]
        }
    ]

    client = OpenAI(
        api_key=SILICONFLOW_API_KEY,
        base_url=SILICONFLOW_BASE_URL
    )

    return get_vlm_completion(client, messages)

image_path = "images.jpg"
caption = caption_image(image_path)
```

:::

Trong tinh huong nay, chung ta thu yeu cau AI IDE giup hien thuc tinh nang tu dong tao van ban diem ban hang thuong mai dien tu va tu khoa tu hinh anh duoc tai len, nhu sau:

```
Du tren API chuyen hinh anh thanh van ban ben duoi, hay giup chung toi hien thuc tinh nang tu dong tao van ban diem ban hang thuong mai dien tu va tu khoa tu hinh anh duoc tai len.

<Ma duoc luoc bo o day; ban can tu dan key va ma tham khao vao>
```

Cuoi cung, ket qua tao ra nhu sau:
![](../../../zh-cn/stage-1/integrating-ai-capabilities/images/index-2026-01-20-15-34-36.png)

![](../../../zh-cn/stage-1/integrating-ai-capabilities/images/index-2026-01-20-15-35-41.png)

<div style="margin: 50px 0;">
  <ClientOnly>
    <StepBar :active="2" :items="[
      { title: 'Nen tang API', description: 'Hieu khai niem cot loi va quy tac bao mat' },
      { title: 'Tich hop van ban', description: 'Thuc hanh tao van ban voi DeepSeek' },
      { title: 'Tich hop hinh anh', description: 'Hieu va tao hinh anh bang VLM' }
    ]" />
  </ClientOnly>
</div>

# 4. Tich hop API tao hinh anh: Seedream

Trong cac phan truoc, chung ta chu yeu lam viec voi tac vu lien quan den van ban. Tiep theo, chung ta se thu tich hop tinh nang tao hinh anh, ho tro tao hinh tu mo ta bang van ban hoac chinh sua hinh anh co san.

::: info ℹ️ Mo rong nguyen ly
Neu ban muon tim hieu them ve nguyen ly lien quan, hay xem phu luc: [Nhap mon tao hinh anh](/zh-cn/appendix/8-artificial-intelligence/image-generation).

::: details Tim hieu them: [Seedream](https://seed.bytedance.com/en/seedream4_5) la gi?

![](../../../zh-cn/stage-1/integrating-ai-capabilities/images/index-2026-01-20-23-15-17.png)

> Co the ban da biet Nano Banana do Google phat trien, nhung Seedream cung rat dang chu y. Seedream 4.5 la the he mo hinh sang tao hinh anh moi do ByteDance xay dung. No tich hop nang luc tao hinh anh va chinh sua hinh anh vao mot kien truc thong nhat, giup xu ly linh hoat cac tac vu da phuong thuc phuc tap nhu tao noi dung dua tren tri thuc, suy luan phuc tap va giu tinh nhat quan voi anh tham chieu. Ngoai ra, toc do suy luan cua no nhanh hon nhieu so voi the he truoc va co the tao anh do phan giai cao an tuong len den 4K.
>
> ![](../../../zh-cn/stage-1/integrating-ai-capabilities/images/index-2026-01-20-23-15-38.png)
> ![](../../../zh-cn/stage-1/integrating-ai-capabilities/images/index-2026-01-20-23-15-50.png)

**Nang luc chinh:**

- **Van ban thanh hinh anh**: tao hinh anh tu mo ta bang van ban, ho tro nhieu phong cach nhu hien thuc, hoat hinh, thuy mac, cyberpunk.
- **Chuyen phong cach**: chuyen mot hinh anh sang phong cach nghe thuat duoc chi dinh.
- **Bien the hinh anh**: tao hinh moi co phong cach tuong tu dua tren anh tham chieu.
- **Nang do phan giai**: tang do ro va chi tiet cua hinh anh.
- **Chinh sua hinh anh**: chinh sua va thay doi hinh anh co san bang chi dan ngon ngu tu nhien.

**Vi sao chon Seedream?**

- **Mang noi dia on dinh**: truy cap nhanh va do tre thap tai Trung Quoc.
- **Ket qua tot**: on dinh va dang tin trong cac tinh huong thuong mai dien tu va tu lieu hinh anh.
- **Toi uu cho tieng Trung**: hieu prompt tieng Trung chinh xac hon, phu hop voi nguoi dung noi dia.
- **Toc do nhanh**: hieu suat tao cao, thoi gian phan hoi ngan.
- **Chat luong on dinh**: tao hinh anh HD do phan giai toi da 4K.

**Tinh huong ung dung dien hinh:**

- Thuong mai dien tu: tao anh chinh, anh trang chi tiet va poster khuyen mai.
- Mang xa hoi: tao avatar, sticker va hinh minh hoa.
- Thiet ke: nhanh chong tao concept, tu lieu va hinh nen.
- Marketing: tao anh quang cao, banner su kien va poster ngay le.

**Ket hop voi Qwen3 VL:**

Hai API nay co the dung noi tiep: truoc tien dung Qwen3 VL de phan tich anh tham chieu va hieu noi dung khung hinh; sau do dung Seedream de tao hinh anh moi dua tren prompt duoc rut ra tu phan tich do.
:::

Nhieu "poster AI / anh chinh AI / hinh nhan vat AI" ma ban thay tren Douyin, Bilibili hoac YouTube ve ban chat deu dung cac ky thuat trong phan nay. Viec ban can lam rat don gian: sap xep dau vao cua nguoi dung thanh mot cau, goi API hinh anh, roi hien thi hinh anh tra ve. Mo hinh duoc dung luc nay goi la mo hinh tao hinh anh / chinh sua hinh anh.

Chung ta se tung buoc minh hoa cach tich hop Seedream API vao du an cua ban, voi su ho tro cua AI IDE.

Sau khi [truy cap trang chu](https://www.volcengine.com/experience/ark?launch=seedream), bam dang nhap.

![](../../../zh-cn/stage-1/integrating-ai-capabilities/images/index-2026-01-20-23-12-07.png)

Sau khi dang nhap, tim tuy chon nap tien o goc tren ben phai.

![](../../../zh-cn/stage-1/integrating-ai-capabilities/images/index-2026-01-20-23-12-22.png)

Nap tien can xac minh danh tinh that.

![](../../../zh-cn/stage-1/integrating-ai-capabilities/images/index-2026-01-20-23-12-30.png)

Sau khi xac minh thanh cong, ban co the [nap 1 yuan de thu nghiem](https://console.volcengine.com/finance/fund/recharge).

Quay lai [man hinh ban dau](https://www.volcengine.com/experience/ark?launch=seedream) va bam truy cap API.

![](../../../zh-cn/stage-1/integrating-ai-capabilities/images/index-2026-01-20-23-12-43.png)

Truoc tien, tao mot API key, sau do bam tuy chon chon.

![](../../../zh-cn/stage-1/integrating-ai-capabilities/images/index-2026-01-20-23-13-01.png)

Thao tac nay se dua ban den buoc 2. Tai day, ban can xac nhan dich vu duoc goi la Seedream 4.5 va sao chep vi du goi duoc cung cap. Anh chup nay kha cu, nen phien ban mo hinh trong anh van hien la 4.0.

![](../../../zh-cn/stage-1/integrating-ai-capabilities/images/index-2026-01-20-23-13-11.png)

Sau khi chuan bi API Key va vi du goi, ban co the dan truc tiep chung vao AI IDE de no tao demo tuong tac frontend hoac tich hop nang luc nay vao prototype hien co. Luu y trong giao dien co the chon giua tao hinh tu van ban va tao mot hinh tu nhieu hinh; ban can chon ma tham khao theo nhu cau hien tai.

::: warning ⚠️ Luu y quan trong
Vi du mac dinh o day tuong doi phuc tap. Hay nho tat **"them watermark"** va **"phan hoi streaming"** de dam bao khong tao watermark va tranh loi yeu cau.
:::

Vi sau do chung ta dung che do tao hinh tu anh tham chieu, truoc tien hay vao tinh nang tao mot hinh tu nhieu hinh. Ma tham khao sao chep nhu sau:

```
curl -X POST https://ark.cn-beijing.volces.com/api/v3/images/generations \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer xxxxxxx" \
  -d '{
    "model": "doubao-seedream-4-5-251128",
    "prompt": "Thay trang phuc trong hinh 1 bang trang phuc trong hinh 2",
    "image": ["https://ark-project.tos-cn-beijing.volces.com/doc_image/seedream4_imagesToimage_1.png", "https://ark-project.tos-cn-beijing.volces.com/doc_image/seedream4_imagesToimage_2.png"],
    "sequential_image_generation": "disabled",
    "response_format": "url",
    "size": "2K",
    "stream": false,
    "watermark": true
}'
```

Sau khi co ma tham khao ve hinh anh, chung ta yeu cau AI IDE ho tro cac tac vu hinh anh thuong gap trong thuong mai dien tu:

```
Hay dua tren API ben duoi de giup toi hien thuc cac tinh nang thuong gap trong nghiep vu thuong mai dien tu cua du an nay, vi du tao poster, tao anh dau tien cho thuong mai dien tu tren Douyin/TikTok, v.v.

<Dan API KEY va ma chinh sua hinh anh tai day>
```

Hieu qua hien thuc nhu sau:

![](../../../zh-cn/stage-1/integrating-ai-capabilities/images/index-2026-01-20-23-21-13.png)

Can luu y rang tao hinh anh doi khi gap cac loi kho doan. Ban nen yeu cau AI IDE hien thi day du thong bao loi de tien sao chep va sua; neu khong, no co the lien tuc hien "tao hinh that bai" ma khong noi ro ly do. Vi du, ban co the noi:

```
Dung chi hien thi "tao hinh anh that bai"; moi lan hay hien thi day du ly do that bai, vi du hinh anh khong khop, loi yeu cau, timeout, v.v.
```

Do khi sau khi sua, thay doi khong duoc ap dung vao trang web. Neu ban thay trang van bao loi lap di lap lai sau nhieu lan sua, cung co the thu noi truc tiep voi AI IDE: hay khoi dong lai du an nay.

Trong nghiep vu thuong mai dien tu, co the chung ta muon tu dong mac quan ao nguoi dung tai len len nguoi mau, hoac tu dong tao anh ban hang va poster hap dan cho san pham. O day chung ta thu mot prompt yeu cau no tao poster thuong mai dien tu:

![](../../../zh-cn/stage-1/integrating-ai-capabilities/images/index-2026-01-20-23-14-10.png)

Ban co the dung API van ban thanh hinh anh hoac hinh anh thanh hinh anh de hien thuc cac tinh nang khac nhau theo kich ban kinh doanh ma ban hinh dung.

## Them cac lua chon dich vu hinh anh khac

Duoi day la mot so lua chon khac. Ban nen chay thong ket qua tao hinh bang Qwen truoc, sau do dua tren ket qua va chi phi de thay bang cac dich vu ben duoi, tuy theo trai nghiem thuc te.

### Tich hop Recraft

Neu prototype cua ban nghieng ve "san xuat thiet ke", vi du tao minh hoa theo phong cach thuong hieu, poster marketing hoac tu lieu vector, Recraft thuong se thuan tay hon. Cach tich hop hoan toan giong phan truoc: **lay Key + tim vi du chinh thuc + yeu cau AI IDE dua vi du vao nut/trang cua ban**.

::: details Tim hieu them: Recraft la gi?

> Recraft la mot cong cu AI danh cho nha thiet ke, hoa si minh hoa va nhan su marketing. Cong ty duoc thanh lap tai My nam 2022 va co tru so tai London. No giup tao va lap lai hieu ung thi giac nhu hinh anh, vector art va do hoa 3D, voi cac uu diem nhu dau ra chat luong cao, dat vi tri thanh phan chinh xac va thiet ke nhat quan voi thuong hieu. Recraft duoc hon 3 trieu nguoi dung tai 200 quoc gia va vung lanh tho tin dung, bao gom Ogilvy va Netflix, va da tao hon 350 trieu hinh anh. Doi ngu cua ho huong toi bien Recraft thanh cong cu thiet yeu cho nha thiet ke, giup nha sang tao kiem soat workflow duoc AI ho tro.
>
> ![](../../../zh-cn/stage-1/integrating-ai-capabilities/images/index-2026-01-20-23-23-34.png)
> ![](../../../zh-cn/stage-1/integrating-ai-capabilities/images/index-2026-01-20-23-23-42.png)

Truoc tien, chung ta van can tim [cong API](https://www.recraft.ai/profile/api) de lay API Key.

Vi o day khong co han muc mien phi, chung ta can tu nap 1,000 credits. Trang nay ho tro Alipay va WeChat Pay, nen lay 1,000 credits kha de. Luu y: dung nap qua so tien can thiet.

![](../../../zh-cn/stage-1/integrating-ai-capabilities/images/image40.png)

Sau do, chung ta van lam theo cung mot cach: vao tai lieu chinh thuc va tim vi du yeu cau tuong ung:

- <https://www.recraft.ai/docs/api-reference/getting-started>
- <https://www.recraft.ai/docs/api-reference/usage>
- <https://www.recraft.ai/docs/api-reference/guides>

:::

### Tich hop Qwen Image / Qwen Image Edit

Neu ban muon tich hop dich vu tao hinh anh theo cach don gian hon, co the can nhac Qwen Image. Tu duy van khong doi: xem no nhu mot "API tao hinh anh" va noi vao nut trong prototype cua ban.

::: details Tim hieu them: Qwen Image / Qwen Image Edit la gi?

**Qwen Image** la dong mo hinh tao hinh anh do doi Tongyi cua Alibaba Cloud ra mat, chu yeu gom hai mo hinh:

**1. Qwen Image: mo hinh van ban thanh hinh anh (Text-to-Image)**

Tao hinh anh hoan toan moi dua tren mo ta bang van ban. Ban nhap mot prompt, mo hinh se hieu y dinh cua ban va tao hinh anh phu hop voi mo ta.

![](../../../zh-cn/stage-1/integrating-ai-capabilities/images/index-2026-01-20-14-43-30.png)

**Nang luc chinh:**

- **Van ban thanh hinh anh**: tao hinh anh tu mo ta bang van ban, ho tro nhieu phong cach nhu hien thuc, hoat hinh, thuy mac, cyberpunk.
- **Chuyen phong cach**: chuyen mot hinh anh sang phong cach nghe thuat duoc chi dinh.
- **Bien the hinh anh**: tao hinh moi co phong cach tuong tu dua tren anh tham chieu.
- **Nang do phan giai**: tang do ro va chi tiet cua hinh anh.

**2. Qwen Image Edit: mo hinh hinh anh thanh hinh anh (Image-to-Image)**

Chinh sua va thay doi hinh anh co san. Thong qua chi dan ngon ngu tu nhien, mo hinh hieu y dinh chinh sua cua ban va tao ket qua.

**Nang luc chinh:**

- **Thay the cuc bo**: thay mot vat the hoac nhan vat trong anh, vi du "doi nen thanh bai bien".
- **Loai bo phan tu**: xoa cac phan tu khong can thiet trong anh.
- **Chuyen doi phong cach**: them bo loc hoac hieu ung nghe thuat cho anh.
- **Mo rong hinh anh**: mo rong bien anh va tao noi dung moi.
- **Chinh anh thong minh**: tu dong lam dep, dieu chinh anh sang bong do va sua loi.

![](../../../zh-cn/stage-1/integrating-ai-capabilities/images/index-2026-01-20-14-46-17.png)

![](../../../zh-cn/stage-1/integrating-ai-capabilities/images/index-2026-01-20-14-46-29.png)

![](../../../zh-cn/stage-1/integrating-ai-capabilities/images/index-2026-01-20-14-46-33.png)

**Vi sao chon dong Qwen Image?**

- **Toi uu cho tieng Trung**: hieu prompt tieng Trung chinh xac hon, phu hop voi nguoi dung noi dia.
- **Chi phi thap**: re hon so voi nhieu doi thu quoc te.
- **Toc do nhanh**: hieu suat tao cao, thoi gian phan hoi ngan.
- **Chat luong on dinh**: hoat dong dang tin trong thuong mai dien tu va cac tinh huong tu lieu hinh anh.
- **Da dang phong cach**: ho tro nhieu phong cach nghe thuat va hieu ung sang tao.

**Tinh huong ung dung dien hinh:**

- Thuong mai dien tu: tao anh chinh, anh trang chi tiet va poster khuyen mai.
- Mang xa hoi: tao avatar, sticker va hinh minh hoa.
- Thiet ke: nhanh chong tao concept, tu lieu va hinh nen.
- Marketing: tao anh quang cao, banner su kien va poster ngay le.
  :::

Hay xem trang chinh thuc cua [SiliconFlow](https://siliconflow.cn/). Ben trai co phan "Playground", noi ban co the thu cac mo hinh khac nhau ma khong can goi API. O dau trang co nut "Filters"; bam vao do de loc danh sach mo hinh ben phai.

Neu ban chon "Image", ban se chi thay cac mo hinh van ban thanh hinh anh hien duoc ho tro. Trong truong hop nay, chung ta se dung Qwen/Qwen-Image.

![](../../../zh-cn/stage-1/integrating-ai-capabilities/images/index-2026-01-20-15-52-56.png)

Sau khi cau hinh xong, chung ta can tham khao tai lieu API tao hinh anh tuong ung. Tren trang tai lieu chinh thuc, ban co the tim phan duoc danh dau "API Reference". Bam vao do, sau do di den [phan API tao hinh anh](https://docs.siliconflow.cn/cn/api-reference/images/images-generations) va tim vi du yeu cau lien quan.

Ban co the gui vi du yeu cau duoi day cung API KEY cho AI IDE de hien thuc tinh nang tao hinh anh.

```bash
curl --request POST \
  --url https://api.siliconflow.cn/v1/images/generations \
  --header 'Authorization: Bearer <token>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "model": "Qwen/Qwen-Image-Edit-2509",
  "prompt": "an island near sea, with seagulls, moon shining over the sea, light house, boats int he background, fish flying over the sea"
}
'
```

Mo hinh o day co the dung Qwen/Qwen-Image hoac Qwen/Qwen-Image-Edit-2509.

::: details Ma tham khao chinh sua hinh anh

Sao chep doan ma va key duoi day, roi gui chung cho AI IDE:

```python
import requests
import os
from typing import Dict, Any, Optional

SILICONFLOW_API_KEY: str = ""
SILICONFLOW_BASE_URL: str = "https://api.siliconflow.cn/v1/images/generations"
QWEN_IMAGE_EDIT_MODEL: str = "Qwen/Qwen-Image-Edit-2509"

def generate_image_edit(
    prompt: str,
    image: Optional[str] = None,
    image2: Optional[str] = None,
    image3: Optional[str] = None,
    negative_prompt: Optional[str] = None,
    cfg: Optional[float] = 4.0,
    seed: Optional[int] = None
) -> Optional[Dict[str, Any]]:
    payload: Dict[str, Any] = {
        "model": QWEN_IMAGE_EDIT_MODEL,
        "prompt": prompt,
    }
    if image:
        payload["image"] = image
    if image2:
        payload["image2"] = image2
    if image3:
        payload["image3"] = image3
    if negative_prompt:
        payload["negative_prompt"] = negative_prompt
    if cfg is not None:
        payload["cfg"] = cfg
    if seed is not None:
        payload["seed"] = seed

    headers: Dict[str, str] = {
        "Authorization": f"Bearer {SILICONFLOW_API_KEY}",
        "Content-Type": "application/json"
    }

    try:
        response = requests.post(SILICONFLOW_BASE_URL, json=payload, headers=headers)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        print(f"Error generating image: {e}")
        return None

def save_image_from_url(image_url: str, output_path: str = "image.png") -> bool:
    try:
        response = requests.get(image_url)
        response.raise_for_status()
        os.makedirs(os.path.dirname(output_path) if os.path.dirname(output_path) else ".", exist_ok=True)
        with open(output_path, "wb") as f:
            f.write(response.content)
        print(f"Image saved successfully to: {output_path}")
        return True
    except requests.exceptions.RequestException as e:
        print(f"Error downloading image: {e}")
        return False
    except Exception as e:
        print(f"Error saving image: {e}")
        return False

prompt: str = "Bien bau troi thanh canh chieu toi, co mat trang va cac vi sao, phong cach mong ao"
negative_prompt: str = "mo, chat luong thap, bien dang"
image_url: str = "https://inews.gtimg.com/om_bt/Os3eJ8u3SgB3Kd-zrRRhgfR5hUvdwcVPKUTNO6O7sZfUwAA/641"
image2_url: Optional[str] = None
image3_url: Optional[str] = None

cfg: float = 4.0
seed: int = 12345
output_path: str = "edited_image.png"

print(f"Generating edited image with prompt: {prompt}")
print(f"Input image: {image_url}")
print(f"CFG: {cfg}, Seed: {seed}")
print("-" * 50)

result = generate_image_edit(
    prompt=prompt,
    image=image_url,
    image2=image2_url,
    image3=image3_url,
    negative_prompt=negative_prompt,
    cfg=cfg,
    seed=seed
)

if result and "images" in result:
    images = result["images"]
    if images and len(images) > 0:
        image_url_result = images[0]["url"]
        print(f"Image edit generated successfully. URL: {image_url_result}")
        success = save_image_from_url(image_url_result, output_path)
        if success:
            print(f"Image saved to: {output_path}")
        else:
            print("Failed to save image to local file")
    else:
        print("No images found in response")
else:
    print("Image generation failed")
    if result:
        print(f"Response: {result}")
```

:::

# Phu luc: cach tim mo hinh AI "manh hon hien tai"

Mo hinh van ban, thuong duoc goi la "mo hinh ngon ngu lon", phat trien rat nhanh. Chung ta luon can dam bao minh dang dung mot trong nhung mo hinh co hieu nang tot hon. Thong qua hai trang web duoi day, ban co the de dang xem mo hinh nao hien duoc nhieu nguoi dung va danh gia tot.

Noi chung, ban co the hieu loai trang nay nhu **"dau truong mo hinh"**: no dat dau ra cua hai mo hinh canh nhau, roi ban bo phieu cho cai ban thich hon. Mo hinh co nhieu phieu hon thuong co nghia la nhieu nguoi thay no "de dung hon".

Ngoai ra, doi khi ban co the thay cac mo hinh an danh bi an, nhu "Unknown Model", trong cac dau truong mo hinh lon nay. Dieu do thuong co nghia la ai do da am tham dua "mo hinh thu nghiem noi bo" vao de thu nghiem mu, va ban co the co co hoi trai nghiem nang luc manh hon som hon.

## LMArena

Trang web: <https://lmarena.ai/>

LMArena phu hop hon de danh gia "phan tra loi cua mo hinh nao duoc da so nguoi thich hon". Cang nhieu phieu va diem cang cao, no thuong cang on dinh trong tinh huong su dung thuc te.

Mot cach dung don gian la:

1. Xem truc tiep bang xep hang (Leaderboard)
2. Chon truoc huong ban can lam, vi du hoi thoai tong quat / lap trinh / thi giac
3. Chon mot mo hinh trong Top 3 ma ban co the dung, tuc co the truy cap, gia chap nhan duoc va do tre chap nhan duoc

![](../../../zh-cn/stage-1/integrating-ai-capabilities/images/image.png)

## Artificial Analysis

Trang web: <https://artificialanalysis.ai/>

Artificial Analysis phu hop hon de so sanh "chat luong / gia / toc do" trong cung mot bang. Ban co the xem no nhu bang tham so de chon mo hinh.

Cach dung thuong gap la:

1. Tim danh muc mo hinh ban quan tam, vi du van ban / tao hinh anh
2. Xem chi so chat luong (Quality) + gia (Price) + do tre/thong luong (Latency/Throughput)
3. Chon mo hinh co "ti le chi phi-hieu qua tong the" phu hop nhat voi san pham cua ban

::: tip ✅ Goi y
Dung tranh luan "mo hinh nao manh hon" chi bang cam tinh. Cach dang tin hon la dung cung mot tap dau vao de thu 2-3 mo hinh, sau do ket hop bang xep hang va gia de quyet dinh.
:::

## Tong ket

Khi tich hop cac loai dich vu AI, khong can hinh dung API qua phuc tap. Neu nam duoc vai khai niem cot loi duoi day, ban co the xu ly phan lon tinh huong:

**Ban chat cua API la cau noi giao tiep**. No lam mot viec rat don gian: gui yeu cau cua ban ra ngoai, roi mang phan hoi cua mo hinh ve. Ban khong can quan tam dieu gi xay ra phia sau, chi can to chuc dung dinh dang yeu cau.

**SDK la lop dong goi tren API**. Neu API la giao dien raw, thi SDK la mot hop cong cu co san. No xu ly san cac chi tiet phien phuc nhu ky yeu cau, xu ly loi va kiem tra tham so. Trong phat trien hang ngay, uu tien dung SDK thay vi goi API truc tiep se tiet kiem nhieu rac roi.

**Khi doc tai lieu, chi can nhin ky ba thu**: dia chi dich vu (endpoint), thong tin xac thuc (API key) va cach dien tham so goi. Lam ro ba diem nay thi viec chay thong chi con la van de thoi gian.

Phan viec con lai, IDE va cac cong cu phat trien hien dai se ho tro ban hoan thanh. Hay tap trung vao logic nghiep vu cua minh, con viec goi tang thap thi giao cho cac SDK va toolchain truong thanh nay.

# 5. 📚 Bai tap: tich hop nang luc AI dau tien cua ban

<el-card shadow="hover" style="margin: 20px 0; border-radius: 12px;">
  <template #header>
    <div style="font-weight: bold; font-size: 16px;">🚀 Thu thach: tich hop nang luc AI vao workspace cua ban</div>
  </template>

  <p>
    Tham khao prompt va noi dung cua bai nay, hoan thanh mot vong khep kin:
  </p>

  <ul>
    <li>
      <strong>Thuc hanh vong khep kin day du</strong>
      <ul>
        <li>Chon va tich hop mot dich vu AI (LLM / van ban thanh hinh anh / hinh anh thanh hinh anh) → hien thuc tuong tac frontend-backend → tich hop vao prototype cua ban</li>
      </ul>
    </li>
    <li>
      <strong>Chia se ket qua</strong>
      <ul>
        <li>Chup man hinh trang tinh nang cua ban va chia se voi moi nguoi</li>
      </ul>
    </li>
    <li>
      <strong>Cau hoi suy nghi</strong>
      <ul>
        <li>Chuan bi cho phan tiep theo "thuc hanh du an hoan chinh": hay nghi truoc ban se ket hop cac nang luc AI nay nhu the nao va muon tao tinh nang thu vi gi.</li>
      </ul>
    </li>
  </ul>
</el-card>

## Buoc tiep theo

Trong phan tiep theo, chung ta se noi cac nang luc AI rieng le nay lai voi nhau va ket hop voi mot tinh huong kinh doanh thuc te de xay dung mot san pham hoan chinh:

- Noi cac buoc nhu lap ke hoach noi dung, dang san pham va phan tich du lieu thanh mot quy trinh kinh doanh hoan chinh
- Nhung cac nang luc AI hoc trong bai nay, nhu tao copy bang LLM, van ban thanh hinh anh va chinh sua hinh anh, vao cac nut nghiep vu thuc te
- Hien thuc mot "workspace AI cho thuong mai dien tu" that su dung duoc, thay vi mot demo rieng le

<RelatedArticlesSection
  title="Bai viet lien quan"
  description="Lo trinh hoc de xuat tu nang luc AI don diem den quy trinh san pham hoan chinh."
  :items="relatedArticles"
/>
