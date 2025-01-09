// Fonction pour récupérer toutes les commandes depuis le serveur
async function fetchOrders() {
  try {
    const response = await fetch('/orders');
    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des commandes.');
    }
    const data = await response.json();
    afficherCommandes(data.orders); // Appel à une fonction qui affiche les commandes
  } catch (error) {
    console.error(error);
    alert('Impossible de charger les commandes.');
  }
}

// Fonction pour mettre à jour une commande
async function updateOrder(id, status) {
  try {
    const response = await fetch('/update-order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, status }),
    });

    if (response.ok) {
      alert(`Commande ${id} mise à jour avec succès.`);
      fetchOrders(); // Recharge les commandes après la mise à jour
    } else {
      throw new Error('Erreur lors de la mise à jour de la commande.');
    }
  } catch (error) {
    console.error(error);
    alert('Impossible de mettre à jour la commande.');
  }
}

// Fonction pour créer une nouvelle commande
async function createOrder(order) {
  try {
    const response = await fetch('/create-order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(order),
    });

    if (response.ok) {
      alert(`Commande ${order.id} créée avec succès.`);
      fetchOrders(); // Recharge les commandes après la création
    } else {
      throw new Error('Erreur lors de la création de la commande.');
    }
  } catch (error) {
    console.error(error);
    alert('Impossible de créer la commande.');
  }
}

// Fonction pour afficher les commandes dans l'interface utilisateur
function afficherCommandes(orders) {
  const ordersTable = document.getElementById('orders-table');
  ordersTable.innerHTML = ''; // Nettoie le tableau avant d'afficher les commandes

  orders.forEach(order => {
    const row = document.createElement('tr');

    row.innerHTML = `
      <td>${order.id}</td>
      <td>${order.status}</td>
      <td>${order.impression}</td>
      <td>${order.distribution}</td>
      <td>${order.destinataire}</td>
      <td><a href="${order.lienObjet}" target="_blank">Voir l'objet</a></td>
      <td>
        <select onchange="updateOrder('${order.id}', this.value)">
          <option value="En Attente" ${order.status === 'En Attente' ? 'selected' : ''}>En Attente</option>
          <option value="En Cours" ${order.status === 'En Cours' ? 'selected' : ''}>En Cours</option>
          <option value="Terminé" ${order.status === 'Terminé' ? 'selected' : ''}>Terminé</option>
        </select>
      </td>
    `;

    ordersTable.appendChild(row);
  });
}

// Événement DOM chargé
document.addEventListener('DOMContentLoaded', () => {
  fetchOrders(); // Charge les commandes au démarrage
});
