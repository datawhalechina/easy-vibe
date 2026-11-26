export default {
  common: {
    before: 'Trước khi chỉnh',
    after: 'Sau khi chỉnh',
    reset: 'Đặt lại'
  },
  compare: {
    title: 'Cùng một trang, hai cách phân cấp',
    subtitle:
      'Hai bên dùng đúng cùng một văn bản. Tôi chỉ thay đổi cấp bậc. Hãy di chuột lên một vấn đề bên dưới để so sánh hai trang, rồi kéo thanh “Thử nheo mắt”.',
    squint: 'Thử nheo mắt',
    squintHint:
      'Giống như khi bạn nheo mắt nhìn trang, những gì vẫn thấy rõ sau khi hình mờ đi là những gì thu hút sự chú ý nhất.',
    squintClear: 'Rõ nét',
    squintBlurry: 'Mờ',
    issueLabel: 'Bốn vấn đề ở hình bên trái',
    applyHint:
      'Hãy thử các công tắc phía trên hình bên phải. Mỗi lần tắt một công tắc, một vấn đề cũ sẽ xuất hiện lại.',
    tableHead: ['Vấn đề', 'Cách sửa', 'Kết quả'],
    metrics: {
      borders: 'Đường viền trang trí',
      solid: 'Nút nền đặc',
      legend:
        'So sánh các con số trên hai hình. Bên phải có ít đường viền và nút nền đặc hơn hẳn, nhờ vậy tiêu đề và nút chính nổi bật lên.'
    },
    moreMenu: ['Đổi tên', 'Xóa'],
    issues: [
      {
        id: 'type',
        n: '①',
        short: 'Phân tầng bằng cỡ chữ',
        problem:
          'Tiêu đề, bộ lọc và nút chen chúc nhau, tất cả dùng cùng một cỡ chữ',
        fix: 'Tách tiêu đề và bộ lọc thành hai hàng. Tiêu đề dùng chữ lớn nhất, tiếp đến là mô tả, rồi đến các chi tiết như ngày tháng.',
        result: 'Nhìn qua là biết đây là trang gì và nên xem đâu trước'
      },
      {
        id: 'borders',
        n: '②',
        short: 'Giảm đường viền',
        problem:
          'Mỗi module có một đường viền đậm, bên trong lại lồng thêm một lớp viền',
        fix: 'Phân nhóm bằng cách căn hàng và điều chỉnh khoảng cách trước. Chỉ giữ viền ở nơi thực sự cần ranh giới.',
        result:
          'Ít đường kẻ hơn mà vẫn dễ nhận ra những phần thuộc cùng một nhóm'
      },
      {
        id: 'buttons',
        n: '③',
        short: 'Phân cấp nút',
        problem:
          'Cả 8 nút đều có nền đặc nên nút nào cũng trông như thao tác chính',
        fix: 'Mỗi khu vực chỉ giữ một nút chính. Đổi các nút còn lại thành nút viền hoặc nút văn bản.',
        result: 'Nhìn qua là biết nên nhấn vào đâu tiếp theo'
      },
      {
        id: 'scope',
        n: '④',
        short: 'Đặt thao tác đúng chỗ',
        problem:
          '“Xóa” chỉ ảnh hưởng đến một dự án nhưng lại nằm cạnh thao tác áp dụng cho cả trang như “Tạo dự án”',
        fix: 'Đặt thao tác ảnh hưởng đến cả trang ở khu vực chung. Đặt thao tác chỉ ảnh hưởng đến một mục cạnh chính mục đó.',
        result: 'Có thể xác định chính xác từng nút ảnh hưởng đến đối tượng nào'
      }
    ],
    mock: {
      pageTitle: 'Dự án',
      count: '2 dự án',
      filters: ['Tất cả', 'Đang thực hiện'],
      sort: 'Cập nhật gần đây',
      create: 'Tạo dự án',
      export: 'Xuất',
      remove: 'Xóa',
      open: 'Mở',
      more: 'Thao tác thêm',
      items: [
        {
          name: 'Thiết kế khóa học',
          meta: 'Tài liệu · cập nhật hôm nay'
        },
        {
          name: 'Ghi chú nghiên cứu',
          meta: 'Tài liệu · cập nhật 3 ngày trước'
        }
      ]
    }
  },
  anatomy: {
    title: 'Cấu tạo của trang: bốn tầng, mỗi tầng một nhiệm vụ',
    subtitle:
      'Di chuột lên một tầng bên dưới để xem vị trí của nó trên trang bên phải. Nhấp để giữ vùng đánh dấu.',
    taskLabel: 'Nhiệm vụ',
    meansLabel: 'Cách thể hiện',
    showLabels: 'Hiện nhãn',
    showGuides: 'Hiện đường căn',
    guidesNote:
      'Khi bật đường căn, bạn sẽ thấy mọi nội dung đều bắt đầu trên cùng một đường dọc. Nội dung liên quan nằm sát nhau, còn các tầng khác nhau được đặt cách xa hơn.',
    gap: 'Khoảng cách',
    typeTitle: 'Ba dòng bên dưới được phân cấp bằng cỡ chữ, độ đậm và sắc độ',
    typeSample: 'Ví dụ',
    layers: [
      {
        id: 'locate',
        name: 'Tầng định vị',
        task: 'Cho người dùng biết họ đang ở đâu và quay lại bằng cách nào',
        means: 'Tiêu đề điều hướng vừa phải cùng một cách quay lại quen thuộc'
      },
      {
        id: 'primary',
        name: 'Tầng thông tin chính',
        task: 'Cho người dùng biết nội dung quan trọng nhất của trang',
        means: 'Cỡ chữ lớn nhất trang, khoảng trắng phía sau và vị trí cố định'
      },
      {
        id: 'support',
        name: 'Tầng thông tin phụ trợ',
        task: 'Bổ sung ngữ cảnh và siêu dữ liệu',
        means:
          'Chữ nhỏ và nhạt hơn nhưng vẫn dễ đọc, đặt sát nội dung mà nó giải thích'
      },
      {
        id: 'action',
        name: 'Tầng thao tác',
        task: 'Cho người dùng biết họ có thể làm gì tiếp theo',
        means:
          'Một nút chính nền đặc, các nút khác ít nổi bật hơn, tất cả đặt sau nội dung'
      }
    ],
    typeScale: [
      {
        name: 'Tiêu đề nội dung',
        px: 22,
        weight: 700,
        note: 'Chỉ xuất hiện một lần trên trang'
      },
      {
        name: 'Nội dung chính',
        px: 14,
        weight: 400,
        note: 'Dùng để đọc nên khoảng cách dòng rộng hơn một chút'
      },
      {
        name: 'Thông tin phụ trợ',
        px: 12,
        weight: 400,
        note: 'Chữ nhỏ và nhạt hơn, đây là cỡ nhỏ nhất nên dùng'
      }
    ],
    mock: {
      back: 'Quay lại',
      navTitle: 'Dự án',
      title: 'Thiết kế khóa học',
      meta: '4 thành viên · 12 tài liệu · cập nhật hôm qua',
      body: 'Theo dõi tiến độ thiết kế khóa học trong học kỳ này, cập nhật hằng tuần.',
      link: 'Xem tất cả tài liệu',
      primary: 'Mở dự án',
      secondary: 'Lưu trữ'
    }
  },
  grouping: {
    title: 'Có cần thêm đường viền không? Hãy xem qua ba bước',
    subtitle:
      'Bên dưới là cùng một biểu mẫu cài đặt. Hãy nhấp lần lượt vào ba bước để xem các nhóm bắt đầu rõ lên từ đâu.',
    stepLabel: 'Bước {n}',
    metricBorders: 'Đường viền trang trí',
    metricGaps: 'Số mức khoảng cách',
    showGaps: 'Hiện khoảng cách',
    explicitToggle: 'Thêm nền màu nhạt cho “Thông báo”',
    implicitTitle: 'Phân nhóm ngầm',
    implicitText:
      'Khoảng cách, căn hàng và khoảng trắng giúp các nội dung liên quan trông như một nhóm, dù không có khung.',
    explicitTitle: 'Phân nhóm rõ bằng nền hoặc viền',
    explicitText:
      'Màu nền hoặc đường viền giúp một nhóm có ranh giới rõ hơn. Trước khi thêm, hãy tự hỏi nhóm này có thực sự cần ranh giới không.',
    gapInside: 'Trong nhóm',
    gapBetween: 'Giữa các nhóm',
    steps: [
      {
        caption:
          'Bước một, viền quanh mọi thứ. Yếu tố nào cũng hô “tôi quan trọng”, thành ra khó nhận ra những phần thuộc cùng một nhóm.'
      },
      {
        caption:
          'Bước hai, chỉ bỏ đường viền. Trang dịu mắt hơn, nhưng các khoảng cách vẫn bằng nhau nên nội dung trông rời rạc.'
      },
      {
        caption:
          'Bước ba, phân nhóm bằng khoảng cách. Đưa những mục liên quan lại gần nhau và tách các mục không liên quan ra. Dù chẳng có đường kẻ nào, bạn đã nhìn ra từng nhóm.'
      }
    ],
    mock: {
      pageTitle: 'Cài đặt tài khoản',
      basic: 'Thông tin cơ bản',
      email: 'Email',
      phone: 'Số điện thoại',
      password: 'Đổi mật khẩu',
      newPassword: 'Mật khẩu mới',
      confirm: 'Xác nhận mật khẩu',
      notify: 'Thông báo',
      mail: 'Thông báo qua email',
      desktop: 'Thông báo trên máy tính',
      save: 'Lưu',
      cancel: 'Hủy'
    }
  },
  buttonSpec: {
    title: 'Định nghĩa đầy đủ của một nút bấm',
    subtitle:
      '“Thêm một nút” nghe đơn giản, nhưng trong quy chuẩn thiết kế, yêu cầu này được tách thành 10 câu hỏi. Hãy mở từng mục bên trái để xem cần mô tả chi tiết đến đâu.',
    questionLabel: 'Quy chuẩn hỏi gì',
    sampleLabel: 'Ví dụ cách viết',
    sourceLabel: 'Xem nguyên văn',
    rolesRule:
      'Vai trò cho biết điều gì sẽ xảy ra khi nhấn nút, còn độ nổi bật thể hiện tầm quan trọng. Vì vậy, dù xóa là thao tác nguy hiểm, nút Xóa vẫn không nên nổi bật nhất trang.',
    structureRule:
      'Hãy bắt đầu nhãn bằng động từ. “Lưu bản nháp” cho biết ngay điều sẽ xảy ra khi nhấn, trong khi “Xác nhận” còn khá mơ hồ.',
    visualRule:
      'Phong cách quyết định mức độ nổi bật. Vai trò quyết định điều sẽ xảy ra khi nhấn. Hãy xem xét riêng hai điều này.',
    sizeRule:
      'Nút có thể trông nhỏ, miễn là vùng ngón tay có thể chạm đủ lớn. Vì vậy, cần định nghĩa riêng hai kích thước này.',
    sizeVisible: 'Chiều cao nhìn thấy',
    sizeTarget: 'Vùng có thể nhấn',
    statesRule:
      'Hãy định nghĩa trước mọi trạng thái và dùng thêm dấu hiệu ngoài màu sắc để phân biệt chúng.',
    behaviorRule:
      'Sau khi nhấn, người dùng cần biết chuyện gì đang xảy ra. Hãy phản hồi ngay, hiển thị thông báo trong lúc chờ và hướng dẫn bước tiếp theo nếu thao tác thất bại.',
    adaptiveRule:
      'Hãy thử kéo thanh trượt phía trên. Khi chữ lớn lên, nút sẽ cao thêm và nhãn tự xuống dòng để hiển thị đầy đủ.',
    a11yRule:
      'Người dùng vẫn phải sử dụng được nút khi chỉ dùng bàn phím hoặc không nhìn thấy màn hình.',
    boundaryRule:
      'Quy chuẩn cũng phải chỉ rõ những trường hợp nên tránh dùng component. Điều đó quan trọng ngang với việc mô tả component làm được gì.',
    a11yNoName: 'Trình đọc màn hình đọc “nút”',
    a11yWithName: 'Trình đọc màn hình đọc “Xóa, nút”',
    fontSize: 'Cỡ chữ',
    dimsLabel: 'Các mục cần định nghĩa',
    purposeExamples: ['Lưu', 'Gửi', 'Xóa'],
    purposeLine:
      'Ba nút này trông khác nhau nhưng có một điểm chung. Mỗi nút thực hiện ngay một thao tác khi bạn nhấn.',
    roleSamples: {
      Normal: 'Xem trước',
      Primary: 'Xuất bản',
      Cancel: 'Hủy',
      Destructive: 'Xóa dự án'
    },
    anatomyBtn: 'Xuất bản dự án',
    genericBtn: 'Tiếp tục',
    deleteLabel: 'Xóa',
    roles: [
      {
        name: 'Normal',
        desc: 'Thao tác thông thường, không cần nhấn mạnh thêm'
      },
      {
        name: 'Primary',
        desc: 'Thao tác nên thực hiện ngay, mỗi màn hình có một hoặc hai nút như vậy'
      },
      {
        name: 'Cancel',
        desc: 'Cho phép người dùng dừng lại mà không lấn át nút chính'
      },
      {
        name: 'Destructive',
        desc: 'Thao tác không thể hoàn tác, cần màu cảnh báo và không chọn làm mặc định'
      }
    ],
    parts: [
      {
        name: 'Vùng chứa',
        desc: 'Phần thân của nút, quyết định màu sắc, kích thước và thay đổi khi nhấn'
      },
      {
        name: 'Biểu tượng',
        desc: 'Không bắt buộc, giúp nhận ra ngay công dụng của nút'
      },
      {
        name: 'Nhãn',
        desc: 'Nói rõ điều sẽ xảy ra khi nhấn'
      }
    ],
    levels: [
      {
        name: 'Filled',
        desc: 'Nổi bật nhất, dành cho thao tác quan trọng nhất lúc này'
      },
      {
        name: 'Tonal',
        desc: 'Nổi bật hơn nút viền một chút, dành cho thao tác phụ vẫn cần được chú ý'
      },
      {
        name: 'Outlined',
        desc: 'Dành cho thao tác thay thế đặt cạnh nút nền đặc'
      },
      {
        name: 'Text',
        desc: 'Ít nổi bật nhất, dành cho lối vào phụ trợ'
      }
    ],
    stateGallery: [
      'Mặc định',
      'Rê chuột',
      'Đang nhấn',
      'Có tiêu điểm',
      'Bị vô hiệu hóa'
    ],
    behaviorStages: [
      'Sẵn sàng',
      'Đã nhấn',
      'Đang xử lý',
      'Hoàn tất / thất bại'
    ],
    a11yChecks: [
      'Có tên truy cập, kể cả nút chỉ có biểu tượng',
      'Có thể đưa tiêu điểm đến nút bằng bàn phím và nhìn rõ dấu hiệu tiêu điểm',
      'Văn bản và nền có đủ độ tương phản',
      'Trạng thái có thêm dấu hiệu ngoài màu sắc'
    ],
    boundaries: [
      {
        want: 'Đi sang trang khác',
        use: 'Liên kết, tab'
      },
      {
        want: 'Chuyển giữa hai trạng thái',
        use: 'Công tắc, nút bật/tắt'
      },
      {
        want: 'Chọn một trong vài giá trị',
        use: 'Nút Pop-up, bộ chọn'
      },
      {
        want: 'Gom các lệnh ít dùng',
        use: 'Menu'
      }
    ],
    boundaryWant: 'Việc bạn muốn làm',
    boundaryUse: 'Component phù hợp hơn',
    dims: [
      {
        id: 'purpose',
        name: 'Mục đích',
        question: 'Yếu tố này giải quyết vấn đề gì?',
        sample:
          'Nút “Xuất bản” gửi dự án hiện tại. Khi thành công, trạng thái dự án chuyển thành đã xuất bản.',
        source: {
          label: 'Atlassian · Button',
          url: 'https://atlassian.design/components/button/'
        }
      },
      {
        id: 'role',
        name: 'Vai trò',
        question: 'Nó thể hiện thao tác, lựa chọn hay điều hướng?',
        sample:
          '“Xóa dự án” có vai trò Destructive, dùng kiểu Outlined và không được đặt làm nút mặc định.',
        source: {
          label: 'Apple HIG · Buttons',
          url: 'https://developer.apple.com/design/human-interface-guidelines/buttons'
        }
      },
      {
        id: 'structure',
        name: 'Cấu trúc',
        question: 'Nút gồm những phần nào?',
        sample:
          'Nút gồm vùng chứa, biểu tượng tùy chọn và nhãn. Nhãn là một cụm động từ trên một dòng.',
        source: {
          label: 'Material 3 · Buttons',
          url: 'https://m3.material.io/components/buttons/guidelines'
        }
      },
      {
        id: 'visual',
        name: 'Thị giác',
        question: 'Dùng gì để thể hiện cấp bậc?',
        sample:
          'Trên trang này, chỉ “Xuất bản” dùng Filled. Các thao tác còn lại dùng Outlined hoặc Text.',
        source: {
          label: 'Fluent 2 · Button usage',
          url: 'https://fluent2.microsoft.design/components/web/react/core/button/usage'
        }
      },
      {
        id: 'size',
        name: 'Kích thước',
        question: 'Cần tuân theo những giới hạn nào khi bố trí?',
        sample:
          'Chiều cao nhìn thấy là 40, vùng có thể nhấn tối thiểu là 44×44. Các nút trong cùng nhóm có chiều cao bằng nhau và cách nhau 8.',
        source: {
          label: 'Apple HIG · Layout',
          url: 'https://developer.apple.com/design/human-interface-guidelines/layout'
        }
      },
      {
        id: 'states',
        name: 'Trạng thái',
        question: 'Nút hiển thị gì trong từng trường hợp?',
        sample:
          'Định nghĩa sáu trạng thái gồm mặc định, rê chuột, đang nhấn, có tiêu điểm, bị vô hiệu hóa và đang tải.',
        source: {
          label: 'Material 3 · Buttons',
          url: 'https://m3.material.io/components/buttons/overview'
        }
      },
      {
        id: 'behavior',
        name: 'Hành vi',
        question: 'Điều gì xảy ra sau khi kích hoạt?',
        sample:
          'Ngay khi nhấn, nút chuyển sang trạng thái đang tải và chặn gửi trùng. Khi xử lý xong, nút báo kết quả.',
        source: {
          label: 'Apple HIG · Feedback',
          url: 'https://developer.apple.com/design/human-interface-guidelines/feedback'
        }
      },
      {
        id: 'adaptive',
        name: 'Khả năng thích ứng',
        question:
          'Làm sao để nút vẫn dùng được khi điều kiện hiển thị thay đổi?',
        sample:
          'Khi tăng cỡ chữ, cho phép nhãn xuống thành hai dòng và tăng chiều cao nút theo.',
        source: {
          label: 'Material 3 · Buttons accessibility',
          url: 'https://m3.material.io/components/buttons/accessibility'
        }
      },
      {
        id: 'a11y',
        name: 'Khả năng tiếp cận',
        question:
          'Có thể thao tác mà không phụ thuộc vào một giác quan cụ thể không?',
        sample:
          'Nút biểu tượng có tên truy cập “Xóa”. Thứ tự tiêu điểm khớp với thứ tự hiển thị.',
        source: {
          label: 'Apple HIG · Accessibility',
          url: 'https://developer.apple.com/design/human-interface-guidelines/accessibility'
        }
      },
      {
        id: 'boundary',
        name: 'Ranh giới',
        question: 'Khi nào nên tránh dùng nút?',
        sample:
          'Dùng liên kết để chuyển sang trang khác. Dùng công tắc để chuyển giữa hai giá trị.',
        source: {
          label: 'Fluent 2 · Menu usage',
          url: 'https://fluent2.microsoft.design/components/web/react/core/menu/usage'
        }
      }
    ]
  },
  buttonStates: {
    title: 'Trạng thái và hành vi của nút',
    subtitle:
      'Trạng thái là dáng vẻ của nút lúc này. Hành vi là điều xảy ra sau khi bạn nhấn.',
    statesTitle: 'Trước hết, hãy xem sáu trạng thái',
    stateHead: [
      'Trạng thái',
      'Khi nào xuất hiện',
      'Hình thức thay đổi thế nào',
      'Lưu ý'
    ],
    liveHint:
      'Hãy di chuột lên nút này, nhấn giữ hoặc dùng phím Tab để đưa tiêu điểm đến nút. Quan sát xem nút thay đổi thế nào trong mỗi trường hợp.',
    currentState: 'Trạng thái hiện tại',
    sample: 'Nút',
    stateNames: {
      default: 'Mặc định',
      hover: 'Rê chuột',
      pressed: 'Đang nhấn',
      focus: 'Có tiêu điểm'
    },
    states: [
      {
        id: 'default',
        name: 'Mặc định',
        trigger: 'Khi chưa tương tác',
        change: 'Hình thức bình thường',
        tip: 'Phần lớn nút trên trang ở trạng thái này'
      },
      {
        id: 'hover',
        name: 'Rê chuột',
        trigger: 'Con trỏ di vào nút',
        change: 'Nền đậm hơn một chút',
        tip: 'Cho người dùng biết có thể nhấn vào đây'
      },
      {
        id: 'pressed',
        name: 'Đang nhấn',
        trigger: 'Đã nhấn nhưng chưa thả',
        change: 'Nền đậm thêm',
        tip: 'Nếu tự thiết kế nút, bạn cần tự thêm trạng thái này'
      },
      {
        id: 'focus',
        name: 'Có tiêu điểm',
        trigger: 'Dùng phím Tab để đưa tiêu điểm đến nút',
        change: 'Xuất hiện vòng chỉ báo tiêu điểm quanh nút',
        tip: 'Giữ vòng chỉ báo tiêu điểm, tránh xóa nó bằng outline: none'
      },
      {
        id: 'disabled',
        name: 'Bị vô hiệu hóa',
        trigger: 'Khi chưa đáp ứng điều kiện',
        change: 'Giảm độ đục và không phản hồi khi nhấn',
        tip: 'Nên giải thích thêm vì sao chưa thể nhấn'
      },
      {
        id: 'loading',
        name: 'Đang tải',
        trigger: 'Thao tác đã bắt đầu và chưa hoàn tất',
        change:
          'Nhãn chuyển sang trạng thái đang xử lý và xuất hiện chỉ báo tải',
        tip: 'Trạng thái này báo rằng hệ thống đang xử lý thao tác. Trạng thái bị vô hiệu hóa mới cho biết không thể nhấn nút.'
      }
    ],
    behaviorTitle: 'Tiếp theo, xem điều gì xảy ra sau khi nhấn',
    behaviorHint:
      'Nhấn “Xuất bản dự án” một lần để xem từng bước từ lúc nhấn đến khi có kết quả.',
    scenario: 'Kết quả mô phỏng',
    scenarioSuccess: 'Thành công',
    scenarioFail: 'Thất bại',
    run: 'Xuất bản dự án',
    running: 'Đang xuất bản…',
    done: 'Đã xuất bản',
    failed: 'Xuất bản thất bại, nội dung vẫn được giữ',
    retry: 'Thử lại',
    stageHead: ['Giai đoạn', 'Điều người dùng cần biết'],
    stages: [
      {
        name: 'Sẵn sàng',
        desc: 'Trước khi nhấn, nút cho tôi biết điều gì sẽ xảy ra'
      },
      {
        name: 'Phản hồi tức thì',
        desc: 'Ngay khi nhấn, hình thức thay đổi để tôi biết hệ thống đã nhận thao tác'
      },
      {
        name: 'Đang xử lý',
        desc: 'Trong lúc chờ, có chỉ báo tiến độ và hệ thống chặn các lần nhấn lặp lại'
      },
      {
        name: 'Kết quả',
        desc: 'Báo rõ khi thành công và hướng dẫn bước tiếp theo nếu thất bại'
      },
      {
        name: 'Khôi phục',
        desc: 'Nếu thất bại, nội dung tôi đã nhập vẫn còn để thử lại ngay'
      }
    ],
    rulesTitle: 'Bốn quy tắc',
    rules: [
      'Phản hồi ngay khi người dùng nhấn, dù chỉ là làm nút đậm hơn một chút',
      'Hiện chỉ báo trong lúc chờ để người dùng biết trang vẫn hoạt động',
      'Đang tải nghĩa là hệ thống đang xử lý. Bị vô hiệu hóa nghĩa là chưa thể nhấn nút',
      'Đổi nhãn theo trạng thái. Trước khi nhấn là “Xuất bản dự án”, sau khi nhấn là “Đang xuất bản…”'
    ]
  },
  lookalike: {
    title:
      'Hai điều khiển giống nhau về hình thức, khác nhau về cách hoạt động',
    subtitle:
      'Hai điều khiển bên dưới trông gần như giống hệt nhau. Hãy mở từng cái và chọn một mục để xem chúng khác nhau ở đâu.',
    popupTag: 'Chọn một giá trị',
    pullTag: 'Thực thi một lệnh',
    popupInitial: 'Sắp xếp: Mới nhất',
    popupPrefix: 'Sắp xếp: ',
    popupOptions: ['Mới nhất', 'Cũ nhất', 'Tên'],
    pullInitial: 'Thao tác',
    pullOptions: ['Đổi tên', 'Sao chép liên kết', 'Xóa'],
    pullDone: 'Đã thực hiện: {name}',
    popupValue: 'Giá trị hiện tại: {value}',
    pullIdle: 'Chưa thực hiện lệnh nào',
    tableHead: ['', 'Nút Pop-up', 'Nút Pull-down'],
    rows: [
      [
        'Khi mở',
        'Hiện các tùy chọn và đánh dấu mục đang chọn',
        'Hiện các lệnh có thể thực thi'
      ],
      [
        'Sau khi chọn một mục',
        'Ghi nhớ lựa chọn và cập nhật nhãn trên nút',
        'Thực thi lệnh rồi đóng lại, nhãn trên nút giữ nguyên'
      ],
      [
        'Phù hợp để',
        'Đổi thứ tự sắp xếp, chọn chế độ xem hoặc chọn một tùy chọn',
        'Thực hiện các thao tác như đổi tên, xuất hoặc xóa'
      ],
      ['Tránh dùng để', 'Chứa các lệnh', 'Lọc hoặc điều hướng']
    ],
    conclusion:
      'Bạn thấy sự khác biệt chưa? Hai điều khiển trông giống nhau, nhưng khi bạn nhấn, bên trái đổi một giá trị còn bên phải thực thi một lệnh. Lần sau khi phân vân, hãy tự hỏi người dùng muốn chọn một giá trị hay muốn thực hiện một thao tác.'
  },
  skeleton: {
    title: 'Phân tích một trang theo điều hướng, nội dung và thao tác',
    subtitle:
      'Bên dưới là một trang danh sách dự án thông thường. Hãy di chuột lên một mục bên trái, hoặc nhấp để giữ vùng đánh dấu. Đường liền chỉ vị trí của mục đó, đường nét đứt chỉ phần nó ảnh hưởng.',
    legendCtl: 'Đường liền chỉ vị trí',
    legendAffect: 'Đường nét đứt chỉ phạm vi ảnh hưởng',
    leading: 'Nút quay lại và tiêu đề nằm bên trái',
    trailing: 'Thao tác nằm bên phải, chỉ một nút nổi bật',
    taskLabel: 'Câu hỏi cần trả lời',
    affectLabel: 'Phạm vi ảnh hưởng',
    misplacedToggle: 'Thử chuyển nút Xóa lên thanh trên cùng',
    misplacedHint:
      'Giờ “Xóa” nằm cạnh “Tạo dự án” trên thanh trên cùng. Khi nhấn vào, bạn sẽ xóa dự án nào? Vị trí đó không cho biết câu trả lời. Vì vậy, hãy đặt thao tác cạnh nội dung mà nó ảnh hưởng.',
    items: [
      {
        id: 'global',
        name: 'Điều hướng toàn cục',
        question: 'Tôi muốn đến khu vực nào của sản phẩm?',
        affect: 'Toàn bộ trang chuyển sang khu vực khác'
      },
      {
        id: 'locate',
        name: 'Tiêu đề trang',
        question: 'Tôi đang ở trang nào và quay lại bằng cách nào?',
        affect: 'Trang hiện tại'
      },
      {
        id: 'content',
        name: 'Khu vực nội dung chính',
        question: 'Tôi đang xem gì?',
        affect: 'Đây là phần nội dung chịu tác động của các điều khiển khác'
      },
      {
        id: 'listctl',
        name: 'Lọc và sắp xếp',
        question: 'Tôi muốn xem danh sách này theo cách nào?',
        affect: 'Danh sách hiển thị những dự án nào và theo thứ tự nào'
      },
      {
        id: 'pageact',
        name: 'Thao tác cấp trang',
        question: 'Tôi muốn làm gì với cả trang?',
        affect: 'Tất cả dự án trong danh sách'
      },
      {
        id: 'itemact',
        name: 'Thao tác cấp mục',
        question: 'Tôi muốn làm gì với một mục cụ thể?',
        affect: 'Chỉ dự án đó'
      }
    ],
    mock: {
      nav: ['Dự án', 'Thành viên', 'Cài đặt'],
      title: 'Dự án',
      section: 'Dự án gần đây',
      filters: ['Tất cả', 'Đang thực hiện'],
      sort: 'Cập nhật gần đây',
      export: 'Xuất',
      create: 'Tạo dự án',
      remove: 'Xóa',
      open: 'Mở',
      more: 'Thao tác thêm',
      items: [
        {
          name: 'Thiết kế khóa học',
          meta: 'Tài liệu · cập nhật hôm nay'
        },
        {
          name: 'Ghi chú nghiên cứu',
          meta: 'Tài liệu · cập nhật 3 ngày trước'
        }
      ]
    }
  },
  specMap: {
    title: 'Có gì trong một bộ quy chuẩn thiết kế?',
    subtitle:
      'Nhiều người nghĩ quy chuẩn thiết kế chỉ nói về màu sắc và bo góc. Hãy cùng đếm các mục trong quy chuẩn Apple. Có 6 nhóm lớn và 158 chủ đề. Bạn có thể nhấp vào một chủ đề bên dưới hoặc dùng công tắc bên trên để lọc các chủ đề liên quan đến trang và nút bấm.',
    checkedAt:
      'Đã đối chiếu các nhóm và số lượng chủ đề với mục lục Apple HIG vào tháng 11 năm 2026',
    all: 'Tất cả chủ đề',
    page: 'Liên quan đến trang',
    button: 'Liên quan đến nút',
    topicsUnit: 'chủ đề',
    moreTopics: 'Còn {n} mục',
    pick: 'Nhấp vào một chủ đề để xem chủ đề đó giải đáp câu hỏi gì',
    questionLabel: 'Câu hỏi cần trả lời',
    relPage: 'Bạn sẽ dùng chủ đề này trong phần thiết kế trang của chương',
    relButton: 'Bạn sẽ dùng chủ đề này trong phần thiết kế nút của chương',
    relNone:
      'Bạn sẽ gặp chủ đề này khi làm sản phẩm, dù chương này chưa cần đến',
    relPageShort: 'Liên quan đến trang',
    relButtonShort: 'Liên quan đến nút',
    relBoth: 'Dùng cho cả trang và nút',
    paraphraseNote:
      'Các câu hỏi là bản diễn giải bằng lời dễ hiểu của chúng tôi, khác với nguyên văn chính thức.',
    takeaway:
      'Đếm xong, bạn sẽ thấy cấp bậc trang và nút bấm chỉ chiếm một phần nhỏ. Hiểu được phần này, bạn sẽ có tiêu chí để tự đọc và hiểu các chủ đề còn lại.',
    categories: [
      {
        id: 'getting-started',
        name: 'Nhập môn và nền tảng thiết bị',
        en: 'Getting started',
        count: 9,
        topics: [
          {
            name: 'Nguyên tắc thiết kế',
            rel: 'both',
            q: 'Dựa vào đâu để đánh giá một giao diện vừa dễ dùng vừa đẹp?'
          },
          {
            name: 'Thiết kế cho iOS',
            rel: '',
            q: 'Khi thiết kế cho điện thoại, cần đặc biệt lưu ý điều gì?'
          },
          {
            name: 'Thiết kế cho macOS',
            rel: '',
            q: 'Thiết kế cho máy tính khác thiết kế cho điện thoại thế nào?'
          }
        ]
      },
      {
        id: 'foundations',
        name: 'Quy chuẩn nền tảng',
        en: 'Foundations',
        count: 18,
        topics: [
          {
            name: 'Bố cục',
            rel: 'page',
            q: 'Nên sắp xếp các phần trên trang thế nào để phù hợp với nhiều kích thước màn hình?'
          },
          {
            name: 'Kiểu chữ',
            rel: 'page',
            q: 'Nên dùng cỡ chữ và độ đậm nào để người dùng phân biệt nội dung chính và phụ?'
          },
          {
            name: 'Màu sắc',
            rel: 'both',
            q: 'Dùng từng màu ở đâu và điều chỉnh ra sao trong chế độ tối?'
          },
          {
            name: 'Khả năng tiếp cận',
            rel: 'both',
            q: 'Người khiếm thị, người nghe kém hoặc người chỉ dùng bàn phím có thể sử dụng sản phẩm thế nào?'
          },
          {
            name: 'Biểu tượng',
            rel: 'button',
            q: 'Biểu tượng nên có phong cách và kích thước ra sao, và khi nào cần kèm nhãn văn bản?'
          },
          {
            name: 'Văn bản giao diện',
            rel: 'both',
            q: 'Viết nhãn nút và thông báo thế nào để người dùng vừa nhìn đã hiểu?'
          },
          {
            name: 'Hiệu ứng chuyển động',
            rel: '',
            q: 'Khi nào cần chuyển động và thiết kế thế nào để người dùng vẫn tập trung?'
          }
        ]
      },
      {
        id: 'patterns',
        name: 'Mẫu tương tác',
        en: 'Patterns',
        count: 25,
        topics: [
          {
            name: 'Phản hồi',
            rel: 'button',
            q: 'Làm sao để người dùng biết hệ thống đã nhận thao tác nhấn?'
          },
          {
            name: 'Tải dữ liệu',
            rel: 'both',
            q: 'Nên hiển thị gì trong lúc chờ để người dùng biết trang vẫn hoạt động?'
          },
          {
            name: 'Hoàn tác và làm lại',
            rel: 'both',
            q: 'Làm sao quay lại khi thao tác nhầm, và thao tác nào có thể thực hiện ngay mà không cần xác nhận?'
          },
          {
            name: 'Chế độ tương tác riêng',
            rel: 'page',
            q: 'Khi nào có thể ngắt luồng hiện tại của người dùng và làm sao để họ quay lại?'
          },
          {
            name: 'Tìm kiếm',
            rel: 'page',
            q: 'Làm sao giúp người dùng nhanh chóng tìm được thứ họ cần?'
          },
          {
            name: 'Cài đặt',
            rel: 'page',
            q: 'Nên tổ chức trang cài đặt thế nào để người dùng dễ tìm đúng mục?'
          }
        ]
      },
      {
        id: 'components',
        name: 'Component',
        en: 'Components',
        count: 64,
        topics: [
          {
            name: 'Nút bấm',
            rel: 'button',
            q: 'Thao tác nào nên dùng nút, và nút có những trạng thái nào?'
          },
          {
            name: 'Thanh công cụ',
            rel: 'page',
            q: 'Nên phân nhóm các thao tác trên một hàng thế nào, và thao tác nào nên đặt ở vị trí nổi bật nhất?'
          },
          {
            name: 'Menu',
            rel: 'button',
            q: 'Làm sao gom nhiều lệnh vào một chỗ, và khi nào nên tránh dùng menu?'
          },
          {
            name: 'Cảnh báo',
            rel: 'both',
            q: 'Thông tin nào đủ quan trọng để ngắt luồng thao tác của người dùng?'
          },
          {
            name: 'Danh sách và bảng',
            rel: 'page',
            q: 'Nên bố trí nhiều dòng dữ liệu thế nào để người dùng dễ đọc lướt?'
          },
          {
            name: 'Công tắc',
            rel: 'button',
            q: 'Dùng điều khiển nào để chuyển giữa hai trạng thái?'
          },
          {
            name: 'Bộ chọn',
            rel: 'button',
            q: 'Dùng điều khiển nào để chọn một trong vài giá trị?'
          }
        ]
      },
      {
        id: 'inputs',
        name: 'Phương thức nhập',
        en: 'Inputs',
        count: 13,
        topics: [
          {
            name: 'Cử chỉ',
            rel: '',
            q: 'Thao tác nào có thể thực hiện bằng cách vuốt hoặc chạm?'
          },
          {
            name: 'Bàn phím',
            rel: 'both',
            q: 'Có thể thực hiện cả quy trình chỉ bằng bàn phím không?'
          },
          {
            name: 'Thiết bị trỏ',
            rel: 'both',
            q: 'Điều khiển nên phản hồi thế nào khi con trỏ di vào hoặc khi người dùng nhấn?'
          }
        ]
      },
      {
        id: 'technologies',
        name: 'Công nghệ và dịch vụ',
        en: 'Technologies',
        count: 29,
        topics: [
          {
            name: 'Thông báo',
            rel: '',
            q: 'Khi nào nên gửi thông báo và viết thế nào để tránh làm phiền người dùng?'
          },
          {
            name: 'Tiện ích',
            rel: '',
            q: 'Tiện ích trên màn hình chính nên hiển thị bao nhiêu nội dung?'
          },
          {
            name: 'Siri',
            rel: '',
            q: 'Người dùng có thể thực hiện những thao tác nào bằng giọng nói?'
          }
        ]
      }
    ]
  },
  decision: {
    title: 'Đến lượt bạn: nút nào nên là nút chính?',
    subtitle:
      'Bên dưới là trang “Chỉnh sửa dự án”. Để thấy rõ vấn đề, tôi thiết kế cả 5 nút giống hệt nhau. Hãy nhấn nút bạn nghĩ nên nổi bật nhất.',
    cardTitle: 'Chỉnh sửa dự án',
    nameLabel: 'Tên dự án',
    nameValue: 'Thiết kế khóa học',
    descLabel: 'Mô tả dự án',
    descValue: 'Theo dõi tiến độ thiết kế khóa học trong học kỳ này',
    buttons: [
      {
        id: 'save',
        label: 'Lưu thay đổi'
      },
      {
        id: 'preview',
        label: 'Xem trước'
      },
      {
        id: 'export',
        label: 'Xuất'
      },
      {
        id: 'cancel',
        label: 'Hủy'
      },
      {
        id: 'remove',
        label: 'Xóa dự án'
      }
    ],
    hintToggle: 'Chưa chọn được? Hãy xem các bước để quyết định',
    stepsTitle: 'Ba câu hỏi để phân nút chính và nút phụ',
    steps: [
      {
        q: 'Người dùng mở trang này để hoàn thành việc gì nhất?',
        a: 'Họ muốn “Lưu thay đổi”. Đây là nút chính duy nhất.'
      },
      {
        q: 'Thao tác nào chỉ có vai trò hỗ trợ?',
        a: 'Xem trước, xuất và hủy. Dùng nút viền hoặc nút văn bản để chúng nhường sự chú ý cho nút chính.'
      },
      {
        q: 'Thao tác nào không thể hoàn tác?',
        a: 'Xóa dự án. Dùng màu cảnh báo và đặt nút này cách xa nút chính.'
      }
    ],
    feedback: {
      save: 'Người dùng mở trang “Chỉnh sửa dự án” để lưu các thay đổi, nên đây là nút chính duy nhất.',
      preview:
        'Xem trước là bước hỗ trợ để kiểm tra trước khi lưu. Dùng nút viền là đủ.',
      export: 'Xuất là thao tác hỗ trợ ít dùng hơn. Dùng nút văn bản là đủ.',
      cancel:
        'Hủy giúp người dùng thoát khỏi trang. Nút này cần dễ tìm, còn nhiệm vụ chính vẫn nên nổi bật hơn.',
      remove:
        'Xóa dự án là thao tác nguy hiểm nhất, nhưng người dùng mở trang này để chỉnh sửa. Màu đỏ đủ để cảnh báo, còn vị trí nút chính dành cho thao tác lưu.'
    },
    wrongLabel: 'Chưa đúng lắm',
    rightLabel: 'Bạn chọn đúng rồi',
    solvedTitle: 'Sau khi chỉnh',
    solvedNote:
      'Giờ nhìn qua là hiểu. Hãy lưu thay đổi, hoặc xem trước nếu muốn kiểm tra trước khi lưu. Nút Xóa được đặt riêng ở phía bên kia.',
    reset: 'Làm lại'
  },
  fluent: {
    title: 'Càng nhiều nút, càng cần kiểm soát nút nào nổi bật nhất',
    subtitle:
      'Fluent 2 chia nút thành bốn cấp: Primary, Secondary, Subtle và Transparent. Hàng thao tác bên dưới lấy từ một trang quản trị thông thường. Hãy kéo thanh trượt để thêm bớt nút, rồi chuyển qua lại giữa hai cách trình bày để xem sự khác biệt.',
    count: 'Số lượng nút',
    styleAll: 'Đặt tất cả thành Primary',
    styleLevels: 'Chia bốn cấp theo Fluent',
    allNote:
      'Mọi nút đều là Primary có nền đặc. Khi có nhiều nút như vậy, bạn khó biết nên nhìn đâu trước.',
    levelsNote:
      'Chỉ “Tạo dự án” vẫn là Primary. “Xuất” chuyển thành Secondary. Các nút còn lại ít nổi bật và chỉ hiện rõ khi di chuột lên.',
    legendTitle: 'Di chuột lên từng nút để so sánh bốn cấp',
    levels: [
      {
        name: 'Primary',
        desc: 'Nền đặc. Mỗi khu vực chỉ dùng một nút'
      },
      {
        name: 'Secondary',
        desc: 'Có viền. Dành cho thao tác phụ dùng thường xuyên'
      },
      {
        name: 'Subtle',
        desc: 'Nền trong suốt, hiện nền nhạt khi di chuột lên'
      },
      {
        name: 'Transparent',
        desc: 'Chỉ hiện đường viền khi di chuột lên'
      }
    ],
    actions: [
      {
        id: 'create',
        label: 'Tạo dự án'
      },
      {
        id: 'export',
        label: 'Xuất'
      },
      {
        id: 'import',
        label: 'Nhập'
      },
      {
        id: 'filter',
        label: 'Lọc'
      },
      {
        id: 'sort',
        label: 'Sắp xếp'
      },
      {
        id: 'refresh',
        label: 'Làm mới'
      },
      {
        id: 'share',
        label: 'Chia sẻ'
      },
      {
        id: 'archive',
        label: 'Lưu trữ'
      }
    ]
  },
  tokens: {
    title: 'Đổi một giá trị, cả hai trang cùng thay đổi',
    subtitle:
      'Atlassian đưa các giá trị như màu sắc, độ bo góc và kích thước vào token để tất cả các trang dùng chung. Hãy kéo các thanh trượt bên phải rồi bật “Mỗi trang dùng một bộ giá trị” để so sánh.',
    pageA: 'Danh sách dự án',
    pageB: 'Cài đặt tài khoản',
    radius: 'Độ bo góc',
    height: 'Chiều cao nút',
    accent: 'Màu chủ đạo',
    pixel: '{n}px',
    colors: ['Xanh dương', 'Xanh lá', 'Cam', 'Tím'],
    inconsistent: 'Mỗi trang dùng một bộ giá trị (không dùng token)',
    inconsistentNote:
      'Trang bên phải đang dùng màu sắc, độ bo góc và chiều cao được chọn riêng. Từng trang trông vẫn ổn khi xem riêng, nhưng đặt cạnh nhau thì khó nhận ra chúng thuộc cùng một sản phẩm.',
    consistentNote:
      'Hai trang lấy giá trị từ cùng một bộ token. Khi bạn kéo thanh trượt, cả hai thay đổi cùng nhau.',
    mock: {
      list: {
        title: 'Dự án',
        create: 'Tạo dự án',
        open: 'Mở',
        items: [
          {
            name: 'Thiết kế khóa học',
            meta: 'Tài liệu · cập nhật hôm nay'
          },
          {
            name: 'Ghi chú nghiên cứu',
            meta: 'Tài liệu · cập nhật 3 ngày trước'
          }
        ]
      },
      settings: {
        title: 'Cài đặt tài khoản',
        email: 'Email',
        emailValue: 'you@example.com',
        notify: 'Nhận thông báo',
        save: 'Lưu',
        cancel: 'Hủy'
      }
    }
  },
  layers3: {
    title: 'Tách rõ ba tầng',
    subtitle:
      'Một trang thường có ba tầng gồm thông tin chính, thông tin phụ trợ và thao tác cấp hai. Ví dụ bên dưới dùng cùng một nội dung. Hãy kéo thanh trượt để xem ba tầng từ chỗ nổi bật ngang nhau đến chỗ phân biệt rõ.',
    slider: 'Mức chênh lệch giữa các tầng',
    flat: 'Ba tầng nổi bật ngang nhau nên chẳng có gì thật sự nổi bật',
    mid: 'Đã tách một phần. Bạn thấy tiêu đề trước rồi mới đến mô tả',
    full: 'Đã tách rõ. Nhìn qua là biết nên xem gì trước và làm gì tiếp theo',
    labels: ['Thông tin chính', 'Thông tin phụ trợ', 'Thao tác cấp hai'],
    mock: {
      title: 'Thiết kế khóa học',
      body: 'Theo dõi tiến độ thiết kế khóa học trong học kỳ này, cập nhật hằng tuần.',
      meta: '4 thành viên · 12 tài liệu · cập nhật hôm qua',
      primary: 'Mở dự án',
      secondary: ['Lưu trữ', 'Chia sẻ']
    }
  },
  taskflow: {
    title: 'Cùng một trang, hai cách bố trí',
    subtitle:
      'Hai trang bên dưới dùng cùng sáu module. Bên trái có gì đặt nấy, còn bên phải sắp xếp theo nhiệm vụ của người dùng. Hãy di chuột lên từng bước bên phải để theo dõi nhiệm vụ diễn ra thế nào.',
    stacked: 'Xếp chồng các module',
    task: 'Sắp xếp theo nhiệm vụ',
    taskLine:
      'Nhiệm vụ của người dùng là tìm dự án mình làm gần đây nhất và tiếp tục chỉnh sửa',
    steps: [
      {
        name: 'Nhận ra đây là trang gì',
        detail:
          'Tiêu đề nói rõ mục tiêu của trang trong một dòng và được nhìn thấy đầu tiên'
      },
      {
        name: 'Thu hẹp phạm vi',
        detail:
          'Bộ lọc nằm ngay dưới tiêu đề để tôi có thể lọc trước khi tìm dự án'
      },
      {
        name: 'Tìm đúng dự án',
        detail:
          'Danh sách dự án là phần chính của trang. Dự án cập nhật gần nhất nằm trên cùng'
      },
      {
        name: 'Bắt đầu thao tác',
        detail: 'Thao tác chính của mỗi hàng nằm ngay cạnh nội dung của hàng đó'
      }
    ],
    modules: {
      title: 'Dự án',
      goal: 'Quản lý tất cả dự án của bạn',
      announce: 'Thông báo',
      announceText: 'Bảo trì định kỳ vào thứ Bảy tuần này, 02:00–04:00',
      recommend: 'Gợi ý',
      recommendText: 'Thử chế độ xem biểu đồ Gantt mới',
      settings: 'Cài đặt',
      filter: 'Lọc',
      list: 'Danh sách dự án',
      open: 'Mở',
      items: [
        {
          name: 'Thiết kế khóa học',
          meta: 'Tài liệu · cập nhật hôm nay'
        },
        {
          name: 'Ghi chú nghiên cứu',
          meta: 'Tài liệu · cập nhật 3 ngày trước'
        }
      ]
    }
  },
  roleKinds: {
    title: 'Năm vai trò thường gặp trông thế nào?',
    subtitle:
      'Dưới đây là năm vai trò trong bảng trên, được đặt cùng một hàng. Các nút có cùng kích thước và độ bo góc, chỉ khác ở cách tô nền và màu sắc.',
    items: [
      {
        kind: 'primary',
        name: 'Primary',
        use: 'Thao tác quan trọng nhất trong khu vực',
        sample: 'Lưu'
      },
      {
        kind: 'secondary',
        name: 'Secondary',
        use: 'Thao tác hỗ trợ',
        sample: 'Xem trước'
      },
      {
        kind: 'text',
        name: 'Tertiary / Text',
        use: 'Thao tác có mức ưu tiên thấp',
        sample: 'Tìm hiểu thêm'
      },
      {
        kind: 'danger',
        name: 'Destructive',
        use: 'Thao tác rủi ro như xóa hoặc vô hiệu hóa',
        sample: 'Xóa dự án'
      },
      {
        kind: 'icon',
        name: 'Icon button',
        use: 'Thao tác công cụ cục bộ',
        sample: 'Đóng'
      }
    ]
  }
}
