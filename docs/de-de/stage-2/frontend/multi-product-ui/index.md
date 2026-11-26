# Seiten und Buttons nach UI-Designrichtlinien entwerfen

Viele Menschen sagen: "Ich moechte, dass die Seite ein bisschen mehr wie Apple aussieht" oder "Die Buttons sollten etwas hochwertiger wirken". Aber wenn es dann an die Umsetzung geht, haengt man oft an einer Frage fest:

**Woran sollte man sich eigentlich orientieren?**

Einen Screenshot abzubilden, bringt nur die Erkenntnis "Aehnlichkeit". Wenn man jedoch die Designrichtlinien von Apple, Google, Microsoft und Atlassian oeffnet, stellt man fest, dass deren wahre Staerke nicht im visuellen Stil liegt, sondern darin, **Designprobleme klar zu benennen**: Was auf einer Seite zuerst hervorgehoben wird, wie Buttons gestuft werden, welche Operationen betont werden -- diese Beurteilungskriterien sind der Kern.

> Sich an Designrichtlinien zu orientieren, heisst nicht, "wie jemand anderes auszusehen", sondern zu lernen, wie andere Urteile faellen.

:::: info Warum man diese heute noch lernen sollte
Designregeln sind bereits in Modelle trainiert und werden von Designtools standardmaessig absorbiert. Selbst wenn man AI ein paar Screenshots gibt, kann sie diese erlernen. Dennoch ist es wichtig zu wissen, woher diese Regeln kommen und warum sie so definiert sind.
::::

## Zunaechst einige Originalzitate, um den Unterschied zu spueren

Wenn du bisher dachtest, "Designrichtlinien handeln doch nur von Stil", dann lies zuerst einige offizielle Originaltexte.

Im Team sagt man oft Dinge wie:

- Mach mal ein Dropdown
- Hier ein Menu hinsetzen
- In der Menueleiste ein paar Funktionen hinzufuegen
- Hier zwei Buttons, einer zum Bestaetigen und einer zum Abbrechen

Das klingt unproblematisch, aber in den grossen Unternehmensrichtlinien sind diese Begriffe keine verschwommenen Konzepte, sondern sehr fein unterteilt.

| Was man umgangssprachlich sagt | Offizieller Originaltext | Kurz gesagt |
| :--- | :--- | :--- |
| "Ein Menu erstellen" | Apple: [“A menu reveals its options...”](https://developer.apple.com/design/human-interface-guidelines/menus) | `Menu` dient der Durchfuehrung von Aktionen |
| "Funktionen in die Menueleiste" | Apple: [“menu bar menus contain all the commands...”](https://developer.apple.com/design/human-interface-guidelines/menus) | Dies ist das Befehlsmenue oben in der App |
| "Ein Dropdown erstellen" | Apple: [“A pop-up list lets the user choose one option among several.”](https://developer.apple.com/library/archive/documentation/Cocoa/Conceptual/MenuList/Articles/ManagingPopUpItems.html) | `pop-up` dient der Auswahl eines Werts aus einer Liste |
| "Auch ein Dropdown" | Apple: [“A pull-down list is generally used for selecting commands in a specific context.”](https://developer.apple.com/library/archive/documentation/Cocoa/Conceptual/MenuList/Articles/ManagingPopUpItems.html) | `pull-down` oeffnet sich fuer die aktuelle Aktion |
| "Menu kann man auch zum Filtern nutzen" | Fluent: [“If you need to collect information from people, try a select, dropdown, or combobox instead.”](https://fluent2.microsoft.design/components/web/react/core/menu/usage) | `Menu` ist nicht zur Werterfassung gedacht |
| "Menu kann man auch als Navigation nutzen" | Material: [“Menus should not be used as a primary method for navigation within an app.”](https://m1.material.io/components/menus.html) | `Menu` ist keine Hauptnavigation |
| "Button einfach OK / Cancel schreiben" | Apple: [“Always use ‘Cancel’ to title a button that cancels the alert’s action.”](https://developer.apple.com/design/human-interface-guidelines/alerts) | Button-Text darf nicht willkuerlich sein |

> Die Zitate in der Tabelle sind direkt klickbar und fuehren zur entsprechenden offiziellen Seite.

Genau das ist es, woran man beim ersten echten Blick in Designrichtlinien am leichtesten erschrickt:

> Wir glauben oft, wir wuerden ueber UI diskutieren, aber tatsaechlich kommunizieren wir meistens nur mit einer Reihe vager Begriffe.

Apple wuerde niemals nur sagen "ein Menu erstellen"; es wuerde weiter unterscheiden in:

- `menu`
- `menu bar menu`
- `pop-up button`
- `pull-down button`
- `context menu`

Fluent wuerde niemals nur sagen "ein Dropdown"; es wuerde weiter unterscheiden in:

- `menu`
- `dropdown`
- `select`
- `combobox`

Genau das ist die Notwendigkeit von Designrichtlinien.

Sie dienen nicht dazu, Seiten professioneller wirken zu lassen, sondern sicherzustellen, dass im Team bei UI-Diskussionen nicht jeder etwas anderes im Kopf hat.

An den Namen allein erkennst du den Unterschied kaum. Die beiden Steuerelemente unten sehen fast gleich aus. Öffne beide und wähle jeweils einen Eintrag. Was passiert dabei?

<UiSpecLookalikeControlsDemo />

In Apples Richtlinien findest du für die beiden Steuerelemente je eine eigene Seite. Vergleiche [Pop-up buttons](https://developer.apple.com/design/human-interface-guidelines/pop-up-buttons) und [Pull-down buttons](https://developer.apple.com/design/human-interface-guidelines/pull-down-buttons).

## Was du lernen wirst

1. Warum man beim Entwerfen von Seiten und Buttons zuerst die Designrichtlinien lesen sollte
2. Welche Inhalte der Richtlinien von Apple, Material, Fluent und Atlassian am referenzwuerdigsten sind
3. Wie man "Seitenhierarchie" und "Button-Hierarchie" klar gestaltet
4. Wie genau eine ausgereifte Richtlinie einen Button definiert
5. Wie man AI dazu bringt, sich an den Richtlinien anderer zu orientieren, um Seiten und Buttons zu generieren

Zu jedem Teil gibt es interaktive Abbildungen zum Ausprobieren.

## 1. Warum Designrichtlinien dir helfen, Seiten klar zu gestalten

Nach dem Lesen der obigen Originalzitate faellt ein Schluesselpunkt auf:

**Designrichtlinien sind kein zusaetzlicher Luxus, sondern sorgen zunaechst dafuer, dass die Begriffe praezise verwendet werden.**

Viele Seiten sehen nicht gut aus, nicht weil die Farbgebung nicht hochwertig genug ist, sondern weil die Informationsebenen chaotisch sind.

Schau dir zuerst ein Beispiel an. Unten siehst du dieselbe Projektliste in zwei Varianten. Die Texte sind identisch, ich habe nur die Hierarchie geändert. Probiere Folgendes aus:

- Fahre mit der Maus über eine Zeile der Tabelle. Beide Abbildungen markieren gleichzeitig, wo das Problem auftritt.
- Betätige die Schalter über der rechten Abbildung. So siehst du, wie die Seite ohne die jeweilige Verbesserung aussieht.
- Ziehe den Regler für den „Unschärfetest“. Mit zunehmender Unschärfe zieht links noch immer alles deine Aufmerksamkeit auf sich. Rechts bleiben nur der Titel und der Haupt-Button erkennbar.

<UiSpecHierarchyCompareDemo />

Viele Buttons sind nicht benutzerfreundlich, nicht weil die Abrundung falsch ist, sondern weil:

- Es zu viele Haupt-Buttons gibt und die Nutzer nicht wissen, welchen sie klicken sollen
- Gefaehrliche und normale Buttons aehnlich aussehen
- Alle Buttons auf der Seite um Aufmerksamkeit konkurrieren
- Button-Stil und Semantik ueber verschiedene Seiten hinweg inkonsistent sind

Ausgereifte Designrichtlinien loesen genau diese Probleme. Sie definieren in der Regel:

| Inhalt der Richtlinie | Welches Problem es loest |
| :--- | :--- |
| **Seitenhierarchie** | Wohin man zuerst schaut, wohin spaeter, wie Informationen organisiert werden |
| **Visuelle Grundlagen** | Wie Farben, Abstaende, Schriften, Abrundungen und Schatten vereinheitlicht werden |
| **Button-Hierarchie** | Wie Haupt-, Neben-, Text- und Gefahren-Buttons unterschieden werden |
| **Zustandsregeln** | Wie hover, focus, disabled und loading dargestellt werden |
| **Interaktionssemantik** | Welcher Button "bestaetigen", "abbrechen" und "weitere Aktionen" bedeutet |

Designrichtlinien liefern also nicht einfach einen "Skin", sondern ein **Beurteilungskriterium**.

### 1.1 Was steckt in einer echten Designrichtlinie?

Die Tabelle oben hat nur fünf Zeilen und gibt einen groben Überblick. Vielleicht fragst du dich, wie viel tatsächlich in einer Designrichtlinie steckt.

Zählen wir im Inhaltsverzeichnis von Apple nach. Klicke unten auf ein Thema oder nutze die Schalter darüber, um die Themen zu Seiten und Buttons herauszufiltern.

<UiSpecSpecMapDemo />

Du brauchst die Richtlinie nicht auswendig zu lernen. Mach dich zuerst mit den Themen vertraut, die unmittelbar mit Seiten und Buttons zu tun haben. Wenn du das vollständige Inhaltsverzeichnis sehen möchtest, öffne die [Apple HIG](https://developer.apple.com/design/human-interface-guidelines/).

## 2. Worauf man bei den grossen Unternehmensrichtlinien achten sollte

Jede dieser Richtlinien hat eigene Stärken. Die Tabelle hilft dir, für deine Frage die passende Richtlinie zu finden.

| Was du wissen möchtest | Bei Apple nachschlagen | Bei Material nachschlagen |
| :--- | :--- | :--- |
| Wie genau muss eine Komponente definiert sein? | Zweck, Rollen, Verhalten und Barrierefreiheit | Aufbau, Stilvarianten und Zustände |
| Wie wird die Seitenhierarchie erkennbar? | Navigationsbeziehungen, Textstile und der Rang von Inhalten und Steuerelementen | Seitenstruktur: Platz für Navigation, Inhalt und Aktionen |
| Wie ordne ich Aktionen nach Priorität? | Rolle und visuelle Hervorhebung eines Buttons getrennt festlegen | Die Stufen Filled, Tonal, Outlined und Text |
| Wie gestalte ich zurückhaltend? | Wiederholungen reduzieren und verwandte Befehle gruppieren | Jedem Bereich eine klare Aufgabe geben |

Achte darauf, die Richtlinien getrennt anzuwenden. Wenn du etwa Apples Glaseffekt mit sämtlichen Button-Stilen von Material kombinierst, gehen oft die Regeln beider Systeme verloren. Wähle ein System aus und halte dich durchgängig daran.

### 2.1 Von Apple lernen: "Definitionen fein genug zu fassen"

Das Lernwertste bei Apple ist nicht nur die visuelle Zurueckhaltung, sondern dass es Konzepte sehr fein definiert.

Das, was in vielen Teams nur "Menu" oder "Dropdown" heisst, wird bei Apple weiter unterteilt:

- `menu`: Eine Gruppe von Befehlen, Optionen oder Zustaenden
- `menu bar menu`: App-weite Befehlssammlung
- `pop-up button`: Einen Wert auswaehlen
- `pull-down button`: Im aktuellen Kontext einen Befehl ausloesen
- `context menu`: Haeufige Aktionen bezogen auf das aktuelle Objekt oder die aktuelle Aufgabe

Diese Unterscheidung ist sehr wichtig, da sie sich direkt darauf auswirkt:

- Ob die Komponente zur Werterfassung oder zur Aktionsausfuehrung dient
- Ob sie zum Seitenbereich oder zur App-Ebene gehoert
- Ob sie den aktuell ausgewaehlten Wert dauerhaft anzeigen soll oder nur temporaer Befehle aufklappt

Wenn du in dieser Granularitaet zu denken beginnst, werden deine Seiten sofort deutlich klarer.

#### Wie genau muss ein Button definiert sein?

Was heißt „genau genug“? Nehmen wir einen ganz normalen Button. Bei „Füge einen Button hinzu“ denkst du vielleicht bloß an „blau, abgerundet, Höhe 40“. Eine ausgereifte Richtlinie stellt dazu noch 10 Fragen. In der Spezifikation unten kannst du sie links nacheinander öffnen und sehen, wie detailliert du jede beantworten solltest.

<UiSpecButtonSpecDemo />

Beim Durchklicken merkst du, dass Farbe, Abrundung und Schriftgröße nur einen kleinen Teil ausmachen. Die Definition ist genau genug, wenn jemand aus dem Design- oder Entwicklungsteam damit denselben Button umsetzen kann, ohne nachfragen zu müssen.

Zustände und Verhalten werden besonders leicht übersehen, denn auf einem statischen Screenshot sind sie unsichtbar. Probiere es unten selbst aus. Fahre mit der Maus über den Button, halte ihn gedrückt, fokussiere ihn mit Tab und klicke dann auf „Projekt veröffentlichen“. So siehst du den ganzen Ablauf.

<UiSpecButtonStatesDemo />

Wie Buttons offiziell aussehen, kannst du in [Buttons](https://developer.apple.com/design/human-interface-guidelines/buttons) von Apple und in [Buttons](https://m3.material.io/components/buttons/overview) von Material nachsehen.

Denk noch einmal an die beiden gleich aussehenden Dropdown-Steuerelemente vom Kapitelanfang. Jetzt siehst du, warum sie unterschiedliche Aufgaben haben. Die Richtlinie legt auch fest, **was das Steuerelement dem Nutzer verspricht**. Mit dem einen änderst du einen Wert, mit dem anderen führst du eine Aktion aus.

Das beantwortet auch eine häufige Frage. Warum sollte „Löschen“ trotz des Risikos nicht automatisch der auffälligste Button sein? Die Rolle gibt an, wie riskant die Aktion ist. Der Stil zeigt, wie wichtig sie für die aktuelle Aufgabe ist.

In den Richtlinien gibt es weitere Komponenten, die auf den ersten Blick austauschbar wirken. Unten findest du häufige Beispiele. Frage dich beim nächsten Mal, was der Nutzer mit einem Klick erreichen will.

| Leicht zu verwechseln | Wofür sie jeweils da sind | Beispiel |
| :--- | :--- | :--- |
| Tab-Navigation / Werkzeugleiste | Tabs wechseln zwischen Hauptbereichen. Die Werkzeugleiste bündelt Aktionen auf der aktuellen Seite. | „Projekte“ und „Einstellungen“ führen an einen Ort. „Auswahl löschen“ führt eine Aktion aus. |
| Schalter / Button | Ein Schalter wechselt zwischen zwei Zuständen. Ein Button löst eine Aktion aus. | „Benachrichtigungen erhalten“ als Schalter, „Absenden“ als Button |
| Auswahlfeld / Menü | Ein Auswahlfeld wählt einen von mehreren Werten. Ein Menü führt Befehle aus. | „Nach letzter Änderung sortieren“ gehört ins Auswahlfeld, „Umbenennen“ ins Menü. |
| Bestätigungsdialog / Seitenpanel | Ein Bestätigungsdialog zeigt wichtige Informationen, die sofort beachtet werden müssen. Ein Seitenpanel dient einer klar umrissenen Aufgabe. | „Wirklich löschen?“ im Bestätigungsdialog, „Neuer Ordner“ im Seitenpanel |

### 2.2 Von Apple lernen: Seitenhierarchie und Zurueckhaltung

Die Apple Human Interface Guidelines eignen sich besonders gut, um zwei Dinge zu lernen:

- Wie Seiten eine klare Hierarchie aufbauen
- Wie Steuerelemente eindeutig bleiben, ohne aufdringlich zu wirken

Apple betont `Hierarchy`, `Harmony` und `Consistency`. Das bedeutet, dass beim Seitendesign folgende Fragen beantwortet werden muessen:

- Was ist die wichtigste Information auf der aktuellen Seite?
- Was ist die Hauptaufgabe des Nutzers?
- Welche Operation am auffaelligsten sein sollte und welche in den Hintergrund gehoert

Wenn du dich an Apple orientierst, kannst du besonders folgende Aspekte uebernehmen:

- Die Informationen auf dem ersten Bildschirm sollten nicht zu fragmentiert sein; der Kerninhalt steht im Fokus
- Ordnung durch Freiraum, Schriftgroessen und Gruppierung schaffen, statt viele Rahmen zu stapeln
- Nicht alle Buttons sollten stark hervorgehoben sein; nur die wichtigsten Aktionen sollten am auffaelligsten sein

#### Abbildung: Der Aufbau einer Seite

Wie wirken diese Empfehlungen auf einer echten Seite? Fahre links mit der Maus über eine Ebene oder klicke darauf, um die Markierung festzuhalten. Rechts siehst du, wo die Ebene liegt und wodurch sie deine Aufmerksamkeit auf sich zieht. Aktiviere „Hilfslinien anzeigen“, um die Verteilung der Abstände zu sehen.

<UiSpecPageAnatomyDemo />

Achte rechts auf drei Details:

- **Schriftgröße, Schriftstärke und Helligkeit machen die Hierarchie sichtbar.** Die größte Schrift kommt nur einmal vor. Nur ausgewählte Überschriften sind fett.
- **Ergänzende Informationen stehen direkt neben dem Inhalt, den sie erklären.** Sie sind kleiner und heller, bleiben aber gut lesbar.
- **Es gibt nur einen Haupt-Button.** Er steht am Ende des Inhalts.

Die offiziellen Erläuterungen findest du bei Apple unter [Layout](https://developer.apple.com/design/human-interface-guidelines/layout) und [Typography](https://developer.apple.com/design/human-interface-guidelines/typography).

#### Abbildung: Warum es ohne Rahmen oft übersichtlicher wird

„Schaffe Ordnung durch Freiraum, Schriftgrößen und Gruppierung“ klingt schnell nach „Entferne alle Rahmen“. Ob das reicht, kannst du unten ausprobieren. Klicke die drei Schritte nacheinander an und achte darauf, ab wann du die Gruppen erkennst.

<UiSpecGroupingDemo />

Im dritten Schritt siehst du, dass die Abstände den Unterschied machen. Verwandte Inhalte bilden durch ihre Nähe eine Gruppe. **Gruppiere also zuerst und entscheide dann, ob du einen Rahmen brauchst.** Gib einer Gruppe nur dann eine Hintergrundfarbe oder Kontur, wenn sie eine deutlichere Abgrenzung braucht.

Auf Apples Seite [Toolbars](https://developer.apple.com/design/human-interface-guidelines/toolbars) zeigt ein offizieller Vorher-nachher-Vergleich dasselbe Prinzip. Verwandte Befehle gehören in dieselbe Gruppe.

### 2.3 Von Material lernen: Klarere Seitenstruktur

Material Design eignet sich besonders gut, um zu lernen, "wie Seiten Aufgabenstroeme organisieren".

Viele seiner Komponenten- und Layoutrichtlinien zielen darauf ab, Folgendes klarzustellen:

- Ob eine Seite zum Durchsuchen oder zur Aufgabenausfuehrung dient
- Ob die aktuelle Seite Nutzer zum Lesen, Auswaehlen oder Absenden veranlassen soll
- Welche Elemente auf einer Seite stabil wiederkehren sollten und welche sich dynamisch an den Kontext anpassen

Wenn du dich an Material orientierst, kannst du besonders folgende Aspekte uebernehmen:

- Seitenbereiche klar strukturieren, Modulverantwortlichkeiten eindeutig definieren
- Navigation, Inhalts- und Aktionsbereiche sauber trennen
- Unterschiedliche Button-Stile entsprechen unterschiedlichen Operationsprioritaeten

#### Abbildung: Was übernehmen Navigation, Inhalt und Aktionen?

Die Aufgaben sauber aufzuteilen klingt einfach. Wie sieht das konkret aus? Bei Material beantwortet die Navigation „Wohin gehe ich?“, der Inhalt „Was sehe ich?“ und der Aktionsbereich „Was kann ich tun?“. Bei jeder Aktion sollte klar sein, worauf sie sich auswirkt.

Die Abbildung unten zerlegt eine Seite nach diesem Prinzip. Fahre links mit der Maus über einen Eintrag und achte darauf, wo die durchgezogene und die gestrichelte Linie erscheinen.

<UiSpecPageSkeletonDemo />

Achte auf drei Dinge:

- **Beide Seiten der oberen Leiste haben eigene Aufgaben.** Zurück und der Titel stehen links. Die Aktionen stehen rechts, wo nur ein Button hervorgehoben ist. Verwandte Aktionen stehen nah beieinander, dazwischen trennen Abstände die Gruppen. So bleibt die Leiste zurückhaltend.
- **Aktionen können sehr unterschiedliche Auswirkungen haben.** „Neues Projekt“ betrifft die gesamte Liste, „Öffnen“ nur einen Eintrag.
- **An der falschen Stelle wird der Bezug unklar.** Aktiviere „Verschiebe ‚Löschen‘ probeweise in die Werkzeugleiste“. Jetzt ist kaum zu erkennen, welcher Eintrag gelöscht wird.

Offizielle Abbildungen findest du bei Apple unter [Toolbars](https://developer.apple.com/design/human-interface-guidelines/toolbars) und bei Material unter [Layout](https://m3.material.io/foundations/layout/layout-overview/overview).

### 2.4 Von Fluent lernen: Komponentengrenzen und Button-Hierarchie

Fluent 2 eignet sich besonders fuer Backends, Werkzeug-Produkte und komplexe Formularsysteme. Das Lernenswerteste daran ist, dass es dir direkt sagt: "Konzepte nicht vermischen."

Es schreibt beispielsweise ausdruecklich: Wenn du "collect information" moechtest, solltest du nicht weiterhin `menu` verwenden, sondern `select`, `dropdown` oder `combobox` in Betracht ziehen.

Dieser Satz ist sehr wichtig, da er das, was viele Menschen fuer "ungefaehr gleich" halten, aufbrechen laesst.

Fluent 2 legt auch grossen Wert auf:

- Aktionsebenen
- Komponenten-Semantikgrenzen
- Klarheit in dichten Informationsszenarien

Wenn du dich an Fluent orientierst, um Buttons zu gestalten, kannst du besonders folgende Aspekte uebernehmen:

- `Primary button` fuer die aktuell wichtigste Aktion
- `Secondary button` fuer unterstuetzende Aktionen
- `Subtle` und `Transparent` als schwach betonte Buttons fuer Aktionen, die den Hauptprozess nicht stoeren sollten
- Je mehr Buttons auf einer Seite, desto wichtiger ist die Kontrolle der visuellen Prioritaet

#### Abbildung: So nutzt du die vier Button-Stufen

Was heißt es konkret, die visuelle Priorität zu steuern? Probiere es in der folgenden Demo selbst aus.

<UiSpecFluentButtonsDemo />

### 2.5 Von Atlassian lernen: Systematisches Verwalten von Seiten und Buttons

Das Atlassian Design System eignet sich besonders fuer den Fall, dass "ein Team viele Seiten erstellt". Es betont:

- foundations als gemeinsame Basis
- tokens als Methode zur einheitlichen visuellen Entscheidungsfindung
- components als wiederholt verwendete Interaktionsbausteine

Wenn du dich an Atlassian orientierst, um Seiten und Buttons zu gestalten, ist das Wertvollste:

- Button-Groesse, Farbe, Abrundung und Abstaende als einheitliche Regeln definieren
- Den Rhythmus des Seitenlayouts festigen
- Sicherstellen, dass verschiedene Seiten trotz unterschiedlicher Inhalte eine einheitliche Struktursprache verwenden

#### Abbildung: Stilwerte als Tokens definieren

„Einheitliche Regeln“ klingt etwas abstrakt. Bewege die Regler rechts und aktiviere dann „Jede Seite nutzt eigene Werte (ohne Tokens)“. Vergleiche, wie die Seiten mit und ohne gemeinsame Regeln aussehen.

<UiSpecTokensDemo />

## 3. Worauf man beim Entwerfen von Seiten aus den Richtlinien absehen sollte

Wenn du ein Designsystem betrachtest, frage nicht zuerst "Sieht diese Seite gut aus?", sondern stelle zunaechst die folgenden Fragen.

### 3.1 Erster Blick auf die Seite: Ist die Hierarchie klar?

Eine Seite sollte in der Regel mindestens drei Ebenen haben:

- **Hauptinformation**: Der wichtigste Inhalt der aktuellen Seite
- **Unterstuetzende Informationen**: Inhalte zum besseren Verstaendnis oder zur Ergaenzung
- **Sekundaere Aktionen**: Aktionen, die die Hauptaufgabe nicht stoeren sollten

Wenn die drei Ebenen nicht deutlich getrennt sind, wirkt die Seite "alles wichtig" -- was gleichbedeutend mit "nichts ist wichtig" ist.

Ziehe den Regler unten, um die drei Ebenen selbst voneinander abzuheben.

<UiSpecThreeLayersDemo />

### 3.2 Seitenlayout: Dient es der Aufgabe oder stapelt es nur Module?

Beim Durcharbeiten der Richtlinien solltest du besonders darauf achten:

- Ob der Titelbereich das Seitenziel klar benennt
- Ob der Hauptinhaltsbereich um die Aufgabe herum organisiert ist
- Ob die Aktions-Buttons nah an den zugehoerigen Inhalten platziert sind
- Ob unwichtige Informationen abgeschwaecht wurden

Beim letzten Punkt lohnt sich ein genauerer Blick. Ob Nebeninformationen in den Hintergrund treten, hängt oft davon ab, ob sie an der richtigen Stelle stehen.

<UiSpecTaskFlowLayoutDemo />

### 3.3 Haben die Aktionen auf der Seite eine Prioritaet?

Viele Seiten haben auf den ersten Blick 6 Buttons, und jeder sieht wie ein CTA aus -- das ist ein klassischer Hierarchieverlust.

Sinnvoller ist:

- Ein Bereich hat in der Regel nur eine Hauptaktion
- Sekundaere Aktionen koennen mit Umrandungen, Text-Buttons oder schwaecherem Stil dargestellt werden
- Risikoaktionen sollten nicht genauso aussehen wie die Hauptaktion

Beide Varianten hast du schon gesehen. Der Vergleich in Abschnitt 1 zeigt, wie zu viele hervorgehobene Buttons wirken. Die Fluent-Demo in Abschnitt 2.4 zeigt, wie du sie abstufst.

### 3.4 Was solltest du hervorheben, was zurücknehmen?

Geh zu Abschnitt 1 zurück und bewege noch einmal den Regler für den „Unschärfetest“. Stell die Seite so unscharf, dass du den Text nicht mehr lesen kannst. Was du jetzt noch erkennst, zieht die meiste Aufmerksamkeit auf sich. An dieser Einteilung kannst du dich orientieren:

- **Hervorheben:** Seitentitel, die wichtigsten Inhalte für die aktuelle Aufgabe und die Hauptaktion für den nächsten Schritt
- **Zurücknehmen:** Metadaten, ergänzende Erläuterungen und Einstiegspunkte für Nebenaufgaben
- **Nie hervorheben:** dekorative Rahmen, Überschriften, die pauschal für jedes Modul ergänzt werden, und Neben-Buttons, die mit der Hauptaktion konkurrieren

Wenn nach dem Weichzeichnen überall etwa gleich große dunkle Blöcke stehen, zieht alles gleichermaßen Aufmerksamkeit auf sich. Dann sticht nichts wirklich hervor.

## 4. Worauf man beim Entwerfen von Buttons aus den Richtlinien absehen sollte

Buttons sind der am leichtesten "beilaeufig gestaltete" Teil, aber auch der Teil, der am meisten darueber verraet, ob ein System ausgereift ist.

### 4.1 Buttons zunaechst nach "Semantik" unterscheiden, dann nach "Stil"

Denke nicht zuerst "blauer oder schwarzer Button", sondern darueber, welche Rolle dieser Button spielt.

Haeufige Button-Rollen koennen wie folgt kategorisiert werden:

| Button-Typ | Funktion | Haeufige Stilstrategie |
| :--- | :--- | :--- |
| **Primary** | Die wichtigste Aktion im aktuellen Bereich | Ausgefuellt, hoher Kontrast, am auffaelligsten |
| **Secondary** | Unterstuetzende Aktionen | Umrandet oder eine Stufe schwaecher betont |
| **Tertiary / Text** | Schwache Aktionen | Text oder geringer visueller Anteil |
| **Destructive** | Risikoaktionen wie Loeschen, Deaktivieren, Leeren | Warnfarbe oder eindeutiger Risiko-Stil |
| **Icon button** | Lokale Werkzeugaktionen | Kompakt, nah am Kontext |

Auf einer Seite sehen die Rollen so aus:

<UiSpecRoleSamplesDemo />

### 4.2 Nicht zu viele Primary Buttons auf einer Seite

Das ist die haeufigste Falle fuer Anfaenger.

Wenn 4 Haupt-Buttons auf einer Seite sind, gibt es faktisch keinen Haupt-Button. Die Bedeutung eines Haupt-Buttons besteht ja gerade darin, "dem Nutzer zu sagen, was er jetzt am besten tun sollte".

Du kannst die gemeinsame Praxis vieler Designsysteme uebernehmen:

- Ein Hauptbereich hat in der Regel nur einen Haupt-Button
- Abbrechen, Zurueck und Schliessen konkurrieren in der Regel nicht auf derselben Ebene mit dem Bestaetigungs-Button
- Weitere Aktionen in sekundaere Buttons oder Menus auslagern

#### Jetzt entscheidest du

Ob du die Regel anwenden kannst, findest du am besten selbst heraus. Auf der Seite unten sehen alle 5 Buttons gleich aus. Welcher sollte der Haupt-Button sein?

<UiSpecButtonDecisionDemo />

Beim Lösen helfen dir drei Fragen. Was will der Nutzer vor allem erledigen? Welche Aktionen helfen nur dabei? Welche Aktion lässt sich nicht rückgängig machen? Geh diese Fragen durch, wenn du das nächste Mal die Priorität von Buttons festlegst.

### 4.3 Buttons muessen Zustandsaenderungen ausdruecken koennen

Designrichtlinien beschreiben Button-Zustaende in der Regel sehr detailliert:

- Standardzustand
- Hover-Zustand
- Fokus-Zustand
- Deaktivierter Zustand
- Ladezustand
- Gefahrenzustand

Das ist wichtig, da ein Button kein statisches Bild ist, sondern eines der am haeufigsten ausgeloesten Steuerelemente waehrend der Benutzerinteraktion.

Wie die sechs Zustände aussehen und wie du sie auseinanderhältst, kannst du in der Demo zu Button-Zuständen und Verhalten in Abschnitt 2.1 selbst ausprobieren.

### 4.4 Button-Beschriftung gehoert ebenfalls zum Design

Die Button-Beschriftung ist nicht nur eine "Textfrage" -- sie beeinflusst das Nutzerverstaendnis direkt.

Beispiele:

- `Speichern`
- `Aenderungen speichern`
- `Sofort veroeffentlichen`
- `Projekt loeschen`
- `In den Papierkorb verschieben`

Diese Beschriftungen vermitteln vollkommen unterschiedliche psychologische Erwartungen. Ausgereifte Richtlinien verlangen in der Regel, dass Button-Labels die Aktion klar ausdruecken, anstatt vage Begriffe zu verwenden.

Hier sind einige häufige vage Beschriftungen und passende Alternativen:

| Vage Beschriftung | Bessere Beschriftung | Warum? |
| :--- | :--- | :--- |
| Bestätigen | Entwurf speichern | Auf einen Blick ist klar, was der Klick auslöst. |
| Absenden | Artikel veröffentlichen | Verb und Objekt machen die Aktion eindeutig. |
| Ja / Nein | Projekt löschen / Abbrechen | Die Beschriftung nennt die Folgen direkt. |
| Hier klicken | Bestelldetails ansehen | Das Ziel ist auch ohne weiteren Kontext klar. |
| OK | E-Mail erneut senden | Mehrere Buttons mit „OK“ auf derselben Seite sind schwer zu unterscheiden. |

## 5. Eine sehr praktische Checkliste fuer Seiten- und Button-Design

Wenn du selbst eine Seite entwirfst, kannst du zunaechst diese Checkliste schnell durchgehen:

### Seiten-Checkliste

- Ob der Seitentitel die aktuelle Aufgabe klar beschreibt
- Ob die wichtigste Information auf dem ersten Bildschirm sofort sichtbar ist
- Ob die Seite nach dem Aufgabenfluss und nicht nach dem organisiert ist, was einem gerade einfaellt
- Ob es in einem Bereich nur eine Hauptaktion gibt
- Ob unwichtige Inhalte angemessen abgeschwaecht wurden
- Wissen Nutzer jederzeit, wo sie sind und wie sie zurückkommen?
- Was zeigt die Seite beim Laden, bei leeren Daten und bei einer fehlgeschlagenen Anfrage?
- Werden Inhalte verdeckt oder abgeschnitten, wenn das Fenster schmaler oder die Schrift größer wird?

### Button-Checkliste

- Ist dieser Button eine Haupt- oder Nebenaktion?
- Warum sollte dieser Button auffaelliger sein als die anderen?
- Gibt es zu viele Haupt-Buttons auf der Seite?
- Sind Gefahrenaktionen eindeutig markiert?
- Ist die Button-Beschriftung konkret genug?
- Erkennen Nutzer sofort, dass der Klick angekommen ist und was er bewirkt hat?
- Kannst du den Button allein mit der Tastatur fokussieren und den Fokus klar erkennen?

### Wiederverwendbare Vorlage für die Definition

Mit der Checkliste prüfst du den Entwurf. Mit der Vorlage setzt du ihn um. Fülle die Tabelle aus, um die Grundlagen für deine Seite oder Komponente festzulegen.

| Was du definierst | Was du einträgst |
| :--- | :--- |
| **Aufgabe** | [Wer] erledigt in [Situation] auf dieser Seite [Aufgabe]. Das Ergebnis ist [überprüfbares Ergebnis]. |
| **Hierarchie** | Hauptinformation [ ], unterstützende Informationen [ ], anfangs sichtbar [ ] |
| **Aktionen** | Hauptaktion [ ], Nebenaktion [ ], riskante Aktion [ ] und deren Absicherung [ ] |
| **Gestaltung** | Verwendete Komponenten [ ], Regeln für Schriftgröße, Farben und Abstände [ ] |
| **Zustände** | Lädt [ ], keine Daten [ ], fehlgeschlagen [ ], erfolgreich [ ], nicht verfügbar [ ] |
| **Barrierefreiheit** | Zugänglicher Name [ ], Tastatur- und Vorlesereihenfolge [ ], Kontrast [ ] |
| **Anpassung** | Schmales Fenster [ ], große Schrift [ ], lange Texte [ ] |
| **Einsatzgrenzen** | Wann diese Lösung ungeeignet ist [ ], mögliche Alternative [ ] |

Bitte zur Abnahme jemanden, der am Entwurf nicht beteiligt war, anhand der Tabelle den ganzen Ablauf zu beschreiben. Dazu gehören der Einstieg, das Durchsehen der Seite, die Bedienung, der Fehlerfall und das Verlassen der Seite. Wenn die Person zwischendurch nachfragen muss, fehlt noch etwas in der Definition.

## 6. Wie man AI dazu bringt, sich an den Richtlinien anderer zu orientieren

Dieser Abschnitt ist am praktischsten.

Viele Menschen sagen zu AI beim Entwerfen von Seiten nur:

```md
Mach mir eine Einstellungsseite, die etwas hochwertiger aussehen soll, im Apple-Stil
```

Solche Prompts sind zu vage -- AI kann am Ende meist nur "weisser Hintergrund, abgerundete Ecken, Schatten" imitieren.

Fuer Anfaenger ist der praktischste Ansatz nicht, selbst eine lange Zusammenfassung zu schreiben, sondern die **Schluesselsaetze aus dem Originaltext der Richtlinie** direkt in AI einzufuegen.

Das hat zwei Vorteile:

- Du musst die Designphilosophie nicht selbst "uebersetzen"
- AI kann die Seite und die Buttons leichter gemaess den offiziellen Definitionen verstehen

### 6.1 Beispiel 1: AI bitten, eine Einstellungsseite nach Apple-Design zu erstellen

Zunaechst ein Originalzitat von Apple:

> ["Establish a clear visual hierarchy..."](https://developer.apple.com/design/human-interface-guidelines/)

Du kannst AI direkt so ansprechen:

```md
Beziehe dich auf diesen Satz aus den Apple Human Interface Guidelines:
"Establish a clear visual hierarchy..."

Erstelle eine Kontosicherheit-Einstellungsseite.
Die Seitenhierarchie soll klar sein, wichtige Informationen zuerst, ordentlich gruppiert.
```

Der Punkt dabei ist: Du musst nicht viel selbst erklaeren -- einfach den Originaltext von Apple einfuegen.

### 6.2 Beispiel 2: AI bitten, Backend-Buttons nach Fluent zu gestalten

Zunaechst ein Originalzitat von Fluent:

> ["Only use one primary button in a layout..."](https://fluent2.microsoft.design/components/web/react/core/button/usage)

Du kannst AI direkt so ansprechen:

```md
Beziehe dich auf diesen Satz aus Fluent 2:
"Only use one primary button in a layout..."

Gestalte die Buttons fuer ein Team-Management-Backend.
Der "Mitglied hinzufuegen"-Button am auffaelligsten, Export, Filter, weitere Aktionen schwaecher, und der Loeschen-Button gesondert hervorheben.
```

Dieser Satz eignet sich hervorragend fuer Anfaenger, da er AI direkt sagt: In einem Bereich nicht zu viele Haupt-Buttons platzieren.

### 6.3 Beispiel 3: AI bitten, sich gleichzeitig an Seiten- und Button-Richtlinien zu orientieren

Du kannst auch zwei Originalzitate gleichzeitig einfuegen und AI bitten, sich sowohl an der Seiten- als auch an der Button-Richtlinie zu orientieren:

> Apple: ["Establish a clear visual hierarchy..."](https://developer.apple.com/design/human-interface-guidelines/)
>
> Fluent: ["Only use one primary button in a layout..."](https://fluent2.microsoft.design/components/web/react/core/button/usage)

Dann schreibst du einfach:

```md
Beziehe dich auf die folgenden zwei Designrichtlinien-Originalsaetze:
Apple: "Establish a clear visual hierarchy..."
Fluent: "Only use one primary button in a layout..."

Erstelle eine Projektdetailseite.
Die Seite enthaelt Projektbeschreibung, Mitglieder, letzte Aktivitaeten und einen Einstellungseinstieg.
Die Seitenhierarchie soll klar sein, nur einen Haupt-Button behalten, die anderen schwaecher darstellen.
```

Dieser Ansatz eignet sich besonders fuer Anfaenger, da du nur den Originaltext kopieren und ein bis zwei Saetze eigener Anforderungen hinzufuegen musst.

### 6.4 Praxis: Regeln aus den Abbildungen in Prompts übernehmen

Jede Regel aus den Abbildungen lässt sich direkt als Anforderung an AI formulieren. Nimm zum Beispiel den Vorher-nachher-Vergleich aus Abschnitt 1 und übernimm die dort gezeigten Verbesserungen in deinen Prompt:

```md
Orientiere dich an den Button-Richtlinien von Fluent 2 und an Layout in den Apple HIG. Entwirf eine Projektliste.

Anforderungen an die Seite:
- Verwende die größte Schrift für den Seitentitel. Zeige ihn nur einmal und setze Filter und Aktionen in getrennte Zeilen.
- Schaffe Hierarchie durch Freiraum und Schriftgrößen. Umrahme nur Module, die eine Abgrenzung brauchen.
- Verwende auf der ganzen Seite nur einen Haupt-Button („Neues Projekt“). Stelle „Export“ als umrandeten Button dar.
- „Löschen“ betrifft ein einzelnes Projekt. Platziere die Aktion im Menü „Weitere Aktionen“ jedes Eintrags und halte die obere Leiste dafür frei.

Anforderungen an die Buttons:
- Definiere sechs Zustände: Standard, Hover, gedrückt, fokussiert, deaktiviert und lädt.
- Verwende für „Löschen“ eine Warnfarbe und eine geringere Hervorhebung als beim Haupt-Button.
```

Das ist viel konkreter als „Mach es etwas hochwertiger, im Apple-Stil“. Damit gibst du AI **konkrete Beurteilungskriterien**, die über Stilvorgaben hinausgehen.

## 7. Wie man AI dazu bringt, sich an Button-Richtlinien zu orientieren, um direkt Button-Designs zu generieren

Wenn du zunaechst nur Buttons erstellen moechtest, kannst du auch direkt die Originaltexte der Button-Richtlinien einfuegen.

Beispielsweise ist die Definition von Atlassian fuer Buttons sehr kurz:

> ["A button triggers an event or action."](https://atlassian.design/components/button/)

Du kannst AI so fragen:

```md
Beziehe dich auf diesen Satz von Atlassian:
"A button triggers an event or action."

Gestalte einen Satz von Backend-Button-Stilen.
Ich moechte einen Haupt-Button, einen Neben-Button und einen Loeschen-Button, und erzaehle mir bitte, wo jeweils welcher verwendet wird.
```

Diese Art von Prompt eignet sich besonders fuer Anfaenger -- im Grunde heisst es "Originaltext einfuegen + Anforderungen nennen".

## 8. Zusammenfassung

Sich an UI-Designrichtlinien zu orientieren, wenn man Seiten und Buttons entwirft, heisst nicht "auszusehen wie jemand anderes", sondern folgende Dinge zu lernen:

1. Seiten mit Hierarchie organisieren, anstatt Inhalte einfach zu stapeln
2. Operationsprioritaeten durch Button-Stufung ausdruecken, anstatt alle Buttons gleich aufdringlich zu machen
3. Sich bei der Gestaltung an den Definitionen, Grenzen und Beurteilungskriterien der Designrichtlinien orientieren
4. Wenn AI sich an den Richtlinien anderer orientiert, sollte sie sich an "Prinzipien und Struktur" orientieren, nicht nur an der Oberflaeche

Wenn du Richtlinien so verwendest, referenzierst du nicht nur einen Stil, sondern eine ausgereifte Design-Denkweise.

---

## Referenzmaterialien

Die folgenden Links stammen alle von offiziellen Designsystemen oder offizieller Dokumentation:

- Apple Human Interface Guidelines: [Overview](https://developer.apple.com/design/human-interface-guidelines/)
- Apple Human Interface Guidelines: [Menus](https://developer.apple.com/design/human-interface-guidelines/menus)
- Apple Human Interface Guidelines: [Alerts](https://developer.apple.com/design/human-interface-guidelines/alerts)
- Apple Human Interface Guidelines: [Buttons](https://developer.apple.com/design/human-interface-guidelines/buttons)
- Apple Archive: [How Menus Work](https://developer.apple.com/library/archive/documentation/Cocoa/Conceptual/MenuList/Articles/HowMenusWork.html)
- Apple Archive: [Managing Pop-Up Buttons and Pull-Down Lists](https://developer.apple.com/library/archive/documentation/Cocoa/Conceptual/MenuList/Articles/ManagingPopUpItems.html)
- Material Design: [Buttons overview](https://m3.material.io/components/buttons/overview)
- Material Design 3: [Layout overview](https://m3.material.io/foundations/layout/layout-overview/overview)
- Material Design 3: [Buttons accessibility](https://m3.material.io/components/buttons/accessibility)
- Apple Human Interface Guidelines: [Layout](https://developer.apple.com/design/human-interface-guidelines/layout)
- Apple Human Interface Guidelines: [Typography](https://developer.apple.com/design/human-interface-guidelines/typography)
- Apple Human Interface Guidelines: [Toolbars](https://developer.apple.com/design/human-interface-guidelines/toolbars)
- Apple Human Interface Guidelines: [Pop-up buttons](https://developer.apple.com/design/human-interface-guidelines/pop-up-buttons)
- Apple Human Interface Guidelines: [Pull-down buttons](https://developer.apple.com/design/human-interface-guidelines/pull-down-buttons)
- Material Design: [Menus](https://m1.material.io/components/menus.html)
- Microsoft Fluent 2: [Start designing](https://fluent2.microsoft.design/get-started/design)
- Microsoft Fluent 2: [Menu usage](https://fluent2.microsoft.design/components/web/react/core/menu/usage)
- Microsoft Fluent 2: [Button usage](https://fluent2.microsoft.design/components/web/react/core/button/usage)
- Atlassian Design System: [Foundations](https://atlassian.design/foundations/)
- Atlassian Design System: [Button](https://atlassian.design/components/button/)
