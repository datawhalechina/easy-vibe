# Claude Agent Teams 완전 가이드

## Agent Teams 소개

**Agent Teams**는 Claude Code의 혁신적인 기능으로, **여러 개의 독립적인 AI 인스턴스가 실제 개발 팀처럼 협업**할 수 있게 해줍니다.

상상해 보세요. 과거에 Claude Code를 사용하는 것은 한 명의 뛰어난 능력을 가진 조수와 함께 일하는 프로젝트 매니저 같았습니다. 아무리 복잡한 작업이라도 그 조수 한 명이 모든 일을 처리해야 했습니다. 이제 Agent Teams를 사용하면 완전한 AI 개발 팀을 구성할 수 있습니다. 한 명은 프론트엔드를, 다른 한 명은 백엔드를, 또 다른 한 명은 테스트를 담당하며, **동시에 작업하고 서로 소통하며 복잡한 작업을 협업하여 완료**할 수 있습니다.

### 단일 조수에서 팀 협업으로

Agent Teams에 대해 자세히 알아보기 전에, 먼저 이 기능이 해결하는 문제를 이해해 봅시다.

**단일 AI 모드의 한계**:

단일 Claude 인스턴스로 복잡한 프로젝트를 처리할 때 다음과 같은 병목 현상에 직면하게 됩니다:

- **직렬 처리 병목**: AI는 한 번에 하나의 작업만 수행할 수 있습니다. 예를 들어, 프로젝트를 리팩토링할 때 인증 모듈을 먼저 분석하고, 그 다음 데이터베이스 모듈, 마지막으로 API 모듈을 분석해야 합니다. 이러한 단계들은 서로 의존하지 않더라도 순차적으로 수행되어야 합니다.

- **컨텍스트 혼잡 문제**: 모든 정보가 단일 대화 창에 존재합니다. 대화가 길어지면 초기의 중요한 세부 사항이 묻히게 되고, AI는 이전에 논의된 핵심 결정을 잊어버릴 수 있습니다.

- **단일 관점 제한**: 하나의 AI만 생각하고 있으므로 다각도의 논의나 검증이 없습니다. 복잡한 설계 결정이 나타났을 때 토론하거나 다른 관점을 제시할 "팀원"이 없습니다.

- **효율성 한계**: 대규모 리팩토링이나 다중 모듈 개발은 오랜 시간이 걸리며, 병렬 처리를 통해 속도를 높일 방법이 없습니다.

**Agent Teams의 해결책**:

Agent Teams는 **다중 인스턴스의 병렬 협업**을 통해 이러한 문제를 해결합니다:

- **진정한 병렬 작업**: 여러 AI가 동시에 다른 작업을 수행할 수 있습니다. 하나는 프론트엔드 UI를, 다른 하나는 백엔드 API를, 또 다른 하나는 데이터베이스 설계를 처리하며 서로 간섭하지 않습니다.

- **독립적인 컨텍스트 공간**: 각 팀원은 자신만의 완전한 200K 토큰 컨텍스트 창을 가지며, 중요한 정보가 대화가 너무 길어져서 "잊혀지는" 일이 없습니다.

- **팀 협업 능력**: 멤버들은 직접 소통하고, 설계 결정을 논의하며, 서로의 코드 품질을 검증할 수 있습니다. 마치 실제 개발 팀처럼요.

- **상당한 효율성 향상**: Anthropic의 내부 테스트에 따르면 대규모 프로젝트 리팩토링의 효율성이 약 50% 향상될 수 있습니다.

---

## Agent Teams vs Subagent

Agent Teams의 아키텍처를 깊이 이해하기 전에, 먼저 흔한 혼란을 해결해야 합니다: **Agent Teams와 Subagent의 차이는 무엇인가요**?

두 기능 모두 "여러 AI의 협업"과 관련이 있지만, 협업 모델은 완전히 다르며 다른 시나리오에 적합합니다.

### 핵심 차이점 한눈에 보기

| 차원 | Subagent | Agent Teams |
|---------|-------------------|----------------------|
| **토폴로지** | 스타 토폴로지: 모든 하위 에이전트가 메인 에이전트에 보고 | 메시 토폴로지: 멤버 간 직접 소통 가능 |
| **소통 방식** | 메인 에이전트가 프롬프트로 정보를 전달하고, 하위 에이전트는 완료 후 결과 반환 | 멤버들이 직접 소통, 토론, 조정 가능 |
| **컨텍스트 관리** | 각 하위 에이전트는 독립적인 컨텍스트를 가지며, 메인 에이전트는 필요한 정보만 전달 | 각 멤버는 완전히 독립적인 컨텍스트를 가짐 |
| **병렬성** | 병렬 실행 가능하지만 협업 체인은 여전히 메인 에이전트 중심 | 진정한 병렬 개발 및 협업 |
| **작업 조정** | 메인 에이전트가 모든 것을 중앙에서 분배하고 조정 | 멤버들이 더 자율적으로 작업을 담당 가능 |
| **비용** | 낮지 않음. 여러 하위 에이전트가 병렬로 실행되면 토큰 사용량 누적 | 더 높음. 멤버들이 독립적으로 실행되고 더 자주 소통 |

### 직관적인 비유

**Subagent는 이와 같습니다**: 매니저가 여러 조수에게 각각 작업 지시서를 작성해 주는 것과 같습니다. 각 조수는 자신의 작업 지시서에 따라 독립적으로 일하며, 완료되면 매니저에게만 결과를 반환합니다. 조수들 간에는 직접 소통이 없으며, 매니저는 조수들이 작업하는 동안 그들의 전체 사고 과정을 볼 수 없습니다.

```
You → 메인 에이전트 → 하위 에이전트 A: "이 파일을 분석해"
You → 메인 에이전트 → 하위 에이전트 B: "그 함수를 검색해"
         ↓
    하위 에이전트 A 완료 → 메인 에이전트에 결과 보고
    하위 에이전트 B 완료 → 메인 에이전트에 결과 보고
         ↓
    메인 에이전트 결과 종합 → 사용자에게 보고
```

**Agent Teams는 이와 같습니다**: 프로젝트 매니저가 실제 개발 팀을 이끄는 것과 같습니다. 팀원들은 프로젝트 매니저를 거쳐 모든 세부 사항을 전달하는 대신 직접 소통하고, 토론하며, 협업할 수 있습니다.

```
You → 팀 리드: "사용자 인증 기능을 만들어 줘"
         ↓
    팀 리드가 팀을 만들고 작업을 할당
         ↓
    팀원 A: "@팀원 B, API 인터페이스 설계 다 됐어?"
    팀원 B: "응, 이 형식이야..."
    팀원 C: "인터페이스 검토했는데 논의해야 할 게 있어..."
         ↓
    팀원들이 협업하여 작업 완료 → 팀 리드가 결과 종합 → 사용자에게 보고
```

### 어떤 것을 언제 사용해야 하나요

**Subagent를 사용해야 할 때**:

- 빠르고 명확한 단일 작업이 있는 경우, 예: "이 에러 코드 검색"
- 작업 간 의존성이 낮은 경우
- 병렬 실행이 필요하지만 멤버 간 지속적인 논의가 필요 없는 경우

**Agent Teams를 사용해야 할 때**:

- 여러 모듈에 걸친 복잡한 시스템 리팩토링을 수행 중인 경우
- 다각도 분석과 논의가 필요한 경우, 예: 보안 전문가와 성능 전문가가 솔루션을 논의
- 프론트엔드, 백엔드, 테스트가 동시에 진행되는 진정한 병렬 개발이 필요한 경우
- 작업에 빈번한 조정과 정보 공유가 필요한 경우

### 간단한 요약

- **Subagent**: 큰 작업을 작은 작업으로 나누어 다른 "작업자"에게 분배하는 작업 분배 도구
- **Agent Teams**: 멤버들이 실제 팀처럼 소통하고, 토론하고, 함께 일할 수 있는 진정한 협업 팀

---

## 핵심 아키텍처

Agent Teams는 단순히 "여러 인스턴스 열기" 기능이 아닙니다. 이는 완전한 **멀티 에이전트 협업 시스템**입니다. 이를 이해하려면 핵심 구성 요소와 그들이 어떻게 함께 작동하는지 이해해야 합니다.

### 팀 구성

Agent Team은 네 가지 핵심 구성 요소로 이루어져 있으며, 각각 자신의 책임을 가지고 복잡한 작업을 완료하기 위해 함께 작동합니다.

**팀 리드 (Team Lead)**

팀 리드는 전체 팀의 "두뇌"이자 "조정자"입니다. 직접 코딩 작업을 수행하지 않습니다. 대신 다음을 담당합니다:

- **요구사항 분석 및 작업 분해**: 사용자의 복잡한 요구사항을 병렬로 실행할 수 있는 여러 하위 작업으로 나눔
- **팀 생성 및 관리**: 몇 명의 멤버가 필요한지, 각 멤버가 무엇을 해야 하는지 결정
- **작업 할당 및 스케줄링**: 적절한 멤버에게 작업을 할당하고 작업 간의 의존성 관리
- **결과 종합 및 품질 관리**: 각 멤버의 작업을 수집, 통합하고 최종 검토 수행

**팀원 (Teammates)**

팀원은 실제로 작업을 수행하는 "개발자"입니다. 각 팀원은 독립적인 Claude 인스턴스입니다:

- **독립적인 컨텍스트 창**: 각 멤버는 완전한 200K 토큰 컨텍스트 창을 가지며, 팀 리드 및 다른 멤버와 완전히 격리됨
- **완전한 도구 권한**: Read, Write, Edit, Bash 등 모든 도구 사용 가능
- **자율적인 작업 할당**: 공유 작업 보드에서 독립적으로 작업을 선택하고 할당받을 수 있음
- **직접 소통 능력**: 항상 팀 리드를 거치지 않고 다른 멤버와 직접 소통 가능

**작업 목록 (TaskList)**

TaskList는 팀의 "프로젝트 관리 도구"로, Jira나 Trello와 유사합니다:

- **작업 상태 관리**: 각 작업은 명확한 상태를 가짐: `pending`, `in_progress` 또는 `completed`
- **의존성 관리**: 작업은 의존성을 정의할 수 있으며, 종속된 작업은 선행 작업이 완료된 후에만 시작 가능
- **자동 잠금 해제 메커니즘**: 한 작업이 완료되면 시스템이 자동으로 확인하고 대기 중인 작업을 잠금 해제
- **파일 잠금 메커니즘**: 멤버가 작업을 할당받고 시작하면 작업 디렉토리에 잠금 파일이 생성되어 여러 멤버가 같은 파일을 동시에 편집하는 것을 방지

**메시징 시스템 (Messaging System)**

메시징 시스템은 팀원 간의 "채팅 도구"입니다:

- **1:1 소통**: 멤버 A가 멤버 B에게 직접 메시지를 보낼 수 있음
- **브로드캐스트 공지**: 한 번에 모든 멤버에게 메시지를 보낼 수 있음
- **파일 시스템 기반**: 메시지는 `~/.claude/teams/{team-name}/inboxes/`에 JSON 파일로 저장됨
- **네트워크 불필요**: 모든 것이 로컬 파일 시스템을 통해 작동하며, 네트워크 연결이나 포트 수신이 필요 없음

### 협업 흐름

일반적인 Agent Teams 작업 흐름은 다음과 같습니다:

```
사용자가 복잡한 요구사항을 제출
       ↓
팀 리드가 요구사항을 분석하고 작업으로 분할
       ↓
팀원을 생성하고 작업 목록 초기화
       ↓
       ├─→ 팀원 A가 작업 1 할당 ─┐
       ├─→ 팀원 B가 작업 2 할당 ─┼→ 병렬 실행
       ├─→ 팀원 C가 작업 3 할당 ─┤
       │                          ↓
       └──────────────────── 팀원들이 메시징 시스템으로 조정
                                  ↓
                   모든 작업이 완료되면 팀 리드가 결과 종합
                                  ↓
                   최종 출력이 사용자에게 전달
```

### 파일 시스템 레이아웃

Agent Teams는 로컬 파일 시스템에 전용 디렉토리를 생성하여 팀 상태를 관리합니다:

```
~/.claude/
├── teams/
│   └── {team-name}/
│       ├── config.json          # 팀 설정 (멤버 목록, 모델 선택 등)
│       └── inboxes/
│           ├── team-lead.json   # 팀 리드 받은편지함
│           ├── teammate-1.json  # 팀원 1 받은편지함
│           └── teammate-2.json  # 팀원 2 받은편지함
└── tasks/
    └── {team-name}/
        ├── task-1.json          # 작업 1의 상세 정보
        ├── task-2.json          # 작업 2의 상세 정보
        └── current_tasks/
            └── parse_if_statement.txt  # 작업 실행 중 생성된 잠금 파일
```

이 설계의 장점은 **완전한 투명성**입니다: 언제든 팀 상태, 작업 진행 상황 및 멤버 간의 소통 기록을 검사할 수 있습니다.

---

## 빠른 시작

### 실험적 기능 활성화

Agent Teams는 현재 **실험적 기능**이며 기본적으로 비활성화되어 있습니다. 사용하려면 먼저 활성화해야 합니다.

**가장 쉬운 방법: Claude Code가 활성화하게 하기**

Claude Code에 직접 입력:

```
settings.json에서 Agent Teams를 활성화해 줘
```

또는:

```
실험적 기능 agentTeams를 활성화해 줘
```

Claude Code가 자동으로 `~/.claude/settings.json`을 수정하고 다음 설정을 추가합니다:

```json
{
  "experimental": {
    "agentTeams": true
  }
}
```

**Claude Code 재시작**

설정이 추가된 후, **Claude Code를 완전히 종료하고 다시 시작**하면 기능이 활성화됩니다.

**수동 설정 (자동 방법이 작동하지 않는 경우)**:

`~/.claude/settings.json`을 수동으로 편집하여 추가 또는 수정:

```json
{
  "experimental": {
    "agentTeams": true
  }
}
```

**활성화 확인 방법**

Claude Code를 다시 시작한 후, 이런 대화를 시도해 보세요:

```
You: Agent Team을 만들어 줄 수 있나요?

Claude: 네! 작업에 협업할 Agent Team을 만들어 드릴 수 있습니다...
```

Claude가 팀 생성 요청을 이해하고 응답하면 기능이 성공적으로 활성화된 것입니다.

### 시각적 모드 설정 (선택 사항)

팀원들의 작업을 실시간으로 보고 싶다면 **분할 창 표시 모드**를 설정할 수 있습니다.

**Claude Code가 설정하게 하기**:

Claude Code에 직접 입력:

```
settings.json에서 Agent Teams의 분할 창 표시 모드를 활성화해 줘, tmux 사용
```

또는:

```
agent-teams를 split-panes 모드로 설정해 줘
```

**tmux 설치 (아직 설치되지 않은 경우)**:

`tmux`가 아직 설치되지 않은 경우, Claude Code에 설치를 요청할 수 있습니다:

```
tmux를 설치해 줘
```

Claude Code가 운영 체제에 따라 적절한 설치 명령을 자동으로 실행합니다. macOS든 Linux든 관계없이요.

**설정 후의 모습**:

설정이 완료되면 팀원들이 다른 tmux 창에서 작업하며, 모든 출력을 동시에 볼 수 있습니다. "모니터링 벽"과 같습니다.

```
┌─────────────────┬─────────────────┬─────────────────┐
│  팀원 1         │  팀원 2         │  팀원 3         │
│  코드 분석 중   │  API 구축 중    │  테스트 작성 중 │
│  ...            │  ...            │  ...            │
│                 │                 │                 │
└─────────────────┴─────────────────┴─────────────────┘
```

**수동 설정 (자동 방법이 작동하지 않는 경우)**:

`~/.claude/settings.json`을 수동으로 편집:

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

### 실습 예제: Agent Teams로 포켓몬 스타일 RPG 게임 만들기

Agent Teams의 강력함을 완전한 프로젝트를 통해 경험해 봅시다. 이 예제는 여러 AI 팀원이 처음부터 협업하여 전투 시스템, 대화 기능, 탐험 요소를 포함한 RPG 게임을 만드는 과정을 보여줍니다.

**프로젝트 요구사항**:

포켓몬 스타일의 웹 RPG를 만듭니다. 다음 기능을 포함합니다:

- **캐릭터 시스템**: 플레이어가 레벨, HP, 공격력, 방어력 등의 능력치를 가진 캐릭터를 생성
- **전투 시스템**: 턴제 전투, 공격/스킬/아이템/도주 옵션
- **몬스터 시스템**: 다양한 속성과 스킬을 가진 여러 야생 몬스터
- **대화 시스템**: NPC 대화 및 서브 퀘스트
- **맵 탐험**: 플레이어가 장면 간에 이동할 수 있는 간단한 2D 맵
- **저장 시스템**: 레벨, 위치, 완료된 퀘스트 등 게임 진행 상황 저장
- **사운드 효과 및 애니메이션**: 공격, 피해, 레벨업 시의 시각 효과 및 사운드 효과

**Claude Code에 입력**:

```
포켓몬 스타일의 웹 RPG 게임을 만들고 싶습니다.

협업 개발을 위한 팀을 만들어 주세요:

팀원 역할:
- 팀원 A (게임 아키텍트): 전체 아키텍처 설계, 게임 상태 머신 정의, 데이터 구조 계획
- 팀원 B (전투 시스템): 턴제 전투 로직, 스킬 시스템, 데미지 계산 구현
- 팀원 C (대화 시스템): NPC 대화, 퀘스트 시스템, 스토리 스크립트 구현
- 팀원 D (맵 렌더링): Canvas를 사용한 2D 맵 렌더링, 캐릭터 이동, 장면 전환 구현
- 팀원 E (UI 및 오디오): 게임 인터페이스, 전투 UI, 사운드 재생 설계

기술 요구사항:
- React + TypeScript + Vite 사용
- Tailwind CSS로 스타일링
- Framer Motion으로 애니메이션
- Zustand로 상태 관리
- 턴제 전투 시스템
- localStorage로 데이터 저장
- Web Audio API로 사운드 처리

각 멤버는 Sonnet을 사용하고, 팀 리드는 Opus를 사용하세요.

먼저 아키텍트에게 전체 솔루션을 설계해 달라고 하세요. 데이터 구조가 정의된 후 다른 멤버들이 병렬로 개발하게 하세요.
```

**Claude의 실행 방식**:

**1단계: 아키텍처 설계**

팀 리드는 먼저 팀원 A(게임 아키텍트)에게 전체 구조를 설계하도록 요청합니다:

```
팀원 A가 게임 아키텍처를 설계 중...

기술 스택: React 18 + TypeScript + Vite + Tailwind CSS + Framer Motion + Zustand

프로젝트 초기화:
npm create vite@latest pokemon-rpg -- --template react-ts
npm install zustand framer-motion
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

파일 구조:
src/
├── App.tsx                 # 메인 앱 컴포넌트
├── main.tsx                # 진입점 파일
├── types/
│   ├── player.ts           # 플레이어 타입 정의
│   ├── monster.ts          # 몬스터 타입 정의
│   ├── skill.ts            # 스킬 타입 정의
│   └── game.ts             # 게임 상태 타입
├── stores/
│   └── gameStore.ts        # Zustand 상태 관리
├── components/
│   ├── map/                # 맵 관련 컴포넌트
│   │   ├── MapCanvas.tsx   # 맵 Canvas
│   │   ├── PlayerSprite.tsx # 플레이어 스프라이트
│   │   └── NPCSprite.tsx   # NPC 스프라이트
│   ├── battle/             # 전투 관련 컴포넌트
│   │   ├── BattleScreen.tsx    # 전투 화면
│   │   ├── BattleMenu.tsx      # 전투 메뉴
│   │   ├── HPBar.tsx           # HP 바 컴포넌트
│   │   └── BattleLog.tsx       # 전투 로그
│   ├── dialog/             # 대화 관련 컴포넌트
│   │   ├── DialogBox.tsx   # 대화 상자
│   │   └── Choices.tsx     # 선택지 컴포넌트
│   └── ui/                 # 공유 UI 컴포넌트
│       ├── Button.tsx
│       ├── ProgressBar.tsx
│       └── StatCard.tsx
├── systems/
│   ├── BattleSystem.ts     # 전투 시스템 로직
│   ├── DialogSystem.ts     # 대화 시스템 로직
│   ├── QuestSystem.ts      # 퀘스트 시스템 로직
│   └── MapSystem.ts        # 맵 시스템 로직
├── hooks/
│   ├── useBattle.ts        # 전투 훅
│   ├── useDialog.ts        # 대화 훅
│   └── useAudio.ts         # 오디오 훅
├── data/
│   ├── monsters.ts         # 몬스터 데이터
│   ├── skills.ts           # 스킬 데이터
│   ├── dialogues.ts        # 대화 스크립트
│   └── maps.ts             # 맵 데이터
└── utils/
    ├── audio.ts            # 오디오 유틸리티
    └── storage.ts          # 저장 유틸리티

핵심 데이터 구조 설계:

// types/player.ts - 플레이어 타입
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

// types/skill.ts - 스킬 타입
  id: string,
  name: string,
  type: 'attack' | 'heal' | 'buff' | 'special',
  power: number,
  accuracy: number,
  pp: number,
  maxPp: number,
  effect?: string
}

// 게임 상태
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

전투 시스템 설계:
- 턴제, 플레이어가 먼저 행동
- 매 턴 플레이어가 선택 가능: 공격, 스킬, 아이템, 도주
- 스킬에는 PP 제한이 있으며, 소진 시 복원 필요
- 데미지 공식: (공격자 공격력 / 방어자 방어력) × 스킬 위력 × 랜덤 계수 (0.85~1.0)

대화 시스템 설계:
- 타이핑 효과로 텍스트 표시
- 분기 선택지 지원
- 조건 트리거 지원, 예: 퀘스트 완료 후
- NPC는 방향을 가지며, 플레이어가 다가가면 대화가 자동으로 트리거됨
```

**2단계: 병렬 개발**

아키텍처가 확인되면 팀 리드가 작업 목록을 만들고 다른 멤버들이 병렬로 작업을 시작합니다:

```
작업 목록:
├── [팀원 B] 전투 시스템 핵심 로직 구현 (진행 중...)
├── [팀원 C] 대화 및 퀘스트 시스템 구현 (진행 중...)
├── [팀원 D] 2D 맵 렌더링 구현 (진행 중...)
└── [팀원 E] UI 및 오디오 설계 (진행 중...)
```

<details>
<summary>📁 팀원 B: 전투 시스템 핵심 코드</summary>

```javascript
// battle.js - 전투 시스템
class BattleSystem {
  constructor(player, monster) {
    this.player = player;
    this.monster = monster;
    this.turn = 'player';
    this.log = [];
    this.state = 'active'; // active, victory, defeat, flee
  }

  // 플레이어 공격
  playerAttack(skill) {
    if (this.turn !== 'player') return;

    const damage = this.calculateDamage(this.player, this.monster, skill);
    this.monster.hp = Math.max(0, this.monster.hp - damage);

    this.log.push(`${this.player.name}이(가) ${skill.name}을(를) 사용했다!`);
    this.log.push(`${damage}의 데미지를 입혔다!`);

    // 스킬 효과
    if (skill.effect) {
      this.applyEffect(this.player, this.monster, skill.effect);
    }

    // 전투 종료 여부 확인
    if (this.monster.hp <= 0) {
      this.state = 'victory';
      this.log.push(`${this.monster.name}이(가) 쓰러졌다!`);
      this.giveExp();
    } else {
      this.turn = 'monster';
      setTimeout(() => this.monsterAttack(), 1000);
    }
  }

  // 몬스터 공격
  monsterAttack() {
    if (this.state !== 'active') return;

    // 랜덤 스킬 선택
    const skill = this.monster.skills[Math.floor(Math.random() * this.monster.skills.length)];
    const damage = this.calculateDamage(this.monster, this.player, skill);

    this.player.hp = Math.max(0, this.player.hp - damage);

    this.log.push(`${this.monster.name}이(가) ${skill.name}을(를) 사용했다!`);
    this.log.push(`${damage}의 데미지를 입혔다!`);

    if (this.player.hp <= 0) {
      this.state = 'defeat';
      this.log.push(`${this.player.name}이(가) 쓰러졌다...`);
    } else {
      this.turn = 'player';
    }
  }

  // 데미지 계산
  calculateDamage(attacker, defender, skill) {
    const levelFactor = (2 * attacker.level / 5 + 2);
    const attackDefense = attacker.attack / defender.defense;
    const baseDamage = levelFactor * attackDefense * skill.power + 2;
    const randomFactor = 0.85 + Math.random() * 0.15;

    // 타입 상성 보너스 (간소화)
    let typeBonus = 1;
    // if (skill.type > defender.type) typeBonus = 1.5;

    return Math.floor(baseDamage * randomFactor * typeBonus);
  }

  // 스킬 효과 적용
  applyEffect(user, target, effect) {
    switch(effect) {
      case 'burn':
        this.log.push(`${target.name}이(가) 화상을 입었다!`);
        break;
      case 'heal':
        const healAmount = Math.floor(user.maxHp * 0.3);
        user.hp = Math.min(user.maxHp, user.hp + healAmount);
        this.log.push(`${user.name}의 HP가 ${healAmount} 회복되었다!`);
        break;
      case 'buff':
        user.attack = Math.floor(user.attack * 1.2);
        this.log.push(`${user.name}의 공격력이 올라갔다!`);
        break;
    }
  }

  // 경험치 획득
  giveExp() {
    const baseExp = this.monster.level * 50;
    const expGain = Math.floor(baseExp * (1 + this.player.level / 10));

    this.player.exp += expGain;
    this.log.push(`${this.player.name}이(가) ${expGain} 경험치를 얻었다!`);

    // 레벨업 확인
    while (this.player.exp >= this.player.maxExp) {
      this.levelUp();
    }
  }

  // 레벨업
  levelUp() {
    this.player.level++;
    this.player.exp -= this.player.maxExp;
    this.player.maxExp = Math.floor(this.player.maxExp * 1.5);

    // 능력치 성장
    const hpGain = 10 + Math.floor(Math.random() * 5);
    const atkGain = 3 + Math.floor(Math.random() * 2);
    const defGain = 2 + Math.floor(Math.random() * 2);

    this.player.maxHp += hpGain;
    this.player.hp = this.player.maxHp;
    this.player.attack += atkGain;
    this.player.defense += defGain;

    this.log.push(`${this.player.name}이(가) 레벨 ${this.player.level}이(가) 되었다!`);
    this.log.push(`HP +${hpGain}, 공격력 +${atkGain}, 방어력 +${defGain}`);
  }

  // 도주
  flee() {
    if (Math.random() < 0.7) {
      this.state = 'flee';
      this.log.push('도주에 성공했다!');
      return true;
    } else {
      this.log.push('도주에 실패했다!');
      this.turn = 'monster';
      setTimeout(() => this.monsterAttack(), 1000);
      return false;
    }
  }
}

// monster.js - 몬스터 데이터
const MONSTER_DATA = [
  {
    id: 'slime',
    name: '슬라임',
    baseHp: 30,
    baseAtk: 8,
    baseDef: 5,
    skills: [
      {id: 'tackle', name: '몸통박치기', type: 'attack', power: 40, accuracy: 100, pp: 35}
    ],
    expGain: 20
  },
  {
    id: 'goblin',
    name: '고블린',
    baseHp: 45,
    baseAtk: 12,
    baseDef: 8,
    skills: [
      {id: 'tackle', name: '몸통박치기', type: 'attack', power: 40, accuracy: 100, pp: 35},
      {id: 'scratch', name: '할퀴기', type: 'attack', power: 55, accuracy: 100, pp: 25}
    ],
    expGain: 35
  },
  {
    id: 'dragon',
    name: '어린 드래곤',
    baseHp: 80,
    baseAtk: 20,
    baseDef: 15,
    skills: [
      {id: 'scratch', name: '할퀴기', type: 'attack', power: 55, accuracy: 100, pp: 25},
      {id: 'ember', name: '불꽃', type: 'attack', power: 70, accuracy: 90, pp: 15},
      {id: 'growl', name: '울음소리', type: 'buff', power: 0, accuracy: 100, pp: 20}
    ],
    expGain: 80
  }
];
```

</details>

<details>
<summary>📁 팀원 C: 대화 및 퀘스트 시스템 코드</summary>

```javascript
// dialog.js - 대화 시스템
class DialogSystem {
  constructor() {
    this.dialogQueue = [];
    this.currentDialog = null;
    this.isShowing = false;
    this.onComplete = null;
  }

  // 대화 표시
  showDialog(dialog, onComplete) {
    this.dialogQueue = Array.isArray(dialog) ? dialog : [dialog];
    this.onComplete = onComplete;
    this.isShowing = true;
    this.showNext();
  }

  // 다음 대화 표시
  showNext() {
    if (this.dialogQueue.length === 0) {
      this.isShowing = false;
      if (this.onComplete) this.onComplete();
      return;
    }

    this.currentDialog = this.dialogQueue.shift();

    // 특수 대화 타입 처리
    if (typeof this.currentDialog === 'function') {
      this.currentDialog();
      this.showNext();
      return;
    }

    this.renderDialog();
  }

  // 대화 상자 렌더링
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

    // 타이핑 효과
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

    // 선택지가 있으면 표시
    this.renderChoices();
  }

  // 선택지 렌더링
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

  // 다음
  next() {
    if (this.currentDialog && this.currentDialog.choices) return; // 선택지가 있으면 반드시 선택해야 함
    this.showNext();
  }
}

// 퀘스트 시스템
class QuestSystem {
  constructor() {
    this.quests = {};
    this.activeQuests = [];
    this.completedQuests = [];
  }

  // 퀘스트 수락
  acceptQuest(questId) {
    if (this.completedQuests.includes(questId)) return false;
    if (this.activeQuests.includes(questId)) return false;

    this.activeQuests.push(questId);
    return true;
  }

  // 퀘스트 진행 상황 업데이트
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

  // 퀘스트 완료 확인
  checkCompletion(questId) {
    const quest = this.quests[questId];
    if (!quest) return;

    const allComplete = quest.objectives.every(obj => obj.completed);
    if (allComplete) {
      this.completeQuest(questId);
    }
  }

  // 퀘스트 완료
  completeQuest(questId) {
    const index = this.activeQuests.indexOf(questId);
    if (index > -1) {
      this.activeQuests.splice(index, 1);
      this.completedQuests.push(questId);

      // 보상 지급
      const quest = this.quests[questId];
      this.giveRewards(quest.rewards);
    }
  }

  // 보상 지급
  giveRewards(rewards) {
    if (rewards.exp) player.gainExp(rewards.exp);
    if (rewards.gold) player.gold += rewards.gold;
    if (rewards.items) rewards.items.forEach(item => player.addItem(item));
  }
}

// dialogues.js - 대화 스크립트 예제
const DIALOGUES = {
  villageChief: {
    firstMeeting: [
      {speaker: '촌장', text: '오, 모험가... 드디어 왔구나.'},
      {speaker: '촌장', text: '요즘 마을 근처에 야생 몬스터가 많이 나타나서 다들 겁에 질려 있단다.'},
      {speaker: '촌장', text: '쫓아내는 것을 도와준다면 정말 감사하겠다!'},
      {
        choices: [
          {text: '네, 이 퀘스트를 받겠습니다', dialog: () => {
            quests.acceptQuest('defeatMonsters');
            return [
              {speaker: '촌장', text: '훌륭하다! 북쪽의 슬라임 3마리를 물리쳐 주게.'},
              {speaker: '시스템', text: '퀘스트 [슬라임 쫓아내기]를 수락했습니다!'}
            ];
          }},
          {text: '지금은 좀 바쁜데요', dialog: [
            {speaker: '촌장', text: '알겠다. 준비되면 다시 오게나.'}
          ]}
        ]
      }
    ],
    afterQuest: [
      {speaker: '촌장', text: '정말 해냈구나! 정말 감사하다!'},
      {speaker: '시스템', text: '퀘스트 [슬라임 쫓아내기] 완료! 100 경험치를 얻었습니다!'},
      {speaker: '촌장', text: '이것을 받아주게. 내 작은 성의야.'}
    ]
  },

  shopkeeper: [
    {speaker: '상점 주인', text: '어서 오세요! 뭘 찾으시나요?'},
    {
      choices: [
        {text: '상품 둘러보기', dialog: () => {
          game.openShop();
          return [{speaker: '상점 주인', text: '마음에 드는 걸로 골라주세요!'}];
        }},
        {text: '나가기', dialog: [{speaker: '상점 주인', text: '다음에 또 오세요!'}]}
      ]
    }
  ]
};
```

</details>

<details>
<summary>📁 팀원 D: 2D 맵 렌더링 시스템 코드</summary>

```javascript
// map.js - 맵 렌더링 시스템
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

  // 맵 로드
  loadMap(mapData) {
    this.currentMap = mapData;
    this.npcs = mapData.npcs || [];
    this.updateCamera();
  }

  // 맵 렌더링
  render() {
    if (!this.currentMap) return;

    // 캔버스 지우기
    this.ctx.fillStyle = '#000';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // 컨텍스트 저장
    this.ctx.save();

    // 카메라 오프셋 적용
    this.ctx.translate(-this.camera.x, -this.camera.y);

    // 맵 레이어 렌더링
    this.renderLayers();

    // NPC 렌더링
    this.renderNPCs();

    // 플레이어 렌더링
    this.renderPlayer();

    // 컨텍스트 복원
    this.ctx.restore();
  }

  // 맵 레이어 렌더링
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

  // 단일 타일 렌더링
  renderTile(x, y, tileId) {
    // 타일 ID에 따라 다른 타일 그리기
    const tileType = this.getTileType(tileId);

    switch(tileType) {
      case 'grass':
        this.ctx.fillStyle = '#4a8f4a';
        this.ctx.fillRect(x, y, this.tileSize, this.tileSize);
        // 풀 텍스처
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
        // 물결 효과
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
        // 지붕
        this.ctx.fillStyle = '#8b4513';
        this.ctx.beginPath();
        this.ctx.moveTo(x, y);
        this.ctx.lineTo(x + this.tileSize / 2, y - 10);
        this.ctx.lineTo(x + this.tileSize, y);
        this.ctx.fill();
        break;
    }
  }

  // 타일 타입 가져오기
  getTileType(tileId) {
    const types = {
      1: 'grass', 2: 'water', 3: 'wall', 4: 'path', 5: 'house'
    };
    return types[tileId] || 'grass';
  }

  // NPC 렌더링
  renderNPCs() {
    this.npcs.forEach(npc => {
      const x = npc.x * this.tileSize;
      const y = npc.y * this.tileSize;

      // NPC 그리기
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

      // 이름 그리기
      this.ctx.fillStyle = '#fff';
      this.ctx.font = '10px Arial';
      this.ctx.textAlign = 'center';
      this.ctx.fillText(npc.name, x + this.tileSize / 2, y - 5);
    });
  }

  // 플레이어 렌더링
  renderPlayer() {
    if (!this.player) return;

    const x = this.player.x * this.tileSize;
    const y = this.player.y * this.tileSize;

    // 플레이어 몸체
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

    // 플레이어 방향 표시
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

  // 카메라 위치 업데이트
  updateCamera() {
    if (!this.player) return;

    // 카메라가 플레이어를 따라가며 중앙에 유지
    const targetX = this.player.x * this.tileSize - this.canvas.width / 2;
    const targetY = this.player.y * this.tileSize - this.canvas.height / 2;

    // 부드러운 이동
    this.camera.x += (targetX - this.camera.x) * 0.1;
    this.camera.y += (targetY - this.camera.y) * 0.1;

    // 카메라가 맵 경계를 벗어나지 않도록 방지
    const maxX = this.currentMap.width * this.tileSize - this.canvas.width;
    const maxY = this.currentMap.height * this.tileSize - this.canvas.height;
    this.camera.x = Math.max(0, Math.min(this.camera.x, maxX));
    this.camera.y = Math.max(0, Math.min(this.camera.y, maxY));
  }

  // 충돌 확인
  checkCollision(x, y) {
    // 맵 경계 확인
    if (x < 0 || x >= this.currentMap.width || y < 0 || y >= this.currentMap.height) {
      return true;
    }

    // 타일 충돌 확인
    const tileId = this.currentMap.layers[0].data[y * this.currentMap.width + x];
    const solidTiles = [3, 5]; // 벽과 집은 장애물

    if (solidTiles.includes(tileId)) {
      return true;
    }

    // NPC 충돌 확인
    for (const npc of this.npcs) {
      if (npc.x === x && npc.y === y) {
        // NPC 대화 트리거
        this.triggerNPC(npc);
        return true;
      }
    }

    return false;
  }

  // NPC 대화 트리거
  triggerNPC(npc) {
    if (npc.dialogue) {
      game.dialogSystem.showDialog(npc.dialogue);
    }
  }
}

// 예제 맵 데이터
const VILLAGE_MAP = {
  name: '시작 마을',
  width: 20,
  height: 15,
  layers: [
    {
      name: 'ground',
      data: [
        // 맵 데이터 (간소화)
        1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
        1,4,4,4,1,1,5,5,5,1,1,4,4,4,4,1,1,1,1,1,
        1,4,1,4,1,1,5,5,5,1,1,4,1,1,4,1,1,1,1,1,
        1,4,4,4,1,1,1,1,1,1,1,4,4,4,4,1,2,2,1,1,
        1,1,1,1,1,1,4,4,4,1,1,1,1,1,1,1,2,2,1,1,
        1,4,4,4,1,1,4,4,4,1,1,1,1,1,1,1,2,2,1,1,
        1,4,1,4,1,1,1,1,1,1,1,4,4,4,1,1,1,1,1,1,
        1,4,4,4,1,1,1,1,1,1,1,4,1,1,4,1,1,1,1,1,
        // ... 더 많은 맵 데이터
      ]
    }
  ],
  npcs: [
    {
      id: 'village_chief',
      name: '촌장',
      x: 5,
      y: 5,
      color: '#ffd93d',
      dialogue: DIALOGUES.villageChief.firstMeeting,
      direction: 'DOWN'
    },
    {
      id: 'shopkeeper',
      name: '상점 주인',
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
<summary>📁 팀원 E: 전투 UI 코드</summary>

```html
<!-- 전투 화면 HTML -->
<div id="battleScreen" class="screen hidden">
  <!-- 적 영역 -->
  <div class="enemy-area">
    <div class="monster-sprite">
      <canvas id="monsterSprite" width="128" height="128"></canvas>
    </div>
    <div class="monster-info">
      <div class="name" id="enemyName">슬라임</div>
      <div class="level">Lv. <span id="enemyLevel">3</span></div>
      <div class="hp-bar">
        <div class="hp-fill" id="enemyHpBar" style="width: 100%"></div>
      </div>
      <div class="hp-text">
        <span id="enemyHp">30</span> / <span id="enemyMaxHp">30</span>
      </div>
    </div>
  </div>

  <!-- 플레이어 영역 -->
  <div class="player-area">
    <div class="player-info">
      <div class="name" id="playerName">용사</div>
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

  <!-- 전투 메뉴 -->
  <div class="battle-menu" id="battleMenu">
    <div class="menu-row">
      <button class="menu-btn" data-action="attack">공격</button>
      <button class="menu-btn" data-action="skills">스킬</button>
      <button class="menu-btn" data-action="items">아이템</button>
      <button class="menu-btn" data-action="flee">도주</button>
    </div>
  </div>

  <!-- 스킬 서브메뉴 -->
  <div class="submenu hidden" id="skillsMenu">
    <div class="submenu-title">스킬 선택</div>
    <div class="submenu-list" id="skillsList"></div>
    <button class="back-btn" onclick="hideSubmenu()">뒤로</button>
  </div>

  <!-- 전투 로그 -->
  <div class="battle-log">
    <div id="battleLog"></div>
  </div>
</div>
```

```css
/* battle.css - 전투 화면 스타일 */
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

/* 피격 애니메이션 */
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  75% { transform: translateX(5px); }
}

.shake {
  animation: shake 0.3s ease-in-out;
}

/* 공격 애니메이션 */
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
<summary>📁 오디오 시스템 코드</summary>

```javascript
// audio.js - 오디오 시스템
class AudioManager {
  constructor() {
    this.audioContext = null;
    this.sounds = {};
    this.musicVolume = 0.3;
    this.sfxVolume = 0.5;
    this.currentBgm = null;
  }

  // 오디오 컨텍스트 초기화
  init() {
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (this.audioContext.state === 'suspended') {
      this.audioContext.resume();
    }
  }

  // 배경 음악 재생
  playBgm(bgmName) {
    if (this.currentBgm === bgmName) return;

    this.stopBgm();

    // 오실레이터로 간단한 BGM 생성
    this.currentBgm = bgmName;
    this.playGeneratedBgm(bgmName);
  }

  // 간단한 배경 음악 생성
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

  // 배경 음악 정지
  stopBgm() {
    this.currentBgm = null;
  }

  // 효과음 재생
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

  // 공격 효과음
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

  // 피격 효과음
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

  // 승리 효과음
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

  // 레벨업 효과음
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

  // 대화 효과음
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

**멤버 간 협업 대화**:

```
팀원 B → 팀원 C:
"전투 시스템이 완성됐어. 플레이어가 승리하면 giveExp()를 호출해서 레벨업해.
퀘스트 시스템 확인해 주고, 레벨업 데이터가 올바르게 저장되는지 확인해 줘."

팀원 C → 팀원 B:
"알겠어. 퀘스트 시스템은 localStorage로 게임 데이터를 저장해.
레벨, 경험치, 완료된 퀘스트 목록이 포함돼. 자동 저장 메커니즘을 추가할게."

팀원 D → 전체:
"맵 렌더링 시스템이 완성됐고, NPC 방향 데이터가 대화 시스템에 연결됐어.
플레이어가 NPC를 향하면 대화가 자동으로 트리거돼. 대화 시스템의 트리거 로직을 확인해 줘."

팀원 C → 팀원 D:
"확인했어. DialogSystem에 showDialog() 메서드가 있어서 대화 배열을 받을 수 있어.
모든 NPC 대화 데이터가 그 형식을 따르도록 할게."

팀원 E → 팀원 B:
"전투 UI가 완성됐는데, HP 바를 업데이트하려면 실시간 플레이어와 몬스터 데이터가 필요해.
전투 시스템에 콜백이 있어?"

팀원 B → 팀원 E:
"있어. BattleSystem에 onUpdate 콜백이 있어서 매 턴 끝에 실행돼.
그 콜백을 등록해서 UI를 업데이트하면 돼."

팀원 E → 팀원 D:
"맵을 전환할 때 카메라를 다시 위치시켜야 해.
MapRenderer에 updateCamera() 메서드가 있어?"

팀원 D → 팀원 E:
"있어. loadMap() 후에 updateCamera()가 자동으로 호출돼.
플레이어가 이동한 후 수동으로 호출해서 카메라를 부드럽게 업데이트할 수도 있어."
```

**3단계: 통합 및 테스트**

모든 컴포넌트가 완성되면 팀 리드가 통합을 담당합니다:

<details>
<summary>📁 메인 게임 컨트롤러 코드</summary>

```javascript
// game.js - 메인 게임 컨트롤러
class Game {
  constructor() {
    this.state = 'map'; // map, battle, dialog, menu
    this.canvas = document.getElementById('gameCanvas');
    this.ctx = this.canvas.getContext('2d');

    // 각 시스템 초기화
    this.player = this.createPlayer();
    this.mapRenderer = new MapRenderer(this.canvas);
    this.battleSystem = null;
    this.dialogSystem = new DialogSystem();
    this.questSystem = new QuestSystem();
    this.audioManager = new AudioManager();

    // 맵 로드
    this.currentMapId = 'village';
    this.mapRenderer.loadMap(VILLAGE_MAP);
    this.mapRenderer.player = this.player;

    // 입력 처리 설정
    this.setupInput();

    // 게임 루프 시작
    this.lastTime = 0;
    this.gameLoop = this.gameLoop.bind(this);
    requestAnimationFrame(this.gameLoop);

    // 자동 저장 로드
    this.loadGame();
  }

  // 플레이어 생성
  createPlayer() {
    return {
      name: '용사',
      level: 1,
      exp: 0,
      maxExp: 100,
      hp: 50,
      maxHp: 50,
      attack: 15,
      defense: 10,
      skills: [
        {id: 'tackle', name: '몸통박치기', type: 'attack', power: 40, accuracy: 100, pp: 35}
      ],
      x: 10,
      y: 7,
      direction: 'DOWN',
      gold: 100,
      items: ['potion', 'potion', 'antidote']
    };
  }

  // 입력 처리 설정
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

  // 맵 입력 처리
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

      // 랜덤 전투 확인
      if (Math.random() < 0.05) {
        this.startBattle();
      }

      // 게임 저장
      this.saveGame();
    }
  }

  // 대화 입력 처리
  handleDialogInput(e) {
    if (e.key === ' ' || e.key === 'Enter') {
      this.dialogSystem.next();
      if (!this.dialogSystem.isShowing) {
        this.state = 'map';
      }
    }
  }

  // 전투 입력 처리
  handleBattleInput(e) {
    if (!this.battleSystem) return;
    if (this.battleSystem.turn !== 'player') return;
  }

  // 전투 시작
  startBattle(monsterData) {
    // 랜덤 몬스터 선택
    const randomMonster = MONSTER_DATA[Math.floor(Math.random() * MONSTER_DATA.length)];

    // 몬스터 인스턴스 생성
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

    // 전투 음악 재생
    this.audioManager.playBgm('battle');

    // 전투 화면 표시
    document.getElementById('battleScreen').classList.remove('hidden');
    document.getElementById('mapScreen').classList.add('hidden');

    // 전투 UI 업데이트
    this.updateBattleUI();
  }

  // 전투 UI 업데이트
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

    // 전투 로그 업데이트
    const logEl = document.getElementById('battleLog');
    this.battleSystem.log.forEach(log => {
      const entry = document.createElement('div');
      entry.className = 'log-entry';
      entry.textContent = log;
      logEl.appendChild(entry);
    });
    logEl.scrollTop = logEl.scrollHeight;
  }

  // 전투 종료
  endBattle() {
    this.state = 'map';
    this.battleSystem = null;

    // 전투 화면 숨기기
    document.getElementById('battleScreen').classList.add('hidden');
    document.getElementById('mapScreen').classList.remove('hidden');

    // 맵 음악 재생
    this.audioManager.playBgm('village');

    // 게임 저장
    this.saveGame();
  }

  // 게임 저장
  saveGame() {
    const saveData = {
      player: this.player,
      currentMapId: this.currentMapId,
      completedQuests: this.questSystem.completedQuests,
      timestamp: Date.now()
    };

    localStorage.setItem('rpgSave', JSON.stringify(saveData));
  }

  // 게임 로드
  loadGame() {
    const saveData = localStorage.getItem('rpgSave');
    if (saveData) {
      const data = JSON.parse(saveData);
      this.player = {...this.player, ...data.player};
      this.questSystem.completedQuests = data.completedQuests || [];
      this.currentMapId = data.currentMapId || 'village';
    }
  }

  // 메인 게임 루프
  gameLoop(timestamp) {
    const deltaTime = timestamp - this.lastTime;
    this.lastTime = timestamp;

    // 캔버스 지우기
    this.ctx.fillStyle = '#000';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // 상태에 따라 렌더링
    if (this.state === 'map') {
      this.mapRenderer.render();
    }

    requestAnimationFrame(this.gameLoop);
  }
}

// 게임 시작
window.addEventListener('DOMContentLoaded', () => {
  window.game = new Game();
});
```

</details>

**최종 결과**:

약 1~2시간 후에 완전히 작동하는 포켓몬 스타일 RPG가 완성됩니다!

```
프로젝트 요약:
✅ 게임 아키텍처 설계 - 팀원 A
✅ 턴제 전투 시스템 - 팀원 B
✅ 대화 및 퀘스트 시스템 - 팀원 C
✅ 2D 맵 렌더링 - 팀원 D
✅ UI 및 사운드 효과 - 팀원 E

프로젝트 파일:
├── index.html (120줄)
├── css/
│   ├── main.css (100줄)
│   ├── battle.css (180줄)
│   └── dialog.css (80줄)
├── js/
│   ├── game.js (250줄)
│   ├── state.js (60줄)
│   ├── player.js (50줄)
│   ├── monster.js (80줄)
│   ├── battle.js (220줄)
│   ├── dialog.js (180줄)
│   ├── map.js (280줄)
│   └── audio.js (150줄)
└── data/
    ├── monsters.js (100줄)
    ├── skills.js (80줄)
    └── dialogues.js (120줄)

총계: 약 2050줄의 코드, 5명의 AI 팀원이 협업하여 완성!

게임 기능:
🎮 턴제 전투 시스템 (공격, 스킬, 아이템, 도주)
💬 NPC 대화 시스템 (타이핑 효과, 분기 선택지)
📜 퀘스트 시스템 (퀘스트 수락, 진행 상황 업데이트, 완료 보상)
🗺️ 2D 맵 탐험 (다중 장면 전환, NPC 상호작용)
💾 자동 저장 (localStorage로 진행 상황 저장)
🔊 사운드 효과 및 BGM (Web Audio API)
📊 캐릭터 성장 (경험치, 레벨업, 능력치 향상)
```

**팀 작업 관찰하기**:

tmux 분할 창 모드를 설정했다면, 여러 터미널 창이 동시에 작업하는 것을 볼 수 있습니다:

```
┌─────────────────┬─────────────────┬─────────────────┐
│  팀원 B         │  팀원 C         │  팀원 D         │
│  데미지 공식    │  대화 스크립트  │  타일 렌더링    │
│  구현 중        │  작성 중        │  중             │
│                 │                 │                 │
│  "팀원 E,       │  "MapRenderer   │  "몬스터에게    │
│   HP 바 너비가  │   준비됐어?"    │   공격 애니메이션│
│   퍼센테이지야?"│                 │   이 필요해..." │
└─────────────────┴─────────────────┴─────────────────┘
```

**핵심 요점**:

이 실습 예제는 Agent Teams의 여러 핵심 장점을 보여줍니다:

1. **진정한 병렬 개발**: 5명의 멤버가 동시에 다른 게임 시스템을 개발
2. **복잡한 프로젝트 관리**: 2000+ 줄의 코드가 구조화된 방식으로 분할되고 통합됨
3. **전문적인 분업**: 전투, 대화, 맵, UI에 각각 전담자가 있음
4. **인터페이스 조정**: 멤버들이 메시징 시스템을 통해 인터페이스와 데이터 형식을 협상
5. **빠른 납품**: 한 사람이 몇 주가 걸릴 작업을 팀이 몇 시간 만에 완성

이 게임을 직접 실행해 보고, AI 팀이 어떻게 협업하여 포켓몬 스타일 RPG를 만드는지 경험해 보세요.

---

### 단일 프롬프트 vs Agent Teams: 직접 테스트해 보기

Agent Teams의 강력함을 더 직접적으로 느낄 수 있도록, 직접 시도해 보고 비교할 수 있는 두 가지 테스트 계획을 준비했습니다.

#### 테스트 계획 A: 단일 프롬프트 방식

이것은 전통적인 방식입니다: 하나의 완전한 프롬프트를 사용하여 AI에게 게임 개발을 요청합니다.

**Claude Code에 입력**:

```
포켓몬 스타일의 웹 RPG 게임을 만들어 줘. 다음 기능을 포함해:
- 캐릭터 시스템 (레벨, HP, 공격력, 방어력)
- 턴제 전투 시스템 (공격, 스킬, 아이템, 도주)
- NPC 대화 시스템
- 2D 맵 탐험
- 저장 시스템
- 오디오 시스템

React + TypeScript + Vite + Tailwind CSS를 사용해.
바로 실행할 수 있는 완전한 코드를 줘.
```

**예상 결과**:

| 항목 | 예상 상황 |
|------|---------|
| **코드 품질** | AI가 모든 코드를 생성하려고 하지만, 컨텍스트 제한으로 인해 많은 세부 사항이 생략되거나 주석으로 대체됨 |
| **기능 완성도** | 핵심 기능은 있을 수 있지만, 많은 고급 기능이 누락되거나 단순화됨 |
| **실행 가능성** | 버그가 있을 수 있으며, 실행되기까지 여러 라운드의 디버깅이 필요할 수 있음 |
| **개발 시간** | 한 번의 대화에 30~60분이 소요될 수 있으며, 여러 번의 왕복이 필요함 |
| **코드량** | 약 500~800줄, AI가 코드를 압축하는 경향이 있기 때문 |

**직면할 수 있는 문제**:

1. **코드가 잘림**: AI 응답에 길이 제한이 있어 생성이 중간에 멈출 수 있음
2. **불완전한 기능**: 대화 시스템이 기본 버전만 있고 퀘스트 시스템이 없을 수 있음
3. **세부 사항 누락**: 오디오 시스템이 TODO 주석으로 남겨질 수 있음
4. **디버깅 어려움**: 코드에 문제가 있으면 같은 대화에서 AI에게 수정을 요청해야 하며, 컨텍스트가 점점 혼란스러워짐

#### 테스트 계획 B: Agent Teams 방식

이것은 이 글에서 소개하는 방식입니다: 여러 AI 팀원이 협업하여 개발하게 합니다.

**Claude Code에 입력** (Agent Teams 활성화 후):

```
포켓몬 스타일의 웹 RPG 게임을 만들고 싶습니다.

협업 개발을 위한 팀을 만들어 주세요:

팀원 역할:
- 팀원 A (게임 아키텍트): 전체 아키텍처 설계, 게임 상태 머신 정의, 데이터 구조 계획
- 팀원 B (전투 시스템): 턴제 전투 로직, 스킬 시스템, 데미지 계산 구현
- 팀원 C (대화 시스템): NPC 대화, 퀘스트 시스템, 스토리 스크립트 구현
- 팀원 D (맵 렌더링): Canvas를 사용한 2D 맵 렌더링, 캐릭터 이동, 장면 전환 구현
- 팀원 E (UI 및 오디오): 게임 인터페이스, 전투 UI, 사운드 재생 설계

기술 요구사항:
- 순수 HTML/CSS/JavaScript 사용
- Canvas로 게임 화면 렌더링
- 턴제 전투 시스템
- localStorage로 데이터 저장
- Web Audio API로 사운드 처리

각 멤버는 Sonnet을 사용하고, 팀 리드는 Opus을 사용하세요.

먼저 아키텍트에게 전체 솔루션을 설계해 달라고 하세요. 데이터 구조가 정의된 후 다른 멤버들이 병렬로 개발하게 하세요.
```

**예상 결과**:

| 항목 | 예상 상황 |
|------|---------|
| **코드 품질** | 각 멤버가 자신의 분야에 집중하므로 코드가 더 전문적이고 완전함 |
| **기능 완성도** | 모든 기능이 더 완전하게 구현됨, 퀘스트 시스템과 다중 장면 맵 포함 |
| **실행 가능성** | 멤버들이 서로 인터페이스를 교차 검증하므로 통합 문제가 적음 |
| **개발 시간** | 개발이 병렬로 진행되므로 약 1~2시간 내에 모든 기능 완성 |
| **코드량** | 약 2000+ 줄, 압축된 코드가 아닌 완전한 구현 |

#### 정량적 비교 표

| 차원 | 단일 프롬프트 | Agent Teams |
|---------|-------------|-------------|
| **총 코드 줄 수** | 500-800줄 | 2000+ 줄 |
| **개발 시간** | 30-60분, 하지만 기능 불완전 | 1-2시간, 기능 완전 |
| **기능 완성도** | 60-70% | 95%+ |
| **유지 보수성** | 보통, 보통 하나의 큰 파일 | 높음, 모듈식 설계 |
| **버그 수** | 더 많음, 검증이 적어서 | 더 적음, 멤버들이 교차 검증 |
| **향후 확장성** | 어려움, 코드가 강하게 결합됨 | 더 쉬움, 구조가 모듈식 |
| **토큰 사용량** | ~50K 토큰 | ~200K 토큰 (5명 멤버) |
| **비용** | ~$0.50 | ~$2.00 |

#### 권장 실제 테스트 프로세스

**1단계: 먼저 단일 프롬프트 방식 테스트**

```
1. 새 Claude Code 대화 열기
2. 위 "테스트 계획 A"의 프롬프트 사용
3. 기록: 얼마나 걸렸나요? 몇 줄의 코드가 생성되었나요? 어떤 기능이 누락되었나요?
```

**2단계: 그 다음 Agent Teams 방식 테스트**

```
1. Agent Teams가 활성화되었는지 확인
2. 위 "테스트 계획 B"의 프롬프트 사용
3. 관찰: 팀원들이 어떻게 협업하나요? 코드가 더 완전한가요?
```

**3단계: 두 결과 비교**

```
1. 두 버전의 코드를 각각 실행
2. 기능 목록 비교: 단일 프롬프트 버전에서 어떤 기능이 누락되었나요?
3. 코드 구조 비교: Agent Teams 버전이 더 모듈식인가요?
4. 평가: 이 게임을 계속 개발하고 싶다면, 어느 버전이 더 확장하기 쉬운가요?
```

#### 왜 이런 차이가 발생할까요?

**단일 프롬프트 방식의 한계**:

1. **컨텍스트 압력**: AI가 단일 응답에서 모든 것을 처리해야 하므로 단순화가 불가피함
2. **분산된 주의력**: 전투, 대화, 맵, UI가 주의력을 다투어 세부 사항이 쉽게 누락됨
3. **협업 검증 없음**: 인터페이스가 일치하는지 확인하는 사람이 없어 버그가 더 쉽게 발생함

**Agent Teams의 장점**:

1. **전문적 분업**: 각 멤버가 한 분야에 집중하여 세부 사항까지 깊이 들어갈 수 있음
2. **병렬 처리**: 전투, 대화, 맵 개발이 동시에 진행되어 효율성 향상
3. **상호 검증**: 멤버들이 서로 인터페이스를 협상하여 통합 문제 감소
4. **독립적인 컨텍스트**: 각 멤버가 자신만의 200K 컨텍스트를 가지어 서로 간섭하지 않음

#### 결론

Agent Teams의 핵심 가치는 단순히 "더 빠르다"는 것이 아니라 **"더 완전하고 더 전문적"**이라는 것입니다.

- 뱀 게임 같은 간단한 프로젝트에는 단일 프롬프트로 충분합니다
- 포켓몬 RPG 같은 복잡한 프로젝트에는 Agent Teams가 더 나은 결과를 낼 수 있습니다

핵심은 **올바른 도구를 선택하는 것**입니다: 변수 이름을 바꾸는 데 Agent Teams를 사용하지 말고, 완전한 RPG 게임을 만드는 데 단일 프롬프트를 사용하지 마세요.

---

## 모범 사례

Agent Teams는 강력한 도구이지만, 잘 사용하려면 몇 가지 모범 사례를 이해해야 합니다. 이러한 교훈은 커뮤니티의 실제 경험에서 나온 것으로, 일반적인 함정을 피하면서 팀 협업에서 최대 가치를 얻는 데 도움이 됩니다.

### 사례 1: 계약 우선

여러 Agent가 병렬로 작업을 시작하기 전에 시간을 들여 명확한 "계약", 즉 인터페이스 합의를 정의하세요.

**왜 중요한가**:

팀원 A가 백엔드 API를 담당하고 팀원 B가 프론트엔드 통합을 담당한다고 가정해 봅시다. 인터페이스 형식을 먼저 합의하지 않고 동시에 시작하면 이런 일이 발생할 수 있습니다:

```
팀원 A: POST /api/login을 구현하고 {username, password}를 기대함
팀원 B: 프론트엔드 호출을 구현하고 {user, pass}를 전송함
결과: 일치하지 않아 재작업이 필요함
```

**방법**:

팀을 시작하기 전에 먼저 Claude에게 인터페이스를 설계해 달라고 요청하세요:

```
아직 개발을 시작하지 마. 먼저 사용자 인증 시스템의 인터페이스를 설계해 줘:

1. 로그인 인터페이스의 요청 및 응답 형식
2. 회원가입 인터페이스의 요청 및 응답 형식
3. 비밀번호 재설정 흐름 및 인터페이스
4. 오류 처리 규칙

이 인터페이스들을 명확하게 작성한 다음 팀이 개발을 시작하게 해 줘.
```

**계약에 포함되어야 할 내용**:

- 함수 서명 및 데이터 구조
- 입력 및 출력 JSON 형식
- HTTP 상태 코드의 의미
- 오류 처리 규칙
- 필드 유효성 검사 규칙

### 사례 2: 모델을 현명하게 할당

다른 작업에는 다른 모델이 필요합니다. 좋은 모델 할당은 품질과 비용의 균형을 맞추는 데 도움이 됩니다.

**팀 리드에 Opus 사용**:

팀 리드는 작업 분해와 결과 종합을 처리하며, 더 강한 추론 능력이 필요하므로 Opus를 권장합니다:

```
팀을 만들어 줘. 팀 리드는 전체 계획과 최종 검토에 Opus를 사용하고.
팀원들은 구현 작업에 Sonnet을 사용해.
```

**팀원에 Sonnet 사용**:

구체적인 코딩 및 테스트 작업에는 Sonnet이 완전히 충분하며 비용이 현저히 낮습니다:

- Opus 4.6: 백만 출력 토큰당 약 $15
- Sonnet 4.5: 백만 출력 토큰당 약 $3

멤버에 Sonnet을 사용하면 전체 비용을 크게 줄일 수 있습니다.

**특수한 경우에 Haiku 사용**:

문서 업데이트나 작은 테스트 작성 작업 같은 간단한 작업에는 Haiku를 고려할 수 있습니다. 백만 출력 토큰당 약 $0.80입니다.

### 사례 3: 작업 세분성 제어

너무 크거나 너무 작은 작업은 모두 효율성을 해칩니다. 적절한 세분성을 찾아야 합니다.

**경험 법칙**:

각 작업은 한 명의 멤버가 **15~30분** 내에 독립적으로 완료할 수 있는 것이어야 합니다.

**작업이 너무 큰 경우**:

```
나쁜 예: 사용자 인증 시스템 구현
```

이 작업은 너무 광범위합니다. 여러 하위 작업을 포함하고 있어 한 사람이 완성하는 데 오랜 시간이 걸리며, 병렬성의 장점을 잃게 됩니다.

**작업이 너무 작은 경우**:

```
나쁜 예: auth.js라는 빈 파일 만들기
```

이 작업은 너무 작습니다. 멤버가 실제 작업보다 조정에 더 많은 시간을 소비하게 됩니다.

**적절한 세분성**:

```
좋은 예: 로그인 API 구현, 포함:
1. POST /api/login 엔드포인트
2. 사용자 이름 및 비밀번호 유효성 검사
3. JWT 토큰 응답
4. 오류 처리
```

이 작업은 명확한 경계와 산출물이 있습니다. 한 사람이 독립적으로 완성할 수 있고, 지나치게 분절화되지 않았습니다.

**권장 설정**:

각 멤버에게 **5~6개의 중간 규모 작업**을 맡기세요. 이렇게 하면 충분한 병렬성을 제공하면서도 조정 비용이 너무 높아지지 않습니다.

### 사례 4: 파일 충돌 방지

여러 멤버가 같은 파일을 동시에 수정하는 것이 Agent Teams에서 가장 흔한 문제입니다.

**할당 원칙**:

가능한 한 다른 멤버가 **다른 파일**을 담당하도록 하세요:

```
좋은 예:
- 팀원 A: src/auth/ 아래의 모든 파일 담당
- 팀원 B: src/api/ 아래의 모든 파일 담당
- 팀원 C: tests/auth/ 아래의 모든 파일 담당

나쁜 예:
- 팀원 A와 팀원 B가 모두 src/app.js를 수정
```

**같은 파일을 수정해야 하는 경우**:

순차 편집 단계를 설계하세요:

```
1단계 (병렬):
- 팀원 A: auth.js에 추가해야 할 기능 분석
- 팀원 B: 새 기능 인터페이스 설계
- 팀원 C: 테스트 케이스 작성

2단계 (순차):
- 팀 리드가 모든 의견을 종합
- 한 멤버가 auth.js를 한 번에 통합 수정
```

### 사례 5: 풍부한 초기 컨텍스트 제공

팀원들이 작업을 시작할 때, 그들의 대화 기록은 비어 있습니다. 팀 리드와 사용자가 이전에 논의한 내용을 알지 못합니다.

**잘못된 방법**:

```
팀을 만들고 멤버들이 작업을 시작하게 해.
```

멤버들은 안개 속에서 시작하게 됩니다: 이 프로젝트는 무엇인가요? 어떤 기술 스택을 사용하나요? 정확히 무엇을 만들어야 하나요?

**올바른 방법**:

```
이것은 TypeScript를 사용하는 React + Node.js 전자상거래 프로젝트입니다.

프로젝트 구조:
- src/frontend/: React 프론트엔드 코드
- src/backend/: Node.js 백엔드 코드
- prisma/: 데이터베이스 모델

코드 스타일:
- 함수 컴포넌트와 Hooks 사용
- 백엔드에 Express.js 사용
- 데이터베이스에 PostgreSQL 사용

이제 팀을 만들고 멤버들이 src/auth/ 아래에 사용자 인증을 추가하게 해 줘.
```

충분한 컨텍스트가 제공되어야 멤버들이 효율적으로 작업할 수 있습니다.

### 사례 6: 구현 전에 먼저 조사

멤버들이 즉시 코딩을 시작하게 하지 마세요. 먼저 솔루션을 조사하고 설계하게 하세요.

**2단계 프로세스**:

**1단계: 조사 및 설계**

```
팀을 만들어 줘. 1단계에서 조사를 수행해:
- 한 멤버는 기존 인증 방식 조사 (JWT vs Session)
- 한 멤버는 프로젝트의 기술 스택을 분석하고 모범 사례 결정
- 한 멤버는 데이터베이스 스키마 설계

조사가 완료되면 멤버들이 메시징 시스템을 통해 논의하고 최종 계획을 확정하게 해.
```

**2단계: 구현**

```
계획이 확정된 후 구현을 시작해:
- 한 멤버는 백엔드 인증 로직 구현
- 한 멤버는 프론트엔드 로그인 페이지 구현
- 한 멤버는 테스트 작성
```

이렇게 하면 **구현 도중에 계획이 작동하지 않는다는 것을 깨닫는 대신, 아키텍처 불일치를 조기에 발견**할 수 있습니다.

### 사례 7: 적극적으로 모니터링하고 개입

자동화를 설정했더라도 팀의 작업 상태를 적극적으로 모니터링해야 합니다.

**분할 창 모드 사용**:

tmux 창을 설정했다면 모든 멤버의 출력을 실시간으로 볼 수 있습니다:

```
┌─────────────────┬─────────────────┐
│  팀원 1         │  팀원 2         │
│  코드 분석 중   │  API 구현 중    │
│  ...            │  ...            │
│                 │                 │
│  잠깐, 이       │                 │
│  접근 방식이    │                 │
│  잘못된 것 같아 │                 │
└─────────────────┴─────────────────┘
```

멤버가 잘못된 방향으로 가는 것을 발견하면 빠르게 개입할 수 있습니다:

```
@팀원1 잠깐 멈춰. 분석 방향이 잘못됐어. 인증 모듈은 src/auth/ 아래에 있어야 해, src/user/가 아니라.
```

**정기적으로 작업 상태 확인**:

TaskList 명령을 사용하여 모든 작업의 상태를 확인하세요:

```
/tasks
```

모든 작업의 상태가 표시되어, 무엇이 완료되었고, 무엇이 아직 실행 중이며, 무엇이 차단되었는지 확인할 수 있습니다.

---

## 적합한 시나리오

Agent Teams는 강력하지만, 모든 작업에 적합한 것은 아닙니다. 올바른 시나리오를 이해하면 올바른 선택을 하는 데 도움이 됩니다.

### Agent Teams에 적합한 시나리오

**복잡한 시스템 리팩토링**

리팩토링이 여러 모듈에 걸쳐 있고 경계가 명확할 때:

```
시나리오: 모놀리식 애플리케이션을 마이크로서비스로 분할

팀을 만들어 주세요:
- 팀원 A: 사용자 모듈의 의존성 분석
- 팀원 B: 주문 모듈의 의존성 분석
- 팀원 C: 결제 모듈의 의존성 분석
- 팀원 D: 서비스 간 통신 프로토콜 설계
```

이 모듈들은 동시에 분석할 수 있으며, 최종 결과를 나중에 종합할 수 있어 순차적 분석보다 훨씬 빠릅니다.

**다각도 코드 리뷰**

여러 차원에서 코드를 리뷰해야 할 때:

```
시나리오: 결제 모듈에 대한 전면적인 보안 리뷰 수행

팀을 만들어 주세요:
- 팀원 A: 보안 취약점에 집중 (SQL 인젝션, XSS 등)
- 팀원 B: 성능 문제 검사 (N+1 쿼리, 메모리 누수 등)
- 팀원 C: 오류 처리의 완전성 검증
- 팀원 D: 테스트 커버리지 평가
```

각 멤버가 한 차원에 집중하여 리뷰가 더 깊어지고, 최종 보고서가 더 완전해집니다.

**프론트엔드와 백엔드 병렬 개발**

프론트엔드와 백엔드를 동시에 구축해야 할 때:

```
시나리오: 사용자 관리 기능 구축

팀을 만들어 주세요:
- 팀원 A (프론트엔드): 사용자 목록 페이지 구현
- 팀원 B (프론트엔드): 사용자 편집 페이지 구현
- 팀원 C (백엔드): CRUD API 구현
- 팀원 D (조정): API 계약을 설계하고 프론트엔드와 백엔드가 일치하도록 보장
```

API 계약을 먼저 정의하고 계약 우선 원칙을 따르면 프론트엔드와 백엔드를 병렬로 진행할 수 있습니다.

**경쟁적 디버깅**

여러 가능한 솔루션이 있을 때:

```
시나리오: 두 가지 가능한 수리 전략이 있는 복잡한 버그 수정

팀을 만들어 주세요:
- 팀원 A: 해결책 1 구현
- 팀원 B: 해결책 2 구현
- 팀원 C: 두 해결책의 장단점 평가
```

두 해결책을 병렬로 구현하고 테스트한 후 더 나은 것을 선택할 수 있습니다.

**문서 생성**

대량의 문서를 작성해야 할 때:

```
시나리오: 전체 프로젝트의 문서 작성

팀을 만들어 주세요:
- 팀원 A: API 문서 작성
- 팀원 B: 배포 가이드 작성
- 팀원 C: 개발 가이드 작성
- 팀원 D: 문제 해결 매뉴얼 작성
```

여러 문서를 동시에 작성하여 효율성을 크게 높일 수 있습니다.

### Agent Teams에 부적합한 시나리오

**간단한 수정 작업**

```
부적합: 변수 이름 변경, 단일 버그 수정, 작은 기능 추가
```

이러한 작업에는 팀을 시작하는 비용이 실제 작업보다 큽니다.

**고도로 순차적인 작업**

```
부적합: 엄격하게 순서대로 수행되어야 하는 작업
```

작업 B가 작업 A가 완료된 후에야 시작할 수 있다면, 진정한 병렬 공간이 없습니다.

**비용에 민감한 작업**

Agent Teams는 팀 크기에 따라 단일 인스턴스의 **2~4배** 토큰을 소비합니다. 비용이 주요 관심사라면 단일 인스턴스가 더 나은 선택일 수 있습니다.

### 의사결정 흐름도

```
독립적인 하위 작업이 여러 개 있나요?
    │
    ├─ 아니요 → 단일 인스턴스 사용
    │
    └─ 예 →
         │
         하위 작업을 다른 파일에 할당할 수 있나요?
         │
         ├─ 아니요 → 순차 실행 고려 또는 작업을 더 세분화
         │
         └─ 예 →
              │
              비용이 감당 가능한가요 (2-4배)?
              │
              ├─ 아니요 → 단일 인스턴스 사용
              │
              └─ 예 → Agent Teams 사용 ✓
```

---

## 비용 및 성능

Agent Teams를 사용하면 비용이 증가하지만, 상당한 효율성 향상도 가져올 수 있습니다. 이러한 상충 관계를 이해하면 정보에 입각한 결정을 내리는 데 도움이 됩니다.

### 비용 분석

**토큰 소비와 팀 크기**

Agent Teams의 토큰 소비는 팀 크기와 대략 **선형적**입니다:

| 팀 크기 | 상대적 비용 | 적합한 시나리오 |
|---------|---------|---------|
| 1명 (단일 인스턴스) | 1x | 간단한 작업 |
| 2인 팀 | 2-2.5x | 중간 복잡도 |
| 3인 팀 | 3-4x | 복잡한 작업 |
| 5+인 팀 | 5-6x+ | 대규모 프로젝트 |

**완벽하게 선형적이지 않은 이유**:

- **시작 비용**: 각 멤버는 시작할 때 초기 컨텍스트를 수신해야 함
- **조정 비용**: 멤버 간의 메시징 시스템을 통한 소통도 토큰을 소비함
- **팀 리드 비용**: 팀 리드는 보통 Opus를 사용하므로 더 비쌈

**구체적인 예시 수치** (Claude 4.5 Sonnet):

- 입력: 백만 토큰당 $3
- 출력: 백만 토큰당 $15

한 작업에 필요한 리소스를 가정해 보면:
- 팀 리드 (Opus): 50K 입력 + 20K 출력 ≈ $2.25
- 3명의 팀원 (Sonnet): 각 30K 입력 + 15K 출력 ≈ $2.7 × 3 = $8.1
- **총계**: 약 $10.35

같은 작업을 단일 Sonnet 인스턴스로 수행:
- 100K 입력 + 50K 출력 ≈ $1.05

**비용 배수**: 약 10배

**하지만 절약된 시간**: 잠재적으로 3시간에서 1시간으로 단축

### 효율성 향상

**Anthropic 내부 테스트 데이터**:

- 대규모 프로젝트 리팩토링: 효율성 약 **50%** 향상
- 병렬 다중 모듈 개발: 효율성 약 **60-70%** 향상
- 문서 생성 작업: 효율성 약 **80%** 향상

**실제 사례**:

Anthropic의 엔지니어링 팀은 **16개의 병렬 에이전트**를 사용하여 약 2주 만에 Linux 6.9 커널을 컴파일할 수 있는 C 컴파일러를 구축했습니다. 약 10만 줄의 Rust 코드로, GCC 테스트의 99%를 통과했습니다.

### 비용 최적화 전략

**전략 1: 모델 혼합**

```
팀 리드: Opus (강력한 추론 능력 필요)
팀원: Sonnet (높은 가성비)
간단한 작업: Haiku (가장 저렴)
```

**전략 2: 팀 크기 동적 조정**

```
분석 단계: 5인 팀 (다각도 분석)
구현 단계: 3인 팀 (병렬 코딩)
테스트 단계: 2인 팀 (테스트 및 수정)
```

**전략 3: 선택된 단계에서만 Agent Teams 사용**

전체 프로젝트에 Agent Teams를 사용하지 마세요. 가장 복잡한 단계에서만 사용하세요:

```
1단계 (요구사항 분석): 단일 인스턴스
2단계 (아키텍처 설계): Agent Teams (여러 계획을 병렬로 탐색)
3단계 (코딩): 단일 인스턴스
4단계 (코드 리뷰): Agent Teams (다각도 리뷰)
5단계 (문서 작성): Agent Teams (병렬 작성)
```

### 언제 가치가 있나요?

**가치가 있는 경우**:

- 프로젝트 마감이 촉박하고, 효율성 향상의 가치가 토큰 비용을 초과할 때
- 작업이 고도로 복잡하고, 단일 인스턴스가 세부 사항을 놓칠 가능성이 높을 때
- 다각도 분석과 검증이 필요할 때

**가치가 없는 경우**:

- 작업이 간단하고, 팀을 시작하는 오버헤드가 너무 높을 때
- 비용이 매우 민감하고 토큰 예산이 제한적일 때
- 작업이 고도로 순차적이고 병렬 공간이 없을 때

---

## 자주 묻는 질문

### Q1: Agent Teams는 안정적인가요? 프로덕션에서 사용할 수 있나요?

Agent Teams는 현재 **실험적 기능**이므로 여전히 버그와 불안정한 동작이 있을 수 있습니다. 권장 사항:

- 먼저 중요한 프로젝트를 백업하세요
- 소규모 프로젝트로 시작하여 테스트하고 익숙해지세요
- 공식 릴리스 노트를 팔로우하여 새 버전의 개선 사항을 확인하세요
- 문제가 발생하면 공식 팀에 즉시 보고하세요

### Q2: 최대 몇 명의 멤버를 만들 수 있나요?

이론적인 하드 리밋은 없지만, 실용적인 관점에서:

- 소규모 프로젝트: 2~3명
- 중규모 프로젝트: 3~5명
- 대규모 프로젝트: 5~10명

멤버가 너무 많으면 다음과 같은 문제가 발생합니다:

- 조정 오버헤드가 급격히 증가
- 토큰 사용량이 선형적으로 증가
- 파일 충돌 확률이 증가
- 모니터링 및 관리가 더 어려워짐

### Q3: 팀원들은 서로의 컨텍스트를 볼 수 있나요?

**아니요**. 각 팀원은 완전히 독립적인 컨텍스트 창을 가집니다. 그들은 컨텍스트를 직접 공유하는 대신 메시징 시스템을 통해 소통합니다.

이것은 의도적인 설계 선택이며, 장점은:

- 한 멤버의 추론이 다른 멤버의 추론에 의해 오염되지 않음
- 대화가 너무 길어져도 컨텍스트가 혼란스럽지 않음
- 실제 팀의 작동 방식과 더 유사하며, 각자 자신의 생각을 가짐

### Q4: 다른 멤버 간에 어떻게 전환하나요?

분할 창 모드를 설정하지 않은 경우, 단축키를 사용할 수 있습니다:

- `Shift+Up`: 이전 멤버로 전환
- `Shift+Down`: 다음 멤버로 전환
- `Ctrl+O`: 팀 리드로 돌아가기

### Q5: 작업이 실패하면 어떻게 되나요?

한 멤버의 작업이 실패한 경우:

1. 해당 멤버의 출력 로그를 읽고 실패 원인을 확인
2. 필요한 경우 작업을 다른 멤버에게 재할당
3. 수동으로 개입하여 문제를 직접 해결

### Q6: 과정 중에 멤버를 추가하거나 제거할 수 있나요?

네. 언제든지 팀 리드에게 명령을 내릴 수 있습니다:

```
새 멤버를 추가해서 XXX를 처리하게 해 줘.
```

```
팀원 3이 현재 작업을 마친 후 팀에서 떠나게 해 줘.
```

### Q7: Agent Teams를 MCP 및 Skills와 함께 사용할 수 있나요?

물론입니다. 실제로 함께 사용하면 더욱 좋습니다:

- **Agent Teams + Skills**: 각 멤버가 다른 Skills를 가질 수 있음
- **Agent Teams + MCP**: 다른 멤버가 다른 MCP 서버를 통해 외부 리소스에 접근할 수 있음

```
팀을 만들어 줘:
- 팀원 A: 프론트엔드 디자인 Skill을 가지고 UI 담당
- 팀원 B: GitHub MCP를 통해 리포지토리에 접근하여 PR 관리
- 팀원 C: Database MCP를 통해 데이터를 조회하여 분석 처리
```

---

## 참고 자료

### 공식 리소스

- [Claude Code 공식 문서](https://docs.anthropic.com/en/docs/claude-code) - 완전한 Claude Code 문서
- [Anthropic 엔지니어링 블로그](https://www.anthropic.com/engineering) - 공식 기술 블로그 및 업데이트

### Agent Teams 튜토리얼 모음

**완전 가이드 (중국어)**:

- [Claude Code Agent Teams 완전 가이드: 입문부터 실전까지](https://m.blog.csdn.net/u010634066/article/details/157903022) - 설정 세부 사항, 실습 예제 및 16개의 병렬 에이전트가 C 컴파일러를 구축한 놀라운 사례 포함
- [Claude Code Agent Team으로 협업 개발: 완전 실전 가이드](https://m.blog.csdn.net/u010028049/article/details/158126612) - 완전한 협업 프로젝트 워크플로우
- [Claude Code Agent Teams 설정 및 사용 단계별 가이드](https://cloud.tencent.com/developer/article/2630088) - Tencent Cloud 튜토리얼, 상세한 설정 지침 포함

**실전 입문**:

- [네이티브 Claude Code Agent Teams 실전: 활성화부터 3인 팀 실행까지](https://www.cnblogs.com/147api/p/19606317) - 3인 팀 연습
- [Claude Code Agent Teams 초보자 실습](https://m.toutiao.com/article/7606744384960266793/) - 초보자 친화적인 입문 소개, 계약 우선 등 모범 사례 포함
- [더 이상 혼자가 아닙니다: Agent Teams로 7개의 Claude가 동시에 개발을 도와줍니다](https://m.toutiao.com/a7605229732241736202/) - 7인 팀 사례 연구

**모범 사례**:

- [Agent Teams 모범 사례: 계약 우선, 작업 세분성 및 모델 할당](https://blog.csdn.net/sinat_37574187/article/details/144727588) - 7가지 모범 사례에 대한 상세한 설명
- [7년 차 빅테크 베테랑의 Claude Code 실전 매뉴얼: 초보자부터 전문가까지의 8가지 규칙](https://new.qq.com/rain/a/20260111A02HE900) - 기업급 실전 경험

**원리 및 비교**:

- [Claude Code Agent Teams: 멀티 에이전트 협업의 올바른 방법](https://post.m.smzdm.com/p/adoezrmz/) - 멀티 에이전트 협업에 대한 심층 분석
- [Claude Code 멀티 에이전트 팀 개발: 원리부터 함정까지의 완전 가이드](https://m.toutiao.com/a7605229732241736202/) - 실제 사용에서 얻은 원리 및 함정 경험

### 공식 가이드 번역

- [Claude 공식 "Agent 구축 가이드" 발표 (PDF 다운로드 포함)](https://m.blog.csdn.net/sinat_37574187/article/details/144724124) - 공식 Agent 구축 가이드
- [Claude 공식 "효과적인 Agent 구축 가이드" 완전 번역판](https://m.blog.csdn.net/gyn_enyaer/article/details/144827922) - 완전한 중국어 번역

### 관련 기술

- [Agent Skills 표준](https://agentskills.io/) - Skills 생태계
- [skills.sh - Agent Skills 앱 스토어](https://skills.sh/) - 70,000개 이상의 스킬 라이브러리
