// imports
const router = require("express").Router();
const homepageRoutes = require("./homepageRoutes");
const apiRoutes = require("./api");

// set up routes
router.use("/", homepageRoutes);
router.use("/api", apiRoutes);

// Export the router
module.exports = router;