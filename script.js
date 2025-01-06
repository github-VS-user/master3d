// Fonction pour récupérer les détails d'une commande
function fetchOrderDetails(orderNumber) {
  // URL du fichier JSON
  const jsonUrl = 'https://github-vs-user.github.io/master3d/commandes.json';

  fetch(jsonUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log('Données chargées :', data.orders); // Debug pour afficher le contenu du JSON
      console.log('Numéro de commande recherché :', orderNumber); // Debug pour vérifier l'entrée utilisateur

      // Chercher la commande correspondant au numéro donné
      const order = data.orders.find(order => order.id === orderNumber);

      if (order) {
        // Mise à jour des éléments HTML avec les détails de la commande
        document.getElementById('status').textContent = order.status;
        document.getElementById('printer').textContent = order.impression;
        document.getElementById('distributor').textContent = order.distribution;
        document.getElementById('recipient').textContent = order.destinataire;
        document.getElementById('objectLink').href = order.lienObjet;
        document.getElementById('objectLink').textContent = "Voir l'objet";

        // Afficher la section des détails
        document.getElementById('orderDetails').classList.remove('hidden');
      } else {
        // Alerte si la commande n'est pas trouvée
        alert('Commande non trouvée. Vérifiez le numéro de commande.');
      }
    })
    .catch(error => {
      console.error('Erreur lors du chargement des commandes:', error);
      alert('Une erreur est survenue lors de la récupération des commandes.');
    });
}

// Écouter l'événement de soumission du formulaire
document.getElementById('orderForm').addEventListener('submit', function (event) {
  event.preventDefault(); // Empêcher le rechargement de la page

  // Récupérer le numéro de commande saisi par l'utilisateur
  const orderNumber = document.getElementById('orderNumber').value.trim();

  // Vérifier que le champ n'est pas vide
  if (orderNumber === '') {
    alert('Veuillez entrer un numéro de commande.');
    return;
  }

  // Appeler la fonction pour chercher les détails de la commande
  fetchOrderDetails(orderNumber);
});
