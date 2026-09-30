---
title: 'Eine plattformübergreifende App mit Flutter entwickeln'
description: 'Ein Filialausgabenbuch bauen und Formular, lokales Speichern, Tests und Web-Build prüfen.'
---

# Eine plattformübergreifende App mit Flutter entwickeln

Flutter eignet sich, wenn Android und iOS nahezu dasselbe Produkt und Design erhalten sollen. Die Sprache ist Dart. Wir bauen ein Ausgabenbuch, das die Tagessumme aktualisiert und Einträge nach erneutem Öffnen behält.

## 1. Von realen Produkten lernen

My BMW zeigt zuerst den Fahrzeugzustand, Google Pay bestätigt Ergebnisse sofort und Nubank ordnet Konto und Hilfe ruhig.

![My BMW](../../../../zh-cn/stage-3/cross-platform/flutter-app/images/flutter-real-bmw.webp)

![Google Pay](../../../../zh-cn/stage-3/cross-platform/flutter-app/images/flutter-real-google-pay.webp)

![Nubank](../../../../zh-cn/stage-3/cross-platform/flutter-app/images/flutter-real-nubank.png)

## 2. Projekt starten

```bash
flutter doctor
flutter create store_expense_ledger
cd store_expense_ledger
flutter run -d chrome
```

## 3. Bildschirm und Formular

> Ersetze den Zähler durch eine Ausgabenseite mit heutiger Summe, Liste und Hinzufügen-Schaltfläche.

![Laufendes Ausgabenbuch](../../../../zh-cn/stage-3/cross-platform/flutter-app/images/flutter-expense-home.png)

> Ergänze Kategorie, Beschreibung, Betrag, Speichern und Abbrechen.

![Echtes Formular](../../../../zh-cn/stage-3/cross-platform/flutter-app/images/flutter-expense-form.png)

## 4. Prüfen und speichern

> Zeige unter leeren Feldern und Beträgen bis null einen Fehler und speichere nicht.

![Feldfehler](../../../../zh-cn/stage-3/cross-platform/flutter-app/images/flutter-expense-validation.png)

> Schließe nach dem Speichern das Formular, füge den Eintrag oben ein, aktualisiere Summe und Erfolgsmeldung.

![Gespeichertes Ergebnis](../../../../zh-cn/stage-3/cross-platform/flutter-app/images/flutter-expense-saved.png)

## 5. Daten behalten

> Speichere Ausgaben auf dem Gerät und stelle sie beim Start wieder her. Noch keine Konten und kein Server.

Speichere zwei Einträge, lade neu und öffne erneut. Danach folgen Bearbeiten, Löschbestätigung, stabile IDs und Backend einzeln.

## 6. Test und Build

```bash
flutter analyze
flutter test
flutter build web
```

Flutter 3.44.9, Dart 3.12.2, Analyse, Widget Test, Web-Build, Validierung und Persistenz wurden geprüft. Ohne Android SDK und nutzbare iOS-Simulator-Runtime gelten mobile Builds nicht als abgeschlossen.
