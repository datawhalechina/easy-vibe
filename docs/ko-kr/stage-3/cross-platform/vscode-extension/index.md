# VS Code 확장 프로그램 만들기: 나만의 AI 프로젝트 어시스턴트 만들기

# 1장: VS Code 확장 프로그램 개발이란

이 튜토리얼에서는 완전한 클로즈드 루프를 완성합니다: VS Code 확장 프로그램을 처음부터 만들어 당신의 AI 프로젝트 어시스턴트로 사용합니다. 원클릭 프로젝트 템플릿 생성, 선택한 파일이나 코드 조각에 대한 AI 채팅, 다중 파일 Q&A 분석, 커스텀 단축키 등의 기능을 갖추게 됩니다. 개발, 디버깅을 완료하고 VS Code 마켓플레이스에 게시하는 방법까지 배웁니다.

이 튜토리얼을 위해 최소한 다음이 필요합니다:

- Node.js 환경 (버전 18.0+)
- VS Code 편집기 (버전 1.90+)
- AI 코딩 어시스턴트 (Cursor / Trae / Claude Code)
- (선택 사항) GitHub Copilot 구독 (Language Model API용)

> **Vibe Coding 엔드투엔드**: AI 코딩 어시스턴트를 사용하여 대부분의 코드를 생성합니다. 핵심 개념과 아키텍처만 이해하고, 자연어로 요구사항을 설명하면 됩니다.

## 1.1 VS Code 확장 프로그램으로 할 수 있는 일

여러분은 이미 매일 VS Code 확장 프로그램을 사용하고 있습니다. Prettier가 코드를 포맷팅하고, GitLens가 Git 기록을 보여주며, GitHub Copilot이 코드 작성을 도와줍니다. 이러한 확장 프로그램은 본질적으로 TypeScript/JavaScript로 작성된 프로그램으로, VS Code API를 통해 편집기를 확장합니다.

VS Code 확장 프로그램은 많은 사람들이 생각하는 것보다 훨씬 더 많은 일을 할 수 있습니다:

* **새로운 UI 요소 추가**: 사이드바 패널, 상태 표시줄 정보, 커스텀 Webview 페이지
* **파일 및 코드 처리**: 파일 읽기, 수정, 생성; 코드 구조 분석
* **외부 서비스 통합**: API 호출, 데이터베이스 연결, CI/CD 통합
* **편집기 기능 확장**: 커스텀 언어 지원, 코드 완성, 진단
* **AI 기능 추가**: Chat Participant API로 AI 어시스턴트 만들기, Language Model API로 모델 호출

<!-- ![placeholder: VS Code extension ecosystem diagram showing expandable areas: sidebar, editor, status bar, command palette, Chat panel](../../../../zh-cn/stage-3/cross-platform/vscode-extension/images/image1.png) -->
![VS Code 확장 프로그램 생태계 다이어그램 - 확장 프로그램이 확장할 수 있는 영역: 사이드바, 편집기, 상태 표시줄, 명령 팔레트, 채팅 패널](/zh-cn/stage-3/cross-platform/vscode-extension/images/image1.png)

## 1.2 VS Code 확장 프로그램의 핵심 아키텍처

VS Code 확장 프로그램은 편집기 메인 프로세스와 분리된 격리된 **Extension Host** 프로세스에서 실행됩니다. 즉, 확장 프로그램이 충돌하더라도 편집기 자체는 영향을 받지 않습니다.

일반적인 확장 프로그램의 핵심 구성 요소:

* **package.json (매니페스트)**: 확장 프로그램의 "신분증", 이름, 진입 파일, 기여 지점(`commands`, `menus`, `keybindings` 등)을 선언
* **extension.ts (진입 파일)**: 확장 프로그램의 "두뇌", `activate()`와 `deactivate()`를 내보냄
* **기여 지점 (Contribution Points)**: package.json에서 확장 프로그램이 VS Code에 기여하는 것(명령, 메뉴 항목, 단축키, 뷰 등)
* **VS Code API**: 편집기 기능을 조작하기 위한 TypeScript API 세트

```text
VS Code 편집기
    │
    ├── Extension Host (확장 프로그램 프로세스)
    │   ├── 당신의 확장 프로그램
    │   │   ├── package.json  -> "내가 할 수 있는 일" 선언
    │   │   ├── extension.ts  -> "어떻게 하는지" 구현
    │   │   └── 기타 모듈 -> 구체적인 기능 코드
    │   ├── 다른 확장 프로그램 A
    │   └── 다른 확장 프로그램 B
    │
    └── 편집기 메인 프로세스 (UI 렌더링)
```

<!-- ![placeholder: VS Code extension architecture diagram showing Extension Host vs editor main process](../../../../zh-cn/stage-3/cross-platform/vscode-extension/images/image2.png) -->
![VS Code 확장 프로그램 아키텍처 다이어그램 - Extension Host 프로세스와 편집기 메인 프로세스](/zh-cn/stage-3/cross-platform/vscode-extension/images/image2.png)

## 1.3 어떤 확장 프로그램을 만들 건가요?

**"AI Project Bot"**이라는 이름의 VS Code 확장 프로그램을 만들 것입니다. 다음 기능을 갖춘 AI 프로젝트 어시스턴트입니다:

| 기능 | 설명 |
|------|------|
| 프로젝트 템플릿 | 사이드바 템플릿 목록, 원클릭 프로젝트 스캐폴드 생성 |
| AI 채팅 | VS Code 채팅에서 `@project-bot` 참여자로 프로젝트 Q&A |
| 파일/코드 조각 채팅 | 선택한 코드나 파일을 우클릭하여 AI에게 분석/설명/리팩토링 요청 |
| 다중 파일 Q&A | 탐색기에서 파일을 여러 개 선택하여 AI에게 관계와 로직 분석 요청 |
| 단축키 | 커스텀 키바인딩으로 빠르게 일반 작업 실행 |

<!-- ![placeholder: AI Project Bot preview showing sidebar templates, @project-bot chat panel, and right-click menu](../../../../zh-cn/stage-3/cross-platform/vscode-extension/images/image3.png) -->
![AI Project Bot 확장 프로그램 미리보기 - 사이드바 템플릿 목록, @project-bot 채팅 패널, 우클릭 메뉴](/zh-cn/stage-3/cross-platform/vscode-extension/images/image3.png)

## 1.4 튜토리얼 로드맵

다음 단계로 진행합니다:

1. **확장 프로그램 프로젝트 생성** (3분): 프로젝트 스캐폴드 및 핵심 파일 이해
2. **프로젝트 템플릿 구현** (5분): TreeView로 사이드바에 템플릿 표시 및 프로젝트 생성
3. **AI 채팅 참여자 구현** (5분): Chat Participant API로 `@project-bot` 만들기
4. **파일/코드 조각 채팅 및 다중 파일 Q&A 구현** (5분): 우클릭 메뉴 + 다중 선택 분석
5. **단축키 및 UX 개선 추가** (3분): 키바인딩 및 상태 표시줄 힌트
6. **마켓플레이스에 게시** (선택 사항): 패키징 및 제출

# 2장: 확장 프로그램 프로젝트 만들기 (3분)

## 2.1 스캐폴드로 프로젝트 생성

VS Code에서 공식적으로 Yeoman 스캐폴드 도구를 제공합니다. AI에게 다음을 실행해 달라고 요청하세요:

```text
VS Code 확장 프로그램 스캐폴딩 도구를 설치하고 프로젝트를 만들어 주세요:
1. Yeoman과 generator-code 설치: npm install -g yo generator-code
2. yo code를 실행하고 다음을 선택:
   - 유형: New Extension (TypeScript)
   - 이름: ai-project-bot
   - 식별자: ai-project-bot
   - 설명: AI 프로젝트 어시스턴트 - 템플릿 생성, 지능형 채팅, 다중 파일 Q&A
   - 패키지 매니저: npm
3. 프로젝트 디렉토리로 이동하여 종속성 설치
```

생성된 구조:

```text
ai-project-bot/
├── .vscode/
│   ├── launch.json          # 디버그 설정 (F5로 디버깅 시작)
│   └── tasks.json           # 빌드 작업
├── src/
│   └── extension.ts         # 확장 프로그램 진입 파일
├── package.json             # 확장 프로그램 매니페스트 (가장 중요한 파일)
├── tsconfig.json            # TypeScript 설정
└── vsc-extension-quickstart.md  # 빠른 시작 가이드 (삭제 가능)
```

## 2.2 package.json 이해: 확장 프로그램의 "신분증"

`package.json`은 VS Code 확장 프로그램의 핵심 파일입니다. 일반적인 npm 필드 외에도 `contributes`를 통해 확장 프로그램이 VS Code에 기여하는 모든 것을 선언합니다:

```json
{
  "name": "ai-project-bot",
  "displayName": "AI Project Bot",
  "description": "AI 프로젝트 어시스턴트 - 템플릿 생성, 지능형 채팅, 다중 파일 Q&A",
  "version": "0.0.1",
  "engines": { "vscode": "^1.90.0" },
  "activationEvents": [],
  "main": "./out/extension.js",
  "contributes": {
    "commands": [],
    "menus": {},
    "keybindings": [],
    "viewsContainers": {},
    "views": {},
    "chatParticipants": []
  }
}
```

**주요 필드:**

| 필드 | 용도 |
|------|------|
| `engines.vscode` | 지원하는 최소 VS Code 버전 |
| `activationEvents` | 확장 프로그램이 활성화되는 시점 (비어 있으면 온디맨드 활성화) |
| `main` | 컴파일된 진입 파일 경로 |
| `contributes` | 모든 기여 기능 (명령, 메뉴, 단축키, 뷰 등) |

<!-- ![placeholder: package.json screenshot with contributes field highlighted](../../../../zh-cn/stage-3/cross-platform/vscode-extension/images/image4.png) -->
![편집기에서 contributes 필드가 강조된 package.json 파일 스크린샷](/zh-cn/stage-3/cross-platform/vscode-extension/images/image4.png)

## 2.3 extension.ts 이해: 확장 프로그램의 "두뇌"

`src/extension.ts`를 열면 두 개의 핵심 함수가 보입니다:

```typescript
import * as vscode from 'vscode'

// 확장 프로그램이 활성화될 때 호출 (첫 번째 명령 실행, 특정 파일 열기 등)
export function activate(context: vscode.ExtensionContext) {
  console.log('AI Project Bot 활성화됨!')

  // 명령, 뷰, 채팅 참여자 등 등록
  const disposable = vscode.commands.registerCommand(
    'ai-project-bot.helloWorld',
    () => {
      vscode.window.showInformationMessage('AI Project Bot에서 인사합니다!')
    }
  )

  context.subscriptions.push(disposable)
}

// 확장 프로그램이 비활성화될 때 호출 (예: VS Code 종료 시)
export function deactivate() {}
```

**핵심 개념:**

* `activate(context)`: 확장 프로그램 초기화, 모든 기능을 여기에 등록
* `context.subscriptions`: 자동 정리 목록; VS Code가 비활성화 시 등록된 항목을 폐기
* `vscode.commands.registerCommand`: 명령 팔레트(`Ctrl+Shift+P`)에서 호출할 수 있는 명령 등록

## 2.4 디버깅 시작

**F5**를 누르면 VS Code가 새로운 **Extension Development Host** 창을 엽니다. 이것은 확장 프로그램이 로드된 새로운 VS Code 인스턴스입니다.

새 창에서 **Ctrl+Shift+P**를 누르고 "Hello World"를 입력하면 메시지 팝업이 나타납니다. 이것은 확장 프로그램이 실행 중이라는 의미입니다.

<!-- ![placeholder: VS Code extension debugging screenshot showing Extension Development Host and Hello World message](../../../../zh-cn/stage-3/cross-platform/vscode-extension/images/image5.png) -->
![VS Code 확장 프로그램 디버깅 스크린샷 - Extension Development Host 창과 Hello World 메시지](/zh-cn/stage-3/cross-platform/vscode-extension/images/image5.png)

> **디버깅 팁**: 코드 변경 후 Extension Development Host에서 **Ctrl+Shift+P** -> **Developer: Reload Window**를 눌러 확장 프로그램을 빠르게 다시 로드할 수 있습니다.

# 3장: 프로젝트 템플릿 구현 (5분)

## 3.1 템플릿 시스템 설계

VS Code 사이드바에 "프로젝트 템플릿" 패널을 추가하여 사용자가 템플릿을 탐색하고 원클릭으로 프로젝트 골격을 생성할 수 있게 합니다. VS Code **TreeView API**를 사용합니다.

AI에게 구현을 요청하세요:

```text
ai-project-bot에 프로젝트 템플릿을 구현해 주세요:

1. package.json에 기여 지점 추가:
   - viewsContainers.activitybar에 id "project-bot", 제목 "AI Project Bot"으로 새 항목 추가
   - 그 아래에 id "projectTemplates", 이름 "프로젝트 템플릿"으로 뷰 추가
   - 명령 "ai-project-bot.createFromTemplate", 제목 "템플릿으로 프로젝트 생성" 추가

2. src/templates/templateProvider.ts 생성:
   - TreeDataProvider로 템플릿 카테고리와 템플릿 구현:
     - 프론트엔드: React + TypeScript, Vue 3 + TypeScript, Next.js App
     - 백엔드: Express API, FastAPI Python
     - 풀스택: T3 Stack (Next.js + tRPC + Prisma)
   - 각 템플릿 항목에 이름, 설명, 아이콘 표시

3. src/templates/scaffolder.ts 생성:
   - createProjectFromTemplate 함수 구현
   - 사용자가 대상 폴더 선택
   - 템플릿 유형별로 프로젝트 구조 생성
```

## 3.2 package.json에 뷰 선언

먼저 `package.json`에 사이드바 뷰 기여를 추가합니다:

```json
{
  "contributes": {
    "viewsContainers": {
      "activitybar": [
        {
          "id": "project-bot",
          "title": "AI Project Bot",
          "icon": "resources/bot-icon.svg"
        }
      ]
    },
    "views": {
      "project-bot": [
        {
          "id": "projectTemplates",
          "name": "Project Templates"
        }
      ]
    },
    "commands": [
      {
        "command": "ai-project-bot.createFromTemplate",
        "title": "Create Project from Template",
        "icon": "$(add)"
      }
    ],
    "menus": {
      "view/title": [
        {
          "command": "ai-project-bot.createFromTemplate",
          "when": "view == projectTemplates",
          "group": "navigation"
        }
      ]
    }
  }
}
```

이 설정은 세 가지를 합니다:

1. 액티비티 바에 "AI Project Bot" 아이콘 항목 추가
2. 해당 항목 아래에 "Project Templates" 뷰 생성
3. 뷰 제목 표시줄에 프로젝트 생성을 위한 "+" 버튼 추가

<!-- ![placeholder: Screenshot showing AI Project Bot icon and project template list in VS Code sidebar](../../../../zh-cn/stage-3/cross-platform/vscode-extension/images/image6.png) -->
![VS Code 사이드바의 AI Project Bot 아이콘과 프로젝트 템플릿 목록 스크린샷](/zh-cn/stage-3/cross-platform/vscode-extension/images/image6.png)

## 3.3 TreeDataProvider 구현

TreeDataProvider는 VS Code가 트리 데이터를 채우는 데 사용하는 인터페이스입니다. `getTreeItem`(한 노드의 표시 정보)과 `getChildren`(자식 노드 목록)이 필요합니다.

핵심 코드:

```typescript
// src/templates/templateProvider.ts
import * as vscode from 'vscode'

interface Template {
  name: string
  description: string
  category: string
  command: string // 프로젝트 생성 명령, 예: "npx create-react-app"
}

const TEMPLATES: Template[] = [
  { name: 'React + TypeScript', description: 'React project built with Vite', category: 'Frontend', command: 'npm create vite@latest {{name}} -- --template react-ts' },
  { name: 'Vue 3 + TypeScript', description: 'Vue 3 project built with Vite', category: 'Frontend', command: 'npm create vite@latest {{name}} -- --template vue-ts' },
  { name: 'Next.js App', description: 'Next.js App Router full-stack project', category: 'Frontend', command: 'npx create-next-app@latest {{name}} --typescript --app' },
  { name: 'Express API', description: 'Express + TypeScript REST API', category: 'Backend', command: 'npx create-express-api {{name}}' },
  { name: 'FastAPI Python', description: 'Python FastAPI backend project', category: 'Backend', command: 'pip install fastapi uvicorn' },
]

// 트리 노드: 카테고리 또는 템플릿
class TemplateItem extends vscode.TreeItem {
  constructor(
    public readonly label: string,
    public readonly collapsibleState: vscode.TreeItemCollapsibleState,
    public readonly template?: Template
  ) {
    super(label, collapsibleState)
    if (template) {
      this.description = template.description
      this.tooltip = `${template.name}\n${template.description}\nCommand: ${template.command}`
      this.contextValue = 'template'
      this.command = {
        command: 'ai-project-bot.createFromTemplate',
        title: 'Create Project',
        arguments: [template]
      }
    }
  }
}

export class TemplateProvider implements vscode.TreeDataProvider<TemplateItem> {
  getTreeItem(element: TemplateItem): vscode.TreeItem {
    return element
  }

  getChildren(element?: TemplateItem): TemplateItem[] {
    if (!element) {
      // 루트: 카테고리 목록 반환
      const categories = [...new Set(TEMPLATES.map(t => t.category))]
      return categories.map(
        cat => new TemplateItem(cat, vscode.TreeItemCollapsibleState.Expanded)
      )
    }
    // 자식: 카테고리 내의 템플릿
    return TEMPLATES
      .filter(t => t.category === element.label)
      .map(t => new TemplateItem(t.name, vscode.TreeItemCollapsibleState.None, t))
  }
}
```

## 3.4 뷰 등록 및 생성 명령 만들기

`extension.ts`에 TreeView와 프로젝트 생성 명령을 등록합니다:

```typescript
// src/extension.ts
import { TemplateProvider } from './templates/templateProvider'

export function activate(context: vscode.ExtensionContext) {
  // 템플릿 뷰 등록
  const templateProvider = new TemplateProvider()
  vscode.window.registerTreeDataProvider('projectTemplates', templateProvider)

  // 프로젝트 생성 명령 등록
  const createCmd = vscode.commands.registerCommand(
    'ai-project-bot.createFromTemplate',
    async (template) => {
      if (!template) {
        // 템플릿이 전달되지 않은 경우 (명령 팔레트에서 호출), 사용자가 선택
        const pick = await vscode.window.showQuickPick(
          TEMPLATES.map(t => ({ label: t.name, description: t.description, template: t })),
          { placeHolder: 'Choose a project template' }
        )
        if (!pick) return
        template = pick.template
      }

      // 프로젝트 이름 요청
      const name = await vscode.window.showInputBox({
        prompt: 'Enter project name',
        placeHolder: 'my-awesome-project'
      })
      if (!name) return

      // 대상 폴더 요청
      const folder = await vscode.window.showOpenDialog({
        canSelectFolders: true,
        openLabel: 'Select target folder'
      })
      if (!folder) return

      // 생성 명령 실행
      const terminal = vscode.window.createTerminal('AI Project Bot')
      terminal.show()
      const cmd = template.command.replace('{{name}}', name)
      terminal.sendText(`cd "${folder[0].fsPath}" && ${cmd}`)

      vscode.window.showInformationMessage(`Creating ${template.name} project: ${name}`)
    }
  )

  context.subscriptions.push(createCmd)
}
```

이제 F5를 눌러 디버깅하세요. 액티비티 바에 AI Project Bot이 보일 것입니다. 템플릿 목록을 펼치고 아무 템플릿이나 클릭하여 프로젝트를 생성할 수 있습니다.

<!-- ![placeholder: Screenshot showing project name input and folder picker dialog after clicking a template](../../../../zh-cn/stage-3/cross-platform/vscode-extension/images/image7.png) -->
![템플릿을 클릭한 후 프로젝트 이름 입력 상자와 폴더 선택 대화상자 스크린샷](/zh-cn/stage-3/cross-platform/vscode-extension/images/image7.png)

# 4장: AI 채팅 참여자 구현 (5분)

## 4.1 Chat Participant API란?

VS Code 1.90부터 확장 프로그램은 **Chat Participant API**를 사용하여 채팅 패널에 자체 AI 어시스턴트를 만들 수 있습니다. 사용자가 `@project-bot help me analyze this project architecture`를 입력하면 확장 프로그램이 메시지를 수신하고 모델이 생성한 응답을 반환합니다.

핵심 개념:

* **Participant**: 채팅 패널에서의 어시스턴트 아이덴티티, `@name`으로 호출
* **슬래시 명령**: 참여자가 지원하는 빠른 명령, 예: `/explain`, `/refactor`
* **Language Model API**: VS Code 내장 모델 호출 (예: Copilot GPT-4o)
* **Stream**: `stream.markdown()`을 통해 점진적으로 응답 출력

## 4.2 package.json에 채팅 참여자 선언

`contributes`에 다음을 추가합니다:

```json
{
  "contributes": {
    "chatParticipants": [
      {
        "id": "ai-project-bot.projectBot",
        "name": "project-bot",
        "fullName": "AI Project Bot",
        "description": "코드 분석, 아키텍처 설명, 솔루션 생성을 위한 AI 프로젝트 어시스턴트",
        "isSticky": true
      }
    ]
  }
}
```

`isSticky: true`는 한 번 선택되면 후속 메시지가 기본적으로 이 참여자에게 전송되어 매번 `@project-bot`을 입력할 필요가 없음을 의미합니다.

## 4.3 채팅 참여자 핸들러 구현

AI에게 핵심 로직을 작성해 달라고 요청하세요:

```text
src/chat/chatParticipant.ts를 만들고 Chat Participant를 구현해 주세요:
1. 참여자 "ai-project-bot.projectBot" 등록
2. 세 가지 슬래시 명령 지원:
   - /explain: 선택한 코드 또는 현재 파일 설명
   - /refactor: 리팩토링 제안 제공
   - /template: 적합한 기술 스택 템플릿 추천
3. Language Model API를 사용하여 VS Code 내장 모델 호출
4. 스트리밍 모드(stream.markdown)로 응답 반환
```

핵심 코드:

```typescript
// src/chat/chatParticipant.ts
import * as vscode from 'vscode'

export function registerChatParticipant(context: vscode.ExtensionContext) {
  const participant = vscode.chat.createChatParticipant(
    'ai-project-bot.projectBot',
    async (request, chatContext, stream, token) => {
      // 사용 가능한 모델 선택
      const models = await vscode.lm.selectChatModels({ family: 'gpt-4o' })
      const model = models[0]

      if (!model) {
        stream.markdown('사용 가능한 언어 모델이 없습니다. GitHub Copilot이 설치되어 있는지 확인해 주세요.')
        return
      }

      // 슬래시 명령에 따라 시스템 프롬프트 구성
      let systemPrompt = '당신은 전문적인 프로젝트 개발 어시스턴트입니다.'

      if (request.command === 'explain') {
        systemPrompt = '당신은 코드 설명 전문가입니다. 사용자 코드를 간결한 한국어로 설명해 주세요. 목적, 로직 흐름, 핵심 설계 결정을 포함하세요.'
      } else if (request.command === 'refactor') {
        systemPrompt = '당신은 코드 리팩토링 전문가입니다. 사용자 코드를 분석하고 개선된 코드 예제와 함께 구체적인 리팩토링 제안을 제공하세요.'
      } else if (request.command === 'template') {
        systemPrompt = '당신은 기술 스택 선택 전문가입니다. 사용자 요구에 맞는 기술 스택과 프로젝트 템플릿을 추천해 주세요.'
      }

      // 메시지 구성
      const messages = [
        vscode.LanguageModelChatMessage.User(systemPrompt),
        vscode.LanguageModelChatMessage.User(request.prompt)
      ]

      // 스트림 출력
      const response = await model.sendRequest(messages, {}, token)
      for await (const chunk of response.stream) {
        stream.markdown(chunk)
      }

      return { metadata: { command: request.command || '' } }
    }
  )

  // 슬래시 명령 등록
  participant.slashCommandProvider = {
    provideSlashCommands: () => [
      { name: 'explain', description: '코드 기능과 로직 설명' },
      { name: 'refactor', description: '리팩토링 제안 및 개선 사항 제공' },
      { name: 'template', description: '적합한 프로젝트 템플릿과 기술 스택 추천' }
    ]
  }

  // 후속 제안 등록
  participant.followupProvider = {
    provideFollowups: (result) => {
      if (result.metadata?.command === 'explain') {
        return [
          { prompt: '플로우차트를 그려줄 수 있나요?', label: '플로우차트 생성' },
          { prompt: '잠재적인 버그가 있나요?', label: '잠재적 문제 확인' }
        ]
      }
      return []
    }
  }

  context.subscriptions.push(participant)
}
```

`extension.ts`에서 등록을 호출합니다:

```typescript
import { registerChatParticipant } from './chat/chatParticipant'

export function activate(context: vscode.ExtensionContext) {
  // ... 이전 템플릿 등록 코드 ...
  registerChatParticipant(context)
}
```

이제 채팅 패널에 `@project-bot /explain 이 코드는 무엇을 하나요?`를 입력하면 확장 프로그램이 모델을 호출하고 설명을 생성합니다.

<!-- ![placeholder: VS Code Chat screenshot showing @project-bot, /explain command, and streaming response](../../../../zh-cn/stage-3/cross-platform/vscode-extension/images/image8.png) -->
![VS Code 채팅 패널에서 @project-bot, /explain 명령, 스트리밍 응답 스크린샷](/zh-cn/stage-3/cross-platform/vscode-extension/images/image8.png)

# 5장: 파일/코드 조각 채팅 및 다중 파일 Q&A (5분)

## 5.1 우클릭 메뉴: 선택한 코드를 AI에게 보내기

사용자가 편집기에서 코드를 선택하고 컨텍스트 메뉴에서 AI에게 보낼 수 있게 합니다. VS Code **컨텍스트 메뉴** 기여 지점을 사용합니다.

`package.json`에 추가:

```json
{
  "contributes": {
    "commands": [
      {
        "command": "ai-project-bot.explainSelection",
        "title": "AI: Explain Selected Code"
      },
      {
        "command": "ai-project-bot.refactorSelection",
        "title": "AI: Refactor Selected Code"
      }
    ],
    "menus": {
      "editor/context": [
        {
          "command": "ai-project-bot.explainSelection",
          "when": "editorHasSelection",
          "group": "ai-project-bot@1"
        },
        {
          "command": "ai-project-bot.refactorSelection",
          "when": "editorHasSelection",
          "group": "ai-project-bot@2"
        }
      ]
    }
  }
}
```

**주요 설정 참고:**

* `when: "editorHasSelection"`: 텍스트가 선택되었을 때만 메뉴 표시
* `group: "ai-project-bot@1"`: 메뉴 그룹화 및 순서 (`@1`, `@2`)

## 5.2 선택한 코드 분석 구현

```typescript
// src/commands/selectionCommands.ts
import * as vscode from 'vscode'

export function registerSelectionCommands(context: vscode.ExtensionContext) {
  // 선택한 코드 설명
  const explainCmd = vscode.commands.registerCommand(
    'ai-project-bot.explainSelection',
    async () => {
      const editor = vscode.window.activeTextEditor
      if (!editor) return

      const selection = editor.selection
      const selectedText = editor.document.getText(selection)
      const fileName = editor.document.fileName.split('/').pop()
      const startLine = selection.start.line + 1
      const endLine = selection.end.line + 1

      // 컨텍스트가 포함된 프롬프트 구성
      const prompt = [
        `다음 코드를 설명해 주세요 (${fileName}에서, ${startLine}-${endLine}행):`,
        '```',
        selectedText,
        '```',
        '다음을 설명해 주세요: 1) 이 코드가 하는 일 2) 핵심 로직 3) 가능한 개선 사항'
      ].join('\n')

      // Language Model API 호출
      const models = await vscode.lm.selectChatModels({ family: 'gpt-4o' })
      if (!models.length) {
        vscode.window.showErrorMessage('사용 가능한 언어 모델이 없습니다')
        return
      }

      // 출력 패널에 결과 표시
      const outputChannel = vscode.window.createOutputChannel('AI Project Bot')
      outputChannel.show()
      outputChannel.appendLine(`\n--- 코드 설명 (${fileName}:${startLine}-${endLine}) ---\n`)

      const messages = [
        vscode.LanguageModelChatMessage.User(prompt)
      ]
      const response = await models[0].sendRequest(messages, {})
      for await (const chunk of response.stream) {
        outputChannel.append(chunk)
      }
    }
  )

  context.subscriptions.push(explainCmd)
}
```

<!-- ![placeholder: Screenshot of editor context menu showing AI items after selecting code](../../../../zh-cn/stage-3/cross-platform/vscode-extension/images/image9.png) -->
![코드를 선택한 후 AI 항목이 표시된 편집기 컨텍스트 메뉴 스크린샷](/zh-cn/stage-3/cross-platform/vscode-extension/images/image9.png)

## 5.3 다중 파일 Q&A: 파일 관계 일괄 분석

이것은 가장 강력한 기능 중 하나입니다: 탐색기에서 파일을 여러 개 선택하고 AI에게 한 번에 관계와 로직을 분석하게 합니다.

`package.json`에 탐색기 컨텍스트 메뉴를 추가합니다:

```json
{
  "contributes": {
    "commands": [
      {
        "command": "ai-project-bot.analyzeFiles",
        "title": "AI: Analyze Relationships of Selected Files"
      }
    ],
    "menus": {
      "explorer/context": [
        {
          "command": "ai-project-bot.analyzeFiles",
          "when": "explorerResourceIsFile",
          "group": "ai-project-bot"
        }
      ]
    }
  }
}
```

다중 파일 분석 명령 구현:

```typescript
// src/commands/multiFileAnalysis.ts
import * as vscode from 'vscode'

export function registerMultiFileCommands(context: vscode.ExtensionContext) {
  const analyzeCmd = vscode.commands.registerCommand(
    'ai-project-bot.analyzeFiles',
    async (clickedFile: vscode.Uri, selectedFiles: vscode.Uri[]) => {
      // selectedFiles에 선택된 모든 파일이 포함됨
      const files = selectedFiles || [clickedFile]

      if (files.length < 2) {
        vscode.window.showWarningMessage('분석을 위해 최소 2개의 파일을 선택해 주세요')
        return
      }

      // 선택된 모든 파일 읽기
      const fileContents: string[] = []
      for (const file of files) {
        const content = await vscode.workspace.fs.readFile(file)
        const fileName = vscode.workspace.asRelativePath(file)
        fileContents.push(
          `--- ${fileName} ---\n${Buffer.from(content).toString('utf8')}`
        )
      }

      const prompt = [
        `이 ${files.length}개 파일 간의 관계를 분석해 주세요:`,
        '',
        ...fileContents,
        '',
        '다음을 설명해 주세요:',
        '1. 각 파일의 역할',
        '2. 파일 간의 의존성/호출 관계',
        '3. 데이터 흐름 (있는 경우)',
        '4. 아키텍처 제안 또는 잠재적 문제'
      ].join('\n')

      // 모델 호출 및 결과 표시
      const models = await vscode.lm.selectChatModels({ family: 'gpt-4o' })
      if (!models.length) {
        vscode.window.showErrorMessage('사용 가능한 언어 모델이 없습니다')
        return
      }

      const outputChannel = vscode.window.createOutputChannel('AI Project Bot')
      outputChannel.show()
      outputChannel.appendLine(`\n--- 다중 파일 분석 (${files.length}개 파일) ---\n`)

      const messages = [
        vscode.LanguageModelChatMessage.User(prompt)
      ]
      const response = await models[0].sendRequest(messages, {})
      for await (const chunk of response.stream) {
        outputChannel.append(chunk)
      }
    }
  )

  context.subscriptions.push(analyzeCmd)
}
```

사용 방법: 탐색기에서 `Ctrl` (Mac에서는 `Cmd`) 키를 누른 채로 파일을 여러 개 선택하고, 우클릭하여 "AI: Analyze Relationships of Selected Files"를 선택합니다. AI가 선택된 모든 파일을 읽고 분석 결과를 반환합니다.

<!-- ![placeholder: Screenshot of explorer with multi-selected files and AI analysis context menu item](../../../../zh-stag-3/cross-platform/vscode-extension/images/image10.png) -->
![여러 파일이 선택된 탐색기와 컨텍스트 메뉴의 AI 분석 항목 스크린샷](/zh-cn/stage-3/cross-platform/vscode-extension/images/image10.png)

# 6장: 단축키 및 UX 최적화 (3분)

## 6.1 커스텀 키바인딩

단축키는 효율성의 핵심입니다. `package.json`에 추가:

```json
{
  "contributes": {
    "keybindings": [
      {
        "command": "ai-project-bot.explainSelection",
        "key": "ctrl+shift+e",
        "mac": "cmd+shift+e",
        "when": "editorTextFocus && editorHasSelection"
      },
      {
        "command": "ai-project-bot.refactorSelection",
        "key": "ctrl+shift+r",
        "mac": "cmd+shift+r",
        "when": "editorTextFocus && editorHasSelection"
      },
      {
        "command": "ai-project-bot.createFromTemplate",
        "key": "ctrl+shift+n",
        "mac": "cmd+shift+n",
        "when": ""
      }
    ]
  }
}
```

**`when` 조건:**

| 조건 | 의미 |
|------|------|
| `editorTextFocus` | 커서가 편집기에 있음 |
| `editorHasSelection` | 텍스트가 선택됨 |
| `explorerViewletVisible` | 탐색기 패널이 보임 |
| `!editorReadonly` | 파일이 읽기 전용이 아님 |

`&&`로 연결된 여러 조건은 모두 충족되어야 함을 의미합니다.

## 6.2 상태 표시줄 힌트

빠른 상태 표시줄 항목을 추가하여 사용자가 항상 확장 프로그램이 실행 중임을 알 수 있게 합니다:

```typescript
// src/statusBar.ts
import * as vscode from 'vscode'

export function createStatusBarItem(context: vscode.ExtensionContext) {
  const statusBar = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Right,
    100
  )
  statusBar.text = '$(hubot) AI Bot'
  statusBar.tooltip = '클릭하여 AI Project Bot 열기'
  statusBar.command = 'ai-project-bot.createFromTemplate'
  statusBar.show()

  context.subscriptions.push(statusBar)
}
```

`$(hubot)`은 VS Code 내장 아이콘 구문입니다. [Codicon 라이브러리](https://microsoft.github.io/vscode-codicons/dist/codicon.html)에서 모든 아이콘을 찾을 수 있습니다.

<!-- ![placeholder: Screenshot of AI Bot icon displayed in VS Code status bar](../../../../zh-cn/stage-3/cross-platform/vscode-extension/images/image11.png) -->
![VS Code 상태 표시줄에 표시된 AI Bot 아이콘 스크린샷](/zh-cn/stage-3/cross-platform/vscode-extension/images/image11.png)

# 7장: 마켓플레이스에 게시 (선택 사항)

## 7.1 게시 준비

VS Code 확장 프로그램은 **vsce**로 패키징 및 게시합니다:

```text
vsce를 설치해 주세요: npm install -g @vscode/vsce
```

게시 전에 준비하세요:

1. **Azure DevOps 계정**: [dev.azure.com](https://dev.azure.com/)에서 등록 및 조직 생성
2. **Personal Access Token (PAT)**: Azure DevOps에서 **Marketplace -> Manage** 권한으로 생성
3. **Publisher ID**: [VS Code Marketplace](https://marketplace.visualstudio.com/manage)에서 퍼블리셔 아이덴티티 생성

## 7.2 package.json 메타데이터 보완

게시 전에 메타데이터를 추가합니다:

```json
{
  "publisher": "your-publisher-id",
  "repository": {
    "type": "git",
    "url": "https://github.com/yourname/ai-project-bot"
  },
  "categories": ["AI", "Other"],
  "keywords": ["ai", "project", "template", "chat"],
  "icon": "resources/icon.png",
  "galleryBanner": {
    "color": "#1e1e2e",
    "theme": "dark"
  }
}
```

마켓플레이스 설명용 `README.md`와 버전 기록용 `CHANGELOG.md`도 필요합니다.

## 7.3 패키징 및 게시

```bash
# .vsix로 패키징 (수동 설치 파일)
vsce package

# 마켓플레이스에 게시
vsce publish
```

패키징 후 `ai-project-bot-0.0.1.vsix` 파일이 생성됩니다. 이 파일을 친구에게 보내면 VS Code의 "Install from VSIX"로 설치할 수 있습니다.

공식 마켓플레이스에 게시하려면 `vsce publish`를 실행하세요. 보통 몇 분 내에 확장 프로그램이 나타납니다.

<!-- ![placeholder: Screenshot of AI Project Bot extension page in VS Code Marketplace](../../../../zh-cn/stage-3/cross-platform/vscode-extension/images/image12.png) -->

> **팁**: 첫 번째 릴리스는 검토가 필요할 수 있습니다. 승인 속도를 높이려면 README를 명확하게 작성하고 스크린샷을 완전히 포함하세요.

# 8장: 마무리

축하합니다! 처음부터 완전히 작동하는 VS Code 확장 프로그램을 만들었습니다. 회고:

1. Yeoman 스캐폴드로 확장 프로그램 프로젝트를 생성하고 `package.json`과 `extension.ts`의 역할을 이해했습니다
2. TreeView API로 사이드바 프로젝트 템플릿 목록과 원클릭 프로젝트 생성을 구현했습니다
3. Chat Participant API로 `@project-bot` AI 어시스턴트를 만들고, 슬래시 명령과 스트리밍 응답을 포함했습니다
4. 우클릭 코드 선택 분석을 구현했습니다
5. 다중 파일 관계 분석을 구현했습니다
6. 커스텀 단축키와 상태 표시줄 힌트를 추가했습니다

VS Code 확장 프로그램 개발의 상상력은 무한합니다. 여러분이 매일 사용하는 유용한 확장 프로그램 뒤에 있는 기술이 바로 방금 배운 것입니다.

**고급 방향:**

* **커스텀 Webview 패널**: HTML/CSS/JS로 완전히 커스텀된 UI 구축, 예: 시각적 아키텍처 그래프, 인터랙티브 코드 리뷰 인터페이스
* **Language Model Tools**: AI가 호출할 수 있는 커스텀 도구 등록, 예: 데이터베이스 쿼리 또는 API 요청 실행
* **진단 및 CodeLens**: AI 제안, 성능 힌트, 보안 경고를 인라인으로 표시
* **커스텀 언어 지원**: DSL이나 특정 설정 형식에 대한 구문 강조, 완성, 진단 제공
* **원격 개발 통합**: SSH, 컨테이너, WSL에서 확장 프로그램이 작동하도록 만들기

***당신의 편집기, 당신의 규칙.***

# 참고 자료

* [VS Code Extension API 문서](https://code.visualstudio.com/api)
* [Chat Participant API 가이드](https://code.visualstudio.com/api/extension-guides/chat)
* [Language Model API 가이드](https://code.visualstudio.com/api/extension-guides/language-model)
* [TreeView API 가이드](https://code.visualstudio.com/api/extension-guides/tree-view)
* [Webview API 가이드](https://code.visualstudio.com/api/extension-guides/webview)
* [VS Code 확장 프로그램 게시 가이드](https://code.visualstudio.com/api/working-with-extensions/publishing-extension)
* [Codicon 아이콘 라이브러리](https://microsoft.github.io/vscode-codicons/dist/codicon.html)
