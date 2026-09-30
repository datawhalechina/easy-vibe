---
title: 'Développer une application multiplateforme avec Flutter'
description: 'Créer un registre de dépenses, vérifier formulaire, stockage local, tests et build Web.'
---

# Développer une application multiplateforme avec Flutter

Flutter convient lorsque Android et iOS doivent partager produit et identité visuelle. Il utilise Dart. Nous créons un registre de dépenses qui met à jour le total du jour et conserve les entrées après redémarrage.

## 1. Observer des produits réels

My BMW place l'état du véhicule en premier, Google Pay confirme immédiatement le résultat et Nubank organise compte et aide avec une hiérarchie calme.

![My BMW](../../../../zh-cn/stage-3/cross-platform/flutter-app/images/flutter-real-bmw.webp)

![Google Pay](../../../../zh-cn/stage-3/cross-platform/flutter-app/images/flutter-real-google-pay.webp)

![Nubank](../../../../zh-cn/stage-3/cross-platform/flutter-app/images/flutter-real-nubank.png)

## 2. Lancer le projet

```bash
flutter doctor
flutter create store_expense_ledger
cd store_expense_ledger
flutter run -d chrome
```

## 3. Écran et formulaire

> Remplace le compteur par un accueil de dépenses avec total du jour, liste et bouton Ajouter.

![Registre exécuté](../../../../zh-cn/stage-3/cross-platform/flutter-app/images/flutter-expense-home.png)

> Ajoute catégorie, description, montant, Enregistrer et Annuler.

![Formulaire réel](../../../../zh-cn/stage-3/cross-platform/flutter-app/images/flutter-expense-form.png)

## 4. Valider et enregistrer

> Affiche une erreur sous chaque champ vide ou montant inférieur ou égal à zéro, sans enregistrer.

![Validation par champ](../../../../zh-cn/stage-3/cross-platform/flutter-app/images/flutter-expense-validation.png)

> Après Enregistrer, ferme le formulaire, ajoute la ligne en tête, actualise le total et confirme le succès.

![Résultat enregistré](../../../../zh-cn/stage-3/cross-platform/flutter-app/images/flutter-expense-saved.png)

## 5. Conserver les données

> Stocke les dépenses sur l'appareil et restaure-les au démarrage. Pas encore de compte ni de serveur.

Enregistrez deux lignes, rechargez puis rouvrez. Ajoutez ensuite édition, confirmation de suppression, identifiants stables et backend, une étape à la fois.

## 6. Tester et construire

```bash
flutter analyze
flutter test
flutter build web
```

Flutter 3.44.9, Dart 3.12.2, analyse, Widget Test, build Web, validation et persistance ont été vérifiés. Sans Android SDK ni runtime iOS Simulator utilisable, les builds mobiles ne sont pas présentés comme terminés.
