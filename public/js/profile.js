const newFormHandler = async event => {
  event.preventDefault();

  const name = document.querySelector('#project-name').value.trim();

  if (name) {
    const response = await fetch(`/api/products`, {
      method: 'POST',
      body: JSON.stringify({ name }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to add product');
    }
  }
};

const delButtonHandler = async event => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/products/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to delete product');
    }
  }
};

document.querySelector('.new-project-form').addEventListener('submit', newFormHandler);

document.querySelector('.project-list').addEventListener('click', delButtonHandler);
