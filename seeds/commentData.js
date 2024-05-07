const { Comment } = require("../models");

const commentData = [
  { id: 1,
    comment_text: "Great article!",
    user_id: 1,
    post_id: 1,
  },
  { id: 2,
    comment_text: "Super helpful!",
    user_id: 2,
    post_id: 1,
  },
  { id: 3,
    comment_text: "Way too basic!",
    user_id: 3,
    post_id: 1,
  },
  { id: 4,
    comment_text: "Follow up post please!",
    user_id: 4,
    post_id: 4,
  },
  { id: 5,
    comment_text: "I disagree with you!",
    user_id: 5,
    post_id: 1,
  },
  {
    comment_text: "Please do a post on advanced CSS!",
    user_id: 1,
    post_id: 2,
  },
  {
    comment_text: "I agree with you!",
    user_id: 2,
    post_id: 2,
  }
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;