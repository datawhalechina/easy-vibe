# 如何用 Jetpack Compose 开发 Android 原生应用

Android 原生应用不是浏览器里的页面，而是可以直接安装到手机、平板、折叠屏、车机和手表上的程序。

前面做过网页和小程序以后，你可能会问：为什么还要单独做 Android App？最直接的区别是，原生 App 真正安装在手机上，可以更完整地使用通知、相机、蓝牙、NFC、定位、传感器、后台任务和本地文件，也更容易适配手机、平板、折叠屏、车机和手表。

企业里的配送、仓储、巡检、收银、门店、客服和设备管理软件，经常需要这些能力。比如仓库人员用相机扫条码，维修工程师通过蓝牙读取设备，外勤人员在断网时先保存记录，恢复网络后再同步。这些都比“显示一个网页”更接近原生 App 的优势。

## Kotlin、Compose 和 Android Studio 是什么

开发过程中会反复遇到三个名字，先把它们分开：

- **Kotlin** 是编写 Android 业务逻辑的语言；
- **Jetpack Compose** 是用 Kotlin 编写界面的工具；
- **Android Studio** 是创建项目、运行模拟器、调试和打包的开发软件。

可以把它们理解成“语言、界面工具和工作台”。Google 把 Compose 定义为 Android 推荐的现代原生界面工具，并提供 Material Design、深色模式、动画和多尺寸适配。它可以直接使用 Android 平台能力，也能和以前的 View 界面逐步混用，不需要把老项目一次全部推倒。

## 真实产品怎样使用 Compose

Compose 不是只给教学项目使用。Android Developers 的[团队采用页面](https://developer.android.com/develop/ui/compose/adopt)列出了 Airbnb、Lyft、Reddit、Dropbox、SoundCloud、Mercari 和 Play Store 等真实团队。

![Android Developers 面向团队介绍 Compose，并展示 SoundCloud 案例](images/android-compose-official-cases.jpg)

图片来源：[在团队中使用 Compose](https://developer.android.com/develop/ui/compose/adopt)。页面里的案例重点不是“界面看起来像 Google”，而是团队怎样把 Compose 加进已有的大型 Android 产品。

另一个很直观的例子是 Threads。Android Developers 的官方案例介绍，Meta 团队使用 Jetpack Compose，在五个月内完成了第一版 Android 应用；同一期案例还介绍了 Reddit 用 Compose 重做功能，并减少重复代码。

![Android Developers 展示 Threads 的真实开发案例](images/android-threads-reddit-official.jpg)

图片与案例来源：[Android Developers 2023 年 11 月案例](https://developer.android.com/newsletter/android-dev/2023/content/november?hl=en)。同类案例还有 Dropbox 的首页、文件预览和搜索，以及 SoundCloud 面向更多屏幕尺寸的改造。

## 什么时候适合做 Android 原生 App

如果业务以 Android 为主，或者要深入使用相机、蓝牙、NFC、通知、后台任务、离线数据和各种 Android 设备，原生方案通常最稳妥。团队已经有大型 Android 项目时，也可以逐个页面采用 Compose，不必为了追新技术整套重写。

如果只是一个简单表单、活动页或内容查询，而且手机浏览器已经够用，PWA 会更省开发和发布成本；如果第一天就必须同时提供 iOS 和 Android，还要先比较 Flutter、React Native 或分别开发两套原生应用。选原生不是因为它一定“更高级”，而是因为项目确实需要平台能力、长期维护或更细的体验控制。

## 要做的应用：电子木鱼

接下来做一个可以在模拟器和真机运行的 Android 应用：**电子木鱼**。

它会记录点击次数、播放音效、显示动画，并把数据保存在本机。这个案例简单，但会走完企业 Android 项目也必须经历的流程：创建项目、AI 修改、模拟器验证、真机测试、签名打包和发布前检查。

## 1. 准备 Android Studio

从 [Android Studio 官网](https://developer.android.com/studio) 下载当前稳定版。第一次启动时，让安装向导配置 Android SDK、Platform Tools 和模拟器。

![Android Studio 安装向导](images/image1.webp)

![选择 Android SDK 组件](images/image4.webp)

安装完成后，在欢迎页选择 **New Project**，使用一个带 Jetpack Compose 的空白 Activity 模板。

![在 Android Studio 创建新项目](images/image8.png)

项目名填写 `ElectronicWoodenFish`，语言选择 Kotlin，最低系统版本保持模板推荐值即可。

![填写 Android 项目名称和 Kotlin 配置](images/image10.png)

等待 Gradle 同步完成。右下角不再显示下载任务，Build 窗口没有红色错误，才继续下一步。

如果这里失败：

> Android 项目第一次同步失败，错误是【粘贴错误】。请只检查 JDK、SDK 和 Gradle 配置。

## 2. 先运行空白项目

在右侧打开 Device Manager，创建一台普通 Phone 模拟器。系统镜像不必追求最新，选择已经下载且与项目兼容的版本。

![在 Device Manager 创建模拟器](images/image16.png)

![选择一台 Android 虚拟设备](images/image18.png)

启动模拟器，再点击工具栏运行按钮。

![Android 模拟器启动完成](images/image21.webp)

![空白 Android 应用运行成功](images/image22.webp)

看到空白应用，说明 SDK、Gradle、模拟器和项目已经连通。不要在空白项目都无法运行时让 AI 同时增加业务功能。

## 3. 让 AI 做第一版

用 Trae 或 Cursor 打开当前项目目录：

> 请把 Compose 首页改成电子木鱼。点击中间的木鱼后，次数加一，并播放轻微的缩放动画。

![AI 修改 Android 项目文件](images/image15.png)

回到 Android Studio，等待 Gradle 同步，再重新运行。

![电子木鱼第一版在模拟器中运行](images/image23.png)

这一轮只验证：按钮能点、数字每次加一、快速点击不会漏掉大量操作、旋转屏幕后应用不崩溃。

界面不满意时只改一件事：

> 请把木鱼按钮放大，并让次数在小屏幕上也完整显示。不要增加新功能。

## 4. 增加图片和音效

把确认有使用权的木鱼图片放到 `res/drawable`，音效放到 `res/raw`。资源文件名只用小写字母、数字和下划线。

![把图片素材放入 Android 资源目录](images/image24.png)

![准备短音效文件](images/image25.png)

> 请使用 drawable 里的木鱼图片和 raw 里的敲击音效。点击时播放一次，页面离开后释放音频资源。

![AI 接入图片和音频资源](images/image26.png)

重新运行，连续点击十几次。声音不能明显延迟，也不能在切到后台后继续播放。

![带图片和音效的电子木鱼](images/image28.png)

## 5. 增加点击动画

> 请给每次点击增加独立的“+1”上浮动画。快速点击时允许多个动画同时存在，结束后自动清理。

![快速点击时出现多个独立动画](images/image30.png)

不要在提示词里指定复杂状态容器。先描述结果，让 AI 根据当前代码选择实现；只有出现性能或状态问题时，再讨论具体技术。

## 6. 保存次数

> 请把点击次数保存在本机。应用关闭再打开后继续显示原来的数值，并增加“重置”按钮和确认弹窗。

按这个顺序验证：

1. 点击到一个容易识别的数字。
2. 从最近任务中关闭应用。
3. 重新打开，确认数字还在。
4. 点击重置后取消，数字不能变化。
5. 再次重置并确认，数字回到零。

## 7. 处理错误

运行失败时，在 Android Studio 底部打开 Build 或 Logcat，复制第一条与当前应用相关的错误。

> 我点击【操作】后应用退出。Logcat 最相关的错误是【内容】。请只修复这个问题，并告诉我怎样复测。

不要一次粘贴几千行日志，也不要把账号、Token、设备标识和个人数据发给 AI。

## 8. 真机测试

模拟器通过后，再用一台 Android 手机测试触摸、音量、震动和后台恢复。

在手机“开发者选项”中打开 USB 调试，用数据线连接电脑；首次连接时，在手机上确认这台电脑的调试授权。

![在 Android 手机开启开发者选项](images/image39.png)

![允许电脑进行 USB 调试](images/image46.png)

Android Studio 顶部设备列表出现手机后，选择它并运行。

![Android Studio 识别到真机](images/image47.png)

![应用成功安装到 Android 手机](images/image49-sidebar-cropped.webp)

真机至少测试：

- 快速连续点击；
- 静音和不同音量；
- 切到后台再回来；
- 锁屏再解锁；
- 关闭并重启应用；
- 小屏幕和系统大字体。

## 9. 生成测试 APK

给同事内部体验时，可以先生成 Debug APK。它适合测试，不适合正式发布。

在 Android Studio 中选择 **Build APK**，完成后通过通知中的链接打开输出目录。

![Android Studio 生成测试 APK](images/image50.png)

![找到 APK 输出文件](images/image51.png)

把 APK 安装到另一台没有开发环境的手机，重新完成点击、音效、保存和重置测试。

## 10. 生成签名版本

正式分发需要签名。选择 **Generate Signed Bundle / APK**，优先为应用商店生成 Android App Bundle；直接分发时再根据需要生成 APK。

![选择生成签名 Bundle 或 APK](images/image52.png)

![创建或选择签名密钥](images/image53.png)

签名文件和密码不能提交到公开仓库，也不要发给 AI。丢失正式签名材料可能影响后续版本更新，应放进团队的受控密钥管理流程并做好备份。

![生成 Release 构建](images/image54.png)

## 11. 发布前检查

应用商店的账号、测试和资料要求会变化，提交时以对应市场后台的当前提示为准。

发布前至少准备：

- 应用名称、图标、截图和说明；
- 隐私政策与数据安全说明；
- 正确的版本号和包名；
- Release 签名构建；
- 不同系统版本和真机测试结果；
- 图片、字体和音效的商业授权。

![准备应用商店图标和截图](images/image59.png)

![在发布后台填写应用资料](images/image62.png)

## 12. 把电子木鱼装到另一台手机

到了这里，不要只看 Android Studio 里的模拟器。把 Debug APK 发到另一台没有开发环境的 Android 手机上，从桌面图标启动，连续快速点击几次，再锁屏、切回应用并彻底关闭重开。声音还能正常播放，次数也没有丢，这个练习才真正离开了开发电脑。

准备继续发布时，再生成签名版本，并确认密钥文件、密码和没有授权的图片或音效都不在源码里。电子木鱼很小，但创建工程、适配状态、真机测试和签名打包这条路，换成仓储扫描、门店巡检或蓝牙设备应用时仍然要重新走一遍。

## 参考资料

- [Android Studio](https://developer.android.com/studio)
- [Jetpack Compose](https://developer.android.com/compose)
- [在团队中使用 Compose](https://developer.android.com/develop/ui/compose/adopt)
- [Threads 与 Reddit 的 Compose 案例](https://developer.android.com/newsletter/android-dev/2023/content/november?hl=en)
- [在硬件设备上运行应用](https://developer.android.com/studio/run/device)
- [准备和发布 Android 应用](https://developer.android.com/studio/publish)
