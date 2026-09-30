# Introduction à Figma et MasterGo

<script setup>
import { relatedArticlesMap } from '@theme/data/relatedArticles'

const relatedArticles = relatedArticlesMap['zh-cn/stage-2/frontend/figma-mastergo'] ?? []
</script>

::: tip 🎯 Question centrale
**Comment créer un prototype de page web depuis zéro avec des outils de conception modernes ?**
:::

---

## 1. Pourquoi apprendre les outils de conception frontend ?

Avant de commencer, nous devons comprendre une question : pourquoi a-t-on besoin d'apprendre des « outils de conception frontend » ? Après tout, on peut très bien construire des pages directement en HTML/CSS, alors est-ce vraiment nécessaire d'apprendre un logiciel et une technologie supplémentaires ?

En réalité, faire fonctionner une page et bien concevoir un produit sont deux concepts totalement différents. Le code se préoccupe uniquement de comment rendre dans le navigateur et comment s'exécuter sur différents appareils ; les outils de conception frontend résolvent les problèmes de distribution de l'information : comment organiser les interactions frontend, comment gérer la navigation entre les pages, comment hiérarchiser les priorités visuelles. Il suffit de créer un canevas dans l'outil de conception pour comparer et déterminer la mise en page, la hiérarchie d'information et les modes d'interaction sur un seul écran, afin de choisir la présentation la plus appropriée.

Si l'on commence directement à coder ou si l'on demande à l'IA de générer des pages frontend complètes, l'expérience utilisateur ne sera généralement pas très bonne. Les produits rigoureux prennent en compte le confort de l'interaction utilisateur-frontend ainsi que la répartition du contenu à transmettre sur les différentes pages. En concevant d'abord la mise en page du point de vue de l'utilisateur, puis en procédant à la conversion ou à la génération de code.

De plus, du point de vue de la collaboration en équipe, les outils de conception frontend réduisent également les coûts de coopération entre les différentes parties : designers, chefs de produit et développeurs ne se retrouvent plus chacun face à des images mentales ou des descriptions de code abstraites. Ils supportent la collaboration en temps réel, permettant à tous de discuter de la gestion des versions, des changements de besoins et des retours autour d'un canevas visible, annotable et itérable. Plus encore, les outils de conception frontend modernes ne se contentent plus d'être des logiciels de dessin : génération partielle de code en un clic, gestion de systèmes de conception et de bibliothèques de composants. Les outils de conception de nouvelle génération peuvent automatiser ou traiter par lots une grande partie du travail répétitif (alignement, annotation, exportation, modification de styles), améliorant considérablement l'efficacité du développement de la conception de pages.

![](/zh-cn/stage-2/frontend/figma-mastergo/images/image8.webp)

### 1.1 L'évolution des outils de conception frontend

Au fil du temps, les outils dits de conception frontend représentent en réalité une technologie en constante évolution. De l'ère Photoshop des années 90, centrée sur l'édition d'images bitmap locales, à Sketch qui a apporté les flux de travail vectoriels et componentisés vers 2010, puis à Figma qui a définitivement déplacé la collaboration vers le cloud après 2016. Les équipes de conception sont progressivement passées du travail individuel à la collaboration en temps réel. En 2025, l'IA est désormais intégrée de manière concrète dans ces outils : de la « génération de maquettes de page à partir d'une phrase » à la « conversion directe de maquettes en structures frontend exécutables », le « design as code » et la « co-création homme-machine » passent du concept à une véritable productivité.

Dans cette section, nous présenterons les deux outils de conception frontend modernes les plus représentatifs : Figma et MasterGo. D'une part, ils couvrent tous les deux les capacités clés nécessaires à l'UI/UX moderne (édition vectorielle, système de composants, mise en page automatique, livraison de code, etc.), et peuvent vous accompagner dans le cycle complet, du wireframe au haute fidélité jusqu'à la livraison au développement. D'autre part, ces deux outils ont progressivement intégré des fonctionnalités IA pratiques après 2025, vous aidant à transformer vos maquettes en véritables programmes exécutables tout en préservant le prototype intact.

## 1.2 Le voyage de la création

![](/zh-cn/stage-2/frontend/figma-mastergo/images/image9.webp)

À l'époque où les outils dédiés au frontend n'existaient pas encore, le travail de conception visuelle de toute l'industrie du design d'interface était, pendant très longtemps, assuré par des logiciels de conception « polyvalents » comme Photoshop. Les designers créaient localement, par superposition de calques, la conception visuelle globale de la page, puis livraient le fichier source .psd, souvent volumineux, à l'ingénieur frontend — qui devait alors accomplir manuellement trois tâches fastidieuses mais cruciales pour reproduire fidèlement la maquette :

Premièrement, le « découpage d'images » : il fallait extraire un par un les éléments visuels indépendants (boutons, icônes, logos, modules d'arrière-plan, etc.) de la structure multicouche du fichier .psd, puis les exporter dans des formats d'image directement chargeables par le web comme PNG ou JPG (puisque le web ne peut pas identifier directement les informations de calques PSD, il ne peut s'appuyer que sur ces images découpées pour afficher les détails).

![](/zh-cn/stage-2/frontend/figma-mastergo/images/image10.webp)

Deuxièmement, le « mesurage des dimensions » : il fallait utiliser l'outil de mesure du logiciel pour vérifier逐一 la largeur, la hauteur et les espacements (margin/padding) entre différents modules, afin de garantir que toutes les dimensions soient précises au pixel près.

![](/zh-cn/stage-2/frontend/figma-mastergo/images/image11.webp)

Troisièmement, l'« extraction des annotations » : il fallait extraire de la maquette les paramètres invisibles mais indispensables — comme la taille de police, le poids, l'interligne, les valeurs de couleur RGB ou HEX de chaque bloc de couleur, etc. Cela équivalait à extraire et consigner manuellement les « spécifications de conception » que le designer n'avait pas écrites sur papier.

![](/zh-cn/stage-2/frontend/figma-mastergo/images/image12.webp)

Ce n'est qu'après ces étapes que la phase d'implémentation frontend pouvait véritablement commencer. Que l'on utilise du HTML/CSS/JS natif ou des frameworks comme Vue ou React, le processus fondamental est le même. Le frontend utilise le « conteneur comme support central », reconstruisant la structure de la page selon la hiérarchie et la sémantique des différents modules du design. Ici, le conteneur désigne une unité avec des limites de mise en page clairement définies, dédiée à l'accueil et à l'organisation des éléments enfants. Il n'affiche pas directement le contenu, mais délimite la plage d'arrangement des éléments internes via des règles comme Flex ou Grid. Les « blocs structurels » (comme la barre de navigation supérieure, la barre latérale, la zone de liste d'articles, le pied de page, etc. — zones fonctionnelles/contenus visibles) s'appuient sur les conteneurs ; chaque bloc structurel imbrique à son tour des conteneurs plus petits pour organiser les éléments. Par exemple, un élément de liste d'articles sera contrôlé par un « conteneur d'élément de liste » qui gère le remplissage interne et la mise en page d'ensemble, puis enveloppe les détails comme le titre, le résumé, l'heure et l'icône de couverture.

![](/zh-cn/stage-2/frontend/figma-mastergo/images/image13.webp)

Dans les frameworks frontend modernes, ces « blocs structurels (et les conteneurs et éléments associés) » sont généralement implémentés sous forme de « composants ». Un composant peut être simplement compris comme une unité d'interface réutilisable avec des limites claires, intégrant la mise en page des conteneurs et la logique. Il contient à la fois les conteneurs qui contrôlent l'apparence et l'arrangement (par exemple, le « composant bouton » définit la largeur, la hauteur et les coins arrondis via le conteneur ; le « composant carte d'article » organise la position du titre et de la couverture via le conteneur) et encapsule la logique d'interaction. Les éléments qui apparaissent de manière répétée dans la maquette avec une apparence cohérente (comme les boutons de style uniforme, les cartes d'articles réutilisées) sont abstraits en composants dans le code : ils peuvent être réutilisés dans différentes pages/scènes, réduisant le développement répétitif, et garantissent une cohérence élevée de mise en page et de style à travers les règles unifiées des conteneurs internes du composant.

Ensuite, le frontend utilise le système de styles pour reproduire le visuel et la mise en page. Les ressources exportées lors de la phase de découpage d'images (PNG, JPG, etc.) sont intégrées comme `<img>`, images d'arrière-plan dans les composants ou blocs structurels, ou importées selon les méthodes recommandées par chaque framework. Les valeurs spécifiques de largeur, hauteur, espacement et interligne obtenues lors du mesurage sont transcrites en propriétés de style comme `width`, `height`, `margin`, `padding`, `line-height`, appliquées aux composants ou blocs structurels correspondants. Les couleurs, polices, ombres, coins arrondis et états hover/active compilés lors de l'annotation sont quant à eux appliqués via `color`, `font-family`, `font-size`, `box-shadow`, `border-radius` et les pseudo-classes ou classes d'état dans les solutions spécifiques comme CSS, CSS Modules, CSS-in-JS ou Tailwind. À ce stade, le découpage, les dimensions et les annotations fournissent un ensemble de paramètres visuels précis, tandis que les composants et blocs structurels fournissent les unités d'organisation de code pour porter ces paramètres. L'ensemble forme une implémentation d'interface maintenable et réutilisable.

![](/zh-cn/stage-2/frontend/figma-mastergo/images/image14.webp)

Cependant, le modèle centré sur les fichiers locaux est intrinsèquement inefficace. Les versions sont transmises par email et cloud, les anciens et nouveaux fichiers se confondent facilement, et la collaboration entre design et développement repose largement sur les méthodes d'interaction complexes décrites ci-dessus, avec des coûts de coopération et des risques d'erreur non négligeables.

Avec l'essor du mobile, la complexité des interfaces et les besoins d'itération rapide ont fortement augmenté, et le côté « tout-en-un » de Photoshop est apparu de plus en plus lourd. C'est à cette période qu'est apparu Sketch. Sketch se concentre sur le design UI lui-même, débarrassé de la plupart des contraintes liées au post-traitement visuel. Il utilise les Symbols pour componentiser les éléments très réutilisables comme les boutons, la navigation et les champs de saisie — une seule modification se synchronise globalement. Combiné à des outils comme Zeplin, il génère automatiquement les annotations et les fragments de style. Sketch a introduit la « pensée composant » dans le flux de travail de conception. Cependant, il reste une application de bureau basée sur des fichiers locaux ; la collaboration en temps réel nécessite des contournements via le cloud, des plugins tiers ou des outils de versionning, et ne résout pas fondamentalement le problème de « plusieurs personnes modifiant simultanément le même fichier ».

![](/zh-cn/stage-2/frontend/figma-mastergo/images/image15.webp)

Ce qui a véritablement changé la donne, c'est Figma. Dès 2016, il a intégré le design UI, le prototypage, les commentaires et la collaboration dans le navigateur, avec des fonctionnalités modernes : curseurs multiples en temps réel, commentaires en ligne, timeline de versions, liens de partage, etc. Ce qui semble très simple aujourd'hui représentait à l'époque un défi direct au modèle Photoshop/Sketch.

![](/zh-cn/stage-2/frontend/figma-mastergo/images/image16.webp)

Dès lors, le design d'interface n'est plus constitué de fichiers éparpillés sur les ordinateurs de chacun, mais d'un canevas cloud centralisé, en ligne et mis à jour en temps réel. Autour de ce canevas, on peut imaginer aller encore plus loin, en brouillant les frontières entre design et code frontend via l'automatisation ou l'IA.

Au tout début, nous ne pouvions nous appuyer que sur divers plugins de plateforme pour exporter de manière semi-automatique les composants et les informations de style des maquettes sous forme de fragments de code (comme des squelettes de composants React/Vue, des variables CSS, etc.). L'essence de cette approche était l'extraction d'informations structurées via des plugins. Ensuite, avec l'évolution des capacités des plateformes, la plupart d'entre elles ont commencé à supporter les fonctionnalités MCP (Model Context Protocol, Protocole de Contexte de Modèle) pour les grands modèles : ce protocole fournit un mécanisme standardisé permettant aux grands modèles d'accéder de manière sécurisée et contrôlée aux fichiers de conception, aux interfaces de plugins et aux métadonnées de projet, facilitant ainsi l'exportation des maquettes en code.

Plus tard encore, sur la base des plugins et de MCP, l'automatisation du code frontend est passée à un stade de support natif de la déduction directe de la structure de code à partir des maquettes. Nous pouvons désormais générer en un clic dans l'outil de conception le squelette du projet frontend, la hiérarchie des composants, le système de styles et le code correspondant. Cela libère designers et développeurs frontend du travail manuel de transfert des détails de conception, leur permettant de consacrer davantage d'énergie à l'optimisation de l'expérience utilisateur et aux mises à jour itératives des versions fonctionnelles.

---

## 2. Introduction à Figma

Passons maintenant des concepts abstraits à la pratique. Faute de temps, nous n'apprendrons que la logique de base de Figma, afin que même si vous n'avez jamais utilisé d'outil de conception, vous puissiez suivre les exercices. Si vous souhaitez apprendre Figma de manière complète, veuillez consulter les tutoriels officiels détaillés fournis par Figma : https://help.figma.com/hc/en-us/sections/30880632542743-Figma-Design-for-beginners

Vous pouvez aussi consulter le tutoriel suivant pour construire rapidement un site simple comme un portfolio personnel : https://help.figma.com/hc/en-us/sections/35895585621655-Figma-Sites-collectio

![](/zh-cn/stage-2/frontend/figma-mastergo/images/image17.webp)

Sur la gauche se trouve l'entrée pour la création de projets et la gestion des ressources, et en haut à droite, plusieurs boutons représentent les fonctionnalités courantes de Figma. Parmi eux, Make permet de demander à l'IA de générer d'abord une interface ou une structure approximative à partir d'une phrase, Design est l'espace de travail principal pour dessiner des interfaces web/app, créer des composants et fabriquer des prototypes, FigJam est un tableau blanc d'équipe pour coller des notes, dessiner des flux et mener des discussions préliminaires, Buzz est un outil de production de ressources de marque à grande échelle, utilisé pour générer du contenu en masse afin de maintenir la cohérence de la marque, et Site permet d'organiser ces conceptions en véritables pages web ou sites documentaires accessibles publiquement.

À première vue, Figma propose de nombreuses fonctionnalités et peut sembler difficile à prendre en main. Mais en réalité, ce type d'outil fonctionnel repose essentiellement sur la pratique : il ne faut pas craindre de faire des erreurs au début, ni chercher à tout réussir du premier coup. Il suffit de commencer à explorer, et avec la pratique, la maîtrise viendra naturellement.

Dans ce tutoriel, pour une prise en main rapide, nous présenterons brièvement la fonctionnalité Design.

### 2.1 Créer un nouveau fichier Design

Depuis la page d'accueil ou l'entrée en haut à droite, sélectionnez **Design** pour créer un nouveau fichier. Vous accéderez à un canevas de conception vide.
Cette interface se divise grossièrement en trois zones : à gauche, les pages et calques, pour visualiser et modifier les relations d'appartenance des pages et éléments ; au centre, le canevas, pour visualiser le résultat actuel ; à droite, les propriétés et styles, pour modifier les formes, couleurs et styles spécifiques ; et en bas, une barre d'outils, pour basculer entre les outils, comprenant la sélection, le dessin de formes, la saisie de texte, les commentaires, les plugins, etc. Après avoir sélectionné un outil, vous pouvez appuyer sur la touche Echap pour revenir à l'outil souris par défaut.

![](/zh-cn/stage-2/frontend/figma-mastergo/images/image18.png)

### 2.2 Créer votre première Frame (planche)

Avant de placer des éléments, il faut d'abord définir une limite claire pour la page, assumée par la Frame. Vous pouvez sélectionner l'outil Frame dans la barre d'outils inférieure, ou appuyer directement sur la touche F, puis tracer une zone rectangulaire sur le canevas.

1. Utilisez l'outil Frame dans la barre d'outils inférieure, ou appuyez directement sur `F`.
2. Tracez une zone rectangulaire sur le canevas, puis dans la barre de propriétés de droite, modifiez la largeur, par exemple à `1440`, et la hauteur à `900`.
3. Dans la barre de calques à gauche, renommez cette Frame, par exemple `My First Page` ou le nom de votre projet.

Cette Frame est le conteneur de page pour un écran entier. Ensuite, le titre, le texte, les boutons, les images, etc. doivent tous être placés à l'intérieur de cette Frame, et non éparpillés n'importe où sur le canevas. Organiser le contenu autour de la Frame comme limite permet de garder la structure sous contrôle lors des réglages de défilement, de l'adaptation aux différentes tailles d'appareils, de l'export d'écrans et de la création de prototypes.

![](/zh-cn/stage-2/frontend/figma-mastergo/images/image19.png)

### 2.3 Placer du texte et des éléments simples dans la Frame

Maintenant que nous avons un conteneur, apprenons à placer les composants les plus basiques, comme le titre, le sous-titre, le bouton et le bloc d'image placeholder.

1. Sélectionnez l'outil texte (le `T` dans la barre d'outils inférieure), cliquez dans la Frame et saisissez le titre de la page, par exemple : `My Portfolio`.
   Dans les propriétés de droite, augmentez la taille de police (par exemple 96) et mettez le poids en gras.
2. Sous le titre, utilisez à nouveau l'outil texte pour saisir une brève description, par exemple une ou deux phrases expliquant ce que fait la page.
   La taille de police peut être plus petite, avec un interligne légèrement plus grand pour une lecture plus aérée.
3. Dessinez une ébauche de bouton :
   Avec l'outil rectangle, dessinez un rectangle d'environ `200 × 48` sous le titre, donnez-lui une couleur de remplissage assez visible dans les propriétés de droite, et ajoutez un léger arrondi.
   ![](/zh-cn/stage-2/frontend/figma-mastergo/images/image20.png)
4. Puis utilisez l'outil texte pour saisir le libellé du bouton au-dessus du rectangle, par exemple `Get Started`. Sélectionnez ensemble le rectangle et le texte, et utilisez les outils d'alignement en haut pour centrer le texte horizontalement et verticalement.
5. Sur le côté du bouton ou en dessous, dessinez un grand rectangle gris clair comme « zone d'image placeholder », qui pourra servir plus tard à afficher une image.

Arrivé à ce stade, vous avez déjà une « maquette de page d'accueil » très rudimentaire mais structurellement complète : un titre, un paragraphe, un bouton et une zone d'affichage principale.

![](/zh-cn/stage-2/frontend/figma-mastergo/images/image21.png)

### 2.4 Utiliser Auto Layout pour organiser les éléments

Si tous les éléments sont simplement traînés au hasard, la page deviendra vite chaotique. Un concept très important dans Figma est l'**Auto Layout**, qui permet de transformer un groupe d'éléments en un conteneur avec des règles.

![](/zh-cn/stage-2/frontend/figma-mastergo/images/image22.png)

Vous pouvez sélectionner les trois éléments « titre principal + sous-titre + bouton », puis cliquer sur **Add Auto layout** dans la barre de propriétés de droite.

Ces trois éléments seront alors enveloppés dans un conteneur. Vous pouvez ajuster les paramètres dans la barre de droite, et la mise en page des éléments s'adaptera automatiquement :

- Sont-ils disposés verticalement ou horizontalement.
- Quel est l'espacement entre les éléments.
- Quelle est la marge interne (padding) entre l'ensemble et les bords du conteneur.

![](/zh-cn/stage-2/frontend/figma-mastergo/images/image23.png)

De même, l'intérieur du bouton peut aussi utiliser Auto Layout. Nous pouvons obtenir cet effet : lorsque le texte est modifié, la longueur du bouton s'ajuste automatiquement.

Sélectionnez d'abord le rectangle d'arrière-plan du bouton et le texte du bouton, ajoutez Auto Layout pour que ces deux éléments deviennent un « conteneur bouton ». Ensuite, sélectionnez ce conteneur bouton et réglez la largeur et la hauteur sur **Hug contents**. Ainsi, le texte restera toujours centré dans le bouton, et que le texte soit plus ou moins long, la largeur du bouton s'ajustera automatiquement.

![](/zh-cn/stage-2/frontend/figma-mastergo/images/image24.png)

### 2.5 Transformer le bouton en composant réutilisable

Nous allons maintenant apprendre un nouveau concept : les composants. Un composant est un élément qui peut être réutilisé. Par exemple, un bouton : dès que vous pressentez que vous l'utiliserez à nouveau, vous pouvez envisager d'en faire un composant. Partons du bouton avec Auto Layout que nous venons de créer :

1. Sélectionnez l'ensemble du conteneur bouton.
2. Faites un clic droit et choisissez Create component (créer un composant).
   ![](/zh-cn/stage-2/frontend/figma-mastergo/images/image25.png)

Ainsi, ce bouton passe d'un groupe de calques ordinaires à un composant maître. Ensuite, si vous avez besoin d'un bouton du même style dans d'autres pages ou Frames, il vous suffit de le glisser depuis le panneau Assets à gauche.

![](/zh-cn/stage-2/frontend/figma-mastergo/images/image26.png)

Tous les boutons ainsi utilisés sont des copies synchronisées de ce maître. Lorsque vous modifiez la couleur, les coins arrondis ou l'espacement du maître, toutes les instances se mettent automatiquement à jour.

![](/zh-cn/stage-2/frontend/figma-mastergo/images/image27.webp)

Vous avez maintenant acquis les bases de l'utilisation simple de Figma. Il n'est pas nécessaire de tout comprendre dès le début ; il suffit de suivre ce guide pour créer une première page simple, se familiariser avec ces quelques opérations clés, puis explorer progressivement les capacités supplémentaires des tutoriels officiels. Avec la pratique, la maîtrise viendra.

---

## 3. Introduction à MasterGo

Après avoir compris le flux de travail de base de Figma, découvrons MasterGo. Vous pouvez considérer MasterGo comme la version chinoise de Figma, avec quelques différences sur certaines fonctionnalités. Dans l'ensemble, il reprend une disposition d'interface et une philosophie d'utilisation similaires à Figma : même canevas, arbre de calques et panneau de propriétés, même support des composants, styles, mise en page automatique et collaboration multi-utilisateurs. Pour plus de détails, consultez le tutoriel officiel de MasterGo : https://mastergo.com/tutorials/12?%E5%85%A8%E7%A8%8B%E9%AB%98%E8%83%BD%EF%BC%8CMasterGo%20%E6%9C%80%E5%AE%8C%E6%95%B4%E5%AE%9E%E7%94%A8%E6%95%99%E7%A8%8B%EF%BC%8C%E8%AE%A9%E4%BD%A0%E4%BB%8E%E9%9B%B6%E5%88%B0%E7%B2%BE%E9%80%9A%EF%BC%81

### 3.1 Créer un nouveau fichier de conception

1. **Accéder au tableau de bord MasterGo**
   1. Ouvrez le site officiel de MasterGo et connectez-vous.
   2. Vous arriverez sur la page d'accueil avec la « liste de fichiers / liste de projets », pour gérer vos fichiers de conception.
      ![](/zh-cn/stage-2/frontend/figma-mastergo/images/image28.webp)

2. **Créer un nouveau fichier**
   1. Cliquez sur le bouton + Fichier de conception en haut à droite, ou choisissez d'importer des fichiers Figma ou autres.
   2. Après avoir cliqué, vous accéderez à un canevas vide : c'est l'espace de travail de conception de MasterGo.

3. **Découvrir les zones de base de l'interface**
   Une fois que vous savez utiliser Figma, l'utilisation de MasterGo est très similaire. L'interface se divise principalement en plusieurs zones :

   ![](/zh-cn/stage-2/frontend/figma-mastergo/images/image29.png)
   1. Barre d'outils supérieure : située en haut du canevas, avec à gauche l'emplacement et le nom du fichier, au centre une rangée de boutons d'outils courants (sélection, zone/planche, formes, texte, annotations, commentaires, sélection de plugins et outils IA, etc.), et à droite les membres actuellement en ligne, l'entrée de partage, ainsi que les contrôles de zoom et d'aperçu du canevas.
   2. Panneau latéral gauche : principalement divisé en calques et ressources. En restant sur l'onglet calques, vous voyez la liste des pages et la structure hiérarchique de tous les calques de la page.
   3. Zone de canevas centrale : l'espace de travail pour le dessin et la mise en page. Toutes les Frames, composants et graphiques y sont affichés.
   4. Panneau de propriétés droit : pour visualiser et modifier les propriétés de l'objet sélectionné, comme la taille, la position, l'alignement, le remplissage d'arrière-plan, les bordures, les coins arrondis, etc. Si aucun objet n'est sélectionné, les paramètres du canevas s'affichent, comme la couleur d'arrière-plan, les étiquettes et les options d'export.

### 3.2 Créer votre première Frame

Avant de placer des éléments, nous avons besoin d'un conteneur de page pour définir les limites et les dimensions de l'interface. Ce conteneur s'appelle généralement une Frame dans MasterGo.

**Étapes :**

1. **Sélectionner l'outil Frame**
   1. Trouvez l'outil Frame / Planche dans la barre d'outils, puis cliquez pour créer directement le contenu avec les paramètres prédéfinis.
   2. Ou utilisez le raccourci (généralement `F`, en cas de différence, se référer à l'interface réelle).
2. **Tracer une zone rectangulaire sur le canevas**
   1. Après avoir tracé, vous verrez une zone avec un cadre de sélection.
   2. Dans le panneau de propriétés de droite, vous pouvez voir la largeur et la hauteur de cette Frame.
   3. Réglez la largeur, par exemple, à `1440`, et la hauteur à `900` (l'une des tailles courantes pour une page web plein écran).
3. **Renommer la Frame**
   1. Dans le panneau de calques à gauche, trouvez cette Frame.
   2. Double-cliquez sur le nom et changez-le pour le nom de votre projet, par exemple : `My First Page`, ou tout autre nom de page de votre choix.

![](/zh-cn/stage-2/frontend/figma-mastergo/images/image30.png)

### 3.3 Créer le contenu de la planche

Avec le conteneur, en utilisant des méthodes similaires à celles apprises dans Figma, il est facile d'obtenir une page de présentation similaire. (Vous pouvez essayer de copier les éléments textuels de la planche Figma ; l'importation directe par collage des composants texte est prise en charge.)

![](/zh-cn/stage-2/frontend/figma-mastergo/images/image31.png)

Il est à noter que le comportement de la fonctionnalité Auto Layout est légèrement différent. Dans MasterGo, si vous souhaitez obtenir le même effet que Figma où la longueur du bouton s'adapte à la longueur du texte, vous devez d'abord créer un conteneur ou composant basé sur l'élément rectangulaire correspondant, comme illustré :

![](/zh-cn/stage-2/frontend/figma-mastergo/images/image32.png)

Après avoir créé le conteneur avec succès, placez le rectangle du bouton et le texte dans le conteneur correspondant côte à côte, puis trouvez le bouton Auto Layout sur la droite pour activer la fonction automatique. Vous obtiendrez ainsi un bouton dont la largeur s'adapte à la longueur du texte.

![](/zh-cn/stage-2/frontend/figma-mastergo/images/image33.png)

![](/zh-cn/stage-2/frontend/figma-mastergo/images/image34.png)

### 3.4 Génération de pages par IA

![](/zh-cn/stage-2/frontend/figma-mastergo/images/image35.png)

Dans MasterGo, une fonctionnalité intéressante mérite d'être signalée : la génération de pages par IA. Vous pouvez utiliser une phrase ou fournir une image de référence pour générer des composants éditables dans MasterGo et obtenir du code directement utilisable. Vous pouvez saisir vos besoins directement en chinois ou en anglais, et la page retournera un document structuré avec la mise en page correspondant aux besoins. Voici le résultat :

![](/zh-cn/stage-2/frontend/figma-mastergo/images/image36.png)

![](/zh-cn/stage-2/frontend/figma-mastergo/images/image37.webp)

Une fois la génération du document de conception terminée, cliquez sur commencer la génération, attendez un instant et vous obtiendrez le résultat de la page web réelle :

![](/zh-cn/stage-2/frontend/figma-mastergo/images/image38.webp)

Vous avez alors deux options : cliquer sur le bouton bleu pour insérer directement le résultat dans le canevas, ou cliquer sur la fonction d'aperçu du code pour obtenir directement le code complet de la page actuelle. L'interface de fonctionnement spécifique est la suivante :

![](/zh-cn/stage-2/frontend/figma-mastergo/images/image39.webp)

![](/zh-cn/stage-2/frontend/figma-mastergo/images/image40.webp)

Après avoir inséré le résultat dans le canevas, vous pouvez encore ajuster plus finement la mise en page d'ensemble de la page et les détails des éléments (comme la police, les couleurs, les espacements, etc.) jusqu'à ce que le résultat final corresponde entièrement à vos attentes.

![](/zh-cn/stage-2/frontend/figma-mastergo/images/image41.webp)

---

## 4. Prochaine étape : du prototype au code

Dans les sections précédentes, nous avons appris les opérations de base de Figma et MasterGo, et sommes capables de créer des prototypes d'interface structurellement complets. L'étape clé suivante est : **comment transformer ces maquettes en code frontend véritablement exécutable dans un navigateur ?**

::: tip 📚 Tutoriel suivant
Pour une présentation détaillée des méthodes, veuillez consulter [Du prototype de conception au code de projet](../design-to-code/), où vous apprendrez :

- **Conversion directe par IA multimodale** : envoyer une capture de la maquette à l'IA pour générer directement du code HTML/React
- **Figma Make** : utiliser l'outil IA officiel de Figma pour restaurer la conception avec haute précision et exporter le code
- **MasterGo AI** : générer en un clic des pages éditables et obtenir le code

Ces méthodes ont chacune leurs avantages et inconvénients, et s'adaptent à différents scénarios. Il est recommandé de choisir le flux de travail le plus adapté selon les besoins du projet.
:::

---

## 5. Résumé

Au cours de ce chapitre, vous avez acquis :

1. **La valeur des outils de conception frontend** : compris pourquoi ces outils sont nécessaires et comment ils résolvent les problèmes de distribution de l'information et de collaboration en équipe.

2. **Les opérations de base de Figma** :
   - Créer des fichiers Design et des planches Frame
   - Ajouter des éléments de base comme le texte et les formes
   - Utiliser Auto Layout pour des mises en page adaptatives
   - Créer un système de composants réutilisables

3. **Les opérations de base de MasterGo** :
   - Se familiariser avec la disposition d'interface similaire à Figma
   - Créer des Frames et du contenu de planche basique
   - Utiliser la fonctionnalité de génération de pages par IA pour créer rapidement des prototypes

::: tip 💡 Prochaine étape
Maintenant que vous maîtrisez les bases des outils de conception frontend, vous pouvez essayer de :
- Concevoir une page de portfolio personnel
- Concevoir des prototypes d'interface pour vos projets à venir
- Apprendre [Du prototype de conception au code de projet](../design-to-code/) pour transformer vos maquettes en code exécutable

Si vous travaillez sur le projet [Créons ensemble des portraits de Poudlard](../hogwarts-portraits/), vous pouvez d'abord concevoir le prototype d'interface, puis exporter le code pour le combiner avec les fonctionnalités de dialogue IA.
:::

<RelatedArticlesSection
  title="Articles associés"
  description="Il est recommandé de poursuivre l'apprentissage de la conception UI avancée et de la pratique de conversion du design en code."
  :items="relatedArticles"
/>
