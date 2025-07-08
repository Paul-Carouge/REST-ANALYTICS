const mongoose = require('mongoose');

const actionSchema = new mongoose.Schema({
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
  action: {
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
actionSchema.index({ source: 1, createdAt: -1 });
actionSchema.index({ visitor: 1, createdAt: -1 });
actionSchema.index({ action: 1, createdAt: -1 });
actionSchema.index({ url: 1, createdAt: -1 });

module.exports = mongoose.model('Action', actionSchema); 