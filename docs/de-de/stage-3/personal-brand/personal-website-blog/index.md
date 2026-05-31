# So baust du deine eigene persönliche Website und deinen akademischen Blog - Statische Bereitstellung mit GitHub Pages

# 1. Was ist eine persönliche Website und ein akademischer Blog?

In diesem Tutorial werden wir einen vollständigen geschlossenen Kreislauf durchlaufen: **vom Finden einer vorhandenen Website-Vorlage über die Umwandlung in eine persönliche Homepage für Elon Musk bis hin zur kostenlosen Online-Veröffentlichung**.

Für dieses Tutorial solltest du mindestens Folgendes haben:

* **Einen Computer** (Windows oder Mac)
* **Dein GitHub-Konto** (zur Speicherung des Website-Codes und für kostenloses Hosting)
* **Trae installiert** (dein AI-Coding-Partner)
* **Eine Git-Umgebung**
* **Eine Ruby-Umgebung**

## 1.1 Was ist eine akademische persönliche Homepage?

Eine **akademische persönliche Homepage** ist dein eigenes privates Territorium im Internet.

Im Gegensatz zu WeChat Moments, Zhihu oder LinkedIn ist sie nicht von dem Empfehlungsalgorithmus einer Plattform abhängig und verschwindet nicht, wenn eine Plattform geschlossen wird. Sie ist ein langfristiger, stabiler **persönlicher Präsentationsraum**, der von Google und Google Scholar indexiert werden kann. Sie enthält normalerweise deine Biografie, Veröffentlichungen, Projekte und deinen technischen Blog.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image1.png)

## 1.2 Warum eine eigene Website erstellen?

Im Vibe Coding-Entwicklungsmodell müssen wir nicht mehr wie die Leute vor zehn Jahren dicke HTML/CSS-Bücher durcharbeiten. Mit AI wandelt sich die Rolle beim Website-Bauen vom „ringenden Programmierer" zum „Chefredakteur der Website":

1. **Du (Redakteur / PM)**: bestimmst den Ton und den Inhalt der Website. Zum Beispiel: „Musks Mars-Kolonisations-PPT hier platzieren" oder „Diesen Button in Tesla-Rot ändern."
2. **Trae (AI-Ingenieur)**: übernimmt die harte Umsetzungsarbeit. Er verwandelt deine Anweisungen in natürlicher Sprache in Code, einschließlich Layout, Farbschemata und mobiler Anpassung.
3. **GitHub Pages (Showroom)**: bietet einen kostenlosen Server und eine Domain, damit Menschen auf der ganzen Welt deine Arbeit sehen können.

**Warum ist es für Akademiker oder technische Personen wertvoll?**

* **Nach außen (Einflussaufbau)**: sie ist eine **„immergrüne Visitenkarte."** Bei Bewerbungen für Promotionsprogramme, Jobs oder Kooperationen ist eine ordentliche persönliche Homepage oft viel überzeugender als ein PDF-Lebenslauf.
* **Nach innen (Wissensaufbau)**: sie ist dein **„zweites Gehirn."** Du kannst sie nutzen, um Kursnotizen, technische Überlegungen aufzuzeichnen und dein eigenes Wissenssystem aufzubauen.
* **Für die Zukunft (entdeckt werden)**: Suchmaschinen mögen strukturierte Inhalte. Mit einer Homepage kann, wenn Menschen deinen Namen suchen, **der von dir definierte Inhalt** zuerst erscheinen, anstatt unverwandter Personen mit demselben Namen.

## 1.3 Vier typische Wege zum Bau einer persönlichen Website

In der Praxis gibt es unzählige Möglichkeiten, eine Website zu bauen. Hier stellen wir nur die vier gängigsten vor:

**Methode 1: Von Grund auf mit HTML / CSS / JS selbst schreiben**
Dies ist der traditionelle Informatik-Weg. Du schreibst den Code Zeichen für Zeichen. Der Vorteil ist extreme Flexibilität. Der Nachteil ist eine sehr hohe Einstiegshürde, und man bleibt leicht beim CSS-Tweaking hängen. Nicht ideal für diejenigen von uns, die sich auf den Inhalt konzentrieren wollen.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image2.png)

**Methode 2: Visuelle Website-Baukästen wie Wix / WordPress**
Das ist wie Bauen mit Bausteinen. Der Vorteil ist einfaches Drag-and-Drop-Bearbeiten. Der Nachteil ist, dass es oft kostenpflichtig ist, dazu neigt, aufgeblähten Code zu erzeugen, ein akademisches Geek-Feeling vermissen lässt und schwer tiefgehend anzupassen ist.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image3.png)

**Methode 3: GitHub-basierte Vorlagen (Static Site Generators)**
Dies ist der **empfohlenste** Mainstream-Weg in akademischen und Geek-Communitys. Wir forken direkt eine ausgereifte Vorlage, die von anderen geschrieben wurde, wie z.B. eine basierend auf Jekyll oder Hugo, und ändern dann nur die Konfigurationsdateien und Inhalte.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image4.png)

**Methode 4: Vibe Coding (KI-gestützter visueller Generierungsworkflow)**
Mit AI-Agenten, die über starke multimodale visuelle Wahrnehmung verfügen, musst du nur einen Website-Stil sehen, der dir gefällt, einen Screenshot machen und der AI sagen: „Schreibe mir eine Webseite in diesem Stil." Die AI kann dann die visuellen Elemente analysieren und den zugrunde liegenden Code für dich generieren.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image5.png)

**Die Wahl in diesem Tutorial: GitHub Pages + akademische Vorlage + AI-Änderungen.**
Der Grund ist einfach:

* **Keine Kosten**: kein Serverkauf, kein Domainkauf nötig.
* **Hohe Qualität**: Vorlagen werden oft von Top-Entwicklern gestaltet, mit minimalistischem Stil, professioneller Struktur und schnellem Laden.
* **Einfach zu pflegen**: du schreibst hauptsächlich Markdown, ähnlich wie in Feishu Docs oder Notion, und AI hilft beim Generieren der Webseite.

## 1.4 Die komplette Roadmap dieses Tutorials

Um den Konfigurationsprozess intuitiver und weniger langweilig zu gestalten, werden wir einen lustigen Fall verwenden: **den Bau einer akademischen Homepage für Musk**.

Obwohl Elon Musk kein Universitätsprofessor ist, hat er viele öffentliche „technische Whitepapers" veröffentlicht, wie z.B. *Hyperloop Alpha*, und hat auch viele berühmte Projekte wie SpaceX und Tesla. Wir werden diese Materialien als Testdaten verwenden und gemeinsam mit Traes Vibe Coding-Workflow eine wiederverwendbare Website-Bau-Route durchlaufen:

1. **Das Gerüst finden**: eine hochwertige Website-Vorlage auf GitHub finden und in dein eigenes Repository forken.
2. **Umgebung vorbereiten**: den Code lokal herunterladen und Trae konfigurieren, damit die AI dein Projekt lesen kann.
3. **Mit AI iterieren**: die Platzhalterperson der Vorlage durch Elon Musk ersetzen, seinen Lebenslauf hochladen, die „Veröffentlichungsliste" in eine „technische Whitepaper-Showcase" umwandeln und die AI sogar bitten, die Website in „Mars-Rot" umzufärben.
4. **Online bereitstellen**: den geänderten Code zurück zu GitHub pushen und sofort eine zugängliche Website-URL erhalten.

Dieser Abschnitt ist nur für das große Gesamtbild zuständig. Merke dir vorerst nur die Hauptlinie:
**Vorlage forken -> AI-Umbau -> online pushen**
In den folgenden Abschnitten werden wir jeden Schritt gemeinsam durchgehen.

# 2. Umgebungsvorbereitung

## 2.1 In diesem Tutorial verwendete Werkzeuge

Der gesamte Bauprozess verwendet vier Werkzeuge oder Ressourcen, von denen jedes die Rolle eines Designers, Bauunternehmers, Grundstückseigentümers oder Logistiksystems spielt.

* **Ein Computer**: Windows oder Mac ist in Ordnung. Im Gegensatz zur Android-Entwicklung, die oft hohe Speicheranforderungen stellt, ist Web-Entwicklung sehr ressourcenschonend und läuft auf einem gewöhnlichen Büro-Laptop reibungslos.
* **Trae**: dies ist dein **AI-Coding-Partner** und dein zentrales Produktivitätstool. Im Vibe Coding-Modus musst du keine HTML- oder CSS-Syntax beherrschen. Du sagst der AI hauptsächlich in natürlicher Sprache, was du willst, wie z.B. „Ändere die Navigationsleiste in Schwarz" oder „Setze Musks Foto hier hin," und lässt sie den Code für dich schreiben und ändern.
* **Ein GitHub-Konto**: dies ist dein **kostenloser Server und Code-Tresor**. Wir benötigen es, um alle Website-Dateien zu speichern. Das Wichtigste ist, dass wir **GitHub Pages** nutzen werden, um den Code in eine weltweit zugängliche URL umzuwandeln – kostenlos und ohne Server- oder Domainkauf.
* **Git-Umgebung**: das ist der **Kurier** hinter den Kulissen. Obwohl wir den Code lokal in Trae schreiben, ist es Git, das den Code von deinem Computer zu GitHub pusht. Du musst keine Git-Befehle beherrschen, und Trae kann helfen, sie aufzurufen, aber Git muss zuerst installiert sein.
* **Ruby-Umgebung**: das ist die lokale **Webseiten-Werkstatt**. Da die akademische Vorlage in diesem Tutorial Jekyll verwendet, das auf Ruby läuft, benötigen wir Ruby lokal, damit wir die Website auf unserem eigenen Computer in der Vorschau anzeigen können, bevor wir sie online stellen.

## 2.2 Trae herunterladen

**Trae** ist unser Hauptschlachtfeld für Vibe Coding. Du kannst es dir als einen **Code-Editor mit einer eingebauten Super-AI** vorstellen. Im Gegensatz zu traditionellen, kühlen Editoren ist es wie ein erfahrener Programmierer, der neben dir sitzt und immer bereit ist zu helfen.

* **Download-Adresse**: besuche die offizielle Website [https://www.trae.cn](https://www.trae.cn) und lade die Version für dein Betriebssystem herunter, Windows oder Mac.
* **Installation**: die Installation ist sehr einfach, genau wie bei der Installation von WeChat oder QQ. Doppelklicke auf das Installationspaket und klicke auf „Weiter", bis es abgeschlossen ist.

Nachdem du dieses Werkzeug vorbereitet hast, werden wir in den folgenden praktischen Schritten nicht auf langweige Code-Fenster starren müssen. Wir öffnen das Projekt direkt hier und nutzen das Chat-Panel auf der rechten Seite, um der AI in natürlicher Sprache zu sagen, dass sie uns beim Code-Schreiben, Fehlerbeheben und sogar beim Umstrukturieren ganzer Seiten helfen soll.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image6.png)

## 2.3 Git herunterladen

**Was ist Git?**
Wenn Trae der AI-Ingenieur ist, der im Vibe Coding für das Schreiben von Code verantwortlich ist, dann ist **Git der Kurier, der für den Transport von Code verantwortlich ist**. Du benötigst es, um den auf deinem Computer geschriebenen Code zu verpacken und sicher zu GitHub, deinem Cloud-Repository, zu pushen. Ohne es läuft deine Website nur auf deinem eigenen Rechner und niemand sonst kann sie sehen.

Früher musste man zur offiziellen Website gehen, das Installationsprogramm herunterladen und Umgebungsvariablen manuell konfigurieren. Das war nervig. Jetzt können wir einfach Trae helfen lassen, es zu erkennen und zu installieren.

**Schritt 1: Überprüfen, ob Git bereits installiert ist**

Öffne Trae und gib die folgende Anweisung im Chat-Panel unten rechts ein:

```markdown
Bitte hilf mir zu überprüfen, ob Git bereits auf diesem Computer installiert ist. Bitte führe den Befehl `git --version` im Terminal aus.
```

* **Fall A (bereits installiert)**: wenn du etwas wie `git version 2.xx.x` siehst, herzlichen Glückwunsch. Du kannst den Installationsschritt direkt überspringen.
* **Fall B (nicht installiert)**: wenn du „command not found" oder eine Gruppe roter Fehlermeldungen siehst, fahre unten fort.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image7.png)

**Schritt 2: AI-gestützte Installation**

Schließe Trae nicht. Tippe weiter im Chat-Panel:

**Anweisung (Windows-Benutzer):**

```markdown
Ich habe Git nicht installiert. Bitte schreibe den Befehl, der das Kommandozeilen-Tool `winget` verwendet, um Git automatisch zu installieren, und sage mir, wie ich es im Terminal ausführe.
```

**Anweisung (Mac-Benutzer):**

```markdown
Ich habe Git nicht installiert. Bitte sage mir, wie ich Git schnell über Terminal-Befehle installieren kann, zum Beispiel mit `git` oder `brew`.
```

Trae wird dir einen Befehl geben, oft etwas wie `winget install --id Git.Git`.

Du musst nur auf die Schaltfläche **Im Terminal ausführen** im Code-Block klicken oder es in das Terminal unten kopieren und Enter drücken. Es wird Git automatisch für dich herunterladen und installieren.

Wenn du das Gefühl hast, dass der AI-gestützte Prozess nicht perfekt genug ist, kannst du dieses Tutorial für den manuellen Download und die Installation konsultieren:
[Git Download- und Installations-Tutorial](https://blog.csdn.net/weixin_41293671/article/details/144255269?ops_request_misc=elastic_search_misc&request_id=63236900b52320a7beb177787ba97f07&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~baidu_landing_v2~default-5-144255269-null-null.142^v102^pc_search_result_base4&utm_term=git%E4%B8%8B%E8%BD%BD%E5%AE%89%E8%A3%85&spm=1018.2226.3001.4187)

## 2.4 Die Ruby-Umgebung installieren

Bevor wir offiziell mit dem Code-Schreiben beginnen, benötigen wir noch das letzte Puzzleteil. Die in diesem Tutorial verwendete akademische Homepage-Vorlage wurde mit Jekyll erstellt, das selbst auf der Programmiersprache Ruby basiert.

Um den „Renovierungseffekt" auf dem eigenen Computer in der Vorschau anzuzeigen und zu debuggen, bevor der Code zu GitHub für die weltweite Veröffentlichung gepusht wird, müssen wir eine Ruby-Umgebung auf dem Computer installieren. Stell dir das so vor, als würdest du einen Dolmetscher auf deinem Computer einstellen, der Ruby versteht. Keine Sorge, du musst nicht lernen, Ruby zu schreiben. Du musst es nur installieren, und Trae kann den Rest erledigen.

### 2.4.1 Windows-Installation

**Schritt 1: Das Installationsprogramm über einen inländischen Mirror herunterladen**

Für Windows-Benutzer bietet die offizielle Website unter https://rubyinstaller.org/downloads/ Ein-Klick-Installationsprogramme an, aber aufgrund von Netzwerkunterschieden hilft es, einen Trick zu kennen. Die offizielle Empfehlung für Anfänger ist normalerweise **`Ruby+Devkit 3.X.X (x64)`**, da es die erforderliche Toolchain enthält.

**Hinweis für Anfänger**: in der Praxis kann der direkte Download von der offiziellen Website langsam sein oder fehlschlagen. Wir empfehlen dringend die Verwendung des inländischen Mirrors unter [RubyInstaller für Windows - China-Mirror](https://rubyinstaller.cn/), der normalerweise viel schneller ist.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image8.png)

**Schritt 2: Die Installation ausführen**

Doppelklicke auf das heruntergeladene Installationsprogramm. Stelle im Setup-Assistenten sicher, dass du **„Add Ruby executables to your PATH"** anhakst. Dies ist der wichtigste Schritt. Andernfalls wird der Computer den gerade installierten Dolmetscher nicht „finden" können.

Nach dem Anhaken klicke weiter auf **Next**, um die Installation abzuschließen.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image9.png)

**Schritt 3: Das Entwicklungs-Toolkit konfigurieren**

Wenn der Installationsfortschritt abgeschlossen ist, öffnet sich automatisch ein schwarzes Kommandozeilenfenster. Keine Panik. Tippe die Zahl `3` ein, wo der Cursor blinkt, was bedeutet, dass die MSYS2-Basisumgebung und die MINGW-Toolchain installiert werden, und drücke dann Enter. Warte, bis die Befehle abgeschlossen sind und sich das Fenster automatisch schließt.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image10.png)

**Schritt 4: Das Ergebnis überprüfen**

Jetzt ist es an der Zeit, die AI bitten, deine Hausaufgaben zu überprüfen. Öffne Trae und gib die folgende Anweisung in natürlicher Sprache im rechten Chat ein:

```markdown
Bitte hilf mir zu überprüfen, ob die Ruby-Umgebung auf diesem Computer korrekt installiert wurde. Bitte führe den Befehl `ruby -v` im Terminal unten aus und sage mir das Ergebnis.
```

Wenn Trae mit etwas wie `ruby 3.x.x` antwortet, ist deine Windows-Ruby-Umgebung vollständig eingerichtet.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image11.png)

### 2.4.2 Mac-Installation

Das Konfigurieren einer Mac-Umgebung fühlt sich „geekiger" an, da es normalerweise Terminal-Befehle erfordert. Aber im Vibe Coding-Modus müssen wir nicht einmal das Terminal manuell öffnen. Wir können einfach Trae als unseren persönlichen IT-Operator fungieren lassen.

**Schritt 1: Die One-Shot-Umgebungseinrichtungsanweisung geben**

Öffne Trae und füge die folgende Anweisung in natürlicher Sprache in den Chat auf der rechten Seite ein. Wir werden es bitten, Homebrew zu überprüfen, es bei Bedarf zu installieren und dann Ruby zu installieren:

```markdown
Ich verwende einen Mac-Computer und muss eine Ruby-Entwicklungsumgebung konfigurieren. Bitte hilf mir, die folgenden Schritte abzuschließen:
1. Überprüfe, ob Homebrew bereits installiert ist. Wenn nicht, führe bitte das offizielle Homebrew-Installationsskript im Terminal aus.
2. Nachdem bestätigt wurde, dass Homebrew bereit ist, führe `brew install ruby` im Terminal aus.
3. Wenn alles fertig ist, führe `ruby -v` aus, um zu bestätigen, dass die Installation erfolgreich war.
Bitte führe mich Schritt für Schritt und stelle bei Bedarf Terminal-Befehle bereit, die ich direkt anklicken und ausführen kann.
```

Nach Erhalt der Anweisung beginnt Trae zu arbeiten und zeigt Code-Blöcke mit Ausführen-Schaltflächen im Chat-Panel an.

**Wichtiger Hinweis für Anfänger**

Bei der Installation von Homebrew fordert das Terminal oft etwas wie `Password:` auf und fragt nach deinem Mac-Anmeldepasswort.

**Hinweis:** Wenn du ein Passwort im Mac-Terminal eingibst, werden auf dem Bildschirm keine Zeichen oder Sterne angezeigt. Das ist normal. Tippe dein Passwort blind ein und drücke Enter.

**Schritt 2: Das Ergebnis überprüfen**

Gehe nach der Installation zurück zu Trae und tippe:

```markdown
Ich habe gerade Ruby auf diesem Mac über `brew` installiert. Bitte hilf mir, den Befehl `ruby -v` im Terminal auszuführen und zu überprüfen, ob die Installation und die Umgebungsvariablen korrekt sind.
```

Wenn du etwas wie `ruby 3.x.x` im Terminal siehst, ist die lokale Webseiten-Werkstatt bereit und dein Mac ist für Vibe Coding vorbereitet.

## 2.5 Ein GitHub-Konto registrieren

**Was ist GitHub?**
Wenn Git der Kurier ist, dann ist **GitHub das Cloud-Lager und der Showroom**. Es hostet nicht nur deinen Code kostenlos, sondern was noch wichtiger ist: mit **GitHub Pages** kann es deinen Code in eine weltweit zugängliche Website-URL umwandeln. Es ist auch die weltweit größte Code-Hosting-Plattform, und ein GitHub-Konto zu haben, ist eine Art Reisepass in die technische Welt.

**Registrierungsschritte:**

1. **Offizielle Website besuchen**: öffne [https://github.com/](https://github.com/).
2. **Auf Sign up klicken**: klicke auf **„Sign up"** in der oberen rechten Ecke.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image12.png)

3. **Deine Informationen ausfüllen**
4. **E-Mail**: gib eine echte E-Mail-Adresse ein.
5. **Passwort**: wähle ein starkes Passwort.
6. **Benutzername (wichtig!)**: **wähle sorgfältig**. Deine Homepage-URL wird später **`https://dein-benutzername.github.io`** lauten. Am besten verwendest du deinen englischen Namen, Pinyin, eine vertraute ID oder eine einfache Kombination aus Buchstaben und Zahlen. Wähle **nicht** etwas wie `a1b2c3d4`, da dein Website-Link sonst schwer zu merken ist.
7. **Verifizierung und Aktivierung**: schließe die menschliche Verifizierung ab, oft Bilddrehungen oder das Auswählen von Spiralgalaxien, und überprüfe dann deine E-Mail auf den Verifizierungscode.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image13.png)

Sobald die Registrierung abgeschlossen ist, hast du ein eigenes Grundstück im Internet. Im nächsten Abschnitt werden wir beginnen, auf diesem Grundstück zu bauen.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image14.png)

# 3. Von der Vorlage zu deiner ersten zugänglichen Seite

Alles ist bereit. In den ersten beiden Kapiteln haben wir die Werkzeuge vorbereitet. In diesem Kapitel werden wir offiziell Land im Internet beanspruchen. Die Aufgabe in diesem Kapitel ist einfach:
**Mach dir noch keine Gedanken über Dekoration oder Inhalt. Baue zuerst das Gerüst der Website und hole dir einen funktionierenden Zugriffslink.**

Wir werden direkt eine ausgereifte akademische Vorlage forken und die GitHub Pages-Automatisierung nutzen, um sie innerhalb von zwanzig Minuten zum Laufen zu bringen. Wenn du fertig bist, hast du einen weltweit zugänglichen Link.

## 3.1 Eine Website-Vorlage finden

Im Vibe Coding-Modus müssen wir nicht von Grund auf HTML schreiben. GitHub hat Tausende von hervorragenden Open-Source-Vorlagen. Wir müssen nur eine „ausleihen" und den Namen in unseren eigenen ändern.

**Schritt 1: Eine Vorlage finden**

Hier haben wir eine klassische Vorlage mit klarer Struktur und starker Eignung für akademische Präsentation ausgewählt:
https://github.com/luost26/academic-homepage?tab=readme-ov-file
Diese Vorlage basiert auf dem Jekyll-Framework.

Natürlich kannst du auch auf GitHub nach **`academic-homepage`** suchen und einen anderen Stil auswählen, der dir gefällt. Um diesem Tutorial zu folgen, wird jedoch empfohlen, zuerst die obige Vorlage zu verwenden.

Wir haben auch mehrere zusätzliche Vorlagenempfehlungen für dich vorbereitet:

* Minimal Light persönliche Homepage-Thema: https://github.com/yaoyao-liu/minimal-light?
* Minimal Mistakes: [https://github.com/mmistakes/minimal-mistakes](https://github.com/mmistakes/minimal-mistakes?utm_source=chatgpt.com)
* Pixyll: https://github.com/johno/pixyll
* Hydejack: https://github.com/hydecorp/hydejack
* Forty Jekyll Theme: https://github.com/andrewbanchich/forty-jekyll-theme
* Leonids: https://github.com/github.com/renyuanz/leonids
* YAT: https://github.com/jeffreytse/jekyll-theme-yat

**Schritt 2: Das Projekt forken**

Besuche die Homepage des Ziel-Repositorys und klicke auf die Schaltfläche **Fork** in der oberen rechten Ecke. Ein Bestätigungsdialog wird angezeigt. Klicke direkt auf **Create Fork**.

* Erklärung: dieser Schritt entspricht dem Kopieren des Code-Repositorys einer anderen Person mit einem vollständigen Schlüsselsatz in dein eigenes GitHub-Konto. Jetzt besitzt du deine Kopie der Website.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image15.png)

**Schritt 3: Das Repository umbenennen, der wichtigste Schritt**

Ändere den Repository-Namen in:
`dein-benutzername.github.io`

**Wichtiger Hinweis für Anfänger**:
Dies ist eine feste Regel von GitHub Pages.
Wenn dein GitHub-Benutzername zum Beispiel `musk-fan` ist, dann muss der Repository-Name **zwingend** `musk-fan.github.io` lauten.
Nur so wird GitHub dir automatisch eine kostenlose Domain zuweisen. Wenn der Name falsch ist, wird die Webseite später nicht geöffnet.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image16.png)

## 3.2 Die GitHub-Projekt-URL abrufen

Nach dem Umbenennen benötigen wir den Abholbeleg des Repositorys.

1. Kehre zur Repository-Homepage zurück, unter dem Tab **Code**.
2. Klicke auf die grüne Schaltfläche **Code**.
3. Stelle sicher, dass der Tab **HTTPS** ausgewählt ist.
4. Klicke auf die Kopieren-Schaltfläche und kopiere die URL, die auf `.git` endet, zum Beispiel `https://github.com/musk-fan/musk-fan.github.io.git`.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image17.png)

## 3.3 Das Projekt lokal herunterladen

Früher mussten Programmierer komplexe Git-Befehle in einem schwarzen Terminal eingeben, um Code herunterzuladen. Im Vibe Coding-Zeitalter haben wir Trae. Wir müssen der AI nur sagen: „Ich will das, hilf mir, es herunterzuladen."

**Schritt 1: Vorbereitung**

Erstelle einen neuen Ordner auf deinem Computer, zum Beispiel `MyWebsite`, dann Rechtsklick und **Mit Trae öffnen** wählen, oder öffne zuerst Trae und wähle **Ordner öffnen**.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image18.png)

**Schritt 2: Den Clone-Befehl geben**

Nachdem Trae geöffnet ist, rufe das AI-Chat-Panel auf der rechten Seite auf und gib die folgende Anweisung in natürlicher Sprache ein:

```text
Bitte hilf mir, das Remote-GitHub-Repository in den aktuellen Ordner zu klonen.
Repository-Adresse: füge die gerade kopierte URL ein, zum Beispiel https://github.com/musk-fan/musk-fan.github.io.git
Ausführungsanforderung: bitte führe den Befehl `git clone` direkt im Terminal aus.
```

**Schritt 3: Den Download bestätigen**

Trae wird automatisch das Terminal unten aufrufen und den Befehl ausführen. Warte einige Sekunden. Wenn du Dateien wie `_config.yml` und `index.html` im Dateibaum links erscheinen siehst, wurde das Projekt erfolgreich auf deinen Computer verschoben.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image19.png)

## 3.4 Die Webseite lokal in der Vorschau anzeigen

Der Code ist auf deinem Rechner und die Ruby-Umgebung ist bereit. Bevor wir die Website ändern, müssen wir sie zuerst lokal auf unserem eigenen Computer inspizieren. Das ist wie bei einer Renovierung: du richtest zuerst alles im Showroom ein, bestätigst, dass es gut aussieht, und machst es erst dann öffentlich.

Dank der in **Abschnitt 2.4** installierten Ruby-Umgebung ist das jetzt sehr einfach.

**Schritt 1: Abhängigkeiten installieren**

Eine Jekyll-Website hängt von vielen Gems ab, um zu laufen. Das ist, als ob man die gesamte Möbelliste abarbeite. **Aber** aufgrund der Netzwerkbedingungen können direkte Downloads stecken bleiben. Wir werden Trae bitten, **zu einem inländischen Mirror zu wechseln** und die Abhängigkeiten von dort zu installieren.

Gib in Traes Chat-Feld ein:

```markdown
Ich muss die Jekyll-Abhängigkeiten installieren. Berücksichtige die Netzwerkumgebung und ändere zuerst die `source` in der Gemfile in den inländischen Mirror `https://gems.ruby-china.com/`. Führe danach bitte den Befehl `bundle install` im Terminal aus, um alle Abhängigkeiten zu installieren.
```

**Schritt 2: Den lokalen Dienst starten**

Jetzt werden wir einen **lokalen Server** starten, um die Website-Ausführung zu simulieren. Fahre fort und sage Trae:

```markdown
Die Abhängigkeiten wurden installiert. Bitte hilf mir, den Jekyll-lokalen Vorschaudienst im Terminal zu starten. Bitte führe den Befehl `bundle exec jekyll serve` aus.
```

Nachdem das Terminal einige Sekunden gelaufen ist, wirst du etwas Ähnliches sehen wie:
`Server address: http://127.0.0.1:4000/academic-homepage/`

1. **Browser öffnen**: klicke auf diesen Link oder gib ihn direkt in deinen Browser ein:
   `http://127.0.0.1:4000/academic-homepage/`
2. **Die Magie sehen**: jetzt läuft deine Website bereits im Browser. Obwohl sie noch den Namen des ursprünglichen Vorlagen-Autors anzeigt, läuft sie bereits lokal auf deinem Computer.

Von diesem Punkt an wird sich, wenn du Inhalte änderst und `Ctrl+S` drückst und dann den Browser aktualisierst, **der Webseiten-Inhalt entsprechend ändern**.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image20.png)

Sobald die lokale Vorschau funktioniert, können wir ins nächste Kapitel eintreten und damit beginnen, die Website in etwas umzuwandeln, das wie Elon Musk aussieht.

# 4. AI-gestützte Inhaltsänderung

Um allen zu helfen, schnell den vollständigen Prozess zu erleben, werden wir nicht unsere eigenen persönlichen Informationen verwenden, um Privatsphäre-Angst zu vermeiden. Stattdessen werden wir **Elon Musk als Beispiel** verwenden und eine akademische Homepage für ihn erstellen. Dies ermöglicht es uns, den langweiligen Druck eines persönlichen Lebenslaufs fallen zu lassen und uns auf den Spaß am Vibe Coding für Websites zu konzentrieren. Es lässt uns auch sehen, wie cool es ist, die „technischen Whitepaper" eines Silicon-Valley-Eisenmanns wie *Hyperloop Alpha* auf einer akademischen Website zu platzieren.

Wir werden den vollständigen Kreislauf von **Vorlage erhalten** bis **Website veröffentlichen** durchlaufen und eine erstklassige persönliche Präsentationsplattform eigenhändig erstellen.

Folge meinem Tempo und sende die erste Anweisung an die AI.

## 4.1 Einheitliche globale Einschränkungen

Dies ist die **globale Setup-Anweisung**. Du musst sie nur einmal senden.
Ihr Zweck ist es, Regeln für die AI festzulegen, um zu verhindern, dass sie improvisiert und die Website-Struktur beschädigt. Kopiere sie direkt in Trae:

```text
Du bist jetzt der Betreiber einer „GitHub Pages + Jekyll akademischen Homepage-Vorlagen"-Website.
Das aktuelle Repository ist eine Jekyll-betriebene akademische Homepage (einschließlich `_config.yml`, `_data`, `_layouts` usw.).
Deine Änderungen müssen folgenden Prinzipien folgen:
1. Jeder Schritt sollte nur das aktuelle Etappenziel lösen. Führe keine späteren Inhalte im Voraus aus.
2. Ändere nicht die Website-Struktur, führe keine neuen Plugins ein und ändere nicht den Themenstil.
3. Alle Inhalte müssen von Jekyll ohne Fehler darstellbar sein.
4. Alle Identitätsinformationen müssen einem „akademischen Simulations"-Ton folgen und dürfen keine Ich-Perspektive verwenden.
5. Erfinde keine offensichtlich gefälschten IEEE / Nature-Papiere.
6. Wenn Informationen unsicher sind, verwende „öffentlich bekannte Fakten" oder „angemessene akademische Simulationskennzeichnung."
```

## 4.2 Musks Homepage erstellen, der Inhaltsteil

### 4.2.1 Erste globale Anweisung: die Identität ersetzen

Das Erste, was wir lösen müssen, ist „Wer bin ich?" Die Vorlage ist mit den Informationen des ursprünglichen Autors gefüllt, und wir müssen sie in einem Zug mit AI ersetzen.

**Schritt 1: Die Assets vorbereiten**

Lege die von mir bereitgestellten Bild-Assets, `University_of_Pennsylvania.jpg` und `Queen_University.jpg`, in den entsprechenden Projektordner, normalerweise `/assets/images/badges/`.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image21.png)
![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image22.png)

**Schritt 2: Die Anweisung senden**

Gib in Traes rechtem Chat-Feld die folgende Anweisung ein. Beachte, dass wir keine Zeilen manuell suchen und bearbeiten müssen. Wir sagen der AI einfach, was wir wollen:

```text
1. Ziel: Ersetze die „Personenidentität" der aktuellen akademischen Homepage durch Elon Musk. Ändere nur die grundlegenden Profilinformationen.
2. Spezifische Anforderungen:
1. Name: Elon Musk
2. Berufliche Identität:
    Technologischer Unternehmer
    Ingenieur
    Gründer & CEO von SpaceX
    CEO von Tesla, Inc.
3. Ausbildung:
    Queen's University (Physik und Wirtschaft, nicht abgeschlossen) (Bildpfad: /assets/images/badges/Queen_University.jpg)
    University of Pennsylvania (B.S. in Physik, B.A. in Wirtschaft) (Bildpfad: /assets/images/badges/University_of_Pennsylvania.jpg)
4. Forschungsinteressen (können simuliert werden als):
    Raumfahrtsystemtechnik
    Nachhaltige Energiesysteme
    Künstliche Intelligenz & Robotik
    Groß angelegte technologische Innovation
5. Auszeichnungen & Ehrungen:
    Time-Person des Jahres (2021)
    Fellow of the Royal Society (FRS)
    Gelistet in Forbes Milliardäre (mehrere Jahre)
6. Einschränkungen:
    Füge keine Papiere / Veröffentlichungen hinzu
    Erfinde keine IEEE-, Nature- oder Science-Papiere
    Verwende akademische Formulierungen und vermeide kommerziellen Werbeton
    Behalte die ursprüngliche Feldstruktur bei und ersetze nur den Inhalt
```

An diesem Punkt kannst du sehen, dass Trae alle unsere Änderungsanforderungen abgeschlossen hat.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image23.png)

**Schritt 3: Den lokalen Browser aktualisieren**

Aktualisiere jetzt den lokalen Browser und du solltest sehen, dass alles korrekt ersetzt wurde.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image24.png)

### 4.2.2 Iterative Verbesserung: „Papiere" und Projekte hinzufügen

Da Elon Musk kein traditioneller Universitätsprofessor ist, veröffentlicht er selten Papiere in *Nature* oder *Science*. Aber als „Chefingenieur" hat er viele hochgradig technische **Whitepaper** und **Masterpläne** veröffentlicht.

Im Kontext einer akademischen Homepage können wir die Bedeutung von „Publications" als **„Technische Whitepaper & Visionäre Pläne"** neu definieren. Das ist überhaupt nicht unpassend. Tatsächlich passt es sehr gut zu seiner Identität als Erbauer.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image25.png)

**Schritt 1: Die Assets vorbereiten**

Lade die von mir bereitgestellten Cover-Bilder herunter, nämlich `Hyperloop_Alpha_sketch.jpg`, `SpaceX_Starship.jpg` und `Neuralink_sewing_machine_robot.jpg`, platziere sie unter `/assets/images/covers/` und entferne die ursprünglich in diesem Ordner enthaltenen Beispielbilder.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image26.png)
![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image27.png)
![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image28.png)

**Schritt 2: Die Anweisung senden**

Sende die folgende Anweisung an Trae und lass sie uns helfen, die Datenstruktur neu aufzubauen:

```text
1. Rolleneinstellung: Du bist ein Static-Site-Entwicklungsexperte, der Jekyll und Liquid-Syntax beherrscht.
2. Aufgabenziel:
Ändere den Abschnittstitel auf der Homepage oder in der Navigationsleiste.
Die aktuelle Dateistruktur ist nach Jahresunterordnern organisiert, zum Beispiel `_publications/2023/xxx.md`.
Erstelle drei neue Markdown-Dateien im angegebenen Format, um Elon Musks technische Whitepaper und visionäre Pläne anzuzeigen.
3. Spezifische Schritte und Anforderungen:
1. Abschnittstitel ändern
    Suche global nach dem String „Selected Publications" (kann in `index.html`, `_config.yml` oder `_pages/publications.md` erscheinen).
    Ersetze es durch: „Technical White Papers & Visionary Plans".
2. Veröffentlichungsdaten neu aufbauen (kritischer Schritt)
    Lösche alle alten Inhalte unter dem `_publications`-Ordner, einschließlich alter Jahresordner wie 2023 und 2024.
    Erstelle drei neue Ordner: `_publications/2013/`, `_publications/2017/` und `_publications/2019/`.
    Erstelle in diesen Ordnern die folgenden drei Markdown-Dateien.
3. Befolge streng dieses Dateiformat
Wichtig: Du musst streng das folgende YAML Front Matter-Format befolgen und darfst keine neuen Feldnamen erfinden:
    - title:          „Papiertitel"
    - date:           YYYY-MM-DD HH:MM:SS +0800
    - selected:       true
    - pub:            „Veranstaltung / Journalname"
    - pub_date:       „Jahr"
    - abstract: >-    Abstract-Inhalt...
    - cover:          /assets/images/covers/cover_name.jpg
    - authors:        - Autor1- Autor2
    - links:Paper:    https://paper-link
4. Bitte generiere den vollständigen Code für die folgenden drei Dateien (einschließlich der Pfadbeschreibungen):
(1) Pfad: `_publications/2013/2013-hyperloop.md`
    Titel: Hyperloop Alpha
    Datum: 2013-08-12
    Pub: Tesla Blog (Open Source)
    Pub_date: „2013"
    Abstract: Ein Vorschlag für eine fünfte Transportart, der ein Niederdruckröhrensystem und Luftlager nutzt, um Unterschallgeschwindigkeiten zu erreichen.
    cover: /assets/images/covers/Hyperloop_Alpha_sketch.jpg
    Autoren: Elon Musk, SpaceX & Tesla Teams
    Link: https://www.tesla.com/sites/default/files/blog_images/hyperloop-alpha.pdf
(2) Pfad: `_publications/2017/2017-mars.md`
    Titel: Making Humans a Multi-Planetary Species
    Datum: 2017-06-01
    Pub: New Space
    Pub_date: „2017"
    Abstract: Detaillierte Architektur des Starship-Systems, das zur Kolonisierung des Mars entwickelt wurde. Dieses Papier beschreibt die technischen Herausforderungen zur Errichtung einer sich selbst erhaltenden Stadt.
    cover: /assets/images/covers/SpaceX_Starship.jpg
    Autoren: Elon Musk
    Link: https://www.liebertpub.com/doi/10.1089/space.2017.29009.emu
(3) Pfad: `_publications/2019/2019-neuralink.md`
    Titel: An Integrated Brain-Machine Interface Platform
    Datum: 2019-10-16
    Pub: Journal of Medical Internet Research
    Pub_date: „2019"
    Abstract: Wir haben Arrays kleiner und flexibler Elektrodenfäden gebaut, mit bis zu 3.072 Elektroden pro Array, und einen neurochirurgischen Roboter.
    cover: /assets/images/covers/Neuralink_sewing_machine_robot.jpg
    Autoren: Elon Musk, Neuralink
    Link: https://www.jmir.org/2019/10/e16194/
Ausführungsanforderung:
Bitte stelle direkt den vollständigen Inhalt dieser drei Dateien sowie den Änderungscode für die Datei bereit, in der du den Titel geändert hast.
```

**Schritt 3: Den lokalen Browser aktualisieren**

Wenn der Build abgeschlossen ist, wirst du feststellen, dass die ursprünglich langweilige Veröffentlichungsliste sich in eine futuristische Black-Tech-Showcase verwandelt hat.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image33.png)

### 4.2.3 Letzter Schliff: Social-Links und Avatar

Dies ist der entscheidende Schritt, um von 90 auf 100 Punkte zu kommen. Die Seitenleiste enthält möglicherweise noch den GitHub-Link der Vorlage oder eine falsche E-Mail. Wir müssen sie auf Musks echte Social-Accounts verweisen, hauptsächlich X.com.

**Schritt 1: Vorbereitung**

Suche auf Google nach einem gut aussehenden Foto von Musk, speichere es als `portrait.png`, oder ziehe es in den Ordner `images/photo` in Trae und ersetze das ursprüngliche Bild.

**Schritt 2: Kopiere die folgende Anweisung in Trae**

```text
1. Rolleneinstellung: Du bist ein detailorientierter Jekyll-Website-Entwicklungsexperte.
2. Aufgabenziel: Schließe das letzte Update der Website-Seitenleiste und der persönlichen Informationskonfiguration ab. Wir müssen den Avatar des Autors, die Vorstellung und die Social-Links auf Elon Musks echte Informationen aktualisieren.
Bitte scanne zuerst die Projektstruktur und finde die Konfigurationsdatei, die die Autoreninformationen steuert.
3. Bitte nimm die folgenden Änderungen vor:
1. Avatar-Pfad-Korrektur
    Ich habe bereits ein neues Bild namens `portrait.png` in den Ordner `images/` oder `assets/images/` hochgeladen.
    Bitte ändere den Avatar-Pfad in der Konfigurationsdatei, um auf dieses Bild zu zeigen, und stelle sicher, dass der relative Pfad korrekt ist, zum Beispiel `/images/portrait.png`.
2. Social-Link-Bereinigung
    Bitte aktualisiere oder entferne die Social-Icon-Links in der Seitenleiste:
    E-Mail: ändere sie in `elon@spacex.com`, oder wenn das Feld es erlaubt, kommentiere sie aus oder entferne sie, um Belästigung zu vermeiden.
    Twitter / X: ändere sie in `https://x.com/elonmusk` (dies ist der Kern-Link).
    GitHub: ändere sie in `https://github.com/tesla`, um auf das Tesla-Open-Source-Repository zu zeigen, oder entferne sie direkt.
    Google Scholar: muss entfernt werden, da er es nicht pflegt.
    LinkedIn / ResearchGate: falls vorhanden, entferne sie alle.
Ausgabeanforderung:
Bitte stelle direkt das vollständige geänderte Konfigurationscode-Snippet bereit.
```

**Schritt 3: Den lokalen Browser aktualisieren**

1. Schau dir die Seitenleiste an. Verwendet sie jetzt dieses attraktive Foto? Führt dich das Klicken auf das Twitter-Icon zu X.com?

An diesem Punkt hast du lokal bereits eine vollständige, professionelle und deutlich Musk-stilige persönliche akademische Homepage.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image34.png)

## 4.3 Seele einhauchen durch UI-Anpassung, der Stil-Teil

Aktuell ist der Inhalt korrekt, aber die Seite sieht immer noch aus wie ein gedruckter Lebenslauf. Es fehlt das Technologie-Feeling. Im Vibe Coding-Modus müssen wir kein CSS verstehen. Wir müssen der AI nur das **Gefühl** beschreiben, das wir wollen.

**Beispielszenario**:
Wenn du denkst, dass der graue Hintergrund zu langweilig ist und ihn in **Mars-Rot** ändern möchtest, frage einfach Trae:
*„Ich möchte die Hintergrundfarbe der Seitenleiste in Dunkelrot (#8B0000) ändern, um das Mars-Gefühl zu vermitteln. Welche CSS- oder SCSS-Datei soll ich ändern? Bitte gib mir den Code direkt."*

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image35.png)

Wenn dir der **SpaceX Dashboard**-Stil im obigen Beispielbild gefällt, kannst du direkt die folgende Designer-Level-Anweisung kopieren:

```text
1. Rolleneinstellung: Du bist ein Top-UI-Designer, der den „Schweizer Internationalistischen Stil" bewundert und sich auf Schnittstellen wie Notion, Linear oder Apple spezialisiert hat.
2. Aufgabenziel: Bitte schreibe das CSS / SCSS komplett neu, um eine „SpaceX Dashboard"-stilige minimalistische akademische Homepage zu erstellen. Die Kernschlüsselwörter sind: transparent, zurückhaltend, präzise.
3. Bitte die folgenden konkreten Stil-Overrides anwenden:
1. Globale Typografie
    Schriftart: verwerfe die ursprüngliche Serif-Schrift. Erzwinge für die gesamte Website den systemweiten Sans-Serif-Stack:
    'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif.
    Zeilenhöhe: erhöhe den Atemraum im Fließtext mit `line-height: 1.75`.
    Farben:
        Haupttitel: #111111
        Fließtext: #333333
        Sekundäre Informationen wie Daten oder Zitate: #666666
2. Sauberer Header
    Hintergrund: entferne den vorherigen schwarzen Hintergrund und verwende reinweiß (#FFFFFF), oder durchscheinendes Weiß mit Blur, falls unterstützt, zum Beispiel `rgba(255, 255, 255, 0.9)` plus `backdrop-filter: blur(10px)`.
    Rahmen: behalte nur einen sehr dünnen unteren Rahmen, `border-bottom: 1px solid #EAEAEA`.
    Text: Navigationslinks sollten Dunkelgrau #333333 verwenden und nur beim Hover schwarz und fett werden.
3. Karten entfernen und zum Inhalt zurückkehren
    Entferne den Hintergrund und Schatten der linken Seitenleiste und der About-me-Karten (`box-shadow: none`, `background: transparent`).
    Großartiger Minimalismus lässt den Text direkt auf dem Seitenhintergrund schweben.
    Abstände erhöhen: erhöhe `margin-bottom` erheblich, zum Beispiel 80px, zwischen Abschnitten und verwende Weißraum statt Rahmen zur Trennung von Inhalten.
4. Zurückhaltende Nutzung der Markenfarbe
    Verwende Tesla-Rot (#E82127) nur bei Links und wichtigen Schaltflächen.
    Link-Stil: entferne die Unterstreichung und ändere nur die Farbe. Beim Hover füge einen hellroten Hintergrundblock hinzu wie `background: rgba(232, 33, 39, 0.05)`.
5. Avatar-Anpassung
    Behalte die kreisförmige Form mit `border-radius: 50%`.
    Entferne den Rahmen.
    Behalte nur einen sehr leichten Schatten wie `box-shadow: 0 10px 30px rgba(0,0,0,0.08)`.
Ausführungsanforderung:
Bitte analysiere die `_sass`- oder CSS-Dateien. Patches den alten Code nicht. Stelle stattdessen direkt den Code bereit, der die obigen Stile zurücksetzt und überschreibt.
```

## 4.4 Durch eigene Informationen ersetzen, der Anpassungsteil

Herzlichen Glückwunsch. Nachdem du den obigen Musk-Homepage-Prozess durchlaufen hast, hast du bereits die Kernphilosophie des Vibe Coding für den Website-Bau gemeistert. Dieses Musterzimmer in dein eigenes Zuhause zu verwandeln, ist jetzt eigentlich ganz einfach.

Du musst nicht von vorne beginnen. Du musst nur die obigen Schritte wiederholen, aber mit einer etwas flexibleren Strategie:

**Schritt 1: Physische Ersetzung, Avatar und grundlegende Informationen**

Dies ist der einfachste Schritt:

1. **Foto ändern**: im Dateipanel auf der linken Seite von Trae, suche `assets/images/` und ziehe dein eigenes Porträt dorthin, um `portrait.png` zu ersetzen.
2. **Name ändern**: sage Trae, „Ersetze alle Vorkommen von Elon Musk auf der gesamten Website durch [deinen Namen]."

**Schritt 2: AI-Vorverarbeitung, lass ChatGPT / Gemini beim Organisieren des Inhalts helfen**

Trae ist gut im Code-Schreiben, aber wenn du ihm direkt einen unordentlichen PDF-Lebenslauf vorwirfst, könnte es verwirrt werden.

**Ein effizienterer Ansatz ist daher dieser**:
verwende zuerst eine AI, die gut im Umgang mit langen Texten ist, wie ChatGPT, Gemini oder Kimi, um deinen Lebenslauf **sauber zu formatieren**.

Du kannst ChatGPT eine Anweisung wie diese senden:

```text
Rolleneinstellung: Du bist ein professioneller akademischer Website-Inhaltsplaner.
Aufgabenziel:
Ich werde dir meinen persönlichen Lebenslauf / CV schicken. Bitte hilf mir, die wichtigsten Informationen daraus zu extrahieren und in eine klare Markdown-Struktur zu organisieren, die sich zum direkten Ausfüllen in eine statische Website eignet.
Bitte strikt organisieren und in die folgenden fünf Module verfeinern. Wenn einige Inhalte nicht existieren, lass sie leer.
1. Profil
Name: Mein vollständiger Name.
Tagline: Einzeiliger professioneller Slogan, zum Beispiel „CS-Student @ XX Univ | AI-Enthusiast".
Bio: Eine 50- bis 100-wörtige Vorstellung in der dritten Person, die meinen Hintergrund und meine Kernkompetenzen zusammenfasst, im professionellen akademischen Ton.
Socials: Extrahiere E-Mail, GitHub, LinkedIn, Blog-Links usw.
2. Ausbildung
Bitte auflisten: Schulname, Abschluss wie z.B. B.S. in CS und Zeitraum.
Optional: Falls GPA oder Kernkurse verfügbar sind, in einer separaten Zeile hinzufügen.
3. Ausgewählte Projekte - wichtig
Bitte extrahiere 2 bis 3 stärkste Projekte und füge für jedes ein:
Titel: Projektname.
Tech Stack: Verwendete Technologien, wie Python, React, PyTorch.
TL;DR: Eine einzeilige Zusammenfassung, was das Projekt macht.
Beschreibung: 2 bis 3 Kernbeiträge, verfeinert im STAR-Stil.
Image Placeholder: Reserviere einen Bilddateinamen wie `project_name.jpg`.
4. Veröffentlichungen / Artikel
Falls es Papiere oder technische Artikel gibt, bitte extrahieren:
Titel
Veranstaltung
Datum, Jahr reicht
Abstract, einzeilige Zusammenfassung
5. Fähigkeiten
Bitte in Kategorien organisieren: Programmiersprachen, Frameworks / Tools und andere Fähigkeiten.
Ausgabeanforderung:
Erkläre den Prozess nicht. Gib direkt den bereinigten Markdown-Inhalt aus.
```

Sobald du diesen bereinigten Text hast, gib ihn in Trae ein, und die Genauigkeit wird sich dramatisch verbessern.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image36.png)
![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image37.png)

**Schritt 3: Den Kerninhalt ersetzen, mit zwei möglichen Routen**

In diesem Schritt kannst du je nach Präferenz zwei verschiedene Vibe Coding-Modi wählen:

1. **Modus A: AI navigieren lassen, dann manuell bearbeiten**

Wenn du genau wissen möchtest, wo alles geändert wird, kannst du Trae fragen:

```markdown
Ich möchte den Abschnitt „Ausbildung" ändern. Bitte sage mir, wo sich der entsprechende Dateipfad befindet und welche Zeilen den Code enthalten.
```

Trae wird dir im Chat etwas sagen wie:
„Die Datei, die du ändern musst, ist `_pages/about.md`, und der relevante Code befindet sich um Zeile XX..."

Du kannst dann diese Datei selbst aus dem Dateibaum links öffnen und den bereinigten Inhalt von ChatGPT wie eine strukturierte Bearbeitungsübung einfügen.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image38.png)

2. **Modus B: Vollständig verwaltete Automatisierung**

Wenn du das Finden von Dateien zu mühsam findest, füge deine bereinigten Informationen einfach direkt in Trae ein:

```markdown
Hier ist der bereinigte Inhalt für meine Abschnitte „Ausbildung" und „Projekterfahrung" (füge den Markdown-Inhalt ein).
Bitte ersetze direkt den entsprechenden Inhalt auf der aktuellen Website und behalte das vorhandene Layout-Format bei.
```

# 5. Online bereitstellen

## 5.1 Auf GitHub Pages bereitstellen

**Schritt 1: GitHub Actions aktivieren, der Cloud-Build**

Zurück auf GitHub im Browser:

1. Klicke auf **Settings** oben im Repository.
2. Klicke in der linken Seitenleiste auf **Pages**.
3. Ändere unter **Build and deployment** die **Source** von `Deploy from a branch` zu **`GitHub Actions`**.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image39.png)

**Schritt 2: Automatisch den Jekyll-Workflow konfigurieren**

Nach dem Wechsel ändert sich das Seitenlayout. GitHub erkennt automatisch, dass dies ein Jekyll-Projekt ist.

1. Finde die Karte **Jekyll (By GitHub Actions)**.
2. Klicke auf **Configure** auf dieser Karte.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image40.png)

**Schritt 3: Die Konfigurationsdatei committen**

Nach dem Klicken wirst du auf eine Seite voller Code weitergeleitet. Dies ist eine `.yml`-Konfigurationsdatei, die bereits von GitHub zum Erstellen einer Jekyll-Website geschrieben wurde.

1. **Ändere keinen Code**.
2. Klicke auf die grüne Schaltfläche **Commit changes...** in der oberen rechten Ecke.
3. Klicke im Bestätigungsdialog erneut auf **Commit changes**.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image41.png)

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image42.png)

**Schritt 4: Warten und überprüfen**

Nach dem Commit beginnen GitHub-Server automatisch zu arbeiten.

1. Klicke auf den Tab **Actions** im oberen Menü.
2. Du siehst eine Aufgabe namens `Deploy Jekyll site to Pages`, die sich dreht.
3. Warte ein bis zwei Minuten, bis der gelbe Kreis zu einem **grünen Häkchen** wird.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image43.png)

**Schritt 5: Deine Website besuchen**

Sobald der Kreis grün wird, kannst du die Standardversion der Vorlage über eine Adresse wie:
**`https://dein-benutzername.github.io/`** aufrufen.

Herzlichen Glückwunsch. Du hast erfolgreich eine persönliche akademische Homepage bereitgestellt, die weltweit zugänglich ist.

## 5.2 Änderungen committen und die Homepage aktualisieren

Jetzt werden wir alle lokalen Änderungen, die wir zuvor vorgenommen haben, zu GitHub pushen, damit diese Musk-stilige persönliche Homepage von der Welt gesehen werden kann.

1. Klicke links auf **Source Control**.
2. Füge alle **Änderungen** zu den **staged changes** hinzu.
3. Lass Trae helfen, eine Commit-Nachricht zu generieren, und klicke dann auf **Commit**.
4. Klicke auf **Sync Changes** oder **Push**, um zum `main`-Branch zu pushen.
5. Warte einen Moment, bis alle Prozesse unter dem Tab **Actions** abgeschlossen sind.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image44.png)

Jetzt, herzlichen Glückwunsch. Öffne **`https://dein-benutzername.github.io/`**, und du hast bereits eine vollständige, professionelle und stark Musk-flavourte akademische Homepage.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image45.png)

# 6. Fortgeschritten: Eine persönliche Homepage von Grund auf selbst bauen

Wenn du denkst, dass akademische Vorlagen zu starr sind, oder wenn du eine One-Page-Website so cool wie *The Matrix* erstellen möchtest, willkommen im **DIY-Bereich**.

Hier forken wir niemandes Code. Wir werden Trae verwenden, ausgehend von einem leeren Ordner eine vollständige Website mit einer einzigen Anweisung zu generieren und sie dann online bereitzustellen.

## 6.1 Warum selbst bauen

* **Absolute Freiheit**: keine Vorlagenbeschränkungen. Wenn du die Navigationsleiste rechts haben willst oder Feuerwerk im Hintergrund, musst du es nur der AI sagen.
* **Minimalismus**: Vorlagen enthalten oft hunderte Dateien, während eine selbstgebaute Website möglicherweise nur eine `index.html` benötigt.
* **Technische Kontrolle**: dies ist der beste Weg zu verstehen, wie eine Webseite tatsächlich funktioniert.

Wir werden den klassischen **reinen HTML-Workflow** demonstrieren:
keine Kompilierung erforderlich, und GitHub Pages unterstützt es nativ, was es ideal für den Bau einer persönlichen Landing-Page macht.

## 6.2 Praktisches Beispiel: die AI bitten, eine „Mars-Kommandozentrale"-Homepage zu schreiben

Diesmal gehen wir nicht den akademischen Weg. Angenommen, Musk möchte eine extrem minimalistische, futuristische persönliche Homepage, um seinen Mars-Plan zu präsentieren.

**Schritt 1: Ein leeres Projekt erstellen**

Erstelle einen neuen Ordner auf deinem Computer und öffne ihn mit Trae. In diesem Moment ist der Dateibaum links komplett leer.

*(Tipp: du kannst im Voraus ein Foto von Musk vorbereiten und es `portrait.png` nennen.)*

**Schritt 2: Das Gerüst erstellen**

Gib die folgende Anweisung in Traes Chat-Panel ein. Beachte, dass wir von der AI verlangen, den gesamten Code in eine einzige Datei zu schreiben, damit er für Anfänger einfach zu verwalten ist:

```text
Ich möchte eine minimalistische persönliche Homepage für Elon Musk von Grund auf erstellen, ohne ein komplexes Framework, nur mit HTML + CSS + JS.
Design-Stil: SpaceX Dashboard-Stil.
    Hintergrund: verwende Tiefraum-Schwarz (#000000), mit Sternenlicht-Animation.
    Haupt-Akzentfarbe: verwende „Mars-Rot" (#E82127).
    Schriftart: verwende einen Monospace-Schriftarten-Stack, um das Gefühl eines Code-Terminals zu imitieren.
Seiteninhalt:
    Platziere Elon Musks Avatar in der Mitte, kreisförmig, mit einem rotierenden Rahmen. Der Bildpfad ist `portrait.png`.
    Name: Elon Musk (Technoking of Tesla)
    Vorstellung: „Occupying Mars... 99% Loading."
    Unten platziere drei leuchtende Schaltflächen, die zu X (Twitter), SpaceX und Tesla führen.
Technische Anforderung:
Bitte füge alle CSS-Stile und die HTML-Struktur in eine einzige `index.html`-Datei ein.
Bitte generiere den vollständigen Code direkt.
```

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image46.png)

**Schritt 3: Generieren und in der Vorschau anzeigen**

Im vorherigen Schritt hat Trae uns bereits geholfen, eine `index.html`-Datei zu generieren. Wie sehen wir nun die aktuelle Wirkung?

Sage Trae im Chat:

```markdown
Bitte hilf mir, einen lokalen Dienst zu starten, um diese Webseite in der Vorschau anzuzeigen.
```

Du erhältst einen Link wie `http://localhost:8000`. Kopiere und öffne ihn im Browser, und du wirst eine coole „Mars-Homepage" sehen, vielleicht mit im Hintergrund funkeln den Sternen.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image47.png)

Aber wir werden feststellen, dass die aktuelle Seite nur eine sehr coole Landing-Page ist. Als vollständige persönliche Homepage enthält sie noch zu wenig Informationen und es fehlt die Tiefe, die man von einer akademischen Homepage erwartet. Basierend auf diesem visuellen Rahmen werden wir sie nun mit akademischen Informationen über Elon Musk anreichern.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image48.png)

**Schritt 4: Die Informationen weiter verbessern**

Wir möchten, dass Trae den aktuellen Mars-Stil beibehält, die Seite aber in etwas umstrukturiert, das mehr der akademischen Vorlage ähnelt. Wir müssen ihm klar sagen, dass er die vorhandenen Elemente nach links verschieben und einen neuen Inhaltsbereich auf der rechten Seite für Profiltext und Whitepaper erstellen soll, während der gesamte neu hinzugefügte Inhalt im gleichen Schwarz-Rot-Cyberpunk-Stil gehalten wird.

Kopiere die folgende Anweisung und sende sie an Trae:

```text
Kernprinzip:
Du musst streng den aktuellen „SpaceX / Mars"-Designstil bewahren, einschließlich rein schwarzem Hintergrund, Sternenlicht-Dekoration, roter Neon-Akzentfarbe und Monospace-Code-Stil-Schriftart. Verwende nicht den weißen Hintergrund aus dem Referenzbild.

Spezifische Änderungsschritte:
1. Erstelle ein Zwei-Spalten-Layout
Teile die Seite in linke und rechte Spalten. Die linke Seitenleiste sollte etwa 30 bis 35% der Breite einnehmen und der rechte Inhaltsbereich etwa 65 bis 70%.

2. Linke Seitenleiste - verschiebe die vorhandenen Informationen
Verschiebe alle aktuellen Elemente vom ursprünglichen Hero-Screen in die feste linke Seitenleiste:
    - Avatar: behalte Elon Musks kreisförmigen Avatar.
    - Name und Titel: behalte den roten Neon-Text „ELON MUSK" und „Technoking of Tesla".
    - Ladebalken: behalte „Occupying Mars... 99% Loading" als persönliche Signatur.
    - Social-Schaltflächen: verschiebe die drei roten Schaltflächen, X, SPACE X und TESLA, an den unteren Rand der linken Seitenleiste.

3. Rechter Inhaltsbereich - detaillierte Informationen hinzufügen
Füge eine detaillierte persönliche Vorstellung und Errungenschaften im rechten Bereich hinzu. Der gesamte neue Fließtext sollte Weiß oder Hellgrau verwenden, während Titel rote Neon-Hervorhebung verwenden sollten. Bitte erstelle die folgenden Abschnitte:
- About Me:
    Schreibe eine kurze Vorstellung, zum Beispiel: „Technologischer Unternehmer und Ingenieur, fokussiert auf multiplanetare Expansion, nachhaltige Energie und künstliche Intelligenz."
- Focus Areas:
    Liste Raumfahrtsystemtechnik, Mars-Kolonisationsarchitektur, Gehirn-Computer-Schnittstellen auf.
- Visionary Plans & White Papers:
    Dies ist der wichtigste Abschnitt. Beziehe dich auf den Listenstil im Beispielbild, aber konvertiere ihn in einen schwarzen Hintergrund-Stil.
    Erstelle eine Liste, die seine wichtigsten technischen Pläne anzeigt, mit roten Rahmen oder Leuchteffekten zur Unterscheidung der einzelnen Elemente.
    Element 1: „Making Humans a Multi-Planetary Species" (Starship-Architektur, 2017).
    Element 2: „Hyperloop Alpha" (Hochgeschwindigkeitstransportvorschlag, 2013).
    Element 3: „Neuralink: An Integrated Brain-Machine Interface Platform" (2019).
- Notable Achievements:
    Liste kurz Meilensteine auf wie:
    Erste private Flüssigtreibstoff-Rakete, die den Orbit erreichte (Falcon 1)
    Erste wiederverwendbare Orbital-Klasse-Rakete (Falcon 9)

4. Stildetail-Anforderungen
Alle Abschnittstitel auf der rechten Seite, wie „About Me," sollten denselben roten Leuchtstil verwenden wie der „ELON MUSK"-Text auf der linken Seite.
Stelle sicher, dass die gesamte Seite responsiv bleibt und ein gutes Zwei-Spalten-Layout auf verschiedenen Bildschirmgrößen bewahrt.
```

Aktualisiere danach den Browser und deine Cyberpunk-Akademiker-Seite ist fertig. Natürlich kannst du sie weiter nach deinen eigenen Vorlieben verbessern. Wie in den vorherigen Schritten musst du Trae nur das Ziel klar mitteilen, und es wird den mühsamen Codierungsprozess für dich erledigen.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image49.png)

## 6.3 Wie man die selbstgebaute Website bereitstellt

Im Gegensatz zur vorherigen geforkten Vorlage, die aus dem Repository einer anderen Person stammte, wurde dieses Projekt von dir neu erstellt und hat noch keinen entsprechenden GitHub-Speicherort. Wir müssen es daher manuell verknüpfen.

**Schritt 1: Ein neues Repository auf GitHub erstellen**

1. Melde dich im Browser bei GitHub an.
2. Klicke auf das **+**-Symbol oben rechts und dann auf **New repository**.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image50.png)

3. **Repository-Name**: gib `mars-profile` ein oder einen anderen Namen, der dir gefällt.

**Hinweis**:
Wenn du bereits **`dein-benutzername.github.io`** verwendet hast, kannst du diesen Namen hier nicht erneut verwenden. Du kannst einen anderen Namen wählen, und GitHub generiert dann eine URL wie **`dein-benutzername.github.io/mars-link`**.

4. **Public / Private**: wähle **Public**.
5. **Hake „Add a README file" NICHT an!**
   Lass die anderen Optionen auf ihren Standardeinstellungen.
6. Klicke auf **Create repository**.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image51.png)

**Schritt 2: Den lokalen Code in die Cloud pushen**

Nach der Erstellung leitet dich GitHub zu einer Seite mit viel Code-ähnlichem Inhalt weiter. Keine Sorge. Wir müssen nur den Repository-Link kopieren, der auf dieser Seite angezeigt wird.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image52.png)

Gehe zurück zu Trae und tippe in den Chat:

```markdown
Ich habe ein leeres Repository auf GitHub erstellt. Die Adresse lautet: https://github.com/dein-benutzername/mars-link.git (bitte ersetze dies durch die tatsächliche Repository-Adresse, die du gerade erstellt hast).
Bitte hilf mir jetzt, das aktuelle lokale Projekt als Git-Repository zu initialisieren und den Code in den `main`-Branch dieser Remote-Adresse zu pushen.
```

Trae wird normalerweise helfen, die folgende Standardsequenz auszuführen, und du musst möglicherweise nur klicken, um sie auszuführen:

1. `git init`
2. `git add .` und `git commit -m "First commit"`
3. `git branch -M main` und `git remote add origin [deine Adresse]`
4. `git push -u origin main`

Nachdem Trae den Push abgeschlossen hat, gehe zurück zu GitHub und aktualisiere die Seite. Klicke auf den Tab **Code**, und du wirst sehen, dass der in Trae geschriebene Code erfolgreich in das Repository gepusht wurde.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image53.png)

**Schritt 3: GitHub Pages aktivieren**

Nachdem der Code gepusht wurde, erscheint die Webseite nicht automatisch. Wir müssen den Schalter noch manuell umlegen:

1. Gehe zurück zur GitHub-Repository-Seite und klicke oben auf **Settings**.
2. Klicke in der linken Seitenleiste auf **Pages**.
3. Unter **Build and deployment**:
   1. Setze **Source** auf `Deploy from a branch`.
   2. Setze **Branch** auf `main` und wähle `/(root)` als Ordner.
4. Klicke auf **Save**.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image54.png)

Nachdem du auf Save geklickt hast, erscheint die Webseite nicht sofort. GitHub-Backend arbeitet wie eine kleine Roboterfabrik. Es benötigt etwa **1 bis 2 Minuten**, um deinen Code zu verpacken, zu bauen und auf globale Server zu veröffentlichen.

Warte geduldig und aktualisiere die Seite. Unter der großen Überschrift **GitHub Pages** wirst du eine Zeile mit einer URL sehen, ähnlich wie:
**„Your site is live at `https://dein-benutzername.github.io/mars-link/`"**

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image55.png)

Klicke darauf, und deine Mars-Kommandozentrale ist online.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image56.png)

# 7. Schlussworte

Das Tutorial ist vorbei. Wenn du jetzt die `.github.io`-Adresse in der Adressleiste deines Browsers leuchten siehst, hast du nicht das Gefühl, eine Flagge im Internet gehisst zu haben?

In diesem Tutorial haben wir uns in die Rolle von Elon Musk versetzt und eine Website wie ein Lego-Projekt gebaut, die ziemlich beeindruckend aussieht. Aber das ist nur der Anfang. Der charmanteste Teil des Vibe Coding ist nicht, wie viel Tippzeit es spart. Es ist, dass es **die Mauer zwischen „Idee" und „Realität" komplett einreißt.**

Früher hast du vielleicht darauf verzichtet, ein Projekt zu präsentieren, weil **du kein CSS schreiben konntest**.
Jetzt sind die einzigen verbleibenden Grenzen deine **Vorstellungskraft** und dein **Geschmack**.

**Lass diese Website kein „Musk-inspirierter Klon" bleiben.**
Dieser Tesla-Link, den du zum Üben verwendet hast, und dieses Mars-Kolonisations-Whitepaper sind letztendlich die Geschichte von jemand anderem. Deine Homepage sollte deine eigene Visitenkarte in der digitalen Welt sein.

Geh und platziere dort deine erste echte Projekterfahrung.
Geh und veröffentliche deine eigenen einzigartigen Gedanken zu einem technischen Thema.
Du kannst sogar deine Lieblings-Bücherliste oder deine eigenen Fotos dort platzieren.
Gedanken, die in WeChat Moments begraben würden, können hier dauerhaft bleiben.
Leidenschaft, die nicht in einen Lebenslauf passt, kann sich hier frei entfalten.

Lass dieses Grundstück nicht leer stehen.
Geh und experimentiere. Geh und zerstöre es. Geh und baue es wieder auf.
Mach weiter so, bis es die Form annimmt, die dir am meisten gefällt.

![](/zh-cn/stage-3/personal-brand/personal-website-blog/images/image57.png)

***Geh voran und lass die Welt dich sehen.***

# Referenzen

CSDN: [2025 neuestes Nanny-Level-Tutorial: Schritt für Schritt zur Nutzung von GitHub zum Aufbau einer persönlichen Homepage](https://blog.csdn.net/qq_45743991/article/details/145505150?ops_request_misc=&request_id=&biz_id=102&utm_term=github%E6%9E%84%E5%BB%BA%E4%B8%AA%E4%BA%BA%E4%B8%BB%E9%A1%B5&utm_medium=distribute.pc_search_result.none-task-blog-2~all~sobaiduweb~default-0-145505150.142^v102^pc_search_result_base4&spm=1018.2226.3001.4187)

CSDN: [Git Download- und Installations-Tutorial](https://blog.csdn.net/weixin_41293671/article/details/144255269?ops_request_misc=elastic_search_misc&request_id=63236900b52320a7beb177787ba97f07&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~baidu_landing_v2~default-5-144255269-null-null.142^v102^pc_search_result_base4&utm_term=git%E4%B8%8B%E8%BD%BD%E5%AE%89%E8%A3%85&spm=1018.2226.3001.4187)

CSDN: [Ruby-Installations-Tutorial unter Windows](https://blog.csdn.net/alive_tree/article/details/103043158?ops_request_misc=elastic_search_misc&request_id=ad7e29ea7f702554d785c2fc82ec6e95&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~ElasticSearch~search_v2-11-103043158-null-null.142^v102^pc_search_result_base4&utm_term=ruby%E5%AE%89%E8%A3%85%E6%95%99%E7%A8%8B&spm=1018.2226.3001.4187)
