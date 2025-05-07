const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();

// Connexion à MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/geoloc_exam', {
}).then(() => {
  console.log('Connexion à MongoDB réussie');
}).catch(err => {
  console.error('Erreur de connexion à MongoDB :', err);
});

// Schéma et modèle pour stocker les coordonnées géographiques
const locationSchema = new mongoose.Schema({
  latitude: Number,
  longitude: Number,
  timestamp: Date
});

const Location = mongoose.model('Location', locationSchema);

// Middleware
app.use(express.json()); // Pour parser les données JSON
app.use(express.static(path.join(__dirname, 'public'))); // Pour servir les fichiers statiques (HTML, CSS, JS)

// Route pour servir la page d'accueil (index.html)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Route POST pour enregistrer les coordonnées géographiques
app.post('/save-location', async (req, res) => {
  try {
    const { latitude, longitude, timestamp } = req.body;
    const newLoc = new Location({ latitude, longitude, timestamp: new Date(timestamp) });
    await newLoc.save(); // Sauvegarde les coordonnées dans MongoDB
    res.status(200).send('Coordonnées enregistrées');
  } catch (err) {
    console.error('Erreur lors de l’enregistrement :', err);
    res.status(500).send('Erreur serveur');
  }
});

// Route pour afficher les coordonnées enregistrées (pour l'enseignant)
app.get('/teacher-dashboard', async (req, res) => {
  try {
    const locations = await Location.find().sort({ timestamp: -1 }); // Récupère les coordonnées triées par date
    let html =` <h1>Les coordonnées des étudiants</h1><table border="1"><tr><th>Latitude</th><th>Longitude</th><th>Date</th></tr>`;
    
    // Boucle pour afficher les coordonnées dans un tableau HTML
    locations.forEach(loc => {
      html +=`<tr><td>${loc.latitude}</td><td>${loc.longitude}</td><td>${loc.timestamp.toLocaleString()}</td></tr>`;
    });
    
    html += `</table>`; // Ferme le tableau HTML
    res.send(html); // Envoie le tableau HTML avec les données au navigateur
  } catch (err) {
    res.status(500).send('Erreur de lecture des données');
  }
});

// Lancement du serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});