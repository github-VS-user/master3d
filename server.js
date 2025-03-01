const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

let orders = [
  {
    id: "001",
    status: "En Attente",
    impression: "Dario",
    distribution: "Oscar",
    destinataire: "Jean Dupont",
    lienObjet: "https://example.com/objet-imprimer",
    createdAt: new Date().toISOString(),
  },
];

// Get all orders
app.get('/orders', (req, res) => {
  res.json({ orders });
});

// Update order status
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

// Create a new order
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
    lienObjet,
    createdAt: new Date().toISOString(),
  };

  orders.push(newOrder);
  res.status(201).json({ message: "Commande ajoutée avec succès", order: newOrder });
});

// Delete an order
app.delete('/orders/:id', (req, res) => {
  const orderId = req.params.id;
  const orderIndex = orders.findIndex(order => order.id === orderId);

  if (orderIndex !== -1) {
    orders.splice(orderIndex, 1);
    res.send(`Commande ${orderId} supprimée avec succès.`);
  } else {
    res.status(404).send('Commande introuvable.');
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Serveur démarré sur le port ${PORT}`));
