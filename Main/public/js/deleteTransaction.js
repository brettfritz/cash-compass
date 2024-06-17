document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.delete-transaction').forEach(button => {
      button.addEventListener('click', async (event) => {
        const id = event.target.getAttribute('data-id');
        
        const response = await fetch(`/transactions/${id}`, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
        });
  
        if (response.ok) {
          alert('Transaction deleted successfully!');
          location.reload(); // Reload the page to update the list of transactions
        } else {
          alert('Failed to delete transaction.');
        }
      });
    });
  });
  