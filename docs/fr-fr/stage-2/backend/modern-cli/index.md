# Outils de programmation IA en ligne de commande (CLI)

Dans ce tutoriel, nous présenterons les agents de programmation IA qui s'exécutent directement dans la ligne de commande. Contrairement aux agents intégrés dans Trae ou Cursor que vous avez déjà étudiés, les outils CLI de programmation IA fonctionnent uniquement dans le terminal. Par rapport aux agents intégrés aux IDE IA, ils disposent généralement d'une fenêtre de contexte plus longue, d'une vitesse d'appel d'outils plus rapide et sont compatibles avec un plus grand nombre de modèles de langage. Dans les pratiques les plus récentes de l'AI Vibe Coding, nous privilégions souvent les outils CLI de programmation IA plutôt que les agents de codage intégrés à l'IDE.

## En partant du CLI

Vous vous souvenez du CLI que nous avons présenté précédemment ? Le CLI (Command Line Interface) désigne l'utilisation d'un terminal ou d'une invite de commande pour interagir avec des logiciels via des commandes en texte brut, plutôt que par le biais d'une interface graphique (GUI -- que vous pouvez comprendre comme les interfaces avec des boutons sur ordinateur ou smartphone, où il suffit de cliquer sans taper de commandes).

> Sous Windows, les terminaux les plus courants sont l'« Invite de commandes (cmd) » et « PowerShell ». Vous pouvez lancer ces programmes en tapant « cmd » ou « powershell » dans la barre de recherche ou la boîte de dialogue Exécuter.

![](/zh-cn/stage-2/backend/modern-cli/images/image1.png)![](/zh-cn/stage-2/backend/modern-cli/images/image2.png)

Le CLI est naturellement adapté aux opérations par commandes textuelles. Parmi une petite minorité de geeks (passionnés de programmation en quête de performances extrêmes), le CLI est même plus populaire que le GUI -- ils souhaitent réaliser toutes les opérations au clavier, estimant que l'utilisation de la souris ralentit leur efficacité de codage.

Dans l'industrie, le CLI est souvent la forme d'interface la plus courante, car le GUI nécessite que le système d'exploitation génère des interfaces supplémentaires et gère les fenêtres, ce qui exige davantage de ressources informatiques ; le CLI, en revanche, se contente de transmettre les commandes reçues au système pour exécution. Ainsi, lors de la connexion à des clusters de serveurs à grande échelle, nous interagissons généralement uniquement via le CLI.

![](/zh-cn/stage-2/backend/modern-cli/images/image3.png)

Pour beaucoup d'étudiants sans expérience en CLI, ces opérations peuvent sembler complexes, avec trop de commandes à retenir, et l'on peut même craindre de « casser son ordinateur par erreur ». Rassurez-vous. Vous souvenez-vous que dans les tutoriels précédents, nous demandions souvent à Trae d'effectuer diverses opérations de base ? Ici aussi, vous pouvez reprendre exactement la même approche -- nous pouvons laisser l'outil de programmation CLI effectuer toutes les opérations à notre place : naviguer dans les dossiers, rechercher et traiter des fichiers, exécuter ou copier des projets open source, etc. L'ensemble du processus peut être réalisé par la conversation avec l'outil de programmation IA en CLI.

## En quoi diffère-t-il des IDE IA ?

Nous pouvons comparer les outils de programmation IA en CLI avec z.ai et Trae que nous avons déjà étudiés. En un sens, un outil de programmation IA en CLI peut être considéré comme une version spéciale de z.ai : ils nécessitent tous deux une simple interface de conversation pour exécuter automatiquement toutes les opérations requises (parfois vous devrez ouvrir manuellement le navigateur pour voir le résultat final). Et si l'on compare avec les IDE IA, l'outil de programmation IA en CLI peut être vu comme le module Agent de l'IDE -- c'est-à-dire la zone de conversation dans le panneau latéral.

![](/zh-cn/stage-2/backend/modern-cli/images/image4.png)![](/zh-cn/stage-2/backend/modern-cli/images/image5.png)

Cependant, comme les différents IDE IA implémentent les agents de manières différentes, avec des capacités très variables, les résultats de programmation IA sont souvent instables. C'est pourquoi les outils de programmation IA en CLI sont généralement développés directement par de grandes entreprises technologiques, telles qu'Anthropic (derrière Claude) ou OpenAI (derrière ChatGPT).

Par rapport aux autres agents de programmation IA, l'utilisation directe de ces produits de grands groupes est souvent une pratique plus avantageuse, d'autant plus que Claude Code est lui-même conçu pour servir l'équipe de développement interne d'Anthropic, pensé dès l'origine pour « répondre aux véritables besoins des ingénieurs ».

Pour une comparaison plus visuelle, examinons les différences entre Claude Code et un agent d'IDE IA typique (ici Cursor) :

| Fonctionnalité | Claude Code | Cursor | Avantage |
| ----------------- | ------------- | --------------- | ----------- |
| Exécution automatique de tâches | ✅ Excellent | ❌ Capacités limitées | Claude Code |
| Intégration IDE | ❌ Ligne de commande uniquement | ✅ VS Code natif | Cursor |
| Complétion de code en temps réel | ❌ Non | ✅ Excellente expérience | Cursor |
| Opérations multi-fichiers | ✅ Excellent | ⚠️ Correct | Claude Code |
| Opérations GitHub intégrées | ✅ Commit direct | ⚠️ Manipulation manuelle | Claude Code |
| Courbe d'apprentissage | ⚠️ Moyenne | ✅ Prise en main facile | Cursor |
| Longueur du contexte | ✅ Très long | ⚠️ Correct | Claude Code |
| Assistance au débogage | ✅ Automatisée | ⚠️ Souvent manuel | Claude Code |

Source du tableau : <https://northflank.com/blog/claude-code-vs-cursor-comparison>

En résumé, les outils de programmation IA en CLI peuvent généralement :

- Prendre en charge des conversations continues plus longues (ils peuvent même « travailler toute une journée » pour vous).
- Offrir une fenêtre de contexte plus étendue (vous n'aurez plus besoin de dire aussi souvent « continue »).
- Répondre plus rapidement (ils peuvent se connecter à davantage d'API de modèles personnalisés).

Pour les opérations liées au codage, ils sont généralement plus intelligents et plus stables que la plupart des agents intégrés aux IDE.

## Outils de programmation IA en CLI les plus courants

Bien qu'il existe de nombreuses implémentations open source, dans la pratique nous ne recommandons que deux grandes catégories d'outils de programmation IA en CLI, comme « combinaison de premier choix ». Vous pouvez choisir celui qui vous convient le mieux selon vos habitudes, et nous vous recommandons vivement d'essayer les deux avant de choisir celui qui vous correspond le mieux.

- Codex utilise GPT-5, avec des capacités globales plus puissantes ;
- Claude Code via l'API GLM 4.6 offre une expérience proche de Claude 4, mais à un prix plus abordable.
- OpenCode permet de changer et combiner librement les modèles, propose des modèles gratuits et offre un meilleur contrôle des coûts.

Cependant, lequel est le plus efficace dans un projet réel ne peut être jugé que par des tests pratiques. Maîtriser plusieurs outils de programmation IA est toujours bénéfique : une fois compétent, vous pourrez passer aisément de Claude Code à Codex ou Trae selon les scénarios. Si après plusieurs essais un outil s'avère médiocre, passez simplement à un autre outil ou modèle.

Par ailleurs, les versions des modèles évoluent très rapidement. Nous vous conseillons de privilégier la solution offrant le meilleur rapport qualité/prix (efficacité / coût).

### Claude Code

Claude Code est un outil de programmation IA développé par Anthropic, basé sur les capacités du grand modèle Claude. Son principal espace d'interaction est le terminal, et il prend également en charge une utilisation en tant qu'extension VS Code. Comme les agents intégrés aux IDE IA, il peut analyser en profondeur le dépôt de code du développeur et accomplir des tâches de développement de bout en bout via des instructions en langage naturel -- y compris l'édition de code, la correction de bugs, l'exécution et la réparation de tests, la gestion des flux Git (par exemple la résolution de conflits de fusion, la création de PR), l'explication de code complexe, l'exécution de commandes terminal, etc.

![](/zh-cn/stage-2/backend/modern-cli/images/image6.png)

Les avantages de Claude Code se manifestent principalement par : une fenêtre de contexte extrêmement longue (pouvant traiter des fichiers complets voire de petits projets), la capacité à clarifier proactivement les exigences ambiguës, la planification et l'allocation automatiques des tâches d'exécution, ainsi qu'une compréhension et une explication approfondies du contenu de l'ensemble du dépôt de code. Par rapport aux agents IDE classiques, il est mieux adapté à un flux de développement « immersive vibe coding ».

En pratique, vous pouvez lui demander via des instructions conversationnelles de créer un nouveau projet, d'exécuter des opérations CLI (par exemple organiser des dossiers, renommer des fichiers en lot, déployer des projets open source), de configurer l'environnement de développement (par exemple installer et déboguer un environnement Python). Si un extrait de code vous semble difficile à comprendre ou si la structure d'un répertoire n'est pas claire, vous pouvez également demander directement à Claude Code de générer un document d'analyse structuré, ou d'expliquer étape par étape un contenu spécifique.

![](/zh-cn/stage-2/backend/modern-cli/images/image7.png)![](/zh-cn/stage-2/backend/modern-cli/images/image8.png)

![](/zh-cn/stage-2/backend/modern-cli/images/image9.png)![](/zh-cn/stage-2/backend/modern-cli/images/image10.png)

Si vous souhaitez apprendre Claude Code de manière systématique, vous pouvez consulter le cours conjointement proposé par Andrew Ng et Anthropic :
<https://www.bilibili.com/video/BV176t2zSEpr>

Nous allons maintenant apprendre à utiliser Claude Code. Comme le coût d'utilisation directe du Claude Code officiel est souvent très élevé (comme le montre l'image ci-dessous), nous utiliserons plutôt des plateformes API d'autres grands modèles compatibles avec le protocole Claude Code.

![](/zh-cn/stage-2/backend/modern-cli/images/image11.png)

Vous devez apprendre les différentes approches suivantes (idéalement toutes les essayer), puis choisir celle qui vous convient le mieux comme parcours principal.

La première méthode consiste à utiliser directement une API « compatible avec l'interface Anthropic ». Avec la popularité de Claude Code, de plus en plus de fournisseurs de grands modèles commencent à prendre en charge le style d'appel Anthropic. Les fournisseurs courants incluent GLM, Kimi, DeepSeek et Siliconflow, qui proposent tous des API compatibles. Nous détaillerons la configuration spécifique plus loin.

Il convient de noter que Claude Code consomme généralement beaucoup de tokens. Si vous craignez des coûts d'appel API trop élevés, vous pouvez envisager l'abonnement mensuel GLM (environ 20 yuans/mois) pour maîtriser les coûts. Si vous souhaitez d'abord évaluer les dépenses réelles, vous pouvez commencer par recharger 10 yuans pour des tests à petite échelle.

Une autre approche consiste à utiliser le projet « Claude Code Route ». Il s'agit d'un outil open source qui prend en charge toutes les interfaces d'appel API courantes, vous permet de configurer finement le modèle à utiliser selon les scénarios, et prend en charge la connexion à des grands modèles déployés localement. Cependant, comme la configuration de cette solution est relativement complexe, nous vous recommandons de commencer par la première méthode.

#### Utiliser GLM de Zhipu comme backend (recommandé)

GLM (General Language Model) est une série de grands modèles de langage développée de manière autonome par Zhipu AI. GLM-4.6 est la version la plus récente de la série GLM, dont l'atout majeur réside dans ses excellentes performances en matière de code (comparable à Claude Sonnet 4 sur les benchmarks publics et les tâches réelles, se positionnant dans le premier rang en Chine).

![](/zh-cn/stage-2/backend/modern-cli/images/image12.png)

Il a également étendu sa fenêtre de contexte à 200K, permettant de traiter plus sereinement les textes longs et les bases de code volumineuses, tout en renforçant les capacités de raisonnement et d'appel d'outils, atteignant un bon équilibre entre performances et coûts.

![](/zh-cn/stage-2/backend/modern-cli/images/image13.png)

Avant de connecter GLM, nous devons d'abord installer Claude Code.

Si vous trouvez les étapes d'installation en ligne de commande fastidieuses ou rencontrez des erreurs, vous pouvez demander directement à l'agent de Trae de vous aider.

```python
# Installer Claude Code
npm install -g @anthropic-ai/claude-code

# Accéder à votre projet
cd your-awesome-project

# Lancer Claude Code
claude

# Appuyer sur Ctrl+C pour quitter Claude
```

Ensuite, nous devons modifier l'adresse de requête API par défaut de Claude Code pour qu'elle prenne en charge le service API de GLM. Vous pouvez copier directement le contenu ci-dessous et demander à Trae de créer les variables d'environnement correspondantes ; vous pouvez également choisir de les écrire de manière permanente dans les variables d'environnement système (en cas de problème, l'agent peut également vous aider à modifier).

Tout d'abord, vous devez obtenir votre clé API GLM et la conserver de la manière qui vous convient le mieux.

Version nationale : <https://bigmodel.cn/usercenter/proj-mgmt/apikeys>
Version internationale : <https://z.ai/manage-apikey/apikey-list>

Si vous utilisez la **version nationale de GLM**, utilisez la configuration suivante :

```python
# Exécuter les commandes suivantes dans Cmd
# Remplacez `your_zhipu_api_key` par votre clé API obtenue
setx ANTHROPIC_AUTH_TOKEN your_zhipu_api_key
setx ANTHROPIC_BASE_URL https://open.bigmodel.cn/api/anthropic
```

Si vous utilisez la **version internationale de GLM**, utilisez la configuration suivante :

```python
# Exécuter les commandes suivantes dans Cmd
# Remplacez également `your_zai_api_key`
setx ANTHROPIC_AUTH_TOKEN your_zai_api_key
setx ANTHROPIC_BASE_URL https://api.z.ai/api/anthropic
```

Vous pouvez saisir une instruction similaire à celle-ci directement dans Trae :

⚠️ Si vous configurez les « variables d'environnement permanentes » via Trae, vous **devez redémarrer Trae** après la configuration, sinon les variables d'environnement dans son terminal intégré ne se mettront pas à jour, ce qui pourrait entraîner des erreurs de connexion ou de réseau.

```python
Based on my environment variable settings:
setx ANTHROPIC_AUTH_TOKEN your_zai_api_key
setx ANTHROPIC_BASE_URL https://api.z.ai/api/anthropic

and my key(Replace it with your own key):
681fea485851d29060cc.13gfaendggaFOhb

please help me configure and start Claude Code
```

Vous verrez une sortie de processus similaire à celle-ci :

![](/zh-cn/stage-2/backend/modern-cli/images/image14.png)

> 💡 Qu'est-ce qu'une variable d'environnement ?
>
> Les variables d'environnement sont essentiellement un ensemble d'informations de configuration « clé-valeur » stockées dans le système d'exploitation, généralement sous la forme « nom_de_variable = valeur ». Tant qu'elles sont configurées à l'avance dans le terminal ou les paramètres système, les programmes peuvent lire ces variables à tout moment pour obtenir les informations correspondantes. Comme les variables d'environnement peuvent être écrites directement dans le terminal sans modifier le code lui-même, nous stockons généralement les clés d'accès aux grands modèles dans les variables d'environnement afin d'éviter toute fuite. Le programme lui suffit de lire la variable d'environnement correspondante pour effectuer l'appel au grand modèle.
>
> Sous Windows, les variables d'environnement sont également souvent utilisées pour stocker les « chemins d'appel » des outils en ligne de commande, en plus des clés d'accès aux grands modèles.
>
> Nous savons que le terminal lui-même est un programme. Parfois, nous souhaitons lancer un programme externe depuis le terminal, par exemple taper `claude` pour démarrer Claude Code. La raison pour laquelle il suffit de taper `claude` pour l'exécuter est que le terminal lit les variables d'environnement du système, dont la variable PATH contient le répertoire où se trouve l'exécutable de Claude Code, ce qui permet au terminal de le trouver et de l'exécuter (cela équivaut à coller le chemin absolu du programme dans le terminal et à appuyer sur Entrée).
>
> Une variable d'environnement typique pourrait ressembler à ceci : `PATH=C:\Windows\system32;C:\Program Files\Python`. Ainsi, nous pouvons exécuter ces programmes système depuis n'importe quel chemin, par exemple en tapant simplement `python` dans la ligne de commande pour lancer l'interpréteur Python.
>
> Si vous souhaitez consulter les variables d'environnement actuelles du système, vous pouvez taper « variables d'environnement » dans la recherche Windows. Dans la fenêtre « Modifier les variables d'environnement système » qui s'affiche, vous verrez toutes les variables et leurs valeurs. Certaines servent à stocker les clés de modèles, d'autres à ajouter des répertoires de programmes pour faciliter les appels depuis n'importe quel chemin.

Vous pouvez maintenant utiliser le dernier GLM pour développer avec Claude Code. Vous pouvez essayer de réexécuter un projet précédent, ou relever à nouveau les tâches que Trae n'avait pas réussi à accomplir, et comparer les différences d'expérience.

🎉 Répéter le processus de « tout reprendre à zéro » n'est pas une perte de temps -- à chaque nouvelle tentative, vos compétences se renforcent.

En suivant exactement la même logique que pour GLM, vous pouvez également connecter facilement d'autres interfaces prenant en charge le format compatible Anthropic.

#### Utiliser Kimi K2 comme backend (recommandé)

Kimi K2 est le nouveau grand modèle de langage de nouvelle génération lancé par Moonshot AI, avec d'excellentes performances en compréhension et génération de code. Kimi K2 prend en charge une fenêtre de contexte ultra-longue (jusqu'à 200K tokens), capable de traiter facilement de grandes bases de code et des projets complexes.

**Avantages clés :**

- **Contexte ultra-long** : prend en charge une fenêtre de contexte de 200K, permettant de traiter le code d'un projet entier en une seule fois
- **Excellentes capacités en code** : performances remarquables en génération, refactoring et débogage de code
- **Bonne compréhension du chinois** : compréhension plus précise des besoins de programmation en chinois
- **Appels d'outils stables** : prise en charge stable des appels de fonctions et utilisation d'outils

**Obtenir la clé API :**

Visitez <https://platform.moonshot.cn/console/account> pour vous inscrire et obtenir votre clé API.

**Méthode de configuration :**

```bash
export ANTHROPIC_BASE_URL=https://api.moonshot.cn/anthropic
export ANTHROPIC_AUTH_TOKEN=sk-YOURKEY
```

#### Utiliser Minimax comme backend (recommandé)

Minimax est le nouveau grand modèle de langage lancé par MiniMax, avec d'excellentes performances dans les tâches de programmation. Le modèle Minimax est reconnu pour ses capacités de raisonnement exceptionnelles et la qualité de son code généré, particulièrement adapté aux scénarios de programmation complexes.

**Avantages clés :**

- **Forte capacité de raisonnement** : excellentes performances en raisonnement logique complexe et conception d'architecture de code
- **Code de haute qualité** : code généré structuré et lisible
- **Support multilingue** : prise en charge de la génération et conversion de code en plusieurs langages
- **Rapidité de réponse** : API à réponse rapide, adaptée aux scénarios d'appels fréquents

**Obtenir la clé API :**

Visitez <https://platform.minimax.io/> pour vous inscrire et obtenir votre clé API.

**Méthode de configuration :**

```bash
export ANTHROPIC_BASE_URL=https://api.minimax.io/anthropic
export ANTHROPIC_AUTH_TOKEN=YOUR_MINIMAX_API_KEY
export ANTHROPIC_MODEL=MiniMax-M3.1-Flash
```

Use `MiniMax-M3.1-Flash` for new configurations, or set `ANTHROPIC_MODEL=MiniMax-M3` explicitly. Keep any intentionally saved legacy or custom model ID. These are direct API model IDs; check your account's access before using a subscription plan. Flash requires adaptive thinking: do not disable thinking or set effort to `none`. See the [MiniMax API compatibility reference](https://platform.minimax.io/docs/api-reference/text-anthropic-api).

#### Utiliser DeepSeek comme backend (recommandé)

DeepSeek est un grand modèle de langage open source développé par DeepSeek, populaire auprès des développeurs pour ses excellentes capacités de code et son excellent rapport qualité-prix. DeepSeek Coder a été spécialement optimisé pour les tâches de programmation.

**Avantages clés :**

- **Capacités de code exceptionnelles** : excellentes performances en génération, compréhension et correction de code
- **Open source et personnalisable** : modèle open source, permettant un fine-tuning selon les besoins
- **Excellent rapport qualité-prix** : prix d'API relativement bas, adapté à une utilisation intensive
- **Bon support du chinois** : compréhension précise des scénarios de programmation en chinois

**Obtenir la clé API :**

Visitez <https://platform.deepseek.com/usage> pour vous inscrire et obtenir votre clé API.

**Méthode de configuration :**

```bash
export ANTHROPIC_BASE_URL=https://api.deepseek.com/anthropic
export ANTHROPIC_AUTH_TOKEN=YOU_DEEPSEEK_API_KEY
export API_TIMEOUT_MS=600000
export ANTHROPIC_MODEL=deepseek-chat
export ANTHROPIC_SMALL_FAST_MODEL=deepseek-chat
export CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC=1
```

#### Utiliser le Coding Plan de Volcano Engine comme backend (recommandé)

Volcano Engine (Volcano Engine) est la plateforme de services cloud de ByteDance, proposant des services de modèles IA de niveau entreprise. Le Coding Plan de Volcano Engine est spécialement optimisé pour les scénarios de programmation, offrant des capacités de génération de code stables et efficaces.

**Avantages clés :**

- **Stabilité de niveau entreprise** : offre un SLA (Service Level Agreement) garantissant la stabilité du service
- **Optimisé pour le code** : optimisation spécifique pour les tâches de programmation
- **Large choix de modèles** : prend en charge plusieurs modèles, dont Doubao-pro, Doubao-lite, etc.
- **Accès rapide en Chine** : nœuds déployés en Chine, vitesse d'accès rapide

**Obtenir la clé API :**

Visitez <https://console.volcengine.com/ark/region:ark+cn-beijing/apiKey> pour vous inscrire et obtenir votre clé API.

**Méthode de configuration :**

```bash
export ANTHROPIC_BASE_URL=https://ark.volces.com/api/anthropic
export ANTHROPIC_AUTH_TOKEN=YOUR_VOLCANO_API_KEY
export ANTHROPIC_MODEL=doubao-pro-32k
```

#### Autres API compatibles Anthropic

Siliconflow :

```bash
export ANTHROPIC_BASE_URL="https://api.siliconflow.cn/"
export ANTHROPIC_MODEL="moonshotai/Kimi-K2-Instruct-0905"    # Vous pouvez modifier le modèle souhaité
export ANTHROPIC_API_KEY="YOUR_SILICONCLOUD_API_KEY"    # Remplacez par votre clé API
```

Alibaba Cloud DashScope (Aliyuncs) : <https://help.aliyun.com/zh/model-studio/get-api-key>

```python
export ANTHROPIC_BASE_URL="https://dashscope.aliyuncs.com/apps/anthropic"
export ANTHROPIC_API_KEY="YOUR_DASHSCOPE_API_KEY"
```

::: details Utiliser Claude Code Route comme backend (utilisation avancée)

Nous avons expliqué plus haut comment remplacer l'interface Anthropic de Claude Code par l'API officielle GLM. Voyons maintenant comment l'outil Claude Code Router permet à Claude Code de s'adapter à davantage d'API de modèles.

[Claude Code Router](https://github.com/musistudio/claude-code-router) est un outil d'amélioration de routage intelligent conçu spécifiquement pour Claude Code. Son rôle principal est d'aider les utilisateurs à distribuer les requêtes IA vers des modèles de différentes plateformes selon leurs besoins, avec une personnalisation avancée. Il prend en charge la connexion à des dizaines de plateformes, dont OpenRouter, DeepSeek, Ollama, Gemini, et permet également de router les tâches vers des modèles spécifiques selon les scénarios, par exemple GLM-4.5, Kimi-K2, Qwen3-Coder, etc. Par exemple, vous pouvez confier automatiquement les tâches en arrière-plan à un Ollama local pour économiser les coûts ; attribuer les tâches de texte/code longs à Gemini-2.5-Pro ; et déléguer l'explication de code à DeepSeek.

![](/zh-cn/stage-2/backend/modern-cli/images/image16.png)

Cet outil offre également des capacités de gestion de configuration UI/CLI pratiques, et s'adapte aux formats d'API des différentes plateformes via des « convertisseurs ». Il prend en charge les intégrations automatisées telles que GitHub Actions ainsi que des extensions personnalisées, résolvant le problème du « modèle unique ne couvrant pas tous les scénarios » et des « changements fréquents de plateforme fastidieux », pour aider les utilisateurs à tirer parti des outils IA de manière plus flexible et économique.

![](/zh-cn/stage-2/backend/modern-cli/images/image17.png)

Voici comment installer Claude Code Router. Les étapes générales sont les suivantes (vous pouvez également demander à Trae de les exécuter), pour préparer l'environnement nécessaire :

```markdown
npm install -g @anthropic-ai/claude-code
npm install -g @musistudio/claude-code-router
```

Une fois l'installation terminée, vous devez vérifier que la commande `ccr` est disponible localement. Si vous voyez une sortie similaire à celle-ci, l'installation a réussi :

![](/zh-cn/stage-2/backend/modern-cli/images/image18.png)

Ensuite, il existe deux méthodes pour initialiser et configurer les modèles :

- Utiliser l'interface UI de CCR, en ouvrant dans le navigateur la page de configuration qu'il fournit ;
- Modifier directement le fichier de configuration par défaut de CCR (l'UI ne fait en réalité que modifier le fichier de configuration, mais offre une interface plus intuitive).

Si vous choisissez d'utiliser l'UI CCR, vous verrez une interface similaire à celle-ci :

![](/zh-cn/stage-2/backend/modern-cli/images/image19.png)

En cliquant sur le bouton « Add Provider », vous verrez l'interface suivante. Vous devez :

1. Saisir le nom du fournisseur de modèle dans le champ Name ;
2. Remplir l'adresse de l'interface compatible OpenAI du fournisseur dans API Full URL ;
3. Saisir la clé API de la plateforme correspondante dans API Key ;
4. Saisir le nom du modèle dans la section Models, puis cliquer sur « Add Model » pour l'ajouter ;
5. Enfin, cliquer sur « Save » pour enregistrer la configuration.

(En faisant défiler vers le bas dans l'interface, vous trouverez de nombreuses options avancées, mais vous pouvez les ignorer pour le moment.)

![](/zh-cn/stage-2/backend/modern-cli/images/image20.png)

Voici des exemples de configuration pour DeepSeek et Kimi :

![](/zh-cn/stage-2/backend/modern-cli/images/image21.png)

![](/zh-cn/stage-2/backend/modern-cli/images/image22.png)

Après avoir enregistré la configuration du modèle, vous devez également spécifier le modèle par défaut (Default) dans la section Router à droite. Cliquez sur la liste déroulante correspondante et définissez-la sur `kimi` (recommandé), puis cliquez sur `Save and Restart` en haut à droite.

![](/zh-cn/stage-2/backend/modern-cli/images/image23.png)

Ensuite, il suffit de taper `ccr code` dans le terminal pour lancer le flux de travail de codage de Claude Code via Claude Code Router.

![](/zh-cn/stage-2/backend/modern-cli/images/image24.png)

:::

#### Utilisations avancées de Claude Code

Beaucoup de gens utilisent Claude Code au départ comme un simple outil de conversation. Mais en réalité, il intègre de nombreuses fonctionnalités riches qui rendent votre utilisation plus efficace et flexible. Voici quelques commandes et exemples d'utilisation courants :

Documentation de référence :

<https://docs.claude.com/en/docs/claude-code/cli-reference>
<https://docs.claude.com/en/docs/claude-code/slash-commands>

| Commande | Fonction | Exemple |
| ----------------- | ----------------------------------------- | ---------------------------------------- |
| claude | Lancer le mode interactif | `claude` |
| claude "query" | Exécuter une tâche ponctuelle et afficher le résultat | `claude "explain this project"` |
| claude -p "query" | Exécuter une question ponctuelle et quitter automatiquement après | `claude -p "explain this function xxxx"` |
| claude -c | Reprendre la dernière session | `claude -c` |
| claude -r | Restaurer la session précédente | `claude -r` |
| /resume | Revenir à la session précédente dans le chat en cours | `claude -c`, `/resume` |
| /plugin | Gérer les plugins, installer des extensions de commit et review | `/plugin` |
| /init | Initialiser la description du projet avec CLAUDE.md | `/init` |
| /clear | Effacer le contexte de la session actuelle pour éviter la surcharge | `/clear` |
| /compact | Compresser l'historique de conversation pour réduire les tokens de contexte | `/compact` |
| /cost | Afficher la consommation actuelle | `/cost` |
| /model | Changer le modèle utilisé (ignorable avec une API compatible) | `/model` |
| /memory | Gérer les fichiers mémoire CLAUDE.md | |
| /help | Afficher la liste des commandes disponibles | `/help` |
| exit ou Ctrl+C | Quitter Claude Code | `exit` ou `Ctrl+C` |
| /agents | Fonctionnalité avancée, détaillée plus loin | |
| /mcp | Fonctionnalité avancée, détaillée plus loin | |

**CLAUDE.md**

Référence : <https://www.anthropic.com/engineering/claude-code-best-practices>

`CLAUDE.md` est un fichier spécial que Claude lit automatiquement et intègre au contexte au début de chaque conversation. Il est donc parfaitement adapté pour y consigner :

- Les commandes bash courantes
- Les fichiers clés et fonctions utilitaires
- Les conventions de style de code
- Les méthodes de test
- Les règles de collaboration du dépôt (par exemple le nommage des branches, merge ou rebase)
- La configuration de l'environnement de développement (par exemple l'utilisation de pyenv, le compilateur recommandé)
- Les comportements ou pièges spécifiques au projet à surveiller
- Toute information que vous souhaitez que Claude « retienne »

`CLAUDE.md` n'a pas de format imposé, il suffit qu'il soit concis et lisible pour les humains. Par exemple :

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

#### Fonctionnement interne de Claude Code

Référence : <https://github.com/shareAI-lab/analysis_claude_code>

Si vous vous demandez pourquoi Claude Code est souvent plus performant que des outils de programmation Agent comme Trae ou Cursor, regardons brièvement son mécanisme de fonctionnement interne.

Les autres outils de programmation IA en CLI fonctionnent de manière globalement similaire.

![](/zh-cn/stage-2/backend/modern-cli/images/image25.png)

Claude Code décompose les tâches de programmation en un cycle continu de « perception -- réflexion -- action -- validation », au sein duquel il appelle différents outils pour accomplir les tâches. Il imite le flux de travail d'un développeur humain : écrire du code, l'exécuter, observer les résultats, puis améliorer. Le système fonctionne via une boucle de tâche principale qui exécute les étapes en continu ; à chaque cycle, Claude peut appeler différents outils -- lecture/écriture de fichiers, exécution de commandes, recherche de code, etc. -- puis décider de la prochaine action en fonction des résultats réels renvoyés par ces outils.

Plusieurs caractéristiques clés méritent d'être notées :

- **Traitement en flux (Stream Processing)** : Claude peut produire des résultats tout en réfléchissant, sans devoir attendre que tout le code soit écrit avant de l'exécuter.
- **Compression intelligente (Intelligent Compression)** : les conversations longs tendent à allonger excessivement le contexte. Claude compresse l'historique en informations clés pour réduire la probabilité d'« oubli », et garantit un fonctionnement efficace en distinguant la mémoire à court et à long terme.
- **Contrôle de concurrence (Concurrency Control)** : la conception interne parallèle permet à plusieurs tâches de s'exécuter simultanément sans se gêner mutuellement.
- **Gestion de sous-agents (Sub-agent Management)** : en pratique, un seul « rôle » ne traite pas tout. Vous pouvez gérer plusieurs sous-agents collaborant sur le code, chacun responsable de tâches différentes, par exemple l'un dédié aux tests, l'autre à la rédaction de documentation.

### Codex

![](/zh-cn/stage-2/backend/modern-cli/images/image26.png)

![](/zh-cn/stage-2/backend/modern-cli/images/image27.png)

Comme Claude Code, Codex est un outil collaboratif de programmation IA développé par OpenAI. Vous pouvez le considérer comme la « version OpenAI de Claude Code ». Son plus grand avantage est son optimisation poussée pour GPT-5.

En pratique, GPT-5 offre actuellement une vitesse de réponse plus rapide et un taux d'erreur plus faible (probabilité plus élevée de mener à bien correctement les tâches complexes en plusieurs tours). Son inconvénient est que ses explications ont tendance à être « académiques » et « techniques », parfois trop rigoureuses et riches en informations, ce qui peut être légèrement difficile d'accès pour les débutants.

Vous pouvez installer Codex avec la commande suivante :

```
npm i -g @openai/codex
```

#### Utiliser l'API officielle OpenAI comme backend

Si vous utilisez directement l'entrée officielle OpenAI de Codex, la configuration est très simple : une fois que vous avez souscrit à l'abonnement OpenAI ou obtenu le quota d'API correspondant, il suffit de taper `codex` dans la ligne de commande pour lancer le programme et suivre les instructions pour vous connecter.

![](/zh-cn/stage-2/backend/modern-cli/images/image28.png)

![](/zh-cn/stage-2/backend/modern-cli/images/image29.png)

#### Utiliser une API OpenAI relayée comme backend

L'API OpenAI officielle pouvant être coûteuse et soumise à des exigences réseau strictes, nous pouvons également passer par d'autres services de passerelle API pour relayer les appels et contourner ces limitations.

Avec cette méthode, il suffit d'acheter le quota Codex API correspondant sur une plateforme de relais tierce pour obtenir une expérience proche du Codex OpenAI natif.

Référence : <https://open-dev.feishu.cn/wiki/PAqUwWG4IiuwTvkQ2sGcaQuPnXc>
Page de recharge : <https://api.zyai.online/account/topup/recharge>

Notez qu'une fois le token obtenu, vous devez configurer la clé API localement.

Dans les paramètres du groupe de clés, assurez-vous de sélectionner l'élément spécialement dédié à Codex.

![](/zh-cn/stage-2/backend/modern-cli/images/image30.png)

Ensuite, vous devez insérer la clé obtenue dans l'invite suivante, et confier l'intégralité du prompt à Trae pour qu'il vous aide à compléter le processus de configuration :

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

Une fois la configuration terminée, vous pouvez lancer Codex avec l'API relayée via `codex --profile myrelay`. L'utilisation est ensuite similaire à Claude Code : il suffit de saisir vos idées et besoins dans la boîte de dialogue.

### OpenCode

![](/zh-cn/stage-2/backend/modern-cli/images/image32.png)

![](/zh-cn/stage-2/backend/modern-cli/images/image33.png)

OpenCode est une plateforme open source d'agents de codage IA destinée aux développeurs, positionnée comme un « Claude Code multi-modèles ». Son interface d'interaction principale est le Terminal, et elle prend également en charge l'intégration d'éditeurs (VS Code, Neovim, etc.), pouvant se connecter en profondeur aux dépôts de code locaux et accomplir un flux de développement complet, de la compréhension du code à l'exécution d'ingénierie, via le langage naturel.

Ce n'est pas un outil de programmation IA lié à un seul modèle, mais une plateforme ouverte d'agents de codage IA permettant de passer librement de GPT à Claude, Gemini ou même des modèles locaux. Même OpenAI prend officiellement en charge la connexion d'OpenCode à Codex / abonnements OpenAI.

![](/zh-cn/stage-2/backend/modern-cli/images/image34.png)

Vous pouvez installer OpenCode avec la commande suivante :

```bash
# Linux / Unix
curl -fsSL https://opencode.ai/install | bash

# Windows
npm i -g opencode-ai
```

#### Utiliser les modèles gratuits dans OpenCode

OpenCode propose périodiquement des modèles gratuits utilisables, dont la configuration est très simple. Dans le répertoire où vous souhaitez utiliser OpenCode, lancez le programme en tapant `opencode` dans la ligne de commande pour accéder au panneau de chat. Saisissez la commande `/models` et recherchez le mot-clé « free » pour voir les modèles gratuits signalés par le mot « free ».

![](/zh-cn/stage-2/backend/modern-cli/images/image35.png)

En général, les modèles gratuits accomplissent les tâches de codage plus lentement que les modèles payants ou sur abonnement. Cela dépend généralement de la congestion du routage du modèle, de la période de pointe de codage et des capacités propres au modèle.

#### Utiliser un modèle tiers comme modèle de codage principal dans OpenCode

C'est l'avantage central d'OpenCode : il permet de changer librement de modèle tout en conservant les mêmes MCP, Skills et contexte pour accomplir différentes tâches de codage. L'exemple ci-dessous montre comment connecter GPT-5.3 Codex d'OpenAI à OpenCode comme modèle de codage principal.

Dans la fenêtre de chat d'OpenCode, saisissez la commande `/connect`, sélectionnez la première instruction la plus pertinente et appuyez sur Entrée pour accéder à l'authentification d'un fournisseur de modèles tiers.

![](/zh-cn/stage-2/backend/modern-cli/images/image36.png)

Ici, nous choisissons OpenAI comme exemple, appuyez sur Entrée pour sélectionner la méthode d'authentification.

![](/zh-cn/stage-2/backend/modern-cli/images/image37.png)

Choisissez celle que vous préférez, seule la méthode d'authentification diffère. Ici, nous sélectionnons la première option pour une connexion par navigateur.

![](/zh-cn/stage-2/backend/modern-cli/images/image38.png)

Copiez ce lien dans votre navigateur et procédez à une connexion OpenAI normale. Lorsque le navigateur affiche « Authorization Successful », le client OpenCode basculera automatiquement vers l'interface de sélection du modèle OpenAI.

![](/zh-cn/stage-2/backend/modern-cli/images/image39.png)

![](/zh-cn/stage-2/backend/modern-cli/images/image40.png)

#### Installer le plugin Oh My OpenAgent

La force d'OpenCode réside également dans son écosystème communautaire très actif. Vous pouvez trouver de nombreux plugins liés à OpenCode sur Github. Si OpenCode est un outil collaboratif IA permettant de changer librement de modèle, alors Oh-My-OpenAgent est un « système de commandement multi-agents de programmation IA » fonctionnant au-dessus d'OpenCode. Il peut décomposer une tâche complexe en sous-tâches confiées à différents modèles, chacun travaillant dans son domaine de compétence.

![](/zh-cn/stage-2/backend/modern-cli/images/image41.png)

Vous pouvez copier l'instruction suivante et la coller dans le modèle configuré précédemment dans OpenCode pour installer le plugin.

```text
Install and configure oh-my-openagent by following the instructions here:
https://raw.githubusercontent.com/code-yeongyu/oh-my-openagent/refs/heads/dev/docs/guide/installation.md
```

Voici les fonctionnalités et la description des capacités d'Oh-My-OpenAgent.

| Fonctionnalité | Description |
| :-------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Légion autonome (Discipline Agents)** | Sisyphus coordonne Hephaestus, Oracle, Librarian et Explorer. Une équipe complète de développement IA travaillant en parallèle. |
| **Team Mode** (v4.0, activation optionnelle) | Agent leader + jusqu'à 8 membres parallèles, visualisation tmux en temps réel, famille d'outils `team_*` dédiée. pilote `hyperplan` (5 relecteurs antagonistes) et `security-research` (3 chasseurs + 2 ingénieurs PoC).[Documentation →](docs/guide/team-mode.md) |
| **`ultrawork` / `ulw`** | Déclenchement en un clic, tous les agents se déploient. La tâche ne s'arrête pas tant qu'elle n'est pas terminée. |
| **[IntentGate Porte d'intention](https://factory.ai/news/terminal-bench)** | Avant toute action réelle, analyse la véritable intention de l'utilisateur. Fini les réponses IA déclenchées à tort par un sens littéral. |
| **Outil d'édition basé sur le hachage** | Chaque modification est vérifiée par le hachage du contenu `LINE#ID`, 0% de modifications erronées. Inspiré par [oh-my-pi](https://github.com/can1357/oh-my-pi). [The Harness Problem →](https://blog.can.ac/2026/02/12/the-harness-problem/) |
| **LSP + AST-Grep** | Renommage au niveau workspace, diagnostics pré-build, réécriture basée sur AST. Offre aux agents une précision de niveau IDE. |
| **Agents en arrière-plan** | Lancement simultané de 5+ experts travaillant en parallèle. Maintient un contexte propre, résultats disponibles à tout moment. |
| **MCP intégré** | Exa (recherche web), Context7 (documentation officielle), Grep.app (recherche de code source GitHub). Activé par défaut. |
| **Ralph Loop / `/ulw-loop`** | Boucle auto-référentielle. N'accepte jamais un taux de complétion inférieur à 100%. |
| **Exécution Todo forcée** | L'agent veut s'économiser ? Le système le rappelle à l'ordre. Vos tâches doivent être terminées. |
| **Vérificateur de commentaires** | Élimine les commentaires redondants au goût trop prononcé d'IA. Le code produit ressemble à celui d'un ingénieur senior chevronné. |
| **Intégration Tmux** | Support complet de terminal interactif. Exécuter des REPL, utiliser un débogueur, des outils TUI, le tout en session temps réel. |
| **Compatibilité Claude Code** | Vos Hooks, commandes, skills, MCP et plugins existants ? Tous migrables sans effort. |
| **MCP intégré aux Skills** | Les skills embarquent automatiquement les serveurs MCP nécessaires. Activation à la demande, sans saturer votre fenêtre de contexte. |
| **Planificateur Prometheus** | Avant d'écrire la moindre ligne de code, élabore un plan stratégique via un mode entretien. |
| **`/init-deep`** | Génère automatiquement des `AGENTS.md` à tous les niveaux du répertoire projet. Économise des tokens et améliore considérablement la compréhension de l'agent. |

Sisyphus (claude-opus-4-7 / kimi-k2.6 / glm-5.1) est votre commandant en chef. Il est responsable de la planification, de l'allocation des tâches à l'équipe d'experts, et pousse les tâches à leur terme avec une stratégie de parallélisme extrêmement agressif. Il n'abandonne jamais en cours de route.

Hephaestus (gpt-5.5) est votre travailleur en profondeur autonome. Vous lui donnez uniquement un objectif, pas la méthode. Il explore automatiquement les patterns du dépôt de code, exécute les tâches de bout en bout de manière indépendante, sans jamais vous demander d'assistance. Un véritable artisan.

Prometheus (claude-opus-4-7 / kimi-k2.6 / glm-5.1) est votre stratège. Il délimite le périmètre et construit un plan d'exécution détaillé via un mode entretien, avant d'écrire la moindre ligne de code.

Une fois ces éléments compris, vous pouvez utiliser OpenCode équipé du plugin Oh-My-OpenAgent pour accomplir vos tâches de codage.

## Autres usages des outils de programmation IA en CLI

### Écrire un cahier des charges avec l'IA : apprendre à « concrétiser les besoins »

Pour les grands modèles de langage, les besoins abstraits doivent être « concrétisés ». Par exemple : « j'ai faim » est un besoin abstrit. Nous devons le transformer en : « j'ai un peu faim, je pourrais manger un pain aux haricots rouges avec un verre de lait de soja. » -- Voilà un besoin concret et exécutable.

Mais transformer un besoin abstrait en besoin concret est un processus qui demande beaucoup d'énergie. Si nous n'avons pas vu suffisamment d'exemples, il est difficile d'imaginer rapidement comment décomposer un problème abstrait en modules détaillés. Dans ce cas, la meilleure approche est de laisser l'IA réaliser l'étape de « concrétisation » pour vous.

Par exemple, si je veux développer une application de « planning quotidien », l'idée la plus simple pourrait être :

`Please help me write a daily planning app where I can write my plans each day and get reminders.`

L'IA peut certes décomposer la tâche directement sur cette base, puis procéder étape par étape, mais des erreurs ou des malentendus sont possibles en cours de route. Pour réduire les risques, nous pouvons demander à l'IA de développer d'abord le besoin :

`Based on my needs, please elaborate and provide a more detailed Product Requirement Document for reference. My idea is: Please help me write a daily planner app that supports daily plan-writing and provides reminders .`

L'IA pourrait alors produire un PRD complet tel que celui-ci :

```
Product Requirements Document (PRD): "Today's Plan" App
Document Version: 1.0
Creation Date: October 27, 2023
Author: (Your Name/Product Manager)

1. Product Introduction
1.1 Product Name
Today's Plan
1.2 Product Vision
"Today's Plan" is a minimalist and highly efficient daily planning and reminder tool, dedicated to helping users eliminate procrastination and forgetfulness, plan every day clearly, and ensure tasks are carried out through an intelligent reminder system--ultimately enabling users to gain a stronger sense of control and achievement over their time.
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
Goal: Validate core value--planning & reminders.
Features: Complete all "Core Features" described above (Plan management, smart reminders).
V1.1 (Quick Optimization):
Goal: Improve retention and achievement.
Features: Add "Daily Review & Statistics," "History Review."
V2.0 (Enhanced Experience):
Goal: Increase efficiency and personalization.
Features: Add "Templates," "Themes & Personalization," and start developing "Cloud Sync."
```

Comparé à notre phrase initiale « aide-moi à écrire une application de planification quotidienne avec des rappels », ce document est désormais beaucoup plus détaillé. Vous pouvez modifier son contenu selon vos besoins réels, en ajoutant ou supprimant des éléments ; pour les modules dont vous n'êtes pas sûr, vous pouvez aussi continuer à demander à l'IA de proposer d'autres alternatives, puis sélectionner et fusionner pour obtenir la version finale.

De cette manière, nous pouvons facilement transformer des idées abstraites en descriptions concrètes. Pour le développement IA, « concret » égale productivité : plus les besoins sont précis, plus il est facile d'obtenir un projet stable et de haute qualité. Vous pouvez essayer de reprendre un de vos petits projets précédents avec cette méthode et comparer la différence.

Si vous trouvez ce type de « prompt de besoins » trop long, une approche naturelle consiste à l'écrire dans un document markdown séparé, comme votre « document de besoins / document de développement / PRD ». Ensuite, chaque fois que vous demandez à l'IA de développer un projet, il suffit de lui demander de « se référer à ce document » au lieu de retaper un long prompt à chaque fois. Vous pouvez également améliorer ce document au fil des itérations, pour que les projets ultérieurs en bénéficient directement.

Voici quelques autres scénarios d'utilisation courants :

### Gérer les dossiers

Vous pouvez essayer d'utiliser les outils de programmation IA en CLI pour gérer les fichiers dans le dossier courant. Par exemple, si vous avez un ensemble de fichiers en désordre et que vous souhaitez les trier et les classer, vous pouvez dire à Claude Code ou Codex :

`Please help me organize the contents of the current folder. I want to group files with the same content together & I want to group files from the same time period together. Please help me handle this.`

### Développer un nouveau projet

C'est presque identique à ce que nous faisions précédemment avec z.ai ou Trae -- nous pouvons aussi utiliser directement les outils de programmation IA en CLI pour développer de nouveaux projets à partir de zéro. Bien sûr, il est préférable de préparer un cahier des charges à l'avance.

Plus le document de besoins est détaillé, meilleur sera le résultat final. Vous pouvez affiner le document en plusieurs itérations en fonction de vos idées évolutives ; plus le document est complet, plus l'implémentation du code sera stable et mature.

### Déployer des projets open source (par exemple Dify)

Pour les étudiants débutants en informatique, déployer un projet open source depuis GitHub est souvent difficile. Mais nous pouvons parfaitement confier cette tâche à Claude Code, comme nous l'avons fait dans le tutoriel Dify :

<https://github.com/langgenius/dify>

Si je veux faire tourner mon propre Dify localement, il me suffit de donner ce lien à Claude Code, puis de saisir :

`I want to deploy this GitHub project ``https://github.com/langgenius/dify`` . Please help me clone the project and run it.`

Après avoir reçu votre demande, Claude Code effectuera automatiquement une série d'opérations, dont le clonage du code depuis GitHub, la configuration de l'environnement d'exécution, le lancement du projet, etc. Si une étape échoue ou si le projet ne se lance pas correctement, vous n'aurez qu'à procéder à quelques ajustements manuels selon les indications. Outre Dify, vous pouvez aussi utiliser Claude Code pour déployer la plupart des projets open source courants sur GitHub -- il vous suffit d'une boîte de dialogue et du temps d'un café.

![](/zh-cn/stage-2/backend/modern-cli/images/image31.png)

### Expliquer du code et rédiger de la documentation

Pour certains projets complexes, ou les grands projets générés automatiquement par l'IA, vous trouverez peut-être le code trop long et la logique trop complexe pour être facilement compréhensible. C'est le moment de demander aux outils de programmation IA en CLI de vous aider à « lire le code ». Vous pouvez poser des questions comme :

- Expliquez-moi ce projet : comment le lancer, comment l'utiliser, comment le modifier et poursuivre le développement ?
- Décrivez-moi le flux global du projet : comment le programme fonctionne-t-il ? Quelles opérations l'utilisateur peut-il effectuer dans l'interface ?
- Rédigez-moi une documentation complète pour ce projet, incluant la documentation de développement et la documentation d'exécution.
- Sur la base de tout le contenu du dossier courant, rédigez une description détaillée et enregistrez-la dans un document markdown spécifié.

### D'autres possibilités

Bien sûr, les outils de programmation IA en CLI peuvent faire bien plus que ce qui précède. Ne les considérez pas seulement comme des « outils de code », mais plutôt comme des agents intelligents capables d'agir de manière autonome. Vous pouvez leur demander de :

- Gérer et organiser vos fichiers locaux ;
- Tenir un journal, rédiger des bilans ;
- Analyser et corriger des erreurs système ;
- Exécuter diverses tâches répétitives en ligne de commande, etc.

Peut-être que dans un avenir proche, ils deviendront le partenaire IA le plus important et celui qui vous comprend le mieux sur votre ordinateur.