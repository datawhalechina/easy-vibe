# Git 和 GitHub 工作流

在之前的課程中，我們學習瞭如何使用基於 Web 的 vibe coding 工具編寫程式碼。每次對話都會創建一個新版本的程式碼。但是，讓我們思考一個問題：如果我們想恢復到之前的修改，有沒有方便的方法？有沒有一種工具可以記錄我們在不同階段的程式碼，使我們能夠隨時在不同版本之間切換和修改？

為了滿足這一需求，版本控制軟體應運而生。在這篇文章中，我們將介紹最著名的版本控制程序——Git——以及最好的程式碼託管平臺——GitHub。我們將學習如何使用 Git 進行程式碼管理，如何從 GitHub 獲取他人的程式碼，如何上傳我們自己的程式碼，以及如何與他人合作進行大型項目。

無論是個人項目的版本跟蹤，團隊協作中的程式碼同步，還是為開源社區做貢獻，Git 和 GitHub 都是現代開發者的必備工具。通過掌握它們，你將能夠更高效地管理程式碼，根據需要創建檢查點，在程式碼的不同階段之間自由切換，並輕鬆處理從單個文件更改到開發大型項目的所有事務——使每一次程式碼迭代都可控且可追溯。

> 💡 **前置知識**
> 
> 在學習 Git 之前，建議你先了解以下概念：
> - [什麼是終端/命令行](/zh-tw/appendix/2-development-tools/command-line-shell) - 學習如何使用命令行與計算機交互
> - [什麼是 Git](/zh-tw/appendix/2-development-tools/git-version-control) - 瞭解 Git 版本控制系統的核心概念
>
> 本文將重點介紹 GitHub 工作流和實際操作，上述基礎知識請參考附錄鏈接。

# Git 快速開始

在開始使用 Git 之前，請確保你已經閱讀了附錄中關於[命令行](/zh-tw/appendix/2-development-tools/command-line-shell)和[Git 基礎](/zh-tw/appendix/2-development-tools/git-version-control)的內容。本文將假設你已經具備這些基礎知識，並直接講解如何安裝配置 Git 以及使用 GitHub 進行協作。

## 如何安裝 Git

我們將演示在不同計算機操作系統上安裝 Git 的三種方法。請根據你的系統版本按照說明進行操作：

### Windows

1. 前往 [Git 官方下載頁面](https://git-scm.com/download/win) 並下載適合你係統的安裝程序：[安裝包](https://github.com/git-for-windows/git/releases/download/v2.51.0.windows.1/Git-2.51.0-64-bit.exe)。默認情況下，推薦使用 x64 安裝程序。
2. 雙擊安裝程序並按照安裝嚮導說明進行操作：
   ![](/zh-cn/stage-2/backend/git-workflow/images/image5.png)
   1. 建議保持默認選項。如果你需要自定義，請注意以下幾點：（在大多數情況下，你可以一直點擊"Next"）
      - 選擇 Git 使用的默認編輯器：選擇你喜歡的編輯器（如 VS Code）。你可以默認選擇第一個選項，即 Vim（一個文本編輯器），或選擇"Visual Studio Code as Git's default editor"選項（需要預先安裝 VS Code）。你可以保持默認選擇並點擊"Next"繼續。
        ![](/zh-cn/stage-2/backend/git-workflow/images/image6.png)
      - 選擇如何使用 Git：這三個選項控制 Git 在系統中的可訪問性。建議選擇選項 2（"from command line and 3rd-party software"）——它將基本的 Git 工具添加到 PATH 中，讓你可以在 Git Bash、命令提示符、PowerShell 和 IDE 中使用 Git，而不會使系統混亂。
        ![](/zh-cn/stage-2/backend/git-workflow/images/image7.png)

3. 安裝後，在桌面上右鍵單擊。如果在菜單中看到"Git Bash Here"，則安裝成功。

![](/zh-cn/stage-2/backend/git-workflow/images/image8.png)

### MacOS

對於 macOS，你可以首先在終端中輸入 `git --version` 來檢查是否已經安裝了 Git。如果沒有，系統會提示你安裝——只需按照說明完成安裝即可。

1. 方法 1：通過 Homebrew 安裝
   如果你安裝了 [Homebrew](https://brew.sh/)（Mac 包管理器），請打開終端並輸入
   ```bash
   brew install git
   ```
2. 方法 2：（推薦）通過 Xcode 安裝： https://developer.apple.com/xcode/ ，Xcode 內置了 Git。安裝後，只需按照說明繼續操作。

### Linux

大多數 Linux 發行版可以通過其包管理器安裝 Git：

- Ubuntu/Debian:

```bash
sudo apt update
sudo apt install git
```

- CentOS/RHEL:

```bash
sudo yum install git
```

- 驗證安裝：在終端中輸入 git --version。如果顯示版本號，則安裝成功。

## Git 初始化

安裝 Git 後，你首先需要配置你的用戶資訊——這是使用 Git 進行版本控制的基本步驟。在終端中執行以下命令（將括號中的內容替換為你自己的資訊）：

```bash
# 設置全局用戶名（將顯示在提交記錄中）
git config --global user.name "Your Name"

# 設置全局郵箱（建議使用在 GitHub/GitLab 等平臺上註冊的郵箱）
git config --global user.email "your.email@example.com"
```

Git 會將此資訊嵌入到每個提交記錄中，作為每次修改的"作者資訊"。查看版本歷史記錄（例如，使用 git log）時，你可以清楚地看到誰修改了每一行程式碼，便於追溯責任和溝通。在協作項目中，統一的身份資訊使團隊成員能夠快速識別誰做了哪些更改，從而提高協作效率（例如通過提交記錄找到相關開發人員討論問題）。

你可以通過在命令行中輸入 `git config --list` 來查看當前的 Git 配置資訊，以確認設置成功。

# 什麼是 GitHub

GitHub 是一個基於 Git 的程式碼託管平臺。它不僅為 Git 倉庫提供遠程存儲，還包括協作工具（如 Issues、Pull Requests、Projects），使開發者更容易分享程式碼和協作。簡而言之，Git 是一個本地版本控制工具，而 GitHub 是一個遠程"程式碼倉庫雲盤 + 協作社區"。

GitHub 不僅是世界上最大的程式碼託管平臺，也是全球最活躍、最具影響力的開源社區。這裡"開源"的核心思想是任何人都可以下載並運行軟體的源程式碼。這種模式允許世界各地的人們檢查彼此的程式碼並進行修改，或基於此創建新項目。例如，你可以在 GitHub 上找到各種學習教程以及用於訓練 GPT 模型的框架（如 PyTorch）的完整源程式碼。每天，無數人在全球範圍內協作審查和改進程式碼。

![](/zh-cn/stage-2/backend/git-workflow/images/image9.webp)

許多大公司在 GitHub 上開源他們的程序或教程，以獲得行業競爭優勢——這也可以看作是一種廣告形式。在 GitHub 社區中，項目獲得的"星標 (stars)"數量是衡量其價值的主要指標；項目或組織擁有的星標越多，其可信度和影響力就越大。

![](/zh-cn/stage-2/backend/git-workflow/images/image10.png)

在我們的課程中，支持資源和作業也將上傳到專用的 GitHub 倉庫。通過上傳作業的過程，你將逐漸熟悉並掌握 GitHub 的使用，為未來應用程序開發中的版本控制打下堅實的基礎。

## 註冊 GitHub 賬號

1. 訪問 [GitHub 官網](https://github.com/) 並點擊右上角的"Sign up"。
   ![](/zh-cn/stage-2/backend/git-workflow/images/image11.webp)
2. 輸入你的電子郵件地址（建議使用常用郵箱，因為驗證和通知將發送到那裡），設置密碼（必須包含字母、數字和特殊字符）。
3. 完成人工驗證，按照提示驗證郵箱，你的賬號就創建好了。

## 在 GitHub 上創建你的第一個倉庫

接下來，我們將創建第一個存儲文件夾，也稱為倉庫或"repo"。

![](/zh-cn/stage-2/backend/git-workflow/images/image12.png)![](/zh-cn/stage-2/backend/git-workflow/images/image13.png)

![](/zh-cn/stage-2/backend/git-workflow/images/image14.png)

1. Repository name：向他人顯示的倉庫名稱。
2. Description：倉庫的詳細描述。
3. Choose visibility：對於個人倉庫，如果設置為 private，只有你和特別邀請的人可以看到。如果設置為 public，所有人都可以看到。
   對於組織內的倉庫，如果是 Private，只有組織內的人可以看到。
   如果是 Public，組織外的人也可以看到。
4. README：通常的慣例是每個倉庫都應該有一個 README 文件。你可以把它看作是倉庫的完整介紹，包括使用說明、文件列表和操作方法。
5. Add .gitignore and license：
   1. .gitignore 文件告訴 Git 在上傳到 GitHub 時忽略某些文件夾或文件，因此它們不會被跟蹤或添加到暫存區。這對於臨時測試文件、依賴包或大文件很有用。一旦指定，這些文件將不再被跟蹤。
   2. license 指的是你選擇的開源許可證類型。不同的許可證詳細規定了他人是否可以將你的程式碼用於商業目的，幷包含其他條款和條件。

建議勾選"Add README"，將倉庫可見性設置為"Private"，並根據自己的喜好填寫倉庫名稱和描述，然後點擊"Create repository"完成創建第一個遠程倉庫。

![](/zh-cn/stage-2/backend/git-workflow/images/image15.png)

之後，你將擁有一個沒有任何額外文件的乾淨倉庫。接下來你可以開始上傳文件了。

![](/zh-cn/stage-2/backend/git-workflow/images/image16.png)

獲取倉庫的命令是 `git clone`，但它需要倉庫地址。你可以通過點擊綠色的"Code"按鈕找到倉庫地址，你會看到 HTTPS 和 SSH 選項。通常，你可以使用這兩種方法中的任何一種將倉庫下載到本地機器（只有這樣你才能修改和上傳文件）。

![](/zh-cn/stage-2/backend/git-workflow/images/image17.png)

一般來說，通過 HTTP 克隆的倉庫適合臨時下載和測試他人的倉庫，但不建議用於自己的開發。為了更好的學習體驗，你應該先設置 SSH 認證。

## 綁定本地 SSH

在 GitHub 中，"SSH 協議綁定"本質上意味著將你本地設備的 SSH 公鑰與你的 GitHub 賬號關聯，允許 GitHub 通過 SSH 協議識別你的設備。這使你能夠安全地操作遠程倉庫，而無需密碼（如 clone、push 或 pull 程式碼）。

簡單來說：這就像給你的設備一張"GitHub 專屬門禁卡"。綁定後，當你的設備通過 SSH 協議訪問 GitHub 倉庫時，GitHub 會驗證這張"門禁卡"（你的 SSH 公鑰）。一旦確認為你的授權設備，你就可以直接操作——不需要每次都輸入賬號密碼。

> 💡 什麼是 SSH

### 為什麼需要 SSH 協議綁定？

GitHub 支持兩種主要的倉庫操作協議：HTTPS 協議和 SSH 協議：

- HTTPS 協議：每次操作（如 push）都需要輸入 GitHub 賬號密碼（或個人訪問令牌 PAT）。驗證過程繁瑣，且存在密碼洩露風險。
- SSH 協議：身份驗證通過"密鑰對"完成，因此不需要重複輸入密碼，且加密傳輸更加安全。

"SSH 協議綁定"是啟用 GitHub SSH 認證的前提步驟——只有將本地 SSH 公鑰"綁定"到 GitHub 賬號後，GitHub 才能識別你的設備並允許對倉庫進行 SSH 操作。

### "綁定"的核心邏輯：SSH 密鑰對的作用

SSH 認證依賴於密鑰對（公鑰 + 私鑰），它們是匹配的加密文件。生成後，你需要將"公鑰"提供給 GitHub（"綁定"），而"私鑰"留在本地設備上：

1. 私鑰：存儲在本地設備（如電腦）的指定目錄中（通常是 ~/.ssh/），充當"你的專屬鑰匙"，絕不能與任何人分享。
2. 公鑰：這是一把可以公開分享的"鎖"——你需要將其複製到 GitHub 賬號的"SSH keys list"中（"綁定"操作）。

當你通過 SSH 操作 GitHub 倉庫時（例如 git push git@github.com:xxx/xxx.git）：

- 你的本地設備使用私鑰加密"操作請求"併發送給 GitHub；
- 收到請求後，GitHub 嘗試使用你之前綁定的公鑰進行解密；
- 如果解密成功，你的設備被確認為已授權，操作被允許；否則，訪問被拒絕。

### "綁定"的具體步驟（核心流程）

一旦你理解了原理，實際操作就很簡單——核心是"生成密鑰對 → 上傳公鑰到 GitHub"：

1. 本地生成 SSH 密鑰對
   1. 使用 Trae 獲取公鑰（推薦）
      提示詞：`Help me create the SSH key needed for GitHub login. My email is your_email@gmail.com , Please return the public key for me to copy`

   ![](/zh-cn/stage-2/backend/git-workflow/images/image18.webp)

   輸入提示詞後，你還需要在左側終端按 Enter 鍵，否則命令會一直等待而不執行。由於 Trae 無法幫你執行任何條件判斷，我們只需要一直按 Enter 即可。

   最後，你會看到右側的 Trae 返回了它讀取的公鑰。你只需複製它並準備在下一步中粘貼。

   ![](/zh-cn/stage-2/backend/git-workflow/images/image19.webp) 2. 手動獲取公鑰
   打開你的本地終端（在 Windows 上使用 Git Bash 或 PowerShell；在 macOS/Linux 上使用終端），輸入以下命令（將 your_email@example.com 替換為你註冊 GitHub 賬號時使用的郵箱）：

   ```bash
   ssh-keygen -t ed25519 -C "your_email@example.com"
   ```

   1. 按 Enter 接受默認值（默認文件路徑，無密碼，或根據需要設置密碼）。這將在 ~/.ssh/ 目錄中生成兩個文件：
      - id_ed25519：私鑰（本地保存，**絕不分享**）；
      - id_ed25519.pub：公鑰（需要上傳到 GitHub）。

2. 將公鑰"綁定"到你的 GitHub 賬號

這是核心綁定步驟——將本地公鑰添加到 GitHub 賬號的"SSH keys list"中：

1. 複製公鑰內容：
   1. Trae：
   2. Windows：用記事本打開 C:\Users\<your>\.ssh\id_ed25519.pub 並複製其所有內容；
   3. macOS/Linux：在終端運行 cat ~/.ssh/id_ed25519.pub 並複製所有輸出（從開頭的 SSH-ed25519 到結尾的郵箱）。
2. 登錄 GitHub 並進入"SSH Key Management"頁面：
   1. 點擊右上角頭像 → Settings → 左側菜單 SSH and GPG keys → 點擊 New SSH key。
      ![](/zh-cn/stage-2/backend/git-workflow/images/image20.png)![](/zh-cn/stage-2/backend/git-workflow/images/image21.png)
   2. 輸入任何標題（例如，your local computer's SSH），然後將你剛剛獲取的 SSH 公鑰粘貼到這裡。

![](/zh-cn/stage-2/backend/git-workflow/images/image22.png)

![](/zh-cn/stage-2/backend/git-workflow/images/image23.png)

3. 驗證綁定是否成功

在終端中輸入以下命令（**Trae 也可以做以下操作**）來測試 GitHub 是否能識別你的設備：

```bash
ssh -T git@github.com
```

- 如果你看到類似 Hi [your GitHub username]! You've successfully authenticated... 的內容，說明你已成功綁定密鑰；
- 如果遇到錯誤，通常是因為公鑰複製不完整、私鑰權限過高（你的本地 ~/.ssh/ 目錄應僅由你讀寫）等。根據需要檢查這些問題。

### 重要注意事項

如果你有多個設備（如筆記本電腦和臺式機），你需要為每個設備生成單獨的 SSH 密鑰對，並將每個公鑰綁定到同一個 GitHub 賬號——每個設備都有自己的"門禁卡"。

切勿分享你的私鑰（不要上傳到 GitHub 或與他人分享），否則有人可能會冒充你操作你的倉庫。如果私鑰洩露，請立即從 GitHub 刪除相應的公鑰並生成新的密鑰對。

綁定 SSH 後，使用 SSH 格式的倉庫地址（例如 git@github.com:username/repository.git）進行操作，而不是 HTTPS 格式（例如 https://github.com/username/repository.git）。如果你之前用 HTTPS 克隆了倉庫，可以用 git remote set-url origin `<new>` 切換協議。

# 使用 Trae 進行 GitHub 操作

我們已經解釋了什麼是 Git，什麼是 GitHub，什麼是 SSH，以及如何配置它。現在你可以自由使用 Trae 執行 Git 操作。首先，讓我們學習如何將遠程倉庫克隆到本地機器。

## Git clone : 下載現有倉庫

你可以直接告訴它你想克隆的倉庫地址

![](/zh-cn/stage-2/backend/git-workflow/images/image24.webp)

## Git pull : 從遠程倉庫獲取更新

每次更新倉庫之前，由於它可能由多人維護，你需要先拉取最新的更改。之後，你可以修改並推送文件。

**記得包含文件夾名稱及其相對或絕對路徑，以避免推送到錯誤的倉庫。**

prompt:`Help me pull this repository AIID-TEST in ./AIID-TEST.`

## Git commit & Git push : 暫存更新並推送到 GitHub

一切準備就緒後，你可以嘗試修改本地文件，在文件夾中添加或刪除項目。然後，讓 Trae 檢測更改並幫你推送到 GitHub。

prompt:`I finished. Commit and push to the repository AIID-TEST in ./AIID-TEST.`

![](/zh-cn/stage-2/backend/git-workflow/images/image25.webp)

推送成功。現在你可以在 GitHub 上看到更新的內容了。

# 參考資料

- Pro Git book https://git-scm.com/book/en/v2
- GitHub Docs https://docs.github.com/en
