document.getElementById('transaction-form').addEventListener('submit', async (event) => {
    event.preventDefault();
  
    // const userId = document.querySelector('input[name="userId"]').value;
    const date = document.getElementById('date').value;
    const cost = document.getElementById('cost').value;
    const categoryId = document.getElementById('category').value;
    const vendorId = document.getElementById('vendor').value;
  
    const response = await fetch('/transactions/add', {
      method: 'POST',
      body: JSON.stringify({
        date,
        cost,
        categoryId,
        vendorId,
      }),
      headers: { 'Content-Type': 'application/json' },
    });
  
    if (response.ok) {
      alert('Transaction added successfully');
    } else {
      alert('Failed to add transaction');
    }
  });
  