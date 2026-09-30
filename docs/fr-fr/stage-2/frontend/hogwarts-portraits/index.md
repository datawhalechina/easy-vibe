# Projet 4 : Créons ensemble des Portraits de Poudlard

Dans les cours précédents, nous avons appris à utiliser le prompt engineering et les appels d'API pour réaliser des interactions AI plus complexes. Nous avons été capables de transformer de simples chatbots AI en Agents AI et workflows AI ; grâce à des conditions et des logiques de branchement plus avancées, nous avons pu développer des fonctionnalités beaucoup plus pratiques.

Pour que ces logiques AI complexes puissent mieux fonctionner dans différents programmes et scénarios réels, nous sommes passés de l'environnement en ligne simple de z.ai à un IDE AI local plus moderne, déplaçant ainsi l'environnement de programmation du navigateur vers votre ordinateur. Avec ce changement, vous avez commencé à faire face à divers problèmes d'installation et de configuration d'environnement, mais en dialoguant avec Trae Agent, ces défis apparemment difficiles sont devenus surmontables.

Dans ce projet, nous irons encore plus loin dans l'utilité de l'application, en optimisant non seulement les fonctionnalités AI elles-mêmes, mais aussi en soignant « l'apparence » du produit. Vous apprendrez à rendre votre interface plus élégante et plus facile à utiliser, et à personnaliser vous-même la mise en page et le style de l'interface selon les besoins réels.

Avant de commencer, voici quelques petites questions pour vous aider à réviser rapidement le contenu du cours précédent :

1. Qu'est-ce que Dify ? À quoi sert-il ? Pourquoi en avons-nous besoin ?
2. Comment appeler l'API de Dify ?
3. Qu'est-ce que le RAG ? Comment construire un Agent RAG ou un workflow RAG avec Dify ? Comment utiliser les nœuds courants de Dify ?
4. Qu'est-ce qu'un IDE AI ? Qu'est-ce que Trae ? Quelle est la différence avec z.ai ?

Si vous avez encore des doutes sur l'une de ces questions, vous pouvez d'abord revoir le document du cours précédent, ou poser directement vos questions dans le groupe WeChat.

Le thème de ce projet est **Hogwarts Portraits** (Portraits de Poudlard). Comme son nom l'indique, il s'inspire des portraits qui « prennent vie » dans l'école de magie de Poudlard. Nous souhaitons utiliser l'IA pour créer une expérience de portraits magiques « interactifs » — dialoguer avec le portrait comme si l'on parlait avec la « personne elle-même », en conservant la mémoire des conversations tout en intégrant le contexte et l'histoire du personnage. À travers ce projet, vous intégrerez véritablement les agents et workflows que vous avez appris dans une interface produit concrète.

![](/zh-cn/stage-2/frontend/hogwarts-portraits/images/image1.webp)

Pour créer de véritables Hogwarts Portraits, nous devons construire nous-mêmes une interface frontend adaptée aux portraits magiques. Pour cela, vous commencerez à découvrir les outils de conception frontend modernes, apprendrez à combiner la conception d'interface et le code, et à transformer les maquettes sur papier ou sur toile en véritables pages web fonctionnelles.

Vous devrez également apprendre à publier cette page web depuis votre environnement local vers Internet, afin que la page web que vous avez créée puisse non seulement fonctionner sur votre propre ordinateur, mais aussi être accessible et utilisée par des utilisateurs du monde entier.

L'adresse du projet de référence pour ce cours est : [Project4-Hogwarts-Portraits](https://github.com/THU-SIGS-AIID/Project4-Hogwarts-Portraits)

# Ce que vous allez apprendre

1. Comprendre ce que sont les outils de conception frontend, quels problèmes ils résolvent, et quels sont les outils les plus courants actuellement disponibles.
2. Découvrir Figma et MasterGo, maîtriser leurs opérations de base, et apprendre à utiliser les plugins d'exportation de code frontend.
3. Utiliser Figma AI et MasterGo AI pour générer des conceptions de pages web et exporter du code utilisable.
4. Comprendre ce qu'est GitHub, apprendre à configurer une connexion SSH, créer un dépôt de code et effectuer des pushs.
5. Comprendre le concept de « déploiement », apprendre à utiliser Zeabur pour déployer du code depuis GitHub ou un environnement local vers Internet.

Votre propre Hogwarts Portraits, une page web présentant **une star, un personnage historique ou un personnage de dessin animé**.

# 1. Hogwarts Portraits

Quel genre de « portrait magique » voulons-nous créer exactement ? En résumé, nous souhaitons reproduire autant que possible la scène de Harry Potter : le portrait n'est plus simplement une image statique accrochée au mur, mais un personnage anthropomorphe avec qui vous pouvez dialoguer, et dont les expressions et « l'humeur » changent en fonction du contenu de la conversation.

![](/zh-cn/stage-2/frontend/hogwarts-portraits/images/image2.webp)

Pour que ce portrait ne ressemble pas à un robot de chat AI, mais s'approche davantage d'une « personne réelle », il faut résoudre deux problèmes. Premièrement, la mémoire et les connaissances : le portrait doit maîtriser un grand nombre d'informations contextuelles liées au personnage (caractérisation, histoires vécues, articles connexes, etc.). Cette partie peut être réalisée grâce à une base de connaissances — en intégrant dans Dify les textes que vous avez préparés pour le personnage, le portrait acquiert une capacité de présentation des connaissances de fond.

Deuxièmement, le style d'expression. Les connaissances seules ne suffisent pas ; nous voulons également que la manière de parler soit la plus proche possible de la « personne elle-même », y compris le ton, les habitudes verbales, la façon de penser, et même parfois l'humeur et l'humour. Cette couche nécessite un travail de prompt engineering : dans le prompt système, nous devons définir clairement l'identité du personnage, les limites de son univers et son style linguistique, afin que chaque réponse s'inscrive dans le personnage établi, au lieu de revenir au ton neutre d'une IA générique.

Au-delà de la fonction de dialogue, nous voulons aussi que les émotions puissent être véritablement visibles. Pour cela, nous pouvons construire un indicateur de valeur émotionnelle. Nous pouvons configurer la sortie de Dify pour que le modèle génère, en plus du texte de réponse, une « valeur d'humeur » ou un tag émotionnel. Lorsque le frontend reçoit cet indicateur émotionnel, il peut afficher l'image du portrait correspondante. Quand la valeur d'humeur est élevée, le portrait paraît joyeux ; quand elle est basse ou en colère, le portrait paraît triste ou furieux. De cette façon, l'utilisateur ne voit plus une image figée, mais un véritable « portrait magique » dont les expressions changent au fil de la conversation.

![](/zh-cn/stage-2/frontend/hogwarts-portraits/images/image3.webp)

En outre, pour le contenu de ce portrait, il peut s'agir d'une star réelle, d'un personnage historique, d'un personnage d'anime, ou même d'un personnage original que vous créez de zéro. La page elle-même n'a pas besoin d'être complexe, mais quelques éléments essentiels sont indispensables : un nom de personnage clair, une brève biographie condensée, une image ou affiche représentative du personnage, et une zone interactive « Dialoguer avec lui/elle » ; vous pouvez connecter l'Agent AI ou le workflow configuré dans Dify / Trae à ce module de dialogue pour réaliser la fonction de jeu de rôle du portrait.

## 1.2 Collecter les informations sur le personnage

Prenons l'exemple d'Elon Musk : nous devons collecter ses déclarations publiques pour imiter sa façon de parler et les injecter dans le prompt. Ces documents peuvent provenir de discours, d'entretiens ou de publications sur les réseaux sociaux. Il vous suffit de convertir ce contenu en texte, pour l'utiliser comme référence few-shot pendant le dialogue, afin que le grand modèle réponde de la même manière décontractée et auto-dérisoire qu'Elon Musk, par exemple :

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

Pour collecter les connaissances de fond et les utiliser comme base de connaissances, vous pouvez rechercher sa présentation personnelle ainsi que celle de ses entreprises, copier l'ensemble du texte et l'ajouter comme contenu de la base de connaissances dans Dify. Si vous avez oublié comment utiliser Dify, retournez au support de cours précédent et réapprenez comment ajouter des connaissances à une base de connaissances.

De plus, pour la conception du portrait, utiliser des images publiques du personnage concerné peut ne pas être très attractif et présenter certains risques. Il est alors recommandé d'utiliser la fonction de génération d'images par image d'un outil de génération d'images, pour que l'IA produise un portrait en haute définition et de haute qualité. Vous pouvez également utiliser un outil de génération d'images pour créer une série d'images du portrait avec différentes expressions, qui serviront ensuite à modifier l'affichage du portrait en fonction des changements de la valeur émotionnelle.

Ce tutoriel utilise [Lovart](https://www.lovart.ai/home). Lovart est un agent de conception AI capable, via des instructions en langage naturel, de planifier et d'exécuter automatiquement un flux de travail de conception de bout en bout, du concept à la livraison, en générant des affiches, logos de marque, vidéos, musiques, etc., avec support de l'édition par calques (en interne, il utilise les modèles Seedream ou Google NanoBanana, que nous avons déjà mentionnés dans les cours précédents). Grâce à Lovart, nous pouvons obtenir une série d'images d'expressions. Vous pouvez récupérer à l'avance les images de votre personnage préféré et les conserver pour une utilisation ultérieure.

![](/zh-cn/stage-2/frontend/hogwarts-portraits/images/image4.webp)

Une fois tout prêt, nous pouvons commencer à travailler sur la conception globale de la page. Nous souhaitons que le style de cette page soit étroitement lié au personnage.

## 1.3 Conception du prototype de la page

Nous pouvons d'abord concevoir le prototype de la page. Comme mentionné précédemment, nous voulons une page de dialogue avec un portrait, ainsi qu'une présentation personnelle intéressante. Dans cet exemple, nous avons implémenté une interface de conversation similaire à X (Twitter) pour remplacer la présentation personnelle. Vous pouvez également imaginer d'autres éléments adaptés aux « caractéristiques du personnage » pour remplacer la section de présentation personnelle.

![](/zh-cn/stage-2/frontend/hogwarts-portraits/images/image5.webp)

Pour faire simple, nous pouvons utiliser PowerPoint pour concevoir le premier prototype de la page web. Nous trouvons une image de portrait magique sur Internet et définissons une disposition horizontale : la zone la plus à gauche est la zone de chat, le milieu est la zone du portrait, et la droite est la zone X (Twitter).

![](/zh-cn/stage-2/frontend/hogwarts-portraits/images/image6.webp)

À partir de ce prototype simple, nous pouvons demander au grand modèle de générer une véritable conception de page frontend et le code correspondant.

![](/zh-cn/stage-2/frontend/hogwarts-portraits/images/image7.webp)

Cependant, en pratique, nous n'utilisons généralement pas PowerPoint pour la conception de pages frontend. Nous utilisons de meilleurs outils de prototypage, ou outils de conception frontend, pour réaliser cela.

---

# 2. Utiliser Figma et MasterGo pour concevoir l'interface

::: tip Prérequis
Avant de commencer cette section, il est recommandé de suivre d'abord le tutoriel [Introduction à Figma et MasterGo](../figma-mastergo/) pour maîtriser les opérations de base des outils de conception frontend, notamment :
- Créer un fichier Design et un Frame (cadre)
- Utiliser l'Auto Layout pour réaliser une mise en page adaptative
- Les méthodes d'exportation de code depuis les maquettes
:::

Cette section suppose que vous maîtrisez déjà les opérations de base de Figma ou MasterGo. Nous nous concentrerons sur l'application de ces outils au projet Hogwarts Portraits.

## 2.1 Concevoir l'interface du portrait magique

En nous basant sur le prototype de la section 1.3, nous devons créer une interface en trois colonnes dans Figma ou MasterGo :

1. **Gauche** : Zone de dialogue (chat)
2. **Centre** : Zone d'affichage du portrait magique (change selon l'humeur)
3. **Droite** : Zone d'affichage du réseau social du personnage (ex. fil X/Twitter)

Vous pouvez utiliser la fonctionnalité AI de Figma (Figma Make) ou la fonction de génération de pages par AI de MasterGo, en saisissant un prompt similaire à celui-ci :

```
Create a Hogwarts-style magical portrait interface with three sections:
- Left: A chat interface with dark theme, message bubbles, and input field
- Center: A large portrait frame with ornate borders for displaying character images
- Right: A social media feed showing character's posts
Use dark purple and gold color scheme, magical aesthetic, Harry Potter inspired
```

## 2.2 Exporter le code et l'exécuter localement

Une fois la conception terminée, vous pouvez convertir la maquette en code exécutable de plusieurs façons :

**Méthode 1 : Utiliser Figma Make**
1. Cliquez sur le bouton Make dans Figma
2. Téléchargez votre image de référence de conception
3. Ajoutez un prompt décrivant vos besoins
4. Après la génération, cliquez sur l'icône de l'éditeur pour ajuster
5. Exportez le code localement ou synchronisez-le vers GitHub

**Méthode 2 : Utiliser MasterGo AI**
1. Dans l'interface d'édition de MasterGo, trouvez l'outil AI en haut
2. Sélectionnez la fonction « Générer une page »
3. Téléchargez une image de référence et décrivez vos besoins
4. Après la génération, cliquez sur « Aperçu du code » pour obtenir le code

**Méthode 3 : Utiliser une IA multimodale**
1. Enregistrez une capture d'écran de la maquette
2. Utilisez Gemini, Qwen ou d'autres modèles pour convertir l'image en code
3. Demandez la génération de code HTML ou React
4. Exécutez et déboguez dans votre IDE local

## 2.3 Préparer les images de variations d'humeur

Pour que le portrait magique « prenne vie », vous devez préparer un ensemble d'images d'expressions. Il est recommandé d'inclure au minimum les émotions suivantes :

| Valeur émotionnelle | Expression | Description |
|--------|------|------|
| 0 | Tristesse | Le personnage est triste ou découragé |
| 1 | Colère | Le personnage est en colère ou mécontent |
| 5 | Calme | État par défaut, émotion stable |
| 10 | Joie | Le personnage est heureux ou enthousiaste |

Vous pouvez utiliser Lovart ou d'autres outils de génération d'images par IA pour générer des variantes d'expressions du même personnage, en veillant à la cohérence du style.

---

# 3. Exécuter Hogwarts Portraits

## 3.1 Exporter le code de test

Grâce à la pratique du prototype au code, vous avez probablement obtenu du code prototype en HTML ou React. Il vous suffit de le copier en local, et d'indiquer dans votre IDE « Aidez-moi à exécuter ce code et à supporter les fonctionnalités nécessaires » pour lancer la première version de test. Notez toutefois que cette étape génère souvent pas mal d'erreurs ; vous devrez faire preuve de patience et corriger toutes les interactions de base et les appels de fonctionnalités.

![](/zh-cn/stage-2/frontend/hogwarts-portraits/images/image51.png)

Il est important de noter que nos clés doivent être placées dans des variables d'environnement et non écrites directement dans le code. Nous devons souligner que tout le contenu lié à l'API Dify doit être placé dans des variables d'environnement. Nous pourrons ensuite, lors de l'étape de déploiement sur le réseau public, spécifier explicitement les variables d'environnement privées correspondantes dans le site de l'outil de déploiement ; ou bien nous pouvons demander au grand modèle de créer un bouton de paramètres dans la page web, où nous pourrons saisir les variables d'environnement privées correspondantes, les variables actuelles ne pouvant être sauvegardées que dans la page actuelle et étant inaccessibles aux autres.

![](/zh-cn/stage-2/frontend/hogwarts-portraits/images/image52.webp)

## 3.2 Conception du workflow Dify et connexion à l'API

Dans les sections précédentes, nous n'avons réalisé que l'affichage visuel de l'interface frontend, sans encore connecter le flux d'interaction conversationnelle du personnage anthropomorphe. Cette étape est la clé pour transformer le prototype d'un affichage statique en un véritable portrait magique. Nous pouvons nous référer au workflow Dify du projet de démonstration pour la conception des réponses du personnage et du système émotionnel. Ici, la partie la plus à gauche est l'interface de chat, le milieu est le portrait magique (qui change d'expression en fonction du contenu de la conversation), et la droite est le compte du réseau social X (qui décide, en fonction du contenu de la conversation, s'il est nécessaire de publier des pensées sur le réseau social).

En général, le portrait magique n'a besoin que de l'interface de chat et du portrait qui change. Ici, pour montrer plus de possibilités, une nouvelle fonctionnalité adaptée au personnage a été ajoutée sur le côté droit. Vous pouvez ajouter, selon le personnage que vous incarnez, des fonctionnalités correspondantes pour la démonstration.

![](/zh-cn/stage-2/frontend/hogwarts-portraits/images/image53.png)

Vous pouvez ajouter toutes les informations de la tâche dans le nœud de la base de connaissances, et configurer la logique de réponse correspondante du grand modèle dans le nœud RESPONSE. Voici un exemple de prompt de logique de réponse par défaut :

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

Et le prompt correspondant au système émotionnel :

```
<instruction>
The output value must be a single number!
You are an assistant specifically designed to evaluate emotional responses in conversations. Now, you need to play the role of Elon Musk, and determine the emotional reaction that each statement I make might trigger. Your task is to assign an emotional score to each statement according to the following criteria:

- 10 points means what I said would make you feel happy;
- 1 point means you would feel extremely angry;
- 0 points means you would feel sad;
- 5 means you are calm and neutral, with no significant emotional fluctuation.
```

L'assemblage du résultat final est supporté dans le nœud RESULT en haut à droite :

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

Nous devons expliquer brièvement le workflow ici. Le retour `elon_chat` correspond au contenu de la conversation d'Elon Musk affiché à gauche, `elon_x` représente le contenu publié sur le compte X (à droite), et `elon_score` sert à afficher différentes images d'expressions du portrait magique en fonction du score émotionnel.

Dans le workflow, vous pouvez voir un nœud if/else, qui sert à déterminer s'il faut générer du contenu `elon_x` pour la conversation X. Si la valeur émotionnelle n'est pas égale à 5 (5 est défini ici comme l'état calme — pas besoin de publier sur le réseau social ; 0 signifie triste, 1 signifie en colère, 10 signifie très heureux — dans ces cas, il faut publier sur le réseau social), alors le contenu suivant est généré pour la publication d'article sur le réseau social. Par défaut, `elon_chat` doit toujours être retourné dans le contenu de la conversation à gauche.

Pour connecter cette API, nous pouvons réaliser cela en dialoguant avec l'IDE AI. Veuillez vous référer à la méthode d'intégration présentée dans le cours Dify précédent, en n'oubliant pas de remplacer au préalable l'adresse Dify et la clé. (Si vous avez oublié comment intégrer l'API depuis la documentation, réviser le contenu du cours Dify précédent.)

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

Il est également recommandé d'ajouter cette exigence : « Le code doit également inclure une logique de gestion des erreurs de base, comme afficher "Connexion échouée, veuillez réessayer" en cas d'interruption réseau, une tentative de reconnexion automatique après un délai d'attente de l'API, un message d'erreur d'autorisation en cas de clé incorrecte, etc., pour garantir la stabilité de la conversation et permettre aux développeurs d'identifier rapidement les problèmes liés à l'API. »

## 3.3 GitHub et déploiement public

Félicitations, vous avez terminé le développement de la page Hogwarts Portraits ! Ensuite, nous devons la télécharger sur la plateforme GitHub et la déployer dans un environnement public pour que tout le monde puisse y accéder.

Vous devez vous référer à ce tutoriel pour apprendre à utiliser GitHub et télécharger votre projet : [Qu'est-ce que GitHub](/fr-fr/stage-2/backend/git-workflow/)

Vous devez également apprendre à utiliser Zeabur, le connecter à GitHub et déployer votre projet avec succès : [Qu'est-ce que Zeabur](/fr-fr/stage-2/backend/zeabur-deployment/)

Si vous trouvez trop difficile de développer un projet Hogwarts Portraits vous-même, vous pouvez commencer par modifier un projet existant. L'adresse du code officiel de ce cours est : https://github.com/THU-SIGS-AIID/Project4-Hogwarts-Portraits

![](/zh-cn/stage-2/frontend/hogwarts-portraits/images/image54.webp)

# 4. Explorer différents styles de conception

Après avoir terminé la première version, ne vous limitez pas à celle-ci. Nous vous encourageons à explorer rapidement des styles visuels plus diversifiés. Vous pouvez apporter des modifications audacieuses au prototype, ou modifier les prompts du projet final pour générer plusieurs pages aux styles très différents. Par exemple : une page sombre avec des textures rétro, de style « vieux livres / académique » ; une page lumineuse aux couleurs vives, avec une ambiance « conte de fées / cartoon » ; ou encore un design plat moderne, minimaliste et visuellement épuré. Par exemple, l'image ci-dessous montre un cas de conversion en style de poète ancien chinois, où seule la partie non-portrait a été modifiée, sans changer les images du portrait :

![](/zh-cn/stage-2/frontend/hogwarts-portraits/images/image55.webp)

Ne vous limitez pas aux modèles mentionnés précédemment. Vous pouvez modifier le portrait magique ou la page de profil pour qu'il soit plus original et corresponde mieux aux habitudes du « portrait magique » lui-même, ce qui rendra votre application plus intéressante. Nous attendons vos créations de portraits magiques avec impatience !

# Assignment

L'objectif du devoir de ce cours est de vous amener à réaliser votre propre Hogwarts Portraits, accessible via un lien public.

Vous devez fournir deux éléments dans votre soumission :

1. **Le lien vers votre dépôt GitHub ;**
   1. **Dans le README.md, écrivez une ou deux phrases de présentation : quel personnage avez-vous choisi comme sujet du portrait et pourquoi.**
2. **Le lien d'accès en ligne de votre Hogwarts Portraits ;**

Vous pouvez également consulter le tutoriel de Yerim sur la [création de pages web avec des agents de conception et de code](/fr-fr/stage-1/appendix-articles/example0-2/vibe-coding-tools-build-website-with-ai-coding-and-design-agents) pour réaliser rapidement un portfolio personnel ou une page web simple avec n'importe quelle fonctionnalité.
