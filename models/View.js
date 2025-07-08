const mongoose = require('mongoose');

const viewSchema = new mongoose.Schema({
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
viewSchema.index({ source: 1, createdAt: -1 });
viewSchema.index({ visitor: 1, createdAt: -1 });
viewSchema.index({ url: 1, createdAt: -1 });

module.exports = mongoose.model('View', viewSchema); 