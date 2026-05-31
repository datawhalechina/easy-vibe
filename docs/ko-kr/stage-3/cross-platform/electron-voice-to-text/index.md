# 크로스 플랫폼 Electron 데스크톱 앱 만들기: 음성 텍스트 변환 애플리케이션

# 1장: Electron과 데스크톱 앱 개발이란

이 튜토리얼에서는 하나의 완전한 사이클을 완성할 것입니다: Electron으로 음성 텍스트 변환 데스크톱 앱을 처음부터 구축하고, 클라우드 API와 로컬 모델 인식 모드를 모두 지원하며, 마지막으로 Windows, macOS, Linux에서 설치하고 실행할 수 있는 실제 데스크톱 애플리케이션으로 패키징합니다.

이 튜토리얼을 위해 최소한 다음이 필요합니다:

- 컴퓨터(Windows 또는 Mac, Apple Silicon에서 로컬 모델이 매우 빠르게 실행되므로 Mac 권장)
- Node.js 환경(버전 18.0 이상)
- AI 코딩 어시스턴트(Cursor / Trae / Claude Code)
- (선택 사항) OpenAI API Key(클라우드 모드를 사용하는 경우)
- 마이크(노트북 내장 마이크 가능)

## 1.1 Electron이란?

매일 사용하는 **VS Code, Slack, Discord, Notion** 같은 앱의 공통점이 있습니다: 모두 **Electron**으로 구축된 데스크톱 애플리케이션입니다.

Electron은 **HTML + CSS + JavaScript**(웹 페이지에 사용되는 동일한 스택)를 사용하여 **Windows, macOS, Linux**에서 실행되는 데스크톱 앱을 구축할 수 있게 해주는 오픈소스 프레임워크입니다. 원리는 간단합니다: Chromium과 Node.js를 함께 패키징하면, 웹 페이지가 독립적인 데스크톱 앱이 됩니다.

**한 문장 이해**: Electron = "보이지 않는 Chrome 브라우저" + Node.js 시스템 기능.

<!-- ![placeholder: A diagram showing the Electron architecture: Chromium (for UI rendering) + Node.js (for system access) = desktop application](../../../../zh-cn/stage-3/cross-platform/electron-voice-to-text/images/image1.png) -->

## 1.2 Electron 핵심 아키텍처

Electron 앱은 두 가지 프로세스 유형으로 구성됩니다. 이해하는 것이 개발의 핵심입니다:

**메인 프로세스**

* 앱의 "총괄 관리자"
* 창 생성, 앱 수명 주기 관리, 파일 시스템과 같은 네이티브 기능 접근을 담당
* Node.js 환경에서 실행되며 모든 Node.js 모듈을 사용할 수 있음
* 앱당 메인 프로세스는 하나뿐

**렌더러 프로세스**

* 앱의 "얼굴"
* 본질적으로 UI 렌더링을 담당하는 Chromium 웹 페이지
* 각 창은 하나의 렌더러 프로세스에 대응
* 보안상의 이유로 렌더러 프로세스는 Node.js API에 직접 접근할 수 없음

**프리로드 스크립트**

* 메인 프로세스와 렌더러 프로세스 사이의 "다리"
* `contextBridge`를 사용하여 선택된 API를 렌더러 프로세스에 안전하게 노출

이들은 **IPC(프로세스 간 통신)**를 통해 소통하며, 전화를 거는 것과 같습니다: 렌더러가 "녹음 시작하고 싶어"라고 말하면, 메인 프로세스가 그 요청을 받아 시스템 마이크를 호출합니다.

<!-- ![placeholder: An Electron process architecture diagram showing Main Process, Renderer Process, and Preload Script, plus IPC communication between them](../../../../zh-cn/stage-3/cross-platform/electron-voice-to-text/images/image2.png) -->

## 1.3 무엇을 만들 것인가?

이 튜토리얼에서는 **음성 텍스트 변환** 데스크톱 앱을 구축합니다. 기능은 간단합니다:

1. "녹음 시작" 버튼을 클릭하면 앱이 마이크를 듣기 시작
2. 말한 후 "정지"를 클릭하면 앱이 오디오를 AI로 보내 인식
3. 인식된 텍스트가 UI에 표시되며 원클릭으로 복사 가능

**두 가지 인식 모드를 사용할 수 있습니다:**

| 비교 항목 | 클라우드 API 모드 | 로컬 모델 모드 |
|---------|-------------|------------|
| 대표 솔루션 | OpenAI Whisper API | whisper.cpp |
| 인터넷 필요 | 예 | 아니오 |
| 인식 속도 | 네트워크에 따라 다름 | 하드웨어에 따라 다름(Apple Silicon에서 매우 빠름) |
| 한국어 인식 품질 | 우수 | 우수(large-v3 모델) |
| 비용 | 분당 $0.006 | 무료 |
| 모델 크기 | 다운로드 불필요 | tiny 모델 75MB, large 모델 3GB |
| 적합한 경우 | 빠른 온보딩, 가벼운 사용 | 프라이버시 중시, 오프라인 사용, 장기 고빈도 사용 |

<!-- ![placeholder: An app preview showing the speech-to-text UI: recording button and waveform animation at top, recognized text below, and a mode toggle in the top-right corner](../../../../zh-cn/stage-3/cross-platform/electron-voice-to-text/images/image3.png) -->

## 1.4 중요 참고: Web Speech API는 Electron에서 사용할 수 없음

"Electron 음성 인식"을 검색해 본 적이 있다면, 브라우저 내장 `Web Speech API`를 사용하라는 추천을 보았을 것입니다. **주의: 이것은 Electron에서 작동하지 않습니다.**

Google은 Chrome/Edge가 아닌 브라우저 셸에 대한 음성 API 지원을 중단했습니다. Electron은 Chromium 기반이지만 Chrome 자체가 아니므로, `window.SpeechRecognition`이 직접 실패합니다.

그렇기 때문에 OpenAI Whisper API나 whisper.cpp와 같은 독립적인 솔루션이 필요합니다.

## 1.5 튜토리얼 로드맵

다음 단계로 전체 흐름을 완성할 것입니다:

1. **Electron 프로젝트 생성**: Electron Forge를 사용하여 프로젝트를 스캐폴드하고 프로세스 간 통신 이해
2. **녹음 구현**: 렌더러 프로세스에서 마이크 입력을 캡처하고 오디오 데이터 처리
3. **클라우드 인식(옵션 A)**: OpenAI Whisper API를 사용한 음성 텍스트 변환
4. **로컬 인식(옵션 B)**: 인터넷 없이 whisper.cpp를 로컬에서 사용
5. **패키징 및 배포**: 앱을 설치 가능한 데스크톱 프로그램으로 패키징

# 2장: Electron 프로젝트 생성

## 2.1 AI로 프로젝트 초기화

AI 코딩 어시스턴트를 열고 다음 프롬프트를 입력합니다:

```
Electron Forge를 사용하여 Vite 템플릿으로 새 Electron 프로젝트를 만들어 줘.
프로젝트 이름은 voice-to-text야.
실행해 줘: npx create-electron-app voice-to-text --template=vite
생성 후 프로젝트 디렉토리로 들어가서 종속성을 설치해 줘.
```

Electron Forge는 Electron 공식 추천 스캐폴딩 도구입니다. 프로젝트 초기화, 패키징, 배포 등 번거로운 설정 작업을 도와줍니다.

생성 후 프로젝트 구조는 대략 다음과 같습니다:

```text
voice-to-text/
├── src/
│   ├── main.js            # 메인 프로세스 진입점
│   ├── preload.js         # 프리로드 스크립트(다리)
│   ├── renderer.js        # 렌더러 프로세스 진입점
│   └── index.html         # 앱 HTML 페이지
├── forge.config.js        # Electron Forge 설정
├── vite.main.config.mjs   # 메인 프로세스 Vite 설정
├── vite.preload.config.mjs # 프리로드 스크립트 Vite 설정
├── vite.renderer.config.mjs # 렌더러 프로세스 Vite 설정
└── package.json
```

## 2.2 시작 및 미리보기

AI에게 개발 서버를 시작하라고 요청합니다:

```
npm start를 실행하여 Electron 개발 서버를 시작해 줘
```

몇 초 후 데스크톱 창이 나타납니다. 이것이 Electron 앱입니다. 지금은 기본 환영 페이지만 보이지만, 이미 실제 데스크톱 프로그램입니다.

<!-- ![placeholder: Screenshot of first Electron app startup with the default welcome page](../../../../zh-cn/stage-3/cross-platform/electron-voice-to-text/images/image4.png) -->

## 2.3 IPC(프로세스 간 통신) 이해

음성 기능을 구현하기 전에 Electron의 가장 중요한 개념인 **IPC(프로세스 간 통신)**를 이해해야 합니다.

렌더러 프로세스(UI)와 메인 프로세스(시스템 기능)가 격리되어 있으므로, IPC "전화"를 사용하여 협력해야 합니다:

```text
렌더러 프로세스(UI)                 메인 프로세스(시스템)
    │                                │
    │── "녹음 시작하고 싶어" ──────────→   │
    │                                │── 마이크 호출
    │                                │── 오디오 처리
    │   ←──── "결과는 여기 있어" ─────────────│
    │                                │
    │── UI에 텍스트 표시               │
```

코드에서 이 통신은 `preload.js`를 통해 연결됩니다:

```javascript
// preload.js - 렌더러 프로세스에 API를 안전하게 노출
const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  // 렌더러 -> 메인
  sendAudio: (audioData) => ipcRenderer.invoke('transcribe-audio', audioData),
  // 메인 -> 렌더러
  onResult: (callback) => ipcRenderer.on('transcription-result', callback)
})
```

```javascript
// main.js - 메인 프로세스가 메시지를 수신
const { ipcMain } = require('electron')

ipcMain.handle('transcribe-audio', async (event, audioData) => {
  // 여기서 Whisper API 또는 whisper.cpp 호출
  const text = await transcribe(audioData)
  return text
})
```

<!-- ![placeholder: IPC flow diagram showing message transfer from Renderer -> Preload -> Main](../../../../zh-cn/stage-3/cross-platform/electron-voice-to-text/images/image5.png) -->

# 3장: 녹음 구현

## 3.1 렌더러 프로세스에서 마이크 입력 캡처

브라우저(Electron 렌더러 프로세스)는 `navigator.mediaDevices.getUserMedia`를 제공하여 마이크에 접근합니다. AI에게 녹음 구현을 요청합니다:

```
src/index.html과 src/renderer.js를 수정하여 다음을 구현해 줘:

UI:
1. 큰 원형 "녹음 시작" 버튼, 클릭하면 빨간색 "녹음 정지" 버튼으로 변경
2. 녹음 중 간단한 펄스 애니메이션 표시
3. 하단에 인식 결과를 위한 텍스트 표시 영역
4. 하단에 "텍스트 복사"와 "지우기" 두 버튼
5. 오른쪽 상단에 인식 모드 전환(클라우드/로컬) 설정 아이콘

녹음 논리(renderer.js):
1. 버튼 클릭 시 navigator.mediaDevices.getUserMedia로 마이크 접근 요청
2. MediaRecorder를 사용하여 webm 형식으로 오디오 녹음
3. 정지 후 오디오 Blob을 ArrayBuffer로 변환
4. window.electronAPI.sendAudio를 통해 메인 프로세스로 전송
5. 메인 프로세스의 인식 결과를 기다리고 표시
```

핵심 녹음 코드:

```javascript
// renderer.js
let mediaRecorder = null
let audioChunks = []

async function startRecording() {
  const stream = await navigator.mediaDevices.getUserMedia({
    audio: {
      channelCount: 1,
      sampleRate: 16000,
      echoCancellation: true,
      noiseSuppression: true
    }
  })

  mediaRecorder = new MediaRecorder(stream, {
    mimeType: 'audio/webm;codecs=opus'
  })

  audioChunks = []
  mediaRecorder.ondataavailable = (e) => audioChunks.push(e.data)

  mediaRecorder.onstop = async () => {
    const audioBlob = new Blob(audioChunks, { type: 'audio/webm' })
    const arrayBuffer = await audioBlob.arrayBuffer()

    // 메인 프로세스에 변환 요청
    const result = await window.electronAPI.sendAudio(arrayBuffer)
    document.getElementById('result').textContent = result
  }

  mediaRecorder.start()
}
```

<!-- ![placeholder: Screenshot of recording UI with red recording state button and pulse animation, plus text result area below](../../../../zh-cn/stage-3/cross-platform/electron-voice-to-text/images/image6.png) -->

## 3.2 마이크 권한 처리

Electron은 기본적으로 권한 요청을 차단합니다. 메인 프로세스에서 마이크 접근을 명시적으로 허용해야 합니다:

```
main.js에 마이크 권한 처리를 추가해 줘:
1. session.defaultSession.setPermissionRequestHandler를 사용하여 권한 요청 처리
2. 요청 유형이 'media'이면 자동 허용
3. macOS의 경우 package.json 또는 entitlements에 마이크 사용 설명이 선언되어 있는지 확인
```

```javascript
// main.js에 추가
const { session } = require('electron')

session.defaultSession.setPermissionRequestHandler(
  (webContents, permission, callback) => {
    if (permission === 'media') {
      callback(true)
    } else {
      callback(false)
    }
  }
)
```

> **macOS 사용자 참고**: macOS가 시스템 수준의 마이크 권한 대화 상자를 표시합니다. 이는 정상적인 동작입니다. "허용"을 클릭하세요.

# 4장: 옵션 A - 클라우드 인식(OpenAI Whisper API)

가장 간단한 옵션입니다. API 키와 몇 줄의 코드만 필요합니다.

## 4.1 OpenAI API Key 받기

1. [OpenAI Platform](https://platform.openai.com/)을 방문하여 가입하고 로그인
2. API Keys 페이지로 이동하여 **"Create new secret key"** 클릭
3. 생성된 키(`sk-`로 시작)를 복사하여 안전하게 보관

> **비용 참고**: Whisper API는 **분당 $0.006**입니다. 즉, 1시간 분량의 오디오를 인식하는 데 단 $0.36이 들며, 매우 저렴합니다.

## 4.2 메인 프로세스에서 Whisper API 호출

AI에게 메인 프로세스에서 음성 인식을 구현하라고 요청합니다:

```
main.js에 OpenAI Whisper API를 구현해 줘:
1. node-fetch 설치(필요한 경우) 또는 Node.js 내장 fetch 사용
2. 오디오 ArrayBuffer를 받는 transcribeWithWhisper 함수 생성
3. ArrayBuffer를 Blob/File로 변환하고 FormData 구성
4. https://api.openai.com/v1/audio/transcriptions 호출
5. 모델 whisper-1 사용 및 언어를 ko(한국어)로 설정
6. 인식된 텍스트 반환
7. 환경 변수 또는 설정 파일에서 API Key 읽기
```

핵심 코드:

```javascript
// main.js
async function transcribeWithWhisper(audioBuffer, apiKey) {
  const blob = new Blob([audioBuffer], { type: 'audio/webm' })
  const formData = new FormData()
  formData.append('file', blob, 'audio.webm')
  formData.append('model', 'whisper-1')
  formData.append('language', 'ko')

  const response = await fetch(
    'https://api.openai.com/v1/audio/transcriptions',
    {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}` },
      body: formData
    }
  )

  const data = await response.json()
  return data.text
}
```

<!-- ![placeholder: Running app screenshot showing recognized Chinese speech returned by Whisper API](../../../../zh-cn/stage-3/cross-platform/electron-voice-to-text/images/image7.png) -->

## 4.3 설정 UI 추가

AI에게 렌더러 프로세스에 API Key를 입력하고 인식 모드를 전환하는 간단한 설정 패널을 추가하라고 요청합니다:

```
index.html에 설정 패널을 추가해 줘:
1. 오른쪽 상단에 톱니바퀴 아이콘 추가; 클릭하면 설정 패널 확장
2. 패널에 포함:
   - 인식 모드 전환(클라우드 API / 로컬 모델)
   - API Key 입력(클라우드 모드에서만 표시)
   - 언어 드롭다운(한국어 / 영어 / 자동 감지)
3. 설정을 localStorage에 저장
4. 바깥을 클릭하면 패널 닫기
```

<!-- ![placeholder: Screenshot of expanded settings panel showing mode switch and API key input](../../../../zh-cn/stage-3/cross-platform/electron-voice-to-text/images/image8.png) -->

# 5장: 옵션 B - 로컬 인식(whisper.cpp)

클라우드 API에 의존하고 싶지 않거나, 오프라인 사용이 필요한 경우 whisper.cpp가 최적의 선택입니다. OpenAI Whisper 모델의 C++ 포트이며, 인터넷 없이 완전히 로컬에서 실행됩니다.

## 5.1 whisper.cpp Node.js 바인딩 설치

AI에게 설치와 설정을 요청합니다:

```
프로젝트에 nodejs-whisper를 설치해 줘:
npm install nodejs-whisper

설치 후, whisper tiny 모델을 다운로드해 줘(작은 크기, 테스트용으로 빠름).
nodejs-whisper가 모델 다운로드를 자동으로 처리할 거야.
```

> **모델 선택 가이드**:
> * `tiny` (75MB): 가장 빠름, 테스트 및 가벼운 사용에 적합, 평균 정확도
> * `base` (142MB): 속도와 정확도의 균형
> * `small` (466MB): 한국어 인식 품질이 확실히 향상됨
> * `large-v3-turbo` (1.5GB): 추천; large보다 5-8배 빠르며 정확도는 1-2% 낮음
> * `large-v3` (3GB): 최고 정확도이지만 느리고 더 좋은 하드웨어가 필요함

## 5.2 메인 프로세스에 whisper.cpp 통합

AI에게 로컬 인식을 구현하라고 요청합니다:

```
main.js에 whisper.cpp 로컬 인식을 추가해 줘:
1. nodejs-whisper 가져오기
2. transcribeWithLocal 함수 생성
3. 오디오 ArrayBuffer를 받아 먼저 임시 WAV 파일(16kHz 모노)로 저장
4. nodejs-whisper를 호출하여 인식
5. 인식된 텍스트 반환
6. 인식 후 임시 파일 삭제
```

핵심 코드:

```javascript
// main.js
const { nodewhisper } = require('nodejs-whisper')
const path = require('path')
const fs = require('fs')
const os = require('os')

async function transcribeWithLocal(audioBuffer) {
  // 임시 파일로 저장
  const tempPath = path.join(os.tmpdir(), `recording-${Date.now()}.wav`)
  fs.writeFileSync(tempPath, Buffer.from(audioBuffer))

  try {
    const result = await nodewhisper(tempPath, {
      modelName: 'base',
      autoDownloadModelName: 'base',
      whisperOptions: {
        language: 'ko',
        word_timestamps: true
      }
    })
    return result.map(r => r.speech).join('')
  } finally {
    // 임시 파일 정리
    fs.unlinkSync(tempPath)
  }
}
```

<!-- ![placeholder: Screenshot of local model recognition working offline with Chinese speech input](../../../../zh-cn/stage-3/cross-platform/electron-voice-to-text/images/image9.png) -->

## 5.3 Apple Silicon 사용자에게 좋은 소식

M1/M2/M3/M4 Mac을 사용 중이라면, whisper.cpp가 자동으로 **Metal GPU 가속**과 **Apple Neural Engine**을 사용합니다. 인식이 **실시간보다 빠르게** 실행될 수 있으며, 이는 1분 분량의 오디오를 처리하는 데 단 몇 초만 걸릴 수 있다는 것을 의미합니다.

NVIDIA GPU 사용자의 경우, whisper.cpp도 **CUDA 가속**을 지원하여 강력한 성능을 제공합니다.

# 6장: 패키징 및 배포

개발이 완료된 후, 앱을 배포 가능한 설치 프로그램으로 패키징해야 합니다.

## 6.1 Electron Forge로 패키징

Electron Forge는 이미 프로젝트에 포함되어 있으므로 패키징이 간단합니다:

```
Electron Forge 패키징 명령을 실행해 줘:
npx electron-forge make
```

이 명령은 현재 운영 체제용 설치 프로그램을 자동으로 생성합니다:

* **macOS**: `.dmg` 설치 이미지 및 `.zip` 아카이브
* **Windows**: `.exe` 설치 프로그램(Squirrel 형식)
* **Linux**: `.deb`(Debian/Ubuntu) 및 `.rpm`(Fedora) 패키지

빌드 출력은 `out/make/` 디렉토리에 있습니다.

<!-- ![placeholder: Screenshot of files in out/make directory showing generated .dmg or .exe installers](../../../../zh-cn/stage-3/cross-platform/electron-voice-to-text/images/image10.png) -->

## 6.2 앱 크기 최적화

Electron 앱의 "고통점" 중 하나는 큰 패키지 크기입니다(Chromium이 번들되기 때문). 최적화 제안:

* `dependencies`의 패키지만 번들에 포함하고, 개발 종속성은 `devDependencies`에 유지
* Vite 트리 셰이킹을 사용하여 JavaScript 크기 감소
* 로컬 모델을 사용하는 경우, 설치 프로그램에 번들링하는 대신 첫 실행 시 다운로드하도록 고려

| 구성 | 예상 크기 |
|------|---------|
| 순수 Electron 앱(모델 없음) | ~150-200 MB |
| + whisper tiny 모델 | ~250 MB |
| + whisper large-v3-turbo 모델 | ~1.7 GB |

## 6.3 크로스 플랫폼 참고 사항

**macOS:**
* App Store에 게시하거나 다른 사람에게 배포하려면 **코드 서명**이 필요(Apple Developer ID, 연 $99)
* Apple의 **공증(Notarization)** 프로세스도 필요
* 마이크 권한은 `Info.plist`에 `NSMicrophoneUsageDescription`을 선언해야 함
* Intel과 Apple Silicon을 모두 지원하려면 Universal Binary 빌드 권장

**Windows:**
* 코드 서인을 권장하며, 그렇지 않으면 Windows SmartScreen이 보안 경고를 표시함
* 서명되지 않은 앱도 사용자가 "그래도 실행"을 선택할 수 있음

**Linux:**
* 코드 서명 불필요
* `.deb`와 `.AppImage` 형식을 모두 제공하는 것을 권장

> **팁**: 개인 프로젝트나 소규모 배포의 경우 코드 서명을 임시로 건너뛰고 패키징된 파일을 친구들과 직접 공유할 수 있습니다.

# 7장: 마무리

축하합니다! 크로스 플랫폼 음성 텍스트 변환 데스크톱 앱을 처음부터 구축했습니다. 한번 되돌아 보겠습니다:

1. Electron Forge를 사용하여 크로스 플랫폼 데스크톱 앱을 스캐폴드
2. 메인 프로세스, 렌더러 프로세스, IPC 통신 이해
3. 마이크 녹음 및 오디오 캡처 구현
4. 두 가지 음성 인식 옵션 통합: 클라우드 Whisper API와 로컬 whisper.cpp
5. Electron 앱을 패키징하고 배포하는 방법 학습

Electron이 강력한 이유는 웹 기술 스택을 사용하여 VS Code나 Slack 수준의 데스크톱 앱을 구축할 수 있다는 것입니다. 그리고 성숙한 AI 음성 인식 덕분에, 예전에는 전문 팀이 필요했던 음성 텍스트 변환 같은 기능을 이제 한 사람이 구축할 수 있습니다.

**고급 방향:**

* **실시간 자막**: AudioWorklet을 사용한 스트리밍 오디오와 스트리밍 인식 API를 결합한 실시간 전사
* **회의 어시스턴트**: 전체 회의 녹음, 자동 타임스탬프가 있는 전사본 생성, AI로 핵심 요약
* **다국어 번역**: 음성을 전사하고 번역 API를 호출하여 실시간 언어 변환
* **음성 노트**: 로컬 데이터베이스(예: SQLite)와 결합하여 검색 가능한 음성 노트 구축

***당신의 목소리를 남기고, 코드가 모든 것을 기록하게 하세요.***

# 참고 자료

* [Electron 공식 문서](https://www.electronjs.org/docs/latest/)
* [Electron Forge 공식 문서](https://www.electronforge.io/)
* [OpenAI Whisper API 문서](https://platform.openai.com/docs/guides/speech-to-text)
* [whisper.cpp GitHub 저장소](https://github.com/ggml-org/whisper.cpp)
* [nodejs-whisper npm 패키지](https://www.npmjs.com/package/nodejs-whisper)
* [MDN MediaDevices.getUserMedia()](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia)
