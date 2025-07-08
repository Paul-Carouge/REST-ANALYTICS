const mongoose = require('mongoose');
const View = require('../models/View');
const Action = require('../models/Action');
const Goal = require('../models/Goal');
require('dotenv').config();

// Connexion MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/analytics', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Données de test pour les vues
const sampleViews = [
  {
    source: 'website',
    url: 'https://example.com/home',
    visitor: 'user_001',
    meta: {
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      referrer: 'https://google.com',
      screenSize: '1920x1080',
      language: 'fr-FR',
      timezone: 'Europe/Paris'
    }
  },
  {
    source: 'mobile-app',
    url: 'https://example.com/product/123',
    visitor: 'user_002',
    meta: {
      device: 'iPhone 12',
      os: 'iOS 15.0',
      appVersion: '2.1.0',
      location: { country: 'France', city: 'Paris' },
      preferences: { language: 'fr', theme: 'dark' }
    }
  },
  {
    source: 'website',
    url: 'https://example.com/about',
    visitor: 'user_003',
    meta: {
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
      referrer: 'https://facebook.com',
      screenSize: '1440x900',
      language: 'en-US',
      timezone: 'America/New_York'
    }
  }
];

// Données de test pour les actions
const sampleActions = [
  {
    source: 'website',
    url: 'https://example.com/product/456',
    action: 'click',
    visitor: 'user_004',
    meta: {
      element: 'buy-button',
      position: { x: 150, y: 300 },
      timestamp: new Date(),
      sessionId: 'sess_12345'
    }
  },
  {
    source: 'mobile-app',
    url: 'https://example.com/checkout',
    action: 'add_to_cart',
    visitor: 'user_005',
    meta: {
      product: {
        id: 'prod_789',
        name: 'Smartphone XYZ',
        price: 599.99,
        category: 'electronics'
      },
      cart: { totalItems: 3, totalValue: 1299.97 },
      user: { isLoggedIn: true, membership: 'premium' }
    }
  },
  {
    source: 'website',
    url: 'https://example.com/contact',
    action: 'form_submit',
    visitor: 'user_006',
    meta: {
      formType: 'contact',
      fields: ['name', 'email', 'message'],
      validation: { success: true, errors: [] }
    }
  }
];

// Données de test pour les objectifs
const sampleGoals = [
  {
    source: 'website',
    url: 'https://example.com/thank-you',
    goal: 'purchase_completed',
    visitor: 'user_007',
    meta: {
      orderId: 'order_12345',
      amount: 299.99,
      products: ['prod_001', 'prod_002'],
      paymentMethod: 'credit_card'
    }
  },
  {
    source: 'mobile-app',
    url: 'https://example.com/subscription',
    goal: 'subscription_activated',
    visitor: 'user_008',
    meta: {
      subscription: {
        plan: 'premium',
        duration: '12 months',
        price: 99.99,
        features: ['unlimited_access', 'priority_support']
      },
      payment: {
        method: 'credit_card',
        provider: 'stripe',
        transactionId: 'txn_67890'
      }
    }
  },
  {
    source: 'website',
    url: 'https://example.com/newsletter',
    goal: 'newsletter_signup',
    visitor: 'user_009',
    meta: {
      email: 'user@example.com',
      preferences: ['tech', 'marketing'],
      source: 'popup_modal'
    }
  }
];

async function seedData() {
  try {
    console.log('🌱 Démarrage de l\'ajout de données de test...');

    // Nettoyer les collections existantes
    await View.deleteMany({});
    await Action.deleteMany({});
    await Goal.deleteMany({});
    console.log('🧹 Collections nettoyées');

    // Ajouter les vues
    const views = await View.insertMany(sampleViews);
    console.log(`✅ ${views.length} vues ajoutées`);

    // Ajouter les actions
    const actions = await Action.insertMany(sampleActions);
    console.log(`✅ ${actions.length} actions ajoutées`);

    // Ajouter les objectifs
    const goals = await Goal.insertMany(sampleGoals);
    console.log(`✅ ${goals.length} objectifs ajoutés`);

    console.log('\n🎉 Données de test ajoutées avec succès !');
    console.log('\n📊 Statistiques :');
    console.log(`- Vues: ${views.length}`);
    console.log(`- Actions: ${actions.length}`);
    console.log(`- Objectifs: ${goals.length}`);

    // Afficher quelques exemples
    console.log('\n📝 Exemples de données créées :');
    console.log('Vue:', views[0]._id);
    console.log('Action:', actions[0]._id);
    console.log('Objectif:', goals[0]._id);

  } catch (error) {
    console.error('❌ Erreur lors de l\'ajout des données:', error);
  } finally {
    mongoose.connection.close();
    console.log('🔌 Connexion MongoDB fermée');
  }
}

// Exécuter le script
seedData(); 