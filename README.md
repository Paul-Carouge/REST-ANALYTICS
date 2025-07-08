# 🚀 API REST Analytics avec MongoDB

Une API REST complète et flexible pour collecter et analyser des données d'analytics avec MongoDB. Parfaite pour stocker des logs, des événements utilisateur et des métadonnées de toutes formes.

## 📋 Table des matières

- [🚀 Installation rapide](#-installation-rapide)
- [📊 Fonctionnalités](#-fonctionnalités)
- [🗄️ Structure des données](#️-structure-des-données)
- [🔧 API Endpoints](#-api-endpoints)
- [🧪 Tests avec Insomnia](#-tests-avec-insomnia)
- [📈 Exemples d'utilisation](#-exemples-dutilisation)
- [🛠️ Configuration](#️-configuration)
- [📚 Documentation complète](#-documentation-complète)

## 🚀 Installation rapide

### Prérequis

- **Node.js** (version 14 ou supérieure)
- **MongoDB** (version 4.4 ou supérieure)
- **npm** ou **yarn**

### Installation en 3 étapes

```bash
# 1. Installer les dépendances
npm install

# 2. Configurer l'environnement
cp env.example .env
# Éditer .env avec votre URI MongoDB

# 3. Démarrer l'API
npm start
```

L'API sera disponible sur `http://localhost:3000`

## 📊 Fonctionnalités

### ✨ Fonctionnalités principales

- **3 ressources flexibles** : Vues, Actions, Objectifs
- **Métadonnées dynamiques** : Stockage de n'importe quelle structure JSON
- **API REST complète** : CRUD + statistiques + filtres
- **Pagination automatique** : Gestion des grandes collections
- **Filtres avancés** : Recherche par tous les champs
- **Statistiques agrégées** : Analyses en temps réel
- **Validation robuste** : Gestion d'erreurs centralisée

### 🎯 Cas d'usage

- **Analytics web** : Tracking de pages vues, clics, conversions
- **Applications mobiles** : Événements utilisateur, crashs, performances
- **E-commerce** : Comportement d'achat, paniers abandonnés
- **SaaS** : Utilisation des fonctionnalités, abonnements
- **IoT** : Données de capteurs, événements système

## 🗄️ Structure des données

### 📊 Vues (`/api/views`)

```json
{
  "source": "string", // Source de la vue (website, mobile-app, etc.)
  "url": "string", // URL de la page
  "visitor": "string", // Identifiant du visiteur
  "createdAt": "Date", // Timestamp automatique
  "meta": {} // Métadonnées flexibles (n'importe quoi !)
}
```

### 🎯 Actions (`/api/actions`)

```json
{
  "source": "string", // Source de l'action
  "url": "string", // URL de la page
  "action": "string", // Type d'action (click, scroll, etc.)
  "visitor": "string", // Identifiant du visiteur
  "createdAt": "Date", // Timestamp automatique
  "meta": {} // Métadonnées flexibles
}
```

### 🏆 Objectifs (`/api/goals`)

```json
{
  "source": "string", // Source de l'objectif
  "url": "string", // URL de la page
  "goal": "string", // Type d'objectif (purchase, signup, etc.)
  "visitor": "string", // Identifiant du visiteur
  "createdAt": "Date", // Timestamp automatique
  "meta": {} // Métadonnées flexibles
}
```

## 🔧 API Endpoints

### 📊 Vues (`/api/views`)

| Méthode  | Endpoint                   | Description                           |
| -------- | -------------------------- | ------------------------------------- |
| `GET`    | `/api/views`               | Liste des vues (pagination + filtres) |
| `GET`    | `/api/views/:id`           | Détails d'une vue                     |
| `POST`   | `/api/views`               | Créer une vue                         |
| `PUT`    | `/api/views/:id`           | Modifier une vue                      |
| `DELETE` | `/api/views/:id`           | Supprimer une vue                     |
| `GET`    | `/api/views/stats/summary` | Statistiques des vues                 |

### 🎯 Actions (`/api/actions`)

| Méthode  | Endpoint                     | Description                              |
| -------- | ---------------------------- | ---------------------------------------- |
| `GET`    | `/api/actions`               | Liste des actions (pagination + filtres) |
| `GET`    | `/api/actions/:id`           | Détails d'une action                     |
| `POST`   | `/api/actions`               | Créer une action                         |
| `PUT`    | `/api/actions/:id`           | Modifier une action                      |
| `DELETE` | `/api/actions/:id`           | Supprimer une action                     |
| `GET`    | `/api/actions/stats/summary` | Statistiques des actions                 |

### 🏆 Objectifs (`/api/goals`)

| Méthode  | Endpoint                   | Description                                |
| -------- | -------------------------- | ------------------------------------------ |
| `GET`    | `/api/goals`               | Liste des objectifs (pagination + filtres) |
| `GET`    | `/api/goals/:id`           | Détails d'un objectif                      |
| `POST`   | `/api/goals`               | Créer un objectif                          |
| `PUT`    | `/api/goals/:id`           | Modifier un objectif                       |
| `DELETE` | `/api/goals/:id`           | Supprimer un objectif                      |
| `GET`    | `/api/goals/stats/summary` | Statistiques des objectifs                 |

## 🧪 Tests avec Insomnia

### Import de la collection

1. Ouvrir Insomnia
2. Cliquer sur **"Import/Export"** (icône ↕️)
3. Sélectionner **"Import Data"** → **"From File"**
4. Choisir `insomnia-collection.json`
5. La collection **"API Analytics MongoDB"** apparaîtra

### Ordre de test recommandé

```bash
# 1. Test de base
GET http://localhost:3000/

# 2. Créer des données
POST /api/views (exemple simple)
POST /api/views (exemple complexe)
POST /api/actions (exemple simple)
POST /api/actions (exemple complexe)
POST /api/goals (exemple simple)
POST /api/goals (exemple complexe)

# 3. Lister les données
GET /api/views
GET /api/actions
GET /api/goals

# 4. Statistiques
GET /api/views/stats/summary
GET /api/actions/stats/summary
GET /api/goals/stats/summary

# 5. Tests CRUD (après avoir copié les IDs)
GET /api/views/:id
PUT /api/views/:id
DELETE /api/views/:id
```

## 📈 Exemples d'utilisation

### Créer une vue simple

```bash
curl -X POST http://localhost:3000/api/views \
  -H "Content-Type: application/json" \
  -d '{
    "source": "website",
    "url": "https://example.com/home",
    "visitor": "user123",
    "meta": {
      "userAgent": "Mozilla/5.0...",
      "referrer": "https://google.com",
      "screenSize": "1920x1080"
    }
  }'
```

### Créer une action complexe

```bash
curl -X POST http://localhost:3000/api/actions \
  -H "Content-Type: application/json" \
  -d '{
    "source": "mobile-app",
    "url": "https://example.com/product",
    "action": "add_to_cart",
    "visitor": "user456",
    "meta": {
      "product": {
        "id": "prod_123",
        "name": "Smartphone XYZ",
        "price": 599.99,
        "category": "electronics"
      },
      "cart": {
        "totalItems": 3,
        "totalValue": 1299.97
      },
      "user": {
        "isLoggedIn": true,
        "membership": "premium"
      }
    }
  }'
```

### Créer un objectif avec métadonnées riches

```bash
curl -X POST http://localhost:3000/api/goals \
  -H "Content-Type: application/json" \
  -d '{
    "source": "website",
    "url": "https://example.com/checkout",
    "goal": "purchase_completed",
    "visitor": "user789",
    "meta": {
      "order": {
        "id": "order_456",
        "amount": 299.99,
        "currency": "EUR",
        "products": ["prod_001", "prod_002"]
      },
      "payment": {
        "method": "credit_card",
        "provider": "stripe",
        "transactionId": "txn_789"
      },
      "customer": {
        "email": "user@example.com",
        "country": "France",
        "isNewCustomer": false
      }
    }
  }'
```

## 🛠️ Configuration

### Variables d'environnement (`.env`)

```bash
# Configuration MongoDB
MONGODB_URI=mongodb://localhost:27017/analytics

# Configuration du serveur
PORT=3000

# Configuration CORS (optionnel)
CORS_ORIGIN=http://localhost:3000
```

### Scripts disponibles

```bash
npm start          # Démarrer en production
npm run dev        # Démarrer en développement (avec nodemon)
npm test           # Lancer les tests automatiques
npm run seed       # Ajouter des données de test
```

### Structure du projet

```
ANALYTICS/
├── server.js              # Serveur principal
├── package.json           # Dépendances et scripts
├── README.md              # Cette documentation
├── .gitignore             # Fichiers à ignorer
├── env.example            # Variables d'environnement
├── test-api.js            # Tests automatiques
├── insomnia-collection.json # Collection Insomnia
├── models/                # Modèles Mongoose
│   ├── View.js           # Modèle des vues
│   ├── Action.js         # Modèle des actions
│   └── Goal.js           # Modèle des objectifs
├── routes/                # Routes de l'API
│   ├── views.js          # Routes des vues
│   ├── actions.js        # Routes des actions
│   └── goals.js          # Routes des objectifs
└── scripts/               # Scripts utilitaires
    └── seed-data.js       # Données de test
```

## 📚 Documentation complète

### Filtres et pagination

Tous les endpoints de liste supportent :

**Pagination :**

```bash
GET /api/views?page=1&limit=20
```

**Filtres :**

```bash
GET /api/views?source=website&visitor=user123
GET /api/actions?action=click&source=mobile-app
GET /api/goals?goal=purchase_completed
```

**Combinaison :**

```bash
GET /api/actions?page=2&limit=10&action=click&source=website
```

### Réponses standardisées

**Liste avec pagination :**

```json
{
  "views": [...],
  "totalPages": 5,
  "currentPage": 1,
  "totalCount": 100
}
```

**Statistiques :**

```json
{
  "totalViews": 1000,
  "uniqueVisitors": 250,
  "uniqueSources": 3,
  "uniqueUrls": 50
}
```

### Gestion d'erreurs

```json
{
  "message": "Les champs source, url et visitor sont requis"
}
```

### Codes de statut HTTP

- `200` : Succès
- `201` : Créé avec succès
- `400` : Données invalides
- `404` : Ressource non trouvée
- `500` : Erreur serveur

## 🎯 Avantages de cette API

### ✅ Flexibilité MongoDB

- **Métadonnées dynamiques** : Stockage de n'importe quelle structure JSON
- **Évolution du schéma** : Pas de migration nécessaire
- **Performance** : Index optimisés pour les requêtes fréquentes

### ✅ API REST complète

- **CRUD complet** : Création, lecture, modification, suppression
- **Statistiques intégrées** : Analyses en temps réel
- **Filtres avancés** : Recherche flexible
- **Pagination automatique** : Gestion des grandes collections

### ✅ Prêt pour la production

- **Validation robuste** : Gestion d'erreurs centralisée
- **CORS configuré** : Compatible cross-origin
- **Logs structurés** : Debugging facilité
- **Tests inclus** : Validation automatique

## 🚀 Déploiement

### Production

1. Configurer les variables d'environnement
2. Sécuriser la connexion MongoDB
3. Configurer un reverse proxy (nginx)
4. Mettre en place la surveillance

### Docker (optionnel)

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature
3. Commit les changements
4. Push vers la branche
5. Ouvrir une Pull Request

## 📄 Licence

ISC License - Libre d'utilisation

---

**🎉 Votre API Analytics est prête !** MongoDB gère parfaitement la flexibilité des métadonnées, et vous pouvez stocker n'importe quelle structure de données sans contrainte de schéma.
