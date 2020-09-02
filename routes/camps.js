let express = require("express");
let router = express.Router();
let Campground = require("../models/campground");
let middleware = require("../middleware");

// index - to display all the camps
router.get("/camps", (req, res) => {
  Campground.find({}, (err, AllCampgrounds) => {
    if (err) {
      console.log(err);
    } else {
      res.render("campgrounds/index.ejs", {
        camps: AllCampgrounds,
        currentUser: req.user,
      });
    }
  });
});

// create - add new camp to DB
router.post("/camps", middleware.isLoggedIn, (req, res) => {
  const name = req.body.name;
  const price = req.body.price;
  const image = req.body.image;
  const desc = req.body.description;
  let author = {
    id: req.user._id,
    username: req.user.username,
  };
  const newCamp = {
    name: name,
    price: price,
    img: image,
    description: desc,
    author: author,
  };
  Campground.create(newCamp, (err, newCreated) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/camps");
    }
  });
});

// new - display create camp form
router.get("/camps/new", middleware.isLoggedIn, (req, res) => {
  res.render("campgrounds/new.ejs");
});

// code below breaks the route crashing with css file
// router.get("/camps/stylesheets/main.css", function (req, res) {
//   break;
// });

// show route/page - individual camp(by id)
router.get("/camps/:id", (req, res) => {
  //find the camp with given id, show that page
  Campground.findById(req.params.id)
    .populate("comments")
    .exec(function (err, foundCamp) {
      if (err) {
        console.log(err);
      } else {
        res.render("campgrounds/show.ejs", {
          camp: foundCamp,
          currentUser: req.user,
        });
      }
    });
});

// edit camps route
router.get("/camps/:id/edit", middleware.campCreator, (req, res) => {
  Campground.findById(req.params.id, (err, foundCamp) => {
    res.render("campgrounds/edit.ejs", { camp: foundCamp });
  });
});

// update camps route
router.put("/camps/:id", middleware.campCreator, (req, res) => {
  Campground.findByIdAndUpdate(
    req.params.id,
    req.body.campground,
    (err, updatedCamp) => {
      if (err) {
        res.redirect("/camps");
      } else {
        res.redirect("/camps/" + req.params.id);
      }
    }
  );
});

// Destroy camp route
router.delete("/camps/:id", middleware.campCreator, (req, res) => {
  Campground.findByIdAndRemove(req.params.id, function (err) {
    if (err) {
      res.redirect("/camps");
    } else {
      req.flash("success", "Campground was successfully deleted!");
      res.redirect("/camps");
    }
  });
});

module.exports = router;
