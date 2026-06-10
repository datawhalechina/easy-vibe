---
title: 'Prototyp erstellen - Von der Geschäftsanalyse zur Multi-Page-Produktprototyp-Implementierung'
description: 'Den vollständigen Kreislauf von der Geschäftsanalyse zur Multi-Page-Produktprototyp-Implementierung erleben. Lernen Sie, wie man das Geschäft befragt, Anforderungen zerlegt, AI IDE für Single-Page- und Multi-Page-Anwendungen nutzt und den Prototyp optimiert und testet.'
---

<script setup>
import { relatedArticlesMap } from '@theme/data/relatedArticles'

const duration = 'Etwa <strong>8 Stunden</strong>'
const relatedArticles =
  relatedArticlesMap['de-de/stage-1/building-prototype'] ?? []
</script>

# Anfänger III: Prototyp erstellen

## Kapitelübersicht

<ChapterIntroduction :duration="duration" :tags="['Geschäftsanalyse', 'Prototyp-Design', 'AI-unterstützte Programmierung', 'Multi-Page-Anwendung']" coreOutput="1 E-Commerce-Material-Workspace-Prototyp" expectedOutput="Interaktiver Web-Prototyp">

Im letzten Kapitel haben wir gelernt, wie man <strong>gute Ideen findet</strong> &mdash; von Nutzerbedürfnissen ausgehend und Richtungen findet, für die jemand zu zahlen bereit ist. Aber eine Richtung zu finden ist nur der erste Schritt. <strong>Die wahre Herausforderung für Produktmanager ist: Wie verwandelt man vage Anforderungen in ein nutzbares Produkt?</strong>

Dieses Kapitel löst ein <strong>reales Problem</strong>: Der Chef gibt Ihnen den Satz "Nutze AI, um die Effizienz beim Veröffentlichen von Produkten auf E-Commerce-Plattformen zu steigern" &mdash; wie machen Sie daraus einen <strong>nutzbaren Produktprototyp</strong>?

Im Gegensatz zum Snake-Spiel oder Taschenrechner zuvor <strong>kann man bei echten Geschäften nicht einfach Funktionen erfinden</strong>:

1. <strong>Schmerzpunkte klären</strong>: Mit dem Operations-Team sprechen, aus dem vagen "Effizienz steigern" die <strong>echten Schmerzpunkte</strong> herausholen
2. <strong>Prioritäten setzen</strong>: Aus vielen Problemen zunächst das <strong>schmerzhafteste</strong> lösen, nicht alles auf einmal
3. <strong>Schnell validieren</strong>: Mit AI IDE zunächst einen <strong>Single-Page-Prototyp</strong> erstellen, wenn er funktioniert, zu Multi-Page erweitern
4. <strong>Etwas Nutzbares erstellen</strong>: Am Ende einen <strong>demo-fähigen, bedienbaren E-Commerce-Material-Workspace</strong> liefern

Wir lernen den <strong>Übergang vom Spielzeug zur Anwendung</strong> und entwickeln <strong>Einfühlungsvermögen und das Nachdenken über echte Kundenbedürfnisse</strong>.

</ChapterIntroduction>

::: info Hinweis
In diesem Artikel könnten einige Geschäftsbegriffe vorkommen. Wenn Sie diese nicht verstheen, können Sie AI um eine Erklärung bitten.
:::

<div style="margin: 50px 0;">
  <ClientOnly>
    <StepBar :active="0" :items="[
      { title: 'Anforderungsanalyse', description: 'Von vage zu konkret' },
      { title: 'Single-Page-Validierung', description: 'Kernfunktion implementieren' },
      { title: 'Multi-Page-Erweiterung', description: 'Anwendungsstruktur vervollständigen' },
      { title: 'Optimierung', description: 'Nutzererfahrung verbessern' }
    ]" />
  </ClientOnly>
</div>

## 1. Anforderungen klären, bevor man Code schreibt

In den bisherigen Tutorials haben wir mit AI IDE mühelos Snake und verschiedene kleine Spiele generiert, aber das sind lediglich Spielzeugprojekte, die nicht im Berufs- oder Alltag eingesetzt werden können. Wenn wir AI-Fähigkeiten wirklich für alle nutzbar machen wollen, sollten wir Vibe Coding mit Lebens- und Arbeitsszenarien verbinden.

Im letzten Kapitel haben wir gelernt, wie man <strong>gute Ideen findet, für die jemand zu zahlen bereit ist</strong>. Aber eine Richtung zu finden ist nur der Anfang. Bei der echten Produktentwicklung werden Sie feststellen: <strong>Zwischen "wissen, was zu tun ist" und "wissen, wie man es umsetzt" liegt eine gewaltige Kluft.</strong>

Diese Kluft ist die <strong>Konkretisierung von Anforderungen</strong>.

Ein Beispiel: In Kurs- oder persönlichen Projekten beginnen wir oft mit der einfachsten ausführbaren Funktion:

- "Mach ein Kanban-Board, liste die Aufgaben auf."
- "Hilf mir, ein Zeichen-Tool zu erstellen."
- "Hilf mir, eine Umfrage-Software zu bauen."

Das sind oft nur ein Tool oder ein Funktionsmodul &ndash; nicht einmal ein klares Geschäftsproblem. Noch wichtiger: <strong>Diese Ideen sind oft nur "nützlich in Ihrer Meinung", nicht "was Nutzer wirklich brauchen."</strong>

In Unternehmens- oder Gründungsprojekten gehen Produktmanager und Ingenieure oft von einer größeren geschäftlichen Aufgabenstellung aus. Nehmen wir folgendes Szenario an:

<el-card shadow="hover" style="border-left: 5px solid #409EFF; background-color: #ecf5ff; margin: 20px 0;">
  <div style="font-weight: bold; color: #303133; margin-bottom: 10px;">Geschäftsszenario:</div>
  <div style="color: #606266; line-height: 1.6;">
    <p>Sie sind der E-Commerce-Operations-Produktmanager eines Shops. Der Chef gibt Ihnen eine vage, aber druckvolle Aufgabenstellung:</p>
    <p style="font-style: italic; margin-top: 10px;">"Alle nutzen AI für Bilder und Copywriting in WeChat-Öffentlichkeitskanälen, ganz einfach. Mach mal, dass wir beim Einstellen neuer Produkte auf Douyin E-Commerce effizienter werden."</p>
  </div>
</el-card>

Jetzt denken Sie vielleicht: "Chef, Sie träumen schon wieder!" In der Praxis ist solch vages Diktat jedoch sehr häufig &ndash; sogar häufiger als Ihre wöchentliche Bubble-Tea-Bestellung. Um ein fähiger Angestellter (oder besser: CEO eines Startups) zu sein, müssen wir lernen, von Selbstnutzungs-Tools zu echten Produktprototypen zu wechseln.

Da wir AI IDE gelernt haben, fällt uns diese Anforderung eigentlich leicht &ndash; man muss AI nur einen Prompt geben, alles erledigt der Agent:

```
Bitte beziehe dich auf meine Anforderung xxxx,
hilf mir, einen E-Commerce-Material-Workspace zu entwerfen,
der Generierung und Verwaltung von Produktbeschreibungen, Bildern, Videos etc. umfasst.
```

Wenn Sie begeistert diese Anforderung direkt in einen Prototyp umsetzen und dem Chef schicken &ndash; herzlichen Glückwunsch, Ihre Quartalsprämie ist gestrichen!

**Warum ist das so? Das ist genau der Kernschmerzpunkt, den wir lösen müssen:**

Bisher haben wir mit AI IDE nur Spielzeugprojekte wie Snake oder Taschenrechner gemacht &ndash; einfache Funktionen, man weiß, was man will, und man nutzt sie selbst. Aber **echte Geschäftsszenarien sind völlig anders**:

- **Sie sind nicht der Nutzer**: Der Chef will "Effizienz steigern", aber Sie wissen nicht, wie das Operations-Team täglich arbeitet und wo es hängt
- **AI kennt das Geschäft nicht**: Sie geben AI eine vage Anforderung, und es kann nur auf generischem Wissen raten &ndash; das Ergebnis sieht aus wie das Richtige, funktioniert aber in der Praxis nicht
- **Gute Idee ist nicht gleich gutes Produkt**: Sie denken, "AI-Generierung hinzufügen" sei cool, aber Nutzer brauchen es vielleicht gar nicht, oder es ist umständlicher als zuvor

**Deshalb müssen wir lernen: "Von der Idee zum Nutzer-Verständnis."** Nur wenn Ihre Kreativität wirklich fremde Probleme löst &ndash; durch Fragen und tiefes Geschäftsverständnis &ndash; können Sie wirklich Wertvolles schaffen. (Gute Ideen sind sogar wichtiger als gute Technik.)

### 1.1 Von der Vorstellung zur Realität: Lernen, das Geschäft zu befragen

::: info Zunächst klären: Was ist eine Anforderung? Was ist ein Geschäft?

**Anforderung** ist das, was Nutzer wirklich wollen &ndash; ihre Probleme, die sie lösen möchten. Zum Beispiel "Der Chef will, dass ich Produkte schneller einstelle" &ndash; das ist eine Anforderung.

**Geschäft** ist das, was Nutzer täglich tun &ndash; ihre Arbeitsweise. Zum Beispiel E-Commerce-Operations: Produkte einstellen, Preise ändern, Bilder erstellen, Daten analysieren... Das alles ist Geschäft.

**Warum sich fürs Geschäft interessieren?**
Weil Ihr Tool sonst "gut aussieht, aber niemand nutzt". Nur wenn Sie wirklich verstheen, wie Nutzer täglich arbeiten und wo sie feststecken, können Sie etwas bauen, das ihnen wirklich hilft.

:::

Aus der einfachsten Perspektive können Sie sich zunächst folgende Fragen stellen:

- Der Chef sagt "**etwas effizienter**" &ndash; was genau heißt das? **Schneller** machen? **Geld sparen**? **Mehr verkaufen**?
- Wie werden Produkte aktuell eingestellt? **Wo läuft es nicht rund**?
- Wie viele **neue Produkte** gibt es täglich? Wie viele **Bilder** und **Texte** pro Produkt?
- Was ist **am nervigsten**, was **möchte man am wenigsten tun**?

Das sind jedoch nur Vermutungen. Wir müssen direkt mit dem Douyin E-Commerce-Operations-Team sprechen: "Wo liegen eure Schwierigkeiten und worauf achtet ihr?" Durch Kommunikation erhalten wir präzisere Antworten:

::: info Echte Geschäftsbefragungsergebnisse

Wir haben E-Commerce-Operations-Mitarbeiter gefragt. Sie berichteten folgende Probleme:

**1. Zu viele Aufgaben, zu unübersichtlich**
- Eine Person muss mehrere Shops betreuen, jeder Shop hat viele Produkte
- Täglich hin- und herhetzen: **Neue Produkte einstellen**, **Preise ändern**, **Bilder erstellen**, **Daten analysieren** &ndash; eine Sache ist noch nicht fertig, die nächste ruft

**2. Inhalte werden nicht auf einmal erstellt, sondern iterativ**
- Zunächst **Herstellerbilder**, **frühere Materialien** oder **Referenzbilder aus dem Web** verwenden, um das Produkt **schnell einzustellen** und zu testen
- Etwas Geld für Werbung ausgeben, **schauen, ob jemand kauft**
- Nur bei **gut verkäuflichen Produkten** werden Bilder, Detailbeschreibungen und Videos sorgfältig erstellt

:::

Nach der Geschäftsbefragung sind wir voller Enthusiasmus &ndash; jetzt können wir wirklich den perfekten, geschäftsgerechten Produktprototyp erstellen! &mdash; Schon wieder falsch gedacht. Wenn wir versuchen, "alle Anforderungen auf einmal zu erfüllen", wird das Produkt riesig und lässt sich im Kurs-Zeitrahmen kaum realisieren. Deshalb müssen wir weiter strukturieren und verdichten, um den wahren Kernschmerzpunkt zu identifizieren.

### 1.2 Von Divergenz zu Konvergenz: Den Kernschmerzpunkt des Geschäfts identifizieren

::: info Warum "konvergieren"? Was ist ein "Schmerzpunkt"?

**Viele Probleme, aber welches zuerst?**

Nutzer erzählen Ihnen vielleicht eine Reihe von Problemen: A ist nervig, B ist nervig, C ist auch nervig... Aber wenn Sie versuchen, alle auf einmal zu lösen, wird wahrscheinlich nichts richtig. Deshalb **konvergieren** &mdash; aus vielen Problemen das **schmerzhafteste, dringendste, am besten lösbare** herausgreifen und zuerst angehen.

**Was ist ein Schmerzpunkt?**
Das ist das konkrete Problem, das Nutzer **am meisten nervt, am meisten Zeit kostet und am dringendsten lösen** wollen. Nicht "ich finde es nützlich", sondern etwas, über das Nutzer **täglich klagen und bei dem jeder Durchlauf quälend ist**.

:::

Durch das obige Interview haben wir viele Operations-Probleme entdeckt: Unterbrechung durch Aktionen, Verwaltung mehrerer Shops, ständiges Wechseln zwischen Einstellen/Ändern/Bilderstellen/Daten...

Wenn wir versuchen, "all diese Probleme zu lösen", erhalten wir ein **riesiges, aber unbrauchbares** Tool.

Lassen Sie uns diese Probleme kategorisieren (AI kann helfen). Es gibt grob drei Typen:

1. **Rhythmus-Probleme**: Wann Produkte einstellen, wann Preise anpassen
2. **Effizienz-Probleme**: Wie man mehrere Shops und Produkte gleichzeitig verwaltet
3. **Content-Probleme**: Wie man schnell Produktbilder und Copywriting erstellt

Für unseren Kurs ist **Typ 3: Content-Erstellung** am besten geeignet. Aber "schnell Content erstellen" ist immer noch abstrakt. Fragen wir das Geschäftsteam genauer:

::: info Das Geschäftsteam sagt: Content-Erstellung hat zwei schmerzhafteste Stellen

**Schmerz 1: Batch-Bilderstellung und Copywriting sind extrem mühsam**
- Materialien überall verteilt: Cloud-Speicher, WeChat-Verlauf, Plattform-Backend... **Schwer zu finden**
- Viele Produkte gleichzeitig einstellen, **keine Zeit für sorgfältige Erstellung**, nur schnell zusammenstellen
- Anspruch nicht hoch: **Sichtbar und einstellbar** reicht, muss nicht schick sein

**Schmerz 2: Gute Lösungen können nicht gespeichert und wiederverwendet werden**
- Früher gute Titel und Layouts: **Beim nächsten Mal nicht mehr auffindbar**
- Lösungen verstreut in Chat-Verläufen und alten Produkt-Links
- Wenn man sie braucht: **Halben Tag suchen, kopieren, ändern**
- Es fehlt ein Tool zum **Sammeln, Verwalten und direkten Wiederverwenden**

:::

Basierend auf diesen beiden Schmerzpunkten erstellen wir ein einfaches kleines Tool: **Operations-Team bei Batch-Bilderstellung und Copywriting helfen, plus gute Lösungen für spätere Wiederverwendung speichern**.

Es macht nur zwei Dinge (lassen Sie AI bei der Detaillierung helfen, und denken Sie daran, Funktionen basierend auf Geschäfts-Feedback kontinuierlich zu reduzieren):

::: info Funktion 1: Batch-generierte E-Commerce-Produktbilder und Copywriting

**Was macht das?**
Dem System Produktinformationen geben, und es generiert automatisch Produktbilder und Texte, die auf E-Commerce-Plattformen (wie Douyin, Taobao) eingestellt werden können.

**Eingabe**
| Typ | Inhalt |
|------|------|
| Produktinformationen | Name, Kategorie, Marke, Material, Größe, Farbe etc. |
| Produktbilder | Weißgrund oder einfaches Szenario-Foto |
| Referenzbilder | Screenshots früherer Bestseller oder Referenz-Links |
| Import-Methode | Excel Batch-Import oder direkt auf der Seite ausfüllen |

**Ausgabe (generierte E-Commerce-Materialien)**
- **Produkt-Hauptbild**: Produktansicht mit Text-Selling-Points (das Bild, das Nutzer beim Scrollen zuerst sehen)
- **Produkttitel**: Keyword-Kombination, die bei der Suche gefunden wird
- **Selling-Point-Copywriting**: 1-2 Sätze, die Käufer anziehen
- Alles **nach kleiner Korrektur einstellbar**

**Ergebnis**
- Früher: Jedes Produkt von Grund auf neu erstellen
- Jetzt: Eine Charge Produkte ins System geben, Entwürfe generieren, auswählen und nachbessern

:::

::: info Funktion 2: Gute Lösungen als Vorlagen speichern

**Eingabe**
| Typ | Inhalt |
|------|------|
| Ein kompletter Satz | Hauptbild + Titel + Copywriting |

**Ausgabe**
| Funktion | Beschreibung |
|------|------|
| Anwenden | Beim nächsten neuen Produkt die Vorlage automatisch anwenden |
| Bearbeiten | Titel und Copywriting direkt ändern |
| Verwalten | Benennen, taggen (z.B. "Herrentaschen-Vorlage", "Großverkaufs-Titel"), leicht auffindbar |

**Ergebnis**
1. Neues Produkt importieren
2. Auswählen: Systemstandard-Generierung oder **meine gespeicherte Vorlage verwenden**
3. System wendet automatisch Vorlagen-Stil an und generiert neue Bilder und Copywriting

:::

---

**Rückblick auf das, was wir gerade getan haben:**

1. **Zuerst Fragen stellen**: Nicht direkt mit dem Programmieren beginnen, sondern zuerst das Operations-Team fragen "Was nervt euch am meisten"
2. **Schmerzpunkte finden**: Entdeckt, dass sie am meisten unter "Bilder und Copywriting erstellen ist zu mühsam" und "gute Lösungen können nicht gespeichert werden" leiden
3. **Umfang eingrenzen**: Keine allesumfassende Plattform bauen, sondern nur "Batch-Generierung von Bildern und Copywriting + Vorlagen speichern" &ndash; diese beiden Funktionen

**Warum ist das so wichtig?**

Ein häufiger Fehler von Anfängern bei der Produktentwicklung ist: Mehr Funktionen ist besser. Aber was Nutzer wirklich brauchen, ist **die Lösung des schmerzhaftesten Problems**. Eine Reihe von Funktionen, die alle nicht richtig funktionieren, ist schlechter als ein bis zwei Funktionen, die Nutzer wirklich unterstützen.

**Kern des Produkt- und Geschäftsdenkens:**
- Nicht selbst denken "Ich glaube, Nutzer brauchen das"
- Nutzer fragen "Was machst du jeden Tag? Wo tut es am meisten weh?"
- Aus einer Menge von Problemen **konvergieren** auf das schmerzhafteste, am besten lösbare
- Zuerst die **minimal nutzbare** Version erstellen, dann schrittweise iterieren

Das ist es, was wir klären müssen, bevor wir Code schreiben. Code ist nur ein Werkzeug &ndash; **Nutzer verstheen, das richtige Problem finden** ist der erste Schritt.

<div style="margin: 50px 0;">
  <ClientOnly>
    <StepBar :active="1" :items="[
      { title: 'Anforderungsanalyse', description: 'Von vage zu konkret' },
      { title: 'Single-Page-Validierung', description: 'Kernfunktion implementieren' },
      { title: 'Multi-Page-Erweiterung', description: 'Anwendungsstruktur vervollständigen' },
      { title: 'Optimierung', description: 'Nutzererfahrung verbessern' }
    ]" />
  </ClientOnly>
</div>

## 2. In 10 Minuten einen Prototyp erstellen: AI IDE lässt die "Kernfunktion" Wirklichkeit werden

::: info Programmier-Plan-Empfehlung
Wenn Sie das Gefühl haben, dass Ihre aktuelle IDE nicht intelligent genug ist oder Ihr Kontingent schnell aufgebraucht ist, können Sie einen **Programmier-Plan** erwerben. Zur Vorbereitung lesen Sie [diesen Artikel](../../stage-2/backend/modern-cli/) über die Verwendung von Claude zum Programmieren.
:::

Nachdenken ist gut, aber man sollte nicht übermäßig reflektieren. Wir steuern die übermäßige Reflexion und versuchen, mit einer einzelnen Seite einen Prototyp zu erstellen.

### 2.1 Erster Schritt: AI in einfachen Worten sagen, was Sie wollen

Am Anfang müssen Sie keine perfekten Prompts anstreben. Beginnen Sie mit Ihrem natürlichsten Ausdruck. Beschreiben Sie AI wie einem Kollegen Ihre Anforderungen in einfachen Worten, und lassen Sie AI Ihnen helfen, sie in einen professionelleren Ausdruck zu optimieren.

#### 2.1.1 Mit einer mündlichen Beschreibung beginnen (empfohlen für Anfänger)

Beschreiben Sie Ihre Idee zuerst in Ihren eigenen Worten &ndash; auch wenn es noch so rau ist:

```
Ich möchte ein Tool erstellen, das E-Commerce-Operations-Mitarbeitern hilft,
automatisch Produkt-Hauptbilder und Copywriting zu generieren.
Operations-Mitarbeiter müssen aktuell manuell Bild für Bild und Text für Text
erstellen, was sehr mühsam ist.
Meine Idee: Sie laden Produktinformationen hoch, das System generiert automatisch
einen Satz Entwürfe, die Operations-Mitarbeiter wählen die brauchbaren aus,
ändern sie leicht und können sie verwenden.

Zuerst die einfachste Version: eine Seite, links Produktinformationen eingeben,
rechts die generierten Ergebnisse anzeigen. Bilder hochladen, Text eingeben,
nach der Generierung Hauptbild-Vorschau und Copywriting anzeigen.
```

Senden Sie diesen Text dann an eine AI (wie ChatGPT, Claude etc.), damit sie ihn für Sie erweitert. AI hilft Ihnen normalerweise dabei, Details zu ergänzen, an die Sie noch nicht gedacht haben, Ihre Ideen klarer zu strukturieren und schließlich einen Prompt zu generieren, der sich für AI IDE eignet.

Sie können AI so ansprechen:
```
Hilf mir, die obige Idee zu erweitern und in ein klares
Geschäftslogik-Dokument zu strukturieren. Generiere dann einen Prompt,
der sich für AI IDE (wie Cursor, Trae) eignet, um Single-Page-Prototyp-Code
zu generieren.
```

AI wird eine strukturierte Anforderung und den entsprechenden Prompt zurückgeben. Überprüfen Sie diese selbst, entfernen Sie unnötige Funktionen und bestätigen Sie sie, bevor Sie den Code generieren.

Der Vorteil dieses Ansatzes: Die mündliche Beschreibung enthält die authentischsten Ideen, kann aber wichtige Details übersehen. Wenn AI für Sie erweitert, könnte sie Fragen stellen wie "Soll Batch-Upload unterstützt werden?", an die Sie noch nicht gedacht haben. So können Sie Ihre Anforderungen weiter validieren. Sie können basierend auf dem Feedback entscheiden, ob Sie unpraktische Funktionen beibehalten oder entfernen möchten, und durch wiederholte Überarbeitung den ersten Prompt für AI festlegen.

#### 2.1.2 Den Erweiterungsschritt überspringen: Geschäftsdokument direkt an AI übergeben

Wenn Sie in den vorherigen Kapiteln bereits ein Geschäftslogik-Dokument erstellt haben (z.B. eine in einfachen Worten verfasste Anforderungsbeschreibung), können Sie das folgende Format direkt verwenden und an AI IDE senden &ndash; ohne den Zwischenschritt der AI-Erweiterung. Dies eignet sich, wenn die Anforderungen bereits klar sind und Sie direkt mit dem Programmieren beginnen möchten:

```
Hilf mir, basierend auf der Geschäftslogik eine Single-Page-Anwendung
zu implementieren, um die Kernfunktion zu validieren.

Geschäftslogik-Referenz:
1. Operations-Mitarbeitern helfen, die erste Version von Bild- und Textentwürfen
   stapelweise zu generieren:
- **Eingabe (direkter Upload und Batch-Import unterstützt):**
  - Produktbasisinformationen: Name, Kategorie, Marke, Material, Größe, Farbe,
    Zielgruppe etc.;
  - Produktbilder: Weißgrund / einfaches Szenario-Foto;
  - Bei jeder Generierung: zusätzlicher Upload von Screenshots früherer
    Bestseller oder Referenz-Links möglich;
  - Excel Batch-Import oder Online-Eingabe/Upload auf der Seite unterstützt.
  - Auf der Seite kann angegeben werden, ob Produktmaterialien in der
    Materialbibliothek gespeichert werden sollen, für spätere Verwendung.
- **Ausgabe (Inhalte, die direkt oder mit leichten Änderungen eingestellt
  werden können):**
  - Für jedes Produkt ein Hauptbild-Entwurf, der "ansehbar" ist und
    grundlegende Selling-Points enthält;
  - Ein "strukturgerechter" Titel mit Kern-Keywords + 1-2 Sätze
    Selling-Point-Copywriting.
- **Erwartete Änderung der Arbeitsweise:**
  Vom Neuentwurf für jede Produktcharge zum Einwerfen einer Charge in das
  System, mit System-Entwürfen zur Auswahl und Feinjustierung.

Zuerst die erste Funktion implementieren, die zweite Funktion (Vorlagenbibliothek)
wird später hinzugefügt.
```

#### 2.1.3 Der Programmierer-Ansatz (fortgeschritten): AI helfen lassen, einen "Prompt für Prompts" zu schreiben

Wenn Sie den Code-Generierungsprozess feiner steuern möchten, können Sie zuerst AI (wie ChatGPT) bitten, basierend auf Ihren Anforderungen einen speziell für AI IDE bestimmten Prompt zu generieren:

```
Basierend auf der folgenden Idee, hilf mir, einen Prompt für einen Coding Agent
zu schreiben, um Code zu generieren. Ich muss diesen Prompt verwenden, um Code
zu erstellen.

[Deine Geschäftslogik-Beschreibung hier einfügen]

Anforderungen:
1. Der Prompt soll eine klare Seitenlayout-Beschreibung enthalten
2. Datenstrukturen und Interaktionslogik klar definieren
3. Technology Stack angeben (z.B. React + Tailwind)
4. Die zu implementierenden Kernfunktionen auflisten
```

Normalerweise generiert AI einen strukturierten Prompt wie den folgenden:
![](../../../zh-cn/stage-1/building-prototype/images/index-2026-01-14-14-25-56.png)

Sie können diesen Prompt nach kleinen Anpassungen an AI IDE senden, um Code zu generieren.

### 2.2 Zweiter Schritt: AI IDE direkt Code generieren lassen

#### 2.2.1 Vorbereitung: Grundlegende Bedienung von AI IDE verstheen

Wenn Sie mit AI IDE (wie Cursor, Trae, Windsurf etc.) noch nicht vertraut sind, empfehlen wir, zunächst das [IDE-Grundlagen-Tutorial](/de-de/appendix/2-development-tools/ide-basics) im Anhang zu lesen, um zu erfahren:
- Wie man ein neues Projekt erstellt
- Wie man mit dem AI Agent kommuniziert
- Wie man den Code-Generierungsprozess der AI versthet

#### 2.2.2 Mit der Code-Generierung beginnen

Jetzt haben Sie den initialen Prompt erhalten. Wir nehmen den ersten Prompt-Stil als Beispiel und lassen AI uns beim Generieren von Code helfen. Erstellen Sie zuerst ein Fenster und den entsprechenden Ordner, öffnen Sie den Ordner (initialisieren Sie ein neues Projekt in Ihrem bevorzugten Ordner):
![](../../../zh-cn/stage-1/building-prototype/images/index-2026-01-14-14-28-44.png)
![](../../../zh-cn/stage-1/building-prototype/images/index-2026-01-14-14-30-00.png)

Wählen Sie in der Seitenleiste ein Modell Ihrer Wahl (empfohlen: gemini, gpt, glm, kimi, minimax etc.) und geben Sie den Prompt aus dem ersten Schritt ein:
![](../../../zh-cn/stage-1/building-prototype/images/index-2026-01-14-14-31-41.png)

Nach dem Klick auf Generieren sehen wir den vertrauten Vorgang: AI plant basierend auf dem Prompt die Verzeichnisstruktur des Projekts, die notwendigen Dateien und gibt den ursprünglichen Inhalt jeder Datei an.

::: warning Wichtiger Hinweis: AI kann anhalten und auf Ihre Bestätigung warten
Während des Generierungsprozesses hält der **AI Agent oft an und wartet auf Ihre Eingabe oder Bestätigung**, zum Beispiel:
- Fragt Sie, ob Sie mit dem nächsten Schritt fortfahren möchten
- Bittet Sie, die Eingabetaste zu drücken, um eine Aktion zu bestätigen
- Fragt Sie nach der Wahl eines technischen Details

**Wenn AI nicht mehr reagiert, prüfen Sie zuerst die Dialogoberfläche, ob sie auf Ihre Antwort wartet.** Viele Anfänger denken, AI würde noch nachdenken, aber sie hat bereits angehalten und wartet auf Sie. Aktiv antworten oder Eingabetaste drücken, dann arbeitet AI weiter.
:::

Vergessen Sie auch hier nicht, die Eingabetaste zu drücken, um die Informationen zu bestätigen (andernfalls geraten Sie in eine Warteschleife; einige AI IDEs haben dieses Problem nicht):
![](../../../zh-cn/stage-1/building-prototype/images/index-2026-01-14-14-33-03.png)

Wenn Sie die folgende Szene sehen, bedeutet das, dass bereits ein lokaler Dienst gestartet wurde. Sie müssen auf Überspringen klicken, sonst bleiben Sie auf dieser Oberfläche (wenn nach der Code-Generierung nichts erscheint, müssen Sie aktiv sagen: "Hilf mir, dieses Projekt zu starten"):
![](../../../zh-cn/stage-1/building-prototype/images/index-2026-01-14-14-38-11.png)

::: info Szenario-Erklärung
**Szenario-Beschreibung**: Sie haben mit `npm create vite@latest` ein React + TypeScript-Projekt (easy-vibe-web) erstellt. Nach Abschluss der Erstellung startet Ihr Computer automatisch die Webseite, damit Sie das Ergebnis sofort sehen können.

**Lokaler Dienst**: Kann als temporäres Webseiten-Anzeigefenster auf Ihrem Computer verstanden werden, das nur auf Ihrem eigenen Rechner läuft und für andere nicht zugänglich ist.

**localhost (lokale Adresse)**: `localhost` bedeutet "dieser Computer selbst". Wenn Sie im Browser darauf zugreifen, greifen Sie tatsächlich auf die Webseite zu, die auf Ihrem Computer läuft.

**Port**: Ein Port kann als Nummer verstanden werden, die verschiedene Webdienste auf demselben Computer unterscheidet. Dieses Projekt verwendet 5174.

**Zugriffslink `http://localhost:5174/`**: Diese Adresse bedeutet "Zugriff auf die Webseite mit der Nummer 5174 auf diesem Computer". Im Browser öffnen, um das Ergebnis zu sehen.

**Aktuelle Szenario-Erklärung**: Das System wollte ursprünglich 5173 verwenden, aber diese Nummer war bereits belegt, daher wurde automatisch auf 5174 gewechselt. Das ist normal.

**Bedienungsanleitung**: Öffnen Sie den Browser, geben Sie `http://localhost:5174/` in die Adressleiste ein und drücken Sie Enter, um die aktuelle Projektseite zu sehen.
:::

Nachdem alles bestätigt ist, warten Sie einen Moment, bis der Agent seine Arbeit beendet hat. Wir erhalten folgendes Ergebnis:
![](../../../zh-cn/stage-1/building-prototype/images/index-2026-01-14-14-50-34.png)

Man sieht bereits eine erste funktionale Ansicht, aber das Frontend sieht noch sehr unschön aus. Jetzt können wir versuchen, direkt mit AI zu dialogieren und die Oberfläche zu optimieren:
![](../../../zh-cn/stage-1/building-prototype/images/index-2026-01-14-15-01-16.png)

Nach der Optimierung erhalten wir eine deutlich ansprechendere Oberfläche:
![](../../../zh-cn/stage-1/building-prototype/images/index-2026-01-14-15-05-16.png)

Sie können die Webseiten-Funktionen nach Ihren eigenen Bedürfnissen anpassen, Screenshots anhängen und frei Fragen stellen, wie zum Beispiel: "Ich brauche die Batch-Import-Funktion derzeit nicht, bitte entfernen", "Links muss zu viel eingegeben werden, behalte nur xxxxx". Sie können sogar andere ausgereifte Websites als Referenz heranziehen &ndash; hier können wir direkt ein Design-Produkt von Google als "Referenz" verwenden (Sie können einen Screenshot einer ausgereiften Website einfügen, die Ihnen gefällt):
![](../../../zh-cn/stage-1/building-prototype/images/index-2026-01-14-15-13-12.png)

Schließlich erhalten wir:
![](../../../zh-cn/stage-1/building-prototype/images/index-2026-01-14-15-15-18.png)

### 2.3 Was tun bei Fehlern

In der Praxis sind Fehler unvermeidlich. Das ist normal und bedeutet nicht, dass Sie etwas falsch gemacht haben. Sie müssen die Fehler nicht verstheen &ndash; geben Sie einfach das "Was Sie sehen" vollständig an AI weiter.

Es gibt grundsätzlich drei Behandlungsmethoden:

- **Methode 1: Seiten- oder Terminal-Fehler**
  Wenn die Seite rot wird, weiß wird oder im Terminal viele rote Zeilen erscheinen, machen Sie einen Screenshot oder kopieren Sie die gesamte Fehlermeldung und senden Sie sie an AI, damit sie Ihnen bei der Reparatur hilft.

- **Methode 2: Funktion falsch, aber kein Fehler**
  Zum Beispiel reagiert ein Button nicht, Daten werden nicht angezeigt, das Layout ist durcheinander. Beschreiben Sie in einfachen Worten "Was gerade passiert + Was Sie eigentlich wollen", bei Bedarf mit einem Screenshot.

- **Methode 3: Unsicher, ob es ein Problem gibt**
  Sie können AI direkt fragen: "Hilf mir zu prüfen, ob diese Funktion offensichtliche Probleme hat und ob sie angepasst werden muss."

#### 2.3.1 Häufige Fragen von Anfängern

- **F: Ich weiß nicht, wo die Fehlermeldung ist?**
- A: Suchen Sie grundsätzlich nach allem, was "rot" ist. Im Terminal, in der Konsole oder auf der Seite &ndash; finden Sie die roten Hinweise, markieren Sie alles und kopieren Sie es zu AI.

- **F: AI hat es repariert, aber es kommt derselbe Fehler &ndash; was nun?**
- A: Das ist ein häufiges Szenario. Machen Sie weiterhin Screenshots oder kopieren Sie die neueste Fehlermeldung und senden Sie sie an AI, damit sie auf Basis der letzten Änderung weiter repariert.

- **F: Muss ich AI's Reparaturansatz vollständig verstheen?**
- A: Nicht auf einmal. Konzentrieren Sie sich jedes Mal auf ein bis zwei Punkte. Mit der Zeit werden Sie zunehmend mehr Code verstheen &ndash; wie beim Aufbau eines englischen Wortschatzes.

- **F: Viele Male geändert, das Problem ist immer noch nicht gelöst &ndash; was nun?**
- A: Sie können Folgendes versuchen:
  - Die "Versionsrücksetzung"-Funktion der IDE verwenden. Im Agent-Dialog den Rückgängig-Button finden und zu einer lauffähigen Version zurückkehren und neu beginnen;
  - Ein anderes Modell wählen oder den Prompt anpassen, Phänomene und Fehlermeldungen spezifischer beschreiben;
  - "Aktuellen Code + Fehler-Log + erwartetes Verhalten" zusammenpacken und AI auf einmal übergeben, damit sie den Problembereich insgesamt restrukturiert.

## 3. Von der Single-Page zur Multi-Page-Anwendung erweitern

<div style="margin: 50px 0;">
  <ClientOnly>
    <StepBar :active="2" :items="[
      { title: 'Anforderungsanalyse', description: 'Von vage zu konkret' },
      { title: 'Single-Page-Validierung', description: 'Kernfunktion implementieren' },
      { title: 'Multi-Page-Erweiterung', description: 'Anwendungsstruktur vervollständigen' },
      { title: 'Optimierung', description: 'Nutzererfahrung verbessern' }
    ]" />
  </ClientOnly>
</div>

Wenn die Logik der Kernfunktion grundsätzlich generiert ist, können wir die restlichen Inhalte erstellen. Zum Beispiel sind Klicks auf Einstellungen oder bestimmte Buttons zu diesem Zeitpunkt noch völlig wirkungslos.

Sie können AI bitten, basierend auf den Anforderungen des Geschäftsprompts zu prüfen und die noch nicht generierten Teile zu erstellen. Oder Sie lassen AI die nicht vollständig implementierten Seiten direkt ergänzen. Sie können auch eine bestimmte Seite angeben, die AI implementieren soll, bis alle Seiten klickbar und alle Funktionen ordnungsgemäß interaktiv sind:
![](../../../zh-cn/stage-1/building-prototype/images/index-2026-01-14-15-17-55.png)

Nach kurzer Wartezeit sehen wir, dass das Programm auf der bisherigen Basis mehrere Seiten und interaktive Funktionen ergänzt hat:
![](../../../zh-cn/stage-1/building-prototype/images/index-2026-01-14-15-23-40.png)

![](../../../zh-cn/stage-1/building-prototype/images/index-2026-01-14-15-23-53.png)

Jetzt müssen Sie nur noch manuell jede Funktion und jeden Button anklicken, die Sie interessieren, und sicherstellen, dass die Interaktion ordnungsgemäß funktioniert. Wenn es nicht interaktive Funktionen gibt, können Sie mit AI kommunizieren und sie um Hilfe bei der Reparatur bitten.

## 4. Den Prototyp "wie echt" aussehen lassen

<div style="margin: 50px 0;">
  <ClientOnly>
    <StepBar :active="3" :items="[
      { title: 'Anforderungsanalyse', description: 'Von vage zu konkret' },
      { title: 'Single-Page-Validierung', description: 'Kernfunktion implementieren' },
      { title: 'Multi-Page-Erweiterung', description: 'Anwendungsstruktur vervollständigen' },
      { title: 'Optimierung', description: 'Nutzererfahrung verbessern' }
    ]" />
  </ClientOnly>
</div>

Nachdem wir die Multi-Page-Struktur haben, ist der letzte Schritt, den Prototyp von "es läuft" zu "lässt sich flüssig bedienen und sieht professionell aus" zu bringen. Dafür müssen wir den gesamten Prozess (Nutzer-Flow) einmal selbst durchlaufen und die nicht funktionierenden Teile von AI reparieren lassen, damit wir nach jedem Refresh den vollständigen Prozess als neuer Nutzer simulieren und die erwarteten Ergebnisse erhalten können.

Lassen Sie uns die ursprünglichen Anforderungen rekapitulieren:

```
1. Operations-Mitarbeitern helfen, die erste Version von Bild- und Textentwürfen
   stapelweise zu generieren:
- **Eingabe (direkter Upload und Batch-Import unterstützt):**
  - Produktbasisinformationen: Name, Kategorie, Marke, Material, Größe, Farbe,
    Zielgruppe etc.;
  - Produktbilder: Weißgrund / einfaches Szenario-Foto;
  - Bei jeder Generierung: zusätzlicher Upload von Screenshots früherer
    Bestseller oder Referenz-Links möglich;
  - Excel Batch-Import oder Online-Eingabe/Upload auf der Seite unterstützt.
  - Auf der Seite kann angegeben werden, ob Produktmaterialien in der
    Materialbibliothek gespeichert werden sollen, für spätere Verwendung.
- **Ausgabe (Inhalte, die direkt oder mit leichten Änderungen eingestellt
  werden können):**
  - Für jedes Produkt ein Hauptbild-Entwurf, der "ansehbar" ist und
    grundlegende Selling-Points enthält;
  - Ein "strukturgerechter" Titel mit Kern-Keywords + 1-2 Sätze
    Selling-Point-Copywriting.
- **Erwartete Änderung der Arbeitsweise:**
  Vom Neuentwurf für jede Produktcharge zum Einwerfen einer Charge in das
  System, mit System-Entwürfen zur Auswahl und Feinjustierung.

2. Gute Outputs als wiederverwendbare Vorlagenbibliothek konservieren:
- **Was kann gespeichert werden?**
  - Jeder Output, von dem der Operations-Mitarbeiter findet, dass er "gut
    funktioniert", kann mit einem Klick gespeichert werden:
    - Kann eine komplette Kombination aus "Hauptbild + Titel + Selling-Point"
      sein;
    - Oder nur ein Teil davon, z.B. eine bestimmte Titel-Struktur oder ein
      bestimmter Selling-Point-Text.
- **Was kann nach dem Speichern getan werden?**
  - **Wiederverwenden:**
    - Diese gespeicherte Vorlage verwenden, neue Produkt-Parameter einsetzen,
      neue Bild- und Textentwürfe generieren;
    - Oder auf demselben Produkt basierend auf der Vorlage mehrere Varianten
      für A/B-Tests generieren.
  - **Bearbeiten:**
    - Titel-Text / Selling-Point-Text direkt ändern;
    - Wenn Bildbearbeitung unterstützt wird, können Text, Sticker etc. im
      Hauptbild feinjustiert werden.
  - **Verwalten:**
    - Gespeicherte Vorlagen benennen, taggen (z.B. "Herrentaschen-Hauptbild-Vorlage",
      "Großverkaufs-Titel-Struktur"), nach Shop kategorisieren für einfache
      spätere Suche.
- **Wie beim nächsten Mal verwenden?**
  - Nach Import eines neuen Produkts kann der Operations-Mitarbeiter wählen:
    - Systemstandard-Logik verwenden, oder
    - "Meine gespeicherte Vorlage verwenden" angeben;
  - Das System wendet basierend auf den neuen Produktdaten automatisch Struktur
    und Stil der Vorlage an und generiert neue Hauptbild + Titel +
    Selling-Point-Entwürfe.
```

Wenn bei jedem Test neue Daten manuell erstellt werden müssen, kostet das viel Zeit. Zu diesem Zeitpunkt verwenden wir normalerweise eine Methode namens "Testdaten". Wir können wie folgt mit AI kommunizieren und AI bitten, auf der Oberfläche einen schnellen Testdaten-Eingang zu generieren, damit wir testen können, ob alle Funktionen ordnungsgemäß durchlaufen werden:

```
Ich muss jetzt diesen Nutzungsprozess testen und sicherstellen, dass er
vollständig durchlaufen werden kann. Bitte generiere basierend auf den
folgenden Anforderungen einen Testdaten-Eingang, damit ich nach einem Klick
schnell testen kann, ob der gesamte Prozess normal funktioniert:
1. Operations-Mitarbeitern helfen, die erste Version von Bild- und Textentwürfen
   stapelweise zu generieren:
- **Eingabe (direkter Upload und Batch-Import unterstützt):**
  - Produktbasisinformationen: Name, Kategorie, Marke, Material, Größe, Farbe,
    Zielgruppe etc.;
  - Produktbilder: Weißgrund / einfaches Szenario-Foto;
  - Bei jeder Generierung: zusätzlicher Upload von Screenshots früherer
    Bestseller oder Referenz-Links möglich;
  - Excel Batch-Import oder Online-Eingabe/Upload auf der Seite unterstützt.
  - Auf der Seite kann angegeben werden, ob Produktmaterialien in der
    Materialbibliothek gespeichert werden sollen, für spätere Verwendung.
- **Ausgabe (Inhalte, die direkt oder mit leichten Änderungen eingestellt
  werden können):**
  - Für jedes Produkt ein Hauptbild-Entwurf, der "ansehbar" ist und
    grundlegende Selling-Points enthält;
  - Ein "strukturgerechter" Titel mit Kern-Keywords + 1-2 Sätze
    Selling-Point-Copywriting.
- **Erwartete Änderung der Arbeitsweise:**
  Vom Neuentwurf für jede Produktcharge zum Einwerfen einer Charge in das
  System, mit System-Entwürfen zur Auswahl und Feinjustierung.
```

Man erhält schnell Ergebnisse (wenn Ihnen ein Datensatz zu wenig ist, können Sie AI bitten, mehrere testbare Use Cases zu generieren):
![](../../../zh-cn/stage-1/building-prototype/images/index-2026-01-14-15-30-30.png)

Nach dem Klick erhalten wir das Ergebnis:
![](../../../zh-cn/stage-1/building-prototype/images/index-2026-01-14-15-31-23.png)

Was wir hier direkt erhalten, ist das Ergebnis &ndash; es gibt keinen "simulierten Generierungsprozess". Wenn wir einen realistischen Generierungsprozess simulieren möchten, können wir direkt mit AI dialogieren: "Bitte simuliere einen realistischen Generierungsprozess, bei dem die Ergebnisse erst nach einiger Zeit nach dem Klick angezeigt werden."
![](../../../zh-cn/stage-1/building-prototype/images/index-2026-01-14-15-50-05.png)

Nachdem die Generierungsfunktion durchlaufen ist, müssen wir auch sicherstellen, dass die Vorlagenbibliothek ordnungsgemäß funktioniert. Auf der Generierungskarte der Seite können wir sehen, dass die Vorlagenbibliothek-Speicherfunktion noch nicht implementiert ist. Jetzt müssen wir mit AI weitergehend kommunizieren: "Bitte hilf mir sicherzustellen, dass die Anforderung [hier den Inhalt von Punkt 2 oben einfügen] erfüllt ist, ein Ergebnis angeklickt werden kann, um die entsprechende Vorlage zu speichern, und nach dem Öffnen die Generierungsparameter sichtbar sind."

Generierung ist oft nicht in einem Schritt erledigt &ndash; häufig sind Screenshots und Korrekturen nötig:
![](../../../zh-cn/stage-1/building-prototype/images/index-2026-01-14-15-57-14.png)

Schließlich erhalten wir das erwartete Ergebnis:
![](../../../zh-cn/stage-1/building-prototype/images/index-2026-01-14-16-12-56.png)

Neben der manuellen Überprüfung des Anforderungsprozesses können Sie AI auch bitten, direkt eine Anforderungsprüfung durchzuführen, zum Beispiel:

- "Bitte vergleiche meine ursprünglichen Anforderungen und prüfe, ob die aktuelle Anwendung alle Kernfunktionen abdeckt."
- "Hilf mir, eine Funktionsliste zu erstellen, die markiert, was bereits fertig ist und was noch nicht implementiert ist oder unzureichend ist."

AI gibt normalerweise eine Checkliste aus. Basierend auf den Ergebnissen können Sie überlegen, ob weitere Verbesserungen nötig sind. Nach wiederholten Überarbeitungen erhalten Sie einen relativ vollständigen Prototyp.

## 5. Hausaufgabe: Erstellen Sie Ihren eigenen Douyin E-Commerce-Workspace

<el-card shadow="hover" style="margin: 20px 0; border-radius: 12px;">
  <template #header>
    <div style="font-weight: bold; font-size: 16px;">Herausforderung: E-Commerce-Material-Workspace nachbauen</div>
  </template>

  <p>
    Referenzieren Sie die Prompts und Inhalte dieser Lektion und schließen Sie einen vollständigen Kreislauf ab:
  </p>

  <ul>
    <li>
      <strong>Vollständiger Praxis-Kreislauf</strong>
      <ul>
        <li>Geschäftsstrukturierung &rarr; Prompt-Generierung &rarr; Single-Page-Prototyp-Generierung &rarr; Multi-Page-Prototyp-Generierung</li>
      </ul>
    </li>
    <li>
      <strong>Ergebnisse teilen</strong>
      <ul>
        <li>Machen Sie Screenshots Ihres Programms und teilen Sie sie mit anderen</li>
      </ul>
    </li>
    <li>
      <strong>Denkaufgabe</strong>
      <ul>
        <li>Bereiten Sie sich auf die nächste Lektion "Anbindung von Large Language Models (LLM) und Text-to-Image-Fähigkeiten" vor und überlegen Sie im Voraus: Wie könnten Sie "AI-Copywriting / Bildgenerierung / Skriptgenerierung" etc. in Ihren Workspace einbetten?</li>
      </ul>
    </li>
  </ul>
</el-card>

## Nächste Schritte

In der nächsten Lektion werden wir auf Basis dieses Content-Produktions-Workspaces konkrete AI-Fähigkeiten anbinden (Text-zu-Text, Bild-zu-Text, Text-zu-Bild), zum Beispiel:

- Automatische Generierung von Copywriting-Entwürfen und mehreren Titel-Alternativen für eine Content-Aufgabe
- Automatische Generierung von Bild-Entwürfen basierend auf der Aufgabenbeschreibung (Text-to-Image)
- Automatische Kategorisierung und Zusammenfassung historischer Content-Aufgaben, um Sie bei der Planung des nächsten Events zu unterstützen

<RelatedArticlesSection
  title="Weiterlernen"
  description="Empfehlung: in der Reihenfolge 'AI-Fähigkeiten anbinden &rarr; vollständiger Projekt-Kreislauf &rarr; Design-Engineering' fortsetzen."
  :items="relatedArticles"
/>
