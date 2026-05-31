# 바이브 코딩에서 스펙 코딩으로: AI 프로그래밍의 진화

> "코드는 의도의 손실 압축 투영이다."
> Code is a lossy projection of intent.
> - Sean Grove, OpenAI, AI Engineer World's Fair 2025

## 스펙 코딩의 핵심 아이디어: 모든 것은 Markdown이다

스펙 코딩을 깊이 이해하기 전에, 먼저 Claude Code의 기반 철학을 이해합시다: **모든 것은 Markdown이다**.

Claude Code의 설계 철학에서 프로세스 기록, 정보 전달, 모델과의 대화까지 모두 Markdown일 수 있습니다:

- **CLAUDE.md**: 프로젝트 규약을 위한 Markdown 문서
- **.claude/rules/**: 계층화된 Markdown 규칙 파일 모음
- **specs/**: 기능 요구 사항의 Markdown 설명
- **대화 기록**: Claude Code의 채팅 기록 자체가 Markdown 형식
- **AGENTS.md**: 에이전트 동작을 정의하는 Markdown 지침

이것이 스펙 코딩의 핵심입니다: **사양 자체가 코드다**. 요구 사항, 설계 결정, 수용 기준을 Markdown으로 작성할 때, 이미 "코드"를 작성하고 있는 것입니다 - AI가 그 Markdown을 읽고 실제 구현을 생성합니다.

Josh Beckman의 Grove 강연 요약이 이를 완벽하게 포착합니다:

> "소프트웨어 엔지니어링(그리고 법률 제정 및 법률 검토)은 사양 수리다."
> Software engineering (and lawmaking and legal review) is specification repair.

Claude Code에서 이 "사양 수리" 과정은: **Markdown 수정 -> AI가 Markdown 읽기 -> 코드 생성/수정 -> 결과 검증**입니다. 전체 워크플로는 Markdown 기반입니다.

---

## 1. Sean Grove의 "The New Code": 사고방식을 바꾸는 강연

2025년, OpenAI 연구원 **Sean Grove**는 AI Engineer World's Fair에서 **"The New Code"**라는 강연을 발표하여 전체 개발자 커뮤니티를 뒤흔들었습니다. 그는 파격적인 아이디어를 제시했습니다: **70년 동안 우리는 문제를 해결하기 위해 코드를 작성해 왔지만, 코드는 의도의 손실 압축 투영일 뿐이며, 사양이 진정한 "새로운 코드"다.**

이 강연은 새로운 개발 패러다임인 **Spec Coding**의 시초가 되었습니다 - 코드가 아닌 사양 문서를 개발의 핵심 산출물로 삼고, AI가 사양에서 코드를 생성하게 합니다.

Grove의 강연에서 시작하여, 이 글은 스펙 코딩의 핵심 아이디어를 이해하고, 바이브 코딩의 한계를 되돌아보며, Claude Code에서 이 방법론을 실제 개발에 적용하는 방법을 보여줍니다.

::: info 📚 학습 내용

1. Sean Grove의 "The New Code" 강연의 핵심 아이디어 이해
2. 스펙 코딩의 핵심 개념과 방법론 습득
3. 바이브 코딩의 가치와 한계 모두 인식
4. Claude Code에서 스펙 코딩 워크플로를 실습하는 방법 학습
5. 바이브 코딩에서 스펙 코딩으로의 점진적 전환 전략 마스터

:::

---

## 1. Sean Grove의 "The New Code": 사고방식을 바꾸는 강연

2025년, OpenAI 연구원 Sean Grove는 AI Engineer World's Fair에서 **"The New Code"**라는 강연을 발표했습니다. 이 강연은 스펙 코딩 운동의 지적 출발점으로 널리 간주됩니다.

Grove는 이전에 OneGraph라는 GraphQL 개발자 도구 회사를 설립했고(나중에 Netlify에 인수됨), 현재 OpenAI에서 정렬 추론 연구를 하고 있습니다 - 고수준의 의도를 실행 가능한 사양과 평가 기준으로 변환하는 작업입니다.

### 1.1 핵심 주장: 코드는 의도의 손실 압축 투영이다

Grove 강연의 핵심 개념은 한 문장으로 요약할 수 있습니다:

> **코드는 의도의 손실 압축 투영이다.**
> Code is a lossy projection of intent.

무슨 의미일까요? 머릿속에 아이디어가 있고 이를 코드로 변환할 때, 막대한 양의 컨텍스트가 손실됩니다 - 이 접근 방식을 **왜** 선택했는지, 어떤 **트레이드오프**를 고려했는지, 어떤 **제약 조건**이 중요했는지. 최종 코드는 "어떻게 할 것인가"만 보존하고 "왜 이렇게 해야 하는가"를 잃어버립니다.

책을 트윗으로 압축하는 것과 같습니다 - 정보 밀도가 급격히 떨어지고 원래의 의도가 크게 훼손됩니다.

### 1.2 프로그래밍의 본질은 소통이다

Grove는 단순하지만 심오한 아이디어를 제시했습니다:

> "효과적으로 소통할 수 있다면, 프로그래밍할 수 있다."
> If you can communicate effectively, you can program.

그는 실제 코딩 작업이 개발의 **10-20%**만 차지한다고 주장합니다. 나머지 80%는 요구 사항과 목표를 둘러싼 **구조화된 소통**입니다 - 사용자가 원하는 것을 이해하고, 팀과 솔루션에 대한 합의를 이루고, 수용 기준을 정의하고, 엣지 케이스를 처리하는 것입니다.

이는 프로그래밍 능력의 핵심이 특정 언어의 구문 마스터가 아니라, **모호한 의도를 정확한 설명으로 변환하는 능력**이라는 것을 의미합니다.

### 1.3 사양을 작성하는 사람이 프로그래머다

이것이 Grove의 가장 파격적인 아이디어입니다:

> "사양을 작성하는 사람 - PM이든, 입법자든, 엔지니어든, 마케터든 - 이제 프로그래머다."
> Whoever writes the spec - be it a PM, a lawmaker, an engineer, a marketer - is now the programmer.

AI가 사양을 코드로 변환하는 데 점점 더 능숙해짐에 따라, **진정한 프로그래밍 작업**은 "코드 작성"에서 "사양 작성"으로 이동합니다. 의도를 가장 정확하게 표현할 수 있는 사람이 가장 가치 있는 "프로그래머"가 됩니다.

### 1.4 사양도 코드와 같은 툴체인을 가질 수 있다

Grove는 사양이 코드와 같은 완전한 툴체인을 가질 수 있다고 지적했습니다:

> "사양은 우리에게 매우 유사한 툴체인을 제공하지만, 구문이 아닌 의도를 대상으로 합니다."

- **조합**: 사양은 코드 모듈처럼 모듈화되고 조합 가능
- **테스트**: 사양은 동작이 기대치와 일치하는지 검증하는 단위 테스트를 포함할 수 있음
- **린팅**: 사양의 모호한 언어를 감지할 수 있으며, 린터가 구문 문제를 잡는 것과 같음
- **일관성 검사**: 부서 간 사양의 일관성을 확인할 수 있으며, 타입 체커와 유사

### 1.5 OpenAI Model Spec: 살아있는 증거

Grove는 OpenAI 자체의 **Model Spec** 문서를 증거로 사용했습니다.

OpenAI가 아첨 문제를 발견했을 때, 모델을 재훈련하지 않았습니다. 대신 **사양 문서를 수정**했습니다. 변경 사항이 시스템 전체에 자동으로 전파되었고, 문제가 수정되었습니다.

이것은 중요한 점을 증명합니다: **사양 자체가 실행 가능한 코드처럼 작동할 수 있다**. 사양을 변경하는 것은 단일 줄의 전통적인 코드를 건드리지 않고 동작을 변경하는 것과 같습니다.

Josh Beckman의 Grove 강연 요약이 이를 완벽하게 포착합니다:

> "소프트웨어 엔지니어링(그리고 법률 제정 및 법률 검토)은 사양 수리다."
> Software engineering (and lawmaking and legal review) is specification repair.

---

## 2. 스펙 코딩: 사양을 코드로

### 2.1 스펙 코딩이란

스펙 코딩(Spec Coding)은 스펙 주도 개발(SDD, Spec-Driven Development)이라고도 하며, **사양 문서를 개발의 핵심 산출물로 취급하는 방법론**입니다.

핵심 아이디어는: **먼저 사양을 명확히 작성하고, AI가 그 사양에서 코드를 생성하게 합니다. 사양이 진실의 원천이며, 코드는 그로부터 파생된 구현 산출물입니다.**

Robert C. Martin의 *Clean Code*의 고전적인 선언이 AI 시대에 새로운 의미를 갖습니다:

> "기계가 실행할 수 있을 만큼 정확하게 요구 사항을 명시하는 것이 프로그래밍이다."
> Specifying requirements so precisely that a machine can execute them is programming.

### 2.2 바이브 코딩과 스펙 코딩 비교

| 차원 | 바이브 코딩 | 스펙 코딩 |
|------|------------|-------------|
| **접근 방식** | 즉흥적 프롬프트, 반복적인 백앤드 포스 | 먼저 완전한 사양을 작성한 후 코드 생성 |
| **적합한 경우** | 프로토타입, 해커톤, 탐색 | 프로덕션 시스템, 팀 협업, 기업 업무 |
| **코드 품질** | 빠르지만 취약 | 구조화되어 테스트 가능하고 감사 가능 |
| **첫 시도 성공률** | 불안정 | 95%+ 목표 |
| **재사용성** | 일회성 프롬프트 | 사양을 프로젝트 간에 재사용 가능 |
| **보안** | 놓치기 쉬움 | 사양 레이어에 내장 |
| **문서화** | 누락되거나 항상 뒤처짐 | 사양이 곧 문서이며 계속 유지됨 |
| **팀 협업** | 개인 프롬프트 기술에 의존 | 공유 사양, 공유 표준 |

둘은 대립 관계가 아닙니다. Brad Jolicoeur이 지적한 것처럼:

> "영리한 엔지니어들은 바이브 코딩을 사양의 초기 초안을 생성하는 첫 번째 단계로 사용하기도 합니다."
> Clever engineers will even use vibe coding as a first step to generate the initial draft of a specification.

### 2.3 스펙 코딩의 3계층 사양 구조

Red Hat의 엔지니어들이 실용적인 3계층 사양 모델을 정리했습니다:

**계층 1: 기능 사양(What)**

자연어로 예상 결과를 설명하고 "무엇을 해야 하는가"에 답합니다:

```markdown
## 사용자 인증 기능

### 사용자 스토리
- 새 사용자로서 이메일로 가입하고 싶다
- 등록된 사용자로서 이메일과 비밀번호로 로그인하고 싶다
- 비밀번호를 잊어버린 사용자로서 이메일로 재설정하고 싶다

### 수용 기준
- 가입 시 이메일 형식과 비밀번호 강도 검증
- 5번 로그인 실패 후 계정 15분 잠금
- 비밀번호 재설정 링크는 30분간 유효
```

**계층 2: 언어 독립적 사양(How - 아키텍처 계층)**

데이터 구조, 아키텍처 패턴, 보안 요구 사항을 정의합니다:

```markdown
## 기술 설계

### 데이터 모델
- users 테이블: id, email, password_hash, created_at, locked_until
- sessions 테이블: id, user_id, token, expires_at

### API 설계
- POST /api/auth/register -> 201 Created
- POST /api/auth/login -> 200 OK + JWT
- POST /api/auth/reset-password -> 202 Accepted

### 보안 요구 사항
- 비밀번호는 cost factor >= 12인 bcrypt 사용
- JWT는 15분 만료, 리프레시 토큰은 7일
- 모든 엔드포인트에 속도 제한 활성화
```

**계층 3: 언어 특정 사양(How - 구현 계층)**

버전 요구 사항, 테스트 프레임워크, 문서화 표준:

```markdown
## 구현 제약 조건

### 기술 스택
- 런타임: Node.js 20+
- 프레임워크: Express 5
- ORM: Prisma
- 테스트: Vitest

### 코드 규칙
- TypeScript strict mode 사용
- 에러 처리에 커스텀 AppError 클래스 사용
- 모든 API 엔드포인트에 JSDoc 주석 필요
```

---

## 3. Claude Code에서 스펙 코딩 실습

이론을 이해한 후, 다음 질문은 Claude Code에서 이를 어떻게 적용하는가입니다. Claude Code의 설계 철학은 스펙 코딩에 자연스럽게 부합합니다 - `CLAUDE.md`, Rules 디렉토리, `/plan` 명령이 모두 사양 주도 개발의 형태입니다.

OpenAI 자체가 Codex로 프로젝트를 구축할 때 비슷한 패턴을 사용합니다: `AGENTS.md` 파일을 사양으로 사용하여 AI 에이전트를 안내합니다. 핵심 교훈은: **에이전트가 어려움을 겪을 때, 이를 신호로 삼아 - 도구, 가드레일, 문서 중 무엇이 누락되었는지 파악하고, 이를 저장소에 추가하세요**. 이는 스펙 코딩과 완벽히 일치합니다: 사양은 살아있는 산출물이며 계속 진화해야 합니다.

Augment Code의 연구도 같은 결론을 지지합니다: **실행 가능한 사양은 정확도를 유지하는데, AI 에이전트가 직접 코드를 생성하여 강제 기능을 만들기 때문입니다 - 구식 사양은 깨진 구현을 만듭니다**. 즉, 사양은 전통적인 문서처럼 썩지 않습니다.

### 3.1 첫 번째 단계: `CLAUDE.md`로 프로젝트 사양 구축

`CLAUDE.md`는 프로젝트의 "살아있는 사양"입니다. Claude Code가 시작될 때마다 이 파일을 읽으며, AI에게 지속적인 프로젝트 핸드북을 제공하는 것과 같습니다.

이전 장 [Claude Code 빠른 시작 핵심 가이드](../basics/)에서 이미 `CLAUDE.md`를 만드는 방법을 배웠습니다. 스펙 코딩의 맥락에서 그 역할은 더욱 중요해집니다 - **단순한 설정 파일이 아니라 프로젝트 사양의 진입점**입니다.

LogRocket의 엔지니어들은 **견고한 컨텍스트가 AI 에이전트에게 매우 중요하다고 강조합니다. 환각과 비효율성을 방지하기 때문입니다**. 사양이 없으면 AI 에이전트가 프로젝트에 크고 통제되지 않은 변경을 가할 수 있습니다. `CLAUDE.md`가 그 "견고한 컨텍스트"를 제공하는 첫 번째 방어선입니다.

```markdown
# 이커머스 프로젝트 사양

## 프로젝트 포지셔닝
중소 상인을 위한 SaaS 이커머스 플랫폼으로, 다중 스토어 및 다중 결제 채널 지원

## 아키텍처 결정
- 프론트엔드-백엔드 분리와 API 우선 설계
- 마이크로서비스 백엔드 아키텍처, 서비스 간 메시지 큐를 통한 통신
- 읽기-쓰기 데이터베이스 분리

## 핵심 제약 조건
- 모든 금액은 센트 단위의 정수로 저장하여 부동소수점 정밀도 문제 방지
- 주문 상태 머신은 엄격히 따라야 함: 결제 대기 -> 결제 완료 -> 배송됨 -> 완료
- 결제 관련 엔드포인트는 멱등성을 가져야 함
```

Aviator 팀이 사양이 포착해야 할 핵심 정보를 정리했으며 - 이것이 바로 `CLAUDE.md`가 다루어야 할 내용입니다:

- 입력 및 출력 형식과 데이터 유형
- 비즈니스 규칙과 엣지 케이스
- 시스템 종속성과 제약 조건
- 성능과 확장성 요구 사항
- 에러 처리와 보안 요구 사항

### 3.2 두 번째 단계: Rules 디렉토리로 계층화된 사양 관리

프로젝트가 성장하면 단일 `CLAUDE.md`로는 부족해집니다. 그때 `.claude/rules/` 디렉토리를 사용하여 계층화된 사양을 구성합니다.

이것이 바로 Augment Code가 말하는 "실행 가능한 사양"의 아이디어입니다: **사양은 정적 문서가 아니라 AI 에이전트가 직접 소비하는 살아있는 지침**입니다. Rules 디렉토리에 규칙을 나누면, 각 규칙 파일은 관련 파일을 편집할 때만 로드되어, 토큰을 절약하면서 정확성을 보존합니다.

Tessl의 엔지니어들은 요구 사항을 구조화된 문서로 나누는 것 - PRD로 "무엇과 왜"를 정의하고, 기술 사양으로 "어떻게"를 정의하는 것 - 이 긴 대화에서 AI가 혼란을 누적하는 것을 방지하고 출력 일관성을 크게 향상시킨다는 것을 발견했습니다.

```text
.claude/rules/
├── 00-architecture.md      # 아키텍처 규칙(전역)
├── 01-security.md          # 보안 규칙(전역)
├── 10-api-design.md        # API 설계 규칙
├── 11-frontend-patterns.md # 프론트엔드 패턴 규칙
├── 12-database.md          # 데이터베이스 규칙
└── 20-testing.md           # 테스트 규칙
```

각 규칙 파일은 frontmatter를 통해 범위를 지정할 수 있습니다:

```markdown
---
globs:
  - "src/api/**/*.ts"
  - "src/services/**/*.ts"
---

# API 설계 규칙

## 라우트 설계
- RESTful 스타일, 복수 명사 사용: /api/v1/orders
- 중첩 리소스는 최대 2단계까지: /api/v1/users/123/orders

## 응답 형식
- 성공: { data, pagination? }
- 실패: { error: { code, message, details? } }

## 반드시 준수
- 모든 쓰기 작업은 인증 필요
- 모든 목록 엔드포인트는 페이지네이션 지원
- 민감한 작업은 감사 로그 작성
```

이렇게 하면 Claude Code가 API 관련 파일을 편집할 때 이 사양을 자동으로 로드하여, 생성된 코드가 표준을 따르도록 합니다.

### 3.3 세 번째 단계: `/plan`으로 Specify -> Plan -> Tasks -> Implement 실행

표준 스펙 코딩 워크플로는 4단계 순환입니다. GitHub Spec Kit은 이를 Specify -> Plan -> Tasks -> Implement로 표준화했으며, Claude Code의 `/plan` 명령이 이 흐름을 자연스럽게 지원합니다.

SpecThis 팀이 강조한 핵심 원칙: **에이전트가 실행되기 전에 경계를 정의하세요 - 코드 변경이 일어나기 전에 무엇이 변경되어야 하는지 알아야 합니다**. 이것이 바로 `/plan`의 가치입니다.

**1단계: Specify**

먼저 구축하고 싶은 것을 명확히 작성합니다. 코드로 서두르지 마세요:

```text
/plan
주문 환불 기능을 구현해야 해. 사양은:

기능 요구 사항:
- 배송 전 사용자가 전액 환불을 요청할 수 있음
- 배송 후 7일 이내에 반품 및 환불 요청 가능
- 환불은 관리자 승인 필요

수용 기준:
- 환불 금액은 주문에 실제로 지불한 금액을 초과할 수 없음
- 환불 상태 머신: 요청됨 -> 승인됨 -> 환불 중 -> 환불 완료
- 환불 완료 후 재고 복원
- 전체 과정의 모든 작업 로그
```

**2단계: Plan**

Claude가 사양에 따라 기술 계획을 생성합니다:

```text
📋 환불 기능 구현 계획

1. 데이터 모델 설계
   - refunds 테이블 생성
   - 주문 상태 머신에 환불 관련 상태 추가

2. API 설계
   - POST /api/orders/:id/refund - 환불 요청
   - PUT /api/refunds/:id/approve - 환불 승인
   - GET /api/refunds - 환불 목록

3. 비즈니스 로직
   - 환불 자격 확인
   - 환불 금액 계산
   - 재고 복원 로직

4. 통합
   - 결제 제공업체의 환불 API 연동
   - 환불 알림 발송
```

**3단계: Tasks**

계획을 독립적으로 실행할 수 있는 작은 작업으로 나누고, 각 작업에 명확한 완료 기준을 부여합니다.

**4단계: Implement**

한 번에 하나의 작업을 구현하고, 각각 완료 후 검증합니다.

### 3.4 실제 예시: 스펙 코딩으로 사용자 알림 시스템 구축

전체 예시로 바이브 코딩과 스펙 코딩을 비교해 봅시다. Orchestrator.dev의 데이터에 따르면, 2025 Stack Overflow 설문조사에서 84%의 개발자가 AI 도구를 사용하거나 사용할 계획이지만, 결과에 만족하는 것은 22%에 불과하며, 46%가 정확성이 문제라고 생각합니다. 스펙 코딩이 바로 이 만족도 갭을 좁히는 핵심입니다.

**바이브 코딩 접근:**

```text
사용자: 알림 기능을 만들어 줘
AI: [즉시 코드 작성을 시작하고 간단한 알림 목록 생성]

사용자: 읽음/안읽음을 지원해야 해
AI: [코드를 수정하고 read 필드 추가]

사용자: 여러 알림 유형도 필요해
AI: [다시 수정하고 type 필드 추가]

사용자: 휴대폰으로도 알림을 푸시해야 해
AI: [대대적인 재작성, 이전 구조가 더 이상 잘 맞지 않음...]
```

결과: 4번의 변경 후 아키텍처가 계속 뒤집히고 코드가 갈수록 지저분해집니다.

**스펙 코딩 접근:**

먼저 사양 문서 `specs/notification.md`를 작성합니다:

```markdown
# 사용자 알림 시스템 사양

## 기능 요구 사항
1. 세 가지 채널 지원: 인앱 알림, 이메일 알림, 푸시 알림
2. 알림 유형: 시스템 공지, 주문 상태, 프로모션, 보안 알림
3. 사용자가 채널과 유형별로 알림 환경설정 구성 가능
4. 읽음/안읽음 상태 및 일괄 읽음 처리 지원

## 데이터 모델
- notifications 테이블: id, user_id, type, channel, title, content,
  is_read, created_at
- notification_preferences 테이블: user_id, type, channel, enabled

## API 설계
- GET /api/notifications?type=&is_read= - 알림 목록 조회(페이지네이션)
- PUT /api/notifications/:id/read - 읽음 처리
- PUT /api/notifications/read-all - 모두 읽음 처리
- GET /api/notification-preferences - 환경설정 조회
- PUT /api/notification-preferences - 환경설정 업데이트

## 수용 기준
- 읽지 않은 알림 수가 실시간 업데이트
- 알림 목록이 무한 스크롤 지원
- 푸시 알림 지연 < 3초
- 환경설정 변경이 즉시 적용
```

그다음 Claude Code에서:

```text
@specs/notification.md
이 사양에 따라 사용자 알림 시스템을 구현해 줘.
데이터 모델부터 시작하고, 그다음 API를 구현하고, 마지막으로 프론트엔드 컴포넌트를 구축해 줘.
각 모듈이 완료되면 일시 정지하고, 내가 확인하기 전까지 계속하지 마.
```

결과: 한 번에 깔끔하게 구현되며, 아키텍처가 명확하고 반복적으로 뜯어고칠 필요가 없습니다.

### 3.5 Superpowers로 스펙 코딩 강화

이전 장 [엔지니어링급 개발을 위한 Superpowers](../superpowers/)에서 Superpowers 기술 시스템을 배웠습니다. 스펙 코딩과 Superpowers는 자연스러운 파트너입니다:

| 스펙 코딩 단계 | 해당 Superpowers 기술 |
|------------------|---------------------|
| 사양 정의 | `brainstorming` - 소크라테스식 질문으로 요구 사항 명확화 |
| 기술 계획 | `writing-plans` - 사양을 작은 작업으로 분해 |
| 점진적 구현 | `test-driven-development` - TDD 레드-그린-리팩터 |
| 품질 검증 | `code-review` + `verification-before-completion` |

**결합 사용 예시:**

```text
@specs/notification.md
이 사양에 따라 TDD로 알림 시스템을 구현하고,
완료 후 코드 리뷰도 해 줘
```

이 단일 지시는 스펙 코딩 워크플로와 TDD, Code Review 같은 Superpowers 기술을 모두 활성화하여, 완전한 엔지니어링급 개발 프로세스를 형성합니다.

### 3.6 사양의 버전 관리와 지속적 진화

Vibe Coding Substack이 중요한 관점을 제시했습니다: **이제 사양이 코드다**. 사양이 코드라면, 코드처럼 관리되어야 합니다:

- **버전 관리**: 사양 파일을 Git에 보관하고 코드와 함께 커밋
- **변경 추적**: 사양의 모든 변경에 커밋 기록이 있어 누가 무엇을 왜 변경했는지 알 수 있음
- **코드 리뷰**: 사양 변경도 PR 리뷰를 거쳐야 팀이 정렬을 유지
- **CI 통합**: 사양 변경이 자동화된 테스트를 트리거하여 구현이 여전히 사양을 준수하는지 확인

Claude Code에서 이는 `CLAUDE.md`, `.claude/rules/`, `specs/` 디렉토리가 모두 버전 관리되어야 함을 의미합니다. Robomotion의 경험에 따르면 **사양과 구현을 함께 버전 관리하면 드리프트를 방지하고 모든 것을 감사 가능하게 유지**할 수 있습니다.

OpenAI의 Harness Engineering 실천도 이를 확인합니다: 그들의 `AGENTS.md` 파일 자체가 Codex에 의해 작성되었으며 프로젝트가 발전함에 따라 지속적으로 업데이트됩니다. 에이전트가 어려움을 겪을 때, 해결책은 코드를 직접 변경하는 것이 아니라 **Codex가 사양 자체를 업데이트하게 하는 것**입니다 - 사양의 자가 치유 루프를 형성합니다.

---

## 4. 하이브리드 전략: 바이브에서 스펙으로 점진적 이동

업계의 합의는 "바이브 코딩을 버리라"는 것이 아니라, **올바른 시나리오에 올바른 접근 방식을 선택하는 것**입니다.

### 4.1 바이브 코딩을 사용해야 할 때

- 아이디어가 실현 가능한지 30분 이내에 프로토타입으로 검증
- 익숙하지 않은 기술이나 프레임워크 탐색
- 해커톤이나 내부 데모
- 일회성 스크립트나 도구

### 4.2 스펙 코딩을 사용해야 할 때

- 프로덕션 기능 개발
- 다인 협업 프로젝트
- 장기 유지보수가 필요한 코드
- 보안, 결제, 데이터와 같은 민감한 영역
- API 설계와 시스템 통합

### 4.3 추천하는 점진적 워크플로

**1단계: 바이브 탐색**

바이브 코딩을 사용하여 아이디어를 빠르게 검증합니다. 아직 사양을 작성하지 마세요. 코드 품질도 걱정하지 마세요:

```text
간단한 알림 팝업을 만들어서 어떤 느낌인지 확인해 줘
```

**2단계: 사양 정제**

실현 가능성이 확인되면, 탐색 중에 배운 것을 사양으로 정리합니다. AI에게 도움을 요청할 수도 있습니다:

```text
방금 만든 알림 기능 프로토타입을 바탕으로,
정식 기능 사양 문서를 정리해 줘.
데이터 모델, API 설계, 수용 기준을 포함해 줘
```

**3단계: 스펙으로 재구축**

그 사양을 바탕으로, 스펙 코딩을 사용하여 프로덕션급 버전을 재구현합니다:

```text
@specs/notification.md
사양에 따라 처음부터 구현하고, 이전 프로토타입 코드를 참고하지 마
```

이 워크플로의 장점은 명확합니다: **바이브 코딩의 속도로 방향을 검증하고, 스펙 코딩의 품질로 제품을 전달**합니다.

Robomotion이 잘 요약했습니다:

> "사양이 진실의 원천이다. AI가 생성한 출력은 초안 구현이다. 검증은 선택이 아니다."
> The spec is the source of truth. The AI generated output is the draft implementation. Validation is not optional.

---

## 5. 자주 묻는 질문

### Q1: 스펙 코딩은 너무 느리게 느껴지지 않나요?

사양 작성에는 선투자가 필요합니다. 하지만 Greg Ceccarelli의 팀은 스펙 코딩으로 **3명이 4주 만에** 완전한 macOS 제품을 전달했습니다 - 전통적 개발에서는 거의 불가능한 일입니다.

초기에 사양을 작성하는 데 들인 시간은 나중에 재작업 감소, 버그 감소, 커뮤니케이션 비용 감소로 회수됩니다.

### Q2: 사양은 얼마나 상세해야 하나요?

Robomotion의 제안: **고품질 사양은 한 페이지면 충분합니다**. 중요한 것은 다음 8가지 질문에 답하는지입니다:

1. 우리가 자동화하는 것은 무엇인가?
2. 입력은 무엇인가?
3. 출력은 무엇인가?
4. 제약 조건은 무엇인가?
5. 실패 모드는 무엇인가?
6. 보안 요구 사항은 무엇인가?
7. 성능 요구 사항은 무엇인가?
8. 작동을 증명하는 테스트는 무엇인가?

### Q3: AI가 사양에 쓰인 것만 정확히 하고 "명백한" 기능을 놓치면 어떻게 하나요?

이것은 정말 스펙 코딩의 한계 중 하나입니다. GitHub Spec Kit 사용자의 피드백에 따르면, AI는 사양에 **"정확히 그것만"** 수행합니다.

해결책은 사양에 "비기능적 요구 사항" 섹션을 추가하고, 에러 처리, 로깅, 접근성 같은 일반적인 기대 사항을 나열하는 것입니다. 또는 `CLAUDE.md`에 전역 규칙을 설정합니다.

### Q4: 작은 프로젝트도 스펙 코딩이 필요한가요?

아니요. 스펙 코딩에 가장 적합한 것은:

- 프로덕션급 프로젝트
- 팀 협업 프로젝트
- 장기 유지보수가 필요한 프로젝트

빠른 프로토타입, 일회성 스크립트, 학습 실험에는 바이브 코딩이 더 적합합니다.

### Q5: 팀에게 스펙 코딩을 받아들이게 하려면 어떻게 하나요?

작은 기능으로 파일럿을 시작하세요. 팀이 스펙 코딩이 재작업을 줄이고 첫 시도 성공률을 높이는 것을 보게 하세요. Stack Overflow 2025 설문조사에 따르면 84%의 개발자가 AI 도구를 사용하거나 사용할 계획이지만 22%만 결과에 만족합니다 - 스펙 코딩이 바로 이 만족도를 높이는 핵심입니다.

---

## 6. 요약

바이브 코딩에서 스펙 코딩으로의 이동은 혁명이 아닙니다. 진화입니다.

Sean Grove는 "The New Code"에서 명확히 밝혔습니다: **70년 동안 우리는 문제를 해결하기 위해 코드를 작성해 왔습니다. 이제 사양을 작성하여 코드를 생성해야 합니다**. 코드는 의도의 손실 압축 투영이며, 사양은 의도, 컨텍스트, 제약 조건을 완전히 포착할 수 있습니다.

Claude Code를 사용하는 개발자에게 이 전환은 이미 일어나고 있습니다:

- 작성하는 `CLAUDE.md`가 프로젝트 사양입니다
- 구성하는 Rules 디렉토리가 계층화된 사양 시스템입니다
- `/plan`으로 하는 계획이 Specify -> Plan -> Tasks 흐름입니다
- Superpowers의 TDD와 Code Review를 결합하면 완전한 스펙 코딩 워크플로가 됩니다

**핵심 요약:**

- 바이브 코딩은 탐색과 프로토타입에 적합하고, 스펙 코딩은 프로덕션과 협업에 적합합니다
- 사양이 진실의 원천이며, 코드는 그로부터 파생된 구현 산출물입니다
- 사양 작성 능력 = 프로그래밍 능력이며, 구문 능력보다 소통 능력이 더 중요합니다
- 작게 시작하세요: `CLAUDE.md`를 잘 작성하는 것만으로도 스펙 코딩의 첫 발을 내디딘 것입니다

::: tip 💡 다음 단계
다음 장에서는 Claude Code의 Agent Teams 기능을 사용하여 여러 AI 인스턴스가 실제 개발 팀처럼 협업하는 방법을 배우겠습니다.
:::

---

## 참고 자료

### Sean Grove의 "The New Code" 강연 관련

- [Code is just a lossy projection of intent — The Decoder](https://the-decoder.com/code-is-just-a-lossy-projection-of-intent-according-to-openai-researcher-sean-grove/)
- [The End of Coding? How Specifications Are Becoming the New Source Code — Implicator](https://www.implicator.ai/the-end-of-coding-how-specifications-are-becoming-the-new-source-code/)
- [OpenAI: Intent, Not Code, Drives Future Software Development — AI Tech Suite](https://www.aitechsuite.com/ai-news/openai-intent-not-code-drives-future-software-development)
- [Note on The New Code — Josh Beckman](https://www.joshbeckman.org/notes/914234100)
- [Full Transcript of "The New Code"](https://lawwu.github.io/transcripts/8rABwKRsec4.html)

### 스펙 코딩 방법론

- [How spec-driven development improves AI coding quality — Red Hat](https://developers.redhat.com/articles/2025/10/22/how-spec-driven-development-improves-ai-coding-quality)
- [Spec-Driven Development with AI: Complete 2025 Guide — Dplooy](https://www.dplooy.com/blog/spec-driven-development-with-ai-complete-2025-guide)
- [Spec-Driven Development: Building Production-Ready Software with AI — Orchestrator.dev](https://orchestrator.dev/blog/2025-12-16-spec_driven_dev_article)
- [Agents Code but the Problem of Clear Specification Remains — Greg Ceccarelli](https://www.gregceccarelli.com/writing/beyond-code-centric)

### 바이브 코딩 vs 스펙 코딩

- [Vibe Coding vs Spec Driven — Cosmo Edge](https://cosmo-edge.com/vibe-coding-vs-spec-driven-ai-development/)
- [Master AI in Software Engineering: Vibe vs. Spec Coding — Brad Jolicoeur](https://bradjolicoeur.com/article/ai-software-engineering-vibe-spec-prompting)
- [From Vibe Coding to Spec-Driven Development — Tessl](https://tessl.io/blog/from-vibe-coding-to-spec-driven-development/)
- [Spec First Approach for Enterprise — Robomotion](https://robomotion.io/blog/spec-first-approach-the-way-to-adapt-vibe-coding-for-enterprise-work)

### 도구와 실천

- [GitHub Spec Kit vs Vibe Coding — Ossels](https://ossels.ai/github-spec-kit-spec-driven-development/)
- [A Spec-First Workflow for Agentic AI — LogRocket](https://blog.logrocket.com/spec-first-workflow-agentic-ai/)
- [Specs Are Now Code — The Vibe Coding Substack](https://thevibecoding.substack.com/p/specs-are-now-code)
- [Harness Engineering — Martin Fowler](https://martinfowler.com/articles/exploring-gen-ai/harness-engineering.html)
- [Spec-Driven Development & AI Agents Explained — Augment Code](https://www.augmentcode.com/guides/spec-driven-development-ai-agents-explained)
- [Spec-Driven Development: The Key to Scalable AI Agents — Aviator](https://www.aviator.co/blog/spec-driven-development/)
