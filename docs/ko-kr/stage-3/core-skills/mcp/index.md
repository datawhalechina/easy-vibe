# Claude Code MCP 완전 가이드

## Claude Code MCP란?

**Claude Code**는 Anthropic의 공식 AI 명령줄 도구이며, **MCP(Model Context Protocol)**는 Claude Code가 외부 도구와 서비스에 연결할 수 있게 하는 프로토콜입니다.

간단히 말해, MCP는 Claude Code를 로컬 파일만 읽고 쓸 수 있는 AI 어시스턴트에서, GitHub, 데이터베이스, API, 클라우드 서비스에 접근할 수 있는 슈퍼 어시스턴트로 변환합니다.

## Claude Code에서 MCP를 사용하는 이유는?

### MCP가 없는 Claude Code

```text
할 수 있는 것:
✓ 로컬 파일 읽기
✓ 코드 편집
✓ 명령 실행
✓ Bash 도구 사용

할 수 없는 것:
✗ GitHub Issues 보기
✗ 클라우드 데이터베이스 접근
✗ 외부 API 호출
✗ 실시간 날씨 확인
```

### MCP가 있는 Claude Code

```text
할 수 있는 것:
✓ 모든 기존 기능
✓ GitHub Issues 및 PR 보기 / 생성
✓ SQLite 및 PostgreSQL 데이터베이스 쿼리
✓ Notion, Slack 등 외부 서비스 접근
✓ 실시간 날씨 및 지도 데이터 확인
✓ 브라우저 자동화
✓ ...그리고 더 많은 것
```

## 빠른 시작

### 1단계: 설정 파일 위치 이해

Claude Code의 MCP 설정 파일 위치:

| 수준 | 설정 파일 경로 | 범위 |
|-----|-------------|----------|
| **사용자 수준** | `~/.claude.json` | 모든 프로젝트 |
| **프로젝트 수준** | `.claude/mcp.json` | 현재 프로젝트 |

먼저 **프로젝트 수준 설정**을 사용하는 것이 좋으며, 서로 다른 프로젝트가 서로 다른 MCP 서비스를 사용할 수 있습니다.

### 2단계: 자연어로 MCP 서버 추가

Claude Code에서는 설정 파일을 수동으로 편집하거나 명령을 암기할 필요가 없습니다. 자연어로 원하는 것을 설명할 수 있습니다:

```text
사용자: GitHub MCP 서버를 추가해 줘. 내 토큰은 ghp_xxx야

Claude: GitHub MCP 서버를 설정해 드릴게요...

[자동으로 .claude/mcp.json 업데이트]
```

```text
사용자: SQLite 데이터베이스 서버를 추가해 줘. 데이터베이스 파일은 ./data/app.db에 있어

Claude: 네, SQLite MCP 서버를 설정할게요...
```

```text
사용자: HTTP 유형의 MCP 서버를 추가해 줘. 주소는 https://api.example.com/mcp야

Claude: 원격 MCP 서버를 추가할게요...
```

### 3단계: 설정 확인

Claude Code에 직접 물어보세요:

```text
사용자: 지금 어떤 MCP 서버를 사용할 수 있어?

Claude: 현재 설정된 MCP 서버:
• github - GitHub 통합
• sqlite - SQLite 데이터베이스
• filesystem - 파일시스템 접근
```

또는 진단 명령 사용:

```text
/doctor
```

### 4단계: 사용 시작

설정이 성공하면 자연어로 직접 MCP 기능을 호출할 수 있습니다:

```text
사용자: GitHub에 Issue를 만들어 줘

Claude: GitHub Issue를 만들어 드릴게요. 알려주세요:
- 저장소 주소, 예: owner/repo
- Issue 제목
- Issue 설명
```

## Claude Code에서 자연어 관리

### MCP 서버 보기 및 관리

자연어로만 Claude Code와 상호작용할 수 있습니다:

```text
사용자: 설정된 모든 MCP 서버 나열해 줘

사용자: MCP 서버의 연결 상태를 확인해 줘

사용자: notion이라는 MCP 서버를 삭제해 줘

사용자: github 서버의 토큰을 업데이트해 줘
```

### 문제 진단

문제가 발생했을 때:

```text
사용자: MCP 연결에 문제가 있는지 확인해 줘

Claude: [자동으로 진단을 실행하고, 설정 파일을 분석하고, 서버 상태를 확인합니다]
```

## 설정 방법 상세

### 사용자 수준 설정, 전역

`~/.claude.json` 편집:

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

### 프로젝트 수준 설정, 권장

프로젝트 루트의 `.claude/mcp.json` 편집:

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

**프로젝트 수준 설정의 장점:**

- 팀원들이 Git에 커밋하여 설정을 공유할 수 있음
- 서로 다른 프로젝트가 서로 다른 MCP 서비스를 사용할 수 있음
- 설정이 더 유연하며 전역 설정을 오염시키지 않음

### 전송 모드

Claude Code는 세 가지 전송 모드를 지원합니다:

#### STDIO, 로컬 프로세스

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

#### HTTP, 원격 서비스

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

#### SSE, 서버 전송 이벤트

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

## 실용적인 예시

### 예시 1: GitHub 워크플로 자동화

```text
사용자: 현재 변경 사항을 GitHub에 푸시하고, "새로운 기능 추가"라는 제목으로 PR을 만들어 줘

Claude:
1. 현재 git 상태 확인...
2. 새 브랜치 feature/new-feature 생성...
3. 변경 사항 커밋...
4. 원격으로 푸시...
5. github_create_pull_request를 호출하여 PR 생성...
6. PR 생성됨: https://github.com/owner/repo/pull/123
```

### 예시 2: 데이터베이스 쿼리

```text
사용자: 데이터베이스에서 가장 최근에 등록된 10명의 사용자를 쿼리해 줘

Claude:
1. SQLite 데이터베이스에 연결...
2. 쿼리 실행: SELECT * FROM users ORDER BY created_at DESC LIMIT 10
3. 결과 반환:
   - 홍길동 (hong@example.com) - 2025-02-28
   - 김철수 (kim@example.com) - 2025-02-27
   ...
```

### 예시 3: 웹페이지 스크린샷 분석

```text
사용자: https://example.com을 열어서, 스크린샷을 찍고, 페이지 디자인을 분석해 줘

Claude:
1. 브라우저 실행...
2. https://example.com으로 이동...
3. 스크린샷 캡처...
4. [스크린샷 반환]
5. 페이지 디자인 분석:
   - 레이아웃은 최대 너비 1200px의 중앙 정렬 디자인 사용
   - 메인 컬러는 파란색(#3b82f6)
   - 내비게이션 바가 상단에 고정됨
   ...
```

### 예시 4: Notion과 통합

```text
사용자: 방금 작성한 노트를 Notion에 저장해 줘

Claude:
1. Notion MCP 서버 사용...
2. 새 페이지 생성...
3. 저장됨: https://notion.so/page/xxx
```

## 디버깅 팁

### 자연어로 진단

문제가 발생하면 Claude Code에 직접 알려주세요:

```text
사용자: MCP 서버에 연결할 수 없어. 확인해 줘

사용자: GitHub MCP 도구 호출이 실패했어. 이유가 뭐야?

사용자: sqlite 서버가 계속 "연결 중"이라고 표시되는 이유는?
```

Claude Code가 자동으로:

1. 설정 파일 형식 확인
2. 환경 변수 검증
3. 서버 연결 테스트
4. 구체적인 수정 제안 제공

### 일반적인 문제 해결

| 문제 | 가능한 원인 | 해결 방법 |
|-----|---------|----------|
| 서버가 연결되지 않음 | 설정 파일 형식 오류 | JSON 구문 확인 |
| 도구를 호출할 수 없음 | 권한 부족 | 환경 변수 확인 |
| 연결 시간 초과 | 네트워크 문제 | URL 또는 네트워크 확인 |
| 프로세스 충돌 | 서버 코드 버그 | 서버 로그 확인 |

### 수동 진단 명령

```text
/doctor
```

출력 예시:

```text
System Diagnostic Report:
===============

Claude Code: v2.5.0 ✓
Node.js: v20.0.0 ✓

MCP server status:
• github: ✓ Connected (12 tools)
• sqlite: ✗ Connection failed - Database file not found
• puppeteer: ✓ Connected (8 tools)

Suggestions:
1. Check whether the sqlite database path is correct
2. Make sure the .claude/mcp.json format is correct
```

## 모범 사례

### 1. 프로젝트 수준 설정 우선

**프로젝트 수준 설정을 권장하는 이유?**

서로 다른 프로젝트는 종종 서로 다른 MCP 서비스가 필요합니다. 예를 들어, 프론트엔드 프로젝트는 브라우저 테스트 도구가 필요할 수 있고, 백엔드 프로젝트는 데이터베이스 연결이 필요할 수 있습니다. 프로젝트 수준 설정을 사용하면 각 프로젝트가 자체 전용 MCP 서버 세트를 가질 수 있어, 하나의 큰 전역 설정이 혼란스러워지는 것을 방지합니다.

더 중요한 것은, 프로젝트 수준 설정은 Git에 커밋할 수 있습니다. 팀원들이 프로젝트를 클론한 후 모든 것을 다시 설정하지 않고도 동일한 MCP 서비스를 직접 사용할 수 있습니다.

```text
프로젝트 A, 프론트엔드 프로젝트 -> .claude/mcp.json에 브라우저 테스트 MCP 포함
프로젝트 B, 백엔드 프로젝트 -> .claude/mcp.json에 데이터베이스 MCP 포함
```

### 2. 민감한 정보는 환경 변수에 저장

**설정 파일에 비밀을 하드코딩하지 마세요.**

설정 파일이 실수로 Git에 커밋되어 키가 유출될 수 있습니다. 올바른 접근 방식은 민감한 값을 환경 변수에 저장하고 설정 파일에서 변수 이름만 참조하는 것입니다. 그러면 설정 파일이 공개되더라도 실제 비밀은 숨겨집니다.

```json
{
  "env": {
    "GITHUB_TOKEN": "$GITHUB_TOKEN",
    "GITHUB_TOKEN": "ghp_abc123"
  }
}
```

첫 번째 형식은 환경 변수에서 읽으므로 좋습니다. 두 번째 형식은 비밀을 직접 하드코딩하므로 나쁩니다.

### 3. 버전 고정

**버전을 고정해야 하는 이유?**

기본적으로 `npx -y`는 항상 MCP 서버의 최신 버전을 사용합니다. 이는 문제를 일으킬 수 있습니다: 새 버전이 호환성을 깨는 변경을 도입할 수 있거나, 패키지가 갑자기 제거되거나 이름이 변경될 수 있습니다.

패키지 이름에 `@version`을 추가하면 검증된 버전이 항상 사용되어, 자동 업그레이드로 인한 문제를 줄일 수 있습니다.

```json
{
  "command": "npx",
  "args": ["-y", "@modelcontextprotocol/server-github@1.2.3"]
}
```

### 4. MCP 설정 문서화

**팀원들이 MCP 설정을 빠르게 이해하도록 도와주세요**

프로젝트에 여러 MCP 서버가 포함된 경우, 새 팀원이 각 서버의 용도나 필요한 설정을 이해하지 못할 수 있습니다. `.claude/` 디렉토리 아래에 `README.md`를 만들어 각 서버의 용도, 필요한 설정, 자격 증명 획득 방법을 설명하면 커뮤니케이션 비용을 크게 줄일 수 있습니다.

프로젝트에 `.claude/README.md` 만들기:

```markdown
# MCP 설정 노트

이 프로젝트에서 사용하는 MCP 서버:

## github
GitHub 자동화에 사용. GITHUB_TOKEN 필요.

## sqlite
./data/app.db에 연결하여 데이터를 쿼리하고 수정.

## puppeteer
E2E 테스트에 사용.
```

## Claude Code vs Claude Desktop

| 기능 | Claude Code | Claude Desktop |
|-----|-------------|----------------|
| **설정 파일** | `~/.claude.json` 또는 `.claude/mcp.json` | `claude_desktop_config.json` |
| **프로젝트 수준 설정** | ✓ 지원 | ✗ 지원 안 함 |
| **자연어 관리** | ✓ 지원 | ✗ 수동 편집 필요 |
| **진단** | ✓ `/doctor` | ✗ 없음 |
| **핫 리로드** | ✓ 자동 | ✗ 앱 재시작 필요 |
| **사용 사례** | 개발 워크플로, CI/CD | 일상 사용, 사무 작업 |

## 일반적인 MCP 서버

> 💡 전체 MCP 서버 목록은 부록을 참조하세요: [MCP 서버 디렉토리](/ko-kr/appendix/8-artificial-intelligence/ai-protocols)

### GitHub 서버

**기능:** Issues, PR, 저장소 관리

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

**토큰 획득:** https://github.com/settings/tokens

### SQLite 서버

**기능:** SQLite 데이터베이스 쿼리 및 관리

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

### 파일시스템 서버

**기능:** 지정된 디렉토리 내의 파일에 접근

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

### Puppeteer 브라우저 자동화

**기능:** 브라우저 제어, 스크린샷, 자동화된 테스트

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

### Brave 검색 서버

**기능:** 웹 검색

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

## 참고 자료

### 공식 문서

- [Claude Code 공식 문서 - MCP](https://docs.anthropic.com/zh-CN/docs/claude-code/mcp)
- [MCP 공식 웹사이트](https://modelcontextprotocol.io/)
- [MCP 사양 문서](https://modelcontextprotocol.io/specification/)
- [MCP GitHub 저장소](https://github.com/modelcontextprotocol)

### 공식 서버

- [@modelcontextprotocol/server-github](https://github.com/modelcontextprotocol/servers/tree/main/src/github) - GitHub 통합
- [@modelcontextprotocol/server-sqlite](https://github.com/modelcontextprotocol/servers/tree/main/src/sqlite) - SQLite 데이터베이스
- [@modelcontextprotocol/server-postgres](https://github.com/modelcontextprotocol/servers/tree/main/src/postgres) - PostgreSQL 데이터베이스
- [@modelcontextprotocol/server-filesystem](https://github.com/modelcontextprotocol/servers/tree/main/src/filesystem) - 파일시스템 접근
- [@modelcontextprotocol/server-puppeteer](https://github.com/modelcontextprotocol/servers/tree/main/src/puppeteer) - 브라우저 자동화
- [@modelcontextprotocol/server-fetch](https://github.com/modelcontextprotocol/servers/tree/main/src/fetch) - 웹 가져오기
- [@modelcontextprotocol/server-brave-search](https://github.com/modelcontextprotocol/servers/tree/main/src/brave-search) - Brave 검색
- [@modelcontextprotocol/server-git](https://github.com/modelcontextprotocol/servers/tree/main/src/git) - Git 작업

### 튜토리얼 문서

- [MCP 원리와 실전 완전 해설](https://view.inews.qq.com/a/20250414A023WV00)
- [MCP(Model Context Protocol) 아키텍처와 작동 원리](https://m.toutiao.com/w/1826385835060307/)
- [2025 최신 대형 모델 튜토리얼: MCP 프로토콜 입문부터 마스터까지](https://m.blog.csdn.net/weixin_45653328/article/details/150916706)
- [처음부터 MCP 배우기 (8) - MCP 서버 구축](https://juejin.cn/post/7582510291667419187)

### 설정 가이드

- [Claude Code 모범 사례](https://www.anthropic.com/engineering/claude-code-best-practices)
- [Claude Code 완전 설정 가이드](https://juejin.cn/post/7576838552472043563)

### 개발 튜토리얼

- [초보자 친화적인 MCP 서버 실전 가이드: TypeScript와 Python](https://m.blog.csdn.net/ztt123654/article/details/150844207)
- [궁극의 MCP 서버 구축 가이드: TypeScript와 Python 완전 튜토리얼](https://m.blog.csdn.net/gitblog_00703/article/details/154862128)
- [TypeScript로 가장 간단한 MCP 서버 구축](https://m.blog.csdn.net/weixin_45653525/article/details/148433757)
- [Azure 컨테이너 애플리케이션으로 TypeScript MCP 서버 생성](https://learn.microsoft.com/zh-cn/azure/developer/ai/build-mcp-server-ts)

### MCP 서버 리소스

- [Awesome MCP Servers](https://github.com/punkpeye/awesome-mcp-servers) - 가장 포괄적인 MCP 서버 목록
- [공식 MCP Registry](https://registry.modelcontextprotocol.io) - Anthropic의 공식 앱 스토어
- [MCP.so](https://mcp.so) - 커뮤니티 MCP 서버 센터
- [Glama.ai MCP](https://glama.ai/mcp/servers) - 평점과 댓글이 있는 MCP 디렉토리
- [Smithery](https://smithery.ai) - MCP 서버 마켓플레이스
- [MCPHub](https://mcphub.io/registry) - 깔끔한 인터페이스의 디렉토리
- [LobeHub MCP](https://lobehub.com/zh/mcp) - 중국어 MCP 디렉토리

### 지도 및 날씨 서비스

- [Amap MCP Server](https://lobehub.com/zh/mcp/luozengchang-mcp-amap)
- [Tencent 위치 서비스 MCP 문서](https://lbs.qq.com/service/MCPServer/MCPServerGuide/overview)
- [Caiyun 날씨 MCP Server](https://github.com/caiyunapp/mcp-caiyun-weather)
- [OpenWeatherMap MCP Server](https://github.com/CodeByWaqas/weather-mcp-server)

### 커뮤니티 리소스

- [Everything Claude Code Config](https://github.com/affaan-m/everything-claude-code) - 프로덕션급 Claude Code 설정 컬렉션
- [AI Coding Guide](https://github.com/hacket/AICodingGuide) - Claude Code 중국어 학습 경로

### 실제 적용 사례

- [BlenderMCP - AI 기반 3D 모델링](https://github.com/Belthur/blender-mcp) - 4,100+ ⭐
- [프로덕션에서의 MCP 모범 사례 15가지](https://learn.microsoft.com/zh-cn/azure/azure-functions/scenario-mcp-apps)
