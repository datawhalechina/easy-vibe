# Git과 GitHub 워크플로우

이전 강의에서는 웹 기반 vibe coding 도구를 사용하여 코드를 작성하는 방법을 배웠습니다. 매번 대화할 때마다 새로운 버전의 코드가 생성됩니다. 하지만 한 가지 질문을 생각해 봅시다: 이전 수정 사항으로 되돌리고 싶다면 편리한 방법이 있을까요? 우리가 다양한 단계에서 작성한 코드를 기록하여, 언제든지 다른 버전 간에 전환하고 수정할 수 있는 도구가 있을까요?

이러한 요구를 충족하기 위해 버전 관리 소프트웨어가 탄생했습니다. 이 글에서는 가장 유명한 버전 관리 프로그램인 **Git**과 최고의 코드 호스팅 플랫폼인 **GitHub**를 소개하겠습니다. Git을 사용하여 코드를 관리하는 방법, GitHub에서 다른 사람의 코드를 가져오는 방법, 자신의 코드를 업로드하는 방법, 그리고 다른 사람들과 협력하여 대규모 프로젝트를 진행하는 방법을 배우겠습니다.

개인 프로젝트의 버전 추적, 팀 협업에서의 코드 동기화, 오픈소스 커뮤니티에 기여하는 등 어떤 상황에서든 Git과 GitHub는 현대 개발자의 필수 도구입니다. 이를 마스터하면 코드를 더 효율적으로 관리하고, 필요에 따라 체크포인트를 생성하며, 코드의 다양한 단계 간에 자유롭게 전환하고, 단일 파일 변경부터 대규모 프로젝트 개발까지 모든 작업을 쉽게 처리할 수 있게 됩니다 — 모든 코드 반복을 통제 가능하고 추적 가능하게 만듭니다.

> 💡 **사전 지식**
>
> Git을 배우기 전에 다음 개념을 먼저 확인하는 것을 권장합니다:
> - [터미널/명령어 줄이란](/ko-kr/appendix/2-development-tools/command-line-shell) - 명령어 줄을 사용하여 컴퓨터와 상호작용하는 방법 학습
> - [Git이란](/ko-kr/appendix/2-development-tools/git-version-control) - Git 버전 관리 시스템의 핵심 개념 이해
>
> 이 글은 GitHub 워크플로우와 실제 조작에 중점을 두며, 위 기본 지식은 부록 링크를 참조하세요.

# Git 빠른 시작

Git을 사용하기 전에 부록의 [명령어 줄](/ko-kr/appendix/2-development-tools/command-line-shell)과 [Git 기초](/ko-kr/appendix/2-development-tools/git-version-control) 내용을 읽었는지 확인하세요. 이 글은 이미 기본 지식이 있다고 가정하고, Git 설치 및 구성과 GitHub를 사용한 협업 방법을 바로 설명합니다.

## Git 설치 방법

다양한 컴퓨터 운영 체제에 Git을 설치하는 세 가지 방법을 시연합니다. 시스템 버전에 맞는 지침을 따르세요:

### Windows

1. [Git 공식 다운로드 페이지](https://git-scm.com/download/win)에 접속하여 시스템에 맞는 설치 프로그램을 다운로드하세요: [설치 패키지](https://github.com/git-for-windows/git/releases/download/v2.51.0.windows.1/Git-2.51.0-64-bit.exe). 기본적으로 x64 설치 프로그램을 권장합니다.
2. 설치 프로그램을 더블클릭하고 설치 마법사 지침을 따르세요:
   ![](/zh-cn/stage-2/backend/git-workflow/images/image5.png)
   1. 기본 옵션을 유지하는 것을 권장합니다. 사용자 정의가 필요한 경우 다음 사항에 주의하세요: (대부분의 경우 "Next"를 계속 클릭하면 됩니다)
      - Git이 사용할 기본 편집기 선택: 좋아하는 편집기(예: VS Code)를 선택하세요. 첫 번째 옵션인 Vim(텍스트 편집기)을 기본으로 선택하거나, "Visual Studio Code as Git's default editor" 옵션을 선택할 수 있습니다(VS Code가 미리 설치되어 있어야 함). 기본 선택을 유지하고 "Next"를 클릭하여 계속 진행할 수 있습니다.
        ![](/zh-cn/stage-2/backend/git-workflow/images/image6.png)
      - Git 사용 방식 선택: 세 가지 옵션은 시스템에서 Git의 접근성을 제어합니다. 옵션 2("from command line and 3rd-party software")를 권장합니다 — 기본 Git 도구를 PATH에 추가하여 Git Bash, 명령 프롬프트, PowerShell 및 IDE에서 Git을 사용할 수 있게 하며, 시스템을 복잡하게 만들지 않습니다.
        ![](/zh-cn/stage-2/backend/git-workflow/images/image7.png)

3. 설치 후 바탕 화면에서 마우스 오른쪽 버튼을 클릭하세요. 메뉴에 "Git Bash Here"가 보이면 설치가 성공한 것입니다.

![](/zh-cn/stage-2/backend/git-workflow/images/image8.png)

### MacOS

macOS의 경우 먼저 터미널에서 `git --version`을 입력하여 Git이 이미 설치되어 있는지 확인할 수 있습니다. 설치되어 있지 않으면 시스템이 설치를 안내합니다 — 안내에 따라 설치를 완료하세요.

1. 방법 1: Homebrew를 통한 설치
   [Homebrew](https://brew.sh/)(Mac 패키지 관리자)가 설치되어 있다면 터미널을 열고 다음을 입력하세요
   ```bash
   brew install git
   ```
2. 방법 2: (권장) Xcode를 통한 설치: https://developer.apple.com/xcode/, Xcode에 Git이 내장되어 있습니다. 설치 후 안내에 따라 계속 진행하세요.

### Linux

대부분의 Linux 배포판은 패키지 관리자를 통해 Git을 설치할 수 있습니다:

- Ubuntu/Debian:

```bash
sudo apt update
sudo apt install git
```

- CentOS/RHEL:

```bash
sudo yum install git
```

- 설치 확인: 터미널에서 git --version을 입력하세요. 버전 번호가 표시되면 설치가 성공한 것입니다.

## Git 초기화

Git을 설치한 후, 먼저 사용자 정보를 구성해야 합니다 — 이는 Git을 사용한 버전 관리의 기본 단계입니다. 터미널에서 다음 명령을 실행하세요 (괄호 안의 내용을 자신의 정보로 교체):

```bash
# 전역 사용자 이름 설정(커밋 기록에 표시됨)
git config --global user.name "Your Name"

# 전역 이메일 설정(GitHub/GitLab 등 플랫폼에 등록한 이메일 사용 권장)
git config --global user.email "your.email@example.com"
```

Git은 이 정보를 각 커밋 기록에 삽입하여, 매번 수정의 "작성자 정보"로 사용합니다. 버전 기록(예: git log 사용)을 볼 때, 각 코드 줄을 누가 수정했는지 명확하게 볼 수 있어, 책임 추적과 소통에 편리합니다. 협업 프로젝트에서 통일된 신원 정보는 팀원들이 누가 어떤 변경을 했는지 빠르게 식별할 수 있게 하여 협업 효율을 높입니다(예: 커밋 기록을 통해 관련 개발자를 찾아 문제를 논의).

명령어 줄에서 `git config --list`를 입력하여 현재 Git 구성 정보를 확인하고 설정이 성공했는지 확인할 수 있습니다.

# GitHub란

GitHub는 Git 기반의 코드 호스팅 플랫폼입니다. Git 저장소에 대한 원격 저장소를 제공할 뿐만 아니라, 협업 도구(예: Issues, Pull Requests, Projects)도 포함하여 개발자가 코드를 공유하고 협업하기 쉽게 만듭니다. 간단히 말해, Git은 로컬 버전 관리 도구이고, GitHub는 원격 "코드 저장소 클라우드 + 협업 커뮤니티"입니다.

GitHub는 세계 최대의 코드 호스팅 플랫폼일 뿐만 아니라, 전 세계에서 가장 활발하고 영향력 있는 오픈소스 커뮤니티입니다. 여기서 "오픈소스"의 핵심 아이디어는 누구나 소프트웨어의 소스 코드를 다운로드하고 실행할 수 있다는 것입니다. 이 모델은 전 세계 사람들이 서로의 코드를 검사하고 수정하거나, 이를 기반으로 새로운 프로젝트를 만들 수 있게 합니다. 예를 들어, GitHub에서 다양한 학습 튜토리얼과 GPT 모델 훈련에 사용되는 프레임워크(예: PyTorch)의 전체 소스 코드를 찾을 수 있습니다. 매일 전 세계적으로 수많은 사람들이 협력하여 코드를 검토하고 개선합니다.

![](/zh-cn/stage-2/backend/git-workflow/images/image9.webp)

많은 대기업이 업계 경쟁 우위를 얻기 위해 GitHub에서 프로그램이나 튜토리얼을 오픈소스로 공개합니다 — 이는 일종의 광고 형태로도 볼 수 있습니다. GitHub 커뮤니티에서 프로젝트가 받은 "스타(stars)" 수는 그 가치를 측정하는 주요 지표입니다. 프로젝트나 조직이 보유한 스타가 많을수록 신뢰도와 영향력이 큽니다.

![](/zh-cn/stage-2/backend/git-workflow/images/image10.png)

우리 과정에서도 지원 자료와 과제가 전용 GitHub 저장소에 업로드됩니다. 과제를 업로드하는 과정을 통해 GitHub 사용에 점차 익숙해지고 마스터하게 되며, 향후 애플리케이션 개발에서의 버전 관리 기반을 탄탄하게 다질 수 있습니다.

## GitHub 계정 등록

1. [GitHub 공식 웹사이트](https://github.com/)에 접속하여 오른쪽 상단의 "Sign up"을 클릭하세요.
   ![](/zh-cn/stage-2/backend/git-workflow/images/image11.webp)
2. 이메일 주소를 입력하세요(인증 및 알림이 해당 이메일로 전송되므로 자주 사용하는 이메일 사용 권장), 비밀번호를 설정하세요(문자, 숫자, 특수 문자를 포함해야 함).
3. 사람 인증을 완료하고, 안내에 따라 이메일을 인증하면 계정이 생성됩니다.

## GitHub에서 첫 번째 저장소 만들기

다음으로, 첫 번째 저장 폴더, 즉 저장소 또는 "repo"를 만들어 보겠습니다.

![](/zh-cn/stage-2/backend/git-workflow/images/image12.png)![](/zh-cn/stage-2/backend/git-workflow/images/image13.png)

![](/zh-cn/stage-2/backend/git-workflow/images/image14.png)

1. Repository name: 다른 사람에게 표시되는 저장소 이름입니다.
2. Description: 저장소에 대한 상세 설명입니다.
3. Choose visibility: 개인 저장소의 경우 private으로 설정하면 본인과 특별히 초대한 사람만 볼 수 있습니다. public으로 설정하면 모든 사람이 볼 수 있습니다.
   조직 내의 저장소의 경우, Private이면 조직 내의 사람만 볼 수 있습니다.
   Public이면 조직 외부의 사람도 볼 수 있습니다.
4. README: 일반적으로 모든 저장소에는 README 파일이 있어야 한다는 관행이 있습니다. 이는 저장소의 완전한 소개로, 사용 설명, 파일 목록, 조작 방법이 포함됩니다.
5. Add .gitignore and license:
   1. .gitignore 파일은 Git에게 GitHub에 업로드할 때 특정 폴더나 파일을 무시하도록 지시하여, 추적되거나 스테이징 영역에 추가되지 않도록 합니다. 이는 임시 테스트 파일, 의존성 패키지 또는 대용량 파일에 유용합니다. 지정하면 해당 파일은 더 이상 추적되지 않습니다.
   2. license는 선택한 오픈소스 라이선스 유형을 나타냅니다. 다양한 라이선스는 다른 사람이 귀하의 코드를 상업적 목적으로 사용할 수 있는지 여부를 상세히 규정하며, 기타 조건과 약관이 포함됩니다.

"Add README"를 체크하고, 저장소 공개 범위를 "Private"으로 설정하며, 원하는 대로 저장소 이름과 설명을 작성한 후 "Create repository"를 클릭하여 첫 번째 원격 저장소를 생성하세요.

![](/zh-cn/stage-2/backend/git-workflow/images/image15.png)

그러면 추가 파일이 없는 깨끗한 저장소를 갖게 됩니다. 이제 파일 업로드를 시작할 수 있습니다.

![](/zh-cn/stage-2/backend/git-workflow/images/image16.png)

저장소를 가져오는 명령은 `git clone`이지만, 저장소 주소가 필요합니다. 녹색 "Code" 버튼을 클릭하면 저장소 주소를 찾을 수 있으며, HTTPS와 SSH 옵션이 표시됩니다. 일반적으로 두 가지 방법 중 하나를 사용하여 저장소를 로컬 기기에 다운로드할 수 있습니다(이렇게 해야만 파일을 수정하고 업로드할 수 있습니다).

![](/zh-cn/stage-2/backend/git-workflow/images/image17.png)

일반적으로 HTTP를 통해 클론한 저장소는 다른 사람의 저장소를 임시로 다운로드하고 테스트하는 데 적합하지만, 자체 개발에는 권장하지 않습니다. 더 나은 학습 경험을 위해 먼저 SSH 인증을 설정하는 것이 좋습니다.

## 로컬 SSH 바인딩

GitHub에서 "SSH 프로토콜 바인딩"은 본질적으로 로컬 기기의 SSH 공개 키를 GitHub 계정과 연결하여, GitHub가 SSH 프로토콜을 통해 기기를 식별할 수 있게 하는 것을 의미합니다. 이를 통해 비밀번호 없이 원격 저장소를 안전하게 조작(clone, push 또는 pull 코드)할 수 있습니다.

간단히 말해: 이것은 기기에 "GitHub 전용 출입 카드"를 발급하는 것과 같습니다. 바인딩 후, 기기가 SSH 프로토콜을 통해 GitHub 저장소에 접근하면 GitHub가 이 "출입 카드"(귀하의 SSH 공개 키)를 검증합니다. 승인된 기기로 확인되면 바로 조작할 수 있습니다 — 매번 계정 비밀번호를 입력할 필요가 없습니다.

> 💡 SSH란

### 왜 SSH 프로토콜 바인딩이 필요한가?

GitHub는 두 가지 주요 저장소 조작 프로토콜을 지원합니다: HTTPS 프로토콜과 SSH 프로토콜:

- HTTPS 프로토콜: 매번 조작(예: push) 시 GitHub 계정 비밀번호(또는 개인 액세스 토큰 PAT)를 입력해야 합니다. 인증 과정이 번거롭고 비밀번호 유출 위험이 있습니다.
- SSH 프로토콜: "키 페어"를 통해 인증이 완료되므로 비밀번호를 반복해서 입력할 필요가 없으며, 암호화 전송이 더 안전합니다.

"SSH 프로토콜 바인딩"은 GitHub SSH 인증을 활성화하기 위한 전제 단계입니다 — 로컬 SSH 공개 키를 GitHub 계정에 "바인딩"해야만 GitHub가 기기를 인식하고 저장소에 대한 SSH 조작을 허용할 수 있습니다.

### "바인딩"의 핵심 논리: SSH 키 페어의 역할

SSH 인증은 키 페어(공개 키 + 개인 키)에 의존하며, 이들은 서로 일치하는 암호화 파일입니다. 생성 후 "공개 키"를 GitHub에 제공("바인딩")하고, "개인 키"는 로컬 기기에 보관합니다:

1. 개인 키: 로컬 기기(예: 컴퓨터)의 지정된 디렉토리(일반적으로 ~/.ssh/)에 저장되며, "나만의 전용 열쇠" 역할을 합니다. 절대 다른 사람과 공유해서는 안 됩니다.
2. 공개 키: 공개적으로 공유할 수 있는 "자물쇠"입니다 — 이를 GitHub 계정의 "SSH keys list"에 복사해야 합니다("바인딩" 조작).

SSH를 통해 GitHub 저장소를 조작할 때(예: git push git@github.com:xxx/xxx.git):

- 로컬 기기가 개인 키를 사용하여 "조작 요청"을 암호화하여 GitHub에 전송합니다;
- GitHub가 요청을 받은 후, 이전에 바인딩한 공개 키를 사용하여 복호화를 시도합니다;
- 복호화가 성공하면 기기가 승인된 것으로 확인되고 조작이 허용됩니다. 그렇지 않으면 접근이 거부됩니다.

### "바인딩"의 구체적인 단계(핵심 프로세스)

원리를 이해하면 실제 조작은 간단합니다 — 핵심은 "키 페어 생성 → 공개 키를 GitHub에 업로드"입니다:

1. 로컬에서 SSH 키 페어 생성
   1. Trae를 사용하여 공개 키 가져오기(권장)
      프롬프트: `Help me create the SSH key needed for GitHub login. My email is your_email@gmail.com , Please return the public key for me to copy`

   ![](/zh-cn/stage-2/backend/git-workflow/images/image18.webp)

   프롬프트를 입력한 후, 왼쪽 터미널에서 Enter 키를 눌러야 합니다. 그렇지 않으면 명령이 실행되지 않고 계속 대기합니다. Trae는 조건 판단을 실행할 수 없으므로, 계속 Enter를 누르기만 하면 됩니다.

   마지막으로, 오른쪽의 Trae가 읽어온 공개 키를 반환한 것을 볼 수 있습니다. 이를 복사하여 다음 단계에서 붙여넣을 준비를 하세요.

   ![](/zh-cn/stage-2/backend/git-workflow/images/image19.webp) 2. 수동으로 공개 키 가져오기
   로컬 터미널을 엽니다(Windows에서는 Git Bash 또는 PowerShell 사용; macOS/Linux에서는 터미널 사용), 다음 명령을 입력하세요(your_email@example.com을 GitHub 계정 등록에 사용한 이메일로 교체):

   ```bash
   ssh-keygen -t ed25519 -C "your_email@example.com"
   ```

   1. Enter를 눌러 기본값을 수락합니다(기본 파일 경로, 비밀번호 없음, 또는 필요에 따라 비밀번호 설정). 이렇게 하면 ~/.ssh/ 디렉토리에 두 개의 파일이 생성됩니다:
      - id_ed25519: 개인 키(로컬에 저장, **절대 공유하지 마세요**)
      - id_ed25519.pub: 공개 키(GitHub에 업로드 필요)

2. 공개 키를 GitHub 계정에 "바인딩"

이것이 핵심 바인딩 단계입니다 — 로컬 공개 키를 GitHub 계정의 "SSH keys list"에 추가합니다:

1. 공개 키 내용 복사:
   1. Trae:
   2. Windows: 메모장으로 C:\Users\<your>\.ssh\id_ed25519.pub을 열고 모든 내용을 복사합니다;
   3. macOS/Linux: 터미널에서 cat ~/.ssh/id_ed25519.pub을 실행하고 모든 출력을 복사합니다(시작의 SSH-ed25519부터 끝의 이메일까지).
2. GitHub에 로그인하고 "SSH Key Management" 페이지로 이동합니다:
   1. 오른쪽 상단 프로필 사진 클릭 → Settings → 왼쪽 메뉴 SSH and GPG keys → New SSH key 클릭.
      ![](/zh-cn/stage-2/backend/git-workflow/images/image20.png)![](/zh-cn/stage-2/backend/git-workflow/images/image21.png)
   2. 아무 제목이나 입력하고(예: your local computer's SSH), 방금 가져온 SSH 공개 키를 여기에 붙여넣으세요.

![](/zh-cn/stage-2/backend/git-workflow/images/image22.png)

![](/zh-cn/stage-2/backend/git-workflow/images/image23.png)

3. 바인딩 성공 여부 확인

터미널에서 다음 명령을 입력하세요(**Trae로도 다음 작업을 수행할 수 있습니다**) GitHub가 기기를 인식할 수 있는지 테스트합니다:

```bash
ssh -T git@github.com
```

- Hi [your GitHub username]! You've successfully authenticated... 와 같은 내용이 보이면 키 바인딩에 성공한 것입니다;
- 오류가 발생하면, 일반적으로 공개 키 복사가 불완전하거나, 개인 키 권한이 너무 높은 경우(로컬 ~/.ssh/ 디렉토리는 본인만 읽고 쓸 수 있어야 함) 등입니다. 필요에 따라 확인하세요.

### 중요 참고 사항

여러 기기(예: 노트북과 데스크톱)가 있는 경우, 각 기기에 대해 별도의 SSH 키 페어를 생성하고, 각 공개 키를 동일한 GitHub 계정에 바인딩해야 합니다 — 각 기기마다 고유한 "출입 카드"가 있습니다.

개인 키를 절대 공유하지 마세요(GitHub에 업로드하거나 다른 사람과 공유하지 마세요). 그렇지 않으면 다른 사람이 귀하인 척하여 저장소를 조작할 수 있습니다. 개인 키가 유출된 경우 즉시 GitHub에서 해당 공개 키를 삭제하고 새로운 키 페어를 생성하세요.

SSH 바인딩 후, HTTPS 형식(예: https://github.com/username/repository.git) 대신 SSH 형식의 저장소 주소(예: git@github.com:username/repository.git)를 사용하여 조작하세요. 이전에 HTTPS로 저장소를 클론한 경우, git remote set-url origin `<new>`로 프로토콜을 전환할 수 있습니다.

# Trae를 사용한 GitHub 조작

Git이 무엇인지, GitHub가 무엇인지, SSH가 무엇인지, 그리고 이를 어떻게 구성하는지 설명했습니다. 이제 Trae를 자유롭게 사용하여 Git 조작을 수행할 수 있습니다. 먼저 원격 저장소를 로컬 기기에 클론하는 방법을 배워보겠습니다.

## Git clone: 기존 저장소 다운로드

클론하고자 하는 저장소 주소를 직접 알려주면 됩니다

![](/zh-cn/stage-2/backend/git-workflow/images/image24.webp)

## Git pull: 원격 저장소에서 업데이트 가져오기

저장소를 업데이트하기 전에, 여러 사람이 유지 관리할 수 있으므로 먼저 최신 변경 사항을 가져와야 합니다. 그 후 파일을 수정하고 푸시할 수 있습니다.

**잘못된 저장소에 푸시하는 것을 방지하기 위해 폴더 이름과 그 상대 경로 또는 절대 경로를 포함하세요.**

prompt:`Help me pull this repository AIID-TEST in ./AIID-TEST.`

## Git commit & Git push: 업데이트를 스테이징하고 GitHub에 푸시

모든 준비가 완료되면 로컬 파일을 수정하고, 폴더에 항목을 추가하거나 삭제해 보세요. 그런 다음 Trae가 변경 사항을 감지하고 GitHub에 푸시하도록 도와달라고 요청하세요.

prompt:`I finished. Commit and push to the repository AIID-TEST in ./AIID-TEST.`

![](/zh-cn/stage-2/backend/git-workflow/images/image25.webp)

푸시 성공. 이제 GitHub에서 업데이트된 내용을 볼 수 있습니다.

# 참고 자료

- Pro Git book https://git-scm.com/book/en/v2
- GitHub Docs https://docs.github.com/en
