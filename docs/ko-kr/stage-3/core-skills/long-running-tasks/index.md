# Claude Code를 오랫동안 작업하게 만드는 방법

## 소개

전통적인 AI 코딩 어시스턴트는 "대화형"입니다: 한마디 하면 한 번 대답하고 멈춥니다. 하지만 실제 개발 작업에서는 이 방식이 턱없이 부족합니다.

다음 상황을 상상해 보세요: Claude에게 전체 프로젝트를 리팩토링하라고 했는데 몇 개 파일만 수정하고 "완료"라고 합니다; Claude가 모든 테스트를 통과할 때까지 버그를 계속 고치길 원하지만 한 번만 실행하고 멈춥니다; Claude가 "밤새 작업하기"를 원하지만 다음 날 아침 오래전에 멈췄다는 것을 발견합니다.

2025년 여름, 호주의 한 개발자 Geoffrey Huntley(양치기이기도 한 사람)가 5줄짜리 bash 스크립트를 작성했습니다. 스크립트는 간단했습니다: Claude Code를 지속적으로 재시작하고 같은 작업을 전달합니다. 그는 이것을 심슨 가족 캐릭터 이름을 따서 "Ralph Wiggum"이라고 명명했습니다 - 계속 시도하고 절대 포기하지 않는 캐릭터입니다.

이 간단한 스크립트는 실리콘 밸리를 놀라게 했습니다. 단 2주 만에 관련 프로젝트가 7,000개 이상의 GitHub 스타를 받았습니다. 사람들은 이것으로 하룻밤 만에 6개의 완전한 프로젝트를 생성하고, API 비용 단 $297로 $50,000 계약 작업을 인도하고, 심지어 3개월 만에 완전한 프로그래밍 언어를 구축하는 데 사용했습니다.

이 장이 해결하는 핵심 질문은: Claude Code가 실제 개발자처럼 작업이 진정으로 완료될 때까지 지속적으로 작업하게 만드는 방법입니다.

---

## 핵심 원리: 왜 AI가 "너무 일찍 멈추는가"?

구체적인 방법을 논의하기 전에 먼저 근본 원인을 이해해야 합니다.

### AI의 완료 판단은 신뢰할 수 없습니다

LLM에는 근본적인 약점이 있습니다: 작업이 진정으로 완료되었는지 신뢰할 수 있게 판단할 수 없습니다.

인간의 완료 기준은 객관적입니다: 모든 테스트가 통과하고, 기능이 완전하며, 코드 품질이 기준을 충족합니다. 하지만 AI는 "느낌"으로만 판단할 수 있습니다. "이 정도면 됐다"거나 "출력이 충분해 보인다"거나 다음에 무엇을 해야 할지 모르기 때문에 멈출 수 있습니다.

그렇기 때문에 AI의 내부 감각에 의존하지 않고 외부 시스템이 실제 완료를 결정해야 합니다.

### 해결책의 핵심 아이디어

핵심 해결책은 AI가 "루프" 안에서 작업하게 유지하는 것입니다.

AI가 나가려고 할 때마다 외부 시스템이 세 가지 질문을 확인합니다: 정말 완료되었나? 객관적 기준을 충족하나? 빠진 것이 없나? 그렇지 않다면 작업을 다시 주입하고 다른 라운드를 계속합니다.

이 아이디어는 단순한 bash 스크립트에서 복잡한 오케스트레이션 시스템까지 많은 형태로 구현될 수 있지만 본질은 같습니다.

---

## 방법 1: While True Bash 루프 (가장 원시적인 방법)

이것은 가장 간단하고 직접적인 구현입니다. 본질적으로, 무한 루프를 작성하여 매 라운드마다 Claude Code를 재시작하고 같은 작업 설명을 전달합니다.

가장 간단한 구현은 단 5줄입니다:

```bash
#!/bin/bash
while true; do
    cat PROMPT.md | claude
done
```

### 작동 방식

스크립트 흐름은 간단합니다. 1단계에서 `PROMPT.md`에서 작업 설명을 읽습니다. 2단계에서 Claude Code를 시작하고 작업 설명을 전달합니다. 3단계에서 Claude가 작업하고 결과를 출력합니다. 4단계에서 Claude가 완료 후 종료합니다. 5단계에서 루프가 자동으로 재시작되고 1단계로 돌아가, 수동으로 `Ctrl+C`로 중단하지 않는 한 무한 순환을 만듭니다.

### 장단점

장점은 극도의 단순함입니다: 누구나 이해할 수 있고, 구성이 필요 없으며, 즉시 사용 가능하고 빠른 실험에 좋습니다.

하지만 단점도 명확합니다: 실제 완료를 판단할 수 없고, 영원히 회전할 수 있으며, 안전 가드레일이 없고 API 호출을 낭비할 수 있습니다.

### 실제 사용 예시

먼저, 작업을 설명하는 `PROMPT.md` 파일을 만듭니다. 예를 들어, 사용자 인증 모듈 리팩토링:

```markdown
# 작업: 사용자 인증 모듈 리팩토링

요구사항:
1. 모든 인증 로직을 독립적인 AuthService 클래스로 추출
2. 단위 테스트 추가, 커버리지 > 80%
3. 관련 문서 업데이트

모든 테스트가 통과하고 문서가 업데이트되면 출력: task complete
```

그런 다음 루프 스크립트를 생성하고 실행합니다:

```bash
chmod +x loop.sh
./loop.sh
```

### 더 안전한 개선 버전

무한 루프를 피하기 위해 반복 한계를 추가합니다:

```bash
#!/bin/bash
MAX_ITERATIONS=50
iteration=0

while true; do
    iteration=$((iteration + 1))
    echo "=== 반복 $iteration/$MAX_ITERATIONS ==="

    cat PROMPT.md | claude

    if [ $iteration -ge $MAX_ITERATIONS ]; then
        echo "최대 반복 횟수에 도달하여 중지합니다"
        break
    fi

    sleep 5  # API 속도 제한을 피하기 위한 짧은 지연
done
```

이 개선 버전은 최대 반복 한계를 추가하고, 라운드별 진행 상황을 표시하며, 한계에서 자동으로 중지합니다. 또한 속도 제한을 피하기 위해 각 루프에 5초 지연을 추가합니다.

---

## 방법 2: Ralph Wiggum 플러그인 (공식 권장)

Ralph Wiggum은 장시간 실행 작업을 위해 특별히 구축된 Anthropic의 공식 플러그인입니다. 심슨 가족 캐릭터 이름을 따서 명명되었으며 "실패에도 불구하고 계속 시도하는" 정신을 나타냅니다.

### 핵심 메커니즘: Stop Hook

Ralph의 핵심은 Stop Hook입니다. Claude가 나가려고 할 때 Stop Hook이 종료 신호를 가로챕니다. 그런 다음 시스템이 확인합니다: 출력에 특정 완료 마커가 포함되어 있나? 마커가 발견되지 않으면 원래 프롬프트를 재주입하고 다른 반복을 시작합니다. 완료 마커가 감지될 때만 Claude가 종료되도록 허용됩니다.

이것은 Claude가 "충분히 가까워 보인다"는 이유로 멈추지 않도록 보장합니다. 명확하게 표시된 요구사항을 완료해야 합니다.

### 설치

Ralph Wiggum은 공식 Claude Code 플러그인이며 두 가지 방법으로 설치할 수 있습니다.

**옵션 1: 공식 플러그인 마켓플레이스에서 설치 (권장)**

```bash
# Claude Code에서 실행
claude

# 공식 플러그인 마켓플레이스 추가
/plugin marketplace add anthropics/claude-code

# Ralph Wiggum 설치
/plugin install ralph-wiggum@claude-code-plugins

# 설치 확인
/plugin
```

**옵션 2: GitHub에서 직접 설치**

```bash
# 플러그인 디렉토리로 이동
cd ~/.claude/plugins/

# 플러그인 저장소 클론
git clone https://github.com/anthropics/ralph-wiggum-plugin.git
```

설치 후 사용 가능:

- `/ralph-wiggum:ralph-loop` - 루프 시작
- `/ralph-wiggum:cancel-ralph` - 루프 취소
- `/ralph-wiggum:help` - 도움말 표시

### 기본 사용법

`/ralph-wiggum:ralph-loop` 사용:

```bash
/ralph-wiggum:ralph-loop "CRUD 작업, 입력 검증 및 테스트가 포함된 todo API를 구축하세요.
             모든 것이 완료되면 <promise>COMPLETE</promise>를 출력하세요." \
  --max-iterations 50 \
  --completion-promise "COMPLETE"
```

### 매개변수 설명

두 가지 가장 중요한 매개변수는 `--max-iterations`와 `--completion-promise`입니다.

`--max-iterations`는 하드 안전 한계를 설정합니다. 권장 값은 일반적으로 20-100입니다. 미완료 상태라도 Ralph는 이 한계에서 중지하여 무한 API 지출을 방지합니다.

`--completion-promise`는 완료 마커 텍스트를 지정하며, 명시적이고 고유해야 합니다. Ralph는 Claude 출력에 해당 마커가 포함될 때만 작업을 완료로 간주합니다. `COMPLETE` 또는 `TASK_DONE`과 같은 명확한 마커를 사용하고 모호한 단어는 피하세요.

### 프롬프트 모범 사례

좋은 프롬프트를 작성하는 것이 Ralph 성공의 핵심입니다.

나쁜 프롬프트는 보통 완료 기준을 정의하지 않습니다. 예를 들어, "todo API 작성"은 AI가 대략적인 뼈대를 출력하고 멈추게 할 수 있으며, 테스트도, 검증도, 문서도 없습니다.

좋은 프롬프트는 단계적 요구사항과 명확한 수락 기준을 포함해야 합니다. 예를 들어:

먼저 단계적 작업을 설명합니다. 1단계는 모든 CRUD 엔드포인트가 있는 핵심 기능입니다: POST `/todos` 생성, GET `/todos` 목록, GET `/todos/:id` 단일 조회, PUT `/todos/:id` 업데이트, DELETE `/todos/:id` 삭제. 2단계는 입력 검증입니다: 제목은 비워둘 수 없고 완료 상태는 boolean이어야 합니다. 3단계는 테스트입니다: 각 엔드포인트에 대한 테스트 작성, 커버리지 > 80%.

그런 다음 수락 기준을 정의합니다: 모든 테스트가 통과하고, 코드가 linter를 통과하며, README에 API 문서가 포함됩니다.

마지막으로 고유한 완료 마커를 정의합니다: `<promise>TODO_API_COMPLETE</promise>`.

이렇게 하면 Claude가 정확히 무엇을 해야 하고 언제 완료가 진정으로 달성되는지 알게 됩니다.

### 더 많은 프롬프트 템플릿

다음은 직접 사용하거나 조정할 수 있는 일반적인 작업 템플릿입니다.

**템플릿 1: 테스트 마이그레이션 (Jest -> Vitest)**

```text
/ralph-wiggum:ralph-loop "
이 프로젝트의 모든 테스트를 Jest에서 Vitest로 마이그레이션하세요:
- 모든 테스트 로직을 변경하지 않고 유지
- 설정 파일 업데이트 (vite.config.js, vitest.config.js)
- Jest 전용 API 교체 (예, jest.mock -> vi.mock)
- 모든 테스트가 통과하는지 확인
- Jest 관련 종속성 제거

수락 기준:
- npm test가 완전히 통과
- package.json에 Jest 종속성 없음
- 프로젝트 빌드 성공

완료 후 출력: <promise>VITEST_MIGRATION_COMPLETE</promise>
" --max-iterations 40 --completion-promise "VITEST_MIGRATION_COMPLETE"
```

**템플릿 2: UI/UX 최적화 (모바일 퍼스트)**

```text
/ralph-wiggum:ralph-loop "
이 프로젝트의 UI/UX을 세련된 모바일 퍼스트 언어 학습 앱으로 다듬으세요:
- 간격과 여백 통일 (4px 기본 단위 사용)
- 명확한 타이포그래피 계층 설정 (제목/본문/보조 텍스트)
- 카드, 목록 및 공유 컴포넌트의 스타일 통일
- 하단 탐색 추가 (홈/학습/퀴즈/진행/설정)
- 모바일 렌더링 품질 보장

수락 기준:
- npm run build 성공
- TypeScript 오류 없음
- 주요 페이지가 모바일에서 올바르게 미리보기됨

완료 후 출력: <promise>UI_UX_COMPLETE</promise>
" --max-iterations 25 --completion-promise "UI_UX_COMPLETE"
```

**템플릿 3: 대량 TypeScript 주석 추가**

```text
/ralph-wiggum:ralph-loop "
프로젝트의 모든 함수에 TypeScript 타입 주석을 추가하세요:
- src/ 디렉토리 우선
- 함수 매개변수와 반환값에 타입 추가
- any 피하기, 구체적 타입 또는 unknown 사용
- 필요한 타입 정의 추가

수락 기준:
- npm run typecheck 통과
- @ts-ignore 또는 @ts-any 주석 없음
- 코드가 올바르게 실행됨

완료 후 출력: <promise>TYPES_ADDED</promise>
" --max-iterations 30 --completion-promise "TYPES_ADDED"
```

**템플릿 4: TDD 기반 기능 개발**

```text
/ralph-wiggum:ralph-loop "
TDD를 사용하여 체크아웃 기능을 구현하세요:
1. 먼저 테스트 작성 (checkout.test.ts)
2. 테스트 실행 (실패해야 함)
3. 테스트를 통과할 최소 코드 작성
4. 리팩토링 및 최적화
5. 모든 테스트가 통과할 때까지 반복

기능 요구사항:
- 장바구니 항목 목록
- 배송비 계산
- 쿠폰 적용
- 결제 양식 검증

수락 기준:
- 모든 테스트 통과 (npm test checkout.test.ts)
- 코드 커버리지 > 80%
- ESLint 오류 없음

완료 후 출력: <promise>CHECKOUT_COMPLETE</promise>
" --max-iterations 25 --completion-promise "CHECKOUT_COMPLETE"
```

**템플릿 5: 코드 스타일 통일**

```text
/ralph-wiggum:ralph-loop "
프로젝트 전체의 코드 스타일을 통일하세요:
- Prettier로 모든 파일 포맷팅
- 명명 규칙 통일 (변수 camelCase, 컴포넌트 PascalCase)
- 사용하지 않는 import와 변수 제거
- 문자열 따옴표 통일 (단일 따옴표)
- 세미콜론 스타일 통일 (세미콜론 없음)

수락 기준:
- npm run lint 통과
- 일관된 코드 스타일
- 빌드 성공

완료 후 출력: <promise>STYLE_UNIFIED</promise>
" --max-iterations 20 --completion-promise "STYLE_UNIFIED"
```

### 실제 사례

한 유명한 사례는 Y Combinator 해커톤에서 발생했으며, 한 팀이 Ralph Loop를 사용했습니다. 오후 11시에 작업을 설정했습니다: 6개의 제품 사양에 대해 순차적으로 MVP를 구현하고 각각에 특정 완료 마커를 내보냅니다. 최대 반복을 200으로 설정하고 잠을 잤습니다.

다음 날 아침, 6개의 데모 준비된 프로젝트가 있었고 API 비용은 단 $297이었습니다. 그것이 Ralph의 힘입니다: 잠자는 동안 AI가 계속 작업합니다.

또 다른 사례는 Boris Cherny(Claude Code 리드)로부터 왔습니다. Ralph와 Opus 4.5를 사용하여 30일 동안 259개의 PR을 인도했으며, 497개의 커밋, 40,000줄 추가 및 38,000줄 삭제가 포함되었습니다. 가장 놀라운 점은 모두 Claude Code가 수동 코드 작성 없이 생산했다는 것입니다.

더 놀라운 사례는 CURSED 프로그래밍 언어입니다. Ralph 창시자 Geoffrey Huntley가 3개월 동안 Ralph Loop를 사용하여 자율적으로 완전한 프로그래밍 언어를 구축했습니다. 키워드는 Gen Z 은어를 사용하며(예: `slay`, `sus`, `based`), 더 중요한 것은 완전한 LLVM 컴파일러 구현, 표준 라이브러리 및 부분적 편집기 지원이 포함되어 있습니다. 이것은 Ralph Loop의 진정한 잠재력을 보여줍니다: 명확한 목표를 제공하면 복잡한 프로젝트가 진정으로 완성될 때까지 몇 달 동안 계속 작업할 수 있습니다.

### 더 많은 실제 사례

**자동화된 프로젝트 리팩토링**

한 개발자가 Ralph를 사용하여 코드가 엉망이고 테스트가 없으며 문서가 누락된 레거시 프로젝트를 리팩토링했습니다. 할당된 작업은:

1. 기존 코드에 테스트 추가
2. 단계별로 리팩토링, 각 변경 후 테스트 통과 확인
3. 문서 업데이트

Ralph는 주말 내내 실행되었습니다. 월요일에는 47개의 커밋, 더 깔끔한 코드 구조, 75% 테스트 커버리지 및 완전한 API 문서가 있었습니다. 비용은 약 $12였습니다.

### Ralph 철학

Ralph는 세 가지 핵심 철학을 반영합니다.

첫째는 완벽보다 반복입니다. 한 번에 완벽을 기대하지 말고 루프를 사용하여 개선하세요. 첫 번째 패스는 뼈대만 구축할 수 있고, 두 번째는 버그를 수정하고, 세 번째는 최적화하고, 네 번째는 테스트를 추가합니다; 매 라운드마다 더 나아집니다.

둘째는 실패를 데이터로 보는 것입니다. 모든 테스트 실패는 개선의 기회입니다; 실패를 두려워하지 말고 그것으로부터 배우세요.

셋째는 끈질긴 시도입니다: 작동할 때까지 계속 시도하세요. 그것이 Ralph 정신입니다.

### Ralph가 적합하거나 부적합한 경우

Ralph가 어디에 맞는지 아는 것은 시간과 비용을 모두 절약하는 데 도움이 됩니다.

**Ralph에 적합한 시나리오**

이러한 작업은 명확한 완료 기준이 있으며 자동 반복에 적합합니다:

| 시나리오 | 이유 |
|------|------|
| 테스트 마이그레이션 | 명확한 대상 프레임워크, 테스트 통과로 검증 가능 |
| 대규모 리팩토링 | 특정 리팩토링 규칙을 정의할 수 있음 |
| 프레임워크 마이그레이션 | 성공적인 마이그레이션은 작동하는 코드로 검증 가능 |
| 대량 타입 주석 | typecheck가 통과하면 완료 |
| 테스트 커버리지 개선 | 커버리지 백분율이 객관적 |
| 문서 생성 | API 문서를 자동으로 검증할 수 있음 |
| UI/UX 통일 | 구체적인 디자인 규칙을 정의할 수 있음 |
| 재현 가능한 버그 수정 | 통과 조건이 테스트 가능 |

**Ralph에 부적합한 시나리오**

이러한 작업은 인간의 판단이나 탐색이 필요합니다:

| 시나리오 | 이유 |
|------|------|
| 아키텍처 결정 | 예: 마이크로서비스 vs 모놀리식은 트레이드오프 판단 필요 |
| 보안 민감 코드 | 취약점이 미묘하고 자동 감지가 어려울 수 있음 |
| 모호한 요구사항 | 명확한 완료 기준이 없음 |
| 탐색적 작업 | 방향이 계속 변경됨 |
| 창의적 디자인 | 인간의 미적 판단 필요 |
| 단순 일회성 작업 | Ralph 사용은 과도함 |

**의사결정 체크리스트**

세 가지 질문을 스스로에게 물어보세요:
1. **명시적인 완료 기준을 정의할 수 있나요?** 아니라면 부적합
2. **객관적인 검증 방법이 있나요?** (테스트/빌드/타입체크) 아니라면 부적합
3. **이 작업이 지속적인 인간 피드백을 필요로 하나요?** 그렇다면 부적합

세 가지 대답이 모두 "아니요"라면 Ralph를 실행하세요.

---

## 방법 3: 향상된 Ralph

이것은 공식 Ralph의 커뮤니티 향상 구현입니다. [frankbria/ralph-claude-code](https://github.com/frankbria/ralph-claude-code) 프로젝트는 더 강력한 안전 메커니즘을 추가합니다.

### 추가 기능

향상된 Ralph는 여러 추가 안전 기능을 추가합니다.

첫째는 이중 종료 조건입니다. 공식 Ralph는 완료 마커만 확인하지만 향상 버전은 완료 마커와 명시적 `EXIT_SIGNAL` 모두를 요구합니다. 이것은 Claude가 완료 마커를 출력하더라도 명시적 종료가 나타나지 않으면 루프가 추가 검증을 위해 계속될 수 있음을 의미합니다.

둘째는 속도 제한입니다. 기본값은 시간당 100회 실행이며, 버그가 무한 루프를 유발하는 경우 API 청구서 폭증을 방지합니다. 이 한계를 조정할 수 있습니다.

셋째는 스마트 서킷 브레이커입니다. 시스템이 완료 마커를 5번 연속 감지하면 강제로 중지합니다. 이것은 루프가 올바르게 종료되지 않는 드문 엣지 케이스를 방지합니다.

넷째는 실시간 대시보드입니다. 향상된 Ralph는 현재 반복, 작업 진행 상황 및 예상 비용을 보여주는 명령줄 대시보드를 제공합니다.

### 설치

GitHub에서 클론하여 향상된 Ralph를 설치합니다:

```bash
git clone https://github.com/frankbria/ralph-claude-code.git
cd ralph-claude-code
./install.sh
```

설치 스크립트가 필요한 파일과 구성을 자동으로 설정합니다.

### 사용법

향상된 Ralph 사용은 두 단계입니다. 먼저 `ralph-setup`으로 프로젝트를 초기화합니다:

```bash
ralph-setup my-project
```

이것은 프로젝트에 필요한 설정 파일을 만듭니다. 그런 다음 `ralph loop`로 루프를 시작합니다:

```bash
ralph loop
```

### 구성 파일

향상된 Ralph는 `.claude/ralph-config.json`을 사용합니다:

```json
{
  "maxIterations": 50,
  "rateLimitPerHour": 100,
  "completionPromise": "TASK_COMPLETE",
  "exitSignal": "EXIT_NOW",
  "costAlertThresholds": [10, 50, 100]
}
```

`maxIterations`는 최대 루프 횟수입니다. `rateLimitPerHour`는 시간당 속도 한계입니다. `completionPromise`는 완료 마커 텍스트입니다. `exitSignal`은 명시적 종료 신호입니다. `costAlertThresholds`는 예산 경고 수준을 정의합니다.

---

## 방법 4: Agent Teams (병렬 다중 에이전트)

작업이 충분히 크면 단일 Claude로는 부족합니다; "팀 협업"이 필요합니다.

Agent Teams는 여러 Claude 인스턴스가 병렬로 실행되고 공유 작업 목록과 종속성을 통해 조정되는 고급 기능입니다. 이것은 매우 큰 프로젝트에 적합합니다. Nicholas Carlini의 실험에서 16개의 병렬 에이전트가 2주 만에 100,000줄 이상의 코드를 생산하고 Linux 커널을 컴파일할 수 있는 C 컴파일러를 구축했습니다.

Agent Teams는 더 복잡하며 다음 섹션에서 자세히 다루겠습니다: "3.3 Agent Teams 다중 에이전트 협업."

---

## 방법 5: 백그라운드 작업 (Ctrl+B)

이것은 간단하고 실용적인 비차단 실행 방법입니다.

### 기본 조작

사용법은 간단합니다. Claude가 작업을 시작할 때 `Ctrl+B`를 눌러 백그라운드로 푸시합니다.

예를 들어, "전체 테스트 스위트를 실행하세요"라고 말합니다. Claude가 실행을 시작합니다. `Ctrl+B`를 누르면 Claude가 응답합니다: "작업이 백그라운드로 푸시되었습니다 (ID: task_abc123)." 그런 다음 계속해서: "그동안 이 로그 파일을 분석해 주세요." Claude는 테스트가 백그라운드에서 계속되는 동안 로그를 분석할 수 있습니다.

### 백그라운드 작업 보기

백그라운드 작업을 확인하는 몇 가지 방법이 있습니다. `/tasks`를 사용하여 작업 ID, 상태 및 시작 시간이 포함된 모든 작업을 나열합니다. `Ctrl+T`를 눌러 빠른 상태 요약을 확인합니다. 작업을 전경으로 가져와 실시간 출력을 검사할 수도 있습니다.

### 적합한 시나리오

백그라운드 작업은 전형적인 상황에 적합합니다:

첫째, 오래 실행되는 테스트. 전체 스위트는 수십 분이 걸릴 수 있으며 백그라운드 모드는 차단을 방지합니다.

둘째, 대형 프로젝트 빌드. 빌드 파이프라인은 다른 작업을 계속하는 동안 실행될 수 있습니다.

셋째, 대량 파일 작업예: 일괄 이름 변경 및 포맷팅.

넷째, 동기적으로 기다리고 싶지 않은 모든 것.

---

## 안전 메커니즘: 무한 루프 방지

모든 자동화된 루프 시스템은 보호를 포함해야 하며, 그렇지 않으면 제어를 잃을 수 있습니다.

### 하드 한계

가장 기본적인 보호는 `--max-iterations`(최대 루프 횟수) 설정입니다. 이것은 필수입니다. 완료 상태에 관계없이 작업은 이 한계에서 중지되며 무한 API 지출을 방지합니다.

시간 제한을 적용할 수도 있습니다, 예: 4시간 후 자동 중지. 지출 임계값(예: 10 USD, 50 USD, 100 USD)에서 일시 중지하고 알림을 받도록 예산 경고를 설정할 수도 있습니다.

### 지능형 감지

스마트 데드 루프 감지를 추가할 수 있습니다. 예를 들어, 최근 커밋에 의미 있는 변경이 포함되어 있는지 확인:

```bash
if [ $(git diff HEAD~5 | wc -l) -eq 0 ]; then
    echo "최근 5개 커밋에 실질적인 변경이 없습니다. 루프 가능성"
    exit 1
fi
```

최근 diff가 최소한인 경우 시스템이 멈추었을 수 있으며 경고와 함께 중지해야 합니다.

### 비용 경고

구성에 비용 경고 임계값을 설정합니다:

```json
{
  "costAlertThresholds": [10, 50, 100],
  "alertAction": "pause_and_notify"
}
```

지출이 10, 50 또는 100 USD에 도달하면 시스템이 일시 중지하고 알림을 보내 계속할지 결정할 수 있게 합니다.

### 수동 체크포인트

중요한 작업의 경우 수동 체크포인트를 추가합니다:

```bash
if [ $((iteration % 10)) -eq 0 ]; then
    read -p "$iteration 반복을 완료했습니다. 계속하시겠습니까? (y/n)" answer
    if [ "$answer" != "y" ]; then
        break
    fi
fi
```

이것은 10회 반복마다 확인을 위해 일시 중지하여 적시에 인간 개입을 허용합니다.

---

## 실전 빌드: Ralph Loop로 완전한 BBS 포럼 구축

완전한 예제를 사용하여 Ralph Loop의 힘을 보여드리겠습니다. 사용자 인증, 게시물, 프로필 센터 및 관리자 백엔드를 포함하여 BBS 스타일 포럼 시스템을 처음부터 구축하겠습니다.

### 프로젝트 목표

완전한 기능을 갖춘 BBS 포럼 시스템을 구축합니다:

**사용자 측 기능:**
- 사용자 등록, 로그인, 로그아웃
- 게시물 목록 탐색 (페이지네이션)
- 게시물 상세 보기
- 새 게시물 발행
- 댓글 기능
- 프로필 센터 (자신의 게시물 보기, 프로필 업데이트)

**관리자 백엔드 기능:**
- 관리자 로그인
- 사용자 관리 (차단/차단 해제)
- 게시물 관리 (삭제/고정)
- 댓글 관리
- 시스템 통계

**기술 스택:**
- 백엔드: Node.js + Express + SQLite
- 프론트엔드: React + React Router + Axios
- 인증: JWT 토큰
- 스타일링: Tailwind CSS

### 준비

먼저 Ralph Wiggum 플러그인을 설치합니다:

```bash
claude /plugins:add ralph-wiggum
```

### Ralph Loop 시작

이제 Ralph Loop를 시작하여 전체 프로젝트를 구축합니다:

```bash
/ralph-wiggum:ralph-loop "
TDD를 사용하여 처음부터 완전한 BBS 포럼 시스템을 구축해 주세요.

프로젝트 구조 요구사항:
- backend/ 디렉토리: Express API 서버
- frontend/ 디렉토리: React 프론트엔드 앱
- 두 디렉토리 모두 자체 테스트 포함

백엔드 요구사항:
- Express 프레임워크 사용
- SQLite 저장소 (better-sqlite3)
- JWT 인증 (jsonwebtoken + bcrypt)
- user 테이블: id, username, password, email, role, createdAt
- post 테이블: id, title, content, authorId, category, pinned, createdAt
- comment 테이블: id, content, postId, authorId, createdAt

백엔드 API 엔드포인트:
- POST /api/auth/register - 사용자 등록
- POST /api/auth/login - 사용자 로그인
- GET /api/posts - 게시물 목록 (페이지네이션 + 카테고리 필터)
- GET /api/posts/:id - 게시물 상세
- POST /api/posts - 게시물 생성 (인증 필요)
- PUT /api/posts/:id - 게시물 편집 (작성자 또는 관리자)
- DELETE /api/posts/:id - 게시물 삭제 (작성자 또는 관리자)
- POST /api/posts/:id/comments - 댓글 추가 (인증 필요)
- GET /api/user/profile - 프로필 조회 (인증 필요)
- PUT /api/user/profile - 프로필 업데이트 (인증 필요)
- GET /api/admin/stats - 관리자 통계 (관리자 전용)
- GET /api/admin/users - 사용자 목록 (관리자 전용)
- PUT /api/admin/users/:id/ban - 사용자 차단 (관리자 전용)

프론트엔드 페이지 요구사항:
- /login - 로그인 페이지
- /register - 등록 페이지
- / - 홈페이지 (게시물 목록)
- /post/:id - 게시물 상세
- /new - 게시물 발행
- /profile - 프로필 센터
- /admin - 관리자 패널 (관리자 권한 필요)

관리자 패널 기능:
- 사용자 관리 (보기, 차단, 차단 해제)
- 게시물 관리 (보기, 삭제, 고정)
- 댓글 관리 (보기, 삭제)
- 시스템 통계 (사용자 수, 게시물 수, 댓글 수)

TDD 요구사항:
- 먼저 테스트를 작성한 후 구현
- 각 기능에 해당하는 테스트가 있어야 함
- 백엔드는 Jest 사용, API 테스트는 모든 엔드포인트 커버
- 프론트엔드는 Vitest 사용, 컴포넌트 테스트는 주요 기능 커버
- 인증 미들웨어에 테스트가 있어야 함

수락 기준:
- npm test (백엔드) 통과
- npm test (프론트엔드) 통과
- 프론트엔드가 올바르게 시작 및 작동
- 백엔드 API가 올바르게 응답
- 일반 사용자와 관리자 간의 적절한 권한 격리
- 코드가 ESLint 검사를 통과

완료 후 출력: <promise>BBS_SYSTEM_COMPLETE</promise>
" --max-iterations 150 --completion-promise "BBS_SYSTEM_COMPLETE"
```

### 예상 시간

복잡도 기준:

**수동 코딩 시**: 약 40-60시간 (스키마 설계, 인증 시스템, 프론트엔드/백엔드 통합 및 테스트 포함)

**Ralph Loop 사용 시**:
- 기본 버전 (핵심 기능): 약 3-5시간
- 완전 버전 (관리자 백엔드 + 테스트): 약 6-10시간

### 진행 상황 모니터링

Ralph Loop가 실행되는 동안 여러 가지 방법으로 진행 상황을 모니터링할 수 있습니다:

**반복 횟수**: Ralph는 현재 및 최대 반복 횟수를 표시하여 남은 시간을 추정하는 데 도움이 됩니다.

**로그**: Claude가 현재 무엇을 하고 있는지 볼 수 있습니다, 예: 스키마 설계, API 작성, 컴포넌트 구축 및 버그 수정.

**테스트 상태**: 모든 테스트 실행 결과가 표시됩니다. 통과하는 테스트는 증가하고 실패하는 테스트는 감소합니다. 실패가 줄어들기 시작하면 프로젝트가 완성에 가까워지고 있습니다.

### 완료 후 검증

Ralph가 완료 마커를 출력한 후 수동 검증을 수행합니다:

```bash
# 백엔드 테스트
cd backend
npm test

# 프론트엔드 테스트
cd frontend
npm test

# 백엔드 시작
cd backend
npm start

# 프론트엔드 시작 (다른 터미널에서)
cd frontend
npm run dev
```

브라우저를 열고 테스트합니다:

1. 새 사용자 등록
2. 로그인
3. 게시물 탐색
4. 새 게시물 발행
5. 댓글 추가
6. 프로필 센터 열기
7. 로그아웃 및 관리자로 로그인 (기본 계정: admin/admin123)
8. 관리자 백엔드 기능 테스트

### 참고 사항

Ralph Loop는 강력하지만 다음 사항을 명심하세요:

**첫째, 더 자세한 프롬프트가 더 나은 결과를 냅니다.** 모호한 프롬프트는 수정에 더 많은 반복이 필요합니다.

**둘째, 합리적인 반복 한계를 설정하세요.** BBS 시스템은 복잡합니다; 최소 100회 반복을 권장합니다.

**셋째, TDD가 권장됩니다.** 먼저 테스트를 작성하면 디버깅 시간을 크게 줄일 수 있습니다.

**넷째, 최종 수동 검증이 필요합니다.** AI는 엣지 케이스나 특별한 시나리오를 놓칠 수 있습니다, 특히 보안에 민감한 경로에서.

**다섯째, 스키마 설계에 주의를 기울이세요.** Ralph는 견고한 스키마에 도달하기 전에 여러 번의 반복이 필요할 수 있습니다.

---

## 방법 비교 및 선택

각 방법은 고유한 특징이 있으며 다른 시나리오에 적합합니다.

While True 루프가 가장 간단합니다: 단 5줄로 실행 가능, 빠른 실험과 프로토타입에 좋습니다. 하지만 제한되어 있으며 실제 완료를 감지하지 못하고 반복 한계에만 의존합니다.

Ralph Wiggum은 대부분의 시나리오에 대한 일반적인 권장 사항입니다. 완전한 Stop Hook 메커니즘, 완료 마커 검증 지원, 공식 지원 및 탄탄한 문서가 있습니다.

향상된 Ralph는 프로덕션 환경에 더 적합하며, 이중 종료 조건, 속도 제한 및 스마트 서킷 브레이커가 있습니다.

백그라운드 작업은 간단한 비차단 실행에 유용합니다: `Ctrl+B`만 누르면 됩니다. 하지만 단순한 백그라운드 실행일 뿐 반복 루프 오케스트레이션이 아닙니다.

---

## 요약

Claude Code를 장기간 작업하게 만드는 핵심 아이디어는 간단합니다: "한 번에 완료"하라고 요청하지 말고 "진정한 완료까지 계속 시도"하라고 요청하세요.

모든 방법은 근본적으로 같은 일을 하고 있습니다: Claude에게 작업을 주고, 실행하게 하고, 완료가 진짜인지 확인하고, 그렇지 않으면 다음 라운드를 계속합니다.

어떤 방법을 선택할지는 요구사항에 따라 다릅니다.

간단하고 빠르길 원하면 While True 루프를 사용하세요. 5줄로 실행 가능하지만 기능이 제한적입니다.

일반적인 권장 사항을 원하면 Ralph Wiggum을 사용하세요. 공식 지원, 완전한 기능, 대부분의 경우에 적합합니다.

프로덕션 사용이라면 향상된 Ralph를 사용하세요. 추가 안전 메커니즘이 있으며 더 신뢰할 수 있습니다.

(Agent Teams 다중 에이전트 협업에 대해서는 다음 섹션을 참조하세요: "3.3 Agent Teams 다중 에이전트 협업.")

이 장이 Claude Code를 더 효과적으로 사용하는 데 도움이 되어 AI가 단순한 챗봇이 아닌 진정한 생산성 도구가 되기를 바랍니다.

---

## 참고 문헌

### 공식 자료

- [Claude Code 공식 문서](https://docs.anthropic.com/en/docs/claude-code) - 완전한 공식 Claude Code 문서
- [Ralph Wiggum 플러그인 README](https://github.com/anthropics/claude-plugins-official/tree/main/plugins/ralph-wiggum) - 공식 플러그인 문서
- [Claude Code Hooks](https://docs.anthropic.com/en/docs/claude-code/configuration/hooks) - 공식 Hooks 시스템 문서

### 커뮤니티 프로젝트

- [frankbria/ralph-claude-code](https://github.com/frankbria/ralph-claude-code) (2.1k 스타) - 추가 보호 장치가 있는 향상된 Ralph 구현
- [Awesome Ralph](https://github.com/snwfdhmp/awesome-ralph) - 선별된 Ralph 자료 및 예제
- [Ralph Ryan](https://github.com/wquguru/ralph-ryan) - PRD 생성 + Ralph 루프 통합
- [snarktank/ralph](https://github.com/snarktank/ralph) - 원본 Ralph 구현

### 기사 및 튜토리얼

**영어 자료**

- [Geoffrey Huntley - Ralph Technique](https://ghuntley.com/ralph/) - 창시자의 원본 Ralph 개념
- [Effective Framework Practices for Reliable Long-Running AI Agents](https://m.blog.csdn.net/weixin_48708052/article/details/158044721) - Anthropic 엔지니어링 블로그 심층 읽기
- [Complete Claude Code Guide](https://developer.aliyun.com/article/1705912) - 완전한 사용 가이드

**중국어 튜토리얼**

- [Beginner-Friendly Tutorial - CSDN](https://m.blog.csdn.net/zsr154278963/article/details/156637281) - 상세한 설치 및 사용 가이드
- [Deep Analysis - Toutiao](https://m.toutiao.com/a7585579989207188006/) - 메커니즘 및 핵심 원리
- [Full-Stack Plain-Language Guide](https://www.jdon.com/90167-ralph-wigum-loop-explained-for-teens.html) - 원리에서 실습까지 완전한 안내
- [Beginner and Practical Guide - CNBlogs](https://www.cnblogs.com/buwai/p/19625356) - 기본 및 실용 예제
- [Ralph Loop Deep Dive - CSDN](https://m.blog.csdn.net/roamingcode/article/details/156732443) - Stop Hook 메커니즘 세부 사항
- [Claude Code Perpetual Engine - CSDN](https://m.blog.csdn.net/qq_44866828/article/details/156736656) - 무한 루프 반복 플러그인 심층 분석
- [Ralph Loop New User Starter - CNBlogs](https://www.cnblogs.com/gyc567/p/19495639) - 모범 사례 및 프롬프트 요약

### 실제 사례 연구

- [CURSED Programming Language](https://github.com/geoffreyhuntley/cursed) - Ralph로 3개월 만에 구축한 완전한 프로그래밍 언어
- [Boris Cherny's 30 Days](https://twitter.com/boriskirov/status/1756002385683786616) - 259 PR 사례 공유
- [Y Combinator Hackathon](https://github.com/geoffreyhuntley/ralph) - 하룻밤 6개 프로젝트 생성 사례
- [Geoffrey Huntley's Blog](https://ghuntley.com/) - 창시자의 기술 블로그
