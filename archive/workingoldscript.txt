 const serverUrl = 'https://master3d.onrender.com'; // Backend URL

// Function to show loading animation and overlay
function showLoadingAnimation() {
  document.getElementById('overlay').classList.remove('hidden');
  document.getElementById('loadingAnimation').classList.remove('hidden');
}

// Function to hide loading animation and overlay
function hideLoadingAnimation() {
  document.getElementById('overlay').classList.add('hidden');
  document.getElementById('loadingAnimation').classList.add('hidden');
}

// Function to handle errors and display alerts
function handleError(error, message) {
  console.error(message, error);
  alert(message);
}

// Function to update order status
function updateOrderStatus(orderId, newStatus) {
  showLoadingAnimation(); // Show loading animation
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
      handleError(error, 'Échec de la mise à jour de la commande.');
    })
    .finally(() => {
      hideLoadingAnimation(); // Hide loading animation
    });
}

// Admin Space: Show login section
document.getElementById('adminSpace').addEventListener('click', function () {
  document.getElementById('loginSection').classList.remove('hidden');
  document.getElementById('orderDetails').classList.add('hidden');
});

// Admin Login: Handle form submission
document.getElementById('adminLoginForm').addEventListener('submit', function (event) {
  event.preventDefault();
  const adminPasswordInput = document.getElementById('adminPassword').value.trim();

  if (adminPasswordInput === 'master3DAdmin') {
    alert('Connexion réussie !');
    document.getElementById('loginSection').classList.add('hidden');
    document.getElementById('adminPanel').classList.remove('hidden');
    loadAdminOrders(); // Load orders after successful login
  } else {
    alert('Mot de passe incorrect.');
  }
});

// Fetch order details by order number
function fetchOrderDetails(orderNumber) {
  showLoadingAnimation(); // Show loading animation
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
        // Display order details
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
      handleError(error, 'Une erreur est survenue lors du chargement des commandes.');
    })
    .finally(() => {
      hideLoadingAnimation(); // Hide loading animation
    });
}

// Search order: Handle form submission
document.getElementById('orderForm').addEventListener('submit', function (event) {
  event.preventDefault();
  const orderNumber = document.getElementById('orderNumber').value.trim();

  if (orderNumber === '') {
    alert('Veuillez entrer un numéro de commande.');
    return;
  }

  fetchOrderDetails(orderNumber); // Fetch order details
});

// Load all orders for the admin panel
function loadAdminOrders() {
  showLoadingAnimation(); // Show loading animation
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

      // Populate the table with orders
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
          updateOrderStatus(orderId, newStatus); // Update order status
        }
      });

      // Add listener for delete buttons
      tableBody.addEventListener('click', event => {
        if (event.target.classList.contains('deleteOrder')) {
          const orderId = event.target.getAttribute('data-id');
          if (confirm(`Êtes-vous sûr de vouloir supprimer la commande ${orderId} ?`)) {
            deleteOrder(orderId); // Delete order
          }
        }
      });
    })
    .catch(error => {
      handleError(error, 'Impossible de charger les commandes.');
    })
    .finally(() => {
      hideLoadingAnimation(); // Hide loading animation
    });
}

// Create a new order: Handle form submission
document.getElementById('createOrderForm').addEventListener('submit', function (event) {
  event.preventDefault();
  const status = document.getElementById('statusInput').value.trim();
  const impression = document.getElementById('impressionInput').value.trim();
  const distribution = document.getElementById('distributionInput').value.trim();
  const destinataire = document.getElementById('destinataireInput').value.trim();
  const lienObjet = document.getElementById('lienObjetInput').value.trim();

  showLoadingAnimation(); // Show loading animation
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
      handleError(error, 'Échec de la création de la commande.');
    })
    .finally(() => {
      hideLoadingAnimation(); // Hide loading animation
    });
});

// Delete an order
function deleteOrder(orderId) {
  showLoadingAnimation(); // Show loading animation
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
      handleError(error, 'Échec de la suppression de la commande.');
    })
    .finally(() => {
      hideLoadingAnimation(); // Hide loading animation
    });
}
