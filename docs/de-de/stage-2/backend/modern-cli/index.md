# CLI KI-Programmierwerkzeuge

In diesem Tutorial stellen wir KI-Programmier-Agenten vor, die direkt in der Kommandozeile ausgefuehrt werden. Sie unterscheiden sich von den zuvor erlernten Agenten in Trae oder Cursor -- CLI KI-Programmierwerkzeuge koennen nur im Terminal verwendet werden. Im Vergleich zu in KI-IDEs integrierten Agenten bieten sie in der Regel ein laengeres Kontextfenster, schnellere Werkzeugaufrufe und Kompatibilitaet mit einer groesseren Vielfalt an grossen Sprachmodellen. In der neuesten AI Vibe Coding-Praxis bevorzugen wir oft CLI KI-Programmierwerkzeuge gegenueber IDE-integrierten Codier-Agenten.

## Von der CLI ausgehend

Erinnerst du dich an die CLI, die wir zuvor vorgestellt haben? CLI (Command Line Interface) bedeutet die Bedienung von Softwareanwendungen ueber reine Textbefehle im Terminal, anstatt sich auf grafische Benutzeroberflaechen (GUI -- vereinfacht gesagt: Interfaces auf Computer oder Handy mit Schaltflaechen, die man anklicken kann, ohne Befehle einzugeben) zu verlassen.

> Unter Windows sind gaengige Terminalprogramme die "Eingabeaufforderung (cmd)" und "PowerShell". Du kannst "cmd" oder "powershell" im Ausfuehren-/Suchfeld deines Computers eingeben, um diese Kommandozeilenprogramme zu starten.

![](/zh-cn/stage-2/backend/modern-cli/images/image1.png)![](/zh-cn/stage-2/backend/modern-cli/images/image2.png)

CLI eignet sich von Natur aus fuer Textbefehlsoperationen und ist bei einem Teil der Power-User (Programmier-Enthusiasten, die das Aeusserste anstreben) sogar beliebter als GUI -- sie wuenschen sich, dass alle Bedienungen ueber die Tastatur ablaufen und finden, dass die Maus zu bedienen ihre Code-Effizienz eher verlangsamt.

In der Industrie ist CLI oft die haeufigste Schnittstellenform, da GUI vom Betriebssystem zusaetzliche Oberflaechen zeichnen und Fenster verwalten muss und hoehere Anforderungen an die Computerressourcen stellt. CLI hingegen muss nur die empfangenen Befehle an das System zur Ausfuehrung weiterleiten. Daher interagieren wir beim Verbinden von grossen Server-Clustern in der Regel nur ueber CLI.

![](/zh-cn/stage-2/backend/modern-cli/images/image3.png)

Fuer viele ohne CLI-Erfahrung mag die CLI-Bedienung komplex wirken, mit zu vielen Befehlen, und man fuerchtet, "aus Versehen den Computer zu zerstoeren". Keine Sorge. Erinnerst du dich, wie wir in frueheren Tutorials oft Trae fuer verschiedene Grundoperationen genutzt haben? Hier koennen wir genau diesen Ansatz uebernehmen -- wir lassen CLI-Programmierwerkzeuge alle CLI-Operationen fuer uns ausfuehren: Ordner betreten, Dateien suchen und verarbeiten, Open-Source-Projekte ausfuehren oder kopieren usw. Der gesamte Prozess kann ueber den Dialog mit dem CLI KI-Programmierwerkzeug abgewickelt werden.

## Unterschiede zu KI-IDEs

Man kann CLI KI-Programmierwerkzeuge mit den zuvor erlernten z.ai und Trae vergleichen. In gewisser Weise koennen CLI KI-Programmierwerkzeuge als eine besondere Art von z.ai betrachtet werden: Sie benoetigen ebenfalls nur einen einfachen Dialogueingang und fuehren automatisch alle erforderlichen Operationen durch (manchmal musst du nur manuell den Browser oeffnen, um das Endergebnis zu sehen). Vergleicht man sie mit KI-IDEs, koennen CLI KI-Programmierwerkzeuge als das Agent-Modul in der IDE betrachtet werden -- also der Seitenleisten-Dialogbereich.

![](/zh-cn/stage-2/backend/modern-cli/images/image4.png)![](/zh-cn/stage-2/backend/modern-cli/images/image5.png)

Da jedoch verschiedene KI-IDEs Agenten unterschiedlich implementieren und die Leistungsunterschiede gross sind, ist die KI-Programmierqualitaet oft instabil. Daher werden CLI KI-Programmierwerkzeuge in der Regel direkt von grossen Technologieunternehmen entwickelt, wie z.B. Anthropic hinter Claude, OpenAI hinter ChatGPT usw.

Im Vergleich zu anderen KI-Programmier-Agenten ist die direkte Nutzung dieser Grossunternehmen-Produkte oft die bessere Praxis, insbesondere da Claude Code selbst ein Tool ist, das urspruenglich fuer Anthropics interne Entwicklungsabteilung entwickelt wurde und von Anfang an darauf ausgelegt ist, "die echten Beduerfnisse von Ingenieuren zu erfuellen".

Fuer einen anschaulicheren Vergleich koennen wir uns die Unterschiede zwischen Claude Code und einem KI-IDE-Agenten ansehen (hier am Beispiel von Cursor):

| Funktionsmerkmal         | Claude Code    | Cursor          | Besserer      |
| ------------------------ | -------------- | --------------- | ------------- |
| Automatische Aufgabenausfuehrung | Sehr stark | Begrenzt | Claude Code |
| IDE-Integration          | Nur Kommandozeile | Natives VS Code | Cursor |
| Echtzeit-Codevervollstaendigung | Nein | Hervorragend | Cursor |
| Mehrdateioperationen     | Sehr stark     | Gut             | Claude Code |
| GitHub-Integration       | Direkte Commits | Manuelle Operation | Claude Code |
| Lernkurve                | Mittel         | Einfach         | Cursor |
| Kontextlaenge            | Sehr lang      | Gut             | Claude Code |
| Debugging-Unterstützung  | Automatisiert  | Viel manuell    | Claude Code |

Quelle: <https://northflank.com/blog/claude-code-vs-cursor-comparison>

Kurz gesagt koennen CLI KI-Programmierwerkzeuge:

- Laengere fortlaufende Gespraeche unterstuetzen (sie koennen dir sogar "einen ganzen Arbeitstag lang" helfen).
- Laengere Kontextfenster bieten (du musst nicht mehr haeufig "weiter" sagen).
- Schneller reagieren (koennen mehr benutzerdefinierte Modell-APIs anbinden).

Bei codierungsbezogenen Operationen sind sie in der Regel intelligenter und stabiler als die meisten IDE-integrierten Agenten.

## Haeufige CLI KI-Programmierwerkzeuge

Obwohl es derzeit viele Open-Source-Implementierungen gibt, empfehlen wir in der Praxis nur zwei Hauptkategorien von CLI KI-Programmierwerkzeugen als "Erstwahl-Kombination". Du kannst je nach Gewohnheit eine davon waehlen. Wir empfehlen dringend, beide auszuprobieren und dann das fuer dich am besten geeignete Werkzeug zu waehlen.

- **Codex** nutzt GPT-5 und ist insgesamt leistungsstaerker;
- **Claude Code** bietet ueber GLM 4.6 eine API-Weiterleitung mit einer Erfahrung nahe Claude 4, aber guenstiger.
- **OpenCode** ermoeglicht freien Modellwechsel und bietet kostenlose Modelle, womit sich die Kosten besser kontrollieren lassen.

Letztendlich kann nur durch persoenliches Testen beurteilt werden, welches Werkzeug in der Praxis besser ist. Mehrere KI-Programmierwerkzeuge zu beherrschen ist stets vorteilhaft: Wenn du erfahren bist, kannst du je nach Szenario flexibel zwischen Claude Code, Codex oder Trae wechseln. Wenn du nach mehreren Versuchen feststellst, dass ein Werkzeug durchschnittliche Ergebnisse liefert, kannst du direkt ein anderes Werkzeug oder Modell auswaehlen und weiter testen.

Da sich die Modellversionen zudem sehr schnell aktualisieren, solltest du bevorzugt die Loesung waehlen, die beim "Preis-Leistungs-Verhaeltnis (Wirkung / Kosten)" am besten abschneidet.

### Claude Code

Claude Code ist ein von Anthropic basierend auf den Faehigkeiten des Claude-Grosssprachenmodells entwickeltes KI-Programmierwerkzeug. Seine Hauptinteraktion findet im Terminal statt, unterstuetzt aber auch die Nutzung als VS Code-Plugin. Aehnlich wie Agenten in KI-IDEs kann es die Codebasis des Entwicklers tiefgreifend verstehen und durch natuerlichsprachliche Anweisungen End-to-End-Entwicklungsaufgaben abschliessen -- einschliesslich Codebearbeitung, Bug-Fixing, Testausfuehrung und -reparatur, Git-Workflow-Verwaltung (z.B. Loesen von Merge-Konflikten, Erstellen von PRs), komplexen Code-Erklaerungen, Ausfuehren von Terminalbefehlen usw.

![](/zh-cn/stage-2/backend/modern-cli/images/image6.png)

Claude Codes Staerken liegen vor allem in: extrem langem Kontextfenster (kann komplette Dateien oder sogar kleine Projekte verarbeiten), der Faehigkeit, unklare Anforderungen proaktiv zu klaeren, automatischer Aufgabenplanung und -zuweisung sowie dem tiefen Verstaendnis und der Erklaerung der gesamten Codebasis. Im Vergleich zu gewoehnlichen IDE-Agenten ist es besser fuer "immersives Vibe Coding"-Entwicklungsworkflows geeignet.

In der Praxis kannst du ihm ueber Dialoganweisungen helfen lassen, neue Projekte zu erstellen, CLI-Operationen auszufuehren (z.B. Ordner strukturieren, Dateien umbenennen, Open-Source-Projekte bereitstellen), Entwicklungsumgebungen zu konfigurieren (z.B. Python-Umgebung installieren und debuggen). Wenn du einen Codeabschnitt schwer verstehst oder eine Verzeichnisstruktur unklar ist, kannst du Claude Code auch direkt bitten, strukturierte Analysedokumente zu erstellen oder bestimmte Inhalte schrittweise zu erklaeren.

![](/zh-cn/stage-2/backend/modern-cli/images/image7.png)![](/zh-cn/stage-2/backend/modern-cli/images/image8.png)

![](/zh-cn/stage-2/backend/modern-cli/images/image9.png)![](/zh-cn/stage-2/backend/modern-cli/images/image10.png)

Wenn du Claude Code systematisch lernen moechtest, kannst du den Kurs von Andrew Ng und Anthropic nutzen:
<https://www.bilibili.com/video/BV176t2zSEpr>

Als Naechstes werden wir lernen, wie man Claude Code verwendet. Da die direkte Nutzung des offiziellen Claude Code oft sehr teuer ist (wie in der folgenden Abbildung gezeigt), werden wir stattdessen API-Plattformen verwenden, die mit dem Claude Code-Protokoll kompatibel sind, aber auf anderen grossen Sprachmodellen basieren.

![](/zh-cn/stage-2/backend/modern-cli/images/image11.png)

Du solltest die folgenden verschiedenen Optionen kennenlernen (am besten alle ausprobieren) und schliesslich die fuer dich am besten geeignete als Hauptpraxispfad waehlen.

Die erste Methode ist die direkte Nutzung von "Anthropic-kompatiblen" APIs. Mit der Popularitaet von Claude Code haben immer mehr grosse Modellanbieter begonnen, den Anthropic-Aufrufstil zu unterstuetzen. Gaengige Anbieter sind GLM, Kimi, DeepSeek und Siliconflow, die alle kompatible API-Schnittstellen anbieten. Zur konkreten Konfiguration werden wir spaeter im Detail kommen.

Es ist zu beachten, dass Claude Code in der Regel viele Token verbraucht. Wenn du besorgt bist, dass API-Aufrufe zu hohe Kosten verursachen, kannst du den Erwerb eines GLM-Monatspakets (ca. 20 Yuan/Monat) in Betracht ziehen, um die Kosten zu kontrollieren. Wenn du zuerst die tatsaechlichen Ausgaben erleben moechtest, kannst du auch erst einmal 10 Yuan aufladen und kleinere Tests durchfuehren.

Eine weitere Methode ist die Verwendung des "Claude Code Route"-Projekts. Dies ist ein Open-Source-Tool, das nicht nur alle gaengigen API-Aufrufschnittstellen unterstuetzt, sondern dir auch ermoeglicht, fuer verschiedene Szenarien praezise die zu verwendenden Modelle zu konfigurieren, und die Anbindung lokal bereitgestellter grosser Modelle unterstuetzt. Da diese Loesung jedoch relativ komplex zu konfigurieren ist, wird empfohlen, zuerst mit der ersten Methode zu beginnen.

#### GLM als Backend verwenden (Empfohlen)

GLM (General Language Model) ist eine von zhipu AI unabhaengig entwickelte Serie von Grosssprachenmodellen. GLM-4.6 ist die aktuelle neueste Version der GLM-Serie, deren Kernpunkt die herausragende Leistung bei Codefaehigkeiten ist (sie ist in oeffentlichen Benchmarks und realen Aufgaben vergleichbar mit Claude Sonnet 4 und gehoert in China zur ersten Liga).

![](/zh-cn/stage-2/backend/modern-cli/images/image12.png)

Es hat das Kontextfenster auf 200K erweitert, wodurch es langen Text und grossen Code noch souveraener verarbeiten kann. Gleichzeitig wurden die Reasoning- und Werkzeugaufruf-Faehigkeiten verstaerkt, was eine gute Balance zwischen Leistung und Kosten erreicht.

![](/zh-cn/stage-2/backend/modern-cli/images/image13.png)

Bevor wir GLM anbinden, muessen wir zunaechst Claude Code installieren.

Wenn du die Kommandozeilen-Installationsschritte muehsam findest oder Fehler auftreten, kannst du Traes Agent die Installation fuer dich erledigen lassen.

```python
# Claude Code installieren
npm install -g @anthropic-ai/claude-code

# In dein Projekt wechseln
cd your-awesome-project

# Claude Code starten
claude

# Mit Ctrl+C Claude beenden
```

Als Naechstes muessen wir die Standard-API-Anfrageadresse von Claude Code aendern, damit sie GLMs API-Dienst unterstuetzt. Du kannst den folgenden Inhalt direkt kopieren und Trae bitten, die entsprechenden Umgebungsvariablen zu erstellen. Alternativ kannst du sie dauerhaft als Systemumgebungsvariable schreiben (falls Probleme auftreten, kann der Agent ebenfalls helfen).

Zunaechst musst du den API-Key von GLM abrufen und auf die fuer dich bequemste Weise speichern.

Inlands-Version: <https://bigmodel.cn/usercenter/proj-mgmt/apikeys>
International: <https://z.ai/manage-apikey/apikey-list>

Wenn du die **Inlands-Version GLM** verwendest, verwende die folgende Variablenkonfiguration:

```python
# In der Cmd die folgenden Befehle ausfuehren
# Beachte: Ersetze `your_zhipu_api_key` durch deinen gerade erhaltenen API Key
setx ANTHROPIC_AUTH_TOKEN your_zhipu_api_key
setx ANTHROPIC_BASE_URL https://open.bigmodel.cn/api/anthropic
```

Wenn du die **international GLM** verwendest, verwende die folgende Konfiguration:

```python
# In der Cmd die folgenden Befehle ausfuehren
# Ersetze ebenfalls `your_zai_api_key`
setx ANTHROPIC_AUTH_TOKEN your_zai_api_key
setx ANTHROPIC_BASE_URL https://api.z.ai/api/anthropic
```

Du kannst in Trae einen aehnlichen Prompt eingeben:

Warnung: Wenn du Trae hilfst, "dauerhafte Umgebungsvariablen" zu konfigurieren, musst du **Trae nach Abschluss unbedingt neu starten**, da sich die Umgebungsvariablen im integrierten Terminal sonst nicht aktualisieren und dies zu Login-Fehlern oder Netzwerkverbindungsfehlern fuehren kann.

```python
Based on my environment variable settings:
setx ANTHROPIC_AUTH_TOKEN your_zai_api_key
setx ANTHROPIC_BASE_URL https://api.z.ai/api/anthropic

and my key(Replace it with your own key):
681fea485851d29060cc.13gfaendggaFOhb

please help me configure and start Claude Code
```

Du wirst eine aehnliche Ausgabe wie die folgende sehen:

![](/zh-cn/stage-2/backend/modern-cli/images/image14.png)

> Was sind Umgebungsvariablen?
>
> Umgebungsvariablen sind im Wesentlichen eine Reihe von Schluessel-Wert-Paar-Konfigurationsinformationen, die im Betriebssystem gespeichert sind, typischerweise in der Form "Variablenname = konkreter Wert". Solange sie im Voraus im Terminal oder in den Systemeinstellungen konfiguriert sind, kann das Programm diese Variablen jederzeit lesen, um relevante Informationen abzurufen. Da Umgebungsvariablen direkt im Terminal geschrieben werden koennen, ohne den Code selbst zu aendern, legen wir die fuer den Zugriff auf grosse Modelle benoetigten Schluessel in Umgebungsvariablen ab, um Lecks zu vermeiden. Das Programm muss nur die entsprechende Umgebungsvariable lesen, um den Aufruf des grossen Modells abzuschliessen.
>
> Unter Windows werden Umgebungsvariablen neben der Speicherung von Zugangsschluesseln fuer grosse Modelle auch haeufig verwendet, um die "Aufrufpfade" von Kommandozeilen-Tools zu speichern.
>
> Wir wissen, dass das Terminal selbst auch ein Programm ist. Manchmal moechten wir ein externes Programm im Terminal starten, z.B. `claude` eingeben, um Claude Code zu starten. Dass man einfach `claude` eingeben kann, liegt daran, dass das Terminal die Systemumgebungsvariablen liest, wobei die PATH-Variable das Verzeichnis enthaelt, in dem sich die ausfuehrbare Datei von Claude Code befindet, sodass das Terminal sie finden und ausfuehren kann (entspricht dem Einfuegen des absoluten Pfads des Programms im Terminal und Druecken der Eingabetaste).
>
> Eine typische Umgebungsvariable koennte so aussehen: `PATH=C:\Windows\system32;C:\Program Files\Python`. So koennen wir diese Programme des Systems in jedem Pfad ausfuehren, z.B. direkt `python` in der Kommandozeile eingeben, um den Python-Interpreter zu starten.
>
> Wenn du die aktuellen Umgebungsvariablen des Systems anzeigen moechtest, kannst du "Umgebungsvariablen" in der Windows-Suche eingeben. Im sich oeffnenden Fenster "Systemumgebungsvariablen bearbeiten" siehst du alle Variablen und ihre Werte. Einige Variablen dienen der Speicherung von Modell-Schluesseln, andere dem Hinzufuegen von Programmverzeichnissen, um den Aufruf von einem beliebigen Pfad zu ermoeglichen.

Jetzt kannst du das neueste GLM fuer die Claude Code-Entwicklung nutzen. Du kannst versuchen, ein frueheres Projekt noch einmal durchzulaufen oder die Aufgaben, die Trae nicht gut abgeschlossen hat, noch einmal in Angriff zu nehmen und die Unterschiede in der Erfahrung zu vergleichen.

Das wiederholte "Neuanfangen" ist keine Zeitverschwendung -- bei jedem Neuaufbau werden deine Faehigkeiten etwas solider.

Mit demselben Ansatz wie bei GLM koennen auch andere Anthropic-kompatible Schnittstellen problemlos angebunden werden.

#### Kimi K2 als Backend verwenden (Empfohlen)

Kimi K2 ist ein neues Grosssprachenmodell von Moonshot AI (Yue Zhi An Mian), das in Codeverstaendnis und -generierung herausragende Leistungen zeigt. Kimi K2 unterstuetzt ein Ultra-Lang-Kontextfenster von bis zu 200K Tokens und kann problemlos grosse Codebasen und komplexe Projekte verarbeiten.

**Kernvorteile:**

- **Ultra-Langer Kontext**: Untestuetzung eines 200K-Kontextfensters, das die Verarbeitung des gesamten Projektcodes in einem Durchgang ermoeglicht
- **Starke Codefaehigkeiten**: Herausragende Leistung bei Codegenerierung, Refactoring und Debugging
- **Gute Chinesisch-Verstaendnis**: Genauere Erfassung chinesischsprachiger Programmieranforderungen
- **Stabile Werkzeugaufrufe**: Untestuetzung stabiler Funktionsaufrufe und Werkzeugnutzung

**API-Key abrufen:**

Besuche <https://platform.moonshot.cn/console/account>, registriere dich und erhalte den API-Key.

**Konfigurationsmethode:**

Referenzdokumentation: <https://platform.moonshot.cn/docs/guide/agent-support>

```bash
export ANTHROPIC_BASE_URL=https://api.moonshot.cn/anthropic
export ANTHROPIC_AUTH_TOKEN=sk-YOURKEY
```

#### Minimax als Backend verwenden (Empfohlen)

Minimax ist ein neues Grosssprachenmodell von MiniMax (Xi Yu Ke Ji), das bei Programmieraufgaben hervorragend abschneidet. Das Minimax-Modell ist bekannt fuer seine herausragende Reasoning-Faehigkeit und Codegenerierungsqualitaet und eignet sich besonders fuer komplexe Programmierszenarien.

**Kernvorteile:**

- **Starke Reasoning-Faehigkeit**: Herausragende Leistung bei komplexer logischer Schlussfolgerung und Code-Architekturdesign
- **Hohe Codequalitaet**: Generierter Code ist klar strukturiert und gut lesbar
- **Mehrspachige Unterstuetzung**: Untestuetzung der Codegenerierung und -konvertierung in mehreren Programmiersprachen
- **Schnelle Antwortzeiten**: Schnelle API-Antwortzeiten, geeignet fuer hochfrequente Aufrufszenarien

**API-Key abrufen:**

Besuche <https://platform.minimax.io/>, registriere dich und erhalte den API-Key.

**Konfigurationsmethode:**

```bash
export ANTHROPIC_BASE_URL=https://api.minimax.io/anthropic
export ANTHROPIC_AUTH_TOKEN=YOUR_MINIMAX_API_KEY
export ANTHROPIC_MODEL=MiniMax-M3.1-Flash
```

Use `MiniMax-M3.1-Flash` for new configurations, or set `ANTHROPIC_MODEL=MiniMax-M3` explicitly. Keep any intentionally saved legacy or custom model ID. These are direct API model IDs; check your account's access before using a subscription plan. Flash requires adaptive thinking: do not disable thinking or set effort to `none`. See the [MiniMax API compatibility reference](https://platform.minimax.io/docs/api-reference/text-anthropic-api).

#### DeepSeek als Backend verwenden (Empfohlen)

DeepSeek ist ein Open-Source-Grosssprachenmodell von DeepSeek (Shen Du Qiu Suo), das bei Entwicklern wegen seiner herausragenden Codefaehigkeit und seines hohen Preis-Leistungs-Verhaeltnisses beliebt ist. DeepSeek Coder wurde speziell fuer Programmieraufgaben optimiert und trainiert.

**Kernvorteile:**

- **Herausragende Codefaehigkeit**: Hervorragende Leistung bei Codegenerierung, Codeverstaendnis und Bug-Fixing
- **Open Source und anpassbar**: Das Modell ist Open Source und kann je nach Bedarf feinabgestimmt werden
- **Hohes Preis-Leistungs-Verhaeltnis**: Relativ niedrige API-Preise, geeignet fuer haeufige Nutzung
- **Gute Chinesisch-Unterstuetzung**: Genau Erfassung chinesischsprachiger Programmszenarien

**API-Key abrufen:**

Besuche <https://platform.deepseek.com/usage>, registriere dich und erhalte den API-Key.

**Konfigurationsmethode:**

```bash
export ANTHROPIC_BASE_URL=https://api.deepseek.com/anthropic
export ANTHROPIC_AUTH_TOKEN=YOU_DEEPSEEK_API_KEY
export API_TIMEOUT_MS=600000
export ANTHROPIC_MODEL=deepseek-chat
export ANTHROPIC_SMALL_FAST_MODEL=deepseek-chat
export CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC=1
```

#### Volcengine Coding Plan als Backend verwenden (Empfohlen)

Volcengine (Volcano Engine) ist die Cloud-Service-Plattform von ByteDance und bietet KI-Modell-Services auf Unternehmensebene. Der Coding Plan von Volcengine ist speziell fuer Programmierszenarien optimiert und bietet stabile, effiziente Codegenerierungsfaehigkeiten.

**Kernvorteile:**

- **Stabilitaet auf Unternehmensebene**: Bietet Service-Level-Agreements (SLA) zur Gewaehrleistung der Dienststabilitaet
- **Optimiert fuer Code-Szenarien**: Spezielle Optimierung fuer Programmieraufgaben
- **Reichhaltige Modellauswahl**: Untestuetzung verschiedener Modelle, einschliesslich Doubao-pro, Doubao-lite usw.
- **Schneller Inlandszugriff**: Inlandsnahe Knotenbereitstellung mit schnellen Zugriffsgeschwindigkeiten

**API-Key abrufen:**

Besuche <https://console.volcengine.com/ark/region:ark+cn-beijing/apiKey>, registriere dich und erhalte den API-Key.

**Konfigurationsmethode:**

```bash
export ANTHROPIC_BASE_URL=https://ark.volces.com/api/anthropic
export ANTHROPIC_AUTH_TOKEN=YOUR_VOLCANO_API_KEY
export ANTHROPIC_MODEL=doubao-pro-32k
```

#### Weitere Anthropic-kompatible APIs

Siliconflow:

```bash
export ANTHROPIC_BASE_URL="https://api.siliconflow.cn/"
export ANTHROPIC_MODEL="moonshotai/Kimi-K2-Instruct-0905"    # Kann auf das gewuenschte Modell geaendert werden
export ANTHROPIC_API_KEY="YOUR_SILICONCLOUD_API_KEY"    # Bitte API Key ersetzen
```

Alibaba Cloud DashScope (Aliyuncs): <https://help.aliyun.com/zh/model-studio/get-api-key>

```python
export ANTHROPIC_BASE_URL="https://dashscope.aliyuncs.com/apps/anthropic"
export ANTHROPIC_API_KEY="YOUR_DASHSCOPE_API_KEY"
```

::: details Claude Code Route als Backend verwenden (Fortgeschritten)

Oben haben wir erklaert, wie man die offizielle GLM-API verwendet, um die Anthropic-Schnittstelle von Claude Code zu ersetzen. Schauen wir uns nun an, wie das Tool Claude Code Router Claude Code an weitere Modell-APIs anpasst.

[Claude Code Router](https://github.com/musistudio/claude-code-router) ist ein intelligentes Routing-Erweiterungstool, das speziell fuer Claude Code entwickelt wurde. Seine Kernfunktion besteht darin, Nutzern zu helfen, KI-Anfragen bedarfsgerecht an Modelle auf verschiedenen Plattformen zu verteilen, mit hoher Anpassbarkeit. Es unterstuetzt die Anbindung an Dutzende von Plattformen, darunter OpenRouter, DeepSeek, Ollama, Gemini usw. Es koennen auch aufgabenbezogen Modelle geroutet werden, z.B. GLM-4.5, Kimi-K2, Qwen3-Coder usw. So kannst du Hintergrundaufgaben automatisch an das lokale Ollama uebergeben, um Kosten zu sparen; langen Text-/langen Code-Aufgaben an Gemini-2.5-Pro; Code-Erklaerungen an DeepSeek.

![](/zh-cn/stage-2/backend/modern-cli/images/image16.png)

Das Tool bietet zudem komfortable UI/CLI-Konfigurationsverwaltung und passt sich durch "Konverter (converter)" an die API-Formate verschiedener Plattformen an. Es unterstuetzt Automatisierungsintegrationen wie GitHub Actions sowie benutzerdefinierte Erweiterungen. Es loest das Problem, dass "ein einzelnes Modell nicht alle Szenarien abdecken kann" und "haeufiges Plattformwechseln muehsam ist", und hilft Nutzern, KI-Tools flexibler und kostenguenstiger einzusetzen.

![](/zh-cn/stage-2/backend/modern-cli/images/image17.png)

Im Folgenden stellen wir kurz vor, wie man Claude Code Router installiert. Die ungefaehren Schritte sind die folgenden (auch hier kann Trae die Ausfuehrung uebernehmen), um die entsprechende Umgebung vorzubereiten:

```markdown
npm install -g @anthropic-ai/claude-code
npm install -g @musistudio/claude-code-router
```

Nach Abschluss der Installation musst du bestaetigen, dass der Befehl `ccr` lokal verfuegbar ist. Wenn du eine aehnliche Ausgabe wie die folgende siehst, war die Installation erfolgreich:

![](/zh-cn/stage-2/backend/modern-cli/images/image18.png)

Als Naechstes gibt es zwei Moeglichkeiten, die Modelle zu initialisieren und zu konfigurieren:

- Die in CCR integrierte UI nutzen und die vom Browser bereitgestellte Konfigurationsseite oeffnen;
- Die Standardkonfigurationsdatei von CCR direkt bearbeiten (im Wesentlichen aendert auch die UI nur die Konfigurationsdatei, bietet jedoch eine intuitivere Oberflaeche).

Wenn du dich fuer die CCR UI entscheidest, siehst du eine aehnliche Oberflaeche wie die folgende:

![](/zh-cn/stage-2/backend/modern-cli/images/image19.png)

Klicke dann auf "Add Provider" und du siehst die folgende Oberflaeche. Du musst:

1. In Name den Namen des Modellanbieters eingeben;
2. In API Full URL die OpenAI-kompatible Schnittstellenadresse dieses Anbieters eintragen;
3. In API Key den API-Key der entsprechenden Plattform eingeben;
4. Im Models-Bereich den Modellnamen eingeben und auf "Add Model" klicken;
5. Schliesslich auf "Save" klicken, um die Konfiguration zu speichern.

(Nach unten scrollen gibt es noch viele erweiterte Optionen, die du jedoch vorerst ignorieren kannst.)

![](/zh-cn/stage-2/backend/modern-cli/images/image20.png)

Hier sind Konfigurationsbeispiele fuer DeepSeek und Kimi:

![](/zh-cn/stage-2/backend/modern-cli/images/image21.png)

![](/zh-cn/stage-2/backend/modern-cli/images/image22.png)

Nach dem Speichern der Modellkonfiguration musst du im rechten Router-Bereich das Standardmodell (Default) angeben. Klicke auf die entsprechende Dropdown-Auswahl und setze es auf `kimi` (empfohlen). Klicke dann oben rechts auf `Save and Restart`.

![](/zh-cn/stage-2/backend/modern-cli/images/image23.png)

Danach genuegt es, `ccr code` im Terminal einzugeben, um den Claude Code-Codier-Workflow ueber den Claude Code Router zu starten.

![](/zh-cn/stage-2/backend/modern-cli/images/image24.png)

:::

#### Claude Code erweiterte Nutzung

Viele nutzen Claude Code anfangs nur als gewoehnliches Dialogwerkzeug. Tatsaechlich verfuegt es jedoch ueber viele eingebaute Faehigkeiten, die die Nutzung effizienter und flexibler machen. Im Folgenden einige haeufige Befehle und Anwendungsbeispiele:

Referenzdokumentation:

<https://docs.claude.com/en/docs/claude-code/cli-reference>
<https://docs.claude.com/en/docs/claude-code/slash-commands>

| Befehl               | Funktion                                            | Beispiel                                     |
| -------------------- | --------------------------------------------------- | -------------------------------------------- |
| claude               | Interaktiven Modus starten                          | `claude`                                     |
| claude "query"       | Einmalige Aufgabe ausfuehren                        | `claude "explain this project"`              |
| claude -p "query"    | Einmalige Frage mit automatischem Beenden           | `claude -p "explain this function xxxx"`     |
| claude -c            | Letzte Sitzung fortsetzen                           | `claude -c`                                  |
| claude -r            | Vorherige Sitzung wiederherstellen                  | `claude -r`                                  |
| /resume              | In aktuellem Chat zur vorherigen Sitzung wechseln   | `claude -c`, `/resume`                       |
| /plugin              | Plugins verwalten, z.B. Commit- und Review-Erweiterungen installieren | `/plugin`                                    |
| /init                | Projektbeschreibung mit CLAUDE.md initialisieren   | `/init`                                      |
| /clear               | Aktuelle Sitzung leeren, Informationsueberladung verhindern | `/clear`                                     |
| /compact             | Sitzungsverlauf komprimieren, Kontext-Token-Verbrauch reduzieren | `/compact`                                   |
| /cost                | Aktuelle Kosten anzeigen                           | `/cost`                                      |
| /model               | Verwendetes Modell wechseln (bei kompatibler API meist ignoriert) | `/model`                                     |
| /memory              | CLAUDE.md-Speicherdateien verwalten                 |                                              |
| /help                | Verfuegbare Befehle anzeigen                        | `/help`                                      |
| exit oder Ctrl+C     | Claude Code beenden                                 | `exit` oder `Ctrl+C`                         |
| /agents              | Erweiterte Funktion, wird spaeter erlaeutert       |                                              |
| /mcp                 | Erweiterte Funktion, wird spaeter erlaeutert       |                                              |

**CLAUDE.md**

Referenz: <https://www.anthropic.com/engineering/claude-code-best-practices>

`CLAUDE.md` ist eine spezielle Datei, die Claude beim Start automatisch liest und zum Kontext hinzufuegt. Sie eignet sich fuer:

- Haeufige Bash-Befehle
- Kerndateien und Hilfsfunktionen
- Code-Stilvereinbarungen
- Testmethoden
- Repository-Zusammenarbeitsregeln (z.B. Branch-Namenskonventionen, merge oder rebase)
- Entwicklungsumgebungskonfiguration (z.B. ob pyenv verwendet wird, empfohlener Compiler)
- Verhaltenshinweise oder Stolpersteine im Projekt
- Alle Informationen, die Claude "merken" soll

`CLAUDE.md` selbst hat kein zwingendes Format und sollte einfach und gut lesbar sein. Zum Beispiel:

```
# Bash commands
- npm run build: Build the project
- npm run typecheck: Run the typechecker

# Code style
- Use ES modules (import/export) syntax, not CommonJS (require)
- Destructure imports when possible (eg. import { foo } from 'bar')

# Workflow
- Be sure to typecheck when you're done making a series of code changes
- Prefer running single tests, and not the whole test suite, for performance
```

#### Interne Funktionsweise von Claude Code

Referenz: <https://github.com/shareAI-lab/analysis_claude_code>

Wenn du neugierig bist, warum Claude Code in vielen Szenarien besser funktioniert als Agent-Programmierwerkzeuge wie Trae oder Cursor, koennen wir uns kurz seine interne Arbeitsweise ansehen.

Auch andere CLI KI-Programmierwerkzeuge funktionieren im Grossen und Ganzen aehnlich.

![](/zh-cn/stage-2/backend/modern-cli/images/image25.png)

Claude Code zerlegt Programmieraufgaben in einen fortlaufenden "Wahrnehmen-Denken-Handeln-Verifizieren"-Zyklus und ruft darin verschiedene Werkzeuge auf, um Aufgaben abzuschliessen. Es ahmt den Workflow menschlicher Entwickler nach: staendig "Code schreiben > ausfuehren > Ergebnisse pruefen > verbessern". Im System wird intern ein Hauptaufgabenzyklus kontinuierlich ausgefuehrt, in dem Claude in jeder Runde verschiedene Werkzeuge aufrufen kann -- z.B. Dateien lesen/schreiben, Befehle ausfuehren, Code durchsuchen usw. -- und dann basierend auf den tatsaechlichen Ergebnissen der Werkzeuge die naechste Aktion entscheidet.

Dabei gibt es mehrere bemerkenswerte Eigenschaften:

- **Stream-Verarbeitung (Stream Processing)**: Claude kann Ergebnisse ausgeben, waehrend es denkt, anstatt warten zu muessen, bis der gesamte Code geschrieben ist, bevor er ausgefuehrt wird.
- **Intelligente Kompression (Intelligent Compression)**: Lange Gespraeche fuehren leicht zu einem ueberlangem Kontext. Claude reduziert die Wahrscheinlichkeit des "Vergessens" durch die Komprimierung der Historie auf Schluesselinformationen und gewaehrleistet durch die Unterscheidung zwischen kurz- und langfristigem Gedaechtnis einen effizienten Betrieb.
- **Parallelitaetskontrolle (Concurrency Control)**: Das interne Parallelitaetsdesign ermoeglicht es mehreren Aufgaben gleichzeitig und ohne gegenseitige Behinderung abzulaufen.
- **Sub-Agent-Verwaltung (Sub-agent Management)**: In der Praxis entspricht dies nicht nur einer "Rolle", die alles bearbeitet. Du kannst mehrere Sub-Agenten verwalten, die bei der Codebearbeitung zusammenarbeiten, wobei jeder Agent fuer unterschiedliche Aufgaben verantwortlich ist -- z.B. speziell fuer Tests, fuer die Dokumentation usw.

### Codex

![](/zh-cn/stage-2/backend/modern-cli/images/image26.png)

![](/zh-cn/stage-2/backend/modern-cli/images/image27.png)

Aehnlich wie Claude Code ist Codex ein von OpenAI entwickeltes KI-Kooperations-Programmierwerkzeug, das man sich als "OpenAI-Version von Claude Code" vorstellen kann. Sein groesster Vorteil ist die effiziente Anpassung an GPT-5.

Aus praktischer Erfahrung ist GPT-5 derzeit schneller in der Antwort und hat eine niedrigere Fehlerrate (hoehere Wahrscheinlichkeit, mehrstufige komplexe Aufgaben korrekt abzuschliessen). Ein Nachteil ist, dass seine Erklaerungen oft eher "akademisch" und "technisch" klingen, manchmal zu rigoros und informationsreich wirken, was fuer Anfaenger etwas schwer verstaendlich sein koennte.

Du kannst Codex mit dem folgenden Befehl installieren:

```
npm i -g @openai/codex
```

#### Offizielle OpenAI API als Backend

Bei direkter Nutzung des offiziellen OpenAI Codex-Einstiegs ist die Konfiguration sehr einfach: Wenn du bereits ein OpenAI-Abonnement eroeffnet oder entsprechende API-Kontingente erhalten hast, genuegt es, `codex` in der Kommandozeile einzugeben, das Programm zu starten und dich gemaess den Anweisungen anzumelden.

![](/zh-cn/stage-2/backend/modern-cli/images/image28.png)

![](/zh-cn/stage-2/backend/modern-cli/images/image29.png)

#### Weitergeleitete OpenAI API als Backend

Da die offizielle OPENAI API moeglicherweise hohe Preise und strenge Netzwerkanforderungen hat, koennen wir zur Umgehung dieser Einschraenkungen auch andere API-Gateway-Dienste fuer die Weiterleitung von Aufrufen nutzen.

Bei dieser Methode muessen wir nur das entsprechende Codex-API-Kontingent auf einer Drittanbieter-Weiterleitungsplattform erwerben, um eine Nutzungserfahrung zu erhalten, die nahe an der nativen OpenAI Codex-Nutzung liegt.

Referenz: <https://open-dev.feishu.cn/wiki/PAqUwWG4IiuwTvkQ2sGcaQuPnXc>
Aufladeseite: <https://api.zyai.online/account/topup/recharge>

Bitte beachte, dass du nach Erhalt des Token-Kontingents den API-Key noch lokal konfigurieren musst.

Achte in den Schluesselgruppen-Einstellungen darauf, den speziell fuer Codex vorgesehenen Eintrag auszuwaehlen.

![](/zh-cn/stage-2/backend/modern-cli/images/image30.png)

Als Naechstes muessen wir den erhaltenen Key in den folgenden Prompt einfuegen und den gesamten Prompt an Trae uebergeben, damit er den gesamten Konfigurationsprozess fuer dich abschliesst:

````bash
My API key is: [Paste your obtained sk-xxxxx key here]

Please help me complete the following configuration tasks:

1. Create configuration directory
   - Create a `.codex` folder under my user directory
   - Windows path should be: `C:\Users\[My Username]\.codex`
2. Backup existing configuration (if exists)
   - Check if `.codex\config.toml` exists
   - If it exists, rename it to `config.toml.bak.[current timestamp]` (timestamp format: yyyyMMddHHmmss)
3. Create configuration file
   - Create `config.toml` in the `.codex` directory
   - Write the following complete content:
   ```toml
   preferred_auth_method = "apikey"

   [model_providers.myrelay]
   name = "My Relay Station"
   base_url = "https://api.zyai.online/v1"
   env_key = "MYRELAY_API_KEY"
   wire_api = "responses"
   request_max_retries = 4
   stream_max_retries = 10
   stream_idle_timeout_ms = 300000

   [profiles.myrelay]
   model_provider = "myrelay"
   model = "gpt-5"
   model_reasoning_effort = "medium"

   [tools]
   web_search = true

4. Set system environment variable
Variable name: MYRELAY_API_KEY
Variable value: The key I gave you

5. Confirm completion and report back:

The full path of the configuration file
Whether the environment variable was set successfully
I can use the command `codex --profile myrelay` to run it
````

Nach Abschluss der Konfiguration kannst du Codex mit `codex --profile myrelay` starten und die weitergeleitete API nutzen. Die weitere Verwendung ist aehnlich wie bei Claude Code: Gib einfach deine Gedanken und Beduerfnisse in das Dialogfeld ein.

### OpenCode

![](/zh-cn/stage-2/backend/modern-cli/images/image32.png)

![](/zh-cn/stage-2/backend/modern-cli/images/image33.png)

OpenCode ist eine Open-Source KI Coding Agent-Plattform fuer Entwickler, positioniert als "Multi-Modell-Version von Claude Code". Mit dem Terminal als Kern-Interaktionseintrag unterstuetzt es auch Editor-Integrationen (wie VS Code, Neovim usw.), kann tief in lokale Codebasen eingebunden werden und durch natuerliche Sprache einen kompletten Entwicklungsprozess von Codeverstaendnis bis Engineering-Ausfuehrung abschliessen.

Es ist kein an ein einzelnes Modell gebundenes KI-Programmierwerkzeug, sondern eine offene KI Coding Agent-Plattform, die freies Wechseln zwischen GPT, Claude, Gemini und sogar lokalen Modellen ermoeglicht. Sogar OpenAI offiziell unterstuetzt die Anbindung von OpenCode an Codex/OpenAI-Abonnements.

![](/zh-cn/stage-2/backend/modern-cli/images/image34.png)

Du kannst OpenCode mit dem folgenden Befehl installieren:

```bash
# Linux / Unix
curl -fsSL https://opencode.ai/install | bash

# Windows
npm i -g opencode-ai
```

#### Kostenlose Modelle in OpenCode verwenden

In OpenCode werden unregelmaessig kostenlose Modelle zur Verfuegung gestellt, deren Konfiguration sehr einfach ist. Du kannst `opencode` an der Kommandozeile an der Stelle, an der du OpenCode verwenden moechtest, eingeben, um das OpenCode-Programm zu starten und zum Chat-Panel zu gelangen. Gib `/models` ein und suche nach "free", um die mit "free" gekennzeichneten kostenlosen Modelle zu sehen.

![](/zh-cn/stage-2/backend/modern-cli/images/image35.png)

Im Allgemeinen sind kostenlose Modelle bei Codierungsaufgaben langsamer als kostenpflichtige/abonnierte Modelle. Dies haengt normalerweise davon ab, ob die Modellleitung blockiert ist, ob es sich um eine Spitzenzeit fuer die Codierung handelt und um die Faehigkeiten des Modells selbst.

#### Drittanbieter-Modelle als OpenCode-Hauptcodiermodell verwenden

Dies ist der Kernvorteil von OpenCode: Es kann bei Verwendung derselben MCP, Skills und desselben Kontexts den freien Modellwechsel fuer unterschiedliche Codierungsaufgaben ermoeglichen. Im Folgenden wird anhand des Beispiels des offiziellen OpenAI GPT-5.3 Codex gezeigt, wie man es als Hauptcodiermodell in OpenCode einbindet.

Gib im Chat-Fenster von OpenCode den Befehl `/connect` ein, waehle den ersten relevanten Eintrag aus und druecke Enter, um die Authentifizierung bei einem Drittanbieter-Modellanbieter durchzufuehren.

![](/zh-cn/stage-2/backend/modern-cli/images/image36.png)

Hier waehlen wir als Beispiel OpenAI und bestaetigen mit Enter, um die Authentifizierungsmethode auszuwaehlen.

![](/zh-cn/stage-2/backend/modern-cli/images/image37.png)

Jede Option funktioniert, es unterscheidet sich nur die Authentifizierungsmethode. Hier waehlen wir die erste fuer den Browser-Login.

![](/zh-cn/stage-2/backend/modern-cli/images/image38.png)

Kopiere diesen Link in deinen Browser und fuehre einen normalen OpenAI-Login durch. Nachdem im Browser "Authorization Successful" angezeigt wird, springt der OpenCode-Client automatisch zur Modellauswahl fuer OpenAI.

![](/zh-cn/stage-2/backend/modern-cli/images/image39.png)

![](/zh-cn/stage-2/backend/modern-cli/images/image40.png)

#### Oh My OpenAgent Plugin installieren

Die Staerke von OpenCode liegt auch in seiner sehr aktiven Community-Oekologie. Du kannst auf Github sehr viele OpenCode-bezogene Plugins finden. Wenn OpenCode ein KI-Zusammenarbeitstool ist, das beliebige Modelle wechseln kann, dann ist Oh-My-OpenAgent ein "Multi-Agent KI-Programmier-Kommandosystem", das auf OpenCode laeuft. Es kann eine komplexe Aufgabe in mehrere Sub-Aufgaben aufteilen und diese verschiedenen Modellen zur getrennten Bearbeitung zuweisen.

![](/zh-cn/stage-2/backend/modern-cli/images/image41.png)

Du kannst den folgenden Text kopieren und dem zuvor konfigurierten Modell in OpenCode zum Installieren von OpenCode uebergeben.

```text
Install and configure oh-my-openagent by following the instructions here:
https://raw.githubusercontent.com/code-yeongyu/oh-my-openagent/refs/heads/dev/docs/guide/installation.md
```

Im Folgenden sind die Eigenschaften und Funktionsbeschreibungen von Oh-My-OpenAgent aufgefuehrt.

| Eigenschaft | Funktionsbeschreibung |
| :-------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Disziplin-Agenten (Discipline Agents)** | Sisyphus koordiniert Hephaestus, Oracle, Librarian und Explorer. Ein vollstaendiges KI-Entwicklungsteam arbeitet parallel. |
| **Team Mode** (v4.0, optional aktivierbar) | Leitender Agent + bis zu 8 parallele Mitglieder, Echtzeit-tmux-Visualisierung, dedizierte `team_*`-Werkzeugfamilie. Steuert `hyperplan` (5 gegnerische Reviewer) und `security-research` (3 Jaeger + 2 PoC-Ingenieure). |
| **`ultrawork` / `ulw`** | Ein-Klick-Ausloesung, alle Agenten ruecken aus. Kein Aufgeben vor Aufgabenabschluss. |
| **[IntentGate](https://factory.ai/news/terminal-bench)** | Analysiert vor dem echten Handeln die tatsaechliche Absicht des Nutzers. Keine KI-Nonsense-Missverstaendnisse mehr. |
| **Hash-basierte Bearbeitungswerkzeuge** | Jede Aenderung wird durch `LINE#ID`-Inhalts-Hash verifiziert, 0% falsche Aenderungen. Inspiriert von [oh-my-pi](https://github.com/can1357/oh-my-pi). |
| **LSP + AST-Grep** | Workspace-weites Umbenennen, Pre-Build-Diagnostik, AST-basiertes Umschreiben. IDE-level Praezision fuer den Agenten. |
| **Hintergrund-Agenten** | Gleichzeitige Ausfuehrung von 5+ Experten parallel. Kontext sauber halten, Ergebnisse jederzeit abrufen. |
| **Eingebautes MCP** | Exa (Websuche), Context7 (offizielle Dokumentation), Grep.app (GitHub-Quellcodesuche). Standardmaessig aktiviert. |
| **Ralph Loop / `/ulw-loop`** | Selbstreferenzierender Regelkreis. Kein Stopp vor 100% Fertigstellung. |
| **Todo-Erzwingung** | Der Agent moechte pausieren? Das System zieht ihn direkt zurueck. Deine Aufgaben muessen erledigt werden. |
| **Kommentar-Reviewer** | Entfernt redundante Kommentare mit starkem KI-Geschmack. Code, der aussieht, als haette ihn ein erfahrener Senior-Ingenieur geschrieben. |
| **Tmux-Integration** | Vollstaendige interaktive Terminalunterstuetzung. REPL, Debugger, TUI-Tools, alles in der Echtzeit-Sitzung. |
| **Claude Code kompatibel** | Deine bestehenden Hooks, Befehle, Skills, MCP und Plugins? Alles nahtlos migrierbar. |
| **Skill-integriertes MCP** | Skills bringen ihre benoetigten MCP-Server mit. Bedarfsgerecht aktiviert, sprengt nicht deinen Kontext. |
| **Prometheus Planer** | Strategische Planung vor dem Code-Schreiben durch Interview-Modus. |
| **`/init-deep`** | Automatische Generierung von `AGENTS.md` in der gesamten Projektverzeichnishierarchie. Spart nicht nur Token, sondern verbessert auch das Agentenverstaendnis massiv. |

Sisyphus (claude-opus-4-7 / kimi-k2.6 / glm-5.1) ist dein Hauptkommandant. Er ist fuer die Planung, Aufgabenverteilung an das Expertenteam und die extrem aggressive Parallelstrategie zustaendig, um Aufgaben bis zum Abschluss zu treiben. Er gibt nie auf.

Hephaestus (gpt-5.5) ist dein autarker Tiefenarbeiter. Gib ihm nur das Ziel, nicht die Methode. Er erkundet selbststaendig Code-Muster, fuehrt Aufgaben von Anfang bis Ende unabhaengig aus und wird dich nie als Babysitter benoetigen. Ein echter Handwerker.

Prometheus (claude-opus-4-7 / kimi-k2.6 / glm-5.1) ist dein strategischer Planer. Durch den Interview-Modus bestimmt er vor dem Schreiben einer einzigen Codezeile den Umfang und erstellt einen detaillierten Ausfuehrungsplan.

Nachdem du dies verstanden hast, kannst du OpenCode mit dem installierten Oh-My-OpenAgent-Plugin fuer Codierungsaufgaben nutzen.

#### Modell- und API-Konfiguration (Fortgeschritten)

Mit `/connect` kannst du Modelle schnell in der Chat-Oberflaeche einbinden. Wenn du jedoch feinkoernigere Kontrolle benoetigst -- z.B. verschiedene Modelle fuer unterschiedliche Aufgaben festzulegen oder mehrere API-Provider als Backup zu konfigurieren -- kannst du die OpenCode-Konfigurationsdatei `opencode.json` direkt bearbeiten.

Diese Datei befindet sich unter `~/.config/opencode/opencode.json` (Windows-Pfad: `C:\Users\DeinBenutzername\.config\opencode\opencode.json`) und wird beim ersten Start von OpenCode automatisch generiert.

Hier ist ein Konfigurationsbeispiel fuer die Einbindung des Qwen-Modells der Bailian-Plattform (Alibaba Cloud):

```json
{
  "model": "bailian-coding-plan/qwen3.5-plus",
  "small_model": "bailian-coding-plan/qwen3.5-plus",
  "provider": {
    "bailian-coding-plan": {
      "options": {
        "apiKey": "sk-dein-API-Schluessel"
      }
    }
  }
}
```

> Das Format des Feldes `model` ist `Anbieter/Modellname`. Nach der Registrierung auf der entsprechenden Plattform und dem Erhalt des API-Schluessels kannst du den obenstehenden `apiKey`-Wert ersetzen.

Wenn du mehrere Modelle gleichzeitig konfigurieren moechtest, kannst du verschiedene Aufgabenkategorien in der Konfiguration angeben:

The MiniMax quick-task example uses the [OpenCode Console route](https://opencode.ai/v2/docs/console/models/). Connect that provider with `/connect` first. Its `minimax-m3.1-flash-free` offer is time-limited; `opencode/minimax-m3` is a paid alternative. These gateway IDs are distinct from direct MiniMax API IDs and OpenCode Go subscription models.

```json
{
  "model": "bailian-coding-plan/qwen3.5-plus",
  "categories": {
    "visual-engineering": {
      "model": "bailian-coding-plan/qwen3.5-plus",
      "description": "Frontend, UI/UX, Design, Styling"
    },
    "ultrabrain": {
      "model": "bailian-coding-plan/qwen3-coder-next",
      "description": "Komplexe Logik, Algorithmen, Architekturentscheidungen"
    },
    "quick": {
      "model": "opencode/minimax-m3.1-flash-free",
      "description": "Einfache Aenderungen, Tippfehlerkorrekturen"
    }
  }
}
```

So waehlt OpenCode automatisch das geeignetste Modell basierend auf dem Aufgabentyp: Bei einfachen Aenderungen wird ein schnelles Modell fuer geringere Kosten verwendet, bei komplexen Architekturproblemen ein staerkeres Modell fuer bessere Qualitaet.

#### MCP-Server zur Erweiterung von OpenCode verwenden

MCP (Model Context Protocol) ist ein offenes Protokoll, das es KI-Programmierwerkzeugen ermoeglicht, externe Werkzeuge aufzurufen -- z.B. den Browser zu steuern, das Web zu durchsuchen, Bilder zu analysieren usw. OpenCode unterstuetzt MCP nativ mit einer Konfiguration, die aehnlich wie bei Claude Code ist.

Fuege die Serverkonfiguration im Feld `mcp` von `opencode.json` hinzu:

```json
{
  "mcp": {
    "chrome-devtools": {
      "type": "local",
      "command": ["npx", "-y", "chrome-devtools-mcp@latest"]
    },
    "zai-mcp-server": {
      "type": "local",
      "command": ["npx", "-y", "@z_ai/mcp-server"]
    }
  }
}
```

Nach der Konfiguration OpenCode neu starten, und die KI kann diese Werkzeuge automatisch in Gespraechem aufrufen -- z.B. den Browser fuer Screenshots oeffnen, UI-Designs analysieren, Webseiten-Informationen durchsuchen usw.

> **Praxisbeispiel**: Wenn du die KI brauchst, um das Layout-Problem einer Webseite zu analysieren, konfiguriere chrome-devtools MCP und sage einfach "Oeffne diese Seite und schau, warum die Schaltflaeche falsch positioniert ist". Die KI oeffnet automatisch den Browser, macht einen Screenshot, analysiert und gibt Verbesserungsvorschlaege.

#### Taegliche Nutzungstipps und haeufige Fragen

**AGENTS.md fuer KI-Verhalten nutzen**

Erstelle eine `AGENTS.md`-Datei im Projekt-Root-Verzeichnis, um OpenCode deine Projektkonventionen und Praeferenzen mitzuteilen. Die KI liest diese Datei bei jedem Start automatisch:

```markdown
## Projektkonventionen
- TypeScript Strict Mode verwenden
- API-Antworten muessen JSON Schema entsprechen
- Fehlerbehandlung mit benutzerdefinierten Error-Subklassen

## Entwicklungsworkflow
1. Vor Aenderungen bestehenden Code verstehen
2. Kleine Commits, jeder Commit eine logische Einheit
3. Nach Abschluss npm test ausfuehren zur Verifizierung

## Verboten
- Kein any-Typ verwenden
- Keine Testdateien loeschen
```

**Codebasis parallel erkunden**

Wenn du mit einem Projekt nicht vertraut bist, kannst du OpenCode bitten, mehrere Aspekte gleichzeitig zu durchsuchen:

> Bitte erledige gleichzeitig Folgendes:
> 1. Suche alle Stellen im Projekt, die HTTP-Anfragen verarbeiten
> 2. Finde datenbankbezogenen Code
> 3. Liste die Verzeichnisstruktur des Projekts und die Aufgaben jedes Moduls auf

OpenCode fuehrt diese Erkundungsaufgaben parallel aus und gibt dir eine vollstaendige Codebasis-Uebersicht auf einmal.

**Haeufige Probleme**

| Problem | Loesung |
|------|---------|
| `opencode`-Befehl nicht gefunden | npm-Globalverzeichnis nicht im PATH. Im Terminal ausfuehren: `[Environment]::SetEnvironmentVariable("Path", "$env:Path;$env:USERPROFILE\AppData\Roaming\npm", "User")` und Terminal neu starten |
| KI antwortet sehr langsam | Einfache Aufgaben mit quick-Kategorie (automatisches Routing zum schnellen Modell); bei zu langer Dialoghistorie neue Sitzung starten |
| API-Aufruf fehlgeschlagen | API-Key pruefen, Modellnamen-Schreibweise ueberpruefen (provider/model-name Format), Kontoguthaben pruefen |
| Skills nicht aktiv | SKILL.md-Dateiformat pruefen (YAML Frontmatter erforderlich), und description-Feld beschreibt genau die Ausloesebedingungen |
| Dialogkontext zu lang | Neue Sitzung starten oder Schluesselkonventionen in AGENTS.md definieren, damit auch neue Sitzungen sie erben |

## Weitere Verwendungsmoeglichkeiten von CLI KI-Programmierwerkzeugen

### KI fuer Anforderungen-Dokumente nutzen: Lerne, Anforderungen zu "konkretisieren"

Fuer grosse Sprachmodelle muessen abstrakte Anforderungen "konkretisiert" werden. Zum Beispiel: "Ich habe Hunger" ist eine abstrakte Anforderung. Wir muessen sie umwandeln in: "Ich habe ein wenig Hunger, moeglicherweise brauche ich ein Adzukibohnen-Brot, dazu ein Glas Sojamilch." -- Das ist eine ausfuehrbare, konkrete Anforderung.

Abstrakte Anforderungen zu konkretisieren, ist jedoch ein recht aufwendiger Prozess. Wenn wir nicht genug Beispiele gesehen haben, ist es schwer, schnell zu erkennen, wie man abstrakte Probleme in detaillierte Module aufteilen kann. In solchen Faellen ist der beste Ansatz, die KI die "Konkretisierung" fuer dich erledigen zu lassen.

Zum Beispiel, wenn ich eine "Taegliche Planung"-App entwickeln moechte, lautet der einfachste Gedanke vielleicht:

`Please help me write a daily planning app where I can write my plans each day and get reminders.`

Die KI kann auf Basis dieser Anforderung tatsaechlich Aufgaben aufteilen und schrittweise abschliessen, aber dabei ist es leicht, Fehler oder Verstaendnisdifferenzen zu geben. Um das Risiko zu minimieren, koennen wir die KI bitten, die Anforderungen zunaechst zu erweitern:

`Based on my needs, please elaborate and provide a more detailed Product Requirement Document for reference. My idea is: Please help me write a daily planner app that supports daily plan-writing and provides reminders .`

Die KI koennte dann ein vollstaendiges PRD aehnlich dem folgenden erstellen:

```
Product Requirements Document (PRD): "Today's Plan" App
Document Version: 1.0
Creation Date: October 27, 2023
Author: (Your Name/Product Manager)

1. Product Introduction
1.1 Product Name
Today's Plan
1.2 Product Vision
"Today's Plan" is a minimalist and highly efficient daily planning and reminder tool, dedicated to helping users eliminate procrastination and forgetfulness, plan every day clearly, and ensure tasks are carried out through an intelligent reminder system—ultimately enabling users to gain a stronger sense of control and achievement over their time.
1.3 Target Users (User Personas)
We mainly serve three types of users:
Students (Xiao Ming):
Characteristics: Multiple tasks such as courses, assignments, club activities, exam prep, needing organized time arrangement.
Pain Points: Easily forget small tasks or assignment deadlines; feel overwhelmed switching between tasks; want to build regular study and life habits.
Needs: A simple tool to list daily to-dos and provide reminders before class/self-study.
Office Workers (Zhang Wei):
Characteristics: Fast-paced work, many meetings, reports, project milestones, and personal affairs (fitness, picking up children).
Pain Points: Easily forget important meetings or work milestones; get interrupted by urgent tasks and forget the original plan; feel busy but inefficient at end of day.
Needs: Need a tool to quickly record and schedule daily work and send strong reminders at key times (e.g., 15 minutes before meetings).
Freelancers/Self-disciplined Seekers (Li Na):
Characteristics: High freedom of time, but strong self-management required for work output and personal growth.
Pain Points: Easily procrastinate, lack external supervision; start the day without a clear plan, leading to low time utilization.
Needs: Need a tool to help build a daily fixed routine (Morning Routine) and review daily achievements for positive feedback.

2. User Stories
As a user, I want to quickly create today's plan list so I have an overview of all my tasks for the day.
As a user, I want to set specific start and end times for each task so I can create a visual timeline.
As a user, I want to receive push notification reminders before a task starts so I won't miss any important arrangements.
As a user, I want to customize the reminder time (such as 5, 15, or 60 minutes in advance) so reminders better fit my habits.
As a user, I want to easily mark completed tasks so I can feel accomplished and clearly see my progress.
As a user, I want to see a summary of my completed plans at the end of each day for reviewing and self-motivation.
As a user, I want to conveniently edit and delete tasks to handle last-minute changes.
As a user, I want to view plans and achievements from previous days to review my efficiency and habits.

3. Feature Breakdown
Core Features (MVP - Minimum Viable Product)
Module 1: Plan Management
3.1.1 Daily Plan Homepage
Interface: "Today" as the core view, current date shown at the top.
View: Timeline list, clearly showing tasks scheduled from morning to evening. Tasks without a time can be listed in the top or bottom "To-do List" section.
Interactions:
Click the "+" button in the bottom right to quickly create a new task.
Pull down to refresh the page.
Swipe left/right to view yesterday's and tomorrow's plans.
3.1.2 Create/Edit Task
Entry: Click "+" on the homepage or a time slot in the list.
Fields:
Task title (required): Briefly describe the task, e.g., "10 AM Weekly Product Meeting."
Task time (optional):
Set "start time" and "end time."
Provide "all-day" option for unspecified time tasks.
Default time picker should be quick and convenient.
Reminder setting (required, with default value): See Module 2.
Notes (optional): Add further descriptions, links, or location info.
Actions: Save, cancel, delete task.
3.1.3 Task Interaction
Mark as complete: Checkbox before each task; checking adds a strikethrough and gray background, indicating completion. Can unmark if needed.
Edit task: Click the task itself to enter edit page.
Delete task: Swipe left on a task to reveal "Delete" button.
Module 2: Smart Reminder System
3.2.1 Reminder Trigger
Mechanism: Based on task's set "start time" and the user's "reminder lead time," send a push notification from device.
Offline Support: Locally scheduled reminders must trigger even if user is offline.
3.2.2 Reminder Content & Format
Notification title: App name "Today's Plan."
Body: "Reminder: [Task Title] will start at [Start Time]." E.g., "Reminder: Product Meeting will start at 10:00."
Sound: Use system default or offer several simple, effective tones.
3.2.3 Reminder Settings
Global Settings (in Settings page):
User can set a default reminder time, e.g., "15 minutes before task starts." New tasks adopt this by default.
Single Task Settings (in create/edit page):
Users can override global settings for important tasks, choosing specific reminder times like "on time," "5 minutes early," "30 minutes early," or "1 hour early."
Provide "no reminder" option.
Subsequent Features (V1.1, V2.0)
3.3 Daily Review & Statistics
Push a summary notification at a set time every night (e.g., 22:00): "How was your day? Take a look at your achievements!"
Generate a simple daily report card: shows total planned tasks, completed tasks, completion rate, plus an encouraging message.
3.4 History Review
Calendar view to click on any past day and check its plans and completion status. Days with high completion rates marked with a special color.
3.5 Templates
Allow users to save a successful daily plan as a template, e.g., "Efficient Workday," "Relaxing Weekend."
When creating tomorrow's plan, one-click import a template, modify slightly to save time.
3.6 Themes & Personalization
Offer dark mode.
Allow changing several primary color themes.

4. Non-Functional Requirements
4.1 Performance
Response: App launch time under 2 seconds; adding/editing tasks must be smooth and lag-free.
Resource Use: Low battery and memory consumption in background; do not over-consume resources waiting for reminders.
4.2 Usability
Minimal & intuitive: UI must be minimal, primary functions accessible within 3 clicks. No tutorial needed for new users.
Error tolerance: Offer undo (e.g. brief undo after mistakenly deleting a task).
4.3 Reliability
Reliable reminders: Reminder function is the product's lifeline; must guarantee 99.99% timely and accurate delivery.
Data loss-free: User plans must be reliably stored locally. Future versions can support cloud sync to prevent data loss on device change.
4.4 Compatibility
Platform: Support major iOS and Android versions (latest 3-4 releases).
Screen: Layout must fit various phone screen sizes.

5. Roadmap
V1.0 (MVP):
Goal: Validate core value—planning & reminders.
Features: Complete all "Core Features" described above (Plan management, smart reminders).
V1.1 (Quick Optimization):
Goal: Improve retention and achievement.
Features: Add "Daily Review & Statistics," "History Review."
V2.0 (Enhanced Experience):
Goal: Increase efficiency and personalization.
Features: Add "Templates," "Themes & Personalization," and start developing "Cloud Sync."
```

Im Vergleich zu unserem anfaenglichen "Hilf mir, eine App zu schreiben, mit der ich taeglich Plaene aufzeichnen und Erinnerungen erhalten kann", ist dieses Dokument jetzt deutlich detaillierter. Du kannst basierend auf deinen tatsaechlichen Beduerfnissen Inhalte hinzufuegen, loeschen oder aendern. Fuer Module, bei denen du unsicher bist, kannst du die KI auch bitten, weitere Alternativen vorzuschlagen, aus denen du dann waehlst und zur endgueltigen Version zusammenfuegst.

Auf diese Weise koennen wir abstrakte Ideen sehr leicht in konkrete Beschreibungen umwandeln. Fuer die KI-Entwicklung bedeutet "konkret" Produktivitaet: Je konkreter die Anforderungen, desto leichter ist es, ein strukturell stabiles und qualitativ hochwertiges Projekt zu erhalten. Du kannst versuchen, mit dieser Methode ein frueheres kleines Projekt neu zu erstellen und die Unterschiede im Ergebnis zu vergleichen.

Wenn du solche "Anforderungs-Prompts" als zu lang empfindest, ist es sehr natuerlich, sie in ein separates Markdown-Dokument zu schreiben, das als dein "Anforderungsdokument / Entwicklungsdokument / PRD" dient. Wenn die KI spaeter ein Projekt schreiben soll, genuegt es, sie auf "dieses Dokument zu referenzieren", anstatt jedes Mal den langen Prompt neu einzugeben. Du kannst dieses Dokument auch in Iterationen kontinuierlich verbessern, damit nachfolgende Projekte direkt davon profitieren.

Im Folgenden einige weitere haeufige Anwendungsszenarien:

### Ordner verwalten

Wir koennen versuchen, CLI KI-Programmierwerkzeuge zu nutzen, um verschiedene Dateien im aktuellen Ordner zu verwalten. Wenn du beispielsweise eine Reihe unordentlicher Dateien hast, die sortiert und kategorisiert werden muessen, kannst du Claude Code oder Codex sagen:

`Please help me organize the contents of the current folder. I want to group files with the same content together & I want to group files from the same time period together. Please help me handle this.`

### Neue Projekte entwickeln

Dies ist fast identisch mit unserer vorherigen Nutzung in z.ai und Trae -- wir koennen CLI KI-Programmierwerkzeuge auch direkt verwenden, um Projekte von Grund auf neu zu entwickeln. Natuerlich ist es am besten, im Voraus ein Anforderungsdokument vorzubereiten.

Je detaillierter das Anforderungsdokument, desto besser das Endergebnis. Du kannst das Dokument basierend auf deinen sich staendig aendernden Ideen in mehreren Runden optimieren; je vollstaendiger das Dokument, desto stabiler und reifer die Code-Implementierung.

### Open-Source-Projekte bereitstellen (z.B. Dify)

Fuer Studienanfaenger ist es oft schwierig, ein Open-Source-Projekt von GitHub bereitzustellen. Wir koennen diese Aufgabe jedoch vollstaendig Claude Code uebergeben, genauso wie wir es im Dify-Tutorial getan haben:

<https://github.com/langgenius/dify>

Wenn ich mein eigenes Dify lokal ausfuehren moechte, genuegt es, diesen Link an Claude Code zu senden und dann Folgendes einzugeben:

`I want to deploy this GitHub project ``https://github.com/langgenius/dify`` . Please help me clone the project and run it.`

Nach Erhalt deiner Anfrage wird Claude Code automatisch eine Reihe von Operationen durchfuehren, einschliesslich des Pullens des Codes von GitHub, der Konfiguration der Laufzeitumgebung und des Startens des Projekts. Wenn ein Zwischenschritt fehlschlaegt oder der Projektstart nicht normal ist, kannst du einige manuelle Korrekturen basierend auf den Hinweisen vornehmen. Neben Dify kannst du Claude Code auch bei der Bereitstellung der meisten gaengigen GitHub Open-Source-Projekte helfen -- du brauchst nur ein Dialogfeld und die Zeit fuer eine Tasse Kaffee.

![](/zh-cn/stage-2/backend/modern-cli/images/image31.png)

### Code erklaeren und Dokumentation schreiben

Bei einigen komplexen Projekten oder von der KI automatisch generierten grossen Projekten koennte der Code zu lang und die Logik zu vielschichtig sein, um ihn leicht zu verstehen. In solchen Faellen kannst du die CLI KI-Programmierwerkzeuge bitten, "Code zu lesen". Du kannst folgende Fragen stellen:

- Bitte erklaere mir dieses Projekt: Wie startet man es, wie verwendet man es, wie kann man es spaeter aendern und weiterentwickeln?
- Bitte erklaere mir den gesamten Ablauf dieses Projekts: Wie laeuft das Programm? Welche Operationen koennen Benutzer auf der Oberflaeche durchfuehren?
- Bitte schreibe eine vollstaendige Dokumentation fuer dieses Projekt, einschliesslich Entwicklungsdokumentation und Laufzeitdokumentation.
- Bitte schreibe basierend auf allen Inhalten in meinem aktuellen Ordner eine detaillierte Beschreibung und speichere sie in einem bestimmten Markdown-Dokument.

### Weitere Anwendungsmoeglichkeiten

Natuerlich koennen CLI KI-Programmierwerkzeuge weit mehr als das Obige. Betrachte sie nicht nur als "Code-Schreibwerkzeug", sondern als einen intelligenten Agenten mit unabhaengigem Handlungsvermoegen. Du kannst ihn bitten:

- Lokale Dateien zu verwalten und zu organisieren;
- Tagebuch zu schreiben, Zusammenfassungen zu erstellen;
- Systemfehler zu analysieren und zu beheben;
- Wiederkehrende Kommandozeilen-Aufgaben auszufuehren und vieles mehr.

Vielleicht wird es in naher Zukunft zu deinem wichtigsten und verstaendnisvollsten KI-Partner auf deinem Computer.
