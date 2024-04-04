const signupFormHandler = async event => {
  event.preventDefault();

  const name = document.querySelector('#name-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();
  const role = document.querySelector('#role-signup').value.trim();

  if (name && email && password && role) {
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ name, email, password, role }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      alert('Successful');
    } else {
      alert('Failed to sign up.');
    }
  }
};

document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);
