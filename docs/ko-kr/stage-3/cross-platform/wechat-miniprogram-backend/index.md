---
title: '백엔드가 있는 WeChat 미니프로그램 만들기'
description: '동작하는 미니프로그램에 신뢰할 수 있는 사용자 식별, 클라우드 함수, 서비스 티켓, DB, 권한, 로그를 추가합니다.'
---

# 백엔드가 있는 WeChat 미니프로그램 만들기

이전 장은 사용자 휴대폰에서 실행되는 화면을 만들었습니다. 이번에는 회사 서비스에 필요한 사용자 식별, 공유 데이터, 권한, 파일, 로그를 추가합니다.

![Uber WeChat 미니프로그램](../../../../zh-cn/stage-3/cross-platform/wechat-miniprogram/images/wechat-uber-mini-program.webp)

## 1. 프런트는 입구, 백엔드는 판단자다

프런트는 WeChat 안의 화면과 폼입니다. 백엔드는 신뢰할 수 있는 환경에서 사용자를 확인하고 권한과 DB 쓰기를 처리합니다. 화면이 보내는 사용자 ID와 관리자 역할은 바꿀 수 있으므로 믿지 않습니다.

처음에는 WeChat Cloud Development, 클라우드 함수, 문서 DB, 스토리지를 사용합니다. 회사에 기존 HTTPS API가 있다면 그대로 연결할 수 있으므로 모든 미니프로그램이 CloudBase를 구매해야 하는 것은 아닙니다.

## 2. 환경과 첫 화면

![CloudBase AI 플러그인](../../../../zh-cn/stage-3/cross-platform/wechat-miniprogram-backend/images/cloudbase-ai-plugin-current.jpg)

![CloudBase Trae 안내](../../../../zh-cn/stage-3/cross-platform/wechat-miniprogram-backend/images/cloudbase-trae-guide-current.jpg)

현재 요금과 무료 한도를 확인한 뒤 개발 환경을 만들고 환경 ID를 한 곳에서 관리합니다.

> 현재 프로젝트에 회원 홈, 티켓 만들기, 내 티켓 화면을 추가하고 우선 샘플 데이터로 실행해 주세요.

## 3. 첫 클라우드 함수와 신뢰할 수 있는 사용자

> 서버 시간을 반환하는 클라우드 함수와 호출 버튼을 추가하고 배포 위치를 알려 주세요.

> 현재 사용자는 WeChat의 신뢰할 수 있는 호출 정보에서 얻고, 페이지가 보내는 사용자 ID나 역할을 믿지 마세요.

## 4. 첫 티켓을 저장한다

> 필수 값을 서버에서 검사하고 신뢰할 수 있는 현재 사용자를 소유자로 기록한 뒤 티켓 번호를 반환해 주세요.

![Northstar Service Hub](../../../../zh-cn/stage-3/cross-platform/wechat-miniprogram-backend/images/wechat-enterprise-service-hub.png)

페이지의 번호와 DB 레코드가 일치해야 성공입니다.

![CloudBase 문서 DB 안내](../../../../zh-cn/stage-3/cross-platform/wechat-miniprogram-backend/images/cloudbase-database-guide-current.jpg)

클라우드 함수나 관리 API의 쓰기에는 `_openid`가 자동으로 생기지 않습니다. 소유권이 필요하면 함수가 신뢰할 수 있는 컨텍스트에서 직접 기록합니다.

## 5. 중복과 권한 오류를 막는다

> 같은 `clientRequestId` 재시도는 원래 티켓을 반환하고 새 티켓을 만들지 마세요.

> 내 티켓은 현재 신뢰할 수 있는 사용자의 데이터만 반환하고, 화면에서 ID를 바꿔도 다른 사용자의 기록을 읽지 못하게 해 주세요.

두 WeChat 계정으로 교차 테스트합니다. 버튼을 숨기는 것은 권한 제어가 아닙니다.

## 6. 사진, 로그, 출시

> 티켓당 사진 세 장까지 허용하고 형식과 크기를 제한하며 진행률과 재시도를 보여 주세요.

오류가 나면 화면 오류와 함수 로그를 함께 확인합니다.

![CloudBase 로그 검색 안내](../../../../zh-cn/stage-3/cross-platform/wechat-miniprogram-backend/images/cloudbase-log-guide-current.jpg)

출시 전 생산 환경, 함수, 컬렉션, 인덱스, 권한 규칙, 로그, 알림을 확인하고 두 계정 격리를 체험판에서 다시 시험합니다. A가 만든 티켓을 다른 기기에서도 보며 B가 읽지 못하면 첫 백엔드 흐름이 완성됩니다.
