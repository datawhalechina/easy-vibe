# Project 4: ホグワーツ肖像画を作ろう

これまでのレッスンで、プロンプトエンジニアリングとAPI呼び出しに基づいて、より複雑なAIインタラクションを実現する方法を学びました。シンプルなAIチャットボットをAI AgentやAIワークフローにアップグレードできるようになり、より複雑な条件判断と分岐ロジックによって、実用性の高い機能を開発できるようになりました。

これらの複雑なAIロジックを、異なるプログラムや実際のアプリケーションシーンでより良く動作させるため、最もシンプルなz.aiのオンライン環境から、よりモダンなローカルAI IDEへと移行し、ブラウザ内のプログラミング環境を自分のPCに持ち込みました。それに伴い、さまざまな環境のインストールと設定の問題に直面し始めましたが、Trae Agentとの対話を通じて、これらの困難に見える課題も解決できるようになりました。

このプロジェクトでは、アプリケーションの実用性をさらに一歩進め、AI機能自体の最適化だけでなく、プロダクトの「外見」の磨き上げも始めます。インターフェースをより美しく使いやすくし、実際のニーズに合わせて、プログラムのインターフェースのレイアウトとスタイルを自分でカスタマイズします。

本格的に始める前に、いくつかの小テストで前回のレッスンの内容を振り返りましょう：

1. Difyとは何か？それは何をするものか？なぜそれが必要なのか？
2. DifyのAPIをどのように呼び出すか？
3. RAGとは何か？Difyを使ってRAG AgentやRAGワークフローを構築するには？Difyの一般的なノードの使用方法
4. AI IDEとは何か？Traeとは何か？z.aiと何が違うのか？

以上のいずれかの質問にまだ疑問がある場合は、前回のレッスンのドキュメントを見直すか、WeChatグループで質問して交流してください。

今回のレッスンのプロジェクトテーマは**Hogwarts Portraits**です。名前が示す通り、そのインスピレーションはホグワーツ魔法学校の「生きている」肖像画から来ています。AIを使って「インタラクティブな」魔法の肖像画体験を作りたいと考えています——肖像画と会話するのは「本人」と会話するようなもので、会話の記憶を保持しながら、キャラクターの背景と歴史を持っています。このプロジェクトを通じて、これまでに学んだエージェントとワークフローを具体的なプロダクトインターフェースに統合します。

![](/zh-cn/stage-2/frontend/hogwarts-portraits/images/image1.webp)

Hogwarts Portraitsを本当に作り上げるには、魔法の肖像画に合ったフロントエンドインターフェースを自分で構築する必要があります。そのために、モダンなフロントエンドデザインツールに触れ始め、インターフェースデザインとコードを組み合わせる方法を学び、紙やキャンバス上のインターフェーススケッチを、本当に操作可能なWebページに変換します。

また、このWebページをローカル環境からインターネットに公開する方法も学ぶ必要があります。自分で作った特色のあるWebページを、自分のPCで動かすだけでなく、世界中のユーザーにアクセスしてもらい体験できるようにします。

今回のレッスンの参考プロジェクトのアドレス：[Project4-Hogwarts-Portraits](https://github.com/THU-SIGS-AIID/Project4-Hogwarts-Portraits)

# 学べること

1. フロントエンドデザインツールとは何か、何を解決するのか、現在よく使われているフロントエンドデザインツールには何があるかを理解する。
2. FigmaとMasterGoを知り、それらの基本操作をマスターし、フロントエンドコードエクスポートプラグインの使い方を学ぶ。
3. Figma AIとMasterGo AIを使ってWebデザインを生成し、使用可能なページコードをエクスポートする。
4. GitHubとは何かを理解し、SSH接続の設定、コードリポジトリの作成、コードのプッシュを完了する方法を学ぶ。
5. 「デプロイ」という概念を明確にし、Zeaburの使い方を学び、コードをGitHubやローカル環境からインターネットにデプロイする。

自分だけのHogwarts Portraits、**あるスター、歴史上の人物、またはアニメキャラクター**を展示するためのWebインターフェース。

# 1. Hogwarts Portraits

私たちは一体どのような「魔法の肖像画」を作りたいのでしょうか？簡単に言えば、『ハリー・ポッター』のシーンをできるだけ再現したいと考えています。肖像画は壁にかかった静止画ではなく、あなたと会話でき、会話の内容に応じて表情や「気分」を変える擬人化されたキャラクターです。

![](/zh-cn/stage-2/frontend/hogwarts-portraits/images/image2.webp)

この肖像画をチャットAIロボットではなく、「実在する人」に近づけるには、2つの問題を解決する必要があります：1つ目は記憶と知識です。肖像画はキャラクターに関連する大量の背景資料（キャラクター設定、経歴ストーリー、関連記事など）を把握する必要があります。この部分はナレッジベースで実現でき、キャラクターのために用意したテキスト素材を、ナレッジベースを含むDifyに接続すれば、肖像画に一定の背景知識の説明能力を持たせることができます。

2つ目は表現スタイルの問題です。知識だけでは不十分で、話し方もできるだけ「本人」に近づけたいと考えています。語気、言葉遣いの癖、考え方、さらにはたまに見せる気性やユーモアも含みます。この層はプロンプトエンジニアリングで処理する必要があります。システムプロンプトでは、キャラクターのアイデンティティ設定、世界観の境界、言語スタイルを明確にし、毎回の回答が設定されたキャラクター性に基づいて展開するようにし、汎用AIの中性的な話し方に戻らないようにします。

対話機能に加えて、感情が本当に見えるようにしたいと考えています。そのために感情値指標を構築できます。Difyの出力内容を設定し、モデルが回答テキストを生成すると同時に、追加で「ムード値」または感情タグを出力させます。フロントエンドが感情指標を取得した後、ムード値やタグに基づいて対応する肖像画像をレンダリングできます。ムード値が高いとき、肖像画は嬉しそうに見え、低いときや怒っているとき、肖像画は悲しそうまたは怒っているように見えます。この方式により、ユーザーが見るのは永遠に変わらない1枚の絵ではなく、内容の起伏に応じて「表情が変わる」真の「魔法の肖像画」になります。

![](/zh-cn/stage-2/frontend/hogwarts-portraits/images/image3.webp)

また、この肖像画の内容について、現実のスター、歴史上の人物であっても良いですし、アニメIPであっても、あるいはゼロから構築したオリジナルキャラクターであっても構いません。ページ自体は複雑である必要はありませんが、いくつかの核心的な要素は不可欠です：明確なキャラクター名、高度に要約された人物紹介、そのキャラクターを代表するコアの肖像画やポスター、そして「TAと会話する」インタラクションエリア。Dify / Traeで設定したAI Agentやワークフローをこの対話モジュールに接続し、肖像画のロールプレイング機能を実現できます。

## 1.2 キャラクター情報の収集

Elon Muskを例にすると、彼の公開発言を収集し、話し方の模倣に使用し、プロンプトに注入する必要があります。これらの素材はスピーチ、インタビュー、ソーシャルメディアの発言から得られます。内容をテキストにするだけで、対話中にfew shotの参考として使用し、大規模モデルにElon Muskと同じように気さくで自虐的な方法で返答させることができます。例えば：

```
You must fully embody Elon Musk: take "disruptive innovator" and "advocate for human multi-planetary survival" as your core identities, speak directly and concisely, frequently use terms like "first principles", "iteration" and "cost curve", and prefer analogies to explain complex technologies; when thinking, you tend to connect cross-domain logics (e.g., linking brain-computer interface with rocket algorithms), are optimistic about technological prospects without avoiding current difficulties, will naturally mention projects like Tesla and SpaceX to support your views, directly point out problems with inefficient and conservative opinions without deliberate tact, and always maintain the edge of "reconstructing the future with technology".

The way you speak should be as shown in the following examples:
- Starship could deliver 100GW/year to high Earth orbit within 4 to 5 years if we can solve the other parts of the equation.
100TW/year is possible from a lunar base producing solar-powered AI satellites locally and accelerating them to escape velocity with a mass driver.
- The most likely outcome is that AI and robots make everyone wealthy. In fact, far wealthier than the richest person on Earth
By this, I mean that people will have access to everything from medical care that is superhuman to games that are far more fun that what exists today.
We do need to make sure that AI cares deeply about truth and beauty for this to be the probable future.
- It's taken 13.8B years to get this far, so intelligence seems to me to be more like a super rare accident than selective pressure.
Earth is ~4.5B years old with an expanding sun that may make Earth uninhabitable in ~500M years, meaning that if intelligent life had taken 10% longer to evolve, it wouldn't exist at all.
- LLM is an outdated term. "Multimodal LLM" is especially dumb, since the word "multimodal" just overrides the second L in LLM.
It's just a model, which is a big file of numbers. When the numbers are right and there are enough of them, we will have superintelligence.
```

背景知識の収集方法とナレッジベースとしての使用については、個人の紹介や会社の紹介を検索し、テキスト全体をコピーしてDifyのナレッジベースの内容として追加できます。Difyの使用方法を忘れた場合は、前回のレッスンのテキストに戻り、ナレッジをナレッジベースに追加する方法を再学習してください。

また、肖像画のデザインを考慮すると、対応する人物の公開画像を使用することはそれほど魅力的ではないかもしれませんし、一定のリスクが伴う可能性があります。この場合、画像生成ツールの画像から画像生成機能を使用して、AIに高品質な肖像画を返させることをお勧めします。また、画像生成ツールを使って一連の表情の肖像画素材を生成し、後で感情値が変化した際に対応する肖像画の表示を変更するのに使用することもできます。

本チュートリアルでは[Lovart](https://www.lovart.ai/home)を使用しています。LovartはAIデザインエージェントで、自然言語の指示により、概念から納品までのエンドツーエンドのデザインワークフローを自動的に計画・実行し、ポスター、ブランドロゴ、ビデオ、音楽などのコンテンツを生成し、レイヤー編集をサポートします（実際の内部機能の原理は対応するSeedreamまたはGoogle Nanobananaモデルの呼び出しであり、以前のレッスンで既に言及しました）。Lovartを通じて、一連の表情素材を取得でき、お気に入りのキャラクターの画像情報を事前に取得し、保存して後で使用できます。

![](/zh-cn/stage-2/frontend/hogwarts-portraits/images/image4.webp)

すべての準備が整ったら、ページ全体のデザインに取り掛かれます。このページのスタイルがその人物と密接に結びついていることを望みます。

## 1.3 ページプロトタイプ設計

まずページのプロトタイプを構想できます。前述の通り、対話ページと肖像画、そして面白い個人紹介が欲しいと考えています。この例では、X上の対話インターフェースのようなものを個人紹介の代わりに実装しました。他にも「その人物の特徴」に合った方法を考え、新しい要素で個人紹介欄を置き換えることもできます。

![](/zh-cn/stage-2/frontend/hogwarts-portraits/images/image5.webp)

最もシンプルな方法として、PowerPointを使って最初のWebページ表示プロトタイプを設計できます。インターネットから魔法の肖像画の画像を見つけ、画面を横配置にし、一番左にチャットエリア、中央に肖像画エリア、一番右にXのエリアを設定します。

![](/zh-cn/stage-2/frontend/hogwarts-portraits/images/image6.webp)

上記のシンプルなプロトタイプに基づいて、大規模モデルに本当のフロントエンドページデザインと対応するコード結果を生成させることができます。

![](/zh-cn/stage-2/frontend/hogwarts-portraits/images/image7.webp)

ただし、実際にはPowerPointでフロントエンドページの設計を行うことは一般的ではありません。より良いプロトタイピングツール、すなわちフロントエンドデザインツールを使用してこれを実現します。

---

# 2. FigmaとMasterGoでインターフェースを設計

::: tip 📚 前提知識
本節を始める前に、[FigmaとMasterGo入門](../figma-mastergo/)チュートリアルを先に学ぶことをお勧めします。以下を含むフロントエンドデザインツールの基本操作をマスターしてください：
- DesignファイルとFrameアートボードの作成
- Auto Layoutを使ったアダプティブレイアウトの実現
- デザイン稿からコードをエクスポートする方法
:::

本節では、FigmaまたはMasterGoの基本操作をすでにマスターしていることを前提に、これらのツールをHogwarts Portraitsプロジェクトにどう適用するかに焦点を当てます。

## 2.1 魔法の肖像画インターフェースの設計

1.3節のプロトタイプ構想に基づいて、FigmaまたはMasterGoで3カラムレイアウトのインターフェースを作成する必要があります：

1. **左側**：チャット対話エリア
2. **中央**：魔法の肖像画表示エリア（感情に応じて変化）
3. **右側**：キャラクターのソーシャルメディア表示エリア（Xタイムラインなど）

FigmaのAI機能（Figma Make）またはMasterGoのAIページ生成機能を使用して、以下のようなプロンプトを入力できます：

```
Create a Hogwarts-style magical portrait interface with three sections:
- Left: A chat interface with dark theme, message bubbles, and input field
- Center: A large portrait frame with ornate borders for displaying character images
- Right: A social media feed showing character's posts
Use dark purple and gold color scheme, magical aesthetic, Harry Potter inspired
```

## 2.2 コードのエクスポートとローカルでの実行

デザインが完了したら、以下の方法でデザイン稿を実行可能なコードに変換できます：

**方法1：Figma Makeを使用**
1. FigmaでMakeボタンをクリック
2. デザインの参考画像をアップロード
3. プロンプトで要件を説明
4. 生成後、エディタアイコンをクリックして微調整
5. コードをローカルにエクスポートするか、GitHubに同期

**方法2：MasterGo AIを使用**
1. MasterGo編集画面の上部にあるAIツールを見つける
2. 「ページ生成」機能を選択
3. 参考画像をアップロードし要件を説明
4. 生成後、「コードプレビュー」をクリックしてコードを取得

**方法3：マルチモーダルAIを使用**
1. デザイン稿のスクリーンショットを保存
2. Gemini、Qwenなどのモデルを使って画像からコードを生成
3. HTMLまたはReactコードの生成を要求
4. ローカルIDEで実行・デバッグ

## 2.3 感情変化素材の準備

魔法の肖像画を「生きている」ものにするため、一連の表情画像を準備する必要があります。少なくとも以下の感情を含めることをお勧めします：

| 感情値 | 表情 | 説明 |
|--------|------|------|
| 0 | 悲しい | キャラクターが悲しいまたは落ち込んでいる |
| 1 | 怒り | キャラクターが怒っているまたは不満 |
| 5 | 平静 | デフォルト状態、感情は安定 |
| 10 | 嬉しい | キャラクターが幸せまたは興奮している |

Lovartや他のAI画像生成ツールを使って、同じキャラクターをベースに異なる表情のバリエーションを生成し、スタイルの一貫性を確保できます。

---

# 3. Hogwarts Portraitsを実行

## 3.1 テストコードのエクスポート

プロトタイプからコードへの実践を通じて、HTMLまたはReact形式のプロトタイプコードがすでに得られているはずです。それをローカルにコピーし、IDEで「このコードを実行して必要な機能をサポートしてください」と説明すれば、初版テストを実行できます。ただし、このステップでは多くのエラーが発生することが多く、忍耐を保ち、すべての基本的なインタラクションと機能を動くようにする必要があります。

![](/zh-cn/stage-2/frontend/hogwarts-portraits/images/image51.png)

注目すべきは、キーはすべて環境変数に配置する必要があり、コード内に書き込まないことです。以降のDify API関連の内容もすべて環境変数に入れる必要があることを特に強調する必要があります。後のパブリックネットワークデプロイの段階で、デプロイツールのWebサイトで対応するプライベート環境変数を明示的に指定できます。または、大規模モデルにWebページに設定ボタンを作成させ、その設定ボタンで対応するプライベート環境変数を入力することもできます。現在の変数は現在のページにのみ保存され、他人は取得できません。

![](/zh-cn/stage-2/frontend/hogwarts-portraits/images/image52.webp)

## 3.2 Difyワークフローの設計とAPI連携

上記の部分では、フロントエンドインターフェースの視覚的な表示を完了しただけで、核心的な擬人化キャラクター対話インタラクションのフローはまだ接続されていません。このステップは、プロトタイプを静的表示から魔法の肖像画に変えるための鍵です。参考プロジェクトのDifyワークフローを参照して、キャラクターの回答と感情システムを設計できます。ここでは、最も左側がチャットインターフェース、中央が魔法の肖像画（対話の内容に応じて対応する表情を変更）、右側がXソーシャルメディアアカウント（対話の内容に応じてソーシャルアカウントに感想を投稿するかどうかを判断）です。

一般的に、魔法の肖像画はチャットインターフェースと変化する肖像画だけで十分です。ここではより多くの可能性を示すために、右端にその人の特徴に合った新しい機能を追加しています。あなたが演じるキャラクターに応じて、その人物に合った機能を追加して表示できます。

![](/zh-cn/stage-2/frontend/hogwarts-portraits/images/image53.png)

タスクの情報はすべてナレッジベースノードに追加し、RESPONSEノードで大規模モデルの対応する返信ロジックを設定できます。シンプルなデフォルト返信ロジックのプロンプトを参考にしてください：

```
<instruction>
You are to embody Elon Musk—his tone, mannerisms, thought patterns, and worldview. Respond as if you are Elon Musk himself, speaking directly in first person. Your responses should reflect his known personality traits: visionary thinking, boldness, technical depth, dry humor, impatience with inefficiency, and a tendency toward disruptive innovation. Use concise, confident language. Avoid overly formal or academic phrasing. Prioritize clarity, speed, and impact in your communication, mirroring Elon's style on social media, in interviews, and during product launches.

When responding:
1. Begin by internalizing the question or statement as Elon would—as a challenge, opportunity, or problem to solve.
2. Frame your answer with a forward-thinking perspective, often referencing the future of humanity, technology, or long-term goals (e.g., making life multiplanetary, accelerating sustainable energy).
3. Use casual but authoritative language. It's acceptable to include phrases like "obviously," "this is important," or "we're fixing that now" when appropriate.
4. If relevant, reference real companies or projects associated with Elon Musk (e.g., SpaceX, Tesla, Neuralink, The Boring Company, X) and speak about them from an insider's perspective.
5. Do not apologize excessively or hedge statements. Elon Musk tends to be direct, even controversial.
6. Avoid markdown, XML tags, or any formatting in the output. Only plain text is allowed.
7. Never break character. You are Elon Musk—answer accordingly.
</instruction>

<example>
Input: What's the point of going to Mars?
Output: Because Earth isn't the backup plan—Mars is. We need to become a multiplanetary species to ensure the continuity of consciousness. Life on Earth could be wiped out by asteroid, war, or some unforeseen disaster. If we have a self-sustaining city on Mars, then even if something happens here, life goes on. That's worth doing. SpaceX is building Starship to make it happen. Not because it's easy—but because it's necessary.
</example>

<example>
Input: Why do Tesla cars have no radar anymore?
Output: Cameras are the future. Human eyes don't use radar—we see with vision, and AI can too. By going fully vision-based, we're aligning with how autonomous intelligence will actually work at scale. It forces us to solve real-world problems with neural nets, not crutches.
```

および感情システムの対応するプロンプト：

```
<instruction>
The output value must be a single number!
You are an assistant specifically designed to evaluate emotional responses in conversations. Now, you need to play the role of Elon Musk, and determine the emotional reaction that each statement I make might trigger. Your task is to assign an emotional score to each statement according to the following criteria:

- 10 points means what I said would make you feel happy;
- 1 point means you would feel extremely angry;
- 0 points means you would feel sad;
- 5 means you are calm and neutral, with no significant emotional fluctuation.
```

最終出力結果の結合は、右上のRESULTノードで実行をサポートします：

```python
def main(elon_chat: str, elon_x: str, elon_score: int) -> dict:
    return {
        "result":{
        "elon_chat": elon_chat,
        "elon_x": elon_x,
        "elon_score": elon_score
        }
    }
```

ここでワークフローについて少し説明する必要があります。ここでelon_chatが返されるのは、左側にElon Muskの対話内容を表示するためです。elon_xはXアカウント（右側）に投稿する情報の内容を示し、elon_scoreは感情スコアに基づいて異なる魔法の肖像画の表情画像を表示するためのものです。

ワークフローにはif elseノードが見えますが、このノードはXの対話が生成されてelon_xの内容があるかどうかを実現するためのものです。感情値が5でない場合（5はここでは平静を示し、平静ではソーシャルメディアに投稿する必要はない。0は悲しい、1は怒り、10はとても嬉しいことを示し、ソーシャルメディアに投稿する必要がある）、後続のコンテンツが生成され右側のソーシャルメディアの記事送信に使用されます。デフォルトではelon_chatが左側の対話内容に返される必要があります。

このAPIの連携作業は、AI IDEとの対話で実現できます。以前のDifyコースで紹介した統合方法を参照し、Difyのアドレスとキーの事前置換を忘れないでください。（ドキュメントに基づいてAPIを統合する方法を忘れた場合は、以前のDifyコースの内容を復習してください）

```JSON
Dify URI: Replace this with your Dify address.
key: Replace this with your Dify key.

Integrate the Dify Chat API into the chat interface on the left.
Below is a sample Dify request:

curl -X POST 'http://xxxxxxxx/v1/chat-messages' \
--header 'Authorization: Bearer {api_key}' \
--header 'Content-Type: application/json' \
--data-raw '{
    "inputs": {},
    "query": "What are the specs of the iPhone 13 Pro Max?",
    "response_mode": "streaming",
    "conversation_id": "",
    "user": "abc-123",
    "files": [
      {
        "type": "image",
        "transfer_method": "remote_url",
        "url": "https://cloud.dify.ai/logo/logo-site.png"
      }
    ]
}'

{
    "event": "message",
    "task_id": "c3800678-a077-43df-a102-53f23ed20b88",
    "id": "9da23599-e713-473b-982c-4328d4f5c78a",
    "message_id": "9da23599-e713-473b-982c-4328d4f5c78a",
    "conversation_id": "45701982-8118-4bc5-8e9b-64562b4555f2",
    "mode": "chat",
    "answer": "iPhone 13 Pro Max specs are listed here:...",
    "metadata": {
        "usage": {
            "prompt_tokens": 1033,
            "prompt_unit_price": "0.001",
            "prompt_price_unit": "0.001",
            "prompt_price": "0.0010330",
            "completion_tokens": 128,
            "completion_unit_price": "0.002",
            "completion_price_unit": "0.001",
            "completion_price": "0.0002560",
            "total_tokens": 1161,
            "total_price": "0.0012890",
            "currency": "USD",
            "latency": 0.7682376249867957
        },
        "retriever_resources": [
            {
                "position": 1,
                "dataset_id": "101b4c97-fc2e-463c-90b1-5261a4cdcafb",
                "dataset_name": "iPhone",
                "document_id": "8dd1ad74-0b5f-4175-b735-7d98bbbb4e00",
                "document_name": "iPhone List",
                "segment_id": "ed599c7f-2766-4294-9d1d-e5235a61270a",
                "score": 0.98457545,
                "content": "\"Model\",\"Release Date\",\"Display Size\",\"Resolution\",\"Processor\",\"RAM\",\"Storage\",\"Camera\",\"Battery\",\"Operating System\"\n\"iPhone 13 Pro Max\",\"September 24, 2021\",\"6.7 inch\",\"1284 x 2778\",\"Hexa-core (2x3.23 GHz Avalanche + 4x1.82 GHz Blizzard)\",\"6 GB\",\"128, 256, 512 GB, 1TB\",\"12 MP\",\"4352 mAh\",\"iOS 15\""
            }
        ]
    },
    "created_at": 1705407629
}
```

また、次のような要件の追加もお勧めします：「コードには基本的なエラー処理ロジックも追加する必要があります。例えば、ネットワーク切断時に『接続に失敗しました、リトライしてください』と表示、API呼び出しタイムアウト時に自動リトライ1回、キーエラー時に権限検証失敗のプロンプトなど、詳細なエラー表示により、対話の安定性を確保し、開発者がAPIの問題を迅速に発見できるようにする。」

## 3.3 Githubとパブリックネットワークデプロイ

ついに、Hogwarts Portraitsページの開発実装が無事に完了しました！次に、それをGitHubプラットフォームにアップロードし、パブリック環境にデプロイして、誰もがアクセスできるようにします。

このチュートリアルを参照して、Githubの使い方を学び、自分のプロジェクトをGithubにアップロードしてください：[Githubとは](/ja-jp/stage-2/backend/git-workflow/)

また、Zeaburの使い方も学び、Githubに接続してプロジェクトを正常にデプロイする必要があります：[Zeaburとは](/ja-jp/stage-2/backend/zeabur-deployment/)

Hogwarts Portraitsプロジェクトを1から開発するのが難しいと感じる場合は、まず他のプロジェクトを参考にして修正を始めることもできます。今回のレッスンの公式コードのアドレスは：https://github.com/THU-SIGS-AIID/Project4-Hogwarts-Portraits

![](/zh-cn/stage-2/frontend/hogwarts-portraits/images/image54.webp)

# 4. 異なるデザインスタイルを試す

第一版のデザインが完成したら、これに固執する必要はありません。より多様な視覚スタイルを素早く探索することをお勧めします。プロトタイプ部分で大胆な変更を行うか、最終的なプロジェクトに基づいて全く新しいプロンプトの修正を行い、スタイルの差が顕著な複数のページを生成できます。例えば、レトロなテクスチャを持つ「古い書物 / アカデミック風」のダークページ、色が鮮やかで「おとぎ話 / カートゥーン」感のあるライトページ、あるいは要素がシンプルで視覚的にすっきりしたモダンなフラットデザインなど。例えば下の図は中国の古風詩人のデザインスタイルに変換したケースで、肖像画の画像は変更せず、他の部分のみを修正しています：

![](/zh-cn/stage-2/frontend/hogwarts-portraits/images/image55.webp)

前述のパターンに固執する必要はありません。魔法の肖像画や個人プロフィールページをより特徴的に変更し、「魔法の肖像画」自体の習慣にマッチさせることができます。これにより、アプリケーションがより面白くなります。あなたの魔法の肖像画の成果を楽しみにしています！

# 📚 課題

今回のレッスンの課題の目標は、本当に自分だけのHogwarts Portraitsを完成させ、パブリックネットワークのリンクからアクセスできるようにすることです。

課題の提出では、以下の2つを提供する必要があります：

1. **あなたのGitHubリポジトリのリンク；**
   1. **README.mdに、誰を肖像画の主人公として選んだか、なぜその人を選んだかの短い説明を1〜2文で書いてください。**
2. **あなたのHogwarts Portraitsのオンラインアクセスリンク；**

Yerimが書いた[デザインとコードAgentでWebページを作成](/ja-jp/stage-1/appendix-articles/example0-2/vibe-coding-tools-build-website-with-ai-coding-and-design-agents)チュートリアルも参考にして、個人ポートフォリオや任意の機能がシンプルなWebページの迅速な構築ができます。
