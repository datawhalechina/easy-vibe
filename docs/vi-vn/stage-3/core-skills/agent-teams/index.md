# Hướng dẫn toàn diện về Claude Agent Teams

## Giới thiệu về Agent Teams

**Agent Teams** là một tính năng mang tính cách mạng trong Claude Code cho phép **nhiều thực thể AI độc lập hợp tác như một đội ngũ phát triển thực sự**.

Hãy tưởng tượng rằng trước đây, việc sử dụng Claude Code giống như một quản lý dự án làm việc với một trợ thủ đặc biệt xuất sắc. Dù nhiệm vụ có phức tạp đến đâu, cũng chỉ có một mình trợ thủ đó làm việc. Bây giờ, với Agent Teams, bạn có thể tập hợp một đội ngũ phát triển AI hoàn chỉnh: một thành viên có thể xử lý frontend, một người xử lý backend, một người xử lý testing, và họ có thể **làm việc cùng lúc, giao tiếp với nhau và hợp tác để hoàn thành các nhiệm vụ phức tạp**.

### Từ một trợ thủ đơn lẻ đến hợp tác nhóm

Trước khi đi sâu vào Agent Teams, chúng ta hãy tìm hiểu vấn đề mà nó giải quyết.

**Hạn chế của chế độ AI đơn lẻ**:

Khi bạn sử dụng một thực thể Claude duy nhất để xử lý một dự án phức tạp, bạn sẽ gặp phải những điểm nghẽn sau:

- **Điểm nghẽn xử lý tuần tự**: AI chỉ có thể làm một việc tại một thời điểm. Ví dụ, khi tái cấu trúc một dự án, nó có thể cần phân tích mô-đun xác thực trước, sau đó là mô-đun cơ sở dữ liệu và cuối cùng là mô-đun API. Các bước này phải được thực hiện theo thứ tự, ngay cả khi chúng không phụ thuộc vào nhau.

- **Vấn đề quá tải ngữ cảnh**: tất cả thông tin nằm trong một cửa sổ hội thoại duy nhất. Khi cuộc hội thoại trở nên dài hơn, các chi tiết quan trọng ban đầu có thể bị chìm, và AI có thể quên các quyết định chính đã được thảo luận trước đó.

- **Giới hạn góc nhìn đơn lẻ**: chỉ có một AI suy nghĩ, nên không có thảo luận hay xác minh từ nhiều góc độ. Khi xuất hiện các quyết định thiết kế phức tạp, không có "đồng đội" để tranh luận hoặc cung cấp một góc nhìn khác.

- **Trần hiệu suất**: các cuộc tái cấu trúc lớn hoặc phát triển nhiều mô-đun mất rất nhiều thời gian và không có cách nào tăng tốc thông qua tính song song.

**Giải pháp của Agent Teams**:

Agent Teams giải quyết các vấn đề này thông qua **hợp tác song song giữa nhiều thực thể**:

- **Làm việc song song thực sự**: nhiều AI có thể làm việc trên các nhiệm vụ khác nhau cùng lúc. Một người có thể xử lý giao diện người dùng, người khác API backend và người khác thiết kế cơ sở dữ liệu mà không gây ảnh hưởng lẫn nhau.

- **Không gian ngữ cảnh độc lập**: mỗi thành viên trong đội có cửa sổ ngữ cảnh 200K token đầy đủ của riêng mình, do đó thông tin quan trọng không bị "quên" vì cuộc hội thoại trở nên quá dài.

- **Khả năng hợp tác nhóm**: các thành viên có thể giao tiếp trực tiếp, thảo luận các quyết định thiết kế và xác minh chất lượng mã với nhau, giống như một đội ngũ phát triển thực sự.

- **Tăng hiệu suất đáng kể**: theo kiểm thử nội bộ của Anthropic, hiệu suất trong các dự án tái cấu trúc quy mô lớn có thể cải thiện khoảng 50%.

---

## Agent Teams so với Subagent

Trước khi đi sâu hơn vào kiến trúc của Agent Teams, chúng ta cần làm rõ một điểm nhầm lẫn phổ biến: **điểm khác biệt giữa Agent Teams và Subagent là gì**?

Cả hai tính năng đều liên quan đến "nhiều AI hợp tác", nhưng mô hình hợp tác của chúng hoàn toàn khác nhau và phù hợp với các kịch bản khác nhau.

### So sánh cốt lõi一览

| Tiêu chí | Subagent | Agent Teams |
|---------|-------------------|----------------------|
| **Cấu trúc liên kết** | Cấu trúc hình sao: tất cả subagent báo cáo cho agent chính | Cấu trúc mạng lưới: các thành viên có thể giao tiếp với nhau |
| **Phương thức giao tiếp** | Agent chính truyền thông tin rõ ràng qua prompts, và các subagent trả kết quả khi hoàn thành | Các thành viên có thể giao tiếp, thảo luận và phối hợp trực tiếp |
| **Quản lý ngữ cảnh** | Mỗi subagent có ngữ cảnh độc lập, và agent chính chỉ truyền thông tin cần thiết | Mỗi thành viên có ngữ cảnh hoàn toàn độc lập |
| **Tính song song** | Có thể chạy song song, nhưng chuỗi hợp tác vẫn xoay quanh agent chính | Phát triển và hợp tác song song thực sự |
| **Phối hợp nhiệm vụ** | Agent chính phân phối và phối hợp mọi thứ tập trung | Các thành viên có thể nhận trách nhiệm nhiệm vụ tự chủ hơn |
| **Chi phí** | Không thấp. Sử dụng token cộng dồn khi nhiều subagent chạy song song | Cao hơn. Các thành viên chạy độc lập và giao tiếp thường xuyên hơn |

### Một phép ẩn dụ trực quan

**Subagent giống như**: một người quản lý viết các phiếu nhiệm vụ riêng cho vài trợ lý. Mỗi trợ lý làm việc độc lập dựa trên phiếu nhiệm vụ của mình, và khi hoàn thành, chỉ trả kết quả cho người quản lý. Các trợ lý không giao tiếp trực tiếp, và người quản lý không thấy toàn bộ quá trình suy nghĩ của trợ lý khi họ làm việc.

```
Bạn → Agent chính → Subagent A: "Phân tích file này"
Bạn → Agent chính → Subagent B: "Tìm hàm đó"
         ↓
    Subagent A hoàn thành → báo cáo kết quả cho Agent chính
    Subagent B hoàn thành → báo cáo kết quả cho Agent chính
         ↓
    Agent chính tổng hợp kết quả → báo cáo lại cho bạn
```

**Agent Teams giống như**: một quản lý dự án dẫn dắt một đội phát triển thực sự. Các thành viên trong đội có thể giao tiếp, thảo luận và hợp tác trực tiếp, thay vì chuyển mọi chi tiết thông qua quản lý dự án.

```
Bạn → Trưởng nhóm: "Xây dựng tính năng xác thực người dùng"
         ↓
    Trưởng nhóm tạo đội và phân công nhiệm vụ
         ↓
    Đồng đội A: "@Đồng đội B, thiết kế giao diện API xong chưa?"
    Đồng đội B: "Rồi, đây là định dạng..."
    Đồng đội C: "Tôi đã xem lại giao diện và phát hiện điều cần thảo luận..."
         ↓
    Các thành viên hợp tác hoàn thành công việc → Trưởng nhóm tổng hợp kết quả → báo cáo lại cho bạn
```

### Khi nào nên dùng cái nào

**Sử dụng Subagent khi**:

- Bạn có một nhiệm vụ nhanh, rõ ràng, đơn lẻ, như "tìm mã lỗi này"
- Các nhiệm vụ không phụ thuộc nhiều vào nhau
- Bạn muốn thực thi song song, nhưng không cần thảo luận liên tục giữa các thành viên

**Sử dụng Agent Teams khi**:

- Bạn đang tái cấu trúc hệ thống phức tạp kéo dài nhiều mô-đun
- Bạn cần phân tích và thảo luận từ nhiều góc độ, như chuyên gia bảo mật và chuyên gia hiệu suất tranh luận một giải pháp
- Bạn cần phát triển song song thực sự, với frontend, backend và testing diễn ra cùng lúc
- Nhiệm vụ đòi hỏi phối hợp thường xuyên và chia sẻ thông tin

### Tóm tắt đơn giản

- **Subagent**: công cụ phân phối nhiệm vụ, chia một nhiệm vụ lớn thành các nhiệm vụ nhỏ hơn và giao cho các "công nhân" khác nhau
- **Agent Teams**: một đội hợp tác thực sự, nơi các thành viên có thể giao tiếp, thảo luận và làm việc cùng nhau như một đội thực sự

---

## Kiến trúc cốt lõi

Agent Teams không chỉ đơn giản là tính năng "mở nhiều thực thể". Nó là một **hệ thống hợp tác đa agent hoàn chỉnh**. Để hiểu nó, chúng ta cần hiểu các thành phần cốt lõi và cách chúng hoạt động cùng nhau.

### Thành phần đội

Một đội Agent bao gồm bốn thành phần cốt lõi, mỗi thành phần có trách nhiệm riêng, hoạt động cùng nhau để hoàn thành các nhiệm vụ phức tạp.

**Trưởng nhóm**

Trưởng nhóm là "bộ não" và "người điều phối" của toàn bộ đội. Trưởng nhóm không trực tiếp thực hiện các nhiệm vụ lập trình. Thay vào đó, trưởng nhóm chịu trách nhiệm:

- **Phân tích yêu cầu và phân chia nhiệm vụ**: chia các yêu cầu phức tạp của người dùng thành nhiều nhiệm vụ con có thể chạy song song
- **Tạo và quản lý đội**: quyết định cần bao nhiêu thành viên và mỗi thành viên nên làm gì
- **Phân công và lên lịch nhiệm vụ**: giao nhiệm vụ cho các thành viên phù hợp và quản lý các phụ thuộc nhiệm vụ
- **Tổng hợp kết quả và kiểm soát chất lượng**: thu thập công việc của mỗi thành viên, tích hợp và thực hiện đánh giá cuối cùng

**Đồng đội**

Đồng đội là những "nhà phát triển" thực sự thực hiện công việc. Mỗi đồng đội là một thực thể Claude độc lập:

- **Cửa sổ ngữ cảnh độc lập**: mỗi thành viên có cửa sổ ngữ cảnh 200K token đầy đủ, hoàn toàn cách ly với Trưởng nhóm và các thành viên khác
- **Quyền công cụ đầy đủ**: họ có thể sử dụng tất cả các công cụ như Read, Write, Edit và Bash
- **Nhận nhiệm vụ tự chủ**: họ có thể tự chọn và nhận nhiệm vụ từ bảng nhiệm vụ dùng chung
- **Khả năng giao tiếp trực tiếp**: họ có thể giao tiếp trực tiếp với các thành viên khác thay vì luôn phải đi qua Trưởng nhóm

**Danh sách nhiệm vụ (TaskList)**

TaskList là "công cụ quản lý dự án" của đội, tương tự như Jira hoặc Trello:

- **Quản lý trạng thái nhiệm vụ**: mỗi nhiệm vụ có trạng thái rõ ràng: `pending`, `in_progress` hoặc `completed`
- **Quản lý phụ thuộc**: các nhiệm vụ có thể xác định phụ thuộc, và các nhiệm vụ phụ thuộc chỉ có thể bắt đầu sau khi các nhiệm vụ tiên quyết hoàn thành
- **Cơ chế mở khóa tự động**: khi một nhiệm vụ hoàn thành, hệ thống tự động kiểm tra và mở khóa các nhiệm vụ đang chờ nó
- **Cơ chế khóa file**: khi một thành viên nhận và bắt đầu nhiệm vụ, một file khóa được tạo trong thư mục nhiệm vụ để ngăn nhiều thành viên chỉnh sửa cùng một file cùng lúc

**Hệ thống nhắn tin**

Hệ thống nhắn tin là "công cụ chat" giữa các thành viên trong đội:

- **Giao tiếp điểm-điểm**: thành viên A có thể gửi tin nhắn trực tiếp cho thành viên B
- **Thông báo phát sóng**: một tin nhắn có thể được gửi đến tất cả thành viên cùng lúc
- **Dựa trên hệ thống file**: tin nhắn được lưu trữ dưới dạng file JSON trong `~/.claude/teams/{team-name}/inboxes/`
- **Không cần mạng**: mọi thứ hoạt động hoàn toàn thông qua hệ thống file cục bộ, không cần kết nối mạng hay lắng nghe cổng

### Quy trình hợp tác

Một quy trình làm việc điển hình của Agent Teams trông như thế này:

```
Người dùng gửi yêu cầu phức tạp
       ↓
Trưởng nhóm phân tích yêu cầu và chia thành nhiệm vụ
       ↓
Tạo thành viên đội và khởi tạo TaskList
       ↓
       ├─→ Đồng đội A nhận Nhiệm vụ 1 ─┐
       ├─→ Đồng đội B nhận Nhiệm vụ 2 ─┼→ Chạy song song
       ├─→ Đồng đội C nhận Nhiệm vụ 3 ─┤
       │                             ↓
       └──────────────────────────── Các thành viên phối hợp qua hệ thống nhắn tin
                                     ↓
                          Khi tất cả nhiệm vụ hoàn thành, Trưởng nhóm tổng hợp kết quả
                                     ↓
                          Kết quả cuối cùng được gửi đến người dùng
```

### Bố cục hệ thống file

Agent Teams tạo các thư mục chuyên dụng trên hệ thống file cục bộ của bạn để quản lý trạng thái đội:

```
~/.claude/
├── teams/
│   └── {team-name}/
│       ├── config.json          # Cấu hình đội (danh sách thành viên, lựa chọn mô hình, v.v.)
│       └── inboxes/
│           ├── team-lead.json   # Hộp thư đến của Trưởng nhóm
│           ├── teammate-1.json  # Hộp thư đến của Thành viên 1
│           └── teammate-2.json  # Hộp thư đến của Thành viên 2
└── tasks/
    └── {team-name}/
        ├── task-1.json          # Thông tin chi tiết Nhiệm vụ 1
        ├── task-2.json          # Thông tin chi tiết Nhiệm vụ 2
        └── current_tasks/
            └── parse_if_statement.txt  # File khóa được tạo khi một nhiệm vụ đang chạy
```

Ưu điểm của thiết kế này là **minh bạch hoàn toàn**: bạn có thể kiểm tra trạng thái đội, tiến độ nhiệm vụ và lịch sử giao tiếp giữa các thành viên bất kỳ lúc nào.

---

## Bắt đầu nhanh

### Kích hoạt tính năng thử nghiệm

Agent Teams hiện là một **tính năng thử nghiệm** và bị vô hiệu hóa theo mặc định. Để sử dụng, bạn cần kích hoạt trước.

**Cách đơn giản nhất: để Claude Code kích hoạt cho bạn**

Nhập trực tiếp vào Claude Code:

```
Help me enable Agent Teams in settings.json
```

Hoặc:

```
Enable the experimental feature agentTeams
```

Claude Code sẽ tự động chỉnh sửa `~/.claude/settings.json` và thêm cấu hình sau:

```json
{
  "experimental": {
    "agentTeams": true
  }
}
```

**Khởi động lại Claude Code**

Sau khi thêm cấu hình, **thoát hoàn toàn và khởi động lại Claude Code**, và tính năng sẽ có hiệu lực.

**Cấu hình thủ công (nếu phương pháp tự động không hoạt động)**:

Bạn có thể chỉnh sửa thủ công `~/.claude/settings.json` và thêm hoặc sửa đổi:

```json
{
  "experimental": {
    "agentTeams": true
  }
}
```

**Cách xác minh đã được kích hoạt**

Sau khi khởi động lại Claude Code, thử một cuộc hội thoại như thế này:

```
Bạn: Bạn có thể giúp tôi tạo một Agent Team không?

Claude: Có! Tôi có thể giúp bạn tạo một Agent Team để hợp tác trên một nhiệm vụ...
```

Nếu Claude hiểu và phản hồi yêu cầu tạo đội, tính năng đã được kích hoạt thành công.

### Cấu hình chế độ trực quan (tùy chọn)

Nếu bạn muốn xem công việc của các thành viên đội trong thời gian thực, bạn có thể cấu hình **chế độ hiển thị chia ngăn**.

**Để Claude Code cấu hình cho bạn**:

Nhập trực tiếp vào Claude Code:

```
Help me enable split-pane display mode for Agent Teams in settings.json, using tmux
```

Hoặc:

```
Configure agent-teams to use split-panes mode
```

**Cài đặt tmux (nếu bạn chưa có)**:

Nếu `tmux` chưa được cài đặt, bạn có thể yêu cầu Claude Code cài đặt:

```
Help me install tmux
```

Claude Code sẽ tự động chạy lệnh cài đặt phù hợp dựa trên hệ điều hành của bạn, dù là macOS hay Linux.

**Kết quả sau khi cấu hình trông như thế nào**:

Sau khi cấu hình, các thành viên đội sẽ làm việc trong các ngăn tmux khác nhau, và bạn sẽ có thể thấy tất cả đầu ra của họ cùng lúc, giống như một "tường giám sát".

```
┌─────────────────┬─────────────────┬─────────────────┐
│  Đồng đội 1     │  Đồng đội 2     │  Đồng đội 3     │
│  Đang phân tích │  Đang xây dựng  │  Đang viết      │
│  mã nguồn       │  API            │  kiểm thử       │
│  ...            │  ...            │  ...            │
│                 │                 │                 │
└─────────────────┴─────────────────┴─────────────────┘
```

**Cấu hình thủ công (nếu phương pháp tự động không hoạt động)**:

Bạn có thể chỉnh sửa thủ công `~/.claude/settings.json`:

```json
{
  "experimental": {
    "agentTeams": true
  },
  "agent-teams": {
    "displayMode": "split-panes",
    "terminalMultiplexer": "tmux"
  }
}
```

---

### Ví dụ thực hành: xây dựng trò chơi RPG phong cách Pokemon với Agent Teams

Chúng ta hãy trải nghiệm sức mạnh của Agent Teams thông qua một dự án hoàn chỉnh. Ví dụ này sẽ cho thấy cách nhiều thành viên đội AI có thể hợp tác để xây dựng một trò chơi RPG từ đầu, bao gồm hệ thống chiến đấu, tính năng hội thoại và yếu tố khám phá.

**Yêu cầu dự án**:

Xây dựng một RPG web phong cách Pokemon với các tính năng sau:

- **Hệ thống nhân vật**: người chơi có thể tạo nhân vật với cấp độ, HP, tấn công, phòng thủ và các chỉ số khác
- **Hệ thống chiến đấu**: chiến đấu theo lượt với các tùy chọn tấn công, kỹ năng, vật phẩm và bỏ chạy
- **Hệ thống quái vật**: nhiều quái vật hoang dã với các thuộc tính và kỹ năng khác nhau
- **Hệ thống hội thoại**: trò chuyện với NPC và nhiệm vụ phụ
- **Khám phá bản đồ**: bản đồ 2D đơn giản nơi người chơi có thể di chuyển giữa các cảnh
- **Hệ thống lưu**: lưu tiến trình trò chơi, bao gồm cấp độ, vị trí, nhiệm vụ đã hoàn thành và hơn thế nữa
- **Hiệu ứng âm thanh và hình động**: hiệu ứng hình ảnh và âm thanh cho tấn công, sát thương và lên cấp

**Nhập vào Claude Code**:

```
I want to build a Pokemon-style web RPG game.

Create a team to collaborate on development:

Team member responsibilities:
- Teammate A (Game Architect): design the overall architecture, define the game state machine, and plan the data structures
- Teammate B (Battle System): implement turn-based combat logic, the skill system, and damage calculation
- Teammate C (Dialogue System): implement NPC dialogue, the quest system, and story scripts
- Teammate D (Map Rendering): use Canvas to implement 2D map rendering, character movement, and scene switching
- Teammate E (UI & Audio): design the game interface, battle UI, and sound playback

Technical requirements:
- Use React + TypeScript + Vite
- Use Tailwind CSS for styling
- Use Framer Motion for animation
- Use Zustand for state management
- Turn-based battle system
- Save data with localStorage
- Use the Web Audio API for sound

Use Sonnet for each member, and Opus for the Team Lead.

First ask the architect to design the overall solution. After the data structures are defined, let the other members develop in parallel.
```

**Cách Claude sẽ thực thi**:

**Giai đoạn 1: thiết kế kiến trúc**

Trưởng nhóm sẽ trước tiên yêu cầu Đồng đội A, kiến trúc sư trò chơi, thiết kế cấu trúc tổng thể:

```
Đồng đội A đang thiết kế kiến trúc trò chơi...

Stack công nghệ: React 18 + TypeScript + Vite + Tailwind CSS + Framer Motion + Zustand

Khởi tạo dự án:
npm create vite@latest pokemon-rpg -- --template react-ts
npm install zustand framer-motion
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

Cấu trúc file:
src/
├── App.tsx                 # Component chính của ứng dụng
├── main.tsx                # File đầu vào
├── types/
│   ├── player.ts           # Định nghĩa kiểu người chơi
│   ├── monster.ts          # Định nghĩa kiểu quái vật
│   ├── skill.ts            # Định nghĩa kiểu kỹ năng
│   └── game.ts             # Kiểu trạng thái trò chơi
├── stores/
│   └── gameStore.ts        # Quản lý trạng thái Zustand
├── components/
│   ├── map/                # Component liên quan đến bản đồ
│   │   ├── MapCanvas.tsx   # Canvas bản đồ
│   │   ├── PlayerSprite.tsx # Sprite người chơi
│   │   └── NPCSprite.tsx   # Sprite NPC
│   ├── battle/             # Component liên quan đến chiến đấu
│   │   ├── BattleScreen.tsx    # Màn hình chiến đấu
│   │   ├── BattleMenu.tsx      # Menu chiến đấu
│   │   ├── HPBar.tsx           # Component thanh HP
│   │   └── BattleLog.tsx       # Nhật ký chiến đấu
│   ├── dialog/             # Component liên quan đến hội thoại
│   │   ├── DialogBox.tsx   # Hộp hội thoại
│   │   └── Choices.tsx     # Component lựa chọn
│   └── ui/                 # Component UI dùng chung
│       ├── Button.tsx
│       ├── ProgressBar.tsx
│       └── StatCard.tsx
├── systems/
│   ├── BattleSystem.ts     # Logic hệ thống chiến đấu
│   ├── DialogSystem.ts     # Logic hệ thống hội thoại
│   ├── QuestSystem.ts      # Logic hệ thống nhiệm vụ
│   └── MapSystem.ts        # Logic hệ thống bản đồ
├── hooks/
│   ├── useBattle.ts        # Hook chiến đấu
│   ├── useDialog.ts        # Hook hội thoại
│   └── useAudio.ts         # Hook âm thanh
├── data/
│   ├── monsters.ts         # Dữ liệu quái vật
│   ├── skills.ts           # Dữ liệu kỹ năng
│   ├── dialogues.ts        # Kịch bản hội thoại
│   └── maps.ts             # Dữ liệu bản đồ
└── utils/
    ├── audio.ts            # Tiện ích âm thanh
    └── storage.ts          # Tiện ích lưu trữ

Thiết kế cấu trúc dữ liệu cốt lõi:

// types/player.ts - Kiểu người chơi
interface Player {
  id: string;
  name: string;
  level: number;
  exp: number;
  maxExp: number;
  hp: number;
  maxHp: number;
  attack: number;
  defense: number;
  skills: Skill[];
  position: { x: number; y: number };
  direction: 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';
  gold: number;
  items: string[];
}

// types/skill.ts - Kiểu kỹ năng
  id: string,
  name: string,
  type: 'attack' | 'heal' | 'buff' | 'special',
  power: number,
  accuracy: number,
  pp: number,
  maxPp: number,
  effect?: string
}

// Trạng thái trò chơi
{
  screen: 'map' | 'battle' | 'dialog' | 'menu',
  player: Player,
  currentMap: string,
  position: {x: number, y: number},
  inBattle: boolean,
  dialogQueue: Array<Dialog>,
  gameData: {
    completedQuests: string[],
    items: string[],
    visitedMaps: string[]
  }
}

Thiết kế hệ thống chiến đấu:
- Theo lượt, với người chơi hành động trước
- Mỗi lượt người chơi có thể chọn: tấn công, kỹ năng, vật phẩm hoặc bỏ chạy
- Kỹ năng có giới hạn PP và phải được khôi phục khi cạn kiệt
- Công thức sát thương: (tấn công người tấn công / phòng thủ người phòng thủ) × sức mạnh kỹ năng × hệ số ngẫu nhiên (0.85~1.0)

Thiết kế hệ thống hội thoại:
- Hiệu ứng máy đánh chữ cho hiển thị văn bản
- Hỗ trợ các tùy chọn phân nhánh
- Hỗ trợ kích hoạt có điều kiện, như sau khi hoàn thành nhiệm vụ
- NPC có hướng nhìn, và hội thoại tự động kích hoạt khi người chơi đến gần
```

**Giai đoạn 2: phát triển song song**

Sau khi kiến trúc được xác nhận, Trưởng nhóm tạo danh sách nhiệm vụ và các thành viên khác bắt đầu làm việc song song:

```
Danh sách nhiệm vụ:
├── [Đồng đội B] Triển khai logic cốt lõi hệ thống chiến đấu (đang tiến hành...)
├── [Đồng đội C] Triển khai hệ thống hội thoại và nhiệm vụ (đang tiến hành...)
├── [Đồng đội D] Triển khai render bản đồ 2D (đang tiến hành...)
└── [Đồng đội E] Thiết kế UI và âm thanh (đang tiến hành...)
```

<details>
<summary>📁 Đồng đội B: mã cốt lõi hệ thống chiến đấu</summary>

```javascript
// battle.js - Hệ thống chiến đấu
class BattleSystem {
  constructor(player, monster) {
    this.player = player;
    this.monster = monster;
    this.turn = 'player';
    this.log = [];
    this.state = 'active'; // active, victory, defeat, flee
  }

  // Người chơi tấn công
  playerAttack(skill) {
    if (this.turn !== 'player') return;

    const damage = this.calculateDamage(this.player, this.monster, skill);
    this.monster.hp = Math.max(0, this.monster.hp - damage);

    this.log.push(`${this.player.name} đã sử dụng ${skill.name}!`);
    this.log.push(`Đã gây ${damage} sát thương!`);

    // Hiệu ứng kỹ năng
    if (skill.effect) {
      this.applyEffect(this.player, this.monster, skill.effect);
    }

    // Kiểm tra xem chiến đấu đã kết thúc chưa
    if (this.monster.hp <= 0) {
      this.state = 'victory';
      this.log.push(`${this.monster.name} đã gục ngã!`);
      this.giveExp();
    } else {
      this.turn = 'monster';
      setTimeout(() => this.monsterAttack(), 1000);
    }
  }

  // Quái vật tấn công
  monsterAttack() {
    if (this.state !== 'active') return;

    // Chọn kỹ năng ngẫu nhiên
    const skill = this.monster.skills[Math.floor(Math.random() * this.monster.skills.length)];
    const damage = this.calculateDamage(this.monster, this.player, skill);

    this.player.hp = Math.max(0, this.player.hp - damage);

    this.log.push(`${this.monster.name} đã sử dụng ${skill.name}!`);
    this.log.push(`Đã gây ${damage} sát thương!`);

    if (this.player.hp <= 0) {
      this.state = 'defeat';
      this.log.push(`${this.player.name} đã ngã...`);
    } else {
      this.turn = 'player';
    }
  }

  // Tính toán sát thương
  calculateDamage(attacker, defender, skill) {
    const levelFactor = (2 * attacker.level / 5 + 2);
    const attackDefense = attacker.attack / defender.defense;
    const baseDamage = levelFactor * attackDefense * skill.power + 2;
    const randomFactor = 0.85 + Math.random() * 0.15;

    // Bonus lợi thế hệ (đơn giản hóa)
    let typeBonus = 1;
    // if (skill.type > defender.type) typeBonus = 1.5;

    return Math.floor(baseDamage * randomFactor * typeBonus);
  }

  // Áp dụng hiệu ứng kỹ năng
  applyEffect(user, target, effect) {
    switch(effect) {
      case 'burn':
        this.log.push(`${target.name} đã bị bỏng!`);
        break;
      case 'heal':
        const healAmount = Math.floor(user.maxHp * 0.3);
        user.hp = Math.min(user.maxHp, user.hp + healAmount);
        this.log.push(`${user.name} đã hồi phục ${healAmount} HP!`);
        break;
      case 'buff':
        user.attack = Math.floor(user.attack * 1.2);
        this.log.push(`Tấn công của ${user.name} đã tăng!`);
        break;
    }
  }

  // Nhận kinh nghiệm
  giveExp() {
    const baseExp = this.monster.level * 50;
    const expGain = Math.floor(baseExp * (1 + this.player.level / 10));

    this.player.exp += expGain;
    this.log.push(`${this.player.name} đã nhận ${expGain} EXP!`);

    // Kiểm tra lên cấp
    while (this.player.exp >= this.player.maxExp) {
      this.levelUp();
    }
  }

  // Lên cấp
  levelUp() {
    this.player.level++;
    this.player.exp -= this.player.maxExp;
    this.player.maxExp = Math.floor(this.player.maxExp * 1.5);

    // Tăng chỉ số
    const hpGain = 10 + Math.floor(Math.random() * 5);
    const atkGain = 3 + Math.floor(Math.random() * 2);
    const defGain = 2 + Math.floor(Math.random() * 2);

    this.player.maxHp += hpGain;
    this.player.hp = this.player.maxHp;
    this.player.attack += atkGain;
    this.player.defense += defGain;

    this.log.push(`${this.player.name} đã lên cấp ${this.player.level}!`);
    this.log.push(`HP +${hpGain}, ATK +${atkGain}, DEF +${defGain}`);
  }

  // Bỏ chạy
  flee() {
    if (Math.random() < 0.7) {
      this.state = 'flee';
      this.log.push('Bạn đã bỏ chạy thành công!');
      return true;
    } else {
      this.log.push('Không thể bỏ chạy!');
      this.turn = 'monster';
      setTimeout(() => this.monsterAttack(), 1000);
      return false;
    }
  }
}

// monster.js - Dữ liệu quái vật
const MONSTER_DATA = [
  {
    id: 'slime',
    name: 'Slime',
    baseHp: 30,
    baseAtk: 8,
    baseDef: 5,
    skills: [
      {id: 'tackle', name: 'Tackle', type: 'attack', power: 40, accuracy: 100, pp: 35}
    ],
    expGain: 20
  },
  {
    id: 'goblin',
    name: 'Goblin',
    baseHp: 45,
    baseAtk: 12,
    baseDef: 8,
    skills: [
      {id: 'tackle', name: 'Tackle', type: 'attack', power: 40, accuracy: 100, pp: 35},
      {id: 'scratch', name: 'Scratch', type: 'attack', power: 55, accuracy: 100, pp: 25}
    ],
    expGain: 35
  },
  {
    id: 'dragon',
    name: 'Young Dragon',
    baseHp: 80,
    baseAtk: 20,
    baseDef: 15,
    skills: [
      {id: 'scratch', name: 'Scratch', type: 'attack', power: 55, accuracy: 100, pp: 25},
      {id: 'ember', name: 'Ember', type: 'attack', power: 70, accuracy: 90, pp: 15},
      {id: 'growl', name: 'Growl', type: 'buff', power: 0, accuracy: 100, pp: 20}
    ],
    expGain: 80
  }
];
```

</details>

<details>
<summary>📁 Đồng đội C: mã hệ thống hội thoại và nhiệm vụ</summary>

```javascript
// dialog.js - Hệ thống hội thoại
class DialogSystem {
  constructor() {
    this.dialogQueue = [];
    this.currentDialog = null;
    this.isShowing = false;
    this.onComplete = null;
  }

  // Hiển thị hội thoại
  showDialog(dialog, onComplete) {
    this.dialogQueue = Array.isArray(dialog) ? dialog : [dialog];
    this.onComplete = onComplete;
    this.isShowing = true;
    this.showNext();
  }

  // Hiển thị hội thoại tiếp theo
  showNext() {
    if (this.dialogQueue.length === 0) {
      this.isShowing = false;
      if (this.onComplete) this.onComplete();
      return;
    }

    this.currentDialog = this.dialogQueue.shift();

    // Xử lý các loại hội thoại đặc biệt
    if (typeof this.currentDialog === 'function') {
      this.currentDialog();
      this.showNext();
      return;
    }

    this.renderDialog();
  }

  // Render hộp hội thoại
  renderDialog() {
    const dialogBox = document.getElementById('dialogBox');
    const speakerEl = document.getElementById('dialogSpeaker');
    const textEl = document.getElementById('dialogText');

    if (this.currentDialog.speaker) {
      speakerEl.textContent = this.currentDialog.speaker;
      speakerEl.style.display = 'block';
    } else {
      speakerEl.style.display = 'none';
    }

    // Hiệu ứng máy đánh chữ
    textEl.textContent = '';
    let i = 0;
    const text = this.currentDialog.text;
    const speed = this.currentDialog.speed || 30;

    const typeWriter = setInterval(() => {
      if (i < text.length) {
        textEl.textContent += text.charAt(i);
        i++;
      } else {
        clearInterval(typeWriter);
      }
    }, speed);

    // Hiển thị lựa chọn, nếu có
    this.renderChoices();
  }

  // Render lựa chọn
  renderChoices() {
    if (!this.currentDialog.choices) return;

    const choicesEl = document.getElementById('dialogChoices');
    choicesEl.innerHTML = '';
    choicesEl.style.display = 'block';

    this.currentDialog.choices.forEach(choice => {
      const btn = document.createElement('button');
      btn.textContent = choice.text;
      btn.onclick = () => {
        if (choice.condition === undefined || choice.condition()) {
          this.dialogQueue = [];
          this.showDialog(choice.dialog, this.onComplete);
        }
      };
      choicesEl.appendChild(btn);
    });
  }

  // Tiếp theo
  next() {
    if (this.currentDialog && this.currentDialog.choices) return; // phải chọn khi có tùy chọn
    this.showNext();
  }
}

// Hệ thống nhiệm vụ
class QuestSystem {
  constructor() {
    this.quests = {};
    this.activeQuests = [];
    this.completedQuests = [];
  }

  // Chấp nhận nhiệm vụ
  acceptQuest(questId) {
    if (this.completedQuests.includes(questId)) return false;
    if (this.activeQuests.includes(questId)) return false;

    this.activeQuests.push(questId);
    return true;
  }

  // Cập nhật tiến độ nhiệm vụ
  updateProgress(type, target) {
    this.activeQuests.forEach(questId => {
      const quest = this.quests[questId];
      if (!quest) return;

      quest.objectives.forEach(obj => {
        if (obj.type === type && obj.target === target && !obj.completed) {
          obj.current = (obj.current || 0) + 1;
          if (obj.current >= obj.required) {
            obj.completed = true;
          }
        }
      });

      this.checkCompletion(questId);
    });
  }

  // Kiểm tra hoàn thành nhiệm vụ
  checkCompletion(questId) {
    const quest = this.quests[questId];
    if (!quest) return;

    const allComplete = quest.objectives.every(obj => obj.completed);
    if (allComplete) {
      this.completeQuest(questId);
    }
  }

  // Hoàn thành nhiệm vụ
  completeQuest(questId) {
    const index = this.activeQuests.indexOf(questId);
    if (index > -1) {
      this.activeQuests.splice(index, 1);
      this.completedQuests.push(questId);

      // Trao thưởng
      const quest = this.quests[questId];
      this.giveRewards(quest.rewards);
    }
  }

  // Trao thưởng
  giveRewards(rewards) {
    if (rewards.exp) player.gainExp(rewards.exp);
    if (rewards.gold) player.gold += rewards.gold;
    if (rewards.items) rewards.items.forEach(item => player.addItem(item));
  }
}

// dialogues.js - Ví dụ kịch bản hội thoại
const DIALOGUES = {
  villageChief: {
    firstMeeting: [
      {speaker: 'Trưởng làng', text: 'Ồ, nhà thám hiểm... bạn cuối cùng cũng đến rồi.'},
      {speaker: 'Trưởng làng', text: 'Gần đây, nhiều quái vật hoang dã đã xuất hiện gần ngôi làng của chúng tôi, và mọi người đều sợ hãi.'},
      {speaker: 'Trưởng làng', text: 'Nếu bạn có thể giúp đuổi chúng đi, tôi sẽ biết ơn sâu sắc!'},
      {
        choices: [
          {text: 'Được, tôi nhận nhiệm vụ này', dialog: () => {
            quests.acceptQuest('defeatMonsters');
            return [
              {speaker: 'Trưởng làng', text: 'Tuyệt vời! Hãy đánh bại 3 slime ở phía bắc.'},
              {speaker: 'Hệ thống', text: 'Nhiệm vụ [Đuổi Slime] đã được nhận!'}
            ];
          }},
          {text: 'Tôi hơi bận lúc này', dialog: [
            {speaker: 'Trưởng làng', text: 'Được rồi. Hãy quay lại khi bạn sẵn sàng.'}
          ]}
        ]
      }
    ],
    afterQuest: [
      {speaker: 'Trưởng làng', text: 'Bạn thực sự đã làm được! Cảm ơn bạn rất nhiều!'},
      {speaker: 'Hệ thống', text: 'Nhiệm vụ [Đuổi Slime] hoàn thành! Bạn nhận được 100 EXP!'},
      {speaker: 'Trưởng làng', text: 'Hãy lấy cái này. Đây là một chút lòng biết ơn của tôi.'}
    ]
  },

  shopkeeper: [
    {speaker: 'Người bán hàng', text: 'Chào mừng! Bạn đang tìm gì?'},
    {
      choices: [
        {text: 'Xem hàng hóa', dialog: () => {
          game.openShop();
          return [{speaker: 'Người bán hàng', text: 'Hãy lấy bất cứ gì bạn thích!'}];
        }},
        {text: 'Rời đi', dialog: [{speaker: 'Người bán hàng', text: 'Hẹn gặp lại lần sau!'}]}
      ]
    }
  ]
};
```

</details>

<details>
<summary>📁 Đồng đội D: mã hệ thống render bản đồ 2D</summary>

```javascript
// map.js - Hệ thống render bản đồ
class MapRenderer {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.tileSize = 32;
    this.currentMap = null;
    this.player = null;
    this.npcs = [];
    this.camera = {x: 0, y: 0};
  }

  // Tải bản đồ
  loadMap(mapData) {
    this.currentMap = mapData;
    this.npcs = mapData.npcs || [];
    this.updateCamera();
  }

  // Render bản đồ
  render() {
    if (!this.currentMap) return;

    // Xóa canvas
    this.ctx.fillStyle = '#000';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Lưu ngữ cảnh
    this.ctx.save();

    // Áp dụng offset camera
    this.ctx.translate(-this.camera.x, -this.camera.y);

    // Render các lớp bản đồ
    this.renderLayers();

    // Render NPC
    this.renderNPCs();

    // Render người chơi
    this.renderPlayer();

    // Khôi phục ngữ cảnh
    this.ctx.restore();
  }

  // Render các lớp bản đồ
  renderLayers() {
    const map = this.currentMap;

    for (let layer = 0; layer < map.layers.length; layer++) {
      const data = map.layers[layer].data;

      for (let y = 0; y < map.height; y++) {
        for (let x = 0; x < map.width; x++) {
          const tileId = data[y * map.width + x];
          if (tileId === 0) continue;

          const tileX = x * this.tileSize;
          const tileY = y * this.tileSize;

          this.renderTile(tileX, tileY, tileId);
        }
      }
    }
  }

  // Render một tile đơn lẻ
  renderTile(x, y, tileId) {
    // Vẽ các tile khác nhau dựa trên ID tile
    const tileType = this.getTileType(tileId);

    switch(tileType) {
      case 'grass':
        this.ctx.fillStyle = '#4a8f4a';
        this.ctx.fillRect(x, y, this.tileSize, this.tileSize);
        // Kết cấu cỏ
        this.ctx.fillStyle = '#3d7f3d';
        for (let i = 0; i < 3; i++) {
          const px = x + Math.random() * this.tileSize;
          const py = y + Math.random() * this.tileSize;
          this.ctx.fillRect(px, py, 2, 2);
        }
        break;

      case 'water':
        this.ctx.fillStyle = '#4a90d9';
        this.ctx.fillRect(x, y, this.tileSize, this.tileSize);
        // Hiệu ứng sóng
        const wave = Math.sin(Date.now() / 500 + x / 20) * 2;
        this.ctx.fillStyle = '#5aa0e9';
        this.ctx.fillRect(x, y + 10 + wave, this.tileSize, 2);
        break;

      case 'wall':
        this.ctx.fillStyle = '#8b7355';
        this.ctx.fillRect(x, y, this.tileSize, this.tileSize);
        this.ctx.fillStyle = '#7a6248';
        this.ctx.fillRect(x + 2, y + 2, this.tileSize - 4, this.tileSize - 4);
        break;

      case 'path':
        this.ctx.fillStyle = '#c4a77d';
        this.ctx.fillRect(x, y, this.tileSize, this.tileSize);
        break;

      case 'house':
        this.ctx.fillStyle = '#a0522d';
        this.ctx.fillRect(x, y, this.tileSize, this.tileSize);
        // Mái nhà
        this.ctx.fillStyle = '#8b4513';
        this.ctx.beginPath();
        this.ctx.moveTo(x, y);
        this.ctx.lineTo(x + this.tileSize / 2, y - 10);
        this.ctx.lineTo(x + this.tileSize, y);
        this.ctx.fill();
        break;
    }
  }

  // Lấy loại tile
  getTileType(tileId) {
    const types = {
      1: 'grass', 2: 'water', 3: 'wall', 4: 'path', 5: 'house'
    };
    return types[tileId] || 'grass';
  }

  // Render NPC
  renderNPCs() {
    this.npcs.forEach(npc => {
      const x = npc.x * this.tileSize;
      const y = npc.y * this.tileSize;

      // Vẽ NPC
      this.ctx.fillStyle = npc.color || '#ff6b6b';
      this.ctx.beginPath();
      this.ctx.arc(
        x + this.tileSize / 2,
        y + this.tileSize / 2,
        this.tileSize / 3,
        0,
        Math.PI * 2
      );
      this.ctx.fill();

      // Vẽ tên
      this.ctx.fillStyle = '#fff';
      this.ctx.font = '10px Arial';
      this.ctx.textAlign = 'center';
      this.ctx.fillText(npc.name, x + this.tileSize / 2, y - 5);
    });
  }

  // Render người chơi
  renderPlayer() {
    if (!this.player) return;

    const x = this.player.x * this.tileSize;
    const y = this.player.y * this.tileSize;

    // Thân người chơi
    this.ctx.fillStyle = '#4ecdc4';
    this.ctx.beginPath();
    this.ctx.arc(
      x + this.tileSize / 2,
      y + this.tileSize / 2,
      this.tileSize / 3,
      0,
      Math.PI * 2
    );
    this.ctx.fill();

    // Chỉ báo hướng người chơi
    const directions = {UP: [0, -8], DOWN: [0, 8], LEFT: [-8, 0], RIGHT: [8, 0]};
    const [dx, dy] = directions[this.player.direction] || [0, 0];

    this.ctx.fillStyle = '#2d3436';
    this.ctx.beginPath();
    this.ctx.arc(
      x + this.tileSize / 2 + dx,
      y + this.tileSize / 2 + dy,
      4,
      0,
      Math.PI * 2
    );
    this.ctx.fill();
  }

  // Cập nhật vị trí camera
  updateCamera() {
    if (!this.player) return;

    // Camera theo dõi người chơi và giữ họ ở trung tâm
    const targetX = this.player.x * this.tileSize - this.canvas.width / 2;
    const targetY = this.player.y * this.tileSize - this.canvas.height / 2;

    // Di chuyển mượt mà
    this.camera.x += (targetX - this.camera.x) * 0.1;
    this.camera.y += (targetY - this.camera.y) * 0.1;

    // Ngăn camera vượt ra ngoài ranh giới bản đồ
    const maxX = this.currentMap.width * this.tileSize - this.canvas.width;
    const maxY = this.currentMap.height * this.tileSize - this.canvas.height;
    this.camera.x = Math.max(0, Math.min(this.camera.x, maxX));
    this.camera.y = Math.max(0, Math.min(this.camera.y, maxY));
  }

  // Kiểm tra va chạm
  checkCollision(x, y) {
    // Kiểm tra ranh giới bản đồ
    if (x < 0 || x >= this.currentMap.width || y < 0 || y >= this.currentMap.height) {
      return true;
    }

    // Kiểm tra va chạm tile
    const tileId = this.currentMap.layers[0].data[y * this.currentMap.width + x];
    const solidTiles = [3, 5]; // tường và nhà là chướng ngại vật

    if (solidTiles.includes(tileId)) {
      return true;
    }

    // Kiểm tra va chạm NPC
    for (const npc of this.npcs) {
      if (npc.x === x && npc.y === y) {
        // Kích hoạt hội thoại NPC
        this.triggerNPC(npc);
        return true;
      }
    }

    return false;
  }

  // Kích hoạt hội thoại NPC
  triggerNPC(npc) {
    if (npc.dialogue) {
      game.dialogSystem.showDialog(npc.dialogue);
    }
  }
}

// Dữ liệu bản đồ ví dụ
const VILLAGE_MAP = {
  name: 'Làng khởi đầu',
  width: 20,
  height: 15,
  layers: [
    {
      name: 'ground',
      data: [
        // Dữ liệu bản đồ (đơn giản hóa)
        1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
        1,4,4,4,1,1,5,5,5,1,1,4,4,4,4,1,1,1,1,1,
        1,4,1,4,1,1,5,5,5,1,1,4,1,1,4,1,1,1,1,1,
        1,4,4,4,1,1,1,1,1,1,1,4,4,4,4,1,2,2,1,1,
        1,1,1,1,1,1,4,4,4,1,1,1,1,1,1,1,2,2,1,1,
        1,4,4,4,1,1,4,4,4,1,1,1,1,1,1,1,2,2,1,1,
        1,4,1,4,1,1,1,1,1,1,1,4,4,4,1,1,1,1,1,1,
        1,4,4,4,1,1,1,1,1,1,1,4,1,1,4,1,1,1,1,1,
        // ... thêm dữ liệu bản đồ
      ]
    }
  ],
  npcs: [
    {
      id: 'village_chief',
      name: 'Trưởng làng',
      x: 5,
      y: 5,
      color: '#ffd93d',
      dialogue: DIALOGUES.villageChief.firstMeeting,
      direction: 'DOWN'
    },
    {
      id: 'shopkeeper',
      name: 'Người bán hàng',
      x: 15,
      y: 8,
      color: '#6bcf7f',
      dialogue: DIALOGUES.shopkeeper,
      direction: 'DOWN'
    }
  ],
  exits: [
    {x: 10, y: 0, to: 'forest_map', spawnX: 5, spawnY: 14}
  ]
};
```

</details>

<details>
<summary>📁 Đồng đội E: mã UI chiến đấu</summary>

```html
<!-- HTML màn hình chiến đấu -->
<div id="battleScreen" class="screen hidden">
  <!-- Khu vực kẻ thù -->
  <div class="enemy-area">
    <div class="monster-sprite">
      <canvas id="monsterSprite" width="128" height="128"></canvas>
    </div>
    <div class="monster-info">
      <div class="name" id="enemyName">Slime</div>
      <div class="level">Lv. <span id="enemyLevel">3</span></div>
      <div class="hp-bar">
        <div class="hp-fill" id="enemyHpBar" style="width: 100%"></div>
      </div>
      <div class="hp-text">
        <span id="enemyHp">30</span> / <span id="enemyMaxHp">30</span>
      </div>
    </div>
  </div>

  <!-- Khu vực người chơi -->
  <div class="player-area">
    <div class="player-info">
      <div class="name" id="playerName">Anh hùng</div>
      <div class="level">Lv. <span id="playerLevel">5</span></div>
      <div class="hp-bar">
        <div class="hp-fill" id="playerHpBar" style="width: 80%"></div>
      </div>
      <div class="hp-text">
        <span id="playerHp">80</span> / <span id="playerMaxHp">100</span>
      </div>
      <div class="exp-bar">
        <div class="exp-fill" id="expBar" style="width: 60%"></div>
      </div>
    </div>
    <div class="player-sprite">
      <canvas id="playerSprite" width="128" height="128"></canvas>
    </div>
  </div>

  <!-- Menu chiến đấu -->
  <div class="battle-menu" id="battleMenu">
    <div class="menu-row">
      <button class="menu-btn" data-action="attack">Tấn công</button>
      <button class="menu-btn" data-action="skills">Kỹ năng</button>
      <button class="menu-btn" data-action="items">Vật phẩm</button>
      <button class="menu-btn" data-action="flee">Bỏ chạy</button>
    </div>
  </div>

  <!-- Menu phụ kỹ năng -->
  <div class="submenu hidden" id="skillsMenu">
    <div class="submenu-title">Chọn kỹ năng</div>
    <div class="submenu-list" id="skillsList"></div>
    <button class="back-btn" onclick="hideSubmenu()">Quay lại</button>
  </div>

  <!-- Nhật ký chiến đấu -->
  <div class="battle-log">
    <div id="battleLog"></div>
  </div>
</div>
```

```css
/* battle.css - Kiểu dáng màn hình chiến đấu */
.battle-screen {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(180deg, #87ceeb 0%, #e0f7fa 50%, #4a5568 50%, #2d3748 100%);
  display: flex;
  flex-direction: column;
}

.enemy-area {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px;
}

.monster-sprite canvas {
  image-rendering: pixelated;
  filter: drop-shadow(0 4px 8px rgba(0,0,0,0.3));
  animation: float 2s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.monster-info {
  margin-left: 40px;
  text-align: center;
}

.monster-info .name {
  font-size: 24px;
  font-weight: bold;
  color: #2d3748;
}

.monster-info .level {
  font-size: 14px;
  color: #718096;
  margin: 8px 0;
}

.hp-bar {
  width: 200px;
  height: 20px;
  background: #e2e8f0;
  border-radius: 10px;
  overflow: hidden;
  border: 2px solid #4a5568;
}

.hp-fill {
  height: 100%;
  background: linear-gradient(90deg, #48bb78, #38a169);
  transition: width 0.3s ease;
}

.hp-text {
  margin-top: 8px;
  font-size: 14px;
  color: #4a5568;
}

.player-area {
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding: 40px;
}

.player-info {
  background: rgba(255,255,255,0.9);
  border-radius: 12px;
  padding: 20px;
  border: 3px solid #4a5568;
}

.exp-bar {
  width: 200px;
  height: 8px;
  background: #e2e8f0;
  border-radius: 4px;
  margin-top: 8px;
}

.exp-fill {
  height: 100%;
  background: linear-gradient(90deg, #4299e1, #3182ce);
  border-radius: 4px;
}

.battle-menu {
  background: rgba(255,255,255,0.95);
  border: 3px solid #4a5568;
  border-radius: 12px;
  padding: 20px;
  margin: 0 40px 40px;
}

.menu-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
}

.menu-btn {
  padding: 16px 24px;
  font-size: 18px;
  font-weight: bold;
  background: linear-gradient(180deg, #fff 0%, #e2e8f0 100%);
  border: 2px solid #4a5568;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
}

.menu-btn:hover {
  background: linear-gradient(180deg, #4299e1 0%, #3182ce 100%);
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
}

.battle-log {
  position: absolute;
  bottom: 120px;
  left: 40px;
  right: 40px;
  max-height: 100px;
  overflow-y: auto;
  background: rgba(0,0,0,0.7);
  border-radius: 8px;
  padding: 12px;
}

#battleLog {
  color: #fff;
  font-size: 14px;
  line-height: 1.8;
}

.log-entry {
  margin-bottom: 4px;
  opacity: 0;
  animation: fadeIn 0.3s forwards;
}

@keyframes fadeIn {
  to { opacity: 1; }
}

/* Hoạt ảnh trúng đòn */
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  75% { transform: translateX(5px); }
}

.shake {
  animation: shake 0.3s ease-in-out;
}

/* Hoạt ảnh tấn công */
@keyframes attackRight {
  0% { transform: translateX(0); }
  50% { transform: translateX(30px); }
  100% { transform: translateX(0); }
}

.attack-right {
  animation: attackRight 0.3s ease-in-out;
}
```

</details>

<details>
<summary>📁 Mã hệ thống âm thanh</summary>

```javascript
// audio.js - Hệ thống âm thanh
class AudioManager {
  constructor() {
    this.audioContext = null;
    this.sounds = {};
    this.musicVolume = 0.3;
    this.sfxVolume = 0.5;
    this.currentBgm = null;
  }

  // Khởi tạo ngữ cảnh âm thanh
  init() {
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (this.audioContext.state === 'suspended') {
      this.audioContext.resume();
    }
  }

  // Phát nhạc nền
  playBgm(bgmName) {
    if (this.currentBgm === bgmName) return;

    this.stopBgm();

    // Sử dụng bộ dao động để tạo BGM đơn giản
    this.currentBgm = bgmName;
    this.playGeneratedBgm(bgmName);
  }

  // Tạo nhạc nền đơn giản
  playGeneratedBgm(type) {
    const melodies = {
      battle: [262, 294, 330, 262, 294, 330, 349, 330],
      village: [330, 349, 392, 349, 330, 294, 262, 294],
      victory: [392, 440, 494, 523, 494, 440, 392, 349]
    };

    const melody = melodies[type] || melodies.village;
    let noteIndex = 0;

    const playNote = () => {
      if (this.currentBgm !== type) return;

      const osc = this.audioContext.createOscillator();
      const gain = this.audioContext.createGain();

      osc.connect(gain);
      gain.connect(this.audioContext.destination);

      osc.frequency.value = melody[noteIndex];
      osc.type = 'triangle';

      gain.gain.setValueAtTime(this.musicVolume, this.audioContext.currentTime);
      gain.gain.exponentialRampToValueAtTime(
        0.01,
        this.audioContext.currentTime + 0.4
      );

      osc.start(this.audioContext.currentTime);
      osc.stop(this.audioContext.currentTime + 0.4);

      noteIndex = (noteIndex + 1) % melody.length;
      setTimeout(playNote, 500);
    };

    playNote();
  }

  // Dừng nhạc nền
  stopBgm() {
    this.currentBgm = null;
  }

  // Phát hiệu ứng âm thanh
  playSfx(sfxName) {
    this.init();

    switch(sfxName) {
      case 'attack':
        this.playAttackSound();
        break;
      case 'hit':
        this.playHitSound();
        break;
      case 'victory':
        this.playVictorySound();
        break;
      case 'levelup':
        this.playLevelUpSound();
        break;
      case 'dialog':
        this.playDialogSound();
        break;
    }
  }

  // Hiệu ứng âm thanh tấn công
  playAttackSound() {
    const osc = this.audioContext.createOscillator();
    const gain = this.audioContext.createGain();

    osc.connect(gain);
    gain.connect(this.audioContext.destination);

    osc.frequency.setValueAtTime(200, this.audioContext.currentTime);
    osc.frequency.exponentialRampToValueAtTime(
      100,
      this.audioContext.currentTime + 0.1
    );
    osc.type = 'sawtooth';

    gain.gain.setValueAtTime(this.sfxVolume, this.audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(
      0.01,
      this.audioContext.currentTime + 0.1
    );

    osc.start(this.audioContext.currentTime);
    osc.stop(this.audioContext.currentTime + 0.1);
  }

  // Hiệu ứng âm thanh trúng đòn
  playHitSound() {
    const osc = this.audioContext.createOscillator();
    const gain = this.audioContext.createGain();

    osc.connect(gain);
    gain.connect(this.audioContext.destination);

    osc.frequency.value = 100;
    osc.type = 'square';

    gain.gain.setValueAtTime(this.sfxVolume * 0.8, this.audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(
      0.01,
      this.audioContext.currentTime + 0.2
    );

    osc.start(this.audioContext.currentTime);
    osc.stop(this.audioContext.currentTime + 0.2);
  }

  // Hiệu ứng âm thanh chiến thắng
  playVictorySound() {
    const notes = [523, 659, 784, 1047];
    notes.forEach((freq, i) => {
      setTimeout(() => {
        const osc = this.audioContext.createOscillator();
        const gain = this.audioContext.createGain();

        osc.connect(gain);
        gain.connect(this.audioContext.destination);

        osc.frequency.value = freq;
        osc.type = 'sine';

        gain.gain.setValueAtTime(this.sfxVolume, this.audioContext.currentTime);
        gain.gain.exponentialRampToValueAtTime(
          0.01,
          this.audioContext.currentTime + 0.5
        );

        osc.start(this.audioContext.currentTime);
        osc.stop(this.audioContext.currentTime + 0.5);
      }, i * 150);
    });
  }

  // Hiệu ứng âm thanh lên cấp
  playLevelUpSound() {
    const notes = [392, 523, 659, 784, 1047];
    notes.forEach((freq, i) => {
      setTimeout(() => {
        const osc = this.audioContext.createOscillator();
        const gain = this.audioContext.createGain();

        osc.connect(gain);
        gain.connect(this.audioContext.destination);

        osc.frequency.value = freq;
        osc.type = 'triangle';

        gain.gain.setValueAtTime(this.sfxVolume, this.audioContext.currentTime);
        gain.gain.exponentialRampToValueAtTime(
          0.01,
          this.audioContext.currentTime + 0.3
        );

        osc.start(this.audioContext.currentTime);
        osc.stop(this.audioContext.currentTime + 0.3);
      }, i * 100);
    });
  }

  // Hiệu ứng âm thanh hội thoại
  playDialogSound() {
    const osc = this.audioContext.createOscillator();
    const gain = this.audioContext.createGain();

    osc.connect(gain);
    gain.connect(this.audioContext.destination);

    osc.frequency.value = 800;
    osc.type = 'sine';

    gain.gain.setValueAtTime(this.sfxVolume * 0.3, this.audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(
      0.01,
      this.audioContext.currentTime + 0.05
    );

    osc.start(this.audioContext.currentTime);
    osc.stop(this.audioContext.currentTime + 0.05);
  }
}
```

</details>

**Hội thoại hợp tác giữa các thành viên**:

```
Đồng đội B → Đồng đội C:
"Hệ thống chiến đấu đã xong. Khi người chơi thắng, nó gọi giveExp() để lên cấp.
Hãy kiểm tra hệ thống nhiệm vụ và đảm bảo dữ liệu lên cấp được lưu chính xác."

Đồng đội C → Đồng đội B:
"Đã hiểu. Hệ thống nhiệm vụ lưu trữ dữ liệu trò chơi với localStorage,
bao gồm cấp độ, kinh nghiệm và danh sách nhiệm vụ đã hoàn thành. Tôi sẽ thêm cơ chế tự lưu."

Đồng đội D → Tất cả:
"Hệ thống render bản đồ đã hoàn thành, và dữ liệu hướng nhìn NPC đã được kết nối với hệ thống hội thoại.
Khi người chơi nhìn vào NPC, hội thoại sẽ tự động kích hoạt. Hãy xác nhận logic kích hoạt trong hệ thống hội thoại."

Đồng đội C → Đồng đội D:
"Đã xác nhận. DialogSystem có phương thức showDialog() có thể chấp nhận một mảng hội thoại.
Tôi sẽ đảm bảo tất cả dữ liệu hội thoại NPC tuân theo định dạng đó."

Đồng đội E → Đồng đội B:
"UI chiến đấu đã xong, nhưng tôi cần dữ liệu người chơi và quái vật theo thời gian thực để cập nhật thanh HP.
Hệ thống chiến đấu có cung cấp callback không?"

Đồng đội B → Đồng đội E:
"Có. BattleSystem có callback onUpdate được kích hoạt ở cuối mỗi lượt.
Bạn có thể đăng ký callback đó để cập nhật UI."

Đồng đội E → Đồng đội D:
"Khi chuyển bản đồ, chúng ta cần định vị lại camera.
MapRenderer có cung cấp phương thức updateCamera() không?"

Đồng đội D → Đồng đội E:
"Có. updateCamera() được gọi tự động sau mỗi loadMap().
Bạn cũng có thể gọi thủ công sau khi người chơi di chuyển để cập nhật camera mượt mà."
```

**Giai đoạn 3: tích hợp và kiểm thử**

Sau khi tất cả các thành phần hoàn thành, Trưởng nhóm chịu trách nhiệm tích hợp:

<details>
<summary>📁 Mã bộ điều khiển trò chơi chính</summary>

```javascript
// game.js - Bộ điều khiển trò chơi chính
class Game {
  constructor() {
    this.state = 'map'; // map, battle, dialog, menu
    this.canvas = document.getElementById('gameCanvas');
    this.ctx = this.canvas.getContext('2d');

    // Khởi tạo các hệ thống
    this.player = this.createPlayer();
    this.mapRenderer = new MapRenderer(this.canvas);
    this.battleSystem = null;
    this.dialogSystem = new DialogSystem();
    this.questSystem = new QuestSystem();
    this.audioManager = new AudioManager();

    // Tải bản đồ
    this.currentMapId = 'village';
    this.mapRenderer.loadMap(VILLAGE_MAP);
    this.mapRenderer.player = this.player;

    // Xử lý đầu vào
    this.setupInput();

    // Bắt đầu vòng lặp trò chơi
    this.lastTime = 0;
    this.gameLoop = this.gameLoop.bind(this);
    requestAnimationFrame(this.gameLoop);

    // Tự động tải lưu
    this.loadGame();
  }

  // Tạo người chơi
  createPlayer() {
    return {
      name: 'Anh hùng',
      level: 1,
      exp: 0,
      maxExp: 100,
      hp: 50,
      maxHp: 50,
      attack: 15,
      defense: 10,
      skills: [
        {id: 'tackle', name: 'Tackle', type: 'attack', power: 40, accuracy: 100, pp: 35}
      ],
      x: 10,
      y: 7,
      direction: 'DOWN',
      gold: 100,
      items: ['potion', 'potion', 'antidote']
    };
  }

  // Thiết lập xử lý đầu vào
  setupInput() {
    document.addEventListener('keydown', (e) => {
      if (this.state === 'map') {
        this.handleMapInput(e);
      } else if (this.state === 'dialog') {
        this.handleDialogInput(e);
      } else if (this.state === 'battle') {
        this.handleBattleInput(e);
      }
    });
  }

  // Xử lý đầu vào bản đồ
  handleMapInput(e) {
    if (this.dialogSystem.isShowing) {
      if (e.key === ' ' || e.key === 'Enter') {
        this.dialogSystem.next();
      }
      return;
    }

    let dx = 0, dy = 0;
    switch(e.key) {
      case 'ArrowUp': case 'w': dy = -1; this.player.direction = 'UP'; break;
      case 'ArrowDown': case 's': dy = 1; this.player.direction = 'DOWN'; break;
      case 'ArrowLeft': case 'a': dx = -1; this.player.direction = 'LEFT'; break;
      case 'ArrowRight': case 'd': dx = 1; this.player.direction = 'RIGHT'; break;
      default: return;
    }

    const newX = this.player.x + dx;
    const newY = this.player.y + dy;

    if (!this.mapRenderer.checkCollision(newX, newY)) {
      this.player.x = newX;
      this.player.y = newY;
      this.mapRenderer.updateCamera();

      // Kiểm tra chiến đấu ngẫu nhiên
      if (Math.random() < 0.05) {
        this.startBattle();
      }

      // Lưu trò chơi
      this.saveGame();
    }
  }

  // Xử lý đầu vào hội thoại
  handleDialogInput(e) {
    if (e.key === ' ' || e.key === 'Enter') {
      this.dialogSystem.next();
      if (!this.dialogSystem.isShowing) {
        this.state = 'map';
      }
    }
  }

  // Xử lý đầu vào chiến đấu
  handleBattleInput(e) {
    if (!this.battleSystem) return;
    if (this.battleSystem.turn !== 'player') return;
  }

  // Bắt đầu chiến đấu
  startBattle(monsterData) {
    // Chọn quái vật ngẫu nhiên
    const randomMonster = MONSTER_DATA[Math.floor(Math.random() * MONSTER_DATA.length)];

    // Tạo instance quái vật
    const monster = {
      ...randomMonster,
      level: Math.max(1, this.player.level + Math.floor(Math.random() * 3) - 1),
      hp: randomMonster.baseHp + randomMonster.baseHp * 0.2 * this.player.level,
      maxHp: randomMonster.baseHp + randomMonster.baseHp * 0.2 * this.player.level,
      attack: randomMonster.baseAtk + randomMonster.baseAtk * 0.15 * this.player.level,
      defense: randomMonster.baseDef + randomMonster.baseDef * 0.1 * this.player.level
    };

    this.battleSystem = new BattleSystem(this.player, monster);
    this.state = 'battle';

    // Phát nhạc chiến đấu
    this.audioManager.playBgm('battle');

    // Hiển thị màn hình chiến đấu
    document.getElementById('battleScreen').classList.remove('hidden');
    document.getElementById('mapScreen').classList.add('hidden');

    // Cập nhật UI chiến đấu
    this.updateBattleUI();
  }

  // Cập nhật UI chiến đấu
  updateBattleUI() {
    if (!this.battleSystem) return;

    const player = this.battleSystem.player;
    const monster = this.battleSystem.monster;

    document.getElementById('playerName').textContent = player.name;
    document.getElementById('playerLevel').textContent = player.level;
    document.getElementById('playerHp').textContent = Math.floor(player.hp);
    document.getElementById('playerMaxHp').textContent = player.maxHp;
    document.getElementById('playerHpBar').style.width =
      (player.hp / player.maxHp * 100) + '%';

    document.getElementById('enemyName').textContent = monster.name;
    document.getElementById('enemyLevel').textContent = monster.level;
    document.getElementById('enemyHp').textContent = Math.floor(monster.hp);
    document.getElementById('enemyMaxHp').textContent = Math.floor(monster.maxHp);
    document.getElementById('enemyHpBar').style.width =
      (monster.hp / monster.maxHp * 100) + '%';

    // Cập nhật nhật ký chiến đấu
    const logEl = document.getElementById('battleLog');
    this.battleSystem.log.forEach(log => {
      const entry = document.createElement('div');
      entry.className = 'log-entry';
      entry.textContent = log;
      logEl.appendChild(entry);
    });
    logEl.scrollTop = logEl.scrollHeight;
  }

  // Kết thúc chiến đấu
  endBattle() {
    this.state = 'map';
    this.battleSystem = null;

    // Ẩn màn hình chiến đấu
    document.getElementById('battleScreen').classList.add('hidden');
    document.getElementById('mapScreen').classList.remove('hidden');

    // Phát nhạc bản đồ
    this.audioManager.playBgm('village');

    // Lưu trò chơi
    this.saveGame();
  }

  // Lưu trò chơi
  saveGame() {
    const saveData = {
      player: this.player,
      currentMapId: this.currentMapId,
      completedQuests: this.questSystem.completedQuests,
      timestamp: Date.now()
    };

    localStorage.setItem('rpgSave', JSON.stringify(saveData));
  }

  // Tải trò chơi
  loadGame() {
    const saveData = localStorage.getItem('rpgSave');
    if (saveData) {
      const data = JSON.parse(saveData);
      this.player = {...this.player, ...data.player};
      this.questSystem.completedQuests = data.completedQuests || [];
      this.currentMapId = data.currentMapId || 'village';
    }
  }

  // Vòng lặp trò chơi chính
  gameLoop(timestamp) {
    const deltaTime = timestamp - this.lastTime;
    this.lastTime = timestamp;

    // Xóa canvas
    this.ctx.fillStyle = '#000';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Render theo trạng thái
    if (this.state === 'map') {
      this.mapRenderer.render();
    }

    requestAnimationFrame(this.gameLoop);
  }
}

// Khởi động trò chơi
window.addEventListener('DOMContentLoaded', () => {
  window.game = new Game();
});
```

</details>

**Kết quả cuối cùng**:

Sau khoảng 1 đến 2 giờ, một RPG phong cách Pokemon hoàn chỉnh sẵn sàng!

```
Tóm tắt dự án:
✅ Thiết kế kiến trúc trò chơi - Đồng đội A
✅ Hệ thống chiến đấu theo lượt - Đồng đội B
✅ Hệ thống hội thoại và nhiệm vụ - Đồng đội C
✅ Render bản đồ 2D - Đồng đội D
✅ UI và hiệu ứng âm thanh - Đồng đội E

File dự án:
├── index.html (120 dòng)
├── css/
│   ├── main.css (100 dòng)
│   ├── battle.css (180 dòng)
│   └── dialog.css (80 dòng)
├── js/
│   ├── game.js (250 dòng)
│   ├── state.js (60 dòng)
│   ├── player.js (50 dòng)
│   ├── monster.js (80 dòng)
│   ├── battle.js (220 dòng)
│   ├── dialog.js (180 dòng)
│   ├── map.js (280 dòng)
│   └── audio.js (150 dòng)
└── data/
    ├── monsters.js (100 dòng)
    ├── skills.js (80 dòng)
    └── dialogues.js (120 dòng)

Tổng cộng: khoảng 2050 dòng mã, hoàn thành hợp tác bởi 5 thành viên đội AI!

Tính năng trò chơi:
🎮 Hệ thống chiến đấu theo lượt (tấn công, kỹ năng, vật phẩm, bỏ chạy)
💬 Hệ thống hội thoại NPC (hiệu ứng máy đánh chữ, lựa chọn phân nhánh)
📜 Hệ thống nhiệm vụ (nhận nhiệm vụ, cập nhật tiến độ, phần thưởng hoàn thành)
🗺️ Khám phá bản đồ 2D (chuyển cảnh đa cảnh, tương tác NPC)
💾 Tự động lưu (tiến trình được lưu với localStorage)
🔊 Hiệu ứng âm thanh và BGM (Web Audio API)
📊 Phát triển nhân vật (kinh nghiệm, lên cấp, tăng chỉ số)
```

**Quan sát đội ngũ làm việc**:

Nếu bạn đã cấu hình chế độ chia ngăn tmux, bạn sẽ thấy nhiều cửa sổ terminal làm việc cùng lúc:

```
┌─────────────────┬─────────────────┬─────────────────┐
│  Đồng đội B     │  Đồng đội C     │  Đồng đội D     │
│  Đang triển khai│  Đang viết      │  Đang render    │
│  công thức      │  kịch bản       │  các tile       │
│  sát thương     │  hội thoại      │                 │
│                 │                 │                 │
│  "Đồng đội E,   │  "MapRenderer   │  "Quái vật cần  │
│   thanh HP có   │   sẵn sàng      │  hoạt ảnh tấn   │
│   chiều rộng    │   chưa?"        │   công chưa..." │
│   theo % không?"│                 │                 │
└─────────────────┴─────────────────┴─────────────────┘
```

**Bài học chính**:

Ví dụ thực hành này cho thấy một số ưu điểm cốt lõi của Agent Teams:

1. **Phát triển song song thực sự**: 5 thành viên phát triển các hệ thống trò chơi khác nhau cùng lúc
2. **Quản lý dự án phức tạp**: hơn 2000 dòng mã được chia và tích hợp có cấu trúc
3. **Phân công chuyên môn**: chiến đấu, hội thoại, bản đồ và UI đều có người phụ trách riêng
4. **Phối hợp giao diện**: các thành viên đàm phán giao diện và định dạng dữ liệu thông qua hệ thống nhắn tin
5. **Giao hàng nhanh**: công việc có thể mất nhiều tuần cho một người có thể được đội hoàn thành trong vài giờ

Bạn có thể tự chạy trò chơi này và trải nghiệm cách một đội AI hợp tác xây dựng RPG phong cách Pokemon.

---

### Một prompt đơn lẻ so với Agent Teams: tự kiểm tra

Để giúp bạn cảm nhận sức mạnh của Agent Teams trực tiếp hơn, chúng tôi đã chuẩn bị hai kế hoạch kiểm tra mà bạn có thể tự thử và so sánh.

#### Kế hoạch kiểm tra A: phương pháp một prompt

Đây là phương pháp truyền thống: sử dụng một prompt hoàn chỉnh và yêu cầu AI phát triển trò chơi.

**Nhập vào Claude Code**:

```
Help me build a Pokemon-style web RPG game with the following features:
- Character system (level, HP, attack, defense)
- Turn-based battle system (attack, skills, items, flee)
- NPC dialogue system
- 2D map exploration
- Save system
- Audio system

Use React + TypeScript + Vite + Tailwind CSS.
Please give me complete code that can run directly.
```

**Kết quả dự kiến**:

| Mục | Tình huống dự kiến |
|------|---------|
| **Chất lượng mã** | AI sẽ cố gắng tạo tất cả mã, nhưng do giới hạn ngữ cảnh, nhiều chi tiết sẽ bị bỏ qua hoặc thay thế bằng bình luận |
| **Đầy đủ tính năng** | Các tính năng cốt lõi có thể có mặt, nhưng nhiều tính năng nâng cao sẽ thiếu hoặc đơn giản hóa |
| **Khả năng chạy** | Có thể có lỗi, và bạn có thể cần nhiều vòng gỡ lỗi trước khi chạy được |
| **Thời gian phát triển** | Một cuộc hội thoại có thể mất 30 đến 60 phút, với nhiều vòng qua lại |
| **Khối lượng mã** | Khoảng 500 đến 800 dòng, vì AI có xu hướng nén mã |

**Vấn đề bạn có thể gặp**:

1. **Mã bị cắt**: phản hồi của AI có giới hạn độ dài, nên việc tạo có thể dừng giữa chừng
2. **Tính năng không đầy đủ**: hệ thống hội thoại có thể chỉ là phiên bản cơ bản không có hệ thống nhiệm vụ
3. **Thiếu chi tiết**: hệ thống âm thanh có thể bị để lại dưới dạng bình luận TODO
4. **Khó gỡ lỗi**: nếu mã có vấn đề, bạn phải yêu cầu AI sửa trong cùng cuộc hội thoại, và ngữ cảnh ngày càng lộn xộn

#### Kế hoạch kiểm tra B: phương pháp Agent Teams

Đây là phương pháp được giới thiệu trong bài viết này: để nhiều thành viên đội AI hợp tác phát triển.

**Nhập vào Claude Code** (sau khi kích hoạt Agent Teams):

```
I want to build a Pokemon-style web RPG game.

Create a team to collaborate on development:

Team member responsibilities:
- Teammate A (Game Architect): design the overall architecture, define the game state machine, and plan the data structures
- Teammate B (Battle System): implement turn-based combat logic, the skill system, and damage calculation
- Teammate C (Dialogue System): implement NPC dialogue, the quest system, and story scripts
- Teammate D (Map Rendering): use Canvas to implement 2D map rendering, character movement, and scene transitions
- Teammate E (UI & Audio): design the game interface, battle UI, and sound playback

Technical requirements:
- Use plain HTML/CSS/JavaScript
- Use Canvas to render the game screen
- Turn-based battle system
- Save data with localStorage
- Use the Web Audio API for sound

Use Sonnet for each member, and Opus for the Team Lead.

First ask the architect to design the overall solution. After the data structures are defined, let the other members develop in parallel.
```

**Kết quả dự kiến**:

| Mục | Tình huống dự kiến |
|------|---------|
| **Chất lượng mã** | Mỗi thành viên tập trung vào lĩnh vực riêng, do đó mã chuyên nghiệp và hoàn chỉnh hơn |
| **Đầy đủ tính năng** | Tất cả tính năng được triển khai đầy đủ hơn, bao gồm hệ thống nhiệm vụ và bản đồ đa cảnh |
| **Khả năng chạy** | Các thành viên kiểm tra chéo giao diện, do đó ít vấn đề tích hợp hơn |
| **Thời gian phát triển** | Khoảng 1 đến 2 giờ để hoàn thành tất cả tính năng vì phát triển diễn ra song song |
| **Khối lượng mã** | Khoảng 2000+ dòng, với triển khai hoàn chỉnh thay vì mã nén |

#### Bảng so sánh định lượng

| Tiêu chí | Một Prompt | Agent Teams |
|---------|-------------|-------------|
| **Tổng số dòng mã** | 500-800 dòng | 2000+ dòng |
| **Thời gian phát triển** | 30-60 phút, nhưng tính năng không đầy đủ | 1-2 giờ, với tính năng hoàn chỉnh |
| **Đầy đủ tính năng** | 60-70% | 95%+ |
| **Khả năng bảo trì** | Trung bình, thường là một file lớn | Cao, với thiết kế module |
| **Số lượng lỗi** | Cao hơn, vì ít xác minh | Thấp hơn, vì các thành viên kiểm tra chéo |
| **Khả năng mở rộng** | Khó, vì mã liên kết chặt | Dễ hơn, vì cấu trúc module |
| **Sử dụng token** | ~50K token | ~200K token (5 thành viên) |
| **Chi phí** | ~$0.50 | ~$2.00 |

#### Quy trình kiểm tra thực tế được đề xuất

**Bước 1: kiểm tra phương pháp một prompt trước**

```
1. Mở một cuộc hội thoại Claude Code mới
2. Sử dụng prompt từ "Kế hoạch kiểm tra A" ở trên
3. Ghi nhận: mất bao lâu? Bao nhiêu dòng mã được tạo? Tính năng nào bị thiếu?
```

**Bước 2: sau đó kiểm tra phương pháp Agent Teams**

```
1. Xác nhận rằng Agent Teams đã được kích hoạt
2. Sử dụng prompt từ "Kế hoạch kiểm tra B" ở trên
3. Quan sát: các thành viên đội hợp tác như thế nào? Mã có hoàn chỉnh hơn không?
```

**Bước 3: so sánh hai kết quả**

```
1. Chạy cả hai phiên bản mã riêng biệt
2. So sánh danh sách tính năng: tính năng nào thiếu trong phiên bản một prompt?
3. So sánh cấu trúc mã: phiên bản Agent Teams có module hơn không?
4. Đánh giá: nếu bạn muốn tiếp tục phát triển trò chơi này, phiên bản nào dễ mở rộng hơn?
```

#### Tại sao những khác biệt này xảy ra?

**Hạn chế của phương pháp một prompt**:

1. **Áp lực ngữ cảnh**: AI phải xử lý mọi thứ trong một phản hồi duy nhất, do đó đơn giản hóa là không thể tránh khỏi
2. **Sự chú ý phân tán**: chiến đấu, hội thoại, bản đồ và UI cạnh tranh sự chú ý, do đó chi tiết dễ bị bỏ sót
3. **Không có xác minh hợp tác**: không ai kiểm tra xem giao diện có khớp không, do đó lỗi dễ xảy ra hơn

**Ưu điểm của Agent Teams**:

1. **Phân công chuyên môn**: mỗi thành viên tập trung vào một lĩnh vực và có thể đi sâu vào chi tiết
2. **Xử lý song song**: phát triển chiến đấu, hội thoại và bản đồ diễn ra cùng lúc, cải thiện hiệu suất
3. **Xác minh lẫn nhau**: các thành viên đàm phán giao diện với nhau, giảm vấn đề tích hợp
4. **Ngữ cảnh độc lập**: mỗi thành viên có ngữ cảnh 200K riêng và không can thiệp vào các thành viên khác

#### Kết luận

Giá trị cốt lõi của Agent Teams không đơn giản là "nhanh hơn", mà là **"hoàn chỉnh hơn và chuyên nghiệp hơn"**.

- Đối với các dự án đơn giản như Snake, một prompt là đủ
- Đối với các dự án phức tạp như RPG Pokemon, Agent Teams có thể tạo ra kết quả tốt hơn

Điều quan trọng là **chọn đúng công cụ**: không sử dụng Agent Teams để đổi tên biến, và không sử dụng một prompt để xây dựng một trò chơi RPG hoàn chỉnh.

---

## Thực tiễn tốt nhất

Agent Teams là một công cụ mạnh mẽ, nhưng để sử dụng tốt, bạn cần hiểu một số thực tiễn tốt nhất. Những bài học này đến từ kinh nghiệm thực tế trong cộng đồng và có thể giúp bạn tránh các sai lầm phổ biến trong khi đạt được giá trị tối đa từ hợp tác nhóm.

### Thực tiễn 1: hợp đồng trước

Trước khi nhiều Agents bắt đầu làm việc song song, hãy dành thời gian xác định một "hợp đồng" rõ ràng, tức là thỏa thuận giao diện.

**Tại sao nó quan trọng**:

Giả sử Đồng đội A chịu trách nhiệm API backend và Đồng đội B chịu trách nhiệm tích hợp frontend. Nếu họ bắt đầu cùng lúc mà không thống nhất định dạng giao diện trước, điều như thế này có thể xảy ra:

```
Đồng đội A: triển khai POST /api/login và mong đợi {username, password}
Đồng đội B: triển khai gọi frontend và gửi {user, pass}
Kết quả: không khớp, và cần làm lại
```

**Cách thực hiện**:

Trước khi bắt đầu đội, trước tiên yêu cầu Claude thiết kế các giao diện:

```
Do not start development yet. First help me design the interfaces for the user authentication system:

1. The request and response formats for the login interface
2. The request and response formats for the registration interface
3. The password reset flow and interfaces
4. The error-handling conventions

Write these interfaces down clearly, and only then let the team begin development.
```

**Một hợp đồng nên bao gồm**:

- Chữ ký hàm và cấu trúc dữ liệu
- Định dạng JSON đầu vào và đầu ra
- Ý nghĩa của các mã trạng thái HTTP
- Quy ước xử lý lỗi
- Quy tắc xác thực trường

### Thực tiễn 2: phân bổ mô hình khôn ngoan

Các nhiệm vụ khác nhau đòi hỏi các mô hình khác nhau. Việc phân bổ mô hình tốt giúp cân bằng chất lượng và chi phí.

**Sử dụng Opus cho Trưởng nhóm**:

Trưởng nhóm xử lý phân chia nhiệm vụ và tổng hợp kết quả, đòi hỏi khả năng suy luận mạnh hơn, do đó Opus được khuyến nghị:

```
Create a team where the Team Lead uses Opus for overall planning and final review.
The Teammates use Sonnet for implementation work.
```

**Sử dụng Sonnet cho Đồng đội**:

Đối với công việc lập trình và kiểm thử cụ thể, Sonnet hoàn toàn có khả năng và rẻ hơn đáng kể:

- Opus 4.6: khoảng $15 mỗi triệu token đầu ra
- Sonnet 4.5: khoảng $3 mỗi triệu token đầu ra

Sử dụng Sonnet cho các thành viên có thể giảm đáng kể chi phí tổng thể.

**Sử dụng Haiku cho các trường hợp đặc biệt**:

Đối với các nhiệm vụ đơn giản như cập nhật tài liệu hoặc viết kiểm thử nhỏ, bạn có thể cân nhắc Haiku, khoảng $0.80 mỗi triệu token đầu ra.

### Thực tiễn 3: kiểm soát độ chi tiết của nhiệm vụ

Nhiệm vụ quá lớn hoặc quá nhỏ đều ảnh hưởng đến hiệu suất. Bạn cần tìm độ chi tiết phù hợp.

**Quy tắc ngón tay cái**:

Mỗi nhiệm vụ nên là điều mà một thành viên có thể hoàn thành độc lập trong **15 đến 30 phút**.

**Nhiệm vụ quá lớn**:

```
Tệ: triển khai hệ thống xác thực người dùng
```

Nhiệm vụ này quá rộng. Nó chứa nhiều nhiệm vụ con, và một người sẽ cần nhiều thời gian để hoàn thành, lãng phí lợi thế của tính song song.

**Nhiệm vụ quá nhỏ**:

```
Tệ: tạo một file trống tên auth.js
```

Nhiệm vụ này quá nhỏ. Các thành viên dành nhiều thời gian phối hợp hơn là làm công việc thực tế.

**Độ chi tiết phù hợp**:

```
Tốt: triển khai API đăng nhập, bao gồm:
1. Endpoint POST /api/login
2. Xác thực tên người dùng và mật khẩu
3. Phản hồi token JWT
4. Xử lý lỗi
```

Nhiệm vụ này có ranh giới rõ ràng và kết quả bàn giao. Một người có thể hoàn thành độc lập, và nó không bị phân mảnh quá mức.

**Thiết lập được đề xuất**:

Để mỗi thành viên sở hữu **5 đến 6 nhiệm vụ cỡ trung bình**. Điều này cung cấp đủ tính song song mà không làm chi phí phối hợp quá cao.

### Thực tiễn 4: tránh xung đột file

Nhiều thành viên chỉnh sửa cùng một file cùng lúc là vấn đề phổ biến nhất trong Agent Teams.

**Nguyên tắc phân công**:

Cố gắng để các thành viên khác nhau sở hữu **các file khác nhau**:

```
Tốt:
- Đồng đội A: sở hữu tất cả file dưới src/auth/
- Đồng đội B: sở hữu tất cả file dưới src/api/
- Đồng đội C: sở hữu tất cả file dưới tests/auth/

Tệ:
- Đồng đội A và Đồng đội B cùng chỉnh sửa src/app.js
```

**Nếu cùng một file phải được chỉnh sửa**:

Thiết kế giai đoạn chỉnh sửa tuần tự:

```
Giai đoạn 1 (song song):
- Đồng đội A: phân tích chức năng cần thêm vào auth.js
- Đồng đội B: thiết kế giao diện tính năng mới
- Đồng đội C: viết các trường hợp kiểm thử

Giai đoạn 2 (tuần tự):
- Trưởng nhóm tổng hợp tất cả đầu vào
- Một thành viên chỉnh sửa auth.js trong một lần tích hợp
```

### Thực tiễn 5: cung cấp ngữ cảnh ban đầu phong phú

Khi Đồng đội bắt đầu, lịch sử hội thoại của họ trống. Họ không biết Trưởng nhóm và người dùng đã thảo luận điều gì trước đó.

**Cách tiếp cận sai**:

```
Tạo đội và để các thành viên bắt đầu làm việc.
```

Các thành viên sẽ bắt đầu trong sương mù: dự án này là gì? Nó sử dụng stack công nghệ gì? Chính xác họ nên xây dựng cái gì?

**Cách tiếp cận đúng**:

```
This is a React + Node.js e-commerce project using TypeScript.

The project structure is:
- src/frontend/: React frontend code
- src/backend/: Node.js backend code
- prisma/: database models

Code style:
- Use function components and Hooks
- Use Express.js on the backend
- Use PostgreSQL for the database

Now create a team and have the members add user authentication under src/auth/.
```

Chỉ với đủ ngữ cảnh thì các thành viên mới có thể làm việc hiệu quả.

### Thực tiễn 6: nghiên cứu trước khi triển khai

Đừng để các thành viên bắt đầu lập mã ngay lập tức. Yêu cầu họ nghiên cứu và thiết kế giải pháp trước.

**Quy trình hai giai đoạn**:

**Giai đoạn 1: nghiên cứu và thiết kế**

```
Create a team. In phase one, do research:
- One member investigates existing authentication approaches (JWT vs Session)
- One member analyzes the project's tech stack and determines best practices
- One member designs the database schema

After the research is complete, let the members discuss through the messaging system and settle on a final plan.
```

**Giai đoạn 2: triển khai**

```
After the plan is finalized, begin implementation:
- One member implements the backend authentication logic
- One member implements the frontend login page
- One member writes tests
```

Lợi ích của việc làm theo cách này là bạn có thể **phát hiện sự không khớp kiến trúc sớm**, thay vì nhận ra giữa chừng triển khai rằng kế hoạch không hoạt động.

### Thực tiễn 7: giám sát và can thiệp chủ động

Ngay cả khi bạn đã cấu hình tự động hóa, bạn vẫn nên giám sát chủ động trạng thái làm việc của đội.

**Sử dụng chế độ chia ngăn**:

Nếu bạn đã cấu hình các ngăn tmux, bạn có thể thấy đầu ra của tất cả thành viên trong thời gian thực:

```
┌─────────────────┬─────────────────┐
│  Đồng đội 1     │  Đồng đội 2     │
│  Đang phân tích │  Đang triển khai│
│  mã nguồn       │  API...         │
│  ...            │                 │
│                 │                 │
│  Khoan, hướng   │                 │
│  tiếp cận này   │                 │
│  có vẻ sai...   │                 │
└─────────────────┴─────────────────┘
```

Khi bạn nhận thấy một thành viên đang đi sai hướng, bạn có thể can thiệp nhanh chóng:

```
@Teammate1 Stop for a moment. Your analysis is headed in the wrong direction. The authentication module should be under src/auth/, not src/user/.
```

**Kiểm tra trạng thái nhiệm vụ thường xuyên**:

Sử dụng lệnh TaskList để kiểm tra trạng thái của tất cả nhiệm vụ:

```
/tasks
```

Điều này hiển thị tất cả trạng thái nhiệm vụ để bạn có thể thấy cái nào đã hoàn thành, cái nào đang chạy và cái nào bị chặn.

---

## Kịch bản phù hợp

Agent Teams mạnh mẽ, nhưng không phải mọi nhiệm vụ đều phù hợp với nó. Hiểu các kịch bản đúng giúp bạn lựa chọn chính xác.

### Kịch bản phù hợp với Agent Teams

**Tái cấu trúc hệ thống phức tạp**

Khi việc tái cấu trúc kéo dài nhiều mô-đun với ranh giới rõ ràng:

```
Kịch bản: chia một ứng dụng đơn khối thành microservices

Tạo một đội:
- Đồng đội A: phân tích phụ thuộc trong mô-đun người dùng
- Đồng đội B: phân tích phụ thuộc trong mô-đun đơn hàng
- Đồng đội C: phân tích phụ thuộc trong mô-đun thanh toán
- Đồng đội D: thiết kế giao thức giao tiếp liên dịch vụ
```

Các mô-đun này có thể được phân tích đồng thời, và kết quả cuối cùng có thể được tổng hợp sau, nhanh hơn nhiều so với phân tích tuần tự.

**Đánh giá mã từ nhiều góc độ**

Khi bạn cần đánh giá mã từ nhiều chiều:

```
Kịch bản: tiến hành đánh giá bảo mật toàn diện cho mô-đun thanh toán

Tạo một đội:
- Đồng đội A: tập trung vào lỗ hổng bảo mật (SQL injection, XSS, v.v.)
- Đồng đội B: kiểm tra vấn đề hiệu suất (truy vấn N+1, rò rỉ bộ nhớ, v.v.)
- Đồng đội C: xác minh tính đầy đủ của xử lý lỗi
- Đồng đội D: đánh giá độ phủ kiểm thử
```

Mỗi thành viên tập trung vào một chiều, khiến đánh giá sâu hơn và báo cáo cuối cùng hoàn chỉnh hơn.

**Phát triển song song frontend và backend**

Khi bạn cần xây dựng frontend và backend cùng lúc:

```
Kịch bản: xây dựng tính năng quản lý người dùng

Tạo một đội:
- Đồng đội A (frontend): triển khai trang danh sách người dùng
- Đồng đội B (frontend): triển khai trang chỉnh sửa người dùng
- Đồng đội C (backend): triển khai API CRUD
- Đồng đội D (phối hợp): thiết kế hợp đồng API và đảm bảo frontend và backend giữ đồng bộ
```

Frontend và backend có thể tiến hành song song miễn là hợp đồng API được xác định trước, tuân theo nguyên tắc hợp đồng trước.

**Gỡ lỗi cạnh tranh**

Khi bạn có nhiều giải pháp khả thi:

```
Kịch bản: sửa một lỗi phức tạp với hai chiến lược sửa chữa khả thi

Tạo một đội:
- Đồng đội A: triển khai giải pháp 1
- Đồng đội B: triển khai giải pháp 2
- Đồng đội C: đánh giá ưu nhược điểm của cả hai
```

Cả hai giải pháp có thể được triển khai và kiểm thử song song, và giải pháp tốt hơn có thể được chọn sau.

**Tạo tài liệu**

Khi bạn cần tạo một lượng lớn tài liệu:

```
Kịch bản: viết tài liệu cho toàn bộ dự án

Tạo một đội:
- Đồng đội A: viết tài liệu API
- Đồng đội B: viết hướng dẫn triển khai
- Đồng đội C: viết hướng dẫn phát triển
- Đồng đội D: viết hướng dẫn khắc phục sự cố
```

Nhiều tài liệu có thể được viết cùng lúc, cải thiện đáng kể hiệu suất.

### Kịch bản không phù hợp với Agent Teams

**Nhiệm vụ sửa đổi đơn giản**

```
Không phù hợp: đổi tên biến, sửa một lỗi đơn lẻ, thêm tính năng nhỏ
```

Đối với các nhiệm vụ này, chi phí khởi động đội lớn hơn công việc thực tế.

**Nhiệm vụ mang tính tuần tự cao**

```
Không phù hợp: nhiệm vụ phải diễn ra theo thứ tự nghiêm ngặt
```

Nếu nhiệm vụ B không thể bắt đầu cho đến khi nhiệm vụ A hoàn thành, không có không gian thực sự cho tính song song.

**Nhiệm vụ nhạy cảm về chi phí**

Agent Teams tiêu thụ **2 đến 4 lần** token so với một thực thể đơn lẻ, tùy thuộc vào quy mô đội. Nếu chi phí là mối quan tâm chính, một thực thể đơn lẻ có thể là lựa chọn tốt hơn.

**Sơ đồ quyết định**

```
Có nhiều nhiệm vụ con độc lập không?
    │
    ├─ Không → Sử dụng một thực thể đơn lẻ
    │
    └─ Có →
         │
         Các nhiệm vụ con có thể được giao cho các file khác nhau không?
         │
         ├─ Không → Cân nhắc thực thi tuần tự hoặc chia nhỏ nhiệm vụ thêm
         │
         └─ Có →
              │
              Chi phí có chấp nhận được không (2-4x)?
              │
              ├─ Không → Sử dụng một thực thể đơn lẻ
              │
              └─ Có → Sử dụng Agent Teams ✓
```

---

## Chi phí và hiệu suất

Sử dụng Agent Teams tăng chi phí, nhưng cũng có thể mang lại lợi ích hiệu suất đáng kể. Hiểu sự đánh đổi này giúp bạn đưa ra quyết định sáng suốt.

### Phân tích chi phí

**Tiêu thụ token và quy mô đội**

Tiêu thụ token của Agent Teams roughly **tuyến tính** với quy mô đội:

| Quy mô đội | Chi phí tương đối | Kịch bản phù hợp |
|---------|---------|---------|
| 1 người (thực thể đơn lẻ) | 1x | Nhiệm vụ đơn giản |
| Đội 2 người | 2-2.5x | Độ phức tạp trung bình |
| Đội 3 người | 3-4x | Nhiệm vụ phức tạp |
| Đội 5+ người | 5-6x+ | Dự án lớn |

**Tại sao không hoàn toàn tuyến tính**:

- **Chi phí khởi động**: mỗi thành viên phải nhận ngữ cảnh ban đầu khi bắt đầu
- **Chi phí phối hợp**: giao tiếp giữa các thành viên qua hệ thống nhắn tin cũng tiêu thụ token
- **Chi phí Trưởng nhóm**: Trưởng nhóm thường sử dụng Opus, đắt hơn

**Ví dụ số liệu cụ thể** (Claude 4.5 Sonnet):

- Đầu vào: $3 mỗi triệu token
- Đầu ra: $15 mỗi triệu token

Giả sử một nhiệm vụ yêu cầu:
- Trưởng nhóm (Opus): 50K đầu vào + 20K đầu ra ≈ $2.25
- 3 Đồng đội (Sonnet): mỗi người 30K đầu vào + 15K đầu ra ≈ $2.7 × 3 = $8.1
- **Tổng cộng**: khoảng $10.35

Cùng nhiệm vụ trên thực thể Sonnet đơn lẻ:
- 100K đầu vào + 50K đầu ra ≈ $1.05

**Hệ số chi phí**: khoảng 10x

**Nhưng thời gian tiết kiệm**: có thể giảm từ 3 giờ xuống 1 giờ

### Lợi ích hiệu suất

**Dữ liệu kiểm thử nội bộ của Anthropic**:

- Tái cấu trúc dự án lớn: cải thiện khoảng **50%** hiệu suất
- Phát triển song song nhiều mô-đun: cải thiện khoảng **60-70%**
- Nhiệm vụ tạo tài liệu: cải thiện khoảng **80%**

**Trường hợp thực tế**:

Đội ngũ kỹ thuật của Anthropic từng sử dụng **16 agent song song** để xây dựng một trình biên dịch C trong khoảng 2 tuần có thể biên dịch kernel Linux 6.9, khoảng 100,000 dòng mã Rust, và vượt qua 99% bài kiểm tra GCC.

### Chiến lược tối ưu hóa chi phí

**Chiến lược 1: kết hợp mô hình**

```
Trưởng nhóm: Opus (cần suy luận mạnh)
Đồng đội: Sonnet (giá trị cao cho chi phí)
Nhiệm vụ đơn giản: Haiku (rẻ nhất)
```

**Chiến lược 2: điều chỉnh quy mô đội linh hoạt**

```
Giai đoạn phân tích: đội 5 người (phân tích đa góc độ)
Giai đoạn triển khai: đội 3 người (lập trình song song)
Giai đoạn kiểm thử: đội 2 người (kiểm thử và sửa lỗi)
```

**Chiến lược 3: chỉ sử dụng Agent Teams ở các giai đoạn được chọn**

Đừng sử dụng Agent Teams cho toàn bộ dự án. Chỉ sử dụng ở các giai đoạn phức tạp nhất:

```
Giai đoạn 1 (phân tích yêu cầu): thực thể đơn lẻ
Giai đoạn 2 (thiết kế kiến trúc): Agent Teams (nhiều kế hoạch được khám phá song song)
Giai đoạn 3 (lập trình): thực thể đơn lẻ
Giai đoạn 4 (đánh giá mã): Agent Teams (đánh giá đa góc độ)
Giai đoạn 5 (tài liệu): Agent Teams (viết song song)
```

### Khi nào thì đáng giá

**Đáng giá khi**:

- Tiến độ dự án cấp bách, và giá trị lợi ích hiệu suất vượt quá chi phí token
- Nhiệm vụ rất phức tạp, và một thực thể đơn lẻ có khả năng bỏ sót chi tiết
- Bạn cần phân tích và xác minh từ nhiều góc độ

**Không đáng giá khi**:

- Nhiệm vụ đơn giản, và chi phí khởi động đội quá cao
- Chi phí rất nhạy cảm và ngân sách token hạn chế
- Nhiệm vụ mang tính tuần tự cao và không cung cấp không gian cho tính song song

---

## Câu hỏi thường gặp

### Câu hỏi 1: Agent Teams có ổn định không? Có thể sử dụng trong sản xuất không?

Agent Teams hiện là một **tính năng thử nghiệm**, do đó vẫn có thể có lỗi và hành vi không ổn định. Khuyến nghị:

- Sao lưu các dự án quan trọng trước
- Bắt đầu với các dự án nhỏ để bạn có thể kiểm thử và làm quen
- Theo dõi ghi chú phát hành chính thức để xem cải thiện trong các phiên bản mới
- Báo cáo vấn đề cho đội chính thức kịp thời khi chúng xuất hiện

### Câu hỏi 2: Tôi có thể tạo tối đa bao nhiêu thành viên?

Không có giới hạn lý thuyết nghiêm ngặt, nhưng từ góc độ thực tế:

- Dự án nhỏ: 2 đến 3 người
- Dự án trung bình: 3 đến 5 người
- Dự án lớn: 5 đến 10 người

Quá nhiều thành viên gây ra các vấn đề sau:

- Chi phí phối hợp tăng vọt
- Sử dụng token tăng tuyến tính
- Xác suất xung đột file tăng
- Giám sát và quản lý trở nên khó khăn hơn

### Câu hỏi 3: Các thành viên trong đội có thể thấy ngữ cảnh của nhau không?

**Không**. Mỗi Đồng đội có cửa sổ ngữ cảnh hoàn toàn độc lập. Họ giao tiếp thông qua hệ thống nhắn tin thay vì chia sẻ ngữ cảnh trực tiếp.

Đây là một lựa chọn thiết kế cố ý, và lợi ích là:

- Suy luận của một thành viên không bị ô nhiễm bởi suy luận của thành viên khác
- Ngữ cảnh không trở nên lộn xộn vì cuộc hội thoại quá dài
- Gần hơn với cách một đội thực tế hoạt động, nơi mỗi người có tâm trí riêng

### Câu hỏi 4: Làm thế nào để chuyển đổi giữa các thành viên khác nhau?

Nếu chế độ chia ngăn chưa được cấu hình, bạn có thể sử dụng phím tắt:

- `Shift+Up`: chuyển sang thành viên trước
- `Shift+Down`: chuyển sang thành viên tiếp theo
- `Ctrl+O`: quay lại Trưởng nhóm

### Câu hỏi 5: Nếu một nhiệm vụ thất bại thì sao?

Nếu nhiệm vụ của một thành viên thất bại:

1. Kiểm tra nguyên nhân thất bại bằng cách đọc nhật ký đầu ra của thành viên đó
2. Phân công lại nhiệm vụ cho thành viên khác nếu cần
3. Can thiệp thủ công và giúp gỡ bỏ vấn đề trực tiếp

### Câu hỏi 6: Tôi có thể thêm hoặc loại bỏ thành viên giữa chừng không?

Có. Bạn có thể đưa ra lệnh cho Trưởng nhóm bất kỳ lúc nào:

```
Add a new member and let it handle XXX.
```

```
Let Teammate 3 leave the team after finishing the current task.
```

### Câu hỏi 7: Agent Teams có thể sử dụng kết hợp với MCP và Skills không?

Hoàn toàn có thể. Thực tế, chúng hoạt động tốt hơn khi kết hợp:

- **Agent Teams + Skills**: mỗi thành viên có thể mang các skills khác nhau
- **Agent Teams + MCP**: các thành viên khác nhau có thể truy cập tài nguyên bên ngoài qua các server MCP khác nhau

```
Create a team:
- Teammate A: carries the frontend-design Skill and is responsible for UI
- Teammate B: accesses the repository through GitHub MCP and handles PR management
- Teammate C: queries data through Database MCP and handles analysis
```

---

## Tài liệu tham khảo

### Tài nguyên chính thức

- [Tài liệu Claude Code chính thức](https://docs.anthropic.com/en/docs/claude-code) - Tài liệu Claude Code hoàn chỉnh
- [Blog kỹ thuật Anthropic](https://www.anthropic.com/engineering) - Blog kỹ thuật chính thức và cập nhật

### Bộ sưu tập hướng dẫn Agent Teams

**Hướng dẫn đầy đủ bằng tiếng Trung**:

- [Hướng dẫn toàn diện Claude Code Agent Teams: từ giới thiệu đến thực hành](https://m.blog.csdn.net/u010634066/article/details/157903022) - Bao gồm chi tiết cấu hình, ví dụ thực hành và trường hợp ấn tượng nơi 16 agent song song xây dựng trình biên dịch C
- [Phát triển hợp tác với Claude Code Agent Team: hướng dẫn thực hành hoàn chỉnh](https://m.blog.csdn.net/u010028049/article/details/158126612) - Quy trình làm việc dự án hợp tác đầy đủ
- [Hướng dẫn từng bước cấu hình và sử dụng Claude Code Agent Teams](https://cloud.tencent.com/developer/article/2630088) - Hướng dẫn Tencent Cloud với hướng dẫn cấu hình chi tiết

**Bắt đầu thực hành**:

- [Thực hành với Claude Code Agent Teams gốc: từ kích hoạt đến chạy đội ba người](https://www.cnblogs.com/147api/p/19606317) - Hướng dẫn đội ba người
- [Thực hành người mới bắt đầu với Claude Code Agent Teams](https://m.toutiao.com/article/7606744384960266793/) - Giới thiệu thân thiện với người mới với thực tiễn tốt nhất như hợp đồng trước
- [Không còn làm việc một mình: để 7 Claude giúp bạn phát triển cùng lúc với Agent Teams](https://m.toutiao.com/a7605229732241736202/) - Nghiên cứu trường hợp đội 7 người

**Thực tiễn tốt nhất**:

- [Thực tiễn tốt nhất Agent Teams: hợp đồng trước, độ chi tiết nhiệm vụ và phân bổ mô hình](https://blog.csdn.net/sinat_37574187/article/details/144727588) - Giải thích chi tiết 7 thực tiễn tốt nhất
- [Cẩm nang thực chiến Claude Code của cựu binh công nghệ lớn 7 năm: tám quy tắc từ người mới đến chuyên gia](https://new.qq.com/rain/a/20260111A02HE900) - Kinh nghiệm thực tế cấp doanh nghiệp

**Nguyên lý và so sánh**:

- [Claude Code Agent Teams: cách đúng để làm hợp tác đa agent](https://post.m.smzdm.com/p/adoezrmz/) - Phân tích sâu về hợp tác đa agent
- [Phát triển đội đa agent Claude Code: hướng dẫn toàn diện từ nguyên lý đến cạm bẫy](https://m.toutiao.com/a7605229732241736202/) - Nguyên lý và cạm bẫy từ sử dụng thực tế

### Bản dịch hướng dẫn chính thức

- [Claude chính thức phát hành "Hướng dẫn xây dựng Agent" (kèm tải PDF)](https://m.blog.csdn.net/sinat_37574187/article/details/144724124) - Hướng dẫn xây dựng Agent chính thức
- [Bản dịch đầy đủ "Hướng dẫn xây dựng Agents hiệu quả" chính thức của Claude](https://m.blog.csdn.net/gyn_enyaer/article/details/144827922) - Bản dịch tiếng Trung đầy đủ

### Công nghệ liên quan

- [Tiêu chuẩn Agent Skills](https://agentskills.io/) - Hệ sinh thái Skills
- [skills.sh - Cửa hàng ứng dụng Agent Skills](https://skills.sh/) - Thư viện hơn 70,000 skills
