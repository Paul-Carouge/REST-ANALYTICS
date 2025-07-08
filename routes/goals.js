const express = require('express');
const router = express.Router();
const Goal = require('../models/Goal');

// GET /api/goals - Récupérer tous les objectifs
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10, source, visitor, goal, url } = req.query;
    
    const filter = {};
    if (source) filter.source = source;
    if (visitor) filter.visitor = visitor;
    if (goal) filter.goal = goal;
    if (url) filter.url = url;

    const goals = await Goal.find(filter)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await Goal.countDocuments(filter);

    res.json({
      goals,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      totalCount: count
    });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
});

// GET /api/goals/:id - Récupérer un objectif par ID
router.get('/:id', async (req, res) => {
  try {
    const goal = await Goal.findById(req.params.id);
    if (!goal) {
      return res.status(404).json({ message: 'Objectif non trouvé' });
    }
    res.json(goal);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
});

// POST /api/goals - Créer un nouvel objectif
router.post('/', async (req, res) => {
  try {
    const { source, url, goal, visitor, meta } = req.body;
    
    if (!source || !url || !goal || !visitor) {
      return res.status(400).json({ 
        message: 'Les champs source, url, goal et visitor sont requis' 
      });
    }

    const newGoal = new Goal({
      source,
      url,
      goal,
      visitor,
      meta: meta || {}
    });

    const savedGoal = await newGoal.save();
    res.status(201).json(savedGoal);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
});

// PUT /api/goals/:id - Mettre à jour un objectif
router.put('/:id', async (req, res) => {
  try {
    const { source, url, goal, visitor, meta } = req.body;
    
    const updateData = {};
    if (source) updateData.source = source;
    if (url) updateData.url = url;
    if (goal) updateData.goal = goal;
    if (visitor) updateData.visitor = visitor;
    if (meta) updateData.meta = meta;

    const updatedGoal = await Goal.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedGoal) {
      return res.status(404).json({ message: 'Objectif non trouvé' });
    }

    res.json(updatedGoal);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
});

// DELETE /api/goals/:id - Supprimer un objectif
router.delete('/:id', async (req, res) => {
  try {
    const goal = await Goal.findByIdAndDelete(req.params.id);
    if (!goal) {
      return res.status(404).json({ message: 'Objectif non trouvé' });
    }
    res.json({ message: 'Objectif supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
});

// GET /api/goals/stats/summary - Statistiques des objectifs
router.get('/stats/summary', async (req, res) => {
  try {
    const totalGoals = await Goal.countDocuments();
    const uniqueVisitors = await Goal.distinct('visitor').count();
    const uniqueSources = await Goal.distinct('source').count();
    const uniqueGoals = await Goal.distinct('goal').count();
    const uniqueUrls = await Goal.distinct('url').count();

    // Objectifs les plus populaires
    const popularGoals = await Goal.aggregate([
      { $group: { _id: '$goal', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 10 }
    ]);

    // Taux de conversion par objectif
    const goalConversionRates = await Goal.aggregate([
      { $group: { _id: '$goal', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    res.json({
      totalGoals,
      uniqueVisitors,
      uniqueSources,
      uniqueGoals,
      uniqueUrls,
      popularGoals,
      goalConversionRates
    });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
});

module.exports = router; 