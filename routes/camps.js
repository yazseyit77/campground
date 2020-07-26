let express = require("express");
let router = express.Router();
let Campground = require("../models/campground");

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
router.post("/camps", isLoggedIn, (req, res) => {
  const name = req.body.name;
  const image = req.body.image;
  const desc = req.body.description;
  let author = {
    id: req.user._id,
    username: req.user.username,
  };
  const newCamp = { name: name, img: image, description: desc, author: author };
  Campground.create(newCamp, (err, newCreated) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/camps");
    }
  });
});

// new - display create camp form
router.get("/camps/new", isLoggedIn, (req, res) => {
  res.render("campgrounds/new.ejs");
});

// code below breaks the route crashing with css file
router.get("/camps/stylesheets/main.css", function (req, res) {
  break;
});

// show route/page - individual camp(by id)
router.get("/camps/:id", (req, res) => {
  //find the camp with given id, show that page
  Campground.findById(req.params.id)
    .populate("comments")
    .exec((err, foundCamp) => {
      if (err) {
        console.log(err);
      } else {
        console.log(foundCamp);
        res.render("campgrounds/show.ejs", { camp: foundCamp });
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
