let express = require("express");
let router = express.Router();
let Campground = require("../models/campground");

// index page to display all the camps
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

// post route, to send data to database and get response
router.post("/camps", (req, res) => {
  const name = req.body.name;
  const image = req.body.image;
  const desc = req.body.description;
  const newCamp = { name: name, img: image, description: desc };
  Campground.create(newCamp, (err, newCreated) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/camps");
    }
  });
});

// create or new page, to create new campground
router.get("/camps/new", (req, res) => {
  res.render("campgrounds/new.ejs");
});

// code below breaks the route crashing with css file
router.get("/camps/stylesheets/main.css", function (req, res) {
  break;
});

//show route/page
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

module.exports = router;
