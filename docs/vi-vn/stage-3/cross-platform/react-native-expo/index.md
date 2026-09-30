---
title: 'Xây dựng ứng dụng kiểm tra cửa hàng bằng React Native và Expo'
description: 'Từ dự án Expo trống đến bản kiểm tra được lưu, đồng thời hiểu ranh giới Android, iOS và Web.'
---

# Xây dựng ứng dụng kiểm tra cửa hàng bằng React Native và Expo

Một chuỗi cửa hàng kiểm tra đèn, nhãn giá, lối đi và cửa thoát hiểm mỗi ngày. Nhân viên đánh dấu trên điện thoại, viết ghi chú và lưu kết quả. Luồng biểu mẫu này rất hợp với React Native và Expo.

## 1. Vai trò của hai công cụ

React Native tạo giao diện native Android và iOS bằng React và TypeScript. Expo bổ sung tạo dự án, máy chủ phát triển, API thiết bị, build và cập nhật.

![Cấu trúc React Native và Expo](../../../../zh-cn/stage-3/cross-platform/react-native-expo/images/react-native-expo-architecture.svg)

## 2. Ba sản phẩm thực tế

Shopify POS phục vụ bán hàng và kho tại cửa hàng; Discord chia sẻ sản phẩm giữa Android và iOS; MTA TrainTime cho thấy Expo trong ứng dụng giao thông chính thức.

![Shopify POS](../../../../zh-cn/stage-3/cross-platform/react-native-expo/images/shopify-pos-product.jpg)

![Discord Android](../../../../zh-cn/stage-3/cross-platform/react-native-expo/images/discord-react-native-roles.png)

![MTA TrainTime](../../../../zh-cn/stage-3/cross-platform/react-native-expo/images/expo-mta-case.webp)

## 3. Tạo dự án và danh sách

```bash
npx create-expo-app@latest store-inspection
cd store-inspection
npm run web
```

> Đổi ví dụ thành trang kiểm tra cửa hàng. Hiện tên cửa hàng, tiến độ hôm nay và nút bắt đầu.

> Thêm đèn, nhãn giá, lối đi và cửa thoát. Chạm để đổi trạng thái và cập nhật tiến độ.

![Ứng dụng chạy trong Expo Web](../../../../zh-cn/stage-3/cross-platform/react-native-expo/images/expo-web-running.png)

![Bố cục màn hình hẹp](../../../../zh-cn/stage-3/cross-platform/react-native-expo/images/expo-web-mobile-layout.png)

## 4. Lưu một bản ghi

> Thêm ghi chú và nút Lưu. Sau đó hiện thời gian, số mục hoàn thành và ghi chú trong một thẻ.

![Bản ghi thực sự đã lưu](../../../../zh-cn/stage-3/cross-platform/react-native-expo/images/expo-web-record-saved.png)

> Lưu tiến độ và bản ghi trên thiết bị rồi khôi phục khi mở lại. Chưa thêm máy chủ.

`AsyncStorage` đủ cho ít giá trị; `expo-sqlite` phù hợp hơn khi kiểm tra, chi tiết và hàng đợi có quan hệ.

## 5. Thêm ảnh và backend sau

> Cho phép đính kèm một ảnh vào mục chưa đạt, có xem trước và xóa.

> Kết nối API đăng nhập hiện có và chỉ hiện cửa hàng do máy chủ phân công.

Token di động đặt trong `SecureStore`. Không đặt bí mật công ty trong app hay biến `EXPO_PUBLIC_`. Chỉ thêm đồng bộ ngoại tuyến sau khi lưu cục bộ và API đều ổn định.

## 6. Hoàn tất trên thiết bị thật

Expo Go tiện ở giai đoạn đầu; code native tùy chỉnh cần development build. Trước khi phát hành, kiểm tra bàn phím, quyền, ảnh, khởi động lại, mạng yếu, đăng xuất và nâng cấp trên Android và iPhone.

Nguyên mẫu Expo SDK 57 và TypeScript đã được kiểm tra bằng export Web, thao tác và lưu thật. Không có Android emulator hay iOS Simulator runtime nên không tuyên bố build di động và ký đã hoàn tất.
