---
title: 'Xây dựng WeChat Mini Program có backend'
description: 'Thêm danh tính tin cậy, cloud function, ticket, database, quyền và log vào Mini Program đã chạy.'
---

# Xây dựng WeChat Mini Program có backend

Bài trước tạo giao diện chạy trên điện thoại. Bây giờ ta thêm danh tính, dữ liệu dùng chung, quyền, file và log cho dịch vụ doanh nghiệp.

![WeChat Mini Program của Uber](../../../../zh-cn/stage-3/cross-platform/wechat-miniprogram/images/wechat-uber-mini-program.webp)

## 1. Frontend là lối vào, backend quyết định

Frontend chứa trang và biểu mẫu. Backend nhận diện người dùng, kiểm tra quyền và ghi dữ liệu. Không tin ID hay vai trò do trang gửi lên.

Đường ngắn nhất dùng WeChat Cloud Development, cloud function, database tài liệu và storage. Doanh nghiệp có API HTTPS sẵn có thể tiếp tục dùng; không phải Mini Program có backend nào cũng bắt buộc mua CloudBase.

## 2. Chuẩn bị môi trường

![Plugin CloudBase AI](../../../../zh-cn/stage-3/cross-platform/wechat-miniprogram-backend/images/cloudbase-ai-plugin-current.jpg)

![Hướng dẫn Trae hiện tại](../../../../zh-cn/stage-3/cross-platform/wechat-miniprogram-backend/images/cloudbase-trae-guide-current.jpg)

Kiểm tra giá và quota hiện tại, tạo môi trường và giữ environment ID ở một chỗ.

> Thêm trang thành viên, Tạo ticket và Ticket của tôi. Trước tiên dùng dữ liệu mẫu.

## 3. Function đầu tiên và danh tính tin cậy

> Thêm cloud function trả thời gian máy chủ và nút gọi nó. Chỉ rõ nơi deploy.

> Lấy người dùng hiện tại từ ngữ cảnh WeChat tin cậy, không từ ID hay vai trò do trang gửi.

## 4. Lưu ticket

> Kiểm tra trường bắt buộc ở máy chủ, lưu người dùng tin cậy làm chủ sở hữu và trả số ticket dễ đọc.

![Northstar Service Hub](../../../../zh-cn/stage-3/cross-platform/wechat-miniprogram-backend/images/wechat-enterprise-service-hub.png)

Số trên trang phải khớp một bản ghi database.

![Hướng dẫn database tài liệu](../../../../zh-cn/stage-3/cross-platform/wechat-miniprogram-backend/images/cloudbase-database-guide-current.jpg)

Ghi từ cloud function hoặc API quản trị không tự tạo `_openid`. Function phải lưu quyền sở hữu từ ngữ cảnh tin cậy.

## 5. Chặn trùng lặp và truy cập sai quyền

> Nếu cùng `clientRequestId` được gửi lại, trả ticket cũ và không tạo ticket mới.

> Ticket của tôi chỉ trả dữ liệu của người dùng tin cậy hiện tại dù trang thay đổi ID.

Test bằng hai tài khoản WeChat. Ẩn nút không phải kiểm soát quyền.

## 6. Ảnh, log và phát hành

> Cho phép ba ảnh mỗi ticket, giới hạn loại và kích thước, hiện tiến độ và thử lại.

![Hướng dẫn tìm log](../../../../zh-cn/stage-3/cross-platform/wechat-miniprogram-backend/images/cloudbase-log-guide-current.jpg)

Trước khi phát hành, kiểm tra production environment, function, collection, index, rule, log và cảnh báo. Luồng đầu hoàn tất khi A tạo ticket và thấy trên thiết bị khác, database có đúng một bản ghi, còn B không đọc được.
