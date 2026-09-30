# Vom Design-Prototyp zum Projektcode

::: tip :dart: Kernfrage
**Wie wandelt man Prototypen aus Designtools in tatsaechlich im Browser ausfuehrbaren Frontend-Code um?**
:::

---

## 1. Drei Pfade vom Prototyp zum Code

Nachdem man mit modernen Frontend-Designtools wie Figma oder MasterGo das Interface-Design abgeschlossen hat, stellt sich naturgemaess eine praktische Frage: Wie wandelt man diese strukturell vollstaendigen Designentwuerfe in tatsaechlich im Browser ausfuehrbaren Frontend-Code um?

Im Allgemeinen gibt es drei typische Pfade vom Prototyp zum Code:

| Pfad | Methode | Merkmale | Anwendungsbereich |
|------|----------|-----------|-------------------|
| **Pfad 1** | Basierend auf Bildern, multimodale Grossmodelle verwenden, um Code direkt zu rekonstruieren | Flexibel, kein spezielles Tool erforderlich | Schnelle Prototyp-Validierung, einfache Seiten |
| **Pfad 2** | Durch plattformeigene Faehigkeiten oder Plugins verwendbaren Code exportieren | Hohe Genauigkeit, gute Editierbarkeit | Figma/MasterGo-Nutzer |
| **Pfad 3** | Plattform kombiniert mit MCP-Faehigkeiten, um verwendbaren Code zu exportieren | Hoher Automatisierungsgrad, anpassbar | Workflows, die tiefe Integration erfordern |

Dieser Artikel stellt die spezifischen Implementierungsmethoden dieser drei Pfade im Detail vor und hilft dir, den geeignetsten Workflow basierend auf deinen Projektanforderungen auszuwaehlen.

::: tip :books: Vorkenntnisse
Bevor du mit diesem Abschnitt beginnst, empfehlen wir dir, das Tutorial [Einfuehrung in Figma und MasterGo](../figma-mastergo/) durchzuarbeiten, um die Grundlagen der Frontend-Designtools zu beherrschen.
:::

---

## 2. Pfad 1: Multimodale AI direkte Code-Rekonstruktion

Grossmodelle mit visuellen Faehigkeiten sind von Natur aus in der Lage, Bilder in Code umzuwandeln. Wir muessen nur den Screenshot des Designentwurfs direkt in den Dialog importieren und das Grossmodell dann den vollstaendigen Ergebniscode generieren lassen.

### 2.1 Arbeitsablauf

1. **Design-Screenshot erstellen**
   - In Figma oder MasterGo die entworfene Seite als PNG oder JPG exportieren
   - Sicherstellen, dass der Screenshot das vollstaendige Seitenlayout enthaelt

2. **Multimodales AI-Modell auswaehlen**
   - Modelle wie Gemini, Qwen, Claude etc. verwenden, die Bildeingabe unterstuetzen
   - Hier wird als Beispiel Gemini verwendet

3. **Prompt schreiben**
   ```
   Bitte generiere den entsprechenden HTML/CSS-Code basierend auf diesem Design.
   Anforderungen:
   - Modernes CSS-Layout (Flexbox/Grid) verwenden
   - Responsives Design, Anpassung an verschiedene Bildschirmgroessen
   - Alle sichtbaren UI-Elemente einbeziehen
   - Farben und Schriftgroessen moeglichst originalgetreu wiedergeben
   ```

![](/zh-cn/stage-2/frontend/design-to-code/images/image42.png)

4. **Code abrufen und speichern**
   - Das Modell um vollstaendigen HTML-Code bitten
   - Als einzelne `.html`-Datei speichern, fuer lokale Tests
   - Spaeter in der lokalen IDE in React oder andere Frameworks konvertieren

### 2.2 Haeufige Probleme und Loesungen

Seitengenerierung ist keine einfache Aufgabe. Im konkreten Prozess koennen viele Probleme auftreten:

| Problem | Loesung |
|----------|----------|
| Ungleichmaessige Interface-Anordnung | AI das spezifische Layout-Problem beschreiben, Anpassung von CSS margin/padding fordern |
| Interface wird nicht vollstaendig angezeigt | Pruefen, ob der korrekte viewport gesetzt ist, responsive Breakpoints hinzufuegen |
| Farbgenauigkeit unzureichend | Farbwaehler-Tool verwenden, um exakte Farbwerte aus dem Design zu ermitteln und AI zur Verfuegung zu stellen |
| Schriftarten stimmen nicht ueberein | Spezifischen Schriftnamen angeben oder Google Fonts als Alternative fordern |

::: tip :bulb: Tipp
Es wird empfohlen, zunaechst HTML-Code zu generieren und nach dem Erhalt in der lokalen IDE in das React-Framework zu konvertieren. So erhaeltst du mehrere unabhaengige HTML-Dateien, die einheitlich in das Framework konvertiert werden koennen.
:::

### 2.3 MasterGo AI Seitengenerierung

MasterGo bietet ebenfalls eine leistungsstarke AI-Seitengenerierungsfunktion, die basierend auf Referenzbildern direkt verwendbaren Webcode generieren kann.

#### AI-Funktionseinstieg finden

In der MasterGo-Editor-Oberflaeche kannst du den AI-Tool-Button oben in der Werkzeugleiste finden:

![](/zh-cn/stage-2/frontend/design-to-code/images/image47.png)

#### Generierungsablauf

1. **Referenzbild hochladen**
   - Dasselbe Verfahren wie bei der multimodalen AI verwenden, um Design-Referenzbilder hochzuladen
   - Textbeschreibung der Anforderungen hinzufuegen

2. **Generierungsergebnis anzeigen**

![](/zh-cn/stage-2/frontend/design-to-code/images/image48.webp)

![](/zh-cn/stage-2/frontend/design-to-code/images/image49.webp)

3. **Code abrufen**
   - Auf den blauen Button "Auf Leinwand einfuegen" klicken, um die generierte Webseite direkt zu bearbeiten
   - Oder rechts auf den "Code"-Button klicken, um den Code-Inhalt lokal zu kopieren

![](/zh-cn/stage-2/frontend/design-to-code/images/image50.png)

---

## 3. Pfad 2: Plattformeigene Faehigkeiten oder Plugins zum Code-Export

### 3.1 Figma Make Code generieren

Figma Make ist ein offizielles AI-Design-Tool von Figma, das basierend auf Benutzereingaben oder Referenzbildern Webseiten-Prototyp-UI-Interfaces hochpraezise rekonstruieren kann.

#### Funktionsmerkmale

- **Hohe Praezision**: Bessere Ergebnisse als bei nativer AI-Code-Generierung
- **Editierbarkeit**: Generierungsergebnisse koennen in bearbeitbare Figma-Design-Dateien konvertiert werden
- **GitHub-Integration**: Direkte Synchronisierung des Codes mit GitHub wird unterstuetzt

::: tip :key: Berechtigungshinweis
Die volle Funktionalitaet von Figma Make erfordert Pro-Benutzerrechte. Studenten koennen durch Bildungszertifizierung kostenlos Pro-Rechte erhalten.
:::

#### Arbeitsschritte

1. **Figma Make oeffnen**
   - Auf der Figma-Startseite auf den Make-Button klicken
   - Oder [Figma Make](https://www.figma.com/make) aufrufen

2. **Referenzbild hochladen**
   - Das Design, das du rekonstruieren moechtest, in den Dialog hochladen
   - Prompt zur Beschreibung der Anforderungen hinzufuegen

![](/zh-cn/stage-2/frontend/design-to-code/images/image43.webp)

3. **Generierungsergebnis anzeigen**
   - Nach kurzer Wartezeit wird das Rendering-Ergebnis angezeigt
   - Auf den Abspiel-Button oben rechts fuer Vollbild-Vorschau klicken

![](/zh-cn/stage-2/frontend/design-to-code/images/image44.webp)

4. **Detailanpassungen**
   - Auf das Editor-Icon oben rechts klicken (Maus- und Lineal-Icon)
   - Zurueck zur vertrauten Figma-Editor-Oberflaeche fuer detaillierte Anpassungen

![](/zh-cn/stage-2/frontend/design-to-code/images/image45.webp)

5. **Code exportieren**
   - Nach zufrieden stellenden Anpassungen den Code-Export auswaehlen
   - Kann direkt mit GitHub verbunden werden, um Code zu speichern

![](/zh-cn/stage-2/frontend/design-to-code/images/image46.png)

### 3.2 Plugin-Code-Export

Zusaetzlich zu den nativen AI-Funktionen der Plattform unterstuetzen sowohl Figma als auch MasterGo den Code-Export ueber Plugins:

**Haeufige Figma-Plugins:**
- **Figma to Code**: Designentwuerfe in React-, Vue-, HTML- und anderen Code konvertieren
- **Anima**: High-Fidelity-Code-Generierung, unterstuetzt Interaktionseffekte
- **Locofy**: AI-gesteuertes Design-zu-Code-Tool

**Verwendungsschritte:**
1. In Figma das Plugin-Panel (Plugins) oeffnen
2. Das gewuenschte Code-Export-Plugin suchen und installieren
3. Das zu exportierende Design-Element auswaehlen
4. Das Plugin ausfuehren, das Zielframework und das Codeformat waehlen
5. Den generierten Code kopieren oder herunterladen

---

## 4. Pfad 3: Plattform kombiniert mit MCP-Faehigkeiten zum Code-Export

### 4.1 Was ist MCP?

MCP (Model Context Protocol, Modellkontext-Protokoll) ist ein offener Standard, der es AI-Modellen ermoeglicht, sicher und kontrolliert auf externe Tools und Datenquellen zuzugreifen. Im Kontext von Frontend-Designtools ermoeglicht MCP Grossmodellen den direkten Zugriff auf die Struktur, Stile und Komponenteninformationen von Designdateien, um so praeziseren Code zu generieren.

### 4.2 Funktionsweise von MCP

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   AI-Modell   │ ←→  │  MCP-Server  │ ←→  │  Designtool   │
│  (Claude etc.)│     │ (Protokoll-  │     │(Figma/MasterGo)│
│               │     │  anpassung)  │     │               │
└─────────────┘     └─────────────┘     └─────────────┘
```

**Arbeitsablauf:**
1. Das AI-Modell sendet ueber das MCP-Protokoll eine Anfrage an das Designtool
2. Das Designtool gibt strukturierte Designdaten zurueck (Ebenen, Stile, Komponenten etc.)
3. Das AI-Modell versteht die Designstruktur und generiert den entsprechenden Code
4. Der Code kann direkt exportiert oder in die Entwicklungsumgebung synchronisiert werden

### 4.3 Figma + MCP in der Praxis

#### Umgebungsvorbereitung

1. **MCP-Server installieren**
   ```bash
   # Figma MCP-Server mit npx installieren
   npx figma-mcp-server
   ```

2. **Claude Desktop oder ein anderes MCP-unterstuetztes AI-Tool konfigurieren**
   ```json
   {
     "mcpServers": {
       "figma": {
         "command": "npx",
         "args": ["figma-mcp-server"],
         "env": {
           "FIGMA_ACCESS_TOKEN": "your-figma-token"
         }
       }
     }
   }
   ```

3. **Figma Access Token abrufen**
   - Bei Figma anmelden -> Settings -> Personal Access Tokens
   - Neuen Token generieren und speichern

#### Verwendung

1. **MCP-Verbindung im AI-Tool aktivieren**
   - Claude Code oder eine andere MCP-unterstuetzte IDE oeffnen
   - Sicherstellen, dass der MCP-Server verbunden ist

2. **Designdatei-Link bereitstellen**
   ```
   Nutzer: Bitte hilf mir, dieses Figma-Design in React-Code umzuwandeln
   Link: https://www.figma.com/file/xxxxx
   
   AI: Ich habe ueber MCP eine Verbindung zu Figma hergestellt und lese die Designdatei-Struktur...
   ```

3. **AI analysiert automatisch und generiert Code**
   - Der MCP-Server ruft den Ebenenbaum der Designdatei ab
   - AI versteht die Komponentenstruktur und die Stileigenschaften
   - Generiert React/Vue-Komponenten mit korrekter Benennung und Struktur

4. **Iterative Optimierung**
   ```
   Nutzer: Bitte extrahiere die Button-Komponente als eigenstaendige wiederverwendbare Komponente
   
   AI: Gerne. Ich habe ueber MCP die Button-Komponente im Designsystem identifiziert
       und generiere gerade eine React-Komponente mit Props-Interface...
   ```

### 4.4 Vorteile von MCP

| Merkmal | Traditionelle Methode | MCP-Methode |
|----------|----------------------|-------------|
| **Datenpraesion** | Abhaengig von Screenshots, Details koennen verloren gehen | Direkter Zugriff auf Original-Designdaten |
| **Komponenten-Erkennung** | AI muss Komponentengrenzen erraten | Praeziser Zugriff auf Komponentendefinitionen |
| **Stil-Genauigkeit** | Basiert auf Pixel-Schaetzungen | Zugriff auf exakte Design-Tokens |
| **Iterationseffizienz** | Bei jeder Aenderung muss ein neuer Screenshot erstellt werden | Echtzeit-Synchronisierung von Designaenderungen |
| **Automatisierungsgrad** | Manuelles Kopieren und Einfuegen | Direktes Schreiben in Projektdateien |

### 4.5 Aktuell verfuegbare MCP-Tools

**Designtool-MCP:**
- **Figma MCP Server**: Offiziell unterstuetzte MCP-Implementierung
- **MasterGo MCP**: Von der Community entwickelter MasterGo-Adapter

**Entwicklungsumgebungs-MCP:**
- **Claude Code**: Nativer Support fuer das MCP-Protokoll
- **Cline**: VS-Code-Plugin, unterstuetzt MCP-Verbindungen
- **Trae**: MCP-Funktionalitaet kann durch Konfiguration aktiviert werden

::: tip :crystal_ball: Zukunftsperspektive
Das MCP-Protokoll entwickelt sich rasant weiter. Die Integration zwischen Designtools und Entwicklungsumgebungen wird noch enger werden. Es ist mit weiteren One-Click-Design-zu-Code-Loesungen zu rechnen, die die Luecke zwischen Design und Entwicklung weiter verkleinern.
:::

---

## 5. Arbeiten nach dem Code-Export

### 5.1 Lokale Tests

Nach dem Abrufen des Codes in der lokalen IDE oeffnen und testen:

1. **Neues Projekt erstellen**
   ```bash
   # Bei HTML-Dateien direkt im Browser oeffnen
   open index.html
   
   # Bei React/Vue-Projekten
   npm install
   npm run dev
   ```

2. **Mit AI IDE zusammenarbeiten**
   - Den generierten Code in Trae oder eine andere AI IDE importieren
   - AI bei der Behebung von Layout-Problemen und dem Hinzufuegen von Interaktivitaet helfen lassen

### 5.2 Haeufige Probleme und Loesungen

| Phase | Problem | Loesung |
|-------|---------|----------|
| Layout | Elemente verschoben | CSS display- und position-Eigenschaften pruefen |
| Stil | Farben inkonsistent | Browser-Entwicklertools verwenden, um tatsaechlich angewandte Farbwerte zu pruefen |
| Responsive | Darstellung auf Mobilgeraeten fehlerhaft | Media-Query-Breakpoints hinzufuegen |
| Interaktion | Button reagiert nicht | JavaScript-Ereignisbindung pruefen |

---

## 6. Vergleich der drei Pfade und Auswahl-Empfehlungen

### 6.1 Pfad-Vergleich

| Dimension | Pfad 1: Multimodale AI | Pfad 2: Plattform-Faehigkeiten | Pfad 3: MCP |
|------------|------------------------|-------------------------------|-------------|
| **Einstiegsschwierigkeit** | :star: Einfach | :star::star: Mittel | :star::star::star: Anspruchsvoll |
| **Rekonstruktionsgenauigkeit** | :star::star::star: Mittel | :star::star::star::star: Hoch | :star::star::star::star::star: Hoechste |
| **Flexibilitaet** | :star::star::star::star::star: Hoch | :star::star::star: Mittel | :star::star::star::star: Hoch |
| **Automatisierungsgrad** | :star::star: Niedrig | :star::star::star: Mittel | :star::star::star::star::star: Hoechster |
| **Kosten** | Niedrig (nach API-Aufruf) | Mittel (moeglicherweise Pro noetig) | Niedrig (Open-Source-Tools) |

### 6.2 Auswahl-Empfehlungen

**Pfad 1 (Multimodale AI) waehlen, wenn:**
- Schnelle Ideenvalidierung noetig ist
- Das Designtool nicht feststeht und haeufig gewechselt wird
- Keine hohen Anforderungen an die Rekonstruktionsgenauigkeit bestehen
- Das Budget begrenzt ist

**Pfad 2 (Plattform-Faehigkeiten) waehlen, wenn:**
- Das Team hauptsaechlich Figma oder MasterGo verwendet
- Hochpraezise Code-Rekonstruktion erforderlich ist
- Designer und Entwickler haeufig zusammenarbeiten muessen
- Bereit, in eine Pro-Version zu investieren

**Pfad 3 (MCP) waehlen, wenn:**
- Hoechstmöglicher Automatisierungsgrad angestrebt wird
- Die technische Kompetenz zur Konfiguration einer MCP-Umgebung vorhanden ist
- Das Projekt haeufige Iterationen von Design zu Code erfordert
- Ein standardisierter Design-Entwicklungs-Workflow aufgebaut werden soll

---

## 7. Zusammenfassung

Durch dieses Kapitel hast du die drei Kernpfade vom Design-Prototyp zum Code kennengelernt:

1. **Multimodale AI-Direktkonvertierung**: Flexibel und schnell, geeignet fuer Prototyp-Validierung
2. **Plattforme native Faehigkeiten**: Hohe Genauigkeit, geeignet fuer professionelle Design-Workflows
3. **MCP-Protokoll-Integration**: Hoechster Automatisierungsgrad, repraesentiert den Trend der Zukunft

::: tip :bulb: Best Practices
- **Anfaenger-Empfehlung**: Mit Pfad 1 (multimodale AI) beginnen, um schnell einzusteigen
- **Team-Zusammenarbeit**: Pfad 2 (Plattform-Faehigkeiten) verwenden, um Design-Konsistenz zu gewaehrleisten
- **Effizienz-Prioritaet**: Pfad 3 (MCP) ausprobieren, um einen automatisierten Workflow aufzubauen
- **Gemischte Nutzung**: Je nach Projektphase flexibel zwischen verschiedenen Pfaden wechseln
:::

---

## Referenzressourcen

- [Einfuehrung in Figma und MasterGo](../figma-mastergo/) - Grundlagen der Designtools erlernen
- [Gemeinsam Hogwarts-Portraets erstellen](../hogwarts-portraits/) - Vollstaendiges Projektpraktikum
- [MCP Offizielle Dokumentation](https://modelcontextprotocol.io/) - Protokolldetails kennenlernen
- [Figma Make Offizielle Dokumentation](https://help.figma.com/hc/en-us/sections/360007453634-Figma-Make)
- [MasterGo AI Tutorials](https://mastergo.com/tutorials)
