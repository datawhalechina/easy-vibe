# Guide complet de Claude Code MCP

## Qu'est-ce que Claude Code MCP ?

**Claude Code** est l'outil officiel en ligne de commande d'IA d'Anthropic, tandis que **MCP (Model Context Protocol)** est le protocole qui permet à Claude Code de se connecter à des outils et services externes.

En termes simples, MCP transforme Claude Code d'un assistant IA qui ne peut que lire et écrire des fichiers locaux en un super-assistant capable d'accéder à GitHub, aux bases de données, aux API et aux services cloud.

## Pourquoi utiliser MCP dans Claude Code ?

### Claude Code sans MCP

```text
Ce que vous pouvez faire :
✓ Lire des fichiers locaux
✓ Éditer du code
✓ Exécuter des commandes
✓ Utiliser les outils Bash

Ce que vous ne pouvez pas faire :
✗ Voir vos GitHub Issues
✗ Accéder à une base de données cloud
✗ Appeler des API externes
✓ Obtenir la météo en temps réel
```

### Claude Code avec MCP

```text
Ce que vous pouvez faire :
✓ Toutes les fonctions originales
✓ Voir / créer des GitHub Issues et PRs
✓ Interroger des bases de données SQLite et PostgreSQL
✓ Accéder à des services externes comme Notion et Slack
✓ Obtenir la météo en temps réel et des données cartographiques
✓ Automatisation de navigateur
✓ ...et plus encore
```

## Démarrage rapide

### Étape 1 : Comprendre où se trouvent les fichiers de configuration

Les fichiers de configuration MCP de Claude Code se trouvent à :

| Niveau | Chemin du fichier de configuration | Portée |
|-----|-------------|----------|
| **Niveau utilisateur** | `~/.claude.json` | Tous les projets |
| **Niveau projet** | `.claude/mcp.json` | Projet actuel |

Il est recommandé d'utiliser d'abord la **configuration au niveau projet**, pour que différents projets puissent utiliser différents services MCP.

### Étape 2 : Ajouter des serveurs MCP en langage naturel

Dans Claude Code, vous n'avez pas besoin d'éditer manuellement les fichiers de configuration ou de mémoriser des commandes. Vous pouvez décrire ce que vous voulez en langage naturel :

```text
Vous : Aidez-moi à ajouter un serveur GitHub MCP. Mon token est ghp_xxx

Claude : Je vais vous aider à configurer le serveur GitHub MCP...

[Mise à jour automatique de .claude/mcp.json]
```

```text
Vous : Ajoutez un serveur de base de données SQLite. Le fichier de base de données est à ./data/app.db

Claude : D'accord, je vais configurer le serveur SQLite MCP...
```

```text
Vous : Ajoutez un serveur MCP de type HTTP avec l'adresse https://api.example.com/mcp

Claude : Je vais ajouter ce serveur MCP distant...
```

### Étape 3 : Vérifier la configuration

Demandez directement à Claude Code :

```text
Vous : Quels serveurs MCP sont disponibles maintenant ?

Claude : Serveurs MCP actuellement configurés :
• github - Intégration GitHub
• sqlite - Base de données SQLite
• filesystem - Accès au système de fichiers
```

Ou utilisez la commande de diagnostic :

```text
/doctor
```

### Étape 4 : Commencer à utiliser

Une fois la configuration réussie, vous pouvez appeler les fonctions MCP directement en langage naturel :

```text
Vous : Aidez-moi à créer une Issue sur GitHub

Claude : Je peux vous aider à créer une Issue GitHub. Veuillez me dire :
- l'adresse du dépôt, par exemple owner/repo
- le titre de l'Issue
- la description de l'Issue
```

## Gestion en langage naturel dans Claude Code

### Voir et gérer les serveurs MCP

Vous pouvez interagir avec Claude Code entièrement en langage naturel :

```text
Vous : Listez tous les serveurs MCP configurés

Vous : Vérifiez le statut de connexion des serveurs MCP

Vous : Supprimez le serveur MCP nommé notion

Vous : Mettez à jour le token pour le serveur github
```

### Diagnostiquer les problèmes

Quand vous rencontrez des problèmes :

```text
Vous : Vérifiez ce qui ne va pas avec la connexion MCP

Claude : [exécutera automatiquement les diagnostics, analysera les fichiers de configuration et vérifiera le statut du serveur]
```

## Méthodes de configuration en détail

### Configuration au niveau utilisateur, globale

Éditez `~/.claude.json` :

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/Users/votrenom/Documents"]
    },
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "votre-token"
      }
    }
  }
}
```

### Configuration au niveau projet, recommandée

Éditez `.claude/mcp.json` à la racine du projet :

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

**Avantages de la configuration au niveau projet :**

- Les membres de l'équipe peuvent partager la configuration en la committant dans Git
- Différents projets peuvent utiliser différents services MCP
- La configuration est plus flexible et ne pollue pas les paramètres globaux

### Modes de transport

Claude Code supporte trois modes de transport :

#### STDIO, processus local

```json
{
  "mcpServers": {
    "local-tool": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/chemin"]
    }
  }
}
```

#### HTTP, service distant

```json
{
  "mcpServers": {
    "remote-api": {
      "url": "https://api.example.com/mcp",
      "transport": "http",
      "headers": {
        "Authorization": "Bearer votre-token"
      }
    }
  }
}
```

#### SSE, événements envoyés par le serveur

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

## Exemples pratiques

### Exemple 1 : Automatisation du flux de travail GitHub

```text
Vous : Aidez-moi à pousser les modifications actuelles vers GitHub, puis créez une PR intitulée « Add new feature »

Claude :
1. Vérification du statut git actuel...
2. Création d'une nouvelle branche feature/new-feature...
3. Commit des modifications...
4. Push vers le distant...
5. Appel de github_create_pull_request pour créer la PR...
6. PR créée : https://github.com/owner/repo/pull/123
```

### Exemple 2 : Requête de base de données

```text
Vous : Interrogez les 10 utilisateurs les plus récemment inscrits dans la base de données

Claude :
1. Connexion à la base de données SQLite...
2. Exécution de la requête : SELECT * FROM users ORDER BY created_at DESC LIMIT 10
3. Résultats retournés :
   - Zhang San (zhang@example.com) - 2025-02-28
   - Li Si (li@example.com) - 2025-02-27
   ...
```

### Exemple 3 : Capture d'écran et analyse de page web

```text
Vous : Ouvrez https://example.com, prenez une capture d'écran et analysez le design de la page

Claude :
1. Lancement du navigateur...
2. Navigation vers https://example.com...
3. Capture d'écran...
4. [Retourne la capture d'écran]
5. Analyse du design de la page :
   - La mise en page utilise un design centré avec une largeur maximale de 1200px
   - La couleur principale est le bleu (#3b82f6)
   - La barre de navigation est fixée en haut
   ...
```

### Exemple 4 : Intégration avec Notion

```text
Vous : Sauvegardez les notes que je viens d'écrire dans Notion

Claude :
1. Utilisation du serveur MCP Notion...
2. Création d'une nouvelle page...
3. Sauvegardé : https://notion.so/page/xxx
```

## Conseils de débogage

### Diagnostiquer en langage naturel

Quand quelque chose ne va pas, dites-le simplement à Claude Code :

```text
Vous : Mon serveur MCP ne peut pas se connecter. Veuillez vérifier pour moi

Vous : L'appel de l'outil GitHub MCP a échoué. Quelle est la raison ?

Vous : Pourquoi le serveur sqlite affiche toujours « connecting » ?
```

Claude Code effectuera automatiquement :

1. Vérification du format du fichier de configuration
2. Validation des variables d'environnement
3. Test de la connexion au serveur
4. Proposition de suggestions de correction concrètes

### Résolution des problèmes courants

| Problème | Cause possible | Solution |
|-----|---------|----------|
| Serveur non connecté | Erreur de format du fichier de configuration | Vérifiez la syntaxe JSON |
| Outil ne peut pas être appelé | Permissions insuffisantes | Vérifiez les variables d'environnement |
| Délai de connexion | Problème réseau | Vérifiez l'URL ou le réseau |
| Crash du processus | Bug dans le code du serveur | Vérifiez les logs du serveur |

### Commande de diagnostic manuel

```text
/doctor
```

Exemple de sortie :

```text
Rapport de diagnostic système :
===============

Claude Code : v2.5.0 ✓
Node.js : v20.0.0 ✓

Statut des serveurs MCP :
• github : ✓ Connecté (12 outils)
• sqlite : ✗ Connexion échouée - Fichier de base de données introuvable
• puppeteer : ✓ Connecté (8 outils)

Suggestions :
1. Vérifiez si le chemin de la base de données sqlite est correct
2. Assurez-vous que le format .claude/mcp.json est correct
```

## Bonnes pratiques

### 1. Privilégier la configuration au niveau projet

**Pourquoi recommander la configuration au niveau projet ?**

Différents projets nécessitent souvent différents services MCP. Par exemple, un projet frontend peut avoir besoin d'outils de test de navigateur, tandis qu'un projet backend peut nécessiter des connexions à des bases de données. Avec la configuration au niveau projet, chaque projet peut avoir son propre ensemble dédié de serveurs MCP, évitant le chaos d'une grande configuration globale.

Plus important encore, la configuration au niveau projet peut être commitée dans Git. Après avoir cloné le projet, les membres de l'équipe peuvent directement utiliser les mêmes services MCP sans tout reconfigurer.

```text
Projet A, projet frontend -> .claude/mcp.json contient le MCP de test de navigateur
Projet B, projet backend -> .claude/mcp.json contient le MCP de base de données
```

### 2. Stocker les informations sensibles dans des variables d'environnement

**Ne codez jamais les secrets en dur dans le fichier de configuration.**

Les fichiers de configuration peuvent être accidentellement commités dans Git et fuir des clés. La bonne approche est de stocker les valeurs sensibles dans des variables d'environnement et de ne référencer que les noms de variables depuis le fichier de configuration. Ainsi, même si le fichier de configuration devient public, les vrais secrets restent cachés.

```json
{
  "env": {
    "GITHUB_TOKEN": "$GITHUB_TOKEN",
    "GITHUB_TOKEN": "ghp_abc123"
  }
}
```

La première forme est bonne car elle lit depuis la variable d'environnement. La seconde forme est mauvaise car elle code un secret en dur directement.

### 3. Épingler les versions

**Pourquoi devez-vous épingler les versions ?**

Par défaut, `npx -y` utilisera toujours la dernière version d'un serveur MCP. Cela peut causer des problèmes : une nouvelle version peut introduire des changements cassants, ou un package peut être soudainement supprimé ou renommé.

En ajoutant `@version` au nom du package, vous vous assurez qu'une version validée est toujours utilisée, réduisant les surprises causées par les mises à jour automatiques.

```json
{
  "command": "npx",
  "args": ["-y", "@modelcontextprotocol/server-github@1.2.3"]
}
```

### 4. Documentez votre configuration MCP

**Aidez les coéquipiers à comprendre rapidement la configuration MCP**

Quand un projet inclut plusieurs serveurs MCP, les nouveaux membres de l'équipe peuvent ne pas comprendre à quoi sert chaque serveur ou quelle configuration il requiert. Créer un `README.md` sous le répertoire `.claude/` qui explique le but de chaque serveur, la configuration requise et comment obtenir les identifiants peut réduire significativement les coûts de communication.

Créez `.claude/README.md` dans votre projet :

```markdown
# Notes de configuration MCP

Serveurs MCP utilisés dans ce projet :

## github
Utilisé pour l'automatisation GitHub. Nécessite GITHUB_TOKEN.

## sqlite
Se connecte à ./data/app.db pour interroger et modifier les données.

## puppeteer
Utilisé pour les tests E2E.
```

## Claude Code vs Claude Desktop

| Fonctionnalité | Claude Code | Claude Desktop |
|-----|-------------|----------------|
| **Fichier de configuration** | `~/.claude.json` ou `.claude/mcp.json` | `claude_desktop_config.json` |
| **Configuration au niveau projet** | ✓ Supportée | ✗ Non supportée |
| **Gestion en langage naturel** | ✓ Supportée | ✗ Édition manuelle requise |
| **Diagnostics** | ✓ `/doctor` | ✗ Aucun |
| **Rechargement à chaud** | ✓ Automatique | ✗ Nécessite un redémarrage de l'app |
| **Cas d'utilisation** | Flux de développement, CI/CD | Usage quotidien, tâches de bureau |

## Serveurs MCP courants

> 💡 Pour la liste complète des serveurs MCP, veuillez vous référer à l'annexe : [Répertoire des serveurs MCP](/fr-fr/appendix/8-artificial-intelligence/ai-protocols)

### Serveur GitHub

**Fonction :** Issues, PRs, gestion de dépôts

```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "votre-token"
      }
    }
  }
}
```

**Obtenir un token depuis :** https://github.com/settings/tokens

### Serveur SQLite

**Fonction :** Interroger et gérer des bases de données SQLite

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

### Serveur Filesystem

**Fonction :** Accéder aux fichiers dans un répertoire spécifié

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/Users/votrenom/Documents"]
    }
  }
}
```

### Automatisation de navigateur Puppeteer

**Fonction :** Contrôle de navigateur, captures d'écran, tests automatisés

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

### Serveur de recherche Brave

**Fonction :** Recherche web

```json
{
  "mcpServers": {
    "brave-search": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-brave-search"],
      "env": {
        "BRAVE_API_KEY": "votre-cle-api-brave"
      }
    }
  }
}
```

## Ressources de référence

### Documentation officielle

- [Documentation officielle Claude Code - MCP](https://docs.anthropic.com/zh-CN/docs/claude-code/mcp)
- [Site officiel MCP](https://modelcontextprotocol.io/)
- [Documentation de spécification MCP](https://modelcontextprotocol.io/specification/)
- [Dépôt GitHub MCP](https://github.com/modelcontextprotocol)

### Serveurs officiels

- [@modelcontextprotocol/server-github](https://github.com/modelcontextprotocol/servers/tree/main/src/github) - Intégration GitHub
- [@modelcontextprotocol/server-sqlite](https://github.com/modelcontextprotocol/servers/tree/main/src/sqlite) - Base de données SQLite
- [@modelcontextprotocol/server-postgres](https://github.com/modelcontextprotocol/servers/tree/main/src/postgres) - Base de données PostgreSQL
- [@modelcontextprotocol/server-filesystem](https://github.com/modelcontextprotocol/servers/tree/main/src/filesystem) - Accès au système de fichiers
- [@modelcontextprotocol/server-puppeteer](https://github.com/modelcontextprotocol/servers/tree/main/src/puppeteer) - Automatisation de navigateur
- [@modelcontextprotocol/server-fetch](https://github.com/modelcontextprotocol/servers/tree/main/src/fetch) - Récupération web
- [@modelcontextprotocol/server-brave-search](https://github.com/modelcontextprotocol/servers/tree/main/src/brave-search) - Recherche Brave
- [@modelcontextprotocol/server-git](https://github.com/modelcontextprotocol/servers/tree/main/src/git) - Opérations Git

### Articles tutoriels

- [Une explication approfondie des principes et pratiques de MCP](https://view.inews.qq.com/a/20250414A023WV00)
- [Architecture et fonctionnement de MCP (Model Context Protocol)](https://m.toutiao.com/w/1826385835060307/)
- [Tutoriel grands modèles 2025 : de l'initiation à la maîtrise du protocole MCP](https://m.blog.csdn.net/weixin_45653328/article/details/150916706)
- [Apprendre MCP depuis zéro (8) - construire un serveur MCP](https://juejin.cn/post/7582510291667419187)

### Guides de configuration

- [Bonnes pratiques Claude Code](https://www.anthropic.com/engineering/claude-code-best-practices)
- [Guide complet de configuration Claude Code](https://juejin.cn/post/7576838552472043563)

### Tutoriels de développement

- [Guide pratique de serveur MCP pour débutants en TypeScript et Python](https://m.blog.csdn.net/ztt123654/article/details/150844207)
- [Guide ultime de construction de serveur MCP : tutoriels complets TypeScript et Python](https://m.blog.csdn.net/gitblog_00703/article/details/154862128)
- [Construire le serveur MCP le plus simple avec TypeScript](https://m.blog.csdn.net/weixin_45653525/article/details/148433757)
- [Générer un serveur MCP TypeScript avec Azure Container Applications](https://learn.microsoft.com/zh-cn/azure/developer/ai/build-mcp-server-ts)

### Ressources de serveurs MCP

- [Awesome MCP Servers](https://github.com/punkpeye/awesome-mcp-servers) - la liste de serveurs MCP la plus complète
- [Registre officiel MCP](https://registry.modelcontextprotocol.io) - l'app store officiel d'Anthropic
- [MCP.so](https://mcp.so) - centre communautaire de serveurs MCP
- [Glama.ai MCP](https://glama.ai/mcp/servers) - répertoire MCP avec notes et commentaires
- [Smithery](https://smithery.ai) - marketplace de serveurs MCP
- [MCPHub](https://mcphub.io/registry) - répertoire à interface épurée
- [LobeHub MCP](https://lobehub.com/zh/mcp) - répertoire MCP chinois

### Services de cartes et météo

- [Serveur MCP Amap](https://lobehub.com/zh/mcp/luozengchang-mcp-amap)
- [Documentation MCP du service de localisation Tencent](https://lbs.qq.com/service/MCPServer/MCPServerGuide/overview)
- [Serveur MCP Caiyun Weather](https://github.com/caiyunapp/mcp-caiyun-weather)
- [Serveur MCP OpenWeatherMap](https://github.com/CodeByWaqas/weather-mcp-server)

### Ressources communautaires

- [Everything Claude Code Config](https://github.com/affaan-m/everything-claude-code) - collection de configurations Claude Code de niveau production
- [AI Coding Guide](https://github.com/hacket/AICodingGuide) - parcours d'apprentissage chinois pour Claude Code

### Cas d'application concrets

- [BlenderMCP - Modélisation 3D pilotée par IA](https://github.com/Belthur/blender-mcp) - 4 100+ ⭐
- [15 meilleures pratiques pour MCP en production](https://learn.microsoft.com/zh-cn/azure/azure-functions/scenario-mcp-apps)
