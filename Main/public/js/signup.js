document.addEventListener('DOMContentLoaded', (event) => {
    const signupForm = document.getElementById('signup-form');
  
    const signupFormHandler = async (event) => {
      event.preventDefault();
  
      const username = document.getElementById('username').value.trim();
      const firstName = document.getElementById('first-name').value.trim();
      const lastName = document.getElementById('last-name').value.trim();
      const income = document.getElementById('income').value.trim();
      const email = document.getElementById('email').value.trim();
      const password = document.getElementById('password').value.trim();
  
      if (username && email && password && income && lastName && firstName) {
        try {
          const response = await fetch('/users/signup', {
            method: 'POST',
            body: JSON.stringify({ username, firstName, lastName, email, password, income }),
            headers: { 'Content-Type': 'application/json' },
          });
  
          if (response.ok) {
            document.location.replace('/dashboard');
          } else {
            const errorMessage = await response.json();
            console.error('Failed to sign up:', errorMessage);
            alert('Failed to sign up.');
          }
        } catch (err) {
          console.error('Error:', err);
          alert('Failed to sign up.');
        }
      } else {
        alert('Please fill out all fields.');
      }
    };
  
    if (signupForm) {
      signupForm.addEventListener('submit', signupFormHandler);
    }
  });
  