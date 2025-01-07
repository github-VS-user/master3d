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
