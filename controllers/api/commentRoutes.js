// Import the required modules
const router = require("express").Router();
const { Comment } = require("../../models");
const withAuth = require("../../utils/auth");


// Create a new comment
router.post("/", withAuth, async (req, res) => {
    try {
        const dbCommentData = await Comment.create({
            comment_text: req.body.comment_text,
            post_id: req.body.post_id,
            user_id: req.session.user_id,
        });
        res.status(200).json(dbCommentData);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Request to create a new comment failed!" });
    }
});

// Export the router
module.exports = router;