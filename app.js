let bodyParser = require("body-parser");
let express = require("express");
let mongoose = require("mongoose");
let app = express();
let passport = require("passport");
let LocalStrategy = require("passport-local");
let methodOverride = require("method-override");
let Campground = require("./models/campground");
let Comment = require("./models/comment");
let User = require("./models/user");
seedDB = require("./seeds");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
mongoose.connect("mongodb://localhost:27017/campground", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});
// seedDB(); // seed the DB

// require routes
let routesForComments = require("./routes/comments");
let routesForCamps = require("./routes/camps");
let routesForUsers = require("./routes/users");

// Passport Configuration
app.use(
  require("express-session")({
    secret: "first time setting up passport with expressjs",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(function (req, res, next) {
  res.locals.currentUser = req.user;
  next();
});
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(routesForUsers);
app.use(routesForComments);
app.use(routesForCamps);

// =================
// PORT localhost:7000
app.listen(7000, console.log("Camping app listening on PORT: 7000"));
