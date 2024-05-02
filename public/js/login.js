
const techBlogLoginFormHandler = async (event) => {
    event.preventDefault();
    const username = document.querySelector('#username-tech-blog-login').value.trim();
    const password = document.querySelector('#password-tech-blog-login').value.trim();
    if (username && password) {
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed to log in.');
    }
  }
};

const techBlogLoginForm = document.querySelector('.tech-blog-login-form');
if (techBlogLoginForm) {
  techBlogLoginForm.addEventListener('submit', techBlogLoginFormHandler);
}