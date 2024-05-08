const newTechBlogPostFormHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#title-new-tech-blog-post').value.trim();
    const content = document.querySelector('#content-new-tech-blog-post').value.trim();
  
    if (title && content) {
      const response = await fetch('/api/posts', {
        method: 'POST',
        body: JSON.stringify({ title, content }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to create tech blog post');
      }
    }

};

const newTechBlogPostForm = document.querySelector('.new-tech-blog-post-form');
if (newTechBlogPostForm) {
newTechBlogPostForm.addEventListener('submit', newTechBlogPostFormHandler);
}