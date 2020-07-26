let express = require("express");
let router = express.Router();
let Campground = require("../models/campground");
let Comment = require("../models/comment");

// COMMENTS ROUTES

// comments new
router.get("/camps/:id/comments/new", isLoggedIn, function (req, res) {
  Campground.findById(req.params.id, function (err, camp) {
    if (err) {
      console.log(err);
    } else {
      res.render("comments/new.ejs", { camp: camp });
    }
  });
});

// comments create
router.post("/camps/:id/comments", isLoggedIn, function (req, res) {
  //find camp
  Campground.findById(req.params.id, function (err, camp) {
    if (err) {
      console.log(err);
      res.redirect("/camps");
    } else {
      Comment.create(req.body.comment, function (err, comment) {
        if (err) {
          console.log(err);
        } else {
          camp.comments.push(comment);
          camp.save();
          res.redirect("/camps/" + camp._id);
        }
      });
    }
  });
});

// middleware
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

module.exports = router;
