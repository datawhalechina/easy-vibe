# Du prototype de conception au code de projet

::: tip 🎯 Question centrale
**Comment transformer les prototypes des outils de conception en code frontend véritablement exécutable dans un navigateur ?**
:::

---

## 1. Trois chemins du prototype au code

Après avoir terminé la conception d'interface avec des outils de conception frontend modernes comme Figma ou MasterGo, une question très pratique se pose naturellement : comment convertir ces maquettes structurellement complètes en code frontend véritablement exécutable dans un navigateur ?

En général, la transformation du prototype en code suit trois chemins typiques :

| Chemin | Méthode | Caractéristiques | Scénario applicable |
|------|------|------|------|
| **Chemin 1** | Utiliser un grand modèle multimodal pour restaurer le code à partir d'une image | Flexible, ne nécessite pas d'outil spécifique | Validation rapide de prototype, pages simples |
| **Chemin 2** | Exporter le code via les capacités propres de la plateforme ou des plugins | Haute fidélité de restitution, forte éditable | Utilisateurs Figma/MasterGo |
| **Chemin 3** | Combiner la plateforme avec les capacités MCP pour exporter le code | Haut degré d'automatisation, personnalisable | Flux de travail nécessitant une intégration approfondie |

Cet article présentera en détail les méthodes de mise en œuvre de ces trois chemins, pour vous aider à choisir le flux de travail le plus adapté selon les besoins de votre projet.

::: tip 📚 Prérequis
Avant de commencer cette section, il est recommandé d'avoir étudié le tutoriel [Introduction à Figma et MasterGo](../figma-mastergo/), afin de maîtriser les opérations de base des outils de conception frontend.
:::

---

## 2. Chemin 1 : Restauration directe du code par IA multimodale

Les grands modèles dotés de capacités visuelles possèdent nativement la capacité de convertir des images en code. Il suffit d'importer directement la capture de la maquette dans la boîte de dialogue, puis de demander au grand modèle de générer le code complet du résultat.

### 2.1 Processus opérationnel

1. **Capturer l'image de la maquette**
   - Dans Figma ou MasterGo, exportez la page conçue au format PNG ou JPG
   - Assurez-vous que la capture contient la mise en page complète de la page

2. **Choisir un modèle IA multimodal**
   - Vous pouvez utiliser Gemini, Qwen, Claude et d'autres modèles prenant en charge l'entrée d'image
   - Nous utiliserons Gemini pour la démonstration

3. **Rédiger le prompt**
   ```
   Veuillez générer le code HTML/CSS correspondant à partir de cette maquette de conception.
   Exigences :
   - Utiliser une mise en page CSS moderne (Flexbox/Grid)
   - Design responsive, adapté aux différentes tailles d'écran
   - Inclure tous les éléments UI visibles
   - Couleurs et tailles de police fidèles à la maquette autant que possible
   ```

![](/zh-cn/stage-2/frontend/design-to-code/images/image42.png)

4. **Obtenir et sauvegarder le code**
   - Demander au modèle de retourner le code HTML complet
   - Sauvegarder sous un seul fichier `.html` pour faciliter les tests locaux
   - Vous pouvez ensuite le convertir en React ou d'autres frameworks dans votre IDE local

### 2.2 Problèmes courants et solutions

La génération de pages n'est pas une tâche simple. Vous pourriez rencontrer de nombreux problèmes au cours du processus :

| Problème | Solution |
|------|----------|
| Disposition inégale de l'interface | Décrire à l'IA le problème de mise en page spécifique, demander d'ajuster le margin/padding du CSS |
| Affichage incomplet de l'interface | Vérifier si le viewport est correctement défini, demander d'ajouter des points de rupture responsive |
| Fidélité des couleurs imprécise | Utiliser un outil de pipette pour obtenir les valeurs de couleur exactes de la maquette et les fournir à l'IA |
| Police non correspondante | Spécifier le nom exact de la police ou demander d'utiliser Google Fonts comme substitut |

::: tip 💡 Astuce
Il est recommandé de générer d'abord le code HTML, puis de l'importer dans votre IDE local pour le convertir en framework React. Vous obtiendrez ainsi plusieurs fichiers HTML indépendants, faciles à convertir uniformément en framework.
:::

### 2.3 MasterGo AI pour la génération de pages

MasterGo offre également une puissante fonctionnalité de génération de pages par IA, capable de générer directement du code web exploitable à partir d'images de référence.

#### Trouver l'entrée de la fonctionnalité IA

Dans la barre d'outils supérieure de l'interface d'édition MasterGo, vous trouverez le bouton d'outil IA :

![](/zh-cn/stage-2/frontend/design-to-code/images/image47.png)

#### Processus de génération

1. **Télécharger une image de référence**
   - Téléchargez l'image de référence de conception de la même manière que pour l'IA multimodale
   - Ajoutez une description textuelle des besoins

2. **Consulter le résultat de la génération**

![](/zh-cn/stage-2/frontend/design-to-code/images/image48.webp)

![](/zh-cn/stage-2/frontend/design-to-code/images/image49.webp)

3. **Obtenir le code**
   - Cliquez sur le bouton bleu « Insérer dans le canevas » pour éditer directement la page web générée
   - Ou cliquez sur le bouton « Code » à droite pour copier le contenu du code en local

![](/zh-cn/stage-2/frontend/design-to-code/images/image50.png)

---

## 3. Chemin 2 : Capacités de la plateforme ou plugins pour exporter le code

### 3.1 Figma Make pour la génération de code

Figma Make est un outil de conception IA officiellement lancé par Figma, capable de restaurer avec haute précision l'interface UI d'un prototype web à partir de prompts ou d'images de référence saisis par l'utilisateur.

#### Caractéristiques fonctionnelles

- **Restauration haute précision** : par rapport à la génération de code par IA native, l'effet est meilleur
- **Éditable** : le résultat généré peut être converti en fichier Figma Design modifiable
- **Intégration GitHub** : supporte la synchronisation directe du code vers GitHub

::: tip 🔑 Note sur les permissions
L'utilisation complète de Figma Make nécessite les permissions utilisateur Pro. Les étudiants peuvent obtenir gratuitement les permissions Pro via la certification éducation.
:::

#### Étapes opérationnelles

1. **Accéder à Figma Make**
   - Cliquez sur le bouton Make sur la page d'accueil de Figma
   - Ou visitez [Figma Make](https://www.figma.com/make)

2. **Télécharger une image de référence**
   - Téléchargez l'image de conception que vous souhaitez restaurer dans la boîte de dialogue
   - Ajoutez un prompt décrivant les besoins

![](/zh-cn/stage-2/frontend/design-to-code/images/image43.webp)

3. **Consulter le résultat de la génération**
   - Attendez quelques instants pour voir le résultat rendu
   - Cliquez sur le bouton de lecture en haut à droite pour un aperçu plein écran

![](/zh-cn/stage-2/frontend/design-to-code/images/image44.webp)

4. **Ajustements de détail**
   - Cliquez sur l'icône de l'éditeur en haut à droite (icône souris et règle)
   - Retournez dans l'interface familière de Figma Editor pour des ajustements détaillés

![](/zh-cn/stage-2/frontend/design-to-code/images/image45.webp)

5. **Exporter le code**
   - Après être satisfait des ajustements, sélectionnez l'export de code
   - Vous pouvez vous connecter directement à GitHub pour sauvegarder le code

![](/zh-cn/stage-2/frontend/design-to-code/images/image46.png)

### 3.2 Export de code via plugins

Outre les fonctionnalités IA natives de la plateforme, Figma et MasterGo supportent tous deux l'export de code via des plugins :

**Plugins Figma courants :**
- **Figma to Code** : convertit les maquettes en code React, Vue, HTML, etc.
- **Anima** : génération de code haute fidélité, supporte les effets d'interaction
- **Locofy** : outil de conversion design vers code piloté par IA

**Étapes d'utilisation :**
1. Ouvrez le panneau des plugins dans Figma (Plugins)
2. Recherchez et installez le plugin d'export de code souhaité
3. Sélectionnez les éléments de conception à exporter
4. Exécutez le plugin, choisissez le framework cible et le format de code
5. Copiez ou téléchargez le code généré

---

## 4. Chemin 3 : Combiner la plateforme avec MCP pour exporter le code

### 4.1 Qu'est-ce que MCP ?

MCP (Model Context Protocol, Protocole de Contexte de Modèle) est un protocole standard ouvert qui permet aux modèles IA d'accéder de manière sécurisée et contrôlée à des outils externes et des sources de données. Dans le contexte des outils de conception frontend, MCP permet aux grands modèles de lire directement la structure, les styles et les informations de composants des fichiers de conception, pour générer du code plus précis.

### 4.2 Principe de fonctionnement de MCP

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  Modèle IA   │ ←→  │ Serveur MCP │ ←→  │ Outil de     │
│  (Claude etc)│     │ (adaptation) │     │ conception   │
│              │     │  protocole   │     │(Figma/MasterGo)│
└─────────────┘     └─────────────┘     └─────────────┘
```

**Flux de travail :**
1. Le modèle IA envoie une requête à l'outil de conception via le protocole MCP
2. L'outil de conception retourne des données de conception structurées (calques, styles, composants, etc.)
3. Le modèle IA comprend la structure de conception et génère le code correspondant
4. Le code peut être directement exporté ou synchronisé vers l'environnement de développement

### 4.3 Figma + MCP en pratique

#### Préparation de l'environnement

1. **Installer le serveur MCP**
   ```bash
   # Installer le serveur Figma MCP via npx
   npx figma-mcp-server
   ```

2. **Configurer Claude Desktop ou un autre outil IA supportant MCP**
   ```json
   {
     "mcpServers": {
       "figma": {
         "command": "npx",
         "args": ["figma-mcp-server"],
         "env": {
           "FIGMA_ACCESS_TOKEN": "your-figma-token"
         }
       }
     }
   }
   ```

3. **Obtenir un Figma Access Token**
   - Connectez-vous à Figma → Settings → Personal Access Tokens
   - Générez un nouveau Token et sauvegardez-le

#### Flux d'utilisation

1. **Activer la connexion MCP dans l'outil IA**
   - Ouvrez Claude Code ou un autre IDE supportant MCP
   - Confirmez que le serveur MCP est connecté

2. **Fournir le lien du fichier de conception**
   ```
   Utilisateur : Aidez-moi à convertir ce design Figma en code React
   Lien : https://www.figma.com/file/xxxxx
   
   IA : Je me suis connecté à Figma via MCP, lecture de la structure du fichier de conception en cours...
   ```

3. **L'IA analyse et génère automatiquement le code**
   - Le serveur MCP récupère l'arbre de calques du fichier de conception
   - L'IA comprend la structure des composants et les propriétés de style
   - Génère des composants React/Vue avec un nommage et une structure corrects

4. **Itération et optimisation**
   ```
   Utilisateur : Veuillez extraire le composant bouton en un composant réutilisable indépendant
   
   IA : D'accord, j'ai identifié via MCP le composant Button dans le système de conception,
       génération en cours d'un composant React avec interface props...
   ```

### 4.4 Avantages de MCP

| Caractéristique | Approche traditionnelle | Approche MCP |
|------|----------|----------|
| **Précision des données** | Dépend des captures, détails potentiellement perdus | Lecture directe des données de conception brutes |
| **Identification des composants** | L'IA doit deviner les limites des composants | Obtention précise des définitions de composants |
| **Fidélité des styles** | Estimation basée sur les pixels | Obtention des tokens de conception exacts |
| **Efficacité d'itération** | Chaque modification nécessite une nouvelle capture | Synchronisation en temps réel des changements de conception |
| **Degré d'automatisation** | Copier-coller manuel | Écriture directe possible dans les fichiers du projet |

### 4.5 Outils MCP actuellement disponibles

**MCP pour outils de conception :**
- **Figma MCP Server** : implémentation MCP officiellement supportée
- **MasterGo MCP** : adaptateur MasterGo développé par la communauté

**MCP pour environnements de développement :**
- **Claude Code** : support natif du protocole MCP
- **Cline** : plugin VS Code, supporte les connexions MCP
- **Trae** : peut activer les fonctionnalités MCP via configuration

::: tip 🔮 Perspectives futures
Le protocole MCP évolue rapidement, et l'intégration entre outils de conception et environnements de développement deviendra encore plus étroite. D'autres solutions de synchronisation en un clic du design vers le code devraient apparaître, réduisant encore davantage la distance entre conception et développement.
:::

---

## 5. Travail après l'export du code

### 5.1 Tests locaux

Après avoir obtenu le code, ouvrez-le dans votre IDE local et testez-le :

1. **Créer un nouveau projet**
   ```bash
   # Si c'est un fichier HTML, ouvrez-le directement dans le navigateur
   open index.html
   
   # Si c'est un projet React/Vue
   npm install
   npm run dev
   ```

2. **Collaborer avec un IDE IA**
   - Importez le code généré dans Trae ou un autre IDE IA
   - Laissez l'IA vous aider à corriger les problèmes de mise en page et à ajouter des fonctionnalités interactives

### 5.2 Traitement des problèmes courants

| Étape | Problème | Solution |
|------|------|----------|
| Mise en page | Éléments décalés | Vérifier les propriétés CSS display et position |
| Styles | Couleurs incohérentes | Utiliser les outils de développement du navigateur pour vérifier les couleurs réellement appliquées |
| Responsive | Affichage anormal sur mobile | Ajouter des points de rupture media query |
| Interaction | Boutons sans réponse | Vérifier la liaison des événements JavaScript |

---

## 6. Comparaison des trois chemins et recommandations

### 6.1 Comparaison des chemins

| Dimension | Chemin 1 : IA multimodale | Chemin 2 : Capacités plateforme | Chemin 3 : MCP |
|------|------------------|------------------|-------------|
| **Difficulté de prise en main** | ⭐ Simple | ⭐⭐ Moyen | ⭐⭐⭐ Assez complexe |
| **Précision de restitution** | ⭐⭐⭐ Moyenne | ⭐⭐⭐⭐ Élevée | ⭐⭐⭐⭐⭐ Maximale |
| **Flexibilité** | ⭐⭐⭐⭐⭐ Élevée | ⭐⭐⭐ Moyenne | ⭐⭐⭐⭐ Assez élevée |
| **Degré d'automatisation** | ⭐⭐ Faible | ⭐⭐⭐ Moyen | ⭐⭐⭐⭐⭐ Maximale |
| **Coût** | Faible (facturation à l'usage API) | Moyen (peut nécessiter Pro) | Faible (outils open source) |

### 6.2 Recommandations

**Choisir le Chemin 1 (IA multimodale) si :**
- Vous avez besoin de valider rapidement une idée
- L'outil de conception n'est pas fixe, vous changez souvent
- Les exigences de fidélité de restitution ne sont pas très élevées
- Le budget est limité

**Choisir le Chemin 2 (capacités plateforme) si :**
- L'équipe utilise principalement Figma ou MasterGo
- Une restitution de code haute précision est nécessaire
- Les designers et développeurs doivent collaborer fréquemment
- Vous êtes prêt à investir dans une version Pro

**Choisir le Chemin 3 (MCP) si :**
- Vous visez le plus haut degré d'automatisation
- Vous avez les compétences techniques pour configurer l'environnement MCP
- Le projet nécessite des itérations fréquentes du design vers le code
- Vous souhaitez établir un flux de travail standardisé design-développement

---

## 7. Résumé

Au cours de ce chapitre, vous avez maîtrisé les trois chemins clés du prototype de conception au code :

1. **Conversion directe par IA multimodale** : flexible et rapide, adaptée à la validation de prototypes
2. **Capacités natives de la plateforme** : haute fidélité, adaptée aux flux de travail de conception professionnels
3. **Intégration du protocole MCP** : degré d'automatisation le plus élevé, représente la tendance future

::: tip 💡 Meilleures pratiques
- **Recommandation pour les débutants** : commencer par le Chemin 1 (IA multimodale) pour une prise en main rapide
- **Collaboration en équipe** : utiliser le Chemin 2 (capacités plateforme) pour garantir la cohérence du design
- **Priorité à l'efficacité** : essayer le Chemin 3 (MCP) pour établir un flux de travail automatisé
- **Utilisation mixte** : basculer flexiquement entre les différents chemins selon la phase du projet
:::

---

## Ressources de référence

- [Introduction à Figma et MasterGo](../figma-mastergo/) - Apprendre les bases des outils de conception
- [Créons ensemble des portraits de Poudlard](../hogwarts-portraits/) - Projet pratique complet
- [Documentation officielle MCP](https://modelcontextprotocol.io/) - Comprendre les détails du protocole
- [Documentation officielle Figma Make](https://help.figma.com/hc/en-us/sections/360007453634-Figma-Make)
- [Tutoriels MasterGo AI](https://mastergo.com/tutorials)
