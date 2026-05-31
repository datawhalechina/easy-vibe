# Claude Code MCP完全ガイド

## Claude Code MCPとは

**Claude Code**はAnthropicの公式AIコマンドラインツールで、**MCP（Model Context Protocol）**はClaude Codeを外部ツールやサービスに接続するプロトコルです。

簡単に言えば、MCPはClaude Codeをローカルファイルの読み書きしかできないAIアシスタントから、GitHub、データベース、API、クラウドサービスにアクセスできるスーパーアシスタントに変えます。

## なぜClaude CodeでMCPを使うのか

### MCPなしのClaude Code

```text
できること:
✓ ローカルファイルの読み取り
✓ コードの編集
✓ コマンドの実行
✓ Bashツールの使用

できないこと:
✗ GitHub Issuesの閲覧
✗ クラウドデータベースへのアクセス
✗ 外部APIの呼び出し
✗ リアルタイム天気の取得
```

### MCPありのClaude Code

```text
できること:
✓ すべての元の機能
✓ GitHub IssuesとPRの閲覧/作成
✓ SQLiteとPostgreSQLデータベースのクエリ
✓ NotionやSlackなどの外部サービスへのアクセス
✓ リアルタイム天気とマップデータの取得
✓ ブラウザ自動化
✓ ...その他多数
```

## クイックスタート

### ステップ1：設定ファイルの場所を理解する

Claude CodeのMCP設定ファイルは以下の場所にあります：

| レベル | 設定ファイルパス | スコープ |
|-----|-------------|----------|
| **ユーザーレベル** | `~/.claude.json` | すべてのプロジェクト |
| **プロジェクトレベル** | `.claude/mcp.json` | 現在のプロジェクト |

まず**プロジェクトレベルの設定**を使用することを推奨。これにより、異なるプロジェクトで異なるMCPサービスを使用可能。

### ステップ2：自然言語でMCPサーバーを追加

Claude Codeでは、設定ファイルを手動で編集したりコマンドを覚えたりする必要はありません。自然言語で希望を記述できます：

```text
あなた：GitHub MCPサーバーを追加して。トークンはghp_xxxです

Claude：GitHub MCPサーバーを設定します...

[.claude/mcp.jsonを自動更新]
```

```text
あなた：SQLiteデータベースサーバーを追加して。データベースファイルは./data/app.dbにあります

Claude：SQLite MCPサーバーを設定します...
```

```text
あなた：HTTPタイプのMCPサーバーを追加して。アドレスはhttps://api.example.com/mcpです

Claude：リモートMCPサーバーを追加します...
```

### ステップ3：設定の確認

Claude Codeに直接尋ねる：

```text
あなた：現在どのMCPサーバーが利用可能？

Claude：現在設定されているMCPサーバー：
• github - GitHub統合
• sqlite - SQLiteデータベース
• filesystem - ファイルシステムアクセス
```

または診断コマンドを使用：

```text
/doctor
```

### ステップ4：使い始める

設定が成功したら、自然言語で直接MCP機能を呼び出せます：

```text
あなた：GitHubでIssueを作成して

Claude：GitHub Issueの作成をお手伝いします。以下を教えてください：
- リポジトリアドレス（例：owner/repo）
- Issueタイトル
- Issueの説明
```

## Claude Codeでの自然言語管理

### MCPサーバーの表示と管理

すべて自然言語でClaude Codeとやり取りできます：

```text
あなた：設定されているすべてのMCPサーバーをリストして

あなた：MCPサーバーの接続状態を確認して

あなた：notionという名前のMCPサーバーを削除して

あなた：githubサーバーのトークンを更新して
```

### 問題の診断

問題が発生した場合：

```text
あなた：MCP接続の問題を確認して

Claude：[自動的に診断を実行し、設定ファイルを分析し、サーバーステータスを確認]
```

## 設定方法の詳細

### ユーザーレベル設定、グローバル

`~/.claude.json`を編集：

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/Users/yourname/Documents"]
    },
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "your-token"
      }
    }
  }
}
```

### プロジェクトレベル設定、推奨

プロジェクトルートの`.claude/mcp.json`を編集：

```json
{
  "mcpServers": {
    "project-db": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-sqlite", "--db-path", "./data/app.db"]
    }
  }
}
```

**プロジェクトレベル設定の利点：**

- チームメンバーがGitにコミットすることで設定を共有可能
- 異なるプロジェクトで異なるMCPサービスを使用可能
- 設定がより柔軟で、グローバル設定を汚染しない

### トランスポートモード

Claude Codeは3つのトランスポートモードをサポート：

#### STDIO、ローカルプロセス

```json
{
  "mcpServers": {
    "local-tool": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/path"]
    }
  }
}
```

#### HTTP、リモートサービス

```json
{
  "mcpServers": {
    "remote-api": {
      "url": "https://api.example.com/mcp",
      "transport": "http",
      "headers": {
        "Authorization": "Bearer your-token"
      }
    }
  }
}
```

#### SSE、サーバー送信イベント

```json
{
  "mcpServers": {
    "streaming": {
      "url": "https://api.example.com/sse",
      "transport": "sse"
    }
  }
}
```

## 実践例

### 例1：GitHubワークフローの自動化

```text
あなた：現在の変更をGitHubにプッシュして、「新機能を追加」というタイトルのPRを作成して

Claude：
1. 現在のgitステータスを確認...
2. 新しいブランチfeature/new-featureを作成...
3. 変更をコミット...
4. リモートにプッシュ...
5. github_create_pull_requestを呼び出してPRを作成...
6. PRが作成されました：https://github.com/owner/repo/pull/123
```

### 例2：データベースクエリ

```text
あなた：データベースで最近登録された上位10人のユーザーをクエリして

Claude：
1. SQLiteデータベースに接続...
2. クエリを実行：SELECT * FROM users ORDER BY created_at DESC LIMIT 10
3. 結果を返す：
   - 田中太郎 (tanaka@example.com) - 2025-02-28
   - 鈴木花子 (suzuki@example.com) - 2025-02-27
   ...
```

### 例3：Webページのスクリーンショット分析

```text
あなた：https://example.comを開いて、スクリーンショットを撮り、ページデザインを分析して

Claude：
1. ブラウザを起動...
2. https://example.comに移動...
3. スクリーンショットをキャプチャ...
4. [スクリーンショットを返す]
5. ページデザインの分析：
   - レイアウトは最大幅1200pxのセンターデザインを使用
   - メインカラーは青（#3b82f6）
   - ナビゲーションバーは上部に固定
   ...
```

### 例4：Notionとの統合

```text
あなた：今書いたメモをNotionに保存して

Claude：
1. Notion MCPサーバーを使用...
2. 新しいページを作成...
3. 保存完了：https://notion.so/page/xxx
```

## デバッグのヒント

### 自然言語で診断

問題が発生したら、Claude Codeに直接伝えてください：

```text
あなた：MCPサーバーに接続できません。確認して

あなた：GitHub MCPツールの呼び出しが失敗しました。原因は何ですか？

あなた：sqliteサーバーがずっと「接続中」と表示されるのはなぜ？
```

Claude Codeが自動的に：

1. 設定ファイルのフォーマットを確認
2. 環境変数を検証
3. サーバー接続をテスト
4. 具体的な修正提案を提供

### 一般的な問題のトラブルシューティング

| 問題 | 考えられる原因 | 解決策 |
|-----|---------|----------|
| サーバーが接続されない | 設定ファイルのフォーマットエラー | JSON構文を確認 |
| ツールを呼び出せない | 権限不足 | 環境変数を確認 |
| 接続タイムアウト | ネットワーク問題 | URLまたはネットワークを確認 |
| プロセスがクラッシュ | サーバーコードのバグ | サーバーログを確認 |

### 手動診断コマンド

```text
/doctor
```

出力例：

```text
System Diagnostic Report:
===============

Claude Code: v2.5.0 ✓
Node.js: v20.0.0 ✓

MCP server status:
• github: ✓ Connected (12 tools)
• sqlite: ✗ Connection failed - Database file not found
• puppeteer: ✓ Connected (8 tools)

Suggestions:
1. sqliteのデータベースパスが正しいか確認
2. .claude/mcp.jsonのフォーマットが正しいことを確認
```

## ベストプラクティス

### 1. プロジェクトレベル設定を優先

**なぜプロジェクトレベル設定を推奨するのか**

異なるプロジェクトは異なるMCPサービスを必要とすることが多い。例えば、フロントエンドプロジェクトはブラウザテストツールが必要かもしれず、バックエンドプロジェクトはデータベース接続が必要かもしれない。プロジェクトレベル設定により、各プロジェクトが専用のMCPサーバーセットを持てるようになり、1つの大きなグローバル設定の混乱を避けられる。

さらに重要なのは、プロジェクトレベル設定はGitにコミットできること。チームメンバーがプロジェクトをクローンした後、すべてを再設定することなく同じMCPサービスを直接使用可能。

```text
プロジェクトA、フロントエンドプロジェクト -> .claude/mcp.jsonにブラウザテストMCPを含む
プロジェクトB、バックエンドプロジェクト -> .claude/mcp.jsonにデータベースMCPを含む
```

### 2. 機密情報は環境変数に保存

**設定ファイルにシークレットをハードコードしないこと。**

設定ファイルが誤ってGitにコミットされ、キーが漏洩する可能性がある。正しいアプローチは、機密値を環境変数に保存し、設定ファイルからは変数名のみを参照すること。これにより、設定ファイルが公開されても、実際のシークレットは隠されたまま。

```json
{
  "env": {
    "GITHUB_TOKEN": "$GITHUB_TOKEN",
    "GITHUB_TOKEN": "ghp_abc123"
  }
}
```

最初の形式は良好（環境変数から読み取るため）。2番目の形式は不適切（シークレットを直接ハードコードしているため）。

### 3. バージョンを固定する

**なぜバージョンを固定する必要があるのか**

デフォルトでは、`npx -y`は常にMCPサーバーの最新バージョンを使用します。これにより問題が発生する可能性がある：新しいバージョンが破壊的変更を導入したり、パッケージが突然削除またはリネームされる可能性がある。

パッケージ名に`@version`を付加することで、検証済みのバージョンが常に使用されるようになり、自動アップグレードによる驚きを減らせる。

```json
{
  "command": "npx",
  "args": ["-y", "@modelcontextprotocol/server-github@1.2.3"]
}
```

### 4. MCP設定をドキュメント化する

**チームメイトがMCP設定をすぐに理解できるように**

プロジェクトに複数のMCPサーバーが含まれる場合、新しいチームメンバーは各サーバーの目的や必要な設定を理解できないかもしれない。`.claude/`ディレクトリに`README.md`を作成し、各サーバーの目的、必要な設定、認証情報の取得方法を説明することで、コミュニケーションコストを大幅に削減できる。

プロジェクトに`.claude/README.md`を作成：

```markdown
# MCP設定メモ

このプロジェクトで使用されるMCPサーバー：

## github
GitHub自動化に使用。GITHUB_TOKENが必要。

## sqlite
./data/app.dbに接続してデータの照会と変更を行う。

## puppeteer
E2Eテストに使用。
```

## Claude Code vs Claude Desktop

| 機能 | Claude Code | Claude Desktop |
|-----|-------------|----------------|
| **設定ファイル** | `~/.claude.json`または`.claude/mcp.json` | `claude_desktop_config.json` |
| **プロジェクトレベル設定** | ✓ サポート | ✗ 非サポート |
| **自然言語管理** | ✓ サポート | ✗ 手動編集が必要 |
| **診断** | ✓ `/doctor` | ✗ なし |
| **ホットリロード** | ✓ 自動 | ✗ アプリの再起動が必要 |
| **用途** | 開発ワークフロー、CI/CD | 日常使用、オフィスタスク |

## 一般的なMCPサーバー

> :bulb: 完全なMCPサーバーリストについては、付録を参照：[MCPサーバーディレクトリ](/zh-cn/appendix/mcp-servers/)

### GitHubサーバー

**機能：** Issues、PR、リポジトリ管理

```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "your-token"
      }
    }
  }
}
```

**トークンの取得：** https://github.com/settings/tokens

### SQLiteサーバー

**機能：** SQLiteデータベースの照会と管理

```json
{
  "mcpServers": {
    "sqlite": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-sqlite", "--db-path", "./data/database.db"]
    }
  }
}
```

### ファイルシステムサーバー

**機能：** 指定ディレクトリ内のファイルへのアクセス

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/Users/yourname/Documents"]
    }
  }
}
```

### Puppeteerブラウザ自動化

**機能：** ブラウザ制御、スクリーンショット、自動テスト

```json
{
  "mcpServers": {
    "puppeteer": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-puppeteer"]
    }
  }
}
```

### Brave検索サーバー

**機能：** Web検索

```json
{
  "mcpServers": {
    "brave-search": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-brave-search"],
      "env": {
        "BRAVE_API_KEY": "your-brave-api-key"
      }
    }
  }
}
```

## 参考リソース

### 公式ドキュメント

- [Claude Code公式ドキュメント - MCP](https://docs.anthropic.com/zh-CN/docs/claude-code/mcp)
- [MCP公式サイト](https://modelcontextprotocol.io/)
- [MCP仕様ドキュメント](https://modelcontextprotocol.io/specification/)
- [MCP GitHubリポジトリ](https://github.com/modelcontextprotocol)

### 公式サーバー

- [@modelcontextprotocol/server-github](https://github.com/modelcontextprotocol/servers/tree/main/src/github) - GitHub統合
- [@modelcontextprotocol/server-sqlite](https://github.com/modelcontextprotocol/servers/tree/main/src/sqlite) - SQLiteデータベース
- [@modelcontextprotocol/server-postgres](https://github.com/modelcontextprotocol/servers/tree/main/src/postgres) - PostgreSQLデータベース
- [@modelcontextprotocol/server-filesystem](https://github.com/modelcontextprotocol/servers/tree/main/src/filesystem) - ファイルシステムアクセス
- [@modelcontextprotocol/server-puppeteer](https://github.com/modelcontextprotocol/servers/tree/main/src/puppeteer) - ブラウザ自動化
- [@modelcontextprotocol/server-fetch](https://github.com/modelcontextprotocol/servers/tree/main/src/fetch) - Webフェッチ
- [@modelcontextprotocol/server-brave-search](https://github.com/modelcontextprotocol/servers/tree/main/src/brave-search) - Brave検索
- [@modelcontextprotocol/server-git](https://github.com/modelcontextprotocol/servers/tree/main/src/git) - Git操作

### チュートリアル記事

- [MCPの原理と実践を徹底解説](https://view.inews.qq.com/a/20250414A023WV00)
- [MCP（Model Context Protocol）のアーキテクチャと動作原理](https://m.toutiao.com/w/1826385835060307/)
- [2025最新大型モデルチュートリアル：MCPプロトコルの入門からマスターまで](https://m.blog.csdn.net/weixin_45653328/article/details/150916706)
- [ゼロからMCPを学ぶ（8）- MCPサーバーを構築する](https://juejin.cn/post/7582510291667419187)

### 設定ガイド

- [Claude Codeベストプラクティス](https://www.anthropic.com/engineering/claude-code-best-practices)
- [Claude Code完全設定ガイド](https://juejin.cn/post/7576838552472043563)

### 開発チュートリアル

- [初心者向けMCPサーバー実践ガイド：TypeScriptとPython両対応](https://m.blog.csdn.net/ztt123654/article/details/150844207)
- [究極のMCPサーバー構築ガイド：TypeScriptとPython完全チュートリアル](https://m.blog.csdn.net/gitblog_00703/article/details/154862128)
- [TypeScriptで最もシンプルなMCPサーバーを構築](https://m.blog.csdn.net/weixin_45653525/article/details/148433757)
- [AzureコンテナアプリケーションでTypeScript MCPサーバーを生成](https://learn.microsoft.com/zh-cn/azure/developer/ai/build-mcp-server-ts)

### MCPサーバーリソース

- [Awesome MCP Servers](https://github.com/punkpeye/awesome-mcp-servers) - 最も包括的なMCPサーバーリスト
- [Official MCP Registry](https://registry.modelcontextprotocol.io) - Anthropic公式アプリストア
- [MCP.so](https://mcp.so) - コミュニティMCPサーバーセンター
- [Glama.ai MCP](https://glama.ai/mcp/servers) - 評価とコメント付きMCPディレクトリ
- [Smithery](https://smithery.ai) - MCPサーバーマーケットプレイス
- [MCPHub](https://mcphub.io/registry) - クリーンなインターフェースのディレクトリ
- [LobeHub MCP](https://lobehub.com/zh/mcp) - 中国語MCPディレクトリ

### マップと天気サービス

- [Amap MCP Server](https://lobehub.com/zh/mcp/luozengchang-mcp-amap)
- [Tencent位置情報サービスMCPドキュメント](https://lbs.qq.com/service/MCPServer/MCPServerGuide/overview)
- [Caiyun天気MCP Server](https://github.com/caiyunapp/mcp-caiyun-weather)
- [OpenWeatherMap MCP Server](https://github.com/CodeByWaqas/weather-mcp-server)

### コミュニティリソース

- [Everything Claude Code Config](https://github.com/affaan-m/everything-claude-code) - 本番グレードClaude Code設定コレクション
- [AI Coding Guide](https://github.com/hacket/AICodingGuide) - Claude Codeの中国語学習パス

### 実際の応用例

- [BlenderMCP - AI駆動3Dモデリング](https://github.com/Belthur/blender-mcp) - 4,100+ :star:
- [本番環境でのMCPの15のベストプラクティス](https://learn.microsoft.com/zh-cn/azure/azure-functions/scenario-mcp-apps)
