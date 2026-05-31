# Développement à distance avec Claude Code sur mobile

## Introduction

Imaginez ces scénarios : vous pensez soudainement à une excellente idée de correction de bug dans le métro pendant votre trajet ; vous recevez une alerte urgente d'incident en production en faisant la queue dans un café ; vous voulez vérifier l'avancement de votre projet construit par l'IA tout en accompagnant votre petite amie shopping.

Dans les flux de travail de développement traditionnels, ces scénarios signifient généralement que vous devez trouver un endroit pour ouvrir votre ordinateur portable, ou reporter impuissant le travail. Mais à l'ère du codage assisté par l'IA, les règles ont changé. Claude Code permet d'emporter votre environnement de développement dans votre poche et de rester productif n'importe quand, n'importe où.

À l'été 2025, avec la croissance de l'adoption de Claude Code, les développeurs ont commencé à explorer différentes approches du « codage sur téléphone ». De l'utilisation simple de Termux en local, aux connexions distantes complexes SSH + Tailscale, en passant par les applications Happy Coder dédiées, un véritable écosystème de développement mobile s'est progressivement formé.

Le problème central que ce chapitre résout est : comment faire en sorte que Claude Code suive votre téléphone et devienne un véritable « assistant de développement de poche ».

---

::: info Aperçu des retours de la communauté

Basé sur les retours réels de la communauté, l'expérience de chaque approche se compare comme suit :

**Happy Coder (Approche 2)**
- Problèmes de stabilité de connexion : les déconnexions sont fréquentes, et le contexte est perdu après déconnexion
- Fonctionnalités limitées : impossible d'utiliser les commandes `/`
- Préoccupations de sécurité : dépend de serveurs relais officiels, et certains utilisateurs s'inquiètent de la sécurité des données

**HAPI (Approche 3)**
- Prend en charge les serveurs auto-hébergés : peut être déployé sur votre propre VPS
- Meilleure expérience associé à Tailscale : exécutez `hapi server` sur votre ordinateur et connectez-vous depuis votre téléphone via l'IP Tailscale
- Connexion relativement stable, adaptée à une utilisation à long terme

**Contrôle à distance Claude (Approche officielle)**
- Solution officielle, nativement intégrée à Claude Code
- Prend en charge l'accès complet aux environnements locaux (MCP, outils, configuration de projet)
- Nécessite un abonnement Max (support Pro à venir prochainement)
- Dépend de la connectivité cloud Anthropic

**Recommandation** : si vous exigez une grande stabilité de connexion, ou si vous êtes préoccupé par la sécurité des relais tiers, choisissez **HAPI + Tailscale** ou l'approche **Contrôle à distance officiel**.

:::

---

## Principe fondamental : patrons d'architecture du développement mobile

Avant d'introduire les approches spécifiques, comprenons d'abord l'essence du problème.

### Pourquoi le développement mobile est-il un problème ?

Les IDE traditionnels (comme VS Code et IntelliJ) nécessitent un environnement de système d'exploitation complet, un CPU puissant, une grande mémoire et de l'espace de stockage. Bien que les téléphones soient de plus en plus puissants, ils ont encore des limites naturelles pour l'expérience de développement :

**Contraintes de saisie** : les claviers virtuels sont inefficaces pour le codage, et la syntaxe complexe est facile à mal saisir

**Contraintes d'écran** : les petits écrans rendent difficile la visualisation simultanée du code, du terminal et du navigateur

**Contraintes d'environnement** : les téléphones ne peuvent pas exécuter des chaînes d'outils de développement complètes (compilateurs, bases de données, débogueurs)

**Contraintes de connexion** : les réseaux mobiles sont instables, et les sessions SSH se déconnectent facilement

### Idée fondamentale : architecture client léger

L'idée fondamentale derrière toutes les approches de développement mobile est la même : le téléphone n'est que la « console de contrôle » ; le vrai travail de développement se fait ailleurs.

```text
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│    ┌─────────────┐              ┌─────────────┐             │
│    │  Téléphone  │              │ Hôte/Cloud  │             │
│    │(Contrôleur) │   ────────►  │ (Exécuteur) │             │
│    │             │  Commandes   │             │             │
│    │ • Envoyer   │              │ • Exécuter  │             │
│    │   commandes │              │   CLI       │             │
│    │ • Voir      │              │ • Exécuter  │             │
│    │   résultats │              │   le code   │             │
│    │ • Réviser   │              │ • Accéder   │             │
│    │             │              │   au fs     │             │
│    └─────────────┘              └─────────────┘             │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

Cette architecture permet au téléphone de se concentrer uniquement sur l'interaction homme-machine, tandis que les calculs lourds sont délégués à votre hôte ou au cloud.

---

## Approche 1 : Application iOS officielle

En octobre 2025, Anthropic a officiellement lancé le support mobile de Claude Code dans l'application iOS. C'est l'option de développement mobile la plus simple.

### Limitations régionales

Note importante : l'application Claude **ne peut pas être utilisée directement** en Chine continentale.

Si vous êtes en Chine continentale, il est recommandé d'utiliser directement **Happy Coder** (Approche 2), qui peut fonctionner normalement via des services de relais API nationaux configurés.

Si vous disposez d'un Apple ID international, vous pouvez changer de région et télécharger l'application Claude.

### Fonctionnement

```text
┌─────────────┐                    ┌─────────────────┐
│ Application │ ──────────────────► │ Cloud Anthropic │
│  iOS        │   HTTPS + OAuth     │  Claude Code    │
└─────────────┘                    └────────┬────────┘
                                           │
                                           ▼
                                   ┌───────────────┐
                                   │   GitHub API  │
                                   └───────────────┘
```

Votre application téléphonique envoie uniquement des commandes. Toute l'exécution du code s'effectue dans le sandbox cloud d'Anthropic, et les résultats sont synchronisés via GitHub.

### Utilisation de base

**Prérequis :**

- iPhone avec iOS 15 ou ultérieur
- Abonnement Claude Pro/Team/Enterprise (le plan gratuit n'est pas pris en charge)
- Compte GitHub

**Étapes :**

1. Téléchargez l'application Claude depuis l'App Store
2. Connectez-vous à votre compte Anthropic
3. Trouvez l'onglet « Code » dans l'application
4. Connectez votre dépôt GitHub via OAuth
5. Commencez à créer des tâches

### Avantages et inconvénients

Les avantages sont une barrière d'entrée nulle, une expérience fluide et les notifications push. Les inconvénients sont le support iOS uniquement, un flux de travail principalement orienté GitHub, des capacités relativement limitées (impossible d'accéder aux systèmes de fichiers locaux) et aucune disponibilité directe en Chine continentale.

---

## Approche 2 : Happy Coder

Happy Coder est un client mobile et web open source conçu pour Claude Code et Codex, avec chiffrement de bout en bout et contrôle à distance de votre assistant de codage IA depuis n'importe où.

### Fonctionnement

```text
┌─────────────┐              ┌─────────────┐              ┌─────────────┐
│  Happy App  │   ────────►  │ Happy Server│   ◄────────  │happy-coder  │
│(Tél/Web)    │ WS chiffré   │  (Relais)   │  WebSocket   │ (Bureau)    │
└─────────────┘              └─────────────┘              └──────┬──────┘
                                                               │
                                                               ▼
                                                        ┌─────────────┐
                                                        │Claude Code  │
                                                        │    CLI      │
                                                        └─────────────┘
```

Sur votre ordinateur, exécutez `happy` au lieu de `claude` pour lancer votre assistant de codage IA. Lorsque vous avez besoin du contrôle depuis le téléphone, la session bascule automatiquement en mode distant. Appuyez sur n'importe quelle touche sur votre ordinateur pour revenir au contrôle local.

### Installation et utilisation

**Étape 1 : télécharger l'application**

| Plateforme | Lien |
|------|------|
| iOS | [App Store](https://apps.apple.com/us/app/happy-claude-code-client/id6748571505) |
| Android | [Google Play](https://play.google.com/store/apps/details?id=com.ex3ndr.happy) |
| Web | [app.happy.engineering](https://app.happy.engineering) |

**Étape 2 : installer le CLI sur l'ordinateur**

```bash
npm install -g happy-coder
```

**Étape 3 : lancer et apparier**

```bash
# exécuter dans le répertoire de votre projet
cd ~/my-project
happy

# un QR code d'appariement s'affichera
```

**Étape 4 : scanner et apparier sur le téléphone**

Ouvrez l'application Happy et scannez le QR code affiché sur votre ordinateur. Une fois l'appariement réussi, vous pouvez contrôler Claude Code depuis votre téléphone.

**Étape 5 : utilisation**

```bash
# lancer Claude Code
happy

# ou lancer Codex
happy codex
```

### Liens de ressources

- [Projet GitHub](https://github.com/slopus/happy) - code source
- [Documentation](https://happy.engineering/docs) - documentation d'utilisation
- [Communauté Discord](https://discord.gg/fX9WBAhyfD) - discussion communautaire

### Avantages et inconvénients

Les avantages sont une installation simple, le support multiplateforme, le chiffrement de bout en bout et l'auditabilité open source. Les inconvénients sont la dépendance à une infrastructure de relais tiers et la nécessité de vérifier la disponibilité de l'application mobile dans votre propre environnement.

---

## Approche 3 : HAPI

HAPI est une alternative à Happy Coder, avec une conception local-first et un support de changement d'appareil transparent entre plusieurs modèles d'IA.

### Fonctionnement

```text
┌─────────────┐              ┌─────────────┐              ┌─────────────┐
│  App HAPI   │   ────────►  │ Serveur HAPI│   ◄────────  │    hapi     │
│(Tél/PWA/    │  WireGuard   │ (Auto-      │  WireGuard   │ (Bureau)    │
│ Telegram)   │   + TLS      │ hébergé)    │   + TLS      │             │
└─────────────┘              └─────────────┘              └──────┬──────┘
                                                               │
                                                               ▼
                                                        ┌─────────────┐
                                                        │Claude Code  │
                                                        │ / Codex /   │
                                                        │ Gemini etc. │
                                                        └─────────────┘
```

HAPI utilise WireGuard plus TLS pour le chiffrement de bout en bout. Toute communication passe par des serveurs relais chiffrés. Vous pouvez auto-héberger les serveurs relais pour contrôler entièrement votre flux de données.

### Fonctionnalités clés

- **Basculement transparent** : basculer le contrôle entre le bureau et le téléphone ; appuyez sur n'importe quelle touche pour revenir au contrôle local
- **Natif d'abord** : les applications mobiles sont encapsulées avec une technologie native pour une interaction fluide
- **Approbations AFK** : recevez les demandes d'approbation sur votre téléphone pendant que vous êtes loin de votre ordinateur
- **Support multi-modèles** : prend en charge Claude Code, Codex, Gemini, OpenCode et d'autres
- **Terminal partout** : accès via PWA, Telegram Mini App et d'autres
- **Contrôle vocal** : prend en charge la saisie de commandes vocales, pour garder les mains libres

### Installation et utilisation

**Étape 1 : démarrer le serveur relais**

```bash
# exécuter sur votre serveur (ou lancer directement avec npx)
npx @twsxtd/hapi hub --relay
```

**Étape 2 : installer le CLI sur l'ordinateur**

```bash
# exécuter dans le répertoire de votre projet
cd ~/my-project
npx @twsxtd/hapi

# ou installer globalement
npm install -g @twsxtd/hapi
hapi
```

**Étape 3 : apparier les appareils**

Suivez les invites du terminal, ouvrez l'application HAPI sur votre téléphone et scannez le QR code pour compléter l'appariement.

**Étape 4 : méthodes d'accès**

| Méthode d'accès | Description |
|---------|------|
| Web PWA | Accès navigateur, supporte l'installation sur l'écran d'accueil |
| Telegram Mini App | Utilisation directement dans Telegram |
| Application mobile | Expérience d'application native (si publiée) |

### Différences avec Happy Coder

| Fonctionnalité | Happy Coder | HAPI |
|------|-------------|------|
| Philosophie de conception | Cloud-first | Local-first |
| Méthode de chiffrement | WebSocket + E2E | WireGuard + TLS |
| Support multi-modèles | Claude Code, Codex | Claude, Codex, Gemini, OpenCode |
| Méthodes d'accès | iOS/Android/Web | PWA, Telegram, plus |
| Contrôle vocal | Non | Oui |
| Approbations AFK | Non | Oui |
| Relais auto-hébergé | Nécessite un déploiement manuel | Support prêt à l'emploi |

### Liens de ressources

- [Projet GitHub](https://github.com/tiann/hapi) - code source
- [Documentation PWA](https://github.com/tiann/hapi/blob/main/docs/pwa.md) - installation et utilisation PWA
- [Fonctionnement](https://github.com/tiann/hapi/blob/main/docs/how-it-works.md) - détails d'implémentation technique
- [Assistant vocal](https://github.com/tiann/hapi/blob/main/docs/voice.md) - fonctionnalités de contrôle vocal
- [Pourquoi HAPI](https://github.com/tiann/hapi/blob/main/docs/why-hapi.md) - philosophie de conception
- [FAQ](https://github.com/tiann/hapi/blob/main/docs/faq.md) - questions fréquentes

### Avantages et inconvénients

Les avantages sont la conception local-first, le support multi-modèles, le chiffrement de bout en bout, le contrôle vocal et la capacité de relais auto-hébergé. Les inconvénients sont que le projet est relativement nouveau et l'écosystème est encore en croissance.

---

## Approche 4 : SSH + Tailscale + Tmux

C'est la meilleure option pour les développeurs professionnels. Vous vous connectez à distance à votre machine de développement via SSH et maintenez les sessions persistantes avec Tmux.

### Fonctionnement

```text
┌─────────────┐              ┌─────────────┐              ┌─────────────┐
│  Téléphone  │   ────────►  │  Tailscale  │   ◄────────  │  Ordinateur │
│(client SSH) │  VPN P2P     │ relais/perç │  VPN P2P     │  (hôte dev) │
└─────────────┘              └─────────────┘              └──────┬──────┘
                                                               │
                                                               ▼
                                                        ┌─────────────┐
                                                        │    Tmux     │
                                                        │ (persistance│
                                                        │  session)   │
                                                        └─────────────┘
```

Tailscale crée un VPN pair-à-pair pour vous permettre d'accéder à votre ordinateur personnel depuis n'importe quel réseau. Tmux garantit que Claude Code continue de s'exécuter en arrière-plan même lorsque la connexion SSH se coupe.

### Pourquoi avez-vous besoin de Tailscale ?

**Problèmes avec le SSH traditionnel :**

```text
Téléphone (4G) ──XX──> Routeur NAT ──XX──> Ordinateur personnel
                (impossible de percer)  (isolement LAN)
```

Votre ordinateur est sur un réseau privé et votre téléphone est sur le réseau public, donc l'accès direct échoue. Les solutions traditionnelles nécessitent du port forwarding plus du DNS dynamique, ce qui est complexe et risqué.

**Solution Tailscale :**

```text
Téléphone (4G) ──► Relais Tailscale ──◄── Ordinateur personnel
                (perçage NAT automatique ou relais)
```

Tailscale utilise le perçage NAT et bascule automatiquement vers le relais si le perçage échoue. La connexion entière est chiffrée.

### Étapes complètes d'installation

**Étape 1 : installer Tailscale sur l'ordinateur**

```bash
# macOS
brew install --cask tailscale

# ou télécharger l'installateur
# https://tailscale.com/download
```

**Étape 2 : se connecter et obtenir l'IP**

```bash
# démarrer Tailscale
sudo tailscale up

# vérifier l'IPv4 Tailscale
tailscale ip -4
# exemple de sortie : 100.x.x.x
```

**Étape 3 : installer Tailscale sur le téléphone**

Téléchargez Tailscale depuis l'App Store ou Google Play et connectez-vous avec le même compte.

**Étape 4 : installer et configurer Tmux**

```bash
# macOS
brew install tmux

# créer ~/.tmux.conf
cat > ~/.tmux.conf << 'EOF'
# activer le support de la souris
set -g mouse on

# terminal par défaut avec 256 couleurs
set -g default-terminal "screen-256color"

# changer la touche de préfixe en Ctrl+A (facultatif)
unbind C-b
set -g prefix C-a

# raccourcis de division simplifiés
bind v split-window -h
bind h split-window
EOF
```

**Étape 5 : créer une session persistante**

```bash
# créer une session nommée « claude »
tmux new -s claude

# démarrer Claude Code dans cette session
cd ~/my-project
claude

# se détacher sans fermer
# appuyer sur Ctrl+B puis D
```

**Étape 6 : se connecter depuis le client SSH du téléphone**

Clients SSH recommandés :

| Client | Plateforme | Notes |
|--------|------|------|
| Blink Shell | iOS | Supporte MOSH, idéal pour les réseaux instables |
| Termius | iOS/Android | Multiplateforme et interface soignée |
| a-Shell | iOS | Gratuit et léger |

Configuration de connexion :

```text
Hôte : 100.x.x.x (votre IP Tailscale)
Port : 22
Nom d'utilisateur : votre nom d'utilisateur sur l'ordinateur
```

Après la connexion, attachez-vous à Tmux :

```bash
tmux attach -t claude
```

### Astuces avancées

**Empêcher l'ordinateur de se mettre en veille :**

```bash
# macOS
caffeinate -dimsu &

# ou configurer Paramètres système > Économie d'énergie > empêcher la mise en veille automatique
```

**Utiliser MOSH pour les réseaux instables :**

MOSH (Mobile Shell) est une alternative à SSH optimisée pour les réseaux mobiles, avec récupération transparente lors des changements de réseau.

```bash
# installer sur l'ordinateur
brew install mosh

# utiliser MOSH depuis le client téléphone
# Blink Shell supporte MOSH nativement
```

**Script de connexion en une commande :**

Configurez-le comme commande de démarrage dans votre client SSH :

```bash
tmux attach -t claude || tmux new -s claude
```

Cela s'attachera automatiquement à une session existante ou en créera une nouvelle.

### Avantages et inconvénients

Les avantages sont des capacités complètes et un flux de travail équivalent au bureau avec tous les outils de développement. Les inconvénients sont une configuration plus complexe et la nécessité de maintenir l'ordinateur en ligne.

---

## Approche 5 : Exécution locale Termux

Si vous êtes utilisateur Android, vous pouvez exécuter Claude Code directement sur votre téléphone sans connecter d'appareils externes.

### Fonctionnement

```text
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│                    ┌─────────────┐                          │
│                    │   Termux    │                          │
│                    │ (env Linux) │                          │
│                    │             │                          │
│                    │ • Node.js   │                          │
│                    │ • Claude    │                          │
│                    │   Code CLI  │                          │
│                    │             │                          │
│                    │ • Projet    │                          │
│                    │   fichiers  │                          │
│                    │ • Git       │                          │
│                    └─────────────┘                          │
│                         │                                   │
│                         ▼                                   │
│                   ┌─────────────┐                           │
│                   │Anthropic API│                           │
│                   └─────────────┘                           │
└─────────────────────────────────────────────────────────────┘
```

Termux est un émulateur de terminal et environnement Linux pour Android. Vous pouvez y installer directement Node.js et Claude Code.

### Étapes d'installation

**Important** : téléchargez Termux depuis [F-Droid](https://f-droid.org/), pas depuis Google Play (la version Play est obsolète).

**Étape 1 : installer les outils de base**

```bash
# mettre à jour le gestionnaire de paquets
pkg update && pkg upgrade

# installer les outils de développement
pkg install git nodejs python vim
```

**Étape 2 : installer Claude Code**

```bash
npm install -g @anthropic-ai/claude-code
```

**Étape 3 : configurer l'environnement**

```bash
# créer un espace de travail
mkdir -p ~/projects
cd ~/projects

# initialiser le projet
git clone https://github.com/votre-repo.git
cd votre-repo

# lancer Claude Code
claude
```

**Étape 4 : configurer un clavier externe (recommandé)**

Dans Termux :

```bash
# activer la rangée de touches supplémentaires
# appui long sur l'écran > Plus > Extra keys row

# configurer les raccourcis
# ajouter dans ~/.termux/termux.properties
extra-keys = [['ESC','/','-','HOME','UP','END','PGUP','~'], \
              ['TAB','CTRL','ALT','LEFT','DOWN','RIGHT','PGDN','|']]
```

### Considérations de performance

| Type de tâche | Performance Android |
|---------|-------------|
| Développement web (HTML/CSS/JS) | Excellente |
| Scripts Python | Excellente |
| Applications Node.js | Bonne |
| Exécution de suites de tests | Moyenne |
| Compilation de grands projets | Non recommandée |

### Avantages et inconvénients

Les avantages sont le contrôle local complet, aucune dépendance à un hôte externe et un fonctionnement hors ligne d'abord. Les inconvénients sont des performances limitées du téléphone, une expérience de saisie de texte médiocre et une disponibilité uniquement sur Android.

---

## Approche 6 : Claude Code UI

Claude Code UI (aussi connu sous le nom CloudCLI) est un projet open source qui fournit une interface web pour Claude Code, avec support du navigateur mobile.

### Fonctionnement

```text
┌─────────────┐              ┌─────────────┐              ┌─────────────┐
│Navigateur   │   ────────►  │ Serveur Web │   ◄────────  │Claude Code  │
│  mobile     │  HTTP/HTTPS  │ (localhost) │   invoque    │    CLI      │
└─────────────┘              └─────────────┘              └─────────────┘
```

Vous exécutez un serveur web sur votre ordinateur, puis y accédez depuis le navigateur de votre téléphone. Cela nécessite un accès LAN ou un tunneling.

### Installation et utilisation

**Étape 1 : installer**

```bash
# démarrage en une commande (recommandé)
npx @siteboon/claude-code-ui

# ou installation globale
npm install -g @siteboon/claude-code-ui
claude-code-ui
```

**Étape 2 : ouvrir l'interface**

Le serveur est par défaut sur `http://localhost:3001`.

**Étape 3 : accéder depuis le téléphone**

Méthode A - accès LAN (même Wi-Fi) :

```bash
# lier toutes les interfaces
claude-code-ui --host 0.0.0.0

# accéder depuis le téléphone
http://<ip-lan-ordinateur>:3001
```

Méthode B - tunnel ngrok :

```bash
# installer ngrok
brew install ngrok

# démarrer le tunnel
ngrok http 3001

# ouvrir l'URL ngrok depuis le téléphone
```

### Fonctionnalités

- Design responsive avec support mobile
- Interface de chat intégrée
- Navigateur de fichiers
- Interface d'opérations Git
- Gestion de sessions

### Avantages et inconvénients

Les avantages sont une interface graphique et des fonctionnalités riches. Les inconvénients sont la nécessité d'un tunnel en dehors du LAN et une configuration relativement plus complexe.

---

## Approche 7 : Environnement de développement cloud

Si vous n'avez pas d'ordinateur local toujours allumé, vous pouvez utiliser des environnements de développement cloud où Claude Code s'exécute sur des serveurs cloud.

### Fonctionnement

```text
┌─────────────┐              ┌─────────────┐              ┌─────────────┐
│  Téléphone  │   ────────►  │  Cloud Box  │   ─────────► │Claude Code  │
│(Navig/App)  │    HTTPS     │  (DevBox)   │              │    CLI      │
└─────────────┘              └─────────────┘              └─────────────┘
```

Un conteneur cloud est livré avec Claude Code préinstallé, et vous y accédez depuis le navigateur ou l'application mobile.

### Utiliser Sealos DevBox

**Étape 1 : créer l'environnement**

Allez sur [Sealos DevBox](https://sealos.io/devbox), choisissez un modèle Claude Code et créez un environnement.

**Étape 2 : démarrer l'environnement de développement**

L'environnement est prêt en environ 30 à 60 secondes, et vous obtenez un terminal web.

**Étape 3 : configurer l'API Claude**

```bash
export ANTHROPIC_API_KEY="votre-cle-api"
```

**Étape 4 : connecter l'application Happy**

```bash
# installer happy-coder (ou utiliser la version préinstallée)
npm install -g happy-coder

# générer le QR code d'appariement
happy
```

Après le scan depuis votre téléphone, vous pouvez l'utiliser immédiatement.

### Comparaison des options cloud

| Plateforme | Claude Code | Optimisation mobile | Temps de démarrage | Tarification |
|------|------------|----------|----------|------|
| Sealos DevBox | Préinstallé | Support Happy | ~60s | Paiement à l'usage |
| GitHub Codespaces | Configuration manuelle | Flux navigateur | ~2-3 min | Quota gratuit + horaire |
| Gitpod | Configuration manuelle | Flux navigateur | ~1-2 min | Quota gratuit + horaire |
| Replit | Pas de Claude Code natif | App native | Instantané | Gratuit + abonnement |

### Avantages et inconvénients

Les avantages sont l'absence de besoin d'ordinateur local, la cohérence des environnements et l'évolutivité. Les inconvénients sont l'utilisation payante, la dépendance au réseau et le code hébergé dans le cloud.

---

## Comparaison et sélection

Chaque approche a des forces différentes et est adaptée à des scénarios différents.

### Tableau comparatif

| Approche | Difficulté | Nécessite un tunnel | Coût | Meilleurs scénarios |
|------|------|-------------|------|----------|
| Application iOS officielle | Facile | Non | 20$/mois | Vérifications rapides, tâches simples |
| Happy Coder | Relativement facile | Non | Gratuit | Usage quotidien, commodité |
| HAPI | Moyenne | Non | Gratuit | Multi-modèles, local-first |
| SSH + Tailscale | Relativement complexe | Non | Gratuit | Développement professionnel, fonctionnalités complètes |
| Termux | Moyenne | Non | Gratuit | Développement local Android |
| Claude Code UI | Moyenne | Oui | Gratuit | Préférence interface web |
| Cloud DevBox | Facile | Non | Paiement à l'usage | Pas d'ordinateur local |

### Guide de sélection

**Si vous êtes en Chine continentale** : utilisez **Happy Coder** ; avec une configuration de relais API nationale, il fonctionne bien.

**Si vous voulez un maximum de commodité** : choisissez Happy Coder. Le flux scan-et-utilisation est très pratique.

**Si vous avez besoin du support multi-modèles** : choisissez HAPI. Il prend en charge plusieurs assistants de codage IA et est idéal pour les flux de travail avec changement de modèle.

**Si vous avez un ordinateur toujours allumé** : choisissez SSH + Tailscale. Cela donne l'expérience la plus complète.

**Si vous êtes utilisateur iPhone (hors Chine continentale)** : l'application officielle est le moyen le plus simple de commencer.

**Si vous n'avez qu'Android** : Termux offre un parcours de développement mobile entièrement local.

**Si vous n'avez pas d'ordinateur** : le cloud DevBox est le choix idéal.

---

## Sécurité et vie privée

Le développement mobile implique le transfert de code sur des réseaux, la sécurité nécessite donc une attention particulière.

### Risques des serveurs relais

Lors de l'utilisation de services dépendant de relais comme Happy Coder ou HAPI, considérez ces risques :

```text
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  Que peut potentiellement voir un serveur relais ?          │
│                                                             │
│  • Les données avant chiffrement (si E2E est mal implémenté)│
│  • Les métadonnées (quand vous vous connectez, durée des    │
│    sessions)                                                │
│  • Votre clé API (si configurée incorrectement)             │
│                                                             │
│  Que peut potentiellement faire un serveur relais ?         │
│                                                             │
│  • Enregistrer le contenu de votre code                     │
│  • Voler les identifiants API                               │
│  • Injecter des commandes malveillantes                     │
│  • Utiliser votre appareil comme nœud d'attaque             │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Meilleures pratiques de sécurité

**1. Classification de sensibilité du code**

```text
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  Projets publics/code d'apprentissage -> toute approche     │
│  est acceptable                                              │
│                                                             │
│  Projets privés -> préférer SSH+Tailscale ou auto-hébergé   │
│                                                             │
│  Code commercial -> utiliser uniquement SSH+Tailscale,      │
│  désactiver tous les chemins de relais tiers                │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**2. Gestion des clés**

```bash
# ne pas coder les clés en dur dans le source
const apiKey = "sk-ant-xxxxx"

# utiliser des variables d'environnement
const apiKey = process.env.ANTHROPIC_API_KEY

# utiliser des fichiers .env (ajouter à .gitignore)
ANTHROPIC_API_KEY=sk-ant-xxxxx
```

**3. Utiliser le mode sandbox**

Claude Code prend en charge le mode sandbox pour limiter la portée d'accès :

```bash
claude --sandbox /chemin/vers/projet
```

**4. Auto-héberger le relais**

Si vous utilisez Happy Coder, envisagez d'auto-héberger le relais :

```bash
# cloner le projet (inclut l'implémentation serveur)
git clone https://github.com/slopus/happy.git
cd happy

# déployer le serveur sur votre VPS
# suivre la documentation du projet pour les détails
```

**5. Utiliser Headscale**

Headscale est une implémentation open source de Tailscale qui peut être auto-hébergée :

```bash
# déploiement Docker en une commande
docker run -d \
  --name headscale \
  -v /srv/headscale:/etc/headscale \
  -p 3478:3478/udp \
  -p 8080:8080 \
  headscale/headscale:latest
```

---

## Questions fréquentes

### Ai-je besoin de perçage NAT ?

La plupart des approches modernes **ne nécessitent pas** de perçage NAT manuel :

| Approche | Principe |
|------|------|
| Happy Coder | Mode relais, les deux côtés se connectent activement au serveur |
| HAPI | Mode relais, WireGuard + TLS |
| Tailscale | Perçage NAT ou relais |
| Application iOS | Exécution cloud |
| Claude Code UI | Nécessite un accès entrant |

### Pourquoi le mode relais ne nécessite-t-il pas de perçage ?

```text
Connexion sortante (NAT autorise) :
Ordinateur ──► Serveur relais oui

Connexion entrante (NAT bloque) :
Extérieur ──► Ordinateur non

Astuce du relais :
Les deux côtés établissent des connexions sortantes vers le relais,
donc aucun des côtés n'a besoin de connectivité entrante.
```

### Le développement mobile affecte-t-il l'autonomie de la batterie ?

Les différentes approches consomment différemment :

| Approche | Consommation | Raison |
|------|--------|------|
| Terminal SSH | Faible | Rendu texte uniquement |
| Application iOS | Moyenne | Exécution cloud, le téléphone ne fait que contrôler |
| Termux | Élevée | Exécution CLI locale |
| Navigateur | Moyenne | Charge de rendu UI web |

Pour les longues sessions, gardez votre téléphone en charge.

### Que se passe-t-il lors d'une déconnexion réseau ?

| Approche | Impact de la déconnexion réseau |
|------|-------------|
| SSH + Tmux | Claude continue de tourner ; récupération à la reconnexion |
| Happy Coder | Reconnexion automatique |
| HAPI | Reconnexion automatique |
| Application iOS | Le cloud continue ; l'app affiche la déconnexion |
| Termux | Interruption de session |

### Puis-je compiler de grands projets sur un téléphone ?

Non recommandé. Le CPU et la mémoire du téléphone sont limités, et les grandes compilations peuvent provoquer :

- une surchauffe significative
- une décharge rapide de la batterie
- des temps de compilation très longs

Exécutez les tâches de build lourdes sur des hôtes distants ou des environnements cloud.

---

## Résumé

L'idée centrale du développement mobile avec Claude Code est : **le téléphone est le contrôleur, et le vrai développement s'exécute ailleurs**.

Le choix de l'approche dépend de vos besoins spécifiques.

Si vous êtes en Chine continentale, **Happy Coder** est recommandé, surtout associé à une configuration de relais API nationale.

Si vous voulez l'installation la plus pratique, utilisez **Happy Coder**. Scannez pour vous connecter, recevez des notifications push et changez d'appareil en douceur.

Si vous avez besoin du support multi-modèles ou d'une architecture local-first, utilisez **HAPI**. Il prend en charge plusieurs assistants et le relais auto-hébergé.

Si vous voulez l'expérience de développement la plus complète, utilisez **SSH + Tailscale**. La configuration est plus complexe, mais les capacités sont les plus proches du bureau.

Si vous êtes utilisateur iOS hors de Chine continentale, l'**application officielle** est le moyen le plus simple de commencer.

Si vous êtes utilisateur Android, **Termux** permet un développement entièrement local sur le téléphone.

Si vous n'avez pas d'ordinateur toujours allumé, le **cloud DevBox** est l'option idéale.

Quelle que soit la solution choisie, la sécurité compte : soyez prudent avec les relais tiers pour le code sensible, gérez correctement vos clés API et préférez les chemins auto-hébergés ou privés pour les projets importants.

---

## Références

### Ressources officielles

- [Documentation officielle Claude Code](https://docs.anthropic.com/en/docs/claude-code) - documentation officielle complète de Claude Code
- [Application Claude iOS](https://apps.apple.com/app/claude/id6473753684) - application iOS officielle

### Projets open source

- [slopus/happy](https://github.com/slopus/happy) (2.5k stars) - client mobile Happy Coder
- [tiann/hapi](https://github.com/tiann/hapi) - assistant de codage IA multi-modèles local-first HAPI
- [siteboon/claudecodeui](https://github.com/siteboon/claudecodeui) - Claude Code UI (CloudCLI)
- [juanfont/headscale](https://github.com/juanfont/headscale) (19k stars) - implémentation open source de Tailscale

### Tutoriels en chinois

- [Coder n'importe quand n'importe où : Configurer Claude Code sur téléphone](https://m.blog.csdn.net/haa_y/article/details/151156494) - guide d'installation Termux
- [Un labo IA dans votre poche : Flux de travail mobile Claude Code toujours en ligne](https://www.cnblogs.com/swizard/p/19308983) - approche Tmux + Docker
- [J'ai emmené Claude Code faire du shopping avec ma petite amie](https://post.m.smzdm.com/p/a3r7d63d/) - connexion distante Tailscale
- [Construire des applications en production depuis un téléphone](https://m.toutiao.com/article/7611823834756301318/) - cas réel de développement mobile

### Ressources en anglais

- [The Definitive Guide to Using Claude Code on Your Phone | Sealos Blog](https://sealos.io/blog/claude-code-on-phone/) - guide mobile le plus complet
- [SSH + Tailscale + Termius Complete Guide](https://m.blog.csdn.net/Lvyizhuo/article/details/157692953) - guide détaillé de connectivité à distance

### Téléchargements d'outils

- [Tailscale](https://tailscale.com/download) - outil VPN pair-à-pair
- [Termux (F-Droid)](https://f-droid.org/en/packages/com.termux/) - émulateur de terminal Android
- [Blink Shell](https://blink.sh/) - client SSH iOS (support MOSH)
- [Termius](https://termius.com/) - client SSH multiplateforme
