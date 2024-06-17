document.getElementById('transaction-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const id = window.location.pathname.split('/').pop(); // Extract transaction ID from URL
    const date = document.getElementById('date').value;
    const cost = document.getElementById('cost').value;
    const description = document.getElementById('description').value;
    const categoryId = parseInt(document.getElementById('category').value); // Parse categoryId as an integer
    const vendor = document.getElementById('vendor').value;

    const response = await fetch(`/transactions/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ date, cost, description, categoryId, vendor }),
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        alert('Transaction updated successfully!');
        window.location.href = '/transactions'; // Redirect to transactions page
    } else {
        alert('Failed to update transaction.');
    }
});
