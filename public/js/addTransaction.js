document.getElementById('transaction-form').addEventListener('submit', async (event) => {
  event.preventDefault();

  const date = document.getElementById('date').value;
  const cost = document.getElementById('cost').value;
  const description = document.getElementById('description').value;
  const categoryId = document.getElementById('category').value;
  const vendor = document.getElementById('vendor').value;

  const response = await fetch('/transactions/add', {
    method: 'POST',
    body: JSON.stringify({ date, cost, description, categoryId, vendor }),
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    alert('Transaction added successfully!');
    window.location.href = '/transactions';
  } else {
    alert('Failed to add transaction.');
  }
});
  