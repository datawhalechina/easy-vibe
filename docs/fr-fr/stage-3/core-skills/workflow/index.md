# Flux de travail de developpement assistee par l'IA

Dans les chapitres precedents, nous avons appris a utiliser des IDE IA pour ecrire du code, a gerer les versions du code avec Git, et a concevoir et implementer des interfaces API. Mais lorsque vous faites face a une veritable tache de developpement, vous pouvez vous poser ce genre de questions :

- "Ce projet a des milliers de fichiers. Par ou dois-je commencer ?"
- "Mon chef m'a demande d'ajouter une nouvelle fonctionnalite, mais je ne connais pas bien cette partie du code."
- "Je n'ai aucune idee ou se trouve ce bug. Il y a juste trop de code."
- "Je dois refactoriser cet amas de code, mais j'ai peur de casser quelque chose."

L'essence de ces questions est la suivante : **comment utiliser efficacement les outils IA dans de veritables scenarios de developpement pour accomplir le travail ?**

Dans cette lecon, nous apprendrons a construire un flux de travail de developpement assiste par l'IA systematique afin que vous puissiez utiliser l'IA efficacement dans differents scenarios de developpement. A travers des exemples concrets, nous montrerons comment utiliser l'IA pour le developpement de nouvelles fonctionnalites, la correction de bugs, la refactorisation du code, et bien plus encore.

> **Prerequis**
>
> Avant d'etudier cette section, il est recommande de connaitre au prealable :
> - [Bases des IDE IA](/fr-fr/stage-1/ai-ide/) - maitriser l'utilisation de base des IDE IA
> - [Flux de travail Git et GitHub](/fr-fr/stage-2/backend/git-workflow/) - comprendre la gestion des versions du code
> - [Utiliser les grands modeles pour ecrire du code API](/fr-fr/stage-2/backend/ai-interface-code/) - comprendre le concept de base du developpement assiste par l'IA

::: info Ce que vous allez apprendre

1. Comprendre le role de l'IA dans le processus de developpement et les limites de ses capacites
2. Maitriser les strategies de developpement assiste par l'IA pour differents types de projets
3. Apprendre a utiliser Claude Code dans des scenarios tels que le developpement de nouvelles fonctionnalites, la correction de bugs et la refactorisation du code
4. Construire une base de connaissances de projet pour ameliorer l'efficacite de la collaboration avec Claude Code
5. Maitriser les techniques pratiques pour ameliorer l'efficacite de la collaboration avec l'IA

:::

# 1. Comprendre les limites des capacites de l'IA

Avant de commencer a utiliser l'IA pour assister le developpement, nous devons d'abord comprendre ce que l'IA peut et ne peut pas faire. Ce n'est qu'ainsi que nous pourrons etablir le bon modele de collaboration.

## 1.1 Ce a quoi l'IA excelle

Considerons l'IA comme un assistant tres intelligent qui a toujours besoin d'instructions claires. Elle peut generer rapidement une structure de code a partir de votre description, et elle peut aussi lire des milliers de lignes de code en quelques secondes pour trouver la partie dont vous avez besoin. S'il y a des erreurs de syntaxe evidentes ou des vulnerabilites de securite courantes, elle peut vous aider a les decouvrir. Les taches repetitives telles que le renommage en lot de variables, le formatage du code et la generation de commentaires de documentation sont particulierement appropriees pour etre confiees a l'IA.

En resume, l'IA excelle dans les taches qui ont des regles claires et qui peuvent etre automatisees.

## 1.2 Ce a quoi l'IA n'excelle pas

Mais l'IA a aussi ses limites. Elle ne comprend pas votre logique metier. A moins que vous ne le lui disiez en detail, elle ne saura pas comment fonctionne le flux de commandes de votre entreprise. Elle ne peut pas non plus prendre de decisions telles que le choix technologique ou la conception d'architecture qui necessitent de peser les compromis, car celles-ci dependent de votre experience et de votre comprehension du projet. L'IA ne connait pas non plus les conventions speciales de votre equipe, comme "toutes les API doivent avoir une journalisation" ou "les codes d'erreur doivent utiliser des enums". Vous devez configurer ces regles ou les lui dire explicitement.

Plus important encore, le code genere par l'IA ne peut pas etre utilise directement. Vous devez l'examiner et le tester. Il peut generer du code qui semble correct mais qui est en realite problematique, et il peut ignorer certains cas limites.

## 1.3 Comment collaborer avec l'IA

Une fois que vous comprenez les limites des capacites de l'IA, le modele de collaboration devient clair : vous etes responsable de decider ce qu'il faut construire, de prendre des decisions et d'assurer la qualite ; l'IA est responsable de l'execution concrete du travail de codage, de la recherche d'informations et de la mise en evidence des problemes evidents.

C'est comme travailler avec un developpeur junior. Vous lui dites ce qui doit etre fait, il l'implemente, puis vous examinez le code. La difference est que l'IA execute beaucoup plus rapidement, mais son jugement est inferieur a celui d'un humain.

# 2. Strategies de developpement pour differents types de projets

Différents types de projets necessitent differents styles de developpement et strategies d'utilisation de l'IA. Choisir la bonne strategie peut grandement ameliorer l'efficacite du developpement.

## 2.1 Projets entierement nouveaux (demarrage a zero)

**Caracteristiques du projet :**
- Aucun heritage historique, vous pouvez concevoir librement
- Vous devez etablir la structure du projet et les conventions de code
- Adapté à l'iteration rapide et aux essais et erreurs

**Flux de travail recommande :**

**Etape 1 : Planifier la structure du projet**

Avant de commencer a coder, demandez d'abord a l'IA de vous aider a planifier la structure du projet et les choix technologiques :

```text
Je souhaite construire une application de gestion de taches avec ces fonctionnalites :
- Inscription et connexion des utilisateurs
- Creation, modification et suppression de taches
- Categories et etiquettes de taches
- Rappels de taches

Aidez-moi a :
1. Recommander une pile technologique adaptee
2. Concevoir la structure de repertoires du projet
3. Planifier le schema de la base de donnees
```

**Etape 2 : Construire le framework de base**

Sur la base du plan, demandez a l'IA de creer la structure de projet de base :

```text
Sur la base du plan que nous venons de discuter, aidez-moi a :
1. Creer la structure de repertoires du projet
2. Initialiser les fichiers de configuration (package.json, .env, etc.)
3. Creer le code serveur de base
```

**Etape 3 : Implementer les fonctionnalites une par une**

Implementez les modules de fonctionnalite un par un par priorite :

```text
Maintenant, implementez la fonctionnalite d'inscription des utilisateurs avec ces exigences :
- Inscription avec email et mot de passe
- Stockage des mots de passe sous forme chiffree
- Verification par email
```

**Points cles :**
- Etablissez les conventions de code tot pour que l'IA genere du code qui les respecte
- Testez et verifiez chaque module de fonctionnalite des qu'il est termine
- Maintenez la documentation du projet a jour

## 2.2 Projets matures (bases de code existantes importantes)

**Caracteristiques du projet :**
- Base de code importante avec des conventions historiques
- Vous devez maintenir la coherence du style de codage
- Les modifications doivent prendre en compte la portee de l'impact

**Flux de travail recommande :**

**Etape 1 : Comprendre la structure du projet**

Avant de modifier le code, demandez d'abord a l'IA de vous aider a comprendre le projet :

```text
Ceci est un projet de commerce electronique, et je dois ajouter une fonctionnalite de coupons.
Aidez-moi a :
1. Analyser la structure globale du projet
2. Trouver le code lie aux commandes
3. Voir comment d'autres fonctionnalites similaires sont implementees
```

**Etape 2 : Trouver du code de reference**

Demandez a l'IA de trouver des implementations similaires dans le projet comme references :

```text
Trouvez comment d'autres fonctionnalites promotionnelles dans le projet, telles que les reductions sur le montant total et les remises, sont implementees
```

**Etape 3 : Suivre le style existant**

Demandez a l'IA d'implementer la nouvelle fonctionnalite dans le style du code existant :

```text
Veuillez implementer la fonctionnalite de coupons en vous referant a la facon dont la promotion de reduction sur le montant total est implementee.
Conservez le meme style de code et la meme structure de repertoires.
```

**Points cles :**
- Comprendre d'abord, puis modifier les choses, afin de ne pas endommager l'architecture existante
- Maintenir la coherence du style de codage
- Tester les fonctionnalites connexes apres la modification

## 2.3 Prototypes rapides (validation d'idees)

**Caracteristiques du projet :**
- La vitesse est primordiale, la qualite du code importe moins
- Utilise pour valider des idees de produit ou des approches techniques
- Peut etre abandonne ou reecrit plus tard

**Flux de travail recommande :**

**Decrivez directement l'exigence et implementez rapidement :**

```text
Construisez une application todo simple avec ces exigences :
- Ajouter, supprimer et marquer les taches comme terminees
- Stocker les donnees localement
- Garder l'interface simple, du moment que ca fonctionne
```

**Iterer rapidement :**

```text
Ajoutez une recherche
Passez a un theme sombre
Ajoutez des categories de taches
```

**Points cles :**
- Ne vous inquietez pas trop de la qualite du code ou des conventions
- Validez rapidement les idees et ajustez la direction en temps opportun
- Si le prototype reussit, il faudra le refactoriser plus tard

## 2.4 Projets de maintenance (principalement des corrections de bugs)

**Caracteristiques du projet :**
- Le code est deja stable, et la tache principale est la correction de problemes
- Vous devez localiser rapidement les problemes
- Les modifications doivent etre faites avec precaution pour eviter d'introduire de nouveaux problemes

**Flux de travail recommande :**

**Etape 1 : Localiser le probleme**

```text
Retour utilisateur : apres avoir clique sur le bouton "Soumettre la commande", la page se fige
Erreur de console : TypeError: Cannot read property 'id' of undefined

Aidez-moi a :
1. Analyser les causes possibles
2. Trouver le code concerne
```

**Etape 2 : Analyser la cause racine**

```text
Verifiez dans quelles situations cette erreur se produit
Inspectez le flux de donnees
```

**Etape 3 : Appliquer le correctif**

```text
Corrigez ce probleme, et :
1. Ajoutez du code defensif pour eviter des problemes similaires
2. Ajoutez des messages d'erreur pour ameliorer l'experience utilisateur
```

**Points cles :**
- Testez minutieusement apres le correctif pour vous assurer qu'il n'affecte pas d'autres fonctionnalites
- Ajoutez du code defensif pour ameliorer la robustesse du systeme
- Enregistrez le probleme et la solution pour reference future

# 3. Flux de travail pour les taches de developpement courantes

Dans le developpement quotidien, nous rencontrons de nombreux types de taches differents. Voici plusieurs des flux de travail les plus courants assistes par l'IA.

## 3.1 Developper une nouvelle fonctionnalite

**Scenario :** le chef de produit vous donne une nouvelle exigence, et vous devez implementer une nouvelle fonctionnalite.

**Flux de travail complet :**

**Etape 1 : Comprendre l'exigence** (fait par vous)

Avant de commencer a coder, clarifiez d'abord :
- Quelle fonctionnalite doit etre implementee ?
- Quels sont les entrees et sorties ?
- Quelles sont les conditions aux limites et les cas exceptionnels ?
- Quelles sont les exigences de performance et de securite ?

**Etape 2 : Comprendre le code existant** (demandez a l'IA de vous aider)

```text
Je dois implementer une fonctionnalite de commentaires d'utilisateurs. Aidez-moi a :
1. Verifier s'il y a quelque chose de similaire dans le projet
2. Trouver comment les donnees utilisateurs et les donnees d'articles sont stockees
3. Comprendre les conventions d'operation de base de donnees dans ce projet
```

**Etape 3 : Etablir un plan d'implementation** (avec l'IA)

```text
Sur la base de l'analyse que nous venons de faire, l'implementation de la fonctionnalite de commentaires necessite :
1. La creation d'un modele de donnees de commentaires
2. L'implementation des API CRUD pour les commentaires
3. L'ajout de la fonctionnalite d'affichage et de publication de commentaires sur le frontend

Aidez-moi a confirmer si ce plan est raisonnable et s'il manque quelque chose
```

**Etape 4 : Implementer la fonctionnalite** (l'IA genere, vous examinez)

```text
Selon le plan, implementez d'abord le modele de donnees de commentaires.
Exigences :
- Inclure le contenu du commentaire, l'auteur, l'ID de l'article et la date de creation
- Prendre en charge les reponses imbriquees aux commentaires
- Ajouter les index necessaires
```

```text
Maintenant, implementez les points de terminaison API des commentaires.
Exigences :
- Publier un commentaire
- Supprimer un commentaire (seuls vos propres commentaires peuvent etre supprimes)
- Obtenir tous les commentaires d'un article
- Prendre en charge la pagination
```

```text
Enfin, implementez le composant de commentaires frontend.
Exigences :
- Afficher la liste des commentaires
- Formulaire de publication de commentaires
- Prendre en charge les reponses aux commentaires
```

**Etape 5 : Tester et verifier** (fait par vous)

- Testez manuellement le flux principal
- Testez les cas limites tels que le contenu vide et le contenu trop long
- Testez le controle des autorisations comme l'impossibilite de supprimer le commentaire de quelqu'un d'autre
- Demandez a l'IA de vous aider a ecrire des tests automatises

**Exemple de conversation reelle :**

```text
Vous : Je souhaite ajouter une fonctionnalite de commentaires d'utilisateurs pour que les utilisateurs puissent publier des commentaires sur les articles

IA : D'accord, laissez-moi d'abord comprendre la structure du projet.
     [L'IA analyse le code du projet]
     Je vois que le projet a deja un systeme utilisateur (models/user.js)
     et un systeme d'articles (models/article.js).

     L'implementation de la fonctionnalite de commentaires necessite :
     1. La creation d'un modele de donnees de commentaires (models/comment.js)
     2. L'ajout d'API liees aux commentaires (routes/comment.js)
     3. L'ajout de la fonctionnalite d'affichage et de publication de commentaires sur la page de detail de l'article

     Dois-je commencer l'implementation ?

Vous : Oui, commencons. Creez d'abord le modele de donnees

IA : [Genere models/comment.js]
     J'ai cree le modele de donnees de commentaires avec ces champs :
     - id : identifiant du commentaire
     - content : contenu du commentaire
     - userId : identifiant de l'auteur
     - articleId : identifiant de l'article
     - parentId : identifiant du commentaire parent (pour les reponses imbriquees)
     - createdAt : date de creation

     Dois-je implementer l'API ensuite ?

Vous : Oui, implementez l'API
```

## 3.2 Corriger des bugs

**Scenario :** un utilisateur signale un probleme, et vous devez le localiser et le corriger rapidement.

**Flux de travail complet :**

**Etape 1 : Recueillir des informations** (fait par vous)

Enregistrez les informations suivantes :
- Quel est le message d'erreur ?
- Comment ce probleme peut-il etre reproduit ?
- Quand a-t-il commence a se produire ?
- Quelle est la portee de l'impact ?

**Etape 2 : Localiser le probleme** (demandez a l'IA de vous aider)

```text
Retour utilisateur : apres avoir clique sur le bouton "Soumettre la commande", la page se fige
Erreur de la console du navigateur : TypeError: Cannot read property 'id' of undefined
L'erreur se produit a la ligne 45 de checkout.js

Aidez-moi a :
1. Analyser les causes possibles
2. Trouver le code concerne
3. Verifier le flux de donnees
```

**Etape 3 : Analyser la cause racine** (avec l'IA)

```text
Verifiez d'ou provient cet objet user
Inspectez dans quelles circonstances user pourrait etre undefined
```

**Etape 4 : Implementer le correctif** (l'IA genere, vous examinez)

```text
Corrigez ce probleme avec ces exigences :
1. Ajoutez du code defensif pour verifier si user existe
2. Si user n'existe pas, redirigez vers la page de connexion
3. Ajoutez un message d'erreur convivial
```

**Etape 5 : Verifier le correctif** (fait par vous)

- Reproduisez le probleme en utilisant les etapes originales et confirmez que le probleme est resolu
- Testez les fonctionnalites connexes pour vous assurer qu'aucun nouveau probleme n'a ete introduit
- Reflechissez a savoir si des problemes similaires existent ailleurs

**Exemple de conversation reelle :**

```text
Vous : Un utilisateur a signale qu'apres s'etre connecte, le rafraichissement de la page le deconnecte

IA : C'est generalement un probleme de stockage ou de validation de token. Laissez-moi verifier :
     1. Ou le token est-il stocke, dans localStorage ou dans les cookies ?
     2. Le token est-il recharge lorsque la page est rafraichie ?

     Veuillez me dire quel fichier contient le code lie au token

Vous : utils/auth.js

IA : [Analyse utils/auth.js]
     J'ai trouve le probleme : le token est stocke dans sessionStorage,
     et sessionStorage est efface lorsque la page est rafraichie.

     Solution : utilisez localStorage a la place

     Souhaitez-vous que je le change ?

Vous : Oui, changez-le

IA : [Modifie le code]
     La modification est terminee. Le token est maintenant stocke dans localStorage,
     il ne sera donc pas perdu apres un rafraichissement de la page.

     Je vous recommande de tester :
     1. Connectez-vous et rafraichissez la page pour confirmer que l'utilisateur reste connecte
     2. Fermez et rouvrez le navigateur pour confirmer que l'utilisateur reste connecte
```

## 3.3 Refactoriser du code

**Scenario :** le code est devenu difficile a maintenir et necessite une refactorisation pour ameliorer la qualite du code.

**Flux de travail complet :**

**Etape 1 : Definir l'objectif de refactorisation** (fait par vous)

Clarifiez les points suivants :
- Quel probleme essayez-vous de resoudre ? (code duplique ? structure desordonnee ? problemes de performance ?)
- Quelle est la portee de la refactorisation ?
- Quel niveau de risque est acceptable ?

**Etape 2 : Etablir un plan de refactorisation** (avec l'IA)

```text
Ces trois fonctions (getUserList, getArticleList, getCommentList)
contiennent beaucoup de code duplique pour la pagination, le tri et le filtrage.

Aidez-moi a :
1. Analyser les parties dupliquees
2. Proposer un plan de refactorisation
3. Evaluer le risque de la refactorisation
```

**Etape 3 : Preparer un filet de securite** (demandez a l'IA de vous aider)

```text
Avant la refactorisation, veuillez d'abord ecrire des cas de test pour moi
pour que le comportement reste le meme apres la refactorisation
```

**Etape 4 : Refactoriser etape par etape** (l'IA execute, vous verifiez)

```text
Selon le plan que nous venons de discuter, extrayez d'abord la fonction partagee
```

```text
Maintenant, optimisez la structure de donnees
```

```text
Enfin, mettez a jour les sites d'appel
```

**Etape 5 : Verifier le resultat** (fait par vous)

- Executez tous les tests et assurez-vous qu'ils passent
- Testez manuellement les fonctionnalites cles
- Verifiez si la qualite du code s'est amelioree

**Exemple de conversation reelle :**

```text
Vous : Ces trois fonctions contiennent beaucoup de code duplique. Pouvez-vous m'aider a les refactoriser ?
     [Collez le code des trois fonctions]

IA : Je les ai analysees, et les principales differences sont :
     - getUserList : obtient la liste des utilisateurs
     - getArticleList : obtient la liste des articles
     - getCommentList : obtient la liste des commentaires

     Leur logique commune est la pagination, le tri et le filtrage.

     Plan de refactorisation :
     1. Extraire une fonction generique getList
     2. Passer les parties differentes en tant que parametres

     Cela peut reduire de 80 % le code duplique.

     Dois-je l'implementer ?

Vous : Oui, mais aidez-moi d'abord a ecrire des cas de test

IA : [Genere des tests]
     J'ai ecrit des tests pour les trois fonctions,
     couvrant les principaux cas d'utilisation.

     Puis-je commencer la refactorisation maintenant ?

Vous : Oui, commencez la refactorisation

IA : [Refactorise le code]
     La refactorisation est terminee. J'ai cree une fonction generique getList,
     et les trois fonctions originales appellent maintenant toutes cette fonction partagee.

     Veuillez executer les tests pour confirmer que tout fonctionne : npm test
```

## 3.4 Revue de code

**Scenario :** un collegue a soumis du code, et vous devez le revoir.

**Flux de travail complet :**

**Etape 1 : Comprendre rapidement le changement** (demandez a l'IA de vous aider)

```text
Resumez ce que cette PR a change
Quels fichiers ont ete principalement modifies
```

**Etape 2 : Verifier les problemes courants** (demandez a l'IA de vous aider)

```text
Verifiez ce changement pour :
1. Problemes de securite (injection SQL, XSS, etc.)
2. Problemes de performance (requetes N+1, fuites de memoire, etc.)
3. Bugs evidents
4. Si le style de codage suit les conventions du projet
```

**Etape 3 : Revue approfondie** (fait par vous)

- Si la logique metier est correcte
- Si les cas limites ont ete pris en compte
- S'il existe une meilleure approche d'implementation
- Si des tests devraient etre ajoutes

**Etape 4 : Donner un retour** (fait par vous)

- Signalez les endroits qui necessitent des modifications
- Expliquez pourquoi ils devraient etre modifies
- Fournissez des suggestions d'amelioration

**Exemple de conversation reelle :**

```text
Vous : Aidez-moi a relire cette PR
     [Fournissez le lien de la PR ou le code]

IA : J'ai examine le changement et j'ai trouve ces problemes :

     1. Problemes de securite :
        - Ligne 23 : l'entree utilisateur n'est pas echappee, ce qui peut entrainer un risque XSS
        - Ligne 45 : la requete SQL est construite par concatenation de chaines, ce qui presente un risque d'injection

     2. Problemes de performance :
        - Ligne 67 : la base de donnees est interrogee dans une boucle, ce qui cree un probleme N+1

     3. Qualite du code :
        - La fonction handleSubmit est trop longue (200 lignes) ; envisagez de la diviser
        - La gestion des erreurs est manquante

     Souhaitez-vous que j'explique l'un de ces points plus en detail ?

Vous : Expliquez en detail le probleme d'injection SQL

IA : A la ligne 45 :
     ```javascript
     const query = `SELECT * FROM users WHERE name = '${userName}'`;
     ```

     Cela concatene directement l'entree utilisateur dans l'instruction SQL.
     Si un utilisateur entre `' OR '1'='1`, cela devient :
     ```sql
     SELECT * FROM users WHERE name = '' OR '1'='1'
     ```
     Cela renverrait toutes les donnees utilisateur.

     La bonne approche est d'utiliser une requete parametree :
     ```javascript
     const query = 'SELECT * FROM users WHERE name = ?';
     db.query(query, [userName]);
     ```

     Souhaitez-vous que je le corrige ?
```

# 4. Construire une base de connaissances du projet

Pour aider l'IA a mieux comprendre votre projet, il est recommande de construire une base de connaissances au sein du projet. De cette facon, l'IA peut travailler selon vos conventions et vos habitudes.

## 4.1 Creer un fichier de description du projet

Creez un fichier `CLAUDE.md` ou `AGENTS.md` a la racine du projet pour enregistrer les informations cles du projet :

```markdown
# Apercu du projet

## Resume du projet
Ceci est une plateforme d'apprentissage en ligne qui offre une gestion de cours, un apprentissage utilisateur, une soumission de devoirs et d'autres fonctionnalites.

## Pile technologique
- Frontend : React 18 + TypeScript + Vite
- Backend : Node.js + Express + PostgreSQL
- Deploiement : Vercel (frontend) + Railway (backend)

## Structure du projet
```
src/
├── components/     # Composants React
├── pages/          # Composants de page
├── api/            # Appels API
├── utils/          # Fonctions utilitaires
└── types/          # Definitions de types TypeScript
```

## Conventions de code
- Utilisez ESLint et Prettier pour formater le code
- Les fichiers de composants utilisent PascalCase (comme UserProfile.tsx)
- Les fonctions utilitaires utilisent camelCase (comme formatDate.ts)
- Les constantes utilisent UPPER_SNAKE_CASE (comme API_BASE_URL)

## Flux de developpement
1. Creez une branche de fonctionnalite a partir de main
2. Soumettez une PR une fois le developpement termine
3. Fusionnez apres que la revue de code est approuvee

## Taches courantes
- Demarrer le serveur de developpement : `npm run dev`
- Executer les tests : `npm test`
- Construire pour la production : `npm run build`
- Formater le code : `npm run format`

## Remarques
- Tous les appels API doivent inclure une gestion des erreurs
- L'entree utilisateur doit etre validee et echappee
- Utilisez des requetes parametrees pour les operations de base de donnees afin d'eviter l'injection SQL
- Les informations sensibles (mots de passe, tokens) ne doivent pas etre ecrites dans les journaux

## Schema de la base de donnees
- users : table des utilisateurs (id, email, password_hash, created_at)
- courses : table des cours (id, title, description, teacher_id)
- enrollments : table des inscriptions (id, user_id, course_id, enrolled_at)
```

## 4.2 Enregistrer les problemes et solutions courants

Creez `docs/troubleshooting.md` dans le projet pour enregistrer les problemes courants :

```markdown
# Problemes courants

## Problemes d'environnement de developpement

### Probleme : npm install echoue
**Cause :** La version de Node est incompatible
**Solution :** Utilisez Node.js 18 ou superieur

### Probleme : la connexion a la base de donnees echoue
**Cause :** Les variables d'environnement ne sont pas configurees
**Solution :** Copiez .env.example en .env et remplissez les informations de connexion a la base de donnees

## Problemes de fonctionnalites

### Probleme : apres la connexion des utilisateurs, le rafraichissement de la page les deconnecte
**Cause :** le token est stocke dans sessionStorage
**Solution :** passez a localStorage

### Probleme : le telechargement d'image echoue
**Cause :** la taille du fichier depasse la limite
**Solution :** ajoutez une verification de la taille du fichier sur le frontend et limitez-la a 5 Mo
```

## 4.3 Maintenir les enregistrements de decisions techniques

Creez un repertoire `docs/decisions/` pour enregistrer les decisions techniques importantes :

```markdown
ADR-001 : Choisir PostgreSQL comme base de donnees

## Statut
Accepte

## Contexte
Le projet doit choisir une base de donnees relationnelle. Les candidats sont MySQL et PostgreSQL.

## Decision
Choisir PostgreSQL

## Justification
1. Meilleur support JSON, adapte pour stocker le contenu des cours
2. Recherche en texte integral plus puissante
3. L'equipe est plus familiere avec PostgreSQL

## Consequences
- Nous devons apprendre les fonctionnalites specifiques a PostgreSQL
- Le deploiement necessite un environnement PostgreSQL
```

# 5. Techniques pour ameliorer l'efficacite de la collaboration avec l'IA

En maitrisant quelques techniques pratiques, vous pouvez rendre votre collaboration avec l'IA plus efficace.

## 5.1 Soyez clair et precis lors de la description des problemes

**Mauvaise description :**
```text
Cette fonctionnalite a un probleme
Aidez-moi a l'optimiser
```

**Bonne description :**
```text
Apres que l'utilisateur a clique sur le bouton "Soumettre", le formulaire n'est pas soumis
La console du navigateur signale : Uncaught TypeError: Cannot read property 'value' of null
L'erreur se produit a la ligne 23 de form.js

Cette liste se charge tres lentement et contient 1000 elements
Aidez-moi a ajouter une pagination avec 20 elements par page
```

**Points cles :**
- Fournissez des informations d'erreur specifiques
- Expliquez le resultat attendu
- Donnez le contexte pertinent

## 5.2 Faites une seule chose a la fois

**Mauvaise approche :**
```text
Aidez-moi a implementer la connexion, l'inscription, la recuperation du mot de passe, le centre de profil,
le changement de mot de passe et la verification par email
```

**Bonne approche :**
```text
Implementez d'abord la fonctionnalite de connexion, avec ces exigences :
- Connexion par email et mot de passe
- Se souvenir de l'etat de connexion
- Messages d'erreur

(Une fois terminee) Maintenant, implementez la fonctionnalite d'inscription

(Une fois terminee) Maintenant, implementez la fonctionnalite de recuperation du mot de passe
```

**Points cles :**
- Decomposez les grandes taches en petites taches
- Testez et verifiez apres chaque tache terminee
- Confirmez qu'il n'y a pas de probleme avant de passer a la suivante

## 5.3 Verifiez rapidement les resultats

**Mauvaise approche :**
- Laissez l'IA modifier 10 fichiers d'affilee
- Decouvrez seulement a la fin que la premiere modification etait deja fausse
- Perdez beaucoup de temps

**Bonne approche :**
- Modifiez un fichier et testez immediatement
- Confirmez qu'il n'y a pas de probleme, puis continuez
- Corrigez les problemes des qu'ils sont trouves

**Points cles :**
- Avancez a petits pas et obtenez un retour rapide
- Ne faites pas confiance aveuglment a l'IA
- Gardez le controle du code

## 5.4 Utilisez bien le contexte

**Technique 1 : se referer a la conversation precedente**
```text
Implementez selon le plan que nous venons de discuter
Referez-vous a la fonction getUserList precedente
```

**Technique 2 : fournir du code connexe**
```text
Voici le code du modele utilisateur existant :
[collez le code]

Veuillez implementer le modele d'article dans le meme style
```

**Technique 3 : expliquer le contexte du projet**
```text
Ceci est un projet de commerce electronique utilisant React + Node.js
Il a deja un systeme utilisateur et un systeme de produits
Maintenant, nous devons ajouter une fonctionnalite de panier
```

## 5.5 Sauvegarder les conversations utiles

**Scenario :** vous avez resolu un probleme complexe

**Comment faire :**
1. Enregistrez la solution dans la documentation du projet
2. Referez-y la prochaine fois qu'un probleme similaire apparait
3. Partagez-la avec d'autres membres de l'equipe

**Exemple :**

Creez un document sous `docs/solutions/` :

```markdown
# Resolution du probleme de requete N+1

## Description du probleme
Lors de la recuperation de la liste des articles, le systeme interroge les informations de l'auteur une fois par article,
ce qui provoque un probleme de performance.

## Solution
Utilisez une requete JOIN pour recuperer toutes les donnees en une seule fois :

```sql
SELECT articles.*, users.name as author_name
FROM articles
LEFT JOIN users ON articles.author_id = users.id
```

**Resultat :** le temps de requete est passe de 2000 ms a 50 ms

## 5.6 Apprendre l'art de poser des questions

**Technique 1 : demandez d'abord "pourquoi"**
```text
Pourquoi ce code provoque-t-il une fuite de memoire ?
Pourquoi devrions-nous utiliser useCallback au lieu d'une fonction normale ?
```

**Technique 2 : demandez plusieurs options**
```text
Quelles sont les differentes facons d'implementer l'authentification utilisateur ?
Quels sont les avantages et les inconvenients de chacune ?
```

**Technique 3 : demandez des explications**
```text
Comment ce code fonctionne-t-il ?
Pouvez-vous expliquer cet algorithme en detail ?
```

# 6. Questions frequentes

## Q1 : Puis-je utiliser directement le code genere par l'IA ?

**R :** Non, pas directement. Il necessite une revue et des tests.

Le code genere par l'IA peut avoir les problemes suivants :
- erreurs logiques ou mauvaise gestion des cas limites
- non-conformite aux conventions de codage du projet
- risques de securite
- optimisation des performances insuffisante

Vous devez :
- lire attentivement le code genere
- comprendre sa logique
- tester differents scenarios
- confirmer qu'il suit les conventions du projet

## Q2 : Que faire si l'IA comprend mal ce que je veux dire ?

**R :** Corrigez-la rapidement et decrivez a nouveau l'exigence.

```text
Ce n'est pas ce que je voulais dire. Ce que je veux dire est...
Cette comprehension est incorrecte. Elle devrait etre...
Laissez-moi decrire a nouveau l'exigence...
```

Si c'est encore faux apres plusieurs corrections, vous pouvez :
- fournir plus de contexte
- donner des exemples de code specifiques
- diviser la tache en morceaux plus petits

## Q3 : Que faire si je rencontre quelque chose que l'IA ne peut pas resoudre ?

**R :** L'IA n'est pas toute-puissante. Certains problemes ont encore besoin que vous les resolviez vous-meme.

Problemes que l'IA peut ne pas pouvoir resoudre :
- technologies tres recentes (les connaissances de l'IA ont une date limite)
- logique metier unique a votre equipe
- problemes necessitant l'acces a des systemes externes
- problemes complexes d'optimisation des performances

A ce moment-la, vous devez :
- lire la documentation officielle
- rechercher des solutions connexes
- demander a des collegues experimentes
- poser des questions dans la communaute

## Q4 : Comment juger si la suggestion de l'IA est raisonnable ?

**R :** Utilisez votre propre experience et vos connaissances pour en juger.

Criteres d'evaluation :
- si elle suit les meilleures pratiques
- si elle prend en compte les cas limites
- s'il y a des risques de securite potentiels
- si elle correspond a la pile technologique du projet
- si la performance est acceptable

Si vous n'etes pas sur, vous pouvez :
- demander a l'IA d'expliquer pourquoi elle suggere cette approche
- demander des solutions alternatives
- consulter les membres de l'equipe

## Q5 : Comment une equipe devrait-elle utiliser l'IA en collaboration ?

**R :** Etablissez des conventions partagees et une base de connaissances commune.

Recommandations pour la collaboration d'equipe :
- partagez la configuration `CLAUDE.md` du projet
- unifiez les conventions et le style de code
- enregistrez les solutions aux problemes courants
- partagez regulierement des prompts utiles
- verifiez le code genere par l'IA lors de la revue de code

## Q6 : Comment eviter de devenir trop dependre de l'IA ?

**R :** Continuez a apprendre et a reflechir. L'IA est un assistant, pas un remplacement.

Recommandations :
- comprenez le code genere par l'IA au lieu de le copier aveuglment
- apprenez activement les concepts que vous ne comprenez pas
- revoyez regulierement les connaissances fondamentales
- essayez de resoudre les problemes vous-meme d'abord, puis utilisez l'IA pour verifier
- participez a la revue de code pour apprendre de l'experience des autres

# 7. Resume

A travers ce chapitre, vous avez maintenant maitrise :

1. **Les limites des capacites de l'IA** : comprendre ce a quoi l'IA excelle et n'excelle pas, et construire le bon modele de collaboration
2. **Les strategies par type de projet** : differentes strategies de developpement pour les projets entierement nouveaux, les projets matures, les prototypes rapides et les projets de maintenance
3. **Les flux de travail pour les taches courantes** : flux de travail complets pour le developpement de nouvelles fonctionnalites, la correction de bugs, la refactorisation du code et la revue de code
4. **La base de connaissances du projet** : apprendre a construire la documentation du projet pour que l'IA puisse mieux comprendre votre projet
5. **Les techniques de collaboration** : des moyens pratiques pour ameliorer l'efficacite de la collaboration avec l'IA

**Points essentiels a retenir :**

- **Division claire des roles** : vous prenez les decisions et assurez la qualite, l'IA gere l'execution et l'assistance
- **Communication claire** : soyez precis et faites une seule chose a la fois
- **Verification rapide** : ne faites pas confiance aveuglment, testez et verifiez
- **Apprentissage continu** : comprenez les limites des capacites de l'IA et ameliorez continuellement le modele de collaboration

N'oubliez pas : l'IA est un outil, pas un remplacement. Elle peut vous rendre plus efficace, mais la qualite finale du code depend toujours de votre jugement. Commencez par des taches simples et construisez progressivement la confiance. Vous decouvrirez que l'IA peut vous faire gagner beaucoup de temps et vous permettre de vous concentrer sur un travail plus precieux.

::: tip Prochaine etape
Dans le prochain chapitre, nous apprendrons a utiliser l'IA pour la revue de code et l'assurance qualite afin de garantir la maintenabilite et la securite du code.
:::
