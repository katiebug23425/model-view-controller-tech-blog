// Import necessary modules
const router = require("express").Router();
const { User } = require("../../models");

// GET all users
router.get("/", async (req, res) => {
  try {
    const dbUserData = await User.findAll({
      attributes: { exclude: ["password"] },
    });
    res.json(dbUserData);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Request for all users unable to be fulfilled, users not found!" });
  }
});

// New User Signup Route
router.post("/signup", async (req, res) => {
    try {
      const dbNewUserData = new User();
      dbNewUserData.username = req.body.username;
      dbNewUserData.email = req.body.email;
      dbNewUserData.password = req.body.password;
  
      const userData = await dbNewUserData.save();

      req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.logged_in = true;
  
        res.status(200).json(userData);
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Request for new user signup unable to be fulfilled, user not created!" });
    }
  });

  // Route to login a current user
router.post("/login", async (req, res) => {
    try {
      const dbUserData = await User.findOne({ where: {username: req.body.username,}});
  
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