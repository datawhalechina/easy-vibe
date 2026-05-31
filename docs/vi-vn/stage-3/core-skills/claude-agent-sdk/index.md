# Hướng Dẫn Hoàn Chỉnh Về Claude Agent SDK

## Giới thiệu

Bạn có thể đã sử dụng API cơ bản của Claude: gửi một tin nhắn, nhận một câu trả lời, giống như trò chuyện. Nhưng nếu bạn muốn Claude giúp bạn đọc file, chạy lệnh, tìm kiếm mã, sửa lỗi, tự xác minh kết quả và tiếp tục lặp lại, loại "công việc tự chủ" này không phải là điều API cơ bản có thể làm.

Claude Agent SDK được xây dựng chính xác cho kịch bản này. Nó đóng gói tất cả khả năng của Claude Code - đọc và ghi file, thực thi lệnh, tìm kiếm mã, chỉnh sửa file, duyệt web - thành một thư viện có thể lập trình. Bạn không cần phải tự viết vòng lặp gọi công cụ. Claude có thể tự chủ thực thi công cụ và tự chủ lặp lại cho đến khi tác vụ thực sự hoàn thành.

Tóm tắt một câu: SDK cơ bản là "bạn hỏi, nó trả lời"; Agent SDK là "bạn giao việc, nó làm việc."

---

## Sự Khác Biệt So Với SDK Cơ Bản Là Gì?

Nhìn vào mã trước và sự khác biệt sẽ rõ ràng:

```python
# SDK anthropic cơ bản: bạn phải tự viết vòng lặp để xử lý lệnh gọi công cụ
import anthropic

client = anthropic.Anthropic()
response = client.messages.create(
    model="claude-sonnet-4-6",
    max_tokens=1024,
    messages=[{"role": "user", "content": "Sửa lỗi trong auth.py"}],
    tools=[...]  # Bạn phải tự định nghĩa công cụ
)
# Claude yêu cầu gọi một số công cụ
while response.stop_reason == "tool_use":
    result = your_tool_executor(response.tool_use)  # Bạn phải tự thực thi
    response = client.messages.create(tool_result=result, **params)  # Bạn phải tự phản hồi
```

```python
# Agent SDK: một khối là xong, Claude tự đọc file, tìm lỗi và chỉnh sửa mã
from claude_agent_sdk import query, ClaudeAgentOptions

async for message in query(
    prompt="Sửa lỗi trong auth.py",
    options=ClaudeAgentOptions(allowed_tools=["Read", "Edit", "Bash"]),
):
    print(message)  # Claude tự đọc file, xác định vấn đề và chỉnh sửa mã
```

Sự khác biệt rất rõ ràng:

| Mục So Sánh | SDK anthropic cơ bản | Claude Agent SDK |
|--------|-------------------|-----------------|
| Thực thi công cụ | Bạn triển khai | Claude xử lý |
| Vòng lặp công cụ | Bạn triển khai | Vòng lặp agent tích hợp sẵn |
| Công cụ tích hợp | Không, tất cả tự định nghĩa | Đọc/ghi file, Bash, tìm kiếm và nhiều hơn nữa sẵn dùng |
| Quản lý ngữ cảnh | Bạn duy trì | Tự nén và tự quản lý |
| Phù hợp nhất | Trò chuyện, tạo, sử dụng công cụ đơn giản | Tự chủ hoàn thành tác vụ phức tạp |

---

## Khác Biệt So Với Các Framework Agent Khác Thế Nào?

Có nhiều framework Agent trên thị trường - LangChain, LlamaIndex, CrewAI, AutoGPT và nhiều hơn nữa. Điểm độc đáo của Claude Agent SDK so với chúng là gì?

> 📚 **Để so sánh chi tiết, xem phụ lục**: [So Sánh Framework Agent Chủ Lưu](/vi-vn/appendix/8-artificial-intelligence/ai-agents.html)

Nói ngắn gọn:

| Framework | Kịch Bản Phù Hợp Nhất |
|------|-------------|
| **Claude Agent SDK** | Để Claude tự chủ hoàn thành lập trình, thao tác file và thực thi lệnh |
| **LangChain** | Xây dựng ứng dụng AI tổng hợp phức tạp với luồng tùy chỉnh cao |
| **CrewAI** | Mô phỏng kịch bản hợp tác đa vai trò (đội ảo, đóng vai) |
| **LlamaIndex** | Xây dựng hệ thống hỏi đáp cơ sở tri thức kết nối dữ liệu doanh nghiệp với LLM |

---

## Cài Đặt và Cấu Hình

### Cài đặt

Python cần 3.10+ và TypeScript cần Node.js 18+:

```bash
# Python
pip install claude-agent-sdk

# TypeScript
npm install @anthropic-ai/claude-agent-sdk
```

### Xác thực

Chỉ cần đặt biến môi trường API key:

```bash
export ANTHROPIC_API_KEY=your-api-key
```

Xác thực nền tảng đám mây cũng được hỗ trợ:
- AWS Bedrock: đặt `CLAUDE_CODE_USE_BEDROCK=1` + thông tin xác thực AWS
- Google Vertex AI: đặt `CLAUDE_CODE_USE_VERTEX=1` + thông tin xác thực GCP
- Microsoft Azure: đặt `CLAUDE_CODE_USE_FOUNDRY=1` + thông tin xác thực Azure

### API Endpoint tùy chỉnh

Nếu bạn sử dụng proxy, gateway hoặc API endpoint tự lưu trữ, bạn có thể thay đổi URL API mặc định thông qua tham số `env`:

```python
from claude_agent_sdk import query, ClaudeAgentOptions

async for message in query(
    prompt="Xin chào",
    options=ClaudeAgentOptions(
        env={
            "ANTHROPIC_BASE_URL": "https://your-proxy.example.com",
            "ANTHROPIC_API_KEY": "your-api-key",
        }
    ),
):
    print(message)
```

`ClaudeAgentOptions` không có tham số `base_url` trực tiếp, nhưng trường `env` có thể truyền các biến môi trường tùy ý vào CLI Claude Code bên dưới. Các biến môi trường phổ biến:

| Biến Môi Trường | Mục đích |
|---------|------|
| `ANTHROPIC_BASE_URL` | API endpoint tùy chỉnh (proxy, gateway) |
| `ANTHROPIC_API_KEY` | API key |
| `ANTHROPIC_AUTH_TOKEN` | Token xác thực thay thế |
| `ANTHROPIC_CUSTOM_HEADERS` | Tiêu đề yêu cầu tùy chỉnh |

---

## Khái Niệm Cốt Lõi

Nguyên lý runtime của Agent SDK có thể được tóm tắt trong một câu: **thu thập ngữ cảnh -> thực thi hành động -> xác minh kết quả -> lặp lại**.

Đây chính xác là cách các nhà phát triển con người làm việc: đọc mã trước, sau đó sửa đổi mã, sau đó chạy test và kiểm tra kết quả. Nếu sai, tiếp tục lặp lại. Agent SDK tự động hóa vòng lặp này.

### Hai Chế Độ Sử Dụng

**Chế độ 1: hàm `query()` - không trạng thái, phù hợp cho tác vụ một lần**

```python
import asyncio
from claude_agent_sdk import query, ClaudeAgentOptions

async def main():
    async for message in query(
        prompt="Có những file nào trong thư mục này?",
        options=ClaudeAgentOptions(allowed_tools=["Bash", "Glob"]),
    ):
        if hasattr(message, "result"):
            print(message.result)

asyncio.run(main())
```

**Chế độ 2: `ClaudeSDKClient` - có trạng thái, phù hợp cho hội thoại đa lượt**

Sử dụng khi bạn cần giữ ngữ cảnh và tương tác qua nhiều lượt. Ví dụ, đầu tiên yêu cầu Claude đọc một module, sau đó yêu cầu tìm tất cả điểm gọi của module đó - ở lượt thứ hai nó vẫn nhớ những gì đã đọc ở lượt đầu tiên.

```python
import asyncio
from claude_agent_sdk import query, ClaudeAgentOptions

async def main():
    session_id = None

    # Lượt 1: đọc module xác thực
    async for message in query(
        prompt="Đọc mã module xác thực",
        options=ClaudeAgentOptions(allowed_tools=["Read", "Glob"]),
    ):
        if hasattr(message, "subtype") and message.subtype == "init":
            session_id = message.session_id

    # Lượt 2: tiếp tục dựa trên ngữ cảnh trước
    async for message in query(
        prompt="Tìm tất cả nơi gọi nó",
        options=ClaudeAgentOptions(resume=session_id),
    ):
        if hasattr(message, "result"):
            print(message.result)

asyncio.run(main())
```

---

## Công Cụ Tích Hợp: Sẵn Sàng Sử Dụng

Đây là một trong những phần tốt nhất của Agent SDK - bạn không cần tự triển khai bất kỳ công cụ nào, Claude có thể sử dụng chúng trực tiếp:

| Công cụ | Khả năng | Sử dụng điển hình |
|------|------|---------|
| Read | Đọc file | Xem mã, đọc cấu hình |
| Write | Tạo file | Tạo file mới |
| Edit | Chỉnh sửa file chính xác | Sửa lỗi, tái cấu trúc |
| Bash | Chạy lệnh terminal | Chạy test, cài đặt phụ thuộc, thao tác git |
| Glob | Tìm kiếm file theo mẫu | `**/*.py`, `src/**/*.ts` |
| Grep | Tìm kiếm nội dung regex | Tìm định nghĩa hàm, TODOs |
| WebSearch | Tìm kiếm trang web | Tra cứu tài liệu, tìm phương pháp |
| WebFetch | Lấy nội dung web | Đọc tài liệu trực tuyến |
| Task | Khởi chạy sub-agent | Song song hóa sub-tác vụ |

Sử dụng `allowed_tools` để kiểm soát công cụ nào agent có thể sử dụng:

```python
# Agent chỉ đọc: có thể kiểm tra nhưng không thể sửa đổi
options = ClaudeAgentOptions(
    allowed_tools=["Read", "Glob", "Grep"],
    permission_mode="bypassPermissions"
)

# Agent đầy đủ: có thể đọc, ghi và thực thi lệnh
options = ClaudeAgentOptions(
    allowed_tools=["Read", "Write", "Edit", "Bash", "Glob", "Grep"]
)
```

---

## Tính Năng Nâng Cao

### Hooks: Chèn Logic Của Bạn Tại Các Điểm Quan Trọng

Hooks cho phép bạn chèn mã tùy chỉnh tại các thời điểm quan trọng của quá trình thực thi agent - ví dụ, ghi log, chặn các thao tác rủi ro và kiểm toán thay đổi file.

Các loại hook được hỗ trợ bao gồm: `PreToolUse` (trước khi thực thi công cụ), `PostToolUse` (sau khi thực thi công cụ), `Stop` (khi agent dừng), `SessionStart`, `SessionEnd` và nhiều hơn nữa.

```python
from datetime import datetime
from claude_agent_sdk import query, ClaudeAgentOptions, HookMatcher

# Ghi log kiểm toán mỗi khi một file được sửa đổi
async def log_file_change(input_data, tool_use_id, context):
    file_path = input_data.get("tool_input", {}).get("file_path", "unknown")
    with open("./audit.log", "a") as f:
        f.write(f"{datetime.now()}: đã sửa đổi {file_path}\n")
    return {}

async def main():
    async for message in query(
        prompt="Tái cấu trúc utils.py để dễ đọc hơn",
        options=ClaudeAgentOptions(
            permission_mode="acceptEdits",
            hooks={
                "PostToolUse": [
                    HookMatcher(matcher="Edit|Write", hooks=[log_file_change])
                ]
            },
        ),
    ):
        if hasattr(message, "result"):
            print(message.result)
```

Cách sử dụng thực tế:
- Ghi log kiểm toán: ghi lại mọi thao tác được agent thực hiện
- Chặn an ninh: chặn sửa đổi các file quan trọng
- Thông báo đẩy: gửi tin nhắn khi tác vụ agent hoàn thành
- Giám sát chi phí: đếm lệnh gọi công cụ và sử dụng token

### Sub-Agent: Chia Tác Vụ Lớn Cho Các Chuyên Gia

Khi một tác vụ đủ phức tạp, bạn có thể định nghĩa nhiều sub-agent chuyên biệt và để agent chính giao các sub-tác vụ cho chúng. Mỗi sub-agent có hướng dẫn và quyền công cụ riêng, cách ly với nhau.

```python
from claude_agent_sdk import query, ClaudeAgentOptions, AgentDefinition

async for message in query(
    prompt="Sử dụng agent code-reviewer để đánh giá chất lượng mã của dự án này",
    options=ClaudeAgentOptions(
        allowed_tools=["Read", "Glob", "Grep", "Task"],
        agents={
            "code-reviewer": AgentDefinition(
                description="Người đánh giá mã chuyên nghiệp chịu trách nhiệm đánh giá chất lượng và bảo mật",
                prompt="Phân tích chất lượng mã, xác định các vấn đề tiềm ẩn và cung cấp đề xuất cải thiện.",
                tools=["Read", "Glob", "Grep"],
            ),
            "test-writer": AgentDefinition(
                description="Chuyên gia kiểm thử chịu trách nhiệm viết unit test",
                prompt="Viết unit test cho các hàm thiếu test.",
                tools=["Read", "Write", "Bash"],
            ),
        },
    ),
):
    if hasattr(message, "result"):
        print(message.result)
```

Tin nhắn từ sub-agent bao gồm trường `parent_tool_use_id`, giúp dễ dàng theo dõi tin nhắn nào đến từ sub-agent nào.

### Tích Hợp MCP: Kết Nối Với Thế Giới Bên Ngoài

Thông qua Model Context Protocol (MCP), agent của bạn có thể kết nối với các hệ thống bên ngoài như cơ sở dữ liệu, trình duyệt và API bên thứ ba. Cộng đồng đã cung cấp [hàng trăm MCP server](https://github.com/modelcontextprotocol/servers) bạn có thể sử dụng trực tiếp.

```python
# Kết nối Playwright để agent có thể điều khiển trình duyệt
async for message in query(
    prompt="Mở example.com và mô tả những gì bạn thấy",
    options=ClaudeAgentOptions(
        mcp_servers={
            "playwright": {
                "command": "npx",
                "args": ["@playwright/mcp@latest"]
            }
        }
    ),
):
    if hasattr(message, "result"):
        print(message.result)
```

Các kịch bản tích hợp MCP phổ biến:
- Playwright: tự động hóa trình duyệt, thu thập trang, điền biểu mẫu
- PostgreSQL/MySQL: truy vấn và thao tác cơ sở dữ liệu trực tiếp
- Slack/Email: gửi thông báo và tin nhắn
- GitHub: thao tác PR, Issue và kho lưu trữ

---

## Bạn Có Thể Xây Dựng Gì? Các Kịch Bản Thực Tế

Sau khi hiểu các tính năng, câu hỏi quan trọng nhất là: điều này thực sự có thể làm gì? Dưới đây là các kịch bản thực tế đã được cộng đồng xác minh.

### Kịch bản 1: Agent Tự Động Sửa Lỗi

Đưa cho nó mô tả lỗi và nó có thể tìm mã, xác định vấn đề, sửa nó và chạy test để xác minh:

```python
async for message in query(
    prompt="Người dùng báo cáo lỗi HTTP 500 thỉnh thoảng xảy ra khi đăng nhập. Điều tra và sửa mã trong src/auth/",
    options=ClaudeAgentOptions(
        allowed_tools=["Read", "Edit", "Bash", "Glob", "Grep"],
        permission_mode="acceptEdits",
    ),
):
    print(message)
```

Claude sẽ grep log, đọc mã liên quan, tìm lỗi, sửa đổi mã và chạy test để xác nhận sửa chữa.

### Kịch bản 2: Agent Đánh Giá Mã

Xây dựng agent đánh giá mã chỉ đọc kiểm toán chất lượng mà không thực hiện bất kỳ sửa đổi nào:

```python
async for message in query(
    prompt="Đánh giá mã trong src/ tập trung vào lỗ hổng bảo mật, vấn đề hiệu suất và quy ước lập trình",
    options=ClaudeAgentOptions(
        allowed_tools=["Read", "Glob", "Grep"],
        permission_mode="bypassPermissions",
    ),
):
    if hasattr(message, "result"):
        print(message.result)
```

### Kịch bản 3: Tích Hợp CI/CD

Trong quy trình CI, để agent phân tích test thất bại và thử sửa tự động:

```python
async for message in query(
    prompt="Chạy npm test, phân tích các trường hợp test thất bại và sửa mã để tất cả test vượt qua",
    options=ClaudeAgentOptions(
        allowed_tools=["Read", "Edit", "Bash", "Glob"],
        max_turns=20,
    ),
):
    print(message)
```

Đây là lợi thế lớn của Agent SDK so với CLI - CLI tốt khi có người ngồi ở terminal, trong khi SDK lý tưởng để nhúng vào quy trình tự động.

### Kịch bản 4: Agent Nghiên Cứu

Để agent tìm kiếm web, đọc tài liệu, tổng hợp thông tin và tạo báo cáo:

```python
async for message in query(
    prompt="Nghiên cứu các framework Web Python chủ lưu trong năm 2026. So sánh FastAPI, Django và Litestar, sau đó viết báo cáo lựa chọn kỹ thuật vào report.md",
    options=ClaudeAgentOptions(
        allowed_tools=["WebSearch", "WebFetch", "Write"],
    ),
):
    print(message)
```

### Kịch bản 5: Agent Full-Stack Với Khả Năng Trình Duyệt

Bằng cách kết nối Playwright qua MCP, agent không chỉ có thể viết mã mà còn mở trình duyệt để xác minh kết quả:

```python
async for message in query(
    prompt="Sửa lỗi kiểu trang chủ, sau đó mở trình duyệt và chụp màn hình để xác minh kết quả",
    options=ClaudeAgentOptions(
        allowed_tools=["Read", "Edit", "Bash"],
        mcp_servers={
            "playwright": {
                "command": "npx",
                "args": ["@playwright/mcp@latest"]
            }
        },
    ),
):
    print(message)
```

### Tham Chiếu Nhanh Kịch Bản

| Kịch bản | Công Cụ Cốt Lõi | Độ Khó |
|------|---------|------|
| Tự động sửa lỗi | Read, Edit, Bash, Grep | Người mới bắt đầu |
| Đánh giá mã | Read, Glob, Grep | Người mới bắt đầu |
| Tự động sửa CI/CD | Read, Edit, Bash | Trung cấp |
| Báo cáo nghiên cứu kỹ thuật | WebSearch, WebFetch, Write | Người mới bắt đầu |
| Tự động hóa trình duyệt | MCP (Playwright) | Trung cấp |
| Hợp tác đa agent | Task + AgentDefinition | Nâng cao |
| Thao tác cơ sở dữ liệu | MCP (PostgreSQL/MySQL) | Trung cấp |
| Trợ lý email/thông báo | MCP (Slack/Email) | Trung cấp |

---

## Khi Nào Nên Sử Dụng Agent SDK?

Không phải kịch bản nào cũng cần Agent SDK. Việc chọn đúng công cụ là quan trọng:

| Những Gì Bạn Muốn Làm | Công Cụ Khuyến Nghị |
|-----------|---------|
| Trò chuyện đơn giản, tạo văn bản, dịch | SDK `anthropic` cơ bản |
| Sử dụng công cụ một lần (tra cứu thời tiết, tính toán) | SDK `anthropic` cơ bản |
| Tự chủ hoàn thành tác vụ phát triển đa bước | Agent SDK |
| Nhúng vào quy trình CI/CD | Agent SDK |
| Xây dựng ứng dụng thao tác trên hệ thống file | Agent SDK |
| Phát triển tương tác hàng ngày | Claude Code CLI |
| Tác vụ nhanh một lần | Claude Code CLI |

Tóm lại: nếu tác vụ của bạn yêu cầu Claude "làm việc thực tế" tự chủ (đọc file, chỉnh sửa mã, chạy lệnh), sử dụng Agent SDK. Nếu bạn chỉ cần hỏi đáp, SDK cơ bản là đủ.

---

## Thực Hành Doanh Nghiệp: Xây Dựng Quy Trình Rào Chắn Chất Lượng Mã

Các kịch bản trước đều sử dụng một agent cho một việc. Trong môi trường doanh nghiệp thực tế, những gì bạn cần là một quy trình hoàn chỉnh - nhiều agent được xâu chuỗi với nhau, mỗi giai đoạn có đầu vào/đầu ra rõ ràng, cộng với kiểm toán, quay lại và thông báo.

Bây giờ chúng ta sẽ xây dựng một kịch bản thực tế: sau mỗi lần nộp PR, tự động kích hoạt **đánh giá mã -> quét bảo mật -> tự động sửa -> xác minh test -> tạo báo cáo** như một quy trình hoàn chỉnh.

### Thiết Kế Kiến Trúc

```text
PR được nộp
  │
  ▼
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│  Đánh giá   │───▶│  Quét       │───▶│  Tự động    │
│  mã         │    │  bảo mật    │    │  sửa chữa   │
│  Agent      │    │  Agent      │    │  Agent      │
│ (chỉ đọc)   │    │ (chỉ đọc)   │    │ (có thể ghi)│
└─────────────┘    └─────────────┘    └─────────────┘
                                            │
                                            ▼
                                     ┌─────────────┐    ┌─────────────┐
                                     │ Xác minh    │───▶│ Tạo báo cáo │
                                     │ test        │    │ Agent       │
                                     │ Agent       │    │ (Write)     │
                                     │   (Bash)    │    └─────────────┘
                                     └─────────────┘            │
                                                               ▼
                                                        Thông báo Slack
```

Ý tưởng cốt lõi: **mỗi agent làm một việc, quyền hạn được tối thiểu hóa và kết quả được truyền tuần tự**.

### Bước 1: Định Nghĩa Khung Quy Trình

```python
import asyncio
import json
from datetime import datetime
from claude_agent_sdk import query, ClaudeAgentOptions, HookMatcher

# Log kiểm toán: ghi lại mọi thao tác của mọi agent
audit_log = []

async def audit_hook(input_data, tool_use_id, context):
    audit_log.append({
        "time": datetime.now().isoformat(),
        "tool": input_data.get("tool_name"),
        "input": input_data.get("tool_input", {}),
    })
    return {}

# Cấu hình hook dùng chung: tất cả agent chia sẻ khả năng kiểm toán
audit_hooks = {
    "PostToolUse": [HookMatcher(matcher=".*", hooks=[audit_hook])]
}
```

### Bước 2: Agent Đánh Giá Mã (Chỉ Đọc)

```python
async def run_code_review(pr_diff: str) -> str:
    """Agent chỉ đọc, đánh giá chất lượng mã và xuất báo cáo có cấu trúc"""
    result_text = ""
    async for message in query(
        prompt=f"""Đánh giá PR diff sau từ các khía cạnh sau:
1. Quy ước mã: đặt tên, định dạng, bình luận
2. Vấn đề logic: trường hợp biên, rủi ro con trỏ null, điều kiện chạy đua
3. Rủi ro hiệu suất: truy vấn N+1, rò rỉ bộ nhớ, vòng lặp không cần thiết
4. Khả năng bảo trì: hàm quá lớn, trách nhiệm không rõ ràng, số ma thuật

PR Diff:
{pr_diff}

Xuất định dạng JSON: {{"issues": [{{"severity": "high/medium/low", "file": "...", "line": ..., "description": "..."}}], "summary": "..."}}""",
        options=ClaudeAgentOptions(
            allowed_tools=["Read", "Glob", "Grep"],
            permission_mode="bypassPermissions",
            hooks=audit_hooks,
            max_turns=10,
        ),
    ):
        if hasattr(message, "result"):
            result_text = message.result
    return result_text
```

### Bước 3: Agent Quét Bảo Mật (Chỉ Đọc)

```python
async def run_security_scan() -> str:
    """Agent chỉ đọc tập trung vào quét lỗ hổng"""
    result_text = ""
    async for message in query(
        prompt="""Quét mã dự án tìm lỗ hổng bảo mật:
1. SQL injection, XSS, CSRF
2. Khóa hoặc thông tin xác thực được mã hóa cứng
3. Phiên bản phụ thuộc không an toàn
4. Thiếu kiểm tra quyền

Xuất JSON: {{"vulnerabilities": [{{"severity": "critical/high/medium", "type": "...", "file": "...", "description": "...", "fix_suggestion": "..."}}]}}""",
        options=ClaudeAgentOptions(
            allowed_tools=["Read", "Glob", "Grep", "Bash"],
            permission_mode="bypassPermissions",
            hooks=audit_hooks,
            max_turns=15,
        ),
    ):
        if hasattr(message, "result"):
            result_text = message.result
    return result_text
```

### Bước 4: Agent Tự Động Sửa (Có Thể Ghi)

```python
async def run_auto_fix(review_result: str, security_result: str) -> str:
    """Agent có thể ghi tự động sửa mã dựa trên kết quả đánh giá và quét"""
    result_text = ""
    async for message in query(
        prompt=f"""Sửa mã theo kết quả đánh giá sau:

Báo cáo đánh giá mã:
{review_result}

Báo cáo quét bảo mật:
{security_result}

Quy tắc sửa:
1. Chỉ sửa vấn đề có mức độ nghiêm trọng cao hoặc nghiêm trọng
2. Chạy các test liên quan sau mỗi thay đổi để đảm bảo không làm hỏng chức năng hiện có
3. Không tái cấu trúc mã không liên quan, chỉ áp dụng sửa chữa tối thiểu
4. Xuất danh sách các file đã sửa đổi sau khi hoàn thành""",
        options=ClaudeAgentOptions(
            allowed_tools=["Read", "Edit", "Bash", "Glob", "Grep"],
            permission_mode="acceptEdits",
            hooks=audit_hooks,
            max_turns=30,
        ),
    ):
        if hasattr(message, "result"):
            result_text = message.result
    return result_text
```

### Bước 5: Xác Minh Test + Tạo Báo Cáo

```python
async def run_test_and_report(fix_result: str) -> str:
    """Chạy test và tạo báo cáo cuối cùng"""
    result_text = ""
    async for message in query(
        prompt=f"""Thực hiện các hành động sau:
1. Chạy toàn bộ bộ test (npm test hoặc pytest)
2. Tính tỷ lệ vượt qua test
3. Tạo báo cáo chất lượng Markdown vào pr-report.md, bao gồm:
   - Số lượng vấn đề phát hiện trong đánh giá mã và phân phối mức độ nghiêm trọng
   - Số lượng lỗ hổng bảo mật
   - Thay đổi tự động sửa: {fix_result}
   - Tỷ lệ vượt qua test
   - Kết luận cuối cùng: có nên khuyến nghị merge không""",
        options=ClaudeAgentOptions(
            allowed_tools=["Read", "Bash", "Write", "Glob"],
            hooks=audit_hooks,
            max_turns=15,
        ),
    ):
        if hasattr(message, "result"):
            result_text = message.result
    return result_text
```

### Bước 6: Xâu Chuỗi Toàn Bộ Quy Trình

```python
import subprocess

async def run_pipeline():
    """Quy trình rào chắn chất lượng PR hoàn chỉnh"""
    print("🔍 Giai đoạn 1/4: đánh giá mã...")
    pr_diff = subprocess.run(
        ["git", "diff", "main...HEAD"], capture_output=True, text=True
    ).stdout
    review_result = await run_code_review(pr_diff)

    print("🛡️ Giai đoạn 2/4: quét bảo mật...")
    security_result = await run_security_scan()

    print("🔧 Giai đoạn 3/4: tự động sửa...")
    fix_result = await run_auto_fix(review_result, security_result)

    print("✅ Giai đoạn 4/4: xác minh test + tạo báo cáo...")
    report = await run_test_and_report(fix_result)

    # Lưu log kiểm toán
    with open("audit-log.json", "w") as f:
        json.dump(audit_log, f, indent=2, ensure_ascii=False)

    print(f"Quy trình hoàn thành, log kiểm toán đã lưu ({len(audit_log)} bản ghi thao tác)")
    return report

asyncio.run(run_pipeline())
```

### Tư Duy Thiết Kế Doanh Nghiệp

Quy trình này phản ánh một số nguyên tắc thiết kế doanh nghiệp chính:

**Đặc quyền tối thiểu**: agent code-review và security-scan chỉ đọc và không thể vô tình sửa đổi mã. Chỉ agent auto-fix có quyền ghi và thậm chí bị giới hạn bởi `acceptEdits`.

**Có thể kiểm toán**: mỗi bước của mọi agent được ghi lại thông qua Hooks. Nếu có gì sai, bạn có thể truy vết agent nào đã làm gì và khi nào.

**Xâu chuỗi kết quả**: đầu ra của mỗi agent trở thành đầu vào của agent tiếp theo. Kết quả đánh giá nuôi tự động sửa; kết quả tự động sửa nuôi xác minh test. Mỗi giai đoạn có hợp đồng đầu vào/đầu ra rõ ràng.

**Kiểm soát chi phí**: mỗi agent có giới hạn `max_turns` để ngăn vòng lặp không kiểm soát. Trong sản xuất, bạn cũng có thể thêm `max_budget_usd` để kiểm soát ngân sách.

**Khả năng mở rộng**: muốn thêm giai đoạn, như "agent kiểm tra tài liệu" hoặc "agent benchmark hiệu suất"? Thêm một hàm mới và chèn vào quy trình.

Mô hình này có thể được nhúng trực tiếp vào GitHub Actions hoặc GitLab CI, tự động kích hoạt trên mỗi PR, thực sự đạt được "rào chắn chất lượng mã do AI điều khiển."

---

## Xử Lý Lỗi

Agent SDK cung cấp các loại ngoại lệ rõ ràng để bạn có thể xây dựng khả năng chịu lỗi mạnh mẽ trong sản xuất:

```python
from claude_agent_sdk import query, CLINotFoundError, ProcessError

try:
    async for msg in query(prompt="Phân tích mã"):
        print(msg)
except CLINotFoundError:
    print("Claude Code CLI chưa được cài đặt. Vui lòng cài đặt trước.")
except ProcessError as e:
    print(f"Tiến trình thoát bất ngờ với mã thoát: {e.exit_code}")
```

---

## Tóm Tắt

Giá trị cốt lõi của Claude Agent SDK là nâng cấp "suy luận mô hình" thành "thực thi được kiểm soát." Nó không chỉ tạo văn bản. Nó có thể thực sự hoàn thành tác vụ trong một hệ thống công cụ có thể kiểm toán và bị giới hạn.

Hãy nhớ một câu từ blog chính thức của Anthropic: triết lý thiết kế Agent SDK là "cho agent một máy tính và để nó làm việc như con người."

Một ứng dụng agent tốt = thiết kế công cụ rõ ràng + ranh giới tác vụ rõ ràng + sự giám sát con người phù hợp. Công cụ cho agent khả năng, ranh giới cho nó giới hạn và giám sát cho bạn sự tự tin. Cả ba đều không thể thiếu.

---

## Tài Liệu Tham Khảo

### Tài nguyên chính thức

- [Agent SDK Tài Liệu Chính Thức](https://platform.claude.com/docs/en/agent-sdk/overview) - tài liệu tham khảo uy tín nhất
- [GitHub - claude-agent-sdk-python](https://github.com/anthropics/claude-code-sdk-python) - nguồn SDK Python
- [GitHub - claude-agent-sdk-typescript](https://github.com/anthropics/claude-agent-sdk-typescript) - nguồn SDK TypeScript
- [Agent SDK Dự Án Demo](https://github.com/anthropics/claude-agent-sdk-demos) - trợ lý email, agent nghiên cứu và nhiều hơn nữa

### Blog và Hướng dẫn

- [Building agents with the Claude Agent SDK](https://claude.com/blog/building-agents-with-the-claude-agent-sdk) - blog kỹ thuật Anthropic về triết lý thiết kế và kiến trúc
- [Claude Agent SDK Python Study Guide](https://redreamality.com/blog/claude-agent-sdk-python-) - hướng dẫn đầy đủ thân thiện từ đầu
- [Claude Agent SDK Full Tutorial](https://blog.wenhaofree.com/en/posts/articles/claude-agent-sdk-tutorial/) - hướng dẫn thực tế về hệ thống công cụ, Agent Loop và thực thi được kiểm soát
- [12 Practical Agent SDK Scenarios](https://skywork.ai/blog/claude-agent-sdk-use-cases-2025/) - bao gồm lập trình, dữ liệu, tự động hóa và nhiều hơn nữa
- [Step-by-Step Agent Tutorial](https://skywork.ai/blog/how-to-use-claude-agent-sdk-step-by-step-ai-agent-tutorial/) - hướng dẫn TypeScript + Python hai hướng
