---
title: 'Flutter でクロスプラットフォームアプリを作る'
description: '店舗経費帳を作り、フォーム、保存、永続化、Web ビルドを実測し、モバイル公開の境界を理解します。'
---

# Flutter でクロスプラットフォームアプリを作る

Flutter は Android と iOS でほぼ同じ機能とデザインを出したい製品に向いています。言語は Dart です。この章では、経費を入力し、今日の合計を更新し、再起動後も記録が残る店舗経費帳を作ります。

## 1. 実際の Flutter 製品から学ぶ

My BMW は車両状態、充電、整備、遠隔操作を一つにまとめ、現在の状態を最初に見せます。

![My BMW の車両状態とサービス](../../../../zh-cn/stage-3/cross-platform/flutter-app/images/flutter-real-bmw.webp)

Google Pay は支払い後の結果を明確に示し、Nubank は口座情報と支援機能を落ち着いた階層で整理します。

![Google Pay の結果表示](../../../../zh-cn/stage-3/cross-platform/flutter-app/images/flutter-real-google-pay.webp)

![Nubank の口座とヘルプ画面](../../../../zh-cn/stage-3/cross-platform/flutter-app/images/flutter-real-nubank.png)

経費帳でも、今日の合計、最新記録、追加ボタンの順に情報を置きます。

## 2. プロジェクトを作って起動する

```bash
flutter doctor
flutter create store_expense_ledger
cd store_expense_ledger
flutter run -d chrome
```

`flutter doctor` は実際に準備できた環境だけを示します。Web が動いても Android SDK、Xcode、署名まで完了したとは限りません。

## 3. 最初の経費画面

> カウンターのサンプルを店舗経費のホーム画面に変更してください。今日の合計、経費一覧、「経費を追加」ボタンを表示します。

![実際に動く店舗経費帳](../../../../zh-cn/stage-3/cross-platform/flutter-app/images/flutter-expense-home.png)

> ボタンから、カテゴリ、説明、金額、保存、キャンセルを持つフォームを開いてください。

![実行中の追加フォーム](../../../../zh-cn/stage-3/cross-platform/flutter-app/images/flutter-expense-form.png)

## 4. エラーと成功をはっきり見せる

> 未入力と 0 以下の金額は、該当欄の下に短いエラーを表示し、保存しないでください。

![空フォームの項目別エラー](../../../../zh-cn/stage-3/cross-platform/flutter-app/images/flutter-expense-validation.png)

> 保存後はフォームを閉じ、一覧の先頭へ追加し、合計を更新して成功メッセージを表示してください。

「事務用品」「プリンター用紙」「`56`」を入力し、合計、一覧、メッセージが一度だけ変わることを確認します。

![保存後に更新された合計と一覧](../../../../zh-cn/stage-3/cross-platform/flutter-app/images/flutter-expense-saved.png)

## 5. 再起動後もデータを残す

> 経費記録を端末内に保存し、起動時に復元してください。アカウントとサーバーはまだ追加しません。

二件保存し、再読み込み、タブを閉じて再度開く、という順で確認します。その後で編集、削除確認、安定した ID、会社のバックエンドを一つずつ追加します。

## 6. テストとビルド

```bash
flutter analyze
flutter test
flutter build web
```

Android には Android Studio、SDK、署名、実機が必要です。iOS には Mac、Xcode、Simulator Runtime または実機、署名が必要です。

この章では Flutter 3.44.9 と Dart 3.12.2 を使用し、静的解析、Widget Test、Web ビルド、入力検証、保存、再読み込み後の復元を実測しました。Android SDK と利用可能な iOS Simulator Runtime がなかったため、モバイルビルドと公開は完了扱いにしていません。

一件の経費を入力、検証、保存、復元できるところまで安定させてから、アカウントと同期を追加しましょう。
