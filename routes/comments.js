let express = require("express");
let router = express.Router();
let Campground = require("../models/campground");
let Comment = require("../models/comment");
let middleware = require("../middleware");

// COMMENTS ROUTES

// comments new
router.get("/camps/:id/comments/new", middleware.isLoggedIn, function (
  req,
  res
) {
  Campground.findById(req.params.id, function (err, camp) {
    if (err) {
      console.log(err);
    } else {
      res.render("comments/new.ejs", { camp: camp });
    }
  });
});

// comments create
router.post("/camps/:id/comments", middleware.isLoggedIn, function (req, res) {
  //find the camp
  Campground.findById(req.params.id, function (err, camp) {
    if (err) {
      console.log(err);
      res.redirect("/camps");
    } else {
      Comment.create(req.body.comment, function (err, comment) {
        if (err) {
          req.flash("error", "Ooops something went wrong!");
          console.log(err);
        } else {
          comment.author.id = req.user._id;
          comment.author.username = req.user.username;
          comment.save();
          camp.comments.push(comment);
          camp.save();
          req.flash("success", "Comment was added successfully!");
          res.redirect("/camps/" + camp._id);
        }
      });
    }
  });
});

// Comment edit route
router.get(
  "/camps/:id/comments/:comment_id/edit",
  middleware.commentCreator,
  function (req, res) {
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
  }
);

// UPDATE comment route
router.put(
  "/camps/:id/comments/:comment_id",
  middleware.commentCreator,
  function (req, res) {
    Comment.findByIdAndUpdate(
      req.params.comment_id,
      req.body.comment,
      function (err, updatedComment) {
        if (err) {
          res.redirect("back");
        } else {
          res.redirect("/camps/" + req.params.id);
        }
      }
    );
  }
);

// comments destroy route
router.delete(
  "/camps/:id/comments/:comment_id",
  middleware.commentCreator,
  function (req, res) {
    Comment.findByIdAndRemove(req.params.comment_id, function (err) {
      if (err) {
        res.redirect("back");
      } else {
        req.flash("success", "Comment was successfully deleted!");
        res.redirect("/camps/" + req.params.id);
      }
    });
  }
);

module.exports = router;
