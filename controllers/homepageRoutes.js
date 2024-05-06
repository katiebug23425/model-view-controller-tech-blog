// Import necessary packages and models
const router = require("express").Router();
const { Post, User, Comment } = require("../models");
const withAuth = require("../utils/auth");

// Route to render homepage
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

        const posts = dbPostData.map((post) => post.get({ plain: true }));

        res.render("homepage", { posts,  logged_in: req.session.logged_in, });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Request for all posts from user unable to be fulfilled, posts not found!" });
    }
});

// Route to render individual post page
router.get("/post/:id", withAuth, async (req, res) => {
    try {
        const dbPostData = await Post.findByPk({
            where: { id: req.params.id },
            attributes: ["id", "title", "post_text", "created_at"],
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

        const post = dbPostData.get({ plain: true });

        res.render("single-post", { post,  logged_in: req.session.logged_in, });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Request for post unable to be fulfilled, post not found!" });
    }
});

// Route to render dashboard page with all posts by current user
router.get("/dashboard", withAuth, async (req, res) => {
    try {
        const dbPostData = await Post.findAll({
            where: { user_id: req.session.user_id },
            attributes: ["id", "title", "post_text", "created_at"],
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

        const posts = dbPostData.map((post) => post.get({ plain: true }));

        res.render("dashboard", { posts, logged_in: req.session.logged_in, });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Request for all posts from user unable to be fulfilled, posts not found!" });
    }
});

// Route to render login and signup pages

router.get("/login", (req, res) => {
    if (req.session.logged_in) {
      res.redirect("/dashboard");
      return;
    }
    res.render("login");
  });
  
  router.get("/signup", (req, res) => {
    if (req.session.logged_in) {
      res.redirect("/dashboard");
      return;
    }
    res.render("signup");
  });

  //render the new post page
  router.get("/newpost", (req, res) => {
    if (req.session.logged_in) {
      res.render("newpost");
      return;
    }
    res.redirect("/login");
  });

// Route to render the edit post page
router.get("/edit/:id", async (req, res) => {
    try {
        const dbPostData = await Post.findByPk(req.params.id, {
            attributes: ["id", "title", "post_text", "created_at"],
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
            res.status(404).json({ message: "Request to edit post unable to be fulfilled, post not found!" });
            return;
        }

        const post = dbPostData.get({ plain: true });
        res.render("edit-post", { post, logged_in: req.session.logged_in });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Request to edit post unable to be fulfilled, an error occurred!" });
    }
});

// module exports router
module.exports = router;