# 如何用 SwiftUI 开发 iOS 原生应用

iOS 原生开发从 Xcode 开始。下面从一个空白项目出发，做出可以在模拟器和 iPhone 上运行的应用。

iOS 原生 App 是安装在 iPhone 或 iPad 上的应用。它可以使用相机、照片、定位、通知、健康、Wallet、NFC、Face ID 和本地数据，也能继续扩展到 Apple Watch、Mac、Widget、Live Activity 和 CarPlay。

企业会用它做移动银行、门店服务、销售工具、现场巡检、医疗健康和员工应用。选择原生 iOS 往往不是为了“看起来更像苹果”，而是需要稳定接入 Apple 的系统能力、无障碍、隐私权限和设备管理。

## Swift、SwiftUI 和 Xcode 是什么

第一次接触 iOS 开发，最容易把这三个名字混在一起：

- **Swift** 是编写业务逻辑的语言；
- **SwiftUI** 是用 Swift 描述界面的工具；
- **Xcode** 是创建项目、运行模拟器、连接真机、签名和上传 App 的开发软件。

SwiftUI 可以同时服务 iPhone、iPad、Mac、Apple Watch 和 Vision Pro，但“可以共享界面代码”不等于所有设备会自动得到合适的体验。手机、平板和桌面的窗口、导航和输入方式不同，仍然要分别检查。

## 真实产品里的 SwiftUI

Apple Developer 的团队文章很适合看真实产品怎样采用 SwiftUI，而不是只看教学 Demo。

Tiimo 是一款面向神经多样性人群的计划工具，提供 iPhone、iPad 和 Apple Watch 版本。团队没有为了追新技术一次重写全部应用，而是结合产品路线逐步迁移，让无障碍、动画和多设备支持更容易维护。

![Apple Developer 展示 Tiimo 在 iPhone 上的真实界面](images/apple-tiimo-swiftui-case.jpg)

图片与案例来源：[Tiimo 团队为什么迁移到 SwiftUI](https://developer.apple.com/articles/tiimo/)。Apple 的文章还列出了团队规模、支持设备和实际迁移考虑，很适合小团队参考。

Copilot Money 是另一个完全不同的产品：它会整理账户、交易和现金流。这个应用最初使用 Swift 和 UIKit，后来把新的 Cash Flow 功能用 SwiftUI 与 Swift Charts 做出来，并让 iOS 和 macOS 版本共享更多实现。

![Copilot Money 用 Swift Charts 展示真实现金流数据](images/apple-copilot-money-case.jpg)

图片与案例来源：[Copilot Money 如何采用 Swift Charts](https://developer.apple.com/articles/copilot-money/)。它说明成熟 App 不必在 UIKit 和 SwiftUI 之间二选一，新页面和新功能可以逐步采用 SwiftUI。

Apple 的[企业开发入口](https://developer.apple.com/business/get-started/)还把地图、扫码、NFC、单点登录、后台任务和受管配置列为常见企业能力。真正的企业 App 往往不只是几个页面，还要连接公司账号、后端 API、权限和设备管理。

## 什么时候适合做 iOS 原生 App

如果产品主要服务 iPhone 用户，需要深度使用 Apple 平台能力，或者对隐私、无障碍、性能和长期维护要求较高，SwiftUI 原生方案很合适。已有 UIKit 项目也可以逐页加入 SwiftUI，不必一开始就重写。

如果只是简单表单、活动页或内容查询，手机网页和 PWA 可能已经足够；如果必须同时覆盖 iOS 与 Android，而且两端功能几乎完全一致，可以先比较 Flutter、React Native 或双端原生的长期成本。无论选哪一种，都不能跳过真实设备测试。

## 要做的应用：冰箱大厨

接下来做一个原生 iPhone 应用：**冰箱大厨 FridgeChef**。

用户输入现有食材，应用生成一份菜谱，并把确认过的结果保存在本机。教程从 Xcode 空项目开始，依次完成模拟器运行、AI 修改、后端接口、本地存储、真机测试和 App Store 发布准备。

![冰箱大厨 iOS 应用成品](images/image47.webp)

## 1. 准备设备和工具

iOS 应用需要一台能运行当前 Xcode 的 Mac。真机测试还需要 iPhone 和 Apple ID；只有模拟器测试时，可以暂时不接手机。

![Mac 与 iPhone 开发环境](images/image1.webp)

从 Mac App Store 安装 Xcode，第一次启动时等待开发组件安装完成。

![Xcode 欢迎界面](images/image12.png)

如果后面要连接 iPhone，在手机“隐私与安全”里开启开发者模式。菜单位置可能随 iOS 版本变化，以手机当前提示为准。

![在 iPhone 开启开发者模式](images/image9.webp)

## 2. 创建并运行空白项目

在 Xcode 欢迎页选择 **Create New Project**。

![在 Xcode 创建新项目](images/image14.png)

模板选择 iOS App，界面使用 SwiftUI，语言使用 Swift。

![选择 iOS App 模板](images/image15.png)

项目名填写 `FridgeChef`，Organization Identifier 使用自己的反向域名。需要本地历史记录时，可以选择 SwiftData；如果模板提供的选项不同，也可以稍后再增加。

![填写项目名称、团队和 Bundle Identifier](images/image16-private-redacted.webp)

选择保存位置并创建项目。

![选择 Xcode 项目保存位置](images/image17-cropped.webp)

先不要改代码。顶部选择一台 iPhone 模拟器，点击 Run。

![在 Xcode 选择模拟器并运行](images/image19.png)

![空白 SwiftUI 应用在模拟器中运行](images/image21.webp)

空白应用能启动，才说明 Xcode、SDK、签名和模拟器已经连通。

> 空白 SwiftUI 项目运行失败，错误是【粘贴错误】。请只修复环境或签名问题，不增加功能。

## 3. 做出第一版界面

用 Trae 或 Cursor 打开 Xcode 项目目录：

> 请把当前 SwiftUI 首页改成冰箱大厨。首页显示食材输入框、生成菜谱按钮和历史记录空状态，先使用演示数据。

![AI 读取 iOS 项目并开始修改](images/image23-terminal-cropped.webp)

回到 Xcode 重新运行。第一轮只看输入框、按钮和空状态，不接网络。

![SwiftUI 首页第一版](images/image25.png)

如果布局不适合小屏幕：

> 请让首页在小屏幕和大字体下也能完整滚动，保持现有配色，不增加新功能。

## 4. 增加演示菜谱

> 请让生成按钮先返回一份固定菜谱，包含名称、食材和步骤。生成中禁用按钮，失败状态也要有重新尝试入口。

验证：

1. 没输入食材时不能提交。
2. 点击后先显示处理中。
3. 完成后显示菜名、食材和步骤。
4. 连续点击不会产生多份重复结果。
5. 返回首页后还能看到刚才的菜谱。

## 5. 接入真实后端

正式应用不能把组织共享 API Key 写进 iOS 客户端。App 安装包可以被分析，写在 Swift 文件、配置文件或 Keychain 中的共享模型密钥都不能算服务器秘密。

正确做法是：iOS App 登录自己的业务后端，后端再调用模型服务。

> 请把演示菜谱替换为业务后端接口。App 只发送食材并接收结构化菜谱，不保存模型密钥；增加超时、取消和错误提示。

接口返回内容要经过校验。字段缺失或格式不正确时，页面显示可理解的错误，不能直接崩溃。

可以用后端测试地址先验证，但不要把内部地址和 Token 提交到公开仓库。

## 6. 保存历史记录

网络链路稳定以后，再保存用户确认过的菜谱。

在 Xcode 中创建 SwiftData 模型或当前项目使用的本地数据模型。

![在 Xcode 配置本地菜谱数据](images/image29.webp)

> 请把用户确认的菜谱保存到本机，并在首页按时间倒序显示。删除前需要确认，空数据库显示空状态。

按顺序测试：

1. 保存一份菜谱。
2. 关闭应用再打开。
3. 确认历史记录仍然存在。
4. 删除时先取消，记录不能消失。
5. 再次删除并确认，记录才被移除。

## 7. 准备 App 图标

图标应为自己创作或确认有权使用的素材。生成 1024×1024 原图后，拖入 Assets 中对应的 App Icon 资源。

![准备冰箱大厨图标](images/image31.png)

![把图标放入 Xcode Assets](images/image34.webp)

重新运行，确认模拟器桌面和应用切换器里都显示新图标。

![带正式图标的冰箱大厨](images/image36.webp)

## 8. 做一次完整模拟器验收

至少检查：

- 空输入、正常输入和超长输入；
- 后端超时、断网和返回格式错误；
- 生成中取消；
- 保存、重启、删除；
- 深色模式；
- 系统大字体；
- 小屏幕模拟器。

出错时复制 Xcode 中最相关的一段：

> 我执行【操作】后出现【现象】。Xcode 错误是【内容】。请只修复这一项，并告诉我怎样复测。

![在 Xcode 查看编译和运行错误](images/image42.webp)

日志里不要写完整菜谱输入、用户 Token、联系方式或服务器密钥。

## 9. 在真机运行

用数据线连接 iPhone，首次连接时在手机上选择信任。

![将 iPhone 连接到 Mac](images/image39.png)

![在 iPhone 上信任这台电脑](images/image40-device-redacted.webp)

回到 Xcode，在顶部设备列表选择自己的 iPhone，确认 Signing & Capabilities 中选择了正确团队，再点击 Run。

![冰箱大厨安装到真实 iPhone](images/image41.webp)

个人 Apple ID 可以用于开发调试，但签名有效期和能力有限。系统要求信任开发者时，根据手机当前提示操作。

![在 iPhone 设备管理中信任开发应用](images/image45.png)

真机重点测试键盘、网络切换、后台恢复、深色模式、动态字体和真实触摸区域。

## 10. 发布前准备

准备上架时，需要加入 Apple Developer Program，在 App Store Connect 创建 App 条目，并通过 Xcode 上传归档构建。

![App Store Connect 发布入口](images/image46.png)

账号费用、SDK 要求、隐私清单和审核规则会变化，提交时以 Apple 当前后台和官方文档为准。

发布前至少准备：

- 稳定的 Bundle ID 和版本号；
- App 图标、真实截图和说明；
- 隐私政策、数据收集说明和账号删除流程；
- 后端生产环境和故障监控；
- Release 真机测试；
- 图片、字体和内容的授权证明。

## 11. 在自己的 iPhone 上吃完最后一顿“测试餐”

模拟器里的页面都正常以后，把冰箱大厨装到真实 iPhone，再完整走一遍：输入食材、等待菜谱、保存结果、关闭应用后重新打开。顺手切换深色模式和大字体，再断一次网络，看看按钮、提示和历史记录是不是仍然说得清楚。

如果这几步都能完成，你做出的就不再只是一张 SwiftUI 界面。它已经有了前端、后端、本机记录和真机运行这条完整链路。准备上架时，最后守住两件事：模型密钥只能留在后端，商店里的截图、隐私说明和实际功能必须对得上。

## 参考资料

- [SwiftUI](https://developer.apple.com/xcode/swiftui/)
- [Apple 企业应用开发入口](https://developer.apple.com/business/get-started/)
- [Tiimo 的 SwiftUI 迁移案例](https://developer.apple.com/articles/tiimo/)
- [Copilot Money 的 Swift Charts 案例](https://developer.apple.com/articles/copilot-money/)
- [在 Xcode 中运行应用](https://developer.apple.com/documentation/xcode/running-your-app-in-simulator-or-on-a-device)
- [App Store Review Guidelines](https://developer.apple.com/app-store/review/guidelines/)
- [上传 App 构建](https://developer.apple.com/help/app-store-connect/manage-builds/upload-builds/)
