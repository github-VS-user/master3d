// URL du backend
const serverUrl = 'https://master3d.onrender.com'; // URL Render

// Fonction pour mettre à jour le statut de commande sur le serveur
function updateOrderStatus(orderId, newStatus) {
  fetch(`${serverUrl}/update-order`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id: orderId, status: newStatus }),
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to update order.');
      }
      return response.text();
    })
    .then(message => {
      console.log(message);
      alert(`Commande ${orderId} mise à jour avec succès.`);
    })
    .catch(error => {
      console.error('Erreur lors de la mise à jour de la commande :', error);
      alert('Échec de la mise à jour de la commande.');
    });
}

// Gestion de l'affichage de l'espace Admin
document.getElementById('adminSpace').addEventListener('click', function () {
  document.getElementById('loginSection').classList.remove('hidden');
  document.getElementById('orderDetails').classList.add('hidden');
});

// Connexion Admin
document.getElementById('adminLoginForm').addEventListener('submit', function (event) {
  event.preventDefault();
  const adminPasswordInput = document.getElementById('adminPassword').value.trim();

  if (adminPasswordInput === 'master3DAdmin') {
    alert('Connexion réussie !');
    document.getElementById('loginSection').classList.add('hidden');
    document.getElementById('adminPanel').classList.remove('hidden');
  } else {
    alert('Mot de passe incorrect.');
  }
});

// Fonction pour récupérer les détails d'une commande
function fetchOrderDetails(orderNumber) {
  fetch(`${serverUrl}/orders`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      const order = data.orders.find(order => order.id === orderNumber);

      if (order) {
        document.getElementById('status').textContent = order.status;
        document.getElementById('printer').textContent = order.impression;
        document.getElementById('distributor').textContent = order.distribution;
        document.getElementById('recipient').textContent = order.destinataire;
        document.getElementById('objectLink').href = order.lienObjet;
        document.getElementById('objectLink').textContent = "Voir l'objet";

        document.getElementById('orderDetails').classList.remove('hidden');
      } else {
        alert('Commande non trouvé.');
      }
    })
    .catch(error => {
      console.error('Erreur lors du chargement des commandes :', error);
      alert('Une erreur est survenue.');
    });
}

// Recherche d'une commande
document.getElementById('orderForm').addEventListener('submit', function (event) {
  event.preventDefault();
  const orderNumber = document.getElementById('orderNumber').value.trim();

  if (orderNumber === '') {
    alert('Veuillez entrer un numéro de commande.');
    return;
  }

  fetchOrderDetails(orderNumber);
});

// Charger les commandes dans le tableau Admin
function loadAdminOrders() {
  fetch(`${serverUrl}/orders`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      const tableBody = document.querySelector('#ordersTable tbody');
      tableBody.innerHTML = ''; // Vider les données existantes

      data.orders.forEach(order => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${order.id}</td>
          <td contenteditable="true" class="editable">${order.status}</td>
          <td>${order.impression}</td>
          <td>${order.distribution}</td>
          <td>${order.destinataire}</td>
          <td><a href="${order.lienObjet}" target="_blank">Voir l'objet</a></td>
        `;
        tableBody.appendChild(row);
      });

      // Ajouter un écouteur pour la modification en ligne
      tableBody.addEventListener('input', event => {
        if (event.target.classList.contains('editable')) {
          const row = event.target.closest('tr');
          const orderId = row.children[0].textContent.trim();
          const newStatus = event.target.textContent.trim();
          updateOrderStatus(orderId, newStatus); // Mettre à jour sur le serveur
        }
      });
    })
    .catch(error => {
      console.error('Erreur lors du chargement des commandes :', error);
      alert('Impossible de charger les commandes.');
    });
}

// Charger les commandes quand le panneau admin est affiché
document.getElementById('adminSpace').addEventListener('click', () => {
  loadAdminOrders();
});
