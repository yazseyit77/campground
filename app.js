let bodyParser = require("body-parser");
let express = require("express");
let mongoose = require("mongoose");
let app = express();
Campground = require("./models/campground");
seedDB = require("./seeds");

seedDB();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
mongoose.connect("mongodb://localhost:27017/campground", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// main page
app.get("/", (req, res) => {
  res.render("landing.ejs");
});

// index page to display all the camps
app.get("/camps", (req, res) => {
  Campground.find({}, (err, AllCampgrounds) => {
    if (err) {
      console.log(err);
    } else {
      res.render("index.ejs", { camps: AllCampgrounds });
    }
  });
});

// post route, to send data to database and get response
app.post("/camps", (req, res) => {
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
  // if (newCamp.name !== "") {
  //   camps.push(newCamp);
  // }
});

// create or new page, to create new campground
app.get("/camps/new", (req, res) => {
  res.render("new.ejs");
});

// code below breaks the route crashing with css file
app.get("/camps/app.css", function (req, res) {
  break;
});

//show route/page
app.get("/camps/:id", (req, res) => {
  //find the camp with given id, show that page
  Campground.findById(req.params.id)
    .populate("comments")
    .exec((err, foundCamp) => {
      if (err) {
        console.log("err");
      } else {
        res.render("show.ejs", { camp: foundCamp });
      }
    });
});

app.listen(7000, console.log("Camping app listening on PORT: 7000"));
