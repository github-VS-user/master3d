const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const commandesFilePath = path.join(__dirname, 'commandes.json');

// Fonction pour lire les commandes depuis commandes.json
const readOrders = () => {
  try {
    const data = fs.readFileSync(commandesFilePath, 'utf8');
    return JSON.parse(data).orders;
  } catch (error) {
    console.error('Erreur lors de la lecture du fichier commandes.json :', error);
    return [];
  }
};

// Fonction pour écrire les commandes dans commandes.json
const writeOrders = (orders) => {
  try {
    fs.writeFileSync(commandesFilePath, JSON.stringify({ orders }, null, 2));
  } catch (error) {
    console.error('Erreur lors de l\'écriture dans commandes.json :', error);
  }
};

// Endpoint pour récupérer toutes les commandes
app.get('/orders', (req, res) => {
  const orders = readOrders();
  res.json({ orders });
});

// Endpoint pour mettre à jour une commande
app.post('/update-order', (req, res) => {
  const { id, status } = req.body;
  const orders = readOrders();
  const order = orders.find(order => order.id === id);

  if (order) {
    order.status = status;
    writeOrders(orders);
    res.send(`Commande ${id} mise à jour avec succès.`);
  } else {
    res.status(404).send('Commande introuvable.');
  }
});

// Endpoint pour créer une nouvelle commande
app.post('/create-order', (req, res) => {
  const { id, status, impression, distribution, destinataire, lienObjet } = req.body;
  const orders = readOrders();
  const existingOrder = orders.find(order => order.id === id);

  if (existingOrder) {
    return res.status(400).send('Une commande avec cet ID existe déjà.');
  }

  const newOrder = { id, status, impression, distribution, destinataire, lienObjet };
  orders.push(newOrder);
  writeOrders(orders);
  res.send(`Commande ${id} créée avec succès.`);
});

// Lancer le serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Serveur démarré sur le port ${PORT}`));
