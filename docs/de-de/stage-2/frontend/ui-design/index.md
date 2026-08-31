<script setup>
import { relatedArticlesMap } from '@theme/data/relatedArticles'

const relatedArticles = relatedArticlesMap['de-de/stage-2/frontend/ui-design'] ?? []
</script>

# Deine erste moderne App erstellen - UI-Design

Erinnerst du dich an das Gefühl, als du zum ersten Mal eine wunderschön gestaltete Produktseite entdeckt hast? Obwohl die Funktionen ähnlich sind, wirkt die Seite anderer einfach "hochwertiger": saubere Farbpalette, angenehme Weißräume, die Abrundung der Buttons sitzt perfekt. Du kannst nicht anders, als zu denken —— **"Wie haben sie das designt? Können wir auch so eine Seite machen?"**

Genau dieser Gedanke, "verstehen zu wollen, wie andere es machen", ist der beste Ausgangspunkt für Frontend-Design. Bevor du loslegst, lass uns kurz Revue passieren, was wir bereits können:

- In den vorherigen Lektionen haben wir gelernt, mit NanoBanana Design-Materialien in Serie zu generieren und verstanden, wie der "Stil" im Prompt das finale Ergebnis beeinflusst;
- Wir haben professionelle Designtools wie Figma und MasterGo kennengelernt und wissen, wie ein Design-Entwurf organisiert ist;
- Wir haben auch den Prozess der Umwandlung vom Design-Entwurf zum Frontend-Code kennengelernt.

Aber wenn du wirklich eine ansehnliche Seite für dein eigenes Projekt gestalten willst, wirst du vielleicht immer noch stecken bleiben: Die Tools kannst du nutzen, die Materialien kann man generieren, aber du weißt **nicht, wie "schön" aussieht, geschweige denn, wie man eine hervorragende Seite zerlegt und nachahmt**. Keine Sorge, genau dieses Problem löst diese Lektion.

Um dir zu helfen, die Inhalte vorher und nachher zu verbinden, kannst du dir zunächst ein paar kleine Fragen überlegen:

1. Aus welchen Blöcken besteht eine moderne Webseite in der Regel?
2. Ist "schön" eine subjektive Empfindung oder kann sie in Zahlen quantifiziert werden (Farbwerte, Schriftgröße, Abstände, Rundungen)?
3. Wenn du den visuellen Stil einer Website nachahmen solltest, wo würdest du anfangen?

Wenn du auf diese Fragen noch keine klare Antwort hast, ist das kein Problem —— genau das bringt dir diese Lektion bei. Wenn du bei der Umsetzung auf einen schwer verständlichen Schritt stößt, kannst du jederzeit einen Screenshot der aktuellen Seite an das große Modell schicken und nachfragen. Trau dich, Fehler zu machen, und hab keine Angst davor —— jeder Versuch ist eine Chance zum Lernen und Fortschritt.

::: tip 🎯 Kernfrage
**Wie analysiert man angesichts einer wunderschön gestalteten APP oder Webseite, wie sie designt wurde, und nutzt AI-Designtools, um sie "zum Verwechseln ähnlich" nachzuahmen?**
:::

---

## In dieser Lektion wirst du lernen

1. **Lernen, "Design zu sehen"**: Wenn du eine Seite erhältst, weißt du, was du ansehen und wie du sie zerlegen musst
2. **Eine Einstiegs-Methodik beherrschen**: Referenz finden → analysieren → nachahmen → ähnlich werden → einsteigen
3. **2 Design-Wege kennenlernen**: Figma/MasterGo und Claude Design/Open Design (inkl. UI-Design-Skills)
4. **Praxis-Nachahmung**: Wähle eine echte Webseite und ahme sie von 0 mit hoher Originaltreue nach
5. **Ein Designsystem aufbauen**: Mache die Designstandards großer Unternehmen zu deinen eigenen

::: tip 📚 Vorwissen
Dieses Tutorial eignet sich für Entwickler, die bereits AI-Programmiertools (wie Trae) nutzen können und dem Projekt frontend-visuelle Fähigkeiten hinzufügen möchten. Wenn du zuerst ein Gespür für Bildgenerierung aufbauen möchtest, empfehlen wir, zuerst [NanoBanana-Materialproduktion](../lovart-assets/) zu lernen; wenn du tiefer in Designtools einsteigen möchtest, kombiniere es mit dem [Einstieg in Figma und MasterGo](../figma-mastergo/).
:::

---

## Kapitel 1: Einstieg ins Frontend-Design, beginnend mit "Abkupfern"

Im vorherigen Abschnitt haben wir drei Fragen gestellt —— aus welchen Blöcken eine Seite besteht, was "schön" ist und wie man nachahmt. Dieser Abschnitt beginnt mit der Methodik: **Die erste Lektion des Frontend-Designs ist nicht das Erschaffen, sondern das Nachbilden.**

So wie man beim Erlernen der Kalligrafie zuerst Vorlagen abschreibt und beim Malen zuerst Gipsfiguren zeichnet, warum ausgerechnet "Abkupfern"?

- Das "Gute" im Design kann quantifiziert werden —— **Farbwerte, Schriftgröße, Abstände, Rundungen, Schatten**, das sind alles Zahlen
- Indem du ein ausgereiftes Design Pixel für Pixel nachbildest, bist du gezwungen, jede einzelne Entscheidung dahinter zu verstehen
- Wenn du "ähnlich genug kopiert" hast, weißt du beim nächsten ähnlichen Szenario, "in welche Richtung du kopieren musst"

![](/zh-cn/stage-2/frontend/ui-design/images/design-reference.jpg)

> 💡 Kurz zusammengefasst: **Wer ein gutes Produkt nachahmen kann, hat die Grundlagen des Frontend-Designs beherrscht; wer darauf aufbauend Änderungen vornehmen kann, hat es zur Meisterschaft gebracht.**

### 1.1 Warum Nachahmung der schnellste Einstieg ist

Manche sorgen sich: "Ich kopiere von anderen, lernt man dabei wirklich etwas?" Die Antwort lautet: Ja, und es ist der schnellste Weg. Der Grund ist, dass Nachahmung nicht darin besteht, das Ergebnis zu kopieren, sondern **sich selbst zu zwingen, den Prozess zu rekonstruieren**:

- Du wirst gezwungen, jeden Abstand zu messen und dadurch zu verstehen, "wie Weißraum Atmung erzeugt"
- Du wirst gezwungen, jeden Farbwert nachzuschlagen und dadurch zu verstehen, "warum diese Farbkombination harmonisch wirkt"
- Du wirst gezwungen, jede Ebene zu vergleichen und dadurch zu verstehen, "wie Haupt- und Nebeninformationen angeordnet werden"

Wenn du eine hervorragende Seite "auf Parameter-Ebene zerlegen" und dann wieder aufbauen kannst, übersteigt dein Verständnis von Design bereits das vieler Menschen, die nur "nach Gefühl" arbeiten.

### 1.2 Auch große Unternehmen "referenzieren" — das ist kein Geheimnis

Die Arbeitsweise von Designern enthält von Natur aus Referenzen: Pinterest für Inspiration, Dribbble für Trends, Wettbewerbsanalysen für Strukturen. Im AI-Zeitalter wurde das verstärkt —— weil die Tools "Referenz" direkt in eine ausführbare Fähigkeit verwandelt haben:

![](/zh-cn/stage-2/frontend/ui-design/images/design-inspiration.jpg)

- Claude Design kann die von dir gespeicherten Referenz-Websites importieren und nach deren Stil einen ersten Entwurf generieren
- Open Design enthält 151 Open-Source-Designsysteme und lässt sich mit einem Klick auf dein eigenes Projekt anwenden
- Verschiedene UI-Design-Skills verpacken die "visuellen Standards großer Unternehmen" in AI-ausführbare Anweisungen

Deine Frage sollte also nicht sein, "darf ich kopieren", sondern "**wie kopiere ich professionell, legal und mit eigenen Handschrift**".

#### Wo finde ich Referenzen? Speichere zunächst diese Websites

Der erste Schritt zur Referenz ist der **Aufbau einer "Referenz-Bibliothek"**. Die folgenden Websites sind nach Zweck gruppiert. Es wird empfohlen, sie alle zu speichern und je nach Bedarf zu nutzen:

| Website | Zweck | Wofür man sucht |
| :--- | :--- | :--- |
| [Awwwards](https://www.awwwards.com) | Die "Oscars" der Webdesign-Welt | Topkreativität, Animationen, Interaktionen — lerne, wie die "Obergrenze" aussieht |
| [Recent (ehemals Godly)](https://godly.website) | Sammlung hochwertiger Web-Inspiration | Pionierdesign für AI-, Web3- und Portfolio-Websites |
| [Landbook](https://land-book.com) | Ausgewählte Landing-Page-Designs | Filtere nach Branche/Farbpalette: Firmen-Websites, Preisseiten, Erstbild-Layouts |
| [Lapa Ninja](https://www.lapa.ninja) | 7300+ Landing-Page-Screenshots | Suche nach Elementkategorien: Navigation, Feature-Präsentation, Kundenstimmen |
| [Mobbin](https://mobbin.com) | Echte App-Interface-Bibliothek | Studiere die echten Seiten und Abläufe von Produkten wie Uber, Notion |
| [Dribbble](https://dribbble.com) | Designer-Community | Inspiration für Farbpalette, Icons, Illustrationsstile und Mikrointeraktionen |
| [Behance](https://www.behance.net) | Vollständige Projektfall-Bibliothek | Schaue dir Design-Thinking, Rechercheprozesse und vollständige Portfolios an |

Wie sehen diese Websites aus? Wirf einen ersten Blick darauf (klicke auf das Bild zum Vergrößern):

![Awwwards — die "Oscars" des Webdesigns](/zh-cn/stage-2/frontend/ui-design/images/site-awwwards.jpg)

![Recent (ehemals Godly) — Sammlung hochwertiger Web-Inspiration](/zh-cn/stage-2/frontend/ui-design/images/site-godly.jpg)

![Landbook — ausgewählte Landing-Page-Designs](/zh-cn/stage-2/frontend/ui-design/images/site-landbook.jpg)

![Lapa Ninja — 7300+ Landing-Page-Screenshots](/zh-cn/stage-2/frontend/ui-design/images/site-lapa.jpg)

![Mobbin — echte App-Interface-Bibliothek](/zh-cn/stage-2/frontend/ui-design/images/site-mobbin.jpg)

![Dribbble — Designer-Community](/zh-cn/stage-2/frontend/ui-design/images/site-dribbble.jpg)

![Behance — vollständige Projektfall-Bibliothek](/zh-cn/stage-2/frontend/ui-design/images/site-behance.jpg)

::: tip 💡 Baue deine eigene Referenz-Bibliothek auf
Wenn du eine Seite siehst, die dir gefällt, **mach sofort einen Screenshot + speichere den Link**, und archiviere sie nach "Landing Page / Komponente / Farbpalette / Animation". Beim Nachahmen wählst du das Ziel direkt aus dieser Bibliothek, das ist viel schneller, als spontan online zu suchen.
:::

### 1.3 Referenz vs. Plagiat: eine klare Grenze

| Dimension | Referenz (empfohlen ✅) | Plagiat (gefährlich ❌) |
| :--- | :--- | :--- |
| Objekt | Layoutstruktur, visueller Stil, Designstandards | Marken-Logo, exklusive Icons, originelle Illustrationen |
| Methode | Nach dem Verstehen neu erstellen, in das eigene Produkt integrieren | Direktes Kopieren von Materialien, Code, Bildern |
| Ergebnis | Ähnlicher Stil, aber komplett anderer Inhalt | Auch Text, Farbpalette und Materialien sind identisch |
| Risiko | Gering | Hohes Urheberrechts-/Kommerzrisiko |

Kapitel 7 behandelt die Urheberrechtsgrenzen im Detail. Merke dir zunächst einen Satz: **"Regeln" zu kopieren ist ok, "Ergebnisse" zu kopieren ist gefährlich.**

---

## Kapitel 2: Erst sehen, dann designen — eine Seite zerlegen

Voraussetzung für "ähnlich kopieren" ist "verstehen". Dieses Kapitel vermittelt dir einen allgemeinen Rahmen für die Seitenzerlegung.

![](/zh-cn/stage-2/frontend/ui-design/images/page-structure.jpg)

### 2.1 Die Struktur sehen: Aus welchen Blöcken besteht eine Seite

Die allermeisten modernen Webseiten lassen sich in 4 große Blöcke zerlegen:

```
┌─────────────────────────┐
│ ① Navigationsleiste Nav   │   Logo · Menü · Login/CTA
├─────────────────────────┤
│ ② Erstbild Hero           │   Haupttitel · Untertitel · Hauptbutton · Produktbild
├─────────────────────────┤
│ ③ Inhaltsbereich Sections │   Feature-Karten · Datenanzeige · Bewertungen · Preise
├─────────────────────────┤
│ ④ Fußzeile Footer         │   Links · Copyright · Abo
└─────────────────────────┘
```

Wenn du eine Seite betrachtest, kümmer dich zuerst nicht um die Details, sondern **zeichne mit den Augen ihr "Skelett"**: Wo ist die Navigation, wo das Erstbild, wie viele Abschnitte in der Mitte, wie viele Elemente hat jeder Abschnitt.

### 2.2 Die Optik sehen: 4 quantifizierbare Elemente

| Element | Was man ansieht | Wie man es festhält |
| :--- | :--- | :--- |
| **Farbe** | Was sind primäre Farbe, Hintergrundfarbe, Textfarbe | Hex-Wert direkt mit der Farbpipette aufnehmen |
| **Schrift** | Welche Schrift für Titel/Fließtext, welche Größe, wie dick | Im Browser-DevTools font-family/size/weight ansehen |
| **Abstände** | Weißraum zwischen Blöcken und innerhalb von Karten | Notiere den gängigen 8 / 16 / 24 / 48 px-Rhythmus |
| **Rundung & Schatten** | Rundungsradius und Schattenintensität von Karten, Buttons | Im DevTools border-radius / box-shadow ansehen |

::: tip 💡 Der natürliche Vorteil des Frontend-Designs
**Du bist Frontend-Entwickler, DevTools ist dein Design-Analysegerät.** Rechtsklick → Element untersuchen — Farbwerte, Schriftgröße, Abstände, Rundungen jeder beliebigen Seite liegen vollständig offen. Das ist eine Fähigkeit, die Designer sich erträumen, aber Entwickler von Natur aus besitzen.

Gängige Farbauktionswerkzeuge: der Farbwähler von Chrome DevTools, `color-picker`-ähnliche Erweiterungen; du kannst auch direkt einen Screenshot an ein multimodales großes Modell schicken, um es die Designstandards extrahieren zu lassen.
:::

### 2.3 Komponenten sehen: "wiederverwendbare Teile" herauslösen

Zerlege die Seite in einzelne Komponenten und notiere jeweils die Stilparameter:

```text
Button Primary Button
- Hintergrund: #4F46E5
- Text: #FFFFFF, 14px / 600
- Rundung: 8px
- Innenabstand: 12px 24px
- Schatten: 0 2px 8px rgba(79,70,229,0.3)

Karte Card
- Hintergrund: #FFFFFF
- Rundung: 16px
- Rahmen: 1px solid #E2E8F0
- Schatten: 0 4px 12px rgba(15,23,42,0.08)
```

Wenn du 3-5 Seiten zerlegt hast, hast du eine "Komponenten-Stilbibliothek" in der Hand —— das ist der Keim deines eigenen Designsystems.

### 2.4 "Gesehenes Design" in "für AI verständliche Sprache" übersetzen

Wenn du die Nachahmung in ein AI-Tool überträgst, musst du das Visuelle in eine strukturierte Beschreibung übersetzen. **Je genauer du siehst, desto genauer die Übersetzung, desto ähnlicher kopiert die AI.**

```text
Referiere dich am Stil dieser Landing Page und erstelle mir eine gleichstrukturierte Seite:
- Struktur：Navigation + Erstbild(Hero) + 3 Feature-Karten + Preissektion + Fußzeile
- Farbpalette: Primärfarbe Indigo #4F46E5, Hintergrund #F8FAFC, Text #0F172A
- Schrift: Titel Space Grotesk 700, Fließtext Inter 400
- Abstände: Blöcke 96px, Karten innen 24px, Raster 24px
- Rundung: Karten 16px, Buttons 8px
- Schatten: 0 4px 12px rgba(15,23,42,0.08)
```

---

## Kapitel 3: Der Überblick über Frontend-Designtools im AI-Zeitalter

"Wie haben sie das designt?" Die Antworten werden immer vielfältiger. Hier sind 2 typische Wege, die von "manueller Feinsteuerung" bis "dialogbasierter automatischer Generierung" reichen.

![](/zh-cn/stage-2/frontend/ui-design/images/ai-design.jpg)

### 3.1 Weg 1: Figma / MasterGo — professionelle Design-Entwurfswerkzeuge

Wenn du **editierbare, kollaborative, pixelgenau kontrollierbare Design-Entwürfe** brauchst, nutze Figma (international weit verbreitet) oder MasterGo (chinesisch, leichter Einstieg):

- Baue auf der Leinwand Layouts auf, passe Komponenten an, erstelle Interaktionsprototypen
- Nutze Fähigkeiten wie Figma Make / MasterGo AI zur Unterstützung bei Generierung und Batch-Anpassung
- Übergib das finale Ergebnis dem Frontend zur Umsetzung nach Entwurf oder exportiere per Plugin Code

![Figma-Editor: linkes Ebenen-Panel, mittlere Leinwand, rechtes Eigenschaften-Panel](/zh-cn/stage-2/frontend/ui-design/images/figma_editor.jpg)

![MasterGo-Editor: chinesisches Cloud-Designtool, ähnliches Leinwand-Layout wie Figma](/zh-cn/stage-2/frontend/ui-design/images/mastergo_editor.jpg)

> Geeignet für: Szenarien mit strenger Entwurfsübergabe, Teamzusammenarbeit und komplexen Interaktionen. Zur Tool-Bedienung siehe [Einstieg in Figma und MasterGo](../figma-mastergo/).

### 3.2 Weg 2: Claude Design / Open Design — dialogbasierte Design-Leinwand

Gemeinsam ist diesen Tools, **mit natürlicher Sprache direkt interaktive Design-Prototypen zu generieren** statt statischer Bilder. Repräsentative Tools sind Claude Design und sein Open-Source-Pendant Open Design.

#### Claude Design: die offizielle dialogbasierte Design-Leinwand

Claude Design ist ein AI-Designprodukt von Anthropic (Einstieg `claude.ai/design`):

- Gib eine Anforderung in einem Satz ein, standardmäßig werden 3 Design-Varianten erzeugt, die Landing Pages, Wireframes, Präsentationen etc. abdecken
- Unterstützt das Importieren von Designsystemen (GitHub-Repos, Figma-Exporte, Website-Screenshots, Markendateien) und extrahiert automatisch Farben/Schriften/Komponenten
- Auf der Leinwand direkt kommentieren und ändern, per Drag-and-Drop feinjustieren, final als HTML / PDF / PPTX exportieren oder an Claude Code zur Umsetzung in echten Code übergeben

**Typische Anwendungsszenarien:**

**① Aus einem Referenz-Screenshot direkt eine High-Fidelity-Seite nachbilden (am häufigsten)**

Gib Produktbeschreibung und Stilreferenz ein, Claude generiert automatisch eine vollständige Landing Page — links der Dialogverlauf mit Prompt und Generierungsprozess, rechts die Leinwand mit Live-Rendering des Ergebnisses.

```text
Create a high-fidelity landing page designed to raise $500,000 from angel investors
for "雾屿咖啡 Mist Island Coffee" - a boutique specialty coffee shop that combines
premium coffee, quiet workspaces, and warm community events.
Tone should feel warm, premium, calm, and trustworthy - think a mix of Blue Bottle
Coffee + Apple Store + minimalist lifestyle design.
```

![Claude Design tatsächlich generiert: High-Fidelity-Landing Page von Mist Island Coffee, links Dialog+Fortschritt, rechts Leinwand rendert den kompletten Hero-Bereich](/zh-cn/stage-2/frontend/ui-design/images/claude_case_landing.jpg)

**② Standardmäßig 3 Design-Varianten, Richtung wählen und dann verfeinern**

Claude Design liefert nicht nur eine Antwort, sondern generiert standardmäßig mehrere Richtungen zur Auswahl — Editor-Stil, Museum-Stil, Zine-Stil usw. Klicke rein und verfeinere.

![Tatsächlicher Fall: Ein PCWorld-Reporter lässt Claude das Konzept von AI Tokens erklären; es werden Editorial / Museum / Field Notes drei Stile zur Auswahl zurückgegeben](/zh-cn/stage-2/frontend/ui-design/images/claude_case_variants.jpg)

**③ Interaktive Prototypen generieren (nicht nur statische Bilder)**

Die generierte Seite ist wirklich klickbar und eingebbar — Buttons haben Hover-Effekte, Formulare sind eingebbar, Daten werden in Echtzeit berechnet.

![Tatsächlich generierte Token-Erklärungsseite: eingebauter Echtzeit-Tokenizer, beim Eingeben von Sätzen werden einzelne Token farblich hervorgehoben, unten wird Zeichen/Wort/Token-Anzahl gezählt](/zh-cn/stage-2/frontend/ui-design/images/claude_case_interactive.jpg)

**④ Produkt-Präsentationen/PPT erstellen**

Nicht nur Webseiten, sondern auch vollständige Folien (mehrseitig, mit Navigation, als PDF/PPTX exportierbar).

![Tatsächlich generiert: Pitch Deck einer Kaffeemarke, links 13 Seiten Outline, rechts Wiedergabe der aktuellen Folie, unten blätterbar](/zh-cn/stage-2/frontend/ui-design/images/claude_case_slide.jpg)

**⑤ Animierte Videos generieren**

Über "From template" lassen sich animierte HTML-Videos erstellen — Storyboard-Skript + tatsächlich gerenderte Animationsszenen, mit Wiedergabesteuerung.

![Tatsächlich generiert: 45-Sekunden-Animation zur Kaffeezubereitung, links Storyboard-Zeitplan, rechts spielt die Leinwand die Animation ab (Kaffeebohne → Rösten → Aufbrühen)](/zh-cn/stage-2/frontend/ui-design/images/claude_case_video.jpg)

**⑥ Bestehende Designs iterieren (direkt auf der Leinwand kommentieren)**

Nach der Generierung des Prototyps musst du den Prompt nicht neu schreiben — klicke direkt auf den Comment-Button, wähle Elemente aus und schreibe Kommentare. Claude nimmt die Änderung lokal vor.

![Auf der Leinwand auf den Comment-Button klicken, beliebige Elemente auswählen, dann erscheint ein Kommentarfeld; "Suggest to Claude" schreiben reicht für die lokale Iteration](/zh-cn/stage-2/frontend/ui-design/images/claude_case_comment.jpg)

**⑦ Mobile-App-Seiten designen**

Unterstützt die Angabe von Gerätegrößen (z. B. iPhone) und generiert mobile UI-Prototypen mit Geräterahmen.

![Tatsächlich generiert: Mobile-Interface der Cricket-Score-App (Tracket) — dunkler Header + Punkteanzeige + Aktionsbuttons, mit hohem Kontrast für Sonnenlicht-Szenarien im Freien](/zh-cn/stage-2/frontend/ui-design/images/claude_case_mobile.jpg)

![Claude-Design-Leinwand-Übersicht: links Dialog, rechts Tweaks-Panel zur Echtzeit-Anpassung von Theme, Breakpoints, Farben etc.](/zh-cn/stage-2/frontend/ui-design/images/claude_design_canvas.jpg)

> Geeignet für: Menschen ohne Design-Hintergrund, die die Figma-Lernkurve überspringen und schnell zu interaktiven Prototypen kommen möchten.

#### Open Design: die Open-Source-Alternative zu Claude Design

Wenn du nicht abonnieren möchtest oder Wert auf Datenschutz legst, kannst du Open Design (Open-Source-Projekt von nexu-io) ausprobieren. Es folgt derselben Route wie Claude Design: **dialogbasierte Generierung von Design-Prototypen**, mit dem Unterschied **local-first, BYOK (eigener Model-Key), an keinen Agent gebunden**.

Es hat zwei Kernkonzepte:

| Konzept | Erklärung | Dein Nutzen |
| :--- | :--- | :--- |
| **Skills (Fähigkeiten)** | 16 anweisungsbasierte Design-Skills (Texte, Farben, kreative Anleitung, Brainstorming…) | Ein Skill = eine professionelle Aufgaben-Vorlage |
| **Templates (Vorlagen)** | 288 ausführbare Vorlagen (Prototypen, Folien, Animationen…), alle mit `example.html` | Forken und nur die Daten austauschen, schon lieferbar |
| **Design Systems (Designsysteme)** | 151 portierbare Designsysteme (Farbpaletten, Schriften, Animationen, Schreibstil) | Mit einem Satz die visuellen Standards großer Unternehmen anwenden |

Es erkennt deinen lokalen Coding-Agent (Claude Code, Codex, Cursor, Qwen, Kimi etc., offiziell werden 21 unterstützt) als "Design-Engine" — **dein vorhandener Agent ist der Designer**. Darüber hinaus können **UI-Design-Skills** in der Tool-Ökologie wie Claude Code (z. B. frontend-design) Designstandards in AI-ausführbare Anweisungen verpacken, sodass die AI regelkonform ausgibt.

**Typische Anwendungsszenarien:**

**① Neues Projekt: Skill + Designsystem + Präzision wählen**

Beim Erstellen eines Prototyps kannst du Wireframe oder High-Fidelity wählen, die Zielplattform angeben (responsives Web / mobil etc.) und aus den eingebauten 150+ Designsystemen eines als visuelle Basis auswählen.

```text
Nutze Open Design, wende das Designsystem von Linear an und generiere eine Landing Page HTML für ein SaaS-Produkt
```

![Open Design Dialog zur Prototyp-Erstellung: chinesische Oberfläche, Auswahl von Prototyp/Slide/Media, Umschalten zwischen Wireframe/High-Fidelity, Wahl des Designsystems und der Zielplattform](/zh-cn/stage-2/frontend/ui-design/images/od_case_create.jpg)

![Open Design mit über 150 integrierten Designsystemen (Agentic, Airbnb, Airtable, Linear, Stripe, Vercel…), nach Kategorien gruppiert, jedes mit Farbpaletten-Vorschau und Beschreibung](/zh-cn/stage-2/frontend/ui-design/images/od_case_designsystems.jpg)

**② Studio-Arbeitsbereich: dialoggesteuert, in Echtzeit generiert**

Links das Dialog-Panel (zeigt die Gedankenschritte der AI, Todo-Liste, Write-Operationen), rechts die iframe-Leinwand, die das Ergebnis in Echtzeit rendert — ähnlich wie Claude Design, aber unten wird angezeigt, welcher lokale CLI-Agent gerade aufgerufen wird (z. B. Claude Code, Codex, deepseek etc.).

![Open Design Studio-Arbeitsbereich: links Chat-Panel mit Generierungsplan und Fortschritt, rechts rendert die Leinwand die "Open Design"-Titelseite (Folienmodus), oben umschaltbar zwischen Preview/Source/Comment/Edit](/zh-cn/stage-2/frontend/ui-design/images/od_case_studio.jpg)

**③ Mit Designsystemen Folien/PPT generieren**

Wähle den Typ Slide deck, gib das Thema ein und erhalte eine vollständige mehrseitige Präsentation. Das folgende Bild zeigt eine chinesische Vortragsfolie, die ein Community-Nutzer mit Open Design generiert hat.

![Echter Nutzerfall: Foliencover des Vortrags "One-/Person-Company · Organisation, die von AI gefaltet wurde" — dunkler Hintergrund, große Serifen-Titel, Sprecherinfos, Seitenzahlen-Navigation unten](/zh-cn/stage-2/frontend/ui-design/images/od_case_deck.jpg)

**④ High-Fidelity-Mobile-App-Prototypen generieren**

Unterstützt die gleichzeitige Vorschau mehrerer Bildschirme, erzeugt automatisch iPhone-Geräterahmen; Tab-Bar, Kartenlayouts, Fortschrittsbalken etc. sind alle vorhanden.

![Tatsächlich generiert: gamifizierte Life-Management-App (Level) — 3 Bildschirme nebeneinander, mit Tagesaufgaben-Startseite, Aufgaben-Kategorien-Dashboard, Aufgabendetailseite, heller Modus, farbige Karten](/zh-cn/stage-2/frontend/ui-design/images/od_case_mobile.jpg)

**⑤ Mit UI-Design-Skills die AI-Ausgabe standardisieren**

Installiere einen Skill wie frontend-design für Claude Code / Cursor, dann folgt die AI beim Erstellen von Seiten automatisch den Designstandards:

```text
# In Claude Code aufrufen
/frontend-design hilf mir, eine Login-Seite umzusetzen
→ automatisch nach den im Skill eingebauten Designstandards ausgeben:
   - Farbe: Primärfarbe #4F46E5, Erfolg #10B981, Fehler #EF4444
   - Abstände: 8px-Basisraster
   - Komponenten: barrierefreie Button / Input / Form
   - Responsiv: Mobile / Tablet / Desktop dreifach angepasst
```

**⑥ Lokale private Projekte ohne Internetverbindung**

Bei internen Unternehmensprojekten und Produktdesigns mit sensiblen Daten werden alle Dateien lokal verarbeitet; das Modell kann lokal bereitgestellt oder per BYOK genutzt werden:

```text
# Open Design lokal starten, das Modell läuft über lokal bereitgestelltes Qwen
OPENAI_API_KEY=your-local-key OPENAI_BASE_URL=http://localhost:8000/v1 \
opendesign
# Alle Design-Dateien werden lokal in ~/.open-design/ gespeichert, ohne Drittanbieter-Server
```

![Open Design Hauptoberfläche: Skill wählen (Prototyp/Slide/Bild/Video etc.) + Anforderung eingeben und generieren, lokaler CLI-Agent dient automatisch als Engine](/zh-cn/stage-2/frontend/ui-design/images/opendesign_home.jpg)

> Geeignet für: Entwickler, die Wert auf Datenschutz legen, bereits einen Coding-Agent haben und den Designprozess vollständig kontrollieren möchten.

### 3.3 Wie wählt man zwischen den beiden Wegen

| Vergleich | Weg 1: Figma / MasterGo | Weg 2: Claude Design / Open Design |
| :--- | :--- | :--- |
| Positionierung | Professionelles Design-Entwurfswerkzeug | Dialogbasierte AI-Design-Leinwand |
| Repräsentative Tools | Figma, MasterGo | Claude Design (offiziell), Open Design (Open-Source-Pendant) |
| Output | Editierbarer Design-Entwurf | Interaktiver HTML-Prototyp |
| Lerndauer | ⭐⭐ mittel | ⭐ niedrig |
| Kosten | Gratisversion nutzbar | Claude Design kostet Abo; Open Design Open-Source kostenlos (BYOK) |
| Geeignet für | Strenge Übergabe und Zusammenarbeit | Schnelle Prototyp-Verifikation, Datenschutz zuerst |

::: tip 💡 Reale Kombination in der Praxis
Der gesamte Ablauf **Referenz → Design → Übergabe** lässt sich mischen: Mit Claude Design / Open Design schnell Richtung und Prototyp erzeugen → nach der Festlegung in Figma/MasterGo importieren und verfeinern → an Claude Code übergeben, um den Code zu schreiben. Jeder Weg ergänzt sich mit seinen Stärken.
:::

![](/zh-cn/stage-2/frontend/ui-design/images/design-tools.jpg)

---

## Kapitel 4: Praxis 1: Die "Webseite anderer" ähnlich nachbilden

Das Ziel ist konkret: **Wähle eine echte Webseite, die dir gefällt, und ahme sie "ähnlich" nach.** Hier nehmen wir eine Landing Page als Beispiel.

![](/zh-cn/stage-2/frontend/ui-design/images/design-workspace.jpg)

### Schritt 1: Ziel auswählen

Wähle eine strukturell klare Landing Page, die dich interessiert (SaaS-Firmenwebsite, Produktvorstellungsseite — alles ist ok). Speichere Screenshot und Link.

### Schritt 2: Mit dem Rahmen aus Kapitel 2 zerlegen

Im Browser Rechtsklick → untersuchen, und in 4 Schritten notieren:

```text
Ziel: Landing Page einer SaaS-Firmenwebsite
① Struktur: Navigation(Logo/Menü/CTA) → Hero(Titel/Untertitel/Button/Screenshot) → 3 Feature-Karten → Preise(3 Stufen) → Fußzeile
② Farbe: Primärfarbe #0F172A dunkel, Akzent #6366F1, Hintergrund #FFFFFF / #F8FAFC
③ Schrift: Titel Inter 800 48px, Fließtext Inter 400 16px
④ Komponenten: Buttons Rundung 8px/Vollfläche, Karten Rundung 16px/hellgrauer Grund/ohne Rahmen
```

### Schritt 3: Dem AI-Designtool füttern und die erste Version generieren

Gib das Zerlegungsergebnis an Claude Design / Open Design, damit es nach diesen Standards generiert:

```text
Generiere nach den folgenden Designstandards eine gleichstrukturierte Landing Page:
[Zerlegungsnotiz aus Schritt 2 einfügen]
Produkt: Mein Projekt (Verwendungszweck in einem Satz)
Anforderung: Halte dich pixelgenau an die obigen Farb-, Schrift-, Abstands- und Rundungsstandards
```

Die erste Version ist meist "im Geist ähnlich, aber nicht in der Form" — die Struktur stimmt, aber die Details weichen ab. **Das ist kein Fehlschlag, das sagt dir genau, wo du als Nächstes nachjustieren musst.**

### Schritt 4: Block für Block vergleichen und iterativ ändern

Stelle den Referenz-Screenshot und das generierte Ergebnis nebeneinander, vergleiche Block für Block und nähere dich mit "Änderungsanweisungen" an:

| Gefundenes Problem | Änderungsanweisung |
| :--- | :--- |
| Primärfarbe zu hell | "Ändere die Primärfarbe auf #0F172A, Akzentfarbe #6366F1" |
| Button-Rundung falsch | "Alle Buttons einheitlich 8px Rundung, Vollflächen-Hintergrund" |
| Abstände zu eng | "Blockabstände auf 96px ändern, Karten-Innenabstand 24px" |
| Schrift falsch | "Titel auf Inter 800, Fließtext Inter 400 ändern" |
| Zu viele Deko-Elemente | "Hintergrund-Deko entfernen, nur Kerninhalte behalten" |

### Schritt 5: Abnahmekriterium — "ähnlich"

Wie erkennt man, dass man den Einstieg geschafft hat? Setze dir ein objektives Kriterium:

- [ ] Zwei Screenshots machen: Original-Webseite vs. deine Nachbildung
- [ ] Beide Bilder nebeneinander vergrößern und Pixel für Pixel vergleichen
- [ ] Farbwerte, Schriftgröße, Abstände, Rundungen **mit bloßem Auge keine Layout-Unterschiede erkennbar**
- [ ] Auf 50 % verkleinern und erneut vergleichen, immer noch nicht zu unterscheiden, welches das Original ist

> 💡 **"Ähnlich" ist kein Ziel, sondern ein Mittel.** Nachdem du 2-3 stilistisch völlig verschiedene Websites nachgeahmt hast, baust du dir natürlich ein "Design-Gefühl" auf: wann man viel Weißraum braucht, wann hohe Sättigung, wann Rundungen zurückhaltend sein sollten. Dann geht das Nachahmen neuer Seiten viel schneller.

---

## Kapitel 5: Praxis 2: Vom Design zum Code

Der nachgeahmte Design-Entwurf/Prototyp muss am Ende zu einer echten Seite im Produkt werden. Zwei Übergabewege:

![](/zh-cn/stage-2/frontend/ui-design/images/design-to-code.jpg)

### 5.1 Weg A: AI-Designtool → Frontend-Code

- **Claude Design**: Nach der Festlegung auf der Leinwand mit `/design-sync` zu Claude Code synchronisieren und direkt vom Design aus den Code weiterschreiben, ohne bei einem Screenshot neu zu beginnen
- **Open Design**: Direkt als HTML exportieren und dann dem Agent übergeben, um es in Projekt-Komponenten umzubauen
- **Figma/MasterGo**: Über Plugin oder MCP React-/Vue-Code exportieren

### 5.2 Weg B: Screenshot → multimodales großes Modell zur Rekonstruktion

Am einfachsten: Den nachgeahmten Design-Screenshot direkt an ein multimodales großes Modell schicken, "in React-Komponenten rekonstruieren", Block für Block umsetzen.

> Einen detaillierten Vergleich der drei "Design-zu-Code"-Wege findest du unter [Vom Design-Prototyp zum Projektcode](../design-to-code/). Für komponentenbezogene Engineering-Effizienz schau dir auch [Aktualisiere deine Oberfläche mit einer modernen Komponentenbibliothek](../modern-component-library/) an.

---

## Kapitel 6: Das Designsystem großer Unternehmen zu deinem eigenen machen

Nachdem du 3 Seiten nachgeahmt hast, wirst du feststellen: **Hinter jeder schönen Seite steckt ein stabiles "Designsystem"**. Anstatt es selbst von 0 zu bauen, ist es besser, auf den Schultern von Riesen zu stehen.

![](/zh-cn/stage-2/frontend/ui-design/images/design-system.jpg)

### 6.1 Was ist ein "portierbares Designsystem"

Open Design macht Designsysteme zu `DESIGN.md`-Dateien (Linear, Vercel, Stripe, Apple, Cursor, Figma…), Claude Design extrahiert sie automatisch aus deinem Code-Repo/Design-Dateien. Im Kern sind sie dasselbe:

```text
DESIGN.md  =  Farb-Token + Schriftstandards + Abstandsrhythmus + Komponentenstile + Nutzungskonventionen
```

Eine echte Beispielstruktur:

```markdown
# Design System: Linear

## Colors
- background: #08090A
- primary: #5E6AD2
- text: #F7F7F8

## Typography
- heading: 22px / 600, letter-spacing -0.4px
- body: 14px / 400

## Radius
- card: 8px
- button: 6px

## Spacing
- 4 / 8 / 12 / 16 / 24 / 32 px

## Do / Don't
- Do: viel Weißraum, zurückhaltender Farbgebrauch
- Don't: keine Verläufe, kein Schatten-Stapeln
```

### 6.2 In drei Schritten ein eigenes Designsystem aufbauen

1. **Basis wählen**: Wende ein Designsystem an, das dir zusagt (z. B. das zurückhaltende Dunkel von Linear, das Weißraum-Prinzip von Apple)
2. **Parameter ändern**: Ersetze die Primärfarbe durch deine Markenfarbe, passe Rundungen und Abstände an
3. **Als Datei festhalten**: Speichere als `DESIGN.md` oder als Skill, sodass die AI bei jeder Generierung automatisch folgt

### 6.3 Fortgeschritten: Mit einem UI-Design-Skill den Stil fixieren

Wenn du das Designsystem als Skill verpackt hast, lässt es sich mit einem Satz aufrufen:

```text
Nutze die Designstandards des my-brand-Skills und generiere die Erstbild-Konzepte für 3 Funktionsseiten
```

Die Methode zum Erstellen und Verwenden von Skills findest du unter [Mit LLMs und Skills die Oberfläche schöner machen](../llm-skills-beautiful/).

---

## Kapitel 7: Urheberrecht und Ethik

Je stärker deine Nachahmungsfähigkeit, desto wichtiger ist es, die Grenzen zu wahren:

![](/zh-cn/stage-2/frontend/ui-design/images/copyright.jpg)

**Regeln kopieren, nicht Ergebnisse.** "Regeln" wie Layout, Farbpalette, Abstände darfst du lernen; "Ergebnisse" wie Logo, Icons, Illustrationen, Texte solltest du nicht direkt kopieren.

**Bei kommerziellen Projekten vorsichtig sein.** Vor der kommerziellen Übergabe prüfen: Material-Urheberrechte, Schrifttlizenzen (kommerzielle Schriften müssen gekauft werden), Nutzungsbedingungen der Referenz-Websites.

**Zugehörigkeit AI-generierter Inhalte.** Die Bedingungen verschiedener Plattformen (Claude Design, Open Design etc.) unterscheiden sich; lies vor der kommerziellen Nutzung die Servicevereinbarungen.

**AI-Beteiligung kennzeichnen.** Einige Plattformen/Vorschriften verlangen, dass Inhalte als AI-generiert ausgewiesen werden.

**Finale Kontrolle.** Bei sensiblen Szenarien wie Markenidentität und Werbematerialien ist eine manuelle Prüfung Pflicht.

::: tip 💡 Empfehlung
In der Lern- und Prototypenphase darfst du frei nachahmen; **beim Eintritt in die kommerzielle Übergabe solltest du "Referenz" in eine "Neuschöpfung auf Basis deines eigenen Designsystems" verwandeln und die Generierungsprotokolle aufbewahren**.
:::

---

## Zusammenfassung

Dieses Kapitel hat den "Einstieg ins Frontend-Design" auf einen ausführbaren Weg gebracht:

1. **Mindsets**: Der Einstieg ins Frontend-Design beginnt mit "Kopieren — Regeln kopieren, nicht Ergebnisse"
2. **Sehen**: Zerlege jede Seite dreischichtig mit Struktur (4 große Blöcke) + Optik (Farbe/Schrift/Abstände/Rundung) + Komponenten; DevTools ist dein Analysegerät
3. **Tools**: 2 Wege — Figma/MasterGo (Fein-Design-Entwürfe), Claude Design / Open Design + UI-Design-Skills (dialogbasierte Prototypen)
4. **Nachahmen**: Ziel wählen → zerlegen → generieren → Block für Block iterieren → Pixelgenau vergleichen und abnehmen
5. **Festhalten**: Baue das DESIGN.md großer Unternehmen zu deinem eigenen Designsystem um und fixiere es mit einem Skill

::: tip 💡 Nächster Schritt
Schließe heute eine vollständige Nachahmungsübung ab:
1. Suche eine Landing Page, die du "kopieren" möchtest, und löse mit DevTools ihre Farben/Schrift/Abstände/Rundungen heraus
2. Generiere mit Claude Design oder Open Design die erste Version und ändere Block für Block, bis sie "ähnlich" ist
3. Übergib die finale Version an die AI, um sie in Code zu verwandeln, und speichere nebenbei eine eigene DESIGN.md
:::

<RelatedArticlesSection
  title="Verwandte Artikel"
  description="Tauche weiter in AI-Design, Materialproduktion und die Praxis von Design-zu-Code ein."
  :items="relatedArticles"
/>
