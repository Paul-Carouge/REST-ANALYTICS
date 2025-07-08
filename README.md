# API REST Analytics avec MongoDB

Une API REST complète pour collecter et analyser des données d'analytics avec MongoDB.

## 🚀 Installation

1. **Installer les dépendances :**

```bash
npm install
```

2. **Configurer l'environnement :**

```bash
cp env.example .env
# Éditer le fichier .env avec vos paramètres
```

3. **Démarrer MongoDB :**
   Assurez-vous que MongoDB est en cours d'exécution sur votre machine.

4. **Lancer l'API :**

```bash
# Mode développement
npm run dev

# Mode production
npm start
```

L'API sera disponible sur `http://localhost:3000`

## 📊 Ressources disponibles

### 1. Vues (`/api/views`)

Collecte des vues de pages avec métadonnées flexibles.

**Structure :**

```json
{
  "source": "string",
  "url": "string",
  "visitor": "string",
  "createdAt": "Date",
  "meta": {}
}
```

### 2. Actions (`/api/actions`)

Collecte des actions utilisateur (clics, scrolls, etc.).

**Structure :**

```json
{
  "source": "string",
  "url": "string",
  "action": "string",
  "visitor": "string",
  "createdAt": "Date",
  "meta": {}
}
```

### 3. Objectifs (`/api/goals`)

Collecte des conversions et objectifs atteints.

**Structure :**

```json
{
  "source": "string",
  "url": "string",
  "goal": "string",
  "visitor": "string",
  "createdAt": "Date",
  "meta": {}
}
```

## 🔧 Endpoints disponibles

### Vues

- `GET /api/views` - Liste des vues (avec pagination et filtres)
- `GET /api/views/:id` - Détails d'une vue
- `POST /api/views` - Créer une vue
- `PUT /api/views/:id` - Modifier une vue
- `DELETE /api/views/:id` - Supprimer une vue
- `GET /api/views/stats/summary` - Statistiques des vues

### Actions

- `GET /api/actions` - Liste des actions (avec pagination et filtres)
- `GET /api/actions/:id` - Détails d'une action
- `POST /api/actions` - Créer une action
- `PUT /api/actions/:id` - Modifier une action
- `DELETE /api/actions/:id` - Supprimer une action
- `GET /api/actions/stats/summary` - Statistiques des actions

### Objectifs

- `GET /api/goals` - Liste des objectifs (avec pagination et filtres)
- `GET /api/goals/:id` - Détails d'un objectif
- `POST /api/goals` - Créer un objectif
- `PUT /api/goals/:id` - Modifier un objectif
- `DELETE /api/goals/:id` - Supprimer un objectif
- `GET /api/goals/stats/summary` - Statistiques des objectifs

## 📝 Exemples d'utilisation

### Créer une vue

```bash
curl -X POST http://localhost:3000/api/views \
  -H "Content-Type: application/json" \
  -d '{
    "source": "website",
    "url": "https://example.com/page",
    "visitor": "user123",
    "meta": {
      "userAgent": "Mozilla/5.0...",
      "referrer": "https://google.com",
      "screenSize": "1920x1080"
    }
  }'
```

### Créer une action

```bash
curl -X POST http://localhost:3000/api/actions \
  -H "Content-Type: application/json" \
  -d '{
    "source": "mobile-app",
    "url": "https://example.com/product",
    "action": "add_to_cart",
    "visitor": "user456",
    "meta": {
      "productId": "prod_123",
      "price": 29.99,
      "category": "electronics"
    }
  }'
```

### Créer un objectif

```bash
curl -X POST http://localhost:3000/api/goals \
  -H "Content-Type: application/json" \
  -d '{
    "source": "website",
    "url": "https://example.com/checkout",
    "goal": "purchase_completed",
    "visitor": "user789",
    "meta": {
      "orderId": "order_456",
      "totalAmount": 149.99,
      "paymentMethod": "credit_card"
    }
  }'
```

## 🔍 Filtres et pagination

Tous les endpoints de liste supportent la pagination et les filtres :

```bash
# Pagination
GET /api/views?page=1&limit=20

# Filtres
GET /api/views?source=website&visitor=user123

# Combinaison
GET /api/actions?page=2&limit=10&action=click&source=mobile-app
```

## 📈 Statistiques

Chaque ressource propose des endpoints de statistiques :

```bash
# Statistiques des vues
GET /api/views/stats/summary

# Statistiques des actions
GET /api/actions/stats/summary

# Statistiques des objectifs
GET /api/goals/stats/summary
```

## 🗄️ Base de données

L'API utilise MongoDB avec les collections suivantes :

- `views` - Stockage des vues
- `actions` - Stockage des actions
- `goals` - Stockage des objectifs

Chaque collection inclut des index pour optimiser les performances des requêtes.

## 🛠️ Technologies utilisées

- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web
- **MongoDB** - Base de données NoSQL
- **Mongoose** - ODM pour MongoDB
- **CORS** - Gestion des requêtes cross-origin

## 📋 Prérequis

- Node.js (version 14 ou supérieure)
- MongoDB (version 4.4 ou supérieure)
- npm ou yarn

## 🔒 Sécurité

- Validation des données d'entrée
- Gestion des erreurs centralisée
- Protection CORS configurable
- Validation des types avec Mongoose

## 🚀 Déploiement

L'API est prête pour le déploiement en production. Assurez-vous de :

1. Configurer les variables d'environnement
2. Sécuriser la connexion MongoDB
3. Configurer un reverse proxy si nécessaire
4. Mettre en place la surveillance et les logs
