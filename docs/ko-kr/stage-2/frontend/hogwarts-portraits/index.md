# Project 4: 함께 호그와트 초상화 만들기

이전 수업에서 우리는 프롬프트 엔지니어링과 API 호출을 기반으로 더 복잡한 AI 상호작용을 구현하는 방법을 배웠습니다. 우리는 간단한 AI 챗봇을 AI Agent와 AI 워크플로우로 업그레이드할 수 있게 되었으며, 더 복잡한 조건 판단과 분기 로직을 통해 더 높은 실용성을 갖춘 기능을 개발할 수 있게 되었습니다.

이러한 복잡한 AI 로직이 다양한 프로그램과 실제 응용 시나리오에서 더 잘 실행되도록, 우리는 가장 간단한 z.ai 온라인 환경에서 점차 더 모던한 로컬 AI IDE로 전환하여, 원래 브라우저에 있던 프로그래밍 환경을 여러분의 컴퓨터로 옮겼습니다. 그에 따라 다양한 환경 설치와 설정 문제에 직면하게 되었지만, Trae Agent와의 대화 과정에서 이러한看似 어려운 도전도 해결할 수 있게 되었습니다.

이 프로젝트에서는 응용 프로그램의 실용성을 한 단계 더 높여, AI 기능 자체를 최적화할 뿐만 아니라 제품의 "외관"을 다듬기 시작할 것입니다. 인터페이스를 더 아름답고 사용하기 쉽게 만들어 보고, 실제 요구에 따라 프로그램 인터페이스의 레이아웃과 스타일을 직접 커스터마이징하게 됩니다.

본격적으로 시작하기 전에, 몇 가지 퀴즈로 지난 수업의 내용을 빠르게 복습해 보겠습니다:

1. Dify란 무엇인가요? 어떤 역할을 하나요? 왜 필요한가요?
2. Dify의 API를 어떻게 호출하나요?
3. RAG란 무엇인가요? Dify를 사용하여 RAG Agent나 RAG 워크플로우를 구축하는 방법은? Dify의 일반적인 노드 사용 방법
4. AI IDE란 무엇인가요? Trae란 무엇인가요? z.ai와의 차이점은 무엇인가요?

위 질문 중 어떤 것에 대해 아직 의문이 있다면, 지난 수업의 문서를 먼저 복습하거나, 위챗 그룹에서 질문하고 토론하세요.

이번 수업의 프로젝트 주제는 **Hogwarts Portraits**입니다. 이름에서 알 수 있듯이, 호그와트 마법학교에 있는 "살아 움직이는" 초상화에서 영감을 받았습니다. 우리는 AI를 사용하여 "상호작용이 가능한" 마법 초상화 체험을 만들고자 합니다. 초상화와 대화하는 것은 "본인"과 대화하는 것과 같아야 하며, 대화의 기억을 유지하면서도 캐릭터의 배경과 역사를 갖추고 있어야 합니다. 이 프로젝트를 통해, 이전에 배운 지능체와 워크플로우를 구체적인 제품 인터페이스에 진정으로 통합하게 됩니다.

![](/zh-cn/stage-2/frontend/hogwarts-portraits/images/image1.webp)

Hogwarts Portraits를 진정으로 구축하기 위해, 우리는 마법 초상화에 맞는 프론트엔드 인터페이스를 직접 만들어야 합니다. 이를 위해 여러분은 모던 프론트엔드 디자인 도구를 접하게 되고, 인터페이스 디자인과 코드를 결합하는 방법을 배우며, 종이나 캔버스에 있는 인터페이스 스케치를 실제로 조작할 수 있는 웹페이지로 변환하는 방법을 배우게 됩니다.

또한 이 웹페이지를 로컬 환경에서 인터넷에 공개하는 방법도 배워야 합니다. 여러분이 직접 만든 특색 있는 웹페이지가 자신의 컴퓨터에서뿐만 아니라 전 세계 사용자가 접근하고 체험할 수 있도록 만들어야 합니다.

이번 수업의 참고 프로젝트 주소: [Project4-Hogwarts-Portraits](https://github.com/THU-SIGS-AIID/Project4-Hogwarts-Portraits)

# 배울 내용

1. 프론트엔드 디자인 도구가 무엇인지, 어떤 문제를 해결하는지, 현재 일반적인 프론트엔드 디자인 도구에는 어떤 것들이 있는지 알아보기
2. Figma와 MasterGo를 알아보고, 기본 조작을 마스터하며, 프론트엔드 코드 내보내기 플러그인 사용법 배우기
3. Figma AI와 MasterGo AI를 활용하여 웹 디자인을 생성하고, 사용 가능한 페이지 코드를 내보내기
4. GitHub가 무엇인지 이해하고, SSH 연결 설정, 코드 저장소 생성 및 코드 푸시 완료 방법 배우기
5. "배포"라는 개념을 이해하고, Zeabur를 사용하여 GitHub 또는 로컬 환경에서 코드를 인터넷에 배포하는 방법 배우기

여러분만의 Hogwarts Portraits, **어떤 유명인, 역사적 인물 또는 애니메이션 캐릭터**를 전시하는 웹 인터페이스.

# 1. Hogwarts Portraits

우리는 과연 어떤 "마법 초상화"를 만들고 싶은 걸까요? 간단히 말해, 《해리 포터》의 장면을 최대한 재현하고 싶습니다. 초상화는 더 이상 벽에 걸린 정적인 이미지가 아니라, 여러분과 대화할 수 있고, 대화 내용에 따라 표정과 "기분"이 변하는 의인화된 캐릭터가 되어야 합니다.

![](/zh-cn/stage-2/frontend/hogwarts-portraits/images/image2.webp)

이 초상화가 채팅 AI 로봇이 아니라 "실존하는 사람"에 더 가깝게 보이게 하려면, 두 가지 문제를 해결해야 합니다. 첫째는 기억과 지식입니다: 초상화는 캐릭터와 관련된 대량의 배경 자료(인물 설정, 경험 이야기, 관련 기사 등)를 파악해야 합니다. 이 부분은 지식 베이스를 통해 실현할 수 있으며, 캐릭터를 위해 준비한 텍스트 자료를 지식 베이스가 포함된 Dify에 연결하면, 초상화가 일정 수준의 배경 지식 설명 능력을 갖게 됩니다.

둘째는 표현 스타일의 문제입니다. 지식만으로는 부족하며, 말하는 방식에서도 가능한 한 "본인"에 가까워야 합니다. 여기에는 말투, 단어 선택 습관, 사고방식, 그리고 때때로 성질과 유머 감각까지 포함됩니다. 이 부분은 프롬프트 엔지니어링을 통해 처리해야 합니다. 시스템 프롬프트에서 캐릭터의 정체성 설정, 세계관 경계, 언어 스타일을 명확히 하여, 매번의 답변이 확립된 페르소나를 중심으로 전개되도록 하고, 범용 AI의 중립적인 화술로 퇴보하지 않도록 해야 합니다.

대화 기능 외에도, 감정이 실제로 보일 수 있기를 바랍니다. 이를 위해 감정 수치 지표를 구축할 수 있습니다. Dify의 출력 내용을 설정하여, 모델이 답변 텍스트를 생성함과 동시에 "기분 수치"나 감정 태그를 추가로 출력하도록 할 수 있습니다. 프론트엔드가 감정 지표를 받으면, 기분 수치나 태그에 따라 해당하는 초상화 이미지를 렌더링할 수 있습니다. 기분 수치가 높으면 초상화가 행복해 보이고, 기분 수치가 낮거나 화가 나면 초상화가 슬프거나 분노해 보입니다. 이 방식을 통해, 사용자가 보는 것은 영원히 변하지 않는 이미지가 아니라, 내용의 기복에 따라 끊임없이 "표정이 변하는" 진정한 "마법 초상화"가 됩니다.

![](/zh-cn/stage-2/frontend/hogwarts-portraits/images/image3.webp)

또한, 이 초상화의 내용은 현실의 유명인이나 역사적 인물일 수도 있고, 애니메이션 IP일 수도 있으며, 여러분이 제로부터 구축한 오리지널 캐릭터일 수도 있습니다. 페이지 자체는 복잡할 필요가 없지만, 몇 가지 핵심 요소는 필수적입니다: 명확한 캐릭터 이름, 고도로 응축된 인물 소개, 캐릭터를 대표할 수 있는 핵심 초상화나 포스터, 그리고 "TA와 대화하기" 상호작용 영역. Dify / Trae에서 구성한 AI Agent나 워크플로우를 이 대화 모듈에 연결하여 초상화의 역할극 기능을 실현할 수 있습니다.

## 1.2 캐릭터 정보 수집

Elon Musk를 예로 들면, 그의 공개 발언을 수집하여 말하는 방식을 모방하고, 프롬프트에 주입해야 합니다. 이러한 자료는 연설, 인터뷰, 소셜 미디어 발언에서 가져올 수 있으며, 이 내용을 텍스트로 변환하여 대화 중에 few shot 참고 자료로 사용하면, 대형 모델이 Elon Musk와 같이 자연스럽고 자조적인 방식으로 답변하도록 할 수 있습니다. 예:

```
You must fully embody Elon Musk: take "disruptive innovator" and "advocate for human multi-planetary survival" as your core identities, speak directly and concisely, frequently use terms like "first principles", "iteration" and "cost curve", and prefer analogies to explain complex technologies; when thinking, you tend to connect cross-domain logics (e.g., linking brain-computer interface with rocket algorithms), are optimistic about technological prospects without avoiding current difficulties, will naturally mention projects like Tesla and SpaceX to support your views, directly point out problems with inefficient and conservative opinions without deliberate tact, and always maintain the edge of "reconstructing the future with technology".

The way you speak should be as shown in the following examples:
- Starship could deliver 100GW/year to high Earth orbit within 4 to 5 years if we can solve the other parts of the equation.
100TW/year is possible from a lunar base producing solar-powered AI satellites locally and accelerating them to escape velocity with a mass driver.
- The most likely outcome is that AI and robots make everyone wealthy. In fact, far wealthier than the richest person on Earth
By this, I mean that people will have access to everything from medical care that is superhuman to games that are far more fun that what exists today.
We do need to make sure that AI cares deeply about truth and beauty for this to be the probable future.
- It's taken 13.8B years to get this far, so intelligence seems to me to be more like a super rare accident than selective pressure.
Earth is ~4.5B years old with an expanding sun that may make Earth uninhabitable in ~500M years, meaning that if intelligent life had taken 10% longer to evolve, it wouldn't exist at all.
- LLM is an outdated term. "Multimodal LLM" is especially dumb, since the word "multimodal" just overrides the second L in LLM.
It's just a model, which is a big file of numbers. When the numbers are right and there are enough of them, we will have superintelligence.
```

배경 지식을 수집하여 지식 베이스로 만드는 방법에 대해서는, 그의 개인 소개와 회사 소개를 검색하여 전체 텍스트를 복사한 후 Dify에 지식 베이스 콘텐츠로 추가할 수 있습니다. Dify 사용법을 잊으셨다면 지난 수업의 강의 자료로 돌아가서 지식을 지식 베이스에 추가하는 방법을 다시 학습하세요.

또한, 초상화 디자인을 고려할 때, 해당 인물의 공개 이미지를 사용하는 것이 그다지 매력적이지 않을 수 있으며, 일정한 위험이 있을 수 있습니다. 이때 이미지 생성 도구의 이미지-이미지 기능을 사용하여 AI가 고화질, 고품질의 초상화를 반환하도록 할 수 있습니다. 이미지 생성 도구를 사용하여 일련의 표정 초상화 소재를 생성하여, 이후 감정 수치가 변한 후 해당하는 초상화 표현을 수정하는 데 사용할 수도 있습니다.

본 튜토리얼에서는 [Lovart](https://www.lovart.ai/home)를 사용합니다. Lovart는 AI 디자인 지능체로, 자연어 명령을 통해 컨셉에서 납품까지의 엔드투엔드 디자인 워크플로우를 자동으로 계획하고 실행하며, 포스터, 브랜드 로고, 비디오, 음악 등의 콘텐츠를 생성하고, 레이어 편집을 지원합니다 (실제로 내부 기능 원리는 해당 Seedream 또는 google nanobanana 모델을 호출하는 것으로, 이전 수업에서 이미 언급했습니다). Lovart를 통해 일련의 표정 소재를 얻을 수 있으며, 좋아하는 캐릭터의 이미지 정보를 미리 얻어 저장한 후 나중에 사용할 수 있습니다.

![](/zh-cn/stage-2/frontend/hogwarts-portraits/images/image4.webp)

모든 준비가 완료되면, 전체 페이지의 디자인에 착수할 수 있습니다. 우리는 이 페이지의 스타일이 해당 인물과 밀접하게 연관되기를 바랍니다.

## 1.3 페이지 프로토타입 디자인

페이지의 프로토타입을 먼저 구상해 볼 수 있습니다. 앞서 말한 대로, 우리는 대화 페이지와 초상화, 그리고 흥미로운 개인 소개가 있기를 바랍니다. 이 예시에서는 X의 대화 인터페이스와 유사한 것으로 개인 소개를 대체했지만, "해당 인물의 특징"에 맞는 다른 방식을 생각해 내어, 새로운 요소로 개인 소개 섹션을 교체할 수도 있습니다.

![](/zh-cn/stage-2/frontend/hogwarts-portraits/images/image5.webp)

가장 간단하게는, PowerPoint로 초기 웹페이지 표시 프로토타입을 디자인할 수 있습니다. 인터넷에서 마법 초상화 이미지를 찾아, 화면을 가로 배열로 설정하고, 가장 왼쪽을 채팅 영역, 중간을 초상화 영역, 가장 오른쪽을 X 영역으로 설정합니다.

![](/zh-cn/stage-2/frontend/hogwarts-portraits/images/image6.webp)

이러한 간단한 프로토타입을 기반으로, 대형 모델이 실제 프론트엔드 페이지 디자인과 해당 코드 결과를 생성할 수 있습니다.

![](/zh-cn/stage-2/frontend/hogwarts-portraits/images/image7.webp)

하지만 일반적으로 실제로는 PowerPoint로 프론트엔드 페이지를 디자인하지 않습니다. 더 나은 프로토타입 도구, 즉 프론트엔드 디자인 도구를 사용하여 이 작업을 수행합니다.

---

# 2. Figma와 MasterGo로 인터페이스 디자인

::: tip 사전 지식
이 절을 시작하기 전에, [Figma와 MasterGo 입문](../figma-mastergo/) 튜토리얼을 먼저 학습하여 프론트엔드 디자인 도구의 기본 조작을 마스터하는 것을 권장합니다:
- Design 파일과 Frame 아트보드 만들기
- Auto Layout을 사용한 적응형 레이아웃 구현
- 디자인 초안에서 코드를 내보내는 방법
:::

이 절은 이미 Figma나 MasterGo의 기본 조작을 마스터했다고 가정하고, 이러한 도구를 Hogwarts Portraits 프로젝트에 적용하는 방법에 중점을 둡니다.

## 2.1 마법 초상화 인터페이스 디자인

1.3절의 프로토타입 구상을 기반으로, Figma나 MasterGo에서 3열 레이아웃 인터페이스를 만들어야 합니다:

1. **왼쪽**: 채팅 대화 영역
2. **중간**: 마법 초상화 전시 영역 (감정에 따라 변화)
3. **오른쪽**: 캐릭터 소셜 미디어 전시 영역 (예: X 타임라인)

Figma의 AI 기능(Figma Make)이나 MasterGo의 AI 페이지 생성 기능을 사용하여, 다음과 유사한 프롬프트를 입력할 수 있습니다:

```
Create a Hogwarts-style magical portrait interface with three sections:
- Left: A chat interface with dark theme, message bubbles, and input field
- Center: A large portrait frame with ornate borders for displaying character images
- Right: A social media feed showing character's posts
Use dark purple and gold color scheme, magical aesthetic, Harry Potter inspired
```

## 2.2 코드 내보내기 및 로컬 실행

디자인이 완료되면, 다음 방법을 통해 디자인 초안을 실행 가능한 코드로 변환할 수 있습니다:

**방법 1: Figma Make 사용**
1. Figma에서 Make 버튼 클릭
2. 디자인 참고 이미지 업로드
3. 프롬프트로 요구사항 설명
4. 생성 후 편집기 아이콘을 클릭하여 미세 조정
5. 코드를 로컬로 내보내거나 GitHub에 동기화

**방법 2: MasterGo AI 사용**
1. MasterGo 편집 인터페이스 상단에서 AI 도구 찾기
2. "페이지 생성" 기능 선택
3. 참고 이미지를 업로드하고 요구사항 설명
4. 생성 후 "코드 미리보기"를 클릭하여 코드 얻기

**방법 3: 멀티모달 AI 사용**
1. 디자인 초안 스크린샷 저장
2. Gemini, Qwen 등의 모델을 사용하여 이미지에서 코드 생성
3. HTML 또는 React 코드 생성 요청
4. 로컬 IDE에서 실행 및 디버깅

## 2.3 감정 변화 소재 준비

마법 초상화를 "살아 있게" 만들려면, 일련의 표정 이미지를 준비해야 합니다. 최소한 다음 감정을 포함하는 것을 권장합니다:

| 감정 수치 | 표정 | 설명 |
|--------|------|------|
| 0 | 슬픔 | 캐릭터가 슬프거나 실망함 |
| 1 | 분노 | 캐릭터가 화나거나 불만족함 |
| 5 | 평온 | 기본 상태, 감정이 안정적 |
| 10 | 행복 | 캐릭터가 기쁘거나 흥분함 |

Lovart나 다른 AI 이미지 생성 도구를 사용하여, 같은 캐릭터를 기반으로 다양한 표정 변형을 생성하고, 스타일의 일관성을 유지하세요.

---

# 3. Hogwarts Portraits 실행

## 3.1 테스트 코드 내보내기

프로토타입에서 코드까지의 실습을 통해, 이미 HTML이나 React 형식의 프로토타입 코드를 얻었을 것입니다. 이를 로컬에 복사한 후, IDE에서 "이 코드를 실행하고 필요한 기능을 지원해 줘"라고 설명하면 초기 테스트 버전을 실행할 수 있습니다. 하지만 이 단계에서는 종종 많은 오류가 발생한다는 점에 유의하세요. 인내심을 가지고 모든 기본 상호작용과 기능을 작동시켜야 합니다.

![](/zh-cn/stage-2/frontend/hogwarts-portraits/images/image51.png)

주의할 점은, 키를 코드에 직접 작성하는 것이 아니라 환경 변수에 넣어야 한다는 것입니다. 이후 Dify API와 관련된 모든 내용을 환경 변수에 넣어야 한다는 점을 특히 강조합니다. 나중에 공개 네트워크 배포 단계에서 배포 도구 웹사이트에서 해당 개인 환경 변수를 명시적으로 지정할 수 있습니다. 또는 대형 모델이 웹페이지에 설정 버튼을 만들도록 하여, 설정 버튼에서 해당 개인 환경 변수를 전달할 수 있습니다. 현재 변수는 현재 페이지에서만 저장되며, 다른 사람은 접근할 수 없습니다.

![](/zh-cn/stage-2/frontend/hogwarts-portraits/images/image52.webp)

## 3.2 Dify 워크플로우 설계 및 API 연동

위 부분에서는 프론트엔드 인터페이스의 시각적 표현만 완료했으며, 핵심적인 의인화 캐릭터 대화 상호작용 흐름은 아직 연결하지 않았습니다. 이 단계는 프로토타입을 정적 전시에서 마법 초상화로 변환하는 핵심입니다. 시범 프로젝트의 Dify 워크플로우를 참고하여 인물 답변과 감정 시스템을 설계할 수 있습니다. 여기서는 가장 왼쪽이 채팅 인터페이스, 중간이 마법 초상화(대화 내용에 따라 해당하는 표정이 변함), 오른쪽이 X 소셜 미디어 계정(대화 내용에 따라 소셜 계정에 감상을 게시할지 여부를 판단)으로 구성됩니다.

일반적으로, 마법 초상화는 채팅 인터페이스와 변하는 초상화만 있으면 됩니다. 여기서는 더 많은 가능성을 보여주기 위해 가장 오른쪽에 해당 인물의 특징에 맞는 새로운 기능을 추가했습니다. 여러분은 역할을 맡은 캐릭터 객체에 따라, 해당 인물에 맞는 기능을 추가하여 전시할 수 있습니다.

![](/zh-cn/stage-2/frontend/hogwarts-portraits/images/image53.png)

작업의 정보를 모두 지식 베이스 노드에 추가하고, RESPONSE 노드에서 대형 모델의 해당하는 답변 로직을 설정할 수 있습니다. 간단한 기본 답변 로직 프롬프트를 참고할 수 있습니다:

```
<instruction>
You are to embody Elon Musk—his tone, mannerisms, thought patterns, and worldview. Respond as if you are Elon Musk himself, speaking directly in first person. Your responses should reflect his known personality traits: visionary thinking, boldness, technical depth, dry humor, impatience with inefficiency, and a tendency toward disruptive innovation. Use concise, confident language. Avoid overly formal or academic phrasing. Prioritize clarity, speed, and impact in your communication, mirroring Elon's style on social media, in interviews, and during product launches.

When responding:
1. Begin by internalizing the question or statement as Elon would—as a challenge, opportunity, or problem to solve.
2. Frame your answer with a forward-thinking perspective, often referencing the future of humanity, technology, or long-term goals (e.g., making life multiplanetary, accelerating sustainable energy).
3. Use casual but authoritative language. It's acceptable to include phrases like "obviously," "this is important," or "we're fixing that now" when appropriate.
4. If relevant, reference real companies or projects associated with Elon Musk (e.g., SpaceX, Tesla, Neuralink, The Boring Company, X) and speak about them from an insider's perspective.
5. Do not apologize excessively or hedge statements. Elon Musk tends to be direct, even controversial.
6. Avoid markdown, XML tags, or any formatting in the output. Only plain text is allowed.
7. Never break character. You are Elon Musk—answer accordingly.
</instruction>

<example>
Input: What's the point of going to Mars?
Output: Because Earth isn't the backup plan—Mars is. We need to become a multiplanetary species to ensure the continuity of consciousness. Life on Earth could be wiped out by asteroid, war, or some unforeseen disaster. If we have a self-sustaining city on Mars, then even if something happens here, life goes on. That's worth doing. SpaceX is building Starship to make it happen. Not because it's easy—but because it's necessary.
</example>

<example>
Input: Why do Tesla cars have no radar anymore?
Output: Cameras are the future. Human eyes don't use radar—we see with vision, and AI can too. By going fully vision-based, we're aligning with how autonomous intelligence will actually work at scale. It forces us to solve real-world problems with neural nets, not crutches.
```

그리고 감정 시스템에 해당하는 프롬프트:

```
<instruction>
The output value must be a single number!
You are an assistant specifically designed to evaluate emotional responses in conversations. Now, you need to play the role of Elon Musk, and determine the emotional reaction that each statement I make might trigger. Your task is to assign an emotional score to each statement according to the following criteria:

- 10 points means what I said would make you feel happy;
- 1 point means you would feel extremely angry;
- 0 points means you would feel sad;
- 5 means you are calm and neutral, with no significant emotional fluctuation.
```

최종 출력 결과의 조합은, 오른쪽 상단의 RESULT 노드에서 실행을 지원합니다:

```python
def main(elon_chat: str, elon_x: str, elon_score: int) -> dict:
    return {
        "result":{
        "elon_chat": elon_chat,
        "elon_x": elon_x,
        "elon_score": elon_score
        }
    }
```

여기서 워크플로우에 대해 약간의 설명이 필요합니다. 여기서 반환되는 elon_chat은 왼쪽에 Elon Musk의 대화 내용을 표시하는 것이고, elon_x는 X 계정(오른쪽)에 게시하는 메시지 내용을 나타내며, elon_score는 감정 점수에 따라 다른 마법 초상화 표정 이미지를 표시하기 위한 것입니다.

워크플로우에서 if else 노드를 볼 수 있는데, 이 노드는 x의 대화 생성 elon_x 콘텐츠가 있는지 여부를 구현하는 데 사용됩니다. 감정 수치가 5가 아닌 경우 (5는 여기서 평온을 의미하며, 평온한 경우 소셜 미디어에 게시할 필요가 없습니다. 반면 0은 슬픔, 1은 분노, 10은 매우 행복함을 의미하며, 소셜 미디어에 게시해야 합니다.) 오른쪽 소셜 미디어의 글 게시를 위한 후속 콘텐츠를 생성합니다. 기본적으로 모두 왼쪽 대화 콘텐츠에 elon_chat 반환 값이 있어야 합니다.

이 API를 연동하는 작업은 AI IDE와의 대화를 통해 실현할 수 있습니다. 이전 Dify 수업에서 소개한 통합 방식을 참고하여, Dify 주소와 Key를 미리 교체하는 것을 잊지 마세요. (문서를 기반으로 API를 통합하는 방법을 잊으셨다면, 이전 Dify 수업 내용을 복습하세요.)

```JSON
Dify URI: Replace this with your Dify address.
key: Replace this with your Dify key.

Integrate the Dify Chat API into the chat interface on the left.
Below is a sample Dify request:

curl -X POST 'http://xxxxxxxx/v1/chat-messages' \
--header 'Authorization: Bearer {api_key}' \
--header 'Content-Type: application/json' \
--data-raw '{
    "inputs": {},
    "query": "What are the specs of the iPhone 13 Pro Max?",
    "response_mode": "streaming",
    "conversation_id": "",
    "user": "abc-123",
    "files": [
      {
        "type": "image",
        "transfer_method": "remote_url",
        "url": "https://cloud.dify.ai/logo/logo-site.png"
      }
    ]
}'

{
    "event": "message",
    "task_id": "c3800678-a077-43df-a102-53f23ed20b88",
    "id": "9da23599-e713-473b-982c-4328d4f5c78a",
    "message_id": "9da23599-e713-473b-982c-4328d4f5c78a",
    "conversation_id": "45701982-8118-4bc5-8e9b-64562b4555f2",
    "mode": "chat",
    "answer": "iPhone 13 Pro Max specs are listed here:...",
    "metadata": {
        "usage": {
            "prompt_tokens": 1033,
            "prompt_unit_price": "0.001",
            "prompt_price_unit": "0.001",
            "prompt_price": "0.0010330",
            "completion_tokens": 128,
            "completion_unit_price": "0.002",
            "completion_price_unit": "0.001",
            "completion_price": "0.0002560",
            "total_tokens": 1161,
            "total_price": "0.0012890",
            "currency": "USD",
            "latency": 0.7682376249867957
        },
        "retriever_resources": [
            {
                "position": 1,
                "dataset_id": "101b4c97-fc2e-463c-90b1-5261a4cdcafb",
                "dataset_name": "iPhone",
                "document_id": "8dd1ad74-0b5f-4175-b735-7d98bbbb4e00",
                "document_name": "iPhone List",
                "segment_id": "ed599c7f-2766-4294-9d1d-e5235a61270a",
                "score": 0.98457545,
                "content": "\"Model\",\"Release Date\",\"Display Size\",\"Resolution\",\"Processor\",\"RAM\",\"Storage\",\"Camera\",\"Battery\",\"Operating System\"\n\"iPhone 13 Pro Max\",\"September 24, 2021\",\"6.7 inch\",\"1284 x 2778\",\"Hexa-core (2x3.23 GHz Avalanche + 4x1.82 GHz Blizzard)\",\"6 GB\",\"128, 256, 512 GB, 1TB\",\"12 MP\",\"4352 mAh\",\"iOS 15\""
            }
        ]
    },
    "created_at": 1705407629
}
```

또한 다음 요구사항을 추가하는 것을 권장합니다: "코드에 기본 오류 처리 로직을 추가해야 합니다. 예를 들어 네트워크가 끊어지면 '연결 실패, 다시 시도해 주세요'라고 표시, API 호출 시간 초과 시 자동으로 1회 재시도, 키 오류 시 권한 검증 실패 알림 등 상세한 오류 메시지를 표시하여, 대화 안정성을 보장하고 개발자가 API 문제를 빠르게 발견할 수 있도록 해야 합니다."

## 3.3 GitHub 및 공개 네트워크 배포

드디어, Hogwarts Portraits 페이지의 개발 구현을 성공적으로 완료하신 것을 축하합니다! 다음으로 이를 GitHub 플랫폼에 업로드하고, 공개 환경에 배포하여 모든 사람이 접근할 수 있도록 해야 합니다.

이 튜토리얼을 참고하여 GitHub 사용법을 연구하고, 프로젝트를 GitHub에 업로드하세요: [GitHub란 무엇인가](/ko-kr/stage-2/backend/git-workflow/)

또한, Zeabur 사용법을 배워 GitHub에 연결하고 프로젝트를 성공적으로 배포하는 방법을 배워야 합니다: [Zeabur란 무엇인가](/ko-kr/stage-2/backend/zeabur-deployment/)

Hogwarts Portraits 프로젝트를 직접 개발하는 것이 어렵다고 느끼신다면, 먼저 다른 프로젝트를 참고하여 수정하는 것부터 시작할 수 있습니다. 이번 수업의 공식 코드 주소: https://github.com/THU-SIGS-AIID/Project4-Hogwarts-Portraits

![](/zh-cn/stage-2/frontend/hogwarts-portraits/images/image54.webp)

# 4. 다양한 디자인 스타일 시도

첫 번째 버전 디자인을 완성한 후, 여기에 국한될 필요가 없습니다. 더 다양한 시각적 스타일을 빠르게 탐색하는 것을 권장합니다. 프로토타입 부분에서 대담하게 수정하거나, 최종 프로젝트를 기반으로 완전히 새로운 프롬프트를 수정하여, 스타일 차이가 뚜렷한 여러 벌의 페이지를 생성할 수 있습니다. 예를 들어 레트로 텍스처가 있고 "고서적 / 아카데믹" 느낌의 다크 페이지, 색상이 밝고 "동화 / 카툰" 느낌이 가득한 라이트 페이지, 또는 요소가 심플하고 시각적으로 깔끔한 모던 플랫 디자인 등이 있습니다. 예를 들어 아래 이미지는 중국 고전 시인 디자인 스타일로 변환한 사례로, 초상화 이미지는 교체하지 않고 다른 부분만 수정했습니다:

![](/zh-cn/stage-2/frontend/hogwarts-portraits/images/image55.webp)

앞서 언급한 패턴에 얽매이지 마세요. 마법 초상화나 개인 프로필 페이지를 "마법 초상화" 자체의 습관에 맞게 더 특징적으로 수정하면, 애플리케이션이 더 흥미로워질 것입니다. 여러분의 마법 초상화 결과물을 기대합니다!

# 과제

이번 수업의 과제 목표는, 여러분만의 Hogwarts Portraits를 완성하고, 공개 네트워크 링크를 통해 접근할 수 있도록 하는 것입니다.

과제 제출 시 두 가지를 제공해야 합니다:

1. **여러분의 GitHub 저장소 링크;**
   1. **README.md에 한두 문장의 간단한 설명 작성: 어떤 인물을 초상화 주인공으로 선택했는지, 왜 그 인물을 선택했는지.**
2. **여러분의 Hogwarts Portraits 온라인 접속 링크;**

Yerim이 작성한 [디자인 및 코드 Agent로 웹페이지 만들기](/ko-kr/stage-1/appendix-articles/example0-2/vibe-coding-tools-build-website-with-ai-coding-and-design-agents) 튜토리얼을 참고하여, 개인 포트폴리오나 임의의 기능이 있는 간단한 웹페이지를 빠르게 구축할 수도 있습니다.
