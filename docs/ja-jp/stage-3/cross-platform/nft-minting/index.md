# NFTを素早く構築してミントする方法：10分入門編

# 第1章：NFTとスマートコントラクトとは

このチュートリアルでは、完全なクローズドループを完成させます：NFTスマートコントラクトをゼロから作成し、Ethereumテストネットにデプロイし、自分のNFTをミントし、OpenSeaで確認します。全体のプロセスはブラウザベースのツールを使用し、ローカル環境のセットアップは不要で、10分で完了できます。

このチュートリアルにあたり、少なくとも以下を用意してください：

- Chromeブラウザ（MetaMaskウォレット拡張機能をインストール済み）
- MetaMaskウォレットアカウント
- 少量のSepoliaテストネットETH（無料で取得可能、後述）

> **ゼロコスト、ゼロセットアップ**：全プロセスはブラウザベースのツール（Remix IDE）を使用し、Node.js / Hardhatのインストール不要。コードはOpenZeppelin公式の安全なテンプレートを使用。ミント後、OpenSeaテストネットでNFTを確認できます。

## 1.1 NFTとは

NFT（Non-Fungible Token）は、ブロックチェーン上のデジタル資産の一種です。BitcoinやEtherのような代替可能なトークンとは異なり、すべてのNFTはユニークであり、世界に全く同じ絵画が2つ存在しないのと同じです。

NFTは**「デジタル世界のコレクション証明書」**として理解できます。以下を表現できます：

* デジタルアート作品の所有権
* イベントチケット
* ゲームアイテム
* 学習証明書
* ツイートさえも

NFTの核心的な価値は、**ブロックチェーン技術を使用して「このデジタルアイテムはあなたのものです」と証明し、その証明が公開、透明、改ざん困難であること**にあります。

<!-- ![placeholder: NFTの概念図：左にデジタルアート作品、右にブロックチェーン上の所有権記録、矢印で接続](../../../../zh-cn/stage-3/cross-platform/nft-minting/images/image1.png) -->

## 1.2 スマートコントラクトとは

スマートコントラクトは、ブロックチェーン上で実行されるコードです。**「自動実行される契約」**として考えることができます。チェーン上にデプロイされると、コードロジックに従って自動的に実行され、誰も改ざんできません。

NFTはスマートコントラクトを通じて作成・管理されます。NFTを「ミント」するとき、実際にはスマートコントラクトの関数を呼び出して、チェーン上に「NFT #0はあなたのウォレットアドレスに属します」と書き込んでいます。

コントラクトの記述には**Solidity**を使用します。心配しないでください。OpenZeppelinの既製テンプレートを使えば、15行未満のコードを書くだけで済みます。

## 1.3 どのようなNFTをミントするのか

このチュートリアルでは、**「Vibe Coder学習証明書」**NFTをミントし、このチュートリアルを完了してブロックチェーン開発の基礎を学んだことを証明します。このNFTは：

* ユニークなトークンIDを持つ
* Ethereum Sepoliaテストネットに記録される
* OpenSeaテストネットで閲覧・表示可能
* （オプション）カスタム画像を含む

もちろん、好きなテーマに変更できます：AI生成アートワーク、イベント記念カード、ピクセルアバターなど。NFTの内容は完全にあなた次第です。

## 1.4 なぜテストネットを使うのか

Ethereumには「メインネット」と「テストネット」があります：

| 比較 | メインネット | テストネット（Sepolia） |
|------|----------------|------------------|
| ETHの価値 | 本物のお金 | 無料で取得、実際の価値なし |
| デプロイコスト | 本物のガス代が必要 | 完全に無料 |
| 用途 | 本番リリース | 学習、テスト、開発 |
| 機能の違い | なし | メインネットと同じ |

テストネットとメインネットは機能的に同じです。唯一の違いは、テストネットETHに実際の価値がないことです。そのため、お金を使う心配なく安全に学習・実験できます。

## 1.5 チュートリアルのロードマップ

以下のステップで流れを完了します：

1. **ウォレットとテストETHの準備**（2分）：MetaMaskをインストールし、無料テストETHを取得
2. **コントラクトの作成とデプロイ**（4分）：Remix IDEでNFTコントラクトを作成し、Sepoliaにデプロイ
3. **NFTのミントと結果確認**（4分）：コントラクトを呼び出してNFTをミントし、OpenSeaとEtherscanで確認
4. **応用：NFTに画像を追加**（オプション）：IPFSに画像を保存してNFTを完成

# 第2章：ウォレットとテストETHの準備（2分）

## 2.1 MetaMaskウォレットのインストール

MetaMaskは最も人気のあるEthereumウォレットです。ブラウザ拡張機能で、ブロックチェーンアプリとやり取りできます。

1. Chromeで[MetaMask公式サイト](https://metamask.io/)を開く
2. **「Download」**をクリックし、Chrome拡張機能をインストール
3. インストール後、右上のMetaMaskキツネアイコンをクリック
4. **「Create a new wallet」**を選択し、パスワードを設定
5. **重要**：リカバリーフレーズ（12語）を安全に保管。テストウォレットの紛失は問題ありませんが、良い習慣が重要

<!-- ![placeholder: MetaMaskのインストールとウォレット作成フローのスクリーンショット：拡張機能のインストール -> ウォレットの作成 -> パスワード設定 -> リカバリーフレーズのバックアップ](../../../../zh-cn/stage-3/cross-platform/nft-minting/images/image2.png) -->

## 2.2 Sepoliaテストネットへの切り替え

MetaMaskはデフォルトでEthereumメインネットに接続します。Sepoliaテストネットに切り替える必要があります：

1. MetaMask上部のネットワークドロップダウンをクリック（デフォルト：「Ethereum Mainnet」）
2. **「Show test networks」**をクリック
3. **「Sepolia test network」**を選択

Sepoliaが表示されない場合、**「Add network」**をクリックして手動で追加：

| 設定項目 | 値 |
|-------|-----|
| Network Name | Sepolia test network |
| RPC URL | `https://rpc.sepolia.org` |
| Chain ID | 11155111 |
| Currency Symbol | SepoliaETH |
| Block Explorer | `https://sepolia.etherscan.io` |

<!-- ![placeholder: MetaMaskのネットワークドロップダウンからSepoliaテストネットに切り替えるスクリーンショット](../../../../zh-cn/stage-3/cross-platform/nft-minting/images/image3.png) -->

## 2.3 無料テストETHの取得

コントラクトのデプロイとNFTのミントにはガス代が必要です。テストネットでは、ガスはテストETHで支払われ、無料です。

以下のフォーセットのいずれかにアクセスし、ウォレットアドレスを入力して無料Sepolia ETHを取得：

| フォーセット | URL | 取得量 | ログイン要件 |
|--------|------|-----------|------------|
| QuickNode | `https://faucet.quicknode.com/ethereum/sepolia` | 0.1 ETH | 要 |
| Alchemy | `https://www.alchemy.com/faucets/ethereum-sepolia` | 0.1 ETH | 要 |
| Google Cloud | `https://cloud.google.com/application/web3/faucet/ethereum/sepolia` | 0.05 ETH | 要（Googleアカウント） |

> **ヒント**：0.1テストETHは、コントラクトのデプロイと数十個のNFTミントに十分です。あるフォーセットが失敗したら、別のフォーセットを試してください。

取得に成功したら、MetaMaskに戻ると残高が0から0.1 ETHに変わります（数秒かかる場合があります）。

<!-- ![placeholder: フォーセットサイトのスクリーンショット：ウォレットアドレスの入力とテストETHの取得](../../../../zh-cn/stage-3/cross-platform/nft-minting/images/image4.png) -->

# 第3章：NFTスマートコントラクトの作成とデプロイ（4分）

## 3.1 Remix IDEを開く

Remixは、Ethereum公式推奨のオンラインスマートコントラクト開発環境です。ブラウザ上で完全に動作し、インストール不要です。

開く：**https://remix.ethereum.org/**

VS Codeのようなインターフェースが表示されます：左にファイルエクスプローラー、中央にコードエディタ、右にコンパイル/デプロイパネル。

<!-- ![placeholder: Remix IDEホーム画面のスクリーンショット：ファイルエクスプローラー、コードエディタ、右側パネル](../../../../zh-cn/stage-3/cross-platform/nft-minting/images/image5.png) -->

## 3.2 コントラクトファイルの作成

1. 左のファイルエクスプローラーで**「contracts」**フォルダをクリック
2. 上部の**「+」**ボタンをクリックして新規ファイルを作成
3. 名前を**`MySimpleNFT.sol`**にする
4. 以下のコードを貼り付け：

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// OpenZeppelin公式の安全なERC721テンプレートをインポート
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

// 最もシンプルなNFTコントラクト：名前、シンボル、ミント関数のみ
contract MySimpleNFT is ERC721 {
    uint256 private _tokenId;

    // コレクション名とシンボルを初期化
    constructor() ERC721("VibeCoder", "VIBE") {}

    // NFTのミント：一度呼び出すと、呼び出し元に1トークンをミント
    function mint() public {
        _safeMint(msg.sender, _tokenId);
        _tokenId++;
    }
}
```

**コードの解説（15行未満で、各行が理解可能）：**

| コード | 意味 |
|------|------|
| `pragma solidity ^0.8.20` | Solidityコンパイラバージョンの指定 |
| `import "@openzeppelin/..."` | OpenZeppelin ERC721標準実装のインポート（セキュリティ監査済みテンプレート） |
| `contract MySimpleNFT is ERC721` | ERC721標準を継承したコントラクトの作成 |
| `ERC721("VibeCoder", "VIBE")` | コレクション名「VibeCoder」とシンボル「VIBE」の設定 |
| `_safeMint(msg.sender, _tokenId)` | 呼び出し元に新しいNFTをミント |
| `_tokenId++` | ミントごとにトークンIDをインクリメント |

> **ERC721とは？** Ethereum上のNFT標準で、基本的なNFT機能（転送、所有者照会など）を定義します。OpenZeppelinはセキュリティ監査済みの実装を提供しており、ゼロから構築する代わりに直接継承できます。

<!-- ![placeholder: Remix IDEに貼り付けられたコントラクトコードのスクリーンショット](../../../../zh-cn/stage-3/cross-platform/nft-minting/images/image6.png) -->

## 3.3 コントラクトのコンパイル

1. 左パネルの**「Solidity Compiler」**をクリック（ハンマーアイコン）
2. コンパイラバージョン**0.8.20**（または0.8.xのより高いバージョン）を選択
3. **「Compile MySimpleNFT.sol」**をクリック
4. 緑色のチェックマーク ✅ はコンパイル成功を示します

> エラーがある場合、Solidityバージョンが一致しているか、OpenZeppelinのインポートパスが正しいか確認してください。Remixは自動的にOpenZeppelinの依存関係をnpmからダウンロードします。

<!-- ![placeholder: 緑色のチェックマークと選択されたコンパイラバージョンが表示されたRemixコンパイル成功のスクリーンショット](../../../../zh-cn/stage-3/cross-platform/nft-minting/images/image7.png) -->

## 3.4 コントラクトをSepoliaテストネットにデプロイ

1. 左パネルの**「Deploy & Run Transactions」**をクリック（Ethereumアイコン）
2. **Environment**を**「Injected Provider - MetaMask」**に設定
   - これによりMetaMaskウォレットに自動接続
   - MetaMaskが接続要求のポップアップを表示、**「Connect」**をクリック
3. ネットワークが**Sepolia (11155111)**であることを確認
4. Contractドロップダウンで**MySimpleNFT**を選択
5. **「Deploy」**をクリック
6. MetaMaskが取引確認のポップアップを表示、**「Confirm」**をクリック（ガス代は非常に低く、テストネットは無料）

数秒後、デプロイが成功すると、下部の**「Deployed Contracts」**セクションにコントラクトアドレスが表示されます。**このアドレスをコピーして保存**してください。後で必要になります。

<!-- ![placeholder: 環境選択、MetaMask確認、Deployボタン、デプロイ済みコントラクトアドレスが表示されたRemixデプロイメントのスクリーンショット](../../../../zh-cn/stage-3/cross-platform/nft-minting/images/image8.png) -->

# 第4章：NFTのミントと結果確認（4分）

## 4.1 最初のNFTのミント

デプロイ成功後、Remixの**「Deployed Contracts」**セクションにコントラクト操作パネルが表示されます。

1. コントラクトパネルを展開し、**「mint」**ボタン（オレンジ色）を見つける
2. **「mint」**を直接クリック（入力パラメータ不要）
3. MetaMaskが取引確認のポップアップを表示、**「Confirm」**をクリック
4. 数秒待って完了

おめでとうございます！NFT #0をミントしました。これはあなたのウォレットアドレスに属しています。

「mint」をクリックし続けて、さらに作成できます。トークンIDは毎回自動インクリメントされます（#1、#2、#3...）。

<!-- ![placeholder: Remixでmintをクリックし、MetaMaskで取引を確認するスクリーンショット](../../../../zh-cn/stage-3/cross-platform/nft-minting/images/image9.png) -->

## 4.2 ミント結果の確認

**方法1：Remixで確認**

コントラクトパネルで**「balanceOf」**（青いボタン）を見つけ、ウォレットアドレスを入力して呼び出します。`1`（またはミントした数）が返されれば、ミント成功です。

また、**「ownerOf」**を呼び出し、`0`（トークンID）を入力すると、あなたのウォレットアドレスが返され、NFT #0があなたのものであることが証明されます。

**方法2：Etherscanで確認（推奨）**

1. [Sepolia Etherscan](https://sepolia.etherscan.io/)を開く
2. **コントラクトアドレス**を検索バーに貼り付け
3. コントラクト詳細ページにすべての取引記録が表示
4. **「Token Tracker」**をクリックして、コントラクトでミントされたすべてのNFTを確認

Etherscanでは、すべてのミント取引に完全な記録があります：誰がミントしたか、いつミントされたか、トークンID。これがブロックチェーンが「公開、透明、改ざん困難」である魅力です。

<!-- ![placeholder: Sepolia EtherscanでコントラクトとNFTミント記録を閲覧するスクリーンショット：取引リストとToken Tracker](../../../../zh-cn/stage-3/cross-platform/nft-minting/images/image10.png) -->

# 第5章：応用 - NFTに画像を追加（オプション）

これまでミントしたNFTにはIDしかなく、画像や説明がありません。NFTを完成させるには、**IPFS（InterPlanetary File System）**を使用して画像とメタデータを保存する必要があります。

## 5.1 IPFSとは

IPFSは分散型ファイルストレージネットワークです。通常のクラウドストレージとは異なり、IPFS上のファイルは1つのサーバーに依存せず、世界中のノードに分散されています。これは以下を意味します：

* 1つのサーバーがダウンしてもファイルは失われない
* ファイルの内容はハッシュによって一意に識別され、改ざん不可
* NFT画像とメタデータの保存に最適

## 5.2 Pinataに画像をアップロード

[Pinata](https://pinata.cloud/)は最も人気のあるIPFSストレージサービスです。無料プランで1GBのストレージが提供され、十分です。

1. https://pinata.cloud/ にアクセスし、無料アカウントを登録
2. ログイン後、**「Upload」** -> **「File」**をクリック
3. NFTアートワークとして使用したい画像を選択（AI生成画像でも、任意の画像でも可）
4. アップロード成功後、**CID**（`QmXyz...`のような文字列）をコピー

画像のURIは：`ipfs://yourCID`

<!-- ![placeholder: Pinataでの画像アップロードのスクリーンショット：アップロードボタンと生成されたCID](../../../../zh-cn/stage-3/cross-platform/nft-minting/images/image11.png) -->

## 5.3 メタデータJSONの作成

NFTメタデータは、NFTの名前、説明、画像URIを記述するJSONファイルです。`metadata.json`を作成：

```json
{
  "name": "Vibe Coder Certificate #0",
  "description": "This NFT certifies that the holder has completed the NFT minting tutorial and entered the world of Web3.",
  "image": "ipfs://your-image-cid",
  "attributes": [
    { "trait_type": "Course", "value": "Easy Vibe" },
    { "trait_type": "Skill", "value": "Smart Contract" },
    { "trait_type": "Level", "value": "Beginner" }
  ]
}
```

`metadata.json`もPinataにアップロードし、メタデータCIDを取得。

## 5.4 画像対応のコントラクトへのアップグレード

NFTに画像を含めるには、`tokenURI`を追加してコントラクトを少しアップグレードする必要があります。Remixに戻り、新しいファイル`MyNFTWithImage.sol`を作成：

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract MyNFTWithImage is ERC721, ERC721URIStorage {
    uint256 private _tokenId;

    constructor() ERC721("VibeCoder", "VIBE") {}

    // ミント時にメタデータURIを渡す
    function mint(string memory uri) public {
        _safeMint(msg.sender, _tokenId);
        _setTokenURI(_tokenId, uri);
        _tokenId++;
    }

    // Solidityで必要なオーバーライド
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

デプロイ後、`mint`を呼び出してメタデータURI（例：`ipfs://QmAbc.../metadata.json`）を渡します。ミントされたNFTには画像と説明が含まれます。

<!-- ![placeholder: Etherscanで画像付きNFTの詳細が表示されたスクリーンショット](../../../../zh-cn/stage-3/cross-platform/nft-minting/images/image12.png) -->

# 第6章：まとめ

おめでとうございます！ゼロから完全なNFT開発ループを完了しました。振り返りましょう：

1. NFTとスマートコントラクトの核心概念を理解
2. MetaMaskをインストールし、Sepoliaテストネットに切り替え
3. Remix IDEで15行未満のNFTスマートコントラクトを作成
4. コントラクトをEthereumテストネットにデプロイ
5. 自分のNFTをミントし、Etherscanで確認
6. （オプション）IPFSで画像とメタデータを追加する方法を学習

全体のプロセスにローカル環境のインストールは不要、お金はかからず、ブラウザで完全に完了しました。これがブロックチェーン開発の魅力です：参入障壁はほとんどの人が想像するよりはるかに低いのです。

**応用方向：**

* **Hardhat / Foundryを使ったローカル開発**：コントラクトロジックが複雑になると、Remixでは不十分。HardhatとFoundryはプロフェッショナルなローカルフレームワークで、自動テスト、スクリプトベースのデプロイ、ガス最適化などを提供
* **ホワイトリストとミント制限の追加**：誰がミントできるか、ウォレットあたりの最大ミント数、ミント価格などのルールを制御
* **ミントフロントエンドの構築**：React + ethers.js / viemを使用して、ワンクリックWebミント可能な洗練されたミントページを構築
* **ERC1155マルチエディションNFTの探索**：ERC1155は1つのトークンIDで複数コピーを許可、ゲームアイテムやチケットに便利
* **メインネットへのデプロイ**：準備ができたら、Ethereumメインネット（またはPolygonやBaseなどのガス代が低いL2チェーン）にデプロイ

***最初のNFTはすでにオンチェーンです。ブロックチェーン世界への扉が開かれました。***

# 参考文献

* [OpenZeppelin ERC721 Docs](https://docs.openzeppelin.com/contracts/5.x/erc721)
* [Remix IDE Official Docs](https://remix-ide.readthedocs.io/)
* [MetaMask Official Docs](https://docs.metamask.io/)
* [Solidity Official Docs](https://docs.soliditylang.org/)
* [Sepolia Etherscan](https://sepolia.etherscan.io/)
* [Pinata IPFS Storage Service](https://pinata.cloud/)
* [ERC721 Standard Spec (EIP-721)](https://eips.ethereum.org/EIPS/eip-721)
