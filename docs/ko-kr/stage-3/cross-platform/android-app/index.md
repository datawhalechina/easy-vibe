# 간단한 Android 앱 만들기 - 네이티브 Compose 개발

# 1 Android 앱과 Android 개발이란

이 튜토리얼에서는 하나의 완전한 사이클을 완성할 것입니다: **마음속 아이디어에서부터 Android 폰에 설치하고 실행할 수 있는 실제 앱까지.**

이 튜토리얼을 따라하려면 최소한 다음이 필요합니다:

- 성능이 괜찮은 컴퓨터(Windows 또는 Mac)
- Android 폰(선택 사항; 없다면 에뮬레이터를 사용합니다)
- 설치된 Android Studio(빌드용)
- 설치 및 등록된 Trae(AI 코딩용)

## 1.1 Android 앱의 정의

Android 앱은 Android 운영체제에서 실행되는 네이티브 애플리케이션입니다. 미니 프로그램과 달리 WeChat 같은 호스트 앱에 의존하지 않습니다. 시스템 수준에서 직접 실행되며, 자체 홈 화면 아이콘을 가지고, 빠르게 실행되며, 부드러운 사용감을 제공하고, Bluetooth, 센서, 백그라운드 서비스와 같은 시스템 수준 기능에 깊이 접근할 수 있습니다.

![](/zh-cn/stage-3/cross-platform/android-app/images/image1.png)

## 1.2 Android 앱 개발

Android 개발은 이러한 애플리케이션을 구축하는 전체 과정을 의미합니다. 이 튜토리얼에서 사용하는 Vibe Coding 개발 모드에서는 **AI 보조 프로그래밍**을 통해 개발자의 역할이 "코드 작성자"에서 "제품 아키텍트"로 전환됩니다:

1. **당신(아키텍트 / PM)**: 비즈니스 로직 설계, 프롬프트 작성, 최종 결과물 검수를 담당합니다.
2. **Trae(AI 엔지니어)**: 지시사항 실행, 자연어를 표준 Kotlin 코드와 Jetpack Compose 레이아웃으로 변환, 구문 오류와 로직 세부사항 처리를 담당합니다.
3. **Android Studio(빌드 공장)**: 컴파일 환경 제공, 코드를 실행 가능한 앱으로 패키징, 에뮬레이터 미리보기 제공을 담당합니다.

## 1.3 Android 앱을 만드는 일반적인 방법

실제 개발에서는 Android 앱을 만드는 방법이 한 가지만 있는 것이 아닙니다. 여기서는 깊이 다루지 않고 전반적인 이해만 제공합니다.

**첫 번째 방법: 네이티브 개발**
이것은 Google의 공식 권장 루트입니다. **Kotlin**과 **Jetpack Compose**를 직접 사용하여 개발합니다. 장점은 최고의 성능과 폰 하드웨어에 대한 완전한 접근입니다.

![](/zh-cn/stage-3/cross-platform/android-app/images/image2.png)![](/zh-cn/stage-3/cross-platform/android-app/images/image3.png)

**두 번째 방법: 크로스 플랫폼 개발**
예를 들어 Flutter나 React Native가 있습니다. 핵심 아이디어는 "하나의 코드베이스로 Android와 iOS 앱을 모두 생성하는 것"입니다.

**세 번째 방법: 하이브리드 개발**
본질적으로 웹페이지를 앱 셸 안에 감싸는 방식입니다. 개발이 빠르지만, 경험과 부드러움은 보통 네이티브 앱만 못하며, 세련되고 몰입감 있는 작은 도구를 만들기 어렵습니다.

**이 튜토리얼의 선택: 네이티브 개발(** **Kotlin + Compose)** 를 AI 코딩 도구와 결합.
이유는 간단합니다: 네이티브 Jetpack Compose 코드는 구조가 매우 명확하고 AI가 이해하고 생성하기에 매우 적합합니다. 우리는 처음부터 코드를 손으로 작성할 필요가 없습니다. 대신 자연어로 Trae를 안내하여 고품질 네이티브 코드를 생성합니다.

![](/zh-cn/stage-3/cross-platform/android-app/images/image4.png)

## 1.4 이 튜토리얼에서 다루는 Android 앱 개발 단계

학습 과정을 흥미롭게 유지하기 위해, 이 튜토리얼은 기술적으로 대표적이면서도 편안한 사례인 **전자 목탁**을 중심으로 진행됩니다. Trae의 Vibe Coding 모드와 반복적으로 재사용할 수 있는 루트를 결합합니다:

1. **이해와 환경 구축**: Android 앱이 무엇인지 이해하고, Android Studio와 Trae를 설치하며, 국내 미러를 구성하여 툴체인이 원활하게 작동하도록 합니다.
2. **프로젝트 골격 구축**: 에뮬레이터에서 성공적으로 실행할 수 있는 빈 Android 프로젝트를 만듭니다.
3. **AI 반복 개발**: Trae에서 프로젝트를 열고, AI와의 대화를 통해 목탁 이미지, 탭 애니메이션, 효과음, 떠다니는 텍스트 등을 점진적으로 구현합니다.
4. **실기기 디버깅 및 다듬기**: 에뮬레이터를 넘어 실제 폰에 앱을 설치하고, 실제 진동 피드백을 경험하며, AI가 버그 조사를 도와줍니다.
5. **패키징 및 배포**: 공식 APK를 생성하고 공유하거나 배포하는 방법을 이해합니다.

이 섹션은 전체 그림만 그리며 아직 모든 명령을 펼치지 않습니다. 지금은 메인 라인만 기억하세요: **환경 설정 -> 골격 구축 -> AI 설명 및 생성 -> 실기기 다듬기 -> 패키징 및 전달**. 다음 장에서 각 단계를 안내하겠습니다.

# 2 개발 환경 설정

## 2.1 이 튜토리얼에서 사용하는 도구

전체 개발 과정에서 세 가지 도구를 함께 사용하며, "설계", "구축", "검수"의 역할을 담당합니다.

- **Trae**: 당신의 **AI 코딩 파트너**입니다. Vibe Coding 모드에서는 더 이상 코드를 한 줄씩 타이핑할 필요가 없습니다. 대신 AI에게 자연어로 원하는 것을 말하면 코드 생성과 수정을 처리합니다.
- **Android Studio**: Google의 공식 **앱 빌드 공장**입니다. 많은 버튼이 있지만, 이 튜토리얼에서는 주로 프로젝트 골격을 만들고 Trae가 생성한 코드를 폰에 설치 가능한 것으로 컴파일하는 데 사용합니다.
- **Android 기기**: 결과를 확인하는 **테스트 단말기** 역할을 합니다. 컴퓨터에 연결하여 실기기 디버깅을 하고 실제 진동 피드백을 느낄 수 있습니다. 없다면 Android Studio에 내장된 **에뮬레이터**가 가상 폰을 완벽하게 시뮬레이션하며, 초기 개발에 충분합니다.

## 2.2 Trae 다운로드

Trae는 **Vibe Coding**의 주요 전장입니다. 간단히 **"AI 기반 코드 에디터"**라고 생각하면 됩니다.

공식 웹사이트 [https://www.trae.cn](https://www.trae.cn)을 방문하여 컴퓨터 시스템에 맞는 버전(Windows 또는 Mac)을 다운로드하고, 일반 소프트웨어처럼 설치 프로그램을 더블클릭하여 안내에 따라 설치합니다. 이 도구가 준비되면, 이후 실습에서는 지루한 코드 창을 바라보는 대신 프로젝트를 열고 자연어로 AI에게 무엇을 만들지 알려주게 됩니다.

![](/zh-cn/stage-3/cross-platform/android-app/images/image5.png)

## 2.3 Android Studio 다운로드

앱 실행에 필요한 Android SDK와 에뮬레이터를 제공하기 위해 Android Studio가 필요합니다. 공식 다운로드 페이지 [https://developer.android.com/studio?hl=zh-cn](https://developer.android.com/studio?hl=zh-cn)에서 운영체제에 맞는 패키지를 다운로드합니다(이 튜토리얼은 **2025.2.3** 기준). 다운로드 후 일반 소프트웨어처럼 설치하며, 전체적으로 기본 옵션을 유지합니다.

**초보자를 위한 특별 안내:**

최신 버전의 Android Studio는 설정이 크게 간소화되었지만, 내부적으로는 여전히 **JDK(Java Development Kit)**에 의존합니다. 처음 개발을 하거나 설치 중 환경 변수나 SDK 설정 관련 오류를 만난다면 당황하지 마세요. 이 상세한 설정 가이드를 참조하세요: [Android Studio 2024 설정: SDK 및 Gradle 구성](https://blog.csdn.net/keiraee/article/details/142321644?ops_request_misc=elastic_search_misc&request_id=a2b858d1f665095c53afa9114ad8864d&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~top_positive~default-2-142321644-null-null.142^v102^pc_search_result_base4&utm_term=android%20studio%E5%AE%89%E8%A3%85%E5%8F%8A%E9%85%8D%E7%BD%AE&spm=1018.2226.3001.4187)

![](/zh-cn/stage-3/cross-platform/android-app/images/image6.png)

## 2.4 새 프로젝트 만들기

Android Studio를 열고 시작 화면에서 **New Project**를 클릭합니다.

**1단계: 템플릿 선택**

템플릿 목록에서 **Empty Activity**를 선택합니다(Jetpack Compose 아이콘이 있는 것을 확인하세요).

![](/zh-cn/stage-3/cross-platform/android-app/images/image7.png)![](/zh-cn/stage-3/cross-platform/android-app/images/image8.png)

**2단계: 프로젝트 설정 입력**

그러면 설정 양식이 나타납니다. 대략 다음과 같이 입력하고 나머지는 기본값으로 유지합니다:

| **필드** | **권장 값** | **설명** |
| ----------------- | -------------------------------------------------- | ---------------------------------------- |
| **Name** | My Application 1 | 폰 홈 화면에 표시되는 앱 이름 |
| **Package name** | com.example.myapplication1 | 고유한 앱 식별자 |
| **Save location** | 사용자 지정 경로(예: `E:\AndroidProjects\Myapplication1`) | 프로젝트 저장 위치; C 드라이브에는 배치하지 않는 것이 좋습니다 |
| **Minimum SDK** | API 30 | 활성 기기의 90% 이상을 커버하면서 호환성과 기능의 균형을 맞춤 |
| **Language** | Kotlin(권장) | Kotlin은 Google의 공식 권장 언어로, 더 깔끔하고 안전합니다 |

![](/zh-cn/stage-3/cross-platform/android-app/images/image9.png)

**3단계: 프로젝트 빌드 대기**

**Finish**를 클릭합니다. Android Studio가 자동으로 종속성을 다운로드하고 프로젝트를 빌드합니다(오른쪽 하단에 진행 표시줄이 보입니다).

- _참고: 첫 번째 프로젝트 생성은 몇 분 정도 걸릴 수 있습니다. 하단 진행이 완료되고 왼쪽에 프로젝트 파일 트리가 완전히 로드될 때까지 인내심을 가지고 기다리세요._

## 2.5 종속성 설정: Gradle 다운로드 및 Gradle 저장소 미러

> 이것은 Vibe Coding 워크플로에서 몇 안 되는 **수동 작업**이 권장되는 단계 중 하나입니다. AI도 설정 수정을 도와줄 수 있지만, 환경 설정은 저수준 파일을 다루므로 수동 변경이 더 안정적입니다.

왜 설정을 수정해야 할까요?

기본적으로 Android Studio는 해외 서버에 연결되므로 빌드 도구와 종속성을 다운로드하는 데 한 시간 이상 걸리거나 실패할 수 있습니다. 국내 미러로 전환하면 보통 몇 분 안에 완료됩니다. **한 번만 하면 영구적으로 효과가 있는 작업입니다.**

1. **준비**

Android Studio 오른쪽 하단 상태 표시줄에 `Gradle Building...`과 같은 진행 표시줄이 표시되고 있다면, 파일 충돌을 방지하기 위해 진행 중인 종속성 다운로드를 먼저 일시 중지하세요.

![](/zh-cn/stage-3/cross-platform/android-app/images/image10.png)

2. **Gradle 다운로드 가속**

왼쪽 프로젝트 파일 트리에서 `gradle` -> `wrapper`를 펼치고 `gradle-wrapper.properties`를 엽니다. 다운로드 소스를 Tencent 미러로 변경합니다:

```text
distributionUrl=https\://mirrors.cloud.tencent.com/gradle/gradle-8.7-bin.zip
```

주의: `services.gradle.org/distributions`를 `mirrors.cloud.tencent.com/gradle`로만 교체하면 됩니다. 다른 것은 변경하지 마세요.

![](/zh-cn/stage-3/cross-platform/android-app/images/image11.png)

3. **종속성 저장소 다운로드 가속**

그다음 프로젝트 루트의 `settings.gradle.kts`를 열고 `repositories` 블록 안의 내용을 다음으로 교체합니다:

![](/zh-cn/stage-3/cross-platform/android-app/images/image12.png)

하이라이트된 부분을 다음 코드로 교체합니다(2025-02-21 기준 최신 소스 목록):

```json
        // Aliyun 미러 (Maven Central, Google, JCenter 등 포함)
        maven { setUrl("https://maven.aliyun.com/repository/public/") }
        maven { setUrl("https://maven.aliyun.com/repository/google/") }
        maven { setUrl("https://maven.aliyun.com/repository/jcenter/") }
        maven { setUrl("https://maven.aliyun.com/repository/gradle-plugin/") }
        // Huawei Cloud 미러
        maven { setUrl("https://repo.huaweicloud.com/repository/maven/") }
        // Tencent Cloud 미러
        maven { setUrl("https://mirrors.cloud.tencent.com/nexus/repository/maven-public/") }
        // NetEase 미러
        maven { setUrl("https://mirrors.163.com/maven/repository/maven-public/") }
```

그러면 아래 스크린샷처럼 보일 것입니다:

![](/zh-cn/stage-3/cross-platform/android-app/images/image13.png)

4. **저장 및 변경 사항 적용**

이제 파일을 저장하고 오른쪽 상단의 `Try Again`을 클릭합니다. Android Studio가 다운로드를 다시 실행합니다. 몇 분 기다리세요. 콘솔에 `BUILD SUCCESSFUL`이 표시되면 환경 설정이 완료되고 코딩을 시작할 준비가 된 것입니다.

![](/zh-cn/stage-3/cross-platform/android-app/images/image14.png)

## 2.6 프로젝트 구조 이해

프로젝트 생성이 성공하면 왼쪽에 **Project** 패널이 나타납니다. **Android** 뷰로 전환(기본값)하면 다음과 같은 주요 디렉토리가 보입니다:

```text
app/
├── manifests/
│   └── AndroidManifest.xml            <- 앱 "신분증", 앱 이름과 진입점 Activity(MainActivity) 선언
│
├── java/
│   └── com.example.myapplication1/
│       ├── MainActivity.kt            <- 앱 진입점, Jetpack Compose로 UI 구축
│       │
│       └── ui/                        <- 전체 UI 스타일 제어(색상, 폰트)
├── res/
│   ├── drawable/                      <- 이미지 리소스(예: ic_launcher.png)
│   ├── mipmap/                        <- 앱 아이콘
│   ├── values/                        <- 텍스트, 색상, 테마 스타일
│   │   ├── colors.xml
│   │   ├── strings.xml
│   │   └── themes.xml
│   └── xml/                           <- 시스템 관련 설정 파일(UI 아님)
└── build.gradle (Module: app)         <- 앱 빌드 설정(초보 단계에서는 보통 수정하지 않음)
```

초보자로서 보통 세 가지 파일에만 집중하면 됩니다:

- `MainActivity.kt`: 동작을 제어하고 "화면에 무엇이 나타나는지"를 결정합니다
- `AndroidManifest.xml`: 구성요소를 등록하고 "앱이 어디서 시작되는지"를 결정합니다
- `Theme.kt`: 시각적 외관을 정의합니다

# 3 Android 앱 개발

앞의 두 장에서 Android 앱이 무엇인지 이해하고 두 가지 핵심 도구인 Trae와 Android Studio를 준비했습니다. 이 섹션부터 종이 논의를 떠나 실제 실습에 들어갑니다. Vibe Coding 모드를 채택하여 인기 있는 스트레스 해소 앱인 **전자 목탁**을 처음부터 만들 것입니다. 이것은 "Vibe" 테마에 잘 맞으면서(간단하고 편안함) Android 개발의 세 가지 핵심 부분인 **UI 상호작용(탭), 데이터 저장(공덕 카운트), 멀티미디어(효과음)**을 모두 다룹니다.

자, 따라하며 AI에게 첫 번째 지시를 보내세요.

## 3.1 첫 번째 "마스터 프롬프트": 제로에서 하나로

Vibe Coding 모드에서는 전통적인 개발처럼 먼저 레이아웃 파일을 만들고 로직 코드를 작성할 필요가 없습니다. 우리가 해야 할 것은 **요구사항을 한 번에 명확하게 설명하고 AI가 첫 번째 실행 가능한 프로토타입을 생성하도록 하는 것**입니다.

방금 만든 프로젝트 디렉토리를 Trae에서 열고, 오른쪽 채팅 패널에 다음 프롬프트를 입력합니다:

```text
You are a senior Android development expert. Please rewrite the current MainActivity.kt and turn it into an "Electronic Wooden Fish" app. Requirements:
1. The screen background is black.
2. Display a wooden fish graphic in the center of the screen, moderate in size, in white.
3. Show a line of white text above it: "Merit: 0".
4. When the wooden fish in the center is tapped, the number increases by 1 and a simple scale animation effect appears (simulating the feeling of knocking).
5. Use Jetpack Compose.
```

보내면 Trae가 프로젝트 구조 분석을 시작합니다. 몇 초 후 `MainActivity.kt`의 전체 코드를 직접 생성합니다.

1. 응답에서 추론 로직과 상호작용 로직을 볼 수 있습니다
2. 코드의 어떤 부분이 다시 작성되었는지 직접 볼 수 있습니다
3. 결과에 만족하지 못하면 이전 버전으로 롤백할 수 있습니다

![](/zh-cn/stage-3/cross-platform/android-app/images/image15.png)

## 3.2 실행 및 미리보기(에뮬레이터 디버깅)

이 시점에서 AI가 첫 번째 개발 라운드를 완료했습니다. 하지만 기억하세요, Trae에서 보는 것은 코드 "청사진"일 뿐 실제 상호작용 앱이 아닙니다. Trae 자체는 Android 앱을 직접 실행할 수 없으므로 Android Studio가 제공하는 **가상 기기 에뮬레이터**에 의존해야 합니다. 이것은 컴퓨터 화면을 가상 Android 폰으로 만들어주어 코드를 즉시 설치하고 실제 결과를 볼 수 있게 합니다.

자, 이 "가상 폰"을 설정해 봅시다.

**1단계: 에뮬레이터 만들기**

Android Studio로 돌아가서 오른쪽 도구 모음에서 **Device Manager**를 찾아 클릭합니다. 찾을 수 없다면 `View -> Tool Windows -> Device Manager`에서 엽니다.

패널에서 **Add a new device**를 클릭한 다음 **Create Virtual Device**를 선택하여 기기 선택 창으로 들어갑니다.

![](/zh-cn/stage-3/cross-platform/android-app/images/image16.png)

![](/zh-cn/stage-3/cross-platform/android-app/images/image17.png)

하드웨어 선택 창에서 **Phone**을 선택하고 **Smart Phone**(중간 화면 크기)을 선택하거나 Pixel과 같은 다른 기기 프로필을 선택한 후 **Next**를 클릭합니다.

![](/zh-cn/stage-3/cross-platform/android-app/images/image18.png)

**2단계: 시스템 이미지 구성**

**System Image** 대화상자에서 **API 36.1**을 선택합니다. 아직 다운로드되지 않았다면 먼저 **Download**를 클릭하고, 다운로드가 완료된 후 선택한 다음 **Finish**를 클릭합니다.

![](/zh-cn/stage-3/cross-platform/android-app/images/image19.png)

**3단계: 에뮬레이터 시작**

생성이 성공하면 기기 관리자 목록에 새 폰이 나타납니다. 오른쪽의 **삼각형 재생 버튼**을 클릭합니다. 잠시 기다리면 폰 모양의 창이 팝업됩니다 - 이것이 Android 에뮬레이터입니다.

![](/zh-cn/stage-3/cross-platform/android-app/images/image20.png)

![](/zh-cn/stage-3/cross-platform/android-app/images/image21.png)

**4단계: 앱 실행**

이제 마법의 순간입니다. 에뮬레이터가 시작되어 바탕화면을 보여주는지 확인한 다음, Android Studio 상단 도구 모음의 눈에 띄는 **녹색 Run 삼각형**을 클릭합니다(또는 단축키 `Shift + F10` 사용). Android Studio가 Trae가 작성한 코드를 자동으로 컴파일하고, 앱으로 패키징하여 에뮬레이터에 설치합니다.

몇 초 안에 에뮬레이터 화면이 켜지며, 중앙에 흰색 목탁 그래픽이 표시되고 그 위에 "Merit: 0" 텍스트가 나타납니다. 탭해보고 숫자가 증가하고 애니메이션이 작동하는지 확인하세요. 이것이 당신의 첫 Android 앱입니다.

![](/zh-cn/stage-3/cross-platform/android-app/images/image22.png)

![](/zh-cn/stage-3/cross-platform/android-app/images/image23.png)

## 3.3 최적화 반복(에셋 및 소리 추가)

이 단계에서 앱은 이미 기본적인 형태를 갖추었습니다: 탭하면 숫자가 증가합니다. 하지만 여전히 "음소거"된 흰색 기하학적 형태일 뿐, 재미가 부족합니다. 다음으로 실제 이미지와 두드리는 소리 효과를 추가하여 전자 목탁을 훨씬 더 몰입감 있게 만들 것입니다.

**이것이 바로 Vibe Coding 모드의 가장 매력적인 부분입니다.** 전통적인 개발에서는 효과음과 더 복잡한 애니메이션을 추가하는 것이 종종 초보자에게 악몽 같은 일이었습니다. `MediaPlayer` 리소스 로딩과 해제를 관리해야 하고(그렇지 않으면 메모리 누수가 발생할 수 있음), 애니메이션 곡선도 계산해야 합니다. Vibe Coding 모드에서는 이러한 저수준 세부사항을 전혀 신경 쓸 필요가 없습니다. 감독처럼 AI에게 "소품을 바꾸고 탭할 때 소리 효과를 추가해"라고 말하면 구현이 즉시 나타납니다.

**1단계: 에셋 준비**
목탁 이미지 하나(`png`)와 두드리는 소리 효과 하나(`mp3`)가 필요합니다.

- **이미지 에셋**: 준비한 `white_muyu.png`를 `app/src/main/res/drawable`에 복사
- **오디오 에셋**: Android Studio에서 왼쪽 프로젝트 패널의 `res` 폴더를 마우스 오른쪽 버튼으로 클릭하고, `New -> Android Resource Directory`를 선택한 다음, 리소스 유형으로 **raw**를 선택하고 OK를 클릭한 후 `voice.mp3`를 새로 만든 `res/raw` 폴더에 복사합니다. _(참고: 상업적 출시를 계획 중이라면 모든 에셋의 합법적인 사용 권한을 확보하세요.)_

다음은 준비한 이미지와 소리 에셋입니다. 직접 찾기 불편하다면 바로 사용할 수 있습니다.

![](/zh-cn/stage-3/cross-platform/android-app/images/image24.png)

두드리는 소리 다운로드 링크: https://www.aigei.com/s?q=%E6%9C%A8%E9%B1%BC&type=sound
첫 번째 1초 효과음을 선택하세요.

![](/zh-cn/stage-3/cross-platform/android-app/images/image25.png)

**2단계: 반복 지시 보내기**

에셋이 준비되면 Trae로 돌아갑니다. Trae가 코드를 다시 수정하고 오디오 로딩과 애니메이션 로직을 처리합니다. 어떤 에셋을 사용할지만 알려주면 됩니다. 다음 프롬프트를 입력합니다:

```text
I have added the assets. The image path is res/drawable/white_muyu.png and the sound effect path is res/raw/voice.mp3. Please update the code:
1. Replace the wooden fish icon in the center with my image.
2. Play the knocking sound every time the wooden fish is tapped.
3. When tapped, show a temporary "+1" text above the wooden fish, then let it float upward and disappear (like floating score text in games).
```

![](/zh-cn/stage-3/cross-platform/android-app/images/image26.png)

**3단계: 결과 확인**

Trae가 코드 수정을 마치면 Android Studio로 돌아가서 녹색 Run 버튼을 다시 클릭합니다(재실행). 에뮬레이터가 다시 시작됩니다. 이때 앱은 완전히 달라진 느낌을 줄 것입니다. 연속적으로 탭해보세요 - 경쾌한 "톡톡" 소리가 들리고 떠다니는 "Merit +1" 텍스트가 튀어나오는 것을 볼 수 있을 것입니다. 이것으로 "데모"에서 "제품"으로의 핵심 전환이 완성됩니다.

![](/zh-cn/stage-3/cross-platform/android-app/images/image27.png)

![](/zh-cn/stage-3/cross-platform/android-app/images/image28.png)

## 3.4 버그가 나타나면 어떻게 할까요? (AI와의 디버깅 루프)

AI가 생성한 코드가 첫 번째 시도에서 완벽하다고 보장할 수는 없으며, 최고의 엔지니어도 한 번에 버그 없는 코드를 약속할 수 없습니다. 하지만 Vibe Coding 모드에서는 버그가 더 이상 당신을 막는 벽이 아니라 AI와의 협력에서 디딤돌이 됩니다.

**사례 1: 앱이 충돌하는 경우**

Run을 클릭한 후 앱이 즉시 충돌하거나, 목탁을 탭해도 소리가 나지 않는다고 가정해 봅시다. 전통적으로는 오류 코드를 검색하고 수십 개의 기술 포럼을 탐색하며 어려운 영어 글을 많이 읽어야 했습니다. Vibe Coding 모드에서는 한 가지만 하면 됩니다 - **택배원이 되세요**.

**단계:**

1. **로그 열기**: Android Studio 하단의 **Logcat** 패널을 찾습니다(작은 고양이 아이콘).
2. **오류 찾기**: 스크롤되는 로그가 보일 것이며, **빨간색 줄**이 보통 핵심 오류입니다.
3. **복사 및 붙여넣기**: 빨간색 영어 오류 텍스트를 선택하고 복사한 다음 Trae에 붙여넣습니다: "실행 중 이 오류가 발생했습니다. 수정해 주세요."
4. AI가 즉시 "이것은 `AndroidManifest.xml`에 진동 권한이 선언되지 않아서 발생했습니다"와 같은 설명과 함께 수정된 코드를 제공할 수 있습니다. Apply를 클릭하고 계속 진행하세요.

**사례 2: 앱은 실행되지만 경험이 좋지 않은 경우**

때로는 앱이 충돌하지 않지만 여전히 만족스럽지 않을 수 있습니다. 예를 들어, 목탁을 매우 빠르게 탭할 때 새로운 "+1" 애니메이션이 이전 "+1"이 완전히 사라질 때까지 나타나지 않는 것을 알 수 있습니다. 이로 인해 피드백이 지연되고 만족스럽지 않습니다. 멀티스레딩이나 애니메이션 큐를 직접 공부할 필요가 없습니다. 그 불편함을 AI에게 명확하게 설명하기만 하면 됩니다.

Trae에게 이 "고급 지시"를 보내세요:

```text
Please modify the current animation logic to solve the "fast tapping does not trigger" problem.
Current issue: it seems there is only one animation state, so I have to wait until the previous "+1" completely disappears before another click responds.
Requirements:
1. Replace the single animation state with a mutableStateListOf-based list.
2. Every time the wooden fish is tapped, add a new "+1" instance immediately to the list (with its own ID and initial position), regardless of whether the previous animation has finished.
3. In the UI, iterate through this list so each "+1" runs its own upward-floating + fade-out animation independently.
4. After a "+1" animation finishes, automatically remove it from the list to prevent memory leaks.
Please directly provide the updated MainActivity.kt code.
```

![](/zh-cn/stage-3/cross-platform/android-app/images/image29.png)

![](/zh-cn/stage-3/cross-platform/android-app/images/image30.png)

## 3.5 최종 결과 쇼케이스

앞선 단계에서 우리는 보고 들을 수 있는 전자 목탁을 완성했습니다. 배포 가능한 앱에 더 가까워지기 위해 한 번의 최종 반복으로 **터치 피드백**과 **커스터마이징**을 추가할 것입니다. 두 가지 핵심 기능을 구현합니다: 첫째, **진동 피드백**으로 모든 탭에 폰 모터의 물리적 응답을 제공하여 몰입감을 크게 높입니다; 둘째, **커스텀 텍스트**로 사용자가 화면의 텍스트를 수정할 수 있게 합니다(예: "Merit +1"을 "Salary +1" 또는 "Trouble -1"로 변경).

다음은 신중하게 설계된 프롬프트를 Trae에게 보냅니다. 대화상자 로직, 상태 전환, 하드웨어 상호작용을 한 번에 처리할 것입니다:

```text
Role: You are an Android Jetpack Compose expert.
Task: Please add "custom text" and "vibration feedback" to the existing Electronic Wooden Fish app.
Requirements:
1. Haptic Feedback
Whenever the user taps the wooden fish, in addition to sound and animation, call the phone's haptic feedback (using LocalHapticFeedback.current) to give a light tactile response.
2. Custom Text Feature (UI and interaction)
Entry: Add a small edit icon next to the top text such as "Merit +1" (you can use Icons.Default.Edit).
Dialog logic: When the icon is tapped, show a dialog (Dialog/AlertDialog).
    Dialog title: "Modify Content"
    Input: Allow the user to enter the text they want to accumulate (default is "Merit")
    Value choice: Below the input, provide two options (for example RadioButton or toggle) so the user can choose "+1" or "-1"
    Save button: After clicking save, close the dialog and apply the new settings to the home screen
    Data refresh: If the user updates the content, reset the top counter to 0 and start counting from zero again
3. Effect update
After saving, both the top counter text and the floating animation text shown when tapping the wooden fish should change to the user's custom format.
    The floating text size should not exceed the size of the top counter text
    Example: if the user enters "Salary" and chooses "+1", the top counter logic becomes +1 and the floating text becomes "Salary+1"
    If the user enters "Trouble" and chooses "-1", the top counter logic becomes -1 and the floating text becomes "Trouble-1"
4. Technical requirements:
Make sure the new state (text and number) correctly affects the animation.
Please directly provide the full updated MainActivity.kt while keeping the previous sound and animation logic unchanged.
```

![](/zh-cn/stage-3/cross-platform/android-app/images/image31.png)

# 4 실기기 디버깅 및 다듬기

에뮬레이터는 편리하지만 실제 폰 진동을 시뮬레이션할 수 없고 실제 터치 지연을 완전히 반영하지 못합니다. 가장 정확한 "느낌"을 얻으려면 실제 Android 폰에 앱을 설치해야 합니다. 아래에서 선택할 수 있는 두 가지 연결 방법을 제시합니다:

1. **무선 디버깅(Wi-Fi)**: 데이터 케이블이 필요 없고 일상적인 확인에 편리합니다. 하지만 컴퓨터와 폰이 **같은 Wi-Fi 네트워크**에 있어야 합니다.
2. **USB 유선 디버깅**: 더 안정적이고 연결이 끊어질 가능성이 적으며, 네트워크가 좋지 않거나 초기 설치가 실패할 때 적합합니다.

## 4.1 무선 디버깅

이것은 Android 11 이상에서 가장 편리한 방법입니다.

**1단계: 폰 준비**

1. 폰과 컴퓨터가 **같은 Wi-Fi**에 연결되어 있는지 확인합니다.
2. **개발자 옵션**을 열고 **무선 디버깅**을 활성화합니다.
3. **무선 디버깅**을 탭하여 세부 정보에 들어간 다음 **QR 코드로 기기 페어링**을 선택합니다. 폰에 스캐너 보기가 열립니다.

![](/zh-cn/stage-3/cross-platform/android-app/images/image32.png)![](/zh-cn/stage-3/cross-platform/android-app/images/image33.png)

**2단계: 컴퓨터에서 페어링**

1. Android Studio로 돌아가서 상단 도구 모음의 기기 선택기를 클릭합니다.
2. 드롭다운에서 **Pair Devices Using Wi-Fi**를 선택합니다.
3. 화면에 QR 코드가 팝업됩니다.

![](/zh-cn/stage-3/cross-platform/android-app/images/image34.png)

**3단계: 스캔하여 연결**

1. 폰으로 컴퓨터 화면의 QR 코드를 스캔합니다.
2. 폰과 컴퓨터 모두 "페어링 성공"을 표시해야 합니다.
3. 이때 Android Studio 상단 기기 표시줄에 폰 모델이 자동으로 표시됩니다(예: `Google Pixel 8`).

![](/zh-cn/stage-3/cross-platform/android-app/images/image35.png)

4. ▶️ Run을 클릭하여 앱을 실행합니다

![](/zh-cn/stage-3/cross-platform/android-app/images/image36.png)

## 4.2 USB 유선 디버깅

무선 연결이 불안정하거나 네트워크가 복잡한 경우 케이블로 연결하는 것이 항상 가장 안정적인 해결책입니다. 불편하지만 가장 빠른 전송 속도를 제공하고 연결이 거의 끊어지지 않습니다.

### 4.2.1 Android Studio에서 USB 드라이버 준비(Windows 전용)

Mac 사용자는 이 단계를 건너뛸 수 있습니다. macOS는 보통 폰을 직접 인식하기 때문입니다. Windows 사용자는 컴퓨터가 Android 폰을 인식할 수 있도록 해야 하며, 이는 보통 Google USB 드라이버를 설치하는 것을 의미합니다:

1. Android Studio에서 `Tools -> SDK Manager`를 클릭합니다(또는 `Settings -> Languages & Frameworks -> Android SDK`에서 찾습니다)
2. **SDK Tools** 탭으로 전환합니다
3. **Google USB Driver**를 체크하고 **Apply**를 클릭하여 다운로드 및 설치합니다

![](/zh-cn/stage-3/cross-platform/android-app/images/image37.png)![](/zh-cn/stage-3/cross-platform/android-app/images/image38.png)

![](/zh-cn/stage-3/cross-platform/android-app/images/image39.png)

### 4.2.2 실제 기기와 동일한 SDK 버전 다운로드

**1단계: 폰의 Android 버전 확인**

OPPO 폰을 예로 들면: 설정 -> 휴대전화 정보 -> Android 버전 확인(예시에서는 Android 12).

![](/zh-cn/stage-3/cross-platform/android-app/images/image40.png)

**2단계: Android Studio에서 해당 Android 플랫폼 버전 다운로드**

1. Android Studio에서 `Tools -> SDK Manager`를 클릭합니다
2. 기본 **SDK Platforms** 탭에 머무릅니다
3. Android 12.0을 선택하고 Apply를 클릭하여 다운로드합니다

![](/zh-cn/stage-3/cross-platform/android-app/images/image41.png)

### 4.2.3 폰에서 개발자 모드 활성화

폰 설정을 열고 개발자 옵션으로 들어가 **USB 디버깅**을 켭니다.

![](/zh-cn/stage-3/cross-platform/android-app/images/image42.png)

### 4.2.4 폰에서 USB 드라이버 권한 부여

이제 폰을 집어 드세요. 중요한 보안 대화상자가 표시되어야 합니다: "USB 디버깅을 허용하시겠습니까?" **항상 허용**을 체크한 다음 **허용** 또는 **OK**를 탭하세요. 이것이 컴퓨터에 디버깅 제어 권한을 부여하는 핵심 권한 부여입니다.

![](/zh-cn/stage-3/cross-platform/android-app/images/image43.png)

### 4.2.5 폰에서 앱 실행

1. Android Studio 상단 기기 선택기에서 폰 모델이 보여야 합니다(예: `OPPO-PDKM00`)
2. ▶️ Run을 클릭합니다. 폰에 "USB 디버깅을 허용하시겠습니까?" 대화상자가 표시됩니다; "항상 허용"을 체크하고 확인합니다
3. 앱이 자동으로 설치되고 실행됩니다

이제 폰에서 목탁을 탭하고 실제 진동 모터 응답을 느껴보세요. 이것이 완전한 Vibe Coding 경험입니다.

![](/zh-cn/stage-3/cross-platform/android-app/images/image44.png)![](/zh-cn/stage-3/cross-platform/android-app/images/image45.png)![](/zh-cn/stage-3/cross-platform/android-app/images/image46.png)

# 5 앱을 APK로 패키징

코드가 완성되었고 실기기 테스트도 작동합니다. 이제 Android Studio에서 앱을 "꺼내어" 친구들에게 보내 설치할 수 있는 파일로 만들어야 합니다. 이 과정을 **패키징**이라고 합니다. Android 개발에서 패키징에는 완전히 다른 두 가지 모드가 있으며, 사용 시나리오에 따라 선택합니다.

## 5.1 디버그 버전 패키징(빠른 공유용)

친구들과 앱을 빠르게 공유하거나 테스트 폰에 보내 검증하고 싶다면 **디버그 버전**이 가장 빠른 옵션입니다. "초안"과 같아서 기능은 완전하지만 공식적으로 서명되지 않아 앱 스토어에 제출할 수 없습니다.

**단계는 매우 간단합니다:** Android Studio 상단 메뉴에서 `Build`를 찾고, `Generate App Bundles or APKs` 위에 마우스를 올린 다음, 하위 메뉴에서 `Generate APKs`를 클릭합니다.

![](/zh-cn/stage-3/cross-platform/android-app/images/image47.png)

프로젝트 크기에 따라 약 5초 정도 기다립니다. Android Studio 오른쪽 하단 콘솔 영역에 프롬프트가 나타납니다. 파란색 `locate` 링크를 클릭하면 출력 폴더가 자동으로 열립니다. `app-debug.apk`라는 파일이 우리가 원하는 패키지입니다.

WeChat이나 QQ를 통해 모든 Android 폰으로 직접 보낼 수 있으며, 받는 사람이 설치하여 사용할 수 있습니다. 디버그는 릴리스 버전이 아님을 참고하세요.

![](/zh-cn/stage-3/cross-platform/android-app/images/image48.png)

![](/zh-cn/stage-3/cross-platform/android-app/images/image49.png)

## 5.2 릴리스 버전 패키징

앱을 앱 스토어(예: Google Play 또는 Huawei AppGallery)에 게시하거나 설치 시 "안전하지 않은 앱" 경고를 피하려면 **릴리스 버전**으로 패키징해야 합니다. 이 버전은 고유한 **디지털 서명**이 필요하며, 이는 당신이 이 앱을 개발했고 변조되지 않았음을 증명하는 위조 방지 인장과 같습니다.

> 서명의 핵심 목적
>
> - 게시자 신원 확인: 동일한 패키지 이름을 가진 앱이 설치된 프로그램을 교체할 수 있으므로, 서명이 악용을 방지합니다
> - 앱 무결성 보장: 서명 과정은 패키지의 모든 파일을 포함하여 나중에 교체되지 않도록 합니다

Android 앱 서명은 도장을 찍는 것과 같습니다. 도장이 찍히면 앱과 개발자가 함께 잠깁니다: 앱은 당신의 것이고, 당신이 책임집니다. 다른 사람이 당신을 가장할 수 없고, 당신도 다른 사람을 가장할 수 없습니다.

**1단계: 서명 마법사 시작**

상단 메뉴에서 `Build`를 선택한 다음 `Generate Signed Bundle / APK`를 클릭합니다. 팝업 창에서 두 가지 선택에 직면합니다:

- Android App Bundle(`.aab`): Google Play에 필요하며, 크기가 더 작지만 폰에 직접 설치할 수 없습니다
- APK: 표준 설치 패키지로 직접 설치 가능
_데모를 위해 먼저 APK를 선택하고 Next를 클릭합니다._

![](/zh-cn/stage-3/cross-platform/android-app/images/image50.png)![](/zh-cn/stage-3/cross-platform/android-app/images/image51.png)

**2단계: 디지털 키(KeyStore) 만들기**

이것이 초보자가 가장 많이 막히는 부분입니다. 첫 번째 릴리스 패키징이므로 새로운 **keystore**를 만들어야 합니다. `Key store path` 아래의 **Create new**를 클릭합니다.

![](/zh-cn/stage-3/cross-platform/android-app/images/image52.png)

팝업에서 계정 등록과 유사하게 필수 정보를 입력합니다. keystore 비밀번호와 key alias 비밀번호를 **동일하게** 설정할 것을 강력히 권장하며, **잘 기록해 두세요**. 이 비밀번호를 잃어버리면 나중에 앱을 업데이트할 수 없습니다.

완료 후 OK를 클릭합니다. 이전 화면으로 돌아가면 방금 입력한 키 정보가 자동으로 채워져 있을 것입니다.

![](/zh-cn/stage-3/cross-platform/android-app/images/image53.png)![](/zh-cn/stage-3/cross-platform/android-app/images/image54.png)

**3단계: 공식 패키지 생성**

Next를 클릭하고 Build Variants에서 **release**를 선택한 다음 마지막으로 **Create**를 클릭합니다.

잠시 기다리면 Android Studio가 오른쪽 하단에 "Generate Signed APK" 성공 프롬프트를 다시 보여줍니다. **locate**를 클릭하면 이번에는 폴더에 디지털 서명된 공식 패키지가 보입니다(보통 `app-release.apk`라는 이름). 이 파일이 개발자로서 전달하는 최종 제품입니다.

![](/zh-cn/stage-3/cross-platform/android-app/images/image55.png)

![](/zh-cn/stage-3/cross-platform/android-app/images/image56.png)![](/zh-cn/stage-3/cross-platform/android-app/images/image57.png)

# 6 앱 스토어 / 마켓 공식 배포

앱 개발이 완료되고 릴리스 패키지가 준비되면, 다음 단계는 더 많은 사람들이 다운로드하고 사용할 수 있도록 배포하는 것입니다. 현재 주요 배포 채널은 **국내 Android 앱 스토어**와 **해외 앱 스토어(Google Play)** 두 가지로 나뉩니다.

## 6.1 국내 마켓에 배포

중국 본토의 Android 생태계는 특별합니다. 단일 공식 스토어가 없습니다(Google Play에 직접 접근할 수 없기 때문에). 대신 시장이 **폰 제조사 앱 스토어**와 **서드파티 플랫폼**으로 나뉘어 있습니다. 주요 **제조사 스토어**에는 Huawei, Xiaomi, OPPO, vivo, Meizu, Samsung 등이 있습니다. 기기에 사전 설치되어 있어 가장 많은 트래픽을 가집니다. 주요 **서드파티 플랫폼**에는 Tencent MyApp과 360 Mobile Assistant가 있습니다.

### 6.1.1 핵심 난관: 개인 개발자를 위한 "장벽"

계정을 등록하기 전에 알아야 할 매우 중요한 사항이 있습니다: **국내 앱 마켓은 개인 개발자에게 매우 엄격합니다.**

현재 거의 모든 주요 국내 앱 스토어(Huawei, Xiaomi, OV, MyApp 등)는 제출 시 *소프트웨어 저작권 등록 증명서*를 **요구**합니다.

![](/zh-cn/stage-3/cross-platform/android-app/images/image58.png)![](/zh-cn/stage-3/cross-platform/android-app/images/image59.png)

- **그것은 무엇인가요?** 앱이 당신의 것임을 증명하는 법적 문서입니다.
- **취득 비용**: 저작권국을 통해 신청해야 합니다. 직접 하면 보통 2-3개월이 걸리고, 대행사를 이용하면 수백에서 천 위안 이상이 들 수 있습니다.
- **현재 현실**: 이 증명서가 없으면 앱이 심사에서 거의 확실히 탈락하거나, 앱 항목을 만들 수조차 없을 수 있습니다. 또한 뉴스, 금융, 의료 등의 카테고리는 ICP 등록이나 다른 자격도 필요할 수 있습니다.

그러므로 앱이 단순히 개인 연습 프로젝트나 작은 도구이고 이 증명서를 신청하는 데 시간과 돈을 쓰고 싶지 않다면, 바로 6.2절로 건너뛰어 Google Play를 고려하거나 단순히 APK 파일을 친구들과 직접 공유하는 것을 권장합니다.

### 6.1.2 개발자 계정 등록

필요한 자격을 이미 준비했거나 국내 마켓에 배포하기로 결정했다면, 첫 번째 단계는 계정 등록입니다. 과정은 주요 플랫폼에서 비슷하며, 보통 개인은 신원 확인, 기업은 사업자등록증 확인이 필요합니다.

다음은 주요 앱 마켓의 개발자 플랫폼 URL입니다:

Tencent Open Platform: https://open.tencent.com/

360 Open Platform: http://dev.360.cn

Baidu Developer Platform: http://app.baidu.com

Xiaomi Open Platform: https://dev.mi.com

Huawei Developer Alliance: http://developer.huawei.com/consumer/cn

Alibaba Developer Platform: http://open.uc.cn
Alibaba 배포는 Wandoujia, Ali Jiuyou, PP Assistant, UC App Store, Shenma Search, YunOS App Store를 통합합니다. Alibaba 개발자 계정 하나만 등록하면 됩니다.

Samsung Developer Platform: http://support-cn.samsung.com/App/DeveloperChina/Home/Index

OPPO Developer Alliance: http://open.oppomobile.com

vivo Developer Alliance: https://dev.vivo.com.cn

Lenovo Open Platform: http://open.lenovo.com

Meizu Developer Alliance: http://open.flyme.cn

Gionee Developer Alliance: https://open.appgionee.com

**Tencent MyApp을 예로 들면:** Tencent Open Platform을 방문하여 등록을 클릭합니다. QQ 계정으로 직접 로그인하는 것이 좋습니다. QQ 계정이 한 번 바인딩되면 바인딩 해제가 어려우므로 전용 업무용 QQ 계정을 사용하는 것이 좋습니다. 안내에 따라 "개인 개발자" 또는 "기업 개발자"를 선택하고, 신분증 사진을 업로드하며, 얼굴 인증을 완료합니다. 인증을 통과한 후 **앱 만들기**를 클릭하여 시작합니다.

![](/zh-cn/stage-3/cross-platform/android-app/images/image60.png)![](/zh-cn/stage-3/cross-platform/android-app/images/image61.png)

![](/zh-cn/stage-3/cross-platform/android-app/images/image62.png)

### 6.1.3 제출 절차 및 필요 자료

계정 심사가 승인되면 앱을 만들고 심사에 제출할 수 있습니다. 다음 "네 가지 세트"를 준비해야 합니다:

1. **설치 패키지**: 5장에서 패키징한 **Release APK**
2. **텍스트 정보**:
3. **앱 이름**: 민감한 단어를 포함하지 않아야 합니다
4. **한 줄 소개**: 중국어 20자 이내, 간단하고 직접적으로(예: "편안한 전자 목탁 앱")
5. **상세 설명**: 중국어 200자 이상으로 앱의 기능과 사용 시나리오 소개
6. **시각 자료**:
7. **앱 아이콘**: 고화질 PNG, 보통 512x512
8. **앱 스크린샷**: 앱 사용 중 명확한 스크린샷 4-5장 준비, 주요 페이지를 커버하는 것이 좋으며, 보통 1080x1920과 같은 일관된 크기
9. **자격 문서**: 소프트웨어 저작권 등록 증명서 스캔본 업로드

**제출 및 심사:** 모든 정보를 입력하고 APK를 업로드한 후 **심사 제출**을 클릭합니다. 심사 주기는 보통 1-3 영업일입니다. 그 기간 동안 이메일이나 SMS에 주의하세요. 심사관이 스크린샷이 불명확하거나, 설명이 표준화되지 않았거나, 필요한 자격이 누락되었다는 이유로 제출을 반려할 수 있습니다. 그 경우 피드백에 따라 수정하고 다시 제출하세요.

## 6.2 해외 마켓에 배포(Google Play)

국내 앱 스토어에서 소프트웨어 저작권 증명서와 등록의 복잡성을 다루고 싶지 않거나, 대상 청중이 글로벌이라면 Google Play가 개인 개발자에게 최적의 선택입니다.

### 6.2.1 준비 사항

- **Google 계정**: 일반 Gmail 계정이면 충분합니다
- **$25 등록 수수료**: 이것은 **일회 평생 수수료**이며, USD 결제를 지원하는 신용카드(Visa / Mastercard)가 필요합니다
- **안정적인 네트워크 접속**: Google Play Console에 원활하게 접속할 수 있어야 합니다
- **공식 설치 패키지**: Google Play는 **.aab**(Android App Bundle) 형식이 필요하며 APK가 아닙니다. Android Studio에서 패키징 시 Android App Bundle을 선택합니다. 단계는 APK 패키징과 거의 동일합니다.

![](/zh-cn/stage-3/cross-platform/android-app/images/image63.png)

### 6.2.2 Google Play Console 배포 절차(개요)

Google Play 등록과 결제에는 여전히 진입 장벽이 있으므로(예: 해외 신용카드 필요), 이 튜토리얼은 현재 단계별 스크린샷을 제공하지 않습니다. 하지만 일반적인 4단계 절차를 소개합니다:

**1단계: 앱 만들기 및 콘솔 진입**

`Create app`을 클릭하고, 앱 이름(`Electronic Wooden Fish`)을 입력하고, 언어로 영어를 선택하고, 앱 유형으로 App과 Free를 선택한 다음 약관에 동의합니다. 그 후 백엔드에 접근할 수 있습니다.

**2단계: 스토어 페이지 꾸미기**

이것이 사용자의 첫인상입니다. 준비한 앱 **아이콘**(512x512)과 **특성 그래픽**(1024x500)을 업로드해야 합니다. 영어 설명은 간단히 Trae에게 물어볼 수 있습니다: **"Google Play에 전자 목탁을 게시하기 위한 영어 설명을 가볍고 편안한 톤으로 작성해 주세요."** AI가 보통 직접 번역하는 것보다 더 자연스럽게 작성합니다.

**3단계: 개인정보 보호 및 콘텐츠 등급**

- 개인정보 보호 정책: "App Privacy Policy Generator"를 검색하여 무료 링크를 생성하여 붙여넣습니다
- 콘텐츠 등급: 간단한 설문지 작성(예: 폭력이나 도박이 있는지 여부). 전자 목탁은 보통 일반 3+ 등급을 받습니다

**4단계: 업로드 및 게시**

`Production` 메뉴에서 `Create new release`를 클릭하고, `.aab` 파일을 업로드하고, 저장한 후 심사에 제출합니다. Google Play 심사는 보통 빠릅니다(1-3일). 승인되면 전 세계에서 앱을 다운로드할 수 있습니다.

![](/zh-cn/stage-3/cross-platform/android-app/images/image64.png)

_이미 개발자 계정 등록을 완료했다면, 이 영상 튜토리얼이 나머지 과정을 안내할 수 있습니다:_ [전체 워크플로: Android 앱을 Google Play에 업로드하기](https://www.bilibili.com/video/BV16REQzGEnk/?share_source=weixin&vd_source=b42f227a4f2d413fbde18499d83227cf)

# 7 마무리

이것으로 튜토리얼이 끝났습니다. 직접 만든 전자 목탁을 폰에서 보며 어떤 기분이 드시나요.

소프트웨어 엔지니어링을 전공한 사람으로서, 빠르게 발전하는 AI 시대에 꽤 감회가 새롭습니다. 과거에는 두꺼운 프로그래밍 책을 공부하고, 복잡한 문법을 배우고, 환경 설정과 씨름하며, 하루의 절반을 빨간 오류 메시지와 싸우며 보냈습니다. 하지만 시대가 변했고, 이제 우리는 점점 더 AI를 지시하는 법을 배우고 있습니다.

이 Vibe Coding 실습을 통해 여러분은 이미 완전한 Android 앱 개발 과정을 경험했습니다. 기술적 장벽은 확실히 낮아지고 있습니다. 더 이상 건조한 코드와 씨름하는 데 시간을 보낼 필요가 없으며, **무엇을 만들지 결정하는 데** 더 많은 에너지를 쏟을 수 있습니다. 하지만 도구가 아무리 강력해도 여전히 도구일 뿐입니다. 이 앱이 폰에서 먼지만 쌓이게 두지 마세요. 계속 만지고, 망가뜨리고, 다시 고치세요. 자신만의 아이디어를 가지고 그것을 실현하기 시작할 때 비로소 진정한 문턱을 넘게 됩니다.

이 튜토리얼이 "앱 만들기가 실제로 그렇게 어렵지 않다"는 느낌을 주었다면, 한 명의 새로운 세대 빌더를 개발 세계로 이끌 수 있게 도운 것을 영광으로 생각합니다.

여러분의 다음 창작을 진심으로 기대합니다. 계속 나아가세요!

![](/zh-cn/stage-3/cross-platform/android-app/images/image65.png)

**_Android 개발의 세계에서 즐거운 시간 보내시길!_**

# 참고 자료

CSDN: [Android Studio 프로젝트를 패키징/빌드하는 방법 (2024-03-04)](https://blog.csdn.net/GenuineMonster/article/details/136443130?ops_request_misc=&request_id=&biz_id=102&utm_term=android%20studio%20%E6%89%93%E5%8C%85%20APK%20%E5%B9%B6%E5%88%86%E4%BA%AB&utm_medium=distribute.pc_search_result.none-task-blog-2~all~sobaiduweb~default-1-136443130.142^v102^pc_search_result_base4&spm=1018.2226.3001.4187)

CSDN: [Android Studio 설치 및 구성](https://blog.csdn.net/Changersh/article/details/149838228?ops_request_misc=&request_id=&biz_id=102&utm_term=android%20studio%E5%AE%89%E8%A3%85%E5%8F%8A%E9%85%8D%E7%BD%AE&utm_medium=distribute.pc_search_result.none-task-blog-2~all~sobaiduweb~default-0-149838228.142^v102^pc_search_result_base4&spm=1018.2226.3001.4187)
