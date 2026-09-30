---
title: 'Ein WeChat Mini-Programm mit Backend bauen'
description: 'Vertrauenswürdige Identität, Cloud-Funktionen, Service-Tickets, Datenbank, Rechte und Logs ergänzen.'
---

# Ein WeChat Mini-Programm mit Backend bauen

Die vorige Lektion baute die Oberfläche auf dem Telefon. Nun kommen Identität, gemeinsame Daten, Rechte, Dateien und Logs eines Unternehmensdienstes hinzu.

![Uber WeChat Mini-Programm](../../../../zh-cn/stage-3/cross-platform/wechat-miniprogram/images/wechat-uber-mini-program.webp)

## 1. Das Frontend ist der Eingang, das Backend entscheidet

Das Frontend enthält Seiten und Formulare. Das Backend identifiziert Nutzer, prüft Rechte und schreibt Daten. IDs und Rollen aus der Seite sind veränderbar und nicht vertrauenswürdig.

Der kürzeste Weg nutzt WeChat Cloud Development, Cloud-Funktionen, Dokumentdatenbank und Speicher. Ein vorhandenes Unternehmens-API kann weiterverwendet werden; CloudBase ist nicht für jedes Backend-Mini-Programm Pflicht.

## 2. Umgebung vorbereiten

![CloudBase AI Plugin](../../../../zh-cn/stage-3/cross-platform/wechat-miniprogram-backend/images/cloudbase-ai-plugin-current.jpg)

![Aktueller Trae-Leitfaden](../../../../zh-cn/stage-3/cross-platform/wechat-miniprogram-backend/images/cloudbase-trae-guide-current.jpg)

Prüfe aktuelle Preise und Kontingente, erstelle die Umgebung und verwalte ihre ID zentral.

> Ergänze Mitglieder-Startseite, Ticket erstellen und Meine Tickets. Nutze zuerst Beispieldaten.

## 3. Erste Funktion und sichere Identität

> Ergänze eine Cloud-Funktion für Serverzeit und eine aufrufende Schaltfläche. Nenne den Ort zum Bereitstellen.

> Ermittle den aktuellen Nutzer aus dem vertrauenswürdigen WeChat-Kontext, nicht aus ID oder Rolle der Seite.

## 4. Ein Ticket speichern

> Prüfe Pflichtfelder serverseitig, speichere den sicheren Nutzer als Eigentümer und liefere eine Ticketnummer.

![Northstar Service Hub](../../../../zh-cn/stage-3/cross-platform/wechat-miniprogram-backend/images/wechat-enterprise-service-hub.png)

Nummer auf der Seite und Datenbankeintrag müssen übereinstimmen.

![Dokumentdatenbank-Leitfaden](../../../../zh-cn/stage-3/cross-platform/wechat-miniprogram-backend/images/cloudbase-database-guide-current.jpg)

Schreibvorgänge aus Cloud-Funktion oder Admin-API erzeugen `_openid` nicht automatisch. Die Funktion speichert Eigentum aus dem vertrauenswürdigen Kontext.

## 5. Duplikate und Fremdzugriff verhindern

> Beim gleichen `clientRequestId` das ursprüngliche Ticket liefern und kein zweites anlegen.

> Meine Tickets liefert nur Daten des aktuellen sicheren Nutzers, auch wenn die Seite eine ID ändert.

Teste mit zwei WeChat-Konten. Eine versteckte Schaltfläche ist keine Berechtigung.

## 6. Fotos, Logs und Veröffentlichung

> Erlaube drei Fotos pro Ticket, begrenze Typ und Größe und zeige Fortschritt und Wiederholung.

![CloudBase-Logsuche](../../../../zh-cn/stage-3/cross-platform/wechat-miniprogram-backend/images/cloudbase-log-guide-current.jpg)

Vor dem Release werden Produktionsumgebung, Funktionen, Collections, Indizes, Regeln, Logs und Alarme geprüft. Fertig ist der erste Ablauf, wenn A ein Ticket auf einem zweiten Gerät sieht, die Datenbank genau einen Eintrag hat und B ihn nicht lesen kann.
