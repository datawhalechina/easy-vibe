# KI-gestützter Entwicklungs-Workflow

In den vorherigen Kapiteln haben wir gelernt, wie man KI-IDEs zum Programmieren nutzt, wie man Code-Versionen mit Git verwaltet und wie man API-Schnittstellen entwirft und implementiert. Wenn Sie jedoch vor einer echten Entwicklungsaufgabe stehen, tauchen möglicherweise folgende Fragen auf:

- "Dieses Projekt hat Tausende von Dateien. Wo soll ich anfangen?"
- "Mein Chef hat mich gebeten, eine neue Funktion hinzuzufügen, aber ich kenne diesen Teil der Codebasis nicht."
- "Ich habe keine Ahnung, wo dieser Fehler steckt. Es gibt einfach zu viel Code."
- "Ich muss diesen Codehaufen refaktorieren, aber ich habe Angst, etwas zu beschädigen."

Der Kern dieser Fragen ist: **Wie nutzt man KI-Tools in echten Entwicklungsszenarien effizient, um Aufgaben zu erledigen?**

In dieser Lektion lernen wir, wie man einen systematischen, KI-gestützten Entwicklungs-Workflow aufbaut, damit Sie KI in verschiedenen Entwicklungsszenarien effizient einsetzen können. Anhand konkreter Beispiele zeigen wir, wie man KI bei der Entwicklung neuer Funktionen, der Fehlerbehebung, der Coderefaktorierung und mehr einsetzt.

> 💡 **Voraussetzungen**
>
> Bevor Sie diesen Abschnitt studieren, wird empfohlen, sich zuerst mit folgenden Themen vertraut zu machen:
> - [Grundlagen der KI-IDE](../../stage-1/ai-ide/) - Beherrschung der grundlegenden Verwendung von KI-IDEs
> - [Git- und GitHub-Workflow](../../stage-2/backend/git-workflow/) - Verständnis der Code-Versionsverwaltung
> - [Große Modelle zum Schreiben von API-Code nutzen](../../stage-2/backend/ai-interface-code/) - Verständnis des Grundkonzepts der KI-gestützten Entwicklung

::: info 📚 Was Sie lernen werden

1. Verstehen der Rolle der KI im Entwicklungsprozess und ihrer Fähigkeitsgrenzen
2. Beherrschen von KI-gestützten Entwicklungsstrategien für verschiedene Projekttypen
3. Lernen, wie man Claude Code in Szenarien wie Entwicklung neuer Funktionen, Fehlerbehebung und Coderefaktorierung einsetzt
4. Aufbau einer Projektwissensbasis zur Verbesserung der Zusammenarbeitseffizienz mit Claude Code
5. Beherrschen praktischer Techniken zur Verbesserung der KI-Zusammenarbeitseffizienz

:::

# 1. KI-Fähigkeitsgrenzen verstehen

Bevor wir beginnen, KI zur Unterstützung der Entwicklung einzusetzen, müssen wir zunächst verstehen, was KI kann und was nicht. Nur so können wir das richtige Zusammenarbeitsmodell aufbauen.

## 1.1 Wofür KI gut ist

Betrachten Sie KI als einen sehr intelligenten Assistenten, der dennoch klare Anweisungen benötigt. Sie kann schnell ein Codegerüst basierend auf Ihrer Beschreibung erstellen und in Sekunden Tausende von Codezeilen lesen, um den Teil zu finden, den Sie brauchen. Wenn es offensichtliche Syntaxfehler oder häufige Sicherheitslücken gibt, kann sie Ihnen helfen, diese zu entdecken. Wiederkehrende Aufgaben wie das Umbenennen von Variablen im Stapelverfahren, das Formatieren von Code und das Generieren von Dokumentationskommentaren sind besonders geeignet, um sie an KI zu übergeben.

Kurz gesagt: KI ist gut bei Arbeiten, die klare Regeln haben und automatisiert werden können.

## 1.2 Wofür KI nicht gut ist

Aber KI hat auch ihre Grenzen. Sie versteht Ihre Geschäftslogik nicht. Es sei denn, Sie erklären es ihr im Detail, sie wird nicht wissen, wie der Bestellprozess Ihres Unternehmens funktioniert. Sie kann auch keine Entscheidungen wie Technologieauswahl oder Architekturdesign treffen, die das Abwägen von Kompromissen erfordern, da diese von Ihrer Erfahrung und Ihrem Verständnis des Projekts abhängen. KI kennt auch nicht die besonderen Konventionen Ihres Teams, wie z. B. "Alle APIs müssen Logging haben" oder "Fehlercodes müssen Enums verwenden." Sie müssen diese Regeln konfigurieren oder der KI explizit mitteilen.

Das Wichtigste ist: Von KI generierter Code kann nicht direkt verwendet werden. Sie müssen ihn überprüfen und testen. Er kann Code generieren, der korrekt aussieht, aber tatsächlich problematisch ist, und er kann bestimmte Randfälle übersehen.

## 1.3 Wie man mit KI zusammenarbeitet

Sobald Sie die Fähigkeitsgrenzen der KI verstanden haben, wird das Zusammenarbeitsmodell klar: Sie sind verantwortlich für die Entscheidung, was gebaut werden soll, für Entscheidungsfindung und Qualitätssicherung; KI ist verantwortlich für die Ausführung konkreter Programmieraufgaben, das Auffinden von Informationen und das Aufdecken offensichtlicher Probleme.

Es ist wie die Zusammenarbeit mit einem Junior-Entwickler. Sie sagen ihm, was getan werden muss, er setzt es um, und dann überprüfen Sie den Code. Der Unterschied ist, dass KI viel schneller ausführt, aber ihr Urteilsvermögen schwächer ist als das eines Menschen.

# 2. Entwicklungsstrategien für verschiedene Projekttypen

Verschiedene Projekttypen erfordern unterschiedliche Entwicklungsansätze und KI-Nutzungsstrategien. Die Wahl der richtigen Strategie kann die Entwicklungseffizienz erheblich steigern.

## 2.1 Neue Projekte (Von Grund auf neu)

**Projektmerkmale:**
- Keine historische Belastung, sodass Sie frei gestalten können
- Sie müssen die Projektstruktur und Codekonventionen festlegen
- Geeignet für schnelle Iteration und Versuch-und-Irrtum

**Empfohlener Workflow:**

**Schritt 1: Projektstruktur planen**

Bevor Sie mit dem Programmieren beginnen, lassen Sie KI zuerst helfen, die Projektstruktur und Technologieauswahlen zu planen:

```text
Ich möchte eine Aufgabenverwaltungs-App mit folgenden Funktionen erstellen:
- Benutzerregistrierung und Anmeldung
- Erstellen, Bearbeiten und Löschen von Aufgaben
- Aufgabenkategorien und Schlagwörter
- Aufgabenerinnerungen

Bitte helfen Sie mir:
1. Empfehlen Sie einen geeigneten Technologie-Stack
2. Entwerfen Sie die Projektverzeichnisstruktur
3. Planen Sie das Datenbankschema
```

**Schritt 2: Grundlegendes Gerüst aufbauen**

Basierend auf dem Plan lassen Sie KI die grundlegende Projektstruktur erstellen:

```text
Basierend auf dem Plan, den wir gerade besprochen haben, helfen Sie mir:
1. Erstellen Sie die Projektverzeichnisstruktur
2. Konfigurationsdateien initialisieren (package.json, .env usw.)
3. Den grundlegenden Servercode erstellen
```

**Schritt 3: Funktionen nacheinander implementieren**

Implementieren Sie Funktionsmodule nacheinander nach Priorität:

```text
Jetzt implementieren Sie die Benutzerregistrierungsfunktion mit folgenden Anforderungen:
- Registrierung mit E-Mail und Passwort
- Passwörter verschlüsselt speichern
- E-Mail-Verifizierung
```

**Wichtige Punkte:**
- Codekonventionen früh festlegen, damit KI Code generiert, der ihnen folgt
- Jedes Funktionsmodul nach Abschluss sofort testen und verifizieren
- Projektdokumentation rechtzeitig aktualisieren

## 2.2 Ausgereifte Projekte (Große bestehende Codebasen)

**Projektmerkmale:**
- Große Codebasis mit historischen Konventionen
- Sie müssen den Codestil konsistent halten
- Änderungen müssen den Auswirkungsbereich berücksichtigen

**Empfohlener Workflow:**

**Schritt 1: Projektstruktur verstehen**

Bevor Sie Code ändern, lassen Sie KI zuerst helfen, das Projekt zu verstehen:

```text
Dies ist ein E-Commerce-Projekt, und ich muss eine Gutscheinfunktion hinzufügen.
Bitte helfen Sie mir:
1. Analysieren Sie die Gesamtprojektstruktur
2. Finden Sie den bestellungsbezogenen Code
3. Sehen Sie, wie andere ähnliche Funktionen implementiert sind
```

**Schritt 2: Referenzcode finden**

Lassen Sie KI ähnliche Implementierungen im Projekt als Referenzen finden:

```text
Finden Sie, wie andere Werbefunktionen im Projekt, wie z. B. Mengenrabatte und Ermäßigungen, implementiert sind
```

**Schritt 3: Dem bestehenden Stil folgen**

Lassen Sie KI die neue Funktion im Stil des bestehenden Codes implementieren:

```text
Bitte implementieren Sie die Gutscheinfunktion unter Bezugnahme auf die Implementierung des Mengenrabatts.
Behalten Sie denselben Codestil und dieselbe Verzeichnisstruktur bei.
```

**Wichtige Punkte:**
- Erst verstehen, dann ändern, um die bestehende Architektur nicht zu beschädigen
- Codestil konsistent halten
- Verwandte Funktionen nach der Änderung testen

## 2.3 Schnelle Prototypen (Ideen validieren)

**Projektmerkmale:**
- Geschwindigkeit ist am wichtigsten, Codequalität ist weniger wichtig
- Wird verwendet, um Produktideen oder technische Ansätze zu validieren
- Kann später verworfen oder neu geschrieben werden

**Empfohlener Workflow:**

**Anforderung direkt beschreiben und schnell implementieren:**

```text
Erstellen Sie eine einfache Todo-App mit folgenden Anforderungen:
- Hinzufügen, Löschen und Markieren von Aufgaben als erledigt
- Daten lokal speichern
- UI einfach halten, solange es funktioniert
```

**Schnell iterieren:**

```text
Suche hinzufügen
Auf ein dunkles Thema umstellen
Aufgabenkategorien hinzufügen
```

**Wichtige Punkte:**
- Nicht zu sehr über Codequalität oder Konventionen sorgen
- Ideen schnell validieren und Richtung rechtzeitig anpassen
- Wenn der Prototyp erfolgreich ist, muss er später refaktoriert werden

## 2.4 Wartungsprojekte (Hauptsächlich Fehlerbehebung)

**Projektmerkmale:**
- Der Code ist bereits stabil, die Hauptaufgabe ist die Behebung von Problemen
- Sie müssen Probleme schnell lokalisieren
- Änderungen müssen sorgfältig vorgenommen werden, um neue Probleme zu vermeiden

**Empfohlener Workflow:**

**Schritt 1: Problem lokalisieren**

```text
Benutzerrückmeldung: Nach dem Klicken auf die Schaltfläche "Bestellung absenden" friert die Seite ein
Konsolenfehler: TypeError: Cannot read property 'id' of undefined

Bitte helfen Sie mir:
1. Mögliche Ursachen analysieren
2. Den relevanten Code finden
```

**Schritt 2: Grundursache analysieren**

```text
Prüfen, in welchen Situationen dieser Fehler auftritt
Den Datenfluss inspizieren
```

**Schritt 3: Fix anwenden**

```text
Beheben Sie dieses Problem und:
1. Defensiven Code hinzufügen, um ähnliche Probleme zu vermeiden
2. Fehlermeldungen hinzufügen, um die Benutzererfahrung zu verbessern
```

**Wichtige Punkte:**
- Nach dem Fix gründlich testen, um sicherzustellen, dass keine andere Funktionalität beeinträchtigt wird
- Defensiven Code hinzufügen, um die Systemrobustheit zu verbessern
- Das Problem und die Lösung für zukünftige Bezugnahme aufzeichnen

# 3. Workflows für häufige Entwicklungsaufgaben

In der täglichen Entwicklung begegnen wir vielen verschiedenen Aufgabentypen. Im Folgenden werden mehrere der häufigsten KI-gestützten Workflows vorgestellt.

## 3.1 Entwicklung einer neuen Funktion

**Szenario:** Der Produktmanager gibt Ihnen eine neue Anforderung, und Sie müssen eine neue Funktion implementieren.

**Vollständiger Workflow:**

**Schritt 1: Anforderung verstehen** (von Ihnen)

Bevor Sie mit dem Programmieren beginnen, klären Sie zuerst:
- Welche Funktion muss implementiert werden?
- Was sind die Ein- und Ausgaben?
- Was sind die Randbedingungen und Ausnahmefälle?
- Was sind die Leistungs- und Sicherheitsanforderungen?

**Schritt 2: Bestehenden Code verstehen** (KI um Hilfe bitten)

```text
Ich muss eine Benutzerkommentarfunktion implementieren. Bitte helfen Sie mir:
1. Zu prüfen, ob es etwas Ähnliches im Projekt gibt
2. Herauszufinden, wie Benutzerdaten und Artikeldaten gespeichert sind
3. Die Datenbankoperationskonventionen in diesem Projekt zu verstehen
```

**Schritt 3: Implementierungsplan erstellen** (mit KI)

```text
Basierend auf der Analyse, die wir gerade durchgeführt haben, erfordert die Implementierung der Kommentarfunktion:
1. Erstellen eines Kommentardatenmodells
2. Implementieren von CRUD-APIs für Kommentare
3. Hinzufügen von Kommentar-Anzeige und -Veröffentlichungsfunktion im Frontend

Bitte helfen Sie mir zu bestätigen, ob dieser Plan vernünftig ist und ob etwas fehlt
```

**Schritt 4: Funktion implementieren** (KI generiert, Sie überprüfen)

```text
Gemäß dem Plan zuerst das Kommentardatenmodell implementieren.
Anforderungen:
- Kommentarinhalt, Autor, Artikel-ID und Erstellungszeitpunkt einschließen
- Verschachtelte Kommentarantworten unterstützen
- Notwendige Indizes hinzufügen
```

```text
Jetzt die Kommentar-API-Endpunkte implementieren.
Anforderungen:
- Einen Kommentar veröffentlichen
- Einen Kommentar löschen (nur eigene Kommentare können gelöscht werden)
- Alle Kommentare für einen Artikel abrufen
- Paginierung unterstützen
```

```text
Schließlich die Frontend-Kommentarkomponente implementieren.
Anforderungen:
- Die Kommentarliste anzeigen
- Kommentar-Veröffentlichungsformular
- Antworten auf Kommentare unterstützen
```

**Schritt 5: Testen und Verifizieren** (von Ihnen)

- Den Hauptfluss manuell testen
- Randfälle testen wie leeren Inhalt und zu langen Inhalt
- Berechtigungskontrolle testen wie die Unfähigkeit, den Kommentar einer anderen Person zu löschen
- KI bitten, beim Schreiben automatisierter Tests zu helfen

**Beispiel für ein reales Gespräch:**

```text
Sie: Ich möchte eine Benutzerkommentarfunktion hinzufügen, damit Benutzer Kommentare zu Artikeln veröffentlichen können

KI: Okay, lassen Sie mich zuerst die Projektstruktur verstehen.
    [KI analysiert den Projektcode]
    Ich sehe, dass das Projekt bereits ein Benutzersystem (models/user.js)
    und ein Artikelsystem (models/article.js) hat.

    Die Implementierung der Kommentarfunktion erfordert:
    1. Erstellen eines Kommentardatenmodells (models/comment.js)
    2. Hinzufügen kommentarbezogener APIs (routes/comment.js)
    3. Hinzufügen von Kommentar-Anzeige und -Veröffentlichungsfunktion auf der Artikeldetailseite

    Soll ich mit der Implementierung beginnen?

Sie: Ja, lassen Sie uns anfangen. Erstellen Sie zuerst das Datenmodell

KI: [Generiert models/comment.js]
    Ich habe das Kommentardatenmodell mit folgenden Feldern erstellt:
    - id: Kommentar-ID
    - content: Kommentarinhalt
    - userId: Autor-ID
    - articleId: Artikel-ID
    - parentId: Übergeordnete Kommentar-ID (für verschachtelte Antworten)
    - createdAt: Erstellungszeitpunkt

    Soll ich als Nächstes die API implementieren?

Sie: Ja, implementieren Sie die API
```

## 3.2 Fehlerbehebung

**Szenario:** Ein Benutzer meldet ein Problem, und Sie müssen es schnell lokalisieren und beheben.

**Vollständiger Workflow:**

**Schritt 1: Informationen sammeln** (von Ihnen)

Notieren Sie folgende Informationen:
- Wie lautet die Fehlermeldung?
- Wie kann dieses Problem reproduziert werden?
- Wann hat es angefangen aufzutreten?
- Wie groß ist der Auswirkungsbereich?

**Schritt 2: Problem lokalisieren** (KI um Hilfe bitten)

```text
Benutzerrückmeldung: Nach dem Klicken auf die Schaltfläche "Bestellung absenden" friert die Seite ein
Browser-Konsolenfehler: TypeError: Cannot read property 'id' of undefined
Der Fehler tritt in Zeile 45 von checkout.js auf

Bitte helfen Sie mir:
1. Mögliche Ursachen zu analysieren
2. Den relevanten Code zu finden
3. Den Datenfluss zu überprüfen
```

**Schritt 3: Grundursache analysieren** (mit KI)

```text
Überprüfen, woher dieses Benutzerobjekt kommt
Untersuchen, unter welchen Umständen user undefined sein könnte
```

**Schritt 4: Fix implementieren** (KI generiert, Sie überprüfen)

```text
Beheben Sie dieses Problem mit folgenden Anforderungen:
1. Defensiven Code hinzufügen, um zu prüfen, ob der Benutzer existiert
2. Wenn der Benutzer nicht existiert, zur Anmeldeseite umleiten
3. Eine benutzerfreundliche Fehlermeldung hinzufügen
```

**Schritt 5: Fix verifizieren** (von Ihnen)

- Das Problem mit den ursprünglichen Schritten reproduzieren und bestätigen, dass es gelöst ist
- Verwandte Funktionalität testen, um sicherzustellen, dass keine neuen Probleme eingeführt wurden
- Überlegen, ob ähnliche Probleme anderswo existieren

**Beispiel für ein reales Gespräch:**

```text
Sie: Ein Benutzer hat gemeldet, dass nach dem Anmelden das Aktualisieren der Seite ihn abmeldet

KI: Dies ist normalerweise ein Token-Speicher- oder Validierungsproblem. Lassen Sie mich prüfen:
    1. Wo wird das Token gespeichert, im localStorage oder in Cookies?
    2. Wird das Token beim Aktualisieren der Seite neu geladen?

    Bitte sagen Sie mir, welche Datei den tokenbezogenen Code enthält

Sie: utils/auth.js

KI: [Analysiert utils/auth.js]
    Ich habe das Problem gefunden: Das Token wird im sessionStorage gespeichert,
    und sessionStorage wird beim Aktualisieren der Seite gelöscht.

    Lösung: Verwenden Sie stattdessen localStorage

    Möchten Sie, dass ich es ändere?

Sie: Ja, ändern Sie es

KI: [Ändert den Code]
    Die Änderung ist abgeschlossen. Das Token wird jetzt im localStorage gespeichert,
    sodass es nach einer Seitenaktualisierung nicht verloren geht.

    Ich empfehle Ihnen zu testen:
    1. Anmelden und die Seite aktualisieren, um zu bestätigen, dass der Benutzer angemeldet bleibt
    2. Den Browser schließen und erneut öffnen, um zu bestätigen, dass der Benutzer angemeldet bleibt
```

## 3.3 Coderefaktorierung

**Szenario:** Der Code ist schwer zu warten geworden und muss refaktoriert werden, um die Codequalität zu verbessern.

**Vollständiger Workflow:**

**Schritt 1: Refaktorierungsziel definieren** (von Ihnen)

Klären Sie Folgendes:
- Welches Problem versuchen Sie zu lösen? (Duplizierter Code? Unübersichtliche Struktur? Leistungsprobleme?)
- Wie groß ist der Umfang der Refaktorierung?
- Welches Risikoniveau ist akzeptabel?

**Schritt 2: Refaktorierungsplan erstellen** (mit KI)

```text
Diese drei Funktionen (getUserList, getArticleList, getCommentList)
enthalten viel duplizierten Code für Paginierung, Sortierung und Filterung.

Bitte helfen Sie mir:
1. Die duplizierten Teile zu analysieren
2. Einen Refaktorierungsplan vorzuschlagen
3. Das Risiko der Refaktorierung zu bewerten
```

**Schritt 3: Sicherheitsnetz vorbereiten** (KI um Hilfe bitten)

```text
Vor der Refaktorierung schreiben Sie bitte zuerst Testfälle für mich,
sodass das Verhalten nach der Refaktorierung gleich bleibt
```

**Schritt 4: Schrittweise refaktorieren** (KI führt aus, Sie verifizieren)

```text
Gemäß dem Plan, den wir gerade besprochen haben, zuerst die gemeinsame Funktion extrahieren
```

```text
Jetzt die Datenstruktur optimieren
```

```text
Schließlich die Aufrufstellen aktualisieren
```

**Schritt 5: Ergebnis verifizieren** (von Ihnen)

- Alle Tests ausführen und sicherstellen, dass sie bestanden werden
- Schlüsselfunktionalität manuell testen
- Überprüfen, ob sich die Codequalität verbessert hat

**Beispiel für ein reales Gespräch:**

```text
Sie: Diese drei Funktionen haben viel duplizierten Code. Können Sie mir helfen, sie zu refaktorieren?
    [Den Code der drei Funktionen einfügen]

KI: Ich habe sie analysiert, die Hauptunterschiede sind:
    - getUserList: ruft die Benutzerliste ab
    - getArticleList: ruft die Artikelliste ab
    - getCommentList: ruft die Kommentarliste ab

    Ihre gemeinsame Logik ist Paginierung, Sortierung und Filterung.

    Refaktorierungsplan:
    1. Eine generische getList-Funktion extrahieren
    2. Die unterschiedlichen Teile als Parameter übergeben

    Dies kann 80% des duplizierten Codes reduzieren.

    Soll ich es implementieren?

Sie: Ja, aber helfen Sie mir zuerst, Testfälle zu schreiben

KI: [Generiert Tests]
    Ich habe Tests für alle drei Funktionen geschrieben,
    die die wichtigsten Anwendungsfälle abdecken.

    Kann ich jetzt mit der Refaktorierung beginnen?

Sie: Ja, mit der Refaktorierung beginnen

KI: [Refaktoriert den Code]
    Refaktorierung abgeschlossen. Ich habe eine generische getList-Funktion erstellt,
    und die ursprünglichen drei Funktionen rufen jetzt alle diese gemeinsame Funktion auf.

    Bitte führen Sie die Tests aus, um zu bestätigen, dass alles funktioniert: npm test
```

## 3.4 Code-Review

**Szenario:** Ein Teamkollege hat Code eingereicht, und Sie müssen ihn überprüfen.

**Vollständiger Workflow:**

**Schritt 1: Änderung schnell verstehen** (KI um Hilfe bitten)

```text
Zusammenfassen, was dieser PR geändert hat
Welche Dateien hauptsächlich geändert wurden
```

**Schritt 2: Häufige Probleme prüfen** (KI um Hilfe bitten)

```text
Diese Änderung überprüfen auf:
1. Sicherheitsprobleme (SQL-Injection, XSS usw.)
2. Leistungsprobleme (N+1-Abfragen, Speicherlecks usw.)
3. Offensichtliche Fehler
4. Ob der Codestil den Projektkonventionen folgt
```

**Schritt 3: Tiefergehende Überprüfung** (von Ihnen)

- Ob die Geschäftslogik korrekt ist
- Ob Randfälle berücksichtigt wurden
- Ob es einen besseren Implementierungsansatz gibt
- Ob Tests hinzugefügt werden sollten

**Schritt 4: Feedback geben** (von Ihnen)

- Die Stellen aufzeigen, die geändert werden müssen
- Erklären, warum sie geändert werden sollten
- Verbesserungsvorschläge machen

**Beispiel für ein reales Gespräch:**

```text
Sie: Helfen Sie mir, diesen PR zu überprüfen
    [PR-Link oder Code bereitstellen]

KI: Ich habe die Änderung überprüft und folgende Probleme gefunden:

    1. Sicherheitsprobleme:
       - Zeile 23: Benutzereingabe wird nicht maskiert, was zu XSS-Risiko führen kann
       - Zeile 45: Die SQL-Abfrage wird durch Zeichenkettenverkettung erstellt, was Injektionsrisiko birgt

    2. Leistungsprobleme:
       - Zeile 67: Die Datenbank wird innerhalb einer Schleife abgefragt, was ein N+1-Problem erzeugt

    3. Codequalität:
       - Die handleSubmit-Funktion ist zu lang (200 Zeilen); erwägen Sie eine Aufteilung
       - Fehlerbehandlung fehlt

    Möchten Sie, dass ich eines dieser Probleme im Detail erkläre?

Sie: Erklären Sie das SQL-Injection-Problem im Detail

KI: In Zeile 45:
    ```javascript
    const query = `SELECT * FROM users WHERE name = '${userName}'`;
    ```

    Dies verkettet Benutzereingaben direkt in die SQL-Anweisung.
    Wenn ein Benutzer `' OR '1'='1` eingibt, wird daraus:
    ```sql
    SELECT * FROM users WHERE name = '' OR '1'='1'
    ```
    Dies würde alle Benutzerdaten zurückgeben.

    Der richtige Ansatz ist die Verwendung einer parametrisierten Abfrage:
    ```javascript
    const query = 'SELECT * FROM users WHERE name = ?';
    db.query(query, [userName]);
    ```

    Möchten Sie, dass ich es behebe?
```

# 4. Aufbau einer Projektwissensbasis

Um KI zu helfen, Ihr Projekt besser zu verstehen, wird empfohlen, eine Wissensbasis innerhalb des Projekts aufzubauen. So kann KI gemäß Ihren Konventionen und Gewohnheiten arbeiten.

## 4.1 Eine Projektbeschreibungsdatei erstellen

Erstellen Sie eine `CLAUDE.md`- oder `AGENTS.md`-Datei im Projektstammverzeichnis, um wichtige Projektinformationen aufzuzeichnen:

```markdown
# Projektübersicht

## Projektzusammenfassung
Dies ist eine Online-Lernplattform, die Kursverwaltung, Benutzlernen, Aufgabenabgabe und weitere Funktionen bietet.

## Technologie-Stack
- Frontend: React 18 + TypeScript + Vite
- Backend: Node.js + Express + PostgreSQL
- Bereitstellung: Vercel (Frontend) + Railway (Backend)

## Projektstruktur
```
src/
├── components/     # React-Komponenten
├── pages/          # Seitenkomponenten
├── api/            # API-Aufrufe
├── utils/          # Hilfsfunktionen
└── types/          # TypeScript-Typdefinitionen
```

## Codekonventionen
- ESLint und Prettier zum Formatieren von Code verwenden
- Komponentendateien verwenden PascalCase (wie UserProfile.tsx)
- Hilfsfunktionen verwenden camelCase (wie formatDate.ts)
- Konstanten verwenden UPPER_SNAKE_CASE (wie API_BASE_URL)

## Entwicklungsworkflow
1. Einen Feature-Branch von main erstellen
2. Nach Abschluss der Entwicklung einen PR einreichen
3. Nach Bestehen des Code-Reviews zusammenführen

## Häufige Aufgaben
- Entwicklungsserver starten: `npm run dev`
- Tests ausführen: `npm test`
- Produktions-Build erstellen: `npm run build`
- Code formatieren: `npm run format`

## Hinweise
- Alle API-Aufrufe müssen Fehlerbehandlung enthalten
- Benutzereingaben müssen validiert und maskiert werden
- Parametrisierte Abfragen für Datenbankoperationen verwenden, um SQL-Injection zu vermeiden
- Vertrauliche Informationen (Passwörter, Token) dürfen nicht in Protokolle geschrieben werden

## Datenbankschema
- users: Benutzertabelle (id, email, password_hash, created_at)
- courses: Kurstabelle (id, title, description, teacher_id)
- enrollments: Einschrreibungstabelle (id, user_id, course_id, enrolled_at)
```

## 4.2 Häufige Probleme und Lösungen aufzeichnen

Erstellen Sie `docs/troubleshooting.md` im Projekt, um häufige Probleme aufzuzeichnen:

```markdown
# Häufige Probleme

## Probleme der Entwicklungsumgebung

### Problem: npm install schlägt fehl
**Ursache:** Node-Version ist inkompatibel
**Lösung:** Node.js 18 oder höher verwenden

### Problem: Datenbankverbindung schlägt fehl
**Ursache:** Umgebungsvariablen sind nicht konfiguriert
**Lösung:** .env.example in .env kopieren und die Datenbankverbindungsinformationen eintragen

## Funktionsprobleme

### Problem: Nach der Anmeldung wird der Benutzer beim Aktualisieren der Seite abgemeldet
**Ursache:** Das Token wird im sessionStorage gespeichert
**Lösung:** Auf localStorage umsteigen

### Problem: Bild-Upload schlägt fehl
**Ursache:** Dateigröße überschreitet das Limit
**Lösung:** Eine Dateigrößenprüfung im Frontend hinzufügen und auf 5 MB begrenzen
```

## 4.3 Technische Entscheidungsdatensätze pflegen

Erstellen Sie ein Verzeichnis `docs/decisions/`, um wichtige technische Entscheidungen aufzuzeichnen:

```markdown
# ADR-001: Wahl von PostgreSQL als Datenbank

## Status
Akzeptiert

## Kontext
Das Projekt muss eine relationale Datenbank auswählen. Die Kandidaten sind MySQL und PostgreSQL.

## Entscheidung
PostgreSQL wählen

## Begründung
1. Bessere JSON-Unterstützung, geeignet zum Speichern von Kursinhalten
2. Stärkere Volltextsuche
3. Das Team ist mit PostgreSQL vertrauter

## Konsequenzen
- Wir müssen PostgreSQL-spezifische Funktionen lernen
- Die Bereitstellung erfordert eine PostgreSQL-Umgebung
```

# 5. Techniken zur Verbesserung der KI-Zusammenarbeitseffizienz

Durch die Beherrschung einiger praktischer Techniken können Sie Ihre Zusammenarbeit mit KI effizienter gestalten.

## 5.1 Klar und spezifisch sein bei der Beschreibung von Problemen

**Schlechte Beschreibung:**
```text
Diese Funktion hat ein Problem
Helfen Sie mir, sie zu optimieren
```

**Gute Beschreibung:**
```text
Nachdem der Benutzer auf die Schaltfläche "Absenden" geklickt hat, wird das Formular nicht abgesendet
Die Browser-Konsole meldet: Uncaught TypeError: Cannot read property 'value' of null
Der Fehler tritt in Zeile 23 von form.js auf

Diese Liste lädt sehr langsam und hat 1000 Einträge
Bitte helfen Sie mir, eine Paginierung mit 20 Einträgen pro Seite hinzuzufügen
```

**Wichtige Punkte:**
- Spezifische Fehlerinformationen bereitstellen
- Das erwartete Ergebnis erklären
- Relevanten Kontext geben

## 5.2 Jeweils nur eine Aufgabe erledigen

**Schlechter Ansatz:**
```text
Helfen Sie mir, Anmeldung, Registrierung, Passwortwiederherstellung, Profilcenter,
Passwortänderung und E-Mail-Verifizierung zu implementieren
```

**Guter Ansatz:**
```text
Zuerst die Anmeldefunktion implementieren, mit folgenden Anforderungen:
- E-Mail- und Passwort-Anmeldung
- Anmeldestatus speichern
- Fehlermeldungen

(Nach Abschluss) Jetzt die Registrierungsfunktion implementieren

(Nach Abschluss) Jetzt die Passwortwiederherstellungsfunktion implementieren
```

**Wichtige Punkte:**
- Große Aufgaben in kleine Aufgaben aufteilen
- Nach jeder abgeschlossenen Aufgabe testen und verifizieren
- Bestätigen, dass keine Probleme vorliegen, bevor zur nächsten übergegangen wird

## 5.3 Ergebnisse zeitnah verifizieren

**Schlechter Ansatz:**
- KI 10 Dateien nacheinander ändern lassen
- Erst am Ende feststellen, dass die erste Änderung bereits falsch war
- Viel Zeit verschwenden

**Guter Ansatz:**
- Eine Datei ändern und sofort testen
- Bestätigen, dass kein Problem vorliegt, dann fortfahren
- Probleme sobald gefunden korrigieren

**Wichtige Punkte:**
- In kleinen Schritten vorgehen und schnelles Feedback einholen
- KI nicht blind vertrauen
- Die Kontrolle über den Code behalten

## 5.4 Kontext gut nutzen

**Technik 1: Auf vorheriges Gespräch verweisen**
```text
Gemäß dem Plan implementieren, den wir gerade besprochen haben
Auf die vorherige getUserList-Funktion verweisen
```

**Technik 2: Verwandten Code bereitstellen**
```text
Dies ist der bestehende Benutzermodellcode:
[Code einfügen]

Bitte das Artikelmodell im selben Stil implementieren
```

**Technik 3: Projekthintergrund erklären**
```text
Dies ist ein E-Commerce-Projekt mit React + Node.js
Es hat bereits ein Benutzersystem und ein Produktsystem
Jetzt müssen wir eine Warenkorbfunktion hinzufügen
```

## 5.5 Nützliche Gespräche speichern

**Szenario:** Sie haben ein komplexes Problem gelöst

**Vorgehensweise:**
1. Die Lösung in der Projektdokumentation aufzeichnen
2. Beim nächsten Auftreten eines ähnlichen Problems darauf zurückgreifen
3. Mit anderen Teammitgliedern teilen

**Beispiel:**

Erstellen Sie ein Dokument unter `docs/solutions/`:

```markdown
# Lösung des N+1-Abfrageproblems

## Problembeschreibung
Beim Abrufen der Artikelliste fragt das System die Autoreninformationen einmal pro Artikel ab,
was ein Leistungsproblem verursacht.

## Lösung
Eine JOIN-Abfrage verwenden, um alle Daten auf einmal abzurufen:

```sql
SELECT articles.*, users.name as author_name
FROM articles
LEFT JOIN users ON articles.author_id = users.id
```

**Ergebnis:** Abfragezeit sank von 2000 ms auf 50 ms

## 5.6 Die Kunst des Fragenstellens erlernen

**Technik 1: Zuerst "warum" fragen**
```text
Warum verursacht dieser Code ein Speicherleck?
Warum sollten wir useCallback statt einer normalen Funktion verwenden?
```

**Technik 2: Nach mehreren Optionen fragen**
```text
Welche verschiedenen Möglichkeiten gibt es, die Benutzerauthentifizierung zu implementieren?
Was sind die Vor- und Nachteile jeder Methode?
```

**Technik 3: Nach Erklärungen fragen**
```text
Wie funktioniert dieser Code?
Können Sie diesen Algorithmus im Detail erklären?
```

# 6. Häufig gestellte Fragen

## F1: Kann ich KI-generierten Code direkt verwenden?

**A:** Nein, nicht direkt. Er muss überprüft und getestet werden.

KI-generierter Code kann folgende Probleme haben:
- Logische Fehler oder schlechte Behandlung von Randfällen
- Nichteinhaltung der Codekonventionen des Projekts
- Sicherheitsrisiken
- Unzureichende Leistungsoptimierung

Sie müssen:
- Den generierten Code sorgfältig lesen
- Seine Logik verstehen
- Verschiedene Szenarien testen
- Bestätigen, dass er den Projektkonventionen folgt

## F2: Was ist, wenn KI mich missversteht?

**A:** Rechtzeitig korrigieren und die Anforderung erneut beschreiben.

```text
Das meinte ich nicht. Was ich meine ist...
Dieses Verständnis ist falsch. Es sollte sein...
Lassen Sie mich die Anforderung erneut beschreiben...
```

Wenn es nach mehreren Korrekturen immer noch falsch ist, können Sie:
- Mehr Kontext bereitstellen
- Konkrete Codebeispiele geben
- Die Aufgabe in kleinere Teile aufteilen

## F3: Was ist, wenn ich auf etwas stoße, das KI nicht lösen kann?

**A:** KI ist nicht allmächtig. Einige Probleme müssen Sie noch selbst lösen.

Probleme, die KI möglicherweise nicht lösen kann:
- Sehr neue Technologien (KI-Wissen hat ein Stichtags-Datum)
- Geschäftslogik, die einzigartig für Ihr Team ist
- Probleme, die Zugriff auf externe Systeme erfordern
- Komplexe Leistungsoptimierungsprobleme

In diesem Fall müssen Sie:
- Die offizielle Dokumentation lesen
- Nach verwandten Lösungen suchen
- Erfahrene Teamkollegen fragen
- In der Community fragen

## F4: Wie beurteile ich, ob der Vorschlag der KI vernünftig ist?

**A:** Verwenden Sie Ihre eigene Erfahrung und Ihr Wissen, um ihn zu beurteilen.

Bewertungskriterien:
- Ob er Best Practices folgt
- Ob Randfälle berücksichtigt werden
- Ob es potenzielle Sicherheitsrisiken gibt
- Ob er zum Technologie-Stack des Projekts passt
- Ob die Leistung akzeptabel ist

Wenn Sie sich nicht sicher sind, können Sie:
- KI bitten zu erklären, warum sie diesen Ansatz vorschlägt
- Nach alternativen Lösungen fragen
- Teammitglieder konsultieren

## F5: Wie sollte ein Team KI in der Zusammenarbeit nutzen?

**A:** Gemeinsame Konventionen und eine gemeinsame Wissensbasis aufbauen.

Empfehlungen für Teamzusammenarbeit:
- Die `CLAUDE.md`-Konfiguration des Projekts teilen
- Codekonventionen und Stil vereinheitlichen
- Lösungen für häufige Probleme aufzeichnen
- Regelmäßig nützliche Prompts teilen
- KI-generierten Code beim Code-Review überprüfen

## F6: Wie vermeide ich es, zu sehr von KI abhängig zu werden?

**A:** Weiterlernen und nachdenken. KI ist ein Assistent, kein Ersatz.

Empfehlungen:
- KI-generierten Code verstehen, anstatt ihn blind zu kopieren
- Konzepte, die Sie nicht verstehen, aktiv lernen
- Regelmäßig Grundlagenwissen wiederholen
- Zuerst versuchen, Probleme selbst zu lösen, dann KI zur Verifizierung nutzen
- Am Code-Review teilnehmen, um von der Erfahrung anderer zu lernen

# 7. Zusammenfassung

In diesem Kapitel haben Sie nun Folgendes gemeistert:

1. **KI-Fähigkeitsgrenzen**: Verstehen, wofür KI gut und wofür sie nicht gut ist, und das richtige Zusammenarbeitsmodell aufbauen
2. **Projekttyp-Strategien**: Unterschiedliche Entwicklungsstrategien für neue Projekte, ausgereifte Projekte, schnelle Prototypen und Wartungsprojekte
3. **Workflows für häufige Aufgaben**: Vollständige Workflows für Entwicklung neuer Funktionen, Fehlerbehebung, Coderefaktorierung und Code-Review
4. **Projektwissensbasis**: Lernen, wie man Projektdokumentation aufbaut, damit KI Ihr Projekt besser versteht
5. **Zusammenarbeitstechniken**: Praktische Wege zur Verbesserung der KI-Zusammenarbeitseffizienz

**Wichtigste Erkenntnisse:**

- **Klare Rollenverteilung**: Sie treffen Entscheidungen und sorgen für Qualität, KI übernimmt Ausführung und Unterstützung
- **Klare Kommunikation**: Spezifisch sein und eine Sache nach der anderen erledigen
- **Zeitnah verifizieren**: Nicht blind vertrauen, testen und verifizieren
- **Weiterlernen**: Die Fähigkeitsgrenzen der KI verstehen und das Zusammenarbeitsmodell kontinuierlich verbessern

Denken Sie daran: KI ist ein Werkzeug, kein Ersatz. Sie kann Sie effizienter machen, aber die endgültige Codequalität hängt immer noch von Ihrem Urteil ab. Beginnen Sie mit einfachen Aufgaben und bauen Sie schrittweise Vertrauen auf. Sie werden feststellen, dass KI Ihnen viel Zeit sparen und Ihnen ermöglichen kann, sich auf wertvollere Arbeit zu konzentrieren.

::: tip 💡 Nächster Schritt
Im nächsten Kapitel lernen wir, wie man KI für Code-Review und Qualitätssicherung einsetzt, um die Wartbarkeit und Sicherheit des Codes zu gewährleisten.
:::
