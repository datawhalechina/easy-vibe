# Từ điển Năng lực AI
Khi công nghệ AI tạo sinh ngày càng được triển khai rộng rãi trong nhiều sản phẩm và tình huống nghiệp vụ khác nhau, một câu hỏi ngày càng trở nên thực tế đặt ra trước mắt mỗi chúng ta: **Rốt cuộc có những năng lực AI nào có thể sử dụng?** Trong một yêu cầu cụ thể, **nên chọn năng lực nào, loại mô hình nào hay sản phẩm nào để đảm nhiệm?**

Đối mặt với sự bối rối này, cách làm trực quan nhất có lẽ là "nước đến chân mới nhảy": **gặp nhu cầu rồi mới tìm kiếm API sản phẩm của các nhà cung cấp dịch vụ đám mây trên thị trường, hoặc tìm mô hình tương ứng, tìm kiếm giải pháp thương mại trên thị trường rồi đối chiếu tài liệu và Demo để xử lý**. Thấy nhu cầu về hình ảnh thì nghĩ đến tạo ảnh, gặp tác vụ văn bản thì tìm đến mô hình lớn, liên quan đến tương tác giọng nói thì nhớ đến ASR và TTS, rồi so sánh giữa vô số API và dịch vụ. Tuy nhiên, việc chắp vá các sản phẩm rời rạc lại với nhau là một chuyện hoàn toàn khác so với việc lập kế hoạch, lựa chọn và kết hợp năng lực AI một cách có hệ thống trong các tình huống cấp doanh nghiệp. Chỉ dựa vào tra cứu tài liệu tạm thời và phán đoán theo kinh nghiệm sẽ dẫn đến hàng loạt thách thức nghiêm trọng như nhận thức về năng lực bị phân mảnh, thiết kế giải pháp tùy tiện và khó tái sử dụng năng lực.

Để giải quyết những điểm đau này, bài viết này ra đời với ý tưởng tổ chức cốt lõi là "Bản đồ toàn cảnh năng lực AI". Trong cẩm nang này, điều chúng tôi muốn làm không phải là chất đống thuật ngữ, mà là giúp bạn nhanh chóng làm rõ ba điều: **"Việc này có thể dùng năng lực AI nào để làm? Nên chọn loại mô hình hoặc sản phẩm nào? Tiếp theo dùng những từ khóa nào để tìm API, dự án hoặc dịch vụ để thử nghiệm?"** Thông qua việc hệ thống hóa từ modality (văn bản, hình ảnh, âm thanh, video, 3D, đa phương thức) đến các tầng kiến trúc (mô hình, truy xuất, Agent, kỹ thuật nền tảng), **chúng ta có thể tìm ra năng lực AI tương ứng, mô hình/sản phẩm tiêu biểu và các ứng dụng phổ biến trong nghiệp vụ thực tế cho từng loại nhu cầu và tình huống điển hình**, giúp đội ngũ xây dựng hệ thống AI với chi phí thử nghiệm thấp hơn, hiệu quả ra quyết định cao hơn và khả năng tái sử dụng mạnh mẽ hơn.

Trong cẩm nang này, chúng tôi sẽ giới thiệu một cách có hệ thống về bản đồ năng lực AI chính thống hiện nay, từ modality đơn lẻ đến hợp nhất đa phương thức, từ mô hình đơn điểm đến khung tổng thể nền tảng và kỹ thuật, kết hợp với các hình thái sản phẩm và tình huống ứng dụng phổ biến, đưa ra tham khảo lựa chọn năng lực hướng đến thực tiễn.

> Do **nội dung tương đối nhiều**, bạn có thể tra cứu cẩm nang khi gặp tình huống không biết nên chọn giải pháp nào trong quá trình thực hành; chúng tôi khuyên bạn **dựa trên hướng ứng dụng cụ thể, để AI tham khảo cẩm nang này và đưa ra gợi ý lựa chọn mô hình cũng như gợi ý gọi API giải pháp có thể tham khảo.**

Nếu bạn chỉ muốn hiểu danh mục tương ứng mà không muốn xem nội dung chi tiết, bạn chỉ cần đọc nội dung đoạn đầu của mỗi chương lớn, ví dụ như nội dung 1.1, 1.2, nhưng không cần đọc nội dung 1.1.1 hay 1.1.2.

**Chúng tôi khuyên bạn chỉ tra cứu phần tương ứng khi cần hoặc chỉ duyệt qua phần mục lục cấp một, nếu có hứng thú thì hãy duyệt toàn văn.**

**Các bản cập nhật sau này sẽ bổ sung địa chỉ dịch vụ API của các mô hình được khuyến nghị nên thử nghiệm trong từng phần chương.**# Bạn Sẽ Học Được Gì Trong Bài Này

- Toàn cảnh năng lực AI: cách phân chia tổng thể các năng lực từ văn bản, hình ảnh, âm thanh, video, 3D đến đa phương thức, Agent, RAG, bảo mật và kỹ thuật nền tảng
- Mô hình và sản phẩm tương ứng với từng năng lực: tìm hiểu các mô hình và dịch vụ tiêu biểu đằng sau những năng lực then chốt như Embedding, OCR, ASR, TTS, VLM, RAG
- Phương pháp ánh xạ năng lực sang kịch bản: nắm vững cách chuyển đổi "danh sách năng lực" thành các ứng dụng cụ thể như nội dung sản phẩm, tìm kiếm hỏi đáp, chăm sóc khách hàng thông minh, vận hành tự động hóa

Sau khi hoàn thành việc học cuốn cẩm nang này, bạn sẽ xây dựng được nhận thức hệ thống hóa ở cấp độ nhập môn về các năng lực AI chủ đạo, không chỉ biết "trên thị trường có những năng lực nào, thường đi kèm với những sản phẩm nào", mà còn hiểu được vị trí và mối quan hệ qua lại của chúng trong kiến trúc tổng thể. Bạn sẽ biết cách nhanh chóng xác định năng lực cần thiết và đưa ra lựa chọn có cơ sở khi đối mặt với các nhu cầu nghiệp vụ cụ thể, từ đó đặt nền tảng vững chắc cho việc xây dựng hệ thống năng lực AI.## Các tham số mô hình được đề cập trong sổ tay

Trước khi đi vào bản đồ năng lực cụ thể, hãy làm rõ một khái niệm thường được nhắc đến nhưng hơi trừu tượng: thế nào được coi là mô hình lớn? Thế nào được coi là mô hình nhỏ?

**Từ góc độ học thuật**, mô hình lớn thường chỉ các mô hình đa năng có số lượng tham số ở mức hàng tỷ, hàng chục tỷ, thậm chí hàng nghìn tỷ, còn mô hình nhỏ là các mô hình chuyên dụng dành cho tác vụ hoặc tình huống cụ thể, với số lượng tham số nhỏ hơn (từ vài chục triệu đến vài trăm triệu).

**Từ góc độ giá cả**, nếu API của một mô hình có chi phí gọi rất rẻ, ví dụ tính theo mỗi lần gọi chỉ vài li, vài xu, hoặc chỉ vài li đến vài xu cho mỗi nghìn token, và không đặc biệt nhấn mạnh là mô hình lớn đa năng, thì thường đó là mô hình nhỏ điển hình (ví dụ: mô hình chuyên dùng cho OCR, ASR, phân loại hình ảnh, kiểm duyệt nội dung), hoặc là phiên bản rút gọn của mô hình lớn với số tham số nhỏ hơn (được nén hoặc chưng cất đặc biệt để đáp ứng yêu cầu đồng thời cao, chi phí thấp). Nếu giá mỗi lần gọi cao hơn đáng kể, chẳng hạn mỗi lần gọi từ vài hào thậm chí 1 tệ trở lên, thì khả năng cao đó là mô hình lớn.

Ngoài ra, nếu tài liệu quảng bá sản phẩm nhấn mạnh rõ ràng việc sử dụng mô hình ngôn ngữ lớn LLM, mô hình lớn đa năng, mô hình lớn đa phương thức, hoặc đề cập đến việc hoàn thành các tác vụ phức tạp từ đầu vào đến đầu ra một cách end-to-end (ví dụ: chatbot end-to-end, truy xuất hỏi đáp end-to-end, tạo video end-to-end), thì thường có thể coi đó là mô hình lớn.

Ngược lại, nếu trọng tâm quảng bá nằm ở một năng lực dọc cụ thể, chẳng hạn như nhận dạng thẻ ngân hàng, nhận dạng hóa đơn, nhận dạng biển số xe, dự đoán tỷ lệ nhấp quảng cáo, chuyển đổi giọng nói thành văn bản, kiểm duyệt an toàn nội dung, thì điều đó cho thấy sản phẩm này nhiều khả năng dựa trên một hoặc một nhóm mô hình nhỏ.

Do đó, trong phần tiếp theo của bài viết, chúng ta có thể đưa ra một quy ước thực tế:

- Mô hình lớn thường chỉ loại mô hình đa năng, có thể hội thoại, có thể lập trình, giá thường cao hơn một chút (bao gồm cả phiên bản đa phương thức của chúng, như GPT-4o, Gemini 1.5 Pro, Claude 3.5 Sonnet, v.v.), có khả năng bao quát hầu hết các tác vụ văn bản, mã nguồn đa năng cũng như các tác vụ đa phương thức về hình ảnh, âm thanh, video;
- Mô hình nhỏ là những mô hình được tinh chỉnh hoặc tùy chỉnh cho một tác vụ cụ thể, thường có giá rẻ hơn, hiệu suất ổn định và dễ kiểm soát hơn, nhưng phạm vi ứng dụng hẹp hơn, đòi hỏi bạn phải chủ động tổ hợp và điều phối trong hệ thống.

Ở đây cũng nên bổ sung một thay đổi quan trọng trong ngành: nhiều năng lực mô hình được đề cập trong sổ tay này, trước năm 2021 thực ra đều do "mô hình nhỏ" đảm nhiệm. Người ta huấn luyện các mô hình chuyên dụng cho các tình huống và dữ liệu cụ thể để đáp ứng nhu cầu chính xác. Còn **ngày nay, tuyệt đại đa số các tình huống và tác vụ đa năng đã có thể giải quyết trực tiếp bằng cách gọi mô hình lớn**.

Từ góc độ theo đuổi tối ưu về **độ chính xác và chi phí**, việc huấn luyện và ứng dụng mô hình nhỏ vẫn có giá trị không thể thay thế; nhưng **đối với người mới bắt đầu, chúng ta hoàn toàn có thể bắt đầu từ việc học cách tìm và gọi API mô hình lớn**, rồi dần dần đi sâu vào các cách chơi nâng cao. Bạn chỉ cần cân bằng giữa chi phí, độ chính xác và độ trễ, rồi quyết định chỗ nào nên dùng mô hình lớn đa năng, chỗ nào tiếp tục giữ lại hoặc đưa vào mô hình nhỏ chuyên dụng.

> **Nhận biết qua một số sản phẩm phổ biến** — các mô hình lớn đa năng về văn bản và đa phương thức thường dùng:
>
> - Dòng OpenAI: GPT-4, GPT-4.1, GPT-4o, GPT-5.1, v.v.
> - Dòng Google: Gemini 1.5 Pro, Gemini 1.5 Flash, v.v.
> - Dòng Anthropic: Claude 3.5 Sonnet, Claude 3.5 Haiku, v.v.
> - Mô hình trong nước: dòng Qwen của Thông Nghĩa Thiên Vấn, dòng ERNIE Bot của Văn Tâm Nhất Ngôn, GLM/Trí Phổ Thanh Ngôn, Tencent Hunyuan, iFlytek Spark, mô hình lớn đứng sau Kimi của Moonshot AI, dòng MiniMax-M3.1-Flash / MiniMax-M3 của MiniMax, v.v.
>
> Các mô hình lớn và dịch vụ thiên về thị giác và video, bao gồm:
>
> - Tạo hình ảnh: DALL·E, Midjourney, Stable Diffusion, SDXL, Flux, v.v.
> - Hiểu thị giác đa phương thức: GPT-4o, GPT-4.1 with Vision, Gemini 1.5 (đa phương thức hình ảnh-văn bản), Claude 3.5 Sonnet Vision, LLaVA, v.v.
> - Tạo video: Sora, Kling, Runway Gen-2, Pika, Luma, Veo, v.v.
>
> Các mô hình lớn hướng giọng nói và âm thanh, bao gồm:
>
> - Nhận dạng giọng nói ASR: dòng Whisper (Whisper, Whisper-large-v3, v.v.), Deepgram, các mô hình lớn ASR end-to-end của các nhà cung cấp đám mây (như iFlytek, Baidu, Volcano Engine, Alibaba, v.v.)
> - Đa phương thức giọng nói và hội thoại giọng nói: GPT-4o (hội thoại giọng nói end-to-end), OpenAI Realtime, khả năng hiểu âm thanh của Gemini 1.5, v.v.
> - TTS / tạo âm thanh và nhạc: OpenAI TTS, ElevenLabs, Suno, Udio, MusicGen, v.v.
>
> Các mô hình tạo và hiểu theo hướng 3D / không gian, bao gồm:
>
> - Text-to-3D và Image-to-3D: DreamFusion, Shap-E, GET3D, Zero-1-to-3, TripoSR, v.v.
> - Họ NeRF / kết xuất thần kinh: Instant-NGP, dòng NeRF, các mô hình liên quan đến Gaussian Splatting, v.v.# 1. Tác vụ văn bản (Text / NLP / LLM)

Trong các năng lực AI, tác vụ văn bản là chức năng cơ bản nhất. Dù mục tiêu cuối cùng của chúng ta là kiểm duyệt nội dung, tìm kiếm và gợi ý, hỏi đáp tri thức, hay trợ lý viết lách, code Copilot, về bản chất đều không thể tránh khỏi một câu hỏi: làm thế nào để máy móc thực sự hiểu được văn bản.## 1.1 Mô hình hóa và biểu diễn ngôn ngữ cơ bản

Hãy bắt đầu từ tầng nền tảng nhất: mô hình hóa và biểu diễn ngôn ngữ cơ bản. Vai trò của nó là giúp máy móc làm quen với ngôn ngữ ở cấp độ thống kê, trên cơ sở đó tìm ra một biểu diễn ma trận vector ổn định cho từ, câu và tài liệu, nhằm phục vụ các tác vụ phân loại, so khớp, trích xuất, sinh văn bản, v.v. Bất kể sau này bạn định làm tác vụ liên quan đến văn bản nào, ít nhiều đều cần trả lời trước một câu hỏi: làm thế nào để biểu diễn đoạn văn này bằng một chuỗi số?

Chúng ta có thể xem xét các nội dung liên quan đến câu hỏi này từ ba góc độ: kịch bản, nguyên lý và mô hình:

- **Kịch bản**
  - **Tìm kiếm và truy xuất**
    - Công cụ tìm kiếm tổng quát: người dùng nhập bất kỳ câu nào, hệ thống trả về các tài liệu có liên quan về mặt ngữ nghĩa, thay vì chỉ khớp chính xác từ khóa.
    - Tìm kiếm nội bộ / Tìm kiếm thương mại điện tử: người dùng dùng mô tả đời thường (ví dụ: "áo sơ mi trắng phù hợp đi làm mùa hè"), hệ thống tìm ra sản phẩm có ý nghĩa tương ứng.
    - Truy xuất kho tài liệu / kho tri thức: trong tài liệu kỹ thuật, quy định pháp luật, kho tri thức doanh nghiệp, nhập một câu là có thể nhận được các mục liên quan.
  - **Đề xuất và xếp hạng**
    - Luồng thông tin / Đề xuất nội dung: dựa trên nội dung người dùng đã xem, đã nhấp gần đây, tự động tìm ra các nội dung tương tự khác để tiếp tục đề xuất, thay vì chỉ dựa vào quy tắc thủ công hoặc nhãn.
    - Đề xuất thương mại điện tử / sản phẩm: dựa trên mô tả sản phẩm người dùng đã xem, đã mua, đã yêu thích, tìm ra sản phẩm có phong cách hoặc công dụng tương tự để đề xuất cá nhân hóa.
    - Mô hình hóa sở thích người dùng: dựa trên tiêu đề người dùng đã xem, từ khóa đã tìm kiếm, v.v., tóm tắt ra một vài hướng sở thích chính để cải thiện hiệu quả đề xuất và xếp hạng.
  - **Trợ lý hỏi đáp**
    - FAQ hỏi đáp: người dùng hỏi cùng một câu hỏi bằng nhiều cách diễn đạt khác nhau ("Làm sao để xuất hóa đơn?" vs "Hóa đơn mở ở đâu?"), hệ thống có thể trỏ đến cùng một câu trả lời.
    - Hỏi đáp kho tri thức / Trợ lý doanh nghiệp: người dùng đặt câu hỏi bằng ngôn ngữ tự nhiên, hệ thống vào tài liệu nội bộ để so khớp theo ngữ nghĩa, tìm ra đoạn văn phù hợp nhất để trả lời.
  - **Hiểu và phân tích văn bản**
    - Phân tích dư luận bình luận: phân loại một lượng lớn bình luận, bài viết thành các nhóm dựa trên "đang nói về điều gì / cảm xúc ra sao".
    - Loại bỏ trùng lặp văn bản / Phát hiện tương tự: dùng để phát hiện bản viết lại, bài viết giả nguyên bản.
    - Phân cụm / Nhóm tài liệu: chia nhiều bài viết, báo cáo thành các nhóm theo mức độ tương đồng nội dung, thuận tiện cho điều hướng, đề xuất hoặc kiểm tra mẫu.
  - **Làm đặc trưng chung cho tác vụ hạ nguồn (tác vụ hạ nguồn là dùng năng lực cơ bản của mô hình để thực hiện các tác vụ xử lý văn bản cụ thể hơn)**
    - Phân loại văn bản: phân loại cảm xúc, nhận diện ý định, nhận diện nội dung rác, v.v. — các mô hình hạ nguồn trực tiếp tái sử dụng biểu diễn của tầng này.
    - Trích xuất thông tin: nhận diện thực thể, trích xuất quan hệ được tinh chỉnh dựa trên biểu diễn từ / câu, thay vì huấn luyện từ đầu.
    - Sinh văn bản: cung cấp đầu vào biểu diễn ngữ nghĩa cho các tác vụ sinh như tóm tắt, viết lại, tiếp tục viết, nâng cao chất lượng và khả năng kiểm soát sinh văn bản.
- **Nguyên lý**
  Học biểu diễn của từ, câu, tài liệu, làm nền tảng cho các tác vụ phức tạp hơn về sau.
  - Mô hình hóa ngôn ngữ
    - Mô hình ngôn ngữ tự hồi quy: dự đoán token tiếp theo (dòng GPT, LLaMA, Qwen, v.v.)
    - Mô hình ngôn ngữ mặt nạ (Masked LM): dự đoán token bị che (BERT, RoBERTa, ERNIE)
  - Biểu diễn từ / câu / đoạn văn
    - Vector từ tĩnh: Word2Vec, GloVe, FastText
    - Biểu diễn ngữ cảnh: BERT embedding, Sentence‑BERT, v.v.
    - Vector cấp tài liệu: dùng cho truy xuất ngữ nghĩa, so khớp tương đồng
- **Mô hình**
  BERT / RoBERTa / ERNIE, dòng GPT, LLaMA / Qwen / Yi và các LLM khác; các mô hình Embedding (dòng OpenAI text‑embedding‑3, bge, E5, SimCSE, v.v.).

### **1.1.1 Mô hình hóa ngôn ngữ: học ngôn ngữ thông qua "đoán từ tiếp theo"**

Bước đầu tiên của tầng này là để mô hình **làm quen với quy luật ngôn ngữ** trên lượng văn bản khổng lồ. Có thể hiểu đơn giản là: đưa cho mô hình vô số "câu đố đoán từ", sau khi nhìn thấy ngữ cảnh của một đoạn văn, yêu cầu nó điền từ (token) hợp lý nhất. Bài tập đủ nhiều, ngữ liệu đủ rộng, mô hình sẽ dần học được: một câu tự nhiên trông như thế nào, những từ nào thường xuất hiện cùng nhau, cách diễn đạt nào nghe có vẻ gượng gạo. Quá trình này gọi là "mô hình hóa ngôn ngữ", bản chất là một **cơ chế huấn luyện đoán từ** thống nhất.

Có hai cách ra đề phổ biến, mỗi cách minh họa bằng một ví dụ đơn giản:

1. **Nối tiếp (tự hồi quy)** : chỉ đưa nội dung phía trước, để mô hình đoán "phía sau sẽ nói gì".
2. Tiền tố đầu vào: `Hôm nay trời mưa, nên tôi`
3. Nhiệm vụ của mô hình: đoán từ tiếp theo, ví dụ như " **mang** (ô)"" **không** (ra ngoài)"" **định** (ở nhà)", v.v., rồi tiếp tục nối tiếp về sau.
   Cách này chủ yếu rèn luyện khả năng nắm bắt **tiếp tục viết, tính mạch lạc, cách diễn đạt phổ biến** của mô hình.
4. **Điền vào chỗ trống (mặt nạ)** : khoét một lỗ ở giữa, để mô hình dùng cả văn bản trước và sau để điền vào chỗ trống.
5. Câu gốc: `Hôm nay trời mưa, nên tôi đã mang ô`
6. Câu huấn luyện: `Hôm nay [MASK], nên tôi đã mang ô`
7. Nhiệm vụ của mô hình: điền `[MASK]` thành từ hợp lý như " **trời mưa** ".
   Ở đây mô hình phải đồng thời nhìn bên trái "Hôm nay" và bên phải "nên tôi đã mang ô", mới có thể quyết định nên điền gì, điều này có lợi hơn cho việc học **ngữ nghĩa toàn câu**.

Thông qua việc làm đi làm lại hai loại "câu đố đoán từ" này trên kho ngữ liệu khổng lồ, mô hình sẽ dần tích lũy được **cảm nhận ngôn ngữ và tri thức thống kê** về ngôn ngữ. Trên cơ sở đó, bước tiếp theo chúng ta sẽ biến năng lực này một cách tường minh thành **biểu diễn vector của từ, câu và tài liệu**, làm nền tảng cho các tác vụ truy xuất, đề xuất và hỏi đáp về sau.

### 1.1.2 Biểu diễn từ, câu và tài liệu: ánh xạ ký hiệu rời rạc vào không gian ngữ nghĩa

Phương pháp sớm nhất để xây dựng vector văn bản là **vector từ tĩnh**: gán cho mỗi từ một vector cố định, sau khi huấn luyện không thay đổi theo ngữ cảnh, trực quan, đơn giản, nhưng **không thể phân biệt được ý nghĩa của từ đa nghĩa trong các ngữ cảnh khác nhau.** Để giải quyết vấn đề này, sau đó đã xuất hiện phương pháp biểu diễn động dựa trên ngữ cảnh: cùng một từ trong các câu khác nhau sẽ tạo ra các vector khác nhau, hoàn toàn do ngữ cảnh của nó quyết định. Ví dụ "táo" trong "Apple vừa ra mắt điện thoại mới" sẽ gần với hướng ngữ nghĩa "công ty công nghệ", trong khi trong "táo giàu vitamin" lại gần với khái niệm "trái cây".

Cơ chế này không chỉ nâng cao khả năng biểu đạt ở cấp độ từ, mà còn mở đường cho việc vector hóa câu và tài liệu. Đối với câu, có thể tạo vector câu; đối với tài liệu, có thể mã hóa toàn bộ đầu vào (nếu độ dài cho phép), hoặc mã hóa theo đoạn rồi tổng hợp thành một vector toàn cục thông qua cơ chế attention, pooling phân cấp, học tương phản, v.v. Các mô hình embedding chuyên dụng trong những năm gần đây (như bge, E5, dòng text-embedding) chính là xoay quanh mục tiêu "làm cho các văn bản có ngữ nghĩa gần nhau trở nên gần nhau hơn trong không gian vector" để liên tục tối ưu, đặc biệt thể hiện xuất sắc trong các tác vụ truy xuất ngữ nghĩa, so khớp tương đồng.

Quy trình từ mô hình hóa ngữ cảnh đến sinh vector câu/tài liệu này đã trở thành hạ tầng cốt lõi đằng sau các hệ thống tìm kiếm, đề xuất, hỏi đáp, hãy quay lại các kịch bản đã đề cập ở trên:

- Kịch bản tìm kiếm truy xuất (tìm kiếm tổng quát, tìm kiếm thương mại điện tử, truy xuất kho tri thức) đều cần mã hóa đầu vào của người dùng và tài liệu ứng viên thành vector, sau đó thực hiện so khớp tương đồng trong không gian vector, tìm ra kết quả có ngữ nghĩa gần nhất, thay vì chỉ dựa vào khớp chính xác từ khóa.
- Kịch bản đề xuất xếp hạng (đề xuất luồng thông tin, đề xuất sản phẩm, mô hình hóa sở thích người dùng) cần chuyển nội dung tương ứng với hành vi lịch sử của người dùng thành vector, sau đó tìm nội dung mới có vector gần để đề xuất cho người dùng, đạt được hiệu quả cá nhân hóa "đã xem A thì đề xuất B".
- Kịch bản trợ lý hỏi đáp (FAQ hỏi đáp, hỏi đáp kho tri thức) cần mã hóa câu hỏi của người dùng và câu hỏi hoặc đoạn văn trong kho tri thức thành vector, thông qua độ tương đồng vector để tìm ra câu trả lời khớp nhất.
- Kịch bản hiểu và phân tích văn bản (dư luận bình luận, loại bỏ trùng lặp, phân cụm) cần chuyển từng đoạn văn bản thành vector trước, rồi dựa trên vector để thực hiện phân cụm, tính toán độ tương đồng hoặc phân loại.
- Kịch bản tác vụ hạ nguồn (phân loại văn bản, trích xuất thông tin, sinh văn bản) thì trực tiếp dùng biểu diễn vector của tầng này làm đặc trưng đầu vào, đưa vào bộ phân loại, bộ trích xuất hoặc bộ sinh phía sau, tránh phải học ngữ nghĩa từ đầu.

Về mặt kỹ thuật, cách làm phổ biến là đóng gói thành "dịch vụ vector văn bản" thống nhất: đầu vào là một đoạn văn bản bất kỳ, đầu ra là một chuỗi vector có số chiều cố định, dùng chung cho nhiều hệ thống như tìm kiếm, đề xuất, hỏi đáp. Ở cấp độ sản phẩm, năng lực của tầng này chủ yếu thể hiện ở: truy vấn ngữ nghĩa trong tìm kiếm và đề xuất (không còn chỉ dựa vào từ khóa, mà thông qua độ tương đồng vector để truy vấn nội dung "cách nói khác nhưng ý nghĩa tương tự"), cũng như dịch vụ embedding / truy xuất vector thống nhất hướng đến kho tri thức doanh nghiệp, FAQ, kho tình huống.## 1.2 Phân loại văn bản và so khớp văn bản (Classification & Matching)

Trong phần trước, chúng ta đã tìm ra "tọa độ" trong không gian ngữ nghĩa cho mỗi đoạn văn bản thông qua mô hình hóa và biểu diễn ngôn ngữ cơ bản. Nhưng chỉ có tọa độ thôi thì chưa đủ, vấn đề mà doanh nghiệp thực sự quan tâm thường là: đoạn văn bản này thuộc về danh mục nào? Nó có đang nói về cùng một vấn đề với đoạn văn bản kia không? Hai câu này về mặt logic là hỗ trợ lẫn nhau hay mâu thuẫn với nhau? Bạn có thể hiểu nó như sau: sử dụng hai khả năng phân loại và so khớp để chuyển đổi các biểu diễn vector cơ bản thành các nhãn và tín hiệu liên quan có thể trực tiếp thúc đẩy quyết định kinh doanh. Chúng ta vẫn sẽ xem xét tầng này từ ba góc độ: kịch bản, nguyên lý và mô hình:

- **Kịch bản**
  - Hiểu nội dung và kiểm duyệt: gán các nhãn chủ đề, cảm xúc, rủi ro cho bình luận, bài đăng, bài viết để phục vụ kiểm duyệt, đề xuất, phân tích thống kê.
  - Đề xuất và xếp hạng: dựa trên mức độ khớp giữa "nhãn sở thích người dùng" và "nhãn nội dung" để quyết định hiển thị nội dung gì, xếp ở vị trí nào.
  - Tìm kiếm và FAQ: người dùng nhập tùy ý một câu hỏi bằng ngôn ngữ tự nhiên, hệ thống có thể tự động tìm ra cặp câu hỏi-trả lời hoặc đoạn tài liệu liên quan nhất.
  - Nhận diện nội dung tương tự: tìm các mục có "nội dung gần giống" trong khối lượng lớn văn bản, dùng để loại trùng lặp, gộp thống kê, đề xuất "nội dung liên quan".
  - Đánh giá quan hệ logic: xác định hai câu hỗ trợ lẫn nhau, mâu thuẫn với nhau hay không liên quan, dùng cho kiểm tra thực tế, kiểm tra tính nhất quán trong hội thoại nhiều lượt, v.v.
- **Nguyên lý**
  Dựa trên biểu diễn ngữ nghĩa, thực hiện đánh giá tổng thể cho toàn bộ đoạn văn bản hoặc cặp văn bản:
  - Phân loại văn bản: gán nhãn cho một đoạn văn bản đơn lẻ (như cảm xúc, chủ đề, loại rủi ro, v.v.);
  - So khớp văn bản: đánh giá độ tương đồng, mức độ liên quan giữa hai đoạn văn bản, hoặc "câu hỏi – câu trả lời" có khớp nhau hay không;
- **Mô hình**
  Dựa trên encoder tiền huấn luyện, gắn thêm cấu trúc phân loại / so khớp đơn giản:
  - Phân loại văn bản đơn: BERT / RoBERTa / DeBERTa + tầng phân loại fully connected;
  - So khớp văn bản: Sentence‑BERT, SimCSE, tháp đôi (Bi‑Encoder), mã hóa chéo (Cross‑Encoder);
  - Đánh giá phức tạp: tinh chỉnh theo hướng dẫn trên LLM, để mô hình trực tiếp xuất ra nhãn hoặc quan hệ logic.

### 1.2.1 Phân loại văn bản: từ "hiểu nội dung" đến "định tính nội dung"

Dựa vào biểu diễn ngữ nghĩa từ tầng trước, chúng ta có thể rất tự nhiên gắn một đầu phân loại đơn giản lên trên, thông qua một lượng nhỏ dữ liệu gán nhãn, giúp mô hình học cách trả lời câu hỏi: **"Đoạn văn bản này thuộc về danh mục nào?"** .

Điển hình nhất là **phân loại cảm xúc** . Một đánh giá của người dùng có thể là khen ngợi, phàn nàn, hoặc chỉ đơn thuần là trình bày sự thật. Sau khi mô hình nhận được biểu diễn vector của câu đó, chỉ cần gắn thêm một tầng phân loại softmax là có thể xuất ra xác suất "tích cực / tiêu cực / trung lập". Những khả năng này đã rất trưởng thành trong các kịch bản như thương mại điện tử, mạng xã hội, chợ ứng dụng.

Một nhóm lớn khác là **phân loại chủ đề / ngành nghề** . Trong đề xuất tin tức, chúng ta muốn biết một bài viết thuộc về thể thao, tài chính hay giải trí; trong hệ thống chăm sóc khách hàng / ticket nội bộ của doanh nghiệp, điều quan tâm hơn là đây là tư vấn sản phẩm, lỗi chức năng hay khiếu nại góp ý. Những nhãn này vừa giúp nội dung được định tuyến chính xác hơn đến quy trình phù hợp, vừa có thể làm đặc trưng quan trọng trong giai đoạn xếp hạng đề xuất.

Tiến thêm một bước, **phân loại rủi ro / tuân thủ** liên quan trực tiếp đến an toàn nền tảng. Chúng ta sẽ thiết lập các mô hình phân loại chuyên biệt cho các danh mục như dẫn dụ quảng cáo, chửi bới công kích, nhạy cảm chính trị, dung tục khiêu dâm, phối hợp với kiểm duyệt thủ công để chặn hoặc giảm trọng số đối với nội dung rủi ro cao. Có thể nói, cửa ngăn đầu tiên của hầu hết các chiến lược an toàn nội dung đều được cấu thành bởi các bộ phân loại kiểu này.

Có thể thấy, đến tầng này, chúng ta đã có thể chuyển đổi "biểu diễn ngữ nghĩa trừu tượng" thành nhiều nhãn khả dụng cho nghiệp vụ. Tiếp theo, chúng ta sẽ thảo luận về: khi các văn bản có mối quan hệ với nhau, chúng ta thực hiện **so khớp và suy luận** như thế nào.

### 1.2.2 So khớp văn bản: "tìm câu phù hợp nhất" cho một câu

Khác với việc phân loại "định tính từng văn bản đơn lẻ", **so khớp văn bản** tập trung vào "mức độ liên quan giữa hai đoạn văn bản". Trong nhiều sản phẩm, đây thường là mắt xích then chốt để hiện thực hóa "trí tuệ": người dùng nói một câu, hệ thống có thể tìm ra phản hồi phù hợp nhất trong kho tri thức hay không, hoàn toàn phụ thuộc vào chất lượng so khớp.

Cơ bản nhất là **tính toán độ tương đồng ngữ nghĩa** . Chúng ta sẽ dùng mô hình embedding của tầng trước để mã hóa hai câu thành vector, sau đó thông qua độ tương đồng cosine, tích vô hướng để đánh giá khoảng cách của chúng trong không gian ngữ nghĩa. Các mô hình như SimCSE, Sentence‑BERT được huấn luyện theo phương pháp học tương phản, chuyên biệt để kéo gần các "cặp câu tương tự" và đẩy xa các "cặp câu không tương tự".

Trên nền tảng đó, **phát hiện diễn đạt lại** và **phát hiện đạo văn** chỉ là những tác vụ so khớp trong các kịch bản ứng dụng cụ thể. Cái trước dùng để loại trùng lặp nội dung, tránh việc nền tảng tràn ngập các biểu đạt lặp lại; cái sau thì trong các kịch bản như giáo dục, cộng đồng tri thức, được dùng để nhận diện các câu trả lời hoặc bài viết có độ tương đồng cao. Về mặt kỹ thuật, bản chất của chúng đều là phân loại nhị phân hoặc xếp hạng dựa trên độ tương đồng văn bản.

Một ứng dụng hạ nguồn rất quan trọng là **so khớp hỏi đáp** . Khi người dùng đưa ra một câu hỏi bằng ngôn ngữ tự nhiên, chúng ta không trực tiếp dùng từ khóa để khớp với FAQ, mà thông qua vector ngữ nghĩa để truy xuất trước, rồi dùng mô hình so khớp tinh vi hơn (như Cross‑Encoder) để xếp hạng lại các ứng viên, chọn ra mục có khả năng tương ứng cao nhất. Chuỗi xử lý này tạo thành nền tảng của robot FAQ và hệ thống hỏi đáp tài liệu.

Ở tầng này, chúng ta đã có khả năng phân loại và đánh giá quan hệ cho "toàn bộ đoạn văn bản". Nhưng trong nhiều kịch bản, doanh nghiệp không hài lòng dừng ở đó, mà tiến thêm một bước mong muốn biết: **đoạn văn bản này đề cập cụ thể đến những thực thể nào, đã xảy ra những sự kiện gì** . Điều này tự nhiên dẫn đến chủ đề của phần tiếp theo — **gán nhãn chuỗi và trích xuất thông tin** .## 1.3 Gán nhãn chuỗi và Trích xuất thông tin（Sequence Labeling & Information Extraction）

Sau khi hoàn thành việc phân loại và so khớp văn bản ở mức tổng thể, chúng ta thường gặp phải một nhu cầu chi tiết hơn: không chỉ cần biết "bài viết này nói về điều gì, mức độ rủi ro ra sao", mà còn cần biết thêm "nó đề cập cụ thể đến ai, ở đâu, khi nào, số tiền là bao nhiêu". Phần này chính là bước tiến then chốt hướng tới "cấu trúc hóa ở mức độ chi tiết", xây dựng trên nền tảng đánh giá tổng thể. Bạn có thể hiểu nó như sau: khi đã biết "nên xem loại văn bản nào và nó nói đại khái về điều gì", chúng ta sẽ đào sâu vào bên trong văn bản để khai thác các thực thể, mối quan hệ, sự kiện và các trường dữ liệu đa dạng, giúp văn bản phi cấu trúc có thể được hệ thống nghiệp vụ tiêu thụ trực tiếp. Chúng ta cũng sẽ xem xét lớp này từ bốn khía cạnh: mục tiêu, nguyên lý, mô hình và sản phẩm:

- **Kịch bản**
  - Cấu trúc hóa văn bản ngành: từ các tài liệu như hợp đồng, báo cáo, thông báo, hồ sơ bệnh án, chính sách, trích xuất các trường quan trọng như tên người, tổ chức, số tiền, thời gian, điều khoản để nhập kho và truy xuất.
  - Đồ thị tri thức và mạng quan hệ: từ tin tức, bài báo, hỏi đáp, nhận diện thực thể và mối quan hệ của chúng, xây dựng đồ thị "ai có quan hệ gì với ai" để phục vụ tìm kiếm, đề xuất và phân tích.
  - Xử lý chứng từ và hóa đơn: tự động trích xuất tiêu đề, mã số thuế, số tiền, ngày tháng từ hóa đơn, bảng đối chiếu, phiếu thanh toán, giảm thiểu nhập liệu thủ công.
  - Phân tích dư luận và sự kiện: từ khối lượng văn bản khổng lồ trích xuất "ai đã làm gì, khi nào, ở đâu" để phục vụ theo dõi sự kiện, cảnh báo rủi ro và báo cáo thống kê.
  - Cấu trúc hóa nhật ký và phiếu yêu cầu: trích xuất thông tin quan trọng từ các văn bản phi cấu trúc như hội thoại chăm sóc khách hàng, phiếu yêu cầu, nhật ký hệ thống, giúp thống kê, giám sát và xử lý tự động.
- **Nguyên lý**
  Ở cấp độ token / cụm từ, thực hiện gán nhãn chi tiết và cấu trúc hóa văn bản:
  - Gán nhãn chuỗi: gán nhãn cho từng token (như tên người, địa danh, tổ chức, sản phẩm, v.v.), thực hiện nhận diện thực thể có tên, gán nhãn từ loại, phân đoạn cụm từ, v.v.;
  - Trích xuất quan hệ và sự kiện: trên nền tảng thực thể, nhận diện quan hệ "thực thể-thực thể" và cấu trúc sự kiện "ai đã làm gì, khi nào, ở đâu";
  - Trích xuất trường nghiệp vụ: xoay quanh schema nghiệp vụ cụ thể (như trường hợp đồng, trường chứng từ), chuyển đổi tài liệu dài thành bản ghi key-value hoặc bảng chuẩn hóa.
- **Mô hình**
  Trên nền tảng biểu diễn tiền huấn luyện, hoàn thành trích xuất thông tin thông qua các cấu trúc như gán nhãn chuỗi hoặc trích xuất span:
  - Mô hình gán nhãn chuỗi: BiLSTM-CRF, BERT + CRF / Softmax, v.v.;
  - Trích xuất dựa trên Span: dự đoán trực tiếp vị trí bắt đầu và kết thúc của đoạn thực thể / quan hệ;
  - Trích xuất cấp tài liệu: các mô hình DocIE kết hợp bố cục và trình bày;
  - Trích xuất dựa trên LLM: thông qua Prompt / Few-shot, để mô hình lớn trích xuất các trường cần thiết theo định dạng chỉ định.

### 1.3.1 Gán nhãn chuỗi: dán "nhãn" ngữ nghĩa cho từng token và cụm từ

Ở giai đoạn phân loại văn bản, chúng ta chỉ quan tâm toàn bộ đoạn văn thuộc loại nào; còn ở giai đoạn gán nhãn chuỗi, chúng ta cần đánh dấu từng token, từng đoạn cụm từ trong văn bản. Nhiệm vụ điển hình nhất là Nhận diện thực thể có tên (NER): nhận diện các thực thể thuộc loại cụ thể như tên người, tổ chức, địa danh, sản phẩm, bệnh tật.

- Ví dụ, trong câu "Trương Tam gia nhập một công ty công nghệ nào đó tại Bắc Kinh", gán nhãn "Trương Tam" là tên người, "Bắc Kinh" là địa danh, "một công ty công nghệ nào đó" là tổ chức.

Về cách tiếp cận mô hình hóa, phương pháp truyền thống là sử dụng các cấu trúc gán nhãn chuỗi như BiLSTM + CRF, về sau chủ yếu áp dụng BERT + CRF hoặc BERT + Softmax, tận dụng khả năng biểu diễn ngữ cảnh của encoder tiền huấn luyện để đánh giá nhãn cho từng token (như B-ORG, I-ORG, O, v.v.). Trong thực tế, mô hình NER thường là bước "tiền xử lý" đầu tiên cho các tác vụ đồ thị tri thức và trích xuất quan hệ tiếp theo.

Ngoài NER, gán nhãn từ loại và phân đoạn cụm từ cũng là các tác vụ gán nhãn chuỗi điển hình. Chúng chủ yếu phục vụ cho phân tích ngôn ngữ ở tầng thấp, cung cấp cấu trúc nền tảng cho các tác vụ ngữ pháp / ngữ nghĩa phức tạp hơn ở phía sau.

- Ví dụ, với "nhanh chóng nâng cao hiệu suất mô hình", gán nhãn "nhanh chóng" là phó từ, "nâng cao" là động từ, "hiệu suất" là danh từ để phục vụ phân tích hạ nguồn.

### 1.3.2 Trích xuất quan hệ và sự kiện: nối các "điểm" thành "đường" và "câu chuyện"

Khi đã nhận diện được các thực thể trong văn bản thông qua gán nhãn chuỗi, một câu hỏi tự nhiên được đặt ra là: các thực thể này có mối quan hệ gì với nhau và chúng cùng nhau tạo nên loại sự kiện nào?

Trích xuất quan hệ tập trung vào "cặp thực thể + loại quan hệ". Ví dụ, trong câu "Trương Tam gia nhập một công ty công nghệ nào đó với vai trò CTO vào năm 2024", chúng ta không chỉ cần nhận diện hai thực thể "Trương Tam" và "một công ty công nghệ nào đó", mà còn phải trích xuất mối quan hệ "làm việc tại" giữa chúng.

- Nói một cách đơn giản, đó là gán nhãn quan hệ như "công tác" lên cặp thực thể "Trương Tam – một công ty công nghệ nào đó".

Trên nền tảng quan hệ, trích xuất sự kiện cố gắng tái tạo lại "ai đã làm gì, khi nào, ở đâu". Lấy một bản tin làm ví dụ, một mẫu sự kiện tiêu chuẩn có thể bao gồm: loại sự kiện (mua lại, hợp tác, tai nạn), thời gian, địa điểm, bên tham gia, số tiền, hậu quả và nhiều slot khác. Mô hình trích xuất sự kiện cần tự động điền các slot này từ văn bản dài, từ đó xây dựng "bảng sự kiện" có thể được truy xuất, thống kê và suy luận.

- Ví dụ, từ "một công ty nào đó mua lại một công ty khác với giá 500 triệu tệ", trích xuất: loại sự kiện = mua lại, số tiền = 500 triệu tệ, bên tham gia = hai công ty.

Về phương pháp mô hình hóa, ngoài cách trích xuất kiểu gán nhãn chuỗi truyền thống, chúng ta còn áp dụng Span-based IE (dự đoán trực tiếp vị trí bắt đầu và kết thúc của span thực thể / quan hệ) cũng như Prompt-based IE và Few-shot extraction dựa trên LLM đã nổi lên trong những năm gần đây. Ưu điểm của phương pháp sau là có thể nhanh chóng thích ứng với schema mới thông qua gợi ý bằng ngôn ngữ tự nhiên, giảm đáng kể chi phí gán nhãn lại và huấn luyện lại.

Từ góc độ kỹ thuật, một hệ thống trích xuất hoàn thiện thường hình thành một pipeline:

- Tầng trên là NER / gán nhãn chuỗi nhận diện thực thể;
- Tầng giữa mô hình hóa cấu trúc quan hệ và sự kiện;
- Tầng dưới ghi kết quả vào cơ sở dữ liệu hoặc đồ thị tri thức để phục vụ các hệ thống tìm kiếm, phân tích và kiểm soát rủi ro.## 1.4 Tạo và Chỉnh sửa Văn bản (Text Generation & Editing)

Trong các phần trước, chúng ta đã lần lượt xây dựng chuỗi hiểu "biểu diễn → phân loại khớp → gán nhãn chuỗi và trích xuất": mô hình không chỉ có thể ánh xạ văn bản vào không gian ngữ nghĩa, mà còn có thể đưa ra phán đoán cho toàn bộ đoạn văn bản và trích xuất thông tin có cấu trúc từ đó. Phần này sẽ thực hiện việc "đảo ngược" chuỗi hiểu đó: trên cơ sở hiểu đầy đủ, để mô hình chủ động sản sinh, viết lại, nén và trau chuốt văn bản. Bạn có thể hiểu điều này như sau: thực hiện "mã hóa ngược" trong không gian ngữ nghĩa, biến biểu diễn nội bộ trở lại thành đầu ra ngôn ngữ tự nhiên chất lượng cao, đây là tầng gần gũi nhất với cảm nhận của người dùng trong toàn bộ chuỗi năng lực của modal văn bản. Chúng ta vẫn phân tích từ bốn chiều: mục tiêu, nguyên lý, mô hình và sản phẩm:

- **Kịch bản**
  - Viết lách hàng ngày và văn phòng: tạo email, thông báo, bản thảo kế hoạch, hoặc mở rộng, viết lại và trau chuốt văn bản hiện có.
  - Quản lý tri thức và tóm tắt: tự động tóm tắt tài liệu dài, báo cáo, biên bản cuộc họp, giúp nhanh chóng nắm bắt điểm chính.
  - Dịch vụ khách hàng và Hỏi đáp: dựa trên câu hỏi của người dùng và tài liệu truy xuất được, tự động tạo câu trả lời có cấu trúc rõ ràng, giọng điệu nhất quán.
  - Tiếp thị và nội dung sáng tạo: tạo bản sao quảng cáo, bài đăng mạng xã hội, giới thiệu sự kiện, kịch bản, v.v.
  - Kịch bản đa ngôn ngữ: trên cơ sở giữ nguyên ý nghĩa gốc, hoàn thành dịch thuật, viết lại bản địa hóa, thích ứng với các ngôn ngữ và ngữ cảnh khác nhau.
- **Nguyên lý**
  Trên cơ sở mô hình hóa ngôn ngữ, thực hiện "tạo từ đầu" và "chỉnh sửa dựa trên nội dung có sẵn" đối với văn bản:
  - Tạo tự do: dựa trên ý định, từ khóa gợi ý hoặc dàn ý, tạo một đoạn văn bản hoàn chỉnh từ đầu;
  - Viết lại có kiểm soát: trong điều kiện giữ nguyên thông tin cốt lõi, điều chỉnh phong cách, độ dài, cấu trúc (như tóm tắt, mở rộng, chuyển đổi phong cách);
  - Sửa lỗi và trau chuốt: sửa lỗi chính tả, vấn đề ngữ pháp, tối ưu hóa thứ tự diễn đạt và cấu trúc logic.
- **Mô hình**
  Chủ yếu là các mô hình sinh được huấn luyện trước quy mô lớn + tinh chỉnh theo chỉ dẫn:
  - LLM tinh chỉnh theo chỉ dẫn: dòng GPT, LLaMA / Qwen / GLM, v.v., dùng cho tạo và chỉnh sửa tổng quát;
  - Mô hình Seq2Seq: T5, BART, mT5, v.v., dùng cho các tác vụ như tóm tắt, dịch thuật, chuyển đổi định dạng;
  - Căn chỉnh và an toàn: thông qua các phương pháp như RLHF / RLAIF, làm cho nội dung được tạo ra phù hợp hơn với chỉ dẫn và yêu cầu an toàn.

Do phần này về cơ bản tương đương với kỹ thuật prompt, nên không trình bày thêm nhiều, bạn có thể tự tham khảo phần hướng dẫn về kỹ thuật prompt.# 2. Hình ảnh (Image / Vision)

Trong năng lực AI, hình ảnh đảm nhiệm vai trò "hiểu thế giới qua thị giác". Dù mục tiêu cuối cùng là giám sát an ninh, lái xe tự động, hiệu ứng video ngắn, chỉnh sửa ảnh thông minh cho thương mại điện tử, trả lời câu hỏi đa phương thức hay vẽ tranh bằng AI, về bản chất tất cả đều xoay quanh một lộ trình: bắt đầu từ các điểm ảnh thô, từng bước đạt được khả năng hiểu có cấu trúc và tạo sinh có kiểm soát đối với nội dung hình ảnh.## 2.1 Thị giác cấp thấp (Low‑Level Vision)

Trong phần trước, chúng ta đã giới thiệu tổng quan về vai trò của modal thị giác trong hệ thống đa phương thức, cũng như cách nó kết nối với ngôn ngữ và giọng nói. Nhưng trước khi thực sự bước vào các "tác vụ ngữ nghĩa cấp cao" như phát hiện đối tượng, hiểu hình ảnh và trả lời câu hỏi trực quan, còn có một lớp năng lực nền tảng thường bị bỏ qua nhưng lại vô cùng quan trọng — thị giác cấp thấp. Bạn có thể hiểu nó như sau: trước khi "hiểu trong ảnh có gì", hệ thống cần giải quyết hai câu hỏi — "chất lượng bản thân bức ảnh này thế nào" và "có những cấu trúc cục bộ ổn định nào có thể được tầng trên tái sử dụng" — sử dụng một lớp khôi phục, tăng cường và trích xuất cấu trúc chung để chuyển đổi pixel thô thành biểu diễn hình ảnh sạch hơn và ổn định hơn.

Từ góc độ kỹ thuật, thị giác cấp thấp không chỉ ảnh hưởng trực tiếp đến "trải nghiệm chất lượng hình ảnh" mà người dùng nhìn thấy bằng mắt thường, mà còn quyết định phân phối đầu vào cho các tác vụ tầng trên như phát hiện, nhận dạng và phân đoạn có lành mạnh hay không. Nếu lớp này làm không tốt, tất cả các mô hình phía sau sẽ phải "gồng mình" trong môi trường nhiễu cao, méo nặng và ánh sáng cực đoan; ngược lại, nếu ở lớp này hình ảnh được sửa tốt nhất có thể và thông tin cấu trúc được tinh lọc tốt, các tác vụ cấp cao có thể phát huy năng lực trên một nền tảng thân thiện hơn. Dưới đây chúng ta cùng xem xét lớp này từ ba góc độ: kịch bản, nguyên lý và mô hình:

- **Kịch bản**
  - Máy ảnh và thiết bị chụp: tự động khử nhiễu, HDR, chế độ ban đêm, chống rung trên điện thoại/máy ảnh, kết hợp đa khung hình để nâng cao chi tiết và dải động.
  - Nền tảng nội dung và video ngắn: tăng cường chất lượng một chạm cho ảnh/video tải lên, khử artifact nén, tăng độ rõ nét và độ tương phản, cải thiện cảm nhận thị giác chủ quan.
  - Phục hồi ảnh cũ và tài liệu: khử nhiễu, tô màu, siêu phân giải cho ảnh cũ; tự động căn chỉnh và tăng cường hóa đơn, hợp đồng, trang sách bị chụp nghiêng, chụp tối để thuận tiện cho OCR.
  - Giám sát và an ninh: khử nhiễu, khử sương mù, chống hạt mưa, nâng cao độ phân giải cho hình ảnh giám sát ánh sáng yếu, tạo nền tảng cho nhận dạng khuôn mặt/biển số xe phía sau.
  - AR/VR và tái tạo 3D: cung cấp điểm góc, cạnh và bộ mô tả cục bộ ổn định cho SLAM, ghép ảnh toàn cảnh, tái tạo 3D, đảm bảo độ bền vững của theo dõi và căn chỉnh.
- **Nguyên lý**
  Xoay quanh hai mục tiêu cốt lõi là "chất lượng hình ảnh" và "cấu trúc cục bộ", tiến hành mô hình hóa vật lý và thống kê cho thông tin cấp pixel:
  - Khôi phục và tăng cường hình ảnh: giả định ảnh quan sát được là ảnh lý tưởng sau khi trải qua các suy giảm như nhiễu, nhân mờ, nén và phi tuyến tính của hệ thống chụp ảnh, trong giả định này tiến hành khử nhiễu, khử mờ, khử artifact nén, tăng cường ánh sáng yếu và tái tạo siêu phân giải, khiến đầu ra gần hơn với hình ảnh chụp cảnh thực, đồng thời phù hợp với thói quen cảm nhận của mắt người.
  - Trích xuất đặc trưng cấu trúc: không đưa vào nhãn ngữ nghĩa cụ thể, từ gradient pixel và thống kê kết cấu trích xuất các đặc trưng như cạnh, điểm góc, kết cấu cục bộ, vùng nổi bật, cung cấp "khung xương hình học" cho các tác vụ phát hiện, căn chỉnh, theo dõi và phân đoạn phía sau.
  - Tiền xử lý hình học và ánh sáng: dựa trên mô hình camera và các manh mối hình học đơn giản (đường thẳng, điểm biến mất, tính đối xứng, v.v.) ước tính mối quan hệ méo và phối cảnh, thông qua các thao tác như khử méo, căn chỉnh, chuẩn hóa độ tương phản và ánh sáng, đưa hình ảnh thô về một không gian đầu vào chuẩn hơn và ổn định hơn.
- **Mô hình**
  Kết hợp các phương pháp xử lý ảnh cổ điển và mô hình học sâu, cân bằng giữa hiệu quả và hiệu suất:
  - Xử lý ảnh truyền thống: lọc song phương, non-local means, lọc có hướng dẫn, Retinex, cân bằng histogram, phát hiện cạnh Canny/LoG, điểm góc Harris/FAST, bộ mô tả SIFT/SURF/ORB, biến đổi Hough, hiệu chuẩn camera và hiệu chỉnh hình học, v.v.
  - Mô hình khôi phục và tăng cường sâu: các mô hình khử nhiễu, khử mờ, siêu phân giải, khử mưa/khử sương mù/khử artifact nén dựa trên CNN hoặc Vision Transformer (như EDSR, RCAN, SwinIR, ESRGAN, v.v.), cùng các mạng tăng cường đa khung hình/video, học ánh xạ từ ảnh suy giảm sang ảnh chất lượng cao theo cách end-to-end, hoặc sử dụng các mô hình chỉnh sửa ảnh hiện đại như Jimeng và mô hình chỉnh sửa Qwen.

### 2.1.1 Khôi phục và tăng cường hình ảnh: từ "nhìn thấy" đến "nhìn rõ"

Trong thị giác cấp thấp, khôi phục và tăng cường hình ảnh trước tiên đối mặt với các loại suy giảm khác nhau: nhiễu, mờ, méo nén, ánh sáng yếu, dải động không đủ, v.v. Hình ảnh thô trong nhiều tình huống thực tế không "sạch": cảnh đêm và ánh sáng yếu trong nhà khiến khung hình đầy hạt và đốm màu, ảnh chụp nhanh và giám sát thường bị nhòe do chuyển động hoặc lấy nét không chính xác, nén video mang lại nhiễu dạng khối từng mảng. Mục tiêu của khôi phục và tăng cường là, trong điều kiện không thay đổi nội dung ngữ nghĩa của hình ảnh, khôi phục tối đa chi tiết rõ nét và cảm nhận tự nhiên, biến đầu vào "mờ, tối, bẩn" thành "rõ ràng, sáng sủa, dễ chịu".

Các tác vụ điển hình bao gồm khử nhiễu, khử mờ, tăng cường ánh sáng yếu và siêu phân giải. Khử nhiễu và khử mờ cần cân bằng giữa kết cấu cục bộ và cấu trúc tổng thể: vừa phải triệt tiêu nhiễu tần số cao, giải chập ảnh hưởng của nhân mờ, vừa không được làm phẳng mất chi tiết thật; tăng cường ánh sáng yếu cần trong khi nâng cao độ sáng và độ tương phản, tránh để nhiễu vùng tối bị kéo lên cùng lúc, đồng thời hiệu chỉnh lệch màu và kiềm chế vùng quá sáng; siêu phân giải tập trung vào việc bổ sung thông tin tần số cao hợp lý khi phóng to, khiến hình ảnh phóng to không trông "nhòe" và "cảm giác nhựa nặng nề", cũng không "bịa đặt" chi tiết quá mức. Các phương pháp hiện đại phần lớn sử dụng mạng sâu (CNN hoặc Vision Transformer), học ánh xạ từ ảnh quan sát y sang ảnh lý tưởng x trên lượng lớn dữ liệu cặp "suy giảm–rõ nét", đồng thời sử dụng mục tiêu kết hợp bao gồm sai số pixel, tổn thất cảm nhận và tổn thất đối kháng, đạt được sự cân bằng giữa "chỉ số đẹp" và "mắt người thấy đẹp".

Những năng lực này trong sản phẩm thường thể hiện một cách ẩn tàng: chế độ ban đêm và chụp HDR của camera điện thoại, tăng cường chất lượng một chạm trên nền tảng video ngắn, công cụ phục hồi ảnh cũ, dịch vụ tăng cường đám mây của hệ thống giám sát, về bản chất đều phụ thuộc vào mô-đun khôi phục và tăng cường ở lớp này. Đối với doanh nghiệp, chúng vừa ảnh hưởng trực tiếp đến cảm nhận chủ quan của người dùng về "chất lượng hình ảnh", vừa gián tiếp quyết định chất lượng đầu vào của các thuật toán tầng trên như phát hiện, nhận dạng, phân đoạn. Có thể nói, tác vụ thị giác cấp cao càng phức tạp, càng phụ thuộc vào một "nền móng hình ảnh" chất lượng cao, phân phối ổn định ở tầng dưới.

### 2.1.2 Đặc trưng cấu trúc và tiền xử lý: dựng "giàn giáo" cho hiểu biết cấp cao

Khi chất lượng hình ảnh được phục hồi đến mức có thể sử dụng, công việc then chốt thứ hai của thị giác cấp thấp là từ pixel trích xuất các đặc trưng tạm thời không liên quan đến ngữ nghĩa cụ thể, nhưng rất quan trọng đối với cấu trúc hình học và cảm nhận thị giác, đồng thời thống nhất hình học và ánh sáng. Bước này sẽ không trực tiếp cho bạn biết "đây là một chiếc xe" hay "đây là khuôn mặt của ai đó", nhưng sẽ trả lời các câu hỏi như "đâu có đường viền và góc rõ ràng", "vùng nào có cấu trúc kết cấu nổi bật", "hình ảnh có bị méo hay nghiêng không", cung cấp đầu vào cấu trúc đáng tin cậy cho các mô hình tầng trên.

Về mặt trích xuất đặc trưng, cạnh và điểm góc là những yếu tố cơ bản nhất. Thông qua các toán tử như Canny, Sobel, hệ thống có thể đánh dấu trên toàn bộ ảnh những "cạnh" nơi có sự thay đổi mạnh nhất về độ xám hoặc màu sắc, những cạnh này thường tương ứng với đường viền vật thể, ranh giới bộ phận và hướng kết cấu; phát hiện điểm góc (như Harris, FAST) tìm ra những "góc" nơi gradient cục bộ thay đổi đáng kể trên nhiều hướng, thường xuất hiện ở góc của vật thể và điểm giao nhau của các đường. Tiến xa hơn, các bộ mô tả cục bộ như SIFT, SURF, ORB sẽ mã hóa mẫu kết cấu của một vùng nhỏ xung quanh những điểm then chốt này, khiến cùng một điểm vật lý vẫn có thể được khớp dưới các góc nhìn, tỷ lệ và thay đổi ánh sáng nhất định, điều này cung cấp hỗ trợ nền tảng cho căn chỉnh ảnh, ghép ảnh toàn cảnh, SLAM, theo dõi AR và tái tạo 3D.

Song song với trích xuất đặc trưng là các thao tác tiền xử lý hình học và ánh sáng khác nhau. Méo dạng thùng/gối do ống kính góc rộng, độ nghiêng và kéo giãn phối cảnh khi chụp tài liệu, đều được nhận diện thông qua các manh mối hình học cấp thấp như phát hiện đường thẳng, ước tính điểm biến mất, và được "kéo về bình thường" qua các bước khử méo, căn chỉnh và hiệu chỉnh phối cảnh; cân bằng histogram toàn cục hoặc thích ứng, kéo giãn độ tương phản và chuẩn hóa ánh sáng, trong điều kiện đảm bảo không mất chi tiết, nâng cao độ tương phản cục bộ và giảm ảnh hưởng của ánh sáng không đồng đều và bóng đổ. Biến đổi không gian màu (RGB→HSV/Lab) và thống kê histogram màu cung cấp đầu vào có thể sử dụng trực tiếp cho các tác vụ như phân đoạn dựa trên màu sắc, phát hiện vùng nổi bật và hiệu chỉnh lệch màu.

Sau khi học sâu end-to-end trở thành xu hướng chính, một phần các đặc trưng cấu trúc và tiền xử lý này đã được "nội hóa" vào các nhân tích chập và chiến lược chuẩn hóa ở các tầng đầu của mạng, không còn xuất hiện dưới dạng toán tử tường minh trên sơ đồ kiến trúc hệ thống. Nhưng từ góc độ chức năng, chúng vẫn đóng cùng một vai trò: trước tiên dùng một lớp xử lý cấp thấp tương đối chung, không liên quan đến danh mục cụ thể, sắp xếp pixel thô thành biểu diễn ổn định hơn về hình thái hình học, điều kiện ánh sáng và cấu trúc cục bộ, sau đó giao cho các mô-đun phân loại, phát hiện, phân đoạn và đa phương thức tầng trên hoàn thành nhiệm vụ "hiểu đây là gì". Không có lớp "giàn giáo" này, các mô hình tầng trên buộc phải gồng mình trên ảnh thô nhiễu cao, méo nặng, cấu trúc mờ, và độ bền vững cùng khả năng tổng quát hóa của toàn bộ hệ thống sẽ giảm đáng kể.## 2.2 Nhận dạng & phân loại ảnh (Image Classification & Recognition)

Trong hầu hết các tác vụ hình ảnh, câu hỏi mà doanh nghiệp thực sự quan tâm là: **Bức ảnh này thuộc thể loại nào? Người trong ảnh là ai? Người đi bộ này có phải cùng một người dưới các camera khác nhau không?** Bạn có thể hiểu tầng này là: trên một không gian đầu vào thống nhất và sạch, gán "nhãn danh mục" hoặc "nhãn định danh" cho toàn bộ bức ảnh hoặc toàn bộ người/đối tượng, chuyển đổi tín hiệu thị giác thành kết quả nhận dạng có thể sử dụng trực tiếp nhất.

Từ góc nhìn sản phẩm, phân loại và nhận dạng ảnh là một trong những năng lực thị giác được triển khai quy mô lớn sớm nhất, đồng thời cũng là "mô-đun đầu vào" cho nhiều ứng dụng tầng trên. Các nền tảng thương mại điện tử và nội dung sử dụng nó để tự động gắn thẻ cho ảnh, nhận dạng danh mục chủ thể; hệ thống an ninh và kiểm soát truy cập dùng nó để xác nhận "có phải cùng một người không"; hệ thống nhận dạng lại người đi bộ thì lần theo dấu vết giữa nhiều camera để tìm ra quỹ đạo xuyên cảnh của cùng một đối tượng. Dưới đây chúng ta cùng phân tích tầng này từ ba góc độ: kịch bản, nguyên lý và mô hình:

- **Kịch bản**
  - Hiểu ảnh tổng quát: tự động gán các thẻ chủ đề như "phong cảnh / ẩm thực / thú cưng / tài liệu" cho ảnh do người dùng tải lên, phục vụ tìm kiếm, đề xuất và kiểm duyệt nội dung.
  - Nhận dạng khuôn mặt & kiểm soát truy cập: trong hệ thống kiểm soát truy cập bằng khuôn mặt và chấm công, nhận dạng danh tính cá nhân từ ảnh khuôn mặt, cho phép "quét mặt ra vào", "quét mặt chấm công".
  - Nhận dạng lại người đi bộ/người: phán đoán xem có cùng một người đi bộ hay cùng một người trong các khung hình camera khác nhau hay không, phục vụ truy xuất an ninh và phân tích quỹ đạo.
  - Nhận dạng thuộc tính cơ thể người: trong điều kiện không xác nhận trực tiếp danh tính, nhận dạng các thuộc tính như giới tính, độ tuổi, có đội mũ/đeo ba lô/mặc đồng phục hay không, cung cấp manh mối cho việc truy xuất và phân tích hành vi.
- **Nguyên lý**
  Trong không gian đặc trưng thị giác thống nhất, tiến hành mô hình hóa phân biệt cho toàn bộ bức ảnh hoặc toàn bộ người/đối tượng:
  - Phân loại ảnh: lấy toàn bộ bức ảnh làm đầu vào, trích xuất đặc trưng toàn cục thông qua mạng tích chập hoặc Vision Transformer, và gắn một đầu phân loại ở tầng đặc trưng trên cùng, đầu ra là xác suất danh mục đơn nhãn hoặc đa nhãn, dùng để trả lời "đây là loại ảnh gì".
  - Nhận dạng định danh/thực thể: chuyển câu hỏi "là ai" thành bài toán metric learning trong không gian đặc trưng, tức là học một không gian nhúng sao cho các đặc trưng ảnh của cùng một định danh ở gần nhau, đặc trưng của các định danh khác nhau ở xa nhau, sau đó dùng tìm kiếm láng giềng gần nhất hoặc phân cụm để hoàn thành nhận dạng và truy xuất.
  - Nhận dạng thuộc tính: trên nền đặc trưng người/cơ thể dùng chung, thêm các đầu ra đa tác vụ, dự đoán các thẻ thuộc tính như giới tính, độ tuổi, màu quần áo, có mang theo đồ vật hay không, giúp cùng một đặc trưng có thể phục vụ nhiều nhu cầu truy xuất và phân tích hạ nguồn khác nhau.
- **Mô hình**
  Lấy mạng tích chập sâu và Vision Transformer làm backbone, kết hợp đầu phân loại hoặc đầu metric learning để thực hiện các loại tác vụ nhận dạng khác nhau:
  - Backbone phân loại ảnh: ResNet, DenseNet, EfficientNet, ConvNeXt, Vision Transformer (ViT), Swin Transformer, v.v., thường được pre-train trên các tập dữ liệu quy mô lớn như ImageNet, sau đó fine-tune trên dữ liệu nghiệp vụ cụ thể.
  - Cấu trúc phân loại tổng quát: Backbone + tầng phân loại kết nối đầy đủ (Softmax / Sigmoid), dùng cho tác vụ phân loại ảnh đơn nhãn hoặc đa nhãn, có thể ứng phó với phân phối đuôi dài thông qua re-weight danh mục, focal loss, v.v.
  - Nhận dạng định danh/thực thể: trên đầu ra đặc trưng của Backbone, sử dụng các hàm mất mát có ràng buộc góc như ArcFace, CosFace, SphereFace, kéo giãn tường minh khoảng cách liên lớp giữa các định danh khác nhau, nâng cao khả năng phân tách trong không gian đặc trưng, và hoàn thành so khớp trên cơ sở dữ liệu quy mô lớn thông qua tìm kiếm vector (ANN).
  - Cấu trúc nhận dạng người đi bộ/thuộc tính: đối với Re-ID người đi bộ và nhận dạng thuộc tính cơ thể người, cách làm phổ biến là sử dụng Backbone dùng chung để trích xuất đặc trưng người đi bộ, sau đó phân tách thành "nhánh định danh" và "nhánh thuộc tính" ở tầng trên, vừa tối ưu khả năng phân biệt định danh xuyên camera, vừa đảm bảo dự đoán đa thuộc tính.

Tương ứng với hình thái sản phẩm cụ thể, năng lực ở tầng này thường được cung cấp ra bên ngoài dưới dạng "API nhận dạng / phân loại nội dung ảnh", "SDK / SaaS nhận dạng khuôn mặt", "nền tảng nhận dạng lại người đi bộ", v.v. Chúng vừa trực tiếp thúc đẩy quyết định nghiệp vụ (như cho phép ra vào qua kiểm soát truy cập, ghi thẻ nội dung), vừa đóng vai trò tầng trên, cung cấp thẻ có cấu trúc và biểu diễn định danh ổn định cho các tác vụ truy xuất, đề xuất, phân tích hành vi và hiểu đa phương thức tiếp theo. Dưới đây, chúng ta lần lượt triển khai từ hai góc độ: phân loại ảnh và nhận dạng định danh/thuộc tính.

### 2.2.1 Phân loại ảnh: trả lời câu hỏi "đây là bức ảnh gì"

Trong tác vụ phân loại ảnh cơ bản nhất, hệ thống đối mặt với toàn bộ bức ảnh, mục tiêu là gán cho nó một hoặc một vài thẻ danh mục ngữ nghĩa. Phổ biến nhất là phân loại đơn nhãn, ví dụ trong tập dữ liệu như ImageNet, mỗi bức ảnh được gán nhãn là một danh mục chính như "chó", "mèo", "ô tô", "máy bay"; trong kịch bản nghiệp vụ, loại năng lực này được sử dụng rộng rãi để thêm các thẻ chủ đề như "phong cảnh / ẩm thực / thú cưng / chân dung / tài liệu" cho ảnh do người dùng tải lên, hỗ trợ tìm kiếm, đề xuất và kiểm duyệt nội dung. Tương tự như phân loại văn bản, mô hình sẽ thêm một tầng kết nối đầy đủ + Softmax lên trên đặc trưng thị giác toàn cục do Backbone pre-train trích xuất, xuất ra một phân phối xác suất cho tất cả các danh mục ứng viên.

Trong nhiều ứng dụng thực tế, một bức ảnh thường đồng thời thuộc về nhiều danh mục, ví dụ một bức ảnh "tự sướng hoàng hôn bên bờ biển", vừa có thể là "phong cảnh", cũng là "chân dung", còn có thể được gán nhãn là "du lịch", "bãi biển". Lúc này cần đến phân loại đa nhãn (Multi‑label Classification): mô hình vẫn xuất phát từ đặc trưng toàn bộ ảnh, nhưng tầng đầu ra không còn là Softmax loại trừ lẫn nhau, mà là dự đoán xác suất có/không riêng biệt cho từng nhãn (Sigmoid), và sử dụng hàm mất mát đa nhãn để huấn luyện. Để ứng phó với số lượng lớn "danh mục đuôi dài" (các thẻ ít phổ biến có rất ít mẫu) trong dữ liệu thực tế, mô hình phân loại đa nhãn thường thêm vào các cơ chế như re-weight danh mục, hard example mining hoặc mô hình hóa cấu trúc nhãn, nhằm cải thiện độ recall cho các danh mục nhỏ.

Ở tầng giao diện người-máy, phân loại ảnh thường được cung cấp ra bên ngoài dưới dạng "API nhận dạng nội dung ảnh". Nghiệp vụ tầng trên chỉ cần tải lên một bức ảnh là có thể nhận được một nhóm thẻ danh mục và độ tin cậy của chúng, dùng cho các phán đoán chiến lược tiếp theo: chẳng hạn hệ thống quảng cáo có thể giới hạn một số danh mục nhạy cảm dựa trên nội dung ảnh, nền tảng thương mại điện tử có thể dùng phân loại ảnh để hỗ trợ sửa lỗi danh mục hàng hóa, nền tảng nội dung thì dùng để làm phong phú đặc trưng đề xuất và tín hiệu kiểm duyệt. Mặc dù về mặt kỹ thuật, loại năng lực này đã tương đối trưởng thành, nhưng nó vẫn là nền tảng cho các năng lực phức tạp hơn về sau như phát hiện đối tượng, phân đoạn thực thể, trả lời câu hỏi thị giác.

### 2.2.2 Nhận dạng ảnh & nhận dạng thuộc tính: trả lời câu hỏi "đây là ai / đây là thực thể gì"

Khác với "đây là loại ảnh gì", nhận dạng ảnh quan tâm nhiều hơn đến "người/đối tượng trong ảnh là ai", tức là phân biệt ở cấp độ định danh, cấp độ thực thể. Đại diện tiêu biểu là nhận dạng khuôn mặt và nhận dạng lại người đi bộ: cái trước phán đoán "khuôn mặt hiện tại gần nhất với định danh nào trong cơ sở dữ liệu" trong các kịch bản kiểm soát truy cập, chấm công, thanh toán; cái sau thì tìm kiếm xem có cùng một người đi bộ hay không trong các khung hình từ nhiều camera và các khoảng thời gian giám sát khác nhau, hỗ trợ truy vết vụ việc và phân tích quỹ đạo. Cốt lõi của loại tác vụ này không còn là phân loại đa lớp đơn giản, mà là làm thế nào để học được một không gian nhúng "nội lớp chặt chẽ, liên lớp tách biệt" trong không gian đặc trưng, khiến các ảnh của cùng một định danh được chụp dưới các tư thế, ánh sáng, camera khác nhau vẫn có thể được nhóm lại với nhau.

Về mặt thiết kế mô hình, nhận dạng khuôn mặt và nhận dạng lại người đi bộ thường áp dụng cùng một mẫu hình: trước tiên dùng các Backbone như ResNet, ConvNeXt, ViT, Swin để trích xuất đặc trưng tập trung vào khuôn mặt/người đi bộ, sau đó thêm các hàm mất mát được thiết kế riêng cho metric learning, như ArcFace, CosFace, v.v. Khác với hàm mất mát phân loại thông thường, các hàm mất mát này trực tiếp ràng buộc ranh giới liên lớp trong không gian góc hoặc không gian đặc trưng, kéo giãn tường minh khoảng cách giữa các đặc trưng định danh khác nhau, từ đó giúp các đặc trưng sau khi huấn luyện có thể được sử dụng để tìm kiếm vector quy mô lớn, không bị giới hạn vào các danh mục cố định đã thấy trong quá trình huấn luyện. Khi phục vụ trực tuyến, hệ thống sẽ tiền tính toán và lập chỉ mục đặc trưng của từng định danh trong thư viện ảnh, sau đó thực hiện tìm kiếm láng giềng gần nhất xấp xỉ đối với đặc trưng khuôn mặt/người đi bộ được truy vấn trực tuyến, tìm ra một số ứng viên tương tự nhất, kết hợp với ngưỡng nghiệp vụ và thông tin đa phương thức để đưa ra quyết định cuối cùng.

Tương phản với "nhận dạng định danh trực tiếp" là **nhận dạng thuộc tính** không chỉ đến cá nhân cụ thể. Trong nhiều kịch bản an ninh và bán lẻ, hệ thống chỉ cần biết "là nam hay nữ", "khoảng độ tuổi", "có đội mũ/đeo khẩu trang không", "màu sắc và kiểu dáng quần áo", "có đeo ba lô/kéo hành lý không" và các thuộc tính khác, dùng để nhanh chóng sàng lọc mục tiêu, mà không cần và cũng không thích hợp để trực tiếp xuất ra định danh cá nhân. Loại tác vụ này thường thêm nhiều đầu thuộc tính song song (đầu ở đây nghĩa là vị trí xuất xác suất, có thể thêm nhiều kết quả xuất xác suất để phán đoán danh mục) trên nền đặc trưng người/cơ thể dùng chung, mỗi đầu chịu trách nhiệm dự đoán một hoặc một nhóm thẻ thuộc tính, tạo thành một khung học đa tác vụ. Một mặt, huấn luyện đa tác vụ có thể làm cho đặc trưng phong phú hơn, khái quát hóa tốt hơn; mặt khác, bản thân thuộc tính cũng có thể đóng vai trò là điều kiện phụ trợ cho Re-ID hoặc truy xuất, nâng cao tính khả dụng của hệ thống trong các kịch bản phức tạp.

Về hình thái sản phẩm, loại năng lực này thường được đóng gói thành "SDK/dịch vụ đám mây nhận dạng khuôn mặt", "nền tảng nhận dạng lại người đi bộ", "API nhận dạng thuộc tính cơ thể người", v.v., được tích hợp vào cổng kiểm soát truy cập, máy chấm công, nền tảng an ninh và hệ thống cấu trúc hóa video. So với phân loại ảnh tổng quát, chúng có yêu cầu cao hơn về bảo mật dữ liệu và bảo vệ quyền riêng tư, đồng thời nhạy cảm hơn với sự đánh đổi giữa tỷ lệ nhận dạng sai và độ recall, do đó ngoài thuật toán, còn bổ trợ thêm các cơ chế như kiểm tra chất lượng (như có phải người thật không, có bị che khuất/chụp lại không), phát hiện người sống, xác thực chéo đa phương thức, tạo thành một giải pháp nhận dạng định danh hoàn chỉnh hơn và có trách nhiệm hơn.## 2.3 Phát hiện đối tượng (Object Detection)

Trong phần phân loại và nhận dạng hình ảnh trước đó, chúng ta chỉ gán một nhãn tổng thể cho "toàn bộ bức ảnh" hoặc "toàn bộ con người", mà bỏ qua vị trí và kích thước của đối tượng trong ảnh. Tuy nhiên, bài toán phổ biến hơn trong thực tế kinh doanh là: **Trong bức ảnh này có những đối tượng nào? Chúng nằm ở vị trí nào?** Ví dụ, trong một bức ảnh đường phố, chúng ta muốn đồng thời đánh dấu tất cả người đi bộ, phương tiện, biển báo giao thông; trên dây chuyền sản xuất công nghiệp, cần đánh dấu tất cả các vùng lỗi và vị trí linh kiện trong cùng một khung hình. Phát hiện đối tượng ra đời để đáp ứng những nhu cầu này: nó đồng thời dự đoán **vị trí (bounding box) và danh mục** của từng đối tượng trong một ảnh đơn hoặc khung hình video, là năng lực nền tảng cho nhiều tác vụ thị giác hạ nguồn (theo dõi, phân đoạn, phân tích hành vi, đếm đa đối tượng, v.v.).

Từ góc độ sử dụng kỹ thuật, phát hiện đối tượng là "bước cấu trúc hóa đầu tiên" của nhiều hệ thống thị giác, phân rã một bức ảnh thô thành nhiều khung chữ nhật có gán nhãn, mỗi khung có thể được đưa tiếp vào các mô-đun khác để nhận dạng, theo dõi, phân tích thuộc tính và thậm chí là sinh ngữ nghĩa. Việc phát hiện người đi bộ/phương tiện trong camera an ninh, phát hiện hàng hóa trên kệ bán lẻ không người phục vụ, phát hiện lỗi/vật thể lạ trong kiểm tra chất lượng công nghiệp, cũng như các API "phát hiện đối tượng / phát hiện vật thể" do nhà cung cấp đám mây cung cấp, về bản chất đều dựa trên năng lực tầng này. Dưới đây, chúng ta sẽ tổ chức lại phát hiện đối tượng từ ba góc độ: **kịch bản**, **nguyên lý** và **mô hình**, và sẽ lần lượt mở rộng các hướng then chốt trong các tiểu mục tiếp theo.

- **Kịch bản**
  - An ninh và giám sát giao thông: Phát hiện thời gian thực người đi bộ, phương tiện, phương tiện phi cơ giới, biển báo giao thông, đối tượng đi ngược chiều/chiếm làn đường, v.v. trong khung hình camera, làm nền tảng cho phân tích hành vi và cảnh báo tiếp theo.
  - Kiểm tra chất lượng và sản xuất công nghiệp: Phát hiện lỗi sản phẩm (trầy xước, hư hỏng, vật thể lạ), vị trí linh kiện, lắp ráp thiếu hụt trên dây chuyền sản xuất, hỗ trợ loại bỏ tự động và định vị robot.
  - Bán lẻ và logistics: Phát hiện và nhận dạng hàng hóa trên kệ bán lẻ không người phục vụ, thanh toán; phát hiện và định vị đối tượng như bưu kiện, pallet, xếp chồng trong kho bãi, hỗ trợ kiểm kê tồn kho và robot gắp hàng.
  - Hiểu nội dung và kiểm duyệt: Phát hiện người, logo, vũ khí, vật phẩm nhạy cảm, v.v. trong hình ảnh/video, cung cấp tín hiệu có cấu trúc cho kiểm duyệt nội dung, tuân thủ quảng cáo và nhận diện thương hiệu.
- **Nguyên lý**
  Cốt lõi của phát hiện đối tượng là xây dựng một cơ chế dự đoán dày đặc trên hình ảnh:
  - Trích xuất ảnh đầu vào thành các bản đồ đặc trưng đa tỷ lệ thông qua Backbone, trên các bản đồ đặc trưng này, tại mỗi "vị trí" (hoặc vùng ứng viên), đồng thời dự đoán "có đối tượng hay không", "thuộc danh mục nào", "tham số bbox tương ứng".
  - Phân chia theo kiến trúc, có phương pháp **phát hiện hai giai đoạn (Two-stage)** sinh khung ứng viên trước rồi tinh chỉnh sau, và phương pháp **phát hiện một giai đoạn (One-stage)** thực hiện phân loại + hồi quy trực tiếp trên bản đồ đặc trưng, mỗi loại có thế mạnh riêng về độ chính xác và tốc độ.
  - Phân chia theo thiết kế khung ứng viên, có phương pháp **anchor-based** dựa trên khung neo (anchor) được định nghĩa trước, và phương pháp **anchor-free** dự đoán trực tiếp điểm trung tâm/ranh giới, cùng họ **DETR** dựa trên khớp tập hợp.
  - Để đối phó với đối tượng nhỏ, đối tượng dày đặc, che khuất và biến đổi tỷ lệ trong dữ liệu thực tế, bộ phát hiện thường kết hợp đặc trưng đa tỷ lệ (FPN), độ phân giải đầu vào cao hơn, hàm mất mát cụ thể và chiến lược hậu xử lý (như biến thể NMS, kiểm thử đa tỷ lệ) để tối ưu hóa.
- **Mô hình**
  Mô hình phát hiện đại thể gồm ba phần: **mạng xương sống + kim tự tháp đặc trưng / cấu trúc đầu + mất mát và hậu xử lý**:
  - Bộ phát hiện hai giai đoạn kinh điển: Faster R-CNN, Mask R-CNN, v.v., trước tiên sinh khung ứng viên qua RPN, sau đó thực hiện phân loại và hồi quy tinh tế trên từng vùng ứng viên, độ chính xác cao, cấu trúc rõ ràng, phù hợp với các kịch bản yêu cầu độ chính xác cực cao.
  - Bộ phát hiện một giai đoạn: SSD, RetinaNet, dòng YOLO (YOLOv5/6/7/8, YOLOX, YOLOv10, v.v.), hoàn thành phát hiện trong một mạng thống nhất, cấu trúc gọn nhẹ, độ trễ thấp, là lực lượng chính trong phát hiện thời gian thực công nghiệp.
  - Bộ phát hiện Anchor-free / Transformer: FCOS, CenterNet, ATSS, v.v. lấy điểm ảnh làm trung tâm để dự đoán trực tiếp khung; DETR / Deformable DETR, v.v. thông qua Transformer và khớp tập hợp, coi phát hiện như bài toán "sinh một tập hợp đối tượng từ một tập hợp truy vấn", đơn giản hóa nhiều thiết kế thủ công.
  - Phát hiện và theo dõi video: Trên cơ sở bộ phát hiện hình ảnh, đưa vào thông tin thời gian và chiến lược liên kết (như đầu theo dõi, luồng quang học, khớp quỹ đạo), hình thành khung thống nhất Detection + Tracking, hỗ trợ phân tích hành vi đa đối tượng trong thời gian dài.

Tổng hợp lại, phát hiện đối tượng nằm ở "vị trí trung tâm" trong phổ năng lực thị giác — một mặt nó tiếp nhận đầu vào hình ảnh sạch do tầng thị giác cơ bản cung cấp, mặt khác nó phân rã hình ảnh thành các phần tử "cấp đối tượng" có thể được sử dụng cho nhận dạng, theo dõi, phân đoạn và hiểu đa phương thức. Dưới đây, chúng ta sẽ lần lượt mở rộng từ ba hướng: **kiến trúc phát hiện một giai đoạn/hai giai đoạn**, **phát hiện Anchor-based / Anchor-free / Transformer**, và **đối tượng nhỏ và phát hiện video**.

### 2.3.1 Phát hiện một giai đoạn và hai giai đoạn: Đánh đổi cấu trúc giữa độ chính xác và tốc độ

Từ góc độ kiến trúc, cách phân chia kinh điển nhất của phát hiện đối tượng là **hai giai đoạn (Two-stage) và một giai đoạn (One-stage)**. Sự khác biệt chính giữa hai loại nằm ở chỗ: "chọn thô một loạt khung ứng viên trước, rồi tinh chỉnh sau", hay "dự đoán một lần tất cả khung và danh mục trên bản đồ đặc trưng".

Phát hiện hai giai đoạn lấy Faster R-CNN làm đại diện. Nó trước tiên sinh một loạt khung ứng viên "có xác suất chứa đối tượng cao" thông qua RPN (Region Proposal Network) trên bản đồ đặc trưng Backbone (giai đoạn một), sau đó thực hiện căn chỉnh RoI và trích xuất đặc trưng cho từng vùng ứng viên, rồi thực hiện phân loại và hồi quy khung tinh tế hơn (giai đoạn hai). Ưu điểm của thiết kế này là: một lượng lớn mẫu âm đã được lọc bỏ trong giai đoạn RPN, giai đoạn hai có thể tập trung sức lực vào một số ít vùng ứng viên để đưa ra phán đoán chất lượng cao, do đó thường có lợi thế về độ chính xác, cũng dễ dàng mở rộng sang các tác vụ như phân đoạn đối tượng (Mask R-CNN), phát hiện điểm then chốt (Keypoint R-CNN). Tuy nhiên, cấu trúc đa giai đoạn mang lại độ phức tạp tính toán và triển khai tương đối cao, phù hợp hơn với các kịch bản ngoại tuyến hoặc gần thời gian thực không quá khắt khe về tính thời gian thực nhưng nhấn mạnh độ chính xác và khả năng mở rộng.

Phát hiện một giai đoạn nỗ lực thông suốt toàn bộ quy trình, đồng thời hoàn thành phân loại danh mục và hồi quy khung trong một mạng thống nhất. Các mô hình đại diện bao gồm SSD, RetinaNet và dòng YOLO, v.v.: chúng trực tiếp dự đoán "tiền cảnh/nền + danh mục + bbox" của một số khung ứng viên tại mỗi vị trí trên bản đồ đặc trưng đa tỷ lệ, loại bỏ giai đoạn proposal tường minh, phù hợp hơn cho tăng tốc và triển khai đầu cuối. Các bộ phát hiện một giai đoạn ban đầu có khoảng cách nhất định về độ chính xác so với hai giai đoạn, nhưng nhờ cấu trúc đơn giản, tốc độ nhanh, đã nhanh chóng chiếm vị trí chủ đạo trong công nghiệp; cùng với sự ra đời của FPN, focal loss, IoU-aware loss, cũng như Backbone và Neck mạnh mẽ hơn, các mô hình thế hệ mới như RetinaNet, YOLOX, YOLOv7/8/10 đã đạt được sự cân bằng độ chính xác–tốc độ "gần bằng hoặc thậm chí vượt qua hai giai đoạn" trên nhiều tác vụ.

Ở cấp độ ứng dụng, trong thực tế kỹ thuật thường sẽ lựa chọn giữa hai loại kiến trúc này tùy theo nhu cầu: đối với các tác vụ phân tích hàng loạt ngoại tuyến trên đám mây, yêu cầu độ chính xác cao và khả năng mở rộng (như đồng thời thực hiện phát hiện + phân đoạn + điểm then chốt), phát hiện hai giai đoạn vẫn là một lựa chọn ổn định và đáng tin cậy; còn đối với các kịch bản nhạy cảm với độ trễ như thiết bị biên, ứng dụng di động, phát hiện thời gian thực từ camera, các bộ phát hiện một giai đoạn như dòng YOLO gần như là lựa chọn mặc định hàng đầu, và thường được kết hợp với các kỹ thuật như lượng tử hóa, cắt tỉa, chưng cất để nén mô hình hơn nữa và tăng thông lượng.

### 2.3.2 Anchor-based và Anchor-free: Từ thiết lập thủ công đến học đầu cuối

Về vấn đề làm thế nào để định nghĩa "khung ứng viên", các phương pháp phát hiện lại có thể được chia thành hai loại lớn: **Anchor-based và Anchor-free**. Các phương pháp chính thống ban đầu (như Faster R-CNN, SSD, RetinaNet, YOLOv3/v4/v5, v.v.) áp dụng tư duy Anchor-based: tại mỗi vị trí trên bản đồ đặc trưng, định nghĩa trước một số khung neo (anchor) với các tỷ lệ và tỷ lệ khung hình khác nhau, sau đó học xác suất tiền cảnh và độ lệch bbox tương ứng với mỗi anchor. Cách tiếp cận này đơn giản để triển khai, hiệu quả tốt, nhưng cần điều chỉnh tham số thủ công khá nhiều cho kích thước và tỷ lệ của anchor, và trong các kịch bản đối tượng nhỏ, đối tượng dày đặc dễ xuất hiện vấn đề số lượng anchor quá lớn, mất cân bằng mẫu dương/âm cực độ.

Phương pháp Anchor-free cố gắng thoát khỏi sự phụ thuộc vào anchor được định nghĩa trước. Lấy FCOS, CenterNet, ATSS, v.v. làm đại diện, chúng thường trực tiếp dự đoán trên mỗi điểm ảnh của bản đồ đặc trưng "đây có phải là trung tâm của một đối tượng nào đó (hoặc thuộc về đối tượng đó)" và khoảng cách ranh giới tương ứng, từ đó hoàn toàn tránh được sự phức tạp của anchor cài đặt sẵn. Ưu điểm của cách này là: cấu trúc mô hình gọn gàng hơn, chiến lược phân bổ mẫu huấn luyện có thể tự nhiên hơn, đặc biệt khi đối mặt với các kịch bản thực tế có biến đổi tỷ lệ lớn, hình dạng đối tượng phức tạp, có khả năng tổng quát hóa và mở rộng tốt hơn. Đồng thời, bộ phát hiện Anchor-free cũng thúc đẩy nhiều khung thống nhất dựa trên điểm ảnh/điểm hơn, khiến cho các tác vụ phát hiện, điểm then chốt và phân đoạn dễ dàng cùng mô hình hóa hơn.

Tiến xa hơn nữa, các bộ phát hiện dựa trên Transformer như DETR / Deformable DETR đã suy nghĩ lại bài toán phát hiện từ một chiều kích khác: chúng không đặt dày đặc anchor trên bản đồ đặc trưng, mà đưa vào một tập hợp cố định các "vector truy vấn" (object queries), thông qua cơ chế tự chú ý và chú ý chéo của Transformer, "sinh" ra một tập hợp dự đoán đối tượng từ đặc trưng toàn cục, và thực hiện căn chỉnh một-một thông qua khớp Hungary (Hungarian Matching). Tư duy dự đoán tập hợp (set prediction) này loại bỏ hoàn toàn các thành phần truyền thống như NMS và phân bổ mẫu thủ công, rất gọn gàng về mặt khái niệm, nhưng trong các triển khai ban đầu tồn tại các vấn đề như hội tụ chậm, không thân thiện với đối tượng nhỏ; Deformable DETR sau này thông qua việc đưa vào chú ý biến dạng và cơ chế đa tỷ lệ, đã có cải thiện rõ rệt về tốc độ hội tụ và hiệu năng, dần dần có được nhiều ứng dụng hơn trong các kịch bản phát hiện và đa tác vụ.

Đối với thực tiễn kỹ thuật, Anchor-based, Anchor-free và phát hiện Transformer không phải là những lựa chọn loại trừ lẫn nhau, mà giống như một chuỗi tiến hóa: từ thiết kế anchor heavily engineered, đến dự đoán điểm/trung tâm đầu cuối hơn, rồi đến khung thống nhất hoàn toàn dựa trên dự đoán tập hợp và chú ý. Trong triển khai công nghiệp hiện nay, các mô hình Anchor-based trưởng thành như dòng YOLO vẫn là lực lượng chính, Anchor-free và họ DETR xuất hiện nhiều hơn trong các hệ thống có yêu cầu cao về tính gọn gàng cấu trúc, tính thống nhất đa tác vụ và khả năng mở rộng.

### 2.3.3 Đối tượng nhỏ và phát hiện video: Hướng tới độ bền vững trong kịch bản thực tế

Phát hiện đối tượng trên các bộ dữ liệu công khai thường tạo ra ảo giác rằng "vấn đề về cơ bản đã được giải quyết", nhưng một khi bước vào kịch bản thực tế, sẽ ngay lập tức gặp phải hai loại vấn đề hóc búa: **đối tượng nhỏ/đối tượng dày đặc** và **phát hiện và theo dõi ổn định trong video**.

Trong phát hiện đối tượng nhỏ, đối tượng thường chỉ chiếm vùng điểm ảnh rất nhỏ trong ảnh gốc, ví dụ như người đi bộ ở xa, phương tiện ở xa, drone trên không, hoặc các lỗi nhỏ li ti trên hình ảnh công nghiệp độ phân giải cao. Khi Backbone giảm mẫu và độ phân giải bản đồ đặc trưng giảm xuống, những đối tượng nhỏ này rất dễ bị "nhấn chìm" trong đặc trưng tầng cao, dẫn đến bỏ sót phát hiện. Vì vậy, bộ phát hiện thường áp dụng kim tự tháp đặc trưng đa tỷ lệ (FPN/PAFPN, v.v.), tăng độ phân giải đầu vào, thêm đầu phát hiện trên bản đồ đặc trưng tầng nông, thậm chí thiết kế riêng nhánh và chiến lược trọng số mất mát cho đối tượng nhỏ. Đồng thời, ở cấp độ dữ liệu cũng cần thông qua cắt xén, phóng to, tái lấy mẫu đối tượng nhỏ, v.v. để nâng cao khả năng nhận thức và ghi nhớ của mô hình đối với đối tượng tỷ lệ nhỏ.

Đối tượng dày đặc (như đám đông chen chúc, bãi đỗ xe dày đặc, hàng hóa/linh kiện xếp sát nhau) sẽ làm lộ ra các vấn đề như chồng lấn khung neo, NMS giết nhầm, che khuất nghiêm trọng. Các chiến lược cải thiện bao gồm phân bổ nhãn tinh tế hơn (như các phương pháp phân bổ thích ứng ATSS), NMS mềm hoặc chiến lược khử trùng lặp dựa trên học, cũng như giảm cạnh tranh giữa các khung thông qua mô hình hóa điểm trung tâm/bản đồ mật độ. Trong kiểm tra chất lượng công nghiệp, nhiều hệ thống còn kết hợp phát hiện với phân đoạn cấp điểm ảnh, đạt được định vị lỗi chính xác hơn, thuận tiện cho xử lý tự động tiếp theo.

Khi phát hiện mở rộng từ khung đơn sang video, một thách thức khác là **tính liên tục thời gian và tính ổn định của đối tượng**. Bộ phát hiện khung đơn đưa ra dự đoán độc lập trên từng khung, khó tránh khỏi mất phát hiện ngắn hạn, dao động ID và cảnh báo sai, trong khi các ứng dụng thực tế như cảnh báo, đếm, phân tích quỹ đạo thường yêu cầu quỹ đạo đối tượng nhất quán xuyên khung. Vì vậy, phát hiện đối tượng video thường chồng thêm một mô-đun Tracking, thông suốt "phát hiện + theo dõi đối tượng": cách làm kinh điển là lấy bộ phát hiện hình ảnh làm tiền đạo, ở hậu đạo sử dụng bộ lọc Kalman, khớp Hungary, độ tương đồng đặc trưng ngoại hình, v.v. để thực hiện theo dõi đa đối tượng (như SORT, DeepSORT, v.v.); cách làm tiến xa hơn là tích hợp đầu theo dõi trực tiếp vào mạng phát hiện, cùng học phát hiện và liên kết xuyên khung, nâng cao độ bền vững trong các kịch bản như che khuất ngắn hạn, chuyển động nhanh.

Trong các hệ thống thực tế, đối tượng nhỏ, đối tượng dày đặc và phát hiện video thường không phải là những vấn đề cô lập, mà xuất hiện đồng thời: ví dụ như người đi bộ/phương tiện ở xa trong giám sát đường phố đô thị, đám đông dày đặc trong quảng trường nhà ga, linh kiện chuyển động tốc độ cao trong video dây chuyền sản xuất. Điều này cũng quyết định rằng, một mô-đun phát hiện đối tượng chất lượng cao, ngoài việc có chỉ số nổi bật trên benchmark tiêu chuẩn, còn cần phải chịu đựng được thử thách của nhiều yếu tố phức tạp trong các điều kiện thực tế như đa tỷ lệ, đa mật độ, video thời gian dài, thì mới thực sự hỗ trợ được phân tích hành vi, cảnh báo thông minh và hiểu đa phương thức ở tầng trên.## 2.4 Phân đoạn ảnh (Image Segmentation)

Với phát hiện đối tượng, chúng ta đã có thể biết "trong ảnh có những vật thể nào, chúng ở khoảng đâu", nhưng nhiều tác vụ vẫn cần hiểu biết cấu trúc tinh tế hơn: **chính xác đến từng pixel, xác định nó thuộc lớp nào, thuộc instance nào**. Ví dụ như trong lái xe tự động cần biết pixel nào là đường, pixel nào là người và xe; công cụ cắt ghép ảnh cần tách sợi tóc khỏi nền một cách sạch sẽ; trong ảnh y tế cần phác họa chính xác ranh giới khối u và cơ quan. Những tác vụ này được gọi chung là phân đoạn ảnh, nó xuất ra nhãn ngữ nghĩa hoặc nhãn instance trực tiếp ở mức pixel, cung cấp thông tin cấu trúc không gian chi tiết hơn so với phát hiện.

Từ góc độ sản phẩm, phân đoạn ảnh là năng lực cốt lõi của "cấu trúc hóa mức pixel": công cụ cắt ghép và thay nền dựa vào nó để quyết định pixel nào cần giữ lại; mô-đun nhận thức của lái xe tự động dựa vào nó để xây dựng bản đồ "vùng có thể lái + chướng ngại vật" tinh tế; phần mềm ảnh y tế dựa vào nó để đo kích thước, hình dạng và thể tích tổn thương; nền tảng viễn thám dựa vào nó để phân biệt đất nông nghiệp, mặt nước, tòa nhà, đường xá. Dưới đây chúng ta sẽ hệ thống hóa phân đoạn ảnh từ ba góc độ: **kịch bản**, **nguyên lý** và **mô hình**, đồng thời mở rộng các hướng như phân đoạn ngữ nghĩa/instance/toàn cảnh/mô hình lớn ở các mục tiếp theo.

- **Kịch bản**
  - Chỉnh sửa nội dung và cắt ghép: cắt chân dung, thay nền ở mức sợi tóc, cắt và chỉnh sửa phân lớp vật thể, dùng cho làm đẹp ảnh, hiệu ứng video ngắn, sáng tạo quảng cáo.
  - Lái xe tự động và robot: gán nhãn cho từng pixel là mặt đường, vạch làn đường, người đi bộ, xe cộ, rào chắn, tòa nhà, bầu trời, v.v., phục vụ cho quy hoạch đường đi, cảnh báo va chạm và mô hình hóa môi trường.
  - Phân tích ảnh y tế: phân đoạn chính xác cơ quan, khối u, vùng tổn thương trong ảnh CT, MRI, siêu âm, hỗ trợ chẩn đoán phụ trợ, lập kế hoạch phẫu thuật và đánh giá hiệu quả điều trị.
  - Viễn thám và thông tin địa lý: phân đoạn đất nông nghiệp, mặt nước, đường xá, tòa nhà, rừng trong ảnh vệ tinh/ảnh hàng không, hỗ trợ quy hoạch lãnh thổ, giám sát sử dụng đất và đánh giá thiên tai.
- **Nguyên lý**
  Bản chất phân đoạn ảnh là "dự đoán dày đặc", trích xuất đặc trưng đa tỷ lệ từ ảnh đầu vào thông qua bộ mã hóa (Backbone), sau đó thông qua bộ giải mã hoặc mô-đun upsampling, khôi phục dần bản đồ đặc trưng về bản đồ phân đoạn cùng kích thước với đầu vào, xuất ra một nhãn ngữ nghĩa hoặc nhãn instance tại mỗi vị trí pixel.
  - **Phân đoạn ngữ nghĩa (Semantic Segmentation)**: gán cho mỗi pixel một lớp ngữ nghĩa (như đường, người, xe, bầu trời), không phân biệt các cá thể khác nhau cùng lớp, phù hợp để mô tả "thành phần cảnh".
  - **Phân đoạn instance (Instance Segmentation)**: trên nền thông tin ngữ nghĩa, tiếp tục phân biệt các instance khác nhau cùng lớp, tạo mặt nạ độc lập cho "mỗi chiếc xe, mỗi người", là sự kết hợp giữa phát hiện và phân đoạn.
  - **Phân đoạn toàn cảnh (Panoptic Segmentation)**: xử lý thống nhất "vật thể đếm được (thing, như người, xe)" và "nền không đếm được (stuff, như đường, bầu trời)", đồng thời cung cấp nhãn ngữ nghĩa và ID instance cho mỗi pixel.
    So với phát hiện, phân đoạn nhạy cảm hơn với chi tiết không gian và chất lượng biên, cần thông tin ngữ cảnh đa tỷ lệ phong phú hơn và chiến lược upsampling/hợp nhất tinh tế hơn.
- **Mô hình**
  Các mô hình phân đoạn từ cổ điển đến mới nhất đại khái tiến hóa theo lộ trình "FCN → Bộ mã hóa–giải mã → Ngữ cảnh đa tỷ lệ → Phát hiện + Phân đoạn tích hợp → Phân đoạn mô hình lớn":
  - Phân đoạn ngữ nghĩa: FCN, U‑Net và các biến thể, dòng DeepLab (DeepLabv3/v3+), PSPNet, v.v., thu được ngữ cảnh đa tỷ lệ và biên tinh tế thông qua dilated convolution, pyramid pooling, skip connection.
  - Phân đoạn instance/toàn cảnh: Mask R‑CNN, Panoptic FPN, Mask2Former, v.v., kết hợp đầu phát hiện và đầu phân đoạn, thực hiện phân đoạn mức đối tượng và phân đoạn toàn cảnh.
  - Mô hình lớn và phân đoạn tổng quát: các mô hình phân đoạn nền tảng như Segment Anything Model (SAM), nâng cao phân đoạn từ "huấn luyện riêng cho từng tác vụ" lên thành "một mô hình phù hợp với phần lớn kịch bản phân đoạn", hỗ trợ phân đoạn tương tác, điều khiển bằng prompt (prompt-based).

Tổng thể, so với phát hiện đối tượng, phân đoạn ảnh cung cấp biểu diễn cấu trúc không gian tinh tế hơn, là một mắt xích không thể thiếu khi xây dựng hệ thống nhận thức độ tin cậy cao và công cụ chỉnh sửa cao cấp. Dưới đây, chúng ta sẽ triển khai theo ba hướng: **phân đoạn ngữ nghĩa và phân đoạn instance**, **phân đoạn toàn cảnh và tích hợp phát hiện**, cùng với **phân đoạn tổng quát**, **mô hình lớn**, **và phân đoạn không giám sát**.

### 2.4.1 Phân đoạn ngữ nghĩa và phân đoạn instance: từ "lớp pixel" đến "instance pixel"

Mục tiêu của **phân đoạn ngữ nghĩa (Semantic Segmentation)** là chỉ định một lớp ngữ nghĩa cho mỗi pixel trong ảnh, để mạng học được "vùng này là đường, vùng kia là xe, đây là người, kia là bầu trời và tòa nhà". Cách làm kinh điển thường sử dụng cấu trúc bộ mã hóa–giải mã: bộ mã hóa (như ResNet, EfficientNet, Swin Transformer, v.v.) trích xuất đặc trưng cấp cao được downsample dần, bộ giải mã thông qua upsampling, skip connection và hợp nhất đa tỷ lệ, kết hợp đặc trưng ngữ nghĩa cấp cao thô với chi tiết cấp thấp, khôi phục về độ phân giải gốc. FCN lần đầu tiên hệ thống hóa hình thức dự đoán dày đặc này, U‑Net thông qua cấu trúc hình chữ U đối xứng với nhiều skip connection đã đạt được thành công lớn trong ảnh y tế; dòng DeepLab thông qua dilated convolution và ASPP (Atrous Spatial Pyramid Pooling) mở rộng vùng tiếp nhận mà không giảm độ phân giải; PSPNet thu được thông tin ngữ cảnh toàn cục thông qua pyramid pooling. Những mô hình này cùng thúc đẩy ứng dụng quy mô lớn trong các lĩnh vực như cảnh đường phố, viễn thám, y tế.

**Phân đoạn instance (Instance Segmentation)** tiến thêm một bước, trên nền nhãn ngữ nghĩa pixel, phân biệt các cá thể khác nhau cùng lớp: không chỉ cần biết pixel nào là "xe", mà còn cần biết những pixel đó thuộc về chiếc xe nào. Mô hình tiêu biểu nhất là Mask R‑CNN, nó thêm một nhánh phân đoạn song song trên khung phát hiện Faster R‑CNN: trước tiên dự đoán lớp và vị trí của mỗi hộp ứng viên thông qua đầu phát hiện, sau đó tạo một mặt nạ nhị phân trong mỗi hộp, từ đó thu được kết quả phân đoạn mức đối tượng "hộp + mặt nạ". So với phân đoạn ngữ nghĩa thuần túy, phương pháp này xử lý tốt việc chồng lấp và che khuất vật thể, là nền tảng cho các tác vụ cắt chân dung/sản phẩm, đếm đa đối tượng, chỉnh sửa tinh tế. Các phương pháp phân đoạn instance sau này liên tục cải tiến về chất lượng mặt nạ, đa tỷ lệ và tốc độ, cũng xuất hiện các kiến trúc mới dựa trên anchor-free và Transformer, nhưng ý tưởng "phát hiện + phân đoạn cục bộ" vẫn rất chủ đạo.

Ở mức sản phẩm, phân đoạn ngữ nghĩa thường xuất hiện trong các ứng dụng "mức cảnh", như phân đoạn đường trong lái xe tự động, nhận dạng địa vật viễn thám, phân đoạn cơ quan y tế; phân đoạn instance thường dùng nhiều hơn trong cắt ghép, đếm và chỉnh sửa "mức đối tượng", như chọn và tách riêng từng chiếc xe, từng người, từng sản phẩm chỉ với một cú nhấp. Kết hợp cả hai, có thể cung cấp thông tin không gian vừa tinh tế vừa có cấu trúc cho các tác vụ tầng trên.

Chỉ làm phân đoạn ngữ nghĩa sẽ trộn lẫn các đối tượng cùng lớp (tất cả pixel "xe" đều thuộc cùng một lớp); chỉ làm phân đoạn instance lại thường chỉ tập trung vào "thứ" đếm được (things, như người, xe, động vật), mà bỏ qua "nền" không đếm được diện rộng (stuff, như đường, cỏ, bầu trời). Trong nhiều kịch bản, chúng ta vừa cần biết **mặt nạ mức instance của từng đối tượng**, vừa muốn hiểu **thành phần tổng thể của cảnh**. Điều này thúc đẩy sự ra đời của **phân đoạn toàn cảnh (Panoptic Segmentation)**: đồng thời cung cấp lớp ngữ nghĩa và ID instance cho mỗi pixel, thực hiện mô hình hóa thống nhất thing + stuff.

Các hệ thống phân đoạn toàn cảnh ban đầu thường được thực hiện thông qua phương thức "mô hình phân đoạn ngữ nghĩa + mô hình phân đoạn instance + hậu xử lý tổng hợp": trước tiên dùng một mạng dự đoán lớp ngữ nghĩa của mỗi pixel, sau đó dùng một mạng khác xuất ra mặt nạ và lớp của từng instance, cuối cùng thông qua một bộ quy tắc (như ưu tiên, xử lý chồng lấp) hợp nhất cả hai thành một kết quả phân đoạn toàn cảnh nhất quán. Panoptic FPN đại diện cho một con đường kỹ thuật thanh lịch hơn: trên một Backbone và kim tự tháp đặc trưng (FPN) dùng chung, treo riêng đầu phân đoạn ngữ nghĩa và đầu phân đoạn instance, thông qua huấn luyện kết hợp và chia sẻ đặc trưng, đồng thời thu được hai loại đầu ra, rồi qua hậu xử lý nhẹ để hợp nhất chúng. Điều này không chỉ nâng cao hiệu quả, mà còn tăng cường tính nhất quán giữa ngữ nghĩa và instance.

Ở mức mô hình, cùng với sự phát triển của kiến trúc tích hợp phát hiện/phân đoạn và Transformer, đã xuất hiện các khung phân đoạn toàn cảnh thống nhất như Mask2Former: chúng có xu hướng sử dụng một bộ cấu trúc "query + mask decoder" tổng quát, đồng thời dự đoán mặt nạ ngữ nghĩa, instance và thậm chí các tác vụ downstream khác trong cùng một mạng, từ đó đơn giản hóa đáng kể hệ thống về mặt kiến trúc, thuận tiện cho mở rộng đa tác vụ. Đối với các tác vụ phức tạp như lái xe tự động, điều hướng robot, hiểu cảnh AR, phân đoạn toàn cảnh cung cấp một mô tả cảnh hoàn chỉnh gần hơn với "cảm nhận chủ quan của mắt người", cho phép ra quyết định và lập kế hoạch tầng trên diễn ra trên ngữ nghĩa không gian chính xác hơn.

Về hình thái sản phẩm, phân đoạn toàn cảnh thường được nhúng trong các hệ thống lái xe tự động, robot và nền tảng phân tích thị giác cao cấp, người dùng có thể không trực tiếp cảm nhận khái niệm "phân đoạn toàn cảnh", nhưng thực sự được hưởng lợi từ hiểu biết cảnh vững chắc hơn và trải nghiệm tương tác tự nhiên hơn.

### 2.4.2 Phân đoạn tổng quát và phân đoạn không giám sát: từ tùy chỉnh tác vụ đến "Segment Anything"

Các mô hình phân đoạn truyền thống thường được huấn luyện xoay quanh tập dữ liệu và tác vụ cụ thể: như "phân đoạn ngữ nghĩa 19 lớp cảnh đường phố", "phân đoạn một loại khối u nào đó", "phân đoạn một vài loại sản phẩm", v.v., mỗi lần đổi tác vụ lại phải gán nhãn lại, huấn luyện lại. Trong thực tế kinh doanh, cách phụ thuộc mạnh vào dữ liệu gán nhãn tinh này có chi phí rất lớn, và khó bao phủ các lớp đuôi dài cùng các kịch bản mới liên tục xuất hiện. Những năm gần đây, cùng với sự phát triển của mô hình thị giác tiền huấn luyện quy mô lớn và mô hình điều khiển bằng prompt (prompt-based), đã xuất hiện các **mô hình lớn phân đoạn tổng quát** với đại diện là **Segment Anything Model (SAM)**, cố gắng nâng cao năng lực phân đoạn từ "tùy chỉnh tác vụ" lên thành "hạ tầng cơ sở".

Lấy SAM làm ví dụ, nó học đặc trưng tổng quát của toàn ảnh thông qua một bộ mã hóa ảnh mạnh mẽ (thường là ViT tiền huấn luyện quy mô lớn), sau đó thông qua bộ mã hóa prompt nhẹ và bộ giải mã mặt nạ, chuyển đổi các prompt điểm, hộp, văn bản do người dùng cung cấp thành kết quả phân đoạn. Trong giai đoạn huấn luyện, SAM sử dụng lượng lớn chú thích mặt nạ đa nguồn, đa tác vụ, giúp mô hình học được "năng lực phân đoạn tổng quát hóa", chứ không phải học thuộc lòng nhãn của một tập dữ liệu nào đó; trong giai đoạn sử dụng, người dùng chỉ cần cung cấp rất ít prompt (một điểm hoặc một hộp thô), đã có thể thu được mặt nạ chất lượng cao trên nhiều loại ảnh và lớp vật thể chưa từng thấy. Mô hình này giảm đáng kể rào cản xây dựng ứng dụng phân đoạn mới, đồng thời cung cấp công cụ mạnh mẽ cho các kịch bản không giám sát/giám sát yếu.

Liên quan đến điều này là hướng **phân đoạn không giám sát / tự giám sát** rộng hơn: không phụ thuộc hoặc rất ít phụ thuộc vào mặt nạ thủ công, thông qua các tín hiệu như tính tương đồng nội tại trong ảnh, nhất quán thời gian, ràng buộc đa góc nhìn, tự động chia ảnh thành nhiều vùng có ý nghĩa. Các công trình ban đầu tập trung nhiều vào "phân cụm thị giác" và sinh đề xuất vùng (proposal generation), ngày nay được các mô hình lớn nội tại hóa thành một phương thức học biểu diễn, cung cấp khởi tạo tốt cho các tác vụ phân đoạn downstream. Kết hợp với các mô hình học tương phản văn bản–ảnh như CLIP, ngày càng nhiều phương pháp có thể thực hiện phân đoạn zero-shot hoặc few-shot trong điều kiện "chỉ cung cấp tên lớp văn bản, không cung cấp chú thích mặt nạ", mang lại giải pháp mới cho kịch bản khởi động nguội và lớp đuôi dài.

Trong sản phẩm thực tế, mô hình lớn phân đoạn tổng quát thường xuất hiện dưới dạng "công cụ cắt ghép tương tác", "vùng chọn thông minh", "xóa nền một chạm", và cũng dần được tích hợp vào phần mềm chuyên nghiệp trong các lĩnh vực y tế, viễn thám, công nghiệp, đóng vai trò là công cụ tăng tốc cho gán nhãn bán tự động và phân đoạn phụ trợ. So với mô hình tùy chỉnh truyền thống, chúng không nhất thiết đạt đến mức cực đoan trên một tác vụ cụ thể, nhưng có ưu thế rõ rệt ở khả năng "cái gì cũng làm được một chút, triển khai nhanh đa kịch bản", đồng thời đặt nền móng cho việc xây dựng mô hình thị giác nền tảng đa phương thức thực sự trong tương lai.## 2.5 Phát hiện điểm chính & Nhận dạng hành động (Keypoint Detection & Action Recognition)

Sau phân loại, phát hiện và phân đoạn, chúng ta đã có thể biết "trong ảnh có gì, ở đâu, mỗi pixel thuộc về đối tượng nào". Nhưng trong nhiều tác vụ thực tế, điều mà nghiệp vụ quan tâm không chỉ là "sự tồn tại và vị trí của đối tượng", mà còn là **tư thế và hành động**: một người đang đi bộ hay đang chạy? Bàn tay này có đang giơ lên, có đang thực hiện một cử chỉ nào đó không? Công nhân có đeo thiết bị bảo hộ đúng cách và thực hiện động tác theo quy chuẩn không? Động tác kỹ thuật của vận động viên có chuẩn không? Những câu hỏi này đòi hỏi chúng ta phải hiểu sâu hơn về **cấu trúc bên trong và sự thay đổi theo thời gian của đối tượng**.

Phát hiện điểm chính và nhận dạng hành động chính là hai tầng năng lực hướng tới nhu cầu này:

- **Phát hiện điểm chính (Keypoint Detection)**: Trên khung hình ảnh hoặc video, dự đoán một số "điểm khung xương" (như khớp, đầu ngón tay, ngũ quan) của đối tượng mục tiêu (thường là cơ thể người, bàn tay, khuôn mặt hoặc cấu trúc cơ khí cụ thể), thu được một biểu diễn tư thế có cấu trúc tinh vi (pose).
- **Nhận dạng hành động (Action Recognition)**: Phân tích sự thay đổi của các điểm chính hoặc đặc trưng ngoại hình theo thời gian trên chuỗi thời gian, phán đoán "người/nhóm người này đang thực hiện hành động hoặc hành vi gì".

Từ góc độ sản phẩm, năng lực này phục vụ rộng rãi cho: tương tác người-máy (điều khiển bằng cử chỉ), phân tích thể thao (đánh giá động tác kỹ thuật), an ninh (phát hiện té ngã, nhận dạng hành vi bất thường như đánh nhau/chạy), an toàn công nghiệp (phát hiện động tác vi phạm), điều khiển nhân vật ảo (dựa vào điểm chính cơ thể/khuôn mặt để điều khiển khung xương 3D và hoạt ảnh), v.v. Dưới đây, chúng ta sẽ hệ thống hóa tầng năng lực này từ ba góc độ **kịch bản**, **nguyên lý** và **mô hình**, đồng thời lần lượt triển khai chi tiết về phát hiện điểm chính và nhận dạng hành động trong các phần con.

- **Kịch bản**
  - Tương tác người-máy & AR/VR: Thông qua nhận dạng cử chỉ, phát hiện tư thế cơ thể, hiện thực hóa tương tác tự nhiên "làm động tác là điều khiển được", hoặc điều khiển nhân vật ảo theo thời gian thực trong AR/VR.
  - Huấn luyện thể thao & phân tích chuyển động: Theo dõi điểm chính và phân tích góc đối với các động tác như chạy, nhảy cao, ném bóng, cử tạ, đưa ra đánh giá động tác kỹ thuật và gợi ý sửa lỗi.
  - An ninh & an toàn công cộng: Phát hiện các hành vi bất thường như té ngã, đánh nhau, chạy mạnh, trèo qua hàng rào để cảnh báo kịp thời; nhận dạng thao tác có đúng quy chuẩn hay không trong công trường, nhà xưởng.
  - Công nghiệp & cộng tác người-máy: Phát hiện công nhân có thao tác theo tư thế quy chuẩn không, khoảng cách an toàn khi cộng tác với robot, có xuất hiện động tác nguy hiểm hay không.
  - Điều khiển khuôn mặt/biểu cảm & nhân vật ảo: Nắm bắt chi tiết biểu cảm thông qua điểm chính khuôn mặt, dùng cho chuyển đổi biểu cảm, điều khiển nhân vật số, nhân vật ảo trong hội nghị truyền hình, v.v.
- **Nguyên lý**
  Hai loại tác vụ lần lượt tập trung vào cấu trúc không gian và sự thay đổi theo thời gian, nhưng về bản chất đều là dự đoán có cấu trúc trong không gian đặc trưng chiều cao:
  - Phát hiện điểm chính: Định vị một tập hợp điểm chính được định nghĩa trước trên ảnh (như 17/25 khớp cơ thể người, 21 khớp bàn tay, 68/106 điểm chính khuôn mặt), cách làm phổ biến là dự đoán heatmap cho từng điểm chính trên bản đồ đặc trưng, sau đó suy ngược tọa độ thông qua vị trí đỉnh; trong kịch bản nhiều người, còn cần thực hiện "lắp ghép khớp vào người".
  - Nhận dạng hành động đơn khung/ngắn hạn: Dựa trên một ảnh đơn hoặc cửa sổ thời gian ngắn, thông qua tư thế cơ thể (điểm chính) và đặc trưng ngoại hình, phán đoán loại hành động xảy ra trong khung/đoạn đó (như đi, chạy, giơ tay, vẫy tay, ngồi xuống, v.v.).
  - Nhận dạng hành động theo chuỗi thời gian: Trên thang thời gian dài hơn, phân tích chuỗi đặc trưng (đặc trưng ảnh, chuỗi điểm chính hoặc optical flow, v.v.), mô hình hóa điểm bắt đầu, duy trì và kết thúc của hành động, nhận dạng các hành vi phức tạp như "đang gọi điện thoại", "đang chống đẩy", "hai người đang xô đẩy nhau".
  - Biểu diễn có cấu trúc: Chuỗi điểm chính cung cấp một biểu diễn có cấu trúc gọn hơn, ổn định hơn so với pixel thô, thuận tiện cho việc xử lý thay đổi góc nhìn, nhiễu nền và khác biệt ngoại hình trong nhận dạng hành động.
- **Mô hình**
  Các mô hình phổ biến đại thể phát triển theo mô hình thống nhất "trích xuất đặc trưng CNN/Transformer + đầu ra điểm chính/chuỗi thời gian":
  - Phát hiện điểm chính: Dòng OpenPose, Hourglass Network, HRNet, dựa trên hai nhánh chính là từ trên xuống (top-down, phát hiện người trước rồi ước lượng tư thế) và từ dưới lên (bottom-up, phát hiện khớp trước rồi lắp ghép); những năm gần đây cũng có các bộ ước lượng tư thế dựa trên Transformer.
  - Nhận dạng hành động video: Mô hình video dựa trên 2D/3D CNN (I3D, SlowFast, v.v.), mô hình GCN dựa trên khung xương (ST‑GCN, v.v., mô hình hóa trực tiếp quan hệ không gian-thời gian trên đồ thị điểm chính), cũng như giải pháp đầu cuối dựa trên Video Transformer (Video Swin, TimeSformer, v.v.).
  - Đa tác vụ thống nhất & mô hình lớn: Trên backbone thị giác tổng quát, đồng thời xuất ra nhãn phát hiện, phân đoạn, điểm chính và hành động, hoặc sử dụng mô hình lớn đa phương thức để thông qua gợi ý văn bản hiểu trực tiếp "người này đang làm hành động gì", kết nối dự đoán có cấu trúc với hiểu ngữ nghĩa.

Dưới đây, chúng ta sẽ lần lượt triển khai từ hai hướng: **phát hiện điểm chính & ước lượng tư thế** và **nhận dạng hành động & hiểu hành vi**.

### 2.5.1 Phát hiện điểm chính & ước lượng tư thế: "Vẽ khung xương" cho người và vật

Phát hiện điểm chính (thường còn được gọi là ước lượng tư thế, Pose Estimation) tập trung vào **cấu trúc không gian trong một khung đơn hoặc một ảnh đơn**: tìm một tập hợp điểm chính có ý nghĩa ngữ nghĩa trong ảnh 2D và kết nối chúng thành khung xương. Ví dụ, trong ước lượng tư thế cơ thể người, chúng ta thường cần phát hiện các khớp như đầu, vai, khuỷu tay, cổ tay, hông, đầu gối, mắt cá chân; trong tư thế khuôn mặt là khóe mắt, khóe miệng, chóp mũi, đường viền mặt, v.v.; trong tư thế bàn tay là gốc ngón tay, khớp ngón tay, đầu ngón tay. Đối với các đối tượng phi cơ thể người như cánh tay robot, các bộ phận kết cấu khớp, cũng có thể định nghĩa một hệ thống điểm chính tương tự.

Về thiết kế mô hình, phát hiện điểm chính thường sử dụng mô hình **"trích xuất đặc trưng + dự đoán heatmap"**:

- Trước tiên, sử dụng CNN hoặc Vision Transformer (như ResNet, HRNet, Swin, v.v.) để trích xuất đặc trưng đa tỉ lệ từ ảnh đầu vào.
- Sau đó, thông qua một đầu giải mã hoặc tích chập nhiều tầng, xuất ra một heatmap cho mỗi loại điểm chính, trong đó mỗi giá trị pixel biểu thị "khả năng vị trí đó là điểm chính đó".
- Trong giai đoạn suy luận, thường lấy vị trí đỉnh của mỗi heatmap làm tọa độ điểm chính, và thực hiện tối ưu hóa ở mức sub-pixel thông qua nội suy song tuyến, khớp cục bộ, v.v.

Đối với kịch bản nhiều người, các phương pháp ước lượng tư thế đại thể chia thành hai hướng:

- **Từ trên xuống (Top-down)**: Trước tiên sử dụng bộ phát hiện người đi bộ để tìm hộp giới hạn của từng người trong ảnh, sau đó thực hiện ước lượng tư thế đơn người riêng biệt cho ảnh trong từng hộp. Cách này có độ chính xác đơn người cao, khung đơn giản, nhưng trong kịch bản đông người chi phí tính toán lớn, nhạy cảm với chất lượng phát hiện. Các hệ thống tiêu biểu bao gồm nhiều tổ hợp dựa trên Faster R‑CNN/YOLO + Hourglass/HRNet.
- **Từ dưới lên (Bottom-up)**: Không phân biệt từng người trước, mà dự đoán trực tiếp tất cả các điểm chính tiềm năng (và loại của chúng) trên toàn ảnh, đồng thời dự đoán quan hệ kết nối hoặc trường liên kết giữa các điểm chính (như PAF của OpenPose). Sau đó, thông qua thuật toán khớp đồ thị/phân cụm, lắp ghép các điểm chính thành nhiều khung xương cơ thể người độc lập. Các phương pháp loại này hiệu quả hơn trong kịch bản đông người, bền vững hơn với quy mô số lượng người, nhưng quá trình lắp ghép phức tạp, nhạy cảm với chất lượng kết nối.

Những năm gần đây, các mô hình ước lượng tư thế dựa trên Transformer cũng dần xuất hiện, coi phát hiện điểm chính như một tác vụ "truy vấn-phản hồi", tương tự như DETR, có thể thống nhất phát hiện đối tượng và ước lượng tư thế trên cùng một kiến trúc. Trong ứng dụng kỹ thuật, năng lực phát hiện điểm chính thường được đóng gói thành "SDK hoặc API điểm chính cơ thể/cử chỉ/khuôn mặt", ứng dụng upstream chỉ cần truyền vào ảnh hoặc khung hình video là có thể nhận được tọa độ khung xương có cấu trúc, dùng cho nhận dạng hành động, điều khiển tương tác hoặc điều khiển hoạt ảnh tiếp theo.

### 2.5.2 Nhận dạng hành động & hiểu hành vi: Làm cho "khung xương" chuyển động

Sau khi có được điểm chính hoặc đặc trưng thị giác cấp cao, bước tiếp theo là hiểu **sự thay đổi trên chiều thời gian** — tức là nhận dạng hành động (Action Recognition) và phân tích hành vi (Behavior Understanding). Khác với phát hiện điểm chính, nhận dạng hành động không còn giới hạn trong một khung đơn; nó quan tâm đến mô hình diễn biến của đặc trưng trong một khoảng thời gian: từ "giơ tay" đến "vẫy tay", từ "đi bộ" đến "chạy", từ "đứng" đến "té ngã".

Về biểu diễn đầu vào, đại thể có ba hướng:

- **Dựa trên khung hình video gốc / optical flow**: Mô hình hóa trực tiếp chuỗi khung hình video, hoặc bổ sung thêm optical flow (trường mô tả vận tốc chuyển động cục bộ) làm đầu vào, để mô hình học kết hợp từ thông tin ngoại hình + chuyển động.
- **Dựa trên chuỗi khung xương/điểm chính**: Trước tiên dùng ước lượng tư thế để thu được chuỗi tọa độ điểm chính cơ thể người, sau đó mô hình hóa trên "đồ thị khung xương không gian-thời gian", làm yếu nhiễu nền và ánh sáng, tập trung hơn vào cấu trúc cơ thể và mô hình chuyển động.
- **Kết hợp đa phương thức**: Kết hợp đặc trưng video, chuỗi điểm chính, thậm chí cả âm thanh, văn bản, v.v. vào cùng một mô hình, xử lý các kịch bản hành vi phức tạp (như tương tác nhiều người, hành động cấp sự kiện).

Tương ứng, cấu trúc mô hình cũng phát triển đa dạng:

- Thời kỳ đầu, nhận dạng hành động chủ yếu dựa vào **2D CNN + pooling thời gian** hoặc **3D CNN** (như I3D, C3D): cái trước trích xuất đặc trưng cho từng khung rồi thực hiện pooling hoặc RNN trên chiều thời gian; cái sau thực hiện tích chập ba chiều trực tiếp trên không gian và thời gian, nắm bắt mô hình chuyển động ngắn hạn.
- Đối với chuỗi khung xương, phương pháp điển hình là **mạng tích chập đồ thị không gian-thời gian (ST‑GCN)**: coi điểm chính cơ thể người như các nút của cấu trúc đồ thị, kết nối giữa các khớp là cạnh, cũng kết nối cạnh trên chiều thời gian, thông qua tích chập đồ thị lan truyền thông tin trên đồ thị không gian-thời gian, từ đó học mô hình hành động. Các phương pháp loại này nhẹ, bền vững với nền, phù hợp triển khai trên thiết bị có tài nguyên hạn chế.
- Những năm gần đây, **Video Transformer** (như TimeSformer, Video Swin) thể hiện xuất sắc trong nhận dạng hành động, chúng chia video thành các patch không gian-thời gian, thông qua cơ chế tự chú ý mô hình hóa phụ thuộc dài hạn, có khả năng nắm bắt tốt hơn các hành động phức tạp và tương tác nhiều đối tượng.

Về phía nghiệp vụ, nhận dạng hành động thường được kết hợp với phát hiện, theo dõi, phát hiện điểm chính để tạo thành hệ thống phân tích hành vi đầu cuối:

- Trong an ninh, trước tiên phát hiện và theo dõi người, sau đó phân loại hành động trên chuỗi điểm chính của từng quỹ đạo, thực hiện phát hiện té ngã, nhận dạng đánh nhau/chạy, v.v.;
- Trong ứng dụng thể thao và fitness, thông qua chuỗi điểm chính phân tích động tác có chuẩn không, biên độ có phù hợp không, và đưa ra gợi ý sửa lỗi;
- Trong kịch bản tương tác người-máy, thực hiện phân loại hành động nhẹ trên luồng tư thế thời gian thực, hiện thực hóa các tương tác như vẫy tay, làm hình trái tim, lệnh cử chỉ, v.v.;
- Trong an toàn công nghiệp, giám sát liên tục động tác thao tác của công nhân, nhận dạng tư thế nguy hiểm (như cúi người vào khu vực nguy hiểm, vượt qua đường an toàn, v.v.).

Hướng tới tương lai, các mô hình lớn đa phương thức đang nâng tầm "nhận dạng hành động" lên thành "hiểu sự kiện và ý định" ở cấp độ cao hơn: mô hình không chỉ có thể gán nhãn "đi bộ, chạy, gọi điện thoại", mà còn có thể trả lời "người này dường như đang ra hiệu chào ai đó", "hai người này đang xảy ra tranh cãi", v.v. — những mô tả gần gũi hơn với ngôn ngữ hàng ngày. Phát hiện điểm chính và nhận dạng hành động, với tư cách là những manh mối chuyển động có cấu trúc quan trọng, cùng với đặc trưng ngoại hình và gợi ý ngôn ngữ, sẽ cùng nhau hỗ trợ năng lực hiểu không gian-thời gian phức tạp hơn.## 2.6 Phát hiện Từ vựng Mở / Thế giới Mở / Miền Mở

(Open‑Vocabulary / Open‑World / Open‑Domain Detection)

Các khả năng phát hiện và phân đoạn phía trước về cơ bản đều mặc định một tiền đề: **tập hợp danh mục trong quá trình huấn luyện và suy luận là cố định**. Nói cách khác, mô hình đã "nhìn thấy" toàn bộ "tất cả các danh mục cần nhận dạng" trong giai đoạn huấn luyện, và khi suy luận chỉ cần chọn trong tập nhãn đóng này. Nhưng thế giới thực phức tạp hơn nhiều so với tập dữ liệu: sản phẩm mới, thương hiệu mới, biển báo mới, loài mới, bối cảnh mới xuất hiện bất cứ lúc nào, và không thể chuẩn bị đủ dữ liệu gán nhãn cho từng lớp mới để huấn luyện lại bộ phát hiện. Điều này thúc đẩy sự ra đời của **Phát hiện Từ vựng Mở / Thế giới Mở / Miền Mở**: trong điều kiện dữ liệu huấn luyện chỉ bao phủ một số lượng hữu hạn "lớp đã biết", cho phép mô hình vẫn có thể cảm nhận, định vị và nhận dạng **các lớp mới chưa từng thấy** trong quá trình suy luận, đồng thời duy trì tính bền vững khi phong cách hình ảnh và miền chụp (domain) thay đổi.

Bạn có thể hiểu tầng này là: trên nền tảng phát hiện truyền thống, bổ sung "khả năng căn chỉnh và tổng quát hóa với không gian ngôn ngữ và thế giới mở". Mô hình không còn chỉ biết nói "đây là một trong 80 lớp COCO", mà có thể hiểu và truy xuất đối tượng trong không gian mô tả văn bản tùy ý, ví dụ như "phát hiện tất cả 'giày thể thao màu đỏ' trong ảnh", "đánh dấu tất cả 'vật thể bay nghi ngờ'", ngay cả khi những danh mục tinh tế này chưa từng xuất hiện rõ ràng trong tập huấn luyện. Dưới đây chúng ta sẽ tổ chức tầng này từ ba góc độ: **bối cảnh**, **nguyên lý** và **mô hình**, và lần lượt triển khai phát hiện từ vựng mở, phát hiện thế giới mở và tổng quát hóa miền mở trong các tiểu mục.

- **Bối cảnh**
  - API hiểu bối cảnh tổng quát: người dùng đưa ra mô tả ngôn ngữ tự nhiên tùy ý (từ danh mục hoặc câu ngắn), hệ thống trả về hộp phát hiện hoặc mặt nạ phân đoạn tương ứng trong ảnh với phong cách bất kỳ, ví dụ như "tất cả mũ bảo hiểm trong ảnh", "tất cả logo thương hiệu nghi ngờ", "tất cả vật thể có bánh xe".
  - Nhận dạng sản phẩm / loài quy mô lớn: các sản phẩm đuôi dài liên tục được thêm mới trong thương mại điện tử, số lượng lớn các loài động thực vật trong tự nhiên, dữ liệu huấn luyện chỉ có thể bao phủ một phần lớp đã biết, nhưng hệ thống cần định vị và nhận dạng thô cho lượng lớn lớp mới, đồng thời hỗ trợ truy xuất qua văn bản hoặc hình ảnh.
  - An ninh / cảm biến tự lái xuyên miền: dữ liệu huấn luyện phần lớn đến từ đường phố ban ngày / một vài góc camera, nhưng triển khai thực tế lại đối mặt với "miền mới" như thành phố khác, nông thôn, cao tốc, thời tiết khắc nghiệt, camera hồng ngoại/mắt cá, trong đó còn xuất hiện các loại đối tượng mới chưa từng được gán nhãn trong tập huấn luyện (mẫu xe mới, thiết bị giao thông mới, loại chướng ngại vật mới).
- **Nguyên lý**
  Cốt lõi của các phương pháp này là sử dụng **không gian nhúng căn chỉnh thị giác–ngôn ngữ** thay thế cho "đầu danh mục one‑hot cố định" truyền thống, và xử lý "lớp chưa thấy" và "miền mới" thông qua nhiều cơ chế:
  - Phát hiện Từ vựng Mở (Open‑Vocabulary Detection): trong giai đoạn huấn luyện, sử dụng các cặp ảnh–văn bản quy mô lớn (image–text pairs) để huấn luyện trước thu được không gian căn chỉnh tương tự như CLIP, khiến cho vùng ảnh và nhúng văn bản có thể khớp tương đồng trực tiếp trong cùng một không gian ngữ nghĩa; đầu phát hiện không còn xuất ra logit danh mục cố định, mà xuất ra một vector đặc trưng vùng, so sánh với vector mô tả văn bản tùy ý, từ đó hỗ trợ "huấn luyện chỉ thấy một phần danh mục, suy luận có thể chỉ định danh mục văn bản tùy ý".
  - Phát hiện Thế giới Mở (Open‑World Detection): tiến thêm một bước xử lý "lớp mới hoàn toàn không được gán nhãn trong tập huấn luyện", yêu cầu mô hình có thể phát hiện loại đối tượng này là "lớp chưa biết (unknown)", và sau đó thông qua gán nhãn tương tác hoặc học liên tục, từng bước đưa các lớp chưa biết này vào tập danh mục đã biết, hình thành một hệ thống học trực tuyến có thể liên tục mở rộng danh mục.
  - Phát hiện Miền Mở / Xuyên miền (Open‑Domain Detection): đối mặt với sự thay đổi lớn về phong cách hình ảnh, thiết bị chụp ảnh, điều kiện môi trường (domain shift), thông qua các kỹ thuật như Thích ứng Miền (Domain Adaptation), Tổng quát hóa Miền (Domain Generalization), giúp bộ phát hiện duy trì hiệu suất phát hiện ổn định trong miền mới chưa từng thấy; các phương tiện phổ biến bao gồm căn chỉnh miền đối kháng, huấn luyện đa miền, ngẫu nhiên hóa phong cách, meta‑learning, v.v.
  - Phân đoạn và phát hiện từ vựng mở hợp nhất: mở rộng các ý tưởng trên xuống cấp độ pixel, tạo mặt nạ phân đoạn cho mô tả văn bản tùy ý (open‑vocabulary segmentation), thông qua tổn thất căn chỉnh Region–Word hoặc Mask–Word, thực hiện "dùng ngôn ngữ tự nhiên mô tả một vùng/vật thể, là có thể nhận được mask hoặc hộp tương ứng".
- **Mô hình**
  Lộ trình kỹ thuật chủ đạo hiện nay cho phát hiện từ vựng mở / thế giới mở / miền mở về cơ bản xoay quanh "huấn luyện trước thị giác–ngôn ngữ quy mô lớn + thích ứng đầu phát hiện + cơ chế tổng quát hóa miền":
  - Bộ phát hiện dựa trên CLIP: lấy bộ mã hóa hình ảnh và bộ mã hóa văn bản theo phong cách CLIP làm nền tảng, áp dụng học tương phản và tổn thất căn chỉnh Region–Word giữa đặc trưng cấp vùng (ROI, patch bản đồ đặc trưng, vùng mask) và nhúng văn bản; triển khai điển hình bao gồm thay thế hoặc mở rộng đầu phân loại trên các kiến trúc như Faster R‑CNN / RetinaNet / YOLO / DETR, để nó xuất ra điểm số danh mục theo cách "tương đồng cosine + nhúng văn bản".
  - Phát hiện dựa trên Caption / Prompt: sử dụng dữ liệu mô tả ảnh–văn bản quy mô lớn (caption), tự động tạo mô tả văn bản cho các vùng hoặc mask trong ảnh, sau đó dùng các văn bản tự động sinh này để căn chỉnh huấn luyện với vùng phát hiện/phân đoạn, từ đó giảm sự phụ thuộc vào nhãn danh mục thủ công; khi suy luận thì thông qua prompt ngôn ngữ tự nhiên (như "tất cả người mặc áo đỏ", "tất cả xe điện") để điều khiển phát hiện/phân đoạn.
  - Dòng công trình Phát hiện Thế giới Mở: giới thiệu rõ ràng mô hình hóa "lớp chưa biết (unknown)", mở rộng danh mục tiến bộ và cơ chế học tăng dần trong khuôn khổ phát hiện truyền thống, một phần phương pháp thông qua khoảng cách không gian số đo và ước lượng độ không chắc chắn để phán đoán "có phải là lớp chưa biết hay không", một phần khác giới thiệu ngân hàng bộ nhớ và huấn luyện lại trực tuyến, giúp hệ thống tích lũy kiến thức lớp mới theo thời gian.
  - Phát hiện thích ứng miền / tổng quát hóa miền: thêm các mô-đun như bộ phân biệt miền, tổn thất đối kháng, batch normalization đa miền, tăng cường ngẫu nhiên hóa phong cách ở cấp Backbone và đầu phát hiện, giúp bộ phát hiện học được biểu diễn bất biến miền hơn giữa các miền khác nhau; cũng có công trình giới thiệu huấn luyện đa miền nguồn và chiến lược meta‑learning trên khuôn khổ phát hiện Transformer (như Deformable DETR), nâng cao khả năng tổng quát hóa xuyên miền.
  - Mô hình phát hiện Tổng quát / Foundation: nâng bài toán phát hiện lên cấp độ "mô hình nền tảng", huấn luyện trước một Mô hình Nền tảng Phát hiện (Detection Foundation Model) tổng quát nhất có thể về danh mục và miền, sau đó thích ứng với bối cảnh cụ thể thông qua tinh chỉnh nhẹ hoặc prompt văn bản; loại mô hình này thường kết hợp gán nhãn phát hiện quy mô lớn, cặp ảnh–văn bản đa nguồn, thậm chí dữ liệu video, với mục tiêu làm cho việc hiểu tổng quát "văn bản tùy ý + ảnh phong cách tùy ý" trở nên khả thi.

Về hình thái sản phẩm cụ thể, phát hiện từ vựng mở/thế giới mở/miền mở thường thể hiện dưới dạng giao diện thị giác "tự nhiên hơn, ít hạn chế hơn": người dùng không cần phải thỏa thuận trước một tập nhãn cố định nhỏ, mà có thể dùng ngôn ngữ tự nhiên để mô tả đối tượng muốn tìm; hệ thống cũng không cần huấn luyện lại bộ phát hiện từ đầu cho từng bối cảnh nghiệp vụ, mà dựa trên mô hình tổng quát thống nhất, thích ứng nhanh thông qua prompt hoặc một vài mẫu. Đối với các hệ thống nhận dạng sản phẩm / loài quy mô lớn, hệ thống an ninh và cảm biến tự lái triển khai toàn cầu, khả năng ở tầng này đang trở thành bước đệm then chốt để chuyển từ "hiệu suất trên tập dữ liệu đóng" sang "tính khả dụng trong thế giới mở thực sự".

### 2.6.1 Phát hiện Từ vựng Mở: từ đầu danh mục cố định đến không gian danh mục điều khiển bởi văn bản

**Điểm xuất phát của Phát hiện Từ vựng Mở (Open‑Vocabulary Detection) là phá vỡ giới hạn "đầu danh mục cố định" trong phát hiện truyền thống. Các bộ phát hiện trước đây gắn một lớp phân loại kích thước cố định ở đỉnh (tương ứng với N danh mục trong tập huấn luyện), sau khi huấn luyện xong chỉ có thể chọn trong N danh mục này; còn phát hiện từ vựng mở thì thông qua việc giới thiệu bộ mã hóa văn bản và không gian nhúng ngữ nghĩa chia sẻ** , **cho phép đặc trưng vùng do đầu phát hiện xuất ra có thể so sánh tương đồng với mô tả văn bản tùy ý**, từ đó tiếp nhận các danh mục mới chưa từng thấy trong quá trình suy luận.

Cách làm điển hình là sử dụng mô hình huấn luyện trước thị giác–ngôn ngữ tương tự CLIP:

- Phía văn bản: mã hóa tên danh mục hoặc mô tả ngôn ngữ tự nhiên (như "person", "red sports car", "yellow construction helmet"), thu được vector văn bản.
- Phía thị giác: trong khuôn khổ phát hiện (Faster R‑CNN, RetinaNet, YOLO, DETR, v.v.), trích xuất vector đặc trưng vùng cho từng vùng ứng viên hoặc điểm đặc trưng.
- Huấn luyện căn chỉnh: thông qua tổn thất tương phản, tổn thất căn chỉnh Region–Word, làm cho văn bản và đặc trưng vùng có cùng ngữ nghĩa gần nhau trong không gian nhúng, còn vector có ngữ nghĩa khác nhau thì xa nhau. Trong quá trình huấn luyện, ngay cả khi chỉ cung cấp gán nhãn hộp rõ ràng cho một phần danh mục, vẫn có thể tận dụng cặp ảnh–văn bản hoặc caption ảnh để mở rộng phạm vi ngữ nghĩa.

Giai đoạn suy luận, hệ thống không còn phụ thuộc vào tập tên lớp cố định lúc huấn luyện, mà cho phép người dùng cung cấp trực tuyến từ danh mục hoặc mô tả ngôn ngữ tự nhiên tùy ý, chuyển thành nhúng qua bộ mã hóa văn bản, rồi so khớp tương đồng với đặc trưng vùng. Điều này giúp bộ phát hiện có thể hỗ trợ các nhu cầu linh hoạt như "phát hiện tất cả ván trượt", "phát hiện tất cả cây xanh", "phát hiện tất cả thiết bị liên quan đến an toàn" mà không cần huấn luyện lại, ngay cả khi một số danh mục cụ thể chưa từng xuất hiện gán nhãn đầy đủ trong tập huấn luyện, chỉ cần có sự chồng lấn ngữ nghĩa với không gian ảnh–văn bản đã huấn luyện trước, là có thể được nhận dạng và định vị ở mức độ nhất định.

Trong thực tiễn kỹ thuật, phát hiện từ vựng mở cần cân bằng giữa hiệu quả và hiệu suất: một mặt, duy trì căn chỉnh ngữ nghĩa với Backbone thị giác–ngôn ngữ được huấn luyện trước quy mô lớn; mặt khác, phải đáp ứng yêu cầu đa tỷ lệ và thời gian thực của tác vụ phát hiện. Các bộ phát hiện dựa trên CLIP chủ đạo thường áp dụng cách "tính toán trước nhúng văn bản + tính toán tương đồng vector hiệu quả", tránh mã hóa văn bản lặp lại trong dịch vụ trực tuyến, đồng thời lượng tử hóa hoặc chắt lọc đặc trưng vùng, cân bằng giữa độ chính xác và tốc độ suy luận.

### 2.6.2 Phát hiện Thế giới Mở: từ "lớp chưa thấy" đến "cái chưa biết có thể học được"

**Phát hiện Thế giới Mở (Open‑World Detection) trên cơ sở từ vựng mở, tiến thêm một bước yêu cầu mô hình xử lý rõ ràng "lớp chưa biết"** : dữ liệu huấn luyện chỉ gán nhãn một phần danh mục, các vật thể còn lại hoặc không được gán nhãn, hoặc bị gộp chung thành nền; khi suy luận, những "vật thể thực chưa được gán nhãn" này không nên bị coi đơn giản là nền, cũng không nên bị phân loại sai vào danh mục đã biết, mà nên được phát hiện như "lớp chưa biết (unknown)", và có khả năng chuyển đổi sau này thành "lớp đã biết mới".

Về mặt mô hình hóa, phát hiện thế giới mở thường cần giải quyết ba vấn đề:

1. **Cảm nhận lớp chưa biết**: làm thế nào để trong giai đoạn huấn luyện tránh học tất cả các đối tượng chưa gán nhãn thành "nền"? Cách làm phổ biến bao gồm: giới thiệu khe "lớp chưa biết" rõ ràng, thông qua khai thác mẫu âm và mô hình hóa độ không chắc chắn để mô hình học cách xuất ra "unknown" ở vùng có độ tin cậy thấp; hoặc sử dụng dữ liệu không gán nhãn và cơ chế tự giám sát, phân cụm và tạo nhãn giả cho các vùng đối tượng tiềm năng có độ tin cậy cao.
2. **Kiểm soát phân loại sai**: mô hình cần cân bằng giữa "thà phán đoán là unknown, còn hơn phân loại sai vào lớp đã biết sai", điều này liên quan đến thiết kế tổn thất (như margin, phân biệt tập mở), ngưỡng quyết định và chiến lược hậu xử lý.
3. **Mở rộng danh mục tiến bộ**: khi phía nghiệp vụ gán nhãn thủ công một lớp mới cho một lô đối tượng "unknown", mô hình cần có khả năng thông qua học tăng dần để đưa các lớp mới này vào tập "lớp đã biết", mà không quên đáng kể các lớp cũ. Vì vậy, nhiều công trình đã giới thiệu ngân hàng bộ nhớ, tổn thất chắt lọc, cô lập tham số hoặc cơ chế phát lại, để đạt được sự hấp thụ ổn định các lớp mới.

Từ góc nhìn sản phẩm, phát hiện thế giới mở đặc biệt phù hợp với các bối cảnh **danh mục liên tục tăng trưởng, đuôi dài cực kỳ nghiêm trọng**, ví dụ như nhận dạng loài tự nhiên, nhận dạng sản phẩm mới ra mắt nhanh chóng, phát hiện đối tượng bất thường trong bối cảnh an ninh phức tạp, v.v. Hệ thống có thể trước tiên dùng phát hiện thế giới mở để đánh dấu "bất kỳ đối tượng khả nghi không phải nền", rồi từng bước thông qua gán nhãn thủ công hoặc bán tự động, nâng cấp các cụm có giá trị trong đó thành danh mục chính thức, từ đó hình thành một hệ thống phát hiện "danh mục có thể tăng trưởng bền vững", thay vì bị ràng buộc bởi tập dữ liệu cố định.

### 2.6.3 Phát hiện Miền Mở / Phân phối Mở: tính bền vững xuyên phong cách, xuyên thiết bị, xuyên bối cảnh

Ngay cả khi tập danh mục không thay đổi, bộ phát hiện vẫn sẽ gặp phải **Dịch chuyển Miền (Domain Shift)** nghiêm trọng trong triển khai thực tế: dữ liệu huấn luyện có thể đến từ camera HD ban ngày của một vài thành phố, trong khi môi trường triển khai lại bao gồm các quốc gia khác nhau, nông thôn, cao tốc, hầm đường, ban đêm, mưa tuyết, camera độ phân giải thấp, ống kính mắt cá thậm chí chụp ảnh hồng ngoại; giữa chụp ảnh sản phẩm thương mại điện tử với ảnh chụp thực tế của người dùng, ảnh quảng cáo/minh họa/phong cách hoạt hình cũng tồn tại sự khác biệt rất lớn. **Phát hiện Miền Mở (Open‑Domain Detection)** chính là tập trung vào việc: trong điều kiện phân phối hình ảnh thay đổi đáng kể, duy trì hiệu suất phát hiện ổn định và đáng tin cậy.

Các lộ trình kỹ thuật điển hình bao gồm:

- **Thích ứng Miền (Domain Adaptation)**: với tiền đề có dữ liệu không gán nhãn hoặc một lượng nhỏ dữ liệu gán nhãn của miền đích, thông qua căn chỉnh miền đối kháng (làm nhiễu loạn miền nguồn/miền đích trong không gian đặc trưng), căn chỉnh miền đa cấp (phong cách ảnh, đặc trưng, đầu ra đầu phát hiện), chuyển dịch phong cách (như chuyển dịch phong cách ảnh miền nguồn sang miền đích), giúp mô hình học được đặc trưng không nhạy cảm với miền.
- **Tổng quát hóa Miền (Domain Generalization)**: trong điều kiện chỉ có dữ liệu nhiều miền nguồn, không có dữ liệu miền đích, sử dụng huấn luyện đa miền, ngẫu nhiên hóa phong cách, nhiễu loạn đặc trưng, meta‑learning và các phương tiện khác, giúp mô hình trong giai đoạn huấn luyện được tiếp xúc tối đa với phân phối đa dạng, nâng cao khả năng tổng quát hóa đối với miền mới chưa biết.
- **Mô hình phát hiện Tổng quát / Foundation**: thông qua huấn luyện trước Backbone phát hiện và cấu trúc đầu trên dữ liệu cực lớn, đa nguồn, đa phong cách (bao gồm ảnh tự nhiên, khung hình video, dữ liệu tổng hợp, dữ liệu xuyên phương thức, v.v.), sau đó tinh chỉnh nhẹ trong bối cảnh nghiệp vụ cụ thể, từ đó đạt được tính bền vững miền mở mạnh hơn so với "huấn luyện đơn miền".

Các cơ chế miền mở này thường được xếp chồng với khả năng từ vựng mở/thế giới mở: một hệ thống phát hiện tổng quát hướng đến thế giới thực, vừa phải hiểu được mô tả danh mục ngôn ngữ tự nhiên của người dùng (từ vựng mở), vừa phải đưa ra phán đoán "chưa biết" hợp lý và hấp thụ tiến bộ cho các đối tượng mới xuất hiện (thế giới mở), lại vừa phải duy trì hiệu suất ở các quốc gia, thiết bị, thời tiết và phong cách khác nhau (miền mở). Trong triển khai kỹ thuật thực tế, ba điều này không phải là các hướng nghiên cứu cô lập với nhau, mà cùng nhau tạo thành tổ hợp khả năng then chốt để chuyển từ "benchmark đóng" sang "khả dụng trong thế giới mở".## 2.7 Tác vụ Thị giác–Ngôn ngữ (Vision–Language Tasks)

Các chương trước chủ yếu xoay quanh "thị giác đơn phương thức": đầu vào là một hình ảnh, đầu ra là khung phát hiện, mặt nạ phân đoạn, nhãn danh mục hoặc điểm chất lượng. Nhưng trong nhiều ứng dụng thực tế, thông tin thị giác không tồn tại độc lập — một bức ảnh thường đi kèm với tiêu đề, chú thích, hội thoại hoặc truy vấn tìm kiếm; người dùng muốn hỏi "bức ảnh này nói về điều gì", "bức ảnh này có khớp với câu văn này không". **Tác vụ thị giác–ngôn ngữ** chính là để giải quyết loại vấn đề này: chúng nhận hình ảnh + văn bản làm đầu vào hoặc đầu ra, thông qua **căn chỉnh đa phương thức và mô hình hóa liên kết**, giúp hệ thống có thể "nhìn ảnh và mô tả", "nhìn ảnh và trả lời câu hỏi", "dùng văn bản tìm ảnh / dùng ảnh tìm văn bản".

Từ góc nhìn sản phẩm, mô hình thị giác–ngôn ngữ (VLM) là năng lực trung tâm của các hệ thống đa phương thức: công cụ tìm kiếm dựa vào nó để thực hiện "tìm ảnh bằng văn bản / tìm văn bản bằng ảnh"; nền tảng nội dung dùng nó để ghép ảnh thông minh, kiểm duyệt quảng cáo, kiểm tra tính nhất quán giữa ảnh và văn bản; trợ lý đa phương thức thì coi nó như năng lực nền tảng để thực hiện các chức năng như "trò chuyện về ảnh", "đặt câu hỏi về tài liệu/ảnh chụp màn hình". Dưới đây, chúng ta sẽ hệ thống hóa tầng này từ ba góc độ: **kịch bản**, **nguyên lý** và **mô hình**, rồi lần lượt triển khai chi tiết về mô tả hình ảnh, trả lời câu hỏi thị giác và truy xuất ảnh–văn bản trong các phần tiếp theo.

- **Kịch bản**
  - Mô tả hình ảnh (Image Captioning): tự động tạo một hoặc hai câu mô tả bằng ngôn ngữ tự nhiên cho hình ảnh, dùng cho đọc phụ trợ trợ năng, chú thích album ảnh thông minh, làm phong phú chỉ mục tìm kiếm.
  - Trả lời câu hỏi thị giác (VQA): người dùng đặt câu hỏi bằng ngôn ngữ tự nhiên về hình ảnh ("người này đang cầm gì?", "biển số xe là bao nhiêu?"), hệ thống đưa ra câu trả lời chính xác, có thể dùng cho giáo dục, hỗ trợ quyết định và trợ lý đa phương thức.
  - Truy xuất ảnh–văn bản (Cross‑modal Retrieval): dùng văn bản truy xuất hình ảnh liên quan (Text‑to‑Image), dùng hình ảnh truy xuất văn bản liên quan (Image‑to‑Text), hỗ trợ tìm kiếm "tìm ảnh bằng văn bản / tìm văn bản bằng ảnh", chọn ảnh sáng tạo và kiểm duyệt quảng cáo.
  - Tính nhất quán ảnh–văn bản và kiểm duyệt: đánh giá xem hình ảnh có khớp với tiêu đề/khẩu hiệu quảng cáo hay không, có rủi ro "ảnh không khớp với văn bản", "mô tả gây hiểu lầm" hay không, dùng cho kiểm duyệt nội dung và an toàn thương hiệu.
- **Nguyên lý**
  Vấn đề cốt lõi là: làm thế nào để ánh xạ hình ảnh và văn bản vào **cùng một không gian ngữ nghĩa**, và thực hiện căn chỉnh và suy luận trong không gian đó:
  - Căn chỉnh đa phương thức: thông qua bộ mã hóa hình ảnh và bộ mã hóa văn bản được huấn luyện chung, khiến các cặp "ảnh–văn bản" tương ứng gần nhau trong không gian biểu diễn, còn các cặp không liên quan thì xa nhau (điển hình như CLIP); điều này tạo nền tảng cho truy xuất và khớp nối.
  - Hiểu và sinh liên kết: trên cơ sở biểu diễn đã căn chỉnh, đưa vào cơ chế chú ý đa phương thức, để mô hình ngôn ngữ tạo văn bản (mô tả hình ảnh), suy luận và trả lời câu hỏi (VQA) trong khi "nhìn vào đặc trưng hình ảnh".
  - Gợi ý hóa và chỉ dẫn hóa: dùng chỉ thị ngôn ngữ tự nhiên để mô tả thống nhất nhiều tác vụ thị giác–ngôn ngữ ("viết tiêu đề cho bức ảnh này", "trả lời câu hỏi về bức ảnh này", "đánh giá xem đoạn văn bản này có mô tả đúng bức ảnh không"), để một mô hình duy nhất có thể hoàn thành nhiều tác vụ thông qua các gợi ý khác nhau.
- **Mô hình**
  Các mô hình thị giác–ngôn ngữ chủ đạo hiện nay đại khái phát triển thành hai loại: **VLM học tương phản** và **mô hình lớn đa phương thức sinh**:
  - Loại học tương phản: CLIP, ALIGN, v.v., mã hóa hình ảnh và văn bản thành vector riêng biệt, thông qua huấn luyện quy mô lớn trên các cặp ảnh–văn bản, thể hiện xuất sắc trong các tác vụ truy xuất và khớp nối, là nền tảng của "tìm ảnh bằng văn bản / tìm văn bản bằng ảnh".
  - Mô hình sinh thị giác–ngôn ngữ: BLIP / BLIP‑2, Flamingo, Kosmos, LLaVA, v.v., kết nối bộ mã hóa thị giác với mô hình ngôn ngữ lớn (LLM), thông qua cơ chế chú ý đa phương thức và tinh chỉnh theo chỉ thị, hỗ trợ các tác vụ phức tạp như mô tả hình ảnh, VQA, hội thoại nhiều vòng.
  - Mô hình lớn đa phương thức tổng quát: như GPT‑4.1 with Vision, Gemini 1.5, v.v., tiến thêm một bước thống nhất thị giác với nhiều phương thức khác (giọng nói, mã nguồn, v.v.) trong cùng một mô hình lớn, thông qua giao diện thống nhất để hoàn thành truy xuất, trả lời câu hỏi, suy luận và sinh.

Nhìn chung, tác vụ thị giác–ngôn ngữ đánh dấu rằng "thị giác không còn là một kênh cảm nhận riêng lẻ nữa", mà cùng với ngôn ngữ tham gia vào biểu đạt tri thức và suy luận ở cấp độ cao hơn. Dưới đây, chúng ta sẽ triển khai từ hai hướng **mô tả hình ảnh và trả lời câu hỏi thị giác**, **truy xuất ảnh–văn bản và căn chỉnh đa phương thức** (nội dung được gộp thành hai tiểu mục tại đây).

### 2.7.1 Mô tả hình ảnh và trả lời câu hỏi thị giác: từ "nhìn ảnh và mô tả" đến "nhìn ảnh và suy luận"

Mục tiêu của **mô tả hình ảnh (Image Captioning)** là nhận đầu vào là một hình ảnh, đầu ra là một đoạn mô tả bằng ngôn ngữ tự nhiên, ví dụ "một bé gái đang thả diều trên bãi cỏ". Cách tiếp cận truyền thống thường dùng cấu trúc "CNN + RNN": dùng mạng tích chập trích xuất đặc trưng toàn bộ ảnh, rồi dùng LSTM/GRU sinh mô tả từng từ; cùng với sự xuất hiện của Transformer và VLM tiền huấn luyện, mô hình chủ đạo dần chuyển sang cấu trúc "bộ mã hóa hình ảnh + bộ giải mã văn bản", như BLIP / BLIP‑2, ViT + GPT, v.v. Về huấn luyện, mô hình thường được huấn luyện tự hồi quy trên lượng lớn cặp ảnh–văn bản, đôi khi còn áp dụng học tăng cường hoặc hàm mất mát tương phản để tối ưu tính đa dạng và độ chính xác của mô tả. Ở cấp độ sản phẩm, mô tả hình ảnh được sử dụng rộng rãi cho đọc trợ năng (tạo mô tả ảnh cho phần mềm đọc màn hình cho người khiếm thị), tự động thêm tiêu đề cho album ảnh thông minh, và cung cấp thêm chỉ mục văn bản cho hệ thống tìm kiếm.

**Trả lời câu hỏi thị giác (VQA) thì tiến thêm một bước khi đưa tương tác của con người vào: đầu vào của mô hình không còn là "ảnh + gợi ý trống", mà là "ảnh + câu hỏi", đầu ra là một câu trả lời ngắn hoặc giải thích bằng ngôn ngữ tự nhiên. So với mô tả hình ảnh, VQA nhấn mạnh hơn vào tính điều khiển được và năng lực suy luận**: câu hỏi có thể tập trung vào chi tiết cục bộ ("mũ của người đàn ông màu gì?"), quan hệ ("xe nào gần ngã tư hơn?"), đếm ("có mấy con chó?"), thậm chí cần kiến thức bên ngoài ("món ăn này thuộc loại ẩm thực nào?"). Các mô hình VQA đời đầu thường dùng bộ mã hóa hình ảnh + bộ mã hóa câu hỏi + mô-đun hợp nhất (như pooling song tuyến tính, cơ chế chú ý) + đầu phân loại, đầu ra là một câu trả lời trong từ vựng hữu hạn; các mô hình lớn đa phương thức hiện đại thì trực tiếp dùng bộ mã hóa hình ảnh + LLM, thực hiện sinh ngôn ngữ tự nhiên trên cơ sở "nhìn ảnh", có ưu thế rõ rệt về trả lời mở và hội thoại nhiều vòng.

Cả hai trong khuôn khổ VLM thống nhất có thể được coi là các "mẫu gợi ý" khác nhau:

- Captioning: `<hình ảnh> + "Describe this image in one sentence."` → văn bản;
- VQA: `<hình ảnh> + "Q: ... A:"` → văn bản.

Thông qua tinh chỉnh theo chỉ thị (Instruction Tuning), cùng một mô hình lớn đa phương thức có thể tương thích với nhiều tác vụ như mô tả, trả lời câu hỏi, giải thích, gán nhãn, v.v., đây cũng là ý tưởng kỹ thuật nền tảng của các sản phẩm VLM hiện đại (trợ lý đa phương thức, robot trả lời câu hỏi hình ảnh, v.v.).

### 2.7.2 Truy xuất ảnh–văn bản và căn chỉnh đa phương thức: tìm ảnh bằng văn bản & tìm văn bản bằng ảnh

**Truy xuất ảnh–văn bản (Cross‑modal Retrieval)** giải quyết một nhu cầu phổ biến khác: cho một đoạn văn bản, tìm hình ảnh khớp với nó (Text‑to‑Image Retrieval); hoặc cho một bức ảnh, tìm mô tả văn bản, thông tin sản phẩm, tin tức liên quan (Image‑to‑Text Retrieval). Những năng lực này tạo thành cốt lõi của các sản phẩm như "tìm ảnh bằng văn bản / tìm văn bản bằng ảnh", "tìm sản phẩm từ ảnh", "ghép ảnh cho tin tức".

Công nghệ cốt lõi là **căn chỉnh đa phương thức**: các mô hình tiêu biểu như CLIP sử dụng bộ mã hóa riêng cho hình ảnh và văn bản (như ViT và bộ mã hóa văn bản Transformer), huấn luyện bằng học tương phản trên dữ liệu cặp ảnh–văn bản quy mô lớn:

- Đối với cùng một cặp (hình ảnh, văn bản), khiến vector của chúng gần nhau trong không gian nhúng;
- Đối với các cặp ảnh–văn bản không khớp, thì đẩy vector của chúng ra xa nhau.

Sau khi huấn luyện hoàn tất, chỉ cần mã hóa tất cả hình ảnh và văn bản thành vector, là có thể thực hiện khớp nối nhanh trong không gian chung thông qua truy xuất vector (tìm kiếm láng giềng gần nhất):

- Text‑to‑Image: văn bản → vector văn bản → vector hình ảnh gần nhất;
- Image‑to‑Text: hình ảnh → vector hình ảnh → vector văn bản gần nhất.

Trong thực tiễn kỹ thuật, loại mô hình này thường áp dụng cấu trúc hai giai đoạn:

- Giai đoạn đầu dùng bộ mã hóa kép (Bi‑Encoder, như CLIP) nhẹ và nhanh để truy xuất thô, nhanh chóng sàng lọc một lượng nhỏ ứng viên từ kho ảnh hàng trăm triệu;
- Giai đoạn hai có thể dùng bộ mã hóa chéo (Cross‑Encoder) mạnh hơn hoặc mô hình lớn đa phương thức để xếp hạng tinh và sắp xếp lại ứng viên, nhằm cải thiện độ liên quan và tính bền vững.

Về phía sản phẩm, truy xuất ảnh–văn bản và căn chỉnh đa phương thức được sử dụng rộng rãi trong: tìm kiếm hình ảnh, truy xuất quảng cáo (tìm hình ảnh phù hợp dựa trên nội dung quảng cáo), kiểm tra tuân thủ (kiểm tra tính nhất quán giữa hình ảnh và văn bản quảng cáo), gợi ý nội dung (dựa trên lịch sử văn bản người dùng đã đọc để gợi ý hình ảnh/video liên quan), v.v. Cùng với sự trỗi dậy của các mô hình lớn đa phương thức, loại năng lực truy xuất này cũng dần được thống nhất vào trong khuôn khổ đa phương thức lớn hơn, cung cấp giao diện thống nhất ra bên ngoài dưới dạng "chỉ thị ngôn ngữ tự nhiên + bộ nhớ đa phương thức/thư viện vector".## 2.8 Nhận dạng ký tự quang học (OCR)

Trong nhiều nghiệp vụ, thông tin quan trọng nhất không nằm ở "vật thể và cảnh trong hình ảnh", cũng không nằm ở mô tả hình ảnh bằng ngôn ngữ tự nhiên, mà là **văn bản** được viết trực tiếp trên hình ảnh: điều khoản hợp đồng, số tiền hóa đơn, tên biển báo đường, chỉ số đồng hồ đo, thông báo lỗi trên ảnh chụp màn hình, v.v. **Nhận dạng ký tự quang học (OCR)** xoay quanh nhiệm vụ hiểu có cấu trúc "hình ảnh + bố cục tài liệu": từ đầu vào hình ảnh phức tạp, tự động phát hiện và nhận dạng nội dung văn bản, hiểu bố cục và cấu trúc của tài liệu, từ đó hỗ trợ tìm kiếm, thống kê, nhập liệu tự động và hỏi đáp thông minh.

Từ góc độ sản phẩm, OCR là cầu nối then chốt để "biến thông tin giấy/hình ảnh thành văn bản có thể tính toán", là hạ tầng cơ sở cho văn phòng điện tử, tự động hóa và thông minh hóa: rà soát hợp đồng, ghi sổ chứng từ, số hóa hồ sơ chính phủ và doanh nghiệp, chuyển đổi PDF sang Word trong phần mềm văn phòng, trợ lý hỏi đáp tài liệu, v.v., tất cả đều được xây dựng trên nền tảng năng lực OCR. Dưới đây, chúng ta sẽ hệ thống hóa OCR từ ba góc độ: **kịch bản**, **nguyên lý** và **mô hình**, và triển khai các hướng cốt lõi trong các tiểu mục tiếp theo.

- **Kịch bản**
  - Nhận dạng văn bản cảnh quan: biển hiệu cửa hàng, biển báo đường, bảng quảng cáo, văn bản trên bao bì trong cảnh đường phố, v.v., phục vụ cho điều hướng, tìm kiếm, thông tin bán lẻ và kiểm tra tuân thủ.
  - OCR tài liệu: nhận dạng và cấu trúc hóa văn bản từ bản scan, fax, PDF, ảnh chụp hợp đồng/hóa đơn/báo cáo, v.v., khôi phục thành văn bản có thể chỉnh sửa.
  - Kịch bản chuyên dụng: nhận dạng biển số xe, đọc chỉ số đồng hồ đo (đồng hồ điện, đồng hồ nước, đồng hồ gas), trích xuất văn bản từ ảnh chụp màn hình, nhận dạng bài thi/biểu mẫu, v.v.
  - Hiểu tài liệu: trong các tài liệu dài có bố cục phức tạp, trích xuất cấu trúc như tiêu đề, đoạn văn, bảng biểu, chú thích, đặt nền tảng cho tìm kiếm, tóm tắt và hỏi đáp.
- **Nguyên lý**
  Hệ thống OCR thường được chia thành một số bước then chốt:
  - Phát hiện văn bản: phát hiện tất cả các vùng văn bản (dòng văn bản hoặc khối văn bản) trên hình ảnh, xuất ra khung định vị (hình chữ nhật ngang hoặc đa giác bốn điểm), đây là đầu vào cho bước nhận dạng tiếp theo.
  - Nhận dạng văn bản: thực hiện nhận dạng chuỗi cho từng vùng văn bản đã phát hiện, chuyển đổi chuỗi pixel thành chuỗi ký tự (như tiếng Trung, tiếng Anh, số, ký hiệu, v.v.).
  - Phân tích bố cục (Layout Analysis): trong kịch bản tài liệu, nhận dạng vai trò của từng vùng (tiêu đề, nội dung chính, hình ảnh, bảng biểu, đầu trang/chân trang, v.v.), khôi phục thứ tự đọc và cấu trúc phân cấp.
  - Nhận dạng cấu trúc bảng: thực hiện phân chia hàng/cột, phân tích ranh giới ô, khôi phục ô hợp nhất cho vùng bảng biểu, tái tạo cấu trúc bảng logic.
  - Hỏi đáp tài liệu (DocVQA): trên nền tảng OCR và hiểu bố cục, cho phép mô hình trả lời các câu hỏi như "Ngày thanh toán của hợp đồng này là khi nào?" "Số tiền trên hóa đơn là bao nhiêu?" — những câu hỏi đòi hỏi suy luận đa bước và liên vùng.
- **Mô hình**
  Trong thực tế kỹ thuật, tổ hợp phổ biến là "mô-đun OCR chuyên dụng + mô hình hiểu tài liệu + mô hình lớn đa phương thức":
  - Phát hiện và nhận dạng văn bản:
    - Phát hiện: EAST, DBNet/DBNet++ và các phương pháp dựa trên phân đoạn hoặc học biên, giỏi xử lý văn bản cong và nền phức tạp;
    - Nhận dạng: CRNN, RARE, SAR và các mô hình chuỗi (CNN + RNN/Attention + CTC hoặc giải mã tự hồi quy), hỗ trợ đa ngôn ngữ và đa phông chữ.
  - Hiểu bố cục và cấu trúc tài liệu:
    - LayoutLM / LayoutLMv2/v3, DocFormer, v.v., mã hóa kết hợp nội dung văn bản (token), thông tin vị trí (bounding box) và đặc trưng hình ảnh;
    - Donut và các mô hình "hiểu tài liệu đầu cuối", trực tiếp từ hình ảnh đến đầu ra có cấu trúc (như JSON / Markdown), làm mờ ranh giới của OCR truyền thống.
  - Hỏi đáp tài liệu và hiểu đa phương thức:
    - Trên nền tảng mô hình bố cục, xếp chồng đầu tác vụ để thực hiện DocVQA;
    - Hoặc trực tiếp sử dụng mô hình lớn đa phương thức (VLM) để đọc hình ảnh tài liệu, hoàn thành hỏi đáp và tóm tắt ở cấp độ ngôn ngữ tự nhiên, đồng thời ngầm tận dụng năng lực OCR.

Tổng quan, OCR đã phát triển từ "nhận dạng ký tự đơn giản" thời kỳ đầu thành một hệ thống hiểu tài liệu tổng thể bao gồm **văn bản + bố cục + cấu trúc + hỏi đáp**, là trụ cột then chốt cho số hóa doanh nghiệp, quản lý hồ sơ chính phủ và văn phòng thông minh. Tiếp theo, chúng ta sẽ triển khai từ ba hướng: **phát hiện và nhận dạng văn bản**, **phân tích bố cục tài liệu và cấu trúc bảng**, và **hỏi đáp tài liệu và DocVQA đa phương thức**.

### 2.8.1 Phát hiện và nhận dạng văn bản: từ pixel đến văn bản khả dụng

Bước đầu tiên của OCR là **phát hiện văn bản**: tìm tất cả các vùng chứa văn bản trong hình ảnh đầu vào. Văn bản cảnh quan/đường phố đối mặt với thách thức như phông chữ đa dạng, nghiêng và biến dạng, ánh sáng phức tạp, nhiễu nền nghiêm trọng; trong khi kịch bản tài liệu nhấn mạnh vào hỗ trợ mạnh mẽ cho văn bản dày đặc và bố cục nhiều cột. Các phương pháp như EAST, DBNet chuyển đổi bài toán phát hiện thành "phân đoạn cấp pixel + học biên", dự đoán xác suất văn bản và tham số hình học trên bản đồ đặc trưng, sau đó thông qua hậu xử lý thu được khung văn bản chính xác (có thể là khung ngang hoặc tứ giác/đa giác tùy ý), cân bằng giữa độ chính xác và tốc độ.

**Nhận dạng văn bản** cắt từng vùng văn bản đã phát hiện và chuyển đổi thành chuỗi ký tự. Cách tiếp cận kinh điển được đại diện bởi CRNN: trước tiên dùng CNN trích xuất đặc trưng, sau đó mô hình hóa chuỗi bằng RNN hoặc Transformer, cuối cùng sử dụng CTC hoặc giải mã attention để xuất chuỗi ký tự. Đối với văn bản có độ dài không cố định, văn bản cong và ngôn ngữ phức tạp (trộn lẫn Trung-Anh, đa ngôn ngữ), mô hình nhận dạng cần đồng thời phát huy năng lực trong cả mô hình hóa đặc trưng hình ảnh và mô hình hóa ngôn ngữ ký tự. Các phương pháp như RARE, SAR giới thiệu mạng biến đổi không gian (STN) hoặc cơ chế căn chỉnh attention để sửa biến dạng hình học, nâng cao khả năng thích ứng với bố cục phức tạp.

Trong hệ thống kỹ thuật, phát hiện và nhận dạng thường hoạt động như hai dịch vụ tách rời tạo thành một pipeline OCR: phát hiện front-end chia hình ảnh thành nhiều dòng/khối văn bản, nhận dạng back-end thực hiện nhận dạng ký tự cho từng khối, và có thể xếp chồng mô hình ngôn ngữ để sửa lỗi (như sửa chính tả, kiểm tra số/số tiền). Đối với các kịch bản cụ thể như biển số xe, đọc chỉ số đồng hồ đo, các mô hình phát hiện/nhận dạng được tinh chỉnh chuyên biệt cũng được sử dụng, tận dụng tiên nghiệm của kịch bản (phông chữ cố định, bộ ký tự giới hạn) để đổi lấy độ chính xác cao hơn và độ trễ thấp hơn.

### 2.8.2 Phân tích bố cục tài liệu và cấu trúc bảng: khôi phục "hình dạng của tài liệu"

Chỉ nhận dạng văn bản thôi thì chưa đủ, đặc biệt trong các kịch bản như tài liệu dài, báo cáo, hợp đồng và chứng từ, **cấu trúc bố cục** thường quyết định ý nghĩa và tầm quan trọng của thông tin: mối quan hệ phân cấp giữa tiêu đề và nội dung, vị trí của biểu đồ và chú thích, vai trò của đầu trang và chân trang, thứ tự logic của các đoạn văn bản trong và ngoài bảng, v.v. Mục tiêu của **phân tích bố cục tài liệu (Document Layout Analysis)** là nhận dạng vai trò và ranh giới của các vùng khác nhau trên trang hai chiều, đồng thời khôi phục thứ tự đọc và cấu trúc phân cấp hợp lý.

Các mô hình như LayoutLM / LayoutLMv2/v3, DocFormer mã hóa kết hợp nội dung của từng token văn bản (text embedding), vị trí không gian (tọa độ bounding box) và đặc trưng hình ảnh cục bộ (từ CNN/ViT), mô hình hóa mối quan hệ ngữ nghĩa–không gian giữa các token thông qua Transformer. Bằng cách huấn luyện trên tập dữ liệu có gán nhãn bố cục, mô hình có thể học cách phân biệt nhiều loại vùng như "tiêu đề/đoạn văn/danh sách/bảng biểu/chú thích hình/đầu trang/chân trang" và đưa ra nhãn cùng cấp bậc tương ứng trong đầu ra. Loại mô hình này thường đóng vai trò "tầng trung gian", cung cấp khung tài liệu có cấu trúc cho hệ thống rà soát hợp đồng, phân tích báo cáo, nền tảng số hóa hồ sơ.

**Nhận dạng cấu trúc bảng (Table Structure Recognition)** là một nhánh đặc biệt quan trọng trong phân tích bố cục: nó không chỉ phát hiện vùng bảng, mà còn phân tích sâu hơn ranh giới hàng/cột, tọa độ ô và ô hợp nhất, cuối cùng tái tạo một bảng logic (thường được biểu diễn dưới dạng HTML, bảng Markdown, hoặc JSON có cấu trúc kèm tọa độ). Các phương pháp thực hiện bao gồm:

- Dựa trên quy tắc/hình ảnh: sử dụng phát hiện đường kẻ, mạng phân đoạn, phát hiện đối tượng và các phương tiện khác để trích xuất đường kẻ bảng và vùng ô, sau đó xây dựng đồ thị topo;
- Dựa trên Transformer: mã hóa khối văn bản và thông tin hình học của vùng bảng thành chuỗi, trực tiếp dự đoán cấu trúc ô và mối quan hệ liên kết.

Trên sản phẩm, những năng lực này hỗ trợ các kịch bản giá trị cao như "chuyển đổi PDF sang Word/Excel", "nhập liệu có cấu trúc chứng từ/hóa đơn", "phân tích báo cáo và trích xuất chỉ số", là thành phần then chốt của tự động hóa văn phòng chính phủ và doanh nghiệp.

### 2.8.3 Hỏi đáp tài liệu và DocVQA: từ "đọc tài liệu" đến "hỏi tài liệu"

Khi năng lực OCR và phân tích bố cục đã đủ mạnh, nhu cầu tự nhiên tiếp theo là: **không còn để con người tự lật tài liệu, mà trực tiếp "hỏi tài liệu"**. Đây chính là **hỏi đáp tài liệu (DocVQA)**: mô hình trả lời câu hỏi trên các tài liệu phức tạp như hợp đồng, báo cáo, chứng từ, hướng dẫn, ví dụ như "Ngày có hiệu lực của hợp đồng này là khi nào?" "Lợi nhuận ròng quý 4 năm 2023 trong báo cáo này là bao nhiêu?" "Tên bên mua trên hóa đơn là ai?".

Hệ thống DocVQA truyền thống thường được xây dựng theo cách "OCR + mô hình bố cục + đầu QA":

- Trước tiên dùng OCR trích xuất văn bản và tọa độ;
- Dùng LayoutLM / DocFormer, v.v. để mô hình hóa mối quan hệ ba phương thức văn bản–bố cục–hình ảnh;
- Cuối cùng xếp chồng đầu tác vụ (phân loại / trích xuất / dự đoán span) lên biểu diễn này, định vị câu trả lời hoặc đoạn liên quan trong tài liệu dựa trên câu hỏi.

Cùng với sự phát triển của mô hình lớn đa phương thức, ngày càng nhiều hệ thống bắt đầu trực tiếp sử dụng "hình ảnh tài liệu + câu hỏi" làm đầu vào, để một VLM hoặc LLM đa phương thức trực tiếp tạo ra câu trả lời hoặc giải thích kèm trích dẫn. Trong kiến trúc này, OCR, bố cục, hiểu ngữ nghĩa và năng lực suy luận phối hợp làm việc trong nội bộ mô hình theo cách đầu cuối: mô hình vừa có thể nhìn thấy bố cục gốc và manh mối hình ảnh, vừa có thể tận dụng tri thức thế giới ngôn ngữ và mẫu suy luận để hoàn thành việc trả lời các câu hỏi phức tạp.

Về hình thái sản phẩm, DocVQA thường xuất hiện dưới dạng "trợ lý rà soát hợp đồng", "hỏi đáp hóa đơn/báo cáo", "hỏi đáp thông minh tài liệu dài", giúp người dùng nhanh chóng định vị thông tin then chốt từ lượng lớn tài liệu, tự động tạo tóm tắt, thực hiện so sánh điều khoản, v.v., giảm đáng kể gánh nặng rà soát thủ công và truy xuất thông tin.## 2.9 Tạo và Chỉnh sửa Hình ảnh (Image Generation & Editing)

Hầu hết các khả năng thị giác được giới thiệu trước đây đều mang tính "phân biệt" (discriminative): đầu vào là hình ảnh, đầu ra là nhãn, khung bao, mặt nạ hoặc văn bản; trong khi đó, một hướng phát triển nhanh chóng khác trong những năm gần đây là **thị giác sinh sinh (generative vision)**: mô hình không chỉ hiểu hình ảnh nữa, mà còn **tạo ra hoặc chỉnh sửa hình ảnh**, tạo ra nội dung trực quan chất lượng cao, đa phong cách dựa trên điều kiện văn bản/hình ảnh được cung cấp. **Tạo và chỉnh sửa hình ảnh** chính là năng lực cốt lõi của hướng này, hỗ trợ cho nhiều sản phẩm từ nền tảng vẽ AIGC đến các công cụ chỉnh sửa ảnh/hiệu ứng thông minh.

Từ góc độ kinh doanh, thị giác sinh sinh đã chuyển mình từ "trình diễn công nghệ" thành công cụ năng suất thực sự hữu ích: nhà thiết kế dùng nó để phác thảo ý tưởng và tạo bản chi tiết; đội ngũ tiếp thị dùng nó để tạo hàng loạt poster và tài liệu quảng cáo; người dùng phổ thông dùng nó để tạo ảnh đại diện, tranh minh họa, hình nền; nhà sáng tạo video dùng nó để tách nền, thay phông và tạo hiệu ứng. Dưới đây, chúng ta sẽ sắp xếp tầng này từ ba góc độ: **kịch bản**, **nguyên lý** và **mô hình**, sau đó sẽ mở rộng về tạo hình ảnh từ văn bản, khả năng image-to-image và chỉnh sửa trong các phần tiếp theo.

- **Kịch bản**
  - Tạo hình ảnh từ văn bản: người dùng nhập một đoạn mô tả ("thành phố về đêm phong cách cyberpunk"), hệ thống tự động tạo ra nhiều hình ảnh phù hợp với mô tả, hỗ trợ chọn ảnh và chỉnh sửa lặp.
  - Chuyển đổi phong cách và dịch hình ảnh: chuyển đổi ảnh thật thành phong cách anime/phác thảo/tranh sơn dầu/màu nước, hoặc ánh xạ giữa các miền khác nhau (ban ngày ↔ ban đêm, mùa hè ↔ mùa đông).
  - Tô vẽ lại có điều kiện và mở rộng: tô vẽ lại cục bộ (Inpainting) trên ảnh gốc, mở rộng ra ngoài khung hình (Outpainting), dùng để sửa khuyết điểm, xóa/thêm đối tượng, mở rộng bố cục.
  - Chỉnh sửa theo hướng dẫn văn bản: dùng chỉ thị ngôn ngữ tự nhiên để sửa đổi hình ảnh ("đổi bầu trời thành hoàng hôn", "biến chiếc xe này thành xe thể thao màu đỏ"), người dùng không cần thành thạo phần mềm chỉnh sửa ảnh phức tạp.
- **Nguyên lý**
  Mô hình thị giác sinh sinh hoàn thành việc tạo và chỉnh sửa chủ yếu thông qua việc học "phân phối hình ảnh" và "kiểm soát điều kiện":
  - Mô hình hóa phân phối: GAN, mô hình khuếch tán (Diffusion), Flow Matching, v.v. học phân phối cao chiều từ lượng lớn hình ảnh, cho phép mô hình từng bước "lấy mẫu" ra hình ảnh chân thực từ nhiễu ngẫu nhiên.
  - Tạo có điều kiện: trên nền tảng mô hình hóa phân phối hình ảnh thuần túy, đưa vào các điều kiện như văn bản/phác thảo/bản đồ phân đoạn/điểm khóa/bản đồ độ sâu, khiến quá trình tạo bị ràng buộc bởi tín hiệu bên ngoài (Text‑to‑Image, Image‑to‑Image, ControlNet, v.v.).
  - Chỉnh sửa có kiểm soát: trong không gian tiềm ẩn của hình ảnh hiện có, thông qua văn bản hoặc mặt nạ cục bộ để dẫn hướng và sửa đổi các đặc trưng cục bộ, thực hiện tô vẽ lại cục bộ, thay đổi phong cách, điều chỉnh bố cục, v.v.
- **Mô hình**
  Các mô hình tạo và chỉnh sửa hình ảnh chủ đạo hiện nay chủ yếu dựa trên **mô hình khuếch tán + kiểm soát điều kiện**:
  - Dòng GAN: StyleGAN, v.v. thể hiện xuất sắc trong kiểm soát khuôn mặt độ phân giải cao và phong cách; nhưng huấn luyện không ổn định, khó bao phủ phân phối đa phương thức phức tạp.
  - Mô hình khuếch tán: Stable Diffusion, Imagen, DALL·E series, v.v., lấy mẫu thông qua quá trình "thêm nhiễu tiến + khử nhiễu lùi", cân bằng giữa chất lượng và đa dạng, là hướng chủ đạo hiện nay của Text‑to‑Image.
  - Tạo và chỉnh sửa có kiểm soát: ControlNet, T2I‑Adapter, v.v., xếp chồng các kênh điều kiện (cạnh, tư thế, phân đoạn, v.v.) lên mô hình khuếch tán cơ sở, đạt được kiểm soát chính xác; kết hợp Inpainting/Outpainting dẫn hướng bằng văn bản để thực hiện chỉnh sửa cục bộ và mở rộng hình ảnh.
  - Flow Matching và mô hình tạo thế hệ mới: chuyển đổi phân phối nhiễu thành phân phối hình ảnh thông qua việc học trường dòng liên tục, khám phá sự cân bằng mới về hiệu quả, khả năng kiểm soát và độ ổn định.

Ở cấp độ sản phẩm, những công nghệ này hiện diện dưới dạng Jimeng, mô hình hình ảnh Alibaba Qwen, FLUX, OpenAI hoặc Gemini nanobanana, hệ sinh thái Stable Diffusion, Photoshop Generative Fill, Canva AI, Jianying/CapCut tách nền và hiệu ứng thông minh, v.v., dần phát triển từ "đồ chơi" thành một mắt xích chính thức trong chuỗi sản xuất nội dung. Tiếp theo, chúng ta sẽ mở rộng theo ba hướng: **tạo hình ảnh từ văn bản**, **dịch image-to-image** và **chỉnh sửa theo hướng dẫn văn bản**.

### 2.9.1 Tạo hình ảnh từ văn bản (Text‑to‑Image): từ một câu nói đến một bức tranh

Nhiệm vụ cốt lõi của **tạo hình ảnh từ văn bản (Text‑to‑Image)** là: với một đoạn mô tả ngôn ngữ tự nhiên được cung cấp, tạo ra một hình ảnh khớp nhất có thể với ngữ nghĩa và phong cách của nó. Các mô hình Text‑to‑Image hiện đại chủ yếu dựa trên kiến trúc khuếch tán:

- Trước tiên, sử dụng bộ mã hóa văn bản (như CLIP Text Encoder hoặc T5/LLM) để mã hóa văn bản đầu vào thành vector điều kiện;
- Sau đó, trong không gian tiềm ẩn của hình ảnh, bắt đầu từ trạng thái nhiễu cao, thông qua lấy mẫu khử nhiễu lùi nhiều bước, tại mỗi bước đều sử dụng điều kiện văn bản để dẫn hướng phương hướng tạo;
- Cuối cùng thu được hình ảnh độ phân giải cao phù hợp với mô tả, có thể phóng to hoặc hậu xử lý thêm.

Các phương pháp như Stable Diffusion, Imagen, DALL·E series được huấn luyện trên các cặp ảnh–văn bản quy mô lớn, giúp mô hình vừa nắm vững phổ hệ thị giác (hình dạng, kết cấu, bố cục, ánh sáng), vừa có được khả năng căn chỉnh ngôn ngữ–thị giác ở mức độ nhất định (hiểu các mô tả phức tạp như "phong cách", "chất liệu", "bố cục"). Ở cấp độ sản phẩm, năng lực này cho phép "người không biết vẽ cũng có thể vẽ": người dùng chỉ cần mô tả ý tưởng bằng ngôn ngữ tự nhiên, hệ thống sẽ đưa ra nhiều cách thể hiện trực quan khác nhau, hỗ trợ thử nghiệm lặp và tinh chỉnh.

Các mô hình Text‑to‑Image thường đồng thời hỗ trợ đầu ra đa phong cách, đa độ phân giải: bằng cách thêm token phong cách, điều kiện kích thước, v.v. trong quá trình huấn luyện hoặc suy luận, cho phép cùng một mô hình chuyển đổi giữa các phong cách khác nhau như "phong cách ảnh chân thực, phong cách minh họa phẳng, phong cách kết xuất 3D". Các kỹ thuật thường dùng trong kỹ thuật bao gồm:

- Kỹ thuật Prompt (Prompt Engineering), dùng để tinh chỉnh và ổn định phong cách đầu ra;
- Các kỹ thuật tinh chỉnh nhẹ như LoRA / DreamBooth, nhanh chóng thích ứng với nhân vật, IP hoặc phong cách thương hiệu cụ thể trên mô hình chung.

### 2.9.2 Image‑to‑Image: dịch, chuyển đổi phong cách và tô vẽ lại cục bộ

Nhiệm vụ **Image‑to‑Image** dựa trên hình ảnh đầu vào có sẵn, tạo ra một phiên bản hình ảnh khác "bị ràng buộc bởi nó": vừa giữ lại cấu trúc hoặc nội dung tổng thể của ảnh gốc, vừa thực hiện một sự chuyển đổi hoặc nâng cao nào đó. Các dạng điển hình bao gồm:

- Dịch hình ảnh / Chuyển đổi phong cách: ánh xạ giữa các miền thị giác khác nhau, như "ảnh → anime", "mùa hè → mùa đông", "ban ngày → ban đêm", "phác thảo → ảnh màu". Trước đây chủ yếu dựa trên GAN (CycleGAN, Pix2Pix, v.v.), hiện nay cũng có thể hoàn thành bằng mô hình khuếch tán dưới sự kiểm soát điều kiện.
- Tạo có điều kiện: lấy phác thảo, bản đồ phân đoạn, bản đồ độ sâu, bản đồ cạnh, v.v. làm điều kiện, thông qua các mô-đun như ControlNet, T2I‑Adapter để dẫn hướng quá trình khuếch tán, khiến hình ảnh tạo ra tuân thủ nghiêm ngặt các điều kiện hình học/bố cục, đồng thời tự do sáng tạo về kết cấu, ánh sáng, phong cách.
- Inpainting / Outpainting: khoanh vùng một khu vực trên ảnh gốc, coi đó là phần cần tô vẽ lại (inpainting), hoặc mở rộng tạo nội dung mới bên ngoài khung hình (outpainting), thực hiện các thao tác như "lấp đầy", "mở rộng ảnh".

Điểm mấu chốt của loại nhiệm vụ này là **tạo ra nội dung mới trong khi vẫn giữ được ràng buộc**. Mô hình khuếch tán thể hiện xuất sắc ở khía cạnh này: trong inpainting, mô hình chỉ lấy mẫu cho vùng mặt nạ, trong khi giữ nguyên ảnh gốc ở những vùng không bị che, thông qua hiểu biết ngữ nghĩa và thông tin ngữ cảnh, khiến nội dung mới hòa trộn tự nhiên với vùng xung quanh về phong cách và ánh sáng. Đối với chuyển đổi phong cách, mô hình vừa giữ cấu trúc đầu vào, vừa lấy mẫu kết cấu và màu sắc từ phân phối phong cách mục tiêu, thực hiện "thay vỏ không thay xương".

Trong sản phẩm, năng lực Image‑to‑Image hỗ trợ cho nhiều công cụ sáng tạo: bộ lọc phong cách, hoạt hình hóa, thay bầu trời một chạm, làm đẹp tự động, phục hồi ảnh cũ, chỉnh sửa cục bộ, v.v., thường được trình bày cho người dùng qua giao diện trực quan cao.

### 2.9.3 Chỉnh sửa hình ảnh theo hướng dẫn văn bản: ngôn ngữ tự nhiên làm "cọ vẽ"

Trong phần mềm chỉnh sửa ảnh truyền thống, người dùng cần nắm vững một loạt khái niệm chuyên môn như layer, mặt nạ, vùng chọn, bộ lọc; trong khi **chỉnh sửa hình ảnh theo hướng dẫn văn bản (Text‑guided Editing)** cố gắng thay thế phần lớn thao tác chuyên môn bằng ngôn ngữ tự nhiên:

- "Đổi phông nền thành đường chân trời thành phố về đêm";
- "Cho người này mặc vest đen";
- "Biến chiếc xe này thành xe thể thao màu xanh, thêm hiệu ứng chuyển động mờ".

Về mặt kỹ thuật, chỉnh sửa theo hướng dẫn văn bản thường được xây dựng trên mô hình khuếch tán Text‑to‑Image, thực hiện qua một số cách:

- Tìm kiếm hoặc lấy mẫu trong không gian tiềm ẩn gần ảnh gốc, khiến ảnh sau chỉnh sửa giữ được độ tương đồng cao với ảnh gốc, chỉ thay đổi cục bộ ở những phần bị ảnh hưởng bởi văn bản;
- Sử dụng mặt nạ tường minh (người dùng khoanh vùng), giới hạn phạm vi chỉnh sửa trong khu vực cụ thể (đây chính là "chọn vùng rồi nhập chỉ thị văn bản" trong nhiều công cụ);
- Đưa vào mô-đun "kiểm soát chỉ thị" (như ControlNet, token kiểm soát có thể học được), tăng cường khả năng kiểm soát và độ ổn định của mô hình đối với yêu cầu chỉnh sửa.

Các sản phẩm như Jimeng, FLUX, mô hình hình ảnh Alibaba Qwen, hệ sinh thái Stable Diffusion, Canva AI, v.v. đều cung cấp năng lực tương tự: người dùng có thể hoàn thành chỉnh sửa phức tạp chỉ qua văn bản đơn giản và một chút tương tác. Đối với người dùng chuyên nghiệp, đây trở thành "trợ lý thông minh" tăng tốc quy trình sáng tạo; đối với người dùng phổ thông, điều này giảm đáng kể rào cản chỉnh sửa hình ảnh.## 2.10 Đánh giá Chất lượng Hình ảnh (Image Quality Assessment, IQA)

Trong các tác vụ như tăng cường hình ảnh cấp thấp, mã hóa nén, tạo và chỉnh sửa ảnh, chúng ta thường xuyên phải trả lời một câu hỏi tưởng chừng như chủ quan: **"Bức ảnh này trông có tốt không?"** . Kiểm tra thủ công rõ ràng không thể mở rộng quy mô, trong khi các chỉ số truyền thống như PSNR lại thường không nhất quán với cảm nhận chủ quan của mắt người. Mục tiêu của **Đánh giá Chất lượng Hình ảnh (Image Quality Assessment, IQA)** là thiết lập một cơ chế tự động để chấm điểm hoặc xếp hạng chất lượng chủ quan/khách quan của hình ảnh, trở thành mắt xích then chốt kết nối "đầu ra của thuật toán cấp thấp" với "trải nghiệm thực tế của người dùng".

Từ góc độ hệ thống, IQA đóng vai trò "người gác cổng" và "tham chiếu điều chỉnh tham số" trong nhiều pipeline: nền tảng thương mại điện tử/nội dung sử dụng nó để lọc ra những ảnh tải lên bị mờ, nhiễu nặng, nén quá mức; camera/thư viện ảnh trên điện thoại dùng nó để chọn ra "bức ảnh đẹp nhất" trong chụp liên tiếp; dịch vụ tăng cường và nén ảnh trên đám mây sử dụng nó để so sánh trước sau, từ đó định hướng cải tiến mô hình. Dưới đây, chúng ta sẽ hệ thống hóa IQA theo ba chiều: **kịch bản**, **nguyên lý** và **mô hình**, đồng thời mở rộng về các loại hình đánh giá và chỉ số/mô hình học tập trong các phần tiếp theo.

- **Kịch bản**
  - Kiểm tra chất lượng và kiểm duyệt khi tải lên: chấm điểm chất lượng cho ảnh/video do người dùng tải lên, lọc bỏ nội dung bị mờ nghiêm trọng, phơi sáng bất thường, nhiễu rõ rệt và có hiện tượng nén giả nặng.
  - Chọn ảnh thông minh và loại bỏ trùng lặp: trong ứng dụng thư viện ảnh, máy ảnh trên điện thoại, chọn ra phiên bản có độ sắc nét, biểu cảm, bố cục tốt hơn từ nhiều bức ảnh tương tự, đồng thời nhận diện ảnh chất lượng kém hoặc dư thừa để dọn dẹp.
  - Đánh giá thuật toán tăng cường/nén: trong thử nghiệm A/B của các thuật toán tăng cường ảnh, khử nhiễu, siêu phân giải, mã hóa-giải mã, sử dụng chỉ số IQA để đo lường khách quan "chiến lược nào tốt hơn", hỗ trợ tìm kiếm tham số và lựa chọn mô hình.
  - Tự động chọn poster/hình thu nhỏ: trong tập hợp video hoặc nhiều ảnh, tự động chọn khung hình có chất lượng và sức hấp dẫn thị giác cao hơn làm ảnh bìa hoặc ứng viên poster.
- **Nguyên lý**
  Cốt lõi của IQA là khắc họa chất lượng hình ảnh từ hai chiều: **mức độ biến dạng so với ảnh tham chiếu** và **cảm nhận chủ quan của mắt người** :
  - IQA toàn tham chiếu (FR‑IQA): với điều kiện có ảnh tham chiếu chất lượng cao, so sánh từng pixel hoặc đặc trưng giữa ảnh cần đánh giá và ảnh tham chiếu để đo mức độ biến dạng, dùng cho nghiên cứu thuật toán và đánh giá thực nghiệm.
  - IQA không tham chiếu (NR‑IQA / Blind IQA): phổ biến hơn trong các tình huống thực tế, không có ảnh tham chiếu, chỉ có thể suy luận chất lượng từ các đặc trưng thống kê hoặc đặc trưng sâu của một ảnh đơn lẻ, đòi hỏi mô hình học từ lượng lớn ảnh và điểm chủ quan để biết "mắt người thích loại ảnh như thế nào".
  - IQA giả tham chiếu / tham chiếu giảm độ phân giải: trong một số tình huống, có thể sử dụng phiên bản độ phân giải thấp trước khi nén, "ảnh lý tưởng" do mô hình dự đoán, v.v. làm tham chiếu gần đúng, cân bằng giữa tính khả thi và độ chính xác đánh giá.
- **Mô hình**
  Các mô hình IQA được chia đại thể thành hai loại: **chỉ số đặc trưng thủ công truyền thống** và **dự đoán chất lượng dựa trên học sâu** :
  - Chỉ số truyền thống:
    - FR‑IQA: PSNR, SSIM, MS‑SSIM, FSIM, v.v., tập trung vào cấu trúc, độ tương phản và thông tin pha, nhạy cảm với các suy giảm đơn giản (như thêm nhiễu, làm mờ).
    - Chỉ số cảm quan: LPIPS, DISTS, v.v., đo lường sự khác biệt cảm quan giữa các ảnh trong không gian đặc trưng sâu, có độ tương quan cao hơn với cảm nhận chủ quan của mắt người.
  - IQA không tham chiếu / dựa trên học tập:
    - Phương pháp sớm: BRISQUE, NIQE, dòng BLIINDS, v.v., xuất phát từ thống kê cảnh tự nhiên (NSS) và đặc trưng thủ công, huấn luyện mô hình nông để dự đoán điểm chất lượng.
    - NR‑IQA sâu: RankIQA, DBCNN, HyperIQA, MUSIQ, v.v., trực tiếp trích xuất đặc trưng từ ảnh bằng CNN / ViT, và huấn luyện có giám sát trên dữ liệu MOS (Mean Opinion Score, điểm chủ quan trung bình), khiến đầu ra điểm chất lượng khớp tối đa với đánh giá của mắt người.
    - Biểu diễn tiền huấn luyện: sử dụng đặc trưng từ các mô hình lớn như CLIP, ViT làm đầu vào hoặc backbone cho mạng dự đoán chất lượng, tinh chỉnh trên dữ liệu MOS hạn chế, nâng cao khả năng tổng quát hóa trên các loại biến dạng phức tạp.

Nhìn tổng thể, IQA không phải là một chỉ số đơn lẻ "càng cao càng tốt", mà là một hệ thống đánh giá gắn liền với mục tiêu nghiệp vụ cụ thể: trong một số tình huống (như tăng cường giám sát), việc giữ lại chi tiết và khả năng nhận diện quan trọng hơn tính tự nhiên về mặt thị giác; trên nền tảng sáng tạo nội dung, cảm nhận trực quan và tiêu chuẩn thẩm mỹ lại chiếm ưu thế. Do đó, cách làm phổ biến trong công nghiệp là: trên nền tảng mô hình IQA tổng quát, thông qua tinh chỉnh hoặc học trọng số với một lượng nhỏ dữ liệu nghiệp vụ, xây dựng bộ đánh giá chất lượng "nhận thức nhiệm vụ".

### 2.10.1 Các loại hình đánh giá: có tham chiếu, không tham chiếu và giả tham chiếu

Dựa trên việc có tồn tại ảnh tham chiếu chất lượng cao hay không, IQA có thể được chia thành ba loại: **toàn tham chiếu (FR‑IQA)** , **không tham chiếu (NR‑IQA) và giả tham chiếu** .

Trong **IQA toàn tham chiếu**, chúng ta giả định tồn tại một ảnh tham chiếu chất lượng cao lý tưởng, ảnh cần đánh giá là phiên bản suy giảm sau khi trải qua nén, truyền tải hoặc xử lý. Mô hình so sánh từng pixel hoặc cấp độ đặc trưng giữa hai ảnh để định lượng mức độ biến dạng. PSNR là phép đo đơn giản nhất (dựa trên sai số bình phương trung bình), SSIM/MS‑SSIM/FSIM, v.v. còn xem xét thêm độ sáng, độ tương phản, cấu trúc hoặc thông tin pha, ở một mức độ nhất định gần gũi hơn với cảm nhận của mắt người. Những chỉ số này rất phù hợp để đánh giá các phương pháp mã hóa-giải mã, siêu phân giải, khử nhiễu trong giai đoạn phát triển thuật toán, nhưng trong nghiệp vụ thực tế thường thiếu ảnh tham chiếu nên phạm vi ứng dụng có hạn.

**IQA không tham chiếu (Blind IQA)** là thiết lập phổ biến hơn trong các hệ thống thực tế: chỉ có bản thân ảnh cần đánh giá, không có bất kỳ tham chiếu nào. Các phương pháp không tham chiếu sớm (như BRISQUE, NIQE, BLIINDS, v.v.) chủ yếu dựa trên thống kê cảnh tự nhiên: giả định rằng ảnh tự nhiên chất lượng cao có hình thái ổn định trong một số phân phối thống kê nhất định, biến dạng sẽ gây ra thay đổi trong các đặc trưng thống kê, từ đó có thể huấn luyện mô hình dự đoán điểm chất lượng dựa trên những đặc trưng này. Trong kỷ nguyên học sâu, mô hình NR‑IQA thường trực tiếp sử dụng CNN / ViT để trích xuất đặc trưng, và hồi quy điểm chất lượng hoặc học quan hệ xếp hạng trên tập dữ liệu có kèm điểm chủ quan của mắt người (MOS), giúp nó bao phủ được nhiều loại biến dạng như nhiễu, mờ, nén giả, phơi sáng bất thường.

**IQA giả tham chiếu / tham chiếu giảm độ phân giải** nằm giữa hai loại trên: khi không có tham chiếu chất lượng cao thực sự, sử dụng một phiên bản gần đúng có thể thu được (như ảnh độ phân giải thấp trước khi nén, "ảnh sạch" do mô hình dự đoán) làm tham chiếu để ước lượng mức độ suy giảm. Cách tiếp cận này thường thấy trong các tác vụ giám sát chất lượng video trực tuyến, tối ưu hóa mã hóa-giải mã, có thể đạt được sự cân bằng giữa chi phí và độ chính xác.

### 2.10.2 Chỉ số và mô hình học tập: từ PSNR đến dự đoán chất lượng cảm quan

Ở cấp độ triển khai cụ thể, IQA sử dụng nhiều chỉ số và mô hình học tập khác nhau để tiệm cận cảm nhận chủ quan của mắt người.

Về mặt **chỉ số truyền thống**:

- PSNR trực tiếp dựa trên sai số cấp pixel, đơn giản và hiệu quả, nhưng đối với những thay đổi không nhạy với mắt người (như dịch chuyển nhẹ, lọc giữ cấu trúc) cũng sẽ đưa ra mức phạt lớn;
- SSIM, MS‑SSIM, FSIM, v.v. mô hình hóa độ tương tự ảnh từ nhiều chiều như độ sáng, độ tương phản, cấu trúc, pha, nhạy cảm hơn với biến dạng cấu trúc và cũng phản ánh ở mức nhất định sự ưu tiên của mắt người đối với thông tin cấu trúc.

Về mặt **chỉ số cảm quan**: LPIPS, DISTS, v.v. tính toán khác biệt vector trong các tầng đặc trưng bên trong của mạng sâu tiền huấn luyện (VGG, AlexNet, ViT, v.v.), và gán trọng số theo tầm quan trọng của từng tầng, thu được một "khoảng cách trong không gian đặc trưng", có độ tương quan cao hơn với độ tương tự cảm quan chủ quan. Chúng đặc biệt phù hợp làm mục tiêu huấn luyện hoặc chỉ số đánh giá cho các tác vụ sinh (siêu phân giải, sinh ảnh, chỉnh sửa), được dùng để đo lường "trông có giống hay không".

Về mặt **dự đoán chất lượng dựa trên học tập**, các mô hình NR‑IQA sâu (như RankIQA, DBCNN, HyperIQA, MUSIQ, v.v.) trực tiếp chấm điểm hoặc xếp hạng ảnh:

- Trong dữ liệu huấn luyện, mỗi ảnh đi kèm một tập điểm chủ quan (MOS), mô hình sử dụng đây làm giám sát để huấn luyện mạng hồi quy hoặc xếp hạng chất lượng;
- Về cấu trúc mô hình, thường sử dụng CNN/ViT + pooling toàn cục + MLP để xuất điểm chất lượng, hoặc xuất một phân phối chất lượng rồi lấy kỳ vọng;
- Một số phương pháp còn tận dụng học tương phản hoặc học xếp hạng (pairwise ranking), khiến mô hình chú trọng hơn vào quan hệ "tốt/xấu tương đối" thay vì điểm tuyệt đối.

Cùng với sự phổ biến của các mô hình thị giác tiền huấn luyện quy mô lớn, ngày càng nhiều phương pháp IQA áp dụng mô hình "Backbone tiền huấn luyện + đầu nhẹ": tận dụng biểu diễn thị giác phong phú từ CLIP, ViT, tinh chỉnh trên lượng dữ liệu MOS ít ỏi, từ đó duy trì khả năng tổng quát hóa tốt trên nhiều loại biến dạng và nhiều tình huống khác nhau.

Trong triển khai thực tế, thường kết hợp nhiều chỉ số nêu trên: ví dụ chỉ số FR‑IQA dùng để đánh giá cải tiến thuật toán trong giai đoạn thực nghiệm; mô hình NR‑IQA sâu dùng cho kiểm tra chất lượng trực tuyến theo thời gian thực; chỉ số cảm quan dùng cho tối ưu hóa nội bộ của tác vụ sinh. Thông qua thử nghiệm A/B, các chỉ số tự động này được căn chỉnh với dữ liệu người dùng thực tế (tỷ lệ nhấp, tỷ lệ xem hết, tỷ lệ khiếu nại, v.v.), từng bước xây dựng nên "hệ thống đo lường chất lượng cảm quan" có độ tương quan cao với mục tiêu nghiệp vụ.# 3. 3D / Không gian (3D / Spatial / XR)

Khi ứng dụng phát triển từ "hình ảnh/video phẳng" sang lái xe tự động, robot, AR/VR/XR và các kịch bản khác, hệ thống không còn chỉ dừng lại ở việc "nhìn thấy pixel 2D", mà cần hiểu được **cấu trúc ba chiều, tỷ lệ và mối quan hệ tư thế trong thế giới thực**. Nhóm tác vụ này được gọi chung là mô thức 3D / không gian: bao gồm cả mô hình hóa chính xác về hình học và cấu trúc liên kết, cũng như hiểu biết ngữ nghĩa, định vị - dẫn đường và tạo nội dung trong không gian 3D. Một đầu kết nối với LiDAR, RGB‑D, IMU và nhiều loại cảm biến khác, đầu kia kết nối với mô-đun nhận thức lái xe tự động, hệ thống dẫn đường robot, mô hình môi trường ARKit/ARCore, ứng dụng quét và mô hình hóa 3D trên điện thoại, cùng các nền tảng digital twin.## 3.1 Nhận thức & Tái tạo 3D (3D Perception & Reconstruction)

Trong thị giác 2D, chúng ta chỉ nhìn thấy "thế giới sau khi được chụp thành ảnh"; nhưng trong các tình huống như lái xe tự hành, robot, AR/VR, điều quan trọng hơn là: **vị trí, hình dạng và cấu trúc của thế giới thực trong không gian 3D**. Nhận thức & tái tạo 3D là quá trình bắt đầu từ nhiều loại cảm biến (camera, LiDAR, camera độ sâu, v.v.), khôi phục thông tin hình học ba chiều của môi trường, rồi biểu diễn dưới dạng đám mây điểm, voxel, lưới (Mesh), trường ẩn, v.v., cung cấp nền tảng cho quy hoạch đường đi, mô phỏng vật lý, bản sao số và tạo nội dung 3D.

Trong thực tiễn kỹ thuật, tầng này bao gồm nhiều hướng công nghệ từ **xử lý đám mây điểm** đến **tái tạo hình học đa góc nhìn** rồi đến **trường bức xạ thần kinh / kết xuất trường thần kinh**, tương ứng với các mô-đun nhận thức 3D trong lái xe tự hành, mô hình hóa môi trường ARKit/ARCore, ứng dụng quét/mô hình hóa 3D trên điện thoại, cũng như nền tảng mô hình hóa bản sao số thành phố/khu công nghiệp. Dưới đây sẽ triển khai từ ba góc độ **tình huống**, **nguyên lý**, **mô hình**, rồi chia nhỏ thêm một số hướng con then chốt.

- **Tình huống**
  - Lái xe tự hành và hỗ trợ lái xe: từ đám mây điểm LiDAR trên xe và hình ảnh đa camera, nhận thức cấu trúc 3D của phương tiện, người đi bộ, lề đường, vạch làn đường, cơ sở hạ tầng giao thông, v.v., phục vụ quy hoạch đường đi và quyết định an toàn.
  - Quét môi trường trong nhà/ngoài trời: sử dụng điện thoại/máy tính bảng (ánh sáng cấu trúc / ToF / stereo) hoặc máy quét cầm tay để thu thập dữ liệu đa góc nhìn, tái tạo mô hình 3D của căn phòng, tòa nhà, khu phố theo thời gian thực, phục vụ mô hình hóa AR, thiết kế nội thất, bản sao số.
  - Bản sao số và BIM: tái tạo nhà máy, khu công nghiệp, thành phố thực tế thành mô hình 3D độ chính xác cao thông qua hình ảnh đa góc nhìn và đám mây điểm, phục vụ quản lý vận hành, mô phỏng và trực quan hóa.
  - Quét 3D cấp tiêu dùng: ứng dụng quét 3D trên điện thoại, công cụ "chụp ảnh thành mô hình 3D" chỉ với một chạm, cung cấp hình học thô cho in 3D, thử đồ ảo, sản xuất tài sản game/phim ảnh.
- **Nguyên lý**
  - Xử lý đám mây điểm: coi tập hợp điểm thưa/dày thu được từ LiDAR hoặc tái tạo đa góc nhìn như một tập điểm lấy mẫu 3D, tiến hành lọc, đăng ký, giảm mẫu và học đặc trưng trên đó, sau đó thực hiện phân loại, phân đoạn ngữ nghĩa/thực thể hoặc phát hiện đối tượng 3D.
  - Hình học đa góc nhìn và tái tạo ba chiều: ước tính tư thế camera và đám mây điểm 3D thưa giữa nhiều ảnh thông qua SfM (Structure‑from‑Motion), rồi tạo đám mây điểm dày thông qua MVS (Multi‑View Stereo), sau đó tiến hành tái tạo lưới và ánh xạ kết cấu.
  - Trường bức xạ thần kinh / trường ẩn thần kinh: sử dụng các phương pháp như NeRF, Instant‑NGP, Gaussian Splatting, biểu diễn cảnh 3D dưới dạng trường mật độ thể tích/màu sắc liên tục hoặc tập hợp hạt Gaussian, tạo ảnh thông qua kết xuất thể tích hoặc rasterization, học từ giám sát đa góc nhìn; sau khi huấn luyện xong có thể thực hiện kết xuất góc nhìn mới và trích xuất hình học.
- **Mô hình**
  - Mạng đám mây điểm: PointNet / PointNet++, PointCNN, DGCNN, MinkowskiNet, v.v. học đặc trưng trực tiếp trên điểm hoặc voxel thưa, dùng cho phân loại, phân đoạn và phát hiện 3D đám mây điểm. Trong lái xe tự hành thường dùng các khung phát hiện 3D như VoxelNet, SECOND, CenterPoint, chuyển đổi đám mây điểm thành voxel hoặc đặc trưng BEV (góc nhìn từ trên xuống) rồi tiến hành phát hiện.
  - Chuỗi công cụ tái tạo hình học: các hệ thống SfM/MVS truyền thống như COLMAP, OpenMVG / OpenMVS, có thể khôi phục tư thế camera và đám mây điểm dày từ ảnh đa góc nhìn, xây dựng Mesh chất lượng cao.
  - Tái tạo và kết xuất trường thần kinh: NeRF / Instant‑NGP, Gaussian Splatting cùng nhiều mô hình cải tiến, mã hóa cảnh trong mạng nơ-ron hoặc đám mây Gaussian, thực hiện tổng hợp góc nhìn mới với độ trung thực cao và tái tạo cảnh 3D, đồng thời dần hình thành sản phẩm kỹ thuật hóa. Trong ngành cũng đã xuất hiện các dịch vụ AI 3D hướng đến nhà phát triển và sản xuất nội dung như "Hỗn Nguyên 3D", "Tripo", đóng gói các công nghệ NeRF/Gaussian thành API đám mây hoặc công cụ tương tác.

Bắt đầu từ tầng này, hình học truyền thống và học sâu, biểu diễn ẩn và lưới tường minh đan xen chặt chẽ với nhau, vừa phải giải quyết vấn đề "làm sao tái tạo chính xác thế giới thực", vừa phải cân nhắc tính thời gian thực và khả dụng, phục vụ cho các tầng trên như hiểu cảnh 3D, tạo và chỉnh sửa 3D.

### 3.1.1 Xử lý đám mây điểm & Phát hiện đối tượng 3D

Đối với lái xe tự hành, robot và đo đạc độ chính xác cao, đám mây điểm LiDAR là một trong những thông tin cảm biến 3D quan trọng nhất. Đám mây điểm là một tập hợp điểm thưa gồm các tọa độ ba chiều (đôi khi kèm theo cường độ phản xạ, dấu thời gian, v.v.), không có cấu trúc lưới quy tắc, đặt ra thách thức cho tích chập truyền thống. Mục tiêu của xử lý đám mây điểm là trích xuất thông tin hình học và ngữ nghĩa hữu ích từ những điểm phi cấu trúc này, ví dụ "đây là một chiếc xe", "đây là lề đường/mặt đất", "đây là một tòa nhà".

Trong các tác vụ **phân loại và phân đoạn đám mây điểm**, chúng ta thường quan tâm: một điểm (hoặc cụm điểm) thuộc về loại cấu trúc nào, như xe, người đi bộ, mặt đất, lề đường, tòa nhà, thảm thực vật, v.v., hoặc thực hiện phân đoạn ngữ nghĩa/thực thể cho cảnh. Xét từ cách mô hình hóa, có thể chia đại khái thành ba loại:

1. Mạng đám mây điểm trực tiếp: PointNet / PointNet++, PointCNN, DGCNN, v.v. định nghĩa trực tiếp các phép toán "không nhạy với hoán vị tập điểm" trên tập điểm, xây dựng đặc trưng phân cấp thông qua tổng hợp lân cận cục bộ, phù hợp cho phân loại và phân đoạn đám mây điểm quy mô vừa và nhỏ.
2. Voxel và tích chập thưa: raster hóa đám mây điểm thành voxel 3D, rồi dùng CNN 3D thưa (như VoxelNet, MinkowskiNet) để tích chập, cân bằng giữa tính quy tắc cấu trúc và tính thưa không gian, được ứng dụng rộng rãi trong phát hiện 3D cho lái xe tự hành.
3. Chiếu và đa góc nhìn: chiếu đám mây điểm lên BEV (góc nhìn từ trên xuống), bản đồ độ sâu góc nhìn trước hoặc các góc nhìn đa chiều, rồi dùng CNN 2D để trích xuất đặc trưng, tương đối dễ kết hợp với các mạng phát hiện 2D đã trưởng thành.

Trong **phát hiện đối tượng 3D**, mục tiêu không chỉ đơn thuần là gán nhãn cho điểm, mà là dự đoán hộp giới hạn 3D (vị trí, kích thước, hướng) và lớp của nó, đây là cốt lõi của nhận thức môi trường trong lái xe tự hành. Các phương pháp điển hình như VoxelNet, SECOND, PointPillars và CenterPoint, thường chuyển đổi đám mây điểm thành biểu diễn voxel hoặc trụ, rồi thực hiện hồi quy phát hiện trên không gian BEV hoặc 3D. Các phương pháp như CenterPoint thông qua mô hình "phát hiện điểm trung tâm", trực tiếp phát hiện tâm đối tượng cùng kích thước/hướng của nó trên BEV, vừa có độ chính xác vừa có tốc độ. Cùng với sự tiến hóa của học sâu và phần cứng cảm biến, phát hiện 3D đã có thể thực hiện suy luận thời gian thực trên chip cấp ô tô, trở thành một trong những mô-đun cơ bản của ngăn xếp nhận thức lái xe tự hành.

### 3.1.2 Hình học đa góc nhìn & Tái tạo ba chiều: từ ảnh đến Mesh

Nếu không có LiDAR, liệu có thể "hiểu" 3D không? Câu trả lời là có thể — hình học đa góc nhìn và tái tạo ba chiều dựa vào "nhiều bức ảnh + chuyển động camera". Bằng cách chụp cùng một cảnh từ các góc nhìn khác nhau, chúng ta có thể sử dụng ràng buộc hình học để khôi phục tư thế camera và cấu trúc không gian, đây chính là pipeline SfM/MVS cổ điển.

**SfM (Structure‑from‑Motion)** chủ yếu giải quyết hai vấn đề:

1. Từ nhiều ảnh ghép cặp hoặc ảnh đa góc nhìn, ước tính tham số ngoại của camera (vị trí và hướng) cho mỗi bức ảnh;
2. Khôi phục một tập hợp điểm đặc trưng 3D thưa trong hệ tọa độ thống nhất.

Các công cụ điển hình như COLMAP, OpenMVG, thông qua trích xuất và khớp đặc trưng (SIFT/ORB, v.v.), BA (Bundle Adjustment) tăng dần hoặc toàn cục, có thể tự động khôi phục đám mây điểm thưa và tư thế camera từ tập hợp ảnh chưa được hiệu chỉnh.
Trên cơ sở đó, **MVS (Multi‑View Stereo)** sẽ tận dụng tính nhất quán trắc quang giữa các góc nhìn để tạo ra đám mây điểm dày: ước tính độ sâu cho mỗi pixel/tia nhìn, dần lấp đầy chi tiết hình học của cảnh.

Sau khi có được đám mây điểm dày, bước tiếp theo là **tái tạo lưới (Mesh Reconstruction)** :

- Thông qua Poisson Surface Reconstruction, Marching Cubes hoặc các phương pháp dựa trên học, "bọc" các điểm rời rạc thành bề mặt liên tục, tạo thành Mesh có cấu trúc tô-pô.
- Tiếp theo thường còn tiến hành lấp lỗ, làm mịn, tối ưu biên, và ánh xạ kết cấu (Texture Mapping), thu được mô hình 3D có thể dùng trực tiếp cho kết xuất và chỉnh sửa.

Về hình thái sản phẩm, toàn bộ pipeline này đã được hạ tầng hóa thông qua phần mềm desktop, dịch vụ đám mây và SDK. Ví dụ: ứng dụng quét 3D trên điện thoại sẽ gọi quy trình tương tự SfM/MVS ở hậu trường, cho phép người dùng "đi một vòng chụp ảnh" hoặc "quét một vòng video" rồi tự động xuất ra mô hình lưới có thể nhập vào công cụ game; nền tảng bản sao số thì chạy tái tạo quy mô lớn ở cấp thành phố/khu công nghiệp bằng ảnh hàng không + dữ liệu phố cảnh, tạo ra cảnh 3D có thể tương tác.

### 3.1.3 Trường bức xạ thần kinh & Kết xuất thể tích: NeRF, Gaussian và tái tạo 3D thế hệ mới

SfM/MVS/tái tạo lưới truyền thống có thể tạo ra hình học tường minh có cấu trúc tốt, nhưng vẫn có hạn chế về chất lượng kết xuất, tính liên tục góc nhìn và biểu hiện chi tiết; trong khi trường bức xạ thần kinh (NeRF) và các công trình tiếp theo đã định nghĩa lại tái tạo 3D và tổng hợp góc nhìn mới theo cách **trường ẩn + kết xuất thể tích**.

Trong NeRF, toàn bộ cảnh 3D được mô hình hóa thành một hàm liên tục:

$$
F_\theta(\mathbf{x}, \mathbf{d}) = (\sigma, \mathbf{c})
$$

Trong đó $\mathbf{x}$ biểu thị vị trí điểm trong không gian ba chiều, $\mathbf{d}$ biểu thị hướng quan sát, $\sigma$ biểu thị mật độ thể tích, $\mathbf{c}$ biểu thị màu sắc, $\theta$ là tham số mạng.

Khi cho trước vị trí điểm x và hướng quan sát d trong không gian ba chiều, mạng sẽ xuất ra mật độ thể tích σ và màu sắc c tương ứng với điểm đó. Dọc theo hướng tia nhìn của camera, thực hiện phép tích phân kết xuất thể tích trên hàm ánh xạ này, chúng ta có thể thu được màu pixel dưới tư thế camera đó; ngược lại, chỉ cần cung cấp một tập ảnh đa góc nhìn cùng tham số camera của chúng, chúng ta có thể giải ra tham số θ của mô hình bằng cách tối thiểu hóa sai số giữa kết quả kết xuất và ảnh thực. Sau khi mô hình huấn luyện xong, chỉ cần thay đổi tư thế camera là có thể tổng hợp những ảnh góc nhìn mới "chưa từng được chụp thực sự" (Novel View Synthesis).

NeRF truyền thống có tốc độ huấn luyện và kết xuất đều khá chậm, các công trình tiếp theo như **Instant‑NGP** đã tăng tốc đáng kể hội tụ và suy luận thông qua các kỹ thuật như mã hóa bảng băm đa độ phân giải; **Gaussian Splatting** thì thay thế biểu diễn cảnh bằng các hạt Gaussian 3D, thông qua chiến lược rasterization hiệu quả, đạt được kết xuất góc nhìn mới chất lượng cao, thời gian thực. Đồng thời, nhiều công trình còn mở rộng NeRF/Gaussian theo hướng có thể chỉnh sửa, đa phương thức, có thể tổ hợp, v.v., khiến chúng dần chuyển từ nguyên mẫu nghiên cứu sang hệ thống kỹ thuật.

Ở cấp độ sản phẩm hóa, các công nghệ lớp NeRF/Gaussian đã được nhúng vào nhiều sản phẩm AI 3D:

- Công cụ "video đa góc nhìn → cảnh 3D" trên điện thoại/PC, tầng dưới thường dựa trên trường thần kinh hoặc hạt Gaussian để hoàn thành tái tạo và kết xuất;
- Trong pipeline tài sản game/phim ảnh, sử dụng trường thần kinh để chụp cảnh nhanh và khôi phục ánh sáng, rồi xuất ra Mesh + kết cấu cho các công cụ DCC truyền thống sử dụng;
- Các dịch vụ AI 3D do các nhà cung cấp đám mây lớn và nền tảng nội dung ra mắt, như "Hỗn Nguyên 3D" của Tencent, Tripo, v.v., thường hỗ trợ "nhiều ảnh góc nhìn/video ngắn → mô hình/cảnh 3D có thể chỉnh sửa", bên trong thì tổng hợp sử dụng trường bức xạ thần kinh, biểu diễn SDF/Gaussian và tái tạo tường minh tiếp theo, đóng gói kết quả 3D chất lượng cao thành API hoặc sản phẩm tương tác thân thiện với nhà phát triển.## 3.2 Hiểu và Định vị Cảnh 3D (3D Scene Understanding & SLAM)

Nếu như Nhận thức và Tái tạo 3D trả lời câu hỏi "thế giới này trông như thế nào", thì Hiểu và Định vị Cảnh 3D tiến thêm một bước để trả lời: "**Tôi đang ở đâu trong thế giới này? Những chỗ nào trong thế giới này có thể đi được, đâu là chướng ngại vật?**" Đối với robot hút bụi, robot AGV, drone, điều hướng AR và hệ thống định vị trong nhà, khả năng tự định vị, tự xây dựng bản đồ và tự lập kế hoạch đường đi trong môi trường 3D là điều kiện tiên quyết để tồn tại.

Phần công việc này chủ yếu xoay quanh **Hiểu ngữ nghĩa 3D** và **SLAM (Simultaneous Localization and Mapping)** : phần trước thực hiện phân đoạn ngữ nghĩa và nhận diện vùng có thể di chuyển trong cảnh 3D đã được tái tạo, phần sau sử dụng các cảm biến như visual/IMU/LiDAR để ước tính tư thế camera/robot và xây dựng bản đồ. Về mặt kỹ thuật, tầng này thường được nhúng dưới dạng SDK hoặc mô-đun thuật toán vào khung gầm robot, bộ điều khiển bay drone hoặc công cụ AR trên thiết bị di động.

- **Kịch bản**
  - Robot gia dụng và dịch vụ: robot hút bụi, robot giao hàng/tuần tra xây dựng bản đồ trong môi trường trong nhà, nhận diện loại phòng và chướng ngại vật, thực hiện lập kế hoạch tự động cho đường đi quét dọn hoặc tuần tra.
  - Kho bãi và logistics: robot AGV/AMR tự động điều hướng trong kho, nhận diện kệ hàng, lối đi và khu vực cấm, hoàn thành nhiệm vụ vận chuyển và kiểm kê.
  - Drone và robot ngoài trời: xây dựng bản đồ 3D trong môi trường ngoài trời, tránh các chướng ngại vật như tòa nhà, cây cối, dây điện, thực hiện nhiệm vụ tuần tra, đo đạc và an ninh.
  - Điều hướng AR và định vị trong nhà: điện thoại/kính AR thu được tư thế camera thông qua SLAM, và phủ lên bản đồ ngữ nghĩa các mũi tên điều hướng, thông tin phòng và POI, mang lại trải nghiệm dẫn đường và điều hướng nhập vai.
- **Nguyên lý**
  - Phân đoạn ngữ nghĩa 3D và hiểu cảnh: thực hiện phân đoạn ngữ nghĩa trên biểu diễn đám mây điểm hoặc voxel, phân biệt các cấu trúc như tường, mặt đất, bàn ghế, kệ hàng, cửa ra vào và cửa sổ, đồng thời nhận diện vùng có thể di chuyển và chướng ngại vật, cung cấp thông tin tầng ngữ nghĩa cho điều hướng và ra quyết định hành vi.
  - Ước tính tư thế và SLAM: thông qua Visual SLAM (monocular/stereo/RGB‑D) hoặc LiDAR‑SLAM, ước tính tư thế 6D của camera/robot từ dữ liệu cảm biến liên tục, xử lý phát hiện khép vòng và tối ưu hóa bản đồ, khi cần thiết kết hợp thông tin đa nguồn như IMU, tốc độ bánh xe, GNSS để tăng độ bền vững.
  - Xây dựng bản đồ và điều hướng: phủ thông tin hình học và ngữ nghĩa lên bản đồ cục bộ/toàn cục, tạo thành bản đồ 2D/3D/topology/ngữ nghĩa, và trên cơ sở đó thực hiện lập kế hoạch đường đi, tránh chướng ngại vật và phân công nhiệm vụ.
- **Mô hình**
  - Hệ thống SLAM: các phương pháp dựa trên điểm đặc trưng cổ điển như dòng ORB‑SLAM, phương pháp trực tiếp DSO, cùng với VINS‑Mono / VINS‑Fusion tích hợp dẫn đường quán tính, thông qua theo dõi đặc trưng front-end + tối ưu hóa back-end để đạt được ước tính tư thế chính xác và bản đồ dày đặc/bán dày đặc. Trong SLAM kết hợp LiDAR/visual‑LiDAR thường gặp các framework như LIO‑SAM.
  - Mạng phân đoạn ngữ nghĩa 3D: 3D U‑Net, MinkowskiNet và các mạng 3D CNN khác, cùng với dòng PointNet++ / KPConv / SparseConv dựa trên đám mây điểm, được sử dụng để phân đoạn ngữ nghĩa và phân đoạn thể hiện trên đám mây điểm/voxel.
  - Định vị kết hợp đa cảm biến: các phương pháp dựa trên tối ưu hóa đồ thị hoặc bộ lọc (EKF/UKF), kết hợp thông tin đa nguồn như visual, IMU, LiDAR, odometry trong không gian trạng thái thống nhất, nâng cao độ ổn định định vị trong điều kiện ánh sáng kém, thiếu texture hoặc môi trường động.

Nhìn chung, Hiểu và Định vị Cảnh 3D tạo thành nền tảng để robot "có thể di chuyển": vừa phải xây dựng một khung tự định vị đáng tin cậy trong thế giới ba chiều phức tạp, vừa phải làm cho bản đồ trở nên "có ý nghĩa", từ đó hỗ trợ lập kế hoạch nhiệm vụ cấp cao và tương tác người-máy.

### 3.2.1 Phân đoạn Ngữ nghĩa 3D và Hiểu Vùng Có Thể Di Chuyển

Trong bản đồ hình học thuần túy, tất cả các cấu trúc chỉ là những điểm/voxel không có sự khác biệt; nhưng trong ứng dụng thực tế, điều chúng ta quan tâm là: đâu là mặt đất, đâu là tường, đâu có bàn hoặc kệ hàng, đâu có thể đi qua được. **Phân đoạn ngữ nghĩa 3D** chính là gán nhãn ngữ nghĩa cho mỗi điểm hoặc voxel, chuyển đổi "hình học thuần túy" thành "hình học + ngữ nghĩa".

Trong các kịch bản trong nhà/ngoài trời, các mục tiêu điển hình bao gồm:

- Cấu trúc cố định: tường, mặt đất, trần nhà, cầu thang, cột, đường xá, lề đường, v.v.;
- Đồ đạc và tiện nghi: bàn ghế, tủ, kệ hàng, cửa ra vào và cửa sổ, tay vịn, v.v.;
- Vùng có thể/không thể di chuyển: khu vực robot có thể đi lại, chướng ngại vật cần tránh, khu vực cấm vào, v.v.

Về mặt mô hình hóa, phân đoạn ngữ nghĩa 3D thường sử dụng:

- Phương pháp voxel/tích chập thưa: sau khi voxel hóa đám mây điểm, sử dụng các mạng CNN thưa như 3D U‑Net, MinkowskiNet để học đặc trưng cấp voxel, cân bằng giữa chi tiết cục bộ và cấu trúc toàn cục.
- Phương pháp trực tiếp trên đám mây điểm: các mạng đám mây điểm như PointNet++, KPConv thực hiện tổng hợp đặc trưng trên vùng lân cận cục bộ, đạt được dự đoán ngữ nghĩa cấp điểm.

Trong các ứng dụng như robot hút bụi, robot AGV, kết quả phân đoạn ngữ nghĩa sẽ được trừu tượng hóa thêm thành **bản đồ ngữ nghĩa** : ví dụ phân chia phòng thành phòng ngủ/phòng khách/nhà bếp, phân chia không gian trong kho thành khu vực kệ hàng/lối đi/khu vực cấm. Robot không chỉ biết "có thể đi đâu", mà còn có thể tùy chỉnh các chiến lược khác nhau dựa trên loại phòng (như tránh khu vực thảm trong phòng ngủ, ưu tiên phủ sóng một số khu vực kệ hàng nhất định trong kho).

### 3.2.2 Ước tính Tư thế, SLAM và Định vị Kết hợp Đa Cảm biến

Mục tiêu của **SLAM (Simultaneous Localization and Mapping)** là: trong môi trường chưa biết, vừa di chuyển vừa ước tính quỹ đạo của bản thân, đồng thời xây dựng bản đồ môi trường. Đối với môi trường trong nhà không có hỗ trợ định vị bên ngoài độ chính xác cao (như RTK‑GNSS), SLAM là lựa chọn hàng đầu của đại đa số robot và công cụ AR.

Trong Visual SLAM, các phương pháp tiêu biểu như ORB‑SLAM, DSO, VINS‑Mono/VINS‑Fusion thường được chia thành một số mô-đun chính:

- Front-end: trích xuất và theo dõi các điểm đặc trưng/khối ảnh từ các hình ảnh liên tiếp, ước tính tư thế tương đối giữa các khung hình liền kề.
- Back-end: thực hiện BA hoặc tối ưu hóa đồ thị trong cửa sổ trượt hoặc đồ thị toàn cục, xử lý độ trôi, phát hiện khép vòng và tái định vị.
- Bản đồ: xây dựng bản đồ dày đặc hoặc bán dày đặc dựa trên thông tin tư thế và độ sâu, cung cấp nền tảng cho điều hướng hoặc kết xuất tiếp theo.

Visual thuần túy dễ bị lỗi khi thiếu texture hoặc ánh sáng thay đổi mạnh, do đó trong thực tế thường áp dụng **định vị kết hợp đa cảm biến** :

- Visual + IMU: các framework như VINS‑Mono/VINS‑Fusion kết hợp độ chính xác tần số cao trong thời gian ngắn của IMU với ràng buộc tỷ lệ và hình học của visual, cải thiện đáng kể độ ổn định trong các tình huống thời gian ngắn và rẽ gấp.
- LiDAR + IMU + Visual: các framework odometry như LIO‑SAM đưa dẫn đường quán tính và thông tin visual tùy chọn vào LiDAR‑SLAM, tận dụng đặc tính bổ trợ của ba loại để đạt được định vị bền vững, được sử dụng rộng rãi trong lái xe tự động và đo đạc độ chính xác cao.

Ở cấp độ sản phẩm, các phương pháp này thường được đóng gói thành một phần của bộ điều khiển khung gầm robot, bộ điều khiển bay drone, công cụ AR (như Visual‑Inertial SLAM trong ARKit/ARCore) hoặc SDK định vị trong nhà, che giấu logic ước tính trạng thái và tối ưu hóa đồ thị phức tạp khỏi ứng dụng tầng trên, cho phép nhà phát triển trực tiếp nhận được "tư thế thời gian thực + bản đồ".

### 3.2.3 Bản đồ Ngữ nghĩa, Điều hướng và Tránh Chướng ngại Vật

Sau khi có ước tính tư thế ổn định và bản đồ hình học/ngữ nghĩa, bước tiếp theo là làm cho robot "di chuyển một cách thông minh". Phần này chủ yếu liên quan đến **xây dựng bản đồ ngữ nghĩa, lập kế hoạch đường đi và tránh chướng ngại vật** .

- **Xây dựng bản đồ ngữ nghĩa** : phủ thông tin ngữ nghĩa (loại phòng, POI, nhãn khu vực) lên bản đồ hình học, tạo thành biểu diễn bản đồ phù hợp cho quyết định cấp cao. Ví dụ:
- Trong kịch bản gia đình, phân chia bản đồ thành các khu vực như phòng ngủ, phòng khách, nhà bếp, nhà vệ sinh;
- Trong kịch bản kho bãi, đánh dấu vị trí kệ hàng, khu vực bốc xếp, khu vực nguy hiểm, v.v.;
- Trong trung tâm thương mại/triển lãm lớn, đánh dấu các POI như cửa hàng, quầy dịch vụ, nhà vệ sinh, được sử dụng cho điều hướng và dẫn đường AR.
- **Lập kế hoạch đường đi và tránh chướng ngại vật** : xây dựng bản đồ lưới hoặc bản đồ topology trên bản đồ, sử dụng các thuật toán lập kế hoạch như A*, D* Lite, RRT để tìm đường đi khả thi từ điểm bắt đầu đến điểm đích cho robot; đồng thời kết hợp nhận thức thời gian thực (chướng ngại vật phía trước, người đi bộ/xe cộ động), thực hiện lập kế hoạch lại cục bộ và tránh chướng ngại vật, đảm bảo an toàn và hiệu quả vận hành.
- **Hành vi điều hướng và lập lịch nhiệm vụ** : trong robot AGV và drone, còn phủ thêm mô-đun lập lịch nhiệm vụ và phối hợp đa tác nhân lên trên điều hướng: phân công nhiệm vụ, tránh tắc nghẽn, tối ưu hóa đường đi tổng thể và tiêu thụ năng lượng.

Hệ thống điều hướng AR và định vị trong nhà về bản chất cũng phụ thuộc vào bản đồ ngữ nghĩa và lập kế hoạch đường đi tương tự, chỉ khác là "người thực thi" chuyển từ robot sang con người: hệ thống thu được tư thế thiết bị của người dùng thông qua SLAM, lập kế hoạch đường đi trên bản đồ ngữ nghĩa, rồi trực quan hóa đường đi dưới dạng thực tế tăng cường phủ lên khung nhìn thế giới thực.## 3.3 Tạo và chỉnh sửa 3D (3D Generation & Editing)

Nếu như nhận thức 3D và SLAM là "thu thập và hiểu" hình học từ thế giới thực, thì tạo và chỉnh sửa 3D đứng ở góc độ sản xuất nội dung: **làm thế nào để dùng AI tự động sản xuất và biến đổi tài sản 3D**. Điều này trực tiếp hướng tới nhu cầu nội dung khổng lồ trong game, điện ảnh, nhân vật số, không gian ảo, trưng bày thương mại điện tử, in 3D, v.v.

Trong hai ba năm gần đây, cùng với những đột phá trong các công nghệ như NeRF/Gaussian, biểu diễn SDF, mô hình khuếch tán đa phương thức, việc tạo 3D đã bước vào giai đoạn phát triển nhanh chóng: tạo mô hình 3D hoặc cảnh 3D chỉ bằng một cú nhấp chuột từ văn bản, hình ảnh, video đã trở thành hiện thực, các nhà cung cấp đám mây lớn và các nhóm khởi nghiệp đã cho ra mắt các sản phẩm như "Hunyuan 3D", Tripo, DreamFusion / Magic3D được triển khai thành công cụ trực tuyến, giúp việc sản xuất 3D dần tiến hóa theo hướng "ai cũng có thể sử dụng". Tạo và chỉnh sửa 3D có thể được chia thành bốn loại năng lực: Text-to-3D, Image/Video-to-3D, tối ưu hóa và chỉnh sửa mô hình, cùng với rigging và hoạt hình.

- **Kịch bản**
  - Sản xuất tài sản game / điện ảnh: nhanh chóng tạo ra các mô hình 3D khả dụng cho nhân vật, đạo cụ, kiến trúc, cảnh quan, giảm đáng kể khối lượng công việc cho họa sĩ.
  - Thương mại điện tử và trưng bày sản phẩm: tự động tạo mô hình 3D trưng bày từ mô tả sản phẩm hoặc ảnh chụp, dùng cho xem mẫu 3D, thử đặt AR, quảng cáo tương tác.
  - Nhân vật số và nội dung ảo: nhanh chóng tạo ra tài sản 3D như nhân vật ảo, người mẫu thử đồ ảo, cảnh quay cho streamer ảo, hỗ trợ livestream, video ngắn và ứng dụng tương tác.
  - In 3D và tạo mô hình cá nhân hóa: tạo mô hình có thể in được từ phác thảo/ảnh/văn bản, hiện thực hóa quà tặng cá nhân hóa, thiết kế nguyên mẫu và ứng dụng giáo dục.
- **Nguyên lý**
  - Text-to-3D: mã hóa mô tả văn bản thành vector ngữ nghĩa, sau đó tạo ra biểu diễn 3D (NeRF/SDF/Gaussian/Mesh) thông qua tối ưu hóa nhiều giai đoạn hoặc quá trình khuếch tán, thường dựa vào mô hình Text-to-Image 2D mạnh mẽ làm "bộ chấm điểm" hoặc tiên nghiệm.
  - Image/Video-to-3D: sử dụng một hoặc nhiều ảnh, video đa góc nhìn làm giám sát, kết hợp NeRF, SDF hoặc biểu diễn kết hợp ẩn/tường minh để tái tạo mô hình 3D có hình học và kết cấu.
  - Tối ưu hóa và chỉnh sửa mô hình 3D: thực hiện retopology, giản lược mô hình, tăng cường chi tiết, tạo LOD, trải UV và tạo texture cho mô hình hiện có, cùng với biến dạng và cách điệu hóa dựa trên ngôn ngữ/hình ảnh.
  - Rigging và hoạt hình: tự động suy luận cấu trúc xương và hoàn thành Rigging cho nhân vật 3D, hỗ trợ hoạt hình xương và mô phỏng vật lý (vải, vật thể mềm, vật thể cứng), tạo thành tài sản động có thể điều khiển được.
- **Mô hình**
  - Biểu diễn cơ sở cho tạo 3D: NeRF / Instant-NGP, SDF (bề mặt ẩn), Gaussian Splatting và mạng tạo dựa trên Mesh, tạo thành không gian biểu diễn cho dữ liệu 3D.
  - Phương pháp Text-to-3D: các lộ trình điển hình như DreamFusion, Magic3D, Fantasia3D, hoàn thành việc tạo từ văn bản đến 3D end-to-end thông qua "mô hình Text-to-Image 2D + tối ưu hóa 3D" hoặc "mô hình khuếch tán 3D", đặt nền tảng kỹ thuật cho các sản phẩm sau này như Hunyuan 3D, Tripo.
  - Mô hình Image/Video-to-3D: khung tái tạo và tối ưu hóa dựa trên NeRF/SDF/Gaussian, khôi phục hình học và kết cấu 3D ổn định từ tính nhất quán đa góc nhìn và tiên nghiệm đơn góc nhìn.
  - Thuật toán rigging và hoạt hình: trích xuất xương tự động, dự đoán trọng số xương, Retargeting và tạo chuyển động dựa trên deep learning, cung cấp công cụ một chạm cho hoạt hình nhân vật ảo/nhân vật.

Ở tầng này, các công cụ DCC 3D truyền thống (Maya/Blender/3ds Max, v.v.) và chuỗi công cụ AI đang dần hợp nhất: nhiều dịch vụ AI 3D được nhúng vào quy trình sản xuất hiện có dưới dạng plugin hoặc giao diện đám mây, cho phép người tạo mô hình/họa sĩ nhanh chóng lặp lại tài sản trong sự cộng tác giữa người và máy.

### 3.3.1 Text-to-3D và phác thảo cảnh thô

Mục tiêu của **Text-to-3D** là: đưa ra một mô tả bằng ngôn ngữ tự nhiên, ví dụ "một món đồ chơi vịt vàng theo phong cách hoạt hình, có khăn quàng cổ màu xanh, phù hợp để trưng bày đồ chơi trẻ em", hệ thống sẽ tự động tạo ra một mô hình 3D có thể chỉnh sửa được (Mesh/NeRF/SDF/Gaussian, v.v.). Đây là ứng dụng điển hình kết hợp mô hình ngôn ngữ lớn/mô hình đa phương thức với biểu diễn 3D.

Các lộ trình kỹ thuật điển hình bao gồm:

1. **Tối ưu hóa dựa trên mô hình Text-to-Image 2D** (như DreamFusion, Magic3D):
2. Sử dụng mô hình Text-to-Image mạnh mẽ (như mô hình khuếch tán) làm "bộ đánh giá", với biểu diễn 3D ở một góc nhìn nhất định, render ra hình ảnh và đánh giá mức độ khớp của nó với mô tả văn bản.
3. Thông qua tối ưu hóa gradient hoặc quá trình khuếch tán, lặp lại điều chỉnh biểu diễn 3D (NeRF/SDF/Mesh), sao cho hình ảnh render từ nhiều góc nhìn đều phù hợp với ngữ nghĩa văn bản.
4. **Mô hình khuếch tán 3D / tạo trực tiếp** :
5. Lấy dữ liệu 3D (đám mây điểm, voxel, tham số trường ẩn, hạt Gaussian, v.v.) làm mục tiêu tạo của mô hình khuếch tán, huấn luyện trước trên tập dữ liệu 3D quy mô lớn;
6. Thông qua điều kiện văn bản, thực hiện lấy mẫu Text-to-3D end-to-end.

Ở cấp độ cảnh, khả năng **phác thảo cảnh thô** cho phép người dùng mô tả bố cục không gian bằng ngôn ngữ tự nhiên hoặc phác thảo thô, ví dụ "một phòng khách có cửa sổ kính suốt từ trần đến sàn, bên trái có một ghế sofa chữ L, ở giữa có một bàn trà, bên phải có kệ sách và tủ TV", hệ thống sẽ tự động dựng lên một bản phác thảo bố cục 3D hợp lý về mặt hình học và ngữ nghĩa. Sau đó có thể tinh chỉnh mô hình và vật liệu trong các công cụ DCC, hoặc trực tiếp tạo ra nguyên mẫu cảnh khả dụng một cách nhanh chóng thông qua khả năng "tạo cảnh" trong các công cụ như Hunyuan 3D, Tripo.

Hiện nay, nhiều nền tảng đã ra mắt sản phẩm Text-to-3D hướng tới nhà thiết kế và nhà phát triển:

- "Hunyuan 3D" và các sản phẩm tương tự tích hợp Text-to-3D, tạo đa góc nhìn và khả năng tái tạo vào một giao diện thống nhất, hỗ trợ nhanh chóng tạo nhân vật, đạo cụ và cảnh từ văn bản rồi xuất sang game engine;
- Các sản phẩm như Tripo nhấn mạnh "đầu vào đa phương thức + đầu ra 3D một chạm", hỗ trợ kết hợp văn bản đơn giản và ảnh tham chiếu, dẫn dắt tạo ra tài sản 3D đáp ứng nhu cầu về phong cách và cấu trúc.

### 3.3.2 Image/Video-to-3D và tối ưu hóa chỉnh sửa mô hình

So với văn bản thuần túy, việc tạo mô hình 3D từ hình ảnh hoặc video có ràng buộc hình học mạnh hơn và tính nhất quán về mặt thị giác cũng tốt hơn. Do đó, phần lớn các sản phẩm AI 3D đều hỗ trợ **Image-to-3D / Video-to-3D** :

- Ảnh đơn → 3D thô: sử dụng tiên nghiệm đơn góc nhìn (như tiên nghiệm hình dạng cho khuôn mặt, cơ thể người, các loại vật thể phổ biến), suy luận hình học 3D gần đúng, tạo ra mô hình 3D có thể dùng để xem trước hoặc tương tác đơn giản.
- Nhiều ảnh / video ngắn → 3D chất lượng cao: tổng hợp sử dụng tái tạo NeRF/SDF/Gaussian, hình học đa góc nhìn và hậu xử lý, chuyển đổi hàng chục bức ảnh hoặc vài giây video thành mô hình 3D có độ trung thực cao, phù hợp cho tài sản game/điện ảnh hoặc trưng bày thương mại điện tử chất lượng cao.

Việc tạo ra hình học 3D chỉ là bước đầu tiên, sau đó còn cần rất nhiều công việc **tối ưu hóa và chỉnh sửa mô hình**:

- Retopology và giản lược mô hình: chuyển đổi trường ẩn hoặc Mesh đa giác cao thành cấu trúc topo có quy tắc, số mặt có thể kiểm soát, để thuận tiện cho rigging, hoạt hình và render thời gian thực.
- Tạo LOD: tự động tạo mô hình đa cấp độ chi tiết (Level of Detail), dùng mô hình thấp khi ở xa, mô hình cao khi ở gần, cân bằng giữa chất lượng hình ảnh và hiệu năng.
- Trải UV và tạo texture: tự động trải UV cho mô hình, tạo hoặc tối ưu hóa normal map, displacement map, roughness/metalness map và các vật liệu PBR khác; một số mô hình còn hỗ trợ tự động tạo texture cách điệu từ văn bản hoặc ảnh tham chiếu.
- Chỉnh sửa hình học và phong cách: thực hiện chỉnh sửa cục bộ dựa trên ngôn ngữ hoặc ảnh mẫu, như "làm cho chân ghế này ngắn lại một chút" "biến tòa nhà này thành phong cách cyberpunk", tầng dưới thường được thực hiện thông qua thao tác không gian tiềm ẩn hình dạng hoặc chỉnh sửa trường nơ-ron.

Các sản phẩm như Hunyuan 3D, Tripo thường xâu chuỗi toàn bộ quy trình trên: người dùng bắt đầu từ ảnh/video hoặc văn bản đơn giản, hệ thống nội bộ hoàn thành tái tạo, retopology, texture và xuất ra, giúp người dùng không chuyên cũng có thể có được mô hình 3D "cắm vào là dùng" trong vài phút, rút ngắn đáng kể thời gian từ ý tưởng đến tài sản.

### 3.3.3 Rigging, hoạt hình và tài sản 3D động

Mô hình tĩnh chỉ là một nửa của nội dung, tài sản 3D "có thể chuyển động" mới là then chốt trong game, điện ảnh, nhân vật ảo và ứng dụng tương tác. Điều này liên quan đến các khâu như **rigging xương (Rigging), vẽ trọng số, hoạt hình và mô phỏng vật lý**, vốn là những công việc chuyên môn có ngưỡng cao, nay dần được các công cụ AI hỗ trợ thậm chí bán tự động hoàn thành.

- **Rigging tự động** : với một Mesh nhân vật cho trước, hệ thống tự động suy luận cấu trúc phân cấp xương (cột sống, tứ chi, ngón tay, v.v.) và vị trí xương trong mô hình, đồng thời dự đoán trọng số của mỗi đỉnh tương ứng với từng xương. Các phương pháp deep learning trong những năm gần đây có thể học ánh xạ này trên tập dữ liệu nhân vật có gán nhãn xương quy mô lớn, thực hiện rigging xương chỉ với một cú nhấp chuột.
- **Hoạt hình và tạo chuyển động** : chồng dữ liệu chuyển động (Mocap hoặc do AI tạo) lên xương hiện có, hoàn thành các hoạt hình như đi bộ, chạy, biểu cảm, cử chỉ; tạo chuyển động và Retargeting dựa trên deep learning có thể chuyển chuyển động cơ thể người từ video hoặc chuyển động của nhân vật khác sang nhân vật mới.
- **Mô phỏng vật lý** : thực hiện mô phỏng vật lý cho vải, vật thể mềm, vật thể cứng, v.v., giúp chuyển động của tóc, quần áo, cờ, vật thể mềm trở nên tự nhiên hơn. Một số hệ thống sử dụng mạng nơ-ron để tăng tốc hoặc xấp xỉ vật lý, làm cho hiệu ứng vật lý trong engine thời gian thực trở nên chân thực hơn.

Về mặt sản phẩm và hệ sinh thái, những năng lực này thường được nhúng trong:

- Chuỗi công cụ tài sản game / điện ảnh: cung cấp cho người tạo mô hình Rigging một chạm, phân bổ trọng số tự động và thư viện chuyển động cơ bản, giảm đáng kể công việc lặp lại;
- Nền tảng sản xuất nhân vật ảo / tài sản số: bắt đầu từ ảnh chân dung hoặc quét, thông qua tái tạo 3D + Rigging tự động + điều khiển chuyển động, xuất ra nhân vật ảo có thể điều khiển được trong livestream, video ngắn, ứng dụng tương tác;
- Nền tảng AI 3D (như Hunyuan 3D, Tripo và các sản phẩm tương tự): sau khi tạo 3D, tiếp tục bổ sung chức năng rigging và hoạt hình đơn giản, giúp người dùng "nhân vật được tạo ra có thể chuyển động ngay lập tức", mà không cần thao tác công cụ DCC phức tạp.

Cùng với sự trưởng thành của công nghệ tạo và chỉnh sửa 3D, toàn bộ quy trình sản xuất nội dung 3D đang tiến hóa từ "lấy công cụ DCC chuyên nghiệp làm trung tâm" thành "cộng tác giữa người và máy do AI điều khiển": AI chịu trách nhiệm tạo và phần lớn công việc cơ bản, con người tập trung hơn vào định nghĩa phong cách, kiểm soát chất lượng và ra quyết định tại các nút thiết kế then chốt. Hunyuan 3D, Tripo và các sản phẩm AI 3D thế hệ mới chính là biểu hiện tập trung của xu hướng này, cung cấp cơ sở hạ tầng 3D nhanh hơn, dễ sử dụng hơn cho các ứng dụng tầng trên như game, điện ảnh, AR/VR, digital twin và nhân vật ảo.# 4. Âm thanh (Audio / Speech)

Trong tổng thể ngăn xếp công nghệ, "âm thanh" tương ứng với khả năng cảm nhận và tạo ra tín hiệu âm học: bao gồm cả việc xử lý dạng sóng và phổ tần thô, chuyển đổi giọng nói thành văn bản, hiểu được "ai đang nói" và "đang nói gì", cũng như tiến xa hơn đến việc sáng tạo và tổng hợp âm thanh, âm nhạc. Tương tự như thị giác, âm thanh cũng có thể được phân tách thành nhiều tầng: tầng dưới cùng là **xử lý dạng sóng và phổ tần** chịu trách nhiệm "nghe rõ"; tầng giữa là **nhận dạng giọng nói và công nghệ nhận diện người nói** chịu trách nhiệm "hiểu ai đang nói gì"; phía trên nữa là các tầng trừu tượng hơn như **hiểu âm thanh/âm nhạc** và **tạo sinh giọng nói, âm nhạc**. Toàn bộ khối năng lực này cùng nhau hỗ trợ cho các sản phẩm như phụ đề thời gian thực trong hội họp, trợ lý giọng nói, chỉnh sửa âm thanh hậu kỳ cho podcast, loa thông minh, giám sát an ninh bằng âm học, đề xuất và tạo sinh âm nhạc.## 4.1 Xử lý âm thanh ở mức dạng sóng: bắt đầu từ "nghe rõ"

Ở tầng thấp nhất của công nghệ âm thanh, điều chúng ta quan tâm đầu tiên không phải là "đã nói gì", "ai đang nói" hay "âm nhạc thuộc phong cách gì", mà là **bản thân âm thanh đó có sạch không, có nghe rõ không**. Tầng này chủ yếu làm việc ở mức dạng sóng và phổ tần, thông qua các thao tác như lấy mẫu lại, tăng cường, khử nhiễu, tách nguồn âm, biến âm thanh thô bị nhiễu, méo mó, trộn lẫn thành "tín hiệu sạch" phù hợp hơn cho việc nhận dạng, phân tích và tạo sinh ở phía sau. Có thể so sánh nó với "tăng cường hình ảnh + khử nhiễu + tách tiền cảnh/hậu cảnh" trong thị giác, thiên về làm sạch ở tầng âm học hơn là xử lý ngữ nghĩa trực tiếp.

Từ góc độ sản phẩm, tầng này gần như "ẩn mình" phía sau mọi sản phẩm âm thanh: khử nhiễu thời gian thực trong phần mềm hội họp, hậu kỳ chỉnh sửa âm thanh cho podcast/video ngắn, "chế độ tăng cường giọng nói" trong máy thu thập âm và điện thoại, "công tắc làm đẹp giọng" trong nền tảng livestream, cũng như tiền xử lý front-end cho các mô hình ASR/nhận dạng giọng nói, đều là biểu hiện trực tiếp của xử lý âm thanh ở mức dạng sóng. Dưới đây vẫn sẽ tổ chức theo ba góc độ **kịch bản**, **nguyên lý** và **mô hình**, và sẽ triển khai cụ thể ba hướng then chốt là tiền xử lý & trích xuất đặc trưng, tăng cường & khử nhiễu, và tách nguồn âm trong các tiểu mục tiếp theo.

- **Kịch bản**
  - Giao tiếp trực tuyến và hội họp: Zoom, Tencent Meeting, v.v. trong môi trường văn phòng ồn ào, không gian làm việc mở, tại nhà, triệt tiêu thời gian thực tiếng bàn phím, tiếng gõ, tiếng ồn đường phố, tiếng vọng, giúp giọng nói rõ ràng hơn.
  - Sáng tạo nội dung và hậu kỳ chỉnh sửa âm thanh: trong hậu kỳ podcast, video ngắn, livestream, tự động loại bỏ tạp âm nền, tiếng rè điện, âm vang phòng, sửa chữa âm thanh bị nổ và thiếu hụt dải tần, nâng cao trải nghiệm nghe tổng thể.
  - Tiền xử lý cho ghi âm và chuyển lời: máy thu thập âm, phụ đề thông minh, dịch vụ chuyển lời hội họp trước khi đưa vào ASR, thông qua VAD, khử nhiễu, chuẩn hóa độ lớn để nâng cao độ bền vững của nhận dạng phía sau.
  - Thiết bị đầu cuối và IoT: "thu âm trường xa" và "chế độ khử nhiễu" trên loa thông minh, thiết bị ô tô, camera, cố gắng thu được người nói chính hoặc nguồn âm then chốt trong trường âm phức tạp.
- **Nguyên lý**
  Xử lý ở mức dạng sóng thường không trực tiếp hiểu ngữ nghĩa, mà xoay quanh cấu trúc phổ và đặc tính thống kê để tối ưu tín hiệu:
  - Biến đổi qua lại giữa miền thời gian và miền tần số (như STFT → phổ/phổ Mel → iSTFT), triệt tiêu hoặc mô hình hóa dải tần nhiễu, đặc tính âm vang hoặc âm nền.
  - Thông qua VAD và đặc trưng năng lượng/phổ, phân biệt "đoạn có giọng nói" và "đoạn im lặng/nhiễu", giảm ảnh hưởng của đoạn không hợp lệ lên phía sau.
  - Sử dụng học sâu hoặc phương pháp lọc cổ điển để ước tính mặt nạ hoặc hàm khuếch đại của "phổ giọng nói sạch" và "phổ nhiễu", gia trọng cho phổ để đạt được mục đích tăng cường và khử nhiễu.
  - Trong kịch bản nhiều nguồn âm trộn lẫn, thông qua mạng tách end-to-end hoặc biểu diễn thưa, tách những người nói khác nhau, giọng hát và nhạc đệm, âm thanh tiền cảnh và môi trường nền thành các track độc lập.
- **Mô hình**
  Mô hình ở mức dạng sóng/phổ đại khái có thể chia thành hai loại: **mô hình miền phổ** và **mô hình end-to-end miền thời gian**:
  - Dòng U-Net trên phổ/phổ Mel: Spectrogram-based U-Net, DCCRN, v.v., thực hiện tích chập và mã hóa-giải mã kiểu "hình ảnh" trên mặt phẳng thời gian-tần số, là giải pháp phổ biến cho các tác vụ như tăng cường giọng nói, tách giọng hát.
  - Mô hình end-to-end dạng sóng: Wave-U-Net, Conv-TasNet, Demucs, v.v., mô hình hóa trực tiếp trên dạng sóng miền thời gian, tránh STFT/ISTFT tường minh, thường cho hiệu quả tốt hơn về cảm nhận nghe chủ quan và độ trung thực miền thời gian.
  - Phương pháp xử lý tín hiệu cổ điển: phương pháp miền tần số truyền thống như trừ phổ, lọc Wiener, vẫn tồn tại rộng rãi trong thiết bị nhẹ hoặc kịch bản cực kỳ nhạy cảm với độ trễ, thường kết hợp với mạng tăng cường sâu tạo thành "giải pháp lai".

### 4.1.1 Tiền xử lý và trích xuất đặc trưng: "dọn sân khấu" cho phía sau

Bất kỳ mô hình ASR, nhận dạng giọng nói, phát hiện sự kiện, TTS nào ở phía sau đều cần một đầu vào âm thanh thống nhất, sạch sẽ, có cấu trúc nhất có thể, đó chính là trách nhiệm của tầng tiền xử lý và trích xuất đặc trưng. Nó đảm nhận việc "dọn dẹp" và "thống nhất định dạng" cơ bản nhất nhưng cực kỳ then chốt, dựng sân khấu cho các mô hình âm thanh phía trên.

Trong giai đoạn tiền xử lý, trước tiên sẽ thực hiện **chuyển đổi tần số lấy mẫu và chuyển đổi kênh** cho âm thanh thu được: ví dụ chuyển đổi âm thanh stereo 48kHz thành đơn kênh 16kHz, để đáp ứng thông số đầu vào của mô hình hạ nguồn và giảm chi phí tính toán. Sau đó, sẽ chuẩn hóa độ lớn, loại bỏ thành phần DC, lọc đơn giản, v.v., để âm thanh ghi được từ các thiết bị và kịch bản khác nhau nhất quán hơn trên thang năng lượng.

**Phát hiện điểm cuối giọng nói (VAD)** là một khâu then chốt khác trong tiền xử lý. Nó cố gắng tự động phân chia "đoạn có giọng nói" và "đoạn im lặng/nhiễu thuần túy" trong luồng âm thanh, thường dựa trên năng lượng khung, entropy phổ, tỷ lệ cắt qua không hoặc phán đoán bằng mạng nơ-ron nhỏ. Lợi ích của VAD là: có thể giảm đáng kể dữ liệu không hợp lệ đưa vào mô hình ASR/nhận dạng giọng nói, giảm khối lượng tính toán, đồng thời tránh đoạn im lặng gây nhiễu nhận dạng (ví dụ nhận dạng sai thành chuỗi dài dấu cách hoặc ký tự lạ). Trong giao tiếp thời gian thực, VAD còn có thể điều khiển "đèn báo hoạt động giọng nói" và logic tự động tắt tiếng.

Ở tầng trích xuất đặc trưng, phổ biến nhất là chuyển đổi dạng sóng miền thời gian thành **phổ** hoặc **phổ Mel**. Thông qua biến đổi Fourier thời gian ngắn (STFT), âm thanh được phân tách thành phân bố tần số biến đổi theo thời gian; tiếp đó thông qua bộ lọc Mel, có thể thu được phổ Mel hoặc đặc trưng Mel cepstrum (như log Mel-spectrogram, MFCC) phù hợp hơn với cảm nhận của tai người. Những đặc trưng thời gian-tần số này cung cấp một "biểu diễn hai chiều" cho nhận dạng, tách và tạo sinh phía sau, tương tự như ảnh xám hoặc bản đồ đặc trưng đa kênh trong thị giác, thuận tiện cho các cấu trúc như tích chập, attention xử lý. Cùng với sự phát triển của mô hình hóa end-to-end, ngày càng có nhiều mô hình học đặc trưng trực tiếp trên dạng sóng (như Wav2Vec 2.0), nhưng trong thực tiễn kỹ thuật, tổ hợp STFT + đặc trưng Mel vẫn là front-end phổ biến và ổn định nhất.

### 4.1.2 Tăng cường và khử nhiễu: sửa "giọng mờ" thành "giọng khô"

Trong môi trường thực tế, âm thanh hầu như luôn truyền qua nhiễu và âm vang: tiếng điều hòa, tiếng gõ bàn phím, tiếng ồn đường, tiếng ồn đám đông, tiếng vọng phòng, đều làm giảm độ dễ hiểu và chất lượng chủ quan của giọng nói và âm nhạc ở những mức độ khác nhau. Mục tiêu của **tăng cường giọng nói và khử nhiễu** chính là triệt tiêu những nhiễu nền này trong khi cố gắng duy trì độ tự nhiên và toàn vẹn của giọng nói, sửa âm thanh "bị mờ" thành âm thanh "sạch" nhất có thể.

Trong phương pháp truyền thống, tác vụ này chủ yếu được thực hiện thông qua các kỹ thuật miền tần số như trừ phổ, lọc Wiener: trước tiên ước tính phổ nhiễu, sau đó "trừ" nhiễu hoặc điều chỉnh khuếch đại dải tần theo quy tắc nhất định trên phổ. Mặc dù triển khai đơn giản, thời gian thực tốt, nhưng trong kịch bản nhiễu mạnh, nhiễu không dừng và âm vang phức tạp dễ tạo ra "nhiễu nhạc" và artifact rõ rệt.

Phương pháp học sâu thì học một **ánh xạ** trên phổ hoặc dạng sóng: cho trước giọng nói có nhiễu, dự đoán một mặt nạ thời gian-tần số hoặc dự đoán trực tiếp dạng sóng sạch. Các giải pháp phổ biến bao gồm sử dụng cấu trúc mã hóa-giải mã như **Spectrogram-based U-Net, DCCRN** trên phổ Mel/tuyến tính, sửa chữa tỉ mỉ phổ của từng khung; cũng có những mô hình như **Conv-TasNet, Demucs, Wave-U-Net** thực hiện tăng cường dạng sóng end-to-end trực tiếp trên miền thời gian. Những phương pháp này trong kịch bản như gọi điện thoại, hội họp trực tuyến, phục hồi bản ghi âm, có thể nâng cao đáng kể độ rõ ràng của giọng nói và cảm nhận nghe chủ quan.

Trong sáng tạo nội dung và hậu kỳ, "phục hồi bản ghi âm" thường còn liên quan đến các thao tác "mang phong cách kỹ sư âm thanh" hơn như giảm âm nổ (plosives), cắt âm xuýt (sibilance), bù thiếu hụt dải tần, cân bằng (EQ) và xử lý động (compressor/limiter). Ngày càng có nhiều công cụ kết hợp các xử lý truyền thống này với mô hình sâu, cung cấp khả năng "sửa giọng" và "làm đẹp âm thanh" chỉ với một nút bấm, phục vụ người làm podcast, nhà sáng tạo video và nền tảng livestream.

### 4.1.3 Tách nguồn âm: tháo rời "bản phối"

Nếu như tăng cường và khử nhiễu là "làm cho giọng chính nổi bật hơn, nền yên tĩnh hơn", thì **tách nguồn âm** tiến thêm một bước, cố gắng tách hoàn toàn nhiều nguồn âm trộn lẫn thành các track độc lập. Ví dụ: nhiều người nói đồng thời trong bản ghi âm hội họp; giọng hát và nhạc đệm trộn lẫn trong âm nhạc; sự kiện chính (như báo động, tiếng hét) bị chôn vùi trong nhiễu nền của bản ghi âm môi trường. Mục tiêu của tách nguồn âm là từ một hoặc nhiều tín hiệu trộn, khôi phục dạng sóng hoặc phổ của từng nguồn âm độc lập.

Trong lĩnh vực giọng nói, **tách nhiều người nói** là một ứng dụng cốt lõi: mô hình cần dựa vào đặc trưng giọng nói, cấu trúc thời gian-tần số và đặc điểm người nói, tách nhiều giọng nói chồng lấn thành các kênh khác nhau, mà không cần track micro riêng biệt. Khả năng này không chỉ nâng cao hiệu suất ASR đa người nói, mà còn cung cấp đầu vào sạch hơn cho việc tách và gán nhãn người nói (Diarization). Trong lĩnh vực âm nhạc, **tách giọng hát/nhạc đệm (tách giọng hát)** có thể tách track giọng hát rõ ràng và track nhạc đệm thuần túy từ một bài hát đã phối, dùng cho cover, Remix, karaoke, phân tích âm nhạc, v.v. Tương tự, **tách âm thanh môi trường/tiền cảnh** có thể dùng trong kịch bản an ninh và IoT, trích xuất âm thanh sự kiện then chốt (như kính vỡ, tiếng xung đột) từ nền phức tạp.

Ở tầng mô hình, tách nguồn âm thường sử dụng khả năng mô hình hóa mạnh hơn và kiến trúc phức tạp hơn so với tăng cường thông thường. Các mạng end-to-end như **Conv-TasNet, Demucs, Wave-U-Net** có thể trực tiếp phân tách đa nguồn âm trong miền thời gian; trong miền phổ, thường thấy các cấu trúc U-Net đa nhánh, attention, ước tính mặt nạ, v.v., dự đoán mặt nạ hoặc phổ chuyên biệt cho từng nguồn âm. Cùng với sự tăng trưởng của dữ liệu huấn luyện và tài nguyên tính toán, các mô hình tách nguồn âm hiện đại đã có thể trong môi trường âm vang và nhiễu khá phức tạp, xuất ra các track chất lượng cao có thể dùng cho sáng tạo và phân tích thực tế, đặt nền tảng vững chắc cho làm đẹp giọng livestream, hội họp đa người nói, sản xuất âm nhạc và truy xuất âm thanh.## 4.2 Nhận dạng giọng nói & Công nghệ người nói (ASR & Speaker)

Sau khi hoàn thành tiền xử lý, tăng cường và tách tín hiệu ở cấp độ dạng sóng, cuối cùng chúng ta có thể bắt đầu đặt ra những câu hỏi ở cấp cao hơn: **"Âm thanh nói gì?" "Ai đang nói?" "Ai nói vào lúc nào?"** Tầng này tập trung vào các tác vụ "hiểu và gán nhãn" xoay quanh chính giọng nói: Nhận dạng giọng nói tự động (ASR), nhận dạng và xác minh người nói, phân tách và gán nhãn người nói (Diarization), cùng với phát hiện từ nóng và từ khóa (KWS) hướng đến tương tác.

Xét về hình thái sản phẩm, tầng này là cốt lõi của đại đa số "sản phẩm thoại": bàn phím nhập liệu bằng giọng nói, chuyển đổi văn bản cuộc họp, phân tích ghi âm dịch vụ khách hàng, kiểm tra chất lượng tổng đài thông minh, tương tác giọng nói trên loa thông minh và xe hơi, robot điện thoại, xác minh giọng nói trong lĩnh vực tài chính, v.v. — hầu hết đều phụ thuộc trực tiếp vào những công nghệ này. Chúng biến đổi "âm thanh sạch" từ tầng trước thành chuỗi văn bản, nhãn người nói hoặc sự kiện từ khóa, và là một trong những cầu nối quan trọng nhất từ thế giới âm thanh đến thế giới ngữ nghĩa.

- **Kịch bản**
  - Nhận dạng giọng nói tự động (ASR): phụ đề thời gian thực, bàn phím nhập liệu bằng giọng nói, ghi chép cuộc họp và lớp học, chuyển đổi văn bản cuộc gọi dịch vụ khách hàng, cung cấp cho người dùng kênh tức thời "từ thính giác đến văn bản".
  - Nhận dạng và xác minh người nói: "mở khóa bằng giọng nói", "xác minh giọng nói" trong điện thoại/ngân hàng/trung tâm cuộc gọi, cũng như truy xuất một người nói cụ thể trong lượng lớn bản ghi âm.
  - Phân tách và gán nhãn người nói (Diarization): trong cuộc họp, phỏng vấn, thảo luận bàn tròn, tự động trả lời câu hỏi "ai đang nói vào lúc nào", tạo ra "chuyển đổi văn bản theo từng người nói".
  - Phát hiện từ nóng và từ khóa (KWS): phát hiện từ đánh thức trên loa thông minh/xe hơi ("Hey Siri", "OK Google"), cũng như bắt giữ các cụm từ then chốt trong ghi âm dịch vụ khách hàng và kiểm tra chất lượng (như "khiếu nại", "hoàn tiền", "muốn nâng cấp", v.v.).
- **Nguyên lý**
  Phần lớn các tác vụ trong tầng này đều có thể được xem như là việc thực hiện **căn chỉnh thời gian và gán nhãn chuỗi** trên chuỗi âm thanh:
  - ASR: với một đoạn giọng nói đầu vào, học ánh xạ từ đặc trưng âm học sang chuỗi văn bản, thường sử dụng CTC, RNN-Transducer (RNN-T) hoặc kiến trúc end-to-end dựa trên attention; các mô hình hiện đại phần lớn sử dụng tiền huấn luyện quy mô lớn (như Wav2Vec 2.0, Whisper, v.v.) rồi tinh chỉnh.
  - Nhận dạng người nói: trích xuất một vector **speaker embedding** có chiều cố định từ âm thanh (như x-vector, ECAPA-TDNN), trong không gian embedding này, giọng nói của cùng một người sẽ gần nhau, giọng nói của những người khác nhau sẽ cách xa nhau, sau đó kết hợp với mô hình đo lường hoặc phân loại để hoàn thành nhận dạng và xác minh.
  - Phân tách và gán nhãn người nói (Diarization): tận dụng tổng hợp speaker embedding, VAD, phân đoạn rồi phân cụm hoặc mạng end-to-end (EEND), để gán nhãn người nói cho từng lát thời gian, từ đó ghép thành "dòng thời gian đa người nói trên trục thời gian".
  - KWS: thực hiện phát hiện bằng mô hình nhỏ với độ trễ thấp trên luồng âm thanh liên tục, tiến hành khớp mẫu cục bộ và đánh giá độ tin cậy đối với các từ đánh thức hoặc từ khóa đã định nghĩa trước, cân bằng giữa chi phí tính toán thấp và độ phủ cao.
- **Mô hình**
  Phổ mô hình của ASR và công nghệ người nói bao gồm cả kiến trúc end-to-end lẫn các mô hình embedding và phương pháp phân cụm chuyên dụng:
  - ASR: Wav2Vec 2.0, Conformer, Whisper, RNN-T, Citrinet, v.v., phần lớn áp dụng cấu trúc tích chập + self-attention hoặc self-attention thuần túy, hỗ trợ đa ngôn ngữ, từ vựng lớn và ngữ cảnh dài.
  - Speaker embedding: ECAPA-TDNN, x-vector, i-vector, v.v., thông qua huấn luyện phân loại hoặc metric learning trên lượng lớn dữ liệu người nói, thu được không gian đặc trưng người nói ổn định.
  - Diarization: từ quy trình truyền thống VAD + phân đoạn + phân cụm, đến các phương pháp end-to-end như End-to-End Diarization (EEND) — trực tiếp xuất ra ma trận "thời điểm × người nói".
  - Phát hiện từ nóng/từ khóa: front-end CNN/RNN/Transformer nhẹ kết hợp CTC hoặc cơ chế cổng, nhúng trên thiết bị cục bộ, thực hiện lắng nghe luôn bật với chi phí tính toán siêu thấp và độ trễ thấp.

### 4.2.1 Nhận dạng giọng nói tự động (ASR): biến "âm thanh" thành "văn bản"

**Nhận dạng giọng nói tự động (ASR) là kênh chính "âm thanh → văn bản": dù là bàn phím nhập liệu bằng giọng nói, chuyển đổi văn bản cuộc họp, phụ đề thông minh hay phân tích ghi âm dịch vụ khách hàng, bước đầu tiên luôn là chuyển đổi chính xác lời nói của người dùng thành văn bản. Hệ thống ASR hiện đại phần lớn áp dụng kiến trúc end-to-end**: bắt đầu từ đặc trưng âm học (như mel-spectrogram hoặc dạng sóng trực tiếp), qua một loạt mạng sâu (như Conformer, Citrinet, Encoder dựa trên Transformer), đầu ra trực tiếp là chuỗi văn bản hoặc chuỗi token tương ứng.

Về mặt mô hình hóa, các khó khăn chính của ASR bao gồm phụ thuộc tầm xa, đa ngôn ngữ và phương ngữ, biến đổi giọng nói, giọng nói chồng lấn, nhiễu nền và các danh từ riêng trong lĩnh vực. Vì vậy, hướng tiếp cận chính hiện nay là sử dụng âm thanh không nhãn quy mô lớn để tiền huấn luyện tự giám sát (như Wav2Vec 2.0, HuBERT), hoặc huấn luyện có giám sát quy mô lớn trên dữ liệu đa ngôn ngữ, đa tác vụ (như Whisper), sau đó tinh chỉnh với lượng dữ liệu miền tương đối nhỏ, từ đó đạt được độ bền vững tốt trên các ngôn ngữ, giọng nói và kịch bản khác nhau.

Ở cấp độ sản phẩm, ASR thường được đóng gói thành các năng lực đầu ra như "SDK bàn phím nhập liệu giọng nói", "API nhận dạng giọng nói trên đám mây", "dịch vụ chuyển đổi văn bản cuộc họp": front-end có thể là nhận dạng truyền phát thời gian thực (RNN-T, Transformer truyền phát, v.v.), back-end có thể tăng cường nhận dạng các tên người, tên địa điểm, tên thương hiệu và thuật ngữ nghiệp vụ cụ thể thông qua chèn từ nóng, từ điển tùy chỉnh và ràng buộc ngữ cảnh. Những kết quả nhận dạng này thường là nền tảng cho các bước NLP, hệ thống đối thoại và phân tích dữ liệu tiếp theo.

### 4.2.2 Nhận dạng người nói & Phân tách gán nhãn: trả lời "là ai" và "nói vào lúc nào"

So với "nói gì", **"ai đang nói" cũng quan trọng không kém trong nhiều ứng dụng: các kịch bản tài chính, hành chính công, dịch vụ khách hàng, an ninh đều cần thông qua nhận dạng giọng nói** để xác minh danh tính hoặc sàng lọc rủi ro; trong khi các kịch bản cuộc họp và phỏng vấn lại cần biết "từng câu là do ai nói", để hỗ trợ chuyển đổi văn bản theo người nói, thống kê lượt phát biểu và phân tích hành vi.

Trong tác vụ **nhận dạng/xác minh người nói (Speaker Recognition)**, mục tiêu của hệ thống là: với một đoạn giọng nói đầu vào, xác định người nói là ai, hoặc xác định xem có phải cùng một người với người nói đã đăng ký hay không. Hệ thống hiện đại thường sử dụng các mô hình như ECAPA-TDNN, x-vector để trích xuất một vector speaker embedding có chiều cố định từ đoạn giọng nói. Trong giai đoạn huấn luyện, kết hợp phân loại người nói và metric learning để đảm bảo embedding của cùng một người tụ lại gần hơn và khoảng cách embedding giữa những người khác nhau lớn hơn; trong giai đoạn suy luận, áp dụng láng giềng gần nhất hoặc bộ phân biệt back-end (như PLDA, Cosine scoring with margin) để xác minh và nhận dạng. Nhờ đó, hệ thống có thể trả lời câu hỏi "có phải cùng một người không" với một mức độ tin cậy nhất định trong môi trường điện thoại, micro và nhiễu.

**Phân tách và gán nhãn người nói (Diarization)** tiến thêm một bước để trả lời "ai đang nói vào lúc nào". Phương án truyền thống thường bao gồm ba bước: trước tiên dùng VAD để tìm các đoạn có giọng nói, sau đó cắt âm thanh dài thành các segment ngắn, trích xuất speaker embedding cho từng segment, cuối cùng thực hiện phân cụm và ghép nối thời gian trong không gian embedding để thu được một dòng thời gian đa người nói. Các phương pháp tiên tiến hơn như **End-to-End Diarization (EEND)** cố gắng xuất trực tiếp ma trận boolean "thời gian × người nói" từ đặc trưng âm thanh, học end-to-end các mẫu phức tạp như giọng nói chồng lấn, chuyển đổi người nói. Diarization có giá trị rất lớn trong các kịch bản như cuộc họp, chương trình phỏng vấn, hồ sơ tòa án, tổng đài điện thoại, thường được kết hợp với ASR để tạo thành "bản ghi văn bản có gán nhãn người nói".

### 4.2.3 Phát hiện từ nóng & từ khóa: "đôi tai" hướng đến tương tác và giám sát

Trong luồng âm thanh liên tục, không phải mỗi giây đều đáng được nhận dạng và lưu trữ đầy đủ. Vai trò của **phát hiện từ nóng và từ khóa (KWS)** chính là một "người gác cổng" luôn trực tuyến:

- Trên loa thông minh, xe hơi, trợ lý điện thoại, mô-đun KWS chịu trách nhiệm phát hiện từ đánh thức (như "Hey Siri", "OK Google", "Xiao Ai"), một khi phát hiện từ đánh thức, sẽ chuyển luồng âm thanh sang hệ thống ASR và đối thoại tốn kém hơn để xử lý.
- Trong các kịch bản tổng đài thông minh, kiểm tra chất lượng và tuân thủ, KWS sẽ đánh dấu và cảnh báo các cụm từ then chốt xuất hiện trong ghi âm hoặc cuộc gọi thời gian thực (như "khiếu nại", "trả hàng", "bảo vệ quyền lợi", "gian lận"), cung cấp điểm kích hoạt cho phân tích back-end và chiến lược kiểm tra chất lượng.

Về mặt triển khai kỹ thuật, KWS thường cần chạy trong ràng buộc **chi phí tính toán cực thấp và độ trễ thấp**, đặc biệt là phát hiện từ đánh thức trên thiết bị cục bộ: mô hình thường là một front-end CNN/RNN/Transformer nhỏ, kết hợp CTC hoặc đầu phân biệt cổng, để phát hiện mẫu âm học của các từ cụ thể, đồng thời tận dụng cửa sổ trượt và làm mịn độ tin cậy để tránh đánh thức nhầm. Đối với kịch bản kiểm tra chất lượng từ khóa, có thể áp dụng ASR mạnh hơn + khớp từ khóa/regex + phân tích thống kê, hoặc huấn luyện trực tiếp mô hình gán thẻ từ khóa end-to-end. Dù ở hình thái nào, về bản chất KWS là thêm một lớp lọc ngữ nghĩa "cấp sự kiện" lên luồng giọng nói, và là một giao diện quan trọng kết nối thế giới âm thanh với logic tương tác.## 4.3 Hiểu âm thanh/âm nhạc (Audio Event & Music Understanding)

Không phải mọi âm thanh đều xoay quanh "giọng nói". Trong thực tế có rất nhiều tình huống liên quan đến âm thanh môi trường, âm thanh sự kiện và âm nhạc, tập trung vào các câu hỏi như: **"Sự kiện âm thanh nào đã xảy ra?", "Cảnh quan âm thanh hiện tại là môi trường nào?", "Bài hát này thuộc thể loại gì, sử dụng những nhạc cụ nào, nhịp điệu và tông điệu ra sao?"** Nhóm năng lực này được gọi chung là hiểu âm thanh/âm nhạc, chủ yếu xoay quanh phát hiện sự kiện âm thanh, phân loại môi trường/cảnh quan âm thanh và hiểu thuộc tính âm nhạc.

Từ góc độ sản phẩm, công nghệ hiểu âm thanh hỗ trợ nhiều ứng dụng rộng rãi như giám sát an ninh bằng âm thanh, cảm biến âm thanh IoT, thích ứng môi trường của thiết bị thông minh, gợi ý và phân loại âm nhạc, nhận dạng bản quyền âm nhạc, truy xuất âm nhạc và hỗ trợ sáng tác. Tương tự như "phân loại hình ảnh + phân loại hạt mịn" trong hình ảnh, tầng này cấu trúc hóa không gian âm thanh vốn liên tục và phức tạp thành các nhãn sự kiện rời rạc, vector thuộc tính đa chiều và mô tả phong cách.

- **Tình huống**
  - Phát hiện sự kiện âm thanh: phát hiện âm thanh báo động, kính vỡ, tiếng khóc trẻ em, tiếng va chạm, v.v., được sử dụng trong giám sát an ninh, tòa nhà thông minh, hệ thống an toàn xe cộ và cảnh báo công nghiệp.
  - Phân loại môi trường/cảnh quan âm thanh: nhận dạng cảnh quan âm thanh như "trong nhà/ngoài trời", "văn phòng/trong xe/đường phố/tàu điện ngầm", cung cấp cơ sở cho chiến lược khử nhiễu, điều chỉnh khuếch đại thích ứng và chuyển đổi chế độ của thiết bị thông minh.
  - Hiểu âm nhạc và truy xuất thông tin âm nhạc (MIR): phân loại thể loại nhạc, nhận dạng nhạc cụ, phân tích nhịp điệu và tông điệu, hỗ trợ gợi ý âm nhạc, tạo danh sách phát, truy xuất âm nhạc, nhận dạng bản quyền và trợ lý sáng tác.
- **Nguyên lý**
  Hiểu âm thanh/âm nhạc phần lớn dựa trên **đặc trưng thời gian–tần số + mạng nơ-ron sâu** để thực hiện phân loại hoặc gán nhãn đa nhãn:
  - Sử dụng các đặc trưng như log Mel‑spectrogram để chuyển đổi âm thanh thành "hình ảnh âm học", sau đó sử dụng các kiến trúc như CNN, CRNN hoặc Transformer để nhận dạng mẫu thời gian–tần số.
  - Đối với phát hiện sự kiện âm thanh, thường sử dụng đầu ra đa nhãn, đa chuỗi thời gian, dự đoán sự tồn tại của từng sự kiện trên trục thời gian, đôi khi kết hợp với nhãn giám sát yếu và học đa thể hiện.
  - Đối với phân loại môi trường/cảnh quan âm thanh, chú trọng hơn vào đặc trưng thống kê dài hạn và bố cục nền, thường cần mô hình hóa trên cửa sổ dài hơn.
  - Các tác vụ hiểu âm nhạc kết hợp với kiến thức lý thuyết âm nhạc, mô hình hóa nhịp điệu (BPM), điểm nhấn, tông điệu, hợp âm và cấu trúc, một số tác vụ sử dụng tiền huấn luyện embedding âm nhạc thông qua tự giám sát hoặc học tương phản, sau đó tinh chỉnh cho tác vụ cụ thể.
- **Mô hình**
  Các mô hình hiểu âm thanh phổ biến thường được tiền huấn luyện trên các tập dữ liệu công khai (như AudioSet), rồi chuyển giao sang tác vụ cụ thể:
  - Các mô hình CNN/CRNN như VGGish, YAMNet, PANNs, sau khi tiền huấn luyện trên dữ liệu âm thanh quy mô lớn, có thể được sử dụng cho nhiều tác vụ sự kiện âm thanh và cảnh quan âm thanh.
  - Các mô hình dựa trên Transformer như AST (Audio Spectrogram Transformer), sử dụng tự chú ý trực tiếp trên phổ đồ, đạt được khả năng mô hình hóa toàn cục thời gian–tần số mạnh mẽ hơn.
  - Các mô hình MusicTagging / MIR dành riêng cho âm nhạc sẽ tiền huấn luyện mô hình gán nhãn hoặc mô hình embedding trên hàng triệu bài hát, dùng cho gán nhãn phong cách/cảm xúc/nhạc cụ, truy xuất và gợi ý âm nhạc.

### 4.3.1 Sự kiện âm thanh và cảnh quan âm thanh môi trường: giúp thiết bị "hiểu được môi trường"

Trong an ninh, IoT, thành phố thông minh, hệ thống trên xe, chỉ dựa vào camera là không đủ để hiểu toàn diện trạng thái môi trường. Mục tiêu của **phát hiện sự kiện âm thanh** là giúp hệ thống "hiểu được" các sự kiện quan trọng: khi xảy ra kính vỡ, báo động kêu, trẻ em khóc, va chạm, la hét, ẩu đả, hành vi phá hoại, hệ thống có thể nhận dạng và phát cảnh báo từ tín hiệu âm thanh. Khác với nhận dạng giọng nói, những sự kiện này thường ngắn, phi ngôn ngữ, có dải tần số và hình thái năng lượng khác nhau, và có thể chồng lấn cao với tiếng ồn nền.

**Phân loại môi trường/cảnh quan âm thanh** tập trung hơn vào cảnh quan âm thanh liên tục (acoustic scene): là văn phòng yên tĩnh, đường phố nhộn nhịp, trong xe, ga tàu cao tốc hay quán cà phê? Hệ thống có thể tự động điều chỉnh cường độ khử nhiễu, tham số triệt tiếng vọng, hướng chùm tia của mảng micro dựa trên cảnh quan âm thanh, thậm chí thay đổi chiến lược tương tác (ví dụ: phản hồi ngắn gọn hơn trong xe, tăng âm lượng đầu ra trên đường phố ồn ào). Trong các tình huống IoT, "mạng âm thanh" bao gồm nhiều cảm biến âm thanh có thể được sử dụng để giám sát dài hạn và phân tích thống kê trạng thái môi trường.

Về mặt triển khai kỹ thuật, cả hai loại tác vụ này phần lớn áp dụng giải pháp **phân loại đa nhãn + mô hình hóa chuỗi thời gian**: chuyển đổi âm thanh thành phổ Mel, sử dụng VGGish, PANNs, AST hoặc các mô hình tương tự để trích xuất đặc trưng, sau đó sử dụng pooling chuỗi thời gian hoặc mô hình chuỗi để xuất ra trạng thái kích hoạt của từng nhãn trên trục thời gian. Vì nhiều tập dữ liệu chỉ cung cấp "nhãn cấp đoạn" (weak labels), mô hình thường cần sử dụng học đa thể hiện, pooling tự chú ý và các phương pháp khác để học định vị thời gian của sự kiện dưới giám sát yếu.

### 4.3.2 Hiểu âm nhạc và gán nhãn: từ "nhãn danh sách phát" đến "phân tích cấu trúc"

Trong lĩnh vực âm nhạc, mục tiêu của hiểu âm thanh không chỉ là "đây là bài hát gì", mà còn là trả lời: **"Bài hát này thuộc phong cách gì? Sử dụng những nhạc cụ nào? Nhịp độ nhanh chậm ra sao? Tông điệu và cấu trúc hòa âm đại thể là gì?"** Những thông tin này một mặt hỗ trợ gợi ý âm nhạc và biên soạn danh sách phát, mặt khác cung cấp "metadata âm nhạc" có cấu trúc cho người sáng tạo và mô hình sinh.

Tác vụ **phân loại thể loại nhạc** sẽ phân loại bài hát vào các phong cách khác nhau như pop, rock, cổ điển, hip-hop, điện tử, Lo‑Fi dựa trên đặc trưng và cấu trúc âm thanh tổng thể; **nhận dạng nhạc cụ** phân biệt dấu vân tay âm học của các nhạc cụ khác nhau như trống, bass, guitar, piano, dây trên đặc trưng thời gian–tần số, có thể được sử dụng cho thống kê nhạc cụ, truy xuất âm nhạc và phân tích phối khí. **Phân tích nhịp điệu/tông điệu** ước tính BPM, vị trí điểm nhấn, số chỉ nhịp, tông chính (Key), cung cấp nền tảng cho các tác vụ như khớp nhịp, hòa âm tự động, phối nhạc DJ, đồng bộ nhạc nền trò chơi.

Về mô hình, hiểu âm nhạc phần lớn kế thừa các mô hình âm thanh đa dụng (như PANNs, AST), nhưng cũng có nhiều mô hình và embedding tiền huấn luyện dành riêng cho truy xuất thông tin âm nhạc (MIR). Cách tiếp cận điển hình là thực hiện **học gán nhãn âm nhạc đa nhãn** (thể loại, tâm trạng, nhạc cụ, thời đại, v.v.) trên tập dữ liệu âm nhạc quy mô lớn, thu được không gian embedding âm nhạc, sau đó tinh chỉnh hoặc suy luận zero-shot trên các tác vụ cụ thể nêu trên. Kết hợp các mô hình này, nền tảng âm nhạc có thể phân loại và gợi ý âm nhạc thông minh hơn, nền tảng bản quyền có thể tăng cường dấu vân tay âm nhạc và truy xuất tương tự, còn công cụ sáng tác có thể tận dụng những khả năng hiểu này để gợi ý nhạc đệm phù hợp cho người dùng, mở rộng phong cách tương tự hoặc tự động tạo cấu trúc âm nhạc.## 4.4 Tạo giọng nói và âm thanh (TTS / VC / Music Generation)

Sau khi hoàn thành việc "làm sạch", "nhận dạng" và "hiểu" âm thanh, câu hỏi tự nhiên tiếp theo là: **"Liệu chúng ta có thể khiến máy móc trực tiếp 'nói', 'hát' thậm chí 'sáng tác' không?"** Đây chính là thế giới của tạo giọng nói và âm thanh: từ văn bản thành giọng nói (TTS), từ một giọng nói này sang giọng nói khác (VC / Voice Cloning), đến việc tạo nhạc và hiệu ứng âm thanh ở phạm vi rộng hơn, rồi đến tổng hợp giọng hát có thể thể hiện lời bài hát và giai điệu. Tương tự như tạo hình ảnh, tầng này không còn chỉ là gắn nhãn hay trích xuất cấu trúc từ dữ liệu có sẵn, mà là chủ động "sáng tạo" ra nội dung âm thanh mới.

Ở cấp độ sản phẩm, năng lực của tầng này đã thâm nhập vào nhiều loại ứng dụng: các dòng sản phẩm giọng nói như OpenAI TTS, ElevenLabs, Volcano Engine, MiniMax cung cấp giọng nói tổng hợp chất lượng cao cho ứng dụng; các nền tảng tạo nhạc như Suno, Udio cung cấp cho người sáng tạo thậm chí cả người dùng thông thường khả năng tạo nhạc hoàn chỉnh từ văn bản; trò chơi, video, VTuber và digital human phụ thuộc vào các mô hình này để lồng tiếng và hát, giảm đáng kể rào cản sản xuất nội dung.

- **Kịch bản**
  - Chuyển văn bản thành giọng nói (TTS): phát thanh tin tức, dẫn đường, phản hồi giọng nói của tổng đài thông minh, đọc nội dung trong ứng dụng học tập, đọc màn hình trợ năng, v.v., cần chuyển đổi văn bản tùy ý thành giọng nói tự nhiên, rõ ràng và có thể kiểm soát.
  - Chuyển đổi giọng nói / Nhân bản giọng nói (VC / Voice Cloning): thay đổi âm sắc của người nói trong khi vẫn giữ nguyên ngữ nghĩa và ngữ điệu, thực hiện "đổi giọng khi nói" hoặc "nhân bản dấu vân thanh với ít mẫu" (trong điều kiện tuân thủ nghiêm ngặt).
  - Tạo nhạc và hiệu ứng âm thanh: tạo nhạc nền và hiệu ứng âm thanh phù hợp (âm thanh môi trường, hiệu ứng UI, âm thanh chuyển cảnh) cho video ngắn, trò chơi, quảng cáo, podcast, v.v.
  - Tổng hợp giọng hát và cover: đưa giai điệu và lời bài hát, để ca sĩ ảo thể hiện, hoặc tạo phiên bản cover theo phong cách/âm sắc nhất định trong điều kiện tuân thủ.
- **Nguyên lý**
  Việc tạo giọng nói và âm thanh thường áp dụng hướng mô hình hóa phân tầng **"biểu diễn cấp cao → dạng sóng cấp thấp"**:
  - Trong TTS, trước tiên chuyển văn bản thành chuỗi âm vị/âm tiết/ký tự, sau đó thông qua mô hình chuyển chuỗi thành đặc trưng âm học (như mel-spectrogram) (Tacotron, FastSpeech, VITS, v.v.), cuối cùng sử dụng vocoder nơ-ron (WaveNet, WaveRNN, HiFi‑GAN, v.v.) để tạo dạng sóng độ trung thực cao từ đặc trưng.
  - Trong Voice Conversion, thông qua việc tách rời "nói gì (nội dung)" và "ai đang nói (âm sắc)", trích xuất biểu diễn nội dung từ giọng nói nguồn, sau đó kết hợp với embedding người nói đích hoặc điều kiện vocoder để tạo dạng sóng giọng nói mới.
  - Tạo nhạc và hiệu ứng âm thanh có thể dựa trên biểu diễn token hóa (như nốt nhạc, MIDI, phổ/codec token đã mã hóa), sử dụng mô hình tự hồi quy, khuếch tán (Diffusion) hoặc mô hình tạo codec nơ-ron, lấy mẫu âm thanh mới từ văn bản, âm thanh tham chiếu hoặc tham số cấu trúc.
  - Tổng hợp giọng hát giới thiệu thêm khả năng kiểm soát ngữ điệu, quỹ đạo cao độ và điều khiển hát tinh tế hơn trên nền tảng TTS, thường mô hình hóa tường minh hoặc ẩn đối với cao độ, trường độ, legato, vibrato, v.v.
- **Mô hình**
  Các hướng kỹ thuật chính hiện nay trong tạo giọng nói và âm thanh bao gồm:
  - TTS: Tacotron / Tacotron2, dòng FastSpeech (TTS phi tự hồi quy), VITS, v.v. chịu trách nhiệm chuyển từ văn bản sang mel-spectrogram hoặc codec token; WaveNet, WaveRNN, HiFi‑GAN, WaveGlow, v.v. làm vocoder hoặc bộ giải mã chịu trách nhiệm chuyển từ đặc trưng sang dạng sóng. Gần đây, Diffusion‑based TTS và mô hình Neural Codec tiếp tục cải thiện về độ tự nhiên và đa dạng.
  - Voice Conversion / Cloning: khung VC dựa trên speaker embedding + content encoder, cùng với mô hình chuyển đổi giọng nói sử dụng neural codec, hỗ trợ nhân bản âm sắc với ít mẫu và chuyển đổi người nói xuyên ngôn ngữ. Loại công nghệ này hiện đã được nhiều nền tảng thương mại hóa, cung cấp dịch vụ nhân bản giọng nói tiện lợi, các nền tảng phổ biến trong nước bao gồm Volcano Engine, MiniMax, Nền tảng mở iFlytek, Nền tảng mô hình lớn Qianfan của Baidu AI Cloud, Nền tảng tương tác giọng nói thông minh Alibaba Cloud, v.v.; ở nước ngoài có các nền tảng chính như ElevenLabs, Resemble.ai, Play.ht. Trong đó, khả năng nhân bản giọng nói của Volcano Engine hỗ trợ huấn luyện nhanh với ít mẫu âm thanh, thích ứng với nhiều kịch bản thương mại như tổng đài thông minh, sách nói; MiniMax dựa trên lợi thế công nghệ mô hình lớn của mình, thực hiện được sự thích ứng tự nhiên giữa âm sắc nhân bản và nội dung văn bản, đồng thời hỗ trợ chuyển đổi âm sắc người nói xuyên ngôn ngữ; nhân bản giọng nói của Nền tảng mở iFlytek có lợi thế rõ rệt về độ rõ ràng trong phát âm tiếng Trung và khả năng biểu đạt cảm xúc, phục vụ rộng rãi trong các lĩnh vực giáo dục, phát thanh truyền hình.
  - Tạo nhạc và hiệu ứng âm thanh: MusicLM, MusicGen, cùng các mô hình dạng Suno / Udio, thường dựa trên điều kiện văn bản và/hoặc âm thanh tham chiếu, sử dụng kiến trúc tự hồi quy hoặc khuếch tán trên codec token rời rạc để tạo âm thanh có thời lượng dài.

### 4.4.1 Chuyển văn bản thành giọng nói (TTS): khiến máy móc "cất tiếng nói tự nhiên"

**Chuyển văn bản thành giọng nói (TTS)** là tác vụ tạo giọng nói trực quan nhất: đầu vào là một đoạn văn bản, đầu ra là một đoạn giọng nói tự nhiên trôi chảy, lý tưởng nhất là gần như không thể phân biệt với giọng người thật. Hệ thống TTS hiện đại thường được chia thành hai giai đoạn chính: văn bản sang đặc trưng âm học (như mel-spectrogram), và đặc trưng âm học sang dạng sóng.

Trong giai đoạn đầu tiên, mô hình cần xử lý các vấn đề như phân tách từ, âm vị hóa, giải quyết nhập nhằng đa âm, dấu câu và ngắt nghỉ, dự đoán ngữ điệu. Các mô hình điển hình bao gồm dòng Tacotron dựa trên attention và dòng FastSpeech dựa trên dự đoán độ dài, trong đó FastSpeech tăng tốc đáng kể quá trình tổng hợp và cải thiện độ ổn định thông qua kiến trúc phi tự hồi quy. Những năm gần đây, các mô hình end-to-end như VITS tích hợp mô hình hóa âm học và vocoder trong một khung thống nhất, đơn giản hóa hơn nữa hệ thống.

Trong giai đoạn thứ hai, Neural Vocoder như WaveNet, WaveRNN, HiFi‑GAN, WaveGlow, v.v. chịu trách nhiệm chuyển đổi mel-spectrogram hoặc các biểu diễn trung gian khác thành dạng sóng độ trung thực cao. Vocoder được huấn luyện tốt không chỉ tạo ra giọng nói tự nhiên rõ ràng, mà còn tái tạo tốt các âm sắc, cảm xúc và phong cách khác nhau. Hệ thống TTS hiện đại còn hỗ trợ **mô hình hóa đa người nói** (thông qua speaker embedding), kiểm soát âm sắc/tốc độ/cảm xúc (như "phấn khích", "bình tĩnh", "giọng phát thanh"), cũng như TTS xuyên ngôn ngữ, cung cấp khả năng giọng nói tùy chỉnh cao cho các ứng dụng khác nhau.

### 4.4.2 Chuyển đổi giọng nói và nhân bản dấu vân thanh: thay đổi "ai đang nói"

Trong nhiều kịch bản sáng tạo và hỗ trợ, chúng ta mong muốn thay đổi âm sắc hoặc phong cách của người nói **mà không thay đổi nội dung và ngữ điệu**, đây chính là nhiệm vụ của **chuyển đổi giọng nói (VC)** và **nhân bản giọng nói (Voice Cloning)**. Nhiệm vụ trước chủ yếu giải quyết việc "biến lời nói của A thành giọng của B"; nhiệm vụ sau nhấn mạnh hơn khả năng "học được âm sắc mới chỉ với vài mẫu thậm chí vài câu nói".

Về mặt kỹ thuật, VC thường áp dụng hướng "tách rời nội dung – âm sắc": thông qua một content encoder trích xuất thông tin nội dung lời nói và ngữ điệu (có thể là đơn vị rời rạc dựa trên ASR, hoặc biểu diễn liên tục tự giám sát), sau đó thông qua một bộ tạo có điều kiện kết hợp với embedding người nói đích hoặc điều kiện codec, tạo ra giọng nói mới có âm sắc đích nhưng ngữ nghĩa và nhịp điệu về cơ bản không thay đổi. Nếu giới thiệu neural codec, có thể chỉnh sửa giọng nói trực tiếp trong không gian mã hóa-giải mã, thực hiện chuyển đổi độ trung thực cao.

**Nhân bản giọng nói** nhấn mạnh khả năng ít mẫu và tổng quát hóa trên nền tảng VC: mô hình cần trích xuất biểu diễn người nói ổn định từ vài mẫu thậm chí vài giây âm thanh, và từ đó tạo ra giọng nói tổng hợp có phong cách nhất quán, âm sắc gần giống. Khả năng này rất hữu ích trong các lĩnh vực như nhân vật ảo, trợ lý cá nhân hóa, tùy chỉnh nhân vật trò chơi, tăng tốc lồng tiếng, nhưng cũng cần tuân thủ nghiêm ngặt các quy định pháp luật và đạo đức, đảm bảo chỉ sử dụng trong điều kiện được ủy quyền hợp pháp, có đầy đủ thông tin và kiểm soát an toàn, tránh nguy cơ lạm dụng hoặc giả mạo danh tính.

### 4.4.3 Tạo nhạc và hiệu ứng âm thanh: từ gợi ý đến cảnh quan âm thanh hoàn chỉnh

So với tạo giọng nói, **tạo nhạc và hiệu ứng âm thanh** phức tạp hơn về cấu trúc và thang thời gian: âm nhạc thường kéo dài hơn, cấu trúc nội bộ (đoạn, giai điệu, hòa âm, nhịp điệu) phong phú hơn; hiệu ứng âm thanh thì đa dạng về chủng loại, từ môi trường tự nhiên (tiếng mưa, tiếng gió, tiếng sóng biển) đến âm thanh mô phỏng (nhấp chuột UI, âm báo, hiệu ứng kỹ năng game) đều có các mẫu hình riêng. Những năm gần đây, các mô hình dựa trên neural codec, mô hình hóa chuỗi và khuếch tán đã biến "tạo nhạc/hiệu ứng âm thanh hoàn chỉnh từ văn bản" thành hiện thực.

Trong tạo nhạc, các mô hình như MusicLM, MusicGen, Suno, Udio thường mã hóa âm thanh thành chuỗi codec token rời rạc, sau đó huấn luyện mô hình tạo có điều kiện văn bản hoặc đa phương thức trên không gian rời rạc này. Người dùng chỉ cần cung cấp một đoạn mô tả văn bản (như "nhạc nền Lo‑Fi nhịp độ vừa phải, ấm áp chữa lành, phù hợp cho học tập tập trung", "nhạc phối điện tử-giao hưởng căng thẳng, phù hợp cho trailer khoa học viễn tưởng"), hoặc tải lên một đoạn nhạc tham chiếu, mô hình có thể tạo ra nhạc chất lượng cao dài từ vài chục giây đến thậm chí vài phút. Đối với người sáng tạo, đây vừa là nguồn cảm hứng, vừa là công cụ mạnh mẽ để tạo mẫu nhanh và tạo nhạc nền.

Trong tạo hiệu ứng âm thanh, kỹ thuật tương tự có thể tạo ra hiệu ứng UI, âm thông báo, âm thanh môi trường game, v.v. từ gợi ý văn bản, giúp các đội ngũ sản phẩm và trò chơi nhanh chóng lặp lại thiết kế âm thanh. Kết hợp với khả năng hiểu âm thanh ở tầng trước, còn có thể thực hiện căn chỉnh phong cách và thích ứng theo bối cảnh, ví dụ tự động khớp phong cách hiệu ứng âm thanh theo hình ảnh hoặc màn chơi.

Dù là giọng nói hay nhạc và hiệu ứng âm thanh, năng lực của tầng này đều đang tiến hóa nhanh chóng: từ âm thanh máy móc đầy tính tổng hợp thời kỳ đầu, đến nội dung độ trung thực cao khó phân biệt với giọng người thật và nhạc chuyên nghiệp ngày nay. Đồng thời, các vấn đề xoay quanh bản quyền, tuân thủ, truy xuất nguồn gốc và khả năng kiểm soát cũng trở nên đặc biệt quan trọng — làm thế nào để cung cấp công cụ sáng tạo mạnh mẽ đồng thời bảo vệ quyền lợi hợp pháp của người sáng tạo và người dùng, sẽ là chủ đề then chốt mà công nghệ tầng này cần tiếp tục đối mặt.# 5. Video

Trong hệ thống AI đa phương thức, **mô-đun video** chịu trách nhiệm hiểu và tạo ra "tín hiệu thị giác thay đổi theo thời gian". So với hình ảnh đơn khung, video không chỉ chứa thông tin về kết cấu, hình dạng và bố cục trong không gian, mà còn mang theo các **tín hiệu chiều thời gian** phong phú: sự khởi đầu và kết thúc của hành động, quỹ đạo chuyển động của vật thể, nhịp điệu chuyển cảnh, v.v. Dù là nhận diện hành vi trong giám sát an ninh, phân tích động tác trong huấn luyện thể thao, hay chỉnh sửa nhanh trên nền tảng video ngắn, phân tích thông minh video dài, về bản chất tất cả đều dựa trên một bộ năng lực hiểu và tạo xoay quanh "chuỗi khung hình".

Từ góc độ kỹ thuật, năng lực video có thể được chia thành nhiều tầng: **tăng cường và phục hồi video tầng thấp** đảm bảo "có thể nhìn rõ"; **hiểu video và phân tích cấu trúc** trả lời câu hỏi "đã xảy ra điều gì"; trên nền tảng đó, **các tác vụ đa phương thức video + ngôn ngữ** chuyển đổi nội dung video thành mô tả có cấu trúc và giao diện truy xuất mà văn bản có thể sử dụng; tiến thêm một bước, **tạo và chỉnh sửa video** thì ngược lại, từ văn bản hoặc video mẫu, tạo ra hoặc tái tổ hợp nội dung video theo cách có thể kiểm soát; còn nhóm ứng dụng tiêu biểu như **con người kỹ thuật số / nhân vật ảo** thì tích hợp giọng nói, ngôn ngữ, hành động và kết xuất video lại với nhau, tạo thành một hình thái mới hướng tới tương tác và sản xuất nội dung.

Dưới đây, chúng ta cũng bắt đầu từ các năng lực phân tầng để hệ thống hóa các năng lực liên quan đến video.## 5.1 Xử lý video truyền thống: Từ "phát được" đến "đẹp, dễ dùng"

Ở tầng thấp nhất của công nghệ video, điều chúng ta quan tâm trước tiên không phải là "ai trong khung hình" hay "sự kiện gì đã xảy ra", mà là bản thân video đó có ổn định, rõ nét, dễ chịu hay không: hình ảnh có rung lắc không, có mờ không, nhiễu có nhiều không, tỷ lệ khung hình có phù hợp với thiết bị phát mục tiêu không. Tầng **xử lý video truyền thống** này chủ yếu hoạt động ở mức chuỗi khung hình và pixel không-thời gian, thông qua các thao tác như tăng cường, phục hồi, siêu phân giải, nội suy khung hình và tái định khung, chuyển đổi video thô bị nhiễu, rung lắc, độ phân giải thấp hoặc tỷ lệ không phù hợp thành "tín hiệu thời gian chất lượng cao" phù hợp hơn để xem và phân tích tiếp theo. Có thể so sánh tầng này với "phục hồi và tăng cường ảnh + hiệu chỉnh hình học" trong modal ảnh, chỉ khác là ở đây có thêm chiều thời gian với yêu cầu về độ mượt và tính nhất quán.

Từ góc độ sản phẩm, năng lực của tầng này gần như "ẩn mình" đằng sau mọi sản phẩm video: nâng cao chất lượng hình ảnh một chạm trong phần mềm chỉnh sửa, tự động nâng cấp chất lượng trong nền tảng video ngắn, siêu phân giải và nội suy khung hình thông minh trên TV box và trình phát, dịch vụ phục hồi phim cũ, cũng như tiền xử lý đa khung hình cho các mô hình phát hiện/nhận dạng ở tầng trên — tất cả đều là biểu hiện trực tiếp của xử lý video truyền thống. Dưới đây, chúng ta vẫn sẽ sắp xếp theo ba góc độ **kịch bản**, **nguyên lý** và **mô hình**, đồng thời trong các mục tiếp theo sẽ triển khai chi tiết các hướng chính về tăng cường và phục hồi video, siêu phân giải và nội suy khung hình.

- **Kịch bản**
  Trong các nền tảng video trực tuyến, công cụ chỉnh sửa, hệ thống giám sát và thiết bị đầu cuối, xử lý video truyền thống chủ yếu xuất hiện trong các tình huống điển hình sau:
  - Nền tảng nội dung và công cụ chỉnh sửa: Khi tải lên hoặc chỉnh sửa video ngắn, video dài, thông qua nâng cao chất lượng một chạm, ổn định hình ảnh, chống rung, giảm nhiễu, giúp người dùng "cầm điện thoại lên là quay, quay xong là dùng được"; khi nhập tư liệu video cũ vào dự án chỉnh sửa, thông qua phục hồi và bổ sung khung hình, giúp chúng đồng nhất hơn về mặt thị giác với tư liệu mới.
  - Điện ảnh và phục hồi phim cũ: Phục hồi số cho phim lịch sử, chương trình truyền hình đời đầu và tư liệu độ phân giải tiêu chuẩn, loại bỏ vết xước, nhiễu và rung lắc, khôi phục màu sắc và chi tiết, cung cấp phiên bản chất lượng cao hơn cho việc chiếu lại, tái phát hành và lưu trữ số.
  - Giám sát video và camera hành trình: Giảm nhiễu, khử sương mù, tăng cường độ tương phản và ổn định hình ảnh cho cảnh quay giám sát trong điều kiện ánh sáng yếu, mưa sương, nén nặng, nâng cao độ bền vững của các mô-đun phát hiện và nhận dạng phía sau, thuận tiện cho việc thu thập chứng cứ và truy xuất nguồn gốc.
  - Phát trên thiết bị đầu cuối và tăng cường phía thiết bị: TV, set-top box, trình phát di động tích hợp cục bộ chức năng siêu phân giải và nội suy khung hình, "nâng cấp" nội dung 720p/1080p, 24/30fps hiện có lên hiệu ứng thị giác gần tương đương 4K, 60/120fps ngay tại đầu phát.
  - Thích ứng và phân phối đa thiết bị đầu cuối: Để phủ sóng đồng thời màn hình dọc điện thoại, màn hình ngang máy tính bảng và TV màn hình lớn, thực hiện thích ứng dọc/ngang, cắt thông minh và tái định khung đa tỷ lệ cho cùng một video, giảm chi phí chỉnh sửa thủ công và bảo trì đa phiên bản.
- **Nguyên lý**
  Xử lý video truyền thống thường không trực tiếp hiểu các lớp ngữ nghĩa, mà tập trung mô hình hóa và tối ưu ở mức tín hiệu không-thời gian xoay quanh chất lượng hình ảnh, độ ổn định và tính nhất quán thời gian:
  - Mô hình hóa kết hợp không-thời gian: Trên cơ sở tăng cường ảnh đơn khung, đưa vào thông tin chiều thời gian, thông qua ước lượng luồng quang, mô hình hóa chuyển động camera hoặc tích chập không-thời gian, coi các khung trước và sau như các "quan sát" bổ sung, thực hiện hợp nhất đa khung và triệt nhiễu trên trục thời gian.
  - Ổn định hình ảnh và chống rung: Mô hình hóa rung lắc camera thành một chuỗi biến đổi hình học trong một khoảng thời gian (tịnh tiến, xoay, co giãn, v.v.), thông qua ước lượng quỹ đạo chuyển động toàn cục hoặc cục bộ, làm mượt quỹ đạo đó rồi chiếu lại vào video đầu ra, từ đó đạt được hiệu quả khử rung và ổn định.
  - Siêu phân giải và nội suy khung hình video: Siêu phân giải video thông qua căn chỉnh đa khung và tái tạo chi tiết, nâng cao độ phân giải không gian đồng thời duy trì tính nhất quán thời gian; nội suy khung hình thông qua ước lượng luồng quang hoặc mạng sinh không-thời gian, tổng hợp khung trung gian giữa hai khung, trình bày chuyển động với tốc độ khung hình cao hơn, tăng độ mượt mà.
  - Tái định khung và tự động bố cục: Thông qua phát hiện và theo dõi chủ thể trong video (người, vật thể), ước lượng quỹ đạo chủ thể trên trục thời gian, kết hợp với tỷ lệ khung hình mục tiêu, chọn cửa sổ cắt phù hợp cho từng khung, đồng thời làm mượt thời gian chuyển động của cửa sổ cắt để đảm bảo cảm nhận thị giác tự nhiên.
  - Cân bằng chất lượng và hiệu suất: Xử lý ngoại tuyến trên đám mây có thể theo đuổi chất lượng hình ảnh tối ưu và mô hình phức tạp, trong khi trên điện thoại, trình phát và các tình huống thời gian thực cần kiểm soát số lượng tham số mô hình, độ phức tạp tính toán và độ trễ, thực hiện các thỏa hiệp tinh tế về cấu trúc thuật toán và khung suy luận.
- **Mô hình**
  Về mặt triển khai cụ thể, xử lý video truyền thống sử dụng tổng hợp các phương pháp xử lý tín hiệu video cổ điển và mô hình học sâu, tìm kiếm sự cân bằng giữa hiệu quả, hiệu suất và hình thức triển khai:
  - Phương pháp xử lý video cổ điển: Ổn định hình ảnh và nội suy khung dựa trên luồng quang, lọc miền thời gian và hợp nhất đa khung, khử nhiễu và khử nhiễu nén dựa trên khớp khối, v.v., vẫn được sử dụng rộng rãi trong các tình huống hạn chế về năng lực tính toán hoặc có yêu cầu về khả năng giải thích.
  - Mô hình phục hồi và tăng cường video sâu: Lấy EDVR, BasicVSR / BasicVSR++, Real‑ESRGAN phiên bản video, v.v. làm đại diện cho các mạng siêu phân giải và tăng cường đa khung, thông qua căn chỉnh và tổng hợp đặc trưng không-thời gian, vượt trội đáng kể so với phương pháp truyền thống trong khử nhiễu, khử mờ, phục hồi chi tiết và khử nhiễu nén.
  - Mô hình nội suy khung sâu: Như các mạng nội suy khung DAIN, RIFE, FILM, v.v., thông qua ước lượng luồng quang tường minh hoặc ngầm định và hợp nhất đặc trưng trung gian để sinh khung trung gian, ổn định hơn so với phương pháp luồng quang + tái lấy mẫu truyền thống trong các tình huống chuyển động phức tạp và che khuất.
  - Phục hồi video dựa trên Transformer: Sử dụng attention không-thời gian để xử lý thống nhất kết cấu không gian và phụ thuộc thời gian, có khả năng mô hình hóa mạnh mẽ hơn trong các tình huống chuyển động camera phức tạp, đa vật thể, đồng thời kiểm soát lượng tính toán trong quá trình suy luận thông qua các cơ chế như attention thưa, cửa sổ trượt.
  - Sản phẩm và hệ thống thực tế: Tăng cường thông minh của CapCut, phần mềm tăng cường thương mại Topaz Video Enhance, pipeline nâng cao chất lượng hình ảnh của Bilibili và các nền tảng video ngắn, dịch vụ SaaS phục hồi phim cũ, v.v., thường sẽ kết hợp nhiều mô hình và chiến lược theo tầng, lựa chọn động đường dẫn xử lý tối ưu dựa trên loại tư liệu và điều kiện thiết bị đầu cuối.

Tổng hợp lại, tầng này chủ yếu đặt nền tảng vật lý và cảm nhận cho video "trước ngữ nghĩa": vừa giúp người dùng có được trải nghiệm xem thoải mái hơn, vừa cung cấp đầu vào sạch hơn, ổn định hơn cho các mô hình phát hiện, nhận dạng và sinh ở tầng trên. Dưới đây, chúng ta sẽ lần lượt triển khai từ các hướng con như **tăng cường và phục hồi video**, **siêu phân giải và nội suy khung hình**.

### 5.1.1 Tăng cường và phục hồi video: Mài giũa từ "xem được" đến "đẹp"

Trong điều kiện quay thực tế, video thường không "sạch": rung lắc dữ dội do thiết bị cầm tay, nhiễu cao và cảm giác nhòe trong điều kiện ánh sáng yếu, nhiễu khối và dải màu do nén mạng, phai màu và vết xước từ thiết bị cũ, tất cả đều khiến chất lượng video thấp hơn đáng kể so với trạng thái lý tưởng. Mục tiêu của tăng cường và phục hồi video chính là, trong điều kiện không thay đổi nội dung ngữ nghĩa của video, khôi phục tối đa cảm nhận thị giác ổn định, rõ nét, tự nhiên, mài giũa tư liệu "miễn cưỡng xem được" đến mức "nhìn thuận mắt thậm chí là đẹp".

Trên miền thời gian, tăng cường và phục hồi trước tiên cần giải quyết vấn đề ổn định. Thông qua khớp đặc trưng hoặc ước lượng luồng quang trên các khung liên tiếp, có thể tách biệt chuyển động camera toàn cục và chuyển động vật thể cục bộ, sau đó sử dụng quỹ đạo camera đã được làm mượt để kết xuất lại khung đầu ra, từ đó triệt tiêu rung lắc nhanh và dao động nhỏ, tránh gây cảm giác chóng mặt cho người xem trong quá trình xem. Trên cơ sở đó, khử nhiễu, khử mờ và khử nhiễu giả ở cấp độ khung hình tập trung nhiều hơn vào mô hình hóa kết hợp không gian-thời gian: khử nhiễu kết hợp đa khung tận dụng thông tin dư thừa giữa khung trước và khung sau, thực hiện xử lý tương tự như "hợp nhất đa phơi sáng" theo hướng thời gian, triệt tiêu hiệu quả nhiễu ISO cao và nhiễu nén trong khi vẫn giữ được kết cấu chi tiết; đối với mờ chuyển động nhẹ, thông qua ước lượng hạt nhân mờ hoặc sử dụng mạng sâu đầu cuối, thực hiện xử lý làm sắc nét kiểu giải chập trên chuỗi khung hình, khiến cả nền tĩnh và chủ thể chuyển động đều sắc nét hơn.

Đối với phim cũ và tư liệu chất lượng thấp, phục hồi còn liên quan đến việc "tái tạo" ở cấp độ màu sắc và cấu trúc. Phim bị lão hóa sẽ khiến khung hình ngả vàng, độ tương phản giảm, vết xước và vết bẩn cục bộ rõ rệt, trong khi video số đời đầu thường gặp các vấn đề như độ phân giải thấp, nén nặng và răng cưa cạnh. Quy trình phục hồi hiện đại thường áp dụng phối hợp nhiều bước: trước tiên sử dụng mô hình phát hiện và phân đoạn để định vị các khu vực hư hỏng cục bộ như vết xước, vết bẩn, sau đó thông qua mạng hoàn thiện không-thời gian "mượn chất liệu lấp chỗ trống" từ các pixel lân cận trong không gian và các khung lân cận trong thời gian; đồng thời thực hiện khôi phục màu sắc và tái tạo độ tương phản, khiến tông màu tổng thể tiệm cận với tham chiếu phong cách của bản gốc khi quay hoặc được thiết lập. Đối với video bị nén nặng, còn đưa vào mạng khử nhiễu giả chuyên dụng nhắm vào hiệu ứng khối và nhiễu chuông, cải thiện cạnh và chi tiết trong điều kiện không làm mịn quá mức.

Những năng lực tăng cường và phục hồi này trong sản phẩm thường được thể hiện dưới dạng "một chạm": người dùng chỉ cần chọn "ổn định hình ảnh", "nâng cao chất lượng" hoặc "phục hồi video cũ", hệ thống sẽ tự động chọn tổ hợp mô hình và tham số phù hợp ở hậu trường, thực hiện xử lý đa giai đoạn trên chuỗi khung hình video. Đối với doanh nghiệp, tầng này vừa trực tiếp quyết định đánh giá chủ quan của người xem về chất lượng hình ảnh, vừa gián tiếp ảnh hưởng đến hiệu suất của các mô hình phân tích ở tầng trên: đầu vào video sạch hơn, ổn định hơn thường đồng nghĩa với nhận dạng khuôn mặt/biển số xe đáng tin cậy hơn, phát hiện hành vi chính xác hơn và ít cảnh báo sai hơn.

### 5.1.2 Siêu phân giải và nội suy khung hình: Từ "nhìn rõ" đến "mượt mà hơn"

Trong bối cảnh thiết bị hiển thị không ngừng nâng cấp, yêu cầu của người dùng về chi tiết và độ mượt mà ngày càng cao, một lượng lớn nội dung video hiện có trở nên "thiếu hụt bẩm sinh" về độ phân giải và tốc độ khung hình: 1080p trên màn hình 4K trông không đủ sắc nét, 24/30fps trên màn hình lớn và trong các tình huống chuyển động nhanh dễ xuất hiện hiện tượng bóng mờ hoặc cảm giác giật. Công nghệ siêu phân giải và nội suy khung hình chính là để giải quyết hai vấn đề này: cái trước "bổ sung chi tiết" trên chiều không gian, cái sau "bổ sung quá trình" trên chiều thời gian, cùng nhau nâng cao video từ mức "miễn cưỡng nhìn rõ" lên trải nghiệm "chi tiết phong phú, phát mượt mà".

Siêu phân giải video có thêm một chiều then chốt so với siêu phân giải ảnh đơn khung: thời gian. Phóng to từng khung một cách đơn giản dễ dẫn đến chi tiết giữa các khung liền kề không nhất quán, xuất hiện nhấp nháy và rung động kết cấu. Do đó, các phương pháp chính thống đều tận dụng thông tin từ nhiều khung trước và sau, thông qua ước lượng luồng quang hoặc căn chỉnh ở mức đặc trưng, căn chỉnh chi tiết từ các khung lân cận vào khung mục tiêu, sau đó tái tạo chi tiết sau khi căn chỉnh. Các mô hình như EDVR, BasicVSR / BasicVSR++, Real‑ESRGAN phiên bản video, trước tiên căn chỉnh và tổng hợp đa khung trong không gian đặc trưng, sau đó sử dụng mạng sâu để suy luận chi tiết độ phân giải cao, tránh cảm giác "mờ" và "như nhựa" do nội suy đơn giản gây ra. Trong quá trình này, làm thế nào để cân bằng giữa "hợp lý về mặt vật lý" và "đẹp về mặt cảm nhận" là cốt lõi của thiết kế hàm mất mát và chiến lược huấn luyện: vừa cần nâng cao chỉ số khách quan (như PSNR, SSIM), vừa phải đảm bảo cảm nhận chủ quan tự nhiên, không có hiện tượng làm sắc nét quá mức và chi tiết giả.

Nội suy khung hình tập trung vào việc "bổ sung khung" trên trục thời gian. Phương pháp truyền thống dựa vào ước lượng luồng quang, trước tiên dự đoán chuyển động của mỗi pixel giữa hai khung trước và sau, sau đó nội suy sinh khung mới tại vị trí trung gian theo quy tắc nhất định. Tuy nhiên, trong các khu vực chuyển động nhanh, đa vật thể che khuất hoặc kết cấu phức tạp, luồng quang thường không đủ chính xác, dễ xuất hiện bóng mờ, bóng đúp hoặc biến dạng cục bộ. Các mô hình nội suy khung sâu như DAIN, RIFE, FILM, v.v., thông qua mạng đầu cuối đồng thời học chiến lược hợp nhất luồng quang, độ sâu hoặc đặc trưng trung gian, trực tiếp xuất khung nội suy, cải thiện rõ rệt độ ổn định và chất lượng thị giác trong các tình huống phức tạp. Đối với sự kiện thể thao, quay màn hình game hành động và sáng tạo slow-motion, nội suy khung hình có thể nâng cao mượt mà video gốc 24/30fps lên 60/120fps, vừa giữ được chi tiết chuyển động, vừa giảm giật và bóng mờ.

Trong thực tiễn kỹ thuật, siêu phân giải và nội suy khung hình thường được sử dụng kết hợp: đối với nội dung hiện có độ phân giải thấp, tốc độ khung hình thấp, trước tiên thực hiện nội suy khung thời gian, sau đó siêu phân giải không gian, hoặc thực hiện tích hợp cả hai trong một mạng không-thời gian thống nhất. Về hình thức triển khai, xử lý ngoại tuyến trên đám mây phù hợp với phục hồi điện ảnh yêu cầu chất lượng hình ảnh cực cao và dịch vụ "nâng cấp chất lượng" cấp nền tảng, trong khi suy luận thời gian thực phía thiết bị thường thấy nhiều hơn trong TV box, ứng dụng trình phát và camera game/thể thao, cần thông qua nén mô hình và tăng tốc phần cứng để đảm bảo độ trễ thấp. Dù được trình bày dưới hình thức nào, siêu phân giải và nội suy khung hình đã trở thành hạ tầng quan trọng của "trải nghiệm HD/UHD", giúp nội dung cũ tỏa sáng "mùa xuân thứ hai" trên thiết bị đầu cuối mới.## 5.2 Hiểu và Phân tích Cấu trúc Video (Video Understanding)

Nếu như xử lý video truyền thống chủ yếu dừng lại ở mức "chất lượng hình ảnh và độ ổn định", thì **hiểu và phân tích cấu trúc video** bắt đầu trả lời cho các câu hỏi ngữ nghĩa như "điều gì đang xảy ra trong video": ai đang làm gì, ở đâu, kéo dài bao lâu, có hành vi bất thường nào không, v.v. Mục tiêu ở đây là phân tách video theo cấu trúc trên trục thời gian: nhận diện hành động và hành vi, phát hiện và theo dõi đối tượng, phân đoạn tiền cảnh và hậu cảnh, phân chia cảnh và cú máy, đồng thời trích xuất các tín hiệu ngữ nghĩa cấp cao phục vụ cho việc ra quyết định, truy xuất và cảnh báo ở hạ nguồn.

Từ góc độ sản phẩm, lớp năng lực này đã thâm nhập sâu vào các nền tảng an ninh thông minh, hệ thống phân tích huấn luyện thể thao, camera hành trình thông minh và hệ thống phân tích video kiểm tra chất lượng công nghiệp: nhận diện đánh nhau, ngã, đi lang thang và các hành vi bất thường khác trong giám sát; phân tích tính chuẩn xác của động tác và chi tiết kỹ thuật trong các tình huống thể thao và fitness; theo dõi quỹ đạo phương tiện và con người, giám sát quy trình sản xuất có bình thường không trong môi trường giao thông và công nghiệp. Dưới đây, chúng ta vẫn sẽ phân loại những năng lực này từ ba góc độ: **tình huống**, **nguyên lý** và **mô hình**, đồng thời đi sâu vào một số hướng tiêu biểu trong các tiểu mục tiếp theo.

- **Tình huống**
  - An ninh và an toàn công cộng: Trong giám sát đô thị, khuôn viên và tòa nhà, nhận diện các hành vi như đánh nhau, ngã, tụ tập, chạy, trèo qua hàng rào, đồng thời cảnh báo sớm các mẫu hành vi bất thường như đi lang thang, lảng vảng vào đêm khuya.
  - Giao thông và di chuyển: Phát hiện và theo dõi quỹ đạo của người đi bộ, phương tiện, xe đạp tại ngã tư, hầm đường bộ và đường cao tốc, phân tích các hành vi như vượt đèn đỏ, đi ngược chiều, chiếm làn đường, chạy quá tốc độ, cung cấp cơ sở cho quản lý giao thông và truy xuất nguồn gốc tai nạn.
  - Thể thao và huấn luyện vận động: Phân tích các giai đoạn chính và chất lượng tư thế của các động tác như ném bóng rổ, giao bóng tennis, tư thế yoga, cung cấp phân tích kỹ thuật và đề xuất sửa lỗi cho vận động viên và người dùng phổ thông.
  - Sản xuất công nghiệp và kiểm tra chất lượng: Giám sát các bước thao tác trên dây chuyền sản xuất có đúng quy chuẩn không, phát hiện lắp thiếu, lắp sai hoặc động tác bất thường trong quá trình lắp ráp, cung cấp dữ liệu cơ sở cho sản xuất an toàn và nâng cao tỷ lệ đạt chuẩn.
  - Cấu trúc hóa nội dung và truy xuất: Phân tách cú máy, phân loại cảnh và đánh dấu đoạn quan trọng cho video dài, cung cấp chỉ mục có cấu trúc phục vụ cho việc truy xuất, đề xuất và biên tập về sau.
- **Nguyên lý**
  Điểm mấu chốt của hiểu và phân tích cấu trúc video là mô hình hóa đồng thời đối tượng không gian và ngữ nghĩa trên chiều thời gian:
  - Nhận diện hành động và phân tích hành vi: Dựa trên tích chập 2D/3D, pooling theo thời gian hoặc Transformer, mã hóa tổng thể một đoạn video để nhận diện loại hành động xảy ra trong đó; các phương pháp nâng cao kết hợp chuỗi điểm khớp xương người và cấu trúc liên kết của bộ xương để phân tích chất lượng và mẫu hành động ở mức độ chi tiết hơn.
  - Phát hiện và theo dõi đối tượng: Trong khi thực hiện phát hiện trên từng khung hình, đồng thời đưa vào cơ chế liên kết xuyên khung (đặc trưng ngoại hình, quỹ đạo chuyển động, v.v.), nối các hộp phát hiện của cùng một đối tượng tại các thời điểm khác nhau thành một quỹ đạo liên tục, thu được kết quả theo dõi đa đối tượng.
  - Phân đoạn ngữ nghĩa video và phân tích cảnh: Thực hiện phân đoạn ngữ nghĩa hoặc phân đoạn đối tượng cho từng khung hình trong video ở cấp độ pixel, đồng thời tận dụng tính liên tục về thời gian để làm mượt dự đoán; bên cạnh đó, phát hiện chuyển cảnh và ranh giới cảnh để thực hiện phân tách cấu trúc cho video dài.
  - Sự kiện cấp cao và phát hiện bất thường: Trên cơ sở các đặc trưng hành động và quỹ đạo cơ bản, sử dụng các phương pháp mô hình hóa chuỗi thời gian và nhận diện mẫu để phát hiện các sự kiện hiếm gặp và mẫu bất thường, thường kết hợp với học không giám sát hoặc học giám sát yếu để giảm nhẹ vấn đề khan hiếm nhãn dán.
- **Mô hình**
  Về lựa chọn mô hình, hiểu và phân tích cấu trúc video thường áp dụng kiến trúc kết hợp "đặc trưng không gian + mô hình hóa thời gian":
  - Các mô hình cổ điển dựa trên tích chập 3D và Two-Stream, như I3D, v.v., thông qua tích chập đồng thời trên cả chiều không gian và thời gian, thực hiện nhận diện hành động đầu cuối cho các đoạn video ngắn.
  - Các mô hình dòng SlowFast dựa trên đa đường dẫn và đa thang thời gian, với đường chậm nắm bắt ngữ nghĩa, đường nhanh nắm bắt chi tiết chuyển động, đạt được sự cân bằng tốt hơn giữa khối lượng tính toán và độ chính xác.
  - Các mô hình video dựa trên Transformer, như TimeSformer, Video Swin Transformer, v.v., sử dụng cơ chế chú ý không gian-thời gian để mô hình hóa video trong phạm vi thời gian dài, phù hợp hơn cho việc nắm bắt các sự kiện phức tạp và tương tác đa chủ thể.
  - Các bộ phát hiện dạng ống (Tube-based) và mô hình tích chập/Transformer không gian-thời gian, mở rộng hộp phát hiện theo thời gian thành "ống", thực hiện phát hiện hành vi và phân đoạn không gian-thời gian trên các đặc trưng liên kết không gian-thời gian.
  - Các phương pháp theo dõi đa đối tượng (MOT), như DeepSORT, v.v., kết hợp kết quả phát hiện theo khung hình với nhúng ngoại hình và dự đoán chuyển động, liên kết danh tính đối tượng một cách ổn định trong video.

Nhìn tổng thể, lớp năng lực này trừu tượng hóa video từ "luồng pixel chất lượng cao" lên thành "luồng hành vi và sự kiện", đặt nền tảng cấu trúc cho việc hiểu đa phương thức, truy xuất và ra quyết định ở thượng nguồn. Tiếp theo, chúng ta sẽ triển khai từ ba hướng: **nhận diện hành động và phân tích hành vi**, **phát hiện và theo dõi đối tượng**, **phát hiện sự kiện và bất thường**.

### 5.2.1 Nhận diện Hành động và Phân tích Hành vi: Từ chuỗi khung hình đến "ai đang làm gì"

Nhận diện hành động và phân tích hành vi tập trung vào câu hỏi "trong một cửa sổ thời gian, chủ thể đang làm việc gì". Trong tình huống an ninh, điều này có nghĩa là nhận diện các hành vi như "đi bộ, chạy, ngã, đánh nhau" từ video; trong thể thao và fitness, nó tương ứng với các động tác chi tiết hơn như "ném bóng, giao bóng, squat có đúng chuẩn không", "tư thế yoga có chính xác không", v.v. Về mặt kỹ thuật, các phương pháp ban đầu chủ yếu dựa vào tích chập 2D + luồng quang học hoặc đặc trưng thủ công, xếp chồng một số khung hình rồi phân loại tổng thể; các phương pháp hiện đại thì sử dụng nhiều hơn tích chập 3D (I3D, một loạt biến thể 3D ResNet), cấu trúc đa thang thời gian như SlowFast, hoặc các mô hình dựa trên chú ý không gian-thời gian như TimeSformer, Video Swin Transformer, để mô hình hóa đồng thời kết cấu không gian và biến đổi thời gian.

Trong nhiều tình huống yêu cầu phân tích tư thế với độ chính xác cao, chỉ phân loại đoạn RGB là không đủ, mà còn phải kết hợp ước lượng tư thế con người và mô hình hóa chuỗi khung xương: trước tiên trích xuất các điểm khớp xương 2D/3D từ từng khung hình, sau đó đưa chuỗi điểm khớp vào RNN, tích chập theo thời gian hoặc mạng GCN/Transformer để phân tích cấu trúc thời gian và tính phối hợp không gian của hành động. Cách tiếp cận "tiên nghiệm tư thế + mô hình hóa thời gian" này có tính kháng nhiễu tốt hơn trước sự thay đổi của nền, ánh sáng và trang phục, phù hợp với các ứng dụng yêu cầu cao về chi tiết động tác như yoga, fitness, đánh giá tính chuẩn xác của thao tác công nghiệp.

### 5.2.2 Phát hiện và Theo dõi Đối tượng: Từ "ở đâu trong khung hình này" đến "toàn bộ quỹ đạo"

Phát hiện đối tượng trong một khung hình đơn lẻ có thể cho chúng ta biết "trong khung hình này có những đối tượng nào, ở đâu", nhưng nhiều tác vụ trong thực tế yêu cầu "chiếc xe này / người này đến từ đâu, đi đâu và đã làm gì trong khoảng thời gian đó". Mô-đun phát hiện và theo dõi đối tượng chính là để nối các phát hiện theo khung hình thành quỹ đạo liên tục trên thời gian: một mặt chạy bộ phát hiện trên từng khung hình để đưa ra các hộp ứng viên; mặt khác, dựa trên đặc trưng ngoại hình (nhúng ReID), dự đoán chuyển động (bộ lọc Kalman) và chồng lấp không gian cùng các manh mối khác, thực hiện khớp và liên kết các hộp giữa các khung hình liền kề để thu được kết quả theo dõi đa đối tượng (MOT).

Trong thực tiễn kỹ thuật, một pipeline điển hình là: "phát hiện người đi bộ / phương tiện mạnh mẽ + thuật toán liên kết kiểu DeepSORT", triển khai trên camera giám sát hoặc camera hành trình, đầu ra theo thời gian thực quỹ đạo chuyển động của từng ID. Trong các hệ thống phức tạp hơn, những quỹ đạo này còn được kết hợp với ngữ nghĩa khu vực (làn đường, phân vùng) và các quy tắc logic nghiệp vụ, để suy diễn sâu hơn các mẫu hành vi cấp cao như đi ngược chiều, dừng lại lâu, ra vào thường xuyên, cung cấp tín hiệu thời gian liên tục cho an ninh thượng nguồn, phân tích lưu lượng giao thông và giám sát quy trình công nghiệp.

### 5.2.3 Phát hiện Sự kiện và Bất thường: Từ "mẫu bình thường" tìm ra "điều không ổn"

Trong hầu hết các tình huống nghiệp vụ, điều thực sự cần tập trung chú ý thường là "một số ít bất thường" và "sự kiện quan trọng": ví dụ như đánh nhau, ngã, tụ tập trong an ninh; dừng máy bất thường hoặc thao tác vi phạm trong sản xuất công nghiệp; hành vi lái xe nguy hiểm trong giao thông, v.v. Những sự kiện loại này tương đối hiếm gặp, chi phí dán nhãn cao và mẫu cực kỳ mất cân bằng, đặt ra thách thức bổ sung cho việc xây dựng mô hình.

Cách làm phổ biến là xây dựng một mô-đun phát hiện bất thường theo thời gian trên cơ sở nhận diện hành động, theo dõi đối tượng và phân đoạn cảnh: hoặc là thông qua phương pháp có giám sát để học trực tiếp một lượng nhỏ mẫu bất thường đã được dán nhãn; hoặc áp dụng phương pháp không giám sát / giám sát yếu, mô hình hóa phân phối chuyển động và hành vi của "mẫu bình thường", một khi quan sát mới lệch đáng kể khỏi phân phối lịch sử thì sẽ phát cảnh báo. Ở cấp độ mô hình, sẽ kết hợp autoencoder theo thời gian, học tương phản, mạng nơ-ron đồ thị hoặc Transformer theo thời gian, mã hóa thống nhất quan hệ không gian và phụ thuộc thời gian, từ đó nắm bắt các mẫu hành vi nhóm phức tạp hơn và phụ thuộc tầm xa.## 5.3 Tác vụ đa phương thức Video + Ngôn ngữ (Video‑Language)

Nếu như hiểu video giải quyết vấn đề "hiểu rõ bản thân video", thì **tác vụ đa phương thức video + ngôn ngữ** tập trung vào "cách sử dụng ngôn ngữ tự nhiên để mô tả, hỏi đáp, truy xuất nội dung video", cũng như "cách định vị nhanh thông tin quan trọng trên dòng thời gian của video dài dựa trên nhu cầu văn bản". Loại tác vụ này yêu cầu xử lý đồng thời tín hiệu thị giác, giọng nói và văn bản: một mặt trích xuất đặc trưng hình ảnh và âm thanh trong video, mặt khác kết nối với khả năng suy luận và sinh của mô hình ngôn ngữ, nén nội dung không-thời gian thành các bản tóm tắt văn bản, kết quả hỏi đáp và chỉ mục ngữ nghĩa phù hợp cho con người tiêu thụ và máy gọi.

Từ góc độ sản phẩm, lớp năng lực này đã đi sâu vào các kịch bản như tự động tạo phụ đề và dòng thời gian cho video dài, "đánh dấu thông minh / trích xuất phân đoạn quan trọng" trên nền tảng chỉnh sửa video ngắn, trợ lý hỏi đáp cho video đào tạo doanh nghiệp và hội nghị: người dùng không còn phải "xem từ đầu đến cuối", mà có thể trực tiếp truy xuất, đặt câu hỏi và tổ chức lại nội dung video thông qua ngôn ngữ tự nhiên. Dưới đây vẫn triển khai từ ba góc độ: **kịch bản**, **nguyên lý** và **mô hình**.

- **Kịch bản**
  - Tạo phụ đề và tóm tắt: tự động tạo phụ đề đa ngôn ngữ cho nội dung khóa học, bài giảng, hội nghị và video dài, trên cơ sở đó tạo tóm tắt cấp chương, danh sách điểm nổi bật và dòng thời gian.
  - Hỏi đáp video và truy cập tri thức: xây dựng "trợ lý hỏi đáp video" cho video giảng dạy, trình diễn thao tác, nội dung đào tạo doanh nghiệp, hỗ trợ người dùng đặt câu hỏi bằng ngôn ngữ tự nhiên, như "bước này làm thế nào", "cuối cùng người này để điện thoại ở đâu".
  - Truy xuất nội dung video và định vị phân đoạn: hỗ trợ truy xuất chính xác "văn bản → phân đoạn video" trong thư viện video quy mô lớn, ví dụ "tìm phần đề cập đến giá", "tìm phân đoạn giải thích công thức nào đó"; trong một video dài duy nhất, tự động đánh dấu và chú thích phân đoạn nổi bật và thông tin quan trọng.
  - Hỗ trợ sản xuất và biên tập nội dung: kết hợp hiểu nội dung video và chức năng sinh ngôn ngữ, tự động tạo tiêu đề, văn bản quảng cáo, kịch bản phân cảnh, hỗ trợ người sáng tạo chỉnh sửa nhanh và tổ chức lại tư liệu.
- **Nguyên lý**
  Cốt lõi của hệ thống đa phương thức video-ngôn ngữ là căn chỉnh đặc trưng thị giác theo chuỗi thời gian với biểu diễn văn bản trong không gian nhúng thống nhất, và trên cơ sở đó thực hiện truy xuất, sinh và suy luận:
  - Trích xuất và căn chỉnh đặc trưng đa phương thức: trích xuất đặc trưng không-thời gian từ khung hình/phân đoạn video (CNN/ViT/Video Transformer), trích xuất nhúng ngôn ngữ từ văn bản (LLM huấn luyện trước hoặc bộ mã hóa văn bản), căn chỉnh hai phương thức thông qua học tương phản hoặc huấn luyện trước đa phương thức.
  - Đường ống giọng nói và văn bản: đối với nội dung chứa giọng nói, thường trước tiên dùng ASR để tạo văn bản phiên âm có căn chỉnh dấu thời gian, sau đó mô hình hóa chung với đặc trưng thị giác, vừa có thể dùng văn bản trực tiếp điều khiển truy xuất, vừa có thể thực hiện đối chiếu và sửa lỗi liên phương thức.
  - Mô hình hóa thời gian và định vị phân đoạn: đối với video dài, cần học biểu diễn "cấp phân đoạn" trên dòng thời gian, thông qua attention hoặc RAG theo chuỗi thời gian để chuyển đổi động giữa phân đoạn cục bộ và ngữ cảnh toàn cục, đạt được định vị chính xác khoảng thời gian liên quan đến câu hỏi.
  - Sinh và suy luận: trên biểu diễn đa phương thức đã căn chỉnh, kết nối với mô hình ngôn ngữ lớn để thực hiện sinh ngôn ngữ tự nhiên (phụ đề, tóm tắt, giải thích), hoặc thực hiện hỏi đáp nhiều vòng và suy luận logic.
- **Mô hình**
  Về hình thái mô hình, tác vụ đa phương thức video-ngôn ngữ đã trải qua sự tiến hóa từ "bộ mã hóa chuyên dụng + đầu đơn giản" đến "mô hình lớn đa phương thức thống nhất":
  - Mô hình video-ngôn ngữ ban đầu: như VideoBERT, trong giai đoạn huấn luyện trước mô hình hóa chung token thị giác và văn bản, thu được biểu diễn video-ngôn ngữ có thể chuyển giao thông qua dự đoán mặt nạ và học tương phản.
  - Mô hình Video-Ngôn ngữ Tất-cả-trong-một (All‑in‑One): đưa video, văn bản (và giọng nói) vào một Transformer đa phương thức thống nhất, thông qua tham số dùng chung hoặc dùng chung một phần, thực hiện xử lý thống nhất nhiều tác vụ như sinh mô tả, truy xuất, QA.
  - Mô hình đa phương thức video dài: như Gemini, Claude, GPT có khả năng xử lý video, thông qua ngữ cảnh dài và mô hình hóa thời gian phân cấp, thực hiện hiểu tổng thể video kéo dài hàng chục phút đến hàng giờ, hỗ trợ tóm tắt và hỏi đáp cấp dòng thời gian.
  - RAG theo chuỗi thời gian + VLM: xây dựng "chỉ mục vector theo chuỗi thời gian" trên video, trước tiên dùng VLM mã hóa phân đoạn video để xây dựng cơ sở dữ liệu, sau đó truy xuất phân đoạn liên quan khi truy vấn, kết hợp LLM để tổng hợp câu trả lời và suy luận có thể giải thích.

Nhìn tổng thể, lớp này nâng video từ "máy hiểu" lên tầm "đối thoại và cộng tác giữa người và máy": người dùng có thể đặt câu hỏi cho video như hỏi người thật, hệ thống sẽ hoàn thành việc căn chỉnh và suy luận phức tạp về thị giác, giọng nói và ngôn ngữ ở phía sau.

### 5.3.1 Phụ đề, tóm tắt và dòng thời gian: nén video dài thành văn bản có thể duyệt

Đối với khóa học, bài giảng, hội nghị và video nội dung dài, nhu cầu cấp thiết nhất thường là "nhanh chóng biết đã nói gì, đâu là trọng điểm", chứ không phải xem toàn bộ từ đầu đến cuối. Hệ thống phụ đề và tóm tắt tự động thông qua tổ hợp "ASR + xử lý văn bản + hỗ trợ thị giác", chuyển đổi nội dung âm thanh thành văn bản căn chỉnh dấu thời gian, sau đó tạo dàn ý có cấu trúc và tóm tắt tinh gọn trên cơ sở đó, thực hiện nén thông tin từ "video hàng giờ" thành "đọc trong vài phút".

Ở cấp độ triển khai, mô-đun ASR chịu trách nhiệm cung cấp phiên âm đa ngôn ngữ ổn định, chất lượng cao và căn chỉnh dòng thời gian; phía văn bản sử dụng mô hình ngôn ngữ lớn để sửa lỗi, phân câu và tái cấu trúc ngữ nghĩa cho phiên âm thô, trích xuất tiêu đề chương, thông tin quan trọng và cặp câu hỏi-trả lời. Trong một số kịch bản, còn kết hợp tín hiệu thị giác (như thay đổi trang PPT, chuyển cảnh) để hỗ trợ phân chia ranh giới chương và phân đoạn trọng điểm, đảm bảo cấu trúc tóm tắt nhất quán hơn với nhịp điệu nội dung thực tế.

### 5.3.2 Hỏi đáp video và truy xuất ngữ nghĩa: "điều khiển" video bằng ngôn ngữ tự nhiên

Trên nền tảng phụ đề và tóm tắt, nhu cầu cao hơn là có thể hỏi đáp và truy xuất đối với nội dung video cụ thể: ví dụ "cuối cùng người này để điện thoại ở đâu", "đoạn nào nói về chiến lược giá", "phút thứ mấy trình diễn bước này". Loại tác vụ này yêu cầu định vị ngữ nghĩa câu hỏi trên dòng thời gian: vừa phải hiểu nhân vật, đồ vật và hành động liên quan đến câu hỏi, vừa phải tìm phân đoạn tương ứng trong biểu diễn thời gian của video.

Về cách làm cụ thể, thường trước tiên xây dựng chỉ mục đa độ hạt cho video ngoại tuyến: trích xuất biểu diễn đa phương thức (hình ảnh + văn bản/giọng nói) cho các phân đoạn có độ dài cố định, xây dựng chỉ mục vector hoặc cấu trúc đồ thị. Khi tương tác trực tuyến, mã hóa câu hỏi người dùng thành vector văn bản, khớp với biểu diễn phân đoạn trong chỉ mục, tìm ra khoảng thời gian liên quan nhất; sau đó, đưa nội dung của các phân đoạn này (mô tả ảnh chụp khung hình chính, văn bản phiên âm, v.v.) cùng với câu hỏi vào LLM, để mô hình sinh câu trả lời ngôn ngữ tự nhiên hoặc trả về điểm thời gian tương ứng. Đối với thư viện video quy mô lớn, có thể hỗ trợ "truy xuất liên video" theo cùng cơ chế, ví dụ tìm kiếm phân đoạn liên quan xuyên suốt trong cơ sở tri thức đào tạo doanh nghiệp hoặc video sản phẩm thương mại điện tử.

### 5.3.3 Hỗ trợ biên tập đa phương thức: từ hiểu đến "giúp bạn cắt tốt"

Khi hệ thống có thể hiểu ổn định nội dung và cấu trúc ngữ nghĩa trong video, bước tiếp theo tự nhiên là sử dụng ngược lại các kết quả hiểu này để hỗ trợ sáng tạo và biên tập. Mô hình đa phương thức video-ngôn ngữ có thể dựa trên kịch bản hoặc prompt mà người sáng tạo cung cấp, tự động chọn phân đoạn phù hợp ngữ nghĩa trong tư liệu hiện có, tạo dòng thời gian cắt thô; cũng có thể dựa trên nội dung video tự động tạo tiêu đề, văn bản bìa, nhãn chương, thậm chí đưa ra gợi ý về nhịp điệu cảnh quay và nhạc nền.

Trong quy trình làm việc, loại năng lực này thường xuất hiện dưới dạng "gợi ý thông minh" và "cắt thô tự động": sau khi người sáng tạo tải lên tư liệu, hệ thống tự động hoàn thành phân tích, phân cảnh, đánh dấu, và đưa ra một số phiên bản ứng viên (như các phương án chỉnh sửa với nhịp điệu và độ dài khác nhau); người sáng tạo có thể tinh chỉnh trên cơ sở này, mà không cần phải sàng lọc từng khung hình từ đầu. Đối với ứng dụng cấp doanh nghiệp, hệ thống còn có thể kết hợp cơ sở tri thức và quy chuẩn thương hiệu, đảm bảo văn bản, phụ đề và phong cách chỉnh sửa được tạo ra phù hợp với yêu cầu nghiệp vụ và tiêu chuẩn tuân thủ đã định.## 5.4 Tạo và Chỉnh sửa Video (Video Generation & Editing)

Sau khi đã có được năng lực hiểu và phân tích cấu trúc ổn định, **tạo và chỉnh sửa video** tiến tới giai đoạn "chủ động sáng tạo nội dung": không còn chỉ là nâng cao chất lượng hình ảnh hay phân tích cấu trúc, mà là dựa trên kịch bản văn bản, hình ảnh tham chiếu hoặc video có sẵn, tạo ra những cảnh quay hoàn toàn mới, hoặc thực hiện chỉnh sửa và tái tổ chức có cấu trúc đối với video gốc. Ở đây bao gồm cả việc tạo video từ văn bản (Text-to-Video) từ con số không, cũng như chuyển đổi phong cách, mở rộng và sắp xếp lại dựa trên hình ảnh/video có sẵn, cùng với chỉnh sửa và thay thế tinh vi ở cấp độ đối tượng.

Về mặt sản phẩm, tầng năng lực này đã đi vào dòng chảy sáng tạo nội dung chính thông qua hàng loạt sản phẩm như Jimeng Video, Minimax Video, Sora, Runway Gen-2, Pika, Kling: phim quảng cáo, phim ý tưởng, hoạt hình, phân cảnh kịch bản có thể được tạo ra nhanh chóng mà không cần phụ thuộc vào đội ngũ quay phim lớn và hậu kỳ phức tạp; người sáng tạo có thể điều khiển góc máy và phong cách thông qua kịch bản ngôn ngữ tự nhiên; quy trình biên tập video truyền thống bắt đầu được tích hợp sâu với các công cụ tạo sinh có cấu trúc. Dưới đây tiếp tục được tổ chức theo góc độ **kịch bản**, **nguyên lý** và **mô hình**.

- **Kịch bản**
  - Từ văn bản, kịch bản đến video ngắn: quảng cáo thương hiệu, kịch ngắn, đoạn phim tình tiết và hoạt hình ý tưởng, tự động hoặc bán tự động tạo bản nháp video có thể phát được theo kịch bản.
  - Từ hình ảnh / video đến video: tạo phiên bản động cho tranh minh họa hoặc thiết kế nhân vật, chuyển đổi phong cách cho cảnh quay thực tế (thực tế → anime / minh họa), hoặc mở rộng/tái tổ chức video có sẵn theo thời gian và không gian.
  - Chỉnh sửa có cấu trúc và hậu kỳ: trong điều kiện không thay đổi ngữ nghĩa tổng thể của nội dung, thực hiện các thao tác tinh vi như đổi mặt nhân vật, đồng bộ khẩu hình, xóa và thay thế đối tượng, sắp xếp lại clip theo hướng dẫn văn bản.
- **Nguyên lý**
  Các phương pháp tạo và chỉnh sửa video chính thống hiện nay phần lớn lấy mô hình khuếch tán (Diffusion) hoặc biến thể của nó làm cốt lõi, từng bước "khử nhiễu" trong không gian tiềm ẩn không-thời gian nhiều chiều để tạo ra video:
  - Mô hình hóa điều kiện văn bản: thông qua bộ mã hóa văn bản (như T5/CLIP text tower hoặc mô hình ngôn ngữ chuyên dụng) ánh xạ kịch bản thành vector điều kiện, hướng dẫn bộ giải mã video căn chỉnh với mô tả văn bản về phong cách, nội dung và mẫu chuyển động.
  - Nhất quán không-thời gian và kiểm soát chuyển động: thêm tích chập không-thời gian, attention theo thời gian hoặc biểu diễn 4D (NeRF/GS, v.v.) vào quá trình khuếch tán hoặc tối ưu hóa hậu nghiệm, đảm bảo tính liên tục và hợp lý vật lý của video trên trục thời gian.
  - Tạo sinh có điều kiện từ hình ảnh / video: khởi động quá trình khuếch tán trên không gian đặc trưng của hình ảnh hoặc video đầu vào, thông qua kiểm soát mức tiêm nhiễu, vùng mask và kênh điều kiện, thực hiện chỉnh sửa hoặc mở rộng có kiểm soát theo kiểu "giữ lại phần đã cho + tạo nội dung mới".
  - Tín hiệu kiểm soát có cấu trúc: kết hợp thông tin cấu trúc như khung xương tư thế, mask phân đoạn, bản đồ độ sâu, quỹ đạo camera, giúp video được tạo ra có thể kiểm soát tốt hơn về chuyển động của chủ thể và thay đổi góc nhìn.
- **Mô hình**
  Các mô hình và hướng tiêu biểu bao gồm:
  - Mô hình Text-to-Video dựa trên Diffusion (Sora, Runway Gen-2, Pika, Kling, v.v.), được huấn luyện trước trên dữ liệu video-văn bản quy mô lớn, có năng lực tạo sinh mạnh mẽ trong các cảnh phức tạp, chuyển động nhiều góc máy và phong cách đa dạng.
  - Mô hình khuếch tán Image-to-Video: lấy một khung hình đơn làm điều kiện, dự đoán diễn biến động của các khung hình tiếp theo, thực hiện "một hình ảnh → hoạt hình / hiệu ứng động"; hoặc thực hiện các thao tác như nối dài, mở rộng, xoay góc nhìn cho video ngắn.
  - Phương pháp NeRF / biểu diễn 4D và keyframe + nội suy: sử dụng biểu diễn cảnh 3D hoặc keyframe + nội suy theo thời gian, kết hợp tạo sinh với mô hình hóa hình học và nhất quán, thực hiện di chuyển góc nhìn ổn định hơn và chuyển động phức tạp.

Những năng lực này không tồn tại độc lập, mà dần dần thâm nhập vào quy trình biên tập và hậu kỳ: từ văn bản đến phân cảnh, từ phân cảnh đến cắt thô, từ cắt thô đến phong cách hóa và chỉnh sửa cục bộ, ngày càng nhiều khâu được thúc đẩy bởi "văn bản + kiểm soát có cấu trúc".

### 5.4.1 Text-to-Video: từ kịch bản đến chuỗi cảnh quay "có thể xem được"

Text-to-Video hướng tới mục tiêu: người dùng mô tả một cảnh, góc máy hoặc đoạn câu chuyện bằng ngôn ngữ tự nhiên, hệ thống tự động tạo ra một đoạn video liền mạch. So với tạo hình ảnh, Text-to-Video thêm vào thách thức của chiều thời gian: không chỉ phải duy trì chất lượng hình ảnh và nhất quán phong cách ở từng khung hình đơn lẻ, mà còn phải đảm bảo tính liên tục xuyên suốt các khung hình về danh tính chủ thể, ánh sáng, hậu cảnh và quỹ đạo chuyển động.

Mô hình Text-to-Video khuếch tán điển hình trước tiên được huấn luyện trước trên dữ liệu cặp video-văn bản quy mô lớn: bộ mã hóa văn bản trích xuất điều kiện ngữ nghĩa, bộ giải mã video liên tục khử nhiễu một "video nhiễu" trong không gian tiềm ẩn, dần hội tụ về tín hiệu không-thời gian nhất quán với văn bản. Trong quá trình này, thông qua các cấu trúc như attention theo thời gian, tích chập 3D hoặc biểu diễn 4D, sự phụ thuộc thời gian được mô hình hóa tường minh vào mạng, để tránh các vấn đề như "nhảy khung hình", "nhân vật bị đặt lại". Một số hệ thống còn hỗ trợ kiểm soát chuyển động camera (đẩy, kéo, lia, nghiêng) và nhịp điệu bố cục, giúp kết quả tạo sinh gần gũi hơn với ngôn ngữ quay phim thực tế.

### 5.4.2 Từ hình ảnh / video đến video: "phát triển" và "biến hình" trên nội dung có sẵn

Một hướng quan trọng khác là tạo sinh và chỉnh sửa dựa trên hình ảnh hoặc video có sẵn: ví dụ, làm cho một bức tranh minh họa hoặc bản vẽ ý tưởng "chuyển động", phong cách hóa video người thật thành anime, hoặc thay đổi hậu cảnh, điều chỉnh thời tiết và thời gian trong khi vẫn giữ nguyên cấu trúc. Về mặt kỹ thuật, các phương pháp loại này thường thêm "kênh tham chiếu" vào quá trình khuếch tán: mã hóa hình ảnh hoặc video đầu vào thành đặc trưng, tham gia vào quá trình khử nhiễu dưới dạng điều kiện hoặc trạng thái khởi tạo, đồng thời kiểm soát "khu vực nào có thể bị thay đổi, khu vực nào phải được giữ nguyên" thông qua các cơ chế như mask, ràng buộc hình học tường minh.

Đối với kịch bản chuyển đổi phong cách, mô hình sẽ vẽ lại kết cấu và ánh sáng trong khi vẫn giữ nguyên chuyển động và bố cục gốc, để khớp với phong cách mục tiêu; đối với mở rộng và tái tổ chức video, bằng cách "nối tiếp" các khung hình mới ở hai đầu hoặc giữa dòng thời gian, thực hiện mở rộng cảnh theo chiều ngang/dọc, di chuyển góc nhìn hoặc bổ sung tình tiết. Loại năng lực này rất phù hợp để kết hợp với quy trình biên tập truyền thống: biên tập viên đưa ra các cảnh quay chính và nhịp điệu trước, mô hình sau đó tự động tạo ra các chuyển tiếp và biến thể giữa những "điểm neo" đó.

### 5.4.3 Chỉnh sửa video có cấu trúc: kiểm soát tinh vi ở cấp độ đối tượng

Trong nhiều kịch bản nghiệp vụ, việc tạo lại toàn bộ video không phải là nhu cầu cứng, điều quan trọng hơn là thực hiện chỉnh sửa có cấu trúc tinh vi và có thể kiểm soát đối với hình ảnh hiện có: ví dụ như đổi mặt, sửa khẩu hình, xóa vật thể không mong muốn, thay thế nội dung vị trí quảng cáo, hoặc sắp xếp lại thứ tự cảnh quay theo kịch bản văn bản. Chỉnh sửa video có cấu trúc phát triển chính theo hướng này: trên nền tảng hiểu video, đưa vào phân đoạn cấp độ đối tượng, theo dõi và biểu diễn tham số hóa, giúp thao tác chỉnh sửa có thể gắn kết ổn định vào mục tiêu và khoảng thời gian cụ thể.

Đổi mặt nhân vật và đồng bộ khẩu hình (Lip-sync) là những ứng dụng điển hình nhất trong hướng này: mô hình cần ánh xạ danh tính của nhân vật mục tiêu lên màn trình diễn của video gốc, trong điều kiện đảm bảo tư thế đầu và biểu cảm tổng thể tự nhiên liền mạch, đồng thời kiểm soát chính xác chuyển động khẩu hình theo tín hiệu giọng nói mới. Xóa / thay thế đối tượng phụ thuộc vào phân đoạn chất lượng cao và hoàn thiện không-thời gian: trước tiên phân đoạn và loại bỏ đối tượng mục tiêu trong từng khung hình, sau đó sử dụng các khung hình lân cận và kết cấu ngữ cảnh để lấp đầy khoảng trống, tránh xuất hiện dấu vết "vá" rõ ràng. Chỉnh sửa theo hướng dẫn văn bản thì thông qua việc căn chỉnh "cấu trúc kịch bản" với trục thời gian video, tự động chọn và ghép nối các đoạn phù hợp với ngữ nghĩa kịch bản, thực hiện chỉnh sửa tự động ở cấp độ cao hơn.## 5.5 Con người số / Avatar ảo（Digital Human / Avatar）

**Con người số / Avatar ảo（Digital Human / Avatar）** có thể được xem là sự "tích hợp cấp hệ thống" của tạo video, tổng hợp giọng nói, hiểu đa phương thức và kết xuất đồ họa: nó không chỉ tạo ra một đoạn video, mà còn dựa trên đầu vào văn bản hoặc giọng nói, điều khiển liên tục và có kiểm soát một hình đại diện ảo "mở miệng giao tiếp, biểu cảm, cử động", và trong ngày càng nhiều tình huống đạt được tương tác gần thời gian thực thậm chí thời gian thực. So với tạo video thông thường, con người số nhấn mạnh ba điểm: **tính nhất quán lâu dài của danh tính và hình ảnh, sự căn chỉnh tinh tế giữa giọng nói – biểu cảm – hành động, và tính ổn định cùng khả năng thời gian thực của hệ thống đầu cuối**.

Từ góc nhìn sản phẩm, con người số đã xuất hiện rộng rãi trong các tình huống như **nền tảng sản xuất nội dung, chăm sóc khách hàng ảo / lễ tân thông minh / hướng dẫn ảo, giáo dục đào tạo và lớp học trực tuyến, IP ảo thương hiệu / thần tượng ảo, công cụ streamer ảo / bản sao số cho nhà sáng tạo**: doanh nghiệp có thể sản xuất hàng loạt nội dung video với hình ảnh và phong cách cố định, dịch vụ chính phủ và doanh nghiệp có thể dùng lễ tân ảo phục vụ người dùng 24/7, nhà sáng tạo cá nhân có thể hoàn toàn không lộ mặt nhưng vẫn liên tục sản xuất video "có người xuất hiện". Dưới đây vẫn được tổ chức từ ba chiều **tình huống**, **nguyên lý** và **mô hình**, và trong các phần tiếp theo sẽ triển khai ba hướng: điều khiển và biểu đạt, hình ảnh và tạo video, tương tác thời gian thực và tích hợp hệ thống.

- **Tình huống**
  - Sản xuất nội dung và truyền thông trực tuyến: video quảng bá doanh nghiệp, giải thích tính năng sản phẩm, ghi hình khóa học, phát thanh tin tức, sử dụng con người số thay thế người thật lên hình, giảm đáng kể chi phí địa điểm quay, thiết bị ánh sáng và nhân lực.
  - Chăm sóc khách hàng ảo và hướng dẫn: tại chi nhánh ngân hàng, sảnh hành chính, khu danh lam thắng cảnh, bảo tàng, v.v., sử dụng con người số đảm nhận đón tiếp, hỏi đáp, tư vấn nghiệp vụ và chỉ dẫn đường đi, vừa đảm bảo hình ảnh thống nhất vừa phục vụ 24/7.
  - IP ảo thương hiệu / thần tượng ảo: vận hành dài hạn video ngắn, livestream, nội dung thương mại điện tử xoay quanh một hình ảnh ảo, duy trì nhân cách và phong cách hình ảnh thống nhất trên các nền tảng khác nhau.
  - Streamer ảo và bản sao số: cung cấp streamer ảo / bản sao số có thể cấu hình cho nhà sáng tạo không muốn lộ mặt hoặc cần vận hành nhiều danh tính, liên kết với giọng nói thật hoặc giọng nói tổng hợp, thực hiện "chỉ cần giao tiếp / gõ chữ, là có thể ổn định lên hình".
- **Nguyên lý**
  Hệ thống con người số về bản chất là một pipeline đa phương thức "điều khiển bằng giọng nói / văn bản + mô hình hóa hình ảnh + đầu ra video / kết xuất", có khác biệt nhỏ giữa tình huống ngoại tuyến và thời gian thực, nhưng các thành phần cốt lõi tương tự:
  - Điều khiển giọng nói và ngôn ngữ: dựa trên kịch bản, trực tiếp dùng TTS tổng hợp giọng nói, hoặc kết nối ASR + LLM, từ giọng nói / văn bản người dùng sinh văn bản trả lời, rồi dùng TTS xuất giọng nói; đặc trưng giọng nói (như phổ mel) làm tín hiệu điều khiển, kiểm soát đường thời gian khẩu hình và biểu cảm.
  - Mô hình hóa không gian hình ảnh và hành động: xây dựng biểu diễn hình học và ngoại hình có thể điều khiển cho hình đại diện ảo, ví dụ chân dung / minh họa 2D, Avatar 3D dựa trên xương và Blendshape, hoặc biểu diễn thể tích có thể kết xuất dựa trên NeRF / 4D Gaussian; và định nghĩa một tập "tham số điều khiển" (như điểm then chốt, khung xương tư thế, hệ số Blendshape), dùng để mã hóa biểu cảm và tư thế.
  - Ánh xạ giọng nói → biểu cảm / hành động: thông qua mô hình "điều khiển bằng giọng nói" chuyên dụng, ánh xạ đặc trưng giọng nói thành tham số điều khiển khuôn mặt và nửa thân trên, thực hiện đồng bộ khẩu hình（Lip‑sync）, chi tiết biểu cảm và chuyển động đầu vai; con người số thời gian thực yêu cầu ánh xạ này có độ trễ thấp đầu cuối và ổn định.
  - Kết xuất và tổng hợp: dựa trên tham số điều khiển khung hình hiện tại, kết xuất hình ảnh hoặc 3D cho hình đại diện ảo, đầu ra luồng video liên tục hoặc hình ảnh thời gian thực; có thể xếp chồng các yếu tố như nền, đạo cụ, phụ đề, kết hợp với quy trình biên tập video truyền thống.
- **Mô hình**
  Về mô hình cụ thể, hệ thống con người số thường sử dụng tổng hợp nhiều loại mô hình chuyên dụng và mô hình đa phương thức tổng quát:
  - Mô hình Talking Head điều khiển bằng âm thanh: như các mô hình đồng bộ khẩu hình kiểu Wav2Lip, thông qua học mối quan hệ căn chỉnh giữa giọng nói và pixel / hình học vùng miệng, tạo ra chuyển động miệng tự nhiên trong điều kiện đảm bảo tính nhất quán danh tính.
  - Mô hình con người số thời gian thực / nhẹ: như Ultralight‑Digital‑Human, mô hình Talking Head nhẹ, v.v., nén đáng kể tham số và khối lượng tính toán về mặt cấu trúc, giúp có thể thực hiện điều khiển và kết xuất gần thời gian thực ngay cả trên CPU / thiết bị di động / WebGPU.
  - Mô hình biểu diễn NeRF / 4D: như ER‑NeRF（giải pháp NeRF con người số theo hướng Explicit / Efficient / Editable）, v.v., thông qua mô hình hóa hình ảnh nhân vật và thay đổi biểu cảm trong không gian 3D, làm cho góc nhìn, ánh sáng và chuyển động tự nhiên liền mạch hơn, phù hợp với tình huống độ trung thực cao và nhiều góc máy.
  - Mô hình điều khiển giọng nói và căn chỉnh đa phương thức: như các mô hình "giọng nói → biểu cảm khuôn mặt / đầu nói" kiểu MuseTalk, căn chỉnh đặc trưng âm thanh và đặc trưng hình ảnh, thực hiện biểu cảm nói và chuyển động đầu chân thực mà không phụ thuộc vào lượng lớn chú thích 3D.
  - Mô hình giọng nói và đối thoại: TTS đa người nói có độ tự nhiên cao, mô hình đối thoại giọng nói đầu cuối（tích hợp ASR + LLM + TTS）, cung cấp khả năng giọng nói và đối thoại đa phong cách, đa ngôn ngữ cho con người số.

Tổng quan, con người số vừa là một tập hợp mô hình, vừa là một hệ thống hoàn chỉnh: nó tích hợp hiểu ngôn ngữ, giọng nói, tạo hình ảnh và suy luận thời gian thực, từ đó hiện diện "trước màn hình" như một nhân vật ảo có thể tương tác. Dưới đây, chúng tôi triển khai từ ba hướng: **điều khiển và biểu đạt**, **hình ảnh và tạo video** và **tương tác thời gian thực và tích hợp hệ thống**.

### 5.5.1 Điều khiển và biểu đạt: từ kịch bản / giọng nói đến "người biết nói, biết biểu cảm"

Trong pipeline con người số, **điều khiển và biểu đạt** chịu trách nhiệm trả lời một câu hỏi cốt lõi: với kịch bản hoặc giọng nói cho trước, hình đại diện ảo ở mỗi khung hình nên hiển thị khẩu hình, biểu cảm và chuyển động đầu vai như thế nào. Ở đây vừa bao gồm tình huống sản xuất hàng loạt ngoại tuyến, vừa bao gồm phản hồi cho đối thoại thời gian thực.

Trong sản xuất nội dung ngoại tuyến, chuỗi liên kết phổ biến là "kịch bản văn bản → TTS → điều khiển giọng nói": phía nghiệp vụ cung cấp văn bản phát thanh, mô-đun TTS tạo giọng nói với âm sắc mục tiêu（như người phát ngôn ảo của thương hiệu）, rồi đưa đặc trưng giọng nói vào mô hình "giọng nói → hành động". **Mô hình dạng Wav2Lip** chính là đại diện quan trọng của khâu này:

- Nó lấy khung hình chân dung tham chiếu và đoạn giọng nói tương ứng làm đầu vào, thông qua một mạng tích chập / chú ý dự đoán vùng miệng căn chỉnh tinh tế với giọng nói, rồi hợp nhất với chân dung gốc, từ đó chỉnh sửa chính xác khẩu hình trong khi vẫn giữ nguyên danh tính và phần lớn biểu cảm.
- Khi huấn luyện, thông qua dữ liệu căn chỉnh giọng nói – video giám sát mạng học được hình thái khoang miệng tương ứng với từng âm vị, và duy trì tính liên tục về mặt thời gian, tránh hiện tượng khẩu hình nhảy hoặc cảm giác trễ.

So với các giải pháp đồng bộ khẩu hình thuần túy thế hệ trước, các mô hình điều khiển giọng nói thế hệ mới（như các phương pháp kiểu MuseTalk）đã mở rộng thêm đến **biểu cảm toàn khuôn mặt và tư thế đầu**:

- Loại mô hình này thường ánh xạ đặc trưng giọng nói vào một "không gian tiềm ẩn cảm xúc / biểu đạt" thấp chiều, rồi thông qua bộ giải mã tạo ra điểm then chốt, hệ số Blendshape hoặc trực tiếp tạo đặc trưng hình ảnh, thúc đẩy các thay đổi tinh tế ở vùng lông mày, mắt, má, v.v., làm cho "biểu cảm nói" sinh động hơn.
- Một số mô hình còn mã hóa thông tin ngữ nghĩa của nội dung giọng nói（như nghi vấn, nhấn mạnh, cảm thán）, kết hợp với tín hiệu cú pháp / ngữ dụng do LLM phân tích, thêm các hành động như gật đầu, nhíu mày, cử chỉ tay tại những chỗ thay đổi ngữ điệu, nâng cao tính tự nhiên và sức truyền cảm của biểu đạt.

Ở chiều cao hơn, **điều khiển và biểu đạt** cũng có thể kết hợp các tín hiệu điều khiển bên ngoài: ví dụ lấy khung xương tư thế, quỹ đạo cử chỉ tay, hướng ánh nhìn, v.v. làm đầu vào bổ sung, giúp con người số có thể bắt chước phong cách của diễn giả cụ thể, hoặc thực thi các mẫu hành động định sẵn dựa trên "hành động chỉ định" trong kịch bản（như "chỉ vào màn hình", "hai tay mở rộng"）. Dù là điều khiển khẩu hình cục bộ như Wav2Lip, hay mô hình biểu đạt toàn thân hơn như MuseTalk / điều khiển khung xương thời gian thực, chúng cùng nhau thực hiện ánh xạ liên tục từ giọng nói / văn bản đến chuyển động khuôn mặt và nửa thân trên, là mắt xích then chốt để con người số "trông như đang nghiêm túc giao tiếp".

### 5.5.2 Hình ảnh và tạo video: từ "một mô hình" đến "một nhân vật có thể định hình"

Chuỗi liên kết điều khiển giải quyết "chuyển động như thế nào", còn **hình ảnh và tạo video** thì quyết định "ai đang chuyển động, ở đâu, với phong cách gì". Ở đây vừa bao gồm con người số chân thực độ trung thực cao, vừa bao gồm hình đại diện phong cách hóa như anime, hoạt hình và low-poly Avatar, cũng như các lựa chọn công nghệ khác nhau hướng đến kết xuất thời gian thực và ngoại tuyến.

Trong tình huống chân dung 2D và minh họa, cách tiếp cận điển hình là huấn luyện một **mô hình tạo Talking Head** dựa trên một lượng nhỏ ảnh tham chiếu và video ngắn:

- Mô hình mã hóa thông tin danh tính của nhân vật thành một "vector ngoại hình" hoặc đặc trưng phong cách, lấy tham số điều khiển（như vector tiềm ẩn giọng nói, điểm then chốt, mã hóa biểu cảm）làm đầu vào điều kiện, tổng hợp khung hình mới trong không gian hình ảnh.
- Khác với Wav2Lip thuần túy chỉ sửa khẩu hình, loại mô hình này có thể tạo ra dao động nhỏ về tư thế, chồng thêm thay đổi cảm xúc lên biểu cảm, từ đó làm cho con người số trông không quá "cứng nhắc".

Trong các tình huống theo đuổi cảm giác chân thực cao hơn, góc nhìn tự do hơn và chuyển đổi nhiều góc máy, ngày càng nhiều giải pháp áp dụng mô hình hóa con người số dựa trên **NeRF / biểu diễn 4D**（như các phương pháp kiểu ER‑NeRF）:

- Thông qua chụp nhiều góc nhìn hoặc video, trước tiên tái tạo thể tích 3D hoặc trường Gaussian của đầu / nửa thân trên nhân vật, mã hóa các trạng thái tương ứng với biểu cảm và khẩu hình khác nhau thành không gian tiềm ẩn có thể nội suy;
- Khi điều khiển, ánh xạ tham số giọng nói / biểu cảm vào không gian tiềm ẩn này, thực hiện kết xuất thể tích hoặc kết xuất Gaussian trong 3D, rồi chiếu lên màn hình.
- Ưu điểm của cách tiếp cận này là: góc nhìn, ánh sáng và nền tự nhiên hơn, có thể hỗ trợ chuyển động "góc nhìn bao quanh", "máy quay ảo", đặc biệt thân thiện với VR/AR, phòng livestream ảo và sản xuất quảng cáo cao cấp.

Trong các nghiệp vụ nhấn mạnh triển khai đa nền tảng và tính thời gian thực, còn áp dụng các giải pháp nhẹ kiểu **Ultralight‑Digital‑Human**:

- Thông qua cắt tỉa cấu trúc, tái cấu trúc toán tử và chưng cất mô hình, nén mạng kết xuất Talking Head hoặc Avatar đến quy mô có thể chạy trên thiết bị di động / WebGPU;
- Hoàn thành việc tạo một khung hình từ tham số điều khiển trong vài mili giây, căn chỉnh với luồng giọng nói thời gian thực hoặc tín hiệu điều khiển, thực hiện "con người số độ trễ thấp", phù hợp với thiết bị đầu cuối tương tác, máy tự phục vụ và ứng dụng Web frontend.

Ở cấp độ sản xuất video hoàn chỉnh, hình ảnh và tạo video còn phải kết hợp với nền, đạo cụ và ngôn ngữ máy quay: một quy trình làm việc phổ biến là:

- Trước tiên tùy chỉnh một hình ảnh con người số cho thương hiệu hoặc cá nhân（2D hoặc 3D）;
- Thiết lập sẵn một số tình huống ảo（phòng thu, văn phòng, lớp học, phòng triển lãm, v.v.）;
- Khi sản xuất nội dung, hệ thống tự động chọn tình huống và góc máy phù hợp dựa trên kịch bản, tạo hình ảnh con người số, và biên tập đa màn hình cùng với PPT, video trình diễn, hình ảnh sản phẩm.
  Điều này khiến con người số không chỉ là một "cái đầu biết nói", mà là một "nhân vật" có thể hòa nhập tự nhiên vào các chương trình và hình thái nội dung đa dạng.

### 5.5.3 Con người số thời gian thực và tích hợp hệ thống: từ video ngoại tuyến đến "đồng nghiệp trong màn hình"

Cùng với sự trưởng thành của ASR, TTS, LLM và mô hình tạo video nhẹ, ngày càng nhiều hệ thống con người số bắt đầu chuyển từ **sản xuất video hàng loạt ngoại tuyến** sang **tương tác thời gian thực**: người dùng mở miệng nói hoặc nhập văn bản tại thiết bị đầu cuối, con người số trên màn hình trong vòng vài trăm mili giây đến vài giây "nghe hiểu — suy nghĩ — phản hồi — mở miệng nói", hình thành trải nghiệm giống như nhân viên chăm sóc khách hàng / hướng dẫn / người dẫn chương trình thực sự. Điều then chốt ở đây không chỉ là bản thân mô hình, mà còn bao gồm cách **nén chuỗi liên kết đa phương thức đến độ trễ đầu cuối chấp nhận được**.

Trong một vòng lặp kín con người số thời gian thực điển hình:

- **Đầu vào frontend**: mô-đun ASR chuyển đổi giọng nói người dùng thành văn bản theo thời gian thực, hoặc trực tiếp nhận đầu vào văn bản của người dùng.
- **Hiểu ngữ nghĩa và quyết định**: LLM kết hợp cơ sở tri thức nghiệp vụ và công cụ（RAG, truy vấn cơ sở dữ liệu, điều phối quy trình）tạo văn bản trả lời, cùng các chỉ thị có cấu trúc cần thiết（như cần hiển thị trang PPT nào, phát đoạn video nào）.
- **Giọng nói và điều khiển**: TTS chuyển đổi văn bản trả lời thành giọng nói với âm sắc mục tiêu, luồng giọng nói vừa được tạo vừa được mô hình Wav2Lip / MuseTalk / điều khiển khung xương thời gian thực tiêu thụ, xuất ra từng đoạn tham số khẩu hình và biểu cảm tương ứng.
- **Đầu ra kết xuất**: mạng kết xuất nhẹ kiểu Ultralight‑Digital‑Human hoặc engine kết xuất NeRF / Avatar dựa trên GPU, chuyển đổi tham số điều khiển thành khung hình video theo thời gian thực, thông qua WebRTC, RTMP hoặc kết xuất cục bộ trực tiếp xuất ra màn hình.

Để cung cấp trải nghiệm nhất quán trên nhiều thiết bị đầu cuối, hệ thống còn cần cân nhắc tinh tế giữa **độ trễ, băng thông và sức mạnh tính toán**:

- Trong giải pháp kết xuất đám mây, phần lớn tính toán（LLM, TTS, điều khiển và kết xuất）hoàn thành tại máy chủ, thiết bị đầu cuối chỉ chịu trách nhiệm phát luồng video, phù hợp với Web / App có sức mạnh tính toán hạn chế và màn hình lớn ngoại tuyến, nhưng phụ thuộc vào độ ổn định mạng;
- Trong giải pháp "đám mây + thiết bị kết hợp", ASR và một phần suy luận LLM hoàn thành trên đám mây, điều khiển và kết xuất nhẹ thực hiện cục bộ, có thể giảm đáng kể độ trễ tương tác âm thanh – hình ảnh, phù hợp với thiết bị di động và thiết bị đầu cuối tự phục vụ;
- Trên thiết bị đầu cuối có sức mạnh tính toán cao（như PC hiệu năng cao, trạm làm việc chuyên dụng）, còn có thể đưa phần lớn chuỗi liên kết xuống cục bộ, thực hiện tương tác ổn định trong môi trường mạng yếu.

Về phía mô hình, **con người số thời gian thực** cũng đặt ra yêu cầu bổ sung cho thiết kế cấu trúc:

- Mô hình điều khiển giọng nói cần có khả năng suy luận luồng, có thể đưa ra dự đoán khẩu hình và biểu cảm sau khi nhận được một đoạn giọng nói ngắn, thay vì chờ hết cả câu;
- Mạng kết xuất cần giảm thiểu phụ thuộc vào kernel tích chập lớn và chú ý toàn cục, sử dụng các cấu trúc như tích chập cục bộ, tự chú ý nhẹ, kim tự tháp độ phân giải để kiểm soát khối lượng tính toán;
- Đối với các giải pháp độ trung thực cao dựa trên NeRF / 4D, cần thông qua các biện pháp như cache lưới, cắt tỉa hình nón nhìn, thể tích thưa và tối ưu GPU, để kiểm soát mỗi khung hình kết xuất trong vài mili giây đến vài chục mili giây.

Ở cấp độ tích hợp hệ thống, con người số thời gian thực thường còn phải liên kết chặt chẽ với **tri thức nghiệp vụ, thiết lập tính cách và chiến lược đối thoại**:

- Thông qua cơ sở tri thức và RAG quản lý tri thức ngành, quy trình nghiệp vụ và FAQ, đảm bảo "nói đúng, nói đầy đủ";
- Thông qua cấu hình nhân cách và mẫu lời thoại kiểm soát phong cách nói và ranh giới biểu đạt, đảm bảo "nói giống như con người này（hoặc thương hiệu này）";
- Thông qua chiến lược đối thoại đa vòng và quản lý trạng thái hội thoại, giúp con người số có thể ghi nhớ ngữ cảnh người dùng, xác nhận và truy vấn vào thời điểm thích hợp, thể hiện cảm giác tương tác "giống như một đồng nghiệp / hướng dẫn viên / giảng viên thực sự".

Tổng thể, sau khi bổ sung các mô hình được thiết kế chuyên biệt cho đồng bộ khẩu hình, điều khiển biểu cảm và kết xuất thời gian thực như Wav2Lip, MuseTalk, ER‑NeRF, Ultralight‑Digital‑Human, con người số đang tăng tốc tiến hóa từ "công cụ mẫu video ngoại tuyến" thành **thực thể ảo có thể phản hồi thời gian thực, có tính cách ổn định và tri thức chuyên môn**, trở thành một mắt xích có tính tổng hợp và sức căng ứng dụng cao nhất trong hệ thống công nghệ video.# 6. Chuỗi Thời Gian & Quyết Định Tuần Tự (Time Series & Sequential Decision)

Trong các phần về mô hình hóa thị giác và dữ liệu có cấu trúc trước đây, chúng ta chủ yếu suy nghĩ về vấn đề trong không gian "tĩnh": một bức ảnh, một bản ghi, một đoạn văn bản. Nhưng trong thực tế kinh doanh, phần lớn các chỉ số cốt lõi đều biến đổi theo thời gian: doanh số và lưu lượng truy cập dao động hàng ngày, tải máy chủ và chỉ số cảm biến thay đổi từng giây, giá cả tài chính và các chỉ báo vĩ mô liên tục điều chỉnh dưới tác động của chính sách và sự kiện. Trọng tâm của lớp **Chuỗi Thời Gian & Quyết Định Tuần Tự** chính là: dự báo tương lai, nhận diện bất thường, mô tả đứt gãy cấu trúc trên trục thời gian, và trên cơ sở đó đưa ra các quyết định cũng như điều khiển mang tính dự báo trước.

Từ góc nhìn sản phẩm, loại năng lực này xuyên suốt các khâu then chốt như vận hành, hoạch định, quản lý rủi ro và điều phối: mô-đun dự báo chỉ số được nhúng trong các hệ thống BI/báo cáo truyền thống, dự báo nhu cầu và đề xuất tồn kho an toàn trong các công cụ hoạch định tài chính và chuỗi cung ứng, phân tích tương quan vĩ mô và khai phá quan hệ nhân quả trong phần mềm nghiên cứu định lượng, dự báo lưu lượng và năng lực vận tải trên các nền tảng thương mại điện tử và gọi xe, phát hiện bất thường chỉ số và cảnh báo trong AIOps vận hành — tất cả đều là những hình thái triển khai điển hình của lớp này. Dưới đây, chúng ta sẽ triển khai theo bốn hướng: **Phương Pháp Thống Kê Cổ Điển**, **Mô Hình Hóa Chuỗi Thời Gian Bằng Học Sâu**, **Phát Hiện Bất Thường & Điểm Thay Đổi** và **Mô Hình Hóa Chuỗi Không Gian-Thời Gian**.## 6.1 Mô hình chuỗi thời gian cổ điển (Statistical TS Modeling)

Trong nhiều lĩnh vực kinh doanh, "thời gian" là trục chính tự nhiên: doanh số thay đổi theo ngày/tuần, lưu lượng trang web biến động theo chiến dịch, tải thiết bị dao động theo hành vi người dùng, số liệu cảm biến phản ánh những thay đổi tinh tế của trạng thái hệ thống. **Mô hình chuỗi thời gian thống kê cổ điển** tận dụng cấu trúc thời gian này, sử dụng các mô hình thống kê tương đối dễ diễn giải và phân tích để trả lời ba câu hỏi cốt lõi: **Tương lai sẽ ra sao? Các biến liên quan với nhau như thế nào? Trạng thái hiện tại của hệ thống là gì?** Mặc dù học sâu đã nổi bật trong nhiều lĩnh vực, các phương pháp truyền thống như ARIMA, phân tích đồng liên kết, bộ lọc Kalman vẫn phục vụ lâu dài trong tài chính, chuỗi cung ứng, vận hành, quản trị rủi ro và thường đóng vai trò là "đường cơ sở" và công cụ diễn giải cho các hệ thống phức tạp hơn.

Từ góc độ ứng dụng, các mô hình chuỗi thời gian cổ điển xuất hiện rộng rãi trong mô-đun dự báo chỉ số của các hệ thống BI/báo cáo truyền thống, công cụ lập kế hoạch tài chính và chuỗi cung ứng, cũng như các phần mềm nghiên cứu định lượng khác nhau. Chúng có thể trực tiếp đưa ra khoảng dự báo tương lai cho một hoặc nhiều chuỗi thời gian, hoặc phân tích mối quan hệ đồng biến và cân bằng dài hạn giữa các chỉ số vĩ mô, đồng thời ước lượng quỹ đạo và trạng thái ẩn thông qua mô hình không gian trạng thái. Dưới đây, chúng ta sẽ phân loại cách sử dụng điển hình của các phương pháp này theo ba chiều: **kịch bản**, **nguyên lý** và **mô hình**, sau đó lần lượt triển khai từng hướng cụ thể.

- **Kịch bản**
  - Dự báo chỉ số: Dự báo ngắn hạn hoặc trung hạn cho các giá trị thay đổi theo thời gian như doanh số, lưu lượng trang web, tải CPU, số liệu cảm biến, phục vụ cho các quyết định như dự trữ hàng tồn kho, bố trí năng lực sản xuất, lập lịch vận hành.
  - Phân tích kinh tế vĩ mô và tài chính: Nghiên cứu mối liên kết dài hạn và động lực ngắn hạn giữa các chỉ số vĩ mô và thị trường như GDP, tỷ lệ lạm phát, lãi suất, tỷ giá, giá tài sản, hỗ trợ nghiên cứu chính sách và phát triển chiến lược định lượng.
  - Ước lượng quá trình và quỹ đạo: Trong định vị, dẫn đường, theo dõi mục tiêu và giám sát thiết bị, ước lượng và làm mịn quỹ đạo, vận tốc, trạng thái thay đổi theo thời gian, đồng thời khôi phục "quá trình thực" tốt nhất có thể trong môi trường nhiễu.
- **Nguyên lý**
  Các phương pháp chuỗi thời gian cổ điển thường dựa trên tư duy "**giả định thống kê + cấu trúc tham số hóa**":
  - Giả định chuỗi thời gian thỏa mãn điều kiện dừng hoặc dừng yếu nhất định, thông qua cấu trúc tự tương quan (hàm tự tương quan ACF, hàm tự tương quan riêng phần PACF) để mô tả "giá trị hiện tại được quyết định bởi bao nhiêu bậc trễ trong quá khứ".
  - Trong trường hợp đa biến, thông qua mô hình đồng liên kết và tự hồi quy vector (VAR), mô tả mối quan hệ cân bằng dài hạn và hiệu chỉnh sai lệch ngắn hạn giữa nhiều chuỗi thời gian.
  - Đối với các hệ thống có nhiễu nghiêm trọng và trạng thái không thể quan sát trực tiếp, đưa vào trạng thái ẩn (latent state) và phương trình quan sát để tạo thành mô hình không gian trạng thái, sử dụng suy luận Bayes hoặc lọc đệ quy (như bộ lọc Kalman) để ước lượng và dự báo trực tuyến.
- **Mô hình**
  Họ mô hình của các phương pháp này tương đối rõ ràng, cấu trúc mạch lạc, dễ diễn giải và điều chỉnh tham số:
  - Dòng AR/MA/ARIMA/SARIMA đơn biến và đa biến, dùng cho mô hình chuỗi thời gian dừng/theo mùa, là "thành viên thường trú" của hệ thống BI và mô-đun dự báo truyền thống.
  - Mô hình VAR/đồng liên kết, dùng cho mô hình hóa kết hợp và kiểm định quan hệ nhân quả của chuỗi thời gian tài chính và vĩ mô đa chiều, phù hợp với phân tích liên kết ở cấp độ chính sách và chiến lược.
  - Mô hình không gian trạng thái và bộ lọc Kalman, mô hình Markov ẩn (HMM), v.v., dùng cho ước lượng quỹ đạo, ước lượng trạng thái thiết bị và suy luận trạng thái ẩn, là công cụ nền tảng trong điều khiển kỹ thuật và xử lý tín hiệu.

Nhìn tổng thể, ưu điểm của mô hình chuỗi thời gian cổ điển nằm ở **khả năng diễn giải, khả năng chẩn đoán và khả năng kiểm soát kỹ thuật**: quy trình mô hình hóa, kiểm định giả thuyết, phân tích phần dư đều có quy phạm hoàn thiện, dễ dàng tích hợp vào hệ thống BI và lập kế hoạch hiện có. Dưới đây, chúng ta triển khai theo ba hướng: dự báo đơn biến/đa biến, đồng liên kết và nhân quả, không gian trạng thái.

### 6.1.1 Dự báo chuỗi thời gian đơn biến/đa biến: Từ ARIMA đến VAR

Trong các kịch bản kinh doanh điển hình nhất, điều đầu tiên chúng ta đối mặt là một hoặc nhiều đường cong chỉ số được sắp xếp theo thời gian: ví dụ doanh số hàng ngày của một sản phẩm, PV hàng giờ của trang web, mức sử dụng CPU mỗi phút của phòng máy, số liệu cảm biến thiết bị mỗi giây. Mục tiêu là dựa trên xu hướng lịch sử để đưa ra dự báo cho khoảng thời gian ngắn hạn hoặc trung hạn trong tương lai, kèm theo khoảng tin cậy hợp lý. Dòng mô hình **AR/MA/ARMA/ARIMA/SARIMA** chính là công cụ tiêu chuẩn được thiết kế cho mục đích này.

Đối với chuỗi đơn biến, mô hình lớp ARIMA giả định rằng "giá trị hiện tại được quyết định tuyến tính bởi giá trị lịch sử của một số kỳ trước và nhiễu ngẫu nhiên", thông qua sai phân và sai phân mùa để loại bỏ xu hướng và tính mùa vụ, đưa chuỗi về trạng thái dừng:

- Phần AR (tự hồi quy) mô tả "ảnh hưởng của độ trễ bản thân đến giá trị hiện tại";
- Phần MA (trung bình trượt) nắm bắt "ảnh hưởng của sai số lịch sử đến giá trị hiện tại";
- Phần I (sai phân) chịu trách nhiệm loại bỏ xu hướng;
- Thêm thành phần mùa vụ sẽ có SARIMA, có thể mô tả tường minh cấu trúc chu kỳ như theo tuần, theo tháng.

Trong sử dụng kỹ thuật, thường sẽ tiến hành kiểm định tính dừng (như ADF), quan sát biểu đồ ACF/PACF trước, sau đó thông qua tiêu chí thông tin (AIC/BIC) và chẩn đoán phần dư để chọn bậc hợp lý. Đối với các chỉ số có tính mùa vụ rõ rệt (như doanh số thương mại điện tử hàng ngày, lưu lượng ngày lễ), SARIMA đặc biệt phù hợp, kết hợp với đặc trưng ngày lễ hoặc biến ngoại sinh có thể cải thiện thêm hiệu suất dự báo.

Khi chúng ta muốn mô hình hóa đồng thời nhiều chuỗi thời gian liên quan, có thể đưa vào **mô hình chuỗi thời gian đa biến**. Phương pháp đại diện là VAR (tự hồi quy vector) và các biến thể của nó. VAR coi nhiều chuỗi là một vector kết hợp, sử dụng các độ trễ của chính nó và của nhau để cùng giải thích giá trị hiện tại, từ đó nắm bắt ảnh hưởng lẫn nhau giữa các chỉ số khác nhau. Ví dụ, trong phân tích kinh tế vĩ mô, có thể đưa tốc độ tăng trưởng GDP, tỷ lệ lạm phát, lãi suất, tỷ giá vào cùng một mô hình VAR, nghiên cứu phản ứng xung và đường dẫn truyền dẫn; trong vận hành kinh doanh, cũng có thể dùng VAR để mô tả "thay đổi lưu lượng của một kênh ảnh hưởng đến các kênh khác như thế nào", "mối quan hệ động giữa cường độ khuyến mãi và doanh số", cung cấp tham khảo cho việc phân bổ tài nguyên.

Về hình thức sản phẩm, năng lực dự báo đơn biến/đa biến này thường được nhúng trong **chức năng dự báo của hệ thống BI/báo cáo truyền thống, công cụ lập kế hoạch tài chính và chuỗi cung ứng**: người dùng chọn một hoặc nhiều chuỗi thời gian, hệ thống tự động hoàn thành mô hình hóa và dự báo, đồng thời cung cấp khoảng dự báo, phân tích phần dư và báo cáo chẩn đoán mô hình, hỗ trợ ra quyết định mà không cần hiểu sâu tất cả chi tiết toán học đằng sau.

### 6.1.2 Đồng liên kết và quan hệ nhân quả: Cân bằng dài hạn giữa các chỉ số vĩ mô

Trong lĩnh vực kinh tế và tài chính, nhiều chuỗi thời gian bề ngoài có vẻ như bước ngẫu nhiên, nhưng trên thang thời gian dài hơn lại tồn tại một **mối quan hệ cân bằng dài hạn ổn định**. Các ví dụ điển hình bao gồm tỷ giá và chênh lệch lãi suất, chỉ số chứng khoán và lợi nhuận vĩ mô, giá hàng hóa và chỉ số chi phí. Xét riêng từng chuỗi, có thể đều không dừng; nhưng một tổ hợp tuyến tính nào đó lại dao động quanh một mức ổn định trong dài hạn. Hiện tượng này được gọi là **đồng liên kết (cointegration)**, cung cấp manh mối quan trọng để hiểu mối quan hệ cấu trúc giữa các chỉ số vĩ mô.

Trong thực hành kỹ thuật, phân tích đồng liên kết thường bao gồm một số bước:

1. Tiến hành kiểm định nghiệm đơn vị cho từng chuỗi thời gian, xác nhận chúng cùng bậc tích hợp (ví dụ đều là I(1));
2. Tiến hành kiểm định đồng liên kết (như phương pháp hai bước Engle-Granger, kiểm định Johansen, v.v.), đánh giá xem có tồn tại tổ hợp tuyến tính không tầm thường khiến tổ hợp đó dừng hay không;
3. Nếu phát hiện quan hệ đồng liên kết, có thể xây dựng mô hình hiệu chỉnh sai số (ECM), mô tả "khi sai lệch ngắn hạn khỏi cân bằng dài hạn, hệ thống hiệu chỉnh dần trở về trạng thái cân bằng như thế nào".

Liên quan đến đồng liên kết là **kiểm định quan hệ nhân quả Granger**. Đây không phải là "nhân quả" theo nghĩa triết học chặt chẽ, mà là một định nghĩa thống kê dựa trên khả năng dự báo: nếu thông tin lịch sử của biến X có thể cải thiện đáng kể độ chính xác dự báo cho biến Y, thì gọi là "X Granger gây ra Y". Bằng cách so sánh sai số dự báo khi có/không có biến trễ của một biến nào đó trong khuôn khổ VAR hoặc hồi quy, có thể đánh giá ảnh hưởng có hướng giữa các chỉ số vĩ mô hoặc thị trường khác nhau. Trong nghiên cứu định lượng và phân tích vĩ mô, kiểm định này thường được dùng để xác định các chỉ báo dẫn dắt tiềm năng, xây dựng nhân tố, hoặc kiểm chứng giả thuyết chiến lược.

Từ góc độ sản phẩm, phân tích đồng liên kết và nhân quả xuất hiện nhiều hơn trong **phần mềm phân tích nghiên cứu định lượng, nền tảng phân tích kinh tế vĩ mô và công cụ nghiên cứu tài chính**. Chúng giúp nhà nghiên cứu trích xuất các mối quan hệ cấu trúc tương đối bền vững từ hàng đống chuỗi thời gian, và ánh xạ các mối quan hệ này lên các khái niệm kinh doanh cấp cao hơn (như "ràng buộc dài hạn của lãi suất lên tỷ giá", "hồi quy chênh lệch giá giữa các tài sản khác nhau"), trở thành cơ sở quan trọng cho thiết kế chiến lược và quản trị rủi ro.

### 6.1.3 Mô hình không gian trạng thái và ước lượng trạng thái ẩn: Bộ lọc Kalman và HMM

Trong nhiều hệ thống thực tế, chuỗi thời gian chúng ta quan sát được chỉ là **bề ngoài sau khi bị nhiễu làm ô nhiễm**, còn điều thực sự quan tâm là "trạng thái hệ thống" tiến hóa theo thời gian đằng sau: ví dụ vị trí và vận tốc thực của xe, trạng thái sức khỏe của thiết bị, mô hình hành vi tiềm ẩn của người dùng, v.v. Lúc này, nếu vẫn chỉ mô hình hóa kiểu ARIMA trên chuỗi quan sát, sẽ khó tận dụng đầy đủ hiểu biết về cấu trúc hệ thống. **Mô hình không gian trạng thái (State Space Models)** chính được đề xuất cho bài toán "trạng thái ẩn + quan sát nhiễu" này.

Mô hình không gian trạng thái thường gồm hai phần:

- Phương trình chuyển trạng thái: mô tả trạng thái ẩn tiến hóa theo thời gian như thế nào, có thể là tuyến tính hoặc phi tuyến;
- Phương trình quan sát: mô tả trạng thái ẩn tạo ra giá trị quan sát có nhiễu như thế nào.

Dưới giả định Gauss tuyến tính, khuôn khổ này có thể thông qua **bộ lọc Kalman (Kalman Filter) và bộ làm mịn (Smoother)** để thực hiện ước lượng và dự báo đệ quy trạng thái: mỗi bước chia thành hai giai đoạn lớn là "dự báo" và "cập nhật", kết hợp phân phối trạng thái của thời điểm trước với quan sát hiện tại để có được ước lượng trạng thái mới. Điều này cực kỳ phổ biến trong dẫn đường và định vị (như ước lượng quỹ đạo, theo dõi mục tiêu), chuỗi thời gian tài chính (như ước lượng biến động), ước lượng trạng thái thiết bị (như giám sát sức khỏe, dự báo tuổi thọ còn lại).

Liền kề với mô hình không gian trạng thái liên tục là **mô hình Markov ẩn (HMM)**. HMM giả định hệ thống chuyển đổi theo thời gian giữa một số trạng thái ẩn rời rạc, mỗi trạng thái ẩn có phân phối xác suất sinh dữ liệu quan sát khác nhau. Thông qua thuật toán tiến-lùi và thuật toán Viterbi, HMM có thể ước lượng chuỗi trạng thái ẩn, tính toán xác suất chuỗi quan sát, và dự báo trạng thái và quan sát bước tiếp theo. HMM trước đây được sử dụng rộng rãi trong nhận dạng giọng nói, gán nhãn văn bản, cũng thường dùng cho nhận dạng mô hình hành vi đơn giản và mô hình chuỗi sự kiện, trong một số kịch bản công nghiệp và tài chính vẫn có ưu thế riêng — cấu trúc có thể diễn giải, huấn luyện ổn định, dễ kết hợp với kinh nghiệm lĩnh vực.

Ở cấp độ hệ thống, mô hình không gian trạng thái, bộ lọc Kalman và HMM thường đóng vai trò là mô-đun nền tảng cho **ước lượng quỹ đạo, ước lượng trạng thái thiết bị, hệ thống điều khiển tài chính và kỹ thuật**, được đóng gói trong chuỗi công cụ lớn hơn. Chúng không nhất thiết được phơi bày trực tiếp cho người dùng cuối, nhưng đằng sau các sản phẩm như dẫn đường, theo dõi mục tiêu, điều khiển công nghiệp, đo lường rủi ro, chúng luôn đóng vai trò "động cơ ẩn" lâu dài.## 6.2 Mô hình hóa chuỗi thời gian học sâu（Deep TS Forecasting）

Khi quy mô dữ liệu và độ phức tạp của kịch bản ngày càng tăng, các mô hình cổ điển chỉ dựa trên giả định tuyến tính và tính dừng bắt đầu tỏ ra "đuối sức" trong nhiều ứng dụng: số lượng lớn các mẫu phi tuyến tính, phụ thuộc tầm xa, tương tác đa biến phức tạp, hành vi đột biến chồng chéo với chu kỳ và các đặc điểm khác đòi hỏi chúng ta cần có cấu trúc mô hình linh hoạt hơn và dung lượng cao hơn. **Mô hình hóa chuỗi thời gian học sâu** chính là sản phẩm phát triển trong bối cảnh này: từ RNN/LSTM/GRU, đến Temporal CNN/TCN, rồi đến Transformer chuyên dụng cho chuỗi thời gian, các mô hình lai và phân tầng — tất cả cùng tạo thành bộ công cụ chủ lực cho dự báo và mô hình hóa chuỗi thời gian hiện đại.

Từ góc độ ứng dụng, các mô hình chuỗi thời gian học sâu đã được triển khai rộng rãi trong **nền tảng dự báo lưu lượng & doanh số thương mại điện tử, hệ thống dự báo cung cầu/năng lực vận tải/xếp ca, công cụ dự báo tải tài nguyên đám mây và lập kế hoạch dung lượng**, nhằm đưa ra các giải pháp dự báo thống nhất và linh hoạt trong các cấu trúc phức tạp như đa danh mục, đa cửa hàng, đa thành phố, thậm chí đa tuyến kinh doanh. So với các mô hình cổ điển, chúng nhấn mạnh hơn vào "học biểu diễn đầu-cuối" và "mô hình hóa mẫu toàn cục", xử lý tốt hơn các kịch bản chuỗi dài, đa chiều và đa biến. Dưới đây, chúng ta cũng sẽ triển khai từ ba khía cạnh: **kịch bản**, **nguyên lý** và **mô hình**.

- **Kịch bản**
  - Dự báo đa chuỗi quy mô lớn: hàng chục nghìn chuỗi doanh số/lưu lượng theo chiều sản phẩm, cửa hàng, thành phố, cần được mô hình hóa đồng thời trong một mô hình thống nhất, đồng thời hỗ trợ khởi động nguội và chuỗi đuôi dài.
  - Vận hành và điều phối phức tạp: trong các hệ thống cung cấp điện/nước, năng lực vận tải, xếp ca, nhu cầu chịu ảnh hưởng của các đặc trưng đa chiều (thời tiết, ngày lễ, giá cả, sự kiện) và tồn tại cấu trúc đa tầng (cửa hàng/thành phố/toàn quốc), cần đồng thời cân nhắc mẫu toàn cục và khác biệt cục bộ.
  - Tài nguyên đám mây và cơ sở hạ tầng: cụm máy chủ quy mô lớn, nền tảng container, tải mạng và lưu trữ, thể hiện cấu trúc phi tuyến tính cao và đa đỉnh, cần dự báo tần suất cao và lập kế hoạch dung lượng để đảm bảo SLO.
- **Nguyên lý**
  Cốt lõi của mô hình chuỗi thời gian học sâu nằm ở **tự động học các mẫu đa quy mô và phụ thuộc dài hạn từ chuỗi lịch sử và biến đồng hành**:
  - RNN/LSTM/GRU truyền "bộ nhớ" một cách tường minh theo chiều thời gian thông qua cấu trúc hồi quy, phù hợp để nắm bắt phụ thuộc tuần tự và cấu trúc thời gian cục bộ.
  - Temporal CNN / TCN sử dụng tích chập một chiều và tích chập giãn nở, mở rộng vùng tiếp nhận trong khi vẫn đảm bảo tính nhân quả, cho phép huấn luyện song song và lan truyền gradient ổn định.
  - Transformer chuỗi thời gian và các biến thể được thiết kế chuyên biệt (Informer, Autoformer, TimesNet, v.v.) tận dụng cơ chế tự chú ý để mô hình hóa các phụ thuộc phức tạp và mẫu chu kỳ trong thiết lập chuỗi dài, đa biến.
  - Các mô hình lai và phân tầng tiếp tục đưa vào giả định cấu trúc "toàn cục + cục bộ", "chuỗi thời gian đa tầng", đồng thời học mẫu toàn cục và đặc trưng cá thể trong một khuôn khổ thống nhất.
- **Mô hình**
  Trong triển khai cụ thể, mô hình hóa chuỗi thời gian học sâu đã xuất hiện một loạt kiến trúc tiêu biểu:
  - Mô hình chuỗi học sâu cổ điển: RNN/LSTM/GRU và các mô hình dự báo xác suất tự hồi quy dựa trên chúng như DeepAR.
  - Mô hình tích hợp phân rã và dự báo: N‑BEATS và các mô hình khác tăng cường khả năng diễn giải thông qua các mô-đun phân rã xu hướng/mùa vụ tường minh.
  - Mô hình chuỗi thời gian dựa trên chú ý: Temporal Fusion Transformer（TFT）và các mô hình khác kết hợp chú ý, cổng kiểm soát, lựa chọn biến, phù hợp với kịch bản nghiệp vụ đa biến, có nhiều biến đồng hành.
  - Mô hình Transformer chuỗi dài: Informer、Autoformer、TimesNet、PatchTST, v.v., được thiết kế chuyên biệt xoay quanh hiệu quả chuỗi dài và mô hình hóa đa quy mô.

Dưới đây, chúng ta sẽ triển khai từ ba hướng: mô hình chuỗi học sâu, tích chập & Transformer, và mô hình hóa lai & phân tầng.

### 6.2.1 RNN/LSTM/GRU học sâu：từ chuỗi đơn đến DeepAR

Trong giai đoạn đầu khi học sâu bước vào lĩnh vực chuỗi thời gian, **RNN/LSTM/GRU** là lựa chọn tự nhiên nhất. Tương tự như mô hình hóa văn bản và giọng nói, chúng "ghi nhớ" thông tin lịch sử bằng cách truyền trạng thái ẩn giữa các bước thời gian, cho phép nắm bắt các phụ thuộc phi tuyến tính và dài hạn phức tạp hơn so với các mô hình tuyến tính truyền thống. Đối với chuỗi thời gian đơn lẻ hoặc số lượng ít, LSTM/GRU đơn giản có thể đạt được hiệu quả dự báo khá tốt khi có đủ dữ liệu; còn trong kịch bản đa chuỗi quy mô lớn, có thể sử dụng **mô hình RNN/LSTM/GRU chia sẻ tham số**, huấn luyện chung trên tất cả các chuỗi, từ đó học được các mẫu chuỗi thời gian phổ quát.

Trên cơ sở này, các mô hình xác suất tự hồi quy tương tự **DeepAR** cung cấp một khuôn khổ tiêu chuẩn cho mô hình hóa chuỗi thời gian học sâu: nó đưa quan sát lịch sử và biến đồng hành vào một mạng RNN/LSTM/GRU chia sẻ, tại mỗi bước thời gian xuất ra tham số phân phối có điều kiện của giá trị chuỗi (như phân phối Gaussian, nhị thức âm, v.v.), và thông qua huấn luyện hợp lý cực đại để đạt được dự báo xác suất đầu-cuối. Thiết kế như vậy cho phép mô hình tạo ra khoảng dự báo một cách tự nhiên, xử lý quy mô không đều và hỗn hợp đa chuỗi, có lợi cho việc triển khai trong các kịch bản như doanh số thương mại điện tử, dự báo nhu cầu.

Tuy nhiên, các mô hình dạng RNN tồn tại vấn đề điển hình: suy giảm gradient trên chuỗi dài, và không thể song song hóa hoàn toàn trong giai đoạn huấn luyện. Mặc dù cơ chế cổng (LSTM/GRU) đã giảm nhẹ một phần vấn đề, nhưng với khoảng thời gian đặc biệt dài và dữ liệu tần suất cao, hiệu quả huấn luyện và suy luận vẫn là yếu tố cần cân nhắc. Điều này cũng thúc đẩy giới công nghiệp và học thuật khám phá các cấu trúc thân thiện với song song hóa hơn, như TCN và Transformer.

### 6.2.2 Temporal CNN và Transformer：từ tích chập cục bộ đến chú ý chuỗi dài

Để giải quyết vấn đề hiệu quả và ổn định của RNN trên chuỗi dài, **Temporal CNN / TCN** đã đưa vào tích chập một chiều và tích chập giãn nở để mô hình hóa phụ thuộc thời gian: bằng cách xếp chồng nhiều tầng tích chập nhân quả, mở rộng vùng tiếp nhận theo từng tầng, nó thực hiện mô hình hóa lịch sử tầm xa mà không phá vỡ tính nhân quả thời gian. So với RNN, TCN có thể song song hóa cao trong huấn luyện, đường dẫn lan truyền gradient ngắn hơn, do đó thể hiện ưu thế vượt trội về độ ổn định và hiệu quả huấn luyện, phù hợp sử dụng trong các kịch bản dự báo chuỗi thời gian công nghiệp với dữ liệu tần suất cao, cần vùng tiếp nhận lớn.

Ở cấp độ phức tạp cao hơn, **Transformer và các cấu trúc chuyên dụng cho chuỗi thời gian** đã trở thành nhân vật chính trong mô hình hóa chuỗi thời gian dài, đa biến những năm gần đây. Sử dụng trực tiếp Transformer tiêu chuẩn sẽ gặp vấn đề độ phức tạp tính toán tăng theo bình phương độ dài chuỗi, do đó đã xuất hiện một loạt phương án cải tiến hướng đến chuỗi thời gian:

- **Informer** thông qua các cơ chế như tự chú ý thưa xác suất, giảm gánh nặng tính toán trên chuỗi dài, đồng thời tối ưu hóa cấu trúc cho tác vụ dự báo.
- **Autoformer** tích hợp phân rã xu hướng và mùa vụ vào khuôn khổ tự chú ý, cố gắng nâng cao khả năng diễn giải và độ ổn định trong khi vẫn duy trì năng lực mô hình hóa chuỗi dài.
- **TimesNet** tăng cường nhận thức về chu kỳ và mẫu bằng cách triển khai trong miền thời gian–tần số hoặc mở rộng đa quy mô, xử lý tốt hơn chuỗi dài phức tạp, đa chu kỳ.
- **PatchTST** mượn ý tưởng "patch" từ Vision Transformer, coi các chuỗi con liên tục như các mảnh vá, nâng cao hiệu quả mô hình hóa và khả năng tổng quát hóa trên chuỗi dài.

Loại mô hình này thường đặc biệt phù hợp với các kịch bản chuỗi thời gian phức tạp **chuỗi dài, đa biến, biến đồng hành đa chiều**, như tải tài nguyên đám mây quy mô lớn, nhu cầu năng lượng đa khu vực, dự báo lưu lượng đa kênh, v.v. Chúng có thể đồng thời mô hình hóa đầu vào đa chiều, đặc trưng tĩnh và biến phụ thuộc thời gian trong một kiến trúc thống nhất, đồng thời cung cấp một số manh mối cho việc diễn giải và chẩn đoán sau này thông qua trọng số chú ý.

### 6.2.3 Mô hình lai và phân tầng：toàn cục + cục bộ, chuỗi thời gian đa tầng

Trong thực tế kinh doanh, chuỗi thời gian hiếm khi "cô lập": chúng thường có **cấu trúc phân tầng và mẫu chia sẻ** rõ rệt — ví dụ như phân cấp bán hàng cửa hàng/thành phố/khu vực/toàn quốc, phân cấp sản phẩm SKU/danh mục/thương hiệu, hoặc cấu trúc tổ chức tuyến kinh doanh/sản phẩm/kênh. Nếu mô hình hóa riêng lẻ cho từng chuỗi, sẽ rất khó tận dụng cấu trúc phân tầng này; còn nếu trộn tất cả các chuỗi lại với nhau, lại bỏ qua khác biệt cá nhân hóa của từng chuỗi. **Mô hình lai và phân tầng** chính là được thiết kế để giải quyết loại vấn đề này.

Một hướng tư duy phổ biến là **mô hình toàn cục + cục bộ**: thông qua một "mô hình toàn cục" chia sẻ để học các mẫu chung của tất cả chuỗi (như xu hướng tổng thể, hiệu ứng ngày lễ, tính mùa vụ), đồng thời đưa vào tham số cục bộ hoặc vector nhúng cho từng chuỗi hoặc từng nhóm con, để nắm bắt đặc tính cá thể. Cấu trúc này vừa tránh được vấn đề thưa thớt dữ liệu do huấn luyện mô hình riêng cho chuỗi đuôi dài, vừa giữ được năng lực mô hình hóa tinh tế trên các chuỗi phổ biến.

Một loại khác là **mô hình hóa chuỗi thời gian đa tầng（hierarchical TS）**: trong quá trình dự báo, xem xét tường minh các ràng buộc phân tầng (như tổng của các tầng con cần nhất quán với dự báo của tầng trên), thông qua tối ưu hóa chung từ trên xuống, từ dưới lên hoặc tầng trung gian, làm cho dự báo các tầng nhất quán về mặt số liệu và cấu trúc. Trong khuôn khổ chuỗi thời gian học sâu, điều này thường thể hiện ở việc thêm đặc trưng phân tầng vào mã hóa đầu vào, thiết kế đầu ra đa đầu cho các tầng khác nhau, hoặc sử dụng hàm mất mát phân tầng để huấn luyện.

Từ góc độ sản phẩm, loại mô hình hóa lai và phân tầng này được ứng dụng rộng rãi trong các kịch bản như **nền tảng dự báo doanh số thương mại điện tử, hệ thống dự báo cung cầu/năng lực vận tải/xếp ca**: hệ thống cần đồng thời đưa ra dự báo ở các độ hạt khác nhau như "một cửa hàng một sản phẩm", "cấp thành phố", "tổng toàn quốc", và duy trì tính nhất quán giữa các tầng trong quá trình lập kế hoạch tài nguyên và phân rã KPI. Cấu trúc linh hoạt của mô hình học sâu khiến các ràng buộc loại này có thể được nhúng vào quá trình mô hình hóa theo cách đầu-cuối, thay vì phải hoàn toàn dựa vào hiệu chỉnh hậu kỳ.## 6.3 Phát hiện bất thường & phát hiện điểm thay đổi (Anomaly & Change Point Detection)

Trong các bài toán chuỗi thời gian, "dự đoán tương lai" chỉ là một phần của vấn đề, một phần khác cũng quan trọng không kém là: **phát hiện bất thường và thay đổi cấu trúc theo thời gian thực**. Dù là vận hành thiết bị, chỉ số kinh doanh, hành vi giao dịch hay giám sát vận hành, phát hiện bất thường và điểm thay đổi đều là năng lực cốt lõi để đảm bảo tính ổn định của hệ thống cũng như nhận diện rủi ro và cơ hội. Theo truyền thống, các phương pháp như ngưỡng thống kê, EWMA, CUSUM được sử dụng rộng rãi; khi số chiều và độ phức tạp của dữ liệu tăng lên, nhiều phương pháp học máy và học sâu (Isolation Forest, One‑Class SVM, AutoEncoder/VAE, Time‑Series GAN, GNN + mô hình chuỗi thời gian) cũng bắt đầu đóng vai trò quan trọng.

Xét về hình thái sản phẩm, những năng lực này thường được tích hợp trong **hệ thống cảnh báo sự cố thiết bị, nền tảng cảnh báo bất thường chỉ số kinh doanh (như tỷ lệ chuyển đổi giảm đột ngột), hệ thống phát hiện tấn công bảo mật & gian lận, công cụ cảnh báo AIOps vận hành**, thông qua giám sát thời gian thực các tín hiệu chuỗi thời gian đa chiều, tự động đánh dấu các điểm đáng ngờ và thay đổi cấu trúc, đồng thời kết hợp với quy tắc, cơ sở tri thức và quy trình quyết định thủ công. Dưới đây tiếp tục triển khai từ ba góc độ: **kịch bản**, **nguyên lý** và **mô hình**.

- **Kịch bản**
  - Thiết bị & hệ thống công nghiệp: giám sát dữ liệu cảm biến như nhiệt độ, độ rung, dòng điện, áp suất, phát hiện sớm xu hướng sự cố và suy thoái, giảm thời gian ngừng hoạt động và tổn thất.
  - Chỉ số kinh doanh & vận hành: giám sát các chỉ số then chốt như PV/UV, tỷ lệ chuyển đổi, số lượng đơn hàng, độ trễ, tỷ lệ lỗi, nhanh chóng phát hiện sụt giảm đột ngột, tăng vọt, biến động bất thường, cung cấp cảnh báo cho đội ngũ vận hành và kỹ thuật.
  - Bảo mật & kiểm soát rủi ro: phân tích chuỗi thời gian như hành vi đăng nhập, chuỗi giao dịch, mẫu truy cập, nhận diện các cuộc tấn công tiềm ẩn, gian lận và hành vi lừa đảo.
- **Nguyên lý**
  Phát hiện bất thường và điểm thay đổi về bản chất là tìm kiếm độ lệch đáng kể và đột biến cấu trúc trên "mẫu bình thường":
  - Đối với bất thường điểm và bất thường chuỗi, có thể thông qua khớp phân phối thống kê, ước lượng mật độ hoặc học ranh giới để phán đoán xem quan sát hiện tại có nằm ngoài "vùng bình thường" hay không.
  - Đối với điểm thay đổi, tập trung vào đột biến của các đặc trưng thống kê chuỗi thời gian (trung bình, phương sai, cấu trúc tương quan, phân phối, v.v.) trên trục thời gian, và cố gắng định vị vị trí thời gian xảy ra thay đổi.
  - Trong mạng đa chiều và đa điểm, cần đưa cấu trúc phụ thuộc giữa nhiều chuỗi thời gian (như topology, tương quan) vào mô hình hóa, tránh nhầm lẫn giữa bất thường cục bộ và xu hướng tổng thể.
- **Mô hình**
  Xét theo họ phương pháp, có thể chia đại thể thành phương pháp thống kê, phương pháp học một lớp/cô lập, mô hình sâu tái tạo và mô hình kết hợp đồ thị + chuỗi thời gian:
  - Phát hiện bất thường thống kê: ngưỡng, EWMA, CUSUM, v.v., cực kỳ hiệu quả đối với các kịch bản đơn biến hoặc đơn giản, là nền tảng của các hệ thống giám sát truyền thống.
  - Phương pháp học máy: Isolation Forest, One‑Class SVM, v.v., dùng để khắc họa "vùng bình thường" trong không gian đặc trưng đa chiều, cô lập các mẫu bất thường.
  - Mô hình tái tạo sâu: AutoEncoder / VAE / Time‑Series GAN, thông qua học tái tạo chuỗi bình thường, đánh dấu bất thường khi sai số tái tạo lớn.
  - Mạng nơ-ron đồ thị + mô hình chuỗi thời gian: trong các kịch bản như mạng cảm biến, chỉ số microservice, đưa cấu trúc đồ thị và mô hình chuỗi thời gian vào cùng học mẫu bình thường, tăng cường nhận diện bất thường liên quan đến topology.

Dưới đây, chúng ta triển khai theo ba hướng: bất thường điểm/chuỗi, phát hiện điểm thay đổi, và chuỗi thời gian đa chiều & cấu trúc đồ thị.

### 6.3.1 Bất thường điểm & bất thường chuỗi: từ ngưỡng thống kê đến mô hình tái tạo

Hình thức phát hiện bất thường trực quan nhất là **bất thường điểm**: giá trị quan sát tại một thời điểm nằm xa phạm vi bình thường trong lịch sử (ví dụ: CPU đột ngột tăng vọt lên 100%, số tiền giao dịch lớn bất thường, chỉ số cảm biến nhảy đột biến). Trong các phương pháp truyền thống, cách làm phổ biến nhất là khớp một phân phối thống kê hoặc thống kê trượt (trung bình, phương sai, phân vị) trên dữ liệu bình thường lịch sử, trên cơ sở đó thiết lập ngưỡng hoặc biểu đồ kiểm soát (như EWMA, CUSUM), và phát cảnh báo khi quan sát hiện tại vượt ra ngoài khoảng chấp nhận được. Ưu điểm là triển khai đơn giản, chi phí tính toán thấp, dễ giải thích, do đó vẫn được sử dụng rộng rãi trong nhiều hệ thống giám sát vận hành và công nghiệp.

Khi số chiều tăng lên hoặc mẫu trở nên phức tạp hơn, có thể đưa vào các phương pháp học một lớp/cô lập như **Isolation Forest, One‑Class SVM**: chúng học một vùng tổng hợp (hoặc ranh giới) trên "mẫu bình thường", coi các điểm nằm ngoài vùng đó là bất thường. Bằng cách trích xuất đặc trưng thống kê trên cửa sổ trượt của chuỗi (như trung bình cửa sổ, phương sai, đặc trưng miền tần số, v.v.), các phương pháp này cũng có thể được sử dụng để nhận diện "bất thường chuỗi" cục bộ (tức là hành vi trong một khoảng thời gian lệch khỏi mẫu bình thường), phù hợp với các kịch bản chỉ số đa chiều và khó xác định chính xác hình thái phân phối.

Trong khuôn khổ học sâu, các phương pháp dựa trên **sai số tái tạo như AutoEncoder / VAE / Time‑Series GAN** cung cấp lựa chọn linh hoạt hơn:

- Sử dụng AutoEncoder hoặc VAE huấn luyện mô hình "nén–tái tạo" trên lượng lớn chuỗi bình thường, để nó học cách tái tạo mẫu bình thường;
- Khi giám sát trực tuyến, đưa cửa sổ thời gian mới vào mô hình, nếu sai số tái tạo tăng đáng kể thì coi khoảng đó tồn tại bất thường;
- Các phương pháp loại Time‑Series GAN học cách sinh chuỗi bình thường, tìm tín hiệu bất thường trong kết quả phán đoán của discriminator hoặc sai số sinh.

Những phương pháp này có thể thích ứng với các mẫu phi tuyến cao và cấu trúc biến đồng hành phức tạp, đặc biệt phù hợp để xây dựng công cụ phát hiện bất thường thống nhất trên **chỉ số kinh doanh đa chiều, dữ liệu cảm biến thiết bị phức tạp**.

### 6.3.2 Phát hiện điểm thay đổi: đột biến cấu trúc & hiệu lực sự kiện

Khác với bất thường điểm và bất thường cục bộ, **phát hiện điểm thay đổi (Change Point Detection)** tập trung vào đột biến cấu trúc của chuỗi thời gian: ví dụ trung bình nhảy từ mức này sang mức khác, độ biến động thay đổi, chu kỳ và cấu trúc tương quan xuất hiện điều chỉnh. Những thay đổi này thường tương ứng với một sự kiện hoặc chuyển đổi trạng thái nào đó trong thế giới thực, như thay đổi cấu hình, áp dụng chính sách mới, điều chỉnh chính sách, thay đổi quy trình sản xuất, chuyển đổi chế độ thị trường, v.v., cực kỳ quan trọng đối với chẩn đoán nghiệp vụ và phân tích nhân quả.

Trong các phương pháp thống kê truyền thống, phát hiện điểm thay đổi thường dựa vào các kỹ thuật như kiểm định tỷ lệ hợp lý, CUSUM, Bayesian Online Change Point Detection (BOCPD):

- Bằng cách khớp các mô hình với tham số khác nhau (như trung bình/phương sai khác nhau) trước và sau các thời điểm khác nhau, so sánh độ phù hợp giữa "giả thuyết không có điểm thay đổi" và "giả thuyết có điểm thay đổi";
- Trong kịch bản trực tuyến, cập nhật đệ quy xác suất hậu nghiệm "đến đoạn hiện tại đã xuất hiện điểm thay đổi hay chưa" cho mỗi thời điểm, kích hoạt cảnh báo khi vượt quá ngưỡng đã đặt.

Trong các thiết lập phức tạp hơn, có thể kết hợp học biểu diễn sâu với mô hình phân đoạn, coi phát hiện điểm thay đổi như một **bài toán phân đoạn chuỗi**: dùng mạng nơ-ron trích xuất đặc trưng, sau đó tìm ranh giới đoạn trong không gian đặc trưng, hoặc huấn luyện trực tiếp mô hình dự đoán xác suất một thời điểm thuộc "điểm thay đổi". Điều này đặc biệt hữu ích đối với các chỉ số kinh doanh tồn tại nhiều hình thái thay đổi (không chỉ là thay đổi trung bình/phương sai) và khó mô tả bằng các giả định thống kê đơn giản.

Trong hệ thống sản phẩm, phát hiện điểm thay đổi thường được tích hợp trong **nền tảng phân tích chỉ số kinh doanh, hệ thống phân tích thí nghiệm A/B, công cụ giám sát thay đổi cấu hình & chính sách**: khi chỉ số then chốt thể hiện thay đổi cấu trúc, hệ thống có thể tự động đánh dấu điểm thay đổi tiềm năng, và liên kết với sự kiện thay đổi tương ứng (như phát hành phiên bản, điều chỉnh tham số, triển khai chính sách), cung cấp manh mối cho phân tích nguyên nhân gốc rễ sau đó.

### 6.3.3 Chuỗi thời gian đa chiều & cấu trúc đồ thị: mô hình hóa kết hợp GNN + mô hình chuỗi thời gian

Trong các hệ thống phân tán hiện đại và kịch bản IoT, chúng ta thường đối mặt với **chuỗi thời gian đa điểm, đa chiều, có cấu trúc topology liên kết**: ví dụ nhiều điểm đo trong mạng cảm biến, các chỉ số dịch vụ trong kiến trúc microservice, nhiều nút và cạnh trong mạng lưới phân phối điện/giao thông. Lúc này, phát hiện bất thường riêng lẻ, từng chuỗi một rất dễ phán đoán sai biến động cục bộ hoặc bỏ qua mẫu tổng thể — bất thường thực sự thường là biểu hiện của "sự không nhất quán giữa cục bộ–tổng thể" hoặc "sự không hài hòa trong cấu trúc topology".

Vì vậy, trong những năm gần đây xuất hiện nhiều phương pháp kết hợp **mạng nơ-ron đồ thị (GNN) + mô hình chuỗi thời gian**:

- Trước tiên, dựa trên topology thực tế (kết nối vật lý, topology mạng) hoặc đồ thị tương quan ước lượng từ dữ liệu, xây dựng một cấu trúc đồ thị biểu diễn mối quan hệ giữa nhiều điểm;
- Tại mỗi bước thời gian, dùng GNN thực hiện truyền thông điệp trên đặc trưng nút (giá trị chuỗi thời gian của từng điểm và ngữ cảnh cục bộ của nó), học đặc trưng liên kết không gian;
- Sau đó đưa biểu diễn đã mã hóa đồ thị vào các mô hình chuỗi thời gian như RNN, TCN hoặc Transformer, nắm bắt mẫu động theo chiều thời gian;
- Cuối cùng thực hiện chấm điểm bất thường hoặc phát hiện điểm thay đổi trên biểu diễn kết hợp, đạt được **nhận diện bất thường kết hợp không gian–thời gian**.

Khuôn khổ này đặc biệt phù hợp trong các kịch bản như **giám sát mạng cảm biến, phát hiện bất thường chỉ số microservice, phát hiện bất thường không gian–thời gian trong tính toán đô thị**: nó có thể phân biệt "thay đổi toàn cục" (như toàn bộ hệ thống tăng tải) với "bất thường cục bộ" (như một nút nào đó bị tắc nghẽn bất thường), cũng như nhận diện tốt hơn các mẫu bất thường liên quan đến cấu trúc topology (như vấn đề cấp liên kết, sự cố mạng khu vực).

Ở cấp độ kỹ thuật, các phương pháp này thường xuất hiện như năng lực bậc cao của **hệ thống cảnh báo AIOps vận hành, nền tảng bảo mật & kiểm soát rủi ro, hệ thống giám sát cụm thiết bị**, kết hợp giám sát thống kê cơ bản, hệ thống quy tắc và tri thức chuyên gia, cung cấp cơ chế phát hiện bất thường thông minh hơn và nhận biết ngữ cảnh hơn cho các hệ thống phức tạp.## 6.4 Mô Hình Không Gian-Thời Gian (Spatio-Temporal Modeling)

Trong nhiều tình huống nghiệp vụ quan trọng, chỉ mô hình hóa "thời gian" là chưa đủ: **"khi nào" và "ở đâu" tồn tại song song** và có sự liên kết chặt chẽ với nhau. Lưu lượng giao thông đô thị chịu ảnh hưởng đồng thời bởi cấu trúc mạng lưới đường và quy luật thời gian; khí tượng và chất lượng không khí vừa phụ thuộc vào diễn biến theo thời gian, vừa phụ thuộc vào vị trí địa lý lân cận và trường dòng khí quyển; điều phối logistics, xe đạp chia sẻ và xe công nghệ thì cần đồng thời xem xét phân bố không gian-thời gian của nhu cầu cùng với cấu trúc đường xá/khu vực. **Mô hình hóa không gian-thời gian (Spatio-Temporal Modeling)** chính là phương pháp hệ thống nhằm giải quyết bài toán mô hình hóa kết hợp "thời gian + không gian" này.

So với các mô hình chuỗi thời gian thuần túy, mô hình không gian-thời gian cần đưa **cấu trúc phụ thuộc không gian** vào một cách tường minh: lưu lượng giao thông của các đoạn đường liền kề, chất lượng không khí tại các trạm quan trắc lân cận, tải và trạng thái của các nút kết nối, thường có mức độ tương quan cao hơn so với các điểm cách xa nhau. Vì lý do này, các kiến trúc như Mạng nơ-ron đồ thị (GNN), LSTM tích chập (ConvLSTM) được sử dụng rộng rãi để kết hợp học đặc trưng trên cả hai chiều không gian và thời gian. Ở cấp độ sản phẩm, những năng lực này hỗ trợ cho **nền tảng điện toán đô thị (dự báo giao thông/luồng người), hệ thống dự báo khí tượng/môi trường, quy hoạch tuyến đường logistics và nền tảng điều phối xe đạp chia sẻ/xe công nghệ** cùng nhiều ứng dụng then chốt khác.

- **Tình huống**
  - Dự báo lưu lượng giao thông và luồng người: trên cấu trúc mạng lưới đường bộ hoặc tàu điện ngầm, dự báo lưu lượng xe và người tại các khung giờ khác nhau, hỗ trợ tối ưu hóa đèn tín hiệu, quản lý ùn tắc và ra quyết định điều phối.
  - Giám sát khí tượng và môi trường: trên lưới địa lý hoặc mạng lưới trạm quan trắc, dự báo phân bố không gian-thời gian trong tương lai của nhiệt độ, lượng mưa, sức gió, chất lượng không khí, v.v., cung cấp cơ sở cho dự báo và ra quyết định.
  - Điều phối logistics và di chuyển: trên cấu trúc khu vực đô thị hoặc mạng lưới đường, dự báo nhu cầu đơn hàng, phân bố phương tiện, tình trạng tải của kho/điểm dừng, làm cơ sở cho quy hoạch tuyến đường, điều phối phương tiện và phân bổ năng lực vận tải.
- **Nguyên lý**
  Cốt lõi của mô hình hóa không gian-thời gian là **học đồng thời tương quan không gian và động lực thời gian trong một khung thống nhất**:
  - Trên chiều không gian, thông qua cấu trúc đồ thị hoặc cấu trúc tích chập để mô tả "ai liên quan đến ai", và dựa trên đó thực hiện truyền thông điệp và tổng hợp đặc trưng;
  - Trên chiều thời gian, sử dụng RNN, TCN, Transformer hoặc các cấu trúc chuỗi thời gian chuyên biệt để mô tả biến động động lực;
  - Hai chiều này có thể được nối tiếp (xử lý không gian trước, rồi đến thời gian), hoặc đan xen/đồng thời (như tích chập không gian-thời gian, attention không gian-thời gian).
- **Mô hình**
  Phần lớn các mô hình không gian-thời gian điển hình áp dụng hình thái kết hợp "GNN + mô hình chuỗi thời gian" hoặc "tích chập + LSTM":
  - Mạng nơ-ron đồ thị + mô hình chuỗi thời gian: ST-GCN, DCRNN, Graph WaveNet, ST-Transformer, v.v., sử dụng tích chập đồ thị hoặc attention đồ thị để nắm bắt phụ thuộc không gian, sau đó dùng cấu trúc chuỗi thời gian để nắm bắt động lực thời gian.
  - Mô hình dạng LSTM tích chập: ConvLSTM, Conv-TT-LSTM, v.v., nhúng cổng tích chập không gian vào trong đệ quy thời gian, thực hiện mô hình hóa kết hợp các đặc trưng cục bộ không gian-thời gian.

Dưới đây, chúng ta sẽ triển khai theo ba hướng: tác vụ không gian-thời gian và biểu diễn dữ liệu, GNN + mô hình chuỗi thời gian, ConvLSTM và tích chập không gian-thời gian.

### 6.5.1 Tác Vụ Không Gian-Thời Gian và Biểu Diễn Dữ Liệu: Từ Mạng Lưới Đường Đến Lưới Địa Lý

Trước khi đi vào các mô hình cụ thể, vấn đề đầu tiên cần giải quyết trong mô hình hóa không gian-thời gian là **làm thế nào để biểu diễn cấu trúc không gian**. Không giống trục thời gian một chiều, cấu trúc không gian có thể là lưới đều (grid), đồ thị không đều (graph), hoặc dạng kết hợp.

- Trong tình huống giao thông, đường và giao lộ tự nhiên tạo thành một đồ thị có hướng hoặc vô hướng: nút biểu thị đoạn đường hoặc giao lộ, cạnh biểu thị kết nối đường và hướng di chuyển; mỗi nút tại mỗi bước thời gian có một tập đặc trưng, như lưu lượng xe, tốc độ trung bình, chỉ số ùn tắc, v.v.
- Trong dự báo khí tượng và chất lượng không khí, có thể sử dụng lưới địa lý đều (như lưới kinh độ-vĩ độ), hoặc xây dựng quan hệ lân cận giữa các trạm quan trắc thành cấu trúc đồ thị, định nghĩa trọng số cạnh dựa trên khoảng cách địa lý, hướng gió hoặc độ tương quan.
- Trong tình huống logistics và di chuyển chia sẻ, có thể chia thành phố thành các ô lưới hoặc đơn vị khu vực, mỗi đơn vị theo thời gian có các đặc trưng như số lượng đơn hàng, số phương tiện hoạt động, đồng thời được kết nối trong không gian thông qua quan hệ lân cận hoặc khoảng cách đường thực tế.

Biểu diễn thống nhất "**cấu trúc không gian + chuỗi thời gian**" này cho phép nhiều tình huống khác nhau được mô hình hóa thành bài toán tương tự: với chuỗi không gian-thời gian lịch sử cho trước, dự báo trạng thái của từng nút hoặc ô lưới trong một số bước thời gian tương lai. Thiết kế mô hình tiếp theo (dù là GNN + mô hình chuỗi thời gian, hay ConvLSTM) đều được triển khai trên góc nhìn thống nhất này.

Ở cấp độ sản phẩm, lớp trừu tượng này thường được đóng gói trong tầng dữ liệu và tầng mô hình hóa của **nền tảng điện toán đô thị, hệ thống dự báo khí tượng/môi trường, nền tảng quy hoạch tuyến đường và điều phối**: phía nghiệp vụ chỉ cần biết "chúng ta dự báo lưu lượng/nhu cầu tương lai trên mạng lưới đường/lưới như thế nào", còn biểu diễn dữ liệu và hợp nhất không gian-thời gian ở tầng dưới được khung mô hình hóa xử lý thống nhất.

### 6.5.2 Mạng Nơ-ron Đồ Thị + Mô Hình Chuỗi Thời Gian: ST-GCN, DCRNN, Graph WaveNet, v.v.

Mô hình hóa chuỗi không gian-thời gian trên cấu trúc đồ thị, hướng tiếp cận chủ đạo hiện nay là sự kết hợp "**Mạng nơ-ron đồ thị (GNN) + mô hình chuỗi thời gian**". Các mô hình tiêu biểu bao gồm **ST-GCN, DCRNN, Graph WaveNet, ST-Transformer**, v.v., với những đặc điểm chung là:

- Trên chiều không gian, sử dụng tích chập đồ thị (GCN), attention đồ thị (GAT) hoặc tích chập miền phổ để thực hiện "tổng hợp lân cận" trên đặc trưng nút tại mỗi bước thời gian, từ đó nắm bắt phụ thuộc không gian và ảnh hưởng của cấu trúc tô-pô;
- Trên chiều thời gian, thông qua RNN (như GRU/LSTM), TCN, hoặc Transformer để mô hình hóa chuỗi trên đặc trưng cấp nút, nắm bắt xu hướng thời gian và tính chu kỳ;
- Thông qua xếp chồng luân phiên hoặc thiết kế kết hợp, cho phép mô hình học các mẫu cục bộ và toàn cục trên nhiều tỷ lệ không gian-thời gian.

Ví dụ, **DCRNN (Diffusion Convolutional RNN)** kết hợp tích chập đồ thị với đơn vị hồi quy có cổng, sử dụng tích chập khuếch tán để mô phỏng sự lan truyền thông tin trên mạng lưới đường, sau đó dùng RNN để nắm bắt động lực trên chiều thời gian, rất phù hợp cho các tác vụ như dự báo lưu lượng giao thông. **Graph WaveNet** thì trên nền tảng tích chập đồ thị và tích chập thời gian, bổ sung thêm học cấu trúc đồ thị thích ứng và mô hình hóa đa tỷ lệ, nâng cao khả năng thích ứng với mạng lưới đường phức tạp và tô-pô không đều. **ST-Transformer** và các mô hình tương tự đưa cơ chế tự attention vào mô hình hóa không gian-thời gian, thông qua mô-đun attention không gian-thời gian để đồng thời xem xét tương quan giữa các vị trí thời gian và không gian khác nhau.

Trong các hệ thống thực tế, nhóm mô hình GNN + chuỗi thời gian này được triển khai rộng rãi trong các sản phẩm như **nền tảng dự báo giao thông và luồng người đô thị, hệ thống điều phối di chuyển chia sẻ, giám sát mạng IoT phức tạp**. Chúng thường đóng vai trò là một trong những công cụ dự báo cốt lõi, cùng với hệ thống quy tắc, mô hình mô phỏng và chiến lược nghiệp vụ tạo thành vòng khép kín, giúp cho việc điều phối và quy hoạch vừa xem xét được cấu trúc toàn cục, vừa phản ứng được với biến động cục bộ.

### 6.5.3 ConvLSTM và Tích Chập Không Gian-Thời Gian: ConvLSTM, Conv-TT-LSTM, v.v.

Một hướng quan trọng khác là mô hình hóa không gian-thời gian dựa trên **ConvLSTM (LSTM tích chập)** và các biến thể của nó. Không giống LSTM tiêu chuẩn truyền vector một chiều giữa các bước thời gian, ConvLSTM sử dụng toán tử tích chập trong cấu trúc cổng, khiến cho trạng thái ẩn và đầu vào đều được duy trì dưới dạng tensor đa chiều (như bản đồ đặc trưng trên lưới không gian). Như vậy, trong mỗi lần cập nhật trạng thái theo bước thời gian, vừa bao hàm đệ quy theo thời gian, vừa thực hiện tổng hợp tích chập cục bộ trên chiều không gian, đạt được mô hình hóa tự nhiên các mẫu cục bộ không gian-thời gian.

Trên nền tảng này, **các mô hình cải tiến như Conv-TT-LSTM** cố gắng thông qua các cơ chế như phân rã tensor, chia sẻ tham số, tích chập đa tỷ lệ để nâng cao năng lực biểu đạt và hiệu quả của mô hình, thích ứng với dữ liệu không gian-thời gian quy mô lớn hơn và phức tạp hơn. Ví dụ, trong dự báo khí tượng, có thể sử dụng ConvLSTM xếp chồng nhiều tầng, thực hiện đệ quy không gian-thời gian trên bản đồ các yếu tố khí tượng đa kênh (nhiệt độ, độ ẩm, hướng gió, v.v.), từ một số khung hình lịch sử dự báo phân bố không gian trong vài giờ hoặc vài ngày tới; trong giao thông và giám sát môi trường, cũng có thể ánh xạ mạng lưới đường hoặc điểm quan trắc lên lưới đều, sử dụng ConvLSTM và các mô hình tương tự để dự báo.

So với nhóm GNN + mô hình chuỗi thời gian, dòng ConvLSTM được sử dụng nhiều hơn trong các tình huống có **cấu trúc lưới đều, tính trơn cục bộ không gian rõ rệt**, như dự báo ảnh radar khí tượng, dự báo lưới chất lượng không khí, dự báo cấp khung hình video, v.v. Ưu điểm của nó nằm ở chỗ triển khai tương đối trực tiếp, dễ tận dụng cơ sở hạ tầng mạng tích chập hiện có để tăng tốc và triển khai, cũng như dễ kết hợp với các mô hình thị giác như CNN/ViT, chẳng hạn như trong mô hình hóa không gian-thời gian ảnh viễn thám kết hợp đặc trưng tích chập và đệ quy thời gian.

Về hình thái sản phẩm, các mô hình theo hướng này phần lớn được dùng trong **hệ thống dự báo khí tượng/môi trường, nền tảng phân tích không gian-thời gian viễn thám, dự báo không gian-thời gian video và hình ảnh**, v.v., thường phơi bày năng lực lên tầng trên dưới dạng "bản đồ dự báo tình huống không gian-thời gian tương lai", trở thành đầu vào quan trọng cho quyết định nghiệp vụ và phân tích trực quan.# 7. Agent & Tool Use (Tác nhân & Sử dụng công cụ)

Trong các lớp năng lực trước đó như thị giác, ngôn ngữ, mô hình phần lớn vẫn ở dạng "trả lời thụ động" — nhận đầu vào và đưa ra đầu ra. Tuy nhiên, trong nhiều nghiệp vụ thực tế, điều chúng ta cần là một **tác nhân thông minh (Agent) có khả năng chủ động lập kế hoạch, gọi các công cụ bên ngoài và điều phối quy trình làm việc**: nó không chỉ có thể nhìn/hiểu/nghe, mà còn có thể tự "quyết định bước tiếp theo nên làm gì", chẳng hạn như tra cứu tài liệu, chạy mã, đọc/ghi tệp, gọi hệ thống nội bộ, sau đó tổng hợp, diễn giải và phản hồi lại cho người dùng.

Lớp này có thể được hiểu là lớp kết dính then chốt giúp "biến mô hình nền tảng thành một hệ thống có khả năng hành động": thông qua **giao diện gọi công cụ có cấu trúc, điều phối quy trình làm việc, cộng tác đa Agent và cơ chế Human-in-the-loop**, mở rộng LLM từ một "lõi nhận thức" mạnh mẽ thành một "nhân viên số" có thể hoàn thành các tác vụ end-to-end.## 7.1 Công Cụ Gọi và Thực Thi (Tool Calling / Function Calling)

Trong thời kỳ của văn bản thuần túy — chỉ đọc mà không viết, chỉ nói mà không làm — LLM giống như một "siêu đối thoại viên": có thể hiểu câu hỏi, đưa ra gợi ý, viết mã, liệt kê phương án, nhưng mọi công việc "thực thi thực sự" — truy vấn cơ sở dữ liệu, chạy script, tạo tệp, gọi dịch vụ đám mây — vẫn cần con người tiếp quản. Sự xuất hiện của **Tool Calling / Function Calling** lần đầu tiên cho phép mô hình "ra tay hành động" trong ranh giới an toàn: dựa trên ngôn ngữ tự nhiên, tự động tạo tham số có cấu trúc để gọi các năng lực bên ngoài như công cụ tìm kiếm, cơ sở dữ liệu, công cụ tính toán, dịch vụ tạo hình ảnh/âm thanh/video, sau đó tổng hợp kết quả thực thi và trả về, từ đó hình thành vòng lặp khép kín "hiểu → quyết định → thực thi".

Từ góc độ sản phẩm, Tool Calling là "năng lực nền tảng" của hầu hết các hệ thống Agent: OpenAI Assistants API, LangChain, LlamaIndex, AutoGen, cùng các nền tảng Agent của các nhà cung cấp đám mây, về bản chất đều xây dựng một tầng runtime bên trên LLM, xoay quanh **cách định nghĩa công cụ, cách để mô hình chọn đúng công cụ, cách xử lý lỗi và thử lại**. Dưới đây, chúng ta sẽ cùng phân tích năng lực này từ ba góc độ: **kịch bản**, **nguyên lý** và **mô hình**, và trong các tiểu mục tiếp theo sẽ lần lượt triển khai ba hướng: "Thiết kế giao diện gọi công cụ", "Lựa chọn và chiến lược công cụ", "Các loại công cụ điển hình".

- **Kịch bản**
  - Hỏi đáp thông minh và tăng cường truy xuất: Mô hình tự động quyết định có gọi công cụ truy xuất hay không (tìm kiếm vector/từ khóa), truy vấn cơ sở tri thức nội bộ doanh nghiệp hoặc tìm kiếm trên web công cộng, rồi tích hợp tài liệu, FAQ tìm được vào câu trả lời cuối cùng.
  - Tự động hóa dữ liệu và báo cáo: Trước các yêu cầu như "tra cứu doanh thu trong khoảng thời gian này và vẽ biểu đồ", "tính chỉ số rủi ro của danh mục đầu tư này", mô hình tự động tạo SQL hoặc tham số phân tích, gọi cơ sở dữ liệu và công cụ tính toán, trả về biểu đồ và kết luận.
  - Thao tác tài liệu và tệp: Tự động đọc PDF/Word/Excel/bảng cơ sở dữ liệu, trích xuất và tổng hợp thông tin then chốt, hoặc theo chỉ thị tạo tệp mới (như báo cáo, hợp đồng, phương án), và tải lên/lưu trữ vào vị trí chỉ định thông qua công cụ.
  - Tạo và xử lý media: Dựa trên chỉ thị văn bản, gọi dịch vụ tạo hình ảnh/âm thanh/video/3D, hoặc thực hiện cắt, nén, chuyển mã, đóng watermark lên media hiện có, tạo thành pipeline nội dung "văn bản + thiết kế + xuất ra" chỉ với một cú nhấp chuột.
- **Nguyên lý**
  Cốt lõi của Tool Calling là: **dùng ngôn ngữ tự nhiên để điều khiển lời gọi hàm có cấu trúc**.
  - Trước tiên, dưới dạng JSON Schema hoặc chữ ký hàm, phơi bày tên, mô tả, cấu trúc tham số (kiểu, trường bắt buộc, giá trị liệt kê, v.v.) của công cụ bên ngoài cho LLM.
  - Khi người dùng gửi yêu cầu, LLM không chỉ cần hiểu ngữ nghĩa mà còn phải phán đoán "có cần gọi công cụ nào không", "cần (những) công cụ nào", "nên điền tham số cho các công cụ đó ra sao".
  - Một khi mô hình quyết định gọi một công cụ, nó sẽ tạo ra một đoạn tham số có cấu trúc (thường là JSON), để runtime thực sự thực thi API/chương trình bên ngoài, rồi trả kết quả thực thi về cho mô hình dưới dạng có cấu trúc, để mô hình dựa trên kết quả đó tiếp tục suy luận hoặc tạo câu trả lời cuối cùng.
  - Để đảm bảo an toàn và tính robust, hệ thống cần xử lý kiểm tra tham số, timeout, phản hồi lỗi, thử lại và fallback trong quá trình này, đồng thời thực hiện kiểm soát quyền và kiểm toán đối với các lời gọi có thể liên quan đến bảo mật/quyền riêng tư.
- **Mô hình**
  Các mô hình và framework hỗ trợ năng lực này chủ yếu gồm ba loại:
  - LLM hỗ trợ Function Calling: như GPT-4.1 / dòng o, v.v., nguyên bản hiểu "chữ ký công cụ + JSON Schema" ở tầng giải mã, có thể chủ động hoặc bị động tạo ra tham số gọi có cấu trúc vào thời điểm thích hợp.
  - Mô hình suy luận tăng cường công cụ: như ReAct, Toolformer, đan xen "suy nghĩ + gọi công cụ" vào cùng một chuỗi suy luận, coi việc sử dụng công cụ như một phần của bước trung gian, thay vì chỉ là tiền/hậu xử lý đơn thuần.
  - Framework kỹ thuật và runtime: OpenAI Assistants API, LangChain, LlamaIndex, AutoGen, các nền tảng Agent của nhà cung cấp đám mây, v.v., cung cấp hạ tầng cho định nghĩa công cụ, định tuyến lời gọi, quản lý trạng thái, xử lý lỗi và kiểm toán nhật ký, cho phép nhà phát triển tập trung vào "nên phơi bày những công cụ nào" và "trừu tượng hóa API nghiệp vụ ra sao", thay vì phải xây dựng runtime từ đầu.

### 7.1.1 Giao Diện Gọi Công Cụ: Từ Ngôn Ngữ Tự Nhiên Đến Lời Gọi Hàm Có Cấu Trúc

Một hệ thống gọi công cụ khả dụng trước hết cần một "tầng giao diện công cụ" rõ ràng, chuẩn hóa và thân thiện với LLM. Nó đảm nhận trách nhiệm đóng gói API, script, dịch vụ của thế giới bên ngoài thành các "hàm" mà mô hình có thể hiểu và gọi một cách an toàn, cho phép mô hình "nói ra" công cụ và tham số mà nó muốn gọi, giống như viết mã giả vậy.

- **Định nghĩa công cụ và lược đồ tham số**
  Ở tầng giao diện, mỗi công cụ thường được định nghĩa bằng cấu trúc tương tự JSON Schema hoặc chữ ký hàm: bao gồm tên (name), mô tả (description), các trường tham số (properties), kiểu (string / number / boolean / array / object), có bắt buộc hay không (required), phạm vi giá trị hoặc giá trị liệt kê, v.v.
  Một mặt, những thông tin này được dùng để điều khiển kiểm tra kiểu ở frontend/SDK; mặt khác, chúng cũng được cung cấp trực tiếp cho LLM, giúp mô hình "học" cách điền tham số chính xác. Mô tả càng rõ ràng, ràng buộc càng hợp lý, thì lời gọi do mô hình tạo ra càng chuẩn hóa và tỷ lệ lỗi càng thấp.
- **LLM tạo tham số có cấu trúc**
  Khi người dùng đưa ra yêu cầu như "tra cứu doanh thu Q3/2024 và vẽ biểu đồ cột phân tách theo khu vực", mô hình cần suy luận trước rằng: việc này ít nhất cần một "công cụ truy vấn báo cáo" (truy cập dữ liệu), và có thể còn cần một "công cụ tạo biểu đồ" (vẽ hình). Với mỗi công cụ, nó phải trích xuất và ánh xạ các tham số có cấu trúc từ ngôn ngữ thô, như phạm vi thời gian (start_date/end_date), chiều (region), chỉ số (revenue), loại biểu đồ (bar), định dạng đầu ra, v.v., rồi xuất ra JSON giao cho runtime.
  Trong quá trình này, mô hình về bản chất đang thực hiện suy luận tích hợp "ngôn ngữ tự nhiên → lập kế hoạch tác vụ → trích xuất/điền tham số", do đó, prompt mô tả công cụ bằng ngôn ngữ tự nhiên, ví dụ tham số và mẫu few-shot đều rất quan trọng.
- **Thực thi công cụ và trả kết quả về**
  Sau khi nhận được lời gọi JSON do mô hình tạo ra, runtime sẽ tiến hành kiểm tra tham số và kiểm tra an toàn trước, rồi mới thực sự gọi API hoặc chương trình backend. Sau khi thực thi xong, kết quả được đóng gói thành đối tượng có cấu trúc (như bảng kết quả truy vấn, URL tệp, ID tài nguyên media, v.v.) trả về cho mô hình.
  Tiếp đó, mô hình sẽ chuyển đổi những kết quả thô này thành lời giải thích mà người dùng có thể đọc được hoặc tiếp tục xử lý thêm, như tóm tắt báo cáo, tạo phân tích bằng ngôn ngữ tự nhiên, nhúng chú thích biểu đồ, v.v. Đối với mô hình, kết quả công cụ chỉ là một phần của thông tin trung gian; nó vẫn phải chịu trách nhiệm "hiểu kết quả + giải thích kết quả".

### 7.1.2 Lựa Chọn và Chiến Lược Công Cụ: Ra Quyết Định Trong Thế Giới Đa Công Cụ

Khi hệ thống chỉ có một công cụ duy nhất, "có nên dùng công cụ hay không" là câu hỏi duy nhất. Nhưng trong các ứng dụng Agent thực tế, thường có hàng chục, thậm chí hàng trăm công cụ: truy xuất từ các nguồn dữ liệu khác nhau, API nghiệp vụ của các phòng ban khác nhau, năng lực tạo/phân tích thuộc các lĩnh vực kỹ thuật khác nhau. Điều này dẫn đến một thách thức mới: **làm thế nào để mô hình lựa chọn và điều phối hợp lý trong môi trường đa công cụ**.

- **Lựa chọn và định tuyến công cụ**
  Trước hết, mô hình cần phán đoán "yêu cầu hiện tại có cần gọi công cụ hay không", và "cần gọi công cụ nào (hoặc những công cụ nào)". Điều này thường được thực hiện bằng cách liệt kê mô tả các công cụ khả dụng trong system prompt, kèm theo các ví dụ điển hình, để mô hình học cách chọn công cụ phù hợp dựa trên ý định của người dùng.
  Đối với các kịch bản có nhiều công cụ và mô tả tương tự nhau, nhiều framework sẽ giới thiệu "bộ định tuyến công cụ" (ví dụ: sàng lọc trước dựa trên truy xuất vector hoặc quy tắc), trước tiên lọc ra một số công cụ ứng viên từ danh sách lớn, rồi mới phơi bày cho LLM lựa chọn, qua đó giảm gánh nặng cho mô hình và xác suất chọn sai.
- **Thứ tự và kết hợp đa công cụ**
  Các tác vụ phức tạp thường cần nhiều công cụ phối hợp với nhau. Ví dụ, "nghiên cứu các công ty niêm yết chính trong một ngành và tạo báo cáo chứa biểu đồ so sánh tài chính" có thể liên quan đến công cụ tìm kiếm, cơ sở dữ liệu báo cáo tài chính, công cụ tính toán, công cụ tạo biểu đồ, công cụ xuất tài liệu, v.v.
  Trong trường hợp này, mô hình cần thực hiện lập kế hoạch tác vụ nhẹ: trước tiên dùng công cụ nào để lấy danh sách, rồi truy vấn thông tin chi tiết cho từng mục trong danh sách, sau đó hợp nhất dữ liệu, tính toán và trực quan hóa, cuối cùng gọi công cụ xuất để tạo báo cáo. Các thực tiễn điển hình bao gồm tư duy ReAct/Planner-Executor, để mô hình dần hoàn thành tổ hợp gọi công cụ trong vòng lặp "Suy nghĩ (Plan) — Gọi (Act) — Phản ánh (Reflect)".

### 7.1.3 Các Loại Công Cụ Điển Hình: Mảnh Ghép Năng Lực Từ Truy Xuất Đến Tạo Media

Các loại công cụ khác nhau cung cấp cho hệ thống Agent những "bộ não ngoại vi" ở các chiều khác nhau. Từ thực tiễn kỹ thuật, những loại công cụ dưới đây gần như là "cấu hình tiêu chuẩn" của mọi ứng dụng phức tạp.

- **Công cụ truy xuất: tìm kiếm vector và từ khóa**
  Công cụ truy xuất chịu trách nhiệm mở rộng "bộ nhớ" ra thế giới bên ngoài:
  - Tìm kiếm từ khóa phù hợp với tài liệu truyền thống và cơ sở dữ liệu nghiệp vụ có cấu trúc tốt, trường rõ ràng.
  - Tìm kiếm vector thông qua embedding xây dựng chỉ mục ngữ nghĩa cho văn bản phi cấu trúc, mã nguồn, bản ghi hội thoại, thậm chí dữ liệu đa phương thức, hỗ trợ truy xuất "mờ nhưng liên quan về ngữ nghĩa".
    Trong kịch bản RAG, LLM thông qua công cụ truy xuất kéo ngữ cảnh liên quan đến câu hỏi của người dùng, rồi suy luận và tạo sinh trên cơ sở đó, nâng cao đáng kể tính thời sự và độ chính xác của câu trả lời.
- **Công cụ thực thi mã và tính toán**
  Các công cụ thực thi mã (như sandbox Python/JS, trình thực thi Notebook) cho phép LLM "viết một đoạn mã và chạy ngay lập tức", giải quyết các vấn đề tính toán phức tạp, xử lý dữ liệu, mô phỏng số, trực quan hóa, v.v.
  Mô hình chịu trách nhiệm tạo mã và tham số đầu vào, môi trường thực thi chịu trách nhiệm cách ly an toàn, giới hạn tài nguyên và thu thập kết quả. Loại công cụ này rất quan trọng trong các kịch bản như phân tích dữ liệu, nghiên cứu định lượng, báo cáo tự động, tính toán khoa học, cũng như tự kiểm chứng của Agent (mô hình tạo câu trả lời rồi dùng mã để kiểm tra).
- **Truy cập tệp và nguồn dữ liệu**
  Công cụ đọc/ghi tệp chịu trách nhiệm đưa hệ thống tệp bên ngoài và nguồn dữ liệu vào tầm nhìn của Agent: đọc PDF/Word/Excel, truy cập bảng cơ sở dữ liệu, gọi API nghiệp vụ nội bộ, v.v. Mô hình thông qua các công cụ này thu thập dữ liệu nghiệp vụ thực tế, rồi tiến hành tổng hợp, so sánh và tạo báo cáo.
  Đi kèm còn có các công cụ ghi và quản lý tệp: lưu trữ bền vững báo cáo, biểu đồ, PPT, mã đã tạo, v.v., và trả về liên kết hoặc ID, thuận tiện cho người dùng truy cập và tích hợp sau này.
- **Công cụ tạo và xử lý media**
  Công cụ tạo media bổ sung thêm "cánh tay" sáng tạo và thiết kế cho Agent:
  - Tạo và chỉnh sửa hình ảnh/video: tự động tạo hình minh họa, poster, storyboard dựa trên văn bản, hoặc cắt, thêm phụ đề, đóng watermark lên media hiện có.
  - Tạo và xử lý âm thanh: TTS, lồng tiếng, tạo nhạc, tăng cường và cắt ghép âm thanh.
  - Công cụ 3D/kỹ thuật: tạo cảnh 3D đơn giản, bản phác CAD, nguyên mẫu UI, v.v.
    Trong sản xuất nội dung, thiết kế marketing, giáo dục đào tạo, trò chơi và ứng dụng đa phương tiện, loại công cụ này đưa quy trình "từ ý tưởng đến thành phẩm" tiến gần hơn đến một pipeline tự động hóa.

Tổng hợp lại, Tool Calling và thực thi mở rộng LLM từ "mô hình ngôn ngữ" thành "bộ điều khiển đa năng có giao diện hành động": mô hình hiểu nhu cầu và môi trường thông qua ngôn ngữ, thực thi thao tác thực tế thông qua công cụ, và liên tục điều chỉnh chiến lược thông qua phản hồi. Kết hợp với điều phối workflow và cộng tác đa Agent phù hợp (xem 7.2), sẽ tạo thành kiến trúc nền tảng cho thế hệ ứng dụng thông minh mới.## 7.2 Điều phối quy trình công việc & Hợp tác đa Agent (Workflow & Orchestration)

Với khả năng gọi công cụ, LLM không còn chỉ là "người trả lời câu hỏi", mà có thể trở thành một "đơn vị thực thi" hướng tới các tác vụ cụ thể. Tuy nhiên, thực tế kinh doanh thường phức tạp hơn nhiều so với một cuộc hội thoại đơn lẻ: một phân tích pháp lý toàn diện, một nghiên cứu thị trường, một vòng cấu hình thử nghiệm A/B, hay một quy trình xử lý vận hành end-to-end, thường đòi hỏi nhiều bước thao tác, nhiều loại công cụ, thậm chí có sự tham gia kéo dài của nhiều bên liên quan. Trong những tình huống này, mô hình LLM + công cụ đơn lẻ trở nên hạn chế, cần đến một tầng cao hơn: **điều phối quy trình công việc và hợp tác đa Agent**.

Nhìn từ góc độ hệ thống, trách nhiệm của tầng này là: **trừu tượng hóa một quy trình nghiệp vụ phức tạp, nhiều bước, nhiều bên tham gia thành một biểu đồ quy trình mà LLM có thể hiểu và điều khiển**, sau đó lập lịch cho một hoặc nhiều Agent trên biểu đồ đó, kết hợp với sự can thiệp của con người để cùng hoàn thành nhiệm vụ. Các triển khai điển hình bao gồm kiến trúc Agent Planner‑Executor, Agent có khả năng phản tư/tự sửa lỗi, và Workflow Orchestrator dựa trên cấu trúc đồ thị; các sản phẩm tương ứng là các nền tảng tự động tạo báo cáo và tự động hóa vận hành, tích hợp low-code workflow + LLM, robot quy trình nghiệp vụ phức tạp, hệ thống vận hành tự động, v.v.

- **Kịch bản**
  - Pipeline báo cáo và nội dung: từ "tiếp nhận yêu cầu → truy xuất và thu thập dữ liệu → phân tích và trực quan hóa → viết báo cáo → xem xét và chỉnh sửa → xuất và phân phối", tự động hóa hoặc bán tự động hóa quy trình sản xuất nội dung nhiều bước.
  - Tự động hóa quy trình nghiệp vụ: như "phân tích sản phẩm → giám sát đối thủ → tạo chiến lược chiến dịch → cấu hình triển khai" trong vận hành thương mại điện tử, hay "cảnh báo giám sát → phân tích nguyên nhân gốc → thực thi biện pháp giảm thiểu → báo cáo tổng kết" trong các kịch bản vận hành.
  - Hợp tác đa vai trò: cho phép các Agent thuộc các lĩnh vực khác nhau (pháp lý, tài chính, kỹ thuật, vận hành) cộng tác xoay quanh một dự án phức tạp, ví dụ như thẩm định M&A, chuẩn bị tài liệu đầu tư, biên soạn hồ sơ thầu quy mô lớn.
- **Nguyên lý**
  Cốt lõi của điều phối quy trình và hợp tác đa Agent là xây dựng thêm một tầng **kiểm soát có cấu trúc và quản lý trạng thái** bên trên LLM:
  - Phân rã các tác vụ phức tạp thành các tác vụ con có quan hệ phụ thuộc, biểu diễn bằng các cấu trúc như DAG / máy trạng thái / đồ thị có hướng, và cấu hình điều kiện kích hoạt, đầu vào/đầu ra, Agent/công cụ cần thiết cho mỗi nút.
  - Agent kiểu Planner hoặc orchestrator tầng trên quyết định khi nào kích hoạt nút nào, sử dụng Agent hoặc công cụ nào, và điều chỉnh động đường dẫn tiếp theo dựa trên kết quả thực thi (rẽ nhánh có điều kiện, vòng lặp, quay lui khi lỗi).
  - Đưa con người vào vòng lặp (Human‑in‑the‑loop) ở các bước then chốt, tiến hành xác nhận và chỉnh sửa thủ công đối với các quyết định rủi ro cao và đầu ra quan trọng, đồng thời đưa phản hồi của con người trở lại hệ thống để cập nhật chiến lược hoặc tinh chỉnh mô hình.
- **Mô hình**
  Các hướng kỹ thuật chính hỗ trợ tầng này bao gồm:
  - Kiến trúc Agent Planner‑Executor: một "Agent lập kế hoạch" chịu trách nhiệm phân rã tác vụ và thiết kế lộ trình, một hoặc nhiều "Agent thực thi" chịu trách nhiệm triển khai các bước cụ thể.
  - Agent phản tư / tự sửa lỗi: liên tục xem xét lại hiệu suất của chính mình trong quá trình thực thi, phản tư và sửa chữa các kết quả trung gian không hợp lý, giảm thiểu sự lan truyền âm thầm của các "lỗi tự tin".
  - Graph‑based Workflow Orchestrator: mô hình hóa toàn bộ luồng tác vụ thành cấu trúc đồ thị, đưa vào các cơ chế như trạng thái nút, điều kiện cạnh, kiểm soát song song/tuần tự, khiến việc gọi LLM trở thành một hoặc nhiều nút trong đồ thị, thay vì là trung tâm điều khiển duy nhất.

### 7.2.1 Phân rã và lập kế hoạch tác vụ: từ "nhu cầu một câu" đến quy trình có thể thực thi

Những gì người dùng đưa ra cho Agent thường là một câu yêu cầu bằng ngôn ngữ tự nhiên được nén cao độ, ví dụ như "giúp tôi làm một báo cáo nghiên cứu thị trường về ngành xe năng lượng mới và xuất ra PPT", đằng sau thực sự chứa đựng rất nhiều bước như truy xuất, sàng lọc, phân tích, trực quan hóa, trình bày, nhiều vòng chỉnh sửa. Cách xây dựng tự động một quy trình làm việc rõ ràng, có thể thực thi từ câu yêu cầu này, chính là bước đầu tiên của điều phối quy trình công việc.

- **Từ ngôn ngữ tự nhiên đến đồ thị tác vụ con**
  Trước hết, Agent kiểu Planner cần "mở rộng" yêu cầu: kết hợp với các mẫu tích hợp sẵn, ca lịch sử, và danh sách công cụ, xác định các giai đoạn then chốt (như thu thập thông tin, phân tích dữ liệu, thiết kế cấu trúc, viết nội dung, xem xét và xuất bản), rồi tiếp tục chi tiết hóa thành các tác vụ con có thể thực thi (như "truy xuất 5 báo cáo ngành uy tín trong năm gần đây", "lấy dữ liệu doanh số 3 năm gần đây và phân theo dòng xe", "tạo 3 biểu đồ so sánh", v.v.).
  Mối quan hệ phụ thuộc và logic lập lịch giữa các tác vụ con này sẽ được biểu diễn tường minh thành một đồ thị hoặc một máy trạng thái: những gì có thể chạy song song, những gì phải thực thi tuần tự, tại những nút nào cần xác nhận của con người, và trong điều kiện nào cần quay lui hoặc thử lại.
- **Rẽ nhánh có điều kiện, vòng lặp và đường dẫn ngoại lệ**
  Các quy trình thực tế thường không phải là pipeline tuyến tính, mà chứa **rẽ nhánh có điều kiện** (như "nếu không truy xuất được đủ báo cáo chất lượng cao thì đổi từ khóa hoặc đổi nguồn dữ liệu"), **vòng lặp** (như "liên tục thử viết lại và nén, cho đến khi độ dài báo cáo đáp ứng giới hạn") và **đường dẫn ngoại lệ** (như "khi một nguồn dữ liệu không thể truy cập, chuyển sang nguồn dự phòng hoặc sử dụng phương pháp ước tính").
  Điều này đòi hỏi tầng điều phối quy trình phải có khả năng biểu diễn ngữ nghĩa luồng điều khiển như if/else, while/for, try/catch trên cấu trúc đồ thị, và cho phép Planner Agent hoặc orchestrator tầng trên đưa ra quyết định dựa trên kết quả thời gian thực trong quá trình chạy, thay vì chỉ lập kế hoạch tất cả các bước một lần duy nhất ngay từ đầu.
- **Kết nối với việc gọi công cụ**
  Phân rã và lập kế hoạch tác vụ gắn kết chặt chẽ với việc gọi công cụ trong mục 7.1: khi Planner tạo ra các tác vụ con, nó thường đồng thời chỉ định "tác vụ đó cần sử dụng những công cụ/Agent nào" và "định dạng đầu vào/đầu ra của nút đó", đặt nền tảng cho việc tự động điền tham số và thực thi công cụ ở bước sau.
  Một số hệ thống áp dụng phương pháp "Plan + Execute" hai giai đoạn tường minh: trước tiên Planner xuất ra một kế hoạch mà máy có thể đọc được (ví dụ: mô tả quy trình dạng JSON), sau đó Executor gọi công cụ và Agent theo đúng kế hoạch; cũng có hệ thống sử dụng phong cách ReAct, đan xen "suy nghĩ–gọi công cụ–quan sát–suy nghĩ lại" trong cùng một cuộc hội thoại, để có được sự thực thi thích ứng linh hoạt hơn.

### 7.2.2 Hợp tác đa Agent: để "đội ngũ ảo" mỗi người một việc

Một mô hình lớn đơn lẻ tuy mạnh mẽ, nhưng trong các kịch bản nghiệp vụ phức tạp, các lĩnh vực khác nhau thường đòi hỏi cấu trúc tri thức, phong cách ưu tiên và chính sách an toàn khác nhau. Tư duy **hợp tác đa Agent** là phân rã một trí tuệ "lớn và toàn diện" thành nhiều vai trò "chuyên sâu và tinh gọn": có người phụ trách lập kế hoạch, có người phụ trách thực thi, có người phụ trách xem xét, có người phụ trách đánh giá chuyên môn lĩnh vực, tạo thành một đội ngũ ảo gồm Agent + công cụ + con người cùng hợp tác.

- **Phân công vai trò: lập kế hoạch, thực thi và xem xét**
  Trong một quy trình đa Agent điển hình, các vai trò phổ biến bao gồm:
  - Agent lập kế hoạch: chịu trách nhiệm hiểu yêu cầu người dùng, thiết kế kế hoạch tổng thể, phân rã tác vụ con, và trong quá trình thực thi điều chỉnh động lộ trình dựa trên kết quả.
  - Agent thực thi: được tối ưu hóa sâu xoay quanh một số công cụ hoặc lĩnh vực con (như Agent truy xuất, Agent phân tích dữ liệu, Agent viết nội dung), hoàn thành các bước cụ thể theo yêu cầu kế hoạch.
  - Agent xem xét: từ các góc độ cấu trúc, logic, nhất quán phong cách và kiểm soát rủi ro, kiểm tra và sửa đổi các đầu ra trung gian và cuối cùng, tương tự như một "biên tập viên/Reviewer ảo".
- **Cộng tác Agent chuyên gia lĩnh vực**
  Đối với các lĩnh vực có tính chuyên môn rất cao như pháp lý, tài chính, kỹ thuật, vận hành, có thể phân chia chi tiết hơn thành các Agent chuyên gia lĩnh vực: như "Agent cố vấn pháp lý", "Agent phân tích đầu tư", "Agent vận hành Cloud Native", "Agent tối ưu quảng cáo", v.v.
  Chúng có thể dựa trên cơ sở tri thức chuyên ngành, công cụ chuyên dụng, thậm chí mô hình được tinh chỉnh riêng, tham gia vào cộng tác kiểu dự án: ví dụ trong một tài liệu đầu tư, Agent kỹ thuật phụ trách phần khả thi kỹ thuật, Agent tài chính phụ trách mô hình tài chính và định giá, Agent pháp lý phụ trách tuân thủ và công bố rủi ro, Agent vận hành phụ trách chiến lược thị trường và tăng trưởng, sau đó Agent điều phối tổng tập hợp và thống nhất phong cách.
- **Giao thức cộng tác và định tuyến thông điệp**
  Mấu chốt của hợp tác đa Agent còn nằm ở "ai nói với ai vào lúc nào". Hệ thống cần một cơ chế định tuyến và điều phối thông điệp:
  - Quyết định yêu cầu người dùng hoặc kết quả trung gian nào nên được xử lý bởi Agent nào.
  - Duy trì ngữ cảnh chia sẻ và bộ nhớ riêng của từng Agent.
  - Kiểm soát thực thi song song và tuần tự, cũng như giải quyết xung đột (ví dụ như làm thế nào để phân xử khi các Agent khác nhau đưa ra đề xuất mâu thuẫn).
    Những năng lực này thường được cung cấp bởi orchestrator tầng trên hoặc "Agent quản lý", trong khi các framework như LangChain, AutoGen cung cấp hạ tầng ở cấp độ kỹ thuật như định tuyến hội thoại, phiên đa Agent, thiết lập vai trò.

### 7.2.3 Human‑in‑the‑loop: nắm giữ các điểm kiểm soát rủi ro trong tay

Ngay cả khi điều phối quy trình và hợp tác đa Agent thông minh đến đâu, trong thực tế kinh doanh vẫn không thể hoàn toàn tách rời phán đoán của con người, đặc biệt trong các kịch bản **rủi ro cao, chi phí cao, độ nhạy cảm cao**, như tuân thủ pháp lý, quyết định tài chính, tư vấn y tế, thay đổi sản xuất quy mô lớn, ứng phó dư luận, v.v. Thiết kế **Human‑in‑the‑loop** chính là nhằm tìm ra sự cân bằng giữa tự động hóa và khả năng kiểm soát: những gì nên tự động thì tự động, những gì cần xác nhận thủ công thì nhất định phải dừng lại để con người xem xét.

- **Xác nhận thủ công ở các bước then chốt**
  Trong biểu đồ quy trình, thường sẽ đánh dấu tường minh một số "nút phê duyệt/xác nhận thủ công":
  - Ví dụ khi tự động tạo hợp đồng, trước khi phát hành cần có xác nhận kép từ bộ phận pháp lý và người phụ trách kinh doanh;
  - Trong hệ thống vận hành tự động, đối với các thao tác liên quan đến thay đổi môi trường sản xuất, khởi động lại hàng loạt, sửa đổi cấu hình, phải có kỹ sư trực nhấn xác nhận;
  - Trong các kịch bản tạo nội dung, đối với nội dung công bố rộng rãi hoặc nhạy cảm về thương hiệu, cần có con người xem xét bản thảo.
    Orchestrator sẽ tạm dừng thực thi tự động tại các nút này, gửi kết quả trung gian cho vai trò con người tương ứng, và sau khi nhận được phản hồi mới tiếp tục quy trình sau đó.
- **Cập nhật chiến lược dựa trên phản hồi**
  Con người không chỉ "nhấn thông qua hoặc từ chối" tại một thời điểm nào đó, điều quan trọng hơn là nội dung phản hồi có thể được hệ thống hấp thụ:
  - So sánh phiên bản sau khi con người chỉnh sửa với đầu ra gốc, ghi lại như các "mẫu tích cực/tiêu cực", dùng cho việc tối ưu prompt hoặc tinh chỉnh mô hình sau này.
  - Dựa trên phân tích thống kê, xác định những loại tác vụ/bước nào dễ bị con người sửa đi sửa lại nhiều nhất, từ đó tối ưu prompt, tổ hợp công cụ hoặc thiết kế quy trình của Agent tương ứng.
  - Trong các ca cực đoan hoặc bất thường, con người có thể thêm "danh sách đen / danh sách trắng / quy tắc đặc biệt", ảnh hưởng trực tiếp đến lựa chọn chiến lược của hệ thống trong các tình huống tương tự.
- **Phân cấp rủi ro và khả năng quan sát**
  Cuối cùng, Human‑in‑the‑loop còn cần một bộ cơ chế phân cấp rủi ro và khả năng quan sát rõ ràng:
  - Dựa trên các chiều như loại tác vụ, phạm vi ảnh hưởng, quy mô giá trị, thông tin nhạy cảm liên quan, phân loại quy trình thành các cấp độ rủi ro khác nhau, tương ứng với các mức độ can thiệp khác nhau của con người (như chỉ đọc xem xét, phê duyệt bắt buộc, phê duyệt đa cấp).
  - Thông qua nhật ký, kiểm toán, bảng điều khiển trực quan hóa, cho phép nhân viên vận hành/quản lý có thể theo dõi bất cứ lúc nào những tác vụ nào đang chạy, chạy đến bước nào rồi, những chỗ nào đã kích hoạt can thiệp thủ công, trong lịch sử đã từng xuất hiện những thất bại và sửa chữa thủ công nào.
    Những năng lực này không chỉ nâng cao khả năng chấp nhận của hệ thống trong doanh nghiệp, mà còn cung cấp nền tảng cho việc xem xét tuân thủ và phân định trách nhiệm sau này.

Nhìn tổng thể, gọi công cụ và thực thi (7.1) giải quyết vấn đề "hành động đơn bước", còn điều phối quy trình công việc và hợp tác đa Agent (7.2) cố gắng trả lời câu hỏi "làm thế nào để nối nhiều bước lại với nhau, cho phép các vai trò khác nhau cộng tác lâu dài và vận hành có kiểm soát". Sự kết hợp của cả hai, cùng với Human‑in‑the‑loop và thực hành kỹ thuật tốt, tạo thành nền tảng ứng dụng thông minh thế hệ mới hướng tới các kịch bản kinh doanh thực tế.# 8. Tầng Truy xuất & Tri thức (Retrieval & Knowledge)

Trong các tầng Thị giác và Hiểu biết trước đó, mô hình chủ yếu dựa vào "kiến thức đã học được trong tham số của chính nó" để hiểu và tạo nội dung. Nhưng trong thực tế kinh doanh, nhiều vấn đề không thể chỉ giải quyết bằng "trí nhớ": chính sách nội bộ doanh nghiệp thay đổi hàng ngày, quy định và tiêu chuẩn ngành liên tục cập nhật, lịch sử của một khách hàng cụ thể chỉ tồn tại trong cơ sở dữ liệu nội bộ. Lúc này, chỉ dựa vào kiến thức "thuộc lòng" của mô hình là hoàn toàn không đủ, điều quan trọng hơn là liệu có thể **truy xuất và suy luận hiệu quả trên kho tri thức bên ngoài, dữ liệu có cấu trúc và đồ thị tri thức** hay không.

Có thể hiểu tầng này như sau: trên nền tảng năng lực của mô hình, bổ sung thêm một "bộ não ngoài biết tra cứu tài liệu và sử dụng cơ sở dữ liệu". Khi người dùng đặt câu hỏi, hệ thống không còn trực tiếp tạo câu trả lời nữa, mà trước tiên sẽ "lục tài liệu" trong các nguồn dữ liệu phù hợp: kho tài liệu, cơ sở dữ liệu, công cụ tìm kiếm, đồ thị tri thức, nhật ký và hệ thống nghiệp vụ... sau đó mới để mô hình đưa ra câu trả lời và quyết định dựa trên nội dung thực sự được truy xuất. Cách làm này không chỉ cải thiện đáng kể độ chính xác và tính thời sự, mà còn nâng cao đáng kể khả năng giải thích và tuân thủ (ví dụ: có thể trích dẫn nguồn gốc, lưu giữ bản ghi SQL đã thực thi, v.v.).

Xoay quanh tầng này, các năng lực phổ biến có thể chia thành hai hướng: một là **Truy xuất Tăng cường Sinh (RAG)**, chủ yếu hướng tới "hỏi đáp ngôn ngữ tự nhiên + truy xuất tài liệu/kho tri thức"; hai là **Dữ liệu có Cấu trúc & Đồ thị Tri thức (Structured Data & KG)**, chịu trách nhiệm truy cập và suy luận chính xác, có kiểm soát hơn đối với cơ sở dữ liệu, cơ sở dữ liệu đồ thị và nền tảng tri thức miền. Dưới đây sẽ lần lượt trình bày chi tiết.## 8.1 Tạo sinh tăng cường truy xuất (RAG)

RAG (Retrieval‑Augmented Generation) có thể được xem như một "LLM biết tra cứu tài liệu". Khác với việc chỉ dựa hoàn toàn vào tham số nội tại của mô hình, RAG trước khi trả lời mỗi câu hỏi đều sẽ truy xuất từ kho tri thức bên ngoài, tìm ra một số đoạn tài liệu (chunk) liên quan nhất đến câu hỏi, sau đó đưa những nội dung truy xuất được này làm "ngữ cảnh" cho LLM, để mô hình tạo ra câu trả lời dựa trên "tài liệu đã xem". Đối với các tình huống như hỏi đáp kho tri thức doanh nghiệp, tìm kiếm báo cáo ngành, hỏi đáp chuyên ngành pháp lý/y tế/tài chính, robot tìm kiếm tài liệu nội bộ, RAG đã trở thành mô hình mặc định.

Về kiến trúc hệ thống, một RAG điển hình có thể được phân tách thành ba tầng: **tầng xây dựng chỉ mục, tầng truy xuất, tầng tạo sinh**. Hai tầng đầu chủ yếu đảm bảo "truy xuất chính xác", tầng sau chịu trách nhiệm "diễn đạt rõ ràng". Dưới đây sẽ triển khai từ ba tầng này và đi sâu hơn vào các thiết kế cốt lõi và thực tiễn trong các tiểu mục cấp hai.

- **Tình huống**
  - Hỏi đáp tri thức nội bộ doanh nghiệp: nhân viên dùng ngôn ngữ tự nhiên để hỏi về quy trình chế độ, tài liệu kỹ thuật, tài liệu dự án, hệ thống dựa trên tài liệu nội bộ và Wiki truy xuất nội dung liên quan, sau đó LLM tạo ra câu trả lời rõ ràng kèm trích dẫn.
  - Báo cáo ngành và tìm kiếm nghiên cứu: truy xuất nội dung liên quan đến một vấn đề ngành (như "thay đổi chính sách trợ cấp xe năng lượng mới") từ lượng lớn PDF, báo cáo và bài báo, rồi tự động tóm tắt, so sánh và liệt kê nguồn.
  - Hỏi đáp lĩnh vực pháp lý / y tế / tài chính: dựa trên các tài liệu có thẩm quyền như điều khoản pháp luật, văn bản phán quyết, hướng dẫn lâm sàng, hướng dẫn sử dụng sản phẩm để tăng cường truy xuất, giảm thiểu rủi ro "bịa đặt".
  - Robot tìm kiếm tài liệu nội bộ / phiếu công việc: giúp nhân viên vận hành, chăm sóc khách hàng, nghiên cứu phát triển nhanh chóng định vị câu trả lời trong kho tri thức, phiếu công việc và bản ghi thay đổi, đồng thời tóm tắt kết quả bằng ngôn ngữ tự nhiên.
- **Nguyên lý**
  Tư tưởng cốt lõi của RAG là "lưu trữ tri thức ở bên ngoài, giao suy luận cho mô hình":
  - Chia các tài liệu phi cấu trúc (PDF, trang web, Word, tài liệu kỹ thuật, v.v.) thành các khối tài liệu (chunk) phù hợp cho truy xuất, sử dụng mô hình Embedding để ánh xạ chúng vào không gian vector, và xây dựng chỉ mục vector (như FAISS, Milvus, PGVector, v.v.).
  - Khi người dùng truy vấn, đồng thời sử dụng truy xuất vector ngữ nghĩa và truy xuất từ khóa (Hybrid Search), tìm ra một số khối tài liệu liên quan nhất đến câu hỏi, rồi sắp xếp lại (Re‑ranking) dựa trên mức độ liên quan và độ bao phủ.
  - Đưa ngữ cảnh đã truy xuất, câu hỏi của người dùng, cùng các chỉ thị hệ thống/ràng buộc định dạng cần thiết vào LLM, để mô hình trả lời trong khuôn khổ "bằng chứng khả kiến", đồng thời trích dẫn nguồn (source citation) trong đầu ra, nhằm nâng cao khả năng giải thích và khả năng kiểm toán.
- **Mô hình**
  Hệ thống RAG điển hình thường là một **kiến trúc kết hợp mô hình**:
  - Mô hình Embedding: dùng để mã hóa truy vấn và khối tài liệu vào cùng một không gian ngữ nghĩa, là yếu tố then chốt cho hiệu quả truy xuất vector (bao gồm Embedding đa dụng và Embedding tùy chỉnh theo lĩnh vực).
  - Mô hình truy xuất và sắp xếp lại: Hybrid Search (như BM25 + Vector) chịu trách nhiệm thu hồi vòng đầu, Cross‑Encoder Re‑ranker hoặc chính LLM được dùng để sắp xếp lại tinh vi hơn các kết quả thu hồi.
  - Mô hình tạo sinh: LLM trả lời dựa trên ngữ cảnh truy xuất được cung cấp; trong các RAG / HyDE / ReAct + RAG phức tạp hơn, LLM còn tham gia vào các quá trình như "tạo tài liệu giả", "gọi công cụ đa vòng", "suy nghĩ + truy xuất xen kẽ", nhằm cải thiện khả năng thu hồi, giảm thiểu bỏ sót và tăng cường năng lực suy luận.### 8.1.1 Xây dựng chỉ mục và tổ chức tài sản tri thức

Trong bất kỳ hệ thống RAG nào, xây dựng chỉ mục luôn là nền tảng. Nếu không có chỉ mục chất lượng cao, thì dù LLM có mạnh đến đâu đi nữa cũng chỉ như "người thợ khéo không thể làm nên món ăn nếu thiếu nguyên liệu". Mục tiêu của việc xây dựng chỉ mục là chuyển đổi các tài nguyên tài liệu lộn xộn thành "tài sản tri thức có thể truy xuất, có thể bảo trì và có thể mở rộng".

Nhìn từ góc độ quy trình, việc xây dựng chỉ mục điển hình bao gồm các bước then chốt sau:

1. **Phân đoạn tài liệu và tiền xử lý**
   Tài liệu thường là các tệp PDF, PPT, Word hoặc trang web dài. Nếu vector hóa trực tiếp toàn bộ tài liệu, sẽ dễ gây ra hiện tượng "pha loãng" (một tài liệu chứa nhiều chủ đề khác nhau) và không có lợi cho việc truy xuất hiệu quả. Do đó cần:
   1. Phân đoạn theo đoạn văn, tiêu đề, số trang, cấu trúc chương mục, cân bằng giữa "tính toàn vẹn ngữ nghĩa" và "kích thước đoạn";
   2. Xử lý các vấn đề về định dạng (bảng biểu, công thức, OCR văn bản trong hình ảnh), khử nhiễu (đầu trang chân trang, mục lục, thông tin bản quyền, v.v.);
   3. Tạo "nhãn ngữ cảnh" cho mỗi đoạn (như tài liệu gốc, tiêu đề chương, số trang), chuẩn bị cho việc diễn giải và trích dẫn sau này.
2. **Embedding và chỉ mục vector**
   Trên cơ sở phân đoạn, tạo vector ngữ nghĩa cho mỗi đoạn tài liệu:
   1. Chọn mô hình Embedding phù hợp (như Embedding ngữ nghĩa tổng quát, mô hình tinh chỉnh theo lĩnh vực), đảm bảo khả năng biểu đạt tốt đối với ngôn ngữ đích và thuật ngữ chuyên ngành;
   2. Sử dụng FAISS, Milvus, PGVector, v.v. để xây dựng chỉ mục vector cao chiều, hỗ trợ truy xuất láng giềng gần nhất xấp xỉ trên dữ liệu quy mô lớn;
   3. Xử lý đa phiên bản và cập nhật tăng dần: khi tài liệu được cập nhật, cần hỗ trợ chiến lược xây dựng lại chỉ mục tăng dần, thu thập phiên bản và dọn dẹp phiên bản cũ.
3. **Chỉ mục siêu dữ liệu và lọc**
   Vector ngữ nghĩa thuần túy không đủ để đáp ứng các nhu cầu lọc phức tạp, thông thường còn cần xây dựng **chỉ mục siêu dữ liệu**:
   1. Bổ sung siêu dữ liệu như thời gian, tác giả, nguồn, loại tài liệu, dòng nghiệp vụ, mức độ nhạy cảm cho mỗi đoạn tài liệu;
   2. Hỗ trợ lọc trước dựa trên siêu dữ liệu khi truy xuất (như phạm vi thời gian, phòng ban, mức độ quyền hạn), giảm thiểu kết quả không liên quan;
   3. Đặt nền tảng cho kiểm soát quyền và kiểm toán, tránh việc RAG làm rò rỉ nội dung mà người dùng không có quyền truy cập trong câu trả lời.### 8.1.2 Truy xuất & Xếp hạng lại: Từ "truy xuất liên quan" đến "tìm ra tập bằng chứng phù hợp nhất"

Sau khi xây dựng xong chỉ mục, khi người dùng gửi truy vấn, hệ thống sẽ bước vào giai đoạn truy xuất và xếp hạng lại. Điểm mấu chốt ở đây không chỉ đơn thuần là "tìm một vài tài liệu liên quan", mà còn là tìm ra **tập bằng chứng vừa liên quan, vừa có độ phủ đầy đủ, đồng thời hỗ trợ cho quá trình suy luận**.

1. **Hybrid Search: Kết hợp bổ trợ giữa vector và từ khóa**
   Truy xuất thuần vector rất giỏi trong việc nắm bắt độ tương đồng ngữ nghĩa, nhưng đối với các thuật ngữ chính xác, mã hiệu, trường bảng biểu, v.v., truy xuất từ khóa (như BM25) thường ổn định hơn. Do đó, trong thực tiễn kỹ thuật, Hybrid Search được áp dụng rộng rãi:
   1. Trước tiên, thực hiện đồng thời truy xuất vector và truy xuất từ khóa cho truy vấn, thu được hai tập khối tài liệu ứng viên;
   2. Sử dụng chiến lược chấm điểm có trọng số hoặc chiến lược hợp nhất đã được huấn luyện để gộp hai luồng ứng viên lại;
   3. Trong một số tình huống, có thể điều chỉnh linh động trọng số giữa truy xuất vector và từ khóa dựa trên loại truy vấn (hỏi đáp FAQ vs. định vị điều khoản pháp lý).
2. **Xếp hạng lại (Re‑ranking): Chọn lọc "tập bằng chứng" một cách tinh tế hơn**
   Kết quả truy xuất ban đầu thường chứa không ít khối tài liệu "liên quan ở mức ngoại vi" hoặc "dư thừa", do đó cần xếp hạng lại để nâng cao chất lượng Top‑K cuối cùng:
   1. Sử dụng Cross‑Encoder (bộ mã hóa chéo) để mã hóa hai chiều cặp "truy vấn – khối tài liệu" và chấm điểm độ liên quan; so với mô hình Embedding hai tháp (dual-tower), cách này có độ chính xác cao hơn nhưng chi phí tính toán lớn hơn, phù hợp làm bước xếp hạng lại ở giai đoạn hai;
   2. Khi hiệu năng cho phép, đưa LLM vào để thực hiện xếp hạng lại nhẹ, cho phép mô hình dựa trên ngữ nghĩa và ngữ cảnh phong phú hơn để phán đoán khối nào thực sự "hữu ích";
   3. Đồng thời xem xét độ phủ và tính đa dạng, tránh trường hợp tất cả các khối được truy xuất đều tập trung vào cùng một tài liệu hoặc cùng một đoạn văn, khiến phạm vi câu trả lời bị thu hẹp.
3. **Tối ưu hóa vòng kín Truy xuất – Sinh**
   Trong các thực tiễn nâng cao hơn, truy xuất và sinh không còn là quy trình một chiều mà tạo thành một vòng kín:
   1. Tận dụng LLM để phân tích "tình trạng sử dụng" của kết quả truy xuất (khối nào được trích dẫn, khối nào luôn bị bỏ qua), từ đó ngược dòng hướng dẫn việc tối ưu chỉ mục và chiến lược phân khối;
   2. Sử dụng tín hiệu "truy vấn tiếp theo/sửa lỗi" trong nhật ký hội thoại để gán nhãn và huấn luyện lại các mẫu bị truy xuất thất bại hoặc truy xuất sai, qua đó nâng cao tính ổn định của hệ thống đối với các truy vấn mơ hồ và câu hỏi đuôi dài.### 8.1.3 Sinh va trich dan: tra loi trong rang buoc bang chung

Mat xich cuoi cung la tang sinh noi dung, yeu to truc tiep quyet dinh trai nghiem nguoi dung. Muc tieu o day khong phai de mo hinh "tu do phat huy", ma la de no dua ra **cau tra loi ro rang, co ranh gioi va co trich dan trong rang buoc cua bang chung da truy xuat**.

1. **Sinh co kiem soat dua tren ngu canh da truy xuat**
   Trong kien truc RAG, LLM khong chi nhan cau hoi cua nguoi dung, ma con nhan nhieu khoi tai lieu da truy xuat va cac chi thi he thong. He thong thuong se:
   1. dung Prompt de rang buoc mo hinh "chi tra loi dua tren tai lieu duoc cung cap" va "neu khong tim thay cau tra loi trong tai lieu thi noi ro phan thieu";
   2. to chuc ngu canh truy xuat theo cau truc (doan, danh so, gan nhan nguon), giup mo hinh de hieu va de trich dan;
   3. kiem soat dinh dang dau ra (danh sach, bang, giai thich theo y, v.v.) de phu hop voi he thong phia sau hoac cach hien thi tren frontend.
2. **Trich dan va kha nang giai thich (Source Citation)**
   De thuan tien cho kiem toan va truy vet, dac biet trong cac linh vuc rui ro cao nhu phap ly, y te, tai chinh va quy dinh noi bo doanh nghiep, cau tra loi thuong can kem trich dan ro rang:
   1. danh dau nguon trong dau ra, chang han "[Tai lieu A, chuong 3, muc 2]" hoac "[Quy dinh X, dieu 12]";
   2. ho tro trong giao dien frontend viec nhay mot lan den vi tri van ban goc, de nguoi dung kiem tra va doc tiep;
   3. luu trong backend chuoi day du "cau hoi - ket qua truy xuat - khoi duoc trich dan - cau tra loi cuoi cung", cung cap du lieu cho quan tri rui ro va cai tien mo hinh sau nay.
3. **Cac bien the RAG nang cao: HyDE / ReAct + RAG, v.v.**
   De cai thien hieu qua trong cac tinh huong kho, thuc te con dung cac bien the RAG phuc tap hon:
   1. HyDE: LLM truoc tien sinh mot "tai lieu tra loi gia dinh" dua tren cau hoi, sau do dung vector cua tai lieu nay de truy xuat tai lieu that, qua do cai thien chat luong recall;
   2. ReAct + RAG: LLM theo cach "Reasoning + Action", goi cong cu truy xuat nhieu lan trong qua trinh suy luan, tung buoc lam ro cau hoi va bo sung bang chung, gan giong "vua suy nghi vua tra cuu tai lieu";
   3. RAG nhieu luot: trong qua trinh hoi thoai, giu lai ket qua truy xuat va cau tra loi truoc do, hinh thanh cuoc tro chuyen tri thuc dai han co nhan thuc ngu canh, thay vi chi la "mot cau hoi, mot lan truy xuat".
## 8.2 Dữ liệu có cấu trúc & Đồ thị tri thức (Structured Data & KG)

Nếu RAG chủ yếu giải quyết bài toán "làm thế nào để tra cứu tài liệu trong kho văn bản phi cấu trúc quy mô lớn", thì tầng dữ liệu có cấu trúc và đồ thị tri thức này hướng nhiều hơn đến "làm thế nào để sử dụng hiệu quả tri thức có cấu trúc trong cơ sở dữ liệu, hệ thống báo cáo và cơ sở dữ liệu đồ thị".

Trong môi trường doanh nghiệp, dữ liệu nghiệp vụ thực sự quan trọng — đơn hàng, khách hàng, hợp đồng, tồn kho, nhật ký hành vi — thường tồn tại dưới dạng cơ sở dữ liệu quan hệ, kho dữ liệu, engine OLAP hoặc cơ sở dữ liệu đồ thị. Các hệ thống này đã rất trưởng thành về khả năng truy vấn, hiệu suất tính toán và kiểm toán, nhưng đối với nhân viên nghiệp vụ, việc trực tiếp viết SQL / DSL vẫn có rào cản khá cao. **Text‑to‑SQL / Text‑to‑DSL** cùng với **hỏi đáp và suy luận trên đồ thị tri thức**, chính là để đưa LLM vào vai trò "giao diện ngôn ngữ tự nhiên" và "đối tác cộng tác suy luận", mà không phá vỡ tính ổn định của các hệ thống này.

- **Kịch bản**
  - Hỏi đáp thông minh BI & phân tích tự phục vụ: Nhân viên nghiệp vụ đặt câu hỏi bằng ngôn ngữ tự nhiên (ví dụ: "cho tôi xem xu hướng tỷ lệ mua lại của khách hàng mới khu vực Hoa Đông trong 3 tháng gần đây"), hệ thống tự động sinh SQL, truy vấn kho dữ liệu, sau đó trả về kết quả bằng ngôn ngữ tự nhiên và biểu đồ trực quan.
  - Trợ lý phân tích vận hành / bán hàng: Nhân viên vận hành có thể khám phá dữ liệu theo cách hội thoại ("tại sao tỷ lệ chuyển đổi của chiến dịch này giảm", "kênh nào đóng góp nhiều người dùng giá trị cao nhất"), dần dần tinh chỉnh điều kiện và chiều phân tích qua nhiều vòng đối thoại.
  - Nền tảng tri thức miền: Tổ chức thực thể, khái niệm, quy tắc và case study thành đồ thị tri thức, hỗ trợ khám phá mối quan hệ thượng-hạ du xoay quanh một thực thể và kiểm tra tuân thủ.
  - Hệ thống hỏi đáp & suy luận trên cơ sở dữ liệu đồ thị: Trong các kịch bản như kiểm soát rủi ro, chống rửa tiền, phân tích chuỗi cung ứng, kết hợp cơ sở dữ liệu đồ thị với LLM để trả lời và giải thích các câu hỏi dạng "chuỗi quan hệ" và "suy luận đa bước".
- **Nguyên lý**
  Cốt lõi của tầng này là biến LLM từ "người đưa ra câu trả lời trực tiếp" thành "trợ lý biết cách gọi cơ sở dữ liệu và cơ sở dữ liệu đồ thị":
  - Trong hỏi đáp cơ sở dữ liệu, mô hình cần hiểu ý định ngôn ngữ tự nhiên của người dùng, kết hợp với schema cơ sở dữ liệu (cấu trúc bảng, ý nghĩa trường, ràng buộc, v.v.), tạo ra SQL / GraphQL / DSL nội bộ chính xác, sau đó giải thích và trực quan hóa kết quả thực thi.
  - Trong kịch bản đồ thị tri thức, hệ thống cần trích xuất thực thể và quan hệ từ tài liệu và nhật ký trước, xây dựng đồ thị có cấu trúc; sau đó khi hỏi đáp, LLM chịu trách nhiệm chuyển đổi câu hỏi ngôn ngữ tự nhiên thành truy vấn đồ thị (như Cypher), rồi dựa trên kết quả truy vấn để thực hiện suy luận đa bước và giải thích.
  - Khác với RAG, điểm nhấn mạnh ở đây là **truy cập chính xác vào dữ liệu có cấu trúc và cấu trúc đồ thị**, một mặt phải đảm bảo ngữ nghĩa chính xác và cú pháp nghiêm ngặt, mặt khác phải kiểm soát các cuộc tấn công ngoại suy, rò rỉ dữ liệu nhạy cảm và truy vấn chi phí cao.
- **Mô hình**
  Giải pháp điển hình thường là kiến trúc đa mô-đun "LLM + thành phần chuyên dụng":
  - Mô hình Text‑to‑SQL: Mô hình được tiền huấn luyện hoặc tinh chỉnh trên kho ngữ liệu SQL quy mô lớn (như PICARD, DIN‑SQL, v.v.), tập trung vào tính chính xác cú pháp và căn chỉnh schema, đôi khi kết hợp phản hồi thực thi để tự sửa lỗi.
  - Pipeline trích xuất thông tin & xây dựng đồ thị: Thông qua các mô-đun nhận dạng thực thể (NER), trích xuất quan hệ, trích xuất sự kiện, xây dựng và cập nhật đồ thị tri thức từ văn bản và nhật ký; LLM có thể tham gia hỗ trợ phán đoán trong các trường hợp khó trích xuất và quan hệ ranh giới mơ hồ.
  - Hỏi đáp kết hợp LLM + cơ sở dữ liệu đồ thị: LLM chịu trách nhiệm phân tích câu hỏi, sinh truy vấn và giải thích kết quả, cơ sở dữ liệu đồ thị (như Neo4j, v.v.) chịu trách nhiệm thực thi hiệu quả và tìm kiếm quan hệ đa bước, cả hai kết nối thông qua giao thức gọi công cụ hoặc DSL trung gian.

### 8.2.1 Thực hành hỏi đáp cơ sở dữ liệu (Text‑to‑SQL / DSL)

Mục tiêu của hỏi đáp cơ sở dữ liệu là để nhân viên nghiệp vụ "hỏi dữ liệu bằng ngôn ngữ tự nhiên", còn hệ thống tự động hoàn thành việc sinh câu truy vấn, thực thi và giải thích ở phía sau. Để làm tốt việc này, điều then chốt là phải cân bằng **tính chính xác ngữ nghĩa, tính đúng đắn cú pháp và an toàn thực thi**.

1. **Chuyển đổi ngôn ngữ tự nhiên sang SQL / DSL**
   Trong chuỗi cơ bản nhất, hệ thống cần:
   1. Phân tích ý định người dùng: nhận diện đối tượng truy vấn (như "khách hàng mới khu vực Hoa Đông"), điều kiện lọc (thời gian, khu vực, kênh), phương pháp tổng hợp (tổng số, trung bình, so cùng kỳ/so với kỳ trước) và nhu cầu hiển thị (xu hướng, xếp hạng, Top‑N);
   2. Kết hợp với schema cơ sở dữ liệu: hiểu bảng và trường nào có thể biểu đạt các khái niệm trên, cách thực hiện liên kết (join), nhóm (group by) và sắp xếp;
   3. Sinh SQL / GraphQL / DSL nội bộ có thể thực thi được, và đảm bảo cấu trúc hợp lệ thông qua trình kiểm tra cú pháp hoặc mô hình Text2SQL chuyên dụng (PICARD, DIN‑SQL, v.v.).
2. **Giải thích kết quả thực thi bằng ngôn ngữ tự nhiên và trực quan hóa**
   Sau khi truy vấn được thực thi, hệ thống còn cần biến "tập kết quả lạnh lùng" thành "thông tin chi tiết có thể hiểu được":
   1. Giải thích bằng văn bản cho kết quả đơn giản, ví dụ "trong 3 tháng qua, tỷ lệ mua lại của khách hàng mới khu vực Hoa Đông có xu hướng tăng tổng thể, từ 15% lên 21%";
   2. Chọn hình thức trực quan hóa phù hợp cho kết quả phức tạp (biểu đồ đường, biểu đồ cột, biểu đồ tròn, biểu đồ phân phối, v.v.) và đưa ra phân tích ngắn gọn;
   3. Hỗ trợ người dùng tiếp tục đặt câu hỏi dựa trên kết quả hiện tại (như "đợt tăng trưởng này chủ yếu đến từ những kênh nào?"), tự động xây dựng truy vấn mới dựa trên SQL lịch sử và ngữ cảnh.
3. **An toàn & Kiểm soát: ngăn chặn "truy vấn bừa bãi" và "vượt quyền"**
   Do SQL do LLM sinh ra có tính linh hoạt cao, cần phải có một tầng cơ chế an toàn và quản trị:
   1. Dựa trên vai trò và quyền của người dùng, giới hạn nghiêm ngặt các cơ sở dữ liệu, bảng, trường và phạm vi thời gian có thể truy vấn;
   2. Trang bị quy tắc kiểm tra tĩnh/động cho SQL do mô hình sinh ra, lọc các thao tác nguy hiểm (như quét phạm vi lớn, join chi phí cao, truy vấn xuyên tenant, v.v.);
   3. Ghi lại đầy đủ chuỗi "câu hỏi ngôn ngữ tự nhiên – SQL được sinh – kết quả thực thi – câu trả lời cuối cùng" để phục vụ kiểm toán và phân tích bất thường.

### 8.2.2 Xây dựng và truy vấn đồ thị tri thức

Đồ thị tri thức cố gắng tổ chức tri thức rải rác trong văn bản, bảng biểu, nhật ký thành một mạng lưới có cấu trúc "thực thể – quan hệ – thuộc tính – sự kiện", từ đó hỗ trợ tốt hơn cho **khám phá quan hệ, suy luận đa bước và hỏi đáp phức tạp**. Trong hướng này, LLM và các công cụ trích xuất thông tin truyền thống, cơ sở dữ liệu đồ thị tạo thành sự bổ sung tốt cho nhau.

1. **Trích xuất thực thể và quan hệ từ tài liệu để xây dựng đồ thị**
   Xây dựng đồ thị tri thức thường sử dụng pipeline đa giai đoạn:
   1. Trích xuất thông tin: Sử dụng các mô hình NER, trích xuất quan hệ, trích xuất sự kiện để nhận diện thực thể (người, tổ chức, sản phẩm, địa danh, khái niệm, v.v.), quan hệ giữa chúng (trực thuộc, hợp tác, phụ thuộc, nhân quả) và các sự kiện then chốt (giao dịch, rủi ro, thay đổi) từ văn bản;
   2. Chuẩn hóa và căn chỉnh: Chuẩn hóa các cách diễn đạt khác nhau của cùng một thực thể (tên viết tắt, bí danh, biến thể chính tả), căn chỉnh về một ID thống nhất;
   3. Cập nhật đồ thị và quản lý phiên bản: Hỗ trợ cập nhật tăng dần, giải quyết xung đột và sửa lỗi, đảm bảo đồ thị duy trì chất lượng và tính nhất quán trong quá trình tiến hóa dài hạn. LLM có thể hỗ trợ các thuật toán truyền thống trong các khâu như giải quyết nhập nhằng, tinh chỉnh loại quan hệ, quy nạp quy tắc.
2. **Truy vấn và suy luận với LLM + cơ sở dữ liệu đồ thị (Neo4j, v.v.)**
   Khi đồ thị đã được xây dựng, cơ sở dữ liệu đồ thị chịu trách nhiệm lưu trữ và truy xuất hiệu quả, còn LLM có thể đóng vai trò "điểm vào ngôn ngữ tự nhiên + bộ điều khiển suy luận":
   1. Phân tích câu hỏi và sinh truy vấn đồ thị: Chuyển đổi câu hỏi ngôn ngữ tự nhiên thành câu truy vấn đồ thị (như Cypher của Neo4j), bao gồm xác định thực thể bắt đầu, loại quan hệ, độ dài đường dẫn và điều kiện lọc;
   2. Suy luận đa bước: Thông qua đường dẫn và đồ thị con cục bộ thu được từ truy vấn đồ thị, LLM tiến hành giải thích và tổng hợp, ví dụ "khách hàng A được kết nối gián tiếp với thực thể rủi ro cao B thông qua ba công ty";
   3. Trực quan hóa kết quả và khả năng giải thích: Trình bày kết quả truy vấn đồ thị dưới dạng mạng lưới trực quan, đồng thời LLM đưa ra giải thích bằng lời, giúp người dùng hiểu cấu trúc quan hệ phức tạp.
3. **Nền tảng tri thức miền và dịch vụ thống nhất**
   Trong các ứng dụng quy mô doanh nghiệp hoặc ngành lớn hơn, đồ thị tri thức thường tồn tại như một "nền tảng tri thức miền":
   1. Cung cấp góc nhìn thực thể và quan hệ thống nhất cho các hệ thống nghiệp vụ tầng trên (kiểm soát rủi ro, tuân thủ, góc nhìn 360 độ khách hàng, phân tích chuỗi cung ứng, v.v.);
   2. Cùng với RAG và hỏi đáp cơ sở dữ liệu tạo thành tầng dịch vụ tri thức thống nhất, trong đó logic điều phối LLM thống nhất quyết định câu hỏi hiện tại nên truy cập chỉ mục tài liệu, cơ sở dữ liệu quan hệ hay cơ sở dữ liệu đồ thị;
   3. Trong khuôn khổ yêu cầu an toàn và tuân thủ, thông qua kiểm soát truy cập và chiến lược khử nhạy cảm ở tầng đồ thị, giảm thiểu hơn nữa rủi ro rò rỉ thông tin nhạy cảm.

Mục tiêu chung của tầng này là nâng cấp từ "mô hình biết nói" lên thành "mô hình vừa biết nói, vừa thực sự kết nối được với dữ liệu và tài sản tri thức thực tế của doanh nghiệp". Khi RAG, Text‑to‑SQL, đồ thị tri thức và hạ tầng dữ liệu truyền thống được kết hợp hiệu quả, hệ thống AI mới có thể vừa duy trì trí thông minh và tính linh hoạt, vừa có được khả năng kiểm soát, khả năng giải thích và năng lực tiến hóa dài hạn trong môi trường nghiệp vụ phức tạp.# 9. An toàn, Căn chỉnh & Đánh giá (Safety / Alignment / Evaluation)

Trong các chương trước, chúng ta chủ yếu tiếp cận từ góc độ "mô hình có thể làm gì": có thể xem ảnh, viết mã, trò chuyện với người dùng. Nhưng trong một hệ thống mô hình lớn thực tế, chỉ "có năng lực" thôi là chưa đủ: **Làm thế nào để chứng minh những năng lực này ổn định, đáng tin cậy và có thể kiểm soát? Làm thế nào để đảm bảo đầu ra phù hợp với giá trị và yêu cầu tuân thủ? Làm thế nào để giám sát, lặp lại và hồi quy liên tục trong quá trình vận hành dài hạn?**
Tầng này tập trung vào: **đánh giá năng lực & kiểm thử chuẩn, căn chỉnh giá trị & huấn luyện, an toàn nội dung & tuân thủ, cũng như tính bền vững & kiểm soát ảo giác**, cùng nhau tạo thành một "tầng hạ tầng" cho mô hình lớn có thể vận hành bền vững.

Từ góc độ sản phẩm, những năng lực này xuyên suốt toàn bộ vòng đời của mô hình: ở giai đoạn phòng thí nghiệm, mô hình cần các Benchmark tiêu chuẩn và đánh giá chuyên nghiệp; trước khi ra mắt cần thông qua huấn luyện căn chỉnh và rà soát an toàn; sau khi ra mắt phụ thuộc vào cổng an toàn nội dung, kiểm toán nhật ký và thử nghiệm A/B để giám sát liên tục; khi đối mặt với các tình huống và mối đe dọa mới, lại cần quay về khâu đánh giá và căn chỉnh để huấn luyện lại và xác thực. Dưới đây chúng ta sẽ triển khai theo bốn hướng: **đánh giá năng lực & kiểm thử chuẩn, căn chỉnh giá trị & huấn luyện, an toàn nội dung & tuân thủ, tính bền vững & kiểm soát ảo giác**.## 9.1 Đánh giá năng lực & Điểm chuẩn (Capability Evaluation & Benchmarks)

Trong quá trình nghiên cứu phát triển và triển khai mô hình ngôn ngữ lớn, **đánh giá năng lực & điểm chuẩn** là khâu then chốt để chuyển đổi "năng lực mô hình" thành "tín hiệu có thể quan sát": vừa phải trả lời câu hỏi "mô hình này ở mức tổng thể như thế nào", vừa phải trả lời "nó thể hiện ra sao trong một lĩnh vực chuyên môn hay một kịch bản nghiệp vụ thực tế cụ thể". Một mặt, chúng ta sử dụng bộ điểm chuẩn chuẩn hóa và hệ thống đánh giá tự động để đo lường hiệu suất của mô hình trên các chiều chung như **hiểu và sinh ngôn ngữ, suy luận & toán học, kiến thức & tính xác thực**; mặt khác, còn cần xây dựng các bài đánh giá chuyên biệt cho các lĩnh vực như **y tế, luật pháp, tài chính, giáo dục**, đồng thời liên tục xác minh và điều chỉnh thông qua **hội thoại người dùng thực tế, thử nghiệm AB và các chỉ số nghiệp vụ (Task Success Rate, CSAT, tỷ lệ đóng ticket, v.v.)**. Nhìn tổng thể, tầng này cuối cùng sẽ kết tinh thành **nền tảng đánh giá năng lực nội bộ** và "**bản mô tả năng lực**" đối ngoại, đồng thời cung cấp cơ sở quyết định thống nhất cho việc lựa chọn mô hình đa phiên bản, đa bên thuê, đa kịch bản. Dưới đây sẽ triển khai từ ba góc độ: **kịch bản**, **nguyên lý**, **mô hình**.

- **Kịch bản**
  - **Kịch bản đánh giá năng lực chung**: Khi cập nhật mô hình cơ sở hoặc phiên bản lớn, cần đánh giá một cách có hệ thống hiệu suất của mô hình trên các tác vụ **hiểu và sinh ngôn ngữ** như đọc hiểu, tóm tắt, dịch thuật, chất lượng hội thoại, cũng như năng lực trên các tác vụ **suy luận & toán học** như số học, suy luận đa bước, câu hỏi lập trình/logic; đồng thời đo lường trình độ **kiến thức & tính xác thực** thông qua các tác vụ hỏi đáp thực tế, QA miền mở, độ phủ kiến thức, nhằm đánh giá "mô hình mới có cải thiện tổng thể hay không".
  - **Kịch bản đánh giá lĩnh vực chuyên môn**: Đối với các lĩnh vực chuyên sâu như y tế, luật pháp, tài chính, giáo dục, cần thiết kế các bài hỏi đáp chuyên môn và mô phỏng quyết định, chẳng hạn như hỏi đáp bệnh lý & gợi ý phân loại bệnh, hiểu điều khoản pháp luật & phân loại tình huống, phân tích đầu tư tài chính & đánh giá rủi ro, trợ giúp giảng dạy & hướng dẫn bài tập, đồng thời kiểm tra tính nhất quán và ổn định của mô hình trong **môi trường đa ngôn ngữ, đa văn hóa**, xác nhận liệu mô hình có thể "nói đúng, nói phù hợp" trong các tình huống rủi ro cao hay không.
  - **Kịch bản đánh giá thực tế & chỉ số nghiệp vụ**: Trong giai đoạn ra mắt sản phẩm và vận hành liên tục, thông qua phát lại nhật ký hội thoại người dùng, thử nghiệm AB trực tuyến và các phương thức khác, ánh xạ hiệu suất mô hình sang các chỉ số nghiệp vụ như **tỷ lệ hoàn thành nhiệm vụ (Task Success Rate)**, **mức độ hài lòng của người dùng (CSAT)**, **tỷ lệ đóng ticket**; lúc này đối tượng đánh giá thực chất là hệ thống tổng thể "mô hình + chiến lược + quy trình sản phẩm", được dùng để hướng dẫn rollback phiên bản, tinh chỉnh chiến lược và triển khai tính năng mới theo từng giai đoạn.
- **Nguyên lý**
  Hệ thống đánh giá năng lực có thể được xem như một "công trình đo lường hệ thống" phân tầng, với các nguyên lý cốt lõi bao gồm:
  - **Bộ điểm chuẩn chuẩn hóa: thước đo chung & thí nghiệm có thể tái lập**
    - Ngôn ngữ / Suy luận: Sử dụng các tác vụ tổng hợp như **MMLU**, **BIG-Bench**, kết hợp với các bài toán toán học và logic như **GSM8K**, **MATH**, để xây dựng thước đo thống nhất cho khả năng hiểu ngôn ngữ, nắm vững kiến thức và suy luận đa bước.
    - Lập trình: Thông qua **HumanEval**, **MBPP**, bộ đề **Codeforces**, v.v., định lượng hóa năng lực sinh mã, sửa chương trình và giải quyết vấn đề.
    - Đa phương thức: Sử dụng các điểm chuẩn như **VQA**, **MMBench**, **ScienceQA**, **MathVista** để kiểm tra khả năng hiểu văn bản-hình ảnh, hỏi đáp trực quan và suy luận toán học trong hình ảnh.
      Các điểm chuẩn này nhấn mạnh tính **chuẩn hóa, có thể tái lập, có thể so sánh**, thuận tiện cho việc so sánh ngang hàng giữa các mô hình, các tổ chức và công bố ra bên ngoài.
  - **Đánh giá tự động: quy mô hóa & hồi quy liên tục**
    - **LLM-as-a-Judge**: Sử dụng mô hình mạnh hơn hoặc được huấn luyện chuyên biệt để chấm điểm/xếp hạng câu trả lời, đánh giá tính đúng đắn, tính hoàn chỉnh, phong cách và độ an toàn, thực hiện đánh giá chủ quan tự động quy mô lớn.
    - **Đo lường dựa trên quy tắc**: Như BLEU / ROUGE / BERTScore đo lường độ tương đồng văn bản, Pass@k đo lường tỷ lệ vượt qua bài kiểm tra lập trình, v.v., cho phép so sánh nhanh sự khác biệt giữa các phiên bản trên tập dữ liệu cố định.
      Chìa khóa của đánh giá tự động nằm ở **tính ổn định & nhất quán**, ngay cả khi không hoàn hảo, chỉ cần "độ lệch nhất quán", nó vẫn có thể phản ánh đáng tin cậy sự thay đổi tương đối của mô hình trong tích hợp liên tục (CI).
  - **Đánh giá thủ công: căn chỉnh với cảm nhận con người & mục tiêu nghiệp vụ**
    - **So sánh Pairwise & gán nhãn chấm điểm**: Nhân viên gán nhãn thực hiện lựa chọn pairwise hoặc chấm điểm đa chiều (helpful / honest / harmless, v.v.) cho câu trả lời của hai mô hình A/B, đây là nguồn dữ liệu quan trọng để huấn luyện mô hình phần thưởng RLHF / RLAIF.
    - **Thí nghiệm người dùng trực tuyến**: Thông qua các kịch bản triển khai như trợ lý hội thoại, tìm kiếm/đề xuất để thực hiện thử nghiệm AB, quan sát trực tiếp tác động của các mô hình/chiến lược khác nhau lên mức độ hài lòng của người dùng, tỷ lệ chuyển đổi và các chỉ số khác.
      Đánh giá thủ công vừa được dùng để **hiệu chuẩn đánh giá tự động**, vừa là căn cứ quan trọng khi "giải thích hành vi mô hình" ra bên ngoài.
- **Mô hình**
  Trong thực tiễn kỹ thuật, đánh giá năng lực sẽ kết tinh thành một bộ "nền tảng + quy trình + hệ thống chỉ số" tương đối hoàn chỉnh:
  - **Nền tảng đánh giá năng lực nội bộ & pipeline CI**: Quản lý thống nhất các loại bộ điểm chuẩn, kịch bản đánh giá, cấu hình LLM-as-a-Judge và công cụ gán nhãn thủ công, hỗ trợ kích hoạt hồi quy Benchmark chỉ bằng một cú nhấp sau khi gửi mô hình hoặc chiến lược mới; tự động tổng hợp thay đổi chỉ số trên các tác vụ và chiều khác nhau, cung cấp Dashboard trực quan và cảnh báo hồi quy.
  - "**Bản mô tả năng lực**" đối ngoại & chân dung mô hình: Tổ chức kết quả đánh giá nội bộ thành "bản mô tả năng lực" có thể tiêu thụ được từ bên ngoài, bao gồm điểm số điểm chuẩn tiêu biểu, các kịch bản áp dụng được khuyến nghị (như hội thoại chung, trợ lý lập trình, hiểu đa phương thức, v.v.), các hạn chế đã biết và kịch bản không phù hợp, giúp khách hàng hình thành kỳ vọng đúng đắn, đồng thời cung cấp cơ sở cho tuân thủ và phân định trách nhiệm.
  - **Công cụ đánh giá & lựa chọn mô hình thống nhất đa bên thuê/đa phiên bản**: Trong cùng một hệ thống đánh giá, so sánh thống nhất các mô hình có kích thước, chiến lược căn chỉnh hoặc kiến trúc khác nhau, hỗ trợ cấu hình trọng số theo ngành, khu vực, yêu cầu SLA, tự động tạo điểm tổng hợp "hiệu suất–chi phí–độ trễ", giúp đội ngũ sản phẩm và nghiệp vụ đưa ra quyết định lựa chọn mô hình và triển khai theo giai đoạn (grayscale release).

### 9.1.1 Đánh giá năng lực chung & chuyên môn: từ Benchmark đến xác thực kịch bản

Đánh giá năng lực chung và chuyên môn là "lớp nền móng đầu tiên" của toàn bộ hệ thống đánh giá, trọng tâm nằm ở: trước tiên dùng thước đo thống nhất để đo lường **năng lực cơ bản** của mô hình, sau đó xác thực **tính khả dụng & rủi ro** của nó trong các kịch bản chuyên môn.

Trong đánh giá năng lực chung, các tác vụ thường được phân tách thành ba chiều: hiểu và sinh ngôn ngữ, suy luận & toán học, kiến thức & tính xác thực. Chiều thứ nhất thông qua các tác vụ đọc hiểu, tóm tắt, dịch thuật, chất lượng hội thoại để kiểm tra xem mô hình có thể hiểu chính xác ngữ cảnh, kiểm soát phong cách và tạo ra văn bản mạch lạc hay không; chiều thứ hai thông qua số học, suy luận đa bước, câu hỏi lập trình/logic để đánh giá năng lực của mô hình trên chuỗi suy luận phức tạp và cấu trúc chương trình; chiều thứ ba thông qua hỏi đáp thực tế và QA miền mở để đo lường độ phủ kiến thức và mức độ xác thực. Trong đánh giá lĩnh vực chuyên môn, cần mời chuyên gia ngành tham gia thiết kế dữ liệu: như trong hỏi đáp y tế, thiết lập ngữ cảnh như tiền sử bệnh, kết quả xét nghiệm, yêu cầu mô hình đưa ra cảnh báo rủi ro và giới hạn tư vấn y tế trong câu trả lời; trong tác vụ pháp lý, thiết kế truy xuất điều khoản, so sánh tình huống, phân tích áp dụng pháp luật; trong tài chính và giáo dục, tập trung vào công bố tuân thủ và hướng dẫn giảng dạy. Lớp đánh giá này thường kết hợp bộ điểm chuẩn chuẩn hóa với tập dữ liệu tự xây dựng, vừa theo đuổi tính so sánh được, vừa cân nhắc đến tính liên quan nghiệp vụ.

### 9.1.2 Đánh giá tự động & LLM-as-a-Judge: làm cho đánh giá có thể mở rộng

Khi quy mô tác vụ và số lượng phiên bản mô hình tăng trưởng nhanh chóng, chỉ dựa vào thủ công đã khó có thể đáp ứng nhu cầu đánh giá, lúc này cần thông qua hệ thống đánh giá tự động để đạt được **quy mô hóa & hồi quy tần suất cao**.

Một cách tiếp cận là sử dụng các phép đo dựa trên quy tắc truyền thống: trong các tác vụ như dịch thuật, tóm tắt, dùng BLEU / ROUGE / BERTScore để so sánh với câu trả lời tham chiếu, trong tác vụ lập trình dùng Pass@k để kiểm tra xem trong nhiều mẫu được sinh ra có ít nhất một mẫu vượt qua bài kiểm tra đơn vị hay không. Loại chỉ số này triển khai đơn giản, có thể tự động hóa cao, nhưng không nhạy cảm với tính đa dạng của câu trả lời và chi tiết phong cách. Một cách tiếp cận tiêu biểu khác là **LLM-as-a-Judge**: sử dụng mô hình mạnh hơn hoặc được huấn luyện chuyên biệt làm "trọng tài chấm điểm", dựa trên Rubric chấm điểm được định nghĩa trước, thực hiện chấm điểm theo chiều hoặc xếp hạng Pairwise cho đầu ra của mô hình được kiểm tra. Điều này cho phép chúng ta thực hiện đánh giá tự động hiệu quả ngay cả trong các tác vụ hỏi đáp mở và hội thoại không có câu trả lời chuẩn, nơi câu trả lời rất đa dạng. Trong thực tiễn kỹ thuật, tiêu chuẩn chấm điểm và Prompt của LLM-as-a-Judge cần được hiệu chuẩn và lặp lại thông qua dữ liệu gán nhãn thủ công, để đảm bảo tính nhất quán của nó với giám khảo con người.

### 9.1.3 Đánh giá thủ công & chỉ số nghiệp vụ: khép vòng về trải nghiệm người dùng thực tế

Cho dù các chỉ số ngoại tuyến có hoàn thiện đến đâu, chúng cũng chỉ có thể xấp xỉ trải nghiệm người dùng thực tế. Để khép vòng đánh giá năng lực về nghiệp vụ, cần đưa vào hai loại phương thức: đánh giá thủ công và thí nghiệm trực tuyến.

Về phía đánh giá thủ công, phổ biến nhất là so sánh Pairwise: để nhân viên gán nhãn, trong điều kiện không biết danh tính mô hình, dựa trên các chiều như helpful / honest / harmless, thực hiện lựa chọn ưu tiên hoặc chấm điểm cho hai câu trả lời A/B, từ đó thu được dữ liệu ưu tiên chất lượng cao, một mặt dùng để đánh giá trực tiếp, mặt khác có thể cung cấp dữ liệu cho việc huấn luyện mô hình phần thưởng RLHF / RLAIF. Về phía nghiệp vụ, thông qua thử nghiệm AB trực tuyến, so sánh tác động của các phiên bản mô hình, prompt, cấu hình chiến lược khác nhau lên các chỉ số then chốt như tỷ lệ hoàn thành nhiệm vụ, mức độ hài lòng của người dùng (CSAT), tỷ lệ đóng ticket, kết hợp với phát lại nhật ký hội thoại người dùng và kiểm tra chọn mẫu thủ công, liên tục giám sát hiệu suất thực tế của mô hình sau khi triển khai. Đầu ra của lớp đánh giá này ngược lại sẽ hướng dẫn hướng trọng tâm và điều chỉnh trọng số của nền tảng đánh giá năng lực, hình thành vòng khép kín "chỉ số ngoại tuyến—đánh giá thủ công—chỉ số trực tuyến".## 9.2 Căn chỉnh giá trị & Huấn luyện (Value Alignment & Training)

Sau khi sở hữu năng lực nền tảng mạnh mẽ, để trở thành sản phẩm "an toàn, đáng tin cậy, có thể kiểm soát", mô hình lớn còn phải trải qua **căn chỉnh giá trị & huấn luyện**. Tầng này không còn quan tâm đến việc mô hình "có trả lời được không", mà là "**câu trả lời có hữu ích, trung thực, vô hại hay không**" cũng như "nên giao tiếp như thế nào trong các vai trò và ngành nghề khác nhau". Từ góc độ kỹ thuật, quá trình căn chỉnh đại khái bao gồm ba bước: đầu tiên, thông qua tài liệu và quy phạm để xác định rõ **định nghĩa mục tiêu căn chỉnh (What to Align)** , phân tách Hữu ích (Helpful), Trung thực (Honest), Vô hại (Harmless) thành các tiêu chuẩn có thể gán nhãn và huấn luyện; thứ hai, xây dựng **dữ liệu chỉ thị và dữ liệu an toàn** có phạm vi bao phủ rộng, bao gồm các tác vụ bình thường, tình huống vùng xám và câu trả lời không phù hợp; cuối cùng, thông qua các phương pháp như **SFT, RLHF / RLAIF, mô hình hóa chiến lược từ chối / chuyển hướng**, "ghi" những sở thích và quy tắc này vào hành vi của mô hình, đồng thời bổ trợ bằng quản lý hội thoại và công cụ chiến lược ở tầng trên, để đạt được căn chỉnh an toàn end-to-end. Dưới đây cũng triển khai từ ba góc độ: **kịch bản** , **nguyên lý** , **mô hình**.

- **Kịch bản**
  - **Kịch bản trợ lý C-end phổ thông** : Trợ lý trò chuyện, trợ lý truy xuất thông tin hướng đến người dùng đại chúng, cần duy trì "**thân thiện, hữu ích, không vượt quá giới hạn**" trên nhiều chủ đề: vừa phải trả lời chuyên nghiệp, tập trung vào nhiệm vụ, vừa phải thành thật bày tỏ giới hạn khi không chắc chắn, từ chối hoặc nhẹ nhàng hướng dẫn đối với những yêu cầu rõ ràng không phù hợp.
  - **Kịch bản trợ lý ngành chuyên môn** : Trong các lĩnh vực như y tế, pháp luật, tài chính, giáo dục, ngoài an toàn cơ bản còn phải xếp chồng các quy phạm ngành: ví dụ trợ lý y tế cần nhấn mạnh nhiều lần "tính chất phi chẩn đoán + cảnh báo rủi ro + khuyến nghị đi khám", trợ lý pháp luật phải tránh đưa ra lời khuyên lách luật, trợ lý tài chính phải tuân thủ yêu cầu công bố thông tin tuân thủ đầu tư, trợ lý giáo dục phải cân nhắc bảo vệ trẻ vị thành niên và nội dung phù hợp lứa tuổi.
  - **Kịch bản tầng căn chỉnh có thể cấu hình phía B-end** : Doanh nghiệp thường mong muốn trên nền tảng an toàn chung, nhúng thêm các yêu cầu ngành, giọng điệu thương hiệu và chính sách nội bộ của riêng mình, do đó cần một **tầng căn chỉnh có thể cấu hình** , cho phép khách hàng tự cấu hình ngưỡng an toàn, danh mục nhạy cảm và phong cách ngôn từ mà không cần huấn luyện lại mô hình lớn nền tảng.
- **Nguyên lý**
  Căn chỉnh giá trị có thể hiểu là "dùng giá trị quan của con người và tổ chức để ràng buộc không gian hành vi của mô hình", các nguyên lý cốt lõi bao gồm:
  - **Định nghĩa mục tiêu căn chỉnh (What to Align)**
    - **Hữu ích (Helpful)** : Câu trả lời cần chất lượng cao, chuyên nghiệp, cấu trúc rõ ràng, tập trung vào mục tiêu nhiệm vụ, không lan man và tán gẫu quá mức.
    - **Trung thực (Honest)** : Cố gắng không bịa đặt, chủ động thừa nhận sự không chắc chắn khi thiếu kiến thức hoặc không hiểu rõ, đưa ra phạm vi ước tính hoặc đề xuất kênh xác minh.
    - **Vô hại (Harmless)** : Tuân thủ pháp luật và chính sách nền tảng, tránh tạo ra nội dung thù hận, phân biệt đối xử, khuyến khích tự hại, hướng dẫn phạm tội, v.v., đồng thời tôn trọng phẩm giá và ranh giới của người dùng.
      Các mục tiêu này sẽ được ghi vào hướng dẫn gán nhãn và tài liệu chiến lược, trở thành tiêu chuẩn thống nhất cho việc xây dựng dữ liệu, mô hình hóa phần thưởng và đánh giá sau này.
  - **Xây dựng dữ liệu huấn luyện căn chỉnh**
    - **Dữ liệu chỉ thị (Instruction)** : Thiết kế các chỉ thị nhiệm vụ và câu trả lời lý tưởng có phạm vi bao phủ rộng, bao gồm nhiều kịch bản như hỏi đáp, viết, tóm tắt, mã, lập kế hoạch, dạy mô hình hành vi tốt nhất khi xử lý "yêu cầu bình thường".
    - **Dữ liệu an toàn (Safety)** : Xây dựng các mẫu đối chiếu "câu trả lời tốt vs câu trả lời không phù hợp", đặc biệt chú trọng ranh giới xám (gray zone), như thông tin khoa học phổ thông vs thao tác cụ thể, hỗ trợ cảm xúc vs khuyến khích tự hại, tranh luận hợp pháp vs kích động thù hận, cung cấp cho mô hình các ví dụ ranh giới ở mức độ chi tiết.
  - **Phương pháp huấn luyện căn chỉnh**
    - **SFT (Supervised Fine-Tuning)** : Tiến hành tinh chỉnh có giám sát trên dữ liệu hội thoại / chỉ thị chất lượng cao, là bước đầu tiên để định hình hành vi và giọng điệu cơ bản của mô hình.
    - **RLHF / RLAIF** : Thông qua việc con người hoặc mô hình chấm điểm để xây dựng dữ liệu sở thích, huấn luyện mô hình phần thưởng, sau đó tiến hành tối ưu hóa chiến lược, khiến mô hình có xu hướng tạo ra câu trả lời được "ưa thích" hơn (hữu ích hơn, an toàn hơn, trung thực hơn).
    - **Mô hình hóa chiến lược từ chối / chuyển hướng** : Đối với các yêu cầu rủi ro cao hoặc không phù hợp, huấn luyện mô hình không chỉ biết từ chối, mà còn có thể đưa ra giải thích hợp lý và hướng dẫn người dùng đến các giải pháp thay thế an toàn (ví dụ cung cấp tài nguyên trợ giúp, khuyến khích tư vấn chuyên gia, v.v.).
- **Mô hình**
  Trong thiết kế hệ thống, căn chỉnh giá trị thường thể hiện dưới dạng tổ hợp "**huấn luyện căn chỉnh tầng dưới + hàng rào chiến lược tầng trên**" :
  - **Mô hình căn chỉnh SFT + RLHF / RLAIF** : Giai đoạn SFT giúp mô hình học được mẫu cơ bản của câu trả lời lý tưởng; giai đoạn RLHF / RLAIF thông qua học sở thích để "thắt chặt" hành vi hơn nữa, khiến nó gần gũi hơn với sở thích của con người và tiêu chuẩn an toàn. Trên chiều an toàn, có thể xây dựng riêng đầu phần thưởng hoặc bộ phân loại cho tính có hại, dùng để áp dụng hình phạt trong tối ưu hóa chiến lược.
  - **Constitutional AI / Policy-based Alignment** : Thông qua việc viết trước một bộ "Hiến pháp (Constitution)" hoặc tài liệu Policy, sau đó để mô hình tự phê bình và viết lại dựa trên bộ quy tắc này, tạo ra lượng lớn "dữ liệu tự giám sát sửa chữa", vừa giảm chi phí nhân công vừa củng cố sự nội tâm hóa quy tắc của mô hình.
  - **Quản lý hội thoại và phát hiện ý định phối hợp** : Trong pipeline sản phẩm, chuyển một phần logic an toàn / căn chỉnh lên tầng quản lý hội thoại, thông qua nhận dạng ý định, điền slot, định tuyến nhiệm vụ để quyết định yêu cầu có được giao cho mô hình lớn hay không, có cần lọc an toàn bổ sung hay trả lời theo mẫu hay không. Như vậy có thể hình thành bảo hiểm kép "căn chỉnh mô hình + hàng rào chiến lược".
  - **Nền tảng căn chỉnh nội bộ và cấu hình vai trò** : Xây dựng nền tảng căn chỉnh nội bộ, cung cấp công cụ gán nhãn / chấm điểm, quản lý phiên bản chiến lược và pipeline huấn luyện; đồng thời hỗ trợ cấu hình mục tiêu căn chỉnh và phong cách ngôn từ khác biệt cho các vai trò khác nhau (dịch vụ khách hàng, tư vấn y tế, hướng dẫn giáo dục, v.v.), khiến cùng một mô hình nền tảng thể hiện tính cách nhất quán nhưng hoàn toàn khác biệt và có thể kiểm soát trong các sản phẩm khác nhau.

### 9.2.1 Mục tiêu căn chỉnh và dữ liệu huấn luyện: Biến giá trị thành tín hiệu có thể học được

Bước đầu tiên của căn chỉnh giá trị là "dịch" các giá trị trừu tượng thành tín hiệu mà mô hình có thể học được, và điều này không thể tách rời khỏi việc định nghĩa mục tiêu căn chỉnh và xây dựng dữ liệu huấn luyện.

Ở cấp độ mục tiêu căn chỉnh, nhóm thường sẽ đưa ra một bộ tài liệu quy phạm hành vi chi tiết, phân tách Helpful / Honest / Harmless thành các điều khoản cụ thể, như: cấm đưa ra các bước thao tác cụ thể cho một số loại hành vi rủi ro cao, đối với lời khuyên y tế / pháp luật phải kèm theo tuyên bố miễn trừ trách nhiệm và cảnh báo rủi ro, khi liên quan đến chủ đề gây tranh cãi phải giữ thái độ trung lập và trình bày đa góc nhìn, v.v. Tiếp theo, trong giai đoạn dữ liệu chỉ thị, sẽ xây dựng các nhiệm vụ đa dạng và câu trả lời lý tưởng xoay quanh các chỉ số này, bao gồm các kịch bản như trò chuyện, viết, mã, hỏi đáp, đồng thời tích hợp đa ngôn ngữ, đa nền văn hóa; trong giai đoạn dữ liệu an toàn, sẽ nhắm vào nội dung có hại, lĩnh vực rủi ro cao và vùng xám, xây dựng các cặp ví dụ "câu trả lời tốt / xấu", cung cấp tài liệu huấn luyện cho việc học sở thích và bộ phân loại an toàn sau này. Thông qua cách này, mục tiêu giá trị được "dịch" thành phân phối dữ liệu thực tế, trở thành tín hiệu mà quá trình huấn luyện mô hình có thể trực tiếp cảm nhận.

### 9.2.2 SFT, RLHF / RLAIF và chiến lược từ chối: Định hình hành vi mô hình

Sau khi có mục tiêu căn chỉnh và dữ liệu, bước tiếp theo là ghi những mục tiêu này vào hành vi mô hình thông qua quá trình huấn luyện nhiều giai đoạn.

Trong giai đoạn SFT, mô hình được tinh chỉnh có giám sát trên dữ liệu minh họa chất lượng cao do con người tạo ra, điều này tương tự như "học theo sách giáo khoa": nó quyết định giọng điệu, cấu trúc và mô thức tiêu chuẩn giải quyết vấn đề của mô hình trong phần lớn các yêu cầu bình thường. Sau đó, thông qua **RLHF / RLAIF** để tối ưu hóa sở thích: trước tiên sử dụng gán nhãn của con người hoặc nhãn sở thích do LLM lớn hơn tạo ra để huấn luyện mô hình phần thưởng, sau đó sử dụng thuật toán tối ưu hóa chiến lược (như PPO, v.v.) để điều chỉnh mô hình, khiến nó có xu hướng nhận được phần thưởng cao hơn trong quá trình sinh. Như vậy, mô hình không chỉ "biết câu trả lời đúng trông như thế nào", mà còn biết "loại câu trả lời nào phù hợp hơn với sở thích của con người và yêu cầu an toàn". Trên cơ sở này, còn mô hình hóa chuyên biệt các **chiến lược từ chối và chuyển hướng** khác nhau: đối với những câu hỏi rõ ràng vi phạm pháp luật, rủi ro cực cao hoặc không phù hợp để AI trả lời, mô hình nên học cách đưa ra lời từ chối và giải thích rõ ràng, đồng thời cung cấp lộ trình thay thế an toàn (như đường dây nóng trợ giúp, tư vấn chuyên môn, v.v.), thay vì chỉ im lặng hoặc tùy tiện lảng tránh.

### 9.2.3 Tầng chiến lược và nền tảng căn chỉnh: Làm cho căn chỉnh có thể cấu hình, có thể tiến hóa

Ngay cả khi mô hình nền tảng đã được huấn luyện căn chỉnh đầy đủ, trong hệ thống thực tế vẫn cần **tầng chiến lược và nền tảng căn chỉnh** để đạt được khả năng kiểm soát chi tiết hơn và khả năng tiến hóa.

Tầng chiến lược thường bao gồm nhận dạng ý định, đánh giá rủi ro và logic định tuyến: khi đầu vào của người dùng đến hệ thống, trước tiên mô hình nhẹ sẽ phán đoán ý định, lĩnh vực và mức độ rủi ro, sau đó quyết định có gọi trực tiếp mô hình lớn hay không, có cần lọc an toàn bổ sung hay không, có rơi vào trả lời theo mẫu hoặc kênh chuyển tiếp nhân viên hay không. Đối với các ngành và khách hàng khác nhau, tầng chiến lược có thể tải các cấu hình Policy khác nhau, thực hiện tùy chỉnh đối với danh mục nhạy cảm, phong cách từ chối và giọng điệu thương hiệu. Đồng thời, nền tảng căn chỉnh nội bộ sẽ quản lý tất cả các tài sản liên quan đến căn chỉnh: công cụ gán nhãn / chấm điểm, phiên bản mô hình phần thưởng, bản ghi thay đổi chiến lược, kết quả A/B trực tuyến, v.v., giúp nhóm có thể lặp nhanh và phát hành canary đối với chiến lược căn chỉnh mà không cần huấn luyện lại mô hình nền tảng thường xuyên, từ đó duy trì khả năng kiểm soát liên tục đối với hành vi của mô hình.## 9.3 An toàn & Tuân thủ Nội dung (Content Safety & Compliance)

Khi các mô hình ngôn ngữ lớn ngày càng được nhúng vào công cụ tìm kiếm, hội thoại, sáng tạo nội dung, nền tảng mạng xã hội và thậm chí cả hệ thống nội bộ doanh nghiệp, **an toàn và tuân thủ nội dung** đã chuyển từ "tính năng bổ sung" thành "ngưỡng đầu vào bắt buộc". Tầng này tập trung vào các câu hỏi: liệu mô hình có tạo ra nội dung bất hợp pháp hoặc có hại khi sinh văn bản, hình ảnh, âm thanh và video hay không; liệu hệ thống có tuân thủ luật pháp và quy định của quốc gia/khu vực sở tại cũng như ngành nghề khi xử lý dữ liệu người dùng hay không; và liệu có thể cung cấp chuỗi bằng chứng rõ ràng, có thể truy xuất khi đối diện với kiểm toán và giám sát hay không. Để làm được điều này, chúng ta cần xây dựng một hệ thống kỹ thuật và quản trị hoàn chỉnh bao phủ **kiểm duyệt nội dung đa phương thức, tuân thủ khu vực và ngành nghề, bảo vệ quyền riêng tư và dữ liệu cục bộ**, đồng thời đóng gói thành các sản phẩm như dịch vụ an toàn nội dung SaaS, nền tảng tuân thủ doanh nghiệp và cổng an toàn ngành. Dưới đây, chúng ta sẽ tiếp tục phân tích từ ba góc độ: **kịch bản**, **nguyên lý** và **mô hình**.

- **Kịch bản**
  - **Kịch bản kiểm duyệt và lọc nội dung đa phương thức**: Trong các sản phẩm hội thoại, nền tảng UGC, cộng đồng và ứng dụng mạng xã hội, mô hình ngôn ngữ lớn sẽ tạo ra hoặc tiếp nhận lượng lớn nội dung văn bản, hình ảnh, âm thanh và video, cần thông qua năng lực **kiểm duyệt đa phương thức** thống nhất để nhận diện và chặn theo thời gian thực các đầu ra có rủi ro cao như thông tin cá nhân, hướng dẫn phạm tội, kích động thù hận, bạo lực cực đoan, nội dung khiêu dâm và nội dung không phù hợp với trẻ vị thành niên.
  - **Kịch bản ràng buộc tuân thủ và bản địa hóa**: Luật pháp và quy định của các quốc gia/khu vực khác nhau có các yêu cầu khác nhau về bảo vệ dữ liệu, bảo vệ trẻ vị thành niên, giám sát nội dung, v.v.; các ngành nghề khác nhau (y tế, tài chính, giáo dục, quảng cáo, v.v.) cũng có các quy phạm tuân thủ chi tiết riêng. Do đó, hệ thống phải hỗ trợ tải các mẫu chính sách khác nhau theo **khu vực và ngành nghề** để đáp ứng yêu cầu giám sát địa phương.
  - **Kịch bản quyền riêng tư người dùng và bảo vệ dữ liệu**: Trong quá trình huấn luyện mô hình và dịch vụ trực tuyến, cần xử lý lượng lớn dữ liệu hội thoại và nghiệp vụ của người dùng, làm thế nào để thực hiện ẩn danh hóa dữ liệu, khử nhạy cảm và thu thập tối thiểu, đồng thời bảo vệ quyền riêng tư thông qua các biện pháp kỹ thuật và thể chế trong giai đoạn huấn luyện và suy luận, là một trụ cột khác của hệ thống an toàn và tuân thủ nội dung, đặc biệt trong các ngành có độ nhạy cảm cao như tài chính và y tế.
- **Nguyên lý**
  Nguyên lý nền tảng của an toàn và tuân thủ nội dung có thể chia thành ba tầng: chính sách, lọc và quyền riêng tư:
  - **Hệ thống chính sách an toàn (Policy Engine)**
    - Hình thức hóa luật pháp, quy tắc nền tảng và quy phạm ngành thành **chính sách có thể thực thi**, thông qua công cụ quy tắc kết hợp với điểm số mô hình để phân loại rủi ro nội dung (an toàn / vùng xám / rủi ro cao).
    - Hỗ trợ chọn các mẫu chính sách khác nhau theo kịch bản và khách hàng, ví dụ cấu hình danh mục nhạy cảm và ngưỡng khác nhau cho sản phẩm thanh thiếu niên, cộng đồng chuyên nghiệp hoặc doanh nghiệp đa quốc gia.
  - **Lọc nội dung đa cấp: Trước – Trong – Sau**
    - **Trước**: Chặn và viết lại Prompt của người dùng (Prompt Shielding), ngăn chặn các ý định rõ ràng vi phạm pháp luật hoặc có độ nhạy cảm cao trước khi yêu cầu đi vào mô hình ngôn ngữ lớn, hoặc dẫn hướng chúng thành cách diễn đạt an toàn hơn.
    - **Trong**: Khi mô hình sinh đầu ra, sử dụng mô hình phân loại an toàn và quy tắc để kiểm duyệt nội dung theo thời gian thực (Real-time Safety Filter), cắt bớt, thay thế, làm mờ hoặc kích hoạt từ chối trả lời đối với nội dung rủi ro cao.
    - **Sau**: Thực hiện kiểm toán mẫu và đánh giá thủ công đối với nhật ký hội thoại và sinh, phân tích truy xuất nguồn gốc các vấn đề được phát hiện, từ đó cập nhật chính sách và mô hình, đồng thời cung cấp hồ sơ có thể truy xuất cho giám sát bên ngoài.
  - **Công nghệ bảo vệ quyền riêng tư và \*\***quản trị dữ liệu\*\*
    - Trước khi lưu trữ và huấn luyện dữ liệu, thực hiện **ẩn danh hóa và khử nhạy cảm** dữ liệu hội thoại người dùng, xóa hoặc thay thế các trường nhạy cảm như tên, số định danh duy nhất, số điện thoại, địa chỉ, v.v., đồng thời tuân thủ **nguyên tắc thu thập tối thiểu** chỉ giữ lại thông tin cần thiết.
    - Trong một số kịch bản, áp dụng **quyền riêng tư vi sai (DP)** để hạn chế ảnh hưởng của từng mẫu đơn lẻ lên tham số mô hình, hoặc thông qua **học liên kết (FL)** để giữ việc huấn luyện trong miền dữ liệu cục bộ, tránh đưa dữ liệu gốc lên đám mây.
    - Sử dụng các cơ chế kiểm soát truy cập như **RBAC\*\*** / \***\*ABAC** để hạn chế nghiêm ngặt ai có thể truy cập cấp độ nhật ký và dữ liệu nhạy cảm nào, đồng thời kết hợp với nhật ký kiểm toán để đảm bảo đường dẫn truy cập có thể theo dõi được.
- **Mô hình**
  Từ góc độ thiết kế sản phẩm và hệ thống, an toàn và tuân thủ nội dung cuối cùng sẽ tiến hóa thành một loạt "dịch vụ và nền tảng an toàn" có thể tái sử dụng:
  - **Dịch vụ an toàn nội dung SaaS**: Đóng gói năng lực kiểm duyệt văn bản / hình ảnh / âm thanh / video thành API thống nhất, kết nối với các ứng dụng thượng nguồn; đầu vào là nội dung, đầu ra là loại rủi ro, phân cấp và đề xuất xử lý (cho phép, chặn, đánh giá thủ công), giúp nhà phát triển tích hợp mô-đun an toàn nhanh chóng.
  - **Nền tảng tuân thủ nội bộ doanh nghiệp**: Cung cấp cho doanh nghiệp lớn khả năng cấu hình chính sách tuân thủ tập trung, báo cáo kiểm toán và cảnh báo rủi ro, kết nối với hệ thống nghiệp vụ nội bộ và đội ngũ đánh giá thủ công, cho phép các tuyến nghiệp vụ khác nhau thực thi quy tắc tùy chỉnh trong khuôn khổ chính sách thống nhất, đồng thời đáp ứng nhu cầu báo cáo giám sát bên ngoài.
  - **Cổng an toàn chuyên dụng và hệ thống kiểm toán nhật ký cho ngành rủi ro cao**: Trong các ngành rủi ro cao như tài chính và y tế, thông qua cổng an toàn chuyên dụng để ủy quyền tất cả các lệnh gọi mô hình ngôn ngữ lớn, kiểm tra và khử nhạy cảm lưu lượng theo thời gian thực, lưu giữ nhật ký quan trọng tại khu vực cục bộ hoặc khu vực tuân thủ, cung cấp khả năng kiểm toán truy cập chi tiết và truy xuất sự kiện, đáp ứng các yêu cầu giám sát nghiêm ngặt.

### 9.3.1 Kiểm duyệt đa phương thức và công cụ chính sách: Biến quy tắc thành "mã có thể thực thi"

Hệ thống an toàn nội dung thực tế, trước tiên phải có khả năng "hiểu" nội dung đến từ các kênh và phương thức khác nhau, sau đó mới có thể triển khai chính sách vào từng yêu cầu và phản hồi.

Về mặt kiểm duyệt đa phương thức, hệ thống thường xây dựng nhiều mô hình phát hiện cho văn bản, hình ảnh, video: mô hình phía văn bản nhận diện từ khóa nhạy cảm, ngữ cảnh hội thoại và cách diễn đạt ẩn ý; phía hình ảnh và video phát hiện nội dung bạo lực, khiêu dâm, trẻ vị thành niên, biểu tượng thù hận và vật phẩm bất hợp pháp, đồng thời khi cần thiết kết hợp OCR, ASR và đặc trưng thị giác để đưa ra phán đoán tổng hợp. Công cụ chính sách liên kết các đầu ra mô hình này với yêu cầu pháp lý: ví dụ, tại một khu vực có hạn chế nghiêm ngặt hơn đối với nội dung cờ bạc hoặc chính trị, có thể tăng độ nhạy của danh mục phát hiện liên quan trong mẫu chính sách tương ứng, hoặc bắt buộc chuyển sang đánh giá thủ công đối với nội dung trúng các phân loại này. Bằng cách chuyển đổi quy tắc trừu tượng thành chuỗi quy tắc, ngưỡng và hành động (cho phép/chặn/đánh giá thủ công/làm mờ), Policy Engine giúp các yêu cầu tuân thủ thực sự "vận hành" được.

### 9.3.2 Lọc đa cấp và kiểm toán nhật ký: Xây dựng vòng khép kín an toàn đầu cuối

Việc chặn ở một khâu đơn lẻ rất khó bao phủ tất cả rủi ro, do đó hệ thống an toàn nội dung thường áp dụng thiết kế tuyến phòng thủ ba lớp **Trước – Trong – Sau**.

Ở giai đoạn trước, hệ thống sẽ phát hiện nhanh đầu vào của người dùng, từ chối hoặc viết lại trực tiếp các Prompt rõ ràng vi phạm hoặc có độ nhạy cảm cao, dẫn hướng người dùng đặt câu hỏi theo cách an toàn; đối với các thử nghiệm ranh giới và yêu cầu mơ hồ, cũng có thể chủ động bổ sung tuyên bố và cảnh báo rủi ro. Ở giai đoạn trong, đầu ra của mô hình sẽ đi qua thành phần lọc an toàn thời gian thực: thành phần này sử dụng phân loại văn bản và khớp quy tắc để cắt bớt, thay thế hoặc kích hoạt quy trình từ chối trả lời đối với đầu ra có nguy cơ cao, đảm bảo nội dung cuối cùng hiển thị cho người dùng nằm trong phạm vi chấp nhận được. Ở giai đoạn sau, thông qua cơ chế kiểm toán nhật ký và kiểm tra mẫu, đội ngũ an toàn hoặc hệ thống tự động đáng tin cậy sẽ định kỳ phát lại và kiểm tra phiên hội thoại, phân tích phán đoán sai, bỏ sót và các kiểu rủi ro mới, từ đó cập nhật chính sách, dữ liệu huấn luyện và mô hình phát hiện. Như vậy hình thành một vòng khép kín an toàn tiến hóa liên tục, thay vì "cấu hình một lần".

### 9.3.3 Bảo vệ quyền riêng tư và cổng an toàn ngành: Khiến an toàn dữ liệu "có thể chứng minh"

Trong các ngành có độ nhạy cảm cao, chỉ "không xuất ra nội dung có hại" là chưa đủ, còn cần chứng minh rằng "việc sử dụng dữ liệu người dùng trong nội bộ cũng an toàn, tuân thủ và có thể truy xuất".

Bảo vệ quyền riêng tư bắt đầu từ khi dữ liệu đi vào hệ thống: thực hiện ẩn danh hóa và khử nhạy cảm tối đa trong giai đoạn thu thập và lưu trữ, đảm bảo ngay cả khi nhật ký bị lộ cũng khó liên kết trực tiếp đến cá nhân cụ thể; trong giai đoạn huấn luyện, giảm ảnh hưởng và rủi ro rò rỉ của dữ liệu người dùng đơn lẻ lên mô hình cuối cùng thông qua quyền riêng tư vi sai, chiến lược lấy mẫu hoặc học liên kết. Đối với lưu lượng suy luận mô hình, thực hiện kiểm soát truy cập thống nhất thông qua **cổng an toàn**: tất cả yêu cầu và phản hồi đều phải qua kiểm tra nội dung, xác minh quyền và thu thập kiểm toán của cổng, khi cần thiết áp dụng các chính sách truy cập và góc nhìn dữ liệu khác nhau theo tuyến nghiệp vụ và vai trò người dùng. Cuối cùng, những nhật ký và hồ sơ thay đổi chính sách này sẽ lắng đọng thành "chuỗi bằng chứng" có thể được kiểm toán nội bộ và giám sát bên ngoài xem xét, giúp doanh nghiệp không chỉ tuân thủ trên thực tế, mà còn "có thể chứng minh mình tuân thủ" về mặt hình thức.# 10. AI cho Khoa học (AI4Science)

Khi học sâu và mô hình lớn chuyển từ "quảng cáo đề xuất, hiểu ngôn ngữ tự nhiên" sang **chính các vấn đề khoa học**, mục tiêu không còn chỉ là dự đoán một chỉ số hay thực hiện phân loại, mà là thực sự tham gia vào **khám phá quy luật, thiết kế thí nghiệm, tăng tốc mô phỏng và suy luận**. AI4Science cố gắng kết hợp "nhận dạng mẫu thống kê" với "định luật vật lý / quy luật hóa sinh / cấu trúc toán học", để mô hình đóng vai trò "trợ lý khoa học có thể lập trình" trong các khâu như thiết kế phân tử, kỹ thuật protein, khám phá vật liệu, mô phỏng vật lý, suy luận toán học.

Trong thực tiễn kỹ thuật, tầng này một mặt kết nối với "cơ sở hạ tầng khoa học truyền thống" như phần mềm hóa lượng tử, động lực học phân tử (MD), trình mô phỏng CFD/FEA, trình chứng minh định lý tự động, cơ sở dữ liệu tài liệu và phòng thí nghiệm tự động (Robotic Lab), mặt khác kết nối với quy trình nghiên cứu thực tế của các công ty dược phẩm, doanh nghiệp vật liệu, công ty năng lượng và tổ chức nghiên cứu. Dưới đây triển khai từ ba góc độ **kịch bản**, **nguyên lý**, **mô hình**, và phân nhánh sâu hơn ở một số hướng then chốt.

- **Kịch bản**
  - Thiết kế phân tử và dược phẩm: Từ lượng lớn phân tử nhỏ / đoạn phân tử, dự đoán tính chất và ADMET, thiết kế ứng viên thuốc nhắm vào mục tiêu cụ thể, thu hẹp không gian thí nghiệm thông qua sàng lọc ảo và tối ưu đa mục tiêu.
  - Mô hình hóa protein và cấu trúc sinh học: Dự đoán cấu trúc ba chiều của protein và phức hợp, hỗ trợ thiết kế kháng thể, enzyme, thuốc protein, đánh giá ảnh hưởng của đột biến đến chức năng và độ ổn định.
  - Mô phỏng vật lý và thiết kế kỹ thuật: Sử dụng mô hình thay thế sâu để tăng tốc các mô phỏng chi phí cao như CFD / FEA / động lực học phân tử, cung cấp công cụ đánh giá và tối ưu nhanh cho các lĩnh vực hàng không vũ trụ, ô tô, năng lượng.
  - Khám phá vật liệu và thiết kế tinh thể: Tiến hành sàng lọc ảo và thiết kế ngược trong không gian hóa học / vật liệu rộng lớn, tăng tốc nghiên cứu phát triển các vật liệu then chốt như pin, quang điện, chất xúc tác, hợp kim.
  - Toán học và suy luận ký hiệu: Thực hiện chứng minh định lý tự động, tính toán ký hiệu và giải phương trình trong hệ thống hình thức, nâng cao khả năng suy luận chặt chẽ của mô hình lớn trong các bài toán và suy diễn kỹ thuật.
  - Quy trình khoa học và thí nghiệm tự động hóa: Kết nối tài liệu, cơ sở dữ liệu và nền tảng thí nghiệm tự động, xây dựng "Phòng thí nghiệm tự vận hành (Self-Driving Lab)", để mô hình tham gia vào thiết kế, thực thi và phân tích kết quả thí nghiệm.
- **Nguyên lý**
  - Biểu diễn có cấu trúc và mô hình hóa đồ thị: Sử dụng đồ thị (Graph), đồ thị tinh thể (Crystal Graph), đồ thị phân tử và các cấu trúc khác để biểu diễn đối tượng phức tạp, mô hình hóa quan hệ hình học và tô-pô trên mạng nơ-ron đồ thị hoặc mạng đẳng biến E(3).
  - Thiên kiến quy nạp vật lý / hóa học: Tích hợp tri thức tiên nghiệm vật lý vào cấu trúc và hàm mất mát của mô hình thông qua định luật bảo toàn, đối xứng (tịnh tiến / quay / phản xạ), ràng buộc PDE (PINN), hàm thế năng lượng.
  - Sinh và thiết kế ngược: Sử dụng các phương pháp mô hình sinh như VAE, GAN, Diffusion, RL, hỗ trợ suy ngược cấu trúc từ "tính chất mục tiêu / điều kiện ràng buộc", thực hiện thiết kế ngược phân tử / vật liệu / cấu trúc.
  - Mô hình đại diện và ghép nối đa tỉ lệ: Sử dụng mô hình đại diện sâu để xấp xỉ các mô phỏng đắt đỏ về hóa lượng tử / môi trường liên tục / cơ học kết cấu, và ghép nối các mô hình vi mô – trung mô – vĩ mô lại với nhau, thực hiện mô hình hóa đa tỉ lệ.
  - Công cụ tăng cường và quy trình Agent: Kết hợp LLM với trình mô phỏng, máy tính ký hiệu, trình chứng minh định lý tự động, hệ thống tra cứu tài liệu và robot thí nghiệm, xây dựng Agent có thể tự động lập kế hoạch và thực thi nhiệm vụ khoa học.
- **Mô hình**
  - Mô hình biểu diễn phân tử và vật liệu: SchNet, DimeNet, PhysNet, CGCNN, MEGNet, ALIGNN và các mạng đẳng biến E(3) và mạng đồ thị khác, ChemBERTa, MolBERT, MoleculeSTM và các mô hình ngôn ngữ phân tử.
  - Mô hình sinh học cấu trúc: AlphaFold / AlphaFold2 / AlphaFold3, RoseTTAFold, OpenFold, ProteinMPNN, ESM‑IF, dòng ESM các mô hình ngôn ngữ protein và mô hình sinh cấu trúc.
  - Mô phỏng vật lý và học toán tử: PINN, DeepONet, Fourier Neural Operator (FNO) và họ Neural Operator, DeepMD, NequIP và các mô hình học bề mặt thế năng và toán tử.
  - Mô hình toán học và suy luận ký hiệu: Minerva, Gödel, GPT‑f, Lean‑Dojo và các mô hình toán học / chứng minh chuyên dụng, cùng các hệ thống tăng cường công cụ LLM + SymPy/Mathematica/Lean/Coq.
  - Agent khoa học và hệ thống quy trình: Kết hợp truy xuất, sinh mã, gọi mô phỏng và giao diện điều khiển thí nghiệm, đóng gói thành "trợ lý khoa học AI" và nền tảng thí nghiệm tự vận hành cho các lĩnh vực dược phẩm, vật liệu, vật lý, hóa học.

Bắt đầu từ tầng này, tính toán khoa học truyền thống đan xen sâu sắc với học sâu và mô hình lớn: vừa phải tôn trọng các ràng buộc chặt chẽ của vật lý / hóa học / sinh học / toán học, vừa phải tận dụng khả năng khớp mạnh mẽ dựa trên dữ liệu để nâng cao hiệu quả, với mục tiêu cuối cùng là biến AI thành "cộng tác viên" trong nghiên cứu khoa học, chứ không chỉ là một hộp đen dự đoán.

---## 10.1 Thiết kế phân tử và khám phá thuốc (Molecular Modeling & Drug Discovery)

Trong quy trình phát triển thuốc truyền thống, từ giai đoạn phát hiện đích tác dụng đến thử nghiệm lâm sàng thường cần hơn 10 năm và chi phí hàng chục tỷ đô la, trong đó phần lớn thời gian và tài chính được tiêu tốn vào các giai đoạn ban đầu như thiết kế phân tử, dự đoán tính chất và sàng lọc ảo. Mô hình phân tử và khám phá thuốc do AI điều khiển nhằm mục đích sử dụng phương pháp **dựa trên dữ liệu + mô hình sinh** để đẩy nhanh quá trình này: bắt đầu từ mô tả cấu trúc hoặc văn bản, dự đoán tính chất phân tử và ADMET, thiết kế hợp chất ứng viên nhắm vào đích cụ thể, đồng thời giảm đáng kể khối lượng thí nghiệm thực nghiệm thông qua tối ưu đa mục tiêu và sàng lọc ảo.

Một đầu của hướng này kết nối với các nguồn dữ liệu như phần mềm hóa lượng tử (DFT, ab initio), thí nghiệm hoạt tính sinh học, HTS (High‑Throughput Screening), đầu còn lại kết nối với nền tảng Small Molecule Design nội bộ của công ty dược phẩm, SaaS dự đoán tính chất, công cụ thiết kế vật liệu / hóa chất. Dưới đây triển khai từ ba khía cạnh: **kịch bản**, **nguyên lý**, **mô hình**.

- **Kịch bản**
  - Sàng lọc ảo giai đoạn đầu và khám phá Hit: đối mặt với thư viện phân tử ảo có quy mô từ hàng triệu đến hàng chục tỷ, sử dụng AI để dự đoán nhanh hoạt tính / ADMET, xếp hạng các phân tử ứng viên và sàng lọc ra một lượng nhỏ Hit có giá trị cao để đưa vào giai đoạn thí nghiệm.
  - Đánh giá tính chất phân tử và ADMET: trong giai đoạn tối ưu hóa hợp chất dẫn đường (Lead Optimization), liên tục dự đoán các chỉ số như độ hòa tan, độc tính, độ ổn định chuyển hóa và sinh khả dụng đường uống, cung cấp tham chiếu cho đánh giá dược động học và an toàn.
  - Sinh phân tử theo đích: dựa trên thông tin đích protein (đặc điểm túi gắn, phối tử đã biết) hoặc ràng buộc tính chất mục tiêu, tự động sinh ra các phân tử nhỏ ứng viên có cấu trúc đa dạng, hoạt tính cao và có thể tổng hợp được.
  - Thiết kế phân tử vật liệu và hóa chất: hướng đến các kịch bản phi dược phẩm như sơn, dung môi, dung dịch điện giải, chất hoạt động bề mặt, thiết kế phân tử công thức đáp ứng các tính chất vật lý cụ thể (độ nhớt, độ phân cực, năng lượng bề mặt, v.v.).
- **Nguyên lý**
  - Biểu diễn phân tử và dự đoán tính chất:
    - **Biểu diễn cấu trúc**: phổ biến có chuỗi SMILES, đồ thị phân tử (nguyên tử là nút, liên kết là cạnh), tọa độ 3D và đặc trưng lượng tử, v.v.; mô hình cần trích xuất thông tin ngữ nghĩa và hình học có khả năng tổng quát từ các biểu diễn này.
    - **Dự đoán tính chất**: thông qua GNN (GCN, GAT, MPNN) hoặc mạng đẳng biến 3D (SchNet, DimeNet, PhysNet, v.v.), học từ đồ thị phân tử hoặc cấu trúc 3D để dự đoán các tính chất lượng tử như năng lượng, mô-men lưỡng cực, mức năng lượng orbital, cũng như các thuộc tính ADMET như độ hòa tan, LogP, độc tính, độ ổn định chuyển hóa.
    - **Học biểu diễn và tiền huấn luyện**: dựa trên thư viện phân tử quy mô lớn (như ZINC, ChEMBL, PubChem) để thực hiện dự đoán mặt nạ, học tương phản hoặc tiền huấn luyện tự hồi quy, thu được biểu diễn phân tử phổ quát có thể chuyển giao, cung cấp đặc trưng cho các tác vụ QSAR / ADMET hạ nguồn.
  - Sinh cấu trúc và tối ưu phân tử:
    - **Mô hình sinh**: sử dụng các mô hình sinh như VAE, GAN, Flow, Diffusion để lấy mẫu phân tử mới trong không gian SMILES hoặc đồ thị phân tử, yêu cầu đảm bảo tính hợp lệ về mặt cấu trúc hóa học (hóa trị, cấu trúc vòng, v.v.) và tính đa dạng.
    - **Sinh có điều kiện**: đưa vào vector điều kiện (hoạt tính mục tiêu, tính chất hóa lý, đoạn cấu trúc, mô tả túi gắn đích, v.v.) để sinh phân tử ứng viên dưới các ràng buộc cho trước, thực hiện thiết kế định hướng tính chất hoặc bổ sung đoạn cấu trúc.
    - **Tối ưu đa mục tiêu và RL**: thông qua học tăng cường (như MolDQN, v.v.) thực hiện các thao tác "chỉnh sửa" trong không gian phân tử (thêm nguyên tử, thay đổi liên kết, thay thế đoạn), từ đó cân bằng giữa nhiều mục tiêu như hoạt tính, độc tính, khả năng tổng hợp, tránh bằng sáng chế.
  - Mô hình hóa tương tác protein – phân tử nhỏ:
    - **Vị trí gắn kết và hàm chấm điểm**: thông qua tích chập 3D / mạng đồ thị / mô hình tương tác để mô hình hóa mối quan hệ không gian giữa túi gắn protein và phối tử, dự đoán vị trí gắn kết và ái lực gắn kết (Binding Affinity).
    - **Docking và dự đoán Binding Pose**: kết hợp tìm kiếm cấu dạng trong Docking với mô hình sâu, sử dụng hàm chấm điểm sâu hoặc sinh kiểu Diffusion để dự đoán cấu dạng ổn định, nâng cao độ chính xác của docking và giảm chi phí tính toán.
- **Mô hình**
  - Mô hình biểu diễn phân tử:
    - **GNN và mạng 3D**: DimeNet / DimeNet++, SchNet, PhysNet, v.v. là các mô hình đẳng biến 3D xét đến góc / khoảng cách, GCN / GAT / MPNN, v.v. là các mạng nơ-ron đồ thị đa dụng, phù hợp cho dự đoán tính chất và QSAR.
    - **Transformer dựa trên SMILES**: coi phân tử như "câu ngôn ngữ hóa học", sử dụng Transformer để thực hiện mô hình ngôn ngữ tự hồi quy hoặc mặt nạ, cung cấp biểu diễn chuỗi cho sinh và dự đoán tính chất.
  - Mô hình sinh và tối ưu:
    - Mô hình sinh đồ thị: GraphVAE, Junction Tree VAE, GraphAF, v.v. sinh phân tử trong không gian đồ thị / đoạn, nhấn mạnh tính hợp lệ cấu trúc và khả năng diễn giải (xây dựng mức đoạn).
    - Mô hình khuếch tán: Diffusion for Molecules thêm / loại bỏ nhiễu trong không gian đồ thị hoặc cấu trúc 3D để sinh phân tử hoặc cấu dạng mới, có thể kết hợp với vector điều kiện để thực hiện sinh tùy chỉnh.
    - Tối ưu học tăng cường: MolDQN và các phương pháp dựa trên RL coi tối ưu phân tử là bài toán quyết định tuần tự trong không gian trạng thái "chỉnh sửa phân tử", sử dụng hàm thưởng để mã hóa các chỉ số đa mục tiêu.
  - Mô hình phân tử lớn và hướng đa phương thức:
    - **Mô hình ngôn ngữ phân tử**: ChemBERTa, MolBERT, v.v. được tiền huấn luyện trên kho ngữ liệu SMILES quy mô lớn, hỗ trợ chuyển giao zero-shot hoặc few-shot cho các tác vụ hạ nguồn.
    - **Mô hình phân tử đa phương thức**: MoleculeSTM, v.v. tích hợp cấu trúc (đồ thị / 3D), mô tả văn bản (lộ trình tổng hợp, tóm tắt tài liệu), thuộc tính phân tử, thực hiện truy xuất đa phương thức và dự đoán kết hợp.
  - Hình thái sản phẩm và ứng dụng:
    - Nền tảng sàng lọc thuốc giai đoạn đầu và nền tảng Small Molecule Design nội bộ hướng đến công ty dược phẩm, cung cấp năng lực tích hợp như sàng lọc ảo, sinh phân tử, dự đoán ADMET.
    - SaaS dự đoán tính chất hướng đến nhân viên R&D: truy vấn nhanh tính chất phân tử, ADMET, độ tương tự phân tử, v.v. thông qua Web hoặc API.
    - Công cụ thiết kế mức phân tử hướng đến vật liệu và hóa chất, dùng cho phát triển tùy chỉnh các hệ phân tử như sơn, dung môi, dung dịch điện giải.

Bắt đầu từ hướng con này, quy trình thiết kế thuốc đang chuyển từ "chuyên gia + thí nghiệm thông lượng cao" sang vòng khép kín "chuyên gia + mô hình + thí nghiệm tự động", AI không chỉ đưa ra điểm số mà còn dần tham gia vào toàn bộ các khâu từ "đề xuất ý tưởng" đến "sinh ứng viên" rồi đến "sàng lọc và tối ưu".

### 10.1.1 Biểu diễn phân tử và dự đoán tính chất / ADMET

Trong nghiên cứu và phát triển thuốc và vật liệu, một năng lực cơ bản là: **cho trước một phân tử, dự đoán nhanh và chính xác tính chất và hành vi của nó**, bao gồm các tính chất hóa lượng tử (năng lượng, orbital, mô-men lưỡng cực), tính chất hóa lý (độ hòa tan, LogP), cũng như các chỉ số ADMET liên quan đến dược động học / độc tính. Bản chất của vấn đề này là làm thế nào để học được **biểu diễn vừa tuân theo quy luật hóa học, vừa có khả năng tổng quát** từ các dạng biểu diễn phân tử khác nhau.

- Ở cấp độ **biểu diễn phân tử**, các biểu diễn phổ biến bao gồm:
  - **Chuỗi SMILES / SELFIES, v.v.**: coi phân tử như chuỗi, tự nhiên phù hợp để mô hình hóa ngôn ngữ bằng RNN / Transformer.
  - **Biểu diễn đồ thị phân tử**: nguyên tử là nút, liên kết là cạnh, nút và cạnh mang các đặc trưng như loại, hóa trị, tính thơm; phù hợp để sử dụng GNN, MPNN, v.v. để mô hình hóa lân cận và topo.
  - **Biểu diễn hình học 3D**: dựa trên tọa độ 3D, góc liên kết, góc nhị diện, v.v. thu được từ hóa lượng tử hoặc tối ưu trường lực, cung cấp nền tảng để mạng đẳng biến E(3) nắm bắt cấu trúc không gian.
- Ở cấp độ **dự đoán tính chất và ADMET**, các tác vụ mục tiêu bao gồm:
  - Dự đoán tính chất lượng tử của phân tử nhỏ: năng lượng, mô-men lưỡng cực, mức năng lượng HOMO/LUMO, v.v., để thay thế cho các tính toán DFT / ab initio đắt đỏ.
  - QSAR / dự đoán hoạt tính: đưa ra hoạt tính (IC50, Ki), độ chọn lọc, v.v. của hợp chất đối với đích cụ thể, dùng để sàng lọc ứng viên tiềm năng.
  - Các chỉ số liên quan đến ADMET: độ hòa tan, tính thấm, độc tính, độ ổn định chuyển hóa, ức chế CYP, v.v., là chìa khóa để đánh giá khả năng phát triển thuốc.

Lộ trình mô hình điển hình là: sử dụng DimeNet / SchNet / PhysNet / GNN, v.v. để trích xuất biểu diễn cao chiều trên cấu trúc phân tử, sau đó thông qua học đa tác vụ để đồng thời dự đoán nhiều tính chất; thực hiện tiền huấn luyện trên dữ liệu công khai quy mô lớn hoặc dữ liệu nội bộ doanh nghiệp để nâng cao năng lực mô hình hóa trong kịch bản dữ liệu nhỏ. Đối ngoại, cung cấp dưới dạng SaaS dự đoán ADMET hoặc API nền tảng nội bộ, mang lại khả năng "thí nghiệm ảo" nhanh chóng cho nhóm dự án.

### 10.1.2 Sinh cấu trúc và tối ưu phân tử: từ SMILES / Graph đến thuốc ứng viên

Sau khi có được mô hình biểu diễn phân tử và dự đoán tính chất đáng tin cậy, mục tiêu xa hơn là **chủ động sinh ra các phân tử "tốt hơn"**: không chỉ đánh giá các hợp chất cho trước, mà còn trực tiếp thiết kế ra các phân tử ứng viên mới xoay quanh đích và ràng buộc tính chất. Hướng này thường được gọi là **sinh phân tử và tối ưu phân tử**.

Về mặt **sinh cấu trúc**, nghiên cứu và thực hành kỹ thuật chủ yếu xoay quanh ba lộ trình:

1. **Sinh chuỗi dựa trên SMILES**
   Coi phân tử như chuỗi ký tự, sử dụng VAE, GAN hoặc Transformer tự hồi quy để lấy mẫu cấu trúc mới trong không gian SMILES; thông qua ràng buộc ngữ pháp (như SELFIES) hoặc hậu xử lý để đảm bảo tính hợp lệ hóa học.
2. **Sinh dựa trên đồ thị / đoạn**
   Các mô hình như GraphVAE, Junction Tree VAE, GraphAF, v.v. trực tiếp xây dựng cấu trúc ở cấp độ đồ thị phân tử hoặc đoạn cơ sở (Fragment / Motif), gần gũi hơn với tư duy tổng hợp hóa học, có lợi cho việc kiểm soát vòng, nhóm chức và cấu trúc khung.
3. **Sinh dựa trên khuếch tán và 3D**
   Các phương pháp như Diffusion for Molecules thực hiện khuếch tán và khử nhiễu trong không gian đồ thị hoặc tọa độ 3D, có thể đồng thời xem xét cấu dạng không gian, phù hợp để sinh các phối tử hoặc đơn vị vật liệu nhạy cảm với hình dạng 3D.

Về mặt **tối ưu phân tử**, điểm mấu chốt là đưa vào **mục tiêu và ràng buộc**:

- **Sinh có điều kiện**: đưa hoạt tính mục tiêu, tính chất hóa lý hoặc neo đoạn làm vector điều kiện vào mô hình, khiến nó thiên về đáp ứng các điều kiện này khi sinh.
- **Học tăng cường và tối ưu đa mục tiêu**: lấy mô hình dự đoán tính chất làm "môi trường", sử dụng RL để ra quyết định tuần tự trong không gian phân tử (như MolDQN), thiết lập thưởng và phạt trên các chỉ số đa chiều như hoạt tính, độc tính, khả năng tổng hợp, rủi ro bằng sáng chế, thực hiện cân bằng đa mục tiêu.
- **Khả năng tổng hợp và tiên nghiệm hóa học**: tích hợp mô hình dự đoán lộ trình tổng hợp, chỉ số độ phức tạp tổng hợp (như SA score) trong quá trình sinh và tối ưu, tránh tạo ra cấu trúc khó tổng hợp hoặc không ổn định.

Về mặt sản phẩm hóa, loại mô hình này thường được đóng gói vào "nền tảng thiết kế thuốc AI" nội bộ của công ty dược phẩm: cho trước đích, cấu trúc dẫn đường đã biết và hướng tối ưu, nền tảng tự động đề xuất nhiều lô phân tử ứng viên, nhóm dự án sau đó kết hợp với thí nghiệm, bằng sáng chế và cân nhắc thương mại để dần sàng lọc và lặp lại, thực hiện tối ưu vòng khép kín "mô hình–thí nghiệm–mô hình".## 10.2 Mô hình hóa Protein & Sinh học Cấu trúc (Protein & Structural Biology)

Trong khoa học sự sống, **cấu trúc quyết định chức năng** là một nguyên tắc gần như mang tính giáo điều: cách protein gấp cuộn thành cấu trúc ba chiều, cách chúng lắp ráp với các phân tử khác thành phức hợp, quyết định trực tiếp đến biểu hiện chức năng của chúng trong tế bào. Phân tích cấu trúc truyền thống dựa vào các phương pháp thực nghiệm như tinh thể học tia X, NMR, kính hiển vi điện tử đông lạnh, với chu kỳ dài, chi phí cao và tồn tại những điểm mù lớn như "khó kết tinh, khó phân tích". Các mô hình học sâu mà đại diện là AlphaFold đã đẩy mạnh năng lực "từ trình tự trực tiếp đến cấu trúc", giúp thu được cấu trúc chất lượng cao ở quy mô toàn bộ hệ gen trở nên khả thi.

Hướng nghiên cứu này một mặt kết nối với các cơ sở dữ liệu trình tự và cấu trúc như UniProt / PDB, các dự án thực nghiệm omics và cấu trúc omics, mặt khác kết nối với các nền tảng thiết kế và phân tích cấu trúc trong ngành công nghiệp như dược phẩm sinh học, sinh học tổng hợp, kỹ thuật enzyme. Dưới đây, chúng tôi cũng triển khai từ ba góc độ: **kịch bản**, **nguyên lý**, **mô hình**, đồng thời phân tách thêm các hướng con then chốt.

- **Kịch bản**
  - Chú giải và sàng lọc cấu trúc đích: dự đoán cấu trúc của số lượng lớn protein ở cấp độ hệ gen, hỗ trợ phát hiện đích, chú giải chức năng và phân tích đường dẫn truyền tín hiệu; kết hợp thông tin biến thể để đánh giá cơ chế gây bệnh tiềm năng.
  - Thiết kế kháng thể / thuốc protein: mô hình hóa và thiết kế tinh vi các vùng then chốt như vùng biến đổi kháng thể (CDR), vùng liên kết thụ thể, nhằm tối ưu hóa ái lực, tính đặc hiệu và tính sinh miễn dịch.
  - Thiết kế enzyme và xúc tác sinh học: dựa trên cấu trúc ba chiều của enzyme và môi trường vị trí hoạt động, thiết kế thư viện đột biến và biến thể, nâng cao hiệu suất xúc tác, phạm vi cơ chất và độ ổn định.
  - Nghiên cứu phức hợp và tương tác: dự đoán cấu trúc phức hợp protein–protein, protein–axit nucleic, protein–phân tử nhỏ, phân tích mô hình tương tác bề mặt tiếp xúc, cung cấp nền tảng cho thiết kế thuốc và mô hình hóa đường dẫn truyền tín hiệu.
  - Phân tích hiệu ứng đột biến và kháng thuốc: đánh giá ảnh hưởng của biến thể tự nhiên hoặc đột biến nhân tạo đến độ ổn định cấu trúc, chức năng và liên kết phối tử, phân tích cơ sở cấu trúc của đột biến kháng thuốc.
- **Nguyên lý**
  - Dự đoán cấu trúc protein:
    - **Trình tự → Cấu trúc**: xuất phát từ trình tự axit amin (trình tự đơn hoặc chứa MSA đa trình tự), mô hình hóa các ràng buộc hình học giữa từng cặp gốc (khoảng cách, góc, bản đồ tiếp xúc), sau đó thông qua mô-đun tái tạo hình học để tạo ra cấu trúc 3D toàn nguyên tử.
    - **Tín hiệu đồng tiến hóa**: sử dụng các mẫu đột biến đồng thời (co-evolution) giữa các trình tự tương đồng, suy luận mối quan hệ tiếp xúc tiềm năng giữa các gốc, cung cấp tiên nghiệm mạnh cho ràng buộc gấp cuộn.
    - **Tinh chỉnh cấu trúc và ước lượng độ bất định**: thực hiện tinh chỉnh cục bộ (relax, repack) cho cấu trúc dự đoán, đồng thời xuất ra điểm tin cậy (như pLDDT, PAE), hướng dẫn lựa chọn "vùng tin cậy" trong các ứng dụng tiếp theo.
  - Mô hình hóa phức hợp và lắp ráp phân tử:
    - **Mô hình hóa đa chuỗi kết hợp**: lấy nhiều chuỗi protein hoặc trình tự protein + axit nucleic làm đầu vào, đưa vào nhận dạng chuỗi và ràng buộc bề mặt tiếp xúc, trực tiếp xuất ra cấu trúc phức hợp hoàn chỉnh.
    - **Dự đoán bề mặt tiếp xúc và lắp ráp**: dựa trên cấu trúc đơn thể đã biết, thông qua mô hình đồ thị hoặc mô hình khuếch tán để dự đoán cấu hình bề mặt tiếp xúc và phương thức lắp ráp có khả năng nhất.
  - Thiết kế protein và dự đoán hiệu ứng đột biến:
    - **Gấp cuộn ngược (Inverse Folding)**: với cấu trúc khung xương ba chiều hoặc ràng buộc tô-pô cho trước, tạo ra trình tự axit amin có thể gấp cuộn ổn định thành cấu trúc đó, thực hiện thiết kế protein de novo.
    - **Mô hình hóa hiệu ứng đột biến**: kết hợp mô hình ngôn ngữ protein với mô hình cấu trúc, dự đoán ảnh hưởng của đột biến cụ thể đến độ ổn định (ΔΔG), hoạt tính hoặc ái lực liên kết, hỗ trợ tiến hóa định hướng và sàng lọc biến thể.
- **Mô hình**
  - Dự đoán cấu trúc:
    - AlphaFold / AlphaFold2 / AlphaFold3: lấy cơ chế chú ý và mô-đun hình học làm trung tâm, từ MSA, cấu trúc mẫu và đặc trưng trình tự để dự đoán cấu trúc protein với độ chính xác cao, đồng thời xuất ra ước lượng độ bất định.
    - RoseTTAFold, OpenFold: sử dụng biểu diễn đa quỹ đạo (sequence / pair / structure) và cơ chế chú ý đa thang đo, cung cấp triển khai cơ bản cho mã nguồn mở và ứng dụng công nghiệp.
  - Mô hình hóa phức hợp và bề mặt tiếp xúc:
    - AlphaFold‑Multimer: trong kịch bản đa chuỗi, mô hình hóa trực tiếp cấu trúc phức hợp protein–protein, cân nhắc cả gấp cuộn đơn thể và tương tác bề mặt tiếp xúc.
    - RFdiffusion: dựa trên mô hình khuếch tán trong không gian 3D để tạo hoặc tối ưu hóa khung xương protein và bề mặt tiếp xúc phức hợp, thực hiện lắp ráp phức tạp và thiết kế đối xứng.
    - Các phương pháp như DiffDock: trong hệ thống protein–phân tử nhỏ, sử dụng khuếch tán hoặc hàm chấm điểm sâu để dự đoán Binding Pose và mô hình liên kết.
  - Mô hình thiết kế và đột biến:
    - ProteinMPNN: trong điều kiện cấu trúc cho trước, tạo ra trình tự tương thích, dùng cho thiết kế ổn định khung xương và bề mặt tiếp xúc.
    - Dòng ESM‑IF, ESMFold / ESM‑2: dựa trên mô hình ngôn ngữ huấn luyện trước trên quy mô lớn trình tự protein, có năng lực suy luận cấu trúc, chức năng và hiệu ứng đột biến từ trình tự.
  - Sản phẩm và ứng dụng:
    - Dịch vụ và cơ sở dữ liệu dự đoán cấu trúc protein trên đám mây công cộng (như AlphaFold DB), cung cấp chú giải cấu trúc quy mô lớn và giao diện tải xuống cho nghiên cứu khoa học.
    - Nền tảng thiết kế cấu trúc nội bộ của các công ty dược phẩm sinh học: tích hợp các mô-đun dự đoán cấu trúc protein, thiết kế kháng thể, kỹ thuật enzyme, docking protein–phối tử.
    - SaaS công nghệ sinh học: cung cấp các công cụ dự đoán vị trí liên kết, đánh giá nhiệt động học bề mặt tiếp xúc, đánh giá ái lực và tính sinh miễn dịch, phục vụ phát triển thuốc kháng thể và chế phẩm sinh học.

Bắt đầu từ hướng con này, AI không chỉ "diễn giải" các cấu trúc protein tồn tại trong tự nhiên, mà còn "sáng tạo" ra các kiến trúc protein và phức hợp hoàn toàn mới, đưa sinh học cấu trúc từ "thời đại đo lường thụ động" bước vào "thời đại thiết kế chủ động".

### 10.2.1 Dự đoán cấu trúc protein và lắp ráp phức hợp

Dự đoán cấu trúc protein là một trong những đột phá tiêu biểu nhất của sự kết hợp giữa sinh học cấu trúc và AI. Câu hỏi cốt lõi của nó là: **liệu có thể xuất phát từ trình tự, trong điều kiện không phụ thuộc hoặc ít phụ thuộc vào dữ liệu thực nghiệm, dự đoán được cấu trúc 3D gần với độ phân giải thực nghiệm hay không?** Trong ứng dụng thực tế, cấu trúc đơn thể thường chỉ là điểm khởi đầu, điều quan trọng hơn là cách protein lắp ráp với các phân tử khác thành phức hợp.

Trong **dự đoán cấu trúc đơn thể**, quy trình điển hình bao gồm:

1. **Mã hóa trình tự / MSA**: thông qua trích xuất đặc trưng trình tự và gióng hàng đa trình tự để khai thác tín hiệu đồng tiến hóa.
2. **Suy luận ràng buộc hình học**: dự đoán phân bố khoảng cách, xác suất tiếp xúc và hướng tương đối giữa các cặp gốc, hình thành trường hình học "giả đo lường".
3. **Xây dựng cấu trúc và tinh chỉnh lặp**: dưới các ràng buộc hình học, sử dụng mô-đun cấu trúc (như khối bất biến xoay-tịnh tiến, cập nhật tọa độ nội) để xây dựng cấu trúc 3D, và lặp refinement nhiều lần để giảm vi phạm hình học.
4. **Độ bất định và đánh giá chất lượng**: xuất ra các chỉ số như độ tin cậy theo từng gốc (pLDDT), ước lượng sai số cặp gốc (PAE), cung cấp tham khảo cho mô hình hóa và sàng lọc tiếp theo.

Trong **dự đoán phức hợp và lắp ráp**, vấn đề được mở rộng thêm thành "nhiều chuỗi tổ chức và tương tác với nhau như thế nào trong không gian":

- Đối với **phức hợp protein–protein**, thông thường trên cơ sở đầu vào đa chuỗi, sử dụng chiến lược mô hình hóa đa chuỗi chuyên dụng (như AlphaFold‑Multimer) để trực tiếp xuất ra cấu trúc lắp ráp.
- Đối với **hệ thống protein–axit nucleic / protein–phân tử nhỏ**, một hướng là dự đoán cấu trúc của từng thành phần trước, sau đó thông qua docking và hàm chấm điểm bề mặt tiếp xúc để dự đoán phương thức lắp ráp; hướng khác là sử dụng mô hình khuếch tán hoặc mô hình hóa kết hợp để trực tiếp tạo ra cấu trúc phức hợp trong không gian 3D.
- Trong kịch bản đa tiểu đơn vị, lắp ráp quy mô lớn, còn cần kết hợp các ràng buộc đối xứng, bản đồ mật độ EM độ phân giải thấp và các thông tin khác, tiến hành lắp ráp phân tầng và đa thang đo.

Trong thực tiễn sản phẩm, dự đoán cấu trúc và lắp ráp thường được đóng gói thành dịch vụ đám mây hoặc chuỗi công cụ cục bộ, cung cấp thông tin cấu trúc nền tảng cho chú giải chức năng protein, mô hình hóa mạng tương tác và xác nhận đích thuốc.

### 10.2.2 Thiết kế protein và dự đoán hiệu ứng đột biến: từ cấu trúc đến điều hòa chức năng

Sau khi nắm vững ánh xạ "trình tự → cấu trúc", bước tiếp theo là bài toán ngược: **làm thế nào để thiết kế trình tự protein và phương án đột biến phù hợp, trong điều kiện cấu trúc hoặc yêu cầu chức năng cho trước?** Đây chính là cốt lõi của thiết kế protein và dự đoán hiệu ứng đột biến.

Trong **thiết kế protein**, các nhiệm vụ then chốt bao gồm:

- **Gấp cuộn ngược (Inverse Folding)**: với khung xương mục tiêu (backbone) hoặc cấu trúc tô-pô tổng thể cho trước, tạo ra trình tự axit amin có thể gấp cuộn ổn định thành cấu trúc đó, quá trình này có thể được thực hiện thông qua các mô hình sinh điều kiện cấu trúc như ProteinMPNN, ESM‑IF.
- **Thiết kế định hướng chức năng**: trong điều kiện duy trì cấu trúc tổng thể ổn định, tiến hành thiết kế định hướng cho vị trí hoạt động, túi liên kết, vùng bề mặt tiếp xúc, tối ưu hóa ái lực, tính đặc hiệu và hiệu suất xúc tác.
- **Ràng buộc khả năng sản xuất và tính sinh miễn dịch**: trong quá trình thiết kế trình tự, đưa vào các ràng buộc như tính khả thi biểu hiện, biến đổi hậu dịch mã, rủi ro sinh miễn dịch, đảm bảo tính khả thi của trình tự ứng viên trong phát triển chế phẩm sinh học.

Trong **dự đoán hiệu ứng đột biến**, các điểm được quan tâm là:

- **Thay đổi độ ổn định (ΔΔG)**: với cấu trúc kiểu dại và vị trí đột biến cho trước, dự đoán ảnh hưởng của đột biến đơn điểm hoặc đa điểm đến độ ổn định gấp cuộn, dùng cho tiến hóa định hướng và phân tích đột biến kháng thuốc.
- **Thay đổi hoạt tính và ái lực**: kết hợp mô hình cấu trúc và mô hình ngôn ngữ protein, đánh giá ảnh hưởng của đột biến đến hoạt tính enzyme, ái lực phối tử và điều hòa đường dẫn truyền tín hiệu.
- **Thiết kế thư viện biến thể quy mô lớn**: trước khi tiến hành thí nghiệm sàng lọc in vivo / in vitro, sử dụng mô hình để tiền sàng lọc không gian đột biến khổng lồ, giữ lại các biến thể tiềm năng cao, giảm chi phí thực nghiệm.

Ở cấp độ kỹ thuật và sản phẩm, thiết kế protein và dự đoán hiệu ứng đột biến thường được tích hợp thành "mô-đun thiết kế và tối ưu hóa cấu trúc" nội bộ của các công ty dược phẩm sinh học / sinh học tổng hợp: từ cấu trúc khung xương ứng viên, tự động đề xuất nhiều vòng thiết kế đột biến và thư viện biến thể, tạo thành vòng lặp khép kín theo hướng dữ liệu với thí nghiệm sàng lọc thông lượng cao.## 10.3 Mô phỏng Vật lý & Tính toán Tăng tốc (Physics Simulation & Surrogate Modeling)

Trong các lĩnh vực hàng không vũ trụ, ô tô, kỹ thuật dân dụng, năng lượng, hóa chất, **mô phỏng độ chính xác cao là khâu cốt lõi của thiết kế và kiểm chứng**. Tuy nhiên, CFD (Computational Fluid Dynamics), FEA (Finite Element Analysis), động lực học phân tử (MD) và các phương pháp giải PDE thường có chi phí tính toán đắt đỏ, khó hỗ trợ quét tham số quy mô lớn, điều khiển thời gian thực hoặc tối ưu hóa trực tuyến. Mô phỏng vật lý và mô hình đại diện (surrogate modeling) được điều khiển bởi AI cố gắng sử dụng mạng sâu để xấp xỉ các bộ giải số hoặc chính toán tử, nhằm đạt được khả năng tăng tốc theo cấp độ lớn trong khi vẫn đảm bảo tính nhất quán vật lý và khả năng diễn giải.

Hướng tiếp cận này một mặt kết nối với phần mềm mô phỏng truyền thống (ANSYS, Fluent, COMSOL, bộ giải tự phát triển), dữ liệu đo lường thực nghiệm và cảm biến, mặt khác kết nối với nền tảng thiết kế kỹ thuật, thiết kế khí động học cho xe tự hành và hàng không vũ trụ, hệ thống mô phỏng và tối ưu hóa quy trình hóa chất. Dưới đây triển khai từ ba góc độ: **kịch bản**, **nguyên lý** và **mô hình**.

- **Kịch bản**
  - Tăng tốc mô phỏng kỹ thuật: Với hình học và điều kiện vận hành cho trước, sử dụng mô hình đại diện sâu để dự đoán nhanh trường áp suất, trường vận tốc, trường nhiệt độ, phân bố ứng suất/biến dạng, hỗ trợ cho nhiều vòng lặp thiết kế và tối ưu hóa.
  - Mô phỏng quy trình phức tạp và tối ưu hóa công nghệ: Trong các ngành công nghiệp quy trình như hóa chất, năng lượng, sử dụng ML để xấp xỉ mô hình cơ chế hoặc mô hình quy trình hộp đen, cho phép đánh giá nhanh và điều khiển thời gian thực.
  - Mô phỏng ở quy mô phân tử/vật liệu: Sử dụng bề mặt thế năng ML (Neural Network Potential) thay thế cho tính toán thế năng và lực ab initio có chi phí cao, tăng tốc động lực học phân tử và mô phỏng hành vi pha vật liệu.
  - Ghép nối đa quy mô và liên ngành: Kết nối các mô hình vi mô – trung mô – vĩ mô thông qua mô hình đại diện sâu, xây dựng chuỗi mô phỏng và tối ưu hóa đa quy mô đầu cuối.
- **Nguyên lý**
  - Mô hình thay thế / Mô hình đại diện (Surrogate Models):
    - Học ánh xạ "tham số đầu vào → trường/chỉ số đầu ra" từ dữ liệu mô phỏng số hoặc thực nghiệm, đóng vai trò xấp xỉ của bộ giải độ chính xác cao.
    - Trong không gian tham số nhiều chiều, kết hợp học chủ động (active learning) và tối ưu hóa Bayes, tự động chọn các điểm mẫu có lượng thông tin cao nhất để thực hiện mô phỏng hoặc thí nghiệm độ chính xác cao, liên tục nâng cao chất lượng mô hình đại diện.
  - Mạng nơ-ron nhận biết vật lý (PINN):
    - Đưa PDE, điều kiện ban đầu/điều kiện biên và các định luật bảo toàn vật lý vào hàm mất mát, sử dụng kỹ thuật vi phân tự động để giải trường vật lý trên không gian liên tục.
    - Hỗ trợ bài toán thuận (giải trường trạng thái) và bài toán nghịch (suy ngược tham số nguồn, tham số vật liệu từ quan sát thưa thớt), đặc biệt phù hợp với các bài toán có hình học và điều kiện biên phức tạp mà phương pháp số truyền thống khó xử lý.
  - Học toán tử và Neural Operator:
    - Không chỉ khớp "nghiệm trong điều kiện cụ thể", mà học ánh xạ từ hàm sang hàm (toán tử), chẳng hạn như "điều kiện biên/số hạng nguồn → toàn bộ trường nghiệm".
    - Các phương pháp tiêu biểu như Fourier Neural Operator (FNO), DeepONet, thông qua biến đổi miền tần số hoặc kiến trúc mạng đặc thù, nâng cao khả năng tổng quát hóa trên các độ phân giải lưới và hình dạng hình học khác nhau.
  - Mô hình hóa đa quy mô:
    - Huấn luyện các tham số hiệu dụng hoặc quan hệ cấu thành ở cấp trung mô/vĩ mô trên dữ liệu mô phỏng vi mô, với mô hình đại diện sâu đảm nhận vai trò "lớp cầu nối quy mô".
    - Đối với các bài toán vật liệu phức tạp, tương tác chất lỏng – kết cấu và dòng nhiều pha, sử dụng mô hình sâu để truyền thông tin giữa các quy mô và mô-đun vật lý khác nhau.
- **Mô hình**
  - Mạng nơ-ron vật lý tổng quát:
    - Dòng PINN: Giải bằng cách tối thiểu hóa phần dư PDE trên các điểm lấy mẫu trong miền không gian – thời gian, phù hợp với các phương trình Navier‑Stokes, Maxwell, đàn hồi, v.v.
    - Dòng DeepONet, FNO, Neural Operator: Học trực tiếp xấp xỉ "cấp toán tử" của bộ giải PDE, suy luận nhanh trên nhiều điều kiện vận hành và hình học.
  - Mô hình thế năng quy mô phân tử/vật liệu:
    - DeepMD, SchNet, NequIP, SpookyNet, v.v.: Xây dựng bề mặt thế năng ML độ chính xác cao, tăng tốc đáng kể tính toán lực và năng lượng trong khi vẫn đạt độ chính xác gần với ab initio.
    - Kết hợp với các engine MD truyền thống, thực hiện động lực học phân tử độ chính xác cao cho hệ lớn và thang thời gian dài.
  - Mô hình đại diện CFD / Cơ học kết cấu:
    - Mạng Encoder‑Decoder như U‑Net / UNet++: Dự đoán trường dòng chảy hoặc trường nhiệt độ từ hình học/điều kiện biên trên lưới đều.
    - Mạng nơ-ron đồ thị trên lưới (GNN on Mesh): Thực hiện truyền và cập nhật thông điệp trên các nút/phần tử của lưới phi cấu trúc, phù hợp với các kịch bản hình học phức tạp và ghép nối đa trường vật lý.
    - Neural Operator cho CFD: Tổng quát hóa dự đoán trường dòng chảy trên các số Reynolds, điều kiện dòng tới và tham số hình học khác nhau.
  - Sản phẩm và ứng dụng:
    - Mô-đun tăng tốc AI trong phần mềm mô phỏng công nghiệp: Cung cấp chức năng ước lượng nhanh và phân tích độ nhạy ở lớp ngoài của bộ giải truyền thống.
    - Nền tảng mô phỏng và tối ưu hóa quy trình hóa chất/năng lượng: Kết hợp mô hình cơ chế + mô hình đại diện + thuật toán tối ưu thành công cụ tối ưu hóa quy trình tích hợp.
    - Thiết kế khí động học cho xe tự hành/hàng không vũ trụ: Thực hiện quét biến thiết kế quy mô lớn và tối ưu hóa hình dạng tự động trong thiết kế hình dạng khí động học.

### 10.3.1 Mô hình Đại diện & Mạng Nơ-ron Nhận biết Vật lý (PINN)

**Mô hình đại diện (Surrogate Models)** và **Mạng nơ-ron nhận biết vật lý (PINN)** là hai lộ trình bổ trợ cho nhau trong việc AI hóa mô phỏng vật lý: lộ trình thứ nhất xuất phát từ dữ liệu để xấp xỉ ánh xạ mô phỏng, lộ trình thứ hai xuất phát từ vật lý để xây dựng mục tiêu học.

Trong kịch bản **mô hình đại diện**, quy trình điển hình là:

1. Thu thập một tập dữ liệu mẫu thông qua mô phỏng số độ chính xác cao hoặc thí nghiệm (tham số đầu vào, điều kiện biên, hình học → đại lượng vật lý đầu ra).
2. Huấn luyện mạng sâu (như MLP, mạng tích chập, GNN, Neural Operator) để xấp xỉ hàm ánh xạ này.
3. Trong tối ưu hóa thiết kế, quét tham số hoặc điều khiển thời gian thực, sử dụng mô hình đại diện thay thế bộ giải đắt đỏ để đánh giá nhanh.

Trong kịch bản **PINN**, mô hình không còn dựa chủ yếu vào lượng lớn nhãn giám sát, mà xây dựng hàm mất mát thông qua tối thiểu hóa phần dư PDE và vi phạm điều kiện biên:

- Tại các điểm lấy mẫu không gian/thời gian, sử dụng mạng nơ-ron để xuất ra đại lượng vật lý (như trường vận tốc, áp suất, chuyển vị), vi phân tự động để thu được gradient và đạo hàm.
- Thay các đạo hàm này vào PDE để tạo thành phần dư, cùng với sai số của điều kiện biên và điều kiện ban đầu tạo thành tổng mất mát.
- Thông qua tối ưu hóa, đưa phần dư PDE và sai số biên tiến gần về 0 nhất có thể, từ đó thu được nghiệm xấp xỉ thỏa mãn phương trình vật lý.

Hai phương pháp có thể kết hợp sử dụng: khi có một phần dữ liệu độ chính xác cao, sử dụng sai số dữ liệu + phần dư vật lý để cùng ràng buộc quá trình huấn luyện, nâng cao độ chính xác và khả năng tổng quát hóa. Trong ứng dụng kỹ thuật, PINN đặc biệt phù hợp để xử lý bài toán nghịch và mô hình hóa dựa trên dữ liệu, như suy ngược tham số vật liệu, số hạng nguồn hoặc vị trí khuyết tật từ quan sát cảm biến.

### 10.3.2 Neural Operator & Mô hình hóa Vật lý Đa quy mô

**Neural Operator** nâng mô hình hóa vật lý từ ánh xạ "điểm-điểm / tham số-nghiệm" lên cấp độ "hàm-hàm": nó học xấp xỉ toán tử thống nhất "cho một lớp PDE và điều kiện biên, giải trường nghiệm của nó", thay vì nghiệm cụ thể cho một điều kiện vận hành đơn lẻ. Điều này mở ra khả năng mới cho việc tổng quát hóa trên nhiều điều kiện vận hành, nhiều hình học và độ phân giải lưới khác nhau.

Trong **học toán tử**, cách làm điển hình là:

- Lấy hàm (như số hạng nguồn, điều kiện biên, trường tham số vật liệu) làm đầu vào, sử dụng mạng (như FNO, DeepONet) để xuất ra toàn bộ hàm trường nghiệm.
- Thông qua huấn luyện trên các mẫu với lưới, tham số và hình học khác nhau, để mô hình học được "mẫu chung" của bộ giải PDE.
- Khi triển khai, chỉ cần cung cấp hàm đầu vào mới (như điều kiện biên mới, hình học mới), là có thể suy luận nhanh để thu được trường nghiệm xấp xỉ.

Trong kịch bản **mô hình hóa đa quy mô**:

- Huấn luyện Neural Operator trên lượng lớn dữ liệu được tạo ra ở quy mô vi mô (như động lực học phân tử, dẻo tinh thể), học ánh xạ giữa cấu trúc vi mô và phản hồi vĩ mô.
- Trong mô hình môi trường liên tục vĩ mô, sử dụng ánh xạ này làm mô-đun quan hệ cấu thành hoặc tính toán tham số hiệu dụng, thực hiện ghép nối vi mô – vĩ mô.
- Đối với các hệ thống phức tạp như tương tác chất lỏng – kết cấu, dòng nhiều pha, dòng phản ứng, có thể mô hình hóa riêng từng trường vật lý và ghép nối thông qua các biến giao diện chia sẻ (như thông lượng, lực giao diện).

Trong thực tiễn kỹ thuật, Neural Operator đang dần chuyển từ nguyên mẫu nghiên cứu sang ứng dụng, trở thành hướng công nghệ quan trọng cho "bộ giải tăng tốc + cầu nối đa quy mô" trong các kịch bản như CFD, địa vật lý, mô hình hóa khí hậu.## 10.4 Khám phá vật liệu và thiết kế tinh thể (Materials Science & Crystal Design)

Trong khoa học vật liệu, một mâu thuẫn cốt lõi là: **không gian thiết kế gần như vô hạn, trong khi chi phí thực nghiệm và tính toán độ chính xác cao là cực kỳ đắt đỏ**. Làm thế nào để tìm ra các vật liệu ứng viên đáp ứng yêu cầu hiệu suất cụ thể một cách hiệu quả trong không gian tổ hợp hóa học và cấu trúc khổng lồ, là vấn đề then chốt trong các lĩnh vực năng lượng mới, điện tử, vật liệu kết cấu và vật liệu chức năng. Khám phá vật liệu và thiết kế tinh thể do AI thúc đẩy, thông qua mạng nơ-ron đồ thị (GNN), mô hình sinh và sàng lọc ảo thông lượng cao, đang dần chuyển đổi hoạt động R&D từ "thử-và-sai" sang "dựa trên dữ liệu + thiết kế ngược".

Hướng đi này một mặt kết nối với các cơ sở dữ liệu vật liệu như Materials Project, OQMD, AFLOW cùng kết quả tính toán DFT / MD, mặt khác kết nối với các nền tảng R&D vật liệu trong các kịch bản ứng dụng như pin, quang điện, xúc tác, bán dẫn, hợp kim. Dưới đây sẽ triển khai từ ba góc độ: **kịch bản**, **nguyên lý** và **mô hình**.

- **Kịch bản**
  - Sàng lọc vật liệu theo hướng hiệu suất: với cấu trúc tinh thể hoặc công thức hóa học cho trước, dự đoán cấu trúc dải năng lượng, band gap, độ linh động hạt tải, các tính chất nhiệt / điện / từ, v.v., cung cấp cơ sở cho việc sàng lọc và tối ưu tổ hợp vật liệu.
  - R&D vật liệu năng lượng mới: hướng tới các hệ thống như chất điện phân pin, vật liệu điện cực, chất dẫn ion rắn, lớp hấp thụ quang điện và chất xúc tác, dự đoán độ dẫn ion, độ ổn định, cửa sổ điện hóa và hoạt tính, v.v.
  - Sàng lọc ảo thông lượng cao (HTVS): trong thư viện ứng viên quy mô lớn đã xây dựng, sử dụng mô hình ML để đánh giá nhanh, sàng lọc ra các vật liệu tiềm năng, sau đó dùng một lượng nhỏ DFT / thực nghiệm để xác minh và hiệu chuẩn.
  - Thiết kế ngược cấu trúc tinh thể và thành phần: xuất phát từ tính chất mục tiêu, tìm kiếm ngược các tổ hợp cấu trúc tinh thể / thành phần thỏa mãn ràng buộc về hiệu suất và quy trình.
- **Nguyên lý**
  - Biểu diễn vật liệu và tinh thể:
    - Biểu diễn cấu trúc tinh thể tuần hoàn dưới dạng đồ thị tinh thể (Crystal Graph): nút là nguyên tử, cạnh là quan hệ lân cận giữa các nguyên tử, kết hợp với tham số mạng tinh thể và thông tin nhóm không gian.
    - Đối với vật liệu vô định hình hoặc đa pha phức tạp, có thể biểu diễn vi cấu trúc của chúng thông qua bộ mô tả môi trường cục bộ (như SOAP), đặc trưng Voronoi hoặc cấu trúc đồ thị đa tỷ lệ.
  - Dự đoán tính chất:
    - Thực hiện tích chập / truyền thông điệp trên đồ thị tinh thể bằng các mô hình GNN như CGCNN, MEGNet, ALIGNN, dự đoán năng lượng, band gap, mô-đun đàn hồi, độ dẫn nhiệt, v.v.
    - Sử dụng các embedding dựa trên tài liệu và công thức hóa học như Mat2Vec, thực hiện học chuyển giao và ước lượng zero-shot trong các kịch bản ít dữ liệu.
  - Sàng lọc ảo thông lượng cao:
    - Xây dựng thư viện ứng viên (thông qua liệt kê tổ hợp, sinh cấu trúc, quy tắc kinh nghiệm, v.v.) → sử dụng mô hình ML dự đoán nhanh tính chất → sàng lọc ra một số ít ứng viên Top để hiệu chuẩn DFT hoặc thực nghiệm → cập nhật mô hình và chiến lược sàng lọc, hình thành vòng lặp học chủ động khép kín.
  - Sinh và thiết kế ngược:
    - Sử dụng mô hình khuếch tán, VAE hoặc mô hình sinh GNN để lấy mẫu cấu trúc mới trong không gian cấu trúc tinh thể, có thể áp đặt các ràng buộc về thành phần, nhóm không gian, mật độ, v.v.
    - Kết hợp mô hình đại diện (surrogate model) với tối ưu Bayes, xuất phát từ tính chất mục tiêu để tìm kiếm tổ hợp cấu trúc / thành phần phù hợp, thực hiện inverse design.
- **Mô hình**
  - Biểu diễn và dự đoán:
    - CGCNN (Crystal Graph Convolutional Neural Network): thực hiện tích chập trên đồ thị tinh thể, dùng để dự đoán các tính chất vật liệu vô cơ như năng lượng, band gap.
    - MEGNet, ALIGNN: tích hợp cấu trúc đồ thị với thông tin cạnh / góc, có khả năng tổng quát hóa và độ chính xác cao hơn trên nhiều họ vật liệu.
    - Mat2Vec + ML nhẹ: thông qua vector hóa công thức hóa học và thông tin nguyên tố, huấn luyện nhanh các mô hình nhỏ để dự đoán tính chất cụ thể.
  - Sinh và thiết kế ngược:
    - Diffusion for Crystals: thực hiện khuếch tán / khử nhiễu trong không gian nhiều chiều gồm tham số mạng tinh thể và vị trí nguyên tử, sinh ra cấu trúc tinh thể thỏa mãn các ràng buộc nhất định.
    - GNN‑based Generative Models: thông qua việc thêm / sửa đổi dần nguyên tử và liên kết hoặc thao tác mạng tinh thể, thực hiện tìm kiếm cấu trúc từ khởi tạo ngẫu nhiên đến vùng lân cận tính chất mục tiêu.
    - Surrogate + Bayesian Optimization: sử dụng mô hình ML như một hộp đen xấp xỉ "cấu trúc → tính chất", thực hiện tối ưu Bayes trên đó để tìm cấu trúc hoặc thành phần tối ưu.
  - Nền tảng dữ liệu và chuỗi công cụ:
    - Materials Project, OQMD, AFLOW: cung cấp lượng lớn dữ liệu cấu trúc và tính toán DFT, là nền tảng để huấn luyện và đánh giá mô hình ML vật liệu.
    - Cơ sở dữ liệu và mô hình vật liệu nội bộ doanh nghiệp: kết hợp dữ liệu thực nghiệm và thông tin quy trình của công ty, xây dựng nền tảng thiết kế vật liệu AI chuyên biệt theo lĩnh vực.
  - Sản phẩm và ứng dụng:
    - Nền tảng tăng tốc R&D vật liệu năng lượng mới: cung cấp năng lực tích hợp dự đoán tính chất, HTVS và inverse design cho các nhóm pin, điện xúc tác, quang điện.
    - Phần mềm và SaaS sàng lọc ảo: cung cấp công cụ sàng lọc số hóa cho hợp kim, bán dẫn, gốm chức năng, v.v., giảm chi phí thử-sai ở giai đoạn đầu.
    - Công cụ thiết kế AI nội bộ của công ty vật liệu: kết nối với hệ thống quản lý thông tin phòng thí nghiệm (LIMS) và dữ liệu dây chuyền sản xuất, hình thành vòng lặp khép kín từ "mô hình → thực nghiệm → sản xuất".

### 10.4.1 Dự đoán tính chất vật liệu và sàng lọc ảo thông lượng cao (HTVS)

Trong quy trình R&D vật liệu, **dự đoán tính chất nhanh chóng và đáng tin cậy** là một năng lực nền tảng: với một cấu trúc hoặc thành phần ứng viên cho trước, liệu có thể phán đoán sơ bộ xem nó có đáng để khám phá sâu hơn hay không mà không cần thực hiện DFT / thực nghiệm tốn kém. Các mô hình dự đoán tính chất dựa trên GNN và cơ sở dữ liệu vật liệu đã mở ra khả năng cho sàng lọc ảo thông lượng cao.

Ở cấp độ **dự đoán tính chất**:

- Sử dụng đồ thị tinh thể để biểu diễn cấu trúc tuần hoàn, học tương tác giữa các nguyên tử và vùng lân cận thông qua các mô hình như CGCNN, MEGNet, ALIGNN.
- Thực hiện huấn luyện đơn tác vụ hoặc đa tác vụ cho các bài toán khác nhau (năng lượng, band gap, hằng số đàn hồi, độ dẫn nhiệt, độ dẫn điện, từ tính, v.v.), đạt hiệu suất dự đoán gần với độ chính xác DFT trên các tập dữ liệu như Materials Project.
- Trong các kịch bản công nghiệp, thường kết hợp với dữ liệu thực nghiệm nội bộ để huấn luyện lại hoặc thích ứng miền, nhằm nâng cao mức độ phù hợp với các họ vật liệu và điều kiện quy trình cụ thể.

Trong kịch bản **sàng lọc ảo thông lượng cao (HTVS)** , quy trình điển hình là:

1. Xây dựng thư viện ứng viên quy mô lớn (liệt kê tổ hợp, sinh cấu trúc hoặc mở rộng từ cơ sở dữ liệu hiện có).
2. Sử dụng mô hình ML dự đoán nhanh tính chất mục tiêu và tính chất phụ trợ (các chỉ số liên quan đến độ ổn định, an toàn, chi phí, v.v.) của từng ứng viên.
3. Xếp hạng sàng lọc theo tính chất mục tiêu và nhiều điều kiện ràng buộc, chọn ra Top‑K ứng viên để thực hiện tính toán DFT độ chính xác cao hoặc xác minh thực nghiệm.
4. Phản hồi kết quả xác minh vào mô hình, cập nhật tham số và ước lượng độ bất định, hình thành vòng lặp học chủ động "sàng lọc–xác minh–tái sàng lọc" khép kín.

Quy trình làm việc này đã bước vào giai đoạn ứng dụng thực tế trong nhiều lĩnh vực như vật liệu pin, lớp hấp thụ quang điện, chất xúc tác và vật liệu kết cấu, trở thành "công cụ sàng lọc tiền tuyến" cho các nhóm R&D vật liệu.

### 10.4.2 Sinh tinh thể và thiết kế ngược: từ tính chất mục tiêu đến cấu trúc ứng viên

Sau khi đã có năng lực dự đoán tính chất và HTVS đáng tin cậy, mục tiêu xa hơn là **trực tiếp đề xuất các ứng viên cấu trúc tinh thể và thành phần mới từ tính chất mục tiêu và ràng buộc**, tức là thiết kế ngược và sinh vật liệu.

Trong **sinh tinh thể**, các vấn đề then chốt bao gồm:

- Làm thế nào để sinh ra mạng tinh thể và sắp xếp nguyên tử hợp lý về mặt vật lý dưới ràng buộc tuần hoàn?
- Làm thế nào để áp đặt rõ ràng hoặc ngầm định các ràng buộc về thành phần, đối xứng và mật độ trong quá trình sinh?
- Làm thế nào để đảm bảo cấu trúc được sinh ra vẫn ổn định sau khi trải qua giãn cấu trúc (relaxation) đơn giản?

Để giải quyết các vấn đề này, nghiên cứu và thực tiễn kỹ thuật thường áp dụng:

- **Diffusion for Crystals**: thêm / loại bỏ nhiễu trong không gian kết hợp của tham số mạng tinh thể + vị trí nguyên tử, thực hiện sinh tiệm tiến từ khởi tạo ngẫu nhiên đến mẫu cấu trúc, có thể tích hợp tính chất mục tiêu và ràng buộc thành phần vào quá trình nhiễu hoặc vector điều kiện.
- **GNN‑based Generative Models**: thêm dần nguyên tử và quan hệ kết nối trên cấu trúc đồ thị, hoặc chỉnh sửa cấu trúc hiện có, sinh ra cấu trúc ứng viên thỏa mãn ràng buộc.

Trong **thiết kế ngược**, thường kết hợp với mô hình đại diện và phương pháp tối ưu:

- Coi mô hình dự đoán tính chất như một hàm hộp đen "cấu trúc → tính chất".
- Thông qua tối ưu Bayes, thuật toán tiến hóa hoặc RL để khám phá trong không gian cấu trúc, làm cho tính chất dự đoán tiệm cận dần giá trị mục tiêu, đồng thời thỏa mãn các ràng buộc về độ ổn định, an toàn, chi phí, v.v.
- Thực hiện xác minh DFT / thực nghiệm đối với cấu trúc ứng viên thu được từ tìm kiếm, và sử dụng kết quả để cập nhật mô hình đại diện và chiến lược tìm kiếm.

Trong ứng dụng kỹ thuật, mô-đun thiết kế ngược thường được tích hợp vào nền tảng AI vật liệu, cung cấp cho nhân viên R&D giao diện tương tác "thiết lập tính chất mục tiêu → hệ thống tự động đề xuất cấu trúc ứng viên", nâng cao đáng kể hiệu quả khám phá vật liệu mới.## 10.5 Toán học & Suy luận Ký hiệu (Mathematics & Symbolic Reasoning)

Toán học là một ngôn ngữ có tính hình thức hóa cao và có thể được kiểm chứng chính xác, điều này mang lại cho nó hai thuộc tính trong kỷ nguyên AI: "độ khó cực cao" và "tiềm năng lợi ích to lớn". Một mặt, việc chứng minh định lý phức tạp và suy luận bậc cao đặt ra những yêu cầu rất cao đối với năng lực của mô hình; mặt khác, kết quả của suy luận toán học và tính toán ký hiệu có thể được kiểm chứng nghiêm ngặt, khiến chúng phù hợp một cách tự nhiên để phối hợp với các công cụ lập trình. Mục tiêu của AI trong lĩnh vực toán học và suy luận ký hiệu là xây dựng các mô hình có khả năng **thực hiện suy luận và tính toán đáng tin cậy** trong các hệ thống hình thức, đồng thời tích hợp chúng vào giáo dục, nghiên cứu khoa học và ứng dụng kỹ thuật.

Hướng nghiên cứu này một đầu kết nối với các trình chứng minh định lý tương tác như Lean / Coq / Isabelle, các hệ thống đại số máy tính (CAS) như SymPy / Mathematica / Maple, cùng với kho bài tập toán học và ngữ liệu tài liệu quy mô lớn; đầu còn lại kết nối với các sản phẩm giáo dục toán học, công cụ hỗ trợ nghiên cứu, và nhu cầu suy diễn công thức cùng phân tích rủi ro trong các lĩnh vực kỹ thuật / tài chính. Dưới đây, chúng ta sẽ triển khai từ ba góc độ: **kịch bản**, **nguyên lý** và **mô hình**.

- **Kịch bản**
  - Chứng minh định lý tự động và hỗ trợ chứng minh: Tự động đưa ra chứng minh định lý trong các hệ thống hình thức hóa, hoặc tạo ra bản nháp chứng minh có thể đọc được để con người xem xét và hoàn thiện thêm.
  - Thao tác biểu thức và tính toán ký hiệu: Tự động rút gọn biểu thức, đạo hàm, tích phân, khai triển chuỗi, biến đổi và giải phương trình, cung cấp công cụ ký hiệu cho mô hình hóa kỹ thuật và phân tích rủi ro tài chính.
  - Hiểu bài toán và tạo các bước giải: Trích xuất biểu diễn có cấu trúc từ các bài toán dưới dạng ngôn ngữ tự nhiên hoặc hình ảnh, đưa ra các bước giải chặt chẽ và có thể kiểm tra, phục vụ cho các tình huống giáo dục và luyện tập.
  - Nâng cao năng lực suy luận toán học: Thông qua tinh chỉnh chuyên biệt về toán học và tăng cường công cụ, cải thiện khả năng suy luận đa bước và tính chặt chẽ của các mô hình lớn trong các lĩnh vực như số học, đại số, hình học, tổ hợp.
- **Nguyên lý**
  - Hệ thống hình thức và tìm kiếm:
    - Trong các hệ thống như Lean / Coq / Isabelle, các đối tượng và định lý toán học được hình thức hóa thành các hạng tử và kiểu, quá trình chứng minh tương ứng với việc xây dựng cây chứng minh dưới các ràng buộc quy tắc.
    - Tìm kiếm chứng minh có thể được xem như "tìm đường đi thỏa mãn ràng buộc trong không gian trạng thái cực lớn", phù hợp để áp dụng các phương pháp như học tăng cường, MCTS (tìm kiếm cây Monte Carlo) và mạng chính sách / mạng giá trị.
  - Cộng tác nơ-ron – ký hiệu:
    - LLM chịu trách nhiệm trích xuất cấu trúc bài toán và ý tưởng giải từ đầu vào ngôn ngữ tự nhiên hoặc phi cấu trúc, rồi chuyển dịch chúng thành biểu diễn ký hiệu (như mã SymPy, kịch bản chứng minh Lean).
    - Hệ thống đại số máy tính và trình chứng minh định lý chịu trách nhiệm thực thi các phép tính ký hiệu chính xác và kiểm chứng hình thức, tiến hành xác minh và sửa lỗi cho đầu ra của LLM.
  - Nâng cao năng lực suy luận toán học:
    - Thông qua tiền huấn luyện hoặc tinh chỉnh chuyên biệt trên văn bản toán học và kho bài tập quy mô lớn (như Minerva, Gödel), nâng cao khả năng hiểu ngôn ngữ toán học và nắm bắt phong cách suy luận của mô hình.
    - Áp dụng khung LLM tăng cường công cụ (Tool-Augmented LLM), sử dụng trình giải ký hiệu, thư viện tính toán số, công cụ vẽ đồ thị và trình chứng minh như các công cụ bên ngoài, giúp mô hình học cách "gọi công cụ" thay vì "ghi nhớ kết quả" trong suy luận phức tạp.
- **Mô hình**
  - Chứng minh định lý tự động:
    - Trình chứng minh kiểu AlphaZero: Xem tiến trình chứng minh như một quá trình trò chơi, sử dụng mạng chính sách và mạng giá trị để dẫn hướng tìm kiếm, từng bước xây dựng chứng minh hình thức.
    - GPT‑f, Lean‑Dojo, v.v.: Được huấn luyện trên ngữ liệu định lý và chứng minh hình thức quy mô lớn, dùng để tự động tạo chứng minh trong các hệ thống như Lean.
  - Mô hình toán học lớn và tăng cường công cụ:
    - Minerva, Gödel, v.v.: Các mô hình lớn được tinh chỉnh trên ngữ liệu như sách giáo khoa toán, bài báo, kho bài tập, thể hiện hiệu suất mạnh mẽ hơn trong các bài toán chứng minh, bài thi Olympic và nhiệm vụ suy luận bậc cao.
    - LLM + SymPy / Mathematica / Lean / Coq: LLM đảm nhận phân tích bài toán và lập kế hoạch chiến lược, gọi các công cụ tính toán ký hiệu và chứng minh để thực hiện thao tác chính xác và kiểm chứng.
  - Sản phẩm và ứng dụng:
    - "Trợ giảng toán học / trợ lý giải bài" trong các sản phẩm giáo dục, cung cấp hướng dẫn cá nhân hóa và nhiều lộ trình giải pháp.
    - Công cụ hỗ trợ nghiên cứu: Giúp nhà nghiên cứu xây dựng giả thuyết, tạo bản nháp chứng minh, tìm kiếm định lý và bổ đề liên quan, đẩy nhanh quá trình khám phá lý thuyết.
    - Suy diễn công thức và phân tích mô hình rủi ro trong lĩnh vực kỹ thuật / tài chính: Hình thức hóa các mô hình phức tạp, tiến hành phân tích độ nhạy ký hiệu và rà soát tuân thủ.

### 10.5.1 Chứng minh định lý tự động và suy luận hình thức hóa

**Chứng minh định lý tự động (ATP) và chứng minh định lý tương tác (ITP)** là hướng giao thoa quan trọng giữa toán học và khoa học máy tính. Nhiệm vụ cốt lõi của AI khi tham gia vào lĩnh vực này là tự động xây dựng hoặc hỗ trợ xây dựng chứng minh trong các hệ thống hình thức, giảm bớt gánh nặng của con người ở các chi tiết cấp thấp, để họ có thể tập trung nhiều hơn vào các ý tưởng cấp cao.

Trong **hệ thống hình thức hóa**:

- Định lý được mã hóa thành kiểu mục tiêu (goal) cần được xây dựng, chứng minh tương ứng với việc xây dựng một hạng tử sao cho kiểu của nó là kiểu mục tiêu đó.
- Quá trình chứng minh bao gồm một chuỗi các chiến thuật (tactics) hoặc các bước suy luận, mỗi bước đều được tiến hành dưới các quy tắc logic chặt chẽ.

AI có thể đảm nhận nhiều vai trò trong quá trình này:

1. **Lựa chọn chiến thuật và đề xuất tham số**: Trong trạng thái chứng minh hiện tại, dự đoán chiến thuật và tham số nên sử dụng ở bước tiếp theo, giảm thiểu việc thử và quay lui thủ công.
2. **Truy xuất bổ đề và định lý**: Từ kho dữ liệu khổng lồ, truy xuất các bổ đề / định lý có liên quan nhất đến mục tiêu hiện tại, thu hẹp không gian tìm kiếm.
3. **Tạo chứng minh đầu cuối**: Với định lý và ngữ cảnh đã cho, trực tiếp tạo ra kịch bản chứng minh hoàn chỉnh hoặc cục bộ, sau đó được trình chứng minh kiểm chứng tính đúng đắn.

Các công trình như trình chứng minh kiểu AlphaZero, GPT‑f, Lean‑Dojo, thông qua việc huấn luyện mạng chính sách và mạng giá trị hoặc mô hình ngôn ngữ trên ngữ liệu hình thức hóa quy mô lớn, đã đạt được khả năng tự động hoàn thành một tỷ lệ đáng kể các chứng minh định lý trên các hệ thống như Lean / Coq. Về hướng sản phẩm, năng lực này có tiềm năng phát triển thành "trợ lý kiểm chứng hình thức hóa", được sử dụng trong kiểm chứng phần mềm / phần cứng, phân tích giao thức mã hóa và thiết kế hệ thống có độ tin cậy cao.

### 10.5.2 Tính toán ký hiệu và giải bài toán toán học: LLM + CAS

So với chứng minh định lý, **tính toán ký hiệu và giải bài toán toán học** gần gũi hơn với các tình huống kỹ thuật và giáo dục. Mục tiêu của nó là: **bắt đầu từ bài toán ngôn ngữ tự nhiên, tự động xây dựng biểu diễn ký hiệu, thực thi tính toán và đưa ra các bước giải có thể diễn giải được**.

Trong hướng này, quy trình cộng tác nơ-ron – ký hiệu điển hình là:

1. **Hiểu và trừu tượng hóa bài toán**: LLM phân tích bài toán từ ngôn ngữ tự nhiên hoặc hình ảnh thành biểu diễn toán học có cấu trúc (phương trình, ràng buộc, hàm mục tiêu, v.v.).
2. **Tạo biểu diễn ký hiệu**: Chuyển dịch kết quả trừu tượng thành mã CAS (như biểu thức SymPy, lệnh Mathematica).
3. **Gọi \*\***CAS\*\* **thực thi**: Sử dụng CAS để thực hiện các phép tính đại số chính xác, đạo hàm, tích phân, giải hệ phương trình, giới hạn, v.v.
4. **Diễn giải kết quả và tạo bước giải**: LLM dựa trên kết quả tính toán của CAS để tạo ra các bước giải và giải thích phù hợp với thói quen của con người.

Mô hình này có một số ưu điểm chính:

- Thông qua CAS, đảm bảo tính đúng đắn của phép tính, tránh các lỗi "tính toán sai lệch" và lỗi tích lũy của LLM trên các biểu thức dài.
- Thông qua LLM, cung cấp khả năng hiểu và diễn đạt ngôn ngữ tự nhiên, hạ thấp rào cản sử dụng CAS, cho phép cả người dùng không chuyên cũng có thể gọi các công cụ ký hiệu mạnh mẽ.
- Trong các tình huống giáo dục, có thể kiểm soát mức độ chi tiết và phong cách giải bài, tạo ra các hướng dẫn phù hợp với các giai đoạn học tập khác nhau.

Trong các tình huống kỹ thuật / tài chính, năng lực này có thể được mở rộng sang việc công thức hóa và phân tích các mô hình phức tạp: tự động trích xuất cấu trúc mô hình từ tài liệu và mã nguồn, xây dựng biểu diễn ký hiệu, và tiến hành phân tích độ nhạy, phân tích trường hợp biên và nhận diện rủi ro.## 10.6 Quy trình làm việc khoa học & Tự động hóa phòng thí nghiệm（Scientific Workflow & Lab Automation）

Hầu hết các hướng con trước đây đều tập trung vào "năng lực đơn điểm": dự đoán một tính chất, tạo ra một cấu trúc, chứng minh một định lý. Tuy nhiên, trong nghiên cứu khoa học và R&D công nghiệp thực tế, điều quan trọng hơn là làm thế nào để **kết nối các năng lực này thành một** **quy trình làm việc** hoàn chỉnh, đồng thời tích hợp với tài liệu, cơ sở dữ liệu, nền tảng mô phỏng và thiết bị thí nghiệm tự động. Hướng quy trình làm việc khoa học & tự động hóa phòng thí nghiệm nhằm xây dựng hệ thống tích hợp **Agent + Công cụ + Robot** dành cho các tình huống khoa học, giúp AI tiến hóa từ "biết tính toán" lên "biết làm thí nghiệm, biết nghiên cứu".

Một đầu của hướng này kết nối với cơ sở dữ liệu bài báo và bằng sáng chế (như PubMed, arXiv), kho dữ liệu khoa học, đồ thị tri thức chuyên ngành và nền tảng mô phỏng; đầu còn lại kết nối với phòng thí nghiệm tự động (Robotic Lab), thiết bị sàng lọc thông lượng cao và hệ thống quản lý quy trình nghiên cứu. Dưới đây sẽ triển khai từ ba góc độ: **tình huống** , **nguyên lý** , **mô hình**.

- **Tình huống**
  - Khai thác tài liệu khoa học & xây dựng kho tri thức: tự động trích xuất thông tin về hợp chất, protein, vật liệu, điều kiện phản ứng, kết quả thí nghiệm từ lượng lớn bài báo, xây dựng kho tri thức có cấu trúc và đồ thị tri thức.
  - Thiết kế thí nghiệm & Self‑Driving Lab: dưới sự hướng dẫn của kế hoạch thí nghiệm do AI đề xuất, nền tảng thí nghiệm robot tự động thực hiện pha chế, phản ứng, đo lường và thu thập dữ liệu, đạt được tối ưu hóa "vòng kín".
  - Quản lý dữ liệu khoa học & đảm bảo khả năng tái lập: tự động sắp xếp dữ liệu mô phỏng và thí nghiệm, siêu dữ liệu và tập lệnh mã, tạo ra bản ghi thí nghiệm và báo cáo chuẩn hóa, nâng cao khả năng truy xuất và tái lập.
  - "Trợ lý thí nghiệm AI" chuyên ngành: cung cấp hỗ trợ một cửa về tra cứu tài liệu, thiết kế phương án, lập kế hoạch thí nghiệm và phân tích kết quả cho các công ty dược phẩm, vật liệu và tổ chức nghiên cứu.
- **Nguyên lý**
  - Khai thác tài liệu & LLM chuyên ngành:
    - Sử dụng các mô hình tiền huấn luyện chuyên ngành như SciBERT, BioBERT, PubMedBERT để thực hiện nhận dạng thực thể có tên, trích xuất quan hệ, phân tích phương trình phản ứng và trích xuất điều kiện thí nghiệm.
    - Trên cơ sở đó huấn luyện các LLM chuyên ngành như Bio‑LM, Chem‑LM, Materials‑LM, nâng cao khả năng hiểu và suy luận về thuật ngữ chuyên môn, câu mô tả thí nghiệm và giả định ngầm.
  - Thiết kế thí nghiệm & Self‑Driving Lab:
    - Coi không gian thí nghiệm (công thức, nhiệt độ, thời gian, thứ tự thêm chất, v.v.) là các biến tối ưu, do LLM + RL hoặc chiến lược tối ưu Bayes đề xuất nhóm điều kiện thí nghiệm tiếp theo.
    - Robot thí nghiệm và thiết bị thực hiện theo kế hoạch, thu thập dữ liệu và truyền về theo thời gian thực, mô hình cập nhật tham số và ước lượng độ bất định, hình thành vòng lặp học chủ động khép kín.
  - Điều phối quy trình làm việc & Agent:
    - Trong khuôn khổ Agent & Tool Use, tích hợp thống nhất các công cụ tra cứu tài liệu, tạo mã, gọi mô phỏng, phân tích dữ liệu, trực quan hóa và tạo báo cáo.
    - Agent căn cứ vào mục tiêu nhiệm vụ (như "tìm công thức điện giải có độ dẫn điện cao"), tự động lập kế hoạch phân rã nhiệm vụ, thứ tự gọi công cụ và tích hợp kết quả.
- **Mô hình**
  - Mô hình khai thác tài liệu & tri thức:
    - SciBERT, BioBERT, PubMedBERT, v.v.: các mô hình được tiền huấn luyện trên tài liệu khoa học và y sinh, dùng cho trích xuất thực thể / quan hệ, phân loại và hỏi đáp.
    - Galactica, LLM chuyên ngành: được huấn luyện chủ yếu trên ngữ liệu khoa học, hỗ trợ tạo bài tổng quan, bản thảo mã, đề xuất thiết kế thí nghiệm, v.v.
  - Mô hình lập kế hoạch & điều khiển thí nghiệm:
    - LLM + RL / Bayesian Optimization: kết hợp tri thức tiên nghiệm chuyên ngành, độ bất định của mô hình và chi phí thí nghiệm, thực hiện khám phá và khai thác hiệu quả không gian thí nghiệm.
    - Agent tích hợp với giao diện điều khiển Robotic Lab: chuyển đổi mô tả thí nghiệm bằng ngôn ngữ tự nhiên thành các bước thí nghiệm có cấu trúc và lệnh điều khiển thiết bị.
  - Agent khoa học & hệ thống quy trình làm việc:
    - Trên nền tảng năng lực Agent & Tool Use ở Chương 7, xây dựng "Agent đa công cụ" hướng tới tình huống khoa học: có thể tra cứu tài liệu, tạo mã, gọi mô phỏng, xử lý dữ liệu, vẽ biểu đồ và viết bản thảo báo cáo.
  - Sản phẩm & ứng dụng:
    - "Trợ lý thí nghiệm AI" và bàn thí nghiệm tự động nội bộ của công ty dược phẩm / vật liệu: dùng để tăng tốc phát triển công thức, tối ưu hóa quy trình và sàng lọc ứng viên.
    - Công cụ tìm kiếm khoa học chuyên ngành & đồ thị tri thức (Bio / Chem / Materials / Physics Knowledge Graph): hỗ trợ tìm kiếm ngữ nghĩa, khám phá tương tác và suy luận tri thức.
    - Nền tảng quản lý quy trình nghiên cứu: tích hợp lập kế hoạch thí nghiệm, ghi chép dữ liệu, quản lý phiên bản, trực quan hóa và tự động tạo báo cáo, nâng cao hiệu quả của nhóm nghiên cứu và khả năng tái lập kết quả.

### 10.6.1 Khai thác tài liệu khoa học & xây dựng kho tri thức chuyên ngành

Phần lớn tri thức khoa học xuất hiện đầu tiên dưới dạng bài báo và báo cáo. Để AI thực sự tham gia vào nghiên cứu khoa học, cần phải làm cho nó "đọc hiểu được bài báo và từ đó trích xuất tri thức có cấu trúc". **Khai thác tài liệu khoa học & xây dựng kho tri thức** chính là bắt đầu từ văn bản phi cấu trúc, xây dựng hạ tầng tri thức có thể truy vấn và suy luận.

Trong hướng này, các nhiệm vụ cốt lõi bao gồm:

- **Nhận dạng & chuẩn hóa thực thể** : nhận dạng các thực thể như hợp chất, protein, vật liệu, chất phản ứng, sản phẩm, thiết bị và điều kiện thí nghiệm trong tài liệu, đồng thời căn chỉnh với cơ sở dữ liệu tiêu chuẩn (như ChEMBL, Uniprot, Materials Project).
- **Trích xuất quan hệ & sự kiện** : trích xuất từ văn bản các quan hệ và sự kiện như "ai tương tác với ai như thế nào", "điều kiện nào tạo ra kết quả gì", ví dụ như phương trình phản ứng, mối tương quan giữa công thức và hiệu suất, v.v.
- **Xây dựng đồ thị tri thức** : tổ chức thực thể và quan hệ thành cấu trúc đồ thị, hỗ trợ truy vấn phức tạp (như "tất cả các phương pháp đã được báo cáo để nâng cao một tính chất nào đó trong một điều kiện nhất định") và suy luận đường dẫn.

Để đạt được các mục tiêu trên, thường sử dụng:

- Các mô hình tiền huấn luyện như SciBERT, BioBERT, PubMedBERT để thực hiện NER (nhận dạng thực thể), RE (trích xuất quan hệ) và trích xuất sự kiện cấp tài liệu.
- Trên cơ sở đó xây dựng LLM chuyên ngành (Bio‑LM, Chem‑LM, Materials‑LM), dùng để trả lời câu hỏi phức tạp hơn, tạo bài tổng quan và bổ sung tri thức.

Kho tri thức và đồ thị tri thức chuyên ngành sau khi được xây dựng không chỉ cung cấp dịch vụ tra cứu và đề xuất thông minh hơn cho nhân viên R&D, mà còn cung cấp dữ liệu và hỗ trợ tiên nghiệm cho thiết kế thí nghiệm và thiết kế ngược vật liệu / dược phẩm tiếp theo.

### 10.6.2 Self‑Driving Lab & Agent quy trình làm việc khoa học: từ "đọc bài báo" đến "làm thí nghiệm"

Sau khi có năng lực khai thác tài liệu, mô hình hóa và tối ưu hóa, bước tiếp theo là kết hợp những năng lực này với **nền tảng thí nghiệm tự động**, xây dựng **Self‑Driving Lab（phòng thí nghiệm tự vận hành）** và Agent quy trình làm việc khoa học theo đúng nghĩa.

Trong Self‑Driving Lab, vòng lặp làm việc khép kín điển hình là:

1. **Thiết lập mục tiêu** : nhà nghiên cứu đưa ra mục tiêu vĩ mô (như "nâng cao độ dẫn điện của một vật liệu trong điều kiện cụ thể") và các điều kiện ràng buộc (chi phí, an toàn, giới hạn quy trình, v.v.).
2. **Tra cứu tài liệu & tri thức** : Agent gọi công cụ tra cứu tài liệu và đồ thị tri thức, tìm hiểu các công trình hiện có và quy luật kinh nghiệm, hình thành giả thuyết ban đầu và không gian thiết kế thí nghiệm.
3. **Lập kế hoạch thí nghiệm & chiến lược tối ưu** : dựa trên LLM + RL / chiến lược tối ưu Bayes, đề xuất đợt điều kiện thí nghiệm đầu tiên (công thức, nhiệt độ, thời gian, môi trường, v.v.).
4. **Robot thực hiện & thu thập dữ liệu** : bàn thí nghiệm tự động (Robotic Lab) thực hiện thí nghiệm, thu thập kết quả theo thời gian thực và truyền về.
5. **Cập nhật mô hình & thiết kế vòng tiếp theo** : mô hình đại diện cập nhật tham số và ước lượng độ bất định dựa trên dữ liệu mới, sau đó đề xuất đợt điều kiện thí nghiệm tiếp theo có nhiều thông tin hơn hoặc tiềm năng hơn.

Trong **Agent** **quy trình làm việc** **khoa học** tổng quát hơn, vòng lặp khép kín này sẽ mở rộng sang các khâu mô phỏng, phân tích dữ liệu và tạo báo cáo:

- Agent có thể tự động tạo mã mô phỏng hoặc gọi công cụ mô phỏng hiện có, thực hiện đánh giá trước cho một số điều kiện thí nghiệm;
- Trong giai đoạn phân tích dữ liệu, tự động hoàn thành làm sạch dữ liệu, trực quan hóa và kiểm định thống kê;
- Khi tổng kết giai đoạn dự án, tạo ra bản ghi thí nghiệm có cấu trúc và bản thảo báo cáo, kèm theo biểu đồ và tài liệu tham khảo.

Về hình thái sản phẩm, loại hệ thống này thường được triển khai dưới dạng nền tảng: cung cấp một bộ giao diện và API thống nhất, kết nối với kho tài liệu, công cụ mô phỏng và thiết bị thí nghiệm, cho phép nhà khoa học và kỹ sư thiết lập mục tiêu ở cấp cao bằng ngôn ngữ tự nhiên và giao diện trực quan, các khâu còn lại do Agent + chuỗi công cụ tự động điều phối và thực thi.

Bắt đầu từ hướng con này, vai trò của AI trong khoa học thực sự chuyển từ "công cụ phân tích ngoại tuyến" sang "cộng tác viên nghiên cứu trực tuyến": không chỉ biết đọc bài báo, viết mã, tính toán mô hình, mà còn có thể cùng robot hoàn thành từng thí nghiệm và khám phá thực tế.# 11. Nền tảng và Năng lực Kỹ thuật (MLOps / Infra)

Khi các mô hình ngôn ngữ lớn chuyển từ phòng thí nghiệm sang sản xuất trong doanh nghiệp, không chỉ đơn thuần là "mô hình đủ tốt" là xong, mà cần dựa trên một **hệ thống nền tảng và kỹ thuật** ổn định, có khả năng mở rộng và vận hành được. Hệ thống này cần xuyên suốt các khâu như **huấn luyện và tinh chỉnh mô hình, triển khai và tối ưu suy luận, vận hành dữ liệu và mô hình, giám sát và quản lý chi phí, bảo mật và tuân thủ, cũng như năng lực hỗ trợ nền tảng trung gian và ứng dụng**, kết nối các điểm kỹ thuật vốn rời rạc thành một vòng lặp khép kín vận hành bền vững.

Từ góc độ kinh doanh, năng lực nền tảng và kỹ thuật thường quyết định liệu một tổ chức có thể sử dụng mô hình ngôn ngữ lớn "một cách quy mô, an toàn và chi phí thấp" hay không: với cùng một mô hình nền tảng, nếu không có hệ thống MLOps tốt, rất có thể chỉ dừng lại ở giai đoạn demo và thử nghiệm; nhưng một khi đã có nền tảng hoàn chỉnh, doanh nghiệp có thể nhanh chóng nhân rộng và phát triển các ứng dụng chất lượng cao trên nhiều đơn vị kinh doanh, nhiều quốc gia/khu vực và nhiều tình huống ngành nghề. Dưới đây, chúng tôi sẽ lần lượt trình bày từ sáu hướng: **nền tảng huấn luyện và tinh chỉnh mô hình, triển khai và tối ưu suy luận, vận hành dữ liệu và mô hình, giám sát và độ tin cậy chi phí, hạ tầng bảo mật và tuân thủ, cùng với năng lực ứng dụng và nền tảng trung gian tầng trên**.## 11.1 Huấn luyện & Tinh chỉnh Mô hình (Training & Fine-tuning)

Ở cấp độ mô hình nền tảng, hầu hết các tổ chức không huấn luyện mô hình hàng trăm tỷ tham số từ đầu, mà dựa trên các mô hình nền mã nguồn mở hoặc thương mại để thực hiện **tiếp tục tiền huấn luyện + tinh chỉnh**. Vấn đề cốt lõi của tầng này là: làm thế nào để tận dụng hiệu quả tài nguyên tính toán và dữ liệu, "kéo" mô hình lớn đa dụng về gần hơn với ngành, doanh nghiệp và tác vụ cụ thể, đồng thời đảm bảo khả năng quản lý kỹ thuật cho đa mô hình và đa phiên bản.

Từ góc độ kỹ thuật, tầng này thường bao gồm ba phần: **Tiền huấn luyện & Tiếp tục tiền huấn luyện**, **Mô hình tinh chỉnh & Chuỗi công cụ** và **Hạ tầng huấn luyện phân tán quy mô lớn**.

- **Kịch bản**
  - Nghiên cứu & phát triển mô hình nền tảng đa dụng: các nhà cung cấp đám mây / công ty lớn tự nghiên cứu mô hình nền ngôn ngữ / đa phương thức đa dụng, dùng cho API bên ngoài và chia sẻ nội bộ đa nghiệp vụ.
  - Mô hình lớn ngành & mô hình chuyên dụng: xoay quanh các lĩnh vực cụ thể như tài chính, y tế, pháp luật, sản xuất, năng lượng, trò chơi, xây dựng mô hình nền ngành hoặc "mô hình lớn riêng của doanh nghiệp".
  - Tùy chỉnh mô hình cấp doanh nghiệp: tùy chỉnh mô hình tinh chỉnh riêng hoặc trọng số LoRA cho từng khách hàng lớn (ngân hàng, bảo hiểm, chính phủ, tập đoàn sản xuất, v.v.) dựa trên dữ liệu nội bộ của họ.
  - Thị trường mô hình đa người thuê: nền tảng SaaS / đám mây cung cấp khả năng tinh chỉnh và lưu trữ "một khách hàng một mô hình" cho nhiều khách hàng vừa và nhỏ, mỗi người thuê một bộ trọng số hoặc lớp thích ứng.
  - Nền tảng tinh chỉnh một chạm: sản phẩm quản lý toàn diện mở cho các nhóm không chuyên về thuật toán với quy trình "tải dữ liệu lên → chọn mô hình nền → tự động tinh chỉnh → triển khai một chạm".
- **Nguyên lý**
  - Tiền huấn luyện & Tiếp tục tiền huấn luyện:
    - Thực hiện tiền huấn luyện quy mô lớn trên dữ liệu văn bản, mã nguồn và đa phương thức khổng lồ, giúp mô hình có được **khả năng hiểu ngôn ngữ đa dụng, kiến thức thế giới và năng lực suy luận cơ bản**.
    - Đối với các ngành cụ thể, thông qua **Domain‑adaptive Pretraining (DAPT)** tiếp tục tiền huấn luyện trên mô hình đa dụng, đưa vào thuật ngữ chuyên ngành, phong cách viết và phân phối kiến thức của ngành.
    - Tiền huấn luyện đa ngôn ngữ / đa phương thức thông qua không gian ngữ nghĩa chia sẻ và huấn luyện kết hợp, giúp mô hình có được khả năng **chuyển giao liên ngôn ngữ** và **tích hợp văn bản-hình ảnh / giọng nói / dữ liệu có cấu trúc**.
  - Mô hình tinh chỉnh:
    - **Tinh chỉnh toàn bộ tham số**: khi phân phối giữa tác vụ mục tiêu và tiền huấn luyện khác biệt lớn, có đủ tài nguyên tính toán và dữ liệu, cập nhật trực tiếp toàn bộ tham số để đạt hiệu suất tối đa.
    - **Tinh chỉnh hiệu quả tham số (PEFT)**: thông qua Adapter, LoRA / QLoRA, Prefix / P‑Tuning, v.v., chỉ huấn luyện một lượng rất nhỏ "tham số gia tăng", phù hợp cho các kịch bản đa tác vụ, đa khách hàng, cập nhật thường xuyên.
    - **Tinh chỉnh chỉ thị & Tinh chỉnh tác vụ**: dùng phương thức "chỉ thị + ví dụ" để mô hình học cách hiểu mô tả tác vụ bằng ngôn ngữ tự nhiên; có thể hướng đến một tác vụ dọc duy nhất, cũng có thể đảm nhận đa tác vụ trên cùng một mô hình thống nhất.
    - **RLHF / RLAIF**: thông qua phản hồi của con người hoặc AI để huấn luyện mô hình phần thưởng, sau đó dùng học tăng cường để căn chỉnh hành vi mô hình (tính lịch sự, an toàn, chiến lược từ chối trả lời, giá trị quan).
  - Huấn luyện phân tán & Hệ thống kỹ thuật:
    - Sử dụng các chiến lược như **song song hóa dữ liệu, song song hóa mô hình, song song hóa đường ống, song song hóa tensor** để phân tách mô hình siêu lớn và dữ liệu quy mô lớn sang nhiều nút, nhiều GPU trong cụm để huấn luyện cộng tác.
    - Thông qua các kỹ thuật như ZeRO / FSDP để **giảm chiếm dụng bộ nhớ GPU, tăng thông lượng huấn luyện**, kết hợp với lập lịch hiệu quả (Kubernetes + Slurm / Ray) để đạt được huấn luyện cụm quy mô lớn.
    - Dựa trên pipeline dữ liệu chuẩn hóa (tải tập dữ liệu, làm sạch, loại bỏ trùng lặp, phân mảnh, cache) và khung tinh chỉnh (Transformers Trainer, DeepSpeed, Lightning, v.v.) để giảm việc phát minh lại bánh xe.
- **Mô hình**
  - Chuỗi công cụ tiền huấn luyện & tiếp tục tiền huấn luyện:
    - Khung huấn luyện: PyTorch, TensorFlow, JAX.
    - Tăng tốc huấn luyện quy mô lớn: DeepSpeed, Megatron‑LM, Colossal‑AI, Fairscale.
    - Chiến lược huấn luyện phân tán: song song hóa dữ liệu (DP), song song hóa mô hình (MP), song song hóa đường ống (PP), song song hóa tensor; ZeRO / FSDP, Megatron (TP+PP), DeepSpeed ZeRO.
    - Lập lịch & quản lý cụm: Kubernetes + Slurm / Ray / Horovod / TorchElastic.
    - Pipeline dữ liệu: Hugging Face Datasets, WebDataset, Petastorm, tf.data, Arrow; lưu trữ đối tượng (S3 / OSS / GCS) + cache cục bộ; công cụ làm sạch và loại bỏ trùng lặp dữ liệu.
  - Công cụ tinh chỉnh & PEFT:
    - Khung tinh chỉnh: Hugging Face Transformers + Trainer / Accelerate, PyTorch Lightning, DeepSpeed, Colossal‑AI.
    - Bộ công cụ PEFT: PEFT (LoRA / QLoRA / Prefix Tuning / Prompt Tuning, v.v.), LLaMA‑Adapter và các chuỗi công cụ LoRA khác nhau.
    - Xây dựng chỉ thị & dữ liệu: pipeline phong cách Self‑Instruct, Alpaca / Dolly, các công cụ tăng cường dữ liệu và viết lại hội thoại khác nhau.
  - Chuỗi công cụ RLHF / RLAIF:
    - TRL (Transformers Reinforcement Learning), trlx, DeepSpeed‑RLHF, pipeline RLHF tự phát triển.
    - Huấn luyện mô hình phần thưởng, mô hình xếp hạng / chấm điểm, chiến lược từ chối trả lời và mẫu chiến lược căn chỉnh.

Về hình thái sản phẩm, tầng này thường được thể hiện dưới dạng: **nền tảng R&D mô hình nền, dịch vụ "huấn luyện thay + tùy chỉnh" cấp doanh nghiệp, nền tảng tinh chỉnh một chạm và thị trường mô hình (Model Hub / Model Store)**, hỗ trợ lộ trình sản xuất hóa từ "mô hình đa dụng" đến "ngàn doanh nghiệp ngàn mô hình".

### 11.1.1 Tiền huấn luyện & Tiếp tục tiền huấn luyện: từ năng lực đa dụng đến nền tảng ngành

Tiền huấn luyện là "công trình nguồn" cho năng lực của mô hình lớn hiện đại: thông qua học tự giám sát trên dữ liệu văn bản, mã nguồn và đa phương thức khổng lồ chưa được gán nhãn, mô hình dần có được khả năng mô hình hóa ngôn ngữ, kiến thức thế giới, suy luận cơ bản và học biểu diễn. Trên nền tảng này, tiếp tục tiền huấn luyện (đặc biệt là **Domain‑adaptive Pretraining, DAPT**) đảm nhận nhiệm vụ "kéo mô hình về phía một lĩnh vực dọc cụ thể".

Trong giai đoạn **tiền huấn luyện đa dụng**, các điểm quan tâm cốt lõi bao gồm:

1. **Quy mô và tính đa dạng của ngữ liệu**: kết hợp văn bản web, sách, mã nguồn, hội thoại, nội dung đa ngôn ngữ và dữ liệu đa phương thức như cặp văn bản-hình ảnh, bao phủ càng rộng kiến thức và hình thức biểu đạt càng tốt.
2. **Mục tiêu huấn luyện & kết hợp đa tác vụ**: ngoài mô hình hóa ngôn ngữ tự hồi quy cổ điển, đôi khi thêm vào các mục tiêu như điền vào chỗ trống, dự đoán câu tiếp theo, học tương phản, căn chỉnh văn bản-hình ảnh, nhằm nâng cao khả năng căn chỉnh ngữ nghĩa và hiểu đa phương thức của mô hình.
3. **Đa ngôn ngữ & căn chỉnh**: thông qua bảng từ vựng chia sẻ hoặc mã hóa từ phụ, cùng với ngữ liệu song song liên ngôn ngữ hoặc tác vụ căn chỉnh, giúp mô hình mô hình hóa các ngôn ngữ khác nhau trong không gian vector thống nhất, thực hiện **chuyển giao và dịch liên ngôn ngữ**.

Trong giai đoạn **tiếp tục tiền huấn luyện theo ngành (DAPT)**, trọng tâm chuyển sang:

1. **Xây dựng ngữ liệu ngành**: xây dựng ngữ liệu chuyên ngành từ các kênh như hồ sơ & hướng dẫn y tế, bản án & điều luật pháp lý, báo cáo nghiên cứu & dữ liệu giao dịch tài chính, tài liệu thiết kế sản xuất / năng lượng / trò chơi.
2. **Thích ứng phong cách & thuật ngữ**: thông qua tiếp tục tiền huấn luyện trên lượng lớn ngữ liệu trong lĩnh vực, giúp mô hình tự nhiên nắm vững thuật ngữ ngành, biểu đạt cố định, phong cách viết chuyên nghiệp và kiến thức ngầm (như thói quen biểu đạt lâm sàng, cách diễn đạt pháp lý).
3. **Tiêm kiến thức chuyên ngành cấp doanh nghiệp**: đối với các doanh nghiệp hoặc tổ chức lớn, có thể thêm vào tài liệu nội bộ, cơ sở tri thức, bản ghi phiếu yêu cầu, v.v. sau ngữ liệu đa dụng + ngành, để huấn luyện "mô hình lớn riêng của doanh nghiệp" làm nền tảng thông minh thống nhất.

Trong thực tiễn kỹ thuật, tiền huấn luyện và tiếp tục tiền huấn luyện sẽ phối hợp với các khung phân tán quy mô lớn (Megatron‑LM, DeepSpeed ZeRO, v.v.) cùng pipeline dữ liệu hiệu quả (WebDataset / HF Datasets + lưu trữ đối tượng) để vận hành, hình thành **đường ống huấn luyện ổn định có thể tái sử dụng**. Đối với các nhà cung cấp đám mây hoặc công ty lớn, đường ống này thường được đóng gói thành nền tảng nội bộ, hỗ trợ tiền huấn luyện gia tăng theo chu kỳ và lặp song song nhiều nền tảng ngành.

### 11.1.2 Mô hình tinh chỉnh & RLHF: từ "biết nói" đến "hiểu nghiệp vụ, giữ ranh giới"

Sau khi có được nền tảng tiền huấn luyện mạnh mẽ, làm thế nào để mô hình "có ích cho nghiệp vụ" và "hành vi có thể kiểm soát", mấu chốt nằm ở giai đoạn tinh chỉnh và căn chỉnh. Ở đây bao gồm cả tinh chỉnh có giám sát (SFT) theo nghĩa truyền thống, cũng như tinh chỉnh chỉ thị, tinh chỉnh đa tác vụ và học tăng cường dựa trên phản hồi (RLHF / RLAIF).

Ở cấp độ **mô hình tinh chỉnh**, có thể chia đại khái thành:

1. **Tinh chỉnh toàn bộ tham số (Full Fine‑tuning)**
   Khi phân phối tác vụ và tiền huấn luyện khác biệt lớn, hoặc có yêu cầu cứng về hiệu suất tối đa và đủ tài nguyên tính toán (như mô hình ngôn ngữ lập trình cụ thể, mô hình hội thoại ngành / ngôn ngữ cụ thể), cập nhật trực tiếp toàn bộ tham số có thể đạt được giới hạn hiệu suất cao nhất. Nhưng chi phí cao, quản lý phiên bản phức tạp, thường chỉ dùng cho một số ít mô hình cốt lõi.
2. **Tinh chỉnh hiệu quả tham số (PEFT)**
   Thông qua các phương pháp như Adapter, LoRA / QLoRA, Prefix / P‑Tuning, chỉ huấn luyện "khối tham số gia tăng nhỏ" được chèn vào hoặc gia tăng hạng thấp của trọng số, trọng số mô hình lớn gốc vẫn bị đóng băng. Điều này mang lại ba lợi thế kỹ thuật:
   1. Đa tác vụ / đa khách hàng có thể chia sẻ cùng một nền tảng, chỉ chuyển đổi các trọng số Adapter / LoRA khác nhau.
   2. Giảm đáng kể nhu cầu bộ nhớ GPU và tài nguyên tính toán, hỗ trợ hoàn thành tinh chỉnh trong môi trường cụm GPU vừa và nhỏ hoặc máy đơn.
   3. Cập nhật thường xuyên, khôi phục đơn giản, thuận tiện cho thử nghiệm nhanh và thí nghiệm A/B.
3. **Tinh chỉnh chỉ thị & Tinh chỉnh tác vụ**
   1. **Tinh chỉnh chỉ thị (Instruction Tuning)**: thông qua mẫu "chỉ thị ngôn ngữ tự nhiên + đầu vào + đầu ra mong đợi", giúp mô hình học cách hiểu các hình thức chỉ thị của con người như "giúp tôi…" "vui lòng giải thích…", từ đó thoát khỏi khuôn mẫu đặc thù cho tác vụ.
   2. **Tinh chỉnh đơn tác vụ**: chỉ tinh chỉnh cho các tác vụ dọc như trả lời khách hàng, hoàn thành mã, tư vấn pháp lý, tối đa hóa hiệu suất của tác vụ đó.
   3. **Tinh chỉnh đa tác vụ**: đồng thời đảm nhận nhiều tác vụ trên cùng một mô hình thống nhất (hỏi đáp, tóm tắt, dịch thuật, mã nguồn, sinh lý do đề xuất, v.v.), nâng cao tính đa dụng của mô hình và hiệu quả sử dụng tài nguyên.

Ở cấp độ **căn chỉnh hành vi & an toàn**, **RLHF / RLAIF** đóng vai trò then chốt:

1. **Huấn luyện mô hình phần thưởng (Reward Model)**: thu thập sở thích của con người hoặc AI đối với nhiều câu trả lời ứng viên của mô hình (xếp hạng / chấm điểm), huấn luyện một mô hình phần thưởng có thể đánh giá "câu trả lời tốt hay xấu".
2. **Học tăng cường (như PPO) tối ưu hóa mô hình nền**: dưới sự hướng dẫn của mô hình phần thưởng, thông qua học tăng cường điều chỉnh tham số mô hình, làm cho nó phù hợp hơn với sở thích của con người và giá trị của nền tảng, ví dụ:
3. Lịch sự, trung lập, chuyên nghiệp hơn;
4. Từ chối trả lời hoặc viết lại an toàn đối với các yêu cầu nguy hiểm, vi phạm, liên quan đến quyền riêng tư;
5. Khi không chắc chắn thì biểu thị sự không chắc chắn, thay vì bịa đặt sự thật.
6. **RLAIF & căn chỉnh tự giám sát**: trong một số kịch bản, sử dụng mô hình nền mạnh làm người phản hồi, hoặc kết hợp quy tắc và đánh giá tự động, để căn chỉnh bán tự động quá trình tinh chỉnh, giảm chi phí gán nhãn thủ công.

Về chuỗi công cụ, các khung như Hugging Face Transformers + PEFT, TRL / trlx, DeepSpeed‑RLHF về cơ bản đã hình thành **quy trình công nghiệp tiêu chuẩn** từ SFT → huấn luyện RM → RLHF. Về định nghĩa sản phẩm, tầng này thường được triển khai dưới dạng: **dịch vụ tùy chỉnh / huấn luyện thay mô hình, nền tảng tinh chỉnh một chạm, thị trường mô hình đa người thuê và nền tảng kỹ thuật mô hình lớn chuyên ngành / doanh nghiệp riêng**.## 11.2 Triển khai và Suy luận Mô hình (Serving & Optimization)

Sau khi huấn luyện xong mô hình lớn, làm thế nào để cung cấp dịch vụ suy luận với **tính sẵn sàng cao**, **độ trễ thấp**, **có thể mở rộng** và **có thể giảm chi phí** là trụ cột thứ hai của hệ thống kỹ thuật AI. Lớp triển khai và suy luận một mặt kết nối với các cụm tài nguyên tính toán như GPU / NPU, mặt khác kết nối với API gateway, ứng dụng doanh nghiệp và nền tảng mở ra bên ngoài, với các trách nhiệm cốt lõi bao gồm: **thiết kế kiến trúc triển khai, chiến lược định tuyến mô hình, tối ưu hiệu năng suy luận và tận dụng phần cứng**.

Nhìn tổng thể, lớp này cần giải quyết ba vấn đề: **dùng kiến trúc gì để phục vụ bên ngoài**, **làm thế nào để suy luận nhanh hơn và rẻ hơn**, **làm thế nào để duy trì tính sẵn sàng cao và khả năng quản trị trong môi trường đa mô hình, đa khu vực, đa người thuê**.

- **Kịch bản**
  - Trung tâm AI nội bộ doanh nghiệp / Bus dịch vụ mô hình: thống nhất cung cấp API mô hình lớn cho các tuyến kinh doanh, che giấu sự khác biệt về mô hình và phần cứng bên dưới.
  - API đám mây mở ra bên ngoài: cung cấp giao diện suy luận chuẩn hóa cho nhà phát triển bên ngoài và đối tác hệ sinh thái, hỗ trợ lựa chọn đa mô hình và quản lý phiên bản.
  - Nghiệp vụ trực tuyến QPS cao: các kịch bản yêu cầu cực cao về độ trễ và độ ổn định như trợ lý khách hàng, tìm kiếm, đề xuất, trợ lý văn phòng.
  - Sinh tạo offline chi phí thấp: các tác vụ xử lý hàng loạt ưu tiên thông lượng và chi phí, không yêu cầu cao về thời gian thực như văn bản quảng cáo / game, sinh tạo cơ sở tri thức, tái cấu trúc mã hàng loạt.
  - Triển khai đa khu vực, đa cụm: cung cấp truy cập gần nhất cho người dùng toàn cầu hoặc đa khu vực, đồng thời hỗ trợ hình thức đa đám mây hoặc đám mây lai.
- **Nguyên lý**
  - Kiến trúc triển khai và định tuyến mô hình:
    - **Dịch vụ đơn mô hình**: trong giai đoạn đầu hoặc kịch bản đơn giản, sử dụng một mô hình chính để cung cấp dịch vụ thống nhất, kiến trúc đơn giản nhưng khó cân bằng giữa độ trễ và chi phí.
    - **Dịch vụ đa mô hình và định tuyến**: dựa trên các chiều như tác vụ khác nhau, yêu cầu độ trễ, ràng buộc chi phí, cấp độ người dùng, cấu hình các mô hình có kích thước hoặc chuyên môn khác nhau, và thực hiện định tuyến yêu cầu thông qua quy tắc hoặc Meta-model (bao gồm A/B testing, chiến lược Multi-armed Bandit, v.v.).
    - **Cách ly đa người thuê và quản lý SLA**: trong kịch bản đa khách hàng, thông qua hạn ngạch tài nguyên, giới hạn QPS, xác thực truy cập và phân cấp SLA để đảm bảo cách ly về hiệu năng và bảo mật giữa các người thuê khác nhau.
    - **Mở rộng đàn hồi và tính sẵn sàng cao**: tận dụng hạ tầng như Kubernetes / Service Mesh để thực hiện tự động mở rộng/thu hẹp, triển khai đa bản sao, phát hành theo mức xám (canary), triển khai xanh-lam (blue-green) và khắc phục thảm họa xuyên khu vực.
  - Tối ưu hiệu năng suy luận:
    - **Nén và tăng tốc mô hình**: thông qua lượng tử hóa (INT8 / INT4 / NF4 / GPTQ / AWQ), cắt tỉa / thưa hóa, chưng cất tri thức để giảm lượng tính toán và chiếm dụng bộ nhớ GPU của mô hình.
    - **Tối ưu cấp hệ thống**: sử dụng KV Cache để lưu trữ khóa-giá trị attention, tăng tốc hội thoại dài và suy luận liên tục; thông qua xử lý hàng loạt (Batching), sinh token song song và đầu ra luồng (streaming) để cân bằng thông lượng và độ trễ; thông qua hợp nhất toán tử (operator fusion) và tối ưu đồ thị để giảm chi phí truy cập bộ nhớ và khởi động kernel.
    - **Tận dụng phần cứng không đồng nhất**: xây dựng Runtime và chiến lược lập lịch thích ứng cho các phần cứng khác nhau như GPU, CPU, NPU, FPGA, ASIC, nâng cao hiệu quả tổng thể thông qua kết nối tốc độ cao như NVLink / RDMA trong kịch bản đơn máy đa card, đa máy đa card.
  - Kỹ thuật và vận hành:
    - Sử dụng các framework suy luận chuyên dụng như vLLM, TGI, Triton để giảm đáng kể chi phí tự phát triển.
    - Thông qua các trình biên dịch và Runtime như ONNX Runtime, TensorRT, TVM, OpenVINO để triển khai đa nền tảng và tối ưu cấp toán tử.
    - Tận dụng Kubernetes, Ray, Service Mesh và API gateway để xây dựng **cụm suy luận trực tuyến và lớp lập lịch lưu lượng** thống nhất.
- **Mô hình**
  - Framework Serving và dịch vụ suy luận:
    - vLLM, TGI (Text Generation Inference), Triton Inference Server.
    - Ray Serve, KServe, TorchServe, SageMaker Endpoint, Vertex AI Endpoint, v.v.
  - Cụm và lập lịch:
    - Kubernetes (K8s), Kubeflow, Ray, Slurm.
    - Service Mesh: Istio / Linkerd (hỗ trợ quản trị lưu lượng như canary, giới hạn tốc độ, ngắt mạch, fallback).
  - API gateway và xác thực:
    - Kong, NGINX / APISIX / Envoy.
    - IAM / Keycloak / Auth0, API Gateway của nhà cung cấp đám mây, OAuth2 / OIDC, v.v.
  - Nén mô hình và thư viện hiệu năng:
    - Lượng tử hóa: NVIDIA TensorRT-LLM / TensorRT, Intel Neural Compressor, OpenVINO (PTQ / QAT), BitsAndBytes, GPTQ, AWQ, AutoGPTQ.
    - Cắt tỉa / Thưa: PyTorch Sparse, TensorFlow Model Optimization Toolkit, SparseML, Neural Magic.
    - Chưng cất: các giải pháp tham khảo như DistilBERT / TinyBERT, hoặc pipeline chưng cất dựa trên Hugging Face Trainer + distillation loss tùy chỉnh.
  - Công cụ suy luận / Runtime và tối ưu đồ thị:
    - ONNX Runtime, TensorRT, OpenVINO Runtime, TVM, MNN, NCNN.
    - Công cụ suy luận chuyên dụng cho mô hình lớn: Sglang, vLLM, FasterTransformer, TGI, LMDeploy, DeepSpeed-Inference.
    - Biên dịch và tối ưu đồ thị: TVM, XLA (JAX/TF), TensorRT Graph Optimizer, TorchDynamo / TorchInductor, MLIR, Glow, ONNX Graph Optimizer, Intel NNCF, v.v.
  - Phần cứng và hỗ trợ không đồng nhất:
    - GPU: CUDA / cuDNN / cuBLAS, ROCm (AMD).
    - CPU: oneDNN (MKL-DNN), OpenBLAS, Eigen.
    - NPU / Card tăng tốc chuyên dụng: SDK như Ascend CANN, Habana Gaudi, Graphcore IPU.

Về mặt sản phẩm, lớp này thường xuất hiện dưới hình thức **trung tâm AI doanh nghiệp / bus dịch vụ mô hình, API đám mây mở, cổng suy luận thống nhất, cụm suy luận trực tuyến QPS cao, nền tảng xử lý hàng loạt chi phí thấp và giải pháp tối ưu hóa tỷ lệ sử dụng tài nguyên tính toán**, là "hệ điều hành" runtime hỗ trợ việc triển khai quy mô lớn năng lực mô hình lớn.

### 11.2.1 Kiến trúc triển khai và định tuyến mô hình: từ đơn mô hình đến lưới dịch vụ đa mô hình

Trong giai đoạn thử nghiệm ban đầu, nhiều đội ngũ sẽ chọn một mô hình "lớn và toàn diện" làm **điểm vào duy nhất** để cung cấp dịch vụ: tất cả yêu cầu đều được xử lý bởi cùng một mô hình. Mô hình này có kiến trúc đơn giản, chi phí bảo trì thấp, phù hợp với POC và kịch bản lưu lượng thấp. Nhưng khi nghiệp vụ mở rộng và áp lực chi phí tăng lên, những hạn chế của kiến trúc đơn mô hình sẽ nhanh chóng bộc lộ:

1. Các tác vụ khác nhau có yêu cầu không giống nhau về độ trễ / chi phí / chất lượng, dùng cùng một mô hình lớn xử lý tất cả yêu cầu sẽ gây **lãng phí tài nguyên tính toán**.
2. Hướng đến các ngành nghề, khách hàng khác nhau cần cung cấp năng lực khác biệt, ví dụ như mô hình chuyên ngành, trọng số fine-tune độc quyền cho khách hàng, rất khó quản lý thống nhất trong mô hình "đơn mô hình".
3. Các kịch bản như phát hành canary, A/B testing, khắc phục thảm họa xuyên khu vực yêu cầu khả năng lập lịch linh hoạt giữa nhiều phiên bản mô hình.

Do đó, hệ thống dịch vụ mô hình lớn trưởng thành thường sẽ tiến hóa thành kiến trúc **đa mô hình và định tuyến thông minh**:

1. **Nhóm đa mô hình và danh mục mô hình**: đồng thời duy trì nhiều mô hình với kích thước khác nhau (small / base / large / ultra), chuyên môn khác nhau (tổng quát / mã / đa phương thức / chuyên ngành), phiên bản khác nhau (v1 / v1.1 / tùy chỉnh cho khách hàng, v.v.), và thực hiện đăng ký, quản lý thống nhất ở lớp dịch vụ.
2. **Chiến lược định tuyến**:
3. **Định tuyến theo quy tắc**: dựa trên tham số yêu cầu (loại tác vụ, cấp độ người dùng, ưu tiên độ trễ / chi phí, v.v.) và quy tắc nghiệp vụ (ngành hoặc khu vực cụ thể bắt buộc sử dụng mô hình cụ thể) để lựa chọn tường minh.
4. **Bộ chọn mô hình (Meta-model)**: sử dụng một mô hình nhẹ để tự động chọn mô hình tối ưu dựa trên nội dung đầu vào, hiệu quả lịch sử, chỉ số thời gian thực (ví dụ: mô hình nhỏ nhanh vs. mô hình lớn chậm).
5. **Định tuyến A/B / Bandit**: thực hiện thử nghiệm trực tuyến giữa mô hình cũ và mới hoặc các cấu hình khác nhau, tự động hội tụ về phương án tốt hơn dựa trên các chỉ số như CTR, mức độ hài lòng của người dùng, tỷ lệ thành công của tác vụ.
6. **Cách ly đa người thuê và quản lý hạn ngạch**:
7. Chồng lớp kiểm soát hạn ngạch theo chiều người thuê, giới hạn QPS, xác thực truy cập và phân cấp SLA lên trên định tuyến mô hình, đảm bảo cách ly tài nguyên và dữ liệu giữa các khách hàng khác nhau.
8. Thông qua **cách ly logic + cách ly vật lý (cụm độc quyền hoặc node chuyên dụng)** để đáp ứng các kịch bản tuân thủ cao như tài chính / y tế / chính phủ.
9. **Mở rộng đàn hồi và tính sẵn sàng cao**:
10. Dựa trên Kubernetes HPA / VPA, Cluster Autoscaler để thực hiện tự động mở rộng/thu hẹp theo lưu lượng.
11. Thông qua triển khai đa bản sao, cân bằng tải, phát hành canary, triển khai xanh-lam và khắc phục thảm họa đa khu vực để đảm bảo độ ổn định của dịch vụ.

Về mặt kỹ thuật, thường sẽ áp dụng tổ hợp **Kubernetes + Service Mesh (Istio / Linkerd) + API gateway (Kong / APISIX / Envoy) + framework dịch vụ mô hình (vLLM / TGI / Triton / Ray Serve / KServe)**, hình thành một **nền tảng suy luận dạng lưới dịch vụ** vừa hỗ trợ đa mô hình, đa người thuê, vừa hỗ trợ quản trị lưu lượng và phát hành canary.

### 11.2.2 Tối ưu hiệu năng suy luận và tăng tốc phần cứng: ép "chi phí mỗi lần suy luận" xuống thấp nhất

Trong kịch bản thương mại hóa quy mô lớn của mô hình lớn, chi phí suy luận thường là một trong những khoản chi liên tục lớn nhất. Làm thế nào để vừa đảm bảo trải nghiệm, vừa nén **chi phí đơn vị yêu cầu (Cost per Request / per Token) và độ trễ end-to-end** xuống phạm vi chấp nhận được, là thách thức kỹ thuật cốt lõi của lớp triển khai.

Ở **phía mô hình**, các biện pháp phổ biến bao gồm:

1. **Lượng tử hóa (Quantization)**
   Thông qua việc nén trọng số và activation từ FP16 / BF16 xuống các định dạng bit thấp như INT8 / INT4 / NF4, giảm đáng kể chiếm dụng bộ nhớ GPU và chi phí băng thông.
   1. Lượng tử hóa sau huấn luyện (PTQ): như GPTQ, AWQ, BitsAndBytes, v.v., thực hiện lượng tử hóa offline cho mô hình hiện có.
   2. Huấn luyện nhận biết lượng tử hóa (QAT): xem xét lỗi lượng tử hóa trong giai đoạn huấn luyện / fine-tune, nâng cao độ chính xác sau lượng tử hóa.
2. **Cắt tỉa và thưa hóa (Pruning & Sparsity)**
   Thông qua cắt tỉa có cấu trúc / không cấu trúc để loại bỏ các trọng số hoặc kênh không quan trọng, làm cho mô hình thưa hơn, kết hợp với toán tử thưa thân thiện với phần cứng (như tăng tốc ma trận thưa của NVIDIA) để tăng tốc độ suy luận.
3. **Chưng cất (Distillation)**
   Sử dụng mô hình lớn làm giáo viên, chưng cất tri thức sang mô hình học sinh nhỏ hơn hoặc mô hình chuyên biệt cho tác vụ cụ thể, giảm đáng kể quy mô tham số trong khi vẫn duy trì hiệu năng tác vụ gần tương đương, phù hợp với nghiệp vụ trực tuyến cực kỳ nhạy cảm với độ trễ hoặc triển khai biên.

Ở **phía hệ thống và Runtime**, các điểm tối ưu then chốt bao gồm:

1. **KV Cache và tối ưu ngữ cảnh dài**:
   Trong quá trình sinh tự hồi quy, lưu trữ khóa-giá trị attention của token lịch sử, tránh tính toán lặp lại, từ đó nâng cao hiệu quả của hội thoại dài và yêu cầu đa vòng; kết hợp với chiến lược tính toán phân khối và cắt tỉa động để kiểm soát chi phí bộ nhớ GPU.
2. **Xử lý hàng loạt và sinh song song**:
   Thông qua xử lý hàng loạt động, lập lịch nhóm và sinh token song song cho nhiều yêu cầu, nâng cao thông lượng tổng thể mà không làm tăng đáng kể độ trễ P95; kết hợp với đầu ra luồng (Streaming) để cải thiện trải nghiệm tương tác phía frontend.
3. **Tối ưu toán tử và đồ thị**:
   Sử dụng trình biên dịch và Runtime (như TensorRT, TVM, ONNX Runtime, TorchInductor) để thực hiện hợp nhất toán tử, tối ưu bố cục bộ nhớ, biên dịch đồ thị tĩnh, giảm chi phí khởi động kernel và truy cập bộ nhớ.
4. **Lập lịch phần cứng không đồng nhất**:
   Dựa trên đặc tính tính toán và yêu cầu độ trễ của các tác vụ khác nhau, phân bổ hợp lý giữa các tài nguyên không đồng nhất như GPU, CPU, NPU, FPGA:
5. Các yêu cầu hội thoại / tìm kiếm cực kỳ nhạy cảm với độ trễ và có tính đồng thời cao được ưu tiên lập lịch lên GPU / NPU.
6. Các tác vụ như sinh hàng loạt, đánh giá offline, phát lại nhật ký có thể được lập lịch lên CPU hoặc GPU / NPU chi phí thấp.

Về công cụ và framework, TensorRT-LLM, SgLang, vLLM, FasterTransformer, LMDeploy, DeepSpeed-Inference, v.v. đã hình thành một bộ **hệ sinh thái tăng tốc suy luận mô hình lớn** tương đối trưởng thành. Ở phía nghiệp vụ, những tối ưu này cuối cùng được thể hiện qua: **cụm suy luận trực tuyến QPS cao, độ trễ thấp; nền tảng sinh tạo hàng loạt chi phí thấp; giải pháp tối ưu hóa tỷ lệ sử dụng tài nguyên tính toán và hệ thống tính phí, hạch toán chi phí MaaS / API**.## 11.3 Vận hành Dữ liệu & Mô hình (Data / Model Ops)

Khi mô hình ngôn ngữ lớn bước vào môi trường sản xuất, nó không còn là một tài sản tĩnh được "bàn giao một lần", mà trở thành một hệ thống động cần được lặp liên tục trên năm chiều: **dữ liệu, mô hình, cấu hình, phiên bản và thử nghiệm**. Lớp vận hành dữ liệu và mô hình (Data / Model Ops) chính là mô hình kỹ thuật được xây dựng xoay quanh thực tế này: từ vòng lặp dữ liệu (data flywheel), quản lý vòng đời mô hình đến thử nghiệm trực tuyến và phát hành tự động, cung cấp nền tảng cho việc **nâng cao bền vững và tiến hóa có kiểm soát** năng lực mô hình.

Lớp này một đầu kết nối với data lake / data warehouse, hệ thống log và thu thập dữ liệu, đầu kia kết nối với nền tảng huấn luyện, hệ thống đánh giá và cổng dịch vụ trực tuyến, là trung tâm kết nối vòng lặp khép kín "dữ liệu – mô hình – phản hồi nghiệp vụ".

- **Kịch bản**
  - Nền tảng tích hợp data middle platform doanh nghiệp + huấn luyện mô hình: kết nối toàn bộ chuỗi từ thu thập, làm sạch, gán nhãn, quản lý dữ liệu đến huấn luyện / tinh chỉnh, hỗ trợ lặp liên tục nhiều mô hình.
  - "Cơ chế nâng cao hiệu quả liên tục" cho ứng dụng AI hướng đến người dùng cuối / doanh nghiệp: dựa vào vòng lặp dữ liệu được thúc đẩy bởi phản hồi người dùng và dữ liệu sử dụng.
  - Bàn làm việc quản lý và gán nhãn dữ liệu dùng chung cho đội ngũ gán nhãn và đội ngũ thuật toán: hỗ trợ phân công nhiệm vụ, kiểm tra chất lượng, truy xuất phiên bản.
  - Nền tảng ModelOps cấp tập đoàn: thống nhất thu thập và quản lý tất cả phiên bản mô hình, kết quả đánh giá và trạng thái phát hành.
  - Hệ thống thử nghiệm và灰度 (canary release) trong kinh doanh trực tuyến: hỗ trợ kiểm thử A/B, vận hành thử nghiệm nhiều mô hình với lưu lượng nhỏ và tự động mở rộng lưu lượng cho phiên bản tốt nhất.
  - Dịch vụ lưu trữ mô hình: cung cấp cho đối tác / khách hàng khả năng quản lý mô hình "tải lên một nơi, triển khai đa môi trường, quản lý đa phiên bản".
- **Nguyên lý**
  - Quản lý dữ liệu và vòng lặp dữ liệu (Data Flywheel):
    - **Thu thập và quản trị dữ liệu**: Thu thập mẫu từ log nghiệp vụ, hội thoại người dùng, dữ liệu công khai, dữ liệu đối tác, thực hiện loại bỏ trùng lặp, khử nhiễu, ẩn danh, chuẩn hóa định dạng và đánh giá chất lượng.
    - **Vòng lặp phản hồi và gán nhãn**: Thông qua kết hợp gán nhãn chuyên gia và crowdsource, phối hợp với cơ chế kiểm tra chất lượng để xây dựng dữ liệu gán nhãn chất lượng cao; đưa phản hồi như thích / không thích của người dùng, sửa lỗi, đánh giá thủ công trở lại kho mẫu huấn luyện.
    - **Vòng lặp dữ liệu (Data Flywheel)**: Sau khi mô hình lên production, liên tục thu thập dữ liệu sử dụng thực tế → chọn ra các mẫu có giá trị cao (như lỗi mô hình, độ tin cậy thấp, tác vụ có lợi ích cao) → huấn luyện lại hoặc tinh chỉnh → hiệu quả mô hình được cải thiện → vòng sử dụng mới, hình thành vòng lặp phản hồi tích cực.
  - Vòng đời mô hình và phát hành:
    - **Quản lý phiên bản mô hình**: Duy trì cho mỗi mô hình số phiên bản rõ ràng (phiên bản chính / phụ), phiên bản dữ liệu huấn luyện, tham số cấu hình, kết quả đánh giá, báo cáo an toàn và lịch sử thay đổi.
    - **CI/CD** ** và pipeline tự động hóa**: Sau khi huấn luyện hoàn tất, tự động kích hoạt đánh giá và kiểm tra an toàn, thông qua kiểm thử hồi quy và ngưỡng kiểm soát (threshold gating), chỉ cho phép phát hành灰度 (canary release) và triển khai toàn bộ khi các chỉ số chính không suy giảm quá mức.
    - **Thử nghiệm và phân phối lưu lượng**: Sử dụng các phương pháp thử nghiệm trực tuyến như kiểm thử A/B, multi-armed bandit để so sánh nhiều phiên bản mô hình, tự động chọn phiên bản tốt nhất dựa trên chỉ số kinh doanh thời gian thực (ví dụ: tỷ lệ hoàn thành nhiệm vụ, tỷ lệ giải quyết ticket, mức độ hài lòng của người dùng).
- **Mô hình**
  - Data Lake và Data Warehouse:
    - Delta Lake, Apache Hudi, Iceberg, Hive, BigQuery, Snowflake, v.v., dùng để lưu trữ và quản lý thống nhất dữ liệu có cấu trúc / phi cấu trúc quy mô lớn.
  - Xử lý dữ liệu luồng (Streaming):
    - Kafka, Pulsar, Flink, Spark Streaming, v.v., dùng để tiếp nhận log thời gian thực, hội thoại người dùng và luồng sự kiện.
  - Quản lý đặc trưng và mẫu:
    - Feast và các Feature Store, kho mẫu tự xây dựng, ML Metadata Store, dùng để thu thập mẫu, đặc trưng và metadata huấn luyện.
  - Nền tảng gán nhãn và kiểm tra chất lượng:
    - Label Studio, nền tảng dạng Scale, hệ thống gán nhãn tự xây dựng, hỗ trợ gán nhãn đa nhiệm vụ, kiểm tra chất lượng và quản lý nhân sự.
  - Nền tảng MLOps / ModelOps:
    - MLflow, Kubeflow, SageMaker, Vertex AI, Azure ML, Weights & Biases, v.v., dùng để quản lý thử nghiệm huấn luyện, tham số, chỉ số và artifact mô hình.
  - Đăng ký và quản lý phiên bản mô hình:
    - MLflow Model Registry, SageMaker Model Registry, W&B Artifacts, v.v.
  - Công cụ CI/CD:
    - GitHub Actions, GitLab CI, Jenkins, Argo CD, Flux, v.v., dùng để xây dựng pipeline phân phối liên tục mô hình.

### 11.3.1 Vòng lặp dữ liệu và chu trình huấn luyện khép kín: Làm cho mô hình "càng dùng càng thông minh"

Trong phát triển phần mềm truyền thống, nâng cấp phiên bản thường được thúc đẩy bởi kế hoạch phát triển; nhưng trong thời đại mô hình ngôn ngữ lớn, **dữ liệu và phản hồi** trở thành động lực chính cho việc lặp. Mục tiêu của vòng lặp dữ liệu là biến "sử dụng mô hình → tích lũy dữ liệu → huấn luyện lại → nâng cấp mô hình" thành một vòng lặp khép kín tự động vận hành, khiến mô hình **càng dùng càng tốt** trong nghiệp vụ thực tế.

Các khâu cốt lõi bao gồm:

1. **Thu thập và sàng lọc dữ liệu trực tuyến**
   Trong các ứng dụng như chatbot, Copilot, tìm kiếm hỏi đáp, trợ lý lập trình, mỗi tương tác của người dùng đều là mẫu huấn luyện tiềm năng có giá trị cao. Thông qua hệ thống log và theo dõi sự kiện, thu thập có cấu trúc yêu cầu, câu trả lời của mô hình, hành vi người dùng (nhấp, chấp nhận hay không), đồng thời thực hiện ẩn danh quyền riêng tư và cắt bớt trường ngay tại điểm thu thập, đảm bảo không phát sinh thêm rủi ro tuân thủ.
2. **Khai thác mẫu có giá trị cao**
   Trong lượng lớn log, sàng lọc ra một phần nhỏ mẫu có giá trị nhất cho huấn luyện, ví dụ:
   1. Câu trả lời rõ ràng sai hoặc bị người dùng không thích, dùng cho huấn luyện lại kiểu "sửa lỗi".
   2. Mẫu câu hỏi dài độ khó cao, tác vụ quy trình phức tạp, dùng để nâng cao năng lực của mô hình trong "suy luận chuỗi dài / gọi công cụ nhiều bước".
   3. Ca nghiệp vụ điển hình, ticket có giá trị cao, dùng để xây dựng năng lực chuyên biệt cho ngành / doanh nghiệp.
3. **Gán nhãn và kiểm soát chất lượng**
   Thực hiện gán nhãn thủ công hoặc bán tự động cho các mẫu ứng viên (bao gồm câu trả lời mong đợi, xếp hạng ưu tiên, nhãn an toàn, v.v.), và thông qua nhiều vòng kiểm tra chất lượng, đánh giá lại và kiểm tra ngẫu nhiên để đảm bảo chất lượng gán nhãn, cung cấp dữ liệu đáng tin cậy cho SFT hoặc RLHF tiếp theo.
4. **Huấn luyện lại liên tục và đánh giá trước khi lên production**
   Định kỳ thêm mẫu mới vào tập huấn luyện, thực hiện các thao tác huấn luyện lại như SFT / DAPT / RLHF, đồng thời đánh giá cả "chỉ số ngoại tuyến + hiệu quả trực tuyến" thông qua bộ đánh giá tiêu chuẩn và thử nghiệm A/B trực tuyến, đảm bảo phiên bản mới tổng thể tốt hơn phiên bản cũ, tránh vòng lặp dữ liệu "rẽ sai hướng".

Ở hình thái trưởng thành, phần lớn thao tác của vòng lặp dữ liệu sẽ được đóng gói tự động vào **nền tảng Data / Model Ops**: từ thu thập dữ liệu, sàng lọc mẫu, phân công nhiệm vụ gán nhãn, đến kích hoạt huấn luyện lại mô hình, thu thập kết quả đánh giá và quyết định lên production, giảm thiểu tối đa thao tác thủ công, biến việc lặp mô hình thành một quy trình kỹ thuật ổn định và có thể kiểm soát.

### 11.3.2 Vòng đời mô hình và ModelOps: Từ mô hình thử nghiệm đến tài sản sản xuất

Khi số lượng và phiên bản mô hình tăng theo cấp số nhân, nếu thiếu quản lý vòng đời nghiêm ngặt, rất dễ phát sinh các vấn đề như "mô hình rải rác khắp nơi, phiên bản hỗn loạn, khó khăn khi rollback". Mục tiêu của ModelOps là quản lý mô hình như **tài sản kỹ thuật hạng nhất**, có thể truy xuất toàn bộ quá trình, so sánh được và rollback được.

Các điểm then chốt bao gồm:

1. **Phiên bản hóa và quản lý metadata**
   Gán cho mỗi mô hình số phiên bản rõ ràng (ví dụ: `industry-legal-base-v1.2.3`), và thu thập:
   1. Phiên bản dữ liệu huấn luyện và phạm vi thời gian;
   2. Cấu hình huấn luyện (siêu tham số, phiên bản script huấn luyện, Commit mã nguồn đã sử dụng);
   3. Chỉ số đánh giá (benchmark chung + benchmark đặc thù nghiệp vụ);
   4. Đánh giá an toàn và chiến lược căn chỉnh (như phiên bản chiến lược trả lời chủ đề nhạy cảm);
   5. Lịch sử lên production / gỡ xuống / rollback.
2. **Pipeline tự động hóa end-to-end (** **CI/CD\*\*** cho Mô hình**)\*\*
   Đóng gói quy trình "huấn luyện mô hình hoàn tất → đánh giá tự động → kiểm tra an toàn và thiên kiến → phát hành灰度 (canary) → phát hành toàn bộ" vào pipeline CI/CD.
3. Nếu chỉ số đánh giá ngoại tuyến không đạt ngưỡng cài đặt trước, tự động chặn lên production.
4. Nếu thử nghiệm A/B trực tuyến cho kết quả không tốt, tự động giảm lưu lượng hoặc rollback về phiên bản trước.
5. **Cùng tồn tại nhiều phiên bản và điều phối lưu lượng**
   Trong môi trường sản xuất, thường sẽ đồng thời tồn tại nhiều phiên bản mô hình (như `stable` / `canary` / `experimental`), thông qua chiến lược phân phối lưu lượng (tỷ lệ cố định, theo chiều người dùng, theo chiều đặc trưng) để so sánh trực tuyến giữa chúng.
   1. Kiểm thử A/B tập trung hơn vào kết luận thống kê ổn định;
   2. Multi-armed Bandit tự động cân bằng giữa khám phá và khai thác, tăng tốc hội tụ về phiên bản có hiệu quả tốt hơn.
6. **Hỗ trợ tuân thủ và kiểm toán**
   Đối với các ngành tài chính, y tế, hành chính công, cần duy trì hồ sơ truy xuất được cho mỗi lần thay đổi phiên bản mô hình: ai, khi nào, dựa trên dữ liệu gì, nâng cấp mô hình từ phiên bản nào lên phiên bản nào, và đánh giá tác động sau nâng cấp ra sao. Phần này thường liên kết với **cơ sở hạ tầng an toàn và tuân thủ** trong Mục 11.5.

Về mặt triển khai kỹ thuật, các công cụ như MLflow / SageMaker / Vertex AI / W&B đã cung cấp năng lực ModelOps tương đối trưởng thành, hầu hết doanh nghiệp sẽ đóng gói lớp thứ hai dựa trên chúng kết hợp với quy trình riêng, xây dựng **trung tâm đăng ký mô hình và nền tảng phát hành nội bộ** thống nhất.## 11.4 Giám sát, Chi phí & Độ tin cậy (Monitoring, Cost & Reliability)

Khi mô hình ngôn ngữ lớn trở thành hạ tầng cốt lõi của doanh nghiệp, việc đảm bảo **khả năng quan sát, cảnh báo, mở rộng linh hoạt và kiểm soát chi phí** trở thành trách nhiệm cốt lõi của đội ngũ SRE và nền tảng. Lớp giám sát, chi phí và độ tin cậy kết hợp hệ thống quan sát truyền thống với các chỉ số đặc thù của mô hình ngôn ngữ lớn, xây dựng góc nhìn đa chiều phục vụ cho đội ngũ vận hành, thuật toán và quản lý.

Lớp này một mặt kết nối với hệ thống thu thập giám sát, ghi nhật ký/truy vết liên kết, mặt khác kết nối với KPI nghiệp vụ và nền tảng phân tích chi phí, là trụ cột then chốt đảm bảo dịch vụ mô hình "ổn định, nhanh, tiết kiệm".

- **Kịch bản**
  - Bảng giám sát vận hành hướng đến đội ngũ vận hành/SRE: hiển thị thống nhất mức sử dụng CPU/GPU, QPS, độ trễ, tỷ lệ lỗi, cảnh báo, v.v.
  - Nền tảng giám sát chất lượng dữ liệu và mô hình hướng đến đội ngũ thuật toán: giám sát phân phối dữ liệu đầu vào, độ trôi mô hình, hiệu quả prompt engineering và tỷ lệ trúng của RAG, v.v.
  - Bảng sức khỏe dịch vụ hướng đến đội ngũ quản lý: liên kết hiển thị KPI nghiệp vụ (tỷ lệ chuyển đổi, mức độ hài lòng, tỷ lệ hoàn thành nhiệm vụ) với chỉ số mô hình.
  - Nền tảng phân tích và tối ưu chi phí AI: phân tách chi phí tài nguyên tính toán theo mô hình, dự án, tuyến nghiệp vụ, hỗ trợ quản lý ngân sách và chiến lược tối ưu chi phí.
  - Hệ thống lập lịch thông minh và co giãn linh hoạt: tự động mở rộng/thu hẹp hoặc chuyển đổi cấu hình mô hình dựa trên tải và ngân sách.
  - Hệ thống tính phí và hạch toán chi phí MaaS/API đối ngoại: hỗ trợ tính phí theo số lượng lệnh gọi, số token, mức sử dụng tài nguyên tính toán, v.v.
- **Nguyên lý**
  - Giám sát và khả năng quan sát:
    - **Giám sát đa tầng**: Từ tầng hạ tầng (CPU/GPU/bộ nhớ/mạng/lưu trữ) đến tầng dịch vụ (QPS, độ trễ P50/P95/P99, tỷ lệ lỗi, timeout và retry), rồi đến tầng mô hình (lượng token sử dụng, phân phối độ dài ngữ cảnh, độ dài phản hồi, các loại lỗi phổ biến).
    - **Ghi nhật ký và truy vết liên kết**: Ghi lại request/response dưới dạng nhật ký có cấu trúc (với điều kiện đã được che dấu thông tin nhạy cảm), kèm theo phiên bản mô hình, quyết định định tuyến, thông tin tenant; sử dụng công cụ truy vết phân tán để ghi lại toàn bộ liên kết của request từ API Gateway → dịch vụ mô hình → hệ thống hạ nguồn.
    - **Cảnh báo và phân tích**: Thiết lập cảnh báo ngưỡng, phát hiện bất thường và phân tích xu hướng, liên kết với chỉ số nghiệp vụ, chi phí và sự kiện bảo mật, giúp định vị và khôi phục nhanh chóng.
  - Kiểm soát chi phí và lập lịch linh hoạt:
    - **Phân tích chi phí**: Phân tách chi phí GPU/CPU/lưu trữ/băng thông theo mô hình, dự án, tuyến nghiệp vụ, tính toán chi phí trung bình mỗi request và chi phí biên của các tác vụ/khách hàng khác nhau.
    - **Lập lịch linh hoạt**: Áp dụng chiến lược phân thời gian cao điểm và thấp điểm, tự động mở rộng trong giờ cao điểm và thu hẹp trong giờ thấp điểm; dời các tác vụ batch ngoại tuyến sang ban đêm hoặc thời điểm tải thấp.
    - **Hạ cấp chiến lược và tăng tốc theo nhu cầu**: Khi tài nguyên khan hiếm, tự động chuyển sang mô hình nhỏ hơn, ngữ cảnh ngắn hơn hoặc cấu hình suy luận bảo thủ hơn; đối với request có giá trị cao, tự động sử dụng mô hình lớn hơn hoặc ngữ cảnh dài hơn.
- **Mô hình**
  - Giám sát và trực quan hóa:
    - Prometheus + Grafana, VictoriaMetrics, Thanos và các giải pháp thu thập và trực quan hóa chỉ số.
  - Hệ thống nhật ký:
    - ELK (Elasticsearch + Logstash + Kibana), EFK (Fluentd/Fluent Bit), OpenSearch, v.v.
  - Truy vết liên kết:
    - OpenTelemetry, Jaeger, Zipkin, v.v.
  - Giám sát đặc thù mô hình:
    - WhyLabs, Arize AI, Fiddler, Evidently AI, v.v., dùng để giám sát độ trôi dữ liệu/mô hình và đánh giá chất lượng đầu ra.
  - Thống kê và phân bổ chi phí:
    - K8s Metrics/Cost Exporter, Kubecost, cùng các công cụ Cost Management của các nhà cung cấp đám mây (AWS Cost Explorer/GCP Billing/Azure Cost Management).
  - Lập lịch tài nguyên và co giãn linh hoạt:
    - K8s HPA/VPA, Cluster Autoscaler, Volcano, Ray Cluster Autoscaler.
  - Điều phối tác vụ:
    - Argo Workflows, Airflow, Prefect, Dagster, v.v.

### 11.4.1 Giám sát và khả năng quan sát: Từ hạ tầng đến hành vi mô hình

Trong hệ thống mô hình ngôn ngữ lớn, các chỉ số CPU/bộ nhớ/QPS truyền thống không còn đủ, cần chồng thêm một tầng giám sát từ "góc nhìn mô hình" để thực sự thấy rõ tình trạng sức khỏe hệ thống. Một hệ thống quan sát hoàn chỉnh thường bao gồm:

1. **Giám sát hạ tầng và tầng dịch vụ**
   Thông qua Prometheus/Grafana, VictoriaMetrics, v.v. để thu thập và trực quan hóa:
   1. CPU, GPU, bộ nhớ, ổ đĩa, mạng ở cấp Node/Pod;
   2. QPS, độ trễ P50/P95/P99, tỷ lệ lỗi, tỷ lệ timeout-retry, số lượng kết nối ở cấp dịch vụ;
   3. Mức sử dụng tài nguyên và cảnh báo dung lượng ở cấp cụm.
2. **Giám sát chỉ số tầng mô hình**
   Đối với dịch vụ mô hình ngôn ngữ lớn, ngoài các chỉ số hiệu năng thông thường, cần giám sát chuyên biệt:
   1. Lượng token tiêu thụ mỗi request (đầu vào/đầu ra), phân phối độ dài ngữ cảnh;
   2. Độ dài phản hồi và tỷ lệ cắt ngắn, để điều tra vấn đề chất lượng do giới hạn ngữ cảnh/độ dài đầu ra;
   3. Thống kê các loại lỗi phổ biến (như đầu vào quá dài, timeout mô hình, lỗi gọi công cụ, v.v.).
3. **Ghi nhật ký và truy vết liên kết phân tán**
   1. Sử dụng nhật ký có cấu trúc để ghi lại tham số request (sau khi che dấu), phiên bản mô hình, quyết định định tuyến, định danh tenant, mã trả về và các thông tin khác.
   2. Sử dụng OpenTelemetry, Jaeger, Zipkin, v.v. để truy vết toàn bộ hành trình của một request trong liên kết API Gateway → dịch vụ mô hình → hệ thống hạ nguồn → callback, giúp định vị nút thắt độ trễ và điểm lỗi.
4. **Phát hiện bất thường và cảnh báo thông minh**
   Trên cơ sở cảnh báo ngưỡng truyền thống, có thể bổ sung giám sát thống kê đơn giản hoặc mô hình học máy để phát hiện bất thường đối với QPS, độ trễ, tỷ lệ lỗi, phân phối token, v.v. Khi xuất hiện đột biến, tự động báo động và liên kết chiến lược tự phục hồi (như tự động mở rộng, chuyển đổi luồng, hạ cấp dịch vụ).

Đối với đội ngũ thuật toán, còn có thể tích hợp các công cụ như WhyLabs, Arize, Evidently AI vào tầng này để theo dõi dài hạn phân phối đầu vào, đặc trưng đầu ra mô hình và tình trạng trôi, cung cấp tín hiệu cho vòng lặp dữ liệu và tái huấn luyện sau này.

### 11.4.2 Phân tích chi phí và lập lịch linh hoạt: Tìm điểm cân bằng giữa "trải nghiệm" và "ngân sách"

Một trong những thách thức vận hành nổi bật nhất của dịch vụ mô hình ngôn ngữ lớn là **chi phí cao và biến động lớn**. Thiếu phân tích chi phí tinh chỉnh và lập lịch linh hoạt, rất dễ rơi vào tình trạng khi nghiệp vụ tăng trưởng không nhìn thấy "tiền đốt đi đâu", cũng khó kịp thời điều chỉnh. Một hệ thống chi phí và lập lịch tài nguyên trưởng thành thường bao gồm:

1. **Quy trách nhiệm và phân bổ chi phí**
   Sử dụng Kubecost, công cụ Billing của nhà cung cấp đám mây cùng sổ cái tự xây dựng, phân tách chi phí GPU/CPU/lưu trữ/băng thông theo mô hình, dự án, tuyến nghiệp vụ, tenant, v.v., để mỗi đội ngũ và khách hàng đều thấy được mức tiêu thụ tài nguyên và chi phí thực tế tương ứng của mình.
2. **Chi phí mỗi request và phân tích chi phí biên**
   1. Tính toán chi phí trung bình mỗi request cho từng mô hình/tác vụ (Cost per 1k tokens/per request), so sánh tỷ lệ hiệu năng/chi phí giữa các mô hình và cấu hình khác nhau.
   2. Phân tích chi phí biên của các khách hàng, kịch bản nghiệp vụ khác nhau, cung cấp cơ sở cho chiến lược định giá (tính phí API), phân cấp SLA và đóng gói sản phẩm.
3. **Co giãn linh hoạt và tận dụng cao điểm-thấp điểm**
   1. Thông qua K8s HPA/VPA, Cluster Autoscaler, Ray Autoscaler và các cơ chế khác để thực hiện tự động mở rộng/thu hẹp, đảm bảo không sập dịch vụ trong giờ cao điểm và không lãng phí tài nguyên trong giờ thấp điểm.
   2. Sắp xếp các tác vụ ngoại tuyến (như tạo nội dung hàng loạt, phát lại nhật ký, đánh giá ngoại tuyến) vào ban đêm hoặc thời điểm không cao điểm, để nâng cao tỷ lệ sử dụng GPU tổng thể, làm mượt đường cong chi phí.
4. **Hạ cấp chiến lược và tăng tốc theo nhu cầu**
   1. Khi tài nguyên khan hiếm hoặc chi phí vượt ngân sách, tự động kích hoạt chiến lược hạ cấp: sử dụng mô hình nhỏ hơn, rút ngắn ngữ cảnh hoặc đầu ra, giảm mức độ song song.
   2. Đối với request có giá trị cao (như người dùng trả phí cấp cao, quy trình nghiệp vụ then chốt), tự động sử dụng mô hình lớn hơn, ngữ cảnh dài hơn hoặc khả năng gọi công cụ phong phú hơn, thực hiện "phân bổ tài nguyên tính toán theo giá trị".

Trong kịch bản API đối ngoại, tầng này còn liên kết sâu với hệ thống tính phí, hình thành **nền tảng tính phí và hạch toán chi phí MaaS/API**: tính phí dựa trên lượng token sử dụng, số lần gọi, cấu hình mô hình và loại request, đồng thời cung cấp phân tích chi phí và lợi nhuận gộp cho đội ngũ vận hành/kinh doanh.## 11.5 Cơ sở hạ tầng bảo mật, kiểm soát truy cập và tuân thủ (Security, Access Control & Compliance Infra)

Khi năng lực của mô hình lớn bước vào các ngành có độ nhạy cảm cao như tài chính, y tế, hành chính công, bảo mật và tuân thủ không còn là "giá trị gia tăng" mà là rào cản tiên quyết để tham gia vào lĩnh vực này. Lớp cơ sở hạ tầng bảo mật, kiểm soát truy cập và tuân thủ chịu trách nhiệm xây dựng tuyến phòng thủ cấp hệ thống từ **kiểm soát truy cập, bảo mật dữ liệu, bảo vệ quyền riêng tư đến kiểm toán tuân thủ**, đảm bảo dịch vụ mô hình vận hành đáng tin cậy trong khuôn khổ pháp luật và quy định.

Lớp này một đầu kết nối với hệ thống xác thực danh tính, quản lý quyền, khóa và mã hóa, đầu kia kết nối với dịch vụ mô hình và nền tảng nhật ký/kiểm toán, là chìa khóa để biến "mô hình có thể dùng" thành "mô hình dám dùng".

- **Kịch bản**
  - Nền tảng mô hình lớn nội bộ trong các ngành tuân thủ cao như tài chính/y tế/hành chính công: yêu cầu dữ liệu không rời khỏi miền, có thể kiểm toán, có thể truy vết.
  - Cổng kiểm soát truy cập và kiểm toán AI thống nhất doanh nghiệp: thực hiện xác thực, quản lý quyền và thu thập kiểm toán thống nhất cho tất cả các lần gọi mô hình.
  - Nền tảng SaaS/đám mây đa người thuê: cần cung cấp cách ly bảo mật nghiêm ngặt và hỗ trợ tuân thủ cho các khách hàng khác nhau ở cấp logic và vật lý.
  - Giao diện mở hướng tới đối tác/hệ sinh thái: yêu cầu kiểm soát quyền chi tiết và giới hạn hạn ngạch đối với các lần gọi API, đồng thời đáp ứng các yêu cầu tuân thủ (như GDPR, v.v.).
- **Nguyên lý**
  - Kiểm soát truy cập và cách ly người thuê:
    - Sử dụng API Key/Token/OAuth/SSO và các phương thức khác để xác thực danh tính.
    - Thông qua RBAC (kiểm soát truy cập dựa trên vai trò) và ABAC (kiểm soát truy cập dựa trên thuộc tính) để quản lý quyền chi tiết ở các chiều như mô hình, chức năng, tần suất gọi và phạm vi dữ liệu.
    - Trong môi trường đa người thuê, thực hiện cách ly **dữ liệu, nhật ký, cấu hình và trọng số mô hình**, ngăn chặn truy cập chéo giữa các người thuê và rò rỉ thông tin.
  - Bảo mật dữ liệu và bảo vệ quyền riêng tư:
    - Sử dụng mã hóa truyền tải TLS, mã hóa lưu trữ và quản lý khóa tập trung (KMS) để bảo vệ an toàn dữ liệu trong quá trình truyền tải và lưu trữ.
    - Triển khai chiến lược che giấu nhật ký và tối thiểu hóa dữ liệu, chỉ giữ lại thông tin cần thiết cho nghiệp vụ và tối ưu hóa, đồng thời kiểm toán hành vi truy cập.
    - Trong các kịch bản cần thiết, áp dụng công nghệ tăng cường quyền riêng tư (như ẩn danh dữ liệu, quyền riêng tư khác biệt, học liên kết) để giảm thiểu rủi ro quyền riêng tư hơn nữa.
  - Tuân thủ và kiểm toán:
    - Ghi lại toàn bộ và phê duyệt các thao tác quan trọng như phát hành mô hình, thay đổi cấu hình, thay đổi quyền, điều chỉnh chiến lược định tuyến.
    - Ghi lại siêu dữ liệu có thể truy vết cho mỗi yêu cầu: nguồn yêu cầu, phiên bản mô hình, cơ sở quyết định (như cơ sở tri thức đã sử dụng/tình huống gọi công cụ).
    - Đảm bảo thiết kế và vận hành hệ thống tuân thủ các yêu cầu quản lý của ngành tài chính, y tế, hành chính công cũng như các quy định tuân thủ dữ liệu nội địa và xuyên biên giới.
- **Mô hình**
  - Xác thực danh tính và quản lý quyền:
    - Keycloak, Auth0, Okta, IAM của các nhà cung cấp đám mây (AWS IAM/GCP IAM/Azure AD).
    - OPA (Open Policy Agent) + Rego Policy và các công cụ chính sách khác, dùng để quản lý và thực thi chính sách thống nhất.
  - Cổng bảo mật API:
    - Kong, Apigee, Envoy, API Gateway của nhà cung cấp đám mây, v.v.
  - Bảo mật dữ liệu và khóa:
    - KMS (Key Management Service), HashiCorp Vault.
    - Điểm cuối TLS, tính toán bảo mật (Confidential Computing), v.v.

### 11.5.1 Kiểm soát truy cập và cách ly người thuê: đảm bảo "ai có thể dùng, dùng được gì, dùng được bao nhiêu"

Trong nền tảng mô hình lớn được nhiều tuyến nghiệp vụ, nhiều khách hàng, nhiều vai trò cùng sử dụng, nếu không có kiểm soát truy cập chi tiết và cách ly người thuê, rất dễ xảy ra các vấn đề nghiêm trọng như lạm dụng quyền, rò rỉ dữ liệu và tranh giành tài nguyên. Một hệ thống truy cập và cách ly hoàn thiện cần phối hợp ở các chiều sau:

1. **Xác thực danh tính và** **đăng nhập một lần (SSO)**
   Thông qua API Key/Token, OAuth2/OIDC, SSO doanh nghiệp và các phương thức khác, thực hiện xác thực danh tính thống nhất cho nhân viên nội bộ, đối tác bên ngoài, ứng dụng bên thứ ba. Đối với người dùng doanh nghiệp, có thể kết nối với hệ thống danh tính hiện có (như AD/LDAP/IAM doanh nghiệp), tránh hệ thống tài khoản trùng lặp.
2. **Kiểm soát quyền chi tiết (** **RBAC** **/** **ABAC** **)**
3. RBAC: cấu hình riêng cho quản trị viên, kỹ sư thuật toán, vận hành nghiệp vụ, người dùng thông thường, đối tác và các vai trò khác về mô hình có thể truy cập, môi trường (kiểm thử/sản xuất), thao tác (gọi/cấu hình/phát hành) và hạn mức.
4. ABAC: trên cơ sở vai trò, đưa vào các thuộc tính như ID người thuê, ID dự án, miền dữ liệu, khung giờ, để thực hiện chính sách linh hoạt hơn (như "chỉ cho phép người thuê hành chính công A gọi cụm mô hình nội địa trong phạm vi khu vực").
5. **Cách ly đa người thuê và quản lý hạn ngạch**
   1. Ở cấp logic, cách ly lời gọi, dữ liệu và nhật ký của các khách hàng khác nhau thông qua ID người thuê;
   2. Ở cấp vật lý, đối với khách hàng tuân thủ cao (như ngân hàng/chính phủ), cung cấp cụm chuyên dụng hoặc nút chuyên dụng, đạt được cách ly cấp cao hơn;
   3. Cấu hình giới hạn QPS, số lượng kết nối đồng thời và hạn ngạch token cho các người thuê khác nhau, ngăn chặn "một người thuê tăng đột biến kéo sập toàn bộ hệ thống".
6. **Kiểm toán truy cập và đánh giá chính sách**
   1. thu thập kiểm toán đối với các thao tác quan trọng (như tạo/xóa API Key, điều chỉnh quyền, sửa đổi hạn ngạch);
   2. Sử dụng các công cụ chính sách như OPA/Rego, trước khi thực thi tiến hành đánh giá và giải thích thống nhất các chính sách truy cập phức tạp, giảm rủi ro "chính sách phân tán trong mã nguồn".

Thông qua cơ chế lớp này, nền tảng có thể mở rộng năng lực mô hình lớn cho người dùng nội bộ và bên ngoài trong điều kiện đảm bảo an toàn tài nguyên và dữ liệu, đồng thời cung cấp dữ liệu cơ bản cho kiểm toán tuân thủ và truy cứu trách nhiệm sau này.

### 11.5.2 Bảo mật dữ liệu, quyền riêng tư và kiểm toán tuân thủ: khiến mô hình "vừa dễ dùng vừa tuân thủ"

Mô hình lớn thường tiếp xúc với lượng lớn dữ liệu nhạy cảm (hội thoại người dùng, tài liệu nghiệp vụ, bản ghi giao dịch, v.v.), một khi xảy ra vấn đề về bảo mật hoặc tuân thủ, hậu quả sẽ vô cùng nghiêm trọng. Do đó, cần triển khai "phòng thủ đa lớp" trên toàn bộ vòng đời dữ liệu và toàn bộ chuỗi gọi mô hình.

1. **Bảo mật truyền tải và lưu trữ dữ liệu**
   1. Bật mã hóa TLS thống nhất cho tất cả các giao diện bên ngoài và nội bộ, ngăn chặn bị nghe lén hoặc giả mạo trong quá trình truyền tải;
   2. Sử dụng mã hóa tĩnh để lưu trữ dữ liệu nhạy cảm, kết hợp với KMS của nhà cung cấp đám mây hoặc tự xây dựng để quản lý vòng đời khóa;
   3. Sử dụng các công cụ như Vault để quản lý tập trung khóa và chứng chỉ cần thiết để truy cập cơ sở dữ liệu, lưu trữ đối tượng, API bên thứ ba.
2. **Nguyên tắc tối thiểu hóa và che giấu**
   1. Chỉ thu thập các trường dữ liệu cần thiết cho nghiệp vụ, và cố gắng loại bỏ thông tin định danh cá nhân (PII) cùng các trường nhạy cảm trong nhật ký và mẫu huấn luyện;
   2. Đối với các mã định danh không thể tránh khỏi phải giữ lại, tiến hành băm hoặc ẩn danh hóa để giảm rủi ro rò rỉ;
   3. Trong kịch bản RAG/cơ sở tri thức, phân cấp quyền truy cập tài liệu, đảm bảo mô hình không truy xuất thông tin từ "tài liệu không được phép xem".
3. **Công nghệ tăng cường quyền riêng tư và ràng buộc biên**
   1. Trong các kịch bản cần chia sẻ mô hình mà không chia sẻ dữ liệu gốc, áp dụng quyền riêng tư khác biệt hoặc học liên kết, cân bằng giữa quyền riêng tư và hiệu năng;
   2. Đối với các kịch bản hành chính công, tài chính, y tế, áp dụng mô hình "dữ liệu không rời khỏi miền, mô hình triển khai cục bộ hoặc hạ tầng nội bộ", triển khai năng lực huấn luyện/suy luận trong miền tuân thủ.
4. **Cơ chế tuân thủ và kiểm toán**
   1. Thực hiện luồng phê duyệt và ghi vết đối với các thao tác như phát hành mô hình, thay đổi cấu hình, điều chỉnh quyền, thuận tiện cho việc truy vết sau này;
   2. Ghi lại siêu thông tin như phiên bản mô hình, bên gọi, quyết định định tuyến, phạm vi truy cập dữ liệu cho mỗi yêu cầu, để có thể phục hồi khi phát sinh tranh chấp hoặc nhu cầu điều tra;
   3. Định kỳ xuất báo cáo tuân thủ (như kiểm toán truy cập dữ liệu, bản ghi sử dụng quyền, báo cáo sự kiện bất thường), kết nối với kiểm soát rủi ro nội bộ và yêu cầu quản lý bên ngoài.

Phần năng lực này phối hợp với nền tảng Data/Model Ops và giám sát ở mục 11.3, 11.4, cùng nhau tạo thành một môi trường vận hành mô hình "vừa có thể liên tục cải tiến, vừa an toàn tuân thủ".## 11.6 Năng lực ứng dụng tầng trên và trung đài (Application Enablers)

Với hạ tầng hoàn chỉnh từ huấn luyện đến suy luận, bảo mật và vận hành, vẫn cần thêm một "tầng năng lực" hướng tới nghiệp vụ và nhà phát triển, giúp trừu tượng hóa các mô hình lớn bên dưới thành các thành phần và dịch vụ dễ sử dụng hơn, gần gũi hơn với ngữ nghĩa nghiệp vụ. Tầng này thường được gọi là **AI trung đài, tầng kích hoạt ứng dụng hoặc nền tảng Copilot**, với trách nhiệm: đóng gói mô hình lớn + RAG + Agent + workflow thành các năng lực được chuẩn hóa, để các nhóm nghiệp vụ và đối tác hệ sinh thái có thể nhanh chóng xây dựng ứng dụng AI.

Một đầu của tầng này kết nối với model API, RAG engine và Agent Orchestrator, đầu còn lại kết nối với các hệ thống nghiệp vụ như CRM / ERP / OA / ticket, đóng vai trò là cầu nối then chốt "từ năng lực mô hình đến kịch bản nghiệp vụ".

- **Kịch bản**
  - Nền tảng AI trung đài / Copilot doanh nghiệp: cung cấp thống nhất các năng lực thông minh như hội thoại, RAG, Agent cho các hệ thống nội bộ như CRM, ERP, OA, chăm sóc khách hàng, tiếp thị, R&D.
  - Nền tảng phát triển ứng dụng dành cho nhà phát triển và đối tác hệ sinh thái: thông qua SDK, template project, công cụ soạn thảo trực quan, cho phép bên thứ ba nhanh chóng xây dựng và triển khai ứng dụng AI.
  - Backend AI cho sản phẩm SaaS ngành dọc: như cloud chăm sóc khách hàng thông minh, cloud tiếp thị, cloud cộng tác văn phòng, cloud quản lý R&D, v.v., nhúng năng lực AI vào hệ thống sản phẩm hiện có.
  - Trợ lý kịch bản dọc: Code Copilot, trợ lý bán hàng, trợ lý vận hành, trợ lý pháp lý, trợ lý bác sĩ, v.v., nhanh chóng tổ hợp giải pháp theo kịch bản thông qua năng lực trung đài.
- **Nguyên lý**
  - Năng lực hội thoại và Agent:
    - **Quản lý phiên hội thoại và bộ nhớ**: duy trì trạng thái hội thoại đa vòng và bộ nhớ dài hạn, hỗ trợ chuyển đổi chủ đề, nén ngữ cảnh và hồ sơ cá nhân hóa.
    - **Tool Use và điều phối** **workflow**: thông qua function call hoặc cơ chế plugin, kết nối mô hình với các hệ thống bên ngoài (cơ sở dữ liệu, tìm kiếm, API nghiệp vụ, dịch vụ bên thứ ba); trong các tác vụ phức tạp, sử dụng Workflow / Orchestrator để liên kết các thao tác đa bước.
    - **Cộng tác đa Agent**: phân tách các vai trò khác nhau (như người lập kế hoạch, người thực thi, người đánh giá) cho các tác vụ phức tạp, hoàn thành phân rã tác vụ và tổng hợp kết quả theo cách cộng tác.
  - RAG và cơ sở tri thức:
    - **Phân tích và tiền xử lý tài liệu**: phân tích, phân mảnh, cấu trúc hóa các tài liệu như PDF, Word, trang web, bản scan.
    - **Vector hóa và truy xuất**: sử dụng mô hình Embedding để vector hóa nội dung như văn bản / bảng biểu / mã nguồn, xây dựng chỉ mục vector; kết hợp truy xuất từ khóa và truy xuất vector để đạt được độ recall cao.
    - **Truy xuất + Sinh (RAG) và chuỗi bằng chứng**: khi suy luận, trước tiên truy xuất nội dung liên quan từ cơ sở tri thức, sau đó mô hình lớn sinh câu trả lời dựa trên kết quả truy xuất, đồng thời xuất trích dẫn và chuỗi bằng chứng, nâng cao độ chính xác và khả năng giải thích.
    - **Knowledge Graph** **và tích hợp tri thức có cấu trúc**: kết hợp knowledge graph miền, bảng dữ liệu nghiệp vụ, hệ thống quy tắc với LLM, nâng cao khả năng xử lý truy vấn có cấu trúc và ràng buộc phức tạp.
  - Tích hợp nhà phát triển và phát triển thứ cấp:
    - **SDK đa ngôn ngữ và thiết kế** **API**: cung cấp SDK cho các ngôn ngữ Python / JS / Java / Go, đóng gói mẫu gọi, thử lại và xử lý idempotency.
    - **Template và** **low-code** **/ no-code**: thông qua template project dựng sẵn và công cụ "lắp ghép" trực quan, cho phép cả những nhà phát triển không chuyên cũng có thể xây dựng RAG / Agent / Workflow.
    - **Plugin và middleware**: cung cấp plugin hoặc middleware cho các hệ thống nghiệp vụ phổ biến (CRM / ERP / OA / hệ thống ticket, v.v.), giảm chi phí tích hợp hệ thống.
- **Mô hình**
  - Framework hội thoại / Agent:
    - LangChain, LlamaIndex, Haystack, Semantic Kernel, v.v.
    - Tầng Orchestration tự phát triển: thường bao gồm Workflow Engine, Tool Router, mô-đun quản lý Memory.
  - RAG và truy xuất vector:
    - Cơ sở dữ liệu vector: FAISS, Milvus, Qdrant, Weaviate, Pinecone, v.v.
    - Phân tích tài liệu: unstructured, Textract, pdfplumber, Apache Tika, v.v.
  - SDK / tầng tích hợp:
    - SDK chính thức hoặc tự phát triển, thư viện component frontend (component chat, quản lý prompt template, giao diện lịch sử hội thoại).
    - Middleware / plugin cho hệ thống nghiệp vụ (CRM / ERP / OA / ticket, v.v.).

### 11.6.1 Điều phối hội thoại và Agent: từ "robot hỏi đáp" đến "thực thể cộng tác tác vụ"

So với các robot hỏi đáp kiểu FAQ thời kỳ đầu, ứng dụng được thúc đẩy bởi mô hình lớn hiện đại giống như "cộng tác viên thông minh biết sử dụng công cụ" hơn. Mục tiêu của điều phối hội thoại và Agent là nâng cấp mô hình lớn từ "trình sinh ngôn ngữ" thành tác nhân thông minh có khả năng **gọi công cụ, thực thi kế hoạch, điều phối đa vai trò**.

1. **Quản lý hội thoại và cơ chế bộ nhớ**
   1. Duy trì ngữ cảnh hội thoại, hồ sơ người dùng và bộ nhớ chu kỳ dài, đảm bảo tính nhất quán và liên tục trong tương tác đa vòng;
   2. Đối với hội thoại siêu dài, áp dụng các phương pháp nén như tóm tắt, bộ nhớ truy xuất để tránh ngữ cảnh "vượt quá giới hạn";
   3. Trong ứng dụng nội bộ doanh nghiệp, đưa thông tin định danh và quyền hạn vào ngữ cảnh hội thoại, để câu trả lời và thao tác phù hợp với quyền của người dùng trong hệ thống nghiệp vụ.
2. **Tool Use và điều phối** **workflow**
   1. Cung cấp danh sách công cụ có cấu trúc cho mô hình (như "tra cứu đơn hàng", "tạo ticket", "truy vấn tồn kho", "gọi công cụ tìm kiếm", v.v.) và thông qua giao diện function call cho phép mô hình chủ động gọi khi cần;
   2. Sử dụng Orchestrator để điều phối thứ tự gọi nhiều công cụ, luồng dữ liệu và xử lý lỗi dựa trên kế hoạch do mô hình đề xuất;
   3. Mô hình hóa workflow cho các quy trình nghiệp vụ phức tạp (như luồng phê duyệt, thanh toán chi phí, xử lý hậu mãi), để Agent có thể đóng vai trò "người điều phối quy trình".
3. **Mô hình cộng tác đa Agent**
   1. Phân tách tác vụ phức tạp thành nhiều vai trò: như "Agent lập kế hoạch tác vụ", "Agent truy xuất thông tin", "Agent thực thi", "Agent kiểm tra chất lượng / đánh giá";
   2. Thực hiện cộng tác giữa các Agent thông qua kênh tin nhắn hoặc bộ nhớ dùng chung, nâng cao tính robust và khả năng giải thích của tác vụ phức tạp;
   3. Trong môi trường doanh nghiệp, có thể đưa vai trò con người vào vòng cộng tác, như "AI soạn thảo – Con người đánh giá – AI sửa đổi – Hệ thống thực thi".

Tầng này thường sử dụng các framework có sẵn như LangChain, Semantic Kernel, LlamaIndex, kết hợp với dịch vụ Orchestration tự phát triển, thống nhất hội thoại, công cụ, workflow, quyền hạn và kiểm toán trong một "nền tảng Agent" duy nhất.

### 11.6.2 RAG, cơ sở tri thức và nền tảng nhà phát triển: "kết nối tri thức doanh nghiệp vào bộ não mô hình"

Dù mô hình lớn có mạnh đến đâu, cũng không thể tự nhiên nắm vững tri thức riêng của từng doanh nghiệp, lại càng không thể biết theo thời gian thực các chính sách, sản phẩm và quy tắc nghiệp vụ mới nhất. RAG + cơ sở tri thức + nền tảng nhà phát triển chính là lộ trình then chốt để kết nối **tri thức doanh nghiệp, tri thức ngành và dữ liệu thời gian thực** vào năng lực mô hình theo cách công nghiệp hóa.

1. **Phân tích tài liệu và nhập tri thức**
   1. Thông qua các thành phần như unstructured, Textract, pdfplumber, Tika, phân tích tài liệu PDF, Office, trang web, bản scan hình ảnh thành văn bản có cấu trúc;
   2. "Phân mảnh" theo chương, tiêu đề, khối ngữ nghĩa, cung cấp độ hạt phù hợp cho vector hóa và truy xuất sau này;
   3. Đối với thông tin có cấu trúc như dữ liệu bảng, cơ sở dữ liệu nghiệp vụ, tài liệu API, xây dựng ánh xạ schema và giao diện truy cập tương ứng.
2. **Vector hóa, lập chỉ mục và xếp hạng lại truy xuất**
   1. Sử dụng mô hình Embedding để chuyển đổi văn bản / mã nguồn / nội dung đa phương thức thành vector, lưu vào các cơ sở dữ liệu vector như FAISS, Milvus, Qdrant, Weaviate, Pinecone;
   2. Đồng thời giữ lại chỉ mục từ khóa và khả năng lọc metadata (như lọc theo tenant, phòng ban, loại tài liệu), tổ hợp thành quy trình "lọc trước truy xuất + truy xuất ngữ nghĩa + xếp hạng lại" có độ chính xác cao;
   3. Khi truy vấn, đưa kết quả truy xuất cùng với câu hỏi gốc vào mô hình lớn, thực hiện "Retrieval-Augmented Generation (RAG)", và trả về trích dẫn cùng chuỗi bằng chứng.
3. **Template ứng dụng RAG và xây dựng** **low-code**
   1. Cung cấp template RAG dựng sẵn cho các kịch bản phổ biến (hỏi đáp tri thức, giải thích chính sách, mô tả sản phẩm, trợ lý tài liệu nội bộ, v.v.);
   2. Thông qua giao diện cấu hình trực quan (chọn nguồn tri thức, thiết lập quy tắc phân mảnh, chọn mô hình vector và mô hình lớn) để nhanh chóng xây dựng trợ lý tri thức chuyên dụng;
   3. Tiếp xúc các năng lực này dưới dạng SDK cho nhà phát triển, hỗ trợ nhúng nhanh vào Web, di động, desktop hoặc plugin hệ thống nghiệp vụ.
4. **Nền tảng nhà phát triển và tích hợp hệ sinh thái**
   1. Cung cấp SDK cho các ngôn ngữ Python / JS / Java / Go, cũng như component frontend (bong bóng chat, khu vực trích dẫn tài liệu, nút phản hồi, v.v.), giảm ngưỡng tích hợp;
   2. Cung cấp plugin hoặc middleware cho các hệ thống nghiệp vụ chính (CRM / ERP / OA / ticket), để họ có thể "tích vài cấu hình" là kết nối được năng lực AI;
   3. Mở nền tảng phát triển ứng dụng ra bên ngoài, cho phép đối tác hệ sinh thái xây dựng ứng dụng ngành của riêng mình dựa trên mô hình nền tảng, RAG và năng lực Agent, hình thành vòng lặp tích cực "nền tảng – hệ sinh thái – khách hàng cuối".

Tầng này cuối cùng đóng gói các năng lực mô hình và hạ tầng phức tạp thành "thành phần nghiệp vụ có thể tái sử dụng, có thể lắp ráp", giúp doanh nghiệp với ngưỡng thấp hơn, tốc độ nhanh hơn, thực sự biến mô hình lớn thành công cụ năng suất thúc đẩy đổi mới nghiệp vụ, trong điều kiện **an toàn, tuân thủ và chi phí được kiểm soát**.