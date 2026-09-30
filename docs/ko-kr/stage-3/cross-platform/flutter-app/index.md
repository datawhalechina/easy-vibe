---
title: 'Flutter로 크로스 플랫폼 앱 만들기'
description: '매장 경비 장부를 만들며 폼, 저장, 로컬 지속성, Web 빌드를 검증하고 모바일 출시의 경계를 이해합니다.'
---

# Flutter로 크로스 플랫폼 앱 만들기

Flutter는 Android와 iOS에 비슷한 기능과 디자인을 제공할 때 잘 맞습니다. 언어는 Dart입니다. 이번에는 경비를 입력하고 오늘의 합계를 갱신하며 다시 열어도 기록이 남는 매장 경비 장부를 만듭니다.

## 1. 실제 Flutter 제품을 본다

My BMW는 차량 상태를 먼저, Google Pay는 행동의 성공 여부를 즉시, Nubank는 계좌와 도움말을 차분한 정보 계층으로 보여 줍니다.

![My BMW 차량 화면](../../../../zh-cn/stage-3/cross-platform/flutter-app/images/flutter-real-bmw.webp)

![Google Pay 결과 화면](../../../../zh-cn/stage-3/cross-platform/flutter-app/images/flutter-real-google-pay.webp)

![Nubank 계좌 화면](../../../../zh-cn/stage-3/cross-platform/flutter-app/images/flutter-real-nubank.png)

## 2. 프로젝트를 실행한다

```bash
flutter doctor
flutter create store_expense_ledger
cd store_expense_ledger
flutter run -d chrome
```

`flutter doctor`가 Web을 통과해도 Android SDK, Xcode, 서명이 준비된 것은 아닙니다.

## 3. 첫 화면과 폼

> 카운터 샘플을 매장 경비 홈으로 바꿔 주세요. 오늘의 합계, 경비 목록, 추가 버튼을 보여 주세요.

![실행 중인 경비 장부](../../../../zh-cn/stage-3/cross-platform/flutter-app/images/flutter-expense-home.png)

> 분류, 설명, 금액, 저장, 취소가 있는 경비 폼을 추가해 주세요.

![경비 입력 폼](../../../../zh-cn/stage-3/cross-platform/flutter-app/images/flutter-expense-form.png)

## 4. 오류와 저장 결과

> 빈 값과 0 이하 금액은 각 입력란 아래에 오류를 보여 주고 저장하지 마세요.

![필드별 검증 메시지](../../../../zh-cn/stage-3/cross-platform/flutter-app/images/flutter-expense-validation.png)

> 저장 뒤 폼을 닫고 목록 맨 위에 추가하며 합계와 성공 메시지를 갱신해 주세요.

![저장 뒤 갱신된 화면](../../../../zh-cn/stage-3/cross-platform/flutter-app/images/flutter-expense-saved.png)

## 5. 다시 열어도 남게 한다

> 경비 기록을 기기에 저장하고 시작할 때 복원해 주세요. 계정과 서버는 아직 추가하지 않습니다.

두 건을 저장하고 새로고침과 재실행을 테스트합니다. 그다음 편집, 삭제 확인, 안정적인 ID, 회사 백엔드를 차례로 추가합니다.

## 6. 검사와 빌드

```bash
flutter analyze
flutter test
flutter build web
```

이 예제는 Flutter 3.44.9와 Dart 3.12.2에서 분석, Widget Test, Web 빌드, 검증, 저장, 새로고침 복원을 통과했습니다. Android SDK와 사용 가능한 iOS Simulator Runtime이 없어 모바일 빌드와 출시를 완료했다고 주장하지 않습니다.
