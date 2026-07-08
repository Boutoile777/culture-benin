# Culture+ Bénin — Frontend

Frontend de la plateforme culturelle du Bénin. React + TypeScript + Vite + Tailwind CSS, en architecture clean (`domain` / `data` / `presentation` / `infrastructure` / `app` / `shared`). Consomme les APIs du backend (base de données MongoDB gérée séparément).

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
