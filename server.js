const express = require('express'); // Import express
const bodyParser = require('body-parser'); // Import body-parser
const cors = require('cors'); // Import cors

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

// Endpoint pour ajouter une commande
app.post('/orders', (req, res) => {
  const { status, impression, distribution, destinataire, lienObjet } = req.body;
  let maxId = orders.reduce((max, order) => Math.max(max, parseInt(order.id)), 0);
  let newId = String(maxId + 1).padStart(3, '0');

  const newOrder = {
    id: newId,
    status,
    impression,
    distribution,
    destinataire,
    lienObjet
  };

  orders.push(newOrder);
  res.status(201).json({ message: "Commande ajoutée avec succès", order: newOrder });
});

// Lancer le serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Serveur démarré sur le port ${PORT}`));
