# 로컬 PWA 앱 만들기: 웹사이트를 "실제 앱"으로 바꾸기

# 1 PWA와 PWA 개발이란

이 튜토리얼에서는 하나의 완전한 사이클을 완성할 것입니다: **일반 웹 프로젝트에서 데스크톱과 폰 홈 화면에 설치할 수 있고 오프라인에서도 작동하는 "실제 앱"까지.** 여러분이 직접 React 앱을 PWA로 변환하고, 온라인에 배포하며, 폰에 설치하여 테스트하게 됩니다.

우리가 만들 것은 **토마토 농장** 앱입니다 - 뽀모도로 기법과 농장 게임을 완벽하게 결합한 PWA입니다. 25분 집중 작업으로 포인트를 얻고, 그 포인트로 씨앗을 사서 작물을 심습니다. 레벨이 오르면 더 많은 농지와 더 좋은 씨앗을 잠금 해제할 수 있습니다. 가장 중요한 것은 인터넷 없이도 계속 작동하며, 모든 데이터가 로컬에 저장된다는 것입니다.

이 튜토리얼을 따라하려면 최소한 다음이 필요합니다:

- 컴퓨터(Windows 또는 Mac)
- Node.js 환경(버전 18.0 이상)
- AI 코딩 어시스턴트(Cursor / Trae / Claude Code 등)
- 폰(모바일 설치 테스트용)

## 1.1 PWA의 정의

**PWA(Progressive Web App)**는 특별한 종류의 웹사이트입니다. **Service Worker** 기술을 통해 "자신을 캐시하고接管하는" 능력을 얻습니다.

### 일반 웹사이트는 오프라인에서 작동하지 않지만 PWA는 작동하는 이유

일반 웹사이트는 열릴 때마다 서버에서 HTML, CSS, JS 파일을 다운로드해야 하므로, 네트워크가 다운되면 로드할 수 없습니다. 반면 PWA는 **Service Worker**(브라우저 백그라운드에서 실행되는 JS 스크립트)를 사용하여 첫 방문 시 이러한 파일을 로컬에 캐시합니다. 그 후 네트워크가 끊어져도 Service Worker가 로컬 캐시에서 직접 파일을 읽어 페이지를 정상적으로 표시할 수 있습니다.

**간단한 비유**: 일반 웹사이트는 매번 도서관에서 책을 빌리는 것과 같고(인터넷이 필수), PWA는 책을 사서 자기 책장에 올려놓는 것과 같습니다(첫 다운로드 후 오프라인에서도 읽을 수 있음).

### PWA vs 일반 웹사이트 vs 네이티브 앱

| 기능 | 일반 웹사이트 | PWA | 네이티브 앱 |
|------|---------|-----|---------|
| **설치** | 불필요 | 선택 사항(홈 화면에 추가) | 앱 스토어에서 다운로드 필수 |
| **오프라인 사용** | ❌ 아니오 | ✅ 예(캐싱 후) | ✅ 예 |
| **업데이트 방식** | 자동 새로고침 | 자동 / 백그라운드 업데이트 | 사용자 수동 업데이트 |
| **크기** | 없음 | 수백 KB ~ 수 MB | 수십 MB 이상 |
| **개발 비용** | 낮음 | 낮음(하나의 코드베이스) | 높음(iOS / Android 분리) |

**한 줄 요약**: PWA는 "자신의 파일을 저장할 수 있는 웹페이지"입니다 - 웹사이트의 가벼움(설치 불필요, 자동 업데이트)과 네이티브 앱의 경험(오프라인 지원, 데스크톱/홈 화면 설치 가능)을 모두 가지고 있습니다.

<!-- ![](/zh-cn/stage-3/cross-platform/pwa-local-app/images/image1.png) -->

## 1.2 왜 PWA를 선택할까?

Vibe Coding 시대에 PWA는 가장 비용 효율적인 "크로스 플랫폼 솔루션" 중 하나입니다:

| 비교 항목 | 네이티브 앱 | PWA |
|---------|---------|-----|
| 개발 비용 | iOS / Android / 데스크톱을 각각 개발해야 함 | 모든 플랫폼에 하나의 코드베이스 |
| 설치 | 앱 스토어에 가야 함 | 브라우저에서 직접 설치, 즉시 가능 |
| 업데이트 방식 | 사용자가 수동으로 업데이트해야 함 | 자동 업데이트, 사용자에게 보이지 않음 |
| 패키지 크기 | 보통 수십 MB | 보통 수백 KB에 불과 |
| 오프라인 지원 | 자연스럽게 내장 | Service Worker를 통해 지원 |
| 최적 시나리오 | 심층 하드웨어 접근 필요(AR / Bluetooth 등) | 콘텐츠 표시, 도구, 경량 앱 |

**한 줄 요약**: 앱이 카메라를 통한 AR이나 Bluetooth 하드웨어 접근이 필요하지 않다면, PWA가 거의 가장 쉬운 선택입니다.

## 1.5 튜토리얼 로드맵

학습 과정이 지루하지 않도록, 이 튜토리얼은 재미있고 실용적인 사례인 **토마토 농장**을 중심으로 진행됩니다. 뽀모도로 농장 게임으로 집중 작업과 게임화된 보상을 결합합니다. AI 코딩 어시스턴트의 Vibe Coding 모드와 함께, 제로에서 폰 설치까지의 과정을 재사용 가능한 루트로 나눕니다:

1. **이해와 환경 구축**: PWA가 무엇인지 이해하고, Node.js와 AI 코딩 어시스턴트를 설치하며, 툴체인이 원활한지 확인합니다.
2. **프로젝트 골격 구축**: 로컬에서 실행할 수 있는 React + TypeScript 프로젝트를 만듭니다.
3. **AI 반복 개발**: AI와의 대화를 통해 뽀모도로 카운트다운, 농장 시스템, 레벨 시스템, SVG 작물 렌더링 등을 구축합니다.
4. **PWA 설정 및 오프라인 테스트**: Service Worker와 Manifest를 추가한 후 오프라인 지원을 검증합니다.
5. **배포 및 폰 설치**: Vercel에 배포하여 HTTPS URL을 얻고, 폰에 설치하여 사용합니다.

이 섹션은 전체 그림만 제공하며, 정확한 명령은 아직 펼치지 않습니다. 지금은 메인 라인만 기억하세요: **환경 설정 -> 골격 구축 -> AI 설명 및 생성 -> PWA 설정 -> 배포 전달**. 다음 장에서 각 단계를 안내하겠습니다.

# 2 개발 환경 설정

## 2.1 이 튜토리얼에서 사용하는 도구

전체 개발 과정에서 세 가지 도구를 함께 사용하며, "설계", "구축", "검수"의 역할을 담당합니다.

- **AI 코딩 어시스턴트(Cursor / Trae / Claude Code)**: 당신의 **AI 코딩 파트너**입니다. Vibe Coding 모드에서는 더 이상 코드를 한 줄씩 작성할 필요가 없습니다. 대신 AI에게 자연어로 원하는 기능을 말하면 코드 생성과 수정을 처리합니다.
- **Node.js + Vite**: **프로젝트 빌드 공장**입니다. Node.js는 JavaScript 런타임을 제공하고, Vite는 차세대 프론트엔드 빌드 도구로 매우 빠른 속도를 자랑하며, 특히 PWA 구축에 적합합니다.
- **폰**: 실행 결과를 검증하는 **테스트 기기** 역할을 합니다. 폰의 브라우저에서 배포된 PWA에 직접 접속하여 실제 설치와 오프라인 기능을 테스트할 수 있습니다.

## 2.2 Node.js 설치

Node.js는 PWA 개발의 기본 환경입니다. 공식 웹사이트 [https://nodejs.org](https://nodejs.org)를 방문하여 **LTS(장기 지원)** 버전을 다운로드합니다(이 튜토리얼은 Node.js 18.x 이상 기준).

다운로드 후 일반 소프트웨어처럼 설치 프로그램을 더블클릭하고 기본 옵션을 유지합니다.

설치 후 터미널(Windows에서 CMD / PowerShell, Mac에서 Terminal)을 열고 실행합니다:

```bash
node --version
npm --version
```

`v18.17.0` 및 `9.6.7`과 같은 버전 출력이 보이면 설치가 성공한 것입니다.

<!-- 0 -->

## 2.3 AI 코딩 어시스턴트 설치

AI 코딩 어시스턴트는 **Vibe Coding**의 주요 전장입니다. 간단히 **"슈퍼 AI가 내장된 에디터"**라고 생각하면 됩니다.

**추천 선택:**

- **Trae**: [https://www.trae.cn](https://www.trae.cn)을 방문하여 OS에 맞는 버전을 다운로드합니다
- **Cursor**: [https://cursor.sh](https://cursor.sh)를 방문하여 설치합니다
- **Claude Code**: 이미 Claude를 사용 중이라면 Claude Code를 직접 사용할 수 있습니다

설치 과정은 일반 소프트웨어 설치와 같이 매우 간단합니다. 이 도구가 준비되면, 이후 실습에서는 지루한 코드 창을 바라볼 필요가 없습니다. 대신 프로젝트를 열고 채팅 상자에서 자연어로 AI에게 코드 작성과 버그 수정을 요청하게 됩니다.

<!-- 0 -->

## 2.4 새 프로젝트 만들기

AI 코딩 어시스턴트를 열고 채팅 상자에 다음 프롬프트를 입력합니다:

```text
Please help me create a React project named tomato-farm-pwa for building a Tomato Farm app.
It needs to support TypeScript, and also include PWA functionality (the kind that can be installed to a phone home screen).
```

AI가 자동으로 다음 단계를 수행합니다:

**1단계: 프로젝트 만들기**

```bash
npm create vite@latest tomato-farm-pwa -- --template react-ts
```

**2단계: 프로젝트로 이동하여 종속성 설치**

```bash
cd tomato-farm-pwa
npm install
```

**3단계: PWA 플러그인 설치**

```bash
npm install vite-plugin-pwa -D
```

AI가 완료되면 프로젝트 구조는 대략 다음과 같을 것입니다:

```text
tomato-farm-pwa/
├── public/              # 정적 에셋(아이콘, SVG 소재는 여기에)
├── src/
│   ├── App.tsx          # 메인 컴포넌트
│   ├── main.tsx         # 진입 파일
│   └── App.css          # 스타일
├── index.html           # HTML 진입점
├── vite.config.ts       # Vite 설정(PWA 설정은 여기에)
├── package.json
└── tsconfig.json
```

## 2.5 프로젝트 구조 이해

프로젝트가 생성된 후 몇 가지 핵심 파일의 역할을 이해해야 합니다:

| 파일 / 디렉토리 | 용도 |
|----------|---------|
| `src/App.tsx` | 메인 애플리케이션 컴포넌트, 핵심 페이지 로직이 작성되는 곳 |
| `src/main.tsx` | 애플리케이션 진입 파일, React 앱 마운트를 담당 |
| `vite.config.ts` | Vite 설정 파일, 핵심 PWA 설정이 작성되는 곳 |
| `public/` | 정적 에셋 디렉토리, PWA 아이콘과 SVG 소재가 들어가는 곳 |
| `index.html` | HTML 진입 파일, 보통 수정할 필요 없음 |

초보자로서 주로 세 가지 부분에 주의하면 됩니다:

- `App.tsx`: 프로그램 동작을 제어하고 "화면에 무엇이 나타나는지"를 결정합니다
- `vite.config.ts`: PWA 동작을 설정하고 "앱이 어떻게 설치되고 캐시되는지"를 결정합니다
- `public/`: 앱 아이콘과 에셋을 저장합니다

## 2.6 앱 아이콘 준비

PWA는 설치되기 전에 아이콘이 필요합니다. 최소한 **192x192**와 **512x512** 크기의 PNG 이미지 두 개가 필요합니다.

AI에게 생성을 요청할 수 있습니다:

```text
Please help me generate two app icons with sizes 192x192 and 512x512.
Use a green gradient background and draw a red tomato in the middle. Save them in the public folder.
```

또는 어떤 디자인 도구(Figma, Canva)를 사용하여 직접 아이콘을 만들어 `public/` 디렉토리에 넣을 수도 있습니다.

<!-- 0 -->

## 2.7 `vite-plugin-pwa` 설정

이것이 가장 중요한 단계입니다. `vite.config.ts`를 열고 AI에게 PWA 플러그인 설정을 요청합니다:

```text
Please help me change vite.config.ts into a PWA configuration so the webpage can be installed to a phone home screen:
- The app name is "Tomato Farm", with a green theme
- Use icon-192.png and icon-512.png from the public directory as icons
- Enable automatic updates
- Cache all js, css, html, and image files so the app can work offline
```

AI가 다음과 유사한 설정을 생성합니다:

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Tomato Farm',
        short_name: 'Tomato Farm',
        description: 'Focus, plant, and grow',
        theme_color: '#4CAF50',
        background_color: '#ffffff',
        display: 'standalone',
        icons: [
          {
            src: '/icon-192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/icon-512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}']
      }
    })
  ]
})
```

**핵심 설정 설명:**

* `registerType: 'autoUpdate'`: 새 버전을 게시하면 사용자가 다음에 열 때 앱이 자동으로 업데이트되며, 수동 조작이 필요 없습니다.
* `display: 'standalone'`: 설치 후 자체 창에서 실행되며, 브라우저 주소 표시줄이 없어 네이티브 앱처럼 느껴집니다.
* `workbox.globPatterns`: Service Worker에게 어떤 파일 유형을 캐시하여 오프라인에서도 접근할 수 있게 할지 알려줍니다.

<!-- 0 -->

# 3 토마토 농장 PWA 만들기

앞의 두 장에서 PWA가 무엇인지 이해하고 환경 설정을 완료했습니다. 이 섹션부터 이론만 논하는 것을 멈추고 실제 실습에 들어갑니다. Vibe Coding 모드를 사용하여 재미있고 실용적인 앱을 처음부터 만들 것입니다 - **토마토 농장**. 뽀모도로 기법과 게임화된 인센티브를 완벽하게 결합하며, PWA 개발의 핵심 요소를 다룹니다: **UI 상호작용(뽀모도로 타이머), 데이터 저장(포인트와 작물), 오프라인 기능(Service Worker 캐싱).**

자, AI에게 첫 번째 지시를 보내겠습니다.

## 3.1 첫 번째 "마스터 프롬프트": 제로에서 하나로

Vibe Coding 모드에서는 전통적인 접근 방식처럼 먼저 레이아웃 파일을 만들고 로직 코드를 작성할 필요가 없습니다. 우리가 해야 할 것은 **요구사항을 한 번에 명확하게 설명하고 AI가 첫 번째 실행 가능한 버전을 생성하도록 하는 것**입니다.

방금 만든 프로젝트 디렉토리를 AI 코딩 어시스턴트에서 열고 다음 프롬프트를 입력합니다:

```text
Please help me write the main page for the Tomato Farm app, with the following functions:

**Pomodoro Timer**
- A 25-minute countdown timer with start, pause, and reset
- Show remaining time and a progress bar
- Give the user 10 points after completing one focus session

**Farming System**
- 3 plots of farmland, but initially only the first one is available; the later ones are unlocked after leveling up
- A shop to buy seeds: carrot costs 5 points, tomato 10 points, corn 15 points
- After buying seeds and planting them, crops slowly grow, and when mature they can be harvested for points

**Level System**
- Level by total points: 0-100 points = Beginner Farmer, 100-300 = Skilled Farmer, above 300 = Farm Master
- Unlock new land and better seeds after leveling up

**UI Design**
- Top shows level, points, and upgrade progress bar
- Middle shows the Pomodoro countdown
- Below is the farmland grid
- Bottom has the shop button
- Use a green theme and make it look fresh and cute
- Must adapt to phone screens

**Data Saving**
- All data (points, level, farmland state) must be saved, and refreshing the page should not lose it
```

보내면 AI가 추론하고 프로젝트 구조를 분석하기 시작합니다. 몇 초 후 `App.tsx`의 전체 코드를 직접 생성합니다.

1. 응답에서 추론 로직과 상호작용 로직을 볼 수 있습니다
2. 어떤 코드가 변경되었는지 직접 볼 수 있습니다
3. 만족하지 못하면 이전 버전으로 롤백할 수 있습니다

<!-- 0 -->

## 3.2 실행 및 미리보기(로컬 개발 서버)

이제 AI가 첫 번째 개발 라운드를 완료했지만, 기억하세요: 코딩 어시스턴트에서 보는 것은 여전히 코드 "청사진"일 뿐 실제 상호작용 앱이 아닙니다. 코드를 실제로 실행하고 실제 효과를 보려면 로컬 개발 서버를 시작해야 합니다.

AI 코딩 어시스턴트의 터미널에서 다음을 실행합니다:

```bash
npm run dev
```

몇 초 후 터미널에 다음과 같은 출력이 표시됩니다:

```text
  VITE v5.0.0  ready in 300 ms

  ->  Local:   http://localhost:5173/
  ->  Network: use --host to expose
  ->  press h + enter to show help
```

브라우저에서 `http://localhost:5173/`을 열면 다음을 볼 수 있어야 합니다:

- 상단에 레벨, 포인트, 진행 표시줄
- 중간에 뽀모도로 카운트다운
- 아래에 농지 영역
- 하단에 상점 버튼

"집중 시작" 버튼을 클릭하여 카운트다운이 제대로 작동하는지 확인해 보세요. 농지 타일을 클릭하여 씨앗을 사고 심을 수 있는지 확인해 보세요. 이것이 PWA 앱의 첫 번째 버전입니다.

<!-- 0 -->

## 3.3 최적화 반복(SVG 작물 및 애니메이션 추가)

이 단계에서 앱은 이미 기본적인 형태를 갖추었습니다: 뽀모도로 타이머, 농장 시스템, 레벨 시스템. 하지만 여전히 조잡해 보일 수 있으며, 작물이 텍스트나 단순한 블록으로만 표시될 수 있습니다. 다음으로 아름다운 SVG 작물과 성장 애니메이션을 추가하여 토마토 농장에 생명을 불어넣을 것입니다.

**이것이 바로 Vibe Coding이 그토록 매력적인 이유입니다.** 전통적인 개발에서는 SVG 그래픽을 그리고 복잡한 성장 애니메이션을 만드는 것이 초보자에게 악몽일 수 있습니다. SVG 패스 그리기를 처리해야 할 뿐만 아니라 애니메이션 곡선도 계산해야 합니다. Vibe Coding 모드에서는 이러한 저수준 세부사항을 걱정할 필요가 없습니다. 감독처럼 AI에게 "작물에 더 예쁜 SVG 그래픽을 주고 애니메이션과 함께 자라게 해"라고 말하면 복잡한 코드가 거의 즉시 나타납니다.

**1단계: SVG 작물 에셋 준비**

AI에게 코드에서 직접 SVG를 그리도록 요청하거나, SVG 파일을 준비하여 `public/` 아래에 넣을 수 있습니다. 이 튜토리얼에서는 더 유연하므로 AI가 SVG 코드를 직접 생성하도록 권장합니다.

**2단계: 반복 지시 보내기**

AI 코딩 어시스턴트로 돌아가서 다음 프롬프트를 입력합니다:

```text
Please make the crops look better and add growth animation:

**Crop graphics**
- Carrot: orange body with green leaves
- Tomato: red round shape with little green leaves
- Corn: yellow corn cob with green outer leaves
Just use simple shapes

**Growth animation**
- When first planted, it starts as a small sprout and gradually grows to maturity
- Show 3 stages

**Harvest effect**
- When clicking a mature crop, play a simple harvest animation
- Show how many points were gained

**Overall polish**
- Farmland tiles should have borders and background color
- Crops should appear centered in the tile
- Overall style should feel a little cuter
```

AI가 코드를 다시 수정하고 SVG 렌더링과 애니메이션 로직을 처리합니다. 완료되면 브라우저를 새로고침하여 더 나은 작물 그래픽과 부드러운 성장 애니메이션을 볼 수 있습니다.

<!-- 0 -->

## 3.4 효과음 및 알림 추가(선택 사항)

토마토 농장을 더 몰입감 있게 만들고 싶다면 효과음과 알림도 추가할 수 있습니다. 이것도 간단한 프롬프트 하나면 됩니다:

```text
Please add sound effects and notifications to Tomato Farm:

**Sound effects**
- Play a "ding" when focus starts
- Play a victory sound when focus is completed
- Also add matching sound effects for planting and harvesting

**Notifications**
- Show "Congratulations, you finished a focus session!" after a focus cycle ends
- Show "Congratulations, you leveled up to XX!" when leveling up
- Show "You unlocked a new farmland plot!" when new land is unlocked

You can implement this with simple audio files or the Web Audio API
```

AI가 효과음과 알림을 추가하여 토마토 농장을 더 생동감 있고 즐겁게 만들어 줍니다.

<!-- 0 -->

# 4 로컬에서 PWA 체험하기

## 4.1 빌드 및 미리보기

PWA Service Worker는 프로덕션 빌드에서만 적용됩니다(개발 모드에서는 등록되지 않음). 따라서 먼저 빌드한 다음 미리보기를 해야 합니다:

```text
Please help me run these commands:
1. npm run build (build production version)
2. npm run preview (start local preview server)
```

빌드 후 Vite는 `dist/` 디렉토리에 모든 파일을 생성하며, 여기에는 자동 생성된 `sw.js`(Service Worker)와 `manifest.webmanifest`가 포함됩니다.

미리보기 서버가 시작되면 터미널에 표시된 주소(보통 `http://localhost:4173`)를 엽니다.

## 4.2 데스크톱에 PWA 설치

미리보기 URL을 열면 브라우저 주소 표시줄 오른쪽에 **설치 아이콘**이 나타나는 것을 볼 수 있습니다(보통 작은 다운로드 화살표 또는 "+" 기호).

**Chrome / Edge 설치 단계:**

1. 주소 표시줄 오른쪽의 설치 아이콘을 클릭합니다
2. 팝업 대화상자에서 **설치**를 클릭합니다
3. PWA가 독립 창에서 열리며, 데스크톱 / 시작 메뉴 / Dock에 바로 가기가 생성됩니다

설치된 PWA는 네이티브 데스크톱 앱처럼 보입니다 - 주소 표시줄도 없고, 탭도 없으며, 자체 창과 아이콘이 있습니다. 이제 언제든지 토마토 농장을 열고 집중과 농사를 시작할 수 있습니다.

<!-- 0 -->

**macOS Safari 설치 단계:**

1. Safari에서 PWA URL을 엽니다
2. 메뉴 막대에서 **파일 -> Dock에 추가**를 클릭합니다
3. PWA 아이콘이 Dock에 나타납니다

## 4.3 오프라인 기능 테스트

이것이 PWA의 가장 멋진 부분입니다. 오프라인 모드가 실제로 작동하는지 확인해 봅시다:

1. PWA가 브라우저에서 최소 한 번 열렸는지 확인합니다(Service Worker가 리소스를 캐시할 수 있도록)
2. **네트워크를 끕니다**(Wi-Fi를 끄거나 케이블을 뽑습니다)
3. 페이지를 새로고침합니다 - **토마토 농장이 여전히 정상적으로 로드되는 것을 발견할 것입니다!**
4. 뽀모도로 세션을 시작합니다 - 완료 후 포인트를 얻고, 씨앗을 사고, 작물을 심을 수 있으며 - 모든 데이터가 여전히 `localStorage`에 정상적으로 저장됩니다

Chrome DevTools(F12) -> Application -> Service Workers를 열어 Service Worker 상태와 캐시된 리소스 목록을 검사할 수도 있습니다.

<!-- 0 -->

## 4.4 데이터 지속성 및 동기화 옵션

이제 토마토 농장은 오프라인으로 실행할 수 있고, 모든 데이터가 브라우저의 `localStorage`에 저장됩니다. 하지만 한 가지 핵심 문제가 있습니다: **사용자가 기기를 바꾸거나 브라우저 데이터를 지우면 모든 농장 데이터가 손실됩니다.** 심각한 프로덕션 앱의 경우 데이터 지속성과 크로스 기기 동기화를 고려해야 합니다.

### 4.4.1 로컬 저장소의 한계

현재 사용 중인 `localStorage`에는 몇 가지 명백한 한계가 있습니다:

| 한계 | 설명 |
|--------|------|
| **기기 종속** | 데이터는 현재 기기의 현재 브라우저에만 저장됨; 기기를 바꾸면 손실됨 |
| **제한된 용량** | 보통 5-10MB의 저장 공간만 있음 |
| **쉽게 손실** | 브라우저 데이터를 지우거나 PWA를 제거하면 데이터 손실 발생 |
| **동기화 불가** | 폰의 진행 상황을 데스크톱에 동기화할 수 없음 |

토마토 농장이 단순히 개인 도구라면 문제가 되지 않을 수 있습니다. 하지만 사용자가 장기적으로 투자하고 데이터를 축적하기를 원한다면 더 안정적인 솔루션이 필요합니다.

### 4.4.2 옵션 1: 클라우드 동기화(권장)

가장 안정적인 솔루션은 데이터를 클라우드 데이터베이스에 동기화하는 것입니다. PWA의 경우 **Supabase**가 훌륭한 선택입니다 - PostgreSQL 데이터베이스, 실시간 구독, 인증을 제공하며, 무료 티어도 있습니다.

**구현 아이디어:**

1. **사용자 로그인**: 이메일 또는 소셜 로그인으로 사용자 신원 확립
2. **자동 데이터 동기화**: 모든 작업이 자동으로 클라우드에 저장
3. **오프라인 우선**: 오프라인에서도 앱이 작동하고, 네트워크가 복구되면 자동으로 동기화
4. **크로스 기기 동기화**: 폰의 진행 상황이 데스크톱에서 즉시 사용 가능

**프롬프트 예시:**

```text
Please help me migrate Tomato Farm data storage from localStorage to Supabase cloud sync:

**Functional requirements**
- Add user login (email + password or Google login)
- Save user data (points, level, farmland state) to Supabase database
- Still work offline, and automatically sync when the network recovers
- Support multi-device sync, so crops planted on the phone can also be seen on desktop

**Tech stack**
- Use @supabase/supabase-js client
- Implement optimistic updates (update UI first, then sync to cloud)
- Add a simple sync status indicator
```

**장점:**

- 데이터가 손실되지 않음; 기기를 바꿀 때 사용자는 다시 로그인만 하면 됨
- 개인 프로젝트에는 무료 티어로 충분함
- 실시간 구독을 지원하여 좋은 멀티 기기 동기화 경험 제공

**단점:**

- 사용자 등록/로그인이 필요하여 사용에 마찰이 추가됨
- 동기화를 수행하려면 네트워크 연결이 필요함

### 4.4.3 옵션 2: 내보내기 / 가져오기 백업

백엔드 서비스를 추가하고 싶지 않다면 더 간단한 타협안은 **수동 백업 및 복원**입니다.

**구현 아이디어:**

1. **내보내기**: 농장 데이터를 JSON 파일로 패키징하여 사용자가 다운로드할 수 있게 함
2. **가져오기**: 사용자가 이전에 내보낸 JSON 파일을 선택하여 데이터를 복원할 수 있음
3. **자동 알림**: 정기적으로 백업하라고 사용자에게 알림

**프롬프트 예시:**

```text
Please add data backup functionality to Tomato Farm:

**Export**
- Add an "Export Data" button on the settings page
- Package all data in localStorage into a JSON file
- Automatically download it to the user's device

**Import**
- Add an "Import Data" button that accepts a JSON file
- Validate file format before restoring
- Show a warning before import because it overwrites current data

**Automatic reminders**
- If the user has not backed up for over 7 days, show a friendly reminder
```

**장점:**

- 구현이 간단하고 백엔드 서비스가 필요 없음
- 사용자가 자신의 데이터를 완전히 통제함
- 내보낸 파일을 공유하여 기기 간 전송 가능

**단점:**

- 수동 조작이 필요하여 경험이 매끄럽지 않음
- 사용자가 백업을 잊어버리면 데이터가 여전히 손실될 수 있음

### 4.4.4 옵션 3: 브라우저 확장 프로그램 동기화(Chrome 사용자용)

PWA가 주로 Chrome 사용자를 대상으로 한다면 **Chrome Storage Sync API**를 고려할 수 있습니다. 이것은 Chrome에서 제공하는 크로스 기기 동기화된 저장 서비스로, 데이터가 사용자의 Google 계정과 자동으로 동기화됩니다.

**참고:** 이것은 PWA를 Chrome 확장 프로그램으로도 패키징해야 하므로, 기술 경험이 있는 개발자에게 더 적합합니다.

### 4.4.5 권장 선택 전략

| 시나리오 | 권장 솔루션 |
|------|----------|
| 개인 경량 도구 | `localStorage`만으로 충분함 |
| 데이터 손실을 피하고 싶지만 복잡성은 피하고 싶음 | 내보내기 / 가져오기 백업 |
| 더 나은 사용자 경험을 갖춘 공식 제품 | Supabase 클라우드 동기화 |
| 주로 Chrome 사용자용 | Chrome Storage Sync |

**토마토 농장 같은 앱의 경우, 제 제안은:**

1. **MVP 단계**: `localStorage`로 시작하여 제품 아이디어를 빠르게 검증
2. **반복 단계**: 내보내기 / 가져오기 백업을 추가하여 사용자에게 데이터 안전망 제공
3. **성숙 단계**: Supabase를 통합하여 진정한 클라우드 동기화 달성

기억하세요: **점진적 향상**이 PWA의 핵심 철학입니다. 먼저 앱이 실행되게 만들고, 점진적으로 더 고급 기능을 추가하세요.

<!-- 0 -->

# 5 온라인 배포

PWA는 올바르게 작동하려면 HTTPS에서 실행되어야 합니다. 좋은 소식은 주류 배포 플랫폼이 이제 자동으로 무료 HTTPS를 제공한다는 것입니다. **Vercel**을 예로 사용하겠습니다(Netlify나 GitHub Pages를 사용할 수도 있습니다).

## 5.1 Vercel에 배포

**1단계: 배포 도구 설치**

```text
Please help me install Vercel's deployment tool
```

**2단계: 프로젝트 배포**

```text
Please help me deploy this project to Vercel. The project name is tomato-farm-pwa
```

AI가 배포 단계를 자동으로 처리합니다. 다음만 하면 됩니다:
- 계정 선택
- 새 프로젝트 생성 확인
- 다른 옵션은 기본값 유지

수십 초를 기다리면 Vercel이 자동으로 프로젝트를 빌드하고 배포합니다. 완료되면 `https://tomato-farm-pwa.vercel.app`와 같은 HTTPS URL을 얻게 됩니다.

<!-- 0 -->

**3단계: PWA 확인**

배포된 URL을 브라우저에서 열면 다음을 볼 수 있어야 합니다:

1. 주소 표시줄 오른쪽에 설치 아이콘이 나타남
2. DevTools -> Application -> Manifest에서 "Tomato Farm" 이름과 같은 구성된 앱 정보
3. Service Workers 탭에서 Service Worker가 활성화된 것으로 표시됨

## 5.2 GitHub Pages로 배포(대안)

GitHub Pages를 선호한다면 추가 경로 설정이 필요합니다:

```text
Please help me modify the config so the project can be deployed to GitHub Pages.
My repository name is tomato-farm-pwa, so please adjust the path configuration accordingly.
```

그런 다음 빌드 출력을 GitHub 저장소의 `gh-pages` 브랜치에 푸시합니다.

# 6 폰에 PWA 설치

이것이 가장 신나는 부분입니다 - 토마토 농장 웹페이지를 폰의 "앱"으로 바꾸는 것.

## 6.1 Android에 설치

1. 폰의 **Chrome 브라우저**에서 배포된 토마토 농장 PWA URL을 엽니다
2. Chrome이 자동으로 **"홈 화면에 추가"** 프롬프트 배너를 표시할 수 있습니다 - 그냥 클릭하세요
3. 자동으로 표시되지 않으면 오른쪽 상단의 **세 점 메뉴**를 탭 -> **앱 설치** 또는 **홈 화면에 추가**
4. 설치를 확인하면 폰 홈 화면에 토마토 농장 앱 아이콘이 나타납니다

열어보면 전체 화면 모드로 실행되며, 브라우저 주소 표시줄이나 탐색 버튼이 없어 네이티브 앱과 거의 동일하게 보입니다. 이제 언제든지 집중하고 농사를 지을 수 있습니다.

<!-- 0 -->

## 6.2 iPhone에 설치

iOS에서 PWA는 **Safari** 브라우저를 통해서만 설치할 수 있습니다(다른 브라우저는 설치를 지원하지 않음):

1. **Safari**에서 배포된 토마토 농장 PWA URL을 엽니다
2. 하단의 **공유** 버튼(위쪽 화살표가 있는 사각형)을 탭합니다
3. 메뉴에서 **홈 화면에 추가**를 선택합니다
4. 앱 이름을 입력하고 **추가**를 탭합니다

iOS 26부터 홈 화면에 추가된 모든 웹사이트는 기본적으로 독립 앱 모드로 열리며, 이는 주요 개선 사항입니다.

<!-- 0 -->

> **iOS의 알려진 제한 사항:**
> * 푸시 알림은 iOS 16.4 이상이 필요하며, PWA가 이미 홈 화면에 추가되어 있어야 함
> * Background Sync는 지원되지 않음
> * 저장 공간이 Android보다 더 제한적임

## 6.3 Lighthouse로 PWA 감사

Google은 **Lighthouse**라는 도구를 제공하여 PWA에 점수를 매깁니다. Chrome DevTools(F12) -> Lighthouse -> "Progressive Web App" 체크 -> "Analyze page load" 클릭.

합격한 토마토 농장 PWA는 PWA 카테고리에서 만점을 받아야 합니다. 그렇지 않다면 Lighthouse가 정확한 이유와 수정 제안을 알려줍니다.

<!-- 0 -->

# 7 마무리

축하합니다! 데스크톱과 모바일 모두에 설치할 수 있는 뽀모도로 농장 PWA를 성공적으로 만들었습니다. 우리가 한 일을 되돌아보겠습니다:

1. Vite + React로 토마토 농장 웹 앱을 만듦
2. `vite-plugin-pwa`를 통해 Service Worker와 Manifest를 추가함
3. Vercel에 배포하여 HTTPS URL을 얻음
4. 데스크톱과 모바일 모두에 성공적으로 설치하고 오프라인 기능을 테스트함

이제 토마토 농장 PWA는 다음을 달성할 수 있습니다:
* **집중 농사**: 뽀모도로 메커니즘을 통해 사용자가 집중하도록 도움
* **게임화된 보상**: 심기, 레벨업, 잠금 해제를 사용하여 반복 사용 동기 부여
* **오프라인 사용 가능**: 네트워크가 없어도 사용자는 여전히 집중하고, 심고, 농장을 관리할 수 있음
* **크로스 플랫폼 설치**: 한 번 개발하여 여러 종류의 기기에 설치 가능

PWA의 매력은 "점진성"에 있습니다 - 처음부터 완벽하게 만들 필요가 없습니다. 먼저 웹사이트를 설치 가능하고 오프라인에서 사용할 수 있게 만든 다음, 점진적으로 푸시 알림과 백그라운드 동기화와 같은 고급 기능을 추가하세요.

**고급 방향:**

* **푸시 알림**: Push API + Notification API를 사용하여 뽀모도로가 끝나거나 작물이 수확할 준비가 되었을 때 사용자에게 알림
* **백그라운드 동기화**: Background Sync API를 사용하여 네트워크가 복구된 후 농장 데이터를 클라우드에 동기화
* **더 스마트한 캐싱 전략**: 다양한 종류의 에셋에 대해 CacheFirst, NetworkFirst, StaleWhileRevalidate와 같은 다른 Workbox 전략 사용
* **앱 스토어에 게시**: [PWA Builder](https://www.pwabuilder.com/)를 사용하여 토마토 농장 PWA를 Android APK 또는 Microsoft Store 앱으로 패키징
* **소셜 기능**: 친구 시스템을 추가하여 사용자가 서로의 농장을 방문하고 작물을 교환할 수 있게 함

***하나의 코드베이스, 모든 플랫폼 - 이것이 PWA의 힘입니다. 집중하고, 심고, 성장하세요!***

# 참고 자료

* [Vite PWA 공식 문서](https://vite-pwa-org.netlify.app/guide/)
* [Google PWA 개발 가이드](https://web.dev/progressive-web-apps/)
* [MDN Web App Manifest 문서](https://developer.mozilla.org/en-US/docs/Web/Manifest)
* [Workbox 캐싱 전략 개요](https://developer.chrome.com/docs/workbox/caching-strategies-overview/)
* [PWA Builder - PWA를 앱 스토어에 게시](https://www.pwabuilder.com/)
