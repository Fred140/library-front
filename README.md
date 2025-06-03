
Voici une description détaillée du projet **library-front** :

---

## Présentation générale

`library-front` est une application **Angular** qui sert d’interface utilisateur pour la gestion d’une bibliothèque de livres. Elle consomme l’API fournie par `library-api` pour afficher, créer, modifier, supprimer et liker des livres. L’application propose une navigation moderne, une mosaïque de livres, un affichage détaillé, un formulaire de création/édition, et des fonctionnalités interactives comme le like et le partage.

---

## Structure des dossiers et fichiers principaux

- **/src/app/pages/**
  - **mosaique/**  
    Affichage en grille (mosaïque) de tous les livres avec boutons de détail, like, share.
  - **detail/**  
    Affichage détaillé d’un livre sélectionné (titre, auteur, résumé, couverture…).
  - **creation/**  
    Formulaire pour ajouter ou éditer un livre, avec gestion de la couverture et du résumé.
- **livre.service.ts**  
  Service Angular pour communiquer avec l’API (CRUD, like, upload…).
- **/src/app/app-routing.module.ts**  
  Définit les routes de navigation (mosaïque, détail, création…).
- **/src/app/app.module.ts**  
  Déclarations des modules Angular et Material utilisés.

---

## Fonctionnalités principales

- **Affichage mosaïque**  
  Liste tous les livres sous forme de cartes, avec résumé, couverture, date, boutons d’action.
- **Détail d’un livre**  
  Affiche toutes les informations d’un livre sélectionné.
- **Création/édition**  
  Formulaire pour ajouter ou modifier un livre, avec upload de couverture et sélection de date.
- **Suppression**  
  Suppression d’un livre avec confirmation.
- **Like/Dislike**  
  Bouton cœur pour liker ou disliker un livre, avec persistance côté API.
- **Partage**  
  Bouton "Share" ouvrant une applet pour partager le livre par mail, Facebook ou Twitter.
- **Filtre et tri**  
  Recherche et tri dans la liste des livres (par titre, auteur…).
- **Navigation**  
  Boutons de retour, navbar personnalisable, navigation fluide entre les pages.

---

## Technologies utilisées

- **Angular** (framework principal)
- **Angular Material** (UI : boutons, tables, cards, icons, forms…)
- **TypeScript**
- **RxJS** (gestion des flux de données)
- **SCSS** (styles personnalisés)

---

## Expérience utilisateur

- **Responsive** : l’interface s’adapte aux différentes tailles d’écran.
- **Design moderne** : utilisation de Material Design, icônes, effets visuels.
- **Interactions dynamiques** : like/dislike, partage, filtres, tri, pagination.
- **Navigation claire** : accès rapide à la mosaïque, au détail, à la création/édition.

---

## Résumé

`library-front` est une application Angular complète et moderne pour gérer une bibliothèque de livres, offrant une expérience utilisateur riche, interactive et connectée à une API backend.  
Elle est conçue pour être facilement maintenable, évolutive et agréable à utiliser.

# LibraryFront

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.3.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
