
const techBlogLogout = async () => {
    const response = await fetch('/api/users/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
      document.location.replace('/'); // Redirect to the homepage
    } else {
      alert('Failed to log out.'); 
    }
  };
  // Add an event listener to the logout button
  const techBlogLogoutButton = document.querySelector('#tech-blog-logout');
  if (techBlogLogoutButton) {
    techBlogLogoutButton.addEventListener('click', techBlogLogout);
  }