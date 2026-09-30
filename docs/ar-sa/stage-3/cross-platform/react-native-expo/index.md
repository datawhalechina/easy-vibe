---
title: 'إنشاء تطبيق تفتيش متجر باستخدام React Native وExpo'
description: 'من مشروع Expo فارغ إلى سجل تفتيش محفوظ، مع فهم حدود Android وiOS والويب.'
---

# إنشاء تطبيق تفتيش متجر باستخدام React Native وExpo

تفحص سلسلة متاجر الإضاءة وبطاقات الأسعار والممرات ومخارج الطوارئ كل يوم. يضع الموظف العلامات على الهاتف ويكتب ملاحظة ويحفظ النتيجة. يناسب هذا التدفق React Native وExpo.

## 1. دور الأداتين

ينشئ React Native واجهات Android وiOS أصلية باستخدام React وTypeScript. يضيف Expo إنشاء المشروع وخادم التطوير وواجهات الجهاز والبناء والتحديث.

![بنية React Native وExpo](../../../../zh-cn/stage-3/cross-platform/react-native-expo/images/react-native-expo-architecture.svg)

## 2. ثلاثة منتجات حقيقية

Shopify POS منصة بيع ومخزون للمتاجر، وDiscord يشارك المنتج بين Android وiOS، وMTA TrainTime يبين استخدام Expo في تطبيق نقل رسمي.

![Shopify POS](../../../../zh-cn/stage-3/cross-platform/react-native-expo/images/shopify-pos-product.jpg)

![Discord على Android](../../../../zh-cn/stage-3/cross-platform/react-native-expo/images/discord-react-native-roles.png)

![MTA TrainTime](../../../../zh-cn/stage-3/cross-platform/react-native-expo/images/expo-mta-case.webp)

## 3. أنشئ المشروع والقائمة

```bash
npx create-expo-app@latest store-inspection
cd store-inspection
npm run web
```

> حوّل المثال إلى شاشة تفتيش تعرض المتجر وتقدم اليوم وزر البدء.

> أضف الإضاءة والأسعار والممرات والمخارج، وحدّث الحالة والتقدم عند الضغط.

![التطبيق يعمل في Expo Web](../../../../zh-cn/stage-3/cross-platform/react-native-expo/images/expo-web-running.png)

![التخطيط الضيق](../../../../zh-cn/stage-3/cross-platform/react-native-expo/images/expo-web-mobile-layout.png)

## 4. احفظ سجلًا

> أضف ملاحظة وزر حفظ، ثم اعرض الوقت وعدد العناصر والملاحظة في بطاقة.

![سجل محفوظ فعليًا](../../../../zh-cn/stage-3/cross-platform/react-native-expo/images/expo-web-record-saved.png)

> احفظ التقدم والسجلات على الجهاز واستعدها عند الفتح. لا تضف خادمًا بعد.

يكفي `AsyncStorage` للقيم البسيطة، بينما يناسب `expo-sqlite` العلاقات بين التفتيش والتفاصيل والمهام المعلقة.

## 5. أضف الصورة والخلفية لاحقًا

> اسمح بإرفاق صورة بعنصر غير مكتمل مع معاينة وحذف.

> صِل واجهة تسجيل الدخول الحالية واعرض المتاجر التي يخصصها الخادم فقط.

احفظ رمز الهاتف في `SecureStore`. لا تضع أسرار الشركة في التطبيق أو متغيرات `EXPO_PUBLIC_`. أضف المزامنة دون اتصال بعد استقرار التخزين المحلي وواجهة API.

## 6. أكمل الاختبار على أجهزة حقيقية

يناسب Expo Go البداية، بينما تحتاج الشفرة الأصلية المخصصة إلى development build. اختبر لوحة المفاتيح والصلاحيات والصور وإعادة التشغيل وضعف الشبكة والخروج والترقية على Android وiPhone.

تم اختبار النموذج باستخدام Expo SDK 57 وTypeScript وتصدير ويب حقيقي. لم يتوفر محاكي Android أو runtime لمحاكي iOS، لذلك لا ندعي إكمال بناء الهاتف أو التوقيع.
