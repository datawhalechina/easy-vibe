# Hướng dẫn Đầy đủ về Claude Code MCP

## Claude Code MCP là gì?

**Claude Code** là công cụ dòng lệnh AI chính thức của Anthropic, trong khi **MCP (Model Context Protocol)** là giao thức cho phép Claude Code kết nối với các công cụ và dịch vụ bên ngoài.

Nói đơn giản, MCP biến Claude Code từ một trợ lý AI chỉ có thể đọc và ghi tệp cục bộ thành một siêu trợ lý có thể truy cập GitHub, cơ sở dữ liệu, API và dịch vụ đám mây.

## Tại sao sử dụng MCP trong Claude Code?

### Claude Code không có MCP

```text
Những gì bạn có thể làm:
✓ Đọc tệp cục bộ
✓ Chỉnh sửa mã
✓ Chạy lệnh
✓ Sử dụng công cụ Bash

Những gì bạn không thể làm:
✗ Xem GitHub Issues của bạn
✗ Truy cập cơ sở dữ liệu đám mây
✗ Gọi API bên ngoài
✗ Lấy thời tiết thời gian thực
```

### Claude Code với MCP

```text
Những gì bạn có thể làm:
✓ Tất cả chức năng gốc
✓ Xem / tạo GitHub Issues và PRs
✓ Truy vấn cơ sở dữ liệu SQLite và PostgreSQL
✓ Truy cập dịch vụ bên ngoài như Notion và Slack
✓ Lấy thời tiết và dữ liệu bản đồ thời gian thực
✓ Tự động hóa trình duyệt
✓ ...và nhiều hơn nữa
```

## Bắt đầu Nhanh

### Bước 1: Hiểu tệp cấu hình nằm ở đâu

Tệp cấu hình MCP của Claude Code nằm ở:

| Cấp độ | Đường dẫn tệp cấu hình | Phạm vi |
|-----|-------------|----------|
| **Cấp người dùng** | `~/.claude.json` | Tất cả dự án |
| **Cấp dự án** | `.claude/mcp.json` | Dự án hiện tại |

Khuyến nghị sử dụng **cấu hình cấp dự án** trước, để các dự án khác nhau có thể sử dụng dịch vụ MCP khác nhau.

### Bước 2: Thêm máy chủ MCP bằng ngôn ngữ tự nhiên

Trong Claude Code, bạn không cần chỉnh sửa tệp cấu hình thủ công hoặc ghi nhớ lệnh. Bạn có thể mô tả những gì bạn muốn bằng ngôn ngữ tự nhiên:

```text
Bạn: Giúp tôi thêm máy chủ GitHub MCP. Token của tôi là ghp_xxx

Claude: Tôi sẽ giúp bạn cấu hình máy chủ GitHub MCP...

[Tự động cập nhật .claude/mcp.json]
```

```text
Bạn: Thêm máy chủ cơ sở dữ liệu SQLite. Tệp cơ sở dữ liệu nằm tại ./data/app.db

Claude: Được rồi, tôi sẽ cấu hình máy chủ MCP SQLite...
```

```text
Bạn: Thêm máy chủ MCP loại HTTP với địa chỉ https://api.example.com/mcp

Claude: Tôi sẽ thêm máy chủ MCP từ xa đó...
```

### Bước 3: Xác minh cấu hình

Hỏi Claude Code trực tiếp:

```text
Bạn: Hiện có những máy chủ MCP nào?

Claude: Các máy chủ MCP đã cấu hình hiện tại:
• github - Tích hợp GitHub
• sqlite - Cơ sở dữ liệu SQLite
• filesystem - Truy cập hệ thống tệp
```

Hoặc sử dụng lệnh chẩn đoán:

```text
/doctor
```

### Bước 4: Bắt đầu sử dụng

Khi cấu hình thành công, bạn có thể gọi chức năng MCP trực tiếp bằng ngôn ngữ tự nhiên:

```text
Bạn: Giúp tôi tạo một Issue trên GitHub

Claude: Tôi có thể giúp bạn tạo GitHub Issue. Vui lòng cho tôi biết:
- địa chỉ kho, ví dụ owner/repo
- tiêu đề Issue
- mô tả Issue
```

## Quản lý bằng ngôn ngữ tự nhiên trong Claude Code

### Xem và quản lý máy chủ MCP

Bạn có thể tương tác với Claude Code hoàn toàn bằng ngôn ngữ tự nhiên:

```text
Bạn: Liệt kê tất cả máy chủ MCP đã cấu hình

Bạn: Kiểm tra trạng thái kết nối của các máy chủ MCP

Bạn: Xóa máy chủ MCP tên notion

Bạn: Cập nhật token cho máy chủ github
```

### Chẩn đoán vấn đề

Khi bạn gặp vấn đề:

```text
Bạn: Kiểm tra xem kết nối MCP có vấn đề gì không

Claude: [sẽ tự động chạy chẩn đoán, phân tích tệp cấu hình và kiểm tra trạng thái máy chủ]
```

## Phương pháp cấu hình chi tiết

### Cấu hình cấp người dùng, toàn cục

Chỉnh sửa `~/.claude.json`:

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/Users/yourname/Documents"]
    },
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "your-token"
      }
    }
  }
}
```

### Cấu hình cấp dự án, được khuyến nghị

Chỉnh sửa `.claude/mcp.json` trong thư mục gốc dự án:

```json
{
  "mcpServers": {
    "project-db": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-sqlite", "--db-path", "./data/app.db"]
    }
  }
}
```

**Ưu điểm của cấu hình cấp dự án:**

- Thành viên đội có thể chia sẻ cấu hình bằng cách commit vào Git
- Dự án khác nhau có thể sử dụng dịch vụ MCP khác nhau
- Cấu hình linh hoạt hơn và không làm ô nhiễm cài đặt toàn cục

### Chế độ truyền tải

Claude Code hỗ trợ ba chế độ truyền tải:

#### STDIO, tiến trình cục bộ

```json
{
  "mcpServers": {
    "local-tool": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/path"]
    }
  }
}
```

#### HTTP, dịch vụ từ xa

```json
{
  "mcpServers": {
    "remote-api": {
      "url": "https://api.example.com/mcp",
      "transport": "http",
      "headers": {
        "Authorization": "Bearer your-token"
      }
    }
  }
}
```

#### SSE, server-sent events

```json
{
  "mcpServers": {
    "streaming": {
      "url": "https://api.example.com/sse",
      "transport": "sse"
    }
  }
}
```

## Ví dụ thực tế

### Ví dụ 1: Tự động hóa quy trình làm việc GitHub

```text
Bạn: Giúp tôi đẩy các thay đổi hiện tại lên GitHub, sau đó tạo PR với tiêu đề "Add new feature"

Claude:
1. Kiểm tra trạng thái git hiện tại...
2. Tạo nhánh mới feature/new-feature...
3. Commit thay đổi...
4. Push lên remote...
5. Gọi github_create_pull_request để tạo PR...
6. PR đã tạo: https://github.com/owner/repo/pull/123
```

### Ví dụ 2: Truy vấn cơ sở dữ liệu

```text
Bạn: Truy vấn 10 người dùng đăng ký gần nhất trong cơ sở dữ liệu

Claude:
1. Kết nối cơ sở dữ liệu SQLite...
2. Thực thi truy vấn: SELECT * FROM users ORDER BY created_at DESC LIMIT 10
3. Trả về kết quả:
   - Nguyễn Văn A (nguyenvana@example.com) - 2025-02-28
   - Trần Thị B (tranthib@example.com) - 2025-02-27
   ...
```

### Ví dụ 3: Chụp màn hình trang web và phân tích

```text
Bạn: Mở https://example.com, chụp màn hình và phân tích thiết kế trang

Claude:
1. Khởi chạy trình duyệt...
2. Điều hướng đến https://example.com...
3. Chụp màn hình...
4. [Trả về ảnh chụp màn hình]
5. Phân tích thiết kế trang:
   - Bố cục sử dụng thiết kế căn giữa với chiều rộng tối đa 1200px
   - Màu chính là xanh dương (#3b82f6)
   - Thanh điều hướng cố định ở phía trên
   ...
```

### Ví dụ 4: Tích hợp với Notion

```text
Bạn: Lưu ghi chú tôi vừa viết vào Notion

Claude:
1. Sử dụng máy chủ MCP Notion...
2. Tạo trang mới...
3. Đã lưu: https://notion.so/page/xxx
```

## Mẹo gỡ lỗi

### Chẩn đoán bằng ngôn ngữ tự nhiên

Khi có vấn đề, chỉ cần nói trực tiếp với Claude Code:

```text
Bạn: Máy chủ MCP của tôi không thể kết nối. Vui lòng kiểm tra giúp tôi

Bạn: Lời gọi công cụ GitHub MCP thất bại. Lý do là gì?

Bạn: Tại sao máy chủ sqlite luôn hiển thị "đang kết nối"?
```

Claude Code sẽ tự động:

1. Kiểm tra định dạng tệp cấu hình
2. Xác thực biến môi trường
3. Kiểm tra kết nối máy chủ
4. Cung cấp gợi ý sửa chữa cụ thể

### Khắc phục sự cố phổ biến

| Vấn đề | Nguyên nhân có thể | Giải pháp |
|-----|---------|----------|
| Máy chủ không kết nối | Lỗi định dạng tệp cấu hình | Kiểm tra cú pháp JSON |
| Công cụ không thể gọi | Quyền không đủ | Kiểm tra biến môi trường |
| Kết nối hết thời gian | Vấn đề mạng | Kiểm tra URL hoặc mạng |
| Tiến trình sập | Lỗi trong mã máy chủ | Kiểm tra nhật ký máy chủ |

### Lệnh chẩn đoán thủ công

```text
/doctor
```

Ví dụ đầu ra:

```text
System Diagnostic Report:
===============

Claude Code: v2.5.0 ✓
Node.js: v20.0.0 ✓

Trạng thái máy chủ MCP:
• github: ✓ Đã kết nối (12 công cụ)
• sqlite: ✗ Kết nối thất bại - Không tìm thấy tệp cơ sở dữ liệu
• puppeteer: ✓ Đã kết nối (8 công cụ)

Gợi ý:
1. Kiểm tra đường dẫn cơ sở dữ liệu sqlite có đúng không
2. Đảm bảo định dạng .claude/mcp.json đúng
```

## Thực hành tốt nhất

### 1. Ưu tiên cấu hình cấp dự án

**Tại sao khuyến nghị cấu hình cấp dự án?**

Các dự án khác nhau thường cần dịch vụ MCP khác nhau. Ví dụ, dự án frontend có thể cần công cụ kiểm thử trình duyệt, trong khi dự án backend có thể cần kết nối cơ sở dữ liệu. Với cấu hình cấp dự án, mỗi dự án có thể có bộ máy chủ MCP riêng, tránh hỗn loạn của một cấu hình toàn cục lớn.

Quan trọng hơn, cấu hình cấp dự án có thể commit vào Git. Sau khi thành viên đội clone dự án, họ có thể trực tiếp sử dụng các dịch vụ MCP giống nhau mà không cần cấu hình lại mọi thứ.

```text
Dự án A, dự án frontend -> .claude/mcp.json chứa MCP kiểm thử trình duyệt
Dự án B, dự án backend -> .claude/mcp.json chứa MCP cơ sở dữ liệu
```

### 2. Lưu trữ thông tin nhạy cảm trong biến môi trường

**Không bao giờ hard-code bí mật trong tệp cấu hình.**

Tệp cấu hình có thể bị commit nhầm vào Git và rò rỉ key. Cách đúng là lưu trữ giá trị nhạy cảm trong biến môi trường và chỉ tham chiếu tên biến từ tệp cấu hình. Bằng cách đó, ngay cả khi tệp cấu hình trở nên công khai, bí mật thực sự vẫn bị ẩn.

```json
{
  "env": {
    "GITHUB_TOKEN": "$GITHUB_TOKEN",
    "GITHUB_TOKEN": "ghp_abc123"
  }
}
```

Biểu mẫu đầu là tốt vì nó đọc từ biến môi trường. Biểu mẫu thứ hai là xấu vì nó hard-code bí mật trực tiếp.

### 3. Ghim phiên bản

**Tại sao bạn cần ghim phiên bản?**

Theo mặc định, `npx -y` sẽ luôn sử dụng phiên bản mới nhất của máy chủ MCP. Điều này có thể gây vấn đề: phiên bản mới có thể giới thiệu thay đổi phá vỡ hoặc gói có thể đột ngột bị xóa hoặc đổi tên.

Bằng cách thêm `@version` vào tên gói, bạn đảm bảo phiên bản đã được xác thực luôn được sử dụng, giảm bất ngờ do nâng cấp tự động.

```json
{
  "command": "npx",
  "args": ["-y", "@modelcontextprotocol/server-github@1.2.3"]
}
```

### 4. Tài liệu hóa cấu hình MCP của bạn

**Giúp đồng đội hiểu thiết lập MCP nhanh chóng**

Khi một dự án bao gồm nhiều máy chủ MCP, thành viên mới có thể không hiểu mỗi máy chủ dùng để làm gì hoặc cấu hình nào nó yêu cầu. Tạo `README.md` dưới thư mục `.claude/` giải thích mục đích của mỗi máy chủ, cấu hình cần thiết và cách lấy thông tin xác thực có thể giảm đáng kể chi phí giao tiếp.

Tạo `.claude/README.md` trong dự án của bạn:

```markdown
# Ghi chú Cấu hình MCP

Các máy chủ MCP được sử dụng trong dự án này:

## github
Được sử dụng cho tự động hóa GitHub. Yêu cầu GITHUB_TOKEN.

## sqlite
Kết nối đến ./data/app.db để truy vấn và sửa đổi dữ liệu.

## puppeteer
Được sử dụng cho kiểm thử E2E.
```

## Claude Code so với Claude Desktop

| Tính năng | Claude Code | Claude Desktop |
|-----|-------------|----------------|
| **Tệp cấu hình** | `~/.claude.json` hoặc `.claude/mcp.json` | `claude_desktop_config.json` |
| **Cấu hình cấp dự án** | ✓ Hỗ trợ | ✗ Không hỗ trợ |
| **Quản lý ngôn ngữ tự nhiên** | ✓ Hỗ trợ | ✗ Cần chỉnh sửa thủ công |
| **Chẩn đoán** | ✓ `/doctor` | ✗ Không có |
| **Tải lại nóng** | ✓ Tự động | ✗ Cần khởi động lại ứng dụng |
| **Trường hợp sử dụng** | Quy trình phát triển, CI/CD | Sử dụng hàng ngày, nhiệm vụ văn phòng |

## Các máy chủ MCP phổ biến

> 💡 Để xem danh sách máy chủ MCP đầy đủ, vui lòng tham khảo phụ lục: [Thư mục Máy chủ MCP](/vi-vn/appendix/8-artificial-intelligence/ai-protocols)

### Máy chủ GitHub

**Chức năng:** Issues, PRs, quản lý kho

```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "your-token"
      }
    }
  }
}
```

**Lấy token từ:** https://github.com/settings/tokens

### Máy chủ SQLite

**Chức năng:** Truy vấn và quản lý cơ sở dữ liệu SQLite

```json
{
  "mcpServers": {
    "sqlite": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-sqlite", "--db-path", "./data/database.db"]
    }
  }
}
```

### Máy chủ Filesystem

**Chức năng:** Truy cập tệp trong thư mục được chỉ định

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/Users/yourname/Documents"]
    }
  }
}
```

### Tự động hóa trình duyệt Puppeteer

**Chức năng:** Điều khiển trình duyệt, chụp màn hình, kiểm thử tự động

```json
{
  "mcpServers": {
    "puppeteer": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-puppeteer"]
    }
  }
}
```

### Máy chủ tìm kiếm Brave

**Chức năng:** Tìm kiếm web

```json
{
  "mcpServers": {
    "brave-search": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-brave-search"],
      "env": {
        "BRAVE_API_KEY": "your-brave-api-key"
      }
    }
  }
}
```

## Tài nguyên Tham khảo

### Tài liệu chính thức

- [Tài liệu chính thức Claude Code - MCP](https://docs.anthropic.com/zh-CN/docs/claude-code/mcp)
- [Trang web chính thức MCP](https://modelcontextprotocol.io/)
- [Tài liệu đặc tả MCP](https://modelcontextprotocol.io/specification/)
- [Kho GitHub MCP](https://github.com/modelcontextprotocol)

### Máy chủ chính thức

- [@modelcontextprotocol/server-github](https://github.com/modelcontextprotocol/servers/tree/main/src/github) - Tích hợp GitHub
- [@modelcontextprotocol/server-sqlite](https://github.com/modelcontextprotocol/servers/tree/main/src/sqlite) - Cơ sở dữ liệu SQLite
- [@modelcontextprotocol/server-postgres](https://github.com/modelcontextprotocol/servers/tree/main/src/postgres) - Cơ sở dữ liệu PostgreSQL
- [@modelcontextprotocol/server-filesystem](https://github.com/modelcontextprotocol/servers/tree/main/src/filesystem) - Truy cập hệ thống tệp
- [@modelcontextprotocol/server-puppeteer](https://github.com/modelcontextprotocol/servers/tree/main/src/puppeteer) - Tự động hóa trình duyệt
- [@modelcontextprotocol/server-fetch](https://github.com/modelcontextprotocol/servers/tree/main/src/fetch) - Fetch web
- [@modelcontextprotocol/server-brave-search](https://github.com/modelcontextprotocol/servers/tree/main/src/brave-search) - Tìm kiếm Brave
- [@modelcontextprotocol/server-git](https://github.com/modelcontextprotocol/servers/tree/main/src/git) - Thao tác Git

### Bài viết hướng dẫn

- [Giải thích kỹ nguyên lý và thực hành MCP](https://view.inews.qq.com/a/20250414A023WV00)
- [Kiến trúc MCP (Model Context Protocol) và cách hoạt động](https://m.toutiao.com/w/1826385835060307/)
- [Hướng dẫn mô hình lớn mới nhất 2025: từ nhập môn đến thành thạo giao thức MCP](https://m.blog.csdn.net/weixin_45653328/article/details/150916706)
- [Học MCP từ đầu (8) - xây dựng máy chủ MCP](https://juejin.cn/post/7582510291667419187)

### Hướng dẫn cấu hình

- [Thực hành tốt nhất Claude Code](https://www.anthropic.com/engineering/claude-code-best-practices)
- [Hướng dẫn cấu hình đầy đủ Claude Code](https://juejin.cn/post/7576838552472043563)

### Hướng dẫn phát triển

- [Hướng dẫn thực hành máy chủ MCP cho người mới bắt đầu bằng TypeScript và Python](https://m.blog.csdn.net/ztt123654/article/details/150844207)
- [Hướng dẫn xây dựng máy chủ MCP tối thượng: hướng dẫn TypeScript và Python đầy đủ](https://m.blog.csdn.net/gitblog_00703/article/details/154862128)
- [Xây dựng máy chủ MCP đơn giản nhất bằng TypeScript](https://m.blog.csdn.net/weixin_45653525/article/details/148433757)
- [Tạo máy chủ MCP TypeScript bằng ứng dụng container Azure](https://learn.microsoft.com/zh-cn/azure/developer/ai/build-mcp-server-ts)

### Tài nguyên máy chủ MCP

- [Awesome MCP Servers](https://github.com/punkpeye/awesome-mcp-servers) - danh sách máy chủ MCP toàn diện nhất
- [Official MCP Registry](https://registry.modelcontextprotocol.io) - cửa hàng ứng dụng chính thức của Anthropic
- [MCP.so](https://mcp.so) - trung tâm máy chủ MCP cộng đồng
- [Glama.ai MCP](https://glama.ai/mcp/servers) - thư mục MCP với đánh giá và bình luận
- [Smithery](https://smithery.ai) - marketplace máy chủ MCP
- [MCPHub](https://mcphub.io/registry) - thư mục giao diện sạch
- [LobeHub MCP](https://lobehub.com/zh/mcp) - thư mục MCP tiếng Trung

### Dịch vụ bản đồ và thời tiết

- [Máy chủ MCP Amap](https://lobehub.com/zh/mcp/luozengchang-mcp-amap)
- [Tài liệu MCP Dịch vụ Vị trí Tencent](https://lbs.qq.com/service/MCPServer/MCPServerGuide/overview)
- [Máy chủ MCP Thời tiết Caiyun](https://github.com/caiyunapp/mcp-caiyun-weather)
- [Máy chủ MCP OpenWeatherMap](https://github.com/CodeByWaqas/weather-mcp-server)

### Tài nguyên cộng đồng

- [Everything Claude Code Config](https://github.com/affaan-m/everything-claude-code) - bộ sưu tập cấu hình Claude Code cấp sản xuất
- [AI Coding Guide](https://github.com/hacket/AICodingGuide) - lộ trình học tập tiếng Trung cho Claude Code

### Trường hợp ứng dụng thực tế

- [BlenderMCP - Mô hình 3D dựa trên AI](https://github.com/Belthur/blender-mcp) - 4,100+ ⭐
- [15 thực hành tốt nhất cho MCP trong sản xuất](https://learn.microsoft.com/zh-cn/azure/azure-functions/scenario-mcp-apps)
