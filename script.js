// URL du fichier JSON
const jsonUrl = 'https://github-vs-user.github.io/master3d/commandes.json';

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
  fetch(jsonUrl)
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
      console.error('Erreur lors du chargement des commandes:', error);
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

// Modifier le statut sans Admin
document.getElementById('orderDetails').addEventListener('click', function (event) {
  if (event.target.id === 'status') {
    const newStatus = prompt('Entrez le nouveau statut :');
    if (newStatus) {
      document.getElementById('status').textContent = newStatus;
      alert('Statut mis à jour localement.');
    }
  }
});

// Load orders into the admin panel table
function loadAdminOrders() {
  fetch(jsonUrl)
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
          <td contenteditable="true" class="editable">${order.status}</td>
          <td>${order.impression}</td>
          <td>${order.distribution}</td>
          <td>${order.destinataire}</td>
          <td><a href="${order.lienObjet}" target="_blank">Voir l'objet</a></td>
        `;
        tableBody.appendChild(row);
      });

      // Add event listener for inline editing
      tableBody.addEventListener('input', event => {
        if (event.target.classList.contains('editable')) {
          const row = event.target.closest('tr');
          const orderId = row.children[0].textContent.trim();
          const newStatus = event.target.textContent.trim();
          console.log(`Order ID ${orderId} status updated to: ${newStatus}`);
          alert(`Statut de la commande ${orderId} mis à jour localement.`);
        }
      });
    })
    .catch(error => {
      console.error('Erreur lors du chargement des commandes:', error);
      alert('Impossible de charger les commandes.');
    });
}

// Load orders when admin panel is displayed
document.getElementById('adminSpace').addEventListener('click', () => {
  loadAdminOrders();
});

