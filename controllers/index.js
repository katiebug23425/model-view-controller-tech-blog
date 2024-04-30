const router = require("express").Router();
const homepageRoutes = require("./homepageRoutes");
const apiRoutes = require("./api");


router.use("/", homepageRoutes);
router.use("/api", apiRoutes);

// Export the router
module.exports = router;