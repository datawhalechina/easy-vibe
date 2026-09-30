# Git und GitHub verwenden lernen

In den vorherigen Lektionen haben wir gelernt, wie man webbasierte Vibe-Coding-Tools zum Programmieren verwendet. Jede Unterhaltung erstellt eine neue Code-Version. Aber lassen Sie uns darueber nachdenken: Wenn wir zu einer frueheren Aenderung zurueckkehren moechten, gibt es eine bequeme Methode? Gibt es ein Tool, das unseren Code in verschiedenen Phasen aufzeichnen kann, sodass wir jederzeit zwischen verschiedenen Versionen wechseln und Aenderungen vornehmen koennen?

Um diesem Bedarf gerecht zu werden, wurde Versionskontrollsoftware entwickelt. In diesem Artikel stellen wir das bekannteste Versionskontrollprogramm vor -- Git -- sowie die beste Code-Hosting-Plattform -- GitHub. Wir werden lernen, wie man Git zur Codeverwaltung verwendet, wie man Code anderer von GitHub abruft, wie man eigenen Code hochlaedt und wie man mit anderen an grossen Projekten zusammenarbeitet.

Ob fuer die Versionsverfolgung persoenlicher Projekte, die Code-Synchronisation in der Teamzusammenarbeit oder den Beitrag zur Open-Source-Community -- Git und GitHub sind unverzichtbare Werkzeuge fuer moderne Entwickler. Durch ihre Beherrschung wirst du Code effizienter verwalten, bei Bedarf Pruefpunkte erstellen, frei zwischen verschiedenen Code-Phasen wechseln und alles von einzelnen Dateiaenderungen bis hin zur Entwicklung grosser Projekte problemlos bewaeltigen koennen -- wodurch jede Code-Iteration kontrollierbar und rueckverfolgbar wird.

> :bulb: **Vorkenntnisse**
>
> Bevor du Git lernst, wird empfohlen, die folgenden Konzepte zu kennen:
> - [Was ist ein Terminal / eine Kommandozeile](/de-de/appendix/2-development-tools/command-line-shell) - Lernen, wie man die Kommandozeile zur Interaktion mit dem Computer verwendet
> - [Was ist Git](/de-de/appendix/2-development-tools/git-version-control) - Die Kernkonzepte des Git-Versionskontrollsystems verstehen
>
> Dieser Artikel konzentriert sich auf den GitHub-Workflow und die praktische Anwendung. Die oben genannten Grundlagen findest du in den verlinkten Anhang-Artikeln.

# Git Schnellstart

Bevor du Git verwendest, stelle sicher, dass du die Inhalte zum Thema [Kommandozeile](/de-de/appendix/2-development-tools/command-line-shell) und [Git-Grundlagen](/de-de/appendix/2-development-tools/git-version-control) im Anhang gelesen hast. Dieser Artikel setzt diese Grundkenntnisse voraus und erklart direkt, wie man Git installiert, konfiguriert und GitHub fuer die Zusammenarbeit nutzt.

## Git installieren

Wir demonstrieren drei Methoden zur Installation von Git auf verschiedenen Betriebssystemen. Bitte folge den Anweisungen gemaess deiner Systemversion:

### Windows

1. Gehe zur [offiziellen Git-Download-Seite](https://git-scm.com/download/win) und lade das fuer dein System passende Installationsprogramm herunter: [Installationspaket](https://github.com/git-for-windows/git/releases/download/v2.51.0.windows.1/Git-2.51.0-64-bit.exe). Standardmaessig wird das x64-Installationsprogramm empfohlen.
2. Doppelklicke auf das Installationsprogramm und folge dem Installations-Assistenten:
   ![](/zh-cn/stage-2/backend/git-workflow/images/image5.png)
   1. Es wird empfohlen, die Standardoptionen beizubehalten. Wenn du Anpassungen vornehmen moechtest, beachte Folgendes: (In den meisten Faellen kannst du einfach auf "Next" klicken)
      - Standard-Editor fuer Git auswaehlen: Waehle deinen bevorzugten Editor (z. B. VS Code). Du kannst die erste Option, Vim (einen Texteditor), als Standard waehlen oder "Visual Studio Code as Git's default editor" auswaehlen (erfordert vorab installiertes VS Code). Du kannst die Standardauswahl beibehalten und auf "Next" klicken, um fortzufahren.
        ![](/zh-cn/stage-2/backend/git-workflow/images/image6.png)
      - Auswaehlen, wie Git verwendet werden soll: Diese drei Optionen steuern die Verfuegbarkeit von Git im System. Es wird empfohlen, Option 2 ("from command line and 3rd-party software") zu waehlen -- sie fuegt die grundlegenden Git-Tools zum PATH hinzu und ermoeglicht es dir, Git in Git Bash, Eingabeaufforderung, PowerShell und IDEs zu verwenden, ohne das System zu ueberlasten.
        ![](/zh-cn/stage-2/backend/git-workflow/images/image7.png)

3. Nach der Installation rechtsklicke auf dem Desktop. Wenn du "Git Bash Here" im Menue siehst, war die Installation erfolgreich.

![](/zh-cn/stage-2/backend/git-workflow/images/image8.png)

### MacOS

Fuer macOS kannst du zunaechst `git --version` im Terminal eingeben, um zu pruefen, ob Git bereits installiert ist. Wenn nicht, wird das System dich zur Installation auffordern -- folge einfach den Anweisungen.

1. Methode 1: Ueber Homebrew installieren
   Wenn du [Homebrew](https://brew.sh/) (den Mac-Paketmanager) installiert hast, oeffne das Terminal und gib ein:
   ```bash
   brew install git
   ```
2. Methode 2: (Empfohlen) Ueber Xcode installieren: https://developer.apple.com/xcode/ -- Xcode enthaelt integriertes Git. Nach der Installation einfach den Anweisungen folgen.

### Linux

Die meisten Linux-Distributionen koennen Git ueber ihren Paketmanager installieren:

- Ubuntu/Debian:

```bash
sudo apt update
sudo apt install git
```

- CentOS/RHEL:

```bash
sudo yum install git
```

- Installation ueberpruefen: Gib `git --version` im Terminal ein. Wenn eine Versionsnummer angezeigt wird, war die Installation erfolgreich.

## Git initialisieren

Nach der Installation von Git musst du zunaechst deine Benutzerinformationen konfigurieren -- dies ist ein grundlegender Schritt fuer die Verwendung von Git zur Versionskontrolle. Fuehre die folgenden Befehle im Terminal aus (ersetze den Inhalt in Klammern durch deine eigenen Informationen):

```bash
# Globalen Benutzernamen setzen (wird in den Commit-Eintraegen angezeigt)
git config --global user.name "Your Name"

# Globale E-Mail-Adresse setzen (verwende bevorzugt die auf GitHub/GitLab registrierte Adresse)
git config --global user.email "your.email@example.com"
```

Git bettet diese Informationen in jeden Commit-Eintrag als "Autoreninformation" ein. Beim Betrachten der Versionshistorie (z. B. mit `git log`) kannst du klar erkennen, wer welche Codezeile geaendert hat, was die Zurechenbarkeit und Kommunikation erleichtert. In kollaborativen Projekten ermoeglichen einheitliche Identitaetsinformationen den Teammitgliedern, schnell zu erkennen, wer welche Aenderungen vorgenommen hat, was die Zusammenarbeitseffizienz steigert (z. B. durch die Suche nach dem entsprechenden Entwickler ueber Commit-Eintraege).

Du kannst die aktuellen Git-Konfigurationsinformationen einsehen, indem du `git config --list` in der Kommandozeile eingibst, um die erfolgreiche Einrichtung zu bestaetigen.

# Was ist GitHub

GitHub ist eine Git-basierte Code-Hosting-Plattform. Sie bietet nicht nur Remote-Speicher fuer Git-Repositories, sondern enthaelt auch Kollaborationstools (wie Issues, Pull Requests, Projects), die es Entwicklern erleichtern, Code zu teilen und zusammenzuarbeiten. Kurz gesagt: Git ist ein lokales Versionskontroll-Tool, waehrend GitHub eine "Cloud-Festplatte fuer Code-Repositories + Kollaborations-Community" ist.

GitHub ist nicht nur die groesste Code-Hosting-Plattform der Welt, sondern auch die aktivste und einflussreichste Open-Source-Community weltweit. Die Kernidee von "Open Source" besagt, dass jeder den Quellcode der Software herunterladen und ausfuehren kann. Dieses Modell ermoeglicht es Menschen weltweit, den Code anderer zu pruefen, zu aendern oder darauf basierend neue Projekte zu erstellen. Du kannst beispielsweise auf GitHub verschiedene Lerntutorials sowie den vollstaendigen Quellcode von Frameworks zum Training von GPT-Modellen (wie PyTorch) finden. Taeglich arbeiten unzaehlige Menschen weltweit zusammen, um Code zu reviewen und zu verbessern.

![](/zh-cn/stage-2/backend/git-workflow/images/image9.webp)

Viele grosse Unternehmen veroeffentlichen ihre Programme oder Tutorials als Open Source auf GitHub, um Wettbewerbsvorteile in der Branche zu erlangen -- was man auch als eine Form der Werbung betrachten kann. In der GitHub-Community ist die Anzahl der "Sterne" (Stars), die ein Projekt erhaelt, das wichtigste Mass fuer seinen Wert; je mehr Stars ein Projekt oder eine Organisation hat, desto groesser ist seine Glaubwuerdigkeit und sein Einfluss.

![](/zh-cn/stage-2/backend/git-workflow/images/image10.png)

In unserem Kurs werden auch Unterstuetzungsressourcen und Aufgaben in einem dedizierten GitHub-Repository hochgeladen. Durch den Prozess des Hochladens von Aufgaben wirst du dich schrittweise mit der Verwendung von GitHub vertraut machen und eine solide Grundlage fuer die Versionskontrolle bei der zukuenftigen Anwendungsentwicklung schaffen.

## GitHub-Konto registrieren

1. Besuche die [offizielle GitHub-Website](https://github.com/) und klicke oben rechts auf "Sign up".
   ![](/zh-cn/stage-2/backend/git-workflow/images/image11.webp)
2. Gib deine E-Mail-Adresse ein (verwende bevorzugt deine haeufig genutzte Adresse, da Verifizierungen und Benachrichtigungen dorthin gesendet werden), setze ein Passwort (muss Buchstaben, Zahlen und Sonderzeichen enthalten).
3. Schliesse die menschliche Verifizierung ab, bestaetige deine E-Mail gemaess den Anweisungen, und dein Konto ist erstellt.

## Dein erstes Repository auf GitHub erstellen

Als Naechstes erstellen wir den ersten Speicherordner, auch Repository oder "Repo" genannt.

![](/zh-cn/stage-2/backend/git-workflow/images/image12.png)![](/zh-cn/stage-2/backend/git-workflow/images/image13.png)

![](/zh-cn/stage-2/backend/git-workflow/images/image14.png)

1. Repository name: Der Name des Repositories, der anderen angezeigt wird.
2. Description: Eine detaillierte Beschreibung des Repositories.
3. Choose visibility: Fuer persoenliche Repositories gilt: Wenn auf "private" gesetzt, koennen nur du und speziell eingeladene Personen es sehen. Wenn auf "public" gesetzt, koennen alle es sehen.
   Fuer Repositories innerhalb einer Organisation gilt: Bei "Private" koennen nur Organisationsmitglieder es sehen.
   Bei "Public" koennen auch Personen ausserhalb der Organisation es sehen.
4. README: Es ist ueblich, dass jedes Repository eine README-Datei haben sollte. Du kannst sie als vollstaendige Vorstellung des Repositories betrachten, einschliesslich Verwendungsanleitung, Dateiliste und Bedienungshinweisen.
5. Add .gitignore and license:
   1. Die .gitignore-Datei teilt Git mit, bestimmte Ordner oder Dateien beim Upload zu GitHub zu ignorieren, sodass sie nicht verfolgt oder zur Staging-Area hinzugefuegt werden. Dies ist nuetzlich fuer temporaere Testdateien, Abhaengigkeitspakete oder grosse Dateien. Einmal angegeben, werden diese Dateien nicht mehr verfolgt.
   2. License bezieht sich auf die gewaehlte Open-Source-Lizenz. Unterschiedliche Lizenzen regeln detailliert, ob andere deinen Code fuer kommerzielle Zwecke verwenden duerfen, und enthalten weitere Bestimmungen und Bedingungen.

Es wird empfohlen, "Add README" zu aktivieren, die Sichtbarkeit des Repositories auf "Private" zu setzen und den Repository-Namen sowie die Beschreibung nach eigenen Wuenschen auszufuellen. Klicke dann auf "Create repository", um die Erstellung deines ersten Remote-Repositories abzuschliessen.

![](/zh-cn/stage-2/backend/git-workflow/images/image15.png)

Danach hast du ein leeres Repository ohne zusaetzliche Dateien. Jetzt kannst du mit dem Hochladen von Dateien beginnen.

![](/zh-cn/stage-2/backend/git-workflow/images/image16.png)

Der Befehl zum Abrufen des Repositories lautet `git clone`, erfordert jedoch die Repository-Adresse. Du kannst die Repository-Adresse finden, indem du auf den gruennen "Code"-Button klickst, wo dir HTTPS- und SSH-Optionen angezeigt werden. Normalerweise kannst du eine der beiden Methoden verwenden, um das Repository auf deinen lokalen Rechner herunterzuladen (nur so kannst du Dateien aendern und hochladen).

![](/zh-cn/stage-2/backend/git-workflow/images/image17.png)

Im Allgemeinen eignen sich ueber HTTP geklonte Repositories fuer das temporaere Herunterladen und Testen von Repositories anderer, werden aber nicht fuer die eigene Entwicklung empfohlen. Fuer eine bessere Lernerfahrung solltest du zunaechst die SSH-Authentifizierung einrichten.

## Lokalen SSH-Schluessel binden

Bei GitHub bedeutet die "SSH-Protokoll-Bindung" im Wesentlichen, dass du den oeffentlichen Schluessel deines lokalen Geraets mit deinem GitHub-Konto verknuepfst, sodass GitHub dein Geraet ueber das SSH-Protokoll identifizieren kann. Dies ermoeglicht es dir, Remote-Repositories sicher ohne Passwort zu bedienen (wie Clone, Push oder Pull von Code).

Einfach gesagt: Es ist, als wuerdest du deinem Geraet eine "GitHub-exklusive Zugangskarte" geben. Nach der Bindung ueberprueft GitHub diese "Zugangskarte" (deinen oeffentlichen SSH-Schluessel), wenn dein Geraet ueber das SSH-Protokoll auf ein GitHub-Repository zugreift. Sobald dein Geraet als autorisiert bestaetigt wurde, kannst du direkt arbeiten -- ohne jedes Mal Benutzername und Passwort eingeben zu muessen.

> :bulb: Was ist SSH

### Warum wird die SSH-Protokoll-Bindung benoetigt?

GitHub unterstuetzt zwei Hauptprotokolle fuer Repository-Operationen: das HTTPS-Protokoll und das SSH-Protokoll:

- HTTPS-Protokoll: Bei jeder Operation (wie Push) muessen GitHub-Benutzername und -Passwort (oder ein Personal Access Token PAT) eingegeben werden. Der Verifizierungsprozess ist aufwendig und birgt das Risiko der Passwortoffenlegung.
- SSH-Protokoll: Die Authentifizierung erfolgt ueber "Schluesselpaare", sodass kein wiederholtes Passwort-Eingeben erforderlich ist und die verschluesselte Uebertragung sicherer ist.

Die "SSH-Protokoll-Bindung" ist eine Voraussetzung fuer die Aktivierung der GitHub-SSH-Authentifizierung -- erst nachdem der lokale oeffentliche SSH-Schluessel an dein GitHub-Konto "gebunden" wurde, kann GitHub dein Geraet erkennen und SSH-Operationen auf dem Repository erlauben.

### Die Kernlogik der "Bindung": Die Rolle der SSH-Schluesselpaare

Die SSH-Authentifizierung basiert auf Schluesselpaaren (oeffentlicher Schluessel + privater Schluessel), die zusammengehoeorige verschluesselte Dateien sind. Nach der Generierung musst du den "oeffentlichen Schluessel" bei GitHub bereitstellen ("Bindung"), waehrend der "private Schluessel" auf deinem lokalen Geraet verbleibt:

1. Privater Schluessel: Wird im angegebenen Verzeichnis deines lokalen Geraets (z. B. Computers) gespeichert (normalerweise ~/.ssh/) und dient als "dein exklusiver Schluessel", der niemals mit anderen geteilt werden darf.
2. Oeffentlicher Schluessel: Dies ist ein "Schloss", das oeffentlich geteilt werden kann -- du musst es in die "SSH keys list" deines GitHub-Kontos kopieren (der "Bindungs"-Vorgang).

Wenn du ueber SSH ein GitHub-Repository bedienst (z. B. `git push git@github.com:xxx/xxx.git`):

- Dein lokales Geraet verschluesselt die "Operationsanfrage" mit dem privaten Schluessel und sendet sie an GitHub;
- Nach Erhalt der Anfrage versucht GitHub, sie mit dem zuvor gebundenen oeffentlichen Schluessel zu entschluesseln;
- Wenn die Entschluesselung erfolgreich ist, wird dein Geraet als autorisiert bestaetigt und die Operation wird erlaubt; andernfalls wird der Zugriff verweigert.

### Die konkreten Schritte der "Bindung" (Kernablauf)

Sobald du das Prinzip verstanden hast, ist die praktische Umsetzung einfach -- der Kern lautet: "Schluesselpaar generieren -> oeffentlichen Schluessel auf GitHub hochladen":

1. Lokales SSH-Schluesselpaar generieren
   1. Trae verwenden, um den oeffentlichen Schluessel zu erhalten (empfohlen)
      Prompt: `Help me create the SSH key needed for GitHub login. My email is your_email@gmail.com , Please return the public key for me to copy`

   ![](/zh-cn/stage-2/backend/git-workflow/images/image18.webp)

   Nach Eingabe des Prompts musst du auch im linken Terminal die Enter-Taste druecken, da der Befehl sonst wartet und nicht ausgefuehrt wird. Da Trae keine Bedingungspruefungen fuer dich durchfuehren kann, druecke einfach wiederholt Enter.

   Am Ende siehst du auf der rechten Seite, dass Trae den gelesenen oeffentlichen Schluessel zurueckgegeben hat. Kopiere ihn einfach und bereite dich darauf vor, ihn im naechsten Schritt einzufuegen.

   ![](/zh-cn/stage-2/backend/git-workflow/images/image19.webp) 2. Oeffentlichen Schluessel manuell erhalten
   Oeffne dein lokales Terminal (Windows: Git Bash oder PowerShell; macOS/Linux: Terminal) und gib den folgenden Befehl ein (ersetze your_email@example.com durch die E-Mail-Adresse, die du bei der Registrierung deines GitHub-Kontos verwendet hast):

   ```bash
   ssh-keygen -t ed25519 -C "your_email@example.com"
   ```

   1. Druecke Enter, um die Standardwerte zu akzeptieren (Standard-Dateipfad, kein Passwort oder nach Bedarf ein Passwort setzen). Dies generiert zwei Dateien im Verzeichnis ~/.ssh/:
      - id_ed25519: Privater Schluessel (lokal speichern, **niemals teilen**);
      - id_ed25519.pub: Oeffentlicher Schluessel (muss auf GitHub hochgeladen werden).

2. Oeffentlichen Schluessel an dein GitHub-Konto "binden"

Dies ist der Kern-Bindungsschritt -- den lokalen oeffentlichen Schluessel zur "SSH keys list" deines GitHub-Kontos hinzufuegen:

1. Inhalt des oeffentlichen Schluessels kopieren:
   1. Trae:
   2. Windows: Oeffne C:\Users\<your>\.ssh\id_ed25519.pub mit dem Editor und kopiere den gesamten Inhalt;
   3. macOS/Linux: Fuehre `cat ~/.ssh/id_ed25519.pub` im Terminal aus und kopiere die gesamte Ausgabe (vom beginnenden SSH-ed25519 bis zur abschliessenden E-Mail-Adresse).
2. Bei GitHub anmelden und zur "SSH Key Management"-Seite navigieren:
   1. Klicke oben rechts auf dein Profilbild -> Settings -> linkes Menue SSH and GPG keys -> klicke auf New SSH key.
      ![](/zh-cn/stage-2/backend/git-workflow/images/image20.png)![](/zh-cn/stage-2/backend/git-workflow/images/image21.png)
   2. Gib einen beliebigen Titel ein (z. B. "your local computer's SSH") und fuege dann deinen gerade kopierten oeffentlichen SSH-Schluessel hier ein.

![](/zh-cn/stage-2/backend/git-workflow/images/image22.png)

![](/zh-cn/stage-2/backend/git-workflow/images/image23.png)

3. Ueberpruefen, ob die Bindung erfolgreich war

Gib den folgenden Befehl im Terminal ein (**Trae kann auch folgende Operationen ausfuehren**), um zu testen, ob GitHub dein Geraet erkennen kann:

```bash
ssh -T git@github.com
```

- Wenn du etwas wie "Hi [your GitHub username]! You've successfully authenticated..." siehst, wurde dein Schluessel erfolgreich gebunden;
- Wenn ein Fehler auftritt, liegt dies meist daran, dass der oeffentliche Schluessel unvollstaendig kopiert wurde, die Berechtigungen des privaten Schluessels zu hoch sind (dein lokales ~/.ssh/-Verzeichnis sollte nur fuer dich les- und schreibbar sein) usw. Ueberpruefe diese Punkte gemaess den Erfordernissen.

### Wichtige Hinweise

Wenn du mehrere Geraete hast (wie Laptop und Desktop), musst du fuer jedes Geraet ein separates SSH-Schluesselpaar generieren und jeden oeffentlichen Schluessel an dasselbe GitHub-Konto binden -- jedes Geraet hat seine eigene "Zugangskarte".

Teile niemals deinen privaten Schluessel (lade ihn nicht auf GitHub hoch und teile ihn nicht mit anderen), da sonst jemand deine Identitaet annehmen und dein Repository bedienen koennte. Wenn der private Schluessel kompromittiert wurde, loesche sofort den entsprechenden oeffentlichen Schluessel auf GitHub und generiere ein neues Schluesselpaar.

Nach der SSH-Bindung verwende die SSH-Format-Repository-Adresse (z. B. git@github.com:username/repository.git) fuer Operationen, nicht das HTTPS-Format (z. B. https://github.com/username/repository.git). Wenn du ein Repository zuvor mit HTTPS geklont hast, kannst du mit `git remote set-url origin <new>` das Protokoll wechseln.

# GitHub-Operationen mit Trae durchfuehren

Wir haben erklaert, was Git, GitHub und SSH sind und wie man sie konfiguriert. Jetzt kannst du Trae frei fuer Git-Operationen nutzen. Lass uns zunaechst lernen, wie man ein Remote-Repository auf den lokalen Rechner klont.

## Git clone: Bestehendes Repository herunterladen

Du kannst Trae einfach die Adresse des Repositories mitteilen, das du klonen moechtest.

![](/zh-cn/stage-2/backend/git-workflow/images/image24.webp)

## Git pull: Updates aus dem Remote-Repository abrufen

Vor jedem Repository-Update musst du zunaechst die neuesten Aenderungen pullen, da das Repository von mehreren Personen gepflegt werden koennte. Danach kannst du Dateien aendern und pushen.

**Vergiss nicht, den Ordnernamen sowie den relativen oder absoluten Pfad anzugeben, um zu vermeiden, dass in das falsche Repository gepusht wird.**

Prompt: `Help me pull this repository AIID-TEST in ./AIID-TEST.`

## Git commit & Git push: Aenderungen stagen und zu GitHub pushen

Wenn alles bereit ist, kannst du damit beginnen, lokale Dateien zu aendern, Elemente im Ordner hinzuzufuegen oder zu loeschen. Lass Trae dann die Aenderungen erkennen und dir beim Push zu GitHub helfen.

Prompt: `I finished. Commit and push to the repository AIID-TEST in ./AIID-TEST.`

![](/zh-cn/stage-2/backend/git-workflow/images/image25.webp)

Push erfolgreich. Jetzt kannst du die aktualisierten Inhalte auf GitHub sehen.

# Referenzmaterialien

- Pro Git book https://git-scm.com/book/en/v2
- GitHub Docs https://docs.github.com/en
