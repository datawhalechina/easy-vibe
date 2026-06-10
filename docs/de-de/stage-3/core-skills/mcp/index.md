# Claude Code MCP Vollständiger Leitfaden

## Was ist Claude Code MCP?

**Claude Code** ist das offizielle KI-Kommandozeilen-Tool von Anthropic, während **MCP (Model Context Protocol)** das Protokoll ist, das es Claude Code ermöglicht, sich mit externen Tools und Diensten zu verbinden.

Einfach gesagt: MCP verwandelt Claude Code von einem KI-Assistenten, der nur lokale Dateien lesen und schreiben kann, in einen Super-Assistenten, der auf GitHub, Datenbanken, APIs und Cloud-Dienste zugreifen kann.

## Warum MCP in Claude Code nutzen?

### Claude Code ohne MCP

```text
Was Sie tun können:
✓ Lokale Dateien lesen
✓ Code bearbeiten
✓ Befehle ausführen
✓ Bash-Tools nutzen

Was Sie nicht tun können:
✗ Ihre GitHub Issues ansehen
✗ Auf eine Cloud-Datenbank zugreifen
✗ Externe APIs aufrufen
✓ Echtzeitwetter abrufen
```

### Claude Code mit MCP

```text
Was Sie tun können:
✓ Alle ursprünglichen Funktionen
✓ GitHub Issues und PRs ansehen / erstellen
✓ SQLite- und PostgreSQL-Datenbanken abfragen
✓ Auf externe Dienste wie Notion und Slack zugreifen
✓ Echtzeitwetter- und Kartendaten abrufen
✓ Browser-Automatisierung
✓ ...und mehr
```

## Schnellstart

### Schritt 1: Verstehen, wo die Konfigurationsdateien liegen

Die MCP-Konfigurationsdateien von Claude Code befinden sich unter:

| Ebene | Konfigurationsdateipfad | Geltungsbereich |
|-----|-------------|----------|
| **Benutzerebene** | `~/.claude.json` | Alle Projekte |
| **Projektebene** | `.claude/mcp.json` | Aktuelles Projekt |

Es wird empfohlen, zuerst **Projektebenen-Konfiguration** zu verwenden, damit verschiedene Projekte verschiedene MCP-Dienste nutzen können.

### Schritt 2: MCP-Server mit natürlicher Sprache hinzufügen

In Claude Code müssen Sie Konfigurationsdateien nicht manuell bearbeiten oder Befehle auswendig lernen. Sie können beschreiben, was Sie wollen, in natürlicher Sprache:

```text
Sie: Helfen Sie mir, einen GitHub MCP-Server hinzuzufügen. Mein Token ist ghp_xxx

Claude: Ich helfe Ihnen, den GitHub MCP-Server zu konfigurieren...

[Aktualisiert automatisch .claude/mcp.json]
```

```text
Sie: Fügen Sie einen SQLite-Datenbankserver hinzu. Die Datenbankdatei liegt unter ./data/app.db

Claude: Okay, ich konfiguriere den SQLite MCP-Server...
```

```text
Sie: Fügen Sie einen HTTP-Typ MCP-Server mit der Adresse https://api.example.com/mcp hinzu

Claude: Ich füge diesen Remote-MCP-Server hinzu...
```

### Schritt 3: Konfiguration verifizieren

Fragen Sie Claude Code direkt:

```text
Sie: Welche MCP-Server sind jetzt verfügbar?

Claude: Aktuell konfigurierte MCP-Server:
• github - GitHub-Integration
• sqlite - SQLite-Datenbank
• filesystem - Dateisystemzugriff
```

Oder verwenden Sie den Diagnose-Befehl:

```text
/doctor
```

### Schritt 4: Nutzung starten

Sobald die Konfiguration erfolgreich ist, können Sie MCP-Funktionen direkt mit natürlicher Sprache aufrufen:

```text
Sie: Helfen Sie mir, ein Issue auf GitHub zu erstellen

Claude: Ich kann Ihnen helfen, ein GitHub Issue zu erstellen. Bitte teilen Sie mir mit:
- die Repository-Adresse, zum Beispiel owner/repo
- den Issue-Titel
- die Issue-Beschreibung
```

## Verwaltung in natürlicher Sprache in Claude Code

### MCP-Server ansehen und verwalten

Sie können mit Claude Code vollständig in natürlicher Sprache interagieren:

```text
Sie: Alle konfigurierten MCP-Server auflisten

Sie: Verbindungsstatus der MCP-Server prüfen

Sie: Den MCP-Server namens notion löschen

Sie: Das Token für den github-Server aktualisieren
```

### Probleme diagnostizieren

Wenn Sie auf Probleme stoßen:

```text
Sie: Prüfen Sie, was mit der MCP-Verbindung nicht stimmt

Claude: [führt automatisch Diagnosen durch, analysiert Konfigurationsdateien und prüft Serverstatus]
```

## Konfigurationsmethoden im Detail

### Benutzerebenen-Konfiguration, global

Bearbeiten Sie `~/.claude.json`:

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/Users/yourname/Documents"]
    },
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "your-token"
      }
    }
  }
}
```

### Projektebenen-Konfiguration, empfohlen

Bearbeiten Sie `.claude/mcp.json` im Projektverzeichnis:

```json
{
  "mcpServers": {
    "project-db": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-sqlite", "--db-path", "./data/app.db"]
    }
  }
}
```

**Vorteile der projektebenen Konfiguration:**

- Teammitglieder können die Konfiguration durch Git-Commit teilen
- Verschiedene Projekte können verschiedene MCP-Dienste nutzen
- Konfiguration ist flexibler und verschmutzt nicht die globalen Einstellungen

### Transportmodi

Claude Code unterstützt drei Transportmodi:

#### STDIO, lokaler Prozess

```json
{
  "mcpServers": {
    "local-tool": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/path"]
    }
  }
}
```

#### HTTP, entfernter Dienst

```json
{
  "mcpServers": {
    "remote-api": {
      "url": "https://api.example.com/mcp",
      "transport": "http",
      "headers": {
        "Authorization": "Bearer your-token"
      }
    }
  }
}
```

#### SSE, Server-Sent Events

```json
{
  "mcpServers": {
    "streaming": {
      "url": "https://api.example.com/sse",
      "transport": "sse"
    }
  }
}
```

## Praktische Beispiele

### Beispiel 1: GitHub-Workflow-Automatisierung

```text
Sie: Helfen Sie mir, die aktuellen Änderungen zu GitHub zu pushen und dann einen PR mit dem Titel "Neue Funktion hinzufügen" zu erstellen

Claude:
1. Aktuellen Git-Status prüfen...
2. Neuen Branch feature/new-feature erstellen...
3. Änderungen committen...
4. Zu Remote pushen...
5. github_create_pull_request aufrufen, um den PR zu erstellen...
6. PR erstellt: https://github.com/owner/repo/pull/123
```

### Beispiel 2: Datenbankabfrage

```text
Sie: Die 10 zuletzt registrierten Nutzer in der Datenbank abfragen

Claude:
1. Mit SQLite-Datenbank verbinden...
2. Abfrage ausführen: SELECT * FROM users ORDER BY created_at DESC LIMIT 10
3. Ergebnisse zurückgeben:
   - Zhang San (zhang@example.com) - 2025-02-28
   - Li Si (li@example.com) - 2025-02-27
   ...
```

### Beispiel 3: Webseite-Screenshot-Analyse

```text
Sie: https://example.com öffnen, einen Screenshot machen und das Seitendesign analysieren

Claude:
1. Browser starten...
2. Zu https://example.com navigieren...
3. Screenshot aufnehmen...
4. [Gibt Screenshot zurück]
5. Seitendesign-Analyse:
   - Das Layout verwendet ein zentriertes Design mit max-width 1200px
   - Die Hauptfarbe ist Blau (#3b82f6)
   - Die Navigationsleiste ist oben fixiert
   ...
```

### Beispiel 4: Integration mit Notion

```text
Sie: Die Notizen, die ich gerade geschrieben habe, in Notion speichern

Claude:
1. Notion MCP-Server verwenden...
2. Neue Seite erstellen...
3. Gespeichert: https://notion.so/page/xxx
```

## Debugging-Tipps

### Diagnose mit natürlicher Sprache

Wenn etwas schiefgeht, sagen Sie es Claude Code einfach direkt:

```text
Sie: Mein MCP-Server kann sich nicht verbinden. Bitte prüfen Sie das für mich

Sie: Der GitHub MCP-Tool-Aufruf ist fehlgeschlagen. Was ist der Grund?

Sie: Warum zeigt der sqlite-Server immer "connecting" an?
```

Claude Code wird automatisch:

1. Das Konfigurationsdateiformat prüfen
2. Umgebungsvariablen validieren
3. Die Serververbindung testen
4. Konkrete Lösungsvorschläge geben

### Häufige Problembehebung

| Problem | Mögliche Ursache | Lösung |
|-----|---------|----------|
| Server nicht verbunden | Konfigurationsdateiformat-Fehler | JSON-Syntax prüfen |
| Tool kann nicht aufgerufen werden | Unzureichende Berechtigungen | Umgebungsvariablen prüfen |
| Verbindungszeitüberschreitung | Netzwerkproblem | URL oder Netzwerk prüfen |
| Prozess stürzt ab | Bug im Server-Code | Server-Logs prüfen |

### Manueller Diagnose-Befehl

```text
/doctor
```

Beispielausgabe:

```text
System Diagnostic Report:
===============

Claude Code: v2.5.0 ✓
Node.js: v20.0.0 ✓

MCP-Server-Status:
• github: ✓ Verbunden (12 Tools)
• sqlite: ✗ Verbindung fehlgeschlagen - Datenbankdatei nicht gefunden
• puppeteer: ✓ Verbunden (8 Tools)

Vorschläge:
1. Prüfen Sie, ob der sqlite-Datenbankpfad korrekt ist
2. Stellen Sie sicher, dass das .claude/mcp.json-Format korrekt ist
```

## Best Practices

### 1. Projektebenen-Konfiguration bevorzugen

**Warum projektebene Konfiguration empfehlen?**

Verschiedene Projekte benötigen oft verschiedene MCP-Dienste. Zum Beispiel benötigt ein Frontend-Projekt möglicherweise Browser-Test-Tools, während ein Backend-Projekt Datenbankverbindungen benötigt. Mit projektebenen Konfiguration kann jedes Projekt seinen eigenen dedizierten Satz von MCP-Servern haben, was das Chaos einer großen globalen Konfiguration vermeidet.

Wichtiger noch: Projektebenen-Konfiguration kann in Git committet werden. Nachdem Teammitglieder das Projekt geklont haben, können sie direkt dieselben MCP-Dienste nutzen, ohne alles neu zu konfigurieren.

```text
Projekt A, Frontend-Projekt -> .claude/mcp.json enthält Browser-Test-MCP
Projekt B, Backend-Projekt -> .claude/mcp.json enthält Datenbank-MCP
```

### 2. Sensible Informationen in Umgebungsvariablen speichern

**Schreiben Sie niemals Geheimnisse direkt in die Konfigurationsdatei.**

Konfigurationsdateien können versehentlich in Git committet werden und Schlüssel leaken. Der richtige Ansatz ist, sensible Werte in Umgebungsvariablen zu speichern und nur die Variablennamen aus der Konfigurationsdatei zu referenzieren. Auf diese Weise bleiben die echten Geheimnisse selbst dann verborgen, wenn die Konfigurationsdatei öffentlich wird.

```json
{
  "env": {
    "GITHUB_TOKEN": "$GITHUB_TOKEN",
    "GITHUB_TOKEN": "ghp_abc123"
  }
}
```

Die erste Form ist gut, weil sie aus der Umgebungsvariablen liest. Die zweite Form ist schlecht, weil sie ein Geheimnis direkt hardcodiert.

### 3. Versionen anheften

**Warum müssen Sie Versionen anheften?**

Standardmäßig wird `npx -y` immer die neueste Version eines MCP-Servers verwenden. Dies kann Probleme verursachen: Eine neue Version kann Breaking Changes einführen oder ein Paket kann plötzlich entfernt oder umbenannt werden.

Indem Sie `@version` an den Paketnamen anhängen, stellen Sie sicher, dass immer eine validierte Version verwendet wird, was Überraschungen durch automatische Upgrades reduziert.

```json
{
  "command": "npx",
  "args": ["-y", "@modelcontextprotocol/server-github@1.2.3"]
}
```

### 4. Ihre MCP-Konfiguration dokumentieren

**Helfen Sie Teamkollegen, die MCP-Einrichtung schnell zu verstehen**

Wenn ein Projekt mehrere MCP-Server enthält, verstehen neue Teammitglieder möglicherweise nicht, wofür jeder Server gedacht ist oder welche Konfiguration er erfordert. Eine `README.md` im `.claude/`-Verzeichnis zu erstellen, die den Zweck jedes Servers, die erforderliche Konfiguration und wie man Zugangsdaten erhält erklärt, kann die Kommunikationskosten erheblich senken.

Erstellen Sie `.claude/README.md` in Ihrem Projekt:

```markdown
# MCP-Konfigurationshinweise

In diesem Projekt verwendete MCP-Server:

## github
Für GitHub-Automatisierung. Erfordert GITHUB_TOKEN.

## sqlite
Verbindet sich mit ./data/app.db zum Abfragen und Ändern von Daten.

## puppeteer
Für E2E-Tests.
```

## Claude Code vs. Claude Desktop

| Funktion | Claude Code | Claude Desktop |
|-----|-------------|----------------|
| **Konfigurationsdatei** | `~/.claude.json` oder `.claude/mcp.json` | `claude_desktop_config.json` |
| **Projektebenen-Konfiguration** | ✓ Unterstützt | ✗ Nicht unterstützt |
| **Verwaltung in natürlicher Sprache** | ✓ Unterstützt | ✗ Manuelle Bearbeitung erforderlich |
| **Diagnose** | ✓ `/doctor` | ✗ Keine |
| **Hot Reload** | ✓ Automatisch | ✗ App-Neustart erforderlich |
| **Anwendungsfälle** | Entwicklungs-Workflow, CI/CD | Tägliche Nutzung, Büroaufgaben |

## Häufige MCP-Server

> Hinweis: Die vollständige MCP-Server-Liste finden Sie im Anhang: [MCP-Server-Verzeichnis](/de-de/appendix/8-artificial-intelligence/ai-protocols)

### GitHub-Server

**Funktion:** Issues, PRs, Repository-Verwaltung

```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "your-token"
      }
    }
  }
}
```

**Token erhalten von:** https://github.com/settings/tokens

### SQLite-Server

**Funktion:** SQLite-Datenbanken abfragen und verwalten

```json
{
  "mcpServers": {
    "sqlite": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-sqlite", "--db-path", "./data/database.db"]
    }
  }
}
```

### Dateisystem-Server

**Funktion:** Auf Dateien in einem bestimmten Verzeichnis zugreifen

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/Users/yourname/Documents"]
    }
  }
}
```

### Puppeteer Browser-Automatisierung

**Funktion:** Browser-Steuerung, Screenshots, automatisierte Tests

```json
{
  "mcpServers": {
    "puppeteer": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-puppeteer"]
    }
  }
}
```

### Brave Search-Server

**Funktion:** Websuche

```json
{
  "mcpServers": {
    "brave-search": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-brave-search"],
      "env": {
        "BRAVE_API_KEY": "your-brave-api-key"
      }
    }
  }
}
```

## Referenzressourcen

### Offizielle Dokumentation

- [Claude Code offizielle Dokumentation - MCP](https://docs.anthropic.com/zh-CN/docs/claude-code/mcp)
- [MCP offizielle Website](https://modelcontextprotocol.io/)
- [MCP-Spezifikationsdokumentation](https://modelcontextprotocol.io/specification/)
- [MCP GitHub-Repository](https://github.com/modelcontextprotocol)

### Offizielle Server

- [@modelcontextprotocol/server-github](https://github.com/modelcontextprotocol/servers/tree/main/src/github) - GitHub-Integration
- [@modelcontextprotocol/server-sqlite](https://github.com/modelcontextprotocol/servers/tree/main/src/sqlite) - SQLite-Datenbank
- [@modelcontextprotocol/server-postgres](https://github.com/modelcontextprotocol/servers/tree/main/src/postgres) - PostgreSQL-Datenbank
- [@modelcontextprotocol/server-filesystem](https://github.com/modelcontextprotocol/servers/tree/main/src/filesystem) - Dateisystemzugriff
- [@modelcontextprotocol/server-puppeteer](https://github.com/modelcontextprotocol/servers/tree/main/src/puppeteer) - Browser-Automatisierung
- [@modelcontextprotocol/server-fetch](https://github.com/modelcontextprotocol/servers/tree/main/src/fetch) - Web-Fetching
- [@modelcontextprotocol/server-brave-search](https://github.com/modelcontextprotocol/servers/tree/main/src/brave-search) - Brave-Suche
- [@modelcontextprotocol/server-git](https://github.com/modelcontextprotocol/servers/tree/main/src/git) - Git-Operationen

### Tutorial-Artikel

- [Eine gründliche Erklärung von MCP-Prinzipien und Praxis](https://view.inews.qq.com/a/20250414A023WV00)
- [MCP (Model Context Protocol) Architektur und Funktionsweise](https://m.toutiao.com/w/1826385835060307/)
- [2025 neuestes Großmodell-Tutorial: vom Einstieg bis zur Beherrschung des MCP-Protokolls](https://m.blog.csdn.net/weixin_45653328/article/details/150916706)
- [MCP von Grund auf lernen (8) - einen MCP-Server bauen](https://juejin.cn/post/7582510291667419187)

### Konfigurationsleitfäden

- [Claude Code Best Practices](https://www.anthropic.com/engineering/claude-code-best-practices)
- [Claude Code vollständiger Konfigurationsleitfaden](https://juejin.cn/post/7576838552472043563)

### Entwicklungs-Tutorials

- [Anfängerfreundlicher MCP-Server-Praxis-Leitfaden in TypeScript und Python](https://m.blog.csdn.net/ztt123654/article/details/150844207)
- [Ultimativer MCP-Server-Bau-Leitfaden: vollständige TypeScript- und Python-Tutorials](https://m.blog.csdn.net/gitblog_00703/article/details/154862128)
- [Den einfachsten MCP-Server mit TypeScript bauen](https://m.blog.csdn.net/weixin_45653525/article/details/148433757)
- [Einen TypeScript MCP-Server mit Azure Container Applications generieren](https://learn.microsoft.com/zh-cn/azure/developer/ai/build-mcp-server-ts)

### MCP-Server-Ressourcen

- [Awesome MCP Servers](https://github.com/punkpeye/awesome-mcp-servers) - die umfassendste MCP-Server-Liste
- [Offizielles MCP-Registry](https://registry.modelcontextprotocol.io) - Anthropics offizieller App Store
- [MCP.so](https://mcp.so) - Community MCP-Server-Zentrum
- [Glama.ai MCP](https://glama.ai/mcp/servers) - MCP-Verzeichnis mit Bewertungen und Kommentaren
- [Smithery](https://smithery.ai) - MCP-Server-Marktplatz
- [MCPHub](https://mcphub.io/registry) - aufgeräumtes Interface-Verzeichnis
- [LobeHub MCP](https://lobehub.com/zh/mcp) - chinesisches MCP-Verzeichnis

### Karten- und Wetterdienste

- [Amap MCP Server](https://lobehub.com/zh/mcp/luozengchang-mcp-amap)
- [Tencent Standortdienst MCP-Dokumentation](https://lbs.qq.com/service/MCPServer/MCPServerGuide/overview)
- [Caiyun Wetter MCP Server](https://github.com/caiyunapp/mcp-caiyun-weather)
- [OpenWeatherMap MCP Server](https://github.com/CodeByWaqas/weather-mcp-server)

### Community-Ressourcen

- [Everything Claude Code Config](https://github.com/affaan-m/everything-claude-code) - produktionsgrade Claude-Code-Konfigurationssammlung
- [AI Coding Guide](https://github.com/hacket/AICodingGuide) - chinesischer Lernpfad für Claude Code

### Praxisanwendungsfälle

- [BlenderMCP - KI-gesteuerte 3D-Modellierung](https://github.com/Belthur/blender-mcp) - 4.100+ ⭐
- [15 Best Practices für MCP in der Produktion](https://learn.microsoft.com/zh-cn/azure/azure-functions/scenario-mcp-apps)
