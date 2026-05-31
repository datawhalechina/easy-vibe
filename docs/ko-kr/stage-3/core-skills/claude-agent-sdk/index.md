# Claude Agent SDK 완전 가이드

## 소개

여러분은 이미 Claude의 기본 API를 사용해 보았을 것입니다: 메시지를 보내고, 답변을 받고, 마치 대화하는 것처럼요. 하지만 Claude가 파일을 읽고, 명령을 실행하고, 코드를 검색하고, 버그를 수정하고, 결과를 직접 확인하고, 계속 반복하기를 원한다면, 이런 "자율적 작업"은 기본 API로 할 수 있는 것이 아닙니다.

Claude Agent SDK는 정확히 이 시나리오를 위해 구축되었습니다. Claude Code의 모든 기능 - 파일 읽기/쓰기, 명령 실행, 코드 검색, 파일 편집, 웹 탐색 - 을 프로그래밍 가능한 라이브러리로 패키징합니다. 도구 호출 루프를 직접 작성할 필요가 없습니다. Claude가 자율적으로 도구를 실행하고 자율적으로 반복하여 작업이 진정으로 완료될 때까지 계속합니다.

한 줄 요약: 기본 SDK는 "질문하면 답변"; Agent SDK는 "작업을 할당하면 작업을 수행"합니다.

---

## 기본 SDK와의 차이점은 무엇인가요?

먼저 코드를 보면 차이가 명확합니다:

```python
# 기본 anthropic SDK: 도구 호출을 처리하기 위해 직접 루프를 작성해야 함
import anthropic

client = anthropic.Anthropic()
response = client.messages.create(
    model="claude-sonnet-4-6",
    max_tokens=1024,
    messages=[{"role": "user", "content": "auth.py의 버그를 수정하세요"}],
    tools=[...]  # 직접 도구를 정의해야 함
)
# Claude가 일부 도구를 호출하려고 함
while response.stop_reason == "tool_use":
    result = your_tool_executor(response.tool_use)  # 직접 실행해야 함
    response = client.messages.create(tool_result=result, **params)  # 직접 피드백해야 함
```

```python
# Agent SDK: 한 블록으로 완료, Claude가 직접 파일을 읽고 버그를 찾고 코드를 편집함
from claude_agent_sdk import query, ClaudeAgentOptions

async for message in query(
    prompt="auth.py의 버그를 수정하세요",
    options=ClaudeAgentOptions(allowed_tools=["Read", "Edit", "Bash"]),
):
    print(message)  # Claude가 직접 파일을 읽고 문제를 찾고 코드를 편집함
```

차이가 명확합니다:

| 비교 항목 | 기본 anthropic SDK | Claude Agent SDK |
|--------|-------------------|-----------------|
| 도구 실행 | 직접 구현 | Claude가 처리 |
| 도구 루프 | 직접 구현 | 내장 에이전트 루프 |
| 내장 도구 | 없음, 모두 직접 정의 | 파일 읽기/쓰기, Bash, 검색 등 바로 사용 가능 |
| 컨텍스트 관리 | 직접 유지 | 자동 압축 및 자동 관리 |
| 가장 적합 | 채팅, 생성, 간단한 도구 사용 | 자율적으로 복잡한 작업 완료 |

---

## 다른 에이전트 프레임워크와의 차이점은?

시장에는 많은 에이전트 프레임워크가 있습니다 - LangChain, LlamaIndex, CrewAI, AutoGPT 등. Claude Agent SDK가 이들과 비교하여 독특한 점은 무엇일까요?

> 📚 **자세한 비교는 부록을 참조하세요**: [주류 에이전트 프레임워크 비교](/ko-kr/appendix/8-artificial-intelligence/ai-agents.html)

간단히 말해:

| 프레임워크 | 가장 적합한 시나리오 |
|------|-------------|
| **Claude Agent SDK** | Claude가 자율적으로 코딩, 파일 작업 및 명령 실행을 완료하게 함 |
| **LangChain** | 고도로 맞춤화된 흐름으로 복잡한 범용 AI 앱 구축 |
| **CrewAI** | 다중 역할 협업 시나리오 시뮬레이션 (가상 팀, 역할극) |
| **LlamaIndex** | 기업 데이터와 LLM을 연결하는 지식 베이스 QA 시스템 구축 |

---

## 설치 및 구성

### 설치

Python은 3.10+가 필요하고 TypeScript는 Node.js 18+가 필요합니다:

```bash
# Python
pip install claude-agent-sdk

# TypeScript
npm install @anthropic-ai/claude-agent-sdk
```

### 인증

API 키 환경 변수만 설정하면 됩니다:

```bash
export ANTHROPIC_API_KEY=your-api-key
```

클라우드 플랫폼 인증도 지원됩니다:
- AWS Bedrock: `CLAUDE_CODE_USE_BEDROCK=1` + AWS 자격 증명 설정
- Google Vertex AI: `CLAUDE_CODE_USE_VERTEX=1` + GCP 자격 증명 설정
- Microsoft Azure: `CLAUDE_CODE_USE_FOUNDRY=1` + Azure 자격 증명 설정

### 사용자 정의 API 엔드포인트

프록시, 게이트웨이 또는 자체 호스팅 API 엔드포인트를 사용하는 경우 `env` 매개변수를 통해 기본 API URL을 변경할 수 있습니다:

```python
from claude_agent_sdk import query, ClaudeAgentOptions

async for message in query(
    prompt="안녕하세요",
    options=ClaudeAgentOptions(
        env={
            "ANTHROPIC_BASE_URL": "https://your-proxy.example.com",
            "ANTHROPIC_API_KEY": "your-api-key",
        }
    ),
):
    print(message)
```

`ClaudeAgentOptions`에는 직접적인 `base_url` 매개변수가 없지만 `env` 필드는 임의의 환경 변수를 기본 Claude Code CLI에 전달할 수 있습니다. 일반적인 환경 변수:

| 환경 변수 | 용도 |
|---------|------|
| `ANTHROPIC_BASE_URL` | 사용자 정의 API 엔드포인트 (프록시, 게이트웨이) |
| `ANTHROPIC_API_KEY` | API 키 |
| `ANTHROPIC_AUTH_TOKEN` | 대체 인증 토큰 |
| `ANTHROPIC_CUSTOM_HEADERS` | 사용자 정의 요청 헤더 |

---

## 핵심 개념

에이전트 SDK 런타임 원리는 한 문장으로 요약할 수 있습니다: **컨텍스트 수집 -> 행동 실행 -> 결과 검증 -> 반복**.

이것은 정확히 인간 개발자가 작업하는 방식입니다: 먼저 코드를 읽고, 코드를 수정한 다음, 테스트를 실행하고 결과를 확인합니다. 틀리면 계속 반복합니다. 에이전트 SDK가 이 루프를 자동화합니다.

### 두 가지 사용 모드

**모드 1: `query()` 함수 - 무상태, 일회성 작업에 적합**

```python
import asyncio
from claude_agent_sdk import query, ClaudeAgentOptions

async def main():
    async for message in query(
        prompt="이 디렉토리에 어떤 파일이 있나요?",
        options=ClaudeAgentOptions(allowed_tools=["Bash", "Glob"]),
    ):
        if hasattr(message, "result"):
            print(message.result)

asyncio.run(main())
```

**모드 2: `ClaudeSDKClient` - 상태 유지, 다중 턴 대화에 적합**

컨텍스트를 유지하고 여러 턴에 걸쳐 상호 작용해야 할 때 사용합니다. 예를 들어, 먼저 Claude에게 한 모듈을 읽으라고 한 다음 해당 모듈의 모든 호출 지점을 찾으라고 요청하면 - 두 번째 턴에서도 첫 번째 턴에서 읽은 것을 기억합니다.

```python
import asyncio
from claude_agent_sdk import query, ClaudeAgentOptions

async def main():
    session_id = None

    # 턴 1: 인증 모듈 읽기
    async for message in query(
        prompt="인증 모듈 코드를 읽어주세요",
        options=ClaudeAgentOptions(allowed_tools=["Read", "Glob"]),
    ):
        if hasattr(message, "subtype") and message.subtype == "init":
            session_id = message.session_id

    # 턴 2: 이전 컨텍스트를 기반으로 계속
    async for message in query(
        prompt="그것을 호출하는 모든 곳을 찾아주세요",
        options=ClaudeAgentOptions(resume=session_id),
    ):
        if hasattr(message, "result"):
            print(message.result)

asyncio.run(main())
```

---

## 내장 도구: 바로 사용 가능

이것이 에이전트 SDK의 가장 좋은 부분 중 하나입니다 - 직접 어떤 도구도 구현할 필요가 없으며 Claude가 직접 사용할 수 있습니다:

| 도구 | 기능 | 일반적인 용도 |
|------|------|---------|
| Read | 파일 읽기 | 코드 보기, 설정 읽기 |
| Write | 파일 생성 | 새 파일 생성 |
| Edit | 정밀한 파일 편집 | 버그 수정, 리팩토링 |
| Bash | 터미널 명령 실행 | 테스트 실행, 종속성 설치, git 작업 |
| Glob | 패턴 기반 파일 검색 | `**/*.py`, `src/**/*.ts` |
| Grep | 정규식 내용 검색 | 함수 정의 찾기, TODOs |
| WebSearch | 웹 페이지 검색 | 문서 찾기, 방법 검색 |
| WebFetch | 웹 콘텐츠 가져오기 | 온라인 문서 읽기 |
| Task | 서브 에이전트 시작 | 서브 작업 병렬화 |

`allowed_tools`를 사용하여 에이전트가 사용할 수 있는 도구를 제어합니다:

```python
# 읽기 전용 에이전트: 검사할 수 있지만 수정할 수 없음
options = ClaudeAgentOptions(
    allowed_tools=["Read", "Glob", "Grep"],
    permission_mode="bypassPermissions"
)

# 완전한 에이전트: 읽기, 쓰기 및 명령 실행 가능
options = ClaudeAgentOptions(
    allowed_tools=["Read", "Write", "Edit", "Bash", "Glob", "Grep"]
)
```

---

## 고급 기능

### Hooks: 핵심 지점에 자신의 로직 삽입

Hooks를 사용하면 에이전트 실행의 중요한 순간에 사용자 정의 코드를 주입할 수 있습니다 - 예: 로깅, 위험한 작업 차단, 파일 변경 감사.

지원되는 훅 유형: `PreToolUse`(도구 실행 전), `PostToolUse`(도구 실행 후), `Stop`(에이전트 중지 시), `SessionStart`, `SessionEnd` 등.

```python
from datetime import datetime
from claude_agent_sdk import query, ClaudeAgentOptions, HookMatcher

# 파일이 수정될 때마다 감사 로그 기록
async def log_file_change(input_data, tool_use_id, context):
    file_path = input_data.get("tool_input", {}).get("file_path", "unknown")
    with open("./audit.log", "a") as f:
        f.write(f"{datetime.now()}: 수정됨 {file_path}\n")
    return {}

async def main():
    async for message in query(
        prompt="utils.py를 더 읽기 쉽게 리팩토링해 주세요",
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

실제 사용 사례:
- 감사 로깅: 에이전트가 수행한 모든 작업 기록
- 보안 차단: 중요 파일 수정 차단
- 알림 푸시: 에이전트 작업 완료 시 메시지 전송
- 비용 모니터링: 도구 호출 및 토큰 사용량 집계

### 서브 에이전트: 큰 작업을 전문가에게 분배

작업이 충분히 복잡하면 여러 전문 서브 에이전트를 정의하고 메인 에이전트가 서브 작업을 위임할 수 있습니다. 각 서브 에이전트는 자체 지침과 도구 권한을 가지며 서로 격리됩니다.

```python
from claude_agent_sdk import query, ClaudeAgentOptions, AgentDefinition

async for message in query(
    prompt="code-reviewer 에이전트를 사용하여 이 프로젝트의 코드 품질을 검토하세요",
    options=ClaudeAgentOptions(
        allowed_tools=["Read", "Glob", "Grep", "Task"],
        agents={
            "code-reviewer": AgentDefinition(
                description="품질 및 보안 검토를 담당하는 전문 코드 리뷰어",
                prompt="코드 품질을 분석하고 잠재적 문제를 식별하며 개선 제안을 제공하세요.",
                tools=["Read", "Glob", "Grep"],
            ),
            "test-writer": AgentDefinition(
                description="단위 테스트 작성을 담당하는 테스트 전문가",
                prompt="테스트가 누락된 함수에 대한 단위 테스트를 작성하세요.",
                tools=["Read", "Write", "Bash"],
            ),
        },
    ),
):
    if hasattr(message, "result"):
        print(message.result)
```

서브 에이전트의 메시지는 `parent_tool_use_id` 필드를 포함하여 어떤 메시지가 어떤 서브 에이전트에서 왔는지 추적하기 쉽습니다.

### MCP 통합: 외부 세계와 연결

Model Context Protocol(MCP)을 통해 에이전트는 데이터베이스, 브라우저 및 타사 API와 같은 외부 시스템에 연결할 수 있습니다. 커뮤니티는 이미 [수백 개의 MCP 서버](https://github.com/modelcontextprotocol/servers)를 제공하여 바로 사용할 수 있습니다.

```python
# Playwright를 연결하여 에이전트가 브라우저를 조작할 수 있게 함
async for message in query(
    prompt="example.com을 열고 보이는 것을 설명하세요",
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

일반적인 MCP 통합 시나리오:
- Playwright: 브라우저 자동화, 페이지 스크래핑, 양식 작성
- PostgreSQL/MySQL: 직접 데이터베이스 쿼리 및 작업
- Slack/Email: 알림 및 메시지 전송
- GitHub: PR, Issue 및 저장소 작업

---

## 무엇을 구축할 수 있나요? 실용적인 시나리오

기능을 이해한 후 가장 중요한 질문은: 이것으로 실제로 무엇을 할 수 있나요? 다음은 커뮤니티에서 검증된 실제 시나리오입니다.

### 시나리오 1: 자동 버그 수정 에이전트

버그 설명을 제공하면 코드를 찾고, 문제를 파악하고, 수정하고, 테스트를 실행하여 확인합니다:

```python
async for message in query(
    prompt="사용자가 로그인 중 간헐적인 HTTP 500 오류를 보고합니다. src/auth/의 코드를 조사하고 수정하세요",
    options=ClaudeAgentOptions(
        allowed_tools=["Read", "Edit", "Bash", "Glob", "Grep"],
        permission_mode="acceptEdits",
    ),
):
    print(message)
```

Claude가 로그를 grep하고, 관련 코드를 읽고, 버그를 찾고, 코드를 수정하고, 테스트를 실행하여 수정을 확인합니다.

### 시나리오 2: 코드 리뷰 에이전트

수정 없이 품질을 감사하는 읽기 전용 코드 리뷰 에이전트를 구축합니다:

```python
async for message in query(
    prompt="src/의 코드를 보안 취약점, 성능 문제 및 코딩 규칙에 중점을 두고 검토하세요",
    options=ClaudeAgentOptions(
        allowed_tools=["Read", "Glob", "Grep"],
        permission_mode="bypassPermissions",
    ),
):
    if hasattr(message, "result"):
        print(message.result)
```

### 시나리오 3: CI/CD 통합

CI 파이프라인에서 에이전트가 실패한 테스트를 분석하고 자동 수정을 시도합니다:

```python
async for message in query(
    prompt="npm test를 실행하고, 실패한 테스트 케이스를 분석하고, 모든 테스트가 통과하도록 코드를 수정하세요",
    options=ClaudeAgentOptions(
        allowed_tools=["Read", "Edit", "Bash", "Glob"],
        max_turns=20,
    ),
):
    print(message)
```

이것이 CLI보다 SDK의 큰 장점입니다 - CLI는 사람이 터미널에 앉아 있을 때 좋지만 SDK는 자동화된 워크플로에 임베딩하기에 이상적입니다.

### 시나리오 4: 연구 에이전트

에이전트가 웹을 검색하고, 문서를 읽고, 정보를 종합하여 보고서를 작성합니다:

```python
async for message in query(
    prompt="2026년 주류 Python 웹 프레임워크를 연구하세요. FastAPI, Django 및 Litestar를 비교하고 기술 선택 보고서를 report.md에 작성하세요",
    options=ClaudeAgentOptions(
        allowed_tools=["WebSearch", "WebFetch", "Write"],
    ),
):
    print(message)
```

### 시나리오 5: 브라우저 기능을 갖춘 풀스택 에이전트

MCP를 통해 Playwright를 연결하면 에이전트는 코드를 작성할 뿐만 아니라 브라우저를 열어 결과를 확인할 수 있습니다:

```python
async for message in query(
    prompt="홈페이지 스타일 문제를 수정하고 브라우저를 열어 스크린샷을 찍어 결과를 확인하세요",
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

### 시나리오 빠른 참조

| 시나리오 | 핵심 도구 | 난이도 |
|------|---------|------|
| 자동 버그 수정 | Read, Edit, Bash, Grep | 초급 |
| 코드 리뷰 | Read, Glob, Grep | 초급 |
| CI/CD 자동 수정 | Read, Edit, Bash | 중급 |
| 기술 연구 보고서 | WebSearch, WebFetch, Write | 초급 |
| 브라우저 자동화 | MCP (Playwright) | 중급 |
| 다중 에이전트 협업 | Task + AgentDefinition | 고급 |
| 데이터베이스 작업 | MCP (PostgreSQL/MySQL) | 중급 |
| 이메일/알림 어시스턴트 | MCP (Slack/Email) | 중급 |

---

## 에이전트 SDK를 언제 사용해야 하나요?

모든 시나리오가 에이전트 SDK를 필요로 하는 것은 아닙니다. 올바른 도구 선택이 중요합니다:

| 하고 싶은 것 | 권장 도구 |
|-----------|---------|
| 간단한 채팅, 텍스트 생성, 번역 | 기본 `anthropic` SDK |
| 일회성 도구 사용 (날씨 조회, 계산) | 기본 `anthropic` SDK |
| 자율적으로 다단계 개발 작업 완료 | 에이전트 SDK |
| CI/CD 파이프라인에 임베딩 | 에이전트 SDK |
| 파일 시스템에서 작동하는 앱 구축 | 에이전트 SDK |
| 일상적인 대화형 개발 | Claude Code CLI |
| 일회성 빠른 작업 | Claude Code CLI |

요약하자면: 작업이 Claude가 스스로 "직접 작업"하기를 필요로 하는 경우(파일 읽기, 코드 편집, 명령 실행) 에이전트 SDK를 사용하세요. Q&A만 필요하다면 기본 SDK로 충분합니다.

---

## 엔터프라이즈 실습: 코드 품질 가드레일 파이프라인 구축

이전 시나리오들은 모두 하나의 에이전트가 하나의 작업을 수행했습니다. 실제 엔터프라이즈 환경에서 필요한 것은 완전한 파이프라인입니다 - 여러 에이전트가 연결되고 각 단계에 명확한 입출력이 있으며 감사, 롤백 및 알림이 추가됩니다.

이제 실제 시나리오를 구축하겠습니다: 각 PR 제출 후 자동으로 **코드 리뷰 -> 보안 스캔 -> 자동 수정 -> 테스트 검증 -> 보고서 생성**을 완전한 파이프라인으로 트리거합니다.

### 아키텍처 설계

```text
PR 제출됨
  │
  ▼
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│  코드 리뷰  │───▶│  보안 스캔  │───▶│  자동 수정  │
│  에이전트   │    │  에이전트   │    │  에이전트   │
│ (읽기 전용) │    │ (읽기 전용) │    │ (쓰기 가능) │
└─────────────┘    └─────────────┘    └─────────────┘
                                            │
                                            ▼
                                     ┌─────────────┐    ┌─────────────┐
                                     │ 테스트 검증 │───▶│ 보고서 생성 │
                                     │  에이전트   │    │  에이전트   │
                                     │   (Bash)    │    │   (Write)   │
                                     └─────────────┘    └─────────────┘
                                                              │
                                                              ▼
                                                       Slack 알림
```

핵심 아이디어: **각 에이전트는 한 가지 일만 하고, 권한은 최소화되며, 결과는 순차적으로 전달됩니다**.

### 1단계: 파이프라인 프레임워크 정의

```python
import asyncio
import json
from datetime import datetime
from claude_agent_sdk import query, ClaudeAgentOptions, HookMatcher

# 감사 로그: 모든 에이전트의 모든 작업 기록
audit_log = []

async def audit_hook(input_data, tool_use_id, context):
    audit_log.append({
        "time": datetime.now().isoformat(),
        "tool": input_data.get("tool_name"),
        "input": input_data.get("tool_input", {}),
    })
    return {}

# 공유 훅 구성: 모든 에이전트가 감사 기능 공유
audit_hooks = {
    "PostToolUse": [HookMatcher(matcher=".*", hooks=[audit_hook])]
}
```

### 2단계: 코드 리뷰 에이전트 (읽기 전용)

```python
async def run_code_review(pr_diff: str) -> str:
    """읽기 전용 에이전트, 코드 품질을 검토하고 구조화된 보고서 출력"""
    result_text = ""
    async for message in query(
        prompt=f"""다음 PR diff를 다음 차원에서 검토하세요:
1. 코드 규칙: 명명, 포매팅, 주석
2. 로직 문제: 엣지 케이스, 널 포인터 위험, 레이스 컨디션
3. 성능 위험: N+1 쿼리, 메모리 누수, 불필요한 루프
4. 유지보수성: 과도하게 큰 함수, 불명확한 책임, 매직 넘버

PR Diff:
{pr_diff}

JSON 형식으로 출력: {{"issues": [{{"severity": "high/medium/low", "file": "...", "line": ..., "description": "..."}}], "summary": "..."}}""",
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

### 3단계: 보안 스캔 에이전트 (읽기 전용)

```python
async def run_security_scan() -> str:
    """취약점 스캔에 집중하는 읽기 전용 에이전트"""
    result_text = ""
    async for message in query(
        prompt="""프로젝트 코드에서 보안 취약점을 스캔하세요:
1. SQL injection, XSS, CSRF
2. 하드코딩된 키 또는 자격 증명
3. 안전하지 않은 종속성 버전
4. 누락된 권한 검사

JSON 출력: {{"vulnerabilities": [{{"severity": "critical/high/medium", "type": "...", "file": "...", "description": "...", "fix_suggestion": "..."}}]}}""",
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

### 4단계: 자동 수정 에이전트 (쓰기 가능)

```python
async def run_auto_fix(review_result: str, security_result: str) -> str:
    """리뷰 및 스캔 결과를 기반으로 코드를 자동 수정하는 쓰기 가능 에이전트"""
    result_text = ""
    async for message in query(
        prompt=f"""다음 리뷰 결과에 따라 코드를 수정하세요:

코드 리뷰 보고서:
{review_result}

보안 스캔 보고서:
{security_result}

수정 규칙:
1. 심각도가 높거나 중대한 문제만 수정
2. 각 변경 후 관련 테스트를 실행하여 기존 기능이 손상되지 않았는지 확인
3. 관련 없는 코드를 리팩토링하지 말고 최소 수정만 적용
4. 완료 후 수정된 파일 목록 출력""",
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

### 5단계: 테스트 검증 + 보고서 생성

```python
async def run_test_and_report(fix_result: str) -> str:
    """테스트를 실행하고 최종 보고서를 생성합니다"""
    result_text = ""
    async for message in query(
        prompt=f"""다음 작업을 실행하세요:
1. 전체 테스트 스위트 실행 (npm test 또는 pytest)
2. 테스트 통과율 계산
3. pr-report.md에 Markdown 품질 보고서를 생성하고 다음을 포함:
   - 코드 리뷰에서 발견된 문제 수 및 심각도 분포
   - 보안 취약점 수
   - 자동 수정 변경 사항: {fix_result}
   - 테스트 통과율
   - 최종 결론: merge를 권장하는지 여부""",
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

### 6단계: 전체 파이프라인 연결

```python
import subprocess

async def run_pipeline():
    """완전한 PR 품질 가드 파이프라인"""
    print("🔍 1/4단계: 코드 리뷰...")
    pr_diff = subprocess.run(
        ["git", "diff", "main...HEAD"], capture_output=True, text=True
    ).stdout
    review_result = await run_code_review(pr_diff)

    print("🛡️ 2/4단계: 보안 스캔...")
    security_result = await run_security_scan()

    print("🔧 3/4단계: 자동 수정...")
    fix_result = await run_auto_fix(review_result, security_result)

    print("✅ 4/4단계: 테스트 검증 + 보고서 생성...")
    report = await run_test_and_report(fix_result)

    # 감사 로그 저장
    with open("audit-log.json", "w") as f:
        json.dump(audit_log, f, indent=2, ensure_ascii=False)

    print(f"파이프라인 완료, 감사 로그 저장됨 ({len(audit_log)}개 작업 기록)")
    return report

asyncio.run(run_pipeline())
```

### 엔터프라이즈 설계 사고

이 파이프라인은 몇 가지 핵심 엔터프라이즈 설계 원칙을 반영합니다:

**최소 권한**: code-review와 security-scan 에이전트는 읽기 전용이며 코드를 실수로 수정할 수 없습니다. auto-fix 에이전트만 쓰기 권한이 있으며 그것도 `acceptEdits`로 제한됩니다.

**감사 가능**: 모든 에이전트의 모든 단계가 Hooks를 통해 로그됩니다. 문제가 발생하면 어떤 에이전트가 언제 무엇을 했는지 추적할 수 있습니다.

**결과 연결**: 각 에이전트의 출력이 다음 에이전트의 입력이 됩니다. 리뷰 결과가 자동 수정에 제공되고; 자동 수정 결과가 테스트 검증에 제공됩니다. 모든 단계에 명확한 입출력 계약이 있습니다.

**비용 제어**: 모든 에이전트에 `max_turns` 한계가 있어 무한 루프를 방지합니다. 프로덕션에서는 예산 제어를 위해 `max_budget_usd`를 추가할 수도 있습니다.

**확장성**: 다른 단계를 원하시나요, 예: "문서 검사 에이전트"나 "성능 벤치마크 에이전트"? 새 함수를 추가하고 파이프라인에 삽입하기만 하면 됩니다.

이 모델은 GitHub Actions나 GitLab CI에 직접 임베딩하여 각 PR마다 자동으로 트리거되어 진정한 "AI 기반 코드 품질 가드레일"을 달성할 수 있습니다.

---

## 오류 처리

에이전트 SDK는 명확한 예외 유형을 제공하여 프로덕션에서 견고한 내결함성을 구축할 수 있습니다:

```python
from claude_agent_sdk import query, CLINotFoundError, ProcessError

try:
    async for msg in query(prompt="코드 분석"):
        print(msg)
except CLINotFoundError:
    print("Claude Code CLI가 설치되지 않았습니다. 먼저 설치해 주세요.")
except ProcessError as e:
    print(f"프로세스가 예기치 않게 종료됨, 종료 코드: {e.exit_code}")
```

---

## 요약

Claude Agent SDK의 핵심 가치는 "모델 추론"을 "제어된 실행"으로 업그레이드하는 것입니다. 단순히 텍스트를 생성하는 것이 아닙니다. 감사 가능하고 제한된 도구 시스템 내에서 실제로 작업을 완료할 수 있습니다.

Anthropic 공식 블로그의 한 문장을 기억하세요: 에이전트 SDK 설계 철학은 "에이전트에게 컴퓨터를 주고 인간처럼 일하게 하라"입니다.

좋은 에이전트 애플리케이션 = 명확한 도구 설계 + 명확한 작업 경계 + 적절한 인간 감독. 도구는 에이전트에게 능력을, 경계는 제약을, 감독은 자신감을 줍니다. 세 가지 모두 빠질 수 없습니다.

---

## 참고 문헌

### 공식 자료

- [에이전트 SDK 공식 문서](https://platform.claude.com/docs/en/agent-sdk/overview) - 가장 권위 있는 참조
- [GitHub - claude-agent-sdk-python](https://github.com/anthropics/claude-code-sdk-python) - Python SDK 소스
- [GitHub - claude-agent-sdk-typescript](https://github.com/anthropics/claude-agent-sdk-typescript) - TypeScript SDK 소스
- [에이전트 SDK 데모 프로젝트](https://github.com/anthropics/claude-agent-sdk-demos) - 이메일 어시스턴트, 연구 에이전트 등

### 블로그 및 튜토리얼

- [Building agents with the Claude Agent SDK](https://claude.com/blog/building-agents-with-the-claude-agent-sdk) - 설계 철학 및 아키텍처에 대한 Anthropic 엔지니어링 블로그
- [Claude Agent SDK Python Study Guide](https://redreamality.com/blog/claude-agent-sdk-python-) - 처음부터 시작하는 완전한 튜토리얼
- [Claude Agent SDK Full Tutorial](https://blog.wenhaofree.com/en/posts/articles/claude-agent-sdk-tutorial/) - 도구 시스템, 에이전트 루프 및 제어된 실행에 대한 실용 가이드
- [12 Practical Agent SDK Scenarios](https://skywork.ai/blog/claude-agent-sdk-use-cases-2025/) - 코딩, 데이터, 자동화 등 포괄
- [Step-by-Step Agent Tutorial](https://skywork.ai/blog/how-to-use-claude-agent-sdk-step-by-step-ai-agent-tutorial/) - TypeScript + Python 듀얼 트랙 튜토리얼
