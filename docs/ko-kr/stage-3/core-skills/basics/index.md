# Claude Code 빠른 시작 핵심 가이드

Claude Code는 Anthropic의 공식 AI 네이티브 코딩 도구입니다. 대형 언어 모델 기능을 터미널에 직접 통합하여, 자연어로 AI와 협업하며 프로그래밍 작업을 완료할 수 있습니다. 기존 코드 자동완성 도구와 달리, Claude Code는 전체 프로젝트의 맥락을 이해하고 복잡한 개발 작업을 수행할 수 있습니다. 코드 생성부터 리팩토링, 디버깅부터 문서 작성까지 모두 처리할 수 있습니다.

이 장에서는 Claude Code의 핵심 사용법을 빠르게 익히도록 도와줍니다. 설치 및 설정, 기본 조작, 실용적인 팁, 자주 사용하는 명령어를 모두 다룹니다. AI 코딩 도구를 처음 사용하거나 Claude Code를 더 효율적으로 사용하고 싶다면 이곳에서 필요한 정보를 찾을 수 있습니다.

---

## 빠른 설치

Claude Code는 Node.js 기반으로 구축되었으므로, 설치 전 시스템에 Node.js 18 이상이 설치되어 있는지 확인하세요. 과정은 매우 간단하며 보통 몇 분 밖에 걸리지 않습니다.

### Claude Code가 필요한 이유

기존 개발 워크플로우에서 개발자는 편집기, 터미널, 브라우저, 문서 사이를 빈번하게 전환합니다. Claude Code는 이러한 워크플로우를 하나의 인터페이스로 통합합니다. 같은 터미널 창에서 코드를 작성하고, 테스트를 실행하고, 문서를 읽고, 팀원과 협업할 수 있습니다. 더 중요한 것은, 프로젝트 구조를 이해하고 코딩 습관을 기억하여 진정한 프로그래밍 조수가 된다는 것입니다.

### 방법 1: 수동 설치

수동 설치는 각 단계를 완전히 제어하고 싶은 개발자에게 적합하며, 도구의 구성 요소를 명확히 이해하는 데도 도움이 됩니다.

```bash
# Claude Code CLI 전역 설치
# -g를 사용하여 전역 설치하면 모든 디렉토리에서 사용할 수 있습니다
npm install -g @anthropic-ai/claude-code

# 설치 확인
# 버전 번호가 표시되면(예: 0.1.25) 설치가 성공한 것입니다
claude --version
```

설치 과정에서 npm이 자동으로 의존성을 다운로드하고 환경 변수를 구성합니다. 권한 문제가 발생하면 `sudo`(macOS/Linux)를 사용하거나 Windows에서는 관리자 권한으로 터미널을 실행하세요.

### 방법 2: AI Agent가 설치해주기

이미 다른 AI 코딩 어시스턴트(예: Cursor, Windsurf 또는 이 프로젝트의 AI Agent)를 사용 중이라면, 그것들이 설치를 완료하도록 할 수 있습니다. 장점은 AI가 환경을 자동으로 감지하고, 의존성 충돌을 처리하며, 시스템에 가장 적합한 설치 경로를 선택한다는 것입니다.

**다음과 같이 말하면 됩니다:**

```text
Anthropic의 Claude Code를 설치해 주세요.
```

또는 더 구체적으로:

```text
Claude Code CLI를 설치하고 Node.js 버전이 호환되는지 확인해 주세요.
```

AI Agent가 수행할 작업:
1. 현재 Node.js 버전 확인
2. 요구 사항을 충족하지 않으면 업그레이드 안내
3. 설치 명령어 실행
4. 설치 결과 확인
5. 문제 발생 시 자동 수정 시도

### 첫 실행 및 초기화

설치가 완료되면 프로젝트 디렉토리로 이동하여 Claude Code를 시작합니다:

```bash
# 프로젝트 디렉토리로 이동 (Claude Code는 현재 디렉토리에서 작동)
cd /path/to/your/project

# Claude Code 시작
claude
```

첫 실행 시 Claude Code가 몇 가지 중요한 설정 단계를 안내합니다:

1. **Anthropic 계정 로그인**: Claude Code를 사용하려면 Anthropic 계정이 필요합니다. 계정이 없으면 가입 안내가 표시됩니다.
2. **플랜 선택**:
   - **무료 플랜**: 개인 학습 및 가벼운 사용에 적합, 호출 횟수 제한 있음
   - **Pro 플랜**: 전문 개발자에게 적합, 더 높은 할당량과 우선 응답 제공
3. **약관 동의**: Anthropic 이용약관 및 개인정보 처리방침 읽기 및 동의
4. **선택사항: API 키 구성**: 커스텀 키(예: 서드파티 제공업체)가 있는 경우 여기서 구성

::: info 중국 본토 사용자를 위한 특별 안내

네트워크 상의 이유로 중국 본토 사용자는 Anthropic 공식 서비스에 직접 접속하지 못할 수 있습니다. Claude Code는 Anthropic API 형식과 호환되는 서드파티 서비스를 지원하며, 기술적으로 가능합니다.

**두 가지 옵션이 있습니다:**

1. **API 토큰 직접 사용**: Anthropic API와 호환되는 제공업체에서 토큰을 구매하고 환경 변수로 구성
2. **코딩 플랜 사용**: 일부 제공업체는 코딩 시나리오에 최적화된 플랜을 제공하며, 일반적으로 더 비용 효율적입니다

**권장 방법**: AI Agent에게 구성을 도와달라고 요청하세요. 제공업체의 구성 정보(API 엔드포인트, 키 등)만 제공하면 AI가 환경 변수를 올바르게 설정합니다.

**자세한 설정 가이드 참조:** [Claude Code 설치 및 환경 변수 구성 방법](/ko-kr/stage-2/backend/modern-cli/)

:::

---

## 빠른 시작: 몇 가지 작은 실험 실행하기

설치 후 바로 본격적인 프로젝트에 들어가지 마세요. 먼저 몇 가지 작은 실험을 통해 Claude Code의 작동 방식을 이해하세요. 다음 세 가지 실험은 쉬운 것부터 고급까지 설계되었으며, 각각 세 가지 핵심 능력에 해당합니다: 자연어 이해, 콘텐츠 생성, 코드 실행.

### 실험 1: 대화 — AI의 이해력 체험하기

목적은 Claude Code의 자연어 이해 능력을 체험하는 것입니다. 일반 검색 엔진과 달리 Claude Code는 맥락을 이해하고, 다중 턴 대화를 진행하며, 피드백에 따라 답변을 조정할 수 있습니다.

**다음 프롬프트를 시도해 보세요:**

```text
안녕하세요, 당신은 누구인가요?
```

Claude는 자신을 Anthropic의 AI 코딩 어시스턴트인 Claude Code라고 소개합니다.

```text
클로저란 무엇인가요? TL;DR 버전으로 설명해 주세요.
```

Claude가 "TL;DR"을 힌트로 사용하여 간결하면서도 정확한 설명을 제공하는지 관찰하세요.

```text
JavaScript와 TypeScript의 차이점은 무엇인가요?
```

이것은 기술 비교 질문입니다. Claude가 구조화되고 심도 있는 답변을 제공하는지 확인하세요.

**실험 포인트**: Claude의 응답 스타일에 주목하세요. 보통 핵심 결론을 먼저 제시한 후 세부 사항을 설명합니다. 이 "역피라미드" 스타일은 빠른 정보 획득에 매우 적합합니다.

### 실험 2: Markdown 문서 생성 — 콘텐츠 생성 체험하기

이 실험은 Claude Code의 콘텐츠 생성 능력을 보여줍니다. 개발자에게 문서 작성은 종종 고통스러운 작업입니다. Claude는 요구사항에서 빠르고 명확하며 완전한 문서를 생성할 수 있습니다.

**다음 명령을 입력하세요:**

```text
자주 사용하는 Git 명령어의 Markdown 문서를 작성해 주세요.
요구사항: 명령어, 설명, 예시를 포함하세요.
```

**Claude가 수행하는 작업:**

1. 요구사항 분석: 자주 사용하는 Git 명령어, Markdown 형식, 세 가지 요소(명령어/설명/예시)
2. 문서 구조 기획: 보통 사용 시나리오별로 그룹화(초기화, 일상 개발, 브랜치 워크플로우, 원격 협업 등)
3. 콘텐츠 생성: 각 명령어에 대한 간결한 설명과 실용적인 예시
4. 형식 출력: Markdown 구문과 적절한 구조 사용

**예상 출력 예시:**

```markdown
# 자주 사용하는 Git 명령어 치트시트

## 저장소 초기화

| 명령어 | 설명 | 예시 |
|--------|------|------|
| `git init` | 새 저장소 초기화 | `git init my-project` |
| `git clone` | 원격 저장소 복제 | `git clone https://github.com/user/repo.git` |

...
```

**고급 시도**: "중국어 주석 추가", "사용 빈도순 정렬", "일반적인 오류 처리 포함" 등 추가 요구사항을 추가하여 Claude가 출력을 어떻게 조정하는지 관찰하세요.

### 실험 3: 게임 작성 및 실행 — 엔드투엔드 코딩 워크플로우

이것은 가장 도전적인 실험입니다. Claude Code의 전체 워크플로우를 보여줍니다: 요구사항 이해, 코드 작성, 파일 생성, 프로그램 실행, 오류 처리. 이 실험을 통해 AI 코딩 어시스턴트의 강력함을 진정으로 느낄 수 있습니다.

**다음 명령을 입력하세요:**

```text
Python으로 스네이크 게임을 작성해 주세요.
요구사항:
1. pygame 사용
2. 점수 표시
3. ESC 키로 종료

작성 후 실행해 주세요.
```

**Claude가 실행하는 단계:**

**1단계: 환경 확인**
- Python이 설치되어 있는지 확인
- pygame을 사용할 수 있는지 확인
- 누락된 경우 설치 안내

**2단계: 코드 작성**
- 게임 진입 파일 생성(예: `snake_game.py`)
- 이동, 음식 생성, 충돌 감지 구현
- 점수 렌더링 추가
- ESC 종료 기능 구현

**3단계: 게임 실행**
- Python 스크립트 실행 및 게임 시작
- 게임 창이 열리고, 화살표 키로 뱀 조작

**4단계: 후속 지원**
- 버그가 있으면 "뱀이 벽을 통과합니다, 수정해 주세요"라고 직접 말하세요
- 더 많은 기능을 원하면, 예를 들어 "점수에 따라 난이도 증가"라고 하면 Claude가 계속 수정합니다

**이 실험의 가치:**

1. **설치 검증**: Claude Code가 코드를 올바르게 실행할 수 있는지 확인
2. **상호작용 체험**: AI와의 협업 개발 과정 체감
3. **자신감 구축**: AI가 엔드투엔드 실행 가능한 프로그램을 완성하는 것을 확인

**자주 묻는 질문:**

- **Q: pygame이 설치되지 않은 경우?**
  - A: Claude가 감지하고 `pip install pygame`을 제안하거나, Claude에게 설치를 요청할 수 있습니다

- **Q: 게임 시작 후 터미널이 점유된 경우 어떻게 하나요?**
  - A: ESC를 눌러 게임을 종료하거나, 다른 터미널 창에서 Claude Code를 계속 사용하세요

- **Q: 다른 언어로 전환할 수 있나요?**
  - A: 물론입니다. "JavaScript로 작성해 주세요", "HTML5 Canvas로 작성해 주세요" 등을 시도해 보세요

---

## 핵심 팁

이 팁들을 마스터하면 Claude Code 사용 효율을 여러 배 높일 수 있습니다. 실제 개발 실무에서 나온 것으로, 고빈도 사용 시나리오를 다룹니다.

### 팁 1: Esc 두 번 눌러서 대화 롤백 — 실수 되돌리기

이것은 Claude Code에서 가장 많이 사용되고 중요한 단축키입니다. 협업 중 오타를 치거나, 잘못된 지시를 내리거나, 응답이 마음에 들지 않을 수 있습니다. Esc를 두 번 누르면 빠르게 "시간 되감기"를 할 수 있습니다.

**단축키 설명:**

```text
Esc 1회 누름     -> 현재 입력 지우기 (Ctrl+C와 유사)
Esc 2회 누름     -> 이전 대화 상태로 롤백 (이전 턴 실행 취소)
Esc 3회 누름     -> 모든 대화 기록 지우기 (다시 시작)
```

**사용 사례:**

- **사례 A**: 잘못된 지시를 실수로 보냈고 Claude가 이미 실행을 시작한 경우. 빠르게 Esc를 두 번 눌러 실행 전으로 돌아갑니다.
- **사례 B**: Claude의 응답이 원하는 것이 아니며 다시 표현하고 싶은 경우. Esc 두 번으로 실행 취소 후 다시 질문합니다.
- **사례 C**: 대화가 여러 라운드를 거쳐 맥락이 복잡해진 경우. Esc 세 번으로 초기화 후 다시 시작합니다.

**중요 참고**: Esc 두 번은 **대화 상태**를 롤백하며, 코드 변경 사항은 롤백하지 않습니다. Claude가 이미 파일을 편집한 경우, 해당 편집은 자동으로 복원되지 않습니다. Git을 통해 수동으로 복원해야 합니다.

**권장사항**: 잠재적으로 대규모 코드 편집이 예상되기 전에 현재 상태를 저장(`git commit` 또는 `git stash`)하여 쉽게 복원할 수 있도록 하세요.

### 팁 2: @로 파일 참조 — 정밀한 맥락 제어

Claude Code가 프로젝트 파일을 자동으로 읽을 수 있지만, 파일을 명시적으로 참조하면 의도가 더 명확해지고 관련 없는 파일에서 토큰을 낭비하는 것을 피할 수 있습니다.

**기본 사용법:**

모호한 지시 대신:

```text
src/utils.ts 설명해 주세요
```

명시적 참조를 사용하세요:

```text
@src/utils.ts 이 파일을 설명해 주세요
```

**고급 사용법:**

**여러 파일 비교:**
```text
@src/app.tsx @src/components/Header.tsx 이 두 파일의 관계는 무엇인가요?
```

**디렉토리 참조:**
```text
@src/components/ 이 디렉토리의 모든 컴포넌트를 요약해 주세요
```

**특정 줄 참조(편집기와 함께):**
```text
@src/utils.ts:45-60 이 코드가 하는 일을 설명해 주세요
```

**사용 팁:**

1. **Tab 완성**: `@`를 입력한 후 Tab을 누르면, Claude가 현재 디렉토리의 파일 목록을 표시하고 화살표 키로 선택할 수 있습니다
2. **상대 경로**: `@./config.json`이나 `@../shared/types.ts`와 같은 참조를 지원합니다
3. **퍼지 매칭**: 부분 파일 이름이 허용됩니다. 예를 들어 `@utils`는 `src/utils.ts` 또는 `src/utils/index.ts`와 매칭될 수 있습니다

### 팁 3: !로 명령어 실행 — 터미널 통합

Claude Code에는 명령어 실행 기능이 내장되어 있습니다. 다른 터미널로 전환하지 않고도 명령어를 실행할 수 있습니다.

**기본 사용법:**

```text
!npm test           # 테스트 실행
!git status         # Git 상태 확인
!ls -la             # 파일 나열
```

**실용적인 시나리오:**

**시나리오: 테스트 실행 및 실패 분석**
```text
!npm test
# 실패 후
테스트 실패 원인을 분석하고 코드를 수정해 주세요
```

**시나리오: Git diff 확인**
```text
!git diff
# Claude에게 변경사항 설명 요청
이 diff의 주요 변경 사항을 요약해 주세요
```

**시나리오: 프로젝트 빌드**
```text
!npm run build
# 빌드 실패 시
빌드가 실패했습니다. 수정해 주세요
```

**안전 참고:**

민감한 명령어(예: `rm -rf`, `sudo`)의 경우 Claude Code가 확인을 요청합니다. 이것은 보호 메커니즘이므로 신중하게 확인하세요.

### 팁 4: 코딩 전 /plan 먼저 — 복잡한 작업 처리의 올바른 방법

복잡한 작업의 경우 바로 코딩하는 것은 종종 비효율적입니다. `/plan`은 계획 모드로 진입하여: 먼저 구현 계획을 정의한 후 단계별로 실행합니다.

**사용법:**

```text
/plan
사용자 인증 기능을 추가하고 싶습니다. 구현 계획을 만들어 주세요.
```

**Claude가 수행하는 작업:**

1. **요구사항 분석**
2. **현재 프로젝트 및 기술 스택 평가**
3. **단계별 계획 수립**
4. **피드백에 따라 논의 및 조정**

**출력 예시:**

```text
📋 사용자 인증 구현 계획

1단계: 데이터베이스 설계
- [ ] users 테이블 생성 (id, email, password_hash, created_at)
- [ ] sessions 테이블 생성 (id, user_id, expires_at)

2단계: 백엔드 API
- [ ] POST /api/auth/register - 회원가입
- [ ] POST /api/auth/login - 로그인
- [ ] POST /api/auth/logout - 로그아웃
- [ ] GET /api/auth/me - 현재 사용자 정보 조회

3단계: 프론트엔드 통합
- [ ] 로그인 페이지 생성
- [ ] 회원가입 페이지 생성
- [ ] 라우트 가드 추가

4단계: 테스트
- [ ] 단위 테스트 작성
- [ ] 통합 테스트 작성

어느 단계부터 시작하시겠습니까? 아니면 계획을 조정할까요?
```

**모범 사례:**

- 30분 이상 예상되는 작업은 먼저 `/plan`을 사용하세요
- 단계별로 실행하고 각 단계를 검증하세요
- 요구사항이 변경되면 `/plan`을 다시 실행하여 조정하세요

### 팁 5: /init 자동 설정 생성 — 빠른 프로젝트 초기화

`/init`은 Claude Code의 가장 강력한 명령 중 하나입니다. 프로젝트를 자동으로 스캔하고, 기술 스택과 구조를 식별하며, 완전한 `CLAUDE.md`를 생성합니다.

**사용법:**

```text
/init
```

**Claude가 수행하는 작업:**

1. **프로젝트 구조 스캔**: 프레임워크/언어/빌드 도구 식별
2. **설정 파일 분석**: package.json, tsconfig.json 등 읽기
3. **스타일 추론**: 네이밍 규칙 및 파일 조직 방식
4. **CLAUDE.md 생성**

**생성된 CLAUDE.md 예시:**

```text
# 내 프로젝트

## 기술 스택
- 프레임워크: Next.js 14 (App Router)
- 언어: TypeScript
- 스타일링: Tailwind CSS
- 상태 관리: Zustand
- 데이터베이스: Prisma + PostgreSQL

## 자주 사용하는 명령어

\`\`\`bash
npm run dev      # 개발 서버 시작
npm run build    # 프로덕션 빌드
npm run test     # 테스트 실행
npx prisma migrate dev  # DB 마이그레이션
\`\`\`

## 코드 규칙
- 함수 컴포넌트 + Hooks 사용
- 파일 네이밍: PascalCase(컴포넌트), camelCase(유틸리티 함수)
- 커밋 스타일: Conventional Commits
```

**이것이 중요한 이유:**

`CLAUDE.md`는 Claude Code의 "프로젝트 메모리"입니다. 매번 시작할 때 Claude가 이 파일을 읽고 프로젝트 배경을 이해합니다. 즉:

- 프레임워크와 기술 스택을 반복해서 설명할 필요가 없습니다
- Claude가 규칙과 모범 사례를 따릅니다
- 새 팀원이 더 빠르게 온보딩할 수 있습니다

**권장사항**: 프로젝트 초기화 후 즉시 `/init`을 실행한 후, 실제 상황에 맞게 생성된 설정을 미세 조정하세요.

### 팁 6: /compact 컨텍스트 압축 — 토큰 절약

Claude Code의 컨텍스트 윈도우는 제한되어 있습니다(보통 약 200K 토큰). 긴 대화는 많은 토큰을 소비하고, 비용이 증가하며, 중요한 초기 정보가 컨텍스트에서 밀려날 수 있습니다.

**사용법:**

```text
/compact
```

**작동 원리:**

`/compact`은 대화 기록을 분석하고, 핵심 정보(내린 결정, 생성한 코드, 확인한 요구사항)를 추출하여 간결한 요약을 만듭니다. 이후 대화는 전체 기록이 아닌 이 요약을 기반으로 진행됩니다.

**사용 시기:**

- 5-6라운드 대화 후
- Claude가 이전 맥락을 "잊어버린" 것 같을 때
- 새로운 하위 작업으로 전환하면서 핵심 배경을 유지해야 할 때

**권장 사용법:**

```text
# 긴 대화 후 압축
/compact

# 계속 작업
사용자 모듈이 완료되었으니, 이제 주문 모듈을 만들어 봅시다.
```

### 팁 7: Claude Code로 Git 커밋 보조하기

Claude Code에서 권장하는 커밋 워크플로우는: Claude가 diff를 검사하고 커밋 메시지를 초안한 후, 표준 Git 명령을 실행하는 것입니다. 이렇게 하면 명확하고 커밋 전에 한 번 더 검토할 수 있습니다.

공식 참조:

- [내장 명령어](https://code.claude.com/docs/en/commands)
- [플러그인 탐색](https://code.claude.com/docs/en/discover-plugins)

**권장 워크플로우:**

```bash
# 1. 현재 변경 사항 확인
/diff
!git status

# 2. Claude에게 요약 및 커밋 메시지 생성 요청
현재 git diff를 기반으로 Conventional Commits 형식의 커밋 메시지를 생성하고,
이 카테고리가 적절한 이유를 한국어로 설명해 주세요.

# 3. 확인 후 표준 Git 커밋 실행
!git add -A
!git commit -m "feat(docs): Claude Code 워크플로우 가이드 업데이트"
```

**이 접근법의 장점:**

1. **현재 공식 기능과 일치**: 제거된 내장 명령에 의존하지 않음
2. **투명성**: 제출 전 diff 및 커밋 메시지 검토 가능
3. **이식성**: 동일한 워크플로우가 다른 AI IDE나 순수 Git에서도 작동

**"원클릭 커밋" 경험을 원한다면:**

Claude Code는 이제 플러그인 기반 확장을 권장합니다. 예를 들어, `commit-commands`는 `/commit-commands:commit`과 같은 명령을 제공합니다.

```bash
# 1. 플러그인 마켓플레이스 예시 추가
/plugin marketplace add anthropics/claude-code

# 2. 커밋 워크플로우 플러그인 설치
/plugin install commit-commands@anthropics-claude-code

# 3. 플러그인 다시 로드
/reload-plugins

# 4. 플러그인 명령으로 커밋
/commit-commands:commit
```

**추가 참고:**

- `/commit-commands:commit`은 플러그인에서 제공되며, 현재 기본 내장 명령이 아닙니다
- 커밋 전 변경 사항만 검사하려면 `/diff`를 사용하거나 Claude에게 `git diff`를 설명해 달라고 요청하세요
- 공식 `/review`도 더 이상 사용되지 않는 것으로 표시되었습니다; 유사한 기능이 필요하면 플러그인이나 자연어 리뷰 워크플로우를 사용하세요

### 팁 8: Shift+Tab 자동 수락 — 유창성 향상

기본적으로 Claude는 코드 편집 전 확인을 요청합니다. 학습 단계에서는 유용하지만, 나중에는 느리게 느껴질 수 있습니다. `Shift+Tab`은 자동 수락 모드를 활성화하여 반복 속도를 높입니다.

**사용법:**

- `Shift+Tab` 누름 -> 자동 수락 모드 진입
- `Shift+Tab` 다시 누름 -> 자동 수락 모드 종료

**모드 비교:**

| 모드 | 동작 | 사용 시나리오 |
|------|------|---------------|
| 기본 모드 | 모든 편집에 대해 확인 요청 | 학습 단계, 중요 코드 |
| 자동 수락 | 편집을 바로 적용 | 익숙해진 후, 빠른 반복 |

**참고사항:**

- 자동 수락 모드에서는 Claude가 파일을 직접 편집하며, 두 번째 확인을 요청하지 않습니다
- Git과 함께 사용하여 쉽게 롤백할 수 있도록 권장합니다
- 민감한 작업(파일 삭제, 핵심 설정 수정)의 경우 Claude는 여전히 확인을 요청합니다

### 팁 9: Ctrl+C 작업 취소 — 긴급 브레이크

Claude가 긴 작업을 실행 중이거나, 잘못된 지시를 내렸다는 것을 깨달은 경우 `Ctrl+C`가 긴급 브레이크입니다.

**사용법:**

- `Ctrl+C` 1회 누름 -> 현재 실행 중인 작업 취소
- `Ctrl+C` 2회 누름 -> Claude Code 완전 종료

**사용 사례:**

- 장시간 실행 중인 명령을 중단해야 할 때
- Claude가 대량의 관련 없는 코드를 생성 중일 때
- 잘못된 지시를 감지하고 즉시 중지하고 싶을 때

**Esc 두 번과의 차이점:**

- `Ctrl+C`: 진행 중인 **작업** 중지(명령 실행/코드 생성)
- `Esc 두 번`: **대화 상태** 롤백(이전 턴 실행 취소)

### 팁 10: /context 컨텍스트 사용량 확인 — 토큰 비용 최적화

`/context`는 현재 세션의 컨텍스트 사용량을 표시하여, 토큰 소비를 이해하고 비용을 최적화하는 데 도움을 줍니다.

**사용법:**

```text
/context
```

**출력 예시:**

```text
📊 컨텍스트 사용량

토큰 사용량: 45,230 / 200,000 (22.6%)
파일 참조 수: 12개 파일
대화 라운드: 8

토큰 소비가 가장 많은 파일:
1. src/api/users.ts (3,420 토큰)
2. node_modules/@types/react/index.d.ts (2,890 토큰)
3. src/components/Dashboard.tsx (1,560 토큰)

제안:
- 현재 사용량은 건강합니다. 압축이 필요하지 않습니다
- 사용량을 줄이려면 node_modules를 .claudeignore에 추가하세요
```

**이 정보를 활용하는 방법:**

1. **큰 파일 식별**: 한 파일이 많은 토큰을 소비한다면, 정말 필요한지 확인하세요
2. **.claudeignore 최적화**: 관련 없는 파일 무시(node_modules, 빌드 출력 등)
3. **압축 시기 결정**: 사용량이 70%를 초과하면 `/compact`을 고려하세요

### 팁 11: /resume 세션 복원 — 멀티태스크 대화 전환

여러 작업을 처리할 때 여러 대화 스레드를 실행할 수 있습니다. `/resume`을 사용하면 현재 채팅에서 이전 세션 컨텍스트로 다시 전환할 수 있으며, 처음부터 다시 시작할 필요가 없습니다.

**사용법:**

```text
/resume
```

**작동 원리:**

Claude Code는 이전 세션을 자동으로 기록합니다. `/resume`을 실행하면 이전 세션 컨텍스트로 전환되며, 모든 이전 논의 내용과 상태가 유지됩니다.

**사용 사례:**

**사례 A: 병렬 멀티태스킹**
```text
# 작업 1: 버그 수정
claude> 로그인 페이지 검증 문제를 수정해 주세요
# ... 한 대화 ...

# 작업 2: 기능 추가 (새 스레드)
claude> 사용자 등록 기능을 추가해 주세요
# ... 또 다른 대화 ...

# 작업 1로 다시 전환
claude> /resume
# 이전 버그 수정 작업 계속
```

**사례 B: 임시 조회 후 복귀**
```text
claude> 이 알고리즘을 설명해 주세요
# ... 알고리즘 논의 ...

claude> /resume
# 이전 코딩 작업으로 복귀
```

**사례 C: 중단 후 재개**
```text
claude> 이전 작업을 계속해 주세요
# 이전에 중단했다면, /resume이 이전 상태로 돌아갑니다
```

**관련 명령과의 비교:**

| 명령 | 기능 | 시나리오 |
|------|------|----------|
| `/resume` | 현재 채팅에서 이전 세션으로 전환 | 멀티태스크 전환 |
| `claude -c` | 가장 최근 세션 계속 | 종료 후 재연결 |
| `claude -r` | 이전 세션 복원 | 종료 후 이전 상태 복구 |
| `Esc 두 번` | 한 턴 롤백 | 가장 최근 대화 턴 실행 취소 |

**제안:**

1. **멀티태스크 관리**: `/resume`은 맥락을 다시 설명하는 것보다 더 효율적입니다
2. **세션 메모리**: 각 세션은 독립적인 컨텍스트를 가집니다; `/resume`은 이를 보존합니다
3. **/compact와 함께 사용**: 긴 세션에서는 먼저 압축한 후 세션을 전환하여 컨텍스트를 깔끔하게 유지하세요

---

## 핵심 설정

합리적인 설정은 Claude Code가 프로젝트와 팀에 더 잘 맞게 도와줍니다. 이 섹션에서는 설정의 역할, 우선순위, 다양한 사용 시나리오에 대한 최적화를 설명합니다.

### 설정 파일 위치 및 우선순위

Claude Code는 계층적 설정 전략을 사용합니다. 다른 수준은 다른 범위와 우선순위를 가집니다. 이를 이해하면 설정을 유연하게 관리할 수 있습니다.

**설정 우선순위(높은 것부터 낮은 순):**

| 위치 | 범위 | 용도 | Git에 커밋 |
|------|------|------|-------------|
| `.claude/settings.local.json` | 로컬 프로젝트 | 개인 기본 설정 | 아니요 |
| `.claude/settings.json` | 프로젝트 공유 | 팀 전체 설정 | 예 |
| `~/.claude/settings.json` | 전역 | 개인 기본값 | 아니요 |

**병합 규칙:**

- 높은 우선순위 설정이 낮은 우선순위의 동일한 키를 재정의합니다
- 충돌하지 않는 키는 병합됩니다
- 프로젝트 설정이 전역 설정을 재정의합니다
- 로컬 개인 설정이 공유 프로젝트 설정을 재정의합니다

**실제 시나리오:**

**시나리오 1: 팀 프로젝트**
```text
~/.claude/settings.json          # 개인 기본 편집기 설정
.claude/settings.json            # 팀 코딩 표준 및 권한 설정
.claude/settings.local.json      # 개인 디버그 기본 설정 및 테마 설정
```

**시나리오 2: 개인 프로젝트**
```text
~/.claude/settings.json          # 전역 기본 설정
.claude/settings.json            # 프로젝트별 설정(예: 특수 권한 규칙)
```

### CLAUDE.md — 프로젝트 메모리

`CLAUDE.md`는 Claude Code에서 가장 중요한 설정 파일입니다. 프로젝트의 "매뉴얼"과 같습니다. Claude Code가 시작될 때마다 현재 디렉토리의 `CLAUDE.md`를 읽고 프로젝트 배경, 기술 스택, 규칙을 이해합니다.

**CLAUDE.md가 중요한 이유:**

새 프로젝트에 합류한다고 상상해 보세요: 기술 스택, 코딩 규칙, 자주 사용하는 명령어를 학습해야 합니다. 보통 문서/코드 리뷰와 팀원 질문에 몇 시간이 걸립니다. `CLAUDE.md`가 있으면 Claude가 시작 시 이 모든 것을 알고 있어 즉시 효과적으로 협업할 수 있습니다.

**최소 실행 가능한 템플릿:**

```text
# [프로젝트 이름]

## 기술 스택
- 프레임워크: React 18 + TypeScript
- 상태 관리: Zustand
- 스타일링: Tailwind CSS
- 빌드 도구: Vite

## 자주 사용하는 명령어

\`\`\`bash
npm run dev      # 개발 서버 시작(포트 5173)
npm run test     # 단위 테스트 실행
npm run build    # 프로덕션 빌드
npm run lint     # 린트 검사
\`\`\`

## 코드 규칙
- 컴포넌트는 함수 컴포넌트 + Hooks 사용
- 네이밍: PascalCase(컴포넌트), camelCase(유틸리티 함수)
- Git 커밋은 Conventional Commits 사용
- 모든 API 호출은 통합 요청 래퍼를 거쳐야 함
```

**전체 템플릿(권장):**

```text
# [프로젝트 이름]

## 프로젝트 개요
주요 기능과 대상 사용자를 한 문장으로 설명.

## 기술 스택
### 프론트엔드
- 프레임워크: React 18 + TypeScript
- 라우터: React Router v6
- 상태 관리: Zustand + React Query
- 스타일링: Tailwind CSS + Headless UI
- 빌드: Vite

### 백엔드(해당되는 경우)
- 런타임: Node.js + Express
- 데이터베이스: PostgreSQL + Prisma
- 인증: JWT + bcrypt

## 프로젝트 구조

\`\`\`
src/
├── components/      # 재사용 가능한 컴포넌트
├── pages/           # 페이지 컴포넌트
├── hooks/           # 커스텀 Hooks
├── lib/             # 유틸리티 함수
├── types/           # TypeScript 타입
└── api/             # API 호출
\`\`\`

## 자주 사용하는 명령어

\`\`\`bash
# 개발
npm run dev              # 개발 서버 시작
npm run dev:mock         # 개발 시 목 데이터 사용

# 테스트
npm run test             # 모든 테스트 실행
npm run test:watch       # 감시 모드
npm run test:coverage    # 커버리지 보고서 생성

# 코드 품질
npm run lint             # ESLint 검사
npm run lint:fix         # ESLint 문제 자동 수정
npm run format           # Prettier 포맷팅
npm run typecheck        # TypeScript 타입 검사

# 빌드
npm run build            # 프로덕션 빌드
npm run preview          # 프로덕션 빌드 미리보기
\`\`\`

## 개발 규칙
### 코드 스타일
- 함수 컴포넌트 사용, 클래스 컴포넌트 지양
- 논리 추상화를 위해 커스텀 Hooks 선호
- 컴포넌트 props는 반드시 TypeScript 인터페이스 정의

### Git 워크플로우
- 브랜치 접두사: `feature/`, `fix/`, `refactor/`
- 커밋 메시지는 Conventional Commits 따름
- PR은 CI 및 코드 리뷰를 통과해야 함

### 성능 요구사항
- 컴포넌트 지연 로딩으로 첫 화면 로딩 시간 단축
- WebP 이미지 사용 및 지연 로딩 활성화
- API 응답 시간 200ms 이하 유지

## 환경 변수

\`\`\`bash
# .env.local
VITE_API_BASE_URL=http://localhost:3000
VITE_APP_NAME=MyApp
\`\`\`

## 자주 묻는 질문

### 개발 서버 시작 실패?

포트 5173이 점유되어 있는지 확인하거나 `npm run dev -- --port 3000` 시도

### 타입 오류?

`npm run typecheck`를 실행하여 상세 오류 확인
```

**CLAUDE.md 빠른 생성:**

프로젝트가 이미 존재하지만 `CLAUDE.md`가 없는 경우 `/init`을 실행하세요:

```bash
claude
# Claude Code 내에서
/init
```

Claude가 프로젝트 구조, package.json, 기존 코드를 분석한 후 실용적인 `CLAUDE.md`를 생성합니다. 생성 후 수동으로 검토하고 조정하세요.

### .claudeignore — 토큰 절약

`.claudeignore`는 Claude Code에 어떤 파일을 컨텍스트로 읽지 않아야 하는지 알려줍니다. 올바른 구성은 토큰 사용량을 크게 줄일 수 있으며(보통 40-60%), 응답 속도를 향상시킵니다.

**.claudeignore가 필요한 이유:**

Claude Code가 프로젝트를 이해하려고 할 때 관련 파일을 읽습니다. 일부 파일은 이해에 도움이 되지 않으며 다음과 같은 문제를 일으킬 수 있습니다:
- 많은 토큰 소비(예: node_modules의 타입 정의 파일)
- 노이즈 도입(로그, 빌드 출력)
- 민감한 정보 포함(.env 파일)

**권장 구성:**

```text
# ===== 의존성 =====
# 방대한 서드파티 코드, 보통 Claude 컨텍스트에 불필요
node_modules/
.pnp/
.pnp.js

# ===== 빌드 출력 =====
# 생성된 산출물, 소스 로직이 아님
dist/
build/
.next/
out/
*.tsbuildinfo

# ===== 로그 =====
# 런타임 로그, 아키텍처 이해에 가치 없음
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

# ===== 테스트 출력 =====
coverage/
.nyc_output/

# ===== 편집기 / IDE =====
.vscode/*
!.vscode/extensions.json
.idea/
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?

# ===== 시스템 파일 =====
.DS_Store
Thumbs.db

# ===== 환경 파일 =====
.env
.env.local
.env.*.local

# ===== 대용량 바이너리 에셋 =====
*.png
*.jpg
*.jpeg
*.gif
*.svg
*.ico
*.mp4
*.webm

# ===== 락 파일(선택사항) =====
# Claude가 의존성 버전을 분석할 필요가 없다면 무시하세요
# package-lock.json
# yarn.lock
# pnpm-lock.yaml
```

**구성 팁:**

1. **최소한으로 시작**: 먼저 node_modules와 빌드 출력을 무시한 후 토큰 사용량 관찰
2. **프로젝트별 조정**: 이미지가 많은 프로젝트 -> 이미지 형식 무시; 문서 프로젝트 -> Markdown 유지
3. **정기적으로 최적화**: `/context`를 사용하여 토큰 소비가 가장 많은 파일을 확인하고 무시 여부 결정

### 권한 설정

기본적으로 Claude Code는 민감한 작업 전에 확인을 요청합니다. `settings.json`의 `permissions`를 통해 어떤 작업을 자동 허용할지, 확인을 요청할지, 완전히 거부할지 제어할 수 있습니다.

**권한 설정 구조:**

```json
{
  "permissions": {
    "allow": [
      // 자동 허용, 질문 없음
    ],
    "ask": [
      // 실행 전 질문
    ],
    "deny": [
      // 완전 거부
    ]
  }
}
```

**규칙 구문:**

권한 규칙은 `ActionType(pattern)` 형식을 사용합니다:

| 액션 유형 | 설명 | 예시 |
|-----------|------|------|
| `Bash` | 터미널 명령 실행 | `Bash(git status)` |
| `Edit` | 파일 편집 | `Edit(src/**/*.ts)` |
| `Read` | 파일 읽기 | `Read(README.md)` |
| `Write` | 파일 생성 | `Write(src/components/*.tsx)` |

**와일드카드 지원:**

- `*` 임의의 문자와 일치(`/` 제외)
- `**` 임의의 경로와 일치
- `?` 한 글자와 일치

**실제 설정 예시:**

```json
{
  "permissions": {
    "allow": [
      "Bash(git status)",
      "Bash(git log:*)",
      "Bash(git diff:*)",
      "Bash(npm test:*)",
      "Bash(npm run lint:*)",
      "Edit(src/**/*.{ts,tsx})",
      "Edit(tests/**/*.test.ts)",
      "Read(src/**/*.ts)",
      "Write(src/components/*.tsx)"
    ],
    "ask": [
      "Bash(git commit:*)",
      "Bash(git push:*)",
      "Bash(git pull:*)",
      "Bash(npm install:*)",
      "Bash(npm run build)",
      "Edit(package.json)",
      "Edit(tsconfig.json)",
      "Read(.env)",
      "Read(config/secrets.*)"
    ],
    "deny": [
      "Bash(rm -rf:*)",
      "Bash(sudo:*)",
      "Bash(curl * | sh)",
      "Bash(wget * | sh)",
      "Edit(.git/*)",
      "Write(/etc/*)",
      "Read(/etc/passwd)"
    ]
  }
}
```

**설정 제안:**

1. **개발 단계**: 빠른 반복을 위해 비교적 느슨한 권한
2. **프로덕션 단계**: 특히 배포 및 민감한 데이터 작업에 대해 더 엄격한 권한
3. **팀 협업**: 공유 `settings.json`에 기본 규칙을 두고, 개인 조정은 `settings.local.json`에

### 규칙 디렉토리

대규모 프로젝트의 경우 단일 `CLAUDE.md`가 비대해져 관리하기 어려울 수 있습니다. Claude Code는 **규칙 디렉토리**를 통한 모듈식 관리를 지원하여, 주제별로 규칙을 개별 파일로 분리할 수 있습니다.

**디렉토리 구조:**

```text
.claude/
├── settings.json          # 주요 설정 파일
├── CLAUDE.md              # 프로젝트 개요(여전히 필요)
└── rules/                 # 규칙 디렉토리
    ├── 00-security.md     # 보안 규칙(전역)
    ├── 01-coding-style.md # 코딩 스타일 규칙(전역)
    ├── 10-api.md          # API 개발 규칙
    ├── 11-frontend.md     # 프론트엔드 개발 규칙
    ├── 12-backend.md      # 백엔드 개발 규칙
    └── 20-testing.md      # 테스트 규칙
```

**파일명 제안:**

숫자 접두사(`00-`, `01-`)를 사용하여 로드 순서를 제어하세요: 기본 규칙이 먼저, 특정 규칙이 나중에.

**규칙 파일 형식:**

규칙 파일은 YAML frontmatter를 지원하여 적용 범위를 정의할 수 있습니다:

```markdown
---
# 선택사항: 이 규칙이 적용되는 경로
globs:
  - "src/api/**/*.ts"
  - "src/services/**/*.ts"

# 선택사항: 이 규칙이 적용되는 명령어
commands:
  - "generate api"
  - "create endpoint"

# 선택사항: 규칙 우선순위(숫자가 작을수록 = 우선순위 높음)
priority: 10
---

# API 개발 규칙

## 라우트 설계
- RESTful 스타일, 복수 명사 사용
- 버전 관리: /api/v1/users
- 중첩 리소스: /api/v1/users/123/orders

## 요청/응답 형식
- JSON 일관되게 사용
- 오류 응답은 반드시 code와 message 포함
- 페이지네이션 응답은 { data, pagination } 구조 사용

## 보안 요구사항
- 모든 엔드포인트는 인증 확인 필수(공개 엔드포인트 제외)
- 민감한 작업은 2차 확인 필요
- 남용 방지를 위한 속도 제한 구현
```

**규칙 상속 및 재정의:**

- 전역 규칙(frontmatter가 없거나 `globs: *`)은 모든 파일에 적용
- 경로 특정 규칙은 일치하는 파일에만 적용
- 규칙이 충돌하면 우선순위가 더 높은 규칙이 적용
- 특정 규칙은 전역 규칙을 재정의할 수 있음

**사용 시나리오 예시:**

**시나리오 1: 프론트엔드-백엔드 분리 프로젝트**
```text
.claude/rules/
├── 00-general.md          # 일반 표준(커밋 메시지, 네이밍)
├── 10-backend.md          # 백엔드 표준(NestJS 특정)
├── 11-frontend.md         # 프론트엔드 표준(React 특정)
└── 20-database.md         # 데이터베이스 표준(Prisma 특정)
```

**시나리오 2: 마이크로서비스 아키텍처**
```text
.claude/rules/
├── 00-global/             # 전역 규칙
│   ├── security.md
│   └── logging.md
├── 10-services/           # 서비스별 규칙
│   ├── user-service.md
│   ├── order-service.md
│   └── payment-service.md
└── 20-shared/             # 공유 컴포넌트 규칙
    ├── shared-lib.md
    └── common-utils.md
```

**마이그레이션 제안:**

이미 매우 큰 `CLAUDE.md`가 있는 경우, 다음과 같이 규칙 디렉토리로 마이그레이션할 수 있습니다:

1. `.claude/rules/` 생성
2. `CLAUDE.md`를 주제별로 분리
3. 각 규칙 파일에 적절한 frontmatter 추가
4. `CLAUDE.md`는 프로젝트 개요로 유지하고 상세 표준은 이동
5. 테스트하여 규칙 로딩이 올바르게 작동하는지 확인

---

## 핵심 조작 명령어

Claude Code는 효율적인 AI 협업을 위한 풍부한 조작 명령어를 제공합니다. 이러한 명령어는 몇 가지 범주로 나뉩니다: 슬래시 명령어(내장 기능), 기호 시스템(빠른 조작), 자연어 지시(일상 개발).

### 슬래시 명령어 빠른 참조

슬래시 명령어는 `/`로 시작하는 내장 조작입니다. 프로젝트 초기화, 설정 관리, 상태 확인과 같은 표준화된 작업을 제공합니다.

| 명령어 | 기능 | 사용 시나리오 |
|--------|------|---------------|
| `/help` | 모든 명령어 표시 | 명령어를 잊어버렸을 때 빠른 조회 |
| `/init` | 프로젝트 초기화 및 CLAUDE.md 생성 | 새 프로젝트 또는 설정 추가 |
| `/plan` | 계획 모드 진입 | 복잡한 작업 전 계획 수립 |
| `/clear` | 대화 기록 지우기 | 맥락이 복잡할 때 다시 시작 |
| `/compact` | 컨텍스트 압축 | 긴 대화 후 토큰 절약 |
| `/diff` | 대화형 diff 보기 열기 | 현재 커밋되지 않은 변경 사항 확인 |
| `/plugin` | 플러그인 관리 | 커밋/리뷰 확장 설치 |
| `/context` | 컨텍스트 사용량 표시 | 토큰 비용 최적화 |
| `/cost` | 세션 비용 표시 | 사용 비용 모니터링 |
| `/config` | 설정 패널 열기 | 설정 업데이트 |
| `/permissions` | 권한 관리 | 작업 권한 조정 |
| `/model` | 모델 전환 | 다른 모델 선택 |

**명령어 조합 예시:**

```bash
# 완전한 개발 워크플로우
/plan                    # 1. 계획 수립
# ... 개발 실행 ...
/diff                    # 2. 변경 사항 확인
현재 diff에서 커밋 메시지를 생성해 주세요
!git add -A              # 3. 변경 사항 스테이징
!git commit -m "..."     # 4. 커밋
/cost                    # 5. 비용 확인
```

### 기호 시스템

기호 시스템은 Claude Code의 빠른 조작 메커니즘입니다. 특수 기호로 특정 기능을 빠르게 트리거할 수 있습니다.

| 기호 | 이름 | 용도 | 예시 |
|------|------|------|------|
| `/` | 슬래시 명령어 | 내장 조작 실행 | `/help`, `/plan` |
| `@` | At 참조 | 파일/디렉토리 참조 | `@src/app.tsx` |
| `!` | 뱅 모드 | 터미널 명령 실행 | `!npm test` |
| `&` | 백그라운드 실행 | 백그라운드에서 작업 실행 | `&npm run dev` |

**기호 조합 팁:**

```bash
# 기호 조합
@src/utils.ts !npm test
# 의미: utils.ts를 읽고, 테스트 실행

@src/components/ @src/pages/ 이 두 디렉토리의 구조를 비교해 주세요
# 의미: 두 디렉토리를 동시에 참조하여 비교

!git diff @src/app.tsx 이 변경 사항을 설명해 주세요
# 의미: Git diff를 확인하고 Claude에게 특정 파일의 변경 설명 요청
```

### 파일 조작

파일 조작은 가장 일반적인 일상 작업입니다: 파일 읽기, 편집, 생성, 삭제.

**파일 읽기:**

```bash
# 기본 읽기
@src/app.tsx 이 파일을 설명해 주세요

# 읽기 + 분석
@src/utils/helpers.ts 잠재적인 성능 문제를 찾아주세요

# 비교 읽기
@src/components/OldButton.tsx @src/components/NewButton.tsx 차이점을 비교해 주세요
```

**파일 편집:**

```bash
# 간단한 편집
src/utils/date.ts의 formatDate를 수정하여 한국어 로케일 형식을 지원하게 해주세요

# 복잡한 편집
@src/api/users.ts 이 파일을 리팩토링해 주세요:
1. 중복된 오류 처리를 공유 handleError로 추출
2. Promise 체인을 async/await로 교체
3. JSDoc 주석 추가

# 일괄 편집
src/components/ 아래의 모든 클래스 컴포넌트를 함수 컴포넌트로 변환해 주세요
```

**파일 생성:**

```bash
# 단일 파일 생성
src/components/UserCard.tsx를 생성해 주세요. 사용자 정보를 표시하는 카드 컴포넌트입니다

# 관련 파일 생성
사용자 모듈을 생성해 주세요:
1. src/types/user.ts - User 인터페이스 정의
2. src/api/users.ts - 사용자 API 호출
3. src/components/UserCard.tsx - 사용자 카드 컴포넌트
4. src/hooks/useUser.ts - 사용자 데이터를 가져오는 Hook
```

**파일 삭제:**

```bash
# 확인과 함께 삭제
src/old-component.tsx를 삭제해 주세요 (이 컴포넌트는 더 이상 사용되지 않습니다)

# Claude가 확인을 요청하고 참조를 먼저 확인하도록 제안할 수 있습니다
```

### Git 조작

Claude Code는 Git과 깊게 통합되어 있어 터미널을 떠나지 않고도 전체 버전 관리 워크플로우를 완료할 수 있습니다.

**상태 확인:**

```bash
# Git 상태 표시
git status와 커밋되지 않은 변경 사항을 보여주세요

# 상세 diff
!git diff
src/api/users.ts의 변경 사항을 설명해 주세요
```

**커밋 생성:**

```bash
# 변경 사항 확인
/diff

# 커밋 메시지 생성
현재 git diff에서 Conventional Commit 형식의 커밋 메시지를 생성해 주세요

# 수동 커밋
!git add -A
!git commit -m "..."
```

**브랜치 조작:**

```bash
# 기능 브랜치 생성
!git checkout -b feature/user-authentication

# 구현 완료 후
현재 변경 사항을 기반으로 커밋 메시지를 생성해 주세요
!git add -A
!git commit -m "..."
!git push -u origin feature/user-authentication
```

**완전한 Git 워크플로우 예시:**

```bash
# 1. 새 기능 시작
!git checkout -b feature/payment-integration

# 2. 기능 개발 (Claude 지원)
알리페이와 위챗페이를 지원하는 결제 모듈을 생성해 주세요

# 3. 테스트 실행
!npm test

# 4. 변경 사항 확인
/diff

# 5. 커밋 메시지 생성 및 확인
현재 git diff에서 Conventional Commit 형식의 커밋 메시지를 생성해 주세요
!git add -A
!git commit -m "..."

# 6. 원격에 푸시
!git push -u origin feature/payment-integration

# 7. PR 생성 (선택사항, GitHub CLI 사용)
!gh pr create --title "feat: 결제 통합 추가" --body "알리페이와 위챗페이 지원"
```

### 코드 조작

코드 조작은 Claude Code의 핵심 강점입니다: 생성, 설명, 리팩토링, 최적화.

**코드 생성:**

```bash
# 컴포넌트 생성
인증 상태를 관리하는 React Hook을 생성해 주세요. 로그인/로그아웃/권한 확인 포함

# 유틸리티 함수 생성
상대 시간을 지원하는 날짜 포맷팅 유틸리티를 생성해 주세요 (예: "2시간 전")

# 완전한 모듈 생성
주문 모듈을 생성해 주세요:
- 주문 목록 페이지
- 주문 상세 페이지
- 주문 생성 API
- 주문 상태 관리
```

**코드 설명:**

```bash
# 줄별 설명
src/algorithms/quicksort.ts를 줄별로 설명해 주세요

# 고수준 설명
@src/services/payment.ts 이 모듈의 아키텍처 설계를 설명해 주세요

# 복잡한 로직 설명
src/utils/dataTransformer.ts의 reduce가 무엇을 하는지 설명해 주세요
```

**코드 리팩토링:**

```bash
# 아키텍처 리팩토링
src/components/의 클래스 컴포넌트를 함수 컴포넌트로 변환해 주세요

# 성능 리팩토링
src/App.tsx의 렌더링 성능을 최적화해 주세요. 불필요한 재렌더링을 줄여주세요

# 정리 리팩토링
@src/utils/helpers.ts 이 파일을 리팩토링해 주세요:
1. 사용하지 않는 함수 삭제
2. 반복되는 로직을 공유 유틸리티로 추출
3. 타입 정의 추가
4. 함수 네이밍 개선
```

**코드 디버깅:**

```bash
# 오류 분석
npm test가 실패했습니다. 근본 원인을 분석하고 수정해 주세요

# 성능 분석
@src/components/DataTable.tsx 이 컴포넌트의 렌더링이 느립니다. 병목 현상을 찾아주세요

# 로그 분석
!cat logs/error.log
이 오류 로그를 분석하고 근본 원인을 식별해 주세요
```

### 테스트 조작

테스트는 품질 보증에 필수적입니다. Claude Code는 테스트 생성, 테스트 실행, 결과 분석을 도울 수 있습니다.

**테스트 생성:**

```bash
# 단위 테스트
src/utils/math.ts에 대한 단위 테스트를 생성해 주세요. 경계 케이스 포함

# 컴포넌트 테스트
src/components/UserForm.tsx에 대한 React Testing Library 테스트를 생성해 주세요

# 통합 테스트
사용자 등록 흐름에 대한 통합 테스트를 생성해 주세요. 폼 제출부터 DB 기록까지
```

**테스트 실행 및 디버깅:**

```bash
# 테스트 실행
!npm test

# 실패한 테스트 디버깅
실패 원인을 분석하고 수정해 주세요
@tests/auth.test.ts

# 커버리지 확인
!npm run test:coverage
어떤 코드 경로가 커버되지 않았나요?
```

**테스트 전략 제안:**

```bash
사용자 인증을 추가했습니다. 다음을 수행해 주세요:
1. auth.service.ts에 대한 단위 테스트 생성
2. LoginForm에 대한 컴포넌트 테스트 생성
3. 모든 테스트를 실행하고 통과하는지 확인
```

### 명령어 체이닝 및 워크플로우 구성

Claude Code를 가장 효율적으로 사용하는 방법은 명령어를 연결하여 완전한 워크플로우를 만드는 것입니다.

**시나리오 1: 버그 수정 워크플로우**

```bash
# 1. 문제 확인
!npm test
테스트가 실패했습니다. 원인을 분석해 주세요

# 2. 문제 위치 파악
@src/utils/validation.ts 이 파일에 문제가 있나요?

# 3. 문제 수정
validation.ts의 isEmail을 수정하여 +가 포함된 주소를 올바르게 처리하도록 해주세요

# 4. 수정 검증
!npm test

# 5. 수정 커밋
현재 diff에서 fix 타입의 커밋 메시지를 생성해 주세요
!git add -A
!git commit -m "fix: ..."
```

**시나리오 2: 코드 리뷰 워크플로우**

```bash
# 1. 변경 사항 확인
!git diff --stat
어떤 파일이 변경되었나요?

# 2. 상세 리뷰
@src/components/ 이 컴포넌트의 변경 사항을 리뷰해 주세요

# 3. 개선 제안
이 리뷰를 기반으로 어떤 개선이 필요한가요?

# 4. 개선 사항 구현
UserList 컴포넌트의 성능을 최적화해 주세요

# 5. 최종 리뷰
/diff
현재 변경 사항을 리뷰하고 잠재적 위험과 개선 사항을 지적해 주세요
```

**시나리오 3: 새 기능 워크플로우**

```bash
# 1. 먼저 계획
/plan
장바구니 기능을 추가하고 싶습니다

# 2. 브랜치 생성
!git checkout -b feature/shopping-cart

# 3. 기능 구현
계획에 따라 단계별로 구현해 주세요

# 4. 테스트 추가
장바구니 모듈에 대한 테스트를 생성해 주세요

# 5. 테스트 실행
!npm test

# 6. 코드 리뷰
/diff
현재 diff에 대해 코드 리뷰를 진행해 주세요

# 7. 커밋
이 기능 개발에 대한 커밋 메시지를 생성해 주세요
!git add -A
!git commit -m "feat: ..."
!git push
```

---

## 자주 묻는 질문

Claude Code를 사용하면서 다양한 문제를 겪을 수 있습니다. 이 섹션에서는 일반적인 문제와 해결책을 요약합니다.

### 토큰 사용량이 너무 빠른가요?

빠른 토큰 소비는 가장 일반적인 문제 중 하나입니다. 다음은 완전한 최적화 전략입니다.

**진단:**

먼저 `/context`를 실행하여 현재 토큰 사용량을 확인합니다:

```text
/context
```

다음 사항에 집중하세요:
- **토큰 사용률**: 70%를 초과하면 컨텍스트 압축을 고려하세요
- **참조된 파일 수**: 파일이 많을수록 토큰 소비가 높습니다
- **큰 파일**: 어떤 파일이 가장 많은 토큰을 소비하는지 확인

**최적화 전략:**

**1. .claudeignore 개선**

`.claudeignore`에 불필요한 파일이 포함되어 있는지 확인:

```text
# 반드시 무시
node_modules/
dist/
build/
*.log
.env

# 프로젝트별
# React
.next/
out/

# Vue
.nuxt/
.output/

# 일반
.vscode/
.idea/
coverage/
*.min.js
*.bundle.js
```

**2. 정기적으로 컨텍스트 압축**

긴 대화는 많은 토큰을 누적합니다. 5-6라운드마다 `/compact`를 실행하는 것이 좋습니다:

```text
# 긴 대화 후
/compact

# 계속
이제 주문 모듈을 구현해 봅시다...
```

**3. 파일을 정확하게 참조**

필요하지 않은 경우 전체 디렉토리를 참조하지 마세요:

```bash
# 권장하지 않음
@src/ 이 코드를 설명해 주세요

# 권장
@src/utils/auth.ts @src/components/Login.tsx 로그인 흐름을 설명해 주세요
```

**4. 대용량 파일 읽기 피하기**

`/context`에서 한 파일이 많은 토큰을 소비한다면 다음을 고려하세요:
- 정말 필요한가요?
- 일부분만 참조할 수 있나요?
- 이 파일을 더 작은 모듈로 분할할 수 있나요?

### Claude가 프로젝트를 이해하지 못하나요?

Claude의 답변이 부정확하거나 기본적인 프로젝트 정보를 반복해서 묻는다면, 프로젝트 맥락이 부족한 것입니다.

**해결책:**

**1. CLAUDE.md 생성**

`/init`을 실행하여 프로젝트 설정을 생성합니다:

```bash
/init
```

생성 후 다음을 검증하세요:
- 프로젝트 요약이 정확한가요?
- 기술 스택이 완전한가요?
- 자주 사용하는 명령어가 올바른가요?
- 코딩 규칙이 명확한가요?

**2. CLAUDE.md 수동 편집**

자동 생성된 설정이 충분히 상세하지 않다면 추가하세요:

```markdown
## 프로젝트별 정보

### 아키텍처 결정
- 왜 Y가 아닌 X를 선택했는가?
- 핵심 디자인 패턴은 무엇인가?

### 일반적인 함정
- useEffect를 사용할 때 주의할 점...
- DB 쿼리는 반드시...

### 서드파티 통합
- Stripe를 통한 결제
- SendGrid를 통한 이메일
- AWS S3를 통한 파일 저장
```

**3. 규칙 디렉토리 사용**

대규모 프로젝트의 경우 규칙 디렉토리에 규칙을 정리하세요:

```text
.claude/rules/
├── 00-architecture.md    # 아키텍처 개요
├── 01-coding-style.md    # 코딩 스타일
├── 10-frontend.md        # 프론트엔드 규칙
├── 11-backend.md         # 백엔드 규칙
└── 20-testing.md         # 테스트 규칙
```

**4. 필요시 프롬프트에 맥락 추가**

특정 작업의 경우 관련 배경 정보를 추가하세요:

```text
인증을 위해 커스텀 useAuth Hook을 사용합니다.
이 Hook은 { user, login, logout, isLoading }을 반환합니다.
이 Hook을 기반으로 사용자 메뉴 컴포넌트를 만들어 주세요.
```

### 작업을 롤백하는 방법은?

Claude Code는 다양한 시나리오에 대한 여러 롤백 메커니즘을 제공합니다.

**시나리오 1: 대화 상태 롤백**

오타를 치거나 응답이 마음에 들지 않는 경우:

```text
Esc 두 번  -> 이전 턴 롤백
Esc 세 번  -> 모든 대화 기록 지우기
```

**참고**: 이것은 대화 상태만 롤백하며, 파일 편집은 되돌리지 않습니다.

**시나리오 2: 파일 편집 취소**

Claude가 이미 파일을 수정한 경우, 수동으로 되돌려야 합니다:

```bash
# 변경 사항 확인
!git status
!git diff

# 단일 파일 되돌리기
git checkout -- src/utils/helpers.ts

# 모든 작업 트리 변경 사항 되돌리기
git checkout -- .

# 이미 커밋한 경우
# 소프트 롤백 (변경 사항 유지)
git reset --soft HEAD~1

# 하드 롤백 (변경 사항 폐기)
git reset --hard HEAD~1
```

**시나리오 3: 예방적 Git 워크플로우 사용**

모범 사례: Claude 세션 전에 현재 작업을 저장하세요:

```bash
# 시작 전 현재 상태 저장
git add .
git commit -m "WIP: Claude Code 세션 전"
# 또는 stash 사용
git stash push -m "before claude"

# Claude Code로 개발...

# 결과가 만족스럽지 않으면 전체 롤백
git reset --hard HEAD~1
# 또는
git stash pop
```

### 권한 프롬프트가 너무 많은가요?

빈번한 권한 확인은 효율성을 떨어뜨립니다. 적절한 권한 설정으로 워크플로우를 더 원활하게 만들 수 있습니다.

**권한 모델:**

Claude Code의 권한은 세 가지 수준입니다:
- **allow**: 자동 허용
- **ask**: 실행 전 질문
- **deny**: 완전 거부

**최적화 설정:**

`.claude/settings.json` 편집:

```json
{
  "permissions": {
    "allow": [
      // Git 읽기 작업
      "Bash(git status)",
      "Bash(git log:*)",
      "Bash(git diff:*)",
      "Bash(git branch)",

      // 테스트 및 검사
      "Bash(npm test:*)",
      "Bash(npm run lint:*)",
      "Bash(npm run typecheck)",

      // 개발 서버
      "Bash(npm run dev:*)",

      // 소스 코드 편집
      "Edit(src/**/*.{ts,tsx})",
      "Edit(tests/**/*.test.ts)",
      "Write(src/**/*.ts)"
    ],
    "ask": [
      // Git 쓰기 작업
      "Bash(git commit:*)",
      "Bash(git push:*)",
      "Bash(git pull:*)",

      // 패키지 관리
      "Bash(npm install:*)",
      "Bash(npm uninstall:*)",

      // 빌드 및 배포
      "Bash(npm run build)",
      "Bash(npm run deploy:*)",

      // 설정 파일 편집
      "Edit(package.json)",
      "Edit(tsconfig.json)",

      // 민감한 파일 읽기
      "Read(.env)",
      "Read(config/secrets.*)"
    ],
    "deny": [
      // 위험한 명령어
      "Bash(rm -rf:*)",
      "Bash(sudo:*)",
      "Bash(curl * | sh)",
      "Bash(wget * | sh)",

      // 시스템 파일
      "Edit(/etc/*)",
      "Write(/usr/*)",

      // Git 내부
      "Edit(.git/*)"
    ]
  }
}
```

**점진적 권한 전략:**

- **학습 단계**: 기본 설정을 유지하고 Claude가 무엇을 실행하려고 하는지 이해
- **숙련 단계**: 일반적인 안전한 작업(예: git status, npm test)을 allow에 추가
- **고효율 단계**: 프로젝트 특성에 따라 세분화된 규칙 생성

### 중국 본토에서 사용하는 방법은?

네트워크 제한으로 인해 중국 본토 사용자는 Anthropic 공식 서비스에 직접 접속하지 못할 수 있습니다. 다음은 몇 가지 옵션입니다.

**옵션 1: API 프록시 서비스 사용**

많은 클라우드 제공업체가 Anthropic 호환 API 프록시 서비스를 제공합니다:

```bash
# 환경 변수 설정
export ANTHROPIC_BASE_URL="https://your-api-proxy.com/v1"
export ANTHROPIC_API_KEY="your-api-key"

# Claude Code 시작
claude
```

**옵션 2: 서드파티 Claude Code 호환 도구 사용**

일부 국내 제공업체가 호환 도구를 제공합니다:

```bash
# 호환 버전 설치
npm install -g @some-provider/claude-code

# API 키 구성
claude config set api.key your-api-key
claude config set api.baseUrl https://api.some-provider.com
```

**옵션 3: 다른 AI 코딩 도구 사용**

Claude Code를 사용할 수 없는 경우 대안을 고려하세요:

| 도구 | 특징 | 사용 시나리오 |
|------|------|---------------|
| Cursor | VS Code 기반, 완전한 기능 | 완전한 IDE 경험 |
| GitHub Copilot | 강력한 자동완성 | 주로 코드 자동완성 |
| 통의령마(通义灵码) | 국내 제품, 국내 안정적 | 국내 개발 환경 |
| Codeium | 관대한 무료 할당량 | 예산 제한 |

**옵션 4: AI Agent에게 구성 도움 요청**

구성 방법을 모르겠다면 AI Agent에게 물어보세요:

```text
Claude Code를 사용하고 싶지만, 중국 본토에서 직접 접속할 수 없습니다.
제공업체 XXX에서 API를 구매했습니다.
API 엔드포인트는 https://api.xxx.com이고,
키는 sk-xxx입니다.

Claude Code가 올바르게 작동하도록 환경 변수를 구성해 주세요.
```

**자주 묻는 질문:**

- **Q: 구성 후에도 여전히 연결되지 않나요?**
  - A: API 엔드포인트가 올바른지 확인하세요. `/v1` 경로 포함 여부 확인
  - A: API 키의 유효성과 잔액을 확인하세요
  - A: 로컬 네트워크에 프록시가 필요한지 확인하세요

- **Q: 응답이 느린가요?**
  - A: 지리적으로 더 가까운 제공업체를 선택하세요
  - A: 범용 API 플랜 대신 코딩에 최적화된 플랜을 사용하세요
  - A: `/compact`를 사용하여 토큰 사용량을 줄이세요

- **Q: 일부 기능을 사용할 수 없나요?**
  - A: 일부 서드파티 제공업체는 Claude Code의 모든 기능을 완전히 지원하지 않을 수 있습니다
  - A: 제공업체 문서에서 지원하는 기능 범위를 확인하세요

---

## 참고 자료

- [Claude Code 공식 문서](https://code.claude.com/docs)
- [Claude Code GitHub](https://github.com/anthropics/claude-code)
- [Everything Claude Code](https://github.com/affaan-m/everything-claude-code)
