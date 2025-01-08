const serverUrl = 'https://master3d.onrender.com'; // Render backend URL

// Function to update order details on the server
function updateOrderDetails(orderId, field, newValue) {
  fetch(`${serverUrl}/update-order`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id: orderId, field, value: newValue }),
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

// Load orders into the admin panel table
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
      tableBody.innerHTML = ''; // Clear previous data

      data.orders.forEach(order => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${order.id}</td>
          <td contenteditable="true" class="editable" data-field="status">${order.status}</td>
          <td contenteditable="true" class="editable" data-field="impression">${order.impression}</td>
          <td contenteditable="true" class="editable" data-field="distribution">${order.distribution}</td>
          <td contenteditable="true" class="editable" data-field="destinataire">${order.destinataire}</td>
          <td><a href="${order.lienObjet}" target="_blank">Voir l'objet</a></td>
        `;
        tableBody.appendChild(row);
      });

      // Add event listener for inline editing
      tableBody.addEventListener('input', event => {
        if (event.target.classList.contains('editable')) {
          const row = event.target.closest('tr');
          const orderId = row.children[0].textContent.trim();
          const field = event.target.dataset.field;
          const newValue = event.target.textContent.trim();
          updateOrderDetails(orderId, field, newValue); // Update on the server
        }
      });
    })
    .catch(error => {
      console.error('Erreur lors du chargement des commandes :', error);
      alert('Impossible de charger les commandes.');
    });
}

// Load orders when admin panel is displayed
document.getElementById('adminSpace').addEventListener('click', () => {
  loadAdminOrders();
});
