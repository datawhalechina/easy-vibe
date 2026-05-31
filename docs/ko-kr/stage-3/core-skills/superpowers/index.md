# 엔지니어링급 개발을 위한 Claude Code Superpowers

## Superpowers 소개

**Superpowers**는 Jesse Vincent(온라인 핸들: obra)가 만든 오픈소스 에이전트 기술 프레임워크로, AI 프로그래밍의 핵심 문제 하나를 해결하기 위해 설계되었습니다: AI가 "토이급" 코드가 아닌 "엔지니어링급" 코드를 생산하게 만드는 방법.

일반적인 AI 코딩 어시스턴트를 "똑똑한 인턴"이라고 상상해 보세요. 실행 가능한 코드를 작성할 수 있지만, 테스트도 없고 문서도 없으며 모범 사례의 훈련도 없을 수 있습니다. Superpowers는 그 인턴에게 "시니어 엔지니어 멘토"를 배정하여, 완전한 소프트웨어 개발 프로세스를 따르도록 강제하는 것과 같습니다.

### Superpowers가 필요한 이유

Superpowers 이전에 Claude Code를 사용할 때 몇 가지 문제가 있었습니다:

- **바이브 코딩의 혼란**: AI가 계획 없이 바로 코딩을 시작하여 빈번한 재작업 발생
- **TDD 훈련 부족**: AI가 코드를 먼저 작성하고 나중에 테스트를 추가하거나, 테스트를 완전히 건너뛰는 경향
- **모호한 요구 사항으로 코딩**: 사용자가 "로그인 기능 만들어"라고 하면 AI가 바로 시작하고, 원하지 않는 결과가 나옴
- **불안정한 코드 품질**: 코드 리뷰 메커니즘이 없어 품질이 AI의 "기분"에 달려 있음

Superpowers는 이 문제들을 해결하고 Claude를 "훈련된 개발 팀"으로 만듭니다. 먼저 요구 사항을 명확히 하고, 계획을 만들고, TDD로 개발하고, 마지막으로 코드 리뷰로 품질을 보장합니다.

---

## 빠른 시작

### 1단계: Superpowers 설치

Claude Code에서 실행:

```bash
# 마켓플레이스 추가
/plugin marketplace add obra/superpowers-marketplace

# superpowers 설치
/plugin install superpowers@superpowers-marketplace
```

또는 수동으로 클론:

```bash
git clone https://github.com/obra/superpowers.git ~/.claude/skills/superpowers
```

### 2단계: 첫 번째 기술 사용해 보기

Superpowers의 **brainstorming** 기술로 가치를 경험해 봅시다.

Claude Code에서 다음을 입력:

```text
사용자 로그인 기능을 만들어 줘
```

**Superpowers 이전**: Claude가 바로 코드를 작성하기 시작하며, 원하지 않는 것을 만들 수 있습니다.

**Superpowers 사용 시**: Claude가 소크라테스식 질문으로 요구 사항을 명확히 합니다:

> 이 로그인 기능은 웹 앱용인가요, 모바일 앱용인가요?
>
> 어떤 로그인 방식이 필요한가요? 이메일/비밀번호? 서드파티 로그인(Google, GitHub)?
>
> "로그인 상태 유지" 기능이 필요한가요?
>
> 비밀번호 재설정은 이메일로 할까요, SMS로 할까요?
>
> ...

이 질문들은 코딩 전에 실제로 필요한 것을 명확히 하여, 많은 사용되지 않는 코드를 방지합니다.

### 3단계: 기술 트리거 메커니즘 이해

Superpowers는 "마법의 스위치"가 아닙니다. **기술 집합**입니다. 기술이 어떻게 트리거되는지 이해하는 것이 중요합니다.

**세 가지 트리거 방법:**

1. **키워드 트리거**
   - "TDD", "테스트 주도 개발", "테스트 먼저 작성"을 언급할 때
   - `test-driven-development` 기술이 활성화됨

2. **시나리오 트리거**
   - 요구 사항이 불명확할 때 `brainstorming`이 자발적으로 질문
   - 버그가 나타나면 `systematic-debugging`이 활성화됨

3. **수동 호출**
   - 기술 이름을 직접 사용, 예: `/test-driven-development`

#### 💡 중요한 명확화: TDD를 명시하지 않으면 어떻게 되나요?

이것은 흔한 오해입니다. 명확히 합시다:

```text
# 사례 A: TDD를 언급하지 않음
"계산기 구현해 줘"
-> Claude가 테스트를 작성할 수도 있고, 안 할 수도 있음
-> 모델 자체의 습관에 달려 있음

# 사례 B: TDD를 명시적으로 요청
"TDD로 계산기 구현해 줘"
-> test-driven-development 기술이 활성화됨
-> RED-GREEN-REFACTOR가 강제됨
```

**Superpowers의 진정한 가치**: 무에서 능력을 만드는 것이 아니라, 훈련을 강화하는 것입니다.

- TDD 기술이 없으면: Claude가 테스트를 작성하는 것은 "어쩌면"
- TDD 기술이 있으면: Claude가 TDD 흐름을 따르도록 강제됨

### Superpowers의 가치 이해

위의 설명에서 Superpowers의 핵심 가치가 명확합니다:

1. **요구 사항 우선**: `brainstorming`이 요구 사항이 모호할 때 적극적으로 질문
2. **프로세스 훈련**: `test-driven-development`가 TDD 레드-그린-리팩터 사이클을 강제
3. **작업 분해**: `writing-plans`가 큰 프로젝트를 작은 작업으로 나눔
4. **품질 관리**: `code-review` 기술이 코드 품질을 보장

---

## Superpowers 핵심 기술 상세

Superpowers는 전체 소프트웨어 수명 주기를 다루는 **20개 이상의 조합 가능한 기술**을 포함합니다. 카테고리별로 살펴보겠습니다.

### 🧪 테스트 기술

#### test-driven-development

**트리거 방법**: "TDD", "테스트 주도 개발", "테스트 먼저 작성" 등의 키워드 언급.

**이 기술이 하는 일**: Claude가 "나중에 어쩌면 테스트를 작성"하는 대신 TDD 레드-그린-리팩터 사이클을 따르도록 강제.

**전통적 접근** (일반적인 문제):
1. 코드를 바로 작성
2. 빠른 수동 테스트
3. 버그 발견하고 코드 패치
4. 반복... (테스트? 다음에 어쩌면)

**TDD 접근** (기술 활성화 후):
1. 🔴 **RED**: 먼저 실패하는 테스트 작성
2. 🟢 **GREEN**: 테스트를 통과하는 최소한의 코드 작성
3. 🔵 **REFACTOR**: 테스트가 통과하는 상태에서 리팩터링
4. 반복

**사용 예시**:

```text
TDD를 사용하여 사용자 인증 모듈을 구현해 줘
```

Claude의 동작:
1. 먼저 테스트 작성(사용자명/비밀번호 검증, 토큰 생성 등)
2. 테스트를 실행하고 모두 실패하는지 확인(RED)
3. 최소한의 구현 코드 작성
4. 테스트를 실행하고 통과하는지 확인(GREEN)
5. 코드를 리팩터링하고 공유 로직 추출
6. 테스트를 다시 실행하고 통과하는지 확인(REFACTOR)

> **참고**: "TDD"를 언급하지 않으면 Claude가 테스트를 작성할 수도 있고 안 할 수도 있습니다. 기술의 역할은 **프로세스 훈련을 강제**하여 테스트가 "잊혀지지 않게" 하는 것입니다.

### 🐛 디버깅 기술

#### systematic-debugging

버그가 나타나면, 인간 개발자는 종종 무작위 수정을 시도합니다. Superpowers는 4단계 근본 원인 분석을 강제합니다:

**1단계: 문제 재현**
- 버그를 일관되게 재현할 수 있는지 확인
- 정확한 재현 단계 기록

**2단계: 근본 원인 격리**
- 이진 탐색 방식으로 범위를 좁혀 문제 격리
- 문제가 있는 코드를 찾기 위해 로그 추가

**3단계: 가설 검증**
- 근본 원인 가설 제시
- 검증 실험 설계

**4단계: 수정 및 확인**
- 수정 사항 구현
- 버그가 해결되었는지 확인
- 회귀 테스트 추가

#### verification-before-completion

이 기술은 Claude가 "거의 다 된 것 같다"에서 멈추는 것을 방지합니다. 완료를 선언하기 전에 다음을 요구합니다:

1. 모든 테스트 실행
2. 핵심 기능 수동 테스트
3. 코드 품질 확인(lint)
4. 문서가 업데이트되었는지 확인

### 🤝 협업 기술

#### brainstorming

Superpowers의 가장 흥미로운 기술 중 하나입니다. 소크라테스식 질문을 사용하여 요구 사항을 명확히 합니다.

**작동 방식**: 모호한 요구 사항을 제공하면, Claude가 바로 코딩을 시작하지 않고 질문을 합니다:

```text
사용자: 블로그 시스템 만들어 줘

Claude:
- 이 블로그는 누구를 위한 건가요? 기술 독자인가요, 일반 독자인가요?
- Markdown 편집을 지원해야 하나요?
- 댓글이 필요한가요?
- 검색 기능이 필요한가요?
- 1인용인가요, 다중 작성자인가요?
- ...
```

이 질문들은 진정으로 필요한 기능을 생각하게 하여, 많은 사용되지 않는 기능을 방지합니다.

#### writing-plans

이 기술은 큰 작업을 각각 2-5분 안에 완료할 수 있는 작은 작업으로 나눕니다.

**예시**:

```text
writing-plans를 사용하여 todo API 개발을 계획해 줘
```

Claude가 상세한 계획을 생성합니다:

```markdown
# 구현 계획

## 작업 1: 데이터베이스 스키마 설계 (예상 5분)
- todos 테이블 생성
- 필드 정의: id, title, completed, createdAt

## 작업 2: Express 라우트 생성 (예상 10분)
- POST /todos - 작업 생성
- GET /todos - 작업 목록
- GET /todos/:id - 작업 하나 조회
- PUT /todos/:id - 업데이트
- DELETE /todos/:id - 삭제

## 작업 3: 입력 검증 추가 (예상 10분)
- title은 비어 있을 수 없음
- completed는 boolean이어야 함

## 작업 4: 테스트 작성 (예상 15분)
- 각 엔드포인트에 대한 테스트 작성
- 엣지 케이스 커버

## 작업 5: 서버 시작 및 확인 (예상 5분)
- 테스트 실행
- 수동으로 API 테스트

수용 기준:
- 모든 테스트 통과
- 모든 엔드포인트에 curl 테스트 통과
```

#### executing-plans

이 기술은 계획을 배치로 실행하고 각 체크포인트에서 일시 정지하여 확인합니다.

**사용 예시**:

```text
위 계획을 실행하고, 각 작업 완료 후 일시 정지해 줘
```

Claude의 동작:
1. 작업 1 완료 후 일시 정지: `✅ 데이터베이스 스키마 완료. 계속할까요?`
2. 확인 후 작업 2 완료 후 다시 일시 정지
3. 계속...

이렇게 하면 모든 단계에서 방향을 검증하여, 늦게 방향이 벗어난 것을 발견하는 것을 방지합니다.

#### dispatching-parallel-agents

이 기술은 여러 하위 에이전트를 병렬로 실행할 수 있습니다.

**사용 사례**: 여러 독립적인 작업을 동시에 처리해야 할 때.

```text
병렬 에이전트를 사용하여 다음을 완료해 줘:
- 에이전트 A: 백엔드 API 작성
- 에이전트 B: 프론트엔드 컴포넌트 작성
- 에이전트 C: 테스트 작성
```

각 에이전트가 자체 격리된 환경에서 간섭 없이 작업합니다.

#### subagent-driven-development

이 기술은 각 작은 작업에 대해 독립적인 하위 에이전트를 실행합니다.

**장점**:
- 각 하위 에이전트가 격리된 컨텍스트를 가짐
- 하나의 작업 실패가 다른 작업에 영향을 주지 않음
- 여러 작업을 병렬로 실행 가능

#### using-git-worktrees

이 기술은 Git worktree를 사용하여 격리된 개발 환경을 만듭니다.

**이점**:
- 여러 기능을 병렬로 개발 가능
- 각 worktree가 독립적
- 상호 충돌 없음

### 👀 코드 리뷰 기술

#### requesting-code-review

코드가 완료된 후, 이 기술이 자동으로 코드 리뷰를 요청합니다.

```text
기능 완료 후 자동으로 코드 리뷰를 트리거해 줘
```

#### receiving-code-review

이 기술은 리뷰 피드백을 받고 처리하는 방법을 정의합니다.

**리뷰 워크플로**:
1. 코드 제출
2. 리뷰 자동 트리거
3. 리뷰어가 코드 품질, 보안, 테스트 커버리지 확인
4. 리뷰어가 개선 제안 제공
5. 문제 수정
6. 승인될 때까지 재리뷰

---

## 전체 Superpowers 워크플로

Superpowers의 진정한 힘은 여러 기술을 결합하여 전체 개발 워크플로를 만드는 데 있습니다.

### 표준 개발 워크플로

```text
1. 브레인스토밍
   ↓ Q&A를 통해 실제 요구 사항 명확화

2. 설계 문서
   ↓ 청크 단위로 설계를 제시하고 확인 대기

3. 계획 작성
   ↓ 2-5분짜리 작업으로 분해

4. 하위 에이전트 개발
   ↓ 작업당 격리된 하위 에이전트 실행
   ↓ 2단계 리뷰: 사양 준수 + 코드 품질

5. TDD
   ↓ RED-GREEN-REFACTOR 강제

6. 코드 리뷰
   ↓ 품질 게이트

7. 완료
```

### 실용적인 예시: Superpowers로 사용자 인증 시스템 구축

전체 예시를 통해 Superpowers 워크플로를 경험해 봅시다.

#### 1단계: 브레인스토밍으로 요구 사항 명확화

```text
사용자 인증 시스템이 필요해
```

Claude가 질문합니다:
- 웹 앱인가요, 모바일 앱인가요?
- 어떤 로그인 방식이 필요한가요?
- 비밀번호 재설정이 필요한가요?
- "로그인 상태 유지"가 필요한가요?
- ...

#### 2단계: 설계 문서 생성

요구 사항이 확인되면, Claude가 설계 문서를 작성합니다:

```markdown
# 사용자 인증 시스템 설계

## 기능 요구 사항
1. 사용자 등록(이메일 + 비밀번호)
2. 사용자 로그인
3. 비밀번호 재설정(이메일)
4. 로그인 상태 유지(JWT + Refresh Token)

## 기술 선택
- 백엔드: Node.js + Express
- 데이터베이스: SQLite
- 인증: JWT
- 암호화: bcrypt

## API 설계
- POST /api/auth/register
- POST /api/auth/login
- POST /api/auth/refresh
- POST /api/auth/reset-password
```

#### 3단계: 구현 계획 작성

```text
writing-plans를 사용하여 구현 계획을 만들어 줘
```

Claude가 상세한 작업 목록을 생성하며, 각 작업은 2-5분 안에 완료 가능합니다.

#### 4단계: 개발 실행

```text
위 계획을 TDD로 실행해 줘
```

Claude의 동작:
1. 먼저 테스트 작성
2. 테스트 실패 확인(RED)
3. 구현 코드 작성
4. 테스트 통과 확인(GREEN)
5. 코드 리팩터링(REFACTOR)

#### 5단계: 코드 리뷰

완료 후 코드 리뷰가 자동으로 트리거되어 다음을 확인합니다:
- 코드 품질
- 보안(SQL 인젝션, XSS 등)
- 테스트 커버리지
- 문서 완전성

---

## Superpowers vs 직접 Claude Code 사용

| 차원 | 직접 Claude Code 사용 | Superpowers 사용 |
|------|---------------------|-----------------|
| **요구 사항 명확화** | AI가 바로 코딩 시작 | 소크라테스식 질문으로 먼저 요구 사항 명확화 |
| **개발 프로세스** | AI에 따라 자유 형식 | TDD 레드-그린-리팩터 강제 |
| **작업 관리** | 한 번에 완료 | 체크포인트가 있는 작은 작업으로 분해 |
| **코드 품질** | AI 판단에 의존 | 코드 리뷰 강제 |
| **예측 가능성** | 불안정한 결과 | 반복 가능한 프로세스 |
| **적합한 경우** | 간단한 작업, 프로토타입 검증 | 복잡한 프로젝트, 프로덕션 코드 |

### 시각적 비유

Claude Code가 "똑똑한 인턴"이라면:

- **직접 사용**: 인턴에게 "로그인 기능 만들어"라고 하면 바로 코딩을 시작하며, 목표와 다른 것을 만들 수 있음
- **Superpowers 사용**: 인턴에게 요구 사항을 명확히 하고, 계획을 세우고, 코드 품질을 확인하는 시니어 멘토를 배정

---

## 설치 및 설정 상세

### 방법 1: 마켓플레이스를 통한 설치 (권장)

```bash
# 마켓플레이스 추가
/plugin marketplace add obra/superpowers-marketplace

# 설치
/plugin install superpowers@superpowers-marketplace

# 설치 확인
/skills
```

### 방법 2: 수동 클론

```bash
# 디렉토리 생성
mkdir -p ~/.claude/skills

# 저장소 클론
git clone https://github.com/obra/superpowers.git ~/.claude/skills/superpowers
```

### 방법 3: 프로젝트 수준 설치

특정 프로젝트에서 Superpowers를 사용하려면:

```bash
# 프로젝트 루트에서
mkdir -p .claude/skills

# superpowers를 복사하거나 클론
cp -r ~/.claude/skills/superpowers .claude/skills/
```

이렇게 하면 팀원들이 동일한 Superpowers 설정을 공유할 수 있습니다.

---

## 일반적인 기술 빠른 참조

| 기술 이름 | 기능 | 사용 사례 |
|---------|------|---------|
| `brainstorming` | 소크라테스식 질문으로 요구 사항 명확화 | 요구 사항이 불명확할 때 |
| `writing-plans` | 작업을 작은 단계로 분해 | 큰 프로젝트 시작 전 |
| `executing-plans` | 체크포인트와 함께 계획 실행 | 계획 주도 개발 중 |
| `test-driven-development` | TDD 레드-그린-리팩터 루프 | 모든 기능 개발 시 |
| `systematic-debugging` | 4단계 근본 원인 분석 | 버그가 나타날 때 |
| `verification-before-completion` | 완료 전 검증 | 작업 완료 시 |
| `requesting-code-review` | 코드 리뷰 요청 | 코드 제출 전 |
| `subagent-driven-development` | 하위 에이전트 주도 개발 | 병렬 작업 |
| `using-git-worktrees` | Git worktree 격리 | 병렬 기능 개발 |

---

## 모범 사례

### 1. 명확한 트리거 키워드 사용

Superpowers 기술은 키워드로 트리거됩니다. 일반적인 트리거 단어를 배우세요:

| 기술 | 트리거 키워드 |
|------|-----------|
| `test-driven-development` | "TDD", "테스트 주도", "테스트 먼저 작성" |
| `brainstorming` | 요구 사항이 불명확할 때 자동 트리거 |
| `systematic-debugging` | "디버그", "버그", "작동 안 함" |
| `writing-plans` | "계획 세워", "계획" |

### 2. 프로세스 훈련이 필요할 때 Superpowers 사용

- 프로덕션급 코드 개발 -> "TDD" 언급
- 요구 사항이 불명확 -> `brainstorming`이 명확화
- 복잡한 프로젝트 -> `writing-plans`로 작업 분해

### 3. 간단한 작업에는 강제하지 않기

빠른 프로토타입이나 일회성 스크립트라면 전체 프로세스가 필요하지 않습니다. Superpowers는 장기 유지보수가 필요한 코드에 가장 적합합니다.

### 4. 기술을 결합할 수 있음

```text
TDD로 사용자 인증을 구현하고, 완료 후 코드 리뷰도 해 줘
```

이렇게 하면 `test-driven-development`와 `code-review` 기술이 모두 트리거됩니다.

---

## 자주 묻는 질문

### Q1: Superpowers를 사용하려면 "TDD"를 반드시 명시해야 하나요?

**필수 아닙니다**.

Superpowers는 기술 집합이며, 각 기술에는 고유한 트리거 조건이 있습니다:
- "TDD 사용"이라고 말하면 -> `test-driven-development` 트리거
- TDD를 말하지 않으면 -> Claude가 테스트를 작성할 수도 있고 안 할 수도 있음(모델 동작에 따라)

Superpowers는 무에서 능력을 만드는 것이 아니라 **프로세스 훈련을 강제**하기 위해 존재합니다.

### Q2: Superpowers가 개발을 느리게 만드나요?

처음에는 느리게 느껴질 수 있습니다:
- 요구 사항 명확화에 시간이 걸림
- 코드 전에 테스트를 작성해야 함
- 코드 리뷰가 필요함

하지만 장기적으로 재작업 감소와 버그 감소로 전체 효율성이 향상됩니다.

### Q3: 작은 프로젝트도 Superpowers가 필요한가요?

프로토타입 검증이나 매우 간단한 작업에는 Claude Code를 직접 사용할 수 있습니다. Superpowers는 다음에 더 적합합니다:
- 프로덕션급 프로젝트
- 다인 협업
- 장기 유지보수 가능성

### Q4: Superpowers와 Skills의 차이는 무엇인가요?

| 차원 | Superpowers | Skills |
|------|-------------|--------|
| **성격** | 완전한 개발 방법론 프레임워크 | 재사용 가능한 기술 패키지 |
| **범위** | 전체 개발 프로세스 포괄 | 특정 기능에 초점 |
| **관계** | Superpowers가 내부적으로 Skills 사용 | Superpowers는 Skills의 모음 |

### Q5: Superpowers 기술을 커스터마이징할 수 있나요?

네. Superpowers는 오픈소스이며, 다음을 할 수 있습니다:
1. 저장소를 포크
2. 기존 기술 수정
3. 새로운 기술 추가
4. 커뮤니티에 기여

---

## 참고 자료

### 공식 리소스

- [obra/superpowers GitHub](https://github.com/obra/superpowers) - 공식 저장소(50,000+ ⭐)
- [상세 Superpowers 사용 튜토리얼](https://www.cnblogs.com/gyc567/p/19510203) - 상세한 중국어 튜토리얼
- [Superpowers 환경 설정 가이드](https://m.blog.csdn.net/gitblog_00683/article/details/144768992) - 설정 가이드

### 커뮤니티 리소스

| 저장소 | 설명 |
|------|------|
| [affaan-m/everything-claude-code](https://github.com/affaan-m/everything-claude-code) | TDD 워크플로를 포함한 종합 툴킷 |
| [shanraisshan/claude-code-best-practice](https://github.com/shanraisshan/claude-code-best-practice) | 공식 모범 사례 |

### 관련 문서

- [바이브 코딩 안녕! Superpowers로 Claude Code가 엔지니어링급 코드를 작성하게 만들기](https://juejin.cn/post/7593573617648123956)
- [Superpowers MCP로 Claude Code가 코딩 전에 계획하도록 강제하는 방법](https://juejin.cn/post/7570341520551673871)
- [Claude Code + Superpowers 초보자 튜토리얼](https://juejin.cn/post/7594832320030638123)

---

## 요약

Superpowers는 Claude Code를 "똑똑한 인턴"에서 "훈련된 개발 팀"으로 업그레이드하는 **엔지니어링급 개발 기술 집합**입니다.

### 핵심 요약

1. **Superpowers는 기술 집합이지 마법이 아님**
   - 설치 후 기술이 백그라운드에서 사용 가능
   - 키워드나 시나리오로 트리거
   - 특정 기술을 수동으로 호출 가능

2. **핵심 트리거 문구 기억**
   - TDD를 원하면 -> "TDD 사용"이라고 말하기
   - 요구 사항이 모호하면 -> `brainstorming`이 자발적으로 질문
   - 버그가 나타나면 -> "디버그"를 언급하여 `systematic-debugging` 트리거

3. **적합한 시나리오**
   - ✅ 프로덕션급 코드 개발
   - ✅ 장기 유지보수 가능한 프로젝트
   - ✅ 팀 협업 프로젝트
   - ❌ 빠른 프로토타입(선택적)
   - ❌ 일회성 스크립트(선택적)

기억하세요: **Superpowers는 AI를 더 똑똑하게 만드는 것이 아니라, AI를 더 훈련되게 만듭니다.**
