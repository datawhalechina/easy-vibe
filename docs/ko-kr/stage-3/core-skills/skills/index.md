# Claude Code Skills 완전 가이드

## Skills 소개

**Claude Code Skills**는 전문 지식, 워크플로우, 그리고 모범 사례를 재사용 가능한 "스킬 팩"으로 패키징하는 기능입니다.

Skills를 Claude에게 장착시키는 "스킬 북"이라고 상상해 보세요. 특정 작업을 완료해야 할 때, 요구 사항을 반복해서 설명할 필요 없이 Skill이 미리 정의한 기준에 따라 직접 작업을 수행할 수 있습니다.

### 왜 Skills가 필요한가요?

Skills가 등장하기 전에는 Claude Code를 사용할 때 몇 가지 문제가 있었습니다:

- **반복적인 지시**: 매번 "어떤 코드 스타일을 따를지", "커밋 메시지를 어떻게 작성할지" 등을 설명해야 했습니다
- **지식 축적 불가**: 팀원 개인의 Claude 사용 경험을 공유할 수 없었습니다
- **일관성 없는 기준**: 다른 사람이 Claude를 사용하면 완전히 다른 결과를 얻을 수 있었습니다
- **낮은 효율성**: 일반적인 작업도 매번 처음부터 설명해야 했습니다

Skills는 이러한 문제를 해결하여 Claude를 "경험 있는 팀원"으로 만들어 줍니다 — Claude는 프로젝트 규칙, 워크플로우, 모범 사례를 알고 있습니다.

---

## 왜 지금 Skills를 배워야 할까요?

**Skills는 AI 엔지니어의 필수 역량이 되고 있습니다**:

- **높은 커뮤니티 관심**: 관련 GitHub 저장소의 스타 수가 빠르게 증가하고 있습니다. 예를 들어, OpenSkills 프로젝트는 이미 7.2k 스타에 도달했고, Obsidian Skills는 단 9일 만에 6.6k 스타를 획득했습니다
- **공식 지원**: Anthropic은 공식 Skills 저장소를 유지 관리하고 있으며, Vercel은 Agent Skills와 find-skills 도구를 출시했습니다
- **높은 실용성**: 코드 리뷰, Git 작업부터 영상 제작, PPT 생성까지 Skills는 많은 시나리오를 다룹니다. skills.sh 플랫폼에는 이미 60K+ 구독을 가진 인기 스킬이 있습니다
- **효율성 향상**: 한 번 구성하면 반복해서 재사용할 수 있으며, Claude를 진정한 "디지털 직원"으로 만들어 줍니다
- **개발자 인정**: 여러 기술 커뮤니티에서 추천하며, AI 프로그래밍 효율성을 높이는 핵심 도구로 널리 인정받고 있습니다

---

## 빠른 시작

Skills의 가치를 이해했으니, 바로 시작해 보겠습니다. 이 섹션에서는 첫 번째 Skill을 설치하고 몇 가지 재미있는 실습 과제를 완료하여 빠르게 감을 잡을 수 있도록 안내합니다.

### 1단계: `find-skills` 설치 (강력 권장)

Skills를 사용하기 전에 먼저 `find-skills`를 설치하는 것을 강력히 권장합니다. 이것은 AI Agent 세계의 "궁극의 스킬 검색 도구"로, 이미 60K+ 구독자를 보유하고 있습니다.

**`find-skills`란?**

간단히 말해, `find-skills`는 AI Agent를 위한 "앱 스토어 검색 엔진"과 같습니다. 작업을 완료해야 하지만 적합한 로컬 Skill이 없을 때, 자동으로 검색하여 가장 적합한 것을 추천합니다.

**`find-skills` 설치:**

```bash
npx skills add vercel-labs/skills@find-skills -g -y
```

설치 후, Claude에게 필요한 것을 직접 말하면 `find-skills`를 사용하여 관련 스킬을 자동으로 검색합니다.

**사용 예시:**

```text
React 컴포넌트의 성능을 최적화해야 합니다. 사용할 수 있는 스킬을 찾아주세요.
```

Claude는 `find-skills`를 통해 검색한 후, 어떤 관련 스킬을 찾았는지 알려주어 하나를 선택하여 설치할 수 있습니다.

**왜 `find-skills`를 먼저 설치해야 하나요?**

`find-skills` 이전:
- GitHub에서 수동으로 관련 스킬 검색
- 하나씩 복사, 설치 및 구성
- 반복적으로 디버깅 및 조정

`find-skills` 이후:
- 한 문장으로 요구 사항 설명
- AI가 자동으로 최적의 매칭 스킬 검색
- 원클릭 설치 후 즉시 사용

**Windows 사용자 참고**: 공식 버전은 Windows 지원이 제한적입니다. 커뮤니티에서 CMD와 PowerShell을 지원하고 중국어 검색을 추가한 Windows 호환 버전을 만들었습니다.

Windows 버전 다운로드: [github.com/tongbei821/customize-skills](https://github.com/tongbei821/customize-skills/blob/main/findskills/SKILL.md)

설치 단계:
1. Windows 버전의 `SKILL.md` 다운로드
2. `C:/Users/your-username/.agents/skills/find-skills`의 파일 교체
3. Claude Code 재시작 후 적용

**관련 링크**:
- [Skills 공식 웹사이트](https://skills.sh/) - 모든 사용 가능한 스킬 탐색
- [find-skills 저장소](https://github.com/vercel-labs/agent-skills) - 공식 소스 코드

### 첫 번째 Skill 설치 및 체험하기

`find-skills`를 설치한 후, 이를 사용하여 재미있는 첫 번째 Skill을 검색하고 설치해 보겠습니다: Remotion 영상 제작 도구입니다.

#### 1단계: `find-skills`로 Remotion 검색

Claude Code에 다음을 입력하세요:

```text
Remotion과 관련된 스킬을 찾아주세요. 영상을 만들고 싶습니다.
```

Claude는 `find-skills`를 통해 검색하고 `remotion-dev/skills`를 추천합니다.

#### 2단계: Remotion Skills 설치

```bash
npx skills add remotion-dev/skills -g
```

#### 3단계: 재미있는 것을 만들어 보기

Remotion은 React 코드로 영상을 만드는 프레임워크입니다. 이 Skill을 설치한 후, 자연어로 Claude에게 영상 코드 작성을 요청할 수 있습니다.

**과제 1: 멋진 애니메이션 텍스트 영상 만들기**

```text
Remotion을 사용하여 영상을 만들어주세요:
- 1920x1080, 5초
- "Hello World" 텍스트 한 줄이 왼쪽에서 날아옵니다
- 동시에 회전 및 스케일링 효과 포함
- 배경은 그라데이션
```

Claude가 완전한 Remotion 코드를 생성하며, 실행하여 애니메이션을 볼 수 있습니다.

**과제 2: 데이터 시각화 영상 만들기**

```text
데이터 성장을 보여주는 10초 영상을 만들어주세요:
- 막대 차트로 시작
- 막대가 애니메이션과 함께 하나씩 성장합니다
- 숫자가 올라갑니다
- 마지막에 "300% 성장"이라는 큰 텍스트 표시
```

**과제 3: 다중 장면 제품 데모 영상 만들기**

```text
세 가지 장면이 있는 제품 데모 영상을 만들어주세요:
장면 1: 로고 페이드인, 2초
장면 2: 제품 기능이 하나씩 나타남, 3초
장면 3: CTA 버튼 팝업, 2초
각 장면 사이에 부드러운 전환 효과 사용
```

**코드 실행**:

Claude가 생성한 코드는 완전한 Remotion 프로젝트입니다. 다음과 같이 할 수 있습니다:

1. 새 프로젝트 생성: `npx create-video my-video`
2. Claude가 생성한 코드 복사
3. 미리보기 실행: `npm start`
4. 영상 렌더링: `npm run build`

---

### 두 번째 Skill: `find-skills`로 "프론트엔드가 보기 흉하고 느린 문제" 해결하기

#### 1단계: 자연어로 문제 설명하기

Claude에게 높은 수준의 요구 사항을 직접 말하세요:

```text
내 웹사이트가 구식으로 보이고 로딩도 느립니다. 사용할 수 있는 스킬을 찾아주세요.
```

또는 좀 더 구체적으로:

```text
프론트엔드를 더 보기 좋게 만들고 싶고, 더 이상 버벅거리지 않게 하고 싶습니다.
```

#### 2단계: Claude가 `find-skills`로 검색

Claude는 `find-skills`를 통해 skills.sh 데이터베이스를 검색하고 관련 스킬을 추천합니다. "더 보기 좋게 + 버벅거림 줄이기" 같은 요구 사항에 대해 다음을 추천합니다:

**anthropics/skills/frontend-design** (공식 스킬)

이 스킬은 AI가 생성한 인터페이스가 "평범하고 획일적으로 보이는" 문제를 해결하기 위해 특별히 설계되었으며, Claude가 다음을 디자인하도록 도와줍니다:

- 획일적인 "AI 템플릿 느낌"을 피한 독특한 비주얼 스타일
- 전문적인 색상 구성과 타이포그래피
- 부드러운 애니메이션 효과
- 프로덕션급 코드 품질, 깔끔한 코드로 자연스럽게 더 나은 성능

#### 3단계: 설치 및 사용

**설치**:

```bash
npx skills add anthropics/skills/frontend-design -g
```

**이것으로 완료할 수 있는 작업**:

```text
이 페이지를 다시 디자인해주세요. AI가 생성한 것처럼 보이지 않고 매우 전문적으로 보이게 해주세요.
```

```text
이 UI가 너무 못생겼습니다. 더 현대적인 디자인 스타일로 다시 작성해주세요.
```

```text
강한 기술 느낌의 다크 테마 대시보드를 만들어주세요.
```

Claude는 이 스킬의 규칙을 따라 다음을 디자인합니다:
- 미니멀리즘, 레트로 퓨처리즘 또는 브루탈리즘과 같은 독특한 비주얼 방향
- 신중하게 선택된 색상과 글꼴
- 합리적인 간격과 레이아웃
- 부드러운 인터랙티브 애니메이션

---

### 두 Skill 비교

| Skills | 어떤 문제를 해결하나요? | 재미 요소 |
|--------|-------------|---------|
| **remotion-dev/skills** | 코드로 영상 만들기 | ⭐⭐⭐⭐⭐ |
| **anthropics/skills/frontend-design** | 프론트엔드를 더 보기 좋게 | ⭐⭐⭐⭐ |

---

### 세 번째 Skill: `frontend-slides`로 빠르게 아름다운 PPT 프레젠테이션 만들기

#### 소개

**frontend-slides**는 자연어로 아름다운 HTML 프레젠테이션을 만들 수 있게 해주는 Skill입니다 — CSS나 JavaScript를 전혀 몰라도 됩니다.

핵심 아이디어는 "**보여주기, 말하지 않기**"입니다. 원하는 디자인 스타일을 명확히 설명할 수 없다면, "파란 배경, 큰 글꼴"과 같은 추상적인 요구 사항을 강요하는 대신 3개의 비주얼 미리보기를 생성하여 선택할 수 있게 합니다.

#### `frontend-slides` 설치

**방법 1: 수동 설치**

```bash
# 스킬 디렉토리 생성
mkdir -p ~/.claude/skills/frontend-slides

# 파일 다운로드 (또는 GitHub에서 복사)
# 1. https://github.com/zarazhangrui/frontend-slides 방문
# 2. SKILL.md와 STYLE_PRESETS.md 다운로드
# 3. ~/.claude/skills/frontend-slides/에 넣기
```

**방법 2: `find-skills`로 설치**

```text
PPT 프레젠테이션을 만드는 스킬을 찾아주세요
```

Claude는 `find-skills`를 통해 검색하고 `frontend-slides`를 추천합니다.

#### 사용 시나리오

**시나리오 1: 처음부터 프레젠테이션 만들기**

```text
/frontend-slides

AI 스타트업 프로젝트를 위한 펀딩 피치 덱을 만들고 싶습니다. 약 10장 정도
```

Claude가 다음을 안내합니다:
1. 각 슬라이드의 콘텐츠 작성 (제목, 글머리 기호, 이미지 등)
2. 원하는 느낌 설명 (인상적, 전문적, 따뜻함 등)
3. 3개의 비주얼 스타일 미리보기 중 선택
4. 완전한 HTML 프레젠테이션 생성
5. 브라우저에서 미리보기 열기

**시나리오 2: PowerPoint 파일 변환**

```text
/frontend-slides

내 presentation.pptx를 웹 프레젠테이션으로 변환해주세요
```

Claude가 수행합니다:
1. PPT에서 모든 텍스트, 이미지 및 메모 추출
2. 추출된 콘텐츠를 확인을 위해 표시
3. 비주얼 스타일 선택
4. 모든 원본 콘텐츠를 보존하는 HTML 프레젠테이션 생성

**시나리오 3: 빠른 스타일 미리보기 생성**

```text
/frontend-slides

기술 강연을 위한 PPT를 만들고 싶습니다. 먼저 사용 가능한 비주얼 스타일을 보여주세요.
```

Claude가 3개의 다른 스타일 미리보기 페이지를 직접 생성합니다:
- **다크 테마**: 네온 사이버, 터미널 그린, 딥 스페이스
- **라이트 테마**: 페이퍼 & 잉크, 스위스 모던, 소프트 파스텔
- **특수 스타일**: 브루탈리스트, 그라데이션 웨이브

#### 내장 비주얼 스타일

| 스타일 이름 | 특징 | 적합한 시나리오 |
|---------|------|---------|
| **네온 사이버** | 미래지향적 기술 느낌, 파티클 효과 | 기술 강연, AI 제품 |
| **미드나잇 이그제큐티브** | 하이엔드 비즈니스, 신뢰감 | 비즈니스 보고서, 펀딩 피치 |
| **페이퍼 & 잉크** | 에디토리얼 스타일, 문학적 분위기 | 콘텐츠 제작, 교육 공유 |
| **스위스 모던** | 깔끔한 지오메트리, 바우하우스 스타일 | 디자인 포트폴리오, 미니멀리즘 |
| **브루탈리스트** | 날것, 대담함, 주목 끌기 | 아트 쇼케이스, 개인 표현 |

#### 출력 결과

생성된 프레젠테이션은 **단일 HTML 파일**로, 다음을 포함합니다:

- 완전한 스타일링 및 인터랙션 코드
- 화살표 키와 스페이스바를 사용한 키보드 내비게이션
- 터치 및 스와이프 지원
- 마우스 휠 슬라이드 전환
- 진행률 표시줄 및 내비게이션 도트
- 스크롤 트리거 애니메이션
- 반응형 디자인

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <!-- 모든 스타일이 인라인으로 포함, 종속성 없음 -->
</head>
<body>
    <section class="slide title-slide">
        <h1 class="reveal">제목</h1>
    </section>
    <!-- 더 많은 슬라이드... -->
</body>
</html>
```

#### 왜 추천하나요?

1. **제로 종속성**: 단일 HTML 파일, 10년 후에도 열 수 있습니다
2. **비주얼 디스커버리**: 디자인을 설명할 필요 없이, 마음에 드는 것을 고르기만 하면 됩니다
3. **PPT 변환**: 기존 콘텐츠를 유지하면서 더 나은 비주얼 스킨 적용
4. **프로덕션급 코드**: 접근성, 명확한 주석, 커스터마이징 용이

**관련 링크**:
- [frontend-slides GitHub 저장소](https://github.com/zarazhangrui/frontend-slides) - 6.1k+ 스타
- [온라인 미리보기 예시](https://github.com/zarazhangrui/frontend-slides#output-example)

---

### 세 Skill 비교

| Skills | 어떤 문제를 해결하나요? | 재미 요소 | 실용성 |
|--------|-------------|---------|---------|
| **remotion-dev/skills** | 코드로 영상 만들기 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| **anthropics/skills/frontend-design** | 프론트엔드를 더 보기 좋게 | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **frontend-slides** | 빠르게 아름다운 PPT 만들기 | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |

---

### 설치 후 사용 방법

설치 후 추가 구성이 필요 없습니다. Claude에게 관련 작업을 수행하라고 요청하면 자동으로 해당 Skill을 호출합니다.

설치된 Skills 보기:

```bash
npx skills list
```

---

## Skills란 무엇인가요?

### 핵심 개념

**Skills는 파일 시스템에 저장된 "스킬 팩"입니다**. 다음을 포함할 수 있습니다:

- **SKILL.md**: 스킬의 정의 파일, 필수
- **scripts/**: 보조 스크립트, 선택 사항
- **templates/**: 출력 템플릿, 선택 사항
- **references/**: 참조 문서, 선택 사항

### Skills와 Prompts의 차이

궁금할 수 있습니다: Skills와 Claude에게 직접 프롬프트를 보내는 것의 차이는 무엇인가요?

| Prompts | Skills |
|--------|--------|
| 임시적이며, 매번 반복해야 함 | 영구적이며, 한 번 작성하면 여러 번 재사용 가능 |
| 대화 기록에 남아 토큰 소모 | 필요시 로드하여 토큰 절약 |
| 세션 간 공유 불가 | 팀 내에서 공유 가능 |
| 버전 관리 어려움 | Git으로 관리 가능 |

### 두 가지 Skills 유형

**글로벌 Skills (개인용)**:
- 저장 위치: `~/.claude/skills/`
- 범위: 모든 프로젝트
- 적합한 시나리오: 범용 개인 스킬

**프로젝트 Skills (팀용)**:
- 저장 위치: `프로젝트-디렉토리/.claude/skills/`
- 범위: 현재 프로젝트
- 적합한 시나리오: 팀 공유 및 프로젝트별 규칙

### Skills 작동 방식

Claude Code가 시작되면 다음을 수행합니다:

1. Skills 디렉토리 스캔
2. 각 `SKILL.md` 파일 파싱
3. YAML frontmatter 메타데이터 추출
4. 스킬 콘텐츠를 "지식 베이스"에 추가
5. 설명을 기반으로 자동 트리거 매칭

---

## `SKILL.md` 파일 구조

### 기본 구조

완전한 Skill 디렉토리는 다음과 같습니다:

```text
my-skill/
├── SKILL.md          # 필수: 스킬 정의 파일
├── scripts/          # 선택: 보조 스크립트
├── templates/        # 선택: 출력 템플릿
├── references/       # 선택: 참조 문서
└── examples/         # 선택: 예시 파일
```

### `SKILL.md` 템플릿

`SKILL.md` 파일은 두 부분으로 구성됩니다:

**1부: YAML Frontmatter (메타데이터)**

```yaml
---
name: skill-name              # 스킬 이름, /skill-name 명령이 됩니다
description: short description # Claude의 자동 트리거 매칭에 사용됩니다
category: development         # 카테고리
tags:                         # 태그
  - code
  - automation
---
```

**2부: Markdown 콘텐츠 (지시 사항)**

```markdown
# Skill 제목

## 사용 사례
이 스킬을 언제 사용할지

## 실행 단계
1. 1단계
2. 2단계

## 주의 사항
- 주의 사항 1
- 주의 사항 2
```

### 주요 필드 설명

| 필드 | 필수 | 설명 |
|------|------|------|
| `name` | 예 | 스킬 이름입니다. 소문자, 숫자, 하이픈만 허용됩니다 |
| `description` | 예 | 스킬 설명입니다. 구체적일수록 Claude가 자동 매칭하기 쉽습니다 |
| `category` | 아니요 | 카테고리 레이블 |
| `tags` | 아니요 | 추가 카테고리 레이블 |
| `allowed-tools` | 아니요 | 추가 권한 없이 사용할 수 있는 도구 |

---

## Skills와 MCP: 차이점은 무엇인가요?

많은 초보자가 Skills와 MCP를 혼동하지만, 이들은 완전히 다른 것입니다.

### 핵심 차이점

| 차원 | Skills | MCP |
|------|--------|-----|
| **본질** | 지식과 워크플로우 | 도구와 인터페이스 |
| **제공하는 것** | AI에게 "어떻게 할지" 알려줌 | AI에게 "무엇을 사용할 수 있는지" 제공 |
| **저장 위치** | `skills/` 디렉토리 | MCP 서버 |
| **구성 형식** | Markdown 파일 | JSON 구성 파일 |
| **트리거 방식** | `/skill-name` 또는 자동 인식 | 구성을 통해 자동 로드 |

### 직관적인 비유

Claude가 "작업자"라고 가정하면:

- **MCP**는 작업자에게 주어지는 "도구"입니다 (예: 렌치, 컴퓨터, 접근 권한)
- **Skills**는 작업자에게 주어지는 "작업 매뉴얼"입니다 (예: 코드 리뷰하는 방법, 코드 제출하는 방법)

### 관계

Skills와 MCP는 경쟁 관계가 아닙니다. 상호 보완적입니다:

```text
사용자 작업 -> Claude가 요구 사항 인식
               ↓
        관련 Skills 로드 (방법을 알고 있음)
               ↓
        MCP를 통해 도구 호출 (도구를 사용할 수 있음)
               ↓
        작업 완료
```

### 예시

**시나리오: 코드 리뷰**

- **Skills**는 리뷰 단계, 체크리스트, 출력 형식을 정의합니다
- **MCP**는 GitHub PR에 접근하고 코드 diff를 가져오는 기능을 제공합니다

협력 방식: Skills는 Claude에게 "리뷰하는 방법"을 알려주고, MCP는 Claude에게 "코드에 접근할 수 있는 능력"을 제공합니다.

### 선택 권장 사항

| 요구 사항 | 추천 솔루션 |
|----------|----------|
| 워크플로우를 정의해야 함 | Skills 사용 |
| 외부 데이터에 접근해야 함 | MCP 사용 |
| 둘 다 필요함 | 함께 사용 |

---

## Skills 획득을 위한 일반적인 리소스

### 공식 리소스

- [Anthropic 공식 Skills 저장소](https://github.com/anthropics/skills) - 공식적으로 유지 관리되는 스킬 컬렉션
- [Claude Code 공식 문서 - Skills](https://docs.anthropic.com/en/docs/claude-code/configuration/skills) - 공식 문서

### GitHub 커뮤니티 리소스

| 저장소 | 설명 |
|------|------|
| [shanraisshan/claude-code-best-practice](https://github.com/shanraisshan/claude-code-best-practice) | 커뮤니티가 정리한 Claude Code 실천 자료로, Skills, Agents, Hooks 등을 포함 |
| [affaan-m/everything-claude-code](https://github.com/affaan-m/everything-claude-code) | 사전 구성된 Skills를 포함한 종합 툴킷 |
| [JackyST0/awesome-agent-skills](https://github.com/JackyST0/awesome-agent-skills) | 엄선된 Skills 리소스 목록 |
| [jeffallan/claude-skills](https://github.com/jeffallan/claude-skills) | 66개의 전문 스킬과 300개 이상의 참조 문서 |
| [GitCode/awesome-claude-skills](https://gitcode.com/GitHub_Trending/aw/awesome-claude-skills) | 엄선된 오픈소스 컬렉션 |

### 커뮤니티 Skills 설치 방법

`find-skills`를 사용하면 Claude에게 필요한 것을 말하기만 하면 자동으로 검색하고 추천합니다:

```text
React 성능 최적화와 관련된 스킬을 찾아주세요
```

Claude는 `find-skills`를 통해 skills.sh 데이터베이스를 검색한 후 가장 관련성 높은 스킬을 나열하며, 하나를 선택하여 설치할 수 있습니다.

**검색 팁**:

- 구체적인 키워드 사용: `"react testing"`이 `"testing"`보다 좋습니다
- "도메인 + 동작" 결합: `"nextjs deploy"`, `"typescript lint"`
- 설치 수가 높은 스킬 우선 선택, 10K+은 보통 실전 검증을 거친 것입니다
- 트렌딩 목록 확인하여 새로운 스킬 발굴

---

## 나만의 Skills 만들기

Skills를 만드는 두 가지 방법이 있습니다: Claude에게 직접 만들어 달라고 요청하거나, 전용 `skill-creator` 도구를 사용하는 것입니다.

### 방법 1: Claude에게 직접 만들어 달라고 요청하기

가장 간단한 방법입니다. 자연어로 Claude에게 요구 사항을 말하기만 하면 됩니다.

**예시**:

```text
코드를 자동으로 포맷팅하는 "format-code"라는 이름의 스킬을 만들어주세요.

요구 사항:
1. 프로그래밍 언어를 자동으로 감지
2. 해당하는 포맷팅 규칙 적용
3. 포맷팅 전후의 diff 반환
```

Claude가 자동으로:
1. 디렉토리 구조 생성
2. `SKILL.md` 파일 생성
3. YAML frontmatter 작성
4. 스킬 콘텐츠 작성

**적합한 시나리오**:
- 간단한 스킬을 빠르게 생성
- 원하는 것을 알지만 `SKILL.md` 형식에 익숙하지 않음
- 빠른 반복 및 수정 원함

### 방법 2: `skill-creator` 사용

`skill-creator`는 Skills를 만들기 위한 전용 도구입니다. 단계별로 프로세스를 안내합니다.

**설치**:

```bash
npx skills add anthropics/skills@skill-creator -g
```

또는 전체 공식 스킬 저장소 설치:

```bash
npx skills add anthropics/skills -g
```

**사용**:

```text
/skill-creator
```

프롬프트에 따라 작성:
- 스킬 이름
- 기능 설명
- 사용 시나리오
- 실행 단계

`skill-creator`가 수행합니다:
1. 스킬의 용도를 명확히 하도록 안내
2. `SKILL.md` 초안 생성
3. 테스트 케이스 생성
4. 평가 실행 및 최적화

**적합한 시나리오**:
- 복잡한 스킬 생성
- 더 표준화된 생성 프로세스 필요
- 스킬 테스트 및 검증 원함

### 두 방법 비교

| 방법 1: 직접 생성 | 방법 2: `skill-creator` |
|-----------------|---------------------|
| 빠르고 간단함 | 안내식 단계 |
| 간단한 스킬에 적합 | 복잡한 스킬에 적합 |
| 대화에서 직접 완료 | 표준화된 프로세스 |
| 유연한 수정 | 테스트 및 검증 포함 |

### 팁: 좋은 요구 사항 작성 방법

**좋은 요구 사항 설명**:

```text
코드를 자동으로 커밋하는 "git-commit" 스킬을 만들어주세요.

실행 단계:
1. 어떤 파일이 수정되었는지 확인
2. Conventional Commits를 따르는 커밋 메시지 생성
3. git commit 실행
4. 푸시 여부 확인

주의 사항:
- 커밋 전에 민감한 정보가 있는지 확인
- dist/ 또는 node_modules/ 등의 디렉토리는 커밋하지 않음
```

**나쁜 요구 사항 설명**:

```text
코드를 커밋하는 스킬을 만들어주세요
```

너무 모호합니다. Claude가 정확히 무엇을 해야 할지 알 수 없습니다.

---

## 일반적인 Skill 예시

### 예시 1: 코드 리뷰 Skill

디렉토리 및 파일 생성:

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

사용 방법:

```text
/review-pr
현재 브랜치의 PR을 리뷰해주세요
```

### 예시 2: Git 자동 커밋 Skill

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

사용 방법:

```text
/git-commit
```

### 예시 3: 테스트 생성 Skill

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

사용 방법:

```text
/gen-test
src/utils.ts에 대한 단위 테스트를 생성해주세요
```

### 예시 4: 문서 생성 Skill

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

사용 방법:

```text
/gen-readme
현재 프로젝트에 대한 README 문서를 생성해주세요
```

---

## 고급 팁

### Skills와 Hooks 결합

Hooks는 특정 이벤트에서 자동으로 작업을 수행할 수 있습니다. Skills와 결합하면 더 강력한 자동화가 가능합니다.

예를 들어, 저장 후 자동으로 코드 포맷팅:

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
        "command": "/format-code"  // format-code 스킬 호출
      }
    }]
  }
}
```

### Skills와 Commands 결합

Commands는 간단한 단축 명령입니다. Skills는 복잡한 워크플로우입니다. 함께 사용할 수 있습니다.

### 팀 협업

**프로젝트 Skills 공유**:

1. Skills를 `.claude/skills/` 아래에 배치
2. Git에 커밋
3. 팀원이 프로젝트를 클론한 후 바로 사용 가능

**버전 관리**:

- Skills는 코드처럼 버전 관리할 수 있습니다
- 각 커밋은 Skills의 변경 사항을 기록할 수 있습니다
- 이전 버전으로 롤백할 수 있습니다

---

## 자주 묻는 질문

### Q1: 왜 Skill이 트리거되지 않았나요?

가능한 원인:
- YAML frontmatter 형식 오류
- 설명이 구체적이지 않음
- Claude Code가 재시작되지 않음

해결 방법:
- YAML 형식이 올바른지 확인
- 설명을 개선하고 구체적인 사용 시나리오 포함
- Claude Code 재시작

### Q2: 정확한 설명을 어떻게 작성하나요?

좋은 설명은 다음을 포함합니다:
- 스킬의 구체적인 기능
- 사용 시나리오, 예: "사용자가 ...을 언급할 때"
- 트리거 키워드

**나쁜 예**:
```text
description: Review code
```

**좋은 예**:
```text
description: Review Pull Request code. Trigger when the user mentions PR, review, or code review.
```

### Q3: Skills와 Commands의 차이는 무엇인가요?

| Commands | Skills |
|----------|--------|
| 간단한 단축 명령 | 완전한 워크플로우 |
| 단일 `.md` 파일 | 디렉토리 구조 (`SKILL.md` + 선택적 파일) |
| 수동 트리거 | 자동 트리거 가능 |
| 간단한 작업에 적합 | 복잡한 프로세스에 적합 |

### Q4: Skill을 어떻게 디버그하나요?

1. `/skills`를 사용하여 스킬이 인식되었는지 확인
2. 스킬 이름을 직접 입력하여 수동 트리거
3. `SKILL.md` 콘텐츠가 올바른지 확인
4. Claude Code 로그 확인

---

## 참고 자료

### 공식 리소스

- [Claude Code 공식 문서 - Skills](https://docs.anthropic.com/en/docs/claude-code/configuration/skills)
- [Agent Skills 표준](https://agentskills.io/)
- [Anthropic 엔지니어링 글 (Agent Skills 뒤의 실용적 아이디어)](https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills)
- [Anthropic 공식 Skills GitHub 저장소](https://github.com/anthropics/skills)
- [VS Code Copilot Agent Skills 문서](https://code.visualstudio.com/docs/copilot/customization/agent-skills)

### 리소스 디렉토리

- [skills.sh](https://skills.sh/) - Vercel의 Agent Skills 앱 스토어, 48,000+ 스킬 라이브러리
- [find-skills](https://github.com/vercel-labs/agent-skills) - 지능형 스킬 검색 도구, 60K+ 구독
- [Skills 마켓플레이스 (중국어 인터페이스)](https://skillsmp.com/zh) - 커뮤니티 Skills 발견 및 설치

### GitHub 커뮤니티 프로젝트

- [vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills) - Vercel Labs 공식 Agent Skills 컬렉션, find-skills 포함
- [claude-code-best-practice](https://github.com/shanraisshan/claude-code-best-practice) - 커뮤니티가 정리한 Claude Code 실천 자료
- [everything-claude-code](https://github.com/affaan-m/everything-claude-code) - 사전 구성된 Skills를 포함한 종합 툴킷
- [awesome-claude-skills](https://github.com/ComposioHQ/awesome-claude-skills) - 엄선된 Skills 리소스 목록
- [superpowers](https://github.com/obra/superpowers) - 소프트웨어 개발 자동화 워크플로우를 위한 Skills 컬렉션
- [jeffallan/claude-skills](https://github.com/jeffallan/claude-skills) - 66개의 전문 스킬과 300개 이상의 참조 문서
- [awesome-agent-skills](https://github.com/JackyST0/awesome-agent-skills) - 엄선된 리소스 목록

### 공식 Skill 예시

- [skill-creator](https://github.com/anthropics/skills/tree/main/skills/skill-creator) - 새로운 스킬을 만들기 위한 스킬
- [mcp-builder](https://github.com/anthropics/skills/tree/main/skills/mcp-builder) - MCP 서버를 구축하기 위한 스킬
- [slack-gif-creator](https://github.com/anthropics/skills/tree/main/skills/slack-gif-creator) - Slack GIF를 만들기 위한 스킬

### 중국어 튜토리얼

- [Claude Code 고급 구성 및 사용 팁 완전 가이드](https://blog.csdn.net/2601_95335870/article/details/158460599)
- [Vibe Coding - CLAUDE.md, Skills, Subagents의 전체 체인 실습](https://blog.csdn.net/yangshangwei/article/details/158319117)
- [단계별 Claude Code Skills 커스터마이징 가이드](https://m.blog.csdn.net/u010028049/article/details/157979705)

## 심화 학습: Claude Skills의 내부 메커니즘

다음으로, Claude Skills가 내부적으로 어떻게 작동하는지 깊이 살펴보겠습니다. 사용 방법뿐만 아니라 왜 이렇게 설계되었는지 이해할 수 있습니다.

### 제1원리 관점: 프롬프트 기반 동적 컨텍스트 주입

먼저, 하나의 핵심 사실을 이해하세요: **Skills는 실행 가능한 코드가 아닙니다**.

Skills는 본질적으로 고급 명령어, 즉 프롬프트이며, 필요할 때 Claude의 컨텍스트에 "주입"됩니다. 이 설계는 "**프롬프트 기반 동적 컨텍스트 주입 및 메타 도구 아키텍처**"라고 불립니다.

```text
┌─────────────┐      ┌─────────────┐      ┌──────────────┐
│ 사용자 요청 │ ───> │ LLM 매칭    │ ───> │ Skill 트리거 │
└─────────────┘      │ 설명        │      └──────────────┘
                     └─────────────┘              │
                                                 ▼
                                          ┌──────────────┐
                                          │ 전체 지시     │
                                          │ 주입          │
                                          └──────────────┘
                                                 │
                                                 ▼
                                          ┌──────────────┐
                                          │ 작업 실행     │
                                          └──────────────┘
```

### 3계층 점진적 로딩 아키텍처 (토큰 최적화)

너무 많은 토큰을 소모하지 않으면서 많은 수의 Skills를 처리하기 위해, Claude는 스마트한 3계층 로딩 메커니즘을 사용합니다:

| 계층 | 콘텐츠 | 로드 시점 | 토큰 비용 |
|------|------|----------|-----------|
| **계층 1: 메타데이터** | YAML frontmatter (`name + description`) | Claude 시작 시 | ~30-50 토큰/skill |
| **계층 2: 지시 사항** | 전체 `SKILL.md` 콘텐츠 | Skill이 트리거될 때 | ~5,000 토큰 |
| **계층 3: 리소스** | 스크립트, 템플릿, 참조 문서 | 필요시 파일 시스템에서 접근 | 컨텍스트에 추가되지 않음 |

**이 설계의 장점**:

- 100개의 Skills가 있다고 가정해 보세요. 시작 시 메타데이터에 약 3,000-5,000 토큰만 소모됩니다
- 트리거된 Skill만 전체 콘텐츠를 로드합니다
- 참조 문서와 같은 리소스 파일은 컨텍스트에 완전히 로드되지 않습니다

**Skills가 없는 경우와 비교**:

```text
Skills 없음: 매 대화마다 모든 기능을 설명하는 데 50,000+ 토큰 필요
Skills 있음: 시작 시 ~100 토큰/skill + 필요시 5,000 토큰 로드
절약: 평균적으로 대화당 40,000+ 토큰 절약
```

### 이중 컨텍스트 주입 메커니즘

Skill이 활성화되면, 시스템은 동시에 두 가지 수정을 수행합니다:

**1. 대화 컨텍스트 주입**

```javascript
// 사용자가 보는 것 (표시되는 메시지)
<command-message>The "pdf" skill is loading</command-message>

// AI가 실제로 수신하는 것 (숨겨진 메타 메시지)
{
  isMeta: true,  // 메타 메시지로 표시, UI에 표시되지 않음
  content: `
    # PDF 분석 전문가 지시 사항

    당신은 전문 PDF 분석 전문가입니다. 워크플로우:
    1. pdftotext를 사용하여 텍스트 추출
    2. 문서 구조 분석
    3. 요약 보고서 생성
    ...
  `  // 전체 SKILL.md 콘텐츠, 수천 단어에 달할 수 있음
}
```

**2. 실행 컨텍스트 수정**

지시 사항 주입 외에도 Skill은 Claude의 환경을 동적으로 수정할 수 있습니다:

| 수정 유형 | 예시 | 설명 |
|---------|------|------|
| **도구 권한** | `allowed-tools: "Bash(pdftotext:*)"` | 특정 도구에 대한 임시 접근 권한 부여 |
| **모델 전환** | Sonnet에서 Opus로 전환 | 일부 복잡한 작업은 더 강력한 추론 필요 |
| **컨텍스트 격리** | 하위 세션 공간 생성 | 메인 대화 컨텍스트 오염 방지 |

### 완전히 LLM 추론 기반의 라우팅 메커니즘

이것은 매우 중요한 설계 결정입니다: **Claude Skills는 하드코딩된 라우팅을 사용하지 않습니다**.

| 전통적 방식 | Claude Skills |
|---------|--------------|
| ❌ 임베딩 벡터 매칭 | ✅ 순수 LLM 추론 |
| ❌ 분류기 | ✅ Transformer 포워드 패스 |
| ❌ 정규식 또는 키워드 매칭 | ✅ 자연어 이해 |
| ❌ 별도의 라우팅 알고리즘 | ✅ 통합 모델 의사결정 |

**워크플로우**:

```text
1. 각 Skill의 이름과 설명이 Skill 도구 설명으로 포맷팅됩니다

2. Claude가 수신합니다:
   - 사용자 메시지
   - Skill 메타 도구를 포함한 사용 가능한 도구 목록
   - 이름 + 설명이 포함된 Skill 목록

3. Claude의 자연어 이해가 사용자 의도를 Skill 설명과 매칭합니다

4. 매칭이 성공하면 호출합니다: command: "skill-name"
```

**왜 이렇게 설계했나요?**

**하드코딩된 라우팅은 다음이 필요합니다**:
- 추가 유지 관리 비용
- 복잡한 의미 관계를 이해할 수 없음
- 다국어 처리의 어려움
- 퍼지 매칭 미지원

**순수 LLM 추론**:
- Claude 자체의 언어 이해 능력 활용
- 다국어, 동의어, 퍼지 설명 자동 처리
- 추가 유지 관리 불필요
- 라우팅 결정을 더 지능적으로 만듦

### 파일 파싱 메커니즘

**`SKILL.md` 파일 구조**:

```bash
my-custom-skill/
├── SKILL.md              # 필수: 핵심 정의 파일
├── config.json           # 선택: 메타데이터 구성
├── README.md             # 권장: 사용 문서
├── scripts/              # 선택: 실행 가능한 스크립트
├── templates/            # 선택: 템플릿 폴더
└── references/           # 선택: 참조 문서
```

**파싱 흐름**:

```text
┌─────────────────────────────────────────────────────────────┐
│                    Claude Code 시작                          │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│  ~/.claude/skills/ 및 .claude/skills/ 디렉토리 스캔          │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│  gray-matter 라이브러리를 사용하여 각 SKILL.md의             │
│  YAML frontmatter 파싱                                      │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│  필수 필드 검증 (name 및 description)                        │
│  - name: 최대 64자, 소문자, 숫자,                            │
│    하이픈만 허용                                             │
│  - description: LLM 자동 매칭에 사용                         │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│  메타데이터 추출 및 Skill 목록 구축                           │
│  (이름 + 설명만 로드, 전체 본문은 로드하지 않음)             │
└─────────────────────────────────────────────────────────────┘
```

### 전체 실행 흐름 예시

구체적인 예시를 통해 전체 흐름을 살펴보겠습니다:

```text
사용자: "이 PDF 파일을 분석해주세요"

═══════════════════════════════════════════════════════════════

1단계: LLM 결정
────────────────
Claude가 Skill 목록에서 "pdf" 스킬의 설명을 찾습니다:
  description: "Analyze PDF document content, extract text, generate a summary"

═══════════════════════════════════════════════════════════════

2단계: 시스템 개입
────────────────
Claude Code가 실행합니다:
  1. ~/.claude/skills/pdf/SKILL.md 읽기
  2. 표시되는 메시지 생성: "The pdf skill is loading"
  3. 숨겨진 메타 메시지 생성: 전체 SKILL.md 콘텐츠
  4. 세션 권한 수정: allowed-tools = ["Bash(pdftotext:*)"]

═══════════════════════════════════════════════════════════════

3단계: LLM 실행
────────────────
이제 Claude의 컨텍스트에는 다음이 포함됩니다:
  - 원래 사용자 요청
  - PDF 전문가 워크플로우 지시 사항
  - pdftotext 도구에 대한 접근 권한

Claude가 실행합니다:
  1. pdftotext를 사용하여 PDF 텍스트 추출
  2. 콘텐츠 구조 분석
  3. 요약 보고서 생성
  4. 사용자에게 결과 제시

═══════════════════════════════════════════════════════════════

4단계: 사용 후 폐기
────────────────
작업이 완료되면 전체 Skill 콘텐츠가 컨텍스트에서 제거됩니다
(대화 기록만 남고, 전체 Skill 지시 사항은 유지되지 않습니다)
```

### 핵심 설계 혁신

| 혁신 | 전통적 방식 | Skills 방식 | 장점 |
|--------|---------|------------|------|
| **능력 출처** | 모델 가중치에 고정 | 동적으로 로드되는 프롬프트 | 확장 가능, 업데이트 가능 |
| **토큰 효율성** | 모든 능력이 항상 메모리에 상주 | 필요시 로드 | 80%+ 토큰 절약 |
| **지식 관리** | 대화 기록에 흩어져 있음 | 모듈식 파일 시스템 | 버전 관리 가능, 공유 가능 |
| **수명 주기** | 지속적으로 공간 차지 | 사용 후 폐기 | 더 깔끔한 컨텍스트 |

### 학술적 기반

Claude Skills의 설계는 다음 연구를 참고합니다:

| 연구 분야 | 대표 작품 | 여기에서의 응용 |
|---------|---------|---------|
| **강화 학습** | Voyager (2023) | 스킬 라이브러리 축적 아이디어 |
| **인지 아키텍처** | ACT-R, Soar | 절차적 기억과 서술적 기억의 분리 |
| **계층적 정책** | Options Framework | 3계층 점진적 로딩 |

**핵심 사고의 전환**:

```text
전통: AI가 모든 것을 기억해야 함
      ↓
Skills: AI가 전문 지식을 어디서 찾을 수 있는지 알고 있음
      ↓
결과: 인간 전문가의 사고 패턴에 더 가까움
```

### Agent Skills 표준과의 관계

Claude Skills는 [Agent Skills 개방 표준](https://agentskills.io/)을 따르며, 이는 다음을 의미합니다:

- ✅ 크로스 플랫폼 호환성: Cursor, Windsurf, Aider 등의 도구도 지원
- ✅ 통일된 파일 형식: 표준화된 `SKILL.md` 구조
- ✅ 상호 운용성: Skills를 다른 도구 간에 공유 가능

```text
Agent Skills 표준 정의:
├── 필수: SKILL.md 파일 (메타데이터 + 지시 사항)
├── 선택: scripts/ (실행 가능한 코드)
├── 선택: references/ (지식 베이스 문서)
└── 선택: assets/ (템플릿 및 리소스)
```

### 요약: 왜 이 설계가 훌륭한가요?

1. **능력과 모델의 분리**: 전문 지식이 더 이상 모델 훈련에 의존하지 않으며, Markdown 파일을 통해 언제든 업데이트 가능

2. **극단적인 토큰 효율성**: 3계층 로딩 메커니즘이 필요한 콘텐츠만 로드하도록 보장

3. **LLM 자체의 강점 활용**: 라우팅과 매칭이 완전히 Claude의 언어 이해에 의존하며, 추가 알고리즘이 필요 없음

4. **개발자 친화적**: Skill을 만들기 위해 Markdown만 작성하면 되며, 프로그래밍이 필요 없음

5. **조합 가능**: Skills가 서로 참조하고 결합하여 복잡한 워크플로우를 형성할 수 있음

6. **사용 후 폐기**: 완료 후 자동 정리하여 컨텍스트를 깔끔하게 유지

---

### 요약

Skills는 Claude Code를 "범용 어시스턴트"에서 "팀 전문가"로 변환하는 핵심입니다.

Skills를 통해 다음을 할 수 있습니다:
- 워크플로우 표준화
- 팀 지식 재사용
- 협업 효율성 향상
- 반복적인 설명 감소

기억하세요: **같은 지시를 두 번 반복하고 있다면, Skill을 만드는 것을 고려해야 합니다**.

이제 첫 번째 Skill을 만들어 보세요.
