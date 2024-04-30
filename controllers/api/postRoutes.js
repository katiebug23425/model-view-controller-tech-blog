const router = require("express").Router();
const { Post, User, Comment } = require("../../models");

// Get all posts with associated username
router.get("/", async (req, res) => {
    try {
      const dbPostData = await Post.findAll({
        attributes: ["id", "title", "content", "created_at"],
        include: [
          {
            model: User,
            attributes: ["username"],
          },
          {
            model: Comment,
            attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
            include: {
              model: User,
              attributes: ["username"],
            },
          },
        ],
      });
  
      res.json(dbPostData);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Request for all posts from user unable to be fulfilled, posts not found!" });
    }
  });

  // Get single post by ID with associated username and comments
router.get("/:id", async (req, res) => {
    try {
      const dbPostData = await Post.findOne({
        where: { id: req.params.id },
        attributes: ["id", "title", "content", "created_at"],
        include: [
          {
            model: User,
            attributes: ["username"],
          },
          {
            model: Comment,
            attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
            include: {
              model: User,
              attributes: ["username"],
            },
          },
        ],
      });
  
      if (!dbPostData) {
        res.status(404).json({ message: "Request for post unable to be fulfilled, post not found!" });
        return;
      }
  
      res.json(dbPostData);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Request for post unable to be fulfilled, post not found!" });
    }
  });

  



// Export the router
module.exports = router;