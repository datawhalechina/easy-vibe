# Webseite online bringen (Einfach): One-Click-PaaS-Deployment

> 💡 **Was bedeutet "Webseite online bringen"?** Auch "Go-Live" oder "Deployment/Veröffentlichung" genannt. Eine Webseite, die du auf deinem eigenen Computer gebaut hast, kann nur von dir geoeffnet werden. **Online zu bringen bedeutet, sie auf einem Server abzulegen, der 24/7 laeuft, sodass jeder eine URL in seinen Browser eingeben und sie besuchen kann** — genau wie ein Word-Dokument, das nur du lesen kannst, fuer alle sichtbar wird, sobald du es in einem Blog veroeffentlichst; der Unterschied ist, dass du diesmal eine komplette Webseite veroeffentlichst.

In diesem Tutorial zeigen wir dir den **einfachsten Weg, eine Webseite online zu bringen — keinen Server kaufen, kein DevOps lernen**. Verbinde einfach dein GitHub-Repository, klicke ein paar Buttons, und deine Seite ist live. Wir stellen vier beliebte Plattformen vor: **Tencent Cloud CloudBase**, **Vercel**, **Netlify** und **Zeabur**.

# Warum eine PaaS-Plattform statt eines eigenen Servers?

Du fragst dich vielleicht: Wenn am Ende alles "auf einem Server" landet, warum nicht einfach einen eigenen Server kaufen und dort deployen? Die Antwort: **Die Plattformen uebernehmen den ganzen muehsamen Teil fuer dich**.

Wenn du alles manuell deployst, umfasst ein Projekt normalerweise viele Schritte:

1. **Einen Server vorbereiten**
   Zuerst musst du einen Cloud-Server bei einem Anbieter wie Alibaba Cloud, Tencent Cloud oder AWS EC2 kaufen oder mieten. Dann waehlst du Region, CPU, Arbeitsspeicher und Speicher und lernst, wie du dich remote mit ihm verbindest, oft per SSH.
   ![](/zh-cn/stage-2/backend/zeabur-deployment/images/image2.png)

2. **Die Laufzeitumgebung konfigurieren**
   Web-Apps laufen nur unter der richtigen Umgebung. Ein Node.js-Projekt braucht installiertes Node. Ein Python-Projekt braucht Python und seine Abhaengigkeiten. Stimmen die Versionen nicht ueberein, kann die App beim Start scheitern.

3. **Deine Dateien hochladen**
   Du musst deinen lokalen Code und deine Assets auf den Server bringen, oft per Git oder Dateiuebertragungs-Tools. Bei grossen Projekten kann dieser Schritt frustrierend sein, wenn Uploads mittendrin abbrechen.

![](/zh-cn/stage-2/backend/zeabur-deployment/images/image3.png)

4. **Den Dienst starten und testen**
   Nach dem Upload musst du die App starten und pruefen, ob die zugewiesene Adresse funktioniert. Wenn nicht, kann das Problem ein von der Firewall blockierter Port oder ein Anwendungsfehler sein. In dem Fall musst du Logs pruefen.

5. **Warten und aktualisieren**
   Jedes Code-Update bedeutet meist einen weiteren Upload und Neustart. Stuerzt der Server ab, musst du Dienste moeglicherweise manuell neu starten oder einen Prozessmanager konfigurieren, der sie am Leben haelt.

Plattformen wie CloudBase, Vercel, Netlify und Zeabur existieren, um genau diese Komplexitaet zu beseitigen. Sie automatisieren die langweiligen Teile:

- Server kaufen und bereitstellen
- Laufzeitumgebungen konfigurieren
- Code ziehen
- Dienste starten
- Verfuegbarkeit ueberwachen

In vielen Faellen verbindest du einfach ein GitHub-Repository oder laedst deinen Code hoch, und die Plattform erledigt den Rest.

![](/zh-cn/stage-2/backend/zeabur-deployment/images/image4.webp)

---

# Bereitstellungsplattformen im Vergleich

| Plattform | Merkmale | Anwendungsbereich | Kostenloseinheit |
|-----------|----------|-------------------|------------------|
| **Tencent Cloud CloudBase** | Schneller Zugriff in China, tiefe WeChat-Integration | Projekte hauptsaechlich fuer chinesische Nutzer | Vorhanden |
| **Vercel** | Gute Frontend-Framework-Unterstuetzung, enge GitHub-Integration | Moderne Frontend-Projekte (React/Vue/Next.js) | Vorhanden |
| **Netlify** | Umfassende Funktionen, Formularverarbeitung und Authentifizierung | Statische Websites mit erweiterten Funktionen | Vorhanden |
| **Zeabur** | Mehrere Sprachen und Service-Vorlagen, flexible Konfiguration | Komplexe Projekte mit mehreren Diensten (Dify, n8n) | ca. 5 USD/Monat kostenlos |

---

# 1. Tencent Cloud CloudBase

Tencent Cloud CloudBase ist ein einheitlicher Cloud-Backend-Service von Tencent Cloud, besonders geeignet fuer Entwickler in China.

- **Schneller Zugriff in China**: Server stehen in China, geringe Latenz
- **WeChat-Integration**: Einfache Anbindung an WeChat-Mini-Programme und offizielle Konten
- **All-in-One-Loesung**: Statisches Website-Hosting, Cloud-Funktionen, Datenbank, Speicher
- **Grosszuegige kostenloseinheit**: Ausreichend kostenlose Ressourcen fuer Einzelentwickler

## CloudBase verwenden

### Schritt 1: Registrieren und anmelden

Besuche die [Tencent Cloud CloudBase-Konsole](https://console.cloud.tencent.com/tcb) und melde dich mit WeChat oder QQ an.

### Schritt 2: Umgebung erstellen

Klicke auf "Neue Umgebung" und waehle einen Umgebungsnamen (z. B. `my-web-app`).

### Schritt 3: Statisches Website-Hosting aktivieren

Finde in der Umgebungsverwaltung die Funktion "Statisches Website-Hosting" und aktiviere sie.

### Schritt 4: Code bereitstellen

CloudBase bietet drei Bereitstellungsmethoden:

- **Lokales Projekt hochladen**: Direkt statische Dateien hochladen
- **Vorlagenbereitstellung**: Voreingestellte Vorlagen wie React/Vue nutzen
- **Git-Repository-Bereitstellung**: Automatischer Abruf und Bereitstellung von GitHub

### Schritt 5: Eigene Domain konfigurieren (optional)

In den Einstellungen fuer statisches Website-Hosting kannst du eine eigene Domain binden und ein kostenloses HTTPS-Zertifikat beantragen.

---

# 2. Vercel

Vercel ist eine der weltweit beliebtesten Frontend-Bereitstellungsplattformen.

- **Tiefe GitHub-Integration**: Code-Push loest automatisch Bereitstellung aus
- **Automatische Vorschau**: Jeder Pull-Request erhaelt einen eigenen Vorschaulink
- **Globales CDN**: Automatische weltweite Verteilung
- **Serverless-Funktionen**: Backend-APIs direkt im Projekt

> Hinweis: Vercel kann in einigen Netzwerkumgebungen instabil sein.

## Vercel verwenden

### Schritt 1: Konto registrieren

Besuche [Vercel](https://vercel.com) und melde dich mit deinem GitHub-Konto an.

### Schritt 2: Projekt importieren

1. Klicke auf "Add New Project"
2. Waehle das gewuenschte GitHub-Repository

### Schritt 3: Build-Einstellungen konfigurieren

| Framework | Build-Befehl | Ausgabeverzeichnis |
|-----------|-------------|-------------------|
| React | `npm run build` | `build` |
| Vue | `npm run build` | `dist` |
| Next.js | `next build` | - |
| Reines HTML | - | Projektverzeichnis |

### Schritt 4: Bereitstellen

Klicke auf "Deploy" und warte bis der Build abgeschlossen ist. Du erhaeltst eine `xxx.vercel.app`-Domain.

### Schritt 5: Eigene Domain (optional)

In den Projekteinstellungen unter "Domains" kannst du deine eigene Domain hinzufuegen.

---

# 3. Netlify

Netlify ist eine weitere beliebte Frontend-Bereitstellungsplattform mit umfassenden Funktionen.

- **Umfassende Funktionen**: Formularverarbeitung, Authentifizierung, Edge-Funktionen
- **Tiefe Git-Integration**: GitHub, GitLab, Bitbucket
- **Zweig-Vorschau**: Jeder Zweig erhaelt automatisch einen Vorschaulink
- **Globales CDN**: Automatische weltweite Verteilung
- **Formularverarbeitung**: Formulareingaben ohne Backend-Code

## Netlify verwenden

### Schritt 1: Konto registrieren

Besuche [Netlify](https://www.netlify.com) und klicke auf "Sign up".

### Schritt 2: Projekt importieren

1. Klicke auf "Add new site" > "Import an existing project"
2. Waehle dein Code-Hosting-Plattform
3. Autorisiere Netlify fuer den Zugriff auf dein Repository

### Schritt 3: Build-Einstellungen konfigurieren

| Framework | Build-Befehl | Veroeffentlichungsverzeichnis |
|-----------|-------------|------------------------------|
| React | `npm run build` | `build` |
| Vue | `npm run build` | `dist` |
| Angular | `ng build` | `dist/<Projektname>` |
| Next.js | `next build` | `out` |
| Reines HTML | - | `.` |

### Schritt 4: Bereitstellen

Klicke auf "Deploy site". Nach Abschluss erhaeltst du eine `xxx.netlify.app`-Domain.

### Schritt 5: Eigene Domain (optional)

1. Gehe zu Site-Einstellungen > "Domain management"
2. Klicke auf "Add custom domain"
3. Konfiguriere DNS-Eintraege

### Besondere Funktionen

#### Formularverarbeitung

```html
<form name="contact" netlify>
  <p>
    <label>Name: <input type="text" name="name" /></label>
  </p>
  <p>
    <label>E-Mail: <input type="email" name="email" /></label>
  </p>
  <p>
    <label>Nachricht: <textarea name="message"></textarea></label>
  </p>
  <p>
    <button type="submit">Senden</button>
  </p>
</form>
```

#### Netlify Functions

```javascript
exports.handler = async (event, context) => {
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Hello from Netlify!" })
  };
};
```

#### Lokale Entwicklung

```bash
# Netlify CLI installieren
npm install -g netlify-cli

# Anmelden
netlify login

# Lokalen Entwicklungsserver starten
netlify dev
```

---

# 4. Zeabur

Zeabur ist eine aufstrebende Bereitstellungsplattform, besonders geeignet fuer komplexe Projekte mit mehreren Diensten.

- **Reichhaltige Service-Vorlagen**: Dify, n8n, Datenbanken und mehr
- **Mehrere Bereitstellungsmethoden**: GitHub, Vorlagen, Docker, lokale Projekte
- **Flexible Service-Kombinationen**: Mehrere verbundene Dienste in einem Projekt
- **Nutzungsabhaengige Abrechnung**: Bezahlung nur fuer tatsaechliche Nutzung

## Dify mit Zeabur bereitstellen

![](/zh-cn/stage-2/backend/zeabur-deployment/images/image5.webp)

Oeffne die [Zeabur-Konsole](https://zeabur.com/projects) und klicke auf "New Project".

![](/zh-cn/stage-2/backend/zeabur-deployment/images/image8.png)

Die Erstellungsmethoden umfassen:

1. **GitHub**: Verbindung zu deinem GitHub-Konto
2. **Vorlage (Template)**: Basierend auf Vorlagen bereitstellen
3. **Datenbanken**: Datenbank-Services bereitstellen
4. **Funktionen (Functions)**: JavaScript- oder Python-Code bereitstellen
5. **Lokales Projekt**: Ordner hochladen
6. **Docker-Image**: Bereitgestelltes Docker-Image deployen

![](/zh-cn/stage-2/backend/zeabur-deployment/images/image9.png)

Waehle **Vorlage** und suche nach "dify". Waehle eine Version aus.

![](/zh-cn/stage-2/backend/zeabur-deployment/images/image15.png)

Gib einen Namen ein, um eine temporaere Domain zu generieren.

![](/zh-cn/stage-2/backend/zeabur-deployment/images/image16.png)

Warte, bis alle Dienste gestartet sind. Klicke auf den Nginx-Service, um die Zugriffsadresse zu erhalten.

![](/zh-cn/stage-2/backend/zeabur-deployment/images/image17.png)

Nach kurzer Wartezeit siehst du die Dify-Anmeldeseite.

![](/zh-cn/stage-2/backend/zeabur-deployment/images/image18.png)

## Schlangenspiel mit Zeabur und Trae bereitstellen

### HTML-Framework verwenden

![](/zh-cn/stage-2/backend/zeabur-deployment/images/image23.webp)

Lass Trae ein HTML-basiertes Schlangenspiel generieren und lade den Ordner ueber Zeaburs lokale Bereitstellung hoch.

![](/zh-cn/stage-2/backend/zeabur-deployment/images/image27.webp)

Klicke auf "Network" > "Generate Domain", um eine oeffentliche Adresse zu erstellen.

![](/zh-cn/stage-2/backend/zeabur-deployment/images/image28.png)

![](/zh-cn/stage-2/backend/zeabur-deployment/images/image29.png)

![](/zh-cn/stage-2/backend/zeabur-deployment/images/image30.png)

### React-Framework verwenden

![](/zh-cn/stage-2/backend/zeabur-deployment/images/image31.webp)

React-Anwendungen erfordern eine Anpassung des Standard-Ports, da Zeabur nur Anwendungen auf Port 8080 unterstuetzt.

Aendere den Standard-Port von 3000 auf 8080, z. B. indem du Trae anweist: "Bitte aendere den Standard-Port dieses React-Projekts auf 8080."

![](/zh-cn/stage-2/backend/zeabur-deployment/images/image33.webp)

![](/zh-cn/stage-2/backend/zeabur-deployment/images/image34.png)

![](/zh-cn/stage-2/backend/zeabur-deployment/images/image35.webp)

![](/zh-cn/stage-2/backend/zeabur-deployment/images/image36.png)

---

# Projekte stoppen und loeschen (Zeabur)

Da aktivierte Serverressourcen Kosten verursachen, solltest du ungenutzte Dienste immer rechtzeitig stoppen.

Klicke auf "Settings" im Projekt, scrolle nach unten:

![](/zh-cn/stage-2/backend/zeabur-deployment/images/image21.webp)

![](/zh-cn/stage-2/backend/zeabur-deployment/images/image22.png)

- **Suspend All Services**: Alle Dienste pausieren
- **Restart All Services**: Alle Dienste neu starten
- **Delete Project**: Projekt vollstaendig loeschen

---

# Zusammenfassung

In diesem Tutorial haben wir vier haeufig genutzte Web-Bereitstellungsplattformen vorgestellt:

1. **Tencent Cloud CloudBase**: Fuer chinesische Nutzer, schnelle Zugriffsgeschwindigkeit
2. **Vercel**: Fuer moderne Frontend-Framework-Projekte, enge GitHub-Integration
3. **Netlify**: Umfassende Funktionen, Formularverarbeitung und Authentifizierung
4. **Zeabur**: Fuer komplexe Projekte mit mehreren Diensten

Der Kernprozess ist bei allen Plattformen aehnlich: Code vorbereiten > Plattform waehlen > Build-Einstellungen konfigurieren > Bereitstellen. Mit diesen Faehigkeiten kannst du deine entwickelten Anwendungen mit der ganzen Welt teilen!
