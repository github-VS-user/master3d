const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Simuler une base de données en mémoire
let orders = [
  {
    id: "001",
    status: "En Attente",
    impression: "Dario",
    distribution: "Oscar",
    destinataire: "Jean Dupont",
    lienObjet: "https://example.com/objet-imprimer"
  }
];

// Endpoint pour récupérer toutes les commandes
app.get('/orders', (req, res) => {
  res.json({ orders });
});

// Endpoint pour mettre à jour une commande
app.post('/update-order', (req, res) => {
  const { id, status } = req.body;

  const order = orders.find(order => order.id === id);
  if (order) {
    order.status = status;
    res.send(`Commande ${id} mise à jour avec succès.`);
  } else {
    res.status(404).send('Commande introuvable.');
  }
});

// Lancer le serveur
const PORT = process.env.PORT || const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Simuler une base de données en mémoire
let orders = [
  {
    id: "001",
    status: "En Attente",
    impression: "Dario",
    distribution: "Oscar",
    destinataire: "Jean Dupont",
    lienObjet: "https://example.com/objet-imprimer"
  }
];

// Endpoint pour récupérer toutes les commandes
app.get('/orders', (req, res) => {
  res.json({ orders });
});

// Endpoint pour mettre à jour une commande
app.post('/update-order', (req, res) => {
  const { id, status } = req.body;

  const order = orders.find(order => order.id === id);
  if (order) {
    order.status = status;
    res.send(`Commande ${id} mise à jour avec succès.`);
  } else {
    res.status(404).send('Commande introuvable.');
  }
});

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Simuler une base de données en mémoire
let orders = [
  {
    id: "001",
    status: "En Attente",
    impression: "Dario",
    distribution: "Oscar",
    destinataire: "Jean Dupont",
    lienObjet: "https://example.com/objet-imprimer"
  }
];

// Endpoint pour récupérer toutes les commandes
app.get('/orders', (req, res) => {
  res.json({ orders });
});

// Endpoint pour mettre à jour une commande
app.post('/update-order', (req, res) => {
  const { id, status } = req.body;

  const order = orders.find(order => order.id === id);
  if (order) {
    order.status = status;
    res.send(`Commande ${id} mise à jour avec succès.`);
  } else {
    res.status(404).send('Commande introuvable.');
  }
});

// Lancer le serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Serveur démarré sur le port ${PORT}`));

//end
