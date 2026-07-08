# Culture+ Bénin — Frontend

Frontend de la plateforme culturelle du Bénin. React + TypeScript + Vite + Tailwind CSS, en architecture clean (`domain` / `data` / `presentation` / `infrastructure` / `app` / `shared`). À terme, consomme les APIs du backend (base de données MongoDB gérée séparément) — pour l'instant, les données sont simulées via des mocks locaux (voir [État d'avancement](#état-davancement)).

## Prérequis

- Node.js (v20+)
- [pnpm](https://pnpm.io/)

## Installation

```bash
pnpm install
```

## Lancer l'app en développement

```bash
pnpm dev
```

L'app est servie sur http://localhost:5173 (rechargement à chaud activé).

## Build de production

```bash
pnpm build
```

Génère le dossier `dist/`.

## Prévisualiser le build

```bash
pnpm preview
```

## Lint

```bash
pnpm lint
```

## Structure du projet

```
src/
  app/             # Initialisation de l'app (providers, router, store)
  domain/          # Logique métier pure (entités, interfaces, cas d'usage)
  data/            # Implémentations des repositories, datasources, modèles
  presentation/    # Composants, pages, layouts, hooks, contexts
  infrastructure/  # Client API, config, services externes
  shared/          # Types, constants, utils, styles partagés
  assets/          # Images, icônes
public/            # Fichiers statiques
tests/             # Tests unitaires et d'intégration
```

## État d'avancement

### Fait

- Ossature du projet en clean architecture (entités de domaine, interfaces de repositories, couche `presentation` découplée de `data`).
- Pages : Accueil (`/`), Carte culturelle (`/carte`), Contribuer (`/contribuer`), page de test des visites immersives (`/test-immersif`).
- Composants d'accueil : carrousel hero, cartes ville/récit, liens rapides, statistiques de collection, en-tête et pied de page.
- Visite immersive 360° via MapillaryJS (`ImmersiveTourViewer`), en test sur `/test-immersif`.
- Authentification côté UI (dialogues connexion/inscription, `AuthContext`) — état géré en mémoire uniquement, sans backend ni persistance.
- Repositories implémentés avec données mockées (`src/data/datasources/local`) pour : villes, récits, contributions, points de carte.

### Travail restant à faire

- **Intégration backend réelle** : `src/infrastructure/api` et `src/data/datasources/remote` sont vides. Il faut brancher un client API et remplacer les datasources mockées par des appels au backend MongoDB.
- **Authentification persistante** : connecter `AuthContext` à un vrai backend (session/JWT), la session ne survit pas à un rechargement de page actuellement.
- **Section "Explorer"** (villes, récits en détail) : le lien de navigation existe (`NAV_ITEMS` dans `homeStaticContent.ts`) mais aucune page n'est encore créée.
- **Section "Jouer" (jeux culturels)** : quiz, devinettes, vrai/faux, reconnaissance de lieux — les entités et interfaces de repository existent (`QuizQuestion`, `Riddle`, `TrueFalseStatement`, `PlaceGuessChallenge`, `LeaderboardEntry`) mais aucune implémentation, mock ni page n'existe encore. Lien de navigation présent mais non fonctionnel.
- **Repositories restants à implémenter** : `CulturalEventRepository`, `GalleryRepository`, `HistoricalFigureRepository`, `LeaderboardRepository`, `PlaceGuessRepository`, `QuizRepository`, `RiddleRepository`, `SiteRepository`, `TraditionRepository`, `TrueFalseRepository`, `UserRepository` (interfaces définies dans `domain/repositories`, sans implémentation `data/repositories` correspondante).
- **Couche `domain/usecases`** : dossier présent mais vide ; la logique métier vit encore directement dans les repositories/hooks.
- **Tests** : dossiers `tests/unit` et `tests/integration` vides, aucun test écrit et aucun test runner configuré dans `package.json`.
- **Page Contribuer** : formulaire présent côté UI, à connecter à un endpoint de soumission réel (upload d'images/sons, modération).
