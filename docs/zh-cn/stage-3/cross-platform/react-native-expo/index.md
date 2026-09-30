# 从零开始用 React Native + Expo 做一个门店巡检应用

门店巡检应用可以在 Android、iPhone 和浏览器中打开，店员用它查看任务、更新完成进度，并记录现场发现的问题。

标题里的 **React Native** 用来制作 Android 和 iPhone 页面，**Expo** 负责创建和运行项目，**TypeScript** 是编写页面使用的语言。每完成一次修改，都要重新运行项目并检查页面变化。

## 要做的应用：门店巡检

门店每天都有一些重复检查，例如确认冷藏柜温度、查看安全出口、核对陈列和记录交接事项。把这些内容放进应用后，店员打开首页就能看到当天尚未完成的任务。

第一版只做四件事：

1. 显示门店、班次和巡检任务；
2. 勾选已经完成的任务；
3. 写下一条现场问题；
4. 关闭应用后，刚才的记录仍然存在。

等这四件事都能正常使用，再讨论服务器和应用发布。

## 三种已经落地的应用场景

Shopify POS、Discord 和 MTA TrainTime 面向零售、社区交流和公共交通，正好展示 React Native 与 Expo 在三种不同业务里的用法。

### Shopify POS：一个面向门店经营的零售平台

Shopify POS 通常放在收银台，或者拿在店员手里。顾客结账时要用它收款，找商品时要用它查库存，退换货时还要调出订单和顾客资料。门店忙起来以后，这些操作必须连得上、找得到，也不能让店员在几个系统之间来回切换。

![Shopify POS 官方产品页展示的库存和门店界面](images/shopify-pos-product.jpg)

图片来自 [Shopify POS 官方产品页](https://apps.shopify.com/shopify-pos)。

Shopify 在正式采用 React Native 以前，专门用性能较低的 Android 设备做过实验。原因很简单：开发者电脑上运行流畅，不代表门店里的旧设备也能顺畅使用。[Shopify 的技术选型记录](https://shopify.engineering/react-native-future-mobile-shopify)保留了这段过程。

巡检首页也采用这种信息顺序：先显示门店和班次，再显示完成进度、待办任务和现场问题。店员打开页面就能看到当天的巡检状态。

### Discord：一个面向兴趣社群的交流平台

Discord 是一个社区交流平台。用户会在里面聊天、加入语音频道、管理成员和设置不同角色。下面是 Discord 官方展示的手机端角色管理页面。

![Discord 官方展示的 Android 角色页面改版前后](images/discord-react-native-roles.png)

图片来源：[Discord 官方博客：Android 切换到 React Native](https://discord.com/blog/android-react-native-framework-update)。

Discord 原来分别维护 Android 和 iPhone 应用，新功能经常不能同时到达两边。后来改用 React Native，两边可以共用更多页面和功能，但返回手势、字体和系统习惯仍然分别处理。[Discord 的官方说明](https://discord.com/blog/android-react-native-framework-update)记录了这次变化。

巡检页面同样可以共用主要内容，但仍要在 Android 和 iPhone 上分别打开检查。

### MTA TrainTime：一个服务城市通勤者的公共交通平台

纽约大都会运输署 MTA 用 Expo 开发 TrainTime 等出行应用。乘客可能在赶车时查下一班列车，在站台上买票，上车后再向工作人员出示车票。这些操作都发生在时间紧、网络环境不断变化的通勤途中。

![Expo 官方案例展示的 MTA TrainTime 应用](images/expo-mta-case.webp)

图片来源：[Expo 官方 MTA 案例](https://expo.dev/customers/mta)。

MTA 的团队使用 Expo 提供的打包和更新服务。“打包”就是把开发中的项目做成可以安装的测试应用；“更新”就是把已经确认的小修改送到用户设备。根据 [Expo 的 MTA 案例](https://expo.dev/customers/mta)，他们遇到严重问题时，可以很快发布修复。

应用发布时，需要区分开发中的页面、给同事使用的测试版和公开提供给用户的正式版。

## 第一步：认识项目的三个组成部分

下面这张图展示三个部分的关系：中间是要创建的项目；React Native 负责把页面显示到手机上；Expo 负责启动项目，并在以后把它制作成测试应用。

![React Native 与 Expo 的项目结构](images/react-native-expo-architecture.svg)

中间的项目保存页面和功能。React Native 负责把页面显示到 Android 和 iPhone，Expo 帮助项目启动和打包；同一套页面也可以在浏览器中打开。

Android、iPhone 和浏览器可以共用主要代码，各自的运行结果仍要分别打开和检查。

## 第二步：准备开发工具

在浏览器里打开第一版，需要准备两样工具：

- **Node.js**：让电脑能够运行项目工具。安装页面里看到 LTS 时，选择它即可；LTS 表示维护时间较长的稳定版本。
- **代码编辑器**：用来打开项目并和 AI 一起修改文件，Trae、VS Code 等都可以。

浏览器版本完成后，Android 使用 Android Studio，iPhone 使用 Xcode。它们分别是 Google 和 Apple 提供的手机应用开发工具。

验证环境使用 Node.js 22.14 和 Expo SDK 57。SDK 是 Expo 提供的一套开发能力；创建新项目时使用工具给出的当前版本即可。

## 第三步：创建并打开空白项目

新建一个空目录，用 AI 编程工具打开，然后说：

> 请创建一个名为 store-inspection 的 Expo TypeScript 项目。

也可以直接执行 Expo 官方脚手架：

```bash
npx create-expo-app@latest store-inspection --template blank-typescript
cd store-inspection
npx expo start
```

这里的“脚手架”就是自动创建项目文件的工具。三行命令分别表示：创建项目、进入项目目录、启动项目。

终端出现二维码以后，按 `W` 打开浏览器。看到空白页面，就说明项目已经成功启动。Android 和 iPhone 的打开方法放在第九步。

Expo 官方的[创建项目教程](https://docs.expo.dev/tutorial/create-your-first-app/)也使用 `npx expo start`，并逐项解释了三种运行入口。

如果项目没有启动，把错误信息交给 AI：

> Expo 没有启动，错误是【粘贴错误】。请只修复启动问题。

## 第四步：搭出巡检首页

先从一张很简单的首页开始。第一步只放门店名称和班次：

> 请把首页标题改成“门店巡检”，并显示门店名称和班次。

页面能正常打开以后，再加入任务：

> 请在首页加入四项巡检任务，先用演示数据。

任务显示正常后，补上完成进度和“现场问题”区域。这两个区域先使用静态内容。

> 请显示巡检完成进度，并在任务列表下面加入“现场问题”区域。

下面的截图来自本次创建的 Expo 项目，页面实际运行在浏览器中。

![门店巡检应用真实运行在 Expo Web](images/expo-web-running.png)

浏览器窗口变窄后，内容应该变成手机宽度，按钮和文字不能挤在一起。

![同一个 Expo Web 应用的窄屏布局](images/expo-web-mobile-layout.png)

这张窄屏图只用于检查页面在较窄窗口中的排列。Android 和 iPhone 的运行结果仍要在对应设备中验证。

界面不满意时，不要让 AI 全部重写：

> 首页信息太多。保留门店、进度、巡检项目和现场问题，其他先删掉。

## 第五步：让巡检任务可以勾选

静态页面顺眼以后，先让任务可以勾选：

> 请让巡检任务可以勾选和取消。

确认四项任务都能正常点击以后，再处理顶部的进度：

> 请让完成进度根据已勾选的任务数量变化。

现在逐项点击：勾选一项，进度增加；取消勾选，进度减少。先把这条最基本的交互测通。

如果数字变化不对：

> 我勾选一项后进度错误。请只修复进度计算，不改页面样式。

## 第六步：让店员记录现场问题

任务可以勾选以后，再给店员一个记录问题的地方：

> 请在“现场问题”区域加入输入框和保存按钮。

输入框能打字以后，再处理空内容：

> 没有填写内容时不要保存，并在输入框下面提示“请填写现场问题”。

最后再处理保存成功的结果：

> 保存后清空输入框，并把刚才的内容显示在下面。

实际操作时，勾选“检查安全出口”以后，进度从 `1/4` 变成 `2/4`；输入“消防通道有纸箱，已通知值班员移走”并保存，记录出现在页面，输入框也恢复为空。

![真实点击和保存后的巡检记录](images/expo-web-record-saved.png)

文字记录完成后，可以使用 Expo 的拍照和相册工具 [ImagePicker](https://docs.expo.dev/versions/latest/sdk/imagepicker/)增加照片记录。

## 第七步：关闭应用后保留记录

现在记录只能停留在当前页面里。刷新页面或关闭应用以后，它很可能就消失了。

这一阶段的完成标准是：**再次打开应用时，刚才的进度和记录还在。**

> 请把巡检进度和现场记录保存在本机。

改完以后，按下面的顺序检查：

1. 勾选两项巡检任务；
2. 保存一条现场问题；
3. 完全关闭应用；
4. 重新打开，确认刚才的数据还在。

AI 可能会选择 AsyncStorage。它像应用自己的小记事本，适合保存少量数据。记录数量增加并需要搜索和分类时，可以使用 [Expo 的本地数据库](https://docs.expo.dev/versions/latest/sdk/sqlite/)。

## 第八步：把一条记录上传到服务器

保存在本机的数据只能留在这台设备上。换一台手机，或者店长想在后台查看，就需要把记录上传到服务器。服务器可以先理解成一处放在网络上的公共存储，经过允许的手机和后台都能从这里读取数据。

上传功能从一条巡检记录开始。先让 AI 列出所需条件：

> 我想把巡检记录同步到服务器。请先告诉我最少需要准备什么，不要修改代码。

准备好服务器地址以后，再让 AI 只做上传功能：

> 请先实现“上传一条巡检记录”。

上传成功时，页面显示“已同步”；上传失败时，本机记录仍然要保留。分别测试一次成功和一次失败，确认结果看得懂，再继续增加自动重试。

一条记录上传成功后，可以依次增加登录、门店权限、图片上传和不同账号的数据隔离。

## 第九步：分别在 Android、iPhone 和浏览器中打开

浏览器版本运行成功后，保持项目运行，并分别在 Android 和 iPhone 中打开。

### 在 Android 中打开

Android Studio 是 Google 提供的 Android 开发工具。安装完成后，在里面创建并启动一台虚拟手机，再回到 Expo 终端按 `A`。

也可以在 Android 真机上安装 Expo Go。Expo Go 是一个预览应用，用它扫描终端里的二维码，就能打开当前项目。

完成标准包括三项：应用可以打开、系统返回键可以使用、输入框不会被键盘挡住。

### 在 iPhone 中打开

Xcode 是 Apple 提供的开发工具，只能安装在 Mac 上。安装完成后，还要在 Xcode 设置里下载一套 iPhone 模拟系统。启动模拟 iPhone，再回到 Expo 终端按 `I`。

检查顶部内容有没有被刘海挡住、返回手势能不能使用、输入框会不会被键盘挡住。浏览器窄屏截图不能作为 iPhone 验证结果。

### 在浏览器中打开

按 `W` 后检查鼠标与键盘操作、浏览器刷新和窄屏布局。准备发布网页时，再生成可以放到网站服务器上的文件：

```bash
npx expo export --platform web
```

临时项目已经通过 TypeScript 检查，也成功生成了可以部署的网站文件。页面的勾选、进度变化与文字保存都在浏览器中实际操作过。

这台测试机没有可启动的 Android 虚拟手机，也没有下载 iPhone 模拟系统。因此这里没有把 Android 和 iPhone 写成“已验证”，更没有用浏览器截图代替手机截图。

## 第十步：制作自己的测试应用

Expo Go 是大家共用的体验工具，适合查看第一版页面。项目继续开发以后，需要制作一个只属于当前项目的测试应用，这就是 Development Build。

先问清楚本机还缺什么：

> 请列出配置 Development Build 前需要准备的内容，不要修改项目。

准备完成以后再说：

> 请为当前项目配置 Development Build。

Expo 可以在本机制作测试应用，也可以使用它的云端打包服务。首次配置时，可以按照官方的 [Development Build 教程](https://docs.expo.dev/develop/development-builds/introduction/)逐步完成。

使用云端服务需要 Expo 账号。测试应用安装成功后，公开发布还需要 App Store 或 Google Play 的开发者账号。

开发版安装到真机以后，再测试相机、照片、通知、离线恢复和后台切换。模拟器能打开，不代表这些设备能力已经完成。

## 第十一步：给关键操作加自动检查

先给已经跑通的两个小功能补测试。一次只测一件事：

> 请测试：勾选一项任务后，完成进度会增加。

第一条通过以后，再加第二条：

> 请测试：现场问题为空时不能保存。

这种由程序自动重复检查的过程叫作“自动测试”。Expo 的[测试教程](https://docs.expo.dev/develop/unit-testing/)介绍了具体做法。自动测试先守住这些简单规则；相机、权限和手机性能仍然要在真机上检查。

准备给同事试用时，先做内部版本。Android 和 iOS 分开准备：

> 请告诉我生成 Android 内部测试版需要准备什么。

Android 跑通以后，再处理 iOS：

> 请告诉我生成 iOS 内部测试版需要准备什么。

“内部测试版”只发给自己和同事，不会直接出现在应用商店里。Expo 的[内部发布说明](https://docs.expo.dev/review/overview/)介绍了分享方式。先让少量用户使用稳定，再考虑公开发布。

## 第十二步：请一位真实用户试用

完成前面的步骤后，请一位没有参与开发的同事试一次：打开当天任务，勾选两项，写一条现场问题，然后完全关闭应用再重新打开。

先看他能不能独立完成这四步。如果服务器同步也已经接好，再让他点击一次上传，看看他能不能分清“保存在本机”和“已经同步”。

如果同事总要问“我刚才到底保存了吗”，说明页面没有把结果讲清楚。先把“已经保存在本机”和“已经上传”显示明白，再继续增加功能。

浏览器版本已经实际验证三件事：任务能勾选、进度会变化、现场文字能保存。把同一个项目装到 Android 和 iPhone 后，再验证关闭后保留记录、拍照、登录和门店权限。每完成一步，就留下对应设备的截图。

## 第十三步：模拟一次早班和晚班的交接

先用同一台设备完成一次交接测试：

1. 以早班店员的身份打开应用，完成三项巡检；
2. 保存一条“冷藏柜温度偏高，已通知店长”的现场记录；
3. 完全关闭应用，再重新打开；
4. 检查三项任务的进度和现场记录是否仍然存在；
5. 以晚班店员的视角继续完成最后一项任务。

完成标准很明确：晚班店员打开应用后，不需要询问早班店员，就能看懂哪些任务已经完成、现场发生了什么，以及自己还要处理哪一项。

如果已经接入服务器，再使用两个测试账号重复一次。账号 B 应该能看到同一家门店允许共享的交接记录，但不能看到其他门店的数据。页面上隐藏某个入口不算权限控制，服务器也必须拒绝越权读取。

目前已经确认浏览器版可以勾选任务、更新进度和保存现场文字。Android 与 iPhone 仍要分别安装测试，重点检查关闭应用后的恢复、拍照权限和弱网状态。完成这些验证以后，门店巡检应用的第一版才算真正跑通。

## 想继续深入时可以看这些资料

- [React Native：使用框架创建新项目](https://reactnative.dev/blog/2024/06/25/use-a-framework-to-build-react-native-apps)
- [React Native 官方产品 Showcase](https://reactnative.dev/showcase.html)
- [Expo：Android、iOS 和 Web 通用应用教程](https://docs.expo.dev/tutorial/introduction/)
- [Expo：开发流程与 Development Build](https://docs.expo.dev/workflow/overview/)
- [Expo：本地优先应用](https://docs.expo.dev/guides/local-first/)
- [Expo：应用测试](https://docs.expo.dev/develop/unit-testing/)
- [Expo：构建、更新与提交](https://docs.expo.dev/tutorial/eas/introduction/)
- [Shopify Engineering：React Native 移动端实践](https://shopify.engineering/react-native-future-mobile-shopify)
- [Discord：Android 客户端切换到 React Native](https://discord.com/blog/android-react-native-framework-update)
- [Expo：MTA 生产案例](https://expo.dev/customers/mta)
