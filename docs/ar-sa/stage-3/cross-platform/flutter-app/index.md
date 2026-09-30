---
title: 'تطوير تطبيق متعدد المنصات باستخدام Flutter'
description: 'أنشئ سجل مصروفات متجر واختبر النموذج والتخزين المحلي والاختبارات وبناء الويب.'
---

# تطوير تطبيق متعدد المنصات باستخدام Flutter

يناسب Flutter المنتجات التي تحتاج تجربة متقاربة على Android وiOS. يستخدم لغة Dart. سنبني سجل مصروفات يحدّث إجمالي اليوم ويحتفظ بالسجلات بعد إعادة الفتح.

## 1. تعلّم من منتجات حقيقية

يعرض My BMW حالة السيارة أولًا، ويؤكد Google Pay النتيجة فورًا، وينظم Nubank الحساب والمساعدة بهدوء.

![My BMW](../../../../zh-cn/stage-3/cross-platform/flutter-app/images/flutter-real-bmw.webp)

![Google Pay](../../../../zh-cn/stage-3/cross-platform/flutter-app/images/flutter-real-google-pay.webp)

![Nubank](../../../../zh-cn/stage-3/cross-platform/flutter-app/images/flutter-real-nubank.png)

## 2. شغّل المشروع

```bash
flutter doctor
flutter create store_expense_ledger
cd store_expense_ledger
flutter run -d chrome
```

## 3. الشاشة والنموذج

> استبدل مثال العداد بصفحة مصروفات تعرض إجمالي اليوم والقائمة وزر الإضافة.

![سجل المصروفات يعمل](../../../../zh-cn/stage-3/cross-platform/flutter-app/images/flutter-expense-home.png)

> أضف الفئة والوصف والمبلغ والحفظ والإلغاء.

![النموذج الفعلي](../../../../zh-cn/stage-3/cross-platform/flutter-app/images/flutter-expense-form.png)

## 4. التحقق والحفظ

> اعرض خطأ تحت الحقل الفارغ أو المبلغ الأصغر من أو المساوي للصفر ولا تحفظه.

![أخطاء الحقول](../../../../zh-cn/stage-3/cross-platform/flutter-app/images/flutter-expense-validation.png)

> بعد الحفظ أغلق النموذج وأضف السجل في الأعلى وحدّث الإجمالي ورسالة النجاح.

![النتيجة المحفوظة](../../../../zh-cn/stage-3/cross-platform/flutter-app/images/flutter-expense-saved.png)

## 5. احتفظ بالبيانات

> احفظ المصروفات على الجهاز واستعدها عند البدء. لا تضف حسابًا أو خادمًا بعد.

احفظ سجلين ثم أعد التحميل والفتح. بعد ذلك أضف التعديل وتأكيد الحذف والمعرفات الثابتة والخلفية خطوة خطوة.

## 6. الاختبار والبناء

```bash
flutter analyze
flutter test
flutter build web
```

تم التحقق من Flutter 3.44.9 وDart 3.12.2 والتحليل وWidget Test وبناء الويب والتحقق والحفظ. لعدم توفر Android SDK وruntime صالح لمحاكي iOS، لا نعرض بناء الهاتف على أنه مكتمل.
