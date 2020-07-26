let express = require("express");
let router = express.Router();
let passport = require("passport");
let User = require("../models/user");

// main page: root route
router.get("/", (req, res) => {
  res.render("landing.ejs");
});

// Auth Routes
// Show register form
router.get("/register", function (req, res) {
  res.render("register.ejs");
});

//handle signup
router.post("/register", function (req, res) {
  let newUser = new User({ username: req.body.username });
  User.register(newUser, req.body.password, function (err, user) {
    if (err) {
      console.log(err);
      return res.render("register.ejs");
    }
    passport.authenticate("local")(req, res, function () {
      res.redirect("/camps");
    });
  });
});

// Show login form
router.get("/login", function (req, res) {
  res.render("login.ejs");
});

//handle login
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/camps",
    failureRedirect: "/login",
  }),
  function (req, res) {}
);

// logout route
router.get("/logout", function (req, res) {
  req.logout();
  res.redirect("/camps");
});

// middleware
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

module.exports = router;
