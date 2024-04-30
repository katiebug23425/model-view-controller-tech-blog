// Import the necessary models
const User = require("./user");
const Post = require("./post");
const Comment = require("./comment");

// define model relationships
User.hasMany(Post, {
    foreignKey: "user_id",
});

Post.belongsTo(User, {
    foreignKey: "user_id",
});

User.hasMany(Comment, { 
    foreignKey: "user_id",
});

Comment.belongsTo(User, {
    foreignKey: "user_id",
});

Post.hasMany(Comment, {
    foreignKey: "post_id",
});

Comment.belongsTo(Post, {
    foreignKey: "post_id",
});

// Export the models
module.exports = { User, Post, Comment };