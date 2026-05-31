# 애플리케이션에 적합한 플랫폼 선택 방법

아이디어가 있고 이를 실제 제품으로 만들고 싶습니다. 하지만 위챗 미니 프로그램, iOS 앱, Android 앱, 웹사이트, 브라우저 확장 프로그램, 데스크톱 애플리케이션 등 많은 플랫폼 옵션이 있습니다. 어디서 시작해야 할까요?

::: tip 💡 빠른 탐색
각 플랫폼의 특징을 이미 알고 있다면, 바로 [2절](#2-먼저-세-가지-질문을-스스로에게-해보세요)의 의사결정 프로세스로 이동하거나, [7절의 의사결정 흐름도](#7-요약-플랫폼-선택-의사결정-흐름)을 참조하세요.
:::

이 글은 생각을 정리하고 구체적인 시나리오에 가장 적합한 개발 플랫폼을 찾도록 도와줍니다.

## 1 먼저 이 플랫폼들을 알아보세요

"어떤 것을 선택할지" 논의하기 전에, "어떤 것들이 있는지" 먼저 알아봅시다. 현재 주류 플랫폼 카테고리는 다음과 같습니다:

### 1.1 모바일 플랫폼

#### iOS 네이티브 앱

iPhone에서 App Store를 통해 다운로드하는 앱들이 iOS 네이티브 앱입니다. 특징은: 빠른 실행, 부드러운 경험, 휴대폰 기능(카메라, 위치, 건강 데이터 등)에 완전히 접근 가능합니다. 하지만 개발에는 Mac이 필요하고, App Store 배포에는 Apple의 심사가 필요합니다.

**대표 예시**: 위챗, Douyin(TikTok China), 샤오홍슈, Keep, 메이퇀, 알리페이

#### Android 네이티브 앱

Android 앱 스토어에서 다운로드하거나, 친구가 보낸 APK 파일로 설치하는 앱들이 Android 네이티브 앱입니다. iOS 앱과 유사하지만, Android는 사용자가 더 많고 배포 채널이 더 다양합니다. 단점은 기기 파편화입니다: 개발자가 많은 화면 크기와 시스템 버전에 대응해야 합니다.

**대표 예시**: Tasker(자동화), MX Player(비디오 플레이어), AirDroid(휴대폰 관리), Greenify(배터리 최적화), Xposed Framework(시스템 커스터마이징)

#### 위챗 미니 프로그램

위챗 안에서 코드를 스캔하거나 이름으로 검색하여 바로 사용할 수 있는 "작은 앱"으로, 설치가 필요 없습니다. 장점은 사용자 마찰이 낮다는 것입니다: 모두가 이미 위챗을 가지고 있어 즉시 시작할 수 있습니다. 단점은 기능이 제한적이며, 위챗 내에서만 실행된다는 것입니다.

**대표 예시**: 핀둬둬(공동구매 이커머스), 메이퇀 와이마이(로컬 서비스), 모바이크(공유 자전거), 점프 점프(미니 게임), 저우헤이야(주문/쇼핑)

#### PWA(Progressive Web App)

기술적으로 들리지만, 기본적으로 "앱처럼 설치할 수 있는 웹 페이지"입니다. 모바일 브라우저에서 사이트를 열면 "홈 화면에 추가"라는 옵션이 보일 수 있습니다. 한 번 탭하면 홈 화면에 아이콘이 나타나고 앱처럼 작동합니다. 장점은 모바일과 데스크톱을 하나의 코드베이스로 커버한다는 것입니다. 단점은 많은 사용자가 이 사용 방식을 모른다는 것입니다.

**대표 예시**: Twitter Lite, Starbucks, Pinterest, Uber, Spotify Web Player

### 1.2 데스크톱 플랫폼

#### Electron 데스크톱 앱

매일 사용할 수 있습니다: VS Code, Slack, Discord, Notion, Figma - 모두 Electron으로 구축되었습니다. 핵심 특징은: 웹 기술(HTML, CSS, JavaScript)을 사용하여 데스크톱 소프트웨어를 구축하고, 하나의 코드베이스로 Windows, Mac, Linux에서 실행합니다. 단점은 설치 프로그램이 크고 실행 시 메모리 사용량이 높습니다.

**대표 예시**: VS Code, Slack, Discord, Notion, Figma, 위챗 개발자 도구

#### Qt 데스크톱 애플리케이션

WPS, VirtualBox, 또는 OBS를 사용해 본 적이 있다면, 이들이 Qt로 구축되었을 수 있습니다. Qt는 C++를 사용하며, 성능과 안정성이 좋고 특히 산업 시나리오에 적합합니다. 하지만 학습 곡선이 높고 C++ 지식이 필요합니다.

**대표 예시**: WPS Office, VirtualBox, Autodesk Maya, Telegram Desktop, OBS Studio

#### 네이티브 데스크톱 애플리케이션

이 "헤비급" 애플리케이션은 보통 네이티브 기술로 구축됩니다. Windows는 주로 C#이나 C++를 사용하고, macOS는 Swift를 사용합니다. 최고의 성능과 가장 부드러운 경험을 제공하지만, Windows와 macOS 버전을 별도로 개발해야 하므로 비용이 많이 듭니다.

**대표 예시**: Microsoft Office, Adobe Photoshop, Final Cut Pro, 위챗(Windows/Mac), QQ 뮤직

### 1.3 웹 관련 플랫폼

#### 웹사이트

브라우저에서 URL을 입력하여 열리는 페이지들입니다. 장점: 모든 기기(휴대폰, 컴퓨터, 태블릿)에서 접근 가능, 설치 불필요, 검색 엔진으로 검색 가능. 단점: 인터넷 연결이 필요하므로 오프라인 사용이 불가합니다.

**대표 예시**: 타오바오, 즈후, GitHub, 빌리빌리, 제인, CSDN

#### 브라우저 확장 프로그램

광고 차단기, 번역 도구, 비밀번호 관리자를 사용해 본 적이 있나요? 이들이 브라우저 확장 프로그램입니다. 브라우저 내에서 실행되며 웹 페이지 내용을 읽고/수정할 수 있습니다. 예를 들어, 번역 확장 프로그램을 설치하면 영어 페이지를 원클릭으로 번역할 수 있습니다. 장점: 가볍고 브라우저와 함께 시작됨. 단점: 브라우저에서만 작동하며, Chrome, Edge, Firefox 간에 확장 프로그램이 항상 호환되지는 않습니다.

**대표 예시**: AdBlock Plus, 몰입형 번역, 1Password, Grammarly, Tampermonkey, Dark Reader

### 1.4 기타 플랫폼

#### VS Code 확장 프로그램

개발자라면 VS Code를 사용할 가능성이 높습니다. VS Code 확장 프로그램은 편집기에 "기능을 추가"하는 작은 프로그램입니다. 장점: 매우 타겟된 개발자 대상. 단점: 개발자 사용자에게만 유용합니다.

**대표 예시**: Prettier, GitLens, GitHub Copilot, ESLint, Live Server, 중국어 언어 팩

#### NFT 스마트 컨트랙트

NFT에 대해 들어본 적이 있을 것입니다 - 수백만에 팔린 그 "디지털 아바타"들. NFT는 본질적으로 블록체인 기반의 소유권 증명서로, 디지털 아이템이 귀하의 것임을 증명합니다. 스마트 컨트랙트는 블록체인에서 실행되는 프로그램으로 NFT를 생성하고 관리합니다. 장점: 변조 불가능하고 거래 가능. 단점: 기술적 진입 장벽이 높고 시장 변동성이 큽니다.

**대표 예시**: BAYC, CryptoPunks, NBA Top Shot, Azuki, Moonbirds

### 1.5 더 많은 옵션이 있나요?

위의 플랫폼 외에도 "중간 경로"와 더 많은 가능성이 있습니다:

#### 크로스 플랫폼 프레임워크

::: details 클릭하여 크로스 플랫폼 프레임워크 세부 정보 보기

**React Native / Flutter**: iOS와 Android 모두를 원하지만 두 개의 코드베이스를 작성하고 싶지 않은가요? 이 프레임워크를 사용하면 한 번 작성하여 두 플랫폼용 앱을 생성할 수 있습니다. Airbnb와 Instagram 같은 많은 기업이 사용합니다.

**Tauri**: Electron의 "경량 대안"입니다. 웹 기술로 데스크톱 앱을 구축하지만 설치 프로그램이 더 작고 실행이 더 빠릅니다. 단점: 생태계가 덜 성숙함.

**uni-app**: 중국에서 매우 인기입니다. 하나의 코드베이스로 위챗 미니 프로그램, iOS 앱, Android 앱, H5 웹사이트를 타겟할 수 있습니다. "한 번 구축, 어디서나 실행"을 원하는 팀에 적합합니다.

**Capacitor / Ionic**: 이미 웹사이트가 있고 빠르게 앱으로 변환하고 싶은가요? 이 도구들은 웹사이트를 앱 스토어용 설치 가능한 앱으로 "래핑"할 수 있습니다.

이 프레임워크는 본질적으로 네이티브와 웹 개발 사이의 트레이드오프입니다: 개발 효율성은 높지만 성능과 경험에서 일부 타협이 필요합니다.
:::

#### 중국 미니 프로그램 생태계

::: details 클릭하여 중국의 미니 프로그램 옵션 보기

**알리페이 미니 프로그램**: 금융 및 로컬 서비스 시나리오. 사용자가 알리페이에서 공과금 납부, 음식 주문, 대중교통 이용을 한다면 알리페이 미니 프로그램이 적합합니다. 즈마 신용과 신뢰 신원 같은 기능은 알리페이만의 고유한 것입니다.

**도우인 미니 프로그램**: 콘텐츠 커머스와 라이브 방송 판매. 도우인에서 판매한다면, 미니 프로그램을 영상 아래에 연결하여 즉각적인 전환을 만들 수 있습니다.

**콰이서우 미니 프로그램**: 하위 시장과 강력한 커뮤니티 경제. 콰이서우 사용자는 참여도가 높아 커뮤니티 공동구매와 로컬 서비스에 적합합니다.

**바이두 미니 프로그램**: 검색 트래픽 진입점. 사용자가 바이두에서 "근처 식당"을 검색하면, 미니 프로그램이 결과에 직접 나타날 수 있습니다.
:::

#### HarmonyOS 생태계

**HarmonyOS 앱**: Huawei 휴대폰, 태블릿, 워치, 스마트 홈 기기에서 실행 가능. ArkTS(TypeScript와 유사)로 개발하며, 하나의 코드베이스로 여러 기기를 지원합니다. 대상 고객이 Huawei 생태계에 있거나 제품이 IoT 연동과 관련이 있다면 HarmonyOS가 주요 옵션입니다.

#### 추가 개발자 도구

::: details 클릭하여 더 많은 개발자 도구 옵션 보기

**명령줄 도구(CLI)**: 개발자는 매일 터미널을 사용합니다. CLI 도구는 반복적인 작업을 자동화하고, 코드 템플릿을 생성하고, 프로젝트를 배포할 수 있습니다. 예: `create-react-app`, `git`, `npm`. 개발자 생산성과 DevOps 자동화에 적합합니다.

**JetBrains 플러그인**: VS Code 외에도 많은 개발자가 IntelliJ IDEA, PyCharm, WebStorm을 사용합니다. 도구가 Java, Python, 또는 프론트엔드 개발자를 대상으로 한다면 JetBrains Marketplace도 고려해 볼 만합니다.

**Cursor / Windsurf 플러그인**: AI 코딩 도구를 위한 새로운 생태계. AI 보조 코딩 기능을 구축 중이라면, 이 IDE 플러그인 생태계가 빠르게 성장하고 있습니다.
:::

#### 커뮤니티 봇

::: details 클릭하여 커뮤니티 봇 옵션 보기

**Telegram Bot**: 해외 사용자 기반이 크고 개발자 친화적인 API를 제공합니다. 알림, 자동화 작업, 커뮤니티 관리에 적합합니다. 많은 크립토 프로젝트와 개발자 커뮤니티가 Telegram을 사용합니다.

**Discord Bot**: 게임과 개발자 커뮤니티의 핵심 플랫폼. 음악 재생, 게임 데이터 조회, 서버 관리에 유용합니다. 사용자가 게이머나 해외 개발자라면 Discord 봇이 필수적인 경우가 많습니다.
:::

#### 디자인 및 생산성 도구

::: details 클릭하여 디자인 도구 옵션 보기

**Figma 플러그인**: 디자이너들은 매일 Figma를 사용합니다. 플러그인은 디자인 워크플로를 자동화하고, 코드를 생성하고, 디자인 시스템을 관리할 수 있습니다. 디자인 도구와 프론트엔드 지원에 적합합니다.

**Notion 통합**: Notion API를 사용하면 워크플로를 자동화하고, 데이터를 동기화하고, 보고서를 생성할 수 있습니다. 지식 관리와 프로젝트 관리 도구에 적합합니다.
:::

#### 공간 컴퓨팅

**visionOS 앱(Apple Vision Pro)**: 공간 컴퓨팅의 새로운 시대. 3D 콘텐츠 표시, 몰입형 경험, 교육/훈련, 가상 협업에 적합합니다. 기술적 진입 장벽이 높지만, 최첨단 탐색을 위해서는 미래 방향입니다.

---

## 2 먼저 세 가지 질문을 스스로에게 해보세요

플랫폼을 선택하기 전에 다음 세 가지 핵심 질문에 답해 보세요:

<el-card shadow="hover" style="margin: 20px 0; border-radius: 12px; border-left: 4px solid #409EFF;">
  <template #header>
    <div style="display: flex; align-items: center; gap: 8px;">
      <span style="font-size: 20px;">🎯</span>
      <span style="font-weight: bold; font-size: 16px;">질문 1: 사용자가 어디에 있나요?</span>
    </div>
  </template>
  <div style="line-height: 1.8; color: #606266;">
    <ul>
      <li>사용자가 언제 어디서나 사용해야 하나요? (모바일 우선)</li>
      <li>사용자가 위챗 안에서 작업을 완료하는 데 익숙한가요? (미니 프로그램)</li>
      <li>사용자가 사무실 환경에서 오래 사용하나요? (데스크톱 앱)</li>
      <li>사용자가 검색 엔진을 통해 찾아야 하나요? (웹사이트)</li>
    </ul>
  </div>
</el-card>

<el-card shadow="hover" style="margin: 20px 0; border-radius: 12px; border-left: 4px solid #67C23A;">
  <template #header>
    <div style="display: flex; align-items: center; gap: 8px;">
      <span style="font-size: 20px;">⚡</span>
      <span style="font-weight: bold; font-size: 16px;">질문 2: 앱에 어떤 기능이 필요한가요?</span>
    </div>
  </template>
  <div style="line-height: 1.8; color: #606266;">
    <ul>
      <li>카메라, 마이크, GPS 또는 기타 하드웨어 접근이 필요한가요?</li>
      <li>오프라인 지원이 필요한가요?</li>
      <li>푸시 알림이 필요한가요?</li>
      <li>대량의 로컬 데이터를 처리해야 하나요?</li>
    </ul>
  </div>
</el-card>

<el-card shadow="hover" style="margin: 20px 0; border-radius: 12px; border-left: 4px solid #E6A23C;">
  <template #header>
    <div style="display: flex; align-items: center; gap: 8px;">
      <span style="font-size: 20px;">💰</span>
      <span style="font-weight: bold; font-size: 16px;">질문 3: 얼마나 많은 자원이 있나요?</span>
    </div>
  </template>
  <div style="line-height: 1.8; color: #606266;">
    <ul>
      <li>개발 시간 예산은 어떻게 되나요?</li>
      <li>Mac 기기가 있나요(iOS 개발에 필요)?</li>
      <li>여러 플랫폼을 동시에 커버해야 하나요?</li>
    </ul>
  </div>
</el-card>

---

## 3 플랫폼 선택 의사결정표

이 표를 사용하여 적합한 플랫폼을 빠르게 파악하세요:

| 사용자 시나리오 | 추천 플랫폼 | 이유 |
|---------|---------|------|
| 사용자가 위챗 생태계에 있고 빠른 사용자 확보를 원함 | <el-tag type="success">위챗 미니 프로그램</el-tag> | 다운로드 불필요, 위챗 공유 용이, 획득 비용 낮음 |
| 백그라운드에서 지속적인 GPS 추적과 건강 데이터 접근 필요 | <el-tag type="primary">iOS / Android 네이티브</el-tag> | 직접 시스템 API 접근, 최고 성능 |
| 여러 플랫폼을 하나의 코드베이스로 커버하고 싶음 | <el-tag type="warning">PWA / Electron</el-tag> | 효율성 높음, 유지보수 비용 낮음 |
| 사용자가 컴퓨터에서 장시간 사용 | <el-tag type="primary">데스크톱 앱</el-tag> (Electron / Qt) | 별도 창, 오프라인 지원, 강력한 시스템 통합 |
| 탐색 중 자동 요약/번역/비밀번호 관리 필요 | <el-tag type="info">브라우저 확장 프로그램</el-tag> | 웹페이지 내용 읽기/수정 가능, 브라우저와 함께 실행 |
| 기술 문서/프로젝트 쇼케이스를 Google에 인덱싱하고 싶음 | <el-tag type="warning">웹사이트 / 개인 블로그</el-tag> | SEO 친화적, 검색 가능한 콘텐츠 |
| 거래 가능한 디지털 멤버십 카드나 수집품을 발행하고 싶음 | <el-tag type="danger">NFT 스마트 컨트랙트</el-tag> | 온체인 소유권, 전송/거래 가능 |

---

## 4 실용적인 시나리오 예시

### 시나리오 1: 커뮤니티 공동구매 도구를 만들고 싶어요

**💡 추천: 위챗 미니 프로그램**

왜 미니 프로그램인가?

- **사용자가 이미 위챗에 있음**: 커뮤니티 사용자가 위챗 그룹에서 활동하며, 미니 프로그램은 그룹에서 직접 공유 가능
- **쓰고 버리는 행동**: 야채를 주문하기 위해 전용 앱을 설치하는 것을 원하는 사람은 없음
- **매끄러운 결제**: 원탭 위챗 페이, 컨텍스트 전환 없음
- **낮은 획득 비용**: 그룹 공유 흐름 하나로 수십 명의 사용자 확보 가능

::: tip 💡 적용 가능한 시나리오
제품이 유사한 경우 - 공동구매, 예약, 설문조사, 이벤트 신청 - 미니 프로그램이 보통 첫 번째 선택입니다.
:::

---

### 시나리오 2: 러닝 트래커 앱을 만들고 싶어요

**⚡ 추천: iOS / Android 네이티브**

왜 네이티브 앱인가?

- **백그라운드 실행**: 러닝 중 경로를 계속 추적해야 하며, 미니 프로그램과 웹사이트는 이를 안정적으로 할 수 없음
- **GPS 정밀도**: 네이티브 앱은 오차 범위가 작은 고정밀 위치에 접근 가능
- **건강 데이터 접근**: 걸음 수와 심박수 접근에는 Apple HealthKit / Google Fit 필요
- **안정적인 푸시 알림**: 매일 "러닝할 시간이에요" 알림은 네이티브 푸시로 구현하는 것이 가장 좋음

::: warning ⚠️ 중요 참고
**장기 백그라운드 실행**이나 **깊은 하드웨어 접근**이 필요한 앱은 네이티브 개발을 선택해야 합니다.
:::

---

### 시나리오 3: 가계부 앱을 만들고 싶어요

**📝 추천: PWA 또는 미니 프로그램**

왜?

- **빈도는 높지만 짧은 사용**: 하루에 한 번 기록, 30초면 완료
- **복잡한 하드웨어 필요 없음**: 대부분 데이터 입력과 표시
- **강력한 크로스 플랫폼 요구**: 휴대폰에서 기록하고 데스크톱에서 보고서 확인
- **오프라인 시나리오**: 신호가 없는 지하철에서 지출을 기록하고 싶을 수 있음

PWA는 홈 화면에 설치할 수 있고 앱처럼 느껴지지만, 개발 비용은 네이티브의 약 1/3입니다. 중국 사용자에게는 미니 프로그램이 더 나을 수 있습니다.

---

### 시나리오 4: 온라인 교육 플랫폼을 만들고 싶어요

**📚 추천: 웹사이트 + 미니 프로그램 조합**

왜?

- **웹사이트가 획득 담당**: 강의 페이지, 강사 소개, SEO 최적화
- **미니 프로그램이 전환 담당**: 체험 수업, 등록 결제, QR 코드로 그룹 가입
- **웹사이트가 전달 담당**: 비디오 재생은 더 큰 웹 화면에서 더 좋음
- **미니 프로그램이 터치포인트 담당**: 수업 알림 및 과제 알림

::: tip 💡 조합 전략
복잡한 비즈니스는 단일 플랫폼이 아닌 **다중 플랫폼 조합**이 필요한 경우가 많습니다.
:::

---

### 시나리오 5: 팀 협업 도구를 만들고 싶어요

**🤝 추천: Electron 데스크톱 앱 + 웹 버전**

왜?

- **데스크톱 측**: 직장인들이 컴퓨터를 계속 켜두며, 데스크톱 앱이 상주하며 메시지를 수신할 수 있음
- **웹 측**: 다른 컴퓨터에서 설치 없이 임시 사용
- **시스템 통합**: 데스크톱 앱이 로컬 파일, 시스템 알림, 단축키에 접근 가능
- **하나의 코드베이스**: Electron은 웹 스택을 사용하며, 데스크톱/웹 코드 약 80% 재사용 가능

Slack, Notion, Discord가 모두 이 패턴을 따릅니다.

---

### 시나리오 6: 비밀번호 관리자를 만들고 싶어요

**🔐 추천: 데스크톱 앱 + 브라우저 확장 프로그램**

왜?

- **데스크톱 앱**: 안전한 로컬 비밀번호 데이터베이스 저장, 생체 인식 잠금 해제 지원
- **브라우저 확장 프로그램**: 로그인 페이지에서 자동 완성, 창 전환 불필요
- **오프라인 가용성**: 비밀번호 데이터가 로컬에 저장되어 네트워크와 무관
- **보안 제어**: 사용자가 데이터의 위치를 알아 클라우드 유출 우려 감소

1Password와 Bitwarden이 모두 이 조합을 사용합니다.

---

### 시나리오 7: 콘텐츠 제작 플랫폼을 만들고 싶어요

**✍️ 추천: 웹사이트 + 개인 블로그**

왜?

- **SEO가 생명선**: 검색은 가장 큰 장기 트래픽 소스
- **콘텐츠가 제품**: 글, 튜토리얼, 비디오가 핵심 가치
- **장기 자산**: 웹사이트는 수년간 운영 가능하지만, 소셜 계정은 언제든 정지될 수 있음
- **유연한 수익화**: 광고, 유료 구독, 지식 커머스 모두 웹사이트에서 운영 가능

Medium, 즈후 칼럼, 개인 기술 블로그가 모두 본질적으로 콘텐츠 플랫폼입니다.

---

### 시나리오 8: 개발자 생산성 도구를 만들고 싶어요

**🛠️ 추천: VS Code 확장 프로그램 또는 CLI 도구**

왜?

- **사용자가 이미 편집기 안에 있음**: 개발자는 컨텍스트 전환을 싫어함
- **컨텍스트 인식**: 도구가 현재 코드를 읽고 정확한 제안 제공
- **쉬운 배포**: 확장 프로그램 마켓플레이스에 게시하면 사용자가 원클릭으로 설치
- **빠른 반복**: 앱 스토어 심사 지연 없이, 당일 릴리즈/업데이트 가능

Prettier, ESLint, GitHub Copilot이 모두 VS Code 확장 프로그램입니다.

---

### 시나리오 9: 산업 모니터링 대시보드를 만들고 싶어요

**🏭 추천: Qt 데스크톱 애플리케이션**

왜?

- **안정성이 최우선**: 공장은 24시간 가동되며 소프트웨어가 다운되면 안 됨
- **하드웨어 통신**: 센서와 시리얼/Modbus 통신 필요
- **실시간 차트**: 압력/온도/유량은 종종 밀리초 단위 새로고침 필요
- **산업 환경**: 산업용 컴퓨터는 보통 Windows를 사용하며, Qt 호환성이 강함

::: warning ⚠️ 산업 시나리오
산업 시나리오는 웹 기술이 보통 충족할 수 없는 안정성과 하드웨어 인터페이스를 요구합니다.
:::

---

### 시나리오 10: 디지털 멤버십 카드를 발행하고 싶어요

**🎫 추천: NFT 스마트 컨트랙트**

왜?

- **위조 불가**: 온체인 기록은 변조할 수 없음
- **전송 가능**: 멤버십을 선물하거나 2차 시장에서 거래 가능
- **프로그래밍 가능**: 스마트 컨트랙트가 혜택을 자동화(예: 1년 후 자동 업그레이드)
- **글로벌 도달**: 국경 없이 전 세계 참여 가능

Starbucks Odyssey와 NBA Top Shot이 모두 멤버십 시스템에 NFT를 사용합니다.

---

## 5 빠른 플랫폼 기능 비교

### 5.1 모바일 솔루션 비교

| 기능 | 위챗 미니 프로그램 | iOS 네이티브 | Android 네이티브 | PWA |
|-----|----------|---------|-------------|-----|
| 사용자 획득 비용 | <el-tag type="success">낮음</el-tag> (위챗 공유) | <el-tag type="danger">높음</el-tag> (앱 스토어) | <el-tag type="danger">높음</el-tag> (앱 스토어) | <el-tag type="warning">중간</el-tag> (검색 엔진) |
| 오프라인 사용 | <el-tag type="warning">제한적</el-tag> | <el-tag type="success">완전</el-tag> | <el-tag type="success">완전</el-tag> | <el-tag type="success">지원</el-tag> |
| 푸시 알림 | <el-tag type="success">지원</el-tag> | <el-tag type="success">지원</el-tag> | <el-tag type="success">지원</el-tag> | <el-tag type="warning">부분적</el-tag> |
| 하드웨어 접근 | <el-tag type="warning">제한적</el-tag> | <el-tag type="success">완전 접근</el-tag> | <el-tag type="success">완전 접근</el-tag> | <el-tag type="warning">제한적</el-tag> |
| 백그라운드 실행 | <el-tag type="warning">제한적</el-tag> | <el-tag type="success">지원</el-tag> | <el-tag type="success">지원</el-tag> | <el-tag type="warning">제한적</el-tag> |
| 개발 비용 | <el-tag type="success">낮음</el-tag> | <el-tag type="danger">높음</el-tag> | <el-tag type="danger">높음</el-tag> | <el-tag type="success">낮음</el-tag> |
| 심사 필요 | <el-tag type="warning">예</el-tag> | <el-tag type="warning">예</el-tag> | <el-tag type="warning">예</el-tag> | <el-tag type="success">아니오</el-tag> |

### 5.2 데스크톱 솔루션 비교

| 기능 | Electron | Qt | 브라우저 확장 프로그램 |
|-----|----------|-----|-----------|
| 크로스 플랫폼 | Win/Mac/Linux | Win/Mac/Linux | Chrome/Edge/Firefox |
| 시스템 통합 | <el-tag type="warning">중간</el-tag> | <el-tag type="success">높음</el-tag> | <el-tag type="warning">낮음</el-tag> |
| 오프라인 사용 | <el-tag type="success">지원</el-tag> | <el-tag type="success">지원</el-tag> | <el-tag type="warning">부분적</el-tag> |
| 하드웨어 접근 | <el-tag type="warning">Node.js 경유</el-tag> | <el-tag type="success">완전 접근</el-tag> | <el-tag type="warning">제한적</el-tag> |
| 설치 | 설치 패키지 | 설치 패키지 | 브라우저 확장 스토어 |
| 개발 스택 | 웹 기술 | C++/QML | JavaScript |

---

## 6 일반적인 오해

<el-collapse accordion style="margin: 20px 0;">
  <el-collapse-item name="1">
    <template #title>
      <span style="font-weight: bold; color: #F56C6C;">❌ 오해 1: "앱을 만들려면 iOS와 Android 모두 만들어야 해"</span>
    </template>
    <div style="padding: 10px; color: #606266; line-height: 1.8;">
      반드시 그런 것은 아닙니다. 앱이 가볍고 쓰고 버리는 성격이라면, 미니 프로그램이나 PWA가 더 나은 선택일 수 있습니다. 네이티브 개발은 깊은 시스템 접근이나 최고 수준의 성능이 필요할 때만 가치가 있습니다.
    </div>
  </el-collapse-item>

  <el-collapse-item name="2">
    <template #title>
      <span style="font-weight: bold; color: #F56C6C;">❌ 오해 2: "웹사이트는 구식이고 아무도 안 읽어"</span>
    </template>
    <div style="padding: 10px; color: #606266; line-height: 1.8;">
      정반대입니다. 웹사이트는 검색 엔진이 인덱싱할 수 있는 유일한 플랫폼입니다. 콘텐츠 중심의 사용자 성장을 원한다면 웹사이트와 개인 블로그가 최고의 선택입니다. 기술 문서와 프로젝트 쇼케이스는 지속적으로 SEO 트래픽을 가져올 수 있습니다.
    </div>
  </el-collapse-item>

  <el-collapse-item name="3">
    <template #title>
      <span style="font-weight: bold; color: #F56C6C;">❌ 오해 3: "데스크톱 앱은 이제 아무도 안 써"</span>
    </template>
    <div style="padding: 10px; color: #606266; line-height: 1.8;">
      사무실 환경에서 데스크톱 앱은 여전히 주류입니다. VS Code, Slack, Notion이 모두 데스크톱 앱입니다. 앱이 장시간 사용, 대용량 데이터 처리, 또는 시스템 통합이 필요하다면 데스크톱이 종종 최선의 선택입니다.
    </div>
  </el-collapse-item>

  <el-collapse-item name="4">
    <template #title>
      <span style="font-weight: bold; color: #F56C6C;">❌ 오해 4: "PWA 경험이 네이티브보다 못해"</span>
    </template>
    <div style="padding: 10px; color: #606266; line-height: 1.8;">
      현대 PWA는 이미 네이티브 경험에 매우 근접합니다. Starbucks, Pinterest, Uber 모두 PWA 버전이 있습니다. 앱이 복잡한 하드웨어 통합을 필요로 하지 않는다면, PWA가 종종 가장 비용 효율적인 크로스 플랫폼 솔루션입니다.
    </div>
  </el-collapse-item>
</el-collapse>

---

## 7 요약: 플랫폼 선택 의사결정 흐름

```text
시작
  │
  ├─ 사용자가 위챗 생태계에 있나요? ───────────────────→ 위챗 미니 프로그램
  │
  ├─ 최고의 성능과 깊은 하드웨어 접근이 필요한가요? ──→ iOS / Android 네이티브
  │
  ├─ 컴퓨터에서 장시간 사용이 필요한가요? ───────────→ 데스크톱 앱
  │     │
  │     ├─ 산업 시나리오인가요? ───────────────────────→ Qt
  │     └─ 일반 시나리오인가요? ──────────────────────────→ Electron
  │
  ├─ 브라우저 페이지 내용을 처리해야 하나요? ────────────→ 브라우저 확장 프로그램
  │
  ├─ 가볍고 + 크로스 플랫폼 + 오프라인? ──────────→ PWA
  │
  ├─ 검색으로 발견되어야 하나요? ───────────────→ 웹사이트 / 블로그
  │
  ├─ 개발자 도구인가요? ───────────────────────────────────→ VS Code 확장 프로그램
  │
  └─ 블록체인 자산인가요? ────────────────────────────────→ NFT 스마트 컨트랙트
```

---

## 8 다음 단계

::: tip 🎯 행동 시작하기
위의 분석을 바탕으로, "어떤 플랫폼을 선택할지"에 대한 예비 답을 갖고 있을 것입니다. 다음으로 해당 튜토리얼을 클릭하여 시작하세요:
:::

<NavGrid>
  <NavCard
    href="/ko-kr/stage-3/cross-platform/wechat-miniprogram/"
    title="위챗 미니 프로그램 만들기"
    description="처음부터 위챗 미니 프로그램을 구축하고 핵심 개발 워크플로 마스터하기"
  />
  <NavCard
    href="/ko-kr/stage-3/cross-platform/android-app/"
    title="Android 앱 만들기"
    description="현대 크로스 플랫폼 프레임워크로 Android 네이티브 애플리케이션 구축"
  />
  <NavCard
    href="/ko-kr/stage-3/cross-platform/ios-app/"
    title="iOS 앱 만들기"
    description="Apple 생태계 모범 사례로 iOS 애플리케이션 개발 및 게시"
  />
  <NavCard
    href="/ko-kr/stage-3/cross-platform/pwa-local-app/"
    title="로컬 PWA 앱 만들기"
    description="웹사이트를 오프라인 지원과 데스크톱 설치가 가능한 실제 앱으로 변환"
  />
  <NavCard
    href="/ko-kr/stage-3/cross-platform/browser-ai-extension/"
    title="브라우저 AI 어시스턴트 확장 프로그램 만들기"
    description="원클릭으로 모든 웹페이지를 요약하고 브라우저 AI 어시스턴트 구축"
  />
  <NavCard
    href="/ko-kr/stage-3/cross-platform/electron-voice-to-text/"
    title="크로스 플랫폼 Electron 데스크톱 앱 만들기"
    description="Windows, macOS, Linux용 음성 텍스트 변환 데스크톱 앱 구축"
  />
  <NavCard
    href="/ko-kr/stage-3/cross-platform/vscode-extension/"
    title="VS Code 확장 프로그램 만들기"
    description="다중 파일 Q&A와 커스텀 단축키로 AI 프로젝트 어시스턴트 만들기"
  />
  <NavCard
    href="/ko-kr/stage-3/cross-platform/qt-industrial-hmi/"
    title="Qt 산업 HMI 만들기"
    description="실제 하드웨어에 연결되는 산업 등급 휴먼-머신 인터페이스 구축"
  />
</NavGrid>
