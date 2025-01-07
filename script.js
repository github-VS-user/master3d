// Fonction pour récupérer les détails d'une commande
function fetchOrderDetails(orderNumber) {
  const jsonUrl = 'https://github-vs-user.github.io/master3d/commandes.json';

  fetch(jsonUrl)
    .then(response => response.json())
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
        document.getElementById('modifyStatus').classList.remove('hidden');
      } else {
        alert('Commande non trouvée.');
      }
    })
    .catch(error => {
      console.error('Erreur:', error);
      alert('Une erreur est survenue.');
    });
}

// Écouter le formulaire pour consulter une commande
document.getElementById('orderForm').addEventListener('submit', function (event) {
  event.preventDefault();
  const orderNumber = document.getElementById('orderNumber').value.trim();
  fetchOrderDetails(orderNumber);
});

// Modifier le statut d'une commande
document.getElementById('saveStatus').addEventListener('click', function () {
  const newStatus = document.getElementById('newStatus').value;
  alert(`Le statut a été modifié à : ${newStatus}`);
});

// Gérer l'accès à l'Admin Space
document.getElementById('adminSpace').addEventListener('click', function () {
  document.getElementById('adminLoginForm').classList.remove('hidden');
});

// Vérifier le mot de passe Admin
document.getElementById('loginButton').addEventListener('click', function () {
  const adminPassword = 'adminadmin';
  const enteredPassword = document.getElementById('adminPassword').value.trim();

  if (enteredPassword === adminPassword) {
    document.getElementById('adminLoginForm').classList.add('hidden');
    document.getElementById('adminPanel').classList.remove('hidden');
  } else {
    alert('Mot de passe incorrect.');
  }
});
