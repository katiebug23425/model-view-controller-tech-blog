// Get the post ID from the endpoint
const post_id = window.location.toString().split("/")[
  window.location.toString().split("/").length - 1
];

const updateTechBlogPostFormHandler = async (event) => {
  event.preventDefault();

  const title = document
    .querySelector("#title-update-tech-blog-post")
    .value.trim();
  const content = document
    .querySelector("#content-update-tech-blog-post")
    .value.trim();

  if (title && content) {
    const response = await fetch(`/api/posts/${post_id}`, {
      method: "PUT",
      body: JSON.stringify({ title, content }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert("Failed to update post");
    }
  }
};

// Delete the post
const deleteTechBlogPostFormHandler = async (event) => {
  event.preventDefault();

  const response = await fetch(`/api/posts/${post_id}`, {
    method: "DELETE",
  });

  if (response.ok) {
    document.location.replace("/dashboard");
  } else {
    alert("Failed to delete post");
  }
};

const updateTechBlogPostButton = document.querySelector(
  "#update-tech-blog-post"
);

if (updateTechBlogPostButton) {
  updateTechBlogPostButton.addEventListener(
    "click",
    updateTechBlogPostFormHandler
  );
}

const deleteTechBlogPostButton = document.querySelector(
  "#delete-tech-blog-post"
);

if (deleteTechBlogPostButton) {
  deleteTechBlogPostButton.addEventListener(
    "click",
    deleteTechBlogPostFormHandler
  );
}
