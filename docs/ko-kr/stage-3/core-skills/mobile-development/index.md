# Claude Code 모바일 원격 개발

## 소개

다음과 같은 상황을 상상해 보세요: 출퇴근길 지하철에서 갑자기 훌륭한 버그 수정 아이디어가 떠오릅니다; 카페에서 줄을 서서 기다리면서 긴급한 프로덕션 장애 알림을 받습니다; 여자친구와 쇼핑하면서 AI가 구축한 프로젝트의 진행 상황을 확인하고 싶습니다.

전통적인 개발 워크플로우에서는 이러한 상황이 보통 노트북을 열 장소를 찾거나, 어쩔 수 없이 작업을 미뤄야 한다는 의미였습니다. 하지만 AI 보조 코딩 시대에는 규칙이 바뀌었습니다. Claude Code를 사용하면 개발 환경을 주머니에 넣고 다니며 언제 어디서나 생산성을 유지할 수 있습니다.

2025년 여름, Claude Code 채택이 늘어나면서 개발자들은 다양한 "폰으로 코딩하기" 방법을 탐구하기 시작했습니다. 간단한 로컬 Termux 사용부터, 복잡한 SSH + Tailscale 원격 연결, 전용 Happy Coder 앱까지, 완전한 모바일 개발 생태계가 점차 형성되었습니다.

이 장에서 해결하는 핵심 문제는: Claude Code가 폰을 따라다니며 진정한 "주머니 속 개발 어시스턴트"가 되는 방법입니다.

---

::: info 커뮤니티 피드백 한눈에 보기

실제 커뮤니티 피드백을 기반으로 한 각 방식의 경험 비교:

**Happy Coder (방식 2)**
- 연결 안정성 문제: 연결 끊김이 자주 발생하며, 끊긴 후 컨텍스트가 손실됨
- 제한된 기능: `/` 명령어 사용 불가
- 보안 우려: 공공 릴레이 서버에 의존하며, 일부 사용자는 데이터 보안에 우려를 표명

**HAPI (방식 3)**
- 자체 호스팅 서버 지원: 자체 VPS에 배포 가능
- Tailscale과 함께 사용하면 더 나은 경험: 컴퓨터에서 `hapi server`를 실행하고 폰에서 Tailscale IP를 통해 연결
- 비교적 안정적인 연결, 장기 사용에 적합

**Claude Remote Control (공식 방식)**
- 공식 솔루션, Claude Code와 네이티브 통합
- 로컬 환경에 대한 전체 액세스 지원 (MCP, 도구, 프로젝트 설정)
- Max 구독 필요 (Pro 지원은 곧 제공 예정)
- Anthropic 클라우드 연결에 의존

**추천**: 높은 연결 안정성이 필요하거나 타사 릴레이 보안이 우려되는 경우 **HAPI + Tailscale** 또는 **공식 Remote Control** 방식을 선택하세요.

:::

---

## 핵심 원리: 모바일 개발 아키텍처 패턴

구체적인 방법을 소개하기 전에 먼저 문제의 본질을 이해합시다.

### 모바일 개발이 문제인 이유는?

전통적인 IDE(예: VS Code, IntelliJ)는 완전한 운영 체제 환경, 강력한 CPU, 대용량 메모리 및 저장 공간이 필요합니다. 스마트폰이 점점 더 강력해지고 있지만, 개발 경험에는 여전히 자연스러운 한계가 있습니다:

**입력 제약**: 가상 키보드는 코딩에 비효율적이며, 복잡한 구문을 오타내기 쉽습니다

**화면 제약**: 작은 화면으로 코드, 터미널, 브라우저를 동시에 보기 어렵습니다

**환경 제약**: 스마트폰은 완전한 개발 도구 체인(컴파일러, 데이터베이스, 디버거)을 실행할 수 없습니다

**연결 제약**: 모바일 네트워크가 불안정하며, SSH 세션이 쉽게 끊깁니다

### 핵심 아이디어: 씬 클라이언트 아키텍처

모든 모바일 개발 방식의 핵심 아이디어는 동일합니다: 폰은 "제어 콘솔"일 뿐이며, 실제 개발 작업은 다른 곳에서 이루어집니다.

```text
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│    ┌─────────────┐              ┌─────────────┐             │
│    │   폰        │              │ 호스트/클라우드│             │
│    │ (컨트롤러)  │   ────────►  │ (실행자)    │             │
│    │             │   명령       │             │             │
│    │ • 명령 전송 │              │ • CLI 실행  │             │
│    │ • 출력 확인 │              │ • 코드 실행 │             │
│    │ • 검토      │              │ • 파일 접근 │             │
│    └─────────────┘              └─────────────┘             │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

이 아키텍처를 통해 폰은 인간-컴퓨터 상호작용에만 집중하고, 무거운 연산은 호스트나 클라우드에 위임합니다.

---

## 방식 1: 공식 iOS 앱

2025년 10월, Anthropic은 iOS 앱에서 Claude Code 모바일 지원을 공식 출시했습니다. 이것은 가장 간단한 모바일 개발 옵션입니다.

### 지역 제한

중요 참고: Claude 앱은 중국 본토에서 **직접 사용할 수 없습니다**.

중국 본토에 계신다면 **Happy Coder**(방식 2)를 직접 사용하는 것을 권장합니다. 설정된 국내 API 릴레이 서비스를 통해 정상적으로 작동할 수 있습니다.

해외 Apple ID가 있는 경우 지역을 전환하여 Claude 앱을 다운로드할 수 있습니다.

### 작동 방식

```text
┌─────────────┐                    ┌─────────────────┐
│  iOS 앱     │ ──────────────────► │ Anthropic 클라우드│
│  (폰)       │   HTTPS + OAuth    │  Claude Code    │
└─────────────┘                    └────────┬────────┘
                                           │
                                           ▼
                                   ┌───────────────┐
                                   │   GitHub API  │
                                   └───────────────┘
```

폰 앱은 명령만 전송합니다. 모든 코드 실행은 Anthropic의 클라우드 샌드박스에서 이루어지며, 결과는 GitHub를 통해 동기화됩니다.

### 기본 사용법

**사전 요구 사항:**

- iOS 15 이상의 iPhone
- Claude Pro/Team/Enterprise 구독 (무료 플랜은 지원되지 않음)
- GitHub 계정

**단계:**

1. App Store에서 Claude 앱 다운로드
2. Anthropic 계정으로 로그인
3. 앱에서 "Code" 탭 찾기
4. OAuth를 통해 GitHub 리포지토리 연결
5. 작업 생성 시작

### 장단점

장점은 설정 장벽이 없고, 매끄러운 경험, 푸시 알림입니다. 단점은 iOS만 지원, 주로 GitHub 워크플로우, 비교적 제한된 기능(로컬 파일 시스템에 접근 불가), 중국 본토에서 직접 사용 불가입니다.

---

## 방식 2: Happy Coder

Happy Coder는 Claude Code와 Codex를 위해 설계된 오픈소스 모바일 및 웹 클라이언트로, 종단 간 암호화와 어디서나 AI 코딩 어시스턴트의 원격 제어를 지원합니다.

### 작동 방식

```text
┌─────────────┐              ┌─────────────┐              ┌─────────────┐
│  Happy 앱   │   ────────►  │ Happy 서버  │   ◄────────  │happy-coder  │
│ (폰/웹)    │ 암호화된 WS  │   (릴레이)  │  WebSocket   │ (데스크톱)  │
└─────────────┘              └─────────────┘              └──────┬──────┘
                                                               │
                                                               ▼
                                                        ┌─────────────┐
                                                        │Claude Code  │
                                                        │    CLI      │
                                                        └─────────────┘
```

컴퓨터에서 `claude` 대신 `happy`를 실행하여 AI 코딩 어시스턴트를 시작합니다. 폰 제어가 필요할 때 세션이 자동으로 원격 모드로 전환됩니다. 컴퓨터에서 아무 키나 누르면 로컬 제어로 돌아갑니다.

### 설치 및 사용

**1단계: 앱 다운로드**

| 플랫폼 | 링크 |
|------|------|
| iOS | [App Store](https://apps.apple.com/us/app/happy-claude-code-client/id6748571505) |
| Android | [Google Play](https://play.google.com/store/apps/details?id=com.ex3ndr.happy) |
| 웹 | [app.happy.engineering](https://app.happy.engineering) |

**2단계: 컴퓨터에 CLI 설치**

```bash
npm install -g happy-coder
```

**3단계: 실행 및 페어링**

```bash
# 프로젝트 디렉토리에서 실행
cd ~/my-project
happy

# 페어링 QR 코드가 표시됩니다
```

**4단계: 폰에서 스캔 및 페어링**

Happy 앱을 열고 컴퓨터에 표시된 QR 코드를 스캔합니다. 페어링이 성공하면 폰에서 Claude Code를 제어할 수 있습니다.

**5단계: 사용**

```bash
# Claude Code 실행
happy

# 또는 Codex 실행
happy codex
```

### 리소스 링크

- [GitHub 프로젝트](https://github.com/slopus/happy) - 소스 코드
- [문서](https://happy.engineering/docs) - 사용 문서
- [Discord 커뮤니티](https://discord.gg/fX9WBAhyfD) - 커뮤니티 토론

### 장단점

장점은 간단한 설정, 크로스 플랫폼 지원, 종단 간 암호화, 오픈소스 감사 가능성입니다. 단점은 타사 릴레이 인프라에 대한 의존과 자체 환경에서 모바일 앱 가용성을 확인해야 한다는 점입니다.

---

## 방식 3: HAPI

HAPI는 Happy Coder의 대안으로, 로컬 우선 설계와 여러 AI 모델 간의 원활한 기기 전환을 지원합니다.

### 작동 방식

```text
┌─────────────┐              ┌─────────────┐              ┌─────────────┐
│  HAPI 앱    │   ────────►  │ HAPI 서버   │   ◄────────  │    hapi     │
│ (폰/PWA/    │  WireGuard   │ (자체 호스팅│  WireGuard   │ (데스크톱)  │
│ Telegram)   │   + TLS      │   릴레이)   │   + TLS      │             │
└─────────────┘              └─────────────┘              └──────┬──────┘
                                                               │
                                                               ▼
                                                        ┌─────────────┐
                                                        │Claude Code  │
                                                        │ / Codex /   │
                                                        │ Gemini 등   │
                                                        └─────────────┘
```

HAPI는 WireGuard + TLS를 사용하여 종단 간 암호화를 제공합니다. 모든 통신은 암호화된 릴레이 서버를 통해 이루어집니다. 자체 릴레이 서버를 호스팅하여 데이터 흐름을 완전히 제어할 수 있습니다.

### 핵심 기능

- **원활한 전환**: 데스크톱과 폰 간의 제어 전환; 아무 키나 누르면 로컬 제어로 복귀
- **네이티브 우선**: 모바일 앱은 네이티브 기술로 래핑되어 부드러운 상호작용 제공
- **AFK 승인**: 컴퓨터에서 벗어난 동안 폰에서 승인 요청 수신
- **다중 모델 지원**: Claude Code, Codex, Gemini, OpenCode 등 지원
- **어디서나 터미널**: PWA, Telegram Mini App 등을 통해 접근
- **음성 제어**: 음성 입력 명령 지원, 손을 자유롭게 유지

### 설치 및 사용

**1단계: 릴레이 서버 시작**

```bash
# 서버에서 실행 (또는 npx로 직접 실행)
npx @twsxtd/hapi hub --relay
```

**2단계: 컴퓨터에 CLI 설치**

```bash
# 프로젝트 디렉토리에서 실행
cd ~/my-project
npx @twsxtd/hapi

# 또는 전역 설치
npm install -g @twsxtd/hapi
hapi
```

**3단계: 기기 페어링**

터미널 프롬프트를 따라 폰에서 HAPI 앱을 열고 QR 코드를 스캔하여 페어링을 완료합니다.

**4단계: 접근 방법**

| 접근 방법 | 설명 |
|---------|------|
| 웹 PWA | 브라우저 접근, 홈 화면에 설치 지원 |
| Telegram Mini App | Telegram 내에서 직접 사용 |
| 모바일 앱 | 네이티브 앱 경험 (게시된 경우) |

### Happy Coder와의 차이점

| 기능 | Happy Coder | HAPI |
|------|-------------|------|
| 설계 철학 | 클라우드 우선 | 로컬 우선 |
| 암호화 방식 | WebSocket + E2E | WireGuard + TLS |
| 다중 모델 지원 | Claude Code, Codex | Claude, Codex, Gemini, OpenCode |
| 접근 방법 | iOS/Android/웹 | PWA, Telegram 등 |
| 음성 제어 | 없음 | 있음 |
| AFK 승인 | 없음 | 있음 |
| 자체 호스팅 릴레이 | 수동 배포 필요 | 즉시 사용 가능 |

### 리소스 링크

- [GitHub 프로젝트](https://github.com/tiann/hapi) - 소스 코드
- [PWA 문서](https://github.com/tiann/hapi/blob/main/docs/pwa.md) - PWA 설치 및 사용법
- [작동 원리](https://github.com/tiann/hapi/blob/main/docs/how-it-works.md) - 기술 구현 세부 사항
- [음성 어시스턴트](https://github.com/tiann/hapi/blob/main/docs/voice.md) - 음성 제어 기능
- [왜 HAPI인가](https://github.com/tiann/hapi/blob/main/docs/why-hapi.md) - 설계 철학
- [FAQ](https://github.com/tiann/hapi/blob/main/docs/faq.md) - 자주 묻는 질문

### 장단점

장점은 로컬 우선 설계, 다중 모델 지원, 종단 간 암호화, 음성 제어, 자체 호스팅 릴레이 기능입니다. 단점은 프로젝트가 비교적 새롭고 생태계가 아직 성장 중이라는 점입니다.

---

## 방식 4: SSH + Tailscale + Tmux

전문 개발자에게 가장 적합한 옵션입니다. SSH를 통해 개발 기기에 원격으로 연결하고 Tmux로 세션을 지속시킵니다.

### 작동 방식

```text
┌─────────────┐              ┌─────────────┐              ┌─────────────┐
│   폰        │   ────────►  │  Tailscale  │   ◄────────  │  컴퓨터     │
│ (SSH 클라이언트)│  VPN P2P    │ 릴레이/홀펀칭│   VPN P2P    │ (개발 호스트)│
└─────────────┘              └─────────────┘              └──────┬──────┘
                                                               │
                                                               ▼
                                                        ┌─────────────┐
                                                        │    Tmux     │
                                                        │ (세션       │
                                                        │  지속성)    │
                                                        └─────────────┘
```

Tailscale은 피어 투 피어 VPN을 생성하여 어떤 네트워크에서든 집 컴퓨터에 접근할 수 있게 합니다. Tmux는 SSH 연결이 끊겨도 Claude Code가 백그라운드에서 계속 실행되도록 보장합니다.

### Tailscale이 필요한 이유는?

**전통적인 SSH의 문제:**

```text
폰 (4G) ──XX──> 라우터 NAT ──XX──> 집 컴퓨터
             (관통 불가)    (LAN 격리)
```

컴퓨터는 사설망에 있고, 폰은 공중망에 있어 직접 접근이 불가능합니다. 전통적인 해결책은 포트 포워딩과 동적 DNS가 필요하며, 복잡하고 위험합니다.

**Tailscale 해결책:**

```text
폰 (4G) ──► Tailscale 릴레이 ──◄── 집 컴퓨터
            (자동 홀펀칭 또는 릴레이)
```

Tailscale은 NAT 통과를 사용하며, 통과가 실패하면 자동으로 릴레이로 대체합니다. 전체 연결이 암호화됩니다.

### 전체 설정 단계

**1단계: 컴퓨터에 Tailscale 설치**

```bash
# macOS
brew install --cask tailscale

# 또는 설치 프로그램 다운로드
# https://tailscale.com/download
```

**2단계: 로그인 및 IP 확인**

```bash
# Tailscale 시작
sudo tailscale up

# Tailscale IPv4 확인
tailscale ip -4
# 예시 출력: 100.x.x.x
```

**3단계: 폰에 Tailscale 설치**

App Store 또는 Google Play에서 Tailscale을 다운로드하고 같은 계정으로 로그인합니다.

**4단계: Tmux 설치 및 설정**

```bash
# macOS
brew install tmux

# ~/.tmux.conf 생성
cat > ~/.tmux.conf << 'EOF'
# 마우스 지원 활성화
set -g mouse on

# 256색을 지원하는 기본 터미널
set -g default-terminal "screen-256color"

# 프리픽스 키를 Ctrl+A로 변경 (선택 사항)
unbind C-b
set -g prefix C-a

# 단순화된 분할 단축키
bind v split-window -h
bind h split-window
EOF
```

**5단계: 지속 세션 생성**

```bash
# "claude"라는 이름의 세션 생성
tmux new -s claude

# 이 세션에서 Claude Code 시작
cd ~/my-project
claude

# 닫지 않고 분리
# Ctrl+B를 누른 후 D
```

**6단계: 폰 SSH 클라이언트에서 연결**

추천 SSH 클라이언트:

| 클라이언트 | 플랫폼 | 비고 |
|--------|------|------|
| Blink Shell | iOS | MOSH 지원, 불안정한 네트워크에 적합 |
| Termius | iOS/Android | 크로스 플랫폼, 세련된 UI |
| a-Shell | iOS | 무료, 가벼움 |

연결 설정:

```text
호스트: 100.x.x.x (Tailscale IP)
포트: 22
사용자 이름: 컴퓨터 사용자 이름
```

연결 후 Tmux에 연결:

```bash
tmux attach -t claude
```

### 고급 팁

**컴퓨터가 잠자기 방지:**

```bash
# macOS
caffeinate -dimsu &

# 또는 시스템 설정 > 에너지 절약 > 자동 수면 방지 설정
```

**불안정한 네트워크에 MOSH 사용:**

MOSH (Mobile Shell)는 모바일 네트워크에 최적화된 SSH 대안으로, 네트워크 변경 시 원활한 복구를 제공합니다.

```bash
# 컴퓨터에 설치
brew install mosh

# 폰 클라이언트에서 MOSH 사용
# Blink Shell은 MOSH를 기본 지원
```

**원클릭 연결 스크립트:**

SSH 클라이언트에서 시작 명령으로 설정:

```bash
tmux attach -t claude || tmux new -s claude
```

이렇게 하면 기존 세션에 자동 연결되거나 새 세션이 생성됩니다.

### 장단점

장점은 전체 기능과 데스크톱과 동등한 워크플로우, 모든 개발 도구 사용 가능입니다. 단점은 설정이 비교적 복잡하고 컴퓨터가 계속 켜져 있어야 한다는 점입니다.

---

## 방식 5: 로컬 Termux 런타임

Android 사용자라면 외부 기기를 연결하지 않고 폰에서 직접 Claude Code를 실행할 수 있습니다.

### 작동 방식

```text
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│                    ┌─────────────┐                          │
│                    │   Termux    │                          │
│                    │ (Linux 환경)│                          │
│                    │             │                          │
│                    │ • Node.js   │                          │
│                    │ • Claude    │                          │
│                    │   Code CLI  │                          │
│                    │             │                          │
│                    │ • 프로젝트  │                          │
│                    │   파일      │                          │
│                    │ • Git       │                          │
│                    └─────────────┘                          │
│                         │                                   │
│                         ▼                                   │
│                   ┌─────────────┐                           │
│                   │Anthropic API│                           │
│                   └─────────────┘                           │
└─────────────────────────────────────────────────────────────┘
```

Termux는 Android용 터미널 에뮬레이터이자 Linux 환경입니다. 그 안에 직접 Node.js와 Claude Code를 설치할 수 있습니다.

### 설치 단계

**중요**: Termux는 Google Play가 아닌 [F-Droid](https://f-droid.org/)에서 다운로드하세요 (Play 버전은 구버전입니다).

**1단계: 기본 도구 설치**

```bash
# 패키지 매니저 업데이트
pkg update && pkg upgrade

# 개발 도구 설치
pkg install git nodejs python vim
```

**2단계: Claude Code 설치**

```bash
npm install -g @anthropic-ai/claude-code
```

**3단계: 환경 설정**

```bash
# 워크스페이스 생성
mkdir -p ~/projects
cd ~/projects

# 프로젝트 초기화
git clone https://github.com/your-repo.git
cd your-repo

# Claude Code 실행
claude
```

**4단계: 외부 키보드 설정 (권장)**

Termux에서:

```bash
# 추가 키 행 활성화
# 화면 길게 누르기 > 더보기 > Extra keys row

# 단축키 설정
# ~/.termux/termux.properties에 추가
extra-keys = [['ESC','/','-','HOME','UP','END','PGUP','~'], \
              ['TAB','CTRL','ALT','LEFT','DOWN','RIGHT','PGDN','|']]
```

### 성능 고려 사항

| 작업 유형 | Android 성능 |
|---------|-------------|
| 웹 개발 (HTML/CSS/JS) | 우수 |
| Python 스크립트 | 우수 |
| Node.js 애플리케이션 | 양호 |
| 테스트 스위트 실행 | 보통 |
| 대형 프로젝트 컴파일 | 권장하지 않음 |

### 장단점

장점은 완전한 로컬 제어, 외부 호스트 의존 없음, 오프라인 우선 작업입니다. 단점은 폰 성능 제한, 약한 텍스트 입력 경험, Android 전용입니다.

---

## 방식 6: Claude Code UI

Claude Code UI (CloudCLI라고도 함)는 Claude Code를 위한 웹 인터페이스를 제공하는 오픈소스 프로젝트로, 폰 브라우저를 지원합니다.

### 작동 방식

```text
┌─────────────┐              ┌─────────────┐              ┌─────────────┐
│폰 브라우저  │   ────────►  │ 웹 서버     │   ◄────────  │Claude Code  │
│             │  HTTP/HTTPS  │ (localhost) │   호출       │    CLI      │
└─────────────┘              └─────────────┘              └─────────────┘
```

컴퓨터에서 웹 서버를 실행한 다음 폰 브라우저에서 접근합니다. LAN 접근 또는 터널링이 필요합니다.

### 설치 및 사용

**1단계: 설치**

```bash
# 원클릭 시작 (권장)
npx @siteboon/claude-code-ui

# 또는 전역 설치
npm install -g @siteboon/claude-code-ui
claude-code-ui
```

**2단계: 인터페이스 열기**

서버 기본값은 `http://localhost:3001`입니다.

**3단계: 폰에서 접근**

방법 A - LAN 접근 (같은 Wi-Fi):

```bash
# 모든 인터페이스에 바인딩
claude-code-ui --host 0.0.0.0

# 폰에서 접근
http://<컴퓨터-LAN-IP>:3001
```

방법 B - ngrok 터널:

```bash
# ngrok 설치
brew install ngrok

# 터널 시작
ngrok http 3001

# 폰에서 ngrok URL 열기
```

### 기능

- 모바일 지원 반응형 디자인
- 내장 채팅 인터페이스
- 파일 브라우저
- Git 작업 UI
- 세션 관리

### 장단점

장점은 그래픽 인터페이스와 풍부한 기능입니다. 단점은 LAN 외부에서 터널이 필요하고 설정이 비교적 복잡합니다.

---

## 방식 7: 클라우드 개발 환경

항상 켜진 로컬 컴퓨터가 없는 경우, Claude Code가 클라우드 서버에서 실행되는 클라우드 개발 환경을 사용할 수 있습니다.

### 작동 방식

```text
┌─────────────┐              ┌─────────────┐              ┌─────────────┐
│   폰        │   ────────►  │ 클라우드 박스│   ─────────► │Claude Code  │
│(브라우저/앱)│    HTTPS     │  (DevBox)   │              │    CLI      │
└─────────────┘              └─────────────┘              └─────────────┘
```

클라우드 컨테이너에 Claude Code가 사전 설치되어 있으며, 브라우저나 모바일 앱에서 접근합니다.

### Sealos DevBox 사용

**1단계: 환경 생성**

[Sealos DevBox](https://sealos.io/devbox)에 접속하여 Claude Code 템플릿을 선택하고 환경을 생성합니다.

**2단계: 개발 환경 시작**

약 30~60초 안에 환경이 준비되며, 웹 터미널을 받습니다.

**3단계: Claude API 설정**

```bash
export ANTHROPIC_API_KEY="your-api-key"
```

**4단계: Happy 앱 연결**

```bash
# happy-coder 설치 (또는 사전 설치된 것 사용)
npm install -g happy-coder

# 페어링 QR 코드 생성
happy
```

폰에서 스캔하면 즉시 사용할 수 있습니다.

### 클라우드 옵션 비교

| 플랫폼 | Claude Code | 모바일 최적화 | 시작 시간 | 가격 |
|------|------------|----------|----------|------|
| Sealos DevBox | 사전 설치됨 | Happy 지원 | ~60초 | 종량제 |
| GitHub Codespaces | 수동 설정 | 브라우저 흐름 | ~2-3분 | 무료 할당량 + 시간당 |
| Gitpod | 수동 설정 | 브라우저 흐름 | ~1-2분 | 무료 할당량 + 시간당 |
| Replit | 네이티브 Claude Code 없음 | 네이티브 앱 | 즉시 | 무료 + 구독 |

### 장단점

장점은 로컬 컴퓨터 불필요, 환경 일관성, 확장성입니다. 단점은 유료 사용, 네트워크 의존, 코드가 클라우드에 호스팅됩니다.

---

## 비교 및 선택

각 방식은 다른 강점을 가지며 다른 시나리오에 적합합니다.

### 비교 표

| 방식 | 난이도 | 터널 필요 | 비용 | 최적 시나리오 |
|------|------|-------------|------|----------|
| 공식 iOS 앱 | 쉬움 | 불필요 | $20/월 | 빠른 확인, 간단한 작업 |
| Happy Coder | 비교적 쉬움 | 불필요 | 무료 | 일상 사용, 편의성 |
| HAPI | 보통 | 불필요 | 무료 | 다중 모델, 로컬 우선 |
| SSH + Tailscale | 비교적 복잡 | 불필요 | 무료 | 전문 개발, 전체 기능 |
| Termux | 보통 | 불필요 | 무료 | Android 로컬 개발 |
| Claude Code UI | 보통 | 필요 | 무료 | 웹 인터페이스 선호 |
| 클라우드 DevBox | 쉬움 | 불필요 | 종량제 | 로컬 컴퓨터 없음 |

### 선택 가이드

**중국 본토에 계신 경우**: **Happy Coder**를 사용하세요. 국내 API 릴레이 설정과 함께 사용하면 잘 작동합니다.

**최대 편의성을 원하시면**: Happy Coder를 선택하세요. 스캔 후 바로 사용 가능한 흐름이 매우 편리합니다.

**다중 모델 지원이 필요하시면**: HAPI를 선택하세요. 여러 AI 코딩 어시스턴트를 지원하며 모델 전환 워크플로우에 이상적입니다.

**항상 켜진 컴퓨터가 있으시면**: SSH + Tailscale을 선택하세요. 가장 완전한 경험을 제공합니다.

**iPhone 사용자이신 경우 (중국 본토 외)**: 공식 앱이 가장 쉽게 시작할 수 있는 방법입니다.

**Android만 사용하시는 경우**: Termux가 완전한 로컬 모바일 개발 경로를 제공합니다.

**컴퓨터가 없으시면**: 클라우드 DevBox가 이상적인 선택입니다.

---

## 보안 및 개인정보

모바일 개발은 네트워크를 통한 코드 전송이 포함되므로 보안에 특별한 주의가 필요합니다.

### 릴레이 서버의 위험

Happy Coder나 HAPI와 같이 릴레이에 의존하는 서비스를 사용할 때 다음 위험을 고려하세요:

```text
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  릴레이 서버가 잠재적으로 볼 수 있는 것:                    │
│                                                             │
│  • 암호화 전의 데이터 (E2E가 잘못 구현된 경우)              │
│  • 메타데이터 (언제 연결했는지, 세션이 얼마나 오래 실행되는지)│
│  • API 키 (잘못 구성된 경우)                                │
│                                                             │
│  릴레이 서버가 잠재적으로 할 수 있는 것:                    │
│                                                             │
│  • 코드 내용 기록                                           │
│  • API 자격 증명 탈취                                      │
│  • 악의적인 명령 주입                                       │
│  • 기기를 공격 노드로 악용                                  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 보안 모범 사례

**1. 코드 민감도 등급**

```text
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  공개 프로젝트/학습 코드 -> 어떤 방식이든 허용              │
│                                                             │
│  개인 프로젝트 -> SSH+Tailscale 또는 자체 호스팅 선호       │
│                                                             │
│  상업용 코드 -> SSH+Tailscale만 사용, 모든 타사 릴레이      │
│  경로 비활성화                                              │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**2. 키 관리**

```bash
# 소스에 키를 하드코딩하지 마세요
const apiKey = "sk-ant-xxxxx"

# 환경 변수를 사용하세요
const apiKey = process.env.ANTHROPIC_API_KEY

# .env 파일 사용 (.gitignore에 추가)
ANTHROPIC_API_KEY=sk-ant-xxxxx
```

**3. 샌드박스 모드 사용**

Claude Code는 접근 범위를 제한하는 샌드박스 모드를 지원합니다:

```bash
claude --sandbox /path/to/project
```

**4. 릴레이 자체 호스팅**

Happy Coder를 사용하는 경우 릴레이 자체 호스팅을 고려하세요:

```bash
# 프로젝트 클론 (서버 구현 포함)
git clone https://github.com/slopus/happy.git
cd happy

# 자체 VPS에 서버 배포
# 자세한 내용은 프로젝트 문서 참조
```

**5. Headscale 사용**

Headscale은 Tailscale의 오픈소스 구현으로 자체 호스팅할 수 있습니다:

```bash
# 원클릭 Docker 배포
docker run -d \
  --name headscale \
  -v /srv/headscale:/etc/headscale \
  -p 3478:3478/udp \
  -p 8080:8080 \
  headscale/headscale:latest
```

---

## 자주 묻는 질문

### NAT 통과가 필요한가요?

대부분의 최신 방식은 수동 NAT 통과가 **필요하지 않습니다**:

| 방식 | 원리 |
|------|------|
| Happy Coder | 릴레이 모드, 양쪽 모두 서버에 능동적으로 연결 |
| HAPI | 릴레이 모드, WireGuard + TLS |
| Tailscale | NAT 홀펀칭 또는 릴레이 |
| iOS 앱 | 클라우드 실행 |
| Claude Code UI | 인바운드 접근 필요 |

### 릴레이 모드에서 통과가 필요 없는 이유는?

```text
아웃바운드 연결 (NAT가 허용):
컴퓨터 ──► 릴레이 서버 가능

인바운드 연결 (NAT가 차단):
외부 ──► 컴퓨터 불가능

릴레이 트릭:
양쪽 모두 릴레이에 아웃바운드 연결을 만들므로,
어느 쪽도 인바운드 연결이 필요 없습니다.
```

### 모바일 개발이 배터리 수명에 영향을 미치나요?

방식에 따라 전력 소비가 다릅니다:

| 방식 | 전력 사용량 | 이유 |
|------|--------|------|
| SSH 터미널 | 낮음 | 텍스트만 렌더링 |
| iOS 앱 | 보통 | 클라우드 실행, 폰은 제어만 |
| Termux | 높음 | 로컬 CLI 런타임 |
| 브라우저 | 보통 | 웹 UI 렌더링 부하 |

긴 세션의 경우 폰을 충전 상태로 유지하세요.

### 네트워크 연결이 끊기면 어떻게 되나요?

| 방식 | 네트워크 끊김의 영향 |
|------|-------------|
| SSH + Tmux | Claude 계속 실행; 재연결 시 복구 |
| Happy Coder | 자동 재연결 |
| HAPI | 자동 재연결 |
| iOS 앱 | 클라우드 계속; 앱에 끊김 표시 |
| Termux | 세션 중단 |

### 폰에서 대형 프로젝트를 컴파일할 수 있나요?

권장하지 않습니다. 폰의 CPU와 메모리가 제한적이며, 대형 빌드는 다음을 유발할 수 있습니다:

- 심각한 발열
- 빠른 배터리 소모
- 매우 긴 컴파일 시간

무거운 빌드 작업은 원격 호스트나 클라우드 환경에서 실행하세요.

---

## 요약

Claude Code 모바일 개발의 핵심 아이디어: **폰은 컨트롤러이고, 실제 개발은 다른 곳에서 실행됩니다**.

어떤 방식을 선택해야 하는지는 구체적인 요구에 따라 다릅니다.

중국 본토에 계신다면 **Happy Coder**를 권장합니다. 특히 국내 API 릴레이 설정과 함께 사용할 때 좋습니다.

가장 편리한 설정을 원하시면 **Happy Coder**를 사용하세요. 스캔으로 연결하고, 푸시 알림을 받으며, 기기 전환이 원활합니다.

다중 모델 지원이나 로컬 우선 아키텍처가 필요하시면 **HAPI**를 사용하세요. 여러 어시스턴트를 지원하고 자체 호스팅 릴레이를 지원합니다.

가장 완전한 개발 경험을 원하시면 **SSH + Tailscale**을 사용하세요. 설정은 복잡하지만 기능이 데스크톱에 가장 가깝습니다.

중국 본토 외의 iOS 사용자라면 **공식 앱**이 가장 쉽게 시작할 수 있는 방법입니다.

Android 사용자라면 **Termux**를 사용하여 폰에서 완전한 로컬 개발을 할 수 있습니다.

항상 켜진 컴퓨터가 없다면 **클라우드 DevBox**가 이상적인 옵션입니다.

어떤 솔루션을 선택하든 보안이 중요합니다: 민감한 코드에 대해서는 타사 릴레이를 신중하게 사용하고, API 키를 적절히 관리하며, 중요한 프로젝트에서는 자체 호스팅 또는 비공개 경로를 선호하세요.

---

## 참고 자료

### 공식 리소스

- [Claude Code 공식 문서](https://docs.anthropic.com/en/docs/claude-code) - 완전한 공식 Claude Code 문서
- [Claude iOS 앱](https://apps.apple.com/app/claude/id6473753684) - 공식 iOS 앱

### 오픈소스 프로젝트

- [slopus/happy](https://github.com/slopus/happy) (2.5k 스타) - Happy Coder 모바일 클라이언트
- [tiann/hapi](https://github.com/tiann/hapi) - HAPI 로컬 우선 다중 모델 AI 코딩 어시스턴트
- [siteboon/claudecodeui](https://github.com/siteboon/claudecodeui) - Claude Code UI (CloudCLI)
- [juanfont/headscale](https://github.com/juanfont/headscale) (19k 스타) - 오픈소스 Tailscale 구현

### 중국어 튜토리얼

- [언제 어디서나 코딩: 폰에서 Claude Code 설정하기](https://m.blog.csdn.net/haa_y/article/details/151156494) - Termux 설정 가이드
- [주머니 속 AI 연구실: 항상 온라인 Claude Code 모바일 워크플로우](https://www.cnblogs.com/swizard/p/19308983) - Tmux + Docker 방식
- [여자친구와 쇼핑하면서 Claude Code 사용하기](https://post.m.smzdm.com/p/a3r7d63d/) - Tailscale 원격 연결
- [폰으로 프로덕션 앱 만들기](https://m.toutiao.com/article/7611823834756301318/) - 실제 모바일 개발 사례

### 영어 리소스

- [The Definitive Guide to Using Claude Code on Your Phone | Sealos Blog](https://sealos.io/blog/claude-code-on-phone/) - 가장 포괄적인 모바일 가이드
- [SSH + Tailscale + Termius 완전 가이드](https://m.blog.csdn.net/Lvyizhuo/article/details/157692953) - 상세한 원격 연결 가이드

### 도구 다운로드

- [Tailscale](https://tailscale.com/download) - 피어 투 피어 VPN 도구
- [Termux (F-Droid)](https://f-droid.org/en/packages/com.termux/) - Android 터미널 에뮬레이터
- [Blink Shell](https://blink.sh/) - iOS SSH 클라이언트 (MOSH 지원)
- [Termius](https://termius.com/) - 크로스 플랫폼 SSH 클라이언트
