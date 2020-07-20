let bodyParser = require("body-parser");
let express = require("express");
let mongoose = require("mongoose");
let app = express();
let passport = require("passport");
let LocalStrategy = require("passport-local");
let Campground = require("./models/campground");
let Comment = require("./models/comment");
let User = require("./models/user");
seedDB = require("./seeds");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
mongoose.connect("mongodb://localhost:27017/campground", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
seedDB();

// Passport Configuration
app.use(
  require("express-session")({
    secret: "first time setting up passport with expressjs",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

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
      res.render("campgrounds/index.ejs", { camps: AllCampgrounds });
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
});

// create or new page, to create new campground
app.get("/camps/new", (req, res) => {
  res.render("campgrounds/new.ejs");
});

// code below breaks the route crashing with css file
app.get("/camps/stylesheets/main.css", function (req, res) {
  break;
});

//show route/page
app.get("/camps/:id", (req, res) => {
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

// =================
// COMMENTS ROUTES
// =================
app.get("/camps/:id/comments/new", isLoggedIn, function (req, res) {
  Campground.findById(req.params.id, function (err, camp) {
    if (err) {
      console.log(err);
    } else {
      res.render("comments/new.ejs", { camp: camp });
    }
  });
  // res.render("comments/new.ejs");
});

app.post("/camps/:id/comments", isLoggedIn, function (req, res) {
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

// =================
// Auth Routes
// Show register form
app.get("/register", function (req, res) {
  res.render("register.ejs");
});

//handle signup
app.post("/register", function (req, res) {
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
app.get("/login", function (req, res) {
  res.render("login.ejs");
});
//handle login
app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/camps",
    failureRedirect: "/login",
  }),
  function (req, res) {}
);
// logout route
app.get("/logout", function (req, res) {
  req.logout();
  res.redirect("/camps");
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

// =================
// PORT localhost:7000
app.listen(7000, console.log("Camping app listening on PORT: 7000"));
