const express = require('express');
const router = express.Router();
const View = require('../models/View');

// GET /api/views - Récupérer toutes les vues
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10, source, visitor, url } = req.query;
    
    const filter = {};
    if (source) filter.source = source;
    if (visitor) filter.visitor = visitor;
    if (url) filter.url = url;

    const views = await View.find(filter)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await View.countDocuments(filter);

    res.json({
      views,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      totalCount: count
    });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
});

// GET /api/views/:id - Récupérer une vue par ID
router.get('/:id', async (req, res) => {
  try {
    const view = await View.findById(req.params.id);
    if (!view) {
      return res.status(404).json({ message: 'Vue non trouvée' });
    }
    res.json(view);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
});

// POST /api/views - Créer une nouvelle vue
router.post('/', async (req, res) => {
  try {
    const { source, url, visitor, meta } = req.body;
    
    if (!source || !url || !visitor) {
      return res.status(400).json({ 
        message: 'Les champs source, url et visitor sont requis' 
      });
    }

    const view = new View({
      source,
      url,
      visitor,
      meta: meta || {}
    });

    const savedView = await view.save();
    res.status(201).json(savedView);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
});

// PUT /api/views/:id - Mettre à jour une vue
router.put('/:id', async (req, res) => {
  try {
    const { source, url, visitor, meta } = req.body;
    
    const updateData = {};
    if (source) updateData.source = source;
    if (url) updateData.url = url;
    if (visitor) updateData.visitor = visitor;
    if (meta) updateData.meta = meta;

    const view = await View.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!view) {
      return res.status(404).json({ message: 'Vue non trouvée' });
    }

    res.json(view);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
});

// DELETE /api/views/:id - Supprimer une vue
router.delete('/:id', async (req, res) => {
  try {
    const view = await View.findByIdAndDelete(req.params.id);
    if (!view) {
      return res.status(404).json({ message: 'Vue non trouvée' });
    }
    res.json({ message: 'Vue supprimée avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
});

// GET /api/views/stats/summary - Statistiques des vues
router.get('/stats/summary', async (req, res) => {
  try {
    const totalViews = await View.countDocuments();
    const uniqueVisitors = await View.distinct('visitor').count();
    const uniqueSources = await View.distinct('source').count();
    const uniqueUrls = await View.distinct('url').count();

    res.json({
      totalViews,
      uniqueVisitors,
      uniqueSources,
      uniqueUrls
    });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
});

module.exports = router; 