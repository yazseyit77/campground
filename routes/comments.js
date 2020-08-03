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
  //find the camp
  Campground.findById(req.params.id, function (err, camp) {
    if (err) {
      console.log(err);
      res.redirect("/camps");
    } else {
      Comment.create(req.body.comment, function (err, comment) {
        if (err) {
          console.log(err);
        } else {
          comment.author.id = req.user._id;
          comment.author.username = req.user.username;
          comment.save();
          camp.comments.push(comment);
          camp.save();
          res.redirect("/camps/" + camp._id);
        }
      });
    }
  });
});

// Comment edit route
router.get("/camps/:id/comments/:comment_id/edit", commentCreator, function (
  req,
  res
) {
  Comment.findById(req.params.comment_id, function (err, foundComment) {
    if (err) {
      res.redirect("back");
    } else {
      res.render("comments/edit.ejs", {
        campground_id: req.params.id,
        comment: foundComment,
      });
    }
  });
});

// UPDATE comment route
router.put("/camps/:id/comments/:comment_id", commentCreator, function (
  req,
  res
) {
  Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function (
    err,
    updatedComment
  ) {
    if (err) {
      res.redirect("back");
    } else {
      res.redirect("/camps/" + req.params.id);
    }
  });
});

// comments destroy route
router.delete("/camps/:id/comments/:comment_id", commentCreator, function (
  req,
  res
) {
  Comment.findByIdAndRemove(req.params.comment_id, function (err) {
    if (err) {
      res.redirect("back");
    } else {
      res.redirect("/camps/" + req.params.id);
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

// authorization middleware
function commentCreator(req, res, next) {
  if (req.isAuthenticated()) {
    Comment.findById(req.params.comment_id, (err, foundComment) => {
      if (err) {
        res.redirect("back");
      } else {
        if (foundComment.author.id.equals(req.user._id)) {
          next();
        } else {
          res.redirect("back");
        }
      }
    });
  } else {
    res.redirect("back");
  }
}

module.exports = router;
