---
title: 'バックエンド付き WeChat ミニプログラムの作り方'
description: '動作済みのミニプログラムに、信頼できる本人確認、クラウド関数、サポートチケット、DB、権限、ログを追加します。'
---

# バックエンド付き WeChat ミニプログラムの作り方

前の章では、利用者の端末で動く画面を作りました。ここでは企業サービスに必要な裏側、つまり本人確認、共有データ、権限、ファイル、ログを加えます。

Northstar Service Hub という会員向けサポート窓口を作ります。利用者がチケットを登録し、別の端末でも同じ記録を確認できる状態がゴールです。

![Uber WeChat ミニプログラムの経路・注文・決済画面](../../../../zh-cn/stage-3/cross-platform/wechat-miniprogram/images/wechat-uber-mini-program.webp)

## 1. フロントは入口、バックエンドは判断者

フロントは WeChat 内の画面とフォームです。バックエンドは信頼できる環境で本人確認、権限、DB 書き込み、社内連携を行います。フロントから送る ID や管理者フラグは変更できるため、信用しません。

最初は WeChat Cloud Development、クラウド関数、ドキュメント DB、クラウドストレージという短い経路を使います。会社に既存 API がある場合はそれを使えるため、バックエンド付きミニプログラムが必ず CloudBase の購入を必要とするわけではありません。

## 2. 環境を用意する

前章のアカウント、AppID、WeChat DevTools、Trae をそのまま使います。

![CloudBase AI プラグイン](../../../../zh-cn/stage-3/cross-platform/wechat-miniprogram-backend/images/cloudbase-ai-plugin-current.jpg)

![CloudBase の Trae 設定ガイド](../../../../zh-cn/stage-3/cross-platform/wechat-miniprogram-backend/images/cloudbase-trae-guide-current.jpg)

DevTools からクラウド環境を作成します。料金と無料枠は変わるため、現在の画面を確認してください。環境 ID は一か所で管理し、後で開発・テスト・本番を取り違えないようにします。

![クラウド環境作成の現行ガイド](../../../../zh-cn/stage-3/cross-platform/wechat-miniprogram-backend/images/cloudbase-create-env-guide-current.jpg)

![CloudBase コンソールの現行ログイン画面](../../../../zh-cn/stage-3/cross-platform/wechat-miniprogram-backend/images/cloudbase-console-current.jpg)

## 3. 三つの画面から始める

> 現在のプロジェクトを顧客サポート用ミニプログラムに変更してください。会員ホーム、チケット作成、自分のチケットを追加し、最初はサンプルデータで動かします。

変更計画を読んでから実行し、DevTools で再度起動します。間違っていれば先に戻します。

## 4. 最初のクラウド関数

> サーバー時刻を返すクラウド関数を一つ追加し、画面のボタンから呼び出してください。どこでデプロイするかも教えてください。

時刻が実際に変わることを確認した後で本人確認を加えます。

> 現在の利用者は WeChat の信頼できる呼び出し情報から取得し、画面が送るユーザー ID や役割を信用しないでください。

## 5. 最初のチケットを保存する

> クラウド関数経由でチケットを保存してください。必須項目をサーバーで確認し、信頼できる現在利用者を所有者として記録し、分かりやすい番号を返します。

![Northstar Service Hub の会員・チケット画面](../../../../zh-cn/stage-3/cross-platform/wechat-miniprogram-backend/images/wechat-enterprise-service-hub.png)

画面の番号と DB の一件が一致して初めて成功です。

![CloudBase ドキュメント DB ガイド](../../../../zh-cn/stage-3/cross-platform/wechat-miniprogram-backend/images/cloudbase-database-guide-current.jpg)

クラウド関数や管理 API の書き込みでは `_openid` は自動生成されません。所有権が必要なら、信頼できる呼び出し情報から関数が明示的に保存します。

## 6. 重複と越権を防ぐ

> 各送信に同じ `clientRequestId` を使えるようにし、同じ ID の再試行では元のチケットを返してください。

同じ ID を独立して二回送信し、同じ番号、一件の DB レコードになることを確認します。

> 自分のチケットは現在の信頼できる利用者の記録だけを返し、画面で ID を変えても他人のデータを読めないようにしてください。

二つの WeChat アカウントで相互に確認します。ボタンを隠すだけでは権限制御になりません。

## 7. 写真、ログ、公開

> 一つのチケットに写真を三枚まで追加し、形式と容量を制限し、進捗と再試行を表示してください。

失敗時は画面エラーとクラウド関数ログを一緒に渡します。

> 画面エラー：【貼る】。関数ログ：【貼る】。最初に失敗した一か所だけを修正してください。

![CloudBase ログ検索ガイド](../../../../zh-cn/stage-3/cross-platform/wechat-miniprogram-backend/images/cloudbase-log-guide-current.jpg)

公開前に本番環境、関数、コレクション、インデックス、権限規則、ログ、警告を確認し、二アカウントの分離を体験版でも繰り返します。

A が作ったチケットを別端末でも見られ、DB に同じ一件があり、B は読めない。ここまで確認できれば、予約、修理、会員、アフターサービスへ同じ設計を広げられます。
