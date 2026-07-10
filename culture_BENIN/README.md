# Culture+ Bénin — Frontend

Frontend de la plateforme culturelle du Bénin : découverte des villes, sites historiques, personnalités, récits, traditions et événements, jeux culturels, contributions communautaires et visites immersives 360°.

Un vrai backend (NestJS, hébergé sur Render) existe déjà et est consommé pour l'authentification. Tout le reste du contenu (villes, sites, récits, jeux, etc.) est pour l'instant servi par des données mockées en local, en attendant que les endpoints correspondants soient exposés côté backend.

## Stack technique

- **React 19** + **TypeScript** (mode strict : `strict`, `noUnusedLocals`, `noUnusedParameters`, `noFallthroughCasesInSwitch`)
- **Vite 8** (`@vitejs/plugin-react`) comme bundler/dev server
- **React Router 7** (`BrowserRouter`) pour le routing
- **Tailwind CSS 4** via `@tailwindcss/vite` — pas de `tailwind.config.js` classique, le thème (couleurs, polices) est déclaré directement en CSS avec `@theme` dans `src/shared/styles/globals.css` (couleurs `culture-green`, `culture-green-dark`, `culture-terracotta`, `culture-ink` ; polices Spectral pour les titres et Archivo pour le texte courant, chargées depuis Google Fonts)
- **mapillary-js** pour les visites 360°
- **Aucune librairie de state management externe** : uniquement React Context (`AuthContext`) + hooks maison + `localStorage`. Pas de Redux/Zustand/React Query.
- Alias `@/*` → `src/*`
- Gestionnaire de paquets : **pnpm**

## Prérequis

- Node.js (v20+)
- [pnpm](https://pnpm.io/)

## Installation

```bash
pnpm install
```

## Variables d'environnement

Copier `.env.example` en `.env` (ou `.env.development` pour le dev local) et renseigner :

- `VITE_API_BASE_URL` — URL du backend NestJS. En dev, on utilise généralement `/api`, qui passe par le proxy configuré dans `vite.config.ts` (le backend ne renvoie pas encore d'en-têtes CORS, d'où ce contournement). En prod, pointer directement vers l'URL du backend déployé.
- `VITE_MAPILLARY_ACCESS_TOKEN` — token d'accès Mapillary, nécessaire pour les visites immersives 360°.

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

⚠️ Ce script est actuellement **cassé** : ESLint n'est pas installé (absent des `devDependencies`) et aucun fichier de configuration ESLint n'existe à la racine. À mettre en place.

## Architecture générale

Le projet suit une **Clean Architecture** : le domaine métier ne dépend d'aucun détail technique, et les couches externes (data, presentation, infrastructure) dépendent du domaine, jamais l'inverse.

```
src/
  app/                     # Point d'assemblage : App.tsx (routes), providers globaux
  domain/
    entities/              # Interfaces TS pures décrivant le modèle métier
    repositories/           # Contrats (interfaces) que la couche data doit implémenter
    usecases/              # Vide pour l'instant — voir "Prévu pour la suite"
  data/
    repositories/          # Implémentations concrètes des contrats domain
    datasources/local/     # Données mockées en dur (*.mock.ts)
    datasources/remote/    # Vide — prévu pour les futurs appels API réels
    models/                # Vide — prévu pour les DTOs/mapping API
  infrastructure/
    api/httpClient.ts      # Wrapper fetch générique, gestion d'erreurs API
    config/repositories.ts # Point d'injection de dépendances (singletons)
  presentation/
    components/            # Composants réutilisables, organisés par domaine (auth, games, ui, ...)
    pages/                 # Pages routées
    layouts/                # Layouts partagés (ex : espace compte)
    hooks/                  # Hooks de présentation (favoris, scores, contenu d'accueil)
    contexts/               # AuthContext
  shared/
    constants/              # Libellés, contenu statique
    utils/                  # Fonctions utilitaires (Wikimedia, affichage utilisateur)
    styles/                 # globals.css (thème Tailwind)
public/                     # Fichiers statiques (actuellement vides : icons/images/fonts)
tests/                      # tests/unit et tests/integration — vides, aucun test runner configuré
```

### Modèle de données

14 entités sont définies dans `domain/entities` : `City`, `Site`, `Story`, `HistoricalFigure`, `CulturalEvent`, `Tradition`, `Testimony`, `Contribution` (+ `ContentCategory`), `MapPoint`, `QuizQuestion`, `ChronologyItem`, `MemoryItem`, `LeaderboardEntry`, `GalleryItem`, `User`. Chacune a une interface de repository correspondante dans `domain/repositories`.

**13 des 14 repositories ont une implémentation** dans `data/repositories`. Le seul qui n'en a pas : `GalleryRepository` — l'interface et l'entité `GalleryItem` existent, mais aucune implémentation ni mock, et rien ne l'utilise ailleurs dans le code (les galeries actuellement affichées sont de simples champs `gallery?: string[]` bruts sur chaque entité).

Toutes les implémentations mock (sauf l'authentification) suivent le même patron : elles chargent un tableau `*_MOCK` depuis `data/datasources/local/*.mock.ts` et exposent des méthodes `async` qui filtrent/trient ce tableau **en mémoire**, sans aucun appel réseau :

```ts
async getAll(): Promise<City[]> {
  return [...CITIES_MOCK].sort((a, b) => a.order - b.order);
}
```

`infrastructure/config/repositories.ts` exporte un singleton par repository (`cityRepository`, `storyRepository`, etc.) — c'est le seul point d'injection de dépendances du projet. Le choix mock-vs-API-réelle est câblé en dur dans chaque `*Impl.ts` : il n'y a pas de switch configurable par variable d'environnement.

Toutes les images des mocks proviennent de Wikimedia Commons via `shared/utils/wikimedia.ts` (construction d'URL `Special:FilePath`) — aucune image locale n'est utilisée, les dossiers `public/images`, `public/icons`, `public/fonts` sont vides.

## Fonctionnalités

Pour chaque fonctionnalité : l'idée, l'implémentation actuelle, et ce qui reste à faire.

### Authentification — le module le plus avancé, seul branché à un vrai backend

**Idée** : permettre à un visiteur de créer un compte et se connecter pour accéder aux fonctionnalités communautaires (jeux, contribution, favoris, profil).

**Implémentation actuelle** : entièrement fonctionnelle de bout en bout.
- `domain/repositories/AuthRepository.ts` définit le contrat (`login`, `register`, `getProfile`)
- `data/repositories/AuthRepositoryImpl.ts` l'implémente via le vrai `httpClient`, en appelant `POST /auth/login`, `POST /auth/register` et `GET /users/me` sur le backend NestJS (avec `Authorization: Bearer <token>`), et fait le mapping `_id` Mongo → `id` du domaine
- `infrastructure/api/httpClient.ts` : wrapper fetch générique, gestion des erreurs HTTP via une classe `ApiError`, extraction du message d'erreur renvoyé par le backend
- `AuthContext.tsx` stocke le JWT dans `localStorage` (clé `culture-benin:auth-token`) et restaure la session au chargement (avec un état `isRestoring` pour éviter un flash de contenu non connecté) — **la session survit donc à un rechargement de page**
- `LoginDialog.tsx` / `SignupDialog.tsx` : formulaires contrôlés avec validation côté client (email, mot de passe ≥ 8 caractères, confirmation) et affichage des erreurs API
- `PasswordInput.tsx` : champ mot de passe avec bascule visible/masqué

**Prévu pour la suite** :
- Gestion du refresh token et de l'expiration de session (aujourd'hui, si le token expire, `getProfile` échoue silencieusement et déloge l'utilisateur au reload suivant)
- Fonction "mot de passe oublié"
- Modification du profil en libre-service (`SettingsPage` affiche actuellement un message indiquant que ce n'est pas encore disponible)
- Tenir compte de la mise en veille du service gratuit Render (latence au réveil du backend)

### Accueil (`/`)

**Idée** : vitrine d'entrée — carrousel hero, liens rapides vers les 4 sections, villes à explorer, récits en vedette, statistiques de la collection, dernières contributions.

**Implémentation actuelle** : `useHomeContent()` agrège en parallèle `cityRepository.getAll()`, `storyRepository.getFeatured(4)` et `contributionRepository.getRecent(3)` (mocks). Les slides du hero combinent les villes réelles avec des données statiques additionnelles (`heroHighlights.mock.ts`). Les statistiques de collection (nombre de photos, vidéos, etc.) sont des **chiffres codés en dur** dans `homeStaticContent.ts`, purement décoratifs — pas calculés depuis les données réelles.

**Prévu pour la suite** : brancher ces agrégations sur de vraies statistiques calculées côté backend une fois l'API de contenu disponible.

### Carte (`/carte`)

**Idée** : localiser les sites culturels sur une carte et calculer un itinéraire depuis la position de l'utilisateur.

**Implémentation actuelle** : liste de recherche filtrée en mémoire (`mapRepository.getPoints({ query })` sur `MAP_POINTS_MOCK`). La carte elle-même est un `<iframe>` Google Maps en mode embed (pas de SDK JS, pas de clé API Google requise) ; la géolocalisation utilise l'API navigateur native (`navigator.geolocation`).

**Prévu pour la suite** : une vraie carte interactive avec marqueurs cliquables (actuellement, cliquer sur un point ne fait que recalculer l'URL de l'iframe), et des points de carte alimentés par le backend plutôt que par des mocks.

### Explorer (`/explorer` et sous-pages)

**Idée** : hub vers 4 catégories de contenu — Sites historiques, Personnalités, Récits, Événements/Traditions — plus une fiche détaillée par ville (`/explorer/:cityId`).

**Implémentation actuelle** : chaque page liste/détail (`SitesListPage`, `SiteDetailPage`, `PersonalitiesListPage`, `HistoricalFigureDetailPage`, `RecitsListPage`, `StoryDetailPage`, `EvenementsListPage`, `EventDetailPage`, `TraditionDetailPage`, `CityDetailPage`) suit le même patron `useEffect`/`useState` appelant directement les singletons de repositories, avec un état chargement/404/trouvé. Chaque fiche affiche narration, galerie d'images, témoignages (`TestimonySection`) et un bouton favoris.

La **visite immersive 360°** n'est câblée qu'en dur pour Ouidah (`CityDetailPage` teste `city.id === "ouidah"`) et pour un seul site (`SiteDetailPage` teste `site.id === "porte"`, la Porte du Non-Retour), avec un objet de démo Mapillary dupliqué dans ces deux fichiers et dans `ImmersiveTestPage.tsx`.

**Prévu pour la suite** :
- Factoriser la logique de fetch dupliquée page par page (candidat naturel pour la couche `domain/usecases` actuellement vide, ou un hook générique de fetching)
- Généraliser la visite immersive à toutes les villes/sites pertinents, en ajoutant un champ dédié (ex. `tourImageId`) au modèle `City`/`Site` plutôt que de tester des identifiants en dur
- Implémenter `GalleryRepository` si une vraie galerie enrichie (au-delà du simple tableau d'URLs) est souhaitée

### Jeux (`/jouer`)

**Idée** : apprentissage ludique — quiz historique, remise en ordre chronologique des rois du Danxomè, jeu de mémoire culturel — avec classement communautaire. Accessible uniquement aux utilisateurs connectés.

**Implémentation actuelle** : chaque jeu (`QuizGame`, `ChronologyGame`, `MemoryGame`) charge ses données via son repository dédié (mocks). La logique de jeu est entièrement côté client. `useGameScores` sauvegarde le meilleur score par jeu dans `localStorage` (clé `culture-benin:game-scores`) — **ces scores ne sont pas envoyés au backend**. Le classement affiché (`leaderboardRepository.getTop`) est un mock statique, sans lien avec les scores réels du joueur connecté.

Note historique : d'anciennes versions du projet prévoyaient aussi des devinettes (`Riddle`), un vrai/faux (`TrueFalseStatement`) et un jeu de reconnaissance de lieux (`PlaceGuessChallenge`) — ces entités ont depuis été retirées du scope ; seuls quiz, chronologie et mémoire subsistent aujourd'hui.

**Prévu pour la suite** :
- Envoyer les scores au backend pour un vrai classement communautaire multi-utilisateurs
- Éventuellement réintroduire d'autres formats de jeu

### Témoignages (`TestimonySection`, `AudioTestimonyDialog`, `VideoTestimonyDialog`)

**Idée** : donner à entendre/voir des témoignages audio/vidéo liés à un site, une personnalité, un événement ou une tradition.

**Implémentation actuelle** : **maquette visuelle uniquement**. Pas de balise `<audio>`/`<video>` — juste une image et un bouton play/pause qui bascule un état visuel, avec une fausse animation d'égaliseur en CSS pour l'audio. Le composant affiche lui-même le texte : *« Multilingue à venir — transcription disponible en français pour le moment »*.

**Prévu pour la suite** : lecture réelle de fichiers média (hébergement à définir), sous-titres/transcriptions multilingues.

### Contribution (`/contribuer`)

**Idée** : permettre à la communauté de soumettre du contenu (texte historique, image, vidéo, audio, témoignage, document culturel), modéré avant publication.

**Implémentation actuelle** : formulaire complet avec sélection de fichiers, aperçu local des images via `URL.createObjectURL`. **Aucun upload réel** : les URLs envoyées au repository sont des URLs blob locales au navigateur, invalides après rechargement de la page. `contributionRepository.create()` ajoute la contribution en mémoire avec un statut `"pending"`. Accessible uniquement connecté.

**Prévu pour la suite** : véritable upload multipart vers un backend avec stockage persistant (S3, Cloudinary ou équivalent), et un vrai flux de modération.

### Espace compte (`/compte`)

**Idée** : espace personnel — profil, favoris, contributions soumises, paramètres/déconnexion.

**Implémentation actuelle** :
- `ProfilePage` agrège le nombre de favoris (`useFavorites`, `localStorage`) et de contributions (`contributionRepository.getByUserId`, mock)
- `FavoritesPage` liste uniquement les **villes** favorites — bien que `useFavorites` gère des clés de stockage séparées pour sites, personnalités et événements (utilisées par les boutons cœur sur les fiches détail), **aucune page ne liste ces favoris-là**
- `MyContributionsPage` affiche le statut (en attente/approuvée/rejetée) de chaque contribution avec des badges colorés
- `SettingsPage` : affichage en lecture seule + déconnexion ; la modification de profil est explicitement indiquée comme non disponible

**Prévu pour la suite** :
- Page(s) listant les favoris sites/personnalités/événements (le stockage existe déjà, il manque juste l'UI de listing)
- Modification de profil en libre-service

### Chatbot (`ChatbotWidget`)

**Idée** : assistant conversationnel pour répondre aux questions sur le patrimoine béninois.

**Implémentation actuelle** : **entièrement factice**. Message d'accueil fixe et réponse en boîte de conserve identique quel que soit le message envoyé, aucun appel API ni logique NLP. Le bot annonce lui-même : *« cette fonctionnalité arrive bientôt »* et *« je ne suis pas encore connecté à une vraie intelligence »*.

**Prévu pour la suite** : connexion à un vrai modèle de langage/service de chat.

### Visite immersive 360° (`ImmersiveTourViewer`, `/test-immersif`)

**Idée** : visites virtuelles à 360° des sites historiques via des photos sphériques.

**Implémentation actuelle** : `ImmersiveTourViewer` encapsule le `Viewer` de `mapillary-js` et nécessite `VITE_MAPILLARY_ACCESS_TOKEN` (sinon un message d'erreur explicite s'affiche). `ImmersiveTestPage` (route `/test-immersif`) sert de bac à sable avec une seule photo 360° en dur (Porte du Non-Retour, Ouidah). Techniquement fonctionnel, mais réutilisé à l'identique dans 3 endroits du code (voir section Explorer).

**Prévu pour la suite** : voir la section Explorer ci-dessus (généralisation à d'autres sites/villes).

## Backend

Un backend **NestJS** existe et est déployé sur Render. À ce jour, seule l'authentification (`/auth/login`, `/auth/register`, `/users/me`) est réellement consommée par ce frontend. Tout le reste du contenu (villes, sites, récits, événements, traditions, jeux, contributions, carte) reste servi par des mocks locaux, en attendant que les endpoints correspondants soient exposés et branchés.

## Points d'attention généraux / dette technique connue

- **`domain/usecases/`** est vide : la logique métier vit directement dans les repositories/hooks/pages plutôt que dans une couche use-case dédiée, comme le prévoyait l'architecture initiale.
- **`data/datasources/remote/`** et **`data/models/`** sont vides : l'intégration API réelle (hors authentification) et les DTOs/mapping associés restent à faire.
- **Tests** : `tests/unit` et `tests/integration` existent mais sont vides ; aucun test runner n'est configuré dans `package.json`.
- **Lint** : le script `pnpm lint` est cassé (ESLint absent des dépendances, pas de config).
- **Composants inutilisés** : `CityRow.tsx` et `CityFeatureTile.tsx` existent mais ne sont importés nulle part — à réintégrer ou supprimer.
