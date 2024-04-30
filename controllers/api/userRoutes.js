// Import necessary modules
const router = require("express").Router();
const { User } = require("../../models");

// GET all users
router.get("/", (req, res) => {
  User.findAll({
    attributes: { exclude: ["password"] },
  })
    .then((dbUserData) => res.json(dbUserData))
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Request for all users unable to be fulfilled, users not found!"});
    });
});

// New User Signup Route
router.post("/", async (req, res) => {
    try {
      const dbUserData = await User.create({
        username: req.body.username,
        password: req.body.password,
      });
  
      req.session.user_id = dbUserData.id;
      req.session.username = dbUserData.username;
      req.session.loggedIn = true;
  
      req.session.save(() => {
        res.json(dbUserData);
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Request for new user signup unable to be fulfilled, user not created!" });
    }
  });

  // Route to login a current user
router.post("/login", async (req, res) => {
    try {
      const dbUserData = await User.findOne({
        where: {
          username: req.body.username,
        },
      });
  
      if (!dbUserData) {
        res
          .status(400)
          .json({ message: "Request for user login unable to be fulfilled, user not found!" });
        return;
      }
  
      const validPassword = dbUserData.checkPassword(req.body.password);
  
      if (!validPassword) {
        res
          .status(400)
          .json({ message: "Request for user login unable to be fulfilled, invalid password!" });
        return;
      }
  
      req.session.save(() => {
        req.session.user_id = dbUserData.id;
        req.session.username = dbUserData.username;
        req.session.loggedIn = true;
  
        res.json({ user: dbUserData, message: "You are now logged in!" });
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Request for user login unable to be fulfilled, user not found!" });
    }
  });

  //Log Out Route
router.post("/logout", (req, res) => {
    if (req.session.loggedIn) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    } else {
      res.status(404).end();
    }
  });

// Export the router
module.exports = router;