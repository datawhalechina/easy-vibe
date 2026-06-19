---
title: 'Ajouter des capacités IA à votre prototype - Intégrer les API de texte et d''image'
description: 'Intégrez de véritables capacités IA dans un prototype Web existant : comprenez les concepts clés des API, apprenez à trouver votre API Key et les exemples officiels ; pratiquez l''intégration du modèle de texte DeepSeek et de plusieurs services de génération d''images (SiliconFlow Qwen-Image, Recraft, Seedream), et maîtrisez les méthodes courantes de sélection de modèles.'
---

<script setup>
import { relatedArticlesMap } from '@theme/data/relatedArticles'

const duration = 'environ <strong>1 jour</strong>'
const relatedArticles =
  relatedArticlesMap['fr-fr/stage-1/integrating-ai-capabilities'] ?? []
</script>

# Module 4 : Injecter des capacités IA dans votre prototype

## Introduction au chapitre

<ChapterIntroduction :duration="duration" :tags="['API', 'Modèle de texte', 'Texte vers image', 'Intégration de prototype']" coreOutput="Prototype connecté à 1 modèle de texte + 1 modèle d'image (optionnel)" expectedOutput="Prototype IA capable d'appeler de vraies API">

Dans les chapitres précédents, nous avons terminé le processus complet, de <strong>trouver une bonne idée</strong> à <strong>créer un prototype de produit</strong>. Mais le prototype actuel n'est qu'une « coquille » -- cliquer sur un bouton ne génère pas vraiment de contenu, et les données de la page sont figées.

Vous rappelez-vous ce que nous avons souligné dans le premier chapitre ? <strong>Nous voulons créer « un produit que les gens paient », pas « un prototype qui a l'air correct ».</strong> La véritable valeur vient de la capacité du produit à <strong>résoudre de vrais problèmes</strong>, et pour cela, le prototype doit <strong>réellement fonctionner</strong>.

Ce chapitre va <strong>« donner vie » au prototype</strong> : nous allons intégrer de <strong>véritables capacités IA</strong>, de l'obtention d'une API Key à la lecture de la documentation officielle, en passant par la demande à l'AI IDE d'intégrer les API dans votre code. Vous prendrez le <strong>modèle de texte DeepSeek</strong> comme exemple pour apprendre à faire en sorte que votre application <strong>appelle réellement un grand modèle pour générer du contenu</strong> ; si vous êtes intéressé, vous pouvez aussi <strong>intégrer la génération d'images en option</strong>.

À la fin de ce chapitre, votre prototype ne sera <strong>plus une démonstration statique</strong>, mais <strong>une application capable d'appeler de vraies capacités IA et de résoudre de vrais problèmes</strong>.

</ChapterIntroduction>

<div style="margin: 50px 0;">
  <ClientOnly>
    <StepBar :active="0" :items="[
      { title: 'Bases de l\'API', description: 'Comprendre les concepts clés et les règles de sécurité' },
      { title: 'Intégration texte', description: 'Pratique de génération de texte avec DeepSeek' },
      { title: 'Intégration image', description: 'Compréhension et génération d\'images VLM' }
    ]" />
  </ClientOnly>
</div>

# 1. Concepts de base des API

Comme mentionné précédemment, notre objectif est « d'intégrer les capacités IA », pour que le prototype ne soit plus une démonstration statique, mais un outil capable d'appeler de vrais services IA. Pour réaliser cela, la clé est de comprendre et d'utiliser les API (Application Programming Interface).

L'API est un concept d'abstraction important en informatique, que l'on peut comprendre simplement comme : **vous envoyez une « question » dans le format requis, et l'autre partie vous renvoie un « résultat » dans le même format**.

- **Ce que vous envoyez** : généralement inclut la « clé (API Key) » et « ce que vous voulez générer »
- **Ce que vous recevez en retour** : en cas de succès, le résultat ; en cas d'échec, la raison (par exemple « clé incorrecte », « solde insuffisant », « paramètre erroné »)

Concrètement, vous devez maîtriser les éléments clés suivants :

1. **API Key** : votre « passe », aussi votre « clé de portefeuille ». Si quelqu'un d'autre l'obtient, il peut utiliser l'API en votre nom et engendrer des frais.
2. **Endpoint (chemin de l'interface)** : le chemin spécifique de la requête API, indiquant au serveur quelle fonctionnalité vous souhaitez accéder. L'adresse complète se compose généralement du « URL de base + chemin de l'endpoint ». Par exemple :
   - Génération de texte : URL de base (`https://api.service.com`) + Endpoint (`/v1/chat/completions`) = URL complète `https://api.service.com/v1/chat/completions`
   - Génération d'images : URL de base (`https://api.service.com`) + Endpoint (`/v1/images/generations`) = URL complète `https://api.service.com/v1/images/generations`
3. **Appel/Requête** : le processus d'envoi d'une tâche au service IA et d'obtention du résultat
4. **Contenu de la requête** : ce que vous envoyez à l'IA, comme le sujet de l'article que vous voulez générer ou la description de l'image
5. **Réponse** : ce que l'IA vous renvoie après traitement, comme l'article généré ou l'image
6. **Gestion des erreurs** : savoir comment diagnostiquer et résoudre les problèmes (API Key incorrecte, requêtes trop fréquentes, etc.)

::: info ℹ️ Qu'est-ce qu'une API
Pour une explication plus approfondie des API, consultez l'annexe : [Introduction aux API](/zh-cn/appendix/4-server-and-backend/api-intro).

::: warning 🔐 **Consignes de sécurité des API**
L'API Key est votre « passe » pour accéder aux services IA. C'est une chaîne de caractères de type mot de passe, utilisée pour l'authentification et la facturation.

Puisque l'API Key est directement liée à votre compte et à vos frais, veillez à :

- Ne <strong>jamais la partager</strong> dans des chats, des captures d'écran publiées en ligne ou des forums publics
- <strong>Ne pas la coder en dur</strong> dans le code et la committer dans un dépôt Git (surtout un dépôt public)
- Si vous soupçonnez que la Key a été compromise, <strong>changez-la immédiatement</strong>

Dans ce qui suit, nous <strong>allons directement coller l'API KEY dans l'AI IDE pour les opérations</strong>. <strong>Ne faites pas ça dans un vrai projet !!</strong> Comme nous sommes en phase d'apprentissage, c'est acceptable. (Quand vous serez plus expérimenté, vous pourrez demander à l'IA de générer un fichier de configuration dans lequel vous placerez simplement l'API KEY)
:::

<div style="margin: 50px 0;">
  <ClientOnly>
    <StepBar :active="1" :items="[
      { title: 'Bases de l\'API', description: 'Comprendre les concepts clés et les règles de sécurité' },
      { title: 'Intégration texte', description: 'Pratique de génération de texte avec DeepSeek' },
      { title: 'Intégration image', description: 'Compréhension et génération d\'images VLM' }
    ]" />
  </ClientOnly>
</div>

# 2. Intégrer l'API de génération de texte : DeepSeek

Bien que les API impliquent des concepts techniques, la phase de développement de prototype peut être très simple et efficace. L'idée centrale est :

> **Trouver l'exemple officiel, obtenir l'API Key, demander à l'AI IDE de l'intégrer à votre bouton.**

Une fois ces concepts maîtrisés, vous découvrirez que le processus est le même pour l'intégration de modèles de texte ou d'images : quand l'utilisateur clique sur un bouton, le frontend organise l'entrée et envoie la requête ; quand l'interface renvoie le résultat, il l'affiche sur la page. Voyons cela en pratique.

Dans la section 1.2, vous avez déjà créé un prototype interactif. Ce que nous allons faire maintenant, c'est transformer les « fonctionnalités qui ressemblent à de l'IA » en véritables capacités : <strong>quand l'utilisateur clique sur un bouton, le prototype envoie une requête à un service IA externe et affiche le texte renvoyé.</strong>

::: info ℹ️ Pour aller plus loin sur les principes
Si vous voulez en savoir plus sur les principes, consultez l'annexe : [Introduction aux grands modèles de langage (LLM)](/zh-cn/appendix/8-artificial-intelligence/llm-principles).
::: details Pour en savoir plus : Qu'est-ce que DeepSeek ?

**Hangzhou DeepSeek Artificial Intelligence Basic Technology Research Co., Ltd.**, commercialisée sous le nom de DeepSeek, est une <strong>entreprise chinoise d'intelligence artificielle (IA) qui développe des grands modèles de langage (LLM)</strong>. DeepSeek est basée à Hangzhou, dans la province du Zhejiang, et est détenue et financée par le fonds quantitatif chinois High-Flyer. DeepSeek a été fondée en juillet 2023 par Liang Wenfeng, cofondateur de High-Flyer, qui est également PDG des deux entreprises. L'entreprise a lancé son chatbot éponyme et son modèle DeepSeek-R1 en janvier 2025.

Regardons les performances de DeepSeek dans le classement GPQA par rapport à d'autres modèles de premier plan. Il est à noter que DeepSeek est un modèle open source (tout le monde peut télécharger le modèle depuis Internet), alors que d'autres modèles courants comme Grok, Google Gemini et ChatGPT sont propriétaires. Comme on peut le voir, DeepSeek s'est considérablement rapproché des modèles de premier rang.

![](../../../zh-cn/stage-1/integrating-ai-capabilities/images/index-2026-01-20-14-16-48.png)

GPQA signifie « Graduate-Level Google-Proof Question Answering benchmark », un benchmark de niveau graduate pour les tâches de Q&R scientifiques.

GPQA contient 448 questions à choix multiples couvrant les sous-domaines de la biologie, de la physique et de la chimie, tels que la mécanique quantique, la chimie organique, la biologie moléculaire, etc. Ces questions ont été rédigées par 61 experts titulaires d'un doctorat ou en cours de doctorat, et ont fait l'objet d'un processus de validation rigoureux.
:::

Suivez ces 3 étapes pour réaliser une intégration rapide de l'API de génération de texte :

1. **Créer une API Key sur la plateforme DeepSeek**
2. **Trouver un exemple de génération de texte dans la documentation DeepSeek** (il y a généralement du code prêt à copier)
3. **Ouvrir l'AI IDE, coller l'API Key + l'exemple officiel**, et dire à l'IA ce que vous voulez accomplir :
   > Aide-moi à intégrer l'API de ce grand modèle de langage pour prendre en charge la fonction de génération de textes publicitaires de cette application

Ensuite, nous allons faire une démonstration que vous pouvez suivre. Tout d'abord, inscrivez-vous sur [DeepSeek](https://platform.deepseek.com/usage) et créez une API Key, puis rechargez un petit montant pour vérifier.

![](../../../zh-cn/stage-1/integrating-ai-capabilities/images/index-2026-01-20-13-57-41.png)

![](../../../zh-cn/stage-1/integrating-ai-capabilities/images/index-2026-01-20-13-58-13.png)

Cliquez sur « API KEYS » et trouvez « create new API key » en bas de l'écran. Vous obtiendrez finalement une clé API comme sk-8573341c39fc44315aadc071c53rh7d2.

![](../../../zh-cn/stage-1/integrating-ai-capabilities/images/index-2026-01-20-13-58-32.png)

Une fois que vous avez la clé, vous avez l'autorisation d'appeler le modèle.

À ce stade, vous pouvez directement lire la documentation [API](https://api-docs.deepseek.com/), qui fournit généralement des exemples d'appel en curl ou Python.

![](../../../zh-cn/stage-1/integrating-ai-capabilities/images/index-2026-01-20-13-58-56.png)

Après avoir trouvé l'exemple, vous pouvez copier tout le contenu de la documentation et votre clé dans la boîte de dialogue de l'AI IDE, et lui demander de vous aider à intégrer le grand modèle de langage dans le prototype déjà développé.

![](../../../zh-cn/stage-1/integrating-ai-capabilities/images/index-2026-01-20-13-59-31.png)

Référence de prompt à utiliser :

```
En te référant à cette méthode d'appel, aide-moi à prendre en charge la fonction de génération de textes publicitaires, qui peut générer des textes publicitaires pour le commerce électronique de Douyin en plusieurs styles sur la base des informations produit.

Matériel de référence :
clé API : sk-8573341c39aefa1efe
Référence de requête API :
curl  \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer ${DEEPSEEK_API_KEY}" \
  -d '{
        "model": "deepseek-chat",
        "messages": [
          {"role": "system", "content": "You are a helpful assistant."},
          {"role": "user", "content": "Hello!"}
        ],
        "stream": false
      }'
```

Après un certain temps de génération de code par l'IA, nous pouvons facilement obtenir le bouton de génération de texte publicitaire correspondant pour le tester. Si vous ne trouvez pas l'entrée, vous pouvez demander à l'AI IDE de vous indiquer depuis quelle page vous pouvez accéder à cette page. Si vous ne trouvez vraiment pas, vous pouvez demander à l'AI IDE de reconstruire et d'améliorer directement votre idée.

![](../../../zh-cn/stage-1/integrating-ai-capabilities/images/index-2026-01-20-14-23-23.png)

![](../../../zh-cn/stage-1/integrating-ai-capabilities/images/index-2026-01-20-14-26-35.png)

Bien sûr, vous pourriez vous demander : comment savoir si le grand modèle a vraiment été appelé et qu'il ne s'agit pas simplement d'une réponse figée intégrée ? Vous pouvez saisir du texte personnalisé et demander au modèle de générer le texte publicitaire correspondant en fonction de votre demande personnalisée.

Si vous constatez que les résultats sont différents à chaque fois et logiques, vous pouvez être sûr que l'API est appelée normalement. Vous pouvez aussi vérifier sur la [plateforme de gestion d'utilisation de l'API](https://platform.deepseek.com/usage) si l'appel a réussi (bien qu'il puisse falloir attendre quelques minutes pour voir les résultats).

## Autres modèles de génération de texte

En plus de DeepSeek, vous pouvez aussi essayer d'autres grands modèles de langage. Comme la plupart des modèles fournissent une **interface compatible OpenAI**, le changement est très simple -- il suffit de modifier l'API Key, l'URL de base et le nom du modèle.

### Intégration MiniMax

::: details Pour en savoir plus : Qu'est-ce que MiniMax ?

**MiniMax** est une entreprise chinoise d'intelligence artificielle dédiée à la recherche et au développement de technologies d'intelligence artificielle générale. MiniMax a successivement lancé les séries de modèles de langage MiniMax-M3 et MiniMax-M2.7, qui affichent d'excellentes performances dans de nombreux benchmarks, avec un rapport qualité-prix exceptionnel.

**Principales caractéristiques de la série MiniMax :**

- **Contexte ultra-long** : M3 prend en charge une fenêtre de contexte allant jusqu'à 512K tokens (M2.7 en gère 204 800), adaptée au traitement de documents longs et de dialogues multi-tours
- **Rapport qualité-prix élevé** : prix très compétitif
- **Interface compatible OpenAI** : peut être appelée directement avec le SDK OpenAI, sans apprentissage supplémentaire
- **Modèles disponibles** :
  - `MiniMax-M3` : nouveau modèle phare, contexte de 512K, sortie maximale de 128K, prend en charge l'entrée d'image
  - `MiniMax-M2.7` : modèle phare précédent, toujours disponible
  - `MiniMax-M2.7-highspeed` : version haute vitesse, mêmes performances mais plus rapide
:::

La méthode d'intégration est identique à DeepSeek, en 3 étapes :

1. Allez sur la [plateforme ouverte MiniMax](https://platform.minimax.io/) et créez un compte et une API Key
2. Trouvez un exemple d'appel dans la documentation MiniMax
3. Collez l'API Key + l'exemple dans l'AI IDE

Comme MiniMax fournit une interface compatible OpenAI, vous pouvez directement copier l'exemple curl ci-dessous et votre clé API, et les envoyer à l'AI IDE pour l'intégration :

```bash
curl https://api.minimax.io/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer ${MINIMAX_API_KEY}" \
  -d '{
        "model": "MiniMax-M3",
        "messages": [
          {"role": "system", "content": "You are a helpful assistant."},
          {"role": "user", "content": "Hello!"}
        ],
        "stream": false
      }'
```

::: tip ✅ Conseil
Le format d'API de MiniMax est presque identique à celui de DeepSeek (tous deux utilisent le format compatible OpenAI), donc si vous avez déjà réussi à intégrer DeepSeek, passer à MiniMax ne nécessite de modifier que trois choses :
1. **URL de base** : changez en `https://api.minimax.io/v1`
2. **API Key** : utilisez l'API Key de MiniMax
3. **Nom du modèle** : changez en `MiniMax-M3` (nouveau modèle phare), `MiniMax-M2.7` ou `MiniMax-M2.7-highspeed`

Pour plus d'informations, consultez la [documentation de l'interface compatible OpenAI de MiniMax](https://platform.minimax.io/docs/api-reference/text-openai-api).
:::

# 3. Intégrer l'API de conversion image-texte : Qwen3 VL

::: info ℹ️ Pour aller plus loin sur les principes
Si vous voulez en savoir plus sur les principes, consultez l'annexe : [Introduction aux modèles de langage visuel (VLM)](/zh-cn/appendix/8-artificial-intelligence/multimodal-models).

::: details Pour en savoir plus : Qu'est-ce que Qwen3 VL ?

**Qwen3 VL** est la dernière version de la série de modèles de langage visuel multimodal développée par l'équipe Tongyi Qianwen d'Alibaba Cloud. VL signifie « Vision-Language », c'est-à-dire un modèle de langage visuel. Il est capable de comprendre le contenu des images et de générer des descriptions textuelles, de répondre à des questions sur les images et d'extraire des informations des images.

![](../../../zh-cn/stage-1/integrating-ai-capabilities/images/index-2026-01-20-14-48-27.png)
![](../../../zh-cn/stage-1/integrating-ai-capabilities/images/index-2026-01-20-14-48-41.png)

**Principales capacités de Qwen3 VL :**

- **Compréhension d'images** : capable d'identifier les objets, scènes, personnages et textes dans les images
- **Questions-réponses visuelles** : répondre avec précision aux questions sur les images
- **Description d'images** : générer des descriptions textuelles détaillées ou concises
- **Compréhension multi-images** : prendre en charge le traitement simultané de plusieurs images pour une analyse comparative
- **Extraction de texte** : extraire du contenu textuel des images (capacité OCR)

**Pourquoi choisir Qwen3 VL ?**

Par rapport au modèle de génération précédent, Qwen3 VL a significativement amélioré la précision de la compréhension d'images, prenant en charge des tâches d'analyse d'images plus longues et plus complexes. Il excelle dans la compréhension du chinois, avec un coût d'appel API relativement faible et un excellent rapport qualité-prix. De plus, sa fenêtre de contexte est plus grande, ce qui lui permet de gérer des tâches de raisonnement visuel plus complexes.

**Scénarios d'application typiques :**

- Commerce électronique : génération automatique de titres, descriptions et points forts à partir de photos de produits
- Création de contenu : génération automatique de textes publicitaires ou de suggestions d'images à partir de visuels
- Bureau : extraction du contenu d'images, reconnaissance automatique de rapports
- Éducation : analyse automatique de questions illustrées, extraction de points de connaissance

:::

Dans la partie précédente, nous avons expliqué comment intégrer l'API de génération de texte. Mais pour le scénario de notre application, nous constatons un problème : nous téléchargeons une image, et si nous n'utilisons qu'un modèle de langage, il ne peut pas bien comprendre le contenu de l'image, ce qui peut entraîner des résultats imprécis.

Nous voulons un modèle capable de transformer une image en description textuelle, ce qui nécessite un modèle de langage visuel (VLM). Dans notre cas, nous utiliserons un modèle VLM pour générer des descriptions de points de vente de produits afin d'améliorer l'expérience utilisateur.

Pour plus de simplicité, nous utiliserons l'API fournie par la plateforme cloud [SiliconFlow](https://cloud.siliconflow.cn/me) pour l'intégration de l'API de conversion image-texte.

::: details Pour en savoir plus : Qu'est-ce que SiliconFlow ?
**SiliconFlow** est une plateforme chinoise bien connue d'agrégation de modèles IA, offrant des services d'API pour de nombreux modèles de langage et de vision grand public et open source.

**Caractéristiques de la plateforme :**

- **Support multi-modèles** : intègre de nombreux modèles IA populaires, notamment DeepSeek, Qwen, Llama et d'autres modèles open source
- **Optimisation technique** : optimisation d'inférence pour les modèles open source, offrant des services API à faible latence et haute concurrence
- **Compatibilité d'interface** : fournit des API compatibles avec le format OpenAI pour une intégration facile
- **Paiement à l'usage** : facturation à l'utilisation

SiliconFlow est relativement mature dans les services d'inférence de modèles open source et constitue un choix courant pour l'utilisation de modèles IA open source chinois.
:::

Sur la page d'accueil de SiliconFlow, vous pouvez voir qu'il y a beaucoup de modèles disponibles. Trouvez le filtre dans le coin supérieur gauche, cliquez pour l'ouvrir, sélectionnez le tag « vision », et vous verrez plusieurs modèles de conversion image-texte, comme GLM-4.6V de Zhipu ou Qwen3-VL.

![](../../../zh-cn/stage-1/integrating-ai-capabilities/images/index-2026-01-20-15-05-04.png)

Vous pouvez choisir n'importe lequel pour tester, ici nous prenons `Qwen/Qwen3-VL-8B-Instruct` comme exemple.

![](../../../zh-cn/stage-1/integrating-ai-capabilities/images/index-2026-01-20-15-07-44.png)

Accédez à la [plateforme SiliconFlow](https://cloud.siliconflow.cn/me/account/ak), cliquez sur « Nouvelle clé API » dans la section des clés API, et créez une nouvelle clé API.

Vous pouvez utiliser directement le code ci-dessous comme référence et l'envoyer à l'AI IDE avec votre clé API générée pour l'intégration fonctionnelle.

::: details Code de référence pour la conversion image-texte

```python
from openai import OpenAI
from typing import Dict, Any, List
import base64
import os
SILICONFLOW_API_KEY: str = ""
SILICONFLOW_BASE_URL: str = "https://api.siliconflow.cn/v1/"
MODEL_NAME: str = "Qwen/Qwen3-VL-8B-Instruct"

def encode_image(image_path: str) -> str:
    with open(image_path, "rb") as image_file:
        return base64.b64encode(image_file.read()).decode('utf-8')

def get_vlm_completion(client: OpenAI, messages: List[Dict[str, Any]]) -> str:
    response = client.chat.completions.create(
        model=MODEL_NAME,
        messages=messages,
        max_tokens=512,
        temperature=0.7,
        top_p=0.7,
        frequency_penalty=0.5,
        stream=False,
        n=1
    )
    return response.choices[0].message.content

def caption_image(image_path: str) -> str:
    base64_image = encode_image(image_path)
    messages = [
        {
            "role": "user",
            "content": [
                {
                    "type": "text",
                    "text": "Please describe this image in detail."
                },
                {
                    "type": "image_url",
                    "image_url": {
                        "url": f"data:image/jpeg;base64,{base64_image}"
                    }
                }
            ]
        }
    ]

    client = OpenAI(
        api_key=SILICONFLOW_API_KEY,
        base_url=SILICONFLOW_BASE_URL
    )

    return get_vlm_completion(client, messages)

image_path = "images.jpg"
caption = caption_image(image_path)
```

:::

Dans ce scénario, nous allons directement demander à l'AI IDE de nous aider à implémenter la fonction de génération automatique de texte de points de vente et de mots-clés à partir des images téléchargées, comme suit :

```
Sur la base de l'API de conversion image-texte ci-dessous, aide-moi à implémenter la fonction de génération automatique de texte de points de vente et de mots-clés à partir des images téléchargées.

<Collez ici le code de référence et la clé>
```

Résultat final :
![](../../../zh-cn/stage-1/integrating-ai-capabilities/images/index-2026-01-20-15-34-36.png)

![](../../../zh-cn/stage-1/integrating-ai-capabilities/images/index-2026-01-20-15-35-41.png)

<div style="margin: 50px 0;">
  <ClientOnly>
    <StepBar :active="2" :items="[
      { title: 'Bases de l\'API', description: 'Comprendre les concepts clés et les règles de sécurité' },
      { title: 'Intégration texte', description: 'Pratique de génération de texte avec DeepSeek' },
      { title: 'Intégration image', description: 'Compréhension et génération d\'images VLM' }
    ]" />
  </ClientOnly>
</div>

# 4. Intégrer l'API de génération d'images : Seedream Jimeng

Dans les parties précédentes, nous avons principalement traité des tâches liées au texte. Nous allons maintenant essayer d'intégrer la génération d'images, en prenant en charge la génération d'images à partir de descriptions textuelles ou la modification d'images.

::: info ℹ️ Pour aller plus loin sur les principes
Si vous voulez en savoir plus sur les principes, consultez l'annexe : [Introduction à la génération d'images](/zh-cn/appendix/8-artificial-intelligence/image-generation).

::: details Pour en savoir plus : Qu'est-ce que [Seedream Jimeng](https://seed.bytedance.com/en/seedream4_5) ?

![](../../../zh-cn/stage-1/integrating-ai-capabilities/images/index-2026-01-20-23-15-17.png)

> Vous connaissez peut-être déjà Nano Banana (développé par Google), mais vous ne devriez pas manquer Seedream. Seedream 4.5 est le nouveau modèle de création d'images de ByteDance. Il intègre la génération et l'édition d'images dans une architecture unifiée, ce qui lui permet de gérer de manière flexible des tâches multimodales complexes comme la génération basée sur la connaissance, le raisonnement complexe et la cohérence de référence. De plus, sa vitesse d'inférence est bien supérieure à celle de la génération précédente, et il peut générer des images haute définition jusqu'à 4K.
>
> ![](../../../zh-cn/stage-1/integrating-ai-capabilities/images/index-2026-01-20-23-15-38.png)
> ![](../../../zh-cn/stage-1/integrating-ai-capabilities/images/index-2026-01-20-23-15-50.png)

**Principales capacités :**

- **Texte vers image** : générer des images à partir de descriptions textuelles, prenant en charge plusieurs styles (réaliste, cartoon, encre, cyberpunk, etc.)
- **Transfert de style** : convertir une image dans un style artistique spécifié
- **Variantes d'images** : générer de nouvelles images de style similaire à partir d'une image de référence
- **Amélioration de la résolution** : augmenter la clarté et les détails des images
- **Édition d'images** : modifier et retoucher des images existantes via des instructions en langage naturel

**Pourquoi choisir Seedream ?**

- **Accès stable depuis la Chine** : vitesse d'accès rapide et latence faible
- **Excellents résultats** : performances stables et fiables dans les scénarios de commerce électronique et de création de visuels
- **Optimisé pour le chinois** : meilleure compréhension des prompts en chinois, adapté aux utilisateurs chinois
- **Rapidité** : efficacité de génération élevée, temps de réponse court
- **Qualité stable** : génération d'images haute définition jusqu'à 4K

**Scénarios d'application typiques :**

- Commerce électronique : génération d'images principales, de visuels pour les pages de détails, de posters promotionnels
- Réseaux sociaux : génération d'avatars, de stickers, d'images d'accompagnement
- Design : création rapide de concepts, de visuels, d'images d'arrière-plan
- Marketing : création de publicités, de bannières d'événements, de posters de fêtes

**Complémentarité avec Qwen3 VL :**

Ces deux API peuvent être utilisées en chaîne : d'abord utilisez Qwen3 VL pour analyser l'image de référence et comprendre le contenu visuel, puis utilisez Seedream pour générer une nouvelle image basée sur le prompt dérivé de l'analyse de l'image de référence.
:::

Beaucoup de « posters IA / images principales IA / images de personnages IA » que vous voyez sur Douyin, Bilibili ou YouTube utilisent essentiellement la technologie présentée ici. Ce que vous devez faire est simple : organiser l'entrée de l'utilisateur en une phrase, envoyer une requête à l'API d'image, puis afficher l'image renvoyée. Le modèle utilisé ici s'appelle un modèle de génération d'images / d'édition d'images.

Nous allons démontrer progressivement comment intégrer l'API Seedream dans votre projet (avec l'aide de l'AI IDE).

[Accédez à la page d'accueil](https://www.volcengine.com/experience/ark?launch=seedream) puis cliquez sur connexion.

![](../../../zh-cn/stage-1/integrating-ai-capabilities/images/index-2026-01-20-23-12-07.png)

Après connexion, trouvez l'option de recharge dans le coin supérieur droit.

![](../../../zh-cn/stage-1/integrating-ai-capabilities/images/index-2026-01-20-23-12-22.png)

La recharge nécessite une vérification d'identité.

![](../../../zh-cn/stage-1/integrating-ai-capabilities/images/index-2026-01-20-23-12-30.png)

Une fois la vérification réussie, vous pouvez [recharger 1 yuan pour tester](https://console.volcengine.com/finance/fund/recharge).

Retournez à la [page initiale](https://www.volcengine.com/experience/ark?launch=seedream) et cliquez sur Accès API.

![](../../../zh-cn/stage-1/integrating-ai-capabilities/images/index-2026-01-20-23-12-43.png)

Créez d'abord une clé API, puis cliquez sur les options de sélection.

![](../../../zh-cn/stage-1/integrating-ai-capabilities/images/index-2026-01-20-23-13-01.png)

Cela vous amènera à l'étape 2. Ici, vous devez confirmer que le service appelé est Seedream 4.5 et copier l'exemple d'appel fourni. (Les captures d'écran ici datent d'une période antérieure, la version du modèle affichée est donc encore la 4.0)

![](../../../zh-cn/stage-1/integrating-ai-capabilities/images/index-2026-01-20-23-13-11.png)

Une fois que vous avez la clé API et l'exemple d'appel, vous pouvez les coller directement dans l'AI IDE pour qu'il génère la démo frontend ou intègre la capacité dans votre prototype existant. Notez que dans l'image, vous pouvez choisir entre le mode texte-vers-image ou la génération d'une image à partir de plusieurs images. Vous devez sélectionner le code de référence en fonction de vos besoins actuels.

::: warning ⚠️ Remarque importante
L'exemple par défaut est relativement complexe. N'oubliez pas de désactiver **« Ajouter un filigrane »** et **« Réponse en flux continu »** pour éviter de générer un filigrane et de provoquer des échecs de requête.
:::

Comme nous utilisons ensuite le mode de génération à partir d'images de référence, nous allons d'abord vers la fonctionnalité de génération d'une image à partir de plusieurs images. Le code de référence est le suivant :

```
curl -X POST https://ark.cn-beijing.volces.com/api/v3/images/generations \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer xxxxxxx" \
  -d '{
    "model": "doubao-seedream-4-5-251128",
    "prompt": "Remplacer la tenue de l'image 1 par celle de l'image 2",
    "image": ["https://ark-project.tos-cn-beijing.volces.com/doc_image/seedream4_imagesToimage_1.png", "https://ark-project.tos-cn-beijing.volces.com/doc_image/seedream4_imagesToimage_2.png"],
    "sequential_image_generation": "disabled",
    "response_format": "url",
    "size": "2K",
    "stream": false,
    "watermark": true
  }'
```

Avec le code de référence d'image, nous demandons à l'AI IDE de prendre en charge les tâches d'image courantes dans le commerce électronique :

```
Sur la base de l'API ci-dessous, aide-moi à implémenter les fonctionnalités courantes du commerce électronique dans ce projet (par exemple, la génération de posters, la génération d'images principales pour Douyin, etc.)

<Collez ici la clé API et le code d'édition d'image>
```

Résultat de l'implémentation :

![](../../../zh-cn/stage-1/integrating-ai-capabilities/images/index-2026-01-20-23-21-13.png)

Il est à noter que la génération d'images peut rencontrer des problèmes inhabituels. Il est recommandé de demander à l'AI IDE d'afficher les messages d'erreur complets pour faciliter le copier-coller et la modification (sinon, vous risquez de voir s'afficher « échec de la génération » à répétition sans savoir pourquoi). Par exemple, vous pouvez dire :

```
N'affiche pas seulement « échec de la génération d'image », affiche systématiquement la raison complète de l'échec, comme une incompatibilité d'image, une erreur de requête, un délai d'attente, etc. !
```

Parfois, après une modification, la mise à jour n'est pas appliquée à la page web. Si vous constatez que la page continue de générer des erreurs après plusieurs modifications, vous pouvez aussi essayer de dire directement à l'AI IDE : redémarre ce projet.

Dans le contexte du commerce électronique, nous pourrions vouloir que les vêtements téléchargés par l'utilisateur s'habillent automatiquement sur un personnage, ou que des images de vente attrayantes et des posters soient générés automatiquement pour les produits. Ici, le prompt que nous avons essayé consistait à lui faire générer un poster pour le commerce électronique :

![](../../../zh-cn/stage-1/integrating-ai-capabilities/images/index-2026-01-20-23-14-10.png)

Vous pouvez utiliser l'API texte-vers-image ou image-vers-image pour implémenter différentes fonctionnalités en fonction de vos scénarios métier imaginés.

## Autres services de génération d'images

Voici d'autres options. Il est recommandé de d'abord réussir l'intégration avec Qwen, puis de remplacer par les services suivants en fonction des résultats et des coûts (choisissez en fonction de votre expérience réelle).

### Intégration Recraft

Si votre prototype est plus orienté vers la « production de design » (par exemple, la génération d'illustrations de style de marque, de posters marketing, de ressources vectorielles), Recraft peut être plus adapté. La méthode d'intégration est identique à la section précédente : **obtenir la clé + trouver l'exemple officiel + demander à l'AI IDE d'intégrer l'exemple dans votre bouton/page**.

::: details Pour en savoir plus : Qu'est-ce que Recraft ?

> Recraft est un outil IA pour les designers, illustrateurs et professionnels du marketing -- fondé en 2022 aux États-Unis, basé à Londres. Il aide à générer/itérer des visuels (images, art vectoriel, graphiques 3D), avec des avantages comme une sortie de haute qualité (pour toute taille/longueur de texte), un positionnement précis des éléments et un design cohérent de marque. Approuvé par plus de 3 millions d'utilisateurs dans 200 pays (dont Ogilvy et Netflix), avec plus de 350 millions d'images créées, son équipe vise à en faire un outil indispensable pour les designers, en s'assurant que les créateurs gardent le contrôle de leur flux de travail assisté par IA.
>
> ![](../../../zh-cn/stage-1/integrating-ai-capabilities/images/index-2026-01-20-23-23-34.png)
> ![](../../../zh-cn/stage-1/integrating-ai-capabilities/images/index-2026-01-20-23-23-42.png)

Il faut d'abord trouver l'[entrée API](https://www.recraft.ai/profile/api) pour obtenir une clé API.

Comme il n'y a pas de crédit gratuit ici, nous devons recharger 1 000 crédits nous-mêmes. Ce site accepte Alipay et WeChat Pay, il est donc facile d'obtenir 1 000 crédits (attention : ne rechargez pas plus que nécessaire).

![](../../../zh-cn/stage-1/integrating-ai-capabilities/images/image40.png)

Ensuite, nous suivons toujours la même méthode : aller dans la documentation officielle pour trouver l'exemple de requête correspondant :

- <https://www.recraft.ai/docs/api-reference/getting-started>
- <https://www.recraft.ai/docs/api-reference/usage>
- <https://www.recraft.ai/docs/api-reference/guides>

:::

### Intégration Qwen Image / Qwen Image Edit

Si vous souhaitez utiliser une approche plus simple pour intégrer un service de génération d'images, vous pouvez envisager Qwen Image (Tongyi Wanxiang). L'approche reste la même : considérez-le comme une « API de génération d'images » et connectez-la à votre bouton de prototype.

::: details Pour en savoir plus : Qwen Image / Qwen Image Edit ?

**Qwen Image** (aussi appelé Tongyi Wanxiang) est la série de modèles de génération d'images de l'équipe Tongyi d'Alibaba Cloud, comprenant deux modèles principaux :

**1. Qwen Image -- modèle texte-vers-image (Text-to-Image)**

Génère de nouvelles images à partir de descriptions textuelles. Vous entrez un prompt, le modèle comprend votre intention et génère une image correspondante.

![](../../../zh-cn/stage-1/integrating-ai-capabilities/images/index-2026-01-20-14-43-30.png)

**Principales capacités :**

- **Texte vers image** : générer des images à partir de descriptions textuelles, prenant en charge plusieurs styles (réaliste, cartoon, encre, cyberpunk, etc.)
- **Transfert de style** : convertir une image dans un style artistique spécifié
- **Variantes d'images** : générer de nouvelles images de style similaire à partir d'une image de référence
- **Amélioration de la résolution** : augmenter la clarté et les détails des images

**2. Qwen Image Edit -- modèle image-vers-image (Image-to-Image)**

Modifie et retouche des images existantes via des instructions en langage naturel. Le modèle comprend votre intention de modification et génère le résultat.

**Principales capacités :**

- **Remplacement partiel** : remplacer un objet ou un personnage dans une image (par exemple « changer le fond pour la mer »)
- **Suppression d'éléments** : retirer les éléments indésirables d'une image
- **Conversion de style** : ajouter des filtres ou des effets artistiques à une image
- **Extension d'image** : étendre les bords d'une image et générer du nouveau contenu
- **Retouche intelligente** : embellissement automatique, ajustement de la lumière et des ombres, correction de défauts

![](../../../zh-cn/stage-1/integrating-ai-capabilities/images/index-2026-01-20-14-46-17.png)

![](../../../zh-cn/stage-1/integrating-ai-capabilities/images/index-2026-01-20-14-46-29.png)

![](../../../zh-cn/stage-1/integrating-ai-capabilities/images/index-2026-01-20-14-46-33.png)

**Pourquoi choisir la série Qwen Image ?**

- **Optimisé pour le chinois** : meilleure compréhension des prompts en chinois, adapté aux utilisateurs chinois
- **Coût réduit** : prix plus abordable par rapport aux concurrents internationaux
- **Rapidité** : efficacité de génération élevée, temps de réponse court
- **Qualité stable** : performances stables et fiables dans les scénarios de commerce électronique et de création de visuels
- **Styles variés** : prise en charge de nombreux styles artistiques et effets créatifs

**Scénarios d'application typiques :**

- Commerce électronique : génération d'images principales, de visuels pour les pages de détails, de posters promotionnels
- Réseaux sociaux : génération d'avatars, de stickers, d'images d'accompagnement
- Design : création rapide de concepts, de visuels, d'images d'arrière-plan
- Marketing : création de publicités, de bannières d'événements, de posters de fêtes
  :::

Consultez le site [SiliconFlow](https://siliconflow.cn/). Sur le côté gauche, il y a une section « Playground » où vous pouvez tester différents modèles sans appel API. En haut de la page, il y a un bouton « Filters » ; cliquez pour filtrer la liste de modèles.

Si vous sélectionnez « Image », vous ne verrez que les modèles de génération d'images actuellement supportés. Dans ce cas, nous utiliserons Qwen/Qwen-Image.

![](../../../zh-cn/stage-1/integrating-ai-capabilities/images/index-2026-01-20-15-52-56.png)

Une fois tout configuré, vous devez vous référer à la documentation correspondante de l'API de génération d'images. Vous pouvez trouver la section « API Reference » sur la page de documentation officielle. Cliquez dessus, puis naviguez vers la [section API de génération d'images](https://docs.siliconflow.cn/cn/api-reference/images/images-generations) et trouvez l'exemple de requête correspondant.

Vous pouvez envoyer l'exemple de requête suivant et votre clé API à l'AI IDE pour intégrer la fonctionnalité de génération d'images.

```bash
curl --request POST \
  --url https://api.siliconflow.cn/v1/images/generations \
  --header 'Authorization: Bearer <token>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "model": "Qwen/Qwen-Image-Edit-2509",
  "prompt": "an island near sea, with seagulls, moon shining over the sea, light house, boats int he background, fish flying over the sea"
}
'
```

Ici, le modèle peut être Qwen/Qwen-Image ou Qwen/Qwen-Image-Edit-2509.

::: details Code de référence pour l'édition d'images

Copiez le code ci-dessous et la clé, puis envoyez-les ensemble à l'AI IDE :

```python
import requests
import os
from typing import Dict, Any, Optional

SILICONFLOW_API_KEY: str = ""
SILICONFLOW_BASE_URL: str = "https://api.siliconflow.cn/v1/images/generations"
QWEN_IMAGE_EDIT_MODEL: str = "Qwen/Qwen-Image-Edit-2509"

def generate_image_edit(
    prompt: str,
    image: Optional[str] = None,
    image2: Optional[str] = None,
    image3: Optional[str] = None,
    negative_prompt: Optional[str] = None,
    cfg: Optional[float] = 4.0,
    seed: Optional[int] = None
) -> Optional[Dict[str, Any]]:
    payload: Dict[str, Any] = {
        "model": QWEN_IMAGE_EDIT_MODEL,
        "prompt": prompt,
    }
    if image:
        payload["image"] = image
    if image2:
        payload["image2"] = image2
    if image3:
        payload["image3"] = image3
    if negative_prompt:
        payload["negative_prompt"] = negative_prompt
    if cfg is not None:
        payload["cfg"] = cfg
    if seed is not None:
        payload["seed"] = seed

    headers: Dict[str, str] = {
        "Authorization": f"Bearer {SILICONFLOW_API_KEY}",
        "Content-Type": "application/json"
    }

    try:
        response = requests.post(SILICONFLOW_BASE_URL, json=payload, headers=headers)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        print(f"Error generating image: {e}")
        return None

def save_image_from_url(image_url: str, output_path: str = "image.png") -> bool:
    try:
        response = requests.get(image_url)
        response.raise_for_status()
        os.makedirs(os.path.dirname(output_path) if os.path.dirname(output_path) else ".", exist_ok=True)
        with open(output_path, "wb") as f:
            f.write(response.content)
        print(f"Image saved successfully to: {output_path}")
        return True
    except requests.exceptions.RequestException as e:
        print(f"Error downloading image: {e}")
        return False
    except Exception as e:
        print(f"Error saving image: {e}")
        return False

prompt: str = "Transformer le ciel en soirée, avec la lune et les étoiles, dans un style onirique"
negative_prompt: str = "flou, basse qualité, déformé"
image_url: str = "https://inews.gtimg.com/om_bt/Os3eJ8u3SgB3Kd-zrRRhgfR5hUvdwcVPKUTNO6O7sZfUwAA/641"
image2_url: Optional[str] = None
image3_url: Optional[str] = None

cfg: float = 4.0
seed: int = 12345
output_path: str = "edited_image.png"

print(f"Generating edited image with prompt: {prompt}")
print(f"Input image: {image_url}")
print(f"CFG: {cfg}, Seed: {seed}")
print("-" * 50)

result = generate_image_edit(
    prompt=prompt,
    image=image_url,
    image2=image2_url,
    image3=image3_url,
    negative_prompt=negative_prompt,
    cfg=cfg,
    seed=seed
)

if result and "images" in result:
    images = result["images"]
    if images and len(images) > 0:
        image_url_result = images[0]["url"]
        print(f"Image edit generated successfully. URL: {image_url_result}")
        success = save_image_from_url(image_url_result, output_path)
        if success:
            print(f"Image saved to: {output_path}")
        else:
            print("Failed to save image to local file")
    else:
        print("No images found in response")
else:
    print("Image generation failed")
    if result:
        print(f"Response: {result}")
```

:::

# Annexe : Comment trouver « le modèle le plus puissant actuellement »

Le développement des modèles de texte (souvent appelés « grands modèles de langage ») est très rapide, et nous devons toujours nous assurer que nous utilisons l'un des modèles les plus performants. Grâce aux deux sites suivants, vous pouvez facilement voir « quels modèles sont les plus utilisés et les mieux notés actuellement ».

En général, ces sites peuvent être compris comme des **« arènes de modèles »** : ils mettent côte à côte les résultats de deux modèles, et vous votez pour celui que vous préférez. Plus un modèle reçoit de votes, plus il est probablement considéré comme « meilleur ».

De plus, vous pouvez occasionnellement voir des modèles anonymes mystérieux (« Unknown Model ») dans ces arènes. Cela signifie généralement que quelqu'un a discrètement introduit un « modèle de test interne » pour un test en aveugle, et vous pourriez avoir l'opportunité d'expérimenter des capacités plus avancées avant les autres.

## LMArena

Site : <https://lmarena.ai/>

LMArena est plus adapté pour déterminer « quel modèle est préféré par la majorité ». Plus il y a de votes et plus le score est élevé, plus le modèle est probablement fiable dans les scénarios d'utilisation réels.

Une utilisation simple est de :

1. Consulter directement le classement (Leaderboard)
2. Choisir d'abord une direction (par exemple, conversation générale / programmation / vision)
3. Choisir parmi les 3 premiers celui que vous pouvez utiliser (accès disponible, prix acceptable, latence acceptable)

![](../../../zh-cn/stage-1/integrating-ai-capabilities/images/image.png)

## Artificial Analysis

Site : <https://artificialanalysis.ai/>

Artificial Analysis est plus adapté pour comparer « qualité / prix / vitesse » dans un même tableau. Vous pouvez l'utiliser comme tableau de référence pour la sélection de modèles.

L'utilisation courante est de :

1. Trouver la catégorie de modèles qui vous intéresse (texte / génération d'images, etc.)
2. Consulter les indicateurs de qualité (Quality) + prix (Price) + latence/débit (Latency/Throughput)
3. Choisir celui qui offre le meilleur rapport qualité-prix pour votre produit

::: tip ✅ Conseil
Ne vous disputez pas au feeling sur « lequel est le plus puissant ». Une approche plus fiable est de tester 2 à 3 modèles avec les mêmes entrées, puis de combiner les classements et les prix pour prendre une décision.
:::

## Résumé

Lors de l'intégration de divers services IA, il n'est pas nécessaire de considérer les API comme trop complexes. Si vous maîtrisez les concepts clés suivants, vous pourrez gérer la plupart des scénarios :

**L'essence de l'API est un pont de communication.** Ce qu'elle fait est simple : envoyer votre requête et ramener la réponse du modèle. Vous n'avez pas besoin de savoir ce qui se passe en coulisses, il suffit d'organiser correctement le format de la requête.

**Le SDK est une encapsulation de l'API.** Si l'API est l'interface brute, le SDK est une boîte à outils prête à l'emploi -- il s'occupe des détails fastidieux comme la signature des requêtes, la gestion des erreurs et la validation des paramètres. Dans le développement quotidien, privilégiez le SDK plutôt que l'appel direct à l'API, cela vous évitera bien des tracas.

**Quand vous lisez la documentation, concentrez-vous sur trois choses :** l'adresse du service (endpoint), les identifiants (clé API) et comment remplir les paramètres d'appel. Une fois ces trois points clarifiés, la mise en marche n'est qu'une question de temps.

Le reste du travail sera accompli par l'IDE et les outils de développement modernes. Concentrez-vous sur votre logique métier, laissez le travail d'appel de bas niveau aux SDK et aux chaînes d'outils matures.

# 5. 📚 Devoir : Intégrer votre première capacité IA

<el-card shadow="hover" style="margin: 20px 0; border-radius: 12px;">
  <template #header>
    <div style="font-weight: bold; font-size: 16px;">Défi : Intégrer une capacité IA dans votre espace de travail</div>
  </template>

  <p>
    En vous référant aux prompts et au contenu de cette leçon, complétez un cycle complet :
  </p>

  <ul>
    <li>
      <strong>Pratique complète en boucle fermée</strong>
      <ul>
        <li>Choisissez et intégrez un service IA (LLM / texte-vers-image / image-vers-image) -> Implémentez l'interaction frontend-backend -> Intégrez dans votre prototype</li>
      </ul>
    </li>
    <li>
      <strong>Partage des résultats</strong>
      <ul>
        <li>Capturez d'écran votre page fonctionnelle et partagez-la avec le groupe</li>
      </ul>
    </li>
    <li>
      <strong>Question de réflexion</strong>
      <ul>
        <li>Réservez de l'espace pour le prochain chapitre « Projet complet », réfléchissez à l'avance : comment combiner ces capacités IA pour créer une fonctionnalité intéressante ?</li>
      </ul>
    </li>
  </ul>
</el-card>

## Prochaine étape

Dans le prochain chapitre, nous allons relier ces capacités IA dispersées et créer un produit complet basé sur un scénario métier réel :

- Connecter les étapes de planification de contenu, de mise en ligne de produits et d'analyse de données en un flux métier complet
- Intégrer les capacités IA apprises dans ce chapitre (génération de textes publicitaires LLM, texte-vers-image, édition d'images) dans les étapes métier réelles
- Réaliser un « espace de travail IA commerce électronique » véritablement utilisable, et non une démo isolée

<RelatedArticlesSection
  title="Articles connexes"
  description="Parcours d'apprentissage recommandé d'une capacité IA unique à un flux produit complet."
  :items="relatedArticles"
/>
