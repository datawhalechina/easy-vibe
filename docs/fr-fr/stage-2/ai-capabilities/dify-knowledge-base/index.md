# Introduction à Dify et intégration de base de connaissances

# Rappel du cours précédent

Dans les cours précédents, nous avons étudié en groupes la programmation IA, l'ingénierie des prompts et les fondamentaux de la génération d'images par IA. Ces contenus nous ont permis de mieux comprendre les limites et les capacités des différents grands modèles de langage (LLM, Large Language Model) ou modèles génératifs.

Pour vous aider à réviser le cours précédent, voici quelques questions de réflexion :

1. Qu'est-ce que la programmation IA ? Comment utiliser des outils de programmation IA (comme [z.ai](http://z.ai)) pour créer une page web ?
2. Qu'est-ce qu'un grand modèle de langage ? Qu'est-ce que l'ingénierie des prompts et l'ingénierie du contexte ? Comment rédiger un prompt complexe ?
3. Pour les trois directions que sont le texte, l'AI Coding et la génération d'images, comment jugez-vous de la puissance des modèles dans chaque domaine ?
4. Qu'est-ce qu'une API ? Comment utiliser [z.ai](http://z.ai) pour se connecter à une API tierce ?

Si l'une de ces questions vous semble encore floue, vous pouvez revoir les documents du cours précédent, ou poser directement vos questions dans le groupe de discussion WeChat.

Dans ce cours, nous passerons des simples outils de texte et d'images IA à des plateformes de construction de flux de travail plus proches des besoins réels des entreprises. Nous évoluerons des chatbots vers les agents IA et les flux de travail (Workflows) IA, puis via une API nous créerons une page de robot « intelligent » interactive.

Si vous rencontrez des étapes difficiles à comprendre, ne vous inquiétez pas. Nous vous recommandons de faire régulièrement des captures d'écran de la page en cours d'utilisation et de les envoyer à un grand modèle pour obtenir des explications. Les modèles actuels peuvent répondre à la plupart des questions courantes.

Si après avoir posé votre question le problème persiste, n'hésitez pas à expérimenter par vous-même. N'ayez pas peur de vous tromper -- chaque tentative est une occasion d'apprendre et de progresser. Avec la pratique, vous deviendrez de plus en plus à l'aise !

# Ce que vous allez apprendre dans ce cours

1. Pourquoi passer des chatbots aux agents IA et à l'orchestration de Workflows.
2. Qu'est-ce qu'un agent IA et une plateforme de développement de workflows, comment standardiser et orchestrer les capacités de l'IA.
3. Qu'est-ce que Dify, comment utiliser cette plateforme open source orientée applications LLM pour construire rapidement des applications, notamment des chatbots à base de connaissances.
4. Les méthodes d'implémentation et la valeur de RAG, pourquoi la génération augmentée par recherche est-elle nécessaire.
5. Comment apprendre de 0 à 1 à utiliser Dify et l'IDE IA Trae (`Connaissances supplémentaires 4 - Qu'est-ce que l'IDE IA et Trae`), notamment construire des agents et des workflows, et créer une application frontend de chatbot via l'API Dify.

- Les principes de base de Dify, les méthodes de création d'agents et de workflows, et les méthodes d'appel API.
- Comment utiliser un IDE IA pour la programmation.
- Une application frontend de chatbot interactive.

# 1. De la conversation à l'agent

Au stade précédent, nous avons appris à utiliser des prompts pour faire jouer des rôles aux grands modèles, générer du texte ou écrire du code simple. Mais si l'on y réfléchit attentivement, on constate un problème : un chatbot en soi ne peut pas agir.

Il peut expliquer comment vérifier une commande, mais ne peut pas réellement aller chercher les chiffres dans la base de données ; il peut décrire ce que devrait contenir un rapport hebdomadaire, mais ne peut pas automatiquement consolider les données du projet et envoyer un email. Cette limite du « dire sans faire » rend l'IA purement conversationnelle difficile à intégrer véritablement dans les processus métier.

Pour faire évoluer l'IA d'un simple partenaire de conversation vers un employé numérique, nous devons lui conférer trois capacités fondamentales :

1. Des connaissances dédiées -- lui permettre d'assimiler et comprendre vos documents produit, les profils clients, les politiques internes ;
2. L'appel d'outils (ou plugins) -- lui permettre d'opérer sur des bases de données, d'appeler des API ;
3. L'exécution structurée -- lui faire accomplir les tâches selon une logique prédéfinie, étape par étape, plutôt qu'en improvisant librement.

C'est l'ébauche d'un agent IA (AI Agent) : une unité automatisée dotée d'un objectif, de connaissances, d'outils et d'un chemin d'exécution.

![](/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image1.webp)

> Note : ce que l'industrie appelle actuellement des « agents » simples désigne généralement des applications enrichies basées sur la combinaison LLM + outils + base de connaissances, et non des agents capables de planifier de manière autonome. Bien que ces agents simples ne possèdent pas de véritables capacités de raisonnement et de planification à long terme, ils suffisent déjà à couvrir de nombreux scénarios d'automatisation en entreprise. Nous présenterons en détail dans les chapitres suivants les véritables agents capables de planification et d'action autonomes.

## 1.1 Le plus simple des agents : le chatbot à base de connaissances

Après avoir identifié les multiples capacités fondamentales d'un agent, une question se pose : peut-on, en implémentant uniquement la plus simple de ces fonctionnalités, construire un agent de base véritablement utilisable ? La réponse est oui.

En fait, dans de nombreux scénarios métier réels, le besoin central des utilisateurs n'est pas que l'IA exécute automatiquement des opérations complexes (comme appeler des API ou coordonner des tâches entre systèmes), mais plutôt qu'elle fournisse des réponses précises et fiables basées sur les documents propres à l'entreprise. Cela correspond exactement à la première des trois capacités fondamentales : le service de connaissances dédiées. Nous pouvons donc introduire la forme la plus simple et la plus répandue d'agent : le chatbot à base de connaissances.

Bien qu'il ne possède pas encore de capacités d'appel d'outils ou de planification autonome, sa avancée clé est la suivante : les réponses du grand modèle ne sont plus générées à partir de rien, mais s'appuient sur des sources vérifiables. Comment y parvenir ? La solution repose sur la génération augmentée par recherche (Retrieval-Augmented Generation, RAG).

L'idée fondamentale de RAG est la suivante : lorsque l'utilisateur pose une question, le système recherche d'abord dans la base de connaissances de l'entreprise les extraits de texte les plus pertinents sémantiquement (par exemple un passage du manuel produit, un article du règlement RH), puis injecte ces extraits comme contexte dans l'entrée du grand modèle, pour guider celui-ci à générer une réponse fondée sur des données réelles.

![](/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image2.webp)

Source de l'image : [https://www.datacamp.com/blog/what-is-retrieval-augmented-generation-rag](https://www.datacamp.com/blog/what-is-retrieval-augmented-generation-rag)

Ainsi, les réponses du modèle ne dépendent plus de ses connaissances générales issues des données d'entraînement, mais s'ancrent sur les informations authentiques fournies par l'entreprise. L'objectif de RAG est précisément d'améliorer significativement la véracité, la précision et la cohérence des réponses grâce à cette injection dynamique de connaissances externes -- pouvant même adapter le ton (par exemple répondre dans le style d'un service client ou d'une documentation technique).

En pratique, cette technologie est particulièrement importante car les grands modèles produisent souvent des « hallucinations ». Par exemple, si vous demandez des données spécifiques en vous faisant passer pour un directeur financier ou un consultant, le modèle risque d'inventer des dates et des événements. Avec RAG, la contrôlabilité et la fiabilité des réponses sont considérablement améliorées.

![](/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image3.png)

Source de l'image : [https://www.databricks.com/glossary/retrieval-augmented-generation-rag](https://www.databricks.com/glossary/retrieval-augmented-generation-rag)

Dans la partie pratique de ce cours, nous utiliserons la plateforme de workflows IA populaire Dify pour construire un chatbot à base de connaissances. Vous pourrez facilement constituer une base de connaissances à partir de divers documents dédiés : manuels produits, politiques internes, documents de projet, articles de recherche, notes personnelles.

Une fois la construction terminée, vous pourrez tester ses capacités avec différentes questions, par exemple :

- « Quelles sont les principales nouveautés de la dernière version de notre produit A ? »
- « Selon le manuel du personnel, comment fonctionne le système de congés cette année ? »
- « Dans le projet XX, comment avons-nous résolu le défi technique "XXX" ? »
- « Quelle est la méthode de recherche centrale mentionnée dans cet article ? »

Vous découvrirez par vous-même comment RAG transforme des documents dispersés en une base de connaissances intelligente et précise.

## 1.2 De l'agent conversationnel au workflow

Cependant, même un « agent enrichi » disposant d'une base de connaissances et de capacités d'appel de plugins se révèle insuffisant face à des processus métier plus complexes.

Prenons une demande utilisateur : « Quelles sont les dernières mises à jour fonctionnelles de notre produit SaaS récemment lancé ? Peux-tu me préparer un briefing pour les clients ? »

Cette demande semble simple, mais elle nécessite plusieurs étapes coordonnées : d'abord extraire les enregistrements de lancement du mois écoulé depuis la documentation interne ou la base de connaissances Notion ; puis filtrer les fonctionnalités clés orientées client ; ensuite appeler un grand modèle pour convertir les descriptions techniques en langage client-friendly ; enfin pousser le contenu généré vers l'équipe marketing par email, ou le sauvegarder dans un template Google Docs.

Si l'on s'en remet uniquement au raisonnement libre d'un seul grand modèle, non seulement il est peu probable de tout réaliser en une seule conversation, mais le risque est grand d'omettre des informations clés, de confondre le jargon interne et le langage client, ou de produire un résultat non structuré. Plus important encore, l'entreprise a besoin de parcours d'exécution standardisés, auditables, réutilisables et surveillables, et non d'une improvisation dépendant du modèle à chaque fois. La reproductibilité et la surveillance sont cruciales pour les entreprises -- des résultats inattendus peuvent entraîner des pertes graves.

C'est ce qui nous mène au paradigme d'application IA de niveau supérieur : le workflow IA (AI Workflow).

![](/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image4.webp)

Un workflow désigne la décomposition d'une tâche complexe en plusieurs sous-étapes ordonnées, configurables et exécutables automatiquement, dont les relations logiques (conditions, boucles, parallélisme) sont orchestrées de manière visuelle ou par code. Standardiser les capacités IA (c'est-à-dire les transformer en procédures opérationnelles standardisées) signifie cristalliser l'expérience de l'utilisation de l'IA pour une tâche donnée en un template réutilisable.

Cette approche offre de multiples avantages : les non-techniciens (comme les chefs de produit ou les responsables marketing) peuvent assembler rapidement des applications IA par glisser-déposer de composants ; les développeurs peuvent encapsuler la recherche RAG, les appels LLM, les outils API en nœuds standardisés, réutilisables dans différents scénarios métier ; l'ensemble du processus peut être tracé, débogué et optimisé en continu, répondant aux exigences de stabilité et de conformité des entreprises.

L'utilisation des workflows IA touche un public très large. Les chefs de produit peuvent concevoir des parcours utilisateur complets sans coder ; les équipes marketing peuvent rapidement construire des chatbots de service client, des générateurs de contenu ou des systèmes de notification ; les développeurs et ingénieurs peuvent modulariser les capacités clés pour les appels frontend ; les entrepreneurs ou développeurs indépendants peuvent valider un MVP de produit IA à moindre coût, en mettant en ligne en quelques jours un prototype complet incluant interrogation de données, génération de contenu et exécution d'actions.

En résumé, si les agents font passer l'IA du stade de « savoir discuter » à « savoir agir », les workflows la font passer de « réussir parfois une tâche » à « accomplir de manière stable, fiable et à grande échelle une catégorie de tâches ». Dans la pratique qui suit, nous utiliserons la plateforme Dify pour construire de nos propres mains un workflow IA complet.

## 1.3 Plateformes d'agents et de workflows courantes

Avec le développement rapide de l'IA générative, un ensemble de plateformes low-code voire no-code d'agents et de workflows ont émergé pour aider les développeurs et les équipes métier à construire rapidement des agents et des processus automatisés, sans se perdre dans la complexité de la programmation.

La notion clé de plateforme low-code désigne des outils de développement réduisant considérablement le codage manuel grâce à des composants glisser-déposer visuels, des templates de logique métier prédéfinis et une configuration graphique des règles. Leur cœur est de remplacer l'écriture de code par une configuration visuelle et un assemblage de nœuds par glisser-déposer, libérant les développeurs des tâches répétitives tout en permettant aux non-techniciens maîtrisant la logique métier de participer à la construction d'applications.

La valeur essentielle de ces plateformes est de réduire considérablement le seuil d'entrée pour le développement d'applications IA. Ce qui nécessitait auparavant une collaboration d'équipe pendant des semaines -- de l'analyse des besoins au développement, tests et déploiement -- peut désormais être accompli en quelques heures grâce aux outils visuels de ces plateformes.

Les principales plateformes de workflows IA low-code actuellement sur le marché :

| Plateforme | Caractéristiques | Scénarios d'utilisation |
| --- | --- | --- |
| Dify | Open source, RAG, orchestration LLM, API, adapté au chinois | Base de connaissances entreprise, agents personnalisés, services API |
| Coze (ByteDance) | Disponible en Chine, intégration Douyin/Lark, plugins riches | Bots sociaux, intégration mini-programmes |
| n8n | Automatisation générale, nœuds IA, orchestration API | Synchronisation inter-systèmes, automatisation IA + SaaS |
| Baidu Qianfan / Alibaba Bailian / Tencent HunYuan | Solutions cloud natives des grands groupes | Déploiement entreprise, haute conformité |

Dify, Coze et n8n se distinguent par trois avantages clés :

1. Facilité d'utilisation extrême. Interface glisser-déposer visuelle, prise en main rapide sans comprendre la technologie sous-jacente.
2. Grande flexibilité. Composants personnalisés et API extensibles, adaptés aux scénarios légers (démonstrations, MVP) comme aux besoins d'itération agile des PME.
3. Écosystème mature. Documentation officielle détaillée, réponse rapide, communauté active avec de nombreux templates partagés.

Ces trois plateformes permettent toutes d'exposer les agents construits sous forme d'API standardisée, intégrables dans les applications web frontend, les systèmes ERP internes ou les apps mobiles.

### 1.3.1 Dify : plateforme LLMOps d'entreprise

Dify se positionne comme une plateforme de développement et d'exploitation d'applications LLM, dédiée à la gestion du cycle de vie complet, de la conception au déploiement et à l'optimisation.

![](/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image6.png)

En termes de fonctionnalités, Dify couvre l'orchestration visuelle de workflows, la construction d'agents, la gestion de bases de connaissances et le support multi-modèles. La plateforme permet de concevoir des flux de tâches complexes par glisser-déposer de nœuds et supporte la création d'agents basés sur les intentions. Sa fonctionnalité de base de connaissances est particulièrement aboutie, capable de traiter de multiples formats de documents avec une recherche vectorielle efficace.

![](/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image7.webp)

### 1.3.2 Coze (ByteDance)

Coze est la plateforme de développement d'agents IA de ByteDance, centrée sur la facilité d'utilisation extrême.

![](/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image8.png)

Sa particularité est de simplifier la construction de bots en un assemblage de type « briques LEGO ». Les bots créés peuvent être publiés en un clic sur Doubao, Lark, WeChat et d'autres plateformes.

![](/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image9.png)

### 1.3.2 n8n : moteur d'automatisation de workflows programmable

n8n est une plateforme d'automatisation de workflows programmable et polyvalente, dont le positionnement central est de connecter applications, bases de données et API pour automatiser les flux de données et l'exécution de tâches.

![](/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image10.png)

Sa caractéristique technique clé est le « code source visible » et l'« auto-hébergement », permettant un déploiement privé pour un contrôle total des données et de l'environnement. Son principal atout réside dans son écosystème communautaire extrêmement riche.

# 2. Dify en profondeur

## 2.1 Qu'est-ce que Dify

Dify est une plateforme open source pour le développement d'applications LLM. Elle offre une interface intuitive combinant workflows d'agents, pipelines RAG, capacités d'outils, gestion de modèles et observabilité, pour vous aider à passer rapidement du prototype à la production.

![](/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image11.webp)

Construire un workflow dans Dify, c'est comme assembler des briques LEGO ou un puzzle. Vous connectez des « nœuds LLM » (compréhension et génération), des « nœuds outils » (exécution d'actions spécifiques : interrogation de base de données, envoi d'email, traduction) et des « nœuds de données » (lecture, stockage d'informations) entre eux. Ils fonctionnent automatiquement selon la logique prédéfinie, sans intervention manuelle répétée.

Par exemple, si vous dirigez un magasin e-commerce Amazon ou Douyin et souhaitez construire un service client IA, vous pouvez concevoir un workflow comme suit :

1. Nœud déclencheur : reçoit la question de l'utilisateur.
2. Nœud de classification : utilise un modèle pour classer la question (service après-vente, mode d'emploi, etc.).
3. Nœud de recherche de connaissances : accède à la base de connaissances correspondante.
4. Nœud LLM : génère une réponse conviviale à partir de la question et des connaissances récupérées.
5. Nœud de condition : vérifie si la réponse contient les informations attendues.
6. Nœud de sortie : renvoie la réponse finale à l'utilisateur.

![](/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image12.webp)

### 2.1.1 Déployer votre propre Dify (optionnel)

Consultez le tutoriel : [Comment déployer une application Web](/fr-fr/stage-2/backend/zeabur-deployment/)

![](/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image13.png)

## 2.2 Créer votre première application Chatbot Dify

Accédez à [https://cloud.dify.ai/apps](https://cloud.dify.ai/apps), inscrivez-vous et connectez-vous, puis sélectionnez Studio.

![](/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image14.png)

Cliquez sur `Create from Blank` dans la section `CREATE APP`.

![](/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image15.png)

![](/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image16.webp)

Sélectionnez Chatbot comme type d'application, saisissez un nom et une description, puis créez.

![](/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image17.png)

![](/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image18.png)

La zone « INSTRUCTIONS » correspond aux instructions intégrées (prompt système par défaut).

La zone « Knowledge » en dessous est la zone de base de connaissances.

Le panneau de droite est la fenêtre de débogage pour tester les réponses en temps réel.

![](/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image19.webp)

![](/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image20.png)

## 2.3 Prendre en charge les fournisseurs de modèles personnalisés

Dify prend en charge la configuration de trois types de modèles : LLM, Embedding et Rerank.

Installez les plugins `OpenAI-API-compatible` et `SiliconFlow` pour accéder à la plupart des modèles.

![](/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image21.png)

![](/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image22.png)

![](/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image23.png)

![](/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image24.png)

![](/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image25.png)

![](/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image26.png)

![](/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image27.png)

![](/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image28.png)

![](/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image29.png)

## 2.4 Créer votre première base de connaissances Dify

Cliquez sur `Knowledge` dans le menu supérieur pour accéder à la page de création de base de connaissances.

![](/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image30.png)

Cliquez sur `Create Knowledge`.

![](/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image31.png)

Chargez vos fichiers (PDF, TXT, etc.) pour construire la base de connaissances.

![](/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image32.png)

![](/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image33.webp)

![](/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image34.webp)

![](/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image35.png)

![](/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image36.png)

![](/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image37.png)

![](/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image38.webp)

![](/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image39.webp)

![](/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image40.png)

![](/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image41.png)

![](/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image42.png)

![](/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image43.png)

![](/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image44.webp)

![](/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image45.png)

## 2.5 Autres opérations courantes dans Dify

### 2.5.1 Importer et exporter des workflows

Dify prend en charge l'import/export de workflows au format DSL (JSON).

![](/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image46.png)

![](/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image47.png)

### 2.5.2 Explorer plus de projets Dify

Cliquez sur Explora pour voir les workflows construits par d'autres.

![](/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image48.webp)

## 2.6 Créer votre première application Workflow Dify

Sélectionnez Chatflow ou Workflow selon que votre besoin est une conversation continue ou un processus automatisé.

![](/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image49.png)

![](/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image50.webp)

- **Chatflow** : conçu pour les conversations, avec mémoire et contexte.
- **Workflow** : conçu pour l'automatisation, traitement ponctuel entrée -> sortie.

![](/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image51.png)

### 2.6.1 Nœuds courants

![](/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image52.png)

![](/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image53.png)

**Nœuds LLM et de raisonnement :**

![](/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image54.png)

![](/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image55.png)

- LLM : unité de calcul principale appelant le grand modèle.
- Knowledge Retrieval : recherche dans les bases de connaissances.
- Answer : sortie des résultats.
- Agent : prise de décision avancée avec outils.
- Question Classifier : classification des questions par type.

**Nœuds de logique et contrôle de flux :**

![](/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image56.png)

- Condition (IF/ELSE) : branchement logique.
- Iteration : traitement parallèle par lots sans état.
- Loop : itération récursive avec état.

**Nœuds de manipulation de données et intégration :**

![](/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image57.png)

- Code : logique personnalisée en code.
- Template : génération de contenu à partir de templates.
- Variable Aggregator : consolidation de variables.
- Doc Extractor : extraction depuis documents.
- HTTP Request : appels vers des systèmes externes.
- List Operator : opérations sur listes/tableaux.

### 2.6.2 Outils courants

![](/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image58.png)

Les outils dans Dify peuvent être placés directement sur le canevas comme des nœuds.

- **Recherche web** : Tavily Search pour une recherche optimisée pour l'IA.
- **Traitement de données** : JSON Process pour les opérations avancées sur JSON.
- **Formatage** : Markdown Exporter pour l'export dans des formats spécifiés.

### 2.6.3 Créer un workflow simple de classification d'intention

Pour un scénario de restaurant, nous créons un workflow capable de classer les intentions des utilisateurs en quatre catégories : commande (buy_food), réclamation (complain), conversation (chitchat) et autre (other).

![](/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image59.png)

![](/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image60.png)

![](/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image61.png)

![](/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image62.webp)

![](/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image63.png)

![](/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image64.png)

![](/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image65.webp)

![](/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image66.webp)

![](/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image67.png)

![](/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image68.png)

#### Test du workflow

![](/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image69.webp)

## 2.7 Exécuter un workflow template

Importez le workflow DeepResearch officiel et corrigez les erreurs au fur et à mesure.

![](/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image70.png)

![](/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image71.webp)

![](/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image72.webp)

![](/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image73.png)

![](/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image74.webp)

![](/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image75.png)

![](/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image76.png)

![](/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image77.png)

## 2.8 Utiliser Dify comme fournisseur d'API

Nous allons maintenant appeler l'agent à base de connaissances créé précédemment via l'API Dify.

![](/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image78.png)

![](/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image79.png)

![](/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image80.png)

![](/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image81.png)

![](/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image82.png)

## 2.9 Créer une application frontend de conversation via l'API Dify

Publiez d'abord l'agent, puis accédez à la documentation API.

![](/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image83.webp)

![](/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image84.webp)

![](/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image85.png)

![](/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image86.webp)

![](/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image87.png)

![](/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image88.png)

Utilisez Trae Builder avec votre clé API, la requête et la réponse exemples pour générer le code frontend.

![](/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image89.png)

![](/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image90.webp)

![](/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image91.png)

![](/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image92.webp)

![](/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image93.webp)

# 3. Références de workflows métier supplémentaires

Vous pouvez rechercher sur Internet avec des mots-clés comme « Dify workflow examples » ou trouver des dépôts GitHub partageant des workflows Dify.

Voici quelques idées de workflows générées par un grand modèle :

## 3.1 Workflows pour plateformes sociales

1. Distribution multi-plateforme en un clic (complexe)
2. Générateur de sujets tendance et brouillons (moyen)
3. Assistant de classification et réponse aux commentaires (complexe)
4. Générateur de scripts et storyboards vidéo (complexe)
5. Résumé en temps réel des interactions en live (moyen)

## 3.2 Workflows professionnels

1. Compte-rendu de réunion intelligent et assignation automatique de tâches (complexe)
2. Filtrage et évaluation automatisée de CV (moyen)
3. Traduction et réponse multilingue par email (simple)
4. Consolidation automatique de rapports hebdomadaires/mensuels (complexe)
5. Révision intelligente de contrats/documents (moyen)

## 3.3 Workflows pour l'apprentissage et la vie quotidienne

1. Analyseur approfondi d'articles académiques avec génération de notes (complexe)
2. Planificateur de voyage personnalisé (moyen)
3. Partenaire de pratique linguistique interactif (simple)
4. Système de Q&R sur base de connaissances personnelle (complexe)
5. Conseiller fitness/nutrition avec suivi (moyen)

# 6. Limites des plateformes de workflows

Les plateformes de workflows (ou plateformes low-code) ne sont pas des solutions universelles. Bien qu'elles soient conviviales pour les profils métier et réduisent le seuil de codage, le « low-code » implique aussi son propre coût d'apprentissage : l'utilisateur doit comprendre les concepts, règles et logique opérationnelle de la plateforme.

Vous pourriez légitimement vous demander : beaucoup de workflows simples ne sont que des appels de fonctions de grand modèle enchaînés, l'output de l'un devenant l'input du suivant, ce qui pourrait être résolu en quelques lignes de code. Pourquoi nécessiter une infrastructure de workflow aussi complexe ?

Vous avez raison. Avec le développement rapide du vibe coding et les capacités de génération de code par l'IA, lire voire générer du code directement peut parfois être plus efficace. Idéalement, nous pourrions piloter la logique applicative en langage naturel -- ce serait une véritable plateforme logicielle moderne. Mais les plateformes de workflow actuelles ne l'ont pas encore atteint, créant un « intermédiaire » naturel entre l'intention de l'utilisateur et la réalisation finale.

Néanmoins, la maîtrise de ces plateformes devient une compétence de base, analogue aux outils bureautiques Microsoft, très répandue et utile en entreprise.

# 📚 Exercice final

## Maîtriser les opérations de base de Dify

1. Créez un workflow de classification d'intention dans un scénario entièrement différent.
2. Défi de workflow « Login » : trouvez le bon mot de passe, modifiez-le, ajoutez une deuxième tentative.

![](/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image94.png)

![](/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image95.webp)

3. Défi de workflow « Love loop » : corrigez le workflow pour obtenir la sortie attendue.

![](/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image96.png)

![](/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image97.png)

## Implémenter l'appel API Dify

1. Déployez Dify et créez une base de connaissances simple.
2. Utilisez Trae IDE pour construire un frontend de conversation interagissant via l'API Dify.
3. Testez les conversations multi-tours.

## Essayer un workflow tiers ou construire le vôtre

Trouvez un workflow Dify sur Github, WeChat, Reddit ou Twitter, importez-le et exécutez-le avec succès.

# [Bug] Solution au problème d'erreur de requête HTTP

Si vous rencontrez le problème illustré ci-dessous, consultez cette section ; sinon vous pouvez l'ignorer.

![](/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image98.webp)

Ce problème survient lorsque Dify est déployé sur un serveur ne supportant que HTTP (sans HTTPS). Le HTTPS (HyperText Transfer Protocol Secure) est une version sécurisée du HTTP avec chiffrement SSL/TLS.

Solutions possibles :
- Utiliser un proxy inverse avec certificat (nginx)
- Lier un domaine et obtenir un certificat

Nous utiliserons Zeabur comme passerelle réseau pour résoudre ce problème :

- Adresse d'origine : `http://{DIFY_API_URL}/v1/chat-messages`
- Nouvelle adresse : `https://{DIFY_NEW_API_URL}.zeabur.app/v1/chat-messages`

Vous pouvez déployer un service proxy sur Zeabur en sélectionnant Python et en utilisant le code suivant :

```python
from flask import Flask, request, Response
import requests

app = Flask(__name__)

TARGET_BASE_URL = "{DIFY_API_URL}"
LISTEN_PORT = 8080

@app.route('/', defaults={'path': ''}, methods=['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS', 'HEAD'])
@app.route('/<path:path>', methods=['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS', 'HEAD'])
def proxy_request(path):
    target_url = f"{TARGET_BASE_URL}/{path}"
    if request.query_string:
        target_url += f"?{request.query_string.decode('utf-8')}"

    headers = {key: value for key, value in request.headers if key.lower() not in ['host', 'connection', 'content-length', 'accept-encoding']}

    try:
        resp = requests.request(
            method=request.method,
            url=target_url,
            headers=headers,
            data=request.get_data(),
            cookies=request.cookies,
            allow_redirects=False,
            timeout=30
        )

        excluded_headers = ['content-encoding', 'content-length', 'transfer-encoding', 'connection']
        response_headers = [(name, value) for name, value in resp.raw.headers.items() if name.lower() not in excluded_headers]

        return Response(resp.content, resp.status_code, response_headers)

    except requests.exceptions.RequestException as e:
        print(f"Error forwarding request to {target_url}: {e}")
        return Response(f"Proxy Error: Could not reach target server or invalid response: {e}", status=502)
    except Exception as e:
        print(f"An unexpected error occurred: {e}")
        return Response(f"Internal Proxy Error: {e}", status=500)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=LISTEN_PORT, debug=True)
```