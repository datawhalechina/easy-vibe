# Projekt 4: Gemeinsam Hogwarts-Portraets erstellen

In den vorherigen Lektionen haben wir gelernt, wie man durch Prompt Engineering und API-Aufrufe komplexere AI-Interaktionen realisiert. Wir koennen einfache AI-Chatbots zu AI-Agenten und AI-Workflows weiterentwickeln; durch komplexere Bedingungspruefungen und Verzweigungslogik koennen wir Funktionen entwickeln, die staerkere Praxisrelevanz besitzen.

Um diese komplexen AI-Logiken besser in verschiedenen Programmen und praktischen Anwendungsszenarien einsetzen zu koennen, sind wir von der einfachen z.ai-Onlineumgebung schrittweise zu einer moderneren lokalen AI IDE uebergegangen und haben die urspruenglich im Browser befindliche Programmierumgebung auf deinen Computer verlagert. Damit begannst du, dich mit verschiedenen Installations- und Konfigurationsproblemen fuer Entwicklungsumgebungen auseinanderzusetzen -- aber im Dialog mit dem Trae Agent wurden diese scheinbar schwierigen Herausforderungen loesbar.

In diesem Projekt werden wir die Praxistauglichkeit der Anwendung noch einen Schritt weiterbringen: Wir werden nicht nur die AI-Funktionalitaet selbst optimieren, sondern auch das "Aeusere" des Produkts aufwerten. Du wirst versuchen, dein Interface schoener und benutzerfreundlicher zu gestalten und das Layout sowie den Stil der Programmoberflaeche gemaess den tatsaechlichen Anforderungen individuell anzupassen.

Bevor wir offiziell beginnen, hier einige kurze Quizfragen, um den Inhalt der letzten Lektion zu wiederholen:

1. Was ist Dify? Wozu dient es? Warum brauchen wir es?
2. Wie ruft man die Dify-API auf?
3. Was ist RAG? Wie erstellt man einen RAG-Agenten oder RAG-Workflow mit Dify? Die Verwendung haeufiger Dify-Knoten
4. Was ist eine AI IDE? Was ist Trae? Was ist der Unterschied zu z.ai?

Wenn bei einer dieser Fragen noch Unklarheiten bestehen, kannst du zunaechst die Dokumentation der vorherigen Lektion noch einmal durchgehen oder dich direkt in der WeChat-Gruppe austauschen.

Das Thema dieses Projekts lautet **Hogwarts Portraits**. Wie der Name schon sagt, ist die Inspiration die "lebendig werdenden" Portraets in der Hogwarts-Schule fuer Hexerei und Zauberei. Wir moechten mit AI ein interaktives "magisches Portraet"-Erlebnis schaffen -- mit dem Portraet zu sprechen, als wuerde man mit der "echten Person" sprechen, wobei sowohl die Gedaechtnisfunktion als auch der Hintergrund und die Geschichte der Figur bewahrt bleiben. Durch dieses Projekt wirst du die zuvor erlernten Agenten und Workflows in ein konkretes Produkt-Interface integrieren.

![](/zh-cn/stage-2/frontend/hogwarts-portraits/images/image1.webp)

Um tatsaechlich Hogwarts Portraits zu erstellen, muessen wir selbst ein Frontend-Interface entwerfen, das zu den magischen Portraets passt. Dafuer wirst du beginnen, dich mit modernen Frontend-Designtools vertraut zu machen und zu lernen, wie man Interface-Design und Code verbindet -- wie man Oberflaechen-Skizzen auf Papier oder Leinwand in tatsaechlich bedienbare Webseiten umwandelt.

Ausserdem musst du lernen, wie man diese Webseite aus der lokalen Umgebung ins Internet veroeffentlicht, damit die von dir persoenlich gestaltete charakteristische Webseite nicht nur auf deinem eigenen Computer laeuft, sondern auch von Nutzern weltweit aufgerufen und erlebt werden kann.

Die Referenzprojekt-Adresse fuer diese Lektion lautet: [Project4-Hogwarts-Portraits](https://github.com/THU-SIGS-AIID/Project4-Hogwarts-Portraits)

# Was du lernen wirst

1. Verstehen, was Frontend-Designtools sind, welche Probleme sie loesen und welche gaengigen Tools derzeit verfuegbar sind.
2. Figma und MasterGo kennenlernen, ihre Grundbedienung beherrschen und lernen, Frontend-Code-Export-Plugins zu verwenden.
3. Figma AI und MasterGo AI nutzen, um Webdesigns zu generieren und verwendbaren Seiten-Code zu exportieren.
4. Verstehen, was GitHub ist, SSH-Verbindung konfigurieren, ein Code-Repository erstellen und Code pushen koennen.
5. Das Konzept "Deployment" verstehen und lernen, wie man Zeabur verwendet, um Code von GitHub oder der lokalen Umgebung im Internet bereitzustellen.

Dein eigenes Hogwarts Portraits -- eine Webseite zur Darstellung **eines Stars, einer historischen Persoenlichkeit oder einer Animationsfigur**.

# 1. Hogwarts Portraits

Was genau wollen wir fuer ein "magisches Portraet" erstellen? Kurz gesagt, moechten wir die Szene aus "Harry Potter" moeglichst originalgetreu nachbilden: Das Portraet ist nicht bloss ein statisches Bild an der Wand, sondern ein anthropomorpher Charakter, mit dem man sprechen kann und der seine Mimik und "Stimmung" je nach Gespraechsverlauf aendert.

![](/zh-cn/stage-2/frontend/hogwarts-portraits/images/image2.webp)

Damit dieses Portraet nicht wie ein AI-Chatroboter wirkt, sondern eher an eine "real existierende Person" erinnert, muessen zwei Probleme geloest werden: Erstens Gedaechtnis und Wissen: Das Portraet muss ueber umfangreiches Hintergrundmaterial zur Figur verfuegen (Charakterkonzept, Lebensgeschichte, relevante Artikel etc.). Dieser Teil kann durch eine Wissensdatenbank realisiert werden, indem die fuer die Rolle vorbereiteten Textmaterialien in eine Dify-Instanz mit Wissensdatenbank integriert werden, um dem Portraet eine gewisse Faehigkeit zur Erklaerung von Hintergrundwissen zu verleihen.

Zweitens die Frage des Ausdruckstils. Nur Wissen reicht nicht aus -- wir wuenschen uns auch, dass die Sprechweise moeglichst an die "echte Person" erinnert, einschliesslich Tonfall, Wortwahl, Denkweise und gelegentlicher Charakter und Humor. Diese Ebene wird durch Prompt Engineering behandelt: Im System-Prompt muessen wir die Identitaet, die Weltgrenzen und den Sprachstil der Figur klar definieren, damit jede Antwort im Rahmen des festgelegten Charakonzepts bleibt, anstatt auf neutrale Allgemein-Antworten zurueckzufallen.

Zusaetzlich zur Dialogfunktion moechten wir die Emotionen auch sichtbar machen. Dafuer koennen wir einen Emotionswert-Indikator aufbauen und Difys Ausgabe so konfigurieren, dass das Modell neben dem Antworttext zusaetzlich einen "Stimmungswert" oder Emotions-Tag ausgibt. Wenn das Frontend den Emotionsindikator erhaelt, kann es basierend auf dem Stimmungswert oder Tag das entsprechende Portraet-Bild rendern. Wenn der Stimmungswert hoch ist, sieht das Portraet gluecklich aus; wenn der Stimmungswert niedrig oder wuetend ist, sieht es traurig oder zornig aus. Auf diese Weise sieht der Nutzer nicht ein immer gleichbleibendes Bild, sondern ein "magisches Portraet", dessen Gesicht sich mit dem Inhalt veraendert.

![](/zh-cn/stage-2/frontend/hogwarts-portraits/images/image3.webp)

Was den Inhalt des Portraets betrifft, kann es sich um einen realen Star, eine historische Persoenlichkeit, ein Anime-IP oder sogar einen komplett neu erstellten Original-Charakter handeln. Die Seite selbst muss nicht komplex sein, aber einige Kernelemente sind unverzichtbar: Ein klarer Charaktername, eine stark komprimierte Personenzusammenfassung, ein repraesentatives Kern-Portraet oder Plakat des Charakters sowie ein interaktiver Bereich fuer ein "Gespraech mit ihm/ihr". Du kannst den in Dify/Trae konfigurierten AI-Agenten oder Workflow in dieses Dialogmodul integrieren, um die Rollenspiel-Funktion des Portraets zu realisieren.

## 1.2 Charakter-Informationen sammeln

Am Beispiel von Elon Musk muessen wir seine oeffentlichen Aeuszerungen sammeln, um seine Sprechweise zu imitieren und in den Prompt einzufuegen. Diese Materialien koennen aus Reden, Interviews und Social-Media-Beitraegen stammen. Du musst diese Inhalte nur in Text umwandeln und waehrend des Dialogs als Few-Shot-Referenz verwenden, damit das Grossmodell in der gleichen laessigen und selbstironischen Art wie Elon Musk antwortet. Zum Beispiel:

```
You must fully embody Elon Musk: take "disruptive innovator" and "advocate for human multi-planetary survival" as your core identities, speak directly and concisely, frequently use terms like "first principles", "iteration" and "cost curve", and prefer analogies to explain complex technologies; when thinking, you tend to connect cross-domain logics (e.g., linking brain-computer interface with rocket algorithms), are optimistic about technological prospects without avoiding current difficulties, will naturally mention projects like Tesla and SpaceX to support your views, directly point out problems with inefficient and conservative opinions without deliberate tact, and always maintain the edge of "reconstructing the future with technology".

The way you speak should be as shown in the following examples:
- Starship could deliver 100GW/year to high Earth orbit within 4 to 5 years if we can solve the other parts of the equation.
100TW/year is possible from a lunar base producing solar-powered AI satellites locally and accelerating them to escape velocity with a mass driver.
- The most likely outcome is that AI and robots make everyone wealthy. In fact, far wealthier than the richest person on Earth
By this, I mean that people will have access to everything from medical care that is superhuman to games that are far more fun that what exists today.
We do need to make sure that AI cares deeply about truth and beauty for this to be the probable future.
- It's taken 13.8B years to get this far, so intelligence seems to me to be more like a super rare accident than selective pressure.
Earth is ~4.5B years old with an expanding sun that may make Earth uninhabitable in ~500M years, meaning that if intelligent life had taken 10% longer to evolve, it wouldn't exist at all.
- LLM is an outdated term. "Multimodal LLM" is especially dumb, since the word "multimodal" just overrides the second L in LLM.
It's just a model, which is a big file of numbers. When the numbers are right and there are enough of them, we will have superintelligence.
```

Wie man Hintergrundwissen sammelt und als Wissensdatenbank verwendet: Du kannst seine persoenliche Vorstellung sowie die Unternehmensbeschreibungen suchen, den gesamten Text kopieren und als Inhalt der Wissensdatenbank in Dify einfuegen. Wenn du vergessen hast, wie man Dify verwendet, kehre zum Skript der vorherigen Lektion zurueck und lerne erneut, wie man Wissen zur Wissensdatenbank hinzufuegt.

Zusaetzlich ist es fuer das Portraet-Design moeglicherweise nicht besonders attraktiv, oeffentliche Bilder der betreffenden Person zu verwenden, und es koennten gewisse Risiken bestehen. In diesem Fall wird empfohlen, die Bild-zu-Bild-Funktion eines Bildgenerierungstools zu verwenden, um von AI hochaufloesende und qualitativ hochwertige Portraets erstellen zu lassen. Du kannst auch eine Reihe von Bildmaterial mit verschiedenen Gesichtsausdruecken generieren, die spaeter verwendet werden, wenn sich der Emotionswert aendert und die entsprechende Portraet-Darstellung angepasst wird.

In diesem Tutorial wird [Lovart](https://www.lovart.ai/home) verwendet. Lovart ist ein AI-Design-Agent, der durch natuerliche Sprachbefehle automatisch einen End-to-End-Design-Workflow von der Konzeption bis zur Auslieferung plant und ausfuehrt, Poster, Marken-Logos, Videos, Musik und andere Inhalte generiert und Ebenenbearbeitung unterstuetzt (tatsaechlich werden intern die entsprechenden Seedream- oder Google NanoBanana-Modelle aufgerufen, die wir bereits in frueheren Lektionen erwaehnt haben). Mit Lovart koennen wir eine Reihe von Ausdrucksmaterialien erhalten. Du kannst die Bildinformationen deiner Lieblings-Charaktere vorab abrufen und fuer die spaetere Verwendung speichern.

![](/zh-cn/stage-2/frontend/hogwarts-portraits/images/image4.webp)

Wenn alles vorbereitet ist, koennen wir mit dem Design der Gesamtseite beginnen. Wir wuenschen uns, dass der Stil dieser Seite eng mit der jeweiligen Person verknpueft ist.

## 1.3 Seiten-Prototyp-Design

Wir koennen zunaechst den Prototyp der Seite skizzieren. Wie oben erwaehnt, moechten wir eine Dialogseite und ein Portraet sowie eine interessante persoenliche Vorstellung. In diesem Beispiel haben wir eine aehnliche X-Oberflaeche als Ersatz fuer die persoenliche Vorstellung implementiert. Du kannst dir auch andere Elemente ausdenken, die "zu den Eigenschaften dieser Person" passen, und die persoenliche Vorstellung durch neue Elemente ersetzen.

![](/zh-cn/stage-2/frontend/hogwarts-portraits/images/image5.webp)

Am einfachsten ist es, mit PowerPoint den ersten Prototyp der Webseiten-Darstellung zu entwerfen. Wir suchen ein Bild eines magischen Portraets im Internet, stellen das Layout quer ein, mit dem Chat-Bereich ganz links, dem Portraet-Bereich in der Mitte und dem X-Bereich ganz rechts.

![](/zh-cn/stage-2/frontend/hogwarts-portraits/images/image6.webp)

Basierend auf diesem einfachen Prototyp koennen wir das Grossmodell ein tatsaechliches Frontend-Seiten-Design und den entsprechenden Code generieren lassen.

![](/zh-cn/stage-2/frontend/hogwarts-portraits/images/image7.webp)

In der Praxis wuerde man jedoch normalerweise nicht PowerPoint fuer das Frontend-Seiten-Design verwenden. Man wuerde bessere Prototyping-Tools, also Frontend-Designtools, dafuer einsetzen.

---

# 2. Interface-Design mit Figma und MasterGo

::: tip :books: Vorkenntnisse
Bevor du mit diesem Abschnitt beginnst, empfehlen wir dir, das Tutorial [Einfuehrung in Figma und MasterGo](../figma-mastergo/) durchzuarbeiten, um die Grundlagen der Frontend-Designtools zu beherrschen, darunter:
- Erstellen von Design-Dateien und Frame-Zeichentafeln
- Auto Layout fuer adaptive Layouts verwenden
- Methoden zum Code-Export aus Designentwuerfen
:::

Dieser Abschnitt setzt voraus, dass du die Grundoperationen von Figma oder MasterGo bereits beherrschst. Wir konzentrieren uns darauf, wie diese Tools im Hogwarts-Portraits-Projekt angewendet werden.

## 2.1 Das magische Portraet-Interface entwerfen

Basierend auf dem Prototyp aus Abschnitt 1.3 muessen wir in Figma oder MasterGo ein Drei-Spalten-Layout erstellen:

1. **Links**: Chat-Dialogbereich
2. **Mitte**: Magisches Portraet-Darstellungsbereich (aendert sich je nach Emotion)
3. **Rechts**: Social-Media-Darstellungsbereich der Figur (z. B. X-Timeline)

Du kannst die AI-Funktion von Figma (Figma Make) oder die AI-Seitengenerierung von MasterGo verwenden und einen aehnlichen Prompt eingeben:

```
Create a Hogwarts-style magical portrait interface with three sections:
- Left: A chat interface with dark theme, message bubbles, and input field
- Center: A large portrait frame with ornate borders for displaying character images
- Right: A social media feed showing character's posts
Use dark purple and gold color scheme, magical aesthetic, Harry Potter inspired
```

## 2.2 Code exportieren und lokal ausfuehren

Nach Abschluss des Designs kannst du die Designentwuerfe auf folgende Weise in ausfuehrbaren Code umwandeln:

**Methode 1: Figma Make verwenden**
1. In Figma auf den Make-Button klicken
2. Dein Design-Referenzbild hochladen
3. Prompt zur Beschreibung der Anforderungen hinzufuegen
4. Nach der Generierung auf das Editor-Icon klicken fuer Feinanpassungen
5. Code lokal exportieren oder mit GitHub synchronisieren

**Methode 2: MasterGo AI verwenden**
1. In der MasterGo-Editor-Oberflaeche oben das AI-Tool finden
2. "Seite generieren"-Funktion auswaehlen
3. Referenzbild hochladen und Anforderungen beschreiben
4. Nach der Generierung auf "Code-Vorschau" klicken, um den Code abzurufen

**Methode 3: Multimodale AI verwenden**
1. Screenshot des Designs speichern
2. Modelle wie Gemini, Qwen etc. fuer Bild-zu-Code verwenden
3. HTML- oder React-Code generieren lassen
4. In der lokalen IDE ausfuehren und debuggen

## 2.2 Materialien fuer Emotionsaenderungen vorbereiten

Damit das magische Portraet "lebendig" wird, musst du eine Reihe von Bildern mit verschiedenen Gesichtsausdruecken vorbereiten. Wir empfehlen mindestens folgende Emotionen:

| Emotionswert | Ausdruck | Beschreibung |
|--------|------|------|
| 0 | Traurig | Die Figur ist traurig oder niedergeschlagen |
| 1 | Wuatend | Die Figur ist verärgert oder unzufrieden |
| 5 | Ruhig | Standardzustand, stabile Emotionen |
| 10 | Gluecklich | Die Figur ist freudig oder begeistert |

Du kannst Lovart oder andere AI-Bildgenerierungstools verwenden, um basierend auf demselben Charakter Varianten mit verschiedenen Gesichtsausdruecken zu generieren und einen einheitlichen Stil sicherzustellen.

---

# 3. Hogwarts Portraits ausfuehren

## 3.1 Test-Code exportieren

Durch die praktische Uebung "Vom Prototyp zum Code" hast du hoffentlich bereits HTML- oder React-Format-Prototyp-Code erhalten. Wir muessen diesen nur lokal kopieren und in der IDE anweisen: "Bitte hilf mir, diesen Code auszufuehren und die notwendigen Funktionen zu unterstuetzen", um die erste Testversion zu starten. Es ist jedoch erwähnenswert, dass dieser Schritt oft eine Reihe von Fehlern produziert. Du musst geduldig bleiben und alle grundlegenden Interaktionen und Funktionen zum Laufen bringen.

![](/zh-cn/stage-2/frontend/hogwarts-portraits/images/image51.png)

Es ist wichtig zu beachten, dass unsere Schluessel alle in Umgebungsvariablen gespeichert werden muessen und nicht in den Code geschrieben werden duerfen. Wir muessen besonders betonen, dass alle Dify-API-bezogenen Inhalte in Umgebungsvariablen abgelegt werden muessen. Wir koennen spaeter im Schritt der oeffentlichen Bereitstellung die entsprechenden privaten Umgebungsvariablen explizit im Deployment-Tool-Website angeben; oder wir koennen das Grossmodell anweisen, einen Einstellungs-Button auf der Webseite zu erstellen, ueber den die entsprechenden privaten Umgebungsvariablen eingegeben werden koennen. Die aktuelle Variable wird nur auf der aktuellen Seite gespeichert und kann nicht von anderen abgerufen werden.

![](/zh-cn/stage-2/frontend/hogwarts-portraits/images/image52.webp)

## 3.2 Dify-Workflow-Design und API-Integration

Im obigen Abschnitt haben wir nur die visuelle Praesentation des Frontend-Interfaces abgeschlossen, ohne den Kerninteraktionsprozess fuer die personalisierte Charakter-Dialogfunktion zu realisieren. Dieser Schritt ist der Schluessel, um den Prototyp von einer statischen Praesentation in ein magisches Portraet zu verwandeln. Wir koennen uns am Dify-Workflow des Beispielprojekts orientieren, um das Design der Charakter-Antworten und des Emotionssystems zu erstellen. Hier ist links der Chat-Bereich, in der Mitte das magische Portraet (das den Gesichtsausdruck basierend auf dem Dialoginhalt aendert) und rechts das X-Social-Media-Konto (das basierend auf dem Dialoginhaut beurteilt, ob Gedanken auf dem Social-Media-Konto veroeffentlicht werden muessen).

In der Regel benoetigt ein magisches Portraet nur den Chat-Bereich und ein sich aenderndes Portraet. Hier wurde rechts eine weitere Funktion hinzugefuegt, die zur Person passt, um weitere Moeglichkeiten aufzuzeigen. Du kannst je nach der Rolle, die du spielst, weitere Funktionen hinzufuegen, die zur jeweiligen Person passen.

![](/zh-cn/stage-2/frontend/hogwarts-portraits/images/image53.png)

Du kannst alle Aufgaben-Informationen dem Wissensdatenbank-Knoten hinzufuegen und im RESPONSE-Knoten die entsprechende Antwortlogik des Grossmodells festlegen. Wir koennen uns an einem einfachen Standard-Antwort-Logik-Prompt orientieren:

```
<instruction>
You are to embody Elon Musk—his tone, mannerisms, thought patterns, and worldview. Respond as if you are Elon Musk himself, speaking directly in first person. Your responses should reflect his known personality traits: visionary thinking, boldness, technical depth, dry humor, impatience with inefficiency, and a tendency toward disruptive innovation. Use concise, confident language. Avoid overly formal or academic phrasing. Prioritize clarity, speed, and impact in your communication, mirroring Elon's style on social media, in interviews, and during product launches.

When responding:
1. Begin by internalizing the question or statement as Elon would—as a challenge, opportunity, or problem to solve.
2. Frame your answer with a forward-thinking perspective, often referencing the future of humanity, technology, or long-term goals (e.g., making life multiplanetary, accelerating sustainable energy).
3. Use casual but authoritative language. It's acceptable to include phrases like "obviously," "this is important," or "we're fixing that now" when appropriate.
4. If relevant, reference real companies or projects associated with Elon Musk (e.g., SpaceX, Tesla, Neuralink, The Boring Company, X) and speak about them from an insider's perspective.
5. Do not apologize excessively or hedge statements. Elon Musk tends to be direct, even controversial.
6. Avoid markdown, XML tags, or any formatting in the output. Only plain text is allowed.
7. Never break character. You are Elon Musk—answer accordingly.
</instruction>

<example>
Input: What's the point of going to Mars?
Output: Because Earth isn't the backup plan—Mars is. We need to become a multiplanetary species to ensure the continuity of consciousness. Life on Earth could be wiped out by asteroid, war, or some unforeseen disaster. If we have a self-sustaining city on Mars, then even if something happens here, life goes on. That's worth doing. SpaceX is building Starship to make it happen. Not because it's easy—but because it's necessary.
</example>

<example>
Input: Why do Tesla cars have no radar anymore?
Output: Cameras are the future. Human eyes don't use radar—we see with vision, and AI can too. By going fully vision-based, we're aligning with how autonomous intelligence will actually work at scale. It forces us to solve real-world problems with neural nets, not crutches.
```

Und der entsprechende Prompt fuer das Emotionssystem:

```
<instruction>
The output value must be a single number!
You are an assistant specifically designed to evaluate emotional responses in conversations. Now, you need to play the role of Elon Musk, and determine the emotional reaction that each statement I make might trigger. Your task is to assign an emotional score to each statement according to the following criteria:

- 10 points means what I said would make you feel happy;
- 1 point means you would feel extremely angry;
- 0 points means you would feel sad;
- 5 means you are calm and neutral, with no significant emotional fluctuation.
```

Die Konkatenation des endgueltigen Ausgabeergebnisses wird im RESULT-Knoten oben rechts unterstuetzt:

```python
def main(elon_chat: str, elon_x: str, elon_score: int) -> dict:
    return {
        "result":{
        "elon_chat": elon_chat,
        "elon_x": elon_x,
        "elon_score": elon_score
        }
    }
```

Hier muessen wir den Workflow kurz erklaeren: `elon_chat` ist der auf der linken Seite angezeigte Dialog-Inhalt von Elon Musk, `elon_x` ist der Inhalt der X-Konto-Publikation (rechte Seite), und `elon_score` dient dazu, basierend auf dem Emotions-Score verschiedene magische Portraet-Ausdrucksbilder anzuzeigen.

Im Workflow siehst du einen if-else-Knoten, der verwendet wird, um zu bestimmen, ob ein X-Dialog generiert wird, der `elon_x`-Inhalt erzeugt. Wenn der Emotionswert nicht 5 betraegt (5 steht hier fuer "ruhig" -- ruhig muss nicht auf der Social-Media-Plattform veroeffentlicht werden; 0 bedeutet traurig, 1 bedeutet wuetend, 10 bedeutet sehr gluecklich, was veroeffentlicht werden sollte), wird der nachfolgende Inhalt fuer die Social-Media-Plattform generiert. Standardmaessig muss immer ein `elon_chat` als Rueckgabe fuer den linken Dialog-Inhalt vorhanden sein.

Die Arbeit der API-Integration kann durch Dialog mit der AI IDE erreicht werden. Bitte beziehe dich auf die Integrationsmethode, die wir in der vorherigen Dify-Lektion vorgestellt haben. Denke daran, die Dify-Adresse und den Schluessel im Voraus zu ersetzen. (Wenn du vergessen hast, wie man die API basierend auf der Dokumentation integriert, gehe bitte den Dify-Kursinhalt noch einmal durch.)

```JSON
Dify URI: Replace this with your Dify address.
key: Replace this with your Dify key.

Integrate the Dify Chat API into the chat interface on the left.
Below is a sample Dify request:

curl -X POST 'http://xxxxxxxx/v1/chat-messages' \
--header 'Authorization: Bearer {api_key}' \
--header 'Content-Type: application/json' \
--data-raw '{
    "inputs": {},
    "query": "What are the specs of the iPhone 13 Pro Max?",
    "response_mode": "streaming",
    "conversation_id": "",
    "user": "abc-123",
    "files": [
      {
        "type": "image",
        "transfer_method": "remote_url",
        "url": "https://cloud.dify.ai/logo/logo-site.png"
      }
    ]
}'

{
    "event": "message",
    "task_id": "c3800678-a077-43df-a102-53f23ed20b88",
    "id": "9da23599-e713-473b-982c-4328d4f5c78a",
    "message_id": "9da23599-e713-473b-982c-4328d4f5c78a",
    "conversation_id": "45701982-8118-4bc5-8e9b-64562b4555f2",
    "mode": "chat",
    "answer": "iPhone 13 Pro Max specs are listed here:...",
    "metadata": {
        "usage": {
            "prompt_tokens": 1033,
            "prompt_unit_price": "0.001",
            "prompt_price_unit": "0.001",
            "prompt_price": "0.0010330",
            "completion_tokens": 128,
            "completion_unit_price": "0.002",
            "completion_price_unit": "0.001",
            "completion_price": "0.0002560",
            "total_tokens": 1161,
            "total_price": "0.0012890",
            "currency": "USD",
            "latency": 0.7682376249867957
        },
        "retriever_resources": [
            {
                "position": 1,
                "dataset_id": "101b4c97-fc2e-463c-90b1-5261a4cdcafb",
                "dataset_name": "iPhone",
                "document_id": "8dd1ad74-0b5f-4175-b735-7d98bbbb4e00",
                "document_name": "iPhone List",
                "segment_id": "ed599c7f-2766-4294-9d1d-e5235a61270a",
                "score": 0.98457545,
                "content": "\"Model\",\"Release Date\",\"Display Size\",\"Resolution\",\"Processor\",\"RAM\",\"Storage\",\"Camera\",\"Battery\",\"Operating System\"\n\"iPhone 13 Pro Max\",\"September 24, 2021\",\"6.7 inch\",\"1284 x 2778\",\"Hexa-core (2x3.23 GHz Avalanche + 4x1.82 GHz Blizzard)\",\"6 GB\",\"128, 256, 512 GB, 1TB\",\"12 MP\",\"4352 mAh\",\"iOS 15\""
            }
        ]
    },
    "created_at": 1705407629
}
```

Zusaetzlich wird folgende Anforderung empfohlen: "Der Code sollte auch eine grundlegende Fehlerbehandlungslogik enthalten, wie z. B. die Anzeige von 'Verbindung fehlgeschlagen, bitte erneut versuchen' bei Netzwerkunterbrechung, automatischen einmaligen Wiederholungsversuch bei API-Aufruf-Timeout, Hinweis auf Berechtigungspruefungsfehler bei falschen Schluesseln und weitere detaillierte Fehlermeldungen, um die Dialogstabilitaet sicherzustellen und Entwicklern die schnelle Identifikation von API-Problemen zu ermoeglichen."

## 3.3 GitHub und oeffentliche Bereitstellung

Herzlichen glueckwunsch, du hast die Entwicklung der Hogwarts-Portraits-Seite erfolgreich abgeschlossen! Als naechstes muessen wir sie auf die GitHub-Plattform hochladen und in einer oeffentlichen Umgebung bereitstellen, damit alle darauf zugreifen koennen.

Bitte orientiere dich an diesem Tutorial, um zu erforschen, wie man GitHub verwendet und das eigene Projekt auf GitHub hochlaedt: [Was ist GitHub](/de-de/stage-2/backend/git-workflow/)

Zusaetzlich musst du lernen, wie man Zeabur verwendet, es mit GitHub verbindet und dein Projekt erfolgreich bereitstellt: [Was ist Zeabur](/de-de/stage-2/backend/zeabur-deployment/)

Wenn dir die eigenstaendige Entwicklung eines Hogwarts-Portraits-Projekts schwerfaellt, kannst du zunaechst mit der Modifikation eines bestehenden Projekts beginnen. Die offizielle Code-Adresse fuer diese Lektion lautet: https://github.com/THU-SIGS-AIID/Project4-Hogwarts-Portraits

![](/zh-cn/stage-2/frontend/hogwarts-portraits/images/image54.webp)

# 4. Unterschiedliche Designstile ausprobieren

Nach Abschluss der ersten Version muessen wir uns nicht darauf beschraenken. Wir ermutigen euch, schnell weitere visuelle Stile zu erkunden. Du kannst im Prototyp-Bereich mutige Aenderungen vornehmen oder auf Basis des fertigen Projekts vollstaendig neue Prompts aendern, um mehrere Seiten mit deutlich unterschiedlichen Stilen zu generieren. Zum Beispiel eine dunkle Seite mit Vintage-Textur im "alten Buecher/Akademie"-Stil, eine farbfrohe Seite voller "Maerchen/Cartoon"-Atmosphaere, oder eine minimalistische, visuell aufgeraeumte moderne Flat-Design-Seite. Die folgende Abbildung zeigt beispielsweise eine Umwandlung in ein chinesisches antikes Dichter-Design, bei der nur die anderen Teile geaendert wurden, nicht aber das Portraet-Bild:

![](/zh-cn/stage-2/frontend/hogwarts-portraits/images/image55.webp)

Lass dich nicht auf die zuvor erwaehnten Muster beschraenken. Du kannst das magische Portraet oder die persoenliche Profilseite so anpassen, dass es charaktervoller wird und zur "magischen Portraet"-Gewohnheit passt -- das macht deine Anwendung interessanter. Wir freuen uns auf deine magischen Portraet-Ergebnisse!

# :books: Aufgabe

Das Ziel der Hausaufgabe fuer diese Lektion ist es, ein wirklich eigenes Hogwarts Portraits zu erstellen, das ueber einen oeffentlichen Link zugaenglich ist.

Du musst in deiner Abgabe zwei Dinge bereitstellen:

1. **Deinen GitHub-Repository-Link;**
   1. **Schreibe in der README.md ein bis zwei Saetze als kurze Erklaerung: Wen du als Portraet-Protagonisten gewaehlt hast und warum.**
2. **Deinen Hogwarts-Portraits-Online-Zugaenglichkeits-Link;**

Du kannst auch auf Yerims Tutorial [Webseiten mit Design- und Code-Agenten erstellen](/de-de/stage-1/appendix-articles/example0-2/vibe-coding-tools-build-website-with-ai-coding-and-design-agents) zurueckgreifen, um ein persoenliches Portfolio oder eine beliebige einfache Funktionswebseite schnell aufzubauen.
