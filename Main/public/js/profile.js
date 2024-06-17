
const updateProfileHandler = async (event) => {
  event.preventDefault();

  const firstName = document.querySelector('#first-name').value.trim();
  const lastName = document.querySelector('#last-name').value.trim();
  const email = document.querySelector('#email').value.trim();
  const income = document.querySelector('#income').value.trim();
  const password = document.querySelector('#password').value.trim();
  const username = document.querySelector('#username').value.trim();

  // Create the payload object
  const payload = { firstName, lastName, email, income, username };

  // Add password to the payload only if it's not empty
  if (password) {
    payload.password = password;
  }

  const response = await fetch('/users/profile', {
    method: 'PUT',
    body: JSON.stringify(payload),
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    alert('Profile updated successfully!');
    document.location.replace('/dashboard');
  } else {
    const errorData = await response.json();
    alert(`Failed to update profile: ${errorData.message || 'Unknown error'}`);
  }
};

document
  .querySelector('.profile-form')
  .addEventListener('submit', updateProfileHandler);
