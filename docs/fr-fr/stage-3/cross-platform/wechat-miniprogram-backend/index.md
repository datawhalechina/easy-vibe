---
title: 'Créer un Mini Programme WeChat avec backend'
description: 'Ajouter identité fiable, fonctions cloud, tickets, base, autorisations et logs à un Mini Programme déjà fonctionnel.'
---

# Créer un Mini Programme WeChat avec backend

Le chapitre précédent a construit l'interface exécutée sur le téléphone. Nous ajoutons maintenant identité, données partagées, permissions, fichiers et logs d'un service d'entreprise.

![Mini Programme WeChat d'Uber](../../../../zh-cn/stage-3/cross-platform/wechat-miniprogram/images/wechat-uber-mini-program.webp)

## 1. Le frontend ouvre la porte, le backend décide

Le frontend contient pages et formulaires. Le backend identifie l'utilisateur, vérifie les droits et écrit en base. Il ne doit jamais croire un ID ou un rôle envoyé par la page.

Le chemin le plus court utilise WeChat Cloud Development, fonctions cloud, base documentaire et stockage. Une entreprise qui possède déjà une API HTTPS peut la conserver : CloudBase n'est pas obligatoire pour tout Mini Programme avec backend.

## 2. Préparer l'environnement

![Plugin CloudBase AI](../../../../zh-cn/stage-3/cross-platform/wechat-miniprogram-backend/images/cloudbase-ai-plugin-current.jpg)

![Guide Trae actuel](../../../../zh-cn/stage-3/cross-platform/wechat-miniprogram-backend/images/cloudbase-trae-guide-current.jpg)

Vérifiez prix et quota actuels, créez l'environnement et centralisez son ID.

> Ajoute un accueil membre, Créer un ticket et Mes tickets. Utilise d'abord des données d'exemple.

## 3. Première fonction et identité fiable

> Ajoute une fonction cloud qui renvoie l'heure serveur et un bouton qui l'appelle. Indique où la déployer.

> Obtiens l'utilisateur actuel depuis le contexte fiable de WeChat, jamais depuis l'ID ou le rôle envoyé par la page.

## 4. Enregistrer un ticket

> Valide les champs côté serveur, enregistre l'utilisateur fiable comme propriétaire et renvoie un numéro lisible.

![Northstar Service Hub](../../../../zh-cn/stage-3/cross-platform/wechat-miniprogram-backend/images/wechat-enterprise-service-hub.png)

Le numéro affiché doit correspondre à un enregistrement en base.

![Guide de base documentaire](../../../../zh-cn/stage-3/cross-platform/wechat-miniprogram-backend/images/cloudbase-database-guide-current.jpg)

Une écriture par fonction cloud ou API d'administration ne crée pas `_openid` automatiquement. La fonction doit enregistrer le propriétaire depuis le contexte fiable.

## 5. Empêcher doublons et accès interdit

> Si le même `clientRequestId` revient, renvoie le ticket initial sans en créer un second.

> Mes tickets ne renvoie que ceux de l'utilisateur fiable actuel, même si la page change un ID.

Testez avec deux comptes WeChat. Masquer un bouton n'est pas une autorisation.

## 6. Photos, logs et publication

> Autorise trois photos par ticket, limite type et taille, montre progression et nouvelle tentative.

![Guide de recherche des logs](../../../../zh-cn/stage-3/cross-platform/wechat-miniprogram-backend/images/cloudbase-log-guide-current.jpg)

Avant publication, vérifiez environnement de production, fonctions, collections, index, règles, logs et alertes. Le premier flux est terminé lorsque A crée un ticket visible sur un autre appareil, la base contient une ligne et B ne peut pas la lire.
