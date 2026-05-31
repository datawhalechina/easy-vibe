# 개인 웹사이트 및 학술 블로그 만들기 - GitHub Pages를 이용한 정적 배포

# 1. 개인 웹사이트와 학술 블로그란?

이 튜토리얼에서는 하나의 완전한 사이클을 따라가 보겠습니다: **기존 웹사이트 템플릿을 찾아서, 이를 일론 머스크의 개인 홈페이지로 수정하고, 최종적으로 무료로 온라인에 공개하기까지**.

이 튜토리얼을 위해 최소한 다음이 필요합니다:

* **컴퓨터** (Windows 또는 Mac)
* **GitHub 계정** (웹사이트 코드 저장 및 무료 호스팅용)
* **Trae 설치** (AI 코딩 파트너)
* **Git 환경**
* **Ruby 환경**

## 1.1 학술 개인 홈페이지란?

**학술 개인 홈페이지**는 인터넷 상의 나만의 영토입니다.

WeChat Moments, Zhihu 또는 LinkedIn과 달리, 어떤 플랫폼의 추천 알고리즘에도 의존하지 않으며, 플랫폼이 폐쇄되어도 사라지지 않습니다. Google과 Google Scholar에 인덱싱될 수 있는 장기적이고 안정적인 **개인 쇼케이스 공간**입니다. 일반적으로 약력, 출판물, 프로젝트 및 기술 블로그가 포함됩니다.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image1.png)

## 1.2 왜 직접 웹사이트를 만들어야 할까요?

Vibe Coding 개발 모델에서는 더 이상 10년 전처럼 두꺼운 HTML/CSS 책을 뒤적일 필요가 없습니다. AI를 통해 웹사이트 구축의 역할이 "고군분투하는 코더"에서 "웹사이트 총편집자"로 바뀝니다:

1. **당신 (편집자 / PM)**: 사이트의 톤앤매너와 콘텐츠를 결정합니다. 예: "머스크의 화성 식민지 PPT를 여기에 배치해" 또는 "이 버튼을 테슬라 레드로 바꿔."
2. **Trae (AI 엔지니어)**: 어려운 구현 작업을 처리합니다. 자연어 지시를 코드로 변환하며, 레이아웃, 색상 구성 및 모바일 대응까지 모두 포함합니다.
3. **GitHub Pages (쇼룸)**: 무료 서버와 도메인을 제공하여 전 세계 사람들이 당신의 작품을 볼 수 있게 합니다.

**학계나 기술 분야 종사자에게 왜 가치가 있을까요?**

* **대외적 (영향력 구축)**: **"상시 유효한 명함"**입니다. 박사 과정 지원, 취업 또는 협업 시 깔끔한 개인 홈페이지는 PDF 이력서보다 훨씬 설득력이 있습니다.
* **대내적 (지식 축적)**: 당신의 **"제2의 뇌"**입니다. 강의 노트, 기술 고찰을 기록하고 자신만의 지식 체계를 구축하는 데 사용할 수 있습니다.
* **미래를 위해 (검색 가능성)**: 검색 엔진은 구조화된 콘텐츠를 선호합니다. 홈페이지가 있으면 누군가 당신의 이름을 검색할 때 **당신이 정의한 콘텐츠**가 먼저 나타나며, 동명이인의 관련 없는 콘텐츠가 아닙니다.

## 1.3 개인 웹사이트 구축의 네 가지 전형적인 방법

실제로 웹사이트를 구축하는 방법은 무수히 많습니다. 여기서는 가장 대중적인 네 가지만 소개합니다:

**방법 1: HTML / CSS / JS로 처음부터 직접 작성하기**
전통적인 컴퓨터 공학 루트입니다. 코드를 한 글자씩 직접 작성합니다. 장점은 극단적인 유연성입니다. 단점은 매우 높은 진입 장벽이며, CSS 조정에 갇히기 쉽습니다. 콘텐츠에 집중하고자 하는 우리에게는 이상적이지 않습니다.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image2.png)

**방법 2: Wix / WordPress 같은 비주얼 사이트 빌더**
블록 쌓기와 같습니다. 장점은 쉬운 드래그 앤 드롭 편집입니다. 단점은 종종 유료이며, 부풀려진 코드를 생성하기 쉽고, 학술적인 느낌이 부족하며, 심층 커스터마이징이 어렵습니다.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image3.png)

**방법 3: GitHub 기반 템플릿 (정적 사이트 생성기)**
학계와 Geek 커뮤니티에서 **가장 권장되는** 메인스트림 루트입니다. Jekyll이나 Hugo 기반 등 다른 사람이 작성한 성숙한 템플릿을 직접 fork하여, 구성 파일과 콘텐츠만 수정합니다.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image4.png)

**방법 4: Vibe Coding (AI 시각 생성 워크플로우)**
강력한 멀티모달 시각 이해력을 가진 AI 에이전트를 사용하면, 마음에 드는 웹사이트 스타일을 발견하고 스크린샷을 찍은 다음 AI에게 "이 스타일로 웹페이지를 만들어줘"라고 말하기만 하면 됩니다. AI가 시각적 요소를 분석하고 기반이 되는 코드를 생성합니다.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image5.png)

**이 튜토리얼의 선택: GitHub Pages + 학술 템플릿 + AI 수정.**
이유는 간단합니다:

* **무료 비용**: 서버 구매 필요 없음, 도메인 구매 필요 없음.
* **높은 품질**: 템플릿은 종종 최고 개발자들이 디자인하며, 미니멀한 스타일, 전문적인 구조, 빠른 로딩 속도를 갖추고 있습니다.
* **유지보수 용이**: 주로 Markdown을 작성하며, 비슈 문서나 Notion에서 작성하는 것과 비슷하고, AI가 웹페이지 생성을 도와줍니다.

## 1.4 이 튜토리얼의 전체 로드맵

구성 과정을 더 직관적이고 지루하지 않게 만들기 위해, 우리는 재미있는 사례를 사용할 것입니다: **머스크를 위한 학술 홈페이지 구축**.

일론 머스크는 대학 교수가 아니지만, *Hyperloop Alpha*와 같은 많은 공개 "기술 백서"를 발표했으며, SpaceX와 Tesla 같은 유명한 프로젝트도 많이 있습니다. 우리는 이 자료들을 테스트 데이터로 사용하고, Trae의 Vibe Coding 워크플로우와 함께 재사용 가능한 사이트 구축 루트를 따라가 보겠습니다:

1. **뼈대 찾기**: GitHub에서 고품질 웹사이트 템플릿을 찾아 자신의 리포지토리로 fork합니다.
2. **환경 준비**: 코드를 로컬로 가져오고 Trae를 구성하여 AI가 프로젝트를 읽을 수 있게 합니다.
3. **AI와 반복**: 템플릿의 플레이스홀더 인물을 일론 머스크로 교체하고, 이력서를 업로드하고, "출판물 목록"을 "기술 백서 쇼케이스"로 변경하고, AI에게 사이트를 "화성 레드"로 재색칠해 달라고 요청할 수도 있습니다.
4. **온라인 배포**: 수정된 코드를 GitHub에 다시 푸시하고 즉시 접근 가능한 웹사이트 URL을 얻습니다.

이 섹션은 큰 그림을 그리는 역할만 합니다. 지금은 메인 라인만 기억하세요:
**템플릿 fork -> AI 리모델링 -> 온라인 푸시**
다음 섹션에서 모든 단계를 함께 살펴보겠습니다.

# 2. 환경 준비

## 2.1 이 튜토리얼에서 사용하는 도구

전체 구축 과정은 네 가지 도구나 리소스를 사용하며, 각각 디자이너, 시공사, 토지 소유자 또는 물류 시스템의 역할을 담당합니다.

* **컴퓨터**: Windows 또는 Mac 모두 괜찮습니다. 높은 메모리 요구사항이 흔한 Android 개발과 달리, 웹 개발은 매우 가볍고 일반 사무용 노트북에서 원활하게 실행됩니다.
* **Trae**: **AI 코딩 파트너**이자 핵심 생산성 도구입니다. Vibe Coding 모드에서는 HTML이나 CSS 문법을 마스터할 필요가 없습니다. 자연어로 AI에게 "네비게이션 바를 검은색으로 바꿔" 또는 "머스크 사진을 여기에 놔"라고 말하면 코드를 작성하고 수정해 줍니다.
* **GitHub 계정**: **무료 서버이자 코드 금고**입니다. 모든 웹사이트 파일을 저장하는 데 필요합니다. 가장 중요한 것은 **GitHub Pages**를 사용하여 코드를 전 세계에서 접근 가능한 URL로 무료로 변환할 수 있다는 점이며, 서버나 도메인 구매가 필요 없습니다.
* **Git 환경**: 무대 뒤의 **배달부**입니다. Trae에서 로컬로 코드를 작성하지만, Git이 컴퓨터에서 GitHub로 코드를 푸시합니다. Git 명령어를 마스터할 필요는 없으며, Trae가 호출을 도와줄 수 있지만, Git은 먼저 설치되어야 합니다.
* **Ruby 환경**: 로컬 **웹페이지 워크숍**입니다. 이 튜토리얼의 학술 템플릿은 Ruby 위에서 실행되는 Jekyll을 사용하므로, 온라인으로 푸시하기 전에 자신의 컴퓨터에서 웹사이트를 미리 보려면 로컬에 Ruby가 필요합니다.

## 2.2 Trae 다운로드

**Trae**는 Vibe Coding의 주요 전장입니다. **슈퍼 AI가 내장된 코드 편집기**라고 생각하면 됩니다. 전통적인 차가운 편집기와 달리, 옆에 앉아있는 경험 많은 프로그래머처럼 항상 도움을 줄 준비가 되어 있습니다.

* **다운로드 주소**: 공식 웹사이트 [https://www.trae.cn](https://www.trae.cn)을 방문하여 운영 체제용 버전을 다운로드하세요, Windows 또는 Mac.
* **설치**: 설치는 매우 간단합니다. WeChat이나 QQ를 설치하는 것과 같습니다. 설치 패키지를 더블클릭하고 완료될 때까지 "다음"을 클릭하세요.

이 도구를 준비한 후, 다음 실습 단계에서는 지루한 코드 창을 응시할 필요가 없습니다. 여기서 프로젝트를 직접 열고 오른쪽 채팅 패널을 사용하여 자연어로 AI에게 코드 작성, 버그 수정, 전체 페이지 리팩토링을 요청하면 됩니다.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image6.png)

## 2.3 Git 다운로드

**Git이란?**
Trae가 Vibe Coding에서 코드 작성을 담당하는 AI 엔지니어라면, **Git은 코드 운송을 담당하는 배달부**입니다. 컴퓨터에서 작성된 코드를 포장하여 GitHub 클라우드 리포지토리로 안전하게 푸시하는 데 필요합니다. 없으면 사이트는 자신의 컴퓨터에서만 실행되고 다른 사람은 볼 수 없습니다.

과거에는 공식 웹사이트에 가서 설치 프로그램을 다운로드하고 환경 변수를 수동으로 구성해야 했습니다. 귀찮은 일이었습니다. 이제는 간단히 Trae가 감지하고 설치하도록 도와달라고 요청하면 됩니다.

**1단계: Git이 이미 설치되어 있는지 확인**

Trae를 열고 오른쪽 하단 채팅 패널에 다음 지시를 입력하세요:

```markdown
이 컴퓨터에 Git이 이미 설치되어 있는지 확인해 주세요. 터미널에서 `git --version` 명령을 실행해 주세요.
```

* **케이스 A (이미 설치됨)**: `git version 2.xx.x`와 같은 내용이 보이면 축하합니다. 설치 단계를 바로 건너뛰어도 됩니다.
* **케이스 B (설치되지 않음)**: "command not found" 또는 빨간색 오류 메시지 그룹이 보이면 아래를 계속 진행하세요.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image7.png)

**2단계: AI 지원 설치**

Trae를 닫지 마세요. 채팅 패널에 계속 입력하세요:

**지시 (Windows 사용자):**

```markdown
Git이 설치되어 있지 않습니다. `winget` 명령줄 도구를 사용하여 Git을 자동으로 설치하는 명령을 작성해 주시고, 터미널에서 실행하는 방법을 알려주세요.
```

**지시 (Mac 사용자):**

```markdown
Git이 설치되어 있지 않습니다. 터미널 명령을 사용하여 Git을 빠르게 설치하는 방법을 알려주세요. 예를 들어 `git` 또는 `brew`를 사용하여.
```

Trae가 명령을 제공할 것입니다. 보통 `winget install --id Git.Git`과 같은 형태입니다.

코드 블록의 **터미널에서 실행** 버튼을 클릭하거나, 하단 터미널에 복사하여 Enter를 누르기만 하면 됩니다. Git이 자동으로 다운로드되고 설치됩니다.

AI 지원 과정이 완벽하지 않다고 느껴진다면, 이 튜토리얼을 참조하여 수동 다운로드 및 설치를 진행할 수 있습니다:
[Git 다운로드 및 설치 튜토리얼](https://blog.csdn.net/weixin_41293671/article/details/144255269?ops_request_misc=elastic_search_misc&request_id=63236900b52320a7beb177787ba97f07&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~baidu_landing_v2~default-5-144255269-null-null.142^v102^pc_search_result_base4&utm_term=git%E4%B8%8B%E8%BD%BD%E5%AE%89%E8%A3%85&spm=1018.2226.3001.4187)

## 2.4 Ruby 환경 설치

공식적으로 코드 작성을 시작하기 전에, 퍼즐의 마지막 조각이 하나 더 필요합니다. 이 튜토리얼에서 사용하는 학술 홈페이지 템플릿은 Jekyll로 구축되었으며, Jekyll 자체는 Ruby 프로그래밍 언어를 기반으로 합니다.

코드를 GitHub에 푸시하여 전 세계에 공개하기 전에 자신의 컴퓨터에서 "리모델링 효과"를 미리 보고 디버깅하려면 컴퓨터에 Ruby 환경을 설치해야 합니다. 이는 컴퓨터에 Ruby를 이해하는 통역사를 고용하는 것과 같다고 생각하면 됩니다. 걱정 마세요, Ruby 작성법을 배울 필요는 없습니다. 설치만 하면 되며, Trae가 나머지를 처리할 수 있습니다.

### 2.4.1 Windows 설치

**1단계: 국내 미러를 통해 설치 프로그램 다운로드**

Windows 사용자의 경우, 공식 웹사이트 https://rubyinstaller.org/downloads/에서 원클릭 설치 프로그램을 제공하지만, 네트워크 차이로 인해 팁을 아는 것이 도움이 됩니다. 초보자를 위한 공식 권장 사항은 일반적으로 **`Ruby+Devkit 3.X.X (x64)`**이며, 필요한 툴체인이 포함되어 있기 때문입니다.

**초보자 알림**: 실제로 공식 웹사이트에서 직접 다운로드하는 것은 느리거나 실패할 수 있습니다. [RubyInstaller for Windows - 중국 미러](https://rubyinstaller.cn/)의 국내 미러 사용을 강력히 권장하며, 일반적으로 훨씬 빠릅니다.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image8.png)

**2단계: 설치 실행**

다운로드한 설치 프로그램을 더블클릭하세요. 설정 마법사에서 **"Add Ruby executables to your PATH"**를 반드시 체크하세요. 이것이 가장 중요한 단계입니다. 그렇지 않으면 컴퓨터가 방금 설치한 통역사를 "찾을" 수 없습니다.

체크한 후 계속 **Next**를 클릭하여 설치를 완료하세요.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image9.png)

**3단계: 개발 툴킷 구성**

설치 진행률이 완료되면 검은색 명령줄 창이 자동으로 열립니다. 당황하지 마세요. 커서가 깜박이는 곳에 숫자 `3`을 입력하세요. 이는 MSYS2 기본 환경과 MINGW 툴체인을 설치한다는 의미이며, 그런 다음 Enter를 누르세요. 명령 실행이 완료되고 창이 자동으로 닫힐 때까지 기다리세요.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image10.png)

**4단계: 결과 확인**

이제 AI에게 숙제 검사를 부탁할 차례입니다. Trae를 열고 오른쪽 채팅에 다음 자연어 지시를 입력하세요:

```markdown
이 컴퓨터에 Ruby 환경이 올바르게 설치되었는지 확인해 주세요. 하단 터미널에서 `ruby -v` 명령을 실행하고 결과를 알려주세요.
```

Trae가 `ruby 3.x.x`와 같이 응답하면 Windows Ruby 환경이 완전히 설정된 것입니다.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image11.png)

### 2.4.2 Mac 설치

Mac 환경 구성은 "Geek적"인 느낌이 더 듭니다. 보통 터미널 명령이 필요하기 때문입니다. 하지만 Vibe Coding 모드에서는 터미널을 수동으로 열 필요조차 없습니다. Trae를 개인 IT 운영자로 활용하면 됩니다.

**1단계: 원샷 환경 설정 지시 내리기**

Trae를 열고 오른쪽 채팅에 다음 자연어 지시를 붙여넣으세요. Homebrew 확인, 누락 시 설치, 그 다음 Ruby 설치를 처리해 달라고 요청하겠습니다:

```markdown
Mac 컴퓨터를 사용 중이며 Ruby 개발 환경을 구성해야 합니다. 다음 단계를 완료하도록 도와주세요:
1. Homebrew가 이미 설치되어 있는지 확인해 주세요. 설치되어 있지 않다면 터미널에서 Homebrew 공식 설치 스크립트를 실행해 주세요.
2. Homebrew가 준비된 것을 확인한 후, 터미널에서 `brew install ruby`를 실행해 주세요.
3. 모든 것이 완료되면 `ruby -v`를 실행하여 설치가 성공했는지 확인해 주세요.
단계별로 안내해 주시고, 필요할 경우 직접 클릭하여 실행할 수 있는 터미널 명령을 제공해 주세요.
```

지시를 받은 후 Trae가 작업을 시작하고 채팅 패널에 실행 버튼이 있는 코드 블록을 표시합니다.

**초보자를 위한 중요 참고 사항**

Homebrew 설치 시 터미널에서 종종 `Password:`와 같은 메시지가 나타나 Mac 로그인 비밀번호를 요청합니다.

**참고:** Mac 터미널에서 비밀번호를 입력할 때 화면에는 어떤 문자나 별표도 표시되지 않습니다. 이것은 정상입니다. 비밀번호를 보이지 않게 입력하고 Enter를 누르세요.

**2단계: 결과 확인**

설치 후 Trae로 돌아가서 입력하세요:

```markdown
방금 이 Mac에서 `brew`를 통해 Ruby를 설치했습니다. 터미널에서 `ruby -v` 명령을 실행하고 설치와 환경 변수가 올바른지 확인해 주세요.
```

터미널에서 `ruby 3.x.x`와 같은 내용이 보이면 로컬 웹페이지 워크숍이 준비되었고 Mac이 Vibe Coding을 위해 준비된 것입니다.

## 2.5 GitHub 계정 등록

**GitHub란?**
Git이 배달부라면, **GitHub는 클라우드 창고이자 쇼룸**입니다. 코드를 무료로 호스팅할 뿐만 아니라, 더 중요한 것은 **GitHub Pages**를 통해 코드를 전 세계에서 접근 가능한 웹사이트 URL로 변환할 수 있다는 점입니다. 세계 최대의 코드 호스팅 플랫폼이기도 하며, GitHub 계정을 갖는 것은 기술 세계로의 여권과 같습니다.

**등록 단계:**

1. **공식 웹사이트 방문**: [https://github.com/](https://github.com/)을 엽니다.
2. **Sign up 클릭**: 오른쪽 상단의 **"Sign up"**을 클릭합니다.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image12.png)

3. **정보 입력**
4. **이메일**: 실제 이메일 주소를 입력합니다.
5. **비밀번호**: 강력한 비밀번호를 선택합니다.
6. **사용자 이름 (중요!)**: **신중하게 선택하세요**. 홈페이지 URL은 나중에 **`https://your-username.github.io`**가 됩니다. 영문 이름, 병음, 익숙한 ID 또는 간단한 문자와 숫자의 조합을 사용하는 것이 가장 좋습니다. `a1b2c3d4`와 같은 것은 **선택하지 마세요**. 그렇지 않으면 웹사이트 링크를 기억하기 어렵습니다.
7. **인증 및 활성화**: 휴먼 인증을 완료합니다. 보통 이미지 회전이나 나선 은하 선택이며, 이메일에서 인증 코드를 확인합니다.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image13.png)

등록이 완료되면 인터넷에 자신만의 부지를 갖게 됩니다. 다음 섹션에서 이 부지에 건축을 시작하겠습니다.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image14.png)

# 3. 템플릿에서 첫 접근 가능한 페이지까지

모든 것이 준비되었습니다. 첫 두 장에서 도구를 준비했습니다. 이 장에서는 공식적으로 인터넷에 영토를 확보하겠습니다. 이 장의 작업은 간단합니다:
**장식이나 콘텐츠는 아직 신경 쓰지 마세요. 먼저 사이트의 뼈대를 구축하고 라이브 접속 링크를 확보하세요.**

성숙한 학술 템플릿을 직접 fork하고 GitHub Pages 자동화를 사용하여 20분 이내에 실행할 것입니다. 완료되면 전 세계에서 접근 가능한 링크를 갖게 됩니다.

## 3.1 웹사이트 템플릿 구하기

Vibe Coding 모드에서는 처음부터 HTML을 작성할 필요가 없습니다. GitHub에는 수천 개의 훌륭한 오픈소스 템플릿이 있습니다. 하나를 "빌려서" 이름만 자신의 것으로 바꾸면 됩니다.

**1단계: 템플릿 찾기**

여기서는 구조가 명확하고 학술 전시에 적합성이 높은 클래식 템플릿을 선택했습니다:
https://github.com/luost26/academic-homepage?tab=readme-ov-file
이 템플릿은 Jekyll 프레임워크를 기반으로 합니다.

물론 GitHub에서 **`academic-homepage`**를 검색하여 마음에 드는 다른 스타일을 선택할 수도 있지만, 이 튜토리얼을 따르려면 먼저 위 템플릿을 사용하는 것이 좋습니다.

몇 가지 추가 템플릿 추천도 준비했습니다:

* Minimal Light 개인 홈페이지 테마: https://github.com/yaoyao-liu/minimal-light?
* Minimal Mistakes: [https://github.com/mmistakes/minimal-mistakes](https://github.com/mmistakes/minimal-mistakes?utm_source=chatgpt.com)
* Pixyll: https://github.com/johno/pixyll
* Hydejack: https://github.com/hydecorp/hydejack
* Forty Jekyll Theme: https://github.com/andrewbanchich/forty-jekyll-theme
* Leonids: https://github.com/github.com/renyuanz/leonids
* YAT: https://github.com/jeffreytse/jekyll-theme-yat

**2단계: 프로젝트 fork하기**

대상 리포지토리 홈페이지를 방문하여 오른쪽 상단의 **Fork** 버튼을 클릭합니다. 확인 상자가 나타나면 **Create Fork**를 직접 클릭합니다.

* 설명: 이 단계는 다른 사람의 코드 리포지토리를 전체 키 세트와 함께 자신의 GitHub 계정으로 복사하는 것과 같습니다. 이제 사이트의 자신만의 복사본을 소유하게 됩니다.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image15.png)

**3단계: 리포지토리 이름 변경, 가장 중요한 단계**

리포지토리 이름을 다음으로 변경하세요:
`your-username.github.io`

**초보자를 위한 중요 참고 사항**:
이것은 GitHub Pages의 하드 룰입니다.
예를 들어 GitHub 사용자 이름이 `musk-fan`이라면, 리포지토리 이름은 **반드시** `musk-fan.github.io`여야 합니다.
이렇게만 해야 GitHub가 무료 도메인을 자동으로 할당합니다. 이름이 틀리면 나중에 웹페이지가 열리지 않습니다.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image16.png)

## 3.2 GitHub 프로젝트 URL 얻기

이름 변경 후, 리포지토리 픽업 슬립이 필요합니다.

1. 리포지토리 홈페이지로 돌아가서, **Code** 탭 아래에서.
2. 녹색 **Code** 버튼을 클릭합니다.
3. **HTTPS** 탭이 선택되어 있는지 확인합니다.
4. 복사 버튼을 클릭하고 `.git`으로 끝나는 URL을 복사합니다. 예: `https://github.com/musk-fan/musk-fan.github.io.git`.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image17.png)

## 3.3 프로젝트를 로컬로 가져오기

과거에는 프로그래머들이 검은 터미널에서 복잡한 Git 명령을 입력하여 코드를 다운로드해야 했습니다. Vibe Coding 시대에는 Trae가 있습니다. AI에게 "이걸 원해, 가져와 줘"라고만 말하면 됩니다.

**1단계: 준비**

컴퓨터에 새 폴더를 만듭니다. 예: `MyWebsite`. 그런 다음 우클릭하여 **Trae로 열기**를 선택하거나, 먼저 Trae를 열고 **폴더 열기**를 선택합니다.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image18.png)

**2단계: 클론 명령 내리기**

Trae가 열리면 오른쪽 AI 채팅 패널을 열고 다음 자연어 지시를 입력합니다:

```text
원격 GitHub 리포지토리를 현재 폴더에 클론해 주세요.
리포지토리 주소: 방금 복사한 URL을 붙여넣으세요. 예: https://github.com/musk-fan/musk-fan.github.io.git
실행 요구사항: 터미널에서 `git clone` 명령을 직접 실행해 주세요.
```

**3단계: 다운로드 확인**

Trae가 자동으로 하단 터미널을 호출하고 명령을 실행합니다. 몇 초 기다리세요. 왼쪽 파일 트리에 `_config.yml`과 `index.html` 같은 파일이 나타나면 프로젝트가 성공적으로 컴퓨터로 이동된 것입니다.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image19.png)

## 3.4 웹페이지 로컬 미리보기

코드가 컴퓨터에 있고 Ruby 환경이 준비되었습니다. 사이트를 수정하기 전에 먼저 자신의 컴퓨터에서 로컬로 검사해야 합니다. 이는 집을 리모델링하는 것과 같습니다: 먼저 쇼룸에서 모든 것을 배치하고, 제대로 보이는지 확인한 다음 공개합니다.

**2.4절**에서 설치한 Ruby 환경 덕분에 이제 매우 간단합니다.

**1단계: 의존성 설치**

Jekyll 사이트는 실행을 위해 많은 Gems에 의존합니다. 이는 장보기 목록에서 모든 가구를 구입하는 것과 같습니다. **하지만** 네트워크 상황으로 인해 직접 다운로드가 멈출 수 있습니다. Trae에게 **국내 미러로 전환**하여那里서 의존성을 설치하도록 요청하겠습니다.

Trae의 채팅 상자에 입력하세요:

```markdown
Jekyll 의존성을 설치해야 합니다. 네트워크 환경을 고려하여, 먼저 Gemfile의 `source`를 국내 미러 `https://gems.ruby-china.com/`로 변경해 주세요. 그 후 터미널에서 `bundle install` 명령을 실행하여 모든 의존성을 설치해 주세요.
```

**2단계: 로컬 서비스 시작**

이제 **로컬 서버**를 시작하여 웹사이트 실행을 시뮬레이션하겠습니다. 계속해서 Trae에게 말하세요:

```markdown
의존성 설치가 완료되었습니다. 터미널에서 Jekyll 로컬 미리보기 서비스를 시작해 주세요. `bundle exec jekyll serve` 명령을 실행해 주세요.
```

터미널이 몇 초간 실행되면 다음과 유사한 내용이 보일 것입니다:
`Server address: http://127.0.0.1:4000/academic-homepage/`

1. **브라우저 열기**: 그 링크를 클릭하거나 브라우저에 직접 입력하세요:
   `http://127.0.0.1:4000/academic-homepage/`
2. **마법 보기**: 이제 사이트가 브라우저에서 이미 실행되고 있습니다. 아직 원래 템플릿 작성자의 이름이 표시되지만, 이미 로컬 컴퓨터에서 실행되고 있습니다.

이 시점부터 콘텐츠를 변경하고 `Ctrl+S`를 누른 다음 브라우저를 새로고침하면 **웹페이지 콘텐츠가 함께 변경됩니다**.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image20.png)

로컬 미리보기가 작동하면 다음 장으로 넘어가 웹사이트를 일론 머스크 모양으로 만들기 시작할 수 있습니다.

# 4. AI 지원 콘텐츠 수정

모두가 전체 프로세스를 빠르게 경험할 수 있도록, 프라이버시 우려를 피하기 위해 우리 자신의 개인 정보를 사용하지 않겠습니다. 대신 **일론 머스크를 예시로** 사용하여 그를 위한 학술 홈페이지를 구축하겠습니다. 이를 통해 개인 이력서 작성이라는 지루한 압박을 덜고 웹사이트를 위한 Vibe Coding의 재미에 집중할 수 있습니다. 또한 *Hyperloop Alpha*와 같은 실리콘 밸리 아이언맨의 "기술 백서"를 학술 스타일 웹사이트에 배치하는 것이 얼마나 멋진지 볼 수 있습니다.

**템플릿 얻기**부터 **사이트 게시**까지의 전체 사이클을 거치며 세계 최고 수준의 개인 쇼케이스 공간을 직접 구축할 것입니다.

내 페이스를 따라 AI에게 첫 번째 지시를 보내세요.

## 4.1 통합 글로벌 제약 조건

이것은 **글로벌 설정 프롬프트**입니다. 한 번만 보내면 됩니다.
목적은 AI가 즉흥적으로 사이트 구조를 망가뜨리지 않도록 규칙을 설정하는 것입니다. Trae에 직접 복사하세요:

```text
당신은 이제 "GitHub Pages + Jekyll 학술 홈페이지 템플릿" 사이트의 관리자입니다.
현재 리포지토리는 Jekyll 기반 학술 홈페이지입니다 (`_config.yml`, `_data`, `_layouts` 등 포함).
수정은 다음 원칙을 따라야 합니다:
1. 각 단계는 현재 단계 목표만 해결해야 합니다. 이후 단계의 콘텐츠를 미리 실행하지 마세요.
2. 사이트 구조를 수정하지 말고, 새로운 플러그인을 도입하지 말고, 테마 스타일을 변경하지 마세요.
3. 모든 콘텐츠는 오류 없이 Jekyll로 렌더링 가능해야 합니다.
4. 모든 신원 정보는 "학술적 시뮬레이션" 톤을 따라야 하며 1인칭 시점을 사용해서는 안 됩니다.
5. 명백하게 가짜인 IEEE / Nature 논문을 만들어내지 마세요.
6. 정보가 불확실한 경우 "공개적으로 잘 알려진 사실" 또는 "합리적인 학술 시뮬레이션 라벨링"을 사용하세요.
```

## 4.2 머스크의 홈페이지 구축, 콘텐츠 부분

### 4.2.1 첫 번째 글로벌 지시: 신원 교체

우리가 먼저 해결해야 할 것은 "나는 누구인가?"입니다. 템플릿은 원래 작성자의 정보로 채워져 있으며, 이를 AI로 한 번에 교체해야 합니다.

**1단계: 에셋 준비**

제공해 드린 이미지 에셋 `University_of_Pennsylvania.jpg`와 `Queen_University.jpg`를 해당 프로젝트 폴더, 보통 `/assets/images/badges/`에 넣습니다.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image21.png)
![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image22.png)

**2단계: 지시 보내기**

Trae의 오른쪽 채팅 상자에 다음 프롬프트를 입력합니다. 수동으로 줄을 찾아 편집할 필요가 없다는 점에 유의하세요. AI에게 원하는 것을 말하기만 하면 됩니다:

```text
1. 목표: 현재 학술 홈페이지의 "인물 신원"을 일론 머스크로 교체합니다. 기본 프로필 정보만 수정하세요.
2. 구체적 요구사항:
1. 이름: Elon Musk
2. 직업적 신원:
    기술 기업가
    엔지니어
    SpaceX 창립자 & CEO
    Tesla, Inc. CEO
3. 학력:
    Queen's University (물리학 및 경제학, 미졸업) (이미지 경로: /assets/images/badges/Queen_University.jpg)
    University of Pennsylvania (물리학 B.S., 경제학 B.A.) (이미지 경로: /assets/images/badges/University_of_Pennsylvania.jpg)
4. 연구 관심사 (시뮬레이션 가능):
    우주 시스템 공학
    지속 가능한 에너지 시스템
    인공지능 & 로봇공학
    대규모 기술 혁신
5. 수상 및 인정:
    Time 올해의 인물 (2021)
    영국 왕립학회 펠로우 (FRS)
    Forbes 억만장자 목록 수록 (다수 연도)
6. 제약사항:
    논문 / 출판물을 추가하지 마세요
    IEEE, Nature 또는 Science 논문을 만들어내지 마세요
    학술적 표현을 사용하고 상업적 홍보 톤을 피하세요
    원래 필드 구조를 유지하고 콘텐츠만 교체하세요
```

이 시점에서 Trae가 모든 수정 요구사항을 완료한 것을 볼 수 있습니다.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image23.png)

**3단계: 로컬 브라우저 새로고침**

지금 로컬 브라우저를 새로고침하면 모든 것이 올바르게 교체된 것을 볼 수 있습니다.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image24.png)

### 4.2.2 반복 개선: "논문" 및 프로젝트 추가

일론 머스크는 전통적인 대학 교수가 아니기 때문에 *Nature*나 *Science*에 논문을 거의 발표하지 않습니다. 하지만 "수석 엔지니어"로서 많은 고도로 기술적인 **백서**와 **마스터 플랜**을 발표했습니다.

학술 홈페이지의 맥락에서 "Publications"의 의미를 **"기술 백서 및 비전 플랜"**으로 재정의할 수 있습니다. 이것은 전혀 어색하지 않습니다. 사실 그의 빌더로서의 정체성에 매우 잘 맞습니다.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image25.png)

**1단계: 에셋 준비**

제공해 드린 표지 이미지, 즉 `Hyperloop_Alpha_sketch.jpg`, `SpaceX_Starship.jpg` 및 `Neuralink_sewing_machine_robot.jpg`를 다운로드하여 `/assets/images/covers/` 아래에 배치하고, 해당 폴더에 원래 있던 예제 이미지를 제거합니다.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image26.png)
![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image27.png)
![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image28.png)

**2단계: 지시 보내기**

다음 프롬프트를 Trae에 보내 데이터 구조를 재구축하도록 도와주세요:

```text
1. 역할 설정: 당신은 Jekyll과 Liquid 문법에 능통한 정적 사이트 개발 전문가입니다.
2. 작업 목표:
홈페이지 또는 내비게이션 바의 섹션 제목을 수정합니다.
현재 파일 구조는 연도 하위 폴더로 구성되어 있습니다. 예: `_publications/2023/xxx.md`.
지정된 형식으로 세 개의 새 Markdown 파일을 만들어 일론 머스크의 기술 백서와 비전 플랜을 표시합니다.
3. 구체적 단계 및 요구사항:
1. 섹션 제목 수정
    "Selected Publications" 문자열을 전역 검색하세요 (`index.html`, `_config.yml` 또는 `_pages/publications.md`에 나타날 수 있음).
    다음으로 교체: "Technical White Papers & Visionary Plans".
2. 출판물 데이터 재구축 (중요 단계)
    `_publications` 폴더 아래의 모든 이전 콘텐츠를 삭제하세요. 2023, 2024와 같은 이전 연도 폴더도 포함됩니다.
    세 개의 새 폴더를 만드세요: `_publications/2013/`, `_publications/2017/`, `_publications/2019/`.
    이 폴더에 다음 세 개의 Markdown 파일을 만드세요.
3. 이 파일 형식을 엄격하게 따르세요
중요: 아래의 YAML Front Matter 형식을 엄격하게 따라야 하며, 새로운 필드 이름을 만들어서는 안 됩니다:
    - title:          "논문 제목"
    - date:           YYYY-MM-DD HH:MM:SS +0800
    - selected:       true
    - pub:            "발행처 / 저널 이름"
    - pub_date:       "연도"
    - abstract: >-    초록 내용...
    - cover:          /assets/images/covers/cover_name.jpg
    - authors:        - 저자1- 저자2
    - links:Paper:    https://paper-link
4. 다음 세 파일의 전체 코드를 생성하세요 (경로 설명 포함):
(1) 경로: `_publications/2013/2013-hyperloop.md`
    제목: Hyperloop Alpha
    날짜: 2013-08-12
    출판: Tesla Blog (Open Source)
    출판_날짜: "2013"
    초록: 저압 튜브와 공기 베어링을 활용하여 아음속 속도를 달성하는 제5의 교통수단 제안.
    표지: /assets/images/covers/Hyperloop_Alpha_sketch.jpg
    저자: Elon Musk, SpaceX & Tesla Teams
    링크: https://www.tesla.com/sites/default/files/blog_images/hyperloop-alpha.pdf
(2) 경로: `_publications/2017/2017-mars.md`
    제목: Making Humans a Multi-Planetary Species
    날짜: 2017-06-01
    출판: New Space
    출판_날짜: "2017"
    초록: 화성 식민지화를 위해 설계된 Starship 시스템의 상세 아키텍처. 이 논문은 자립적인 도시를 건설하기 위한 기술적 과제를 개괄합니다.
    표지: /assets/images/covers/SpaceX_Starship.jpg
    저자: Elon Musk
    링크: https://www.liebertpub.com/doi/10.1089/space.2017.29009.emu
(3) 경로: `_publications/2019/2019-neuralink.md`
    제목: An Integrated Brain-Machine Interface Platform
    날짜: 2019-10-16
    출판: Journal of Medical Internet Research
    출판_날짜: "2019"
    초록: 우리는 어레이당 최대 3,072개의 전극을 가진 작고 유연한 전극 스레드 어레이와 신경외과 로봇을 구축했습니다.
    표지: /assets/images/covers/Neuralink_sewing_machine_robot.jpg
    저자: Elon Musk, Neuralink
    링크: https://www.jmir.org/2019/10/e16194/
실행 요구사항:
이 세 파일의 전체 콘텐츠를 직접 제공하고, 제목을 변경한 파일의 수정 코드도 함께 제공하세요.
```

**3단계: 로컬 브라우저 새로고침**

빌드가 완료되면 원래 지루했던 출판물 목록이 미래지향적인 블랙 테크 쇼케이스로 변환된 것을 발견할 것입니다.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image33.png)

### 4.2.3 마무리: 소셜 링크 및 프로필 사진

이것은 90점에서 100점으로 올라가는 핵심 단계입니다. 사이드바에 여전히 템플릿의 원래 GitHub 링크나 잘못된 이메일이 있을 수 있습니다. 이를 머스크의 실제 소셜 계정으로 연결해야 합니다. 주로 X.com입니다.

**1단계: 준비**

Google에서 머스크의 멋진 사진을 검색하여 `portrait.png`로 저장하거나, Trae의 `images/photo` 폴더에 드래그하여 원래 이미지를 교체합니다.

**2단계: 다음 프롬프트를 Trae에 복사**

```text
1. 역할 설정: 당신은 세부 사항에 주의를 기울이는 Jekyll 웹사이트 개발 전문가입니다.
2. 작업 목표: 웹사이트 사이드바 및 개인 정보 구성의 최종 업데이트를 완료합니다. 작성자의 아바타, 소개 및 소셜 링크를 일론 머스크의 실제 정보로 업데이트해야 합니다.
먼저 프로젝트 구조를 스캔하고 작성자 정보를 제어하는 구성 파일을 찾으세요.
3. 다음 수정을 진행하세요:
1. 아바타 경로 수정
    `portrait.png`라는 새 이미지를 `images/` 또는 `assets/images/` 폴더에 이미 업로드했습니다.
    구성 파일에서 아바타 경로를 이 이미지로 수정하고 상대 경로가 올바른지 확인하세요. 예: `/images/portrait.png`.
2. 소셜 링크 정리
    사이드바의 소셜 아이콘 링크를 업데이트하거나 제거하세요:
    이메일: `elon@spacex.com`으로 변경하거나, 필드가 허용하는 경우 주석 처리하거나 제거하여 스팸을 피하세요.
    Twitter / X: `https://x.com/elonmusk`로 변경하세요 (이것이 핵심 링크입니다).
    GitHub: `https://github.com/tesla`로 변경하여 Tesla 오픈소스 리포지토리를 가리키거나 직접 제거하세요.
    Google Scholar: 유지 관리하지 않으므로 반드시 제거하세요.
    LinkedIn / ResearchGate: 존재하는 경우 모두 제거하세요.
출력 요구사항:
수정된 전체 구성 코드 스니펫을 직접 제공하세요.
```

**3단계: 로컬 브라우저 새로고침**

1. 사이드바를 보세요. 이제 그 멋진 사진을 사용하고 있나요? Twitter 아이콘을 클릭하면 X.com으로 이동하나요?

이 시점에서 로컬에 이미 완전하고 전문적이며 뚜렷한 머스크 스타일의 개인 학술 홈페이지를 갖추게 되었습니다.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image34.png)

## 4.3 UI 커스터마이징으로 영혼 불어넣기, 스타일 부분

현재 콘텐츠는 올바르지만, 페이지는 여전히 인쇄된 이력서처럼 보입니다. 기술감이 부족합니다. Vibe Coding 모드에서는 CSS를 이해할 필요가 없습니다. 원하는 **느낌**을 AI에게 설명하기만 하면 됩니다.

**예시 시나리오**:
회색 배경이 너무 지루하다고 생각하고 **화성 레드**로 변경하고 싶다면, Trae에게 물어보세요:
*"사이드바의 배경색을 진홍색(#8B0000)으로 변경하여 화성 느낌을 표현하고 싶어요. 어떤 CSS나 SCSS 파일을 수정해야 하나요? 코드를 직접 보여주세요."*

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image35.png)

위 예시 이미지의 **SpaceX 대시보드** 스타일이 마음에 든다면, 다음 디자이너 수준의 프롬프트를 직접 복사할 수 있습니다:

```text
1. 역할 설정: 당신은 "스위스 국제주의 스타일"을 존경하며 Notion, Linear 또는 Apple과 같은 인터페이스에 능통한 최고 UI 디자이너입니다.
2. 작업 목표: CSS / SCSS를 완전히 재작성하여 "SpaceX 대시보드" 스타일의 미니멀 학술 홈페이지를 만들어 주세요. 핵심 키워드: 투명, 절제, 정밀.
3. 다음 구체적 스타일 오버라이드를 적용하세요:
1. 전역 타이포그래피
    글꼴: 원래 세리프 글꼴을 버리세요. 전체 사이트에 시스템 수준의 산세리프 스택을 강제하세요:
    'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif.
    줄 높이: 본문 텍스트에 `line-height: 1.75`로 여백을 늘리세요.
    색상:
        메인 제목: #111111
        본문 텍스트: #333333
        날짜나 인용과 같은 보조 정보: #666666
2. 깔끔한 헤더
    배경: 이전 검은색 배경을 제거하고 순백색(#FFFFFF)을 사용하거나, 지원되는 경우 블러가 있는 반투명 흰색을 사용하세요. 예: `rgba(255, 255, 255, 0.9)` + `backdrop-filter: blur(10px)`.
    테두리: 매우 얇은 하단 테두리만 유지하세요. `border-bottom: 1px solid #EAEAEA`.
    텍스트: 네비게이션 링크는 진회색 #333333을 사용하고, 호버 시에만 검은색 및 굵게 변경하세요.
3. 카드 제거 및 콘텐츠로 돌아가기
    왼쪽 사이드바 및 About me 카드의 배경과 그림자를 제거하세요 (`box-shadow: none`, `background: transparent`).
    위대한 미니멀리즘은 텍스트가 페이지 배경 위에 직접 떠 있게 합니다.
    간격 증가: 섹션 사이의 `margin-bottom`을 크게 늘리세요(예: 80px). 테두리 대신 여백으로 콘텐츠를 분리하세요.
4. 브랜드 색상의 절제된 사용
    Tesla 레드(#E82127)는 링크와 중요한 버튼에만 사용하세요.
    링크 스타일: 밑줄을 제거하고 색상만 변경하세요. 호버 시 `background: rgba(232, 33, 39, 0.05)`와 같은 연한 빨간색 배경 블록을 추가하세요.
5. 아바타 조정
    `border-radius: 50%`로 원형을 유지하세요.
    테두리를 제거하세요.
    `box-shadow: 0 10px 30px rgba(0,0,0,0.08)`와 같이 매우 가벼운 그림자만 유지하세요.
실행 요구사항:
`_sass` 또는 CSS 파일을 분석하세요. 기존 코드에 패치하지 말고, 위의 스타일을 리셋하고 오버라이드하는 코드를 직접 제공하세요.
```

## 4.4 자신의 정보로 교체, 커스터마이징 부분

축하합니다. 위의 머스크 홈페이지 과정을 거치면서 웹사이트 구축을 위한 Vibe Coding의 핵심 마인드셋을 이미 마스터했습니다. 이 샘플룸을 자신만의 집으로 바꾸는 것은 사실 이제 쉽습니다.

처음부터 다시 시작할 필요가 없습니다. 위의 단계를 반복하되 약간 더 유연한 전략으로 접근하면 됩니다:

**1단계: 물리적 교체, 아바타 및 기본 정보**

이것이 가장 쉬운 단계입니다:

1. **사진 변경**: Trae 왼쪽의 파일 패널에서 `assets/images/`를 찾아 자신의 초상 사진을 드래그하여 `portrait.png`를 교체합니다.
2. **이름 변경**: Trae에게 "전체 사이트에서 Elon Musk의 모든 인스턴스를 [내 이름]으로 교체해 줘"라고 말하세요.

**2단계: AI 전처리, ChatGPT / Gemini가 콘텐츠 정리를 도와주기**

Trae는 코드 작성에 능하지만, 지저분한 PDF 이력서를 직접 던지면 혼란스러워할 수 있습니다.

**따라서 더 효율적인 접근법은**:
먼저 긴 텍스트 처리에 강한 AI(예: ChatGPT, Gemini 또는 Kimi)를 사용하여 이력서를 **깔끔하게 포맷팅**하도록 도와달라고 요청하세요.

ChatGPT에 다음과 같은 프롬프트를 보낼 수 있습니다:

```text
역할 설정: 당신은 전문적인 학술 웹사이트 콘텐츠 기획자입니다.
작업 목표:
개인 이력서 / CV를 보내드리겠습니다. 핵심 정보를 추출하여 정적 웹사이트에 직접 입력하기에 적합한 명확한 Markdown 구조로 정리해 주세요.
다음 다섯 가지 모듈로 엄격하게 구성하고 정제해 주세요. 일부 콘텐츠가 없으면 비워두세요.
1. 프로필
이름: 내 전체 이름.
태그라인: 한 줄 전문 태그, 예: "CS 학생 @ XX 대학 | AI 애호가".
약력: 배경과 핵심 역량을 요약하는 50~100단어의 3인칭 소개, 전문적인 학술 톤.
소셜: 이메일, GitHub, LinkedIn, 블로그 링크 등 추출.
2. 학력
다음을 나열하세요: 학교 이름, 학위(예: B.S. in CS), 기간.
선택 사항: GPA 또는 핵심 과목이 있는 경우 별도 줄에 추가.
3. 선정 프로젝트 — 중요
가장 강력한 프로젝트 2~3개를 추출하고 각각에 대해 다음을 포함하세요:
제목: 프로젝트 이름.
기술 스택: 사용 기술, 예: Python, React, PyTorch.
TL;DR: 프로젝트가 하는 일의 한 줄 요약.
설명: 2~3개의 핵심 기여, STAR 스타일로 정제.
이미지 플레이스홀더: `project_name.jpg`와 같은 이미지 파일 이름 예약.
4. 출판물 / 기사
논문이나 기술 기사가 있는 경우 추출:
제목
발행처
날짜, 연도만
초록, 한 문장 요약
5. 기술
다음 카테고리로 구성: 프로그래밍 언어, 프레임워크 / 도구, 기타 기술.
출력 요구사항:
과정을 설명하지 마세요. 정제된 Markdown 콘텐츠를 직접 출력하세요.
```

이 정제된 텍스트를 얻은 후 Trae에 입력하면 정확도가 극적으로 향상될 것입니다.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image36.png)
![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image37.png)

**3단계: 핵심 콘텐츠 교체, 두 가지 가능한 루트**

이 단계에서는 선호도에 따라 두 가지 다른 Vibe Coding 모드를 선택할 수 있습니다:

1. **모드 A: AI가 탐색하게 한 후 수동 편집**

모든 것이 어디서 변경되는지 정확히 알고 싶다면 Trae에게 물어보세요:

```markdown
"학력" 섹션을 수정하고 싶습니다. 해당 파일 경로가 어디인지, 코드가 몇 번째 줄에 있는지 알려주세요.
```

Trae는 채팅에서 다음과 같이 말할 것입니다:
"수정해야 할 파일은 `_pages/about.md`이며, 관련 코드는 대략 XX번째 줄 주변에 있습니다..."

그런 다음 왼쪽 파일 트리에서 해당 파일을 직접 열고 ChatGPT에서 정제된 콘텐츠를 구조화된 편집 연습처럼 채워 넣을 수 있습니다.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image38.png)

2. **모드 B: 완전 관리 자동화**

파일 찾기가 너무 번거롭다고 생각되면, 정제된 정보를 Trae에 직접 붙여넣으세요:

```markdown
다음은 "학력" 및 "프로젝트 경험" 섹션에 대한 정제된 콘텐츠입니다 (Markdown 콘텐츠 붙여넣기).
현재 사이트의 해당 콘텐츠를 직접 교체하고 기존 레이아웃 형식을 유지해 주세요.
```

# 5. 온라인 배포

## 5.1 GitHub Pages에 배포

**1단계: GitHub Actions 활성화, 클라우드 빌드**

브라우저에서 GitHub로 돌아가서:

1. 리포지토리 상단의 **Settings**를 클릭합니다.
2. 왼쪽 사이드바에서 **Pages**를 클릭합니다.
3. **Build and deployment** 아래에서 **Source**를 `Deploy from a branch`에서 **`GitHub Actions`**로 변경합니다.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image39.png)

**2단계: 자동으로 Jekyll 워크플로 구성**

전환 후 페이지 레이아웃이 변경됩니다. GitHub가 이것이 Jekyll 프로젝트임을 자동으로 인식합니다.

1. **Jekyll (By GitHub Actions)** 카드를 찾습니다.
2. 해당 카드에서 **Configure**를 클릭합니다.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image40.png)

**3단계: 구성 파일 커밋**

클릭하면 코드가 가득한 페이지로 이동합니다. 이것은 GitHub가 이미 Jekyll 사이트 구축을 위해 작성한 `.yml` 구성 파일입니다.

1. **코드를 수정하지 마세요**.
2. 오른쪽 상단의 녹색 **Commit changes...** 버튼을 클릭합니다.
3. 팝업 확인 상자에서 다시 **Commit changes**를 클릭합니다.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image41.png)

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image42.png)

**4단계: 대기 및 확인**

커밋 후 GitHub 서버가 자동으로 작업을 시작합니다.

1. 상단 메뉴의 **Actions** 탭을 클릭합니다.
2. `Deploy Jekyll site to Pages`라는 작업이 회전하는 것을 볼 수 있습니다.
3. 노란색 원이 **녹색 체크 표시**로 바뀔 때까지 1~2분 기다리세요.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image43.png)

**5단계: 웹사이트 방문**

원이 녹색으로 바뀌면 다음과 같은 주소를 통해 템플릿의 기본 버전에 접근할 수 있습니다:
**`https://your-username.github.io/`**

축하합니다. 전 세계에서 접근 가능한 개인 학술 홈페이지를 성공적으로 배포했습니다.

## 5.2 변경 사항 커밋 및 홈페이지 업데이트

이제 이전에 만든 모든 로컬 수정 사항을 GitHub에 푸시하여, 이 머스크 스타일의 개인 홈페이지를 전 세계가 볼 수 있게 하겠습니다.

1. 왼쪽의 **Source Control**을 클릭합니다.
2. 모든 **변경 사항**을 **staged changes**에 추가합니다.
3. Trae가 커밋 메시지를 생성하도록 한 다음 **Commit**을 클릭합니다.
4. **Sync Changes** 또는 **Push**를 클릭하여 `main` 브랜치에 푸시합니다.
5. **Actions** 탭 아래의 모든 프로세스가 완료될 때까지 잠시 기다립니다.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image44.png)

이제 축하합니다. **`https://your-username.github.io/`**를 열면, 완전하고 전문적이며 강렬한 머스크 향의 학술 홈페이지를 갖게 됩니다.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image45.png)

# 6. 심화: 처음부터 직접 개인 홈페이지 만들기

학술 템플릿이 너무 경직되어 있다고 생각하거나, *매트릭스*처럼 멋진 원페이지 웹사이트를 만들고 싶다면, **DIY 섹션**에 오신 것을 환영합니다.

여기서는 다른 사람의 코드를 fork하지 않습니다. Trae를 사용하여 빈 폴더에서 시작하여 단일 지시로 완전한 웹사이트를 생성한 다음 온라인에 배포하겠습니다.

## 6.1 왜 직접 만들어야 할까요

* **절대적 자유**: 템플릿 제약이 없습니다. 네비게이션 바를 오른쪽에 원하거나 배경에 불꽃놀이를 원한다면 AI에게 말만 하면 됩니다.
* **미니멀리즘**: 템플릿은 수백 개의 파일을 포함하는 반면, 직접 만든 웹사이트는 하나의 `index.html`만 필요할 수 있습니다.
* **기술적 통제**: 웹페이지가 실제로 어떻게 작동하는지 이해하는 최고의 방법입니다.

우리는 클래식한 **순수 HTML 워크플로우**를 시연하겠습니다:
컴파일이 필요 없으며, GitHub Pages가 기본적으로 지원하여 개인 랜딩 페이지 구축에 이상적입니다.

## 6.2 실전 예시: AI에게 "화성 사령부" 홈페이지 작성 요청하기

이번에는 학술 루트가 아닙니다. 머스크가 자신의 화성 플랜을 제시하기 위해 극도로 미니멀하고 미래지향적인 개인 홈페이지를 원한다고 가정해 봅시다.

**1단계: 빈 프로젝트 만들기**

컴퓨터에 새 폴더를 만들고 Trae로 엽니다. 이 순간 왼쪽 파일 트리는 완전히 비어 있습니다.

*(팁: 머스크의 사진을 미리 준비하여 `portrait.png`로 이름을 지을 수 있습니다.)*

**2단계: 프레임워크 구축**

Trae의 채팅 패널에 다음 프롬프트를 입력합니다. 초보자가 관리하기 쉽도록 AI에게 모든 코드를 단일 파일에 작성하도록 요청합니다:

```text
복잡한 프레임워크 없이 HTML + CSS + JS만 사용하여 일론 머스크를 위한 미니멀 개인 홈페이지를 처음부터 만들고 싶습니다.
디자인 스타일: SpaceX 대시보드 스타일.
    배경: 심우주 블랙(#000000)을 사용하며, 별빛 애니메이션 포함.
    메인 액센트 색상: "화성 레드"(#E82127) 사용.
    글꼴: 코드 터미널 느낌을 모방하는 모노스페이스 글꼴 스택 사용.
페이지 콘텐츠:
    일론 머스크의 아바타를 중앙에 배치, 원형, 회전하는 테두리. 이미지 경로는 `portrait.png`.
    이름: Elon Musk (Technoking of Tesla)
    소개: "Occupying Mars... 99% Loading."
    하단에 X (Twitter), SpaceX, Tesla로 연결되는 세 개의 빛나는 버튼 배치.
기술 요구사항:
모든 CSS 스타일과 HTML 구조를 단일 `index.html` 파일 안에 넣어주세요.
전체 코드를 직접 생성해 주세요.
```

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image46.png)

**3단계: 생성 및 미리보기**

이전 단계에서 Trae가 이미 `index.html` 파일을 생성해 주었습니다. 그렇다면 현재 효과를 어떻게 볼 수 있을까요?

채팅에서 Trae에게 말하세요:

```markdown
이 웹페이지를 미리 볼 수 있는 로컬 서비스를 시작해 주세요.
```

`http://localhost:8000`과 같은 링크를 받게 됩니다. 복사하여 브라우저에서 열면 배경에 별이 반짝이는 멋진 "화성 홈페이지"를 볼 수 있을 것입니다.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image47.png)

하지만 현재 페이지는 매우 멋진 랜딩 페이지일 뿐이라는 것을 알게 될 것입니다. 완전한 개인 홈페이지로서는 여전히 정보가 너무 적고 학술 홈페이지로 기대되는 깊이가 부족합니다. 이 시각적 프레임워크를 바탕으로 이제 일론 머스크에 대한 학술적 정보로 계속 보완하겠습니다.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image48.png)

**4단계: 정보 추가 보완**

Trae가 현재 화성 스타일을 유지하면서 페이지를 학술 템플릿에 더 가까운 형태로 재구성하도록 하고 싶습니다. 기존 요소를 왼쪽으로 이동시키고 오른쪽에 프로필 텍스트와 백서를 위한 새로운 콘텐츠 영역을 만들도록 명확히 지시해야 하며, 새로 추가되는 모든 콘텐츠는 동일한 블랙앤레드 사이버펑크 스타일을 유지해야 합니다.

다음 프롬프트를 복사하여 Trae에 보내세요:

```text
핵심 원칙:
현재 "SpaceX / Mars" 디자인 스타일을 엄격하게 보존해야 합니다. 순수 블랙 배경, 별빛 장식, 레드 네온 액센트 색상, 모노스페이스 코드 스타일 글꼴 포함. 참조 이미지의 흰색 배경을 사용하지 마세요.

구체적 수정 단계:
1. 2열 레이아웃 만들기
페이지를 왼쪽과 오른쪽 열로 분할합니다. 왼쪽 사이드바는 약 30~35% 너비, 오른쪽 콘텐츠 영역은 약 65~70%를 차지합니다.

2. 왼쪽 사이드바 - 기존 정보 이동
원래 히어로 화면의 모든 현재 요소를 고정된 왼쪽 사이드바로 이동:
    - 아바타: 일론 머스크의 원형 아바타 유지.
    - 이름 및 타이틀: 레드 네온 텍스트 "ELON MUSK" 및 "Technoking of Tesla" 유지.
    - 로딩 바: "Occupying Mars... 99% Loading"을 개인 서명으로 유지.
    - 소셜 버튼: 세 개의 레드 버튼 X, SPACE X, TESLA를 왼쪽 사이드바 하단으로 이동.

3. 오른쪽 콘텐츠 영역 - 상세 정보 추가
오른쪽 영역에 상세한 개인 소개와 성과를 추가합니다. 모든 새 본문 텍스트는 흰색 또는 연회색을 사용하고, 제목은 레드 네온 강조를 사용합니다. 다음 섹션을 만드세요:
- About Me:
    짧은 소개 작성, 예: "다행성 확장, 지속 가능한 에너지 및 인공지능에 집중하는 기술 기업가이자 엔지니어."
- Focus Areas:
    우주 시스템 공학, 화성 식민지화 아키텍처, 뇌-기계 인터페이스 나열.
- Visionary Plans & White Papers:
    핵심 섹션입니다. 예시 이미지의 목록 스타일을 참조하되, 블랙 배경 스타일로 변환합니다.
    그의 중요한 기술 플랜을 표시하는 목록을 만들고, 빨간 테두리나 빛 효과로 각 항목을 구분합니다.
    항목 1: "Making Humans a Multi-Planetary Species" (Starship 아키텍처, 2017).
    항목 2: "Hyperloop Alpha" (고속 교통 제안, 2013).
    항목 3: "Neuralink: An Integrated Brain-Machine Interface Platform" (2019).
- Notable Achievements:
    다음과 같은 이정표를 간단히 나열:
    궤도 도달 최초의 민간 액체 추진 로켓 (Falcon 1)
    최초의 재사용 가능한 궤도급 로켓 (Falcon 9)

4. 스타일 세부 요구사항
오른쪽의 모든 섹션 제목(예: "About Me")은 왼쪽의 "ELON MUSK" 텍스트와 동일한 레드 글로우 스타일을 사용해야 합니다.
전체 페이지가 반응형인지 확인하고 다양한 화면 크기에서 좋은 2열 레이아웃을 유지하세요.
```

그 후 브라우저를 새로고침하면 사이버펑크 학술 페이지가 완성됩니다. 물론 자신의 취향에 따라 계속 개선할 수 있습니다. 이전 단계에서처럼 Trae에게 목표를 명확히 말하기만 하면 지루한 코딩 과정을 대신 처리해 줄 것입니다.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image49.png)

## 6.3 직접 만든 사이트를 배포하는 방법

이전에 다른 사람의 리포지토리에서 fork한 템플릿과 달리, 이 프로젝트는 새로 만들어졌으며 아직 해당 GitHub 위치가 없습니다. 따라서 수동으로 연결해야 합니다.

**1단계: GitHub에 새 리포지토리 만들기**

1. 브라우저에서 GitHub에 로그인합니다.
2. 오른쪽 상단의 **+** 아이콘을 클릭한 다음 **New repository**를 클릭합니다.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image50.png)

3. **리포지토리 이름**: `mars-profile`을 입력하거나 원하는 다른 이름을 입력합니다.

**참고**:
이미 **`your-username.github.io`**를 사용한 경우, 여기서 그 이름을 재사용할 수 없습니다. 다른 이름을 선택할 수 있으며, GitHub는 **`your-username.github.io/mars-link`**와 같은 URL을 생성합니다.

4. **Public / Private**: **Public**을 선택합니다.
5. **"Add a README file"을 체크하지 마세요!**
   다른 옵션은 기본값으로 두세요.
6. **Create repository**를 클릭합니다.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image51.png)

**2단계: 로컬 코드를 클라우드로 푸시**

생성 후 GitHub는 코드 같은 내용이 많이 있는 페이지로 이동시킵니다. 걱정 마세요. 그 페이지에 표시된 리포지토리 링크만 복사하면 됩니다.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image52.png)

Trae로 돌아가서 채팅에 입력하세요:

```markdown
GitHub에 빈 리포지토리를 만들었습니다. 주소는: https://github.com/your-username/mars-link.git (방금 만든 실제 리포지토리 주소로 교체하세요).
현재 로컬 프로젝트를 Git 리포지토리로 초기화하고 코드를 이 원격 주소의 `main` 브랜치에 푸시해 주세요.
```

Trae는 일반적으로 다음 표준 순서를 실행하도록 도와주며, 클릭하여 실행하기만 하면 됩니다:

1. `git init`
2. `git add .` 및 `git commit -m "First commit"`
3. `git branch -M main` 및 `git remote add origin [귀하의 주소]`
4. `git push -u origin main`

Trae가 푸시를 완료한 후 GitHub로 돌아가서 페이지를 새로고침하세요. **Code** 탭을 클릭하면 Trae에서 작성한 코드가 리포지토리에 성공적으로 푸시된 것을 볼 수 있습니다.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image53.png)

**3단계: GitHub Pages 활성화**

코드가 푸시된 후 웹페이지가 자동으로 나타나지 않습니다. 수동으로 스위치를 켜야 합니다:

1. GitHub 리포지토리 페이지로 돌아가서 상단의 **Settings**를 클릭합니다.
2. 왼쪽 사이드바에서 **Pages**를 클릭합니다.
3. **Build and deployment** 아래에서:
   1. **Source**를 `Deploy from a branch`로 설정합니다.
   2. **Branch**를 `main`으로 설정하고, 폴더로 `/(root)`를 선택합니다.
4. **Save**를 클릭합니다.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image54.png)

Save를 클릭한 후 웹페이지가 즉시 나타나지 않습니다. GitHub 백엔드는 작은 로봇 공장처럼 작동합니다. 코드를 포장, 빌드 및 글로벌 서버에 게시하는 데 약 **1~2분**이 필요합니다.

인내심을 가지고 기다린 후 페이지를 새로고침하세요. 큰 **GitHub Pages** 제목 아래에 다음과 유사한 URL이 있는 줄이 보일 것입니다:
**"Your site is live at `https://your-username.github.io/mars-link/`"**

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image55.png)

클릭하면 화성 사령부가 온라인 상태가 됩니다.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image56.png)

# 7. 마무리

튜토리얼이 끝났습니다. 이제 브라우저 주소창에 빛나는 `.github.io`를 볼 때, 인터넷에 깃발을 꽂은 것 같은 느낌이 들지 않나요?

이 튜토리얼에서 우리는 일론 머스크의 페르소나를 빌려 레고 프로젝트처럼 꽤 인상적인 웹사이트를 구축했습니다. 하지만 이것은 시작일 뿐입니다. Vibe Coding의 가장 매력적인 부분은 타이핑 시간을 얼마나 절약해 주는지가 아닙니다. 바로 **"아이디어"와 "현실" 사이의 벽을 완전히 허물어버린다는 것**입니다.

과거에는 **CSS를 작성할 수 없어서** 프로젝트를 선보이는 것을 포기했을 수 있습니다.
이제 남은 유일한 한계는 당신의 **상상력**과 **취향**뿐입니다.

**이 사이트가 "머스크에서 영감받은 클론"으로 남게 두지 마세요.**
연습용으로 사용한 Tesla 링크와 화성 식민지 백서는 결국 다른 사람의 이야기입니다. 당신의 홈페이지는 디지털 세계에서 당신만의 명함이어야 합니다.

가서 당신의 첫 번째 실제 프로젝트 경험을 거기에 올리세요.
가서 기술 주제에 대한 당신만의 독특한 생각을 게시하세요.
좋아하는 책 목록이나 자신의 사진을 올릴 수도 있습니다.
WeChat Moments에 묻혀버릴 생각도 여기에 영구적으로 남을 수 있습니다.
이력서에 담기지 않는 열정도 여기서 자유롭게 펼쳐질 수 있습니다.

이 부지를 비워두지 마세요.
실험하세요. 망가뜨리세요. 다시 세우세요.
가장 마음에 드는 모양이 될 때까지 계속 그렇게 하세요.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image57.png)

***나아가세요, 그리고 세상이 당신을 보게 하세요.***

# 참고 자료

CSDN: [2025년 최신 넌니급 튜토리얼: GitHub를 사용하여 개인 홈페이지 구축 단계별 가이드](https://blog.csdn.net/qq_45743991/article/details/145505150?ops_request_misc=&request_id=&biz_id=102&utm_term=github%E6%9E%84%E5%BB%BA%E4%B8%AA%E4%BA%BA%E4%B8%BB%E9%A1%B5&utm_medium=distribute.pc_search_result.none-task-blog-2~all~sobaiduweb~default-0-145505150.142^v102^pc_search_result_base4&spm=1018.2226.3001.4187)

CSDN: [Git 다운로드 및 설치 튜토리얼](https://blog.csdn.net/weixin_41293671/article/details/144255269?ops_request_misc=elastic_search_misc&request_id=63236900b52320a7beb177787ba97f07&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~baidu_landing_v2~default-5-144255269-null-null.142^v102^pc_search_result_base4&utm_term=git%E4%B8%8B%E8%BD%BD%E5%AE%89%E8%A3%85&spm=1018.2226.3001.4187)

CSDN: [Windows에서 Ruby 설치 튜토리얼](https://blog.csdn.net/alive_tree/article/details/103043158?ops_request_misc=elastic_search_misc&request_id=ad7e29ea7f702554d785c2fc82ec6e95&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~ElasticSearch~search_v2-11-103043158-null-null.142^v102^pc_search_result_base4&utm_term=ruby%E5%AE%89%E8%A3%85%E6%95%99%E7%A8%8B&spm=1018.2226.3001.4187)
