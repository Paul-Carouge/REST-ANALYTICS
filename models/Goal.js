const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema({
  source: {
    type: String,
    required: true,
    trim: true
  },
  url: {
    type: String,
    required: true,
    trim: true
  },
  goal: {
    type: String,
    required: true,
    trim: true
  },
  visitor: {
    type: String,
    required: true,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  meta: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  }
}, {
  timestamps: true
});

// Index pour améliorer les performances
goalSchema.index({ source: 1, createdAt: -1 });
goalSchema.index({ visitor: 1, createdAt: -1 });
goalSchema.index({ goal: 1, createdAt: -1 });
goalSchema.index({ url: 1, createdAt: -1 });

module.exports = mongoose.model('Goal', goalSchema); 