---
title: 'React Native + Expo で店舗点検アプリをゼロから作る'
description: '空の Expo プロジェクトから、記録を保存できる店舗点検アプリを作り、Android・iOS・Web の境界を理解します。'
---

# React Native + Expo で店舗点検アプリをゼロから作る

チェーン店では、照明、価格表示、通路、非常口を毎日確認します。スタッフがスマートフォンで項目をチェックし、メモを残して保存する。管理者はブラウザでも確認したい。このような業務アプリは React Native と Expo に向いています。

## 1. React Native と Expo の役割

React Native は React と TypeScript で Android・iOS のネイティブ UI を作ります。Expo はプロジェクト作成、開発サーバー、一般的な端末 API、ビルド、更新をまとめます。

「一つのコードベース」は、すべての行が同じという意味ではありません。画面と業務ロジックを共有し、本当に必要なプラットフォーム差だけを分けます。

## 2. 実運用されている三つの製品

**Shopify POS** は実店舗の会計、在庫、周辺機器を扱う販売プラットフォームです。店舗で使う低性能端末でも実測すること、次の作業と今日の進捗を最初に見せることが参考になります。

![Shopify POS の店舗・在庫画面](../../../../zh-cn/stage-3/cross-platform/react-native-expo/images/shopify-pos-product.jpg)

**Discord** はコミュニティ向けコミュニケーション製品です。Android と iOS で多くのコードを共有しながら、必要な差分を残しています。

![Discord の Android ロール画面の比較](../../../../zh-cn/stage-3/cross-platform/react-native-expo/images/discord-react-native-roles.png)

**MTA TrainTime** はニューヨーク近郊鉄道の公式経路・乗車券アプリです。Expo が試作品だけでなく、本番のビルドとリリースにも使われる例です。

![Expo 公式事例の MTA TrainTime](../../../../zh-cn/stage-3/cross-platform/react-native-expo/images/expo-mta-case.webp)

## 3. 最初のプロジェクトを作る

```bash
npx create-expo-app@latest store-inspection
cd store-inspection
npm run web
```

サンプルがブラウザで開いたら、AI に次の一件だけ頼みます。

> Expo のサンプルを店舗点検のホーム画面に変更してください。店舗名、今日の進捗、「点検を開始」ボタンを表示します。

![React Native と Expo の構成](../../../../zh-cn/stage-3/cross-platform/react-native-expo/images/react-native-expo-architecture.svg)

## 4. 点検表を追加する

> 照明、価格表示、通路、非常口の四項目を持つ点検画面を追加してください。タップで完了状態を切り替え、進捗数を更新します。

四項目を操作し、一つを解除して数が戻ることまで確認します。

![Expo Web で実際に動く点検アプリ](../../../../zh-cn/stage-3/cross-platform/react-native-expo/images/expo-web-running.png)

ブラウザを狭くして、横スクロールや文字切れがないか確認します。

![同じアプリの狭い画面](../../../../zh-cn/stage-3/cross-platform/react-native-expo/images/expo-web-mobile-layout.png)

## 5. 一件の記録を保存する

> 現場メモと保存ボタンを追加してください。保存後、時刻、完了数、メモを記録カードとして表示します。

![クリックして保存した実際の点検記録](../../../../zh-cn/stage-3/cross-platform/react-native-expo/images/expo-web-record-saved.png)

次に端末内へ残します。

> 点検の進捗と記録を端末に保存し、アプリを開き直したときに復元してください。サーバーはまだ追加しません。

少量なら `AsyncStorage`、点検票・明細・送信待ちの関係が増えたら `expo-sqlite` が扱いやすくなります。

## 6. 写真、ログイン、バックエンドは順番に追加する

> 未完了項目に写真を一枚添付できるようにし、プレビューと削除を追加してください。

> 既存のログイン API を接続し、サーバーが割り当てた店舗だけを表示してください。

認証情報は `SecureStore` に保存します。会社全体の秘密鍵をアプリや `EXPO_PUBLIC_` 変数へ入れてはいけません。

オフライン同期は、通信がない間は端末へ保存し、復帰後に送信する仕組みです。通常の保存と API が動いてから、送信待ち、再試行、一意な要求 ID を追加します。

## 7. 最後は実機で確認する

Expo Go は初期開発に便利です。独自ネイティブ機能を加えたら development build を使います。公開前には Android と iPhone の実機で、キーボード、権限、写真、再起動、弱い通信、再試行、ログアウト、更新を確認してください。

この章の試作は Expo SDK 57 と TypeScript で作成し、型チェック、Web 本番出力、チェック操作、記録保存を実行しました。この環境には Android エミュレーターと iOS Simulator Runtime がなかったため、モバイルビルド、署名、ストア公開を完了とは記載していません。

まず「開く、項目を完了する、メモを保存する、開き直して確認する」という短い流れを安定させてください。
