// Middleware function to check if user is logged in
const withAuth = (req, res, next) => {
    if (!req.session.logged_in) {
      res.redirect("/login");
    } else {
      next();
    }
  };
  
  // Exporting withAuth middleware function
  module.exports = withAuth;