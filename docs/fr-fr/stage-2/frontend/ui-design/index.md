<script setup>
import { relatedArticlesMap } from '@theme/data/relatedArticles'

const relatedArticles = relatedArticlesMap['fr-fr/stage-2/frontend/ui-design'] ?? []
</script>

# Construire votre première application moderne - Conception UI

Vous souvenez-vous de la sensation ressentie la première fois que vous avez vu une page produit au design soigné ? À fonctions identiques, la page des autres semble toujours plus « haut de gamme » : des couleurs propres, un espace suffisant, des coins arrondis parfaitement dosés sur les boutons. Vous ne pouvez pas vous empêcher de penser — **« Comment ont-ils conçu ça ? Pouvons-nous créer une page de ce niveau nous aussi ? »**

Cette envie de « comprendre comment font les autres » est précisément le meilleur point de départ pour le design frontend. Avant de passer à l'action, récapitulons les compétences déjà acquises :

- Dans les leçons précédentes, nous avons appris à générer des ressources de design en masse avec NanoBanana, et compris comment le « style » dans les prompts influence le résultat final ;
- Nous avons découvert des outils de design professionnels comme Figma et MasterGo, et compris comment une maquette est organisée ;
- Nous avons aussi vu le flux de conversion de la maquette vers le code frontend.

Mais quand vous voulez vraiment créer une belle page pour votre propre projet, vous risquez encore de rester bloqué : vous savez utiliser les outils, vous pouvez générer des ressources, mais vous **ne savez pas à quoi ressemble « ce qui est beau », et encore moins comment décomposer et imiter une excellente page**. Ne vous inquiétez pas, cette leçon est faite pour résoudre exactement ce problème.

Pour vous aider à relier les contenus précédents et suivants, posez-vous d'abord quelques petites questions :

1. De quelles sections un site web moderne est-il généralement composé ?
2. « Beau » est-il une sensation subjective, ou peut-il être quantifié par des chiffres (valeurs de couleur, tailles de police, espacements, coins arrondis) ?
3. Si vous deviez imiter le style visuel d'un site web, par où commenceriez-vous ?

Si vous n'avez pas encore de réponse claire à ces questions, pas de souci — c'est précisément ce que cette leçon va vous apprendre. En cas de difficulté à comprendre une étape, n'hésitez pas à faire une capture d'écran de la page actuelle et à l'envoyer au grand modèle de langage pour lui poser la question ; osez essayer, ne craignez pas l'erreur, chaque tentative est une occasion d'apprendre et de progresser.

::: tip 🎯 Question centrale
**Face à une application ou un site web au design soigné, comment analyser la façon dont il a été conçu et, à l'aide d'outils de design IA, le reproduire au point de le rendre « indiscernable de l'original » ?**
:::

---

## Ce que vous allez apprendre dans cette leçon

1. **Apprendre à « lire » un design** : face à une page, savoir quoi regarder et comment la décomposer
2. **Maîtriser une méthodologie d'initiation** : trouver des références → analyser → imiter → se rapprocher → s'initier
3. **Connaître 2 voies de design** : Figma/MasterGo et Claude Design/Open Design (avec les UI design Skills)
4. **Pratique d'imitation** : choisir une vraie page web et la reproduire de zéro avec une haute fidélité
5. **Consolider un design system** : transformer les normes de design des grandes entreprises en votre propre système

::: tip 📚 Prérequis
Ce tutoriel s'adresse aux développeurs qui savent déjà utiliser des outils de programmation IA (comme Trae) et qui veulent compléter leurs capacités visuelles frontend. Pour établir d'abord un sens de la génération d'images, il est recommandé d'apprendre [Production d'assets avec NanoBanana](../lovart-assets/) ; pour approfondir les outils de design, vous pouvez combiner avec [Introduction à Figma et MasterGo](../figma-mastergo/).
:::

---

## Chapitre 1 : S'initier au design frontend, en commençant par « copier »

Dans la section précédente, nous avons posé trois questions : de quelles sections une page est composée, à quoi ressemble le « beau », et comment imiter. Cette section commence par la méthodologie : **la première leçon du design frontend, ce n'est pas créer, c'est reproduire.**

Comme on apprend la calligraphie en copiant les estampes, ou le dessin en copiant des moulages en plâtre, pourquoi donc « copier » ?

- Le « bon » design peut être quantifié — **valeurs de couleur, tailles de police, espacements, coins arrondis, ombres**, tout est une question de chiffres
- En reproduisant pixel par pixel un système de design mature, vous êtes forcé de comprendre chaque décision qui se cache derrière
- Quand vous « copiez au point de ressembler », la prochaine fois qu'une situation similaire se présente, vous saurez « dans quelle direction copier »

![](/zh-cn/stage-2/frontend/ui-design/images/design-reference.jpg)

> 💡 En une phrase : **être capable de reproduire un bon produit, c'est déjà avoir les bases du design frontend ; être capable de faire des modifications par-dessus, c'est être sorti d'apprentissage.**

### 1.1 Pourquoi l'imitation est-elle la voie la plus rapide pour s'initier

Certains s'inquiètent : « Je copie ce que font les autres, est-ce vraiment utile pour apprendre ? » La réponse est : oui, et c'est même la voie la plus rapide. Car l'imitation ne consiste pas à recopier le résultat, mais à **s'astreindre à reconstituer le processus** :

- Vous êtes forcé de mesurer chaque espacement, et de comprendre ainsi « comment l'espace blanc crée de la respiration »
- Vous êtes forcé de relever chaque valeur de couleur, et de comprendre ainsi « pourquoi cette palette semble harmonieuse »
- Vous êtes forcé de comparer chaque niveau hiérarchique, et de comprendre ainsi « comment les informations principales et secondaires sont organisées »

Quand vous parvenez à « décomposer jusqu'au niveau des paramètres » une excellente page puis à la reconstruire, votre compréhension du design dépasse déjà celle de beaucoup de personnes qui ne font que « se fier à leur intuition ».

### 1.2 Les grandes entreprises « s'inspirent » aussi, ce n'est pas un secret

La façon de travailler des designers inclut naturellement les références : Pinterest pour trouver l'inspiration, Dribbble pour observer les tendances, l'analyse des concurrents pour la structure. À l'ère de l'IA, cela a été amplifié — car les outils transforment directement la « référence » en une capacité exécutable :

![](/zh-cn/stage-2/frontend/ui-design/images/design-inspiration.jpg)

- Claude Design peut importer les sites de référence que vous avez mis en favoris et générer une première ébauche selon leur style
- Open Design intègre 151 systèmes de design open source, applicables à votre projet en un clic
- Divers UI design Skills conditionnent « les normes visuelles des grandes entreprises » en instructions exécutables par l'IA

La question n'est donc pas « peut-on copier », mais « **comment copier de façon professionnelle, légale, et en produisant quelque chose qui vous est propre** ».

#### Où trouver des références ? Commencez par mettre ces sites en favoris

La première étape de la référence est de **constituer une « bibliothèque de références »**. Les sites suivants sont classés par usage ; il est recommandé de tous les mettre en favoris et de les utiliser selon vos besoins :

| Site | Usage | Ce qu'on y trouve |
| :--- | :--- | :--- |
| [Awwwards](https://www.awwwards.com) | Les « Oscars » du design web | Créativité, animations et interactions de premier ordre, le « plafond » du design |
| [Recent (anciennement Godly)](https://godly.website) | Collection d'inspirations web de haute qualité | Design avant-gardiste pour l'IA, le Web3 et les sites portfolio |
| [Landbook](https://land-book.com) | Sélection de designs de landing pages | Filtrage des sites officiels, pages de tarification, mises en page de première écran par secteur/palette |
| [Lapa Ninja](https://www.lapa.ninja) | Bibliothèque de 7300+ captures de landing pages | Recherche par élément : navigation, présentation des fonctionnalités, avis clients |
| [Mobbin](https://mobbin.com) | Bibliothèque d'interfaces d'applications réelles | Étudier les vraies pages et flux de produits comme Uber, Notion |
| [Dribbble](https://dribbble.com) | Communauté de designers | Inspirations de palettes, icônes, styles d'illustration et micro-interactions |
| [Behance](https://www.behance.net) | Bibliothèque de projets complets | Voir les réflexions de design, les processus de recherche et les portfolios complets |

À quoi ressemblent ces sites ? Un aperçu (cliquez sur les images pour les agrandir) :

![Awwwards — les « Oscars » du design web](/zh-cn/stage-2/frontend/ui-design/images/site-awwwards.jpg)

![Recent (anciennement Godly) — collection d'inspirations web de haute qualité](/zh-cn/stage-2/frontend/ui-design/images/site-godly.jpg)

![Landbook — sélection de designs de landing pages](/zh-cn/stage-2/frontend/ui-design/images/site-landbook.jpg)

![Lapa Ninja — bibliothèque de 7300+ captures de landing pages](/zh-cn/stage-2/frontend/ui-design/images/site-lapa.jpg)

![Mobbin — bibliothèque d'interfaces d'applications réelles](/zh-cn/stage-2/frontend/ui-design/images/site-mobbin.jpg)

![Dribbble — communauté de designers](/zh-cn/stage-2/frontend/ui-design/images/site-dribbble.jpg)

![Behance — bibliothèque de projets complets](/zh-cn/stage-2/frontend/ui-design/images/site-behance.jpg)

::: tip 💡 Créer votre propre bibliothèque de références
Dès qu'une page vous plaît, **faites une capture + enregistrez le lien**, puis classez-la par « landing page / composant / palette / animation ». Pour imiter, choisissez directement votre cible dans cette bibliothèque, c'est bien plus rapide que de chercher sur Internet à la dernière minute.
:::

### 1.3 Référence vs plagiat : une ligne claire

| Dimension | Référence (recommandé ✅) | Plagiat (dangereux ❌) |
| :--- | :--- | :--- |
| Objet | Structure de mise en page, style visuel, normes de design | Logo de marque, icônes exclusives, illustrations originales |
| Méthode | Comprendre puis refaire, intégrer à sa propre produit | Copier directement les assets, le code, les images |
| Résultat | Ressemble au style, mais le contenu est totalement différent | Même la copie, la palette et les assets sont identiques |
| Risque | Faible | Risque élevé de droits d'auteur / commercial |

Le chapitre 7 abordera en détail les limites du droit d'auteur. Retenez d'abord une phrase : **copier les « règles » est permis, copier les « résultats » est dangereux.**

---

## Chapitre 2 : Savoir regarder, c'est savoir concevoir — décomposer une page

« Copier de façon ressemblante » suppose de « savoir lire ». Ce chapitre vous donne un cadre générique de décomposition d'une page.

![](/zh-cn/stage-2/frontend/ui-design/images/page-structure.jpg)

### 2.1 Regarder la structure : de quelles sections une page est composée

La grande majorité des sites web modernes peuvent être décomposés en 4 grandes sections :

```
┌─────────────────────────┐
│ ① Barre de navigation   │  Logo · Menu · Connexion/CTA
├─────────────────────────┤
│ ② Héros (Hero)          │  Titre principal · Sous-titre · Bouton principal · Visuel produit
├─────────────────────────┤
│ ③ Sections de contenu   │  Cartes de fonctionnalités · Données · Avís · Tarification
├─────────────────────────┤
│ ④ Pied de page (Footer) │  Liens · Copyright · Abonnement
└─────────────────────────┘
```

Quand vous regardez une page, ne vous attardez pas sur les détails ; **tracez d'abord son « squelette » à l'œil** : quelle partie est la navigation, quelle partie est la première écran, en combien de segments le milieu est divisé, combien d'éléments chaque segment contient.

### 2.2 Regarder le visuel : 4 éléments quantifiables

| Élément | Quoi regarder | Comment le noter |
| :--- | :--- | :--- |
| **Couleurs** | Quelles sont la couleur principale, la couleur d'arrière-plan, la couleur du texte | Utiliser un pipette pour relever directement la valeur Hex |
| **Polices** | Quelle police pour les titres/le corps, quelle taille, quelle graisse | Consulter font-family/size/weight dans les DevTools du navigateur |
| **Espacements** | L'espace blanc entre les sections et à l'intérieur des cartes | Noter le rythme courant des 8 / 16 / 24 / 48 px |
| **Coins arrondis et ombres** | Le rayon des coins arrondis et l'intensité des ombres des cartes et boutons | Consulter border-radius / box-shadow dans les DevTools |

::: tip 💡 L'avantage naturel du design frontend
**Vous êtes développeur frontend, les DevTools sont votre analyseur de design.** Clic droit → Inspecter l'élément, toutes les valeurs de couleur, tailles de police, espacements et coins arrondis de n'importe quelle page sont exposés sans exception. C'est une capacité dont les designers rêvent, mais que les développeurs possèdent naturellement.

Outils de prise de couleur courants : le sélecteur de couleur des Chrome DevTools, les extensions de type `color-picker` ; vous pouvez aussi envoyer une capture d'écran à un grand modèle multimodal et lui demander d'extraire les normes de design.
:::

### 2.3 Regarder les composants : découper les « pièces réutilisables »

Décomposez la page en composants, et pour chaque composant, notez ses paramètres de style :

```text
Bouton Primary Button
- Fond : #4F46E5
- Texte : #FFFFFF, 14px / 600
- Coins arrondis : 8px
- Rembourrage : 12px 24px
- Ombre : 0 2px 8px rgba(79,70,229,0.3)

Carte Card
- Fond : #FFFFFF
- Coins arrondis : 16px
- Bordure : 1px solid #E2E8F0
- Ombre : 0 4px 12px rgba(15,23,42,0.08)
```

Après avoir décomposé 3 à 5 pages, vous aurez entre les mains une « bibliothèque de styles de composants » — c'est l'ébauche de votre propre design system.

### 2.4 Traduire le « design que vous voyez » en « ce que l'IA comprend »

Pour imiter dans un outil IA, vous devez traduire le visuel en description structurée. **Plus vous regardez finement, plus la traduction est précise, plus l'IA copie de façon ressemblante.**

```text
Référez-vous au style de cette landing page, créez-moi une page de même structure :
- Structure : navigation + héros (Hero) + 3 cartes de fonctionnalités + zone de tarification + pied de page
- Palette : couleur principale Indigo #4F46E5, fond #F8FAFC, texte #0F172A
- Polices : titre Space Grotesk 700, corps Inter 400
- Espacements : sections 96px, intérieur des cartes 24px, grille 24px
- Coins arrondis : cartes 16px, boutons 8px
- Ombres : 0 4px 12px rgba(15,23,42,0.08)
```

---

## Chapitre 3 : Panorama des outils de design frontend à l'ère de l'IA

« Comment ont-ils conçu ça ? » La réponse est de plus en plus variée. Voici 2 voies typiques, couvrant du « contrôle manuel précis » à la « génération automatique par dialogue ».

![](/zh-cn/stage-2/frontend/ui-design/images/ai-design.jpg)

### 3.1 Voie 1 : Figma / MasterGo — outils de maquette professionnels

Si vous voulez une **maquette éditable, collaborative et contrôlable au pixel près**, utilisez Figma (standard international) ou MasterGo (chinois, prise en main plus légère) :

- Construire la mise en page sur le canevas, ajuster les composants, créer des prototypes d'interaction
- S'appuyer sur des capacités comme Figma Make / MasterGo AI pour assister la génération et les ajustements en masse
- Enfin, confier au frontend l'implémentation selon la maquette, ou convertir en code via des plugins

![Éditeur Figma : panneau des calques à gauche, canevas au centre, panneau des propriétés à droite](/zh-cn/stage-2/frontend/ui-design/images/figma_editor.jpg)

![Éditeur MasterGo : outil de design cloud chinois, mise en page de canevas similaire à Figma](/zh-cn/stage-2/frontend/ui-design/images/mastergo_editor.jpg)

> Convient aux : scénarios nécessitant une livraison de maquette stricte, la collaboration d'équipe et des interactions complexes. Pour l'utilisation des outils, voir [Introduction à Figma et MasterGo](../figma-mastergo/).

### 3.2 Voie 2 : Claude Design / Open Design — canevas de design dialogué

Le point commun de ces outils est de **générer directement des prototypes de design interactifs avec du langage naturel**, plutôt que des images statiques. Les outils représentatifs sont Claude Design et son alternative open source Open Design.

#### Claude Design : le canevas de design dialogué officiel

Claude Design est un produit de design IA lancé par Anthropic (entrée `claude.ai/design`) :

- Saisissez une demande en une phrase, il produit par défaut 3 variantes de design, couvrant landing pages, wireframes, présentations, etc.
- Prend en charge l'import de design systems (dépôts GitHub, exports Figma, captures de sites, fichiers de marque), avec extraction automatique des couleurs/polices/composants
- Dans le canevas, commentez directement, ajustez par glisser-déposer, et enfin exportez en HTML / PDF / PPTX, ou cédez à Claude Code pour l'implémenter en vrai code

**Cas d'usage typiques :**

**① Reproduire directement une page haute fidélité à partir d'une capture de référence (le plus courant)**

Saisissez la description du produit et la référence de style, Claude génère automatiquement une landing page complète — à gauche, le journal de dialogue avec le prompt et le processus de génération, à droite, le canevas qui rend le résultat en temps réel.

```text
Create a high-fidelity landing page designed to raise $500,000 from angel investors
for "雾屿咖啡 Mist Island Coffee" - a boutique specialty coffee shop that combines
premium coffee, quiet workspaces, and warm community events.
Tone should feel warm, premium, calm, and trustworthy - think a mix of Blue Bottle
Coffee + Apple Store + minimalist lifestyle design.
```

![Génération réelle de Claude Design : landing page haute fidélité de Mist Island Coffee, dialogue et progression à gauche, canevas rendant la section Hero complète à droite](/zh-cn/stage-2/frontend/ui-design/images/claude_case_landing.jpg)

**② 3 variantes de design par défaut, choisissez une direction puis affinez**

Claude Design ne donne pas une seule réponse, mais génère par défaut plusieurs directions à choisir — style éditeur, style musée, style Zine, etc., puis vous entrez pour affiner.

![Cas réel : un journaliste de PCWorld demande à Claude d'expliquer le concept d'AI Tokens, qui renvoie trois styles au choix : Editorial / Museum / Field Notes](/zh-cn/stage-2/frontend/ui-design/images/claude_case_variants.jpg)

**③ Générer des prototypes interactifs (pas seulement des images statiques)**

Les pages générées sont de véritables HTML cliquables et saisissables — les boutons ont des effets hover, les formulaires acceptent la saisie, les données se calculent en temps réel.

![Page Token pédagogique réellement générée : tokeniseur intégré en temps réel, saisissez une phrase et les blocs de couleur surlignent chaque token, en bas les statistiques de caractères/mots/tokens](/zh-cn/stage-2/frontend/ui-design/images/claude_case_interactive.jpg)

**④ Créer des présentations / PPT**

En plus des pages web, il peut générer des diapositives complètes (multi-pages, avec navigation, exportables en PDF/PPTX).

![Génération réelle : pitch deck d'une marque de café, à gauche les 13 pages de plan, à droite le rendu de la diapositive courante, en bas la navigation de pages](/zh-cn/stage-2/frontend/ui-design/images/claude_case_slide.jpg)

**⑤ Générer des vidéos animées**

Avec « From template », vous pouvez créer des vidéos HTML animées — script de storyboard + scènes animées réellement rendues, avec barre de contrôle de lecture.

![Génération réelle : vidéo animée de 45 s sur la fabrication du café, à gauche la timeline du storyboard, à droite le canevas qui joue l'animation (grains → torréfaction → infusion)](/zh-cn/stage-2/frontend/ui-design/images/claude_case_video.jpg)

**⑥ Itérer sur un design existant (commentez directement sur le canevas)**

Une fois le prototype généré, pas besoin de réécrire le prompt : cliquez sur le bouton Comment, sélectionnez un élément par un cercle et écrivez un commentaire, Claude effectuera des modifications locales.

![Sur le canevas, cliquez sur le bouton Comment, sélectionnez un élément quelconque par un cercle pour faire apparaître le cadre de commentaire, écrivez « Suggest to Claude » pour itérer localement](/zh-cn/stage-2/frontend/ui-design/images/claude_case_comment.jpg)

**⑦ Design d'écrans d'applications mobiles**

Prend en charge la spécification des dimensions de l'appareil (comme iPhone), et génère des prototypes UI mobiles avec cadre d'appareil.

![Génération réelle : interface mobile de l'app de score de cricket (Tracket) — Header sombre + affichage du score + boutons d'action, avec un design à fort contraste pensé pour les scènes en plein soleil](/zh-cn/stage-2/frontend/ui-design/images/claude_case_mobile.jpg)

![Vue d'ensemble du canevas Claude Design : dialogue à gauche, panneau Tweaks à droite pour ajuster en temps réel le thème, les points de rupture, les couleurs, etc.](/zh-cn/stage-2/frontend/ui-design/images/claude_design_canvas.jpg)

> Convient aux : personnes sans formation en design, qui veulent éviter la courbe d'apprentissage de Figma et obtenir rapidement des prototypes interactifs.

#### Open Design : l'alternative open source à Claude Design

Si vous ne voulez pas vous abonner, ou que vous accordez plus d'importance à la confidentialité des données, essayez Open Design (projet open source nexu-io). Il suit la même voie que Claude Design : **génération de prototypes par dialogue**, la différence étant **local-first, BYOK (vous fournissez votre clé de modèle), et sans lien avec aucun Agent**.

Il repose sur deux concepts centraux :

| Concept | Explication | Valeur pour vous |
| :--- | :--- | :--- |
| **Skills (compétences)** | 16 compétences de design sous forme d'instructions (rédaction, palette, direction créative, brainstorming…) | une compétence = un modèle de tâche professionnelle |
| **Templates (modèles)** | 288 modèles exécutables (prototypes, diapositives, animations…), tous avec `example.html` | fork puis changez les données pour livrer |
| **Design Systems (systèmes de design)** | 151 systèmes de design portables (palettes, polices, animations, style rédactionnel) | appliquez les normes visuelles des grandes entreprises en une phrase |

Il détecte votre Agent de codage local (Claude Code, Codex, Cursor, Qwen, Kimi, etc., officiellement 21 pris en charge) comme « moteur de design » — **votre Agent existant est le designer**. En outre, les **UI design Skills** de l'écosystème d'outils comme Claude Code (par exemple frontend-design) peuvent aussi conditionner les normes de design en instructions exécutables par l'IA, pour que l'IA produise selon les normes.

**Cas d'usage typiques :**

**① Nouveau projet : choisir Skill + design system + précision**

Lors de la création d'un prototype, vous pouvez choisir entre wireframe ou haute fidélité, spécifier la plateforme cible (Web responsive / mobile, etc.), et choisir parmi les plus de 150 design systems intégrés comme base visuelle.

```text
Utilisez Open Design, appliquez le design system de Linear, générez du HTML de landing page pour un produit SaaS
```

![Boîte de dialogue de création de prototype Open Design : interface en chinois, choix prototype/diapositive/média, bascule wireframe/haute fidélité, sélection du design system et de la plateforme cible](/zh-cn/stage-2/frontend/ui-design/images/od_case_create.jpg)

![Les 150+ design systems intégrés d'Open Design (Agentic, Airbnb, Airtable, Linear, Stripe, Vercel…), groupés par catégorie, chacun avec aperçu de palette et description](/zh-cn/stage-2/frontend/ui-design/images/od_case_designsystems.jpg)

**② Espace de travail Studio : piloté par le dialogue, génération en temps réel**

À gauche, le panneau de dialogue (affiche les étapes de réflexion de l'IA, la liste Todo, les opérations Write), à droite, le canevas iframe qui rend le résultat en temps réel — similaire à Claude Design, mais en bas il affiche quel CLI Agent local est en cours d'utilisation (comme Claude Code, Codex, deepseek, etc.).

![Espace de travail Studio d'Open Design : panneau Chat à gauche affichant le plan et la progression de génération, canevas à droite rendant la page de couverture « Open Design » en gros caractères (mode diapositive), en haut les onglets Preview/Source/Comment/Edit](/zh-cn/stage-2/frontend/ui-design/images/od_case_studio.jpg)

**③ Générer des diapositives / PPT avec un design system**

Sélectionnez le type Slide deck, saisissez le sujet, et obtenez une présentation complète multi-pages. Ci-dessous, une diapositive de présentation en chinois générée par un utilisateur de la communauté avec Open Design.

![Cas d'utilisateur réel : couverture de la présentation « One-Person Company · une organisation repliée par l'IA » — fond sombre, grand titre en graisse serif, informations de l'intervenant, navigation de numéros de page en bas](/zh-cn/stage-2/frontend/ui-design/images/od_case_deck.jpg)

**④ Générer des prototypes d'applications mobiles haute fidélité**

Prend en charge l'aperçu simultané de plusieurs écrans, génère automatiquement le cadre d'appareil iPhone, et fournit tous les composants : barre d'onglets, mise en page de cartes, barres de progression, etc.

![Cas de génération réelle : app de gestion de vie gamifiée (Level) — 3 écrans en aperçu côte à côte, avec la page d'accueil des tâches quotidiennes, le tableau de bord de catégorisation des tâches, la page de détail d'une tâche ; mode clair, cartes colorées](/zh-cn/stage-2/frontend/ui-design/images/od_case_mobile.jpg)

**⑤ Utiliser un UI design Skill pour normaliser la sortie de l'IA**

Installez des Skills comme frontend-design sur Claude Code / Cursor, et l'IA suivra automatiquement les normes de design lors de l'écriture des pages :

```text
# Appel dans Claude Code
/frontend-design implémente-moi une page de connexion
→ Sortie automatique selon les normes de design intégrées au Skill :
   - Couleurs : couleur principale #4F46E5, succès #10B981, erreur #EF4444
   - Espacements : grille de base 8px
   - Composants : Button / Input / Form conformes aux normes d'accessibilité
   - Responsive : adaptation sur mobile / tablette / desktop
```

**⑥ Les projets privés locaux ne sortent pas du réseau**

Pour les projets internes d'entreprise ou les designs de produits contenant des données sensibles, tous les fichiers sont traités localement, et le modèle peut passer par un déploiement local ou BYOK :

```text
# Démarrage local d'Open Design, modèle via Qwen déployé localement
OPENAI_API_KEY=your-local-key OPENAI_BASE_URL=http://localhost:8000/v1 \
opendesign
# Tous les fichiers de design sont enregistrés localement dans ~/.open-design/, sans passer par aucun serveur tiers
```

![Interface principale d'Open Design : sélectionnez un Skill (prototype/diapositive/image/vidéo, etc.) + saisissez la demande pour générer, le CLI Agent local sert automatiquement de moteur](/zh-cn/stage-2/frontend/ui-design/images/opendesign_home.jpg)

> Convient aux : développeurs soucieux de la confidentialité des données, disposant déjà d'un Agent de codage, et voulant garder le contrôle total du processus de design.

### 3.3 Comment choisir entre les deux voies

| Critère de comparaison | Voie 1 : Figma / MasterGo | Voie 2 : Claude Design / Open Design |
| :--- | :--- | :--- |
| Positionnement | Outils de maquette professionnels | Canevas de design IA dialogué |
| Outils représentatifs | Figma, MasterGo | Claude Design (officiel), Open Design (alternative open source) |
| Résultat | Maquette éditable | Prototype HTML interactif |
| Difficulté de prise en main | ⭐⭐ moyenne | ⭐ faible |
| Coût | Version gratuite disponible | Claude Design requiert un abonnement ; Open Design open source gratuit (BYOK) |
| Convient à | Livraison rigoureuse et collaboration | Validation rapide de prototypes, priorité à la confidentialité |

::: tip 💡 Combinaison réaliste en pratique
**Référence → Design → Livraison** peut être entièrement mixé : utilisez Claude Design / Open Design pour sortir rapidement une direction et un prototype → après validation, importez dans Figma/MasterGo pour affiner → cédez à Claude Code pour écrire le code. Chaque voie tire parti des forces de l'autre.
:::

![](/zh-cn/stage-2/frontend/ui-design/images/design-tools.jpg)

---

## Chapitre 4 : Atelier 1 — imiter « la page d'un autre » jusqu'à la ressemblance

L'objectif est très concret : **choisissez une vraie page web que vous aimez, et imitez-la jusqu'à la « ressemblance ».** Prenons ici une landing page comme exemple.

![](/zh-cn/stage-2/frontend/ui-design/images/design-workspace.jpg)

### Étape 1 : Choisir la cible

Choisissez une landing page à la structure claire qui vous intéresse (site officiel SaaS, page de présentation produit, tout convient). Enregistrez sa capture d'écran et son lien.

### Étape 2 : Décomposer avec le cadre du chapitre 2

Dans le navigateur, clic droit → Inspecter, puis notez en 4 étapes :

```text
Cible : landing page d'un site officiel SaaS
① Structure : navigation (Logo/Menu/CTA) → Hero (titre/sous-titre/bouton/capture) → 3 cartes de fonctionnalités → tarification (3 paliers) → pied de page
② Couleurs : couleur principale #0F172A foncée, accent #6366F1, fond #FFFFFF / #F8FAFC
③ Polices : titre Inter 800 48px, corps Inter 400 16px
④ Composants : boutons coins arrondis 8px/pleins, cartes coins arrondis 16px/fond gris clair/sans bordure
```

### Étape 3 : Donner à l'outil de design IA, générer la première version

Donnez le résultat de la décomposition à Claude Design / Open Design, et demandez à générer selon ces normes :

```text
Générez une landing page de même structure selon les normes de design suivantes :
[collez le relevé de décomposition de l'étape 2]
Produit : mon projet (description d'usage en une phrase)
Exigence : respecter au pixel près les normes de couleurs, polices, espacements et coins arrondis ci-dessus
```

La première version est généralement « l'esprit y est, mais pas la forme » — la structure est bonne, les détails dévient. **Ce n'est pas un échec, c'est justement ce qui vous indique où ajuster ensuite.**

### Étape 4 : Comparer section par section, itérer par des modifications

Mettez côte à côte la capture de référence et le résultat généré, comparez section par section, et approchez-vous avec des « instructions de modification » :

| Problème constaté | Instruction de modification |
| :--- | :--- |
| Couleur principale trop lumineuse | « Remplace la couleur principale par #0F172A, la couleur d'accent par #6366F1 » |
| Coins arrondis des boutons incorrects | « Uniformise tous les boutons à 8px de coins arrondis, fond plein » |
| Espacements trop serrés | « Augmente les espacements des sections à 96px, le rembourrage interne des cartes à 24px » |
| Police incorrecte | « Utilise Inter 800 pour les titres, Inter 400 pour le corps » |
| Éléments décoratifs en trop | « Supprime les décorations d'arrière-plan, ne garde que le contenu essentiel » |

### Étape 5 : Critère de validation — « la ressemblance »

Comment juger que vous êtes initié ? Fixez-vous un critère objectif :

- [ ] Prendre deux captures : la page d'origine vs votre reproduction
- [ ] Mettre les deux images côte à côte et les agrandir, comparer pixel par pixel
- [ ] Valeurs de couleur, tailles de police, espacements, coins arrondis **sans différence de mise en page visible à l'œil nu**
- [ ] Réduire à 50 % puis comparer, toujours incapable de distinguer la version d'origine

> 💡 **La « ressemblance » n'est pas un but, c'est un moyen.** Après avoir imité 2-3 sites de styles totalement différents, vous accumulerez naturellement un « sens du design » : quand faire de grands espaces blancs, quand utiliser une forte saturation, quand resserrer les coins arrondis. À ce moment-là, imiter une nouvelle page sera bien plus rapide.

---

## Chapitre 5 : Atelier 2 — du design au code

La maquette / le prototype imité doit finalement devenir une vraie page dans votre produit. Deux voies de transmission :

![](/zh-cn/stage-2/frontend/ui-design/images/design-to-code.jpg)

### 5.1 Voie A : outil de design IA → code frontend

- **Claude Design** : une fois validé sur le canevas, utilisez `/design-sync` pour synchroniser vers Claude Code et poursuivre le code directement depuis le design, sans repartir de la capture d'écran
- **Open Design** : exportez directement en HTML, puis confiez à l'Agent la transformation en composants du projet
- **Figma/MasterGo** : exportez le code React / Vue via des plugins ou MCP

### 5.2 Voie B : capture d'écran → restauration par un grand modèle multimodal

Le plus simple : envoyez directement la capture de la maquette imitée à un grand modèle multimodal, demandez-lui de « restaurer en composants React », et construisez section par section.

> Pour une comparaison détaillée des trois voies « design to code », voir [Du prototype de conception au code projet](../design-to-code/). Pour un gain d'efficacité d'ingénierie au niveau des composants, consultez aussi [Actualisez votre interface avec une bibliothèque de composants moderne](../modern-component-library/).

---

## Chapitre 6 : Transformer le design system des grandes entreprises en le vôtre

Après avoir imité 3 pages, vous découvrirez : **derrière les belles pages, il y a toujours un « design system » stable**. Plutôt que de tout construire de zéro, appuyez-vous sur les épaules des géants.

![](/zh-cn/stage-2/frontend/ui-design/images/design-system.jpg)

### 6.1 Qu'est-ce qu'un « design system portable »

Open Design transforme les design systems en fichiers `DESIGN.md` (Linear, Vercel, Stripe, Apple, Cursor, Figma…), tandis que Claude Design les extrait automatiquement de vos dépôts de code / fichiers de design. À la base, il s'agit de la même chose :

```text
DESIGN.md  =  Tokens de couleur + Normes de police + Rythme d'espacement + Styles de composants + Conventions d'usage
```

Voici un exemple de structure réelle :

```markdown
# Design System: Linear

## Colors
- background: #08090A
- primary: #5E6AD2
- text: #F7F7F8

## Typography
- heading: 22px / 600, letter-spacing -0.4px
- body: 14px / 400

## Radius
- card: 8px
- button: 6px

## Spacing
- 4 / 8 / 12 / 16 / 24 / 32 px

## Do / Don't
- Do: pouvoir utiliser beaucoup d'espace blanc, une couleur sobre
- Don't: ne pas utiliser de dégradés, ne pas empiler les ombres
```

### 6.2 Créer son propre design system en trois étapes

1. **Choisir une base** : appliquez un design system de grande entreprise que vous appréciez (comme le sombre sobre de Linear, l'espace blanc d'Apple)
2. **Modifier les paramètres** : remplacez la couleur principale par votre couleur de marque, ajustez les coins arrondis et les espacements
3. **Consolider en fichier** : enregistrez-le sous `DESIGN.md` ou en Skill, pour que l'IA s'y conforme automatiquement à chaque génération

### 6.3 Aller plus loin : fixer le style avec un UI design Skill

Une fois le design system encapsulé en Skill, un simple appel suffit :

```text
Utilisez les normes de design du skill my-brand, générez les solutions de première écran de 3 pages fonctionnelles
```

La méthode pour créer et utiliser des Skills, voir [Rendez vos interfaces plus belles avec les LLM et les Skills](../llm-skills-beautiful/).

---

## Chapitre 7 : Droits d'auteur et éthique

Plus votre capacité d'imitation est forte, plus il faut tenir ses limites :

![](/zh-cn/stage-2/frontend/ui-design/images/copyright.jpg)

**Copier les règles, pas les résultats.** Les « règles » comme la mise en page, la palette, les espacements peuvent être apprises ; les « résultats » comme les logos, icônes, illustrations et textes ne doivent pas être copiés directement.

**Soyez prudent dans les projets commerciaux.** Avant toute livraison commerciale, vérifiez : les droits des assets, les licences de polices (les polices commerciales doivent être achetées), les conditions d'utilisation des sites de référence.

**L'attribution des contenus générés par l'IA.** Les conditions varient selon les plateformes (Claude Design, Open Design, etc.), consultez les conditions de service avant une utilisation commerciale.

**Indiquez la participation de l'IA.** Certaines plateformes / réglementations exigent de rendre public qu'un contenu est généré par l'IA.

**Contrôle final.** Pour les scénarios sensibles comme les identités de marque et les supports publicitaires, une vérification humaine est indispensable.

::: tip 💡 Recommandation
Pendant les phases d'apprentissage et de prototype, laissez-vous aller librement à l'imitation ; **au moment de la livraison commerciale, transformez la « référence » en « recréation à partir de votre propre design system », et conservez les traces de génération**.
:::

---

## Résumé

Ce chapitre a inscrit « l'initiation au design frontend » sur un chemin exécutable :

1. **Mentalité** : l'initiation au design frontend commence par « copier », copier les règles, pas les résultats
2. **Regarder** : décomposez n'importe quelle page avec la structure (4 grandes sections) + le visuel (couleurs/polices/espacements/coins arrondis) + les composants, les DevTools sont votre analyseur
3. **Outils** : 2 voies — Figma/MasterGo (maquette précise), Claude Design / Open Design + UI design Skills (prototype dialogué)
4. **Imiter** : choisir la cible → décomposer → générer → itérer section par section → valider par comparaison pixel par pixel
5. **Consolider** : transformez le DESIGN.md des grandes entreprises en votre propre design system, puis figez-le avec un Skill

::: tip 💡 Prochaine étape
Faites aujourd'hui même un exercice complet d'imitation :
1. Trouvez une landing page que vous voulez « copier », décomposez ses couleurs/polices/espacements/coins arrondis avec les DevTools
2. Générez la première version avec Claude Design ou Open Design, modifiez section par section jusqu'à la « ressemblance »
3. Confiez la version validée à l'IA pour la transformer en code, et en profitez pour enregistrer votre propre DESIGN.md
:::

<RelatedArticlesSection
  title="Articles associés"
  description="Poursuivez l'apprentissage du design IA, de la production d'assets et de la pratique de conversion du design en code."
  :items="relatedArticles"
/>
