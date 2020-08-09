let express = require("express");
let router = express.Router();
let passport = require("passport");
let User = require("../models/user");
let Campground = require("../models/campground");

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
  let newUser = new User({
    username: req.body.username,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    avatar: req.body.avatar,
    age: req.body.age,
    email: req.body.email,
  });
  User.register(newUser, req.body.password, function (err, user) {
    if (err) {
      req.flash("error", err.message);
      res.render("register.ejs");
    }
    passport.authenticate("local")(req, res, function () {
      req.flash("success", user.username + " " + "welcome to the Campground");
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
  req.flash("success", "Logout Successful!");
  res.redirect("/camps");
});

// user profile
router.get("/users/:id", function (req, res) {
  User.findById(req.params.id, function (err, foundUser) {
    if (err) {
      req.flash("error", "Something went wrong!");
      res.redirect("/camps");
    } else {
      Campground.find()
        .where("author.id")
        .equals(foundUser._id)
        .exec(function (err, camps) {
          if (err) {
            req.flash("error", "Something went wrong!");
            res.redirect("/camps");
          }
          res.render("users/show.ejs", { user: foundUser, camps: camps });
        });
    }
  });
});

module.exports = router;
