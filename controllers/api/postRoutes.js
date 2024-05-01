const router = require("express").Router();
const { Post, User, Comment } = require("../../models");
const withAuth = require("../../utils/auth");

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

  // Create a new post with authenticated user
router.post("/", withAuth, async (req, res) => {
    try {
      const dbPostData = await Post.create({
        title: req.body.title,
        content: req.body.content,
        user_id: req.session.user_id,
      });
  
      res.status(200).json(dbPostData);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Request to create a new post failed!" });
    }
  });

  // Update a post by ID with authenticated user
router.put("/:id", withAuth, async (req, res) => {
    try {
      const dbPostData = await Post.update(req.body, {
        where: { id: req.params.id },
      });
  
      if (!dbPostData[0]) {
        res.status(404).json({ message: "Request to update post failed, post not found!" });
        return;
      }
  
      res.status(200).json(dbPostData);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Request to update post failed!" });
    }
  });

  // Delete a post by ID with authenticated user
router.delete("/:id", withAuth, async (req, res) => {
    try {
      const dbPostData = await Post.destroy({
        where: { id: req.params.id },
      });
  
      if (!dbPostData) {
        res.status(404).json({ message: "Request to delete post failed, post not found!" });
        return;
      }
  
      res.status(200).json(dbPostData);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Request to delete post failed!" });
    }
  });

// Export the router
module.exports = router;