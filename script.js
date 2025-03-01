 const serverUrl = 'https://master3d.onrender.com'; // URL Render

// Function to update order status
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

// Admin Space
document.getElementById('adminSpace').addEventListener('click', function () {
  document.getElementById('loginSection').classList.remove('hidden');
  document.getElementById('orderDetails').classList.add('hidden');
});

// Admin Login
document.getElementById('adminLoginForm').addEventListener('submit', function (event) {
  event.preventDefault();
  const adminPasswordInput = document.getElementById('adminPassword').value.trim();

  if (adminPasswordInput === 'master3DAdmin') {
    alert('Connexion réussie !');
    document.getElementById('loginSection').classList.add('hidden');
    document.getElementById('adminPanel').classList.remove('hidden');
    loadAdminOrders();
  } else {
    alert('Mot de passe incorrect.');
  }
});

// Fetch Order Details
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
        alert('Commande non trouvée.');
      }
    })
    .catch(error => {
      console.error('Erreur lors du chargement des commandes :', error);
      alert('Une erreur est survenue.');
    });
}

// Search Order
document.getElementById('orderForm').addEventListener('submit', function (event) {
  event.preventDefault();
  const orderNumber = document.getElementById('orderNumber').value.trim();

  if (orderNumber === '') {
    alert('Veuillez entrer un numéro de commande.');
    return;
  }

  fetchOrderDetails(orderNumber);
});

// Load Admin Orders
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
      tableBody.innerHTML = ''; // Clear existing data

      data.orders.forEach(order => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${order.id}</td>
          <td contenteditable="true" class="editable">${order.status}</td>
          <td>${order.impression}</td>
          <td>${order.distribution}</td>
          <td>${order.destinataire}</td>
          <td><a href="${order.lienObjet}" target="_blank">Voir l'objet</a></td>
          <td><button class="deleteOrder" data-id="${order.id}">Supprimer</button></td>
        `;
        tableBody.appendChild(row);
      });

      // Add listener for inline editing
      tableBody.addEventListener('input', event => {
        if (event.target.classList.contains('editable')) {
          const row = event.target.closest('tr');
          const orderId = row.children[0].textContent.trim();
          const newStatus = event.target.textContent.trim();
          updateOrderStatus(orderId, newStatus);
        }
      });

      // Add listener for delete buttons
      tableBody.addEventListener('click', event => {
        if (event.target.classList.contains('deleteOrder')) {
          const orderId = event.target.getAttribute('data-id');
          if (confirm(`Êtes-vous sûr de vouloir supprimer la commande ${orderId} ?`)) {
            deleteOrder(orderId);
          }
        }
      });
    })
    .catch(error => {
      console.error('Erreur lors du chargement des commandes :', error);
      alert('Impossible de charger les commandes.');
    });
}

// Create Order
document.getElementById('createOrderForm').addEventListener('submit', function (event) {
  event.preventDefault();
  const status = document.getElementById('statusInput').value.trim();
  const impression = document.getElementById('impressionInput').value.trim();
  const distribution = document.getElementById('distributionInput').value.trim();
  const destinataire = document.getElementById('destinataireInput').value.trim();
  const lienObjet = document.getElementById('lienObjetInput').value.trim();

  fetch(`${serverUrl}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ status, impression, distribution, destinataire, lienObjet }),
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to create order.');
      }
      return response.json();
    })
    .then(data => {
      alert('Commande créée avec succès.');
      loadAdminOrders(); // Reload orders
    })
    .catch(error => {
      console.error('Erreur lors de la création de la commande :', error);
      alert('Échec de la création de la commande.');
    });
});

// Delete Order
function deleteOrder(orderId) {
  fetch(`${serverUrl}/orders/${orderId}`, {
    method: 'DELETE',
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to delete order.');
      }
      return response.text();
    })
    .then(message => {
      alert(`Commande ${orderId} supprimée avec succès.`);
      loadAdminOrders(); // Reload orders
    })
    .catch(error => {
      console.error('Erreur lors de la suppression de la commande :', error);
      alert('Échec de la suppression de la commande.');
    });
}

// Filter and Sort Orders
document.getElementById('filterStatus').addEventListener('change', function () {
  loadAdminOrders(); // Reload orders with filter
});

document.getElementById('sortById').addEventListener('click', function () {
  sortOrders('id');
});

document.getElementById('sortByDate').addEventListener('click', function () {
  sortOrders('date');
});

function sortOrders(criteria) {
  fetch(`${serverUrl}/orders`)
    .then(response => response.json())
    .then(data => {
      let sortedOrders = data.orders;
      if (criteria === 'id') {
        sortedOrders.sort((a, b) => a.id.localeCompare(b.id));
      } else if (criteria === 'date') {
        sortedOrders.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      }
      renderOrders(sortedOrders);
    })
    .catch(error => {
      console.error('Erreur lors du tri des commandes :', error);
    });
}

function renderOrders(orders) {
  const tableBody = document.querySelector('#ordersTable tbody');
  tableBody.innerHTML = ''; // Clear existing data

  orders.forEach(order => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${order.id}</td>
      <td contenteditable="true" class="editable">${order.status}</td>
      <td>${order.impression}</td>
      <td>${order.distribution}</td>
      <td>${order.destinataire}</td>
      <td><a href="${order.lienObjet}" target="_blank">Voir l'objet</a></td>
      <td><button class="deleteOrder" data-id="${order.id}">Supprimer</button></td>
    `;
    tableBody.appendChild(row);
  });
}

// Show/hide loading animation
function showLoadingAnimation() {
  document.getElementById('loadingAnimation').classList.remove('hidden');
}

function hideLoadingAnimation() {
  document.getElementById('loadingAnimation').classList.add('hidden');
}

// Example fetch call
showLoadingAnimation();
fetch(`${serverUrl}/orders`)
  .then(response => response.json())
  .then(data => {
    renderOrders(data.orders);
  })
  .catch(error => {
    console.error('Error:', error);
  })
  .finally(() => {
    hideLoadingAnimation();
  });
