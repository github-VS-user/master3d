// Fonction pour vérifier le mot de passe Admin
document.getElementById('adminLoginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const password = document.getElementById('adminPassword').value;
    const correctPassword = 'adminadmin123'; // Mot de passe Admin

    if (password === correctPassword) {
        document.getElementById('adminPanel').classList.remove('hidden');
        document.getElementById('adminLoginForm').classList.add('hidden');
    } else {
        alert('Mot de passe incorrect');
    }
});

// Fonction pour afficher les détails de la commande publique
document.getElementById('orderForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const orderNumber = document.getElementById('orderNumber').value;
    fetchOrderDetails(orderNumber);
});

// Fonction simulée pour récupérer les détails d'une commande (ici, on utilise un fichier JSON)
function fetchOrderDetails(orderNumber) {
    fetch('https://github-vs-user.github.io/master3d/commandes.json')
        .then(response => response.json())
        .then(data => {
            const order = data.orders.find(order => order.orderNumber === orderNumber);

            if (order) {
                document.getElementById('status').textContent = order.status;
                document.getElementById('printer').textContent = order.printer;
                document.getElementById('distributor').textContent = order.distributor;
                document.getElementById('recipient').textContent = order.recipient;
                document.getElementById('objectLink').href = order.objectLink;
                document.getElementById('orderDetails').classList.remove('hidden');
            } else {
                alert('Commande non trouvée');
            }
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des données:', error);
            alert('Une erreur est survenue');
        });
}

// Fonction pour enregistrer une commande (Admin)
document.getElementById('orderFormAdmin').addEventListener('submit', function(event) {
    event.preventDefault();

    const orderNumber = document.getElementById('orderNumberAdmin').value;
    const status = document.getElementById('statusAdmin').value;
    const printer = document.getElementById('printerAdmin').value;
    const distributor = document.getElementById('distributorAdmin').value;
    const recipient = document.getElementById('recipientAdmin').value;
    const objectLink = document.getElementById('objectLinkAdmin').value;

    const newOrder = {
        orderNumber,
        status,
        printer,
        distributor,
        recipient,
        objectLink
    };

    saveOrder(newOrder);
});

// Fonction pour sauvegarder une commande (ajouter ou modifier dans le fichier JSON)
function saveOrder(order) {
    fetch('commandes.json')
        .then(response => response.json())
        .then(data => {
            const existingOrderIndex = data.orders.findIndex(o => o.orderNumber === order.orderNumber);

            if (existingOrderIndex > -1) {
                // Mise à jour de la commande existante
                data.orders[existingOrderIndex] = order;
            } else {
                // Ajout d'une nouvelle commande
                data.orders.push(order);
            }

            // Sauvegarde dans le fichier JSON (dans un environnement réel, on enverrait une requête POST à un serveur pour mettre à jour les données)
            alert('Commande enregistrée !');
        })
        .catch(error => {
            console.error('Erreur lors de la sauvegarde de la commande:', error);
            alert('Une erreur est survenue');
        });
}
