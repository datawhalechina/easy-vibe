---
title: 'Phát triển ứng dụng đa nền tảng với Flutter'
description: 'Tạo sổ chi phí cửa hàng và kiểm tra biểu mẫu, lưu cục bộ, test và build Web.'
---

# Phát triển ứng dụng đa nền tảng với Flutter

Flutter phù hợp khi Android và iOS cần gần như cùng sản phẩm và phong cách. Ngôn ngữ là Dart. Ta sẽ tạo sổ chi phí cập nhật tổng hôm nay và giữ bản ghi sau khi mở lại.

## 1. Học từ sản phẩm thật

My BMW đặt trạng thái xe lên trước, Google Pay xác nhận kết quả ngay và Nubank sắp xếp tài khoản cùng trợ giúp rõ ràng.

![My BMW](../../../../zh-cn/stage-3/cross-platform/flutter-app/images/flutter-real-bmw.webp)

![Google Pay](../../../../zh-cn/stage-3/cross-platform/flutter-app/images/flutter-real-google-pay.webp)

![Nubank](../../../../zh-cn/stage-3/cross-platform/flutter-app/images/flutter-real-nubank.png)

## 2. Chạy dự án

```bash
flutter doctor
flutter create store_expense_ledger
cd store_expense_ledger
flutter run -d chrome
```

## 3. Màn hình và biểu mẫu

> Đổi ví dụ bộ đếm thành trang chi phí với tổng hôm nay, danh sách và nút Thêm.

![Sổ chi phí đang chạy](../../../../zh-cn/stage-3/cross-platform/flutter-app/images/flutter-expense-home.png)

> Thêm danh mục, mô tả, số tiền, Lưu và Hủy.

![Biểu mẫu thật](../../../../zh-cn/stage-3/cross-platform/flutter-app/images/flutter-expense-form.png)

## 4. Kiểm tra và lưu

> Hiện lỗi dưới ô trống hoặc số tiền nhỏ hơn hay bằng 0 và không lưu.

![Lỗi theo từng ô](../../../../zh-cn/stage-3/cross-platform/flutter-app/images/flutter-expense-validation.png)

> Sau khi lưu, đóng biểu mẫu, thêm dòng lên đầu, cập nhật tổng và thông báo thành công.

![Kết quả đã lưu](../../../../zh-cn/stage-3/cross-platform/flutter-app/images/flutter-expense-saved.png)

## 5. Giữ dữ liệu

> Lưu chi phí trên thiết bị và khôi phục khi khởi động. Chưa thêm tài khoản hay máy chủ.

Lưu hai dòng, tải lại rồi mở lại. Sau đó mới thêm sửa, xác nhận xóa, ID ổn định và backend từng bước.

## 6. Test và build

```bash
flutter analyze
flutter test
flutter build web
```

Flutter 3.44.9, Dart 3.12.2, phân tích, Widget Test, build Web, xác thực và lưu lâu dài đã được kiểm tra. Vì thiếu Android SDK và iOS Simulator runtime dùng được, build di động không được tuyên bố là hoàn tất.
