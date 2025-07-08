const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Connexion MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/analytics', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Erreur de connexion MongoDB:'));
db.once('open', () => {
  console.log('Connexion à MongoDB établie');
});

// Routes
app.use('/api/views', require('./routes/views'));
app.use('/api/actions', require('./routes/actions'));
app.use('/api/goals', require('./routes/goals'));

// Route de test
app.get('/', (req, res) => {
  res.json({ message: 'API REST Analytics - MongoDB' });
});

app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
}); 