# So bauen Sie das einfachste WeChat Mini Program

# 1. Was WeChat Mini Programs und Mini-Program-Entwicklung sind

In diesem Tutorial werden wir einen vollständigen geschlossenen Kreislauf durchlaufen: von einer Idee in Ihrem Kopf zu einem echten Mini Program, das in WeChat per QR-Code gesucht und geöffnet werden kann.

Bevor wir mit dem Bauen beginnen, müssen wir zwei grundlegende Verständnisse aufbauen.

Das erste ist das **Wesen**: Was genau ist ein WeChat Mini Program? Wie unterscheidet es sich von einer normalen App oder Website? Warum entscheiden sich so viele Produkte für dieses Format? Nur wenn Sie die Kernlogik verstehen, können Sie beurteilen, ob Ihre Idee zu einem Mini Program passt.

Das zweite ist der **Pfad**: Wenn Sie sagen "Ich möchte ein Mini Program bauen", wie sieht der vollständige Pfad von null bis Veröffentlichung aus? Was sind die wichtigsten Knotenpunkte auf diesem Pfad - worüber man bei der Ideenfindung nachdenken muss, wie man die Umgebung einrichtet, wie KI-gestützte Entwicklung die Effizienz verbessert, welche Fallstricke beim Simulator-Debugging auftreten und was Testkonten versus formelle Veröffentlichung jeweils lösen. Wenn Sie diesen Prozess vorher gedanklich durchlaufen, werden Sie bei der Implementierung nicht den Überblick verlieren.

Nachdem diese beiden Fragen geklärt sind, können wir formell in die Entwicklung einsteigen. Beginnen wir mit der ersten Frage: Was genau ist ein WeChat Mini Program?

## 1.1 WeChat Mini Program

Ein WeChat Mini Program kann als eine App angesehen werden, die innerhalb von WeChat lebt. Sie müssen nicht in einem App Store suchen, herunterladen oder installieren. Nutzer können in WeChat nach Namen suchen, einen QR-Code scannen oder eine geteilte Karte öffnen und es sofort nutzen. Nach Gebrauch schließen sie es einfach. Es belegt nicht dauerhaft den Startbildschirm oder Speicher des Handys.

Für reguläre Nutzer lösen Mini Programs viele "kleine Aufgaben": Sendungsverfolgung, Kaffee bestellen, Bestellungen ansehen, ein kurzes Spiel spielen. Schneller Start und einheitlicher Einstieg innerhalb von WeChat sind seine größten Erlebnismerkmale.

Für Unternehmen und Entwickler sind Mini Programs ein durchsuchbares und teilbares "kleines App-Format". Solange Sie sich auf der WeChat Official Platform registrieren, die Einstellungen abschließen und die Überprüfung bestehen, kann Ihr Mini Program allen WeChat-Nutzern zugänglich gemacht werden. Im Vergleich zu traditionellen Apps ist es einfacher, die ersten Nutzer zu gewinnen, da Menschen bereits daran gewöhnt sind, viele Aufgaben in WeChat zu erledigen.

In diesem Tutorial werden wir kein komplexes Geschäftssystem bauen. Wir wählen ein klassisches Beispiel: das Snake-Spiel. Es ist klein und logisch klar, enthält aber die vollständigen Elemente, die ein Mini Program haben sollte: mehrere Seiten, einfache Interaktionen, Zustandsänderungen, Punktestandsaufzeichnung usw. Es ist perfekt als Ihr erstes Projekt.

## 1.2 WeChat Mini Program Entwicklung

Nachdem wir verstanden haben, "was Mini Programs sind", lautet die nächste Frage: Was beinhaltet die Entwicklung eines solchen tatsächlich?

Sie benötigen ein klares Ziel (zum Beispiel ein Snake-Spiel, das Nutzer jederzeit spielen können), entwerfen die Oberfläche, die Nutzer sehen werden, definieren, was bei verschiedenen Aktionen passieren soll, und veröffentlichen es schließlich.

In der traditionellen Entwicklung leiten Programmierer normalerweise alle diese Schritte und schreiben viel Code. In der KI-gestützten Entwicklung kann dies klarer aufgeteilt werden: Sie erklären, was Sie wollen, und KI hilft bei den meisten Implementierungsdetails. Das bedeutet für Anfänger, dass die wichtigste Fähigkeit nicht mehr das Auswendiglernen von Syntax ist, sondern das klare Beschreiben von Anforderungen und das Verstehen der KI-Ausgabe.

## 1.3 Mehrere Wege zur Entwicklung von WeChat Mini Programs

In echten Projekten verwenden Menschen unterschiedliche technische Routen. Um Sie zu Beginn nicht mit Begriffen zu überfordern, werden wir nur eine grobe Einteilung vornehmen, damit Sie die gängigen Pfade verstehen.

Der erste Weg ist die direkte Nutzung der offiziellen nativen Funktionen. Nachdem Sie ein Projekt in WeChat DevTools erstellt haben, sehen Sie einen festen Satz von Dateitypen, die zur Beschreibung von Seitenstruktur, Stilen und Logik verwendet werden. Dieser Weg bleibt nah an der offiziellen Dokumentation und bietet starke Kontrolle, aber für Frontend-Einsteiger ist die Lernkurve etwas steiler.

Der zweite Weg ist die Verwendung von Cross-Plattform-Frameworks wie uni-app. Sie schreiben hauptsächlich webähnlichen Code lokal (z. B. `.vue`-Dateien), und das Framework konvertiert diesen Code in Formate, die WeChat Mini Programs ausführen können. Der Vorteil ist eine einheitliche Struktur. Wenn Sie später auf anderen Plattformen veröffentlichen (wie H5 oder App), sind die Änderungen relativ gering.

Basierend auf diesen beiden Methoden konzentriert sich dieses Tutorial auf die Mini-Program-SOP mit KI-gestützten Tools. Zum Beispiel das gesamte Projekt in Trae öffnen und der integrierten KI direkt sagen: "Bitte füge eine Startseite mit Titel und Schaltfläche in dieser Datei hinzu" oder "Bitte erstelle eine Spielseite, die Schlange und Punktestand anzeigt." Die KI generiert neue Code-Snippets oder ändert/refaktoriert vorhandenen Code basierend auf dem aktuellen Projektkontext.

Diese drei Wege schließen sich nicht gegenseitig aus. Sie können absolut in einem uni-app-Projekt bauen und gleichzeitig Trae KI für den größten Teil der Codierungsarbeit nutzen. Der Schlüssel ist nicht, eine Methode auszuwählen, sondern zu wissen, wo Sie gerade stehen und welche Tools zur Verfügung stehen.

## 1.4 In diesem Artikel behandelte WeChat Mini Program Schritte (Vorschau)

Dieses Tutorial folgt einem Rhythmus von **Umgebung bis Endprodukt**. Am Beispiel von Snake und Trae-Vibecoding-Stil unterteilen wir den Prozess in eine wiederverwendbare Route. In späteren Kapiteln werden Sie diese Phasen durchlaufen:

1. Konzeptionelle Grundlagen schaffen: Verstehen, was Mini Programs sind, welche gängigen Entwicklungsmethoden es gibt und für wen dieses Snake-Mini-Program gedacht ist und in welchen Szenarien es verwendet wird.
2. Umgebung vorbereiten: Mini-Program-Konto registrieren, HBuilderX, Trae und WeChat DevTools installieren, dann ein grundlegendes Projektgerüst mit HBuilderX erstellen, das in WeChat DevTools ausgeführt werden kann und zunächst die einfachste Seite anzeigt.
3. Formelle Entwicklung beginnen: Projekt in Trae öffnen, den Vibecoding-Dialog mit KI nutzen, um Schritt für Schritt Startseiten- und Spielseitenlayout zu generieren und Kernspielmechaniken wie Schlangenbewegung, Fressen und Spielende zu implementieren.
4. Nachdem die Kernfunktionen laufen, lernen, KI als "Debugging- und Refactoring-Partner" zu nutzen: Sie bitten, Bugs zu diagnostizieren, die Struktur aufzuräumen, wenn der Code unübersichtlich wird, und schrittweise Details wie Start/Pause, Highscore-Aufzeichnung und UI-Politur hinzuzufügen.
5. Veröffentlichung beginnen: Projekt in eine von WeChat erkennbare Version bauen, auf echten Geräten in WeChat DevTools vorschauen und testen, zuerst mit Testkonto und Erfahrungsversion zur Prozessvalidierung starten, dann Registrierung und Überprüfung abschließen, bevor formell veröffentlicht wird, damit andere Ihr Mini Program suchen und spielen können.

Dieser Abschnitt zeichnet nur die vollständige Karte und klappert noch keine Befehle oder Codedetails aus. Merken Sie sich vorerst diese 5 Schritte: **Verstehen -> Umgebung einrichten -> Vibecoding-Entwicklung -> Debuggen und Polishen -> Bauen und Veröffentlichen**. Spätere Kapitel werden in jeden Schritt hineinzoomen und zeigen, was vorzubereiten ist, was Sie der KI sagen sollen und welche Ergebnisse Sie auf dem Bildschirm sehen sollten.

# 2. Umgebungsvorbereitung

Bevor wir eine Zeile Code schreiben, bereiten wir zuerst die Umgebung vor.
Das Ziel dieses Teils ist sicherzustellen, dass Sie nicht mehr bei **wo Tools herunterladen und warum Dinge nicht laufen** stecken bleiben, damit Sie sich direkt auf KI-Dialog und Anforderungsimplementierung konzentrieren können.

Wenn Sie einen Browser öffnen, Dateien herunterladen und Installationsprogramme per Doppelklick ausführen können, können Sie diesen Abschnitt abschließen.

## 2.1 Drei in diesem Tutorial verwendete Tools

Für die Snake-Mini-Program-Entwicklung verwenden wir drei Tools zusammen, jedes mit unterschiedlichen Aufgaben:

1. Das erste ist Trae. Betrachten Sie es als einen KI-integrierten Code-Editor. Es kann Projektdateien wie eine normale IDE öffnen und Sie auch in natürlicher Sprache mit KI chatten, um Code zu generieren, zu ändern und zu erklären. Die meisten "Mini-Program mit KI bauen"-Operationen in diesem Tutorial finden in Trae statt. Laden Sie die neueste Version von https://www.trae.cn herunter.
2. Das zweite ist HBuilderX. Es hat starke Unterstützung für Vue und uni-app und bietet vorgefertigte Mini-Program-Vorlagen. Wir verwenden es, um "mit einem Klick" ein Basis-Mini-Program-Projekt zu generieren - das ist die Grundlage, bevor es an Trae + KI zur weiteren Iteration übergeben wird. Download von https://www.dcloud.io/hbuilderx.html.
3. Das dritte ist WeChat DevTools. Dieses offizielle Tool wird zur Entwicklung und Vorschau von Mini Programs verwendet. Es führt Ihr Projekt auf dem Desktop aus und unterstützt echtes Geräte-Debugging auf dem Handy. Download von https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html.

Kurz gesagt: HBuilderX erstellt schnell das Basisprojekt, Trae hilft Ihnen beim Codieren mit KI, und WeChat DevTools zeigt das tatsächlich laufende Mini Program.

## 2.2 WeChat Official Platform Konto registrieren und AppID erhalten

Mit den Tools bereit benötigen Sie noch eine **Mini-Program-Identität**, die auf der WeChat Official Platform erstellt wird.
Wenn Sie noch nie ein Mini Program registriert haben, folgen Sie dieser Reihenfolge:

1. Geben Sie https://mp.weixin.qq.com in Ihrem Browser ein, öffnen Sie die WeChat Official Platform und melden Sie sich durch Scannen des QR-Codes mit WeChat an.

![](/zh-cn/stage-3/cross-platform/wechat-miniprogram/images/image1.webp)

2. Wählen Sie "Mini Program" auf der Startseite und schließen Sie die Registrierungsaufforderungen ab, einschließlich E-Mail, Telefonnummer und Entitätstyp (Einzelne oder Unternehmen).
   ![](/zh-cn/stage-3/cross-platform/wechat-miniprogram/images/image2.png)
3. Nach erfolgreicher Registrierung betreten Sie das Backend, finden Sie "Development Management" oder "Development Settings" und Sie sehen eine eindeutige ID namens AppID. Dies ist Ihre Mini-Program-Identität und wird später in der Projektkonfiguration verwendet.

![](/zh-cn/stage-3/cross-platform/wechat-miniprogram/images/image3.png)

Es wird empfohlen, die AppID an einem leicht findbaren Ort zu speichern. In späteren Abschnitten werden wir diesen Wert direkt eintragen, um das lokale Projekt Ihrem Online-Mini-Program zuzuordnen.

## 2.3 WeChat DevTools installieren

Als Nächstes benötigen wir einen Ort, um Mini Programs tatsächlich auszuführen und eine Vorschau anzuzeigen. Genau dafür sind die WeChat DevTools gedacht.

1. Besuchen Sie die Download-Seite https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html.
   Auf dieser Seite sehen Sie Versionen für verschiedene Betriebssysteme. Wählen Sie normalerweise die stabile Version, die zu Ihrem System passt, wie Windows 64-Bit oder macOS.
2. Nach dem Download doppelklicken Sie auf das Installationsprogramm und folgen dem Assistenten Schritt für Schritt. Im Zweifelsfall die Standardoptionen beibehalten.
3. Nach der Installation starten Sie WeChat DevTools vom Desktop oder Startmenü. Beim ersten Start wird ein QR-Code angezeigt und Sie werden aufgefordert, mit WeChat zu scannen. Scannen und autorisieren Sie, um die Hauptoberfläche zu betreten.

![](/zh-cn/stage-3/cross-platform/wechat-miniprogram/images/image4.png)![](/zh-cn/stage-3/cross-platform/wechat-miniprogram/images/image5.png)

Später, wenn die Projektdateien in Trae bereit sind, werden wir das erstellte Mini Program in WeChat DevTools importieren und hier die echten Laufergebnisse ansehen.

## 2.4 Trae und HBuilderX vorbereiten

Installieren Sie schließlich die beiden Tools, die für das eigentliche Codieren verwendet werden: Trae und HBuilderX.

Sie können **Trae zuerst installieren**. Besuchen Sie https://www.trae.cn im Browser und laden Sie die richtige Version für Ihr Betriebssystem herunter. Die Installation erfolgt wie bei normaler Software: Doppelklicken Sie auf das Installationsprogramm und folgen Sie den Anweisungen. Nach der Installation erhalten Sie eine IDE, die lokale Ordner öffnen, Code inspizieren und mit KI chatten kann. Alle späteren Vibecoding-Schritte finden hier statt.

![](/zh-cn/stage-3/cross-platform/wechat-miniprogram/images/image6.png)

**Installieren Sie dann HBuilderX**. Besuchen Sie https://www.dcloud.io/hbuilderx.html und laden Sie das Paket für Ihr Betriebssystem herunter. HBuilderX ist leichtgewichtig und startet schnell. Nach der Installation können Sie kurz die Oberfläche betrachten; kein tiefer Funktionsstudium jetzt nötig. In späteren Kapiteln verwenden wir es, um eine uni-app-Mini-Program-Vorlage als Projektstartpunkt zu erstellen.

![](/zh-cn/stage-3/cross-platform/wechat-miniprogram/images/image7.png)

Nach Abschluss dieses Abschnitts ist Ihre Umgebung vollständig: Sie haben ein Mini-Program-Konto + AppID, ein Laufzeit-Vorschautool und eine KI-Coding-IDE. Als Nächstes beginnen wir mit **dem Erstellen des ersten Projektgerüsts** und lassen diese Tools wirklich laufen.

## 2.5 Basisdateien vorbereiten

1. Klicken Sie auf "Neues Projekt".

![](/zh-cn/stage-3/cross-platform/wechat-miniprogram/images/image8.png)

2. Wählen Sie die Standardvorlage, setzen Sie den Mini-Program-Namen, wählen Sie den Speicherpfad und klicken Sie dann auf Erstellen in der unteren rechten Ecke:

![](/zh-cn/stage-3/cross-platform/wechat-miniprogram/images/image9.png)

3. Der Bildschirm zur erfolgreichen Erstellung erscheint:

![](/zh-cn/stage-3/cross-platform/wechat-miniprogram/images/image10.png)

4. Finden Sie dann diesen Ordner im Dateisystem, öffnen Sie ihn in Trae und Sie sehen, dass die Grundlagendateien alle bereit sind:

![](/zh-cn/stage-3/cross-platform/wechat-miniprogram/images/image11.png)

# 3. Mini Program Entwicklung

In den ersten beiden Teilen haben wir bereits geklärt, "was Mini Programs sind" und "wie man Tools und Umgebung einrichtet." Ab diesem Abschnitt betreten wir die Praxis: nicht nur Konzepte, sondern KI hilft Ihnen tatsächlich, das Snake-Mini-Program von null auf zu bauen.

In diesem Abschnitt werden Sie eine vollständige SOP für die Entwicklungsphase durchlaufen, ungefähr einschließlich:

1. Öffnen Sie das aktuelle Projekt in Trae und geben Sie KI Ihre erste vollständige Anweisung, damit sie eine ausführbare Snake-Version basierend auf dem aktuellen Gerüst entwirft und implementiert.
2. Lassen Sie Trae echte Projektdateien direkt ändern, nicht nur "Beispielcode" ausgeben, und lernen, Rollback zu verwenden, um den vorherigen Zustand bei Bedarf wiederherzustellen.
3. Kehren Sie zu HBuilderX und WeChat DevTools zurück, führen Sie es im Mini-Program-Simulator aus und spielen Sie diese Version im Simulator, um von der "Code-Perspektive" zur "Nutzer-Perspektive" zu wechseln.
4. Basierend auf den Spielergebnissen weiterhin Änderungen in natürlicher Sprache vorschlagen und KI die Steuerung von schaltflächenbasiert zu joystickbasiert iterieren lassen, während Sie eine vollständige Schleife von "Problem finden -> Problem beschreiben -> KI repariert -> erneut verifizieren" erleben.

Sie können wählen, jede Seite und Schaltfläche vor der Entwicklung zu entwerfen.
Aber für komplette Anfänger ist Interface- und Interaktionsdesign selbst auch ein neues Gebiet (später werden wir KI-gestütztes Design zeigen). In dieser Runde nutzen wir absichtlich einen anderen Weg: zuerst anfangen - KI eine ausführbare Version generieren lassen, dann schrittweise verfeinern, indem Effekte betrachtet und in natürlicher Sprache gechattet wird.

## 3.1 Anforderungen in einem Klartext erklären: Geben Sie Trae den ersten "Master-Prompt"

Nachdem ich das vorbereitete Mini-Program-Projekt in Trae geöffnet hatte, stürzte ich mich nicht auf eine bestimmte Zeile. Stattdessen sagte ich dem integrierten KI-Assistenten:

**Ich gab KI einen Befehl: Basierend auf dem aktuellen Framework ein Snake-Mini-Program bauen. Bitte entwerfen Sie dieses Mini Program und schreiben Sie mir einen Prompt.**

Mit anderen Worten, ich bat sie nicht, "Schritt für Schritt eine Funktion zu schreiben." Ich warf zuerst ein vollständiges Ziel heraus, ließ KI helfen zu planen, und KI plante nicht nur, sondern landete auch direkt die erste Implementierung.

Nach Erhalt dieser Anweisung liest Trae die aktuelle Projektstruktur, bestimmt, wo Seiten hinzuzufügen sind und wo Logik hinzuzufügen ist, und ändert direkt Projektdateien/Code. Sie müssen keinen Code von Hand schreiben oder manuell Ordner erstellen/ändern.

## 3.2 KI echten Code automatisch ändern lassen, nicht manuell coden

Wenn Sie diese Anweisung in Trae ausführen, betritt KI einen "Projektbearbeitungs"-Ablauf. Während dieses Prozesses können Sie folgende Punkte beobachten:

1. Sie erklärt ihr Denken im Chat-Bereich, zum Beispiel in welche Verzeichnisse sie Seiten hinzufügen wird und wie sie die Spiellogik organisieren wird.

![](/zh-cn/stage-3/cross-platform/wechat-miniprogram/images/image12.png)![](/zh-cn/stage-3/cross-platform/wechat-miniprogram/images/image13.png)

2. Sie bearbeitet echte Projektdateien direkt, anstatt nur "Beispielcode" zum Kopieren und Einfügen zu geben.
3. Nach Abschluss gibt Trae eine kurze Zusammenfassung aus, die Ihnen sagt, welche Dateien geändert wurden und was getan wurde.

Wenn Sie mit dieser Runde nicht zufrieden sind (oder denken, dass etwas falsch ist), keine Panik. Trae bietet Rollback oben links außerhalb des Chat-Feldes. Sie können den Projektzustand vor dieser Anweisung mit einem Klick wiederherstellen - wie ein sicherer Rückgängig-Schlüssel.

![](/zh-cn/stage-3/cross-platform/wechat-miniprogram/images/image14.png)

![](/zh-cn/stage-3/cross-platform/wechat-miniprogram/images/image15.png)

## 3.3 Effekte in HBuilderX und WeChat DevTools ansehen

Nachdem KI die erste Entwicklungsrunde abgeschlossen hat, wurde Code in das Projekt geschrieben, aber Sie haben den echten spielerseitigen Effekt noch nicht gesehen.
Als Nächstes müssen wir es ausführen.

Spezifische Operation: Gehen Sie zurück zu HBuilderX, finden Sie das obere Menü "Run", wählen Sie "Run to Mini Program Simulator" -> "WeChat DevTools." Dies löst den Projekt-Build aus und öffnet das Ergebnis in WeChat DevTools.

![](/zh-cn/stage-3/cross-platform/wechat-miniprogram/images/image16.png)

Das Ausgabe-Panel unten zeigt den Build-Prozess. Wenn der Endzustand "ready" ohne Fehler ist, war der Build erfolgreich. Wechseln Sie dann zu WeChat DevTools, um UI und Funktionen dieser Version zu prüfen.

![](/zh-cn/stage-3/cross-platform/wechat-miniprogram/images/image17.png)

In den meisten Fällen öffnet HBuilderX WeChat DevTools automatisch und Sie können das aktualisierte Mini Program direkt sehen. Wenn nicht automatisch geöffnet, tun Sie Folgendes:

1. Stoppen Sie den aktuellen Lauf in HBuilderX zuerst.
2. Starten Sie WeChat DevTools manuell und halten Sie es geöffnet.
3. Klicken Sie in HBuilderX erneut auf "Run -> Run to Mini Program Simulator -> WeChat DevTools."

Dann können Sie das Vibecoding-Mini-Program in WeChat DevTools sehen:

![](/zh-cn/stage-3/cross-platform/wechat-miniprogram/images/image18.png)

## 3.4 Natürliche Sprache verwenden, um wiederholt anzupassen, bis zufrieden

In dieser Praxis hat KI anfangs ein schaltflächengesteuertes Snake generiert: vier Richtungsschaltflächen auf dem Bildschirm, und die Schlange ändert die Richtung beim Klicken. Es ist vollständig spielbar, aber ich persönlich bevorzuge Joystick-Steuerung. Für Ihre Änderungswünsche (nicht nur Funktionen, sondern auch UI-Design und Layout; wenn Sie Erfahrung haben, können Sie KI sogar bitten, externe Modell-APIs oder Datenbanken zu integrieren) gilt erneut: Sie müssen Anforderungen nur in natürlicher Sprache beschreiben.

Das ist der Kernvorteil von Vibecoding: Sie müssen nicht in den Code eintauchen für Event-Binding oder Koordinatenlogik. Sie sagen KI direkt, was Sie wollen. Zum Beispiel können Sie im Trae-Chat schreiben:

Ersetzen Sie Schaltflächen durch Joystick-Steuerung. Wenn der Benutzer den Joystick loslässt, soll die Schlange in die aktuelle Richtung weiterlaufen, bis zur nächsten Joystick-Aktion.

Solange die Anforderung klar ist, lokalisiert KI automatisch die Zieldateien und ändert Steuerungsstile, Interaktionsbindungen und Richtungsbehandlungslogik.

![](/zh-cn/stage-3/cross-platform/wechat-miniprogram/images/image19.png)

Kehren Sie nach der Änderung zu WeChat DevTools zurück, um zu prüfen.
Wenn Änderungen nicht sofort sichtbar sind, klicken Sie auf "Run" in DevTools oder aktualisieren Sie das Vorschaufenster, um den neuesten Build anzuwenden. Wenn immer noch nicht aktualisiert, stoppen Sie den Lauf in HBuilderX und führen Sie erneut zum Simulator aus, dann können Sie das aktualisierte Mini Program sehen:

![](/zh-cn/stage-3/cross-platform/wechat-miniprogram/images/image20.png)

## 3.5 Was tun bei Problemen: Weiterhin in natürlicher Sprache kommunizieren

KI-generierte Versionen sind nicht immer beim ersten Mal perfekt. Sie können Folgendes feststellen:

- Laufzeitfehler und die App lässt sich nicht öffnen;
- Funktionen größtenteils korrekt, aber Details weichen von Ihren Erwartungen ab;
- UI nutzbar, aber noch nicht ansprechend oder komfortabel genug.

In diesen Momenten müssen Sie nicht blind selbst Code bearbeiten. Beschreiben Sie Probleme direkt dem Trae KI-Assistenten in natürlicher Sprache, zum Beispiel:

"Joystick-Steuerung funktioniert jetzt, aber die Schlange stoppt manchmal plötzlich. Bitte überprüfen Sie die aktuelle Implementierung."
Oder: "Das Spiel ist jetzt spielbar, aber das Interface wirkt überfüllt. Ich möchte mehr vertikalen Abstand auf dem Handy. Bitte passen Sie das Layout an."

KI wird den aktuellen Projektkontext + Ihre Beschreibung nutzen und dann Code-Änderungen direkt bereitstellen und anwenden. Wenn das Ergebnis schlechter wird oder die Richtung falsch ist, können Sie immer noch zur vorherigen stabilen Version zurückrollen und eine andere Formulierung versuchen.

Durch mehrere solcher Runden können Sie von der "groben ersten Version" zu einem joystickbasierten Snake polieren, das näher an Ihren Präferenzen liegt.
Zum Beispiel gab ich ein Stilreferenzbild und bat KI, den UI-Stil entsprechend anzupassen:

![](/zh-cn/stage-3/cross-platform/wechat-miniprogram/images/image21.png)

## 3.6 Endergebnis und Abschnittszusammenfassung

Nach wiederholten Runden von **natürlicher Sprachbeschreibung -> KI-Änderung -> Vorschau in WeChat DevTools -> weitere Feinjustierung** erhielt ich dieses Ergebnis:

- vollständige Spielseite;
- Schlange bewegt sich flüssig und frisst Futter;
- Joystick-Steuerung unterstützt;
- läuft korrekt im Mini-Program-Simulator.

Beispiele für das Endprodukt:

![](/zh-cn/stage-3/cross-platform/wechat-miniprogram/images/image22.png)![](/zh-cn/stage-3/cross-platform/wechat-miniprogram/images/image23.png)![](/zh-cn/stage-3/cross-platform/wechat-miniprogram/images/image24.png)

In diesem Abschnitt haben Sie einen vollständigen geschlossenen Kreislauf gesehen:

1. In Trae ließ eine klare Anweisung KI die erste Snake-Mini-Program-Version bauen;
2. Mit HBuilderX + WeChat DevTools den echten Effekt aus der Nutzerperspektive validieren;
3. Weiterhin Änderungen in natürlicher Sprache vorschlagen, KI Funktions- und UI-Optimierung überlassen;
4. Wenn Probleme auftreten, Rollback + Neustart verwenden, um den Prozess sicher zu halten.

Als Nächstes können Sie denselben Rhythmus für Ihre eigenen Ideen verwenden: nicht beschränkt auf Snake, sondern auch Utility-Mini-Programs, Veranstaltungsseiten oder echte Geschäftsprototypen. Ihre Hauptaufgabe ist es, klar zu denken und klar zu beschreiben. Lassen Sie KI und Tools den Rest erledigen.

# 4. Mini Program Veröffentlichung

In den vorherigen drei Kapiteln haben wir den vollständigen Ablauf von **Umgebungseinrichtung** -> **KI-gestützte Entwicklung** -> **Snake im lokalen Simulator ausführen** abgeschlossen.

Ab diesem Kapitel wird die Schlüsselfrage: **Wie veröffentliche ich dieses Werk wirklich in WeChat, damit es nicht nur ein Spielzeug ist, sondern ein nutzbares Mini Program?**

Um die Schwierigkeit zu reduzieren, nehmen wir zuerst den **kürzesten geschlossenen Kreislauf**: nur als **Test-/Erfahrungsversion** für sich selbst und einige Teammitglieder veröffentlichen. Nachdem Funktion und Erlebnis stabil sind, dann zur formellen öffentlichen Veröffentlichung übergehen.

Dieses Kapitel behandelt zuerst 4.1, um den kürzesten Pfad für den **Erfahrungsversions-Start** abzuschließen. Formelle Veröffentlichung für alle Nutzer wird in 4.2 erklärt.

## 4.1 Kürzeste SOP - Als Erfahrungsversion starten

Das Ziel dieses Unterabschnitts ist nur eins: Sie Ihr Snake-Mini-Program in WeChat als **Erfahrungsversion** öffnen zu lassen.

Der gesamte Ablauf umfasst vier Aufgaben:

1. Finden und bestätigen Sie Ihre AppID in der WeChat Official Platform.
2. Konfigurieren Sie diese AppID in Ihrem Projekt.
3. Laden Sie die aktuelle Version in WeChat DevTools hoch.
4. Kehren Sie zur Official Platform zurück und setzen Sie diese hochgeladene Version als "Experience Version."

Gehen wir in dieser Reihenfolge vor.

### 4.1.1 AppID in der WeChat Official Platform bestätigen

Erster Schritt: Bestätigen Sie Ihre Mini-Program-AppID in der WeChat Official Platform.

Sie haben dies bereits einmal in **Abschnitt 2 Umgebungseinrichtung** getan. Hier verwenden wir es tatsächlich.

1. Besuchen Sie `https://mp.weixin.qq.com` und melden Sie sich in Ihrem Mini-Program-Backend an.
2. Finden Sie "Development Management" im linken Menü und betreten Sie dann "Development Settings."
3. Oben finden Sie den Bereich "Developer ID". Dort gibt es eine Zeile "AppID (Mini Program ID)" - das ist Ihre eindeutige ID.

Diese ID muss exakt mit der Projektkonfiguration übereinstimmen. Andernfalls sieht WeChat sie als eine andere App-Identität und Vorschau/Veröffentlichung werden fehlschlagen.

![](/zh-cn/stage-3/cross-platform/wechat-miniprogram/images/image25.png)

### 4.1.2 AppID im Projekt eintragen

Zweiter Schritt: Schreiben Sie diese AppID in die Projektkonfiguration, damit der lokale Build Ihrem offiziellen Mini-Program-Konto zugeordnet wird.

Wenn Ihr Projekt die uni-app-Vorlage verwendet, tun Sie Folgendes:

1. Öffnen Sie HBuilderX und laden Sie das Snake-Projekt.
2. Finden Sie `manifest.json` im Dateibaum und öffnen Sie es.
3. Scrollen Sie zu "WeChat Mini Program Configuration" und Sie sehen ein Eingabefeld wie "WeChat Mini Program AppID."
4. Fügen Sie die von der Official Platform kopierte AppID exakt ein und speichern Sie die Datei.
   ![](/zh-cn/stage-3/cross-platform/wechat-miniprogram/images/image26.png)

Jetzt hat Ihr lokales Projekt diese Mini-Program-Identität beansprucht. Als Nächstes, wenn Sie aus WeChat DevTools hochladen, wird es unter dieser AppID aufgezeichnet.

### 4.1.3 Eine Version in WeChat DevTools hochladen

Wir haben das Projekt bereits in WeChat DevTools zur Simulatorvorschau ausgeführt.

Jetzt machen wir: "den aktuellen Code als Version verpacken und zum Server hochladen."

Schritte:

1. Klicken Sie in der oberen rechten Symbolleiste von WeChat DevTools auf "Upload."
2. Im Popup zwei Schlüsselfelder ausfüllen:
   1. Versionsnummer: zum Beispiel `1.0.0` (nur Ziffern und Punkte).
   2. Projektnotiz: kurze Beschreibung, wie "Kernspielmechanik abgeschlossen."
3. Bestätigen und auf "Upload" klicken. Das Ausgabe-Panel zeigt den Build-Prozess. Wenn alle Schritte grün werden und der Upload abschließt, wurde diese Version erfolgreich an den WeChat-Server übermittelt.

![](/zh-cn/stage-3/cross-platform/wechat-miniprogram/images/image27.png)

![](/zh-cn/stage-3/cross-platform/wechat-miniprogram/images/image28.png)

![](/zh-cn/stage-3/cross-platform/wechat-miniprogram/images/image29.png)![](/zh-cn/stage-3/cross-platform/wechat-miniprogram/images/image30.png)

### 4.1.4 Hochgeladene Version im Backend als Erfahrungsversion setzen

Das Hochladen sendet den Code nur an die WeChat-Seite. Sie müssen dem System noch mitteilen: "Dies ist eine Erfahrungsversion."

Letzter Schritt: Kehren Sie zum Official Platform Backend zurück und schließen Sie die Schleife.

1. Öffnen Sie `https://mp.weixin.qq.com` und betreten Sie das Mini-Program-Backend.
2. Finden Sie im linken Menü "Management" -> "Version Management."
3. Im Abschnitt "Development Version" sollten Sie die hochgeladene Version sehen: Version `1.0.0`, Ihre Notiz und den gerade hochgeladenen Zeitstempel.
4. Auf der rechten Seite dieser Zeile verwenden Sie das Dropdown/Aktionsfeld, um "Set as Experience Version" zu wählen und die Aktion zu bestätigen. Vor diesem Schritt stellen Sie sicher, dass Ihre Hauptkategorie auf der Startseite/Kategorieeinstellungen konfiguriert ist.

   ![](/zh-cn/stage-3/cross-platform/wechat-miniprogram/images/image31.png)

   ![](/zh-cn/stage-3/cross-platform/wechat-miniprogram/images/image32.png)

Nach Abschluss wird diese Version zu Ihrer Mini-Program "Erfahrungsversion." Sie können im Backend einen Erfahrungs-QR-Code generieren oder sich selbst/das Team als Erfahrungsmitglieder hinzufügen und dann in WeChat für Echtgerät-Tests scannen.

An diesem Punkt haben wir die kürzeste Schleife vom lokalen Projekt zum Teststart abgeschlossen:

Sie müssen nicht sofort für alle WeChat-Nutzer öffnen. In einem sicheren Rahmen zuerst das echte Mini Program in der echten WeChat-Umgebung laufen lassen. Das reicht für Funktionstests, Feedback-Sammlung und Iteration.

## 4.2 Formelle Veröffentlichung des Mini Programs

Nachdem die Erfahrungsversion gut läuft, können Sie dieses Snake-Mini-Program bereits in Ihrem eigenen WeChat spielen.
Der nächste Schritt ist der Übergang von begrenzten Erfahrungsnutzern zu einem vollständig öffentlichen WeChat-Mini-Program.

Unterteilen wir dies in Schritte: Basisinformationen vervollständigen, Kategorie wählen, Registrierung abschließen, dann zur Überprüfung einreichen. Folgen Sie dieser Reihenfolge:

### 4.2.1 Mini-Program-Veröffentlichungsablauf betreten

Kehren Sie zuerst zum WeChat Official Platform Backend zurück und melden Sie sich an.
Finden Sie in der linken Navigation Einträge im Zusammenhang mit "Version Management / Release" (UI kann sich im Laufe der Zeit leicht ändern). Sie finden "Mini Program Release Flow."

Nach dem Betreten zeigt der obere Bereich einen Fortschrittsbalken. Darunter sind Schritte aufgelistet wie:

1. Mini Program Information
2. Mini Program Category
3. Operation Information / Filing
4. WeChat Verification (abhängig vom Entitätstyp)

Zu Beginn beträgt der Fortschritt 0%. Mit jedem abgeschlossenen Schritt aktualisiert das System automatisch.

![](/zh-cn/stage-3/cross-platform/wechat-miniprogram/images/image33.png)

### 4.2.2 Grundlegende Mini-Program-Informationen ausfüllen

Der erste Schritt ist das Vervollständigen Ihrer Mini-Program "Visitenkarte", also das, was Nutzer zuerst in WeChat sehen.

Auf der "Mini Program Information"-Seite müssen Sie normalerweise Folgendes ausfüllen/bestätigen:

1. Mini-Program-Name
   Dieser erscheint in Suchergebnissen und im App-Header. Er hat Längenbeschränkungen und Namensregeln. Wählen Sie einen Namen, der die Funktion beschreibt und leicht zu merken ist.
2. Beschreibung / Einleitung
   Verwenden Sie ein oder zwei Sätze, um zu erklären, was dieses Mini Program tut, zum Beispiel: "Ein Snake-Spiel, entwickelt mit KI-gestütztem Codieren, geeignet für schnelles Gelegenheitsspiel."
   Halten Sie die Beschreibung im Einklang mit der echten Funktionalität und vermeiden Sie übertriebenen Marketing-Text.
3. Icon und Screenshots
   1. Icon erfordert normalerweise ein quadratisches Bild mit PNG/JPG-Unterstützung und Größen-/Pixelbeschränkungen (Seitenregeln beachten). Verwenden Sie ein einfaches, kontrastreiches Icon.
   2. Laden Sie mehrere Screenshots hoch wie Startseite, Spielseite, Einstellungsseite. Sie helfen Nutzern, den Inhalt zu verstehen.
4. Sonstige Pflichtfelder
   Wie Tags und Service-Region, gemäß den Aufforderungen ausfüllen.
   Nur ein Prinzip: Alle Informationen müssen zur echten Funktionalität Ihres Snake-Mini-Programs passen.

![](/zh-cn/stage-3/cross-platform/wechat-miniprogram/images/image34.png)

Nachdem alle Felder ausgefüllt sind, auf Speichern oder Weiter klicken. Der erste Schritt im Veröffentlichungsablauf ist abgeschlossen.

### 4.2.3 Mini-Program-Servicekategorie auswählen

Nach den Basisinformationen führt Sie der Assistent zu "Mini Program Category."
Kategorie ist die Klassifizierung Ihrer App in WeChat, beeinflusst die Überprüfungsroute und spätere Anzeige/Betrieb.

![](/zh-cn/stage-3/cross-platform/wechat-miniprogram/images/image35.png)

Auf dieser Seite sehen Sie "Add Category." Klicken Sie darauf und wählen Sie die passende Kategorie im System-Kategoriebaum, zum Beispiel:

![](/zh-cn/stage-3/cross-platform/wechat-miniprogram/images/image36.png)

1. Wählen Sie "Education" als Hauptkategorie;
2. Dann wählen Sie eine spezifischere Unterkategorie wie "Education Tools / Teaching Assistant." In diesem Beispiel wurden Bildungstools als Lernhilfe für Vibecoding ausgewählt.

In Ihrem eigenen Projekt wählen Sie einfach die passendste Kategorie nach tatsächlichem Verwendungszweck.

![](/zh-cn/stage-3/cross-platform/wechat-miniprogram/images/image37.png)

![](/zh-cn/stage-3/cross-platform/wechat-miniprogram/images/image38.png)

Nach Bestätigung der Kategorie auf Speichern klicken. Wenn die Seite "category created successfully" anzeigt und Ihr neues Element auflistet, ist dieser Schritt abgeschlossen.

### 4.2.4 Registrierungsinformationen vervollständigen

Als Nächstes fordert der Veröffentlichungsablauf "Operation Information / Filing." Dies verifiziert die verantwortliche Entität hinter dem Mini Program.

![](/zh-cn/stage-3/cross-platform/wechat-miniprogram/images/image39.png)

Im Beispiel einer einzelnen Entität umfasst der Ablauf normalerweise:

1. Registrierungstyp wählen
   Wählen Sie zwischen Typen wie "Individual" oder "Enterprise", übereinstimmend mit Ihrer Registrierungsentität.
2. Entitätsinformationen ausfüllen
   Einschließlich Name, Ausweistyp, Ausweisnummer usw. Dies muss mit den Registrierungsinformationen übereinstimmen, sonst kann die Überprüfung abgelehnt werden.
3. Belegdokumente hochladen
   Normalerweise Ausweisfotos oder andere Nachweisdateien erforderlich, mit spezifischen Format-/Größen-/Klarheitsanforderungen auf der Seite. Klare Dateien vorbereiten und hochladen.
   ![](/zh-cn/stage-3/cross-platform/wechat-miniprogram/images/image40.png)

Nach Einreichung geht das System in "in Überprüfung" und zeigt eine Nachricht wie "Informationen eingereicht, bitte warten." Dies kann einige Zeit dauern. Sie können den Fortschritt jederzeit im Backend prüfen.

![](/zh-cn/stage-3/cross-platform/wechat-miniprogram/images/image41.png)

### 4.2.5 Zur Überprüfung einreichen und auf formelle Veröffentlichung warten

Wenn "Mini Program Information", "Category" und "Operation Information/Filing" alle abgeschlossen sind, tun Sie die letzte Aktion: zur Überprüfung einreichen.

1. Kehren Sie zur Veröffentlichungsablauf-Übersichtsseite zurück und bestätigen Sie, dass alle Punkte als abgeschlossen angezeigt werden, mit einem Fortschritt nahe 100%.
2. Klicken Sie auf "Submit for Review" (oder ähnliche Schaltfläche), um die aktuelle Entwicklungsversion dem WeChat-Überprüfungsteam einzureichen.
3. In "Version Management" wird der Status dieser Version zu "Under Review." Nach Genehmigung wird er "Published" oder für "Go Live" verfügbar.

Wenn die Registrierungsüberprüfung fehlschlägt, erhalten Entwickler möglicherweise einen Anruf, der die fehlgeschlagenen Teile spezifiziert.

Für die Registrierung erhalten Sie möglicherweise einen Verifizierungscode und einen Verifizierungslink vom Ministerium für Industrie und Informationstechnologie. Öffnen Sie den Link und füllen Sie Code + persönliche Informationen aus (Verifizierung 1 Tag gültig). Wenn die Registrierung bestanden wird, erhalten Sie E-Mail- und SMS-Benachrichtigung mit Registrierungsnummer.
WeChat-Verifizierung: Einzelpersonen zahlen normalerweise 30 CNY, Unternehmen ca. 300 CNY. Die Gebühr ist unabhängig vom Genehmigungsergebnis nicht erstattungsfähig. Sie erhalten möglicherweise einen Verifizierungshinweis und einen Bestätigungsanruf.

Beim Einreichen zur Überprüfung laden Sie ein Betriebsvideo/-screenshots hoch und füllen die erforderlichen Informationen aus. Klicken Sie dann auf "Submit Release" für den formellen Start.

![](/zh-cn/stage-3/cross-platform/wechat-miniprogram/images/image42.png)

# 5. Zusammenfassung

An diesem Punkt haben Sie einen vollständigen **0-zu-1** Mini-Program-Entwicklungsablauf abgeschlossen: vom Verstehen von Mini Programs über die Installation von Trae, HBuilderX und WeChat DevTools; von der Weitergabe Ihrer Idee an KI und dem Lassen "Ziegel tragen" im Code bis zum Spielen der ersten Snake-Version im Simulator; dann Verpacken als Erfahrungsversion, Abschließen von Registrierung/Überprüfung und dem Echtverfügbar-Machen in WeChat - Sie haben die vollständige Kette einmal persönlich durchlaufen.

Wichtiger noch: Sie haben dies nicht durch Auswendiglernen von Syntax erreicht. Sie haben es erreicht durch klares Ausdrücken von Anforderungen + effektive Kommunikation mit KI. Sie haben bereits erlebt: **eine natürlichsprachige Anweisung kann KI Ihre Entwicklungsbedürfnisse sehr effektiv erfüllen lassen.** Diese Fähigkeit ist nicht auf Snake beschränkt. Sie kann auf jedes Mini Program übertragen werden, das Sie später bauen wollen - Tools, Veranstaltungsseiten, Bildungs-Apps oder echte Arbeitsprojekte.

Wenn wir in eine **allgemeine SOP** zusammenfassen, sind es nur fünf Schritte:
**Eine kleine Anforderung klären -> Projektgerüst in Trae bauen -> Vibecoding + KI verwenden, um die erste Version zu erstellen -> wiederholt spielen-testen und in WeChat DevTools verbessern -> hochladen, registrieren, überprüfen und veröffentlichen.**
Jedes Mal, wenn Sie diese fünf Schritte wiederholen, erhalten Sie ein weiteres echtes Mini Program, das geöffnet und geteilt werden kann, und eine weitere Schicht an Zuversicht: "Ich kann KI nutzen, um Ideen in Produkte zu verwandeln."

Als Nächstes können Sie weiterhin diese Snake-App polieren oder sie schließen und ein leeres Projekt mit Ihrer eigenen Idee starten. Egal was Sie bauen, merken Sie sich eines: Sie sind nicht mehr nur jemand, der "etwas bauen will." Sie sind bereits ein Vibecoding-Entwickler, der den vollständigen Arbeitsablauf durchlaufen hat. Der Rest ist Wiederholung, bis diese Fähigkeit zur Gewohnheit wird.

# Referenzen:

- https://zhuanlan.zhihu.com/p/1889401120939567074
- https://blog.csdn.net/2401_87407347/article/details/155193007
