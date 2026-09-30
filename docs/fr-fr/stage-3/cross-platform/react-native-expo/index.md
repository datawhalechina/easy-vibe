---
title: 'Créer une application d’inspection de magasin avec React Native et Expo'
description: 'Du projet Expo vide à une inspection enregistrée, en comprenant les limites Android, iOS et Web.'
---

# Créer une application d’inspection de magasin avec React Native et Expo

Une chaîne de magasins vérifie chaque jour l'éclairage, les étiquettes, les allées et les sorties de secours. Le personnel coche sur téléphone, ajoute une note et enregistre. Ce flux de formulaires convient bien à React Native et Expo.

## 1. Le rôle des deux outils

React Native crée des interfaces Android et iOS natives avec React et TypeScript. Expo ajoute la création du projet, le serveur de développement, des API d'appareil, les builds et les mises à jour.

![Architecture React Native et Expo](../../../../zh-cn/stage-3/cross-platform/react-native-expo/images/react-native-expo-architecture.svg)

## 2. Trois produits réels

Shopify POS équipe les magasins physiques, Discord partage son produit mobile entre Android et iOS, et MTA TrainTime montre Expo dans une application officielle de transport.

![Shopify POS](../../../../zh-cn/stage-3/cross-platform/react-native-expo/images/shopify-pos-product.jpg)

![Discord Android](../../../../zh-cn/stage-3/cross-platform/react-native-expo/images/discord-react-native-roles.png)

![MTA TrainTime](../../../../zh-cn/stage-3/cross-platform/react-native-expo/images/expo-mta-case.webp)

## 3. Créer le projet et la liste

```bash
npx create-expo-app@latest store-inspection
cd store-inspection
npm run web
```

> Transforme l'exemple en accueil d'inspection. Affiche le magasin, l'avancement du jour et un bouton Commencer.

> Ajoute éclairage, prix, allées et sorties. Un appui change l'état et met à jour l'avancement.

![Application exécutée dans Expo Web](../../../../zh-cn/stage-3/cross-platform/react-native-expo/images/expo-web-running.png)

![Mise en page étroite](../../../../zh-cn/stage-3/cross-platform/react-native-expo/images/expo-web-mobile-layout.png)

## 4. Enregistrer une inspection

> Ajoute une note et Enregistrer. Affiche ensuite l'heure, le nombre terminé et la note dans une carte.

![Inspection réellement enregistrée](../../../../zh-cn/stage-3/cross-platform/react-native-expo/images/expo-web-record-saved.png)

> Enregistre progression et historique sur l'appareil et restaure-les à l'ouverture. N'ajoute pas encore de serveur.

`AsyncStorage` suffit pour peu de valeurs ; `expo-sqlite` convient mieux quand inspections, détails et tâches en attente sont liés.

## 5. Ajouter ensuite photo et backend

> Permets de joindre une photo à un point incomplet, avec aperçu et suppression.

> Connecte l'API de connexion existante et n'affiche que les magasins attribués par le serveur.

Conservez le jeton mobile dans `SecureStore`. Aucun secret d'entreprise ne doit entrer dans l'application ou les variables `EXPO_PUBLIC_`. Ajoutez la synchronisation hors ligne après le stockage local et l'API.

## 6. Finir sur de vrais appareils

Expo Go aide au début ; un development build devient nécessaire avec du code natif personnalisé. Testez clavier, permissions, photos, redémarrage, réseau faible, déconnexion et mise à jour sur Android et iPhone.

Le prototype Expo SDK 57 et TypeScript a été vérifié avec export Web, clics et enregistrement réels. Aucun émulateur Android ni runtime iOS Simulator n'était disponible ; les builds mobiles et la signature ne sont donc pas annoncés comme terminés.
