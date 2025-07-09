const express = require('express');
const router = express.Router();
const Action = require('../models/Action');

// Récupérer toutes les actions
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10, source, visitor, action, url } = req.query;
    
    const filter = {};
    if (source) filter.source = source;
    if (visitor) filter.visitor = visitor;
    if (action) filter.action = action;
    if (url) filter.url = url;

    const actions = await Action.find(filter)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await Action.countDocuments(filter);

    res.json({
      actions,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      totalCount: count
    });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
});

// Récupérer une action par ID
router.get('/:id', async (req, res) => {
  try {
    const action = await Action.findById(req.params.id);
    if (!action) {
      return res.status(404).json({ message: 'Action non trouvée' });
    }
    res.json(action);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
});

// Créer une nouvelle action
router.post('/', async (req, res) => {
  try {
    const { source, url, action, visitor, meta } = req.body;
    
    if (!source || !url || !action || !visitor) {
      return res.status(400).json({ 
        message: 'Les champs source, url, action et visitor sont requis' 
      });
    }

    const newAction = new Action({
      source,
      url,
      action,
      visitor,
      meta: meta || {}
    });

    const savedAction = await newAction.save();
    res.status(201).json(savedAction);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
});

// Mettre à jour une action
router.put('/:id', async (req, res) => {
  try {
    const { source, url, action, visitor, meta } = req.body;
    
    const updateData = {};
    if (source) updateData.source = source;
    if (url) updateData.url = url;
    if (action) updateData.action = action;
    if (visitor) updateData.visitor = visitor;
    if (meta) updateData.meta = meta;

    const updatedAction = await Action.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedAction) {
      return res.status(404).json({ message: 'Action non trouvée' });
    }

    res.json(updatedAction);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
});

// Supprimer une action
router.delete('/:id', async (req, res) => {
  try {
    const action = await Action.findByIdAndDelete(req.params.id);
    if (!action) {
      return res.status(404).json({ message: 'Action non trouvée' });
    }
    res.json({ message: 'Action supprimée avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
});

// Statistiques des actions
router.get('/stats/summary', async (req, res) => {
  try {
    const totalActions = await Action.countDocuments();
    const uniqueVisitors = await Action.distinct('visitor').count();
    const uniqueSources = await Action.distinct('source').count();
    const uniqueActions = await Action.distinct('action').count();
    const uniqueUrls = await Action.distinct('url').count();

    // Actions les plus populaires
    const popularActions = await Action.aggregate([
      { $group: { _id: '$action', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 10 }
    ]);

    res.json({
      totalActions,
      uniqueVisitors,
      uniqueSources,
      uniqueActions,
      uniqueUrls,
      popularActions
    });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
});

module.exports = router; 