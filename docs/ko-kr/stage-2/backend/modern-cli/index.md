# CLI AI 프로그래밍 도구

이 튜토리얼에서는 명령행에서 직접 실행되는 AI 프로그래밍 Agent에 대해 소개합니다. 이전에 배운 Trae, Cursor의 Agent와는 달리, CLI AI 프로그래밍 도구는 터미널에서만 사용할 수 있습니다. AI IDE에 내장된 Agent에 비해 일반적으로 더 긴 컨텍스트 윈도우, 더 빠른 도구 호출 속도를 갖추고 있으며, 더 다양한 대형 모델과 호환됩니다. 최신 AI Vibe Coding 실전에서는 IDE 내장 코딩 Agent보다 CLI AI 프로그래밍 도구를 우선적으로 사용하는 경우가 많습니다.

## CLI부터 이야기해 보기

이전에 소개한 CLI가 기억나시나요? CLI는 터미널이나 명령 프롬프트를 통해 순수 텍스트 명령으로 소프트웨어 애플리케이션을 조작하는 것을 의미하며, 그래픽 인터페이스(GUI -- 버튼이 있어 클릭으로 조작하는 화면으로, 명령어 입력이 필요 없는 컴퓨터나 스마트폰 화면이라고 간단히 이해하시면 됩니다)에 의존하지 않습니다.

> Windows에서는 "명령 프롬프트(cmd)"와 "PowerShell"이 일반적인 터미널입니다. 컴퓨터의 실행/검색창에 "cmd" 또는 "powershell"을 입력하여 이 명령행 프로그램을 시작할 수 있습니다.

![](/zh-cn/stage-2/backend/modern-cli/images/image1.png)![](/zh-cn/stage-2/backend/modern-cli/images/image2.png)

CLI는 텍스트 명령 조작에 태생적으로 적합합니다. 일부 극소수의 얼리어답터(극한의 프로그래밍 애호가) 그룹에서 CLI는 GUI보다 더 인기가 있습니다. 이들은 모든 조작을 키보드로 완료하기를 원하며, 마우스를 사용하는 것이 오히려 코딩 효율을 떨어뜨린다고 생각합니다.

산업계에서도 CLI가 가장 일반적인 인터페이스 형태인 경우가 많습니다. GUI는 운영 체제가 추가로 인터페이스를 그리고 창을 관리해야 하므로 컴퓨터 리소스 요구사항이 더 높지만, CLI는 받은 명령을 시스템에 전달하여 실행하기만 하면 됩니다. 따라서 대규모 서버 클러스터에 연결할 때는 보통 CLI를 통해서만 상호 작용합니다.

![](/zh-cn/stage-2/backend/modern-cli/images/image3.png)

CLI 경험이 없는 분들은 CLI 조작이 복잡하고 명령어가 너무 많다고 느끼거나, "실수로 컴퓨터를 망가뜨릴까 봐" 걱정할 수 있습니다. 걱정하지 않으셔도 됩니다. 이전 튜토리얼에서 자주 Trae에게 다양한 기본 조작을 도와달라고 했던 것이 기억나시나요? 여기서도 완전히 동일한 접근 방식을 사용할 수 있습니다. CLI 프로그래밍 도구가 모든 CLI 조작을 대신 실행해 주도록 할 수 있습니다. 지정된 폴더로 이동하고, 파일을 검색 및 처리하고, 오픈소스 프로젝트를 실행하거나 복사하는 등의 작업을 CLI AI 프로그래밍 도구와의 대화를 통해 완료할 수 있습니다.

## AI IDE와의 차이점

CLI AI 프로그래밍 도구를 이전에 배운 z.ai와 Trae에 비유할 수 있습니다. 어떤 의미에서 CLI AI 프로그래밍 도구는 특별한 형태의 z.ai라고 볼 수 있습니다. 마찬가지로 간단한 대화 입구만 있으면 필요한 모든 조작을 자동으로 실행해 줍니다(다만 때로는 브라우저를 직접 열어 최종 결과를 확인해야 할 수 있습니다). AI IDE에 비유하자면, CLI AI 프로그래밍 도구는 IDE의 Agent 모듈, 즉 사이드바의 대화 영역으로 볼 수 있습니다.

![](/zh-cn/stage-2/backend/modern-cli/images/image4.png)![](/zh-cn/stage-2/backend/modern-cli/images/image5.png)

하지만 각 AI IDE의 Agent 구현 방식이 다르고 능력 차이도 크기 때문에 AI 프로그래밍 효과가 불안정한 경우가 많습니다. 반면 CLI AI 프로그래밍 도구는 대형 기술 기업에서 직접 개발하는 경우가 많습니다. 예를 들어 Claude를 만든 Anthropic, ChatGPT를 만든 OpenAI 등입니다.

다른 AI 프로그래밍 Agent에 비해 이러한 대형 기업 제품을 직접 사용하는 것이 보통 더 나은 실천 방법입니다. 특히 Claude Code 자체가 Anthropic 내부 연구개발 팀을 위해 서비스하는 도구로, 처음부터 "엔지니어의 실제 요구사항 충족"을 중심으로 설계되었습니다.

더 직관적으로 비교하기 위해 Claude Code와 한 AI IDE Agent의 차이를 간단히 살펴보겠습니다(여기서는 Cursor를 예시로 사용합니다).

| 기능 특징 | Claude Code | Cursor | 우수한 쪽 |
| ----------------- | ------------- | --------------- | ----------- |
| 자동 작업 실행 | ✅ 매우 강력 | ❌ 능력 제한적 | Claude Code |
| IDE 통합 | ❌ 명령행만 | ✅ 네이티브 VS Code | Cursor |
| 실시간 코드 완성 | ❌ 없음 | ✅ 훌륭한 경험 | Cursor |
| 다중 파일 조작 | ✅ 매우 강력 | ⚠️ 괜찮음 | Claude Code |
| GitHub 일체형 작업 | ✅ 직접 커밋 가능 | ⚠️ 수동 작업 필요 | Claude Code |
| 학습 비용 | ⚠️ 보통 | ✅ 쉬운 시작 | Cursor |
| 컨텍스트 길이 | ✅ 매우 긺 | ⚠️ 양호 | Claude Code |
| 디버깅 보조 | ✅ 자동화 | ⚠️ 많은 수동 작업 필요 | Claude Code |

표 출처: <https://northflank.com/blog/claude-code-vs-cursor-comparison>

간단히 말해, CLI AI 프로그래밍 도구는 보통 다음을 지원합니다.

- 더 긴 시간의 연속 대화 지원(심지어 "하루 종일 작업"을 도와줄 수도 있음)
- 더 긴 컨텍스트 윈도우 제공(더 이상 자주 "계속해 줘"라고 말할 필요 없음)
- 더 빠른 응답 속도(더 많은 커스텀 모델 API에 접속 가능)

코딩 관련 조작에서는 대부분의 IDE 내장 Agent보다 더 똑똑하고 안정적입니다.

## 대표적인 CLI AI 프로그래밍 도구

현재 다양한 오픈소스 구현이 있지만, 실전에서는 두 가지 유형의 CLI AI 프로그래밍 도구만 "첫 번째 선택 조합"으로 권장합니다. 자신의 습관에 따라 하나를 선택하시되, 모두 사용해 보고 가장 적합한 것을 고르는 것을 강력히 권장합니다.

- Codex는 GPT-5를 사용하여 전체적인 능력이 더 뛰어남
- Claude Code는 GLM 4.6을 통해 API를 전달하여 전체적인 경험이 Claude 4에 가깝지만 가격이 더 저렴함
- OpenCode는 모델을 자유롭게 전환 및 조합할 수 있고, 무료 모델을 제공하여 비용을 더 잘 제어할 수 있음

하지만 어떤 것이 실제 프로젝트에서 더 나은지는 직접 테스트해 봐야만 알 수 있습니다. 다양한 AI 프로그래밍 도구에 능숙해지는 것은 항상 유익합니다. 능숙해지면 Claude Code, Codex, Trae를 서로 다른 시나리오에서 유연하게 전환할 수 있습니다. 어떤 도구의 효과가 일반적이라면 다른 도구나 모델로 바꾸어 계속 실험해 보면 됩니다.

또한 모델 버전 업데이트가 매우 빠르므로, "가성비(효과 / 비용)" 측면에서 가장 좋은 성능을 보이는 방안을 우선적으로 선택하는 것이 좋습니다.

### Claude Code

Claude Code는 Anthropic이 Claude 대형 모델 능력을 기반으로 개발한 AI 프로그래밍 도구입니다. 주요 상호 작용 환경은 터미널이며, VS Code 플러그인으로도 사용할 수 있습니다. AI IDE의 Agent와 유사하게 개발자의 코드 저장소를 깊이 이해하고, 자연어 명령으로 엔드투엔드 개발 작업을 완료할 수 있습니다. 코드 편집, 버그 수정, 테스트 실행 및 복구, Git 워크플로우 관리(예: 병합 충돌 해결, PR 생성), 복잡한 코드 설명, 터미널 명령 실행 등이 포함됩니다.

![](/zh-cn/stage-2/backend/modern-cli/images/image6.png)

Claude Code의 장점은 주로 다음과 같습니다: 매우 긴 컨텍스트 윈도우(전체 파일이나 소규모 프로젝트 처리 가능), 모호한 요구사항을 능동적으로 명확히 하는 능력, 자동으로 작업을 계획하고 할당하는 능력, 전체 코드베이스 내용에 대한 깊은 이해와 설명 능력 등입니다. 일반적인 IDE Agent에 비해 "몰입형 Vibe Coding" 개발 프로세스에 더 적합합니다.

실제 사용에서는 대화 명령을 통해 새 프로젝트를 생성하고, CLI 조작을 실행(예: 폴더 정리, 파일 일괄 이름 변경, 오픈소스 프로젝트 배포 등)하고, 개발 환경을 설정(예: Python 환경 설치 및 디버깅)하도록 할 수 있습니다. 특정 코드가 이해하기 어렵거나 디렉토리 구조가 명확하지 않은 경우, Claude Code에게 구조화된 분석 문서를 생성하거나 특정 내용을 단계별로 설명해 달라고 직접 요청할 수도 있습니다.

![](/zh-cn/stage-2/backend/modern-cli/images/image7.png)![](/zh-cn/stage-2/backend/modern-cli/images/image8.png)

![](/zh-cn/stage-2/backend/modern-cli/images/image9.png)![](/zh-cn/stage-2/backend/modern-cli/images/image10.png)

Claude Code를 체계적으로 학습하고 싶다면 Andrew Ng과 Anthropic이 공동으로 출시한 강의를 참고하세요:
<https://www.bilibili.com/video/BV176t2zSEpr>

이제 Claude Code 사용 방법을 배워보겠습니다. 공식 Claude Code를 직접 사용하면 비용이 매우 높은 경우가 많으므로(아래 이미지 참조), Claude Code 프로토콜과 호환되지만 다른 대형 모델 기반의 API 플랫폼을 사용하겠습니다.

![](/zh-cn/stage-2/backend/modern-cli/images/image11.png)

다음 몇 가지 다른 방식을 학습해야 합니다(모두 사용해 보는 것이 좋습니다). 마지막에 가장 적합한 것을 선택하여 주요 실천 경로로 삼으세요.

첫 번째 방식은 "Anthropic 인터페이스 호환" API를 직접 사용하는 것입니다. Claude Code가 유행하면서 점점 더 많은 대형 모델 서비스 제공업체가 Anthropic 스타일의 호출 방식을 지원하기 시작했습니다. 일반적인 서비스 제공업체로는 GLM, Kimi, DeepSeek, Siliconflow 등이 있으며, 모두 호환되는 API 인터페이스를 제공합니다. 구체적인 설정은 후문에서 자세히 설명하겠습니다.

주의할 점은 Claude Code가 일반적으로 많은 token을 소모한다는 것입니다. API 호출로 인한 과도한 비용 발생이 우려된다면, GLM의 월간 정액제(약 20위안/월)를 구매하여 비용을 통제하는 것을 고려해 볼 수 있습니다. 실제 지출을 먼저 확인해 보고 싶다면 10위안을 충전하여 소규모 테스트를 진행할 수도 있습니다.

다른 방식은 "Claude Code Route" 프로젝트를 사용하는 것입니다. 이것은 오픈소스 도구로, 모든 일반적인 API 호출 인터페이스를 지원할 뿐만 아니라, 시나리오별로 사용할 모델을 세밀하게 설정할 수 있으며, 로컬에 배포된 대형 모델과의 연결도 지원합니다. 하지만 이 방식의 설정이 비교적 복잡하므로, 먼저 첫 번째 방식부터 시작하는 것을 권장합니다.

#### 지푸 GLM을 백엔드로 사용하기(추천)

GLM(General Language Model)은 지푸 AI(Zhipu AI)가 자체 개발한 대형 언어 모델 시리즈입니다. GLM-4.6은 현재 GLM 시리즈의 최신 버전으로, 핵심 하이라이트는 코드 능력에서의 우수한 성능입니다(공개 벤치마크와 실제 작업에서 Claude Sonnet 4와 대등하며, 중국 내에서 1티어에 위치).

![](/zh-cn/stage-2/backend/modern-cli/images/image12.png)

또한 컨텍스트 윈도우를 200K로 확장하여 장문과 대규모 코드를 더 여유 있게 처리할 수 있으며, 추론 및 도구 호출 능력도 강화되어 성능과 비용 사이에서 좋은 균형을 이루고 있습니다.

![](/zh-cn/stage-2/backend/modern-cli/images/image13.png)

GLM에 연결하기 전에 먼저 Claude Code를 설치해야 합니다.

명령행 설치 단계가 번거롭거나 중간에 오류가 발생하면, Trae의 Agent에게 설치를 도와달라고 직접 요청할 수 있습니다.

```python
# Claude Code 설치
npm install -g @anthropic-ai/claude-code

# 프로젝트 디렉토리로 이동
cd your-awesome-project

# Claude Code 시작
claude

# Ctrl+C로 Claude 종료
```

다음으로, Claude Code의 기본 API 요청 주소를 수정하여 GLM의 API 서비스를 지원하도록 해야 합니다. 아래 내용을 복사하여 Trae가 해당 환경 변수를 생성하도록 할 수 있습니다. 또는 시스템 환경 변수에 영구적으로 기록할 수도 있습니다(문제가 발생하면 Agent에게 수정을 도와달라고 하면 됩니다).

먼저 GLM의 API Key를 받아 자신이 가장 편한 방식으로 안전하게 보관하세요.

중국 내 버전 주소: <https://bigmodel.cn/usercenter/proj-mgmt/apikeys>
글로벌 버전 주소: <https://z.ai/manage-apikey/apikey-list>

**중국 내 버전 GLM**을 사용하는 경우 다음 변수 설정을 사용하세요.

```python
# Cmd에서 다음 명령 실행
# `your_zhipu_api_key`를 방금 받은 API Key로 교체하세요
setx ANTHROPIC_AUTH_TOKEN your_zhipu_api_key
setx ANTHROPIC_BASE_URL https://open.bigmodel.cn/api/anthropic
```

**글로벌 버전 GLM**을 사용하는 경우 다음 설정을 사용하세요.

```python
# Cmd에서 다음 명령 실행
# 마찬가지로 `your_zai_api_key`를 교체하세요
setx ANTHROPIC_AUTH_TOKEN your_zai_api_key
setx ANTHROPIC_BASE_URL https://api.z.ai/api/anthropic
```

Trae에 다음과 같은 프롬프트를 직접 입력할 수 있습니다.

⚠️ Trae를 통해 "영구 환경 변수"를 설정한 경우, 설정 완료 후 **반드시 Trae를 재시작**해야 합니다. 그렇지 않으면 내장 터미널의 환경 변수가 업데이트되지 않아 로그인 실패나 네트워크 연결 오류가 발생할 수 있습니다.

```python
Based on my environment variable settings:
setx ANTHROPIC_AUTH_TOKEN your_zai_api_key
setx ANTHROPIC_BASE_URL https://api.z.ai/api/anthropic

and my key(Replace it with your own key):
681fea485851d29060cc.13gfaendggaFOhb

please help me configure and start Claude Code
```

다음과 유사한 과정 출력이 보일 것입니다.

![](/zh-cn/stage-2/backend/modern-cli/images/image14.png)

> 💡 환경 변수란 무엇인가요?
>
> 환경 변수는 본질적으로 운영 체제에 저장된 "키-값 쌍" 설정 정보로, 보통 "변수명 = 구체적인 값"의 형태로 존재합니다. 터미널이나 시스템 설정에 미리 구성해 두면, 프로그램이 언제든 이 변수를 읽어 관련 정보를 가져올 수 있습니다. 환경 변수는 코드 자체를 수정할 필요 없이 터미널에 직접 기록할 수 있으므로, 대형 모델 접근에 필요한 키를 유출을 방지하기 위해 환경 변수에 보관하는 것이 일반적입니다. 프로그램은 해당 환경 변수를 읽기만 하면 대형 모델 호출을 완료할 수 있습니다.
>
> Windows 시스템에서는 환경 변수가 대형 모델 접근 키 저장 외에도, 명령행 도구의 "호출 경로"를 저장하는 데 자주 사용됩니다.
>
> 터미널 자체도 하나의 프로그램입니다. 때로는 터미널에서 특정 외부 프로그램을 시작하고 싶을 수 있습니다. 예를 들어 터미널에 `claude`를 입력하여 Claude Code를 시작하는 경우, `claude`만 입력해도 실행되는 이유는 터미널이 시스템의 환경 변수를 읽고, 그중 PATH 변수에 Claude Code 실행 파일이 있는 디렉토리가 포함되어 있기 때문에 터미널이 이를 찾아 실행할 수 있는 것입니다(터미널에서 해당 프로그램의 절대 경로를 붙여넣고 엔터를 누르는 것과 동일).
>
> 전형적인 환경 변수는 다음과 같이 보일 수 있습니다: `PATH=C:\Windows\system32;C:\Program Files\Python`. 이렇게 하면 시스템의 이러한 프로그램을 어떤 경로에서든 실행할 수 있습니다. 예를 들어 명령행에 `python`을 직접 입력하여 Python 인터프리터를 시작할 수 있습니다.
>
> 현재 시스템의 환경 변수를 확인하려면 Windows 검색에서 "환경 변수"를 입력하고, 팝업되는 "시스템 환경 변수 편집" 창에서 모든 변수와 그 값을 볼 수 있습니다. 일부 변수는 대형 모델 키를 저장하는 데 사용되고, 일부는 임의의 경로에서 프로그램을 호출할 수 있도록 프로그램 디렉토리를 추가하는 데 사용됩니다.

이제 최신 GLM을 사용하여 Claude Code 개발을 진행할 수 있습니다. 이전에 진행했던 프로젝트를 다시 실행해 보거나, Trae가 제대로 완료하지 못한 작업을 다시 도전하여 경험의 차이를 비교해 보세요.

🎉 반복적으로 "다시 시작"하는 것은 시간 낭비가 아닙니다. 다시 할 때마다 기술이 한층 더 탄탄해집니다.

GLM과 완전히 동일한 방식으로 Anthropic 호환 형식을 지원하는 다른 인터페이스도 쉽게 연결할 수 있습니다.

#### Kimi K2를 백엔드로 사용하기(추천)

Kimi K2는 월의암면(Moonshot AI)이 출시한 차세대 대형 언어 모델로, 코드 이해와 생성 능력에서 뛰어난 성과를 보여줍니다. Kimi K2는 초장문 컨텍스트 윈도우(최대 200K tokens)를 지원하여 대규모 코드베이스와 복잡한 프로젝트를 쉽게 처리할 수 있습니다.

**핵심 장점:**

- **초장문 컨텍스트**: 200K 컨텍스트 윈도우를 지원하여 전체 프로젝트의 코드를 한 번에 처리 가능
- **강력한 코드 능력**: 코드 생성, 리팩토링, 디버깅에서 우수한 성과
- **중국어 이해 우수**: 중국어 프로그래밍 요구사항에 대한 이해가 더 정확함
- **안정적인 도구 호출**: 안정적인 함수 호출과 도구 사용 지원

**API Key 획득:**

<https://platform.moonshot.cn/console/account>에 접속하여 가입 후 API Key를 받으세요.

**설정 방법:**

참고 문서: <https://platform.moonshot.cn/docs/guide/agent-support>

```bash
export ANTHROPIC_BASE_URL=https://api.moonshot.cn/anthropic
export ANTHROPIC_AUTH_TOKEN=sk-YOURKEY
```

#### Minimax를 백엔드로 사용하기(추천)

Minimax는 시위과기(MiniMax)가 출시한 차세대 대형 언어 모델로, 프로그래밍 작업에서 우수한 성과를 보여줍니다. Minimax 모델은 뛰어난 추론 능력과 코드 생성 품질로 유명하며, 특히 복잡한 프로그래밍 시나리오에 적합합니다.

**핵심 장점:**

- **강력한 추론 능력**: 복잡한 논리 추론과 코드 아키텍처 설계에서 우수한 성과
- **높은 코드 품질**: 생성된 코드가 구조가 명확하고 가독성이 좋음
- **다국어 지원**: 다양한 프로그래밍 언어의 코드 생성 및 변환 지원
- **빠른 응답 속도**: API 응답 속도가 빨라 고빈도 호출 시나리오에 적합

**API Key 획득:**

<https://platform.minimax.io/>에 접속하여 가입 후 API Key를 받으세요.

**설정 방법:**

```bash
export ANTHROPIC_BASE_URL=https://api.minimax.io/anthropic
export ANTHROPIC_AUTH_TOKEN=YOUR_MINIMAX_API_KEY
export ANTHROPIC_MODEL=MiniMax-M3.1-Flash
```

Use `MiniMax-M3.1-Flash` for new configurations, or set `ANTHROPIC_MODEL=MiniMax-M3` explicitly. Keep any intentionally saved legacy or custom model ID. These are direct API model IDs; check your account's access before using a subscription plan. Flash requires adaptive thinking: do not disable thinking or set effort to `none`. See the [MiniMax API compatibility reference](https://platform.minimax.io/docs/api-reference/text-anthropic-api).

#### DeepSeek를 백엔드로 사용하기(추천)

DeepSeek는 심도탐색(DeepSeek)이 출시한 오픈소스 대형 언어 모델로, 뛰어난 코드 능력과 높은 가성비로 개발자들에게 인기가 있습니다. DeepSeek Coder는 프로그래밍 작업에 특화되어 최적화 학습되었습니다.

**핵심 장점:**

- **뛰어난 코드 능력**: 코드 생성, 코드 이해, 버그 수정에서 우수한 성과
- **오픈소스 커스터마이징**: 모델이 오픈소스이므로 필요에 따라 미세 조정 가능
- **높은 가성비**: API 가격이 상대적으로 낮아 고빈도 사용에 적합
- **중국어 지원 우수**: 중국어 프로그래밍 시나리오에 대한 이해가 정확함

**API Key 획득:**

<https://platform.deepseek.com/usage>에 접속하여 가입 후 API Key를 받으세요.

**설정 방법:**

```bash
export ANTHROPIC_BASE_URL=https://api.deepseek.com/anthropic
export ANTHROPIC_AUTH_TOKEN=YOU_DEEPSEEK_API_KEY
export API_TIMEOUT_MS=600000
export ANTHROPIC_MODEL=deepseek-chat
export ANTHROPIC_SMALL_FAST_MODEL=deepseek-chat
export CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC=1
```

#### 바이톈인 Coding Plan을 백엔드로 사용하기(추천)

바이톈인(Volcano Engine)은 바이트댄스(ByteDance)의 클라우드 서비스 플랫폼으로, 기업급 AI 모델 서비스를 제공합니다. 바이톈인의 Coding Plan은 프로그래밍 시나리오에 특화되어 최적화되었으며, 안정적이고 효율적인 코드 생성 능력을 제공합니다.

**핵심 장점:**

- **기업급 안정성**: 서비스 수준 협약(SLA)을 제공하여 서비스 안정성 보장
- **코드 시나리오 최적화**: 프로그래밍 작업에 특화된 최적화
- **다양한 모델 선택**: Doubao-pro, Doubao-lite 등 다양한 모델 지원
- **중국 내 빠른 접속**: 중국 내 노드 배포로 빠른 접속 속도

**API Key 획득:**

<https://console.volcengine.com/ark/region:ark+cn-beijing/apiKey>에 접속하여 가입 후 API Key를 받으세요.

**설정 방법:**

```bash
export ANTHROPIC_BASE_URL=https://ark.volces.com/api/anthropic
export ANTHROPIC_AUTH_TOKEN=YOUR_VOLCANO_API_KEY
export ANTHROPIC_MODEL=doubao-pro-32k
```

#### 기타 Anthropic 호환 API

Siliconflow:

```bash
export ANTHROPIC_BASE_URL="https://api.siliconflow.cn/"
export ANTHROPIC_MODEL="moonshotai/Kimi-K2-Instruct-0905"    # 원하는 모델로 수정 가능
export ANTHROPIC_API_KEY="YOUR_SILICONCLOUD_API_KEY"    # API Key를 교체하세요
```

알리클라우드 DashScope(Aliyuncs): <https://help.aliyun.com/zh/model-studio/get-api-key>

```python
export ANTHROPIC_BASE_URL="https://dashscope.aliyuncs.com/apps/anthropic"
export ANTHROPIC_API_KEY="YOUR_DASHSCOPE_API_KEY"
```

::: details Claude Code Route를 백엔드로 사용하기(심화 사용법)

위에서 GLM 공식 API로 Claude Code의 Anthropic 인터페이스를 교체하는 방법을 설명했습니다. 다음으로 Claude Code Router 도구가 Claude Code를 더 많은 모델 API에 어떻게 적응시키는지 살펴보겠습니다.

[Claude Code Router](https://github.com/musistudio/claude-code-router)는 Claude Code를 위해 특별히 설계된 스마트 라우팅 강화 도구입니다. 핵심 역할은 사용자의 요구에 따라 AI 요청을 서로 다른 플랫폼의 모델에 분배하는 것이며, 고도로 커스터마이징할 수 있습니다. OpenRouter, DeepSeek, Ollama, Gemini 등 수십 개의 플랫폼 연결을 지원하며, 시나리오별로 작업을 특정 모델에 라우팅할 수도 있습니다. 예를 들어 GLM-4.5, Kimi-K2, Qwen3-Coder 등이 있습니다. 예를 들어, 백그라운드 작업을 자동으로 로컬 Ollama에 넘겨 비용을 절감하고, 장문/장코드 작업은 Gemini-2.5-Pro에 넘기며, 코드 설명은 DeepSeek에 넘길 수 있습니다.

![](/zh-cn/stage-2/backend/modern-cli/images/image16.png)

이 도구는 편리한 UI/CLI 설정 관리 기능도 제공하며, "변환기(converter)"를 통해 서로 다른 플랫폼의 API 형식에 적응합니다. GitHub Actions 등의 자동화 통합 및 커스텀 확장을 지원하여, "단일 모델로 모든 시나리오를 커버할 수 없는" 문제와 "플랫폼을 자주 전환하는 번거로움"을 해결하여 사용자가 더 유연하고 저렴하게 AI 도구를 활용할 수 있도록 도와줍니다.

![](/zh-cn/stage-2/backend/modern-cli/images/image17.png)

다음으로 Claude Code Router 설치 방법을 간단히 소개하겠습니다. 대략 다음 단계가 필요합니다(마찬가지로 Trae에게 실행을 도와달라고 할 수 있습니다).

```markdown
npm install -g @anthropic-ai/claude-code
npm install -g @musistudio/claude-code-router
```

설치 완료 후 로컬에서 `ccr` 명령을 사용할 수 있는지 확인합니다. 다음과 유사한 출력이 보이면 설치 성공입니다.

![](/zh-cn/stage-2/backend/modern-cli/images/image18.png)

다음으로 모델을 초기화하고 설정하는 두 가지 방법이 있습니다.

- CCR에 내장된 UI를 사용하여 브라우저에서 제공하는 설정 페이지를 열어 조작
- CCR의 기본 설정 파일을 직접 수정(UI도 근본적으로 설정 파일을 수정하는 것이며, 더 직관적인 인터페이스를 제공할 뿐)

CCR UI를 선택하면 다음과 유사한 인터페이스가 보입니다.

![](/zh-cn/stage-2/backend/modern-cli/images/image19.png)

이때 "Add Provider" 버튼을 클릭하면 다음 인터페이스가 나타납니다. 다음을 수행해야 합니다.

1. Name에 모델 제공업체의 이름 입력
2. API Full URL에 해당 제공업체의 OpenAI 호환 인터페이스 주소 입력
3. API Key에 해당 플랫폼의 API Key 입력
4. Models 영역에 모델 이름을 입력하고 "Add Model" 클릭하여 추가
5. 마지막으로 "Save" 클릭하여 설정 저장

(인터페이스를 아래로 스크롤하면 고급 옵션이 더 많지만, 현재는 무시해도 됩니다.)

![](/zh-cn/stage-2/backend/modern-cli/images/image20.png)

다음은 DeepSeek와 Kimi의 설정 예시입니다.

![](/zh-cn/stage-2/backend/modern-cli/images/image21.png)

![](/zh-cn/stage-2/backend/modern-cli/images/image22.png)

모델 설정을 저장한 후 우측 Router 영역에서 기본 모델(Default)을 지정해야 합니다. 해당 드롭다운에서 `kimi`를 선택(추천)한 후, 우측 상단의 `Save and Restart`를 클릭합니다.

![](/zh-cn/stage-2/backend/modern-cli/images/image23.png)

이후 터미널에서 `ccr code`를 입력하면 Claude Code Router를 통해 Claude Code의 코딩 워크플로우를 시작할 수 있습니다.

![](/zh-cn/stage-2/backend/modern-cli/images/image24.png)

:::

#### Claude Code의 심화 사용법

많은 분들이 처음 Claude Code를 사용할 때 일반적인 대화 도구로만 사용합니다. 하지만 실제로는 다양한 풍부한 기능이 내장되어 있어, 더 효율적이고 유연하게 사용할 수 있습니다. 다음은 일반적인 명령과 사용 예시입니다.

참고 문서:

<https://docs.claude.com/en/docs/claude-code/cli-reference>
<https://docs.claude.com/en/docs/claude-code/slash-commands>

| 명령어 | 기능 | 예시 |
| ----------------- | ----------------------------------------- | ---------------------------------------- |
| claude | 대화형 모드 시작 | `claude` |
| claude "query" | 일회성 작업 실행 후 결과 출력 | `claude "explain this project"` |
| claude -p "query" | 일회성 질문 실행 후 자동 종료 | `claude -p "explain this function xxxx"` |
| claude -c | 가장 최근 세션 이어서 진행 | `claude -c` |
| claude -r | 이전 세션 복원 | `claude -r` |
| /resume | 현재 대화에서 이전 세션으로 전환 | `claude -c`, `/resume` |
| /plugin | 플러그인 관리, 커밋 및 리뷰 확장 기능 설치 가능 | `/plugin` |
| /init | CLAUDE.md로 프로젝트 설명 초기화 | `/init` |
| /clear | 현재 세션 컨텍스트 비우기, 정보 과부하 방지 | `/clear` |
| /compact | 세션 기록 압축, 컨텍스트 token 점유 감소 | `/compact` |
| /cost | 현재 사용료 확인 | `/cost` |
| /model | 사용 중인 모델 전환(호환 API 사용 시 보통 무시 가능) | `/model` |
| /memory | CLAUDE.md 메모리 파일 관리 | |
| /help | 사용 가능한 명령 목록 표시 | `/help` |
| exit or Ctrl+C | Claude Code 종료 | `exit` 또는 `Ctrl+C` |
| /agents | 고급 기능, 후문에서 설명 | |
| /mcp | 고급 기능, 후문에서 설명 | |

**CLAUDE.md**

참고: <https://www.anthropic.com/engineering/claude-code-best-practices>

`CLAUDE.md`는 Claude가 대화를 시작할 때 자동으로 읽어 컨텍스트에 추가하는 특수 파일입니다. 따라서 다음을 기록하는 데 매우 적합합니다.

- 자주 사용하는 bash 명령어
- 핵심 파일과 유틸리티 함수
- 코드 스타일 규칙
- 테스트 방법 설명
- 저장소 협업 규칙(예: 브랜치 이름, merge vs rebase 등)
- 개발 환경 설정 설명(예: pyenv 사용 여부, 권장 컴파일러 등)
- 프로젝트에서 특별히 주의해야 할 사항이나 함정
- Claude가 "기억"해 주길 바라는 모든 정보

`CLAUDE.md` 자체에는 강제 형식이 없으며, 간결하고 사람이 읽기 쉽기만 하면 됩니다. 예를 들면 다음과 같습니다.

```
# Bash commands
- npm run build: Build the project
- npm run typecheck: Run the typechecker

# Code style
- Use ES modules (import/export) syntax, not CommonJS (require)
- Destructure imports when possible (eg. import { foo } from 'bar')

# Workflow
- Be sure to typecheck when you're done making a series of code changes
- Prefer running single tests, and not the whole test suite, for performance
```

#### Claude Code의 내부 원리

참고: <https://github.com/shareAI-lab/analysis_claude_code>

Claude Code가 왜 많은 시나리오에서 Trae나 Cursor 같은 Agent 프로그래밍 도구보다 더 나은지 궁금하다면, 내부 작동 방식을 간단히 살펴볼 수 있습니다.

다른 CLI AI 프로그래밍 도구도 전체적인 구현 방식이 대체로 유사합니다.

![](/zh-cn/stage-2/backend/modern-cli/images/image25.png)

Claude Code는 프로그래밍 작업을 지속적인 "인식-사고-행동-검증" 루프로 분해하고, 그 안에서 다양한 도구를 호출하여 작업을 완료합니다. 인간 개발자의 워크플로우를 모방하여 끊임없이 "코드 작성 -> 실행 -> 결과 확인 -> 개선"을 반복합니다. 시스템 내부에서는 메인 작업 루프가 지속적으로 단계를 실행하며, 각 루프에서 Claude는 다양한 도구(예: 파일 읽기/쓰기, 명령 실행, 코드 검색 등)를 호출하고, 도구가 반환한 실제 결과를 바탕으로 다음 행동을 결정합니다.

몇 가지 주요 특징에 주목할 만합니다.

- **스트리밍 처리(Stream Processing)**: Claude는 모든 코드를 다 작성한 후에 실행하는 것이 아니라, 생각하면서 동시에 결과를 출력할 수 있습니다.
- **지능형 압축(Intelligent Compression)**: 긴 대화는 컨텍스트가 너무 길어지기 쉬운데, Claude는 기록을 핵심 정보로 압축하여 "망각" 확률을 줄이고, 단기/장기 기억을 구분하여 효율적인 실행을 보장합니다.
- **동시성 제어(Concurrency Control)**: 내부 병렬 설계로 여러 작업을 동시에 진행할 수 있으며, 서로 간섭하지 않습니다.
- **서브 Agent 관리(Sub-agent Management)**: 실제 작업에서는 단 하나의 "역할"이 모든 일을 처리하는 것이 아니며, 여러 서브 Agent가 협력하여 코드를 처리할 수 있습니다. 각 Agent는 서로 다른 작업(예: 테스트 전담, 문서 작성 전담 등)을 담당합니다.

### Codex

![](/zh-cn/stage-2/backend/modern-cli/images/image26.png)

![](/zh-cn/stage-2/backend/modern-cli/images/image27.png)

Claude Code와 유사하게, Codex는 OpenAI가 개발한 AI 협업 프로그래밍 도구로, "OpenAI 버전의 Claude Code"로 이해하면 됩니다. 가장 큰 장점은 GPT-5에 대한 효율적인 적응입니다.

실제 체험으로 볼 때, GPT-5는 현재 응답 속도가 더 빠르고 오류 발생률이 더 낮습니다(다중 라운드 복잡 작업에서 정확하게 완료할 확률이 더 높음). 한 가지 단점은 설명이 "학술적"이고 "기술적"인 경향이 있어, 때로는 너무 엄격하고 정보량이 많아 초보자에게는 약간 이해하기 어려울 수 있다는 것입니다.

다음 명령으로 Codex를 설치할 수 있습니다.

```
npm i -g @openai/codex
```

#### OpenAI 공식 API를 백엔드로 사용하기

OpenAI 공식 Codex 입구를 직접 사용하면 설정이 매우 간단합니다. 이미 OpenAI 구독을 개통했거나 해당 API 할당량을 신청한 경우, 명령행에서 `codex`를 입력하여 프로그램을 시작하고 안내에 따라 로그인을 완료하기만 하면 됩니다.

![](/zh-cn/stage-2/backend/modern-cli/images/image28.png)

![](/zh-cn/stage-2/backend/modern-cli/images/image29.png)

#### 전달 OpenAI API 방식을 백엔드로 사용하기

공식 OpenAI API는 가격이 높거나 네트워크 요구사항이 엄격한 등의 문제가 있을 수 있습니다. 이러한 제한을 피하기 위해 다른 API 게이트웨이 서비스를 통해 전달 호출할 수도 있습니다.

이 방식에서는 서드파티 전달 플랫폼에서 해당 Codex API 할당량을 구매하기만 하면, 네이티브 OpenAI Codex에 가까운 사용 경험을 얻을 수 있습니다.

참고: <https://open-dev.feishu.cn/wiki/PAqUwWG4IiuwTvkQ2sGcaQuPnXc>
충전 주소: <https://api.zyai.online/account/topup/recharge>

주의할 점은 token 할당량을 받은 후, 로컬에서 API Key를 설정해야 한다는 것입니다.

키 그룹 설정에서 Codex 전용 항목을 선택해야 합니다.

![](/zh-cn/stage-2/backend/modern-cli/images/image30.png)

다음으로, 받은 Key를 아래 프롬프트에 입력한 후, 전체 프롬프트를 Trae에 넘겨 전체 설정 과정을 완료하도록 합니다.

````bash
My API key is: [Paste your obtained sk-xxxxx key here]

Please help me complete the following configuration tasks:

1. Create configuration directory
   - Create a `.codex` folder under my user directory
   - Windows path should be: `C:\Users\[My Username]\.codex`
2. Backup existing configuration (if exists)
   - Check if `.codex\config.toml` exists
   - If it exists, rename it to `config.toml.bak.[current timestamp]` (timestamp format: yyyyMMddHHmmss)
3. Create configuration file
   - Create `config.toml` in the `.codex` directory
   - Write the following complete content:
   ```toml
   preferred_auth_method = "apikey"

   [model_providers.myrelay]
   name = "My Relay Station"
   base_url = "https://api.zyai.online/v1"
   env_key = "MYRELAY_API_KEY"
   wire_api = "responses"
   request_max_retries = 4
   stream_max_retries = 10
   stream_idle_timeout_ms = 300000

   [profiles.myrelay]
   model_provider = "myrelay"
   model = "gpt-5"
   model_reasoning_effort = "medium"

   [tools]
   web_search = true

4. Set system environment variable
Variable name: MYRELAY_API_KEY
Variable value: The key I gave you

5. Confirm completion and report back:

The full path of the configuration file
Whether the environment variable was set successfully
I can use the command `codex --profile myrelay` to run it
````

설정이 완료되면 `codex --profile myrelay`를 통해 전달 API를 사용하는 Codex를 시작할 수 있습니다. 이후 사용 방식은 Claude Code와 유사합니다. 대화상자에 언제든지 자신의 아이디어와 요구사항을 입력하면 됩니다.

### OpenCode

![](/zh-cn/stage-2/backend/modern-cli/images/image32.png)

![](/zh-cn/stage-2/backend/modern-cli/images/image33.png)

OpenCode는 개발자를 위한 오픈소스 AI Coding Agent 플랫폼으로, "다중 모델 버전의 Claude Code"와 같은 포지셔닝입니다. Terminal을 핵심 상호 작용 입구로 사용하며, 에디터 통합(예: VS Code, Neovim 등)도 지원하여 로컬 코드 저장소에 깊이 접근하고, 자연어를 통해 코드 이해부터 엔지니어링 실행까지의 전체 개발 프로세스를 완료할 수 있습니다.

이것은 단일 모델에 종속되는 AI 프로그래밍 도구가 아니라, GPT, Claude, Gemini 및 로컬 모델까지 자유롭게 전환할 수 있는 개방형 AI Coding Agent 플랫폼입니다. OpenAI 공식도 OpenCode를 통한 Codex/OpenAI 구독 접속을 지원합니다.

![](/zh-cn/stage-2/backend/modern-cli/images/image34.png)

다음 명령으로 OpenCode를 설치할 수 있습니다.

```bash
# Linux / Unix
curl -fsSL https://opencode.ai/install | bash

# Windows
npm i -g opencode-ai
```

#### OpenCode의 무료 모델 사용하기

OpenCode에서는 불특정하게 무료 모델이 제공되며, 설정도 매우 간단합니다. OpenCode를 사용할 위치의 명령행에서 `opencode`를 입력하여 OpenCode 프로그램을 시작한 후 채팅 패널에 진입합니다. `/models` 명령을 입력하고 free 키워드를 검색하면 free 표시가 있는 무료 모델을 볼 수 있습니다.

![](/zh-cn/stage-2/backend/modern-cli/images/image35.png)

일반적으로 무료 모델은 유료/구독 모델에 비해 코딩 작업 완료 속도가 느립니다. 이는 보통 모델 라인의 혼잡 여부, 코딩 피크 시간대인지, 그리고 모델 자체의 능력에 따라 다릅니다.

#### 서드파티 모델을 OpenCode의 메인 코딩 모델로 사용하기

이것이 OpenCode의 핵심 장점입니다. 동일한 MCP, Skills, 컨텍스트를 사용하면서도 자유롭게 모델을 전환하여 다양한 코딩 작업을 완료할 수 있습니다. 아래에서는 OpenAI 공식의 GPT-5.3 Codex를 예시로, OpenCode에 메인 코딩 모델로 연결하는 방법을 설명합니다.

OpenCode의 채팅 창에서 `/connect` 명령을 입력한 후, 첫 번째로 가장 관련성이 높은 명령을 선택하고 Enter를 누르면 서드파티 모델 제공업체의 인증 권한을 선택할 수 있습니다.

![](/zh-cn/stage-2/backend/modern-cli/images/image36.png)

여기서는 OpenAI를 예시로 들어, Enter를 눌러 인증 방식을 선택합니다.

![](/zh-cn/stage-2/backend/modern-cli/images/image37.png)

어느 것을 선택해도 되며, 인증 방식만 다를 뿐입니다. 여기서는 첫 번째 방식인 브라우저 로그인을 선택합니다.

![](/zh-cn/stage-2/backend/modern-cli/images/image38.png)

이 링크를 복사하여 브라우저에서 정상적인 OpenAI 로그인 작업을 수행합니다. 브라우저에 Authorization Successful이 표시되면 OpenCode 클라이언트가 자동으로 OpenAI 모델 선택 인터페이스로 전환됩니다.

![](/zh-cn/stage-2/backend/modern-cli/images/image39.png)

![](/zh-cn/stage-2/backend/modern-cli/images/image40.png)

#### Oh My OpenAgent 플러그인 설치

OpenCode의 강력함은 매우 활발한 커뮤니티 생태계에도 있습니다. GitHub에서 OpenCode와 관련된 매우 많은 플러그인을 검색할 수 있습니다. OpenCode가 모델을 자유롭게 전환할 수 있는 AI 협업 도구라면, Oh-My-OpenAgent는 OpenCode 위에서 실행되는 "다중 Agent AI 프로그래밍 지휘 시스템"입니다. 하나의 복잡한 작업을 여러 서브 작업으로 나누어 다양한 모델에 분배하여 각자의 역할을 수행하게 합니다.

![](/zh-cn/stage-2/backend/modern-cli/images/image41.png)

다음 내용을 복사하여 앞서 OpenCode에 설정한 모델에 붙여넣어 OpenCode에 Oh-My-OpenAgent를 설치할 수 있습니다.

```text
Install and configure oh-my-openagent by following the instructions here:
https://raw.githubusercontent.com/code-yeongyu/oh-my-openagent/refs/heads/dev/docs/guide/installation.md
```

다음은 Oh-My-OpenAgent의 특징과 기능 설명입니다.

| 특징 | 기능 설명 |
| :-------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **자율 군단 (Discipline Agents)** | Sisyphus가 Hephaestus, Oracle, Librarian, Explore를 총괄합니다. 완전한 AI 개발팀이 병렬로 작업합니다. |
| **Team Mode** (v4.0, 선택적 활성화) | 리더 Agent + 최대 8개의 병렬 멤버, 실시간 tmux 시각화, 전용 `team_*` 도구 제품군. `hyperplan`(5명의 적대적 리뷰어) 및 `security-research`(3명의 헌터 + 2명의 PoC 엔지니어) 구동. [문서 ->](docs/guide/team-mode.md) |
| **`ultrawork` / `ulw`** | 원클릭 트리거, 모든 Agent 출동. 작업 완료 전까지 결코 멈추지 않습니다. |
| **[IntentGate 의도 게이트](https://factory.ai/news/terminal-bench)** | 실제 행동 전에 사용자의 진짜 의도를 먼저 분석합니다. 글자 그대로의 의미로 오해받는 AI 불필요한 말과 완전히 작별. |
| **해시 기반 편집 도구** | 모든 수정이 `LINE#ID` 콘텐츠 해시로 검증되어, 0%의 오류 수정. [oh-my-pi](https://github.com/can1357/oh-my-pi)에서 영감. [The Harness Problem ->](https://blog.can.ac/2026/02/12/the-harness-problem/) |
| **LSP + AST-Grep** | 워크스페이스 수준의 이름 변경, 빌드 전 진단, AST 기반 재작성. Agent에게 IDE 수준의 정밀도를 제공. |
| **백그라운드 Agent** | 5개 이상의 전문가가 동시에 병렬 작업. 컨텍스트를 깔끔하게 유지하면서 언제든 성과 확인 가능. |
| **내장 MCP** | Exa(웹 검색), Context7(공식 문서), Grep.app(GitHub 소스코드 검색). 기본 활성화. |
| **Ralph Loop / `/ulw-loop`** | 자기 참조 폐루프. 100% 완성도에 도달할 때까지 결코 멈추지 않음. |
| **Todo 강제 실행** | Agent가 게으름을 피우려고 해요? 시스템이 바로 목덜미를 잡아 끌어옵니다. 당신의 작업은 반드시 완료되어야 합니다. |
| **주석 심사관** | 진한 AI 느낌의 불필요한 주석을 제거합니다. 작성된 코드가 마치 노련한 시니어 엔지니어가 쓴 것처럼 보입니다. |
| **Tmux 통합** | 완전한 인터랙티브 터미널 지원. REPL 실행, 디버거 사용, TUI 도구 사용, 모두 실시간 세션에서 완료. |
| **Claude Code 호환** | 기존 Hooks, 명령, Skills, MCP 및 플러그인? 모두 원활하게 마이그레이션 가능. |
| **Skills 내장 MCP** | Skills가 필요한 MCP 서버를 자체적으로 포함. 필요할 때만 활성화하여 컨텍스트 윈도우를 과부하시키지 않음. |
| **Prometheus 플래너** | 코드를 작성하기 전에 인터뷰 모드를 통해 먼저 전략적 계획 수립. |
| **`/init-deep`** | 전체 프로젝트 디렉토리 계층에 `AGENTS.md`를 자동 생성. Token 절약뿐만 아니라 Agent 이해력도 대폭 향상. |

Sisyphus (claude-opus-4-7 / kimi-k2.6 / glm-5.1)는 당신의 메인 지휘관입니다. 계획을 수립하고 전문가 팀에 작업을 할당하며, 매우 공격적인 병렬 전략으로 작업이 완료될 때까지 밀어붙입니다. 결코 중도에 포기하지 않습니다.

Hephaestus (gpt-5.5)는 당신의 자율 심층 작업자입니다. 목표만 주면 되고, 구체적인 방법은 알려줄 필요 없습니다. 코드베이스 패턴을 자동으로 탐색하고, 처음부터 끝까지 독립적으로 작업을 실행하며, 중간에 도움을 요청하지 않습니다. 명실상부한 장인입니다.

Prometheus (claude-opus-4-7 / kimi-k2.6 / glm-5.1)는 당신의 전략 플래너입니다. 인터뷰 모드를 통해 한 줄의 코드를 작성하기 전에 먼저 질문으로 범위를 확정하고 상세한 실행 계획을 구축합니다.

이것들을 이해한 후, Oh-My-OpenAgent 플러그인이 설치된 OpenCode를 사용하여 코딩 작업을 완료할 수 있습니다.

#### 모델 및 API 설정(심화)

`/connect`로 채팅 인터페이스에서 빠르게 모델에 연결할 수 있지만, 더 세밀한 제어가 필요한 경우(예: 작업별로 다른 모델 지정, 여러 API Provider를 백업으로 설정) OpenCode의 설정 파일인 `opencode.json`을 직접 편집할 수 있습니다.

이 파일은 `~/.config/opencode/opencode.json`(Windows 경로: `C:\Users\사용자이름\.config\opencode\opencode.json`)에 위치하며, OpenCode를 처음 시작할 때 자동 생성됩니다.

다음은 바이렌 플랫폼(알리클라우드)의 Qwen 모델을 연결하는 설정 예시입니다.

```json
{
  "model": "bailian-coding-plan/qwen3.5-plus",
  "small_model": "bailian-coding-plan/qwen3.5-plus",
  "provider": {
    "bailian-coding-plan": {
      "options": {
        "apiKey": "sk-나의API키"
      }
    }
  }
}
```

> 💡 `model` 필드의 형식은 `제공업체/모델이름`입니다. 해당 플랫폼에 가입하여 API Key를 받은 후, 위의 `apiKey` 값을 교체하세요.

여러 모델을 동시에 설정하려면 설정에서 다양한 작업 카테고리를 지정할 수 있습니다.

The MiniMax quick-task example uses the [OpenCode Console route](https://opencode.ai/v2/docs/console/models/). Connect that provider with `/connect` first. Its `minimax-m3.1-flash-free` offer is time-limited; `opencode/minimax-m3` is a paid alternative. These gateway IDs are distinct from direct MiniMax API IDs and OpenCode Go subscription models.

```json
{
  "model": "bailian-coding-plan/qwen3.5-plus",
  "categories": {
    "visual-engineering": {
      "model": "bailian-coding-plan/qwen3.5-plus",
      "description": "프론트엔드, UI/UX, 디자인, 스타일"
    },
    "ultrabrain": {
      "model": "bailian-coding-plan/qwen3-coder-next",
      "description": "복잡한 로직, 알고리즘, 아키텍처 결정"
    },
    "quick": {
      "model": "opencode/minimax-m3.1-flash-free",
      "description": "간단한 수정, 오타 수정"
    }
  }
}
```

이렇게 하면 OpenCode가 작업 유형에 따라 자동으로 가장 적합한 모델을 선택합니다. 간단한 수정에는 빠른 모델로 비용을 절약하고, 복잡한 아키텍처 문제에는 더 강력한 모델로 품질을 보장합니다.

#### MCP 서버로 OpenCode 확장하기

MCP(Model Context Protocol)는 AI 프로그래밍 도구가 외부 도구를 호출할 수 있게 하는 개방형 프로토콜입니다. 예를 들어 브라우저 조작, 웹 검색, 이미지 분석 등을 할 수 있습니다. OpenCode는 MCP를 네이티브로 지원하며, 설정 방식은 Claude Code와 유사합니다.

`opencode.json`의 `mcp` 필드에 서버 설정을 추가합니다.

```json
{
  "mcp": {
    "chrome-devtools": {
      "type": "local",
      "command": ["npx", "-y", "chrome-devtools-mcp@latest"]
    },
    "zai-mcp-server": {
      "type": "local",
      "command": ["npx", "-y", "@z_ai/mcp-server"]
    }
  }
}
```

설정 완료 후 OpenCode를 재시작하면, AI가 대화에서 이러한 도구를 자동으로 호출할 수 있습니다. 예를 들어 브라우저를 열어 스크린샷을 찍고, UI 디자인 이미지를 분석하고, 웹페이지 정보를 검색하는 등의 작업을 할 수 있습니다.

> 🎯 **실용적인 시나리오**: AI가 웹페이지의 레이아웃 문제를 분석해야 할 때, chrome-devtools MCP를 설정하고 "이 페이지를 열어서 버튼 위치가 잘못된 이유를 확인해 줘"라고 말하면, AI가 자동으로 브라우저를 열고, 스크린샷을 찍고, 분석하여 수정 제안을 제공합니다.

#### 일상 사용 팁과 자주 묻는 질문

**AGENTS.md로 AI 행동 지정하기**

프로젝트 루트 디렉토리에 `AGENTS.md` 파일을 생성하면 OpenCode에게 프로젝트 규칙과 선호사항을 알려줄 수 있습니다. AI는 매번 시작할 때 이 파일을 자동으로 읽습니다.

```markdown
## 프로젝트 규칙
- TypeScript strict mode 사용
- API 응답은 JSON Schema 준수
- 에러 처리는 커스텀 Error 서브클래스 사용

## 개발 프로세스
1. 수정 전 기존 코드 먼저 이해
2. 작은 단위로 커밋, 매번 하나의 논리 단위
3. 완료 후 npm test 실행하여 검증

## 금지 사항
- any 타입 사용 금지
- 테스트 파일 삭제 금지
```

**병렬로 코드베이스 탐색하기**

프로젝트에 익숙하지 않은 경우, OpenCode가 여러 측면을 동시에 검색하도록 할 수 있습니다.

> 다음 몇 가지를 동시에 해줘:
> 1. 프로젝트에서 HTTP 요청을 처리하는 모든 곳 검색
> 2. 데이터베이스 관련 코드 찾기
> 3. 프로젝트의 디렉토리 구조와 각 모듈의 역할 나열

OpenCode가 이러한 탐색 작업을 병렬로 실행하여, 한 번에 완전한 코드베이스 맵을 제공합니다.

**자주 묻는 질문**

| 문제 | 해결 방법 |
|------|---------|
| `opencode` 명령을 찾을 수 없음 | npm 전역 디렉토리가 PATH에 없음. 터미널에서 `[Environment]::SetEnvironmentVariable("Path", "$env:Path;$env:USERPROFILE\AppData\Roaming\npm", "User")` 실행 후 터미널 재시작 |
| AI 응답이 매우 느림 | 간단한 작업은 quick 카테고리 사용(빠른 모델로 자동 라우팅). 대화 기록이 너무 길면 새 세션 시작 |
| API 호출 실패 | API Key가 올바른지, 모델 이름 철자가 정확한지(provider/model-name 형식), 계정 잔액이 충분한지 확인 |
| Skills가 작동하지 않음 | SKILL.md 파일 형식이 올바른지(YAML frontmatter 필요), description 필드가 트리거 조건을 정확하게 설명하는지 확인 |
| 대화 컨텍스트가 너무 긺 | 새 세션을 시작하거나, AGENTS.md에 핵심 규칙을 정의하여 새 세션에서도 상속되도록 설정 |

## CLI AI 프로그래밍 도구의 더 많은 활용법

### AI로 요구사항 문서 작성하기: "구체화" 배우기

대형 언어 모델에게는 추상적인 요구사항을 "구체화"하는 것이 필요합니다. 예를 들어 "배가 고파요"는 추상적인 요구사항이며, "배가 약간 고픈데, 팥빵 하나와 두유 한 잔이 필요할 것 같아요."로 바꿔야 합니다. 이것이 실행 가능한 구체적인 요구사항입니다.

하지만 추상적인 요구사항을 구체적으로 만드는 것은 꽤 에너지가 많이 드는 과정입니다. 충분한 사례를 접하지 못하면 추상적인 문제를 세부적인 모듈로 어떻게 분해해야 할지 빠르게 떠올리기 어렵습니다. 이럴 때 가장 좋은 방법은 AI에게 "구체화" 단계를 도와달라고 하는 것입니다.
예를 들어, "매일 계획" 애플리케이션을 개발하고 싶다면, 가장 소박한 생각은 다음과 같을 수 있습니다.

`Please help me write a daily planning app where I can write my plans each day and get reminders.`

AI는 이 요구사항을 기반으로 직접 작업을 분해한 후 단계별로 완료할 수 있지만, 중간에 오류나 이해 편차가 발생하기 쉽습니다. 위험을 줄이기 위해 AI가 먼저 요구사항을 확장하도록 할 수 있습니다.

`Based on my needs, please elaborate and provide a more detailed Product Requirement Document for reference. My idea is: Please help me write a daily planner app that supports daily plan-writing and provides reminders .`

그러면 AI는 다음과 같은 완전한 PRD를 제공할 수 있습니다.

```
Product Requirements Document (PRD): "Today's Plan" App
Document Version: 1.0
Creation Date: October 27, 2023
Author: (Your Name/Product Manager)

1. Product Introduction
1.1 Product Name
Today's Plan
1.2 Product Vision
"Today's Plan" is a minimalist and highly efficient daily planning and reminder tool, dedicated to helping users eliminate procrastination and forgetfulness, plan every day clearly, and ensure tasks are carried out through an intelligent reminder system—ultimately enabling users to gain a stronger sense of control and achievement over their time.
1.3 Target Users (User Personas)
We mainly serve three types of users:
Students (Xiao Ming):
Characteristics: Multiple tasks such as courses, assignments, club activities, exam prep, needing organized time arrangement.
Pain Points: Easily forget small tasks or assignment deadlines; feel overwhelmed switching between tasks; want to build regular study and life habits.
Needs: A simple tool to list daily to-dos and provide reminders before class/self-study.
Office Workers (Zhang Wei):
Characteristics: Fast-paced work, many meetings, reports, project milestones, and personal affairs (fitness, picking up children).
Pain Points: Easily forget important meetings or work milestones; get interrupted by urgent tasks and forget the original plan; feel busy but inefficient at end of day.
Needs: Need a tool to quickly record and schedule daily work and send strong reminders at key times (e.g., 15 minutes before meetings).
Freelancers/Self-disciplined Seekers (Li Na):
Characteristics: High freedom of time, but strong self-management required for work output and personal growth.
Pain Points: Easily procrastinate, lack external supervision; start the day without a clear plan, leading to low time utilization.
Needs: Need a tool to help build a daily fixed routine (Morning Routine) and review daily achievements for positive feedback.

2. User Stories
As a user, I want to quickly create today's plan list so I have an overview of all my tasks for the day.
As a user, I want to set specific start and end times for each task so I can create a visual timeline.
As a user, I want to receive push notification reminders before a task starts so I won't miss any important arrangements.
As a user, I want to customize the reminder time (such as 5, 15, or 60 minutes in advance) so reminders better fit my habits.
As a user, I want to easily mark completed tasks so I can feel accomplished and clearly see my progress.
As a user, I want to see a summary of my completed plans at the end of each day for reviewing and self-motivation.
As a user, I want to conveniently edit and delete tasks to handle last-minute changes.
As a user, I want to view plans and achievements from previous days to review my efficiency and habits.

3. Feature Breakdown
Core Features (MVP - Minimum Viable Product)
Module 1: Plan Management
3.1.1 Daily Plan Homepage
Interface: "Today" as the core view, current date shown at the top.
View: Timeline list, clearly showing tasks scheduled from morning to evening. Tasks without a time can be listed in the top or bottom "To-do List" section.
Interactions:
Click the "+" button in the bottom right to quickly create a new task.
Pull down to refresh the page.
Swipe left/right to view yesterday's and tomorrow's plans.
3.1.2 Create/Edit Task
Entry: Click "+" on the homepage or a time slot in the list.
Fields:
Task title (required): Briefly describe the task, e.g., "10 AM Weekly Product Meeting."
Task time (optional):
Set "start time" and "end time."
Provide "all-day" option for unspecified time tasks.
Default time picker should be quick and convenient.
Reminder setting (required, with default value): See Module 2.
Notes (optional): Add further descriptions, links, or location info.
Actions: Save, cancel, delete task.
3.1.3 Task Interaction
Mark as complete: Checkbox before each task; checking adds a strikethrough and gray background, indicating completion. Can unmark if needed.
Edit task: Click the task itself to enter edit page.
Delete task: Swipe left on a task to reveal "Delete" button.
Module 2: Smart Reminder System
3.2.1 Reminder Trigger
Mechanism: Based on task's set "start time" and the user's "reminder lead time," send a push notification from device.
Offline Support: Locally scheduled reminders must trigger even if user is offline.
3.2.2 Reminder Content & Format
Notification title: App name "Today's Plan."
Body: "Reminder: [Task Title] will start at [Start Time]." E.g., "Reminder: Product Meeting will start at 10:00."
Sound: Use system default or offer several simple, effective tones.
3.2.3 Reminder Settings
Global Settings (in Settings page):
User can set a default reminder time, e.g., "15 minutes before task starts." New tasks adopt this by default.
Single Task Settings (in create/edit page):
Users can override global settings for important tasks, choosing specific reminder times like "on time," "5 minutes early," "30 minutes early," or "1 hour early."
Provide "no reminder" option.
Subsequent Features (V1.1, V2.0)
3.3 Daily Review & Statistics
Push a summary notification at a set time every night (e.g., 22:00): "How was your day? Take a look at your achievements!"
Generate a simple daily report card: shows total planned tasks, completed tasks, completion rate, plus an encouraging message.
3.4 History Review
Calendar view to click on any past day and check its plans and completion status. Days with high completion rates marked with a special color.
3.5 Templates
Allow users to save a successful daily plan as a template, e.g., "Efficient Workday," "Relaxing Weekend."
When creating tomorrow's plan, one-click import a template, modify slightly to save time.
3.6 Themes & Personalization
Offer dark mode.
Allow changing several primary color themes.

4. Non-Functional Requirements
4.1 Performance
Response: App launch time under 2 seconds; adding/editing tasks must be smooth and lag-free.
Resource Use: Low battery and memory consumption in background; do not over-consume resources waiting for reminders.
4.2 Usability
Minimal & intuitive: UI must be minimal, primary functions accessible within 3 clicks. No tutorial needed for new users.
Error tolerance: Offer undo (e.g. brief undo after mistakenly deleting a task).
4.3 Reliability
Reliable reminders: Reminder function is the product's lifeline; must guarantee 99.99% timely and accurate delivery.
Data loss-free: User plans must be reliably stored locally. Future versions can support cloud sync to prevent data loss on device change.
4.4 Compatibility
Platform: Support major iOS and Android versions (latest 3-4 releases).
Screen: Layout must fit various phone screen sizes.

5. Roadmap
V1.0 (MVP):
Goal: Validate core value—planning & reminders.
Features: Complete all "Core Features" described above (Plan management, smart reminders).
V1.1 (Quick Optimization):
Goal: Improve retention and achievement.
Features: Add "Daily Review & Statistics," "History Review."
V2.0 (Enhanced Experience):
Goal: Increase efficiency and personalization.
Features: Add "Templates," "Themes & Personalization," and start developing "Cloud Sync."
```

처음에 "매일 계획을 쓰고 알림을 받을 수 있는 앱을 만들어 줘"라고 했던 것에 비하면, 이 문서는 훨씬 더 상세해졌습니다. 자신의 실제 요구사항에 따라 내용을 추가하거나 삭제할 수 있습니다. 불확실한 모듈에 대해서는 AI에게 더 많은 대안을 제시해 달라고 계속 요청한 후, 선택하고 병합하여 최종 버전을 만들 수 있습니다.

이러한 방식을 통해 추상적인 아이디어를 구체적인 설명으로 쉽게 변환할 수 있습니다. AI 개발에서 "구체적"이라는 것은 곧 생산성입니다. 요구사항이 구체적일수록 구조가 안정적이고 품질이 높은 프로젝트를 얻기 쉽습니다. 이 방식으로 이전에 진행했던 작은 프로젝트를 다시 시도하여 효과의 차이를 비교해 보세요.

이런 "요구사항 프롬프트"가 너무 길다고 생각된다면, 매우 자연스러운 방법은 이를 별도의 markdown 문서로 작성하여 "요구사항 문서/개발 문서/PRD"로 사용하는 것입니다. 이후 AI에게 프로젝트를 작성하게 할 때마다 "이 문서를 참고해 줘"라고만 하면 되며, 매번 긴 프롬프트를 다시 입력할 필요가 없습니다. 반복 과정에서 이 문서를 계속 개선하여 후속 프로젝트에도 직접 활용할 수 있습니다.

다음은 기타 일반적인 사용 시나리오입니다.

### 폴더 관리

CLI AI 프로그래밍 도구를 사용하여 현재 폴더의 다양한 파일을 관리해 볼 수 있습니다. 예를 들어, 정리되지 않은 파일이 많이 있고 분류 정리가 필요한 경우, Claude Code나 Codex에게 다음과 같이 말할 수 있습니다.

`Please help me organize the contents of the current folder. I want to group files with the same content together & I want to group files from the same time period together. Please help me handle this.`

### 새 프로젝트 개발

이것은 이전에 z.ai, Trae에서 사용한 방식과 거의 완전히 동일합니다. CLI AI 프로그래밍 도구를 사용하여 처음부터 새 프로젝트를 개발할 수도 있습니다. 물론, 미리 요구사항 문서를 준비해 두는 것이 가장 좋습니다.

요구사항 문서가 상세할수록 최종 효과가 더 좋습니다. 계속 변화하는 아이디어에 따라 문서를 여러 라운드에 걸쳐 최적화할 수 있습니다. 문서가 완성도가 높을수록 코드 구현도 더 안정적이고 성숙해집니다.

### 오픈소스 프로젝트 배포(예: Dify)

컴퓨터를 처음 접하는 분들에게는 GitHub에서 오픈소스 프로젝트를 배포하는 것이 꽤 어려울 수 있습니다. 하지만 이 작업을 Claude Code에 맡길 수 있습니다. Dify 튜토리얼에서 했던 것처럼요.

<https://github.com/langgenius/dify>

로컬에서 자신만의 Dify를 실행하고 싶다면, 이 링크를 Claude Code에 전달한 후 다음을 입력하기만 하면 됩니다.

`I want to deploy this GitHub project ``https://github.com/langgenius/dify`` . Please help me clone the project and run it.`

요청을 받은 Claude Code는 GitHub에서 코드를 가져오고, 실행 환경을 설정하고, 프로젝트를 시작하는 등 일련의 작업을 자동으로 완료합니다. 중간에 특정 단계에서 오류가 발생하거나 프로젝트 시작 상태가 비정상인 경우, 안내에 따라 약간의 수동 처리만 하면 됩니다. Dify뿐만 아니라 Claude Code를 사용하여 대부분의 일반적인 GitHub 오픈소스 프로젝트를 배포할 수 있습니다. 대화 상자 하나와 커피 한 잔의 시간만 있으면 됩니다 ☕️.

![](/zh-cn/stage-2/backend/modern-cli/images/image31.png)

### 코드 설명 및 문서 작성

일부 복잡한 프로젝트나 AI가 자동으로 생성한 대규모 프로젝트의 경우, 코드가 너무 길고 로직이 너무 많아 이해하기 어려울 수 있습니다. 이럴 때 CLI AI 프로그래밍 도구에게 "코드를 읽어달라고" 요청할 수 있습니다. 다음과 같이 질문할 수 있습니다.

- 이 프로젝트를 설명해 주세요: 어떻게 실행하는지, 어떻게 사용하는지, 앞으로 어떻게 수정하고 계속 개발하는지?
- 이 프로젝트의 전체 흐름을 설명해 주세요: 프로그램은 어떻게 실행되나요? 사용자가 인터페이스에서 어떤 작업을 할 수 있나요?
- 이 프로젝트의 완전한 문서를 작성해 주세요. 개발 문서와 실행 문서 등을 포함하여.
- 현재 폴더의 모든 콘텐츠를 기반으로 상세한 설명을 작성하여 지정된 markdown 문서에 저장해 주세요.

### 더 많은 활용법

물론 CLI AI 프로그래밍 도구가 할 수 있는 것은 위에서 소개한 것보다 훨씬 더 많습니다. 이를 단순히 "코드 작성 도구"로만 생각하지 말고, 독립적인 행동 능력을 가진 스마트 Agent로 보세요. 다음과 같은 작업을 도와달라고 할 수 있습니다.

- 로컬 파일 관리 및 정리
- 일기 작성, 요약 작성
- 시스템 오류 분석 및 복구
- 다양한 반복적인 명령행 작업 실행

아마도 머지않은 미래에, 이것은 당신 컴퓨터에서 가장 중요하고, 당신을 가장 잘 이해하는 AI 파트너가 될 것입니다.
