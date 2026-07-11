# Culture+ Bénin — Frontend

Musée numérique interactif du patrimoine béninois : exploration de villes, sites, personnalités historiques, récits, traditions/événements, carte interactive et jeux culturels.

## Stack technique

- **React 19** + **TypeScript**, bundlé avec **Vite**
- **React Router v7** pour le routing
- **Tailwind CSS v4**
- **MapillaryJS** pour les visites immersives 360°, **three.js** (via un viewer 3D) pour la visite 3D du Palais royal
- Architecture en couches (inspirée Clean Architecture) : `domain` (entités + interfaces de repository) → `data` (implémentations des repository, mock ou API) → `infrastructure` (client HTTP, injection des repositories) → `presentation` (pages, composants, hooks, contexts)

## Fonctionnalités frontend

### Accueil (`/`)
Carrousel hero défilant (villes + temps forts), aperçus des sections (villes, récits, jeux), contributions récentes.

### Explorer (`/explorer`)
Page d'aperçu avec 4 sections : Sites historiques, Personnalités historiques, Récits, Événements & traditions.

- **Villes** (`/explorer/:cityId`) — fiche ville (histoire, région, image)
- **Sites** (`/explorer/sites`, `/explorer/sites/:siteId`) — liste + fiche détaillée : description, historique, galerie photo, témoignages audio/vidéo, bouton "visite immersive" (360° pour la Porte du Non-Retour, 3D pour le Palais royal d'Abomey)
- **Personnalités historiques** (`/explorer/personnalites`, `/explorer/personnalites/:figureId`) — biographie, portrait, galerie, témoignages audio/vidéo
- **Récits** (`/explorer/recits`, `/explorer/recits/:storyId`) — histoires et contes traditionnels
- **Événements & traditions** (`/explorer/evenements`, `/explorer/evenements/:eventId`, `/explorer/traditions/:traditionId`) — galerie, origine, témoignages

### Carte (`/carte`)
Carte interactive (Google Maps embed) : liste déroulante des lieux avec image de couverture, recherche, sélection d'un lieu pour centrer la carte, itinéraire depuis la position de l'utilisateur, lien vers la fiche du site.

### Jouer (`/jouer`) — nécessite d'être connecté
Trois jeux, chacun avec **3 niveaux de difficulté** (Facile / Intermédiaire / Difficile) sélectionnables via des pastilles, et un suivi de progression par niveau ("Vos scores" affiche un badge par niveau) :
- **Quiz historique** — questions à choix multiples
- **Memory culturel** — 12 cartes retournées (6 images + 6 noms à apparier) par niveau
- **Chronologie du Danxomè** — remise en ordre chronologique des rois (pas de niveaux, contenu limité à 4 souverains)

Classement (leaderboard) par jeu et par niveau.

### Contribuer (`/contribuer`)
Formulaire de contribution utilisateur (nécessite connexion).

### Compte (`/compte`)
Profil, favoris, mes contributions, paramètres.

### Authentification
Connexion / inscription (dialogs), session JWT persistée en `localStorage`.

## Connexion au backend

API réelle : NestJS, hébergée sur Render — `https://cultureplusbenin-backend-nestjs.onrender.com` (doc Swagger sur `/docs`). URL configurée via `VITE_API_BASE_URL` (`.env` / `.env.example`).

Chaque domaine métier a une interface de repository (`src/domain/repositories/`) et une implémentation (`src/data/repositories/`), injectée une seule fois dans `src/infrastructure/config/repositories.ts`. Le client HTTP (`src/infrastructure/api/httpClient.ts`, fonction `apiFetch`) gère la construction des requêtes, l'en-tête `Authorization: Bearer <token>` et la levée d'erreurs typées (`ApiError`).

### Ce qui est branché sur l'API réelle

| Domaine | Repository | Détail |
|---|---|---|
| Authentification | `AuthRepositoryImpl` | `POST /auth/login`, `/auth/register`, `GET /users/me` |
| Villes | `CityRepositoryImpl` | `GET /cities`, `/cities/:id` |
| Sites touristiques | `SiteRepositoryImpl` | `GET /tourist-sites`, `?city=`, `/:id` |
| Personnalités historiques | `HistoricalFigureRepositoryImpl` | `GET /historical-figures`, `?city=`, `/:id` |
| Quiz | `QuizRepositoryImpl` | `GET /quiz/questions?difficulty=`, requiert un token |
| Memory | `MemoryRepositoryImpl` | `GET /memory/items?difficulty=&limit=6`, requiert un token |
| Classement | `LeaderboardRepositoryImpl` | `GET /quiz/leaderboard`, `/memory/leaderboard` (quiz/memory réels ; chronology reste mock, voir plus bas) |

### Ce qui reste sur des données mock (précisé, comme demandé)

Ces domaines n'ont **aucune route équivalente côté backend** — impossible de les brancher sans que l'API évolue. Ils continuent donc de lire des fichiers statiques dans `src/data/datasources/local/` :

| Domaine | Repository | Fichier mock | Pourquoi |
|---|---|---|---|
| Récits | `StoryRepositoryImpl` | `stories.mock.ts` | Pas de ressource `/stories` côté API |
| Événements culturels | `CulturalEventRepositoryImpl` | `culturalEvents.mock.ts` | Pas de ressource `/events` côté API |
| Traditions | `TraditionRepositoryImpl` | `traditions.mock.ts` | Pas de ressource `/traditions` côté API |
| Chronologie | `ChronologyRepositoryImpl` | `chronology.mock.ts` | Pas de ressource dédiée ; son contenu (4 rois) est en fait déjà entièrement dupliqué dans `/historical-figures` côté API |
| Points de carte | `MapRepositoryImpl` | `mapPoints.mock.ts` | Pas de ressource `/map-points` côté API. Chaque point référence désormais le **nom réel** d'une ville/d'un site (`cityName`/`siteName`) pour résoudre dynamiquement l'ID réel (lien "Ouvrir sa fiche") et embarque directement sa propre image de couverture |
| Contributions | `ContributionRepositoryImpl` | `contributions.mock.ts` | Stockage en mémoire uniquement ; `POST /tourist-sites` existe côté API mais son schéma (nom/description/localisation/ville) ne correspond pas au modèle de contribution du front (type, catégorie, pièces jointes) — non branché faute de mapping propre, à retravailler si besoin |
| Galeries | *(non utilisé)* | — | Entité `GalleryItem`/`GalleryRepository` définie dans `domain` mais jamais consommée par un composant — code mort, malgré l'existence de `GET /galleries` côté API |

**Témoignages (audio/vidéo)** : l'API n'a pas de concept de témoignage structuré (avec intervenant, durée, fichier audio/vidéo). Pour les sites/personnalités branchés sur l'API réelle, `SiteRepositoryImpl` et `HistoricalFigureRepositoryImpl` reconstruisent les témoignages de deux façons :
1. Pour les sites qui ont un équivalent dans l'ancien mock (`porte`, `pythons`, `kpasse`, `mosquee`, `ganvie`, `palais`), le texte du témoignage du mock est réutilisé.
2. Pour "La Porte du Non-Retour" et "Palais royal d'Abomey" (et les personnalités Béhanzin / Francisco Félix de Souza), de **vrais** fichiers audio/vidéo ont été attachés en base (voir section suivante) et sont automatiquement exposés comme témoignages réellement jouables (lecteurs `<audio>`/`<video>` natifs, pas de simulation).
3. Pour les autres sites, un texte de témoignage a été rédigé (ancré dans les faits déjà présents dans leur description/historique) faute de fichier audio/vidéo réel disponible.

## Comment les données ont été fournies au backend

Le backend de démo était initialement très peu rempli (2 villes, 12 sites, 0 personnalité, 0 question de quiz/memory). Les données ont été peuplées via des scripts Python ponctuels (non conservés dans le repo — exécutés en session), qui :

1. S'authentifient en admin (`POST /auth/login` avec les identifiants de `.env.example`, rôle `admin`, seul rôle autorisé à créer directement des villes/sites/personnalités/médias sans passer par la modération).
2. Utilisent les routes d'écriture existantes : `POST /cities`, `POST /tourist-sites`, `POST /historical-figures`, `POST /media`, `POST /admin/quiz/questions`, `POST /admin/memory/items`.
3. Reprennent le contenu textuel déjà rédigé dans les fichiers mock (`cities.mock.ts`, `sites.mock.ts`, `historicalFigures.mock.ts`) comme source de vérité factuelle.
4. Pour les médias, utilisent de **vraies images/vidéos/audios libres de droits** trouvées sur Wikimedia Commons (jamais d'URL inventée) — recherche via l'API Commons, vérification du `Content-Type` réel avant intégration.

Contenu ajouté en base :
- 6 villes (Porto-Novo, Ganvié, Cotonou, Natitingou, Parakou, Grand-Popo), en plus des 2 déjà présentes (Abomey, Ouidah)
- 4 sites touristiques (pour Porto-Novo et Ganvié, qui n'en avaient aucun)
- 6 personnalités historiques (Agaja, Tassi Hangbé, Gezo, Béhanzin, Francisco Félix de Souza, Toffa Ier)
- ~180 médias (images, + 8 audio/vidéo réels) répartis sur les villes, sites et personnalités, avec un objectif d'environ 10 images par site majeur
- 21 questions de quiz et 21 cartes memory (7 par niveau facile/intermédiaire/expert — le front n'en affiche que 6 par niveau pour le memory, cf. section jeux)
- Un enregistrement audio d'archive (1931, domaine public) attaché à "Place Chacha", volontairement non câblé à l'affichage (contenu sensible à contextualiser)

### Corrections apportées en base après coup
- Un site "Vodun Day — Fête Nationale du Vodoun" existait en tant que *tourist-site* alors qu'il s'agit conceptuellement d'un événement/récit ; il est filtré côté front (`SiteRepositoryImpl`) plutôt que supprimé en base.
- "Palais royal" renommé en "Palais royal d'Abomey" via `PATCH /tourist-sites`.
- 8 médias audio/vidéo avaient une URL Wikimedia avec un paramètre `?width=` (pertinent seulement pour les images) : Wikimedia renvoyait alors une image JPEG/PNG de remplacement au lieu du flux audio/vidéo réel. URLs corrigées via `PATCH /media`.
- 9 médias pré-existants (non créés par nous) utilisent des liens de partage Google Drive, qui ne sont pas des URLs d'image directes et ne s'affichent pas. Plutôt que de les supprimer, le front les filtre systématiquement (`isDisplayableImage()` dans les repositories concernés).

## Variables d'environnement

Voir `.env.example` :
- `VITE_API_BASE_URL` — URL de base de l'API backend
- `VITE_MAPILLARY_ACCESS_TOKEN` — token pour les visites immersives 360° (MapillaryJS)
- `ADMIN_MAIL` / `ADMIN_PASSWORD` — identifiants du compte admin backend, utilisés uniquement pour les scripts de peuplement/administration de données, pas consommés par l'application elle-même à l'exécution
