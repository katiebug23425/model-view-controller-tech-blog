// Import necessary packages and models
const router = require("express").Router();
const { Post, User, Comment } = require("../models");

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

        res.render("homepage", { posts });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Request for all posts from user unable to be fulfilled, posts not found!" });
    }
});

// Route to render individual post page
router.get("/post/:id", async (req, res) => {
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

        const post = dbPostData.get({ plain: true });

        res.render("single-post", { post });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Request for post unable to be fulfilled, post not found!" });
    }
});

// Route to render dashboard page with all posts by current user
router.get("/dashboard", async (req, res) => {
    try {
        const dbPostData = await Post.findAll({
            where: { user_id: req.session.user_id },
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

        res.render("dashboard", { posts });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Request for all posts from user unable to be fulfilled, posts not found!" });
    }
});

// module exports router
module.exports = router;