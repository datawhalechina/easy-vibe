# Claude Agent SDK 完全ガイド

## はじめに

あなたはすでに Claude の基本的な API を使ったことがあるかもしれません：メッセージを送信し、返信を受け取る、まるでチャットのようなものです。しかし、Claude にファイルの読み取り、コマンドの実行、コードの検索、バグの修正、結果の検証、そして継続的な反復をさせたい場合、このような「自律的な作業」は基本 API にはできないことです。

Claude Agent SDK はまさにこのシナリオのために構築されました。Claude Code のすべての機能—ファイルの読み書き、コマンドの実行、コードの検索、ファイルの編集、Web の閲覧—をプログラム可能なライブラリにパッケージ化します。ツール呼び出しループを自分で書く必要はありません。Claude は自律的にツールを実行し、タスクが真に完了するまで自律的に反復します。

一言でまとめると：基本 SDK は「質問すると答える」、Agent SDK は「タスクを割り当てると作業する」です。

---

## 基本 SDK との違いは何か？

まずコードを見れば、違いは明確です：

```python
# 基本 anthropic SDK：ツール呼び出しを処理するループを自分で書く必要がある
import anthropic

client = anthropic.Anthropic()
response = client.messages.create(
    model="claude-sonnet-4-6",
    max_tokens=1024,
    messages=[{"role": "user", "content": "auth.py のバグを修正して"}],
    tools=[...]  # 自分でツールを定義する必要がある
)
# Claude がいくつかのツールを呼び出そうとする
while response.stop_reason == "tool_use":
    result = your_tool_executor(response.tool_use)  # 自分で実行する必要がある
    response = client.messages.create(tool_result=result, **params)  # 自分でフィードバックする必要がある
```

```python
# Agent SDK：1ブロックで完了、Claude が自分でファイルを読み、バグを見つけ、コードを編集する
from claude_agent_sdk import query, ClaudeAgentOptions

async for message in query(
    prompt="auth.py のバグを修正して",
    options=ClaudeAgentOptions(allowed_tools=["Read", "Edit", "Bash"]),
):
    print(message)  # Claude が自分でファイルを読み、問題を特定し、コードを編集する
```

違いは明確です：

| 比較項目 | 基本 anthropic SDK | Claude Agent SDK |
|--------|-------------------|-----------------|
| ツール実行 | あなたが実装 | Claude が処理 |
| ツールループ | あなたが実装 | 内蔵エージェントループ |
| 内蔵ツール | なし、すべて自分で定義 | ファイル読み書き、Bash、検索などがすぐに使える |
| コンテキスト管理 | あなたが維持 | 自動圧縮と自動管理 |
| 最適な用途 | チャット、生成、単純なツール使用 | 自律的に複雑なタスクを完了 |

---

## 他のエージェントフレームワークとの違いは？

市場には多くのエージェントフレームワークがあります—LangChain、LlamaIndex、CrewAI、AutoGPT など。Claude Agent SDK がこれらと比較してユニークな点は何でしょうか？

> 📚 **詳細な比較については、付録を参照してください**：[主流エージェントフレームワーク比較](/ja-jp/appendix/8-artificial-intelligence/ai-agents.html)

簡単に言うと：

| フレームワーク | 最適なシナリオ |
|------|-------------|
| **Claude Agent SDK** | Claude に自律的にコーディング、ファイル操作、コマンド実行を完了させる |
| **LangChain** | 高度にカスタマイズされたフローで複雑な汎用 AI アプリを構築 |
| **CrewAI** | マルチロール協力シナリオのシミュレーション（仮想チーム、ロールプレイ） |
| **LlamaIndex** | 企業データと LLM を接続するナレッジベース QA システムの構築 |

---

## インストールと設定

### インストール

Python は 3.10+、TypeScript は Node.js 18+ が必要です：

```bash
# Python
pip install claude-agent-sdk

# TypeScript
npm install @anthropic-ai/claude-agent-sdk
```

### 認証

API キー環境変数を設定するだけです：

```bash
export ANTHROPIC_API_KEY=your-api-key
```

クラウドプラットフォーム認証もサポートされています：
- AWS Bedrock：`CLAUDE_CODE_USE_BEDROCK=1` + AWS 認証情報を設定
- Google Vertex AI：`CLAUDE_CODE_USE_VERTEX=1` + GCP 認証情報を設定
- Microsoft Azure：`CLAUDE_CODE_USE_FOUNDRY=1` + Azure 認証情報を設定

### カスタム API エンドポイント

プロキシ、ゲートウェイ、またはセルフホスト API エンドポイントを使用する場合、`env` パラメータを通じてデフォルトの API URL を変更できます：

```python
from claude_agent_sdk import query, ClaudeAgentOptions

async for message in query(
    prompt="こんにちは",
    options=ClaudeAgentOptions(
        env={
            "ANTHROPIC_BASE_URL": "https://your-proxy.example.com",
            "ANTHROPIC_API_KEY": "your-api-key",
        }
    ),
):
    print(message)
```

`ClaudeAgentOptions` には直接的な `base_url` パラメータはありませんが、`env` フィールドは任意の環境変数を基盤の Claude Code CLI に渡すことができます。一般的な環境変数：

| 環境変数 | 用途 |
|---------|------|
| `ANTHROPIC_BASE_URL` | カスタム API エンドポイント（プロキシ、ゲートウェイ） |
| `ANTHROPIC_API_KEY` | API キー |
| `ANTHROPIC_AUTH_TOKEN` | 代替認証トークン |
| `ANTHROPIC_CUSTOM_HEADERS` | カスタムリクエストヘッダー |

---

## コア概念

エージェント SDK のランタイム原理は一言で要約できます：**コンテキストの収集 -> アクションの実行 -> 結果の検証 -> 繰り返し**。

これはまさに人間の開発者が働く方法です：まずコードを読み、コードを修正し、テストを実行して結果を確認します。間違っていれば、反復を続けます。エージェント SDK がこのループを自動化します。

### 2つの使用モード

**モード1：`query()` 関数 - ステートレス、一回限りのタスクに適しています**

```python
import asyncio
from claude_agent_sdk import query, ClaudeAgentOptions

async def main():
    async for message in query(
        prompt="このディレクトリにどんなファイルがありますか？",
        options=ClaudeAgentOptions(allowed_tools=["Bash", "Glob"]),
    ):
        if hasattr(message, "result"):
            print(message.result)

asyncio.run(main())
```

**モード2：`ClaudeSDKClient` - ステートフル、マルチターン会話に適しています**

コンテキストを保持し、複数ターンにわたって対話する必要がある場合に使用します。例えば、まず Claude にモジュールを読ませ、そのモジュールのすべての呼び出し箇所を見つけさせる場合—2ターン目でも1ターン目で読んだ内容を覚えています。

```python
import asyncio
from claude_agent_sdk import query, ClaudeAgentOptions

async def main():
    session_id = None

    # ターン1：認証モジュールを読む
    async for message in query(
        prompt="認証モジュールのコードを読んでください",
        options=ClaudeAgentOptions(allowed_tools=["Read", "Glob"]),
    ):
        if hasattr(message, "subtype") and message.subtype == "init":
            session_id = message.session_id

    # ターン2：前のコンテキストに基づいて続ける
    async for message in query(
        prompt="それを呼び出しているすべての場所を見つけてください",
        options=ClaudeAgentOptions(resume=session_id),
    ):
        if hasattr(message, "result"):
            print(message.result)

asyncio.run(main())
```

---

## 内蔵ツール：すぐに使える

これがエージェント SDK の最も良い点の一つです—自分でツールを実装する必要はなく、Claude が直接使用できます：

| ツール | 機能 | 典型的な用途 |
|------|------|---------|
| Read | ファイル読み取り | コードの確認、設定の読み取り |
| Write | ファイル作成 | 新しいファイルの生成 |
| Edit | 正確なファイル編集 | バグ修正、リファクタリング |
| Bash | ターミナルコマンド実行 | テスト実行、依存関係のインストール、git 操作 |
| Glob | パターンベースのファイル検索 | `**/*.py`、`src/**/*.ts` |
| Grep | 正規表現コンテンツ検索 | 関数定義の検索、TODOs |
| WebSearch | Web ページ検索 | ドキュメントの検索、アプローチの発見 |
| WebFetch | Web コンテンツの取得 | オンラインドキュメントの読み取り |
| Task | サブエージェントの起動 | サブタスクの並列化 |

`allowed_tools` を使用してエージェントが使用できるツールを制御します：

```python
# 読み取り専用エージェント：検査できるが変更できない
options = ClaudeAgentOptions(
    allowed_tools=["Read", "Glob", "Grep"],
    permission_mode="bypassPermissions"
)

# フルエージェント：読み取り、書き込み、コマンド実行が可能
options = ClaudeAgentOptions(
    allowed_tools=["Read", "Write", "Edit", "Bash", "Glob", "Grep"]
)
```

---

## 高度な機能

### フック：重要なポイントで独自のロジックを挿入

フックを使用すると、エージェント実行の重要な瞬間にカスタムコードを注入できます—例：ロギング、危険な操作の傍受、ファイル変更の監査。

サポートされるフックタイプ：`PreToolUse`（ツール実行前）、`PostToolUse`（ツール実行後）、`Stop`（エージェント停止時）、`SessionStart`、`SessionEnd` など。

```python
from datetime import datetime
from claude_agent_sdk import query, ClaudeAgentOptions, HookMatcher

# ファイルが変更されるたびに監査ログを記録
async def log_file_change(input_data, tool_use_id, context):
    file_path = input_data.get("tool_input", {}).get("file_path", "unknown")
    with open("./audit.log", "a") as f:
        f.write(f"{datetime.now()}: {file_path} を変更\n")
    return {}

async def main():
    async for message in query(
        prompt="utils.py を読みやすくリファクタリングしてください",
        options=ClaudeAgentOptions(
            permission_mode="acceptEdits",
            hooks={
                "PostToolUse": [
                    HookMatcher(matcher="Edit|Write", hooks=[log_file_change])
                ]
            },
        ),
    ):
        if hasattr(message, "result"):
            print(message.result)
```

実際の使用例：
- 監査ロギング：エージェントが実行したすべての操作を記録
- セキュリティ傍受：重要ファイルの変更をブロック
- 通知プッシュ：エージェントタスク完了時にメッセージを送信
- コスト監視：ツール呼び出しとトークン使用量をカウント

### サブエージェント：大きなタスクを専門家に分割

タスクが十分に複雑な場合、複数の専門サブエージェントを定義し、メインエージェントにサブタスクを委任させることができます。各サブエージェントには独自の指示とツール権限があり、互いに隔離されています。

```python
from claude_agent_sdk import query, ClaudeAgentOptions, AgentDefinition

async for message in query(
    prompt="code-reviewer エージェントを使ってこのプロジェクトのコード品質をレビューしてください",
    options=ClaudeAgentOptions(
        allowed_tools=["Read", "Glob", "Grep", "Task"],
        agents={
            "code-reviewer": AgentDefinition(
                description="品質とセキュリティレビューを担当するプロのコードレビューア",
                prompt="コード品質を分析し、潜在的な問題を特定し、改善提案を提供してください。",
                tools=["Read", "Glob", "Grep"],
            ),
            "test-writer": AgentDefinition(
                description="ユニットテストの作成を担当するテスト専門家",
                prompt="テストが欠落している関数のユニットテストを書いてください。",
                tools=["Read", "Write", "Bash"],
            ),
        },
    ),
):
    if hasattr(message, "result"):
        print(message.result)
```

サブエージェントからのメッセージには `parent_tool_use_id` フィールドが含まれ、どのメッセージがどのサブエージェントから来たかを簡単に追跡できます。

### MCP 統合：外部世界への接続

Model Context Protocol（MCP）を通じて、エージェントはデータベース、ブラウザ、サードパーティ API などの外部システムに接続できます。コミュニティはすでに[数百の MCP サーバー](https://github.com/modelcontextprotocol/servers)を提供しており、直接使用できます。

```python
# Playwright を接続してエージェントがブラウザを操作できるようにする
async for message in query(
    prompt="example.com を開いて見えるものを説明してください",
    options=ClaudeAgentOptions(
        mcp_servers={
            "playwright": {
                "command": "npx",
                "args": ["@playwright/mcp@latest"]
            }
        }
    ),
):
    if hasattr(message, "result"):
        print(message.result)
```

一般的な MCP 統合シナリオ：
- Playwright：ブラウザ自動化、ページスクレイピング、フォーム入力
- PostgreSQL/MySQL：直接データベースクエリと操作
- Slack/Email：通知とメッセージの送信
- GitHub：PR、Issue、リポジトリの操作

---

## 何を構築できるか？実践的なシナリオ

機能を理解した後、最も重要な質問は：これで実際に何ができるか？以下はコミュニティで検証された実際のシナリオです。

### シナリオ1：自動バグ修正エージェント

バグの説明を与えると、コードを見つけ、問題を特定し、修正し、テストを実行して確認します：

```python
async for message in query(
    prompt="ユーザーがログイン中に時折 HTTP 500 エラーを報告しています。src/auth/ のコードを調査して修正してください",
    options=ClaudeAgentOptions(
        allowed_tools=["Read", "Edit", "Bash", "Glob", "Grep"],
        permission_mode="acceptEdits",
    ),
):
    print(message)
```

Claude はログを grep し、関連コードを読み、バグを見つけ、コードを修正し、テストを実行して修正を確認します。

### シナリオ2：コードレビューエージェント

変更を一切加えることなく、品質を監査する読み取り専用コードレビューエージェントを構築します：

```python
async for message in query(
    prompt="src/ のコードをセキュリティ脆弱性、パフォーマンス問題、コーディング規約に焦点を当ててレビューしてください",
    options=ClaudeAgentOptions(
        allowed_tools=["Read", "Glob", "Grep"],
        permission_mode="bypassPermissions",
    ),
):
    if hasattr(message, "result"):
        print(message.result)
```

### シナリオ3：CI/CD 統合

CI パイプラインで、エージェントに失敗したテストを分析させ、自動修正を試みます：

```python
async for message in query(
    prompt="npm test を実行し、失敗したテストケースを分析し、すべてのテストが通るようにコードを修正してください",
    options=ClaudeAgentOptions(
        allowed_tools=["Read", "Edit", "Bash", "Glob"],
        max_turns=20,
    ),
):
    print(message)
```

これは CLI よりも SDK の大きな利点です—CLI は人がターミナルに座っている時に優れていますが、SDK は自動化されたワークフローに組み込むのに理想的です。

### シナリオ4：リサーチエージェント

エージェントに Web を検索させ、ドキュメントを読み、情報を統合し、レポートを作成させます：

```python
async for message in query(
    prompt="2026年の主流 Python Web フレームワークをリサーチしてください。FastAPI、Django、Litestar を比較し、技術選定レポートを report.md に書いてください",
    options=ClaudeAgentOptions(
        allowed_tools=["WebSearch", "WebFetch", "Write"],
    ),
):
    print(message)
```

### シナリオ5：ブラウザ機能を持つフルスタックエージェント

MCP を通じて Playwright を接続することで、エージェントはコードを書くだけでなく、ブラウザを開いて結果を確認することもできます：

```python
async for message in query(
    prompt="ホームページのスタイルの問題を修正し、ブラウザを開いてスクリーンショットを撮って結果を確認してください",
    options=ClaudeAgentOptions(
        allowed_tools=["Read", "Edit", "Bash"],
        mcp_servers={
            "playwright": {
                "command": "npx",
                "args": ["@playwright/mcp@latest"]
            }
        },
    ),
):
    print(message)
```

### シナリオクイックリファレンス

| シナリオ | コアツール | 難易度 |
|------|---------|------|
| 自動バグ修正 | Read, Edit, Bash, Grep | 初級 |
| コードレビュー | Read, Glob, Grep | 初級 |
| CI/CD 自動修正 | Read, Edit, Bash | 中級 |
| 技術リサーチレポート | WebSearch, WebFetch, Write | 初級 |
| ブラウザ自動化 | MCP (Playwright) | 中級 |
| マルチエージェント協力 | Task + AgentDefinition | 上級 |
| データベース操作 | MCP (PostgreSQL/MySQL) | 中級 |
| メール/通知アシスタント | MCP (Slack/Email) | 中級 |

---

## いつ Agent SDK を使うべきか？

すべてのシナリオが Agent SDK を必要とするわけではありません。適切なツールの選択が重要です：

| やりたいこと | 推奨ツール |
|-----------|---------|
| 単純なチャット、テキスト生成、翻訳 | 基本 `anthropic` SDK |
| 一回限りのツール使用（天気確認、計算） | 基本 `anthropic` SDK |
| 自律的にマルチステップ開発タスクを完了 | エージェント SDK |
| CI/CD パイプラインに組み込む | エージェント SDK |
| ファイルシステムを操作するアプリの構築 | エージェント SDK |
| 日常的な対話型開発 | Claude Code CLI |
| 一回限りのクイックタスク | Claude Code CLI |

要するに：タスクが Claude に「自分で手を動かして作業する」（ファイルの読み取り、コードの編集、コマンドの実行）ことを必要とする場合、エージェント SDK を使用してください。Q&A だけが必要な場合、基本 SDK で十分です。

---

## エンタープライズ実践：コード品質ガードレイルパイプラインの構築

これまでのシナリオはすべて、1つのエージェントが1つの作業をしていました。実際のエンタープライズ環境で必要なのは、完全なパイプラインです—複数のエージェントが連鎖し、各段階に明確な入出力があり、監査、ロールバック、通知が追加されています。

それでは実際のシナリオを構築します：各 PR 提出後、自動的に**コードレビュー -> セキュリティスキャン -> 自動修正 -> テスト検証 -> レポート生成**を完全なパイプラインとしてトリガーします。

### アーキテクチャ設計

```text
PR が提出される
  │
  ▼
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│  コード     │───▶│  セキュリティ│───▶│  自動修正   │
│  レビュー   │    │  スキャン   │    │  エージェント│
│  エージェント│    │  エージェント│    │  (書込可能) │
│ (読取専用)  │    │ (読取専用)  │    └─────────────┘
└─────────────┘    └─────────────┘            │
                                            ▼
                                     ┌─────────────┐    ┌─────────────┐
                                     │ テスト検証  │───▶│ レポート生成│
                                     │ エージェント│    │ エージェント│
                                     │   (Bash)    │    │   (Write)   │
                                     └─────────────┘    └─────────────┘
                                                              │
                                                              ▼
                                                       Slack 通知
```

核心的なアイデア：**各エージェントは一つのことを行い、権限は最小化され、結果は順次渡される**。

### ステップ1：パイプラインフレームワークの定義

```python
import asyncio
import json
from datetime import datetime
from claude_agent_sdk import query, ClaudeAgentOptions, HookMatcher

# 監査ログ：すべてのエージェントのすべての操作を記録
audit_log = []

async def audit_hook(input_data, tool_use_id, context):
    audit_log.append({
        "time": datetime.now().isoformat(),
        "tool": input_data.get("tool_name"),
        "input": input_data.get("tool_input", {}),
    })
    return {}

# 共有フック設定：すべてのエージェントが監査機能を共有
audit_hooks = {
    "PostToolUse": [HookMatcher(matcher=".*", hooks=[audit_hook])]
}
```

### ステップ2：コードレビューエージェント（読取専用）

```python
async def run_code_review(pr_diff: str) -> str:
    """読取専用エージェント、コード品質をレビューし構造化レポートを出力"""
    result_text = ""
    async for message in query(
        prompt=f"""次の PR diff を以下の観点からレビューしてください：
1. コーディング規約：命名、フォーマット、コメント
2. ロジックの問題：エッジケース、ヌルポインタリスク、競合状態
3. パフォーマンスリスク：N+1 クエリ、メモリリーク、不要なループ
4. 保守性：過度に大きな関数、不明確な責任、マジックナンバー

PR Diff:
{pr_diff}

JSON 形式で出力：{{"issues": [{{"severity": "high/medium/low", "file": "...", "line": ..., "description": "..."}}], "summary": "..."}}""",
        options=ClaudeAgentOptions(
            allowed_tools=["Read", "Glob", "Grep"],
            permission_mode="bypassPermissions",
            hooks=audit_hooks,
            max_turns=10,
        ),
    ):
        if hasattr(message, "result"):
            result_text = message.result
    return result_text
```

### ステップ3：セキュリティスキャンエージェント（読取専用）

```python
async def run_security_scan() -> str:
    """脆弱性スキャンに特化した読取専用エージェント"""
    result_text = ""
    async for message in query(
        prompt="""プロジェクトコードのセキュリティ脆弱性をスキャンしてください：
1. SQL インジェクション、XSS、CSRF
2. ハードコードされたキーや認証情報
3. 安全でない依存関係のバージョン
4. 欠落している権限チェック

JSON 出力：{{"vulnerabilities": [{{"severity": "critical/high/medium", "type": "...", "file": "...", "description": "...", "fix_suggestion": "..."}}]}}""",
        options=ClaudeAgentOptions(
            allowed_tools=["Read", "Glob", "Grep", "Bash"],
            permission_mode="bypassPermissions",
            hooks=audit_hooks,
            max_turns=15,
        ),
    ):
        if hasattr(message, "result"):
            result_text = message.result
    return result_text
```

### ステップ4：自動修正エージェント（書込可能）

```python
async def run_auto_fix(review_result: str, security_result: str) -> str:
    """レビューとスキャン結果に基づいてコードを自動修正する書込可能エージェント"""
    result_text = ""
    async for message in query(
        prompt=f"""次のレビュー結果に従ってコードを修正してください：

コードレビューレポート：
{review_result}

セキュリティスキャンレポート：
{security_result}

修正ルール：
1. 深刻度が高または重大な問題のみ修正
2. 各変更後にテストを実行し、既存機能が壊れていないことを確認
3. 関連のないコードをリファクタリングせず、最小限の修正のみ適用
4. 完了後に変更されたファイルのリストを出力""",
        options=ClaudeAgentOptions(
            allowed_tools=["Read", "Edit", "Bash", "Glob", "Grep"],
            permission_mode="acceptEdits",
            hooks=audit_hooks,
            max_turns=30,
        ),
    ):
        if hasattr(message, "result"):
            result_text = message.result
    return result_text
```

### ステップ5：テスト検証 + レポート生成

```python
async def run_test_and_report(fix_result: str) -> str:
    """テストを実行して最終レポートを生成する"""
    result_text = ""
    async for message in query(
        prompt=f"""以下のアクションを実行してください：
1. 全テストスイートを実行（npm test または pytest）
2. テスト合格率を計算
3. pr-report.md に Markdown 品質レポートを生成し、以下を含める：
   - コードレビューで発見された問題数と深刻度分布
   - セキュリティ脆弱性の数
   - 自動修正の変更内容：{fix_result}
   - テスト合格率
   - 最終結論：マージを推奨するかどうか""",
        options=ClaudeAgentOptions(
            allowed_tools=["Read", "Bash", "Write", "Glob"],
            hooks=audit_hooks,
            max_turns=15,
        ),
    ):
        if hasattr(message, "result"):
            result_text = message.result
    return result_text
```

### ステップ6：パイプライン全体を接続

```python
import subprocess

async def run_pipeline():
    """完全な PR 品質ガードパイプライン"""
    print("🔍 ステージ 1/4：コードレビュー...")
    pr_diff = subprocess.run(
        ["git", "diff", "main...HEAD"], capture_output=True, text=True
    ).stdout
    review_result = await run_code_review(pr_diff)

    print("🛡️ ステージ 2/4：セキュリティスキャン...")
    security_result = await run_security_scan()

    print("🔧 ステージ 3/4：自動修正...")
    fix_result = await run_auto_fix(review_result, security_result)

    print("✅ ステージ 4/4：テスト検証 + レポート生成...")
    report = await run_test_and_report(fix_result)

    # 監査ログを保存
    with open("audit-log.json", "w") as f:
        json.dump(audit_log, f, indent=2, ensure_ascii=False)

    print(f"パイプライン完了、監査ログを保存（{len(audit_log)} 件の操作記録）")
    return report

asyncio.run(run_pipeline())
```

### エンタープライズ設計思想

このパイプラインはいくつかの主要なエンタープライズ設計原則を反映しています：

**最小権限**：code-review と security-scan エージェントは読取専用で、誤ってコードを変更することはできません。auto-fix エージェントだけが書込権限を持ち、それも `acceptEdits` で制約されています。

**監査可能性**：すべてのエージェントのすべてのステップが Hooks を通じて記録されます。問題が発生した場合、どのエージェントが何をいつしたかを追跡できます。

**結果の連鎖**：各エージェントの出力が次のエージェントの入力になります。レビュー結果は自動修正に供給され、自動修正結果はテスト検証に供給されます。すべての段階に明確な入出力の契約があります。

**コスト制御**：すべてのエージェントに `max_turns` 制限があり、暴走ループを防ぎます。本番では予算制御のため `max_budget_usd` を追加することもできます。

**拡張性**：別の段階を追加したい場合、例えば「ドキュメントチェックエージェント」や「パフォーマンスベンチマークエージェント」？新しい関数を追加してパイプラインに挿入するだけです。

このモデルは GitHub Actions や GitLab CI に直接組み込むことができ、各 PR で自動的にトリガーされ、真の「AI 駆動コード品質ガードレイル」を実現します。

---

## エラー処理

エージェント SDK は明確な例外タイプを提供し、本番で堅牢なフォールトトレランスを構築できます：

```python
from claude_agent_sdk import query, CLINotFoundError, ProcessError

try:
    async for msg in query(prompt="コードを分析して"):
        print(msg)
except CLINotFoundError:
    print("Claude Code CLI がインストールされていません。先にインストールしてください。")
except ProcessError as e:
    print(f"プロセスが予期せず終了しました。終了コード：{e.exit_code}")
```

---

## まとめ

Claude Agent SDK の核心的な価値は、「モデル推論」を「制御された実行」にアップグレードすることです。単にテキストを生成するだけではありません。監査可能で制約されたツールシステム内で、真にタスクを完了することができます。

Anthropic の公式ブログの一言を覚えておいてください：エージェント SDK の設計哲学は「エージェントにコンピュータを与え、人間のように働かせる」ことです。

良いエージェントアプリケーション = 明確なツール設計 + 明確なタスク境界 + 適切な人間の監督。ツールはエージェントに能力を与え、境界は制約を与え、監督は信頼を与えます。3つすべてが欠かせません。

---

## 参考文献

### 公式リソース

- [Agent SDK 公式ドキュメント](https://platform.claude.com/docs/en/agent-sdk/overview) - 最も権威ある参考資料
- [GitHub - claude-agent-sdk-python](https://github.com/anthropics/claude-code-sdk-python) - Python SDK ソース
- [GitHub - claude-agent-sdk-typescript](https://github.com/anthropics/claude-agent-sdk-typescript) - TypeScript SDK ソース
- [Agent SDK デモプロジェクト](https://github.com/anthropics/claude-agent-sdk-demos) - メールアシスタント、リサーチエージェントなど

### ブログとチュートリアル

- [Building agents with the Claude Agent SDK](https://claude.com/blog/building-agents-with-the-claude-agent-sdk) - 設計哲学とアーキテクチャに関する Anthropic エンジニアリングブログ
- [Claude Agent SDK Python Study Guide](https://redreamality.com/blog/claude-agent-sdk-python-) - ゼロからの完全チュートリアル
- [Claude Agent SDK Full Tutorial](https://blog.wenhaofree.com/en/posts/articles/claude-agent-sdk-tutorial/) - ツールシステム、エージェントループ、制御された実行の実践ガイド
- [12 Practical Agent SDK Scenarios](https://skywork.ai/blog/claude-agent-sdk-use-cases-2025/) - コーディング、データ、自動化などをカバー
- [Step-by-Step Agent Tutorial](https://skywork.ai/blog/how-to-use-claude-agent-sdk-step-by-step-ai-agent-tutorial/) - TypeScript + Python デュアルトラックチュートリアル
