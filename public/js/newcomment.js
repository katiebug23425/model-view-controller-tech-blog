const newTechBlogCommentFormHandler = async (event) => {
  event.preventDefault();

  const post_id = parseInt(window.location.pathname.split("/").pop());

  const comment_text = document
    .querySelector("#content-new-tech-blog-comment")
    .value.trim();
  if (comment_text) {
    const response = await fetch(`/api/comments`, {
      method: "POST",
      body: JSON.stringify({ post_id, comment_text }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      
      document.location.reload();
    } else {
      alert("Failed to create comment");
    }
  }
};
const newTechBlogCommentForm = document.querySelector(
  ".new-tech-blog-comment-form"
);
if (newTechBlogCommentForm) {
  newTechBlogCommentForm.addEventListener(
    "submit",
    newTechBlogCommentFormHandler
  );
}
