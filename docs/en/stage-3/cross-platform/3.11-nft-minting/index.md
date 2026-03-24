# How to Quickly Build and Mint an NFT: 10-Minute Starter Edition

# Chapter 1: What NFTs and Smart Contracts Are

In this tutorial, we will complete a full closed loop: write an NFT smart contract from scratch, deploy it to the Ethereum testnet, mint your own NFT, and view it on OpenSea. The whole process uses browser-based tools with no local environment setup required, and can be finished in 10 minutes.

For this tutorial, you should at least have:

- Chrome browser (with MetaMask wallet extension installed)
- A MetaMask wallet account
- A small amount of Sepolia testnet ETH (free to claim, shown below)

> **Zero cost, zero setup**: the entire process uses browser-based tools (Remix IDE), no Node.js / Hardhat installation needed; code uses OpenZeppelin official secure templates; after minting, you can view your NFT on OpenSea testnet.

## 1.1 What Is an NFT?

NFT (Non-Fungible Token) is a type of digital asset on blockchain. Unlike fungible tokens such as Bitcoin or Ether, every NFT is unique, like no two paintings in the world being exactly the same.

You can understand an NFT as a **"certificate of collection in the digital world."** It can represent:

* ownership of a digital artwork
* an event ticket
* a game item
* a learning certificate
* even a tweet

The core value of NFTs is: **they use blockchain technology to prove "this digital item belongs to you," and that proof is public, transparent, and tamper-resistant.**

<!-- ![placeholder: A concept diagram of NFTs: a digital artwork on the left, ownership record on blockchain on the right, connected by arrows](../../../../zh-cn/stage-3/cross-platform/3.11-nft-minting/images/image1.png) -->

## 1.2 What Is a Smart Contract?

A smart contract is a piece of code that runs on blockchain. You can think of it as an **"automatically executed contract"**. Once deployed on-chain, it runs automatically according to code logic, and no one can tamper with it.

NFTs are created and managed through smart contracts. When you "mint" an NFT, you are actually calling a function in the smart contract to write on-chain: "NFT #0 belongs to your wallet address."

We will use **Solidity** to write the contract. Do not worry. With ready-made templates from OpenZeppelin, you only need to write fewer than 15 lines of code.

## 1.3 What NFT Are We Minting?

We will mint a **"Vibe Coder Learning Certificate"** NFT to prove you completed this tutorial and learned blockchain development basics. This NFT will:

* have a unique token ID
* be recorded on Ethereum Sepolia testnet
* be viewable and displayable on OpenSea testnet
* (optional) include your custom image

Of course, you can change it to any theme you like: AI-generated artwork, event souvenir card, pixel avatar, and more. The NFT content is fully up to you.

## 1.4 Why Use a Testnet?

Ethereum has "mainnet" and "testnet":

| Comparison | Mainnet | Testnet (Sepolia) |
|------|----------------|------------------|
| ETH value | Real money | Free to claim, no real value |
| Deployment cost | Requires real gas fees | Completely free |
| Use case | Production release | Learning, testing, development |
| Functional difference | None | Same as mainnet |

Testnet and mainnet are functionally the same. The only difference is that testnet ETH has no real value. So you can safely learn and experiment on testnet without worrying about spending money.

## 1.5 Tutorial Roadmap

We will complete the flow in these steps:

1. **Prepare wallet and test ETH** (2 minutes): install MetaMask and claim free test ETH
2. **Write and deploy contract** (4 minutes): write NFT contract in Remix IDE and deploy to Sepolia
3. **Mint NFT and check result** (4 minutes): call contract to mint NFT and verify on OpenSea and Etherscan
4. **Advanced: add image to NFT** (optional): store image on IPFS to make NFT complete

# Chapter 2: Prepare Wallet and Test ETH (2 Minutes)

## 2.1 Install MetaMask Wallet

MetaMask is the most popular Ethereum wallet. It is a browser extension that lets you interact with blockchain apps.

1. Open Chrome and visit [MetaMask official site](https://metamask.io/)
2. Click **"Download"** and install the Chrome extension
3. After installation, click the MetaMask fox icon in the top-right corner
4. Choose **"Create a new wallet"** and set a password
5. **Important**: keep your recovery phrase (12 words) safe. Losing a test wallet is fine, but good habits matter

<!-- ![placeholder: MetaMask installation and wallet creation flow screenshots: install extension -> create wallet -> set password -> backup recovery phrase](../../../../zh-cn/stage-3/cross-platform/3.11-nft-minting/images/image2.png) -->

## 2.2 Switch to Sepolia Testnet

MetaMask connects to Ethereum mainnet by default. We need to switch to Sepolia testnet:

1. Click the network dropdown at the top of MetaMask (default: "Ethereum Mainnet")
2. Click **"Show test networks"**
3. Select **"Sepolia test network"**

If you do not see Sepolia, click **"Add network"** and add manually:

| Config Item | Value |
|-------|-----|
| Network Name | Sepolia test network |
| RPC URL | `https://rpc.sepolia.org` |
| Chain ID | 11155111 |
| Currency Symbol | SepoliaETH |
| Block Explorer | `https://sepolia.etherscan.io` |

<!-- ![placeholder: Screenshot of switching MetaMask to Sepolia testnet via network dropdown](../../../../zh-cn/stage-3/cross-platform/3.11-nft-minting/images/image3.png) -->

## 2.3 Claim Free Test ETH

Deploying contracts and minting NFTs requires gas fees. On testnet, gas is paid with test ETH, which is free.

Visit any faucet below and input your wallet address to claim free Sepolia ETH:

| Faucet | URL | Per-claim Amount | Login Required |
|--------|------|-----------|------------|
| QuickNode | `https://faucet.quicknode.com/ethereum/sepolia` | 0.1 ETH | Yes |
| Alchemy | `https://www.alchemy.com/faucets/ethereum-sepolia` | 0.1 ETH | Yes |
| Google Cloud | `https://cloud.google.com/application/web3/faucet/ethereum/sepolia` | 0.05 ETH | Yes (Google account) |

> **Tip**: 0.1 test ETH is enough for deploying a contract and minting dozens of NFTs. If one faucet fails, try another.

After claiming successfully, return to MetaMask and your balance should change from 0 to 0.1 ETH (it may take a few seconds).

<!-- ![placeholder: Faucet website screenshot showing wallet address input and claiming test ETH](../../../../zh-cn/stage-3/cross-platform/3.11-nft-minting/images/image4.png) -->

# Chapter 3: Write and Deploy NFT Smart Contract (4 Minutes)

## 3.1 Open Remix IDE

Remix is the official Ethereum-recommended online smart contract development environment. It runs fully in the browser and requires no installation.

Open: **https://remix.ethereum.org/**

You will see a VS Code-like interface: file explorer on the left, code editor in the middle, and compile/deploy panel on the right.

<!-- ![placeholder: Remix IDE home screenshot showing file explorer, code editor, and right-side panel](../../../../zh-cn/stage-3/cross-platform/3.11-nft-minting/images/image5.png) -->

## 3.2 Create Contract File

1. In the left file explorer, click the **"contracts"** folder
2. Click the **"+"** button above to create a new file
3. Name it **`MySimpleNFT.sol`**
4. Paste the code below:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// Import OpenZeppelin official secure ERC721 template
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

// Simplest NFT contract: name, symbol, mint function only
contract MySimpleNFT is ERC721 {
    uint256 private _tokenId;

    // Initialize collection name and symbol
    constructor() ERC721("VibeCoder", "VIBE") {}

    // Mint NFT: call once to mint one token to caller
    function mint() public {
        _safeMint(msg.sender, _tokenId);
        _tokenId++;
    }
}
```

**Code walkthrough (fewer than 15 lines, and each line is understandable):**

| Code | Meaning |
|------|------|
| `pragma solidity ^0.8.20` | Specify Solidity compiler version |
| `import "@openzeppelin/..."` | Import OpenZeppelin ERC721 standard implementation (security-audited template) |
| `contract MySimpleNFT is ERC721` | Create a contract inheriting ERC721 standard |
| `ERC721("VibeCoder", "VIBE")` | Set collection name "VibeCoder" and symbol "VIBE" |
| `_safeMint(msg.sender, _tokenId)` | Mint a new NFT to caller |
| `_tokenId++` | Increment token ID after each mint |

> **What is ERC721?** It is the NFT standard on Ethereum, defining basic NFT capabilities (transfer, owner query, etc.). OpenZeppelin provides a security-audited implementation, so we can inherit directly instead of building from scratch.

<!-- ![placeholder: Screenshot of contract code pasted in Remix IDE](../../../../zh-cn/stage-3/cross-platform/3.11-nft-minting/images/image6.png) -->

## 3.3 Compile the Contract

1. Click **"Solidity Compiler"** in the left panel (hammer icon)
2. Select compiler version **0.8.20** (or higher in 0.8.x)
3. Click **"Compile MySimpleNFT.sol"**
4. A green check ✅ means compilation succeeded

> If there is an error, check whether Solidity version matches and OpenZeppelin import path is correct. Remix automatically downloads OpenZeppelin dependencies from npm.

<!-- ![placeholder: Remix compile success screenshot with green check and selected compiler version](../../../../zh-cn/stage-3/cross-platform/3.11-nft-minting/images/image7.png) -->

## 3.4 Deploy Contract to Sepolia Testnet

1. Click **"Deploy & Run Transactions"** in the left panel (Ethereum icon)
2. Set **Environment** to **"Injected Provider - MetaMask"**
   - This auto-connects your MetaMask wallet
   - MetaMask will pop up a connection request, click **"Connect"**
3. Confirm network is **Sepolia (11155111)**
4. Select **MySimpleNFT** in Contract dropdown
5. Click **"Deploy"**
6. MetaMask pops up transaction confirmation, click **"Confirm"** (gas is very low; testnet is free)

After a few seconds, when deployment succeeds, the **"Deployed Contracts"** section below will show your contract address. **Copy and save this address**; you will need it later.

<!-- ![placeholder: Remix deployment screenshot showing environment selection, MetaMask confirmation, Deploy button, and deployed contract address](../../../../zh-cn/stage-3/cross-platform/3.11-nft-minting/images/image8.png) -->

# Chapter 4: Mint NFT and Verify Result (4 Minutes)

## 4.1 Mint Your First NFT

After successful deployment, in the **"Deployed Contracts"** section in Remix, you will see the contract interaction panel.

1. Expand the contract panel and find the **"mint"** button (orange)
2. Click **"mint"** directly (no input parameters required)
3. MetaMask pops up transaction confirmation, click **"Confirm"**
4. Wait a few seconds for completion

Congratulations! You just minted NFT #0, and it now belongs to your wallet address.

You can continue clicking "mint" to create more. Token IDs auto-increment each time (#1, #2, #3...).

<!-- ![placeholder: Screenshot of clicking mint in Remix and confirming transaction in MetaMask](../../../../zh-cn/stage-3/cross-platform/3.11-nft-minting/images/image9.png) -->

## 4.2 Verify Mint Result

**Method 1: Verify in Remix**

In the contract panel, find **"balanceOf"** (blue button), input your wallet address, and call it. If it returns `1` (or the number you minted), minting succeeded.

You can also call **"ownerOf"**, input `0` (token ID), and it returns your wallet address, proving NFT #0 belongs to you.

**Method 2: Verify on Etherscan (recommended)**

1. Open [Sepolia Etherscan](https://sepolia.etherscan.io/)
2. Paste your **contract address** into search
3. You will see the contract details page with all transaction records
4. Click **"Token Tracker"** to view all NFTs minted by your contract

On Etherscan, every mint transaction has complete records: who minted, when minted, and token ID. This is the charm of blockchain being "public, transparent, and tamper-resistant."

<!-- ![placeholder: Screenshot of viewing contract and NFT mint records on Sepolia Etherscan, including transaction list and Token Tracker](../../../../zh-cn/stage-3/cross-platform/3.11-nft-minting/images/image10.png) -->

# Chapter 5: Advanced - Add an Image to NFT (Optional)

The NFTs minted so far only have IDs, without image or description. To make NFTs complete, we need **IPFS (InterPlanetary File System)** to store images and metadata.

## 5.1 What Is IPFS?

IPFS is a decentralized file storage network. Unlike regular cloud storage, files on IPFS do not depend on one server, but are distributed across global nodes. This means:

* files are not lost if one server goes down
* file content is uniquely identified by hashes and cannot be tampered with
* it is ideal for storing NFT images and metadata

## 5.2 Upload Image to Pinata

[Pinata](https://pinata.cloud/) is the most popular IPFS storage service. The free tier provides 1GB storage, which is enough for us.

1. Visit https://pinata.cloud/ and register a free account
2. After login, click **"Upload"** -> **"File"**
3. Select the image you want as NFT artwork (AI-generated image is fine, or any image)
4. After upload succeeds, copy the **CID** (a string like `QmXyz...`)

Your image URI is: `ipfs://yourCID`

<!-- ![placeholder: Screenshot of image upload in Pinata, including upload button and resulting CID](../../../../zh-cn/stage-3/cross-platform/3.11-nft-minting/images/image11.png) -->

## 5.3 Create Metadata JSON

NFT metadata is a JSON file describing NFT name, description, and image URI. Create a `metadata.json`:

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

Upload `metadata.json` to Pinata too, and get a metadata CID.

## 5.4 Upgrade Contract to Support Images

To include images in NFTs, we need to slightly upgrade the contract by adding `tokenURI`. Go back to Remix and create a new file `MyNFTWithImage.sol`:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract MyNFTWithImage is ERC721, ERC721URIStorage {
    uint256 private _tokenId;

    constructor() ERC721("VibeCoder", "VIBE") {}

    // Pass metadata URI when minting
    function mint(string memory uri) public {
        _safeMint(msg.sender, _tokenId);
        _setTokenURI(_tokenId, uri);
        _tokenId++;
    }

    // Overrides required by Solidity
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

After deployment, call `mint` and pass your metadata URI (for example `ipfs://QmAbc.../metadata.json`). Then your minted NFT will include image and description.

<!-- ![placeholder: Screenshot of NFT details with image shown on Etherscan](../../../../zh-cn/stage-3/cross-platform/3.11-nft-minting/images/image12.png) -->

# Chapter 6: Final Notes

Congratulations! You have completed a full NFT development loop from scratch. Let's recap:

1. Understood core concepts of NFTs and smart contracts
2. Installed MetaMask and switched to Sepolia testnet
3. Wrote an NFT smart contract with fewer than 15 lines in Remix IDE
4. Deployed the contract to Ethereum testnet
5. Minted your own NFT and verified it on Etherscan
6. (Optional) Learned how to add image and metadata with IPFS

The whole process required no local environment installation, cost no money, and was completed fully in the browser. This is the appeal of blockchain development: the barrier is much lower than most people expect.

**Advanced directions:**

* **Use Hardhat / Foundry for local development**: when contract logic becomes complex, Remix is not enough. Hardhat and Foundry are professional local frameworks with automated testing, script-based deployment, gas optimization, and more
* **Add whitelist and mint limits**: control who can mint, max mints per wallet, mint price, and similar rules
* **Build a mint frontend**: use React + ethers.js / viem to build a polished mint page for one-click web minting
* **Explore ERC1155 multi-edition NFTs**: ERC1155 allows multiple copies under one token ID, useful for game items and tickets
* **Deploy to mainnet**: when ready, deploy to Ethereum mainnet (or L2 chains like Polygon or Base with lower gas fees)

***Your first NFT is already on-chain. The door to the blockchain world is now open.***

# References

* [OpenZeppelin ERC721 Docs](https://docs.openzeppelin.com/contracts/5.x/erc721)
* [Remix IDE Official Docs](https://remix-ide.readthedocs.io/)
* [MetaMask Official Docs](https://docs.metamask.io/)
* [Solidity Official Docs](https://docs.soliditylang.org/)
* [Sepolia Etherscan](https://sepolia.etherscan.io/)
* [Pinata IPFS Storage Service](https://pinata.cloud/)
* [ERC721 Standard Spec (EIP-721)](https://eips.ethereum.org/EIPS/eip-721)
