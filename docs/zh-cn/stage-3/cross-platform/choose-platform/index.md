# 如何选择你的应用该开发的平台

你有一个想法，想把它变成一个真实的产品。但面对这么多平台选择——微信小程序、iOS App、Android App、网站、浏览器插件、桌面程序……你应该从哪里开始？

::: tip 💡 快速导航
如果你已经知道各个平台的特点，可以直接跳到 [第 2 节](#2-先问自己三个问题) 开始决策流程，或者查看 [第 7 节的决策流程图](#7-总结-选择平台的决策流程)。
:::

这篇文章会帮你理清思路，根据你的具体场景，找到最适合的开发平台。

## 1 先认识这些平台

在讨论"选哪个"之前，先搞清楚"有哪些"。下面是目前主流的开发平台分类：

### 1.1 移动端平台

#### iOS 原生 App

你 iPhone 上那些从 App Store 下载的软件，就是 iOS 原生 App。它们的特点是：打开速度快、用起来丝滑、能调用手机的所有功能（相机、定位、健康数据等）。但开发它必须用苹果电脑，而且要经过苹果审核才能上架。

**常见案例**：微信、抖音、小红书、Keep、美团、支付宝

#### Android 原生 App

安卓手机上从应用商店下载的软件，或者朋友发给你一个 APK 文件安装的，都是 Android 原生 App。它和 iOS App 类似，但安卓用户更多、分发渠道更多样。缺点是安卓手机型号太多，开发者要适配各种屏幕和系统版本。

**常见案例**：Tasker（自动化工具）、MX Player（视频播放器）、AirDroid（手机管理）、绿色守护（省电工具）、Xposed 框架（系统定制）

#### 微信小程序

你在微信里扫个码、搜个名字就能直接用的"小应用"，不用下载安装。它的好处是用户门槛低——大家都有微信，点开就能用。坏处是功能有限，而且只能在微信里跑，离开微信就用不了。

**常见案例**：拼多多（拼团电商）、美团外卖（本地生活）、摩拜单车（扫码骑车）、跳一跳（小游戏）、周黑鸭（点餐购物）

#### PWA（渐进式 Web 应用）

听起来很技术，其实就是"能像 App 一样安装的网页"。你在手机浏览器里打开某个网站，它会弹出一个"添加到主屏幕"的提示，点一下，桌面上就多了一个图标，点开看起来就像一个 App。它的好处是一套代码手机电脑都能用，坏处是很多人不知道还能这么用。

**常见案例**：Twitter Lite、星巴克、Pinterest、Uber、Spotify Web Player

### 1.2 桌面端平台

#### Electron 桌面程序

你可能每天都在用：VS Code、Slack、Discord、Notion、Figma——这些软件都是用 Electron 开发的。它的特点是：用写网页的技术（HTML、CSS、JavaScript）来写桌面软件，一套代码就能在 Windows、Mac、Linux 上运行。缺点是安装包比较大，运行时占内存多一些。

**常见案例**：VS Code、Slack、Discord、Notion、Figma、微信开发者工具

#### Qt 桌面应用

如果你用过 WPS、VirtualBox、OBS，那很可能就是 Qt 开发的。它用 C++ 语言编写，性能好、稳定性高，特别适合工业场景。但学习门槛高，需要懂 C++。

**常见案例**：WPS Office、VirtualBox、Autodesk Maya、Telegram Desktop、OBS Studio

#### 原生桌面应用

这些"重量级"软件通常是用原生技术开发的。Windows 用 C# 或 C++，Mac 用 Swift。它们的性能最好、体验最流畅，但 Windows 版和 Mac 版要分开开发，成本很高。

**常见案例**：Microsoft Office、Adobe Photoshop、Final Cut Pro、微信（Windows/Mac 版）、QQ 音乐

### 1.3 Web 相关平台

#### 网站

就是你在浏览器里输入网址打开的那些页面。它的好处是：任何设备都能访问（手机、电脑、平板）、不用安装、搜索引擎能搜到。坏处是必须联网，离线就用不了。

**常见案例**：淘宝网、知乎、GitHub、B站、掘金、CSDN

#### 浏览器插件

你有没有装过广告拦截器、翻译工具、密码管理器？这些就是浏览器插件。它们住在浏览器里，能读取和修改你正在看的网页内容。比如，装个翻译插件，打开英文网页就能一键翻译。它的好处是轻量、随浏览器启动；坏处是只能在浏览器里工作，而且不同浏览器（Chrome、Edge、Firefox）的插件还不通用。

**常见案例**：AdBlock Plus、沉浸式翻译、1Password、Grammarly、Tampermonkey、Dark Reader

### 1.4 其他平台

#### VS Code 插件

如果你是程序员，大概率用过 VS Code 编辑器。VS Code 插件就是给它"加装功能"的小程序。它的好处是开发者用户精准，坏处是只对程序员有用。

**常见案例**：Prettier、GitLens、GitHub Copilot、ESLint、Live Server、Chinese Language Pack

#### NFT 智能合约

NFT 你可能听说过——那些卖几百万美元的"数字头像"。NFT 本质上是区块链上的一张"所有权证书"，证明某个数字物品属于你。智能合约就是运行在区块链上的程序，用来创建和管理这些 NFT。它的好处是不可篡改、可交易；坏处是技术门槛高，而且市场波动大。

**常见案例**：无聊猿 BAYC、CryptoPunks、NBA Top Shot、Azuki、Moonbirds

### 1.5 还有其他选择吗？

除了上面说的这些，还有一些"中间路线"和更多可能性：

#### 跨平台开发框架

::: details 点击查看跨平台框架详情

**React Native / Flutter**：想同时做 iOS 和 Android App，但不想写两套代码？这两个框架可以让你写一套代码，然后自动生成两个平台的 App。很多公司都在用，比如 Airbnb、Instagram。

**Tauri**：Electron 的"轻量版"。同样是用网页技术开发桌面软件，但安装包更小、运行更快。缺点是生态还不够成熟。

**uni-app**：国内很流行的框架，写一套代码可以同时发布到微信小程序、iOS App、Android App、H5 网页。适合想"一次开发，到处运行"的团队。

**Capacitor / Ionic**：已经有一个网站了，想快速变成 App？这两个工具可以把你的网站"包装"成一个 App，用户从应用商店下载安装。

这些框架本质上是在"原生开发"和"Web 开发"之间找平衡——开发效率高一些，但性能和体验会打一些折扣。
:::

#### 国内小程序生态

::: details 点击查看国内小程序详情

**支付宝小程序**：金融场景、生活服务。你的用户在用支付宝交水电费、点外卖、坐公交？那就做支付宝小程序。信用分、芝麻认证这些能力，只有支付宝有。

**抖音小程序**：内容电商、直播带货。你在抖音上卖货？小程序可以直接挂在视频下方，用户刷到就能买。

**快手小程序**：下沉市场、老铁经济。快手用户粘性强，适合社区团购、本地服务。

**百度小程序**：搜索流量入口。用户百度搜"附近的餐厅"，你的小程序可以直接出现在搜索结果里。
:::

#### 鸿蒙生态

**鸿蒙应用（HarmonyOS）**：华为手机、平板、手表、智能家居设备都能跑。用 ArkTS 开发（类似 TypeScript），一套代码多设备运行。如果你的用户是华为生态用户，或者想做 IoT 设备联动，鸿蒙是必选项。

#### 更多开发者工具

::: details 点击查看更多开发者工具

**命令行工具（CLI）**：开发者每天都在用终端。做一个命令行工具，可以自动化重复工作、生成代码模板、部署项目。比如 `create-react-app`、`git`、`npm` 都是命令行工具。适合做开发者效率工具、DevOps 自动化。

**JetBrains 插件**：除了 VS Code，很多开发者用 IntelliJ IDEA、PyCharm、WebStorm。如果你的工具面向 Java、Python、前端开发者，JetBrains 插件市场也值得考虑。

**Cursor / Windsurf 插件**：AI 编程工具的新生态。如果你想做 AI 辅助编程相关的功能，这些新兴 IDE 的插件生态正在快速成长。
:::

#### 社群机器人

::: details 点击查看社群机器人详情

**Telegram Bot**：海外用户群体大，API 友好。适合做通知推送、自动化任务、社群管理。很多加密货币项目、开发者社区都在用 Telegram。

**Discord Bot**：游戏社区、开发者社区的主阵地。可以做音乐播放、游戏数据查询、服务器管理。如果你的用户是游戏玩家或海外开发者，Discord Bot 是刚需。
:::

#### 设计与生产力工具

::: details 点击查看设计工具详情

**Figma 插件**：设计师每天都在用 Figma。做一个插件可以自动化设计流程、生成代码、管理设计系统。适合做设计工具、前端开发辅助。

**Notion 插件**：通过 Notion API 可以自动化工作流、同步数据、生成报表。适合做知识管理、项目管理相关的工具。
:::

#### 空间计算

**visionOS 应用（Apple Vision Pro）**：空间计算的新时代。适合做 3D 内容展示、沉浸式体验、教育培训、虚拟协作。技术门槛高，但如果你想做前沿探索，这是未来方向。

---

## 2 先问自己三个问题

在选择平台之前，先回答这三个核心问题：

<el-card shadow="hover" style="margin: 20px 0; border-radius: 12px; border-left: 4px solid #409EFF;">
  <template #header>
    <div style="display: flex; align-items: center; gap: 8px;">
      <span style="font-size: 20px;">🎯</span>
      <span style="font-weight: bold; font-size: 16px;">问题一：你的用户在哪里？</span>
    </div>
  </template>
  <div style="line-height: 1.8; color: #606266;">
    <ul>
      <li>用户是否需要随时随地使用？（移动端优先）</li>
      <li>用户是否习惯在微信里完成操作？（小程序）</li>
      <li>用户是否会在办公场景长时间使用？（桌面程序）</li>
      <li>用户是否需要通过搜索引擎找到你？（网站）</li>
    </ul>
  </div>
</el-card>

<el-card shadow="hover" style="margin: 20px 0; border-radius: 12px; border-left: 4px solid #67C23A;">
  <template #header>
    <div style="display: flex; align-items: center; gap: 8px;">
      <span style="font-size: 20px;">⚡</span>
      <span style="font-weight: bold; font-size: 16px;">问题二：你的应用需要什么能力？</span>
    </div>
  </template>
  <div style="line-height: 1.8; color: #606266;">
    <ul>
      <li>是否需要调用摄像头、麦克风、GPS 等硬件？</li>
      <li>是否需要离线使用？</li>
      <li>是否需要推送通知？</li>
      <li>是否需要处理大量本地数据？</li>
    </ul>
  </div>
</el-card>

<el-card shadow="hover" style="margin: 20px 0; border-radius: 12px; border-left: 4px solid #E6A23C;">
  <template #header>
    <div style="display: flex; align-items: center; gap: 8px;">
      <span style="font-size: 20px;">💰</span>
      <span style="font-weight: bold; font-size: 16px;">问题三：你的资源有多少？</span>
    </div>
  </template>
  <div style="line-height: 1.8; color: #606266;">
    <ul>
      <li>开发时间预算？</li>
      <li>是否有 Mac 设备（iOS 开发必需）？</li>
      <li>是否需要同时覆盖多个平台？</li>
    </ul>
  </div>
</el-card>

---

## 3 平台选择决策图

下面这张表，帮你快速定位：

| 你的使用场景 | 推荐平台 | 原因 |
|---------|---------|------|
| 用户在微信生态，想快速获客 | <el-tag type="success">微信小程序</el-tag> | 无需下载，微信内传播，获客成本低 |
| 需要后台持续记录 GPS 轨迹、读取健康数据 | <el-tag type="primary">iOS / Android 原生</el-tag> | 直接调用系统 API，性能最优 |
| 想要一套代码覆盖多平台 | <el-tag type="warning">PWA / Electron</el-tag> | 开发效率高，维护成本低 |
| 用户需要长时间在电脑上使用 | <el-tag type="primary">桌面程序</el-tag>（Electron / Qt） | 独立窗口，可离线，系统集成度高 |
| 想在看网页时自动总结、翻译或管理密码 | <el-tag type="info">浏览器插件</el-tag> | 可读取和修改网页内容，随浏览器启动 |
| 想让技术文章、项目展示被 Google 搜到 | <el-tag type="warning">网站 / 个人博客</el-tag> | SEO 友好，内容可被搜索到 |
| 想发行可交易的数字会员卡或收藏品 | <el-tag type="danger">NFT 智能合约</el-tag> | 链上确权，可交易转让 |

---

## 4 具体场景举例

### 场景一：我想做一个社区团购工具

**💡 推荐：微信小程序**

为什么选小程序？

- **用户就在微信里**：社区大妈、家庭主妇都在微信群活跃，小程序可以直接分享到群里
- **用完即走**：下单买菜这种事，没人愿意专门下载一个 App
- **支付无缝**：微信支付一键完成，不需要跳转
- **获客成本低**：一个群接龙就能带来几十个新用户

::: tip 💡 适用场景
如果你做的是类似的事情——拼团、预约、问卷调查、活动报名——小程序都是首选。
:::

---

### 场景二：我想做一个跑步记录 App

**⚡ 推荐：iOS / Android 原生开发**

为什么选原生 App？

- **后台运行**：跑步时 App 需要在后台持续记录轨迹，小程序和网页都做不到
- **GPS 精度**：原生 App 可以访问高精度定位，误差在几米内
- **健康数据**：想读取步数、心率？只有原生 App 能调用 Apple HealthKit 和 Google Fit
- **推送提醒**：每天定时提醒用户"该跑步了"，原生推送最可靠

::: warning ⚠️ 重要提示
任何需要**长时间后台运行**或**深度调用硬件**的应用，都应该选原生开发。
:::

---

### 场景三：我想做一个记账软件

**⚡ 推荐：iOS / Android 原生开发**

为什么？

- **启动速度快**：记账场景需要快速打开、快速记录、快速关闭，原生 App 的启动速度是最佳体验保障
- **使用频率高但单次时间短**：每天记一笔，30 秒就完事，原生 App 的流畅体验让用户更愿意坚持
- **推送提醒**：每天定时提醒用户记账，养成习惯，原生推送最可靠
- **数据安全**：原生 App 可以使用设备级加密，保护用户的财务隐私

虽然 PWA 和小程序也能实现基本功能，但对于高频、快速、注重体验的记账场景，原生开发的启动速度和流畅度是无可替代的。

---

### 场景四：我想做一个活动报名小程序

**📝 推荐：微信小程序 或 PWA**

为什么？

- **即用即走**：用户扫码报名，填完信息就走，不需要常驻手机
- **社交传播**：活动天然适合分享，微信生态传播效果最好
- **开发成本低**：一套代码覆盖 iOS 和 Android，开发周期短
- **无需审核发布**：PWA 可以直接部署，即时更新

小程序适合依赖微信社交的场景，PWA 适合需要跨平台、快速迭代的场景。

---

### 场景五：我想做一个在线教育平台

**📚 推荐：网站 + 小程序组合**

为什么？

- **网站负责获客**：课程介绍、师资展示、SEO 优化，让用户在搜索引擎找到你
- **小程序负责转化**：用户扫码试听、报名支付、加入学习群
- **网站负责交付**：视频课程在网页端播放，大屏体验更好
- **小程序负责触达**：上课提醒、作业通知通过小程序推送

::: tip 💡 组合策略
复杂业务往往需要**多平台组合**，而不是只选一个。
:::

---

### 场景六：我想做一个团队协作工具

**🤝 推荐：Electron 桌面程序 + 网页版**

为什么？

- **桌面端**：用户上班开着电脑，桌面程序可以常驻后台，随时接收消息
- **网页端**：临时在其他电脑上用，打开浏览器就行，不用安装
- **系统集成**：桌面程序可以访问本地文件、系统通知、快捷键
- **一套代码**：Electron 用 Web 技术开发，桌面版和网页版可以复用 80% 代码

Slack、Notion、Discord 都是这么做的。

---

### 场景七：我想做一个密码管理器

**🔐 推荐：桌面程序 + 浏览器插件**

为什么？

- **桌面程序**：安全存储密码数据库，支持指纹/面容解锁
- **浏览器插件**：在网页登录时自动填充，用户不用切换窗口
- **离线可用**：密码数据存在本地，不依赖网络
- **安全可控**：用户知道数据在哪，不用担心云端泄露

1Password、Bitwarden 都是桌面程序 + 浏览器插件的组合。

---

### 场景八：我想做一个内容创作平台

**✍️ 推荐：网站 + 个人博客**

为什么？

- **SEO 是生命线**：用户通过搜索找到你的内容，这是最大的流量来源
- **内容即产品**：文章、教程、视频，这些内容本身就是价值
- **长期资产**：网站可以运营 10 年，社交账号随时可能被封
- **变现灵活**：广告、付费订阅、知识付费，网站都能承载

Medium、知乎专栏、个人技术博客，本质都是内容平台。

---

### 场景九：我想做一个开发者效率工具

**🛠️ 推荐：VS Code 插件 或 命令行工具**

为什么？

- **用户就在编辑器里**：开发者不想切换窗口，工具要融入他们的工作流
- **上下文感知**：可以读取当前代码，提供精准建议
- **分发简单**：发布到插件市场，用户一键安装
- **迭代快速**：不用等应用商店审核，当天发布当天更新

Prettier、ESLint、GitHub Copilot 都是 VS Code 插件。

---

### 场景十：我想做一个工业监控大屏

**🏭 推荐：Qt 桌面应用**

为什么？

- **稳定压倒一切**：工厂 24 小时运行，软件不能崩溃
- **硬件通信**：需要通过串口、Modbus 协议读取传感器数据
- **实时图表**：压力、温度、流量，需要毫秒级刷新
- **工控环境**：工控机通常跑 Windows，Qt 兼容性最好

::: warning ⚠️ 工业场景
工业场景对稳定性和硬件接口的要求，是 Web 技术无法满足的。
:::

---

### 场景十一：我想发行一个数字会员卡

**🎫 推荐：NFT 智能合约**

为什么？

- **不可伪造**：区块链上的记录无法篡改，会员身份真实可信
- **可转让**：会员卡可以转赠或二级市场交易
- **可编程**：智能合约可以自动执行权益，比如持有满一年自动升级
- **全球化**：没有国界限制，全球用户都能参与

星巴克 Odyssey、NBA Top Shot 都在用 NFT 做会员体系

---

## 5 平台能力对比速查

### 5.1 移动端方案对比

| 能力 | 微信小程序 | iOS 原生 | Android 原生 | PWA |
|-----|----------|---------|-------------|-----|
| 获取用户成本 | <el-tag type="success">低</el-tag>（微信传播） | <el-tag type="danger">高</el-tag>（应用商店） | <el-tag type="danger">高</el-tag>（应用商店） | <el-tag type="warning">中</el-tag>（搜索引擎） |
| 离线使用 | <el-tag type="warning">有限支持</el-tag> | <el-tag type="success">完全支持</el-tag> | <el-tag type="success">完全支持</el-tag> | <el-tag type="success">支持</el-tag> |
| 推送通知 | <el-tag type="success">支持</el-tag> | <el-tag type="success">支持</el-tag> | <el-tag type="success">支持</el-tag> | <el-tag type="warning">部分支持</el-tag> |
| 硬件访问 | <el-tag type="warning">受限</el-tag> | <el-tag type="success">完全访问</el-tag> | <el-tag type="success">完全访问</el-tag> | <el-tag type="warning">受限</el-tag> |
| 后台运行 | <el-tag type="warning">受限</el-tag> | <el-tag type="success">支持</el-tag> | <el-tag type="success">支持</el-tag> | <el-tag type="warning">受限</el-tag> |
| 开发成本 | <el-tag type="success">低</el-tag> | <el-tag type="danger">高</el-tag> | <el-tag type="danger">高</el-tag> | <el-tag type="success">低</el-tag> |
| 需要审核 | <el-tag type="warning">是</el-tag> | <el-tag type="warning">是</el-tag> | <el-tag type="warning">是</el-tag> | <el-tag type="success">否</el-tag> |

### 5.2 桌面端方案对比

| 能力 | Electron | Qt | 浏览器插件 |
|-----|----------|-----|-----------|
| 跨平台 | Win/Mac/Linux | Win/Mac/Linux | Chrome/Edge/Firefox |
| 系统集成 | <el-tag type="warning">中等</el-tag> | <el-tag type="success">高</el-tag> | <el-tag type="warning">低</el-tag> |
| 离线使用 | <el-tag type="success">支持</el-tag> | <el-tag type="success">支持</el-tag> | <el-tag type="warning">部分支持</el-tag> |
| 硬件访问 | <el-tag type="warning">通过 Node.js</el-tag> | <el-tag type="success">完全访问</el-tag> | <el-tag type="warning">受限</el-tag> |
| 安装方式 | 安装包 | 安装包 | 浏览器扩展商店 |
| 开发技术栈 | Web 技术 | C++/QML | JavaScript |

---

## 6 常见误区

<el-collapse accordion style="margin: 20px 0;">
  <el-collapse-item name="1">
    <template #title>
      <span style="font-weight: bold; color: #F56C6C;">❌ 误区一："我要做一个 App，所以必须开发 iOS 和 Android"</span>
    </template>
    <div style="padding: 10px; color: #606266; line-height: 1.8;">
      不一定。如果你的应用是轻量级的、用完即走的，小程序或 PWA 可能更合适。只有当你需要深度调用系统能力、追求极致性能时，才值得投入原生开发。
    </div>
  </el-collapse-item>
  
  <el-collapse-item name="2">
    <template #title>
      <span style="font-weight: bold; color: #F56C6C;">❌ 误区二："网站已经过时了，没人看了"</span>
    </template>
    <div style="padding: 10px; color: #606266; line-height: 1.8;">
      恰恰相反。网站是唯一能被搜索引擎收录的平台。如果你想通过内容获客，网站和个人博客是最好的选择。你的技术文章、项目展示，都可以通过 SEO 带来持续流量。
    </div>
  </el-collapse-item>
  
  <el-collapse-item name="3">
    <template #title>
      <span style="font-weight: bold; color: #F56C6C;">❌ 误区三："桌面程序没人用了"</span>
    </template>
    <div style="padding: 10px; color: #606266; line-height: 1.8;">
      在办公场景，桌面程序依然是主流。VS Code、Slack、Notion 都是桌面程序。如果你的应用需要长时间使用、处理大量数据、或需要系统集成，桌面程序是最佳选择。
    </div>
  </el-collapse-item>
  
  <el-collapse-item name="4">
    <template #title>
      <span style="font-weight: bold; color: #F56C6C;">❌ 误区四："PWA 体验不如原生"</span>
    </template>
    <div style="padding: 10px; color: #606266; line-height: 1.8;">
      现代 PWA 已经非常接近原生体验。星巴克、Pinterest、Uber 都有 PWA 版本。如果你的应用不需要复杂的硬件调用，PWA 是性价比最高的跨平台方案。
    </div>
  </el-collapse-item>
</el-collapse>

---

## 7 总结：选择平台的决策流程

```
开始
  │
  ├─ 用户在微信生态？ ───────────────────→ 微信小程序
  │
  ├─ 需要最佳性能和硬件访问？ ────────────→ iOS / Android 原生
  │
  ├─ 需要在电脑上长时间使用？ ────────────→ 桌面程序
  │     │
  │     ├─ 工业场景？ ────────────────────→ Qt
  │     └─ 通用场景？ ────────────────────→ Electron
  │
  ├─ 需要处理浏览器内容？ ────────────────→ 浏览器插件
  │
  ├─ 轻量工具 + 跨平台 + 离线？ ───────────→ PWA
  │
  ├─ 需要被搜索到？ ──────────────────────→ 网站 / 博客
  │
  ├─ 开发者工具？ ────────────────────────→ VS Code 插件
  │
  └─ 区块链资产？ ────────────────────────→ NFT 智能合约
```

---

## 8 下一步

::: tip 🎯 开始行动
根据上面的分析，你应该已经对"选择哪个平台"有了初步答案。接下来，点击对应的教程开始学习：
:::

<NavGrid>
  <NavCard
    href="/zh-cn/stage-3/cross-platform/wechat-miniprogram/"
    title="如何构建微信小程序"
    description="从零开始开发微信小程序，掌握小程序开发的核心流程"
  />
  <NavCard
    href="/zh-cn/stage-3/cross-platform/android-app/"
    title="如何构建安卓程序"
    description="使用现代跨平台框架构建 Android 原生应用"
  />
  <NavCard
    href="/zh-cn/stage-3/cross-platform/ios-app/"
    title="如何构建 iOS 程序"
    description="开发并发布 iOS 应用，掌握 iOS 生态的开发规范"
  />
  <NavCard
    href="/zh-cn/stage-3/cross-platform/pwa-local-app/"
    title="如何开发 PWA 本地应用"
    description="让网页变成真正的 App，支持离线使用和桌面安装"
  />
  <NavCard
    href="/zh-cn/stage-3/cross-platform/browser-ai-extension/"
    title="如何开发浏览器 AI 助手插件"
    description="一键总结任意网页，打造你的浏览器 AI 助手"
  />
  <NavCard
    href="/zh-cn/stage-3/cross-platform/electron-voice-to-text/"
    title="如何开发跨平台 Electron 桌面程序"
    description="构建语音转文字的桌面应用，支持 Windows、macOS、Linux"
  />
  <NavCard
    href="/zh-cn/stage-3/cross-platform/vscode-extension/"
    title="如何开发 VS Code 插件"
    description="打造你的 AI 项目助手，支持多文件问答和自定义快捷键"
  />
  <NavCard
    href="/zh-cn/stage-3/cross-platform/qt-industrial-hmi/"
    title="如何开发 Qt 工业 HMI"
    description="构建工业级人机交互界面，连接真实硬件设备"
  />
</NavGrid>
