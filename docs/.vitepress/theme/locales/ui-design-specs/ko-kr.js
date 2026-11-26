export default {
  common: { before: '조정 전', after: '조정 후', reset: '초기화' },
  compare: {
    title: '같은 페이지, 두 가지 계층 구조',
    subtitle:
      '양쪽 문구는 똑같고 계층만 바꿨습니다. 먼저 아래 문제에 마우스를 올려 두 그림을 비교한 다음, ‘눈 가늘게 뜨기 테스트’ 슬라이더를 움직여 보세요.',
    squint: '눈 가늘게 뜨기 테스트',
    squintHint:
      '눈을 가늘게 뜨고 페이지를 보는 것과 비슷합니다. 화면이 흐려져도 보이는 요소가 가장 먼저 시선을 끕니다.',
    squintClear: '선명하게',
    squintBlurry: '흐리게',
    issueLabel: '왼쪽 그림의 네 가지 문제',
    applyHint:
      '오른쪽 그림 위의 스위치를 하나씩 꺼 보세요. 끌 때마다 오른쪽에 예전 문제가 하나씩 다시 나타납니다.',
    tableHead: ['문제', '개선 방법', '개선 결과'],
    metrics: {
      borders: '장식용 테두리',
      solid: '채우기 버튼',
      legend:
        '두 그림 위의 숫자를 비교해 보세요. 오른쪽은 테두리와 채우기 버튼이 훨씬 적어서 제목과 주요 버튼이 두드러집니다.'
    },
    moreMenu: ['이름 바꾸기', '삭제'],
    issues: [
      {
        id: 'type',
        n: '①',
        short: '글자 크기로 계층 구분',
        problem: '제목, 필터, 버튼이 한데 몰려 있고 글자 크기도 모두 같습니다',
        fix: '제목과 필터를 다른 줄에 놓습니다. 제목은 가장 크게, 설명은 그보다 작게, 날짜 같은 세부 정보는 가장 작게 표시합니다',
        result: '어떤 페이지인지, 어디부터 볼지 한눈에 알 수 있습니다'
      },
      {
        id: 'borders',
        n: '②',
        short: '테두리 줄이기',
        problem:
          '모듈마다 굵은 테두리가 있고 그 안에도 테두리가 하나 더 있습니다',
        fix: '먼저 정렬과 간격으로 그룹을 나누고, 경계가 꼭 필요한 곳에만 테두리를 둡니다',
        result: '선이 줄어들어 어떤 항목이 한 그룹인지 더 쉽게 보입니다'
      },
      {
        id: 'buttons',
        n: '③',
        short: '버튼 우선순위 구분',
        problem:
          '버튼 8개의 배경이 모두 채워져 있어 하나같이 주요 조작처럼 보입니다',
        fix: '영역마다 주요 버튼은 하나만 남기고, 나머지는 테두리 버튼이나 텍스트 버튼으로 바꿉니다',
        result: '다음에 어디를 눌러야 할지 한눈에 알 수 있습니다'
      },
      {
        id: 'scope',
        n: '④',
        short: '조작을 제자리에 배치',
        problem:
          '‘삭제’는 프로젝트 하나에만 영향을 주는데, ‘새 프로젝트’처럼 페이지 전체에 적용되는 조작 옆에 있습니다',
        fix: '페이지 전체에 적용하는 조작은 페이지 차원에 배치하고, 항목 하나에 적용하는 조작은 그 항목 옆에 둡니다',
        result: '버튼마다 어떤 대상에 영향을 주는지 분명해집니다'
      }
    ],
    mock: {
      pageTitle: '프로젝트',
      count: '프로젝트 2개',
      filters: ['전체', '진행 중'],
      sort: '최근 업데이트순',
      create: '새 프로젝트',
      export: '내보내기',
      remove: '삭제',
      open: '열기',
      more: '더 보기',
      items: [
        { name: '강좌 설계', meta: '문서 · 오늘 업데이트' },
        { name: '조사 노트', meta: '문서 · 3일 전 업데이트' }
      ]
    }
  },
  anatomy: {
    title: '페이지의 각 부분: 네 계층이 맡은 역할',
    subtitle:
      '아래 계층에 마우스를 올리면 오른쪽에서 페이지의 해당 위치를 볼 수 있습니다. 클릭하면 표시가 고정됩니다.',
    taskLabel: '맡은 역할',
    meansLabel: '표현 방법',
    showLabels: '라벨 표시',
    showGuides: '가이드 표시',
    guidesNote:
      '가이드를 켜면 모든 콘텐츠가 같은 세로선에서 시작하는 게 보입니다. 관련 콘텐츠끼리는 가깝게 두고, 계층이 다르면 넉넉한 간격을 둡니다.',
    gap: '간격',
    typeTitle: '이 세 줄은 글자 크기, 굵기, 색의 명암만으로 계층을 구분합니다',
    typeSample: '예시',
    layers: [
      {
        id: 'locate',
        name: '현재 위치 안내',
        task: '사용자에게 현재 위치와 돌아가는 방법을 알려 줍니다',
        means: '눈에 덜 띄는 탐색 제목과 익숙한 돌아가기 버튼을 씁니다'
      },
      {
        id: 'primary',
        name: '주요 정보',
        task: '이 페이지에서 가장 중요한 내용을 알려 줍니다',
        means:
          '페이지에서 가장 큰 글자를 고정된 위치에 두고, 뒤에 여백을 남깁니다'
      },
      {
        id: 'support',
        name: '보조 정보 영역',
        task: '설명과 메타데이터를 덧붙입니다',
        means:
          '더 작고 옅지만 읽을 수 있게 표시하고, 설명할 콘텐츠 바로 옆에 둡니다'
      },
      {
        id: 'action',
        name: '조작 영역',
        task: '사용자가 다음에 할 수 있는 일을 알려 줍니다',
        means:
          '배경을 채운 주요 버튼은 하나만 두고 나머지는 강조를 줄입니다. 모두 콘텐츠 뒤에 배치합니다'
      }
    ],
    typeScale: [
      {
        name: '콘텐츠 제목',
        px: 22,
        weight: 700,
        note: '페이지 전체에서 한 번만 표시합니다'
      },
      {
        name: '본문',
        px: 14,
        weight: 400,
        note: '읽기 편하도록 줄 간격을 조금 넓힙니다'
      },
      {
        name: '보조 정보',
        px: 12,
        weight: 400,
        note: '더 작고 옅게 표시하되, 이보다 더 작게 만들지 않습니다'
      }
    ],
    mock: {
      back: '돌아가기',
      navTitle: '프로젝트',
      title: '강좌 설계',
      meta: '멤버 4명 · 문서 12개 · 어제 업데이트',
      body: '이번 학기 강좌 설계 진행 상황을 기록합니다. 매주 업데이트합니다.',
      link: '전체 문서 보기',
      primary: '프로젝트 열기',
      secondary: '보관'
    }
  },
  grouping: {
    title: '테두리를 추가할까요? 세 단계로 살펴보세요',
    subtitle:
      '아래는 같은 설정 양식입니다. 세 단계를 차례로 눌러 어느 단계부터 그룹이 또렷해지는지 보세요.',
    stepLabel: '{n}단계',
    metricBorders: '장식용 테두리',
    metricGaps: '간격 크기 종류',
    showGaps: '간격 표시',
    explicitToggle: '‘알림’에 옅은 배경색 넣기',
    implicitTitle: '간격으로 그룹 나누기',
    implicitText:
      '테두리를 그리지 않아도 거리, 정렬, 여백을 조절하면 관련 콘텐츠가 한 그룹처럼 보입니다.',
    explicitTitle: '경계를 표시해 그룹 나누기',
    explicitText:
      '배경색이나 윤곽선을 더하면 그룹의 경계가 또렷해집니다. 이 그룹에 경계가 정말 필요한지 먼저 생각해 보세요.',
    gapInside: '그룹 안',
    gapBetween: '그룹 사이',
    steps: [
      {
        caption:
          '첫 단계에서는 모든 요소에 테두리를 둡니다. 모든 요소가 시선을 끌어서 무엇이 한 그룹인지 알기 어렵습니다.'
      },
      {
        caption:
          '두 번째 단계에서는 테두리만 없앱니다. 화면은 차분해졌지만 간격이 여전히 같아서 콘텐츠가 흩어져 보입니다.'
      },
      {
        caption:
          '세 번째 단계에서는 간격으로 그룹을 나눕니다. 관련 항목을 가까이 두고 관련 없는 항목과는 거리를 둡니다. 선을 하나도 긋지 않아도 그룹이 보입니다.'
      }
    ],
    mock: {
      pageTitle: '계정 설정',
      basic: '기본 정보',
      email: '이메일',
      phone: '휴대전화 번호',
      password: '비밀번호 변경',
      newPassword: '새 비밀번호',
      confirm: '비밀번호 확인',
      notify: '알림',
      mail: '이메일 알림',
      desktop: '데스크톱 알림',
      save: '저장',
      cancel: '취소'
    }
  },
  buttonSpec: {
    title: '버튼 하나의 완전한 정의',
    subtitle:
      '‘버튼 하나 추가해 주세요’라는 말은 가이드라인에서 10가지 질문으로 나뉩니다. 왼쪽에서 하나씩 열어 어디까지 정해야 하는지 살펴보세요.',
    questionLabel: '가이드라인이 묻는 것',
    sampleLabel: '작성 예시',
    sourceLabel: '원문 보기',
    rolesRule:
      '버튼의 역할은 눌렀을 때 생기는 결과를 나타냅니다. 가장 눈에 띄는 자리는 위험도가 높은 삭제 버튼보다 현재 작업에 가장 중요한 버튼에 남겨 두세요.',
    structureRule:
      '라벨에는 동작을 나타내는 동사를 쓰는 게 좋습니다. ‘확인’보다 ‘초안 저장’이라고 쓰면 누를 때 무슨 일이 생길지 한눈에 알 수 있습니다.',
    visualRule:
      '스타일은 얼마나 눈에 띄는지, 역할은 누르면 어떤 결과가 생기는지를 정합니다. 두 가지를 따로 생각하세요.',
    sizeRule:
      '버튼이 작게 보여도 손가락으로 누르는 영역은 충분히 넓어야 합니다. 보이는 크기와 누를 수 있는 범위를 따로 정하세요.',
    sizeVisible: '보이는 높이',
    sizeTarget: '누를 수 있는 영역',
    statesRule:
      '각 상태를 미리 정의하고, 색 외의 단서로도 구분할 수 있게 하세요.',
    behaviorRule:
      '버튼을 누르면 무슨 일이 일어나는지 계속 알 수 있어야 합니다. 즉시 반응을 보여 주고, 기다리는 동안 진행 중임을 표시하고, 실패하면 다음에 무엇을 할지 알려 주세요.',
    adaptiveRule:
      '위 슬라이더를 움직여 보세요. 글자가 커지면 버튼도 높아지고, 라벨은 잘리지 않고 다음 줄로 넘어갑니다.',
    a11yRule:
      '키보드만 쓰거나 화면을 볼 수 없는 사람도 버튼을 사용할 수 있어야 합니다.',
    boundaryRule:
      '가이드라인은 컴포넌트를 피해야 할 때도 알려 줍니다. 무엇을 할 수 있는지 아는 것만큼 중요합니다.',
    a11yNoName: '스크린 리더가 읽는 내용: 버튼',
    a11yWithName: '스크린 리더가 읽는 내용: 삭제, 버튼',
    fontSize: '글자 크기',
    dimsLabel: '정의 항목',
    purposeExamples: ['저장', '보내기', '삭제'],
    purposeLine:
      '세 버튼은 다르게 생겼지만 공통점이 있습니다. 누르는 순간 동작을 실행합니다.',
    roleSamples: {
      Normal: '미리 보기',
      Primary: '게시',
      Cancel: '취소',
      Destructive: '프로젝트 삭제'
    },
    anatomyBtn: '프로젝트 게시',
    genericBtn: '계속',
    deleteLabel: '삭제',
    roles: [
      { name: 'Normal', desc: '특별히 강조할 필요가 없는 일반 동작입니다' },
      {
        name: 'Primary',
        desc: '지금 가장 눌러야 할 버튼입니다. 화면마다 하나나 둘만 둡니다'
      },
      {
        name: 'Cancel',
        desc: '사용자가 작업을 그만둘 수 있게 하고, 주요 버튼보다 강조를 줄입니다'
      },
      {
        name: 'Destructive',
        desc: '되돌릴 수 없는 동작입니다. 경고 색상으로 표시하고 기본으로 선택하지 않습니다'
      }
    ],
    parts: [
      {
        name: '컨테이너',
        desc: '색상, 크기, 눌렀을 때의 변화를 표현하는 버튼의 몸체입니다'
      },
      {
        name: '아이콘',
        desc: '선택 사항입니다. 버튼의 용도를 한눈에 알아볼 수 있게 돕습니다'
      },
      { name: '라벨', desc: '누르면 무슨 일이 생기는지 분명히 알립니다' }
    ],
    levels: [
      {
        name: 'Filled',
        desc: '가장 눈에 띕니다. 현재 가장 중요한 동작에 씁니다'
      },
      {
        name: 'Tonal',
        desc: '테두리 버튼보다 눈에 잘 띕니다. 보조 동작 중에서도 눈에 띄어야 할 때 씁니다'
      },
      {
        name: 'Outlined',
        desc: '배경을 채운 버튼 옆에 대안으로 제시하는 동작에 씁니다'
      },
      { name: 'Text', desc: '가장 강조가 약합니다. 보조 진입점에 씁니다' }
    ],
    stateGallery: ['기본', '호버', '눌림', '포커스', '비활성'],
    behaviorStages: ['조작 가능', '누른 직후', '처리 중', '완료 / 실패'],
    a11yChecks: [
      '아이콘만 있는 버튼에도 접근 가능한 이름이 있습니다',
      '키보드로 포커스를 옮길 수 있고 포커스가 눈에 보입니다',
      '텍스트와 배경의 대비가 충분합니다',
      '색 외의 단서로도 상태를 알립니다'
    ],
    boundaries: [
      { want: '다른 페이지로 이동하기', use: '링크, 탭' },
      { want: '두 상태 사이에서 전환하기', use: '스위치, 토글 버튼' },
      { want: '여러 값 중 하나 고르기', use: 'Pop-up 버튼, 선택 컨트롤' },
      { want: '자주 쓰지 않는 명령을 한데 모으기', use: '메뉴' }
    ],
    boundaryWant: '하려는 일',
    boundaryUse: '더 적합한 컴포넌트',
    dims: [
      {
        id: 'purpose',
        name: '용도',
        question: '이 요소는 어떤 문제를 해결하나요?',
        sample:
          '‘게시’ 버튼은 현재 프로젝트를 제출합니다. 성공하면 프로젝트 상태가 ‘게시됨’으로 바뀝니다.',
        source: {
          label: 'Atlassian · Button',
          url: 'https://atlassian.design/components/button/'
        }
      },
      {
        id: 'role',
        name: '역할과 의미',
        question: '동작, 선택, 탐색 중 무엇을 나타내나요?',
        sample:
          '‘프로젝트 삭제’ 버튼의 역할은 Destructive, 스타일은 Outlined입니다. 기본 버튼으로 지정하지 않습니다.',
        source: {
          label: 'Apple HIG · Buttons',
          url: 'https://developer.apple.com/design/human-interface-guidelines/buttons'
        }
      },
      {
        id: 'structure',
        name: '구조',
        question: '어떤 부분으로 이루어져 있나요?',
        sample:
          '컨테이너, 선택 사항인 아이콘, 라벨로 구성합니다. 라벨에는 동작을 나타내는 문구를 한 줄로 씁니다.',
        source: {
          label: 'Material 3 · Buttons',
          url: 'https://m3.material.io/components/buttons/guidelines'
        }
      },
      {
        id: 'visual',
        name: '시각적 강조',
        question: '무엇으로 우선순위를 표현하나요?',
        sample:
          '이 페이지에서는 ‘게시’에만 Filled를 쓰고, 나머지 동작에는 Outlined 또는 Text를 씁니다.',
        source: {
          label: 'Fluent 2 · Button usage',
          url: 'https://fluent2.microsoft.design/components/web/react/core/button/usage'
        }
      },
      {
        id: 'size',
        name: '크기',
        question: '어떤 크기 조건에 맞춰 배치하나요?',
        sample:
          '보이는 높이는 40, 누를 수 있는 영역은 최소 44×44로 지정합니다. 같은 그룹의 버튼은 높이를 맞추고 간격은 8로 둡니다.',
        source: {
          label: 'Apple HIG · Layout',
          url: 'https://developer.apple.com/design/human-interface-guidelines/layout'
        }
      },
      {
        id: 'states',
        name: '상태',
        question: '조건에 따라 무엇을 보여 주나요?',
        sample:
          '기본, 호버, 눌림, 포커스, 비활성, 로딩의 여섯 상태를 정의합니다.',
        source: {
          label: 'Material 3 · Buttons',
          url: 'https://m3.material.io/components/buttons/overview'
        }
      },
      {
        id: 'behavior',
        name: '동작',
        question: '실행하면 무슨 일이 생기나요?',
        sample:
          '누르면 즉시 로딩 상태로 바꾸고 중복 제출을 막습니다. 처리가 끝나면 결과를 알립니다.',
        source: {
          label: 'Apple HIG · Feedback',
          url: 'https://developer.apple.com/design/human-interface-guidelines/feedback'
        }
      },
      {
        id: 'adaptive',
        name: '화면 대응',
        question: '환경이 바뀌어도 어떻게 계속 쓸 수 있게 하나요?',
        sample:
          '글자가 커지면 라벨을 두 줄까지 표시하고 그에 맞춰 버튼 높이를 늘립니다.',
        source: {
          label: 'Material 3 · Buttons accessibility',
          url: 'https://m3.material.io/components/buttons/accessibility'
        }
      },
      {
        id: 'a11y',
        name: '접근성',
        question: '특정 감각에만 의존하지 않고도 조작할 수 있나요?',
        sample:
          '아이콘 버튼의 접근 가능한 이름을 ‘삭제’로 지정하고, 포커스 순서를 화면에 보이는 순서에 맞춥니다.',
        source: {
          label: 'Apple HIG · Accessibility',
          url: 'https://developer.apple.com/design/human-interface-guidelines/accessibility'
        }
      },
      {
        id: 'boundary',
        name: '사용 범위',
        question: '어떤 상황에서는 사용을 피해야 하나요?',
        sample:
          '다른 페이지로 이동할 때는 링크를, 두 값 사이를 전환할 때는 스위치를 씁니다.',
        source: {
          label: 'Fluent 2 · Menu usage',
          url: 'https://fluent2.microsoft.design/components/web/react/core/menu/usage'
        }
      }
    ]
  },
  buttonStates: {
    title: '버튼 상태와 동작',
    subtitle:
      '상태는 지금 버튼이 어떻게 보이는지를, 동작은 누른 뒤에 어떤 일이 일어나는지를 말합니다.',
    statesTitle: '먼저 살펴볼 여섯 가지 상태',
    stateHead: ['상태', '언제 나타날까요?', '겉모습의 변화', '주의할 점'],
    liveHint:
      '버튼에 마우스를 올리거나 누른 채로 기다려 보세요. Tab 키로 포커스를 옮겼을 때도 어떻게 달라지는지 살펴보세요.',
    currentState: '현재 상태',
    sample: '버튼',
    stateNames: {
      default: '기본',
      hover: '호버',
      pressed: '눌림',
      focus: '포커스'
    },
    states: [
      {
        id: 'default',
        name: '기본',
        trigger: '아무 조작도 하지 않았을 때',
        change: '평소 모습',
        tip: '페이지의 버튼은 대부분 이 상태입니다'
      },
      {
        id: 'hover',
        name: '호버',
        trigger: '포인터를 올렸을 때',
        change: '배경이 조금 어두워집니다',
        tip: '누를 수 있는 요소임을 알립니다'
      },
      {
        id: 'pressed',
        name: '눌림',
        trigger: '누르고 아직 떼지 않았을 때',
        change: '배경이 더 어두워집니다',
        tip: '버튼을 직접 만들면 이 상태도 직접 구현해야 합니다'
      },
      {
        id: 'focus',
        name: '포커스',
        trigger: 'Tab 키로 포커스를 옮겼을 때',
        change: '버튼 둘레에 포커스 링이 나타납니다',
        tip: 'outline: none으로 포커스 링을 없애지 마세요'
      },
      {
        id: 'disabled',
        name: '비활성',
        trigger: '필요한 조건을 충족하지 못했을 때',
        change: '불투명도가 낮아지고 눌러도 반응하지 않습니다',
        tip: '누를 수 없는 이유도 함께 알려 주면 좋습니다'
      },
      {
        id: 'loading',
        name: '로딩',
        trigger: '동작을 시작했지만 아직 끝나지 않았을 때',
        change: '라벨이 진행 중으로 바뀌고 진행 표시가 나타납니다',
        tip: '사용할 수 없다는 뜻과 구분되도록, 처리 중임을 알립니다'
      }
    ],
    behaviorTitle: '이제 버튼을 누른 뒤의 동작을 살펴보세요',
    behaviorHint:
      '‘프로젝트 게시’를 한 번 누르고 결과가 나오기까지 어떤 일이 일어나는지 보세요.',
    scenario: '결과 시뮬레이션',
    scenarioSuccess: '성공',
    scenarioFail: '실패',
    run: '프로젝트 게시',
    running: '게시 중…',
    done: '게시됨',
    failed: '게시하지 못했습니다. 내용은 그대로 남아 있습니다',
    retry: '다시 시도',
    stageHead: ['단계', '사용자가 알아야 할 것'],
    stages: [
      {
        name: '조작 가능',
        desc: '버튼을 누르기 전에 어떤 일이 일어날지 알 수 있습니다'
      },
      {
        name: '즉각적인 피드백',
        desc: '누르는 순간 버튼 모양이 바뀌어 입력이 반영됐음을 알 수 있습니다'
      },
      {
        name: '처리 중',
        desc: '기다리는 동안 진행 상태가 표시되고 반복해서 눌러도 중복 실행되지 않습니다'
      },
      {
        name: '결과',
        desc: '성공했다면 분명하게 알리고, 실패했다면 다음에 할 일을 안내합니다'
      },
      {
        name: '복구',
        desc: '실패해도 입력한 내용이 남아 있어 바로 다시 시도할 수 있습니다'
      }
    ],
    rulesTitle: '네 가지 규칙',
    rules: [
      '버튼 색을 조금 어둡게 바꾸는 정도라도 누르는 즉시 반응을 보여 주세요',
      '페이지가 멈췄다고 생각하지 않도록 기다리는 동안 진행 중임을 알려 주세요',
      '로딩은 ‘처리 중’, 비활성은 ‘누를 수 없음’을 뜻하므로 두 상태를 구분해 보여 주세요',
      '라벨도 상태에 맞춰 바꿔 주세요. 누르기 전에는 ‘프로젝트 게시’, 누른 뒤에는 ‘게시 중…’을 표시합니다'
    ]
  },
  lookalike: {
    title: '비슷하게 생긴 두 컨트롤, 어떻게 다를까요?',
    subtitle:
      '아래 두 컨트롤은 생김새가 거의 같습니다. 각각 열어 항목을 하나씩 골라 보고 차이를 확인해 보세요.',
    popupTag: '값 하나 선택',
    pullTag: '명령 하나 실행',
    popupInitial: '정렬: 최신순',
    popupPrefix: '정렬: ',
    popupOptions: ['최신순', '오래된순', '이름순'],
    pullInitial: '조작',
    pullOptions: ['이름 바꾸기', '링크 복사', '삭제'],
    pullDone: '실행 완료: {name}',
    popupValue: '현재 값: {value}',
    pullIdle: '아직 실행한 명령이 없습니다',
    tableHead: ['', 'Pop-up 버튼', 'Pull-down 버튼'],
    rows: [
      [
        '열었을 때',
        '고를 수 있는 옵션이 나오고 현재 값에 체크 표시가 붙습니다',
        '실행할 수 있는 명령이 나옵니다'
      ],
      [
        '항목 하나를 골랐을 때',
        '고른 값을 기억하고 버튼 문구도 바뀝니다',
        '명령을 실행한 뒤 닫히고 버튼 문구는 그대로입니다'
      ],
      [
        '적합한 용도',
        '정렬 순서 변경, 보기 방식 선택, 옵션 선택',
        '이름 바꾸기, 내보내기, 삭제 같은 조작'
      ],
      ['피해야 할 용도', '명령 모아 두기', '필터나 탐색에 쓰기']
    ],
    conclusion:
      '차이가 보이나요? 두 컨트롤은 똑같이 생겼지만, 방금 왼쪽에서는 값만 바뀌었고 오른쪽에서는 명령이 실행됐습니다. 어느 쪽을 쓸지 헷갈리면 생김새보다 사용자 의도를 먼저 생각해 보세요. 값을 바꾸려는 걸까요, 어떤 동작을 실행하려는 걸까요?'
  },
  skeleton: {
    title: '페이지를 나눠 보면 탐색, 콘텐츠, 조작은 각각 어디에 있을까요?',
    subtitle:
      '아래는 일반적인 프로젝트 목록입니다. 왼쪽 항목에 마우스를 올리면 오른쪽에 위치는 실선으로, 영향을 받는 대상은 점선으로 표시합니다. 클릭하면 표시가 고정됩니다.',
    legendCtl: '실선: 배치된 위치',
    legendAffect: '점선: 영향을 받는 대상',
    leading: '돌아가기와 제목은 왼쪽에 배치',
    trailing: '조작은 오른쪽에 배치하고 하나만 강조',
    taskLabel: '어떤 질문에 답하나요?',
    affectLabel: '영향을 받는 대상',
    misplacedToggle: '삭제를 상단 바로 옮겨 보기',
    misplacedHint:
      '이제 상단 바에 ‘삭제’와 ‘새 프로젝트’가 나란히 있습니다. ‘삭제’를 누르면 어느 프로젝트가 삭제될까요? 위치만 봐서는 알 수 없습니다. 그래서 조작은 영향을 주는 항목 바로 옆에 둡니다.',
    items: [
      {
        id: 'global',
        name: '제품 전체 탐색',
        question: '제품의 어느 영역으로 이동할까요?',
        affect: '페이지 전체가 다른 영역으로 바뀝니다'
      },
      {
        id: 'locate',
        name: '페이지 제목',
        question: '지금 어느 페이지에 있고 어떻게 돌아갈 수 있나요?',
        affect: '현재 페이지'
      },
      {
        id: 'content',
        name: '주요 콘텐츠 영역',
        question: '지금 무엇을 보고 있나요?',
        affect: '다른 컨트롤이 영향을 주는 콘텐츠입니다'
      },
      {
        id: 'listctl',
        name: '필터와 정렬',
        question: '이 목록을 어떻게 볼까요?',
        affect: '목록에 표시할 프로젝트와 표시 순서'
      },
      {
        id: 'pageact',
        name: '페이지 전체 조작',
        question: '페이지 전체에서 무엇을 할까요?',
        affect: '목록에 있는 모든 프로젝트'
      },
      {
        id: 'itemact',
        name: '항목별 조작',
        question: '이 항목에서 무엇을 할까요?',
        affect: '해당 프로젝트 하나'
      }
    ],
    mock: {
      nav: ['프로젝트', '멤버', '설정'],
      title: '프로젝트',
      section: '최근 프로젝트',
      filters: ['전체', '진행 중'],
      sort: '최근 업데이트순',
      export: '내보내기',
      create: '새 프로젝트',
      remove: '삭제',
      open: '열기',
      more: '더 보기',
      items: [
        { name: '강좌 설계', meta: '문서 · 오늘 업데이트' },
        { name: '조사 노트', meta: '문서 · 3일 전 업데이트' }
      ]
    }
  },
  specMap: {
    title: '디자인 가이드라인에는 어떤 내용이 있을까요?',
    subtitle:
      '디자인 가이드라인을 보면 색상과 모서리 둥글기만 떠올리기 쉽습니다. Apple 가이드라인의 목차를 함께 세어 봅시다. 큰 분류 6개에 주제가 158개 있습니다. 아래 주제를 눌러 보거나, 위 스위치로 페이지와 버튼 관련 주제만 골라 보세요.',
    checkedAt:
      '분류와 개수는 2026년 11월 Apple HIG 목차를 기준으로 확인했습니다',
    all: '전체 주제',
    page: '페이지 관련',
    button: '버튼 관련',
    topicsUnit: '개 주제',
    moreTopics: '{n}개 더 있음',
    pick: '주제를 눌러 어떤 질문에 답하는지 확인해 보세요',
    questionLabel: '어떤 질문에 답하나요?',
    relPage: '이 장의 페이지 디자인 부분에서 다룹니다',
    relButton: '이 장의 버튼 디자인 부분에서 다룹니다',
    relNone: '이 장에서는 다루지 않지만 제품을 만들다 보면 만나게 됩니다',
    relPageShort: '페이지 관련',
    relButtonShort: '버튼 관련',
    relBoth: '페이지와 버튼에 모두 적용',
    paraphraseNote: '공식 문구를 쉽게 풀어 질문으로 정리했습니다.',
    takeaway:
      '페이지 계층과 버튼은 전체 가이드라인의 작은 일부입니다. 이 부분을 이해하면 나머지 주제를 스스로 읽을 때도 같은 판단 기준을 적용할 수 있습니다.',
    categories: [
      {
        id: 'getting-started',
        name: '시작하기와 플랫폼',
        en: 'Getting started',
        count: 9,
        topics: [
          {
            name: '디자인 원칙',
            rel: 'both',
            q: '보기 좋고 사용하기 편한 인터페이스는 어떤 기준으로 판단할까요?'
          },
          {
            name: 'iOS용 디자인',
            rel: '',
            q: '휴대전화 화면을 디자인할 때 어떤 점에 특히 주의해야 할까요?'
          },
          {
            name: 'macOS용 디자인',
            rel: '',
            q: '컴퓨터 화면을 디자인할 때 휴대전화 화면과 무엇이 다를까요?'
          }
        ]
      },
      {
        id: 'foundations',
        name: '기초 가이드라인',
        en: 'Foundations',
        count: 18,
        topics: [
          {
            name: '레이아웃',
            rel: 'page',
            q: '다양한 화면 크기에 맞추려면 페이지 요소를 어떻게 배치해야 할까요?'
          },
          {
            name: '타이포그래피',
            rel: 'page',
            q: '글자 크기와 굵기를 어떻게 정하면 정보의 우선순위가 드러날까요?'
          },
          {
            name: '색상',
            rel: 'both',
            q: '각 색상을 어디에 쓰고 다크 모드에서는 어떻게 바꿀까요?'
          },
          {
            name: '접근성',
            rel: 'both',
            q: '보거나 듣기 어렵거나 키보드만 쓰는 사람도 제품을 이용할 수 있게 하려면 어떻게 해야 할까요?'
          },
          {
            name: '아이콘',
            rel: 'button',
            q: '아이콘의 스타일과 크기는 어떻게 정하고, 언제 텍스트를 덧붙여야 할까요?'
          },
          {
            name: '인터페이스 문구',
            rel: 'both',
            q: '버튼과 안내 문구를 한눈에 이해하게 하려면 어떻게 써야 할까요?'
          },
          {
            name: '모션',
            rel: '',
            q: '언제 움직임을 넣고, 주의를 흐트러뜨리지 않으려면 어떻게 표현해야 할까요?'
          }
        ]
      },
      {
        id: 'patterns',
        name: '인터랙션 패턴',
        en: 'Patterns',
        count: 25,
        topics: [
          {
            name: '피드백',
            rel: 'button',
            q: '사용자가 눌렀을 때 입력이 반영됐음을 어떻게 알려 줄까요?'
          },
          {
            name: '로딩',
            rel: 'both',
            q: '기다리는 동안 무엇을 보여 주면 화면이 멈췄다고 생각하지 않을까요?'
          },
          {
            name: '실행 취소와 다시 실행',
            rel: 'both',
            q: '실수를 어떻게 되돌리고, 어떤 조작은 사전 확인을 생략해도 될까요?'
          },
          {
            name: '모달',
            rel: 'page',
            q: '언제 사용자의 작업을 잠시 멈춰도 되고, 어떻게 원래 작업으로 돌아가게 할까요?'
          },
          {
            name: '검색',
            rel: 'page',
            q: '사용자가 원하는 것을 빠르게 찾도록 어떻게 도울까요?'
          },
          {
            name: '설정',
            rel: 'page',
            q: '사용자가 헤매지 않도록 설정 페이지를 어떻게 구성할까요?'
          }
        ]
      },
      {
        id: 'components',
        name: '컴포넌트',
        en: 'Components',
        count: 64,
        topics: [
          {
            name: '버튼',
            rel: 'button',
            q: '어떤 동작을 버튼으로 만들고, 어떤 상태를 제공해야 할까요?'
          },
          {
            name: '도구 모음',
            rel: 'page',
            q: '한 줄에 놓인 조작을 어떻게 묶고, 무엇을 가장 눈에 띄는 자리에 둘까요?'
          },
          {
            name: '메뉴',
            rel: 'button',
            q: '여러 명령을 어떻게 정리하고, 언제 메뉴를 피해야 할까요?'
          },
          {
            name: '경고 알림',
            rel: 'both',
            q: '어떤 정보라면 사용자의 작업을 멈추고 바로 알려야 할까요?'
          },
          {
            name: '목록과 표',
            rel: 'page',
            q: '항목이 많을 때 빠르게 훑어볼 수 있도록 어떻게 배치할까요?'
          },
          {
            name: '스위치',
            rel: 'button',
            q: '두 상태를 오갈 때 어떤 컨트롤을 써야 할까요?'
          },
          {
            name: '선택 컨트롤',
            rel: 'button',
            q: '여러 값 중 하나를 고를 때 어떤 컨트롤을 써야 할까요?'
          }
        ]
      },
      {
        id: 'inputs',
        name: '입력 방식',
        en: 'Inputs',
        count: 13,
        topics: [
          {
            name: '제스처',
            rel: '',
            q: '밀거나 가볍게 눌러서 어떤 조작을 할 수 있을까요?'
          },
          {
            name: '키보드',
            rel: 'both',
            q: '키보드만으로 전체 과정을 끝낼 수 있을까요?'
          },
          {
            name: '포인팅 장치',
            rel: 'both',
            q: '포인터를 올리거나 눌렀을 때 컨트롤이 어떻게 반응해야 할까요?'
          }
        ]
      },
      {
        id: 'technologies',
        name: '기술과 서비스',
        en: 'Technologies',
        count: 29,
        topics: [
          {
            name: '알림',
            rel: '',
            q: '언제 알림을 보내고, 방해가 되지 않도록 문구를 어떻게 써야 할까요?'
          },
          {
            name: '위젯',
            rel: '',
            q: '홈 화면 위젯에 콘텐츠를 얼마나 보여 줘야 할까요?'
          },
          {
            name: 'Siri',
            rel: '',
            q: '어떤 조작을 말로 요청해 실행할 수 있을까요?'
          }
        ]
      }
    ]
  },
  decision: {
    title: '이제 직접 골라 보세요. 어떤 버튼이 주요 버튼일까요?',
    subtitle:
      '아래는 ‘프로젝트 편집’ 페이지입니다. 차이를 판단할 수 있도록 버튼 5개를 똑같이 만들었습니다. 가장 눈에 띄어야 한다고 생각하는 버튼을 눌러 보세요.',
    cardTitle: '프로젝트 편집',
    nameLabel: '프로젝트 이름',
    nameValue: '강좌 설계',
    descLabel: '프로젝트 설명',
    descValue: '이번 학기 강좌 설계 진행 상황을 기록합니다',
    buttons: [
      { id: 'save', label: '변경 사항 저장' },
      { id: 'preview', label: '미리 보기' },
      { id: 'export', label: '내보내기' },
      { id: 'cancel', label: '취소' },
      { id: 'remove', label: '프로젝트 삭제' }
    ],
    hintToggle: '어렵다면 판단하는 순서를 살펴보세요',
    stepsTitle: '버튼의 우선순위를 정하는 세 가지 질문',
    steps: [
      {
        q: '사용자가 이 페이지를 연 목적은 무엇인가요?',
        a: '변경 사항을 저장하는 것입니다. ‘변경 사항 저장’이 유일한 주요 버튼입니다.'
      },
      {
        q: '어떤 조작이 주요 작업을 돕나요?',
        a: '미리 보기, 내보내기, 취소입니다. 테두리 버튼이나 텍스트 버튼을 써서 주요 버튼보다 강조를 줄입니다.'
      },
      {
        q: '어떤 조작은 실행하고 나면 되돌릴 수 없나요?',
        a: '프로젝트 삭제입니다. 경고 색상으로 표시하고 주요 버튼과 떨어뜨려 놓으세요.'
      }
    ],
    feedback: {
      save: '사용자가 ‘프로젝트 편집’을 연 목적은 변경 사항을 저장하는 것입니다. 그래서 ‘변경 사항 저장’이 유일한 주요 버튼입니다.',
      preview:
        '미리 보기는 저장하기 전에 잠깐 확인하는 단계이므로 테두리 버튼이면 충분합니다. 가장 눈에 띄게 만들 필요는 없습니다.',
      export:
        '내보내기는 자주 쓰지 않는 보조 조작이라 텍스트 버튼이면 충분합니다.',
      cancel:
        '취소는 작업에서 빠져나가는 방법입니다. 찾기 쉽게 두되 주요 작업보다 강조를 줄이세요.',
      remove:
        '프로젝트 삭제는 가장 위험한 동작이지만 사용자가 이 페이지를 연 목적은 편집입니다. 빨간색으로 경고하고 가장 눈에 띄는 자리는 주요 버튼에 남겨 두세요.'
    },
    wrongLabel: '다시 생각해 보세요',
    rightLabel: '맞았습니다',
    solvedTitle: '조정 후의 모습',
    solvedNote:
      '이제 한눈에 보입니다. 먼저 저장하고, 적용 전에 확인하려면 미리 보기를 누릅니다. 삭제는 반대편에 따로 있습니다.',
    reset: '다시 풀기'
  },
  fluent: {
    title: '버튼이 많을수록 무엇이 가장 눈에 띄는지 살펴야 합니다',
    subtitle:
      'Fluent 2는 버튼을 Primary, Secondary, Subtle, Transparent의 네 단계로 나눕니다. 아래는 일반적인 백오피스 페이지의 조작 행입니다. 슬라이더를 움직여 버튼 수를 바꾼 다음, 두 방식을 전환해 차이를 살펴보세요.',
    count: '버튼 수',
    styleAll: '모두 Primary로 표시',
    styleLevels: 'Fluent의 네 단계 적용',
    allNote:
      '모두 배경을 채운 Primary 버튼입니다. 버튼이 많아지면 어디부터 봐야 할지 알기 어렵습니다.',
    levelsNote:
      '‘새 프로젝트’만 Primary로 두고, ‘내보내기’는 Secondary로 낮춥니다. 나머지는 강조를 줄여 두었다가 마우스를 올리면 모습을 드러냅니다.',
    legendTitle: '네 단계의 버튼에 마우스를 올려 비교해 보세요',
    levels: [
      { name: 'Primary', desc: '배경을 채웁니다. 한 영역에 하나만 둡니다' },
      {
        name: 'Secondary',
        desc: '테두리를 둡니다. 자주 쓰는 보조 동작에 씁니다'
      },
      {
        name: 'Subtle',
        desc: '보통은 투명하고 마우스를 올리면 옅은 배경이 나타납니다'
      },
      {
        name: 'Transparent',
        desc: '보통은 테두리도 없고 마우스를 올리면 테두리가 나타납니다'
      }
    ],
    actions: [
      { id: 'create', label: '새 프로젝트' },
      { id: 'export', label: '내보내기' },
      { id: 'import', label: '가져오기' },
      { id: 'filter', label: '필터' },
      { id: 'sort', label: '정렬' },
      { id: 'refresh', label: '새로고침' },
      { id: 'share', label: '공유' },
      { id: 'archive', label: '보관' }
    ]
  },
  tokens: {
    title: '값 하나를 바꾸면 두 페이지가 함께 바뀝니다',
    subtitle:
      'Atlassian은 색상, 모서리 둥글기, 크기 같은 값을 디자인 token으로 정의합니다. 모든 페이지는 같은 token의 값을 가져다 씁니다. 오른쪽 슬라이더를 움직인 뒤 ‘페이지마다 따로 설정’을 켜서 두 페이지를 비교해 보세요.',
    pageA: '프로젝트 목록',
    pageB: '계정 설정',
    radius: '모서리 둥글기',
    height: '버튼 높이',
    accent: '주요 색상',
    pixel: '{n}px',
    colors: ['파란색', '초록색', '주황색', '보라색'],
    inconsistent: '페이지마다 따로 설정 (token 사용 안 함)',
    inconsistentNote:
      '이제 오른쪽 페이지는 따로 정한 색상, 모서리 둥글기, 버튼 높이를 씁니다. 하나씩 보면 괜찮지만 나란히 보면 같은 제품처럼 보이지 않습니다.',
    consistentNote:
      '두 페이지는 같은 token을 사용합니다. 슬라이더를 움직였을 때 두 페이지가 함께 바뀌었습니다.',
    mock: {
      list: {
        title: '프로젝트',
        create: '새 프로젝트',
        open: '열기',
        items: [
          { name: '강좌 설계', meta: '문서 · 오늘 업데이트' },
          { name: '조사 노트', meta: '문서 · 3일 전 업데이트' }
        ]
      },
      settings: {
        title: '계정 설정',
        email: '이메일',
        emailValue: 'you@example.com',
        notify: '알림 받기',
        save: '저장',
        cancel: '취소'
      }
    }
  },
  layers3: {
    title: '세 계층을 구분해 보세요',
    subtitle:
      '페이지는 보통 주요 정보, 보조 정보, 보조 조작의 세 계층으로 나뉩니다. 아래 콘텐츠는 그대로입니다. 슬라이더를 움직여 세 계층이 비슷하게 보이다가 뚜렷이 구분되는 과정을 살펴보세요.',
    slider: '계층 간 강조 차이',
    flat: '세 계층이 비슷함: 모두 중요해 보여서 눈에 띄는 요소가 없습니다',
    mid: '어느 정도 구분됨: 제목이 먼저 보이고 이어서 설명이 보입니다',
    full: '뚜렷이 구분됨: 무엇을 먼저 보고 다음에 무엇을 할지 한눈에 들어옵니다',
    labels: ['주요 정보', '보조 정보', '보조 조작'],
    mock: {
      title: '강좌 설계',
      body: '이번 학기 강좌 설계 진행 상황을 기록합니다. 매주 업데이트합니다.',
      meta: '멤버 4명 · 문서 12개 · 어제 업데이트',
      primary: '프로젝트 열기',
      secondary: ['보관', '공유']
    }
  },
  taskflow: {
    title: '같은 페이지, 두 가지 배치 방식',
    subtitle:
      '두 페이지는 같은 여섯 모듈을 사용합니다. 왼쪽은 생각나는 대로 배치했고, 오른쪽은 사용자가 할 일을 중심으로 구성했습니다. 오른쪽 단계에 마우스를 올려 작업이 어떻게 이어지는지 살펴보세요.',
    stacked: '모듈만 나열한 배치',
    task: '작업 흐름에 맞춘 배치',
    taskLine: '사용자 작업: 가장 최근에 작업한 프로젝트를 찾아 이어서 편집하기',
    steps: [
      {
        name: '페이지의 목적 파악하기',
        detail:
          '제목이 한 줄로 페이지의 목적을 알려 주고 가장 먼저 눈에 들어옵니다'
      },
      {
        name: '범위 좁히기',
        detail:
          '필터가 제목 바로 아래에 있어 찾는 프로젝트가 있으면 먼저 목록을 좁힐 수 있습니다'
      },
      {
        name: '프로젝트 찾기',
        detail:
          '프로젝트 목록이 페이지의 핵심이며, 최근에 업데이트한 항목이 먼저 나옵니다'
      },
      {
        name: '조작 시작하기',
        detail: '각 행의 주요 조작은 그 행 바로 옆에 있습니다'
      }
    ],
    modules: {
      title: '프로젝트',
      goal: '모든 프로젝트 관리',
      announce: '공지',
      announceText: '이번 주 토요일 02:00–04:00 정기 점검',
      recommend: '추천',
      recommendText: '새로운 간트 차트 보기를 써 보세요',
      settings: '설정',
      filter: '필터',
      list: '프로젝트 목록',
      open: '열기',
      items: [
        { name: '강좌 설계', meta: '문서 · 오늘 업데이트' },
        { name: '조사 노트', meta: '문서 · 3일 전 업데이트' }
      ]
    }
  },
  roleKinds: {
    title: '흔히 쓰는 다섯 가지 버튼 역할은 어떻게 보일까요?',
    subtitle:
      '위 표의 다섯 역할을 한 줄에 배치했습니다. 크기와 모서리 둥글기는 모두 같고, 채우기와 색상만 다릅니다.',
    items: [
      {
        kind: 'primary',
        name: 'Primary',
        use: '현재 영역에서 가장 중요한 동작',
        sample: '저장'
      },
      {
        kind: 'secondary',
        name: 'Secondary',
        use: '주요 작업을 돕는 동작',
        sample: '미리 보기'
      },
      {
        kind: 'text',
        name: 'Tertiary / Text',
        use: '우선순위가 낮은 조작',
        sample: '자세히 보기'
      },
      {
        kind: 'danger',
        name: 'Destructive',
        use: '삭제하거나 비활성화하는 등 위험한 조작',
        sample: '프로젝트 삭제'
      },
      {
        kind: 'icon',
        name: 'Icon button',
        use: '특정 항목이나 영역에 적용하는 도구 조작',
        sample: '닫기'
      }
    ]
  }
}
