let Campground = require("../models/campground");
let Comment = require("../models/comment");
let middlewareObj = {};

middlewareObj.campCreator = function campCreator(req, res, next) {
  if (req.isAuthenticated()) {
    Campground.findById(req.params.id, (err, foundCamp) => {
      if (err) {
        req.flash("error", "Ooops something went wrong!");
        res.redirect("back");
      } else {
        if (foundCamp.author.id.equals(req.user._id)) {
          next();
        } else {
          req.flash("error", "You don't have access for that!");
          res.redirect("back");
        }
      }
    });
  } else {
    req.flash("error", "Please Login First!!!");
    res.redirect("back");
  }
};

middlewareObj.commentCreator = function commentCreator(req, res, next) {
  if (req.isAuthenticated()) {
    Comment.findById(req.params.comment_id, (err, foundComment) => {
      if (err) {
        res.redirect("back");
      } else {
        if (foundComment.author.id.equals(req.user._id)) {
          next();
        } else {
          req.flash("error", "You don't have access for that!");
          res.redirect("back");
        }
      }
    });
  } else {
    req.flash("error", "Please Login First!!!");
    res.redirect("back");
  }
};

middlewareObj.isLoggedIn = function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash("error", "Please Login First!!!");
  res.redirect("/login");
};

module.exports = middlewareObj;
