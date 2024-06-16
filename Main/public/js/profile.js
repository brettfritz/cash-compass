const updateProfileHandler = async (event) => {
    event.preventDefault();
  
    const firstName = document.querySelector('#first-name').value.trim();
    const lastName = document.querySelector('#last-name').value.trim();
    const email = document.querySelector('#email').value.trim();
    const income = document.querySelector('#income').value.trim();
    const password = document.querySelector('#password').value.trim();
    const username = document.querySelector('#username').value.trim();
  
    const response = await fetch('/users/profile', {
      method: 'PUT',
      body: JSON.stringify({ firstName, lastName, email, income, password, username }),
      headers: { 'Content-Type': 'application/json' },
    });
  
    if (response.ok) {
      alert('Profile updated successfully!');
      document.location.replace('/dashboard');
    } else {
      alert('Failed to update profile.');
    }
  };
  
  document
    .querySelector('.profile-form')
    .addEventListener('submit', updateProfileHandler);
  