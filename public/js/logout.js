// logout.js

document.addEventListener('DOMContentLoaded', () => {
  const logoutButton = document.getElementById('logout');
  if (logoutButton) {
    logoutButton.addEventListener('click', async () => {
      const response = await fetch('/users/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        document.location.replace('/login');
      } else {
        alert('Failed to log out.');
      }
    });
  }
});
