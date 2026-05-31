# Hướng dẫn Toàn diện về Claude Code Skills

## Giới thiệu về Skills

**Claude Code Skills** là một tính năng đóng gói kiến thức chuyên môn, quy trình làm việc và các phương pháp hay nhất thành các "gói kỹ năng" có thể tái sử dụng.

Bạn có thể hình dung Skills như những "cuốn sách kỹ năng" được trang bị cho Claude. Khi bạn cần nó hoàn thành một nhiệm vụ cụ thể, bạn không còn phải giải thích yêu cầu đi giải thích lại nhiều lần. Thay vào đó, nó có thể trực tiếp thực hiện công việc theo các tiêu chuẩn đã được xác định trước bởi Skill.

### Tại sao chúng ta cần Skills?

Trước khi Skills tồn tại, việc sử dụng Claude Code có một số vấn đề:

- **Hướng dẫn lặp lại**: mỗi lần, bạn đều phải giải thích những thứ như "tuân theo phong thái mã nào" và "thông báo commit nên được viết như thế nào"
- **Kiến thức không thể tích lũy**: kinh nghiệm cá nhân của các thành viên trong nhóm khi sử dụng Claude không thể chia sẻ được
- **Tiêu chuẩn không nhất quán**: những người khác nhau sử dụng Claude có thể nhận được kết quả hoàn toàn khác nhau
- **Hiệu suất thấp**: các tác vụ phổ biến phải được giải thích từ đầu mỗi lần

Skills giải quyết các vấn đề này và biến Claude thành một "thành viên nhóm giàu kinh nghiệm" - người biết các quy ước dự án của bạn, quy trình làm việc và các phương pháp hay nhất.

---

## Tại sao nên học Skills ngay bây giờ?

**Skills đang trở thành một năng lực không thể thiếu đối với các kỹ sư AI**:

- **Sự quan tâm cao từ cộng đồng**: các kho lưu trữ liên quan trên GitHub đang tăng sao nhanh chóng. Ví dụ, dự án OpenSkills đã đạt 7.2k sao, và Obsidian Skills đạt 6.6k sao chỉ trong 9 ngày
- **Hỗ trợ chính thức**: Anthropic duy trì một kho lưu trữ Skills chính thức, và Vercel đã ra mắt Agent Skills cùng công cụ find-skills
- **Rất thực tế**: từ đánh giá mã và thao tác Git đến tạo video và tạo PPT, Skills bao phủ nhiều kịch bản. Nền tảng skills.sh đã có các kỹ năng phổ biến với hơn 60K lượt đăng ký
- **Tăng hiệu suất**: cấu hình một lần, tái sử dụng nhiều lần, và để Claude thực sự trở thành "nhân viên số" của bạn
- **Sự công nhận từ nhà phát triển**: được đề xuất bởi nhiều cộng đồng kỹ thuật và được coi là công cụ chính yếu để cải thiện hiệu suất lập trình AI

---

## Bắt đầu Nhanh

Bây giờ bạn đã hiểu giá trị của Skills, hãy thử ngay. Phần này sẽ hướng dẫn bạn cài đặt Skill đầu tiên và hoàn thành một vài tác vụ thực hành thú vị để bạn nhanh chóng xây dựng trực giác.

### Bước 1: Cài đặt `find-skills` (khuyến nghị mạnh mẽ)

Trước khi bắt đầu sử dụng Skills, chúng tôi khuyến nghị bạn cài đặt `find-skills` trước. Đây là "công cụ tìm kiếm kỹ năng tối thượng" trong thế giới AI Agent và đã có hơn 60K lượt đăng ký.

**`find-skills` là gì?**

Nói một cách đơn giản, `find-skills` giống như một "công cụ tìm kiếm cửa hàng ứng dụng" cho AI Agent. Khi bạn cần hoàn thành một nhiệm vụ nhưng không có Skill phù hợp tại chỗ, nó sẽ tự động tìm kiếm và đề xuất kỹ năng phù hợp nhất.

**Cài đặt `find-skills`:**

```bash
npx skills add vercel-labs/skills@find-skills -g -y
```

Sau khi cài đặt, bạn có thể trực tiếp nói với Claude những gì bạn cần, và nó sẽ sử dụng `find-skills` để tự động tìm kiếm các kỹ năng liên quan.

**Ví dụ sử dụng:**

```text
Tôi cần tối ưu hóa hiệu suất của một component React. Giúp tôi tìm các skills tôi có thể sử dụng.
```

Claude sẽ tìm kiếm thông qua `find-skills`, sau đó cho bạn biết các kỹ năng liên quan mà nó tìm thấy để bạn có thể chọn một để cài đặt.

**Tại sao nên cài `find-skills` trước?**

Trước khi có `find-skills`:
- tìm kiếm thủ công trên GitHub các kỹ năng liên quan
- sao chép, cài đặt và cấu hình từng cái một
- gỡ lỗi và điều chỉnh lặp đi lặp lại

Sau khi có `find-skills`:
- mô tả yêu cầu bằng một câu
- AI tự động tìm kiếm kỹ năng phù hợp nhất
- cài đặt bằng một cú click và sử dụng ngay lập tức

**Lưu ý cho người dùng Windows**: phiên bản chính thức có hỗ trợ hạn chế cho Windows. Cộng đồng đã tạo một phiên bản tương thích với Windows hỗ trợ CMD và PowerShell và thêm tìm kiếm bằng tiếng Trung.

Tải xuống phiên bản Windows: [github.com/tongbei821/customize-skills](https://github.com/tongbei821/customize-skills/blob/main/findskills/SKILL.md)

Các bước cài đặt:
1. Tải xuống phiên bản Windows của `SKILL.md`
2. Thay thế tệp tại `C:/Users/your-username/.agents/skills/find-skills`
3. Khởi động lại Claude Code và nó sẽ có hiệu lực

**Liên kết liên quan**:
- [Trang web chính thức của Skills](https://skills.sh/) - duyệt tất cả các skills có sẵn
- [Kho lưu trữ find-skills](https://github.com/vercel-labs/agent-skills) - mã nguồn chính thức

### Cài đặt và Thử Skill Đầu tiên

Sau khi cài đặt `find-skills`, hãy sử dụng nó để tìm kiếm và cài đặt một Skill thú vị đầu tiên: công cụ tạo video Remotion.

#### Bước 1: Sử dụng `find-skills` để tìm kiếm Remotion

Nhập điều này trong Claude Code:

```text
Giúp tôi tìm các skills liên quan đến Remotion. Tôi muốn làm video.
```

Claude sẽ tìm kiếm thông qua `find-skills` và đề xuất `remotion-dev/skills`.

#### Bước 2: Cài đặt Remotion Skills

```bash
npx skills add remotion-dev/skills -g
```

#### Bước 3: Sử dụng nó để tạo điều gì đó thú vị

Remotion là một framework để làm video bằng mã React. Sau khi cài đặt Skill này, bạn có thể yêu cầu Claude bằng ngôn ngữ tự nhiên giúp bạn viết mã video.

**Nhiệm vụ 1: Làm một video văn bản hoạt hình ngầu**

```text
Sử dụng Remotion để làm một video:
- 1920x1080, 5 giây
- Một dòng chữ "Hello World" bay vào từ bên trái
- Với hiệu ứng xoay và thu phóng cùng lúc
- Nền là một gradient
```

Claude sẽ tạo mã Remotion hoàn chỉnh, và bạn có thể chạy nó để xem hoạt hình.

**Nhiệm vụ 2: Làm một video trực quan hóa dữ liệu**

```text
Làm một video 10 giây hiển thị sự tăng trưởng dữ liệu:
- Bắt đầu với một biểu đồ cột
- Các cột lớn lên từng cái một với hoạt hình
- Các con số đếm lên
- Ở cuối, hiển thị văn bản lớn nói "Tăng trưởng 300%"
```

**Nhiệm vụ 3: Làm một video demo sản phẩm nhiều cảnh**

```text
Làm một video demo sản phẩm với ba cảnh:
Cảnh 1: Logo mờ dần xuất hiện, 2 giây
Cảnh 2: Các tính năng sản phẩm xuất hiện từng cái một, 3 giây
Cảnh 3: Nút CTA bật lên, 2 giây
Sử dụng chuyển tiếp mượt mà giữa mỗi cảnh
```

**Chạy mã**:

Mã mà Claude tạo ra là một dự án Remotion hoàn chỉnh. Bạn có thể:

1. Tạo một dự án mới: `npx create-video my-video`
2. Sao chép mã được tạo bởi Claude vào đó
3. Chạy xem trước: `npm start`
4. Kết xuất video: `npm run build`

---

### Skill Thứ hai: Sử dụng `find-skills` để giải quyết "frontend trông xấu và cảm giác chậm"

#### Bước 1: Mô tả vấn đề của bạn bằng ngôn ngữ tự nhiên

Trực tiếp nói với Claude nhu cầu cấp cao của bạn:

```text
Trang web của tôi trông lỗi thời và tải chậm. Giúp tôi tìm các skills tôi có thể sử dụng.
```

Hoặc cụ thể hơn một chút:

```text
Tôi muốn frontend trông đẹp hơn và ngừng bị giật lag.
```

#### Bước 2: Claude sẽ tìm kiếm với `find-skills`

Claude sẽ tìm kiếm cơ sở dữ liệu skills.sh thông qua `find-skills` và đề xuất các kỹ năng liên quan. Đối với một yêu cầu như "làm cho nó trông đẹp hơn + giảm giật lag", nó sẽ đề xuất:

**anthropics/skills/frontend-design** (skill chính thức)

Skill này được thiết kế đặc biệt để giải quyết vấn đề giao diện do AI tạo ra "trông nhạt nhẽo và chung chung", giúp Claude thiết kế:

- phong cách thị giác độc đáo tránh vẻ "mẫu AI" cũ rích
- bảng màu và kiểu chữ chuyên nghiệp
- hiệu ứng hoạt hình mượt mà
- chất lượng mã cấp sản xuất, với mã sạch và hiệu suất tự nhiên tốt hơn

#### Bước 3: Cài đặt và sử dụng

**Cài đặt**:

```bash
npx skills add anthropics/skills/frontend-design -g
```

**Các tác vụ bạn có thể hoàn thành với nó**:

```text
Giúp tôi thiết kế lại trang này. Tôi muốn nó trông rất chuyên nghiệp và không giống như được tạo bởi AI.
```

```text
UI này quá xấu. Viết lại với phong cách thiết kế hiện đại hơn.
```

```text
Làm một bảng điều khiển chủ đề tối với cảm giác công nghệ mạnh mẽ.
```

Claude sẽ tuân theo các quy ước của skill này và giúp bạn thiết kế:
- một hướng thị giác độc đáo như chủ nghĩa tối giản, retro-futurism hoặc chủ nghĩa thô sơ
- màu sắc và phông chữ được chọn lọc kỹ lưỡng
- khoảng cách và bố cục hợp lý
- hoạt ảnh tương tác mượt mà

---

### So sánh Hai Skills

| Skills | Giải quyết vấn đề gì? | Độ thú vị |
|--------|----------------------|-----------|
| **remotion-dev/skills** | Làm video bằng mã | ⭐⭐⭐⭐⭐ |
| **anthropics/skills/frontend-design** | Làm frontend trông đẹp hơn | ⭐⭐⭐⭐ |

---

### Skill Thứ ba: Sử dụng `frontend-slides` để nhanh chóng tạo bài trình bày PPT đẹp

#### Giới thiệu

**frontend-slides** là một Skill cho phép bạn tạo bài trình bày HTML đẹp bằng ngôn ngữ tự nhiên - ngay cả khi bạn không biết CSS hay JavaScript.

Ý tưởng cốt lõi của nó là "**hiển thị, không kể**". Nếu bạn không thể mô tả rõ ràng phong cách thiết kế mà bạn muốn, nó sẽ tạo 3 bản xem trước thị giác để bạn chọn, thay vì buộc bạn mô tả các yêu cầu trừu tượng như "nền xanh, phông chữ lớn".

#### Cài đặt `frontend-slides`

**Cách 1: Cài đặt thủ công**

```bash
# Tạo thư mục skill
mkdir -p ~/.claude/skills/frontend-slides

# Tải xuống tệp (hoặc sao chép từ GitHub)
# 1. Truy cập https://github.com/zarazhangrui/frontend-slides
# 2. Tải xuống SKILL.md và STYLE_PRESETS.md
# 3. Đặt chúng vào ~/.claude/skills/frontend-slides/
```

**Cách 2: Cài đặt với `find-skills`**

```text
Giúp tôi tìm một skill để làm bài trình bày PPT
```

Claude sẽ tìm kiếm thông qua `find-skills` và đề xuất `frontend-slides`.

#### Các kịch bản sử dụng

**Kịch bản 1: Tạo bài trình bày từ đầu**

```text
/frontend-slides

Tôi muốn tạo một bản pitch deck gọi vốn cho một dự án startup AI, khoảng 10 slide
```

Claude sẽ hướng dẫn bạn:
1. điền nội dung của mỗi slide như tiêu đề, gạch đầu dòng và hình ảnh
2. mô tả cảm giác bạn muốn như ấn tượng, chuyên nghiệp hoặc ấm áp
3. chọn từ 3 bản xem trước phong cách thị giác
4. tạo bài trình bày HTML hoàn chỉnh
5. mở bản xem trước trong trình duyệt

**Kịch bản 2: Chuyển đổi tệp PowerPoint**

```text
/frontend-slides

Chuyển đổi bai_trinh_bay.pptx của tôi thành một bài trình bày web
```

Claude sẽ:
1. trích xuất tất cả văn bản, hình ảnh và ghi chú từ PPT
2. hiển thị nội dung đã trích xuất để bạn xác nhận
3. để bạn chọn phong cách thị giác
4. tạo bài trình bày HTML bảo toàn tất cả nội dung gốc

**Kịch bản 3: Nhanh chóng tạo bản xem trước phong cách**

```text
/frontend-slides

Tôi muốn làm một PPT cho một buổi nói chuyện kỹ thuật. Cho tôi xem các phong cách thị giác có sẵn trước.
```

Claude sẽ trực tiếp tạo 3 trang xem trước trong các phong cách khác nhau:
- **Chủ đề tối**: Neon Cyber, Terminal Green, Deep Space
- **Chủ đề sáng**: Paper & Ink, Swiss Modern, Soft Pastel
- **Phong cách đặc biệt**: Brutalist, Gradient Wave

#### Các phong cách thị giác tích hợp

| Tên phong cách | Đặc điểm | Kịch bản phù hợp |
|---------------|---------|-----------------|
| **Neon Cyber** | Cảm giác công nghệ tương lai, hiệu ứng hạt | Nói chuyện kỹ thuật, sản phẩm AI |
| **Midnight Executive** | Kinh doanh cao cấp, đáng tin cậy | Báo cáo kinh doanh, pitch deck gọi vốn |
| **Paper & Ink** | Phong cách biên tập, không khí văn học | Sáng tạo nội dung, chia sẻ giáo dục |
| **Swiss Modern** | Hình học sạch sẽ, phong cách Bauhaus | Danh mục đầu tư thiết kế, chủ nghĩa tối giản |
| **Brutalist** | Thô, táo bạo, thu hút sự chú ý | Triển lãm nghệ thuật, thể hiện cá nhân |

#### Kết quả đầu ra

Bài trình bày được tạo là một tài liệu **HTML tệp đơn** bao gồm:

- mã định dạng và tương tác hoàn chỉnh
- điều hướng bàn phím bằng phím mũi tên và phím cách
- hỗ trợ cảm ứng và vuốt
- chuyển slide bằng con lăn chuột
- thanh tiến trình và chấm điều hướng
- hoạt ảnh được kích hoạt bằng cuộn
- thiết kế đáp ứng

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <!-- Tất cả các kiểu được nhúng inline, không phụ thuộc -->
</head>
<body>
    <section class="slide title-slide">
        <h1 class="reveal">Tiêu đề của bạn</h1>
    </section>
    <!-- Thêm slide... -->
</body>
</html>
```

#### Tại sao nên đề xuất?

1. **Không phụ thuộc**: một tệp HTML duy nhất vẫn có thể mở được sau 10 năm
2. **Khám phá thị giác**: không cần mô tả thiết kế, chỉ cần chọn những gì bạn thích
3. **Chuyển đổi PPT**: giữ nội dung hiện có và cho nó một giao diện thị giác tốt hơn
4. **Mã cấp sản xuất**: dễ tiếp cận, được chú thích rõ ràng và dễ tùy chỉnh

**Liên kết liên quan**:
- [Kho lưu trữ GitHub của frontend-slides](https://github.com/zarazhangrui/frontend-slides) - 6.1k+ sao
- [Ví dụ xem trước trực tuyến](https://github.com/zarazhangrui/frontend-slides#output-example)

---

### So sánh Ba Skills

| Skills | Giải quyết vấn đề gì? | Độ thú vị | Tính thực tế |
|--------|----------------------|-----------|-------------|
| **remotion-dev/skills** | Làm video bằng mã | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| **anthropics/skills/frontend-design** | Làm frontend trông đẹp hơn | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **frontend-slides** | Nhanh chóng tạo PPT đẹp | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |

---

### Cách sử dụng sau khi cài đặt

Sau khi cài đặt, bạn không cần bất kỳ cấu hình thêm nào. Khi bạn yêu cầu Claude thực hiện một tác vụ liên quan, nó sẽ tự động gọi Skill tương ứng.

Xem các Skills đã cài đặt:

```bash
npx skills list
```

---

## Skills là gì?

### Khái niệm cốt lõi

**Skills là các "gói kỹ năng" được lưu trữ trong hệ thống tệp** và có thể bao gồm:

- **SKILL.md**: tệp định nghĩa kỹ năng, bắt buộc
- **scripts/**: các script hỗ trợ, tùy chọn
- **templates/**: các mẫu đầu ra, tùy chọn
- **references/**: tài liệu tham khảo, tùy chọn

### Skills so với prompts

Bạn có thể thắc mắc: sự khác biệt giữa Skills và việc gửi trực tiếp prompts cho Claude là gì?

| Prompts | Skills |
|---------|--------|
| Tạm thời, bạn phải lặp lại mỗi lần | Cố định, viết một lần và tái sử dụng nhiều lần |
| Nằm trong lịch sử trò chuyện và tiêu tốn token | Được tải theo yêu cầu và tiết kiệm token |
| Không thể chia sẻ giữa các phiên | Có thể chia sẻ trong nhóm |
| Khó kiểm soát phiên bản | Có thể quản lý bằng Git |

### Hai loại Skills

**Skills Toàn cục (cá nhân)**:
- vị trí lưu trữ: `~/.claude/skills/`
- phạm vi: tất cả các dự án
- kịch bản phù hợp: kỹ năng cá nhân dùng chung

**Skills Dự án (nhóm)**:
- vị trí lưu trữ: `thư-mục-dự-án/.claude/skills/`
- phạm vi: dự án hiện tại
- kịch bản phù hợp: chia sẻ trong nhóm và quy ước cụ thể dự án

### Cách Skills hoạt động

Khi Claude Code khởi động:

1. quét các thư mục Skills
2. phân tích từng tệp `SKILL.md`
3. trích xuất siêu dữ liệu YAML frontmatter
4. thêm nội dung kỹ năng vào "cơ sở kiến thức" của nó
5. tự động khớp kích hoạt dựa trên mô tả

---

## Cấu trúc Tệp `SKILL.md`

### Cấu trúc cơ bản

Một thư mục Skill hoàn chỉnh trông như thế này:

```text
my-skill/
├── SKILL.md          # Bắt buộc: tệp định nghĩa kỹ năng
├── scripts/          # Tùy chọn: các script hỗ trợ
├── templates/        # Tùy chọn: các mẫu đầu ra
├── references/       # Tùy chọn: tài liệu tham khảo
└── examples/         # Tùy chọn: tệp mẫu
```

### Mẫu `SKILL.md`

Tệp `SKILL.md` có hai phần:

**Phần 1: YAML Frontmatter (siêu dữ liệu)**

```yaml
---
name: skill-name              # Tên Skill, trở thành lệnh /skill-name
description: short description # Được sử dụng cho việc khớp kích hoạt tự động của Claude
category: development         # Danh mục
tags:                         # Thẻ
  - code
  - automation
---
```

**Phần 2: Nội dung Markdown (hướng dẫn)**

```markdown
# Tiêu đề Skill

## Trường hợp sử dụng
Khi nào sử dụng skill này

## Các bước thực hiện
1. Bước một
2. Bước hai

## Ghi chú
- Ghi chú 1
- Ghi chú 2
```

### Giải thích các trường chính

| Trường | Bắt buộc | Giải thích |
|--------|----------|------------|
| `name` | Có | Tên skill. Chỉ cho phép chữ thường, số và gạch ngang |
| `description` | Có | Mô tả skill. Càng cụ thể, Claude càng dễ khớp tự động |
| `category` | Không | Nhãn danh mục |
| `tags` | Không | Các nhãn danh mục bổ sung |
| `allowed-tools` | Không | Các công cụ có thể được sử dụng mà không cần quyền thêm |

---

## Skills so với MCP: Sự khác biệt là gì?

Nhiều người mới bắt đầu nhầm lẫn Skills và MCP, nhưng chúng là những thứ hoàn toàn khác nhau.

### Sự khác biệt cốt lõi

| Kích thước | Skills | MCP |
|-----------|--------|-----|
| **Bản chất** | Kiến thức và quy trình làm việc | Công cụ và giao diện |
| **Cung cấp gì** | Cho AI biết "cách làm" | Cho AI "công cụ có thể sử dụng" |
| **Vị trí lưu trữ** | Thư mục `skills/` | Máy chủ MCP |
| **Định dạng cấu hình** | Tệp Markdown | Tệp cấu hình JSON |
| **Phương thức kích hoạt** | `/skill-name` hoặc nhận dạng tự động | Được tải tự động thông qua cấu hình |

### Một phép ẩn dụ trực quan

Nếu Claude là một "công nhân":

- **MCP** sẽ là các "công cụ" được trao cho công nhân, như cờ lê, máy tính và quyền truy cập
- **Skills** sẽ là "sổ tay vận hành" được trao cho công nhân, như cách đánh giá mã hoặc cách gửi mã

### Mối quan hệ của chúng

Skills và MCP không cạnh tranh với nhau. Chúng bổ sung cho nhau:

```text
Tác vụ người dùng -> Claude nhận diện yêu cầu
               ↓
        Tải Skills liên quan (biết cách làm)
               ↓
        Gọi công cụ thông qua MCP (có công cụ sẵn có)
               ↓
        Hoàn thành tác vụ
```

### Ví dụ

**Kịch bản: đánh giá mã**

- **Skills** xác định các bước đánh giá, danh sách kiểm tra và định dạng đầu ra
- **MCP** cung cấp khả năng truy cập PR GitHub và lấy diff mã

Làm việc cùng nhau: Skills cho Claude biết "cách đánh giá", và MCP cho Claude "khả năng truy cập mã".

### Khuyến nghị lựa chọn

| Nhu cầu của bạn | Giải pháp được đề xuất |
|----------------|----------------------|
| Cần xác định quy trình làm việc | Sử dụng Skills |
| Cần truy cập dữ liệu bên ngoài | Sử dụng MCP |
| Cần cả hai | Sử dụng kết hợp |

---

## Tài nguyên Phổ biến để Tìm kiếm Skills

### Tài nguyên chính thức

- [Kho lưu trữ Skills chính thức của Anthropic](https://github.com/anthropics/skills) - một bộ sưu tập kỹ năng được duy trì chính thức
- [Tài liệu chính thức Claude Code - Skills](https://docs.anthropic.com/en/docs/claude-code/configuration/skills) - tài liệu chính thức

### Tài nguyên cộng đồng GitHub

| Kho lưu trữ | Mô tả |
|-------------|--------|
| [shanraisshan/claude-code-best-practice](https://github.com/shanraisshan/claude-code-best-practice) | Được duy trì bởi Boris Cherny, trưởng nhóm Claude Code, bao gồm Skills, Agents, Hooks và hơn thế nữa |
| [affaan-m/everything-claude-code](https://github.com/affaan-m/everything-claude-code) | Bộ công cụ toàn diện bao gồm Skills được cấu hình sẵn |
| [JackyST0/awesome-agent-skills](https://github.com/JackyST0/awesome-agent-skills) | Danh sách tài nguyên Skills được tuyển chọn |
| [jeffallan/claude-skills](https://github.com/jeffallan/claude-skills) | 66 kỹ năng chuyên nghiệp và 300+ tài liệu tham khảo |
| [GitCode/awesome-claude-skills](https://gitcode.com/GitHub_Trending/aw/awesome-claude-skills) | Bộ sưu tập mã nguồn mở được chọn lọc |

### Cách cài đặt Skills cộng đồng

Sử dụng `find-skills`, bạn chỉ cần nói với Claude những gì bạn cần, và nó sẽ tự động tìm kiếm và đề xuất:

```text
Giúp tôi tìm một skill liên quan đến tối ưu hóa hiệu suất React
```

Claude sẽ tìm kiếm trong cơ sở dữ liệu skills.sh thông qua `find-skills`, sau đó liệt kê các kỹ năng phù hợp nhất, và bạn có thể chọn một để cài đặt.

**Mẹo tìm kiếm**:

- sử dụng từ khóa cụ thể: `"react testing"` tốt hơn `"testing"`
- kết hợp "lĩnh vực + hành động": `"nextjs deploy"`, `"typescript lint"`
- ưu tiên các kỹ năng có số lượt cài đặt cao, vì 10K+ thường có nghĩa là đã được kiểm chứng
- theo dõi danh sách xu hướng để khám phá các kỹ năng mới nổi

---

## Cách Tạo Skills của Riêng Bạn

Có hai cách để tạo Skills: yêu cầu trực tiếp Claude tạo một cái cho bạn, hoặc sử dụng công cụ chuyên dụng `skill-creator`.

### Cách 1: Yêu cầu trực tiếp Claude giúp bạn tạo

Đây là cách tiếp cận đơn giản nhất. Chỉ cần nói với Claude yêu cầu của bạn bằng ngôn ngữ tự nhiên.

**Ví dụ**:

```text
Vui lòng giúp tôi tạo một skill có tên "format-code" để tự động định dạng mã.

Yêu cầu:
1. Tự động phát hiện ngôn ngữ lập trình
2. Áp dụng các quy tắc định dạng tương ứng
3. Trả về diff trước và sau khi định dạng
```

Claude sẽ tự động:
1. tạo cấu trúc thư mục
2. tạo tệp `SKILL.md`
3. điền vào YAML frontmatter
4. viết nội dung skill

**Kịch bản phù hợp**:
- nhanh chóng tạo các kỹ năng đơn giản
- bạn biết những gì bạn muốn nhưng không quen với định dạng `SKILL.md`
- bạn muốn lặp lại và sửa đổi nhanh chóng

### Cách 2: Sử dụng `skill-creator`

`skill-creator` là một công cụ chuyên dụng để tạo Skills. Nó hướng dẫn bạn từng bước qua quy trình.

**Cài đặt**:

```bash
npx skills add anthropics/skills@skill-creator -g
```

Hoặc cài đặt toàn bộ kho lưu trữ kỹ năng chính thức:

```bash
npx skills add anthropics/skills -g
```

**Sử dụng**:

```text
/skill-creator
```

Sau đó điền vào các trường:
- tên skill
- mô tả tính năng
- kịch bản sử dụng
- các bước thực hiện

`skill-creator` sẽ:
1. hướng dẫn bạn làm rõ mục đích của skill
2. tạo một bản nháp `SKILL.md`
3. tạo các trường hợp kiểm thử
4. chạy đánh giá và tối ưu hóa

**Kịch bản phù hợp**:
- tạo các kỹ năng phức tạp
- cần một quy trình tạo chuẩn hơn
- muốn kiểm tra và xác minh skill

### So sánh hai phương pháp

| Cách 1: Tạo trực tiếp | Cách 2: `skill-creator` |
|----------------------|------------------------|
| Nhanh và đơn giản | Các bước có hướng dẫn |
| Phù hợp cho kỹ năng đơn giản | Phù hợp cho kỹ năng phức tạp |
| Hoàn thành trực tiếp trong cuộc trò chuyện | Quy trình chuẩn hóa |
| Sửa đổi linh hoạt | Bao gồm kiểm tra và xác minh |

### Mẹo: cách viết một yêu cầu tốt

**Một mô tả yêu cầu tốt**:

```text
Tạo một skill "git-commit" tự động commit mã.

Các bước thực hiện:
1. Kiểm tra xem tệp nào đã được sửa đổi
2. Tạo thông báo commit tuân theo Conventional Commits
3. Chạy git commit
4. Hỏi xem có cần push không

Ghi chú:
- Kiểm tra thông tin nhạy cảm trước khi commit
- Không commit các thư mục như dist/ hoặc node_modules/
```

**Một mô tả yêu cầu kém**:

```text
Giúp tôi viết một skill để commit mã
```

Điều đó quá mơ hồ. Claude sẽ không biết chính xác những gì nó cần làm.

---

## Các Ví dụ Skills Phổ biến

### Ví dụ 1: Skill Đánh giá Mã

Tạo thư mục và tệp:

```bash
mkdir -p ~/.claude/skills/review-pr
```

```bash
cat > ~/.claude/skills/review-pr/SKILL.md << 'EOF'
---
name: review-pr
description: Review Pull Requests for code quality, security, and test coverage
---

You are a senior code reviewer.

## Review workflow

1. **Code style check**
   - Does the code follow team conventions?
   - Are names clear?
   - Are comments sufficient?

2. **Security check**
   - Are there security vulnerabilities?
   - Is sensitive information exposed?
   - Is input validation complete?

3. **Testing check**
   - Are there enough tests?
   - Do test cases cover edge conditions?
   - Are the tests runnable?

4. **Overall evaluation**
   - What are the strengths?
   - What needs improvement?
   - Do you recommend approving the merge?

## Output format

Please output the review results in a clear structure using a list format.
EOF
```

Cách sử dụng:

```text
/review-pr
Vui lòng đánh giá PR của nhánh hiện tại
```

### Ví dụ 2: Skill Tự động Commit Git

```bash
mkdir -p ~/.claude/skills/git-commit
```

```bash
cat > ~/.claude/skills/git-commit/SKILL.md << 'EOF'
---
name: git-commit
description: Automatically detect changes, generate a commit message, and commit the code
---

You are a skilled Git user.

## Execution workflow

1. **Check changes**
   Run `git status` to view modified files
   Run `git diff` to view detailed changes

2. **Generate commit message**
   Analyze the nature of the changes
   Generate a commit message that follows Conventional Commits
   Format: `type(scope): description`

3. **Security check**
   Check whether there is sensitive information such as keys, passwords, or tokens
   Check whether directories that should not be committed are included

4. **Execute after confirmation**
   Show the commit message for confirmation
   Run `git add` and `git commit`
   Ask whether a push is needed

## Notes

- Do not commit directories such as node_modules/, dist/, or .next/
- Run tests before committing to ensure the code works
- The commit message should clearly explain the change
EOF
```

Cách sử dụng:

```text
/git-commit
```

### Ví dụ 3: Skill Tạo Kiểm thử

```bash
mkdir -p ~/.claude/skills/gen-test
```

```bash
cat > ~/.claude/skills/gen-test/SKILL.md << 'EOF'
---
name: gen-test
description: Automatically generate unit tests for code to ensure correctness
---

You are a test engineer.

## Workflow

1. **Analyze the code**
   - Understand the function or class
   - Identify inputs and outputs
   - Find edge cases

2. **Generate tests**
   - Use an appropriate test framework
   - Cover normal cases
   - Cover edge cases
   - Cover exceptional cases

3. **Validate the tests**
   - Make sure the tests can run
   - Make sure the tests can catch problems
   - Do not over-mock the implementation

## Test frameworks

- JavaScript/TypeScript: Jest or Vitest
- Python: pytest
- Go: testing package

## Output format

Output the test code first, then explain how to run the tests.
EOF
```

Cách sử dụng:

```text
/gen-test
Tạo kiểm thử đơn vị cho src/utils.ts
```

### Ví dụ 4: Skill Tạo Tài liệu

```bash
mkdir -p ~/.claude/skills/gen-readme
```

```bash
cat > ~/.claude/skills/gen-readme/SKILL.md << 'EOF'
---
name: gen-readme
description: Automatically generate a README document for a project
---

You are a technical documentation expert.

## Workflow

1. **Analyze the project**
   - Scan the project directory structure
   - Check package.json or other configuration files
   - Read the existing code

2. **Generate content**
   - Project introduction
   - Installation steps
   - Usage instructions
   - API documentation
   - Development guide

3. **Formatting**
   - Use a clear section structure
   - Add code examples
   - Add appropriate badges
   - Add license information

## Standard README structure

- Project title and introduction
- Features
- Installation
- Quick start
- Usage instructions
- API documentation
- Development guide
- Contribution guide
- License
EOF
```

Cách sử dụng:

```text
/gen-readme
Tạo một tài liệu README cho dự án hiện tại
```

---

## Mẹo Nâng cao

### Kết hợp Skills với Hooks

Các Hooks có thể tự động thực hiện hành động trên các sự kiện cụ thể. Kết hợp với Skills, chúng cho phép tự động hóa mạnh mẽ hơn.

Ví dụ, tự động định dạng mã sau khi lưu:

```json
// .claude/hooks.json
{
  "hooks": {
    "PostToolUse": [{
      "matcher": {
        "tool_name": "Edit"
      },
      "hook": {
        "type": "command",
        "command": "/format-code"  // Gọi skill format-code
      }
    }]
  }
}
```

### Kết hợp Skills với Commands

Commands là các lệnh tắt đơn giản. Skills là các quy trình làm việc phức tạp. Chúng có thể được sử dụng cùng nhau.

### Hợp tác nhóm

**Chia sẻ Skills dự án**:

1. đặt các Skills dưới `.claude/skills/`
2. commit chúng vào Git
3. các thành viên trong nhóm có thể sử dụng sau khi clone dự án

**Kiểm soát phiên bản**:

- Skills có thể được kiểm soát phiên bản giống như mã
- mỗi commit có thể ghi lại các thay đổi về Skills
- bạn có thể quay lại các phiên bản cũ hơn

---

## Câu hỏi Thường gặp

### Câu hỏi 1: Tại sao Skill không được kích hoạt?

Nguyên nhân có thể:
- định dạng YAML frontmatter sai
- mô tả không đủ cụ thể
- Claude Code chưa được khởi động lại

Cách khắc phục:
- kiểm tra xem định dạng YAML có đúng không
- cải thiện mô tả và bao gồm các kịch bản sử dụng cụ thể
- khởi động lại Claude Code

### Câu hỏi 2: Làm thế nào để viết mô tả chính xác?

Một mô tả tốt bao gồm:
- chức năng cụ thể của skill
- kịch bản sử dụng, như "khi người dùng đề cập..."
- từ khóa kích hoạt

**Ví dụ kém**:
```text
description: Đánh giá mã
```

**Ví dụ tốt**:
```text
description: Đánh giá mã Pull Request. Kích hoạt khi người dùng đề cập PR, đánh giá hoặc đánh giá mã.
```

### Câu hỏi 3: Sự khác biệt giữa Skills và Commands là gì?

| Commands | Skills |
|----------|--------|
| Các lệnh tắt đơn giản | Quy trình làm việc hoàn chỉnh |
| Một tệp `.md` đơn lẻ | Một cấu trúc thư mục (`SKILL.md` + tệp tùy chọn) |
| Được kích hoạt thủ công | Có thể được kích hoạt tự động |
| Phù hợp cho các thao tác đơn giản | Phù hợp cho các quy trình phức tạp |

### Câu hỏi 4: Làm thế nào để gỡ lỗi Skill?

1. Sử dụng `/skills` để kiểm tra xem skill đã được nhận dạng chưa
2. Nhập trực tiếp tên skill để kích hoạt thủ công
3. Kiểm tra xem nội dung `SKILL.md` có đúng không
4. Xem lại nhật ký Claude Code

---

## Tài liệu Tham khảo

### Tài nguyên chính thức

- [Tài liệu chính thức Claude Code - Skills](https://docs.anthropic.com/en/docs/claude-code/configuration/skills)
- [Tiêu chuẩn Agent Skills](https://agentskills.io/)
- [Bài viết kỹ thuật của Anthropic (ý tưởng thực tế đằng sau Agent Skills)](https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills)
- [Kho lưu trữ GitHub Skills chính thức của Anthropic](https://github.com/anthropics/skills)
- [Tài liệu VS Code Copilot Agent Skills](https://code.visualstudio.com/docs/copilot/customization/agent-skills)

### Thư mục tài nguyên

- [skills.sh](https://skills.sh/) - Cửa hàng Agent Skills của Vercel với thư viện hơn 48,000 kỹ năng
- [find-skills](https://github.com/vercel-labs/agent-skills) - Công cụ tìm kiếm kỹ năng thông minh với hơn 60K lượt đăng ký
- [Marketplace Skills (giao diện tiếng Trung)](https://skillsmp.com/zh) - khám phá và cài đặt Skills cộng đồng

### Dự án cộng đồng trên GitHub

- [vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills) - Bộ sưu tập Agent Skills chính thức của Vercel Labs, bao gồm find-skills
- [claude-code-best-practice](https://github.com/shanraisshan/claude-code-best-practice) - Các phương pháp hay nhất chính thức được duy trì bởi Boris Cherny
- [everything-claude-code](https://github.com/affaan-m/everything-claude-code) - Bộ công cụ toàn diện bao gồm Skills được cấu hình sẵn
- [awesome-claude-skills](https://github.com/ComposioHQ/awesome-claude-skills) - Danh sách tài nguyên Skills được chọn lọc
- [superpowers](https://github.com/obra/superpowers) - Bộ sưu tập Skills cho các quy trình làm việc tự động hóa phát triển phần mềm
- [jeffallan/claude-skills](https://github.com/jeffallan/claude-skills) - 66 kỹ năng chuyên nghiệp và 300+ tài liệu tham khảo
- [awesome-agent-skills](https://github.com/JackyST0/awesome-agent-skills) - Danh sách tài nguyên được tuyển chọn

### Các ví dụ Skill chính thức

- [skill-creator](https://github.com/anthropics/skills/tree/main/skills/skill-creator) - một skill để tạo skills mới
- [mcp-builder](https://github.com/anthropics/skills/tree/main/skills/mcp-builder) - một skill để xây dựng máy chủ MCP
- [slack-gif-creator](https://github.com/anthropics/skills/tree/main/skills/slack-gif-creator) - một skill để tạo GIF Slack

### Hướng dẫn bằng tiếng Trung

- [Hướng dẫn toàn diện về cấu hình nâng cao Claude Code và mẹo sử dụng](https://blog.csdn.net/2601_95335870/article/details/158460599)
- [Vibe Coding - thực hành chuỗi đầy đủ với CLAUDE.md, Skills và Subagents](https://blog.csdn.net/yangshangwei/article/details/158319117)
- [Hướng dẫn từng bước tùy chỉnh Claude Code Skills](https://m.blog.csdn.net/u010028049/article/details/157979705)

## Đọc Thêm: Cơ chế Nội bộ của Claude Skills

Tiếp theo, chúng ta sẽ đi sâu vào cách Claude Skills hoạt động nội bộ, để bạn không chỉ biết cách sử dụng chúng mà còn hiểu tại sao chúng được thiết kế như vậy.

### Góc nhìn nguyên lý đầu tiên: tiêm ngữ cảnh động dựa trên prompt

Đầu tiên, hãy hiểu một sự thực quan trọng: **Skills không phải là mã có thể thực thi**.

Skills về bản chất là các hướng dẫn nâng cao, hay prompts, được "tiêm" vào ngữ cảnh của Claude khi cần thiết. Thiết kế này được gọi là "**Tiêm Ngữ cảnh Động dựa trên Prompt và Kiến trúc Meta-Công cụ**".

```text
┌─────────────┐      ┌─────────────┐      ┌──────────────┐
│ User Request│ ───> │ LLM Matches │ ───> │ Trigger Skill│
└─────────────┘      │Description  │      └──────────────┘
                     └─────────────┘              │
                                                 ▼
                                          ┌──────────────┐
                                          │ Inject Full  │
                                          │ Instructions │
                                          └──────────────┘
                                                 │
                                                 ▼
                                          ┌──────────────┐
                                          │ Execute Task │
                                          └──────────────┘
```

### Kiến trúc tải tiến triển ba lớp (tối ưu hóa token)

Để xử lý một lượng lớn Skills mà không tiêu tốn quá nhiều token, Claude sử dụng một cơ chế tải ba lớp thông minh:

| Lớp | Nội dung | Khi nào được tải | Chi phí token |
|-----|----------|-----------------|---------------|
| **Lớp 1: Siêu dữ liệu** | YAML frontmatter (`name + description`) | Khi Claude khởi động | ~30-50 tokens/skill |
| **Lớp 2: Hướng dẫn** | Toàn bộ nội dung `SKILL.md` | Khi Skill được kích hoạt | ~5,000 tokens |
| **Lớp 3: Tài nguyên** | Scripts, mẫu, tài liệu tham khảo | Được truy cập từ hệ thống tệp theo yêu cầu | Không thêm vào ngữ cảnh |

**Ưu điểm của thiết kế này**:

- Giả sử bạn có 100 Skills. Khi khởi động, chỉ khoảng 3,000-5,000 token được tiêu thụ cho siêu dữ liệu
- Chỉ Skill được kích hoạt mới tải nội dung đầy đủ
- Các tệp tài nguyên như tài liệu tham khảo không bao giờ được tải hoàn toàn vào ngữ cảnh

**So với không có Skills**:

```text
Không có Skills: mỗi cuộc trò chuyện cần 50,000+ token để mô tả tất cả khả năng
Có Skills: khởi động ~100 tokens/skill + 5,000 token được tải theo yêu cầu
Tiết kiệm: trung bình 40,000+ token được tiết kiệm mỗi cuộc trò chuyện
```

### Cơ chế tiêm ngữ cảnh kép

Khi một Skill được kích hoạt, hệ thống thực hiện hai sửa đổi đồng thời:

**1. Tiêm vào ngữ cảnh cuộc trò chuyện**

```javascript
// Những gì người dùng thấy (thông điệp hiển thị)
<command-message>The "pdf" skill is loading</command-message>

// Những gì AI thực sự nhận được (meta-thông điệp ẩn)
{
  isMeta: true,  // được đánh dấu là meta-thông điệp, không hiển thị trong UI
  content: `
    # Hướng dẫn Chuyên gia Phân tích PDF

    Bạn là một chuyên gia phân tích PDF chuyên nghiệp. Quy trình làm việc:
    1. Sử dụng pdftotext để trích xuất văn bản
    2. Phân tích cấu trúc tài liệu
    3. Tạo báo cáo tóm tắt
    ...
  `  // nội dung SKILL.md đầy đủ, có thể hàng ngàn từ
}
```

**2. Sửa đổi ngữ cảnh thực thi**

Bên cạnh việc tiêm hướng dẫn, một Skill cũng có thể sửa đổi động môi trường của Claude:

| Loại sửa đổi | Ví dụ | Giải thích |
|-------------|-------|------------|
| **Quyền công cụ** | `allowed-tools: "Bash(pdftotext:*)"` | Cấp tạm thời quyền truy cập vào một công cụ cụ thể |
| **Chuyển đổi mô hình** | Chuyển từ Sonnet sang Opus | Một số tác vụ phức tạp cần suy luận mạnh hơn |
| **Cách ly ngữ cảnh** | Tạo không gian phiên con | Tránh làm ô nhiễm ngữ cảnh cuộc trò chuyện chính |

### Cơ chế định tuyến dựa hoàn toàn trên suy luận LLM

Đây là một quyết định thiết kế rất quan trọng: **Claude Skills không sử dụng định tuyến hardcoded**.

| Phương pháp truyền thống | Claude Skills |
|-------------------------|---------------|
| ❌ Khớp vector embedding | ✅ Suy luận LLM thuần túy |
| ❌ Bộ phân loại | ✅ Forward pass của Transformer |
| ❌ Regex hoặc khớp từ khóa | ✅ Hiểu ngôn ngữ tự nhiên |
| ❌ Thuật toán định tuyến riêng biệt | ✅ Ra quyết định thống nhất của mô hình |

**Quy trình làm việc**:

```text
1. Tên và mô tả của mỗi Skill được định dạng thành mô tả công cụ Skill

2. Claude nhận được:
   - thông điệp của người dùng
   - danh sách công cụ có sẵn, bao gồm meta-công cụ Skill
   - danh sách Skills, với tên + mô tả

3. Hiểu ngôn ngữ tự nhiên của Claude khớp ý định của người dùng với mô tả Skill

4. Khi khớp thành công, nó gọi: command: "skill-name"
```

**Tại sao thiết kế như vậy?**

**Định tuyến hardcoded yêu cầu**:
- chi phí bảo trì thêm
- không có khả năng hiểu các mối quan hệ ngữ nghĩa phức tạp
- khó khăn trong việc xử lý nhiều ngôn ngữ
- không hỗ trợ khớp mờ

**Suy luận LLM thuần túy**:
- tận dụng khả năng hiểu ngôn ngữ của chính Claude
- tự động xử lý nhiều ngôn ngữ, từ đồng nghĩa và mô tả mờ
- không yêu cầu bảo trì thêm
- làm cho quyết định định tuyến thông minh hơn

### Cơ chế phân tích tệp

**Cấu trúc tệp `SKILL.md`**:

```bash
my-custom-skill/
├── SKILL.md              # Bắt buộc: tệp định nghĩa cốt lõi
├── config.json           # Tùy chọn: cấu hình siêu dữ liệu
├── README.md             # Khuyến nghị: tài liệu sử dụng
├── scripts/              # Tùy chọn: các script thực thi
├── templates/            # Tùy chọn: thư mục mẫu
└── references/           # Tùy chọn: tài liệu tham khảo
```

**Quy trình phân tích**:

```text
┌─────────────────────────────────────────────────────────────┐
│                    Khởi động Claude Code                      │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│  Quét các thư mục ~/.claude/skills/ và .claude/skills/      │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│  Sử dụng thư viện gray-matter để phân tích mỗi SKILL.md     │
│  YAML frontmatter                                           │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│  Xác thực các trường bắt buộc (name và description)         │
│  - name: tối đa 64 ký tự, chỉ chữ thường,                  │
│    số và gạch ngang                                        │
│  - description: được sử dụng cho khớp tự động LLM          │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│  Trích xuất siêu dữ liệu và xây dựng danh sách Skills       │
│  (chỉ tải name + description, không phải toàn bộ nội dung) │
└─────────────────────────────────────────────────────────────┘
```

### Ví dụ về quy trình thực thi đầy đủ

Hãy xem toàn bộ quy trình thông qua một ví dụ cụ thể:

```text
Người dùng: "Giúp tôi phân tích tệp PDF này"

═══════════════════════════════════════════════════════════════

Bước 1: Quyết định của LLM
────────────────
Claude tìm thấy mô tả của skill "pdf" trong danh sách Skills:
  description: "Phân tích nội dung tài liệu PDF, trích xuất văn bản, tạo tóm tắt"

═══════════════════════════════════════════════════════════════

Bước 2: Can thiệp hệ thống
────────────────
Claude Code thực thi:
  1. Đọc ~/.claude/skills/pdf/SKILL.md
  2. Tạo thông điệp hiển thị: "Skill pdf đang được tải"
  3. Tạo meta-thông điệp ẩn: nội dung SKILL.md đầy đủ
  4. Sửa đổi quyền phiên: allowed-tools = ["Bash(pdftotext:*)"]

═══════════════════════════════════════════════════════════════

Bước 3: Thực thi LLM
────────────────
Bây giờ ngữ cảnh của Claude chứa:
  - yêu cầu gốc của người dùng
  - hướng dẫn quy trình làm việc chuyên gia PDF
  - quyền truy cập công cụ pdftotext

Claude thực thi:
  1. Sử dụng pdftotext để trích xuất văn bản PDF
  2. Phân tích cấu trúc nội dung
  3. Tạo báo cáo tóm tắt
  4. Trình bày kết quả cho người dùng

═══════════════════════════════════════════════════════════════

Bước 4: Dọn dẹp sau khi sử dụng
────────────────
Sau khi hoàn thành tác vụ, toàn bộ nội dung Skill được loại bỏ khỏi ngữ cảnh
(chỉ còn lại lịch sử cuộc trò chuyện, không phải hướng dẫn Skill đầy đủ)
```

### Các đổi mới thiết kế cốt lõi

| Đổi mới | Phương pháp truyền thống | Phương pháp Skills | Ưu điểm |
|---------|------------------------|-------------------|---------|
| **Nguồn khả năng** | Cố định trong trọng số mô hình | Prompts được tải động | Mở rộng và cập nhật được |
| **Hiệu quả token** | Tất cả khả năng luôn ở trong bộ nhớ | Tải theo yêu cầu | Tiết kiệm 80%+ token |
| **Quản lý kiến thức** | Phân tán trong lịch sử cuộc trò chuyện | Hệ thống tệp mô-đun | Kiểm soát phiên bản và chia sẻ được |
| **Vòng đời** | Liên tục chiếm không gian | Dọn dẹp sau khi sử dụng | Ngữ cảnh sạch hơn |

### Nền tảng học thuật

Thiết kế của Claude Skills dựa trên các nghiên cứu sau:

| Lĩnh vực nghiên cứu | Công trình đại diện | Được áp dụng ở đây như |
|--------------------|--------------------|-----------------------|
| **Học tăng cường** | Voyager (2023) | Ý tưởng tích lũy thư viện kỹ năng |
| **Kiến trúc nhận thức** | ACT-R, Soar | Phân tách giữa bộ nhớ thủ tục và bộ nhớ khai báo |
| **Chính sách phân cấp** | Options Framework | Tải tiến triển ba lớp |

**Sự chuyển đổi tư duy cốt lõi**:

```text
Truyền thống: AI cần nhớ mọi thứ
      ↓
Skills: AI biết nơi tìm kiến thức chuyên môn
      ↓
Kết quả: giống với mô hình tư duy của chuyên gia con người hơn
```

### Mối quan hệ với tiêu chuẩn Agent Skills

Claude Skills tuân theo [tiêu chuẩn mở Agent Skills](https://agentskills.io/), điều này có nghĩa là:

- ✅ Khả năng tương thích đa nền tảng: các công cụ như Cursor, Windsurf và Aider cũng hỗ trợ
- ✅ Định dạng tệp thống nhất: cấu trúc `SKILL.md` tiêu chuẩn hóa
- ✅ Khả năng tương tác: Skills có thể được chia sẻ giữa các công cụ khác nhau

```text
Tiêu chuẩn Agent Skills định nghĩa:
├── Bắt buộc: tệp SKILL.md (siêu dữ liệu + hướng dẫn)
├── Tùy chọn: scripts/ (mã thực thi)
├── Tùy chọn: references/ (tài liệu cơ sở kiến thức)
└── Tùy chọn: assets/ (mẫu và tài nguyên)
```

### Tóm tắt: tại sao thiết kế này lại tuyệt vời?

1. **Tách biệt khả năng khỏi mô hình**: kiến thức chuyên môn không còn phụ thuộc vào huấn luyện mô hình và có thể được cập nhật bất kỳ lúc nào thông qua các tệp Markdown

2. **Hiệu quả token cực đại**: cơ chế tải ba lớp đảm bảo chỉ nội dung cần thiết được tải

3. **Sử dụng điểm mạnh của chính LLM**: định tuyến và khớp dựa hoàn toàn vào khả năng hiểu ngôn ngữ của Claude, không cần thuật toán bổ sung

4. **Thân thiện với nhà phát triển**: tạo một Skill chỉ cần viết Markdown, không cần lập trình

5. **Có thể kết hợp**: các Skills có thể tham chiếu và kết hợp với nhau để tạo thành quy trình làm việc phức tạp

6. **Dọn dẹp sau khi sử dụng**: tự động dọn dẹp sau khi hoàn thành và giữ cho ngữ cảnh luôn mới

---

### Tóm tắt

Skills là chìa khóa để biến Claude Code từ một "trợ lý chung" thành một "chuyên gia nhóm".

Thông qua Skills, bạn có thể:
- chuẩn hóa quy trình làm việc
- tái sử dụng kiến thức nhóm
- cải thiện hiệu suất hợp tác
- giảm giải thích lặp lại

Hãy nhớ: **nếu bạn thấy mình lặp lại cùng một hướng dẫn hai lần, bạn nên cân nhắc tạo một Skill**.

Bây giờ hãy đi tạo Skill đầu tiên của bạn.
