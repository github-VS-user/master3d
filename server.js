const express = require('express');
const axios = require('axios'); // Install axios: npm install axios
const app = express();
const PORT = 3000;

// Middleware to parse JSON request bodies
app.use(express.json());

// GitHub Repository Details
const GITHUB_REPO = 'yourusername/master3d'; // Replace with your repo name
const GITHUB_FILE_PATH = 'commandes.json';  // Path to the JSON file in the repo
const GITHUB_TOKEN = 'your_personal_access_token'; // Replace with your token

// Update order status and push changes to GitHub
app.post('/update-order', async (req, res) => {
  const { id, status } = req.body;

  try {
    // Step 1: Get the current file from GitHub
    const { data: fileData } = await axios.get(
      `https://api.github.com/repos/${GITHUB_REPO}/contents/${GITHUB_FILE_PATH}`,
      {
        headers: { Authorization: `token ${GITHUB_TOKEN}` },
      }
    );

    // Decode the file content (base64)
    const orders = JSON.parse(Buffer.from(fileData.content, 'base64').toString('utf8'));

    // Step 2: Update the specific order
    const order = orders.orders.find(order => order.id === id);
    if (!order) {
      return res.status(404).send('Order not found.');
    }
    order.status = status;

    // Step 3: Update the file content (encode to base64)
    const updatedContent = Buffer.from(JSON.stringify(orders, null, 2)).toString('base64');

    // Step 4: Commit the updated file back to GitHub
    await axios.put(
      `https://api.github.com/repos/${GITHUB_REPO}/contents/${GITHUB_FILE_PATH}`,
      {
        message: `Update order ${id} status to ${status}`,
        content: updatedContent,
        sha: fileData.sha, // Required to overwrite the file
      },
      {
        headers: { Authorization: `token ${GITHUB_TOKEN}` },
      }
    );

    res.send(`Order ${id} updated successfully.`);
  } catch (error) {
    console.error('Error updating order:', error.response?.data || error.message);
    res.status(500).send('Failed to update order.');
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
