---
title: 'React Native + Expo로 매장 점검 앱 만들기'
description: '빈 Expo 프로젝트에서 기록을 저장하는 매장 점검 앱까지 만들고 Android, iOS, Web의 경계를 배웁니다.'
---

# React Native + Expo로 매장 점검 앱 만들기

체인 매장은 조명, 가격표, 통로, 비상구를 매일 점검합니다. 직원은 휴대폰에서 항목을 체크하고 메모를 저장하며, 관리자는 브라우저에서도 결과를 보고 싶어 합니다. 이런 업무 앱은 React Native와 Expo에 잘 맞습니다.

## 1. React Native와 Expo의 역할

React Native는 React와 TypeScript로 Android·iOS 네이티브 UI를 만듭니다. Expo는 프로젝트 생성, 개발 서버, 일반적인 기기 API, 빌드와 업데이트를 제공합니다.

![React Native와 Expo 프로젝트 구조](../../../../zh-cn/stage-3/cross-platform/react-native-expo/images/react-native-expo-architecture.svg)

## 2. 실제 제품에서 배운다

Shopify POS는 실제 매장의 결제·재고 플랫폼입니다. 다음 작업과 오늘의 진행률을 첫 화면에 보여 주고, 매장에서 쓰는 저사양 기기에서도 테스트해야 한다는 점을 참고할 수 있습니다.

![Shopify POS 매장 화면](../../../../zh-cn/stage-3/cross-platform/react-native-expo/images/shopify-pos-product.jpg)

Discord는 Android와 iOS에서 제품 코드를 공유하면서 필요한 플랫폼 차이를 남깁니다. MTA TrainTime은 Expo의 빌드와 출시 도구가 실제 교통 앱에도 쓰이는 사례입니다.

![Discord Android 역할 화면](../../../../zh-cn/stage-3/cross-platform/react-native-expo/images/discord-react-native-roles.png)

![Expo 사례의 MTA TrainTime](../../../../zh-cn/stage-3/cross-platform/react-native-expo/images/expo-mta-case.webp)

## 3. 첫 프로젝트와 점검표

```bash
npx create-expo-app@latest store-inspection
cd store-inspection
npm run web
```

> Expo 샘플을 매장 점검 홈으로 바꿔 주세요. 매장 이름, 오늘의 진행률, 점검 시작 버튼을 보여 주세요.

> 조명, 가격표, 통로, 비상구 네 항목을 추가하고 탭할 때 완료 상태와 진행률을 바꿔 주세요.

![Expo Web에서 실행한 점검 앱](../../../../zh-cn/stage-3/cross-platform/react-native-expo/images/expo-web-running.png)

![좁은 화면의 같은 앱](../../../../zh-cn/stage-3/cross-platform/react-native-expo/images/expo-web-mobile-layout.png)

## 4. 기록을 저장한다

> 현장 메모와 저장 버튼을 추가하고, 저장 뒤 시간·완료 수·메모를 기록 카드로 보여 주세요.

![실제로 저장한 점검 기록](../../../../zh-cn/stage-3/cross-platform/react-native-expo/images/expo-web-record-saved.png)

> 진행률과 기록을 기기에 저장하고 다시 열 때 복원해 주세요. 서버는 아직 추가하지 않습니다.

간단한 값은 `AsyncStorage`, 점검표·상세 항목·전송 대기 작업의 관계가 생기면 `expo-sqlite`가 적합합니다.

## 5. 사진과 회사 백엔드를 순서대로 붙인다

> 미완료 항목에 사진 한 장을 첨부하고 미리보기와 삭제를 추가해 주세요.

> 기존 로그인 API를 연결하고 서버가 배정한 매장만 보여 주세요.

로그인 정보는 `SecureStore`에 둡니다. 회사 비밀 키는 앱이나 `EXPO_PUBLIC_` 변수에 넣지 않습니다. 오프라인 동기화는 로컬 저장과 API가 모두 안정된 후 전송 대기, 재시도, 고유 요청 ID 순으로 추가합니다.

## 6. 실제 기기에서 끝낸다

Expo Go는 초기 개발에 편리하고, 사용자 정의 네이티브 기능부터는 development build가 필요합니다. 출시 전 Android와 iPhone에서 키보드, 권한, 사진, 재시작, 약한 네트워크, 로그아웃, 업그레이드를 확인합니다.

이 예제는 Expo SDK 57, TypeScript, Web 빌드에서 타입 검사·클릭·저장을 실제로 확인했습니다. Android 에뮬레이터와 iOS Simulator Runtime이 없어 모바일 빌드와 서명을 완료했다고 쓰지 않았습니다.
