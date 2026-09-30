---
title: 'Cómo desarrollar una aplicación multiplataforma con Flutter'
description: 'Crea un libro de gastos de tienda y verifica formularios, guardado local, pruebas y compilación Web.'
---

# Cómo desarrollar una aplicación multiplataforma con Flutter

Flutter encaja cuando Android e iOS necesitan casi el mismo producto y diseño. Usa Dart. En este capítulo construimos un libro de gastos que actualiza el total diario y conserva los registros al volver a abrirlo.

## 1. Aprende de productos reales

My BMW pone primero el estado del vehículo; Google Pay confirma inmediatamente el resultado; Nubank organiza cuenta y ayuda con una jerarquía tranquila.

![My BMW](../../../../zh-cn/stage-3/cross-platform/flutter-app/images/flutter-real-bmw.webp)

![Google Pay](../../../../zh-cn/stage-3/cross-platform/flutter-app/images/flutter-real-google-pay.webp)

![Nubank](../../../../zh-cn/stage-3/cross-platform/flutter-app/images/flutter-real-nubank.png)

## 2. Ejecuta el proyecto

```bash
flutter doctor
flutter create store_expense_ledger
cd store_expense_ledger
flutter run -d chrome
```

## 3. Crea la pantalla y el formulario

> Sustituye el contador por una pantalla de gastos con total de hoy, lista y botón Añadir gasto.

![Libro de gastos en ejecución](../../../../zh-cn/stage-3/cross-platform/flutter-app/images/flutter-expense-home.png)

> Añade un formulario con categoría, descripción, importe, Guardar y Cancelar.

![Formulario real](../../../../zh-cn/stage-3/cross-platform/flutter-app/images/flutter-expense-form.png)

## 4. Valida y guarda

> Muestra un error bajo cada campo vacío o importe menor o igual que cero. No guardes esos datos.

![Errores por campo](../../../../zh-cn/stage-3/cross-platform/flutter-app/images/flutter-expense-validation.png)

> Al guardar, cierra el formulario, añade la fila arriba, actualiza el total y muestra una confirmación.

![Resultado después de guardar](../../../../zh-cn/stage-3/cross-platform/flutter-app/images/flutter-expense-saved.png)

## 5. Conserva los datos

> Guarda los gastos en el dispositivo y recupéralos al iniciar. No añadas cuentas ni servidor todavía.

Guarda dos registros, recarga y vuelve a abrir. Después añade edición, confirmación de borrado, identificadores estables y backend de empresa, uno por uno.

## 6. Prueba y compila

```bash
flutter analyze
flutter test
flutter build web
```

Se verificaron Flutter 3.44.9, Dart 3.12.2, análisis, Widget Test, compilación Web, validación y persistencia. Al faltar Android SDK y un runtime de iOS Simulator, no se presenta la compilación móvil como terminada.
