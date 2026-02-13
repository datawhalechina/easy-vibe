# 如何构建属于自己的个人网页与学术博客教程-GitHub Pages 静态部署

# 1 什么是个人网页与学术博客？

在这篇教程中，我们将完整跑通一条闭环： **从寻找一个现成的网页模版，到将其修改为埃隆·马斯克（Elon Musk）的个人主页** ，并最终让它在互联网上免费发布。

本次教程，你至少需要具备：

* **一台电脑** （Windows 或 Mac 均可）
* **你的 GitHub账号** （用于存放网站代码和免费托管）
* **已下载 Trae** （你的 AI 编程搭子）
* **Git 环境**
* **Ruby 环境**

## 1.1 个人学术主页的定义

**个人学术主页 (Academic Homepage)** 是你在互联网上的一块“私有领地”。

与微信朋友圈、知乎或 LinkedIn 不同，它不依赖于任何社交平台的算法推荐，也不会因为平台倒闭而消失。它是一个长期稳定、可被 Google/Google Scholar 索引的 **个人展示空间** 。它通常包含你的简介 (Bio)、发表的论文 (Publications)、参与的项目 (Projects) 以及技术博客 (Blog)。

![](images/image1.png)

## 1.2 为什么要构建自己的网页

在 Vibe Coding 开发模式中，我们不再需要像十年前那样去啃厚厚的 HTML/CSS 书籍。借助 AI，我们将建站的角色从“苦逼的码农”转变为“网站主编”：

1. **你（主编/**  **PM**  **）** ：负责决定网站的“调性”和内容。例如：“这里要放马斯克的火星殖民计划 PPT”、“把这个按钮改成特斯拉红”。
2. **Trae（AI 工程师）** ：负责脏活累活。它将你的自然语言指令转化为复杂的代码，处理排版、配色和移动端适配。
3. **GitHub  Pages（展示台） ：**负责提供免费的服务器和域名，让全世界都能看到你的作品。

**为什么学术人（或技术人）值得拥有它？**

* **对外（建立影响力）** ：它是你的一张 **“永不过期的名片”** 。当申请博士、求职或寻找合作时，一个整理得井井有条的主页，远比一份 PDF 简历更具说服力。
* **对内（知识沉淀）** ：它是你的 **“第二大脑”** 。你可以用它记录课程笔记、技术思考，构建自己的知识体系。
* **对未来（被看见）** ：搜索引擎喜欢结构化的内容。拥有主页，意味着当别人搜索你的名字时，**你定义的内容**会排在最前面，而不是同名的其他人。

## 1.3 构建个人网页的四种典型方式

在实际操作中，搭建网站有无数种方法，我们只介绍最主流的四种：

 **第一种方式：从零手写 (**  **HTML**  **/**  **CSS**  **/**  **JS** **)** 这是计算机专业的传统路线。你需要一个字一个字地敲代码。优点是极其灵活，想做什么样都行；缺点是门槛极高，容易在调样式（CSS）中崩溃，不适合专注于内容的我们。

![](images/image2.png)

 **第二种方式：可视化建站 (**  **Wix**  **/**  **WordPress** **)** 类似“搭积木”。优点是简单拖拽；缺点是通常需要付费，且生成的代码臃肿，不具备“学术极客感”，很难做深度定制。

![](images/image3.png)

**第三种方式：基于 ****GitHub**** 模板 (Static Site Generator)** 这是学术界和极客圈**最推荐**的主流路线。我们直接复刻（Fork）别人写好的成熟模版（如 Jekyll 或 Hugo 框架），然后只修改配置文件和内容。

![](images/image4.png)

 **第四种方式：Vibe Coding（AI 视觉生成流）** 依托于具备强大多模态视觉理解能力的 AI Agent，你只需要在网上看到一个喜欢的网页风格，直接截一张图发给 AI：“照着这个图给我写一个网页”。AI 就能瞬间将图片中的视觉元素解析并生成对应的底层代码。

![](images/image5.png)

 **本教程的选择：** **GitHub Pages + 学术模板 + AI 修改。** 原因很简单：

* **零成本** ：不需要买服务器，不需要买域名。
* **高逼格** ：模板通常由顶尖开发者设计，极简、专业、加载速度快。
* **易维护** ：你只需要写 Markdown（类似写飞书文档/Notion），AI 会帮你自动生成网页。

## 1.4 本教程的完整路线图

为了让枯燥的配置过程变得直观，本教程将以一个 **有趣的案例——《为马斯克做一个学术主页》** 来展开实操。

Elon Musk 虽然不是大学教授，但他也有不少公开的“技术白皮书”（如 Hyperloop Alpha）和知名项目（如 SpaceX/Tesla）。我们将拿这些资料当测试数据，结合 Trae 的 Vibe Coding 模式，带你跑通一条可以反复复用的建站路线：

1. **寻找骨架** ：在 GitHub 上找到高质量的网页模版，并“Fork”（复刻）到自己的仓库。
2. **环境准备** ：将代码拉取到本地，并配置好 Trae，确保 AI 能读取你的项目。
3. **AI 迭代修改** ：通过与 AI 的对话，把模版里的“张三”替换成“Elon Musk”，上传他的简历，把“论文列表”改成“技术白皮书展示”，甚至让 AI 帮你把网站配色改成“火星红”。
4. **部署上线** ：将修改后的代码推送回 GitHub，瞬间获得一个可访问的网址。

这一节只负责把全景图画出来。现在只需要记住这条主线： **Fork 模版 → AI 装修 → 推送上线** 。接下来的章节，我们会手把手带你走完每一步。

# 2 环境准备

## 2.1 本教程会用到的工具

整个搭建过程我们需要配合使用四个工具（或者说资源），它们分别承担了“设计施工”、“免费地皮”和“物流运输”的角色。

* **一台电脑** ：Windows 或 Mac 均可。不像 Android 开发对内存要求很高，网页开发非常轻量，普通的办公笔记本就能流畅运行。
* **Trae** **：**这是你的  **AI 编程搭子** （核心生产力）。在 Vibe Coding 模式下，你不需要精通 HTML 或 CSS 语法，而是主要在 Trae 里通过自然语言告诉 AI：“把导航栏改成黑色”、“把马斯克的照片放上去”，由它来负责编写和修改代码。
* **GitHub** **账号 ：**这是你的  **“免费服务器”和“代码保险箱”** 。我们需要它来存放网站的所有文件，最重要的是，利用它提供的 **GitHub Pages** 功能，我们可以免费将代码变成一个全球可访问的网址（URL），省去了购买服务器和域名的费用。
* **Git 环境** ：这是幕后的  **“快递员”** 。虽然我们在 Trae 里写好了代码，但需要通过 Git 才能把代码从你的电脑“推送”到 GitHub 上。你不需要精通 Git 命令，Trae 会帮我们调用它，但你的电脑里必须先安装好这个基础环境。
* **Ruby环境：** 这是本地的 **“网页加工厂”** 。因为我们示例用的的学术模版（Jekyll）是基于 Ruby 运行的，有了它，我们才能在把代码传到网上前，先在自己的电脑上预览网页的“装修效果”。

## 2.2 Trae 下载

**Trae** 是我们进行 Vibe Coding 的主战场。你可以把它简单理解为一个  **“内置了超级 AI 的代码编辑器”** 。它不像传统的编辑器那样冷冰冰，而是像一个随时待命的资深程序员，坐在你旁边帮你写代码。

* **下载地址** ：请访问官网 [https://www.trae.cn](https://www.trae.cn)，根据你的电脑系统（Windows 或 Mac）下载对应的版本。
* **安装** ：安装过程非常简单，和安装微信、QQ 一样，双击安装包并按提示一路点击“下一步”即可完成。

准备好这个工具后，在接下来的实战中，我们就不需要面对枯燥的代码框发呆了，而是直接在这里打开项目，通过右侧的对话框用自然语言（中文）指挥 AI 帮我们写代码、改 Bug、甚至重构整个页面。

![](images/image6.png)

## 2.3 Git 下载

**Git 是什么？** 如果在 Vibe Coding 中 Trae 是负责写代码的“AI 工程师”，那么  **Git 就是负责运输代码的“快递员”** 。 你需要它把你在本地电脑上写好的代码，打包并安全地“推”送到 GitHub 这个云端仓库里去。没有它，你的网站只能在你自己的电脑上跑，别人看不到。

以前你需要去官网下载安装包，还要配置环境变量，非常麻烦。现在，我们直接让 Trae 帮我们检测和安装。

**第一步：检查是否已安装**

打开 Trae，在右下角的 Chat（对话框）中输入以下指令：

```Markdown
请帮我检查当前电脑是否已经安装了 Git。请在终端执行 git --version 命令。
```

* **情况 A（已安装）** ：如果你看到类似 `git version 2.xx.x` 的回复，恭喜你，你可以直接跳过下载步骤！
* **情况 B（未安装）** ：如果你看到“命令未找到”或一系列红色报错信息，请继续往下看。

![](images/image7.png)

**第二步：AI 辅助安装**

 不要关闭 Trae，直接继续在对话框输入：

 **指令**  **（Windows 用户）** ：

```Markdown
我没有安装 Git。请帮我写出使用 winget 命令行工具自动安装 Git 的指令，并告诉我如何在终端运行它。 
```

 **指令  （ Mac 用户） ：**

```Markdown
我没有安装 Git。请告诉我如何通过终端命令行快速安装 Git（例如使用 git 或者是 brew）。
```

Trae 会给你一段代码（通常是 `winget install --id Git.Git`）。

你只需要点击代码块右上角的 "**Run in  Terminal** **"（在终端运行）** 按钮，或者复制到底部终端回车，它就会像黑客帝国一样自动为你下载并安装 Git。

若您认为上述的AI辅助过程，仍然存在尚不完善的地方，您可参考该教程进行手动下载安装 [Git下载及安装保姆级教程](https://blog.csdn.net/weixin_41293671/article/details/144255269?ops_request_misc=elastic_search_misc&request_id=63236900b52320a7beb177787ba97f07&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~baidu_landing_v2~default-5-144255269-null-null.142^v102^pc_search_result_base4&utm_term=git%E4%B8%8B%E8%BD%BD%E5%AE%89%E8%A3%85&spm=1018.2226.3001.4187)

## 2.4 Ruby 环境下载

在正式动手写代码前，我们还需要最后一块拼图。本次教程使用的学术主页模版（基于 Jekyll 框架）是使用 Ruby 这门编程语言构建的。

为了能在把代码传到 GitHub 给全世界看之前，先在自己的电脑上预览和调试“装修效果”，我们必须在电脑上安装 Ruby 环境。这就好比是给你的电脑请了一位懂 Ruby 语言的“翻译官”。别担心，你完全不需要去学怎么写 Ruby 代码，只要把它装好，接下来的活儿全交给 Trae 即可。

### 2.4.1 Windows 安装

**第一步，下载安装包（选择国内镜像）**

对于 Windows 用户，官方https://rubyinstaller.org/downloads/提供了一键安装包，但由于网络环境差异，我们需要掌握一点小技巧。官方推荐新手使用 **`Ruby+Devkit 3.X.X (x64)`** 版本，因为它自带了必要的编译工具链。

 *新手特别提醒* ：实际情况是，如果直接去官网下载，往往会卡住或者下载失败。因此，我们强烈建议直接访问 [RubyInstaller for Windows - 国内镜像](https://rubyinstaller.cn/) 网站进行下载 ，速度会快很多。

![](images/image8.png)

**第二步：执行安装**

双击下载好的安装包。在弹出的安装向导中，请务必勾选  **“Add Ruby executables to your PATH”** （添加到系统环境变量）。这是最关键的一步，否则电脑会“找不到”你刚刚安装的翻译官。

勾选后，一路按提示默认点击“Next”完成安装。

![](images/image9.png)

**第三步：配置开发套件**

安装进度条走完后，会自动弹出如下的黑色的命令行窗口。不要慌张，直接在光标处输入数字 `3`（代表安装 MSYS2 基础环境和 MINGW 工具链），然后按下回车键。耐心等待屏幕上的代码跑完，窗口自动关闭即可。

![](images/image10.png)

**第四步：验收成果**

是时候让 AI 帮我们检查作业了！打开 Trae，在右侧的 Chat（对话框）中，直接输入下面这段自然语言指令：

```Markdown
请帮我检查当前电脑是否已正确安装了 Ruby 环境。 请在底部的终端里执行 ruby -v 命令，并告诉我结果。
```

如果你看到 Trae 回复了类似 `ruby 3.x.x` 的版本号，恭喜你，Windows 下的 Ruby 环境配置彻底成功！

![](images/image11.png)

### 2.4.2 Mac安装

Mac 系统的配置相对更具有“极客范”，通常需要敲黑客一样的命令行。但在 Vibe Coding 模式下，我们连终端都不用自己打开，直接让 Trae 充当你的私人 IT 运维即可。

 **第一步：下达“一键配置”** **指令**

打开 Trae，在右侧的 Chat（对话框）中，直接复制并发送下面这段自然语言指令。我们将“检查环境”、“安装管家(Homebrew)”和“安装 Ruby”的三个步骤一次性交办给它：

```Markdown
我使用的是 Mac 电脑，现在需要配置 Ruby 开发环境。请帮我完成以下步骤：
1. 检查我的电脑是否已安装 Homebrew。如果没有，请帮我在终端执行 Homebrew 的官方安装脚本。
2. 确认 Homebrew 就绪后，请在终端执行 brew install ruby 来安装 Ruby。
3. 全部完成后，执行 ruby -v 命令检查是否安装成功。
请一步步带我操作，并在需要时直接为我提供可以点击运行的终端命令。
```

收到指令后，Trae 会开始干活，并在对话框里为你生成带运行按钮的代码块。你只需要推进执行即可。

**⚠️ 新手必看：**

在安装 Homebrew 时，终端通常会弹出一行英文（比如 `Password:` ），要求你输入 Mac 的开机密码。

 **注意！** 在 Mac 终端里输入密码时，屏幕上是不会显示任何字符或星号的（看起来就像没输一样）。不要慌，这是正常的防偷窥机制。盲打完你的开机密码，直接按回车即可。

**第二步：验收成果**

同样地，安装完成后，我们可以回到 Trae。在右侧的 Chat（对话框）中输入命令：

```Markdown
我刚才在 Mac 上通过 brew 安装了 Ruby。请帮我在终端执行 ruby -v 命令，检查是否正确安装并配置好了环境变量。
```

当你在底部的终端屏幕上看到类似 `ruby 3.x.x` 的字样时，就说明“本地网页加工厂”已经竣工。你的 Mac 已经准备好随时开始 Vibe Coding 了！

## 2.5 注册Github账号

**GitHub是什么？** 如果说 Git 是快递员，那么  **GitHub 就是“云端仓库”兼“展示厅”** 。 它不仅免费帮我们托管代码，最重要的是，它提供的 **GitHub Pages** 功能，能免费把我们的代码变成一个全球可访问的网址（URL）。它是目前全球最大的代码托管平台，拥有一个 GitHub 账号也是进入技术圈的“通行证”。

**注册步骤：**

1. **访问官网** ：打开 [https://github.com/](https://github.com/)。
2. **点击注册** ：点击右上角的  **"Sign up"** 。

![](images/image12.png)

3. **填写信息** ：
4. **Email** ：输入你的真实邮箱。
5. **Password** ：设置一个强密码。
6. **Username（关键！）** ：**请慎重起名！** 因为你的个人主页网址将是 **`https://你的用户名.github.io`**。建议使用你的英文名拼音、常用 ID 或者由字母数字组成的简洁名称，**不要**起类似 `a1b2c3d4` 这种乱码，否则你的个人主页链接会很难记。
7. **验证与启动** ：完成人机验证（通常是旋转图片或选出螺旋星系），去邮箱查收验证码。

![](images/image13.png)

注册完成后，你就拥有了一块属于自己的互联网“地皮”，接下来的章节，我们将开始在这块地皮上动工了！

![](images/image14.png)

# 3 从模板到第一个可访问页面

万事俱备。前两章我们准备好了工具，这一章我们要正式在互联网上“圈地”了。本章的任务非常单纯：**先不管“装修”和内容，先把网站的“骨架”搭起来，并拿到访问链接。**

我们将直接复刻（Fork）一个成熟的学术模版，利用 GitHub Pages 的自动化能力，在 20分钟内让它跑起来。完成后，你将拥有一个全球可访问的链接。

## 3.1 获取网页模版

在 Vibe Coding 模式下，我们不需要从零写 HTML。GitHub 上有成千上万个优秀的开源模版，我们只需要“借”一个过来，改成自己的名字即可。

**第一步，找到模版**

在这里，我们为你精选了一个结构清晰、适合学术展示的经典模版 https://github.com/luost26/academic-homepage?tab=readme-ov-file（基于 Jekyll 框架）。  *(* *当然，你也可以在 **GitHub** 搜索 **`academic-homepage`** 寻找其他你喜欢的风格，但为了跟随教程，建议先使用上述模版)*

我们在这里也给你准备了一些其他模版推荐

* Minimal Light 个人主页主题（简洁可自用）：https://github.com/yaoyao-liu/minimal-light?
* Minimal Mistakes（灵活多用）： [https://github.com/mmistakes/minimal-mistakes](https://github.com/mmistakes/minimal-mistakes?utm_source=chatgpt.com)
* Pixyll（简洁轻量）：https://github.com/johno/pixyll
* Hydejack（个人展示全能）：https://github.com/hydecorp/hydejack
* Forty Jekyll Theme（网格铺陈风格）：https://github.com/andrewbanchich/forty-jekyll-theme
* Leonids（经典两栏博客）：  https://github://github.com/renyuanz/leonids
* YAT（现代扁平风）：https://github.com/jeffreytse/jekyll-theme-yat

**第二步，Fork复刻项目**

访问目标仓库主页，点击页面右上角的 **Fork** 按钮。 此时会弹出一个确认框，直接点击  **Create Fork** 。

* 解释 ：这步操作相当于把别人的“代码仓库”完整复制了一份钥匙到你自己的 GitHub 账号下。现在，你拥有了这个网站的所有权。

![](images/image15.png)

**第三步：重命名仓库（最关键的一步）**

将仓库名称（Repository name）修改为： `你的用户名.github.io`

 **⚠️ 新手必读** ：这是 GitHub Pages 的铁律！ 例如，如果你的 GitHub 用户名是 `musk-fan`，那么仓库名**必须**叫 `musk-fan.github.io`。只有这样，GitHub 才会自动为你分配免费的域名。如果名字不对，后续网页将无法打开。

![](images/image16.png)

## 3.2 获取 Github 项目URL

修改完名字后，我们需要拿到这个仓库的“提货单”。

1. 回到仓库主页（点击左上角的 Code 标签）。
2. 点击绿色的 **Code** 按钮。
3. 确保选择 **HTTPS** 选项卡。
4. 点击复制按钮，复制那个以 `.git` 结尾的URL（例如 `https://github.com/musk-fan/musk-fan.github.io.git`）。

![](images/image17.png)

## 3.3 将项目拉到本地

在过去，程序员需要在黑色窗口里敲复杂的 Git 命令来下载代码。但在 Vibe Coding 时代，我们有 Trae。我们只需要告诉 AI：“我要这个，帮我拿下来。”

**第一步：准备工作**

在你的电脑上新建一个文件夹（例如命名为 `MyWebsite`），然后右键选择 “用 Trae 打开”（或者打开 Trae 后选择 Open Folder）。

![](images/image18.png)

**第二步，下达克隆命令**

Trae 打开后，呼出右侧的 AI 对话框（Chat），输入以下自然语言指令：

```Plain
请帮我把远程 GitHub 仓库克隆到当前文件夹。 
仓库地址：粘贴你刚才复制的 URL，例如 https://github.com/musk-fan/musk-fan.github.io.git
执行要求：请直接在终端执行 git clone 命令。
```

**第三步：确认下载**

Trae 会自动调起底部的终端并执行命令。等待几秒钟，当你看到左侧的文件目录里多出了 `_config.yml`、`index.html` 等文件时，说明项目已经成功“搬”到了你的电脑上！

![](images/image19.png)

## 3.4 本地预览网页

代码拉到本地了，环境（Ruby）也装好了。在正式修改网站之前，我们必须先在自己的电脑上“验收”一下。这就好比装修房子，你得先在样板间里把家具摆好，觉得满意了再正式对外开放。

这就好比装修房子，你得先在样板间里把家具摆好，觉得满意了再正式对外开放。得益于我们在 **2.4 节** 安装好的 Ruby 环境，这个过程现在变得非常简单。

**第一步：安装依赖**

Jekyll 网站需要依赖很多插件（Gems）才能运行。这步操作就像是照着清单把家具都买回来。  **但是注意，** 由于网络原因，直接下载可能会卡住。我们让 Trae 帮我们**切换到国内的高速镜像源**并安装。

在 Trae 的 Chat 框中输入以下指令：

```Markdown
我需要安装 Jekyll 依赖。考虑到网络环境，请先帮我将 Gemfile 文件中的 source 修改为国内镜像 https://gems.ruby-china.com/。 修改完成后，请在终端执行 bundle install 命令来安装所有依赖。
```

**第二步：启动本地服务**

现在，我们要启动一个“本地小服务器”，模拟网站运行的状态。继续给 Trae 下达指令：

```Markdown
依赖安装完成了。请帮我在终端启动 Jekyll 本地预览服务。 请执行 bundle exec jekyll serve 命令。
```

终端运行几秒后，你会看到类似 `Server address: ``http://127.0.0.1:4000/academic-homepage/```的提示。

1. **打开浏览器** ：点击那个链接，或者直接在浏览器地址栏输入上述这个链接 `http://127.0.0.1:4000/academic-homepage/`。
2. **见证奇迹** ：看！你的网站已经在浏览器里跑起来了。虽然现在的名字还是模版作者的，但它已经实实在在地运行在你的电脑上了。

接下来，我们更改的内容，只要按 `Ctrl+S` 保存，再刷新一下浏览器，你会发现**网页内容就会随之而变**

![](images/image20.png)

确认本地没问题后，我们就可以进入下一章，开始大刀阔斧地把这个网站变成“马斯克”的形状了。

# 4 AI 辅助修改内容

为了让大家快速体验全流程，我们不使用自己的真实信息（避免隐私泄露焦虑），而是以 **埃隆·马斯克（Elon Musk）为例** ，帮他补做一个学术主页。这样不仅能让我们抛开“写简历”的枯燥压力，专注于体验 Vibe Coding 的建站乐趣，还能顺便看看这位“硅谷钢铁侠”的硬核技术白皮书（如 Hyperloop Alpha）挂在学术网站上会有多么酷炫的效果。我们将跑通从“获取模版”到“网站上线”的完整闭环，亲手打造一个世界级的个人展示空间。

接下来，请跟随我的节奏，向 AI 发出第一道指令。

## 4.1 统一前置约束

这个是“总前置 Prompt”，只需要发一次即可。 它的作用是给 AI 立规矩，防止它“自由发挥”导致网站结构崩塌。请直接复制发送给 Trae：

```Plain
你现在是一个“GitHub Pages + Jekyll 学术主页模板”的站点维护者。
当前仓库是一个 Jekyll 驱动的学术主页（含 _config.yml、_data、_layouts 等）。
你的修改必须满足以下原则：
1. 每一步修改只做“当前阶段目标”，禁止提前做后续阶段内容
2. 不修改站点结构、不引入新插件、不改主题风格
3. 所有内容必须可被 Jekyll 正常渲染
4. 所有身份信息为“学术风格模拟”，不得使用第一人称
5. 不引入明显虚构的 IEEE / Nature 论文
6. 如果信息不确定，请使用“公开广泛认可的事实”或“合理学术模拟标注”
```

## 4.2 打造马斯克主页（内容篇）

### 4.2.1 第一次“总指令”：身份替换

我们首先要解决的是“我是谁”的问题。模版里填满了原作者的信息，我们需要用 AI 一键将它们替换。

**第一步：准备素材**

将我提供给你的图片素材（`University_of_Pennsylvania.jpg`、`Queen_University.jpg`）放入项目文件夹的对应位置（通常是 `/assets/images/badges/`）。

![](images/image21.png)![](images/image22.png)

**第二步：下达****指令**

在 Trae 右侧的 Chat 聊天框中，输入下面这段 Prompt。注意，我们不需要自己去一行行找代码，直接把需求告诉 AI：

```Plain
一、目标：将当前学术主页的“人物身份”替换为 Elon Musk（埃隆·马斯克），仅修改基础信息。
二、具体要求：
1.姓名：Elon Musk
2.职业身份定位为：
    Technology Entrepreneur
    Engineer
    Founder & CEO of SpaceX
    CEO of Tesla, Inc.
3.教育背景（Education）：
    Queen’s University（物理与经济学，未完成）（图片路径在/assets/images/badges/Queen_University.jpg）
    University of Pennsylvania（B.S. in Physics, B.A. in Economics）（图片路径在/assets/images/badges/University_of_Pennsylvania.jpg）
4.研究 / 关注方向（Research Interests，可模拟为）：
    Space Systems Engineering
    Sustainable Energy Systems
    Artificial Intelligence & Robotics
    Large-scale Technological Innovation
5.荣誉（Honors & Recognition）：
    Time Person of the Year (2021)
    Fellow of the Royal Society (FRS)
    Listed in Forbes Billionaires (multiple years)
6.约束：
    不添加“论文 / publications”
    不虚构 IEEE、Nature、Science 论文
    学术风格表述，避免商业宣传口吻
    保持原有字段结构不变，仅替换内容
```

我们可以看到此时Trae已经完成了我们的所有修改要求

![](images/image23.png)

**第三步，刷新本地浏览器**

此时我们刷新本地浏览器，看到均正确更换

![](images/image24.png)

### 4.2.2 优化迭代：添加“论文”与项目

因为Elon Musk 不是传统的大学教授，他很少在《Nature》或《Science》上发 paper。但是，作为“首席工程师”，他发布过许多极具技术含量的 “白皮书” (White Papers) 和 “宏伟蓝图” (Master Plans)。

在学术主页的语境下，我们可以把“Publications”（出版物）的概念重新定义为 **`“Technical White Papers & Visionary Plans”`** （技术白皮书与愿景规划）。这不仅不违和，反而非常符合他“实干派”的人设。

![](images/image25.png)

**第一步：准备素材**

将我提供给你的封面图片（ 分别为 `Hyperloop_Alpha_sketch.jpg` 、`SpaceX_Starship.jpg`、`Neuralink_sewing_machine_robot.jpg`）下载下来，放入 `/assets/images/covers/` 文件夹中（并将文件夹中原有的示例图片删除）。

![img](images/image26.png)![img](images/image27.png)![](images/image28.png)

**第二步：下达****指令**

 把下面这段 Prompt 发送给 Trae，让它帮我们重构数据结构：

```Plain
一、角色设定：你是一个精通 Jekyll 和 Liquid 语法的静态网站开发专家。
二、任务目标：
修改网站首页或导航栏的板块标题。
当前的文件结构是按年份划分子文件夹的（例如 _publications/2023/xxx.md）。按照指定的格式创建三个新的 Markdown 文件，用于展示 Elon Musk 的技术白皮书和愿景规划。
三、具体步骤与要求：
1.修改板块标题
    请在全局搜索字符串 "Selected Publications"（它可能出现在 index.html、_config.yml 或_pages/publications.md 中）。 请将其替换为："Technical White Papers & Visionary Plans"。
2.重构出版物数据（关键步骤）
    清空 _publications 文件夹下的所有旧内容（请删除 2023, 2024 等旧年份文件夹）。
    创建 三个新的年份文件夹：_publications/2013/，_publications/2017/，_publications/2019/。
    在对应的年份文件夹中，分别创建以下三个 Markdown 文件。
3.严格遵守文件格式
重要：必须严格遵守以下 YAML Front Matter 格式，不要编造新的字段名：
    - title:          "论文标题"
    - date:           YYYY-MM-DD HH:MM:SS +0800
    - selected:       true
    - pub:            "发表场所/期刊名"
    - pub_date:       "年份"
    - abstract: >-    摘要内容... 
    - cover:          /assets/images/covers/cover_name.jpg
    - authors:        - 作者1- 作者2
    - links:Paper:    https://论文链接
4.请生成以下三个文件的完整代码（包含路径说明）：
(1) 路径: _publications/2013/2013-hyperloop.md
    Title: Hyperloop Alpha
    Date: 2013-08-12
    Pub: Tesla Blog (Open Source)
    Pub_date: "2013"
    Abstract: A proposal for a fifth mode of transport, utilizing a low-pressure tube and air bearings to achieve subsonic speeds.
    cover: /assets/images/covers/Hyperloop_Alpha_sketch.jpg
    Authors: Elon Musk, SpaceX & Tesla Teams
    Link: https://www.tesla.com/sites/default/files/blog_images/hyperloop-alpha.pdf
(2) 路径: _publications/2017/2017-mars.md
    Title: Making Humans a Multi-Planetary Species
    Date: 2017-06-01
    Pub: New Space
    Pub_date: "2017"
    Abstract: Detailed architecture of the Starship system designed to colonize Mars. This paper outlines the technical challenges to establish a self-sustaining city.
    cover: /assets/images/covers/SpaceX_Starship.jpg
    Authors: Elon Musk
    Link: https://www.liebertpub.com/doi/10.1089/space.2017.29009.emu
(3) 路径: _publications/2019/2019-neuralink.md
    Title: An Integrated Brain-Machine Interface Platform
    Date: 2019-10-16
    Pub: Journal of Medical Internet Research
    Pub_date: "2019"
    Abstract: We have built arrays of small and flexible electrode threads, with as many as 3,072 electrodes per array, and a neurosurgical robot.
    cover: /assets/images/covers/Neuralink_sewing_machine_robot.jpg
    Authors: Elon Musk, Neuralink
    Link: https://www.jmir.org/2019/10/e16194/
执行要求： 请直接给出这三个文件的完整内容代码，以及你修改标题所涉及的那个文件的修改代码。
```

**第三步，刷新本地浏览器**

等待构建完成后，你会发现原本枯燥的论文列表，已经变成了充满未来感的“黑科技展示”。

![](images/image33.png)

### 4.2.3 最后打磨：社交链接与头像

这是“从 90 分到 100 分”的关键一步。现在的侧边栏可能还留着模版自带的 GitHub 链接或者错误的邮箱。我们需要把它们指向马斯克的真实社交账号（主要是 X.com）。

**第一步，准备工作**

去 Google 搜一张马斯克的帅照，保存为 `portrait.png`（或者将图片拖入 Trae 左侧的 `images/photo `文件夹中，覆盖原图。

**第二步，复制以下 Prompt 发送给 Trae**

```Plain
一、角色设定：你是一个追求细节的 Jekyll 网站开发专家。
二、任务目标：完成网站侧边栏（Sidebar）和个人信息配置的最终修改。我们需要将作者头像、简介和社交链接全部更新为 Elon Musk 的真实信息。
    请先扫描项目结构，找到控制作者信息的配置文件。
三、请执行以下修改：
1. 头像路径修正 (Avatar)
    我已经上传了一张名为 portrait.png 的新图片到 images/ 或 assets/images/ 文件夹下。
请将配置文件中的 avatar 路径修改为指向这张新图片（请确保相对路径正确，例如 /images/portrait.png）。
2. 社交链接清洗 (Social Links) 请更新或移除侧边栏的社交图标链接：
    Email: 修改为 elon@spacex.com（或者如果字段允许，请直接注释掉/移除该字段以防骚扰）。
    Twitter / X: 修改为 https://x.com/elonmusk (这是核心链接)。
    GitHub: 修改为 https://github.com/tesla (指向 Tesla 开源仓库) 或直接移除。
    Google Scholar: 必须移除（他不维护这个）。
    LinkedIn / ResearchGate: 如果存在，请全部移除。
输出要求： 请直接给出配置文件修改后的完整代码片段。
```

**第三步，刷新本地浏览器**

1. 看一眼侧边栏是不是那张帅气的照片？点击 Twitter 图标是不是跳转到了 X.com？

此时在本地，你已经拥有了一个完整、专业、且充满“马斯克风格”的个人学术主页。

![](images/image34.png)

## 4.3 注入灵魂的 UI 定制（风格篇）

现在的网页内容虽然对了，但看起来还像是一份“打印出来的简历”，缺乏科技感。在 Vibe Coding 模式下，我们不需要懂 CSS，只需要告诉 AI 我们想要的“感觉”。

 **场景示例** ：如果你觉得灰色背景太沉闷，想改成“火星红”。 直接问 Trae：*“我想把侧边栏的背景颜色改成暗红色（#8B0000），体现火星的感觉。请问我应该修改哪个 **CSS** 或 SCSS 文件？请直接给我代码。”*

![](images/image35.png)

如果你喜欢上述图片中的“SpaceX Dashboard”风格，可以直接复制下面这段“设计师级”Prompt：

```Plain
一、角色设定：你是一个崇尚“瑞士国际主义风格”的顶级 UI 设计师，擅长 Notion、Linear 或 Apple 风格的界面设计。
二、任务目标：请完全重写 CSS/SCSS，打造一种 “SpaceX Dashboard” 风格的极简学术主页。核心关键词是：通透、克制、精密。
三、请执行以下具体的样式覆盖（Override）：
1. 全局排版（Typography is King）
字体：放弃原有的衬线体。强制将全站字体修改为系统级无衬线字体栈：'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif。
行高：增加正文的呼吸感，设置 line-height: 1.75。
颜色：
    主标题色：#111111 (接近纯黑)。
    正文色：#333333 (深灰)。
    辅助信息（日期/引用）：#666666 (中灰)。
2. 极简导航栏 (Clean Header)
背景：去掉之前的黑色背景，改为 纯白背景 (#FFFFFF) 或带有高斯模糊的半透明白 (rgba(255, 255, 255, 0.9) + backdrop-filter: blur(10px) 如果支持)。
边框：仅保留一条极细的底部边框 border-bottom: 1px solid #EAEAEA。
文字：导航链接使用深灰色 #333333，鼠标悬停（Hover）时才变成黑色并加粗。
3. 去除卡片，回归内容 (Remove Cards)
去掉左侧侧边栏和【About me】卡片背景和阴影（box-shadow: none, background: transparent）。让文字直接浮在页面背景上，这是最高级的做法。
增加间距：大幅增加板块之间的 margin-bottom (例如 80px)，利用留白来区分内容，而不是靠边框。
4. 品牌色的克制使用 (Accent Color)
全站仅在 链接（Links） 和 重要按钮 上使用 Tesla Red (#E82127)。
链接样式：去掉下划线，仅改变颜色。悬停时添加淡红色背景块 (background: rgba(232, 33, 39, 0.05)).
5. 头像微调
保持圆形 (border-radius: 50%)。
去掉边框：真正的极简不需要边框。
只保留一个非常淡的投影：box-shadow: 0 10px 30px rgba(0,0,0,0.08)。
执行要求： 请分析 _sass 或 CSS 文件，不要修补旧代码，而是直接给出 重置并覆盖 上述样式的代码块。
```

## 4.4 替换成你自己的信息（定制篇）

恭喜你！跑通了上面“马斯克主页”的流程，其实你已经掌握了 Vibe Coding 建站的核心心法。现在，要把这个“样板间”变成你自己的家，简直易如反掌。

你不需要重头再来，只需要重复上述步骤，但在策略上我们可以更灵活一点：

**第一步：物理替换（头像与基础信息）**

这是最简单的一步，还是老规矩：

1. **换照片** ：在 Trae 左侧的文件栏，找到 `assets/images/`，直接把你自己的证件照拖进去，覆盖掉那个 `portrait.png`。
2. **改名字** ：告诉 Trae：“帮我把全站的 Elon Musk 替换成 [你的名字]”。

**第二步：AI 预处理（让 ChatGPT /Gemini 帮你整理）**

Trae 擅长写代码，但如果你直接把一份乱糟糟的 PDF 简历扔给它，它可能会晕。

**所以更高效的做法是：** 先用擅长处理长文本的 AI（如 ChatGPT、Gemini、Kimi）帮你把简历“格式化”。

你可以给 ChatGPT 发送这样的指令：

```Plain
角色设定：你是一个专业的学术网页内容策划师。
任务目标： 我将把我的个人简历（Resume/CV）发送给你。请帮我提取关键信息，并将其整理为结构清晰、适合直接填入静态网站的 Markdown 格式。
请严格按照以下 5 个模块进行整理和润色（如果没有相关内容，请留空）：
1. 基础信息 (Profile)
Name: 我的全名。
Tagline: 一句话职业标签（例如：CS Student @ XX Univ | AI Enthusiast）。
Bio: 一个 50-100 字的第三人称简介，概括我的背景和核心技能（语气要专业、学术）。
Socials: 提取邮箱、GitHub、LinkedIn、博客链接等。
2. 教育背景 (Education)
请列出：学校名称、学位（如 B.S. in CS）、起止时间。
补充：如果有 GPA 或核心课程，请单独列一行。
3. 核心项目 (Selected Projects) —— 重要！ 请提取 2-3 个最能拿得出手的项目，每个项目包含：
Title: 项目名称。
Tech Stack: 使用的技术栈（如 Python, React, PyTorch）。
TL;DR: 一句话概括项目是做什么的。
Description: 2-3 点核心贡献（使用 STAR 法则润色：情境+任务+行动+结果）。
Image Placeholder: 预留一个图片文件名（如 project_name.jpg）。
4. 论文/出版物 (Publications/Articles) 如果有论文或技术文章，请提取：
Title: 标题。
Venue: 发表的会议/期刊/平台名称。
Date: 发表时间（年份即可）。
Abstract: 一句话摘要。
5. 技能栈 (Skills)
请分类整理：编程语言、框架/工具、其他技能。
输出要求：不要解释过程，直接输出整理好的 Markdown 内容。
```

拿到这份整理好的**纯净文本**后，再喂给 Trae，准确率会提升 100%。

![](images/image36.png)![](images/image37.png)

**第三步：替换核心内容（两条路径）**

在这一步，根据你的喜好，你可以选择两种不同的 Vibe Coding 模式：

1. **模式 A：通过 AI 导航，手动修改（适合想了解结构的你）**

 如果你想知道每个字到底改在了哪里，可以问 Trae：

```Markdown
“我想修改‘教育背景’这一块，请告诉我它对应的文件路径在哪里？代码在哪几行？”
```

Trae 会在**对话框里**告诉你： “你需要修改的文件是 `_pages/about.md`，代码位于第 XX 行...”并展示出修改后的代码预览。

你需要自己在左侧文件栏找到并点击打开这个文件，然后参考 Trae 的提示，像做填空题一样，把 ChatGPT 帮你整理好的内容填进去。

![](images/image38.png)

2. **模式 B：全自动托管（适合追求效率的你）**

如果你觉得找文件太麻烦，直接把整理好的信息甩给 Trae：

```Markdown
“这是我整理好的‘教育背景’和‘项目经历’（粘贴 Markdown 内容）。请帮我直接替换掉现有网站里的对应内容，保留原本的排版格式。”
```

# 5 部署上线

## 5.1 部署到 Github Pages

**第一步：开启 GitHub Actions（云端构建）**

回到你的 GitHub 网页端：

1. 点击仓库顶部的  **Settings** 。
2. 在左侧侧边栏找到并点击  **Pages** 。
3. 在 **Build and deployment** 下方，将 **Source** 选项从 `Deploy from a branch` 切换为  **`GitHub Actions`** 。

![](images/image39.png)

**第二步：自动配置 Jekyll****工作流**

切换后，你会看到界面变化。GitHub 会智能识别出这是一个 Jekyll 项目。

1. 找到 **Jekyll** (By GitHub Actions) 的卡片。
2. 点击卡片上的 **Configure** 按钮。

![](images/image40.png)

**第三步：提交配置文件**

点击后，你会跳转到一个全是代码的页面（这是一个 `.yml` 配置文件，GitHub 已经帮你写好了，专门用来构建 Jekyll 网站的）。

1. **不要修改任何代码** 。
2. 直接点击页面右上角的绿色按钮  **`Commit changes...`** 。
3. 在弹出的确认框里再次点击  **`Commit changes`** 。

![](images/image41.png)

![](images/image42.png)

**第四步：等待并验收**

提交完成后，GitHub 的服务器就开始自动干活了。

1. 点击顶部菜单栏的 **Actions** 标签。
2. 你会看到一个名为 `Deploy Jekyll site to Pages` 的任务正在转圈。
3. 耐心等待 1-2 分钟，直到那个黄色的圆圈变成  **绿色的对号 (✅)** 。

![](images/image43.png)

**第五步：访问你的网站**

那个圆圈变成 **绿色的对号,** 我们即可通过这个地址 **`<a data-lark-is-custom="true" href="https://luahan77m.github.io/">https://你的用户名.github.io/</a>`** **查看**这个模版的默认效果了

恭喜你！你已经成功部署了一个属于你自己的、全球可访问的学术主页。

## 5.2 提交更改 & 更新主页

我们将前面所修改的所有本地内容提交到Github上，让这个Musk的个人主页，能被全世界看见

1. 点击左侧的源代码管理（Source Control）。
2. 将所有【更改】内容，都添加到了【暂存的更改】中
3. 让Trae帮我们生成更改内容，点击  **提交** 。
4. 点击  **Sync Changes (**  **Push** **)** 推送到 main 分支。
5. 稍等片刻，等到 **Actions** 标签下所有的进程均完成。

![](images/image44.png)

现在，恭喜你！打开你的 **`https://你的用户名.github.io/`**，你已经拥有了一个完整、专业、且充满“马斯克风格”的个人学术主页。

![](images/image45.png)

# 6 进阶玩法：从零手写个人主页

如果你觉得学术模板太死板，或者你想做一个像“黑客帝国”那样酷炫的单页网站，那么欢迎来到  **DIY 专区** 。

在这里，我们不 Fork 任何人的代码。我们将利用 Trae，面对一个空白的文件夹，像上帝造物一样，用一句话生成一个完整的网站，并把它部署上线。

## 6.1 为什么要“手搓”

* **绝对自由** ：没有模板的束缚。你想让导航栏在右边？想让背景放烟花？只需要告诉 AI。
* **极简主义** ：模板通常包含几百个文件，而手搓的网站可能只需要一个 `index.html`。
* **技术掌控** ：这是理解“网页到底是怎么跑起来的”最好的方式。

我们将演示最经典的 **纯 HTML流** ：无需编译，GitHub Pages 原生支持，非常适合做个人展示页（Landing Page）。

## 6.2 实战：让 AI 写一个“火星指挥中心”风格主页

这次我们不搞学术那一套了。假设马斯克想要一个极简的、充满未来感的个人主页，用来展示他的“火星计划”。

**第一步：新建空项目**

在电脑上新建一个文件夹，然后用 Trae 打开这个文件夹。此时左侧目录是空的，什么都没有。

 (提示：你可以提前放进去一张马斯克的头像图片，命名为 `portrait.png` *)*

**第二步：搭建框架**

在 Trae 的对话框中，输入这段 Prompt（提示词）。请注意，我们要求 AI 把所有代码写在一个文件里，方便新手管理：

```Plain
我想从零做一个Elon Musk的极简风格个人主页，不使用任何复杂框架，只用 HTML+CSS+JS。
设计风格： SpaceX 仪表盘风格。
    背景：使用深邃的太空黑（#000000），点缀星光动画。
    主色调：使用“火星红”（#E82127）作为强调色。
    字体：使用等宽字体（Monospace），模仿代码终端的感觉。
页面内容：
    中间是 Elon Musk 的头像（圆形，带有旋转的边框）（图片路径是portrait.png）。
    名字：Elon Musk (Technoking of Tesla)。
    简介： "Occupying Mars... 99% Loading."
    底部有三个发光的按钮，分别链接到：X (Twitter), SpaceX, Tesla。
技术要求： 请把所有 CSS 样式和 HTML 结构都写在一个 index.html 文件里。请直接生成完整代码。
```

![](images/image46.png)

**第三步，生成和预览**

在上一步，Trae已经帮我们生成了一个index.html文件，那么我们要如何看到这个页面的当前效果呢？

在 Chat 里告诉 Trae：

```Markdown
请帮我启动一个本地服务来预览这个网页。
```

你会收到一个类似 `http://localhost:8000` 的链接，在浏览器上复制并打开该链接，你就会看到一个酷炫的、背景可能有星星在闪烁的“火星主页”。

![](images/image47.png)

但我们发现当前页面目前只是一个非常酷炫的“着陆页”或“引导屏”，作为一个完整的个人主页来说，它的信息量太少了，缺乏学术主页应有的深度。因此基于这个框架风格，我们开始补充和完善里面关于 Elon Musk 的学术信息。

![](images/image48.png)

**第四步，进一步完善信息**

我们要让Trae保持现在的火星风格，但是把结构改成学术模板那样 **。** 我们需要明确指示它把现有的元素移到左侧，并在右侧创建一个新的内容区域来放置简历和白皮书，同时所有新加的内容都要符合“黑底红字”的赛博朋克风格。

复制以下整段 prompt 发送给 Trae：

```Plain
核心原则：
必须严格保持当前“SpaceX/火星”的设计风格（纯黑背景、星空点缀、红色霓虹强调色、等宽代码字体），绝对不要使用参考图中的白色背景。
具体修改步骤：
1. 创建双栏结构 (Two-Column Layout)
将页面分为左右两栏。左侧边栏宽度占比约 30%-35%，右侧内容区占比约 65%-70%。
2. 左侧边栏 (Left Sidebar) - 迁移现有信息
把图一里所有的现有元素移动到左侧边栏固定住：
    - 头像：保持圆形的 Elon Musk 头像。
    - 姓名与头衔：保留红色的霓虹特效文字 "ELON MUSK" 和 "Technoking of Tesla"。
    - 加载条："Occupying Mars... 99% Loading" 保留，作为个人签名。
    - 社交按钮：底部的三个红色按钮 (X, SPACE X, TESLA) 移到左侧栏最下方。
3. 右侧内容区 (Right Content Area) - 新增详细信息
在右侧区域增加详细的个人介绍和成果展示。所有新添加的文字默认使用白色或浅灰色，标题使用红色霓虹风格强调。请创建以下板块：
- About Me (关于我):
    写一段简短的介绍，例如："Technology entrepreneur and engineer focused on multi-planetary expansion, sustainable energy, and artificial intelligence."
- Focus Areas (关注领域): 
    列出 Space Systems Engineering, Mars Colonization Architecture, Brain-Machine Interfaces.
- Visionary Plans & White Papers (愿景规划与技术白皮书):
    这是重点，参考图三的列表样式，但要改成黑色风格。
    创建一个列表，展示他的重要技术规划（用红色边框或发光效果来区分每个条目）。
    条目 1: "Making Humans a Multi-Planetary Species" (Starship Architecture, 2017).
    条目 2: "Hyperloop Alpha" (High-speed transportation proposal, 2013).
    条目 3: "Neuralink: An Integrated Brain-Machine Interface Platform" (2019).
- Notable Achievements (核心成就):
    简单列出几个里程碑，如：First private liquid-propellant rocket to reach orbit (Falcon 1); First reusable orbital class rocket (Falcon 9).
4. 样式细节要求
右侧所有板块的标题（如 "About Me"），使用与左侧 "ELON MUSK" 相同的红色发光字体样式。
确保整个页面在不同屏幕尺寸下都能保持良好的双栏显示效果（响应式设计）。
```

返回浏览器刷新一下页面，这个赛博朋克风的学术页面，就大功告成了！当然，你也可以根据自己的喜好继续完善，只需要像上述过程一样，明确地把目标需求告诉 Trae，它自然会帮你实现繁琐的编码过程。

![](images/image49.png)

## 6.3 如何部署“手搓”的网站

不同于之前 Fork 的模板（那是复制别人的仓库），这个项目是你自己新建的，GitHub 上还没有它的位置。我们需要手动把它们“绑定”。

**第一步：在 ****GitHub**** 上新建仓库**

1. 登录 GitHub 网页端。
2. 点击右上角的 **+** 号 -> **New** **repository** 。

![](images/image50.png)

3. **Repository** **name**：填入 `mars-profile`（或者任何你喜欢的名字）。

**注意：**如果你之前已经用了 **`你的用户名.github.io`* *这个名字，这里就不能重复用了。你可以起别的名字，* *GitHub** 会为你生成一个链接，比如  *`你的用户名.github.io/mars-link`* *。*

4. **Public/Private** ：选择  **Public** 。
5. **⚠️ 千万不要勾选 "Add a README file"！** （其余选项保持默认即可）
6. 点击 **Create  repository** 。

![](images/image51.png)

**第二步：把本地代码推送到云端**

创建完成后，GitHub 会跳转到一个页面，上面有一堆乱七八糟的代码。别慌，我们在复制下面图片中的这个仓库链接

![](images/image52.png)

回到 Trae，在 Chat 框中输入：

```Markdown
我已经在 GitHub 上创建了一个空仓库，地址是：https://github.com/你的用户名/mars-link.git (请替换为你刚才创建的仓库地址)。
现在，请帮我把当前的本地项目初始化为 Git 仓库，并将代码推送到这个远程地址的 main 分支。 
```

Trae 通常会帮你执行以下“标准三连招”（你可能只需要点击运行）：

1. `git init` （初始化仓库）
2. `git add .` 和 `git commit -m "First commit"` （打包行李）
3. `git branch -M main` 和 `git remote add origin [你的地址]` （关联云端）
4. `git push -u origin main` （发车！）

等 Trae 完成提交任务后，我们回到 GitHub 刷新网页，点击顶部的  **Code** ，就可以看到我们在 Trae 上编写的代码已经成功传到 GitHub 仓库中了。

![](images/image53.png)

**第三步：开启 ****GitHub**** Pages**

代码推上去后，网页不会自动生成，需要手动开一下开关：

1. 回到 GitHub 仓库页面，点击顶部的  **Settings** 。
2. 左侧栏点击  **Pages** 。
3. **Build and deployment** 下方：
   1. **Source** : 选择 `Deploy from a branch`。
   2. **Branch** : 选择 `main` 分支，文件夹选 `/(root)`。
4. 点击  **Save** 。

![](images/image54.png)

当你点击 Save 之后，网页并不会在一秒钟内“变”出来。GitHub 的后台就像一个小机器人工厂，它需要花大概 **1 到 2 分钟**的时间，把你上传的代码打包、编译，然后发布到全球的服务器上。

耐心等待后刷新页面，你会在 **GitHub** Pages这个大标题的正下方，看到一行带网址的提示，通常写着：**"Your site is live at `https://你的用户名.github.io/mars-link/`"**。

![](images/image55.png)

点开它，你的“火星指挥中心”就上线了！

![](images/image56.png)

# 7  写在最后

教程结束了。现在，看着浏览器地址栏里那个亮起的 `.github.io`，你有没有一种“我在互联网上插了一面旗帜”的感觉？

在这个教程里，我们借用了埃隆·马斯克的名头，像玩乐高一样搭建了一个看起来很厉害的网站。但这仅仅是个开始。Vibe Coding 最迷人的地方不在于它能帮你省下多少敲代码的时间，而在于它 **彻底粉碎了“想法”与“现实”之间的那堵墙** 。

以前，你可能因为“不会写 CSS”而放弃了一个展示项目的念头； 现在，唯一的限制只剩下你的**想象力**和 **审美** 。

 **不要让这个网站停留在“马斯克同款”** 。 那个用来练手的 Tesla 链接、那个火星移民的白皮书，终究是别人的故事。你的主页，应该是你自己在数字世界里的名片。

去把你的第一次学会的项目经历写上去，去把你对某个技术独特的见解发出来，甚至把你喜欢的书单、拍过的照片都可以挂在上面。在微信朋友圈会被刷下去的思考，在这里会永久留存；在简历里写不下的热忱，在这里可以肆意铺洒。

别让这块地荒着。去折腾，去破坏，去重建，直到它长成你最喜欢的样子。

![](images/image57.png)

***去吧，让世界看到你！***

# 参考文献

CSDN：[【2025最新保姆级教程】手把手教你用github制作个人主页（申学找工作必备）](https://blog.csdn.net/qq_45743991/article/details/145505150?ops_request_misc=&request_id=&biz_id=102&utm_term=github%E6%9E%84%E5%BB%BA%E4%B8%AA%E4%BA%BA%E4%B8%BB%E9%A1%B5&utm_medium=distribute.pc_search_result.none-task-blog-2~all~sobaiduweb~default-0-145505150.142^v102^pc_search_result_base4&spm=1018.2226.3001.4187)

CSDN：[Git下载及安装保姆级教程](https://blog.csdn.net/weixin_41293671/article/details/144255269?ops_request_misc=elastic_search_misc&request_id=63236900b52320a7beb177787ba97f07&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~baidu_landing_v2~default-5-144255269-null-null.142^v102^pc_search_result_base4&utm_term=git%E4%B8%8B%E8%BD%BD%E5%AE%89%E8%A3%85&spm=1018.2226.3001.4187)

CSDN：[Windows环境下安装Ruby教程](https://blog.csdn.net/alive_tree/article/details/103043158?ops_request_misc=elastic_search_misc&request_id=ad7e29ea7f702554d785c2fc82ec6e95&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~ElasticSearch~search_v2-11-103043158-null-null.142^v102^pc_search_result_base4&utm_term=ruby%E5%AE%89%E8%A3%85%E6%95%99%E7%A8%8B&spm=1018.2226.3001.4187)
