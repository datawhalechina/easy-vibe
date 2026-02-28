# 如何快速开发并铸造 NFT——10 分钟上手版

# 第 1 章：什么是 NFT 和智能合约

在这篇教程中，我们将完整跑通一条闭环：从零开始编写一个 NFT 智能合约，部署到以太坊测试网，铸造出属于你自己的 NFT，并在 OpenSea 上查看它。全程使用浏览器在线工具，不需要安装任何本地环境，10 分钟即可完成。

本次教程，你至少需要具备：

- Chrome 浏览器（安装 MetaMask 钱包插件）
- 一个 MetaMask 钱包账户
- 一点点 Sepolia 测试网 ETH（免费领取，下文会教你）

> **零成本、零配置**：全程使用浏览器在线工具（Remix IDE），不用装 Node.js / Hardhat；代码直接用 OpenZeppelin 官方安全模板；铸造后能在 OpenSea 测试网看到自己的 NFT。

## 1.1 什么是 NFT？

NFT（Non-Fungible Token，非同质化代币）是区块链上的一种数字资产。和比特币、以太币这些"同质化"代币不同，每一个 NFT 都是独一无二的——就像世界上没有两幅完全相同的画。

你可以把 NFT 理解为 **"数字世界的收藏证书"**。它可以代表：

* 一幅数字画作的所有权
* 一张活动门票
* 一个游戏道具
* 一份学习证书
* 甚至一条推文

NFT 的核心价值在于：**它用区块链技术证明了"这个数字物品属于你"，而且这个证明是公开透明、不可篡改的。**

<!-- ![placeholder: 一张示意图，展示 NFT 的概念：左边是一幅数字画作，右边是区块链上的所有权记录，中间用箭头连接](images/image1.png) -->

## 1.2 什么是智能合约？

智能合约（Smart Contract）是运行在区块链上的一段程序代码。你可以把它理解为 **"自动执行的合同"**——一旦部署到区块链上，它就会按照代码逻辑自动运行，任何人都无法篡改。

NFT 就是通过智能合约来创建和管理的。当你"铸造"（Mint）一个 NFT 时，实际上是调用了智能合约中的一个函数，让它在区块链上记录："编号为 #0 的 NFT 属于你的钱包地址"。

我们将使用 **Solidity** 语言编写智能合约。别担心，借助 OpenZeppelin 提供的现成模板，你只需要写不到 15 行代码。

## 1.3 我们要铸造什么 NFT？

我们将铸造一个 **"Vibe Coder 学习证书"** NFT——证明你完成了这篇教程，掌握了区块链开发的基础技能。这个 NFT 将：

* 拥有独一无二的编号（Token ID）
* 记录在以太坊 Sepolia 测试网上
* 可以在 OpenSea 测试网上查看和展示
* （可选）附带一张你自定义的图片

当然，你也可以把它改成任何你喜欢的主题——一幅 AI 生成的画作、一张活动纪念卡、一个像素头像……NFT 的内容完全由你决定。

## 1.4 为什么用测试网？

以太坊有"主网"和"测试网"之分：

| 对比 | 主网（Mainnet） | 测试网（Sepolia） |
|------|----------------|------------------|
| ETH 价值 | 真金白银 | 免费领取，无真实价值 |
| 部署费用 | 需要花真钱（Gas 费） | 完全免费 |
| 适用场景 | 正式发布 | 学习、测试、开发 |
| 功能差异 | 无 | 与主网完全一致 |

测试网和主网的功能完全一样，唯一的区别是测试网的 ETH 没有真实价值。所以我们可以放心地在测试网上学习和实验，不用担心花钱。

## 1.5 本教程的路线图

我们将按以下步骤完成整个流程：

1. **准备钱包和测试币**（2 分钟）：安装 MetaMask，领取免费测试 ETH
2. **编写并部署智能合约**（4 分钟）：在 Remix IDE 中编写 NFT 合约并部署到 Sepolia
3. **铸造 NFT 并查看成果**（4 分钟）：调用合约铸造 NFT，在 OpenSea 和 Etherscan 上验证
4. **进阶：给 NFT 添加图片**（可选）：使用 IPFS 存储图片，让 NFT 更完整

# 第 2 章：准备钱包和测试币（2 分钟）

## 2.1 安装 MetaMask 钱包

MetaMask 是最流行的以太坊钱包，它是一个浏览器插件，让你可以和区块链上的应用交互。

1. 打开 Chrome 浏览器，访问 [MetaMask 官网](https://metamask.io/)
2. 点击 **"Download"**，安装 Chrome 插件
3. 安装完成后，点击浏览器右上角的 MetaMask 狐狸图标
4. 选择 **"创建新钱包"**，设置密码
5. **重要**：妥善保存你的助记词（12 个英文单词）。测试网钱包丢了无所谓，但养成好习惯很重要

<!-- ![placeholder: MetaMask 安装和创建钱包的截图流程：安装插件 → 创建钱包 → 设置密码 → 备份助记词](images/image2.png) -->

## 2.2 切换到 Sepolia 测试网

MetaMask 默认连接的是以太坊主网。我们需要切换到 Sepolia 测试网：

1. 点击 MetaMask 顶部的网络下拉菜单（默认显示"Ethereum Mainnet"）
2. 点击 **"Show test networks"**（显示测试网络）
3. 选择 **"Sepolia test network"**

如果没有看到 Sepolia 选项，点击 **"Add network"**，手动添加：

| 配置项 | 值 |
|-------|-----|
| Network Name | Sepolia test network |
| RPC URL | `https://rpc.sepolia.org` |
| Chain ID | 11155111 |
| Currency Symbol | SepoliaETH |
| Block Explorer | `https://sepolia.etherscan.io` |

<!-- ![placeholder: MetaMask 切换到 Sepolia 测试网的截图，展示网络下拉菜单和 Sepolia 选项](images/image3.png) -->

## 2.3 领取免费测试 ETH

部署合约和铸造 NFT 都需要支付 Gas 费（交易手续费）。在测试网上，Gas 费用测试 ETH 支付，完全免费。

访问以下任一水龙头（Faucet）网站，输入你的钱包地址，即可领取免费的 Sepolia ETH：

| 水龙头 | 地址 | 每次领取量 | 是否需要登录 |
|--------|------|-----------|------------|
| QuickNode | `https://faucet.quicknode.com/ethereum/sepolia` | 0.1 ETH | 需要 |
| Alchemy | `https://www.alchemy.com/faucets/ethereum-sepolia` | 0.1 ETH | 需要 |
| Google Cloud | `https://cloud.google.com/application/web3/faucet/ethereum/sepolia` | 0.05 ETH | 需要 Google 账号 |

> **提示**：0.1 个测试 ETH 足够你部署合约 + 铸造几十个 NFT 了。如果一个水龙头领不到，换一个试试。

领取成功后，回到 MetaMask，你会看到余额从 0 变成了 0.1 ETH（可能需要等待几秒钟）。

<!-- ![placeholder: 水龙头网站截图，展示输入钱包地址并领取测试 ETH 的过程](images/image4.png) -->

# 第 3 章：编写并部署 NFT 智能合约（4 分钟）

## 3.1 打开 Remix IDE

Remix 是以太坊官方推荐的在线智能合约开发环境，完全在浏览器中运行，不需要安装任何东西。

打开浏览器，访问：**https://remix.ethereum.org/**

你会看到一个类似 VS Code 的界面，左侧是文件管理器，中间是代码编辑器，右侧是编译和部署面板。

<!-- ![placeholder: Remix IDE 首页截图，展示文件管理器、代码编辑器和右侧面板](images/image5.png) -->

## 3.2 创建合约文件

1. 在左侧文件管理器中，点击 **"contracts"** 文件夹
2. 点击上方的 **"+"** 按钮，新建文件
3. 命名为 **`MySimpleNFT.sol`**
4. 粘贴以下代码：

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// 引入 OpenZeppelin 官方的 ERC721 安全模板
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

// 最简 NFT 合约：只有名称、符号、铸造功能
contract MySimpleNFT is ERC721 {
    uint256 private _tokenId;

    // 初始化 NFT 集合的名称和符号
    constructor() ERC721("VibeCoder", "VIBE") {}

    // 铸造 NFT：调用就给当前地址发一个
    function mint() public {
        _safeMint(msg.sender, _tokenId);
        _tokenId++;
    }
}
```

**代码解读（不到 15 行，每行都能看懂）：**

| 代码 | 含义 |
|------|------|
| `pragma solidity ^0.8.20` | 指定 Solidity 编译器版本 |
| `import "@openzeppelin/..."` | 引入 OpenZeppelin 的 ERC721 标准实现（经过安全审计的模板） |
| `contract MySimpleNFT is ERC721` | 创建一个继承 ERC721 标准的合约 |
| `ERC721("VibeCoder", "VIBE")` | NFT 集合名称为 "VibeCoder"，符号为 "VIBE" |
| `_safeMint(msg.sender, _tokenId)` | 给调用者铸造一个新 NFT |
| `_tokenId++` | 每铸造一个，编号自动 +1 |

> **ERC721 是什么？** 它是以太坊上 NFT 的标准协议，定义了 NFT 应该具备的基本功能（转账、查询所有者等）。OpenZeppelin 提供了经过安全审计的实现，我们直接继承就行，不用自己从零写。

<!-- ![placeholder: Remix IDE 中粘贴合约代码的截图](images/image6.png) -->

## 3.3 编译合约

1. 点击左侧面板的 **"Solidity Compiler"**（锤子图标）
2. 编译器版本选择 **0.8.20**（或更高的 0.8.x 版本）
3. 点击 **"Compile MySimpleNFT.sol"**
4. 看到绿色对勾 ✅ 表示编译成功

> 如果报错，检查 Solidity 版本是否匹配，以及 OpenZeppelin 的 import 路径是否正确。Remix 会自动从 npm 下载 OpenZeppelin 依赖。

<!-- ![placeholder: Remix 编译成功的截图，展示绿色对勾和编译器版本选择](images/image7.png) -->

## 3.4 部署合约到 Sepolia 测试网

1. 点击左侧面板的 **"Deploy & Run Transactions"**（以太坊图标）
2. **Environment** 选择 **"Injected Provider - MetaMask"**
   - 这会自动连接你的 MetaMask 钱包
   - MetaMask 会弹出连接请求，点击 **"连接"**
3. 确认网络显示为 **Sepolia (11155111)**
4. Contract 下拉框选择 **MySimpleNFT**
5. 点击 **"Deploy"** 按钮
6. MetaMask 弹出交易确认，点击 **"确认"**（Gas 费极低，测试网免费）

等待几秒钟，部署成功后，下方 **"Deployed Contracts"** 区域会显示你的合约地址。**复制并保存这个地址**，后面查看 NFT 时需要用到。

<!-- ![placeholder: Remix 部署合约的截图，展示 Environment 选择、MetaMask 连接确认、Deploy 按钮和部署成功后的合约地址](images/image8.png) -->

# 第 4 章：铸造 NFT 并查看成果（4 分钟）

## 4.1 铸造你的第一个 NFT

部署成功后，在 Remix 下方的 **"Deployed Contracts"** 区域，你会看到合约的交互面板。

1. 展开合约面板，找到 **"mint"** 按钮（橙色）
2. 直接点击 **"mint"**（不需要输入任何参数）
3. MetaMask 弹出交易确认，点击 **"确认"**
4. 等待几秒钟，交易完成

恭喜！你刚刚铸造了编号为 #0 的 NFT，它现在属于你的钱包地址。

你可以继续点击 "mint" 铸造更多——每次铸造的 NFT 编号会自动递增（#1、#2、#3……）。

<!-- ![placeholder: Remix 中点击 mint 按钮并在 MetaMask 中确认交易的截图](images/image9.png) -->

## 4.2 验证铸造结果

**方式 1：在 Remix 中验证**

在合约面板中，找到 **"balanceOf"** 函数（蓝色按钮），输入你的钱包地址，点击调用。如果返回 `1`（或你铸造的数量），说明铸造成功。

你也可以调用 **"ownerOf"** 函数，输入 `0`（Token ID），它会返回你的钱包地址——证明编号 #0 的 NFT 属于你。

**方式 2：在 Etherscan 上验证（推荐）**

1. 打开 [Sepolia Etherscan](https://sepolia.etherscan.io/)
2. 在搜索框中粘贴你的**合约地址**
3. 你会看到合约的详情页面，包括所有交易记录
4. 点击 **"Token Tracker"** 链接，可以看到你铸造的所有 NFT

在 Etherscan 上，每一笔铸造交易都有完整的记录：谁铸造的、什么时候铸造的、Token ID 是多少——这就是区块链"公开透明、不可篡改"的魅力。

<!-- ![placeholder: Sepolia Etherscan 上查看合约和 NFT 铸造记录的截图，展示交易列表和 Token Tracker](images/image10.png) -->

# 第 5 章：进阶——给 NFT 添加图片（可选）

目前我们铸造的 NFT 只有编号，没有图片和描述。要让 NFT 更完整，我们需要用到 **IPFS**（星际文件系统）来存储图片和元数据。

## 5.1 什么是 IPFS？

IPFS 是一个去中心化的文件存储网络。和普通的云存储不同，IPFS 上的文件不依赖某一台服务器，而是分布在全球的节点上。这意味着：

* 文件不会因为某台服务器宕机而丢失
* 文件内容由哈希值唯一标识，无法被篡改
* 非常适合存储 NFT 的图片和元数据

## 5.2 上传图片到 Pinata

[Pinata](https://pinata.cloud/) 是最流行的 IPFS 存储服务，免费版提供 1GB 存储空间，足够我们使用。

1. 访问 https://pinata.cloud/，注册一个免费账号
2. 登录后，点击 **"Upload"** → **"File"**
3. 选择你想作为 NFT 图片的文件（可以用 AI 生成一张，或者随便找一张图片）
4. 上传成功后，复制文件的 **CID**（类似 `QmXyz...` 的一串字符）

你的图片地址就是：`ipfs://你的CID`

<!-- ![placeholder: Pinata 上传图片的截图，展示上传按钮和上传成功后的 CID](images/image11.png) -->

## 5.3 创建元数据 JSON

NFT 的元数据（Metadata）是一个 JSON 文件，描述了 NFT 的名称、描述和图片地址。创建一个 `metadata.json` 文件：

```json
{
  "name": "Vibe Coder Certificate #0",
  "description": "This NFT certifies that the holder has completed the NFT minting tutorial and entered the world of Web3.",
  "image": "ipfs://你的图片CID",
  "attributes": [
    { "trait_type": "Course", "value": "Easy Vibe" },
    { "trait_type": "Skill", "value": "Smart Contract" },
    { "trait_type": "Level", "value": "Beginner" }
  ]
}
```

将 `metadata.json` 也上传到 Pinata，获得元数据的 CID。

## 5.4 升级合约以支持图片

要让 NFT 带上图片，我们需要稍微升级一下合约，加入 `tokenURI` 功能。回到 Remix，创建一个新文件 `MyNFTWithImage.sol`：

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract MyNFTWithImage is ERC721, ERC721URIStorage {
    uint256 private _tokenId;

    constructor() ERC721("VibeCoder", "VIBE") {}

    // 铸造时传入元数据地址
    function mint(string memory uri) public {
        _safeMint(msg.sender, _tokenId);
        _setTokenURI(_tokenId, uri);
        _tokenId++;
    }

    // 以下是 Solidity 要求的重写
    function tokenURI(uint256 tokenId)
        public view override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public view override(ERC721, ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
```

部署后，调用 `mint` 时传入你的元数据地址（如 `ipfs://QmAbc.../metadata.json`），铸造出的 NFT 就会带上图片和描述了。

<!-- ![placeholder: 在 Etherscan 上查看带图片的 NFT 详情截图](images/image12.png) -->

# 第 6 章：写在最后

恭喜你！你已经从零完成了一次完整的 NFT 开发闭环。回顾一下我们做了什么：

1. 理解了 NFT 和智能合约的基本概念
2. 安装了 MetaMask 钱包并切换到 Sepolia 测试网
3. 在 Remix IDE 中编写了不到 15 行的 NFT 智能合约
4. 将合约部署到以太坊测试网
5. 铸造了属于自己的 NFT，并在 Etherscan 上验证
6. （可选）学会了用 IPFS 给 NFT 添加图片和元数据

整个过程没有安装任何本地环境，没有花一分钱，全程在浏览器中完成。这就是区块链开发的魅力——门槛比你想象的低得多。

**进阶方向：**

* **使用 Hardhat / Foundry 本地开发**：当你的合约逻辑变复杂时，Remix 就不够用了。Hardhat 和 Foundry 是专业的本地开发框架，支持自动化测试、脚本部署、Gas 优化等
* **添加白名单和铸造限制**：限制谁可以铸造、每人最多铸造几个、设置铸造价格等
* **构建 Mint 前端页面**：用 React + ethers.js / viem 构建一个漂亮的铸造页面，让用户通过网页一键铸造
* **探索 ERC1155 多版本 NFT**：ERC1155 允许同一个 Token ID 有多个副本，适合游戏道具、门票等场景
* **部署到主网**：当你准备好了，把合约部署到以太坊主网（或 Polygon、Base 等 L2 链，Gas 费更低）

***你的第一个 NFT 已经在链上了，区块链世界的大门已经打开。***

# 参考文献

* [OpenZeppelin ERC721 文档](https://docs.openzeppelin.com/contracts/5.x/erc721)
* [Remix IDE 官方文档](https://remix-ide.readthedocs.io/)
* [MetaMask 官方文档](https://docs.metamask.io/)
* [Solidity 官方文档](https://docs.soliditylang.org/)
* [Sepolia Etherscan](https://sepolia.etherscan.io/)
* [Pinata IPFS 存储服务](https://pinata.cloud/)
* [ERC721 标准规范（EIP-721）](https://eips.ethereum.org/EIPS/eip-721)
