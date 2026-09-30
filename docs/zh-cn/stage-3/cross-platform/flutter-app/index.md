# 如何开发 Flutter 跨平台应用

Flutter 可以用一套 Dart 代码制作 Android、iOS 和 Web 应用。下面以门店费用簿为例，从空项目开始把录入、校验和本机保存真正跑通。

Flutter 最吸引人的地方当然是少写一套界面，不过这还不是选它的全部理由。一个产品如果两端的流程基本相同，又希望颜色、间距、动画和组件保持一致，Flutter 会让团队更容易共用设计和业务实现。反过来，如果应用长期依赖大量 Android 或 Apple 独有能力，两端的交互本来就差得很大，原生 Compose 和 SwiftUI 往往更直接。

“能编译”和“已经能上架”是两回事。费用记录原型会实际完成表单报错、本机保存和自动测试；Android、iOS 的签名、真机与商店发布，则分别说明还要怎样验证。

## Flutter 和 Dart 分别是什么

第一次接触时，先把这两个名字分开：

- **Dart** 是编写页面、状态和业务逻辑的语言；
- **Flutter** 是界面框架和开发工具，提供 Widget、渲染、调试、测试和各平台构建能力。

Flutter 不是把网页套进手机外壳。发布到 Android 或 iOS 时，应用会包含 Flutter 引擎，并通过平台嵌入层接入系统。常用相机、定位、通知和本地存储通常通过插件使用；插件没有覆盖的能力，还可以用 Kotlin 或 Swift 编写平台代码。Flutter 官方的[架构介绍](https://docs.flutter.dev/resources/architectural-overview)和[平台集成指南](https://docs.flutter.dev/platform-integration)把这两层的关系讲得很清楚。

对产品团队来说，Flutter 比较适合这些情况：

- Android 和 iOS 的主要页面与业务流程接近；
- 团队准备从零做会员、交易、内容、门店或企业内部应用；
- 产品有自己的设计系统，希望两端视觉一致；
- 除了手机，以后还可能提供 Web 或桌面版本；
- 团队愿意学习 Dart，并保留少量 Kotlin、Swift 的接入能力。

如果产品只是已有网站的简单包装，可以先看 PWA 或 Capacitor；如果最重要的是蓝牙、车机、系统扩展、后台音视频或最新平台 API，先用一个关键功能原型比较 Flutter 和原生方案。不要只凭“一套代码”决定长期架构。

## 三个已经上线的 Flutter 应用

BMW、Google Pay 和 Nubank 面向的用户完全不同，却都在正式产品中使用了 Flutter。它们怎样安排页面状态、迁移已有功能和组织测试，也能给后面的费用簿提供直接参考。

### My BMW：一个连接车主与车辆服务的应用

BMW 曾经发现 iOS 和 Android 车主应用之间的功能与设计差距越来越大，同时还要维护不同品牌、系统和四十多个市场的版本。团队后来用 Flutter 建立统一移动平台，My BMW App 于 2020 年发布，并扩展到 47 个国家。它的流水线每天会自动构建、测试和部署多个变体，而不是让一套源码替代发布工程。

![My BMW App 在车辆旁边显示车况与服务入口](images/flutter-real-bmw.webp)

图片与数据来源：[Flutter 官方 BMW 案例](https://flutter.dev/showcase/bmw)。

这件事最值得借鉴的不是汽车界面，而是两个做法：用户先看见当前状态，再决定下一步操作；团队按业务领域拆模块，同时自动验证不同市场和平台的构建。

门店费用簿也先显示本月金额、备用金、最后同步时间和待同步数量，然后才是明细和“记一笔”。页面没有把“同步成功”藏在日志里。代码扩展到真实项目时，可以按照 Flutter 的[应用架构指南](https://docs.flutter.dev/app-architecture/guide)把 View、ViewModel、Repository 和 Service 分开，再按[自适应布局方法](https://docs.flutter.dev/ui/adaptive-responsive/general)处理手机、平板和桌面宽度。

### Google Pay：一个管理付款、奖励和账户的数字钱包

Google Pay 原来的 Android 和 iOS 实现合计约 170 万行代码。迁移前，团队先让三名资深工程师做首页、聊天和支付的纵向原型，把关键原生插件也放进去验证；得到团队反馈以后，才逐步扩大到正式重写。官方案例记录的新代码库约 110 万行，工程投入减少约 60% 到 70%，但安全审查和平台接入并没有因此消失。

![Google Pay 的奖励反馈与付款状态界面](images/flutter-real-google-pay.webp)

图片与数据来源：[Flutter 官方 Google Pay 案例](https://flutter.dev/showcase/google-pay)。

这个案例给费用簿的直接提醒，是先跑通一条可以验收的流程。第一版只做“看汇总 → 录入费用 → 看到错误或成功反馈 → 刷新后恢复”，没有顺手加入审批、报销、角色和云同步。这样一条小链路已经能暴露表单、状态和存储问题。

涉及付款、工单或费用时，点击按钮以后不能毫无反应，也不能因为重试生成两条相同记录。费用簿用字段旁边的错误文字、保存成功提示和“待同步”状态把结果说清楚。继续接后端时，可以参考 Flutter 的[离线优先架构](https://docs.flutter.dev/app-architecture/design-patterns/offline-first)和[分层测试案例](https://docs.flutter.dev/app-architecture/case-study/testing)，再为上传请求增加唯一业务编号和幂等处理。

### Nubank：一个面向巴西用户的数字银行

巴西数字银行 Nubank 没有因为 Flutter 热门就直接迁移。官方案例介绍，团队先用 11 项标准比较 Kotlin Native、React Native 和 Flutter，还让不同经验的开发者完成一小时任务并收集反馈。选定 Flutter 后，新功能逐步采用，旧功能再按计划迁移。团队随后建立了自己的设计系统，并把单元、组件和端到端测试纳入开发方式。

![Nubank 账户与帮助入口的真实界面](images/flutter-real-nubank.png)

图片与数据来源：[Flutter 官方 Nubank 案例](https://flutter.dev/showcase/nubank)。案例还记录了合并成功率、合并时间和新人上手速度等实际指标。

费用簿没有照着 Nubank 画一个紫色银行 App，而是借了它的工程做法：整页颜色由主题统一，汇总卡、预算、费用行和同步提示拆成小组件；表单规则有单独的可见反馈；最常用的“打开首页和录入表单”写成 Widget Test。想继续整理设计系统，可以看 Flutter 官方的[主题教程](https://docs.flutter.dev/cookbook/design/themes)；项目开始多人维护时，再按[可扩展应用架构建议](https://docs.flutter.dev/app-architecture/recommendations)调整目录和测试边界。

这三个案例放在一起，方向就比较明确了：Flutter 省下的是重复实现，不是产品判断、平台适配、测试和发布流程。

## 要做的应用：门店费用簿

成品叫 **门店费用簿**。店长可以看本月已记录金额和备用金，新增一笔临时费用；网络不好时先存在本机，并明确显示哪些记录还没有同步。

这个题目看起来不复杂，却包含企业应用经常遇到的几件小事：

- 首页先回答“现在是什么状态”；
- 金额和费用说明必须校验；
- 保存后要告诉用户结果；
- 关闭或刷新以后，刚才的记录不能丢；
- 离线记录和服务器同步要分成两个状态；
- 同一个页面要能适应窄屏手机和较宽窗口。

后面的操作每次只给 AI 一个任务。完成后立即运行、查看结果，再继续下一步。

## 1. 装好 Flutter，再看本机缺什么

从 [Flutter 官方安装页](https://docs.flutter.dev/get-started/install)选择自己的系统。要做 Android，还要安装 Android Studio、Android SDK 和模拟器；要做 iOS，必须使用 Mac，并准备 Xcode、iOS Simulator 和项目需要的 CocoaPods。

安装完成后先运行：

```bash
flutter doctor -v
```

不要急着让 AI 改一串环境变量。先把检查结果交给它：

> 请看这份 flutter doctor 结果，只告诉我第一个必须修复的问题。

修完一项再重新检查。Web 旁边出现对勾，不代表 Android SDK 和 iOS 签名也已经准备好。

实际验证使用的是 Flutter 3.44.9、Dart 3.12.2 和 Chrome 151。`flutter doctor -v` 当时显示：Chrome 可以使用，但本机没有 Android SDK；Xcode 已安装，却没有可用的 iOS Simulator Runtime，CocoaPods 也没有安装。因此后面的截图是实际运行的 Flutter Web 构建，不冒充 Android 模拟器或 iPhone 真机。

## 2. 创建项目，先跑空白页

在准备存放项目的目录执行：

```bash
flutter create store_expense_flutter
cd store_expense_flutter
flutter devices
flutter run -d chrome
```

`flutter devices` 会列出当前真的能用的目标。看到 Chrome 不等于手机环境已经完成，Android Emulator 和 iOS Simulator 也应该分别出现在列表里。

如果空白项目没有启动，只把第一段有效错误交给 AI：

> 空白 Flutter 项目启动失败。错误是【粘贴错误】，请只修复启动问题。

先确认计数器模板能运行，再开始写费用簿。这样后面出错时，你知道问题来自业务修改，不是 SDK、下载或设备配置。

## 3. 先把首页信息排清楚

第一轮只使用演示数据：

> 请把首页改成“门店费用簿”。显示本月金额、备用金、最近费用和“记一笔”按钮，先用演示数据。

这时先看信息顺序，不要急着接数据库。打开页面以后，店长应该马上看见总额、预算和最近几笔记录；主要按钮只有一个。颜色和字号可以调整，但不要用五六种卡片同时抢注意力。

页面太挤时再说：

> 首页只保留总额、预算、最近记录和新增按钮，其他先删掉。

## 4. 把离线和同步状态摆到页面上

成熟应用不会用一个转圈图标代替所有状态。对门店费用来说，至少要分清“已经存在本机”和“已经到达服务器”。

> 请给首页增加最后同步时间和待同步数量。断网时也要能看懂记录是否已经保存在本机。

下面是本页实际构建并打开的版本。顶部写着最后同步时间和待同步数量，费用行也标记了待同步，而不是只在控制台打印一条日志。

![Flutter 门店费用簿实际运行首页，新增的打印纸记录仍在](images/flutter-expense-home.png)

这张图来自 Chrome 中运行的 Flutter Web 生产构建。页面刷新以后，“打印纸 ¥56”仍然存在，所以它也记录了本机恢复测试的结果；它不是 Android 或 iOS 截图。

当前版本没有真实服务器。“待同步”只是清楚表达产品状态，不能据此宣称云端同步已经完成。接服务器以前，先阅读官方的[离线优先实现方式](https://docs.flutter.dev/app-architecture/design-patterns/offline-first)，决定读取以本机还是远端为准、失败怎样重试、何时改变同步状态。

## 5. 增加费用表单

首页稳定以后，再做一个最小表单：

> 点击“记一笔”时打开底部表单，只填写费用说明和金额。

![实际运行的新增费用底部表单](images/flutter-expense-form.png)

底部表单适合短任务，因为用户还能看见原来的页面。字段变多、需要拍照或审批信息时，就应该换成完整页面，不要把所有内容硬塞进一个弹层。

Flutter 官方的[表单教程](https://docs.flutter.dev/cookbook/forms)列出了输入、焦点、取值和校验的基础做法。先让两个字段能输入，再单独增加规则。

## 6. 不要让“保存”按钮静悄悄地失败

这一轮只处理错误反馈：

> 费用说明不能为空，金额必须大于 0。保存失败时把原因写在对应字段下面。

实际点击空表单的“保存到本机”以后，两个字段会变红，并分别说明缺少什么：

![空费用表单显示字段级错误提示](images/flutter-expense-validation.png)

这里没有只写“参数错误”，也没有弹出一个马上消失的统一提示。用户能在出错的位置直接修改。需要自己实现时，可对照 Flutter 官方的[表单校验示例](https://docs.flutter.dev/cookbook/forms/validation)。

接着补保存成功反馈：

> 保存成功后关闭表单，把新记录放到列表顶部，并明确告诉用户已经保存在本机。

本页实测输入“打印纸”和 `56` 后，金额从 ¥890.50 变为 ¥946.50，待同步数量从 1 变为 2，列表顶部出现新记录，底部同时显示“已保存在本机，联网后再同步”。

![保存费用后同时更新汇总、列表和成功提示](images/flutter-expense-saved.png)

这类反馈看起来只是文案，却能避免用户因为不确定而连续点五次。以后接真实后端，还要让服务端识别重复提交，不能只靠按钮暂时禁用。

## 7. 关闭应用以后，记录还要回来

少量演示数据可以先使用 `shared_preferences`。本页原型把费用列表序列化后保存在本机：

```bash
flutter pub add shared_preferences
```

然后只给 AI 一个目标：

> 请把费用记录保存在本机。页面刷新或应用重启后，新记录仍然存在。

保存“打印纸 ¥56”以后，本页重新加载了整个 Web 应用；刷新后的首页截图仍能看到它。这一步验证的是本机持久化，不是服务器同步。

`shared_preferences` 适合设置和少量简单值，不适合大量费用、附件、查询和事务。Flutter 官方的[键值存储教程](https://docs.flutter.dev/cookbook/persistence/key-value)也明确提醒了数据量和持久性边界。产品继续扩大时，应该换成数据库，并把数据层放进 Repository；[Flutter SQL 架构案例](https://docs.flutter.dev/app-architecture/design-patterns/sql)可以作为下一步参考。

## 8. 原型跑通后，再拆项目结构

教学原型放在一个文件里，改起来快，也容易看见完整链路。企业项目继续这样长下去，很快会把界面、校验、数据库和接口混在一起。

先让 AI 只提出拆分方案：

> 请按 View、ViewModel、Repository 和 Service 说明这个费用簿应该怎样拆分，先不要改代码。

确认职责以后再动手：

> 请先拆分费用列表这一项，功能和界面保持不变。

按照 Flutter 的[推荐应用架构](https://docs.flutter.dev/app-architecture/guide)：View 负责显示和交互，ViewModel 保存界面状态与操作，Repository 作为数据来源入口，Service 封装本机数据库、REST API 或平台能力。这样测试费用计算时不必真的打开页面，测试页面时也能替换掉服务器。

不要为了看起来“企业级”一开始创建几十个空目录。先让费用列表、录入和同步真正产生不同职责，再逐步拆开。

## 9. 同一套界面，不等于把手机页面横向拉长

Flutter 可以运行在不同尺寸，但自适应布局仍然要自己设计。本页原型在宽窗口中限制了内容宽度，避免汇总卡和表单从屏幕左边一直拉到右边。

> 请让页面适应手机和宽窗口。宽屏限制内容宽度，窄屏不能横向溢出。

接着分别拖动浏览器窗口、旋转模拟器，并打开系统大字体。不要根据“这是手机还是平板”写死页面；官方的[自适应三步法](https://docs.flutter.dev/ui/adaptive-responsive/general)建议先抽出共用信息，再测量当前可用空间，最后选择布局。触控、鼠标、键盘和屏幕阅读器的差异可以继续对照[自适应最佳实践](https://docs.flutter.dev/ui/adaptive-responsive/best-practices)和[输入与无障碍指南](https://docs.flutter.dev/ui/adaptive-responsive/input)。

如果平板以后要同时显示门店列表和费用明细，再把底部导航改成侧边导航或双栏布局。不要因为 Flutter 支持六个平台，就在第一版一次设计六套页面。

## 10. 平台能力仍然要分别接入

真实费用应用可能需要拍小票、扫描发票、使用生物认证或接企业设备。先查有没有维护正常、支持目标平台的插件，再用最小原型验证权限、异常和生命周期。

> 请先列出拍照功能需要的 Flutter 插件、Android 权限和 iOS 权限说明，不要写代码。

确认以后再说：

> 请给费用表单增加一张小票照片。拒绝权限时告诉用户怎样继续。

插件不支持某个能力时，可以用 Platform Channel 调用 Kotlin、Java、Swift 或 Objective-C。Flutter 的[平台专属代码教程](https://docs.flutter.dev/platform-integration/platform-channels)提供了完整例子。跨平台不是禁止原生代码，而是把原生代码控制在真正需要的位置。

## 11. 测试用户真正会走的路径

先跑静态分析和现有测试：

```bash
flutter analyze
flutter test
```

再让 AI 增加一条用户流程：

> 请写一个 Widget Test：打开首页，点击“记一笔”，确认费用说明、金额和保存按钮出现。

表单校验稳定以后再加：

> 请测试空表单不能保存，并能看见两个错误提示。

本页临时项目实际执行结果是：`flutter analyze` 没有发现问题；Widget Test 通过 1 项，验证了首页能够显示，并能打开录入表单。空表单提示和本机恢复还通过浏览器实际操作验证，但尚未写成完整自动化测试，教程不把它们冒充测试套件已经覆盖。

项目扩大后，费用计算和 ViewModel 适合单元测试，页面状态适合 Widget Test，登录、上传、离线恢复和同步适合集成测试。Flutter 的[测试总览](https://docs.flutter.dev/testing/overview)和[分层测试示例](https://docs.flutter.dev/app-architecture/case-study/testing)说明了三种测试各自该负责什么。

## 12. Android 和 iOS 必须分别打开

Web 运行通过以后，回到：

```bash
flutter devices
```

Android 模拟器出现后运行：

```bash
flutter run -d <Android 设备编号>
```

Mac 装好 iOS Simulator Runtime 后，再选择 iPhone 模拟器：

```bash
flutter run -d <iPhone 模拟器编号>
```

两边至少重新检查：

- 中文、金额和大字体是否溢出；
- 底部表单是否被软键盘遮住；
- 返回手势能否正常关闭表单；
- 应用彻底关闭再打开后，本机记录是否恢复；
- 相机、照片和通知权限被拒绝时会发生什么；
- 断网、恢复网络和重复重试会不会丢单或生成重复记录。

Flutter 会自动处理一部分滚动、文本选择等平台习惯，但不会替你决定所有 Android 和 iOS 交互。官方的[平台自适应说明](https://docs.flutter.dev/ui/adaptive-responsive/platform-adaptations)列出了哪些行为会自动变化、哪些仍要产品自己选择。

这一步尚未完成：当时 `flutter doctor` 找不到 Android SDK；Xcode 没有安装可用的 iOS Simulator Runtime，项目又使用了需要 CocoaPods 的插件。上面的两张移动端图不能用 Web 截图替代。准备好对应环境后，应把 Android 模拟器、iOS 模拟器和至少一台真机的运行截图补进来。

## 13. 构建和发布是两条独立流水线

Web 生产构建可以运行：

```bash
flutter build web
```

本页实际执行成功，产物生成在 `build/web`。随后通过本地静态服务器打开这个生产构建，完成录入、错误反馈、保存和刷新恢复测试。Flutter 官方的[Web 发布说明](https://docs.flutter.dev/deployment/web)也建议用服务器重新检查构建产物，而不是双击 HTML 文件。

Android 上架一般生成 App Bundle：

```bash
flutter build appbundle
```

它仍然需要 Android SDK、应用编号、版本号、发布签名和 Play Console 配置。具体步骤以 Flutter 的[Android 发布教程](https://docs.flutter.dev/deployment/android)为准，并在至少一台没有开发环境的手机上安装测试版本。

iOS 发布在 Mac 上完成：

```bash
flutter build ipa
```

它需要 Xcode、签名证书、Provisioning Profile、唯一 Bundle ID 和 App Store Connect。生成 IPA 只是开始，后面还要 Validate、上传 TestFlight、测试并提交审核。Flutter 的[iOS 发布教程](https://docs.flutter.dev/deployment/ios)列出了版本号、归档和上传步骤。

两个商店的隐私说明、截图、审核规则和账号都不同；推送、内购和登录也有平台政策差异。“一套 Dart 代码”不会生成一个同时提交给两个商店的万能安装包。

## 一笔费用能够保存和恢复，原型才算跑通

现在回头看这个小费用簿，它已经不只是几张静态卡片：空表单会告诉用户哪里不对，保存以后汇总和列表一起更新，页面也明确区分本机保存与服务器同步；刷新整个应用以后，新记录还在。

下一步不必急着加图表和十几个入口。如果你准备把它给真实门店试用，先接一套测试后端，只做“上传一笔费用”和“失败后重试”；再用两个账号检查门店隔离，用飞行模式检查离线队列。等这一条链路稳定，再增加小票、审批和统计。

Flutter 真正省事的地方，是 Android 和 iOS 可以共同维护这条业务链路。真正不能省的，仍然是两端设备、权限、签名、商店和失败场景的逐项验证。
