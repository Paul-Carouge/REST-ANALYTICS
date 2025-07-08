const axios = require('axios');

const BASE_URL = 'http://localhost:3000/api';

// Configuration axios
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Fonction pour tester les vues
async function testViews() {
  console.log('\n🧪 Test des vues...');
  
  try {
    // Créer une vue avec meta simple
    const view1 = await api.post('/views', {
      source: 'website',
      url: 'https://example.com/home',
      visitor: 'user123',
      meta: {
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
        referrer: 'https://google.com',
        screenSize: '1920x1080'
      }
    });
    console.log('✅ Vue créée avec meta simple:', view1.data._id);

    // Créer une vue avec meta complexe
    const view2 = await api.post('/views', {
      source: 'mobile-app',
      url: 'https://example.com/product/123',
      visitor: 'user456',
      meta: {
        device: 'iPhone 12',
        os: 'iOS 15.0',
        appVersion: '2.1.0',
        location: {
          country: 'France',
          city: 'Paris'
        },
        preferences: {
          language: 'fr',
          theme: 'dark'
        }
      }
    });
    console.log('✅ Vue créée avec meta complexe:', view2.data._id);

    // Lister les vues
    const views = await api.get('/views');
    console.log('✅ Vues récupérées:', views.data.views.length);

    // Statistiques
    const stats = await api.get('/views/stats/summary');
    console.log('✅ Statistiques des vues:', stats.data);

  } catch (error) {
    console.error('❌ Erreur vues:', error.response?.data || error.message);
  }
}

// Fonction pour tester les actions
async function testActions() {
  console.log('\n🧪 Test des actions...');
  
  try {
    // Créer une action simple
    const action1 = await api.post('/actions', {
      source: 'website',
      url: 'https://example.com/product/456',
      action: 'click',
      visitor: 'user789',
      meta: {
        element: 'buy-button',
        position: { x: 150, y: 300 }
      }
    });
    console.log('✅ Action créée:', action1.data._id);

    // Créer une action avec meta complexe
    const action2 = await api.post('/actions', {
      source: 'mobile-app',
      url: 'https://example.com/checkout',
      action: 'add_to_cart',
      visitor: 'user101',
      meta: {
        product: {
          id: 'prod_789',
          name: 'Smartphone XYZ',
          price: 599.99,
          category: 'electronics'
        },
        cart: {
          totalItems: 3,
          totalValue: 1299.97
        },
        user: {
          isLoggedIn: true,
          membership: 'premium'
        }
      }
    });
    console.log('✅ Action complexe créée:', action2.data._id);

    // Lister les actions
    const actions = await api.get('/actions');
    console.log('✅ Actions récupérées:', actions.data.actions.length);

    // Statistiques
    const stats = await api.get('/actions/stats/summary');
    console.log('✅ Statistiques des actions:', stats.data);

  } catch (error) {
    console.error('❌ Erreur actions:', error.response?.data || error.message);
  }
}

// Fonction pour tester les objectifs
async function testGoals() {
  console.log('\n🧪 Test des objectifs...');
  
  try {
    // Créer un objectif simple
    const goal1 = await api.post('/goals', {
      source: 'website',
      url: 'https://example.com/thank-you',
      goal: 'purchase_completed',
      visitor: 'user202',
      meta: {
        orderId: 'order_12345',
        amount: 299.99
      }
    });
    console.log('✅ Objectif créé:', goal1.data._id);

    // Créer un objectif avec meta complexe
    const goal2 = await api.post('/goals', {
      source: 'mobile-app',
      url: 'https://example.com/subscription',
      goal: 'subscription_activated',
      visitor: 'user303',
      meta: {
        subscription: {
          plan: 'premium',
          duration: '12 months',
          price: 99.99,
          features: ['unlimited_access', 'priority_support', 'advanced_analytics']
        },
        payment: {
          method: 'credit_card',
          provider: 'stripe',
          transactionId: 'txn_67890'
        },
        user: {
          email: 'user@example.com',
          registrationDate: '2023-01-15'
        }
      }
    });
    console.log('✅ Objectif complexe créé:', goal2.data._id);

    // Lister les objectifs
    const goals = await api.get('/goals');
    console.log('✅ Objectifs récupérés:', goals.data.goals.length);

    // Statistiques
    const stats = await api.get('/goals/stats/summary');
    console.log('✅ Statistiques des objectifs:', stats.data);

  } catch (error) {
    console.error('❌ Erreur objectifs:', error.response?.data || error.message);
  }
}

// Fonction pour tester les filtres et pagination
async function testFilters() {
  console.log('\n🧪 Test des filtres et pagination...');
  
  try {
    // Test filtres vues
    const filteredViews = await api.get('/views?source=website&limit=5');
    console.log('✅ Vues filtrées par source:', filteredViews.data.views.length);

    // Test filtres actions
    const filteredActions = await api.get('/actions?action=click&page=1&limit=3');
    console.log('✅ Actions filtrées par type:', filteredActions.data.actions.length);

    // Test filtres objectifs
    const filteredGoals = await api.get('/goals?goal=purchase_completed');
    console.log('✅ Objectifs filtrés par type:', filteredGoals.data.goals.length);

  } catch (error) {
    console.error('❌ Erreur filtres:', error.response?.data || error.message);
  }
}

// Fonction principale
async function runTests() {
  console.log('🚀 Démarrage des tests de l\'API Analytics...');
  
  try {
    // Test de la route principale
    const response = await api.get('/');
    console.log('✅ API accessible:', response.data.message);
    
    await testViews();
    await testActions();
    await testGoals();
    await testFilters();
    
    console.log('\n🎉 Tous les tests sont terminés avec succès !');
    console.log('\n📊 L\'API est prête à être utilisée avec MongoDB.');
    console.log('💡 Vous pouvez maintenant tester les différents endpoints avec des données réelles.');
    
  } catch (error) {
    console.error('❌ Erreur générale:', error.message);
    console.log('💡 Assurez-vous que l\'API est démarrée sur http://localhost:3000');
  }
}

// Exécuter les tests
runTests(); 