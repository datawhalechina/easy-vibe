# iOS 앱 구축 방법 - 네이티브 SwiftUI 개발

## 1장: iOS 앱과 iOS 앱 개발이란

이 튜토리얼에서는 완전한 폐죄 루프를 완성합니다: **마음속 아이디어에서 iPhone에 성공적으로 설치하고 실행할 수 있는 실제 iOS 앱까지.**

이 튜토리얼을 위해 최소한 다음이 필요합니다:

1. 비교적 최신 macOS가 실행되는 Mac
2. 비교적 최신 iOS 버전이 실행되며 개발자 모드가 활성화된 iPhone
3. Xcode가 성공적으로 설치됨
4. Trae가 설치되어 열려 있음
5. 사용 가능한 Apple ID

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image1.png)

### 1.1 iOS 앱

iOS 앱은 iPhone 운영 체제에서 실행되는 네이티브 애플리케이션입니다. 빠르게 실행되고 부드럽게 작동하며 알림, 카메라 및 로컬 저장소와 같은 시스템 기능을 깊이 활용할 수 있습니다.

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image2.png)

### 1.2 iOS 앱 개발

핵심적으로 iOS 앱을 구축하는 것은 몇 가지 일만 포함합니다:

1. 앱이 해결하는 문제 명확히 하기
2. 사용자가 보고 조작할 수 있는 인터페이스 디자인
3. 다양한 동작에서 앱의 행동 정의
4. 앱을 올바르게 빌드하고 iPhone에 설치

### 1.3 iOS 앱 구축의 일반적인 방법

실제 개발에는 iOS 앱을 구축하는 방법이 하나 이상 있습니다. 여기서는 깊이 들어가지 않고 전체적인 이해만 제공합니다.

첫 번째 방법은 Apple의 공식 네이티브 접근 방식입니다: Xcode에서 프로젝트를 만들고 Swift와 SwiftUI를 사용하여 인터페이스와 로직을 구축합니다.

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image3.png)

두 번째 방법은 React Native와 Flutter 같은 크로스 플랫폼 프레임워크를 사용하여 하나의 코드베이스를 여러 플랫폼에 적응시키는 것입니다.

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image4.png)

위의 접근 방식을 바탕으로 이 튜토리얼은 선택합니다: **네이티브 SwiftUI 개발을 기반으로 AI 도구가 코딩 작업의 대부분을 수행합니다.**

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image5.png)

### 1.4 이 튜토리얼에서 다루는 iOS 앱 개발 단계 (개요)

이 튜토리얼에서 사용되는 샘플 앱은 **FridgeChef**입니다.

사용자가 냉장고에 현재 있는 식재료를 입력하면 앱이 실제 AI API를 사용하여 가능한 레시피를 생성하고 결과를 로컬에 저장하여 나중에 검토할 수 있습니다. 이 예제는 UI 입력 및 표시, 네트워크 요청, 데이터 파싱, 로컬 저장소 및 실제 디바이스에서의 최종 설치 및 실행을 포함하여 실제 iOS 애플리케이션의 핵심 부분을 완전히 다룹니다.

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image6.png)

- 프로토타입에서 네이티브 앱까지의 전체 아이디어

구현에 있어 이 튜토리얼은 단계적 접근 방식을 채택합니다. 먼저 AI를 사용하여 HTML과 CSS로 인터페이스 프로토타입을 빠르게 생성하고 브라우저에서 레이아웃 구조와 정보 계층을 확인한 다음 SwiftUI로 마이그레이션합니다.

- 전체 개발 흐름 미리보기

전체적으로 다음 장들은 순서대로 다음 단계를 거칩니다:

1. 기본 이해 구축
   iOS 앱의 형태, 일반적인 개발 방법 및 이 샘플 앱이 해결하는 문제 이해.
2. 환경 설정 완료
   Mac과 iPhone 준비, 시스템 업데이트, Xcode와 Trae 설치 및 시뮬레이터에서 성공적으로 실행할 수 있는 기본 iOS 프로젝트 생성.
3. 본격적인 개발 시작
   Trae에서 프로젝트를 열고 AI와의 대화를 통해 점진적으로 UI와 기본 상호작용을 생성하여 앱을 빈 껍데기에서 사용 가능한 것으로 변환.
4. 디버깅 및 정리
   컴파일 오류가 나타나거나 동작이 예상과 다를 때 AI가 문제 해결을 돕도록 함; 구조가 복잡해지면 AI를 사용하여 리팩토링 및 단순화.
5. 실제 디바이스에서 실행
   서명 구성, 실제 iPhone에 앱 설치 및 코드에서 하드웨어까지 한 번의 완전한 검증 완료.

## 2장: 개발 환경 준비

### 2.1 필수 기기 및 시스템

이 실습에서는 두 가지 하드웨어를 대체할 수 없습니다: Mac과 iPhone.
동시에 두 기기 모두 **비교적 최신 공식 시스템 버전**을 실행해야 합니다.

#### 2.1.1 Mac

iOS 앱은 macOS에서만 개발하고 컴파일할 수 있습니다. 이것은 Apple 플랫폼의 하드 요구사항입니다.

Xcode가 정상적으로 설치되고 사용될 수 있도록 macOS를 비교적 최신 공식 버전으로 업데이트하는 것이 권장됩니다. **시스템 설정 -> 일반 -> 소프트웨어 업데이트**에서 확인하고 업데이트할 수 있습니다.

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image7.png)

#### 2.1.2 실제 iPhone 기기

Mac 외에도 이 튜토리얼은 앱이 올바르게 설치되고 실행될 수 있는지 확인하기 위해 실제 iPhone이 필요합니다.

디버깅 과정을 원활하게 하기 위해 iPhone도 비교적 최신 iOS 버전을 실행해야 합니다. **설정 -> 일반 -> 소프트웨어 업데이트**에서 확인하고 업데이트할 수 있습니다.

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image8.png)

이후 개발에서 이 iPhone은 실제 기기 디버깅을 위해 케이블로 Mac에 연결됩니다.

#### 2.1.3 iPhone에서 개발자 모드 활성화

Xcode에서 실제 기기에 디버그 앱을 설치하고 실행하려면 iPhone에서 개발자 모드를 활성화해야 합니다.

단계:

1. **설정** 열기
2. **개인정보 보호 및 보안** 들어가기
3. 맨 아래로 스크롤하여 **개발자 모드** 찾기
4. 켜기, 안내에 따라 기기 재시작
5. 재시작 후 기기 잠금 해제 및 개발자 모드 활성화 확인

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image9.png)

iPhone이 이전에 Xcode나 다른 개발 도구에 연결된 적이 없다면 **개인정보 보호 및 보안** 아래에 **개발자 모드**가 나타나지 않을 수 있습니다. 이것은 시스템 문제가 아닙니다 - 단순히 개발자 모드가 아직 트리거되지 않았음을 의미합니다.

그런 경우 다음 단계를 따라 나타나게 할 수 있습니다:

1. **설정 -> 개인정보 보호 및 보안 -> 분석 및 개선** 열기
2. **앱 개발자와 공유** 켜기
3. 한 단계 뒤로 돌아가 **개인정보 보호 및 보안** 다시 들어가서 맨 아래로 스크롤
4. 이제 **개발자 모드**가 보일 것입니다. 활성화하고 기기를 재시작

위 단계를 완료한 후 개발자 모드는 한 번만 활성화하면 됩니다. 이후 Xcode를 사용한 실제 기기 디버깅에는 이 설정을 반복할 필요가 없습니다.

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image10.png)

### 2.2 필수 소프트웨어

기기와 시스템이 준비된 후에도 개발에 사용할 소프트웨어를 설치해야 합니다. 이 튜토리얼은 두 가지 범주의 도구만 사용합니다: 공식 iOS 개발 도구와 AI 보조 개발 도구입니다.

#### 2.2.1 Xcode

Xcode는 Apple의 공식 iOS 개발 도구입니다. 이 튜토리얼에서는 주로 iOS 프로젝트 생성, Swift / SwiftUI 코드 컴파일 및 시뮬레이터나 실제 기기에서 앱 실행에 사용됩니다.

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image11.png)

Xcode는 App Store에서 직접 찾아 설치할 수 있습니다. 설치 후 처음 열면 환영 화면이 나타납니다. 이후 프로젝트 생성은 거기서 시작됩니다.

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image12.png)

#### 2.2.2 Trae

Trae는 이 튜토리얼에서 개발 작업이 수행되는 주요 환경입니다. 전체 iOS 프로젝트를 Trae에 넣고 대화를 통해 AI와 협업하여 개발을 완료합니다.

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image13.png)

### 2.3 Apple ID 및 개발 디버깅 참고 사항

iOS 플랫폼에서 앱을 실제 기기에 설치하려면 개발자 서명을 거쳐야 합니다. 이 튜토리얼은 Apple Developer Program 멤버십에 비용을 지불할 것을 요구하지 않습니다. 개인 Apple ID로 충분합니다.

### 2.4 다음 단계로 넘어가기 전 체크리스트

다음 장으로 넘어가기 전에 현재 상태를 아래 체크리스트와 비교할 수 있습니다.

이미 다음이 있어야 합니다:

1. 비교적 최신 macOS가 실행되는 Mac
2. 비교적 최신 iOS 버전이 실행되며 개발자 모드가 활성화된 iPhone
3. Xcode가 성공적으로 설치됨
4. Trae가 설치되어 열려 있음
5. 사용 가능한 Apple ID

이 모든 것이 준비되었다면 계속해서 첫 번째 iOS 앱을 만들 수 있습니다.

## 3장: 첫 번째 iOS 프로젝트 만들기

### 3.1 Xcode를 사용하여 새 프로젝트 만들기

Xcode를 엽니다. 환영 화면에서 새 프로젝트 만들기를 선택합니다.

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image14.png)

**Create new project**을 클릭하여 프로젝트 템플릿 선택 화면으로 들어갑니다.

### 3.2 앱 템플릿 및 기술 스택 선택

템플릿 선택 화면에서 다음 구성을 사용합니다:

1. 플랫폼: iOS
2. 애플리케이션 유형: App

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image15.png)

**Next**를 클릭하여 프로젝트 정보 구성 화면으로 들어갑니다.

### 3.3 프로젝트 정보 구성

프로젝트 정보 화면에서 기본 설정만 작성합니다:

1. 제품 이름: 앱 이름 (예: `FridgeChef`)
2. 팀: 개인 Apple ID 선택
3. 조직 식별자: 역방향 도메인 형식 (예: `com.example`)
4. Bundle Identifier: 자동 생성, 기본값 유지
5. 테스트 시스템: Swift Testing with XCTest UI Tests
6. 저장소: Core Data 선택 (나중에 레시피 기록 저장용)
7. 다른 옵션은 기본값 유지

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image16.png)

**Next**를 클릭하고 프로젝트 저장 위치를 선택합니다.

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image17.png)

### 3.4 생성 후 프로젝트 구조 파악

프로젝트가 생성되면 Xcode가 자동으로 워크스페이스를 엽니다. 이 시점에서 모든 파일을 이해할 필요는 없습니다. 몇 가지 핵심 부분만 파악하면 됩니다.

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image18.png)

기본 프로젝트에서 다음을 볼 수 있습니다:

- 프로젝트 이름으로 된 폴더
- `App`으로 끝나는 Swift 파일 (애플리케이션 진입점)
- `ContentView.swift` 파일 (기본 페이지)

이것은 이미 실행 가능한 가장 작은 iOS 앱입니다.

### 3.5 첫 번째 iOS 앱 실행

코드를 변경하기 전에 원래 프로젝트를 직접 실행합니다.

Xcode 상단 도구 모음에서 기본 iPhone 시뮬레이터가 선택된 상태를 유지하고 왼쪽 상단의 **Run** 버튼을 클릭합니다.

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image19.png)

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image20.png)

모든 것이 정상이면 시뮬레이터에 성공적으로 시작할 수 있는 빈 앱이 표시됩니다. 첫 번째 컴파일은 비교적 오래 걸릴 수 있습니다. 이후 장에서는 HTML 프로토타입을 먼저 사용하여 대기 시간을 줄입니다.

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image21.png)

앱을 중지하려면 Run 버튼 옆의 **Stop**을 클릭합니다.

### 3.6 이 단계에서 실제로 달성한 것

인터페이스는 여전히 간단하지만, 이미 몇 가지 핵심 확인을 완료했습니다:

1. 프로젝트가 성공적으로 컴파일됨
2. 시뮬레이터가 앱을 올바르게 실행함
3. 개발 프로세스가 종단 간 작동하는 것으로 입증됨

이것은 향후 문제가 주로 **코드와 로직 자체**에 집중될 것이며 환경 문제가 아님을 의미합니다.

### 3.7 프로젝트를 Trae에 전달

다음 섹션부터 주요 개발 작업이 점진적으로 Trae로 이동합니다.

해야 할 일은 간단합니다: **방금 만든 iOS 프로젝트 폴더를 Trae에서 엽니다.**

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image22.png)

## 4장: AI 보조 개발 실습 - FridgeChef를 처음부터 구축

이 장은 전체 튜토리얼의 핵심 부분입니다.

이 튜토리얼은 "먼저 SwiftUI를 작성하고 반복적으로 컴파일하며 미리보기를 계속 조정하는" 전통적인 경로를 사용하지 않습니다. 대신 더 효율적인 흐름을 사용합니다:
**먼저 \*\***HTML\***\*을 사용하여 인터페이스 구조를 빠르게 검증한 다음 확인된 결과를 SwiftUI로 마이그레이션하고 마지막으로 점진적으로 비즈니스 로직, 로컬 데이터 및 상호작용 세부 사항을 완성합니다.**

### 4.1 1단계: 요구사항 명확화

코드를 작성하기 전에 첫 번째 단계는 페이지를 구축하는 것이 아닙니다 - 무엇을 구축하는지 명확히 하는 것입니다. **AI가 먼저 \*\***제품 관리자\***\*처럼 행동하여 요구사항을 구조화된 명세서로 정리하게 합니다.**

Trae의 채팅 창에 다음 지시를 입력합니다. Trae는 프로젝트 루트에 `REQUIREMENTS.md` 파일을 생성하여 전체 앱의 기능과 구조를 설명합니다.

📋 **복사할 프롬프트:**

```text
이제 "FridgeChef"라는 iOS 앱을 개발하려고 합니다.

1. 핵심 개념
이것은 "냉장고에 남은 식재료로 뭘 요리해야 할지 모르겠다"는 문제를 해결하는 AI 어시스턴트입니다.
사용자가 현재 가진 식재료를 입력하면 앱이 대형 모델을 호출하여 실용적인 레시피를 생성합니다.

2. 핵심 기능
- 홈페이지:
  눈에 띄는 "요리 시작" 버튼을 표시하고 아래에 카드나 목록 형태로 과거 레시피 기록을 표시합니다.
- 입력 페이지:
  사용자가 식재료를 입력, 텍스트 입력이나 간단한 빠른 태그 지원.
- 결과 페이지:
  AI가 생성한 레시피 표시, 요리 이름, 식재료 목록 및 조리 단계 포함.

3. 기술 요구사항
- SwiftUI 사용
- 로컬 데이터 저장 (Core Data)
- 기본 페이지 네비게이션 및 상태 업데이트 지원

제품 관리자의 관점에서 이것을 명확하고 구조화된 REQUIREMENTS.md 문서로 정리하여 프로젝트 루트에 저장해 주세요.
```

생성 후 문서를 빠르게 읽고 기능 포인트가 기대와 일치하는지 확인합니다.

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image23.png)

### 4.2 2단계: 시각적 프로토타입

AI가 **HTML\*\*** + \***\*CSS**를 사용하여 고충실도 인터페이스 프로토타입을 빠르게 그리게 하여 전체 레이아웃과 스타일을 먼저 확인합니다. Trae에 계속 입력합니다:

📋 **복사할 프롬프트:**

```text
요구사항이 확인되었습니다.
HTML + Tailwind CSS를 사용하여 고충실도 인터페이스 프로토타입을 생성해 주세요.

디자인 스타일: Neo-Pop
색상:
- 배경: 연한 크림색 #FFFDF5
- 강조 색상: 애시드 그린 #CCFF00, 핫 핑크

시각적 특징:
- 3px 두꺼운 검은 테두리
- 블러 없는 하드 그림자 (오프셋 4px)
- 큰 둥근 카드, 전체적으로 스티커 / 만화 느낌

레이아웃 요구사항:
- 홈페이지는 Bento Grid 같은 레이아웃 사용
- 두 화면 포함: 홈페이지와 입력 페이지

단일 파일 index.html을 생성하고 콘텐츠 주변에 iPhone 화면 비율을 시뮬레이션하세요.
```

생성 후 파일 목록에서 `index.html`을 찾아 브라우저에서 직접 엽니다.

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image24.png)

이 단계에서 중요한 것은 모든 세부 사항이 완벽한지 여부가 아닙니다. 중요한 것은 **페이지 구조가 합리적인지, 주요 요소가 완전한지, 전체 방향이 올바른지**입니다.

### 4.3 3단계: 네이티브 재현

HTML 프로토타입이 완성되면 **확인된 인터페이스를 SwiftUI로 변환합니다.**

단계:

1. `index.html` 파일(또는 브라우저 스크린샷)을 Trae에 업로드
2. AI에게 이를 기반으로 SwiftUI 코드를 생성하라고 지시

📋 **복사할 프롬프트:**

```text
[index.html 업로드됨]

이 HTML 파일의 레이아웃과 스타일을 읽어주세요.

작업: 이 인터페이스를 현재 프로젝트에서 SwiftUI로 재현하세요.

요구사항:
1. 배경색, 두꺼운 테두리 및 하드 그림자를 포함하는 NeoPopStyle modifier 캡슐화
2. 홈 레이아웃을 위한 HomeView.swift 생성
3. 입력 페이지를 위한 InputView.swift 생성
4. 지금은 Mock Data를 사용하고 Xcode Preview와 시뮬레이터에서 올바르게 표시되는지 확인
```

완료 후 Xcode를 열고 시뮬레이터를 실행합니다. 완전한 시각적 구조를 가진 iOS 앱을 볼 수 있습니다.

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image25.png)

### 4.4 4단계: AI API 연결

인터페이스가 완성되면 앱은 여전히 디스플레이 레이어일 뿐입니다. 다음으로 실제 AI 기능을 연결해야 합니다. 이 튜토리얼에서는 **SiliconFlow**가 제공하는 대형 모델 서비스를 사용합니다:
[https://cloud.siliconflow.cn](https://cloud.siliconflow.cn/)

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image26.png)

SiliconFlow는 OpenAI API 사양과 호환되는 API를 제공하여 표준 네트워크 요청을 통해 iOS 프로젝트에서 편리하게 호출할 수 있습니다.

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image27.png)

시작하기 전에 사이트에서 계정을 등록하고 API Key를 생성해야 합니다.

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image28.png)

이 키는 이후 모델 호출에 사용됩니다.

📋 **복사할 프롬프트:**

```text
이제 AI 기능을 연결해야 합니다.

APIService.swift를 생성해 주세요.

구성:
- Base URL: https://api.siliconflow.cn/v1
- 모델: Qwen/Qwen2.5-7B-Instruct
- API Key: 지금은 변수로 정의해 두고 나중에 채우겠습니다

기능:
- generateRecipe(ingredients: [String]) 메서드 작성
- System Prompt는 모델이 순수 JSON만 반환하도록 엄격히 요구해야 함
- JSON 필드는 다음을 포함해야 함: dishName, ingredients, steps

또한 반환된 데이터를 파싱하기 위한 RecipeModel struct를 정의하세요.
```

코드가 생성된 후 `APIService.swift`에 자신의 키를 채웁니다.

### 4.5 5단계: Core Data 로컬 저장소

앱이 생성한 레시피를 기억하게 하려면 로컬 데이터 저장소를 도입해야 합니다. 이 단계는 두 단계로 나뉩니다.

**1단계: Xcode에서 Core Data 수동 구성**

1. `FridgeChef.xcdatamodeld` 열기
2. `RecipeEntity`라는 새 Entity 생성

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image29.png)

3. 다음 속성 추가:
   1. `id`: **UUID**
   2. `name`: **String**
   3. `cookTime`: **String**
   4. `difficulty`: **String**
   5. `desc`: **String**
   6. `timestamp`: **Date**
   7. `colorIndex`: **Integer 16**

      ![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image30.png)

**2단계: AI가 로직 코드 작성**

📋 **복사할 프롬프트:**

```text
Core Data Entity 구성을 완료했습니다.

Entity: RecipeEntity
속성: id, name, difficulty, timestamp, colorindex, cookTime, desc

다음 작업을 완료해 주세요:
1. 레시피 생성 성공 후 데이터를 Core Data에 저장
2. 홈페이지에서 FetchRequest를 사용하여 과거 기록을 읽고 역순으로 표시
3. 데이터베이스가 비어 있을 때 친근한 빈 상태 메시지 표시
```

### 4.6 6단계: 앱 아이콘 생성

마지막 단계는 앱에 적절한 아이콘을 준비하는 것입니다. 여기서는 **Lovart**를 사용하여 아이콘 자산을 생성합니다: [https://www.lovart.ai/zh](https://www.lovart.ai/zh)

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image31.png)![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image32.png)

📋 **Lovart에 복사할 프롬프트:**

```text
주제: 행복한 얼굴을 가진 귀여운 의인화된 냉장고 캐릭터
스타일: 미니멀 앱 아이콘, Neo-pop 스타일, 두꺼운 검은 외곽선, 벡터 아트
색상: 애시드 그린 (#CCFF00) 및 딥 블루
배경: 솔리드 크림 색상
Negative Prompt: 텍스트, 사실적인 세부 사항, 3D 렌더, 복잡한 배경
```

생성 후 이미지를 1024x1024로 자르고 Xcode의 `Assets.xcassets` -> `AppIcon`으로 드래그합니다.

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image33.png)

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image34.png)

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image35.png)

앱을 다시 실행하면 완전하고 인식 가능한 실제 iOS 애플리케이션을 볼 수 있습니다.

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image36.png)

### 4.7 7단계: 고급 경험 업그레이드

기능이 안정화된 후 시각적 스타일을 더 개선하고 싶다면 AI에게 원하는 효과를 설명하기만 하면 됩니다. 새 디자인 제안을 생성하게 하고 확인된 결과를 SwiftUI로 마이그레이션합니다.

📋 참조 프롬프트:

```text
앱의 기능은 이미 완성되었지만 시각적으로 더 강렬한 UI 스타일을 시도하고 싶습니다.
먼저 HTML + Tailwind CSS로 새 디자인 초안을 생성해 주세요. 파일명은 design_v2.html입니다.

디자인 스타일: Neo-Pop (도파민 스타일)
색상 요구사항:
딥 로얄 블루를 풀스크린 배경으로 사용
애시드 그린 (#CCFF00)을 강조 색상으로 사용

시각적 느낌:
모든 카드는 3px 두꺼운 검은 테두리 사용
투명도 블러 없는 하드 그림자 사용, 오른쪽 아래로 이동

레이아웃 요구사항:
홈페이지 구조 유지
알약 모양 버튼과 입력 상자 사용

브라우저에서 미리 볼 수 있도록 전체 코드를 생성해 주세요.
```

생성 후 브라우저에서 이 HTML 파일을 엽니다.

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image37.png)

HTML 버전이 확정되면 iOS 프로젝트 수정을 시작할 수 있습니다.

📋 참조 프롬프트:

```text
[design_v2.html 업로드됨]
이 HTML의 시각적 스타일을 분석하고 현재 iOS 프로젝트로 마이그레이션해 주세요.

작업 요구사항:
새로운 NeoPopStyle.swift 파일 생성
neoPopBlue() 스타일 modifier 캡슐화

modifier에 다음이 포함되어야 함:
- 둥근 모서리
- 두꺼운 검은 테두리
- 불투명 하드 그림자

HomeView 리팩토링:
- 배경을 딥 로얄 블루로 변경
- 기본 버튼에 애시드 그린 사용
- 과거 기록 카드에 흰색 배경 사용
- 어두운 배경에서 텍스트가 명확하고 읽기 쉽게 유지되는지 확인

수정된 전체 코드를 제공해 주세요.
```

Xcode에서 Run을 다시 클릭합니다. 모든 것이 작동하면 다음을 볼 수 있습니다:

- 기능은 이전과 완전히 동일함
- 시각적 스타일이 크게 변경됨
- 전체적인 앱 품질이 눈에 띄게 업그레이드됨

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image38.png)

## 5장: 실행, 디버깅 및 오류 처리

이전 장에서 핵심 기능을 완성하고 시뮬레이터에서 앱을 성공적으로 실행했습니다.
하지만 iOS 앱의 진정한 완성은 "성공적으로 컴파일됨"이 아니라 **안정적인 실행과 문제가 나타났을 때 처리 방법을 아는 것**입니다.

### 5.1 Xcode에서 앱 실행

먼저 프로젝트가 Xcode에서 올바르게 실행될 수 있는지 확인합니다.

Xcode 왼쪽 상단에서 실행 기기를 선택하고 기본 iPhone 시뮬레이터를 유지합니다. **Run** 버튼을 클릭하여 컴파일하고 실행합니다. 모든 것이 정상이면 앱이 시뮬레이터에서 시작되고 4장에서 구축한 인터페이스가 표시됩니다.

### 5.2 실제 기기에서 앱 실행

케이블을 사용하여 iPhone을 Mac에 연결합니다.

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image39.png)

처음 연결할 때 휴대전화에 **이 컴퓨터를 신뢰하시겠습니까?**가 표시됩니다. 신뢰를 누르고 잠금 해제 암호를 입력합니다.

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image40.png)

Xcode의 기기 목록에서 iPhone을 선택한 다음 **Run**을 다시 클릭합니다.

이 시점에서 휴대전화 홈 화면에 **FridgeChef** 아이콘이 보이고 정상적으로 열고 사용할 수 있습니다.

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image41.png)

이 단계는 하나의 완전한 iOS 개발 폐쇄 루프의 완성을 표시합니다.

### 5.3 iOS 개발 오류의 일반적인 원인

실제 개발에서 **오류를 만나는 것은 정상**이며 예외가 아닙니다.

일반적인 문제는 보통 다음 범주에서 옵니다:

1. **컴파일 오류**
   Swift 구문, 타입 불일치, 누락된 매개변수 등. Xcode가 빨간색으로 직접 강조 표시합니다.
2. **런타임 오류**
   앱이 컴파일되지만 실행 중 충돌 - 예: 배열 범위 초과 또는 nil 값 강제 언래핑.
3. **권한 또는 구성 오류**
   네트워크 요청이 시스템에 의해 차단, Info.plist 구성 누락, 서명 문제 등.
4. **로직 오류**
   앱이 충돌하지 않지만 동작이 잘못됨 - 예: 버튼이 응답하지 않거나 데이터가 새로고침되지 않음.

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image42.png)

오류가 나타나면 **전체 오류 메시지를 그대로 Trae의 채팅 상자에 복사**하기만 하면 됩니다. 프로젝트 컨텍스트를 인식하고 있는 Trae가 디버깅을 도울 수 있습니다.

### 5.4 일반적인 실제 기기 디버깅 오류 및 해결 방법

실제 기기 디버깅 중 오류는 매우 일반적입니다. 이러한 문제는 보통 코드 자체가 아닌 기기 신뢰, 보안 규칙 또는 서명 구성으로 인해 발생합니다. 앱이 iPhone에서 원활하게 실행되지 않으면 이 섹션을 먼저 확인할 수 있습니다.

#### 1. 서명 및 등록 문제

**일반적인 증상:**

- Xcode에 다음과 같은 빨간 오류 표시
  `"Communication with Apple failed"`
  또는
  `"No profiles for 'com.xxx.xxx' were found"`
- 또는 다음과 같이 표시
  `"Your team has no devices which are compatible"`

**원인:**

- Bundle Identifier가 고유하지 않거나 유효하지 않음
- 현재 iPhone이 개발용 Apple ID에 아직 등록되지 않음

**해결 방법:**

1. **Bundle Identifier 수정**
   Xcode 프로젝트 설정에서 Bundle Identifier를 더 고유한 것으로 변경, 예:
   `com.yourname.FridgeChef`
2. **Xcode가 자동으로 기기를 등록하게 함**
   오류 프롬프트에서 `Try Again` 또는 `Register Device`를 클릭하고 Xcode가 기기 등록 및 인증서 구성을 자동으로 완료하게 합니다.

#### 2. 기기 페어링 및 연결 문제

**일반적인 증상:**

- Xcode에 다음과 같이 표시
  `"Device is not available because pairing is in progress"`
- 또는 다음과 같이 표시
  `"Device Locked"`
- 또는 이미 Trust를 눌렀지만 Xcode가 여전히 멈춰 있음

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image43.png)

**원인:**

- iPhone이 여전히 잠겨 있음
- 페어링 프로세스가 완전히 완료되지 않음
- Xcode가 연결 상태를 새로고침하지 않음

**해결 방법:**

1. 휴대전화 잠금 해제
   iPhone이 잠금 해제되어 홈 화면에 머물도록 확인.
2. 신뢰 프로세스 완료
   휴대전화에 **이 컴퓨터를 신뢰하시겠습니까?**가 표시되면 **신뢰**를 누르고 **잠금 화면 암호를 입력**합니다.
3. 연결 상태 새로고침
   여전히 멈춰 있으면 케이블을 뽑고 2-3초 기다린 후 다시 연결. 필요하면 Xcode를 재시작하고 다시 시도.

#### 3. 앱이 설치되지만 열 수 없음

**일반적인 증상:**

- 앱 아이콘이 이미 iPhone 홈 화면에 나타남
- 시스템에 다음과 같이 표시
  **신뢰할 수 없는 개발자**

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image44.png)

**원인:**

이것은 iOS 보안 메커니즘입니다. 개인 Apple ID로 설치된 디버그 앱은 수동 신뢰 권한 부여가 필요합니다.

**해결 방법:**

1. **설정** 열기
2. **일반** 들어가기
3. **VPN 및 기기 관리** 누르기
4. **개발자 앱** 아래에서 Apple ID 찾기
5. **신뢰** 누르고 다시 확인

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image45.png)

그 후 홈 화면으로 돌아가 앱을 다시 누릅니다. 이제 정상적으로 실행될 것입니다.

## 6장: 앱을 App Store에 출판하려면

이 튜토리얼에서 주로 완성한 것은 **개인 개발 및 디버깅 버전 앱**의 완전한 폐쇄 루프입니다: 프로젝트 생성, 기능 구현 및 디버깅에서 실제 기기에 성공적으로 설치하고 사용하는 것까지.

더 나아가 앱을 공식적으로 **Apple App Store**에 출판하여 모든 사용자가 다운로드하고 사용할 수 있게 하려면 더 공식적인 출시 프로세스에 진입해야 합니다. 그 프로세스는 유료 개발자 계정, 심사 규칙 및 준수 요구사항이 관련되며 이 튜토리얼의 주요 실습 초점이 아니므로 다음 내용은 **전체적인 참조 및 로드맵**으로만 제공됩니다.

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image46.png)

> 다음 내용은 Apple의 공식 심사 요구사항과 공개 경험 논의(원본 지후 공유 포함)를 참조합니다. 링크는 아래에 나열됩니다. 링크에 접근할 수 없게 되면 제목이나 키워드로 검색하여 원본을 찾을 수 있습니다.

### 6.1 Apple Developer Program

앱을 App Store에 출판하려면 Apple의 유료 개발자 프로그램에 가입해야 합니다:

- **Apple Developer Program** (연간 USD $99)
- 공식 사이트: [https://developer.apple.com/](https://developer.apple.com/)

가입 후 **App Store Connect**를 사용하여 앱 항목을 만들고 버전을 관리하며 공식적으로 출판할 수 있습니다.

### 6.2 App Store Connect: 앱 항목 만들기

App Store Connect에서 다음을 포함하되 이에 국한되지 않는 완전한 앱 기록을 만들어야 합니다:

1. 앱 이름 및 Bundle ID
2. 설명, 키워드 및 개인정보 보호정책 링크
3. 앱 아이콘, 스크린샷 및 미리보기 자료
4. 가격 및 배포 지역 설정

이 모든 정보는 제출 전에 완료되어야 합니다.

### 6.3 빌드 및 심사 제출

메타데이터가 준비되면:

1. Xcode에서 유료 개발자 계정을 사용하여 Release 빌드 서명
2. 공식 버전 빌드 및 업로드
3. App Store Connect에서 심사 제출

제출 후 앱은 Apple의 심사 대기열에 들어갑니다. 심사 시간은 보통 1-3일이며 사례에 따라 다릅니다.

### 6.4 심사 규칙 및 거부의 일반적인 이유

Apple은 주로 다음 측면에서 앱을 심사합니다:

- 기능 및 안정성
- 개인정보 및 데이터 준수
- 메타데이터와 실제 기능 간의 일관성
- 침해 또는 오해의 소지가 있는 행위 여부

앱이 요구사항을 충족하지 않으면 심사가 거부되고 Apple이 구체적인 이유를 제공합니다. 개발자는 앱을 수정하고 다시 제출해야 합니다.

### 6.5 거부 후 해야 할 일

앱이 거부되면:

- 피드백에 따라 코드나 설명 수정
- 버전 다시 제출
- App Store Connect를 통해 심사 팀과 소통

이것은 출판 프로세스의 매우 일반적인 부분이며 프로젝트가 실패했다는 의미가 아닙니다.

### 참고 자료

다음 내용은 Apple 공식 문서 및 공개 경험 공유를 참조합니다:

- App Store 심사 가이드라인 (Apple 공식)
  [https://developer.apple.com/app-store/review/guidelines/](https://developer.apple.com/app-store/review/guidelines/?utm_source=chatgpt.com)
- 심사 제출 공식 가이드
  [https://developer.apple.com/cn/help/app-store-connect/manage-submissions-to-app-review/submit-for-review](https://developer.apple.com/cn/help/app-store-connect/manage-submissions-to-app-review/submit-for-review?utm_source=chatgpt.com)
- iOS App Store 출판 및 심사 함정 완전 그림 가이드 (지후)
  [https://zhuanlan.zhihu.com/p/146128612](https://zhuanlan.zhihu.com/p/146128612)

## 7장: 요약

![](../../../../zh-cn/stage-3/cross-platform/ios-app/images/image47.png)

축하합니다! 이제 여러분은 0에서 1까지 완전한 iOS 앱 개발 프로세스를 직접 경험했습니다. 환경 설정, 프로젝트 실행, 그리고 점진적으로 인터페이스, 기능, 데이터 및 실제 기기 테스트에 이르기까지 모든 핵심 단계가 순조롭게 완료되었습니다. 더 중요한 것은 Swift 구문을 암기해서가 아니라 구현의 대부분을 AI에 맡겼다는 것입니다. 배경이 무엇이든 이런 시도는 여러분을 더 유창하게 만들며 iOS 개발이 생각했던 것만큼 어렵지 않다는 것을 깨닫게 될 것입니다. 이전에 한 줄의 코드도 작성할 수 없었어도 자신만의 앱을 구축할 수 있습니다.

돌이켜 보면 전체 과정은 실제로 그렇게 복잡하지 않습니다: 구축하고 싶은 것을 결정하고, HTML로 인터페이스를 빠르게 테스트하고, SwiftUI로 변환하고, API와 로컬 데이터를 연결한 다음 디버깅을 한 번 실행합니다. 이를 바탕으로 미래에는 개인 알람 시계, 미니멀 todo 목록 또는 좋아하는 유명인의 어조로 말하는 챗봇도 쉽게 구축할 수 있습니다.

이것이 바로 이 튜토리얼 - 그리고 easy-vibe - 가 가르치고자 하는 가장 중요한 것입니다. 여러분 미래의 바이브 코딩 마스터들의 최신 창작물을 기대하며, 여러분의 작품에 감탄할 날을 고대합니다.
