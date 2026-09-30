# Einfuehrung in Figma und MasterGo

<script setup>
import { relatedArticlesMap } from '@theme/data/relatedArticles'

const relatedArticles = relatedArticlesMap['de-de/stage-2/frontend/figma-mastergo'] ?? []
</script>

::: tip :dart: Kernfrage
**Wie erstellt man von Grund auf Webseitenprototypen mit modernen Designtools?**
:::

---

## 1. Warum sollte man Frontend-Designtools lernen?

Bevor wir beginnen, muessen wir eine Frage klaeren: Warum muss man "Frontend-Designtools" lernen? Man kann doch mit HTML/CSS-Code Seiten aufbauen -- ist es wirklich notwendig, noch eine zusaetzliche Software und Technologie zu lernen?

In Wirklichkeit ist das Betreiben einer Seite und das gute Produktdesign zwei voellig unterschiedliche Konzepte. Code kuemmert sich nur darum, wie etwas im Browser gerendert und auf verschiedenen Geraeten ausgefuehrt wird; Frontend-Designtools loesen das Problem der Informationsverteilung -- wie Frontend-Interaktionen angeordnet werden, wie zwischen verschiedenen Seiten navigiert wird, wie visuelle Prioritaeten verteilt werden. Man muss nur in einem Designtool eine Leinwand erstellen, um Layout, Informationsebenen und Interaktionsmethoden auf einem Bildschirm vergleichen und die geeignetste Praesentationsform bestimmen zu koennen.

Wenn man direkt mit dem Schreiben von Code beginnt oder AI komplette Frontend-Seiten generieren laesst, ist das Benutzererlebnis in der Regel nicht besonders gut. Ein durchdachtes Produkt beruecksichtigt den Komfort der Benutzerinteraktion sowie die Inhaltsverteilung, die verschiedene Seiten vermitteln sollen. Aus der Perspektive des Benutzers wird zuerst das Frontend-Seitenlayout entworfen und dann in Code umgewandelt oder generiert.

Zudem senken Frontend-Designtools aus Sicht der Teamzusammenarbeit die Kooperationskosten zwischen verschiedenen Parteien: Designer, Produktmanager und Entwickler muessen nicht mehr einzeln mentale Bilder oder abstrakte Codebeschreibungen interpretieren. Stattdessen wird eine kooperative Arbeit ermoeglicht, bei der alle um eine sichtbare, kommentierbare und iterierbare Leinwand diskutieren koennen -- mit Versionsverwaltung, Anforderungsaenderungen und Feedback. Darueber hinaus sind moderne Frontend-Designtools laengst keine reinen Zeichenprogramme mehr: Mit einem Klick koennen Teilcodes generiert, Designsysteme und Komponentenbibliotheken verwaltet werden. Die neuen Designtools koennen viel repetitive Handarbeit (Ausrichten, Bemassen, Exportieren, Aendern von Stilen) automatisieren oder in Stapelverarbeitung ausfuehren, was die Entwicklungseffizienz beim Seitendesign enorm steigert.

![](/zh-cn/stage-2/frontend/figma-mastergo/images/image8.webp)

### 1.1 Die Entwicklung der Frontend-Designtools

Im Laufe der Zeit hat sich das, was man als Frontend-Designtool bezeichnet, kontinuierlich weiterentwickelt. Von der Photoshop-Aera der 90er Jahre, die hauptsaechlich auf lokales Bitmap-Editing ausgerichtet war, ueber die Vektorisierung und Komponenten-Workflows, die Sketch um 2010 einleitete, bis hin zu Figma, das ab 2016 die Zusammenarbeit konsequent in die Cloud verlagerte -- Designteams gingen von der Einzelarbeit schrittweise zur Echtzeit-Zusammenarbeit mehrerer Personen ueber. Im Jahr 2025 ist AI tatsaechlich in diese Tools integriert worden: Von "Seitenentwuerfe aus einem Satz generieren" bis hin zu "Designs direkt in ausfuehrbare Frontend-Strukturen umwandeln" -- "Design als Code" und "Mensch-Maschine-Kooperation" werden von Konzepten zu nutzbarer Produktivitaet.

In diesem Abschnitt stellen wir die zwei repraesentativsten modernen Frontend-Designtools vor: Figma und MasterGo. Einerseits decken beide die Kernfaehigkeiten moderner UI/UX ab (Vektor-Editing, Komponentensysteme, Auto-Layout, Code-Uebergabe etc.) und koennen den vollstaendigen Zyklus vom Wireframe ueber High-Fidelity bis zur Entwickleruebergabe unterstuetzen. Andererseits haben beide Tools nach 2025 praktische AI-Funktionen eingefuehrt, die helfen, Designs in tatsaechlich ausfuehrbare Programme umzuwandeln, ohne das Originaldesign zu veraendern.

## 1.2 Die Entstehungsgeschichte

![](/zh-cn/stage-2/frontend/figma-mastergo/images/image9.webp)

In der Zeit, bevor spezielle Frontend-Tools existierten, wurde die visuelle Gestaltung der gesamten Oberflaechen-Designbranche lange Zeit von "Allround"-Designsoftware wie Photoshop uebernommen. Designer erstellten die visuelle Gestaltung ganzer Seiten ueber lokal geschichtete Ebenen und lieferten schliesslich die durchaus voluminoesen .psd-Quelldateien an die Frontend-Entwickler -- und um das Design praezise umzusetzen, mussten die Frontend-Entwickler drei muehsame und entscheidende Aufgaben manuell erledigen:

Erstens das "Zerschneiden": Aus der mehrschichtigen Struktur der .psd-Datei mussten Bottons, Icons, Logos, Hintergrundmodule und andere unabhaengige visuelle Elemente einzeln extrahiert und als PNG, JPG und andere webfaehige Bildformate exportiert werden (da Webseiten die PSD-Ebeneninformationen nicht direkt erkennen koennen und nur auf diese zerteilten Bilder zur Darstellung von Details zurueckgreifen koennen).

![](/zh-cn/stage-2/frontend/figma-mastergo/images/image10.webp)

Zweitens das "Ausmessen": Mit dem im Programm integrierten Messwerkzeug mussten Breite, Hoehe und Abstaende (margin/padding) zwischen verschiedenen Modulen elementweise erfasst werden, um sicherzustellen, dass alle Masse bis auf das Pixel genau stimmten.

![](/zh-cn/stage-2/frontend/figma-mastergo/images/image11.webp)

Drittens das "Bemassen": Aus dem Design mussten die "unsichtbaren, aber notwendigen" impliziten Parameter extrahiert werden -- wie Schriftgroesse, Schriftgewicht, Zeilenabstand, RGB- oder HEX-Farbwerte jedes Farbblocks usw. Dies entsprach dem manuellen "Herauskratzen" derjenigen "Designspezifikationen", die der Designer nicht auf Papier geschrieben hatte.

![](/zh-cn/stage-2/frontend/figma-mastergo/images/image12.webp)

Erst danach begann die eigentliche Frontend-Implementierungsphase. Unabhaengig davon, ob natives HTML/CSS/JS oder Frameworks wie Vue, React verwendet wurden, war der grundsaetzliche Prozess derselbe. Das Frontend nutzte den "Container als zentrales Traegerelement" und baute die Seitenstruktur basierend auf der Hierarchie und Semantik der einzelnen Module im Design neu auf. Ein Container ist hierbei eine Einheit mit klar definierten Layout-Grenzen, die speziell dazu dient, untergeordnete Elemente aufzunehmen und zu organisieren. Er stellt selbst keinen konkreten Inhalt dar, definiert aber ueber Flex, Grid und andere Regeln den Anordnungsbereich fuer die internen Elemente. Die "Strukturbloecke" (wie obere Navigationsleiste, Seitenleiste, Artikellistenbereich, untere Fusszeile und andere sichtbare Funktions- oder Inhaltsbereiche) basieren auf diesen Containern; innerhalb jedes Strukturblocks sind wiederum kleinere Container verschachtelt, die Elemente organisieren -- zum Beispiel besteht ein Artikellisteneintrag aus einem "Listeneintrag-Container", der Innenabstaende und Gesamtlayout steuert und dann Titel, Zusammenfassung, Zeitstempel, Titelbild und weitere Detailelemente umschliesst.

![](/zh-cn/stage-2/frontend/figma-mastergo/images/image13.webp)

In modernen Frontend-Frameworks werden diese "Strukturbloecke (samt zugehoeriger Container und Elemente)" in der Regel als "Komponenten" implementiert. Eine Komponente kann vereinfacht verstanden werden als: eine wiederverwendbare Interface-Einheit mit klaren Grenzen, die Container-Layout und Logik integriert. Sie enthaelt sowohl Container, die Erscheinungsbild und Anordnung steuern (z. B. definiert die "Button-Komponente" Breite, Hoehe und Abrundung ueber einen Container; die "Artikelkarten-Komponente" organisiert die Position von Titel und Titelbild ueber einen Container), als auch Interaktionslogik. Teile, die im Design wiederholt auftauchen und eine einheitliche Form haben (wie einheitlich gestylte Buttons oder mehrfach verwendete Artikelkarten), werden im Code als Komponenten abstrahiert: Sie koennen in verschiedenen Seiten und Szenarien wiederverwendet werden, was doppelte Entwicklung reduziert, und durch die einheitlichen Regeln der internen Container wird sichergestellt, dass Layout und Stil an allen Verwendungsstellen hoechst konsistent sind.

Anschliessend verwendet das Frontend ein Stilsystem, um Visuelles und Layout zu reproduzieren. Die im Zerschneide-Schritt exportierten Ressourcen wie PNG/JPG werden als `<img>`, Hintergrundbilder innerhalb von Komponenten oder Strukturbloecken eingebunden oder gemaess den Empfehlungen des jeweiligen Frameworks als statische Ressourcen importiert. Die im Ausmessen-Schritt ermittelten Werte fuer Breite, Hoehe, Abstaende und Zeilenhoehen werden als `width`, `height`, `margin`, `padding`, `line-height` und andere Stileigenschaften auf die entsprechenden Komponenten oder Strukturbloecke angewendet. Die im Bemassen-Schritt erfassten Farben, Schriften, Schatten, Abrundungen sowie Hover-/Active-Zustaende werden in konkrete Loesungen wie CSS, CSS Modules, CSS-in-JS oder Tailwind umgesetzt -- als `color`, `font-family`, `font-size`, `box-shadow`, `border-radius` sowie Pseudoklassen oder Zustandsklassen. An diesem Punkt liefern Zerschneiden, Ausmessen und Bemassen einen Satz praeziser visueller Parameter, waehrend Komponenten und Strukturbloecke die Code-Organisationseinheiten bilden, die diese Parameter aufnehmen. Beides zusammen ergibt eine wartbare, wiederverwendbare Interface-Implementierung.

![](/zh-cn/stage-2/frontend/figma-mastergo/images/image14.webp)

Das auf lokalen Dateien zentrierte Modell war jedoch naturgemaess ineffizient. Versionen wurden per E-Mail und Cloud-Speicher uebertragen, neue und alte Entwuerfe liessen sich leicht verwechseln, und zwischen Design und Entwicklung herrschte eine grosse Abhaengigkeit von den oben beschriebenen komplexen Interaktionsmethoden -- die Kooperationskosten und Fehlerquoten waren nicht gering.

Mit dem Aufkommen des mobilen Internets stiegen die Anforderungen an Oberflaechenkomplexitaet und Iterationsgeschwindigkeit rasant an, und Photoshops "gross und alles umfassend" wirkte zunehmend schwerfaellig. In dieser Phase erschien Sketch. Sketch konzentrierte sich auf das UI-Design selbst und entfernte den groessten Teil der mit der visuellen Nachbearbeitung verbundenen Buerde; mit Symbols wurden haeufig wiederverwendete Elemente wie Buttons, Navigation und Eingabefelder als Komponenten strukturiert, wobei eine Aenderung global synchronisiert wurde; in Kombination mit Tools wie Zeplin wurden Bemassungen und Stil-Fragmente automatisch generiert. Sketch brachte das "Komponenten-Denken" in den Design-Workflow. Es blieb jedoch ein Desktop-basiertes lokales Datei-Programm; Echtzeit-Zusammenarbeit erforderte Umwege ueber Cloud-Speicher, Drittanbieter-Plugins oder Versionsverwaltungstools und loeste das Problem "mehrere Personen aendern gleichzeitig denselben Entwurf" nicht grundlegend.

![](/zh-cn/stage-2/frontend/figma-mastergo/images/image15.webp)

Was die Spielregeln wirklich veraenderte, war Figma. Seit 2016 integrierte es UI-Design, Prototyping und Kommentare in den Browser und unterstuetzte eine Reihe moderner Funktionen: mehrere Echtzeit-Cursor, Online-Kommentare, Versionszeitlinien, Freigabelinks usw. -- was heute selbstverstaendlich erscheint, war damals eine direkte Herausforderung des Photoshop/Sketch-Modells.

![](/zh-cn/stage-2/frontend/figma-mastergo/images/image16.webp)

Damit war das Oberflaechendesign nicht mehr auf Einzelcomputer verstreute Dateien, sondern auf eine einzige Online-Leinwand konzentriert, die sich in Echtzeit aktualisierte. Rund um diese Leinwand lassen sich noch weitergehende Gedanken anstellen -- die Grenze zwischen Design und Frontend-Code mit Automatisierung oder AI zu verwischen.

Zunaechst konnten wir nur auf verschiedene Plattform-Plugins zurueckgreifen, um Komponenten- und Stilinformationen aus Designs halbautomatisch als Code-Snippets (wie React/Vue-Komponentengerueste, CSS-Variablen etc.) zu exportieren. Der Kern bestand dabei in einer strukturierten Informationsextraktion ueber Plugins. Spaeter, mit der Weiterentwicklung der Plattformfaehigkeiten, begannen die meisten Designplattformen, die Grossmodell-MCP-Funktionalitaet (Model Context Protocol, Modellkontext-Protokoll) zu unterstuetzen: Dieses Protokoll bietet einen Standardmechanismus, der es Grossmodellen ermoeglicht, sicher und kontrolliert auf Designdateien, Plugin-Schnittstellen und Projektmetadaten zuzugreifen und so Designs noch bequemer als Code zu exportieren.

Darueber hinaus trat die Frontend-Code-Automatisierung auf Basis von Plugins und MCP in die Phase ein, in der nativ die Ableitung von Code-Strukturen direkt aus dem Design unterstuetzt wurde. Wir koennen im Designtool mit einem Klick Frontend-Projektgerueste, Komponentenhierarchien, Stilsysteme und entsprechende Code-Ergebnisse generieren. Dadurch werden Designer und Frontend-Entwickler von der muehsamen manuellen Uebertragung von Designdetails befreit und koennen mehr Energie in die Optimierung des Benutzererlebnisses und die Aktualisierung und Iteration von Funktionsversionen investieren.

---

## 2. Figma Einfuehrung

Nun kommen wir von den abstrakten Konzepten zur praktischen Bedienung. Da die Zeit begrenzt ist, werden wir nur die grundlegende Bedienlogik von Figma lernen, damit auch jemand, der noch nie ein Designtool verwendet hat, die Uebungen problemlos mitmachen kann. Wenn du eine vollstaendige Einarbeitung in alle Figma-Funktionen moechtest, empfehlen wir dir die ausfuehrlichen offiziellen Tutorials von Figma: https://help.figma.com/hc/en-us/sections/30880632542743-Figma-Design-for-beginners

Oder du folgst diesem Tutorial, um aehnlich wie bei einem persoenlichen Portfolio eine einfache Webseite schnell aufzubauen: https://help.figma.com/hc/en-us/sections/35895585621655-Figma-Sites-collectio

![](/zh-cn/stage-2/frontend/figma-mastergo/images/image17.webp)

Links befindet sich der Einstieg fuer Projekterstellung und Ressourcenverwaltung, die wenigen Buttons oben rechts sind die haeufigen Figma-Funktionen. Dabei dient Make dazu, mit einem einzigen Satz von AI zuerst einen groben Interface- oder Strukturentwurf generieren zu lassen; Design ist der Hauptarbeitsbereich zum Zeichnen von Webseiten/App-Oberflaechen, zum Aufbau von Komponenten und zum Erstellen von Prototypen; FigJam ist wie ein Team-Whiteboard zum Anbringen von Klebezetteln, zum Zeichnen von Flussdiagrammen und fuer vorlaeufige Diskussionen; Buzz ist ein Tool zur skalierten Erstellung von Markenassets fuer die massenhafte Generierung von Inhalten zur Wahrung der Markenkonsistenz; und Site dient dazu, diese Designs zu einer tatsaechlich zugaenglichen Webseite oder Dokumentationsseite zusammenzufassen und oeffentlich zu praesentieren.

Auf den ersten Blick scheint Figma sehr viele Funktionen zu haben und schwer zugaeanglich zu sein. Aber im Grunde sind solche funktionalen Tools eine Frage der Uebung -- man muss keine Angst haben, anfangs Fehler zu machen, und man muss auch nicht alles auf Anhieb richtig machen. Einfach anfangen, herumzuspielen; mit der Zeit wird man schnell sicher im Umgang.

In diesem Tutorial werden wir die Design-Funktion kurz erklaeren, um einen schnellen Einstieg zu ermoeglichen.

### 2.1 Neue Design-Datei erstellen

Waehle auf der Startseite oder oben rechts den Eintrag **Design**, um eine neue Datei zu erstellen. Du gelangst auf eine leere Design-Leinwand.
Diese Oberflaeche ist grob in drei Bereiche unterteilt: Links befinden sich Seiten und Ebenen zur Anzeige und Bearbeitung der Seiten- und Element-Hierarchie; in der Mitte liegt die Leinwand zur Ansicht des aktuellen Effekts; rechts befinden sich Eigenschaften und Stile zur Aenderung von Form, Farbe und Stil; unten verlaeuft eine Werkzeugleiste zum Wechseln zwischen Werkzeugen, darunter Auswahl, Formen zeichnen, Text eingeben, Kommentare und Plugins. Nach der Auswahl eines Werkzeugs kann die Esc-Taste gedrueckt werden, um zum Standard-Mauswerkzeug zurueckzukehren.

![](/zh-cn/stage-2/frontend/figma-mastergo/images/image18.png)

### 2.2 Deinen ersten Frame (Zeichentafel) erstellen

Bevor du Elemente platzierst, musst du zunaechst eine klare Begrenzung fuer die Seite festlegen. Diese Begrenzung wird durch einen Frame definiert. Du kannst das Frame-Werkzeug in der unteren Werkzeugleiste auswaehlen oder einfach die Taste F auf der Tastatur druecken und dann einen rechteckigen Bereich auf der Leinwand ziehen.

1. Verwende das Frame-Werkzeug in der unteren Werkzeugleiste oder druecke direkt `F` auf der Tastatur.
2. Zeichne einen rechteckigen Bereich auf der Leinwand. Aendere in der rechten Eigenschaftsleiste die Breite auf z. B. `1440` und die Hoehe auf `900`.
3. Benenne diesen Frame in der linken Ebenenleiste um, z. B. in `My First Page` oder deinen Projektnamen.

Dieser Frame ist der Seitencontainer fuer eine Bildschirmansicht. Alle nachfolgenden Inhalte wie Ueberschriften, Text, Buttons und Bilder sollten innerhalb dieses Frames platziert werden und nicht irgendwo verstreut auf der Leinwand liegen. Die Organisation des Inhalts innerhalb von Frame-Grenzen hilft dabei, die Struktur bei der nachfolgenden Einstellung von Scroll-Verhalten, der Anpassung an verschiedene Geraetegroessen, dem Export von Ansichten und der Prototyp-Erstellung kontrollierbar zu halten.

![](/zh-cn/stage-2/frontend/figma-mastergo/images/image19.png)

### 2.3 Text und einfache Elemente im Frame platzieren

Mit einem Container ausgestattet, lernen wir nun, wie man die grundlegendsten Komponenten platziert, wie z. B.: Ueberschrift, Unterueberschrift, Button und Platzhalter-Bildblock.

1. Waehle das Text-Werkzeug (`T` in der unteren Werkzeugleiste), klicke in den Frame und gib den Seitentitel ein, z. B.: `My Portfolio`.
   Aendere in der rechten Eigenschaftsleiste die Schriftgroesse auf einen groesseren Wert (z. B. 96) und das Schriftgewicht auf fetter.
2. Unter der Ueberschrift verwende erneut das Text-Werkzeug, um eine kurze Beschreibung einzugeben, z. B. ein bis zwei Saetze darueber, was diese Seite darstellen soll.
   Die Schriftgroesse kann etwas kleiner sein, der Zeilenabstand etwas groesser, damit der Text nicht zu gedraengt wirkt.
3. Zeichne einen Button-Entwurf:
   Verwende das Rechteck-Werkzeug, um unter der Ueberschrift ein Rechteck von ca. `200 x 48` zu zeichnen. Gib ihm rechts eine auffaellige Fuellfarbe und etwas Abrundung.
   ![](/zh-cn/stage-2/frontend/figma-mastergo/images/image20.png)
4. Verwende dann das Text-Werkzeug, um den Button-Text ueber dem Rechteck einzugeben, z. B. `Get Started`. Waehle das Rechteck und den Text gemeinsam aus und nutze die Ausrichtungswerkzeuge oben, um den Text horizontal und vertikal zu zentrieren.
5. Neben dem Button oder darunter zeichne ein groesseres hellgraues Rechteck als "Bild-Platzhalter", das spaeter fuer ein Präsentationsbild verwendet werden kann.

Bis hierhin hast du bereits einen sehr einfachen, aber strukturell vollstaendigen "Startseiten-Entwurf": eine Ueberschrift, ein Textabsatz, ein Button und ein Haupt-Darstellungsbereich.

![](/zh-cn/stage-2/frontend/figma-mastergo/images/image21.png)

### 2.4 Auto Layout zur Integration von Elementen nutzen

Wenn alle Elemente nur per Drag-and-Drop platziert werden, wird die Seite schnell unuebersichtlich. Ein sehr wichtiges Konzept in Figma ist **Auto Layout**, das eine Gruppe von Elementen in einen Container mit Regeln verwandelt.

![](/zh-cn/stage-2/frontend/figma-mastergo/images/image22.png)

Du kannst "Hauptueberschrift + Unterueberschrift + Button" markieren und in der rechten Eigenschaftsleiste auf **Add Auto layout** klicken.

Die drei Elemente werden dann in einem Container zusammengefasst. Du kannst die Parameter rechts anpassen, und die Elementanordnung innerhalb des Containers passt sich automatisch an:

- Ob die Elemente vertikal oder horizontal angeordnet sind.
- Welcher Abstand zwischen den Elementen besteht.
- Wie gross der Innenabstand (padding) dieses Blocks zum Containerrand ist.

![](/zh-cn/stage-2/frontend/figma-mastergo/images/image23.png)

Ebenso kann Auto Layout innerhalb des Buttons verwendet werden, um folgenden Effekt zu erzielen: Wenn der Text geaendert wird, passt sich die Button-Laenge automatisch an.

Waehle zunaechst das Button-Hintergrundrechteck und den Button-Text aus und fuege Auto Layout hinzu, um diese beiden Elemente in einen "Button-Container" zu verwandeln. Waehle dann diesen Button-Container aus und setze Breite und Hoehe beide auf **Hug contents**. Dadurch bleibt der Text immer mittig im Button, und der Button passt seine Breite automatisch an, ob der Text etwas laenger oder kuerzer ist.

![](/zh-cn/stage-2/frontend/figma-mastergo/images/image24.png)

### 2.5 Den Button als wiederverwendbare Komponente umwandeln

Nun lernen wir ein neues Konzept: Komponenten. Eine Komponente ist ein Element, das wiederholt verwendet werden kann. Wenn du vorhersiehst, dass ein Element wie ein Button spaeter noch oefter benoetigt wird, kannst du es als Komponente erstellen. Wir gehen von dem Button aus, der bereits mit Auto Layout versehen wurde:

1. Waehle den gesamten Button-Container aus.
2. Klicke mit der rechten Maustaste und waehle Create component (Komponente erstellen).
   ![](/zh-cn/stage-2/frontend/figma-mastergo/images/image25.png)

Somit wird dieser Button aus einer Gruppe gewoehnlicher Ebenen zu einem Komponenten-Master. Wenn du spaeter auf anderen Seiten oder in anderen Frames einen Button im gleichen Stil benoetigst, kannst du ihn einfach aus dem linksseitigen Assets-Panel herausziehen.

![](/zh-cn/stage-2/frontend/figma-mastergo/images/image26.png)

Alle verwendeten Buttons sind synchronisierte Kopien dieses Masters. Wenn du Farbe, Abrundung oder Abstaende des Masters aenderst, werden alle Instanzen automatisch synchron aktualisiert.

![](/zh-cn/stage-2/frontend/figma-mastergo/images/image27.webp)

Damit hast du die grundlegende Verwendung von Figma bereits verstanden. Du musst nicht von Anfang an alle Funktionen beherrschen -- erzeuge einfach die erste einfache Seite nach dieser Anleitung, lerne diese wenigen Kernoperationen und erkunde dann schrittweise weitere Faehigkeiten in den offiziellen Tutorials. Mit zunehmender Verwendung wirst du unweigerlich sicherer im Umgang.

---

## 3. MasterGo Einfuehrung

Nachdem wir den grundlegenden Figma-Workflow verstanden haben, wenden wir uns MasterGo zu. Du kannst MasterGo vereinfacht als eine chinesische Version von Figma betrachten, die sich jedoch in einigen Funktionen unterscheidet. Insgesamt folgt es einem aehnlichen Interface-Layout und einer aehnlichen Bedienphilosophie wie Figma: Es gibt ebenfalls eine Leinwand, einen Ebenenbaum und ein Eigenschafts-Panel; Komponenten, Stile, Auto-Layout und Zusammenarbeit mehrerer Personen werden ebenfalls unterstuetzt. Detailliertere Informationen findest du in den offiziellen MasterGo-Tutorials: https://mastergo.com/tutorials/12?%E5%85%A8%E7%A8%8B%E9%AB%98%E8%83%BD%EF%BC%8CMasterGo%20%E6%9C%80%E5%AE%8C%E6%95%B4%E5%AE%9E%E7%94%A8%E6%95%99%E7%A8%8B%EF%BC%8C%E8%AE%A9%E4%BD%A0%E4%BB%8E%E9%9B%B6%E5%88%B0%E7%B2%BE%E9%80%9A%EF%BC%81

### 3.1 Neue Designdatei erstellen

1. **MasterGo-Dashboard oeffnen**
   1. Oeffne die MasterGo-Website und melde dich an.
   2. Nach dem Login siehst du einen Startbereich mit "Dateiliste / Projektliste", in dem du deine Designdateien verwalten kannst.
      ![](/zh-cn/stage-2/frontend/figma-mastergo/images/image28.webp)

2. **Neue Datei erstellen**
   1. Klicke oben rechts auf die Schaltflaeche "+ Designdatei" oder waehle den Import von Figma-Dateien.
   2. Nach dem Klick gelangst du auf eine leere Leinwand -- das ist der MasterGo-Design-Arbeitsbereich.

3. **Grundlegende Interface-Bereiche kennenlernen**
   Wenn du bereits Figma beherrschst, ist die Bedienung von MasterGo sehr aehnlich. Die Hauptbereiche sind:

   ![](/zh-cn/stage-2/frontend/figma-mastergo/images/image29.png)
   1. Obere Werkzeugleiste: Befindet sich ganz oben auf der Leinwand. Links sind Dateispeicherort und Dateiname, in der Mitte befindet sich eine Reihe haeufig verwendeter Werkzeugbuttons (Auswahl, Bereich/Zeichentafel, Formen, Text, Annotationen, Kommentare, Plugin-Auswahl und AI-Werkzeuge etc.), rechts befinden sich die aktuell angemeldeten Mitglieder, der Freigabe-Einstieg sowie Steuerungen fuer Leinwand-Zoom und Vorschau.
   2. Linkes Panel: Ist hauptsaechlich in Ebenen und Ressourcen unterteilt. Wenn du dich auf dem Ebenen-Tab befindest, siehst du die Seitenliste sowie die Struktur und Hierarchie aller Ebenen auf dieser Seite.
   3. Mittlerer Leinwandbereich: Der Arbeitsbereich fuer das eigentliche Zeichnen und Layouten, in dem alle Frames, Komponenten und Grafiken dargestellt werden.
   4. Rechtes Eigenschafts-Panel: Dient zum Anzeigen und Bearbeiten der Eigenschaften des ausgewaehlten Objekts, wie Groesse, Position, Ausrichtung, Hintergrundfuellung, Kontur, Abrundung etc. Wenn kein Objekt ausgewaehlt ist, werden Leinwand-Einstellungen wie Hintergrundfarbe, Tags und Exportoptionen angezeigt.

### 3.2 Deinen ersten Frame erstellen

Bevor du Inhalte platzierst, benoetigen wir einen Seitencontainer, der die Begrenzung und Groesse der Oberflaeche festlegt. Dieser Container wird in MasterGo normalerweise als Frame bezeichnet.

**Schritte:**

1. **Frame-Werkzeug auswaehlen**
   1. Finde das Frame/Zeichentafel-Werkzeug in der Werkzeugleiste. Nach dem Klick kannst du Inhalte direkt mit voreingestellten Parametern auf der Zeichentafel erstellen.
   2. Oder verwende den Tastaturkurzbefehl (in der Regel `F`; bei Abweichungen orientiere dich an der tatsaechlichen Oberflaeche).
2. **Einen rechteckigen Bereich auf der Leinwand ziehen**
   1. Nach dem Ziehen siehst du einen Bereich mit einem Auswahlrahmen.
   2. Im rechten Eigenschafts-Panel siehst du die Breite und Hoehe dieses Frames.
   3. Aendere die Breite auf z. B. `1440` und die Hoehe auf `900` (eine der haeufigen Groessen fuer eine Bildschirmseite).
3. **Frame umbenennen**
   1. Finde diesen Frame im linken Ebenen-Panel.
   2. Doppelklicke auf den Namen und aendere ihn in deinen Projektnamen, z. B.: `My First Page` oder einen selbstgewaehlten Seitennamen.

![](/zh-cn/stage-2/frontend/figma-mastergo/images/image30.png)

### 3.3 Zeichentafel-Inhalte erstellen

Mit dem Container ausgestattet koennen wir auf aehnliche Weise wie bereits bei Figma erlernt ganz einfach eine vergleichbare Darstellungsseite erhalten. (Du kannst versuchen, Text-Elemente aus der Figma-Zeichentafel zu kopieren; der direkte Import ueber Textkomponenten wird unterstuetzt.)

![](/zh-cn/stage-2/frontend/figma-mastergo/images/image31.png)

Es ist erwähnenswert, dass das Verhalten der Auto-Layout-Funktion leicht abweicht. Wenn du in MasterGo aehnlich wie in Figma erreichen moechtest, dass sich die Button-Laenge mit der Textlaenge aendert, musst du zunaechst auf Basis des entsprechenden Rechteck-Elements einen Container oder eine Komponente erstellen, wie in der Abbildung gezeigt:

![](/zh-cn/stage-2/frontend/figma-mastergo/images/image32.png)

Nach der erfolgreichen Erstellung des Containers werden das Button-Rechteck und der Text in den Container auf gleicher Ebene eingefuegt. Aktiviere dann rechts die Auto-Layout-Schaltflaeche, um die automatische Funktion zu aktivieren. Damit wird die Funktion erfolgreich umgesetzt, bei der sich die Button-Breite automatisch an die Textlaenge anpasst.

![](/zh-cn/stage-2/frontend/figma-mastergo/images/image33.png)

![](/zh-cn/stage-2/frontend/figma-mastergo/images/image34.png)

### 3.4 AI-Generierung von Seiten

![](/zh-cn/stage-2/frontend/figma-mastergo/images/image35.png)

In MasterGo ist eine besonders interessante Funktion die AI-generierte Seite. Du kannst mit einem einzigen Satz oder unter Beifuegung eines Referenzbildes entsprechende bearbeitbare MasterGo-Komponenten generieren und direkt verwendbaren Code erhalten. Du kannst deine Anforderungen auf Chinesisch oder Englisch eingeben, und die Seite generiert basierend auf den Anforderungen ein strukturell klares Seiten-Layout-Dokument. Das Ergebnis sieht wie folgt aus:

![](/zh-cn/stage-2/frontend/figma-mastergo/images/image36.png)

![](/zh-cn/stage-2/frontend/figma-mastergo/images/image37.webp)

Nach Abschluss der Generierung des Designdokuments klicke auf "Generierung starten", warte kurz und du erhaelst den tatsaechlichen Webseiten-Effekt:

![](/zh-cn/stage-2/frontend/figma-mastergo/images/image38.webp)

Jetzt hast du zwei Moeglichkeiten: Entweder klickst du auf den blauen Button, um das generierte Ergebnis direkt in die Leinwand einzufuegen, oder du klickst auf die Code-Vorschau-Funktion, um den vollstaendigen Code der aktuellen Seite direkt abzurufen. Die konkrete Bedienungsoberflaeche sieht wie folgt aus:

![](/zh-cn/stage-2/frontend/figma-mastergo/images/image39.webp)

![](/zh-cn/stage-2/frontend/figma-mastergo/images/image40.webp)

Nach dem Einfuegen des Ergebnisses in die Leinwand kannst du das Gesamtlayout und die Elementdetails (wie Schriftart, Farbe, Abstaende etc.) noch feiner anpassen, bis das Endergebnis deinen Erwartungen voll entspricht.

![](/zh-cn/stage-2/frontend/figma-mastergo/images/image41.webp)

---

## 4. Naechster Schritt: Vom Prototyp zum Code

In den vorherigen Abschnitten haben wir die Grundoperationen von Figma und MasterGo kennengelernt und koennen strukturell vollstaendige Oberflaechenprototypen erstellen. Der naechste entscheidende Schritt lautet: **Wie wandelt man diese Designentwuerfe in tatsaechlich im Browser ausfuehrbaren Frontend-Code um?**

::: tip :books: Weiterfuehrendes Tutorial
Eine detaillierte Methodenbeschreibung findest du unter [Vom Design-Prototyp zum Projektcode](../design-to-code/), wo du Folgendes lernen wirst:

- **Multimodale AI-Direktkonvertierung**: Design-Screenshots an AI senden und direkt HTML/React-Code generieren
- **Figma Make**: Das offizielle Figma-AI-Tool fuer hochpraezise Design-Umsetzung und Code-Export
- **MasterGo AI**: Mit einem Klick bearbeitbare Seiten generieren und Code abrufen

Jede dieser Methoden hat ihre Staerken und Schwaechen und eignet sich fuer verschiedene Szenarien. Es wird empfohlen, den geeigneten Workflow basierend auf den Projektanforderungen auszuwaehlen.
:::

---

## 5. Zusammenfassung

Durch dieses Kapitel hast du Folgendes gelernt:

1. **Den Wert von Frontend-Designtools**: Verstanden, warum Designtools notwendig sind und wie sie Informationsverteilungs- und Teamzusammenarbeitsprobleme loesen.

2. **Grundlegende Figma-Operationen**:
   - Design-Dateien und Frame-Zeichentafeln erstellen
   - Grundlegende Elemente wie Text und Formen hinzufuegen
   - Auto Layout fuer adaptive Layouts verwenden
   - Ein wiederverwendbares Komponentensystem erstellen

3. **Grundlegende MasterGo-Operationen**:
   - Vertrautheit mit dem Figma-aehnlichen Interface-Layout
   - Frames und grundlegende Zeichentafel-Inhalte erstellen
   - Die AI-Seitengenerierungsfunktion zur schnellen Prototygenerstellung nutzen

::: tip :bulb: Naechste Schritte
Nun, da du die grundlegende Verwendung von Frontend-Designtools beherrschst, kannst du Folgendes versuchen:
- Ein persoenliches Portfolio-Seite fuer dich selbst entwerfen
- Interface-Prototypen fuer kommende Projekte gestalten
- [Vom Design-Prototyp zum Projektcode](../design-to-code/) lernen, um Designentwuerfe in ausfuehrbaren Code umzuwandeln

Wenn du das Projekt [Gemeinsam Hogwarts-Portraets erstellen](../hogwarts-portraits/) bearbeitest, kannst du zunaechst den Interface-Prototyp entwerfen, dann den Code exportieren und mit der AI-Dialogfunktion kombinieren.
:::

<RelatedArticlesSection
  title="Verwandte Artikel"
  description="Wir empfehlen, weiterhin UI-Design zu vertiefen und die Praxis des Designs-zu-Code zu erlernen."
  :items="relatedArticles"
/>
