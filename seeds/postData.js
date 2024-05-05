const { Post } = require("../models");

const postData = [
  {
    title: "HTML Basics",
    post_text: "This is a blog about html basics, including tags, elements, and attributes.",
    user_id: 1,
  },
  {
    title: "CSS Basics",
    post_text: "This is a blog about css basics, including selectors, properties, and values",
    user_id: 2,
  },
  {
    title: "Javascript Basics",
    post_text: "This is a blog about javascript basics, including variables, data types, and functions.",
    user_id: 3,
  },
  {
    title: "Everything You Need to Know About Node.js",
    post_text: "This is a post about Node.js, including what it is, how it works, and how to use it.",
    user_id: 4,
  },
  {
    title: "All About Arrays in Javascript",
    post_text: "This is about arrays in javascript, including how to create them, access elements, and iterate through them.",
    user_id: 5,
  }
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;